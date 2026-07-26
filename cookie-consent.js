(function () {
  var KEY = 'quetiemals_cookie_consent';
  var PUB = 'ca-pub-7932735753046865';

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadAds() {
    if (window.__qtAdsLoaded) return;
    window.__qtAdsLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + PUB;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  function hide() {
    var el = document.getElementById('qt-cookie-banner');
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
  }

  function show() {
    if (document.getElementById('qt-cookie-banner')) return;
    var css = document.createElement('style');
    css.textContent = [
      '#qt-cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:99999;',
      'background:#0a1224;border-top:1px solid rgba(34,211,238,0.25);',
      'padding:16px 18px;font-family:Inter,system-ui,sans-serif;color:#e5e7eb;',
      'box-shadow:0 -8px 32px rgba(0,0,0,0.5);transition:opacity .25s;}',
      '#qt-cookie-banner .inner{max-width:720px;margin:0 auto;display:flex;flex-wrap:wrap;gap:14px;align-items:center;}',
      '#qt-cookie-banner .txt{flex:1;min-width:200px;font-size:13px;line-height:1.55;color:#9ca3af;}',
      '#qt-cookie-banner .txt a{color:#22d3ee;}',
      '#qt-cookie-banner .actions{display:flex;gap:10px;}',
      '#qt-cookie-banner button{border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}',
      '#qt-cookie-banner .accept{background:#22d3ee;color:#030712;}',
      '#qt-cookie-banner .reject{background:transparent;color:#9ca3af;border:1px solid rgba(148,163,184,0.25);}'
    ].join('');
    document.head.appendChild(css);
    var b = document.createElement('div');
    b.id = 'qt-cookie-banner';
    b.setAttribute('role', 'dialog');
    b.innerHTML = '<div class="inner"><div class="txt">We use cookies for essential features and, with your consent, advertising (Google AdSense). See our <a href="privacy.html">Privacy Policy</a>.</div><div class="actions"><button type="button" class="reject" id="qt-reject">Reject</button><button type="button" class="accept" id="qt-accept">Accept</button></div></div>';
    document.body.appendChild(b);
    document.getElementById('qt-accept').onclick = function () { set('accepted'); hide(); loadAds(); };
    document.getElementById('qt-reject').onclick = function () { set('rejected'); hide(); };
  }

  function init() {
    var v = get();
    if (v === 'accepted') { loadAds(); return; }
    if (v === 'rejected') return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
    else show();
  }
  init();
})();

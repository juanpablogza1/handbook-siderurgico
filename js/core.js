/* Siderúrgica — núcleo: espacio de nombres, utilidades, router, bloqueo de zoom, PWA */
window.S = {
  procesos: [], etapas: [], normas: [], orgs: [], empresas: [], grados: [], elementos: [],
  anim: {}, views: {}, scrolls: {}
};

S.esc = function (s) {
  return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
};
S.norm = function (s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
};
S.ul = function (arr) {
  return '<ul class="b">' + arr.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
};
S.kv = function (rows) {
  return '<table class="kv">' + rows.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') + '</table>';
};
/* Color de incandescencia aproximado para una temperatura en °C */
S.tempColor = function (t) {
  var stops = [[0, [125, 139, 151]], [450, [125, 139, 151]], [700, [179, 38, 30]], [900, [217, 72, 43]], [1050, [242, 106, 27]], [1250, [255, 197, 61]], [1550, [255, 243, 214]]];
  if (t == null) return 'rgb(125,139,151)';
  for (var i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      var a = stops[i - 1], b = stops[i], k = (t - a[0]) / (b[0] - a[0] || 1);
      return 'rgb(' + a[1].map(function (v, j) { return Math.round(v + (b[1][j] - v) * k); }).join(',') + ')';
    }
  }
  return 'rgb(255,243,214)';
};

/* ---------- Router ----------
   La ruta vive en S.cur y se refleja en location.hash cuando el navegador lo permite.
   Así la app funciona igual en GitHub Pages, instalada, o dentro de un marco aislado. */
S.cur = '#/';
S.route = function (restore) {
  var h = S.cur.replace(/^#\/?/, '');
  var parts = h.split('/').filter(Boolean).map(function (x) { try { return decodeURIComponent(x); } catch (e) { return x; } });
  var sec = parts[0] || 'inicio';
  var view = S.views[sec] || S.views.inicio;
  var out = view(parts.slice(1)) || S.views.inicio([]);
  var el = document.getElementById('view');
  el.innerHTML = out.html;
  document.getElementById('title').textContent = out.title || 'Siderúrgica';
  document.title = (out.title ? out.title + ' — ' : '') + 'Siderúrgica';
  document.getElementById('back').hidden = parts.length < 2;
  var tabs = document.querySelectorAll('#tabs a');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle('on', tabs[i].dataset.tab === (S.views[sec] ? sec : 'inicio'));
  el.scrollTop = restore ? (S.scrolls[S.cur] || 0) : 0;
  S._lastScroll = el.scrollTop;
  if (out.after) out.after(el);
};
S.go = function (href, restore) {
  S.scrolls[S.cur] = S._lastScroll || 0;
  S.cur = href || '#/';
  try { if (location.hash !== S.cur && !(S.cur === '#/' && location.hash === '')) location.hash = S.cur; } catch (e) {}
  S.route(restore);
};

S.start = function () {
  var view = document.getElementById('view');
  if (location.hash.indexOf('#/') === 0) S.cur = location.hash;
  window.addEventListener('hashchange', function () {
    var h = location.hash || '#/';
    if (h === S.cur || h.indexOf('#/') !== 0) return;   // cambio propio, o ancla ajena
    S.scrolls[S.cur] = S._lastScroll || 0;
    S.cur = h;
    S.route(true);                                      // atrás / adelante del navegador
  });
  view.addEventListener('scroll', function () { S._lastScroll = view.scrollTop; }, { passive: true });
  document.getElementById('back').addEventListener('click', function () {
    var parts = S.cur.replace(/^#\/?/, '').split('/').filter(Boolean);
    parts.pop();
    if (parts.length === 1 && parts[0] === 'inicio') parts = [];
    S.go('#/' + parts.join('/'), true);
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    var href = a.getAttribute('href');
    S.go(href, a.parentNode && a.parentNode.id === 'tabs' && href !== S.cur ? true : false);
  });
  S.fitIOS();
  S.noZoom();
  S.pwa();
  S.route(true);
};

/* ---------- iPhone instalado: la app debe ocupar la pantalla completa ----------
   En modo standalone con barra de estado translúcida, iOS reporta una ventana más corta
   que la pantalla y la barra inferior queda flotando. screen.height sí es confiable. */
S.fitIOS = function () {
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!ios || !S.isStandalone()) return;
  var root = document.documentElement;
  function set() {
    var portrait = !window.matchMedia || matchMedia('(orientation: portrait)').matches;
    var h = portrait ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
    h = Math.max(h, window.innerHeight || 0);
    root.style.setProperty('--app-h', h + 'px');
    root.classList.add('ios-sa');
    window.scrollTo(0, 0);
  }
  set();
  window.addEventListener('resize', set);
  window.addEventListener('orientationchange', function () { setTimeout(set, 300); });
};

/* ---------- Sin zoom: pellizco, doble toque, ctrl+rueda, ctrl+/- ---------- */
S.noZoom = function () {
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (ev) {
    document.addEventListener(ev, function (e) { e.preventDefault(); }, { passive: false });
  });
  document.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches.length > 1) e.preventDefault();
  }, { passive: false });
  document.addEventListener('dblclick', function (e) { e.preventDefault(); }, { passive: false });
  window.addEventListener('wheel', function (e) { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, { passive: false });
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '0', '_'].indexOf(e.key) >= 0) e.preventDefault();
  });
};

/* ---------- PWA: service worker e instalación ---------- */
S.pwa = function () {
  try {
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  } catch (e) {}
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    S.installEvt = e;
    var b = document.getElementById('instbox');
    if (b) b.outerHTML = S.installBox();
  });
  window.addEventListener('appinstalled', function () {
    S.installEvt = null;
    var b = document.getElementById('instbox');
    if (b) b.remove();
  });
};
S.isStandalone = function () {
  return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
};
S.installBox = function () {
  if (S.isStandalone()) return '';
  if (S.installEvt) {
    return '<div class="inst" id="instbox"><span>Instala la app para usarla sin conexión.</span><button type="button" onclick="S.install()">Instalar</button></div>';
  }
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var msg = ios
    ? 'Para instalar en iPhone: abre en Safari, toca Compartir y elige «Agregar a inicio».'
    : 'Para instalar: abre el menú del navegador y elige «Instalar app» o «Agregar a pantalla principal».';
  return '<div class="inst" id="instbox"><span>' + msg + '</span></div>';
};
S.install = function () {
  if (!S.installEvt) return;
  S.installEvt.prompt();
  S.installEvt = null;
};

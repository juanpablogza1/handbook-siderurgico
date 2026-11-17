/* Service worker: guarda toda la app para uso sin conexión.
   Sube VERSION en cada publicación para que los teléfonos descarguen el contenido nuevo. */
var VERSION = 'siderurgica-v1.17.2';
var ASSETS = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'js/core.js', 'js/anim-lib.js', 'js/anim-1.js', 'js/anim-2.js', 'js/anim-3.js',
  'js/data-procesos.js', 'js/data-quimica.js', 'js/data-grados.js', 'js/data-normas.js', 'js/data-galvanizado.js', 'js/data-industria.js', 'js/data-plantas.js', 'js/data-clientes.js', 'js/data-equipos.js', 'js/data-acerias.js', 'js/data-minas.js', 'js/data-org.js', 'js/mapa.js', 'js/mapa-mini.js', 'js/industria.js', 'js/portadas.js', 'js/precios.js', 'js/data-precios.js', 'js/mapa-paises.js', 'js/mapa-vias.js', 'js/mapa-caminos.js', 'js/mapa-caminos2.js', 'js/data-logos.js',
  'js/sim.js', 'js/fec.js', 'js/views.js',
  'icons/favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ASSETS.map(function (u) { return new Request(u, { cache: 'reload' }); })); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* Archivos con ?v= (no cambian dentro de una versión): directo de la copia guardada si existe.
   Lo demás, primero la red para tener la versión más nueva; si tarda más de 2.5 s (señal débil) o falla, la copia
   guardada, y la descarga sigue en segundo plano para la próxima vez. */
function guardada(req) { return caches.match(req, { ignoreSearch: true }); }
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  if (/\/data\/precios\.json$/.test(new URL(e.request.url).pathname)) return; // precios: siempre de la red; sin red, la app usa lo guardado
  if (/[?&]v=/.test(e.request.url)) {
    e.respondWith(caches.match(e.request).then(function (h) { return h || desdeRed(e); }));
    return;
  }
  e.respondWith(desdeRed(e));
});
function desdeRed(e) {
  var red = fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); return caches.open(VERSION).then(function (c) { return c.put(e.request, copy); }).then(function () { return res; }, function () { return res; }); }
    return res;
  });
  try { e.waitUntil(red.catch(function () {})); } catch (x) {}
  return new Promise(function (ok) {
    var listo = false;
    function dar(r) { if (!listo) { listo = true; ok(r); } }
    var t = setTimeout(function () { guardada(e.request).then(function (h) { if (h) dar(h); }); }, 2500);
    red.then(function (res) { clearTimeout(t); dar(res); }, function () {
      clearTimeout(t);
      guardada(e.request).then(function (h) { return h || guardada('index.html'); }).then(function (h) { dar(h || Response.error()); });
    });
  });
}

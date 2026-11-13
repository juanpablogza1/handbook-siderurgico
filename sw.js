/* Service worker: guarda toda la app para uso sin conexión.
   Sube VERSION en cada publicación para que los teléfonos descarguen el contenido nuevo. */
var VERSION = 'siderurgica-v1.14.0';
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

/* Primero la red para tener la versión más nueva; si no hay conexión, la copia guardada. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
    })
  );
});

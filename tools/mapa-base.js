/* Genera los datos del mapa en js/: países, carreteras y vías de ferrocarril.
   Fuente: Natural Earth (dominio público).
     npm i world-atlas topojson-client
     descargar ne_10m_railroads.geojson y ne_10m_roads.geojson de github.com/nvkelso/natural-earth-vector (carpeta geojson)
     node tools/mapa-base.js <carpeta con los geojson> [carpeta de salida]
   Proyección de Mercator en centésimas de grado de longitud: x = (lon + 180) * 100; y crece hacia el sur desde 85° N.
   Rutas SVG con deltas relativos. */
var fs = require('fs'), path = require('path');
var src = process.argv[2], out = process.argv[3] || path.join(__dirname, '..', 'js');
var topo = require('world-atlas/countries-50m.json'), tj = require('topojson-client');

function dp(pts, tol) {               // Douglas-Peucker iterativo
  var n = pts.length; if (n < 3) return pts;
  var keep = new Uint8Array(n), st = [[0, n - 1]]; keep[0] = keep[n - 1] = 1;
  while (st.length) {
    var s = st.pop(), a = pts[s[0]], b = pts[s[1]], dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy, mx = 0, mi = -1;
    for (var i = s[0] + 1; i < s[1]; i++) {
      var p = pts[i], d;
      if (!L) d = Math.hypot(p[0] - a[0], p[1] - a[1]);
      else { var t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L)); d = Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); }
      if (d > mx) { mx = d; mi = i; }
    }
    if (mx > tol && mi > 0) { keep[mi] = 1; st.push([s[0], mi], [mi, s[1]]); }
  }
  return pts.filter(function (_, i) { return keep[i]; });
}
var R = 36000 / (2 * Math.PI), Y0 = R * Math.log(Math.tan(Math.PI / 4 + 85 * Math.PI / 360));
function merc(lat) { lat = Math.max(-80, Math.min(85, lat)); return Math.round(Y0 - R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))); }
function enc(pts, close) {
  var s = '', px = 0, py = 0, k = 0;
  pts.forEach(function (c, i) {
    var x = Math.round((c[0] + 180) * 100), y = merc(c[1]);
    if (i === 0) { s += 'M' + x + ' ' + y; px = x; py = y; k++; return; }
    var dx = x - px, dy = y - py; if (!dx && !dy) return;
    s += 'l' + dx + (dy < 0 ? '' : ' ') + dy; px = x; py = y; k++;
  });
  return k < 2 ? '' : s + (close ? 'z' : '');
}
function lines(file, pick, tol, minLen) {
  var g = JSON.parse(fs.readFileSync(path.join(src, file), 'utf8')), d = '';
  g.features.forEach(function (f) {
    if (!f.geometry || !pick(f.properties)) return;
    var ls = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
    ls.forEach(function (l) {
      var len = 0; for (var i = 1; i < l.length; i++) len += Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]);
      if (len < minLen) return;
      d += enc(dp(l, tol), false);
    });
  });
  return d;
}
function write(name, v, d) { var t = '/* Generado por tools/mapa-base.js. Fuente: Natural Earth (dominio público). */\nS.' + v + ' = "' + d + '";\n'; fs.writeFileSync(path.join(out, name), t); console.log(name, Math.round(t.length / 1024) + ' KB'); }

var TP = +process.env.TP || 0.04, TR = +process.env.TR || 0.03, TC = +process.env.TC || 0.04;

var land = '';
tj.feature(topo, topo.objects.countries).features.forEach(function (f) {
  if (f.properties.name === 'Antarctica' || !f.geometry) return;
  var polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  polys.forEach(function (p) {
    var r = p[0], minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9, cruza = false;
    for (var j = 1; j < r.length; j++) if (Math.abs(r[j][0] - r[j - 1][0]) > 180) cruza = true;
    if (cruza) r = r.map(function (c) { return c[0] < 0 ? [c[0] + 360, c[1]] : c; });   // anillos que cruzan el antimeridiano
    r.forEach(function (c) { minx = Math.min(minx, c[0]); maxx = Math.max(maxx, c[0]); miny = Math.min(miny, c[1]); maxy = Math.max(maxy, c[1]); });
    if ((maxx - minx) * (maxy - miny) < 0.02) return;       // islotes
    var s = dp(r, TP); if (s.length >= 4) land += enc(s, true);
  });
});
write('mapa-paises.js', 'mapaPaises', land);
write('mapa-vias.js', 'mapaVias', lines('ne_10m_railroads.geojson', function (p) { return p.scalerank <= (+process.env.RR || 9); }, TR, 0.05));
var road = function (lo, hi) { return function (p) { return !/Ferry/.test(p.type) && p.scalerank >= lo && p.scalerank <= hi; }; };
write('mapa-caminos.js', 'mapaCaminos', lines('ne_10m_roads.geojson', road(0, 5), TC, 0.05));
write('mapa-caminos2.js', 'mapaCaminos2', lines('ne_10m_roads.geojson', road(6, 7), TC, 0.05));

/* Silueta mínima del mundo para miniaturas (décimas de grado, misma proyección). */
(function () {
  var t110 = require('world-atlas/land-110m.json'), d = '';
  tj.feature(t110, t110.objects.land).features.forEach(function (f) {
    var polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    polys.forEach(function (p) {
      var r = p[0], minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
      r.forEach(function (c) { minx = Math.min(minx, c[0]); maxx = Math.max(maxx, c[0]); miny = Math.min(miny, c[1]); maxy = Math.max(maxy, c[1]); });
      if (maxy < -60 || (maxx - minx) * (maxy - miny) < 12 || maxx - minx > 300) return;
      var s = dp(r, 0.7), px = 0, py = 0, o = '';
      if (s.length < 4) return;
      s.forEach(function (c, i) {
        var x = Math.round((c[0] + 180) * 10), y = Math.round(merc(c[1]) / 10);
        if (i === 0) { o += 'M' + x + ' ' + y; } else { var dx = x - px, dy = y - py; if (!dx && !dy) return; o += 'l' + dx + (dy < 0 ? '' : ' ') + dy; }
        px = x; py = y;
      });
      d += o + 'z';
    });
  });
  write('mapa-mini.js', 'mapaMini', d);
})();

/* Portada gráfica de la pestaña Industria. Tres vistas a prueba (tablero, barras, mosaico) y la lista original. */
(function () {
  var KEY = 'sid.indVista', VISTAS = [['tablero', 'Tablero'], ['barras', 'Barras'], ['mosaico', 'Mosaico'], ['lista', 'Lista']];
  var REG = { cn: ['China', '#f26a1b'], jk: ['Japón y Corea', '#6aa3d8'], in: ['India', '#7fc8a0'], eu: ['Europa', '#b9d6e2'], am: ['América', '#ffc53d'] };
  var PAIS = { 'China': 'cn', 'Japón': 'jk', 'Corea del Sur': 'jk', 'India': 'in', 'Luxemburgo': 'eu', 'Alemania': 'eu', 'Estados Unidos': 'am', 'Argentina': 'am', 'Brasil': 'am', 'México': 'am' };
  var MUNDO = { total: 1849, partes: [['China', 960.8, '#f26a1b'], ['India', 164.9, '#7fc8a0'], ['Estados Unidos', 82.0, '#ffc53d']] };

  function get() { try { var v = localStorage.getItem(KEY); if (v) return v; } catch (e) {} return 'tablero'; }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function emp(reg) { return S.empresas.filter(function (e) { return e.reg === reg; }); }
  function mt(id) { var v = 0; S.ranking.forEach(function (r) { if (r[4] === id) v = r[3]; }); return v; }
  function rutas(e) {
    var t = e.ruta || '', o = [];
    if (/alto horno|integrada/i.test(t)) o.push('I');
    if (/reducci[oó]n directa|hierro esponja|HBI/i.test(t)) o.push('D');
    if (/el[eé]ctric/i.test(t)) o.push('E');
    return o;
  }
  function puntos(e) { return rutas(e).map(function (k) { return '<span><i class="iv-pt" style="background:' + S.rutas[k][1] + '"></i>' + S.rutas[k][0] + '</span>'; }).join(''); }
  function fila(href, tt, ss, rt) { return '<li><a href="' + href + '"><span class="gr"><span class="tt">' + tt + '</span>' + (ss ? '<span class="ss">' + ss + '</span>' : '') + '</span>' + (rt ? '<span class="rt">' + rt + '</span>' : '') + '<i class="chev"></i></a></li>'; }
  function cadena() { return '<h3>Cadena de suministro</h3><ul class="rows">' + emp('ca').map(function (e) { return fila('#/industria/' + e.id, e.n, e.res); }).join('') + '</ul>'; }
  function nota() { return '<p class="nota">Datos corporativos a ' + S.ind.corte + '. Producción de acero crudo 2025 según la World Steel Association.</p>'; }

  /* Piezas gráficas */
  var R = 36000 / (2 * Math.PI), Y0 = R * Math.log(Math.tan(Math.PI / 4 + 85 * Math.PI / 360));
  function my(lat) { return (Y0 - R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))) / 10; }
  function miniMapa() {
    var x1 = 540, x2 = 3360, y1 = my(72), y2 = my(-48);
    return '<svg viewBox="' + x1 + ' ' + y1.toFixed(0) + ' ' + (x2 - x1) + ' ' + (y2 - y1).toFixed(0) + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      '<path d="' + (S.mapaMini || '') + '" fill="#3b4b58" stroke="#141b22" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
      S.acerias.map(function (a) { return '<circle cx="' + ((a[4] + 180) * 10).toFixed(0) + '" cy="' + my(a[3]).toFixed(0) + '" r="' + (a[6] >= 8 ? 26 : 18) + '" fill="#ff3b30" stroke="#2a0806" stroke-width="5"/>'; }).join('') + '</svg>';
  }
  S.miniMapa = miniMapa;
  function reparto() {
    var resto = MUNDO.total, ps = MUNDO.partes.slice();
    ps.forEach(function (p) { resto -= p[1]; }); ps.push(['Resto del mundo', resto, '#55646f']);
    return '<div class="iv-rep">' + ps.map(function (p) { return '<i style="width:' + (100 * p[1] / MUNDO.total).toFixed(1) + '%;background:' + p[2] + '"></i>'; }).join('') + '</div>' +
      '<div class="iv-leg">' + ps.map(function (p) { return '<span><i style="background:' + p[2] + '"></i>' + p[0] + ' <b>' + Math.round(100 * p[1] / MUNDO.total) + ' %</b></span>'; }).join('') + '</div>';
  }
  function miniBarras(n) {
    var max = S.ranking[0][3];
    return '<div class="iv-mb">' + S.ranking.slice(0, n).map(function (r) { return '<div><span>' + esc(r[1]) + '</span><i style="width:' + Math.round(100 * r[3] / max) + '%;background:' + REG[PAIS[r[2]] || 'eu'][1] + '"></i></div>'; }).join('') + '</div>';
  }
  function dona() {
    var c = 2 * Math.PI * 30, a = c * 0.7;
    return '<svg viewBox="0 0 80 80" class="iv-dona" aria-hidden="true"><circle cx="40" cy="40" r="30" fill="none" stroke="' + S.rutas.E[1] + '" stroke-width="13"/>' +
      '<circle cx="40" cy="40" r="30" fill="none" stroke="' + S.rutas.I[1] + '" stroke-width="13" stroke-dasharray="' + a.toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 40 40)"/></svg>';
  }
  function accesos() {
    return '<div class="iv-g2"><a class="iv-tile" href="#/industria/ranking"><b>Ranking 2025</b>' + miniBarras(5) + '<span>Los 25 mayores productores</span></a>' +
      '<a class="iv-tile" href="#/industria/panorama"><b>Panorama</b><div class="iv-dw">' + dona() + '<div><em style="color:' + S.rutas.I[1] + '">70 %</em> alto horno<br><em style="color:' + S.rutas.E[1] + '">30 %</em> horno eléctrico</div></div><span>Cifras, México y aranceles</span></a></div>';
  }
  function hero(alto) {
    return '<a class="iv-hero' + (alto ? ' alto' : '') + '" href="#/industria/mapa"><span class="iv-hm">' + miniMapa() + '</span><span class="iv-hl"><b>' + S.acerias.length + ' acerías</b> en el mapa mundial<i class="chev"></i></span></a>';
  }
  function tarjetaMx(e) {
    var dato = e.prod || (S.resumen[e.id] || [])[2] || '';
    return '<a class="iv-card" href="#/industria/' + e.id + '"><b>' + esc(e.n) + '</b><p>' + esc(e.res || '') + '</p>' + (dato ? '<em>' + esc(dato) + '</em>' : '') + (rutas(e).length ? '<span class="iv-r">' + puntos(e) + '</span>' : '') + '</a>';
  }
  function tarjetaGl(e) {
    var v = mt(e.id), max = S.ranking[0][3], col = REG[PAIS[(e.pais || '').split(',')[0]] || 'eu'][1];
    return '<a class="iv-card" href="#/industria/' + e.id + '"><b>' + esc(e.n) + '</b><span class="iv-pais">' + esc(e.pais || '') + '</span>' +
      (v ? '<strong>' + v.toFixed(1) + '<small> Mt</small></strong><i class="iv-bar"><i style="width:' + Math.max(4, Math.round(100 * v / max)) + '%;background:' + col + '"></i></i>' : '<em>' + esc(e.prod || 'Sin cifra en el ranking') + '</em>') +
      (rutas(e).length ? '<span class="iv-r">' + puntos(e) + '</span>' : '') + '</a>';
  }

  /* Vista 1: tablero */
  function tablero() {
    return hero() +
      '<div class="iv-kpi"><b>1 849</b><span>millones de toneladas de acero crudo en 2025</span></div>' + reparto() + accesos() +
      '<h3>México y Grupo Techint</h3><div class="iv-car">' + emp('mx').map(tarjetaMx).join('') + '</div>' +
      '<h3>Jugadores globales</h3><div class="iv-car">' + emp('gl').map(tarjetaGl).join('') + '</div>' + cadena() + nota();
  }

  /* Vista 2: barras */
  function barras() {
    var max = S.ranking[0][3];
    return '<div class="iv-pills"><a href="#/industria/mapa">Mapa</a><a href="#/industria/ranking">Ranking</a><a href="#/industria/panorama">Panorama</a></div>' +
      '<h3 style="margin-top:14px">Producción 2025 por empresa <span class="small" style="font-weight:500">· Mt</span></h3>' +
      '<div class="iv-leg">' + Object.keys(REG).map(function (k) { return '<span><i style="background:' + REG[k][1] + '"></i>' + REG[k][0] + '</span>'; }).join('') + '</div>' +
      '<div class="iv-bars">' + S.ranking.map(function (r) {
        var col = REG[PAIS[r[2]] || 'eu'][1], w = Math.max(2, 100 * r[3] / max).toFixed(1);
        var in_ = '<span class="n">' + r[0] + '</span><span class="g"><span class="t">' + esc(r[1]) + '</span><i><i style="width:' + w + '%;background:' + col + '"></i></i></span><span class="v">' + r[3].toFixed(1) + '</span>';
        return r[4] ? '<a href="#/industria/' + r[4] + '">' + in_ + '</a>' : '<div>' + in_ + '</div>';
      }).join('') + '</div><p class="small">Toca una empresa para abrir su ficha.</p>' +
      '<h3>México y Grupo Techint</h3><ul class="rows">' + emp('mx').map(function (e) { return fila('#/industria/' + e.id, e.n, (e.res || '') + (rutas(e).length ? '<span class="iv-r">' + puntos(e) + '</span>' : '')); }).join('') + '</ul>' +
      '<h3>Globales sin cifra propia en el ranking</h3><ul class="rows">' + emp('gl').filter(function (e) { return !mt(e.id); }).map(function (e) { return fila('#/industria/' + e.id, e.n, e.res); }).join('') + '</ul>' + cadena() + nota();
  }

  /* Vista 3: mosaico (treemap de producción) */
  function treemap(vals, W, H) {
    var sum = 0; vals.forEach(function (v) { sum += v; });
    var a = vals.map(function (v) { return v * W * H / sum; }), out = [], x = 0, y = 0, w = W, h = H, row = [], i = 0;
    function worst(r, side) { var s = 0, mx = 0, mn = 1e12; r.forEach(function (j) { s += a[j]; mx = Math.max(mx, a[j]); mn = Math.min(mn, a[j]); }); return Math.max(side * side * mx / (s * s), s * s / (side * side * mn)); }
    function lay() {
      var s = 0; row.forEach(function (j) { s += a[j]; });
      if (w >= h) { var cw = s / h, yy = y; row.forEach(function (j) { var hh = a[j] / cw; out[j] = [x, yy, cw, hh]; yy += hh; }); x += cw; w -= cw; }
      else { var ch = s / w, xx = x; row.forEach(function (j) { var ww = a[j] / ch; out[j] = [xx, y, ww, ch]; xx += ww; }); y += ch; h -= ch; }
      row = [];
    }
    while (i < a.length) {
      var side = Math.min(w, h);
      if (!row.length || worst(row.concat([i]), side) <= worst(row, side)) { row.push(i); i++; } else lay();
    }
    if (row.length) lay();
    return out;
  }
  function mosaico() {
    var W = 390, H = 540, rs = S.ranking, box = treemap(rs.map(function (r) { return r[3]; }), W, H);
    var CORTO = { 'Cleveland-Cliffs': 'Cliffs', 'Steel Dynamics': 'SDI', 'Grupo Techint': 'Techint', 'thyssenkrupp': 'thyssenkrupp', 'Shandong Steel': 'Shandong', 'Liuzhou Steel': 'Liuzhou', 'Hyundai Steel': 'Hyundai', 'Hunan Steel': 'Hunan', 'JFE Steel': 'JFE', 'JSW Steel': 'JSW', 'Tata Steel': 'Tata', 'Nippon Steel': 'Nippon Steel', 'China Baowu': 'China Baowu' };
    var MINI = { 'thyssenkrupp': 'tk Steel', 'Steel Dynamics': 'SDI', 'Shandong Steel': 'Shandong' };
    var cells = rs.map(function (r, i) {
      var b = box[i], col = REG[PAIS[r[2]] || 'eu'][1], cw = b[2] - 3, ch = b[3] - 3, pad = 10, nm = CORTO[r[1]] || r[1], num = r[3].toFixed(1), K = 0.65;
      var st = 'left:' + (100 * b[0] / W).toFixed(2) + '%;top:' + (100 * b[1] / H).toFixed(2) + '%;width:' + (100 * b[2] / W).toFixed(2) + '%;height:' + (100 * b[3] / H).toFixed(2) + '%';
      var fh = Math.min(17, (cw - pad) / (K * nm.length)), lab;
      if (fh >= 9.5 && ch >= fh + 10) {
        var fn = Math.min(cw > 150 ? 36 : 22, (cw - pad) / (0.58 * num.length), (ch - fh - 14));
        lab = '<b style="font-size:' + fh.toFixed(1) + 'px">' + esc(nm) + '</b>' + (fn >= 11 ? '<em style="font-size:' + fn.toFixed(1) + 'px">' + num + '</em>' : '');
      } else {
        if ((ch - pad) / (K * nm.length) < 8.5 && MINI[r[1]]) nm = MINI[r[1]];
        var fv = Math.max(8.5, Math.min(13, (ch - pad) / (K * nm.length), cw - 6));
        lab = '<b class="v" style="font-size:' + fv.toFixed(1) + 'px">' + esc(nm) + '</b>';
      }
      var inner = '<span style="background:' + col + '"' + (r[4] ? '' : ' class="off"') + '>' + lab + '</span>';
      return r[4] ? '<a style="' + st + '" href="#/industria/' + r[4] + '" aria-label="' + esc(r[1]) + ', ' + r[3] + ' Mt">' + inner + '</a>' : '<div style="' + st + '">' + inner + '</div>';
    }).join('');
    return '<p class="lead" style="margin-bottom:8px">Los 25 mayores productores de 2025. El área de cada bloque es su producción en Mt.</p>' +
      '<div class="iv-tm">' + cells + '</div>' +
      '<div class="iv-leg" style="margin-top:10px">' + Object.keys(REG).map(function (k) { return '<span><i style="background:' + REG[k][1] + '"></i>' + REG[k][0] + '</span>'; }).join('') + (rs.some(function (r) { return !r[4]; }) ? '<span><i style="background:#55646f"></i>Sin ficha</span>' : '') + '</div>' +
      hero(true) + accesos() +
      '<h3>México y Grupo Techint</h3><div class="iv-grid">' + emp('mx').map(tarjetaMx).join('') + '</div>' +
      '<h3>Globales sin cifra propia en el ranking</h3><ul class="rows">' + emp('gl').filter(function (e) { return !mt(e.id); }).map(function (e) { return fila('#/industria/' + e.id, e.n, e.res); }).join('') + '</ul>' + cadena() + nota();
  }

  S.industriaHome = function (listaHtml) {
    var v = get(), mk = { tablero: tablero, barras: barras, mosaico: mosaico, lista: function () { return listaHtml; } };
    if (!mk[v]) v = 'tablero';
    var h = '<div class="iv-sel" role="tablist" aria-label="Vista">' + VISTAS.map(function (x) { return '<button type="button" role="tab" data-v="' + x[0] + '"' + (x[0] === v ? ' class="on"' : '') + '>' + x[1] + '</button>'; }).join('') + '</div><div id="indv">' + mk[v]() + '</div>';
    return { title: 'Industria', html: h, after: function (root) {
      root.querySelector('.iv-sel').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        set(b.dataset.v); var bs = this.querySelectorAll('button'); for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('on', bs[i] === b);
        root.querySelector('#indv').innerHTML = mk[b.dataset.v]();
      });
    } };
  };
})();

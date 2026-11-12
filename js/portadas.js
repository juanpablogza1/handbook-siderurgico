/* Portadas gráficas de las pestañas Química y Normas. */
(function () {
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function fila(href, tt, ss, rt) { return '<li><a href="' + href + '"><span class="gr"><span class="tt">' + tt + '</span>' + (ss ? '<span class="ss">' + ss + '</span>' : '') + '</span>' + (rt ? '<span class="rt">' + rt + '</span>' : '') + '<i class="chev"></i></a></li>'; }
  S.normaNombre = function (n) { return n.cod.indexOf(n.org) === 0 ? n.cod : n.org + ' ' + n.cod; };
  function find(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function pts(a, fx, fy) { return a.map(function (p) { return fx(p[0]).toFixed(1) + ' ' + fy(p[1]).toFixed(1); }).join('L'); }

  /* ======================= Química ======================= */

  /* Diagrama Fe–Fe₃C de la zona de aceros (0–2.14 % C, 500–1600 °C), simplificado con rectas entre puntos invariantes. */
  function heroFeC() {
    var X0 = 34, X1 = 350, Y0 = 150, Y1 = 16, CM = 2.14, T0 = 500, T1 = 1600;
    function fx(c) { return X0 + (X1 - X0) * c / CM; }
    function fy(t) { return Y0 - (Y0 - Y1) * (t - T0) / (T1 - T0); }
    function area(a, col, op) { return '<path d="M' + pts(a, fx, fy) + 'Z" fill="' + col + '" fill-opacity="' + op + '"/>'; }
    function linea(a, dash) { return '<path d="M' + pts(a, fx, fy) + '" fill="none" stroke="#e9eef1" stroke-opacity=".6" stroke-width="1.3"' + (dash ? ' stroke-dasharray="3 3"' : '') + '/>'; }
    function txt(c, t, s, cl, anc) { return '<text x="' + fx(c).toFixed(1) + '" y="' + fy(t).toFixed(1) + '" text-anchor="' + (anc || 'middle') + '" class="' + (cl || '') + '">' + s + '</text>'; }
    var liqC = 1346, g = '';
    g += area([[0, 1600], [CM, 1600], [CM, liqC], [0.53, 1495], [0, 1538]], '#f26a1b', 0.42);
    g += area([[0, 1538], [0.53, 1495], [CM, liqC], [CM, 1147], [0.17, 1495], [0.09, 1495]], '#d9482b', 0.34);
    g += area([[0, 1538], [0.09, 1495], [0.17, 1495], [CM, 1147], [0.76, 727], [0, 912]], '#ffc53d', 0.2);
    g += area([[0, 912], [0.76, 727], [0, 727]], '#b9d6e2', 0.16);
    g += area([[0.76, 727], [CM, 1147], [CM, 727]], '#f58a2e', 0.13);
    g += area([[0, 727], [0.76, 727], [0.76, 500], [0, 500]], '#6aa3d8', 0.22);
    g += area([[0.76, 727], [CM, 727], [CM, 500], [0.76, 500]], '#6aa3d8', 0.38);
    g += linea([[0, 1538], [0.53, 1495], [CM, liqC]]) + linea([[0, 1538], [0.09, 1495], [0.17, 1495], [CM, 1147]]) +
      linea([[0, 912], [0.76, 727], [CM, 1147]]) + linea([[0, 727], [CM, 727]]) + linea([[0.76, 727], [0.76, 500]], true);
    g += '<circle cx="' + fx(0.76).toFixed(1) + '" cy="' + fy(727).toFixed(1) + '" r="3.2" fill="#ffc53d"/>';
    [600, 900, 1200, 1500].forEach(function (t) { g += '<text x="' + (X0 - 4) + '" y="' + (fy(t) + 3.5).toFixed(1) + '" text-anchor="end" class="ax">' + t + '</text>'; });
    g += '<text x="' + (X0 - 4) + '" y="10" text-anchor="end" class="ax">°C</text>';
    [[0, '0'], [0.5, '0.5'], [1, '1.0'], [1.5, '1.5'], [2, '2.0 % C']].forEach(function (c) { g += '<text x="' + fx(c[0]).toFixed(1) + '" y="' + (Y0 + 12) + '" text-anchor="' + (c[0] ? 'middle' : 'start') + '" class="ax">' + c[1] + '</text>'; });
    g += txt(1.35, 1505, 'Líquido') + txt(0.98, 1010, 'Austenita γ') + txt(0.38, 585, 'Ferrita + perlita', 'sm') + txt(1.45, 585, 'Perlita + cementita', 'sm') +
      txt(CM - 0.03, 742, '727 °C', 'ax', 'end');
    /* Regla de carbono con grados comunes */
    var yR = Y0 + 26, gr = [['IF', 0.003], ['1018', 0.18], ['1045', 0.45], ['1080', 0.8], ['52100', 1.0], ['D2', 1.5]];
    g += '<path d="M' + X0 + ' ' + yR + 'H' + X1 + '" stroke="#3a4957" stroke-width="2"/>';
    gr.forEach(function (x, i) {
      var cx = fx(x[1]).toFixed(1);
      g += '<circle cx="' + cx + '" cy="' + yR + '" r="3.5" fill="#ffc53d" stroke="#141b22" stroke-width="1.5"/><text x="' + cx + '" y="' + (yR + (i % 2 ? 26 : 14)) + '" text-anchor="middle" class="gr">' + x[0] + '</text>';
    });
    g += '<text x="' + X1 + '" y="' + (yR + 14) + '" text-anchor="end" class="ax">carbono de grados comunes</text>';
    return '<a class="iv-hero po-hero" href="#/quimica/diagrama"><span class="iv-hm"><svg class="po-svg" viewBox="0 0 360 208" aria-hidden="true">' + g + '</svg></span>' +
      '<span class="iv-hl"><span class="po-hl"><b>Diagrama hierro-carbono</b><small>Interactivo: toca para ver la fase en cada punto</small></span><i class="chev"></i></span></a>';
  }

  function tileSim(corto) {
    var g = find(S.grados, '4140'), c = g ? g.c : { C: 0.4, Mn: 0.85, Cr: 0.95, Mo: 0.2 };
    var ks = Object.keys(c).filter(function (k) { return k !== 'P' && k !== 'S'; }).sort(function (a, b) { return c[b] - c[a]; }).slice(0, 5);
    var max = c[ks[0]], col = {};
    S.elementos.forEach(function (e) { col[e.s] = S.grupos[e.g][1]; });
    return '<a class="iv-tile" href="#/quimica/simulador"><b>Simulador de aceros</b><div class="po-comp">' + ks.map(function (k) {
      return '<div><span>' + k + '</span><i><i style="width:' + Math.max(6, Math.round(100 * c[k] / max)) + '%;background:' + (col[k] || '#a3b2be') + '"></i></i><em>' + c[k] + '</em></div>';
    }).join('') + '</div>' + (corto ? '<span>Combina elementos y ve qué acero sale.</span></a>' : (S.clasificar ? '<p class="po-res"><small>Resultado</small>' + esc(S.clasificar(c).fam) + '</p>' : '') +
      '<span>' + (g ? esc(g.n) : 'SAE 4140') + ' de ejemplo. Ajusta la química y ve familia, soldabilidad y temple.</span></a>');
  }

  var FAMS = [
    ['Carbono', '#ffc53d', /carbono|maquinado/i], ['HSLA y AHSS', '#f26a1b', /hsla|ahss|patinable/i], ['Aleados', '#6aa3d8', /aleado|cr-mo|criog|maraging|manganeso/i],
    ['Inoxidables', '#b9d6e2', /inoxidable/i], ['Herramienta', '#7fc8a0', /herramienta|r[aá]pido/i], ['Eléctricos y hierros', '#a3b2be', /el[eé]ctrico|hierro/i]];
  function tileGrados() {
    var n = FAMS.map(function () { return 0; });
    S.grados.forEach(function (g) { for (var i = 0; i < FAMS.length; i++) if (FAMS[i][2].test(g.fam)) { n[i]++; return; } });
    var max = Math.max.apply(null, n);
    return '<a class="iv-tile" href="#/quimica/grados"><b>Grados comunes</b><strong class="po-big">' + S.grados.length + '</strong><div class="po-hist">' + FAMS.map(function (f, i) {
      return '<div><span>' + f[0] + '</span><i style="width:' + Math.max(4, Math.round(100 * n[i] / max)) + '%;background:' + f[1] + '"></i><em>' + n[i] + '</em></div>';
    }).join('') + '</div><span>Composición, propiedades y usos de cada uno.</span></a>';
  }

  function elementos() {
    var orden = Object.keys(S.grupos), es = S.elementos.slice().sort(function (a, b) { return orden.indexOf(a.g) - orden.indexOf(b.g); });
    return '<h3>Qué aporta cada elemento</h3><div class="iv-leg">' + orden.map(function (k) { return '<span><i style="background:' + S.grupos[k][1] + '"></i>' + S.grupos[k][0] + '</span>'; }).join('') + '</div>' +
      '<div class="po-el">' + es.map(function (e) { return '<a href="#/quimica/elementos/' + e.s + '" style="--c:' + S.grupos[e.g][1] + '"><b>' + e.s + '</b><span>' + esc(e.n) + '</span></a>'; }).join('') + '</div>';
  }

  /* Ciclos térmicos: misma austenización, tres enfriamientos distintos. Esquema sin escala. */
  function ciclos() {
    function y(t) { return (160 - t * 0.15).toFixed(1); }
    var R = '#6aa3d8', N = '#7fc8a0', T = '#f26a1b';
    var g = '<path d="M30 ' + y(727) + 'H352" stroke="#7d8b97" stroke-width="1" stroke-dasharray="3 3"/><text x="352" y="' + (y(727) - 4) + '" text-anchor="end" class="ax">A₁ 727 °C</text>' +
      '<path d="M30 ' + y(860) + 'H352" stroke="none"/>' +
      '<path d="M14 ' + y(25) + 'L62 ' + y(850) + 'H112" fill="none" stroke="#e9eef1" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<text x="87" y="' + (y(850) - 6) + '" text-anchor="middle" class="sm">Austenizado 850 °C</text>' +
      '<path d="M112 ' + y(850) + 'C205 ' + y(830) + ' 290 ' + y(620) + ' 352 ' + y(300) + '" fill="none" stroke="' + R + '" stroke-width="2.4"/>' +
      '<path d="M112 ' + y(850) + 'C150 ' + y(640) + ' 185 ' + y(130) + ' 300 ' + y(60) + '" fill="none" stroke="' + N + '" stroke-width="2.4"/>' +
      '<path d="M112 ' + y(850) + 'C117 ' + y(420) + ' 121 ' + y(80) + ' 140 ' + y(30) + 'H160L186 ' + y(550) + 'H236C254 ' + y(250) + ' 280 ' + y(60) + ' 330 ' + y(30) + '" fill="none" stroke="' + T + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<text x="211" y="' + (y(550) - 6) + '" text-anchor="middle" class="sm">Revenido 550 °C</text>' +
      '<path d="M14 ' + y(0) + 'H352" stroke="#3a4957" stroke-width="1.2"/><text x="352" y="' + (+y(0) + 12) + '" text-anchor="end" class="ax">tiempo, sin escala</text>';
    var ley = [[R, 'Recocido, en horno', 'perlita gruesa: blando y maquinable'], [N, 'Normalizado, al aire', 'perlita fina: grano afinado'], [T, 'Temple y revenido', 'martensita revenida: duro y tenaz']];
    return '<div class="po-card"><b class="po-ct">Tratamiento térmico y microestructura</b><p class="po-cs">La misma química da aceros distintos según cómo se enfría desde la austenita.</p>' +
      '<svg class="po-svg" viewBox="0 0 360 176" aria-hidden="true">' + g + '</svg>' +
      '<ul class="po-ley">' + ley.map(function (l) { return '<li><i style="background:' + l[0] + '"></i><span><b>' + l[1] + '</b> ' + l[2] + '</span></li>'; }).join('') + '</ul>' +
      '<div class="iv-pills"><a href="#/quimica/microestructuras">Microestructuras</a><a href="#/quimica/tratamientos">Tratamientos térmicos</a></div></div>';
  }

  /* Resistencia contra elongación por familia de acero para lámina. Rangos aproximados de la industria automotriz. */
  var BAN = [
    ['IF', 260, 380, 38, 50, 'c', -14, 0], ['Suave', 270, 420, 28, 42, 'c', 0, 4], ['HSLA', 400, 650, 16, 30, 'c', 0, 0],
    ['DP', 500, 1200, 8, 28, 'a', 22, 4], ['TRIP', 600, 1000, 20, 34, 'a', 0, -2], ['CP', 800, 1250, 6, 14, 'a', 18, 2],
    ['Martensítico', 1000, 1750, 2, 9, 'a', 10, 2], ['TWIP', 850, 1150, 48, 64, 'u', 0, 0], ['Inox. austenítico', 500, 780, 40, 60, 'u', 0, 0]];
  var BCOL = { c: ['#6aa3d8', 'Convencionales'], a: ['#f26a1b', 'Avanzados (AHSS)'], u: ['#7fc8a0', 'Austeníticos'] };
  function banana() {
    var X0 = 34, X1 = 352, Y0 = 160, Y1 = 10, R0 = 200, R1 = 1800, E1 = 70;
    function fx(r) { return X0 + (X1 - X0) * (r - R0) / (R1 - R0); }
    function fy(e) { return Y0 - (Y0 - Y1) * e / E1; }
    var g = '';
    [0, 20, 40, 60].forEach(function (e) { g += '<path d="M' + X0 + ' ' + fy(e).toFixed(1) + 'H' + X1 + '" stroke="#2c3945"/><text x="' + (X0 - 4) + '" y="' + (fy(e) + 3.5).toFixed(1) + '" text-anchor="end" class="ax">' + e + '</text>'; });
    [400, 800, 1200, 1600].forEach(function (r) { g += '<text x="' + fx(r).toFixed(1) + '" y="' + (Y0 + 12) + '" text-anchor="middle" class="ax">' + r + '</text>'; });
    g += '<text x="' + (X0 - 4) + '" y="7" text-anchor="end" class="ax">%</text><text x="' + X1 + '" y="' + (Y0 + 24) + '" text-anchor="end" class="ax">resistencia a la tensión, MPa</text><text x="' + (X0 + 2) + '" y="' + (Y1 + 2) + '" class="ax">elongación</text>';
    BAN.forEach(function (b) {
      var cx = (fx(b[1]) + fx(b[2])) / 2, cy = (fy(b[3]) + fy(b[4])) / 2, rx = (fx(b[2]) - fx(b[1])) / 2, ry = (fy(b[3]) - fy(b[4])) / 2, c = BCOL[b[5]][0];
      g += '<ellipse cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" rx="' + rx.toFixed(1) + '" ry="' + ry.toFixed(1) + '" fill="' + c + '" fill-opacity=".2" stroke="' + c + '" stroke-opacity=".8" stroke-width="1.2"/>';
    });
    BAN.forEach(function (b) {
      var cx = (fx(b[1]) + fx(b[2])) / 2 + b[6], cy = (fy(b[3]) + fy(b[4])) / 2 + 3.5 + b[7];
      g += '<text x="' + cx.toFixed(1) + '" y="' + cy.toFixed(1) + '" text-anchor="middle" class="bl">' + b[0] + '</text>';
    });
    return '<div class="po-card"><b class="po-ct">Resistencia contra ductilidad</b><p class="po-cs">Lámina para autos: al subir la resistencia se pierde elongación, salvo en los aceros que transforman o maclan al deformarse.</p>' +
      '<svg class="po-svg" viewBox="0 0 360 188" aria-hidden="true">' + g + '</svg>' +
      '<div class="iv-leg">' + Object.keys(BCOL).map(function (k) { return '<span><i style="background:' + BCOL[k][0] + '"></i>' + BCOL[k][1] + '</span>'; }).join('') + '</div>' +
      '<p class="small" style="margin:6px 0 10px">Rangos aproximados de grados comerciales.</p>' +
      '<div class="iv-pills"><a href="#/quimica/familias">Familias de aceros</a><a href="#/quimica/propiedades">Propiedades</a></div></div>';
  }

  S.quimicaHome = function () {
    var h = '<p class="lead">El acero es hierro con hasta 2.1 % de carbono. Décimas de punto de otros elementos, y el camino térmico, deciden si será una lata o un riel.</p>' +
      heroFeC() + '<div class="iv-g2">' + tileSim() + tileGrados() + '</div>' + elementos() + ciclos() + banana();
    return { title: 'Química del acero', html: h };
  };

  /* ======================= Normas ======================= */

  var ORG = { ASTM: '#f58a2e', EN: '#6aa3d8', JIS: '#ef6b5a', GB: '#a3b2be', NMX: '#7fc8a0', API: '#ffc53d', SAE: '#b9d6e2' };
  function ocol(o) { return ORG[o] || '#55646f'; }

  /* Equivalencias estructurales: límite elástico mínimo por sistema */
  var EQ = [
    ['ASTM', [['astm-a36', 'A36', 'A36'], ['astm-a572', 'Grado 50', 'A572-50'], ['astm-a572', 'Grado 65', 'A572-65'], ['astm-a514', 'A514', 'A514']]],
    ['EN', [['en-en-10025', 'S235', 'S235'], ['en-en-10025', 'S275', 'S275'], ['en-en-10025', 'S355', 'S355'], ['en-en-10025', 'S460', 'S460'], ['en-en-10025', 'S690Q', 'S690Q']]],
    ['JIS', [['jis-g-3101', 'SS400', 'SS400'], ['jis-g-3101', 'SS490', 'SS490'], ['jis-g-3101', 'SS540', 'SS540']]],
    ['GB', [['gb-gb-t-700-y-1591', 'Q235', 'Q235'], ['gb-gb-t-700-y-1591', 'Q355', 'Q355']]],
    ['NMX', [['nmx-b-254', 'B-254', 'B-254'], ['nmx-b-284', 'Grado 345', 'B-284 345'], ['nmx-b-284', 'Grado 450', 'B-284 450']]]];
  function fyDe(id, gr) {
    var n = find(S.normas, id); if (!n) return 0;
    for (var i = 0; i < n.gr.length; i++) if (n.gr[i][0] === gr) { var m = String(n.gr[i][1]).replace(/\s/g, '').match(/\d+/); return m ? +m[0] : 0; }
    return 0;
  }
  function heroEq() {
    var V0 = 205, VA = 480, VB = 665, V1 = 715, K = 0.55, GAP = 26, PAD = 12, H = (VA - V0 + V1 - VB) * K + GAP + 2 * PAD, n = EQ.length;
    function top(v) { return v >= VB ? PAD + (V1 - v) * K : PAD + (V1 - VB) * K + GAP + (VA - Math.min(v, VA)) * K; }
    var h = '<div class="po-eqh">' + EQ.map(function (c) { return '<b style="color:' + ocol(c[0]) + '">' + c[0] + '</b>'; }).join('') + '</div><div class="po-eq" style="height:' + H + 'px">';
    [250, 350, 450, 690].forEach(function (v) { h += '<i class="po-gl" style="top:' + top(v) + 'px"></i><em style="top:' + top(v) + 'px">' + v + '</em>'; });
    h += '<i class="po-cut" style="top:' + (PAD + (V1 - VB) * K + GAP / 2) + 'px"></i>';
    EQ.forEach(function (c, i) {
      var chips = c[1].map(function (x) { return { x: x, v: fyDe(x[0], x[1]) }; }).filter(function (o) { return o.v; }).sort(function (a, b) { return b.v - a.v; });
      var last = -1e9;
      chips.forEach(function (o) { var t = Math.max(top(o.v), last + 21); o.t = t; last = t; });
      h += chips.map(function (o) {
        return '<a class="po-chip" href="#/normas/' + o.x[0] + '" style="top:' + o.t + 'px;left:calc(30px + (100% - 30px) * ' + i + ' / ' + n + ');width:calc((100% - 30px) / ' + n + ' - 5px);--c:' + ocol(c[0]) + '" aria-label="' + esc(c[0] + ' ' + o.x[2] + ', ' + o.v + ' MPa') + '">' + esc(o.x[2]) + '</a>';
      }).join('');
    });
    return '<div class="iv-hero po-eqw"><div class="po-eqt"><b>Equivalencias estructurales</b><span>Límite elástico mínimo, MPa. Toca un grado para abrir su norma.</span></div>' + h + '</div>' +
      '<p class="po-eqn">Mismo nivel no significa sustituible: compara química, espesor y pruebas.</p></div>';
  }

  function tileDes() {
    return '<a class="iv-tile" href="#/normas/sistemas"><b>Cómo leer una designación</b><div class="po-des"><span class="a">41</span><span class="b">40</span></div>' +
      '<div class="po-desl"><span><i class="a"></i>Familia: cromo-molibdeno</span><span><i class="b"></i>0.40 % de carbono</span></div><span>SAE, ASTM, EN, JIS, calibres y varilla.</span></a>';
  }
  function tileGalv() {
    var gi = 0; S.sistemas.forEach(function (s, k) { if (s.id === 'galv') gi = k; });
    var capas = [['G30', 'Z90', 90], ['G60', 'Z180', 180], ['G90', 'Z275', 275], ['G115', 'Z350', 350], ['G185', 'Z550', 550]];
    return '<a class="iv-tile" href="#/normas/sistemas/' + gi + '"><b>Galvanizado</b><div class="po-capa">' + capas.map(function (c) {
      return '<div><span>' + c[0] + ' = ' + c[1] + '</span><i style="width:' + Math.round(100 * c[2] / 550) + '%"></i></div>';
    }).join('') + '</div><span>Capa de zinc, g/m² en ambas caras. Grados y qué pedir.</span></a>';
  }

  /* Pictogramas de cada categoría (trazo, 32 × 32) */
  var ICO = [
    '<path d="M7 7h18M7 25h18M16 7v18"/>',
    '<circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="6.5"/><circle cx="16" cy="16" r="3"/>',
    '<ellipse cx="8" cy="16" rx="3.5" ry="7"/><path d="M8 9h17M8 23h17"/><path d="M25 9a3.5 7 0 0 1 0 14"/>',
    '<path d="M4 13h24M4 19h24"/><path d="M8 13l-2 6M13 13l-2 6M18 13l-2 6M23 13l-2 6"/>',
    '<path d="M9 9h14a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4a5 5 0 0 1 5-5z"/><path d="M12 9v14M20 9v14"/>',
    '<path d="M11 4h10l3 4-3 4H11L8 8z"/><path d="M13 12v16h6V12"/><path d="M13 16l6 2M13 20l6 2M13 24l6 2"/>',
    '<rect x="5" y="5" width="22" height="22" rx="4"/><text x="16" y="20.5" text-anchor="middle">Cr</text>',
    '<path d="M4 11h7l2 3h6l2-3h7v10h-7l-2-3h-6l-2 3H4z"/>'];
  function categorias() {
    return '<h3>Por producto</h3><div class="po-cats">' + S.normaCats.map(function (c, k) {
      var n = S.normas.filter(function (x) { return x.cat === c; }).length;
      return '<a href="#/normas/cat-' + k + '"><svg viewBox="0 0 32 32" aria-hidden="true">' + (ICO[k] || '') + '</svg><span><b>' + esc(c) + '</b><em>' + n + (n === 1 ? ' norma' : ' normas') + '</em></span></a>';
    }).join('') + '</div>';
  }
  function organismos() {
    var cnt = {}, tot = S.normas.length, otros = 0;
    S.normas.forEach(function (n) { cnt[n.org] = (cnt[n.org] || 0) + 1; });
    var ks = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }), pr = [];
    ks.forEach(function (k) { if (ORG[k] && cnt[k] >= 2) pr.push([k, cnt[k], ORG[k]]); else otros += cnt[k]; });
    if (otros) pr.push(['Otros', otros, '#55646f']);
    return '<h3>Quién las emite</h3><a class="iv-tile po-org" href="#/normas/organismos"><div class="iv-rep">' + pr.map(function (p) { return '<i style="width:' + (100 * p[1] / tot).toFixed(1) + '%;background:' + p[2] + '"></i>'; }).join('') + '</div>' +
      '<div class="iv-leg">' + pr.map(function (p) { return '<span><i style="background:' + p[2] + '"></i>' + p[0] + ' <b>' + p[1] + '</b></span>'; }).join('') + '</div><span>Normas en la app por organismo. Toca para ver qué emite cada uno.<i class="chev"></i></span></a>';
  }

  S.normasCategoria = function (k) {
    var c = S.normaCats[k]; if (!c) return null;
    var ns = S.normas.filter(function (n) { return n.cat === c; });
    return { title: c, html: '<p class="lead">' + ns.length + (ns.length === 1 ? ' norma.' : ' normas.') + '</p><ul class="rows">' +
      ns.map(function (n) { return fila('#/normas/' + n.id, '<span class="po-dot" style="background:' + ocol(n.org) + '"></span>' + S.normaNombre(n), n.t); }).join('') + '</ul>' };
  };

  S.normasHome = function () {
    var orgs = ['ASTM', 'NMX', 'API', 'EN', 'JIS', 'SAE'];
    var h = '<p class="lead">Una norma fija qué debe cumplir el producto: química, propiedades, tolerancias y pruebas.</p>' +
      heroEq() + '<div class="iv-g2">' + tileDes() + tileGalv() + '</div>' + categorias() + organismos() +
      '<h3>Todas las normas</h3><div class="presets" id="nf"><button type="button" data-o="" class="on">Todas</button>' + orgs.map(function (o) { return '<button type="button" data-o="' + o + '"><i class="po-dot" style="background:' + ocol(o) + '"></i>' + o + '</button>'; }).join('') + '</div><div id="nl"></div>';
    return { title: 'Normas y usos', html: h, after: function (root) {
      function paint(o) {
        var out = '';
        S.normaCats.forEach(function (c) {
          var ns = S.normas.filter(function (n) { return n.cat === c && (!o || n.org === o); });
          if (ns.length) out += '<h4 class="plg">' + c + '</h4><ul class="rows">' + ns.map(function (n) { return fila('#/normas/' + n.id, S.normaNombre(n), n.t); }).join('') + '</ul>';
        });
        root.querySelector('#nl').innerHTML = out || '<p class="lead">Sin normas de ese organismo.</p>';
        var bs = root.querySelectorAll('#nf button');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('on', bs[i].dataset.o === o);
      }
      root.querySelector('#nf').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { S._nf = b.dataset.o; paint(S._nf); } });
      paint(S._nf || '');
    } };
  };
  /* ======================= Procesos ======================= */

  function grados(t) { if (t == null) return 'Ambiente'; var s = String(t); return (t >= 1000 ? s.slice(0, -3) + ' ' + s.slice(-3) : s) + ' °C'; }
  function colorP(p) { return p.temp == null ? '#7d8b97' : S.tempColor(p.temp); }

  /* Ruta interactiva: el usuario elige qué fabricar y por qué ruta; el diagrama ilumina el camino
     y abajo se explica paso a paso. Nodo: [id, columna, fila, nombre, qué sale, ancho] */
  var FL = [
    ['mineria', 1, 0, 'Minería', 'concentrado'],
    ['coque', 0, 1, 'Coque', 'del carbón'], ['peletizado', 1, 1, 'Pélets y sínter', 'mineral aglomerado'],
    ['alto-horno', 0, 2, 'Alto horno', 'arrabio líquido'], ['reduccion-directa', 1, 2, 'Reducción directa', 'hierro esponja'],
    ['bof', 0, 3, 'Convertidor BOF', 'acero líquido'], ['*chatarra', 1, 3, 'Chatarra', 'reciclada'], ['eaf', 2, 3, 'Horno eléctrico', 'acero líquido'],
    ['metalurgia-secundaria', 1, 4, 'Metalurgia secundaria', 'química exacta', 150],
    ['colada-continua', 1, 5, 'Colada continua', 'planchón o palanquilla', 150],
    ['largos', 0, 6, 'Lam. de largos', 'varilla, perfiles'], ['laminacion-caliente', 1, 6, 'Lam. en caliente', 'rollo caliente'], ['tubos-sin-costura', 2, 6, 'Tubo sin costura', 'de barra redonda'],
    ['trefilado', 0, 7, 'Trefilado', 'alambre'], ['decapado', 1, 7, 'Decapado', 'rollo sin óxido'], ['tubos-erw', 2, 7, 'Tubo con costura', 'de rollo caliente'],
    ['laminacion-frio', 1, 8, 'Lam. en frío', 'rollo delgado'],
    ['recocido', 0, 9, 'Recocido', 'lámina suave'], ['galvanizado', 1, 9, 'Galvanizado', 'capa de zinc'],
    ['hojalata', 0, 10, 'Hojalata', 'capa de estaño'], ['pintado', 1, 10, 'Pintado', 'pintura horneada'], ['rolado', 2, 10, 'Rolado', 'techos, losacero']];
  var ED = [['mineria', 'peletizado'], ['peletizado', 'alto-horno'], ['peletizado', 'reduccion-directa'], ['coque', 'alto-horno'], ['alto-horno', 'bof'],
    ['reduccion-directa', 'eaf'], ['*chatarra', 'bof', 1], ['*chatarra', 'eaf'], ['bof', 'metalurgia-secundaria'], ['eaf', 'metalurgia-secundaria'],
    ['metalurgia-secundaria', 'colada-continua'], ['colada-continua', 'largos'], ['colada-continua', 'laminacion-caliente'], ['colada-continua', 'tubos-sin-costura'],
    ['largos', 'trefilado'], ['laminacion-caliente', 'decapado'], ['laminacion-caliente', 'tubos-erw'], ['decapado', 'laminacion-frio'],
    ['laminacion-frio', 'recocido'], ['laminacion-frio', 'galvanizado'], ['recocido', 'hojalata'], ['galvanizado', 'pintado'], ['galvanizado', 'rolado'], ['pintado', 'rolado']];
  var RUTA = {
    I: ['Alto horno', 'Mineral y coque; 15–25 % de chatarra en el convertidor', ['mineria', 'peletizado', 'coque', 'alto-horno', '*chatarra', 'bof', 'metalurgia-secundaria', 'colada-continua']],
    D: ['Reducción directa', 'Mineral reducido con gas, fundido con chatarra en horno eléctrico', ['mineria', 'peletizado', 'reduccion-directa', '*chatarra', 'eaf', 'metalurgia-secundaria', 'colada-continua']],
    E: ['Chatarra', 'Solo chatarra fundida en horno eléctrico', ['*chatarra', 'eaf', 'metalurgia-secundaria', 'colada-continua']]};
  var PROD = [
    ['lc', 'Rollo en caliente', 'planchón', ['laminacion-caliente'], 'Para estructuras, tubería, autopartes gruesas o para seguir a frío.'],
    ['tc', 'Tubo con costura', 'planchón', ['laminacion-caliente', 'tubos-erw'], 'Se forma con fleje del rollo caliente, decapado o no. También se hace con lámina en frío o galvanizada.'],
    ['lf', 'Lámina en frío', 'planchón', ['laminacion-caliente', 'decapado', 'laminacion-frio', 'recocido'], 'Más delgada, lisa y precisa: carrocería, línea blanca, muebles.'],
    ['ga', 'Galvanizada', 'planchón', ['laminacion-caliente', 'decapado', 'laminacion-frio', 'galvanizado'], 'El zinc protege de la corrosión: autos, construcción y electrodomésticos. También se galvaniza rollo decapado sin pasar por frío.'],
    ['pi', 'Prepintada', 'planchón', ['laminacion-caliente', 'decapado', 'laminacion-frio', 'galvanizado', 'pintado'], 'Zinc más pintura horneada: fachadas, techos y línea blanca.'],
    ['te', 'Techo y losacero', 'planchón', ['laminacion-caliente', 'decapado', 'laminacion-frio', 'galvanizado', 'rolado'], 'La lámina galvanizada, o pintada, se perfila en rodillos sin calentarla.'],
    ['ho', 'Hojalata', 'planchón', ['laminacion-caliente', 'decapado', 'laminacion-frio', 'recocido', 'hojalata'], 'Lámina muy delgada con estaño: latas de alimentos y aerosoles.'],
    ['ts', 'Tubo sin costura', 'barra redonda', ['tubos-sin-costura'], 'Se perfora una barra redonda al rojo: pozos petroleros, calderas.'],
    ['va', 'Varilla y perfiles', 'palanquilla o tocho', ['largos'], 'Construcción: varilla corrugada, vigas, ángulos y canales.'],
    ['al', 'Alambre', 'palanquilla', ['largos', 'trefilado'], 'El alambrón se estira en frío por dados: malla, clavo, torón.']];
  var SALE = { mineria: 'concentrado y finos de mineral', peletizado: 'pélets y sínter', coque: 'coque', 'alto-horno': 'arrabio líquido, 4–4.7 % C', 'reduccion-directa': 'hierro esponja sólido (HRD)',
    bof: 'acero líquido', eaf: 'acero líquido', 'metalurgia-secundaria': 'acero con la química exacta', 'laminacion-caliente': 'rollo laminado en caliente', largos: 'varilla, alambrón o perfiles',
    'tubos-sin-costura': 'tubo sin costura', trefilado: 'alambre', decapado: 'rollo limpio y aceitado', 'tubos-erw': 'tubo con costura', 'laminacion-frio': 'rollo delgado y duro',
    recocido: 'lámina rolada en frío, suave', galvanizado: 'lámina galvanizada', hojalata: 'hojalata', pintado: 'lámina prepintada', rolado: 'lámina acanalada, losacero, polines' };
  var CORTO = {}; FL.forEach(function (f) { CORTO[f[0]] = f[3]; });
  var KR = 'sid.ruta';
  function leeSel() { try { var v = JSON.parse(localStorage.getItem(KR) || 'null'); if (v && RUTA[v.r] && v.p) return v; } catch (e) {} return { r: 'I', p: 'ga' }; }
  function guardaSel(v) { try { localStorage.setItem(KR, JSON.stringify(v)); } catch (e) {} }
  function prodDe(k) { for (var i = 0; i < PROD.length; i++) if (PROD[i][0] === k) return PROD[i]; return PROD[3]; }

  function flujo() {
    var CX = [59, 180, 301], W = 108, H = 34, PY = 52, Y0 = 21, nd = {}, g = '';
    FL.forEach(function (f) { nd[f[0]] = { x: CX[f[1]], y: Y0 + f[2] * PY, w: f[5] || W, f: f }; });
    g += '<defs><marker id="pfa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="#55646f"/></marker><marker id="pfa2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="#e9eef1"/></marker></defs>';
    ED.forEach(function (e) {
      var a = nd[e[0]], b = nd[e[1]], d;
      if (a.f[2] === b.f[2]) d = a.x < b.x ? 'M' + (a.x + a.w / 2) + ' ' + a.y + 'H' + (b.x - b.w / 2 - 1) : 'M' + (a.x - a.w / 2) + ' ' + a.y + 'H' + (b.x + b.w / 2 + 1);
      else {
        var y1 = a.y + H / 2, y2 = b.y - H / 2 - 1, m = (y1 + y2) / 2;
        d = a.x === b.x ? 'M' + a.x + ' ' + y1 + 'V' + y2 : 'M' + a.x + ' ' + y1 + 'C' + a.x + ' ' + (m + 6) + ' ' + b.x + ' ' + (m - 6) + ' ' + b.x + ' ' + y2;
      }
      g += '<g class="pf-e" data-a="' + e[0] + '" data-b="' + e[1] + '"><path class="ln' + (e[2] ? ' sec' : '') + '" d="' + d + '" marker-end="url(#pfa)"/><path class="fl" d="' + d + '"/></g>';
    });
    FL.forEach(function (f) {
      var n = nd[f[0]], x = n.x - n.w / 2, y = n.y - H / 2, ch = f[0][0] === '*', p = ch ? null : find(S.procesos, f[0]), c = ch ? '#a3b2be' : colorP(p);
      g += '<g class="pf-n' + (ch ? ' ch' : '') + '" data-id="' + f[0] + '" role="button" tabindex="0" aria-label="' + esc(ch ? 'Chatarra' : p.t) + '">' +
        '<rect x="' + x + '" y="' + y + '" width="' + n.w + '" height="' + H + '" rx="' + (ch ? 17 : 7) + '" fill="' + c + '" fill-opacity=".16" stroke="' + c + '"/>' +
        '<text x="' + n.x + '" y="' + (n.y - 2) + '" text-anchor="middle" class="nm">' + f[3] + '</text><text x="' + n.x + '" y="' + (n.y + 10.5) + '" text-anchor="middle" class="sb">' + f[4] + '</text></g>';
    });
    var alto = Y0 + 10 * PY + H / 2 + 4;
    return '<div class="iv-hero pf"><svg class="po-svg" id="pfsvg" viewBox="0 0 360 ' + alto + '" role="img" aria-label="Diagrama de la ruta del mineral al producto">' + g + '</svg>' +
      '<div class="pf-esc"><div class="escala" aria-hidden="true"></div><div class="escala-n"><span>Ambiente</span><span>700 °C</span><span>1 000</span><span>1 250</span><span>1 550 °C</span></div><p>El color de cada caja es la temperatura del material.</p></div>' +
      '<div class="pf-info" id="pfi" aria-live="polite"></div></div>';
  }
  function controles() {
    return '<h3 class="pf-h">¿Qué quieres fabricar?</h3><div class="presets pf-prod" id="pfp">' + PROD.map(function (x) { return '<button type="button" data-p="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<div class="pf-rt" id="pfr">' + Object.keys(RUTA).map(function (k) { return '<button type="button" data-r="' + k + '"><b>' + RUTA[k][0] + '</b></button>'; }).join('') + '</div><p class="pf-rd" id="pfrd"></p>';
  }
  function camino(sel) {
    var pr = prodDe(sel.p), up = RUTA[sel.r][2].slice();
    return { pr: pr, ids: up.concat(pr[3]) };
  }
  function pasos(sel) {
    var c = camino(sel), pr = c.pr, n = 0, h = '<ol class="ruta pf-pasos">';
    c.ids.forEach(function (id) {
      if (id === '*chatarra') {
        if (sel.r !== 'E') return;
        n++;
        return void (h += '<li style="--c:#a3b2be"><i class="nodo"></i><div class="pf-ps"><span class="tt"><span><em>' + n + '</em> Chatarra</span><span class="temp">Ambiente</span></span><span class="ss"><b>Sale:</b> chatarra clasificada por tipo y limpieza</span><span class="ss">Se compra, se separa y se carga en cestas al horno eléctrico.</span></div></li>');
      }
      var p = find(S.procesos, id); if (!p) return; n++;
      var sale = id === 'colada-continua' ? pr[2] : SALE[id], extra = '';
      if (id === 'bof') extra = ' La chatarra es 15–25 % de la carga.';
      if (id === 'eaf' && sel.r === 'D') extra = ' Se carga hierro esponja con chatarra.';
      h += '<li style="--c:' + colorP(p) + '"><i class="nodo"></i><a href="#/procesos/' + p.id + '"><span class="tt"><span><em>' + n + '</em> ' + esc(p.t) + '</span><span class="temp">' + esc(p.tt) + '</span></span>' +
        '<span class="ss"><b>Sale:</b> ' + esc(sale) + '</span><span class="ss">' + esc(p.r) + extra + '</span></a></li>';
    });
    return h + '</ol>';
  }
  function infoNodo(id) {
    if (id === '*chatarra') return '<b>Chatarra</b><span>Acero viejo de demolición, autos y recortes de planta. Es la carga principal del horno eléctrico y 15–25 % del convertidor.</span>';
    var p = find(S.procesos, id); if (!p) return '';
    return '<b style="color:' + colorP(p) + '">' + esc(p.t) + ' <small>' + esc(p.tt) + '</small></b><span><i>Entra:</i> ' + esc(p.ent) + '</span><span><i>Sale:</i> ' + esc(p.sal) + '</span>' +
      '<a href="#/procesos/' + p.id + '">Ver proceso y animación<i class="chev"></i></a>';
  }
  function montarRuta(root) {
    var svg = root.querySelector('#pfsvg'), info = root.querySelector('#pfi'), sel = leeSel(), foco = null;
    function pintar() {
      var c = camino(sel), on = {};
      c.ids.forEach(function (id) { on[id] = 1; });
      svg.querySelectorAll('.pf-n').forEach(function (n) { n.classList.toggle('on', !!on[n.dataset.id]); n.classList.toggle('foco', n.dataset.id === foco); });
      svg.querySelectorAll('.pf-e').forEach(function (e) { e.classList.toggle('on', !!(on[e.dataset.a] && on[e.dataset.b])); });
      root.querySelectorAll('#pfp button').forEach(function (b) { b.classList.toggle('on', b.dataset.p === sel.p); });
      root.querySelectorAll('#pfr button').forEach(function (b) { b.classList.toggle('on', b.dataset.r === sel.r); });
      root.querySelector('#pfrd').textContent = RUTA[sel.r][1] + '.';
      var aviso = sel.r === 'E' && sel.p === 'ho' ? ' Con solo chatarra es difícil: el cobre y el estaño que trae no se pueden quitar del acero, y la hojalata y el embutido profundo piden acero muy limpio.' : '';
      if (!foco) info.innerHTML = '<b>' + c.pr[1] + ' por ' + RUTA[sel.r][0].toLowerCase() + '</b><span>' + c.pr[4] + aviso + '</span><span class="pf-tip">Toca una caja para ver qué entra y qué sale.</span>';
      root.querySelector('#pfst').innerHTML = pasos(sel);
      root.querySelector('#pfsh').textContent = 'Paso a paso: ' + c.pr[1].toLowerCase() + ' por ' + RUTA[sel.r][0].toLowerCase();
    }
    root.querySelector('#pfp').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; sel.p = b.dataset.p; foco = null; guardaSel(sel); pintar(); });
    root.querySelector('#pfr').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; sel.r = b.dataset.r; foco = null; guardaSel(sel); pintar(); });
    function tocar(e) {
      var n = e.target.closest('.pf-n'); if (!n) return;
      foco = foco === n.dataset.id ? null : n.dataset.id; pintar();
      if (foco) info.innerHTML = infoNodo(foco);
    }
    svg.addEventListener('click', tocar);
    svg.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tocar(e); } });
    var bp = root.querySelector('#pfp .on'); pintar();
    bp = root.querySelector('#pfp .on'); if (bp && bp.scrollIntoView) { var cont = root.querySelector('#pfp'); cont.scrollLeft = Math.max(0, bp.offsetLeft - 40); }
  }
  /* Temperatura de trabajo: rango típico de cada proceso, con nombre y cifra, en el orden de la ruta */
  function rango(p) {
    var m = String(p.tt || '').replace(/(\d)[   ](\d{3})/g, '$1$2').match(/\d+/g);
    return m ? m.map(Number) : [];
  }
  function miles(n) { var s = String(n); return n >= 1000 ? s.slice(0, -3) + ' ' + s.slice(-3) : s; }
  function cardTemp() {
    var TM = 1700, LIQ = 1538, A1 = 727;
    function pc(t) { return (100 * t / TM).toFixed(2) + '%'; }
    var h = '<div class="po-tmp"><div class="po-tz"><i class="liq" style="left:' + pc(LIQ) + '"></i><i class="ln" style="left:' + pc(LIQ) + '"></i><i class="ln a1" style="left:' + pc(A1) + '"></i></div>' +
      '<div class="po-tr po-th"><span></span><span class="tk"><em style="left:' + pc(A1) + '">727</em><em style="left:' + pc(LIQ) + '">1 538</em></span></div>';
    S.etapas.forEach(function (e) {
      var ps = S.procesos.filter(function (x) { return x.et === e.id; }); if (!ps.length) return;
      h += '<div class="po-te">' + esc(e.t) + '</div>';
      ps.forEach(function (p) {
        var r = rango(p), lo = Math.min.apply(null, r), hi = Math.max.apply(null, r), barra, val;
        if (!r.length) {
          barra = '<i class="amb" style="left:' + pc(25) + '"></i>'; val = '<b style="left:calc(' + pc(25) + ' + 10px)">Ambiente</b>';
        } else {
          var txt = r.length === 1 ? miles(r[0]) : miles(r[0]) + (/→/.test(p.tt) ? ' → ' : '–') + miles(r[1]);
          barra = '<i style="left:' + pc(lo) + ';width:max(6px, ' + pc(hi - lo) + ');' + (r.length > 1 ? 'margin-left:0' : 'margin-left:-3px') + ';background:linear-gradient(90deg,' + S.tempColor(lo) + ',' + S.tempColor(hi) + ')"></i>';
          val = hi > 1100 ? '<b class="iz" style="right:calc(100% - ' + pc(lo) + ' + 8px)">' + txt + '</b>' : '<b style="left:calc(' + pc(hi) + ' + 8px)">' + txt + '</b>';
        }
        h += '<a class="po-tr" href="#/procesos/' + p.id + '"><span class="nm">' + esc(p.id === 'metalurgia-secundaria' ? 'Metalurgia sec.' : (CORTO[p.id] || p.t)) + '</span><span class="tk">' + barra + val + '</span></a>';
      });
    });
    h += '<div class="po-tr po-ax"><span></span><span class="tk">' + [0, 500, 1000, 1500].map(function (t) { return '<em style="left:' + pc(t) + '">' + miles(t) + '</em>'; }).join('') + '</span></div></div>';
    return '<div class="po-card"><b class="po-ct">Temperatura de trabajo</b><p class="po-cs">Rango típico de cada proceso, en °C. Arriba de 1 538 °C el hierro está líquido; abajo de 727 °C la austenita ya se transformó.</p>' + h +
      '<p class="small" style="margin:8px 0 0">Laminación: la barra va de la temperatura de entrada a la de salida. Toca un renglón para abrir el proceso.</p></div>';
  }
  function tileFab() {
    var ids = Object.keys(S.fab).sort(function (a, b) { return (S.fabUso[b] || []).length - (S.fabUso[a] || []).length; }).slice(0, 5), max = (S.fabUso[ids[0]] || []).length || 1;
    return '<a class="iv-tile" href="#/procesos/fabricantes"><b>Quién hace el equipo</b><div class="iv-mb">' + ids.map(function (id) {
      var n = (S.fabUso[id] || []).length;
      return '<div><span>' + esc(S.fab[id][0].split(' (')[0]) + '</span><i style="width:' + Math.round(100 * n / max) + '%;background:var(--acc)"></i></div>';
    }).join('') + '</div><span>' + Object.keys(S.fab).length + ' fabricantes; equipos en que aparecen.</span></a>';
  }
  function tileBalance() {
    var ent = [['Mineral y pélets', 1.6, '#b9d6e2'], ['Coque', 0.33, '#7d8b97']], sal = [['Arrabio', 1.0, S.tempColor(1500)], ['Escoria', 0.28, '#d9482b']], max = 1.6;
    function bars(a) { return a.map(function (r) { return '<div><span>' + r[0] + ' <em>' + String(r[1]).replace('.', '.') + ' t</em></span><i style="width:' + Math.round(100 * r[1] / max) + '%;background:' + r[2] + '"></i></div>'; }).join(''); }
    return '<a class="iv-tile" href="#/procesos/alto-horno"><b>Balance del alto horno</b><div class="po-bal"><small>Entra</small>' + bars(ent) + '<small>Sale</small>' + bars(sal) + '</div><span>Por tonelada de arrabio, más aire caliente y fundentes.</span></a>';
  }
  function ruta() {
    var h = '<ol class="ruta">';
    S.etapas.forEach(function (e) {
      var ps = S.procesos.filter(function (x) { return x.et === e.id; }); if (!ps.length) return;
      h += '<li class="et" style="--c:' + S.tempColor(ps[0].temp) + '">' + e.t + '</li>';
      ps.forEach(function (x) {
        var c = S.tempColor(x.temp);
        h += '<li style="--c:' + c + '"><i class="nodo"></i><a href="#/procesos/' + x.id + '"><span class="tt">' + x.t + '<span class="temp">' + x.tt + '</span></span><span class="ss">' + x.r + '</span></a></li>';
      });
    });
    return h + '</ol>';
  }
  S.procesosHome = function () {
    var h = '<p class="lead">Elige un producto y una ruta: el diagrama ilumina el camino del mineral, o de la chatarra, hasta el producto, y abajo se explica cada paso.</p>' +
      controles() + flujo() + '<h3 id="pfsh">Paso a paso</h3><div id="pfst"></div>' +
      '<div class="iv-g2">' + tileBalance() + tileFab() + '</div>' + cardTemp() + '<h3>Todos los procesos</h3>' + ruta();
    return { title: 'Procesos', html: h, after: montarRuta };
  };

  /* ======================= Inicio ======================= */

  function rutasMini() {
    function tc(id) { var p = find(S.procesos, id); return p ? colorP(p) : '#7d8b97'; }
    var H = 30, N = [
      ['i', 95, 20, 168, 'Alto horno y convertidor', '70 % del acero mundial', tc('bof')],
      ['e', 265, 20, 150, 'Horno eléctrico', '30 %, sobre todo chatarra', tc('eaf')],
      ['c', 180, 74, 150, 'Colada continua', '', tc('colada-continua')],
      ['p', 59, 124, 104, 'Planos', '', tc('laminacion-caliente')], ['l', 180, 124, 104, 'Largos', '', tc('largos')], ['t', 301, 124, 104, 'Tubos', '', tc('tubos-sin-costura')]];
    var nd = {}, g = '<defs><marker id="pfm" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#6c7a86"/></marker></defs>';
    N.forEach(function (n) { nd[n[0]] = n; });
    [['i', 'c'], ['e', 'c'], ['c', 'p'], ['c', 'l'], ['c', 't']].forEach(function (e) {
      var a = nd[e[0]], b = nd[e[1]], y1 = a[2] + H / 2, y2 = b[2] - H / 2 - 2, m = (y1 + y2) / 2;
      g += '<path d="M' + a[1] + ' ' + y1 + (a[1] === b[1] ? 'V' + y2 : 'C' + a[1] + ' ' + (m + 6) + ' ' + b[1] + ' ' + (m - 6) + ' ' + b[1] + ' ' + y2) + '" fill="none" stroke="#6c7a86" stroke-width="1.5" marker-end="url(#pfm)"/>';
    });
    N.forEach(function (n) {
      g += '<rect x="' + (n[1] - n[3] / 2) + '" y="' + (n[2] - (n[5] ? H / 2 + 4 : H / 2)) + '" width="' + n[3] + '" height="' + (n[5] ? H + 8 : H) + '" rx="7" fill="' + n[6] + '" fill-opacity=".16" stroke="' + n[6] + '" stroke-width="1.6"/>' +
        '<text x="' + n[1] + '" y="' + (n[2] + (n[5] ? -2 : 4)) + '" text-anchor="middle" class="nm">' + n[4] + '</text>' +
        (n[5] ? '<text x="' + n[1] + '" y="' + (n[2] + 12) + '" text-anchor="middle" class="tp" fill="#a3b2be">' + n[5] + '</text>' : '');
    });
    return '<svg class="po-svg" viewBox="0 0 360 146" aria-hidden="true">' + g + '</svg>';
  }
  S.inicioTablero = function () {
    var clave = ['C', 'Mn', 'Si', 'Cr', 'Ni', 'Mo', 'V', 'Nb', 'Ti', 'B'], col = {};
    S.elementos.forEach(function (e) { col[e.s] = S.grupos[e.g][1]; });
    var cnt = {}; S.normas.forEach(function (n) { cnt[n.org] = (cnt[n.org] || 0) + 1; });
    var orgs = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; });
    var procesos = '<a class="iv-hero po-ini" href="#/procesos"><span class="iv-hm">' + rutasMini() + '</span>' +
      '<span class="iv-hl"><span class="po-hl"><b>' + S.procesos.length + ' procesos animados</b><small>Dos rutas para hacer acero, una colada y tres familias de producto.</small></span><i class="chev"></i></span></a>';
    var quimica = '<a class="iv-tile" href="#/quimica"><b>Química del acero</b><div class="po-mel">' + clave.map(function (s) { return '<i style="--c:' + (col[s] || '#a3b2be') + '">' + s + '</i>'; }).join('') + '</div>' +
      '<span>' + S.elementos.length + ' elementos, diagrama Fe-C y ' + S.grados.length + ' grados.</span></a>';
    var normas = '<a class="iv-tile" href="#/normas"><b>Normas y usos</b><strong class="po-big">' + S.normas.length + '</strong><div class="iv-rep po-rep">' + orgs.map(function (o) {
      return '<i style="width:' + (100 * cnt[o] / S.normas.length).toFixed(1) + '%;background:' + ocol(o) + '"></i>'; }).join('') + '</div>' +
      '<span>ASTM, NMX, EN, JIS, API y más.</span></a>';
    var industria = '<a class="iv-tile" href="#/industria"><b>Industria</b><div class="po-map">' + (S.miniMapa ? S.miniMapa() : '') + '</div>' +
      '<span>' + S.acerias.length + ' acerías, ' + S.empresas.length + ' empresas.</span></a>';
    return procesos + '<div class="iv-g2">' + quimica + tileSim(true) + normas + industria + '</div>';
  };
})();

/* Precios del acero y sus insumos, en dólares (o pesos) por tonelada. Vista en Industria > Precios.
   Datos: data/precios.json (formato 2), que GitHub Actions actualiza cada día hábil desde CME (vía Yahoo Finance) y FRED. */
(function () {
  var MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var MESL = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var ST = 0.90718474, GT = 1.0160469;
  var KEY = 'sid.precios2', RANGOS = [['2', '2 años', 24], ['5', '5 años', 60], ['t', 'Desde 2015', 0]];
  var META = {
    hrc: { n: 'Rollo caliente EE. UU.', k: 'Rollo caliente', c: '#e07020', u: 't', cot: [ST, 'tonelada corta'] },
    bus: { n: 'Chatarra busheling', k: 'Chatarra', c: '#24a070', u: 't', cot: [GT, 'tonelada larga'] },
    mineral: { n: 'Mineral de hierro 62 %', k: 'Mineral', c: '#4a8ee6', u: 't' },
    zinc: { n: 'Zinc', uso: 'Galvanizado', u: 't' },
    estano: { n: 'Estaño', uso: 'Hojalata', u: 't' },
    niquel: { n: 'Níquel', uso: 'Inoxidable', u: 't' },
    aluminio: { n: 'Aluminio', uso: 'Calmado y Galvalume', u: 't' },
    gas: { n: 'Gas natural', uso: 'Reducción directa', u: 'MMBtu', dec: 2 },
    mxn: { n: 'Tipo de cambio', uso: 'Pesos por dólar', u: 'fx', dec: 2 }
  };
  var PRINC = ['hrc', 'bus', 'mineral'], OTROS = ['zinc', 'estano', 'niquel', 'aluminio', 'gas', 'mxn'], COL_O = '#9085e9';
  var EVENTOS = [[2020, 4, 'Pandemia'], [2022, 3, 'Guerra en Ucrania'], [2025, 6, 'Arancel de 50 % en EE. UU.']];

  function D() { return S.preciosData; }
  function n() { var j = D(); return (+j.fin.slice(0, 4) - j.inicio[0]) * 12 + (+j.fin.slice(5, 7) - j.inicio[1]) + 1; }
  function ix(y, m) { return (y - D().inicio[0]) * 12 + (m - D().inicio[1]); }
  function ym(i) { var t = D().inicio[1] - 1 + i; return [D().inicio[0] + Math.floor(t / 12), t % 12]; }
  function fecha(i) { var a = ym(i); return MES[a[1]] + ' ' + a[0]; }
  function fechaL(i) { var a = ym(i); return MESL[a[1]] + ' de ' + a[0]; }
  function ixIso(f) { return ix(+f.slice(0, 4), +f.slice(5, 7)); }
  function dia(f) { return +f.slice(8, 10) + ' ' + MES[+f.slice(5, 7) - 1] + ' ' + f.slice(0, 4); }
  function num(v, d) { var s = Math.abs(v).toFixed(d || 0), p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return (v < 0 ? '−' : '') + p.join('.'); }
  function pct(v) { return (v >= 0 ? '+' : '−') + num(Math.abs(v), Math.abs(v) < 10 ? 1 : 0) + ' %'; }
  function lee() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.r && v.on && v.o) return v; } catch (e) {}
    return { r: '5', on: { hrc: 1, bus: 1, mineral: 1 }, mon: 'USD', o: 'zinc' };
  }
  function guarda(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }

  /* Series en la moneda elegida. Pesos: cada mes al tipo de cambio promedio de ese mes (FRED, Reserva Federal). */
  function fxEn(i) { var d = D().series.mxn.d; for (var k = Math.min(i, d.length - 1); k >= 0; k--) if (d[k]) return d[k]; return null; }
  function serie(id, mon) {
    var s = D().series[id], m = META[id], N = n(), E = {}, conv = mon === 'MXN' && id !== 'mxn';
    if (!s) return null;
    ((s.est && s.est.m) || []).forEach(function (f) { E[ixIso(f)] = 1; });
    var d = [];
    for (var i = 0; i < N; i++) { var v = s.d[i]; d.push(v == null ? null : conv ? v * fxEn(i) : v); }
    var ult = null;
    if (s.ultimo && s.ultimo.f) { var iu = ixIso(s.ultimo.f); ult = { f: s.ultimo.f, i: iu, v: conv ? s.ultimo.v * fxEn(iu) : s.ultimo.v, diario: s.fuente === 'yahoo' }; }
    return { id: id, m: m, d: d, E: E, ult: ult, s: s, mon: conv ? 'MXN' : 'USD' };
  }
  function margen(mon) {
    var a = serie('hrc', mon), b = serie('bus', mon), d = [], E = {};
    a.d.forEach(function (v, i) { d.push(v != null && b.d[i] != null ? v - b.d[i] : null); if (b.E[i]) E[i] = 1; });
    var ult = a.ult && b.ult && a.ult.i === b.ult.i ? { f: a.ult.f < b.ult.f ? a.ult.f : b.ult.f, i: a.ult.i, v: a.ult.v - b.ult.v, diario: true } : null;
    return { id: 'margen', m: { n: 'Margen rollo − chatarra', c: '#c9d3db', u: 't' }, d: d, E: E, ult: ult, mon: a.mon };
  }
  function ultimoI(s) { for (var i = s.d.length - 1; i >= 0; i--) if (s.d[i] != null) return i; return -1; }
  function unidad(s, corta) {
    var mon = s.mon || 'USD';
    if (s.m.u === 'fx') return 'MXN por USD';
    if (s.m.u === 'MMBtu') return mon + '/MMBtu';
    return corta ? mon + '/t' : (mon === 'MXN' ? 'pesos' : 'dólares') + ' por tonelada';
  }
  function dec(s) { return s.m.dec || 0; }
  /* Precio más reciente: el cierre diario si existe; si no, el promedio (o estimado) del último mes */
  function actual(s) {
    var L = ultimoI(s);
    if (s.ult && s.ult.i >= L) return { v: s.ult.v, i: s.ult.i, txt: s.ult.diario ? 'Cierre del ' + dia(s.ult.f) : 'Promedio de ' + fecha(s.ult.i), est: false };
    return { v: s.d[L], i: L, txt: (s.E[L] ? 'Estimado para ' : 'Promedio de ') + fecha(L), est: !!s.E[L] };
  }
  function cambio(s, k) { var L = ultimoI(s), a = s.d[L], b = s.d[L - k]; return a != null && b != null ? 100 * (a / b - 1) : null; }
  function chip(v, txt) { return v == null ? '' : '<span><b class="' + (v >= 0 ? 'up' : 'dn') + '">' + pct(v) + '</b> ' + txt + '</span>'; }

  /* Datos en línea: GitHub Actions deja data/precios.json en el repositorio; la app lo lee al abrirse.
     Sin red usa lo último que descargó y, si nunca se conectó, los datos incluidos en la app. */
  var RAW = 'https://raw.githubusercontent.com/juanpablogza1/handbook-siderurgico/main/data/precios.json', CACHE = 'sid.preciosData2';
  var est = { origen: 'incluido', error: false };
  function valido(j) {
    if (!j || j.v !== 2 || !j.series || !j.inicio || !/^\d{4}-\d{2}$/.test(j.fin || '')) return false;
    var N = (+j.fin.slice(0, 4) - j.inicio[0]) * 12 + (+j.fin.slice(5, 7) - j.inicio[1]) + 1;
    return N > 60 && PRINC.concat(['mxn']).every(function (k) {
      var s = j.series[k]; return s && s.d && s.d.length === N && s.d.filter(function (v) { return typeof v === 'number' && v > 0; }).length > 60;
    }) && OTROS.every(function (k) { var s = j.series[k]; return !s || (s.d && s.d.length === N); });
  }
  function marca(j) { return (j.actualizado || '') + '|' + j.fin; }
  try { var g0 = JSON.parse(localStorage.getItem(CACHE) || 'null'); if (valido(g0) && marca(g0) >= marca(D())) { S.preciosData = g0; est.origen = 'guardado'; } } catch (e) {}
  function bajar(url) {
    return new Promise(function (ok, no) {
      var ctl = window.AbortController ? new AbortController() : null;
      var t = setTimeout(function () { if (ctl) ctl.abort(); no(new Error('tiempo')); }, 8000);
      fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now(), { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (j) { clearTimeout(t); ok(j); }, function (e) { clearTimeout(t); no(e); });
    });
  }
  function repintar(cambio) {
    var el = document.getElementById('pzst'); if (el) el.innerHTML = estadoTxt();
    if (!cambio || !/^#\/industria(\/precios)?$/.test(S.cur || '')) return;
    if (S.scroller) S.scrolls[S.cur] = S.scroller().scrollTop;
    S.route(true);
  }
  S.preciosRefrescar = function () {
    if (S._pzCarga) return S._pzCarga;
    var antes = marca(D());
    S._pzCarga = bajar(RAW).catch(function () { return bajar('data/precios.json'); }).then(function (j) {
      if (!valido(j)) throw new Error('datos inválidos');
      if (marca(j) < antes) throw new Error('datos más viejos que los guardados');
      S.preciosData = j; est = { origen: 'en línea', error: false };
      try { localStorage.setItem(CACHE, JSON.stringify(j)); } catch (e) {}
      S._pzHora = Date.now(); repintar(marca(j) !== antes);
    }).catch(function () { est.error = true; repintar(false); }).then(function () { S._pzCarga = null; });
    return S._pzCarga;
  };
  function estadoTxt() {
    var h = serie('hrc'), ult = h.ult ? dia(h.ult.f) : fecha(ultimoI(h));
    if (est.origen === 'en línea') return '<b class="ok">Al día.</b> Descargado al abrir la app. Último cierre del rollo: ' + ult + '.';
    var q = est.origen === 'guardado' ? 'lo guardado en la última consulta' : 'los datos incluidos en la app';
    return (est.error ? '<b>Sin conexión.</b> ' : '<b>Buscando precios nuevos…</b> ') + 'Mostrando ' + q + ', con cierre del ' + ult + '.';
  }

  /* Trazo de una serie: se corta donde no hay dato y va punteado donde es estimado */
  function trazo(s, desde, hasta, x, y) {
    var real = '', es = '', puntos = [], ultR = -2, ultE = -2;
    for (var i = desde; i <= hasta; i++) {
      var v = s.d[i];
      if (v == null) continue;
      var izq = i > desde && s.d[i - 1] != null, der = i < hasta && s.d[i + 1] != null;
      if (!izq && !der) puntos.push(i);
      if (!izq) continue;
      var p0 = x(i - 1).toFixed(1) + ' ' + y(s.d[i - 1]).toFixed(1), p1 = 'L' + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
      if (s.E[i] || s.E[i - 1]) { es += (ultE === i - 1 ? '' : 'M' + p0) + p1; ultE = i; }
      else { real += (ultR === i - 1 ? '' : 'M' + p0) + p1; ultR = i; }
    }
    return { real: real, est: es, puntos: puntos };
  }
  function spark(s, k, w, h) {
    var L = ultimoI(s), desde = Math.max(0, L - k + 1), lo = 1e15, hi = -1e15;
    for (var i = desde; i <= L; i++) if (s.d[i] != null) { lo = Math.min(lo, s.d[i]); hi = Math.max(hi, s.d[i]); }
    var r = hi - lo || 1;
    var t = trazo(s, desde, L, function (i) { return (i - desde) * w / (L - desde); }, function (v) { return h - 3 - (v - lo) * (h - 6) / r; });
    var c = s.m.c || COL_O;
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      (t.real ? '<path d="' + t.real + '" fill="none" stroke="' + c + '" stroke-width="2" vector-effect="non-scaling-stroke"/>' : '') +
      (t.est ? '<path d="' + t.est + '" fill="none" stroke="' + c + '" stroke-width="2" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>' : '') + '</svg>';
  }

  /* Tarjetas de precio */
  function tarjeta(s, extra) {
    var a = actual(s);
    return '<div class="pz-pc" style="--c:' + (s.m.c || COL_O) + '"><b>' + s.m.n + '</b>' +
      '<strong>' + num(a.v, dec(s)) + ' <small>' + unidad(s, true) + '</small></strong>' +
      '<span class="pz-dt">' + a.txt + (a.est ? ' <em class="pz-es">estimado</em>' : '') + '</span>' +
      '<div class="pz-ch">' + chip(cambio(s, 1), 'en el mes') + chip(cambio(s, 12), 'en 12 meses') + '</div>' + spark(s, 24, 100, 30) + (extra || '') + '</div>';
  }
  function cotiza(s) {
    if (!s.m.cot || !s.ult || s.mon !== 'USD') return '';
    return '<p class="pz-q">' + num(s.ult.v * s.m.cot[0], 0) + ' USD por ' + s.m.cot[1] + ', como cotiza en CME</p>';
  }
  function tarjetaMargen(mon) {
    var g = margen(mon), L = ultimoI(g), a = g.ult && g.ult.i >= L ? g.ult.v : g.d[L], prev = g.d[L - 12];
    var dif = prev != null ? g.d[L] - prev : null;
    return '<div class="pz-pc pz-mg" style="--c:#c9d3db"><b>' + g.m.n + '</b>' +
      '<strong>' + num(a, 0) + ' <small>' + unidad(g, true) + '</small></strong>' +
      '<span class="pz-dt">' + (g.ult && g.ult.i >= L ? 'Con los cierres del ' + dia(g.ult.f) : 'Promedio de ' + fecha(L)) + '</span>' +
      '<div class="pz-ch">' + (dif == null ? '' : '<span><b class="' + (dif >= 0 ? 'up' : 'dn') + '">' + (dif >= 0 ? '+' : '−') + num(Math.abs(dif), 0) + '</b> ' + unidad(g, true) + ' en 12 meses</span>') + '</div>' +
      spark(g, 24, 100, 30) + '<p class="pz-q">Lo que cobra el rollo por encima de su carga de chatarra: guía del margen de una acería eléctrica.</p></div>';
  }
  function mini(s, on) {
    var a = actual(s), c = cambio(s, 12);
    return '<button type="button" class="pz-mi' + (on ? ' on' : '') + '" data-o="' + s.id + '"><b>' + s.m.n + '</b><em>' + s.m.uso + '</em>' +
      '<strong>' + num(a.v, dec(s)) + ' <small>' + unidad(s, true) + '</small></strong>' +
      '<span>' + (c == null ? fecha(a.i) : '<i class="' + (c >= 0 ? 'up' : 'dn') + '">' + pct(c) + '</i> en 12 meses') + '</span></button>';
  }

  /* Gráfica en unidades reales, un solo eje */
  var X0 = 42, X1 = 352, Y0 = 196, Y1 = 26, W = 360, H = 222;
  function paso(r) { var m = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)); return [1, 2, 2.5, 5, 10].map(function (k) { return k * m; }).filter(function (p) { return p >= r; })[0]; }
  function grafica(ss, rango, cero, eventos) {
    var N = n(), L = Math.max.apply(null, ss.map(ultimoI)), desde = rango === 't' ? 0 : Math.max(0, L + 1 - RANGOS.filter(function (r) { return r[0] === rango; })[0][2]);
    var lo = 1e15, hi = -1e15;
    ss.forEach(function (s) { for (var i = desde; i <= L; i++) if (s.d[i] != null) { lo = Math.min(lo, s.d[i]); hi = Math.max(hi, s.d[i]); } });
    if (cero) lo = 0;
    var p = paso((hi - lo) / 4); lo = Math.floor(lo / p) * p; hi = Math.ceil(hi / p) * p; if (hi === lo) hi = lo + p;
    function x(i) { return X0 + (X1 - X0) * (i - desde) / Math.max(1, L - desde); }
    function y(v) { return Y0 - (Y0 - Y1) * (v - lo) / (hi - lo); }
    var dp = p < 1 ? 1 : 0, g = '';
    for (var t = lo; t <= hi + p / 2; t += p) g += '<path d="M' + X0 + ' ' + y(t).toFixed(1) + 'H' + X1 + '" stroke="#2f3b46"/><text x="' + (X0 - 5) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end" class="ax">' + num(t, dp) + '</text>';
    var a0 = ym(desde)[0], a1 = ym(L)[0], cada = a1 - a0 > 6 ? 2 : 1;
    for (var a = a0 + 1; a <= a1; a++) if ((a - a0) % cada === 0) { var i0 = ix(a, 1); if (i0 > desde) g += '<path d="M' + x(i0).toFixed(1) + ' ' + Y0 + 'v4" stroke="#55646f"/><text x="' + x(i0).toFixed(1) + '" y="' + (Y0 + 15) + '" text-anchor="middle" class="ax">' + a + '</text>'; }
    var ev = [], prevX = null;
    (eventos || []).forEach(function (e) {
      var i = ix(e[0], e[1]); if (i < desde || i > L) return;
      ev.push(e); var xe = x(i), cy = prevX !== null && xe - prevX < 19 ? Y1 + 8 : Y1 - 12; prevX = xe; xe = xe.toFixed(1);
      g += '<path d="M' + xe + ' ' + (Y1 - 4) + 'V' + Y0 + '" stroke="#55646f" stroke-dasharray="2 3"/><circle cx="' + xe + '" cy="' + cy + '" r="8" fill="#232d37" stroke="#7d8b97"/><text x="' + xe + '" y="' + (cy + 3.5) + '" text-anchor="middle" class="ev">' + ev.length + '</text>';
    });
    var hayEst = false;
    ss.forEach(function (s) {
      var tr = trazo(s, desde, L, x, y), c = s.m.c || COL_O;
      if (tr.est) hayEst = true;
      g += '<path d="' + tr.real + '" fill="none" stroke="' + c + '" stroke-width="2" stroke-linejoin="round"/>' +
        (tr.est ? '<path d="' + tr.est + '" fill="none" stroke="' + c + '" stroke-width="2" stroke-dasharray="4 3"/>' : '') +
        tr.puntos.map(function (i) { return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(s.d[i]).toFixed(1) + '" r="3" fill="' + c + '"/>'; }).join('');
    });
    g += '<g class="pz-cur" style="display:none"><path stroke="#e9eef1" stroke-opacity=".6"/>' + ss.map(function (s) { return '<circle data-s="' + s.id + '" r="4.5" fill="' + (s.m.c || COL_O) + '" stroke="#232d37" stroke-width="2"/>'; }).join('') + '</g>';
    g += '<rect class="pz-hit" x="' + (X0 - 6) + '" y="0" width="' + (X1 - X0 + 12) + '" height="' + H + '" fill="transparent"/>';
    return { svg: '<svg class="po-svg pz-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Precio mensual de ' + ss.map(function (s) { return s.m.n; }).join(', ') + '">' + g + '</svg>',
      ev: ev, desde: desde, L: L, x: x, y: y, ss: ss, hayEst: hayEst };
  }
  /* Arrastrar el dedo sobre la gráfica: cursor y lectura del mes */
  function montar(box, G, leer) {
    var svg = box.querySelector('svg'), cur = svg.querySelector('.pz-cur'), hit = svg.querySelector('.pz-hit');
    function pon(i, activo) {
      leer(i);
      if (!activo) { cur.style.display = 'none'; return; }
      cur.style.display = ''; var xi = G.x(i).toFixed(1);
      cur.querySelector('path').setAttribute('d', 'M' + xi + ' ' + Y1 + 'V' + Y0);
      G.ss.forEach(function (s) {
        var k = cur.querySelector('circle[data-s="' + s.id + '"]'), v = s.d[i];
        k.style.display = v == null ? 'none' : ''; if (v != null) { k.setAttribute('cx', xi); k.setAttribute('cy', G.y(v).toFixed(1)); }
      });
    }
    function mover(e) {
      var f = S.localFrac ? S.localFrac(svg, e.clientX, e.clientY)[0] : (e.clientX - svg.getBoundingClientRect().left) / svg.getBoundingClientRect().width;
      var i = Math.round(G.desde + (f * W - X0) / (X1 - X0) * (G.L - G.desde));
      pon(Math.max(G.desde, Math.min(G.L, i)), true);
    }
    hit.addEventListener('pointerdown', mover);
    hit.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' || e.buttons || e.pressure) mover(e); });
    leer(-1);
  }
  function lecturaMes(G, i) {
    if (i < 0) return '<b>Último dato <small>desliza el dedo para ver otro mes</small></b>' + G.ss.map(function (s) {
      var L = ultimoI(s);
      return '<span style="--c:' + (s.m.c || COL_O) + '"><i></i>' + (s.m.k || s.m.n) + ' <strong>' + num(s.d[L], dec(s)) + '</strong> <small>' + (s.E[L] ? 'estimado ' : '') + fecha(L) + '</small></span>';
    }).join('') + '<span class="pz-un">' + unidad(G.ss[0], true) + '</span>';
    var parcial = G.ss.some(function (s) { return s.ult && s.ult.diario && s.ult.i === i; });
    return '<b>' + fecha(i) + (parcial ? ' <small>promedio hasta el último cierre</small>' : '') + '</b>' + G.ss.map(function (s) {
      var v = s.d[i];
      return '<span style="--c:' + (s.m.c || COL_O) + '"><i></i>' + (s.m.k || s.m.n) + ' <strong>' + (v == null ? 'sin dato' : num(v, dec(s))) + '</strong>' + (v != null && s.E[i] ? ' <small>estimado</small>' : '') + '</span>';
    }).join('') + '<span class="pz-un">' + unidad(G.ss[0], true) + '</span>';
  }

  /* Lectura con los números del momento */
  function lectura() {
    var A = serie('hrc'), C = serie('bus'), M = serie('mineral'), G = margen('USD'), LA = ultimoI(A), pk = 0;
    A.d.forEach(function (v, i) { if (v != null && v > (A.d[pk] || 0)) pk = i; });
    var i50 = ix(2025, 5), base = [], h = [];
    for (var i = ix(2015, 1); i <= ix(2019, 12); i++) if (G.d[i] != null) base.push(G.d[i]);
    var gBase = base.reduce(function (a, b) { return a + b; }, 0) / (base.length || 1), gHoy = G.d[ultimoI(G)];
    function desde(s) { var L = ultimoI(s); return s.d[i50] && s.d[L] ? pct(100 * (s.d[L] / s.d[i50] - 1)) : 'sin dato'; }
    h.push('<li><b>El rollo caliente</b> promedia ' + num(A.d[LA], 0) + ' USD/t en ' + fecha(LA) + ', ' + pct(cambio(A, 12)) + ' en 12 meses. Es la referencia de la lámina en Norteamérica.</li>');
    h.push('<li><b>Desde el arancel de 50 %</b>, en vigor desde junio de 2025, el rollo va ' + desde(A) + ', la chatarra ' + desde(C) + ' y el mineral ' + desde(M) + ' (contra mayo de 2025).</li>');
    h.push('<li><b>El margen rollo − chatarra</b> es de ' + num(gHoy, 0) + ' USD/t, contra ' + num(gBase, 0) + ' USD/t en promedio de 2015 a 2019. Es una guía de lo que le queda a una acería eléctrica por tonelada para pagar energía, electrodos, mano de obra y laminación.</li>');
    h.push('<li><b>El máximo del rollo</b> fue en ' + fechaL(pk) + ', con ' + num(A.d[pk], 0) + ' USD/t, por la demanda pospandemia. Hoy está ' + pct(100 * (A.d[LA] / A.d[pk] - 1)) + ' respecto a ese pico.</li>');
    h.push('<li><b>El mineral no sigue al acero de EE. UU.:</b> su precio lo marca la demanda de China, que produce la mitad del acero del mundo.</li>');
    return '<h3>Cómo leer estos precios</h3><ul class="pz-lec">' + h.join('') + '</ul>';
  }

  /* De dónde salen los datos */
  function fuentes() {
    var b = D().series.bus, e = b.est, r = e && e.r ? num(e.r, 2) : null;
    function punto(c) { return '<i class="pz-d" style="background:' + c + '"></i>'; }
    function bloque(tit, quien, filas) {
      return '<div class="pz-src"><b>' + tit + '</b><span class="pz-who">' + quien + '</span><dl>' + filas.map(function (f) { return '<dt>' + f[0] + '</dt><dd>' + f[1] + '</dd>'; }).join('') + '</dl></div>';
    }
    return '<h3>De dónde salen estos precios</h3>' +
      '<p class="pz-p">Todos los precios son públicos y gratuitos. El acero y la chatarra vienen de los futuros que cotizan en CME, la bolsa de Chicago, tomados de Yahoo Finance. Los demás vienen de <b>FRED</b>, la base de datos de la Reserva Federal de San Luis, que publica tal cual las series de organismos oficiales. Todo se convierte a toneladas métricas.</p>' +
      bloque(punto(META.hrc.c) + 'Rollo caliente EE. UU.', 'Futuro de rollo caliente del Medio Oeste de EE. UU. de CME (clave HRC), que liquida contra el índice de CRU', [
        ['Qué mide', 'El precio de lámina rolada en caliente en rollo, entregada en el Medio Oeste de EE. UU. CRU lo arma cada semana con las operaciones reales que le reportan acerías y compradores.'],
        ['Cómo se toma', 'Se usa el contrato del mes en curso. El precio del día es su cierre; el del mes, el promedio de los cierres diarios.'],
        ['Unidades', 'CME cotiza en dólares por tonelada corta (907 kg). Aquí se pasa a tonelada métrica: el precio por tonelada métrica es 10 % mayor.']]) +
      bloque(punto(META.bus.c) + 'Chatarra busheling', 'Futuros de chatarra No. 1 busheling de CME, que liquidan contra la evaluación mensual de Fastmarkets', [
        ['Qué mide', 'La chatarra de mejor calidad: recortes de lámina limpia que dejan las estampadoras, con poco cobre y poco residual. Es la carga preferida del horno eléctrico para hacer lámina.'],
        ['Cambio de contrato', 'Hasta diciembre de 2025 se usa el contrato del Medio Oeste (BUS), que CME dejó de listar. Desde 2026 se usa su sucesor, el de Chicago (BCH). Yahoo solo publica los días recientes de este último, así que la app guarda cada mes y la historia real crece sola.'],
        ['Meses estimados', (e && e.m && e.m.length ? 'De ' + fechaL(ixIso(e.m[0])) + ' a ' + fechaL(ixIso(e.m[e.m.length - 1])) + ' no hay cotización pública, y esos meses se estiman con el índice de precios al productor de chatarra de acero al carbono de la Oficina de Estadísticas Laborales de EE. UU. (serie ' + e.codigo + '): último precio real por la variación del índice.' + (r ? ' De 2015 a 2025, los cambios mensuales del índice y de la busheling tuvieron una correlación de ' + r + '.' : '') + ' En la gráfica van punteados.' : 'Si falta la cotización de algún mes, se estima con el índice de precios al productor de chatarra de acero al carbono de la Oficina de Estadísticas Laborales de EE. UU. y se marca como estimado.')],
        ['Unidades', 'Cotiza en dólares por tonelada larga (1 016 kg). Aquí se pasa a tonelada métrica.']]) +
      bloque(punto(META.mineral.c) + 'Mineral de hierro', 'Precios de materias primas del Fondo Monetario Internacional (FMI), vía FRED', [
        ['Qué mide', 'Finos de mineral con 62 % de hierro, entregados en puerto de China. Es el promedio del mes, en dólares por tonelada.'],
        ['Por qué China', 'China compra la mayor parte del mineral que se vende por mar, así que este precio es la referencia mundial.'],
        ['Cuándo sale', 'A principios del mes siguiente, por eso va uno o dos meses atrás del acero.']]) +
      bloque(punto(COL_O) + 'Metales, gas y tipo de cambio', 'FMI, Administración de Información Energética de EE. UU. (EIA) y Reserva Federal, vía FRED', [
        ['Zinc, estaño, níquel y aluminio', 'Precios del FMI basados en la Bolsa de Metales de Londres (LME), promedio del mes. Son la base de lo que pagan las líneas de galvanizado y de hojalata, la acería de inoxidable y el calmado del acero; cada compra lleva además un premio por entrega y forma.'],
        ['Gas natural', 'Precio al contado en Henry Hub, Luisiana, de la EIA. Es la referencia del gas que México importa de EE. UU. y que alimenta la reducción directa.'],
        ['Tipo de cambio', 'Promedio del mes del peso por dólar que publica la Reserva Federal (serie EXMXUS). Es muy cercano al FIX de Banxico. Los precios en pesos usan el promedio de cada mes; los meses que aún no tienen dato usan el último disponible.']]) +
      '<h4>Lo que estas cifras no dicen</h4><ul class="pz-lec">' +
      '<li><b>No son el precio en México.</b> Son la referencia pública más cercana: los contratos de lámina en México suelen ligarse al rollo de EE. UU., más o menos un diferencial.</li>' +
      '<li><b>Un futuro no es una factura.</b> El del mes en curso converge al índice de CRU o de Fastmarkets, pero el precio real de cada operación depende de volumen, calidad y flete.</li>' +
      '<li><b>No descuentan la inflación.</b> Son precios corrientes de cada mes.</li></ul>' +
      '<h4>Cómo se mantiene al día</h4><p class="pz-p">Cada día hábil, al cierre del mercado, un proceso automático en GitHub descarga los precios y, si hay datos nuevos o corregidos, los guarda en el archivo de datos de la app. Cada vez que abres la app, esta lee ese archivo. Sin conexión, usa lo último que descargó.</p>';
  }

  S.preciosView = function () {
    var sel = lee(), mon = sel.mon, otros = OTROS.filter(function (id) { return D().series[id]; });
    if (otros.indexOf(sel.o) < 0) sel.o = otros[0];
    var ss = PRINC.map(function (id) { return serie(id, mon); });
    var h = '<p class="lead">Precios de referencia del acero y de lo que se usa para hacerlo. Se actualizan solos cada día hábil.</p>' +
      '<div class="pz-top"><div class="pf-rt pz-mon" id="pzm"><button type="button" data-m="USD"' + (mon === 'USD' ? ' class="on"' : '') + '>Dólares</button><button type="button" data-m="MXN"' + (mon === 'MXN' ? ' class="on"' : '') + '>Pesos</button></div>' +
      '<p class="pz-st" id="pzst">' + estadoTxt() + '</p></div>' +
      '<h3>Acero y carga metálica</h3><div class="pz-big">' + ss.map(function (s) { return tarjeta(s, cotiza(s)); }).join('') + tarjetaMargen(mon) + '</div>' +
      '<div class="po-card pz-card"><b class="po-ct">Precio mensual</b><p class="po-cs">En ' + unidad(ss[0]) + '. Desliza el dedo sobre la gráfica para leer cada mes.</p>' +
      '<div class="pz-ctl"><div class="pz-on" id="pzs">' + ss.map(function (s) { return '<button type="button" data-s="' + s.id + '" style="--c:' + s.m.c + '"><i></i>' + s.m.k + '</button>'; }).join('') + '</div>' +
      '<div class="pf-rt pz-rg" id="pzr">' + RANGOS.map(function (r) { return '<button type="button" data-r="' + r[0] + '">' + r[1] + '</button>'; }).join('') + '</div></div>' +
      '<div class="pz-read" id="pzv" aria-live="polite"></div><div id="pzg"></div><ol class="pz-ev" id="pze"></ol><p class="pz-nt" id="pzn"></p></div>' +
      '<h3>Recubrimientos, aleantes y energía</h3><div class="pz-mini" id="pzo"></div>' +
      '<div class="po-card pz-card"><b class="po-ct" id="pzot"></b><p class="po-cs" id="pzos"></p><div class="pf-rt pz-rg" id="pzr2">' + RANGOS.map(function (r) { return '<button type="button" data-r="' + r[0] + '">' + r[1] + '</button>'; }).join('') + '</div>' +
      '<div class="pz-read" id="pzv2" aria-live="polite"></div><div id="pzg2"></div></div>' +
      lectura() + fuentes();
    return { title: 'Precios', html: h, after: function (root) {
      function pintar() {
        var vis = ss.filter(function (s) { return sel.on[s.id]; }), G = grafica(vis, sel.r, true, EVENTOS), box = root.querySelector('#pzg');
        box.innerHTML = G.svg;
        root.querySelector('#pze').innerHTML = G.ev.map(function (e, k) { return '<li><em>' + (k + 1) + '</em><span>' + e[2] + ', <small>' + MES[e[1] - 1] + ' ' + e[0] + '</small></span></li>'; }).join('');
        root.querySelector('#pzn').innerHTML = G.hayEst ? '<i></i>Línea punteada: chatarra estimada con el índice de precios al productor, en meses sin cotización pública.' : '';
        root.querySelectorAll('#pzs button').forEach(function (b) { b.classList.toggle('on', !!sel.on[b.dataset.s]); });
        root.querySelectorAll('#pzr button').forEach(function (b) { b.classList.toggle('on', b.dataset.r === sel.r); });
        montar(box, G, function (i) { root.querySelector('#pzv').innerHTML = lecturaMes(G, i); });
      }
      function pintarOtro() {
        var s = serie(sel.o, mon);
        root.querySelector('#pzo').innerHTML = otros.map(function (id) { return mini(serie(id, mon), id === sel.o); }).join('');
        root.querySelector('#pzot').textContent = s.m.n + ': precio mensual';
        root.querySelector('#pzos').textContent = 'En ' + unidad(s) + '. ' + actual(s).txt + '.';
        root.querySelectorAll('#pzr2 button').forEach(function (b) { b.classList.toggle('on', b.dataset.r === sel.r); });
        var G = grafica([s], sel.r, s.id !== 'mxn', null), box = root.querySelector('#pzg2');
        box.innerHTML = G.svg;
        montar(box, G, function (i) { root.querySelector('#pzv2').innerHTML = lecturaMes(G, i); });
      }
      root.querySelector('#pzs').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        var on = PRINC.filter(function (k) { return sel.on[k]; });
        if (sel.on[b.dataset.s] && on.length === 1) return;
        sel.on[b.dataset.s] = sel.on[b.dataset.s] ? 0 : 1; guarda(sel); pintar();
      });
      function rango(e) { var b = e.target.closest('button'); if (!b) return; sel.r = b.dataset.r; guarda(sel); pintar(); pintarOtro(); }
      root.querySelector('#pzr').addEventListener('click', rango);
      root.querySelector('#pzr2').addEventListener('click', rango);
      root.querySelector('#pzo').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; sel.o = b.dataset.o; guarda(sel); pintarOtro(); });
      root.querySelector('#pzm').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.dataset.m === sel.mon) return;
        sel.mon = b.dataset.m; guarda(sel);
        if (S.scroller) S.scrolls[S.cur] = S.scroller().scrollTop;
        S.route(true);
      });
      pintar(); pintarOtro();
      if (!S._pzHora || Date.now() - S._pzHora > 600000) S.preciosRefrescar();
    } };
  };

  /* Acceso desde la portada de Industria */
  S.preciosTile = function () {
    if (!S.preciosData) return '';
    var A = serie('hrc'), C = serie('bus'), M = serie('mineral'), a = actual(A), c = cambio(A, 12);
    return '<a class="iv-tile pz-tile" href="#/industria/precios"><b>Precios del acero</b><div class="pz-tl"><div><strong>' + num(a.v, 0) + ' <small>USD/t</small></strong><span>rollo caliente EE. UU., ' + (c == null ? '' : pct(c) + ' en 12 meses') + '</span></div>' + spark(A, 60, 160, 54) + '</div>' +
      '<span>Chatarra ' + num(actual(C).v, 0) + ' USD/t, mineral ' + num(actual(M).v, 0) + ' USD/t. ' + a.txt + '.<i class="chev"></i></span></a>';
  };
  setTimeout(function () { if (window.fetch && window.Promise) S.preciosRefrescar(); }, 1500);
})();

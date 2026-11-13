/* Tendencia de precios: acero laminado, chatarra y mineral de hierro. Vista en Industria > Precios. */
(function () {
  var MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var KEY = 'sid.precios', RANGOS = [['2', '2 años', 24], ['5', '5 años', 60], ['t', 'Desde 2015', 0]];
  function P() { return S.precios; }
  function ix(y, m) { return (y - P().inicio[0]) * 12 + (m - P().inicio[1]); }
  function fecha(i) { var t = P().inicio[1] - 1 + i; return MES[t % 12] + ' ' + (P().inicio[0] + Math.floor(t / 12)); }
  function base() { return ix(2020, 1); }
  function rel(s, i) { return 100 * s.d[i] / s.d[base()]; }
  function num(v, d) { var s = v.toFixed(d), p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return p.join('.'); }
  function pct(v) { return (v >= 0 ? '+' : '−') + num(Math.abs(v), 1) + ' %'; }
  function cambio(s, n) { var L = s.d.length - 1; return 100 * (s.d[L] / s.d[L - n] - 1); }
  function valor(s, i, chico) { return s.u === 'USD/t' ? num(s.d[i], 0) + (chico ? ' <small>USD/t</small>' : ' USD/t') : num(s.d[i], 1); }
  function lee() { try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.r && v.on) return v; } catch (e) {} return { r: '5', on: { acero: 1, chatarra: 1, mineral: 1 } }; }
  function guarda(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }

  function spark(s, n, w, h) {
    var d = s.d.slice(-n), lo = Math.min.apply(null, d), hi = Math.max.apply(null, d), k = hi - lo || 1;
    var pts = d.map(function (v, i) { return (i * w / (d.length - 1)).toFixed(1) + ' ' + (h - 2 - (v - lo) * (h - 4) / k).toFixed(1); }).join('L');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true"><path d="M' + pts + '" fill="none" stroke="' + s.col + '" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
  }
  function kpis() {
    var L = P().series[0].d.length - 1;
    return '<div class="pz-kpi">' + P().series.map(function (s) {
      var c = cambio(s, 12);
      return '<div style="--c:' + s.col + '"><b>' + s.k + '</b><strong>' + valor(s, L, true) + '</strong><em class="' + (c >= 0 ? 'up' : 'dn') + '">' + pct(c) + ' <small>en 12 meses</small></em>' + spark(s, 24, 100, 28) + '</div>';
    }).join('') + '</div><p class="pz-cut">Último dato: ' + fecha(L) + '. Acero y chatarra son índices (1982 = 100); el mineral, dólares por tonelada.</p>';
  }

  /* Gráfica principal: las tres series en índice, enero de 2020 = 100 */
  var X0 = 34, X1 = 352, Y0 = 196, Y1 = 26, W = 360, H = 222;
  function grafica(sel) {
    var n = P().series[0].d.length, desde = sel.r === 't' ? 0 : n - RANGOS.filter(function (r) { return r[0] === sel.r; })[0][2];
    var ss = P().series.filter(function (s) { return sel.on[s.id]; }), lo = 1e9, hi = -1e9;
    ss.forEach(function (s) { for (var i = desde; i < n; i++) { var v = rel(s, i); if (v < lo) lo = v; if (v > hi) hi = v; } });
    var paso = hi - lo > 250 ? 100 : 50; lo = Math.floor(lo / paso) * paso; hi = Math.ceil(hi / paso) * paso;
    function x(i) { return X0 + (X1 - X0) * (i - desde) / (n - 1 - desde); }
    function y(v) { return Y0 - (Y0 - Y1) * (v - lo) / (hi - lo); }
    var g = '';
    for (var t = lo; t <= hi; t += paso) g += '<path d="M' + X0 + ' ' + y(t).toFixed(1) + 'H' + X1 + '" stroke="' + (t === 100 ? '#7d8b97' : '#26313b') + '"' + (t === 100 ? ' stroke-dasharray="4 3"' : '') + '/><text x="' + (X0 - 4) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end" class="ax">' + t + '</text>';
    var y0 = Math.floor((desde + P().inicio[1] - 1) / 12) + P().inicio[0], y1 = Math.floor((n - 1 + P().inicio[1] - 1) / 12) + P().inicio[0], cada = y1 - y0 > 6 ? 2 : 1;
    for (var a = y0 + 1; a <= y1; a++) if ((a - y0) % cada === 0 || sel.r !== 't') { var i0 = ix(a, 1); if (i0 > desde) g += '<path d="M' + x(i0).toFixed(1) + ' ' + Y0 + 'v4" stroke="#55646f"/><text x="' + x(i0).toFixed(1) + '" y="' + (Y0 + 15) + '" text-anchor="middle" class="ax">' + a + '</text>'; }
    var ev = [], ultimo = null;
    P().eventos.forEach(function (e) {
      var i = ix(e[0], e[1]); if (i < desde || i >= n) return;
      ev.push(e); var xe = x(i), cy = ultimo !== null && xe - ultimo < 19 ? Y1 + 8 : Y1 - 12; ultimo = xe; xe = xe.toFixed(1);
      g += '<path d="M' + xe + ' ' + (Y1 - 4) + 'V' + Y0 + '" stroke="#55646f" stroke-dasharray="2 3"/><circle cx="' + xe + '" cy="' + cy + '" r="8" fill="#232d37" stroke="#7d8b97"/><text x="' + xe + '" y="' + (cy + 3.5) + '" text-anchor="middle" class="ev">' + ev.length + '</text>';
    });
    ss.forEach(function (s) {
      var d = '';
      for (var i = desde; i < n; i++) d += (i === desde ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(rel(s, i)).toFixed(1);
      g += '<path d="' + d + '" fill="none" stroke="' + s.col + '" stroke-width="2.2" stroke-linejoin="round"/>';
    });
    g += '<g id="pzc" style="display:none"><path id="pzl" stroke="#e9eef1" stroke-opacity=".6"/>' + ss.map(function (s) { return '<circle data-s="' + s.id + '" r="4" fill="' + s.col + '" stroke="#141b22" stroke-width="2"/>'; }).join('') + '</g>';
    g += '<rect id="pzt" x="' + X0 + '" y="0" width="' + (X1 - X0) + '" height="' + H + '" fill="transparent"/>';
    return { svg: '<svg class="po-svg pz-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Tendencia de precios del acero, la chatarra y el mineral de hierro">' + g + '</svg>',
      ev: ev, desde: desde, n: n, x: x, y: y, ss: ss };
  }
  function lectura() {
    var A = P().series[0], C = P().series[1], M = P().series[2], L = A.d.length - 1, pk = 0;
    A.d.forEach(function (v, i) { if (v > A.d[pk]) pk = i; });
    var i232 = ix(2025, 6);
    var dA = 100 * (A.d[L] / A.d[i232 - 1] - 1), dC = 100 * (C.d[L] / C.d[i232 - 1] - 1), dM = 100 * (M.d[L] / M.d[i232 - 1] - 1);
    return '<h3>Cómo leerla</h3><ul class="pz-lec">' +
      '<li><b>En 12 meses</b> el acero laminado va ' + pct(cambio(A, 12)) + ', la chatarra ' + pct(cambio(C, 12)) + ' y el mineral ' + pct(cambio(M, 12)) + '.</li>' +
      '<li><b>Desde el arancel de 50 %</b> (junio de 2025) el acero en EE. UU. subió ' + pct(dA) + '; su materia prima mucho menos: chatarra ' + pct(dC) + ', mineral ' + pct(dM) + '. La brecha entre el precio y la carga metálica se abrió.</li>' +
      '<li><b>El máximo</b> fue en ' + fecha(pk) + ', con la demanda pospandemia. Hoy el acero está ' + pct(100 * (A.d[L] / A.d[pk] - 1)) + ' respecto a ese pico.</li>' +
      '<li><b>El mineral no sigue al acero de EE. UU.:</b> su precio lo marca la demanda de China, que produce la mitad del acero del mundo.</li></ul>';
  }
  /* De dónde salen los datos: explicación de cada fuente en lenguaje sencillo */
  function fuentes() {
    var c = {}; P().series.forEach(function (s) { c[s.id] = s.col; });
    function punto(id) { return '<i class="pz-d" style="background:' + c[id] + '"></i>'; }
    function bloque(tit, quien, filas) {
      return '<div class="pz-src"><b>' + tit + '</b><span class="pz-who">' + quien + '</span><dl>' + filas.map(function (f) { return '<dt>' + f[0] + '</dt><dd>' + f[1] + '</dd>'; }).join('') + '</dl></div>';
    }
    return '<h3>De dónde salen estos precios</h3>' +
      '<p class="pz-p">Las tres series vienen de <b>FRED</b>, la base de datos pública y gratuita de la Reserva Federal de San Luis. FRED no genera datos: reúne las series oficiales de decenas de fuentes, como la Oficina de Estadísticas Laborales de EE. UU. y el Fondo Monetario Internacional, y las publica tal cual. Aquí se usó para tomar las tres series con un mismo formato.</p>' +
      bloque(punto('acero') + punto('chatarra') + 'Acero laminado y chatarra', 'Índice de precios al productor (PPI) de la Oficina de Estadísticas Laborales de EE. UU. (BLS)', [
        ['Qué mide', 'Cuánto cambia, mes a mes, el precio al que las empresas de EE. UU. venden su producto. Es el precio desde el punto de vista del vendedor, y el BLS pide el precio real de la operación, no el de lista.'],
        ['Qué incluye', '<b>Acero laminado</b> (serie WPU1017): lámina en caliente y en frío, placa, barras, perfiles, alambre y tubo que salen de las acerías de EE. UU. <b>Chatarra</b> (WPU1012): la chatarra de hierro y acero que se vende como carga para las acerías.'],
        ['Cómo leer el número', 'Es un índice, no dólares por tonelada. 1982 = 100, así que 388.6 quiere decir que el precio es 3.9 veces el de 1982. Sirve para ver cuánto subió o bajó, no para cotizar.'],
        ['Aranceles', 'Solo cuenta lo que venden productores de EE. UU.; el acero importado no entra. Si un arancel a la importación permite a las acerías locales subir sus precios, esa alza sí aparece en el índice.'],
        ['Cuándo sale', 'En la segunda semana del mes siguiente. Las cifras de los últimos cuatro meses son preliminares y pueden corregirse.']]) +
      bloque(punto('mineral') + 'Mineral de hierro', 'Precios de materias primas del Fondo Monetario Internacional (FMI)', [
        ['Qué mide', 'El precio al contado de finos de mineral con 62 % de hierro, entregado en puerto de China (CFR Tianjin). Es el promedio del mes, en dólares por tonelada.'],
        ['Por qué China', 'China compra la mayor parte del mineral que se vende por mar, así que este precio es la referencia mundial. Lo mueven sobre todo su construcción y su producción de acero.'],
        ['Cuándo sale', 'A principios del mes siguiente.']]) +
      '<h4>Lo que estas cifras no dicen</h4><ul class="pz-lec">' +
      '<li><b>No son el precio en México.</b> Son la referencia pública más cercana: México importa cerca de un tercio del acero que consume y compite con el acero de EE. UU.</li>' +
      '<li><b>No son dólares por tonelada de acero.</b> Esos precios, como el rollo caliente que se usa en contratos y cotizaciones, los publican CRU, Platts y Fastmarkets por suscripción.</li>' +
      '<li><b>No descuentan la inflación.</b> Son precios corrientes de cada mes.</li>' +
      '<li><b>El mineral es el precio en China,</b> no lo que paga una acería mexicana por su pélet, que lleva premio por calidad y flete distinto.</li></ul>' +
      '<p class="nota">Último mes con datos: ' + P().corte + '. Consultados en FRED en noviembre de 2026. La app no se actualiza sola: las cifras se cargan a mano.</p>';
  }

  S.preciosView = function () {
    var sel = lee();
    var h = '<p class="lead">Cuánto cuesta el acero y lo que se necesita para hacerlo, mes a mes desde 2015.</p>' + kpis() +
      '<div class="po-card pz-card"><b class="po-ct">Tendencia de precios</b><p class="po-cs">Todas las series parten de 100 en enero de 2020, para comparar cuánto subió o bajó cada una. Desliza el dedo sobre la gráfica para leer cada mes.</p>' +
      '<div class="pz-ctl"><div class="pz-on" id="pzs">' + P().series.map(function (s) { return '<button type="button" data-s="' + s.id + '" style="--c:' + s.col + '"><i></i>' + s.n + '</button>'; }).join('') + '</div>' +
      '<div class="pf-rt pz-rg" id="pzr">' + RANGOS.map(function (r) { return '<button type="button" data-r="' + r[0] + '">' + r[1] + '</button>'; }).join('') + '</div></div>' +
      '<div class="pz-read" id="pzv" aria-live="polite"></div><div id="pzg"></div><ol class="pz-ev" id="pze"></ol></div>' + lectura() + fuentes();
    return { title: 'Precios', html: h, after: function (root) {
      var G;
      function leer(i) {
        root.querySelector('#pzv').innerHTML = '<b>' + fecha(i) + '</b>' + G.ss.map(function (s) {
          return '<span style="--c:' + s.col + '"><i></i>' + s.n + ' <strong>' + valor(s, i) + '</strong> <small>' + pct(rel(s, i) - 100).replace('.0 %', ' %') + ' vs. ene 2020</small></span>';
        }).join('');
        var c = root.querySelector('#pzc');
        if (i === G.n - 1 && !c.dataset.act) { c.style.display = 'none'; return; }
        c.style.display = '';
        var xi = G.x(i).toFixed(1);
        root.querySelector('#pzl').setAttribute('d', 'M' + xi + ' ' + Y1 + 'V' + Y0);
        G.ss.forEach(function (s) { var k = c.querySelector('circle[data-s="' + s.id + '"]'); k.setAttribute('cx', xi); k.setAttribute('cy', G.y(rel(s, i)).toFixed(1)); });
      }
      function pintar() {
        G = grafica(sel);
        root.querySelector('#pzg').innerHTML = G.svg;
        root.querySelector('#pze').innerHTML = G.ev.map(function (e, k) { return '<li><em>' + (k + 1) + '</em><span>' + e[2] + ', <small>' + MES[e[1] - 1] + ' ' + e[0] + '</small></span></li>'; }).join('');
        root.querySelectorAll('#pzs button').forEach(function (b) { b.classList.toggle('on', !!sel.on[b.dataset.s]); });
        root.querySelectorAll('#pzr button').forEach(function (b) { b.classList.toggle('on', b.dataset.r === sel.r); });
        leer(G.n - 1);
        var t = root.querySelector('#pzt'), svg = t.ownerSVGElement;
        function mover(e) {
          var f = S.localFrac ? S.localFrac(svg, e.clientX, e.clientY)[0] : (e.clientX - svg.getBoundingClientRect().left) / svg.getBoundingClientRect().width;
          var xs = f * W, i = Math.round(G.desde + (xs - X0) / (X1 - X0) * (G.n - 1 - G.desde));
          i = Math.max(G.desde, Math.min(G.n - 1, i));
          root.querySelector('#pzc').dataset.act = '1'; leer(i);
        }
        t.addEventListener('pointerdown', mover);
        t.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' || e.buttons || e.pressure) mover(e); });
      }
      root.querySelector('#pzs').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        var on = Object.keys(sel.on).filter(function (k) { return sel.on[k]; });
        if (sel.on[b.dataset.s] && on.length === 1) return;
        sel.on[b.dataset.s] = sel.on[b.dataset.s] ? 0 : 1; guarda(sel); pintar();
      });
      root.querySelector('#pzr').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; sel.r = b.dataset.r; guarda(sel); pintar(); });
      pintar();
    } };
  };

  /* Acceso desde la portada de Industria */
  S.preciosTile = function () {
    if (!S.precios) return '';
    var A = P().series[0], L = A.d.length - 1, c = cambio(A, 12);
    return '<a class="iv-tile pz-tile" href="#/industria/precios"><b>Precios del acero</b><div class="pz-tl"><div><strong>' + pct(c) + '</strong><span>acero laminado en EE. UU., últimos 12 meses</span></div>' + spark(A, 60, 160, 54) + '</div>' +
      '<span>Acero, chatarra y mineral desde 2015. Último dato: ' + fecha(L) + '.<i class="chev"></i></span></a>';
  };
})();

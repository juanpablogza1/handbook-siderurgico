/* Biblioteca de piezas SVG animadas (SMIL) para los esquemas de proceso.
   Todo se dibuja en un lienzo de 360 × 220 unidades. */
(function () {
  var A = S.A = {};

  A.svg = function (inner, h) {
    h = h || 220;
    return '<svg class="anim" viewBox="0 0 360 ' + h + '" role="img" aria-label="Animación del proceso" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="gHot" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff3d6"/><stop offset=".55" stop-color="#ffc53d"/><stop offset="1" stop-color="#f26a1b"/></linearGradient>' +
      '<linearGradient id="gHotH" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff3d6"/><stop offset=".5" stop-color="#ffc53d"/><stop offset="1" stop-color="#d9482b"/></linearGradient>' +
      '<linearGradient id="gCoolH" gradientUnits="userSpaceOnUse" x1="0" x2="360" y1="0" y2="0"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".45" stop-color="#f26a1b"/><stop offset=".8" stop-color="#b3261e"/><stop offset="1" stop-color="#8d9ba6"/></linearGradient>' +
      '<linearGradient id="gSteel" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e3eaee"/><stop offset="1" stop-color="#8d9ba6"/></linearGradient>' +
      '<radialGradient id="gGlow"><stop offset="0" stop-color="#ffc53d" stop-opacity=".75"/><stop offset="1" stop-color="#f26a1b" stop-opacity="0"/></radialGradient>' +
      '</defs>' + inner + '</svg>';
  };

  /* texto: o.a = start|middle|end, o.c = clase extra (d tenue, h caliente, b azul, g verde) */
  A.t = function (x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" class="at ' + (o.c || '') + '" text-anchor="' + (o.a || 'middle') + '">' + s + '</text>';
  };
  /* marcador numerado, ligado a la leyenda */
  A.n = function (n, x, y) {
    return '<g class="an"><circle cx="' + x + '" cy="' + y + '" r="7.5"/><text x="' + x + '" y="' + (y + 3.2) + '">' + n + '</text></g>';
  };
  /* rodillo que gira. cw = 1 horario, -1 antihorario */
  A.roll = function (cx, cy, r, dur, cw) {
    cw = cw || 1; dur = dur || 2;
    return '<g><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="roll"/>' +
      '<line x1="' + cx + '" y1="' + (cy - r + 1.5) + '" x2="' + cx + '" y2="' + (cy + r - 1.5) + '" class="spoke">' +
      '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="' + (cw * 360) + ' ' + cx + ' ' + cy + '" dur="' + dur + 's" repeatCount="indefinite"/></line></g>';
  };
  /* par de rodillos de trabajo con apoyo opcional (caja 2-high o 4-high) centrada en la línea y */
  A.stand = function (x, y, rw, rb, dur) {
    var s = A.roll(x, y - rw - 1.3, rw, dur, 1) + A.roll(x, y + rw + 1.3, rw, dur, -1);
    if (rb) s += A.roll(x, y - 2 * rw - rb - 1.6, rb, dur * rb / rw, -1) + A.roll(x, y + 2 * rw + rb + 1.6, rb, dur * rb / rw, 1);
    return s;
  };
  /* partículas que recorren una trayectoria */
  A.dots = function (d, n, dur, fill, r, extra) {
    var s = '';
    for (var i = 0; i < n; i++) {
      s += '<circle r="' + (r || 2.2) + '" fill="' + (fill || '#ffc53d') + '" ' + (extra || '') + '><animateMotion path="' + d + '" dur="' + dur + 's" begin="' + (-(dur * i / n)).toFixed(2) + 's" repeatCount="indefinite"/></circle>';
    }
    return s;
  };
  /* línea punteada que fluye (gases, agua, movimiento de banda). rev invierte el sentido */
  A.flow = function (d, cls, dur, rev) {
    return '<path d="' + d + '" class="flow ' + (cls || 'gas') + '"><animate attributeName="stroke-dashoffset" from="' + (rev ? -22 : 0) + '" to="' + (rev ? 0 : -22) + '" dur="' + (dur || 0.9) + 's" repeatCount="indefinite"/></path>';
  };
  /* banda en movimiento: trazo sólido + marcas que avanzan */
  A.strip = function (d, cls, dur) {
    return '<path d="' + d + '" class="' + (cls || 'st') + '"/>' +
      '<path d="' + d + '" fill="none" stroke="#1b232b" stroke-opacity=".55" stroke-width="2.6" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur="' + (dur || 0.7) + 's" repeatCount="indefinite"/></path>';
  };
  /* bobina (rollo) que gira */
  A.coil = function (cx, cy, r, dur, cw, stroke) {
    stroke = stroke || '#c9d3da';
    var s = '<g><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#2c3945" stroke="' + stroke + '" stroke-width="2"/>';
    for (var k = r - 4; k > 6; k -= 4) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + k + '" fill="none" stroke="' + stroke + '" stroke-opacity=".45" stroke-width="1"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#141b22" stroke="' + stroke + '" stroke-width="1.2"/>' +
      '<line x1="' + (cx - r) + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="' + stroke + '" stroke-opacity=".5" stroke-width="1">' +
      '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="' + ((cw || 1) * 360) + ' ' + cx + ' ' + cy + '" dur="' + (dur || 4) + 's" repeatCount="indefinite"/></line></g>';
    return s;
  };
  /* parpadeo (arcos, llamas, chispas) */
  A.blink = function (inner, dur, vals) {
    return '<g>' + inner + '<animate attributeName="opacity" values="' + (vals || '1;.25;1;.6;1') + '" dur="' + (dur || 0.5) + 's" repeatCount="indefinite"/></g>';
  };
  /* llama simple */
  A.flame = function (x, y, s) {
    s = s || 1;
    return '<path d="M' + x + ' ' + y + 'c' + (-5 * s) + ' ' + (-6 * s) + ' ' + (-1 * s) + ' ' + (-10 * s) + ' 0 ' + (-15 * s) + 'c' + (2 * s) + ' ' + (5 * s) + ' ' + (5 * s) + ' ' + (9 * s) + ' 0 ' + (15 * s) + 'z" fill="#f58a2e">' +
      '<animate attributeName="opacity" values="1;.5;.9;.4;1" dur=".7s" repeatCount="indefinite"/></path>';
  };
  /* visibilidad por fases dentro de un ciclo: on = [[inicio, fin], ...] en fracción 0–1 */
  A.phase = function (inner, dur, on) {
    var kt = [], v = [];
    function add(t, val) {
      t = Math.min(1, Math.max(0, t));
      if (kt.length && t <= kt[kt.length - 1]) t = Math.min(1, kt[kt.length - 1] + 0.0005);
      kt.push(+t.toFixed(4)); v.push(val);
    }
    if (on[0][0] > 0) add(0, 0);
    on.forEach(function (p) {
      if (p[0] > 0) add(p[0] - 0.001, 0);
      add(p[0], 1); add(p[1], 1);
      if (p[1] < 1) add(p[1] + 0.001, 0);
    });
    if (kt[kt.length - 1] < 1) add(1, 0);
    return '<g opacity="0">' + inner + '<animate attributeName="opacity" values="' + v.join(';') + '" keyTimes="' + kt.join(';') + '" dur="' + dur + 's" repeatCount="indefinite"/></g>';
  };
  A.glow = function (cx, cy, r) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#gGlow)"><animate attributeName="opacity" values=".9;.5;.9" dur="1.6s" repeatCount="indefinite"/></circle>';
  };
  A.arrow = function (x1, y1, x2, y2, col) {
    col = col || '#8fa2b1';
    var a = Math.atan2(y2 - y1, x2 - x1), L = 5;
    var p1 = (x2 - L * Math.cos(a - 0.5)).toFixed(1) + ' ' + (y2 - L * Math.sin(a - 0.5)).toFixed(1);
    var p2 = (x2 - L * Math.cos(a + 0.5)).toFixed(1) + ' ' + (y2 - L * Math.sin(a + 0.5)).toFixed(1);
    return '<path d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + 'M' + p1 + 'L' + x2 + ' ' + y2 + 'L' + p2 + '" fill="none" stroke="' + col + '" stroke-width="1.3" stroke-linecap="round"/>';
  };

  /* Monta la animación de un proceso en un contenedor y conecta Pausar / Reanudar */
  S.mountAnim = function (root) {
    var st = root.querySelector('.stage'); if (!st) return;
    var svg = st.querySelector('svg'), btn = st.querySelector('.ctl');
    if (!svg || !btn) return;
    var paused = false;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try { svg.pauseAnimations(); paused = true; btn.textContent = 'Reproducir'; } catch (e) {}
    }
    btn.addEventListener('click', function () {
      try {
        if (paused) svg.unpauseAnimations(); else svg.pauseAnimations();
        paused = !paused;
        btn.textContent = paused ? 'Reproducir' : 'Pausar';
      } catch (e) {}
    });
  };
})();

/* Diagrama hierro-carbono interactivo (Fe–Fe₃C simplificado, líneas rectas entre puntos invariantes) */
(function () {
  var X0 = 34, X1 = 350, Y0 = 232, Y1 = 14, CMAX = 5, TMIN = 400, TMAX = 1600;
  function px(c) { return X0 + (X1 - X0) * c / CMAX; }
  function py(t) { return Y0 - (Y0 - Y1) * (t - TMIN) / (TMAX - TMIN); }
  function P(c, t) { return px(c).toFixed(1) + ' ' + py(t).toFixed(1); }

  function liq(c) { return c <= 0.53 ? 1538 - 43 * c / 0.53 : c <= 4.3 ? 1495 - 348 * (c - 0.53) / 3.77 : 1147 + 44.3 * (c - 4.3); }
  function sol(c) { return c <= 0.09 ? 1538 - 43 * c / 0.09 : c <= 0.17 ? 1495 : c <= 2.14 ? 1495 - 348 * (c - 0.17) / 1.97 : 1147; }
  function a3(c) { return 912 - 185 * c / 0.76; }
  function acm(c) { return 727 + 420 * (c - 0.76) / 1.38; }

  S.fase = function (c, t) {
    if (t >= liq(c)) return ['Líquido', 'Todo el metal está fundido. En la acería se trabaja 15–30 °C arriba de esta línea para colar.'];
    if (t > sol(c)) {
      if (c < 0.53 && t > 1495) return ['Líquido + ferrita δ', 'Empieza la solidificación como ferrita delta. A 1 495 °C ocurre la reacción peritéctica.'];
      if (c <= 4.3) return ['Líquido + austenita', 'Crecen dendritas de austenita dentro del líquido. Es el rango de solidificación en la colada continua.'];
      return ['Líquido + cementita', 'Hierros hipereutécticos: la cementita primaria solidifica primero.'];
    }
    if (t > 727) {
      if (c <= 0.76) {
        if (t > 1394 && c < 0.09 * (t - 1394) / 101) return ['Ferrita δ', 'Hierro cúbico centrado en el cuerpo de alta temperatura.'];
        if (t >= a3(c)) return ['Austenita', 'Una sola fase que disuelve todo el carbono. Es la zona de laminación en caliente y de austenizado para temple.'];
        if (c <= 0.022 * (912 - t) / 185) return ['Ferrita', 'Hierro casi puro, blando y magnético.'];
        return ['Ferrita + austenita', 'Zona intercrítica. Recocer aquí y enfriar rápido produce aceros doble fase.'];
      }
      if (c <= 2.14) {
        if (t >= acm(c)) return ['Austenita', 'Una sola fase que disuelve todo el carbono.'];
        return ['Austenita + cementita', 'La cementita precipita en los límites de grano de la austenita. Aceros hipereutectoides.'];
      }
      return ['Austenita + cementita (ledeburita)', 'Hierro fundido blanco entre el eutéctico y el eutectoide.'];
    }
    if (c <= 0.02) return ['Ferrita', 'Hierro casi puro: muy blando y dúctil. Aceros IF y de ultra bajo carbono.'];
    if (c < 0.74) {
      var p = Math.round(100 * (c - 0.022) / (0.76 - 0.022));
      return ['Ferrita + perlita', 'Acero hipoeutectoide. Por regla de la palanca: ≈ ' + p + ' % de perlita y ' + (100 - p) + ' % de ferrita. Más perlita, más resistencia.'];
    }
    if (c <= 0.78) return ['Perlita', 'Composición eutectoide: 100 % perlita. Rieles y alambre de alta resistencia.'];
    if (c <= 2.14) {
      var q = Math.round(100 * (6.67 - c) / (6.67 - 0.76));
      return ['Perlita + cementita', 'Acero hipereutectoide: ≈ ' + q + ' % de perlita con red de cementita. Herramientas y rodamientos.'];
    }
    return ['Perlita + cementita (ledeburita transformada)', 'Hierro fundido blanco. Con silicio alto el carbono saldría como grafito: hierro gris o nodular.'];
  };

  S.fecView = function () {
    var g = '';
    // regiones tenues
    g += '<path d="M' + P(0, 912) + 'L' + P(0, 1394) + 'L' + P(0.17, 1495) + 'L' + P(2.14, 1147) + 'L' + P(0.76, 727) + 'Z" fill="#f26a1b" opacity=".16"/>';
    g += '<path d="M' + P(0, 1538) + 'L' + P(0.53, 1495) + 'L' + P(4.3, 1147) + 'L' + P(5, 1178) + 'L' + P(5, 1600) + 'L' + P(0, 1600) + 'Z" fill="#ffc53d" opacity=".14"/>';
    g += '<rect x="' + px(0) + '" y="' + py(727) + '" width="' + (px(2.14) - px(0)) + '" height="' + (py(400) - py(727)) + '" fill="#6aa3d8" opacity=".10"/>';
    // rejilla y ejes
    [400, 600, 800, 1000, 1200, 1400, 1600].forEach(function (t) { g += '<path d="M' + X0 + ' ' + py(t).toFixed(1) + 'H' + X1 + '" stroke="#2c3945" stroke-width="1"/><text class="ax" x="' + (X0 - 4) + '" y="' + (py(t) + 3).toFixed(1) + '" text-anchor="end">' + t + '</text>'; });
    [0, 1, 2, 3, 4, 5].forEach(function (c) { g += '<path d="M' + px(c).toFixed(1) + ' ' + Y0 + 'V' + Y1 + '" stroke="#2c3945" stroke-width="1"/><text class="ax" x="' + px(c).toFixed(1) + '" y="' + (Y0 + 11) + '" text-anchor="middle">' + c + '</text>'; });
    g += '<text class="ax" x="' + X1 + '" y="' + (Y0 + 22) + '" text-anchor="end">% de carbono en peso</text><text class="ax" x="4" y="10">°C</text>';
    // líneas del diagrama
    var L = 'stroke="#c9d3da" stroke-width="1.6" fill="none" stroke-linejoin="round"';
    g += '<path ' + L + ' d="M' + P(0, 1538) + 'L' + P(0.53, 1495) + 'L' + P(4.3, 1147) + 'L' + P(5, 1178) + '"/>';
    g += '<path ' + L + ' d="M' + P(0, 1538) + 'L' + P(0.09, 1495) + 'L' + P(0.53, 1495) + 'M' + P(0.09, 1495) + 'L' + P(0, 1394) + 'L' + P(0.17, 1495) + 'L' + P(2.14, 1147) + 'L' + P(5, 1147) + '"/>';
    g += '<path ' + L + ' d="M' + P(0, 912) + 'L' + P(0.76, 727) + 'L' + P(2.14, 1147) + 'M' + P(0, 912) + 'L' + P(0.022, 727) + 'L' + P(0.008, 400) + 'M' + P(0.022, 727) + 'L' + P(5, 727) + '"/>';
    g += '<path d="M' + P(2.14, 1147) + 'V' + Y0 + 'M' + P(0.76, 727) + 'V' + Y0 + 'M' + P(4.3, 1147) + 'V' + Y0 + '" stroke="#7d8b97" stroke-width="1" stroke-dasharray="3 3"/>';
    // rótulos
    function T(c, t, s, col) { return '<text x="' + px(c).toFixed(1) + '" y="' + py(t).toFixed(1) + '" text-anchor="middle"' + (col ? ' fill="' + col + '"' : '') + '>' + s + '</text>'; }
    g += T(3.2, 1440, 'Líquido', '#ffc53d') + T(0.95, 1080, 'Austenita γ', '#f58a2e') + T(1.9, 1290, 'L + γ') + T(3.3, 930, 'γ + Fe₃C') + T(1.25, 560, 'Perlita + Fe₃C') + T(3.5, 560, 'Hierros fundidos') + T(0.4, 520, 'α + P');
    g += T(0.94, 425, '0.76', '#8fd3ff') + T(2.32, 425, '2.14', '#8fd3ff') + T(4.45, 425, '4.3', '#8fd3ff');
    g += '<text x="' + (px(5) - 2) + '" y="' + (py(727) - 4) + '" text-anchor="end" class="ax">A₁ 727 °C</text><text x="' + (px(5) - 2) + '" y="' + (py(1147) + 11) + '" text-anchor="end" class="ax">1 147 °C</text>';
    g += '<text x="' + (px(1.07)) + '" y="' + (Y1 + 9) + '" text-anchor="middle" class="ax">Aceros</text><text x="' + (px(3.6)) + '" y="' + (Y1 + 9) + '" text-anchor="middle" class="ax">Hierros fundidos</text>';
    g += '<g id="fecmark"><path id="fecx" fill="none" stroke="#ffc53d" stroke-width="1" stroke-dasharray="2 3" d=""/><circle id="fecdot" r="6" fill="#ffc53d" stroke="#1b232b" stroke-width="2"/></g>';

    var h = '<p class="lead">Toca o arrastra sobre el diagrama para ver qué fases existen a cada composición y temperatura.</p>' +
      '<div class="fec"><svg viewBox="0 0 360 258" id="fecsvg" role="img" aria-label="Diagrama hierro-carbono">' + g + '</svg></div>' +
      '<div class="fecout" id="fecout" aria-live="polite"></div>' +
      '<h3>Puntos clave</h3>' + S.kv([['Eutectoide', '0.76 % C, 727 °C: austenita → perlita'], ['Límite acero / hierro fundido', '2.14 % C: máxima solubilidad en austenita'], ['Eutéctico', '4.3 % C, 1 147 °C: líquido → austenita + cementita'], ['Peritéctico', '0.17 % C, 1 495 °C: líquido + δ → austenita'], ['A₃ (hierro puro)', '912 °C: ferrita ↔ austenita'], ['Fusión del hierro', '1 538 °C']]) +
      '<h3>Cómo leerlo</h3>' + S.ul(['El diagrama describe el equilibrio: enfriamiento lento. Al templar aparecen martensita y bainita, que no están en él.', 'A₁ y A₃ son las temperaturas críticas. Los aleantes las mueven: Ni y Mn las bajan; Cr, Mo y Si las suben.', 'El carbono de un acero comercial casi siempre es menor a 1 %: la esquina izquierda es la que importa en la siderurgia.', 'Líneas simplificadas con tramos rectos entre los puntos invariantes.']);
    return { title: 'Diagrama hierro-carbono', html: h, after: init };
  };

  function init(root) {
    var svg = root.querySelector('#fecsvg'), out = root.querySelector('#fecout');
    function set(c, t) {
      c = Math.min(CMAX, Math.max(0, c)); t = Math.min(TMAX, Math.max(TMIN, t));
      var f = S.fase(c, t), x = px(c), y = py(t);
      svg.querySelector('#fecdot').setAttribute('cx', x); svg.querySelector('#fecdot').setAttribute('cy', y);
      svg.querySelector('#fecx').setAttribute('d', 'M' + x + ' ' + Y0 + 'V' + y + 'H' + X0);
      out.innerHTML = '<div class="small">' + c.toFixed(2) + ' % C a ' + Math.round(t / 5) * 5 + ' °C</div><b>' + f[0] + '</b><div style="font-size:14.5px;line-height:1.4">' + f[1] + '</div>';
    }
    function ev(e) {
      var p = e.touches ? e.touches[0] : e, f = S.localFrac(svg, p.clientX, p.clientY);
      var sx = f[0] * 360, sy = f[1] * 258;
      set((sx - X0) / (X1 - X0) * CMAX, TMIN + (Y0 - sy) / (Y0 - Y1) * (TMAX - TMIN));
    }
    var down = false;
    svg.addEventListener('pointerdown', function (e) { down = true; try { svg.setPointerCapture(e.pointerId); } catch (x) {} ev(e); });
    svg.addEventListener('pointermove', function (e) { if (down) ev(e); });
    svg.addEventListener('pointerup', function () { down = false; });
    svg.addEventListener('pointercancel', function () { down = false; });
    set(0.4, 850);
  }
})();

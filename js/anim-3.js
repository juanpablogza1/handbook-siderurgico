/* Animaciones 3: pintado, hojalata, tubería, rolado, trefilado */
(function () {
  var A = S.A, t = A.t, n = A.n;

  /* ---------- Pintado continuo (coil coating) ---------- */
  S.anim.pintado = function () {
    var s = '', y = 70, AZ = '#b9d6e2', PR = '#d9cfa3', TOP = '#3f7fd0';
    s += A.coil(20, 106, 16, 4, 1, AZ) + '<path d="M20 90Q22 ' + y + ' 40 ' + y + '" fill="none" stroke="' + AZ + '" stroke-width="2.6"/>';
    s += '<path class="sh2" d="M42 ' + (y - 12) + 'h44v32H42z"/><rect x="43" y="' + (y + 2) + '" width="42" height="17" class="wfill"/>' + n(1, 64, y - 22);
    function seg(x1, x2, col) { return '<path d="M' + x1 + ' ' + y + 'H' + x2 + '" stroke="' + col + '" stroke-width="2.8" fill="none"/>'; }
    s += seg(40, 104, AZ) + seg(104, 198, PR) + seg(198, 330, TOP);
    s += '<path d="M40 ' + y + 'H330" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="2.8" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".5s" repeatCount="indefinite"/></path>';
    // aplicador de primario
    function coater(x, col, num) {
      return '<path class="sh2" d="M' + (x - 14) + ' ' + (y + 22) + 'V' + (y + 34) + 'H' + (x + 8) + 'V' + (y + 22) + '"/><rect x="' + (x - 13) + '" y="' + (y + 26) + '" width="20" height="7" fill="' + col + '"/>' +
        A.roll(x - 6, y + 20, 6, 1, 1) + A.roll(x, y + 7.5, 6, 1, -1) + A.roll(x, y - 7.5, 6, 1, 1) + n(num, x, y - 24);
    }
    s += coater(104, PR, 2);
    function oven(x, w, num) {
      var o = '<path class="sh2" d="M' + x + ' ' + (y - 14) + 'h' + w + 'v28h-' + w + 'z"/>' + A.glow(x + w / 2, y, 20);
      for (var k = x + 10; k < x + w; k += 14) o += A.flow('M' + k + ' ' + (y - 12) + 'V' + (y - 4), 'fire', 0.5);
      return o + n(num, x + w / 2, y - 24);
    }
    s += oven(124, 54, 3) + coater(198, TOP, 4) + oven(218, 66, 5);
    s += '<path class="sh2" d="M292 ' + (y - 10) + 'V' + (y + 18) + 'H312V' + (y - 10) + '"/>' + A.flow('M298 ' + (y - 18) + 'V' + (y - 3), 'wat', 0.4) + A.flow('M306 ' + (y - 18) + 'V' + (y - 3), 'wat', 0.4);
    s += '<path d="M330 ' + y + 'Q340 ' + y + ' 340 92" fill="none" stroke="' + TOP + '" stroke-width="2.8"/>' + A.coil(340, 108, 16, 4, 1, TOP);
    s += t(8, 20, '1 Limpieza y pretratamiento  2 Primario  3 Horno', { a: 'start', c: 'd' }) + t(8, 32, '4 Acabado (y reverso)  5 Horno: metal a 200–250 °C, luego agua', { a: 'start', c: 'd' });
    // capas
    var L = [['Acabado 18–25 µm', TOP, 9], ['Primario 5–8 µm', PR, 5], ['Pretratamiento', '#7fc8a0', 2.5], ['Zn o Al-Zn', AZ, 6], ['Acero base', '#8d9ba6', 16], ['Zn o Al-Zn', AZ, 6], ['Reverso (backer)', '#9aa7b1', 5]];
    var yy = 132; s += t(30, 126, 'Capas del prepintado', { a: 'start' });
    L.forEach(function (l, i) {
      s += '<rect x="30" y="' + yy + '" width="130" height="' + l[2] + '" fill="' + l[1] + '"/>';
      if (i !== 5) { var ly = [138, 150, 162, 174, 186, 0, 204][i]; s += '<path class="ln2" d="M160 ' + (yy + l[2] / 2) + 'H168L178 ' + (ly - 3) + 'H186"/>' + t(190, ly, l[0], { a: 'start' }); }
      yy += l[2] + 1;
    });
    return A.svg(s);
  };

  /* ---------- Hojalata: estañado electrolítico ---------- */
  S.anim.hojalata = function () {
    var s = '', yt = 64, yb = 148, d = 'M6 ' + yt, tanks = [34, 84, 134, 184], cols;
    tanks.forEach(function (x) { d += 'H' + (x + 12) + 'V' + yb + 'A8 8 0 0 0 ' + (x + 28) + ' ' + yb + 'V' + yt; });
    d += 'H300';
    tanks.forEach(function (x, i) {
      s += '<path class="sh2" d="M' + x + ' 88V170H' + (x + 40) + 'V88"/><rect x="' + (x + 1) + '" y="96" width="38" height="73" class="' + (i === 0 ? 'acid' : 'wfill') + '"/>';
      s += A.roll(x + 20, yb, 8, 1.4, -1) + A.roll(x + 12, yt - 5, 4, 0.8, 1) + A.roll(x + 28, yt - 5, 4, 0.8, 1);
      if (i > 0) {
        s += '<rect x="' + (x + 3) + '" y="104" width="3.5" height="44" fill="#e8eef1"/><rect x="' + (x + 33.5) + '" y="104" width="3.5" height="44" fill="#e8eef1"/><rect x="' + (x + 18.2) + '" y="104" width="3.5" height="34" fill="#e8eef1"/>';
        s += A.dots('M' + (x + 7) + ' 116H' + (x + 11), 2, 0.9, '#fff', 1.2) + A.dots('M' + (x + 33) + ' 130H' + (x + 29), 2, 0.9, '#fff', 1.2) + A.dots('M' + (x + 18) + ' 124H' + (x + 13), 2, 1, '#fff', 1.2) + A.dots('M' + (x + 22) + ' 112H' + (x + 27), 2, 1, '#fff', 1.2);
      }
    });
    s += '<linearGradient id="gTin" gradientUnits="userSpaceOnUse" x1="0" x2="300" y1="0" y2="0"><stop offset=".25" stop-color="#7d8b97"/><stop offset=".75" stop-color="#c9d3da"/></linearGradient>';
    s += '<path d="' + d + '" fill="none" stroke="url(#gTin)" stroke-width="2.6" stroke-linejoin="round"/><path d="' + d + '" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="2.6" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".45s" repeatCount="indefinite"/></path>';
    // reflujo
    s += '<path class="sh" d="M244 ' + (yt - 12) + 'h34v24h-34z" fill="none"/>' + A.glow(261, yt, 18) + '<path d="M250 ' + (yt - 12) + 'v24M256 ' + (yt - 12) + 'v24M262 ' + (yt - 12) + 'v24M268 ' + (yt - 12) + 'v24M274 ' + (yt - 12) + 'v24" stroke="#f58a2e" stroke-width="1.2"/>';
    s += '<path d="M278 ' + yt + 'H318Q334 ' + yt + ' 336 84" fill="none" stroke="#f6fafc" stroke-width="2.8"/>' + A.coil(336, 104, 18, 3, 1, '#f6fafc');
    s += '<path class="ln2" d="M104 46H222M104 46v12M154 46v12M204 46v12"/>' + t(163, 40, 'Ánodos de Sn (+), banda (−)', {});
    s += n(1, 54, 184) + n(2, 154, 184) + n(3, 261, 36) + n(4, 336, 136);
    s += t(8, 204, '1 Limpieza y decapado  2 Celdas de estañado: Sn²⁺ + 2e⁻ → Sn', { a: 'start', c: 'd' }) + t(8, 216, '3 Reflujo > 232 °C: brillo y capa FeSn₂  4 Pasivado y aceitado', { a: 'start', c: 'd' });
    s += t(8, 20, 'Lámina negra 0.13–0.50 mm', { a: 'start' }) + t(352, 20, 'Estaño 1.0–11.2 g/m² por cara', { a: 'end', c: 'h' });
    return A.svg(s);
  };

  /* ---------- Tubería con costura ERW ---------- */
  S.anim['tubos-erw'] = function () {
    var s = '', y = 128;
    // evolución de la sección
    s += '<path class="st" d="M20 52H56"/>' + A.arrow(62, 52, 76, 52) + '<path class="st" d="M82 44Q100 66 118 44"/>' + A.arrow(124, 52, 138, 52) + '<path class="st" d="M146 38Q142 66 162 66Q182 66 178 38"/>' + A.arrow(186, 52, 200, 52) +
      '<path class="st" d="M222 36A16 16 0 1 0 230 36"/>' + A.arrow(250, 52, 264, 52) + '<circle cx="286" cy="52" r="16" fill="none" stroke="#c9d3da" stroke-width="2.6"/><circle cx="286" cy="36" r="3.2" fill="#ffc53d"/>';
    s += t(38, 82, 'Fleje', {}) + t(162, 82, 'Formado progresivo', {}) + t(286, 82, 'Soldado', { c: 'h' }) + t(8, 20, 'Sección transversal', { a: 'start', c: 'd' });
    // vista superior
    s += t(8, 100, 'Vista superior de la línea', { a: 'start', c: 'd' });
    s += '<path d="M10 ' + (y - 16) + 'H60L196 ' + (y - 8) + 'H352V' + (y + 8) + 'H196L60 ' + (y + 16) + 'H10Z" fill="url(#gSteel)"/>';
    s += '<path d="M108 ' + (y - 5) + 'L196 ' + y + 'L108 ' + (y + 5) + '" fill="#141b22" stroke="#141b22" stroke-width="1.2"/>';
    s += '<path d="M196 ' + y + 'H352" stroke="#6f7d88" stroke-width="1" stroke-dasharray="3 3"/>';
    s += '<path d="M10 ' + (y - 12) + 'H60L196 ' + (y - 6) + 'H352" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="1.2" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".4s" repeatCount="indefinite"/></path>';
    [[72, 19], [104, 17], [136, 15.2]].forEach(function (p) { s += A.roll(p[0], y - p[1], 5, 0.8, 1) + A.roll(p[0], y + p[1], 5, 0.8, -1); });
    s += n(1, 104, y + 36);
    // inductor y rodillos de apriete
    [168, 174, 180].forEach(function (x) { s += '<ellipse cx="' + x + '" cy="' + y + '" rx="3" ry="14" fill="none" stroke="#f58a2e" stroke-width="2"/>'; });
    s += n(2, 174, y + 36) + A.roll(198, y - 14, 6, 0.8, 1) + A.roll(198, y + 14, 6, 0.8, -1) + A.glow(196, y, 12) + A.blink('<path d="M196 ' + y + 'l-8-8M196 ' + y + 'l-9 2M196 ' + y + 'l-7 8" stroke="#fff3d6" stroke-width="1.2"/>', 0.25);
    s += '<path d="M196 ' + y + 'H236" stroke="url(#gHotH)" stroke-width="2.4"/>' + n(3, 198, y - 32);
    s += '<path class="ln" d="M218 ' + (y - 16) + 'l6 14"/><path d="M224 ' + (y - 2) + 'q8-10 14-4" fill="none" stroke="#f58a2e" stroke-width="1.4"/>' + n(4, 226, y + 36);
    s += '<rect x="244" y="' + (y - 3) + '" width="26" height="6" fill="#f26a1b" opacity=".8"><animate attributeName="opacity" values=".9;.5;.9" dur="1s" repeatCount="indefinite"/></rect>' + n(5, 257, y - 32);
    s += A.roll(292, y - 13, 5, 0.8, 1) + A.roll(292, y + 13, 5, 0.8, -1) + n(6, 292, y + 36);
    s += '<g><circle cx="326" cy="' + (y - 20) + '" r="9" fill="none" stroke="#ffc53d" stroke-width="1.6" stroke-dasharray="2 2"/><animateTransform attributeName="transform" type="translate" values="0 0;0 18;0 0" dur="2s" repeatCount="indefinite"/></g>' + n(7, 344, y - 32);
    s += t(8, 190, '1 Formado  2 Inductor de alta frecuencia  3 Rodillos de apriete: forja', { a: 'start', c: 'd' }) + t(8, 202, '4 Desbarbado  5 Normalizado de costura  6 Calibrado  7 Corte al vuelo', { a: 'start', c: 'd' });
    return A.svg(s);
  };

  /* ---------- Tubería sin costura ---------- */
  S.anim['tubos-sin-costura'] = function () {
    var s = '', y = 76;
    // perforador: vista superior
    s += '<rect x="14" y="' + (y - 11) + '" width="126" height="22" fill="url(#gHotH)"/>';
    s += '<path d="M14 ' + (y - 11) + 'H140" stroke="#1b232b" stroke-opacity=".45" stroke-width="22" stroke-dasharray="2 10" transform="translate(0 11)"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur=".5s" repeatCount="indefinite"/></path>';
    s += '<path d="M142 ' + (y - 11) + 'H270V' + (y - 5) + 'H160Z" fill="#f26a1b"/><path d="M142 ' + (y + 11) + 'H270V' + (y + 5) + 'H160Z" fill="#f26a1b"/>';
    s += '<path d="M132 ' + y + 'Q146 ' + (y - 9) + ' 162 ' + (y - 4.5) + 'V' + (y + 4.5) + 'Q146 ' + (y + 9) + ' 132 ' + y + 'Z" fill="#c9d3da" stroke="#1b232b"/><path d="M162 ' + y + 'H330" stroke="#c9d3da" stroke-width="3"/>';
    function barrel(cy, rot) {
      return '<g transform="rotate(' + rot + ' 146 ' + cy + ')"><path class="roll" d="M106 ' + (cy - 9) + 'L146 ' + (cy - 15) + 'L186 ' + (cy - 9) + 'V' + (cy + 9) + 'L146 ' + (cy + 15) + 'L106 ' + (cy + 9) + 'Z"/>' +
        '<path d="M110 ' + cy + 'H182" stroke="#b7c5d0" stroke-width="18" stroke-dasharray="1.5 9" opacity=".5"><animate attributeName="stroke-dashoffset" from="0" to="' + (rot > 0 ? -10.5 : 10.5) + '" dur=".4s" repeatCount="indefinite"/></path></g>';
    }
    s += barrel(y - 27, -7) + barrel(y + 27, 7);
    s += n(1, 14, 14) + t(26, 17, 'Perforado Mannesmann, 1 200–1 280 °C', { a: 'start' });
    s += t(60, y + 3, 'Barra redonda', { c: 'k' }) + t(300, y - 10, 'Punzón', { c: 'd' }) + t(230, y + 26, 'Esbozo hueco', { c: 'h' });
    // laminador de mandril
    var y2 = 150;
    s += '<path d="M10 ' + (y2 - 9) + 'H60L120 ' + (y2 - 6.5) + 'V' + (y2 + 6.5) + 'L60 ' + (y2 + 9) + 'H10Z" fill="#f26a1b"/><path d="M4 ' + y2 + 'H126" stroke="#c9d3da" stroke-width="5"/>';
    [48, 72, 96].forEach(function (x, i) { s += A.stand(x, y2, 6, 0, 0.9 - i * 0.15); });
    s += n(2, 66, y2 + 30) + t(66, y2 + 48, 'Laminador de mandril:', {}) + t(66, y2 + 59, 'adelgaza la pared', { c: 'd' });
    // reductor estirador
    s += '<path d="M146 ' + (y2 - 6.5) + 'H160L226 ' + (y2 - 3.6) + 'H240V' + (y2 + 3.6) + 'H226L160 ' + (y2 + 6.5) + 'H146Z" fill="#d9482b"/>';
    for (var x = 166; x <= 220; x += 11) s += A.roll(x, y2 - 9.5 + (x - 166) * 0.045, 3.6, 0.6, 1) + A.roll(x, y2 + 9.5 - (x - 166) * 0.045, 3.6, 0.6, -1);
    s += n(3, 193, y2 + 30) + t(193, y2 + 48, 'Reductor estirador:', {}) + t(193, y2 + 59, 'fija el diámetro', { c: 'd' });
    // tratamiento y roscado
    s += '<path class="sh2" d="M258 ' + (y2 - 14) + 'h40v28h-40z"/>' + A.glow(278, y2, 16) + '<path d="M250 ' + (y2 - 3.6) + 'H350V' + (y2 + 3.6) + 'H250Z" fill="#8d9ba6"/>';
    s += '<path d="M326 ' + (y2 - 3.6) + 'v7.2M330 ' + (y2 - 3.6) + 'v7.2M334 ' + (y2 - 3.6) + 'v7.2M338 ' + (y2 - 3.6) + 'v7.2M342 ' + (y2 - 3.6) + 'v7.2M346 ' + (y2 - 3.6) + 'v7.2" stroke="#1b232b" stroke-width="1"/>';
    s += n(4, 300, y2 + 30) + t(300, y2 + 48, 'Temple y revenido,', {}) + t(300, y2 + 59, 'inspección, roscado', { c: 'd' });
    return A.svg(s);
  };

  /* ---------- Corte longitudinal y rolado de perfiles ---------- */
  S.anim.rolado = function () {
    var s = '', y = 56;
    // slitter
    s += A.coil(28, y, 22, 5, 1);
    s += '<path d="M28 ' + (y - 22) + 'H150" class="st" stroke-width="3"/>';
    s += A.roll(150, y - 31, 8, 0.8, 1) + A.roll(150, y - 13, 8, 0.8, -1) + '<path d="M146 ' + (y - 40) + 'v36M154 ' + (y - 40) + 'v36" stroke="#ffc53d" stroke-width="1.4"/>';
    s += '<path d="M158 ' + (y - 22) + 'L306 ' + (y - 30) + '" class="st" stroke-width="1.6"/><path d="M158 ' + (y - 22) + 'L306 ' + (y - 22) + '" class="st" stroke-width="1.6"/><path d="M158 ' + (y - 22) + 'L306 ' + (y - 14) + '" class="st" stroke-width="1.6"/>';
    s += '<path d="M40 ' + (y - 22) + 'H306" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="3" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".4s" repeatCount="indefinite"/></path>';
    s += A.coil(326, y, 22, 3, 1) + '<path d="M312 ' + (y - 17) + 'L340 ' + (y + 17) + 'M318 ' + (y - 20) + 'L346 ' + (y + 10)+ '" stroke="#141b22" stroke-width="1.6"/>';
    s += n(1, 150, y + 6) + t(162, y + 9, 'Corte longitudinal (slitter)', { a: 'start' }) + t(90, y + 24, 'Rollo madre', { c: 'd' }) + t(250, y + 24, 'Cintas o flejes', { c: 'd' });
    // roll forming
    var y2 = 182, xs = [70, 112, 154, 196, 238];
    s += '<path class="st" d="M10 ' + y2 + 'H300"/><path d="M10 ' + y2 + 'H300" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="2.6" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".5s" repeatCount="indefinite"/></path>';
    var secs = ['M-16 0H16', 'M-15 -5L-10 0H10L15 -5', 'M-12 -10L-9 0H9L12 -10', 'M-9 -14V0H9V-14', 'M-5 -11H-9V0H9V-11H5'];
    xs.forEach(function (x, i) {
      s += A.stand(x, y2, 7, 0, 1) + '<g transform="translate(' + x + ' 150) scale(.8)"><path d="' + secs[i] + '" class="st" stroke-width="2.6"/></g>';
      if (i < 4) s += A.arrow(x + 16, 146, x + 26, 146);
    });
    s += t(8, 122, 'Sección en cada estación', { a: 'start', c: 'd' });
    s += '<g><path d="M278 ' + (y2 - 26) + 'h10v20h-10z" class="sh"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 8;0 0" keyTimes="0;.7;.85;1" dur="2s" repeatCount="indefinite"/></g>';
    s += '<g><path d="M300 ' + y2 + 'h34" class="st" stroke-width="3"/><animateTransform attributeName="transform" type="translate" values="0 0;22 0" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.8;1" dur="2s" repeatCount="indefinite"/></g>';
    s += n(2, 20, 206) + t(32, 209, 'Rolado en frío: dobla poco a poco, sin cambiar el espesor', { a: 'start' }) + n(3, 283, y2 - 36);
    s += t(320, 150, 'Polín C', { c: 'h' });
    return A.svg(s);
  };

  /* ---------- Trefilado ---------- */
  S.anim.trefilado = function () {
    var s = '', y = 70;
    s += A.coil(24, y, 18, 5, 1, '#6f5a4c') + t(4, y + 34, 'Alambrón', { a: 'start' }) + t(4, y + 45, '5.5 mm', { a: 'start', c: 'd' });
    s += '<path d="M24 ' + (y - 18) + 'Q40 ' + (y - 18) + ' 48 ' + (y - 8) + 'T64 ' + (y - 8) + 'T80 ' + y + 'H96" class="stdark" stroke-width="4.5"/>' + A.roll(48, y - 14, 4, 0.8, 1) + A.roll(56, y - 2, 4, 0.8, -1) + A.roll(64, y - 14, 4, 0.8, 1) + n(1, 56, y - 30);
    function die(x) { return '<path d="M' + x + ' ' + (y - 12) + 'h16v8.5l-12 2.2z" class="sh"/><path d="M' + x + ' ' + (y + 12) + 'h16v-8.5l-12-2.2z" class="sh"/>'; }
    var w = [4.5, 3.4, 2.5, 1.8], xs = [96, 172, 248];
    xs.forEach(function (x, i) {
      s += '<path d="M' + (i ? x - 46 : 80) + ' ' + y + 'H' + (x + 4) + '" stroke="#c9d3da" stroke-width="' + w[i] + '"/>' + die(x);
      s += '<path d="M' + (x + 12) + ' ' + y + 'H' + (x + 30) + '" stroke="#e3eaee" stroke-width="' + w[i + 1] + '"/>';
      s += A.roll(x + 38, y + 12, 14, 1.6 - i * 0.4, 1) + '<circle cx="' + (x + 38) + '" cy="' + (y + 12) + '" r="15.5" fill="none" stroke="#e3eaee" stroke-width="' + w[i + 1] + '"/>';
    });
    s += '<path d="M300 ' + y + 'H326" stroke="#e3eaee" stroke-width="1.8"/>' + A.coil(338, y + 2, 14, 1.4, 1, '#e3eaee') + t(356, y + 34, 'Alambre', { a: 'end' }) + t(356, y + 45, '2.0 mm', { a: 'end', c: 'd' });
    s += '<path d="M80 ' + y + 'H326" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="3" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".35s" repeatCount="indefinite"/></path>';
    s += n(2, 104, y - 26) + n(3, 134, y - 12) + t(8, 20, '1 Decalaminado mecánico  2 Dado  3 Cabrestante (tira del alambre)', { a: 'start', c: 'd' });
    // detalle del dado
    var yd = 172;
    s += t(8, 136, 'Detalle del dado', { a: 'start', c: 'd' });
    s += '<path d="M60 ' + (yd - 30) + 'H150V' + (yd - 5) + 'H128L84 ' + (yd - 15) + 'L60 ' + (yd - 22) + 'Z" class="sh"/><path d="M60 ' + (yd + 30) + 'H150V' + (yd + 5) + 'H128L84 ' + (yd + 15) + 'L60 ' + (yd + 22) + 'Z" class="sh"/>';
    s += '<path d="M8 ' + (yd - 14) + 'H86L128 ' + (yd - 4.5) + 'H210V' + (yd + 4.5) + 'H128L86 ' + (yd + 14) + 'H8Z" fill="url(#gSteel)"/>';
    s += '<path d="M8 ' + yd + 'H210" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="2" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".5s" repeatCount="indefinite"/></path>';
    s += A.dots('M40 ' + (yd - 18) + 'L84 ' + (yd - 16), 3, 1.4, '#d9cfa3', 1.6) + t(8, yd - 22, 'Lubricante', { a: 'start', c: 'd' });
    s += t(226, yd - 14, 'Núcleo de carburo', { a: 'start' }) + t(226, yd - 2, 'Semiángulo 6–8°', { a: 'start', c: 'd' }) + t(226, yd + 10, 'Reducción 15–25 % por paso', { a: 'start', c: 'h' }) + t(226, yd + 22, 'Endurece por deformación', { a: 'start', c: 'd' });
    return A.svg(s);
  };
})();

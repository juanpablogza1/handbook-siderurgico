/* Animaciones 2: colada, laminación en caliente, largos, decapado, frío, recocido, galvanizado */
(function () {
  var A = S.A, t = A.t, n = A.n;

  /* ---------- Colada continua ---------- */
  S.anim['colada-continua'] = function () {
    var s = '';
    s += '<path class="sh2" d="M42 8H98L92 44H48Z"/><path d="M47 16H93L89 42H51Z" fill="url(#gHot)"/><path class="hs" d="M70 44V60"/>';
    s += '<path class="sh2" d="M26 58H114L106 78H34Z"/><path d="M33 64H107L103 76H37Z" fill="#ffc53d"/><path class="hs" d="M70 78V92"/>';
    s += n(1, 18, 26) + n(2, 12, 70);
    // hilo con gradiente de enfriamiento
    var strand = 'M70 104V120A70 70 0 0 0 140 190H296';
    s += '<path d="' + strand + '" fill="none" stroke="url(#gCoolH)" stroke-width="11"/>';
    s += '<path d="M70 100V120A70 70 0 0 0 120 187" fill="none" stroke="#fff3d6" stroke-width="4" stroke-linecap="round" opacity=".9"/>';
    // molde oscilante
    s += '<g><path d="M58 88h5v24h-5zM77 88h5v24h-5z" fill="#c98b4a" stroke="#1b232b" stroke-width=".6"/><animateTransform attributeName="transform" type="translate" values="0 -2;0 2;0 -2" dur=".5s" repeatCount="indefinite"/></g>';
    s += n(3, 100, 100);
    // rodillos y rocío sobre el arco
    for (var k = 0; k <= 5; k++) {
      var a = Math.PI - (k + 0.5) * (Math.PI / 2) / 6, cx = 140, cy = 120;
      [61, 79].forEach(function (R) { s += A.roll((cx + R * Math.cos(a)).toFixed(1) * 1, (cy + R * Math.sin(a)).toFixed(1) * 1, 3.2, 1.2, R > 70 ? -1 : 1); });
      var sx = cx + 90 * Math.cos(a), sy = cy + 90 * Math.sin(a), ex = cx + 82 * Math.cos(a), ey = cy + 82 * Math.sin(a);
      s += '<path d="M' + sx.toFixed(1) + ' ' + sy.toFixed(1) + 'L' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" stroke="#5fb0ff" stroke-width="2" stroke-dasharray="2 2"><animate attributeName="opacity" values="1;.2;1" dur=".6s" begin="' + (-k * 0.1) + 's" repeatCount="indefinite"/></path>';
    }
    for (var x = 152; x <= 282; x += 26) s += A.roll(x, 181, 3.2, 1.2, 1) + A.roll(x, 199, 3.2, 1.2, -1);
    s += n(4, 34, 172) + n(5, 216, 168);
    // soplete y planchones
    s += '<path class="ln" d="M296 150v26"/>' + A.flame(296, 186, 0.7) + n(6, 296, 140);
    s += '<g><rect x="300" y="184.5" width="40" height="11" fill="#b3261e" stroke="#1b232b" stroke-width=".6"/><animateTransform attributeName="transform" type="translate" values="0 0;44 0" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.8;1" dur="3s" repeatCount="indefinite"/></g>';
    s += '<path class="ln2" d="M300 201H358"/>';
    s += t(172, 30, '1 Cucharón', { a: 'start' }) + t(172, 44, '2 Distribuidor', { a: 'start' }) + t(172, 58, '3 Molde de cobre (oscila)', { a: 'start' }) +
      t(172, 72, '4 Enfriamiento con rocío', { a: 'start' }) + t(172, 86, '5 Enderezado', { a: 'start' }) + t(172, 100, '6 Corte con soplete', { a: 'start' });
    s += t(172, 122, 'Núcleo líquido', { a: 'start', c: 'h' }) + A.arrow(170, 119, 104, 150, '#ffc53d') + t(326, 216, 'Planchón', { c: 'h' });
    return A.svg(s);
  };

  /* ---------- Laminación en caliente ---------- */
  S.anim['laminacion-caliente'] = function () {
    var s = '', y = 104;
    s += '<path class="sh2" d="M6 76h50v56H6z"/>' + A.flame(18, 96, 0.8) + A.flame(42, 96, 0.8) + A.glow(30, 106, 26) + t(31, 70, 'Horno', {}) + t(31, 144, '1 250 °C', { c: 'h' });
    // banda que adelgaza y se enfría
    s += '<path d="M20 ' + (y - 6) + 'H96L104 ' + (y - 3.5) + 'H150L156 ' + (y - 2.6) + 'H176L181 ' + (y - 2) + 'H201L206 ' + (y - 1.5) + 'H226L231 ' + (y - 1.1) + 'H316V' + (y + 1.1) + 'H231L226 ' + (y + 1.5) + 'H206L201 ' + (y + 2) + 'H181L176 ' + (y + 2.6) + 'H156L150 ' + (y + 3.5) + 'H104L96 ' + (y + 6) + 'H20Z" fill="url(#gCoolH)"/>';
    s += '<path d="M20 ' + y + 'H316" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="1.6" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".5s" repeatCount="indefinite"/></path>';
    // descascarado
    s += A.flow('M74 78L80 96', 'wat', 0.4) + A.flow('M74 130L80 112', 'wat', 0.4) + n(1, 76, 66);
    // desbaste y acabado
    s += A.stand(100, y, 9, 0, 1.6) + n(2, 100, 66);
    [153, 178.5, 203.5, 228.5].forEach(function (x, i) { s += A.stand(x, y, 5, 10, 1 - i * 0.15); });
    s += n(3, 190, 56) + '<path class="ln2" d="M148 64H234"/>';
    // enfriamiento laminar
    for (var x = 248; x <= 300; x += 10) s += A.flow('M' + x + ' 78V' + (y - 3), 'wat', 0.5);
    s += '<path class="ln" d="M244 76H304"/>' + n(4, 274, 64);
    // enrollador
    s += '<path d="M316 ' + y + 'Q326 ' + y + ' 330 128" fill="none" stroke="#b3261e" stroke-width="2.4"/>' + A.roll(318, y - 5, 3.5, 0.8, 1);
    s += A.coil(332, 150, 22, 3, 1, '#c46a55') + n(5, 298, 150);
    s += t(14, 166, 'Planchón', { a: 'start' }) + t(14, 177, '200–250 mm', { a: 'start', c: 'd' }) + t(126, 166, 'Barra', {}) + t(126, 177, '25–40 mm', { c: 'd' }) + t(206, 166, 'Banda', {}) + t(206, 177, '1.2–20 mm', { c: 'd' });
    s += t(190, 144, 'Salida 850–920 °C', { c: 'h' }) + t(336, 190, '550–700 °C', { c: 'h', a: 'end' });
    s += t(8, 200, '1 Descascarado  2 Desbaste  3 Tren acabador  4 Enfriamiento laminar', { a: 'start', c: 'd' }) + t(8, 212, '5 Enrollado', { a: 'start', c: 'd' });
    return A.svg(s);
  };

  /* ---------- Laminación de largos ---------- */
  S.anim.largos = function () {
    var s = '', y = 52;
    s += '<path class="sh2" d="M6 30h42v44H6z"/>' + A.flame(18, 48, 0.7) + A.flame(36, 48, 0.7) + A.glow(27, 56, 20) + t(27, 24, 'Horno', {});
    s += '<path d="M20 ' + (y - 5) + 'H74L80 ' + (y - 4) + 'H104L110 ' + (y - 3) + 'H134L140 ' + (y - 2.2) + 'H164L170 ' + (y - 1.6) + 'H300V' + (y + 1.6) + 'H170L164 ' + (y + 2.2) + 'H140L134 ' + (y + 3) + 'H110L104 ' + (y + 4) + 'H80L74 ' + (y + 5) + 'H20Z" fill="url(#gCoolH)"/>';
    [77, 107, 137, 167].forEach(function (x, i) {
      if (i % 2 === 0) s += A.stand(x, y, 6.5, 0, 1.2 - i * 0.2);
      else s += '<rect x="' + (x - 4) + '" y="' + (y - 13) + '" width="8" height="26" rx="3" class="roll"/><path class="spoke" d="M' + (x - 4) + ' ' + y + 'h8"><animate attributeName="stroke-opacity" values="1;.2;1" dur=".4s" repeatCount="indefinite"/></path>';
    });
    s += n(1, 122, 20) + t(134, 23, 'Cajas H y V alternadas', { a: 'start' });
    s += '<path class="sh2" d="M196 40h44v24h-44z"/>' + A.flow('M204 42V50', 'wat', 0.4) + A.flow('M218 42V50', 'wat', 0.4) + A.flow('M232 42V50', 'wat', 0.4) + A.flow('M204 62V54', 'wat', 0.4) + A.flow('M218 62V54', 'wat', 0.4) + A.flow('M232 62V54', 'wat', 0.4);
    s += n(2, 218, 78) + t(230, 81, 'Temple en línea', { a: 'start' });
    s += '<path class="ln" d="M296 34v40M312 34v40M328 34v40M344 34v40"/><path class="ln2" d="M290 74h60"/>' + t(354, 16, 'Mesa de', { a: 'end' }) + t(354, 27, 'enfriamiento', { a: 'end' });
    [0, 1, 2].forEach(function (k) { s += '<circle cx="' + (304 + k * 16) + '" cy="60" r="3" fill="#b3261e"><animate attributeName="fill" values="#d9482b;#8d9ba6" dur="4s" begin="' + (-k) + 's" repeatCount="indefinite"/></circle>'; });
    // evolución de la sección
    s += '<rect x="26" y="98" width="20" height="20" fill="#ffc53d"/>' + A.arrow(54, 108, 72, 108) + '<ellipse cx="92" cy="108" rx="14" ry="7.5" fill="#f58a2e"/>' + A.arrow(112, 108, 130, 108) +
      '<circle cx="146" cy="108" r="9" fill="#f26a1b"/>' + A.arrow(162, 108, 180, 108) +
      '<circle cx="198" cy="108" r="8" fill="#8d9ba6"/><path d="M190 100l16 16M186 106l12 12M196 98l12 12" stroke="#1b232b" stroke-width="1.4"/><circle cx="198" cy="108" r="8" fill="none" stroke="#c9d3da" stroke-width="1.6"/>';
    s += t(36, 132, 'Palanquilla', {}) + t(92, 132, 'Óvalo', {}) + t(146, 132, 'Redondo', {}) + t(198, 132, 'Varilla', {}) + t(286, 104, 'La sección se reduce', { c: 'd' }) + t(286, 115, 'en 12 a 20 pasadas', { c: 'd' });
    // alambrón: formador de espiras
    var y2 = 178;
    s += '<path class="hs2" d="M10 ' + y2 + 'H112"/>' + '<path class="sh2" d="M34 ' + (y2 - 12) + 'h34v24h-34z"/>' + t(51, y2 - 18, 'Bloque acabador', {});
    s += '<path class="sh" d="M112 ' + (y2 - 8) + 'L140 ' + (y2 - 16) + 'V' + (y2 + 16) + 'L112 ' + (y2 + 8) + 'Z"/><path class="spoke" d="M126 ' + (y2 - 11) + 'V' + (y2 + 11) + '"><animate attributeName="stroke-opacity" values="1;.1;1" dur=".3s" repeatCount="indefinite"/></path>';
    var loops = '';
    for (var k = 0; k < 14; k++) loops += '<ellipse cx="' + (148 + k * 13) + '" cy="' + y2 + '" rx="11" ry="15" fill="none" stroke="' + S.tempColor(900 - k * 38) + '" stroke-width="1.8"/>';
    s += '<clipPath id="cL"><rect x="140" y="150" width="172" height="56"/></clipPath><g clip-path="url(#cL)"><g>' + loops + '<animateTransform attributeName="transform" type="translate" from="-13 0" to="0 0" dur=".5s" repeatCount="indefinite"/></g></g>';
    s += '<path class="ln2" d="M140 ' + (y2 + 20) + 'H316"/>' + '<path class="sh2" d="M316 ' + (y2 - 20) + 'h34v44h-34z"/>' + '<ellipse cx="333" cy="' + (y2 + 12) + '" rx="13" ry="5" fill="none" stroke="#8d9ba6" stroke-width="2"/><ellipse cx="333" cy="' + (y2 + 6) + '" rx="13" ry="5" fill="none" stroke="#8d9ba6" stroke-width="2"/><ellipse cx="333" cy="' + y2 + '" rx="13" ry="5" fill="none" stroke="#8d9ba6" stroke-width="2"/>';
    s += n(3, 126, 150) + t(138, 153, 'Formador de espiras y enfriamiento controlado', { a: 'start' }) + t(333, 216, 'Rollo', {}) + t(8, 214, 'Alambrón 5.5–16 mm, hasta 120 m/s', { a: 'start', c: 'd' });
    return A.svg(s);
  };

  /* ---------- Decapado ---------- */
  S.anim.decapado = function () {
    var s = '', y = 96;
    s += A.coil(26, 140, 20, 5, 1, '#6f5a4c') + t(26, 176, 'Rollo negro', {});
    s += '<path class="stdark" d="M26 120Q30 ' + y + ' 52 ' + y + 'H96"/>' + A.roll(52, y + 5, 4, 1, -1);
    s += '<path class="sh" d="M60 ' + (y - 14) + 'h20v28h-20z"/>' + n(1, 70, y - 26) + A.blink('<circle cx="70" cy="' + y + '" r="3" fill="#fff3d6"/>', 0.8);
    // tanques de ácido
    [96, 150, 204].forEach(function (x, i) {
      s += '<path class="sh2" d="M' + x + ' ' + (y - 10) + 'V' + (y + 30) + 'H' + (x + 48) + 'V' + (y - 10) + '"/><rect x="' + (x + 1) + '" y="' + (y - 6) + '" width="46" height="35" class="acid"/>';
      s += A.dots('M' + (x + 12) + ' ' + (y + 2) + 'V' + (y - 6), 2, 1.1, '#dfe8a6', 1.3) + A.dots('M' + (x + 30) + ' ' + (y + 2) + 'V' + (y - 6), 2, 1.4, '#dfe8a6', 1.3);
      s += t(x + 24, y + 22, 'HCl', { c: 'd' });
    });
    s += A.strip('M96 ' + y + 'H146', 'stdark', 0.6) + '<path d="M146 ' + y + 'H204" stroke="#9a8c80" stroke-width="2.6" fill="none"/>' + A.strip('M204 ' + y + 'H330', 'st', 0.6);
    s += n(2, 174, y - 26) + t(186, y - 23, 'Tanques de ácido, 80–90 °C', { a: 'start' });
    // enjuague y secado
    s += '<path class="sh2" d="M258 ' + (y - 10) + 'V' + (y + 30) + 'H292V' + (y - 10) + '"/>' + A.flow('M266 ' + (y - 18) + 'V' + (y - 3), 'wat', 0.4) + A.flow('M284 ' + (y - 18) + 'V' + (y - 3), 'wat', 0.4) + n(3, 275, y + 44) + t(275, y + 60, 'Enjuague', {});
    s += '<path class="st" d="M330 ' + y + 'Q338 ' + y + ' 338 120"/>' + A.roll(306, y + 5, 4, 1, -1) + A.coil(334, 140, 20, 5, 1) + n(4, 334, 170) + t(354, 190, 'Decapado', { a: 'end' }) + t(354, 201, 'y aceitado', { a: 'end' });
    // regeneración
    s += '<path class="sh" d="M112 172h108v26H112z"/>' + t(166, 183, 'Regeneración de ácido', {}) + t(166, 194, 'HCl + óxido de hierro', { c: 'd' });
    s += A.flow('M120 ' + (y + 30) + 'V172', 'fire', 0.9) + A.flow('M212 172V' + (y + 30), 'red', 0.9);
    s += t(8, 28, 'Cascarilla (FeO, Fe₃O₄, Fe₂O₃) + HCl', { a: 'start' }) + t(8, 40, '→ FeCl₂ + H₂O: superficie limpia', { a: 'start', c: 'h' });
    return A.svg(s);
  };

  /* ---------- Laminación en frío ---------- */
  S.anim['laminacion-frio'] = function () {
    var s = '', y = 112;
    s += A.coil(30, y + 26, 24, 4, 1) + A.coil(330, y + 22, 20, 2, 1);
    s += '<path d="M30 ' + (y + 2) + 'Q40 ' + (y - 4) + ' 60 ' + (y - 4) + 'H94L100 ' + (y - 2.8) + 'H144L150 ' + (y - 2) + 'H194L200 ' + (y - 1.4) + 'H244L250 ' + (y - 0.9) + 'H306Q326 ' + (y - 0.9) + ' 330 ' + (y + 2) + 'L330 ' + (y + 3.8) + 'Q326 ' + (y + 0.9) + ' 306 ' + (y + 0.9) + 'H250L244 ' + (y + 1.4) + 'H200L194 ' + (y + 2) + 'H150L144 ' + (y + 2.8) + 'H100L94 ' + (y + 4) + 'H60Q40 ' + (y + 4) + ' 30 ' + (y + 10) + 'Z" fill="url(#gSteel)"/>';
    s += '<path d="M60 ' + y + 'H306" fill="none" stroke="#1b232b" stroke-opacity=".55" stroke-width="1.4" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".35s" repeatCount="indefinite"/></path>';
    [97, 147, 197, 247].forEach(function (x, i) {
      s += A.stand(x, y, 6, 14, 0.9 - i * 0.15) + '<path class="ln2" d="M' + (x - 18) + ' ' + (y - 46) + 'h36v92h-36z"/>' + t(x, y - 52, 'C' + (i + 1), {});
      s += A.flow('M' + (x - 14) + ' ' + (y - 16) + 'L' + (x - 7) + ' ' + (y - 4), 'wat', 0.35);
    });
    s += '<rect x="268" y="' + (y - 16) + '" width="14" height="10" class="sh"/><path d="M275 ' + (y - 6) + 'V' + (y - 1) + '" stroke="#ffc53d" stroke-dasharray="1.5 1.5"/>' + t(270, y - 22, 'Medidor', { a: 'start', c: 'd' });
    s += n(1, 30, 34) + t(42, 37, 'Banda decapada 1.8–4 mm', { a: 'start' });
    s += n(2, 30, 180) + t(42, 183, 'Tándem de cajas cuarto (4-high)', { a: 'start' });
    s += n(3, 30, 198) + t(42, 201, 'Emulsión: lubrica y enfría', { a: 'start', c: 'b' });
    s += n(4, 214, 180) + t(226, 183, 'Salida 0.15–2.5 mm', { a: 'start' }) + t(226, 201, 'Reducción 50–90 %', { a: 'start', c: 'h' });
    return A.svg(s);
  };

  /* ---------- Recocido y temper ---------- */
  S.anim.recocido = function () {
    var s = '', D = 10;
    // campana
    s += '<path class="ln" d="M14 150H134"/>';
    [0, 1, 2].forEach(function (k) {
      s += '<rect x="46" y="' + (118 - k * 30) + '" width="56" height="26" rx="3" fill="#8d9ba6" stroke="#1b232b"><animate attributeName="fill" values="#8d9ba6;#d9482b;#d9482b;#8d9ba6;#8d9ba6" keyTimes="0;.3;.6;.9;1" dur="' + D + 's" repeatCount="indefinite"/></rect><rect x="70" y="' + (118 - k * 30) + '" width="8" height="26" fill="#1b232b" opacity=".5"/>';
    });
    s += '<path class="ln" d="M38 150V46Q38 30 74 30Q110 30 110 46V150"/>';
    s += '<path class="sh2" d="M22 150V34Q22 14 74 14Q126 14 126 34V150" fill="none"/>';
    s += A.phase(A.flame(30, 136, 0.9) + A.flame(118, 136, 0.9) + A.flame(30, 96, 0.9) + A.flame(118, 96, 0.9), D, [[0.02, 0.6]]);
    s += A.flow('M42 142V46Q42 34 74 34Q106 34 106 46V142', 'red', 1.2);
    s += n(1, 14, 166) + t(26, 169, 'Campana con H₂:', { a: 'start' }) + t(26, 181, '650–710 °C, días', { a: 'start', c: 'h' });
    // línea continua
    var xs = [172, 188, 204, 220, 236, 252, 268, 284], d = 'M158 150H' + xs[0];
    xs.forEach(function (x, i) { d += (i % 2 === 0 ? 'V40' : 'V140') + (i < xs.length - 1 ? 'H' + xs[i + 1] : ''); });
    s += '<path class="sh2" d="M164 28h130v124H164z"/><path class="ln2" d="M214 28v124M262 28v124"/>';
    s += '<linearGradient id="gCAL" gradientUnits="userSpaceOnUse" x1="164" x2="294" y1="0" y2="0"><stop offset="0" stop-color="#8d9ba6"/><stop offset=".35" stop-color="#f26a1b"/><stop offset=".7" stop-color="#f26a1b"/><stop offset="1" stop-color="#8d9ba6"/></linearGradient>';
    d += 'V172H346';
    s += '<path d="' + d + '" fill="none" stroke="url(#gCAL)" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="#1b232b" stroke-opacity=".55" stroke-width="2.6" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".5s" repeatCount="indefinite"/></path>';
    s += t(189, 22, 'Calentar', {}) + t(238, 22, 'Mantener', {}) + t(279, 22, 'Enfriar', {});
    s += A.stand(318, 172, 5, 9, 1) + n(3, 318, 132) + t(354, 216, 'Temper 0.5–2 %', { a: 'end' });
    s += n(2, 154, 187) + t(166, 190, 'Continuo: 700–850 °C,', { a: 'start' }) + t(166, 202, 'minutos', { a: 'start', c: 'h' });
    // granos
    s += '<rect x="14" y="190" width="40" height="24" class="sh2"/><path class="ln2" d="M16 196h36M16 202h36M16 208h36"/>' + A.arrow(58, 202, 72, 202) +
      '<rect x="76" y="190" width="40" height="24" class="sh2"/><path class="ln2" d="M76 202l10-12 10 12 10-12 10 12M76 202l10 12 10-12 10 12 10-12"/>';
    return A.svg(s);
  };

  /* ---------- Galvanizado continuo ---------- */
  S.anim.galvanizado = function () {
    var s = '';
    s += A.coil(22, 176, 18, 4, 1);
    s += '<path class="sh2" d="M48 158V190H86V158"/><rect x="49" y="166" width="36" height="23" class="wfill"/>' + n(1, 67, 148);
    // horno
    s += '<path class="sh2" d="M100 34h84v92h-84z"/>' + A.glow(142, 80, 44) + n(2, 198, 44);
    var d1 = 'M22 158Q40 162 48 172H88Q96 172 96 150V110H112V50H128V110H144V50H160V110H176';
    s += '<linearGradient id="gCG" gradientUnits="userSpaceOnUse" x1="96" x2="200" y1="0" y2="0"><stop offset="0" stop-color="#c9d3da"/><stop offset=".3" stop-color="#f26a1b"/><stop offset=".8" stop-color="#d9482b"/><stop offset="1" stop-color="#c46a55"/></linearGradient>';
    s += '<path d="' + d1 + '" class="st"/>' + '<path d="M96 120V110H112V50H128V110H144V50H160V110H176L214 176" fill="none" stroke="url(#gCG)" stroke-width="2.6" stroke-linejoin="round"/>';
    // tolva (snout) y paila
    s += '<path class="ln" d="M172 104L206 162M184 100L216 156"/>';
    s += '<path class="sh2" d="M192 152V204H262V152"/><rect x="193" y="160" width="68" height="43" class="zn" opacity=".85"/>' + A.roll(222, 184, 9, 1.4, -1);
    s += n(3, 180, 196) + t(228, 216, 'Paila de Zn 460 °C', {});
    // subida, cuchillas, torre
    var d2 = 'M229 190V32H262V172H330';
    s += '<path d="M214 176Q216 192 222 193Q230 193 229 184" fill="none" stroke="#c46a55" stroke-width="2.6"/>';
    s += '<path d="' + d2 + '" fill="none" stroke="#dff0f6" stroke-width="3" stroke-linejoin="round"/><path d="' + d2 + '" fill="none" stroke="#1b232b" stroke-opacity=".5" stroke-width="3" stroke-dasharray="1.5 14"><animate attributeName="stroke-dashoffset" from="0" to="-15.5" dur=".5s" repeatCount="indefinite"/></path>';
    s += '<path class="sh" d="M204 134h16l5 5-5 5h-16zM254 134h-16l-5 5 5 5h16z"/>' + A.flow('M220 139H228', 'gas', 0.3) + A.flow('M238 139H230', 'gas', 0.3, true) + n(4, 198, 122);
    s += A.roll(245.5, 32, 8, 1.4, 1) + '<path class="ln2" d="M218 60h8M218 84h8M218 108h8M266 60h8M266 84h8M266 108h8"/>' + A.flow('M210 72H224', 'gas', 0.5) + A.flow('M210 96H224', 'gas', 0.5) + n(5, 284, 44);
    s += A.stand(296, 172, 5, 9, 1) + n(6, 296, 132) + A.coil(338, 186, 16, 3, 1, '#dff0f6');
    s += t(8, 18, '1 Limpieza  2 Recocido (N₂-H₂)', { a: 'start', c: 'd' }) + t(8, 100, '3 Inmersión', { a: 'start', c: 'd' }) + t(8, 112, '4 Cuchillas', { a: 'start', c: 'd' }) + t(8, 124, '   de aire', { a: 'start', c: 'd' }) + t(8, 136, '5 Torre de', { a: 'start', c: 'd' }) + t(8, 148, '   enfriado', { a: 'start', c: 'd' });
    s += t(300, 60, '6 Temper,', { a: 'start', c: 'd' }) + t(300, 72, 'nivelado,', { a: 'start', c: 'd' }) + t(300, 84, 'pasivado', { a: 'start', c: 'd' });
    return A.svg(s);
  };
})();

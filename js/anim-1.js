/* Animaciones 1: materias primas, reducción y aceración */
(function () {
  var A = S.A, t = A.t, n = A.n;

  /* ---------- Minería y beneficio ---------- */
  S.anim.mineria = function () {
    var s = '';
    s += '<path class="sh2" d="M0 70H22V86H40V102H58V118H96V102H110V70H150V212H0z"/>';
    s += '<path class="ln" d="M74 110h12v6h-12zM86 112l12-8 6 6"/>';
    s += '<g><rect x="-8" y="-9" width="16" height="7" rx="1.5" fill="#ffc53d"/><circle cx="-4" cy="0" r="2.6" fill="#8fa2b1"/><circle cx="4" cy="0" r="2.6" fill="#8fa2b1"/>' +
      '<animateMotion path="M70 116 L100 100 L112 68 L150 68" dur="5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear"/></g>';
    s += n(1, 30, 56) + t(42, 59, 'Tajo abierto', { a: 'start' });
    // trituradora
    s += '<path class="sh" d="M150 70H198L186 102H162Z"/>';
    s += '<path d="M174 76L181 99H167Z" fill="#5b6c7a"><animateTransform attributeName="transform" type="translate" values="-2 0;2 0;-2 0" dur=".5s" repeatCount="indefinite"/></path>';
    s += A.dots('M156 62 L172 80 L174 104', 4, 1.6, '#b7b0a2', 2.6);
    s += n(2, 174, 54) + t(186, 57, 'Trituración', { a: 'start' });
    // banda a molino
    s += '<path class="ln" d="M174 106L214 128"/>' + A.dots('M174 104 L214 126', 4, 1.8, '#b7b0a2', 1.9);
    // molino de bolas
    s += '<rect class="sh" x="214" y="112" width="60" height="38" rx="8"/><path class="ln2" d="M208 131h6M274 131h8"/>';
    s += A.dots('M232 142 a12 9 0 1 1 24 0 a12 9 0 1 1 -24 0', 6, 1.4, '#c9d3da', 2.4);
    s += n(3, 222, 164) + t(234, 167, 'Molienda', { a: 'start' });
    s += A.flow('M244 88V110', 'wat', 0.7) + t(244, 84, 'agua', { c: 'b' });
    // separador magnético
    s += '<path class="sh2" d="M286 150h60v28h-60z"/>';
    s += A.roll(316, 150, 17, 2.4, 1);
    s += '<path d="M316 150l-9-9h18z" fill="#6aa3d8"/>' + t(316, 153, 'N S', { c: 'd' });
    s += '<path class="ln" d="M282 131h14l6 8"/>';
    s += A.dots('M284 131 H296 L301 140 A20 20 0 0 1 335 146 L342 196', 5, 2.6, '#c9653a', 2.3);
    s += A.dots('M286 131 H296 L300 150 L296 196', 4, 2.2, '#b7b0a2', 1.8);
    s += n(4, 290, 101) + t(354, 104, 'Separación', { a: 'end' }) + t(354, 115, 'magnética', { a: 'end' });
    s += '<path d="M326 206l16-14 16 14z" fill="#c9653a"/><path d="M280 206l16-10 16 10z" fill="#b7b0a2"/>';
    s += n(5, 248, 190) + t(260, 186, 'Jales', { a: 'start', c: 'd' }) + t(342, 216, 'Concentrado', { a: 'end' });
    s += t(74, 150, 'Mineral en tajo:', { c: 'd' }) + t(74, 162, '25–45 % Fe', { c: 'd' }) + t(190, 176, 'Concentrado:', { c: 'h' }) + t(190, 188, '65–68 % Fe', { c: 'h' });
    return A.svg(s);
  };

  /* ---------- Peletizado ---------- */
  S.anim.peletizado = function () {
    var s = '';
    // disco peletizador
    s += '<ellipse class="sh" cx="56" cy="96" rx="40" ry="30" transform="rotate(-18 56 96)"/>';
    s += '<g transform="rotate(-18 56 96)">' + A.dots('M26 100 a30 22 0 1 1 60 0 a30 22 0 1 1 -60 0', 9, 3, '#7f8f6f', 3) + '</g>';
    s += A.dots('M30 40 L48 78', 3, 1.2, '#c9653a', 1.8) + A.flow('M74 38L64 74', 'wat', 0.7);
    s += t(6, 34, 'Concentrado', { a: 'start' }) + t(6, 23, '+ bentonita', { a: 'start', c: 'd' }) + t(86, 34, 'agua', { c: 'b' });
    s += n(1, 14, 160) + t(26, 163, 'Disco: pélet verde', { a: 'start' });
    // parrilla móvil
    s += '<path class="ln" d="M112 136H336"/><path class="ln2" d="M112 144H336"/>' + A.roll(112, 140, 5, 2, 1) + A.roll(336, 140, 5, 2, 1);
    s += '<path class="sh2" d="M124 84h56v48h-56z"/><path class="sh2" d="M180 72h84v60h-84z"/><path class="sh2" d="M264 84h62v48h-62z"/>';
    s += A.flame(196, 100) + A.flame(214, 96, 1.2) + A.flame(232, 100) + A.flame(250, 96, 1.1) + A.glow(222, 118, 34);
    for (var i = 0; i < 9; i++) {
      var b = (-(8 * i / 9)).toFixed(2);
      s += '<circle r="4" cy="-4" fill="#7f8f6f"><animateMotion path="M100 136 H340" dur="8s" begin="' + b + 's" repeatCount="indefinite"/>' +
        '<animate attributeName="fill" values="#7f8f6f;#7f8f6f;#ffc53d;#f26a1b;#7a4a3e;#7a4a3e" keyTimes="0;.3;.42;.66;.85;1" dur="8s" begin="' + b + 's" repeatCount="indefinite"/></circle>';
    }
    s += A.flow('M92 112Q100 130 110 132', 'red', 1);
    s += t(152, 80, 'Secado', {}) + t(222, 66, 'Cocción 1 250–1 350 °C', { c: 'h' }) + t(296, 80, 'Enfriado', {});
    s += A.flow('M140 130V96', 'gas', 0.8) + A.flow('M164 130V96', 'gas', 0.8) + A.flow('M284 132V98', 'gas', 0.8) + A.flow('M306 132V98', 'gas', 0.8);
    s += n(2, 136, 166) + t(148, 169, 'Parrilla móvil: endurecimiento', { a: 'start' });
    s += '<path d="M306 206l18-22 18 22z" fill="#7a4a3e"/>' + A.dots('M340 140 Q346 160 326 186', 3, 1.5, '#7a4a3e', 3.2);
    s += n(3, 216, 196) + t(228, 199, 'Pélets 9–16 mm', { a: 'start' });
    return A.svg(s);
  };

  /* ---------- Coquización ---------- */
  S.anim.coque = function () {
    var s = '', xs = [40, 84, 128, 172];
    s += '<path class="ln" d="M20 50H250V40H20z"/>' + A.flow('M30 45H300', 'gas', 0.8);
    s += t(354, 30, 'Gas de coquería y subproductos', { a: 'end', c: 'b' });
    xs.forEach(function (x, i) {
      var b = (-(i * 3)).toFixed(1);
      s += '<rect x="' + x + '" y="70" width="28" height="90" class="sh2"/>';
      s += '<rect x="' + (x + 2) + '" y="74" width="24" height="84" fill="#20262c"><animate attributeName="fill" values="#20262c;#5a2a1c;#d9482b;#f58a2e;#20262c" keyTimes="0;.3;.6;.92;1" dur="12s" begin="' + b + 's" repeatCount="indefinite"/></rect>';
      s += '<rect x="' + (x + 30) + '" y="70" width="12" height="90" fill="#f26a1b" opacity=".75"><animate attributeName="opacity" values=".8;.45;.8" dur="1.8s" begin="' + (-i * 0.4) + 's" repeatCount="indefinite"/></rect>';
      s += A.dots('M' + (x + 14) + ' 70 V50', 2, 1.6, '#9fd0e8', 1.8);
    });
    s += '<rect x="28" y="70" width="12" height="90" fill="#f26a1b" opacity=".7"/>';
    s += '<path class="ln" d="M20 160H232V170H20z"/>';
    // carro de carga
    s += '<g><path d="M-12 -14h24l-6 12h-12z" fill="#3a4957" stroke="#8fa2b1"/><animateTransform attributeName="transform" type="translate" values="54 68;186 68;54 68" dur="12s" repeatCount="indefinite"/></g>';
    s += n(1, 14, 22) + t(26, 25, 'Carga por arriba', { a: 'start' });
    s += n(2, 22, 186) + t(34, 189, 'Hornos sin aire, 1 000–1 100 °C, 16–20 h', { a: 'start' });
    // empuje y apagado
    s += '<rect x="0" y="0" width="22" height="34" fill="url(#gHot)"><animateTransform attributeName="transform" type="translate" values="204 124;204 124;262 136;262 136" keyTimes="0;.55;.7;1" dur="6s" repeatCount="indefinite"/>' +
      '<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.56;.95;1" dur="6s" repeatCount="indefinite"/></rect>';
    s += '<path class="sh" d="M254 170h40l-4 -14h-32z"/><circle cx="262" cy="174" r="3.5" class="roll"/><circle cx="286" cy="174" r="3.5" class="roll"/><path class="ln2" d="M236 178H350"/>';
    s += '<path class="sh2" d="M306 178V96l10-22h20l10 22v82"/>';
    [0, 1, 2].forEach(function (k) {
      s += '<circle cx="' + (318 + k * 8) + '" cy="70" r="7" fill="#c9d3da" opacity="0"><animate attributeName="cy" values="72;40" dur="2.4s" begin="' + (-k * 0.8) + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.6;0" dur="2.4s" begin="' + (-k * 0.8) + 's" repeatCount="indefinite"/></circle>';
    });
    s += A.flow('M326 100V150', 'wat', 0.6);
    s += n(3, 246, 196) + t(258, 199, 'Empuje y apagado', { a: 'start' });
    s += t(326, 212, 'Coque', { c: 'h' });
    return A.svg(s);
  };

  /* ---------- Alto horno ---------- */
  S.anim['alto-horno'] = function () {
    var s = '', prof = 'M132 30L168 30L188 120L188 135L178 160L178 192L122 192L122 160L112 135L112 120Z';
    s += '<clipPath id="cBF"><path d="' + prof + '"/></clipPath>';
    var bands = '';
    for (var y = -16; y < 180; y += 16) bands += '<rect x="100" y="' + y + '" width="100" height="8" fill="#8a4b36"/><rect x="100" y="' + (y + 8) + '" width="100" height="8" fill="#39424b"/>';
    s += '<g clip-path="url(#cBF)"><g>' + bands + '<animateTransform attributeName="transform" type="translate" from="0 0" to="0 16" dur="2.4s" repeatCount="indefinite"/></g>' +
      '<rect x="100" y="126" width="100" height="70" fill="url(#gHot)" opacity=".8"><animate attributeName="opacity" values=".8;.6;.8" dur="1.5s" repeatCount="indefinite"/></rect>' +
      '<rect x="100" y="166" width="100" height="6" fill="#8d9ba6"/><rect x="100" y="172" width="100" height="24" fill="#ffc53d"/></g>';
    s += '<path class="ln" d="' + prof + '" stroke-width="2"/>';
    // carga
    s += '<path class="ln" d="M36 168L136 22"/>' + A.dots('M36 166 L134 24 L150 34', 5, 3.5, '#8a4b36', 2.4) + A.dots('M36 166 L134 24 L150 34', 5, 3.5, '#39424b', 2.4, 'transform="translate(5 3)"');
    s += n(1, 60, 100) + t(8, 30, 'Mineral, coque', { a: 'start' }) + t(8, 41, 'y fundentes', { a: 'start' });
    // gas de tragante
    s += '<path class="ln" d="M164 30L196 12H286V40"/>' + A.flow('M166 28L198 14H284V44', 'gas', 0.9);
    s += n(2, 214, 26) + t(226, 29, 'Gas de tragante', { a: 'start', c: 'b' });
    // estufa y viento caliente
    s += '<path class="sh2" d="M268 172V66q0-16 18-16t18 16V172z"/><path class="ln2" d="M276 76v88M286 70v94M296 76v88"/>' + A.glow(286, 130, 20);
    s += A.flow('M268 150H192', 'fire', 0.6) + A.flow('M92 150H110', 'fire', 0.6) + '<path class="ln" d="M268 146H190M268 154H190M88 146H110M88 154H110"/>';
    s += t(286, 186, 'Estufa', {}) + n(3, 222, 136) + t(224, 168, 'Viento caliente', { c: 'h' }) + t(224, 179, '1 100–1 250 °C', { c: 'h' });
    s += A.glow(172, 150, 12) + A.glow(128, 150, 12);
    // etiquetas internas
    s += t(150, 62, '200 °C', {}) + t(150, 104, 'Cuba', {}) + t(150, 150, '2 000 °C', { c: 'k' });
    // sangrado
    s += '<path class="hs" d="M178 186Q198 186 206 198"><animate attributeName="stroke-opacity" values="1;.7;1" dur=".5s" repeatCount="indefinite"/></path>';
    s += '<ellipse class="sh" cx="232" cy="204" rx="28" ry="9"/><circle cx="214" cy="214" r="3" class="roll"/><circle cx="250" cy="214" r="3" class="roll"/>';
    s += n(4, 270, 204) + t(282, 207, 'Arrabio 1 500 °C', { a: 'start', c: 'h' });
    s += '<path d="M122 170Q104 172 98 196" fill="none" stroke="#8d9ba6" stroke-width="3" stroke-linecap="round"/><path class="sh" d="M86 196h24l-4 14h-16z"/>';
    s += n(5, 72, 204) + t(62, 207, 'Escoria', { a: 'end' });
    return A.svg(s);
  };

  /* ---------- Reducción directa ---------- */
  S.anim['reduccion-directa'] = function () {
    var s = '', v = 'M92 34H128L134 54V132L120 172H100L86 132V54Z';
    s += '<path class="sh2" d="' + v + '"/>';
    for (var i = 0; i < 10; i++) {
      var b = (-(9 * i / 10)).toFixed(2), x = 98 + (i * 7) % 26;
      s += '<circle r="3.2" fill="#8a4b36"><animateMotion path="M' + x + ' 30 V168" dur="9s" begin="' + b + 's" repeatCount="indefinite"/>' +
        '<animate attributeName="fill" values="#8a4b36;#8a4b36;#f26a1b;#c9d3da" keyTimes="0;.25;.6;1" dur="9s" begin="' + b + 's" repeatCount="indefinite"/></circle>';
    }
    s += '<path class="ln" d="M96 14h28l-6 18h-16z"/>' + n(1, 62, 22) + t(110, 10, 'Pélets / mineral en trozo', {});
    // lazo de gas
    s += '<path class="sh" d="M214 96h58v40h-58z"/>' + t(243, 113, 'Calentador /', {}) + t(243, 124, 'reformador', {});
    s += A.flow('M214 122H136', 'red', 0.7) + '<path class="ln2" d="M214 118H134M214 126H134"/>';
    s += n(2, 176, 106) + t(140, 152, 'H₂ + CO, 930–1 050 °C', { a: 'start', c: 'g' });
    s += A.flow('M130 44H296V58', 'gas', 0.9) + '<path class="sh" d="M270 58h54v24h-54z"/>' + t(297, 73, 'Lavado y CO₂', {});
    s += A.flow('M297 82V116H274', 'gas', 0.9);
    s += n(3, 200, 30) + t(212, 33, 'Gas de tope (H₂O, CO₂)', { a: 'start', c: 'b' });
    s += A.flow('M352 128H274', 'red', 0.8, true) + t(354, 146, 'Gas natural / H₂', { a: 'end', c: 'g' });
    // descarga
    s += '<path class="hs2" d="M110 174V196H170"><animate attributeName="stroke-opacity" values="1;.6;1" dur=".8s" repeatCount="indefinite"/></path>' + A.arrow(170, 196, 186, 196, '#f26a1b');
    s += n(4, 92, 196) + t(192, 192, 'HRD 600 °C a horno eléctrico', { a: 'start', c: 'h' }) + t(192, 204, 'o briquetas HBI', { a: 'start', c: 'd' });
    s += t(52, 96, 'Reactor', {}) + t(52, 108, 'de cuba', {});
    return A.svg(s);
  };

  /* ---------- Convertidor BOF ---------- */
  S.anim.bof = function () {
    var s = '', D = 12;
    s += '<path class="ln2" d="M146 18H214L204 52H156Z"/>' + t(238, 30, 'Campana', { a: 'start', c: 'd' });
    // cuchara de arrabio (fase 1)
    s += A.phase('<g transform="rotate(28 96 52)"><path class="sh" d="M78 34h36l-5 34H83z"/><rect x="82" y="38" width="28" height="14" fill="#ffc53d"/></g>' +
      '<path class="hs" d="M118 50Q160 44 176 84"><animate attributeName="stroke-opacity" values="1;.6;1" dur=".4s" repeatCount="indefinite"/></path>', D, [[0.03, 0.2]]);
    // convertidor (gira en el vaciado)
    s += '<g><path class="sh2" d="M160 70L200 70L214 100L214 150Q214 172 180 172Q146 172 146 150L146 100Z" stroke-width="2"/>' +
      '<path d="M148 150Q148 170 180 170Q212 170 212 150Z" fill="#8d9ba6"/>' +
      '<rect x="148" y="150" width="64" height="0" fill="url(#gHot)"><animate attributeName="y" values="150;150;122;122;150;150" keyTimes="0;.04;.2;.8;.93;1" dur="' + D + 's" repeatCount="indefinite"/><animate attributeName="height" values="0;0;30;30;0;0" keyTimes="0;.04;.2;.8;.93;1" dur="' + D + 's" repeatCount="indefinite"/></rect>' +
      '<circle cx="180" cy="120" r="5" class="roll"/>' +
      '<animateTransform attributeName="transform" type="rotate" values="0 180 120;0 180 120;82 180 120;82 180 120;0 180 120" keyTimes="0;.72;.78;.93;1" dur="' + D + 's" repeatCount="indefinite"/></g>';
    // lanza de oxígeno (fase 2)
    s += '<g><rect x="177.5" y="-70" width="5" height="170" fill="#8fd3ff" stroke="#1b232b" stroke-width=".6"/>' +
      '<animateTransform attributeName="transform" type="translate" values="0 -70;0 -70;0 0;0 0;0 -70;0 -70" keyTimes="0;.2;.26;.66;.71;1" dur="' + D + 's" repeatCount="indefinite"/></g>';
    s += A.phase(A.blink('<path d="M180 102l-9 18M180 102v20M180 102l9 18" stroke="#8fd3ff" stroke-width="1.6" fill="none"/>', 0.3) +
      A.dots('M170 66 Q160 40 172 22', 3, 1.3, '#f58a2e', 2) + A.dots('M190 66 Q200 42 188 22', 3, 1.5, '#ffc53d', 1.8) + A.glow(180, 126, 26), D, [[0.27, 0.66]]);
    // vaciado (fase 3)
    s += A.phase('<path class="hs" d="M231 112Q247 128 247 178"><animate attributeName="stroke-opacity" values="1;.6;1" dur=".4s" repeatCount="indefinite"/></path>', D, [[0.79, 0.92]]);
    s += '<path class="sh" d="M228 172h38l-5 36h-28z"/><rect x="232" y="186" width="30" height="20" fill="#ffc53d" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.8;.92;.98;1" dur="' + D + 's" repeatCount="indefinite"/></rect>';
    s += t(300, 196, 'Cucharón', { c: 'd' });
    // rótulos de fase
    s += A.phase(n(1, 22, 196) + t(34, 199, 'Carga: chatarra + arrabio líquido', { a: 'start' }), D, [[0, 0.2]]);
    s += A.phase(n(2, 22, 196) + t(34, 199, 'Soplado de O₂: 15–20 min', { a: 'start' }), D, [[0.2, 0.72]]);
    s += A.phase(n(3, 22, 196) + t(34, 199, 'Vaciado', { a: 'start' }), D, [[0.72, 1]]);
    s += t(64, 110, 'C: 4.5 % → 0.05 %', { c: 'h' }) + t(64, 122, '1 650 °C', { c: 'h' }) + t(306, 80, 'Lanza de O₂', { c: 'b' }) + t(306, 92, 'supersónica', { c: 'b' });
    return A.svg(s);
  };

  /* ---------- Horno de arco eléctrico ---------- */
  S.anim.eaf = function () {
    var s = '', D = 12;
    s += '<path class="sh2" d="M104 104H252V150Q252 176 178 176Q104 176 104 150Z" stroke-width="2"/>';
    s += '<clipPath id="cE"><path d="M106 104H250V150Q250 174 178 174Q106 174 106 150Z"/></clipPath>';
    s += '<g clip-path="url(#cE)"><rect x="100" y="172" width="160" height="6" fill="url(#gHot)"><animate attributeName="y" values="172;172;146;146;172" keyTimes="0;.08;.55;.84;.97" dur="' + D + 's" repeatCount="indefinite"/><animate attributeName="height" values="4;4;32;32;4" keyTimes="0;.08;.55;.84;.97" dur="' + D + 's" repeatCount="indefinite"/></rect>' +
      '<rect x="100" y="140" width="160" height="6" fill="#b7b0a2" opacity="0"><animate attributeName="opacity" values="0;0;.9;.9;0" keyTimes="0;.5;.58;.84;.9" dur="' + D + 's" repeatCount="indefinite"/></rect>' +
      '<path d="M108 172L118 126L132 140L146 116L160 138L176 112L192 136L206 118L220 138L236 122L248 172Z" fill="#5b6c7a" stroke="#8fa2b1"><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.1;.5;.97;1" dur="' + D + 's" repeatCount="indefinite"/>' +
      '<animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 40;0 40;0 0" keyTimes="0;.1;.5;.97;1" dur="' + D + 's" repeatCount="indefinite"/></path></g>';
    s += '<path class="ln" d="M100 104Q178 74 256 104" stroke-width="2"/>';
    // electrodos
    var el = '';
    [152, 178, 204].forEach(function (x) { el += '<rect x="' + (x - 4.5) + '" y="6" width="9" height="104" fill="#4a5560" stroke="#b7c5d0"/>'; });
    el += '<path class="ln" d="M152 22H300M178 14H300M204 30H300"/>';
    s += '<g>' + el + '<animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 28;0 28;0 0" keyTimes="0;.08;.5;.84;.9" dur="' + D + 's" repeatCount="indefinite"/></g>';
    var arcs = '';
    [152, 178, 204].forEach(function (x, i) { arcs += A.blink('<path d="M' + x + ' 0l-4 5 6 3-5 6 4 4" stroke="#fff3d6" stroke-width="1.8" fill="none"/>', 0.25 + i * 0.07) + A.glow(x, 8, 14); });
    s += A.phase('<g>' + arcs + '<animateTransform attributeName="transform" type="translate" values="0 112;0 112;0 138;0 138" keyTimes="0;.08;.5;1" dur="' + D + 's" repeatCount="indefinite"/></g>', D, [[0.06, 0.82]]);
    s += '<path class="sh" d="M300 6h44v36h-44z"/>' + t(322, 22, 'Trans-', {}) + t(322, 33, 'formador', {});
    // inyección
    s += A.phase(A.flow('M70 120L118 150', 'o2', 0.5) + t(40, 112, 'O₂ + C', { c: 'b', a: 'start' }), D, [[0.5, 0.82]]);
    // vaciado por EBT
    s += '<path class="sh" d="M242 186h40l-5 30h-30z"/>';
    s += A.phase('<path class="hs" d="M250 172Q262 176 262 194"><animate attributeName="stroke-opacity" values="1;.6;1" dur=".4s" repeatCount="indefinite"/></path>', D, [[0.85, 0.96]]);
    s += '<rect x="246" y="198" width="32" height="16" fill="#ffc53d" opacity="0"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.85;.96;.99;1" dur="' + D + 's" repeatCount="indefinite"/></rect>';
    s += A.phase(n(1, 16, 196) + t(28, 199, 'Fusión de chatarra / HRD', { a: 'start' }), D, [[0, 0.5]]);
    s += A.phase(n(2, 16, 196) + t(28, 199, 'Afino: O₂, carbono, escoria espumosa', { a: 'start' }), D, [[0.5, 0.84]]);
    s += A.phase(n(3, 16, 196) + t(28, 199, 'Vaciado excéntrico (EBT)', { a: 'start' }), D, [[0.84, 1]]);
    s += t(58, 60, 'Electrodos', {}) + t(58, 71, 'de grafito', {}) + A.arrow(84, 62, 144, 50) + t(310, 120, 'Arco', { c: 'h' }) + t(310, 131, '> 3 000 °C', { c: 'h' }) + t(310, 160, 'Acero 1 620 °C', { c: 'h' });
    return A.svg(s);
  };

  /* ---------- Metalurgia secundaria ---------- */
  S.anim['metalurgia-secundaria'] = function () {
    var s = '';
    // Horno olla
    s += '<path class="sh2" d="M36 96H128L120 190H44Z" stroke-width="2"/><path d="M40 112H124L119 188H45Z" fill="url(#gHot)"/><rect x="40" y="106" width="84" height="7" fill="#8d9ba6"/>';
    s += '<path class="ln" d="M30 94Q82 78 134 94" stroke-width="2"/>';
    [68, 82, 96].forEach(function (x, i) { s += '<rect x="' + (x - 3) + '" y="30" width="6" height="80" fill="#4a5560" stroke="#b7c5d0"/>' + A.blink('<circle cx="' + x + '" cy="112" r="4" fill="#fff3d6"/>', 0.3 + i * 0.08); });
    s += A.dots('M82 188 Q74 160 84 140 Q90 126 80 114', 5, 2.2, '#dff3ff', 2) + A.flow('M82 206V190', 'gas', 0.6) + t(82, 216, 'Argón', { c: 'b' });
    s += '<path class="ln" d="M112 44h22l-6 16h-10z"/>' + A.dots('M123 60 L116 110', 3, 1.4, '#c9d3da', 1.8) + t(134, 40, 'Ferroaleaciones', { a: 'start', c: 'd' });
    s += n(1, 22, 22) + t(34, 25, 'Horno olla (LF)', { a: 'start' });
    s += t(82, 164, '1 580–1 620 °C', { c: 'k' });
    // RH
    s += '<path class="sh2" d="M214 136H316L308 204H222Z" stroke-width="2"/><path d="M218 148H312L306 202H224Z" fill="url(#gHot)"/>';
    s += '<path class="sh2" d="M236 34H294V104H284V164H274V104H256V164H246V104H236Z" stroke-width="2"/><rect x="238" y="84" width="54" height="19" fill="#ffc53d"/>';
    s += A.dots('M251 172 V92 H279 V172 Q265 196 251 172', 8, 3.4, '#fff3d6', 2.4);
    s += A.flow('M294 52H346', 'gas', 0.7) + t(354, 44, 'Vacío', { a: 'end', c: 'b' }) + t(354, 66, '< 1 mbar', { a: 'end', c: 'b' });
    s += A.flow('M204 150H246', 'gas', 0.6) + t(200, 142, 'Ar', { c: 'b', a: 'end' });
    s += A.dots('M265 80 V56 H292', 4, 1.6, '#9fd0e8', 1.6);
    s += n(2, 172, 22) + t(184, 25, 'Desgasificador RH', { a: 'start' });
    s += t(180, 180, 'H₂, N₂, C', { c: 'd' }) + t(180, 192, 'salen al vacío', { c: 'd' });
    return A.svg(s);
  };
})();

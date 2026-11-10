/* Grados de galvanizado: amplía las fichas de A653, A792, EN 10346 y JIS G 3302,
   agrega normas afines y una guía completa de grados y recubrimientos.
   Valores mínimos de norma salvo donde se indica «típico». Rige la edición vigente. */
(function () {
  function norma(id) { for (var i = 0; i < S.normas.length; i++) if (S.normas[i].id === id) return S.normas[i]; return null; }
  function tabla(head, rows) {
    return '<div class="scroll"><table class="tb"><tr>' + head.map(function (h, i) { return '<th' + (i ? ' class="n"' : '') + '>' + h + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i ? ' class="n"' : '') + '>' + (i ? c : '<b>' + c + '</b>') + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>';
  }
  function tablaTxt(head, rows) {
    return '<div class="scroll"><table class="tb"><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td>' + (i ? c : '<b>' + c + '</b>') + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>';
  }

  /* ---------- Tablas base ---------- */
  var FORMADO = tabla(['Designación', 'Fy típico, MPa', 'Elong. %', 'C máx. %'], [
    ['CS tipo A', '170–380', '≥ 20', '0.10'], ['CS tipo B', '170–380', '≥ 20', '0.02–0.15'], ['CS tipo C', '170–410', '≥ 15', '0.08'],
    ['FS tipo A', '170–310', '≥ 26', '0.10'], ['FS tipo B', '170–310', '≥ 26', '0.02–0.10'],
    ['DDS tipo A', '140–240', '≥ 32', '0.06'], ['DDS tipo C', '170–280', '≥ 32', '0.02'], ['EDDS', '105–170', '≥ 40', '0.02']]);
  var SS = tabla(['Grado [métrico]', 'Fy, MPa', 'Rm, MPa', 'Elong. %'], [
    ['33 [230]', '230', '310', '20'], ['37 [255]', '255', '360', '18'], ['40 [275]', '275', '380', '16'],
    ['50 [340] clase 1', '340', '450', '12'], ['50 [340] clase 2', '340', '—', '12'], ['50 [340] clase 3', '340', '480', '12'], ['50 [340] clase 4', '340', '410', '12'],
    ['55 [380]', '380', '480', '11'], ['60 [410]', '410', '480', '10'], ['70 [480]', '480', '550', '9'], ['80 [550] clases 1 a 3', '550', '570', '—']]);
  var HSLAS = tabla(['Grado [métrico]', 'Fy, MPa', 'Rm, MPa', 'Elong. %'], [
    ['40 [275]', '275', '340', '22'], ['50 [340]', '340', '410', '20'], ['55 [380] clase 1', '380', '480', '16'], ['55 [380] clase 2', '380', '450', '18'],
    ['60 [410]', '410', '480', '16'], ['70 [480]', '480', '550', '12'], ['80 [550]', '550', '620', '10']]);
  var CAPA = tablaTxt(['Pulgada-libra', 'Métrico', 'g/m² total', 'µm por cara', 'Uso típico'], [
    ['G30', 'Z90', '90', '6', 'Interiores secos, piezas que se pintan'],
    ['G40', 'Z120', '120', '8', 'Perfiles no estructurales para muros interiores, ductos interiores'],
    ['G60', 'Z180', '180', '13', 'Ductos, perfiles estructurales ligeros, autopartes'],
    ['G90', 'Z275', '275', '19', 'Techos, muros, polines: el estándar para exteriores'],
    ['G100', 'Z305', '305', '21', ''],
    ['G115', 'Z350', '350', '25', 'Exteriores de mayor vida'],
    ['G140', 'Z450', '450', '32', ''],
    ['G165', 'Z500', '500', '35', ''],
    ['G185', 'Z550', '550', '39', 'Ambiente agrícola o costero, drenaje'],
    ['G210', 'Z600', '600', '42', 'Silos, alcantarillas'],
    ['G235', 'Z700', '700', '49', ''],
    ['G300', 'Z900', '900', '63', 'Especiales, solo en espesores gruesos'],
    ['G360', 'Z1100', '1 100', '77', '']]);
  var GA = tablaTxt(['Pulgada-libra', 'Métrico', 'g/m² total'], [['A25', 'ZF75', '75'], ['A40', 'ZF120', '120'], ['A60', 'ZF180', '180']]);

  /* ---------- ASTM A653 ---------- */
  var a = norma('astm-a653');
  if (a) {
    a.gr = [];
    a.cl = ['Tres decisiones definen el producto: designación del acero, peso de recubrimiento y acabado.', 'Si no se indica el tipo de CS, se surte tipo B. Si no se indica la clase de SS grado 50, clase 1.', 'En CS, FS, DDS y EDDS las propiedades son típicas, no obligatorias: se compra por formabilidad. En SS y HSLAS son mínimos garantizados.', 'El grado 80 es lámina cruda, sin recocer: muy resistente y poco dúctil. Sirve para lámina acanalada, no para dobleces cerrados.'];
    a.x = '<h3>Calidades de formado</h3>' + FORMADO + '<p class="small">CS: comercial. FS: formado. DDS: embutido profundo. EDDS: embutido extra profundo, acero IF. El tipo C de CS admite fósforo hasta 0.10 %.</p>' +
      '<h3>Estructurales (SS)</h3>' + SS + '<p class="small">El grado es el límite elástico en ksi. Las cuatro clases del grado 50 difieren en la resistencia a la tensión; las tres del grado 80, en la química.</p>' +
      '<h3>Alta resistencia baja aleación (HSLAS)</h3>' + HSLAS + '<p class="small">HSLAS-F: mismas resistencias con unos dos puntos más de elongación, por control de inclusiones.</p>' +
      '<h3>Endurecidos por solución y al horneado</h3><p>SHS y BHS en grados 26, 31, 35, 41 y 44: límite elástico mínimo de 180, 210, 240, 280 y 300 MPa. El BHS gana resistencia adicional al hornear la pintura.</p>' +
      '<h3>Recubrimiento de zinc</h3>' + CAPA + '<p class="small">Peso mínimo promedio de la prueba de triple punto, sumando ambas caras. G01 [Z001] no tiene mínimo. Regla: µm por cara ≈ g/m² totales ÷ 14.3.</p>' +
      '<h3>Galvanneal (zinc-hierro)</h3>' + GA +
      '<h3>Acabado y tratamiento</h3>' + S.ul(['<b>Flor regular:</b> cristales de zinc visibles.', '<b>Flor minimizada:</b> cristales pequeños; normal en G90 y menores.', '<b>Extra lisa:</b> flor minimizada con temper; para pintar o superficies expuestas.', '<b>Tratamiento:</b> pasivado (tratamiento químico), aceitado, ambos, fosfatizado o seco.']) +
      '<h3>Ejemplo de pedido</h3><div class="rx" style="white-space:normal">ASTM A653, SS grado 50 clase 1, G90, flor minimizada, pasivada, 0.91 mm × 1 219 mm, en rollo</div>';
  }

  /* ---------- ASTM A792 ---------- */
  var b = norma('astm-a792');
  if (b) {
    b.gr = [];
    b.x = '<h3>Designaciones del acero</h3>' + tabla(['Designación', 'Fy, MPa', 'Rm, MPa', 'Elong. %'], [
      ['CS tipos A, B, C', '205–410 típico', '—', '≥ 20'], ['FS', '170–275 típico', '—', '≥ 24'], ['DS', '140–240 típico', '—', '≥ 30'],
      ['SS 33 [230]', '230', '310', '20'], ['SS 37 [255]', '255', '360', '18'], ['SS 40 [275]', '275', '380', '16'],
      ['SS 50 [340] clase 1', '340', '450', '12'], ['SS 50 [340] clase 2', '340', '—', '12'], ['SS 50 [340] clase 4', '340', '410', '12'],
      ['SS 60 [410]', '410', '480', '10'], ['SS 70 [480]', '480', '550', '9'], ['SS 80 [550]', '550', '570', '—']]) +
      '<h3>Recubrimiento aluminio-zinc</h3>' + tablaTxt(['Pulgada-libra', 'Métrico', 'g/m² total', 'µm por cara', 'Uso típico'], [
        ['AZ30', 'AZM100', '100', '13', 'Interiores, piezas que se pintan'], ['AZ35', 'AZM110', '110', '15', 'Base para prepintado'], ['AZ50', 'AZM150', '150', '20', 'Base para prepintado y techos'], ['AZ55', 'AZM165', '165', '22', 'Techos y muros sin pintar'], ['AZ60', 'AZM180', '180', '24', 'Mayor vida a la intemperie']]) +
      '<p class="small">La aleación pesa la mitad que el zinc (3.75 g/cm³): con menos gramos da el mismo espesor. Por eso AZ50 y G90 tienen capas de espesor similar.</p>';
  }

  /* ---------- EN 10346 ---------- */
  var e = norma('en-en-10346');
  if (e) {
    e.gr = [];
    e.x = '<h3>Bajo carbono para conformar en frío</h3>' + tabla(['Grado', 'Re, MPa', 'Rm, MPa', 'A80 %'], [
      ['DX51D', '—', '270–500', '≥ 22'], ['DX52D', '140–300', '270–420', '≥ 26'], ['DX53D', '140–260', '270–380', '≥ 30'],
      ['DX54D', '120–220', '260–350', '≥ 36'], ['DX56D', '120–180', '260–350', '≥ 39'], ['DX57D', '120–170', '260–350', '≥ 41']]) +
      '<h3>Estructurales</h3>' + tabla(['Grado', 'Re mín., MPa', 'Rm mín., MPa', 'A80 %'], [
        ['S220GD', '220', '300', '20'], ['S250GD', '250', '330', '19'], ['S280GD', '280', '360', '18'], ['S320GD', '320', '390', '17'],
        ['S350GD', '350', '420', '16'], ['S390GD', '390', '460', '16'], ['S420GD', '420', '480', '15'], ['S450GD', '450', '510', '14'], ['S550GD', '550', '560', '—']]) +
      '<h3>Alto límite elástico para conformar en frío</h3>' + tabla(['Grado', 'Re, MPa', 'Rm, MPa'], [
        ['HX260LAD', '260–330', '350–430'], ['HX300LAD', '300–380', '380–480'], ['HX340LAD', '340–420', '410–510'],
        ['HX380LAD', '380–480', '440–560'], ['HX420LAD', '420–520', '470–590'], ['HX460LAD', '460–560', '500–640'], ['HX500LAD', '500–620', '530–690']]) +
      '<p class="small">LAD: microaleado. También hay grados YD (IF de alta resistencia), BD (endurecibles al horneado) y multifase HCT: X doble fase, T TRIP, C fase compleja.</p>' +
      '<h3>Recubrimientos</h3>' + tablaTxt(['Símbolo', 'Recubrimiento', 'Masas habituales, g/m² ambas caras'], [
        ['+Z', 'Zinc', '100, 140, 200, 225, 275, 350, 450, 600'], ['+ZF', 'Zinc-hierro (galvanneal)', '100, 120, 140'], ['+ZA', 'Zinc-5 % aluminio', '95 a 300'],
        ['+ZM', 'Zinc-magnesio-aluminio', '60 a 300'], ['+AZ', 'Aluminio-zinc 55 %', '100, 150, 185'], ['+AS', 'Aluminio-silicio', '60 a 150']]) +
      '<h3>Acabado, calidad y tratamiento</h3>' + S.ul(['<b>Acabado:</b> N flor normal, M flor minimizada.', '<b>Calidad superficial:</b> A normal, B mejorada, C la mejor (expuesta).', '<b>Tratamiento:</b> C pasivado, O aceitado, CO ambos, P fosfatado, S sellado, U sin tratar.']) +
      '<h3>Ejemplo de pedido</h3><div class="rx" style="white-space:normal">EN 10346, S350GD+Z275-M-A-C: estructural de 350 MPa, 275 g/m² de zinc, flor minimizada, calidad A, pasivado</div>';
  }

  /* ---------- JIS G 3302 ---------- */
  var j = norma('jis-g-3302');
  if (j) {
    j.gr = [];
    j.x = '<h3>Sobre base laminada en frío</h3>' + tabla(['Grado', 'Fy mín., MPa', 'Rm mín., MPa', 'Uso'], [
      ['SGCC', '205', '270', 'Comercial'], ['SGCH', '—', '—', 'Crudo, sin recocer'], ['SGCD1', '—', '270', 'Embutido'], ['SGCD2', '—', '270', 'Embutido'],
      ['SGCD3', '—', '270', 'Embutido profundo'], ['SGCD4', '—', '270', 'Extra profundo, no envejece'],
      ['SGC340', '245', '340', 'Estructural'], ['SGC400', '295', '400', 'Estructural'], ['SGC440', '335', '440', 'Estructural'], ['SGC490', '365', '490', 'Estructural'], ['SGC570', '560', '570', 'Estructural']]) +
      '<h3>Sobre base laminada en caliente</h3><p>SGHC (comercial) y SGH340, SGH400, SGH440, SGH490, SGH540 (estructurales, con la misma lógica de resistencia).</p>' +
      '<h3>Recubrimiento</h3><p>La cifra por 10 da los gramos por m² en ambas caras: Z08 = 80, Z12 = 120, Z18 = 180, Z22 = 220, Z25 = 250, Z27 = 275, Z35 = 350, Z45 = 450, Z60 = 600. Galvanneal: F04 a F18.</p>' +
      '<p class="small">JIS G 3321 usa el mismo esquema para aluminio-zinc 55 % (SGLCC, AZ70 a AZ185) y G 3312 para prepintado (CGCC).</p>';
  }

  /* ---------- Normas afines ---------- */
  var L = 'Lámina y recubiertos';
  function N(org, cod, t, alc, cl, usos, eq, x) {
    S.normas.push({ id: (org + '-' + cod).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), org: org, cod: cod, t: t, cat: L, alc: alc, gr: [], cl: cl, usos: usos, eq: eq, x: x || '' });
  }
  N('ASTM', 'A1046', 'Lámina con recubrimiento zinc-aluminio-magnesio', 'Recubrimiento por inmersión en caliente de zinc con aluminio y magnesio.',
    ['Los productos de corrosión con magnesio sellan rayones y cantos cortados.', 'Da protección comparable a un galvanizado más pesado: permite bajar el peso de capa.', 'Las designaciones del acero (CS, SS, HSLAS) siguen el esquema de A653.'],
    'Estructuras para paneles solares, perfiles agrícolas, postes, construcción en ambiente agresivo.', 'EN 10346 (+ZM)');
  N('ASTM', 'A1079', 'Lámina recubierta de aceros multifase', 'Aceros de fase compleja (CP), doble fase (DP), TRIP y martensíticos (MS), galvanizados o galvanneal.',
    ['El grado se nombra por tipo y resistencia: mínimo de tensión y de fluencia.', 'Son los AHSS automotrices en versión recubierta.'],
    'Refuerzos, pilares y largueros de carrocería.', 'EN 10346 (grados HCT)');
  N('ASTM', 'A879', 'Lámina electrogalvanizada', 'Zinc depositado por electrólisis, en frío, sobre lámina laminada en frío.',
    ['Capa delgada, uniforme y sin flor: superficie ideal para pintar.', 'El peso se indica por cara, en g/m²: 70G70G es 70 g/m² en cada cara. Admite caras distintas o una sola cara.', 'Menor protección que el galvanizado por inmersión: capas de 3 a 13 µm por cara.'],
    'Paneles exteriores automotrices, gabinetes, línea blanca, equipo electrónico.', 'EN 10152; JIS G 3313');

  /* ---------- Guía ---------- */
  S.sistemas.unshift({ id: 'galv', t: 'Galvanizado: grados y recubrimientos', h:
    '<p class="lead">Una lámina galvanizada se define con cinco datos: norma, designación del acero, peso de recubrimiento, acabado y tratamiento superficial.</p>' +
    '<h3>Equivalencias aproximadas del acero base</h3>' + tablaTxt(['ASTM A653', 'EN 10346', 'JIS G 3302', 'Calidad'], [
      ['CS tipo B', 'DX51D', 'SGCC', 'Comercial'], ['FS', 'DX52D', 'SGCD1', 'Formado'], ['DDS', 'DX53D, DX54D', 'SGCD2, SGCD3', 'Embutido profundo'], ['EDDS', 'DX56D, DX57D', 'SGCD4', 'Extra profundo'],
      ['SS 33', 'S220GD', '—', 'Estructural 230 MPa'], ['SS 37', 'S250GD', 'SGC340', 'Estructural 250 MPa'], ['SS 40', 'S280GD', 'SGC400', 'Estructural 275–295 MPa'],
      ['SS 50', 'S350GD', 'SGC440, SGC490', 'Estructural 340–365 MPa'], ['SS 80', 'S550GD', 'SGC570, SGCH', 'Crudo 550 MPa']]) +
    '<p class="small">Nunca sustituyas sin comparar química, propiedades y recubrimiento de ambas normas.</p>' +
    '<h3>ASTM A653: calidades de formado</h3>' + FORMADO +
    '<h3>ASTM A653: estructurales (SS)</h3>' + SS +
    '<h3>ASTM A653: HSLAS</h3>' + HSLAS +
    '<h3>Peso de recubrimiento</h3>' + CAPA + '<p class="small">Total en ambas caras, promedio de triple punto. µm por cara ≈ g/m² totales ÷ 14.3.</p>' +
    '<h3>Galvanneal</h3>' + GA + '<p>Capa de zinc-hierro con ≈ 10 % Fe: gris mate, sin flor. Suelda por puntos y recibe pintura mejor que el zinc puro; se usa sobre todo en carrocerías.</p>' +
    '<h3>Qué grado pedir</h3>' + tablaTxt(['Producto', 'Acero', 'Recubrimiento'], [
      ['Lámina acanalada para techo y muro', 'SS grado 80 o grado 50', 'G90, o Al-Zn AZ50 / AZ55'],
      ['Polín C y Z', 'SS grado 50 clase 1', 'G60 o G90'],
      ['Losacero', 'SS grado 37 a 50', 'G60 o G90'],
      ['Perfil estructural ligero', 'SS grado 33 o 50', 'G60 mínimo'],
      ['Perfil para muros interiores', 'SS grado 33', 'G40'],
      ['Ductos de aire', 'CS o FS', 'G60 o G90'],
      ['Piezas embutidas, línea blanca', 'DDS o EDDS', 'G30 a G60'],
      ['Carrocería', 'DDS, EDDS, BHS, HSLAS', 'Galvanneal A40 / A60 o G60'],
      ['Base para prepintado', 'CS o SS', 'G60 / G90, o AZ35 / AZ50']]) +
    '<p class="small">Combinaciones habituales del mercado. El proyecto o el cliente fijan el requisito.</p>' +
    '<h3>Vida del recubrimiento</h3>' + S.ul(['Es proporcional al peso de capa: G90 dura cerca de 50 % más que G60 en el mismo ambiente.', 'El primer enemigo es el óxido blanco: aparece si el rollo o el paquete se moja y no ventila. Lo previenen el pasivado y el almacenaje seco.', 'En cortes y rayones el zinc se sacrifica y protege al acero expuesto, hasta ≈ 1–2 mm de separación.']) +
    '<h3>Otros recubrimientos</h3>' + S.ul(['<b>Aluminio-zinc 55 %</b> (ASTM A792): AZ50 y AZ55. Más vida en techos; protege menos los cantos.', '<b>Zinc-aluminio-magnesio</b> (ASTM A1046): sella cantos y rayones.', '<b>Electrogalvanizado</b> (ASTM A879): capa delgada por cara, para pintar.', '<b>Aluminizado</b> (ASTM A463): para calor.', '<b>Galvanizado de piezas fabricadas</b> (ASTM A123): por inmersión después de fabricar; 45 a 100 µm, mucho más grueso que el continuo.'])
  });
})();

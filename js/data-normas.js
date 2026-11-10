/* Normas y usos. Valores mínimos típicos de cada norma; siempre rige la edición vigente del documento oficial. */
S.orgs = [
  { id: 'ASTM', n: 'ASTM International', d: 'Estados Unidos. La referencia en América. Las normas de acero llevan la letra A; las de ensayos, la E.' },
  { id: 'SAE', n: 'SAE / AISI', d: 'Sistema de cuatro dígitos para composición química de aceros al carbono y aleados (SAE J403, J404).' },
  { id: 'API', n: 'American Petroleum Institute', d: 'Tubería de línea (5L), tubería para pozos (5CT) y equipo petrolero.' },
  { id: 'ASME', n: 'ASME', d: 'Código de calderas y recipientes a presión. Sus materiales SA son normas ASTM adoptadas.' },
  { id: 'AWS', n: 'American Welding Society', d: 'Códigos de soldadura estructural (D1.1) y clasificación de electrodos.' },
  { id: 'EN', n: 'Normas europeas (EN)', d: 'Comité Europeo de Normalización. Reemplazaron a DIN, BS, NF y UNI nacionales.' },
  { id: 'JIS', n: 'Japanese Industrial Standards', d: 'Japón; muy usadas en Asia y en la cadena automotriz japonesa. Serie G para acero.' },
  { id: 'NMX', n: 'Normas mexicanas (NMX-B)', d: 'Las elabora CANACERO a través de su comité de normalización. Son voluntarias salvo que un reglamento o contrato las cite.' },
  { id: 'ISO', n: 'ISO', d: 'Normas internacionales de producto, ensayo y sistemas de gestión.' },
  { id: 'GB', n: 'GB (China)', d: 'Normas nacionales chinas. Q235 y Q355 son los estructurales de mayor volumen del mundo.' }
];

S.sistemas = [
  { t: 'SAE / AISI: cuatro dígitos', h: '<p>Los dos primeros dígitos indican la familia; los dos últimos, el carbono en centésimas de porcentaje. Un 1045 es acero al carbono con 0.45 % C.</p>' +
    '<table class="tb"><tr><th>Serie</th><th>Familia</th></tr><tr><td>10xx</td><td>Carbono simple (Mn hasta 1.0 %)</td></tr><tr><td>11xx</td><td>Resulfurado, maquinado libre</td></tr><tr><td>12xx</td><td>Resulfurado y refosforado</td></tr><tr><td>13xx</td><td>Manganeso 1.75 %</td></tr><tr><td>15xx</td><td>Carbono con Mn de 1.0 a 1.65 %</td></tr><tr><td>40xx</td><td>Molibdeno</td></tr><tr><td>41xx</td><td>Cromo-molibdeno</td></tr><tr><td>43xx</td><td>Níquel-cromo-molibdeno</td></tr><tr><td>51xx</td><td>Cromo</td></tr><tr><td>52xxx</td><td>Cromo 1.45 %, carbono 1.00 %</td></tr><tr><td>61xx</td><td>Cromo-vanadio</td></tr><tr><td>86xx</td><td>Níquel-cromo-molibdeno bajos</td></tr><tr><td>92xx</td><td>Silicio-manganeso</td></tr></table>' +
    '<p>Letras intercaladas: B, boro (15B30); L, plomo (12L14). Sufijo H: templabilidad garantizada (4140H).</p>' },
  { t: 'ASTM: cómo leer una designación', h: '<p><b>ASTM A572/A572M-21 Grado 50</b></p><ul class="b"><li>A: metales ferrosos. El número es consecutivo, sin significado.</li><li>M: edición métrica combinada.</li><li>21: año de la última revisión.</li><li>Grado, clase o tipo: nivel de resistencia o variante química dentro de la norma. En estructurales, el grado suele ser el límite elástico en ksi.</li></ul><p>Una norma ASTM define requisitos de producto: química, propiedades, tolerancias y pruebas. No es un grado de acero por sí misma.</p>' },
  { t: 'EN 10027: nombres europeos', h: '<p>Por uso y propiedad: letra + límite elástico mínimo en MPa.</p><table class="tb"><tr><th>Letra</th><th>Uso</th></tr><tr><td>S</td><td>Estructural (S355)</td></tr><tr><td>P</td><td>Recipientes a presión (P265GH)</td></tr><tr><td>L</td><td>Tubería de línea (L360)</td></tr><tr><td>E</td><td>Construcción mecánica (E335)</td></tr><tr><td>B</td><td>Refuerzo de concreto (B500B)</td></tr><tr><td>D</td><td>Planos para conformar en frío: DC laminado en frío, DD en caliente, DX cualquiera</td></tr><tr><td>H</td><td>Planos de alta resistencia para conformar en frío</td></tr></table>' +
    '<p>Sufijos de impacto: JR, 27 J a +20 °C; J0, a 0 °C; J2, a −20 °C; K2, 40 J a −20 °C. Entrega: +N normalizado, +M termomecánico, +AR bruto de laminación. W: patinable.</p>' +
    '<p>Por composición: C45 (0.45 % C); 42CrMo4 (0.42 % C, 1 % Cr, con Mo); X5CrNi18-10 (alta aleación: 0.05 % C, 18 % Cr, 10 % Ni).</p><p>Además cada acero tiene un número: 1.0577 es S355J2; 1.4301 es el inoxidable 304.</p>' },
  { t: 'JIS: siglas japonesas', h: '<table class="tb"><tr><th>Sigla</th><th>Significado</th></tr><tr><td>SS400</td><td>Estructural general; el número es la resistencia mínima a tensión en MPa</td></tr><tr><td>SM490</td><td>Estructural soldable</td></tr><tr><td>SPHC</td><td>Lámina laminada en caliente, calidad comercial</td></tr><tr><td>SPCC, SPCD, SPCE</td><td>Laminada en frío: comercial, embutido, embutido profundo</td></tr><tr><td>SGCC</td><td>Galvanizada sobre base laminada en frío, comercial</td></tr><tr><td>SGLCC</td><td>Aluminio-zinc 55 %</td></tr><tr><td>S45C</td><td>Acero al carbono con 0.45 % C</td></tr><tr><td>SCM440</td><td>Cromo-molibdeno, equivalente a 4140</td></tr><tr><td>SUS304</td><td>Inoxidable 304</td></tr></table>' },
  { t: 'Inoxidables: series', h: '<table class="tb"><tr><th>Serie</th><th>Familia</th></tr><tr><td>2xx</td><td>Austeníticos Cr-Mn-Ni</td></tr><tr><td>3xx</td><td>Austeníticos Cr-Ni</td></tr><tr><td>4xx</td><td>Ferríticos y martensíticos</td></tr><tr><td>Dúplex</td><td>Por contenido: 2205 es 22 % Cr y 5 % Ni</td></tr></table><p>Sufijos: L, bajo carbono (≤ 0.03 %); H, alto carbono para alta temperatura; N, con nitrógeno; Ti o Nb, estabilizado.</p><p>UNS: S30400 es 304; S31603 es 316L; S32205 es dúplex 2205.</p><p>Acabados de lámina (ASTM A480): 1, laminado en caliente recocido y decapado; 2D, frío mate; 2B, frío con temper, el más común; BA, recocido brillante; No. 4, pulido satinado.</p>' },
  { t: 'Lámina: calidades y recubrimientos', h: '<p>Calidades ASTM de lámina:</p><table class="tb"><tr><th>Sigla</th><th>Calidad</th></tr><tr><td>CS</td><td>Comercial: doblez y formado moderado</td></tr><tr><td>DS</td><td>Troquelado</td></tr><tr><td>DDS</td><td>Embutido profundo</td></tr><tr><td>EDDS</td><td>Embutido extra profundo (acero IF)</td></tr><tr><td>SS</td><td>Estructural: el grado es el límite elástico en ksi</td></tr><tr><td>HSLAS</td><td>Alta resistencia baja aleación</td></tr><tr><td>BH</td><td>Endurecible al hornear la pintura</td></tr></table>' +
    '<p>Peso de recubrimiento, total en ambas caras:</p><table class="tb"><tr><th>Pulgada-libra</th><th>Métrico</th><th>≈ por cara</th></tr><tr><td>G30</td><td>Z90</td><td>6 µm</td></tr><tr><td>G40</td><td>Z120</td><td>8 µm</td></tr><tr><td>G60</td><td>Z180</td><td>13 µm</td></tr><tr><td>G90</td><td>Z275</td><td>20 µm</td></tr><tr><td>G185</td><td>Z550</td><td>39 µm</td></tr><tr><td>AZ50</td><td>AZM150</td><td>20 µm</td></tr><tr><td>AZ55</td><td>AZM165</td><td>22 µm</td></tr></table><p>G90 significa 0.90 oz/ft². Para convertir: 1 oz/ft² = 305 g/m².</p>' },
  { t: 'Calibres de lámina', h: '<p>Calibre estándar de fabricantes para lámina sin recubrir. La galvanizada usa otra tabla, algo más gruesa.</p><table class="tb"><tr><th>Calibre</th><th class="n">mm</th><th class="n">pulgadas</th></tr><tr><td>10</td><td class="n">3.42</td><td class="n">0.1345</td></tr><tr><td>12</td><td class="n">2.66</td><td class="n">0.1046</td></tr><tr><td>14</td><td class="n">1.90</td><td class="n">0.0747</td></tr><tr><td>16</td><td class="n">1.52</td><td class="n">0.0598</td></tr><tr><td>18</td><td class="n">1.21</td><td class="n">0.0478</td></tr><tr><td>20</td><td class="n">0.91</td><td class="n">0.0359</td></tr><tr><td>22</td><td class="n">0.76</td><td class="n">0.0299</td></tr><tr><td>24</td><td class="n">0.61</td><td class="n">0.0239</td></tr><tr><td>26</td><td class="n">0.45</td><td class="n">0.0179</td></tr><tr><td>28</td><td class="n">0.38</td><td class="n">0.0149</td></tr></table>' },
  { t: 'Varilla: números y grados', h: '<p>El número es el diámetro en octavos de pulgada.</p><table class="tb"><tr><th>Número</th><th class="n">Diámetro</th><th class="n">kg/m</th></tr><tr><td>3</td><td class="n">9.5 mm (3/8)</td><td class="n">0.560</td></tr><tr><td>4</td><td class="n">12.7 mm (1/2)</td><td class="n">0.994</td></tr><tr><td>5</td><td class="n">15.9 mm (5/8)</td><td class="n">1.552</td></tr><tr><td>6</td><td class="n">19.1 mm (3/4)</td><td class="n">2.235</td></tr><tr><td>8</td><td class="n">25.4 mm (1)</td><td class="n">3.973</td></tr><tr><td>10</td><td class="n">32.3 mm</td><td class="n">6.404</td></tr><tr><td>12</td><td class="n">38.1 mm</td><td class="n">8.938</td></tr></table><p>Grado 42 (México) = 4 200 kg/cm² ≈ 420 MPa = Grade 60 (ASTM, 60 ksi).</p>' },
  { t: 'Tubería API y tornillería', h: '<p><b>API 5L:</b> X + límite elástico en ksi. X52 = 52 ksi = 360 MPa; en ISO se escribe L360. PSL1 es el nivel básico; PSL2 agrega tenacidad, límites máximos de resistencia y química más estricta.</p><p><b>API 5CT:</b> letra + límite elástico mínimo en ksi: J55, N80, L80, P110, Q125.</p><p><b>Tornillos SAE J429:</b> grado 2 (sin marcas), grado 5 (3 marcas, 120 ksi), grado 8 (6 marcas, 150 ksi).</p><p><b>Tornillos ISO 898-1:</b> clase 8.8 → 800 MPa a tensión y fluencia al 80 %. Clases 10.9 y 12.9 siguen la misma lógica.</p>' },
  { t: 'Conversiones útiles', h: S.kv([['1 ksi', '6.895 MPa'], ['1 kg/mm²', '9.807 MPa'], ['1 kg/cm²', '0.0981 MPa'], ['1 oz/ft²', '305 g/m²'], ['1 mil', '25.4 µm'], ['1 tonelada corta', '0.907 t'], ['Densidad del acero', '7.85 g/cm³'], ['Peso de lámina', '7.85 kg/m² por mm de espesor'], ['Rm ≈ 3.45 × HB', 'MPa, aceros al carbono']]) }
];

S.normaCats = ['Estructural', 'Lámina y recubiertos', 'Tubería', 'Varilla y alambre', 'Placa y recipientes', 'Barras y tornillería', 'Inoxidable', 'Ensayos y generales'];

(function () {
  function N(org, cod, t, cat, alc, gr, cl, usos, eq) {
    S.normas.push({ id: (org + '-' + cod).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), org: org, cod: cod, t: t, cat: cat, alc: alc, gr: gr, cl: cl, usos: usos, eq: eq });
  }
  var E = 'Estructural', L = 'Lámina y recubiertos', T = 'Tubería', V = 'Varilla y alambre', P = 'Placa y recipientes', B = 'Barras y tornillería', I = 'Inoxidable', G = 'Ensayos y generales';

  /* ---------- Estructural ---------- */
  N('ASTM', 'A36', 'Acero estructural al carbono', E, 'Perfiles, placa y barras de acero al carbono para construcción remachada, atornillada o soldada.',
    [['A36', '250', '400–550', 'Elongación 20–23 %']], ['El estructural base en América. Carbono máximo 0.25–0.29 % según espesor.', 'No pide prueba de impacto salvo requisito suplementario.', 'En perfiles W fue desplazado por A992; sigue vigente en placa, ángulos, canales y barras.'],
    'Naves industriales, edificios, placas base, soportes, estructura general.', 'NMX-B-254; cercanos: EN S235/S275, JIS SS400, GB Q235');
  N('ASTM', 'A572', 'Acero estructural de alta resistencia y baja aleación Nb-V', E, 'Perfiles, placa y barras HSLA microaleados con niobio y vanadio.',
    [['Grado 42', '290', '415', ''], ['Grado 50', '345', '450', 'El más usado'], ['Grado 55', '380', '485', ''], ['Grado 60', '415', '520', ''], ['Grado 65', '450', '550', '']], ['Más resistencia con menos peso que A36 y buena soldabilidad.', 'El espesor máximo disminuye al subir el grado.'],
    'Puentes, torres de transmisión, edificios, grúas, equipo de construcción.', 'NMX-B-284; cercanos: EN S355, GB Q355');
  N('ASTM', 'A992', 'Perfiles estructurales para edificios', E, 'Perfiles de patín ancho (W) para marcos de edificios.',
    [['A992', '345–450', '≥ 450', 'Fy/Fu ≤ 0.85']], ['Limita el límite elástico máximo y la relación Fy/Fu: comportamiento dúctil predecible en sismo.', 'Carbono equivalente máximo de 0.45–0.47: soldable sin precauciones especiales.', 'Es la especificación por omisión para vigas W en Estados Unidos.'],
    'Vigas y columnas IPR de edificios y naves.', 'Cercano: EN S355J0/J2 en perfiles');
  N('ASTM', 'A588', 'Acero estructural patinable', E, 'HSLA con resistencia a la corrosión atmosférica unas cuatro veces la del acero al carbono.',
    [['A588', '345', '485', 'Hasta 100 mm']], ['Cu, Cr y Ni forman una pátina estable. Puede usarse sin pintar.', 'No conviene en ambientes marinos o con humedad permanente: la pátina no se estabiliza.'],
    'Puentes, fachadas, esculturas, contenedores, postes.', 'A709 grado 50W; EN S355J2W (tipo Corten)');
  N('ASTM', 'A709', 'Acero estructural para puentes', E, 'Reúne en una norma los grados para puentes con requisitos de tenacidad por zona de servicio.',
    [['Grado 36', '250', '400–550', ''], ['Grado 50', '345', '450', ''], ['Grado 50W', '345', '485', 'Patinable'], ['HPS 70W', '485', '585–760', 'Alto desempeño'], ['HPS 100W', '690', '760–895', '']], ['Los grados HPS son de bajo carbono y laminado termomecánico o temple y revenido: sueldan con poco precalentamiento.', 'Especifica Charpy para miembros a tensión y de fractura crítica.'],
    'Trabes y diafragmas de puentes carreteros y ferroviarios.', '');
  N('ASTM', 'A500', 'Tubería estructural formada en frío (HSS)', E, 'Tubo redondo, cuadrado y rectangular de acero al carbono, soldado o sin costura, formado en frío.',
    [['Grado B', '290 redondo / 315 formado', '400', ''], ['Grado C', '315 redondo / 345 formado', '425', 'El más común hoy']], ['Las ediciones recientes unifican el límite elástico de redondos y formados.', 'El formado en frío eleva la resistencia en las esquinas.', 'La tolerancia de espesor es de −10 %: el diseño usa 0.93 del nominal.'],
    'Columnas, armaduras, marcos, estructuras ligeras; en México, PTR.', 'NMX-B-199; EN 10219 S355J2H');
  N('ASTM', 'A1085', 'HSS de propiedades mejoradas', E, 'Tubería estructural formada en frío con tolerancias más cerradas que A500.',
    [['A1085', '345–485', '≥ 450', 'Charpy 34 J a 4 °C']], ['Límite elástico máximo, tolerancia de pared más estricta y tenacidad garantizada.', 'Permite diseñar con el espesor nominal completo.'],
    'Marcos sísmicos, puentes peatonales, estructuras expuestas.', '');
  N('ASTM', 'A6', 'Requisitos generales de perfiles y placa estructural', G, 'Tolerancias dimensionales, de peso, rectitud y planeza; marcado, inspección y certificación.',
    [], ['Las normas de producto (A36, A572, A992) remiten a A6 para todo lo que no es química ni propiedades.', 'Define los perfiles W, S, M, HP, C, MC y L.'], 'Compra e inspección de cualquier perfil o placa estructural.', 'EN 10034, EN 10029');
  N('EN', 'EN 10025', 'Productos laminados en caliente de aceros estructurales', E, 'Seis partes: no aleados (2), normalizados (3), termomecánicos (4), patinables (5), templados y revenidos (6).',
    [['S235', '235', '360–510', ''], ['S275', '275', '410–560', ''], ['S355', '355', '470–630', 'El más usado'], ['S460', '460', '540–720', 'Partes 3 y 4'], ['S690Q', '690', '770–940', 'Parte 6']], ['El límite elástico nominal aplica hasta 16 mm; baja con el espesor.', 'El sufijo indica tenacidad: JR, J0, J2, K2.', 'Ejemplo: S355J2+N es 355 MPa, 27 J a −20 °C, normalizado.'],
    'Toda la construcción metálica europea.', 'S355 ≈ A572 Gr 50; S235 ≈ A36 (menor)');
  N('JIS', 'G 3101', 'Acero laminado para estructura general', E, 'Placa, lámina, barras y perfiles de uso general.',
    [['SS330', '205', '330–430', ''], ['SS400', '245', '400–510', 'El más usado'], ['SS490', '285', '490–610', ''], ['SS540', '400', '≥ 540', '']], ['SS400 solo limita fósforo y azufre: no fija carbono ni manganeso.', 'Para estructura soldada crítica se usa la serie SM (G 3106).'],
    'Estructura general, maquinaria, placas.', 'SS400 ≈ A36');
  N('NMX', 'B-254', 'Acero estructural', E, 'Perfiles, placas y barras de acero al carbono para construcción.',
    [['B-254', '250', '400–550', '']], ['Equivalente mexicano de ASTM A36.', 'Edición vigente: NMX-B-254-CANACERO-2008.'], 'Construcción metálica en México.', 'ASTM A36');
  N('NMX', 'B-284', 'Acero estructural de alta resistencia baja aleación', E, 'HSLA al manganeso-niobio-vanadio en placa, perfiles y barras.',
    [['Grado 290', '290', '415', ''], ['Grado 345', '345', '450', ''], ['Grado 380', '380', '485', ''], ['Grado 415', '415', '520', ''], ['Grado 450', '450', '550', '']], ['Equivalente mexicano de ASTM A572.', 'Edición vigente: NMX-B-284-CANACERO-2017.'], 'Estructuras soldadas y atornilladas, puentes.', 'ASTM A572');

  /* ---------- Lámina ---------- */
  N('ASTM', 'A1011', 'Lámina y tira laminada en caliente', L, 'Acero al carbono, estructural, HSLA y de ultra alta resistencia en rollo y hoja, hasta 6 mm.',
    [['CS tipo B', '205–340 típico', '—', 'Comercial'], ['DS', '205–310 típico', '—', 'Troquelado'], ['SS grado 36', '250', '365', ''], ['SS grado 50', '340', '450', ''], ['HSLAS grado 50', '340', '410–450', 'Clases 1 y 2'], ['HSLAS grado 70', '480', '550–585', '']], ['En CS y DS los valores mecánicos son típicos, no obligatorios: se compra por formabilidad.', 'HSLAS-F: mejor formabilidad, con control de inclusiones.'],
    'Tubería, perfiles rolados, autopartes, tanques, rines, base para galvanizar.', 'EN 10111, EN 10149; JIS G 3131');
  N('ASTM', 'A1018', 'Rollo laminado en caliente de espesor grueso', L, 'Rollos de más de 6 mm hasta 25 mm, en calidades comercial, estructural y HSLA.',
    [['SS grado 36', '250', '365–400', ''], ['HSLAS grado 50', '340', '410–450', '']], ['Cubre el rango entre lámina y placa cortada de rollo.'], 'Largueros de camión, tubería de gran espesor, placa nivelada de rollo.', '');
  N('ASTM', 'A1008', 'Lámina laminada en frío', L, 'Acero al carbono, estructural, HSLA, endurecible al horneado y otros, en rollo y hoja.',
    [['CS tipo B', '140–275 típico', '—', 'Comercial'], ['DS', '150–240 típico', '—', 'Troquelado'], ['DDS', '115–200 típico', '—', 'Embutido profundo'], ['EDDS', '105–170 típico', '—', 'Extra profundo'], ['SS grado 33', '230', '330', ''], ['SS grado 80', '550', '565', 'Sin recocer']], ['Acabado: mate o brillante; expuesto (clase 1) o no expuesto (clase 2).', 'El EDDS es acero IF estabilizado con Ti o Nb: no envejece.'],
    'Línea blanca, muebles metálicos, carrocería, tambores, base para recubrir.', 'EN 10130 (DC01–DC07); JIS G 3141');
  N('ASTM', 'A568', 'Requisitos generales de lámina en caliente y en frío', G, 'Tolerancias de espesor, ancho, longitud, planeza y camber; definiciones de calidades.',
    [], ['Las normas A1008 y A1011 remiten a ella.', 'Distingue tolerancia de espesor medida a 10 mm o a 25 mm de la orilla.'], 'Compra e inspección de lámina sin recubrir.', 'EN 10051, EN 10131');
  N('ASTM', 'A653', 'Lámina galvanizada por inmersión en caliente', L, 'Recubrimiento de zinc (galvanizado) o zinc-hierro (galvanneal) en proceso continuo.',
    [['CS tipo B', '170–380 típico', '—', ''], ['SS grado 33', '230', '310', ''], ['SS grado 37', '255', '360', ''], ['SS grado 40', '275', '380', ''], ['SS grado 50 clase 1', '340', '450', ''], ['SS grado 80', '550', '570', 'Lámina acanalada']], ['Recubrimiento: G30 a G235 (Z90 a Z700). G90 es el estándar de construcción.', 'Galvanneal: A25, A40, A60.', 'Acabado de flor: regular, minimizada o extra lisa.'],
    'Techos, muros, ductos, perfiles ligeros, polines, electrodomésticos, autopartes.', 'EN 10346 (+Z, +ZF); JIS G 3302');
  N('ASTM', 'A792', 'Lámina con aleación 55 % aluminio-zinc', L, 'Recubrimiento por inmersión de 55 % Al, 43.4 % Zn y 1.6 % Si.',
    [['CS', '205–410 típico', '—', ''], ['SS grado 37', '255', '360', ''], ['SS grado 50 clase 1', '340', '450', ''], ['SS grado 80', '550', '570', '']], ['Recubrimientos AZ50, AZ55 y AZ60 (150, 165 y 180 g/m²).', 'De dos a cuatro veces la vida del G90 en atmósfera, a igual espesor.', 'No recomendable en contacto con concreto fresco, estiércol o cobre.'],
    'Techos y muros sin pintar, base para prepintado, paneles.', 'EN 10346 (+AZ); JIS G 3321');
  N('ASTM', 'A755', 'Lámina prepintada para construcción', L, 'Lámina con recubrimiento metálico pintada en línea continua, para productos exteriores.',
    [], ['Define sustrato, pretratamiento, sistema de pintura y pruebas: espesor de película, brillo, doblez T, impacto, adherencia.', 'El sustrato cumple A653 o A792.'], 'Techos, muros y accesorios arquitectónicos.', 'EN 10169; JIS G 3312');
  N('ASTM', 'A463', 'Lámina aluminizada', L, 'Recubrimiento de aluminio por inmersión: tipo 1, Al-Si; tipo 2, aluminio puro.',
    [], ['Tipo 1: resiste calor hasta ≈ 650 °C. Escapes, hornos, intercambiadores.', 'Tipo 2: corrosión atmosférica; alcantarillas, techos.'], 'Mofles, calentadores, hornos, estampado en caliente (sustrato Al-Si).', 'EN 10346 (+AS)');
  N('ASTM', 'A924', 'Requisitos generales de lámina recubierta por inmersión', G, 'Tolerancias, muestreo, métodos de prueba de recubrimiento (triple punto y punto único).',
    [], ['Las normas A653, A792 y A463 remiten a ella.'], 'Compra e inspección de lámina recubierta.', '');
  N('ASTM', 'A623', 'Productos de hojalata', L, 'Requisitos generales de lámina negra, hojalata electrolítica y lámina cromada.',
    [], ['Define temples T1 a T5 y DR, pesos de estaño y acabados superficiales.'], 'Envases de alimentos y bebidas, aerosoles, tapas.', 'EN 10202; JIS G 3303');
  N('EN', 'EN 10130', 'Planos laminados en frío para conformar', L, 'Aceros de bajo carbono sin recubrir.',
    [['DC01', '≤ 280', '270–410', 'A80 ≥ 28 %'], ['DC03', '≤ 240', '270–370', '≥ 34 %'], ['DC04', '≤ 210', '270–350', '≥ 38 %'], ['DC05', '≤ 180', '270–330', '≥ 40 %'], ['DC06', '≤ 170', '270–330', '≥ 41 %; acero IF']], ['Aquí el límite elástico es un máximo: a menor número, más embutible.', 'Acabado A (normal) o B (expuesto).'],
    'Estampado automotriz y de línea blanca.', 'ASTM A1008 CS a EDDS');
  N('EN', 'EN 10346', 'Planos recubiertos en continuo por inmersión', L, 'Una sola norma para todos los recubrimientos metálicos por inmersión.',
    [['DX51D', '—', '270–500', 'Doblado y perfilado'], ['DX54D', '120–220', '260–350', 'Embutido profundo'], ['S250GD', '250', '330', ''], ['S350GD', '350', '420', ''], ['S550GD', '550', '560', '']], ['Recubrimientos: +Z zinc, +ZF galvanneal, +ZA zinc-5 % Al, +ZM zinc-magnesio, +AZ aluminio-zinc, +AS aluminio-silicio.', 'Ejemplo: S350GD+Z275 es estructural de 350 MPa con 275 g/m² de zinc.'],
    'Construcción, automotriz, línea blanca.', 'ASTM A653, A792, A463');
  N('JIS', 'G 3302', 'Lámina galvanizada por inmersión', L, 'Galvanizado continuo sobre base laminada en caliente o en frío.',
    [['SGCC', '≥ 205', '≥ 270', 'Comercial'], ['SGC340', '245', '340', ''], ['SGC400', '295', '400', ''], ['SGC570', '560', '570', '']], ['Recubrimiento Z08 a Z60 (80 a 600 g/m²).'], 'Construcción y manufactura en Asia.', 'ASTM A653');
  N('JIS', 'G 3141', 'Lámina laminada en frío', L, 'Acero de bajo carbono laminado en frío.',
    [['SPCC', '—', '≥ 270', 'Comercial'], ['SPCD', '≤ 240', '≥ 270', 'Embutido'], ['SPCE', '≤ 220', '≥ 270', 'Embutido profundo']], ['Temple: A recocido, S estándar, 8 a 1 según dureza.'], 'Autopartes y electrodomésticos.', 'ASTM A1008; EN 10130');

  /* ---------- Tubería ---------- */
  N('ASTM', 'A53', 'Tubo de acero negro y galvanizado', T, 'Tubo soldado y sin costura para conducción y uso mecánico, NPS 1/8 a 26.',
    [['Grado A', '205', '330', ''], ['Grado B', '240', '415', 'El más usado']], ['Tipos: F, soldado a tope en horno; E, soldado por resistencia eléctrica; S, sin costura.', 'Prueba hidrostática o no destructiva en cada tramo.', 'Admite roscar, ranurar, doblar y galvanizar.'],
    'Agua, vapor, aire, gas, protección contra incendio, barandales.', 'NMX-B-177; API 5L grado B; EN 10255');
  N('ASTM', 'A106', 'Tubo sin costura para alta temperatura', T, 'Acero al carbono calmado, sin costura, para servicio a temperatura elevada.',
    [['Grado A', '205', '330', ''], ['Grado B', '240', '415', ''], ['Grado C', '275', '485', '']], ['Silicio mínimo de 0.10 %: acero calmado.', 'Es común la triple certificación A106 B / A53 B / API 5L B.'],
    'Refinerías, plantas de proceso, calderas, vapor.', 'ASME SA-106; EN 10216-2 P265GH');
  N('ASTM', 'A252', 'Pilotes tubulares', T, 'Tubo soldado o sin costura que trabaja como pilote o como camisa de concreto.',
    [['Grado 1', '205', '345', ''], ['Grado 2', '240', '415', ''], ['Grado 3', '310', '455', '']], ['No exige prueba hidrostática: es elemento estructural.'], 'Cimentaciones profundas, muelles, tablestacas combinadas.', '');
  N('ASTM', 'A513', 'Tubería mecánica soldada', T, 'Tubo soldado por resistencia eléctrica para usos mecánicos.',
    [], ['Tipo 1: de lámina en caliente. Tipo 2: de lámina en frío. Tipo 5: estirado sobre mandril (DOM), con la mejor tolerancia.', 'Se compra por dimensiones exactas y grado de acero (1010, 1020, 1026).'], 'Autopartes, cilindros, muebles, rodillos, ejes huecos.', 'NMX-B-485; EN 10305');
  N('ASTM', 'A335', 'Tubo sin costura ferrítico aleado para alta temperatura', T, 'Tubería Cr-Mo para vapor y proceso.',
    [['P11', '205', '415', '1¼Cr-½Mo'], ['P22', '205', '415', '2¼Cr-1Mo'], ['P91', '415', '585', '9Cr-1Mo-V']], ['P91 exige control estricto de tratamiento térmico y de soldadura.'], 'Centrales de ciclo combinado, refinerías, petroquímica.', 'ASME SA-335; EN 10216-2');
  N('API', '5L', 'Tubería de línea', T, 'Tubo sin costura y soldado para transporte de gas, petróleo y agua.',
    [['B (L245)', '245', '415', ''], ['X42 (L290)', '290', '415', ''], ['X52 (L360)', '360', '460', ''], ['X60 (L415)', '415', '520', ''], ['X65 (L450)', '450', '535', ''], ['X70 (L485)', '485', '570', ''], ['X80 (L555)', '555', '625', '']], ['PSL2 fija límites máximos de resistencia, carbono equivalente y energía Charpy.', 'Procesos: SMLS sin costura, HFW soldado de alta frecuencia, SAWL arco sumergido longitudinal, SAWH helicoidal.', 'Anexos para servicio amargo (H₂S) y costa afuera.'],
    'Gasoductos, oleoductos, acueductos.', 'ISO 3183');
  N('API', '5CT', 'Tubería de revestimiento y producción (OCTG)', T, 'Tubo para pozos: casing, tubing y coples.',
    [['J55 / K55', '379–552', '517 / 655', ''], ['N80', '552–758', '689', ''], ['L80', '552–655', '655', 'Dureza controlada, servicio amargo'], ['P110', '758–965', '862', ''], ['Q125', '862–1 034', '931', '']], ['El número es el límite elástico mínimo en ksi.', 'Grupos por severidad: de H40 hasta Q125; L80 13Cr para CO₂.', 'Roscas API (redonda, buttress) o conexiones premium de cada fabricante.'],
    'Pozos de petróleo, gas y geotermia.', 'ISO 11960');
  N('NMX', 'B-177', 'Tubos de acero con o sin costura, negros y galvanizados', T, 'Tubo para conducción y usos generales.',
    [['Grado A', '205', '330', ''], ['Grado B', '240', '415', '']], ['Equivalente mexicano de ASTM A53.'], 'Instalaciones hidráulicas, de gas, contra incendio.', 'ASTM A53');
  N('NMX', 'B-199', 'Tubos estructurales formados en frío', T, 'Tubo redondo, cuadrado y rectangular de acero al carbono para uso estructural.',
    [], ['Equivalente mexicano de ASTM A500.'], 'PTR y tubo estructural.', 'ASTM A500');

  /* ---------- Varilla y alambre ---------- */
  N('ASTM', 'A615', 'Varilla corrugada y lisa de acero al carbono', V, 'Barras para refuerzo de concreto.',
    [['Grado 40', '280', '420', ''], ['Grado 60', '420', '550', 'El más usado'], ['Grado 80', '550', '690', ''], ['Grado 100', '690', '790', '']], ['No limita carbono equivalente: la soldadura requiere evaluar la química real.', 'Define geometría de corruga, masa por metro y doblado.'],
    'Refuerzo de concreto en edificación e infraestructura.', 'NMX-B-506');
  N('ASTM', 'A706', 'Varilla corrugada de baja aleación', V, 'Barras de refuerzo soldables y de ductilidad controlada.',
    [['Grado 60', '420–540', '≥ 550', 'Fu ≥ 1.25 Fy real'], ['Grado 80', '550–675', '≥ 690', '']], ['Carbono equivalente máximo 0.55 %: soldable.', 'Límite elástico máximo y relación Fu/Fy: articulaciones plásticas confiables.'],
    'Marcos dúctiles en zona sísmica, empalmes soldados.', 'NMX-B-457');
  N('ASTM', 'A1064', 'Alambre y malla electrosoldada para concreto', V, 'Alambre liso y corrugado estirado en frío y malla soldada.',
    [['Alambre liso', '450', '515', ''], ['Alambre corrugado', '485', '550', '']], ['Sustituyó a A82, A185, A496 y A497.', 'Designación de malla: separación × área de alambre.'], 'Losas, firmes, pavimentos, prefabricados.', 'NMX-B-290, NMX-B-253');
  N('ASTM', 'A416', 'Torón de siete alambres para presfuerzo', V, 'Torón sin recubrir de baja relajación.',
    [['Grado 250', '≈ 1 550', '1 725', ''], ['Grado 270', '≈ 1 675', '1 860', 'El estándar']], ['Acero de alto carbono (≈ 0.80 %) patentado y trefilado.', 'Baja relajación: pérdida máxima de 2.5 % a 1 000 h.'], 'Trabes pretensadas, losas postensadas, tirantes.', 'NMX-B-292; EN 10138');
  N('ASTM', 'A510', 'Alambrón y alambre redondo de acero al carbono', G, 'Requisitos generales: tolerancias, química, descarburación.',
    [], ['Clasifica el alambrón por uso: bajo carbono, trefilar, cabeceado en frío, alto carbono.'], 'Compra de alambrón.', '');
  N('NMX', 'B-506', 'Varilla corrugada para refuerzo de concreto', V, 'Varilla de acero al carbono.',
    [['Grado 42', '412', '618', '4 200 y 6 300 kg/cm²'], ['Grado 52', '510', '—', '5 200 kg/cm²']], ['La norma de varilla de mayor uso en México. Edición vigente: NMX-B-506-CANACERO-2019.', 'Marcado en la barra: fabricante, número y grado.'],
    'Refuerzo de concreto en vivienda, edificación e infraestructura.', 'ASTM A615');
  N('NMX', 'B-457', 'Varilla corrugada de baja aleación', V, 'Varilla soldable de ductilidad controlada.',
    [['Grado 42', '412–540', '≥ 550', 'Fu ≥ 1.25 Fy']], ['Equivalente mexicano de ASTM A706.', 'Requerida por los reglamentos para elementos dúctiles en zonas sísmicas.'], 'Marcos de concreto de ductilidad alta.', 'ASTM A706');
  N('NMX', 'B-072', 'Varilla corrugada grado 60 laminada en frío', V, 'Varilla de diámetros pequeños obtenida de alambrón por laminado en frío.',
    [['Grado 60', '588', '—', '6 000 kg/cm²']], ['Edición vigente: NMX-B-072-CANACERO-2017.', 'Menos dúctil que la varilla laminada en caliente.'], 'Castillos, dalas, losas, malla.', '');
  N('NMX', 'B-290', 'Malla electrosoldada', V, 'Malla de alambre liso o corrugado para refuerzo de concreto.',
    [], ['Edición vigente: NMX-B-290-CANACERO-2021.', 'Designación común: 6×6-10/10 es cuadro de 6 in con alambre calibre 10.'], 'Firmes, losas, pavimentos, muros.', 'ASTM A1064');
  N('NMX', 'B-456', 'Armaduras electrosoldadas', V, 'Castillos y cadenas prefabricados de alambre corrugado.',
    [], ['Edición vigente: NMX-B-456-CANACERO-2017.'], 'Vivienda: castillos y dalas.', '');

  /* ---------- Placa y recipientes ---------- */
  N('ASTM', 'A516', 'Placa para recipientes a presión, temperatura moderada y baja', P, 'Acero al carbono calmado de grano fino.',
    [['Grado 55', '205', '380–515', ''], ['Grado 60', '220', '415–550', ''], ['Grado 65', '240', '450–585', ''], ['Grado 70', '260', '485–620', 'El más usado']], ['Normalizado obligatorio arriba de 40 mm.', 'Se puede pedir con ensayo HIC para servicio amargo.'],
    'Tanques, separadores, esferas, calderas, intercambiadores.', 'ASME SA-516; EN 10028-2 P355GH');
  N('ASTM', 'A283', 'Placa de resistencia baja e intermedia', P, 'Acero al carbono de calidad estructural.',
    [['Grado C', '205', '380–515', ''], ['Grado D', '230', '415–550', '']], ['Económica, para uso general sin requisitos de tenacidad.'], 'Tanques atmosféricos de almacenamiento (API 650), estructura secundaria.', '');
  N('ASTM', 'A514', 'Placa aleada templada y revenida de alta resistencia', P, 'Placa de 690 MPa para estructura soldada.',
    [['A514', '690', '760–895', 'Hasta 65 mm']], ['Soldable con control de aporte térmico e hidrógeno.', 'Varios grados (A, B, E, F, H, Q) con distinta aleación según espesor.'], 'Plumas de grúa, cajas de volteo, equipo minero.', 'EN 10025-6 S690QL');
  N('ASTM', 'A387', 'Placa Cr-Mo para recipientes a presión', P, 'Acero aleado para servicio a alta temperatura.',
    [['Grado 11 clase 2', '310', '515–690', '1¼Cr-½Mo'], ['Grado 22 clase 2', '310', '515–690', '2¼Cr-1Mo'], ['Grado 91', '415', '585–760', '9Cr-1Mo-V']], ['Resiste fluencia lenta y ataque por hidrógeno a alta temperatura.'], 'Reactores de refinería, calderas.', 'ASME SA-387');

  /* ---------- Barras y tornillería ---------- */
  N('SAE', 'J403', 'Composición química de aceros al carbono', B, 'Define los grados 10xx, 11xx, 12xx y 15xx.',
    [], ['Fija solo la química. Las propiedades dependen del proceso y del tratamiento.', '1018, 1045 y 1060 son los de mayor consumo en barra.'], 'Especificar barras, alambrón y lámina por química.', 'ASTM A29; JIS G 4051; EN ISO 683-1');
  N('SAE', 'J404', 'Composición química de aceros aleados', B, 'Define los grados 13xx, 41xx, 43xx, 51xx, 61xx, 86xx, 92xx y otros.',
    [], ['Los grados con sufijo H (J1268) garantizan una banda de templabilidad Jominy.'], 'Flechas, engranes, resortes, tornillería de alta resistencia.', 'ASTM A29, A322; EN ISO 683-2');
  N('ASTM', 'A29', 'Barras de acero al carbono y aleado, requisitos generales', G, 'Tolerancias, química y definiciones para barra laminada en caliente y acabada en frío.',
    [], ['Las normas A108, A322 y A576 remiten a ella.'], 'Compra de barras.', '');
  N('ASTM', 'A193', 'Tornillería aleada e inoxidable para alta temperatura', B, 'Espárragos y tornillos para bridas, válvulas y recipientes.',
    [['B7', '720', '860', '4140 templado y revenido, hasta 65 mm'], ['B16', '725', '860', 'Cr-Mo-V'], ['B8 clase 1', '205', '515', 'Inoxidable 304']], ['Las tuercas correspondientes son A194 (2H para B7).'], 'Bridas de tubería de proceso.', 'ASME SA-193');
  N('ASTM', 'F3125', 'Tornillos estructurales de alta resistencia', B, 'Reúne los antiguos A325 y A490 y sus versiones de tensión controlada.',
    [['A325', '—', '830', '120 ksi'], ['A490', '—', '1 040', '150 ksi; no se galvaniza']], ['A325 puede galvanizarse; A490 no, por riesgo de fragilización por hidrógeno.', 'Instalación: apriete ajustado, pretensado o de deslizamiento crítico.'], 'Conexiones de estructura metálica.', 'ISO 898-1 clases 8.8 y 10.9; EN 14399');
  N('SAE', 'J429', 'Tornillería de acero, serie en pulgadas', B, 'Requisitos mecánicos de tornillos, birlos y espárragos.',
    [['Grado 2', '393', '510', 'Hasta ¾ in'], ['Grado 5', '634', '827', 'Medio carbono, templado'], ['Grado 8', '896', '1 034', 'Aleado, templado']], ['Marcas en la cabeza: ninguna, tres o seis líneas radiales.'], 'Maquinaria, automotriz, uso general.', 'ISO 898-1: 5.8, 8.8, 10.9');
  N('ASTM', 'A123', 'Galvanizado por inmersión de productos fabricados', B, 'Recubrimiento de zinc sobre piezas y estructuras ya fabricadas.',
    [], ['Espesor mínimo según espesor del acero: de 45 a 100 µm.', 'La química del acero (Si, P) cambia el espesor y el aspecto de la capa.', 'Para tornillería y herrajes centrifugados se usa A153.'], 'Estructuras, torres, postes, rejillas, defensas.', 'ISO 1461');

  /* ---------- Inoxidable ---------- */
  N('ASTM', 'A240', 'Placa, lámina y tira de acero inoxidable', I, 'Aceros al cromo y cromo-níquel para recipientes a presión y uso general.',
    [['304', '205', '515', ''], ['304L', '170', '485', ''], ['316L', '170', '485', ''], ['430', '205', '450', ''], ['410', '205', '450', ''], ['2205', '450', '655', '']], ['Fija química y propiedades por designación UNS.', 'Tolerancias y acabados se rigen por A480.'],
    'Tanques, equipo de proceso, cocinas, arquitectura.', 'EN 10088-2, EN 10028-7; JIS G 4304/4305');
  N('ASTM', 'A312', 'Tubería de inoxidable austenítico', I, 'Tubo sin costura y soldado para alta temperatura y servicio corrosivo.',
    [['TP304', '205', '515', ''], ['TP316L', '170', '485', '']], ['Entregado en condición solubilizada.'], 'Proceso químico, alimentos, farmacéutica.', 'ASME SA-312; EN 10216-5');
  N('EN', 'EN 10088', 'Aceros inoxidables', I, 'Lista de aceros (parte 1) y condiciones de suministro de planos (2) y largos (3).',
    [['1.4301', '230', '540–750', '304'], ['1.4404', '240', '530–680', '316L'], ['1.4016', '260', '450–600', '430'], ['1.4462', '500', '700–950', '2205']], ['Valores para fleje laminado en frío.', 'El nombre describe la química: X5CrNi18-10.'], 'Todo el mercado europeo de inoxidable.', 'ASTM A240');

  /* ---------- Ensayos y generales ---------- */
  N('ASTM', 'A370', 'Métodos de ensayo mecánico de productos de acero', G, 'Tensión, doblez, dureza e impacto Charpy aplicados a acero.',
    [], ['Define probetas, velocidad de ensayo y cómo determinar el límite elástico (0.2 % de desplazamiento).', 'Complementan: E8 tensión, E18 Rockwell, E10 Brinell, E23 Charpy, E112 tamaño de grano, A751 análisis químico.'], 'Laboratorios de planta y certificación de producto.', 'NMX-B-172; ISO 6892-1, ISO 148-1');
  N('EN', 'EN 10204', 'Documentos de inspección', G, 'Tipos de certificado que acompañan al producto.',
    [], ['2.1: declaración de conformidad, sin resultados.', '2.2: informe con resultados de inspección no específica.', '3.1: resultados del lote entregado, validados por inspección independiente de producción. El habitual.', '3.2: además validado por inspector del comprador o de tercera parte.'], 'Compras con trazabilidad.', 'Equivale al MTR o certificado de calidad');
  N('AWS', 'D1.1', 'Código de soldadura estructural: acero', G, 'Diseño de juntas, calificación de procedimientos y soldadores, fabricación e inspección.',
    [], ['Lista aceros precalificados y su precalentamiento mínimo según espesor.', 'Complementan: D1.3 lámina, D1.4 varilla de refuerzo, D1.5 puentes, D1.8 sísmico.'], 'Toda estructura de acero soldada.', 'EN 1090-2; ISO 3834');
  N('ASME', 'BPVC II', 'Código de calderas y recipientes: materiales', G, 'Especificaciones de materiales permitidos y sus esfuerzos admisibles.',
    [], ['Las especificaciones SA son normas ASTM adoptadas, a veces con cambios: SA-516 corresponde a A516.', 'La parte D da el esfuerzo admisible por temperatura.'], 'Recipientes a presión, calderas, intercambiadores.', 'EN 13445');
  N('ISO', '898-1', 'Propiedades mecánicas de tornillos de acero', B, 'Clases de resistencia para tornillería métrica.',
    [['8.8', '640', '800', ''], ['10.9', '900', '1 000', ''], ['12.9', '1 080', '1 200', '']], ['Primer número × 100: resistencia a tensión. Segundo: relación de fluencia × 10.'], 'Tornillería métrica industrial y automotriz.', 'SAE J429 grados 5 y 8');
  N('GB', 'GB/T 700 y 1591', 'Aceros estructurales chinos', E, 'GB/T 700: acero al carbono. GB/T 1591: alta resistencia baja aleación.',
    [['Q235', '235', '370–500', ''], ['Q355', '355', '470–630', 'Antes Q345']], ['La Q viene de qufu, fluencia. Las letras A a E indican nivel de tenacidad.'], 'Construcción e importaciones de origen chino.', 'Q235 ≈ A36 / S235; Q355 ≈ S355');
})();

/* Industria: panorama, ranking y perfiles de empresas.
   Datos corporativos a noviembre de 2026. Producción: World Steel Association, acero crudo 2025. */
S.ind = {
  corte: 'noviembre de 2026',
  mundo: [
    ['Producción mundial 2025', '1 849 Mt de acero crudo (1 887 Mt en 2024)'],
    ['China', '960.8 Mt, 52 % del total, −4.4 %'],
    ['India', '164.9 Mt, +10.4 %: el gran mercado en crecimiento'],
    ['Estados Unidos', '82.0 Mt; superó a Japón como tercer productor'],
    ['Diez mayores empresas', '523 Mt, 28 % del total: industria poco concentrada'],
    ['Rutas', '≈ 70 % alto horno y convertidor; ≈ 30 % horno eléctrico']
  ],
  mexico: [
    ['Producción 2025', '≈ 16.8 Mt de productos terminados, −8.1 % (CANACERO)'],
    ['Consumo 2025', '≈ 25 Mt: el país importa cerca de un tercio de lo que usa'],
    ['Ruta', 'Casi todo por horno eléctrico; fuerte uso de hierro esponja'],
    ['Utilización', '≈ 55 % de la capacidad instalada a inicios de 2026'],
    ['Cámara', 'CANACERO; presidente 2026–2027: Sergio de la Maza']
  ],
  temas: [
    ['Sobrecapacidad china', 'China exporta más de 100 Mt al año. Presiona precios en todo el mundo y motiva cuotas antidumping en América, Europa y Asia.'],
    ['Sección 232', 'Estados Unidos impuso 25 % al acero en 2018. En 2025 retiró las exenciones, incluida la de México, y subió el arancel a 50 %. El acero es tema central de la revisión del T-MEC.'],
    ['Descarbonización', 'El acero genera cerca del 7–9 % del CO₂ mundial. Las rutas: más chatarra y horno eléctrico, reducción directa con gas e hidrógeno, y captura de carbono.'],
    ['CBAM europeo', 'Desde 2026 la Unión Europea cobra el carbono incorporado en el acero importado.'],
    ['Consolidación', 'Nippon Steel compró U.S. Steel (2025); Cleveland-Cliffs integró AK Steel, ArcelorMittal USA y Stelco; thyssenkrupp negocia la venta de su acero a Jindal Steel International.'],
    ['Nearshoring', 'La relocalización de manufactura eleva la demanda de lámina automotriz y de línea blanca en el norte de México.'],
    ['Precios de referencia', 'Rollo caliente (HRC) según CRU o Platts; mineral 62 % Fe CFR China; chatarra HMS y busheling; coque y gas natural.']
  ],
  fuentes: ['World Steel Association: World Steel in Figures 2026 y reportes mensuales.', 'CANACERO: asamblea general de marzo de 2026 y radiografía de la industria.', 'Reportes a la SEC de Ternium, Nucor, Steel Dynamics y Cleveland-Cliffs (2026).', 'Comunicados corporativos de ArcelorMittal, Nippon Steel, POSCO, Gerdau y Baosteel.', 'Prensa especializada: SteelOrbis, GMK Center, Reuters.']
};

S.ranking = [
  [1, 'China Baowu', 'China', 124.76, 'baowu'], [2, 'ArcelorMittal', 'Luxemburgo', 63.43, 'arcelormittal'], [3, 'Nippon Steel', 'Japón', 57.78, 'nippon'],
  [4, 'Ansteel', 'China', 57.61, 'ansteel'], [5, 'HBIS', 'China', 42.49, 'hbis'], [6, 'Shagang', 'China', 39.10, ''], [7, 'Jianlong', 'China', 38.02, ''],
  [8, 'POSCO', 'Corea del Sur', 37.36, 'posco'], [9, 'Delong', 'China', 32.03, ''], [10, 'Tata Steel', 'India', 30.46, 'tata'],
  [11, 'JSW Steel', 'India', 30.28, 'jsw'], [12, 'Shougang', 'China', 30.23, ''], [13, 'Jingye', 'China', 23.91, ''], [14, 'JFE Steel', 'Japón', 22.69, 'jfe'],
  [15, 'Hunan Steel', 'China', 22.60, ''], [16, 'Nucor', 'Estados Unidos', 22.33, 'nucor'], [17, 'Liuzhou Steel', 'China', 21.00, ''], [18, 'SAIL', 'India', 19.44, ''],
  [19, 'Shandong Steel', 'China', 18.26, ''], [20, 'Hyundai Steel', 'Corea del Sur', 17.95, ''], [22, 'Cleveland-Cliffs', 'Estados Unidos', 17.06, 'cliffs'],
  [24, 'Grupo Techint', 'Argentina', 16.30, 'techint'], [31, 'Gerdau', 'Brasil', 13.03, 'gerdau'], [40, 'Steel Dynamics', 'Estados Unidos', 10.70, 'sdi'], [47, 'thyssenkrupp', 'Alemania', 9.41, 'thyssenkrupp']
];

(function () {
  function E(o) { S.empresas.push(o); }

  /* ================= México y Grupo Techint ================= */
  E({ id: 'ternium', n: 'Ternium', reg: 'mx', pais: 'México, Brasil, Argentina', sede: 'Luxemburgo (corporativo); operación principal en Monterrey', fund: '2005', prod: 'Parte de las 16.3 Mt del Grupo Techint', ruta: 'Reducción directa y horno eléctrico en México; alto horno en Brasil y Argentina',
    res: 'El mayor productor de aceros planos de América Latina.',
    hist: ['1942: nace Hojalata y Lámina (Hylsa) en Monterrey, para fabricar corcholatas durante la guerra.', '1957: Hylsa arranca la primera planta industrial de reducción directa del mundo, el proceso HYL.', '2005: Techint compra Hylsamex y la une con Siderar (Argentina) y Sidor (Venezuela): nace Ternium. En 2006 se lista en Nueva York.', '2007: compra Grupo IMSA, líder en galvanizado y prepintado.', '2008: Venezuela nacionaliza Sidor.', '2013: inaugura el centro industrial de Pesquería, enfocado en lámina automotriz.', '2017: compra a thyssenkrupp la planta de planchón de Río de Janeiro, hoy Ternium Brasil.', '2021: arranca el laminador en caliente de Pesquería.', '2023: toma el control de Usiminas y anuncia la acería de Pesquería: horno eléctrico y módulo de reducción directa de 2.1 Mt, con inversión de 3 200 millones de dólares.'],
    lid: ['Paolo Rocca, presidente del consejo.', 'Máximo Vedoya, director general (CEO) desde 2018.'],
    acc: ['Techint Holdings: 65.03 %.', 'Tenaris: 11.46 %.', 'Público (NYSE: TX): ≈ 21 %.', 'Ambos accionistas de control pertenecen a San Faustin, la tenedora de la familia Rocca. Datos al 30 de junio de 2026.'],
    esp: ['Lámina en caliente, en frío, galvanizada, aluminio-zinc y prepintada.', 'Aceros para automotriz, línea blanca, construcción y energía.', 'Marcas en México: Zintro, Zintro Alum, Pintro, Losacero.', 'Largos en Puebla; minas de hierro en Colima, Jalisco y Michoacán.', 'Tenigal: galvanizado automotriz en sociedad con Nippon Steel.'],
    hoy: ['Las nuevas instalaciones de Pesquería concentran la inversión de 2026.', 'Integra aguas arriba para depender menos de planchón importado.', 'Central eléctrica de 900 MW en Pesquería que abastece a sus plantas.'] });

  E({ id: 'techint', n: 'Grupo Techint', reg: 'mx', pais: 'Argentina e Italia', sede: 'Buenos Aires y Milán; tenedora San Faustin en Luxemburgo', fund: '1945', prod: '16.3 Mt (lugar 24 mundial)', ruta: 'Grupo industrial',
    res: 'Grupo familiar ítalo-argentino dueño de Ternium y Tenaris.',
    hist: ['1945: Agostino Rocca funda en Milán la Compagnia Tecnica Internazionale y al año siguiente se establece en Argentina.', '1954: inicia Siderca en Campana, tubería sin costura.', '1992–1998: gana las privatizaciones de Somisa (Argentina), TAMSA (México) y Sidor (Venezuela); compra Dalmine (Italia).', '2002: agrupa su tubería en Tenaris. 2005: agrupa sus planos y largos en Ternium.'],
    lid: ['Paolo Rocca, nieto del fundador: presidente y CEO de Tenaris y presidente del consejo de Ternium.'],
    acc: ['San Faustin S.A., controlada por la fundación Rocca & Partners. No cotiza en bolsa.'],
    esp: ['Ternium: aceros planos y largos.', 'Tenaris: tubería para energía.', 'Tenova: tecnología siderúrgica, incluido el proceso de reducción directa HYL/Energiron.', 'Techint Ingeniería y Construcción, Tecpetrol (petróleo y gas) y Humanitas (hospitales).'],
    hoy: ['Cultura de carrera interna larga: sus directivos suelen entrar como jóvenes profesionales.'] });

  E({ id: 'tenaris', n: 'Tenaris (TAMSA)', reg: 'mx', pais: 'México, Argentina, Italia, Estados Unidos', sede: 'Luxemburgo; en México, Veracruz', fund: '2002 (TAMSA: 1952)', prod: 'Incluida en Grupo Techint', ruta: 'Horno eléctrico y laminación de tubo sin costura',
    res: 'Líder mundial en tubería sin costura para petróleo y gas.',
    hist: ['1952: se funda Tubos de Acero de México (TAMSA) en Veracruz.', '1993: Techint toma el control de TAMSA.', '2002: Siderca, TAMSA y Dalmine se fusionan en Tenaris.', '2006–2007: compra Maverick y Hydril (conexiones premium).', '2017: arranca la planta de Bay City, Texas. 2020: compra IPSCO Tubulars.'],
    lid: ['Paolo Rocca, presidente del consejo y CEO.'],
    acc: ['San Faustin: ≈ 60 %.', 'Público: Nueva York (TS), Milán y México.'],
    esp: ['OCTG: tubería de revestimiento y producción.', 'Conexiones premium TenarisHydril.', 'Tubería de línea, mecánica y para calderas.', 'Modelo Rig Direct: surte la tubería directo al pozo.'],
    hoy: ['Su ciclo sigue la actividad de perforación en Norteamérica y Medio Oriente.'] });

  E({ id: 'am-mexico', n: 'ArcelorMittal México', reg: 'mx', pais: 'México', sede: 'Lázaro Cárdenas, Michoacán', fund: '1992 (como Ispat Mexicana)', prod: 'Históricamente el mayor productor del país', ruta: 'Alto horno y convertidor; reducción directa y horno eléctrico',
    res: 'Complejo integrado en el Pacífico con puerto y minas propias.',
    hist: ['1976: arranca Siderúrgica Lázaro Cárdenas-Las Truchas (Sicartsa), empresa estatal.', '1992: Lakshmi Mittal compra en la privatización la planta de planos (Sicartsa II). Fue su entrada a Norteamérica.', '2006–2007: ya como ArcelorMittal, compra a Villacero la parte de largos.', '2021–2022: inaugura un laminador en caliente de 2.5 Mt con inversión de 1 000 millones de dólares.'],
    lid: ['Reporta a ArcelorMittal, que encabezan Lakshmi Mittal y Aditya Mittal.'],
    acc: ['Subsidiaria de ArcelorMittal.'],
    esp: ['Planchón de exportación y, desde 2022, rollo caliente.', 'Varilla y alambrón en Lázaro Cárdenas y Celaya.', 'Minas: Las Truchas y 50 % de Peña Colorada, en sociedad con Ternium.'],
    hoy: ['Sus paros por huelgas y bloqueos han movido la producción nacional en años recientes.'] });

  E({ id: 'deacero', n: 'DEACERO', reg: 'mx', pais: 'México', sede: 'Monterrey, Nuevo León', fund: '1952', prod: 'Mayor productor de largos y alambre del país', ruta: 'Horno eléctrico con chatarra',
    res: 'Empresa familiar líder en alambre, varilla y derivados.',
    hist: ['1952: inicia como fábrica de malla ciclónica en Monterrey.', 'Años 80 y 90: se integra hacia atrás con acerías en Saltillo y Celaya.', 'Hacia 2010: acería de perfiles en Ramos Arizpe.', 'Años recientes: nueva acería y tren de laminación en Ramos Arizpe, con inversión anunciada de 600 millones de dólares, y más patios de reciclaje.'],
    lid: ['Raúl Gutiérrez Muguerza, presidente del consejo.', 'La familia Gutiérrez ocupa las direcciones generales de negocio.'],
    acc: ['Familia Gutiérrez. Empresa privada, no cotiza.'],
    esp: ['Alambrón, alambre, malla, clavo, cercas, cable.', 'Varilla y perfiles comerciales.', 'Reciclaje: una de las mayores redes de acopio de chatarra del país.', 'Exporta a Estados Unidos; allá fabrica clavo y alambre.'],
    hoy: ['Promueve su acero como de bajas emisiones por ser 100 % chatarra.'] });

  E({ id: 'ahmsa', n: 'Altos Hornos de México (AHMSA)', reg: 'mx', pais: 'México', sede: 'Monclova, Coahuila', fund: '1942', prod: 'Sin operar desde 2023', ruta: 'Alto horno y convertidor',
    res: 'La mayor siderúrgica integrada del país, hoy en quiebra.',
    hist: ['1942: se funda en Monclova con participación del Estado.', '1991: se privatiza a favor de Grupo Acerero del Norte, de Alonso Ancira.', '1999: entra en suspensión de pagos, que dura casi dos décadas.', '2019: Ancira es detenido en España por el caso Agronitrogenados, la venta de una planta de fertilizantes a Pemex.', '2023: suspende operaciones por falta de capital y entra a concurso mercantil.', 'Noviembre de 2024: un juzgado declara la quiebra de AHMSA y de su filial Minera del Norte.', '2026: las subastas de activos, con base de 1 127 millones de dólares, no se concretan. En octubre el juzgado descarta al único postor y abre la vía de un consorcio de acreedores.'],
    lid: ['La administra el síndico de la quiebra, Víctor Manuel Aguilera Gómez.'],
    acc: ['En liquidación judicial. Los trabajadores tienen prioridad de pago.'],
    esp: ['Placa, lámina en caliente y en frío, hojalata y perfiles pesados.', 'Minas propias de hierro (Hércules) y carbón en Coahuila.'],
    hoy: ['Más de 13 000 trabajadores esperan liquidación.', 'Su ausencia retiró del mercado nacional casi toda la placa ancha y la hojalata locales.'] });

  E({ id: 'simec', n: 'Grupo Simec', reg: 'mx', pais: 'México, Estados Unidos, Brasil', sede: 'Guadalajara, Jalisco', fund: '', prod: '', ruta: 'Horno eléctrico con chatarra',
    res: 'Especialista en aceros especiales en barra (SBQ).',
    hist: ['2001: Industrias CH toma el control.', '2005: compra Republic Engineered Products en Ohio, hoy Republic Steel.', 'Luego suma plantas en San Luis Potosí, Tlaxcala, Mexicali y Brasil.'],
    lid: ['Rufino Vigil González, presidente del consejo de Industrias CH y de Simec.'],
    acc: ['Industrias CH, de la familia Vigil. Cotiza en la BMV y en NYSE American.'],
    esp: ['Barras de aceros especiales para autopartes y forja.', 'Varilla, perfiles comerciales y estructurales.'],
    hoy: [] });

  E({ id: 'otros-mx', n: 'Otros jugadores en México', reg: 'mx', pais: 'México', sede: '', fund: '', prod: '', ruta: '',
    res: 'Acerías medianas, relaminadores, tuberos y centros de servicio.',
    hist: [], lid: [], acc: [],
    esp: ['<b>Gerdau Corsa:</b> perfiles estructurales en Ciudad Sahagún y Tultitlán.', '<b>TYASA:</b> largos y planos por horno eléctrico en Ixtaczoquitlán, Veracruz.', '<b>Villacero:</b> procesamiento, tubería y comercialización desde Monterrey; fundada en 1955 por la familia Villarreal.', '<b>Prolamsa:</b> tubería estructural, mecánica y de conducción, con plantas en México y Estados Unidos.', '<b>Nucor-JFE Steel México:</b> galvanizado automotriz en Silao.', '<b>POSCO México:</b> galvanizado automotriz en Altamira.', '<b>Outokumpu Mexinox:</b> inoxidable laminado en frío en San Luis Potosí.', '<b>Frisa:</b> forja y anillos rolados en Nuevo León.', '<b>Centros de servicio y distribución:</b> Collado, Serviacero, Fortacero, entre muchos otros.'],
    hoy: [] });

  /* ================= Globales ================= */
  E({ id: 'baowu', n: 'China Baowu', reg: 'gl', pais: 'China', sede: 'Shanghái', fund: '2016 (Baosteel: 1978)', prod: '124.76 Mt', ruta: 'Alto horno y convertidor, principalmente',
    res: 'El mayor productor del mundo: casi el doble que el segundo.',
    hist: ['1958: arranca Wuhan Iron and Steel, primera gran acería de la República Popular.', '1978: se funda Baosteel en Shanghái con tecnología japonesa.', '2016: Baosteel y Wuhan se fusionan en Baowu.', '2019–2022: absorbe Magang, TISCO (inoxidable), Chongqing, Kunming, Xinyu y Sinosteel.'],
    lid: ['Hu Wangming, presidente del consejo y secretario del Partido desde 2023. En junio de 2026 asumió también la presidencia de la filial listada Baoshan Iron & Steel.'],
    acc: ['Estado chino, a través de la comisión de activos estatales (SASAC).'],
    esp: ['Lámina automotriz y acero eléctrico: el mayor productor de acero al silicio.', 'Inoxidable (TISCO), placa, rieles.', 'Minería propia en Australia y participación en Simandou, Guinea.'],
    hoy: ['Instrumento de Pekín para consolidar el sector y recortar capacidad.'] });

  E({ id: 'arcelormittal', n: 'ArcelorMittal', reg: 'gl', pais: 'Luxemburgo', sede: 'Luxemburgo', fund: '2006', prod: '63.43 Mt', ruta: 'Integrada y horno eléctrico',
    res: 'El mayor acerero fuera de China y el más global.',
    hist: ['1976: Lakshmi Mittal inicia en Indonesia con una mini-acería.', '1989–2005: crece comprando acerías estatales en Trinidad, México, Kazajistán, Europa del Este y Estados Unidos.', '2002: Arbed, Usinor y Aceralia forman Arcelor.', '2006: Mittal Steel adquiere Arcelor tras una oferta hostil.', '2019: compra Essar Steel en India junto con Nippon Steel (AM/NS India).', '2020: vende sus plantas de Estados Unidos a Cleveland-Cliffs.', '2025: se queda con el 100 % de la planta de Calvert, Alabama.'],
    lid: ['Lakshmi N. Mittal, presidente ejecutivo.', 'Aditya Mittal, director general (CEO) desde 2021.'],
    acc: ['Familia Mittal: cerca de 40 %.', 'El resto cotiza en Nueva York, Ámsterdam, París, Luxemburgo y España.'],
    esp: ['Lámina automotriz: patentes de estampado en caliente (Usibor).', 'Minería de hierro propia en Canadá, Brasil, Liberia y México.', 'Presencia industrial en Europa, Brasil, México, India y Norteamérica.'],
    hoy: ['Reorienta inversión hacia India, Brasil y Estados Unidos; Europa bajo presión de costos de energía y carbono.'] });

  E({ id: 'nippon', n: 'Nippon Steel', reg: 'gl', pais: 'Japón', sede: 'Tokio', fund: '1970 (origen: Yawata, 1901)', prod: '57.78 Mt', ruta: 'Alto horno y convertidor; hornos eléctricos en Estados Unidos',
    res: 'Líder tecnológico japonés; dueño de U.S. Steel desde 2025.',
    hist: ['1901: enciende el alto horno de la acería estatal de Yawata.', '1970: Yawata y Fuji se fusionan en Nippon Steel.', '2012: fusión con Sumitomo Metal.', 'Junio de 2025: cierra la compra de U.S. Steel por 14 900 millones de dólares, tras 18 meses de disputa política. El gobierno de Estados Unidos recibe una acción dorada con poder de veto.'],
    lid: ['Eiji Hashimoto, presidente del consejo y CEO.', 'Tadashi Imai, presidente y director de operaciones.'],
    acc: ['Capital disperso en la Bolsa de Tokio (5401); fideicomisos y bancos japoneses como principales tenedores.'],
    esp: ['Aceros automotrices de ultra alta resistencia.', 'Acero eléctrico de grano orientado.', 'Rieles, tubería sin costura, placa naval.', 'Socio de ArcelorMittal en AM/NS India y de Ternium en Tenigal.'],
    hoy: ['Se comprometió a invertir unos 11 000 millones de dólares en U.S. Steel a 2028.', 'Con U.S. Steel consolidada subió del cuarto al tercer lugar mundial.'] });

  E({ id: 'ussteel', n: 'U.S. Steel', reg: 'gl', pais: 'Estados Unidos', sede: 'Pittsburgh', fund: '1901', prod: 'Consolidada en Nippon Steel', ruta: 'Integrada; hornos eléctricos en Arkansas',
    res: 'El ícono del acero estadounidense, hoy filial de Nippon Steel.',
    hist: ['1901: J. P. Morgan fusiona Carnegie Steel y otras: nace la primera empresa de mil millones de dólares.', '2019–2021: compra Big River Steel, mini-acería de planos en Arkansas.', '2023: Nippon Steel ofrece 55 dólares por acción. El gobierno de Biden bloquea la operación en enero de 2025.', 'Junio de 2025: el gobierno de Trump la aprueba con un acuerdo de seguridad nacional y acción dorada.'],
    lid: ['David Burritt, CEO. El acuerdo exige director general y mayoría del consejo estadounidenses.'],
    acc: ['Nippon Steel: 100 % del capital económico.', 'Gobierno de Estados Unidos: acción dorada sin valor económico, con veto sobre cierres de plantas, cambio de sede y de nombre.'],
    esp: ['Lámina para automotriz, envases y construcción.', 'Minas de hierro en Minnesota.', 'Plantas: Gary, Mon Valley, Granite City, Big River; Košice en Eslovaquia.'],
    hoy: [] });

  E({ id: 'ansteel', n: 'Ansteel', reg: 'gl', pais: 'China', sede: 'Anshan, Liaoning', fund: '1948 (origen: 1916)', prod: '57.61 Mt', ruta: 'Alto horno y convertidor',
    res: 'La «cuna» de la siderurgia china moderna.',
    hist: ['1916: nace la acería de Anshan bajo administración japonesa.', '1948: se reorganiza como la primera gran siderúrgica de la nueva China.', '2010: absorbe Pangang. 2021: absorbe Benxi Steel.'],
    lid: ['Directivos designados por el Estado.'], acc: ['Estado chino (SASAC).'],
    esp: ['Rieles, placa naval, lámina automotriz.', 'Vanadio y titanio (Pangang).', 'Minas de hierro propias: una de las más integradas de China.'], hoy: [] });

  E({ id: 'hbis', n: 'HBIS', reg: 'gl', pais: 'China', sede: 'Shijiazhuang, Hebei', fund: '2008', prod: '42.49 Mt', ruta: 'Alto horno y convertidor',
    res: 'El campeón de Hebei, la provincia que más acero produce.',
    hist: ['2008: fusión de Tangsteel y Hansteel.', '2016: compra la acería de Smederevo, Serbia.'],
    lid: ['Directivos designados por el gobierno provincial.'], acc: ['Gobierno de la provincia de Hebei.'],
    esp: ['Lámina y placa para construcción, automotriz y línea blanca.', 'Planta de reducción directa con gas rico en hidrógeno, con tecnología Energiron.'], hoy: [] });

  E({ id: 'posco', n: 'POSCO', reg: 'gl', pais: 'Corea del Sur', sede: 'Seúl y Pohang', fund: '1968', prod: '37.36 Mt', ruta: 'Alto horno y convertidor; proceso FINEX',
    res: 'Referente mundial de eficiencia operativa.',
    hist: ['1968: el Estado funda Pohang Iron and Steel, dirigida por Park Tae-joon.', '1973: primer alto horno en Pohang. 1987: Gwangyang, hoy una de las mayores acerías del mundo.', '2000: privatización completa.', '2022: se reorganiza como holding, POSCO Holdings.'],
    lid: ['Chang In-hwa, presidente del grupo desde marzo de 2024.'],
    acc: ['Capital disperso; el fondo nacional de pensiones de Corea es el mayor accionista. Cotiza en Seúl y Nueva York.'],
    esp: ['Lámina automotriz, acero eléctrico, inoxidable.', 'Materiales para baterías: litio, cátodos y ánodos.', 'Desarrolla HyREX, reducción con hidrógeno en lecho fluidizado.', 'En México: línea de galvanizado en Altamira.'],
    hoy: ['Estrategia de dos pilares: acero y materiales para baterías.', 'Busca producir dentro de Norteamérica e India mediante sociedades.'] });

  E({ id: 'tata', n: 'Tata Steel', reg: 'gl', pais: 'India', sede: 'Bombay', fund: '1907', prod: '30.46 Mt', ruta: 'Alto horno y convertidor; transición a horno eléctrico en Reino Unido',
    res: 'La siderúrgica privada más antigua de Asia.',
    hist: ['1907: Jamsetji Tata funda la empresa; Jamshedpur produce acero desde 1912.', '2007: compra la anglo-holandesa Corus.', '2018: compra Bhushan Steel.', '2024: apaga los altos hornos de Port Talbot, Gales, para sustituirlos por un horno eléctrico.'],
    lid: ['N. Chandrasekaran, presidente del consejo.', 'T. V. Narendran, CEO y director general.'],
    acc: ['Tata Sons y empresas del grupo: cerca de un tercio. El resto, público.'],
    esp: ['Minas propias de hierro y carbón: de los costos más bajos del mundo en India.', 'Lámina automotriz, largos, tubería.', 'En Europa: IJmuiden (Países Bajos) y Port Talbot.'], hoy: [] });

  E({ id: 'jsw', n: 'JSW Steel', reg: 'gl', pais: 'India', sede: 'Bombay', fund: '1982', prod: '30.28 Mt', ruta: 'Alto horno y convertidor; proceso Corex',
    res: 'El de mayor crecimiento entre los grandes.',
    hist: ['1982: inicia con una planta relaminadora del grupo O. P. Jindal.', '1994 en adelante: construye Vijayanagar, hoy la mayor acería de India en un solo sitio.', 'Compra activos en Estados Unidos (Texas, Ohio) e Italia.'],
    lid: ['Sajjan Jindal, presidente del consejo.', 'Jayant Acharya, CEO.'],
    acc: ['Familia Jindal (grupo promotor): alrededor de 45 %.', 'JFE Steel: cerca de 15 %.'],
    esp: ['Planos recubiertos y prepintados, largos.', 'Los cuatro hermanos Jindal dirigen grupos separados: JSW, Jindal Steel, Jindal SAW y Jindal Stainless.'], hoy: [] });

  E({ id: 'jfe', n: 'JFE Steel', reg: 'gl', pais: 'Japón', sede: 'Tokio', fund: '2002', prod: '22.69 Mt', ruta: 'Alto horno y convertidor',
    res: 'Segundo acerero japonés.',
    hist: ['2002: fusión de NKK y Kawasaki Steel.', '2023: apaga el alto horno de Keihin y concentra producción en el oeste de Japón.'],
    lid: [], acc: ['JFE Holdings, de capital disperso en Tokio.'],
    esp: ['Lámina automotriz, placa, tubería.', 'Socio de Nucor en galvanizado en Silao y accionista de JSW Steel.'], hoy: [] });

  E({ id: 'nucor', n: 'Nucor', reg: 'gl', pais: 'Estados Unidos', sede: 'Charlotte, Carolina del Norte', fund: '1905 (acerera desde 1969)', prod: '22.33 Mt', ruta: 'Horno eléctrico con chatarra y hierro esponja',
    res: 'El mayor acerero y reciclador de Estados Unidos; inventor del modelo mini-acería.',
    hist: ['1965: Ken Iverson toma una empresa en quiebra, Nuclear Corporation of America, y la enfoca en vigas ligeras Vulcraft.', '1969: construye su primera mini-acería en Darlington para surtirse de barra.', '1989: Crawfordsville, primera planta del mundo de colada de planchón delgado. Las mini-acerías entran al mercado de planos.', '2008: compra al chatarrero David J. Joseph.', '2020 en adelante: nuevas plantas de placa y de lámina.'],
    lid: ['Leon Topalian, presidente del consejo y CEO desde 2020.', 'Stephen Laxton, presidente y director de operaciones desde enero de 2026.'],
    acc: ['Capital disperso (NYSE: NUE): fondos institucionales como Vanguard, BlackRock y State Street.'],
    esp: ['La línea más amplia de Norteamérica: barras, vigas, lámina, placa, tubo, vigas ligeras, edificios metálicos.', 'Plantas de reducción directa en Luisiana y Trinidad.', 'Cultura: bonos por producción y política de no despidos.', 'En México: galvanizado automotriz con JFE en Silao.'], hoy: [] });

  E({ id: 'cliffs', n: 'Cleveland-Cliffs', reg: 'gl', pais: 'Estados Unidos', sede: 'Cleveland, Ohio', fund: '1847', prod: '17.06 Mt', ruta: 'Integrada, con pélet y HBI propios',
    res: 'De minera de hierro a mayor productor de planos de Norteamérica.',
    hist: ['1847: nace como minera en la región de los Grandes Lagos.', '2020: compra AK Steel y ArcelorMittal USA.', '2024: compra la canadiense Stelco.'],
    lid: ['Lourenco Goncalves, presidente del consejo y CEO desde 2014.', 'Celso Goncalves, su hijo, presidente y director financiero desde julio de 2026.'],
    acc: ['Capital disperso (NYSE: CLF).'],
    esp: ['Principal proveedor de lámina a la industria automotriz de Estados Unidos.', 'Único productor estadounidense de acero eléctrico.', 'Integración completa: minas, pélet, HBI, acerías y estampado.'],
    hoy: ['Defensor abierto de los aranceles de la Sección 232.'] });

  E({ id: 'sdi', n: 'Steel Dynamics', reg: 'gl', pais: 'Estados Unidos', sede: 'Fort Wayne, Indiana', fund: '1993', prod: '10.70 Mt', ruta: 'Horno eléctrico con chatarra',
    res: 'La mini-acería más rentable de su generación.',
    hist: ['1993: la fundan Keith Busse, Mark Millett y Richard Teets, exdirectivos de Nucor.', '2007: compra al reciclador OmniSource.', '2014: compra la planta de Columbus, Misisipi.', '2021: arranca Sinton, Texas, orientada también al mercado mexicano.', '2025: entra a la laminación de aluminio.'],
    lid: ['Mark Millett, CEO hasta el 31 de diciembre de 2026; pasa a presidente ejecutivo del consejo.', 'Theresa Wagler, hoy directora financiera, asume como CEO el 1 de enero de 2027.'],
    acc: ['Capital disperso (NASDAQ: STLD).'],
    esp: ['Lámina, vigas, rieles, barras especiales.', 'Reciclaje de metales y fabricación de vigas ligeras.'], hoy: [] });

  E({ id: 'gerdau', n: 'Gerdau', reg: 'gl', pais: 'Brasil', sede: 'São Paulo', fund: '1901', prod: '13.03 Mt', ruta: 'Horno eléctrico con chatarra; integrada en Ouro Branco',
    res: 'El mayor productor de aceros largos de América.',
    hist: ['1901: João Gerdau compra una fábrica de clavos en Porto Alegre.', '1948: entra a la siderurgia con la Riograndense.', '1989–2007: se expande a Canadá y Estados Unidos (Ameristeel, Chaparral).', '2007: llega a México; después forma Gerdau Corsa.', '2018: Gustavo Werneck es el primer CEO ajeno a la familia.'],
    lid: ['Gustavo Werneck, CEO desde 2018.', 'La familia Gerdau Johannpeter preside el consejo.'],
    acc: ['Metalúrgica Gerdau, controlada por la familia Gerdau Johannpeter. Cotiza en São Paulo y Nueva York.'],
    esp: ['Varilla, perfiles, alambrón.', 'Aceros especiales para la industria automotriz.', 'Mayor reciclador de chatarra de América Latina.'],
    hoy: ['Desplaza inversión de Brasil hacia Estados Unidos ante la presión de importaciones.'] });

  E({ id: 'thyssenkrupp', n: 'thyssenkrupp Steel', reg: 'gl', pais: 'Alemania', sede: 'Duisburgo', fund: '1999 (Krupp: 1811; Thyssen: 1891)', prod: '9.41 Mt', ruta: 'Alto horno y convertidor; reducción directa en construcción',
    res: 'El mayor acerero alemán, en venta y reestructura.',
    hist: ['1811: Friedrich Krupp funda su fábrica en Essen. 1891: August Thyssen inicia en Duisburgo.', '1999: fusión Thyssen-Krupp.', '2019: Bruselas veta la fusión con Tata Steel Europe.', 'Septiembre de 2025: Jindal Steel International, del grupo de Naveen Jindal, presenta oferta por la división de acero.', '2026: las partes negocian una venta por etapas; los pasivos de pensiones son el principal obstáculo.'],
    lid: ['Miguel López, CEO de thyssenkrupp AG, el corporativo vendedor.'],
    acc: ['thyssenkrupp AG.'],
    esp: ['Lámina automotriz, hojalata (Rasselstein), acero eléctrico.', 'Proyecto de reducción directa con hidrógeno en Duisburgo.'],
    hoy: ['Plan de recorte de capacidad y de miles de empleos.'] });

  E({ id: 'ssab', n: 'SSAB', reg: 'gl', pais: 'Suecia', sede: 'Estocolmo', fund: '1978', prod: '', ruta: 'Integrada en transición a horno eléctrico',
    res: 'Pionero del acero sin combustibles fósiles.',
    hist: ['1978: el Estado sueco fusiona tres acerías.', '2014: compra la finlandesa Rautaruukki.', '2016: lanza HYBRIT con la minera LKAB y la eléctrica Vattenfall.', '2021: entrega el primer acero hecho con hierro reducido con hidrógeno.'],
    lid: [], acc: ['La minera estatal sueca LKAB y el Estado finlandés (Solidium) son los mayores accionistas.'],
    esp: ['Placa antidesgaste Hardox y estructural de ultra alta resistencia Strenx.', 'Mini-acerías de placa en Alabama y Iowa.'], hoy: [] });

  /* ================= Cadena ================= */
  E({ id: 'mineras', n: 'Mineras de hierro', reg: 'ca', pais: 'Australia, Brasil', sede: '', fund: '', prod: '', ruta: '',
    res: 'Cuatro empresas dominan el mineral que se comercia por mar.',
    hist: [], lid: [], acc: [],
    esp: ['<b>Vale</b> (Brasil): Carajás, el mineral de mayor ley; primer productor de pélets.', '<b>Rio Tinto</b> (Reino Unido y Australia): Pilbara; socio en Simandou, Guinea.', '<b>BHP</b> (Australia): Pilbara; también carbón metalúrgico.', '<b>Fortescue</b> (Australia): Pilbara.', '<b>LKAB</b> (Suecia): pélets de magnetita de alta ley para Europa.'],
    hoy: ['El precio se fija sobre el índice 62 % Fe entregado en China.', 'El mineral de alta ley para reducción directa es escaso y paga prima.'] });

  E({ id: 'tecnologos', n: 'Proveedores de tecnología', reg: 'ca', pais: 'Alemania, Italia, Reino Unido, Estados Unidos', sede: '', fund: '', prod: '', ruta: '',
    res: 'Pocas empresas diseñan casi todas las acerías del mundo.',
    hist: [], lid: [], acc: [],
    esp: ['<b>SMS group</b> (Alemania): laminadores, colada de planchón delgado CSP, altos hornos (Paul Wurth). Propiedad de la familia Weiss.', '<b>Danieli</b> (Italia): mini-acerías llave en mano; familia Benedetti.', '<b>Primetals Technologies</b> (Reino Unido): de Mitsubishi Heavy Industries.', '<b>Tenova</b> (Grupo Techint): hornos eléctricos y reducción directa HYL/Energiron, esta última con Danieli.', '<b>Midrex</b> (Estados Unidos): de Kobe Steel; su proceso produce más de la mitad del hierro esponja mundial.'],
    hoy: [] });

  E({ id: 'insumos', n: 'Chatarra, electrodos y refractarios', reg: 'ca', pais: '', sede: '', fund: '', prod: '', ruta: '',
    res: 'Los insumos que definen el costo del horno eléctrico.',
    hist: [], lid: [], acc: [],
    esp: ['<b>Chatarra:</b> Estados Unidos y la Unión Europea exportan; Turquía es el mayor importador. Grados: HMS, triturada (shredded), paca y recorte industrial (busheling).', '<b>Electrodos de grafito:</b> GrafTech (con planta en Monterrey), Resonac y Tokai Carbon. Se fabrican con coque aguja.', '<b>Refractarios:</b> RHI Magnesita y Vesuvius.', '<b>Ferroaleaciones:</b> ferromanganeso, ferrosilicio, ferrocromo y ferroniobio; este último casi todo de Brasil.'],
    hoy: [] });
})();

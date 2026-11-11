/* Plantas principales por empresa: dónde están y qué hace cada una.
   Formato: una cadena sola abre un grupo (país o tipo); un arreglo es [planta, ubicación, qué hace].
   Lista de plantas principales, no exhaustiva. Estado a noviembre de 2026. */
S.plantas = {
  ternium: [
    'México',
    ['Centro Industrial Ternium', 'Pesquería, Nuevo León', 'Laminador en caliente de 4.4 Mt, decapado y laminación en frío, galvanizado (incluye Tenigal, con Nippon Steel), pintado y centro de acabado. El segundo laminador en frío y la segunda línea de galvanizado arrancaron en febrero de 2026. Enfoque automotriz. En construcción: acería eléctrica con módulo de reducción directa para 2.6 Mt de planchón, con arranque previsto entre fines de 2026 e inicios de 2027.'],
    ['Planta Guerrero', 'San Nicolás de los Garza, Nuevo León', 'Reducción directa HYL, acería eléctrica y laminación en caliente de planchón delgado; decapado, laminación en frío y tubería con costura. Unos 2.4 Mt de acero crudo al año.'],
    ['Planta Churubusco', 'Monterrey, Nuevo León', 'Laminación en caliente a partir de planchón, decapado y laminación en frío. Incluye centro de servicio.'],
    ['Planta Universidad', 'San Nicolás de los Garza, Nuevo León', 'Galvanizado y aceros recubiertos para construcción e industria.'],
    ['Planta Juventud', 'San Nicolás de los Garza, Nuevo León', 'Galvanizado, pintado, perfiles y lámina formada.'],
    ['Planta Monclova', 'Monclova, Coahuila', 'Aceros recubiertos y productos formados.'],
    ['Planta Largos Puebla', 'San Miguel Xoxtla, Puebla', 'Reducción directa, acería eléctrica y laminación de varilla y alambrón.'],
    ['Planta Largos Apodaca', 'Apodaca, Nuevo León', 'Laminación de varilla y productos largos.'],
    ['Edificios Metálicos', 'Nuevo León', 'Estructuras y edificios metálicos prediseñados.'],
    ['Peña Colorada', 'Minatitlán y Manzanillo, Colima', 'Mina de hierro y planta peletizadora. Propiedad a partes iguales con ArcelorMittal.'],
    ['Las Encinas', 'Colima, Jalisco y Michoacán', 'Minas de hierro y planta peletizadora en Alzada, Colima.'],
    ['Centros de servicio', 'Apodaca, San Nicolás y San Luis Potosí', 'Corte longitudinal, corte a medida y procesamiento para clientes industriales.'],
    'Brasil',
    ['Ternium Brasil', 'Santa Cruz, Río de Janeiro', 'Planta integrada: coquería, sinterización, dos altos hornos, convertidores y colada continua. Produce planchón de alta calidad, en buena parte para las laminadoras de México. Tiene puerto y termoeléctrica propios.'],
    ['Usiminas Ipatinga', 'Ipatinga, Minas Gerais', 'Planta integrada: placa gruesa, lámina en caliente, en frío y galvanizada para automotriz, naval y maquinaria.'],
    ['Usiminas Cubatão', 'Cubatão, São Paulo', 'Laminación en caliente y en frío a partir de planchón comprado; el área de altos hornos está parada desde 2016.'],
    'Argentina',
    ['Planta General Savio', 'San Nicolás, Buenos Aires', 'Planta integrada: coquería, altos hornos, convertidores, laminación en caliente, en frío y hojalata.'],
    ['Ensenada', 'Ensenada, Buenos Aires', 'Laminación en frío con rollos calientes de San Nicolás.'],
    ['Canning y Haedo', 'Provincia de Buenos Aires', 'Galvanizado, prepintado (Canning), corte y perfilado.'],
    ['Florencio Varela', 'Provincia de Buenos Aires', 'Electrogalvanizado y procesamiento para automotriz.'],
    ['Rosario y San Luis', 'Santa Fe y San Luis', 'Tubos con costura para construcción.'],
    'Colombia, Estados Unidos y Centroamérica',
    ['Manizales', 'Caldas, Colombia', 'Acería eléctrica y laminación de largos.'],
    ['Palmar de Varela', 'Atlántico, Colombia', 'Laminador de varilla y rollos de 520 000 t, inaugurado en 2020.'],
    ['Shreveport', 'Luisiana, Estados Unidos', 'Galvanizado y pintado de lámina.'],
    ['Villa Nueva', 'Guatemala', 'Galvanizado, perfilado y centro de servicio.']
  ],
  tenaris: [
    ['TAMSA', 'Veracruz, México', 'Acería eléctrica, laminación de tubo sin costura, tratamiento térmico y roscado premium. También componentes automotrices y un centro de investigación.'],
    ['Siderca', 'Campana, Argentina', 'Reducción directa, acería eléctrica y tubo sin costura. La planta de origen del grupo.'],
    ['Dalmine', 'Bérgamo, Italia', 'Acería eléctrica y tubo sin costura para energía, mecánica y cilindros.'],
    ['Bay City', 'Texas, Estados Unidos', 'Laminador de tubo sin costura inaugurado en 2017, con tratamiento térmico y roscado.'],
    ['Koppel y Ambridge', 'Pensilvania, Estados Unidos', 'Acería eléctrica en Koppel y laminación sin costura en Ambridge.'],
    ['Hickman', 'Arkansas, Estados Unidos', 'Tubería con costura (ERW) para pozos y conducción.'],
    ['Algoma Tubes', 'Sault Ste. Marie, Canadá', 'Tubo sin costura.'],
    ['Silcotub', 'Călărași y Zalău, Rumania', 'Acería eléctrica y tubo sin costura de diámetros pequeños.'],
    ['Confab', 'Pindamonhangaba, Brasil', 'Tubería con costura de gran diámetro para ductos.']
  ],
  'am-mexico': [
    ['Lázaro Cárdenas, planos', 'Michoacán', 'Reducción directa, hornos eléctricos y colada de planchón. Laminador en caliente desde 2021–2022.'],
    ['Lázaro Cárdenas, largos', 'Michoacán', 'Alto horno, convertidores y colada de palanquilla; laminación de varilla y alambrón.'],
    ['Peletizadora y puerto', 'Lázaro Cárdenas, Michoacán', 'Pélet para consumo propio y terminal marítima para planchón y materias primas.'],
    ['Celaya', 'Guanajuato', 'Laminación de varilla.'],
    ['Las Truchas y Peña Colorada', 'Michoacán y Colima', 'Minas de hierro; Peña Colorada es 50 % de ArcelorMittal y 50 % de Ternium.']
  ],
  deacero: [
    ['Acería Celaya', 'Villagrán, Guanajuato', 'Acería eléctrica y laminación: 2.9 Mt de acero líquido. Varilla, alambrón y barras. Opera desde 1998 y es la mayor del grupo.'],
    ['Acería Saltillo', 'Saltillo, Coahuila', 'La primera miniacería del grupo (1985). Alambrón y varilla.'],
    ['Acería Ramos Arizpe', 'Ramos Arizpe, Coahuila', 'Acería eléctrica y laminación de perfiles comerciales y estructurales desde 2013. En construcción Ramos II: nueva acería y tren para perfiles de hasta 27 pulgadas.'],
    ['Plantas de alambres', 'Guadalupe (N. L.), Celaya, Morelia, Querétaro, Mexicali y otras', 'Trefilado, galvanizado de alambre, malla, clavo, cercas, cable y alambres industriales.'],
    ['Estados Unidos', 'Dos plantas', 'Clavo para pistola, cable y malla.'],
    ['Patios de reciclaje', 'Más de 20 en México', 'Acopio y procesamiento de chatarra para las tres acerías.']
  ],
  ahmsa: [
    ['Siderúrgicas 1 y 2', 'Monclova, Coahuila', 'Altos hornos, convertidores, colada continua, laminación de placa, tira en caliente, lámina en frío, hojalata y perfiles pesados. Paradas desde 2023.'],
    ['Cerro de Mercado y Hércules', 'Durango y Coahuila', 'Minas de hierro; el concentrado de Hércules llegaba a Monclova por ferroducto.'],
    ['Minas de carbón', 'Región carbonífera de Coahuila', 'Carbón metalúrgico para coque y carbón térmico.']
  ],
  simec: [
    'México',
    ['Guadalajara', 'Jalisco', 'Miniacería: perfiles estructurales y varilla.'],
    ['Mexicali', 'Baja California', 'Miniacería: varilla y perfiles.'],
    ['Apizaco', 'Tlaxcala', 'Dos miniacerías de aceros especiales en barra para automotriz. La más nueva, de 600 000 t, absorbió la producción de Ohio.'],
    ['San Luis Potosí', 'San Luis Potosí', 'Dos miniacerías: varilla y perfiles ligeros.'],
    ['Cholula', 'Puebla', 'Acabado en frío de barras.'],
    'Estados Unidos (Republic Steel)',
    ['Lorain, Massillon y Solon', 'Ohio', 'Laminación y acabado en frío de barras especiales.'],
    ['Canton y Lackawanna', 'Ohio y Nueva York', 'Acería y laminación cerradas en 2023; su producción pasó a Tlaxcala.'],
    'Brasil',
    ['Pindamonhangaba', 'São Paulo', 'Miniacería y laminación de varilla y alambrón.'],
    ['Cariacica e Itaúna', 'Espírito Santo y Minas Gerais', 'Miniacería y laminación de largos.']
  ],
  baowu: [
    ['Baoshan', 'Shanghái', 'Planta insignia: lámina automotriz, acero eléctrico, hojalata y tubería.'],
    ['Zhanjiang', 'Guangdong', 'Planta costera nueva, integrada, orientada al sur de China y la exportación.'],
    ['Wuhan (Qingshan)', 'Hubei', 'Acero al silicio, placa y lámina automotriz.'],
    ['Meishan', 'Nankín, Jiangsu', 'Lámina en caliente y recubiertos.'],
    ['Ma’anshan', 'Anhui', 'Ruedas de ferrocarril, perfiles H y lámina.'],
    ['Taiyuan (TISCO)', 'Shanxi', 'El mayor complejo de acero inoxidable del grupo.'],
    ['Otras bases', 'Chongqing, Shaoguan, Echeng, Xinjiang', 'Largos, placa y productos regionales.']
  ],
  arcelormittal: [
    'Europa',
    ['Gante', 'Bélgica', 'Integrada; lámina automotriz. Proyectos de captura y uso de carbono.'],
    ['Dunkerque y Fos-sur-Mer', 'Francia', 'Integradas costeras: rollo caliente y lámina.'],
    ['Bremen y Eisenhüttenstadt', 'Alemania', 'Integradas de planos.'],
    ['Asturias y Sestao', 'España', 'Integrada en Gijón y Avilés (planos, rieles, alambrón); miniacería de planos en Sestao.'],
    ['Dąbrowa Górnicza y Cracovia', 'Polonia', 'Integrada: largos, rieles y planos.'],
    ['Kryvyi Rih', 'Ucrania', 'Integrada con minas propias; largos.'],
    'América',
    ['Dofasco', 'Hamilton, Canadá', 'Planos automotrices; en transición de alto horno a reducción directa y horno eléctrico.'],
    ['Calvert', 'Alabama, Estados Unidos', 'Laminación en caliente, en frío y galvanizado; nueva acería eléctrica.'],
    ['Tubarão', 'Vitória, Brasil', 'Integrada: planchón y rollo caliente.'],
    ['Vega', 'São Francisco do Sul, Brasil', 'Laminación en frío y galvanizado automotriz.'],
    ['Pecém', 'Ceará, Brasil', 'Integrada de planchón, comprada en 2023.'],
    ['Lázaro Cárdenas', 'Michoacán, México', 'Planos y largos. Ver ArcelorMittal México.'],
    'Asia y minería',
    ['AM/NS India', 'Hazira, Gujarat', 'Integrada con reducción directa; sociedad 60/40 con Nippon Steel.'],
    ['Minas', 'Quebec, Liberia, Brasil', 'Mineral de hierro para consumo propio y venta.']
  ],
  nippon: [
    ['Kimitsu y Kashima (Este de Japón)', 'Chiba e Ibaraki', 'Integradas: lámina automotriz, placa, alambrón y tubería.'],
    ['Nagoya', 'Aichi', 'Integrada junto al corazón automotriz de Japón: lámina de alta resistencia.'],
    ['Yawata y Oita (Kyushu)', 'Fukuoka y Oita', 'Yawata: rieles y acero eléctrico. Oita: placa y rollo caliente con algunos de los mayores altos hornos del mundo.'],
    ['Hirohata (Setouchi)', 'Hyogo', 'Acero eléctrico y hojalata.'],
    ['Wakayama (Kansai)', 'Wakayama', 'Tubería sin costura.'],
    ['Muroran (Norte de Japón)', 'Hokkaido', 'Barras y alambrón especiales para automotriz.'],
    ['En el exterior', 'Estados Unidos, India, Tailandia, Suecia', 'U.S. Steel; AM/NS India (40 %); G Steel en Tailandia; Ovako, aceros especiales en Suecia.']
  ],
  ussteel: [
    ['Gary Works', 'Indiana', 'La mayor planta integrada del grupo: lámina en caliente, en frío y recubierta.'],
    ['Mon Valley Works', 'Pensilvania', 'Coquería de Clairton, acería Edgar Thomson y laminación en Irvin.'],
    ['Granite City Works', 'Illinois', 'Integrada de planos.'],
    ['Big River Steel', 'Osceola, Arkansas', 'Dos miniacerías de planos con hornos eléctricos; acero eléctrico no orientado y galvanizado.'],
    ['Fairfield', 'Alabama', 'Horno eléctrico y tubería sin costura.'],
    ['Midwest y Great Lakes', 'Indiana y Michigan', 'Acabado: estañado, galvanizado y laminación en frío.'],
    ['Minntac y Keetac', 'Minnesota', 'Minas de hierro y peletizadoras.'],
    ['U. S. Steel Košice', 'Eslovaquia', 'Integrada de planos para Europa central.']
  ],
  ansteel: [
    ['Anshan', 'Liaoning', 'Base histórica: planos, rieles, perfiles.'],
    ['Bayuquan', 'Yingkou, Liaoning', 'Planta costera: placa gruesa y lámina.'],
    ['Benxi', 'Liaoning', 'Integrada: lámina automotriz y aceros especiales.'],
    ['Panzhihua y Xichang', 'Sichuan', 'Mineral con vanadio y titanio: rieles, vanadio, titanio.'],
    ['Chaoyang', 'Liaoning', 'Planos.']
  ],
  hbis: [
    ['Tangsteel', 'Tangshan, Hebei', 'Planos; planta nueva en la costa de Laoting.'],
    ['Hansteel', 'Handan, Hebei', 'Planos y placa.'],
    ['Xuanhua', 'Zhangjiakou, Hebei', 'Reducción directa con gas rico en hidrógeno y aceros especiales.'],
    ['Chengsteel', 'Chengde, Hebei', 'Aceros con vanadio y titanio; largos.'],
    ['Wuyang', 'Henan', 'Placa gruesa especial.'],
    ['HBIS Serbia', 'Smederevo, Serbia', 'Integrada de planos.']
  ],
  posco: [
    ['Pohang', 'Corea del Sur', 'Integrada: placa, alambrón, acero eléctrico e inoxidable. Plantas FINEX.'],
    ['Gwangyang', 'Corea del Sur', 'Una de las mayores acerías del mundo en un solo sitio: lámina automotriz.'],
    ['Krakatau POSCO', 'Cilegon, Indonesia', 'Integrada de planchón y placa, en sociedad con Krakatau Steel.'],
    ['POSCO Maharashtra', 'India', 'Laminación en frío y galvanizado automotriz.'],
    ['POSCO México', 'Altamira, Tamaulipas', 'Galvanizado continuo para automotriz.'],
    ['POSCO Vietnam', 'Vietnam', 'Laminación en frío y perfiles.']
  ],
  tata: [
    'India',
    ['Jamshedpur', 'Jharkhand', 'Integrada histórica: planos y largos.'],
    ['Kalinganagar', 'Odisha', 'Integrada moderna, ampliada a 8 Mt: planos de alta resistencia.'],
    ['Meramandali', 'Odisha', 'Integrada de planos, antes Bhushan Steel.'],
    ['Neelachal', 'Odisha', 'Largos.'],
    'Europa y Asia',
    ['IJmuiden', 'Países Bajos', 'Integrada costera: lámina automotriz y acero para envases.'],
    ['Port Talbot', 'Gales, Reino Unido', 'Laminación; horno eléctrico en construcción tras apagar los altos hornos en 2024.'],
    ['Tata Steel Thailand', 'Tailandia', 'Miniacerías de largos.']
  ],
  jsw: [
    ['Vijayanagar', 'Karnataka, India', 'La mayor acería de India en un sitio: planos y largos.'],
    ['Dolvi', 'Maharashtra, India', 'Integrada costera de planos, con reducción directa y planchón delgado.'],
    ['Salem', 'Tamil Nadu, India', 'Aceros especiales largos.'],
    ['Jharsuguda (BPSL)', 'Odisha, India', 'Integrada de planos.'],
    ['Vasind, Tarapur, Kalmeshwar', 'Maharashtra, India', 'Laminación en frío, galvanizado y prepintado.'],
    ['Baytown y Mingo Junction', 'Texas y Ohio, Estados Unidos', 'Placa y tubería en Baytown; horno eléctrico y rollo caliente en Mingo Junction.'],
    ['Piombino', 'Italia', 'Rieles y largos.']
  ],
  jfe: [
    ['Kurashiki y Fukuyama (Oeste de Japón)', 'Okayama e Hiroshima', 'Las dos integradas principales: lámina automotriz, placa, perfiles.'],
    ['Chiba y Keihin (Este de Japón)', 'Chiba y Kanagawa', 'Chiba: integrada, inoxidable y lámina. Keihin: laminación, sin alto horno desde 2023.'],
    ['Chita', 'Aichi', 'Tubería.'],
    ['Sendai', 'Miyagi', 'Horno eléctrico: barras y alambrón.']
  ],
  nucor: [
    'Lámina',
    ['Crawfordsville', 'Indiana', 'La primera miniacería de planchón delgado del mundo (1989).'],
    ['Hickman', 'Arkansas', 'Lámina en caliente, en frío y galvanizada; grados automotrices.'],
    ['Berkeley', 'Carolina del Sur', 'Lámina y vigas.'],
    ['Decatur', 'Alabama', 'Lámina en caliente, en frío y galvanizada.'],
    ['Gallatin', 'Kentucky', 'Rollo caliente y decapado.'],
    ['West Virginia', 'Apple Grove, Virginia Occidental', 'Nueva planta de lámina de 3 Mt.'],
    'Placa, vigas y barras',
    ['Hertford, Tuscaloosa y Brandenburg', 'Carolina del Norte, Alabama y Kentucky', 'Placa; Brandenburg arrancó en 2022–2023.'],
    ['Nucor-Yamato', 'Blytheville, Arkansas', 'Vigas de patín ancho; sociedad con Yamato Kogyo.'],
    ['Barras', 'Más de una docena de plantas, de Darlington a Seattle', 'Varilla, barra comercial y barras especiales.'],
    'Insumos y México',
    ['Reducción directa', 'Convent, Luisiana, y Trinidad', 'Hierro esponja para diluir residuales de la chatarra.'],
    ['Nucor-JFE Steel México', 'Silao, Guanajuato', 'Galvanizado automotriz.']
  ],
  cliffs: [
    'Acerías integradas',
    ['Indiana Harbor', 'East Chicago, Indiana', 'La mayor planta integrada de Norteamérica: planos.'],
    ['Burns Harbor', 'Indiana', 'Planos y placa.'],
    ['Cleveland Works', 'Ohio', 'Rollo caliente y lámina.'],
    ['Middletown Works', 'Ohio', 'Lámina automotriz recubierta.'],
    ['Dearborn Works', 'Michigan', 'Lámina automotriz y galvanizado.'],
    ['Stelco: Lake Erie y Hamilton', 'Ontario, Canadá', 'Integrada en Lake Erie; coque y recubrimientos en Hamilton.'],
    'Hornos eléctricos y acabado',
    ['Butler Works y Zanesville', 'Pensilvania y Ohio', 'Acero eléctrico de grano orientado y no orientado; inoxidable.'],
    ['Mansfield', 'Ohio', 'Inoxidable y aceros especiales.'],
    ['Coatesville', 'Pensilvania', 'Placa especial.'],
    ['Rockport', 'Indiana', 'Laminación en frío y galvanizado.'],
    ['Weirton, Steelton, Riverdale, Conshohocken', 'Varias', 'Paradas entre 2024 y 2025 (hojalata, rieles, rollo caliente y placa).'],
    'Materias primas',
    ['Minas y peletizadoras', 'Minnesota y Michigan', 'Hibbing, Minorca, United Taconite, Northshore y Tilden.'],
    ['Toledo', 'Ohio', 'Planta de HBI.']
  ],
  sdi: [
    ['Butler', 'Indiana', 'Planos: la planta de origen (1996).'],
    ['Columbus', 'Misisipi', 'Planos; junto a ella, el nuevo laminador de aluminio.'],
    ['Sinton', 'Texas', 'Planos, 3 Mt; orientada también al mercado mexicano.'],
    ['Columbia City', 'Indiana', 'Vigas, perfiles estructurales y rieles.'],
    ['Pittsboro', 'Indiana', 'Barras especiales.'],
    ['Roanoke y Huntington', 'Virginia y Virginia Occidental', 'Barra comercial y perfiles especiales.'],
    ['The Techs y Heartland', 'Pensilvania e Indiana', 'Galvanizado y laminación en frío.'],
    ['San Luis Potosí', 'México', 'Planchón de aluminio reciclado para el laminador de Columbus.']
  ],
  gerdau: [
    'Brasil',
    ['Ouro Branco', 'Minas Gerais', 'Integrada: perfiles estructurales, alambrón, rollo caliente y placa.'],
    ['Cosigua', 'Río de Janeiro', 'Miniacería de largos.'],
    ['Riograndense', 'Sapucaia do Sul, Rio Grande do Sul', 'Miniacería de largos; la primera del grupo.'],
    ['Charqueadas, Pindamonhangaba, Mogi das Cruzes', 'Rio Grande do Sul y São Paulo', 'Aceros especiales para automotriz.'],
    'Norteamérica',
    ['Midlothian y Petersburg', 'Texas y Virginia', 'Perfiles estructurales.'],
    ['Monroe y Fort Smith', 'Michigan y Arkansas', 'Barras especiales.'],
    ['Whitby y Cambridge', 'Ontario, Canadá', 'Varilla y barra comercial.'],
    'México y resto de América',
    ['Gerdau Corsa Sahagún', 'Ciudad Sahagún, Hidalgo', 'Acería eléctrica y perfiles estructurales.'],
    ['Tultitlán y La Presa', 'Estado de México', 'Varilla y perfiles comerciales.'],
    ['Argentina, Perú, Uruguay', 'Santa Fe, Chimbote, Montevideo', 'Miniacerías y laminación de largos.']
  ],
  thyssenkrupp: [
    ['Duisburgo', 'Renania del Norte-Westfalia', 'Corazón integrado: altos hornos, convertidores, colada y laminación en caliente. Aquí se construye la planta de reducción directa.'],
    ['Bochum', 'Renania del Norte-Westfalia', 'Laminación en caliente y en frío; acero eléctrico no orientado.'],
    ['Dortmund', 'Renania del Norte-Westfalia', 'Laminación en frío y galvanizado automotriz.'],
    ['Andernach (Rasselstein)', 'Renania-Palatinado', 'Hojalata: una de las mayores plantas del mundo.'],
    ['Gelsenkirchen', 'Renania del Norte-Westfalia', 'Acero eléctrico de grano orientado.'],
    ['Siegerland', 'Kreuztal y Finnentrop', 'Recubrimiento y prepintado.']
  ],
  ssab: [
    ['Luleå', 'Suecia', 'Integrada de planchón; se sustituye por una miniacería eléctrica.'],
    ['Oxelösund', 'Suecia', 'Placa templada; en conversión a horno eléctrico.'],
    ['Borlänge', 'Suecia', 'Laminación de tira en caliente y en frío.'],
    ['Raahe y Hämeenlinna', 'Finlandia', 'Integrada en Raahe; frío y recubiertos en Hämeenlinna.'],
    ['Mobile y Montpelier', 'Alabama e Iowa, Estados Unidos', 'Miniacerías de placa con horno eléctrico.']
  ]
};

/* Resumen corto por empresa para la primera pantalla: [sede, fundada, acero crudo 2025, ruta, dirige, controla] */
S.resumen = {
  ternium: ['Monterrey, N. L. (operación)', '2005; Hylsa, 1942', 'Dentro de las 16.3 Mt de Techint', 'HRD + horno eléctrico; alto horno', 'Máximo Vedoya, CEO', 'Techint 65 %, Tenaris 11 %'],
  techint: ['Buenos Aires y Milán', '1945', '16.3 Mt, lugar 24', 'Grupo: Ternium y Tenaris', 'Paolo Rocca', 'Familia Rocca (San Faustin)'],
  tenaris: ['Luxemburgo; Veracruz', '2002; TAMSA, 1952', 'Dentro de Techint', 'Horno eléctrico; tubo sin costura', 'Paolo Rocca, CEO', 'San Faustin ≈ 60 %'],
  'am-mexico': ['Lázaro Cárdenas, Mich.', '1992; Sicartsa, 1976', 'La mayor planta del país', 'Alto horno; HRD + horno eléctrico', 'Reporta a ArcelorMittal', 'ArcelorMittal 100 %'],
  deacero: ['Monterrey, N. L.', '1952', '≈ 4.5 Mt de capacidad', 'Horno eléctrico, 100 % chatarra', 'Raúl Gutiérrez Muguerza', 'Familia Gutiérrez'],
  ahmsa: ['Monclova, Coah.', '1942', 'Parada desde 2023', 'Alto horno y convertidor', 'Síndico de la quiebra', 'En liquidación judicial'],
  simec: ['Guadalajara, Jal.', 'Control de ICH desde 2001', '2.6 Mt de capacidad en México', 'Horno eléctrico con chatarra', 'Rufino Vigil González', 'Industrias CH (familia Vigil)'],
  baowu: ['Shanghái', '2016; Baosteel, 1978', '124.76 Mt, lugar 1', 'Alto horno y convertidor', 'Hu Wangming', 'Estado chino'],
  arcelormittal: ['Luxemburgo', '2006', '63.43 Mt, lugar 2', 'Integrada y horno eléctrico', 'Aditya Mittal, CEO', 'Familia Mittal ≈ 40 %'],
  nippon: ['Tokio', '1970; Yawata, 1901', '57.78 Mt, lugar 3', 'Alto horno; eléctricos en EE. UU.', 'Eiji Hashimoto, CEO', 'Capital disperso (Tokio)'],
  ussteel: ['Pittsburgh', '1901', 'Consolidada en Nippon Steel', 'Integrada y miniacerías', 'David Burritt, CEO', 'Nippon Steel 100 %'],
  ansteel: ['Anshan, Liaoning', '1948; origen en 1916', '57.61 Mt, lugar 4', 'Alto horno y convertidor', 'Designados por el Estado', 'Estado chino'],
  hbis: ['Shijiazhuang, Hebei', '2008', '42.49 Mt, lugar 5', 'Alto horno y convertidor', 'Designados por la provincia', 'Provincia de Hebei'],
  posco: ['Seúl y Pohang', '1968', '37.36 Mt, lugar 8', 'Alto horno; FINEX', 'Chang In-hwa', 'Disperso; fondo de pensiones'],
  tata: ['Bombay', '1907', '30.46 Mt, lugar 10', 'Alto horno y convertidor', 'T. V. Narendran, CEO', 'Tata Sons ≈ un tercio'],
  jsw: ['Bombay', '1982', '30.28 Mt, lugar 11', 'Alto horno; Corex', 'Sajjan Jindal', 'Familia Jindal ≈ 45 %; JFE 15 %'],
  jfe: ['Tokio', '2002', '22.69 Mt, lugar 14', 'Alto horno y convertidor', '', 'JFE Holdings'],
  nucor: ['Charlotte, N. C.', '1905; acero desde 1969', '22.33 Mt, lugar 16', 'Horno eléctrico', 'Leon Topalian, CEO', 'Capital disperso (NYSE)'],
  cliffs: ['Cleveland, Ohio', '1847', '17.06 Mt, lugar 22', 'Integrada, con minas propias', 'Lourenco Goncalves, CEO', 'Capital disperso (NYSE)'],
  sdi: ['Fort Wayne, Indiana', '1993', '10.70 Mt, lugar 40', 'Horno eléctrico', 'Mark Millett; Wagler en 2027', 'Capital disperso (NASDAQ)'],
  gerdau: ['São Paulo', '1901', '13.03 Mt, lugar 31', 'Horno eléctrico; una integrada', 'Gustavo Werneck, CEO', 'Familia Gerdau Johannpeter'],
  thyssenkrupp: ['Duisburgo', '1999; Krupp, 1811', '9.41 Mt, lugar 47', 'Alto horno y convertidor', 'Miguel López (corporativo)', 'thyssenkrupp AG; en venta'],
  ssab: ['Estocolmo', '1978', '', 'Integrada, hacia horno eléctrico', '', 'LKAB y Estado finlandés']
};

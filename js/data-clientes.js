/* Principales clientes por empresa.
   Las siderúrgicas rara vez publican su lista de clientes: aquí van los segmentos que reportan y los
   nombres que constan en informes anuales, premios de proveedor o acuerdos públicos.
   Formato de cada segmento: [segmento, participación o '', [clientes con nombre], detalle] */
S.clientes = {
  ternium: { nota: 'Segmentos según su programa ProPymes y sus fichas de planta. Ternium no publica una lista de clientes; General Motors consta por sus premios de proveedor.', seg: [
    ['Automotriz', '', ['General Motors'], 'Armadoras y estampadores de autopartes instalados en México. General Motors le otorgó su Supplier Excellence Award en 2018 y 2019.'],
    ['Línea blanca y motores eléctricos', '', [], 'Fabricantes de refrigeradores, estufas, lavadoras, aires acondicionados y motores.'],
    ['Construcción', '', [], 'Distribuidores de acero, constructoras y fabricantes de estructura. Es el segmento con más clientes.'],
    ['Tuberos y perfileros', '', [], 'Compran rollo caliente y lámina para fabricar tubería y perfiles.'],
    ['Centros de servicio', '', [], 'Cortan y procesan lámina para la industria.'],
    ['Metalmecánica, envases e iluminación', '', [], 'Calentadores, luminarias, envases y manufacturas diversas.']] },
  tenaris: { nota: 'Según sus informes anuales y llamadas de resultados de 2024 y 2025.', seg: [
    ['Petroleras nacionales', '', ['Saudi Aramco', 'ADNOC', 'Petrobras', 'Pemex', 'YPF', 'QatarEnergy'], 'Contratos de largo plazo de tubería para pozos y ductos. Con ADNOC firmó en 2019 un acuerdo de 1 900 millones de dólares, luego ampliado.'],
    ['Petroleras internacionales', '', ['ExxonMobil', 'Chevron', 'Shell', 'TotalEnergies'], 'ExxonMobil lo nombró proveedor del año 2024: le surte todo su esquisto en Estados Unidos y sus pozos en Guyana.'],
    ['Operadores de esquisto', '', [], 'Servicio Rig Direct en Estados Unidos, Canadá y Vaca Muerta: la tubería llega al pozo justo a tiempo.'],
    ['Industria', '', [], 'Tubería mecánica, cilindros hidráulicos y componentes automotrices.']] },
  'am-mexico': { nota: 'Segmentos por tipo de producto.', seg: [
    ['Laminadoras del grupo y terceros', '', [], 'Planchón de exportación para plantas de ArcelorMittal en Norteamérica y otros relaminadores.'],
    ['Construcción', '', [], 'Varilla y alambrón a distribuidores y constructoras.'],
    ['Industria y tuberos', '', [], 'Rollo caliente desde 2022 para tubería, perfiles y manufactura.']] },
  deacero: { nota: 'Según su informe anual 2024.', seg: [
    ['Distribuidores y ferreteras', '', [], 'Red de más de 7 500 distribuidores en México.'],
    ['Construcción', '', [], 'Varilla, malla, armaduras y perfiles.'],
    ['Agro e industria', '', [], 'Cercas, alambre de púas, alambres industriales y cable.'],
    ['Exportación', '', [], 'Clavo, malla y alambre para Estados Unidos y Centroamérica.']] },
  ahmsa: { nota: 'Clientes históricos, antes del paro de 2023.', seg: [
    ['Tuberos y fabricantes de equipo', '', [], 'Placa para tubería de gran diámetro, carros de ferrocarril, tanques y maquinaria.'],
    ['Envases', '', [], 'Hojalata para latas de alimentos.'],
    ['Construcción y distribución', '', [], 'Perfiles pesados, lámina y placa por medio de distribuidores.']] },
  simec: { nota: 'Segmentos por tipo de producto.', seg: [
    ['Autopartes y forja', '', [], 'Barras de aceros especiales para forjadores y fabricantes de componentes en México y Estados Unidos.'],
    ['Construcción', '', [], 'Varilla y perfiles a distribuidores.']] },
  baowu: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['SAIC Motor'], 'Principal proveedor de lámina automotriz de China.'],
    ['Energía eléctrica', '', ['State Grid'], 'Acero al silicio para transformadores y motores.'],
    ['Línea blanca, naval y construcción', '', [], 'Electrodomésticos, astilleros e infraestructura.']] },
  arcelormittal: { nota: 'Sectores de su informe anual; armadoras con las que mantiene programas de codesarrollo.', seg: [
    ['Automotriz', '', ['Stellantis', 'Renault', 'Volkswagen', 'Ford', 'General Motors', 'Toyota'], 'Líder mundial en acero automotriz; licencia su acero de estampado en caliente a otras acereras.'],
    ['Construcción e infraestructura', '', [], 'Perfiles, varilla, tablestaca, lámina recubierta.'],
    ['Envases, línea blanca y energía', '', [], 'Hojalata, lámina para electrodomésticos, placa para torres eólicas y tubería.'],
    ['Distribución', '', [], 'Red propia de centros de servicio en Europa.']] },
  nippon: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['Toyota', 'Nissan', 'Honda'], 'Su negociación anual de precio con Toyota sirve de referencia para la industria japonesa.'],
    ['Naval y energía', '', [], 'Placa para astilleros, tubería sin costura para petróleo y gas.'],
    ['Ferrocarril y construcción', '', [], 'Rieles para los ferrocarriles japoneses y exportación; perfiles.']] },
  ussteel: { nota: 'Sectores de su informe anual; nombres representativos.', seg: [
    ['Automotriz', '', ['General Motors', 'Ford', 'Stellantis', 'Toyota'], 'Lámina de alta resistencia y recubierta.'],
    ['Línea blanca, envases y construcción', '', [], 'Lámina para electrodomésticos, hojalata y lámina recubierta.'],
    ['Centros de servicio', '', [], 'Parte importante del volumen se vende a distribuidores y convertidores.'],
    ['Energía', '', [], 'Tubería sin costura para perforación.']] },
  ansteel: { nota: 'Sectores atendidos.', seg: [
    ['Ferrocarril', '', [], 'Rieles para la red ferroviaria china, incluida la alta velocidad.'],
    ['Naval, automotriz y construcción', '', [], 'Placa para astilleros, lámina automotriz y estructural.']] },
  hbis: { nota: 'Sectores atendidos; BMW consta por un acuerdo público de 2022.', seg: [
    ['Automotriz', '', ['BMW'], 'Acuerdo para surtir acero de bajas emisiones a las plantas de BMW en China.'],
    ['Línea blanca y construcción', '', [], 'Lámina para electrodomésticos, placa y estructural.']] },
  posco: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['Hyundai', 'Kia', 'General Motors'], 'Lámina de ultra alta resistencia y acero eléctrico para motores de vehículos eléctricos.'],
    ['Naval', '', ['HD Hyundai', 'Samsung Heavy Industries', 'Hanwha Ocean'], 'Placa para los tres grandes astilleros coreanos.'],
    ['Electrónica y línea blanca', '', ['Samsung', 'LG'], 'Lámina recubierta e inoxidable.']] },
  tata: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['Tata Motors', 'Maruti Suzuki', 'Jaguar Land Rover'], 'En India y en Europa.'],
    ['Construcción', '', [], 'Varilla y lámina de marca propia vendidas al menudeo por distribuidores.'],
    ['Envases e industria', '', [], 'Acero para latas desde IJmuiden; tubería y maquinaria.']] },
  jsw: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['Maruti Suzuki', 'Tata Motors'], 'Lámina para armadoras en India.'],
    ['Construcción e infraestructura', '', [], 'Lámina recubierta y prepintada de marca propia, varilla.'],
    ['Línea blanca y energía solar', '', [], 'Lámina para electrodomésticos y estructuras de paneles.']] },
  jfe: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['Toyota', 'Honda', 'Mazda', 'Suzuki'], 'Lámina de alta resistencia.'],
    ['Naval', '', ['Japan Marine United'], 'Placa; JFE es accionista del astillero.'],
    ['Energía y construcción', '', [], 'Tubería, placa y perfiles.']] },
  nucor: { nota: 'Segmentos de su informe anual; no depende de un cliente dominante.', seg: [
    ['Centros de servicio', '', [], 'El mayor canal para lámina y placa.'],
    ['Construcción', '', [], 'Fabricantes de estructura y constructoras; centros de datos, naves y energía.'],
    ['Consumo interno', '', [], 'Cerca de una quinta parte del acero va a sus propios negocios: vigas ligeras, edificios metálicos, habilitado de varilla.'],
    ['Automotriz y manufactura', '', [], 'Lámina galvanizada y barras especiales.']] },
  cliffs: { nota: 'Participaciones de sus ventas de acero en 2025; armadoras representativas.', seg: [
    ['Infraestructura y manufactura', '30 %', [], 'Construcción, equipo, línea blanca y transformadores.'],
    ['Distribuidores y convertidores', '29 %', [], 'Centros de servicio y relaminadores.'],
    ['Automotriz', '28 %', ['General Motors', 'Ford', 'Stellantis', 'Toyota', 'Honda'], 'Contratos multianuales firmados en 2025 con sus principales armadoras.'],
    ['Otras acereras', '13 %', [], 'Planchón, pélet y HBI.']] },
  sdi: { nota: 'Segmentos de su informe anual.', seg: [
    ['Construcción', '', [], 'El mayor destino: estructura, vigas ligeras y lámina recubierta.'],
    ['Centros de servicio', '', [], 'Lámina en rollo.'],
    ['Automotriz, energía e industria', '', [], 'Lámina galvanizada, barras especiales y rieles para ferrocarriles.'],
    ['Consumo interno', '', [], 'Sus plantas de vigas ligeras y de galvanizado.']] },
  gerdau: { nota: 'Segmentos de su informe anual.', seg: [
    ['Construcción', '', [], 'Constructoras y distribuidores; red propia de tiendas en Brasil.'],
    ['Automotriz', '', [], 'Aceros especiales para forjadores y fabricantes de componentes en Brasil y Estados Unidos.'],
    ['Industria y agro', '', [], 'Maquinaria agrícola, energía, estructuras metálicas.']] },
  thyssenkrupp: { nota: 'Sectores atendidos; nombres representativos.', seg: [
    ['Automotriz', '', ['Volkswagen', 'Mercedes-Benz', 'BMW'], 'Cerca de la mitad de su volumen va a la cadena automotriz.'],
    ['Envases', '', [], 'Hojalata de Rasselstein para fabricantes de latas.'],
    ['Línea blanca, energía y maquinaria', '', [], 'Lámina, acero eléctrico para transformadores y motores.']] },
  ssab: { nota: 'Sectores atendidos; nombres con acuerdos públicos de acero sin fósiles.', seg: [
    ['Vehículos pesados y automotriz', '', ['Volvo Group', 'Volvo Cars', 'Mercedes-Benz'], 'Primeros compradores de su acero sin combustibles fósiles.'],
    ['Maquinaria y minería', '', [], 'Placa antidesgaste para cajas de volteo, cucharones y trituradoras.'],
    ['Construcción y energía', '', [], 'Placa para torres eólicas y estructura.']] },
  mineras: { nota: 'El mineral se vende a acereras con alto horno.', seg: [
    ['Acereras de Asia', '', ['China Baowu', 'Nippon Steel', 'POSCO'], 'China compra cerca de tres cuartas partes del mineral que se mueve por mar.'],
    ['Acereras de Europa y América', '', ['ArcelorMittal'], 'Pélet y mineral de alta ley.']] }
};

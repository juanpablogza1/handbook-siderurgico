/* Fabricantes de equipo siderúrgico.
   S.fab[id] = [nombre, sede, dónde fabrica ('' = sin dato, '=' = en su sede), qué hace]
   S.equipos[idProceso] = [[equipo, [ids de fabricante, los más comunes primero], nota opcional]] */
S.fabCorte = 'noviembre de 2026';

S.fab = {
  /* Proveedores integrales de planta */
  sms: ['SMS group', 'Düsseldorf, Alemania', 'Hilchenbach y Mönchengladbach (Alemania); Shanghái (China); Bhubaneswar y Sanand (India); talleres en Italia y Estados Unidos', 'Proveedor integral: alto horno y coque (antes Paul Wurth, Luxemburgo), aceración, colada, laminación, líneas de proceso y tubos. Empresa familiar (familia Weiss).'],
  primetals: ['Primetals Technologies', 'Londres, Reino Unido', 'Linz (Austria, su mayor centro); Hiroshima (Japón); talleres en Estados Unidos, Reino Unido, Alemania y China', 'Proveedor integral. Nació en 2015 de Siemens VAI y Mitsubishi-Hitachi Metals Machinery; pertenece al grupo Mitsubishi Heavy Industries.'],
  danieli: ['Danieli', 'Buttrio, Italia', 'Buttrio (Italia); Changshu (China); Rayong (Tailandia); Sri City (India); Völkermarkt (Austria)', 'Proveedor integral, fuerte en miniacerías, largos y tubos. Incluye Danieli Corus (alto horno, Países Bajos), Morgårdshammar (largos, Suecia), Centro Tube, Fröhling, Kohler y Fata Hunter.'],
  tenova: ['Tenova', 'Castellanza, Italia', 'Ingeniería en Castellanza y Génova (Italia), San Nicolás de los Garza (México, Tenova HYL), Duisburgo (Alemania, LOI Thermprocess) y Pittsburgh (EE. UU.)', 'Grupo Techint. Hornos eléctricos (Consteel), reducción directa Energiron, hornos de recalentamiento y tratamiento térmico, rectificadoras Pomini.'],
  fives: ['Fives', 'París, Francia', 'Francia (hornos Stein, laminadores DMS); Italia (Fives OTO, tubos); Ohio, EE. UU. (Fives Bronx)', 'Hornos de recalentamiento y recocido, líneas de proceso, laminadores para inoxidable y molinos de tubo.'],
  andritz: ['Andritz Metals', 'Graz, Austria', 'Viena (Austria); Hemer (Alemania, Sundwig); Pensilvania, EE. UU. (Herr-Voss Stamco)', 'Decapado y regeneración de ácido (Ruthner), laminadores en frío y de 20 rodillos, líneas de recocido, galvanizado y corte.'],
  jc: ['John Cockerill Metals', 'Navi Mumbai, India (grupo en Seraing, Bélgica)', 'Talleres en Maharashtra (India); ingeniería en Bélgica, Alemania, China y Estados Unidos', 'Líneas de galvanizado, recocido, decapado y pintado; laminadores en frío. Desde enero de 2026 el negocio mundial de metales depende de John Cockerill India.'],
  nse: ['Nippon Steel Engineering', 'Tokio, Japón', 'Kitakyushu (Japón)', 'Altos hornos, apagado en seco de coque (CDQ) y líneas de recocido y galvanizado. Filial de Nippon Steel.'],
  plantech: ['JP Steel Plantech', 'Yokohama, Japón', 'Japón', 'Hornos eléctricos, convertidores, coladas, CDQ y líneas de proceso. Reúne la ingeniería de planta de NKK (JFE), Sumitomo Heavy e Hitachi Zosen.'],
  mcc: ['MCC: CISDI, WISDRI, CERI y ACRE', 'Pekín, China', 'CISDI en Chongqing, WISDRI en Wuhan, ACRE en Anshan', 'Institutos de ingeniería del grupo estatal MCC (China Minmetals). Construyen la mayoría de las plantas integradas nuevas de China y del sudeste asiático.'],
  cfhi: ['China First Heavy (CFHI)', 'Qiqihar, China', 'Qiqihar y Dalian (China)', 'Castillos de laminación, prensas y grandes piezas fundidas y forjadas.'],
  sarralle: ['Sarralle', 'Azpeitia, España', '=', 'Hornos eléctricos, metalurgia secundaria, coladas y laminadores de largos para miniacerías.'],
  inteco: ['INTECO', 'Bruck an der Mur, Austria', '=', 'Hornos eléctricos, hornos olla, desgasificadores y refusión (ESR, VAR) para aceros especiales.'],
  kobe: ['Kobe Steel (Kobelco)', 'Kobe, Japón', 'Japón', 'Peletizado de parrilla con horno rotatorio y plantas de reducción directa. Dueña de Midrex.'],

  /* Minería y materias primas */
  cat: ['Caterpillar', 'Irving, Texas, EE. UU.', 'Camiones mineros en Decatur (Illinois)', 'Camiones de acarreo, cargadores, tractores y palas.'],
  komatsu: ['Komatsu', 'Tokio, Japón', 'Camiones eléctricos en Peoria (Illinois); palas P&H en Milwaukee (Wisconsin); Japón', 'Camiones, palas eléctricas de cable y excavadoras hidráulicas.'],
  liebherr: ['Liebherr', 'Bulle, Suiza', 'Excavadoras mineras en Colmar (Francia); camiones en Newport News (Virginia)', 'Excavadoras hidráulicas y camiones de accionamiento eléctrico.'],
  epiroc: ['Epiroc', 'Estocolmo, Suecia', 'Örebro (Suecia); Garland (Texas)', 'Perforadoras rotarias y de superficie para barrenación.'],
  sandvik: ['Sandvik', 'Estocolmo, Suecia', 'Tampere (Finlandia, perforadoras); Svedala (Suecia, quebradoras); Alachua (Florida, perforadoras rotarias)', 'Perforadoras y quebradoras de cono y giratorias.'],
  metso: ['Metso', 'Espoo, Finlandia', 'Tampere (Finlandia, quebradoras); plantas en Brasil, India y China; ingeniería de peletizado en Alemania', 'Quebradoras, molinos, separación magnética y plantas de peletizado de parrilla móvil (tecnología antes de Lurgi y Outotec).'],
  flsmidth: ['FLSmidth', 'Copenhague, Dinamarca', '', 'Quebradoras giratorias, molinos y rodillos de alta presión. En 2022 absorbió el negocio minero de thyssenkrupp.'],
  citic: ['CITIC Heavy Industries', 'Luoyang, China', '=', 'Molinos SAG y de bolas de gran diámetro, hornos rotatorios.'],
  eriez: ['Eriez', 'Erie, Pensilvania, EE. UU.', '=', 'Separadores magnéticos de tambor y de alta intensidad.'],
  uhde: ['thyssenkrupp Uhde', 'Dortmund, Alemania', 'Ingeniería en Dortmund', 'Baterías de coque (herencia de Otto, Still y Koppers) y plantas de subproductos.'],
  schalke: ['Schalker Eisenhütte', 'Gelsenkirchen, Alemania', '=', 'Máquinas de servicio de la batería: cargadora, deshornadora, guía y carro de apagado.'],

  /* Hierro primario y aceración */
  midrex: ['Midrex Technologies', 'Charlotte, Carolina del Norte, EE. UU.', 'Licenciante: no fabrica; el equipo lo suministran sus constructores autorizados', 'Dueña del proceso de reducción directa más instalado del mundo. Filial de Kobe Steel.'],
  everllence: ['Everllence (antes MAN Energy Solutions)', 'Augsburgo, Alemania', 'Oberhausen (Alemania) y Zúrich (Suiza)', 'Turbosopladores de alto horno y compresores. Cambió de nombre en junio de 2025.'],
  siemensenergy: ['Siemens Energy', 'Múnich, Alemania', 'Compresores en Duisburgo (Alemania)', 'Turbosopladores, compresores y transformadores.'],
  rhi: ['RHI Magnesita', 'Viena, Austria', 'Austria; Contagem (Brasil); Ramos Arizpe (México); Estados Unidos, China e India', 'Mayor productor mundial de refractarios: ladrillo de magnesia-carbono, masas, válvulas de corredera.'],
  vesuvius: ['Vesuvius', 'Londres, Reino Unido', 'Plantas en Europa, América, India y China', 'Refractarios de control de flujo: buzas, tapones, tubos de protección y polvos de molde (marca Foseco en fundición).'],
  krosaki: ['Krosaki Harima', 'Kitakyushu, Japón', 'Japón e India (TRL Krosaki)', 'Refractarios para convertidor, olla y colada. Filial de Nippon Steel.'],
  graftech: ['GrafTech', 'Brooklyn Heights, Ohio, EE. UU.', 'Calais (Francia) y Pamplona (España); coque aguja en Seadrift (Texas)', 'Electrodos de grafito. Anunció en septiembre de 2026 el cierre de su planta de Monterrey, con fin de producción previsto para el segundo trimestre de 2027.'],
  resonac: ['Resonac (antes Showa Denko)', 'Tokio, Japón', 'Omachi (Japón); Carolina del Sur (EE. UU.); La Coruña (España)', 'Electrodos de grafito de ultra alta potencia.'],
  heg: ['HEG y Graphite India', 'India', 'Mandideep (HEG) y Durgapur (Graphite India)', 'Los dos productores indios de electrodos de grafito; exportan la mayor parte.'],
  tamini: ['Tamini', 'Italia', 'Italia', 'Transformadores de horno de arco y de horno olla.'],
  hitachienergy: ['Hitachi Energy', 'Zúrich, Suiza', '', 'Transformadores de horno y de potencia (antes ABB Power Grids).'],
  cunova: ['cunova (antes KME Special)', 'Osnabrück, Alemania', '=', 'Placas y tubos de cobre para moldes de colada continua.'],
  abb: ['ABB', 'Zúrich, Suiza', 'Productos metalúrgicos en Västerås (Suecia)', 'Agitadores y frenos electromagnéticos, accionamientos, y rodillo Stressometer para medir planeidad.'],
  ergolines: ['Ergolines', 'Trieste, Italia', '=', 'Agitadores electromagnéticos y sensores de nivel para colada de largos.'],

  /* Laminación */
  tmeic: ['TMEIC', 'Tokio, Japón', 'Japón; Roanoke (Virginia)', 'Motores principales, variadores y automatización de laminadores. Empresa de Toshiba y Mitsubishi Electric.'],
  akers: ['Union Electric Åkers', 'Carnegie, Pensilvania, EE. UU.', 'Estados Unidos, Suecia y Eslovenia', 'Rodillos fundidos y forjados de trabajo y de apoyo. Filial de Ampco-Pittsburgh.'],
  esw: ['ESW (Eisenwerk Sulzau-Werfen)', 'Tenneck, Austria', '=', 'Rodillos de trabajo fundidos para laminación en caliente de planos.'],
  xingtai: ['Sinosteel Xingtai (XTMMC)', 'Xingtai, China', '=', 'Uno de los mayores fabricantes de rodillos del mundo.'],
  ims: ['IMS Messsysteme', 'Heiligenhaus, Alemania', '=', 'Medidores de espesor, perfil y ancho por rayos X e isótopos.'],
  kocks: ['Kocks', 'Hilden, Alemania', '=', 'Bloques de tres rodillos para barra y alambrón de calidad, y reductores-estiradores de tubo.'],
  miebach: ['Hugo Miebach', 'Dortmund, Alemania', '=', 'Soldadoras láser y de chisporroteo para unir bobinas a la entrada de las líneas.'],
  taylor: ['Taylor-Winfield', 'Youngstown, Ohio, EE. UU.', '=', 'Soldadoras de banda para líneas de proceso.'],
  sendzimir: ['T. Sendzimir', 'Waterbury, Connecticut, EE. UU.', 'Licenciante: diseña; fabrican sus licenciatarios', 'Dueña del diseño del laminador de 20 rodillos (Z-mill).'],
  herkules: ['Herkules', 'Siegen, Alemania', '=', 'Rectificadoras y tornos de rodillos.'],
  ebner: ['EBNER', 'Leonding, Austria', 'Leonding (Austria); Wadsworth (Ohio); Taicang (China)', 'Hornos de campana de alta convección con hidrógeno (HICON/H₂).'],

  /* Recubrimientos */
  foen: ['FOEN (grupo SMS)', 'Langenfeld, Alemania', '=', 'Cuchillas de aire y equipo de olla para galvanizado.'],
  emg: ['EMG Automation', 'Wenden, Alemania', '=', 'Estabilización electromagnética de banda, guiado y control de recubrimiento.'],
  ajax: ['Ajax TOCCO Magnethermic', 'Warren, Ohio, EE. UU.', '=', 'Ollas de zinc de inducción y hornos de galvannealing.'],
  bronx: ['Bronx International', 'Sídney, Australia', '', 'Líneas de pintado, galvanizado y nivelado.'],

  /* Tubos, corte y alambre */
  nakata: ['Nakata Mfg.', 'Osaka, Japón', '=', 'Molinos de tubo con costura de formado flexible (FFX).'],
  olimpia: ['Olimpia 80', 'Italia', 'Italia', 'Molinos de tubo y líneas de corte.'],
  thermatool: ['Thermatool (Inductotherm Group)', 'East Haven, Connecticut, EE. UU.', '=', 'Soldadoras de alta frecuencia y recocido de costura.'],
  enrx: ['ENRX (antes EFD Induction)', 'Skien, Noruega', '', 'Soldadoras de alta frecuencia y calentamiento por inducción.'],
  foerster: ['Institut Dr. Foerster', 'Reutlingen, Alemania', '=', 'Inspección por corrientes parásitas y flujo magnético disperso.'],
  fimi: ['Fimi', 'Viganò, Italia', '=', 'Líneas de corte longitudinal y a medida.'],
  redbud: ['Red Bud Industries', 'Red Bud, Illinois, EE. UU.', '=', 'Líneas de corte a medida, niveladoras y estiradoras.'],
  georg: ['Heinrich Georg', 'Kreuztal, Alemania', '=', 'Líneas de corte, también para acero eléctrico de transformador.'],
  butech: ['Butech Bliss', 'Salem, Ohio, EE. UU.', '=', 'Niveladoras, tijeras y líneas de corte para calibre grueso.'],
  bradbury: ['The Bradbury Group', 'Moundridge, Kansas, EE. UU.', '=', 'Perfiladoras para lámina acanalada, polines y paneles; niveladoras.'],
  samco: ['Samco Machinery', 'Toronto, Canadá', '=', 'Perfiladoras y líneas de roll forming.'],
  dallan: ['Dallan', 'Castelfranco Veneto, Italia', '=', 'Perfiladoras para lámina delgada y sistemas de construcción en seco.'],
  koch: ['Ernst Koch (KOCH H&K)', 'Hemer, Alemania', '=', 'Máquinas de trefilado de alambre de acero.'],
  frigerio: ['Mario Frigerio (MFL Group)', 'Lecco, Italia', '=', 'Trefiladoras y máquinas de cable y torón.'],
  gcr: ['GCR Eurodraw', 'Italia', 'Italia', 'Trefiladoras multipaso.'],
  wafios: ['WAFIOS', 'Reutlingen, Alemania', '=', 'Máquinas para clavos, resortes, malla y doblado de alambre.'],
  enkotec: ['Enkotec', 'Skanderborg, Dinamarca', '=', 'Máquinas rotativas de clavos de alta velocidad.'],
  schlatter: ['Schlatter', 'Schlieren, Suiza', '=', 'Soldadoras de malla electrosoldada y de riel.'],
  evg: ['EVG', 'Raaba-Grambach, Austria', '=', 'Líneas de malla electrosoldada y armaduras.']
};

(function () {
  var REF = ['rhi', 'vesuvius', 'krosaki'];
  S.equipos = {
    'mineria': [
      ['Camiones y palas', ['cat', 'komatsu', 'liebherr']],
      ['Perforadoras', ['epiroc', 'sandvik']],
      ['Quebradoras y molinos', ['metso', 'flsmidth', 'citic', 'sandvik']],
      ['Separadores magnéticos', ['metso', 'eriez']]
    ],
    'peletizado': [
      ['Planta de peletizado', ['metso', 'primetals', 'kobe'], 'Metso domina la parrilla móvil recta. Kobe y Metso ofrecen parrilla con horno rotatorio.'],
      ['Planta de sinterizado', ['primetals', 'sms', 'mcc']]
    ],
    'coque': [
      ['Baterías de coque', ['uhde', 'sms', 'mcc'], 'En SMS es la línea heredada de Paul Wurth (Luxemburgo e Italia); en MCC, el instituto ACRE de Anshan.'],
      ['Máquinas de batería', ['schalke']],
      ['Apagado en seco (CDQ)', ['nse', 'plantech']]
    ],
    'alto-horno': [
      ['Horno, tragante y estufas', ['sms', 'primetals', 'danieli', 'nse', 'mcc'], 'El tragante sin campana es diseño de Paul Wurth, hoy SMS. Danieli lo cubre con Danieli Corus (IJmuiden, Países Bajos).'],
      ['Turbosopladores', ['everllence', 'siemensenergy']],
      ['Refractarios', REF, 'Consumible: el crisol y la cuba se revisten con carbón y cerámicos.']
    ],
    'reduccion-directa': [
      ['Módulo Midrex', ['midrex', 'primetals', 'sms', 'kobe'], 'Midrex licencia el proceso; el equipo lo suministran sus constructores autorizados.'],
      ['Módulo Energiron (HYL)', ['tenova', 'danieli'], 'Proceso desarrollado por HYLSA en Monterrey. Hoy lo comercializan en alianza Tenova HYL y Danieli.']
    ],
    'bof': [
      ['Convertidor, lanza y campana', ['primetals', 'sms', 'danieli', 'mcc', 'plantech'], 'El proceso LD nació en Linz, hoy el mayor centro de Primetals.'],
      ['Refractarios', REF, 'Consumible: ladrillo de magnesia-carbono.']
    ],
    'eaf': [
      ['Horno de arco', ['danieli', 'tenova', 'sms', 'primetals', 'sarralle', 'inteco', 'plantech']],
      ['Electrodos de grafito', ['graftech', 'resonac', 'heg'], 'Consumible crítico del horno. GrafTech anunció el cierre de su planta de Monterrey; produce hasta el segundo trimestre de 2027.'],
      ['Transformador de horno', ['tamini', 'siemensenergy', 'hitachienergy']],
      ['Refractarios', REF]
    ],
    'metalurgia-secundaria': [
      ['Horno olla y desgasificador (VD, RH)', ['sms', 'danieli', 'primetals', 'inteco', 'tenova', 'sarralle']],
      ['Refractarios y válvulas de olla', REF]
    ],
    'colada-continua': [
      ['Máquina de colada', ['sms', 'primetals', 'danieli', 'plantech', 'sarralle'], 'Planchón delgado: CSP de SMS, ESP de Primetals (licencia Arvedi) y QSP-DUE de Danieli.'],
      ['Moldes de cobre', ['cunova', 'sms']],
      ['Buzas, tapones y polvos de molde', ['vesuvius', 'rhi', 'krosaki']],
      ['Agitadores electromagnéticos', ['abb', 'ergolines']]
    ],
    'laminacion-caliente': [
      ['Laminador y enrolladores', ['sms', 'primetals', 'danieli', 'cfhi']],
      ['Horno de recalentamiento', ['tenova', 'fives', 'danieli', 'sms', 'andritz']],
      ['Motores y automatización', ['tmeic', 'abb', 'primetals', 'danieli']],
      ['Rodillos de trabajo y de apoyo', ['akers', 'esw', 'xingtai'], 'Consumible: se rectifican y se reponen de forma continua.'],
      ['Medición de espesor y perfil', ['ims']]
    ],
    'largos': [
      ['Trenes de barra, alambrón y perfiles', ['danieli', 'sms', 'primetals', 'kocks', 'sarralle'], 'Referencias en alambrón: Danieli Morgårdshammar (Suecia) y la tecnología Morgan de Primetals (Massachusetts).'],
      ['Horno de recalentamiento', ['tenova', 'danieli', 'fives', 'sms']],
      ['Motores y automatización', ['tmeic', 'abb', 'danieli']]
    ],
    'decapado': [
      ['Línea de decapado', ['sms', 'andritz', 'primetals', 'danieli', 'jc', 'tenova']],
      ['Regeneración de ácido', ['andritz', 'sms', 'jc', 'tenova']],
      ['Soldadoras de banda', ['miebach', 'taylor']]
    ],
    'laminacion-frio': [
      ['Laminador tándem y reversible', ['sms', 'primetals', 'danieli', 'andritz', 'fives', 'jc']],
      ['Laminador de 20 rodillos', ['sendzimir', 'andritz', 'sms', 'fives'], 'Para inoxidable y acero al silicio.'],
      ['Rectificadoras de rodillos', ['herkules', 'tenova']],
      ['Medición de espesor y planeidad', ['ims', 'abb']]
    ],
    'recocido': [
      ['Recocido en campana', ['ebner', 'tenova'], 'Atmósfera de 100 % hidrógeno. En Tenova es la línea LOI Thermprocess.'],
      ['Línea de recocido continuo', ['fives', 'jc', 'sms', 'andritz', 'nse', 'tenova']],
      ['Laminador de temper', ['sms', 'primetals', 'danieli', 'andritz']]
    ],
    'galvanizado': [
      ['Línea de galvanizado', ['sms', 'jc', 'fives', 'danieli', 'andritz', 'primetals', 'tenova', 'nse']],
      ['Cuchillas de aire y control de capa', ['foen', 'danieli', 'emg'], 'En Danieli es la línea Kohler (Michigan).'],
      ['Olla de zinc e inducción', ['ajax']]
    ],
    'pintado': [
      ['Línea de pintado', ['fives', 'sms', 'jc', 'danieli', 'andritz', 'tenova', 'bronx'], 'En Danieli es la línea Fata Hunter.']
    ],
    'hojalata': [
      ['Línea de estañado electrolítico', ['sms', 'primetals', 'andritz', 'danieli', 'jc', 'tenova', 'plantech']],
      ['Laminador de doble reducción y temper', ['sms', 'primetals', 'danieli']]
    ],
    'tubos-erw': [
      ['Molino formador y calibrador', ['sms', 'fives', 'nakata', 'olimpia', 'danieli']],
      ['Soldadora de alta frecuencia', ['thermatool', 'enrx']],
      ['Inspección no destructiva', ['foerster']]
    ],
    'tubos-sin-costura': [
      ['Perforador y laminador de mandril', ['sms', 'danieli'], 'Laminadores de mandril retenido de tres rodillos: PQF de SMS y FQM de Danieli.'],
      ['Reductor-estirador', ['sms', 'danieli', 'kocks']],
      ['Temple y revenido', ['tenova', 'danieli', 'sms']],
      ['Inspección no destructiva', ['foerster']]
    ],
    'rolado': [
      ['Líneas de corte longitudinal y a medida', ['fimi', 'redbud', 'georg', 'andritz', 'danieli', 'butech']],
      ['Perfiladoras', ['bradbury', 'samco', 'dallan']]
    ],
    'trefilado': [
      ['Máquinas de trefilado', ['koch', 'frigerio', 'gcr']],
      ['Clavos, resortes y malla', ['wafios', 'enkotec', 'schlatter', 'evg']]
    ]
  };

  /* Índice inverso: en qué procesos y equipos aparece cada fabricante. */
  S.fabUso = {};
  Object.keys(S.equipos).forEach(function (pid) {
    S.equipos[pid].forEach(function (e) {
      e[1].forEach(function (f) { (S.fabUso[f] = S.fabUso[f] || []).push([pid, e[0]]); });
    });
  });
})();

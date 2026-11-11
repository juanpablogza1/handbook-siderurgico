/* Organigramas de primer nivel: dueño o matriz, consejo, dirección general y reportes directos.
   Solo el nivel superior. Fuentes: páginas corporativas, reportes bursátiles y prensa, a noviembre de 2026.
   Nodo: [tipo, cargo, nombre, detalle, idFicha]
   tipo: 'm' matriz o dueño · 'c' consejo · 'd' dirección general · 'r' reporte directo o unidad */
S.orgCorte = 'noviembre de 2026';
S.org = {
  ternium: { n: [
    ['m', 'Controladora', 'Grupo Techint', 'San Faustin, familia Rocca', 'techint'],
    ['c', 'Presidente del consejo', 'Paolo Rocca', 'Vicepresidente: Daniel Novegil'],
    ['d', 'Director general (CEO)', 'Máximo Vedoya', 'Desde 2018'],
    ['r', 'Finanzas (CFO)', 'Pablo Brizzio'],
    ['r', 'Ternium México', 'César Jiménez', 'Presidente'],
    ['r', 'Área internacional', 'Héctor Obeso Zunzunegui'],
    ['r', 'Operaciones industriales', 'Carlos Baieli']
  ], x: 'Ternium Argentina y Ternium Brasil tienen presidencia propia; las fuentes no coinciden en el nombre vigente de Argentina.' },

  techint: { n: [
    ['c', 'Presidente del grupo', 'Paolo Rocca', 'Tenedora: San Faustin (Luxemburgo)'],
    ['r', 'Tubos de acero', 'Tenaris', 'CEO: Gabriel Podskubka', 'tenaris'],
    ['r', 'Aceros planos y largos', 'Ternium', 'CEO: Máximo Vedoya', 'ternium'],
    ['r', 'Ingeniería y construcción', 'Techint Ingeniería y Construcción'],
    ['r', 'Tecnología siderúrgica y minera', 'Tenova'],
    ['r', 'Petróleo y gas', 'Tecpetrol'],
    ['r', 'Hospitales en Italia', 'Humanitas']
  ], x: 'Organigrama por empresas del grupo. Cada una tiene consejo y dirección propios.' },

  tenaris: { n: [
    ['m', 'Controladora', 'Grupo Techint', 'San Faustin ≈ 60 %', 'techint'],
    ['c', 'Presidente del consejo', 'Paolo Rocca', 'Vicepresidentes: Germán Curá y Guillermo Vogel'],
    ['d', 'Director general (CEO)', 'Gabriel Podskubka', 'Desde mayo de 2026; antes director de operaciones'],
    ['r', 'Finanzas (CFO)', 'Carlos Gómez Alzaga'],
    ['r', 'México', 'Sergio de la Maza', 'Presidente'],
    ['r', 'Estados Unidos', 'Guillermo Moreno', 'Presidente'],
    ['r', 'Europa', 'Michele Della Briotta', 'Presidente'],
    ['r', 'Industrial', 'Antonio Caprera'],
    ['r', 'Tecnología (CTO)', 'Lucas Pigliacampo']
  ] },

  'am-mexico': { n: [
    ['m', 'Matriz', 'ArcelorMittal', 'CEO: Aditya Mittal', 'arcelormittal'],
    ['d', 'CEO de ArcelorMittal México', 'Víctor Cairo', 'Vicepresidente del grupo; en el cargo desde 2013'],
    ['r', 'División', 'Minería'],
    ['r', 'División', 'Largos'],
    ['r', 'División', 'Planos']
  ], x: 'En octubre de 2026 el negocio se dividió en tres divisiones. No hay nombres públicos confirmados de sus titulares.' },

  deacero: { n: [
    ['c', 'Presidente ejecutivo del consejo', 'Raúl Gutiérrez Muguerza'],
    ['r', 'Dirección general de Alambres, Filiales y Servicios Operativos', 'Raúl Gutiérrez Durán']
  ], x: 'Empresa privada: no publica su organigrama. Solo se muestran los cargos confirmados en fuentes abiertas.' },

  ahmsa: { n: [
    ['m', 'Juzgado Segundo de Distrito en Materia de Concursos Mercantiles', 'Jueza Ruth Haggi Huerta García', 'Autoriza cada paso de la venta'],
    ['d', 'Síndico de la quiebra', 'Víctor Manuel Aguilera Gómez', 'Administra los bienes y conduce la subasta'],
    ['r', 'Siderúrgica, Monclova', 'AHMSA'],
    ['r', 'Minas de carbón y hierro', 'MINOSA']
  ], x: 'Sin consejo ni dirección propios desde la sentencia de quiebra de noviembre de 2024.' },

  simec: { n: [
    ['m', 'Controladora', 'Industrias CH', 'Familia Vigil'],
    ['c', 'Presidente del consejo', 'Rufino Vigil González', 'También preside Industrias CH'],
    ['d', 'Director general', 'Sergio Vigil González', 'Desde julio de 2024']
  ] },

  baowu: { n: [
    ['m', 'Dueño', 'Estado chino', 'SASAC, Consejo de Estado'],
    ['c', 'Presidente del consejo y secretario del Partido', 'Hu Wangming', 'Desde 2023'],
    ['d', 'Director general', 'Hou Angui'],
    ['r', 'Filial listada', 'Baosteel', 'Baoshan Iron & Steel'],
    ['r', 'Filial', 'Magang', 'Maanshan'],
    ['r', 'Filial, inoxidable', 'TISCO', 'Taiyuan'],
    ['r', 'Filial', 'Sinosteel', 'Ingeniería y comercio']
  ], x: 'Grupo estatal: el primer nivel se muestra por filiales. El cargo de Hou Angui aparece con títulos distintos según la fuente.' },

  arcelormittal: { n: [
    ['c', 'Presidente ejecutivo del consejo', 'Lakshmi N. Mittal'],
    ['d', 'Director general (CEO)', 'Aditya Mittal', 'Desde febrero de 2021'],
    ['r', 'Finanzas (CFO)', 'Genuino Christino'],
    ['r', 'Norteamérica', 'John Brett', 'CEO regional'],
    ['r', 'Largos Sudamérica y minería', 'Everton Negresiolo', 'Desde abril de 2025'],
    ['r', 'Recursos humanos', 'Stephanie Werner-Dietz']
  ], x: 'Europa: Geert Van Poelvoorde dejó la dirección regional a fines de julio de 2026; sucesor sin confirmar aquí.' },

  nippon: { n: [
    ['c', 'Presidente del consejo y CEO', 'Eiji Hashimoto', 'Desde abril de 2024'],
    ['d', 'Presidente y director de operaciones (COO)', 'Tadashi Imai', 'Desde abril de 2024'],
    ['r', 'Vicepresidente del consejo: negocio global y proyecto U.S. Steel', 'Takahiro Mori'],
    ['r', 'Vicepresidente ejecutivo, tecnología (CTO)', 'Naoki Sato']
  ], x: 'Completan el primer nivel otros vicepresidentes ejecutivos con cartera por función.' },

  ussteel: { n: [
    ['m', 'Dueño', 'Nippon Steel', '100 %; acción dorada del gobierno de EE. UU.', 'nippon'],
    ['c', 'Presidente del consejo', 'Takahiro Mori', 'Vicepresidente del consejo de Nippon Steel'],
    ['d', 'Presidente y CEO', 'David Burritt'],
    ['r', 'Finanzas (CFO)', 'Kevin Lewis'],
    ['r', 'Jurídico', 'Scot Duncan']
  ], x: 'Vicepresidentes ejecutivos a junio de 2025: James Bruno, Scott Buckiso y Daniel Brown. El acuerdo exige CEO y mayoría del consejo estadounidenses.' },

  ansteel: { n: [
    ['m', 'Dueño', 'Estado chino', 'SASAC, Consejo de Estado'],
    ['c', 'Presidente del consejo', 'Tan Chengxu'],
    ['r', 'Filial listada', 'Angang Steel', 'Director general: Tian Yong, desde agosto de 2025'],
    ['r', 'Filial', 'Bengang', 'Benxi'],
    ['r', 'Filial, vanadio y titanio', 'Pangang', 'Panzhihua'],
    ['r', 'Filial', 'Ansteel Mining', 'Mineral de hierro']
  ], x: 'Grupo estatal: el primer nivel se muestra por filiales.' },

  hbis: { n: [
    ['m', 'Dueño', 'Provincia de Hebei'],
    ['c', 'Presidente del consejo y secretario del Partido', 'Liu Jian', 'Sustituyó a Yu Yong'],
    ['r', 'Filial listada', 'HBIS Company'],
    ['r', 'Filial', 'Tangsteel', 'Tangshan'],
    ['r', 'Filial', 'Hansteel', 'Handan'],
    ['r', 'Filial en Europa', 'HBIS Serbia', 'Smederevo']
  ], x: 'Grupo estatal: el primer nivel se muestra por filiales.' },

  posco: { n: [
    ['c', 'Presidente y CEO de POSCO Holdings', 'Chang In-hwa', 'Desde marzo de 2024'],
    ['r', 'Presidente, estrategia corporativa', 'Lee Ju-tae'],
    ['r', 'CEO de POSCO, la acerera', 'Lee Hee-geun'],
    ['r', 'Tecnología (CTO del grupo)', 'Kim Ki-soo']
  ], x: 'El consejo de la tenedora lo preside un consejero externo: Yoo Jin-nyoung desde marzo de 2026.' },

  tata: { n: [
    ['m', 'Controladora', 'Tata Sons', '≈ un tercio del capital'],
    ['c', 'Presidente del consejo, no ejecutivo', 'N. Chandrasekaran', 'Vicepresidente: Noel Tata'],
    ['d', 'CEO y director general', 'T. V. Narendran'],
    ['r', 'Director ejecutivo y finanzas (CFO)', 'Koushik Chatterjee'],
    ['r', 'Filiales europeas', 'Tata Steel UK y Tata Steel Nederland', 'Las preside Narendran']
  ] },

  jsw: { n: [
    ['c', 'Presidente del consejo y director general', 'Sajjan Jindal'],
    ['d', 'Director general adjunto y CEO', 'Jayant Acharya', 'Desde mayo de 2023'],
    ['r', 'Operaciones (COO)', 'Gajraj Singh Rathore'],
    ['r', 'Comercial y mercadotecnia', 'Arun Maheshwari']
  ] },

  jfe: { n: [
    ['c', 'Presidente y CEO de JFE Holdings', 'Yoshihisa Kitano', 'Desde abril de 2024'],
    ['r', 'Acero', 'JFE Steel', 'Presidente y CEO: Masayuki Hirose'],
    ['r', 'Ingeniería', 'JFE Engineering'],
    ['r', 'Comercializadora', 'JFE Shoji']
  ], x: 'La tenedora agrupa tres empresas operativas; la acerera es la mayor.' },

  nucor: { n: [
    ['c', 'Presidente del consejo y CEO', 'Leon Topalian', 'Desde 2020'],
    ['r', 'Presidente y operaciones (COO)', 'Stephen Laxton', 'Desde enero de 2026'],
    ['r', 'Finanzas (CFO)', 'John “Jack” Sullivan', 'Desde marzo de 2026']
  ], x: 'Vicepresidentes ejecutivos por línea de negocio: K. Rex Query, Allen Behr, John Hollatz y Noah Hanners.' },

  cliffs: { n: [
    ['c', 'Presidente del consejo y CEO', 'Lourenco Goncalves', 'Desde 2014'],
    ['r', 'Presidente y finanzas (CFO)', 'Celso Goncalves Jr.', 'Desde julio de 2026'],
    ['r', 'Operaciones (COO)', 'Clifford Smith'],
    ['r', 'Cleveland-Cliffs Services', 'Keith Koci'],
    ['r', 'Jurídico', 'James Graham']
  ] },

  sdi: { n: [
    ['c', 'Presidente del consejo y CEO', 'Mark Millett', 'CEO hasta el 31 de diciembre de 2026'],
    ['r', 'Finanzas (CFO)', 'Theresa Wagler', 'Presidenta y CEO desde el 1 de enero de 2027'],
    ['r', 'Tecnología (CTO)', 'Barry Schneider'],
    ['r', 'Operaciones, aceros planos', 'Christopher Graham'],
    ['r', 'Operaciones, aluminio y reciclaje', 'Miguel Alvarez'],
    ['r', 'Operaciones, productos de construcción', 'James Anderson']
  ], x: 'Estructura vigente desde el 1 de septiembre de 2026. Richard Poinsatte será CFO desde el 1 de enero de 2027.' },

  gerdau: { n: [
    ['c', 'Presidente del consejo', 'André Bier Gerdau Johannpeter', 'Desde abril de 2025. Vicepresidente: Guilherme Chagas Gerdau Johannpeter'],
    ['d', 'Director presidente (CEO)', 'Gustavo Werneck', 'Desde 2018'],
    ['r', 'Finanzas (CFO) y relación con inversionistas', 'Rafael Japur']
  ], x: 'Completan la dirección ejecutiva, a agosto de 2026: Marcos Faraco Wahrhaftig, Mauricio Metz y Rafael Gamboa Lopes.' },

  thyssenkrupp: { n: [
    ['m', 'Dueño', 'thyssenkrupp AG', 'CEO: Miguel López'],
    ['c', 'Presidenta del consejo de vigilancia', 'Ilse Henne'],
    ['d', 'CEO de thyssenkrupp Steel', 'Marie Jaroni', 'Desde noviembre de 2025'],
    ['r', 'Finanzas (CFO)', 'Philipp Conze', 'Desde 2024'],
    ['r', 'Producción (COO)', 'Marco Richrath', 'Desde enero de 2026'],
    ['r', 'Ventas (CSO)', 'Georgios Giovanakis', 'Desde junio de 2026'],
    ['r', 'Recursos humanos', 'Wilfried von Rath', 'También en thyssenkrupp AG']
  ] },

  ssab: { n: [
    ['c', 'Presidente del consejo', 'Lennart Evrell', 'Reelecto en abril de 2026'],
    ['d', 'Presidente y CEO', 'Johnny Sjöström'],
    ['r', 'Finanzas (CFO)', 'Leena Craelius'],
    ['r', 'SSAB Special Steels', 'Per Elfgren'],
    ['r', 'SSAB Europe', 'Tony Harris'],
    ['r', 'SSAB Americas', 'Tom Cox', 'Desde febrero de 2026'],
    ['r', 'Tecnología y transformación', 'Carl Orrling']
  ] },

  sail: { n: [
    ['m', 'Dueño', 'Gobierno de la India', 'Ministerio del Acero'],
    ['d', 'Presidente y director general (CMD)', 'Ashok Kumar Panda', 'Desde mayo de 2026'],
    ['r', 'Planta integrada', 'Bhilai'],
    ['r', 'Planta integrada', 'Bokaro'],
    ['r', 'Planta integrada', 'Rourkela'],
    ['r', 'Plantas integradas', 'Durgapur e IISCO']
  ], x: 'Cada planta integrada la encabeza un director a cargo que reporta al CMD.' },

  hyundai: { n: [
    ['m', 'Controladora', 'Grupo Hyundai Motor', 'Presidente: Chung Euisun'],
    ['d', 'Presidente y director general', 'Lee Bo-ryong']
  ] }
};

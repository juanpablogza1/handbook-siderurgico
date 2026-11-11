/* Minas de mineral de hierro principales para el mapa.
   Fila: [mina, empresa, país, lat, lon, capacidad Mt/año de mineral (0 = sin dato), id de empresa en la app, nota]
   Ubicación aproximada. No es un inventario completo. */
S.minas = [
  /* México */
  ['Peña Colorada', 'Ternium y ArcelorMittal', 'México', 19.37, -104.10, 0, 'ternium', 'Minatitlán, Colima. Propiedad a partes iguales; peletizadora en Manzanillo'],
  ['Las Encinas', 'Ternium', 'México', 18.60, -103.50, 0, 'ternium', 'Aquila, Michoacán. Peletizadora en Alzada, Colima'],
  ['Las Truchas', 'ArcelorMittal México', 'México', 18.03, -102.37, 0, 'am-mexico', 'Lázaro Cárdenas, Michoacán'],
  ['Hércules', 'AHMSA (MINOSA)', 'México', 28.03, -103.77, 0, 'ahmsa', 'Sierra Mojada, Coahuila. Parada junto con AHMSA'],

  /* Estados Unidos y Canadá */
  ['Minntac', 'U.S. Steel', 'Estados Unidos', 47.55, -92.63, 0, 'ussteel', 'Mountain Iron, Minnesota. Taconita y pélet'],
  ['Keetac', 'U.S. Steel', 'Estados Unidos', 47.40, -93.08, 0, 'ussteel', 'Keewatin, Minnesota'],
  ['Hibbing Taconite', 'Cleveland-Cliffs', 'Estados Unidos', 47.48, -92.97, 0, 'cliffs', 'Minnesota'],
  ['Minorca', 'Cleveland-Cliffs', 'Estados Unidos', 47.56, -92.52, 0, 'cliffs', 'Virginia, Minnesota'],
  ['United Taconite', 'Cleveland-Cliffs', 'Estados Unidos', 47.40, -92.60, 0, 'cliffs', 'Eveleth, Minnesota'],
  ['Northshore', 'Cleveland-Cliffs', 'Estados Unidos', 47.67, -91.90, 0, 'cliffs', 'Babbitt, Minnesota'],
  ['Tilden', 'Cleveland-Cliffs', 'Estados Unidos', 46.44, -87.65, 0, 'cliffs', 'Michigan'],
  ['Mont-Wright', 'ArcelorMittal', 'Canadá', 52.77, -67.33, 26, 'arcelormittal', 'Fermont, Quebec. Concentrado y pélet vía Port-Cartier'],
  ['Carol Lake (IOC)', 'Rio Tinto', 'Canadá', 52.95, -66.92, 0, '', 'Labrador City'],
  ['Bloom Lake', 'Champion Iron', 'Canadá', 52.83, -67.28, 0, '', 'Quebec. Concentrado de alta ley'],
  ['Mary River', 'Baffinland', 'Canadá', 71.32, -79.22, 0, '', 'Isla de Baffin, Nunavut. ArcelorMittal es socio'],

  /* Sudamérica */
  ['Carajás, Serra Norte', 'Vale', 'Brasil', -6.07, -50.17, 0, '', 'Pará. Mineral de la ley más alta del mercado'],
  ['S11D (Serra Sul)', 'Vale', 'Brasil', -6.42, -50.33, 90, '', 'Pará. La mayor mina de hierro del mundo'],
  ['Itabira', 'Vale', 'Brasil', -19.62, -43.22, 0, '', 'Minas Gerais. Donde nació Vale en 1942'],
  ['Brucutu', 'Vale', 'Brasil', -19.87, -43.38, 0, '', 'Minas Gerais'],
  ['Germano (Samarco)', 'Vale y BHP', 'Brasil', -20.20, -43.50, 0, '', 'Mariana, Minas Gerais. Pélet por mineroducto hasta Ubu'],
  ['Casa de Pedra', 'CSN Mineração', 'Brasil', -20.47, -43.90, 0, '', 'Congonhas, Minas Gerais'],
  ['Minas-Rio', 'Anglo American', 'Brasil', -18.90, -43.42, 26.5, '', 'Minas Gerais. Mineroducto de 529 km hasta el puerto de Açu'],
  ['Serra Azul (MUSA)', 'Usiminas', 'Brasil', -20.20, -44.42, 0, 'ternium', 'Itatiaiuçu, Minas Gerais. Ternium controla Usiminas'],
  ['Marcona', 'Shougang Hierro Perú', 'Perú', -15.22, -75.13, 0, 'shougang', 'Ica. Única productora importante de hierro del Perú'],
  ['Los Colorados', 'CAP (CMP)', 'Chile', -28.30, -70.82, 0, '', 'Huasco, Atacama'],
  ['El Romeral', 'CAP (CMP)', 'Chile', -29.72, -71.23, 0, '', 'La Serena, Coquimbo'],
  ['Cerro Bolívar', 'Ferrominera Orinoco', 'Venezuela', 7.47, -63.40, 0, '', 'Estado Bolívar'],

  /* Australia */
  ['Mount Whaleback', 'BHP', 'Australia', -23.36, 119.67, 0, '', 'Newman, Pilbara'],
  ['South Flank y Mining Area C', 'BHP', 'Australia', -22.92, 118.98, 80, '', 'Pilbara. South Flank: 80 Mt/año'],
  ['Jimblebar', 'BHP', 'Australia', -23.38, 120.13, 0, '', 'Pilbara'],
  ['Yandi', 'BHP', 'Australia', -22.72, 119.08, 0, '', 'Pilbara'],
  ['Tom Price', 'Rio Tinto', 'Australia', -22.75, 117.77, 0, '', 'Pilbara. En operación desde 1966'],
  ['Brockman 4', 'Rio Tinto', 'Australia', -22.60, 117.28, 0, '', 'Pilbara'],
  ['Gudai-Darri', 'Rio Tinto', 'Australia', -22.53, 119.07, 43, '', 'Pilbara'],
  ['Hope Downs', 'Rio Tinto y Hancock', 'Australia', -22.95, 119.17, 0, '', 'Pilbara'],
  ['Yandicoogina', 'Rio Tinto', 'Australia', -22.77, 119.23, 0, '', 'Pilbara'],
  ['West Angelas', 'Rio Tinto', 'Australia', -23.17, 118.77, 0, '', 'Pilbara'],
  ['Solomon Hub', 'Fortescue', 'Australia', -22.15, 117.87, 0, '', 'Pilbara'],
  ['Cloudbreak y Christmas Creek', 'Fortescue', 'Australia', -22.30, 119.38, 0, '', 'Chichester Hub, Pilbara'],
  ['Eliwana', 'Fortescue', 'Australia', -22.43, 116.87, 0, '', 'Pilbara'],
  ['Roy Hill', 'Hancock Prospecting', 'Australia', -22.60, 119.95, 60, '', 'Pilbara'],
  ['Sino Iron', 'CITIC Pacific', 'Australia', -20.98, 116.20, 0, '', 'Cape Preston, Pilbara. Magnetita'],
  ['Karara', 'Ansteel', 'Australia', -29.18, 116.75, 0, 'ansteel', 'Medio Oeste de Australia Occidental. Magnetita'],
  ['Middleback Ranges', 'Whyalla Steelworks', 'Australia', -33.13, 137.15, 0, '', 'Australia Meridional'],

  /* África */
  ['Simandou', 'Rio Tinto, Chinalco, Baowu y Winning', 'Guinea', 8.55, -8.90, 120, '', 'Capacidad plena planeada: 120 Mt/año. Primeros embarques a fines de 2025'],
  ['Nimba (Yekepa)', 'ArcelorMittal', 'Liberia', 7.55, -8.55, 0, 'arcelormittal', 'Ferrocarril hasta el puerto de Buchanan'],
  ['Tonkolili', 'Leone Rock', 'Sierra Leona', 8.97, -11.72, 0, '', ''],
  ['Zouérat', 'SNIM', 'Mauritania', 22.72, -12.47, 0, '', 'Tren minero de 700 km hasta Nuadibú'],
  ['Sishen', 'Kumba Iron Ore (Anglo American)', 'Sudáfrica', -27.73, 23.00, 0, '', 'Cabo del Norte. Ferrocarril a Saldanha'],
  ['Kolomela', 'Kumba Iron Ore (Anglo American)', 'Sudáfrica', -28.38, 22.97, 0, '', 'Cabo del Norte'],

  /* Europa, Rusia, Ucrania y Kazajistán */
  ['Kiruna', 'LKAB', 'Suecia', 67.85, 20.20, 0, '', 'La mayor mina subterránea de hierro del mundo'],
  ['Malmberget', 'LKAB', 'Suecia', 67.18, 20.67, 0, '', 'Gällivare'],
  ['Cuenca de Kryvyi Rih', 'Metinvest y ArcelorMittal', 'Ucrania', 47.95, 33.35, 0, 'arcelormittal', 'Varias minas y plantas de concentrado'],
  ['Poltava', 'Ferrexpo', 'Ucrania', 49.00, 33.65, 0, '', 'Horishni Plavni. Pélet'],
  ['Lebedinsky', 'Metalloinvest', 'Rusia', 51.25, 37.62, 0, '', 'Gubkin, anomalía magnética de Kursk'],
  ['Mikhailovsky', 'Metalloinvest', 'Rusia', 52.33, 35.37, 0, '', 'Zheleznogorsk, Kursk'],
  ['Stoilensky', 'NLMK', 'Rusia', 51.27, 37.78, 0, '', 'Stary Oskol'],
  ['Kachkanar', 'Evraz', 'Rusia', 58.75, 59.50, 0, '', 'Urales. Mineral con vanadio'],
  ['Kostomuksha', 'Severstal', 'Rusia', 64.65, 30.75, 0, '', 'Carelia. Pélet'],
  ['Sokolov-Sarbai', 'ERG', 'Kazajistán', 52.97, 63.12, 0, '', 'Rudny'],

  /* Asia */
  ['Bailadila', 'NMDC', 'India', 18.70, 81.22, 0, '', 'Chhattisgarh'],
  ['Donimalai', 'NMDC', 'India', 15.07, 76.62, 0, '', 'Karnataka'],
  ['Noamundi', 'Tata Steel', 'India', 22.15, 85.50, 0, 'tata', 'Jharkhand'],
  ['Joda', 'Tata Steel', 'India', 22.02, 85.42, 0, 'tata', 'Odisha'],
  ['Kiriburu y Meghahatuburu', 'SAIL', 'India', 22.10, 85.28, 0, 'sail', 'Jharkhand'],
  ['Dalli-Rajhara', 'SAIL', 'India', 20.57, 81.07, 0, 'sail', 'Chhattisgarh. Surte a Bhilai'],
  ['Minas de Anshan', 'Ansteel', 'China', 41.15, 123.10, 0, 'ansteel', 'Liaoning. Mineral de baja ley, concentrado'],
  ['Nanfen', 'Ansteel', 'China', 41.10, 123.80, 0, 'ansteel', 'Benxi, Liaoning'],
  ['Panzhihua', 'Ansteel', 'China', 26.62, 101.78, 0, 'ansteel', 'Sichuan. Magnetita con vanadio y titanio'],
  ['Bayan Obo', 'Baotou Steel', 'China', 41.78, 109.97, 0, '', 'Mongolia Interior. Hierro y tierras raras'],
  ['Sijiaying', 'HBIS', 'China', 39.75, 118.63, 0, 'hbis', 'Luanzhou, Hebei'],
  ['Shuichang', 'Shougang', 'China', 40.08, 118.58, 0, 'shougang', "Qian'an, Hebei"],
  ['Daye', 'China Baowu', 'China', 30.22, 114.90, 0, 'baowu', 'Hubei. Explotada desde hace siglos'],
  ['Gol-e-Gohar', 'Gol-e-Gohar', 'Irán', 29.10, 55.32, 0, '', 'Sirjan, Kermán'],
  ['Chadormalu', 'Chadormalu', 'Irán', 32.30, 55.53, 0, '', 'Yazd'],
  ['Sangan', 'IMIDRO y socios', 'Irán', 34.45, 60.27, 0, '', 'Jorasán Razaví']
];

/* Simulador de composición: clasifica la aleación, busca grados parecidos y calcula índices metalúrgicos.
   Las fórmulas son correlaciones empíricas de uso común; sirven para orientar, no para certificar. */
(function () {
  var EL = [
    ['C', 4.5, 0.01, 1], ['Mn', 20, 0.05, 1], ['Si', 4, 0.05, 1], ['Cr', 30, 0.1, 1], ['Ni', 25, 0.1, 1], ['Mo', 7, 0.05, 1],
    ['V', 5, 0.01, 0], ['Nb', 0.5, 0.005, 0], ['Ti', 1, 0.005, 0], ['Al', 2, 0.01, 0], ['B', 0.01, 0.0005, 0], ['N', 0.4, 0.005, 0],
    ['Cu', 5, 0.05, 0], ['W', 20, 0.1, 0], ['Co', 12, 0.1, 0], ['P', 0.2, 0.005, 0], ['S', 0.4, 0.005, 0]
  ];
  var NOM = { C: 'Carbono', Mn: 'Manganeso', Si: 'Silicio', Cr: 'Cromo', Ni: 'Níquel', Mo: 'Molibdeno', V: 'Vanadio', Nb: 'Niobio', Ti: 'Titanio', Al: 'Aluminio', B: 'Boro', N: 'Nitrógeno', Cu: 'Cobre', W: 'Tungsteno', Co: 'Cobalto', P: 'Fósforo', S: 'Azufre' };
  var TOL = { C: 0.04, Mn: 0.25, Si: 0.2, Cr: 0.3, Ni: 0.3, Mo: 0.1, V: 0.05, Nb: 0.02, Ti: 0.03, Al: 0.06, B: 0.0012, N: 0.03, Cu: 0.15, W: 0.3, Co: 0.3, P: 0.03, S: 0.03 };
  var PESO = { Al: 0.4, P: 0.5, S: 0.5, N: 0.5, B: 0.7 };
  var PRESETS = ['a36', '1008', '1045', '1080', 'a572', 'x70', 'dp600', '22mnb5', '4140', '8620', '52100', '304', '316l', '430', '410', '2205', 'd2', 'h13', 'm2', 'hadfield', 'ngo', 'gris'];

  function full(c) { var o = {}; EL.forEach(function (e) { o[e[0]] = +(c[e[0]] || 0); }); return o; }
  function dec(step) { return step >= 0.1 ? 1 : step >= 0.01 ? 2 : step >= 0.001 ? 3 : 4; }
  function fmt(v, step) { return v.toFixed(dec(step)); }
  function sum(c) { var s = 0; EL.forEach(function (e) { s += c[e[0]]; }); return s; }

  /* ---------- Clasificación ---------- */
  S.clasificar = function (c) {
    c = full(c);
    var fe = 100 - sum(c);
    var creq = c.Cr + c.Mo + 1.5 * c.Si + 0.5 * c.Nb, nieq = c.Ni + 30 * c.C + 30 * c.N + 0.5 * c.Mn;
    var micro = c.Nb + c.V + c.Ti;
    var al = c.Cr + c.Ni + c.Mo + c.V + c.W + c.Co + Math.max(0, c.Mn - 1.65) + Math.max(0, c.Si - 0.6) + Math.max(0, c.Cu - 0.6);
    function R(fam, why, k) { return { fam: fam, why: why, k: k, fe: fe, creq: creq, nieq: nieq, al: al }; }

    if (fe < 50) return R('No es un acero', 'Tiene menos de 50 % de hierro: es una aleación base níquel, cromo o cobalto.', 'no');

    if (c.C > 2.1) {
      if (c.Cr >= 10) return R('Hierro blanco de alto cromo', 'Más de 2.1 % C con mucho cromo: carburos de cromo muy duros en matriz martensítica. Resistencia a la abrasión.', 'hierro');
      if (c.Ni >= 13) return R('Hierro fundido austenítico', 'El níquel alto estabiliza la austenita (tipo Ni-Resist): resiste corrosión y calor.', 'hierro');
      if (c.Si >= 1.2) return R('Hierro fundido gris o nodular', 'Más de 2.1 % C y silicio alto: el carbono precipita como grafito. Con magnesio en el tratamiento el grafito sale en esferas (nodular).', 'hierro');
      return R('Hierro fundido blanco', 'Más de 2.1 % C con poco silicio: el carbono queda como cementita. Duro y frágil.', 'hierro');
    }

    if (c.Cr >= 10.5 && c.C <= 1.2) {
      var aust = nieq >= creq - 8 && (c.Ni + c.Mn) >= 5;
      if (aust) {
        var d = [];
        if (c.Mn >= 4 && c.Ni < 6.5) d.push('serie 200: manganeso y nitrógeno sustituyen parte del níquel');
        else if (c.Cr >= 23 && c.Ni >= 17) d.push('refractario tipo 310: resiste oxidación a alta temperatura');
        else if (c.Mo >= 2) d.push('con molibdeno tipo 316: mejor resistencia a cloruros');
        else d.push('familia 18-8 tipo 304');
        if (c.Ti >= 5 * c.C && c.Ti >= 0.1 || c.Nb >= 10 * c.C && c.Nb >= 0.2) d.push('estabilizado con Ti o Nb');
        else if (c.C <= 0.03) d.push('grado L de bajo carbono, apto para soldar sin sensibilizar');
        return R('Inoxidable austenítico', 'Cromo sobre 10.5 % y suficientes formadores de austenita (Ni, Mn, N, C). No magnético; ' + d.join('; ') + '.', 'inox-aust');
      }
      if ((c.Cu >= 2 && c.Ni >= 3 && c.Ni <= 9) || (c.Al >= 0.7 && c.Ni >= 6 && c.Ni <= 9))
        return R('Inoxidable endurecible por precipitación', 'Matriz martensítica de bajo carbono que endurece al envejecer por precipitados de cobre o aluminio (tipo 17-4 PH o 17-7 PH).', 'inox-ph');
      if (c.Cr >= 19 && nieq >= creq - 17)
        return R(c.Cr + 3.3 * c.Mo + 16 * c.N >= 40 ? 'Inoxidable superdúplex' : 'Inoxidable dúplex', 'Cromo alto con níquel y nitrógeno moderados: mezcla de ferrita y austenita. El doble de límite elástico que un 304.', 'inox-duplex');
      if (c.C >= 0.15 || (c.C >= 0.08 && c.Cr < 14.5) || (c.Ni >= 2 && c.Cr < 18))
        return R('Inoxidable martensítico', 'Cromo con carbono suficiente para templar. Magnético; ' + (c.C >= 0.6 ? 'alto carbono tipo 440: máxima dureza.' : c.C >= 0.15 ? 'tipo 420: cuchillería y moldes.' : 'tipo 410: uso general.'), 'inox-mart');
      return R('Inoxidable ferrítico', 'Cromo sin níquel y bajo carbono: ferrita a toda temperatura, no templa. Magnético' + (c.Ti + c.Nb >= 0.1 ? '; estabilizado con Ti o Nb para soldar' : '') + (c.Mo >= 1 ? '; con molibdeno para mejor resistencia a picaduras' : '') + '.', 'inox-ferr');
    }

    if (c.C >= 1.2 && c.Cr >= 10) return R('Acero para herramienta de trabajo en frío, tipo D', 'Alto carbono y alto cromo: gran volumen de carburos de cromo. Máxima resistencia al desgaste; no es inoxidable porque el cromo queda en los carburos.', 'herramienta');
    if (c.C >= 0.6 && c.Cr >= 3 && (c.W >= 5 || (c.Mo >= 3.5 && c.V >= 0.8)))
      return R('Acero rápido' + (c.W >= 12 ? ' al tungsteno, serie T' : ' al molibdeno, serie M'), 'Carburos de W, Mo y V con endurecimiento secundario: conserva el filo al rojo, hasta ≈ 600 °C.', 'herramienta');
    if (c.Ni >= 15 && c.Co >= 6 && c.C <= 0.05) return R('Acero maraging', 'Martensita de níquel casi sin carbono que endurece por precipitación de intermetálicos de Mo y Ti. Más de 2 000 MPa.', 'especial');
    if (c.Mn >= 10 && c.C >= 0.7) return R('Acero austenítico al manganeso (Hadfield)', 'Con 11–14 % Mn y ≈ 1 % C es austenítico y no magnético. Endurece al golpe: ideal contra impacto y abrasión.', 'especial');
    if (c.Mn >= 15) return R('Acero austenítico de alto manganeso', 'Manganeso muy alto con carbono moderado: austenita que deforma por maclado (TWIP). Gran elongación con alta resistencia.', 'especial');
    if (c.Cr >= 3 && c.Cr <= 6.5 && c.Mo >= 0.8 && c.C >= 0.3 && c.C <= 0.6) {
      if (c.C >= 0.45 && c.Cr < 4) return R('Acero para herramienta resistente al impacto, tipo S', 'Carbono medio con Cr y Mo: alta tenacidad a durezas de 54–58 HRC.', 'herramienta');
      return R('Acero para herramienta de trabajo en caliente, tipo H', 'Carbono medio con 5 % Cr, Mo y V: resiste fatiga térmica y conserva dureza hasta ≈ 550 °C.', 'herramienta');
    }
    if (c.C >= 0.85 && c.Cr >= 4) return R('Acero para herramienta de trabajo en frío, tipo A', 'Alto carbono con 5 % Cr y Mo: templa al aire con poca distorsión.', 'herramienta');
    if (c.Si >= 1.5 && c.C <= 0.08) return R('Acero eléctrico al silicio', 'El silicio sube la resistividad y baja las pérdidas magnéticas. ' + (c.Si >= 2.9 && c.Al < 0.1 ? 'Composición de grano orientado: transformadores.' : 'Composición de grano no orientado: motores y generadores.'), 'especial');
    if (c.Ni >= 3 && c.Cr < 1 && c.C <= 0.25) return R('Acero al níquel para servicio criogénico', 'El níquel baja la temperatura de transición dúctil-frágil. Con 9 % Ni es tenaz a −196 °C.', 'aleado');
    if (c.Cr >= 7 && c.Mo >= 0.5 && c.C <= 0.2) return R('Acero Cr-Mo para alta temperatura (9 % Cr)', 'Martensítico revenido con carbonitruros de V y Nb: resistencia a la fluencia hasta ≈ 600 °C (tipo P91).', 'aleado');
    if (al > 8) return R('Acero de alta aleación', 'Más de 8 % de aleantes sin encajar en una familia comercial conocida.', 'especial');
    if (c.C >= 0.9 && c.Cr >= 1 && c.Cr <= 2) return R('Acero para rodamientos', 'Alrededor de 1 % C y 1.5 % Cr (tipo 52100): carburos finos y dureza de 60–64 HRC tras el temple.', 'aleado');
    if (c.C <= 0.2 && c.Cr >= 0.8 && c.Mo >= 0.4 && c.Ni < 0.6) return R('Acero Cr-Mo para alta temperatura', 'Bajo carbono con cromo y molibdeno: resistencia a la fluencia y al ataque por hidrógeno en calderas y refinerías.', 'aleado');
    if (c.C >= 0.85 && al >= 0.4) return R('Acero para herramienta de baja aleación, tipo O', 'Alto carbono con algo de Mn, Cr y W: templa al aceite.', 'herramienta');
    if (c.C >= 0.5 && c.Si >= 1.2) return R('Acero al silicio para resortes', 'El silicio eleva el límite elástico y la resistencia al relajamiento (tipo 9260).', 'aleado');
    if (c.B >= 0.0008 && c.C >= 0.18 && c.C <= 0.4 && c.Mn >= 1.0 && c.Cr < 0.6) return R('Acero al boro para estampado en caliente', 'Manganeso y boro dan templabilidad suficiente para formar martensita dentro del dado (tipo 22MnB5): ≈ 1 500 MPa.', 'ahss');
    if (c.C >= 0.12 && c.C <= 0.3 && c.Mn >= 1.4 && (c.Si + c.Al) >= 1.0) return R('Composición tipo TRIP', 'Silicio o aluminio alto evita los carburos y deja austenita retenida, que transforma al deformar. La microestructura final depende del recocido.', 'ahss');
    if (c.C >= 0.06 && c.C <= 0.18 && c.Mn >= 1.5 && c.Mn <= 2.6 && (c.Cr + c.Mo) >= 0.2 && (c.Cr + c.Mo) <= 1.2 && c.Ni < 0.5) return R('Composición tipo doble fase (DP)', 'Bajo carbono con Mn, Cr y Mo: tras un recocido intercrítico y enfriamiento rápido da ferrita con islas de martensita.', 'ahss');
    if (c.C <= 0.008 && al < 1 && c.Mn < 1) return (c.Ti >= 0.02 || c.Nb >= 0.01)
      ? R('Acero libre de intersticiales (IF)', 'Carbono ultrabajo y Ti o Nb que fijan C y N: sin punto de fluencia, máxima embutibilidad.', 'carbono')
      : R('Acero de ultra bajo carbono', 'Menos de 80 ppm de carbono, obtenido con desgasificado al vacío. Muy blando y formable.', 'carbono');
    if (c.Cu >= 0.25 && c.Cu <= 0.6 && c.Cr >= 0.3 && c.Cr <= 1.3 && c.C <= 0.22) return R('Acero patinable', 'Cobre, cromo y níquel forman una pátina de óxido adherente que frena la corrosión atmosférica (tipo A588).', 'hsla');
    if (c.C <= 0.26 && micro >= 0.02 && c.Cr < 0.6 && c.Ni < 0.6 && c.Mo < 0.35)
      return R('Acero HSLA microaleado', 'Bajo carbono con Nb, V o Ti: grano fino y precipitados suben el límite elástico sin perder soldabilidad' + (c.C <= 0.12 && c.Mn >= 1.1 && c.Nb >= 0.02 ? '. Composición típica de tubería API y laminado termomecánico.' : '.'), 'hsla');
    if (c.Cr >= 0.3 || c.Ni >= 0.4 || c.Mo >= 0.12) {
      var ser = c.Ni >= 1.5 && c.Cr >= 0.4 && c.Mo >= 0.15 ? 'níquel-cromo-molibdeno (43xx)' : c.Ni >= 0.3 && c.Cr >= 0.3 && c.Mo >= 0.12 ? 'níquel-cromo-molibdeno (86xx)' : c.Cr >= 0.7 && c.Mo >= 0.12 ? 'cromo-molibdeno (41xx)' : c.Cr >= 0.7 && c.V >= 0.1 ? 'cromo-vanadio (61xx)' : c.Cr >= 0.3 ? 'al cromo (51xx)' : c.Mo >= 0.12 && c.Ni < 0.4 ? 'al molibdeno (40xx)' : 'al níquel';
      var uso = c.C <= 0.25 ? 'Por su bajo carbono se usa cementado.' : c.C <= 0.55 ? 'Se usa templado y revenido.' : 'Alto carbono: resortes y piezas de alta dureza.';
      return R('Acero aleado ' + ser, 'Los aleantes aumentan la templabilidad: endurece en secciones gruesas. ' + uso, 'aleado');
    }
    if (c.Mn > 1.65 && c.C >= 0.25) return R('Acero al manganeso (13xx)', 'Manganeso sobre 1.65 %: más templabilidad que un acero al carbono simple.', 'aleado');
    if (c.S >= 0.08) return R('Acero de maquinado libre' + (c.P >= 0.04 ? ' (12xx)' : ' (11xx)'), 'El azufre forma sulfuros de manganeso que rompen la viruta. No se recomienda soldar.', 'carbono');
    if (c.P >= 0.04 && c.C <= 0.12) return R('Acero refosforado', 'El fósforo endurece la ferrita por solución sólida conservando formabilidad.', 'carbono');
    if (c.C <= 0.25) return R('Acero al carbono, bajo carbono', (c.C < 0.1 ? 'Muy formable y soldable: lámina, alambrón, tubería ligera.' : 'Soldable y dúctil: estructural, placa, varilla, tubería.') + ' No endurece de forma útil al temple.', 'carbono');
    if (c.C < 0.6) return R('Acero al carbono, medio carbono', 'Responde al temple y revenido. Flechas, engranes, rieles. Requiere precalentamiento al soldar.', 'carbono');
    if (c.C <= 1.0) return R('Acero al carbono, alto carbono', 'Alta dureza y resistencia al desgaste; baja soldabilidad. Alambre, resortes, herramienta.', 'carbono');
    return R('Acero de ultra alto carbono', 'Más de 1 % C con cementita libre. Herramienta de temple al agua, limas, cuchillas.', 'herramienta');
  };

  /* ---------- Índices ---------- */
  S.indices = function (c, cl) {
    c = full(c); var o = [];
    var bajo = cl.al < 6 && c.C <= 1.0 && ['hierro', 'no', 'inox-aust', 'inox-ferr', 'inox-mart', 'inox-duplex', 'inox-ph'].indexOf(cl.k) < 0 && c.Mn < 3;
    if (bajo) {
      var ce = c.C + c.Mn / 6 + (c.Cr + c.Mo + c.V) / 5 + (c.Ni + c.Cu) / 15;
      var pcm = c.C + c.Si / 30 + (c.Mn + c.Cu + c.Cr) / 20 + c.Ni / 60 + c.Mo / 15 + c.V / 10 + 5 * c.B;
      var w = ce <= 0.35 ? ['ok', 'Soldabilidad excelente'] : ce <= 0.45 ? ['ok', 'Buena; electrodo de bajo hidrógeno'] : ce <= 0.6 ? ['warn', 'Regular; precalentar'] : ['bad', 'Difícil; precalentar y postcalentar'];
      o.push(['Carbono equivalente (IIW)', ce.toFixed(2), w[1], w[0]]);
      if (c.C <= 0.18) o.push(['Pcm', pcm.toFixed(2), pcm <= 0.2 ? 'Bajo riesgo de fisura en frío' : pcm <= 0.25 ? 'Riesgo moderado' : 'Riesgo alto', pcm <= 0.2 ? 'ok' : pcm <= 0.25 ? 'warn' : 'bad']);
      if (c.C >= 0.08) {
        var hrc = Math.min(66, 20 + 60 * Math.sqrt(Math.min(c.C, 0.62)));
        o.push(['Dureza máxima al temple', hrc.toFixed(0) + ' HRC', 'Martensita sin revenir; depende solo del carbono', '']);
      }
      var ms = 539 - 423 * c.C - 30.4 * c.Mn - 17.7 * c.Ni - 12.1 * c.Cr - 7.5 * c.Mo;
      o.push(['Inicio de martensita (Ms)', ms.toFixed(0) + ' °C', 'Fórmula de Andrews', '']);
      if (c.C <= 0.7 && c.Cr <= 5 && c.Ni <= 5) {
        var ac1 = 723 - 10.7 * c.Mn - 16.9 * c.Ni + 29.1 * c.Si + 16.9 * c.Cr + 6.38 * c.W;
        var ac3 = 910 - 203 * Math.sqrt(c.C) - 15.2 * c.Ni + 44.7 * c.Si + 104 * c.V + 31.5 * c.Mo + 13.1 * c.W;
        o.push(['Ac1 / Ac3', ac1.toFixed(0) + ' / ' + ac3.toFixed(0) + ' °C', 'Austenizar para temple a ≈ ' + (Math.round((ac3 + 40) / 5) * 5) + ' °C', '']);
      }
      if (c.C >= 0.1 && c.C <= 0.9 && c.Mn <= 1.95 && c.Si <= 2 && c.Ni <= 3.5 && c.Cr <= 2.5 && c.Mo <= 0.55 && c.V <= 0.2) {
        var C = c.C, b = C <= 0.39 ? 0.54 * C : C <= 0.55 ? 0.171 + 0.001 * C + 0.265 * C * C : C <= 0.65 ? 0.115 + 0.268 * C - 0.038 * C * C : C <= 0.75 ? 0.143 + 0.2 * C : 0.062 + 0.409 * C - 0.135 * C * C;
        var fMn = c.Mn <= 1.2 ? 3.3333 * c.Mn + 1 : 5.1 * c.Mn - 1.12;
        var di = b * fMn * (1 + 0.7 * c.Si) * (1 + 0.363 * c.Ni) * (1 + 2.16 * c.Cr) * (1 + 3 * c.Mo) * (1 + 0.365 * c.Cu) * (1 + 1.73 * c.V) * 25.4;
        var q = di < 25 ? 'Templabilidad baja: solo secciones delgadas, temple al agua' : di < 75 ? 'Templabilidad media' : di < 150 ? 'Templabilidad alta: templa al aceite en secciones medianas' : 'Templabilidad muy alta';
        o.push(['Diámetro ideal (DI)', di.toFixed(0) + ' mm', q + (c.B >= 0.0005 ? '; el boro efectivo lo aumenta aún más' : ''), '']);
      }
    }
    if (cl.k.indexOf('inox') === 0) {
      var pren = c.Cr + 3.3 * c.Mo + 16 * c.N;
      o.push(['PREN', pren.toFixed(1), pren < 20 ? 'Ambientes suaves, sin cloruros' : pren < 30 ? 'Uso general; 316 ronda 24' : pren < 40 ? 'Buena resistencia a cloruros' : 'Apto para agua de mar', pren < 20 ? 'warn' : 'ok']);
      o.push(['Cr equivalente', cl.creq.toFixed(1), 'Cr + Mo + 1.5 Si + 0.5 Nb', '']);
      o.push(['Ni equivalente', cl.nieq.toFixed(1), 'Ni + 30 C + 30 N + 0.5 Mn', '']);
      o.push(['Magnético', cl.k === 'inox-aust' ? 'No' : cl.k === 'inox-duplex' ? 'Sí, parcial' : 'Sí', cl.k === 'inox-aust' ? 'Puede magnetizarse algo al deformar en frío' : '', '']);
    }
    return o;
  };

  S.alertas = function (c, cl) {
    c = full(c); var a = [], base = ['carbono', 'hsla', 'aleado', 'ahss'].indexOf(cl.k) >= 0;
    if (cl.fe < 50) return a;
    if (c.S >= 0.03 && c.Mn / c.S < 20) a.push('Relación Mn/S de ' + (c.Mn / c.S).toFixed(0) + ': riesgo de fragilidad en caliente. Mantén Mn/S sobre 20.');
    if (c.P > 0.04 && !(c.P <= 0.12 && c.C <= 0.12)) a.push('Fósforo alto: fragilidad en frío y menor tenacidad.');
    if (base && c.Cu > 0.2 && c.Ni < c.Cu / 2 && cl.fam.indexOf('patinable') < 0) a.push('Cobre sobre 0.20 % sin níquel: grietas superficiales al laminar en caliente. Níquel ≥ ½ Cu lo evita.');
    if (c.B >= 0.0005 && c.Ti < 0.02 && c.Al < 0.03) a.push('Boro sin protección: agrega Ti (≈ 3.4 × N) para que no se pierda como nitruro.');
    if (base && c.N > 0.012) a.push('Nitrógeno alto: envejecimiento por deformación. Fíjalo con Al, Ti o V.');
    if (base && c.C >= 0.09 && c.C <= 0.17) a.push('Carbono en rango peritéctico (0.09–0.17 %): el acero es propenso a grietas en la colada continua.');
    if (base && ((c.Si >= 0.04 && c.Si <= 0.12) || c.Si > 0.25)) a.push('Silicio en rango reactivo para galvanizado por inmersión de piezas: capa gruesa y gris (efecto Sandelin).');
    if (cl.k === 'inox-aust' && c.C > 0.03 && !(c.Ti >= 5 * c.C || c.Nb >= 10 * c.C)) a.push('Carbono sobre 0.03 %: al soldar puede precipitar carburos de cromo en límite de grano (sensibilización). Usa grado L o estabilizado si la pieza va soldada.');
    if (cl.k === 'inox-ferr' && c.Cr >= 20) a.push('Ferrítico de alto cromo: fragilidad a 475 °C y por fase sigma si trabaja caliente por tiempo prolongado.');
    if (cl.k === 'hierro') a.push('Los hierros fundidos se producen por fundición, no por laminación.');
    return a;
  };

  /* ---------- Grados parecidos ---------- */
  S.parecidos = function (c) {
    c = full(c);
    var out = S.grados.map(function (g) {
      var gc = full(g.c), d2 = 0;
      EL.forEach(function (e) {
        var k = e[0], s = TOL[k] + 0.15 * Math.max(c[k], gc[k]), d = (c[k] - gc[k]) / s * (PESO[k] || 1);
        d2 += d * d;
      });
      return { g: g, sim: Math.round(100 * Math.exp(-d2 / 20)) };
    });
    out.sort(function (a, b) { return b.sim - a.sim; });
    return out.slice(0, 3);
  };

  /* ---------- Interfaz ---------- */
  var comp = null;
  function u2v(u, max, step) { var v = max * u * u; return Math.round(v / step) * step; }
  function v2u(v, max) { return Math.sqrt(Math.max(0, v) / max); }

  S.simView = function () {
    if (!comp) comp = full(S.grados.filter(function (g) { return g.id === 'a36'; })[0].c);
    function row(e) {
      return '<div class="sl" data-el="' + e[0] + '"><label title="' + NOM[e[0]] + '">' + e[0] + '</label>' +
        '<input type="range" min="0" max="1000" step="1" aria-label="' + NOM[e[0]] + '">' +
        '<span class="val"><button type="button" data-d="-1" aria-label="Menos ' + NOM[e[0]] + '">−</button><output></output><button type="button" data-d="1" aria-label="Más ' + NOM[e[0]] + '">+</button></span></div>';
    }
    var h = '<div class="simres" id="simres" aria-live="polite"></div>' +
      '<p class="small">Mueve los elementos o parte de un grado conocido. Porcentajes en peso; el resto es hierro.</p>' +
      '<div class="presets">' + PRESETS.map(function (id) { var g = S.grados.filter(function (x) { return x.id === id; })[0]; return '<button type="button" data-p="' + id + '">' + g.n.replace(/ \(.*/, '').replace('Inoxidable ', '').replace('ASTM ', '').replace('SAE ', '').replace('API 5L ', '') + '</button>'; }).join('') + '</div>' +
      EL.filter(function (e) { return e[3]; }).map(row).join('') +
      '<details id="simmas"><summary>Microaleantes, residuales y otros</summary><div class="in">' + EL.filter(function (e) { return !e[3]; }).map(row).join('') + '</div></details>' +
      '<p style="margin-top:12px"><button type="button" class="pill" id="simreset" style="border:0;padding:7px 14px">Poner todo en cero</button></p>' +
      '<h3>Grados comerciales más parecidos</h3><div id="simmatch"></div>' +
      '<h3>Índices calculados</h3><div class="ind" id="simind"></div>' +
      '<div id="simalert"></div>' +
      '<p class="nota">Estimaciones con fórmulas empíricas (IIW, Ito-Bessyo, Andrews, ASTM A255). Las propiedades reales dependen del proceso: laminación, enfriamiento y tratamiento térmico. Para especificar un material rige la norma y el certificado de calidad.</p>';
    return { title: 'Simulador de aceros', html: h, after: init };
  };

  function init(root) {
    var rows = root.querySelectorAll('.sl');
    function paint() {
      for (var i = 0; i < rows.length; i++) {
        var k = rows[i].dataset.el, e = EL.filter(function (x) { return x[0] === k; })[0];
        rows[i].querySelector('input').value = Math.round(v2u(comp[k], e[1]) * 1000);
        rows[i].querySelector('output').textContent = fmt(comp[k], e[2]);
      }
      var cl = S.clasificar(comp), tot = sum(comp);
      var tone = cl.k === 'no' ? 'bad' : '';
      root.querySelector('#simres').innerHTML = '<div class="fam ' + tone + '">' + cl.fam + '</div><div class="why">' + cl.why + '</div>' +
        '<div class="why" style="margin-top:5px;color:var(--tx)">Hierro: <b>' + Math.max(0, 100 - tot).toFixed(2) + ' %</b>&ensp;Aleantes: <b>' + tot.toFixed(2) + ' %</b></div>';
      var m = S.parecidos(comp), mh = '';
      m.forEach(function (x, i) {
        mh += '<div class="match"><div><b>' + x.g.n + '</b><div class="small">' + x.g.fam + '. ' + x.g.std + '</div></div><div class="pc">' + x.sim + ' %</div></div>';
        if (i === 0) {
          mh += x.sim >= 45
            ? '<div class="nota" style="margin-top:8px"><b style="color:var(--tx)">Propiedades típicas de ' + x.g.n + '</b><br>' + x.g.p + '<br><b style="color:var(--tx)">Usos comunes</b><br>' + x.g.u + '</div>'
            : '<div class="nota" style="margin-top:8px">Ningún grado de la base se parece lo suficiente para estimar propiedades. Acerca la composición a uno de la lista.</div>';
        }
      });
      root.querySelector('#simmatch').innerHTML = mh;
      var ind = S.indices(comp, cl);
      root.querySelector('#simind').innerHTML = ind.length ? ind.map(function (r) { return '<div><b>' + r[0] + '</b><strong class="' + r[3] + '">' + r[1] + '</strong><em>' + r[2] + '</em></div>'; }).join('') : '<div style="grid-column:1/-1"><em>Los índices de soldabilidad y temple aplican a aceros al carbono y de baja aleación.</em></div>';
      var al = S.alertas(comp, cl);
      root.querySelector('#simalert').innerHTML = al.length ? '<h3>Puntos de atención</h3>' + al.map(function (t) { return '<div class="alert">' + t + '</div>'; }).join('') : '';
    }
    root.addEventListener('input', function (ev) {
      var r = ev.target.closest('.sl'); if (!r) return;
      var k = r.dataset.el, e = EL.filter(function (x) { return x[0] === k; })[0];
      comp[k] = u2v(ev.target.value / 1000, e[1], e[2]);
      paint();
    });
    root.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.d) {
        var r = b.closest('.sl'), k = r.dataset.el, e = EL.filter(function (x) { return x[0] === k; })[0];
        comp[k] = Math.min(e[1], Math.max(0, Math.round((comp[k] + (+b.dataset.d) * e[2]) / e[2]) * e[2]));
        paint();
      } else if (b.dataset.p) {
        comp = full(S.grados.filter(function (g) { return g.id === b.dataset.p; })[0].c);
        var has = EL.some(function (e) { return !e[3] && comp[e[0]] > 0; });
        if (has) root.querySelector('#simmas').open = true;
        paint();
      } else if (b.id === 'simreset') {
        comp = full({}); paint();
      }
    });
    paint();
  }
})();

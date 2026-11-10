/* Vistas: cada función recibe los segmentos de ruta restantes y devuelve { title, html, after } */
(function () {
  var V = S.views, esc = S.esc;
  function find(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function row(href, tt, ss, rt) {
    return '<li><a href="' + href + '"><span class="gr"><span class="tt">' + tt + '</span>' + (ss ? '<span class="ss">' + ss + '</span>' : '') + '</span>' + (rt ? '<span class="rt">' + rt + '</span>' : '') + '<i class="chev"></i></a></li>';
  }
  function sec(t, items) { return items && items.length ? '<h3>' + t + '</h3>' + S.ul(items) : ''; }

  /* ================= Inicio ================= */
  V.inicio = function (p) {
    if (p[0] === 'glosario') return glosario();
    if (p[0] === 'acerca') return acerca();
    var h = '<div class="hero"><h2>Del mineral al acero terminado</h2>' +
      '<p class="lead" style="margin:0">Manual de bolsillo de la industria siderúrgica: procesos animados, química, normas y empresas.</p>' +
      '<div class="escala" aria-hidden="true"></div><div class="escala-n"><span>Ambiente</span><span>700 °C</span><span>1 000</span><span>1 250</span><span>1 550 °C</span></div>' +
      '<input class="search" id="q" type="search" placeholder="Buscar proceso, norma, grado o empresa" autocomplete="off" aria-label="Buscar"></div>' +
      '<div id="res"></div><div id="home">' +
      '<ul class="rows" style="margin-top:14px">' +
      row('#/procesos', 'Procesos', S.procesos.length + ' procesos animados, de la mina al perfil') +
      row('#/quimica/simulador', 'Simulador de aceros', 'Combina elementos y descubre qué acero estás haciendo') +
      row('#/quimica', 'Química del acero', 'Elementos, diagrama hierro-carbono, tratamientos y familias') +
      row('#/normas', 'Normas y usos', S.normas.length + ' normas explicadas: ASTM, API, EN, JIS, NMX') +
      row('#/industria', 'Industria', 'Quién produce el acero: historia, líderes y accionistas') +
      row('#/inicio/glosario', 'Glosario', 'Los términos de la planta y del mercado') +
      row('#/inicio/acerca', 'Acerca de esta app', 'Fuentes, alcance y uso sin conexión') +
      '</ul>' + S.installBox() + '</div>';
    return { title: 'Siderúrgica', html: h, after: function (root) {
      var q = root.querySelector('#q'), res = root.querySelector('#res'), home = root.querySelector('#home');
      q.addEventListener('input', function () {
        var t = S.norm(q.value.trim());
        if (t.length < 2) { res.innerHTML = ''; home.hidden = false; return; }
        home.hidden = true;
        var r = S.buscar(t);
        res.innerHTML = r.length ? '<ul class="rows" style="margin-top:14px">' + r.map(function (x) { return row(x[0], x[1], x[2], x[3]); }).join('') + '</ul>' : '<p class="lead" style="margin-top:16px">Sin resultados para «' + esc(q.value) + '». Prueba con otra palabra: un proceso, un grado (4140), una norma (A36) o una empresa.</p>';
      });
    } };
  };

  S.buscar = function (t) {
    var out = [];
    function hit(s) { return S.norm(s).indexOf(t) >= 0; }
    S.procesos.forEach(function (p) { if (hit(p.t + ' ' + p.r + ' ' + p.sal)) out.push(['#/procesos/' + p.id, p.t, p.r, 'Proceso']); });
    S.normas.forEach(function (n) { if (hit(n.org + ' ' + n.cod + ' ' + n.t + ' ' + n.usos + ' ' + (n.eq || '') + ' ' + n.gr.map(function (g) { return g[0]; }).join(' '))) out.push(['#/normas/' + n.id, n.org + ' ' + n.cod, n.t, 'Norma']); });
    S.grados.forEach(function (g) { if (hit(g.n + ' ' + g.std + ' ' + g.fam + ' ' + g.u)) out.push(['#/quimica/grados/' + g.id, g.n, g.fam, 'Grado']); });
    S.elementos.forEach(function (e) { if (hit(e.n + ' ' + e.res) || S.norm(e.s) === t) out.push(['#/quimica/elementos/' + e.s, e.n + ' (' + e.s + ')', e.res, 'Elemento']); });
    S.empresas.forEach(function (e) { var pl = (S.plantas && S.plantas[e.id] || []).map(function (p) { return typeof p === 'string' ? p : p.join(' '); }).join(' '); if (hit(e.n + ' ' + e.res + ' ' + e.pais + ' ' + e.esp.join(' ') + ' ' + pl)) out.push(['#/industria/' + e.id, e.n, e.res, 'Empresa']); });
    S.glosario.forEach(function (g) { if (hit(g[0] + ' ' + g[1])) out.push(['#/inicio/glosario', g[0], g[1], 'Glosario']); });
    return out.slice(0, 40);
  };

  function glosario() {
    var g = S.glosario.slice().sort(function (a, b) { return a[0].localeCompare(b[0], 'es'); });
    return { title: 'Glosario', html: '<table class="kv">' + g.map(function (x) { return '<tr><th style="color:var(--tx);font-weight:650">' + x[0] + '</th><td style="font-weight:400">' + x[1] + '</td></tr>'; }).join('') + '</table>' };
  }
  function acerca() {
    return { title: 'Acerca de esta app', html: '<h2>Siderúrgica</h2><p class="lead">Manual de referencia de la industria del acero. Versión 1.2.</p>' +
      '<h3>Alcance</h3>' + S.ul(['Los valores de proceso son rangos típicos de la industria; cada planta tiene los suyos.', 'Los valores de normas son mínimos representativos. Para comprar, diseñar o certificar rige la edición vigente del documento oficial.', 'El simulador usa correlaciones empíricas publicadas. Orienta, no sustituye un ensayo.', 'Los datos de empresas corresponden a ' + S.ind.corte + '. Directivos y accionistas cambian.']) +
      '<h3>Fuentes de la sección Industria</h3>' + S.ul(S.ind.fuentes) +
      '<h3>Uso sin conexión</h3><p>Una vez instalada, la app guarda todo su contenido en el teléfono y funciona sin internet.</p>' + S.installBox() };
  }

  /* ================= Procesos ================= */
  V.procesos = function (p) {
    if (p[0]) { var pr = find(S.procesos, p[0]); if (pr) return proceso(pr); }
    var h = '<p class="lead">La ruta completa. El color de la línea sigue la temperatura del acero en cada etapa.</p><ol class="ruta">';
    S.etapas.forEach(function (e) {
      var ps = S.procesos.filter(function (x) { return x.et === e.id; });
      h += '<li class="et" style="--c:' + S.tempColor(ps[0].temp) + '">' + e.t + '</li>';
      ps.forEach(function (x) {
        var c = S.tempColor(x.temp);
        h += '<li style="--c:' + c + '"><i class="nodo"></i><a href="#/procesos/' + x.id + '"><span class="tt">' + x.t + '<span class="temp">' + x.tt + '</span></span><span class="ss">' + x.r + '</span></a></li>';
      });
    });
    return { title: 'Procesos', html: h + '</ol>' };
  };

  function proceso(p) {
    var i = S.procesos.indexOf(p), prev = S.procesos[i - 1], next = S.procesos[i + 1];
    var et = find(S.etapas, p.et);
    var h = '<div class="stage">' + (S.anim[p.id] ? S.anim[p.id]() : '') + '<button type="button" class="ctl">Pausar</button></div>' +
      '<p class="small" style="margin:10px 0 2px">' + et.t + '</p><h2>' + p.t + '</h2><p class="lead">' + p.r + '</p>' +
      '<div class="io"><div><b>Entra</b><span>' + p.ent + '</span></div><div><b>Sale</b><span>' + p.sal + '</span></div></div>' +
      '<h3>Cómo funciona</h3><ol class="ley">' + p.ley.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' +
      (p.par ? '<h3>Parámetros típicos</h3>' + S.kv(p.par) : '') +
      (p.rx ? '<h3>Reacciones</h3>' + p.rx.map(function (x) { return '<div class="rx">' + x + '</div>'; }).join('') : '') +
      sec('Puntos clave', p.cl) +
      '<ul class="rows" style="margin-top:22px">' +
      (prev ? row('#/procesos/' + prev.id, prev.t, 'Proceso anterior') : '') + (next ? row('#/procesos/' + next.id, next.t, 'Proceso siguiente') : '') + '</ul>';
    return { title: p.t, html: h, after: S.mountAnim };
  }

  /* ================= Química ================= */
  V.quimica = function (p) {
    var k = p[0];
    if (k === 'simulador') return S.simView();
    if (k === 'diagrama') return S.fecView();
    if (k === 'elementos') return p[1] && elem(p[1]) || elementos();
    if (k === 'grados') return p[1] && grado(p[1]) || grados();
    if (k === 'microestructuras') return lista('Microestructuras', 'Las fases que forman el acero y lo que aporta cada una.', S.micro);
    if (k === 'tratamientos') return lista('Tratamientos térmicos', 'Calentar y enfriar de forma controlada cambia la microestructura sin cambiar la química.', S.tratamientos);
    if (k === 'propiedades') return { title: 'Propiedades', html: '<p class="lead">Qué mide cada propiedad y por qué importa.</p>' + S.propiedades.map(function (x) { return '<h4>' + x[0] + '</h4><p>' + x[1] + '</p>'; }).join('') + '<h3>Cómo se endurece un acero</h3>' + S.ul(['<b>Solución sólida:</b> átomos de C, Mn, Si o P distorsionan la red.', '<b>Afino de grano:</b> el único mecanismo que sube resistencia y tenacidad a la vez.', '<b>Precipitación:</b> carbonitruros finos de Nb, V y Ti frenan las dislocaciones.', '<b>Deformación en frío:</b> más dislocaciones; se pierde ductilidad.', '<b>Transformación:</b> perlita, bainita o martensita según la velocidad de enfriamiento.']) };
    if (k === 'familias') return { title: 'Familias de aceros', html: '<p class="lead">Se conocen más de 3 500 grados. Casi todos caben en estas familias.</p>' + S.familias.map(function (f) { return '<h3>' + f.t + '</h3><p>' + f.d + '</p>' + S.ul(f.it); }).join('') };
    var h = '<p class="lead">El acero es hierro con hasta 2.1 % de carbono. Décimas de punto de otros elementos, y el camino térmico, deciden si será una lata o un riel.</p><ul class="rows">' +
      row('#/quimica/simulador', 'Simulador de aceros', 'Ajusta la composición: familia, grado parecido, soldabilidad y temple') +
      row('#/quimica/diagrama', 'Diagrama hierro-carbono', 'Interactivo: fases según carbono y temperatura') +
      row('#/quimica/elementos', 'Elementos', 'Qué hace cada uno de los ' + S.elementos.length + ' elementos en el acero') +
      row('#/quimica/microestructuras', 'Microestructuras', 'Ferrita, perlita, bainita, martensita, austenita') +
      row('#/quimica/tratamientos', 'Tratamientos térmicos', 'Recocido, normalizado, temple, revenido, cementación') +
      row('#/quimica/propiedades', 'Propiedades', 'Límite elástico, tenacidad, valores n y r, templabilidad') +
      row('#/quimica/familias', 'Familias de aceros', 'Carbono, HSLA, AHSS, aleados, inoxidables, herramienta') +
      row('#/quimica/grados', 'Grados comunes', S.grados.length + ' grados con composición, propiedades y usos') + '</ul>';
    return { title: 'Química del acero', html: h };
  };
  function lista(t, lead, arr) {
    return { title: t, html: '<p class="lead">' + lead + '</p>' + arr.map(function (x) { return '<h3>' + x.t + '</h3><p>' + x.d + '</p><p class="small">' + x.p + '</p>'; }).join('') };
  }
  function elementos() {
    var h = '<p class="lead">Toca un elemento para ver su efecto.</p>';
    Object.keys(S.grupos).forEach(function (g) {
      var es = S.elementos.filter(function (e) { return e.g === g; });
      if (!es.length) return;
      h += '<h3 style="color:' + S.grupos[g][1] + '">' + S.grupos[g][0] + '</h3><div class="elgrid">' + es.map(function (e) { return '<a href="#/quimica/elementos/' + e.s + '" style="--c:' + S.grupos[g][1] + '"><b>' + e.s + '</b><span>' + e.n + '</span></a>'; }).join('') + '</div>';
    });
    return { title: 'Elementos', html: h };
  }
  function elem(s) {
    var e = null; S.elementos.forEach(function (x) { if (x.s === s) e = x; });
    if (!e) return null;
    var con = S.grados.filter(function (g) { return (g.c[e.s] || 0) > 0 && ['P', 'S', 'Al', 'Si', 'Mn', 'C'].indexOf(e.s) < 0; }).sort(function (a, b) { return b.c[e.s] - a.c[e.s]; }).slice(0, 6);
    var h = '<h2><span style="color:' + S.grupos[e.g][1] + '">' + e.s + '</span> ' + e.n + '</h2><p class="lead">' + e.res + '</p>' + S.kv([['Papel', S.grupos[e.g][0]], ['Contenido típico', e.rango]]) +
      '<h3>Efectos</h3>' + S.ul(e.ef) + (e.nota ? '<p class="nota">' + e.nota + '</p>' : '') +
      (con.length ? '<h3>Grados donde destaca</h3><ul class="rows">' + con.map(function (g) { return row('#/quimica/grados/' + g.id, g.n, g.fam, g.c[e.s] + ' %'); }).join('') + '</ul>' : '');
    return { title: e.n, html: h };
  }
  function grados() {
    var fams = [], h = '<p class="lead">Composición nominal, propiedades típicas y usos.</p>';
    S.grados.forEach(function (g) { var k = g.fam.split(' ')[0]; if (fams.indexOf(k) < 0) fams.push(k); });
    h += '<ul class="rows">' + S.grados.map(function (g) { return row('#/quimica/grados/' + g.id, g.n, g.fam); }).join('') + '</ul>';
    return { title: 'Grados comunes', html: h };
  }
  function grado(id) {
    var g = find(S.grados, id); if (!g) return null;
    var cl = S.clasificar(g.c), ks = Object.keys(g.c);
    var h = '<h2>' + g.n + '</h2><p class="lead">' + g.fam + '. ' + g.std + '</p>' +
      '<h3>Composición nominal</h3><div class="scroll"><table class="tb"><tr>' + ks.map(function (k) { return '<th class="n">' + k + '</th>'; }).join('') + '</tr><tr>' + ks.map(function (k) { return '<td class="n">' + g.c[k] + '</td>'; }).join('') + '</tr></table></div><p class="small">% en peso; el resto es hierro.</p>' +
      '<h3>Propiedades típicas</h3><p>' + g.p + '</p><h3>Usos comunes</h3><p>' + g.u + '</p>' +
      '<h3>Por qué se comporta así</h3><p>' + cl.why + '</p>' +
      '<ul class="rows" style="margin-top:18px">' + row('#/quimica/simulador', 'Abrir el simulador', 'Carga este grado desde la fila de accesos rápidos') + '</ul>';
    return { title: g.n, html: h };
  }

  /* ================= Normas ================= */
  V.normas = function (p) {
    if (p[0] === 'sistemas') return sistemas(p[1]);
    if (p[0] === 'organismos') return { title: 'Organismos', html: '<p class="lead">Quién emite las normas del acero.</p>' + S.orgs.map(function (o) { return '<h3>' + o.n + '</h3><p>' + o.d + '</p>'; }).join('') };
    if (p[0]) { var n = find(S.normas, p[0]); if (n) return norma(n); }
    var gi = 0; S.sistemas.forEach(function (s, k) { if (s.id === 'galv') gi = k; });
    var h = '<p class="lead">Una norma fija qué debe cumplir el producto: química, propiedades, tolerancias y pruebas.</p>' +
      '<ul class="rows">' + row('#/normas/sistemas/' + gi, 'Grados de galvanizado', 'Calidades, estructurales, pesos de capa G y Z, equivalencias, qué pedir') + row('#/normas/sistemas', 'Cómo leer una designación', 'SAE, ASTM, EN, JIS, calibres, recubrimientos, varilla') + row('#/normas/organismos', 'Organismos', 'ASTM, SAE, API, EN, JIS, NMX y otros') + '</ul>' +
      '<div class="presets" id="nf" style="margin-top:16px"><button type="button" data-o="" class="on">Todas</button>' + ['ASTM', 'NMX', 'API', 'EN', 'JIS', 'SAE'].map(function (o) { return '<button type="button" data-o="' + o + '">' + o + '</button>'; }).join('') + '</div><div id="nl"></div>';
    return { title: 'Normas y usos', html: h, after: function (root) {
      function paint(o) {
        var out = '';
        S.normaCats.forEach(function (c) {
          var ns = S.normas.filter(function (n) { return n.cat === c && (!o || n.org === o); });
          if (ns.length) out += '<h3>' + c + '</h3><ul class="rows">' + ns.map(function (n) { return row('#/normas/' + n.id, n.org + ' ' + n.cod, n.t); }).join('') + '</ul>';
        });
        root.querySelector('#nl').innerHTML = out || '<p class="lead">Sin normas de ese organismo.</p>';
        var bs = root.querySelectorAll('#nf button');
        for (var i = 0; i < bs.length; i++) bs[i].style.borderColor = bs[i].dataset.o === o ? 'var(--t1200)' : '';
      }
      root.querySelector('#nf').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { S._nf = b.dataset.o; paint(S._nf); } });
      paint(S._nf || '');
    } };
  };
  function norma(n) {
    var org = find(S.orgs, n.org);
    var h = '<p class="small" style="margin-bottom:2px">' + n.cat + '</p><h2>' + n.org + ' ' + n.cod + '</h2><p class="lead">' + n.t + '</p>' +
      '<h3>Alcance</h3><p>' + n.alc + '</p>';
    if (n.gr.length) {
      h += '<h3>Grados y resistencia mínima</h3><div class="scroll"><table class="tb"><tr><th>Grado</th><th class="n">Fy, MPa</th><th class="n">Rm, MPa</th><th>Nota</th></tr>' +
        n.gr.map(function (g) { return '<tr><td><b>' + g[0] + '</b></td><td class="n">' + g[1] + '</td><td class="n">' + g[2] + '</td><td>' + g[3] + '</td></tr>'; }).join('') + '</table></div>' +
        '<p class="small">Fy: límite elástico. Rm: resistencia a la tensión. Valores mínimos o rangos; dependen del espesor y de la edición.</p>';
    }
    h += sec('Qué hay que saber', n.cl) + (n.x || '') + '<h3>Usos</h3><p>' + n.usos + '</p>' + (n.eq ? '<h3>Equivalentes y afines</h3><p>' + n.eq + '</p><p class="small">Las equivalencias son aproximadas: nunca sustituyas sin comparar química, propiedades y pruebas.</p>' : '') +
      (org ? '<p class="nota"><b style="color:var(--tx)">' + org.n + '.</b> ' + org.d + '</p>' : '');
    return { title: n.org + ' ' + n.cod, html: h };
  }
  function sistemas(i) {
    if (i != null && S.sistemas[+i]) return { title: S.sistemas[+i].t, html: '<h2>' + S.sistemas[+i].t + '</h2>' + S.sistemas[+i].h };
    return { title: 'Designaciones', html: '<p class="lead">Cada sistema codifica algo distinto: química, resistencia o uso.</p><ul class="rows">' + S.sistemas.map(function (s, k) { return row('#/normas/sistemas/' + k, s.t, ''); }).join('') + '</ul>' };
  }

  /* ================= Industria ================= */
  V.industria = function (p) {
    if (p[0] === 'ranking') return ranking();
    if (p[0] === 'panorama') return panorama();
    if (p[0]) { var e = find(S.empresas, p[0]); if (e) return empresa(e); }
    function grupo(t, reg) {
      return '<h3>' + t + '</h3><ul class="rows">' + S.empresas.filter(function (e) { return e.reg === reg; }).map(function (e) { return row('#/industria/' + e.id, e.n, e.res, e.prod && /^\d/.test(e.prod) ? e.prod.split(' (')[0] : ''); }).join('') + '</ul>';
    }
    var h = '<p class="lead">En 2025 el mundo produjo 1 849 millones de toneladas de acero crudo. Más de la mitad, en China.</p><ul class="rows">' +
      row('#/industria/panorama', 'Panorama y mercado', 'Cifras mundiales, México, aranceles y descarbonización') +
      row('#/industria/ranking', 'Ranking mundial 2025', 'Los mayores productores según worldsteel') + '</ul>' +
      grupo('México y Grupo Techint', 'mx') + grupo('Jugadores globales', 'gl') + grupo('Cadena de suministro', 'ca') +
      '<p class="nota">Datos corporativos a ' + S.ind.corte + '. Producción de acero crudo 2025 según la World Steel Association.</p>';
    return { title: 'Industria', html: h };
  };
  function panorama() {
    var h = '<h3 style="margin-top:6px">El mundo en 2025</h3>' + S.kv(S.ind.mundo) + '<h3>México</h3>' + S.kv(S.ind.mexico) +
      '<h3>Temas que mueven al sector</h3>' + S.ind.temas.map(function (t) { return '<h4>' + t[0] + '</h4><p>' + t[1] + '</p>'; }).join('') +
      '<h3>Cómo se gana dinero en acero</h3>' + S.ul(['El margen es la diferencia entre el precio del acero y el costo de la carga metálica (mineral y coque, o chatarra) más energía.', 'Es un negocio de costo fijo alto: la utilización de capacidad manda sobre la rentabilidad.', 'Integrarse hacia atrás (minas, chatarra, energía) estabiliza costos; hacia adelante (recubiertos, tubos, centros de servicio) captura valor agregado.', 'Las mini-acerías ajustan producción con rapidez; las integradas sufren más en los ciclos bajos.']) +
      '<h3>Fuentes</h3>' + S.ul(S.ind.fuentes);
    return { title: 'Panorama y mercado', html: h };
  }
  function ranking() {
    var max = S.ranking[0][3];
    var h = '<p class="lead">Producción de acero crudo en 2025, en millones de toneladas. Lista parcial después del lugar 20.</p><table class="tb"><tr><th class="n">#</th><th>Empresa</th><th class="n">Mt</th></tr>' +
      S.ranking.map(function (r) {
        var name = r[4] ? '<a href="#/industria/' + r[4] + '" style="color:var(--t1200);font-weight:650">' + r[1] + '</a>' : '<b>' + r[1] + '</b>';
        return '<tr><td class="n">' + r[0] + '</td><td>' + name + '<div class="small">' + r[2] + '</div><div style="height:4px;border-radius:2px;margin-top:4px;background:var(--acc);width:' + Math.max(3, Math.round(100 * r[3] / max)) + '%"></div></td><td class="n">' + r[3].toFixed(2) + '</td></tr>';
      }).join('') + '</table><p class="small">Fuente: World Steel Association, World Steel in Figures 2026. Nippon Steel consolida a U.S. Steel desde junio de 2025.</p>';
    return { title: 'Ranking mundial 2025', html: h };
  }
  function plantas(id) {
    var ps = S.plantas && S.plantas[id]; if (!ps) return '';
    var n = ps.filter(function (p) { return typeof p !== 'string'; }).length;
    return '<h3>Plantas y qué hace cada una</h3>' + ps.map(function (p) {
      if (typeof p === 'string') return '<h4 class="plg">' + p + '</h4>';
      return '<div class="pl"><b>' + p[0] + '</b><span class="u">' + p[1] + '</span><p>' + p[2] + '</p></div>';
    }).join('') + '<p class="small" style="margin-top:8px">' + n + ' sitios principales; la lista no es exhaustiva.</p>';
  }
  function empresa(e) {
    var kv = [];
    if (e.pais) kv.push(['Países', e.pais]);
    if (e.sede) kv.push(['Sede', e.sede]);
    if (e.fund) kv.push(['Fundación', e.fund]);
    if (e.prod) kv.push(['Acero crudo 2025', e.prod]);
    if (e.ruta) kv.push(['Ruta de producción', e.ruta]);
    var h = '<h2>' + e.n + '</h2><p class="lead">' + e.res + '</p>' + (kv.length ? S.kv(kv) : '') +
      plantas(e.id) + sec('Historia', e.hist) + sec('Líderes', e.lid) + sec('Accionistas', e.acc) + sec(e.reg === 'ca' || e.id === 'otros-mx' ? 'Quiénes son' : 'Especialización', e.esp) + sec('Hoy', e.hoy) +
      '<p class="small" style="margin-top:16px">Datos a ' + S.ind.corte + '.</p>';
    return { title: e.n, html: h };
  }
})();

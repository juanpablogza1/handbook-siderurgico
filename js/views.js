/* Vistas: cada función recibe los segmentos de ruta restantes y devuelve { title, html, after } */
(function () {
  var V = S.views, esc = S.esc;
  function find(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function row(href, tt, ss, rt, pre) {
    return '<li><a href="' + href + '">' + (pre || '') + '<span class="gr"><span class="tt">' + tt + '</span>' + (ss ? '<span class="ss">' + ss + '</span>' : '') + '</span>' + (rt ? '<span class="rt">' + rt + '</span>' : '') + '<i class="chev"></i></a></li>';
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
    S.empresas.forEach(function (e) { var pl = (S.plantas && S.plantas[e.id] || []).map(function (p) { return typeof p === 'string' ? p : p.join(' '); }).join(' '); var cs = S.clientes && S.clientes[e.id] ? S.clientes[e.id].seg.map(function (g) { return g[0] + ' ' + g[2].join(' '); }).join(' ') : ''; pl += ' ' + cs; if (hit(e.n + ' ' + e.res + ' ' + e.pais + ' ' + e.esp.join(' ') + ' ' + pl)) out.push(['#/industria/' + e.id, e.n, e.res, 'Empresa']); });
    Object.keys(S.fab || {}).forEach(function (id) { var f = S.fab[id]; if (hit(f.join(' '))) out.push(['#/procesos/fabricantes/' + id, f[0], f[1], 'Fabricante']); });
    S.glosario.forEach(function (g) { if (hit(g[0] + ' ' + g[1])) out.push(['#/inicio/glosario', g[0], g[1], 'Glosario']); });
    return out.slice(0, 40);
  };

  function glosario() {
    var g = S.glosario.slice().sort(function (a, b) { return a[0].localeCompare(b[0], 'es'); });
    return { title: 'Glosario', html: '<table class="kv">' + g.map(function (x) { return '<tr><th style="color:var(--tx);font-weight:650">' + x[0] + '</th><td style="font-weight:400">' + x[1] + '</td></tr>'; }).join('') + '</table>' };
  }
  function acerca() {
    return { title: 'Acerca de esta app', html: '<h2>Siderúrgica</h2><p class="lead">Manual de referencia de la industria del acero. Versión 1.5.</p>' +
      '<h3>Alcance</h3>' + S.ul(['Los valores de proceso son rangos típicos de la industria; cada planta tiene los suyos.', 'Los valores de normas son mínimos representativos. Para comprar, diseñar o certificar rige la edición vigente del documento oficial.', 'El simulador usa correlaciones empíricas publicadas. Orienta, no sustituye un ensayo.', 'Los datos de empresas corresponden a ' + S.ind.corte + '. Directivos y accionistas cambian.', 'Los fabricantes de equipo son los más comunes de cada proceso, no todos. Sus talleres y dueños también cambian.']) +
      '<h3>Fuentes de la sección Industria</h3>' + S.ul(S.ind.fuentes) +
      '<h3>Uso sin conexión</h3><p>Una vez instalada, la app guarda todo su contenido en el teléfono y funciona sin internet.</p>' + S.installBox() };
  }

  /* ================= Procesos ================= */
  V.procesos = function (p) {
    if (p[0] === 'fabricantes') return p[1] && S.fab[p[1]] ? fabricante(p[1]) : fabricantes();
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
    return { title: 'Procesos', html: h + '</ol><ul class="rows" style="margin-top:18px">' + row('#/procesos/fabricantes', 'Fabricantes de equipo', 'Quién construye cada equipo y dónde lo fabrica', Object.keys(S.fab).length) + '</ul>' };
  };

  function fabDonde(f) { return f[2] === '=' ? 'En su sede' : f[2]; }
  function equipos(pid) {
    var es = S.equipos && S.equipos[pid]; if (!es) return '';
    return '<h3>Quién fabrica el equipo</h3><p class="small" style="margin:-4px 0 10px">Los fabricantes más comunes. Toca un equipo para ver dónde lo hacen.</p>' +
      es.map(function (e) {
        var fs = e[1].filter(function (id) { return S.fab[id]; });
        return '<details class="sub eq"><summary><span class="st"><b>' + e[0] + '</b><small>' + fs.map(function (id) { return S.fab[id][0].split(' (')[0].split(':')[0]; }).join(' · ') + '</small></span></summary><div class="in">' +
          (e[2] ? '<p class="eqn">' + e[2] + '</p>' : '') +
          fs.map(function (id) {
            var f = S.fab[id], d = fabDonde(f);
            return '<a class="pl" href="#/procesos/fabricantes/' + id + '"><b>' + f[0] + '</b><span class="u">Sede: ' + f[1] + '</span>' + (d ? '<p><i>Fabrica en:</i> ' + d + '</p>' : '') + '</a>';
          }).join('') + '</div></details>';
      }).join('') +
      '<ul class="rows" style="margin-top:4px">' + row('#/procesos/fabricantes', 'Todos los fabricantes', 'Directorio por número de equipos que suministran') + '</ul>';
  }
  function fabricantes() {
    var ids = Object.keys(S.fab).sort(function (a, b) { return (S.fabUso[b] || []).length - (S.fabUso[a] || []).length || S.fab[a][0].localeCompare(S.fab[b][0], 'es'); });
    var INT = ['sms', 'primetals', 'danieli', 'tenova', 'fives', 'andritz', 'jc', 'nse', 'plantech', 'mcc'], big = ids.filter(function (id) { return INT.indexOf(id) >= 0; }), rest = ids.filter(function (id) { return big.indexOf(id) < 0; });
    function lst(a) { return '<ul class="rows">' + a.map(function (id) { var n = (S.fabUso[id] || []).length; return row('#/procesos/fabricantes/' + id, S.fab[id][0], S.fab[id][1], n + (n === 1 ? ' equipo' : ' equipos')); }).join('') + '</ul>'; }
    return { title: 'Fabricantes de equipo', html: '<p class="lead">Quién construye el equipo de una siderúrgica y dónde lo fabrica. Ordenados por el número de equipos de esta app en los que aparecen.</p>' +
      '<h3>Proveedores de planta completa</h3>' + lst(big) + '<h3>Especialistas</h3>' + lst(rest) +
      '<p class="small" style="margin-top:14px">Lista no exhaustiva. Datos a ' + S.fabCorte + '; los talleres y los dueños cambian.</p>' };
  }
  function fabricante(id) {
    var f = S.fab[id], uso = S.fabUso[id] || [], d = fabDonde(f), by = {}, ord = [];
    uso.forEach(function (u) { if (!by[u[0]]) { by[u[0]] = []; ord.push(u[0]); } by[u[0]].push(u[1]); });
    return { title: f[0], html: '<h2>' + f[0] + '</h2><p class="lead" style="margin-bottom:10px">' + f[3] + '</p>' +
      '<div class="tiles one"><div><b>Sede</b><span>' + f[1] + '</span></div>' + (d ? '<div><b>Fabrica en</b><span>' + d + '</span></div>' : '') + '</div>' +
      (ord.length ? '<h3>Qué suministra</h3><ul class="rows">' + ord.map(function (pid) { var pr = find(S.procesos, pid); return row('#/procesos/' + pid, pr.t, by[pid].join(' · ')); }).join('') + '</ul>' : '') +
      '<p class="small" style="margin-top:14px">Datos a ' + S.fabCorte + '.</p>' };
  }
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
      equipos(p.id) +
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
      return '<h3>' + t + '</h3><ul class="rows">' + S.empresas.filter(function (e) { return e.reg === reg; }).map(function (e) { return row('#/industria/' + e.id, e.n, e.res, e.prod && /^\d/.test(e.prod) ? e.prod.split(' (')[0] : '', S.logo(e.id, 'row')); }).join('') + '</ul>';
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
  /* Etiquetas de proceso deducidas de la descripción de cada planta, en orden de flujo.
     Las frases sobre lo que está parado, en obra o en reconversión no generan etiquetas de proceso. */
  var TAGS = [[/(^|[^a-záéíóúñ])minas?(?![a-záéíóúñ])|miner[ií]a/i, 'Minería'], [/pélet|peletizadora/i, 'Pélet'], [/coquer[ií]a/i, 'Coque'], [/reducci[oó]n directa|hierro esponja|\bHBI\b/i, 'Reducción directa'],
    [/integradas?|altos? hornos?/i, 'Integrada'], [/acer[ií]as? el[eé]ctricas?|hornos? el[eé]ctricos?|miniacer[ií]as?/i, 'Horno eléctrico'],
    [/en caliente|rollo caliente/i, 'Laminación en caliente'], [/(?<!acabado )en fr[ií]o|(^|[\s:])fr[ií]o y/i, 'Laminación en frío'], [/acabado en fr[ií]o/i, 'Acabado en frío'], [/galvan/i, 'Galvanizado'], [/pintado|prepintado/i, 'Pintado'], [/hojalata|esta[ñn]ado/i, 'Hojalata'],
    [/acero el[eé]ctrico|silicio|grano orientado/i, 'Acero eléctrico'], [/inoxidable/i, 'Inoxidable'], [/\bplaca\b/i, 'Placa'], [/\btub(o|os|er[ií]a)\b/i, 'Tubería'], [/\bplanos\b/i, 'Planos'],
    [/varilla|alambr[oó]n|\blargos\b|\bbarras?\b|vigas|rieles|perfiles (estructurales|comerciales|pesados|especiales|H\b)/i, 'Largos'], [/\balambres?\b|trefilado|malla|clavo/i, 'Alambre'],
    [/chatarra|reciclaje/i, 'Chatarra'], [/centros? de servicio|corte (longitudinal|a medida)/i, 'Centro de servicio']];
  var NOPROC = /parad[ao]s?\b|cerrad[ao]s?\b|apag|sin alto horno|se sustituye|en construcci[oó]n|conversi[oó]n|transici[oó]n/i;
  function tags(txt) {
    var cl = txt.split(/[.;]\s+(?=[A-ZÁÉÍÓÚ])|;\s*/), live = [], out = [], obra = false, off = false;
    cl.forEach(function (c) {
      if (!NOPROC.test(c)) { live.push(c); return; }
      if (/en construcci[oó]n|conversi[oó]n|transici[oó]n|se sustituye/i.test(c)) obra = true;
      if (/(^|\s)(parad[ao]s?|cerrad[ao]s?) (desde|entre|en)\b/i.test(c) && !/área/i.test(c)) off = true;
    });
    var t = live.join('. ');
    var fb = [[/laminaci[oó]n|laminador/i, 'Laminación'], [/l[aá]mina|rollo/i, 'Planos'], [/recubiert/i, 'Recubiertos'], [/estructuras|edificios/i, 'Estructuras']];
    TAGS.forEach(function (x) { if (out.length < 5 && x[0].test(t)) out.push('<i>' + x[1] + '</i>'); });
    fb.forEach(function (x) { if (!out.length && x[0].test(t)) out.push('<i>' + x[1] + '</i>'); });
    if (obra) out.push('<i class="obra">En obra o reconversión</i>');
    if (off) out.push('<i class="off">Parada</i>');
    return out.length ? '<div class="tags">' + out.join('') + '</div>' : '';
  }
  function planta(p) { return '<div class="pl"><b>' + p[0] + '</b><span class="u">' + p[1] + '</span>' + tags(p[0] + '. ' + p[2]) + '<p>' + p[2] + '</p></div>'; }
  function plantas(id) {
    var ps = S.plantas && S.plantas[id]; if (!ps) return null;
    var groups = [], cur = null, n = 0;
    ps.forEach(function (p) {
      if (typeof p === 'string') { cur = { t: p, it: [] }; groups.push(cur); return; }
      if (!cur) { cur = { t: '', it: [] }; groups.push(cur); }
      cur.it.push(p); n++;
    });
    var h = groups.length === 1 && !groups[0].t
      ? groups[0].it.map(planta).join('')
      : groups.map(function (g, k) { return '<details class="sub"' + (k === 0 ? ' open' : '') + '><summary><span class="st">' + g.t + '</span><span class="ct">' + g.it.length + '</span></summary><div class="in">' + g.it.map(planta).join('') + '</div></details>'; }).join('');
    return { n: n, html: h + '<p class="small" style="margin:10px 0 4px">Sitios principales; la lista no es exhaustiva.</p>' };
  }
  function linea(items) {
    return items.map(function (x) {
      var m = /^([^:]{2,30}):\s+([\s\S]+)$/.exec(x);
      return m ? '<div class="tl"><b>' + m[1] + '</b><span>' + m[2].charAt(0).toUpperCase() + m[2].slice(1) + '</span></div>' : '<div class="tl one"><span>' + x + '</span></div>';
    }).join('');
  }
  function acc(t, count, body, open) {
    return '<details class="acc"' + (open ? ' open' : '') + '><summary><span class="st">' + t + '</span>' + (count ? '<span class="ct">' + count + '</span>' : '') + '</summary><div class="in">' + body + '</div></details>';
  }
  function clientes(id) {
    var c = S.clientes && S.clientes[id]; if (!c) return null;
    var n = 0;
    var h = c.seg.map(function (g) {
      n += g[2].length;
      var names = g[2].length ? '<div class="cls">' + g[2].map(function (x) {
        var lg = S.logo(x, 'cli');
        return '<div class="cl' + (lg ? ' has' : '') + '">' + lg + '<span>' + x + '</span></div>';
      }).join('') + '</div>' : '';
      return '<div class="sg"><div class="sgh"><b>' + g[0] + '</b>' + (g[1] ? '<span>' + g[1] + ' de ventas</span>' : '') + '</div>' + names + '<p>' + g[3] + '</p></div>';
    }).join('');
    return { n: n, html: h + '<p class="small" style="margin:12px 0 4px">' + c.nota + '</p>' };
  }
  function empresa(e) {
    var r = (S.resumen && S.resumen[e.id]) || [], pl = plantas(e.id), cli = clientes(e.id);
    var lab = ['Sede', 'Fundada', 'Acero crudo 2025', 'Ruta', 'Dirige', 'Controla'];
    var tiles = lab.map(function (l, i) { return r[i] ? '<div><b>' + l + '</b><span>' + r[i] + '</span></div>' : ''; }).join('');
    var secs = [];
    if (pl) secs.push(['Plantas y qué hace cada una', pl.n, pl.html]);
    if (cli) secs.push(['Principales clientes', cli.n || '', cli.html]);
    if (e.hist.length) secs.push(['Historia', e.hist.length, linea(e.hist)]);
    if (e.lid.length || e.acc.length) secs.push(['Líderes y accionistas', '', (e.lid.length ? '<h4 class="plg" style="margin-top:2px">Quién dirige</h4>' + S.ul(e.lid) : '') + (e.acc.length ? '<h4 class="plg">Quién es dueño</h4>' + S.ul(e.acc) : '')]);
    if (e.esp.length) secs.push([e.reg === 'ca' || e.id === 'otros-mx' ? 'Quiénes son' : 'Especialización', e.esp.length, S.ul(e.esp)]);
    if (e.hoy.length) secs.push(['Hoy', '', S.ul(e.hoy)]);
    var h = '<div class="eh"><h2>' + e.n + '</h2>' + S.logo(e.id, 'emp') + '</div><p class="lead" style="margin-bottom:10px">' + e.res + '</p>' + (tiles ? '<div class="tiles">' + tiles + '</div>' : '') +
      '<div class="accs">' + secs.map(function (x) { return acc(x[0], x[1], x[2], secs.length === 1); }).join('') + '</div>' +
      '<p class="small" style="margin-top:14px">Toca una sección para abrirla. Datos a ' + S.ind.corte + '.</p>';
    return { title: e.n, html: h, after: function (root) {
      var ds = root.querySelectorAll('details.acc');
      for (var i = 0; i < ds.length; i++) ds[i].addEventListener('toggle', function () {
        if (!this.open) return;
        for (var k = 0; k < ds.length; k++) if (ds[k] !== this) ds[k].open = false;
        var el = this; setTimeout(function () { try { el.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (x) {} }, 60);
      });
    } };
  }
})();

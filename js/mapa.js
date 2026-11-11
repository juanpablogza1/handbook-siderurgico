/* Mapa mundial de acerías. Dibuja en canvas: países, carreteras, vías de ferrocarril y plantas.
   El arrastre y el pellizco actúan solo dentro del mapa; el resto de la app sigue sin zoom. */
(function () {
  var R = 36000 / (2 * Math.PI), Y0 = R * Math.log(Math.tan(Math.PI / 4 + 85 * Math.PI / 360));
  function px(lon) { return (lon + 180) * 100; }
  function py(lat) { return Y0 - R * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)); }

  var COL = { mar: '#141b22', tierra: '#27333d', borde: '#3d4b56', camino: '#77838d', via: '#35d0ff', planta: '#ff3b30', tenue: '#7d4a48', mina: '#ffc53d', minaTenue: '#6f6138' };
  var KM = 'sid.mapaMinas';
  function leerMinas() { try { return localStorage.getItem(KM) !== '0'; } catch (e) { return true; } }
  function guardarMinas(v) { try { localStorage.setItem(KM, v ? '1' : '0'); } catch (e) {} }
  var REG = [['Mundo', -125, 155, -42, 68], ['México', -118, -86, 14, 33], ['Norteamérica', -128, -62, 14, 55], ['Sudamérica', -82, -34, -40, 12],
    ['Europa', -11, 45, 35, 68], ['Oriente Medio y África', -18, 62, -36, 40], ['India', 67, 90, 7, 31], ['China', 97, 126, 19, 45],
    ['Japón y Corea', 124, 146, 30, 45], ['Asia-Pacífico', 95, 178, -42, 25]];
  var FILES = [['mapa-paises.js', 'mapaPaises'], ['mapa-vias.js', 'mapaVias'], ['mapa-caminos.js', 'mapaCaminos'], ['mapa-caminos2.js', 'mapaCaminos2']];
  var paths = null;

  function ver() { var s = document.querySelector('script[src*="js/mapa.js"]'), m = s && /\?v=([\w.]+)/.exec(s.getAttribute('src')); return m ? '?v=' + m[1] : ''; }
  function cargar(cb, fail) {
    var left = 0;
    FILES.forEach(function (f) {
      if (S[f[1]]) return;
      left++;
      var el = document.createElement('script'); el.src = 'js/' + f[0] + ver();
      el.onload = function () { if (--left === 0) cb(); };
      el.onerror = function () { fail(); };
      document.head.appendChild(el);
    });
    if (!left) cb();
  }
  function capTxt(a) { return a[6] ? '≈ ' + a[6] + ' Mt/año' : ''; }

  S.vistaMapa = function (emp) {
    var e = null; if (emp) S.empresas.forEach(function (x) { if (x.id === emp) e = x; });
    var n = S.acerias.length;
    var h = '<p class="lead" style="margin-bottom:10px">' + (e ? 'Acerías de ' + e.n + ' en rojo vivo; las demás, atenuadas.' : n + ' acerías y ' + (S.minas || []).length + ' minas de hierro. Arrastra para mover y pellizca para acercar.') + '</p>' +
      '<div class="presets" id="mreg">' + REG.map(function (r, i) { return '<button type="button" data-i="' + i + '">' + r[0] + '</button>'; }).join('') + '</div>' +
      '<div class="mapa"><canvas id="mcv" aria-label="Mapa mundial de acerías"></canvas>' +
      '<div class="mz"><button type="button" data-z="1" aria-label="Acercar">+</button><button type="button" data-z="-1" aria-label="Alejar">−</button></div>' +
      '<div class="mley"><span><i class="p"></i>Acería</span><span id="mleym"><i class="m"></i>Mina</span><span><i class="v"></i>Ferrocarril</span><span><i class="c"></i>Carretera</span></div>' +
      '<div class="mst" id="mst">Cargando mapa…</div></div>' +
      '<label class="msw"><span><i class="m"></i>Minas de mineral de hierro</span><input type="checkbox" id="mmin"' + (leerMinas() ? ' checked' : '') + '><b></b></label>' +
      '<div class="presets" id="mrut"><button type="button" data-r="" class="on">Todas</button>' + Object.keys(S.rutas).map(function (k) { return '<button type="button" data-r="' + k + '">' + S.rutas[k][0] + '</button>'; }).join('') + '</div>' +
      '<div id="minfo"></div><div id="mlist"></div>' +
      '<p class="small" style="margin-top:14px">Selección de acerías y minas principales, no un inventario completo: en el mundo operan más de mil acerías. Ubicación aproximada y capacidades nominales, a ' + S.aceriasCorte + '. Países, carreteras y vías: Natural Earth. El mapa muestra carreteras principales, no calles.</p>';
    return { title: e ? 'Mapa: ' + e.n : 'Mapa de acerías', html: h, after: function (root) { montar(root, emp); } };
  };

  function montar(root, emp) {
    var cv = root.querySelector('#mcv'), ctx = cv.getContext('2d'), st = root.querySelector('#mst');
    var info = root.querySelector('#minfo'), list = root.querySelector('#mlist');
    var W = 0, H = 0, dpr = 1, cx = 18000, cy = py(20), k = 0.01, kMin = 0.005, kMax = 1.6;
    var ruta = '', sel = -1, raf = 0, moving = false, listT = 0;
    var P = S.acerias.map(function (a, i) { return { i: i, k: 'p', a: a, x: px(a[4]), y: py(a[3]), mine: !emp || a[7] === emp }; });
    var Q = (S.minas || []).map(function (a, i) { return { i: P.length + i, k: 'm', a: a, x: px(a[4]), y: py(a[3]), mine: !emp || a[6] === emp }; });
    var ALL = P.concat(Q), verMinas = leerMinas();
    function capDe(p) { return (p.k === 'm' ? p.a[5] : p.a[6]) || 0; }

    function size() {
      var w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return false;
      var d = Math.min(2, window.devicePixelRatio || 1);
      if (w !== W || h !== H || d !== dpr) { W = w; H = h; dpr = d; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); kMin = W / 36000; }
      return true;
    }
    function clamp() {
      k = Math.max(kMin, Math.min(kMax, k));
      var hw = W / 2 / k, hh = H / 2 / k, top = py(84), bot = py(-58);
      cx = hw * 2 >= 36000 ? 18000 : Math.max(hw, Math.min(36000 - hw, cx));
      cy = hh * 2 >= bot - top ? (top + bot) / 2 : Math.max(top + hh, Math.min(bot - hh, cy));
    }
    function fit(lo1, lo2, la1, la2) {
      if (!size()) return;
      var x1 = px(lo1), x2 = px(lo2), y1 = py(la2), y2 = py(la1);
      k = Math.min(W / (x2 - x1), H / (y2 - y1)); cx = (x1 + x2) / 2; cy = (y1 + y2) / 2; clamp(); paint();
    }
    function vis(p) { return p.k === 'm' ? verMinas : (!ruta || p.a[5] === ruta); }
    function sx(p) { return (p.x - cx) * k + W / 2; }
    function sy(p) { return (p.y - cy) * k + H / 2; }
    function rad(p) { var c = p.a[6], z = k / kMin; return (p.k === 'm' ? 4.6 : c >= 8 ? 6.5 : c >= 3 ? 5 : 4) * (z < 1.6 ? 0.55 : z < 4 ? 0.75 : 1); }

    function draw() {
      raf = 0; if (!size()) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.mar; ctx.fillRect(0, 0, cv.width, cv.height);
      if (paths) {
        ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * (W / 2 - cx * k), dpr * (H / 2 - cy * k));
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.fillStyle = COL.tierra; ctx.fill(paths.paises);
        ctx.strokeStyle = COL.borde; ctx.lineWidth = 1 / k; ctx.stroke(paths.paises);
        var z = k / kMin;                                   // 1 = mundo completo
        ctx.strokeStyle = COL.camino; ctx.globalAlpha = z < 3 ? 0.45 : 0.75; ctx.lineWidth = (z < 3 ? 0.6 : 0.9) / k; ctx.stroke(paths.caminos);
        if (z >= 6 && !moving) { ctx.globalAlpha = 0.6; ctx.lineWidth = 0.7 / k; ctx.stroke(paths.caminos2); }
        ctx.globalAlpha = z < 3 ? 0.8 : 1; ctx.strokeStyle = COL.via; ctx.lineWidth = (z < 3 ? 0.7 : z < 10 ? 1.2 : 1.6) / k; ctx.stroke(paths.vias);
        ctx.globalAlpha = 1;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var inview = [], minasVista = [];
      if (verMinas) Q.forEach(function (p) {
        var x = sx(p), y = sy(p); if (x < -10 || y < -10 || x > W + 10 || y > H + 10) return;
        var r = rad(p) * (p.mine ? 1.15 : 0.8);
        ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath();
        ctx.fillStyle = p.mine ? COL.mina : COL.minaTenue; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = '#2b2205'; ctx.stroke();
        if (p.mine) minasVista.push(p);
      });
      [false, true].forEach(function (front) {
        P.forEach(function (p) {
          if (!vis(p) || p.mine !== front) return;
          var x = sx(p), y = sy(p); if (x < -10 || y < -10 || x > W + 10 || y > H + 10) return;
          var r = rad(p) * (front ? 1 : 0.7);
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fillStyle = front ? COL.planta : COL.tenue; ctx.fill();
          ctx.lineWidth = 1.2; ctx.strokeStyle = front ? '#2a0806' : '#1b232b'; ctx.stroke();
          if (front) inview.push(p);
        });
      });
      if (sel >= 0 && vis(ALL[sel])) {
        var q = ALL[sel], qx = sx(q), qy = sy(q);
        ctx.beginPath(); ctx.arc(qx, qy, rad(q) + 4, 0, 6.2832); ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff'; ctx.stroke();
      }
      var etq = inview.concat(minasVista);
      if (etq.length && etq.length <= 18) {
        ctx.font = '600 11px ' + (getComputedStyle(document.body).fontFamily || 'sans-serif'); ctx.textBaseline = 'middle';
        var boxes = [];
        etq.sort(function (p, q) { return (q.i === sel) - (p.i === sel) || (p.k === 'm') - (q.k === 'm') || capDe(q) - capDe(p); }).forEach(function (p) {
          var t = p.a[0], w = ctx.measureText(t).width, x = sx(p) + rad(p) + 4, y = sy(p);
          if (x + w > W - 4) x = sx(p) - rad(p) - 4 - w;                       // sin espacio a la derecha: a la izquierda
          var b = [x - 2, y - 8, x + w + 2, y + 8];
          if (boxes.some(function (o) { return b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]; })) return;
          boxes.push(b);
          ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(20,27,34,.9)'; ctx.strokeText(t, x, y); ctx.fillStyle = p.k === 'm' ? '#ffe7a8' : '#fff'; ctx.fillText(t, x, y);
        });
      }
      clearTimeout(listT); listT = setTimeout(function () { lista(inview, minasVista); }, 180);
    }
    function paint() { if (!raf) raf = requestAnimationFrame(draw); }

    function card() {
      if (sel < 0) { info.innerHTML = ''; return; }
      var emp2 = null;
      if (ALL[sel].k === 'm') {
        var m = ALL[sel].a; if (m[6]) S.empresas.forEach(function (x) { if (x.id === m[6]) emp2 = x; });
        info.innerHTML = '<div class="mcard mina"><b>' + m[0] + '</b><span class="u">' + m[1] + ' · ' + m[2] + '</span>' +
          '<div class="tags"><i>Mina de hierro</i>' + (m[5] ? '<i>≈ ' + m[5] + ' Mt/año de mineral</i>' : '') + '</div>' +
          (m[7] ? '<p>' + m[7] + '.</p>' : '') + (emp2 ? '<a class="mlk" href="#/industria/' + emp2.id + '">Ver ' + emp2.n + '</a>' : '') + '</div>';
        return;
      }
      var a = S.acerias[sel]; if (a[7]) S.empresas.forEach(function (x) { if (x.id === a[7]) emp2 = x; });
      info.innerHTML = '<div class="mcard"><b>' + a[0] + '</b><span class="u">' + a[1] + ' · ' + a[2] + '</span>' +
        '<div class="tags"><i>' + S.rutas[a[5]][0] + '</i>' + (a[6] ? '<i>' + capTxt(a) + '</i>' : '') + '</div>' +
        (a[8] ? '<p>' + a[8] + '.</p>' : '') +
        (emp2 ? '<a class="mlk" href="#/industria/' + emp2.id + '">Ver ' + emp2.n + '</a>' : '') + '</div>';
    }
    function lista(inview, minas) {
      if (!list.isConnected) return;
      var a = inview.slice().sort(function (p, q) { return (q.a[6] || 0) - (p.a[6] || 0) || p.a[0].localeCompare(q.a[0], 'es'); });
      list.innerHTML = '<h3>En esta vista <span class="small" style="font-weight:500">· ' + a.length + (a.length === 1 ? ' acería' : ' acerías') + '</span></h3>' +
        (a.length ? '<ul class="rows">' + a.slice(0, 30).map(function (p) {
          return '<li><a href="#" data-p="' + p.i + '"><span class="gr"><span class="tt">' + p.a[0] + '</span><span class="ss">' + p.a[1] + ' · ' + p.a[2] + '</span></span><span class="rt">' + (capTxt(p.a).replace('/año', '') || S.rutas[p.a[5]][0]) + '</span></a></li>';
        }).join('') + '</ul>' + (a.length > 30 ? '<p class="small">Acerca el mapa para ver el resto.</p>' : '') : '<p class="small">Ninguna acería con ese filtro en esta zona.</p>') +
        (minas && minas.length ? '<h3>Minas en esta vista <span class="small" style="font-weight:500">· ' + minas.length + '</span></h3><ul class="rows">' +
          minas.slice().sort(function (p, q) { return capDe(q) - capDe(p) || p.a[0].localeCompare(q.a[0], 'es'); }).slice(0, 20).map(function (p) {
            return '<li><a href="#" data-p="' + p.i + '"><span class="gr"><span class="tt">' + p.a[0] + '</span><span class="ss">' + p.a[1] + ' · ' + p.a[2] + '</span></span><span class="rt">' + (p.a[5] ? '≈ ' + p.a[5] + ' Mt' : 'Mina') + '</span></a></li>';
          }).join('') + '</ul>' + (minas.length > 20 ? '<p class="small">Acerca el mapa para ver el resto.</p>' : '') : '');
    }
    function pick(i, center) {
      sel = i; card();
      if (center && i >= 0) { cx = ALL[i].x; cy = ALL[i].y; k = Math.max(k, kMin * 14); clamp(); }
      paint();
    }

    /* Gestos */
    var pts = {}, tap = null;
    function loc(e) { var f = S.localFrac(cv, e.clientX, e.clientY); return [f[0] * W, f[1] * H]; }
    function zoomAt(f, x, y) {
      var mx = cx + (x - W / 2) / k, my = cy + (y - H / 2) / k;
      k = Math.max(kMin, Math.min(kMax, k * f)); cx = mx - (x - W / 2) / k; cy = my - (y - H / 2) / k; clamp(); paint();
    }
    cv.addEventListener('pointerdown', function (e) {
      try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      var l = loc(e); pts[e.pointerId] = l; moving = true;
      tap = Object.keys(pts).length === 1 ? { x: l[0], y: l[1], t: Date.now(), d: 0 } : null;
    });
    cv.addEventListener('pointermove', function (e) {
      var o = pts[e.pointerId]; if (!o) return;
      var l = loc(e), ids = Object.keys(pts);
      if (ids.length === 1) {
        cx -= (l[0] - o[0]) / k; cy -= (l[1] - o[1]) / k; if (tap) tap.d += Math.abs(l[0] - o[0]) + Math.abs(l[1] - o[1]);
        pts[e.pointerId] = l; clamp(); paint();
      } else if (ids.length === 2) {
        var other = pts[ids[0] === String(e.pointerId) ? ids[1] : ids[0]];
        var d0 = Math.hypot(o[0] - other[0], o[1] - other[1]), d1 = Math.hypot(l[0] - other[0], l[1] - other[1]);
        var m0 = [(o[0] + other[0]) / 2, (o[1] + other[1]) / 2], m1 = [(l[0] + other[0]) / 2, (l[1] + other[1]) / 2];
        cx -= (m1[0] - m0[0]) / k; cy -= (m1[1] - m0[1]) / k;
        pts[e.pointerId] = l; if (d0 > 4) zoomAt(d1 / d0, m1[0], m1[1]); else { clamp(); paint(); }
      }
    });
    function up(e) {
      if (!pts[e.pointerId]) return;
      delete pts[e.pointerId];
      if (!Object.keys(pts).length) { moving = false; paint(); }
      if (tap && e.type === 'pointerup' && tap.d < 10 && Date.now() - tap.t < 500) {
        var best = -1, bd = 26;
        ALL.forEach(function (p) { if (!vis(p)) return; var d = Math.hypot(sx(p) - tap.x, sy(p) - tap.y) - (p.mine ? 0 : 6); if (d < bd) { bd = d; best = p.i; } });
        pick(best, false);
      }
      tap = null;
    }
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', function (e) { e.preventDefault(); var l = loc(e); zoomAt(e.deltaY < 0 ? 1.25 : 0.8, l[0], l[1]); }, { passive: false });

    root.querySelector('.mz').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) zoomAt(b.dataset.z > 0 ? 1.8 : 1 / 1.8, W / 2, H / 2); });
    root.querySelector('#mreg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { var r = REG[+b.dataset.i]; fit(r[1], r[2], r[3], r[4]); } });
    root.querySelector('#mrut').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      ruta = b.dataset.r; var bs = this.querySelectorAll('button'); for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('on', bs[i] === b);
      if (sel >= 0 && !vis(ALL[sel])) { sel = -1; card(); }
      paint();
    });
    var sw = root.querySelector('#mmin'), ley = root.querySelector('#mleym');
    function minasUI() { ley.style.display = verMinas ? '' : 'none'; }
    sw.addEventListener('change', function () {
      verMinas = sw.checked; guardarMinas(verMinas); minasUI();
      if (sel >= 0 && !vis(ALL[sel])) { sel = -1; card(); }
      paint();
    });
    minasUI();
    list.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-p]'); if (!a) return;
      e.preventDefault(); e.stopPropagation(); pick(+a.dataset.p, true);
      try { root.querySelector('.mapa').scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (x) {}
    });

    function inicio() {
      var m = P.filter(function (p) { return p.mine; });
      if (emp && m.length) {
        var lo1 = 999, lo2 = -999, la1 = 999, la2 = -999;
        m.forEach(function (p) { lo1 = Math.min(lo1, p.a[4]); lo2 = Math.max(lo2, p.a[4]); la1 = Math.min(la1, p.a[3]); la2 = Math.max(la2, p.a[3]); });
        var pad = Math.max(4, (lo2 - lo1) * 0.15, (la2 - la1) * 0.15);
        fit(lo1 - pad, lo2 + pad, Math.max(-56, la1 - pad), Math.min(80, la2 + pad));
      } else fit(REG[0][1], REG[0][2], REG[0][3], REG[0][4]);
    }
    inicio();
    cargar(function () {
      if (!paths) paths = { paises: new Path2D(S.mapaPaises), vias: new Path2D(S.mapaVias), caminos: new Path2D(S.mapaCaminos), caminos2: new Path2D(S.mapaCaminos2) };
      st.style.display = 'none'; paint();
    }, function () { st.textContent = 'No se pudo cargar el mapa base. Revisa la conexión y vuelve a abrir esta pantalla.'; });
    S._mapa = { fit: fit, pick: pick, state: function () { return { cx: cx, cy: cy, k: k, kMin: kMin, sel: sel, W: W, H: H, minas: verMinas, nP: P.length }; } };
  }
})();

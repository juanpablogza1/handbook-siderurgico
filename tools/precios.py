#!/usr/bin/env python3
"""Descarga los precios de la app y escribe data/precios.json (formato v2).

Lo corre GitHub Actions cada día hábil (.github/workflows/precios.yml).
Fuentes:
  - Yahoo Finance (futuros de CME, primer vencimiento): rollo caliente EE. UU. y chatarra.
  - FRED (Reserva Federal de San Luis): mineral de hierro, metales y gas (FMI y EIA) y tipo de cambio.
Todo se guarda por mes, en USD por tonelada métrica salvo el gas (USD/MMBtu) y el tipo de cambio (MXN por USD).
Si una fuente falla, se conserva la serie anterior del archivo.
"""
import csv, io, json, os, time, datetime, urllib.request

INICIO = (2015, 1)
ST, GT = 0.90718474, 1.0160469   # tonelada corta y tonelada larga, en toneladas métricas
SERIES = [
    # id, fuente, código(s), factor a USD/t
    ('hrc', 'yahoo', [['HRC=F']], 1 / ST),
    ('bus', 'yahoo', [['BUS=F', 'BCH=F']], 1 / GT),
    ('mineral', 'fred', ['PIORECRUSDM'], 1.0),
    ('zinc', 'fred', ['PZINCUSDM'], 1.0),
    ('estano', 'fred', ['PTINUSDM'], 1.0),
    ('niquel', 'fred', ['PNICKUSDM'], 1.0),
    ('aluminio', 'fred', ['PALUMUSDM'], 1.0),
    ('gas', 'fred', ['MHHNGSP'], 1.0),
    ('mxn', 'fred', ['EXMXUS'], 1.0),
]
SALIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'precios.json')
UA = {'User-Agent': 'handbook-siderurgico/1.0 (GitHub Actions)'}


def bajar(url, intentos=2):
    error = None
    for intento in range(intentos):
        t0 = time.time()
        try:
            texto = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20).read().decode('utf-8')
            print('   %s: %d bytes en %.1f s' % (url[:90], len(texto), time.time() - t0), flush=True)
            return texto
        except Exception as e:
            error = e
            print('   %s: falla %s en %.1f s' % (url[:90], e, time.time() - t0), flush=True)
            time.sleep(3)
    raise RuntimeError(str(error))


def fred(codigo):
    texto = bajar('https://fred.stlouisfed.org/graph/fredgraph.csv?id=%s&cosd=2015-01-01' % codigo)
    meses, ultimo = {}, None
    for fila in list(csv.reader(io.StringIO(texto)))[1:]:
        if len(fila) < 2 or fila[1].strip() in ('', '.'):
            continue
        a, m = int(fila[0][:4]), int(fila[0][5:7])
        meses[(a, m)] = float(fila[1]); ultimo = fila[0][:10]
    return meses, {'f': ultimo, 'v': meses[max(meses)]} if meses else None


def yahoo_uno(simbolo):
    """Promedio mensual de los cierres diarios de un futuro de CME en Yahoo Finance (yfinance maneja la sesión)."""
    import yfinance as yf
    h = yf.Ticker(simbolo).history(period='max', interval='1d', auto_adjust=False)
    h = h[h['Close'].notna()]
    if not len(h):
        raise RuntimeError('sin datos')
    meses = {}
    for (a, m), g in h['Close'].groupby([h.index.year, h.index.month]):
        meses[(int(a), int(m))] = float(g.mean())
    idx = h.index[-1]
    print('   %s: %d días, %d meses, último %s' % (simbolo, len(h), len(meses), idx.strftime('%Y-%m-%d')), flush=True)
    return meses, {'f': idx.strftime('%Y-%m-%d'), 'v': float(h['Close'].iloc[-1])}


def yahoo(simbolos):
    """Une varios contratos (el viejo y su sucesor): el más reciente manda donde se traslapan."""
    meses, ultimo, usados = {}, None, []
    for sim in simbolos:
        try:
            m, u = yahoo_uno(sim)
            meses.update(m); usados.append(sim)
            if not ultimo or u['f'] > ultimo['f']:
                ultimo = u
        except Exception as e:
            print('   %s: falla %s' % (sim, str(e)[:100]), flush=True)
    if not meses:
        raise RuntimeError('ningún contrato respondió')
    return meses, ultimo, ' + '.join(usados)


def siguiente(a, m):
    return (a + 1, 1) if m == 12 else (a, m + 1)


def main():
    try:
        viejo = json.load(open(SALIDA, encoding='utf-8'))
        if viejo.get('v') != 2:
            viejo = {}
    except Exception:
        viejo = {}
    crudo, diag = {}, {}
    for sid, fuente, codigos, factor in SERIES:
        for codigo in codigos:
            try:
                if fuente == 'yahoo':
                    meses, ultimo, codigo = yahoo(codigo)
                else:
                    meses, ultimo = fred(codigo)
                meses = {k: v for k, v in meses.items() if k >= INICIO}
                if len(meses) < 6:
                    raise RuntimeError('solo %d meses' % len(meses))
                crudo[sid] = (meses, ultimo, factor, codigo)
                diag[sid] = 'ok %s: %d meses, %s a %s' % (codigo, len(meses), '%04d-%02d' % min(meses), '%04d-%02d' % max(meses))
                break
            except Exception as e:
                diag[sid] = 'falla %s: %s' % (codigo, str(e)[:120])
        print(sid, diag[sid])
    if not crudo:
        raise SystemExit('Ninguna fuente respondió')
    fin = max(max(c[0]) for c in crudo.values())
    eje, k = [], INICIO
    while k <= fin:
        eje.append(k); k = siguiente(*k)
    series = {}
    for sid, fuente, codigos, factor in SERIES:
        if sid in crudo:
            meses, ultimo, fac, codigo = crudo[sid]
            d = [round(meses[k] * fac, 2) if k in meses else None for k in eje]
            series[sid] = {'codigo': codigo, 'fuente': fuente, 'd': d,
                           'ultimo': {'f': ultimo['f'], 'v': round(ultimo['v'] * fac, 2)} if ultimo else None}
        elif sid in viejo.get('series', {}):                 # la fuente falló hoy: se conserva lo anterior
            s = viejo['series'][sid]; s['d'] = (s['d'] + [None] * len(eje))[:len(eje)]
            series[sid] = s
    nuevo = {'v': 2, 'inicio': list(INICIO), 'fin': '%04d-%02d' % fin, 'series': series, 'diagnostico': diag}
    if viejo and all(viejo.get(x) == nuevo[x] for x in ('inicio', 'fin', 'series')):
        print('Sin cambios'); return
    nuevo['actualizado'] = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    with open(SALIDA, 'w', encoding='utf-8') as f:
        json.dump(nuevo, f, ensure_ascii=False, separators=(',', ':')); f.write('\n')
    print('Actualizado al', nuevo['fin'])


if __name__ == '__main__':
    main()

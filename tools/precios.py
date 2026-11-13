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
    ('hrc', 'yahoo', ['HRC=F'], 1 / ST),
    ('hms', 'yahoo', ['FSF=F'], 1.0),
    ('bus', 'yahoo', ['BUS=F', 'BCH=F'], 1 / GT),
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


def yahoo(simbolo):
    """Futuros de CME vía Yahoo Finance con la librería yfinance (maneja la sesión que Yahoo exige)."""
    import yfinance as yf
    t = yf.Ticker(simbolo)
    h = t.history(period='max', interval='1mo', auto_adjust=False)
    meses = {}
    for idx, fila in h.iterrows():
        c = fila.get('Close')
        if c is None or c != c:
            continue
        meses[(idx.year, idx.month)] = float(c)
    d = t.history(period='1mo', interval='1d', auto_adjust=False)
    d = d[d['Close'].notna()]
    if len(d):
        idx, c = d.index[-1], float(d['Close'].iloc[-1])
        meses[(idx.year, idx.month)] = c                  # el mes en curso, con el último cierre diario
        ultimo = {'f': idx.strftime('%Y-%m-%d'), 'v': c}
    else:
        ultimo = {'f': '%04d-%02d' % max(meses), 'v': meses[max(meses)]} if meses else None
    print('   %s: %d meses' % (simbolo, len(meses)), flush=True)
    return meses, ultimo


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
                meses, ultimo = (yahoo if fuente == 'yahoo' else fred)(codigo)
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

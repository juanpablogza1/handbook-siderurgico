#!/usr/bin/env python3
"""Descarga de FRED las series de precios de la app y escribe data/precios.json.

La corre GitHub Actions todos los días (.github/workflows/precios.yml). Solo cambia el
archivo cuando FRED publica datos nuevos o corrige los anteriores.
  acero    WPU1017      BLS, índice de precios al productor de productos de acería (1982 = 100)
  chatarra WPU1012      BLS, índice de precios al productor de chatarra de hierro y acero (1982 = 100)
  mineral  PIORECRUSDM  FMI, precio mundial del mineral de hierro, USD por tonelada métrica
"""
import csv, io, json, os, sys, time, datetime, urllib.request

SERIES = [('acero', 'WPU1017'), ('chatarra', 'WPU1012'), ('mineral', 'PIORECRUSDM')]
INICIO = (2015, 1)
URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id={}&cosd=2015-01-01'
SALIDA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'precios.json')


def bajar(codigo):
    ultimo = None
    for intento in range(4):
        try:
            req = urllib.request.Request(URL.format(codigo), headers={'User-Agent': 'handbook-siderurgico/1.0 (GitHub Actions)'})
            return urllib.request.urlopen(req, timeout=60).read().decode('utf-8')
        except Exception as e:  # red inestable: reintenta
            ultimo = e
            time.sleep(5 * (intento + 1))
    raise SystemExit('No se pudo descargar %s: %s' % (codigo, ultimo))


def leer(texto):
    datos = {}
    for fila in list(csv.reader(io.StringIO(texto)))[1:]:
        if len(fila) < 2 or not fila[1].strip() or fila[1].strip() == '.':
            continue
        a, m = int(fila[0][:4]), int(fila[0][5:7])
        datos[(a, m)] = float(fila[1])
    return datos


def meses(desde, hasta):
    a, m = desde
    while (a, m) <= hasta:
        yield (a, m)
        a, m = (a + 1, 1) if m == 12 else (a, m + 1)


def main():
    crudo = {sid: leer(bajar(cod)) for sid, cod in SERIES}
    fin = min(max(d) for d in crudo.values())          # último mes que tienen las tres
    series = {}
    for sid, _ in SERIES:
        d, previo, vals = crudo[sid], None, []
        for k in meses(INICIO, fin):
            v = d.get(k, previo)                         # si falta un mes, repite el anterior
            if v is None or v <= 0:
                raise SystemExit('Serie %s sin dato válido en %s' % (sid, k))
            vals.append(round(v, 3)); previo = v
        if len(vals) < 100:
            raise SystemExit('Serie %s demasiado corta' % sid)
        series[sid] = vals
    nuevo = {'fuente': 'FRED, Banco de la Reserva Federal de San Luis', 'codigos': dict(SERIES), 'inicio': list(INICIO),
             'fin': '%04d-%02d' % fin, 'series': series}
    try:
        viejo = json.load(open(SALIDA, encoding='utf-8'))
    except Exception:
        viejo = {}
    if all(viejo.get(k) == nuevo[k] for k in ('fin', 'series', 'codigos', 'inicio')) and viejo.get('origen') == 'FRED':
        print('Sin cambios: datos al', nuevo['fin'])
        return
    nuevo['origen'] = 'FRED'
    nuevo['actualizado'] = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    with open(SALIDA, 'w', encoding='utf-8') as f:
        json.dump(nuevo, f, ensure_ascii=False, separators=(',', ':'))
        f.write('\n')
    print('Actualizado: datos al', nuevo['fin'])


if __name__ == '__main__':
    main()

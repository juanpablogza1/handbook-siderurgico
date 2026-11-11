#!/usr/bin/env python3
"""Prepara logotipos para la app.

Uso:
    1. Guarda los logotipos oficiales (PNG, JPG o WEBP) en la carpeta logos-originales/,
       con el nombre que indica icons/logos/LEEME.md (por ejemplo ternium.png, general-motors.png).
    2. Ejecuta:  python3 tools/logos.py
    3. Sube los cambios. La app muestra cada logotipo automáticamente.

Qué hace con cada imagen:
    - Vuelve transparente el fondo blanco o de color uniforme.
    - Recorta los márgenes vacíos al ras del logotipo.
    - Lo ajusta a un máximo de 480 x 200 px sin deformarlo.
    - Lo guarda como PNG en icons/logos/ y actualiza js/data-logos.js.

Requiere Pillow:  pip install pillow
"""
import os, re, sys, json
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'logos-originales')
DST = os.path.join(ROOT, 'icons', 'logos')
MAXW, MAXH, TOL = 480, 200, 18


def slug(name):
    import unicodedata
    s = unicodedata.normalize('NFD', name.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def quitar_fondo(im):
    """Si la imagen no trae transparencia, vuelve transparente el color de las esquinas."""
    im = im.convert('RGBA')
    if im.getextrema()[3][0] < 250:          # ya tiene zonas transparentes
        return im
    w, h = im.size
    esquinas = [im.getpixel(p)[:3] for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    if max(max(abs(a - b) for a, b in zip(esquinas[0], e)) for e in esquinas) > TOL:
        return im                              # fondo no uniforme: se deja como está
    fondo = Image.new('RGB', im.size, esquinas[0])
    dif = ImageChops.difference(im.convert('RGB'), fondo).convert('L')
    alfa = dif.point(lambda v: 0 if v <= TOL else min(255, (v - TOL) * 6))
    im.putalpha(alfa)
    return im


def procesar(ruta):
    im = quitar_fondo(Image.open(ruta))
    caja = im.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
    if caja:
        im = im.crop(caja)
    k = min(MAXW / im.width, MAXH / im.height, 1)
    if k < 1:
        im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    return im


def main():
    os.makedirs(DST, exist_ok=True)
    if os.path.isdir(SRC):
        for f in sorted(os.listdir(SRC)):
            base, ext = os.path.splitext(f)
            if ext.lower() not in ('.png', '.jpg', '.jpeg', '.webp'):
                continue
            im = procesar(os.path.join(SRC, f))
            im.save(os.path.join(DST, slug(base) + '.png'), optimize=True)
            print('listo:', slug(base) + '.png', im.size)
    else:
        print('No existe la carpeta logos-originales/. Créala y coloca ahí los logotipos.')
    idx = {}
    for f in sorted(os.listdir(DST)):
        if f.lower().endswith('.png'):
            with Image.open(os.path.join(DST, f)) as im:
                idx[f[:-4]] = list(im.size)
    with open(os.path.join(ROOT, 'js', 'data-logos.js'), 'w', encoding='utf8') as out:
        out.write('/* Logotipos disponibles en icons/logos/. Este archivo lo regenera tools/logos.py: no lo edites a mano.\n'
                  '   Clave = nombre del archivo sin extensión; valor = [ancho, alto] en pixeles. */\n'
                  'S.logos = ' + json.dumps(idx, ensure_ascii=False, indent=1) + ';\n')
    print(len(idx), 'logotipos registrados en js/data-logos.js')


if __name__ == '__main__':
    sys.exit(main())

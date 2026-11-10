# Siderúrgica

Manual de bolsillo de la industria del acero. Aplicación web instalable (PWA), sin zoom, que funciona sin conexión.

## Contenido

| Sección | Qué incluye |
|---|---|
| **Procesos** | 21 procesos animados, de la mina al producto terminado: minería, peletizado, coque, alto horno, reducción directa, BOF, horno eléctrico, metalurgia secundaria, colada continua, laminación en caliente y en frío, largos, decapado, recocido, galvanizado, pintado, hojalata, tubería con y sin costura, rolado de perfiles y trefilado. Cada uno con entradas, salidas, pasos, parámetros típicos, reacciones y puntos clave. |
| **Química** | Simulador de composición, diagrama hierro-carbono interactivo, 20 elementos y su efecto, microestructuras, tratamientos térmicos, propiedades, familias de aceros y 63 grados con química, propiedades y usos. |
| **Normas** | 68 normas explicadas (ASTM, SAE, API, ASME, AWS, EN, JIS, NMX, ISO, GB) con grados, resistencias, usos y equivalencias; guía completa de grados de galvanizado (calidades, estructurales, pesos de capa, equivalencias) y de designaciones, calibres y varilla. |
| **Industria** | Panorama mundial y de México, ranking worldsteel 2025 y perfiles de 28 empresas y grupos: historia, líderes, accionistas y especialización. |
| **Inicio** | Buscador global y glosario. |

### Simulador

Ajusta 17 elementos y obtiene:

- Familia del acero y la razón metalúrgica.
- Los tres grados comerciales más parecidos, con propiedades típicas y usos.
- Carbono equivalente (IIW), Pcm, dureza máxima al temple, Ms, Ac1/Ac3, diámetro ideal (ASTM A255) y, en inoxidables, PREN y equivalentes de cromo y níquel.
- Alertas: Mn/S, cobre residual, boro sin protección, rango peritéctico, silicio reactivo al galvanizar, sensibilización.

## Instalar en el celular

1. Publica el repositorio con GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
2. Abre `https://juanpablogza1.github.io/handbook-siderurgico/` en el teléfono.
3. Android (Chrome): menú → **Instalar app**. iPhone (Safari): **Compartir → Agregar a inicio**.

Después de la primera carga funciona sin internet.

## Estructura

```
index.html              Carcasa de la app
manifest.webmanifest    Datos de instalación
sw.js                   Service worker (caché sin conexión)
css/app.css             Estilos
js/core.js              Router, bloqueo de zoom, instalación
js/anim-lib.js          Piezas SVG animadas reutilizables
js/anim-1..3.js         Una animación por proceso
js/data-*.js            Contenido: procesos, química, grados, normas, galvanizado, industria
js/sim.js               Simulador de aceros
js/fec.js               Diagrama hierro-carbono
js/views.js             Pantallas
icons/                  Iconos
```

Sin dependencias ni paso de compilación: HTML, CSS y JavaScript planos.

## Actualizar contenido

- Edita el archivo `js/data-*.js` que corresponda.
- Sube el valor de `VERSION` en `sw.js` para que los teléfonos descarguen la versión nueva.

Probar en local:

```
python3 -m http.server 8000
```

## Alcance y fuentes

- Los valores de proceso son rangos típicos de la industria.
- Los valores de normas son mínimos representativos; para comprar, diseñar o certificar rige la edición vigente del documento oficial.
- El simulador usa correlaciones empíricas publicadas (IIW, Ito-Bessyo, Andrews, ASTM A255). Orienta; no sustituye un ensayo.
- Datos de empresas a noviembre de 2026. Producción de acero crudo 2025: World Steel Association. México: CANACERO. Accionistas de Ternium: reporte 6-K a la SEC al 30 de junio de 2026.

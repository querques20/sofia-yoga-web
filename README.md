# Sofia Yoga — web de prueba

Prototipo de la web de Sofia Costa, profesora de yoga en Ginebra: yoga prenatal, posparto y clases de yoga dinámico. Los textos están en francés.

Es una versión de prueba:

- Lo que todavía no confirmó Sofía (lugares, horarios, precios…) aparece con la pastilla «à confirmer».
- Los textos tienen que pasar por una persona nativa antes de publicarse.
- La información de salud lleva sus fuentes al pie de cada página.

## Páginas

| Ruta | Qué tiene |
| --- | --- |
| `/` | Inicio: la entrada con la flor, la embarazada que respira, el programa por trimestres |
| `/yoga-prenatal-geneve` | Yoga prenatal: antes de venir, señales para parar, trimestre por trimestre |
| `/yoga-post-partum-geneve` | Posparto: cuándo retomar, lo que cubre el seguro en Suiza, periné y diástasis |
| `/cours-de-yoga-geneve` | Clases: los estilos, qué aporta el yoga, en grupo, en privado o en el parque |
| `/ateliers-evenements` | Talleres: el ticket del próximo taller |
| `/a-propos` | Su historia, su forma de enseñar y sus formaciones |
| `/contact` | Un armador de mensajes para WhatsApp o mail |

## Cómo levantarla

```bash
pnpm install
pnpm dev        # http://localhost:3010
pnpm build      # todas las rutas salen estáticas
```

Ojo: los botones de WhatsApp llevan al número real de Sofía. Al probar, no mandes los mensajes.

## Cómo está armada

- Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS v4.
- GSAP (ScrollTrigger, SplitText, DrawSVG y MorphSVG) para las animaciones y Lenis para el scroll suave.
- Si el sistema tiene «reducir movimiento» activado, todo se ve sin animaciones.

Carpetas:

- `src/app`: las páginas y el layout.
- `src/components`: las secciones, con una carpeta por página. En `pagina/` están las piezas compartidas y en `ilustraciones/` los dibujos en SVG.
- `src/lib`: la respiración que marca el ritmo de la web, los datos de contacto y el menú.
- `scripts`: `regenerar-ilustraciones.mjs` arma los dibujos sueltos de «Par où commencer» (`public/ilustraciones`) a partir de los componentes. Se corre con el servidor de desarrollo prendido. Esos SVG no se editan a mano.

Las tipografías (D-DIN y Caveat) son de uso libre (SIL OFL) y están en `src/app/fonts` con sus licencias.

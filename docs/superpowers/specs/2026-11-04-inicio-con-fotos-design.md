# Inicio con fotos: la flor que se abre en seis puertas

**Fecha:** 2026-11-04 · **Estado:** aprobado en boceto por Facundo («me encantó»), con el tono en gris cálido. Quedan pendientes las fotos definitivas de Sofía.

**Boceto navegable:** `sofia-yoga/.superpowers/brainstorm/803-1793798635/content/inicio-v2.html` (se sirve con el servidor del brainstorm; las fotos y las fuentes están en esa misma carpeta). Es la referencia de tiempos, posiciones y comportamiento: ante la duda, mirar el boceto.

## Por qué

- Hoy el hero del Inicio es la embarazada que respira («Respire avec moi»), y la misma figura, quieta, es el hero de Yoga prénatal. Dos páginas con la misma portada.
- El Inicio tiene que decir en los primeros segundos **qué hace Sofía**: yoga prenatal, post-partum y clases de yoga dinámico en Ginebra. Con la embarazada sola parecía que solo trabajaba con embarazadas.
- Pedido de Facundo: algo con imágenes, como el collage de fotos que ED tuvo en su Inicio, con una vuelta de rosca. La vuelta: las fotos nacen de la flor de seis pétalos que ya abre la web.

## Qué se construye

### La escena en compu

1. **La entrada de siempre no cambia:** telón verde, la flor se dibuja, el nombre, inspira, y al expirar la página se abre por el hueco con forma de flor (`Entrada.tsx`).
2. **Por el hueco se ven seis fotos que forman la flor:** cada pétalo es una foto (forma de pétalo: caja de 48 × 104 en la escala de la flor, `border-radius: 50%`, girada al ángulo de su pétalo). La flor de fotos está centrada en la pantalla y **crece junto con el hueco** hasta `min(76 % del alto, 86 % del ancho)` de la ventana. Arranca del mismo tamaño que la flor dibujada (112 px × 1,18), así no se nota el cambio.
3. **Se queda un instante entera (≈ 0,2 s) y los pétalos se abren hasta su lugar**, en sentido horario con 0,05 s entre uno y otro, 1,35 s, `power3.inOut`. En el camino cada pétalo pasa de forma de pétalo a su forma orgánica final, y la foto queda siempre derecha (la capa de la foto gira al revés que el marco; verificado: rotación neta 0°).
4. **Mientras se abren entra el texto:** las líneas del título suben por máscara (1,05 s, 0,09 s entre líneas) a +0,7 s del inicio de la apertura; «à Genève» se escribe de izquierda a derecha a +1,05 s; el subtítulo y el botón aparecen a +1,05 s; los carteles de las fotos a +1,15 s.
5. **Nada queda quieto:** las fotos respiran (la forma cambia entre dos formas orgánicas, ciclo de 9 s, cada foto arranca en otro punto) y flotan ±5 px. Al bajar, cada foto se va a su velocidad (parallax de 0,08 a 0,30 del scroll), solo en compu.

Sin rebotes ni easings elásticos. El hero no termina en una pantalla quieta: la respiración y el flote son lo último y no paran.

### Layout en compu

Título centrado, cuatro líneas, con `à Genève` en la manuscrita violeta. Las seis fotos alrededor. Las medidas salen de `--u = min(1vw, 1.6vh)`, así el conjunto entra igual en una pantalla ancha y en una bajita (verificado en 1440 × 900 y 1366 × 700).

| Foto | Centro x (% del hero) | Centro y | Ancho (`--u`) | Proporción | Pétalo de origen | Orden de apertura | Parallax |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Yoga prénatal | 14 | 47 | 21 | 0,79 | 270° | 5.º | 0,16 |
| Post-partum | 89 | 58 | 18,5 | 0,80 | 90° | 2.º | 0,20 |
| Cours en groupe | 24 | 77 | 13,5 | 1 | 210° | 4.º | 0,30 |
| Cours privés | 84 | 20 | 15 | 0,88 | 30° | 1.º | 0,10 |
| Au parc | 76 | 78 | 14,5 | 0,96 | 150° | 3.º | 0,26 |
| Ateliers | 15 | 15 | 14 | 1,20 | 330° | 6.º | 0,08 |

Cada foto sale del pétalo que le queda más cerca de su lugar final, así se abren sin cruzarse. Cada una tiene un giro final chico (±1,6° a ±2,4°), nada derecho del todo.

**Cartel:** pastilla con el nombre en D-DIN Condensed y una flecha, pegada al borde inferior de la foto, fondo página con sombra suave. **Hover:** la foto pasa a color y crece un 5 %, el cartel se invierte (verde con texto claro) y la flecha se corre 0,18 em. Toda la foto con su cartel es un solo link.

**Texto:** ancho `min(46vw, 46u)`, centrado en el hero a 53 % del alto.

### Celular (menos de 64 rem, el mismo corte que el menú, o más alto que ancho)

El boceto cortaba en 56 rem, pero el menú del sitio cambia a las islas de celular en `lg` (64 rem): entre 896 y 1024 px las islas caerían sobre «Ateliers» y «Cours privés». El collage va solo de 64 rem para arriba y más ancho que alto; abajo de eso, la grilla.

Título arriba, subtítulo, botón «Écrire sur WhatsApp», y las seis fotos en una grilla de 3 × 2 (proporción 4:5) con el nombre abajo de cada una, sin pastilla ni flecha. **Todo entra en la primera pantalla** (verificado en 390 × 844: el último nombre termina a 772 px). La entrada es la misma: la flor de fotos crece con el hueco y los pétalos se abren hasta la grilla. Sin parallax.

### Textos

Todo texto nuevo va en los tres idiomas (fr, en, es). EN y ES son borrador para revisión nativa, como el resto.

| | fr | en | es |
| --- | --- | --- | --- |
| H1, tres líneas | Yoga prénatal, / post-partum et / cours de yoga | Prenatal yoga, / postpartum and / yoga classes | Yoga prenatal, / posparto y / clases de yoga |
| H1, línea manuscrita | à Genève | in Geneva | en Ginebra |
| Subtítulo | Une pratique dynamique, différente et joyeuse, pour bouger en conscience. Avec Sofia Costa. | A dynamic, different and joyful practice, to move with awareness. With Sofia Costa. | Una práctica dinámica, distinta y alegre, para moverte con conciencia. Con Sofia Costa. |
| Botón | Écrire sur WhatsApp | Write on WhatsApp | Escribir por WhatsApp |
| Carteles | Yoga prénatal · Post-partum · Cours en groupe · Cours privés · Au parc · Ateliers | Prenatal yoga · Postpartum · Group classes · Private classes · In the park · Workshops | Yoga prenatal · Posparto · Clases en grupo · Clases privadas · En el parque · Talleres |

El subtítulo sale del método en palabras de Sofía («una práctica dinámica, distinta, divertida… mover con conciencia», Contexto maestro §2, [CONFIRMADO]). El H1 mantiene «Genève» por el SEO local. Se saca el link «Trouver mon cours»: las seis fotos son eso. El botón de WhatsApp sigue yendo al número real de Sofía.

**Links de los carteles:** Yoga prénatal → `/yoga-prenatal-geneve` · Post-partum → `/yoga-post-partum-geneve` · Cours en groupe → `/cours-de-yoga-geneve` · Cours privés → `/cours-prives-yoga-geneve` · Au parc → `/cours-de-yoga-geneve` con el ancla de la sección de formatos (el bloque «au parc» de `Formats`), o la página a secas si no hay ancla · Ateliers → `/ateliers-evenements`. En EN y ES, con los slugs de `lib/idiomas.ts`.

**Alt de cada foto** (fr; traducir): prénatal «Une femme enceinte de profil, une main sous le ventre» · post-partum «Une maman qui tient son nouveau-né dans les bras» · groupe «Des élèves qui s’étirent sur leur tapis, en cours» · privés «Sofia en équilibre sur les mains, sur un parquet» · parc «Sofia dans la posture du danseur, sur un chemin de campagne» · ateliers «Un groupe assis en cercle dans une salle lumineuse».

### Las fotos

Sofía no tiene fotos profesionales y no las tendrá pronto (Contexto maestro §10). Lo que hay:

| Puerta | Archivo en el boceto | Origen | Estado |
| --- | --- | --- | --- |
| Cours privés | `h-prive.jpg` | Instagram @sofia.yogaflow, portada de un video de mayo de 2024 (360 × 640) | **De Sofía.** Pedirle el original |
| Au parc | `h-parc.jpg` | Instagram @sofia.yogaflow, foto de marzo de 2024 (512 × 640; en el boceto va con zoom 1,35) | **De Sofía.** Pedirle el original |
| Yoga prénatal | `h-prenatal.jpg` | Unsplash `photo-1710897872898-3bc4353682ce` | Provisoria |
| Post-partum | `h-postpartum.jpg` | Unsplash `photo-1773243086577-5a98bc868a2f` | Provisoria |
| Cours en groupe | `h-groupe.jpg` | Unsplash `photo-1761035005546-62b8018b212a` | Provisoria |
| Ateliers | `h-ateliers.jpg` | Unsplash `photo-1643682661119-28da0685be2c` | Provisoria |

- Las provisorias son de Unsplash (licencia Unsplash: uso libre, sin atribución obligatoria). El Contexto maestro pide evitar fotos de stock: por eso **se marcan como provisorias en el código** (`provisoria: true` en la lista de puertas) y en el README, para reemplazarlas por las de Sofía apenas lleguen. El sitio no sale a producción con ellas sin una decisión explícita.
- Las dos de Instagram son de 640 px de alto: alcanzan para la web de prueba (la foto más grande mide unos 320 px en compu). Para producción hacen falta los originales.
- Los archivos van a `public/inicio/` con nombre descriptivo en francés (`yoga-prenatal-geneve.jpg`, …), a lo sumo 1200 px de lado, JPG o WebP. Se cargan con `next/image`, con `priority` y `sizes` (están arriba de todo).
- **Tono (decidido por Facundo, 4/11):** gris cálido, como el boceto: escala de grises con un poco más de contraste (`grayscale(1) contrast(1.06)`) y una capa de arena multiplicada encima (`mix-blend-mode: multiply`). Al pasar el mouse la foto pasa a color (0,6 s). El gris junta en una sola familia fotos que vienen de lugares distintos; cuando lleguen las de Sofía va a seguir haciendo falta.

### La embarazada que respira se muda a Yoga prénatal

- En `src/app/[lang]/yoga-prenatal-geneve/page.tsx`, el `visual` del `EnteteDePage` deja de ser `<Embarazada />` quieta y pasa a ser `<Respiration t={…} />`, la que respira con «Respire avec moi» (mantener apretado para inspirar). Los textos de `respiracion` (alt, invita, inspira, espira, ayuda) se mudan del hero del Inicio a la página de prénatal, en los tres idiomas, tal como están.
- `Respiration` espera `telonAbierto()`: en prénatal no hay telón y la promesa ya está resuelta, así que arranca enseguida (igual que `Portrait` en À propos). Verificar que el `EnteteDePage` no le pise la animación de entrada (paralaje del `.entete-visual`).
- La `Embarazada` quieta sigue existiendo: la usan las tarjetas de «Par où commencer ?» (`public/ilustraciones/embarazada.svg`) y el script que regenera los SVG.

### Qué no cambia

- La coreografía de `Entrada.tsx` (solo avisa el tamaño del hueco, ver abajo), el menú, «Par où commencer ?», el programa, el resto del Inicio y los datos estructurados.
- El menú del boceto que aparece al final y la barrita de controles son del boceto, no del sitio.

## Decisiones técnicas (de Claude, salvo que se indique)

- **Sincronía con la entrada:** `lib/entrada.ts` suma `avisarHueco(px)` y `escucharHueco(cb)`. `Entrada.tsx` llama a `avisarHueco` en un `onUpdate` del tween de `--flor`. El hero arma la flor de fotos con ese valor (`min(hueco, mostrada)`) y, cuando la entrada terminó del todo, espera 0,2 s y abre los pétalos. Ojo: `telonAbierto()` se cumple cuando el hueco **empieza** a abrirse (≈ 1,04 s), no cuando termina; por eso `lib/entrada.ts` suma también `telonTerminado()`, que `Entrada.tsx` cumple al completar su línea de tiempo (≈ 1,97 s) y enseguida cuando no hay entrada. Si al armar el hero el telón ya está abierto (visita repetida en el mismo idioma y sesión, o volver al Inicio), **no hay flor**: las fotos aparecen en su lugar con un fundido y una escala suave (≈ 0,8 s, `power3.out`, 0,06 s entre fotos) y el título entra como hoy.
- **Menos movimiento:** todo en su lugar desde el primer cuadro, sin respiración, sin flote ni parallax. El hover a color sí.
- **Medidas:** las posiciones finales son variables CSS por foto (`--cx`, `--cy`, `--w`, `--ar`), el hueco de cada foto se mide del DOM (`getBoundingClientRect`) y la flor se calcula desde el viewport; se vuelve a medir en `resize`. Los `sticky`/`fixed` no mienten acá porque el hero es el principio de la página, pero medir con `scrollY` en cuenta igual (como `medir()` del boceto).
- **El centro de la flor de fotos** se calcula con `document.documentElement.clientWidth / 2` e `innerHeight / 2`: sin la barra de scroll, igual que la máscara del telón. Con `scrollbar-gutter: stable` en Windows, `innerWidth` desvía unos 8 px sobre una flor de 132 px, justo cuando no se tiene que notar el cambio.
- **Las fotos derechas dentro del pétalo girado:** el marco gira `r` y la capa de la foto gira `-r`, con un lado que cubre la diagonal mientras es pétalo (`hypot(w, h)`) y la caja justa (`max(w, h) × 1,08`) al final.
- **Estructura:** `src/components/Hero.tsx` se reescribe y lo que crece va a `src/components/hero/` (las puertas, la coreografía, las medidas), con el mismo criterio que `pagina/pila/`. Los textos siguen en `src/app/[lang]/page.tsx`, por idioma. Comentarios en el estilo del resto: naturales, en castellano.
- **`paginaArmada()`** se sigue llamando desde el hero al montar: la entrada lo espera para dibujar la flor.
- **Verificación:** `tsc`, `eslint`, `pnpm build`; Playwright en 1440 × 900, 1366 × 700 y 390 × 844 (sin desborde horizontal, sin errores ni avisos en consola), con y sin «reducir movimiento», y la segunda visita (sin telón). Capturas de la entrada en varios momentos, como las del boceto.

## Decidido por Facundo (4/11)

- **En celular, sin hover, las fotos quedan en gris cálido** igual que en compu antes de pasar el mouse: compu y celular son la misma familia. El color es un premio del mouse, no parte del diseño. (Lo planteó el revisor: en pantalla táctil la primera pantalla entera queda gris.)

## Ajustes al construirlo (4/11, tras la revisión)

- «Ateliers» queda en `cy` 14 (un punto más arriba que el boceto, dentro del ±2 %) y «Cours privés» en 20. Entre 64 y 83 rem de ancho, donde la píldora del menú con el selector de idioma llega hasta ellas, el CSS corre «Ateliers» 4 puntos a la izquierda y «Cours privés» 2 a la derecha y 3 hacia abajo (`--cx-extra`, `--cy-extra`); bajar «Ateliers» la metía en prénatal en 1280 × 800. Medido sin pisar el menú ni la foto de abajo en 1024 × 768, 1152 × 864, 1280 × 800, 1280 × 720, 1328 × 747, 1366 × 700, 1440 × 900 y 1920 × 1080.
- La caja del texto no tapa el mouse a las fotos (`pointer-events: none`; solo el botón se toca).
- El parallax y el fundido van sobre un `span.puerta-cuerpo` interno: GSAP absorbe la propiedad `translate` del elemento que anima.
- Cada puerta lleva `aria-label` con su nombre (el alt describe la foto); el H1 tiene un espacio entre líneas para quien lee el HTML sin estilos; «à Genève» solo se escribe, no sube.
- `LenisProvider` lleva al ancla al navegar a una URL con `#` (Au parc → `#formats`), en vez de ir arriba de todo.
- Las líneas del título son spans propios (no SplitText), y `TAMANO_FLOR`/`INSPIRA` viven en `lib/entrada.ts`.
- El botón del Inicio en EN y ES dice «Write on WhatsApp» y «Escribir por WhatsApp», como en las otras páginas.

## Pendiente con Sofía (no frena el trabajo)

- Los originales de sus dos fotos de Instagram, y fotos para prénatal, post-partum, cours en groupe y ateliers.
- Si está de acuerdo con que la web use sus fotos de Instagram.

## Lo que queda a criterio de quien lo arma

- Los tiempos exactos se ajustan a ojo contra el boceto, sin cambiar el orden de la coreografía.
- Las posiciones de la tabla admiten ±2 % para que el cartel de una foto no pise la esquina de la de al lado (en el boceto, «Yoga prénatal» roza a «Cours en groupe» y «Post-partum» a «Au parc»). Las fotos de abajo tienen que quedar enteras, con su cartel, en una pantalla de 1366 × 700.
- Cómo se resuelve la flor de fotos en celular durante la entrada (misma lógica, con las medidas de la grilla).
- Si `next/image` complica el recorte dentro del marco orgánico, una `img` común con `loading="eager"` y `fetchpriority="high"` es aceptable.

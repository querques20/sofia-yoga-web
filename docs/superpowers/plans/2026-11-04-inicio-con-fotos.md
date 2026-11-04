# Inicio con fotos: plan de construcción

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** El hero del Inicio pasa a ser la flor de la entrada hecha de seis fotos que se abren alrededor del título, cada una con link a su página; la embarazada que respira se muda al hero de Yoga prénatal.

**Architecture:** `Entrada.tsx` sigue siendo dueña de la entrada y solo avisa, por `lib/entrada.ts`, el tamaño del hueco y cuándo terminó. `Hero.tsx` arma el texto y seis `Puerta` y, con `hero/coreografia.ts`, forma la flor de fotos mientras el hueco crece, la abre cuando el telón terminó, y después la deja respirando con el `souffle` de la web. La geometría (dónde cae cada pétalo, cómo se interpola la forma) es pura y vive en `hero/geometria.ts`, con pruebas.

**Tech Stack:** Next.js 16.4 (App Router, `[lang]`), React 19, TypeScript, Tailwind v4, GSAP 3.15 (`useGSAP`, ScrollTrigger, SplitText), `next/image`, `node:test` con `--experimental-strip-types` (Node 22.17) para las pruebas de la geometría.

**Spec:** `docs/superpowers/specs/2026-11-04-inicio-con-fotos-design.md`. Boceto de referencia: `sofia-yoga/.superpowers/brainstorm/803-1793798635/content/inicio-v2.html` (tiempos, posiciones y coreografía en JS; leerlo entero antes de la tarea 4).

## Global Constraints

- Todo texto nuevo va en los tres idiomas (fr, en, es), en el `page.tsx` de su página; EN y ES son borrador para revisión nativa. Francés con espacio fijo antes de `? ! : ;` (`scratchpad/espacios_frances.py <raíz>` lo revisa).
- Comentarios de código naturales, en castellano, en el tono del resto del repo. Nada de «olor a LLM».
- Sin rebotes ni easings elásticos. El hero no termina quieto: la respiración y el flote son lo último y no paran.
- Con «reducir movimiento» todo queda en su lugar desde el primer cuadro, sin entrada, sin respiración ni parallax. El hover a color sí.
- El sitio no tiene test runner: la verificación es `npx tsc --noEmit`, `npx eslint <archivos>`, `pnpm build` y comprobaciones con Playwright (el MCP) con aserciones concretas. Las pruebas de la geometría corren con `pnpm test` (tarea 3).
- Servidor de desarrollo en `http://localhost:3010` (`pnpm dev`). Turbopack a veces no levanta reglas nuevas de `globals.css`: reiniciarlo si una regla no aparece.
- Playwright: para ver la entrada, NO poner `sessionStorage['sofia-entrada']`; para saltearla, ponerlo en el idioma de la página (`'fr'`) con un `addInitScript`. Siempre juntar errores y avisos de consola: tienen que ser cero.
- **No se commitea nada sin el OK de Facundo.** El plan no tiene pasos de commit: al final se le pide el OK y se hace un commit con autor `Facundo Alvarez <160820856+querques20@users.noreply.github.com>` y el trailer `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Las fotos provisorias se marcan `provisoria: true` y se listan en el README. Las de Sofía vienen de su Instagram (640 px) y alcanzan para la web de prueba.

## Review Focus

- Cambiar el tamaño de la ventana (compu ↔ celular) con el hero ya abierto: cada foto tiene que volver a caer en su hueco (`marco` ≈ `puerta`), sin quedar flotando donde estaba. Prueba en la tarea 5.
- Segunda visita en el mismo idioma (sin telón): las fotos aparecen en su lugar en menos de un segundo, nunca queda la flor armada en el centro. Prueba en la tarea 5.
- «Reducir movimiento»: las seis fotos y sus carteles visibles de entrada, el título visible, hover a color. Prueba en la tarea 4.
- Teclado: las seis puertas se recorren con Tab en el orden prénatal → post-partum → groupe → privés → parc → ateliers y el cartel se ve al enfocar. Prueba en la tarea 4.
- Una foto que no carga: el marco queda en arena, el cartel en su lugar y nada salta de tamaño (la caja tiene proporción fija). Prueba en la tarea 4.

---

### Task 1: Las fotos y el README

**Files:**
- Create: `public/inicio/yoga-prenatal-geneve.jpg`, `public/inicio/yoga-post-partum-geneve.jpg`, `public/inicio/cours-en-groupe-geneve.jpg`, `public/inicio/cours-prives-geneve.jpg`, `public/inicio/yoga-au-parc-geneve.jpg`, `public/inicio/ateliers-yoga-geneve.jpg`
- Modify: `README.md` (sección nueva después de «Páginas»)

**Interfaces:**
- Produces: las seis rutas de arriba, que `hero/puertas.ts` (tarea 3) usa tal cual.

- [ ] **Step 1: Copiar las fotos del boceto con su nombre en francés**

Origen `sofia-yoga/.superpowers/brainstorm/803-1793798635/content/`: `h-prenatal.jpg` → `yoga-prenatal-geneve.jpg` · `h-postpartum.jpg` → `yoga-post-partum-geneve.jpg` · `h-groupe.jpg` → `cours-en-groupe-geneve.jpg` · `h-prive.jpg` → `cours-prives-geneve.jpg` · `h-parc.jpg` → `yoga-au-parc-geneve.jpg` · `h-ateliers.jpg` → `ateliers-yoga-geneve.jpg`. Ninguna pasa de 1200 px de lado: no hace falta achicarlas.

- [ ] **Step 2: Verificar**

Run: `ls -la public/inicio && file public/inicio/*.jpg`
Expected: seis archivos JPEG, entre 12 KB y 140 KB cada uno.

- [ ] **Step 3: Sección «Las fotos del Inicio» en el README**

Una tabla con puerta, archivo, origen y estado, con los datos de la tabla «Las fotos» del spec (las dos de Instagram de Sofía, las cuatro provisorias de Unsplash con su id), y una línea que diga que las provisorias se reemplazan por las de Sofía apenas lleguen y que el sitio no sale a producción con ellas sin decidirlo.

---

### Task 2: La entrada avisa el hueco y cuándo terminó

**Files:**
- Modify: `src/lib/entrada.ts`
- Modify: `src/components/Entrada.tsx:95-130` (la línea de tiempo) y `:78-83` (la rama sin entrada)

**Interfaces:**
- Produces (en `lib/entrada.ts`):
  - `avisarHueco(px: number): void`: Entrada lo llama en cada cuadro mientras el hueco crece.
  - `escucharHueco(oyente: (px: number) => void): () => void`: avisa en cada cambio; si el hueco ya está en marcha avisa enseguida con el valor actual. Devuelve cómo borrarse.
  - `terminarTelon(): void` y `telonTerminado(): Promise<void>`: se cumple cuando la entrada de esta vuelta terminó del todo (el hueco tapó la pantalla); sin entrada (menos movimiento o ya vista) se cumple enseguida. Como `telonAbierto`, hay que pedirla al montar.
  - `hayEntradaPendiente(): boolean`: `true` mientras el telón de esta vuelta no se abrió. El hero decide con esto si arma la flor o aparece sin ella.

- [ ] **Step 1: Sumar el estado del hueco y del fin a `lib/entrada.ts`**

Junto a `aviso`/`abierto`: `let hueco = 0`, un `Set` de oyentes del hueco, y `fin`/`avisarFin` armados igual que `aviso`/`avisar` (promesa nueva por vuelta). `cerrarTelon()` además pone `hueco = 0` y renueva `fin`. `hayEntradaPendiente` devuelve `!abierto`. Comentarios en el estilo del archivo.

- [ ] **Step 2: Entrada.tsx anima un proxy y avisa**

En la línea de tiempo, el `.to(el, { "--flor": \`${final}px\`, duration: 0.95, ease: "power3.in" }, 1.02)` pasa a animar `const hueco = { tam: TAMANO_FLOR * INSPIRA }` hasta `final` con el mismo `duration`, `ease` y posición, y en `onUpdate` pinta `--flor` en `el` y llama `avisarHueco(hueco.tam)`. El `.set(el, { "--flor": … }, 1.02)` queda. En `onComplete` (después de `setTermino(true)`) se llama `terminarTelon()`. En la rama `if (quieto || idiomaVisto() === idioma)`, después de `abrirTelon()`, también `terminarTelon()`.

- [ ] **Step 3: Tipos y lint**

Run: `npx tsc --noEmit && npx eslint src/lib/entrada.ts src/components/Entrada.tsx`
Expected: sin errores.

- [ ] **Step 4: La entrada sigue igual (regresión)**

Playwright en `http://localhost:3010/` a 1440 × 900, sin `sofia-entrada`: capturas a 0,9 s, 1,5 s y 3 s; a los 3 s `document.querySelector(".entrada")` es `null`, `.hero-titulo` tiene texto visible y el nav se ve; consola sin errores ni avisos. Con `sofia-entrada = 'fr'`: no hay `.entrada` y el título se ve antes del segundo.

---

### Task 3: La geometría y la lista de puertas

**Files:**
- Create: `src/components/hero/geometria.ts` (puro, sin imports)
- Create: `src/components/hero/geometria.test.mjs`
- Create: `src/components/hero/puertas.ts`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces (`geometria.ts`):
  - `type Forma = [number, number, number, number, number, number, number, number]` (los ocho radios de `border-radius`, en %).
  - `FORMA_A`, `FORMA_B` (las de `Portrait.tsx`: `[58,42,46,54,52,44,56,48]` y `[50,50,56,44,46,54,48,52]`) y `PETALO` (ocho veces 50).
  - `FLOR = { lado: 224, petaloAncho: 48, petaloAlto: 104, radio: 52 }`: la flor dibujada de `Fleur.tsx` (viewBox 224, elipses de 24 × 52 a 52 del centro).
  - `radioOrganico(soplo: number, forma: number, desfase: number): string` → `"a% b% c% d% / e% f% g% h%"`. `soplo` 0…1 interpola A → B; `forma` 0…1 interpola PETALO → (esa mezcla); `desfase` corre los índices de A y B de a `desfase * 2` posiciones (cada foto arranca en otro punto). Dos decimales.
  - `petaloEnFlor(angulo: number, tam: number, centro: { x: number; y: number }): { x: number; y: number; w: number; h: number; r: number }`: el pétalo de ese ángulo (grados, 0 = arriba, horario) en una flor de `tam` px de lado centrada en `centro`. `w = 48 · tam/224`, `h = 104 · tam/224`, `r = angulo`.
  - `ladoDeLaFoto(w: number, h: number, forma: number): number`: de `hypot(w, h)` (forma 0, cubre el pétalo girado) a `max(w, h) · 1.08` (forma 1).
  - `tamanoDeLaFlor(hueco: number, ventana: { ancho: number; alto: number }): number` = `min(hueco, min(0.76 · alto, 0.86 · ancho))`.
- Produces (`puertas.ts`):
  - `type ClavePuerta = "prenatal" | "postPartum" | "groupe" | "prives" | "parc" | "ateliers"`.
  - `type Puerta = { clave: ClavePuerta; ruta: string; ancla?: string; archivo: string; ancho: number; alto: number; provisoria: boolean; cx: number; cy: number; w: number; ar: number; angulo: number; giro: number; orden: number; prof: number; pos: string; zoom?: number }`.
  - `PUERTAS: Puerta[]` en el orden prenatal, postPartum, groupe, prives, parc, ateliers, con la tabla «Layout en compu» del spec: `cx/cy/w/ar/angulo/orden/prof` tal cual; `giro` −2.4, 2.2, 1.6, −1.8, −2, 2; `pos` `"50% 50%"`, `"97% 50%"`, `"100% 62%"`, `"50% 66%"`, `"48% 100%"` (y `zoom: 1.35`), `"50% 50%"`; `ruta` `/yoga-prenatal-geneve`, `/yoga-post-partum-geneve`, `/cours-de-yoga-geneve`, `/cours-prives-yoga-geneve`, `/cours-de-yoga-geneve` con `ancla: "formats"`, `/ateliers-evenements`; `archivo` las rutas de la tarea 1 (`/inicio/…`); `ancho/alto` reales de cada JPG; `provisoria` true salvo prives y parc. `orden` es el lugar en la apertura (0 = primero): prives 0, postPartum 1, parc 2, groupe 3, prenatal 4, ateliers 5.

- [ ] **Step 1: Escribir las pruebas**

`geometria.test.mjs` con `node:test` y `node:assert/strict`, importando `./geometria.ts` (con extensión):

```js
test("en reposo es un pétalo", () => assert.equal(radioOrganico(0, 0, 0), "50% 50% 50% 50% / 50% 50% 50% 50%"));
test("con forma 1 y soplo 0 es la forma A", () => assert.equal(radioOrganico(0, 1, 0), "58% 42% 46% 54% / 52% 44% 56% 48%"));
test("con soplo 1 es la forma B", () => assert.equal(radioOrganico(1, 1, 0), "50% 50% 56% 44% / 46% 54% 48% 52%"));
test("el desfase corre los radios", () => assert.equal(radioOrganico(0, 1, 1), "46% 54% 52% 44% / 56% 48% 58% 42%"));
test("el pétalo de arriba", () => assert.deepEqual(petaloEnFlor(0, 224, { x: 0, y: 0 }), { x: 0, y: -52, w: 48, h: 104, r: 0 }));
test("el pétalo de la derecha, a escala", () => { const p = petaloEnFlor(90, 448, { x: 100, y: 100 }); assert.ok(Math.abs(p.x - 204) < 1e-9 && Math.abs(p.y - 100) < 1e-9); assert.deepEqual([p.w, p.h, p.r], [96, 208, 90]); });
test("la foto cubre la diagonal mientras es pétalo", () => assert.ok(Math.abs(ladoDeLaFoto(48, 104, 0) - Math.hypot(48, 104)) < 1e-9));
test("y queda justa al final", () => assert.equal(ladoDeLaFoto(100, 200, 1), 216));
test("la flor no pasa de la ventana", () => { assert.equal(tamanoDeLaFlor(5000, { ancho: 1440, alto: 900 }), 684); assert.equal(tamanoDeLaFlor(200, { ancho: 1440, alto: 900 }), 200); });
```

- [ ] **Step 2: Correrlas y verlas fallar**

`package.json`: `"test": "node --experimental-strip-types --no-warnings=ExperimentalWarning --test \"src/**/*.test.mjs\""`.
Run: `pnpm test`
Expected: falla porque `./geometria.ts` no existe.

- [ ] **Step 3: Escribir `geometria.ts`**

Las firmas de arriba. `petaloEnFlor`: `x = centro.x + radio·escala·sin(a)`, `y = centro.y − radio·escala·cos(a)` con `a = angulo·π/180` y `escala = tam/224`.

- [ ] **Step 4: Correr las pruebas**

Run: `pnpm test`
Expected: 9 pasan.

- [ ] **Step 5: Escribir `puertas.ts`** con los tipos y la lista de arriba (medir `ancho/alto` reales con `file`).

- [ ] **Step 6: Tipos y lint**

Run: `npx tsc --noEmit && npx eslint src/components/hero/`
Expected: sin errores.

---

### Task 4: El hero nuevo, quieto, en los tres idiomas; la embarazada se muda a prénatal

**Files:**
- Create: `src/components/hero/Puerta.tsx`
- Modify: `src/components/Hero.tsx` (se reescribe entero)
- Modify: `src/app/globals.css` (bloque nuevo `/* el inicio con fotos */`)
- Modify: `src/app/[lang]/page.tsx:17-40` (hero fr), `:151-166` (en), `:272-287` (es)
- Modify: `src/app/[lang]/yoga-prenatal-geneve/page.tsx:1-27` (imports), los tres objetos de textos (`ilustracion` → `respiracion`), `:693-702` (visual)

**Interfaces:**
- Consumes: `PUERTAS`, `Puerta`, `ClavePuerta` (tarea 3); `rutaEn(idioma, ruta)` de `lib/idiomas`; `paginaArmada` de `lib/entrada`; `Respiration` y `TextosRespiration` de `components/Respiration`.
- Produces:
  - `type TextosHero = { lineas: [string, string, string]; lugar: string; sub: string; whatsapp: string; puertasAria: string; puertas: Record<ClavePuerta, { nombre: string; alt: string }> }` (exportado desde `Hero.tsx`).
  - `Puerta({ puerta, href, nombre, alt }: { puerta: Puerta; href: string; nombre: string; alt: string })`: un `<Link>` con clase `puerta group` y `data-puerta={clave}`, variables inline `--cx --cy --w --ar --pos --zoom`, adentro `span.puerta-marco[data-marco]` > `span.puerta-foto[data-foto]` > `<Image fill priority sizes="(min-width: 64rem) 22vw, 30vw" alt={alt} className="object-cover …">` y `span.puerta-cartel[data-cartel]` con `nombre` y una flecha `→` en un `<i aria-hidden>`.
  - El DOM que la tarea 5 anima: `section#inicio[data-hero]` > `div.hero-texto` (`h1.hero-titulo` con cuatro `span.hero-linea`, la última con `span.mano`; `p.hero-sub.entra`; `div.hero-acciones.entra`) y `nav.hero-puertas[aria-label]` con las seis `Puerta`.

- [ ] **Step 1: `TextosHero` y los textos en `page.tsx`**

Reemplazar `antes/mano/despues/lugar/sub/whatsapp/buscar/respiracion` por el tipo nuevo con los textos de la tabla «Textos» del spec (`lineas` son las tres líneas del H1; `lugar` la manuscrita; `puertasAria`: fr «Ce que je propose», en «What I offer», es «Lo que ofrezco»; `alt` los del spec traducidos). `respiracion` se saca de acá (va a prénatal en el paso 4).

- [ ] **Step 2: `Puerta.tsx` y `Hero.tsx` sin animación**

`Hero.tsx` (`"use client"`): `useGSAP` que solo llama `paginaArmada()` y pone visibles los `.entra` (la coreografía llega en la tarea 5). Marcado: `section#inicio[data-hero]` con `relative overflow-clip min-h-svh` y `style={{ "--u": "min(1vw, 1.6vh)" }}`; el texto centrado como en el boceto (`.hero-texto`: absoluto en compu a `left:50% top:53%`, ancho `min(46vw, 46·u)`; título `titre` a `6.8·u`, líneas con `overflow:hidden`; `.mano` con `text-[1.14em]`); el botón WhatsApp con `Magnetique` y `CONTACTO.whatsapp` como hoy; el `nav.hero-puertas` con `PUERTAS.map` → `Puerta` con `href = rutaEn(idioma, ruta) + (ancla ? "#" + ancla : "")`, `nombre`/`alt` de `t.puertas[clave]`. El idioma sale de `useRuta()` (como `EnteteDePage`). Se saca `Respiration` de acá.

- [ ] **Step 3: CSS del hero en `globals.css`**

Bloque `[data-hero]` al estilo de `[data-pila]`: en compu (`@media (min-width: 64rem) and (min-aspect-ratio: 1/1)`, el mismo corte que el menú) `.puerta` absoluta en `left: calc(var(--cx) * 1%) top: calc(var(--cy) * 1%)`, `width: calc(var(--w) * var(--u))`, `aspect-ratio: var(--ar)`, `translate(-50%, -50%)`; `.puerta-marco` absoluto centrado, `overflow: hidden`, fondo arena, con un `::after` arena en `mix-blend-mode: multiply` (transición de opacidad 0,6 s); la imagen con `filter: grayscale(1) contrast(1.06)`, `object-position: var(--pos)`, `transform: scale(var(--zoom, 1))` y transición; `:hover`/`:focus-visible` de `.puerta`: filtro a color, `::after` a 0, imagen ×1,05, cartel verde con texto página y la flecha corrida 0,18 em. Cartel como pastilla (`.puerta-cartel`: D-DIN Condensed, mayúsculas, `max(1rem, 1.5·u)`, fondo página, sombra). Fuera de compu: `.hero-puertas` grilla 3 × 2 (`gap: 2.2rem 0.65rem`), `.puerta` estática con `aspect-ratio: 4/5`, el cartel debajo sin pastilla ni flecha. Mientras no hay coreografía, el marco ocupa toda la puerta (`inset: 0`) y lleva `border-radius` de la forma A (`58% 42% 46% 54% / 52% 44% 56% 48%`). En pantallas sin hover las fotos quedan grises (decidido por Facundo): no hay regla aparte para `(hover: none)`.

- [ ] **Step 4: La embarazada que respira en prénatal**

En `yoga-prenatal-geneve/page.tsx`: importar `Respiration, type TextosRespiration`; en cada idioma, `ilustracion: "…"` pasa a `respiracion: { alt, invita, inspira, espira, ayuda }` con los textos que hoy están en el hero del Inicio (fr `alt` = el `ilustracion` actual; en/es los de `page.tsx:160-164` y `:281-285`); `visual` pasa a `<div className="mx-auto aspect-[400/520] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[27rem]"><Respiration t={t.respiracion} /></div>` y el `EnteteDePage` lleva `paralaje={false}` (es algo para tocar). Sacar los imports de `IlustracionQueRespira` y `Embarazada` si ya no se usan en el archivo.

- [ ] **Step 5: Espacios del francés, tipos, lint, build**

Run: `PYTHONIOENCODING=utf-8 python <scratchpad>/espacios_frances.py . && npx tsc --noEmit && npx eslint src/components/Hero.tsx src/components/hero/ "src/app/[lang]/page.tsx" "src/app/[lang]/yoga-prenatal-geneve/page.tsx" && pnpm build`
Expected: sin errores; el build lista `/`, `/en`, `/es` y las tres de prénatal.

- [ ] **Step 6: El hero quieto en Playwright**

Con `emulateMedia({ reducedMotion: "reduce" })` (sin entrada), en `/`, `/en` y `/es`:
- a 1440 × 900 y 1366 × 700: las seis `.puerta` visibles, cada `[data-cartel]` con `bottom ≤ innerHeight`, ninguna `[data-marco]` cruza la caja de `.hero-texto`, y a 1366 × 700 las dos de abajo enteras; `h1` con las cuatro líneas y `.mano` con «à Genève» / «in Geneva» / «en Ginebra»;
- a 390 × 844: `scrollWidth ≤ innerWidth`, el sexto cartel con `bottom ≤ 844`;
- a 1024 × 768 (tablet apaisada, menos de 64 rem: va la grilla): la isla de la marca y el botón del menú de celular no se superponen con ninguna `.puerta` ni con el `h1`;
- Tab seis veces desde el botón de WhatsApp: `document.activeElement.href` recorre prénatal, post-partum, cours, privés, cours#formats, ateliers (con los slugs del idioma);
- con `page.route("**/inicio/*.jpg", r => r.abort())`: las seis `[data-marco]` siguen con el mismo tamaño que sin cortar las fotos, carteles en su lugar;
- consola: cero errores y cero avisos (los de red por las fotos cortadas no cuentan).
- `/yoga-prenatal-geneve`: existe el botón «Respire avec moi» dentro de `.entete-visual`, visible y sin recortar (`getBoundingClientRect().bottom` dentro de la sección).

---

### Task 5: La coreografía: la flor de fotos, la apertura, la respiración y el parallax

**Files:**
- Create: `src/components/hero/coreografia.ts`
- Modify: `src/components/Hero.tsx` (el `useGSAP`)
- Modify: `src/app/globals.css` (el marco deja de ocupar la puerta cuando hay coreografía: `[data-hero].con-coreografia .puerta-marco` sin `inset`, centrado con `left/top 50%`)

**Interfaces:**
- Consumes: `geometria.ts` entero; `escucharHueco`, `telonTerminado`, `hayEntradaPendiente`, `telonAbierto`, `paginaArmada` (tarea 2); `escucharSouffle` de `lib/souffle`; `lenisActual` no hace falta (la entrada ya frena Lenis).
- Produces (`coreografia.ts`):
  - `type Foto = { el: HTMLElement; marco: HTMLElement; foto: HTMLElement; i: number; angulo: number; giro: number; orden: number; prof: number; cx: number; cy: number; W: number; H: number; x: number; y: number; w: number; h: number; r: number; forma: number; flote: number }`.
  - `medirPuertas(seccion: HTMLElement): Foto[]`: lee `PUERTAS` por `data-puerta` y mide el centro y tamaño de cada `.puerta` (con `scrollY`).
  - `pintar(f: Foto, soplo: number): void`: pone en el marco `width/height`, `transform: translate(-50%,-50%) translate(x, y + flote) rotate(r)` y `border-radius = radioOrganico(soplo, f.forma, f.i)`; en la foto `width/height = ladoDeLaFoto(w, h, forma)` y `transform: translate(-50%,-50%) rotate(-r)`.
  - `formarFlor(fotos: Foto[], tam: number): void`: cada foto en `petaloEnFlor(angulo, tam, centro)` con `centro = { x: document.documentElement.clientWidth / 2, y: innerHeight / 2 }` (sin la barra de scroll, como la máscara del telón), relativo a su propio centro (`x = px − cx`, `y = py − cy`), `forma = 0`, y pinta.
  - `dejarEnSuLugar(fotos: Foto[]): void`: `x = y = 0`, `w = W`, `h = H`, `r = giro`, `forma = 1`, pinta.
  - `abrirPuertas(fotos: Foto[], linea: gsap.core.Timeline, desde: number): void`: por foto, un tween a su lugar (`x, y, w, h, r, forma` como `dejarEnSuLugar`) de 1,35 s, `power3.inOut`, en `desde + orden · 0.05`, con `onUpdate: () => pintar(f, 0)` (la respiración arranca recién al terminar la línea).
  - `aparecerEnSuLugar(fotos: Foto[], linea: gsap.core.Timeline, desde: number): void`: sin flor; `dejarEnSuLugar` y un `from` de `opacity: 0, scale: 0.94` sobre los marcos, 0,8 s, `power3.out`, 0,06 s entre fotos.
  - `respirarYFlotar(fotos: Foto[]): () => void`: `escucharSouffle` guarda el soplo; un `gsap.ticker` pone `flote = sin(t · 0.55 + i · 1.3) · 5` y pinta. Devuelve la limpieza.
  - `parallax(fotos: Foto[], seccion: HTMLElement): () => void`: por foto un `gsap.to(f.el, { y: () => -prof · altoDelHero, ease: "none", scrollTrigger: { trigger: seccion, start: "top top", end: "bottom top", scrub: 0.6 } })` (sobre `.puerta`, no sobre el marco). Devuelve la limpieza.

- [ ] **Step 1: `coreografia.ts`** con las firmas de arriba. El `rotate(-r)` de la foto es lo que la deja derecha adentro del pétalo girado.

- [ ] **Step 2: El `useGSAP` de `Hero.tsx`**

Orden: `paginaArmada()`; si `quieto` → nada más (todo queda como en la tarea 4). Si no: `seccion.classList.add("con-coreografia")`, `compu = matchMedia("(min-width: 64rem) and (min-aspect-ratio: 1/1)").matches`, `fotos = medirPuertas(seccion)`, esconder el texto como hoy (`yPercent` de las líneas, `clipPath` de `.mano`, `.entra` en `opacity 0`), carteles en `opacity 0`. Después:
- `hayEntradaPendiente()` → `formarFlor(fotos, 112 · 1.18)` y `escucharHueco(px => formarFlor(fotos, tamanoDeLaFlor(px, ventana)))`, con `ventana = { ancho: document.documentElement.clientWidth, alto: innerHeight }`; en `telonTerminado()` → línea de tiempo con `abrirPuertas(fotos, linea, 0.2)`, título a `0.2 + 0.7` (SplitText por líneas como hoy, 1,05 s, 0,09 s), `.mano` a `0.2 + 1.05`, `.entra` a `0.2 + 1.05`, carteles a `0.2 + 1.15`;
- si no → `aparecerEnSuLugar(fotos, linea, 0)` y el texto a `0.1` como hoy (`telonAbierto()` ya cumplido);
- `onComplete` de la línea: `respirarYFlotar(fotos)` y, si `compu`, `parallax(fotos, seccion)`;
- `resize` (con `compu` recalculado): `medirPuertas` de nuevo y `dejarEnSuLugar`;
- limpieza: borrar el oyente del hueco, el `resize`, la respiración y el parallax; `revertOnUpdate: true`.

- [ ] **Step 3: Tipos y lint**

Run: `npx tsc --noEmit && npx eslint src/components/Hero.tsx src/components/hero/`
Expected: sin errores.

- [ ] **Step 4: La entrada con la flor de fotos (Playwright, sin `sofia-entrada`)**

A 1440 × 900 en `/`, capturas a 1,5 s, 2,2 s, 2,9 s, 3,6 s y 6 s, y en cada una, según el boceto:
- 1,5 s: hay `.entrada` y las seis `[data-marco]` están dentro de un círculo de 342 px (= 684/2) alrededor del centro de la ventana;
- 2,2 s: no hay `.entrada`; las fotos siguen en flor (ningún marco a más de 342 px del centro);
- 2,9 s: para cada puerta, el ángulo de la matriz de `[data-marco]` más el de `[data-foto]` da 0 (±0,5°);
- 6 s: cada `[data-marco]` coincide con su `.puerta` (±2 px); el H1 visible y «à Genève» entero; los seis carteles con `opacity 1`; `border-radius` de dos marcos distinto entre sí (respiran desfasadas) y distinto al de la misma foto 1 s después (respira);
- al bajar 400 px: la puerta `prives` (prof 0,10) se movió menos que `groupe` (prof 0,30);
- consola: cero errores y cero avisos.
A 390 × 844 y a 1024 × 768 lo mismo en 6 s: cada marco coincide con su celda de la grilla, `scrollWidth ≤ innerWidth`, y a 1,5 s la flor de fotos está centrada en la pantalla (el centro de los seis marcos a menos de 4 px de `clientWidth / 2, innerHeight / 2`).

- [ ] **Step 5: La segunda visita y el cambio de tamaño (Review Focus)**

Con `sofia-entrada = 'fr'`: a 1 s cada marco coincide con su puerta y tiene `opacity 1`; ningún marco pasó por el centro (medir a 0,1 s: ya está a menos de 30 px de su lugar o con `opacity < 1` en su lugar). Después `setViewportSize(390 × 844)` y a los 0,5 s cada marco coincide con su celda; volver a 1440 × 900, lo mismo con las posiciones de compu.

- [ ] **Step 6: Los tres idiomas y el build**

Run: `pnpm build`
Expected: sin errores. Playwright en `/en` y `/es` a 1440 × 900 a los 6 s: H1 con «in Geneva» / «en Ginebra», carteles traducidos, hrefs con los slugs del idioma.

---

### Task 6: Revisión final y commit (con el OK de Facundo)

**Files:** ninguno nuevo.

- [ ] **Step 1: Las nueve páginas siguen sanas**

Playwright con `sofia-entrada` puesto, en las 9 rutas en fr: cero errores y avisos de consola, sin desborde horizontal a 390 × 844.

- [ ] **Step 2: Capturas para Facundo**

Guardar en el scratchpad las capturas de 1,5 s, 2,9 s y 6 s en compu, y la de 6 s en celular, para mostrárselas antes de pedir el OK (regla: mostrar antes de reemplazar una escena aprobada).

- [ ] **Step 3: Pedir el OK y commitear**

Un solo commit con las fotos, el hero, la entrada, la geometría con sus pruebas, prénatal, el README y los docs de `docs/superpowers/`. Mensaje en el estilo del repo (título corto, viñetas con el porqué) y el trailer de `Co-Authored-By`. Push solo si lo pide.

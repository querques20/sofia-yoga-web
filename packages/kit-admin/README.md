# @sofia/kit-admin

Los primitivos del admin: los controles de un formulario, los botones y el
aviso, y las piezas que arman una pantalla (el encabezado, las pestañas, la
lista, la tabla, el estado vacío, la confirmación…). El kit viene del admin
de Empoderamiento Docente (commit `ecc6c7f0`), copiado sin cambios: por eso
sus tokens se llaman `azul-…` y `naranja-…`, nombres de rol que acá toman la
paleta de Sofia en `src/app/(admin)/admin.css`. Son lo que cada entidad usa
para escribir su formulario y su pantalla a mano. No hay un generador de
formularios acá.

## La frontera

**El kit no sabe nada de ED** (AGENTS.md §3). Ni una ruta del sitio, ni un
texto de ED, ni un `@/`: todo lo que un control muestra llega por prop (la
etiqueta, la ayuda, el tope, las opciones, los links) y todo lo que hace
afuera también (subir una foto es `subir`, una función que la app le pasa;
mover una fila es una acción que la app le da a `useMoverEnOrden`). Si
aparece «novedad» acá adentro, está mal puesto.

Lo que sabe de ED se queda en la app, en `admin/armazon/`: la sidebar y sus
módulos, la guarda y «Sin permiso», salir, el tema, la pantalla de acceso con
la marca, lo que depende de `lib/contenido/` (el momento, el encabezado de
la ficha, «Qué cambió», «Cómo se ve») y los errores del editor
(`useErroresDelEditor`), que conocen el generador de formularios de las
páginas.

Sí sabe de Next: `CampoFoto`, `ListaFija` y `ZonaDeFoto` usan `next/image`; `BotonEnlace`,
`Volver`, `Pestanas`, `Filtro`, `Buscador` e
`IndiceDeTarjetas` usan `next/link`; `Pestanas` lee la ruta con
`usePathname`, `useMoverEnOrden` refresca con `useRouter` y `useFrenarSalida`
navega con él cuando se sale igual. `react`,
`react-dom` y `next` son `peerDependencies`: los pone la app. Lo que sale
por el índice y usa estado o efectos lleva `"use client"`, hooks incluidos:
el índice lo importa también un componente de servidor.

## Qué exporta

Los controles de un formulario:

| Export | Qué es |
| --- | --- |
| `TextoCorto`, `Parrafo` | una línea o varias, con el tope a la vista y el contador |
| `Seleccion` | un valor de una lista cerrada, con `{ valor, etiqueta }` |
| `CajaDesplegable` | la caja de un desplegable, para quien arma el suyo: la `ENTRADA` con su chevron y la lista con `desplegable-propio` |
| `Casilla` | sí o no, con su etiqueta y lo que pasa si se marca |
| `Fecha` | año, y si se sabe, mes y día: `AAAA-MM-DD`, `AAAA-MM` o `AAAA` |
| `CampoFoto` | una foto: miniatura con el foco, alt obligatorio y la subida; con `elegir` (las fotos ya subidas, que trae la app), un panel para elegir una; con `conFoco={false}`, la foto entera y sin punto de foco (un logo, una lámina); con `vista`, cómo se ve donde va, en vez de la miniatura (un logo sobre la superficie en que se usa) |
| `ElegirFoto`, `FotoElegible`, `SubirFoto` | lo que `CampoFoto` le pide a la app: traer las fotos y subir una |
| `ZonaDeFoto` | elegir una foto para subir: una zona donde se suelta o que abre el selector (con el teclado también), el tipo y el peso chequeados al elegir y dichos en la zona, y la vista previa local con sus medidas, su peso y su formato |
| `ListaFija` | exactamente N ítems: en una grilla de miniaturas si llevan foto (`conMiniatura`), en filas que se pliegan si no |
| `ListaVariable` | ítems que se agregan, se quitan y se mueven, hasta un máximo; cada uno con una clave estable que da quien lo usa, y plegado: cerrado se lee su resumen y su marca de error (`conError`); las flechas y la papelera, íconos en su lugar fijo |
| `Grupo` | un grupo de campos con nombre propio adentro de un bloque: un `fieldset` con su leyenda y su ayuda |
| `Contador`, `PieDelCampo`, `estadoDelLargo` | el largo de un texto y lo que se dice de él |
| `CampoSimple`, `CampoContrasena` | una caja de texto con su etiqueta, sin tope; y una contraseña con el botón para verla |
| `BotonDeAcceso`, `ENLACE_DE_ACCESO` | el CTA a todo el ancho de una pantalla de acceso, y la clase de sus links |
| `Boton`, `BotonEnlace`, `claseDeBoton`, `Variante` | los botones: primario (igual en los tres temas), secundario, terciario y destructivo (con borde); el enlace, un link con cara de botón |
| `Aviso` | un banner de error o de confirmación, nunca un toast |
| `ENTRADA` | las clases de la caja de texto, para quien arma la suya |
| `Unidad` | campos que van uno al lado del otro porque son una sola cosa (el texto de un botón y adónde lleva); la única manera de ponerlos en fila, repartida en partes iguales. Un control suelto ocupa la columna entera |
| `Cambio`, `resolverCambio` | el `alCambiar` que acepta un valor o un armador contra el más fresco |

Las piezas de una pantalla:

| Export | Qué es |
| --- | --- |
| `PantallaDeLista`, `PantallaDeAjustes` | los moldes de una pantalla: una lista o un tablero en 72 rem, unos ajustes en apartados en 64 rem; dan el ancho y el aire, y el layout de la app no limita nada |
| `PantallaDeFicha` | el molde de una ficha: el encabezado fijo, la columna del formulario (hasta 44 rem) y el riel fijo a su derecha desde `xl` (plegado después del formulario por debajo) |
| `IndiceDeLaFicha`, `EntradaDelIndice` | «En esta ficha», en el riel: un ancla por bloque, el bloque a la vista (también el tocado, y el último abajo de todo), los que tienen un error, y abre lo plegado antes de ir; una entrada con `alTocar` es un botón que abre algo: va aparte, debajo de las anclas, con «Ver», y nunca se marca |
| `PanelDelRiel` | un panel del módulo al final del riel: una línea con su chevron, cerrado al cargar, para que el riel quepa sin scroll propio |
| `Encabezado` | el `h1` con su estado, el detalle, las acciones, los avisos y las pestañas; «← volver» arriba, un botón compacto que es un link; fijo y en azul cuando hay cambios sin guardar; con `unaLinea`, el título cortado y las acciones en la misma fila (el de una ficha) |
| `Pestanas`, `Pestana` | las pantallas de un módulo, como links; la activa sale de la ruta |
| `Filtro`, `OpcionDeFiltro` | la misma lista recortada por un valor de la URL, en píldoras; cada opción, su link y su número |
| `MenuDeFiltro` | un filtro de más plegado en un menú («Tipo: Artículos ▾»): links en un `details`, sin JavaScript |
| `BarraDeLista` | el filtro y sus menús a la izquierda y el buscador a la derecha, en una fila arriba de la lista |
| `Buscador` | la caja de búsqueda de una lista larga: un formulario GET, sin JavaScript |
| `Paginado` | más nuevas, dónde estás y más viejas, como links |
| `Lista`, `Fila`, `Desplegable` | una lista de filas con su acción, y lo que se despliega debajo sin JavaScript |
| `Tabla`, `SiONo` | lo que se lee cruzando filas y columnas, y un sí o un no dibujado y dicho |
| `Insignia`, `Tono` | una pastilla de estado en tres tonos, siempre con texto |
| `Numero`, `Cuenta` | cuántos esperan, en una pastilla que se anuncia entera |
| `EstadoVacio` | lo que se ve donde todavía no hay nada, con su acción o sus pasos |
| `IndiceDeTarjetas` | la puerta de un módulo con varias pantallas |
| `AvisosBreves`, `useAvisoBreve`, `avisarDespues`, `breveDe`, `partir`, `sinListo` | los avisos breves (toasts): el proveedor que va una vez en el layout, mostrar uno desde cualquier pantalla, dejarlo para después de recargar (vale un minuto, una sola vez), y pasar el `{ ok, detalle }` de una acción a uno, partido en qué pasó y qué sigue. Lo que salió bien se va a los cinco segundos (no con el mouse o el foco encima); un error, o uno con una acción («Reintentar»), se queda, y el de una acción se cierra si se va la pantalla que lo dio; hasta tres, el más nuevo arriba. Nunca toma el foco: F8 lo lleva al más nuevo, y el lector oye que puede |
| `useAvisoDelEditor` | el aviso de un editor, repartido: lo que salió bien y los errores de una acción, en un aviso breve (con «Reintentar» si se puede); el choque y el resumen de los errores de los campos, en el encabezado |
| `Apartado`, `Bloque`, `FilaDeAccion` | un apartado de ajustes en dos columnas, un bloque de una ficha, y una acción de «Más acciones» (el botón debajo de su consecuencia) |
| `AccionesDeLaFicha` | guardar borrador, vista previa y publicar |
| `AvisoDeLaAccion`, `AvisoDelEditor` | el aviso de la última acción de un editor, con «Recargar» si otra persona guardó |
| `VistaPreviaFrenada` | el link a la vista previa cuando el navegador frena la pestaña nueva |
| `Confirmacion` | confirmar en el lugar lo que no se deshace, con el foco en «Cancelar» |
| `DialogoDeConfirmacion`, `Pregunta`, `useConfirmar` | confirmar en un `<dialog>` propio cuando no hay un botón en cuyo lugar preguntar: `useConfirmar` devuelve `confirmar(pregunta)`, una promesa, y el `dialogo` que se dibuja |
| `BotonesDeOrden`, `AvisosDelOrden`, `useMoverEnOrden` | las flechas ↑ y ↓ de una lista que se ordena (cada una en su lugar fijo; la que no va lo deja vacío), lo que se anuncia (un error va en un aviso breve) y el paso con su foco |
| `useFrenarSalida` | frenar la salida de un editor con cambios sin guardar: los links a otra pantalla y los botones con `data-sale` preguntan con el diálogo propio, y cerrar o recargar, con el del navegador. Devuelve `{ soltar, recargar, confirmar, dialogo }`, y quien lo usa dibuja `dialogo` |
| `useLaUltima` | una acción que no cambia y corre siempre su última versión; recibe `otraVez`, que la repite, para dársela a un «Reintentar»: así repite con lo que hay en pantalla al tocarlo, y la acción no se nombra a sí misma (el compilador de React lo marca) |
| `Papelera` | el ícono de borrar del kit, para un botón de la app que borra algo que no vuelve |
| `Cifra` | una cifra con su comparación contra el período anterior |
| `Curva`, `diaLargo` | una curva diaria de una serie, dibujada en el servidor, con su tabla plegada; y el día como se lee |

Y `@sofia/kit-admin/foto`: `Foco`, `ValorDeFoto` y `posicionDelFoco`, sin
React, para dibujar una foto fuera del admin.

## Dónde va guardar

Una sola regla para todo el admin (DESIGN.md §11, «Guardar»):

| La pantalla | Su botón |
| --- | --- |
| contenido: una ficha, una página (`PantallaDeFicha`) | Guardar borrador · Vista previa · **Publicar** (`AccionesDeLaFicha`), en el `Encabezado` fijo |
| unos ajustes que son **un solo formulario** (Datos del sitio, Privacidad, Invitar) | su botón, el primario, en el `Encabezado` fijo (`form=` apunta al formulario); con cambios sin guardar el encabezado pasa a navy (`resaltado`) y `useFrenarSalida` pregunta al salir; lo que confirma en el lugar (`Confirmacion`) va en sus `avisos` |
| **formularios independientes** en `Apartado` (Mi cuenta, una cuenta, SEO, Avisos) | un botón por apartado, al pie de sus campos, secundario: ninguno es la acción de la pantalla |

Una pantalla nueva elige su fila; no inventa un cuarto lugar.

## Los tokens son de la app

El kit usa clases de Tailwind con nombre de token y **no define ninguno**. La
app que lo usa tiene que:

1. **Definir estos tokens** en su `@theme`:
   - Colores: `azul-principal`, `azul-medio`, `azul-claro`, `gris-texto`,
     `gris-fondo`, `rojo-error`, `naranja-boton`, `naranja-boton-hover`,
     `sobre-naranja` (el texto del primario: blanco en todos los temas),
     `verde-concepto` y `white` (la superficie, que cada tema del admin
     redefine).
   - Tipo: `text-admin-titulo`, `text-admin-seccion`, `text-admin-cuerpo` y
     `text-admin-meta`, y `font-display` para los títulos.
   - La utilidad `barra-discreta` (un `@utility` con `scrollbar-width: thin`
     y el pulgar en `azul-claro` sobre un riel transparente), para el scroll
     propio del riel de `PantallaDeFicha`. Si falta, queda la barra de
     siempre.
   - La utilidad `desplegable-propio` (un `@utility` que, detrás de
     `@supports (appearance: base-select)`, dibuja la lista abierta de
     `CajaDesplegable` con los tokens de arriba: el panel, el hover y la
     elegida). Si falta, la lista es la nativa.
   - La animación de lo que se despliega: una regla sobre
     `details::details-content` que anima su alto (`interpolate-size`) y su
     opacidad al abrir y al cerrar, y nada con `prefers-reduced-motion`. Toda pieza del kit que pliega es un `details`
     (`ItemPlegable`, `ListaFija`, `Desplegable`, `PanelDelRiel`,
     `RielDeLaFicha`); `MenuDeFiltro` lleva `data-menu` para que solo se
     funda, porque su lista es absoluta y no tiene alto. Si falta, se abren
     de golpe.
2. **Escanear el kit** con `@source`, porque Tailwind v4 no mira fuera de la
   app: acá, `@source "../../../packages/kit-admin/src";` en
   `src/app/(admin)/admin.css`.

Los contrastes que dicen los comentarios (4,83:1, 13,63:1…) son los de los
valores de ED, medidos en DESIGN.md §11, que describe cada pieza como patrón.
Con otros valores hay que volver a medirlos.

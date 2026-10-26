// arma los SVG sueltos de «Par où commencer» (public/ilustraciones) a partir de lo que dibujan los componentes,
// así tienen la misma cara, oreja, escote y pies que las ilustraciones de las páginas.
// Con el servidor de desarrollo prendido: node scripts/regenerar-ilustraciones.mjs [http://localhost:3010]
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const BASE = process.argv[2] ?? "http://localhost:3010";
const DESTINO = fileURLToPath(new URL("../public/ilustraciones/", import.meta.url));

const DIBUJOS = [
  { pagina: "/", viewBox: "0 0 400 520", archivo: "embarazada.svg", componente: "Embarazada.tsx" },
  { pagina: "/yoga-post-partum-geneve", viewBox: "0 0 400 520", archivo: "posparto.svg", componente: "Posparto.tsx" },
  { pagina: "/cours-de-yoga-geneve", viewBox: "0 0 560 420", archivo: "cours.svg", componente: "Guerrier.tsx" },
];

for (const { pagina, viewBox, archivo, componente } of DIBUJOS) {
  const html = await (await fetch(BASE + pagina)).text();
  const inicio = html.indexOf(`<svg viewBox="${viewBox}"`);
  if (inicio < 0) throw new Error(`no encontré el dibujo en ${pagina}`);
  const fin = html.indexOf("</svg>", inicio) + "</svg>".length;
  let svg = html.slice(inicio, fin);

  // la descripción del archivo que ya estaba se mantiene (es el mismo dibujo)
  const etiqueta = readFileSync(DESTINO + archivo, "utf8").match(/aria-label="([^"]*)"/)[1];

  const apertura = svg.slice(0, svg.indexOf(">") + 1);
  svg = svg.replace(apertura, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${etiqueta}">`);
  // las clases son para animar en la página; acá no sirven
  svg = svg.replace(/ class="[^"]*"/g, "");
  if (/style=|<script|<!--/.test(svg)) throw new Error(`quedó algo raro en ${archivo}`);

  const aviso = `<!-- Sofía Yoga · generado desde src/components/ilustraciones/${componente} (no editar a mano) -->\n`;
  writeFileSync(DESTINO + archivo, svg.replace(">", ">\n" + aviso) + "\n");
  console.log(archivo, svg.length, "caracteres");
}

import type { Metadata } from "next";
import { Pagina404 } from "@/components/Pagina404";
import { IDIOMA_BASE, IDIOMAS } from "@/lib/idiomas";
import { FUENTES } from "./fuentes";
import "./globals.css";

// la 404 de las URLs que no son ninguna página. Next la sirve sin pasar por el layout y sin saber la URL, así
// que es una sola página estática con los tres idiomas: el script elige cuál se ve según el prefijo de la URL
// (/en/…, /es/…; si no, francés) antes de pintar, y el CSS esconde los otros. Responde 404 con noindex. El
// título va sin idioma: React lo vuelve a poner al hidratar, y una página que no se indexa no necesita más
export const metadata: Metadata = {
  title: "404 | Sofia Yoga",
};

const ELEGIR_IDIOMA = `(function(){var m=location.pathname.match(/^\\/(${IDIOMAS.join("|")})(\\/|$)/);var h=document.documentElement;h.lang=h.dataset.idioma=m?m[1]:"${IDIOMA_BASE}";})()`;

// sin JS se ve el francés; con JS, el del prefijo
const MOSTRAR_UNO = `[data-404]{display:none}html:not([data-idioma]) [data-404="${IDIOMA_BASE}"],${IDIOMAS.map((idioma) => `html[data-idioma="${idioma}"] [data-404="${idioma}"]`).join(",")}{display:flex}`;

export default function GlobalNotFound() {
  return (
    <html lang={IDIOMA_BASE} className={FUENTES} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ELEGIR_IDIOMA }} />
        <style>{MOSTRAR_UNO}</style>
      </head>
      <body>
        {IDIOMAS.map((idioma) => (
          <Pagina404 key={idioma} idioma={idioma} />
        ))}
      </body>
    </html>
  );
}

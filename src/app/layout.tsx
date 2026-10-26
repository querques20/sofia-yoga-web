import type { Metadata } from "next";
import localFont from "next/font/local";
import { ContactFlottant } from "@/components/ContactFlottant";
import { Entrada } from "@/components/Entrada";
import { LenisProvider } from "@/components/LenisProvider";
import { Nav } from "@/components/Nav";
import { Pied } from "@/components/Pied";
import { SITIO_URL } from "@/lib/sitio";
import "./globals.css";

// D-DIN y D-DIN Condensed son las del dossier v2 (licencia SIL OFL, ver fonts/OFL-D-DIN.txt)
const ddin = localFont({
  src: [
    { path: "./fonts/D-DIN.woff2", weight: "400", style: "normal" },
    { path: "./fonts/D-DIN-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ddin",
  display: "swap",
});

const ddinCondensed = localFont({
  src: [
    { path: "./fonts/D-DINCondensed.woff2", weight: "400", style: "normal" },
    { path: "./fonts/D-DINCondensed-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ddin-cond",
  display: "swap",
});

// Caveat va en el repo y no por Google Fonts: así el build no depende de bajar nada (licencia en fonts/OFL-Caveat.txt).
// Es el recorte "latin" de Google, que ya trae lo que usa el francés (acentos, œ, comillas, rayas)
const caveat = localFont({
  src: [{ path: "./fonts/Caveat-Bold-latin.woff2", weight: "700", style: "normal" }],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  // la base de los canonicals de cada página (el dominio todavía no está decidido, ver lib/sitio.ts)
  metadataBase: new URL(SITIO_URL),
  // cada página pone su título y se le suma la marca al final
  title: { default: "Yoga prénatal et cours de yoga à Genève | Sofia Yoga", template: "%s | Sofia Yoga" },
  description:
    "Yoga prénatal, post-partum et cours de yoga dynamique à Genève avec Sofia Costa. En groupe, en privé ou au parc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // el script de abajo le suma la clase "js" antes de hidratar, por eso se avisa que la diferencia es a propósito
    <html lang="fr" className={`${ddin.variable} ${ddinCondensed.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* marca que hay JS antes de pintar, así lo que entra animado no aparece y desaparece. Y si la entrada
            ya se vio en esta visita, lo marca también, así el telón ni se pinta */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('sofia-entrada'))document.documentElement.classList.add('entrada-vista')}catch(e){}",
          }}
        />
      </head>
      <body>
        {/* para quien navega con el teclado: saltar el menú e ir directo al contenido */}
        <a
          href="#contenido"
          data-fuera-del-menu
          className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-2xl bg-verde px-5 py-3 font-bold text-pagina transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <LenisProvider>
          {/* la entrada, el menú y el pie son de todas las páginas: el layout no se vuelve a montar al navegar,
              así que la entrada solo se ve al llegar al sitio */}
          <Entrada />
          <Nav />
          <div id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <Pied />
          <ContactFlottant />
        </LenisProvider>
      </body>
    </html>
  );
}

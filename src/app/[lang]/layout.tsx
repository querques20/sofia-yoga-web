import type { Metadata } from "next";
import { lang } from "next/root-params";
import { ContactFlottant } from "@/components/ContactFlottant";
import { Entrada } from "@/components/Entrada";
import { LenisProvider } from "@/components/LenisProvider";
import { Nav } from "@/components/Nav";
import { Pied } from "@/components/Pied";
import { IDIOMAS } from "@/lib/idiomas";
import { SITIO_URL } from "@/lib/sitio";
import { FUENTES } from "../fuentes";
import "../globals.css";

export const metadata: Metadata = {
  // la base de los canonicals de cada página (el dominio todavía no está decidido, ver lib/sitio.ts)
  metadataBase: new URL(SITIO_URL),
  // cada página pone su título y se le suma la marca al final
  title: { default: "Yoga prénatal et cours de yoga à Genève | Sofia Yoga", template: "%s | Sofia Yoga" },
  description:
    "Yoga prénatal, post-partum et cours de yoga dynamique à Genève avec Sofia Costa. En groupe, en privé ou au parc.",
};

// cada idioma sale estático en el build (con cacheComponents, el segmento raíz necesita al menos un valor)
export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ lang: idioma }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const idioma = await lang();
  return (
    // el script de abajo le suma la clase "js" antes de hidratar, por eso se avisa que la diferencia es a propósito
    <html lang={idioma} className={FUENTES} suppressHydrationWarning>
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

import type { Metadata } from "next";
import { lang } from "next/root-params";
import { Pagina404 } from "@/components/Pagina404";
import { TEXTOS_404 } from "@/contenido/pagina-404";
import { type Idioma } from "@/lib/idiomas";

// cuando una página llama a notFound() (por ejemplo, un taller que ya no existe): se ve con el menú y el pie,
// en el idioma de la URL. Las URLs que no son ninguna página van a app/global-not-found.tsx
export async function generateMetadata(): Promise<Metadata> {
  return { title: TEXTOS_404[(await lang()) as Idioma].titulo };
}

export default async function PaginaNoEncontrada() {
  return <Pagina404 idioma={(await lang()) as Idioma} />;
}

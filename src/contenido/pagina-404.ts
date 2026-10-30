import type { Idioma } from "@/lib/idiomas";

// los textos de la página 404 en cada idioma. EN y ES son un primer borrador: pasan por una persona nativa
// antes de publicarse, como el resto de la web. Las salidas son las páginas más útiles cuando un link está
// roto o es viejo (las rutas son las francesas; cada idioma las traduce con rutaEn)
export const TEXTOS_404 = {
  fr: {
    titulo: "Page introuvable",
    exclamacion: "Oups",
    h1: "Cette page n’existe pas",
    texto: "Le lien est peut-être ancien ou mal écrit. Tu peux reprendre par ici :",
    salidas: [
      { ruta: "/", texto: "Accueil" },
      { ruta: "/yoga-prenatal-geneve", texto: "Yoga prénatal" },
      { ruta: "/cours-de-yoga-geneve", texto: "Cours de yoga" },
      { ruta: "/contact", texto: "Contact" },
    ],
  },
  en: {
    titulo: "Page not found",
    exclamacion: "Oops",
    h1: "This page doesn’t exist",
    texto: "The link may be old or mistyped. You can pick up from here:",
    salidas: [
      { ruta: "/", texto: "Home" },
      { ruta: "/yoga-prenatal-geneve", texto: "Prenatal yoga" },
      { ruta: "/cours-de-yoga-geneve", texto: "Yoga classes" },
      { ruta: "/contact", texto: "Contact" },
    ],
  },
  es: {
    titulo: "Página no encontrada",
    exclamacion: "Uy",
    h1: "Esta página no existe",
    texto: "Puede que el enlace sea antiguo o esté mal escrito. Puedes seguir por aquí:",
    salidas: [
      { ruta: "/", texto: "Inicio" },
      { ruta: "/yoga-prenatal-geneve", texto: "Yoga prenatal" },
      { ruta: "/cours-de-yoga-geneve", texto: "Clases de yoga" },
      { ruta: "/contact", texto: "Contacto" },
    ],
  },
} satisfies Record<Idioma, unknown>;

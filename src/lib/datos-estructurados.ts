import { isValidElement, type ReactNode } from "react";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { INTERFAZ } from "@/contenido/interfaz";
import type { Pregunta } from "@/contenido/preguntas";
import { CONTACTO } from "./contacto";
import { type Idioma, rutaEn } from "./idiomas";
import { SITIO_URL, urlDe } from "./sitio";

// los datos estructurados (JSON-LD) de cada página, según la tabla del sitemap v3 (frente on-page). Solo lo
// confirmado del contexto maestro: sin dirección (no tiene estudio), sin precios (todavía no están) y sin
// horarios. Se ven con el Rich Results Test de Google o el validador de schema.org. Cada página los da en su
// idioma (textos y URLs); los @id son los mismos en todos, porque Sofía y su marca son una sola

const ID_SOFIA = `${SITIO_URL}/#sofia`;
const ID_NEGOCIO = `${SITIO_URL}/#sofia-yoga`;
const GINEBRA = { "@type": "City", name: "Genève" };

// lo que cambia con el idioma. Las clases se dan en francés en cualquier versión de la web
const TEXTOS = {
  fr: {
    profesion: "Professeure de yoga",
    negocio: "Yoga prénatal, post-partum et cours de yoga dynamique à Genève, avec Sofia Costa.",
    formaciones: [
      "Formation de professeure de yoga Ashtanga Vinyasa, en Inde",
      "Formation en yin yoga et thérapie des fascias, en Suisse",
      "Formation en yoga pré et postnatal",
    ],
  },
  en: {
    profesion: "Yoga teacher",
    negocio: "Prenatal yoga, postnatal yoga and dynamic yoga classes in Geneva, with Sofia Costa.",
    formaciones: [
      "Ashtanga Vinyasa yoga teacher training, in India",
      "Training in yin yoga and fascia therapy, in Switzerland",
      "Training in prenatal and postnatal yoga",
    ],
  },
  es: {
    profesion: "Profesora de yoga",
    negocio: "Yoga prenatal, posparto y clases de yoga dinámico en Ginebra, con Sofia Costa.",
    formaciones: [
      "Formación de profesora de yoga Ashtanga Vinyasa, en la India",
      "Formación en yin yoga y terapia de fascias, en Suiza",
      "Formación en yoga prenatal y posnatal",
    ],
  },
} satisfies Record<Idioma, unknown>;
// el número de su tarjeta, en formato internacional
const TELEFONO = "+41 76 445 85 63";

/** Sofia, con sus formaciones (el título y dónde, sin horas) */
export function persona(idioma: Idioma) {
  return {
    "@type": "Person",
    "@id": ID_SOFIA,
    name: "Sofia Costa",
    jobTitle: TEXTOS[idioma].profesion,
    url: urlDe(rutaEn(idioma, "/a-propos")),
    email: CONTACTO.email,
    telephone: TELEFONO,
    sameAs: [CONTACTO.instagram],
    // da las clases en francés; su lengua es el español
    knowsLanguage: ["fr", "es"],
    address: { "@type": "PostalAddress", addressLocality: "Genève", addressCountry: "CH" },
    memberOf: { "@type": "Organization", name: "Yoga Alliance", url: "https://www.yogaalliance.org" },
    hasCredential: TEXTOS[idioma].formaciones.map((name) => ({ "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name })),
  };
}

/** la marca como negocio de área de servicio: Ginebra, sin dirección pública */
export function negocio(idioma: Idioma) {
  return {
    "@type": "LocalBusiness",
    "@id": ID_NEGOCIO,
    name: "Sofia Yoga",
    description: TEXTOS[idioma].negocio,
    url: urlDe(rutaEn(idioma, "/")),
    email: CONTACTO.email,
    telephone: TELEFONO,
    sameAs: [CONTACTO.instagram],
    areaServed: GINEBRA,
    founder: { "@id": ID_SOFIA },
  };
}

/** una página de servicio (prénatal, post-partum, cours, cours privés) */
export function servicio(
  idioma: Idioma,
  { nombre, tipo, ruta, descripcion }: { nombre: string; tipo: string; ruta: string; descripcion: string },
) {
  return {
    "@type": "Service",
    name: nombre,
    serviceType: tipo,
    description: descripcion,
    url: urlDe(rutaEn(idioma, ruta)),
    provider: { "@id": ID_SOFIA },
    areaServed: GINEBRA,
    availableLanguage: "fr",
  };
}

/** las preguntas frecuentes de una página. Cada una se marca en un solo lugar (lo pide Google): en la página
 *  de su clase, no en /faq, que las junta */
export function preguntasFrecuentes(idioma: Idioma, preguntas: Pregunta[]) {
  return {
    "@type": "FAQPage",
    inLanguage: idioma,
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: aTexto(p.respuesta, idioma) },
    })),
  };
}

export function paginaDeContacto(idioma: Idioma) {
  return { "@type": "ContactPage", inLanguage: idioma, url: urlDe(rutaEn(idioma, "/contact")), about: { "@id": ID_NEGOCIO } };
}

export function paginaSobreSofia(idioma: Idioma) {
  return { "@type": "AboutPage", inLanguage: idioma, url: urlDe(rutaEn(idioma, "/a-propos")), mainEntity: { "@id": ID_SOFIA } };
}

/** la respuesta en texto plano: los links quedan como su texto y la pastilla dice «à confirmer» en su idioma */
function aTexto(nodo: ReactNode, idioma: Idioma): string {
  if (nodo == null || typeof nodo === "boolean") return "";
  if (typeof nodo === "string" || typeof nodo === "number") return String(nodo).replace(/\s+/g, " ");
  if (Array.isArray(nodo)) return nodo.map((n) => aTexto(n, idioma)).join("").replace(/\s+/g, " ").trim();
  if (isValidElement(nodo)) {
    if (nodo.type === AConfirmer) return INTERFAZ[idioma].aConfirmer;
    return aTexto((nodo.props as { children?: ReactNode }).children, idioma);
  }
  return "";
}

import { isValidElement, type ReactNode } from "react";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import type { Pregunta } from "@/contenido/preguntas";
import { CONTACTO } from "./contacto";
import { SITIO_URL, urlDe } from "./sitio";

// los datos estructurados (JSON-LD) de cada página, según la tabla del sitemap v3 (frente on-page). Solo lo
// confirmado del contexto maestro: sin dirección (no tiene estudio), sin precios (todavía no están) y sin
// horarios. Se ven con el Rich Results Test de Google o el validador de schema.org

const ID_SOFIA = `${SITIO_URL}/#sofia`;
const ID_NEGOCIO = `${SITIO_URL}/#sofia-yoga`;
const GINEBRA = { "@type": "City", name: "Genève" };
// el número de su tarjeta, en formato internacional
const TELEFONO = "+41 76 445 85 63";

/** Sofia, con sus formaciones (el título y dónde, sin horas) */
export function persona() {
  return {
    "@type": "Person",
    "@id": ID_SOFIA,
    name: "Sofia Costa",
    jobTitle: "Professeure de yoga",
    url: urlDe("/a-propos"),
    email: CONTACTO.email,
    telephone: TELEFONO,
    sameAs: [CONTACTO.instagram],
    // da las clases en francés; su lengua es el español
    knowsLanguage: ["fr", "es"],
    address: { "@type": "PostalAddress", addressLocality: "Genève", addressCountry: "CH" },
    memberOf: { "@type": "Organization", name: "Yoga Alliance", url: "https://www.yogaalliance.org" },
    hasCredential: [
      "Formation de professeure de yoga Ashtanga Vinyasa, en Inde",
      "Formation en yin yoga et thérapie des fascias, en Suisse",
      "Formation en yoga pré et postnatal",
    ].map((name) => ({ "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name })),
  };
}

/** la marca como negocio de área de servicio: Ginebra, sin dirección pública */
export function negocio() {
  return {
    "@type": "LocalBusiness",
    "@id": ID_NEGOCIO,
    name: "Sofia Yoga",
    description: "Yoga prénatal, post-partum et cours de yoga dynamique à Genève, avec Sofia Costa.",
    url: SITIO_URL,
    email: CONTACTO.email,
    telephone: TELEFONO,
    sameAs: [CONTACTO.instagram],
    areaServed: GINEBRA,
    founder: { "@id": ID_SOFIA },
  };
}

/** una página de servicio (prénatal, post-partum, cours, cours privés) */
export function servicio({ nombre, tipo, ruta, descripcion }: { nombre: string; tipo: string; ruta: string; descripcion: string }) {
  return {
    "@type": "Service",
    name: nombre,
    serviceType: tipo,
    description: descripcion,
    url: urlDe(ruta),
    provider: { "@id": ID_SOFIA },
    areaServed: GINEBRA,
    availableLanguage: "fr",
  };
}

/** las preguntas frecuentes de una página. Cada una se marca en un solo lugar (lo pide Google): en la página
 *  de su clase, no en /faq, que las junta */
export function preguntasFrecuentes(preguntas: Pregunta[]) {
  return {
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: aTexto(p.respuesta) },
    })),
  };
}

export function paginaDeContacto() {
  return { "@type": "ContactPage", url: urlDe("/contact"), about: { "@id": ID_NEGOCIO } };
}

export function paginaSobreSofia() {
  return { "@type": "AboutPage", url: urlDe("/a-propos"), mainEntity: { "@id": ID_SOFIA } };
}

/** la respuesta en texto plano: los links quedan como su texto y la pastilla dice «à confirmer» */
function aTexto(nodo: ReactNode): string {
  if (nodo == null || typeof nodo === "boolean") return "";
  if (typeof nodo === "string" || typeof nodo === "number") return String(nodo).replace(/\s+/g, " ");
  if (Array.isArray(nodo)) return nodo.map(aTexto).join("").replace(/\s+/g, " ").trim();
  if (isValidElement(nodo)) {
    if (nodo.type === AConfirmer) return "à confirmer";
    return aTexto((nodo.props as { children?: ReactNode }).children);
  }
  return "";
}

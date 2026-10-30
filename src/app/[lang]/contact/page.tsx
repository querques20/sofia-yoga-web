import type { Metadata } from "next";
import { Bienvenue } from "@/components/Bienvenue";
import { Canaux, type TextosCanaux } from "@/components/contact/Canaux";
import { Composeur, type TextosComposeur } from "@/components/contact/Composeur";
import { Fleur } from "@/components/Fleur";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { negocio, paginaDeContacto } from "@/lib/datos-estructurados";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa)
const fr = {
  meta: {
    title: "Contact",
    description:
      "Écris à Sofia Costa, professeure de yoga à Genève, par WhatsApp, par e-mail ou sur Instagram, pour une question sur les cours ou sur le programme.",
  },
  fil: "Contact",
  titulo: (
    <>
      Écris-<Mano>moi</Mano>
    </>
  ),
  intro: "Pour une question sur les cours, les ateliers ou le programme en ligne, écris-moi par WhatsApp, par e-mail ou sur Instagram.",
  // lo que conviene contar en el primer mensaje (no son requisitos: es para responder más rápido)
  ayudasTitulo: "Ce qui m’aide à te répondre",
  ayudas: [
    "Si tu es enceinte : à combien de semaines tu es.",
    "Si tu as accouché : quand, et si ta rééducation du périnée est faite.",
    "Le cours ou l’atelier qui t’intéresse, et tes disponibilités.",
  ],
  composeur: {
    pregunta: "De quoi veux-tu parler\u00a0?",
    temas: [
      { tema: "prenatal", texto: "Yoga prénatal" },
      { tema: "postPartum", texto: "Post-partum" },
      { tema: "cours", texto: "Cours de yoga" },
      { tema: "prive", texto: "Cours privé" },
      { tema: "atelier", texto: "Atelier" },
      { tema: "programme", texto: "Le programme en ligne" },
      { tema: "autre", texto: "Autre chose" },
    ],
    mensaje: "Ton message",
    continuar: "Continuer sur WhatsApp",
    correo: "Écrire un e-mail",
    nota: "Le message s’ouvre dans WhatsApp ou dans ton e-mail\u00a0: tu peux encore le modifier avant de l’envoyer.",
  } satisfies TextosComposeur,
  canaux: { titulo: "Mes coordonnées", mail: "E-mail" } satisfies TextosCanaux,
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Contact",
      description:
        "Write to Sofia Costa, yoga teacher in Geneva, on WhatsApp, by email or on Instagram with any question about the classes or the programme.",
    },
    fil: "Contact",
    titulo: (
      <>
        Write to <Mano>me</Mano>
      </>
    ),
    intro: "Got a question about the classes, the workshops or the online programme? Write to me on WhatsApp, by email or on Instagram.",
    ayudasTitulo: "What helps me reply",
    ayudas: [
      "If you’re pregnant: how many weeks along you are.",
      "If you’ve given birth: when, and whether you’ve done your pelvic floor rehab.",
      "The class or workshop you’re interested in, and when you’re free.",
    ],
    composeur: {
      pregunta: "What would you like to talk about?",
      temas: [
        { tema: "prenatal", texto: "Prenatal yoga" },
        { tema: "postPartum", texto: "Postnatal" },
        { tema: "cours", texto: "Yoga classes" },
        { tema: "prive", texto: "Private class" },
        { tema: "atelier", texto: "Workshop" },
        { tema: "programme", texto: "The online programme" },
        { tema: "autre", texto: "Something else" },
      ],
      mensaje: "Your message",
      continuar: "Continue on WhatsApp",
      correo: "Send an email",
      nota: "The message opens in WhatsApp or in your email: you can still change it before sending.",
    },
    canaux: { titulo: "My details", mail: "Email" },
  },
  es: {
    meta: {
      title: "Contacto",
      description:
        "Escríbele a Sofia Costa, profesora de yoga en Ginebra, por WhatsApp, por e-mail o por Instagram si tienes una pregunta sobre las clases o el programa.",
    },
    fil: "Contacto",
    titulo: (
      <>
        Escríbe<Mano>me</Mano>
      </>
    ),
    intro: "Si tienes una pregunta sobre las clases, los talleres o el programa online, escríbeme por WhatsApp, por e-mail o por Instagram.",
    ayudasTitulo: "Lo que me ayuda a responderte",
    ayudas: [
      "Si estás embarazada: de cuántas semanas estás.",
      "Si ya diste a luz: cuándo, y si hiciste la reeducación del suelo pélvico.",
      "La clase o el taller que te interesa, y tu disponibilidad.",
    ],
    composeur: {
      pregunta: "¿De qué quieres hablar?",
      temas: [
        { tema: "prenatal", texto: "Yoga prenatal" },
        { tema: "postPartum", texto: "Posparto" },
        { tema: "cours", texto: "Clases de yoga" },
        { tema: "prive", texto: "Clase privada" },
        { tema: "atelier", texto: "Taller" },
        { tema: "programme", texto: "El programa online" },
        { tema: "autre", texto: "Otra cosa" },
      ],
      mensaje: "Tu mensaje",
      continuar: "Seguir en WhatsApp",
      correo: "Escribir un e-mail",
      nota: "El mensaje se abre en WhatsApp o en tu e-mail: todavía puedes cambiarlo antes de enviarlo.",
    },
    canaux: { titulo: "Mis datos", mail: "E-mail" },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/contact", TEXTOS[idioma].meta);
}

export default async function ContactPage() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados datos={[negocio(idioma), paginaDeContacto(idioma)]} />
      <EnteteDePage
        fil={t.fil}
        titulo={t.titulo}
        intro={<p>{t.intro}</p>}
        visual={<Composeur t={t.composeur} />}
        paralaje={false}
      />
      {/* lo que le sirve a Sofía para contestar de una: así no hace falta ir y volver con preguntas */}
      <section className="pb-[clamp(4rem,10vw,7rem)]">
        <div className="contenedor grid gap-8 lg:grid-cols-12">
          <h2 className="titre text-[clamp(2.2rem,5vw,3.6rem)] lg:col-span-5">{t.ayudasTitulo}</h2>
          <ul className="space-y-4 text-[1.12rem] leading-relaxed lg:col-span-7">
            {t.ayudas.map((ayuda) => (
              <li key={ayuda} className="flex gap-4 border-t border-verde/20 pt-4">
                <Fleur className="mt-1 h-5 w-5 shrink-0 text-violeta" trazo={10} />
                <span>{ayuda}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Canaux t={t.canaux} />
      <section className="pb-[clamp(4rem,10vw,7rem)]">
        <Bienvenue className="contenedor" />
      </section>
    </main>
  );
}

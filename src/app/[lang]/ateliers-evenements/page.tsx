import type { Metadata } from "next";
import { Billet, type TextosBillet } from "@/components/ateliers/Billet";
import { CommentCaMarche, type TextosCommentCaMarche } from "@/components/ateliers/CommentCaMarche";
import { Contact } from "@/components/Contact";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { Reperes } from "@/components/pagina/Reperes";
import { MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa)
const fr = {
  meta: {
    title: "Ateliers et événements de yoga à Genève",
    description:
      "Les ateliers et événements de yoga de Sofia Costa à Genève. Aucun n’est annoncé pour le moment : écris-moi pour être prévenu.e du prochain.",
  },
  fil: "Ateliers",
  titulo: (
    <>
      Ateliers <Mano>&amp;</Mano> événements
    </>
  ),
  intro: (
    <>
      <p>Ateliers et cours de yoga pour toutes et tous.</p>
      <p>Aucun atelier n’est annoncé pour le moment. Écris-moi pour être prévenu.e du prochain.</p>
    </>
  ),
  billet: {
    titulo: "Prochain atelier",
    // del próximo atelier no sabemos nada todavía: el ticket lo dice sin inventar
    filas: [
      ["Date", <AConfirmer key="fecha" />],
      [
        "Lieu",
        <>
          Genève, <AConfirmer />
        </>,
      ],
      ["Prix", <AConfirmer key="precio" />],
      ["Inscription", "Par message"],
    ],
    boton: "Être prévenu.e",
  } satisfies TextosBillet,
  // qué suele ser un atelier (práctica común en estudios y escuelas, no datos de los de ella, que faltan)
  atelier: {
    titulo: <>Un atelier, c’est quoi&nbsp;?</>,
    intro: <p>En général, et en attendant les thèmes des prochains.</p>,
    reperes: [
      { clave: "Un thème", texto: "Un atelier tourne autour d’un sujet précis : le souffle, une famille de postures, une partie du corps…" },
      { clave: "Plus de temps", texto: "Il dure souvent plus longtemps qu’un cours : de quelques heures à une journée, ou une courte série de séances." },
      { clave: "Comprendre", texto: "On pratique, et on prend aussi le temps d’expliquer le pourquoi des choses." },
      {
        clave: "Les prochains",
        texto: (
          <>
            Les thèmes et les dates sont <AConfirmer />
          </>
        ),
      },
    ],
  },
  // cómo funciona en la etapa 1: la web avisa y la inscripción es por mensaje, sin reservas en línea
  comment: {
    titulo: "Comment ça marche",
    pasos: [
      { titulo: "L’atelier est annoncé ici", texto: "Avec sa date, son lieu et son prix." },
      { titulo: "Tu m’écris pour t’inscrire", texto: "Par WhatsApp, par e-mail ou sur Instagram." },
      { titulo: "On se retrouve", texto: "Et on pratique ensemble." },
    ],
  } satisfies TextosCommentCaMarche,
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Yoga workshops and events in Geneva",
      description:
        "Sofia Costa’s yoga workshops and events in Geneva. None is announced for now: write to me and I’ll let you know about the next one.",
    },
    fil: "Workshops",
    titulo: (
      <>
        Workshops <Mano>&amp;</Mano> events
      </>
    ),
    intro: (
      <>
        <p>Yoga workshops and classes for everyone.</p>
        <p>No workshop is announced for now. Write to me and I’ll let you know about the next one.</p>
      </>
    ),
    billet: {
      titulo: "Next workshop",
      filas: [
        ["Date", <AConfirmer key="fecha" />],
        [
          "Venue",
          <>
            Geneva, <AConfirmer />
          </>,
        ],
        ["Price", <AConfirmer key="precio" />],
        ["Booking", "By message"],
      ],
      boton: "Keep me posted",
    },
    atelier: {
      titulo: <>What’s a workshop?</>,
      intro: <p>In general terms, until the themes of the next ones are known.</p>,
      reperes: [
        { clave: "A theme", texto: "A workshop revolves around one specific subject: the breath, a family of postures, a part of the body…" },
        { clave: "More time", texto: "It often lasts longer than a class: from a few hours to a whole day, or a short series of sessions." },
        { clave: "Understanding", texto: "We practise, and we also take the time to explain the why behind things." },
        {
          clave: "The next ones",
          texto: (
            <>
              The themes and dates are <AConfirmer />
            </>
          ),
        },
      ],
    },
    comment: {
      titulo: "How it works",
      pasos: [
        { titulo: "The workshop is announced here", texto: "With its date, venue and price." },
        { titulo: "You write to me to sign up", texto: "On WhatsApp, by email or on Instagram." },
        { titulo: "We meet", texto: "And we practise together." },
      ],
    },
  },
  es: {
    meta: {
      title: "Talleres y eventos de yoga en Ginebra",
      description:
        "Los talleres y eventos de yoga de Sofia Costa en Ginebra. Por ahora no hay ninguno anunciado: escríbeme y te aviso del próximo.",
    },
    fil: "Talleres",
    titulo: (
      <>
        Talleres <Mano>&amp;</Mano> eventos
      </>
    ),
    intro: (
      <>
        <p>Talleres y clases de yoga para todo el mundo.</p>
        <p>Por ahora no hay ningún taller anunciado. Escríbeme y te aviso del próximo.</p>
      </>
    ),
    billet: {
      titulo: "Próximo taller",
      filas: [
        ["Fecha", <AConfirmer key="fecha" />],
        [
          "Lugar",
          <>
            Ginebra, <AConfirmer />
          </>,
        ],
        ["Precio", <AConfirmer key="precio" />],
        ["Inscripción", "Por mensaje"],
      ],
      boton: "Avísame",
    },
    atelier: {
      titulo: <>¿Qué es un taller?</>,
      intro: <p>En general, y mientras llegan los temas de los próximos.</p>,
      reperes: [
        { clave: "Un tema", texto: "Un taller gira en torno a un tema concreto: la respiración, una familia de posturas, una parte del cuerpo…" },
        { clave: "Más tiempo", texto: "Suele durar más que una clase: de unas pocas horas a una jornada entera, o una serie corta de sesiones." },
        { clave: "Comprender", texto: "Practicamos y también nos tomamos el tiempo de explicar el porqué de las cosas." },
        {
          clave: "Los próximos",
          texto: (
            <>
              Los temas y las fechas están <AConfirmer />
            </>
          ),
        },
      ],
    },
    comment: {
      titulo: "Cómo funciona",
      pasos: [
        { titulo: "El taller se anuncia aquí", texto: "Con su fecha, su lugar y su precio." },
        { titulo: "Me escribes para inscribirte", texto: "Por WhatsApp, por e-mail o por Instagram." },
        { titulo: "Nos vemos", texto: "Y practicamos en grupo." },
      ],
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/ateliers-evenements", TEXTOS[idioma].meta);
}

// todavía no hay ateliers anunciados: la página lo dice y ofrece avisar del próximo
export default async function Ateliers() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <EnteteDePage fil={t.fil} titulo={t.titulo} intro={t.intro} visual={<Billet t={t.billet} />} />
      <Reperes id="atelier" titulo={t.atelier.titulo} intro={t.atelier.intro} reperes={t.atelier.reperes} />
      <CommentCaMarche t={t.comment} />
      <PourContinuer destinos={["cours", "prenatal", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].atelier} />
    </main>
  );
}

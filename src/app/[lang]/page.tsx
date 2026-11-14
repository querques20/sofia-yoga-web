import type { Metadata } from "next";
import { Bande, type TextosBande } from "@/components/Bande";
import { Hero, type TextosHero } from "@/components/Hero";
import { Closing, type TextosClosing } from "@/components/home/Closing";
import { Invitation, type TextosInvitation } from "@/components/home/Invitation";
import { Programme, type TextosProgramme } from "@/components/Programme";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { persona, negocio } from "@/lib/datos-estructurados";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";
import { nombreDeClase } from "@/lib/navegacion";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa). El título de la pestaña es el del
// layout; aquí solo va la descripción
const fr = {
  meta: {
    description: "Yoga prénatal, post-partum et cours de yoga dynamique à Genève, avec Sofia Costa. En groupe, en privé ou au parc.",
  },
  hero: {
    lineas: ["Yoga prénatal,", "post-partum et", "cours de yoga"],
    lugar: "à Genève",
    sub: "Une pratique dynamique, différente et joyeuse, pour bouger en conscience. Avec Sofia Costa.",
    whatsapp: "Écrire sur WhatsApp",
    puertasAria: "Ce que je propose",
    puertas: {
      prenatal: { nombre: "Yoga prénatal", alt: "Une femme enceinte de profil, une main sous le ventre" },
      postPartum: { nombre: "Post-partum", alt: "Une maman qui tient son nouveau-né dans les bras" },
      groupe: { nombre: nombreDeClase("groupe", "fr"), alt: "Des élèves qui s’étirent sur leur tapis, en cours" },
      prives: { nombre: nombreDeClase("prives", "fr"), alt: "Sofia en équilibre sur les mains, sur un parquet" },
      parc: { nombre: nombreDeClase("parc", "fr"), alt: "Sofia dans la posture du danseur, sur un chemin de campagne" },
      ateliers: { nombre: "Ateliers", alt: "Un groupe assis en cercle dans une salle lumineuse" },
    },
  } satisfies TextosHero,
  // her own words (her bio of 18/7, as on the About page), cut to the Home's size: nothing here is new
  invitation: {
    lineas: ["Nul besoin d’être", "fort.e ou souple,"],
    mano: "viens comme tu es",
    presentacion: "Je m’appelle Sofia Costa et je suis professeure de yoga à Genève.",
    ensenanza:
      "Je propose un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial, dans un cadre bienveillant et inclusif, car je crois fermement que le yoga est pour touxtes !",
    historia: "Mon histoire",
  } satisfies TextosInvitation,
  // when she replies is not confirmed, so it is not said
  cierre: {
    texto: "Pour une question sur les cours ou sur le programme, écris-moi par WhatsApp, par e-mail ou sur Instagram.",
  } satisfies TextosClosing,
  programme: {
    intro: [
      "Ce programme est pensé pour toi si tu es enceinte et que tu souhaites continuer à bouger consciemment pendant ta grossesse.",
      "Il sera en ligne, organisé par trimestre, et il arrive bientôt.",
    ],
    trimestre: "trimestre",
    trimestres: [
      { n: "1", sufijo: "er", mois: "Mois 1 à 3" },
      { n: "2", sufijo: "e", mois: "Mois 4 à 6" },
      { n: "3", sufijo: "e", mois: "Mois 7 à 9" },
    ],
    trimestresAria: "Les trois trimestres",
    yang: "Une partie yang, dynamique",
    yin: "Une partie yin, douce",
    juntas: "Les deux, à chaque trimestre.",
    formato: "Vidéos, PDF et textes, à suivre chez toi.",
    accord: "Avant de commencer : l’accord de ta sage-femme ou de ta gynécologue.",
  } satisfies TextosProgramme,
  // solo lo que da hoy (confirmado el 30/9 y en su tarjeta)
  bande: {
    palabras: ["Yoga prénatal", "Post-partum", "Vinyasa", "Yoga flow", "En groupe", "En privé", "Au parc"],
  } satisfies TextosBande,
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      description: "Prenatal yoga, postnatal yoga and dynamic yoga classes in Geneva, with Sofia Costa. In a group, one to one or in the park.",
    },
    hero: {
      lineas: ["Prenatal yoga,", "postpartum and", "yoga classes"],
      lugar: "in Geneva",
      sub: "A dynamic, different and joyful practice, to move with awareness. With Sofia Costa.",
      whatsapp: "Write on WhatsApp",
      puertasAria: "What I offer",
      puertas: {
        prenatal: { nombre: "Prenatal yoga", alt: "A pregnant woman in profile, one hand under her belly" },
        postPartum: { nombre: "Postpartum", alt: "A mother holding her newborn in her arms" },
        groupe: { nombre: nombreDeClase("groupe", "en"), alt: "Students stretching on their mats during a class" },
        prives: { nombre: nombreDeClase("prives", "en"), alt: "Sofia balancing on her hands on a wooden floor" },
        parc: { nombre: nombreDeClase("parc", "en"), alt: "Sofia in dancer’s pose on a country path" },
        ateliers: { nombre: "Workshops", alt: "A group sitting in a circle in a bright room" },
      },
    },
    invitation: {
      lineas: ["No need to be", "strong or flexible,"],
      mano: "come as you are",
      presentacion: "My name is Sofia Costa and I’m a yoga teacher in Geneva.",
      ensenanza:
        "I teach a dynamic approach that combines pranayama, functional movement and the myofascial system, in a kind and inclusive setting, because I firmly believe yoga is for everyone!",
      historia: "My story",
    },
    cierre: {
      texto: "Got a question about the classes or the programme? Write to me on WhatsApp, by email or on Instagram.",
    },
    programme: {
      intro: [
        "This programme is designed for you if you’re pregnant and want to keep moving mindfully throughout your pregnancy.",
        "It will be online, organised by trimester, and it’s coming soon.",
      ],
      trimestre: "trimester",
      trimestres: [
        { n: "1", sufijo: "st", mois: "Months 1 to 3" },
        { n: "2", sufijo: "nd", mois: "Months 4 to 6" },
        { n: "3", sufijo: "rd", mois: "Months 7 to 9" },
      ],
      trimestresAria: "The three trimesters",
      yang: "A dynamic, yang part",
      yin: "A gentle, yin part",
      juntas: "Both, in every trimester.",
      formato: "Videos, PDFs and texts, to follow at home.",
      accord: "Before you start: the go-ahead of your midwife or gynaecologist.",
    },
    bande: {
      palabras: ["Prenatal yoga", "Postnatal", "Vinyasa", "Yoga flow", "In a group", "One to one", "In the park"],
    },
  },
  es: {
    meta: {
      description: "Yoga prenatal, posparto y clases de yoga dinámico en Ginebra, con Sofia Costa. En grupo, en privado o en el parque.",
    },
    hero: {
      lineas: ["Yoga prenatal,", "posparto y", "clases de yoga"],
      lugar: "en Ginebra",
      sub: "Una práctica dinámica, distinta y alegre, para moverte con conciencia. Con Sofia Costa.",
      whatsapp: "Escribir por WhatsApp",
      puertasAria: "Lo que ofrezco",
      puertas: {
        prenatal: { nombre: "Yoga prenatal", alt: "Una mujer embarazada de perfil, con una mano bajo el vientre" },
        postPartum: { nombre: "Posparto", alt: "Una madre con su recién nacido en brazos" },
        groupe: { nombre: nombreDeClase("groupe", "es"), alt: "Alumnas estirándose sobre sus esterillas, en clase" },
        prives: { nombre: nombreDeClase("prives", "es"), alt: "Sofia en equilibrio sobre las manos, sobre un suelo de madera" },
        parc: { nombre: nombreDeClase("parc", "es"), alt: "Sofia en la postura del bailarín, en un camino de campo" },
        ateliers: { nombre: "Talleres", alt: "Un grupo sentado en círculo en una sala luminosa" },
      },
    },
    invitation: {
      lineas: ["No hace falta ser", "fuerte ni flexible,"],
      mano: "ven tal como eres",
      presentacion: "Me llamo Sofia Costa y soy profesora de yoga en Ginebra.",
      ensenanza:
        "Propongo una enseñanza dinámica que combina pranayama, movimiento funcional y sistema miofascial, en un ambiente acogedor e inclusivo, ¡porque creo firmemente que el yoga es para todo el mundo!",
      historia: "Mi historia",
    },
    cierre: {
      texto: "Si tienes una pregunta sobre las clases o el programa, escríbeme por WhatsApp, por e-mail o por Instagram.",
    },
    programme: {
      intro: [
        "Este programa está pensado para ti si estás embarazada y quieres seguir moviéndote de forma consciente durante tu embarazo.",
        "Será online, estará organizado por trimestres y llega pronto.",
      ],
      trimestre: "trimestre",
      trimestres: [
        { n: "1.", sufijo: "er", mois: "Meses 1 a 3" },
        { n: "2.", sufijo: "º", mois: "Meses 4 a 6" },
        { n: "3.", sufijo: "er", mois: "Meses 7 a 9" },
      ],
      trimestresAria: "Los tres trimestres",
      yang: "Una parte yang, dinámica",
      yin: "Una parte yin, suave",
      juntas: "Las dos, en cada trimestre.",
      formato: "Vídeos, PDF y textos, para seguir en casa.",
      accord: "Antes de empezar: el visto bueno de tu matrona o de tu ginecóloga.",
    },
    bande: {
      palabras: ["Yoga prenatal", "Posparto", "Vinyasa", "Yoga flow", "En grupo", "En privado", "En el parque"],
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/", TEXTOS[idioma].meta);
}

export default async function Accueil() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados datos={[persona(idioma), negocio(idioma)]} />
      {/* on a computer the cover waits here while the programme's panel rises over it (globals.css) */}
      <div className="hero-stage">
        <Hero t={t.hero} />
      </div>
      <Programme t={t.programme} />
      <Invitation t={t.invitation} />
      <Closing t={t.cierre} />
      <Bande t={t.bande} />
    </main>
  );
}

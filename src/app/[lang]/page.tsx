import type { Metadata } from "next";
import { Bande, type TextosBande } from "@/components/Bande";
import { Hero, type TextosHero } from "@/components/Hero";
import { Programme, type TextosProgramme } from "@/components/Programme";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { persona, negocio } from "@/lib/datos-estructurados";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";

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
      groupe: { nombre: "Cours en groupe", alt: "Des élèves qui s’étirent sur leur tapis, en cours" },
      prives: { nombre: "Cours privés", alt: "Sofia en équilibre sur les mains, sur un parquet" },
      parc: { nombre: "Au parc", alt: "Sofia dans la posture du danseur, sur un chemin de campagne" },
      ateliers: { nombre: "Ateliers", alt: "Un groupe assis en cercle dans une salle lumineuse" },
    },
  } satisfies TextosHero,
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
    cierre: { antes: "Tu es enceinte,", mano: "pas malade" },
    avisar: "Être prévenue du lancement",
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
        groupe: { nombre: "Group classes", alt: "Students stretching on their mats during a class" },
        prives: { nombre: "Private classes", alt: "Sofia balancing on her hands on a wooden floor" },
        parc: { nombre: "In the park", alt: "Sofia in dancer’s pose on a country path" },
        ateliers: { nombre: "Workshops", alt: "A group sitting in a circle in a bright room" },
      },
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
      cierre: { antes: "You’re pregnant,", mano: "not ill" },
      avisar: "Tell me when it launches",
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
        groupe: { nombre: "Clases en grupo", alt: "Alumnas estirándose sobre sus esterillas, en clase" },
        prives: { nombre: "Clases privadas", alt: "Sofia en equilibrio sobre las manos, sobre un suelo de madera" },
        parc: { nombre: "En el parque", alt: "Sofia en la postura del bailarín, en un camino de campo" },
        ateliers: { nombre: "Talleres", alt: "Un grupo sentado en círculo en una sala luminosa" },
      },
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
      cierre: { antes: "Estás embarazada,", mano: "no enferma" },
      avisar: "Avisarme del lanzamiento",
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
      <Hero t={t.hero} />
      <Programme t={t.programme} />
      <Bande t={t.bande} />
    </main>
  );
}

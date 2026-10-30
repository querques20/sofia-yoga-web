import type { Metadata } from "next";
import { Approche, type TextosApproche } from "@/components/Approche";
import { Bande, type TextosBande } from "@/components/Bande";
import { Contact } from "@/components/Contact";
import { Hero, type TextosHero } from "@/components/Hero";
import { Parcours, type TextosParcours } from "@/components/Parcours";
import { PourQui, type TextosPourQui } from "@/components/PourQui";
import { Pratique, type TextosPratique } from "@/components/Pratique";
import { Programme, type TextosProgramme } from "@/components/Programme";
import { AConfirmer } from "@/components/pagina/AConfirmer";
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
    antes: "Continuer à",
    mano: "bouger",
    despues: "pendant ta grossesse,",
    lugar: "à Genève",
    sub: "Yoga prénatal, post-partum et cours de yoga dynamique à Genève, avec Sofia Costa. En groupe, en privé ou au parc.",
    whatsapp: "Écrire sur WhatsApp",
    buscar: "Trouver mon cours",
    respiracion: {
      alt: "Une femme enceinte de profil, les yeux fermés, une main posée sur le ventre",
      invita: "Respire avec moi",
      inspira: "Inspire…",
      espira: "Expire…",
      ayuda: "Maintiens appuyé pour inspirer, relâche pour expirer.",
    },
  } satisfies TextosHero,
  pourQui: {
    titulo: "Par où commencer ?",
    puertas: [
      {
        frase: "Je suis enceinte et j’ai envie de bouger",
        detalle: "Yoga prénatal, avec l’accord de ta sage-femme ou de ta gynécologue.",
        alt: "Une femme enceinte de profil, une main posée sur le ventre",
      },
      {
        frase: "Je viens d’accoucher",
        detalle: "Yoga post-partum, après la rééducation du périnée avec une physio.",
        alt: "Une jeune maman qui tient son bébé contre elle",
      },
      {
        frase: "Je cherche un cours de yoga dynamique",
        detalle: "Vinyasa et yoga flow, en groupe, en privé ou au parc.",
        alt: "Une femme dans la posture du guerrier II, sur un tapis de yoga",
      },
    ],
  } satisfies TextosPourQui,
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
  approche: {
    titulo: "Mon approche",
    // texto de su bio, tal cual lo escribió ella (con su escritura inclusiva)
    cita: "Aujourd’hui, je propose un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial, dans un cadre bienveillant et inclusif, car je crois fortement que le yoga est pour touxtes ! Nul besoin d’être fort.e ou souple, viens comme tu es :)",
  } satisfies TextosApproche,
  // solo lo que da hoy (confirmado el 30/9 y en su tarjeta)
  bande: {
    palabras: ["Yoga prénatal", "Post-partum", "Vinyasa", "Yoga flow", "En groupe", "En privé", "Au parc"],
  } satisfies TextosBande,
  parcours: {
    titulo: "Mon parcours",
    foto: "La photo de Sofia arrivera ici après sa séance photo.",
    firma: "Sofia Costa, professeure de yoga à Genève.",
    // todo sale de su bio y de los audios del 30/9; solo 2019 tiene fecha confirmada
    etapas: [
      { titulo: "Le sport, depuis toute petite", texto: "Gymnastique artistique, natation et hockey sur gazon." },
      {
        titulo: "Le marketing",
        texto: "Quelques années d’études et de travail, jusqu’au jour où je me suis rendu compte que cela ne me rendait pas heureuse.",
      },
      { titulo: "2019, le départ", texto: "J’ai quitté la ville où je suis née pour voyager et me redécouvrir." },
      { titulo: "L’Inde", texto: "Ma formation de 200 h en Ashtanga-Vinyasa." },
      {
        titulo: "La Suisse",
        texto: "100 h de yin yoga et de thérapie des fascias, puis une formation continue sur les fascias.",
      },
      { titulo: "Pré et postnatal", texto: "Une formation de 60 h. Je suis enregistrée auprès de Yoga Alliance." },
      { titulo: "Aujourd’hui", texto: "Des cours de yoga dynamique à Genève, en groupe, en privé et au parc." },
    ],
  } satisfies TextosParcours,
  // lo que sabemos para todos los cursos; lugares, horarios y precios todavía no los tenemos
  pratique: {
    datos: [
      {
        dato: "Où",
        valor: (
          <>
            À Genève. Les lieux sont <AConfirmer />
          </>
        ),
      },
      {
        dato: "Quand",
        valor: (
          <>
            Les horaires sont <AConfirmer />
          </>
        ),
      },
      {
        dato: "Combien",
        valor: (
          <>
            Les tarifs sont <AConfirmer />
          </>
        ),
      },
      { dato: "Paiement", valor: <AConfirmer /> },
      { dato: "Pendant la grossesse", valor: "Avec l’accord de ta sage-femme ou de ta gynécologue." },
      { dato: "Après l’accouchement", valor: "Après la rééducation du périnée avec une physio." },
    ],
    nota: "Les cours ne sont pas remboursés par l’assurance complémentaire.",
    pedir: "Les lieux, les horaires et les tarifs arrivent bientôt. En attendant, écris-moi : je te dis où et quand ont lieu les prochains cours.",
  } satisfies TextosPratique,
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      description: "Prenatal yoga, postnatal yoga and dynamic yoga classes in Geneva, with Sofia Costa. In a group, one to one or in the park.",
    },
    hero: {
      antes: "Keep",
      mano: "moving",
      despues: "through your pregnancy,",
      lugar: "in Geneva",
      sub: "Prenatal yoga, postnatal yoga and dynamic yoga classes in Geneva, with Sofia Costa. In a group, one to one or in the park.",
      whatsapp: "Message me on WhatsApp",
      buscar: "Find my class",
      respiracion: {
        alt: "A pregnant woman in profile, her eyes closed, one hand resting on her belly",
        invita: "Breathe with me",
        inspira: "Breathe in…",
        espira: "Breathe out…",
        ayuda: "Hold to breathe in, let go to breathe out.",
      },
    },
    pourQui: {
      titulo: "Where to start?",
      puertas: [
        {
          frase: "I’m pregnant and I want to move",
          detalle: "Prenatal yoga, with the go-ahead of your midwife or gynaecologist.",
          alt: "A pregnant woman in profile, one hand resting on her belly",
        },
        {
          frase: "I’ve just given birth",
          detalle: "Postnatal yoga, after pelvic floor rehab with a physio.",
          alt: "A young mum holding her baby close",
        },
        {
          frase: "I’m looking for a dynamic yoga class",
          detalle: "Vinyasa and yoga flow, in a group, one to one or in the park.",
          alt: "A woman in warrior II pose on a yoga mat",
        },
      ],
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
    approche: {
      titulo: "My approach",
      cita: "Today, I teach a dynamic practice that brings together pranayama, functional movement and the myofascial system, in a kind and inclusive space, because I truly believe yoga is for everyone! You don’t need to be strong or flexible, come as you are :)",
    },
    bande: {
      palabras: ["Prenatal yoga", "Postnatal", "Vinyasa", "Yoga flow", "In a group", "One to one", "In the park"],
    },
    parcours: {
      titulo: "My journey",
      foto: "Sofia’s photo will go here after her photo shoot.",
      firma: "Sofia Costa, yoga teacher in Geneva.",
      etapas: [
        { titulo: "Sport, from a very young age", texto: "Artistic gymnastics, swimming and field hockey." },
        {
          titulo: "Marketing",
          texto: "A few years of study and work, until the day I realised it wasn’t making me happy.",
        },
        { titulo: "2019, setting off", texto: "I left the city where I was born to travel and rediscover myself." },
        { titulo: "India", texto: "My 200-hour Ashtanga-Vinyasa training." },
        {
          titulo: "Switzerland",
          texto: "100 hours of yin yoga and fascia therapy, then continuing training on fascia.",
        },
        { titulo: "Pre- and postnatal", texto: "A 60-hour training. I’m registered with Yoga Alliance." },
        { titulo: "Today", texto: "Dynamic yoga classes in Geneva, in a group, one to one and in the park." },
      ],
    },
    pratique: {
      datos: [
        {
          dato: "Where",
          valor: (
            <>
              In Geneva. Venues are <AConfirmer />
            </>
          ),
        },
        {
          dato: "When",
          valor: (
            <>
              Times are <AConfirmer />
            </>
          ),
        },
        {
          dato: "How much",
          valor: (
            <>
              Prices are <AConfirmer />
            </>
          ),
        },
        { dato: "Payment", valor: <AConfirmer /> },
        { dato: "During pregnancy", valor: "With the go-ahead of your midwife or gynaecologist." },
        { dato: "After the birth", valor: "After pelvic floor rehab with a physio." },
      ],
      nota: "Classes aren’t reimbursed by supplementary health insurance.",
      pedir: "Venues, times and prices are coming soon. In the meantime, write to me: I’ll tell you where and when the next classes are.",
    },
  },
  es: {
    meta: {
      description: "Yoga prenatal, posparto y clases de yoga dinámico en Ginebra, con Sofia Costa. En grupo, en privado o en el parque.",
    },
    hero: {
      antes: "Sigue",
      mano: "moviéndote",
      despues: "durante tu embarazo,",
      lugar: "en Ginebra",
      sub: "Yoga prenatal, posparto y clases de yoga dinámico en Ginebra, con Sofia Costa. En grupo, en privado o en el parque.",
      whatsapp: "Escríbeme por WhatsApp",
      buscar: "Encontrar mi clase",
      respiracion: {
        alt: "Una mujer embarazada de perfil, con los ojos cerrados y una mano sobre el vientre",
        invita: "Respira conmigo",
        inspira: "Inspira…",
        espira: "Espira…",
        ayuda: "Mantén pulsado para inspirar, suelta para espirar.",
      },
    },
    pourQui: {
      titulo: "¿Por dónde empezar?",
      puertas: [
        {
          frase: "Estoy embarazada y tengo ganas de moverme",
          detalle: "Yoga prenatal, con el visto bueno de tu matrona o de tu ginecóloga.",
          alt: "Una mujer embarazada de perfil, con una mano sobre el vientre",
        },
        {
          frase: "Acabo de dar a luz",
          detalle: "Yoga posparto, después de la reeducación del suelo pélvico con una fisioterapeuta.",
          alt: "Una mamá joven con su bebé en brazos",
        },
        {
          frase: "Busco una clase de yoga dinámico",
          detalle: "Vinyasa y yoga flow, en grupo, en privado o en el parque.",
          alt: "Una mujer en la postura del guerrero II, sobre una esterilla de yoga",
        },
      ],
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
    approche: {
      titulo: "Mi enfoque",
      cita: "Hoy enseño una práctica dinámica que combina pranayama, movimiento funcional y sistema miofascial, en un ambiente acogedor e inclusivo, porque creo firmemente que el yoga es para todo el mundo. No hace falta ser fuerte ni flexible, ven tal como eres :)",
    },
    bande: {
      palabras: ["Yoga prenatal", "Posparto", "Vinyasa", "Yoga flow", "En grupo", "En privado", "En el parque"],
    },
    parcours: {
      titulo: "Mi recorrido",
      foto: "La foto de Sofia llegará aquí después de su sesión de fotos.",
      firma: "Sofia Costa, profesora de yoga en Ginebra.",
      etapas: [
        { titulo: "El deporte, desde muy pequeña", texto: "Gimnasia artística, natación y hockey sobre césped." },
        {
          titulo: "El marketing",
          texto: "Unos años de estudios y de trabajo, hasta el día en que me di cuenta de que no me hacía feliz.",
        },
        { titulo: "2019, la partida", texto: "Dejé la ciudad donde nací para viajar y redescubrirme." },
        { titulo: "La India", texto: "Mi formación de 200 h en Ashtanga-Vinyasa." },
        {
          titulo: "Suiza",
          texto: "100 h de yin yoga y de terapia de las fascias, y después una formación continua sobre las fascias.",
        },
        { titulo: "Prenatal y posparto", texto: "Una formación de 60 h. Estoy registrada en Yoga Alliance." },
        { titulo: "Hoy", texto: "Clases de yoga dinámico en Ginebra, en grupo, en privado y en el parque." },
      ],
    },
    pratique: {
      datos: [
        {
          dato: "Dónde",
          valor: (
            <>
              En Ginebra. Los lugares están <AConfirmer />
            </>
          ),
        },
        {
          dato: "Cuándo",
          valor: (
            <>
              Los horarios están <AConfirmer />
            </>
          ),
        },
        {
          dato: "Cuánto",
          valor: (
            <>
              Las tarifas están <AConfirmer />
            </>
          ),
        },
        { dato: "Pago", valor: <AConfirmer /> },
        { dato: "Durante el embarazo", valor: "Con el visto bueno de tu matrona o de tu ginecóloga." },
        { dato: "Después del parto", valor: "Después de la reeducación del suelo pélvico con una fisioterapeuta." },
      ],
      nota: "El seguro complementario no reembolsa las clases.",
      pedir: "Los lugares, los horarios y las tarifas llegan pronto. Mientras tanto, escríbeme: te cuento dónde y cuándo son las próximas clases.",
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
      <PourQui t={t.pourQui} />
      <Programme t={t.programme} />
      <Approche t={t.approche} />
      <Bande t={t.bande} />
      <Parcours t={t.parcours} />
      <Pratique t={t.pratique} />
      <Contact />
    </main>
  );
}

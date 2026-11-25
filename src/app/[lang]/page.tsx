import type { Metadata } from "next";
import { Bande, type TextosBande } from "@/components/Bande";
import { Hero, type TextosHero } from "@/components/Hero";
import { Closing, type TextosClosing } from "@/components/home/Closing";
import { Invitation, type TextosInvitation } from "@/components/home/Invitation";
import { PreviewClass, type TextosPreviewClass } from "@/components/home/PreviewClass";
import type { TextosTestimonials } from "@/components/home/Testimonials";
import { WhereToStart, type TextosWhereToStart } from "@/components/home/WhereToStart";
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
    texto: "Pour une question sur les cours, écris-moi par WhatsApp, par e-mail ou sur Instagram.",
    momentos: "Moments de cours",
  } satisfies TextosClosing,
  // what often changes in the body in each trimester and how the practice adapts: the prenatal page's lines,
  // shortened. Their sources are on the prenatal page, which the scene links to: the owner asked for no list at
  // the Home's foot (2026-11-24). The online programme left the Home until Sofia validates it
  programme: {
    titulo: ["Ton corps, trimestre par", "trimestre"],
    intro: [
      "Chaque grossesse est différente. Voici ce qui change souvent, et comment la pratique s’adapte selon les recommandations.",
      "Toujours avec l’accord de ta sage-femme ou de ta gynécologue.",
    ],
    masInfo: "Tout sur le yoga prénatal",
    trimestre: "trimestre",
    cuerpo: "Ton corps",
    practica: "La pratique",
    trimestres: [
      {
        n: "1",
        sufijo: "er",
        mois: "Mois 1 à 3",
        cuerpo: "Les nausées et la grande fatigue sont fréquentes.",
        practica: "Les jours difficiles, une pratique douce suffit. Et on évite la chaleur : pas de yoga chaud.",
      },
      {
        n: "2",
        sufijo: "e",
        mois: "Mois 4 à 6",
        cuerpo: "Le ventre s’arrondit et déplace le centre de gravité vers l’avant. Les ligaments deviennent souvent plus souples.",
        practica: "L’équilibre change : on ne force pas les étirements et on évite les exercices allongée sur le dos.",
      },
      {
        n: "3",
        sufijo: "e",
        mois: "Mois 7 à 9",
        cuerpo: "Le ventre prend de la place.",
        practica: "On adapte les postures, on garde des appuis stables et on continue à respirer pendant l’effort.",
      },
    ],
    trimestresAria: "Les trois trimestres",
    porque: "Bouger pendant la grossesse peut aider à réduire le risque de complications fréquentes, comme l’hypertension ou le diabète gestationnel.",
  } satisfies TextosProgramme,
  // what she offers, by who is reading: the three ways to take a class are one row, not three doors
  ou: {
    titulo: "Par où commencer ?",
    situaciones: [
      { frase: "Je suis enceinte et j’ai envie de bouger", detalle: "Yoga prénatal, avec l’accord de ta sage-femme ou de ta gynécologue." },
      { frase: "Je viens d’accoucher", detalle: "Yoga post-partum, après la rééducation du périnée avec une physio." },
      { frase: "Je cherche un cours de yoga dynamique", detalle: "Vinyasa et yoga flow, en groupe, en privé ou au parc." },
    ],
    ateliers: { texto: "Il y a aussi des ateliers. Aucun n’est annoncé pour le moment.", enlace: "Voir les ateliers" },
  } satisfies TextosWhereToStart,
  // she has not given a video yet: the frame says so. The photo is one of the Home's, provisional as they are
  apercu: {
    titulo: "Aperçu d’un cours",
    texto: "Regarde à quoi ressemble un cours avant de te décider.",
    foto: "Un groupe assis en cercle dans une salle lumineuse",
    boton: "Réserver mon premier cours",
  } satisfies TextosPreviewClass,
  // she has not given any testimonial yet: the place says so, and the cards are SAMPLES written by us, each one
  // marked as an example. They are not to be published as they are: hers replace them
  temoignages: {
    titulo: "Ce qu’on dit des cours",
    ejemplo: "Exemple",
    ejemplos: [
      { cita: "J’arrivais fatiguée et je repartais plus légère. Sofia adapte chaque posture, on ne se sent jamais jugée.", de: "Une élève", clase: "Yoga prénatal" },
      { cita: "Reprendre en douceur après la naissance, à mon rythme : c’était exactement ce qu’il me fallait.", de: "Une élève", clase: "Yoga post-partum" },
      { cita: "Des cours dynamiques, mais toujours avec le souffle. On transpire et on repart apaisée.", de: "Une élève", clase: "Vinyasa" },
      { cita: "Je n’avais jamais fait de yoga. Sofia explique tout simplement, et on se sent vite à l’aise.", de: "Une élève", clase: "Cours privés" },
      { cita: "Un moment pour moi dans la semaine. J’en ressors détendue, la tête plus claire.", de: "Une élève", clase: "Yoga prénatal" },
      { cita: "Sofia fait attention à chacune. Je me suis sentie en sécurité du premier au dernier cours.", de: "Une élève", clase: "Yoga prénatal" },
      { cita: "Après la naissance, j’avais besoin de me retrouver. Ces cours m’ont aidée à reprendre confiance.", de: "Une élève", clase: "Yoga post-partum" },
      { cita: "L’ambiance est douce, sans compétition. On vient comme on est.", de: "Une élève", clase: "Vinyasa" },
    ],
  } satisfies TextosTestimonials,
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
      texto: "Got a question about the classes? Write to me on WhatsApp, by email or on Instagram.",
      momentos: "Moments from class",
    },
    // what often changes in the body in each trimester and how the practice adapts: the prenatal page's lines,
    // shortened. Their sources are on the prenatal page, which the scene links to: the owner asked for no list at
    // the Home's foot (2026-11-24). The online programme left the Home until Sofia validates it
    programme: {
      titulo: ["Your body, trimester by", "trimester"],
      intro: [
        "Every pregnancy is different. Here is what often changes, and how the practice adapts according to the recommendations.",
        "Always with the go-ahead of your midwife or gynaecologist.",
      ],
      masInfo: "All about prenatal yoga",
      trimestre: "trimester",
      cuerpo: "Your body",
      practica: "The practice",
      trimestres: [
        {
          n: "1",
          sufijo: "st",
          mois: "Months 1 to 3",
          cuerpo: "Nausea and heavy tiredness are common.",
          practica: "On difficult days, a gentle practice is enough. And we avoid heat: no hot yoga.",
        },
        {
          n: "2",
          sufijo: "nd",
          mois: "Months 4 to 6",
          cuerpo: "Your belly rounds out and shifts your centre of gravity forwards. Ligaments often become more supple.",
          practica: "Your balance changes: we don’t force the stretches and we avoid exercises lying on your back.",
        },
        {
          n: "3",
          sufijo: "rd",
          mois: "Months 7 to 9",
          cuerpo: "Your belly takes up more room.",
          practica: "We adapt the postures, keep stable support points and keep breathing through the effort.",
        },
      ],
      trimestresAria: "The three trimesters",
      porque: "Moving during pregnancy can help lower the risk of common complications, such as high blood pressure or gestational diabetes.",
    },
    ou: {
      titulo: "Where to start?",
      situaciones: [
        { frase: "I’m pregnant and I want to move", detalle: "Prenatal yoga, with the go-ahead of your midwife or gynaecologist." },
        { frase: "I’ve just given birth", detalle: "Postnatal yoga, after pelvic floor rehab with a physio." },
        { frase: "I’m looking for a dynamic yoga class", detalle: "Vinyasa and yoga flow, in a group, one to one or in the park." },
      ],
      ateliers: { texto: "There are workshops too. None is announced for now.", enlace: "See the workshops" },
    },
    apercu: {
      titulo: "Preview a class",
      texto: "See what a class looks like before you decide.",
      foto: "A group sitting in a circle in a bright room",
      boton: "Book my first class",
    },
    temoignages: {
      titulo: "What people say about the classes",
      ejemplo: "Example",
      ejemplos: [
        { cita: "I’d arrive tired and leave feeling lighter. Sofia adapts every pose, and you never feel judged.", de: "A student", clase: "Prenatal yoga" },
        { cita: "Starting again gently after the birth, at my own pace: it was exactly what I needed.", de: "A student", clase: "Postnatal yoga" },
        { cita: "Dynamic classes, but always with the breath. You work up a sweat and leave feeling calm.", de: "A student", clase: "Vinyasa" },
        { cita: "I had never done yoga. Sofia explains everything simply, and you soon feel at ease.", de: "A student", clase: "Private classes" },
        { cita: "A moment for myself in the week. I come out relaxed, with a clearer head.", de: "A student", clase: "Prenatal yoga" },
        { cita: "Sofia pays attention to each of us. I felt safe from the first class to the last.", de: "A student", clase: "Prenatal yoga" },
        { cita: "After the birth I needed to find myself again. These classes helped me get my confidence back.", de: "A student", clase: "Postnatal yoga" },
        { cita: "The mood is gentle, with no competition. You come as you are.", de: "A student", clase: "Vinyasa" },
      ],
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
      texto: "Si tienes una pregunta sobre las clases, escríbeme por WhatsApp, por e-mail o por Instagram.",
      momentos: "Momentos de clase",
    },
    // what often changes in the body in each trimester and how the practice adapts: the prenatal page's lines,
    // shortened. Their sources are on the prenatal page, which the scene links to: the owner asked for no list at
    // the Home's foot (2026-11-24). The online programme left the Home until Sofia validates it
    programme: {
      titulo: ["Tu cuerpo, trimestre a", "trimestre"],
      intro: [
        "Cada embarazo es diferente. Esto es lo que suele cambiar, y cómo se adapta la práctica según las recomendaciones.",
        "Siempre con el visto bueno de tu matrona o de tu ginecóloga.",
      ],
      masInfo: "Todo sobre el yoga prenatal",
      trimestre: "trimestre",
      cuerpo: "Tu cuerpo",
      practica: "La práctica",
      trimestres: [
        {
          n: "1",
          sufijo: "er",
          mois: "Meses 1 a 3",
          cuerpo: "Las náuseas y el mucho cansancio son frecuentes.",
          practica: "Los días difíciles, basta con una práctica suave. Y se evita el calor: nada de yoga caliente.",
        },
        {
          n: "2",
          sufijo: "º",
          mois: "Meses 4 a 6",
          cuerpo: "El vientre se redondea y desplaza el centro de gravedad hacia adelante. Los ligamentos suelen volverse más flexibles.",
          practica: "El equilibrio cambia: no se fuerzan los estiramientos y se evitan los ejercicios acostada boca arriba.",
        },
        {
          n: "3",
          sufijo: "er",
          mois: "Meses 7 a 9",
          cuerpo: "El vientre ocupa más espacio.",
          practica: "Se adaptan las posturas, se mantienen apoyos estables y se sigue respirando durante el esfuerzo.",
        },
      ],
      trimestresAria: "Los tres trimestres",
      porque: "Moverse durante el embarazo puede ayudar a reducir el riesgo de complicaciones frecuentes, como la hipertensión o la diabetes gestacional.",
    },
    ou: {
      titulo: "¿Por dónde empezar?",
      situaciones: [
        { frase: "Estoy embarazada y tengo ganas de moverme", detalle: "Yoga prenatal, con el visto bueno de tu matrona o de tu ginecóloga." },
        { frase: "Acabo de dar a luz", detalle: "Yoga posparto, después de la reeducación del suelo pélvico con una fisioterapeuta." },
        { frase: "Busco una clase de yoga dinámico", detalle: "Vinyasa y yoga flow, en grupo, en privado o en el parque." },
      ],
      ateliers: { texto: "También hay talleres. Por ahora no hay ninguno anunciado.", enlace: "Ver los talleres" },
    },
    apercu: {
      titulo: "Mira una clase",
      texto: "Mira cómo es una clase antes de decidirte.",
      foto: "Un grupo sentado en círculo en una sala luminosa",
      boton: "Reservar mi primera clase",
    },
    temoignages: {
      titulo: "Lo que se dice de las clases",
      ejemplo: "Ejemplo",
      ejemplos: [
        { cita: "Llegaba cansada y me iba más ligera. Sofia adapta cada postura y nunca te sientes juzgada.", de: "Una alumna", clase: "Yoga prenatal" },
        { cita: "Retomar con suavidad después del parto, a mi ritmo: era justo lo que necesitaba.", de: "Una alumna", clase: "Yoga posparto" },
        { cita: "Clases dinámicas, pero siempre con la respiración. Sudas y sales en calma.", de: "Una alumna", clase: "Vinyasa" },
        { cita: "Nunca había hecho yoga. Sofia lo explica todo con sencillez y enseguida te sientes a gusto.", de: "Una alumna", clase: "Clases privadas" },
        { cita: "Un momento para mí en la semana. Salgo relajada y con la cabeza más despejada.", de: "Una alumna", clase: "Yoga prenatal" },
        { cita: "Sofia está pendiente de cada una. Me sentí segura de la primera a la última clase.", de: "Una alumna", clase: "Yoga prenatal" },
        { cita: "Después del parto necesitaba reencontrarme. Estas clases me ayudaron a recuperar la confianza.", de: "Una alumna", clase: "Yoga posparto" },
        { cita: "El ambiente es suave, sin competición. Vienes como eres.", de: "Una alumna", clase: "Vinyasa" },
      ],
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
      <WhereToStart t={t.ou} />
      <Invitation t={t.invitation} />
      {/* one scene: the look at a class waits in place while the band rises over it (globals.css) */}
      <div className="apercu-scene">
        <PreviewClass t={t.apercu} />
        <Closing t={t.cierre} voces={t.temoignages} />
      </div>
      <Bande t={t.bande} />
    </main>
  );
}

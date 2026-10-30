import type { Metadata } from "next";
import { Histoire, type TextosHistoire } from "@/components/a-propos/Histoire";
import { Portrait, type TextosPortrait } from "@/components/a-propos/Portrait";
import { Tapis, type TextosTapis } from "@/components/a-propos/Tapis";
import { Contact } from "@/components/Contact";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { Reperes } from "@/components/pagina/Reperes";
import { Sources } from "@/components/pagina/Sources";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { paginaSobreSofia, persona } from "@/lib/datos-estructurados";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa). Es la historia de Sofía en
// primera persona: se conserva su voz
const fr = {
  meta: {
    title: "Sofia Costa, professeure de yoga à Genève",
    description:
      "Mon parcours, mes formations (enregistrée auprès de Yoga Alliance, 60 h de yoga pré et postnatal) et ma façon d’enseigner le yoga à Genève.",
  },
  fil: "À propos",
  titulo: (
    <>
      Le yoga est pour <Mano>touxtes</Mano>
    </>
  ),
  intro: (
    <>
      <p>Je m’appelle Sofia Costa et je suis professeure de yoga à Genève.</p>
      <p>Je donne des cours de yoga dynamique et de yoga pré et postnatal, en groupe, en privé et au parc.</p>
    </>
  ),
  portrait: { texto: "La photo de Sofia arrivera ici après sa séance photo." } satisfies TextosPortrait,
  histoire: {
    titulo: "Mon histoire",
    // su bio del 18/7, párrafo por párrafo, con las correcciones sugeridas (falta que ella las valide).
    // El párrafo de las escuelas no va hasta que confirme si quiere contarlo en la web
    etapas: [
      {
        etapa: "Le sport",
        texto:
          "Intéressée par le sport et la santé dès mon plus jeune âge, j’ai pratiqué la gymnastique artistique, la natation et le hockey sur gazon avant de me tourner vers le yoga.",
      },
      {
        etapa: "Le marketing",
        texto:
          "Parallèlement, j’ai étudié le marketing et travaillé dans ce domaine pendant quelques années, jusqu’au jour où je me suis rendu compte que cela ne me correspondait pas et ne me rendait pas heureuse.",
      },
      {
        etapa: "2019",
        texto:
          "En 2019, j’ai quitté la ville où je suis née pour me consacrer à mon épanouissement personnel, prendre le temps de voyager et me redécouvrir.",
      },
      {
        etapa: "L’Inde",
        texto:
          "Un voyage en Inde m’a menée à approfondir ma pratique de yoga, me conduisant à me former en Ashtanga-Vinyasa, et cela m’a permis de comprendre à quel point le bien-être physique et le spirituel étaient liés.",
      },
      {
        etapa: "La Suisse",
        texto:
          "J’ai continué à alimenter ma soif d’apprendre avec une formation en thérapie des fascias et en yin yoga en Suisse, ce qui m’a permis d’explorer une dimension plus profonde de ma pratique.",
      },
      {
        etapa: "Aujourd’hui",
        texto:
          "Aujourd’hui, je propose un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial, dans un cadre bienveillant et inclusif, car je crois fermement que le yoga est pour touxtes ! Nul besoin d’être fort.e ou souple, viens comme tu es :)",
      },
    ],
  } satisfies TextosHistoire,
  metodo: {
    titulo: "Ma façon d’enseigner",
    intro: (
      <>
        <p>Avec mes mots&nbsp;: «&nbsp;un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial&nbsp;».</p>
        <p>Voici ce que ça veut dire.</p>
      </>
    ),
    // las tres palabras de su bio, explicadas con definiciones verificadas (la de fascia es la de consenso de 2019)
    reperes: [
      {
        clave: "Le pranayama",
        texto: "La discipline du souffle : des techniques de respiration, le quatrième des huit « membres » du yoga décrits dans les Yoga Sūtra.",
      },
      {
        clave: "Le mouvement fonctionnel",
        texto: "Des exercices pensés pour les gestes du quotidien : marcher, se lever d’une chaise, monter un escalier, pousser ou tirer.",
      },
      {
        clave: "Le système myofascial",
        texto: "Les muscles et les fascias, ces tissus qui les enveloppent et les relient, comme un réseau continu dans tout le corps.",
      },
    ],
  },
  tapis: {
    titulo: "Mes formations",
    leyenda: "La longueur de chaque tapis correspond à la durée de la formation.",
    unidad: "h",
    // sus formaciones con horas (confirmadas el 30/9). Cada esterilla mide lo que duró la formación, y abajo va qué
    // es cada estilo, con definiciones verificadas (historia del ashtanga y del yin)
    formaciones: [
      {
        horas: 200,
        titulo: "Ashtanga-Vinyasa",
        detalle: "En Inde",
        texto: "Un style popularisé au XXe siècle par K. Pattabhi Jois, à Mysore : des séries de postures enchaînées au rythme du souffle.",
      },
      {
        horas: 100,
        titulo: "Yin yoga et thérapie des fascias",
        detalle: "En Suisse",
        texto: "Le yin yoga est lent : les postures sont tenues longtemps, souvent plusieurs minutes, dans le calme.",
      },
      {
        horas: 60,
        titulo: "Yoga pré et postnatal",
        detalle: null,
        texto: "Pour accompagner la grossesse et l’après-accouchement, avec les précautions propres à chaque étape.",
      },
    ],
    extras: [
      {
        titulo: "Une formation continue en thérapie des fascias",
        texto: "Les fascias sont les tissus qui enveloppent et relient les muscles et les organes, comme un réseau dans tout le corps.",
      },
      {
        titulo: "Enregistrée auprès de Yoga Alliance",
        texto:
          "Yoga Alliance est un registre international de professeur.es et d’écoles de yoga. Il ne délivre pas de diplôme\u00a0: il répertorie les formations qui suivent ses standards.",
      },
    ],
  } satisfies TextosTapis,
  fuentes: [
    { texto: "Schleip et al., Clinical Anatomy, 2019 : définition des fascias", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6852276/" },
    { texto: "La Scala Teixeira et al., Frontiers in Physiology, 2017 : l’entraînement fonctionnel", href: "https://www.frontiersin.org/articles/10.3389/fphys.2017.00643/full" },
    { texto: "Yoga Alliance, Standards for RYT Credentials", href: "https://yogaalliance.org/Standards-for-RYT-Credentials" },
    { texto: "Yoga Alliance, Member Brand Guide, 2025", href: "https://yogaalliance.org/wp-content/uploads/2025/10/YA25-Member-Brand-Guide.pdf" },
  ],
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Sofia Costa, yoga teacher in Geneva",
      description:
        "My journey, my training (registered with Yoga Alliance, 60 hours of prenatal and postnatal yoga) and the way I teach yoga in Geneva.",
    },
    fil: "About",
    titulo: (
      <>
        Yoga is for <Mano>everyone</Mano>
      </>
    ),
    intro: (
      <>
        <p>My name is Sofia Costa and I’m a yoga teacher in Geneva.</p>
        <p>I teach dynamic yoga and prenatal and postnatal yoga, in groups, privately and in the park.</p>
      </>
    ),
    portrait: { texto: "Sofia’s photo will go here after her photo shoot." },
    histoire: {
      titulo: "My story",
      etapas: [
        { etapa: "Sport", texto: "Interested in sport and health from a very young age, I did artistic gymnastics, swimming and field hockey before turning to yoga." },
        { etapa: "Marketing", texto: "At the same time, I studied marketing and worked in the field for a few years, until the day I realised it wasn’t right for me and wasn’t making me happy." },
        { etapa: "2019", texto: "In 2019, I left the city where I was born to focus on my personal fulfilment, take time to travel and rediscover myself." },
        { etapa: "India", texto: "A trip to India led me to deepen my yoga practice and to train in Ashtanga-Vinyasa, and it helped me understand just how closely physical and spiritual wellbeing are linked." },
        { etapa: "Switzerland", texto: "I kept feeding my thirst to learn with training in fascia therapy and yin yoga in Switzerland, which let me explore a deeper dimension of my practice." },
        { etapa: "Today", texto: "Today, I teach a dynamic approach that combines pranayama, functional movement and the myofascial system, in a kind and inclusive setting, because I firmly believe yoga is for everyone! You don’t need to be strong or flexible, come as you are :)" },
      ],
    },
    metodo: {
      titulo: "How I teach",
      intro: (
        <>
          <p>In my own words: “a dynamic approach to teaching that combines pranayama, functional movement and the myofascial system”.</p>
          <p>Here’s what that means.</p>
        </>
      ),
      reperes: [
        {
          clave: "Pranayama",
          texto: "The discipline of the breath: breathing techniques, the fourth of the eight “limbs” of yoga described in the Yoga Sūtras.",
        },
        {
          clave: "Functional movement",
          texto: "Exercises designed around everyday movements: walking, getting up from a chair, climbing stairs, pushing or pulling.",
        },
        {
          clave: "The myofascial system",
          texto: "The muscles and the fascia, the tissue that wraps and links them, like a continuous network throughout the body.",
        },
      ],
    },
    tapis: {
      titulo: "My training",
      leyenda: "The length of each mat matches the length of the training.",
      unidad: "hrs",
      formaciones: [
        { horas: 200, titulo: "Ashtanga-Vinyasa", detalle: "In India", texto: "A style popularised in the 20th century by K. Pattabhi Jois in Mysore: sequences of postures strung together to the rhythm of the breath." },
        { horas: 100, titulo: "Yin yoga and fascia therapy", detalle: "In Switzerland", texto: "Yin yoga is slow: the postures are held for a long time, often several minutes, in stillness." },
        { horas: 60, titulo: "Prenatal and postnatal yoga", detalle: null, texto: "To support pregnancy and the time after birth, with the precautions specific to each stage." },
      ],
      extras: [
        {
          titulo: "Continuing training in fascia therapy",
          texto: "Fascia is the tissue that wraps and links the muscles and organs, like a network throughout the body.",
        },
        {
          titulo: "Registered with Yoga Alliance",
          texto:
            "Yoga Alliance is an international registry of yoga teachers and schools. It doesn’t award a diploma: it lists the trainings that meet its standards.",
        },
      ],
    },
    fuentes: [
      { texto: "Schleip et al., Clinical Anatomy, 2019: definition of fascia", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6852276/" },
      { texto: "La Scala Teixeira et al., Frontiers in Physiology, 2017: functional training", href: "https://www.frontiersin.org/articles/10.3389/fphys.2017.00643/full" },
      { texto: "Yoga Alliance, Standards for RYT Credentials", href: "https://yogaalliance.org/Standards-for-RYT-Credentials" },
      { texto: "Yoga Alliance, Member Brand Guide, 2025", href: "https://yogaalliance.org/wp-content/uploads/2025/10/YA25-Member-Brand-Guide.pdf" },
    ],
  },
  es: {
    meta: {
      title: "Sofia Costa, profesora de yoga en Ginebra",
      description:
        "Mi recorrido, mi formación (registrada en Yoga Alliance, 60 h de yoga prenatal y posparto) y mi manera de enseñar yoga en Ginebra.",
    },
    fil: "Sobre mí",
    titulo: (
      <>
        El yoga es para <Mano>todo</Mano> el mundo
      </>
    ),
    intro: (
      <>
        <p>Me llamo Sofia Costa y soy profesora de yoga en Ginebra.</p>
        <p>Doy clases de yoga dinámico y de yoga prenatal y posparto, en grupo, en privado y en el parque.</p>
      </>
    ),
    portrait: { texto: "La foto de Sofia llegará aquí después de su sesión de fotos." },
    histoire: {
      titulo: "Mi historia",
      etapas: [
        { etapa: "El deporte", texto: "Desde muy joven me interesaron el deporte y la salud: practiqué gimnasia artística, natación y hockey sobre césped antes de acercarme al yoga." },
        { etapa: "El marketing", texto: "Al mismo tiempo estudié marketing y trabajé en ese campo durante unos años, hasta que un día me di cuenta de que no era lo mío y de que no me hacía feliz." },
        { etapa: "2019", texto: "En 2019 dejé la ciudad donde nací para dedicarme a mi desarrollo personal, tomarme el tiempo de viajar y redescubrirme." },
        { etapa: "La India", texto: "Un viaje a la India me llevó a profundizar en mi práctica de yoga y a formarme en Ashtanga-Vinyasa, y me permitió entender hasta qué punto el bienestar físico y el espiritual están unidos." },
        { etapa: "Suiza", texto: "Seguí alimentando mis ganas de aprender con una formación en terapia de las fascias y en yin yoga en Suiza, que me permitió explorar una dimensión más profunda de mi práctica." },
        { etapa: "Hoy", texto: "Hoy propongo una enseñanza dinámica que combina pranayama, movimiento funcional y sistema miofascial, en un ambiente acogedor e inclusivo, ¡porque creo firmemente que el yoga es para todo el mundo! No hace falta ser fuerte ni flexible, ven tal como eres :)" },
      ],
    },
    metodo: {
      titulo: "Mi manera de enseñar",
      intro: (
        <>
          <p>Con mis palabras: «una enseñanza dinámica que combina pranayama, movimiento funcional y sistema miofascial».</p>
          <p>Esto es lo que significa.</p>
        </>
      ),
      reperes: [
        {
          clave: "El pranayama",
          texto: "La disciplina de la respiración: técnicas de respiración, el cuarto de los ocho «miembros» del yoga descritos en los Yoga Sūtra.",
        },
        {
          clave: "El movimiento funcional",
          texto: "Ejercicios pensados para los gestos de todos los días: caminar, levantarse de una silla, subir una escalera, empujar o tirar.",
        },
        {
          clave: "El sistema miofascial",
          texto: "Los músculos y las fascias, esos tejidos que los envuelven y los conectan, como una red continua por todo el cuerpo.",
        },
      ],
    },
    tapis: {
      titulo: "Mis formaciones",
      leyenda: "El largo de cada esterilla corresponde a la duración de la formación.",
      unidad: "h",
      formaciones: [
        { horas: 200, titulo: "Ashtanga-Vinyasa", detalle: "En la India", texto: "Un estilo popularizado en el siglo XX por K. Pattabhi Jois, en Mysore: series de posturas encadenadas al ritmo de la respiración." },
        { horas: 100, titulo: "Yin yoga y terapia de las fascias", detalle: "En Suiza", texto: "El yin yoga es lento: las posturas se mantienen mucho tiempo, a menudo varios minutos, en calma." },
        { horas: 60, titulo: "Yoga prenatal y posparto", detalle: null, texto: "Para acompañar el embarazo y el posparto, con las precauciones propias de cada etapa." },
      ],
      extras: [
        {
          titulo: "Una formación continua en terapia de las fascias",
          texto: "Las fascias son los tejidos que envuelven y conectan los músculos y los órganos, como una red por todo el cuerpo.",
        },
        {
          titulo: "Registrada en Yoga Alliance",
          texto:
            "Yoga Alliance es un registro internacional de docentes y escuelas de yoga. No otorga ningún título: incluye las formaciones que cumplen sus estándares.",
        },
      ],
    },
    fuentes: [
      { texto: "Schleip et al., Clinical Anatomy, 2019: definición de las fascias", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6852276/" },
      { texto: "La Scala Teixeira et al., Frontiers in Physiology, 2017: el entrenamiento funcional", href: "https://www.frontiersin.org/articles/10.3389/fphys.2017.00643/full" },
      { texto: "Yoga Alliance, Standards for RYT Credentials", href: "https://yogaalliance.org/Standards-for-RYT-Credentials" },
      { texto: "Yoga Alliance, Member Brand Guide, 2025", href: "https://yogaalliance.org/wp-content/uploads/2025/10/YA25-Member-Brand-Guide.pdf" },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/a-propos", TEXTOS[idioma].meta);
}

export default async function APropos() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados datos={[persona(idioma), paginaSobreSofia(idioma)]} />
      <EnteteDePage fil={t.fil} titulo={t.titulo} intro={t.intro} visual={<Portrait t={t.portrait} />} />
      <Histoire t={t.histoire} />
      <Reperes id="methode" fondo="salvia" titulo={t.metodo.titulo} intro={t.metodo.intro} reperes={t.metodo.reperes} />
      <Tapis t={t.tapis} />
      <Sources fuentes={t.fuentes} aviso={false} />
      <PourContinuer destinos={["prenatal", "cours", "ateliers"]} />
      <Contact />
    </main>
  );
}

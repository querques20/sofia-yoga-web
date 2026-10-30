import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Flux, type TextosFlux } from "@/components/cours/Flux";
import { Formats, type TextosFormats } from "@/components/cours/Formats";
import { Guerrier } from "@/components/ilustraciones/Guerrier";
import { Magnetique } from "@/components/Magnetique";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { IlustracionQueRespira } from "@/components/pagina/IlustracionQueRespira";
import { InfosPratiques } from "@/components/pagina/InfosPratiques";
import { InvitarAEscribir } from "@/components/pagina/InvitarAEscribir";
import { PedirInfos } from "@/components/pagina/PedirInfos";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { SurCettePage } from "@/components/pagina/SurCettePage";
import { Questions } from "@/components/pagina/Questions";
import { Reperes } from "@/components/pagina/Reperes";
import { Sources } from "@/components/pagina/Sources";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";
import { PREGUNTAS_COURS } from "@/contenido/preguntas";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { preguntasFrecuentes, servicio } from "@/lib/datos-estructurados";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa).
// lugares, días, horarios y precios todavía no los tenemos (contexto maestro, sección 6)
const fr = {
  meta: {
    title: "Cours de yoga à Genève",
    description:
      "Cours de vinyasa, yoga flow et yoga dynamique à Genève avec Sofia Costa. En groupe, en privé ou au parc. Nul besoin d’être fort.e ou souple.",
  },
  // el tipo de servicio que lee Google
  tipo: "Cours de yoga : vinyasa, yoga flow et yoga dynamique",
  fil: "Cours",
  titulo: (
    <>
      Cours de yoga <Mano>dynamique</Mano> à Genève
    </>
  ),
  intro: (
    <p>
      Vinyasa, yoga flow et yoga dynamique, en groupe, en privé ou au parc. Nul besoin d’être fort.e ou souple, viens
      comme tu es&nbsp;:)
    </p>
  ),
  escribir: "Écrire sur WhatsApp",
  ouQuand: "Où et quand",
  etiqueta: "Une femme dans la posture du guerrier II sur un tapis de yoga, les bras tendus, le regard vers la main avant",
  anclas: [
    { href: "#styles", texto: "Ma façon d’enseigner" },
    { href: "#apports", texto: "Ce que le yoga apporte" },
    { href: "#formats", texto: "Groupe, privé ou parc" },
    { href: "#ou", texto: "Où et quand" },
    { href: "#questions", texto: "Questions" },
  ],
  invitacion: <>Un de ces styles te parle&nbsp;? Écris-moi, je te dis où et quand ont lieu les prochains cours.</>,
  asunto: "Cours de yoga",
  aportesTitulo: "Ce que le yoga peut t’apporter",
  aportesIntro: "Ce que disent les instituts de santé et les études, sans exagérer.",
  // lo que el yoga puede aportar según los institutos de salud y las revisiones (sin agrandar nada)
  aportes: [
    {
      clave: "Le stress",
      texto: "Le yoga peut aider à réduire le stress, à mieux dormir et à prendre soin de sa santé mentale, selon l’institut de santé américain NCCIH.",
      fuente: "NCCIH, 2023",
    },
    {
      clave: "Le dos",
      texto:
        "Pour le mal au bas du dos chronique (sans cause précise), le yoga fait probablement mieux que pas d’exercice du tout, mais l’effet reste modeste, et proche de celui d’autres exercices pour le dos.",
      fuente: "Cochrane, 2022",
    },
    {
      clave: "L’équilibre",
      texto: "Des études montrent des progrès d’équilibre et, chez les personnes âgées, de souplesse et de force des jambes.",
      fuente: "NCCIH, 2023 ; Sivaramakrishnan et al., 2019",
    },
    {
      clave: "La force",
      texto: "Le yoga compte parmi les activités qui renforcent les muscles, à pratiquer au moins deux jours par semaine selon le NHS.",
      fuente: "NHS",
    },
    {
      clave: "La sécurité",
      texto: "Les blessures graves sont rares. Comme toujours, on écoute son corps, et tu me dis si tu as mal ou si tu es enceinte.",
      fuente: "NCCIH, 2023",
    },
  ],
  datosTitulo: "Où et quand",
  datos: [
    { dato: "Styles", valor: "Vinyasa, yoga flow et yoga dynamique" },
    { dato: "Formats", valor: "En groupe, en privé ou au parc" },
    { dato: "Où", valor: <>À Genève. Les lieux sont <AConfirmer /></> },
    { dato: "Quand", valor: <>Les jours et les horaires sont <AConfirmer /></> },
    { dato: "Tarifs", valor: <AConfirmer /> },
    { dato: "Paiement", valor: <AConfirmer /> },
    { dato: "Langue", valor: "Français" },
    { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga formée en Inde et en Suisse" },
    { dato: "Niveau", valor: "Tous niveaux : nul besoin d’être fort.e ou souple" },
  ],
  nota: "Les cours ne sont pas remboursés par l’assurance complémentaire.",
  pedirInfos: "Les lieux et les horaires arrivent bientôt. En attendant, écris-moi : je te dis où et quand ont lieu les prochains cours.",
  fuentes: [
    { texto: "NCCIH, Yoga: Effectiveness and Safety, 2023", href: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety" },
    { texto: "Cochrane, le yoga pour la lombalgie chronique non spécifique, 2022 (résumé en français)", href: "https://www.cochrane.org/fr/evidence/CD010671_yoga-chronic-non-specific-low-back-pain" },
    { texto: "Sivaramakrishnan et al., International Journal of Behavioral Nutrition and Physical Activity, 2019", href: "https://doi.org/10.1186/s12966-019-0789-2" },
    { texto: "NHS, Physical activity guidelines for adults aged 19 to 64", href: "https://www.nhs.uk/live-well/exercise/exercise-guidelines/physical-activity-guidelines-for-adults-aged-19-to-64/" },
    { texto: "OFSP, médecines complémentaires", href: "https://www.bag.admin.ch/fr/medecines-complementaires-pratiquees-par-des-medecins" },
    { texto: "Yoga Suisse, contributions des assurances aux cours de yoga", href: "https://www.yoga.ch/fr/cours-de-yoga/contributions-en-matiere-de-prevention-sante-pour-les-cours-de-yoga" },
  ],
  aviso: "Ces informations sont générales. Elles ne remplacent pas l’avis de ton médecin.",
  flux: {
    titulo: "Ma façon d’enseigner",
    // sus palabras de los audios del 30/9, pasadas al francés: las tiene que revisar ella
    principal: "Une pratique dynamique, différente et joyeuse, pour te concentrer sur ton corps et surtout bouger en conscience.",
    secundario: "Le plus important, c’est de t’amuser et d’y prendre du plaisir. Le résultat physique n’est qu’une conséquence.",
    // qué es cada uno, en una línea (definiciones generales; la del yoga dinámico es la de ella)
    definiciones: [
      { estilo: "Vinyasa", texto: "Les postures s’enchaînent de façon fluide, et chaque mouvement suit la respiration." },
      { estilo: "Yoga flow", texto: "Un nom souvent donné au vinyasa : on passe d’une posture à l’autre sans s’arrêter, au rythme du souffle." },
      { estilo: "Yoga dynamique", texto: "Un yoga en mouvement, plus tonique, pour te concentrer sur ton corps et bouger en conscience." },
    ],
  } satisfies TextosFlux,
  formats: {
    titulo: "Trois façons de pratiquer",
    grupo: { titulo: "En groupe", texto: "Le cours collectif, pour pratiquer avec d’autres." },
    privado: { titulo: "En privé", texto: "Un cours rien que pour toi.", enlace: "Les cours privés" },
    parque: {
      titulo: "Au parc",
      texto: (
        <>
          Le yoga en plein air. La saison et les lieux sont <AConfirmer />
        </>
      ),
    },
    embarazada: { pregunta: "Tu es enceinte ?", enlace: "Le yoga prénatal est fait pour toi" },
  } satisfies TextosFormats,
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Yoga classes in Geneva",
      description:
        "Vinyasa, yoga flow and dynamic yoga classes in Geneva with Sofia Costa. In a group, one-to-one or in the park. No need to be strong or flexible.",
    },
    tipo: "Yoga classes: vinyasa, yoga flow and dynamic yoga",
    fil: "Classes",
    titulo: (
      <>
        <Mano>Dynamic</Mano> yoga classes in Geneva
      </>
    ),
    intro: (
      <p>
        Vinyasa, yoga flow and dynamic yoga, in a group, one-to-one or in the park. No need to be strong or flexible, come
        as you are&nbsp;:)
      </p>
    ),
    escribir: "Message me on WhatsApp",
    ouQuand: "Where and when",
    etiqueta: "A woman in warrior II pose on a yoga mat, arms outstretched, gazing towards her front hand",
    anclas: [
      { href: "#styles", texto: "How I teach" },
      { href: "#apports", texto: "What yoga brings" },
      { href: "#formats", texto: "Group, private or park" },
      { href: "#ou", texto: "Where and when" },
      { href: "#questions", texto: "Questions" },
    ],
    invitacion: <>Does one of these styles speak to you? Write to me and I’ll tell you where and when the next classes are.</>,
    asunto: "Yoga classes",
    aportesTitulo: "What yoga can bring you",
    aportesIntro: "What health institutes and studies say, without exaggerating.",
    aportes: [
      {
        clave: "Stress",
        texto: "Yoga can help reduce stress, sleep better and look after your mental health, according to the US health institute NCCIH.",
        fuente: "NCCIH, 2023",
      },
      {
        clave: "Your back",
        texto:
          "For chronic low back pain (with no specific cause), yoga probably does better than no exercise at all, but the effect remains modest, and close to that of other back exercises.",
        fuente: "Cochrane, 2022",
      },
      {
        clave: "Balance",
        texto: "Studies show improvements in balance and, in older people, in flexibility and leg strength.",
        fuente: "NCCIH, 2023; Sivaramakrishnan et al., 2019",
      },
      {
        clave: "Strength",
        texto: "Yoga is one of the activities that strengthen muscles, to be done at least two days a week according to the NHS.",
        fuente: "NHS",
      },
      {
        clave: "Safety",
        texto: "Serious injuries are rare. As always, we listen to our bodies, and you tell me if something hurts or if you’re pregnant.",
        fuente: "NCCIH, 2023",
      },
    ],
    datosTitulo: "Where and when",
    datos: [
      { dato: "Styles", valor: "Vinyasa, yoga flow and dynamic yoga" },
      { dato: "Formats", valor: "In a group, one-to-one or in the park" },
      { dato: "Where", valor: <>In Geneva. The locations are <AConfirmer /></> },
      { dato: "When", valor: <>The days and times are <AConfirmer /></> },
      { dato: "Prices", valor: <AConfirmer /> },
      { dato: "Payment", valor: <AConfirmer /> },
      { dato: "Language", valor: "French" },
      { dato: "Teacher", valor: "Sofia Costa, yoga teacher trained in India and Switzerland" },
      { dato: "Level", valor: "All levels: no need to be strong or flexible" },
    ],
    nota: "The classes aren’t reimbursed by supplementary health insurance.",
    pedirInfos: "Locations and times are coming soon. In the meantime, write to me: I’ll tell you where and when the next classes are.",
    fuentes: [
      { texto: "NCCIH, Yoga: Effectiveness and Safety, 2023", href: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety" },
      { texto: "Cochrane, Yoga for chronic non-specific low back pain, 2022", href: "https://www.cochrane.org/evidence/CD010671_yoga-chronic-non-specific-low-back-pain" },
      { texto: "Sivaramakrishnan et al., International Journal of Behavioral Nutrition and Physical Activity, 2019", href: "https://doi.org/10.1186/s12966-019-0789-2" },
      { texto: "NHS, Physical activity guidelines for adults aged 19 to 64", href: "https://www.nhs.uk/live-well/exercise/exercise-guidelines/physical-activity-guidelines-for-adults-aged-19-to-64/" },
      { texto: "FOPH, complementary medicine (in French)", href: "https://www.bag.admin.ch/fr/medecines-complementaires-pratiquees-par-des-medecins" },
      { texto: "Yoga Suisse, insurance contributions towards yoga classes (in French)", href: "https://www.yoga.ch/fr/cours-de-yoga/contributions-en-matiere-de-prevention-sante-pour-les-cours-de-yoga" },
    ],
    aviso: "This is general information. It doesn’t replace your doctor’s advice.",
    flux: {
      titulo: "How I teach",
      principal: "A dynamic, different and joyful practice, to focus on your body and above all move with awareness.",
      secundario: "The most important thing is to have fun and enjoy it. The physical result is only a consequence.",
      definiciones: [
        { estilo: "Vinyasa", texto: "The postures flow into one another smoothly, and every movement follows the breath." },
        { estilo: "Yoga flow", texto: "A name often given to vinyasa: you move from one posture to the next without stopping, in time with your breath." },
        { estilo: "Dynamic yoga", texto: "Yoga in motion, more invigorating, so you can focus on your body and move with awareness." },
      ],
    },
    formats: {
      titulo: "Three ways to practise",
      grupo: { titulo: "In a group", texto: "The group class, to practise with others." },
      privado: { titulo: "One-to-one", texto: "A class just for you.", enlace: "Private classes" },
      parque: {
        titulo: "In the park",
        texto: (
          <>
            Yoga in the open air. The season and the locations are <AConfirmer />
          </>
        ),
      },
      embarazada: { pregunta: "Pregnant?", enlace: "Prenatal yoga is made for you" },
    },
  },
  es: {
    meta: {
      title: "Clases de yoga en Ginebra",
      description:
        "Clases de vinyasa, yoga flow y yoga dinámico en Ginebra con Sofia Costa. En grupo, en privado o en el parque. No hace falta ser fuerte ni flexible.",
    },
    tipo: "Clases de yoga: vinyasa, yoga flow y yoga dinámico",
    fil: "Clases",
    titulo: (
      <>
        Clases de yoga <Mano>dinámico</Mano> en Ginebra
      </>
    ),
    intro: (
      <p>
        Vinyasa, yoga flow y yoga dinámico, en grupo, en privado o en el parque. No hace falta ser fuerte ni flexible, ven
        tal como eres&nbsp;:)
      </p>
    ),
    escribir: "Escribir por WhatsApp",
    ouQuand: "Dónde y cuándo",
    etiqueta: "Una mujer en la postura del guerrero II sobre una esterilla de yoga, con los brazos extendidos y la mirada hacia la mano delantera",
    anclas: [
      { href: "#styles", texto: "Mi forma de enseñar" },
      { href: "#apports", texto: "Lo que aporta el yoga" },
      { href: "#formats", texto: "Grupo, privado o parque" },
      { href: "#ou", texto: "Dónde y cuándo" },
      { href: "#questions", texto: "Preguntas" },
    ],
    invitacion: <>¿Te habla alguno de estos estilos? Escríbeme y te digo dónde y cuándo son las próximas clases.</>,
    asunto: "Clases de yoga",
    aportesTitulo: "Lo que el yoga puede aportarte",
    aportesIntro: "Lo que dicen los institutos de salud y los estudios, sin exagerar.",
    aportes: [
      {
        clave: "El estrés",
        texto: "El yoga puede ayudar a reducir el estrés, a dormir mejor y a cuidar la salud mental, según el instituto de salud estadounidense NCCIH.",
        fuente: "NCCIH, 2023",
      },
      {
        clave: "La espalda",
        texto:
          "Para el dolor lumbar crónico (sin una causa concreta), el yoga probablemente funciona mejor que no hacer ningún ejercicio, pero el efecto sigue siendo modesto y parecido al de otros ejercicios para la espalda.",
        fuente: "Cochrane, 2022",
      },
      {
        clave: "El equilibrio",
        texto: "Hay estudios que muestran mejoras del equilibrio y, en personas mayores, de la flexibilidad y la fuerza de las piernas.",
        fuente: "NCCIH, 2023; Sivaramakrishnan et al., 2019",
      },
      {
        clave: "La fuerza",
        texto: "El yoga es una de las actividades que fortalecen los músculos, que según el NHS conviene practicar al menos dos días por semana.",
        fuente: "NHS",
      },
      {
        clave: "La seguridad",
        texto: "Las lesiones graves son raras. Como siempre, se escucha al cuerpo, y tú me dices si tienes dolor o si estás embarazada.",
        fuente: "NCCIH, 2023",
      },
    ],
    datosTitulo: "Dónde y cuándo",
    datos: [
      { dato: "Estilos", valor: "Vinyasa, yoga flow y yoga dinámico" },
      { dato: "Formatos", valor: "En grupo, en privado o en el parque" },
      { dato: "Dónde", valor: <>En Ginebra. Los lugares están <AConfirmer /></> },
      { dato: "Cuándo", valor: <>Los días y los horarios están <AConfirmer /></> },
      { dato: "Precios", valor: <AConfirmer /> },
      { dato: "Pago", valor: <AConfirmer /> },
      { dato: "Idioma", valor: "Francés" },
      { dato: "Con quién", valor: "Sofia Costa, profesora de yoga formada en la India y en Suiza" },
      { dato: "Nivel", valor: "Todos los niveles: no hace falta ser fuerte ni flexible" },
    ],
    nota: "El seguro complementario no reembolsa las clases.",
    pedirInfos: "Los lugares y los horarios llegarán pronto. Mientras tanto, escríbeme: te digo dónde y cuándo son las próximas clases.",
    fuentes: [
      { texto: "NCCIH, Yoga: Effectiveness and Safety, 2023", href: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety" },
      { texto: "Cochrane, el yoga para el dolor lumbar crónico inespecífico, 2022 (resumen en español)", href: "https://www.cochrane.org/es/evidence/CD010671_yoga-chronic-non-specific-low-back-pain" },
      { texto: "Sivaramakrishnan et al., International Journal of Behavioral Nutrition and Physical Activity, 2019", href: "https://doi.org/10.1186/s12966-019-0789-2" },
      { texto: "NHS, Physical activity guidelines for adults aged 19 to 64", href: "https://www.nhs.uk/live-well/exercise/exercise-guidelines/physical-activity-guidelines-for-adults-aged-19-to-64/" },
      { texto: "OFSP, medicinas complementarias (en francés)", href: "https://www.bag.admin.ch/fr/medecines-complementaires-pratiquees-par-des-medecins" },
      { texto: "Yoga Suisse, contribuciones de los seguros a las clases de yoga (en francés)", href: "https://www.yoga.ch/fr/cours-de-yoga/contributions-en-matiere-de-prevention-sante-pour-les-cours-de-yoga" },
    ],
    aviso: "Esta información es general. No reemplaza la opinión de tu médico.",
    flux: {
      titulo: "Mi forma de enseñar",
      principal: "Una práctica dinámica, diferente y alegre, para concentrarte en tu cuerpo y, sobre todo, moverte con consciencia.",
      secundario: "Lo más importante es divertirte y disfrutar. El resultado físico es solo una consecuencia.",
      definiciones: [
        { estilo: "Vinyasa", texto: "Las posturas se encadenan con fluidez, y cada movimiento sigue la respiración." },
        { estilo: "Yoga flow", texto: "Un nombre que suele darse al vinyasa: pasas de una postura a otra sin detenerte, al ritmo de la respiración." },
        { estilo: "Yoga dinámico", texto: "Un yoga en movimiento, más tónico, para concentrarte en tu cuerpo y moverte con consciencia." },
      ],
    },
    formats: {
      titulo: "Tres formas de practicar",
      grupo: { titulo: "En grupo", texto: "La clase colectiva, para practicar con otras personas." },
      privado: { titulo: "En privado", texto: "Una clase solo para ti.", enlace: "Las clases privadas" },
      parque: {
        titulo: "En el parque",
        texto: (
          <>
            Yoga al aire libre. La temporada y los lugares están <AConfirmer />
          </>
        ),
      },
      embarazada: { pregunta: "¿Estás embarazada?", enlace: "El yoga prenatal está hecho para ti" },
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/cours-de-yoga-geneve", TEXTOS[idioma].meta);
}

export default async function CoursDeYoga() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados datos={[servicio(idioma, { nombre: t.meta.title, tipo: t.tipo, ruta: "/cours-de-yoga-geneve", descripcion: t.meta.description }), preguntasFrecuentes(idioma, PREGUNTAS_COURS[idioma])]} />
      <EnteteDePage
        fil={t.fil}
        titulo={t.titulo}
        intro={t.intro}
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].cours)} target="_blank" rel="noopener noreferrer">
                {t.escribir}
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#ou">
              {t.ouQuand}
            </a>
          </>
        }
        visual={
          <IlustracionQueRespira
            viewBox="0 0 560 420"
            etiqueta={t.etiqueta}
            className="mx-auto aspect-[560/420] w-full max-w-[34rem] lg:mr-0"
          >
            <Guerrier />
          </IlustracionQueRespira>
        }
      />
      <SurCettePage anclas={t.anclas} />
      <Flux t={t.flux}>
        <InvitarAEscribir texto={t.invitacion} mensaje={MENSAJES[idioma].ouQuand} asunto={t.asunto} />
      </Flux>
      <Reperes id="apports" fondo="salvia" titulo={t.aportesTitulo} intro={<p>{t.aportesIntro}</p>} reperes={t.aportes} />
      <Formats t={t.formats} />
      <InfosPratiques id="ou" titulo={t.datosTitulo} datos={t.datos} nota={t.nota}>
        <PedirInfos mensaje={MENSAJES[idioma].ouQuand} texto={t.pedirInfos} />
      </InfosPratiques>
      <Questions preguntas={PREGUNTAS_COURS[idioma]} />
      <Sources fuentes={t.fuentes} aviso={t.aviso} />
      <PourContinuer destinos={["prives", "prenatal", "ateliers", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].cours} />
    </main>
  );
}

import { Contact } from "@/components/Contact";
import { Posparto } from "@/components/ilustraciones/Posparto";
import { Magnetique } from "@/components/Magnetique";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { IlustracionQueRespira } from "@/components/pagina/IlustracionQueRespira";
import { InfosPratiques } from "@/components/pagina/InfosPratiques";
import { InvitarAEscribir } from "@/components/pagina/InvitarAEscribir";
import { PedirInfos } from "@/components/pagina/PedirInfos";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { Questions } from "@/components/pagina/Questions";
import { Reperes } from "@/components/pagina/Reperes";
import { Signaux } from "@/components/pagina/Signaux";
import { Sources } from "@/components/pagina/Sources";
import { SurCettePage } from "@/components/pagina/SurCettePage";
import { CeQueLeYogaFait, type TextosCeQueLeYogaFait } from "@/components/post-partum/CeQueLeYogaFait";
import { Intensite, type TextosIntensite } from "@/components/post-partum/Intensite";
import { QuandReprendre, type TextosQuandReprendre } from "@/components/post-partum/QuandReprendre";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";
import { PREGUNTAS_POST_PARTUM } from "@/contenido/preguntas";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { preguntasFrecuentes, servicio } from "@/lib/datos-estructurados";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa). El posparto todavía tiene
// casi todo por confirmar: desde cuándo, si se viene con el bebé, dónde y cuánto.
// Los reperes salen del seguro básico suizo (OPAS, en Fedlex; y el folleto del periné de los HUG) y del periné
// y la diástasis con datos verificados (HUG, Cochrane, Sperstad 2016, Gluppe 2021, Beamish 2025, NHS); las
// señales de alarma, de la guía de vuelta al ejercicio posparto (Goom, Donnelly y Brockwell 2019) y de los HUG
const fr = {
  meta: {
    title: "Yoga post-partum à Genève",
    description:
      "Yoga post-partum et postnatal à Genève avec Sofia Costa : une reprise progressive, après la rééducation du périnée avec une physio.",
  },
  // el tipo de servicio del JSON-LD y el asunto del mail (el nombre del servicio es el título de la página)
  tipo: "Yoga post-partum",
  fil: "Post-partum",
  titulo: (
    <>
      Yoga <Mano>post-partum</Mano> à Genève
    </>
  ),
  intro: (
    <>
      <p>Pour reprendre le mouvement après l’accouchement, de l’intensité la plus douce à la plus exigeante.</p>
      <p>Un yoga postnatal qui respecte ton rythme&nbsp;: d’abord la rééducation du périnée, ensuite la pratique.</p>
    </>
  ),
  whatsapp: "Écrire sur WhatsApp",
  irAQuand: "Quand reprendre",
  ilustracion: "Une jeune maman de profil, les yeux fermés, qui serre contre elle son bébé emmailloté",
  anclas: [
    "Quand reprendre ?",
    "Bon à savoir en Suisse",
    "Une intensité progressive",
    "Périnée et diastase",
    "Les signaux à écouter",
    "Infos pratiques",
    "Questions",
  ],
  invitacion: <>Tu en es où&nbsp;? Dis-moi quand tu as accouché, je te réponds.</>,
  suisse: {
    titulo: "Bon à savoir en Suisse",
    intro: <p>Ce que l’assurance de base prévoit après la naissance. Vérifie les détails auprès de ta caisse maladie.</p>,
    reperes: [
      {
        clave: (
          <>
            6<sup className="sufijo">e</sup> à 10<sup className="sufijo">e</sup> semaine
          </>
        ),
        texto: "Le contrôle post-partum a lieu entre la sixième et la dixième semaine après la naissance. Il est pris en charge par l’assurance de base. C’est un bon moment pour parler de la reprise.",
        fuente: "OPAS, art. 13",
      },
      {
        clave: "56 jours",
        texto:
          "Les visites de la sage-femme à domicile sont remboursées pendant les 56 jours qui suivent la naissance : jusqu’à seize pour un premier bébé, une césarienne, une naissance prématurée ou multiple, et jusqu’à dix dans les autres cas.",
        fuente: "OPAS, art. 16",
      },
      {
        clave: "9 séances",
        texto:
          "La physiothérapie du plancher pelvien est remboursée par l’assurance de base sur ordonnance médicale, neuf séances au plus par ordonnance, après franchise et participation.",
        fuente: "OPAS, art. 5 ; HUG",
      },
      {
        clave: "Mes cours",
        texto: "Ils ne sont pas remboursés par l’assurance complémentaire.",
      },
    ],
  },
  perinee: {
    titulo: "Périnée et diastase, en clair",
    intro: <p>Deux mots qu’on entend beaucoup après l’accouchement. Ce qu’ils veulent dire, et ce que disent les études.</p>,
    reperes: [
      {
        clave: "Le périnée",
        texto:
          "Un ensemble de muscles qui ferme le bas du bassin et soutient, comme un hamac, la vessie, l’utérus et les intestins. Il joue un rôle important dans la continence.",
        fuente: "HUG, « Prendre soin de votre périnée »",
      },
      {
        clave: "Environ 1 sur 3",
        texto:
          "C’est la part des femmes qui ont des fuites urinaires dans les trois mois après l’accouchement ; jusqu’à une sur dix a des fuites de selles. C’est fréquent, et l’entraînement du périnée aide à les réduire.",
        fuente: "Cochrane, Woodley et al., 2020 ; Beamish et al., 2025",
      },
      {
        clave: "La diastase",
        texto:
          "Un écart entre les deux muscles grands droits, au milieu du ventre. Six semaines après un premier accouchement, environ 60 % des femmes en ont une. Un an après, environ une sur trois.",
        fuente: "Sperstad et al., 2016",
      },
      {
        clave: "Le mouvement",
        texto:
          "Des exercices ciblés, montrés par une physio, peuvent réduire un peu cet écart, mais les études sont encore peu nombreuses et de faible qualité. Ils aident, ils ne guérissent pas.",
        fuente: "Gluppe et al., 2021 ; Beamish et al., 2025 ; NHS",
      },
      {
        clave: "8 semaines",
        texto:
          "Si l’écart se voit encore bien huit semaines après la naissance, parles-en à ta gynécologue ou à ton médecin : une physio spécialisée peut l’évaluer.",
        fuente: "NHS",
      },
    ],
  },
  signaux: {
    titulo: "Les signaux à écouter",
    intro: <p>Pendant l’effort ou dans les jours qui suivent, certains signes veulent dire qu’il faut lever le pied et consulter.</p>,
    signaux: [
      "Des fuites d’urine, de gaz ou de selles",
      "Une envie d’uriner difficile à retenir",
      "Une lourdeur, une pression ou une « boule » dans le bas du ventre ou dans le vagin",
      "Des douleurs au bas du dos, au bassin ou pendant les rapports",
      "Des saignements qui reprennent ou qui augmentent avec l’effort",
      "Un ventre qui bombe au milieu pendant l’effort",
    ],
    cierre: "Si tu ressens l’un de ces signes, arrête l’exercice et parles-en à ta sage-femme, à ta gynécologue ou à ta physio.",
    fuente: "Goom, Donnelly et Brockwell, 2019 ; HUG",
  },
  infos: {
    datos: [
      { dato: "Dès quand", valor: <>Après la rééducation du périnée. Le nombre de semaines est <AConfirmer /></> },
      { dato: "Avec ton bébé", valor: <AConfirmer /> },
      { dato: "Où", valor: <>À Genève. Le lieu est <AConfirmer /></> },
      { dato: "Quand", valor: <>Le jour et l’horaire sont <AConfirmer /></> },
      { dato: "Tarif", valor: <AConfirmer /> },
      { dato: "Paiement", valor: <AConfirmer /> },
      { dato: "Langue", valor: "Français" },
      { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga, formée en yoga pré et postnatal" },
    ],
    nota: "Les cours ne sont pas remboursés par l’assurance complémentaire.",
    pedir: "Le lieu, l’horaire et le tarif arrivent bientôt. En attendant, écris-moi en me disant quand tu as accouché : je te réponds avec les détails.",
  },
  fuentes: [
    { texto: "HUG, « Prendre soin de votre périnée », 2025", href: "https://www.hug.ch/sites/interhug/files/documents/perinee.pdf" },
    {
      texto: "OFSPO et OFSP, Recommandations suisses en matière d’activité physique, 2022",
      href: "https://www.newsd.admin.ch/newsd/message/attachments/89988.pdf",
    },
    { texto: "Ordonnance sur les prestations de l’assurance des soins (OPAS), art. 5, 13 et 16", href: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/fr" },
    { texto: "OMS, lignes directrices sur l’activité physique, 2020 (résumé publié dans le BJSM)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7719906/" },
    { texto: "ACOG, Committee Opinion n° 804, 2020", href: "https://doi.org/10.1097/AOG.0000000000003772" },
    { texto: "Cochrane, Woodley et al., entraînement des muscles du plancher pelvien, 2020", href: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007471.pub4/full/fr" },
    { texto: "Sperstad et al., British Journal of Sports Medicine, 2016", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5013086/" },
    { texto: "Gluppe et al., revue systématique sur la diastase, 2021", href: "https://pubmed.ncbi.nlm.nih.gov/34391661/" },
    { texto: "Beamish et al., British Journal of Sports Medicine, 2025", href: "https://pubmed.ncbi.nlm.nih.gov/39694630/" },
    {
      texto: "Goom, Donnelly et Brockwell, Returning to running postnatal, 2019",
      href: "https://athleticsni.org/download/files/Returning_to_running_postnatal_guideline_for_medical_health_and_fitness_professionals_managing_this_population.05.pdf",
    },
    { texto: "Santé publique France, L’activité physique après l’accouchement, 2021", href: "https://www.sante.fr/lactivite-physique-apres-laccouchement" },
    { texto: "NHS, Your post-pregnancy body", href: "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/" },
  ],
  quandReprendre: {
    titulo: <>Quand reprendre&nbsp;?</>,
    intro: "Après l’accouchement, trois étapes, dans cet ordre.",
    etiquetaPasos: "Les étapes",
    pasos: [
      {
        titulo: "Le contrôle post-partum",
        corto: "Le contrôle",
        idea: (
          <>
            Entre la 6<sup>e</sup> et la 10<sup>e</sup> semaine après la naissance.
          </>
        ),
        texto: "C’est le bon moment pour parler de la rééducation du périnée, qui se fait sur ordonnance.",
      },
      {
        titulo: "La rééducation du périnée",
        corto: "Le périnée",
        idea: "Avec une physio. Elle est indispensable, et le yoga ne la remplace pas.",
        texto: "Aux HUG, elle commence en général deux à trois mois après l’accouchement et compte six à neuf séances.",
      },
      {
        titulo: "L’accord, puis le mouvement",
        corto: "Le mouvement",
        idea: "Avec l’accord de ta sage-femme ou de ta gynécologue.",
        texto: (
          <>
            Je ne te demande aucun document. On reprend tout en douceur, puis de plus en plus, comme le conseillent les
            recommandations suisses. Combien de semaines après l’accouchement&nbsp;? <AConfirmer />
          </>
        ),
      },
    ],
  } satisfies TextosQuandReprendre,
  intensite: {
    titulo: "Une intensité progressive",
    intro: "On commence par le plus doux, et l’intensité monte petit à petit, jusqu’au plus exigeant.",
    etapas: ["Tout en douceur", "Un peu plus", "Plus exigeant"],
    extremos: ["Le plus doux", "Le plus exigeant"],
  } satisfies TextosIntensite,
  yogaFait: {
    titulo: "Ce que mes exercices font, et ne font pas",
    intro: "Pour le périnée et la diastase, ils peuvent aider. Ils ne remplacent pas la physio.",
    pueden: {
      titulo: "Ils peuvent",
      items: ["Aider à améliorer la mobilité, la stabilité et la force du plancher pelvien.", "Aider à diminuer une diastase."],
    },
    noPueden: {
      titulo: "Ils ne peuvent pas",
      items: ["Guérir une diastase.", "Remplacer la rééducation du périnée avec une physio."],
    },
    aviso: "Je ne suis pas physiothérapeute.",
  } satisfies TextosCeQueLeYogaFait,
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Postnatal yoga in Geneva",
      description:
        "Postnatal yoga in Geneva with Sofia Costa: a gradual return to movement, after pelvic floor rehab with a physio.",
    },
    tipo: "Postnatal yoga",
    fil: "Postnatal",
    titulo: (
      <>
        <Mano>Postnatal</Mano> yoga in Geneva
      </>
    ),
    intro: (
      <>
        <p>To get moving again after giving birth, from the gentlest intensity to the most demanding.</p>
        <p>A postnatal yoga that respects your pace: pelvic floor rehab first, then the practice.</p>
      </>
    ),
    whatsapp: "Message me on WhatsApp",
    irAQuand: "When to resume",
    ilustracion: "A young mum in profile, eyes closed, holding her swaddled baby close",
    anclas: [
      "When to resume?",
      "Good to know in Switzerland",
      "Progressive intensity",
      "Pelvic floor and diastasis",
      "Signs to listen to",
      "Practical info",
      "Questions",
    ],
    invitacion: <>Where are you at? Tell me when you gave birth and I’ll reply.</>,
    suisse: {
      titulo: "Good to know in Switzerland",
      intro: <p>What basic health insurance covers after the birth. Check the details with your health insurer.</p>,
      reperes: [
        {
          clave: (
            <>
              6<sup className="sufijo">th</sup> to 10<sup className="sufijo">th</sup> week
            </>
          ),
          texto:
            "The postnatal check-up takes place between the sixth and tenth week after the birth. It is covered by basic health insurance. It’s a good time to talk about getting back to it.",
          fuente: "OPAS, art. 13",
        },
        {
          clave: "56 days",
          texto:
            "Home visits from a midwife are reimbursed during the 56 days after the birth: up to sixteen for a first baby, a caesarean, or a premature or multiple birth, and up to ten in other cases.",
          fuente: "OPAS, art. 16",
        },
        {
          clave: "9 sessions",
          texto:
            "Pelvic floor physiotherapy is reimbursed by basic health insurance with a doctor’s prescription, up to nine sessions per prescription, after the deductible and co-payment.",
          fuente: "OPAS, art. 5; HUG",
        },
        {
          clave: "My classes",
          texto: "They are not reimbursed by supplementary health insurance.",
        },
      ],
    },
    perinee: {
      titulo: "Pelvic floor and diastasis, explained",
      intro: <p>Two terms you hear a lot after giving birth. What they mean, and what the studies say.</p>,
      reperes: [
        {
          clave: "The pelvic floor",
          texto:
            "A group of muscles that closes the bottom of the pelvis and supports the bladder, uterus and bowel like a hammock. It plays an important role in continence.",
          fuente: "HUG, “Prendre soin de votre périnée”",
        },
        {
          clave: "About 1 in 3",
          texto:
            "That’s the proportion of women who experience urine leakage in the three months after giving birth; up to one in ten experiences leakage of stool. It’s common, and pelvic floor training helps reduce it.",
          fuente: "Cochrane, Woodley et al., 2020; Beamish et al., 2025",
        },
        {
          clave: "Diastasis recti",
          texto:
            "A gap between the two rectus abdominis muscles, in the middle of the belly. Six weeks after a first birth, about 60% of women have one. A year later, about one in three.",
          fuente: "Sperstad et al., 2016",
        },
        {
          clave: "Movement",
          texto:
            "Targeted exercises, shown by a physio, can reduce this gap a little, but the studies are still few and of low quality. They help; they don’t cure.",
          fuente: "Gluppe et al., 2021; Beamish et al., 2025; NHS",
        },
        {
          clave: "8 weeks",
          texto:
            "If the gap is still clearly visible eight weeks after the birth, talk to your gynaecologist or your doctor: a specialist physio can assess it.",
          fuente: "NHS",
        },
      ],
    },
    signaux: {
      titulo: "Signs to listen to",
      intro: <p>During exertion or in the days that follow, some signs mean it’s time to ease off and consult a professional.</p>,
      signaux: [
        "Leaking urine, gas or stool",
        "An urge to urinate that’s hard to hold back",
        "A heaviness, pressure or a “lump” in the lower belly or in the vagina",
        "Pain in the lower back, the pelvis or during sex",
        "Bleeding that starts again or increases with effort",
        "A belly that bulges in the middle during effort",
      ],
      cierre: "If you notice any of these signs, stop the exercise and talk to your midwife, your gynaecologist or your physio.",
      fuente: "Goom, Donnelly and Brockwell, 2019; HUG",
    },
    infos: {
      datos: [
        { dato: "From when", valor: <>After pelvic floor rehab. The number of weeks is <AConfirmer /></> },
        { dato: "With your baby", valor: <AConfirmer /> },
        { dato: "Where", valor: <>In Geneva. The venue is <AConfirmer /></> },
        { dato: "When", valor: <>The day and time are <AConfirmer /></> },
        { dato: "Price", valor: <AConfirmer /> },
        { dato: "Payment", valor: <AConfirmer /> },
        { dato: "Language", valor: "French" },
        { dato: "With", valor: "Sofia Costa, yoga teacher, trained in prenatal and postnatal yoga" },
      ],
      nota: "Classes are not reimbursed by supplementary health insurance.",
      pedir:
        "The venue, the schedule and the price are coming soon. In the meantime, write to me and tell me when you gave birth: I’ll reply with the details.",
    },
    fuentes: [
      { texto: "HUG, “Prendre soin de votre périnée”, 2025", href: "https://www.hug.ch/sites/interhug/files/documents/perinee.pdf" },
      {
        texto: "FOSPO and FOPH, Recommandations suisses en matière d’activité physique, 2022",
        href: "https://www.newsd.admin.ch/newsd/message/attachments/89988.pdf",
      },
      {
        texto: "Ordonnance sur les prestations de l’assurance des soins (OPAS), art. 5, 13 and 16",
        href: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/fr",
      },
      {
        texto: "WHO guidelines on physical activity, 2020 (summary published in the BJSM)",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7719906/",
      },
      { texto: "ACOG, Committee Opinion No. 804, 2020", href: "https://doi.org/10.1097/AOG.0000000000003772" },
      {
        texto: "Cochrane, Woodley et al., pelvic floor muscle training, 2020",
        href: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007471.pub4/full",
      },
      { texto: "Sperstad et al., British Journal of Sports Medicine, 2016", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5013086/" },
      { texto: "Gluppe et al., systematic review on diastasis, 2021", href: "https://pubmed.ncbi.nlm.nih.gov/34391661/" },
      { texto: "Beamish et al., British Journal of Sports Medicine, 2025", href: "https://pubmed.ncbi.nlm.nih.gov/39694630/" },
      {
        texto: "Goom, Donnelly and Brockwell, Returning to running postnatal, 2019",
        href: "https://athleticsni.org/download/files/Returning_to_running_postnatal_guideline_for_medical_health_and_fitness_professionals_managing_this_population.05.pdf",
      },
      {
        texto: "Santé publique France, L’activité physique après l’accouchement, 2021",
        href: "https://www.sante.fr/lactivite-physique-apres-laccouchement",
      },
      { texto: "NHS, Your post-pregnancy body", href: "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/" },
    ],
    quandReprendre: {
      titulo: <>When to resume?</>,
      intro: "After the birth, three steps, in this order.",
      etiquetaPasos: "The steps",
      pasos: [
        {
          titulo: "The postnatal check-up",
          corto: "The check-up",
          idea: (
            <>
              Between the 6<sup>th</sup> and 10<sup>th</sup> week after the birth.
            </>
          ),
          texto: "It’s a good time to talk about pelvic floor rehab, which is done on prescription.",
        },
        {
          titulo: "Pelvic floor rehab",
          corto: "Pelvic floor",
          idea: "With a physio. It’s essential, and yoga doesn’t replace it.",
          texto: "At the HUG (Geneva University Hospitals), it usually starts two to three months after the birth and involves six to nine sessions.",
        },
        {
          titulo: "The go-ahead, then movement",
          corto: "Movement",
          idea: "With the go-ahead from your midwife or gynaecologist.",
          texto: (
            <>
              I don’t ask you for any paperwork. We ease back in gently, then do more and more, as the Swiss
              recommendations advise. How many weeks after the birth? <AConfirmer />
            </>
          ),
        },
      ],
    },
    intensite: {
      titulo: "Progressive intensity",
      intro: "We start with the gentlest, and the intensity builds little by little, up to the most demanding.",
      etapas: ["Nice and gentle", "A little more", "More demanding"],
      extremos: ["The gentlest", "The most demanding"],
    },
    yogaFait: {
      titulo: "What my exercises do, and don’t do",
      intro: "For the pelvic floor and diastasis, they can help. They don’t replace the physio.",
      pueden: {
        titulo: "They can",
        items: ["Help improve the mobility, stability and strength of the pelvic floor.", "Help reduce a diastasis."],
      },
      noPueden: {
        titulo: "They can’t",
        items: ["Cure a diastasis.", "Replace pelvic floor rehab with a physio."],
      },
      aviso: "I’m not a physiotherapist.",
    },
  },
  es: {
    meta: {
      title: "Yoga posparto en Ginebra",
      description:
        "Yoga posparto en Ginebra con Sofia Costa: una vuelta progresiva al movimiento, después de la reeducación del suelo pélvico con una fisioterapeuta.",
    },
    tipo: "Yoga posparto",
    fil: "Posparto",
    titulo: (
      <>
        Yoga <Mano>posparto</Mano> en Ginebra
      </>
    ),
    intro: (
      <>
        <p>Para volver a moverte después del parto, de la intensidad más suave a la más exigente.</p>
        <p>Un yoga posparto que respeta tu ritmo: primero la reeducación del suelo pélvico, después la práctica.</p>
      </>
    ),
    whatsapp: "Escribir por WhatsApp",
    irAQuand: "Cuándo retomar",
    ilustracion: "Una joven mamá de perfil, con los ojos cerrados, que abraza contra sí a su bebé envuelto en una mantita",
    anclas: [
      "¿Cuándo retomar?",
      "Lo que conviene saber en Suiza",
      "Una intensidad progresiva",
      "Suelo pélvico y diástasis",
      "Las señales que hay que escuchar",
      "Información práctica",
      "Preguntas",
    ],
    invitacion: <>¿En qué momento estás? Cuéntame cuándo diste a luz y te respondo.</>,
    suisse: {
      titulo: "Lo que conviene saber en Suiza",
      intro: <p>Lo que prevé el seguro básico después del parto. Consulta los detalles con tu aseguradora de salud.</p>,
      reperes: [
        {
          clave: (
            <>
              6.<sup className="sufijo">ª</sup> a 10.<sup className="sufijo">ª</sup> semana
            </>
          ),
          texto:
            "El control posparto tiene lugar entre la sexta y la décima semana después del parto. Lo cubre el seguro básico. Es un buen momento para hablar de la vuelta al movimiento.",
          fuente: "OPAS, art. 13",
        },
        {
          clave: "56 días",
          texto:
            "Las visitas a domicilio de la matrona se reembolsan durante los 56 días posteriores al nacimiento: hasta dieciséis para un primer bebé, una cesárea, un nacimiento prematuro o múltiple, y hasta diez en los demás casos.",
          fuente: "OPAS, art. 16",
        },
        {
          clave: "9 sesiones",
          texto:
            "La fisioterapia del suelo pélvico la reembolsa el seguro básico con prescripción médica, con un máximo de nueve sesiones por prescripción, tras aplicar la franquicia y la participación en los costes.",
          fuente: "OPAS, art. 5; HUG",
        },
        {
          clave: "Mis clases",
          texto: "No las reembolsa el seguro complementario.",
        },
      ],
    },
    perinee: {
      titulo: "Suelo pélvico y diástasis, explicados",
      intro: <p>Dos palabras que se oyen mucho después del parto. Qué significan y qué dicen los estudios.</p>,
      reperes: [
        {
          clave: "El suelo pélvico",
          texto:
            "Un conjunto de músculos que cierra la parte baja de la pelvis y sostiene, como una hamaca, la vejiga, el útero y los intestinos. Tiene un papel importante en la continencia.",
          fuente: "HUG, «Prendre soin de votre périnée»",
        },
        {
          clave: "Alrededor de 1 de cada 3",
          texto:
            "Es la proporción de mujeres que tienen pérdidas de orina en los tres meses posteriores al parto; hasta una de cada diez tiene pérdidas de heces. Es frecuente, y el entrenamiento del suelo pélvico ayuda a reducirlas.",
          fuente: "Cochrane, Woodley et al., 2020; Beamish et al., 2025",
        },
        {
          clave: "La diástasis",
          texto:
            "Una separación entre los dos músculos rectos del abdomen, en el centro del vientre. Seis semanas después de un primer parto, alrededor del 60 % de las mujeres la tienen. Un año después, alrededor de una de cada tres.",
          fuente: "Sperstad et al., 2016",
        },
        {
          clave: "El movimiento",
          texto:
            "Los ejercicios específicos, mostrados por una fisioterapeuta, pueden reducir un poco esta separación, pero los estudios son todavía pocos y de baja calidad. Ayudan, pero no curan.",
          fuente: "Gluppe et al., 2021; Beamish et al., 2025; NHS",
        },
        {
          clave: "8 semanas",
          texto:
            "Si la separación se sigue notando claramente ocho semanas después del parto, habla con tu ginecóloga o con tu médico: una fisioterapeuta especializada puede evaluarla.",
          fuente: "NHS",
        },
      ],
    },
    signaux: {
      titulo: "Las señales que hay que escuchar",
      intro: <p>Durante el esfuerzo o en los días siguientes, ciertas señales indican que hay que bajar el ritmo y consultar a un profesional.</p>,
      signaux: [
        "Pérdidas de orina, de gases o de heces",
        "Unas ganas de orinar difíciles de contener",
        "Una sensación de pesadez, presión o un «bulto» en la parte baja del vientre o en la vagina",
        "Dolor en la parte baja de la espalda, en la pelvis o durante las relaciones sexuales",
        "Sangrado que reaparece o que aumenta con el esfuerzo",
        "Un vientre que se abomba en el centro durante el esfuerzo",
      ],
      cierre: "Si notas alguna de estas señales, detén el ejercicio y habla con tu matrona, tu ginecóloga o tu fisioterapeuta.",
      fuente: "Goom, Donnelly y Brockwell, 2019; HUG",
    },
    infos: {
      datos: [
        { dato: "Desde cuándo", valor: <>Después de la reeducación del suelo pélvico. El número de semanas está <AConfirmer /></> },
        { dato: "Con tu bebé", valor: <AConfirmer /> },
        { dato: "Dónde", valor: <>En Ginebra. El lugar está <AConfirmer /></> },
        { dato: "Cuándo", valor: <>El día y el horario están <AConfirmer /></> },
        { dato: "Tarifa", valor: <AConfirmer /> },
        { dato: "Pago", valor: <AConfirmer /> },
        { dato: "Idioma", valor: "Francés" },
        { dato: "Con quién", valor: "Sofia Costa, profesora de yoga, formada en yoga prenatal y posparto" },
      ],
      nota: "Las clases no las reembolsa el seguro complementario.",
      pedir:
        "El lugar, el horario y la tarifa llegarán pronto. Mientras tanto, escríbeme contándome cuándo diste a luz: te respondo con los detalles.",
    },
    fuentes: [
      { texto: "HUG, «Prendre soin de votre périnée», 2025", href: "https://www.hug.ch/sites/interhug/files/documents/perinee.pdf" },
      {
        texto: "OFSPO y OFSP, Recommandations suisses en matière d’activité physique, 2022",
        href: "https://www.newsd.admin.ch/newsd/message/attachments/89988.pdf",
      },
      {
        texto: "Ordonnance sur les prestations de l’assurance des soins (OPAS), arts. 5, 13 y 16",
        href: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/fr",
      },
      {
        texto: "OMS, directrices sobre actividad física, 2020 (resumen publicado en el BJSM)",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7719906/",
      },
      { texto: "ACOG, Committee Opinion n.º 804, 2020", href: "https://doi.org/10.1097/AOG.0000000000003772" },
      {
        texto: "Cochrane, Woodley et al., entrenamiento de los músculos del suelo pélvico, 2020",
        href: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007471.pub4/full/es",
      },
      { texto: "Sperstad et al., British Journal of Sports Medicine, 2016", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5013086/" },
      { texto: "Gluppe et al., revisión sistemática sobre la diástasis, 2021", href: "https://pubmed.ncbi.nlm.nih.gov/34391661/" },
      { texto: "Beamish et al., British Journal of Sports Medicine, 2025", href: "https://pubmed.ncbi.nlm.nih.gov/39694630/" },
      {
        texto: "Goom, Donnelly y Brockwell, Returning to running postnatal, 2019",
        href: "https://athleticsni.org/download/files/Returning_to_running_postnatal_guideline_for_medical_health_and_fitness_professionals_managing_this_population.05.pdf",
      },
      {
        texto: "Santé publique France, L’activité physique après l’accouchement, 2021",
        href: "https://www.sante.fr/lactivite-physique-apres-laccouchement",
      },
      { texto: "NHS, Your post-pregnancy body", href: "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/" },
    ],
    quandReprendre: {
      titulo: <>¿Cuándo retomar?</>,
      intro: "Después del parto, tres etapas, en este orden.",
      etiquetaPasos: "Las etapas",
      pasos: [
        {
          titulo: "El control posparto",
          corto: "El control",
          idea: (
            <>
              Entre la 6.<sup>ª</sup> y la 10.<sup>ª</sup> semana después del parto.
            </>
          ),
          texto: "Es un buen momento para hablar de la reeducación del suelo pélvico, que se hace con prescripción médica.",
        },
        {
          titulo: "La reeducación del suelo pélvico",
          corto: "El suelo pélvico",
          idea: "Con una fisioterapeuta. Es indispensable, y el yoga no la sustituye.",
          texto: "En los HUG (Hospitales Universitarios de Ginebra), suele empezar dos o tres meses después del parto y consta de seis a nueve sesiones.",
        },
        {
          titulo: "El visto bueno, luego el movimiento",
          corto: "El movimiento",
          idea: "Con el visto bueno de tu matrona o de tu ginecóloga.",
          texto: (
            <>
              No te pido ningún documento. Retomamos todo con suavidad y después cada vez más, como aconsejan las
              recomendaciones suizas. ¿Cuántas semanas después del parto? <AConfirmer />
            </>
          ),
        },
      ],
    },
    intensite: {
      titulo: "Una intensidad progresiva",
      intro: "Empezamos por lo más suave y la intensidad va subiendo poco a poco, hasta lo más exigente.",
      etapas: ["Con suavidad", "Un poco más", "Más exigente"],
      extremos: ["Lo más suave", "Lo más exigente"],
    },
    yogaFait: {
      titulo: "Lo que hacen mis ejercicios, y lo que no",
      intro: "Para el suelo pélvico y la diástasis, pueden ayudar. No sustituyen la fisioterapia.",
      pueden: {
        titulo: "Pueden",
        items: ["Ayudar a mejorar la movilidad, la estabilidad y la fuerza del suelo pélvico.", "Ayudar a reducir una diástasis."],
      },
      noPueden: {
        titulo: "No pueden",
        items: ["Curar una diástasis.", "Sustituir la reeducación del suelo pélvico con una fisioterapeuta."],
      },
      aviso: "No soy fisioterapeuta.",
    },
  },
};

const ANCLAS = ["#quand", "#suisse", "#intensite", "#diastase", "#signaux", "#infos", "#questions"];

export async function generateMetadata() {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/yoga-post-partum-geneve", TEXTOS[idioma].meta);
}

export default async function YogaPostPartum() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados datos={[servicio(idioma, { nombre: t.meta.title, tipo: t.tipo, ruta: "/yoga-post-partum-geneve", descripcion: t.meta.description }), preguntasFrecuentes(idioma, PREGUNTAS_POST_PARTUM[idioma])]} />
      <EnteteDePage
        fil={t.fil}
        titulo={t.titulo}
        intro={t.intro}
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].postPartum)} target="_blank" rel="noopener noreferrer">
                {t.whatsapp}
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#quand">
              {t.irAQuand}
            </a>
          </>
        }
        visual={
          <IlustracionQueRespira
            viewBox="0 0 400 520"
            etiqueta={t.ilustracion}
            className="mx-auto aspect-[400/520] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[27rem]"
          >
            <Posparto />
          </IlustracionQueRespira>
        }
      />
      <SurCettePage anclas={ANCLAS.map((href, i) => ({ href, texto: t.anclas[i] }))} />
      <QuandReprendre t={t.quandReprendre}>
        <InvitarAEscribir texto={t.invitacion} mensaje={MENSAJES[idioma].postPartum} asunto={t.tipo} enBanda />
      </QuandReprendre>
      {/* va por encima de la pila de arriba (por eso el relative): cuando la banda barre la pila, esta sección
          viene pegada detrás y su fondo tapa lo que queda */}
      <div className="relative">
        <Reperes id="suisse" fondo="salvia" titulo={t.suisse.titulo} intro={t.suisse.intro} reperes={t.suisse.reperes} />
      </div>
      <Intensite t={t.intensite} />
      <Reperes id="diastase" titulo={t.perinee.titulo} intro={t.perinee.intro} reperes={t.perinee.reperes} />
      <CeQueLeYogaFait t={t.yogaFait} />
      <Signaux id="signaux" titulo={t.signaux.titulo} intro={t.signaux.intro} signaux={t.signaux.signaux} cierre={t.signaux.cierre} fuente={t.signaux.fuente} />
      <InfosPratiques datos={t.infos.datos} nota={t.infos.nota}>
        <PedirInfos mensaje={MENSAJES[idioma].postPartum} texto={t.infos.pedir} />
      </InfosPratiques>
      <Questions preguntas={PREGUNTAS_POST_PARTUM[idioma]} />
      <Sources fuentes={t.fuentes} />
      <PourContinuer destinos={["prenatal", "cours", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].postPartum} />
    </main>
  );
}

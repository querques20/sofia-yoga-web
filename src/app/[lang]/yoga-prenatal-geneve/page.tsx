import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { Embarazada } from "@/components/ilustraciones/Embarazada";
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
import { Souligne } from "@/components/pagina/Souligne";
import { AvantDeVenir, type TextosAvantDeVenir } from "@/components/prenatal/AvantDeVenir";
import { ProgrammeEnLigne, type TextosProgrammeEnLigne } from "@/components/prenatal/ProgrammeEnLigne";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import { rutaEn, type Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";
import { PREGUNTAS_PRENATAL } from "@/contenido/preguntas";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { preguntasFrecuentes, servicio } from "@/lib/datos-estructurados";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa). Contenido de salud: se
// traduce sin sumar ni suavizar nada, y con cada cautela y cada fuente
const fr = {
  meta: {
    title: "Yoga prénatal à Genève",
    description:
      "Cours de yoga prénatal à Genève avec Sofia Costa, formée en yoga pré et postnatal. Avec l’accord de ta sage-femme ou de ta gynécologue.",
  },
  servicio: { nombre: "Yoga prénatal à Genève", tipo: "Yoga prénatal" },
  fil: "Yoga prénatal",
  titulo: (
    <>
      Yoga <Mano>prénatal</Mano> à Genève
    </>
  ),
  intro: (
    <>
      <p>Un cours pensé pour toi si tu es enceinte et que tu souhaites continuer à bouger consciemment pendant ta grossesse.</p>
      <p>Une pratique qui s’adapte à chaque trimestre, avec l’accord de ta sage-femme ou de ta gynécologue.</p>
    </>
  ),
  whatsapp: "Écrire sur WhatsApp",
  verInfos: "Voir les infos pratiques",
  ilustracion: "Une femme enceinte de profil, les yeux fermés, une main posée sur le ventre",
  anclas: [
    { href: "#pour-qui", texto: "C’est pour moi ?" },
    { href: "#pourquoi", texto: "Pourquoi bouger" },
    { href: "#avant", texto: "Avant de venir" },
    { href: "#signaux", texto: "Quand t’arrêter" },
    { href: "#trimestres", texto: "Trimestre par trimestre" },
    { href: "#infos", texto: "Infos pratiques" },
    { href: "#programme", texto: "Le programme en ligne" },
    { href: "#questions", texto: "Questions" },
  ],
  pourQui: {
    titulo: "C’est pour moi ?",
    destacado: "Si tu es enceinte et que tu as envie de bouger, oui. Nul besoin d’être fort.e ou souple, viens comme tu es :)",
    texto: "Le cours est en français. Je suis enregistrée auprès de Yoga Alliance et formée en yoga pré et postnatal.",
    parcours: "Mon parcours",
    invitar: "Tu te reconnais ? Dis-moi à combien de semaines tu es, je te réponds.",
    asunto: "Yoga prénatal",
  },
  // por qué moverse en el embarazo, con recomendaciones oficiales y estudios (y sin prometer de más)
  pourquoi: {
    titulo: "Pourquoi bouger pendant ta grossesse ?",
    intro: "Ce que disent les recommandations officielles et les études, sans promesse en l’air.",
    reperes: [
      {
        clave: "150 minutes",
        texto:
          "C’est le minimum d’activité physique modérée par semaine, en plusieurs fois, que conseillent l’OMS et les autorités suisses pendant la grossesse. Si tu ne bougeais pas avant, tu peux commencer petit à petit.",
        fuente: "OMS, 2020 ; OFSPO et OFSP, 2022",
      },
      {
        clave: "Le yoga",
        texto:
          "Pour la Haute Autorité de santé française, il ne présente pas de risque pendant la grossesse, à condition d’éviter les positions qui peuvent faire baisser la tension. La HAS et les recommandations suisses conseillent aussi des étirements doux.",
        fuente: "HAS, 2019 ; OFSPO et OFSP, 2022",
      },
      {
        clave: "Le stress",
        texto:
          "Les études associent le yoga prénatal à moins d’anxiété, de stress et de symptômes dépressifs. Leur qualité reste faible : c’est encourageant, pas encore prouvé.",
        fuente: "Corrigan et al., 2022 ; Villar-Alises et al., 2023",
      },
      {
        clave: "Le dos",
        texto:
          "Bouger, hors de l’eau ou dans l’eau, pourrait soulager les douleurs lombaires de la grossesse, avec des preuves de faible qualité. Pour le yoga en particulier, les études manquent encore.",
        fuente: "Cochrane, 2015",
      },
    ],
  },
  avant: {
    titulo: "Avant de venir",
    avisos: [
      {
        texto: (
          <>
            Avec l’<Souligne forma="rond">accord</Souligne> de ta sage-femme ou de ta gynécologue.
          </>
        ),
        detalle: "Je ne te demande aucun document.",
      },
      {
        texto: (
          <>
            Je ne suis pas <Souligne>physiothérapeute</Souligne>.
          </>
        ),
        detalle: "Je suis professeure de yoga, formée en yoga pré et postnatal (60 h).",
      },
      {
        texto: (
          <>
            En cas de placenta prævia ou de grossesse <Souligne>à risque</Souligne>, je ne peux pas t’accompagner.
          </>
        ),
      },
    ],
  } satisfies TextosAvantDeVenir,
  // los signos para parar y consultar, tal como los da la HAS (síntesis 2022), más el dolor de vientre de la ACOG
  signaux: {
    titulo: "Quand t’arrêter",
    intro: "Pendant une séance, ou en dehors, certains signes veulent dire qu’il faut s’arrêter tout de suite.",
    lista: [
      "Un essoufflement excessif qui ne passe pas au repos",
      "Une douleur ou une pression dans la poitrine",
      "Des contractions régulières et douloureuses",
      "Une douleur dans le ventre",
      "Des saignements vaginaux",
      "Une fuite de liquide amniotique",
      "Des vertiges, un malaise ou des maux de tête",
      "Une faiblesse musculaire qui gêne l’équilibre",
      "Une douleur ou un gonflement du mollet",
    ],
    cierre: "Arrête la séance et appelle ta sage-femme ou ta gynécologue. Une douleur dans la poitrine est une urgence : appelle le 144.",
    fuente: "HAS, 2022 ; ACOG, 2020",
  },
  // qué suele cambiar en cada trimestre y cómo se adapta la práctica, según las recomendaciones
  trimestres: {
    titulo: "Trimestre par trimestre",
    intro: "Chaque grossesse est différente. Voici ce qui change souvent, et comment la pratique s’adapte selon les recommandations.",
    etiquetas: [
      <Fragment key="t1">
        1<sup className="sufijo">er</sup> trimestre
      </Fragment>,
      <Fragment key="t2">
        2<sup className="sufijo">e</sup> trimestre
      </Fragment>,
      <Fragment key="t3">
        3<sup className="sufijo">e</sup> trimestre
      </Fragment>,
    ],
    reperes: [
      {
        texto:
          "Les nausées et la grande fatigue sont fréquentes : les jours difficiles, une pratique douce suffit. Si tu faisais déjà du yoga, tu peux continuer. Et on évite la chaleur : pas de yoga chaud.",
        fuente: "INSPQ ; OMS, 2020 ; ACOG",
      },
      {
        texto:
          "Le ventre s’arrondit et déplace le centre de gravité vers l’avant : l’équilibre change. Les ligaments deviennent souvent plus souples, alors on ne force pas les étirements. Et on évite les exercices allongée sur le dos, comme le conseille l’OMS après le premier trimestre.",
        fuente: "HAS, 2019 ; OMS, 2020",
      },
      {
        texto:
          "Le ventre prend de la place : on adapte les postures et on garde des appuis stables. On continue à respirer pendant l’effort, sans bloquer son souffle, et on écoute la fatigue.",
        fuente: "HAS, 2019 et 2022",
      },
    ],
  },
  // lo que sabemos del curso; lo demás lo tiene que confirmar Sofía
  infos: {
    datos: [
      { dato: "Où", valor: <>À Genève. Le lieu est <AConfirmer /></> },
      { dato: "Quand", valor: <>Le jour et l’horaire sont <AConfirmer /></> },
      { dato: "Dès quelle semaine", valor: <AConfirmer /> },
      { dato: "Durée", valor: <AConfirmer /> },
      { dato: "Tarif", valor: <AConfirmer /> },
      { dato: "Paiement", valor: <AConfirmer /> },
      { dato: "Langue", valor: "Français" },
      { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga, formée en yoga pré et postnatal" },
    ],
    nota: "Les cours ne sont pas remboursés par l’assurance complémentaire.",
    pedir: "Le lieu, l’horaire et le tarif arrivent bientôt. En attendant, écris-moi en me disant à combien de semaines tu es : je te réponds avec les détails.",
  },
  programa: {
    titulo: "Et si tu ne peux pas venir ?",
    texto: (
      <>
        Le programme en ligne <strong>Grossesse en mouvement</strong> arrive bientôt. Il sera organisé par trimestre,
        avec une partie yang, dynamique, et une partie yin, douce. Des vidéos, des PDF et des textes, à suivre chez
        toi.
      </>
    ),
    // su texto del programa, tal cual lo escribió (contexto maestro, sección 7)
    cita: "Il est fait pour t’accompagner d’une manière douce et bienveillante. Il t’aidera à te (re)connecter à toi et à ton bébé, à soulager les éventuelles douleurs qui peuvent apparaître pendant ces 9 mois, à faire le plein d’énergie, et à reprendre confiance en toi et en ton corps pour le jour de l’accouchement.",
    firma: "Tu es enceinte, pas malade",
    etiquetaTrimestres: "Les trois trimestres du programme",
    yang: "La partie yang, dynamique",
    yin: "La partie yin, douce",
    boton: "Être prévenue du lancement",
  } satisfies Omit<TextosProgrammeEnLigne, "trimestres">,
  fuentes: [
    {
      texto: "OMS, lignes directrices sur l’activité physique et la sédentarité, en un coup d’œil, 2020",
      href: "https://www.who.int/fr/publications-detail/9789240014886",
    },
    {
      texto: "OFSPO, OFSP et al., Recommandations suisses en matière d’activité physique, 2022",
      href: "https://www.newsd.admin.ch/newsd/message/attachments/89988.pdf",
    },
    {
      texto: "HAS, activité physique pendant la grossesse et le post-partum, synthèse, 2022",
      href: "https://www.has-sante.fr/upload/docs/application/pdf/2022-08/synthese_aps_grossesse_post_partum_vf.pdf",
    },
    {
      texto: "HAS, référentiel « Grossesse et activité physique », 2019",
      href: "https://www.has-sante.fr/upload/docs/application/pdf/2019-07/app_329_ref_aps_grossesse_vf.pdf",
    },
    { texto: "ACOG, Committee Opinion n° 804, 2020", href: "https://doi.org/10.1097/AOG.0000000000003772" },
    { texto: "ACOG, Exercise During Pregnancy (FAQ), 2024", href: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy" },
    { texto: "Lignes directrices canadiennes sur l’activité physique pendant la grossesse, 2019", href: "https://bjsm.bmj.com/content/52/21/1339" },
    { texto: "Corrigan et al., BMC Pregnancy and Childbirth, 2022", href: "https://doi.org/10.1186/s12884-022-04474-9" },
    { texto: "Villar-Alises et al., IJERPH, 2023", href: "https://doi.org/10.3390/ijerph20021556" },
    { texto: "Cochrane, douleurs lombaires et pelviennes pendant la grossesse, 2015", href: "https://doi.org/10.1002/14651858.CD001139.pub4" },
    {
      texto: "INSPQ, activité physique et mieux-être pendant la grossesse",
      href: "https://www.inspq.qc.ca/information-perinatale/fiches/activite-physique-et-mieux-etre/fiche-complete",
    },
    { texto: "Ordonnance sur les prestations de l’assurance des soins (OPAS), art. 14", href: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/fr" },
  ],
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Prenatal yoga in Geneva",
      description:
        "Prenatal yoga classes in Geneva with Sofia Costa, trained in pre- and postnatal yoga. With the approval of your midwife or gynaecologist.",
    },
    servicio: { nombre: "Prenatal yoga in Geneva", tipo: "Prenatal yoga" },
    fil: "Prenatal yoga",
    titulo: (
      <>
        <Mano>Prenatal</Mano> yoga in Geneva
      </>
    ),
    intro: (
      <>
        <p>A class designed for you if you’re pregnant and want to keep moving mindfully throughout your pregnancy.</p>
        <p>A practice that adapts to each trimester, with the approval of your midwife or gynaecologist.</p>
      </>
    ),
    whatsapp: "Write on WhatsApp",
    verInfos: "See the practical info",
    ilustracion: "A pregnant woman in profile, eyes closed, one hand resting on her belly",
    anclas: [
      { href: "#pour-qui", texto: "Is it for me?" },
      { href: "#pourquoi", texto: "Why move" },
      { href: "#avant", texto: "Before you come" },
      { href: "#signaux", texto: "When to stop" },
      { href: "#trimestres", texto: "Trimester by trimester" },
      { href: "#infos", texto: "Practical info" },
      { href: "#programme", texto: "The online programme" },
      { href: "#questions", texto: "Questions" },
    ],
    pourQui: {
      titulo: "Is it for me?",
      destacado: "If you’re pregnant and feel like moving, yes. You don’t need to be strong or flexible, come as you are :)",
      texto: "The class is in French. I’m registered with Yoga Alliance and trained in pre- and postnatal yoga.",
      parcours: "My background",
      invitar: "Sound like you? Tell me how many weeks along you are and I’ll reply.",
      asunto: "Prenatal yoga",
    },
    pourquoi: {
      titulo: "Why move during your pregnancy?",
      intro: "What the official recommendations and the studies say, with no empty promises.",
      reperes: [
        {
          clave: "150 minutes",
          texto:
            "That’s the minimum amount of moderate physical activity per week, spread over several sessions, that the WHO and the Swiss authorities recommend during pregnancy. If you weren’t moving much before, you can start little by little.",
          fuente: "WHO, 2020; FOSPO and FOPH, 2022",
        },
        {
          clave: "Yoga",
          texto:
            "According to the French National Authority for Health (HAS), it carries no risk during pregnancy, as long as you avoid positions that can lower blood pressure. The HAS and the Swiss recommendations also advise gentle stretching.",
          fuente: "HAS, 2019; FOSPO and FOPH, 2022",
        },
        {
          clave: "Stress",
          texto:
            "Studies link prenatal yoga to less anxiety, stress and depressive symptoms. Their quality remains low: it’s encouraging, not yet proven.",
          fuente: "Corrigan et al., 2022; Villar-Alises et al., 2023",
        },
        {
          clave: "Your back",
          texto:
            "Moving, in or out of the water, could ease the lower back pain of pregnancy, with low-quality evidence. For yoga in particular, studies are still lacking.",
          fuente: "Cochrane, 2015",
        },
      ],
    },
    avant: {
      titulo: "Before you come",
      avisos: [
        {
          texto: (
            <>
              With the <Souligne forma="rond">approval</Souligne> of your midwife or gynaecologist.
            </>
          ),
          detalle: "I don’t ask you for any documents.",
        },
        {
          texto: (
            <>
              I’m not a <Souligne>physiotherapist</Souligne>.
            </>
          ),
          detalle: "I’m a yoga teacher, trained in pre- and postnatal yoga (60 h).",
        },
        {
          texto: (
            <>
              If you have placenta praevia or a <Souligne>high-risk</Souligne> pregnancy, I can’t work with you.
            </>
          ),
        },
      ],
    },
    signaux: {
      titulo: "When to stop",
      intro: "During a session, or outside one, certain signs mean you need to stop straight away.",
      lista: [
        "Excessive breathlessness that doesn’t ease with rest",
        "Chest pain or pressure",
        "Regular, painful contractions",
        "Pain in your belly",
        "Vaginal bleeding",
        "Leaking of amniotic fluid",
        "Dizziness, feeling faint or unwell, or headaches",
        "Muscle weakness that affects your balance",
        "Calf pain or swelling",
      ],
      cierre: "Stop the session and call your midwife or gynaecologist. Chest pain is an emergency: call 144.",
      fuente: "HAS, 2022; ACOG, 2020",
    },
    trimestres: {
      titulo: "Trimester by trimester",
      intro: "Every pregnancy is different. Here is what often changes, and how the practice adapts according to the recommendations.",
      etiquetas: [
        <Fragment key="t1">
          1<sup className="sufijo">st</sup> trimester
        </Fragment>,
        <Fragment key="t2">
          2<sup className="sufijo">nd</sup> trimester
        </Fragment>,
        <Fragment key="t3">
          3<sup className="sufijo">rd</sup> trimester
        </Fragment>,
      ],
      reperes: [
        {
          texto:
            "Nausea and heavy tiredness are common: on difficult days, a gentle practice is enough. If you were already doing yoga, you can carry on. And we avoid heat: no hot yoga.",
          fuente: "INSPQ; WHO, 2020; ACOG",
        },
        {
          texto:
            "Your belly rounds out and shifts your centre of gravity forwards: your balance changes. Ligaments often become more supple, so we don’t force the stretches. And we avoid exercises lying on your back, as the WHO advises after the first trimester.",
          fuente: "HAS, 2019; WHO, 2020",
        },
        {
          texto:
            "Your belly takes up more room: we adapt the postures and keep stable support points. We keep breathing through the effort, without holding our breath, and we listen to fatigue.",
          fuente: "HAS, 2019 and 2022",
        },
      ],
    },
    infos: {
      datos: [
        { dato: "Where", valor: <>In Geneva. The venue is <AConfirmer /></> },
        { dato: "When", valor: <>The day and time are <AConfirmer /></> },
        { dato: "From which week", valor: <AConfirmer /> },
        { dato: "Duration", valor: <AConfirmer /> },
        { dato: "Price", valor: <AConfirmer /> },
        { dato: "Payment", valor: <AConfirmer /> },
        { dato: "Language", valor: "French" },
        { dato: "With whom", valor: "Sofia Costa, yoga teacher, trained in pre- and postnatal yoga" },
      ],
      nota: "The classes are not reimbursed by supplementary health insurance.",
      pedir: "The venue, time and price are coming soon. In the meantime, write to me and tell me how many weeks along you are: I’ll reply with the details.",
    },
    programa: {
      titulo: "What if you can’t come?",
      texto: (
        <>
          The online programme <strong>Grossesse en mouvement</strong> is coming soon. It will be organised by trimester, with a dynamic yang
          part and a gentle yin part. Videos, PDFs and texts to follow at home.
        </>
      ),
      cita: "It’s made to support you in a gentle, caring way. It will help you (re)connect with yourself and your baby, ease any aches and pains that may come up during these 9 months, recharge your energy, and regain trust in yourself and your body for the day of the birth.",
      firma: "You’re pregnant, not ill",
      etiquetaTrimestres: "The three trimesters of the programme",
      yang: "The dynamic yang part",
      yin: "The gentle yin part",
      boton: "Get notified of the launch",
    },
    fuentes: [
      {
        texto: "WHO, Guidelines on physical activity and sedentary behaviour: at a glance, 2020",
        href: "https://www.who.int/fr/publications-detail/9789240014886",
      },
      {
        texto: "FOSPO, FOPH et al., Swiss physical activity recommendations, 2022",
        href: "https://www.newsd.admin.ch/newsd/message/attachments/89988.pdf",
      },
      {
        texto: "HAS, physical activity during pregnancy and the postnatal period, summary, 2022",
        href: "https://www.has-sante.fr/upload/docs/application/pdf/2022-08/synthese_aps_grossesse_post_partum_vf.pdf",
      },
      {
        texto: "HAS, reference framework “Grossesse et activité physique”, 2019",
        href: "https://www.has-sante.fr/upload/docs/application/pdf/2019-07/app_329_ref_aps_grossesse_vf.pdf",
      },
      { texto: "ACOG, Committee Opinion No. 804, 2020", href: "https://doi.org/10.1097/AOG.0000000000003772" },
      { texto: "ACOG, Exercise During Pregnancy (FAQ), 2024", href: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy" },
      { texto: "Canadian guideline for physical activity throughout pregnancy, 2019", href: "https://bjsm.bmj.com/content/52/21/1339" },
      { texto: "Corrigan et al., BMC Pregnancy and Childbirth, 2022", href: "https://doi.org/10.1186/s12884-022-04474-9" },
      { texto: "Villar-Alises et al., IJERPH, 2023", href: "https://doi.org/10.3390/ijerph20021556" },
      { texto: "Cochrane, low back and pelvic pain during pregnancy, 2015", href: "https://doi.org/10.1002/14651858.CD001139.pub4" },
      {
        texto: "INSPQ, physical activity and well-being during pregnancy",
        href: "https://www.inspq.qc.ca/information-perinatale/fiches/activite-physique-et-mieux-etre/fiche-complete",
      },
      { texto: "Ordonnance sur les prestations de l’assurance des soins (OPAS), Art. 14", href: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/fr" },
    ],
  },
  es: {
    meta: {
      title: "Yoga prenatal en Ginebra",
      description:
        "Clases de yoga prenatal en Ginebra con Sofia Costa, formada en yoga pre y posnatal. Con la aprobación de tu matrona o de tu ginecóloga.",
    },
    servicio: { nombre: "Yoga prenatal en Ginebra", tipo: "Yoga prenatal" },
    fil: "Yoga prenatal",
    titulo: (
      <>
        Yoga <Mano>prenatal</Mano> en Ginebra
      </>
    ),
    intro: (
      <>
        <p>Una clase pensada para ti si estás embarazada y quieres seguir moviéndote de forma consciente durante tu embarazo.</p>
        <p>Una práctica que se adapta a cada trimestre, con la aprobación de tu matrona o de tu ginecóloga.</p>
      </>
    ),
    whatsapp: "Escribir por WhatsApp",
    verInfos: "Ver la información práctica",
    ilustracion: "Una mujer embarazada de perfil, con los ojos cerrados y una mano apoyada en el vientre",
    anclas: [
      { href: "#pour-qui", texto: "¿Es para mí?" },
      { href: "#pourquoi", texto: "Por qué moverte" },
      { href: "#avant", texto: "Antes de venir" },
      { href: "#signaux", texto: "Cuándo parar" },
      { href: "#trimestres", texto: "Trimestre a trimestre" },
      { href: "#infos", texto: "Información práctica" },
      { href: "#programme", texto: "El programa online" },
      { href: "#questions", texto: "Preguntas" },
    ],
    pourQui: {
      titulo: "¿Es para mí?",
      destacado: "Si estás embarazada y tienes ganas de moverte, sí. No hace falta ser fuerte ni flexible, ven como estés :)",
      texto: "La clase es en francés. Estoy registrada en Yoga Alliance y formada en yoga pre y posnatal.",
      parcours: "Mi trayectoria",
      invitar: "¿Te reconoces? Dime de cuántas semanas estás y te respondo.",
      asunto: "Yoga prenatal",
    },
    pourquoi: {
      titulo: "¿Por qué moverte durante el embarazo?",
      intro: "Lo que dicen las recomendaciones oficiales y los estudios, sin promesas vacías.",
      reperes: [
        {
          clave: "150 minutos",
          texto:
            "Es el mínimo de actividad física moderada por semana, repartido en varias veces, que recomiendan la OMS y las autoridades suizas durante el embarazo. Si antes no te movías, puedes empezar poco a poco.",
          fuente: "OMS, 2020; OFSPO y OFSP, 2022",
        },
        {
          clave: "El yoga",
          texto:
            "Para la Alta Autoridad de Salud francesa (HAS), no presenta riesgo durante el embarazo, siempre que se eviten las posturas que pueden hacer bajar la tensión. La HAS y las recomendaciones suizas aconsejan también los estiramientos suaves.",
          fuente: "HAS, 2019; OFSPO y OFSP, 2022",
        },
        {
          clave: "El estrés",
          texto:
            "Los estudios asocian el yoga prenatal con menos ansiedad, estrés y síntomas depresivos. Su calidad sigue siendo baja: es alentador, pero todavía no está demostrado.",
          fuente: "Corrigan et al., 2022; Villar-Alises et al., 2023",
        },
        {
          clave: "La espalda",
          texto:
            "Moverse, fuera del agua o dentro de ella, podría aliviar los dolores lumbares del embarazo, con pruebas de baja calidad. En el caso del yoga en particular, todavía faltan estudios.",
          fuente: "Cochrane, 2015",
        },
      ],
    },
    avant: {
      titulo: "Antes de venir",
      avisos: [
        {
          texto: (
            <>
              Con la <Souligne forma="rond">aprobación</Souligne> de tu matrona o de tu ginecóloga.
            </>
          ),
          detalle: "No te pido ningún documento.",
        },
        {
          texto: (
            <>
              No soy <Souligne>fisioterapeuta</Souligne>.
            </>
          ),
          detalle: "Soy profesora de yoga, formada en yoga pre y posnatal (60 h).",
        },
        {
          texto: (
            <>
              En caso de placenta previa o de embarazo <Souligne>de riesgo</Souligne>, no puedo acompañarte.
            </>
          ),
        },
      ],
    },
    signaux: {
      titulo: "Cuándo parar",
      intro: "Durante una sesión, o fuera de ella, algunos signos indican que hay que parar de inmediato.",
      lista: [
        "Una falta de aire excesiva que no pasa con el reposo",
        "Un dolor o una presión en el pecho",
        "Contracciones regulares y dolorosas",
        "Un dolor en el vientre",
        "Sangrado vaginal",
        "Una pérdida de líquido amniótico",
        "Mareos, malestar general o dolores de cabeza",
        "Una debilidad muscular que dificulta el equilibrio",
        "Un dolor o una hinchazón en la pantorrilla",
      ],
      cierre: "Detén la sesión y llama a tu matrona o a tu ginecóloga. Un dolor en el pecho es una urgencia: llama al 144.",
      fuente: "HAS, 2022; ACOG, 2020",
    },
    trimestres: {
      titulo: "Trimestre a trimestre",
      intro: "Cada embarazo es diferente. Esto es lo que suele cambiar, y cómo se adapta la práctica según las recomendaciones.",
      etiquetas: [
        <Fragment key="t1">
          1.<sup className="sufijo">er</sup> trimestre
        </Fragment>,
        <Fragment key="t2">
          2.<sup className="sufijo">º</sup> trimestre
        </Fragment>,
        <Fragment key="t3">
          3.<sup className="sufijo">er</sup> trimestre
        </Fragment>,
      ],
      reperes: [
        {
          texto:
            "Las náuseas y el mucho cansancio son frecuentes: los días difíciles, basta con una práctica suave. Si ya hacías yoga, puedes continuar. Y se evita el calor: nada de yoga caliente.",
          fuente: "INSPQ; OMS, 2020; ACOG",
        },
        {
          texto:
            "El vientre se redondea y desplaza el centro de gravedad hacia adelante: el equilibrio cambia. Los ligamentos suelen volverse más flexibles, así que no se fuerzan los estiramientos. Y se evitan los ejercicios acostada boca arriba, como aconseja la OMS después del primer trimestre.",
          fuente: "HAS, 2019; OMS, 2020",
        },
        {
          texto:
            "El vientre ocupa más espacio: se adaptan las posturas y se mantienen apoyos estables. Se sigue respirando durante el esfuerzo, sin bloquear la respiración, y se escucha el cansancio.",
          fuente: "HAS, 2019 y 2022",
        },
      ],
    },
    infos: {
      datos: [
        { dato: "Dónde", valor: <>En Ginebra. El lugar está <AConfirmer /></> },
        { dato: "Cuándo", valor: <>El día y el horario están <AConfirmer /></> },
        { dato: "Desde qué semana", valor: <AConfirmer /> },
        { dato: "Duración", valor: <AConfirmer /> },
        { dato: "Tarifa", valor: <AConfirmer /> },
        { dato: "Pago", valor: <AConfirmer /> },
        { dato: "Idioma", valor: "Francés" },
        { dato: "Con quién", valor: "Sofia Costa, profesora de yoga, formada en yoga pre y posnatal" },
      ],
      nota: "Las clases no las reembolsa el seguro complementario.",
      pedir: "El lugar, el horario y la tarifa llegarán pronto. Mientras tanto, escríbeme diciéndome de cuántas semanas estás: te respondo con los detalles.",
    },
    programa: {
      titulo: "¿Y si no puedes venir?",
      texto: (
        <>
          El programa online <strong>Grossesse en mouvement</strong> llegará pronto. Estará organizado por trimestres, con una parte yang,
          dinámica, y una parte yin, suave. Vídeos, PDF y textos para seguir en casa.
        </>
      ),
      cita: "Está hecho para acompañarte de una manera suave y cariñosa. Te ayudará a (re)conectar contigo y con tu bebé, a aliviar los posibles dolores que pueden aparecer durante estos 9 meses, a recargarte de energía y a recuperar la confianza en ti y en tu cuerpo para el día del parto.",
      firma: "Estás embarazada, no enferma",
      etiquetaTrimestres: "Los tres trimestres del programa",
      yang: "La parte yang, dinámica",
      yin: "La parte yin, suave",
      boton: "Que me avisen del lanzamiento",
    },
    fuentes: [
      {
        texto: "OMS, Directrices de la OMS sobre actividad física y hábitos sedentarios: de un vistazo, 2020",
        href: "https://www.who.int/fr/publications-detail/9789240014886",
      },
      {
        texto: "OFSPO, OFSP et al., Recomendaciones suizas de actividad física, 2022",
        href: "https://www.newsd.admin.ch/newsd/message/attachments/89988.pdf",
      },
      {
        texto: "HAS, actividad física durante el embarazo y el posparto, síntesis, 2022",
        href: "https://www.has-sante.fr/upload/docs/application/pdf/2022-08/synthese_aps_grossesse_post_partum_vf.pdf",
      },
      {
        texto: "HAS, referencial «Grossesse et activité physique», 2019",
        href: "https://www.has-sante.fr/upload/docs/application/pdf/2019-07/app_329_ref_aps_grossesse_vf.pdf",
      },
      { texto: "ACOG, Committee Opinion n.º 804, 2020", href: "https://doi.org/10.1097/AOG.0000000000003772" },
      { texto: "ACOG, Exercise During Pregnancy (FAQ), 2024", href: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy" },
      { texto: "Directrices canadienses sobre la actividad física durante el embarazo, 2019", href: "https://bjsm.bmj.com/content/52/21/1339" },
      { texto: "Corrigan et al., BMC Pregnancy and Childbirth, 2022", href: "https://doi.org/10.1186/s12884-022-04474-9" },
      { texto: "Villar-Alises et al., IJERPH, 2023", href: "https://doi.org/10.3390/ijerph20021556" },
      { texto: "Cochrane, dolor lumbar y pélvico durante el embarazo, 2015", href: "https://doi.org/10.1002/14651858.CD001139.pub4" },
      {
        texto: "INSPQ, actividad física y bienestar durante el embarazo",
        href: "https://www.inspq.qc.ca/information-perinatale/fiches/activite-physique-et-mieux-etre/fiche-complete",
      },
      { texto: "Ordonnance sur les prestations de l’assurance des soins (OPAS), art. 14", href: "https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/fr" },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/yoga-prenatal-geneve", TEXTOS[idioma].meta);
}

export default async function YogaPrenatal() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados
        datos={[
          servicio(idioma, { nombre: t.servicio.nombre, tipo: t.servicio.tipo, ruta: "/yoga-prenatal-geneve", descripcion: t.meta.description }),
          preguntasFrecuentes(idioma, PREGUNTAS_PRENATAL[idioma]),
        ]}
      />
      <EnteteDePage
        fil={t.fil}
        titulo={t.titulo}
        intro={t.intro}
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].prenatal)} target="_blank" rel="noopener noreferrer">
                {t.whatsapp}
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#infos">
              {t.verInfos}
            </a>
          </>
        }
        visual={
          <IlustracionQueRespira
            viewBox="0 0 400 520"
            etiqueta={t.ilustracion}
            torso="180 300"
            className="mx-auto aspect-[400/520] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[27rem]"
          >
            <Embarazada />
          </IlustracionQueRespira>
        }
      />

      <SurCettePage anclas={t.anclas} />

      <section id="pour-qui" className="pb-[clamp(5rem,12vw,8rem)]">
        <div className="contenedor grid gap-8 lg:grid-cols-12">
          <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)] lg:col-span-4">{t.pourQui.titulo}</h2>
          <div className="space-y-6 lg:col-span-8">
            <p className="text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.22]">{t.pourQui.destacado}</p>
            <p className="max-w-[38rem] text-[1.12rem] leading-relaxed">
              {t.pourQui.texto}{" "}
              <Link className="enlace font-bold" href={rutaEn(idioma, "/a-propos")}>
                {t.pourQui.parcours}
              </Link>
            </p>
          </div>
        </div>
        <InvitarAEscribir texto={t.pourQui.invitar} mensaje={MENSAJES[idioma].prenatal} asunto={t.pourQui.asunto} />
      </section>

      <Reperes id="pourquoi" titulo={t.pourquoi.titulo} intro={<p>{t.pourquoi.intro}</p>} reperes={t.pourquoi.reperes} />
      <AvantDeVenir t={t.avant} />
      <Signaux
        id="signaux"
        titulo={t.signaux.titulo}
        intro={<p>{t.signaux.intro}</p>}
        signaux={t.signaux.lista}
        cierre={t.signaux.cierre}
        fuente={t.signaux.fuente}
      />
      <Reperes
        id="trimestres"
        titulo={t.trimestres.titulo}
        intro={<p>{t.trimestres.intro}</p>}
        reperes={t.trimestres.reperes.map((repere, i) => ({ clave: t.trimestres.etiquetas[i], ...repere }))}
      />
      <InfosPratiques datos={t.infos.datos} nota={t.infos.nota}>
        <PedirInfos mensaje={MENSAJES[idioma].prenatal} texto={t.infos.pedir} />
      </InfosPratiques>
      <ProgrammeEnLigne t={{ ...t.programa, trimestres: t.trimestres.etiquetas }} />
      <Questions preguntas={PREGUNTAS_PRENATAL[idioma]} />
      <Sources fuentes={t.fuentes} />
      <PourContinuer destinos={["postPartum", "cours", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].prenatal} />
    </main>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { type Idioma, rutaEn } from "@/lib/idiomas";

// las preguntas frecuentes de las páginas de clases. Viven acá porque las muestra cada página y además
// las junta /faq. Las respuestas que no son texto plano llevan links o la pastilla «à confirmer»
export type Pregunta = { pregunta: string; respuesta: ReactNode };

// las de Yoga prénatal
const prenatalFr: Pregunta[] = [
  {
    pregunta: "Je n’ai jamais fait de yoga. Je peux venir ?",
    respuesta: "Oui. Nul besoin d’être fort.e ou souple, viens comme tu es :)",
  },
  {
    pregunta: "Je n’ai jamais fait de sport. Je peux commencer pendant la grossesse ?",
    respuesta:
      "Oui, en douceur. L’OMS conseille de commencer par de petites quantités, puis d’augmenter peu à peu. Parles-en d’abord à ta sage-femme ou à ta gynécologue.",
  },
  {
    pregunta: "Je peux faire du yoga au premier trimestre ?",
    respuesta: (
      <>
        Si ta grossesse se passe bien et que ta sage-femme ou ta gynécologue est d’accord, bouger au premier trimestre est
        possible, et si tu pratiquais déjà, tu peux continuer. Les jours de nausées ou de grande fatigue, une pratique douce
        suffit. Pour mes cours, la semaine à partir de laquelle je t’accueille est <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "Pourquoi éviter de rester allongée sur le dos ?",
    respuesta:
      "Plus tard dans la grossesse, sur le dos, le poids de l’utérus peut gêner le retour du sang vers le cœur et faire baisser la tension, avec des vertiges. L’OMS conseille d’éviter les activités sur le dos après le premier trimestre.",
  },
  {
    pregunta: "Le yoga chaud (hot yoga, Bikram), c’est possible ?",
    respuesta:
      "Mieux vaut l’éviter : la chaleur peut faire trop monter la température du corps. Au premier trimestre, une température au-dessus de 39,2 °C peut être dangereuse pour le développement du bébé, selon la HAS.",
  },
  {
    pregunta: "Dans quels cas l’activité physique est déconseillée ?",
    respuesta:
      "C’est ta sage-femme ou ta gynécologue qui décide, selon ta situation. La HAS cite par exemple la rupture de la poche des eaux, une menace d’accouchement prématuré, des saignements inexpliqués, un placenta prævia après 24 semaines ou une prééclampsie.",
  },
  {
    pregunta: "Il me faut un certificat médical ?",
    respuesta: "Non. Il te faut l’accord de ta sage-femme ou de ta gynécologue, mais je ne te demande aucun document.",
  },
  {
    pregunta: "Tu es sage-femme ou physiothérapeute ?",
    respuesta: "Non. Je suis professeure de yoga, enregistrée auprès de Yoga Alliance et formée en yoga pré et postnatal.",
  },
  {
    pregunta: "Mon assurance rembourse le cours ?",
    respuesta:
      "Non. L’assurance de base participe à hauteur de 150 francs aux cours de préparation à la naissance donnés par une sage-femme. Mes cours ne sont remboursés ni par l’assurance de base ni par la complémentaire.",
  },
  {
    pregunta: "Et après l’accouchement ?",
    respuesta: (
      <>
        Tu peux continuer avec le{" "}
        <Link className="enlace" href="/yoga-post-partum-geneve">
          yoga post-partum
        </Link>
        , après la rééducation du périnée avec une physio.
      </>
    ),
  },
  {
    pregunta: "Je ne peux pas venir au cours. Il existe une version en ligne ?",
    respuesta: "Le programme Grossesse en mouvement arrive bientôt. Il sera en ligne et organisé par trimestre.",
  },
];

// las de Yoga post-partum
const postPartumFr: Pregunta[] = [
  {
    pregunta: "C’est un cours maman-bébé ? Je peux venir avec mon bébé ?",
    respuesta: "C’est encore à confirmer. Écris-moi si c’est important pour toi.",
  },
  {
    pregunta: "Combien de temps après l’accouchement je peux reprendre ?",
    respuesta: (
      <>
        Il n’y a pas de délai unique&nbsp;: ça dépend de ton accouchement et de ta récupération. Les recommandations suisses
        conseillent de commencer par une activité modérée, puis d’augmenter peu à peu. Pour mes cours, c’est après la
        rééducation du périnée et avec l’accord de ta sage-femme ou de ta gynécologue. Le nombre de semaines est <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "J’ai accouché par césarienne. Je peux venir ?",
    respuesta:
      "Oui, avec l’accord de ta sage-femme ou de ta gynécologue. Je ne fais pas de différence entre une césarienne et un accouchement par voie basse : on augmente l’intensité petit à petit. Après une césarienne, Santé publique France conseille d’attendre que la paroi du ventre se reconstitue, environ deux mois, avant de reprendre une activité physique.",
  },
  {
    pregunta: "J’allaite. Est-ce que le sport change mon lait ?",
    respuesta:
      "Non. Selon le Collège américain des obstétriciens et gynécologues (ACOG), une activité physique régulière ne change ni la quantité ni la composition du lait, ni la croissance du bébé. Pour être plus à l’aise, allaite ou tire ton lait avant la séance, et pense à bien boire.",
  },
  {
    pregunta: "J’ai des fuites quand je fais un effort. Je peux venir ?",
    respuesta:
      "C’est fréquent après un accouchement, mais ce n’est pas à ignorer. Parles-en d’abord à ta sage-femme, à ta gynécologue ou à ta physio : la rééducation du périnée est faite pour ça. Aux HUG, on conseille d’en parler si les fuites durent plus de 30 jours après l’accouchement.",
  },
  {
    pregunta: "Le yoga peut guérir ma diastase ?",
    respuesta:
      "Non. Mes exercices peuvent aider à la diminuer, mais ils ne la guérissent pas. Si l’écart se voit encore bien huit semaines après la naissance, parles-en à ta gynécologue ou à ton médecin.",
  },
  {
    pregunta: "Je dois d’abord faire la rééducation du périnée ?",
    respuesta:
      "Oui, avec une physio. Elle est indispensable, et le yoga ne la remplace pas. Aux HUG, elle commence en général deux à trois mois après l’accouchement et compte six à neuf séances.",
  },
  {
    pregunta: "Le cours est remboursé par l’assurance complémentaire ?",
    respuesta: "Non, les cours ne sont pas remboursés par l’assurance complémentaire.",
  },
  {
    pregunta: "Tu proposes aussi du yoga pendant la grossesse ?",
    respuesta: (
      <>
        Oui, tout est sur la page{" "}
        <Link className="enlace" href="/yoga-prenatal-geneve">
          yoga prénatal
        </Link>
        .
      </>
    ),
  },
];

// las de Cours de yoga
const coursFr: Pregunta[] = [
  {
    pregunta: "Je débute. Je peux venir ?",
    respuesta: "Oui ! Nul besoin d’être fort.e ou souple, viens comme tu es :)",
  },
  {
    pregunta: "Quels styles de yoga proposes-tu ?",
    respuesta: "Le vinyasa, le yoga flow et le yoga dynamique. Je ne donne pas de cours de hatha, d’ashtanga ni de yoga aérien.",
  },
  {
    pregunta: "Tu donnes des cours privés ?",
    respuesta: (
      <>
        Oui.{" "}
        <a className="enlace" href={enlaceWhatsApp(MENSAJES.fr.prive)} target="_blank" rel="noopener noreferrer">
          Écris-moi
        </a>{" "}
        pour en parler.
      </>
    ),
  },
  {
    pregunta: "Tu proposes du yin yoga ?",
    respuesta: (
      <>
        Je suis formée en yin yoga (100 h, en Suisse). Pour savoir s’il y aura des cours de yin, c’est encore <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "Qu’est-ce que j’apporte ?",
    respuesta: (
      <>
        Une tenue dans laquelle tu te sens bien et de quoi boire. Pour le tapis, c’est <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "Les cours sont remboursés par l’assurance complémentaire ?",
    respuesta:
      "Non. En Suisse, l’assurance de base ne rembourse pas le yoga, et les assurances complémentaires ne le font qu’avec certaines reconnaissances (Yoga Suisse, ASCA, RME…), différentes selon l’assureur. Je n’en ai pas : mes cours ne sont pas remboursés.",
  },
];

// las mismas preguntas, en el mismo orden, en inglés y en español (borrador para revisión nativa). Los links usan
// rutaEn con el idioma del arreglo y los de WhatsApp el mensaje de ese idioma

const prenatalEn: Pregunta[] = [
  {
    pregunta: "I’ve never done yoga. Can I come?",
    respuesta: "Yes. You don’t need to be strong or flexible, come as you are :)",
  },
  {
    pregunta: "I’ve never done any sport. Can I start during pregnancy?",
    respuesta:
      "Yes, gently. The WHO advises starting with small amounts, then gradually building up. Talk to your midwife or gynaecologist first.",
  },
  {
    pregunta: "Can I do yoga in the first trimester?",
    respuesta: (
      <>
        If your pregnancy is going well and your midwife or gynaecologist agrees, moving in the first trimester is possible,
        and if you were already practising, you can carry on. On days of nausea or great tiredness, a gentle practice is
        enough. For my classes, the week of pregnancy from which I welcome you is <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "Why avoid lying on my back?",
    respuesta:
      "Later in pregnancy, when you’re on your back, the weight of the uterus can get in the way of blood returning to the heart and lower your blood pressure, with dizziness. The WHO advises avoiding activities on your back after the first trimester.",
  },
  {
    pregunta: "Is hot yoga (hot yoga, Bikram) okay?",
    respuesta:
      "It’s better to avoid it: the heat can raise your body temperature too much. In the first trimester, a temperature above 39.2 °C can be dangerous for the baby’s development, according to the HAS.",
  },
  {
    pregunta: "When is physical activity not recommended?",
    respuesta:
      "Your midwife or gynaecologist decides, depending on your situation. The HAS gives as examples ruptured membranes, a threat of premature labour, unexplained bleeding, placenta praevia after 24 weeks or pre-eclampsia.",
  },
  {
    pregunta: "Do I need a medical certificate?",
    respuesta: "No. You need the go-ahead of your midwife or gynaecologist, but I don’t ask you for any document.",
  },
  {
    pregunta: "Are you a midwife or a physiotherapist?",
    respuesta: "No. I’m a yoga teacher, registered with Yoga Alliance and trained in prenatal and postnatal yoga.",
  },
  {
    pregunta: "Does my insurance reimburse the class?",
    respuesta:
      "No. Basic health insurance contributes 150 francs towards birth preparation classes given by a midwife. My classes are reimbursed neither by basic nor by supplementary health insurance.",
  },
  {
    pregunta: "And after the birth?",
    respuesta: (
      <>
        You can carry on with{" "}
        <Link className="enlace" href={rutaEn("en", "/yoga-post-partum-geneve")}>
          postnatal yoga
        </Link>
        , after pelvic floor rehab with a physio.
      </>
    ),
  },
  {
    pregunta: "I can’t make it to class. Is there an online version?",
    respuesta: "The Grossesse en mouvement programme is coming soon. It will be online and organised by trimester.",
  },
];

const postPartumEn: Pregunta[] = [
  {
    pregunta: "Is it a mum-and-baby class? Can I come with my baby?",
    respuesta: "That’s still to be confirmed. Write to me if it matters to you.",
  },
  {
    pregunta: "How long after giving birth can I start again?",
    respuesta: (
      <>
        There’s no single timeframe: it depends on your birth and your recovery. The Swiss recommendations advise
        starting with moderate activity, then gradually building up. For my classes, it’s after pelvic floor rehab and with
        the go-ahead of your midwife or gynaecologist. The number of weeks is <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "I had a caesarean. Can I come?",
    respuesta:
      "Yes, with the go-ahead of your midwife or gynaecologist. I make no distinction between a caesarean and a vaginal birth: we build up the intensity little by little. After a caesarean, Santé publique France advises waiting for the abdominal wall to rebuild, about two months, before resuming physical activity.",
  },
  {
    pregunta: "I’m breastfeeding. Does exercise change my milk?",
    respuesta:
      "No. According to the American College of Obstetricians and Gynecologists (ACOG), regular physical activity changes neither the quantity nor the composition of the milk, nor the baby’s growth. To be more comfortable, breastfeed or pump before the session, and remember to drink plenty.",
  },
  {
    pregunta: "I leak when I exert myself. Can I come?",
    respuesta:
      "It’s common after giving birth, but it’s not something to ignore. Talk to your midwife, your gynaecologist or your physio first: pelvic floor rehab exists for this. At the Geneva University Hospitals (HUG), they advise talking about it if the leaks last more than 30 days after the birth.",
  },
  {
    pregunta: "Can yoga cure my diastasis?",
    respuesta:
      "No. My exercises can help reduce it, but they don’t cure it. If the gap is still clearly visible eight weeks after the birth, talk to your gynaecologist or your doctor.",
  },
  {
    pregunta: "Do I have to do pelvic floor rehab first?",
    respuesta:
      "Yes, with a physio. It’s essential, and yoga doesn’t replace it. At the Geneva University Hospitals (HUG), it generally starts two to three months after the birth and takes six to nine sessions.",
  },
  {
    pregunta: "Is the class reimbursed by supplementary health insurance?",
    respuesta: "No, the classes are not reimbursed by supplementary health insurance.",
  },
  {
    pregunta: "Do you also offer yoga during pregnancy?",
    respuesta: (
      <>
        Yes, it’s all on the{" "}
        <Link className="enlace" href={rutaEn("en", "/yoga-prenatal-geneve")}>
          prenatal yoga
        </Link>{" "}
        page.
      </>
    ),
  },
];

const coursEn: Pregunta[] = [
  {
    pregunta: "I’m a beginner. Can I come?",
    respuesta: "Yes! You don’t need to be strong or flexible, come as you are :)",
  },
  {
    pregunta: "Which styles of yoga do you teach?",
    respuesta: "Vinyasa, yoga flow and dynamic yoga. I don’t teach hatha, ashtanga or aerial yoga.",
  },
  {
    pregunta: "Do you give private classes?",
    respuesta: (
      <>
        Yes.{" "}
        <a className="enlace" href={enlaceWhatsApp(MENSAJES.en.prive)} target="_blank" rel="noopener noreferrer">
          Write to me
        </a>{" "}
        to talk about it.
      </>
    ),
  },
  {
    pregunta: "Do you offer yin yoga?",
    respuesta: (
      <>
        I’m trained in yin yoga (100 h, in Switzerland). As for whether there will be yin classes, it’s still <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "What should I bring?",
    respuesta: (
      <>
        Clothes you feel good in and something to drink. As for the mat, it’s <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "Are the classes reimbursed by supplementary health insurance?",
    respuesta:
      "No. In Switzerland, basic health insurance doesn’t reimburse yoga, and supplementary insurance only does so with certain accreditations (Yoga Suisse, ASCA, RME…), which differ from one insurer to another. I don’t have any: my classes are not reimbursed.",
  },
];

const prenatalEs: Pregunta[] = [
  {
    pregunta: "Nunca he hecho yoga. ¿Puedo venir?",
    respuesta: "Sí. No hace falta ser fuerte ni flexible, ven tal como eres :)",
  },
  {
    pregunta: "Nunca he hecho deporte. ¿Puedo empezar durante el embarazo?",
    respuesta:
      "Sí, con suavidad. La OMS aconseja empezar con pequeñas cantidades e ir aumentando poco a poco. Antes, habla con tu matrona o con tu ginecóloga.",
  },
  {
    pregunta: "¿Puedo hacer yoga en el primer trimestre?",
    respuesta: (
      <>
        Si tu embarazo va bien y tu matrona o tu ginecóloga está de acuerdo, moverte en el primer trimestre es posible, y si
        ya practicabas, puedes seguir. Los días de náuseas o de mucho cansancio, basta con una práctica suave. Para mis
        clases, la semana de embarazo a partir de la cual te recibo está <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "¿Por qué evitar estar acostada boca arriba?",
    respuesta:
      "Más adelante en el embarazo, boca arriba, el peso del útero puede dificultar el retorno de la sangre al corazón y bajar la tensión, con mareos. La OMS aconseja evitar las actividades boca arriba después del primer trimestre.",
  },
  {
    pregunta: "¿Se puede hacer yoga con calor (hot yoga, Bikram)?",
    respuesta:
      "Mejor evitarlo: el calor puede hacer subir demasiado la temperatura del cuerpo. En el primer trimestre, una temperatura por encima de 39,2 °C puede ser peligrosa para el desarrollo del bebé, según la HAS.",
  },
  {
    pregunta: "¿En qué casos se desaconseja la actividad física?",
    respuesta:
      "Lo decide tu matrona o tu ginecóloga, según tu situación. La HAS cita, por ejemplo, la rotura de la bolsa de aguas, una amenaza de parto prematuro, sangrados sin explicación, una placenta previa después de las 24 semanas o una preeclampsia.",
  },
  {
    pregunta: "¿Necesito un certificado médico?",
    respuesta: "No. Necesitas el visto bueno de tu matrona o de tu ginecóloga, pero yo no te pido ningún documento.",
  },
  {
    pregunta: "¿Eres matrona o fisioterapeuta?",
    respuesta: "No. Soy profesora de yoga, registrada en Yoga Alliance y formada en yoga prenatal y posparto.",
  },
  {
    pregunta: "¿Mi seguro reembolsa la clase?",
    respuesta:
      "No. El seguro de base aporta 150 francos a las clases de preparación al parto que da una matrona. Mis clases no las reembolsan ni el seguro de base ni el complementario.",
  },
  {
    pregunta: "¿Y después del parto?",
    respuesta: (
      <>
        Puedes seguir con el{" "}
        <Link className="enlace" href={rutaEn("es", "/yoga-post-partum-geneve")}>
          yoga posparto
        </Link>
        , después de la reeducación del suelo pélvico con una fisio.
      </>
    ),
  },
  {
    pregunta: "No puedo ir a clase. ¿Hay una versión online?",
    respuesta: "El programa Grossesse en mouvement llegará pronto. Será online y estará organizado por trimestres.",
  },
];

const postPartumEs: Pregunta[] = [
  {
    pregunta: "¿Es una clase de mamá y bebé? ¿Puedo ir con mi bebé?",
    respuesta: "Todavía está por confirmar. Escríbeme si es importante para ti.",
  },
  {
    pregunta: "¿Cuánto tiempo después del parto puedo retomar?",
    respuesta: (
      <>
        No hay un plazo único: depende de tu parto y de tu recuperación. Las recomendaciones suizas aconsejan empezar
        con una actividad moderada e ir aumentando poco a poco. Para mis clases, es después de la reeducación del suelo
        pélvico y con el visto bueno de tu matrona o de tu ginecóloga. El número de semanas está <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "Tuve una cesárea. ¿Puedo venir?",
    respuesta:
      "Sí, con el visto bueno de tu matrona o de tu ginecóloga. No hago diferencia entre una cesárea y un parto vaginal: vamos aumentando la intensidad poco a poco. Después de una cesárea, Santé publique France aconseja esperar a que la pared del vientre se reconstituya, unos dos meses, antes de retomar la actividad física.",
  },
  {
    pregunta: "Estoy dando el pecho. ¿El ejercicio cambia mi leche?",
    respuesta:
      "No. Según el Colegio Americano de Obstetras y Ginecólogos (ACOG), una actividad física regular no cambia ni la cantidad ni la composición de la leche, ni el crecimiento del bebé. Para estar más a gusto, da el pecho o extráete la leche antes de la sesión, y no olvides beber bien.",
  },
  {
    pregunta: "Tengo escapes cuando hago un esfuerzo. ¿Puedo venir?",
    respuesta:
      "Es frecuente después de un parto, pero no hay que ignorarlo. Habla primero con tu matrona, con tu ginecóloga o con tu fisio: la reeducación del suelo pélvico está hecha para eso. En los Hospitales Universitarios de Ginebra (HUG) aconsejan comentarlo si los escapes duran más de 30 días después del parto.",
  },
  {
    pregunta: "¿El yoga puede curar mi diástasis?",
    respuesta:
      "No. Mis ejercicios pueden ayudar a reducirla, pero no la curan. Si la separación todavía se ve bien ocho semanas después del parto, habla con tu ginecóloga o con tu médico.",
  },
  {
    pregunta: "¿Tengo que hacer primero la reeducación del suelo pélvico?",
    respuesta:
      "Sí, con una fisio. Es indispensable, y el yoga no la reemplaza. En los Hospitales Universitarios de Ginebra (HUG), suele empezar de dos a tres meses después del parto y consta de seis a nueve sesiones.",
  },
  {
    pregunta: "¿El seguro complementario reembolsa la clase?",
    respuesta: "No, el seguro complementario no reembolsa las clases.",
  },
  {
    pregunta: "¿También ofreces yoga durante el embarazo?",
    respuesta: (
      <>
        Sí, todo está en la página de{" "}
        <Link className="enlace" href={rutaEn("es", "/yoga-prenatal-geneve")}>
          yoga prenatal
        </Link>
        .
      </>
    ),
  },
];

const coursEs: Pregunta[] = [
  {
    pregunta: "Estoy empezando. ¿Puedo venir?",
    respuesta: "¡Sí! No hace falta ser fuerte ni flexible, ven tal como eres :)",
  },
  {
    pregunta: "¿Qué estilos de yoga ofreces?",
    respuesta: "Vinyasa, yoga flow y yoga dinámico. No doy clases de hatha, de ashtanga ni de yoga aéreo.",
  },
  {
    pregunta: "¿Das clases privadas?",
    respuesta: (
      <>
        Sí.{" "}
        <a className="enlace" href={enlaceWhatsApp(MENSAJES.es.prive)} target="_blank" rel="noopener noreferrer">
          Escríbeme
        </a>{" "}
        para hablarlo.
      </>
    ),
  },
  {
    pregunta: "¿Ofreces yin yoga?",
    respuesta: (
      <>
        Tengo formación en yin yoga (100 h, en Suiza). En cuanto a si habrá clases de yin, todavía está <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "¿Qué tengo que llevar?",
    respuesta: (
      <>
        Ropa con la que te sientas bien y algo para beber. En cuanto a la esterilla, está <AConfirmer />
      </>
    ),
  },
  {
    pregunta: "¿Las clases las reembolsa el seguro complementario?",
    respuesta:
      "No. En Suiza, el seguro de base no reembolsa el yoga, y los seguros complementarios solo lo hacen con ciertos reconocimientos (Yoga Suisse, ASCA, RME…), distintos según la aseguradora. Yo no tengo ninguno: mis clases no se reembolsan.",
  },
];

// por idioma
export const PREGUNTAS_PRENATAL: Record<Idioma, Pregunta[]> = { fr: prenatalFr, en: prenatalEn, es: prenatalEs };
export const PREGUNTAS_POST_PARTUM: Record<Idioma, Pregunta[]> = { fr: postPartumFr, en: postPartumEn, es: postPartumEs };
export const PREGUNTAS_COURS: Record<Idioma, Pregunta[]> = { fr: coursFr, en: coursEn, es: coursEs };

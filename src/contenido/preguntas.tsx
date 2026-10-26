import Link from "next/link";
import type { ReactNode } from "react";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";

// las preguntas frecuentes de las páginas de clases. Viven acá porque las muestra cada página y además
// las junta /faq. Las respuestas que no son texto plano llevan links o la pastilla «à confirmer»
export type Pregunta = { pregunta: string; respuesta: ReactNode };

// las de Yoga prénatal
export const PREGUNTAS_PRENATAL: Pregunta[] = [
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
export const PREGUNTAS_POST_PARTUM: Pregunta[] = [
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
export const PREGUNTAS_COURS: Pregunta[] = [
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
        <a className="enlace" href={enlaceWhatsApp(MENSAJES.prive)} target="_blank" rel="noopener noreferrer">
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

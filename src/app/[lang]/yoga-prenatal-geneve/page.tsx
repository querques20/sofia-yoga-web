import type { Metadata } from "next";
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
import { AvantDeVenir } from "@/components/prenatal/AvantDeVenir";
import { ProgrammeEnLigne } from "@/components/prenatal/ProgrammeEnLigne";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import { PREGUNTAS_PRENATAL } from "@/contenido/preguntas";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { preguntasFrecuentes, servicio } from "@/lib/datos-estructurados";

export const metadata: Metadata = {
  title: "Yoga prénatal à Genève",
  alternates: { canonical: "/yoga-prenatal-geneve" },
  description:
    "Cours de yoga prénatal à Genève avec Sofia Costa, formée en yoga pré et postnatal. Avec l’accord de ta sage-femme ou de ta gynécologue.",
};

// lo que sabemos del curso; lo demás lo tiene que confirmar Sofía
const DATOS = [
  { dato: "Où", valor: <>À Genève. Le lieu est <AConfirmer /></> },
  { dato: "Quand", valor: <>Le jour et l’horaire sont <AConfirmer /></> },
  { dato: "Dès quelle semaine", valor: <AConfirmer /> },
  { dato: "Durée", valor: <AConfirmer /> },
  { dato: "Tarif", valor: <AConfirmer /> },
  { dato: "Paiement", valor: <AConfirmer /> },
  { dato: "Langue", valor: "Français" },
  { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga, formée en yoga pré et postnatal" },
];

// por qué moverse en el embarazo, con recomendaciones oficiales y estudios (y sin prometer de más)
const POURQUOI = [
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
];

// los signos para parar y consultar, tal como los da la HAS (síntesis 2022), más el dolor de vientre de la ACOG
const SIGNAUX = [
  "Un essoufflement excessif qui ne passe pas au repos",
  "Une douleur ou une pression dans la poitrine",
  "Des contractions régulières et douloureuses",
  "Une douleur dans le ventre",
  "Des saignements vaginaux",
  "Une fuite de liquide amniotique",
  "Des vertiges, un malaise ou des maux de tête",
  "Une faiblesse musculaire qui gêne l’équilibre",
  "Une douleur ou un gonflement du mollet",
];

// qué suele cambiar en cada trimestre y cómo se adapta la práctica, según las recomendaciones
const TRIMESTRES = [
  {
    clave: (
      <>
        1<sup className="sufijo">er</sup> trimestre
      </>
    ),
    texto:
      "Les nausées et la grande fatigue sont fréquentes : les jours difficiles, une pratique douce suffit. Si tu faisais déjà du yoga, tu peux continuer. Et on évite la chaleur : pas de yoga chaud.",
    fuente: "INSPQ ; OMS, 2020 ; ACOG",
  },
  {
    clave: (
      <>
        2<sup className="sufijo">e</sup> trimestre
      </>
    ),
    texto:
      "Le ventre s’arrondit et déplace le centre de gravité vers l’avant : l’équilibre change. Les ligaments deviennent souvent plus souples, alors on ne force pas les étirements. Et on évite les exercices allongée sur le dos, comme le conseille l’OMS après le premier trimestre.",
    fuente: "HAS, 2019 ; OMS, 2020",
  },
  {
    clave: (
      <>
        3<sup className="sufijo">e</sup> trimestre
      </>
    ),
    texto:
      "Le ventre prend de la place : on adapte les postures et on garde des appuis stables. On continue à respirer pendant l’effort, sans bloquer son souffle, et on écoute la fatigue.",
    fuente: "HAS, 2019 et 2022",
  },
];

const FUENTES = [
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
];

export default async function YogaPrenatal() {
  const idioma = await idiomaActual();
  return (
    <main>
      <DatosEstructurados datos={[servicio({ nombre: "Yoga prénatal à Genève", tipo: "Yoga prénatal", ruta: "/yoga-prenatal-geneve", descripcion: String(metadata.description) }), preguntasFrecuentes(PREGUNTAS_PRENATAL)]} />
      <EnteteDePage
        fil="Yoga prénatal"
        titulo={
          <>
            Yoga <Mano>prénatal</Mano> à Genève
          </>
        }
        intro={
          <>
            <p>Un cours pensé pour toi si tu es enceinte et que tu souhaites continuer à bouger consciemment pendant ta grossesse.</p>
            <p>Une pratique qui s’adapte à chaque trimestre, avec l’accord de ta sage-femme ou de ta gynécologue.</p>
          </>
        }
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].prenatal)} target="_blank" rel="noopener noreferrer">
                Écrire sur WhatsApp
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#infos">
              Voir les infos pratiques
            </a>
          </>
        }
        visual={
          <IlustracionQueRespira
            viewBox="0 0 400 520"
            etiqueta="Une femme enceinte de profil, les yeux fermés, une main posée sur le ventre"
            torso="180 300"
            className="mx-auto aspect-[400/520] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[27rem]"
          >
            <Embarazada />
          </IlustracionQueRespira>
        }
      />

      <SurCettePage
        anclas={[
          { href: "#pour-qui", texto: "C’est pour moi ?" },
          { href: "#pourquoi", texto: "Pourquoi bouger" },
          { href: "#avant", texto: "Avant de venir" },
          { href: "#signaux", texto: "Quand t’arrêter" },
          { href: "#trimestres", texto: "Trimestre par trimestre" },
          { href: "#infos", texto: "Infos pratiques" },
          { href: "#programme", texto: "Le programme en ligne" },
          { href: "#questions", texto: "Questions" },
        ]}
      />

      <section id="pour-qui" className="pb-[clamp(5rem,12vw,8rem)]">
        <div className="contenedor grid gap-8 lg:grid-cols-12">
          <h2 className="titre text-[clamp(2.6rem,6.4vw,5rem)] lg:col-span-4">C’est pour moi&nbsp;?</h2>
          <div className="space-y-6 lg:col-span-8">
            <p className="text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.22]">
              Si tu es enceinte et que tu as envie de bouger, oui. Nul besoin d’être fort.e ou souple, viens comme tu es&nbsp;:)
            </p>
            <p className="max-w-[38rem] text-[1.12rem] leading-relaxed">
              Le cours est en français. Je suis enregistrée auprès de Yoga Alliance et formée en yoga pré et postnatal.{" "}
              <Link className="enlace font-bold" href="/a-propos">
                Mon parcours
              </Link>
            </p>
          </div>
        </div>
        <InvitarAEscribir
          texto={<>Tu te reconnais&nbsp;? Dis-moi à combien de semaines tu es, je te réponds.</>}
          mensaje={MENSAJES[idioma].prenatal}
          asunto="Yoga prénatal"
        />
      </section>

      <Reperes
        id="pourquoi"
        titulo={<>Pourquoi bouger pendant ta grossesse&nbsp;?</>}
        intro={<p>Ce que disent les recommandations officielles et les études, sans promesse en l’air.</p>}
        reperes={POURQUOI}
      />
      <AvantDeVenir />
      <Signaux
        id="signaux"
        titulo="Quand t’arrêter"
        intro={<p>Pendant une séance, ou en dehors, certains signes veulent dire qu’il faut s’arrêter tout de suite.</p>}
        signaux={SIGNAUX}
        cierre="Arrête la séance et appelle ta sage-femme ou ta gynécologue. Une douleur dans la poitrine est une urgence : appelle le 144."
        fuente="HAS, 2022 ; ACOG, 2020"
      />
      <Reperes
        id="trimestres"
        titulo="Trimestre par trimestre"
        intro={<p>Chaque grossesse est différente. Voici ce qui change souvent, et comment la pratique s’adapte selon les recommandations.</p>}
        reperes={TRIMESTRES}
      />
      <InfosPratiques datos={DATOS} nota="Les cours ne sont pas remboursés par l’assurance complémentaire.">
        <PedirInfos
          mensaje={MENSAJES[idioma].prenatal}
          texto="Le lieu, l’horaire et le tarif arrivent bientôt. En attendant, écris-moi en me disant à combien de semaines tu es : je te réponds avec les détails."
        />
      </InfosPratiques>
      <ProgrammeEnLigne />
      <Questions preguntas={PREGUNTAS_PRENATAL} />
      <Sources fuentes={FUENTES} />
      <PourContinuer destinos={["postPartum", "cours", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].prenatal} />
    </main>
  );
}

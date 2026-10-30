import type { Metadata } from "next";
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
import { CeQueLeYogaFait } from "@/components/post-partum/CeQueLeYogaFait";
import { Intensite } from "@/components/post-partum/Intensite";
import { QuandReprendre } from "@/components/post-partum/QuandReprendre";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import { PREGUNTAS_POST_PARTUM } from "@/contenido/preguntas";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { preguntasFrecuentes, servicio } from "@/lib/datos-estructurados";

export const metadata: Metadata = {
  title: "Yoga post-partum à Genève",
  alternates: { canonical: "/yoga-post-partum-geneve" },
  description:
    "Yoga post-partum et postnatal à Genève avec Sofia Costa : une reprise progressive, après la rééducation du périnée avec une physio.",
};

// el posparto todavía tiene casi todo por confirmar: desde cuándo, si se viene con el bebé, dónde y cuánto
const DATOS = [
  { dato: "Dès quand", valor: <>Après la rééducation du périnée. Le nombre de semaines est <AConfirmer /></> },
  { dato: "Avec ton bébé", valor: <AConfirmer /> },
  { dato: "Où", valor: <>À Genève. Le lieu est <AConfirmer /></> },
  { dato: "Quand", valor: <>Le jour et l’horaire sont <AConfirmer /></> },
  { dato: "Tarif", valor: <AConfirmer /> },
  { dato: "Paiement", valor: <AConfirmer /> },
  { dato: "Langue", valor: "Français" },
  { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga, formée en yoga pré et postnatal" },
];

// lo que prevé el seguro básico suizo después del parto (OPAS, en Fedlex; y el folleto del periné de los HUG)
const SUISSE = [
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
];

// el periné y la diástasis con datos verificados (HUG, Cochrane, Sperstad 2016, Gluppe 2021, Beamish 2025, NHS)
const PERINEE = [
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
];

// las señales de alarma de la guía de vuelta al ejercicio posparto (Goom, Donnelly y Brockwell 2019) y de los HUG
const SIGNAUX = [
  "Des fuites d’urine, de gaz ou de selles",
  "Une envie d’uriner difficile à retenir",
  "Une lourdeur, une pression ou une « boule » dans le bas du ventre ou dans le vagin",
  "Des douleurs au bas du dos, au bassin ou pendant les rapports",
  "Des saignements qui reprennent ou qui augmentent avec l’effort",
  "Un ventre qui bombe au milieu pendant l’effort",
];

const FUENTES = [
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
];

export default async function YogaPostPartum() {
  const idioma = await idiomaActual();
  return (
    <main>
      <DatosEstructurados datos={[servicio({ nombre: "Yoga post-partum à Genève", tipo: "Yoga post-partum", ruta: "/yoga-post-partum-geneve", descripcion: String(metadata.description) }), preguntasFrecuentes(PREGUNTAS_POST_PARTUM)]} />
      <EnteteDePage
        fil="Post-partum"
        titulo={
          <>
            Yoga <Mano>post-partum</Mano> à Genève
          </>
        }
        intro={
          <>
            <p>Pour reprendre le mouvement après l’accouchement, de l’intensité la plus douce à la plus exigeante.</p>
            <p>Un yoga postnatal qui respecte ton rythme&nbsp;: d’abord la rééducation du périnée, ensuite la pratique.</p>
          </>
        }
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].postPartum)} target="_blank" rel="noopener noreferrer">
                Écrire sur WhatsApp
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#quand">
              Quand reprendre
            </a>
          </>
        }
        visual={
          <IlustracionQueRespira
            viewBox="0 0 400 520"
            etiqueta="Une jeune maman de profil, les yeux fermés, qui serre contre elle son bébé emmailloté"
            className="mx-auto aspect-[400/520] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[27rem]"
          >
            <Posparto />
          </IlustracionQueRespira>
        }
      />
      <SurCettePage
        anclas={[
          { href: "#quand", texto: "Quand reprendre ?" },
          { href: "#suisse", texto: "Bon à savoir en Suisse" },
          { href: "#intensite", texto: "Une intensité progressive" },
          { href: "#diastase", texto: "Périnée et diastase" },
          { href: "#signaux", texto: "Les signaux à écouter" },
          { href: "#infos", texto: "Infos pratiques" },
          { href: "#questions", texto: "Questions" },
        ]}
      />
      <QuandReprendre>
        <InvitarAEscribir
          texto={<>Tu en es où&nbsp;? Dis-moi quand tu as accouché, je te réponds.</>}
          mensaje={MENSAJES[idioma].postPartum}
          asunto="Yoga post-partum"
          enBanda
        />
      </QuandReprendre>
      {/* va por encima de la pila de arriba (por eso el relative): cuando la banda barre la pila, esta sección
          viene pegada detrás y su fondo tapa lo que queda */}
      <div className="relative">
        <Reperes
          id="suisse"
          fondo="salvia"
          titulo="Bon à savoir en Suisse"
          intro={<p>Ce que l’assurance de base prévoit après la naissance. Vérifie les détails auprès de ta caisse maladie.</p>}
          reperes={SUISSE}
        />
      </div>
      <Intensite />
      <Reperes
        id="diastase"
        titulo="Périnée et diastase, en clair"
        intro={<p>Deux mots qu’on entend beaucoup après l’accouchement. Ce qu’ils veulent dire, et ce que disent les études.</p>}
        reperes={PERINEE}
      />
      <CeQueLeYogaFait />
      <Signaux
        id="signaux"
        titulo="Les signaux à écouter"
        intro={<p>Pendant l’effort ou dans les jours qui suivent, certains signes veulent dire qu’il faut lever le pied et consulter.</p>}
        signaux={SIGNAUX}
        cierre="Si tu ressens l’un de ces signes, arrête l’exercice et parles-en à ta sage-femme, à ta gynécologue ou à ta physio."
        fuente="Goom, Donnelly et Brockwell, 2019 ; HUG"
      />
      <InfosPratiques datos={DATOS} nota="Les cours ne sont pas remboursés par l’assurance complémentaire.">
        <PedirInfos
          mensaje={MENSAJES[idioma].postPartum}
          texto="Le lieu, l’horaire et le tarif arrivent bientôt. En attendant, écris-moi en me disant quand tu as accouché : je te réponds avec les détails."
        />
      </InfosPratiques>
      <Questions preguntas={PREGUNTAS_POST_PARTUM} />
      <Sources fuentes={FUENTES} />
      <PourContinuer destinos={["prenatal", "cours", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].postPartum} />
    </main>
  );
}

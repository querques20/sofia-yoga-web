import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Flux } from "@/components/cours/Flux";
import { Formats } from "@/components/cours/Formats";
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
import { PREGUNTAS_COURS } from "@/contenido/preguntas";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { preguntasFrecuentes, servicio } from "@/lib/datos-estructurados";

export const metadata: Metadata = {
  title: "Cours de yoga à Genève",
  alternates: { canonical: "/cours-de-yoga-geneve" },
  description:
    "Cours de vinyasa, yoga flow et yoga dynamique à Genève avec Sofia Costa. En groupe, en privé ou au parc. Nul besoin d’être fort.e ou souple.",
};

// lugares, días, horarios y precios todavía no los tenemos (contexto maestro, sección 6)
const DATOS = [
  { dato: "Styles", valor: "Vinyasa, yoga flow et yoga dynamique" },
  { dato: "Formats", valor: "En groupe, en privé ou au parc" },
  { dato: "Où", valor: <>À Genève. Les lieux sont <AConfirmer /></> },
  { dato: "Quand", valor: <>Les jours et les horaires sont <AConfirmer /></> },
  { dato: "Tarifs", valor: <AConfirmer /> },
  { dato: "Paiement", valor: <AConfirmer /> },
  { dato: "Langue", valor: "Français" },
  { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga formée en Inde et en Suisse" },
  { dato: "Niveau", valor: "Tous niveaux : nul besoin d’être fort.e ou souple" },
];

// lo que el yoga puede aportar según los institutos de salud y las revisiones (sin agrandar nada)
const APORTES = [
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
];

const FUENTES = [
  { texto: "NCCIH, Yoga: Effectiveness and Safety, 2023", href: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety" },
  { texto: "Cochrane, le yoga pour la lombalgie chronique non spécifique, 2022 (résumé en français)", href: "https://www.cochrane.org/fr/evidence/CD010671_yoga-chronic-non-specific-low-back-pain" },
  { texto: "Sivaramakrishnan et al., International Journal of Behavioral Nutrition and Physical Activity, 2019", href: "https://doi.org/10.1186/s12966-019-0789-2" },
  { texto: "NHS, Physical activity guidelines for adults aged 19 to 64", href: "https://www.nhs.uk/live-well/exercise/exercise-guidelines/physical-activity-guidelines-for-adults-aged-19-to-64/" },
  { texto: "OFSP, médecines complémentaires", href: "https://www.bag.admin.ch/fr/medecines-complementaires-pratiquees-par-des-medecins" },
  { texto: "Yoga Suisse, contributions des assurances aux cours de yoga", href: "https://www.yoga.ch/fr/cours-de-yoga/contributions-en-matiere-de-prevention-sante-pour-les-cours-de-yoga" },
];

export default async function CoursDeYoga() {
  const idioma = await idiomaActual();
  return (
    <main>
      <DatosEstructurados datos={[servicio({ nombre: "Cours de yoga à Genève", tipo: "Cours de yoga : vinyasa, yoga flow et yoga dynamique", ruta: "/cours-de-yoga-geneve", descripcion: String(metadata.description) }), preguntasFrecuentes(PREGUNTAS_COURS)]} />
      <EnteteDePage
        fil="Cours"
        titulo={
          <>
            Cours de yoga <Mano>dynamique</Mano> à Genève
          </>
        }
        intro={
          <p>
            Vinyasa, yoga flow et yoga dynamique, en groupe, en privé ou au parc. Nul besoin d’être fort.e ou souple, viens
            comme tu es&nbsp;:)
          </p>
        }
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].cours)} target="_blank" rel="noopener noreferrer">
                Écrire sur WhatsApp
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#ou">
              Où et quand
            </a>
          </>
        }
        visual={
          <IlustracionQueRespira
            viewBox="0 0 560 420"
            etiqueta="Une femme dans la posture du guerrier II sur un tapis de yoga, les bras tendus, le regard vers la main avant"
            className="mx-auto aspect-[560/420] w-full max-w-[34rem] lg:mr-0"
          >
            <Guerrier />
          </IlustracionQueRespira>
        }
      />
      <SurCettePage
        anclas={[
          { href: "#styles", texto: "Ma façon d’enseigner" },
          { href: "#apports", texto: "Ce que le yoga apporte" },
          { href: "#formats", texto: "Groupe, privé ou parc" },
          { href: "#ou", texto: "Où et quand" },
          { href: "#questions", texto: "Questions" },
        ]}
      />
      <Flux>
        <InvitarAEscribir
          texto={<>Un de ces styles te parle&nbsp;? Écris-moi, je te dis où et quand ont lieu les prochains cours.</>}
          mensaje={MENSAJES[idioma].ouQuand}
          asunto="Cours de yoga"
        />
      </Flux>
      <Reperes
        id="apports"
        fondo="salvia"
        titulo="Ce que le yoga peut t’apporter"
        intro={<p>Ce que disent les instituts de santé et les études, sans exagérer.</p>}
        reperes={APORTES}
      />
      <Formats />
      <InfosPratiques id="ou" titulo="Où et quand" datos={DATOS} nota="Les cours ne sont pas remboursés par l’assurance complémentaire.">
        <PedirInfos
          mensaje={MENSAJES[idioma].ouQuand}
          texto="Les lieux et les horaires arrivent bientôt. En attendant, écris-moi : je te dis où et quand ont lieu les prochains cours."
        />
      </InfosPratiques>
      <Questions preguntas={PREGUNTAS_COURS} />
      <Sources fuentes={FUENTES} aviso="Ces informations sont générales. Elles ne remplacent pas l’avis de ton médecin." />
      <PourContinuer destinos={["prives", "prenatal", "ateliers", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].cours} />
    </main>
  );
}

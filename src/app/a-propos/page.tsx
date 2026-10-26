import type { Metadata } from "next";
import { Histoire } from "@/components/a-propos/Histoire";
import { Portrait } from "@/components/a-propos/Portrait";
import { Tapis } from "@/components/a-propos/Tapis";
import { Contact } from "@/components/Contact";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { Reperes } from "@/components/pagina/Reperes";
import { Sources } from "@/components/pagina/Sources";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { paginaSobreSofia, persona } from "@/lib/datos-estructurados";

export const metadata: Metadata = {
  title: "Sofia Costa, professeure de yoga à Genève",
  alternates: { canonical: "/a-propos" },
  description:
    "Mon parcours, mes formations (enregistrée auprès de Yoga Alliance, 60 h de yoga pré et postnatal) et ma façon d’enseigner le yoga à Genève.",
};

// las tres palabras de su bio, explicadas con definiciones verificadas (la de fascia es la de consenso de 2019)
const METODO = [
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
];

const FUENTES = [
  { texto: "Schleip et al., Clinical Anatomy, 2019 : définition des fascias", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6852276/" },
  { texto: "La Scala Teixeira et al., Frontiers in Physiology, 2017 : l’entraînement fonctionnel", href: "https://www.frontiersin.org/articles/10.3389/fphys.2017.00643/full" },
  { texto: "Yoga Alliance, Standards for RYT Credentials", href: "https://yogaalliance.org/Standards-for-RYT-Credentials" },
  { texto: "Yoga Alliance, Member Brand Guide, 2025", href: "https://yogaalliance.org/wp-content/uploads/2025/10/YA25-Member-Brand-Guide.pdf" },
];

export default function APropos() {
  return (
    <main>
      <DatosEstructurados datos={[persona(), paginaSobreSofia()]} />
      <EnteteDePage
        fil="À propos"
        titulo={
          <>
            Le yoga est pour <Mano>touxtes</Mano>
          </>
        }
        intro={
          <>
            <p>Je m’appelle Sofia Costa et je suis professeure de yoga à Genève.</p>
            <p>Je donne des cours de yoga dynamique et de yoga pré et postnatal, en groupe, en privé et au parc.</p>
          </>
        }
        visual={<Portrait />}
      />
      <Histoire />
      <Reperes
        id="methode"
        fondo="salvia"
        titulo="Ma façon d’enseigner"
        intro={
          <>
            <p>Avec mes mots&nbsp;: «&nbsp;un enseignement dynamique alliant pranayama, mouvement fonctionnel et système myofascial&nbsp;».</p>
            <p>Voici ce que ça veut dire.</p>
          </>
        }
        reperes={METODO}
      />
      <Tapis />
      <Sources fuentes={FUENTES} aviso={false} />
      <PourContinuer destinos={["prenatal", "cours", "ateliers"]} />
      <Contact />
    </main>
  );
}

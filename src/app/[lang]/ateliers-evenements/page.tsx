import type { Metadata } from "next";
import { Billet } from "@/components/ateliers/Billet";
import { CommentCaMarche } from "@/components/ateliers/CommentCaMarche";
import { Contact } from "@/components/Contact";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { Reperes } from "@/components/pagina/Reperes";
import { MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";

export const metadata: Metadata = {
  title: "Ateliers et événements de yoga à Genève",
  alternates: { canonical: "/ateliers-evenements" },
  description:
    "Les ateliers et événements de yoga de Sofia Costa à Genève. Aucun n’est annoncé pour le moment : écris-moi pour être prévenu.e du prochain.",
};

// qué suele ser un atelier (práctica común en estudios y escuelas, no datos de los de ella, que faltan)
const ATELIER = [
  { clave: "Un thème", texto: "Un atelier tourne autour d’un sujet précis : le souffle, une famille de postures, une partie du corps…" },
  { clave: "Plus de temps", texto: "Il dure souvent plus longtemps qu’un cours : de quelques heures à une journée, ou une courte série de séances." },
  { clave: "Comprendre", texto: "On pratique, et on prend aussi le temps d’expliquer le pourquoi des choses." },
  {
    clave: "Les prochains",
    texto: (
      <>
        Les thèmes et les dates sont <AConfirmer />
      </>
    ),
  },
];

// todavía no hay ateliers anunciados: la página lo dice y ofrece avisar del próximo
export default async function Ateliers() {
  const idioma = await idiomaActual();
  return (
    <main>
      <EnteteDePage
        fil="Ateliers"
        titulo={
          <>
            Ateliers <Mano>&amp;</Mano> événements
          </>
        }
        intro={
          <>
            <p>Ateliers et cours de yoga pour toutes et tous.</p>
            <p>Aucun atelier n’est annoncé pour le moment. Écris-moi pour être prévenu.e du prochain.</p>
          </>
        }
        visual={<Billet />}
      />
      <Reperes
        id="atelier"
        titulo={<>Un atelier, c’est quoi&nbsp;?</>}
        intro={<p>En général, et en attendant les thèmes des prochains.</p>}
        reperes={ATELIER}
      />
      <CommentCaMarche />
      <PourContinuer destinos={["cours", "prenatal", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].atelier} />
    </main>
  );
}

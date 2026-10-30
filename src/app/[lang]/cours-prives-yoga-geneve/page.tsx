import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Magnetique } from "@/components/Magnetique";
import { AConfirmer } from "@/components/pagina/AConfirmer";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { InfosPratiques } from "@/components/pagina/InfosPratiques";
import { PedirInfos } from "@/components/pagina/PedirInfos";
import { PourContinuer } from "@/components/pagina/PourContinuer";
import { Reperes } from "@/components/pagina/Reperes";
import { VisualDeFlor } from "@/components/pagina/VisualDeFlor";
import { enlaceWhatsApp, MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import { servicio } from "@/lib/datos-estructurados";

export const metadata: Metadata = {
  title: "Cours de yoga privés à Genève",
  alternates: { canonical: "/cours-prives-yoga-geneve" },
  description:
    "Des cours de yoga privés à Genève avec Sofia Costa : vinyasa, yoga flow ou yoga dynamique, rien que pour toi et à ton rythme.",
};

// por qué elegir el privado: razones generales, no datos de los cursos de ella (que faltan, ver Infos pratiques)
const POURQUOI = [
  { clave: "À ton rythme", texto: "Tu débutes, ou tu préfères découvrir le yoga sans le regard d’un groupe." },
  { clave: "Sur mesure", texto: "On part de ton corps, de ton énergie du jour et de ce que tu as envie de travailler." },
  { clave: "Tes horaires", texto: "Les cours en groupe ont des horaires fixes. En privé, le moment se décide avec moi." },
  {
    clave: "Enceinte ou après",
    texto: (
      <>
        Un cours privé pendant la grossesse ou le post-partum, toujours avec l’accord de ta sage-femme ou de ta
        gynécologue&nbsp;: <AConfirmer />
      </>
    ),
  },
];

// lo práctico: casi todo por confirmar con Sofía
const DATOS = [
  { dato: "Styles", valor: "Vinyasa, yoga flow et yoga dynamique" },
  { dato: "Où", valor: <>À Genève. Le lieu est <AConfirmer /></> },
  { dato: "Durée", valor: <AConfirmer /> },
  { dato: "Tarif", valor: <AConfirmer /> },
  { dato: "Paiement", valor: <AConfirmer /> },
  { dato: "Langue", valor: "Français" },
  { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga formée en Inde et en Suisse" },
];

export default async function CoursPrives() {
  const idioma = await idiomaActual();
  return (
    <main>
      <DatosEstructurados
        datos={[
          servicio(idioma, {
            nombre: "Cours de yoga privés à Genève",
            tipo: "Cours de yoga privé",
            ruta: "/cours-prives-yoga-geneve",
            descripcion: String(metadata.description),
          }),
        ]}
      />
      <EnteteDePage
        fil="Cours privés"
        titulo={
          <>
            Cours de yoga <Mano>privés</Mano> à Genève
          </>
        }
        intro={
          <>
            <p>Un cours rien que pour toi, à ton rythme.</p>
            <p>Les mêmes styles que mes cours&nbsp;: vinyasa, yoga flow et yoga dynamique.</p>
          </>
        }
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].prive)} target="_blank" rel="noopener noreferrer">
                Écrire sur WhatsApp
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#infos">
              Voir les infos pratiques
            </a>
          </>
        }
        visual={<VisualDeFlor esterilla className="mx-auto block aspect-[400/420] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[26rem]" />}
      />
      <Reperes id="pourquoi" titulo={<>Pourquoi un cours privé&nbsp;?</>} intro={<p>Quelques raisons de choisir le privé.</p>} reperes={POURQUOI} />
      <InfosPratiques datos={DATOS} nota="Les cours ne sont pas remboursés par l’assurance complémentaire.">
        <PedirInfos
          mensaje={MENSAJES[idioma].prive}
          texto="Le lieu, la durée et le tarif arrivent bientôt. En attendant, écris-moi : je te réponds avec les détails."
        />
      </InfosPratiques>
      <PourContinuer destinos={["cours", "prenatal", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].prive} />
    </main>
  );
}

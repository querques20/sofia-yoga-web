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
import type { Idioma } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";
import { servicio } from "@/lib/datos-estructurados";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa)
const fr = {
  meta: {
    title: "Cours de yoga privés à Genève",
    description:
      "Des cours de yoga privés à Genève avec Sofia Costa : vinyasa, yoga flow ou yoga dynamique, rien que pour toi et à ton rythme.",
  },
  // el nombre y el tipo de servicio que lee Google
  nombre: "Cours de yoga privés à Genève",
  tipo: "Cours de yoga privé",
  fil: "Cours privés",
  titulo: (
    <>
      Cours de yoga <Mano>privés</Mano> à Genève
    </>
  ),
  intro: (
    <>
      <p>Un cours rien que pour toi, à ton rythme.</p>
      <p>Les mêmes styles que mes cours&nbsp;: vinyasa, yoga flow et yoga dynamique.</p>
    </>
  ),
  escribir: "Écrire sur WhatsApp",
  verInfos: "Voir les infos pratiques",
  porqueTitulo: <>Pourquoi un cours privé&nbsp;?</>,
  porqueIntro: "Quelques raisons de choisir le privé.",
  // por qué elegir el privado: razones generales, no datos de los cursos de ella (que faltan, ver Infos pratiques)
  porque: [
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
  ],
  // lo práctico: casi todo por confirmar con Sofía
  datos: [
    { dato: "Styles", valor: "Vinyasa, yoga flow et yoga dynamique" },
    { dato: "Où", valor: <>À Genève. Le lieu est <AConfirmer /></> },
    { dato: "Durée", valor: <AConfirmer /> },
    { dato: "Tarif", valor: <AConfirmer /> },
    { dato: "Paiement", valor: <AConfirmer /> },
    { dato: "Langue", valor: "Français" },
    { dato: "Avec qui", valor: "Sofia Costa, professeure de yoga formée en Inde et en Suisse" },
  ],
  nota: "Les cours ne sont pas remboursés par l’assurance complémentaire.",
  pedirInfos: "Le lieu, la durée et le tarif arrivent bientôt. En attendant, écris-moi : je te réponds avec les détails.",
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Private yoga classes in Geneva",
      description:
        "Private yoga classes in Geneva with Sofia Costa: vinyasa, yoga flow or dynamic yoga, just for you and at your own pace.",
    },
    nombre: "Private yoga classes in Geneva",
    tipo: "Private yoga class",
    fil: "Private classes",
    titulo: (
      <>
        <Mano>Private</Mano> yoga classes in Geneva
      </>
    ),
    intro: (
      <>
        <p>A class just for you, at your own pace.</p>
        <p>The same styles as my classes: vinyasa, yoga flow and dynamic yoga.</p>
      </>
    ),
    escribir: "Message me on WhatsApp",
    verInfos: "See the practical info",
    porqueTitulo: <>Why a private class?</>,
    porqueIntro: "A few reasons to choose a private class.",
    porque: [
      { clave: "At your own pace", texto: "You’re a beginner, or you’d rather discover yoga without a group watching." },
      { clave: "Tailor-made", texto: "We start from your body, your energy that day and what you feel like working on." },
      { clave: "Your schedule", texto: "Group classes have fixed times. In a private class, the time is agreed with me." },
      {
        clave: "Pregnant or after",
        texto: (
          <>
            A private class during pregnancy or postnatal, always with the go-ahead of your midwife or gynaecologist:{" "}
            <AConfirmer />
          </>
        ),
      },
    ],
    datos: [
      { dato: "Styles", valor: "Vinyasa, yoga flow and dynamic yoga" },
      { dato: "Where", valor: <>In Geneva. The location is <AConfirmer /></> },
      { dato: "Length", valor: <AConfirmer /> },
      { dato: "Price", valor: <AConfirmer /> },
      { dato: "Payment", valor: <AConfirmer /> },
      { dato: "Language", valor: "French" },
      { dato: "Teacher", valor: "Sofia Costa, yoga teacher trained in India and Switzerland" },
    ],
    nota: "The classes aren’t reimbursed by supplementary health insurance.",
    pedirInfos: "The location, length and price are coming soon. In the meantime, write to me: I’ll reply with the details.",
  },
  es: {
    meta: {
      title: "Clases privadas de yoga en Ginebra",
      description:
        "Clases privadas de yoga en Ginebra con Sofia Costa: vinyasa, yoga flow o yoga dinámico, solo para ti y a tu ritmo.",
    },
    nombre: "Clases de yoga privadas en Ginebra",
    tipo: "Clase de yoga privada",
    fil: "Clases privadas",
    titulo: (
      <>
        Clases de yoga <Mano>privadas</Mano> en Ginebra
      </>
    ),
    intro: (
      <>
        <p>Una clase solo para ti, a tu ritmo.</p>
        <p>Los mismos estilos que mis clases: vinyasa, yoga flow y yoga dinámico.</p>
      </>
    ),
    escribir: "Escribir por WhatsApp",
    verInfos: "Ver la información práctica",
    porqueTitulo: <>¿Por qué una clase privada?</>,
    porqueIntro: "Algunas razones para elegir la clase privada.",
    porque: [
      { clave: "A tu ritmo", texto: "Estás empezando, o prefieres descubrir el yoga sin la mirada de un grupo." },
      { clave: "A tu medida", texto: "Partimos de tu cuerpo, de tu energía del día y de lo que tengas ganas de trabajar." },
      { clave: "Tus horarios", texto: "Las clases en grupo tienen horarios fijos. En privado, el momento se decide conmigo." },
      {
        clave: "Embarazada o después",
        texto: (
          <>
            Una clase privada durante el embarazo o el posparto, siempre con el visto bueno de tu matrona o de tu
            ginecóloga: <AConfirmer />
          </>
        ),
      },
    ],
    datos: [
      { dato: "Estilos", valor: "Vinyasa, yoga flow y yoga dinámico" },
      { dato: "Dónde", valor: <>En Ginebra. El lugar está <AConfirmer /></> },
      { dato: "Duración", valor: <AConfirmer /> },
      { dato: "Precio", valor: <AConfirmer /> },
      { dato: "Pago", valor: <AConfirmer /> },
      { dato: "Idioma", valor: "Francés" },
      { dato: "Con quién", valor: "Sofia Costa, profesora de yoga formada en la India y en Suiza" },
    ],
    nota: "El seguro complementario no reembolsa las clases.",
    pedirInfos: "El lugar, la duración y el precio llegarán pronto. Mientras tanto, escríbeme: te respondo con los detalles.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/cours-prives-yoga-geneve", TEXTOS[idioma].meta);
}

export default async function CoursPrives() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  return (
    <main>
      <DatosEstructurados
        datos={[
          servicio(idioma, {
            nombre: t.nombre,
            tipo: t.tipo,
            ruta: "/cours-prives-yoga-geneve",
            descripcion: t.meta.description,
          }),
        ]}
      />
      <EnteteDePage
        fil={t.fil}
        titulo={t.titulo}
        intro={t.intro}
        acciones={
          <>
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(MENSAJES[idioma].prive)} target="_blank" rel="noopener noreferrer">
                {t.escribir}
              </a>
            </Magnetique>
            <a className="enlace font-bold" href="#infos">
              {t.verInfos}
            </a>
          </>
        }
        visual={<VisualDeFlor esterilla className="mx-auto block aspect-[400/420] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[26rem]" />}
      />
      <Reperes id="pourquoi" titulo={t.porqueTitulo} intro={<p>{t.porqueIntro}</p>} reperes={t.porque} />
      <InfosPratiques datos={t.datos} nota={t.nota}>
        <PedirInfos mensaje={MENSAJES[idioma].prive} texto={t.pedirInfos} />
      </InfosPratiques>
      <PourContinuer destinos={["cours", "prenatal", "aPropos"]} />
      <Contact mensaje={MENSAJES[idioma].prive} />
    </main>
  );
}

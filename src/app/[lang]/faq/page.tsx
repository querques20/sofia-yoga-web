import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { Questions } from "@/components/pagina/Questions";
import { SurCettePage } from "@/components/pagina/SurCettePage";
import { VisualDeFlor } from "@/components/pagina/VisualDeFlor";
import { PREGUNTAS_COURS, PREGUNTAS_POST_PARTUM, PREGUNTAS_PRENATAL } from "@/contenido/preguntas";
import { idiomaActual } from "@/lib/idioma-actual";
import { type Idioma, rutaEn } from "@/lib/idiomas";
import { metadatos } from "@/lib/metadatos";

// los textos de la página en cada idioma (EN y ES, borrador para revisión nativa)
const fr = {
  meta: {
    title: "Questions fréquentes sur le yoga à Genève",
    description:
      "Les réponses sur le yoga prénatal, le yoga post-partum et les cours de yoga de Sofia Costa à Genève, réunies au même endroit.",
  },
  fil: "Questions fréquentes",
  titulo: (
    <>
      Questions <Mano>fréquentes</Mano>
    </>
  ),
  intro: <p>Le yoga prénatal, le post-partum et les cours&nbsp;: les réponses réunies au même endroit. Et si ta question n’y est pas, écris-moi.</p>,
  // el título de cada grupo y el texto del link a su página
  grupos: {
    prenatal: { id: "prenatal", titulo: "Yoga prénatal", enlace: "Tout sur le yoga prénatal" },
    postPartum: { id: "post-partum", titulo: "Yoga post-partum", enlace: "Tout sur le yoga post-partum" },
    cours: { id: "cours", titulo: "Cours de yoga", enlace: "Tout sur les cours de yoga" },
  },
};

const TEXTOS: Record<Idioma, typeof fr> = {
  fr,
  en: {
    meta: {
      title: "Frequently asked questions about yoga in Geneva",
      description:
        "Answers about Sofia Costa’s prenatal yoga, postnatal yoga and yoga classes in Geneva, all in one place.",
    },
    fil: "Frequently asked questions",
    titulo: (
      <>
        Frequently asked <Mano>questions</Mano>
      </>
    ),
    intro: <p>Prenatal yoga, postnatal yoga and the classes: the answers all in one place. And if your question isn’t here, write to me.</p>,
    grupos: {
      prenatal: { id: "prenatal", titulo: "Prenatal yoga", enlace: "Everything about prenatal yoga" },
      postPartum: { id: "post-partum", titulo: "Postnatal yoga", enlace: "Everything about postnatal yoga" },
      cours: { id: "cours", titulo: "Yoga classes", enlace: "Everything about the yoga classes" },
    },
  },
  es: {
    meta: {
      title: "Preguntas frecuentes sobre yoga en Ginebra",
      description:
        "Las respuestas sobre el yoga prenatal, el yoga posparto y las clases de yoga de Sofia Costa en Ginebra, reunidas en un solo lugar.",
    },
    fil: "Preguntas frecuentes",
    titulo: (
      <>
        Preguntas <Mano>frecuentes</Mano>
      </>
    ),
    intro: <p>El yoga prenatal, el posparto y las clases: las respuestas reunidas en un solo lugar. Y si tu pregunta no está aquí, escríbeme.</p>,
    grupos: {
      prenatal: { id: "prenatal", titulo: "Yoga prenatal", enlace: "Todo sobre el yoga prenatal" },
      postPartum: { id: "post-partum", titulo: "Yoga posparto", enlace: "Todo sobre el yoga posparto" },
      cours: { id: "cours", titulo: "Clases de yoga", enlace: "Todo sobre las clases de yoga" },
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaActual();
  return metadatos(idioma, "/faq", TEXTOS[idioma].meta);
}

// las preguntas de las tres páginas de clases, juntas (sitemap v3: /faq/). Sin datos estructurados acá:
// Google pide marcar cada pregunta en un solo lugar, y ya van en la página de su clase
export default async function Faq() {
  const idioma = await idiomaActual();
  const t = TEXTOS[idioma];
  const GRUPOS = [
    { ...t.grupos.prenatal, href: rutaEn(idioma, "/yoga-prenatal-geneve"), preguntas: PREGUNTAS_PRENATAL[idioma] },
    { ...t.grupos.postPartum, href: rutaEn(idioma, "/yoga-post-partum-geneve"), preguntas: PREGUNTAS_POST_PARTUM[idioma] },
    { ...t.grupos.cours, href: rutaEn(idioma, "/cours-de-yoga-geneve"), preguntas: PREGUNTAS_COURS[idioma] },
  ];
  return (
    <main>
      <EnteteDePage
        fil={t.fil}
        titulo={t.titulo}
        intro={t.intro}
        visual={<VisualDeFlor className="mx-auto block aspect-[400/420] w-[min(72vw,19rem)] lg:mr-0 lg:w-full lg:max-w-[26rem]" />}
      />
      <SurCettePage anclas={GRUPOS.map((g) => ({ href: `#${g.id}`, texto: g.titulo }))} />
      {GRUPOS.map((g) => (
        <Questions
          key={g.id}
          id={g.id}
          titulo={g.titulo}
          preguntas={g.preguntas}
          nota={
            <Link className="enlace font-bold" href={g.href}>
              {g.enlace}
            </Link>
          }
        />
      ))}
      <Contact />
    </main>
  );
}

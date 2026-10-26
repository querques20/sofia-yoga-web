import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { Questions } from "@/components/pagina/Questions";
import { SurCettePage } from "@/components/pagina/SurCettePage";
import { VisualDeFlor } from "@/components/pagina/VisualDeFlor";
import { PREGUNTAS_COURS, PREGUNTAS_POST_PARTUM, PREGUNTAS_PRENATAL } from "@/contenido/preguntas";

export const metadata: Metadata = {
  title: "Questions fréquentes sur le yoga à Genève",
  alternates: { canonical: "/faq" },
  description:
    "Les réponses sur le yoga prénatal, le yoga post-partum et les cours de yoga de Sofia Costa à Genève, réunies au même endroit.",
};

// las preguntas de las tres páginas de clases, juntas (sitemap v3: /faq/). Sin datos estructurados acá:
// Google pide marcar cada pregunta en un solo lugar, y ya van en la página de su clase
const GRUPOS = [
  { id: "prenatal", titulo: "Yoga prénatal", href: "/yoga-prenatal-geneve", enlace: "Tout sur le yoga prénatal", preguntas: PREGUNTAS_PRENATAL },
  { id: "post-partum", titulo: "Yoga post-partum", href: "/yoga-post-partum-geneve", enlace: "Tout sur le yoga post-partum", preguntas: PREGUNTAS_POST_PARTUM },
  { id: "cours", titulo: "Cours de yoga", href: "/cours-de-yoga-geneve", enlace: "Tout sur les cours de yoga", preguntas: PREGUNTAS_COURS },
];

export default function Faq() {
  return (
    <main>
      <EnteteDePage
        fil="Questions fréquentes"
        titulo={
          <>
            Questions <Mano>fréquentes</Mano>
          </>
        }
        intro={<p>Le yoga prénatal, le post-partum et les cours&nbsp;: les réponses réunies au même endroit. Et si ta question n’y est pas, écris-moi.</p>}
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

import type { Metadata } from "next";
import { Bienvenue } from "@/components/Bienvenue";
import { Canaux } from "@/components/contact/Canaux";
import { Composeur } from "@/components/contact/Composeur";
import { Fleur } from "@/components/Fleur";
import { EnteteDePage, Mano } from "@/components/pagina/EnteteDePage";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { negocio, paginaDeContacto } from "@/lib/datos-estructurados";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Écris à Sofia Costa, professeure de yoga à Genève, par WhatsApp, par e-mail ou sur Instagram, pour une question sur les cours ou sur le programme.",
};

// lo que conviene contar en el primer mensaje (no son requisitos: es para responder más rápido)
const AYUDAS = [
  "Si tu es enceinte : à combien de semaines tu es.",
  "Si tu as accouché : quand, et si ta rééducation du périnée est faite.",
  "Le cours ou l’atelier qui t’intéresse, et tes disponibilités.",
];

export default function ContactPage() {
  return (
    <main>
      <DatosEstructurados datos={[negocio(), paginaDeContacto()]} />
      <EnteteDePage
        fil="Contact"
        titulo={
          <>
            Écris-<Mano>moi</Mano>
          </>
        }
        intro={
          <p>Pour une question sur les cours, les ateliers ou le programme en ligne, écris-moi par WhatsApp, par e-mail ou sur Instagram.</p>
        }
        visual={<Composeur />}
        paralaje={false}
      />
      {/* lo que le sirve a Sofía para contestar de una: así no hace falta ir y volver con preguntas */}
      <section className="pb-[clamp(4rem,10vw,7rem)]">
        <div className="contenedor grid gap-8 lg:grid-cols-12">
          <h2 className="titre text-[clamp(2.2rem,5vw,3.6rem)] lg:col-span-5">Ce qui m’aide à te répondre</h2>
          <ul className="space-y-4 text-[1.12rem] leading-relaxed lg:col-span-7">
            {AYUDAS.map((ayuda) => (
              <li key={ayuda} className="flex gap-4 border-t border-verde/20 pt-4">
                <Fleur className="mt-1 h-5 w-5 shrink-0 text-violeta" trazo={10} />
                <span>{ayuda}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Canaux />
      <section className="pb-[clamp(4rem,10vw,7rem)]">
        <Bienvenue className="contenedor" />
      </section>
    </main>
  );
}

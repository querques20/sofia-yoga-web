import type { Metadata } from "next";
import { Approche } from "@/components/Approche";
import { Bande } from "@/components/Bande";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Parcours } from "@/components/Parcours";
import { PourQui } from "@/components/PourQui";
import { Pratique } from "@/components/Pratique";
import { Programme } from "@/components/Programme";
import { DatosEstructurados } from "@/components/pagina/DatosEstructurados";
import { persona, negocio } from "@/lib/datos-estructurados";
import { idiomaActual } from "@/lib/idioma-actual";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Accueil() {
  const idioma = await idiomaActual();
  return (
    <main>
      <DatosEstructurados datos={[persona(idioma), negocio(idioma)]} />
      <Hero />
      <PourQui />
      <Programme />
      <Approche />
      <Bande />
      <Parcours />
      <Pratique />
      <Contact />
    </main>
  );
}

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

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Accueil() {
  return (
    <main>
      <DatosEstructurados datos={[persona(), negocio()]} />
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

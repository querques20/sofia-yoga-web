import { Approche } from "@/components/Approche";
import { Bande } from "@/components/Bande";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Parcours } from "@/components/Parcours";
import { PourQui } from "@/components/PourQui";
import { Pratique } from "@/components/Pratique";
import { Programme } from "@/components/Programme";

export default function Accueil() {
  return (
    <main>
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

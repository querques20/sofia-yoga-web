import type { ReactNode } from "react";
import { AConfirmer } from "../pagina/AConfirmer";
import { PilaDePasos } from "../pagina/PilaDePasos";
import type { Paso } from "../pagina/pila/PanelPaso";

// el orden para volver a moverse después del parto (contexto maestro, sección 7: seguridad), con los datos
// generales de los HUG, de la OPAS y de las recomendaciones suizas de actividad física
const PASOS: Paso[] = [
  {
    titulo: "Le contrôle post-partum",
    corto: "Le contrôle",
    idea: (
      <>
        Entre la 6<sup>e</sup> et la 10<sup>e</sup> semaine après la naissance.
      </>
    ),
    texto: "C’est le bon moment pour parler de la rééducation du périnée, qui se fait sur ordonnance.",
  },
  {
    titulo: "La rééducation du périnée",
    corto: "Le périnée",
    idea: "Avec une physio. Elle est indispensable, et le yoga ne la remplace pas.",
    texto: "Aux HUG, elle commence en général deux à trois mois après l’accouchement et compte six à neuf séances.",
  },
  {
    titulo: "L’accord, puis le mouvement",
    corto: "Le mouvement",
    idea: "Avec l’accord de ta sage-femme ou de ta gynécologue.",
    texto: (
      <>
        Je ne te demande aucun document. On reprend tout en douceur, puis de plus en plus, comme le conseillent les
        recommandations suisses. Combien de semaines après l’accouchement&nbsp;? <AConfirmer />
      </>
    ),
  },
];

/**
 * Los tres pasos, en orden, como paneles que se apilan al bajar (PilaDePasos). Lo que llega como children es
 * la banda que los barre al final; detrás viene «Bon à savoir en Suisse», en salvia clara
 */
export function QuandReprendre({ children }: { children?: ReactNode }) {
  return (
    <PilaDePasos
      id="quand"
      titulo={<>Quand reprendre&nbsp;?</>}
      intro="Après l’accouchement, trois étapes, dans cet ordre."
      pasos={PASOS}
      cierre={children}
      fondoSiguiente="bg-salvia-clara"
    />
  );
}

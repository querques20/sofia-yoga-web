import type { ReactNode } from "react";
import { PilaDePasos } from "../pagina/PilaDePasos";
import type { Paso } from "../pagina/pila/PanelPaso";

/** los textos de la sección: los pasos (con los datos generales de los HUG, de la OPAS y de las recomendaciones suizas), en el idioma de la página */
export type TextosQuandReprendre = { titulo: ReactNode; intro: ReactNode; etiquetaPasos: string; pasos: Paso[] };

/**
 * Los tres pasos, en orden, como paneles que se apilan al bajar (PilaDePasos). Lo que llega como children es
 * la banda que los barre al final; detrás viene «Bon à savoir en Suisse», en salvia clara
 */
export function QuandReprendre({ t, children }: { t: TextosQuandReprendre; children?: ReactNode }) {
  return (
    <PilaDePasos
      id="quand"
      titulo={t.titulo}
      intro={t.intro}
      etiquetaPasos={t.etiquetaPasos}
      pasos={t.pasos}
      cierre={children}
      fondoSiguiente="bg-salvia-clara"
    />
  );
}

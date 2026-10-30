import type { ReactNode } from "react";
import { MENSAJES } from "@/lib/contacto";
import { idiomaActual } from "@/lib/idioma-actual";
import { InfosPratiques } from "./pagina/InfosPratiques";
import { PedirInfos } from "./pagina/PedirInfos";

// lo que sabemos para todos los cursos; lugares, horarios y precios todavía no los tenemos
export type TextosPratique = { datos: { dato: string; valor: ReactNode }[]; nota: string; pedir: string };

export async function Pratique({ t }: { t: TextosPratique }) {
  const idioma = await idiomaActual();
  return (
    <InfosPratiques id="pratique" datos={t.datos} nota={t.nota}>
      <PedirInfos mensaje={MENSAJES[idioma].ouQuand} texto={t.pedir} />
    </InfosPratiques>
  );
}

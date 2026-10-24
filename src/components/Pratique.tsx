import { MENSAJES } from "@/lib/contacto";
import { AConfirmer } from "./pagina/AConfirmer";
import { InfosPratiques } from "./pagina/InfosPratiques";
import { PedirInfos } from "./pagina/PedirInfos";

// lo que sabemos para todos los cursos; lugares, horarios y precios todavía no los tenemos
const DATOS = [
  { dato: "Où", valor: <>À Genève. Les lieux sont <AConfirmer /></> },
  { dato: "Quand", valor: <>Les horaires sont <AConfirmer /></> },
  { dato: "Combien", valor: <>Les tarifs sont <AConfirmer /></> },
  { dato: "Paiement", valor: <AConfirmer /> },
  { dato: "Pendant la grossesse", valor: "Avec l’accord de ta sage-femme ou de ta gynécologue." },
  { dato: "Après l’accouchement", valor: "Après la rééducation du périnée avec une physio." },
];

export function Pratique() {
  return (
    <InfosPratiques id="pratique" datos={DATOS} nota="Les cours ne sont pas remboursés par l’assurance complémentaire.">
      <PedirInfos
        mensaje={MENSAJES.ouQuand}
        texto="Les lieux, les horaires et les tarifs arrivent bientôt. En attendant, écris-moi : je te dis où et quand ont lieu les prochains cours."
      />
    </InfosPratiques>
  );
}

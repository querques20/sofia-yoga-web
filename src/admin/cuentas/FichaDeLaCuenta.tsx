import { Encabezado, PantallaDeAjustes } from "@sofia/kit-admin";
import { Momento } from "@/admin/armazon/Momento";
import { EstadoDeLaCuenta } from "./EstadoDeLaCuenta";
import {
  ApartadoDeDatos,
  ApartadoDeLaDireccion,
  ApartadoDeSesiones,
  ApartadoDelEstado,
  ApartadoDelRol,
  ApartadoDelSegundoFactor,
  type DeLaFicha,
} from "./ficha/Apartados";
import { VOLVER_A_CUENTAS } from "./pantallas";

type Props = DeLaFicha & { correoPropio: string };

/**
 * Una cuenta (SPEC de work/cuentas §4.3): «← Cuentas», sus datos y un
 * apartado por cosa que se le puede hacer (ficha/Apartados.tsx), cada uno
 * solo si `queSePuede` lo deja o si hay algo que mostrar. Sin primario: los
 * apartados son independientes, como en Mi cuenta.
 */
export function FichaDeLaCuenta({ cuenta, se, esLaPropia, correoPropio }: Props) {
  const deLaFicha = { cuenta, se, esLaPropia };
  return (
    <PantallaDeAjustes>
      <Encabezado
        volver={VOLVER_A_CUENTAS}
        titulo={cuenta.nombre}
        estado={<EstadoDeLaCuenta estado={cuenta.estado} invitacionVencida={cuenta.invitacionVencida} />}
        detalle={
          <>
            <span className="break-all">{cuenta.correo}</span>
            <span>{cuenta.ultimoAcceso ? <>Entró <Momento iso={cuenta.ultimoAcceso} relativo /></> : "Nunca entró"}</span>
          </>
        }
      />
      <div>
        <ApartadoDeDatos {...deLaFicha} correoPropio={correoPropio} />
        <ApartadoDelRol {...deLaFicha} correoPropio={correoPropio} />
        <ApartadoDelEstado {...deLaFicha} />
        <ApartadoDelSegundoFactor {...deLaFicha} />
        <ApartadoDeSesiones {...deLaFicha} />
        <ApartadoDeLaDireccion {...deLaFicha} correoPropio={correoPropio} />
      </div>
    </PantallaDeAjustes>
  );
}

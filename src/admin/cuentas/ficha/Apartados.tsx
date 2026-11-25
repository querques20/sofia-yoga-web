import Link from "next/link";
import { QUE_PUEDE, ROL_AL_DEJAR_LA_DIRECCION, segundoFactorObligatorio, type LoQueSePuede, type Rol } from "@sofia/auth";
import { Apartado, Insignia } from "@sofia/kit-admin";
import { Momento } from "@/admin/armazon/Momento";
import { ListaDeSesiones } from "@/admin/mi-cuenta/Sesiones";
import { cerrarSusSesiones } from "@/datos/acciones/cuentas";
import type { FichaDeCuenta } from "@/datos/consultas/cuentas";
import { AccionesDeEstado, AccionesDeInvitacion } from "./Acciones";
import { BotonDeAccion } from "./BotonDeAccion";
import { FormularioDeLaDireccion } from "./FormularioDeLaDireccion";
import { FormularioDelCorreo } from "./FormularioDelCorreo";
import { FormularioDelRol } from "./FormularioDelRol";

// Los apartados de la ficha de una cuenta (FichaDeLaCuenta.tsx), uno por
// cosa que se le puede hacer. Cada uno dice en su frase qué pasa si se toca.

export type DeLaFicha = { cuenta: FichaDeCuenta & { rol: Rol }; se: LoQueSePuede; esLaPropia: boolean };

export function ApartadoDeDatos({ cuenta, se, esLaPropia, correoPropio }: DeLaFicha & { correoPropio: string }) {
  return (
    <Apartado
      id="datos"
      titulo="Datos"
      descripcion="Con el que entra. Cambiarlo cierra sus sesiones y avisa a las dos direcciones."
    >
      {esLaPropia ? (
        <p className="mb-4 max-w-prose text-admin-meta text-gris-texto">
          Es tu cuenta: tu nombre, tu contraseña y tus sesiones se cambian desde{" "}
          <Link href="/admin/mi-cuenta" className="rounded-sm text-azul-medio underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio">
            Mi cuenta
          </Link>
          .
        </p>
      ) : null}
      {se.cambiarElCorreo ? (
        <FormularioDelCorreo idDeCuenta={cuenta.id} correo={cuenta.correo} correoPropio={correoPropio} />
      ) : (
        <p className="break-all">{cuenta.correo}</p>
      )}
    </Apartado>
  );
}

export function ApartadoDelRol({ cuenta, se, correoPropio }: DeLaFicha & { correoPropio: string }) {
  return (
    <Apartado id="rol" titulo="Rol" descripcion="Si el rol nuevo le pide un segundo factor que no tenía, se cierran sus sesiones.">
      <p className="font-medium capitalize">{cuenta.rol}</p>
      <p className="mt-1 mb-4 max-w-prose text-admin-meta text-gris-texto">{QUE_PUEDE[cuenta.rol]}</p>
      {se.cambiarElRol ? <FormularioDelRol idDeCuenta={cuenta.id} rol={cuenta.rol} correoPropio={correoPropio} /> : null}
    </Apartado>
  );
}

/** Mientras está pendiente, su invitación; después, su estado. */
export function ApartadoDelEstado({ cuenta, se }: DeLaFicha) {
  if (cuenta.estado !== "pendiente") {
    return (
      <Apartado id="estado" titulo="Estado" descripcion="Suspendida no entra; su nombre sigue en lo que hizo. Sin actividad, se borra.">
        <AccionesDeEstado cuenta={cuenta} se={se} />
      </Apartado>
    );
  }
  const vence = cuenta.invitacionVence;
  return (
    <Apartado id="invitacion" titulo="Invitación" descripcion="Todavía no eligió contraseña. Reenviar invalida el enlace anterior.">
      <p className="mb-4 text-admin-meta">
        {vence ? (
          <>
            {cuenta.invitacionVencida ? "Venció el " : "Vence el "}
            <Momento iso={vence} />.
          </>
        ) : (
          "Todavía no se le mandó ninguna invitación."
        )}
      </p>
      <AccionesDeInvitacion cuenta={cuenta} se={se} />
    </Apartado>
  );
}

export function ApartadoDelSegundoFactor({ cuenta }: DeLaFicha) {
  return (
    <Apartado id="segundo-factor" titulo="Segundo factor" descripcion="Un código por correo al entrar. Cada persona lo maneja en Mi cuenta.">
      {cuenta.segundoFactor ? <Insignia tono="normal">Activo</Insignia> : <Insignia tono="apagado">Apagado</Insignia>}
      {segundoFactorObligatorio(cuenta.rol) ? <p className="mt-2 text-admin-meta text-gris-texto">Es obligatorio para su rol.</p> : null}
    </Apartado>
  );
}

/** Solo si está activa: una pendiente nunca entró y una suspendida no tiene sesiones. */
export function ApartadoDeSesiones({ cuenta, se }: DeLaFicha) {
  if (cuenta.estado !== "activa") return null;
  return (
    <Apartado id="sesiones" titulo="Sesiones" descripcion="Dónde tiene el admin abierto. Cerrarlas lo obliga a entrar de nuevo.">
      {cuenta.sesiones.length ? (
        <div className="space-y-4">
          <ListaDeSesiones sesiones={cuenta.sesiones} />
          {se.cerrarSusSesiones ? (
            <BotonDeAccion
              accion={cerrarSusSesiones}
              idDeCuenta={cuenta.id}
              texto="Cerrar sus sesiones"
              hecho="Sesiones cerradas"
              enCurso="Cerrando…"
            />
          ) : null}
        </div>
      ) : (
        <p className="text-admin-meta text-gris-texto">No tiene el admin abierto en ningún lado.</p>
      )}
    </Apartado>
  );
}

export function ApartadoDeLaDireccion({ cuenta, se, correoPropio }: DeLaFicha & { correoPropio: string }) {
  if (!se.pasarleLaDireccion) return null;
  return (
    <Apartado
      id="direccion"
      titulo="La dirección"
      descripcion={`Dirige una sola persona. Al pasarla, quedás como ${ROL_AL_DEJAR_LA_DIRECCION} y solo ella te la devuelve.`}
    >
      <FormularioDeLaDireccion idDeCuenta={cuenta.id} nombre={cuenta.nombre} correoPropio={correoPropio} />
    </Apartado>
  );
}

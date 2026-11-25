"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { QUE_PUEDE, ROLES_QUE_SE_ASIGNAN, ROL_POR_DEFECTO, darloPideContrasena, type Rol } from "@sofia/auth";
import { Aviso, Boton, CampoContrasena, CampoSimple, Encabezado, useAvisoBreve, useFrenarSalida } from "@sofia/kit-admin";
import { invitar } from "@/datos/acciones/invitaciones";
import { VOLVER_A_CUENTAS } from "./pantallas";

/**
 * Invitar a alguien (SPEC de work/cuentas §4.2): correo, nombre y rol. Va por
 * `onSubmit` y no por `action`, como el nombre de Mi cuenta: ante un rechazo
 * («ya hay una cuenta con ese correo») se corrige lo escrito, no se empieza de
 * nuevo. Invitar con un rol que maneja las cuentas pide tu contraseña, como
 * pasar la dirección: el campo aparece al elegirlo. Al terminar lleva a la
 * cuenta nueva, que dice si el correo salió.
 *
 * Es un solo formulario, así que su botón va en el encabezado fijo (DESIGN.md
 * §11, «Guardar»): desde que se escribe algo pasa a navy y salir pregunta.
 */
export function FormularioDeInvitacion({ correoPropio, detalle }: { correoPropio: string; detalle: string }) {
  const router = useRouter();
  const avisar = useAvisoBreve();
  const [elegido, setElegido] = useState<Rol>(ROL_POR_DEFECTO);
  const [error, setError] = useState<{ detalle: string; campo?: "contrasena" } | null>(null);
  const [mandando, setMandando] = useState(false);
  const [escrito, setEscrito] = useState(false);
  const idDelError = useId();
  const idDelFormulario = useId();
  // Mientras se manda, no: al terminar, el formulario lleva a la cuenta nueva.
  const frenada = useFrenarSalida(escrito && !mandando);

  async function mandar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    setMandando(true);
    setError(null);
    const resultado = await invitar({
      correo: String(datos.get("correo") ?? ""),
      nombre: String(datos.get("nombre") ?? ""),
      rol: String(datos.get("rol") ?? ""),
      contrasena: String(datos.get("contrasena") ?? ""),
    });
    if (!resultado.ok || !resultado.id) {
      setError(resultado);
      setMandando(false);
      return;
    }
    // El aviso breve sigue en la cuenta nueva: vive en el layout. Si el correo no salió, es un error y se queda.
    avisar(
      resultado.correoSalio
        ? { tono: "exito", texto: "Invitación enviada", detalle: `Le llega a ${String(datos.get("correo") ?? "")}.` }
        : { tono: "error", texto: "La cuenta quedó creada, pero la invitación no salió", detalle: "El envío de correos no está andando: reenviala cuando ande." },
    );
    router.push(`/admin/cuentas/${resultado.id}`);
  }

  return (
    <>
      {frenada.dialogo}
      <Encabezado
        fijo
        resaltado={escrito}
        volver={VOLVER_A_CUENTAS}
        titulo="Invitar a alguien"
        detalle={detalle}
        acciones={
          <Boton variante="primario" sobreAzul={escrito} type="submit" form={idDelFormulario} disabled={mandando} aria-busy={mandando || undefined}>
            {mandando ? "Mandando…" : "Mandar la invitación"}
          </Boton>
        }
        avisos={
          error ? (
            <Aviso tono="error" id={idDelError}>
              {error.detalle}
            </Aviso>
          ) : undefined
        }
      />
      {/* Abajo, en el celular, el lugar de la barra fija del botón. */}
      <form id={idDelFormulario} onSubmit={mandar} onChange={() => setEscrito(true)} className="space-y-6 max-lg:pb-28">
        <CampoSimple etiqueta="Correo" name="correo" type="email" required maxLength={254} autoComplete="off" />
        <CampoSimple etiqueta="Nombre" name="nombre" required maxLength={80} autoComplete="off" />
        <fieldset>
          <legend className="text-admin-meta font-medium">Rol</legend>
          <div className="mt-2 space-y-3">
            {ROLES_QUE_SE_ASIGNAN.map((rol) => (
              <label key={rol} className="flex gap-3">
                <input
                  type="radio"
                  name="rol"
                  value={rol}
                  required
                  defaultChecked={rol === ROL_POR_DEFECTO}
                  onChange={() => setElegido(rol)}
                  className="mt-1 size-4 shrink-0 accent-azul-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio"
                />
                <span>
                  <span className="font-medium capitalize">{rol}</span>
                  <span className="mt-0.5 block text-admin-meta text-gris-texto">{QUE_PUEDE[rol]}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-admin-meta text-gris-texto">Dirige no se invita: quien dirige le pasa la dirección a otra persona, desde su cuenta.</p>
        </fieldset>
        {darloPideContrasena(elegido) ? (
          <div>
            <input type="text" name="usuario" autoComplete="username" value={correoPropio} readOnly hidden />
            <CampoContrasena
              etiqueta="Tu contraseña"
              name="contrasena"
              autoComplete="current-password"
              ayuda={`Para invitar con el rol ${elegido}, que maneja las cuentas.`}
              invalido={error?.campo === "contrasena"}
              idDelError={idDelError}
            />
          </div>
        ) : null}
      </form>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Boton, Confirmacion, sinListo, useAvisoBreve, type Variante } from "@sofia/kit-admin";

type Resultado = { ok: boolean; detalle: string };

/**
 * Una acción de un clic sobre una cuenta (suspender, reactivar, cerrar sus
 * sesiones, reenviar, cancelar, borrar). Lo que pasó lo dice un aviso breve,
 * nombrado con `hecho` («Cuenta suspendida»). Lo que no se deshace pregunta
 * antes, en el lugar del botón (`Confirmacion`, DESIGN.md §11). Si la cuenta
 * deja de existir, lleva a la lista.
 */
export function BotonDeAccion({
  accion,
  idDeCuenta,
  texto,
  hecho,
  enCurso,
  variante = "secundario",
  confirmar,
  irA,
}: {
  accion: (idDeCuenta: string) => Promise<Resultado>;
  idDeCuenta: string;
  texto: string;
  /** Cómo se dice que salió: «Cuenta suspendida», «Sesiones cerradas». */
  hecho: string;
  enCurso: string;
  variante?: Variante;
  /** Para lo que no se deshace: la pregunta y el botón que lo hace («Sí, borrar»). */
  confirmar?: { pregunta: string; boton: string };
  /** Adónde ir si anduvo: cancelar o borrar dejan sin cuenta que mostrar. */
  irA?: string;
}) {
  const router = useRouter();
  const avisar = useAvisoBreve();
  const [corriendo, setCorriendo] = useState(false);
  const [preguntando, setPreguntando] = useState(false);

  async function hacer() {
    setCorriendo(true);
    const r = await accion(idDeCuenta);
    setCorriendo(false);
    setPreguntando(false);
    avisar(r.ok ? { tono: "exito", texto: hecho, detalle: sinListo(r.detalle) } : { tono: "error", texto: r.detalle });
    if (!r.ok) return;
    if (irA) router.push(irA);
    else router.refresh();
  }

  return (
    <div className="max-w-md space-y-3">
      {preguntando && confirmar ? (
        <Confirmacion
          pregunta={confirmar.pregunta}
          confirmar={confirmar.boton}
          corriendo={corriendo ? enCurso : null}
          alConfirmar={hacer}
          alCancelar={() => setPreguntando(false)}
        />
      ) : (
        <Boton
          variante={variante}
          onClick={confirmar ? () => setPreguntando(true) : hacer}
          disabled={corriendo}
          aria-busy={corriendo || undefined}
        >
          {corriendo ? enCurso : texto}
        </Boton>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Aviso, BotonDeAcceso, CampoSimple, ENLACE_DE_ACCESO } from "@sofia/kit-admin";
import { authCliente } from "@/admin/auth-cliente";

export function FormularioOlvide() {
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  // Por `onSubmit`, como FormularioEntrar: así «Mandando…» frena el segundo clic.
  async function pedir(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    setEnviando(true);
    setError(null);
    const { error: fallo } = await authCliente.requestPasswordReset({
      email: String(datos.get("email") ?? ""),
      redirectTo: "/admin/nueva-contrasena",
    });
    setEnviando(false);
    if (fallo && fallo.status === 429) {
      setError("Demasiados pedidos. Esperá unos minutos y probá de nuevo.");
      return;
    }
    // Se confirma SIEMPRE, exista o no el correo. Decir «esa cuenta no existe»
    // convierte esta pantalla en un buscador de correos válidos.
    setListo(true);
  }

  if (listo) {
    return (
      <Aviso tono="bien">
        Si ese correo tiene una cuenta, le llegó un enlace para elegir una contraseña nueva.
        Revisá también el correo no deseado.
      </Aviso>
    );
  }

  return (
    <form onSubmit={pedir} className="space-y-4">
      <CampoSimple etiqueta="Correo" name="email" type="email" required autoComplete="email" autoFocus />
      {error ? <Aviso tono="error">{error}</Aviso> : null}
      <BotonDeAcceso type="submit" disabled={enviando}>
        {enviando ? "Mandando…" : "Mandarme el enlace"}
      </BotonDeAcceso>
      <p className="text-center text-sm">
        <Link className={ENLACE_DE_ACCESO} href="/admin/entrar">
          Volver
        </Link>
      </p>
    </form>
  );
}

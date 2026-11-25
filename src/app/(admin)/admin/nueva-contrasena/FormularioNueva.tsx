"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CONTRASENA_FILTRADA, LARGO_MINIMO_CONTRASENA } from "@sofia/auth";
import { Aviso, BotonDeAcceso, CampoContrasena } from "@sofia/kit-admin";
import { authCliente } from "@/admin/auth-cliente";

/** Qué campo rechazó el formulario, para marcarlo con `aria-invalid`. */
type Rechazado = "contrasena" | "repetida" | null;

export function FormularioNueva() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [error, setError] = useState<string | null>(null);
  const [rechazado, setRechazado] = useState<Rechazado>(null);
  const [enviando, setEnviando] = useState(false);
  // El campo rechazado apunta al aviso que explica por qué (`aria-describedby`).
  const idDelError = useId();

  function rechazar(campo: Rechazado, mensaje: string) {
    setRechazado(campo);
    setError(mensaje);
  }

  // Por `onSubmit`, como FormularioEntrar: así «Guardando…» frena el segundo clic.
  async function guardar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    const nueva = String(datos.get("contrasena") ?? "");
    // `minLength` ya lo frena en el navegador; esto cubre al que lo saltea.
    if (nueva.length < LARGO_MINIMO_CONTRASENA) {
      rechazar("contrasena", `La contraseña tiene que tener ${LARGO_MINIMO_CONTRASENA} caracteres o más.`);
      return;
    }
    if (nueva !== String(datos.get("repetida") ?? "")) {
      rechazar("repetida", "Las dos contraseñas no coinciden.");
      return;
    }
    setEnviando(true);
    setError(null);
    setRechazado(null);
    const { error: fallo } = await authCliente.resetPassword({ newPassword: nueva, token });
    setEnviando(false);
    if (fallo?.code === CONTRASENA_FILTRADA) {
      rechazar("contrasena", "Esa contraseña aparece en filtraciones de otros sitios, así que es de las primeras que se prueban. Elegí otra.");
      return;
    }
    if (fallo) {
      // Un 5xx no dice nada del enlace (por ejemplo, no se pudo revisar si la contraseña está filtrada).
      setError(fallo.status >= 500 ? "No se pudo guardar la contraseña; probá de nuevo en un rato." : "Ese enlace ya no sirve. Pedí uno nuevo desde «Olvidé mi contraseña».");
      return;
    }
    // Entrar lo dice: sin el aviso, su pantalla es casi igual a esta y parece que no pasó nada.
    router.push("/admin/entrar?contrasena=guardada");
  }

  if (!token) {
    return (
      <Aviso tono="error">
        Falta el enlace del correo. Entrá desde el que te llegó, o pedí uno nuevo.
      </Aviso>
    );
  }

  return (
    <form onSubmit={guardar} className="space-y-4">
      <CampoContrasena
        etiqueta="Contraseña nueva"
        name="contrasena"
        autoComplete="new-password"
        minLength={LARGO_MINIMO_CONTRASENA}
        ayuda="Doce caracteres o más."
        autoFocus
        invalido={rechazado === "contrasena"}
        idDelError={idDelError}
      />
      <CampoContrasena
        etiqueta="Repetila"
        name="repetida"
        autoComplete="new-password"
        minLength={LARGO_MINIMO_CONTRASENA}
        invalido={rechazado === "repetida"}
        idDelError={idDelError}
      />
      {error ? (
        <Aviso tono="error" id={idDelError}>
          {error}
        </Aviso>
      ) : null}
      <BotonDeAcceso type="submit" disabled={enviando}>
        {enviando ? "Guardando…" : "Guardar"}
      </BotonDeAcceso>
    </form>
  );
}

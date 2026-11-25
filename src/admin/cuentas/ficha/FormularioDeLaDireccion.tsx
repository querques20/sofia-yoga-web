"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ROL_AL_DEJAR_LA_DIRECCION } from "@sofia/auth";
import { Aviso, Boton, breveDe, CampoContrasena, Confirmacion, useAvisoBreve } from "@sofia/kit-admin";
import { pasarLaDireccion } from "@/datos/acciones/direccion";

/**
 * Pasarle la dirección a otra persona: pide otra vez la contraseña de quien
 * dirige y, como no se deshace sola (la devuelve la otra persona, si quiere),
 * pregunta en el lugar del botón (`Confirmacion`). Si anda, este apartado deja
 * de estar (ya no dirigís), y lo dice un aviso breve.
 */
export function FormularioDeLaDireccion({ idDeCuenta, nombre, correoPropio }: { idDeCuenta: string; nombre: string; correoPropio: string }) {
  const router = useRouter();
  const avisar = useAvisoBreve();
  const [resultado, setResultado] = useState<{ ok: boolean; detalle: string } | null>(null);
  const [contrasena, setContrasena] = useState<string | null>(null);
  const [pasando, setPasando] = useState(false);
  const idDelAviso = useId();

  function preguntar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setResultado(null);
    setContrasena(String(new FormData(evento.currentTarget).get("contrasena") ?? ""));
  }

  async function pasar() {
    if (contrasena === null) return;
    setPasando(true);
    const r = await pasarLaDireccion(idDeCuenta, contrasena);
    setPasando(false);
    setContrasena(null);
    if (r.ok) {
      avisar(breveDe(r, "Dirección pasada"));
      router.replace(`/admin/cuentas/${idDeCuenta}`);
      return;
    }
    setResultado(r);
  }

  const rechazado = resultado !== null && !resultado.ok;
  return (
    <form onSubmit={preguntar} className="max-w-md space-y-4">
      <input type="text" name="usuario" autoComplete="username" value={correoPropio} readOnly hidden />
      <CampoContrasena etiqueta="Tu contraseña" name="contrasena" autoComplete="current-password" invalido={rechazado} idDelError={idDelAviso} />
      {resultado ? (
        <Aviso tono="error" id={idDelAviso}>
          {resultado.detalle}
        </Aviso>
      ) : null}
      {contrasena !== null ? (
        <Confirmacion
          pregunta={`¿Pasarle la dirección a ${nombre}? Vos quedás con el rol ${ROL_AL_DEJAR_LA_DIRECCION}, y solo esa persona te la puede devolver.`}
          confirmar="Sí, pasarla"
          corriendo={pasando ? "Pasando…" : null}
          alConfirmar={pasar}
          alCancelar={() => setContrasena(null)}
        />
      ) : (
        <Boton variante="secundario" type="submit">
          {`Pasarle la dirección a ${nombre}`}
        </Boton>
      )}
    </form>
  );
}

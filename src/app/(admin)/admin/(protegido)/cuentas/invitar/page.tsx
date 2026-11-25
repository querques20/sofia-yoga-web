import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { puede } from "@sofia/auth";
import { PantallaDeAjustes } from "@sofia/kit-admin";
import { SinPermiso } from "@/admin/armazon/SinPermiso";
import { FormularioDeInvitacion } from "@/admin/cuentas/FormularioDeInvitacion";
import { sesionActual } from "@/datos/sesion";
import { HORAS_DE_LA_INVITACION } from "@/datos/sobre-cuentas";

export const metadata: Metadata = { title: "Invitar" };
// Lee la sesión: se dibuja en cada pedido, como todo el admin (`app/(admin)/layout.tsx`).
export const instant = false;

// Invitar a alguien (SPEC de work/cuentas §4.2).
export default async function Invitar() {
  const sesion = await sesionActual();
  if (!sesion) redirect("/admin/entrar");
  // La guarda del layout solo oculta la interfaz: esta página se renderiza
  // igual y viaja en el payload. El permiso se corta acá, como en las demás.
  if (!puede(sesion.user.rol, "usarCuentas")) return <SinPermiso capacidad="usarCuentas" rol={sesion.user.rol} />;
  return (
    <PantallaDeAjustes>
      <FormularioDeInvitacion correoPropio={sesion.user.email} detalle={`Le llega un correo para elegir su contraseña. El enlace vence a las ${HORAS_DE_LA_INVITACION} horas.`} />
    </PantallaDeAjustes>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MiCuenta } from "@/admin/mi-cuenta/MiCuenta";
import { sesionesAbiertas } from "@/datos/consultas/mi-cuenta";
import { sesionActual } from "@/datos/sesion";

export const metadata: Metadata = { title: "Mi cuenta" };
// Lee la sesión: se dibuja en cada pedido, como todo el admin (`app/(admin)/layout.tsx`).
export const instant = false;

// Sin guarda de módulo: la cuenta propia es de toda sesión (guarda.test.ts la
// exceptúa con ese motivo). La sesión ya la verificó el layout protegido.
export default async function PaginaMiCuenta() {
  const sesion = await sesionActual();
  if (!sesion) redirect("/admin/entrar");
  return (
    <MiCuenta
      nombre={sesion.user.name}
      correo={sesion.user.email}
      rol={sesion.user.rol}
      segundoFactor={sesion.user.twoFactorEnabled === true}
      sesiones={await sesionesAbiertas(sesion.user.id)}
      idDeEstaSesion={sesion.session.id}
    />
  );
}

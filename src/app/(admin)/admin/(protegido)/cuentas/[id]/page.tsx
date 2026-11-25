import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { puede, queSePuede } from "@sofia/auth";
import { SinPermiso } from "@/admin/armazon/SinPermiso";
import { FichaDeLaCuenta } from "@/admin/cuentas/FichaDeLaCuenta";
import { cuentaParaActuar, unaCuenta } from "@/datos/consultas/cuentas";
import { sesionActual } from "@/datos/sesion";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // También el título: sin el permiso, la consulta no devuelve la cuenta.
  const cuenta = await cuentaParaActuar((await sesionActual())?.user.rol, (await params).id);
  return cuenta ? { title: cuenta.nombre } : {};
}

// Una cuenta (SPEC de work/cuentas §4.3). Lo que se le puede hacer lo dice
// `queSePuede`, la misma regla que cada acción vuelve a verificar.
// Lee la sesión: se dibuja en cada pedido, como todo el admin (`app/(admin)/layout.tsx`).
export const instant = false;

export default async function UnaCuenta({ params }: Props) {
  const sesion = await sesionActual();
  if (!sesion) redirect("/admin/entrar");
  // La guarda del layout solo oculta la interfaz: esta página se renderiza
  // igual y viaja en el payload. El permiso se corta acá, antes de leer nada.
  if (!puede(sesion.user.rol, "usarCuentas")) return <SinPermiso capacidad="usarCuentas" rol={sesion.user.rol} />;
  const cuenta = await unaCuenta(sesion.user.rol, (await params).id);
  if (!cuenta?.rol) notFound();
  const conRol = { ...cuenta, rol: cuenta.rol };
  const esLaPropia = cuenta.id === sesion.user.id;
  return (
    <FichaDeLaCuenta
      cuenta={conRol}
      se={queSePuede(sesion.user.rol, { rol: cuenta.rol, estado: cuenta.estado, esLaPropia })}
      esLaPropia={esLaPropia}
      correoPropio={sesion.user.email}
    />
  );
}

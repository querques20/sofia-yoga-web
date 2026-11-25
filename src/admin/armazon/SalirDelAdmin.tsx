"use client";

import { useRouter } from "next/navigation";
import { authCliente } from "@/admin/auth-cliente";
import { Salir } from "./iconos";

/** Cierra la sesión. El aspecto lo pone quien lo usa: hoy, una opción del menú de la cuenta. */
export function SalirDelAdmin({ className }: { className: string }) {
  const router = useRouter();
  return (
    // `data-sale`: con cambios sin guardar en la pantalla, `useFrenarSalida` pregunta antes de cerrar la sesión.
    <button
      type="button"
      data-sale=""
      onClick={async () => {
        await authCliente.signOut();
        router.push("/admin/entrar");
        router.refresh();
      }}
      className={className}
    >
      <Salir size={18} className="shrink-0" />
      Salir
    </button>
  );
}

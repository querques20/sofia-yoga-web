import type { Metadata } from "next";
import { connection } from "next/server";
import "./admin.css";
import { FUENTES } from "../fuentes";

// El layout raíz del admin. Es el SEGUNDO layout raíz de la app: el otro es
// el del sitio, `app/[lang]/layout.tsx`. Cada uno trae su hoja de estilos, y
// pasar de uno a otro es una carga entera de la página.

export const metadata: Metadata = {
  // Cada pantalla da solo su nombre y el template le suma el admin:
  // «Cuentas · Admin Sofia Yoga». Vale para las de acceso y para las protegidas.
  title: { template: "%s · Admin Sofia Yoga", default: "Admin Sofia Yoga" },
  // Cinturón y tiradores: el `X-Robots-Tag` del proxy es el que manda,
  // pero esto cubre el caso de que alguien sirva el HTML por otro camino.
  robots: { index: false, follow: false },
};

// El sitio prerenderiza todo (`cacheComponents`), y el admin es la excepción:
// esto le permite a Next que estas rutas no tengan una parte estática.
export const instant = false;

/**
 * **Todo el admin se renderiza en cada pedido**, también entrar, olvidé y
 * nueva contraseña, que no leen nada y Next prerenderizaría. La CSP del admin
 * lleva un nonce distinto en cada respuesta (proxy.ts), y una página
 * prerenderizada tiene sus scripts escritos de antes, sin ese nonce: la CSP
 * los bloquearía y la pantalla no hidrataría.
 */
export default async function LayoutDelAdmin({ children }: { children: React.ReactNode }) {
  await connection();
  return (
    <html lang="es" className={`${FUENTES} h-full`}>
      <body className="min-h-full bg-gris-fondo text-azul-principal antialiased">{children}</body>
    </html>
  );
}

import { Fleur } from "@/components/Fleur";
import { Marca } from "./Marca";

/**
 * Las tres pantallas de acceso (entrar, olvidé y nueva contraseña): el panel
 * de la marca a la izquierda y el formulario a la derecha. Es el único momento
 * de marca del admin: sobre el verde, la marca arriba, la flor del sitio
 * grande y recortada por el borde de abajo, y «Admin del sitio» con «sitio»
 * en manuscrita, como la palabra resaltada de cada título del sitio (acá en
 * arena: el violeta no se lee sobre el verde). Todo lo decorativo va con
 * `aria-hidden`.
 *
 * En el celular el panel es una franja arriba: la marca y «Admin del sitio»
 * al lado, sin la flor grande.
 */
export function Pantalla({
  titulo,
  bajada,
  children,
}: {
  titulo: string;
  bajada?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white lg:flex-row">
      {/* El verde y la arena van a mano: este panel es de marca y no cambia con el tema. Arena sobre verde, 7,11:1. */}
      <aside className="relative flex items-center justify-between gap-4 overflow-hidden bg-[#39463a] px-6 py-5 text-[#e6d8c7] lg:w-5/12 lg:flex-col lg:items-start lg:px-12 lg:py-12">
        <Fleur className="pointer-events-none absolute -right-28 -bottom-36 hidden size-[30rem] text-[#a9bca1] opacity-40 lg:block" trazo={1.4} />
        <Marca className="relative" />
        <p className="relative font-display text-admin-seccion leading-none font-bold tracking-wide uppercase lg:text-6xl">
          Admin <span className="lg:block">del</span>{" "}
          <span className="font-mano text-[1.2em] tracking-normal normal-case lg:block">sitio</span>
        </p>
      </aside>
      {/* En el celular el formulario sigue a la franja, arriba; desde `lg`, centrado al lado del panel. */}
      <main className="flex flex-1 items-start justify-center px-6 py-10 lg:items-center lg:px-16 lg:py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-admin-titulo font-bold text-azul-principal">{titulo}</h1>
          {bajada ? <p className="mt-2 text-admin-meta text-gris-texto">{bajada}</p> : null}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}

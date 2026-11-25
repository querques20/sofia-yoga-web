import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROL_POR_DEFECTO } from "@sofia/auth";
import { AvisosBreves } from "@sofia/kit-admin";
import { sesionActual } from "@/datos/sesion";
import { BarraLateral } from "@/admin/armazon/BarraLateral";
import { COOKIE_DEL_TEMA, temaDe } from "@/admin/armazon/tema";

/**
 * **Acá se verifica la sesión de verdad.**
 *
 * El proxy (`proxy.ts`) solo mira que la cookie esté —no va a la base a
 * propósito—, así que este layout es el que pregunta si la sesión existe,
 * está firmada y no venció. Envuelve a todo lo que cuelga de `/admin`
 * menos entrar, olvidé y nueva contraseña, así que ninguna pantalla del admin
 * puede olvidarse de chequear: no hay dónde olvidarse. Lo que cada rol puede
 * usar lo decide aparte la guarda de cada módulo (`admin/armazon/Guarda.tsx`).
 *
 * Y es el armazón: la sidebar a la izquierda (desde `lg`) y el contenido en
 * una tarjeta que toca arriba, abajo y a la derecha de la ventana. Solo las
 * dos esquinas que dan a la sidebar son redondas, y la tarjeta scrollea por
 * dentro para que esas curvas queden siempre a la vista. Por eso es
 * `relative`: lo absoluto de adentro (los `sr-only` de los campos) se ubica
 * contra ella y scrollea con ella; contra el `body`, estiraba la página y
 * aparecía un segundo scroll que movía todo el armazón. Las esquinas no son
 * un recorte de la tarjeta sino dos cuartos de círculo fijos encima de todo
 * (`esquina-de-la-tarjeta`, globals.css): recortada, su blanco asomaba en el
 * borde de un encabezado navy. En el celular la tarjeta ocupa todo el ancho,
 * debajo de la barra del menú, y scrollea la página. `data-tema` elige el
 * tema (globals.css); el color y el fondo se repiten acá porque los del
 * `body` se calcularon con la paleta clara, y en el mixto el fondo es el azul
 * de la sidebar, que es el de las esquinas (lo heredan). Los avisos breves
 * (`AvisosBreves`) se montan acá, una vez: así siguen entre pantallas, y
 * toman el tema.
 */
// Lee la sesión en cada pedido: no tiene una parte estática, a propósito
// (`app/(admin)/layout.tsx`).
export const instant = false;

export default async function LayoutProtegido({ children }: { children: React.ReactNode }) {
  const sesion = await sesionActual();
  if (!sesion) redirect("/admin/entrar");
  const tema = temaDe((await cookies()).get(COOKIE_DEL_TEMA)?.value);

  return (
    <div data-tema={tema} className="flex min-h-dvh flex-col bg-gris-fondo text-azul-principal mixto:bg-azul-principal lg:h-dvh lg:pl-72">
      <AvisosBreves>
        <BarraLateral usuario={{ nombre: sesion.user.name, rol: sesion.user.rol ?? ROL_POR_DEFECTO }} tema={tema} />
        <main className="flex-1 bg-white lg:relative lg:overflow-y-auto">
          {/* Sin tope: el ancho lo elige cada pantalla con su molde (PantallaDeLista, PantallaDeFicha, PantallaDeAjustes).
              `overflow-x-clip` recorta el fondo de los encabezados, que sigue de costado hasta estos bordes. Va acá y no en
              `main`: ahí, con el scroll vertical, el navegador lo vuelve `hidden`, y `main` scrolleaba de costado. */}
          <div className="w-full overflow-x-clip px-6 py-10">{children}</div>
        </main>
      </AvisosBreves>
      {/* Arriba del encabezado fijo (z-10) y sin tomar clics. */}
      <div aria-hidden className="pointer-events-none fixed top-0 left-72 z-20 hidden size-4 bg-inherit esquina-de-la-tarjeta lg:block" />
      <div aria-hidden className="pointer-events-none fixed bottom-0 left-72 z-20 hidden size-4 -scale-y-100 bg-inherit esquina-de-la-tarjeta lg:block" />
    </div>
  );
}

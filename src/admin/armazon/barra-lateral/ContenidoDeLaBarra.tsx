import Link from "next/link";
import type { Cuenta } from "@sofia/kit-admin";
import { Marca } from "../Marca";
import { MenuDeLaCuenta, type Usuario } from "./MenuDeLaCuenta";
import { MenuDelAdmin } from "./MenuDelAdmin";
import type { Tema } from "../tema";

export type { Usuario };

type Props = {
  usuario: Usuario;
  tema: Tema;
  /** Las claves de los módulos que su rol puede usar (`modulos.ts`). */
  visibles: readonly string[];
  /** Las claves de los módulos que llevan el punto de «cambios sin publicar». */
  conPunto: readonly string[];
  /** Por clave de módulo, cuántos esperan: el número de la entrada. */
  numeros: Readonly<Record<string, Cuenta>>;
};

/**
 * Lo que tiene la sidebar, igual en escritorio y en el panel del celular: la
 * marca, el menú y el pie con la cuenta. La marca es la flor y el nombre
 * (`Marca`), con «Admin del sitio» debajo, y lleva al Inicio. Un divisor la
 * separa del menú, igual que el que separa la cuenta.
 */
export function ContenidoDeLaBarra({ usuario, tema, visibles, conPunto, numeros }: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5">
        <Link
          href="/admin"
          className="block rounded-xl p-2 text-azul-principal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-medio"
        >
          <Marca />
          <span className="mt-1 block pl-[2.625rem] text-admin-meta text-azul-medio">Admin del sitio</span>
        </Link>
        <hr className="mx-3 mt-4 border-azul-claro/60" />
      </div>
      <MenuDelAdmin visibles={visibles} conPunto={conPunto} numeros={numeros} />
      <MenuDeLaCuenta usuario={usuario} tema={tema} />
    </div>
  );
}

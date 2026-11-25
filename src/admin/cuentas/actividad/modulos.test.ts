import { test } from "node:test";
import assert from "node:assert/strict";
import { moduloDe, pantallaDe } from "./modulos";

test("lo de Cuentas lleva a la cuenta si todavía existe; lo que la borra, a ningún lado", () => {
  const existen = new Set(["cuenta-1"]);
  assert.deepEqual(pantallaDe({ tipo: "cambio-el-rol", sobreId: "cuenta-1" }, existen), { href: "/admin/cuentas/cuenta-1", que: "Ver la cuenta" });
  assert.equal(pantallaDe({ tipo: "cambio-el-rol", sobreId: "cuenta-2" }, existen), null);
  assert.equal(pantallaDe({ tipo: "borro-una-cuenta", sobreId: "cuenta-1" }, existen), null);
  assert.equal(pantallaDe({ tipo: "entro", sobreId: null }, existen), null);
  assert.equal(moduloDe("invito"), "cuentas");
  assert.equal(moduloDe("entro"), "acceso");
  assert.equal(moduloDe("cambio-su-nombre"), "mi-cuenta");
});

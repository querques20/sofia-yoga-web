import { test } from "node:test";
import assert from "node:assert/strict";
import { TIPOS_DE_ACTIVIDAD, tiposDelInicio, tiposQueVe } from "@/datos/actividad";
import { fraseDe } from "./frase";

test("cada fila se lee como una frase, con quién y sobre qué", () => {
  assert.equal(fraseDe({ tipo: "invito", quien: "Ana Pérez", sobre: "Juan Pérez" }), "Ana Pérez invitó a Juan Pérez");
  assert.equal(fraseDe({ tipo: "cambio-el-rol", quien: "Ana", sobre: "Juan, de edita a administra" }), "Ana cambió el rol de Juan, de edita a administra");
  assert.equal(fraseDe({ tipo: "entro", quien: "Ana", sobre: null }), "Ana entró");
});

test("todo tipo de actividad tiene su frase", () => {
  for (const tipo of TIPOS_DE_ACTIVIDAD) assert.ok(fraseDe({ tipo, quien: "Ana", sobre: "Juan" }).startsWith("Ana "), tipo);
});

test("la actividad de las cuentas la ve quien usa Cuentas, y quien edita no", () => {
  assert.deepEqual(tiposQueVe("dirige"), [...TIPOS_DE_ACTIVIDAD]);
  assert.deepEqual(tiposQueVe("administra"), [...TIPOS_DE_ACTIVIDAD]);
  assert.deepEqual(tiposQueVe("edita"), []);
  assert.deepEqual(tiposQueVe("cualquiera"), []);
});

test("al Inicio va lo que se le hace a otra cuenta, y no entrar, salir ni lo de la cuenta propia", () => {
  const delInicio = tiposDelInicio("dirige");
  assert.ok(delInicio.includes("invito"));
  assert.ok(delInicio.includes("paso-la-direccion"));
  for (const tipo of ["entro", "salio", "cambio-su-contrasena", "cambio-su-nombre"] as const) assert.ok(!delInicio.includes(tipo), tipo);
});

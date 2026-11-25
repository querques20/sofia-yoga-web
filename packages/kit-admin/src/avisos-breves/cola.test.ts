import { test } from "node:test";
import assert from "node:assert/strict";
import { A_LA_VISTA, DURACION_MS, duracionDe, quitar, sumar, type BreveEnCola, type TonoBreve } from "./cola";

const breve = (id: number, tono: TonoBreve = "exito"): BreveEnCola => ({ id, tono, texto: `aviso ${id}` });
const ids = (cola: readonly BreveEnCola[]) => cola.map((b) => b.id);

test("el más nuevo va arriba", () => {
  assert.deepEqual(ids(sumar(sumar([], breve(1)), breve(2))), [2, 1]);
});

test("se ven tres a la vez: con un cuarto, se va el más viejo", () => {
  let cola: BreveEnCola[] = [];
  for (const id of [1, 2, 3, 4]) cola = sumar(cola, breve(id));
  assert.equal(cola.length, A_LA_VISTA);
  assert.deepEqual(ids(cola), [4, 3, 2]);
});

test("un error que nadie cerró no se va porque llegaron otros", () => {
  let cola = sumar([], breve(1, "error"));
  for (const id of [2, 3, 4]) cola = sumar(cola, breve(id));
  assert.deepEqual(ids(cola), [4, 3, 1]);
});

test("si los tres son errores, se va el más viejo", () => {
  let cola: BreveEnCola[] = [];
  for (const id of [1, 2, 3, 4]) cola = sumar(cola, breve(id, "error"));
  assert.deepEqual(ids(cola), [4, 3, 2]);
});

test("lo que salió bien dura cinco segundos; un error o uno con acción, hasta que se cierra", () => {
  assert.equal(DURACION_MS, 5000);
  assert.equal(duracionDe({ tono: "exito" }), DURACION_MS);
  assert.equal(duracionDe({ tono: "info" }), DURACION_MS);
  assert.equal(duracionDe({ tono: "error" }), null);
  assert.equal(duracionDe({ tono: "info", accion: { etiqueta: "Abrir la vista previa", alHacer: () => {} } }), null);
});

test("uno con acción tampoco se va porque llegaron otros", () => {
  let cola = sumar([], { ...breve(1, "info"), accion: { etiqueta: "Abrir", alHacer: () => {} } });
  for (const id of [2, 3, 4]) cola = sumar(cola, breve(id));
  assert.deepEqual(ids(cola), [4, 3, 1]);
});

test("cerrar uno saca solo ese", () => {
  const cola = sumar(sumar(sumar([], breve(1)), breve(2)), breve(3));
  assert.deepEqual(ids(quitar(cola, 2)), [3, 1]);
});

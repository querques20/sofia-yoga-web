import { test } from "node:test";
import assert from "node:assert/strict";
import { breveDe, partir } from "./breve";

test("una frase con dos partes da el texto y el detalle", () => {
  assert.deepEqual(partir("Publicado: el sitio ya lo muestra."), { texto: "Publicado", detalle: "El sitio ya lo muestra." });
  assert.deepEqual(partir("Borrador guardado. El sitio sigue mostrando lo publicado."), { texto: "Borrador guardado", detalle: "El sitio sigue mostrando lo publicado." });
});

test("una frase sola es el texto, sin el punto", () => {
  assert.deepEqual(partir("No hay cambios para guardar."), { texto: "No hay cambios para guardar" });
});

test("con «Listo», lo nombra lo que se hizo; sin él, la frase de la acción", () => {
  assert.deepEqual(breveDe({ ok: true, detalle: "Listo: el sitio ya muestra los datos nuevos." }, "Datos guardados"), { tono: "exito", texto: "Datos guardados", detalle: "El sitio ya muestra los datos nuevos." });
  assert.deepEqual(breveDe({ ok: true, detalle: "Listo." }, "Avisos guardados"), { tono: "exito", texto: "Avisos guardados", detalle: undefined });
  assert.deepEqual(breveDe({ ok: true, detalle: "No cambió ningún plazo." }, "Plazos guardados"), { tono: "exito", texto: "No cambió ningún plazo" });
});

test("si falló, el error va partido: qué falló y qué hacer", () => {
  assert.deepEqual(breveDe({ ok: false, detalle: "No hubo respuesta del servidor. Fijate la conexión y probá de nuevo." }, "Datos guardados"), { tono: "error", texto: "No hubo respuesta del servidor", detalle: "Fijate la conexión y probá de nuevo." });
  assert.deepEqual(breveDe({ ok: false, detalle: "Esa URL ya la usa otra entrada." }, "Datos guardados"), { tono: "error", texto: "Esa URL ya la usa otra entrada" });
});

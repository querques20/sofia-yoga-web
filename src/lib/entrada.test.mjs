// lo nuevo de la entrada: el aviso del hueco y el aviso de que terminó. Corre con `pnpm test` (node:test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { abrirTelon, avisarHueco, cerrarTelon, escucharHueco, hayEntradaPendiente, telonTerminado, terminarTelon } from "./entrada.ts";

const cuadro = () => new Promise((listo) => setTimeout(listo, 0));

test("mientras el telón no se abrió hay una entrada pendiente", () => {
  assert.equal(hayEntradaPendiente(), true);
  abrirTelon();
  assert.equal(hayEntradaPendiente(), false);
});

test("el hueco llega a quien escucha, y a quien llega tarde le llega el último valor", () => {
  const vistos = [];
  const dejar = escucharHueco((px) => vistos.push(px));
  avisarHueco(132);
  avisarHueco(300);
  assert.deepEqual(vistos, [132, 300]);

  const tarde = [];
  escucharHueco((px) => tarde.push(px));
  assert.deepEqual(tarde, [300]);

  dejar();
  avisarHueco(400);
  assert.deepEqual(vistos, [132, 300]);
});

test("al cerrar el telón el hueco vuelve a cero y el fin se espera de nuevo", async () => {
  cerrarTelon();
  const tarde = [];
  escucharHueco((px) => tarde.push(px));
  assert.deepEqual(tarde, []);

  let termino = false;
  telonTerminado().then(() => (termino = true));
  await cuadro();
  assert.equal(termino, false);

  terminarTelon();
  await cuadro();
  assert.equal(termino, true);
});

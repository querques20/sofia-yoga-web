// la geometría de la flor de fotos, a secas: corre con `pnpm test` (node:test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { ladoDeLaFoto, petaloEnFlor, radioOrganico, tamanoDeLaFlor } from "./geometria.ts";

const cerca = (a, b) => Math.abs(a - b) < 1e-9;

test("en reposo es un pétalo", () => assert.equal(radioOrganico(0, 0, 0), "50% 50% 50% 50% / 50% 50% 50% 50%"));

test("con forma 1 y soplo 0 es la forma A", () => assert.equal(radioOrganico(0, 1, 0), "58% 42% 46% 54% / 52% 44% 56% 48%"));

test("con soplo 1 es la forma B", () => assert.equal(radioOrganico(1, 1, 0), "50% 50% 56% 44% / 46% 54% 48% 52%"));

test("el desfase corre los radios", () => assert.equal(radioOrganico(0, 1, 1), "46% 54% 52% 44% / 56% 48% 58% 42%"));

test("el pétalo de arriba", () => assert.deepEqual(petaloEnFlor(0, 224, { x: 0, y: 0 }), { x: 0, y: -52, w: 48, h: 104, r: 0 }));

test("el pétalo de la derecha, a escala", () => {
  const p = petaloEnFlor(90, 448, { x: 100, y: 100 });
  assert.ok(cerca(p.x, 204) && cerca(p.y, 100));
  assert.deepEqual([p.w, p.h, p.r], [96, 208, 90]);
});

test("la foto cubre la diagonal mientras es pétalo", () => assert.ok(cerca(ladoDeLaFoto(48, 104, 0), Math.hypot(48, 104))));

test("y queda justa al final", () => assert.equal(ladoDeLaFoto(100, 200, 1), 216));

test("la flor no pasa de la ventana", () => {
  assert.equal(tamanoDeLaFlor(5000, { ancho: 1440, alto: 900 }), 684);
  assert.equal(tamanoDeLaFlor(200, { ancho: 1440, alto: 900 }), 200);
});

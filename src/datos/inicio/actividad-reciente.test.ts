import { after, test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { config as cargarEntorno } from "dotenv";

// Contra la base de verdad: lo que decide `VA_AL_INICIO` tiene que llegar a
// la consulta. En local la base de los tests es la compartida, así que las
// filas van con la fecha de ahora y se borran en el `finally`, pase lo que
// pase: nada de lo que crea este test queda a la vista en el Inicio de nadie.
cargarEntorno({ path: [".env.local"], quiet: true });
const sinBase = { skip: !process.env.DATABASE_URL && "sin DATABASE_URL" };

after(async () => {
  if (!process.env.DATABASE_URL) return;
  const { base } = await import("@/datos/cliente");
  await base.$disconnect();
});

test("en el Inicio aparece un «invitó» y no un «entró», y solo para quien usa Cuentas", sinBase, async () => {
  const { base } = await import("@/datos/cliente");
  const { actividadReciente } = await import("./actividad-reciente");
  const cuenta = randomUUID();
  await base.user.create({ data: { id: cuenta, name: "Prueba", email: `prueba-${cuenta}@sofia.test` } });
  try {
    const invito = await base.actividad.create({ data: { cuentaId: cuenta, tipo: "invito", sobre: "Juan" } });
    const entro = await base.actividad.create({ data: { cuentaId: cuenta, tipo: "entro" } });
    for (const rol of ["dirige", "administra"]) {
      // Una ventana amplia: si otros tests anotan a la vez, el «invitó» sigue adentro.
      const ids = (await actividadReciente(rol, 200)).map((e) => e.id);
      assert.ok(ids.includes(invito.id), `${rol} ve el «invitó»`);
      assert.ok(!ids.includes(entro.id), `${rol} no ve el «entró»`);
    }
    // Hoy toda la actividad es de Cuentas: quien solo edita no ve ninguna.
    assert.deepEqual(await actividadReciente("edita", 200), []);
  } finally {
    await base.actividad.deleteMany({ where: { cuentaId: cuenta } });
    await base.user.delete({ where: { id: cuenta } });
  }
});

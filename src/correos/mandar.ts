import { randomUUID } from "node:crypto";
import { CORREOS_POR_LOTE, crearClienteDeResend } from "@/lib/correo/resend";
import type { Contenido } from "./plantilla";

/**
 * Por dónde sale un correo, elegido por el entorno en un solo lugar:
 *
 * - con `RESEND_API_KEY`, por Resend, desde `CORREO_REMITENTE`;
 * - sin clave y fuera de producción, por la consola, entero: en local es lo
 *   que hace falta para seguir el enlace;
 * - sin clave en producción, un error que dice que no salió, **sin el enlace
 *   ni el destinatario**. Los logs de producción los lee más gente que el
 *   buzón, y un enlace de contraseña en un log es una cuenta regalada.
 *
 * Contesta por dónde salió, o que no salió. La mayoría de los correos lo
 * ignora (salen en segundo plano); el código del segundo factor lo necesita
 * para no decir «te lo mandamos» cuando no fue así. Un error de Resend tira.
 */
export type SalidaDelCorreo = "resend" | "consola" | "no-salio";

/**
 * Manda un correo por donde diga el entorno (arriba). `idempotencia` es para
 * el que no puede salir dos veces aunque se pida dos veces (el resumen
 * semanal: una por persona y por lunes); Resend guarda la clave 24 horas.
 */
export async function mandarCorreo(
  { para, contenido, idempotencia }: { para: string; contenido: Contenido; idempotencia?: string },
  { entorno = process.env, fetchImpl }: { entorno?: NodeJS.ProcessEnv; fetchImpl?: typeof fetch } = {},
): Promise<SalidaDelCorreo> {
  const clave = entorno.RESEND_API_KEY;
  if (clave) {
    const de = entorno.CORREO_REMITENTE;
    if (!de) throw new Error("Falta CORREO_REMITENTE: con RESEND_API_KEY hace falta desde qué dirección sale el correo.");
    // Una clave por correo: si el primer intento llegó pero la respuesta se
    // perdió, el reintento del cliente no lo manda dos veces.
    await crearClienteDeResend({ clave, url: entorno.RESEND_API_URL || undefined, fetchImpl }).mandar({ de, para, ...contenido, idempotencia: idempotencia ?? randomUUID() });
    return "resend";
  }
  if (entorno.NODE_ENV === "production") {
    console.error(`[correo] «${contenido.asunto}» no salió: falta RESEND_API_KEY.`);
    return "no-salio";
  }
  console.info(`[correo] Para ${para} — ${contenido.asunto}\n\n${contenido.texto}\n`);
  return "consola";
}

/** Lo que pasó con muchos correos: por dónde salieron, cuántos salieron y cuántos no. */
export type SalidaDelLote = { salida: SalidaDelCorreo; salieron: number; fallidos: number };

/** Uno de los correos de un lote: a quién y qué. */
export type CorreoDelLote = { para: string; contenido: Contenido };

/**
 * Manda muchos correos distintos (el resumen del newsletter: uno por persona,
 * con su link de baja), por el mismo camino que `mandarCorreo` pero de a
 * lotes de 100, que es lo que Resend acepta por pedido. Un lote que no sale
 * no frena a los demás: se cuenta y se sigue. Con la misma `idempotencia` y
 * el mismo orden, un segundo intento no manda dos veces. Entre lote y lote
 * hay una pausa, porque Resend acepta dos pedidos por segundo.
 */
export async function mandarCorreos(
  { correos, idempotencia }: { correos: readonly CorreoDelLote[]; idempotencia: string },
  { entorno = process.env, fetchImpl, pausaMs = 600 }: { entorno?: NodeJS.ProcessEnv; fetchImpl?: typeof fetch; pausaMs?: number } = {},
): Promise<SalidaDelLote> {
  const clave = entorno.RESEND_API_KEY;
  if (!clave) {
    if (entorno.NODE_ENV === "production") {
      console.error(`[correo] ${correos.length} correos «${correos[0]?.contenido.asunto ?? ""}» no salieron: falta RESEND_API_KEY.`);
      return { salida: "no-salio", salieron: 0, fallidos: correos.length };
    }
    for (const { para, contenido } of correos) console.info(`[correo] Para ${para} — ${contenido.asunto}\n\n${contenido.texto}\n`);
    return { salida: "consola", salieron: correos.length, fallidos: 0 };
  }
  const de = entorno.CORREO_REMITENTE;
  if (!de) throw new Error("Falta CORREO_REMITENTE: con RESEND_API_KEY hace falta desde qué dirección sale el correo.");
  const cliente = crearClienteDeResend({ clave, url: entorno.RESEND_API_URL || undefined, fetchImpl });
  let salieron = 0;
  for (let desde = 0; desde < correos.length; desde += CORREOS_POR_LOTE) {
    const lote = correos.slice(desde, desde + CORREOS_POR_LOTE);
    if (desde > 0) await new Promise((seguir) => setTimeout(seguir, pausaMs));
    try {
      await cliente.mandarVarios(
        lote.map(({ para, contenido }) => ({ de, para, ...contenido })),
        `${idempotencia}:${desde / CORREOS_POR_LOTE}`,
      );
      salieron += lote.length;
    } catch (e) {
      // Sin los destinatarios: el log de producción no es lugar para ellos.
      console.error(`[correo] un lote de ${lote.length} correos no salió:`, e instanceof Error ? e.message : e);
    }
  }
  return { salida: "resend", salieron, fallidos: correos.length - salieron };
}

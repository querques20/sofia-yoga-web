"use client";

import { gsap } from "@/lib/gsap";

// la respiración que marca el ritmo de la web: 4 s para inspirar y 6 s para expirar
export const INSPIRAR = 4;
export const EXPIRAR = 6;

export type Fase = "inspire" | "expire";
type Oyente = (valor: number, fase: Fase) => void;

const estado = { v: 0 };
const oyentes = new Set<Oyente>();
let fase: Fase = "inspire";
let anterior = 0;
let ciclo: gsap.core.Timeline | null = null;
let aMano: gsap.core.Tween | null = null;

function avisar() {
  if (estado.v > anterior + 0.0001) fase = "inspire";
  else if (estado.v < anterior - 0.0001) fase = "expire";
  anterior = estado.v;
  oyentes.forEach((oyente) => oyente(estado.v, fase));
}

function arrancarCiclo() {
  ciclo?.kill();
  ciclo = gsap
    .timeline({ repeat: -1, onUpdate: avisar })
    .to(estado, { v: 1, duration: INSPIRAR, ease: "sine.inOut" })
    .to(estado, { v: 0, duration: EXPIRAR, ease: "sine.inOut" });
}

/** se suscribe a la respiración: recibe un valor de 0 (pulmones vacíos) a 1 (llenos) */
export function escucharSouffle(oyente: Oyente) {
  oyentes.add(oyente);
  if (!ciclo && !aMano) arrancarCiclo();
  oyente(estado.v, fase);
  return () => {
    oyentes.delete(oyente);
    if (oyentes.size === 0) {
      ciclo?.kill();
      ciclo = null;
      aMano?.kill();
      aMano = null;
    }
  };
}

/** mientras se mantiene apretado: inspira a su ritmo, desde donde esté */
export function inspirarAMano() {
  ciclo?.kill();
  ciclo = null;
  aMano?.kill();
  aMano = gsap.to(estado, {
    v: 1,
    duration: Math.max(0.8, INSPIRAR * (1 - estado.v)),
    ease: "sine.out",
    onUpdate: avisar,
  });
}

/** al soltar: expira tranquilo y después vuelve el ciclo solo */
export function expirarAMano(alTerminar?: () => void) {
  aMano?.kill();
  aMano = gsap.to(estado, {
    v: 0,
    duration: Math.max(1, EXPIRAR * estado.v),
    ease: "sine.inOut",
    onUpdate: avisar,
    onComplete: () => {
      aMano = null;
      alTerminar?.();
      if (oyentes.size) arrancarCiclo();
    },
  });
}

"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

function escuchar(avisar: () => void) {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
}

/** true si la persona pidió menos movimiento en su sistema */
export function useReducedMotion() {
  return useSyncExternalStore(
    escuchar,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
}

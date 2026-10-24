"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** el botón sigue un poquito al mouse y vuelve a su lugar al salir. Sin rebote, y solo con mouse */
export function Magnetique({ children, fuerza = 0.28 }: { children: ReactNode; fuerza?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || quieto || !window.matchMedia("(pointer: fine)").matches) return;
      const irX = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const irY = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const mover = contextSafe!((e: PointerEvent) => {
        const caja = el.getBoundingClientRect();
        irX((e.clientX - (caja.left + caja.width / 2)) * fuerza);
        irY((e.clientY - (caja.top + caja.height / 2)) * fuerza);
      });
      const soltar = contextSafe!(() => {
        irX(0);
        irY(0);
      });
      el.addEventListener("pointermove", mover);
      el.addEventListener("pointerleave", soltar);
      return () => {
        el.removeEventListener("pointermove", mover);
        el.removeEventListener("pointerleave", soltar);
      };
    },
    { dependencies: [quieto, fuerza], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}

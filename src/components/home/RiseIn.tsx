"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * How a plain scene of the Home comes in, once, as the page brings it up: what it marks `[data-rise]` rises one
 * after the other, and each line (`[data-trait]`, Trait) draws from the left. With reduced motion nothing moves
 * and it is simply there. `className` is for a scene whose box has a layout of its own
 */
export function RiseIn({ children, className }: { children: ReactNode; className?: string }) {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const q = gsap.utils.selector(raiz);
      gsap
        .timeline({ scrollTrigger: { trigger: raiz.current, start: "top 72%", once: true } })
        .fromTo(q("[data-rise]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out", clearProps: "opacity,transform" }, 0)
        .fromTo(q("[data-trait]"), { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.8, stagger: 0.07, ease: "power2.inOut" }, 0.07);
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className={className}>
      {children}
    </div>
  );
}

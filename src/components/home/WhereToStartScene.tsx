"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lenisActual } from "@/lib/lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

// where the scene waits under the programme's panel: how far into its way out the panel is when the scene comes
// in (the last of the dome is leaving the top of the screen by then, clear of the title), and how far back it has
// to come for the scene to go. The scene stays put a while longer (`.ou-stage::after`, globals.css), so it has
// come in before the page moves it
const ENTER_AT = 0.84;
const LEAVE_AT = 0.5;
// where the scene does not wait: how far down the screen its top is when it comes in
const ENTER_FLOW = "top 72%";
// how far below its place a line of the scene waits (px)
const RISE = 28;
// going back under the panel is quicker than coming in
const LEAVE_SPEED = 3;

/**
 * How «Par où commencer ?» comes in: its title and rows (`[data-rise]`) rise one after the other, from the title
 * down, and each row's line (`[data-trait]`) draws from the left. It is an animation with its own time, not the
 * scroll's: the scroll only says when.
 *
 * Where the scene waits in place (a computer, `.ou-stage` in globals.css) it is what was under the programme's
 * panel, which leaves as a dome (programme/departure.ts): it comes in once the dome is nearly gone, and goes
 * again if the page is scrolled back and the panel returns over it. Where it does not wait (a phone) it comes
 * in once, as the page brings it up. With reduced motion nothing moves and it is simply there
 */
export function WhereToStartScene({ children }: { children: ReactNode }) {
  const raiz = useRef<HTMLDivElement>(null);
  const quieto = useReducedMotion();

  useGSAP(
    () => {
      if (quieto) return;
      const box = raiz.current;
      const stage = box?.querySelector<HTMLElement>("[data-stage]");
      if (!box || !stage) return;
      const q = gsap.utils.selector(box);
      let waits = false;
      let progress = 0;
      let shown = false;

      // it starts where it waits: out of sight
      const entrance = gsap
        .timeline({ paused: true })
        .fromTo(q("[data-rise]"), { opacity: 0, y: RISE }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" }, 0)
        .fromTo(q("[data-trait]"), { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.8, stagger: 0.07, ease: "power2.inOut" }, 0.07);

      // `atOnce`: no animation, as when the page is opened or measured again already past it
      const show = (atOnce: boolean) => {
        if (shown && !atOnce) return;
        shown = true;
        if (atOnce) entrance.progress(1).pause();
        else entrance.timeScale(1).play();
      };
      const hide = (atOnce: boolean) => {
        if (!shown && !atOnce) return;
        shown = false;
        if (atOnce) entrance.pause(0);
        else entrance.timeScale(LEAVE_SPEED).reverse();
      };

      // the scene under the panel: the way out of the panel, from its first move to its last
      const under = ScrollTrigger.create({
        trigger: box,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        onRefresh: (self) => {
          waits = getComputedStyle(stage).position === "sticky";
          progress = self.progress;
          if (!waits) return;
          if (progress >= ENTER_AT) show(true);
          else hide(true);
        },
        onUpdate: (self) => {
          progress = self.progress;
          if (!waits) return;
          if (progress >= ENTER_AT) show(false);
          // before the panel moves the scene is whole under it, and would show below the panel's foot
          else if (progress <= 0) hide(true);
          else if (progress < LEAVE_AT) hide(false);
        },
      });
      // the scene in the page's column: once, as it comes up
      const inFlow = ScrollTrigger.create({
        trigger: stage,
        start: ENTER_FLOW,
        onRefresh: (self) => {
          if (!waits && self.progress > 0) show(true);
        },
        onEnter: () => {
          if (!waits) show(false);
        },
      });

      // a link reached with the keyboard while the panel still covers it: the page goes to where the scene shows
      const uncover = () => {
        if (!waits || progress >= 1 || !document.activeElement?.matches(":focus-visible")) return;
        const lenis = lenisActual();
        if (lenis) lenis.scrollTo(under.end, { immediate: true, force: true });
        else window.scrollTo({ top: under.end, behavior: "instant" });
      };
      stage.addEventListener("focusin", uncover);

      return () => {
        stage.removeEventListener("focusin", uncover);
        under.kill();
        inFlow.kill();
      };
    },
    { scope: raiz, dependencies: [quieto], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className="ou-stage">
      {children}
    </div>
  );
}

import { heroEntrance, onHeroEntrance } from "@/lib/hero-entrance";

// below this the page is at the very top. A couple of px and not zero: Lenis reaches the top little by little
const TOP_PX = 2;
// if the hero never says it is done (a scene that did not build, an error), the nav shows anyway after this:
// a page with no menu is not an option. Longer than the longest entrance, curtain included
const CAP_MS = 8000;

/**
 * On the Home the nav shows when the hero's entrance ends, as Empoderamiento Docente's does: at the very top
 * the hero is the cover, and the pill opening over it competed with the photos opening. The CSS hides the nav
 * from the first paint (`[data-nav][data-home]` in globals.css); this marks it `data-hero-done` when the hero
 * says so (lib/hero-entrance.ts), and earlier if the person scrolls or tabs into it, or the page loaded already
 * scrolled. Once shown it stays. Calls `onShown` at that moment and returns the cleanup, which leaves the nav
 * waiting again for the next visit to the Home
 */
export function showNavAfterHero(nav: HTMLElement, onShown: () => void): () => void {
  let shown = false;
  let cap = 0;

  const onScroll = () => {
    if (window.scrollY > TOP_PX) show();
  };
  const stopListening = onHeroEntrance((state) => {
    if (state === "done") show();
  });
  const stop = () => {
    window.clearTimeout(cap);
    window.removeEventListener("scroll", onScroll);
    nav.removeEventListener("focusin", show);
    stopListening();
  };
  function show() {
    if (shown) return;
    shown = true;
    stop();
    nav.setAttribute("data-hero-done", "");
    onShown();
  }

  if (heroEntrance() === "done" || window.scrollY > TOP_PX) show();
  else {
    window.addEventListener("scroll", onScroll, { passive: true });
    nav.addEventListener("focusin", show);
    cap = window.setTimeout(show, CAP_MS);
  }

  return () => {
    stop();
    nav.removeAttribute("data-hero-done");
  };
}

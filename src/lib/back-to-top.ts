import type { MouseEvent } from "react";
import { lenisActual } from "./lenis";
import { isPlainClick, urlWithoutHash } from "./link-click";

/**
 * onClick for a nav link. A link to the page you are already on does nothing visible; here it becomes the
 * way back to the top, in one cut (not a slide: from the foot of a long page the whole page would scroll by).
 * From another page it does not step in and Next navigates as usual. Same behaviour as Empoderamiento Docente's
 * navbar
 */
export function backToTopIfCurrent(isCurrent: boolean) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isCurrent || !isPlainClick(e)) return;
    e.preventDefault();
    window.history.replaceState(window.history.state, "", urlWithoutHash(window.location));
    const lenis = lenisActual();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "auto" });
  };
}

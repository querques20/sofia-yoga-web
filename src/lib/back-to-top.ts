import type { MouseEvent } from "react";
import { ANCLA_ARRIBA, lenisActual } from "./lenis";
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

/**
 * onClick for a nav link to a section (`/page#section`). On that page already, it cuts to the section and
 * leaves its hash in the URL; a section that is not there counts as the top. From another page it does not
 * step in: Next navigates and LenisProvider lands on the hash
 */
export function cutToSectionIfHere(isHere: boolean, section: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isHere || !isPlainClick(e)) return;
    const target = document.getElementById(section);
    if (!target) return backToTopIfCurrent(true)(e);
    e.preventDefault();
    window.history.replaceState(window.history.state, "", `${urlWithoutHash(window.location)}#${section}`);
    const lenis = lenisActual();
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true, offset: ANCLA_ARRIBA });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + ANCLA_ARRIBA, behavior: "auto" });
  };
}

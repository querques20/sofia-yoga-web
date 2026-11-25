// this close to the top of the page the nav is always there
const TOP_PX = 96;
// how far the page has to move one way before the nav follows (px): a trackpad's drift does not flip it
const MOVE_PX = 10;

/**
 * The nav gets out of the way while the page goes down and comes back as soon as it goes up, as Empoderamiento
 * Docente's did. It marks the nav `data-away` and the CSS moves it (`[data-nav][data-away]`, globals.css).
 *
 * It never leaves while it is in use: a link of it has the keyboard's focus, the pointer is on it, or one of its
 * menus is open. Reaching it with the keyboard brings it back. Returns the cleanup, which leaves it in view
 */
export function hideNavOnScroll(nav: HTMLElement): () => void {
  let last = window.scrollY;
  let away = false;

  const set = (next: boolean) => {
    if (away === next) return;
    away = next;
    nav.toggleAttribute("data-away", next);
  };
  const inUse = () => nav.matches(":hover, :focus-within") || nav.querySelector('[aria-expanded="true"]') !== null;
  const show = () => set(false);
  const onScroll = () => {
    const y = window.scrollY;
    if (y <= TOP_PX) {
      last = y;
      return show();
    }
    const moved = y - last;
    if (Math.abs(moved) < MOVE_PX) return;
    last = y;
    if (moved < 0) show();
    else if (!inUse()) set(true);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  nav.addEventListener("focusin", show);
  return () => {
    window.removeEventListener("scroll", onScroll);
    nav.removeEventListener("focusin", show);
    show();
  };
}

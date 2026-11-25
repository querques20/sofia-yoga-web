type Change = (onScreen: boolean) => void;
type Watched = { onScreen: boolean | null; changes: Set<Change> };

// one observer for the whole page, and no margin around the screen: whoever listens is told within a frame of
// the element's first pixel showing, and takes up from where the animation is by then
const watched = new Map<Element, Watched>();
let observer: IntersectionObserver | null = null;

/**
 * Tells `change` when `element` comes onto the screen and when it leaves it, starting with where it is now.
 * It is how whatever moves on its own (the breath, a strip that goes round, photos that float) rests while
 * nobody can see it: the page has many of them, and all of them writing on every frame is what made scrolling
 * stutter on a slow computer. `element` must have a box of its own: an HTML element or an `<svg>`, not a shape
 * inside one. Returns how to stop watching
 */
export function watchOnScreen(element: Element, change: Change) {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const entryOf = watched.get(entry.target);
      if (!entryOf || entryOf.onScreen === entry.isIntersecting) continue;
      entryOf.onScreen = entry.isIntersecting;
      entryOf.changes.forEach((tell) => tell(entry.isIntersecting));
    }
  });
  let entryOf = watched.get(element);
  if (!entryOf) {
    entryOf = { onScreen: null, changes: new Set() };
    watched.set(element, entryOf);
    observer.observe(element);
  } else if (entryOf.onScreen !== null) {
    // already known: the observer will not say it again
    change(entryOf.onScreen);
  }
  entryOf.changes.add(change);
  return () => {
    const current = watched.get(element);
    if (!current) return;
    current.changes.delete(change);
    if (current.changes.size > 0) return;
    watched.delete(element);
    observer?.unobserve(element);
  };
}

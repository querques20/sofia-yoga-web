// Where the Home hero's entrance stands, for the navbar: on the Home the nav waits for the photos to settle
// before it shows (as Empoderamiento Docente's does). The hero speaks, the nav listens; neither looks at the
// route, and neither depends on which of the two mounts first

export type HeroEntrance = "none" | "running" | "done";

let state: HeroEntrance = "none";
const listeners = new Set<(state: HeroEntrance) => void>();

function say(next: HeroEntrance) {
  if (state === next) return;
  state = next;
  listeners.forEach((listener) => listener(next));
}

/** the hero is on the page and its entrance is about to play */
export function heroEntranceStarts() {
  say("running");
}

/** every photo is in its place */
export function heroEntranceEnds() {
  say("done");
}

/** the hero left the page (another page, another language): the next one starts from nothing */
export function heroLeft() {
  say("none");
}

export function heroEntrance() {
  return state;
}

/** hears every change from now on. Returns how to stop */
export function onHeroEntrance(listener: (state: HeroEntrance) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

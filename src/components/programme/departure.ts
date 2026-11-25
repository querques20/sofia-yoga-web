import { gsap, ScrollTrigger } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";
import { between, inOut, mix } from "./arrival";

// The way out is the way in, the other way round, so these are the arrival's own measures (arrival.ts) read from
// the far end: the dome ends as narrow as it began, and its foot has rounded by the point where its top began to
// square
const LAST_WIDTH = 0.22;
const ROUNDED_BY = 0.45;
// the stretch of the way out over which the panel's contents go: early, before the foot has rounded enough for
// its edge to cut through them
const CONTENTS_FROM = 0.02;
const CONTENTS_TO = 0.2;

/**
 * How far up the panel has gone at each point of its way out, as a share of the whole way. The arrival runs ahead
 * of the scroll and slows into its place (a quarter of a sine); the way out is that, mirrored: it lets go slowly
 * and gathers speed, so it rises as a thing of its own and is not just carried off by the page
 */
const risen = (progress: number) => 1 - Math.cos((progress * Math.PI) / 2);

/**
 * How the programme's panel gives the screen back: its arrival, the other way round (arrival.ts). It came in from
 * the foot of the screen as a dome that swelled into the panel; it leaves by the top as the panel shrinking back
 * into the dome. Its contents go first, its foot rounds, and the dome narrows as it rises, so what waits under
 * the panel shows around it before the panel is gone. The way out is the scroll's: from the moment the foot of
 * `box` is at the foot of the screen until it is at its top.
 *
 * - `box`: what holds the panel and is carried by the scroll untouched: the way out is read from it.
 * - `riders`: the panel's contents, which fade first.
 * - `takesOff`: the panel does not leave at the scroll's pace: it lets go slowly and gathers speed (`risen`).
 *   It needs a transform on the panel, so, as the arrival's `lands`, it is only for a panel with nothing pinned
 *   inside.
 *
 * It shares the panel's `clip-path` and transform and the riders' opacity with the arrival, so it only writes
 * them while the panel is on its way out, and gives them back when it is not
 */
export function leaveAsDome(panel: HTMLElement, { box, riders, takesOff }: { box: HTMLElement; riders: HTMLElement[]; takesOff: boolean }) {
  let width = 0;
  let screen = 0;
  let corner = 0;
  let progress = 0;
  let breath = 0;
  let leaving = false;
  const lift = gsap.quickSetter(panel, "y", "px");

  const measure = () => {
    width = panel.offsetWidth;
    screen = window.innerHeight;
    corner = parseFloat(getComputedStyle(panel).borderBottomLeftRadius) || 0;
  };

  const giveBack = () => {
    if (!leaving) return;
    leaving = false;
    panel.style.clipPath = "";
    if (takesOff) panel.style.transform = "";
    for (const rider of riders) rider.style.opacity = "";
  };

  const paint = () => {
    if (progress <= 0 || progress >= 1) return giveBack();
    leaving = true;
    // the page has carried it `progress` of the way: what is missing, or over, is the panel's own
    if (takesOff) lift(screen * (progress - risen(progress)));
    const left = 1 - inOut(between(CONTENTS_FROM, CONTENTS_TO, progress));
    for (const rider of riders) rider.style.opacity = left.toFixed(3);
    const rounded = inOut(between(0, ROUNDED_BY, progress));
    const dome = width * mix(1, LAST_WIDTH, inOut(progress));
    // while it is a dome it leans a little to one side and back, with the breath
    const lean = (breath - 0.5) * rounded;
    const side = (width - dome) / 2;
    const insetLeft = side + lean * width * 0.012;
    const insetRight = side - lean * width * 0.012;
    const acrossLeft = mix(corner, dome * (0.44 - lean * 0.08), rounded);
    const acrossRight = mix(corner, dome * (0.56 + lean * 0.08), rounded);
    const upLeft = mix(corner, screen * 0.5, rounded);
    const upRight = mix(corner, screen * 0.62, rounded);
    const px = (n: number) => `${n.toFixed(1)}px`;
    panel.style.clipPath = `inset(0px ${px(insetRight)} 0px ${px(insetLeft)} round ${px(corner)} ${px(corner)} ${px(acrossRight)} ${px(acrossLeft)} / ${px(corner)} ${px(corner)} ${px(upRight)} ${px(upLeft)})`;
  };

  const follow = (self: ScrollTrigger) => {
    progress = self.progress;
    paint();
  };
  const trigger = ScrollTrigger.create({
    trigger: box,
    start: "bottom bottom",
    end: "bottom top",
    onRefresh: (self) => {
      measure();
      follow(self);
    },
    onUpdate: follow,
  });
  const stopBreathing = escucharSouffle((value) => {
    breath = value;
    if (leaving) paint();
  });

  return () => {
    stopBreathing();
    trigger.kill();
    giveBack();
  };
}

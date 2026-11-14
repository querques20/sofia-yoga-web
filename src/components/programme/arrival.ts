import { gsap, ScrollTrigger } from "@/lib/gsap";
import { escucharSouffle } from "@/lib/souffle";

// how wide the dome is when its top first shows, as a share of the panel
const FIRST_WIDTH = 0.22;
// from this point of the way up, the dome's top tightens into the panel's own corners
const SQUARING_FROM = 0.55;
// how far below their place the panel's contents wait, in px: they settle as they show
const RIDE = 72;
// the stretch of the way up over which the panel's contents show: before it the dome is a plain shape, so its
// edge cuts through nothing, and they come in as it squares into the panel
const CONTENTS_FROM = 0.56;
const CONTENTS_TO = 0.94;
// the cover's text clears out ahead of the dome: it is gone this far above the dome's top, and whole this much
// further up (px)
const COPY_GAP = 28;
const COPY_BAND = 150;
// how far the cover's text rises as it goes, as a share of the dome's way up
const COPY_LIFT = 0.1;

const mix = (from: number, to: number, t: number) => from + (to - from) * t;
const inOut = (t: number) => t * t * (3 - 2 * t);
const between = (from: number, to: number, t: number) => Math.min(1, Math.max(0, (t - from) / (to - from)));

/**
 * How the programme's panel takes the screen from the cover: it rises as a dome, narrow and round at first,
 * that swells to the panel's full width and squares its top into the panel's corners as it reaches the top of
 * the screen. The dome is the panel itself seen through a `clip-path`, so what is inside is already in its
 * place, and it breathes with the rest of the site while it grows. The way up is the scroll's (no easing in
 * time): the panel's top goes from the foot of the screen to where it rests (`restTop`, px from the top of the
 * screen). There the clip goes away and the pinned scene takes over.
 *
 * - `box`: what holds the panel and is carried by the scroll untouched: the way up is read from it.
 * - `riders`: the panel's contents, which show and settle into their place as the dome squares.
 * - `cover`: what the panel rises over. Where it waits in place (`position: sticky`) it fades as the dome takes
 *   the screen: the panel at rest leaves the page showing around it, and the cover must not be what shows.
 * - `copy`: the cover's text. The dome would cut through it, so it dissolves from its foot up just ahead of the
 *   dome's top, rising a little. Only where the cover waits in place.
 * - `lands`: the panel comes to rest where it arrives (it is pinned there). Carried by the scroll alone it would
 *   stop dead, so it runs ahead of the scroll and slows into its place. It needs a transform on the panel, so
 *   it is only for a panel with nothing pinned inside
 */
export function arriveAsDome(
  panel: HTMLElement,
  {
    box,
    riders,
    restTop,
    cover,
    copy,
    lands,
  }: {
    box: HTMLElement;
    riders: HTMLElement[];
    restTop: () => number;
    cover: HTMLElement | null;
    copy: HTMLElement | null;
    lands: boolean;
  },
) {
  let width = 0;
  let screen = 0;
  let travel = 0;
  let corner = 0;
  let progress = 0;
  let breath = 0;
  let coverWaits = false;
  let copyTop = 0;
  let copyHeight = 0;
  const ride = riders.map((rider) => gsap.quickSetter(rider, "y", "px"));
  const lead = gsap.quickSetter(panel, "y", "px");

  const measure = () => {
    width = panel.offsetWidth;
    screen = window.innerHeight;
    travel = screen - restTop();
    corner = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 0;
    coverWaits = cover !== null && getComputedStyle(cover).position === "sticky";
    if (cover && copy) {
      // where the text sits in the cover, without the rise this gives it
      copy.style.translate = "";
      const place = copy.getBoundingClientRect();
      copyTop = place.top - cover.getBoundingClientRect().top;
      copyHeight = place.height;
    }
  };

  const setMask = (target: HTMLElement, mask: string) => {
    target.style.setProperty("-webkit-mask-image", mask);
    target.style.setProperty("mask-image", mask);
  };

  const clearCopy = () => {
    if (!copy) return;
    setMask(copy, "");
    copy.style.translate = "";
    copy.style.visibility = "";
  };

  // the text goes just before the dome's top gets to it, from its foot up
  const clearTheWay = (domeTop: number) => {
    if (!copy) return;
    if (!coverWaits || progress <= 0) return clearCopy();
    const lift = -travel * COPY_LIFT * progress;
    const gone = domeTop - COPY_GAP - (copyTop + lift);
    copy.style.translate = `0 ${lift.toFixed(1)}px`;
    copy.style.visibility = gone <= 0 ? "hidden" : "";
    setMask(copy, gone - COPY_BAND >= copyHeight ? "" : `linear-gradient(to bottom, #000 ${(gone - COPY_BAND).toFixed(1)}px, transparent ${gone.toFixed(1)}px)`);
  };

  const showContents = (shown: number) => {
    for (const rider of riders) rider.style.opacity = shown >= 1 ? "" : shown.toFixed(3);
  };

  const fadeCover = () => {
    if (!cover) return;
    const gone = coverWaits ? inOut(between(0.3, 0.9, progress)) : 0;
    cover.style.opacity = gone > 0 ? (1 - gone).toFixed(3) : "";
    // gone, it must not take a click meant for nothing
    cover.style.visibility = gone >= 1 ? "hidden" : "";
  };

  const paint = () => {
    fadeCover();
    if (progress >= 1) {
      panel.style.clipPath = "";
      ride.forEach((set) => set(0));
      showContents(1);
      clearTheWay(restTop());
      if (lands) panel.style.transform = "";
      return;
    }
    // ahead of the scroll at first, and slower and slower until it stops: a quarter of a sine
    const ahead = lands ? -travel * (Math.sin((progress * Math.PI) / 2) - progress) : 0;
    if (lands) lead(ahead);
    clearTheWay(screen - travel * progress + ahead);
    const shown = inOut(between(CONTENTS_FROM, CONTENTS_TO, progress));
    showContents(shown);
    ride.forEach((set) => set((1 - shown) * RIDE));
    const grown = inOut(progress);
    const squared = inOut(Math.max(0, (progress - SQUARING_FROM) / (1 - SQUARING_FROM)));
    const dome = width * mix(FIRST_WIDTH, 1, grown);
    // while it is a dome it leans a little to one side and back, with the breath
    const lean = (breath - 0.5) * (1 - squared);
    const side = (width - dome) / 2;
    const left = side + lean * width * 0.012;
    const right = side - lean * width * 0.012;
    const acrossLeft = mix(dome * (0.56 + lean * 0.08), corner, squared);
    const acrossRight = mix(dome * (0.44 - lean * 0.08), corner, squared);
    const downLeft = mix(screen * 0.62, corner, squared);
    const downRight = mix(screen * 0.5, corner, squared);
    const px = (n: number) => `${n.toFixed(1)}px`;
    panel.style.clipPath = `inset(0px ${px(right)} 0px ${px(left)} round ${px(acrossLeft)} ${px(acrossRight)} ${px(corner)} ${px(corner)} / ${px(downLeft)} ${px(downRight)} ${px(corner)} ${px(corner)})`;
  };

  const follow = (self: ScrollTrigger) => {
    progress = self.progress;
    paint();
  };
  const trigger = ScrollTrigger.create({
    trigger: box,
    start: "top bottom",
    end: () => `top ${restTop()}px`,
    onRefresh: (self) => {
      measure();
      follow(self);
    },
    onUpdate: follow,
  });
  const stopBreathing = escucharSouffle((value) => {
    breath = value;
    if (progress > 0 && progress < 1) paint();
  });

  return () => {
    stopBreathing();
    trigger.kill();
    panel.style.clipPath = "";
    ride.forEach((set) => set(0));
    showContents(1);
    clearCopy();
    if (lands) panel.style.transform = "";
    if (cover) {
      cover.style.opacity = "";
      cover.style.visibility = "";
    }
  };
}

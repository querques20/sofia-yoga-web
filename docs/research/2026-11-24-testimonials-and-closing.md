# Testimonials and the closing «Écris-moi»: one scene or two, and whether a carousel

Date: 2026-11-24. Decision it serves: the layout of the Home's last scene. Builds on
`2026-11-16-home-sitemap-comparables.md` (8 of 13 comparable sites show testimonials on the Home) and
`2026-11-20-home-cta-user-journey.md` (the closing button is the Home's last ask).

## Recommendation

One scene: the sage closing band, a screen tall, arriving as a dome like the two bands before it, with the
testimonials on top and «Écris-moi» at its foot. The testimonials are a carousel the person moves (arrows,
dragging, trackpad) and that never advances by itself. Firmness: medium. The carousel rule rests on a primary
usability study and an accessibility criterion; the placement rests on vendor case studies and two real sites.

## Options

- **A (applied).** Joint band, the quotes as a row of cards running off the band's edge, person-moved, the ask
  below in the same band. A first version with one bare quote at a time in large type was rejected by the owner
  the same day («tiene que tener cards las cosas»).
- B. Same band, quotes advancing by themselves every few seconds with a pause button.
- C. Two scenes as before: a testimonial section on the page, then the band with the ask.

## Findings

- A panel that advances by itself is read less, not more: in a usability session a person missed an offer shown
  in the page's biggest box because it rotated every 5 seconds («I didn't have time to read it»); the article
  lists slower readers, people reading in a second language and people with motor difficulties as the ones it
  fails. «Accordions and carousels should show a new panel only when users ask for it»
  [read · https://www.nngroup.com/articles/auto-forwarding/ · 2026-11-24 · author (Jakob Nielsen, 2013)]
- Content that updates on a timer next to other content needs a way to pause, stop or hide it; it is a barrier
  «to anyone who has trouble reading stationary text quickly» [read ·
  https://github.com/w3c/wcag/blob/main/understanding/20/pause-stop-hide.html · 2026-11-24 · author (W3C, WCAG
  2.2.2, level A)]. Sofia's site is read in three languages, often in a second one.
- Baymard: about half of the Home carousels it benchmarked have problems; many people leave before the second
  slide; static sections do as well. It allows rotation on a computer only, stopped for good at the first
  interaction, and never on a phone [snippet · https://baymard.com/blog/homepage-carousel · 2026-11-24 · vendor].
- Placement: testimonials moved to where they are seen before the ask raised sales in single-site tests (35.6%,
  Underwater Audio; 34%, WikiJob, moved to the top) [snippet · https://vwo.com/blog/testimonials-improve-conversion-rate
  · 2026-11-24 · vendor]. No sample sizes published: directional only.
- Second round, the question the first raised: do real solo teachers put testimonials right before the ask, and
  do they rotate them? Seven Home pages from the comparables list were fetched and their headings and scripts
  read [tested · `curl -sL <url> | python3 where.py` · 2026-11-24 · author]:
  - bluetigeryoga.com: headings run Services · À propos · Témoignages · Contact, so the testimonials sit right
    before the contact block; it loads a carousel library with autoplay.
  - yogacongracia.com: «palabras de yoguis con gracia» sits right before the sign-up block.
  - toniosborneyoga.com and sarahburgessyoga.com keep testimonials on their own page; the other three show none
    in the served HTML (they may load later with JavaScript, not checked).
  - 4 of 7 load a carousel library (swiper) and 5 of 7 an autoplay setting; which block uses it was not checked.

## Suspicion

«A carousel is what makes it impressive»: partly dropped. What the sources agree on is that the movement must
be the person's. The scene keeps its entrance (the dome, then the quotes coming in from the right) and the quote
changes on request.

## Still missing

- No test on Sofia's own visitors: the site has no traffic yet.
- The W3C carousel tutorial could not be fetched (the site answered with a browser check); the criterion's own
  text was read from its source repository instead.
- Whether the comparables' carousels are on their testimonials was not opened in a browser.
- The five quotes are samples written by us, marked «Exemple». Real ones are needed before publishing.

## Applied

`src/components/home/Closing.tsx` holds both parts; `src/components/home/Testimonials.tsx` is the carousel
(a list that scrolls sideways with scroll-snap, two buttons, a counter). Recorded in `DESIGN.md` § Home.

## Third round (same day): visual references

The owner rejected both builds (one bare quote at a time; a row of cream cards with arrows) and asked for
references to choose from. Twenty home pages were opened in a real Chrome at 1436×880, scrolled to the end, and
their testimonial section captured [tested · `node ref.mjs <url> <out>` · 2026-11-24 · author]. Yoga and pilates
sites first, then design-led sites outside the sector. 10 of 20 show no testimonial section on the Home
(coreatelierpilates.com, melissawoodhealth.com, theclass.com, skyting.com, alomoves.com, headspace.com, calm.com,
yogawithkassandra.com, ekhartyoga.com, obefitness.com).

| Reference | What it does | Moves by itself |
|---|---|---|
| lottiemurphy.com (pilates teacher, online studio) | Dark full-width band, centred title, two rows of cards in three colours running off both edges, the second row offset; the name is written sideways on a tab of each card | Yes: 20 px/s, measured; 0 with the pointer over it |
| thebloommethod.com (pre and postnatal) | «Real Moms, Real Results»: a wall of outlined cards in three columns of uneven heights, stars, name, «Verified Member» | No |
| glo.com (yoga platform) | «What members say»: three white cards on a soft tinted band, quote mark, a bold title per card, stars | No: 0 px/s measured |
| prenatalyogacenter.com (New York) | One white card beside the intro paragraph, one short quote and a first name | No in 2 s (it loads a carousel library; a longer interval was not measured) |
| bluetigeryoga.com (Lyon, pre/postnatal) | Three ruled columns, a large quote mark, the name as the title, long text | Not measured |

Pattern demos opened but not captured usefully: Framer's «Sticky Testimonial» (cards that pin and stack over
each other as the page scrolls).

How motion squares with the first round: the study and the criterion are about a panel that is taken away on a
timer. A slow row that stops under the pointer, under keyboard focus and on a touch, and never runs with reduced
motion, leaves every quote readable; it still needs a visible pause control to meet WCAG 2.2.2.
[inferred · from the two sources read in round one · 2026-11-24 · author]

Captures: `/tmp/claude-1000/refs/` on the workstation (not kept in the repository).

## Chosen (same day)

The owner picked lottiemurphy.com («esa página es top») and asked for its «Preview a class» block too. Applied:
`Testimonials.tsx` is two rows of cards in three colours going round (CSS, `voix-rang` in `globals.css`), 20 px/s
on a computer, stopped under the pointer and by a pause button, still with reduced motion; the closing band is
dark with the ask as a sage card; `PreviewClass.tsx` is the wide frame with the title under it, holding a
provisional photo and the «à confirmer» pill until Sofia gives a video. Measured in a real Chrome at 1436×880
and 390×800: rows move, stop under the pointer, stop and restart with the button.

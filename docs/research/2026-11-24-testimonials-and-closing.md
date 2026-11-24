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

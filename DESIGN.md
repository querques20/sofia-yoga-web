# Design decisions

The decisions a change made about how the site looks and where a piece goes, one line each, with what holds it.
`[provisional]` marks a choice a session made that the owner has not confirmed on the rendered page.

## Decisions

### Home

- 2026-11-24 — [provisional] Order: hero, the body by trimester, where to start, invitation, a look at a class, closing band (testimonials, class photos, «Écris-moi»), word strip. The practical info section was removed at the owner's word. (held by owner)
- 2026-11-16 — [provisional] «Par où commencer ?» is text rows and no pictures: the photos are the hero's. Its links are the outlined pill, 3rem tall. (held by owner)
- 2026-11-17 — [provisional] A coloured band arrives as a shape that swells into it with the scroll (`programme/arrival.ts`): programme, invitation, closing. (held by owner)
- 2026-11-24 — «Par où commencer ?» comes in by an animation with its own time (title, then rows, each row's line drawing from the left), started by the scroll and not driven by it (`WhereToStartScene`). (held by owner)
- 2026-11-24 — «Par où commencer ?» keeps its large rows (sentence on the left, detail and links on the right) and is a little taller than a screen; its links carry an arrow. (held by owner)
- 2026-11-24 — The programme's card leaves by the top the way it came in from the foot: its arrival mirrored, shrinking back into the dome (`programme/departure.ts`). (held by owner)
- 2026-11-24 — [provisional] On a computer «Par où commencer ?» waits under the programme's card while the card leaves, then goes on with the page (`.ou-stage`, globals.css). (held by owner)
- 2026-11-17 — [provisional] The closing is a sage band (`salvia`), the invitation the light one (`salvia-clara`), the programme the dark one. (held by owner)
- 2026-11-16 — [provisional] Group, private and park show as three links on the classes row, never as three items of their own. (held by owner)
- 2026-11-16 — [provisional] The programme's one action is a link inside its intro sentence, not a button: the card has no room for a row. (held by owner)
- 2026-11-24 — The dark card after the cover is no longer the online programme but «Ton corps, trimestre par trimestre»: for each trimester, what often changes in the body and how the practice adapts, then why moving is good; its link goes to the prenatal page. The lines are the prenatal page's, shortened; their sources are on the prenatal page, which the card links to, and not at the Home's foot (the owner's word, against AGENTS.md's rule for health text). The programme «Grossesse en mouvement» is off the Home until Sofia validates it. Why: `docs/research/2026-11-24-home-pregnancy-scene-content.md`. (held by owner)
- 2026-11-16 — [provisional] Content Sofia has not given yet shows as a sand box with the flower and the «à confirmer» pill, never sample content. (held by owner)
- 2026-11-24 — The one exception, asked by the owner: the home's testimonials show eight sample cards written by us, each marked «Exemple» and naming no one; the line with the «à confirmer» pill above them was removed at the owner's word. Not to be published as they are. (held by owner)
- 2026-11-24 — [provisional] Testimonials and «Écris-moi» are one scene, after lottiemurphy.com (owner's pick): a dark band a screen tall that rises as a dome over «Aperçu d'un cours», which waits in place meanwhile (computer only), as the programme does over the cover; two rows of cards in cream, light blue and sand going round slowly, one each way (they stop under the pointer; still with reduced motion; the pause button was removed at the owner's word); between them and the ask, a strip of class photos as on the reference (eight columns of 238 × 317 px photos going round, one up and the next down, under a fade of the band's colour), with placeholder photos; the ask is a sage card at the band's foot. Why: `docs/research/2026-11-24-testimonials-and-closing.md`. (held by owner)
- 2026-11-24 — [provisional] «Aperçu d'un cours» sits before that band, laid out as on lottiemurphy.com: a wide frame, and under it the title and a line on the left and the booking button on the right. On a computer it fits one screen and holds for half a screen of scroll before the band shows. No video yet: a placeholder photo and a drawn play mark; the «à confirmer» pill on it was removed at the owner's word. (held by owner)

### Every page

- 2026-11-25 — What moves on its own (the breath, the hero's floating photos, the word strip, the rows of cards and photos) rests while it is off screen (`lib/on-screen.ts`); the grain over the page is a plain overlay, not a blend. Both for slow computers: 30–43 fps became 48–56 on the Home with the CPU slowed 12×. (held by gate: none, measured by hand)
- 2026-11-24 — The nav leaves while the page goes down and returns when it goes up, never while in use; it stays put with reduced motion (`nav/hide-on-scroll.ts`). (held by owner)
- 2026-11-20 — Every page's content has a way to write to her: About and workshops end with the «write to me» block (`InvitarAEscribir`), private classes has it mid-page. (held by owner)

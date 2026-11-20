# How solo yoga teachers are contacted and booked

**Date:** 2026-11-20 · **Asked by:** Mateo · **Builds on:** `2026-11-16-home-sitemap-comparables.md` (the same
sites) and `2026-11-20-home-cta-user-journey.md`

The question: on the sites of individual yoga teachers (one person, not a studio with several teachers) who give
classes and sell video, as Sofia does, how do visitors contact them and sign up.

Tags: `read` (a fetch agent read the page and reported it; it reads the page's text, so a widget a script adds
after load is invisible to it), `snippet` (a search result's summary), `inferred`.

## 1. The eleven sites

Home and contact page of each, plus the booking or offer page where there was one [read · 2026-11-20 · author].

| Site | Who | E-mail shown | Form | Phone | WhatsApp | Instagram | Newsletter | In-person booking | Video offer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| aliceripollyoga.com | Geneva, pre/postnatal | yes | yes | yes (call or text) | no | yes | yes | agenda on the site, or e-mail, or message | none |
| bluetigeryoga.com | Lyon, yoga + maternity | yes | yes | no | no | yes | yes | «je vous invite à me contacter» | none |
| yogajulia.com | Haute-Savoie, vinyasa + perinatal | yes | no | no | no | yes | yes, with a free practice | contact before the first class, then drop in | own online studio, login |
| toniosborneyoga.com | London, private + pregnancy | yes | yes | no | no | yes | no | e-mail for private; Instabook for groups | Momence, £20 a month |
| sarahburgessyoga.com | London | yes | no | no | no | yes | no | e-mail, Happity, Ticket Tailor by class | live class, «contact me to book» |
| yogabirthandbeyond.co.uk | London, pre/postnatal | yes | yes (on the home) | no | no | not seen | no | contact her | £10 a month |
| hathamamayoga.co.uk | London | yes | yes (on the home) | no | no | yes | no | Happity and the site's own calendar | Zoom by arrangement |
| juliettemarchalyoga.com | France, in person + online | yes | no | no | no | yes | yes, with a free e-book | not read | 24,90 € a month, 7 days free; a free call on Calendly |
| clarisse-ernoux.com | France, online studio | yes | yes | no | no | yes | yes | — | own app, 19,90 to 25 € a month |
| yogacongracia.com | Barcelona, small studio + online | yes | yes | no | no | yes | yes | calendar (heymarvelous) | 20 € a month; maternity pass 39 € |
| bettinarae.com | Australia, online only | only on the offer page | no | no | no | yes | yes, with free guides | — | A$29 a month, free trial; no contact page |

Counts, of 11: e-mail 11 · Instagram 10 · contact form 7 · newsletter 7 · a contact page 8 (2 more have the
contact section on the home, 1 has none) · phone 1 · WhatsApp 0 · live chat 0 · a stated reply time 0.

## 2. What repeats

- **To ask a question:** e-mail everywhere, a form on two in three. Nobody shows WhatsApp, and one of eleven
  shows a phone number [read].
- **To book a class in person:** of the seven whose booking was read, three book by message only (Blue Tiger,
  Julia, Yoga Birth & Beyond) and four use a booking tool with a message as the fallback (Alice Ripoll, Toni
  Osborne, Sarah Burgess, Hatha Mama). Private classes are by message on every site that has them [read].
- **To get the videos:** all seven that sell video sell it by a button to a checkout or an app, never by a
  message: a monthly fee from £10 to A$29, and four of the seven give a free way in first (a free practice, a
  7-day or 30-day trial, a free class or guide for an e-mail address) [read].
- **The e-mail address as an asset:** seven of eleven collect addresses with a newsletter, four of them in
  exchange for something free [read].
- **Around Geneva:** Alice Ripoll takes e-mail, a call or a text and a form; Devika Coles (Aloha Yoga) takes
  sign-ups on Meetup and questions by text message; the university hospital takes sign-ups on its own platform.
  Other independent teachers were found only on marketplaces (Superprof, Apprentus). No WhatsApp was seen
  [read for Alice Ripoll and the hospital; snippet for the rest].
- **Geneva prices, for reference:** Alice Ripoll's prenatal group class is CHF 35, 5 for CHF 160, 10 for CHF 300;
  a private hour CHF 108. The hospital's course is CHF 60 for 90 minutes [read].

## 3. What it means for Sofia's site

- Sofia leading with WhatsApp is unusual among these sites, not wrong: it is her confirmed main channel, and the
  site also gives e-mail and Instagram, which is what everyone else gives. The site has no contact form; seven of
  eleven do. The contact page's composer does that job by opening WhatsApp or the e-mail with the message written
  [inferred · author].
- Booking by message matches what three of seven do in person and what all do for private classes [read].
- For the online programme the pattern is the opposite of a message: a checkout button, a monthly or one-off
  price, and a free way in. Before launch, the equivalent is collecting e-mail addresses of people who want to be
  told. Today the site collects that interest on WhatsApp («Être prévenue du lancement») [inferred · author].

## 4. A finding nobody asked for: the programme's name is taken in Geneva

The Geneva University Hospitals run a course for pregnant women called **«Grossesse en mouvement»**: led by a
midwife, 90 minutes, CHF 60, in French, body and breathing exercises, sign-up online. The page was updated on
19/11/2026 [read · https://www.hug.ch/grossesse-mouvement · 2026-11-20 · author]. Sofia's online programme has the
same name, for the same audience, in the same city (`src/app/[lang]/page.tsx`, `MENSAJES.programme`).

## 5. Second round

The question the first round raised: is WhatsApp missing because of the countries (France, UK, Australia)? Two
searches for Geneva-area teachers found text messages and e-mail, no WhatsApp, and few personal sites at all. Not
settled: the sample around Geneva is two teachers and a hospital.

## 6. Still missing

- A widget added by script (a floating WhatsApp or chat bubble) cannot be seen by the fetch; «WhatsApp 0 of 11»
  means none in the pages' text and links.
- No site from Latin America or Spain's solo teachers, where WhatsApp is the common channel; Sofia's audience is
  Geneva, so they were not sought.
- elise-et-aum.com (Geneva) was not retried after its 503 on 2026-11-16.
- Juliette Marchal's in-person booking page and three offer pages were not read.
- Whether the hospital's course name is a registered trademark was not checked.

## Sources

The eleven sites above (home, contact and booking or offer pages) · https://www.hug.ch/grossesse-mouvement ·
https://www.hug.ch/yoga-prenatal · https://www.meetup.com/aloha-yoga-in-geneva/events/ (snippet)

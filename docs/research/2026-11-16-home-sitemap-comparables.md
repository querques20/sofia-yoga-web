# Home and sitemap: what Sofia offers and how comparable sites are built

**Date:** 2026-11-16 · **Asked by:** Mateo · **Read at:** `6324f6e` (`origin/main`; the home files on the working
branch are identical to it)

The question: what Sofia offers, in plain words, and what comparable yoga sites put in their page map, their hero
and the sections under it, so the Home's next sections can be decided.

Tags: `tested` (a command run here), `read` (the source read in full), `snippet` (a search result or a tool's
summary of a page), `inferred`. Every live site below was opened through a fetch tool that returns a summary of
the page, so those claims are `snippet`: nobody looked at the rendered page, and images were not seen.

## 1. What Sofia offers

Read from the site's own texts and comments, which record what she confirmed.

| What | State | Source |
| --- | --- | --- |
| Prenatal yoga, in Geneva | Offered today | `src/app/[lang]/yoga-prenatal-geneve/page.tsx`; `Bande.tsx:8` «confirmado el 30/9 y en su tarjeta» [read · 2026-11-16 · author] |
| Post-partum yoga, in Geneva | Offered today | `yoga-post-partum-geneve/page.tsx`; same confirmation [read] |
| Dynamic yoga for everyone: vinyasa, yoga flow | Offered today | `cours-de-yoga-geneve/page.tsx` [read] |
| Three ways to take those classes: group, private, park | Offered today | `src/lib/navegacion.ts` (`CLASES`); `Bande.tsx` [read] |
| Workshops | A page exists; none announced | `ateliers-evenements/page.tsx`: «Aucun atelier n'est annoncé pour le moment» [read] |
| Online pregnancy programme, by trimester, a yang and a yin part, videos + PDF + texts | Coming soon, not on sale | `src/app/[lang]/page.tsx` (`programme`) [read] |

About her: yoga teacher in Geneva, no studio of her own, classes in French, registered with Yoga Alliance; trained in
Ashtanga Vinyasa (India), yin yoga and fascia therapy (Switzerland), and pre/postnatal yoga
(`src/lib/datos-estructurados.ts:10,22-26`) [read]. Booking is by message: WhatsApp first, then e-mail and Instagram;
no online booking in this stage (`ateliers-evenements/page.tsx`, `Closing.tsx`) [read].

**Not confirmed by her**, shown as «à confirmer» on the site: places, days, times, prices, payment, class length,
from which week of pregnancy, whether babies come to post-partum, the park's season and places [read · grep
`AConfirmer` · 2026-11-16]. Photos: two of the hero's six are hers, four are provisional stock
(`docs/superpowers/specs/2026-11-04-inicio-con-fotos-design.md`) [read].

**Why it reads as unclear.** The offer has two axes: *what* (prenatal, post-partum, dynamic yoga, workshops) and
*how* (group, private, park). The menu keeps them apart: five entries, with the three formats under «Cours»
(`navegacion.ts`). The hero flattens them into six equal doors: Yoga prénatal, Post-partum, Cours en groupe, Cours
privés, Au parc, Ateliers [read]. Nothing on the Home says that group, private and park are three ways to take the
same class [inferred · author].

## 2. Comparable sites

Thirteen sites opened: home page through the fetch tool, page list from each `sitemap.xml` with `curl`
[2026-11-16]. One more (elise-et-aum.com, Geneva) answered 503 and was not read.

| Site | Who | Menu (in order) | Hero | Home sections after the hero |
| --- | --- | --- | --- | --- |
| aliceripollyoga.com | Independent teacher, Geneva, pre/postnatal | Accueil · Yoga · Yoga Prénatal et Postnatal · Doula · Alice Ripoll · Horaires et Tarifs · Evénements · Blog · Contact | Three words («Authentique, Bienveillant, Sur-mesure»), portrait, links to À propos and Contact | quote · where (Geneva, studio, park in good weather) · how to register · Quel yoga ? · Pour qui ? · Pour quoi ? · button to Horaires et Tarifs |
| bluetigeryoga.com | Independent teacher, Lyon, yoga + massage + maternity | Accueil · Yoga (Cours, Entreprise, FAQ…) · Massages · Accompagnement · Carte cadeau · Presse · Contact | Name and tagline, no button | four service cards · À propos · Témoignages (6) · Contact form · newsletter |
| yogajulia.com | Teacher, Lyon, vinyasa + perinatal, online | Yoga en Ligne · Yoga & Maternité (Prénatal, Postnatal) · Formations · Présentiel (Cours, Ateliers) · Blog · Contact | One promise sentence, no button | three offer blocks with buttons · Rencontre ta prof · newsletter with a free practice |
| juliettemarchalyoga.com | Teacher, France, many styles + online | À propos · Cours de yoga (9) · Réserver (Planning, Tarifs, Cartes cadeaux) · Ateliers · Stages · Blog · Contact | One promise sentence | six offer cards · her approach · five style cards · online subscription and price · testimonials (3) · press · free e-book · newsletter · Instagram · free call |
| clarisse-ernoux.com | Large online studio (750k followers) | Vos Objectifs (by life stage: Grossesse, Post-partum, Ménopause; by motivation) · Clarisse Ernoux · Blog · Formation pro | «Mon studio en ligne», rating, numbers, one button | "for you if" · app · videos · four programmes · challenges · about · press · testimonials · prices · FAQ · free class · newsletter |
| toniosborneyoga.com | Independent teacher, London, private + pregnancy | Home · Private Yoga · Pregnancy Yoga (Postnatal with Baby…) · Contact · What Students Say · Blog · Gallery | «Meet Toni Osborne - Private Yoga Teacher… in South East London», buttons Book Private Yoga, Schedule & Booking, reviews | testimonial · gallery · testimonials · on-demand library with price · gift vouchers with prices · credentials |
| sarahburgessyoga.com | Independent teacher, London | Home · About Sarah · Testimonials · More About Yoga · Classes, Workshops & Courses · Corporate & 1-to-1 · Contact | «Welcome» + who she is and where (Hackney) | recognition · story · where she teaches · link to schedule · private and corporate · list of styles · postnatal course · Instagram · training · approach |
| yogabirthandbeyond.co.uk | Independent teacher, London, pre/postnatal | Home · Yoga Studio (Plans & Pricing) · Birth Preparation · Postnatal Doula · Life Coaching · Pre & Postnatal Yoga · Blog | «Hi, I'm Indi» + bio | online studio banner with price · blog · testimonial · contact form |
| hathamamayoga.co.uk | Independent teacher, London (Ealing) | Home · Book Classes · My Bookings · My Subscriptions | Name, «Yoga classes in Ealing», list of what she teaches | four class blocks, each with a Book button · timetable · About · Testimonials (5) · FAQ · Contact |
| mamayoga.es | Pre/postnatal centre, Barcelona + online | Yoga online · Yoga presencial · Acompañamiento · Formación · Regala · Conócenos · Contacto | «Yoga para embarazadas y postparto», «Online & Barcelona», one button | brand · classes · support groups · testimonials · consultations · next workshops |
| yogacongracia.com | Online studio, Spain | Clases Online · Yoga Maternidad (Pre-natal, Post-natal…) · Shop | Welcome, one button to buy a pass | passes with prices · how it works · testimonial · newsletter · Instagram |
| bettinarae.com | Online, pregnancy and fertility, Australia | Members · About · Shop · Blog · Teacher Training | «Motherhood, without the stress», free-trial button | "I'm Bettina" · three free guides / entry points · latest posts |
| mamatayoga.com | Perinatal yoga, Canada, trainings + classes | not captured | «The Perinatal Yoga + Movement Experts», two buttons by audience (teachers, students) | news · trainings · "Hi Friend" · student classes · newsletter · blog · Instagram |

All rows [snippet · WebFetch of each home + `curl <site>/sitemap.xml` · 2026-11-16 · vendor].

### What repeats

Counted on the thirteen rows above [inferred from the snippets · author]:

- **The teacher on the Home:** 11 of 13 present her (a bio block, or the hero itself).
- **The offers as two to six blocks, named by who they are for or what they are** (pregnancy, postnatal, private,
  online), not by format alone: 9 of 13. The other four (Alice Ripoll, Sarah Burgess, Toni Osborne, Yoga Birth
  and Beyond) give it as running text, links or a single banner.
- **Testimonials on the Home:** 8 of 13; one more has them as a menu page.
- **Place in the first screen**, among seven who teach group classes in person (Alice Ripoll, Blue Tiger,
  Juliette Marchal, Toni Osborne, Sarah Burgess, Hatha Mama, Mamayoga): 4 (Toni Osborne, Sarah Burgess, Hatha
  Mama, Mamayoga). Alice Ripoll gives it in the block right after the hero.
- **Schedule or prices one click from the Home**, among the same seven: 6 (a menu entry or a
  button: Horaires et Tarifs, Planning/Tarifs, Schedule & Booking, Book Classes, Classes…, Cours). Only Hatha Mama
  prints the timetable on the Home itself.
- **A blog:** 8 of 13.
- **Menu size:** 3 to 9 entries; the offers by type, the teacher, schedule and prices, workshops or events,
  contact.

Field principle: NN/g, «Homepage Design: 5 Fundamental Principles» (Huei-Hsin Wang, 2024-03-15). Principle 2:
«Communicate Who You Are and What You Do»; principle 3: «Reveal Content Through Examples»; principle 4: «Prompt
Actions and Navigations» [snippet · https://www.nngroup.com/articles/homepage-design-principles/ · 2026-11-16 ·
author of the article].

## 3. Second round: what a pregnant visitor finds, and what an unsold programme does

Question picked after the first round: Sofia's practical facts are unconfirmed and her programme is not on sale,
so what do comparables show in those two places?

- **Practical facts.** Alice Ripoll (Geneva) has one page, «Horaires et Tarifs»: group class CHF 30, prenatal or
  postnatal class CHF 35, pack of 5 CHF 160, pack of 10 CHF 300, private hour CHF 108; her prenatal page gives
  «dès 6 semaines après votre accouchement» for postnatal, with the baby [snippet · WebFetch
  /horaires-et-tarifs-1 and /yoga-prenatal · 2026-11-16 · vendor]. Other Geneva prenatal classes list a day, a
  time, a place and CHF 35 to 40 a class [snippet · WebSearch result · 2026-11-16]. These are the facts Sofia's
  pages mark «à confirmer».
- **An online pregnancy programme.** Julia Barnes («Mama Bloom»): for whom, six outcomes, two testimonials, what
  is included, the teacher, how to join, FAQ, and a free prenatal practice in exchange for the newsletter; it
  says it does not replace medical follow-up [snippet · WebFetch /yogaprenatal · 2026-11-16 · vendor]. Bettina
  Rae, Clarisse Ernoux and Juliette Marchal each give a step for whoever is not buying yet: a free guide, a free
  class, a free trial or e-book [snippet]. All four sell the programme; none was found announcing one that does
  not exist yet [not found].
- **Sofia's programme section has no action at all**: no link and no button in `src/components/Programme.tsx`
  [tested · `grep -nE '<a |<Link|href=|button' src/components/Programme.tsx` returns nothing · 2026-11-16 ·
  author].

## 4. Suspicion

Held at the start: the Home shows six doors of equal weight and then a programme that does not exist yet, so a
visitor cannot tell what she sells; comparables lead with for whom, what and where.

- **Dropped for the hero.** It already says who, what, where and gives one action: «Yoga prénatal, post-partum et
  cours de yoga à Genève», «Avec Sofia Costa», the WhatsApp button (`src/app/[lang]/page.tsx`) [read]. That is
  more than 9 of the 13 heroes say.
- **Confirmed below the hero.** The six doors mix what and how, nothing explains it, and the second screen is a
  product that cannot be bought and has no next step. Comparables put the offers explained, the teacher, proof
  and the practical facts there.

## 5. Options for the Home

- **A (recommended).** Keep the hero and the programme where they are. Add after the programme a section that
  explains the offer in three groups (pregnant, after the birth, for everyone: group, private or park) with the
  workshops in one line; then the invitation (exists); then how it works with the practical facts («à confirmer»
  until she answers); a place for testimonials, empty until she gives real ones; the closing (exists); the strip.
  Give the programme one action: to be told when it opens, by message.
- **B.** The same sections, with the offer second and the programme lower. Closest to the comparables, since the
  programme is not on sale; it undoes the card that rises over the cover (`6324f6e`).
- **C.** Recut the hero into three doors (prenatal, post-partum, classes) and move formats and workshops below.
  The clearest first screen; it undoes the six-petal flower approved on 2026-11-04.

Firmness: medium. Thirteen sites, read through a summarising tool and not looked at; no conversion figure for any
of them.

## 6. Still missing

- The rendered pages were not looked at: the fetch tool returns text. Layout, photo use and motion of the
  comparables are unknown. A browser pass would cover it.
- elise-et-aum.com (Geneva): 503 on the fetch. centre-perinatal.ch prenatal page: 404 after its redirect.
- No conversion or analytics data for any site: not public.
- Sofia's own channels were not searched: her name stays out of outside requests.
- The «Contexto maestro» the code cites is not on this machine; her confirmed facts were read from the site's
  texts and comments instead.

## 7. Needing Sofia's word

Places, days, times, prices, payment, class length; from which week (prenatal); whether babies come and from
when (post-partum); the park's season; real testimonials; her photos and whether the Instagram ones may be used.

## Sources

- https://www.aliceripollyoga.com/ · /yoga-prenatal · /horaires-et-tarifs-1
- https://www.bluetigeryoga.com/
- https://www.yogajulia.com/ · /yogaprenatal
- https://juliettemarchalyoga.com/
- https://www.clarisse-ernoux.com/
- https://www.toniosborneyoga.com/
- https://www.sarahburgessyoga.com/
- https://www.yogabirthandbeyond.co.uk/
- https://www.hathamamayoga.co.uk/
- https://mamayoga.es/
- https://yogacongracia.com/
- https://www.bettinarae.com/
- https://www.mamatayoga.com/
- https://www.nngroup.com/articles/homepage-design-principles/

# Sitemap, calls to action and what the visitor does

**Date:** 2026-11-20 · **Asked by:** Mateo · **Read at:** the working tree of `feat/admin-base` over `6324f6e`
(the home sections of 2026-11-16/17 are uncommitted there) · **Builds on:**
`2026-11-16-home-sitemap-comparables.md`

The question: is the page map right, are the calls to action right, how should someone reach Sofia (the bubble at
the bottom right), and what does a visitor tend to do, so the site can lean that way.

Tags: `tested` (a command run here), `read` (a fetch agent read the page in full and reported it), `snippet` (a
search result's summary), `inferred`.

## 1. What the site has today

**Pages (8):** home, prenatal, post-partum, classes, private classes, workshops, about, contact
[tested · `find src/app/[lang] -name page.tsx` · 2026-11-20 · author]. Menu: five entries plus a terracotta
«Contact» button that goes to the contact page (`src/lib/navegacion.ts`) [read].

**Contact actions in each page's content, in reading order** (`*` = a terracotta button; parsed from the served
HTML of `http://localhost:3011`) [tested · 2026-11-20 · author]:

| Page | Actions |
| --- | --- |
| Home | WhatsApp* (hero) · «Être prévenue du lancement» link (programme) · «Demander sur WhatsApp»* (info box) · WhatsApp* + e-mail + Instagram (closing) |
| Prenatal | WhatsApp* · WhatsApp* + e-mail · «Demander sur WhatsApp»* · link to the contact page |
| Post-partum | the same four |
| Classes | the same four, plus one WhatsApp text link |
| Private classes | WhatsApp* · «Demander sur WhatsApp»* |
| Workshops | «Être prévenu.e»* |
| About | **none** |
| Contact | message composer → «Continuer sur WhatsApp»* · «Écrire un e-mail» · phone, e-mail and Instagram written out |

**The persistent way in:**

- Computer: the menu stays on screen with its «Contact» button; there is no floating button (`lg:hidden` on
  `ContactFlottant.tsx`) [tested · computed `display: none` at 1440 × 900].
- Phone: the menu bar shows the logo, the language and the menu, no «Contact»; a floating «WhatsApp» button
  (141 × 56 px, bottom right, terracotta) appears after 0.8 of a screen, hides when the footer shows, and is absent
  on the contact page. Its message is already written by page (prenatal, post-partum, classes, workshops)
  [tested + read `ContactFlottant.tsx`].

**Where the actions sit on the home, in screens from the top** [tested · `getBoundingClientRect` after
`ScrollTrigger.refresh()` · 2026-11-20]:

| | 1440 × 900 | 390 × 844 |
| --- | --- | --- |
| Page length | 10.7 screens | 11.9 screens |
| Hero WhatsApp button | 0.8 (in the first screen) | 0.4 (in the first screen) |
| Programme link | 1.6 | 1.5 |
| «Par où commencer ?» starts | 4.7 | 5.3 |
| Next button (info box) | 7.8 | 8.9 |
| Closing button | 9.0 | 10.0 |

Between the hero and the info box there are about 7 screens with no button in the content. The menu's «Contact»
(computer) and the floating button (phone) cover that stretch.

## 2. What research says visitors do

- **Most attention goes to the top.** NN/g eyetracking, 120 participants, over 130,000 fixations on 1920 × 1080
  screens: about 57 % of viewing time above the fold, 74 % in the first two screenfuls, 81 % in the first three.
  Its advice: «Keep major CTAs above the fold», signal that there is more below, and «very long pages increase the
  risk of losing the attention of your customers». The page does not say whether phones were included
  [read · nngroup.com/articles/scrolling-and-attention · Therese Fessenden, 2018-04-15 · author].
- **A floating button is missed by some people, and people look for «Contact».** NN/g, 8 participants: some
  ignored floating chat buttons; they «usually looked under Help or Contact Us». Guidelines: do not rely on a
  floating button as the only way in; put it on the right and make it contrast; have a link on the contact page.
  People liked chat because typing is less of a commitment than a call and leaves a written record
  [read · nngroup.com/articles/chat-ux · Raluca Budiu, 2019-01-13 · author].
- **On a phone a sticky button can cover content and cannot be dismissed.** Baymard: sticky chat elements «often
  block key page content» on mobile and «are generally more warranted to have as desktop-only features»; put the
  way to chat in the header, the footer and the help pages, and let the visitor start it. Its examples are shops
  (filters, autocomplete, swatches), not reading pages [read · baymard.com/blog/live-chat-usability-issues ·
  Rebecca Hugo-Terrey, 2019-10-15 · author].
- **A button that stays on screen tends to raise clicks on phones.** Agency and vendor tests report lifts from 3 %
  to 25 % on mobile, one found no change on desktop; samples are mostly undisclosed and all are shops
  [snippet · conversion-rate-experts.com, zipify.com, convertica.org, blendcommerce.com · vendor].
- **What people want from a local business's site:** a list of what it offers, prices, phone, address and hours;
  missing or outdated prices and contact details put people off (BrightLocal, 811 respondents, 2014, US/Canada)
  [snippet · brightlocal.com/research · vendor survey, dated].
- **How people choose a yoga class:** convenience first (place, time of day, length), then atmosphere and teacher;
  cost works as a barrier more than as a draw (DOYOU survey of over 10,000; InSpiral 2013)
  [snippet · doyouyoga.com · author, methodology not verified].
- **What stops and what helps pregnant people taking prenatal yoga:** barriers are safety worries, time, discomfort
  joining (no experience, body limits), cost, and doubts that yoga is appropriate in pregnancy; what helps is
  knowing the benefits, an online option, adapted postures, a low price, and safety information or a referral from
  a trusted medical provider (BMC Pregnancy and Childbirth 2025, 18 patients and 11 professionals, United States)
  [read, abstract only · Europe PMC record of doi 10.1186/s12884-025-08383-5 · Santarossa et al. · author].
- **WhatsApp in Switzerland:** an IGEM Digimonitor figure of 84 % of the population using it at least occasionally
  (2021); another article of the same year gives 56 %, so the exact share is unsettled. No split by age was found
  [snippet · itreseller.ch, netzwoche.ch · 2021].
- **Messaging against a contact form:** no independent comparison was found, only vendor claims [snippet].

## 3. What it means for this site

- **The page map holds.** One page per audience, one for the teacher, one for contact, matches the comparables of
  the earlier report. Nothing in this round asks for a new page. A schedule-and-prices page is what the comparables
  have and this site lacks, and it cannot exist until Sofia confirms them [inferred · author].
- **The biggest brake is missing facts, not layout.** Place, time and price are what the surveys rank first, and
  all three show «à confirmer». Until they arrive, «ask her» is the only honest action, and the site already
  writes that question for the visitor (`MENSAJES.ouQuand`) [inferred · author].
- **The site already follows the NN/g and Baymard advice for the way in:** a main action in the first screen, a
  «Contact» entry where people look for it, the floating button on the right in a contrasting colour and not the
  only way, hidden where it would duplicate (footer, contact page) [tested, section 1].
- **A WhatsApp link behaves differently on a computer:** it opens WhatsApp Web or the desktop app, which the
  visitor may not have signed in. That favours the contact page as the computer's persistent destination (it also
  shows the e-mail and the number) and WhatsApp as the phone's [inferred · author; not tested].

**The path we want**, by where the visitor comes from [inferred · author]:

1. From a search («yoga prénatal Genève») she lands on a class page, not the home; from Instagram she lands on the
   home, on a phone.
2. First screen: she confirms what it is and that it is in Geneva.
3. She picks her situation: the hero's doors, or «Par où commencer ?» lower down.
4. On her page she checks whether it is safe and for her (the midwife's agreement, the cited sources).
5. She looks for where, when and how much, finds «à confirmer», and writes: WhatsApp opens with the message
   written, where she fills in her weeks.

## 4. Gaps found

1. **The About page has no contact action in its content** [tested]. Someone who reads her story has to go back
   up to the menu.
2. **Workshops has one action and private classes two**; the other class pages have four [tested].
3. **On a computer, 7 screens of the home have no button in the content** [tested]; the menu covers it.
4. **The home is 10.7 to 11.9 screens long**, 2.8 of them the pinned programme, which is not on sale yet;
   «Par où commencer ?» starts at screen 4.7 to 5.3, after the stretch where NN/g found 81 % of viewing time
   [tested + read].

## 5. Options

- **A (recommended).** Keep the map and the two persistent ways in (menu «Contact» on a computer, floating
  WhatsApp on a phone). Close the gaps: a closing contact block on About, and the same closing on workshops and
  private classes.
- **B.** A plus a floating button on a computer too.
- **C.** The floating button opens a small menu (WhatsApp, e-mail, Instagram) on every screen size.

## 6. Still missing

- No measurement of real visitors: the site has no analytics, so every behaviour here is from other sites' studies.
- WhatsApp use in Switzerland by age was not found; the 2021 figure is unsettled.
- The NN/g attention figures are from desktop screens; no phone equivalent was read.
- The floating button was not checked for covering content at each scroll position of each page.
- The rendered pages were not looked at in this round; positions were measured, not seen.

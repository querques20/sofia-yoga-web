# The home's pregnancy scene: sell the programme, or explain the body by trimester?

**Date:** 2026-11-24 · **Asked by:** Mateo · **Read at:** the working tree of `feat/admin-base` over `6324f6e`
· **Builds on:** `2026-11-16-home-sitemap-comparables.md`, `2026-11-24-testimonials-and-closing.md` (fourth round)

The question: the home's second scene announces an online pregnancy programme that nobody has validated with
Sofia. Should its text become information instead — what happens in the body in each trimester and why moving
(and prenatal yoga) is good — and what can be said with evidence?

Tags: `tested` (a command run here), `read` (the source read in full, by me or by a fetch agent that quoted
it), `snippet` (an abstract or a search result), `inferred`.

## 1. Where the programme on the home comes from

- The scene is in the site's first commit (`fdcbfd9`, 2026-10-24) [tested · `git log --diff-filter=A` · author].
- Its content matches the team's URL map, a PDF marked «PROPUESTA (sitemap SEO v3)» dated 2026-10-09: programme
  «Grossesse en mouvement», online, «3 trimestres × dinámico + suave», «videos, PDFs, textos», opening with
  «Texto de Sofía («Este programa está pensado para vos si estás embarazada…»)» [read · `pdftotext` of
  `Sofia-Yoga-Mapa-URLs.pdf` · 2026-11-24 · team].
- The same map puts the programme in **stage 2**, and for the stage-1 home says only «Etapa 2: suma un banner
  del programa online» [read · same PDF].
- A code comment in the first commit cites a second document, «contexto maestro, sección 7», as the source of
  her own wording. It is not in the repository and was not found on this machine [tested · `find`, `git grep`].
- «Il arrive bientôt» has no date behind it in either source, and the words «yang» and «yin» are not in the map
  [tested · `grep` on the PDF's text].

## 2. What the site already says about the body, with sources

The prenatal page already holds the content the question asks for, in three languages, each line with its
source (`src/app/[lang]/yoga-prenatal-geneve/page.tsx`, `pourquoi` and `trimestres`) [read · 2026-11-24 · author]:

| Trimester | What changes | How the practice adapts | Sources named on the page |
| --- | --- | --- | --- |
| 1st | Nausea and great tiredness are frequent | A gentle practice on hard days; no hot yoga | INSPQ; WHO 2020; ACOG |
| 2nd | The belly rounds and moves the centre of gravity forward; ligaments often loosen | Balance changes, no forced stretches, no exercises lying on the back | HAS 2019; WHO 2020 |
| 3rd | The belly takes up room | Adapted postures, stable supports, breathing through the effort | HAS 2019 and 2022 |

And four «why move» lines: 150 minutes a week (WHO, Swiss recommendations); yoga without risk if positions that
lower blood pressure are avoided (HAS); less anxiety, stress and depressive symptoms, with weak evidence
(Corrigan 2022; Villar-Alises 2023); the back (Cochrane 2015).

## 3. What the sources say, read this round

- **Moving in pregnancy lowers the risk of frequent complications.** «l'activité physique peut aider à réduire
  le risque de complications fréquentes, par exemple l'hypertension gravidique, la prééclampsie, le diabète
  gestationnel, la prise de poids excessive durant la grossesse, les complications lors de l'accouchement ainsi
  que la dépression post-partum»; at least 150 minutes a week of moderate activity; light strength work «sans
  respiration trop marquée» and «des étirements doux»; pelvic-floor exercises «fortement recommandés»; a woman
  who did little starts moderately and builds up [read · Recommandations suisses en matière d'activité physique,
  OFSPO/OFSP 2022, §4.5 · `pdftotext` of the PDF the site cites · 2026-11-24 · authority].
- **Prenatal yoga, pooled studies.** 31 studies, 29 in the meta-analysis with 2217 pregnant women: less anxiety
  (SMD −0.91), depression (SMD −0.47) and perceived stress (SMD −1.03); labour shorter by 117.75 minutes
  (95 % CI −153.80 to −81.71); higher odds of a normal vaginal birth (OR 2.58, 95 % CI 1.46–4.56). «The quality
  of evidence (GRADE criteria) was low to very low for all outcomes» [snippet · abstract of Corrigan et al.,
  BMC Pregnancy and Childbirth 2022, via the Europe PMC API · 2026-11-24 · authors]. The full text was not read:
  the publisher's page answered with a cookie handshake.
- **What changes in the body, by trimester.** First (weeks 1–12): «Hormonal changes affect almost every organ
  system in your body»; extreme tiredness, morning sickness, mood swings. Second (weeks 13–28): «Body aches, such
  as back, abdomen, groin, or thigh pain»; «Your abdomen will expand as the baby continues to grow»; nausea and
  fatigue often ease. Third (weeks 29–40): shortness of breath, trouble sleeping, «the baby is getting bigger
  and it is putting more pressure on your organs» [read · womenshealth.gov «Stages of pregnancy», page last
  updated 2025-09-26, quoted by a fetch agent · 2026-11-24 · US Office on Women's Health].

The lines of section 2 agree with these three sources where they overlap [inferred · author, set side by side].

## 4. Options

- **A (recommended).** The scene becomes «your body, trimester by trimester»: for each trimester one line on
  what changes and one on how the practice adapts, taken from the prenatal page's sourced lines, and a closing
  line on why moving is good. Same animation. It ends with a link to the prenatal page. The programme leaves the
  home until Sofia validates it. The home gets a sources block at its foot, as the rule for health text asks.
- **B.** A, keeping one last line about the online programme with the «be told at launch» link.
- **C.** Leave the scene as it is until Sofia answers.

## 5. Still missing

- The «contexto maestro» was not read, so nothing here says what Sofia herself wrote or confirmed.
- WHO 2020 (the PDF and the NCBI copy answered with a bot check), HAS 2019 and 2022 (403) and the ACOG FAQ (402)
  could not be opened this round: the «no hot yoga» and «not lying on the back after the first trimester»
  lines rest on the prenatal page's own earlier citations, not on a reading of today.
- Villar-Alises 2023, INSPQ and Cochrane 2015 were not opened.
- No source read gives yoga's effects by trimester: the per-trimester lines are about the body and about
  precautions, not about measured benefits.
- Nothing was built: the texts, their three languages and the native review are still to do.

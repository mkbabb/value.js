# T.W8 · critique pass — ABOUT (card + rendered markdown/KaTeX body) · p1 (round 1 of ≤3)

**Filed**: 2026-07-11 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t`, probed at `5e4f1f6` (the W6.5 close head; the only delta to
the filing head `1142aab` is the sibling picker.p1 docs commit — no demo/src change; tree
clean at probe time).
**Spec of record**: `waves/T.W8.md` §Scope-1 (the census row NAMES this surface's inside:
"incl. the rendered markdown/KaTeX content body — the inside of the owner's twice-flagged
card" [h-gaps G-2]) · `SYNTHESIS.md §2` D1–D10 · `MANDATE-2026-07-06.md §0` (owner verbatim:
T-2 "the about the color spaces title ×1.5 golden, non-bold" · T-3 "a bit too transparent,
should be more cartoon like the other picker card" · T-11 "too glassy is this card, too
transparent" · T-24 the gray/black/white consistency order) · `w45-checkpoint/ROWS.md`
(T-3/T-11/T-18 LANDED W3-1; About ×φ LANDED W4-1, About-700 dead) · `w65-close-artefacts.md`
(the W6.5 ink-walk/O-18 extension state) · SYNTHESIS §6.1 **O-18** (the census row minted for
THIS body: "the markdown/KaTeX About-content body ink + code-block on the rung-1 plate").
**Anchors re-derived via `w1-move-map.md`**: `panes/AboutPane.vue` · `panes/PaneHeader.vue` ·
`custom/markdown/{Markdown.vue, composables/useMarkdownColors.ts, composables/useMarkdownHighlighting.ts}` ·
`custom/katex/Katex.vue` · `color-picker/display/ColorNutritionLabel.vue` · `@styles/hljs.css`.

---

## §1 Method (the O-3 probe class — live drive, dpr 2)

- **Serve**: the live tree on **VJS_E2E_PORT=8620** (`npx vite --port 8620 --strictPort`);
  PERF_PORT=8621 reserved unused; **the owner's :9000 untouched**.
- **Cells**: 1440×900 · 768×1024 · 390×844 × light+dark = **6 cells**, deviceScaleFactor 2,
  `colorScheme` emulation. Sub-lg cells reach About via the segmented `About` tab (the
  route-derived pane law, MOB-2).
- **Drive**: the owner reference color — `#/?space=lab&color=lab(38% 32 24)` (the O-18
  literal, "the brown of the t-20xx shots"). Settle: boot tokens
  (`--accent-live`/`--ink-ambient-l`) + `.markdown-body` mounted + `document.fonts.ready`
  + 1.6s.
- **Probes**: (i) **material parity** about-card ↔ picker-card (computed fill/blur/border/
  radius/stamp/grain + `data-tier`, both schemes @1440); (ii) **the O-18 body census over
  EVERY run class** — 27 text selectors (title, title-member, caption, guide heading, md
  h2/h3/h4/p/li/strong/em/a/mark, inline+pre code, 7 hljs token classes, blockquote, th/td,
  KaTeX, footnotes) + 3 surface rows (pre chip, inline-code chip, toc), min-ratio over up to
  24 instances each, ancestor-composited grounds over the published `--ink-ambient-l`
  referent (the o18 instrument, generalized); (iii) **true-ground forensics** for the
  header band (pixel-sampled with text hidden — the veil `::before` layer the computed walk
  cannot see); (iv) KaTeX render truth (stylesheet rule audit + layer boxes + fontFaces);
  (v) overflow geometry (page/card/pre/katex/tables) at every cell; (vi) **interaction
  leg** — space switch from the About title's inline trigger (lab → OKLCh) with re-mark
  verification; (vii) the scrolled-header re-photograph (observational; T-42 is a package
  bracket with the mechanism HANDED — not re-discovered here).
- **Oracle-of-record re-run**: `VJS_E2E_PORT=8620 npx playwright test o18-contrast-census
  -g "markdown About body" --project=smoke` → **2/2 PASS (light+dark)**. The pass's deeper
  sweep then measured what that roster cannot see (§5).
- **Frames**: `docs/tranches/T/audit/pi/w8/about/` (gitignored PNGs on-disk, the standing
  convention): `about-{1440,768,390}-{light,dark}-{top,guide,katex,code,scrolled}.png` ·
  `about-1440-{light,dark}-{katex-crop,inline-code-crop}.png` ·
  `about-1440-light-{after-scrollintoview,katex-rest,escape-repro,space-menu,switched-oklch}.png`.

## §2 Console attest

One sanctioned line per cell: the designed `DevMisconfigError` loud `console.error`
(dev:web-only on :8620 with no `VITE_API_URL` — the W0-1 honest-dev contract firing as
designed; R10 preserves it). **Zero other errors, zero pageerrors, all 6 cells + both
interaction probes.**

## §3 COHERENCE VERDICT

**NOT YET COHERENT — one A-class render-truth defect inside the twice-flagged card, plus
two rung residuals and one token floor-miss; 4 LAND rows + 1 BRACKET filed.** The card
SHELL and the title fully hold the owner's lines (§4): T-3/T-11 material parity with the
picker is computed-identical, T-2's ×φ non-bold landing is live at every cell, and the
D6 ink referent verifiably tracks the composited resting plate per scheme. The INSIDE —
the surface the owner's shots never opened and no earlier census judged (h-gaps G-2's
exact prediction) — fails on the math body: **every KaTeX formula renders doubled and
unstyled** (AB-1). Nothing here certifies taste.

## §4 The attested table (owner line / doctrine → live witness → read)

| Line | Live witness (probed, not assumed) | Read |
|---|---|---|
| **T-3/T-11** "too transparent → cartoon like the picker card" | About card ↔ picker card **computed-identical material**, both schemes @1440: same `glass-resting shadow-card` classes, `data-tier=resting data-grain=true`, fill `oklab(0.8845 0.0054 0.0127 / 0.678)` (L) / dark twin, border 1px `oklab(0.216… / 0.09)`, radius 16px, cartoon stamp `8px 8px 0` dark offset, identical `::before` inset-rim (α .07) + `::after` grain (α .025), `backdrop-filter: none` on both (rung-1 is plate, not glass) | COHERENT (D1 rung-1; W3-1 holds) |
| **T-2** "About title ×1.5 golden, non-bold" | `.pane-header-title` = **41.888px `--type-display-1` exact-token @1440** (31.49 @768 · 25.89 @390, honest 2-line lock <sm), **weight 400** (`--type-weight-display`), Fraunces; the inline `Lab` member rides the sentence rung italic at 1em; ink 8.39:1 L / 7.37:1 D | COHERENT (D2/Q11a; the About-700 bug stays dead) |
| **T-24 / D1** one neutral family | Card + veil + well-family chips all in the warm stone family; BUT two parallel tone-step species live inside the card (`--muted` vs `--well-bg`) — row **AB-3** | ROW FILED |
| **D6** ink-on-tier referent | `useMarkdownColors` keys `certifyAccentInk` on `resolveSurfaceLightnessLive("resting", ambient, isDark)` — live witness: `--md-color-h2` = `oklch(0.3809 0.1060 31.6)` (light) vs `oklch(0.8250 0.0985 31.6)` (dark) at the SAME pick — the referent demonstrably tracks the composited plate per scheme, never a page constant (the W3-5 shadow-duplicate cure verified live); md-h2 5.05:1 L / 5.15:1 D on the real plate ground | COHERENT |
| **O-18** body census (the G-2 row) | Oracle-of-record 2/2 PASS; pass sweep: prose/li/strong/em 8.39 L / 7.37 D · md-h2 5.05/5.15 · md-h3 6.29/5.93 · mark.cs-name 5.05/5.15 · inline code 9.52/9.53 · pre code 15.81/13.63 · hljs tokens 4.89–15.81 except **hljs-number 4.46 L** (row AB-4) · caption 4.29 L true-ground (row AB-2) | GREEN except the 2 rows |
| **T-4-class liveness** | Interaction leg: the About title's inline space trigger opens, lab→OKLCh commits, the body lazy-chunk swaps, `mark.cs-name` re-marks "OKLCh" (`about-1440-light-switched-oklch.png`) | COHERENT |
| Mobile honesty | 390/768: page never x-scrolls; pre chips scroll internally (`overflow-x: auto`); KaTeX blocks fit (lab doc); title 2-line lock; About reachable via the segmented tab | COHERENT |

## §5 THE ROW LEDGER (typed; anchors live; zero certifications)

### AB-1 · **LAND** (A-class render-truth) — KaTeX CSS is scope-dead: the math body renders DOUBLED, unstyled, in the body sans

- **Witness** (both schemes, all cells): 231 KaTeX rules present but every selector compiles
  scope-suffixed — live dump: `.katex[data-v-d694259c]`, `.katex .katex-mathml[data-v-d694259c]`
  … — matching NOTHING `katex.render` generates (only the component ROOT carries the scope
  attr). Consequences, all measured live at the owner color:
  - `.katex .mord`/`.mathnormal` compute **"Plus Jakarta Sans"** (KaTeX faces registered —
    20 `KaTeX_*` FontFaces loaded — but no rule applies them);
  - the `.katex-mathml` layer computes `position: static; clip: auto` → **the MathML layer
    renders VISIBLY beside the HTML layer**: every formula displays twice, and `sampleText`
    carries the raw LaTeX (`L∗=0 (black) to 100 (diffuse white)L^* = 0 \text{ (black) to }…`);
  - display math is semantically mangled on-screen: the XYZ→Lab piecewise renders as
    `f(t) = {3 t` + a detached full-width radical rule + `116κ t+16t > ϵotherwise`, and the
    constants line displays **"ϵ = 24389216"** (the flattened 216/24389 fraction) —
    `about-1440-light-after-scrollintoview.png`;
  - an unstyled stretchy-brace SVG measures **6400px wide** (the clip-culprit census),
    inflating the card's scrollWidth and clipping the wide `L*/a*/b*` MathML row at the card
    edge with content loss (`about-1440-{light,dark}-katex-crop.png` = 12800px-wide element
    captures).
- **Root**: `demo/@/components/custom/katex/Katex.vue:37-39` — `@import
  "katex/dist/katex.min.css"` INSIDE `<style scoped>`. The exact dead-scoped-CSS class the
  R.W4-C1 rider cured in `Markdown.vue` ("a scoped selector suffixes its LAST compound…");
  Katex.vue is the uncured sibling, present since genesis (`35cd9d5`), load-bearing since
  S.W4-6 chose `htmlAndMathml` + shipped fonts THROUGH this import (`a409feb`).
- **Cure shape** (root-level, E-3): the import leaves the scoped block — an unscoped
  `<style>` block in `Katex.vue` (or a script-side `import`); no per-rule patching, no
  fork of katex.css. In this pass's bounds (`katex/` is a named anchor).
- **Verify at remediation**: `.katex-mathml` computes clipped/absolute; ONE visible layer;
  `.mord` computes a `KaTeX_*` family; no `.markdown-body` descendant box wider than the
  card; the §1 census re-run — the KaTeX ink row re-measured on the then-styled HTML layer;
  the xyz/lab/oklab docs (matrix+cases-heavy) eye-checked at 390.
- **Oracle-visibility note (for the package/triumvirate, NOT a mint here)**: O-18's About
  row was GREEN over this wreckage — contrast cannot see render-truth. A KaTeX-truth leg
  (layer-visibility + face identity) is a NEW oracle class ⇒ bounds expansion per
  `T.W8.md §Triumvirate` — flagged, not minted.

### AB-2 · **LAND** (D6-class) — the About header caption speaks an uncertified de-emphasis; 4.29:1 light on its TRUE ground

- **Witness**: `.pane-header-desc-wrap p` ("The math, the science, …") computes
  `rgb(112 89 66)` (light) — neither `--ink-muted` (`oklch(0.3633 0.0062 56)`) nor raw
  `--muted-foreground` (`rgb(124 102 80)`). Against the pixel-sampled TRUE header ground
  (veil `::before` included, `px(227,204,196)`): **4.29:1 — under the 4.5 small-text floor**
  at 14.38px (dark: 5.54 ✓). D6: de-emphasis is a floor-clamped rung of certified ink; the
  certified rung exists and measures ≥4.5 on this family (the o18 plate-caption row).
- **Root**: `panes/PaneHeader.vue:24` (`text-caption text-muted-foreground`; the computed
  color's exact source — a utility override in the chain — is pinned by the lane).
- **⚠ SHARED-FILE FLAG (M-20/RF-1)**: `PaneHeader.vue` spans ALL 9 panes — at the batch
  cut this row keys the lane on the FILE; it must not ride a batch beside another lane
  holding PaneHeader (picker.p1's T-42 bracket names the same file's shrink register).
- **Cure shape**: the caption joins the certified de-emphasis rung (`--ink-muted`), one
  class-list edit; every pane inherits. Verify: census ≥4.5 both schemes at the owner color,
  naive AND true-ground instruments.

### AB-3 · **LAND** (D1-class) — a parallel tone-step species inside the card: the content chips paint `--muted`, off the rung-2 well

- **Witness**: `pre`, inline `code`, `th`, `.callout` (Markdown.vue scoped styles) and the
  nutrition Definition chip (`bg-muted/50 dark:bg-muted/30`) paint `--muted` =
  `hsl(38 26% 95%)` L / `hsl(28 12% 11%)` D, while the sibling `.toc` in the SAME stylesheet
  already consumes `bg-well` and D1's rung-2 IS "the markdown `bg-muted` pattern
  generalized" (`--well-bg` = card 92% + fg 8%, oklab). In DARK the two species step in
  OPPOSITE directions — muted chips read near-black insets `rgb(31 28 25)` on the cocoa
  plate while the well steps lighter (`oklab(0.345…)`) — the T-18/T-24 "inconsistent card
  backgrounds" class living inside the owner's twice-flagged card; visible in
  `about-1440-dark-top.png` (Definition chip vs the picker's console well in the same frame).
  The nutrition chip adds alpha-variant sub-species (`/50`, `/30`, hover `/60`).
- **Root anchors**: `custom/markdown/Markdown.vue` scoped styles (`pre` :232, `code` :237-250,
  `th` :271, `.callout` :334) · `display/ColorNutritionLabel.vue:5,102`.
- **⚠ SHARED-FILE FLAG**: `ColorNutritionLabel.vue` renders inside the About pane only
  (via AboutPane) but lives in the color-picker tree — batch-map by FILE.
- **Cure shape**: the chips join the ONE well recipe (`bg-well` / `--well-bg`), both
  schemes; the alpha sub-species collapse; O-7's rung-membership roster gains these
  fixtures (roster extension noted for the census, not a new oracle class).
- **Verify**: byte-equality of chip fill vs the page-resolved `--well-bg` (the O-7
  instrument); AB-4's token re-measure on the new ground (same lane — see below).

### AB-4 · **LAND** (token floor-miss) — light `.hljs-number` measures 4.46:1 on the code chip

- **Witness**: `rgb(151 103 0)` on the muted chip `rgb(246 243 239)` = **4.46:1** (floor
  4.5; n=14 instances; every sibling token clears: keyword 5.74 · string 4.89 · comment 4.9 ·
  title/built_in 6.32; dark all ≥6.6).
- **Root**: `demo/@/styles/hljs.css` (the static house token theme; light number color).
- **Sequencing**: rides the SAME lane as AB-3 — the chip ground moves with the well re-seat,
  so ALL hljs tokens re-census against the landed ground in one pass, not twice.

### AB-5 · **BRACKET** (taste → the package; both poles NAMED, reproducible)

- **Axis**: the content-heading weight voice inside the body. Measured: markdown `h2`/`h3`
  + the "Detailed Guide" heading + `mark.cs-name` compute **Fraunces/600** (strong = 700
  body) while the house display voice post-T-2/T-40 is **400** everywhere the owner ruled
  (pane titles, dropdown letterforms, W6.5 "bold dies").
- **Pole A (calm-uniform)**: body headings join `--type-weight-display` 400 — hierarchy
  carried by size + the certified accent ink alone. Reproducible: `Markdown.vue` heading
  rules with `font-weight: var(--type-weight-display)`.
- **Pole B (shipped sectioning)**: the 600 register as landed at `5e4f1f6` — stronger
  section anchors inside long-form prose; the owner's non-bold lines named TITLES and
  OPTIONS, never content headings.
- **Owner-line index**: T-2 ("both should be non-bold") — the nearest ruled line; this axis
  asks whether it extends into the document body. Frames: `about-1440-{light,dark}-guide.png`.

### AB-6 · instrument + non-rows (recorded so pass_2 does not re-file)

- **The header-band instrument note**: the o18 `censusElement` ancestor-walk cannot see
  `::before` veil layers. Naive vs TRUE-ground deltas measured here: caption 3.15 → 4.29
  (still red, AB-2); title-member "Lab" 4.06 → **5.12 L / 4.95 D** — **GREEN on its real
  ground, NO row** (and ≥3:1 large-text regardless at 41.9px). Any future o18 roster row
  seated in a pane header must use the composited-veil ground.
- **No paint-escape**: an early frame read suggested code painting past the card edge;
  the hit-test sweep + edge crop disproved it (`about-1440-light-escape-repro.png` +
  `crop` forensics — paint clips at the card box; the wide boxes are scroll overflow inside
  `pre`). The transient `cardClipsX` signal traces to AB-1's 6400px SVG, not a clip defect.
- **Non-rows**: pre chips scroll horizontally at the 512px card (sw 587 vs cw 462) — honest
  `overflow-x: auto`; KaTeX blocks fit at 390 (lab doc); no tables mounted in lab.md; the
  `?source` deep imports in `assets/docs/*.md` are the SANCTIONED exemption
  (`vite.config.ts:76-84`), not a dogfood row.

## §6 Loop state

Round **1 of ≤3**. Rows AB-1..AB-4 → **remediation_1** (single-writer batch-map note:
AB-2 keys on `PaneHeader.vue`, AB-3 partially on `ColorNutritionLabel.vue` — intersect the
picker lane's files; the batch cut re-homes or sequences per M-20). AB-5 → the package
bracket table. pass_2 (about.p2) re-judges the landed rows with the §1 census re-run,
including the KaTeX ink row on the styled render.

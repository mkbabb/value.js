claude-opus-5[1m] (served model id)

# CHALLENGE — `DarkModeToggle` · axis D (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/layout/DarkModeToggle.vue` (109 lines).
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every row below carries severity ·
`file:line` provenance · its own falsifier. Superlatives carry the same burden (L-18 runs both ways).
**Method.** Static + source-derived only. No browser. Geometry, contrast, payload and timing figures are
computed from the *shipped* artefacts (the two `fourier-paths/*.json`, the *built* `dist/assets/index-57FkGzlZ.css`,
and the *installed* `node_modules/@mkbabb/glass-ui@4.0.0` tree) — arithmetic, not estimate. Claims whose
final step is perceptual are marked **UNPROVEN-NEEDS-LIVE (SS-13)** and their static half is stated separately.

**Read set (whole, read-only).** `DarkModeToggle.vue` · `decorative/FourierMorphSvg.vue` ·
`composables/useFourierMorph.ts` · `lib/svg-fourier.ts` · `assets/fourier-paths/{sun,moon}.json` ·
`layout/AppHeader.vue` (sole consumer) · `src/style.css` · `lib/colors.ts` · `web/DESIGN.md` ·
`web/index.html` · `web/package.json` · installed `@mkbabb/glass-ui@4.0.0` (`dist/dark.js`,
`dist/useGlobalDark-C28t0VWJ.js`, `src/styles/dock-controls/dark-mode-toggle.css`,
`src/styles/theme/bridges.css`, `src/styles/tokens/scheme-motion.css`) · producer `glass-ui@7.0.0`
`src/components/dark-mode-toggle/{DarkModeToggle.vue,dark-mode-toggle.css}` · built `dist/assets/*.css`.

**Corpus folded (not re-derived).** `formation/fourier/lane-frontend.md` §4 (CHARACTERFUL SHADOW row,
`:419-421`), §5 (uplift break surface, `:470-500`), §8 (the 8-site CSS `reduce` ledger, `:619`), §"dark
runtime owner" (`:610`); `formation/fourier/CENSUS-2026-08-03.md` §3a (`:95`, "CHARACTERFUL — `DarkModeToggle`
… keep, reconcile"); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (adjudicated 38/52 TRUE —
**no row in that lane touches this component or the header's design surface**; nothing to cite, nothing to
contradict, stated explicitly so the absence is not read as an omission). Prior fourier-local audits cited
inline where they anticipate a row: `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1393` (PRM),
`:3624-3626` (E4-F4 sRGB mudding), `docs/audits/runs/2026-05-27-D-audit/design/DA-design-A4-equation-morph-chrome.md:56`
(row 9, `aria-pressed`/tooltip, rated *Low*).

**Tally.** 29 defects — **2 BLOCKER** · 6 MAJOR · 16 MINOR · 5 INFO. **6 superlatives.**

**Standing measurement constants** (used throughout, derived once):
`--toggle-size` is set only by the consumer — `AppHeader.vue:242,256`: **2.5rem** (<640px) / **2.75rem** (≥640px).
`style.css:40-50` sets the root font at **1.125rem <768px**, 1rem ≥768px, so the box is **45px** on phones,
**49.5px** in the 640–767px band, **44px** on desktop. viewBox is 200 units square (`DarkModeToggle.vue:11`) ⇒
at the 44px desktop box, **1 CSS px = 4.545 units**; at dpr 3, **1 device px = 1.515 units**.
Backgrounds resolve from the built sheet: `--background: var(--neutral-0)` = **#fbfaf9** light / **#110f0e** dark.

---

## §1 · BLOCKERS

### D-B1 · BLOCKER — the light-mode glyph fails WCAG 1.4.11: **2.51:1** where 3:1 is required, and the *entire* morph path fails
`DarkModeToggle.vue:30` `SUN_COLOR = [232,136,69] // #E88845` → `:55` → `FourierMorphSvg.vue:6` `:style="{color:strokeColor}"` → `:11` `stroke="currentColor"`.

The sun is the **only** visual content of the control (the button's sole child is the SVG; there is no label,
no icon-plus-text, no background chrome — `:2-13`), and it is simultaneously the **only** visual indication of
the current theme state. WCAG 1.4.11 therefore applies at 3:1 on both counts ("visual information required to
identify user-interface components **and states**").

Measured against the shipped tokens:

| stroke | on light `#fbfaf9` | on dark `#110f0e` |
|---|---:|---:|
| `#E88845` (sun, idle-light) | **2.51:1 ✗** | 7.32:1 ✓ |
| `#de8773` (path t=0.25) | **2.58:1 ✗** | 7.12 ✓ |
| `#d486a0` (path t=0.50) | **2.61:1 ✗** | 7.03 ✓ |
| `#ca85ce` (path t=0.75) | **2.60:1 ✗** | 7.06 ✓ |
| `#c084fc` (moon, idle-dark) | 2.53:1 ✗ *(transient in light)* | 7.23:1 ✓ |

Dark mode passes everywhere; **light mode fails at every point of the animation**, including both rest states.

The aggravator is internal precedent. `style.css:113-122` is a signed, dated remediation of *exactly this class*
of failure — "glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background` — fails
WCAG AA … the override darkens to `hsl(35 76% 35%)` ≈ 4.6:1". I re-derived it: the darkened token is `#9d6515`
= **4.68:1**. The project fixed a 3.54:1 amber and left a **2.51:1** amber-orange on its most persistent control.
The counterfactual is one line: `--viz-legendre` resolves to `#9541af` light (**5.51:1**) / `#ce8ee1` dark
(**7.81:1**), and the remediated `--viz-amber` gives 4.68 / 10.55. **Both token paths clear 3:1 in both themes.**

**Falsifiers (all run).** (a) *Recompute the ratio* — if `contrast(#E88845, #fbfaf9) ≥ 3.0` the row dies; it is
2.51 (WCAG relative-luminance formula, sRGB). (b) *1.4.11 exempts graphics whose "particular presentation is
essential" or that are purely decorative* — refuted by the tree: the SVG is the button's only child
(`:7-12`), it carries the state, and `AppHeader.vue:141` gives it no adjacent text. (c) *the automated gate
already covers it* — refuted: the two axe specs (`e2e/visualization-crud.spec.ts`, `e2e/visualization-ux.spec.ts`)
run axe's `color-contrast` rule, which evaluates **text nodes only** and is structurally blind to an SVG
`stroke`; and no e2e spec references this component at all (§4 D-I3). (d) *the header is translucent
(`bg-background/60` + backdrop-blur, `AppHeader.vue:54`), so the true backdrop is not `--background`* —
**partially true, and it cuts against the component**: the backdrop is *page content* seen through 60% cream,
so the ratio varies and 2.51 is the **nominal**, not the worst case. The exact worst-case backdrop is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the nominal failure is static-confirmed.

### D-B2 · BLOCKER — an *external* dark-mode flip leaves the glyph stale: the control paints the **wrong state** (purple sun / orange moon)
`DarkModeToggle.vue:58-60` `onMounted(() => morph.setShape(isDark.value ? moonShape : sunShape))` — the **only**
place the shape is bound to `isDark`. `:46-56` `strokeColor` *is* reactive to `isDark`. There is no
`watch(isDark, …)` anywhere in the file (read whole).

`isDark` is not owned by this component. `glass-ui@4.0.0`'s `useGlobalDark`
(`node_modules/@mkbabb/glass-ui/dist/useGlobalDark-C28t0VWJ.js`) is `createGlobalState(() => { let n = useDark({initialValue: a, disableTransition: false}) … })`
— vueuse `useDark`, i.e. `useColorMode` over the `vueuse-color-scheme` key with the **'auto'** default, which
tracks `usePreferredDark` reactively. So for any visitor who has **never clicked the toggle** — every
first-time visitor — an OS/browser theme change flips `isDark` *without* a click and *without* a remount
(`AppHeader.vue:141` mounts it once, no `:key`).

Result: colour follows (`:47-50` reads `isDark` in the idle branch) but the **path does not**. The control
renders a **legendre-purple sun on a dark page**, or an orange moon on a light one — a state indicator that
asserts the opposite of the truth. For a control whose entire visual vocabulary is "sun ⇒ light, moon ⇒ dark",
this is not a polish defect; it is the indicator lying.

**Falsifiers (all run).** (a) *`isDark` can only change via `toggleDark()`* — refuted by the installed
implementation quoted above (vueuse 'auto' + `usePreferredDark`); `index.html:22-32` corroborates that the app
itself treats "no stored key" as a live system-preference read. (b) *a watcher exists* — refuted; the only
`isDark` sites in the file are `:5` (aria-label), `:47-50`, `:59`, `:65-68` (read whole). (c) *something
remounts the component on theme change* — refuted: `AppHeader.vue:141` is a bare `<DarkModeToggle class="dark-mode-toggle" />`;
the app's known theme-flip reaction is a palette re-resolve via `MutationObserver` in `App.vue`
(lane-frontend.md:610), which does not touch this component. (d) *scope* — honest bound: once the user has
clicked the toggle once, `vueuse-color-scheme` holds an explicit value and the OS-flip path goes quiet for
that browser. The bug is scoped to **un-toggled sessions**, which is the default state of every new visitor.
The final "user sees a purple sun" step is **UNPROVEN-NEEDS-LIVE (SS-13)**; the reactivity graph is
static-confirmed.

---

## §2 · MAJOR

### D-M1 · MAJOR — the `prefers-reduced-motion` block is present but covers only the trivial half; the 350 ms morph is ungated
`DarkModeToggle.vue:104-108` nulls **`transition`** on `.sun-moon-toggle` — i.e. the hover `transform: scale(1.12)`
tween (`:85`). The actual animation — three phases, 350 ms, ~21 frames, each rebuilding a 512-segment path —
lives in JS: `useFourierMorph.ts:145-216` (`morphTo`), driven by `keyframes.js` `Animation` instances
(`:122-147`). `grep -n "reduced-motion\|matchMedia\|useReducedMotion\|usePreferredReducedMotion"` over
`useFourierMorph.ts`, `src/composables/`, `src/App.vue`, `src/main.ts` → **0 hits** (run; the composable was
also read whole).

The aggravator is the *false compliance signal*: a reviewer reading `:104-108` concludes the component is
PRM-safe. Lane-frontend §8 (`:619`) counts this file among the 8 CSS `reduce` blocks — the ledger records the
block, not its coverage. The M-audit reached the same conclusion from the other direction
(`raw-findings.json:1393`: "grep across … `useFourierMorph.ts` … returns no prefers-reduced-motion; meanwhile
10 components do honour it"). The producer's own 7.0.0 toggle gates *its* transforms
(`glass-ui/src/components/dark-mode-toggle/dark-mode-toggle.css:89-95`).

**Falsifier.** A global PRM kill-switch would refute this — none exists (greps above; `style.css:92-96` gates
only the tab-panel keyframe). Severity is held at MAJOR, not BLOCKER, in honesty: WCAG 2.3.3 (Animation from
Interactions) is **AAA**, and the project's own written standard is AA (`style.css:115`). It is nonetheless the
highest-value single-line a11y repair in the file.

### D-M2 · MAJOR — the motion budget is inverted: 86 % of the duration animates an 18-unit settle, 14 % carries a 56-unit identity change
`useFourierMorph.ts:59-68` `DEFAULT_MORPH_CONFIG` — `settleOutMs: 150`, `morphMs: **50**`, `settleInMs: 150`,
`lowLevel: 5`, `highLevel: 50`. `DarkModeToggle.vue:37` constructs `useFourierMorph()` with **no config**, so
these defaults are what ships.

Computed per-point displacement over the shipped 512-point arrays:

| phase | duration | share | mean point travel | max point travel |
|---|---:|---:|---:|---:|
| settle-out (sun L50→L5) | 150 ms | 43 % | **18.12 u** (3.99 CSS px) | 55.11 u |
| **morph (sun L5 → moon L5)** | **50 ms** | **14 %** | **55.62 u** (12.2 CSS px, **27.8 % of the viewBox**) | **127.47 u** (**63.7 % of the viewBox**) |
| settle-in (moon L5→L50) | 150 ms | 43 % | 4.99 u (1.10 CSS px) | 9.97 u |

50 ms is **3 frames** at 60 Hz. The identity change — the *entire point of the affordance* — is delivered at
~1 112 units/s, i.e. **9.3 % of the viewBox per frame**, while three-quarters of a second's worth of easing
budget is spent on a settle that moves points a quarter as far. The two 150 ms phases are also visually
*asymmetric* in a way the equal durations conceal: the moon converges four times faster than the sun
(settle-in mean 4.99 u vs settle-out 18.12 u), so the "resolve" reads as instant while the "dissolve" reads long.

**Falsifier.** Raise `morphMs` to ≥180 ms and mean per-frame travel drops below ~5 u/frame — that is the
prediction, and it is falsifiable by the same arithmetic. The perceptual claim ("reads as a pop, not a morph")
is **UNPROVEN-NEEDS-LIVE (SS-13)**; the geometry and the timing arithmetic are static-confirmed from
`{sun,moon}.json` + `useFourierMorph.ts:59-68`.

### D-M3 · MAJOR — the two states share neither optical centre nor optical mass, and neither is centred in its circular box
Measured from the shipped level-50 partial sums:

| shape | bbox | centre | Δ from viewBox centre (100,100) |
|---|---|---|---|
| sun | 164.44 × 158.79 | (95.53, 96.02) | −4.5, −4.0 u |
| moon | **110.90 × 138.18** | **(85.51, 105.64)** | **−14.5, +5.6 u** |

Consequences, at the 44px desktop box (0.22 CSS px per unit):
- Flipping to dark **jumps the glyph 2.2 px left and 2.1 px down** (10.02 u, 9.62 u) — a 3.0 px diagonal
  translation, **6.8 % of the control's diameter** — with nothing in the code intending it.
- The moon is **33 % narrower** and 13 % shorter than the sun; bbox area 15 324 u² vs 26 113 u² (**59 %**).
  The control's optical weight silently drops by two-fifths when the page goes dark.
- The button is a circle (`:83` `border-radius: 50%`) whose hit box, hover `scale()` origin, and
  `outline-offset: 2px` focus ring are all centred on (100,100). Against the moon, the ring is **14.5 u
  (3.2 px) off-centre from its own content** — a visible eccentricity on a 44 px ring.

**Falsifier.** (a) *A crescent is naturally smaller than a sun; the mass delta is intentional* — accepted for
the **size** half (and it is arguable design); it does not rescue the **centre** half, because nothing in the
tree centres *either* shape on the viewBox, on each other, or on the button. (b) *the raw bbox overstates the
optical centre for a crescent* — granted as a refinement; the crescent's ink is left-biased, which makes the
optical centre *further* left than 85.5, widening the delta rather than closing it. (c) Re-run: bboxes are
`min/max` over `partial_sums["50"].{x,y}` — reproducible in four lines of Python.

### D-M4 · MAJOR — `setDisableTransitions` ships in the **installed** glass-ui and is never called: the theme flip smears every transitioned property on the page
`DarkModeToggle.vue:33` `const { isDark, toggleDark } = useGlobalDark();`

The installed 4.0.0 singleton returns **five** members
(`node_modules/@mkbabb/glass-ui/dist/useGlobalDark-C28t0VWJ.js`): `{ isDark, toggleDark, disableTransitions,
setDisableTransitions, onFlipSettled }`. `toggleDark` there is *conditional*:
`if (s.value) documentElement.classList.add("no-transition"); o(); if (s.value) rAF(() => …remove…)` — the
suppression only engages when `setDisableTransitions(true)` has been called. `grep -rn "no-transition" web/src/`
→ **0 hits**. So on every theme flip, every `transition:`-bearing surface in the app (glass materials, borders,
cards, the header's own `backdrop-filter` background) cross-fades from the light palette to the dark one
simultaneously. The producer agrees this is the defect worth a public API: 7.0.0's `DarkModeToggle` exposes
`disableTransitions?: boolean` with the doc comment *"Suppress incidental page transitions during the theme
flip"* (`glass-ui/src/components/dark-mode-toggle/DarkModeToggle.vue:13-14,24,35`).

**This is a TODAY defect, not an uplift defect** — the API is in the installed tree. It also survives the
uplift unfixed unless taken.

**Falsifier.** If `no-transition` were applied by any other consumer, or if the app carried zero transitioned
properties, the row dies. Greps: `no-transition` → 0; `transition:` in `src/**` → pervasive (e.g.
`AppHeader.vue:180,211,296`). The visual severity of the smear is **UNPROVEN-NEEDS-LIVE (SS-13)**; the unused
API is static-confirmed.

### D-M5 · MAJOR — 450 KB of eagerly-imported JSON for a 44 px ornament, of which **42 %–70 % is provably unreachable**
`DarkModeToggle.vue:23-24` — `import sunData from "@/assets/fourier-paths/sun.json"` (**225 687 B**) and
`moon.json` (**224 944 B**), *static* imports in a component mounted by `AppHeader.vue:141` on **every route**.
Vite converts JSON to an ES module, so both land in the eager entry chunk (`dist/assets/index-dWFIqpKn.js`,
491 KB — the largest chunk in the build).

Reachability, computed:

| region | sun bytes | reachable? |
|---|---:|---|
| `partial_sums` L5,8,12,18,25,35,50 | 131 869 | **yes** — the only data `prepareFourierShape` (`svg-fourier.ts:76-89`) and `interpolateAtHarmonicLevel` (`:125-154`) read |
| `partial_sums` L1, L2, L3 | 56 282 | **no** — `lowLevel: 5` clamps the floor (`useFourierMorph.ts:63`, `:175` `Math.max(lowLevel, level)`) |
| `original` | 18 859 | **no** — never referenced |
| `decomposition` (50 components) | 12 900 | **no** — never referenced |
| `eval_points` | 5 635 | **no** — never referenced |

**Live bytes = 58 % of the file.** For the *moon* it is far worse: levels 18/25/35/50 are **pixel-identical** —
max per-point deviation of L18 from L50 is **0.08 u = 0.05 device px** at 44 px/dpr 3 (L25: 0.01 u; L35: 0.00 u).
Three further levels are dead ink, taking the moon's live share to roughly **30 %**. The sun, having corners,
genuinely converges slowly (L35 still differs from L50 by 10.10 u = 6.7 device px) — so the row is asymmetric,
and I state it that way rather than flattening it.

Proportion is the design charge: the app's *ornament* is its single largest eager asset, and the majority of
it can never be drawn.

**Falsifier.** If any code path read `original`/`decomposition`/`eval_points` or requested a level < 5, the row
shrinks — `grep -rn "\.original\|\.decomposition\|eval_points\|setLevel(" web/src/` shows `setLevel` exists
(`useFourierMorph.ts:98-104`) but is called only by the *morph demo*, not by this component. If the intent is
to share the assets with `FourierMorphDemo.vue` (which does import them), the payload argument survives
anyway: the demo is a lazy route, this component is not.

### D-M6 · MAJOR — input is silently dropped for 350 ms with no state affordance
`DarkModeToggle.vue:63` `if (morph.phase.value !== "idle") return;`

For the full 350 ms the button accepts pointer events, shows `cursor: pointer` (`:80`), keeps its hover
`scale(1.12)`, exposes no `aria-disabled`, no `[data-state]`, and — because the file declares **no `:active`
rule at all** — gives no press feedback either. A second click inside the window is discarded outright: a
double-tap that a user intends as "flip and flip back" leaves the theme flipped **once**. State coverage for
this control is: idle ✓, morphing ✗ (indistinguishable from idle), pressed ✗, disabled ✗, error/loading n/a.

**Falsifier.** If `handleToggle` queued or reversed the pending morph, or if the button were `:disabled`
during the window, the row dies — neither is in the file (read whole). Note the producer's toggle has no
lockout at all (`glass-ui@7 DarkModeToggle.vue:47` `@click="toggleDark"` — CSS transitions interrupt
natively), which is the shape of the fix.

---

## §3 · MINOR

### D-m1 · MINOR — no `aria-pressed`; the control violates the project's **own** DESIGN.md rule and the producer's toggle
`DarkModeToggle.vue:2-6` — the button carries only a swapping `aria-label` ("Switch to dark mode" ⇄ "Switch to
light mode"), which announces the **next action**, never the **current state**. `web/DESIGN.md` ("Local
Utilities") states the house rule for exactly this shape: *"`.basis-pill` (interactive toggle) → `<Button
variant="outline" size="sm">` + … **+ `aria-pressed` for the active state**"*. The producer's 7.0.0 toggle sets
`"aria-pressed": isDark.value` (`glass-ui/src/components/dark-mode-toggle/DarkModeToggle.vue:30`). The D-audit
booked this in 2026-05 at severity *Low* (`DA-design-A4-equation-morph-chrome.md:56`) together with a
"Toggle theme" tooltip; **it is still open**, and I raise it from *Low* because it is now the second half of a
state indicator whose first half is measurably wrong (D-B2) and measurably low-contrast (D-B1).
**Falsifier.** If the label swap alone satisfied SC 4.1.2 the row dies — it does not: a swapping name is a
name, not a state, and a screen-reader user cannot query the theme without acting on it.

### D-m2 · MINOR — no `type="button"`
`:2`. Defaults to `type="submit"`. Harmless today (`grep -rn "<form" src/components/layout/ src/App.vue` → 0),
so this is conformance debt, not a live bug. The producer sets it (`glass-ui@7 …/DarkModeToggle.vue:41`).
**Falsifier.** A `<form>` ancestor would promote it; none exists.

### D-m3 · MINOR — the SVG is not `aria-hidden`
`FourierMorphSvg.vue:2-16` renders a bare `<svg>` with no `aria-hidden`/`role`. The button's `aria-label`
overrides the accessible *name*, so the practical exposure is a nameless graphics node rather than a wrong
name. The producer marks its glyph `aria-hidden="true"` (`glass-ui@7 …/DarkModeToggle.vue:49`).
**Falsifier.** If any AT surfaced the svg as content the severity rises; name computation says it will not —
hence MINOR, not MAJOR.

### D-m4 · MINOR — hard-coded motion where the installed design system ships the exact tokens
`:85` `transition: transform 200ms ease`. The installed glass-ui defines `--duration-fast: 0.2s`
(`src/styles/tokens/scheme-motion.css:67`) and `--ease-standard` (`:216`, bridged at
`theme/bridges.css:325`) — the *same* 200 ms, off-vocabulary. The producer's own toggle writes
`transition: opacity var(--duration-fast) var(--ease-standard), …`
(`glass-ui@7 …/dark-mode-toggle.css:18-21`).
**Falsifier.** If the tokens were absent at 4.0.0 the row would be uplift-only; they are present (greps above),
so it is a today-defect.

### D-m5 · MINOR — one-site focus-ring dialect: `var(--color-ring)` (a Tailwind bridge alias) where the app uses `var(--ring)` and the producer uses `--focus-ring-shadow`
`:99` `outline: 2px solid var(--color-ring)`. This is the **only** `--color-ring` reference in the entire
fourier tree (`grep -rn "color-ring" web/src/` → 1 hit, this line). The app's canonical ring is `var(--ring)`
(`style.css:140`, `AppHeader.vue:189`). The installed glass-ui's canonical ring is
`box-shadow: var(--focus-ring-shadow)` — 8 sites in `node_modules/@mkbabb/glass-ui/src/styles/` including its
own `dock-controls/dark-mode-toggle.css:39`.
**Falsifier — and it refutes the *obvious* version of this row.** `--color-ring` is **not** undefined: glass-ui
bridges it in an `@theme inline` block (`src/styles/theme/bridges.css:80` `--color-ring: var(--ring)`), and the
**built** stylesheet emits it (`dist/assets/index-57FkGzlZ.css` contains `--color-ring:var(--ring)`). The ring
therefore renders, at `--ring` = `#1c1917` light (**16.78:1**) / `#bab7ab` dark (**9.51:1**). The defect is
dialect drift, not breakage — severity MINOR, and see S-5.

### D-m6 · MINOR — hover scale 1.12 is the largest in the tree, on an untokenized scale register
`:91`. The house register, enumerated: 1.02 (`MorphShapePreview.vue:111`), 1.04 (`HarmonicLevelGrid.vue:244`),
1.05 (`PaperView.vue:611`, `FullscreenViewer.vue:201`), 1.08 (`AnimationControls.vue:181`), 1.10
(`GalleryCard.vue:261`), **1.12 (this file)**. Six distinct values, seven sites, no token. `web/DESIGN.md`
names the "scale-hover idiom" as house vocabulary but fixes no value.
**Falsifier.** If a `--hover-scale` token existed the row would be non-adoption; none does — so the claim is
narrower and survives: the toggle sits alone at the top of an untokenized range.

### D-m7 · MINOR — under `reduce`, the 12 % hover scale becomes an *instantaneous* jump rather than being dropped
`:104-108` sets `transition: none` but leaves `transform: scale(1.12)` (`:91`) in force. The correct reduce
treatment for a decorative magnification is removal (or reduction), not instantaneity — nulling the transition
converts a smooth 200 ms grow into a 12 % snap, which is arguably *more* motion-provocative.
**Falsifier.** If the reduce block also unset the transform the row dies; it does not (block read whole).

### D-m8 · MINOR — dead `outline: none` inside `:hover` — a latent trap on the focus ring
`:89-92`. `outline` is already `none` on the base rule, so the declaration does nothing today. It survives
only because `:focus-visible` (`:98-101`) is declared **after** `:hover` at *equal* specificity (0,2,0 +
the scoped attribute on both). Reorder the two blocks — a plausible future edit — and a keyboard-focused,
mouse-hovered button loses its ring entirely.
**Falsifier.** Compute specificity: identical; cascade order decides; `:focus-visible` is later ⇒ wins today.
The row is about fragility + dead code, and is stated as such.

### D-m9 · MINOR — the `--toggle-size` default (5rem) is a fiction
`:78` `width: var(--toggle-size, 5rem)`. The sole consumer always sets it (2.5/2.75rem, `AppHeader.vue:242,256`),
so the default has never rendered. At the mobile 18px root, 5rem is a **90 px** control — 2× the real one and
larger than the header itself. A default that no caller can sanely use is a false API contract.
**Falsifier.** A second consumer omitting the variable would make the default live —
`grep -rn "DarkModeToggle" web/src/` → exactly one consumer.

### D-m10 · MINOR — the mobile size is off the producer's size ladder
The producer's rungs are `sm` 1.75rem / `md` 2.25rem / `lg` 2.75rem (`glass-ui@4` `dock-controls/dark-mode-toggle.css:42-58`;
unchanged at 7.0.0). `AppHeader.vue:244` desktop = **2.75rem** — an exact `lg`. `:236` mobile = **2.5rem** —
between rungs, matching nothing.
**Falsifier.** If fourier declared its own size scale the ladder wouldn't bind; `web/DESIGN.md` declares token
*overrides* but no control-size scale, and the desktop value already lands on the producer's rung — evidence
the ladder is the operative register.

### D-m11 · MINOR — ink-to-box ratio 92 % against a header glyph register of 50–67 %: the toggle is optically 1.7–2.9× its neighbours
`:82` `padding: 0` + `FourierMorphSvg` at 100 %/100 % ⇒ the ink is the full path plus the 7-unit stroke
half-width: **x ∈ [6.32, 184.75] = 89 % of the viewBox wide, y ∈ [9.63, 182.42] = 86 % tall**, ~40.6 px of ink
in a 44 px box. The producer pads to a **64–67 %** glyph (`md`: 2.25rem box − 2×0.375rem = 1.5rem glyph;
`lg`: 2.75 − 2×0.5 = 1.75rem), and its comment block at `glass-ui@4 dock-controls/dark-mode-toggle.css:69-84`
is a signed post-mortem of precisely this failure mode ("the glyph filled the whole 40px box edge-to-edge,
~2.5× the nav glyphs — the user's 'too large' read"). Its neighbours in this very header:
`.nav-trigger-icon` 1.5rem (`AppHeader.vue:193-195`), `.nav-trigger-chevron` 1rem (`:206-208`), the admin
`Shield :size="14"` in a 1.75rem box = 50 % (`:138`, `:261-270`). The toggle's ink is **1.7×** the largest
neighbour and **2.9×** the Shield.
**Falsifier.** *The toggle is the signature control and is meant to dominate* — a legitimate design position,
which is why this is MINOR and not MAJOR; but the producer's own remediation note is evidence the house
answer is "route the glyph through the shared size", and the ratio is 92 % vs a documented 64–67 %.

### D-m12 · MINOR — 57 029-character path strings for a 40.6 px glyph, rebuilt every frame at 17-significant-digit precision
`svg-fourier.ts:47-74` `pointsToSvgPath` emits raw JS float `toString` (sample: `M130.36287442745794,24.890741653122753`).
Measured for the sun at L50: **57 029 chars (55.7 KB), 512 cubic segments** — ~12.6 segments per rendered CSS
pixel, ~4.2 per device pixel at dpr 3. One device pixel is **1.515 viewBox units**, so every digit past the
second decimal is below 1/150 of a pixel. Re-emitting at 2 dp yields **19 972 chars — 2.86× smaller**, with a
worst-case geometric error of 0.005 u = 1/300 device px. `currentPath` is a `computed` over `currentPoints`
(`useFourierMorph.ts:81`), so this string is rebuilt and the `d` attribute reparsed on **every** morph frame
(~21 per activation ⇒ ~1.2 MB of transient string per click).
**Falsifier.** If the paths were memoized per level the per-frame half dies — they are not; `currentPoints` is
a fresh array each tick (`:175`, `:189`, `:204`). If the SVG were rendered large elsewhere the precision half
weakens — `FourierMorphSvg`'s other consumer is `MorphShapePreview.vue:5`, a preview tile, not a poster.

### D-m13 · MINOR — the colour comment is false: `#c084fc` is **not** `VIZ_COLORS.legendre`; it is `STATIC.rainbow[4]`
`:31` `const MOON_COLOR = [192,132,252] as const; // #c084fc — matches VIZ_COLORS.legendre`.
The tree says otherwise, in three independent readings: `lib/colors.ts:80` `legendre: "#9545b8"` (the static
seed); `:93` `VIZ_COLORS.legendre = cssVarToHex("--viz-legendre")` (the live value), which resolves from the
built sheet to **`#9541af`** light / **`#ce8ee1`** dark. `#c084fc` appears in `colors.ts` exactly once —
`:15`, as the **fifth entry of `STATIC.rainbow`**. So the comment names the wrong constant, and the hard-coded
literal opts the control out of the *only* theme-aware palette the app maintains (`resolveVizColors()` is
re-run on every `.dark` flip via `App.vue`'s MutationObserver, lane-frontend.md:610). Had the comment been
true, D-B1 would not exist for the moon (5.51:1 light) and the token path would have inherited the
`--viz-amber` AA remediation for the sun.
**Falsifier.** Diff the hexes: `#c084fc` ≠ `#9545b8` ≠ `#9541af` ≠ `#ce8ee1`. Nothing in the tree makes them equal.

### D-m14 · MINOR — sRGB channel lerp collapses chroma by 37 % mid-transition
`:39-44` `lerpColor` interpolates r/g/b independently. In OKLCh the endpoints are L 0.718 / C 0.143 / h 53.1°
(sun) and L 0.722 / C 0.177 / h 305.5° (moon) — near-isoluminant, so the whole transition is a **hue+chroma**
event. The sRGB straight line dips chroma to 0.101 at t=0.5 against a 0.160 endpoint chord: a **37 % chroma
collapse** (26 % at t=0.25, 24 % at t=0.75), passing through `#d486a0` — a dusty rose that belongs to neither
state. This re-confirms M-audit **E4-F4** (`raw-findings.json:3624-3626`, *medium*) with a number the original
row asserted qualitatively. The repo *is* a value.js consumer (`package.json` `@mkbabb/value.js: ^0.13.0`,
consumed at `lib/easings.ts:9,16`), so the perceptual interpolator is already in the dependency graph.
**Falsifier.** Recompute the OKLab chroma along both paths — the dip is arithmetic. If the intent were a
deliberate desaturating "dissolve", the row becomes a design choice; nothing in the file says so, and the
comment at `:29` frames both colours as identity colours.

### D-m15 · MINOR — no `-webkit-tap-highlight-color`, unlike its sibling control in the same header
`AppHeader.vue:181` sets `-webkit-tap-highlight-color: transparent` on `.nav-trigger`; the toggle does not
(`:76-108`), so on WebKit/Blink mobile a tap paints the default translucent highlight over a control whose
entire identity is a naked stroked glyph. Inconsistent within a single 3-control header row.
**Falsifier.** WebKit clips the highlight to `border-radius`, so the artefact is a circle, not a square —
which is why this is MINOR. Whether it is visible is **UNPROVEN-NEEDS-LIVE (SS-13)**; the asymmetry with the
sibling is static-confirmed.

### D-m16 · MINOR — stale provenance comment in the read set
`useFourierMorph.ts:33-37`: *"keyframes 2.2.0 moves the value.js-bearing `Animation` engine behind the
`loadAnimationEngine()` dynamic boundary…"* — `web/package.json` pins `@mkbabb/keyframes.js: ^4.3.0`, and the
uplift target is `^6.0.0` (lane-frontend.md §5). The comment documents a two-major-versions-old rationale as
current. Prose quality on the file that owns this component's motion.
**Falsifier.** If 4.3.0 still exposed the 2.2.0 boundary the *mechanism* remains true — it does; the defect is
the version citation, which is why it is MINOR.

---

## §4 · INFO

### D-I1 · INFO — the toggle, not the type, sets the mobile header height; `min-height: 2.75rem` never binds
`AppHeader.vue:153-158` declares `min-height: 2.75rem` (49.5 px at the 18 px mobile root) with `padding: 0.5rem`.
The toggle is 2.5rem = 45 px, so the row measures **45 + 9 + 9 = 63 px** — 27 % over the declared minimum. The
next-tallest child is the logo line box (`text-2xl`, line-height 2rem = 36 px, `:225-227`). The declared bar
height is therefore decorative; the ornament governs.
**Falsifier.** If the logo's line box exceeded 45 px the toggle would not be the driver — 36 < 45.

### D-I2 · INFO — the pre-paint theme script is a hand-rolled fork of a producer helper that is installed and unused
`index.html:22-32` reimplements the dark bootstrap; glass-ui 4.0.0 exports `darkModeSyncScript()`
(`dist/dark.js`, same storage key, same media query) which additionally sets
`e.style.colorScheme = d ? "dark" : "light"`. The fork omits `color-scheme`, so UA-painted surfaces (scrollbars,
form controls) render light-scheme between first paint and hydration, when `useGlobalDark`'s
`immediate: true` watcher finally sets it (`useGlobalDark-C28t0VWJ.js`, the `colorScheme` watcher).
Adjacent to this component's initial state; the fix is not in this file.

### D-I3 · INFO — zero test coverage for the control
`web/e2e/` holds 9 specs; `grep -rn "sun-moon\|Switch to light\|Switch to dark"` over them → **0 hits**. The
two `@axe-core/playwright` specs (`visualization-crud`, `visualization-ux`) never exercise the header toggle,
and axe's contrast rule could not see D-B1 anyway (text-only). Census records **vitest ABSENT** for the
frontend (§3a). Every row above is therefore un-gated in CI.

### D-I4 · INFO — first paint renders an empty button (bounded)
`useFourierMorph.ts:80` initialises `currentPoints` to `[]`; `pointsToSvgPath` returns `""` for `< 2` points
(`svg-fourier.ts:51`). The shape is bound in `onMounted` (`:55-57`), which Vue runs after DOM insertion and
(in the normal, non-suspended path) before the browser paints — so no flash is expected. Filed as INFO, not a
defect, because the only exposure is a slow/suspended mount. **UNPROVEN-NEEDS-LIVE (SS-13).**

### D-I5 · INFO — uplift disposition for this file: **reconcile, do not replace**; and its glass seam is one of the few in the header that does *not* break
Census §3a (`:95`) and lane-frontend §4 (`:419-421`) classify it **CHARACTERFUL SHADOW — keep, reconcile**. I
concur and sharpen with the break-surface reading:
- **Survives 4→7 untouched:** `./dark` is **not** in the removed-subpath list (lane-frontend §5) and
  `useGlobalDark`'s shape is a superset at 7.0.0 — this component's only glass import is uplift-safe. Its
  neighbour in the same file loses `./hover-card` (`AppHeader.vue:20`).
- **New collision at 7.0.0:** `./dark-mode-toggle` joins the **ADDED (14)** list, so the local name becomes a
  producer name. Reconcile the *contract*, not the *shape*: adopt `type="button"`, `aria-pressed`,
  `aria-hidden` on the glyph, the `sm/md/lg/control/dock` size ladder, `--duration-fast`/`--ease-standard`,
  `--focus-ring-shadow`, and the `disableTransitions` prop (D-M4) — keeping the Fourier morph, which the
  producer's rotate/translate glyph cannot express.
- **Does not touch the census break surface:** none of `metric-badge` (7 imports/6 files), `hover-card` (2),
  `hover-popover` (2), `DockIconButton` (2), `DockDropdownTrigger` (1), `ToastVariant` (the hard typecheck
  break) is imported here. `lucide-vue-next → @lucide/vue` (35 sites) also misses this file — it imports no icons.
- **Is bound by the tri-package deadlock anyway:** its motion runs on `keyframes.js` `loadAnimationEngine`
  (`useFourierMorph.ts:14`), which sits inside the `glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` atomic
  transaction. D-m14's remedy (perceptual interpolation via value.js) is *cheaper after* the uplift, since
  value.js 4.0 lands as part of it — sequence it there, not before.

---

## §5 · SUPERLATIVES (L-18 both ways — each carries its falsifier)

**S-1 · The producer-composable seam is exactly right.** `:18,33` consume the `useGlobalDark` **singleton**
from `@mkbabb/glass-ui/dark` rather than re-forking `useDark` locally — which is why the app can keep one
source of truth for a global boolean across a MutationObserver, a pre-paint script and a header control.
Lane-frontend §3 credits fourier as "the deepest, cleanest consumer in the constellation"; this line is a
representative instance. *Falsifier:* a local `useDark`/`ref` would refute it —
`grep -rn "useGlobalDark\|toggleDark" web/src/` returns this file only, and it imports, not re-implements.

**S-2 · The two point arrays are index-aligned by construction — the naive lerp is provably optimal.**
`lerpPoints` (`svg-fourier.ts:94-107`) pairs index *i* of the sun with index *i* of the moon, the classic
setup for a rotational smear. I searched **all 512** rotational offsets: the best (offset 2) improves mean
pairing distance by **0.0 %** over the shipped alignment. The Python pre-computation emitted matched
parameterisations, and the runtime is right to trust them. *Falsifier:* the exhaustive search — any offset
beating 0-offset by a meaningful margin would refute it; none does.

**S-3 · No ink ever escapes the box, at any reachable level, in either state.** Despite `overflow: visible`
(`FourierMorphSvg.vue:39`) the worst-case ink including the 7-unit stroke half-width is
x ∈ [6.32, 184.75], y ∈ [9.63, 182.42] (sun) and x ∈ [23.06, 147.96], y ∈ [29.55, 181.73] (moon) — inside
0–200 at every one of the 10 levels. Hover growth is 2.64 px per side at 44 px against a 6 px flex gap
(`AppHeader.vue:136` `gap-1.5`), so the ornament cannot collide with `UserSlugBar`. *Falsifier:* Gibbs ringing
at low harmonics is the obvious way this fails — computed per level; the lowest reachable level (5) is the
tightest, not the loosest.

**S-4 · The sizing API is the right shape.** `--toggle-size` (`:78-79`) + `flex-shrink: 0` (`:86`) + a fixed
square lets the consumer re-size the control per breakpoint without touching the component
(`AppHeader.vue:242,256`) — custom-property indirection over a prop, which is the correct choice for a purely
presentational dimension. Only the *default value* is wrong (D-m9). *Falsifier:* a hard-coded size or a `size`
prop would refute; neither is present.

**S-5 · The focus treatment is complete and it actually resolves — the obvious audit finding here is wrong.**
`:94-101` implement the full `:focus{outline:none}` + `:focus-visible{outline; outline-offset}` pattern, and
the ring is *not* dead: `--color-ring` is bridged by glass-ui's `@theme inline`
(`src/styles/theme/bridges.css:80`) and **is present in the built stylesheet**, resolving to `--ring` =
`#1c1917` (**16.78:1**) / `#bab7ab` (**9.51:1**). A static reviewer greping `web/src` alone finds zero
definitions and would file a BLOCKER; the built artefact refutes it. Only the dialect is off (D-m5).
*Falsifier:* `grep -o -- "--color-ring:[^;]*" dist/assets/index-57FkGzlZ.css` → `--color-ring:var(--ring)`.

**S-6 · The concept is the best thing in the header, and the audit trail agrees.** A theme control whose
glyph is a *live Fourier reconstruction* makes the app's thesis into its chrome — the M-audit called it "the
genuinely elegant DarkModeToggle" (`findings-index.txt:287`), the D-audit "a delightful, on-brand signature
control" (`DA-design-A4…md:20`), and the A-audit retired it from the `<Button>` migration *with written
rationale* rather than by omission (`docs/tranches/A/audit/W3-button-ledger.md:66`). Three independent audits,
one verdict. Every defect above is repairable **without touching the idea** — the idea is the asset.
*Falsifier:* if the morph were decorative-only it would be ornament without function; it is the state
indicator, i.e. the concept is load-bearing.

---

## §6 · Disposition

**Repair order (design-axis, cheapest-first, none requiring the uplift):**
1. D-B2 — `watch(isDark, v => morph.setShape(v ? moonShape : sunShape))` guarded on `phase === "idle"` (one line; kills the lying indicator).
2. D-B1 — retire the two literals for `--viz-amber` / `--viz-legendre` (`colors.ts:90-96` already resolves both, theme-aware); clears 3:1 in both themes and dissolves D-m13 with it.
3. D-M1 — a `matchMedia("(prefers-reduced-motion: reduce)")` short-circuit in `morphTo` → `setShape(to)`; plus drop the hover `transform` inside the existing reduce block (D-m7).
4. D-M4 — `setDisableTransitions(true)` at setup (already installed, already free).
5. D-M6 + D-m1 + D-m2 + D-m3 — `aria-pressed`, `type="button"`, `aria-hidden`, and a visible morphing state.
6. D-M2/D-M3 — re-time (`morphMs` ≥ 180) and re-centre (translate each shape's bbox centre to (100,100) at prepare time); the only two rows needing design judgement rather than mechanical repair.
7. D-M5/D-m12 — regenerate the two assets without `original`/`decomposition`/`eval_points`/levels 1-3 (and, for the moon, above L18), and round path emission to 2 dp: ~58 % → ~30 % of the current bytes.

**Uplift note.** Nothing above waits on F.W1. This component is one of the very few header surfaces the
4→7 tri-package transaction does **not** break (D-I5) — which makes it the right place to spend design budget
*now*, and the right place to adopt the producer's contract *at* the uplift.

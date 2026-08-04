claude-opus-5[1m] (served model id)

# CHALLENGE · BasisSelector · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/BasisSelector.vue` (324 lines)
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims tagged `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Pin under audit** `@mkbabb/glass-ui` **`^4.0.0` / installed 4.0.0** (producer latest **7.0.0**). Every conformance claim is
measured against the *installed dist* (`web/node_modules/@mkbabb/glass-ui/dist/**`), not against the producer tree; the
uplift deltas are measured against `/Users/mkbabb/Programming/glass-ui` @ `e68ad98c` (7.0.0).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Three claims died to their own falsifiers
and are recorded as such (§6) — L-18 runs both ways, and so does the null result.

**Tally** 30 defects · **3 BLOCKER** · 11 MAJOR · 15 MINOR · 1 INFO · **4 superlatives**.

---

## §0 · Read-set (whole-component + every import, transitively to the paint)

| File | Why in the set |
|---|---|
| `web/src/components/visualization/BasisSelector.vue` (324) | target, read whole |
| `web/src/components/visualization/lib/basis-display.ts` (7) | `basisDisplay` — icon/label/color map |
| `web/src/lib/colors.ts` (117) | `VIZ_COLORS` reactive palette + `resolveVizColors()` |
| `web/src/components/ui/tooltip/Tooltip.vue` (38) + `index.ts` (1) | local single-component Tooltip adapter |
| glass-ui 4.0.0 dist: `components/custom/configurator/{ConfiguratorLayer,ConfiguratorRow,density}.vue.d.ts`, `useConfiguratorState-kiIlun8I.js` (compiled markup), `components/ui/button/{Button.vue.d.ts,index.d.ts}`, `button-BNDWhAZb.js` (compiled cva), `components/ui/slider/Slider.vue.d.ts`, `styles/**` (29 roots + 5 partial dirs) | the actual paint under the pin |
| `web/src/style.css` (143), `web/src/lib/defaults.ts` (33), `web/src/components/ui/SliderControl.vue` (150), `web/src/components/visualization/ContourSettings.vue` (470, sibling), `web/src/components/visualization/VisualizationView.vue` (486, call site), `web/src/components/visualization/composables/useWorkspaceLoader.ts`, `web/src/stores/workspace.ts`, `web/e2e/visualization-ux.spec.ts` | the state contract + the a11y net around the component |
| glass-ui 7.0.0 src: `components/button/{Button.vue,index.ts,styles.css}`, `components/slider/{types.ts,Slider.vue}`, `components/configurator/ConfiguratorLayer.vue`, `styles/typography/utilities.css`, `package.json#exports` | the F.W1 uplift delta |

**Corpus folded (not re-invented):** CENSUS-2026-08-03 §1/§3a/§5 + its 2026-08-03 addendum; lane-frontend §1/§2/§3/§4/§5/§8/§9;
lane-crud (no seam here); the adjudicated intake lane `lane-fourier-r3-r6.md` (38/52 TRUE). Row-level citations inline.
**Corroborated:** intake row **R3-7a** ("BasisSelector 2" of the 35 Tooltip callsites) — `grep -c "<Tooltip"` → **2** (`:124`, `:139`). Row stands.

---

## §1 · BLOCKERS

### D-B1 · "Reset to defaults" resets to a value the app does not consider default (50 vs 200) — BLOCKER
`BasisSelector.vue:73-77` declares a private `DEFAULTS = { activeBases:["fourier-epicycles"], nHarmonics: 50, nPoints: 1024 }`.
The bound state is **not** private. `VisualizationView.vue:50` gets `nHarmonics`/`nPoints` from
`useWorkspaceLoader(activeBases)`, and that composable seeds and re-seeds them from the repo's canonical constant:

```
useWorkspaceLoader.ts:18   const nHarmonics = ref(store.contourSettings?.n_harmonics ?? CONTOUR_DEFAULTS.n_harmonics);
useWorkspaceLoader.ts:67   nHarmonics.value = cs.n_harmonics ?? CONTOUR_DEFAULTS.n_harmonics;
useWorkspaceLoader.ts:84   nHarmonics.value = CONTOUR_DEFAULTS.n_harmonics;
lib/defaults.ts:7          n_harmonics: 200,
```

BasisSelector never imports `@/lib/defaults`. Consequences, all mechanical:

1. `resetDefaults()` (`:86-91`) emits `update:nHarmonics` **50** — moving the workspace *away* from its own default of 200.
   The tooltip and the `aria-label` both read "Reset to defaults" (`:124`, `:130`). The prose is false.
2. `isDefault` (`:79-84`) compares against 50, so on a **freshly loaded default workspace** (`nHarmonics === 200`) it is
   `false` → the `is-default` dimming (`:307-310`) never engages at the canonical state. The affordance's own
   "nothing to reset" signal is inverted precisely where it should fire.
3. `harmonicsModel`'s getter fallback `?? 50` (`:29`) and the `@input` clamp floor (`:165`) repeat the same wrong number.

**Falsifier (applied, survived).** *"`nHarmonics` here is a different quantity from `CONTOUR_DEFAULTS.n_harmonics`."* —
Refuted: the same ref is passed by `v-model:n-harmonics` to BasisSelector (`VisualizationView.vue:266`) **and** to
`ContourSettings` (`:260`, `:270`), and `ContourSettings.vue:119` posts it as `n_harmonics` — the identical server field
`CONTOUR_DEFAULTS.n_harmonics` defaults. One quantity, one ref, two contradictory "defaults".
**Cure shape (F.W4):** import `CONTOUR_DEFAULTS` / `ANIMATION_DEFAULTS`; delete the private `DEFAULTS`. Note
`ANIMATION_DEFAULTS.active_bases` (`defaults.ts:24`) already equals BasisSelector's basis default — the drift is
scalar-only, which is exactly why it survived review.

### D-B2 · The per-slider basis retint is a dead no-op — the whole color-coding feature does not exist — BLOCKER
`:318-323` publishes four custom properties onto `.basis-slider-track`, and `:315-317` asserts the mechanism:

```
:316  neutral defaults; we project `--track-color` onto the range fill + thumb
:319  --slider-scrub-range-bg: color-mix(in srgb, var(--track-color) 30%, transparent);
:320  --slider-scrub-range-bg-hover: …
:321  --slider-scrub-thumb-bg: var(--track-color);
:322  --slider-scrub-thumb-bg-hover: var(--track-color);
```

`--slider-scrub-*` **does not exist anywhere in the installed glass-ui 4.0.0 package** — not in the 29 stylesheet roots,
not in the 5 style partial directories, not in any emitted `.js` chunk (`grep -rl "slider-scrub" dist/` → *empty*). The
live consumer-override surface at 4.0.0 is:

```
--slider-range-bg   --slider-range-blur   --slider-range-shadow
--slider-thumb-bg   --slider-thumb-border-color   --slider-thumb-shadow   --slider-thumb-size   --slider-thumb-spring
--slider-track-bg   --slider-track-height
```
(`grep -rho "\-\-slider-[a-z-]*" dist/styles/*.css dist/glass-ui.css | sort -u`)

So **both sliders render the stock warm capsule**; `:176` (`--track-color: VIZ_COLORS.fourier`) and `:203`
(`VIZ_COLORS.chebyshev`) paint nothing. Note also that *no* hover-suffixed token exists at 4.0.0 in any spelling, so
`-bg-hover` has no receiver even after a rename — half the declared behaviour was never implementable.

**Provenance of the rot.** lane-frontend §5's WT-diff table records the in-flight M.W1a sweep as `9 × variant="glass-scrubber"
→ variant="standard"`. The sweep renamed the *variant*; the *token vocabulary* the variant used to expose was left behind.
**Blast radius (this is systemic, BasisSelector is one of six):** `BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`,
`ui/SliderControl.vue:144-148`, `morph/HarmonicLevelGrid.vue:210-213`, `morph/MorphPhaseConfig.vue:207+`,
`GlassTimeline.vue:125`, `equation/convergence/ConvergenceTimeline.vue:136`.

**CENSUS EXTENSION (not a contradiction).** lane-frontend §3's class-surface census correctly reports
`BasisSelector.vue:315` as "prose comment only" for `glass-scrubber`. That audit measured the **class** surface; the
**custom-property** surface four lines below it is *live code against dead vocabulary*. The census's "post-4.0.0 names"
verdict holds for classes and does not transfer to tokens. Recommend F.W4 add a token-vocabulary probe to the
member-scope law (addendum row X-9's sibling).
**Falsifier (applied, survived).** *"the tokens are consumed from the SFC-scoped CSS inside the JS chunks, not the CSS files."*
— Refuted by whole-package grep (all file types).
**Uplift note:** 7.0.0 keeps the *same* live names (`slider/Slider.vue:337-338, 522` → `--slider-range-bg`, `--slider-thumb-bg`),
so the cure is a rename, and it is identical pre- and post-uplift. Cheapest blocker in the set.

### D-B3 · The default-active pill's label fails WCAG 1.4.3 AA in light mode (3.84:1) — and the two axe keystones that cover this panel are disabled — BLOCKER
`:269-273` paints the pressed pill as `color: var(--pill-color)` over `background: color-mix(in srgb, var(--pill-color) 12%, transparent)`.
Resolving the real tokens (`dist/styles/tokens/color-radius.css:263-265`, `:40`) and compositing the 12% tint over
`--background` = `--neutral-0` = `hsl(40 30% 98%)`:

| pill | light: label vs tinted fill | dark |
|---|---|---|
| **fourier `oklch(0.579 0.201 30.4)`** | **3.84 : 1 — FAILS AA (4.5)** | 5.92 : 1 |
| chebyshev `oklch(0.484 0.163 265.5)` | 5.36 : 1 | 6.72 : 1 |
| legendre `oklch(0.532 0.180 317.5)` | 4.67 : 1 | 6.92 : 1 |

The failing pill is the **default-active** one (`:37` `selected = ["fourier-epicycles"]`; `:74` the same as the reset target),
so the failure is the component's resting state, not an edge case.

**Large-text exemption does not apply.** The Button base sets `text-[length:var(--control-text)]`
(`button-BNDWhAZb.js`, cva base) and `--control-text: calc(var(--type-small) * var(--ui-scale))`
(`tokens/offsets-sizing.css`); `--type-small` is a `clamp()` in the small register (`typography/scale.css:105`) and
`.basis-toggle` applies `font-medium` (500, `:259`) — neither the ≥24px nor the ≥18.66px-bold gate is met at `--ui-scale: 1`.

**Why it was never caught — the net over this exact panel is switched off.** `e2e/visualization-ux.spec.ts:113` and `:133`
are `test.fixme` — the two axe keystones ("workspace default", "ContourSettings Configurator-open") that render this
aside. Their written justification is a glass-ui `aria-hidden-focus` defect *"the app consumes the PUBLISHED
`@mkbabb/glass-ui@^2.0.0` … the fix is a glass-ui release (`inert` on the collapsed layer)"* (`:104-107`). **That fix
shipped.** The installed 4.0.0 ConfiguratorLayer emits it: `inert: !i.value || void 0` (compiled
`useConfiguratorState-kiIlun8I.js`, ConfiguratorLayer region node, alongside `aria-hidden`/`role="region"`). The booked
baseline is **stale-by-supersession** — the same disease lane-docs §2 diagnosed for the dead M.W1b `^4.1.0` gate, one
layer down. Two of the four a11y keystones are dark for a reason that expired two majors ago.
**Falsifier (applied, partially survives).** *"axe would have caught it anyway."* — Probably not: `color-mix(…, transparent)`
composites over a `glass-floating` ancestor, and axe's color-contrast rule returns **incomplete** (not a violation) when it
cannot resolve the backdrop. The *contrast number* above is token-decidable and PROVEN; whether the enabled gate would
report it is `UNPROVEN-NEEDS-LIVE (SS-13)`. Either way the fixme's stated reason is falsified.
**Precedent the team already owns:** `style.css:113-127` darkens `--viz-amber` from ≈3.54:1 to ≈4.6:1 as a
"D.W4.d axe contrast carry". The same discipline, applied to the *tinted composite* rather than plain-on-plain, catches
this. Relay to the glass BH inbox alongside the existing `--viz-amber` carry (standing relay law) — the light
`--viz-fourier` token is the producer's, the 12% tint is the consumer's.

---

## §2 · MAJOR

### D-M1 · `variant="outline"` punches an opaque page-coloured rectangle through the glass panel — and hover *removes* it (inverted hover)
Pinned cva (`button-BNDWhAZb.js`): `outline: "border border-input **bg-background** hover:bg-accent hover:text-accent-foreground …"`.
`.basis-toggle` (`:258-263`) overrides border + color but **not** background, so an inactive pill rests at opaque
`--background`. `.basis-toggle:hover` (`:264-268`) then sets `background: transparent`.
Specificity is decisive, not ambiguous: Vue's scoped compiler appends the scope attribute → `.basis-toggle[data-v-x]:hover`
= (0,3,0) beats Tailwind's `.hover\:bg-accent:hover` = (0,2,0); and at rest nothing in the scoped block touches
`background`, so `.bg-background` (0,1,0) stands.
**Net:** resting = opaque, hover = translucent. The glass shows through only while the pointer is down-range — the
inverse of every other surface in the system. `glass-ui` ships `variant="glass-wash"` (`text-foreground/70` +
`--glass-bg-resting` hover + `aria-pressed` states) as the in-panel toggle register; `outline` is the one non-glass variant
in the 13-variant set.
**Falsifier:** *"the resting opaque fill is intended contrast against the panel."* — then hover would deepen it, not delete
it; and the author's own `:265` comment ("background: transparent") is written as a *correction*, not a design.

### D-M2 · Every boundary in the pill row is under the 3:1 non-text floor (WCAG 1.4.11), and the inactive pill has no perceivable boundary at all
Computed from the same resolved tokens:

| surface | src | light | dark |
|---|---|---|---|
| resting 2px border `foreground @12%` | `:261` | **1.28 : 1** | 1.29 : 1 |
| hover border `foreground @25%` | `:265` | **1.71 : 1** | 1.95 : 1 |
| pressed border `pill-color @40%` | `:271` | **1.84–1.89 : 1** | 1.96–2.17 : 1 |

Compounded with D-M1 (fill = `--background` = the page surface), an **inactive** basis pill is a page-coloured rectangle
outlined at 1.28:1 with muted text — nothing in it clears 3:1 except the label. 1.4.11 applies squarely: the boundary *is*
the only thing identifying the control.
**Falsifier:** *"the label identifies it."* — the label identifies the *basis*, not the *affordance*; and the pressed↔unpressed
distinction (the state 1.4.11 protects) is carried by the 1.28:1↔1.84:1 border pair plus a 12% fill.

### D-M3 · Focus indicator suppressed on both numeric inputs
`.inline-number { … outline: none; … }` (`:221`) with the only focus feedback at `:225-228` — a 1px
`color-mix(--foreground 30%)` bottom border, **1.93:1** light / 2.32:1 dark, and **identical to the `:hover` rule** (they
share the selector list). So a keyboard user gets: no outline, a sub-2:1 hairline, indistinguishable from hover.
`style.css:129-143` adds `:focus-visible` rings for exactly four classes (`.sidebar-link`, `.floating-toc-item`,
`.callout-btn`, `.gallery-card`) — `.inline-number` is not among them, and the scoped `outline:none` (0,2,0) would beat a
generic global anyway. Two controls affected (`:157`, `:186`).
**Falsifier (applied, survived).** *"glass-ui restores a global input ring."* — the only global input focus rules in the pinned
dist are `.input-bar:focus-within` (`utilities/components.css`), the `.input-pill` arm inside the `forced-colors` block
(`utilities/a11y-overrides.css`), and the glass surface `:focus-visible` set (`glass/surfaces.css`) — none matches a bare
`<input class="inline-number fira-code">`.

### D-M4 · A tri-state cycler wearing a binary `aria-pressed` — and the repo already wrote the doctrine against it
`:144` `:aria-pressed="isBasisActive(key)"` is applied uniformly to all three pills, but the Fourier pill is not a toggle:
`toggleBasis` (`:94-106`) cycles **epicycles → series → off**, and only the *visible label* records which of the two "on"
states is live (`:47-51`). A screen-reader user hears "Epicycles, toggle button, pressed" → "Series, toggle button,
pressed" — the same state word for two different states, with the distinguishing information carried by a name change
that AT will not necessarily re-announce.
The tree contains the correct doctrine, written by the same author-line: `EasingPicker.vue:9-15` uses
`role="menuitemradio"` + `aria-checked` with the rationale *"aria-pressed would mislabel a radio as a toggle"*
(lane-frontend §8, "Motion / a11y hygiene already banked"). Two of the three pills here *are* binary toggles
(chebyshev/legendre, `:107-114`) — so the row mixes two control kinds under one indistinguishable presentation.
**Falsifier:** *"the changing accessible name is sufficient."* — ARIA's own guidance reserves `aria-pressed` for binary
toggles; a cycle button is a plain `button` whose name announces the *next* or *current* state, never a pressed toggle.
Additionally the row has no `role="group"` and no group name, so the cluster is an unlabeled control island inside a
panel whose two sliders *are* labeled (`ConfiguratorRow`).

### D-M5 · The colour semantics are false in both directions — basis-identity hues applied to basis-agnostic parameters
`basis-display.ts:4-6` binds `--viz-fourier` / `--viz-chebyshev` / `--viz-legendre` as **basis identity**. Forty pixels
below, `:176` tints the Harmonics slider `VIZ_COLORS.fourier` and `:203` tints the Sample-Points slider
`VIZ_COLORS.chebyshev`. Both assignments are wrong against the store:

```
stores/workspace.ts:295   computeEpicycles  n_harmonics: contourSettings.n_harmonics     (Fourier)
stores/workspace.ts:319   computeBases      max_degree:  contourSettings.n_harmonics     (Chebyshev + Legendre)
stores/workspace.ts:320   computeBases      n_points / n_eval: contourSettings.n_points
```
`n_harmonics` drives **all three** bases (it is `max_degree` for the polynomial arm), so tinting it Fourier-red asserts a
false exclusivity; `n_points` is a sampling resolution with **no** basis affiliation at all, so tinting it Chebyshev-blue
manufactures one. The same hue means "this basis" above the fold and "this unrelated scalar" below it.
**The correct idiom is already in the sibling layer.** `ContourSettings.vue:236,249,275,288,301` tints *all five* of its
parameter sliders with the single non-identity accent `VIZ_COLORS.amber`. That is the convention; BasisSelector is the
only violator.
**Falsifier:** *"the tints are decorative variety."* — refuted by `basis-display.ts` making the same three values a
semantic key, and by the sibling's disciplined single-accent choice. (Moot today under D-B2 — the tints paint nothing —
but the cure for B2 makes this ship.)

### D-M6 · Clicking Fourier reflows its two neighbours — the "uniform-width" invariant in the comment is false
`:138` is `flex flex-wrap justify-center gap-1.5`. The Fourier label cycles **"Fourier" (7) → "Epicycles" (9) → "Series" (6)**
(`:47-51`), so the pill's intrinsic width changes on every activation. `:259` floors it at `min-w-[5.5rem]` (88px), which
is a **floor, not a fixed width** — content wider than 88px (icon 1.5em + `px-3` + a 9-glyph label) overflows the floor,
so "Epicycles" is materially wider than "Series". Under `justify-center` the whole row re-centres → **both neighbouring
pills translate horizontally on every click of the middle one**, i.e. the pointer target you did not press moves under
your finger.
The comment at `:249-257` asserts the opposite: *"the 5.5 rem min-width that keeps all three pills uniform-width"*. It
cannot: the three labels are "Fourier/Epicycles/Series", "Chebyshev", "Legendre" — none of the same length, and
`min-width` never truncates.
**Falsifier:** *"88px absorbs all three states."* — dies as soon as any label's intrinsic width exceeds 88px; "Chebyshev"
at the `sm` control-text register does, and on coarse pointers (`--ui-scale: 1.5`, see D-M9) all of them do.
`UNPROVEN-NEEDS-LIVE (SS-13)`: the exact shift in px. The *direction* (non-zero) is proven by construction.

### D-M7 · The repo's own labelled-slider chassis is bypassed and hand-copied — including 25 lines of byte-identical CSS
`components/ui/SliderControl.vue` is exactly this component's need: label + inline numeric input + `<Slider variant="standard">`
+ `--track-color`, with the scalar↔array adaptation documented as its raison d'être (`SliderControl.vue:2-21, 51-56`).
CENSUS §3a blesses it: *"thin API-shape adapters, not shadows … the correct posture — keep."* BasisSelector re-rolls it:

| duplicated | BasisSelector | SliderControl |
|---|---|---|
| scalar↔array computed adapter | `:28-35` | `:53-56` |
| `.inline-number` recipe (width 2.75rem / right-align / transparent 1px bottom border / `outline:none` / `-moz-appearance:textfield` / both `::-webkit-*-spin-button` resets / the `color-mix(--foreground 30%)` hover-focus rule) | `:212-233` | `:117-138` — **byte-identical** |
| track-colour hook | `:318-323` | `:143-149` |

And the copy **regressed** the original: `SliderControl.vue:66-80` wraps the input in a `<label>`, giving a real
label↔control association; BasisSelector's copy is a bare `<input>` whose only name is `aria-label` (`:164`, `:191`) —
which matters because `ConfiguratorRow`'s own d.ts states it carries *"No a11y for/id wiring"* (4.0.0
`ConfiguratorRow.vue.d.ts`, "ConfiguratorRow vs LabeledField — recorded divergence").
Every other slider host in the visualization tree uses the adapter (`ContourSettings.vue:22`, `EquationPanel.vue`,
`equation/FunctionInput.vue`). BasisSelector is the sole bypass.
**Falsifier:** *"SliderControl can't express what BasisSelector needs."* — it takes `label/subtitle/modelValue/min/max/step/color/formatValue`;
BasisSelector needs label + min/max/step + colour. Nothing is missing. (`name="N"` would move to `subtitle`.)

### D-M8 · The Fourier glyph is hand-tuned with six magic numbers while the pinned glass-ui ships `@utility fourier-f` — and `.cm-serif` is inert
`:148` composes `class="basis-icon cm-serif font-semibold"` + `basis-icon--fourier`, and `:235-248` + `:285-292` spend
**six** hand-tuned optical constants on it (`font-size: 2.2em`, `margin: -0.35em -0.1em`, `translateY(0.06em)`, plus a
mobile triple). glass-ui 4.0.0 already ships the canonical recipe:

```
dist/styles/typography/utilities.css:77-85
@utility fourier-f { font-family: var(--font-display); font-style: italic; font-size: 1.35em;
                     line-height: 1; vertical-align: -0.05em; font-weight: 700; display: inline-block; }
```
— an ornamental-ℱ utility, in an app named *fourier-analysis*, unused. It survives verbatim at 7.0.0
(`glass-ui/src/styles/typography/utilities.css:89-97`), so adoption is uplift-neutral.

Worse, the class that is used is inert: `@utility cm-serif { font-family: var(--font-serif-math, serif); }`
(`utilities.css:65-67`) and **`--font-serif-math` is defined nowhere** — not in the pinned dist (single hit: the
consumption itself), not at 7.0.0 (`src/styles/typography/utilities.css:78`), not in fourier's tree
(`grep -rn "font-serif-math" web/src web/public` → *empty*). fourier binds its Computer Modern face to `--font-sans`
instead (`style.css:12-14`). So `.cm-serif` resolves to the **generic `serif`** family and, on any surface that had
inherited CM, actively *downgrades* the glyph.
**Consequences:** `ℱ` (U+2131) and `Tₙ`/`Pₙ` (U+2099) render in the platform default serif, whose coverage of
Letterlike-Symbols / subscript-n is not guaranteed — per-glyph fallback changes the metrics the six constants were tuned
against. Glyph-coverage half: `UNPROVEN-NEEDS-LIVE (SS-13)`. Token-resolution half: PROVEN by absence in both trees.
**Falsifier:** define `--font-serif-math` anywhere in either tree and the second half dies. Two exhaustive greps say no.

### D-M9 · The mobile-compact block is authored on the wrong axis and fights the producer's coarse-pointer scale
`:279-293` — *"Compact pills on mobile so all three fit on one line"* — keys on `@media (max-width: 639px)` (viewport
width). The producer keys comfort on **pointer coarseness**:

```
dist/styles/tokens/light-dark.css:18-21   @media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5);
                                                                            --control-floor: var(--touch-target, 2.75rem); } }
dist/styles/tokens/offsets-sizing.css     --control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));
                                          --control-text: calc(var(--type-small) * var(--ui-scale));
```
fourier overrides neither (`grep -rn "ui-coarse-scale\|--ui-scale" web/src` → *empty*), so on a phone the pills are
`max(3.375rem, 2.75rem)` = **54px tall with 1.5× text**, while this block simultaneously shrinks their padding to `px-2`,
their gap to `0.5`, their border to 1.5px and their icons to 1.25em. The two axes are orthogonal: a 620px-wide **desktop**
window (fine pointer, 36px pills) gets the compaction it does not need; a 375px **phone** gets 1.5×-scaled text that
`px-2` cannot rescue — three pills whose labels alone exceed the viewport, which then `flex-wrap` (`:138`), failing the
comment's stated goal exactly where it aims. The compaction also shrinks the tap surface on the coarse-pointer device the
producer is busy enlarging.
**Falsifier:** *"fourier retunes `--ui-coarse-scale`."* — greps clean in `src/` and `public/`.
`UNPROVEN-NEEDS-LIVE (SS-13)`: the wrap threshold in device px.

### D-M10 · UPLIFT — glass-ui 7.0.0 deletes the `variant` and `size:"icon"` axes of `Button` entirely. **This is not in the census break surface.**
Pinned API (`components/ui/button/index.d.ts`): `variant` ∈ 13 values incl. `outline`/`ghost`; `size` ∈
`default|xs|sm|lg|icon|icon-sm`. Producer 7.0.0 (`src/components/button/Button.vue:15-31`):

```
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps { emphasis?; tone?: Tone; size?; iconOnly?: boolean; loading?: boolean; … }
```
`variant` is **gone** (→ `emphasis` × `tone`), `size:"icon"`/`"icon-sm"` are **gone** (→ `iconOnly` + `size`),
`size:"default"` → `"md"`, and `buttonVariants`/`ButtonVariants` are no longer exported (`button/index.ts:1-6`).
**`outline` has no successor at all** — the emphasis ladder is primary/secondary/quiet/text; the bordered-opaque register
was retired (which independently vindicates D-M1's "wrong variant" reading).

**This file breaks on four prop values** (`:141` `variant="outline"`, `:142` `size="sm"`, `:126` `variant="ghost"`,
`:127` `size="icon"`). **Repo-wide, `@mkbabb/glass-ui/button` is the single most-used subpath at 35 occurrences**
(lane-frontend §3 subpath census) — every one of them is a prop-level migration.
**Census gap, stated plainly.** lane-frontend §5 / CENSUS §3a enumerate the break surface as *removed subpaths*
(metric-badge ×7 files, hover-card ×2, hover-popover ×2), *removed dock members* (`DockIconButton` ×2,
`DockDropdownTrigger` ×1), the definition-absent `ToastVariant`, the lucide rename ×35, and the peer floors. **Prop-axis
rewrites of surviving symbols are absent from that model** — and this one is larger than every listed row combined. The
census's own §5 risk 10 ("uplift lands with no unit-test net … an order of magnitude above the 46-line 3.1→4.0 prior-art")
is *understated*, not overstated. **F.W1 must budget a prop-level diff of every surviving subpath, not only the removed ones.**
**Falsifier:** *"7.0.0 keeps a compat alias for `variant`."* — refuted: `ButtonProps` has no `variant` member and
`index.ts` exports no `buttonVariants`; the dock precedent (`"The five legacy SFCs are DEFINITION-ABSENT — clean break,
no alias"`) is the house rule.
**Improve side (same event):** 7.0.0 adds `loading` (the missing busy state, D-m12) and defaults `type` to `"button"`
(curing D-m14).

### D-M11 · Three stacked bands where two suffice — the value floats away from its label while the header's right slot sits empty
Compiled `ConfiguratorRow` (4.0.0) is `flex flex-col gap-1.5 py-2` whose header is
`<div class="flex items-baseline justify-between gap-3">` — label + optional `name` on the left, **and an empty right
cell** (the `canReset` seat). BasisSelector instead opens the control slot with a *third* band:
`:156` / `:183` `<div class="mb-1.5 flex items-center justify-end">` holding the number input.

Result per scalar: `py-2` (8) + label (≈20) + `gap-1.5` (6) + value band (≈20) + `mb-1.5` (6) + slider (≈20) + `py-2` (8)
≈ **88px for one number**, ×2 rows, with the readout right-aligned in a band of its own directly beneath the label
row whose right end is blank — the canonical seat for a right-aligned value. The proportion reads as three unrelated
strips rather than one field. `SliderControl.vue:66-80` (D-M7) already puts label and value on **one** baseline; so does
every other slider in the aside.
**Falsifier:** *"`canReset` would inject a reset button into that right cell."* — `canReset` is not set (`:154`, `:181`),
so the cell is unconditionally empty.

---

## §3 · MINOR

| # | finding | provenance | falsifier |
|---|---|---|---|
| D-m1 | `sub="basis & resolution"` is English prose in a **token-reference** slot: the compiled layer renders `sub` as `truncate text-micro font-mono text-muted-foreground/70` and the prop doc reads *"Optional sub-label / token reference (small, monospaced)"*. Also `truncate` — at the 320px aside band the 18-char mono string can ellipsize. | `:120`; `ConfiguratorLayer.vue.d.ts`; compiled `useConfiguratorState-kiIlun8I.js`; `VisualizationView.vue:322` | Show a monospaced-prose precedent in the design system. (Sibling `ContourSettings.vue:191` does the same — systemic, so it is a producer ask, not a one-off.) Truncation itself: `UNPROVEN-NEEDS-LIVE (SS-13)`. |
| D-m2 | Asymmetric token register: Harmonics carries `name="N"`, Sample Points carries none — same layer, same row kind, two conventions. | `:154` vs `:181` | Show that no notation symbol exists for the sample count (`lib/equation/notation.ts` is the place to look). |
| D-m3 | `ConfiguratorRow`'s `description` (the helper-text seat, rendered `text-micro leading-snug text-muted-foreground/80`) is unused → the ranges **1–500** and **128–4096** are discoverable only by dragging to an end or by reading the DOM. | `:154`, `:181`; compiled row markup | Point at any other in-panel range hint. |
| D-m4 | The panel-level reset is re-rolled **byte-identically** in two consumers (template block + the 17-line `.reset-icon-btn` rule): `BasisSelector.vue:121-136 / 295-313` ≡ `ContourSettings.vue:191-204 / 387-403`. `ConfiguratorRow.canReset` + `@reset` exist but are per-row, and `ConfiguratorLayer` has **no** header-actions slot — at 4.0.0 *and still at 7.0.0*. Two consumers = the producer's own ≥2-consumer shared-chassis threshold. | both files; `ConfiguratorLayer.vue` 7.0.0 (only `<slot />`, line 188) | Find a third disposition; or the producer adds the slot (glass BH relay). |
| D-m5 | Duplicate accessible names: the number input and the Slider in each row both take `aria-label="Harmonics"` / `"Sample Points"` (`:164`+`:174`, `:191`+`:201`); and the reset's tooltip text duplicates its own `aria-label` verbatim, so AT announces "Reset to defaults, button, Reset to defaults". | `:124`,`:130`,`:164`,`:174`,`:191`,`:201` | Show that a spin-button and a slider sharing one name is disambiguated by role alone in practice. |
| D-m6 | The Slider steps by 128 while the number input accepts any integer in range → `500` enters the model as a non-step value the slider cannot represent; `:invalid` is unstyled anywhere in the file. | `:192` vs `:199` | Show reka-ui snapping model values off-step on render (it snaps on *interaction*, which is the jump this predicts). |
| D-m7 | `<div class="w-full">` (`:155`, `:182`) is redundant — the compiled row already forces `[&>*]:min-w-0 [&>*]:w-full [&>*]:flex-1` on its control wrapper. | compiled `ConfiguratorRow` | Show a case where the row's wrapper doesn't apply. |
| D-m8 | `<RotateCcw class="h-3.5 w-3.5" />` is silently overridden: the Button base ships `[&_svg:not([class*=size-])]:size-(--ui-glyph)` — `(0,2,1)` vs the utility's `(0,1,0)` — and `"h-3.5 w-3.5"` does not contain `size-`, so it misses the escape hatch it was meant to use (`size-3.5`). The icon renders at `--ui-glyph`, not 14px. Idiom survives at 7.0.0 (`button/styles.css:35` `.button > svg:not([class*="size-"])`). | `:133`; `button-BNDWhAZb.js` cva base | Show `h-3.5` winning the cascade against a `:not()`-qualified descendant selector. |
| D-m9 | `getBasisTooltip` falls back to the raw machine key (`:70` `?? key`) — a fourth `basisDisplay` entry would surface `"hermite"` as user-facing prose. `basisTooltips` and `basisDisplay` are two independently-maintained `Record<string, …>` with no type linkage. | `:63-71`; `basis-display.ts:3` | Introduce a shared key union and the row dies. |
| D-m10 | Register drift across the three tooltips: one imperative instruction ("click to cycle: epicycles → series → off") beside two bare noun phrases ("Chebyshev polynomial approximation"). Same row, same affordance class, two voices. | `:64-66` | Argue the cycler needs instruction the toggles don't — true, but then the toggles need *some* verb parity. |
| D-m11 | `@click.stop` on the reset (`:131`) is cargo: the layer trigger is a **sibling** `<button>` of the body div, not an ancestor (compiled markup), so nothing bubbles into it. The pills use bare `@click` (`:146`) — inconsistent within 20 lines. | `:131`,`:146`; compiled layer | Show an ancestor click handler. |
| D-m12 | No busy affordance during compute, although the component is mounted throughout it: `hasData = store.epicycleData \|\| store.basesData \|\| **store.computing**`. Sliders and pills stay fully live while a recompute is in flight. 7.0.0's `Button.loading` is the seat. | `VisualizationView.vue:121, 265`; `stores/workspace.ts:286-307` | Show a busy indicator elsewhere in the aside covering this panel. |
| D-m13 | The "off" state (all bases deselected — deliberately reachable, `:102-104`) has no affordance: three unpressed pills and two live sliders that now steer nothing. The comment says *"canvas handles it gracefully"*; the **panel** does not say anything. | `:93-106` | Show an empty-state hint in the canvas that is visible from the controls aside. |
| D-m14 | `type` is never passed and the pinned Button forwards `type: u.type` (undefined) into the Primitive → the native `submit` default applies. Latent (no ancestor `<form>` today), cured at 7.0.0 (`Button.vue:55` `type: nativeButton ? (props.type ?? "button") : undefined`). | `button-BNDWhAZb.js` setup; `:126-134`, `:140-150` | Wrap the panel in a form and it stops being latent. |
| D-m15 | The same range/default constants are restated **five** times: `:29-30` (getter fallback + clamp), `:33-34`, `:74-76`, `:80-81`, `:165`, `:192`. Any range change must land in all of them; D-B1 is what that drift looks like. | as cited | Point at a single source of truth — there is one (`lib/defaults.ts`), unimported. |

---

## §4 · INFO

- **D-i1 · The `:where()` mechanism claimed at `:249-257` does not exist in the file.** The comment states *"The `:where()`
  selector ensures these override the variant's `h-9 px-3` defaults without raising specificity beyond a single class."*
  There is no `:where()` anywhere in the stylesheet (`grep -c ":where(" BasisSelector.vue` → 0), and the override actually
  works through Vue's scoped attribute (`.basis-toggle[data-v-x]` = (0,2,0) > utility (0,1,0)) — the opposite of the
  stated "not raising specificity". Two further sub-claims in the same block are stale: the variant's height is
  `h-(--control-h-sm)`, not `h-9`, and its padding is `px-3` only at `size="sm"` (`px-4` at default). *Falsifier:* find one
  `:where()`. The claim about the 1px→2px border weight in the same comment is **accurate** (see §5, S-3).

---

## §5 · SUPERLATIVES (L-18 runs both ways)

- **S-1 · The `ConfiguratorLayer has no header-actions slot` comment is TRUE — and still true three majors later.**
  `:121-122` justifies the in-body reset placement. Verified at the pin (`ConfiguratorLayer.vue.d.ts` slots = `{ default }`
  only) **and** at producer 7.0.0 (`src/components/configurator/ConfiguratorLayer.vue` — one `<slot />`, line 188). A prose
  claim about a dependency that survives a 4→7 traversal is rare in this tree; it converts cleanly into a producer ask
  (D-m4) rather than a consumer fix. *Falsifier:* find a named slot in either version — there is none.
- **S-2 · Every control carries an explicit `aria-label` although the row chassis is documented not to wire one.**
  `:164`, `:174`, `:191`, `:201`, plus `:130` on the reset. `ConfiguratorRow`'s own d.ts states the divergence
  ("No a11y for/id wiring" — that is `LabeledField`'s job), so the visible row label is decorative; the author closed the
  gap by hand at all four controls, with no gap left. This is the component's strongest a11y instinct and it should be
  preserved verbatim through any F.W4 rework. *Falsifier:* an unnamed interactive control — none (the pills take their
  name from their text content).
- **S-3 · The clamp domain is consistent across all three write paths, and the variant-delta comment is accurate.**
  `1..500` at `:30`, `:165`; `128..4096` at `:34`, `:192` — no drift between the computed setter and either `@input`
  handler, which is exactly the class of bug this shape usually breeds. And `:255-256`'s claim that the toggle adds
  *"the 2 px border weight the outline variant ships at 1 px"* is verified against the pinned cva
  (`outline: "border border-input …"` = 1px). *Falsifier:* one mismatched bound or a 2px `outline` variant — neither exists.
- **S-4 · The Fourier tooltip is the only prose in the tree that states a cycling control's full state ring.**
  `:64` — *"Fourier series — click to cycle: epicycles → series → off"*. It names all three states in order, which is
  more than the canvas, the store, or the type does. The defect (D-M4) is that this is *the only* channel carrying it and
  it is hover-scoped; the prose itself is exemplary and should become the visible/AT-reachable text, not be rewritten.

---

## §6 · Claims that died to their own falsifiers (recorded, not counted)

1. **"No `prefers-reduced-motion` handling in a component with four transitions" — DEAD.** The pinned producer ships a
   blanket gate: `dist/styles/utilities/a11y-overrides.css` forces `transition-duration: 0.1s !important` and narrows
   `transition-property` to `opacity, color, background-color, border-color, box-shadow` for `*:not([data-allow-motion])`,
   plus a `[data-allow-motion]` arm that snaps spatial motion regardless ("accessibility is absolute"). The scoped
   transitions at `:223` and `:305` and the Button's `active:scale-(--scale-press-btn)` are therefore all covered without
   a local block. The component **correctly inherits** the posture. (lane-frontend §8's real reduced-motion gap is the two
   rAF clocks — `stores/animation.ts`, `ConvergencePlot.vue` — neither of which this component touches.)
2. **"Sub-44px tap targets on the reset button" — DEAD.** `Button` reflects `data-size` and the producer floors it:
   `@media (pointer: coarse) { [data-size="icon"] { min-block-size: var(--touch-target, 2.75rem); min-inline-size: … } }`
   (`utilities/a11y-overrides.css`). The pills' own coarse sizing is likewise floored by `--control-floor` — the surviving
   pill finding is the *authoring axis*, D-M9, not the target size.
3. **"The component fabricates a loading state from optional props (`?? 50` / `?? 1024`)" — DEAD as a loading defect.**
   The parent guards with `v-if="hasData"` and always binds both props (`VisualizationView.vue:265-266`), so the
   optional-prop fallbacks are defensive dead paths. They survive only as D-B1 (wrong constant) and D-m15 (restatement).
   The *busy* gap is real and separately filed (D-m12) because `hasData` includes `store.computing`.

---

## §7 · Disposition into the wave board

| finding | wave | note |
|---|---|---|
| D-B1, D-M5, D-M7, D-M11, D-m2/3/6/7/9/10/11/12/13/15, D-i1 | **F.W4** (per-component D/L/C audit) | consumer-local; no producer dependency |
| D-B2 | **F.W1 or F.W4** | rename is identical pre-/post-uplift; 6 files, not 1 — do it once, tree-wide |
| D-B3, D-M2, D-M3, D-M4 | **F.W4** + a11y sub-lane | and **un-fixme** `visualization-ux.spec.ts:113,133` first — their booked justification is cured at the pin (compiled `inert`) |
| D-M1, D-M8, D-m8, D-m14 | **F.W1** (uplift) then F.W4 | variant/utility choices that the uplift re-opens anyway |
| **D-M10** | **F.W1 — SCOPE AMENDMENT** | the census break-surface model omits prop-axis rewrites of surviving symbols; `button` alone is 35 occurrences. Re-derive the break surface as a *prop-level* diff over all 21 imported subpaths before pinning F.W1's budget |
| D-m1, D-m4, D-B3 (token half) | **glass BH inbox relay** (standing law) | `ConfiguratorLayer` header-actions slot; `sub` register for prose; light `--viz-fourier` at 4.56:1 plain / 3.84:1 under a 12% self-tint — same family as the live `--viz-amber` carry (`style.css:113-127`) |

---

*Single-file write. `/Users/mkbabb/Programming/fourier-analysis` was read-only evidence throughout; no product source in any
repo was mutated. Contrast figures computed from the pinned tokens (`dist/styles/tokens/color-radius.css:40,263-265`;
`dark-arm.css:42,113-115`) via oklch/hsl→sRGB→WCAG relative luminance; composites mixed in sRGB per the `color-mix(in srgb, …)`
declarations. Everything not derivable from the tree is marked `UNPROVEN-NEEDS-LIVE (SS-13)`.*

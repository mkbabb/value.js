claude-opus-5[1m] (served model id)

# CHALLENGE — `ConvergenceLegend.vue` · axis **D · DESIGN**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/convergence/ConvergenceLegend.vue` (97 lines; 13 lines script, 24 template, 56 style).
**Substrate.** fourier HEAD `cd26c65` (the tree the intake lane pinned — `lane-fourier-r3-r6.md` §0 "NOT STALE-AT-HEAD"). glass-ui **4.0.0 installed** (`web/node_modules/@mkbabb/glass-ui/package.json`), producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Method.** Static + source-derived only. No browser. Contrast figures are computed from the resolved token chain with WCAG 2.x relative-luminance arithmetic over sRGB alpha compositing; the script is at `scratchpad/contrast.mjs` and every input token is cited to file:line. Tailwind utility expansions were obtained by **compiling Tailwind 4.3.1 (the installed version) against glass-ui's `@theme`** — not assumed.

**Read whole:** the component; `../lib/harmonics.ts`; the sole consumer `../ConvergencePlot.vue` (410); the sibling `./ConvergenceTimeline.vue` (146); `web/src/style.css`; `web/src/lib/golden-shimmer.ts`; `web/src/lib/colors.ts` (token resolution); glass-ui 4.0.0 `dist/styles/{glass/ladder.css, glass/surfaces.css, glass/a11y-fallback.css, tokens/glass.css, tokens/color-radius.css, tokens/dark-arm.css, tokens/scheme-motion.css, theme/radius.css, theme/bridges.css, typography/scale.css}`; glass-ui 7.0.0 `src/styles/{glass/ladder.css, glass/veil.css, tokens/glass.css, theme/radius.css}`; `web/e2e/{visualization-ux,visualization-crud,visual-baseline}.spec.ts`; `web/package.json`; `value.js@4.0.0` `package.json` exports map.

**Verdict.** The component is **DEFECTIVE**. It is a beautifully small, honestly stateless file (see S-4) whose *cosmetic layer* was never finished: it picks the thinnest rung on the glass ladder for the hardest legibility problem in the application, and it ships a real cross-component interaction with no role, no focus, and no keyboard path — in a file the app's own canonical-ARIA remediation commit **edited and skipped**.

**Tally.** 19 defects — **2 BLOCKER**, 7 MAJOR, 7 MINOR, 3 INFO. **4 superlatives** (L-18 runs both ways).

---

## §0 · Resolved token chain (the arithmetic every claim below rests on)

| token | value | provenance (glass-ui 4.0.0 `dist/`) |
|---|---|---|
| `--glass-opacity-wash` | `0.30` light / `0.38` dark | `styles/tokens/glass.css:22` · `styles/tokens/dark-arm.css:196` |
| `--glass-bg-wash` | `color-mix(in srgb, var(--card) ~30%, transparent)` | `styles/tokens/glass.css:137` |
| `--glass-blur-wash-radius` | **`1px`** | `styles/tokens/glass.css:43` |
| `--glass-border-wash` | `color-mix(in srgb, var(--foreground) 11%, transparent)` | `styles/tokens/glass.css:159` |
| `--card` | `hsl(36 48% 97%)` / `hsl(24 8% 16%)` | `styles/tokens/color-radius.css:72` · `dark-arm.css:64` |
| `--background` (`--neutral-0`) | `hsl(40 30% 98%)` / `hsl(24 9% 4%)` | `color-radius.css:40,57` · `dark-arm.css:42` |
| `--foreground` | `hsl(24 10% 10%)` / `hsl(48 10% 90%)` | `color-radius.css:58` · `dark-arm.css:60` |
| `--muted-foreground` (`--neutral-5`) | `hsl(30 22% 40%)` / `hsl(34 14% 62%)` | `color-radius.css:45,85` · `dark-arm.css:47` |
| `--viz-amber` | `hsl(35 76% 35%)` / `hsl(37 73% 67%)` | **app override** `web/src/style.css:120,125` (D.W4.d) |
| `--radius` | `0.625rem` = **10px** @16px root | `styles/theme/radius.css:16` |
| `--radius-md` | `6px` | `styles/theme/radius.css:19` |
| `--font-stack-mono` → `--font-mono` | `"Fira Code", "Fira Code Fallback", "Fira Mono", monospace` | `tokens/scheme-motion.css:46` → `theme/bridges.css:70` |
| `--duration-fast` / `--ease-standard` | `0.2s` / `var(--motion-ease-standard)` | `tokens/scheme-motion.css:67,216` |
| `--z-content` / `--z-controls` | `10` / `20` | `tokens/scheme-motion.css:335,336` |
| `--spacing` | `0.25rem` (**rem**, not px) | Tailwind 4.3.1 `@theme` — compiled, see below |

**Compiled utility expansions** (Tailwind 4.3.1 compile API against glass's `@theme`; not assumed):

```
.top-2       { top: calc(var(--spacing) * 2); }        → 0.5rem
.right-2     { right: calc(var(--spacing) * 2); }      → 0.5rem
.gap-0\.5    { gap: calc(var(--spacing) * 0.5); }      → 0.125rem
.gap-2\.5    { gap: calc(var(--spacing) * 2.5); }      → 0.625rem
.px-2        { padding-inline: calc(var(--spacing) * 2); } → 0.5rem
.py-1        { padding-block: var(--spacing); }        → 0.25rem
.rounded     { border-radius: var(--radius); }         → 0.625rem = 10px   ← load-bearing
.rounded-md  { border-radius: var(--radius-md); }      → 6px
.rounded-sm  { border-radius: var(--radius-sm); }      → 4px
```

**Composite plates** (30%α light / 38%α dark `--card` over the named backdrop):

| backdrop under the legend | plate | `--muted-foreground` | `--viz-amber` |
|---|---|---:|---:|
| LIGHT · page background only | `rgb(251,250,247)` | **5.18:1** ✅ | **4.68:1** ✅ |
| LIGHT · a `spectrumColor` curve, hue 300 | `rgb(242,104,240)` | **2.07:1** ❌ | 1.87:1 ❌ |
| LIGHT · hue 171 | `rgb(105,241,220)` | 3.92:1 ❌ | 3.54:1 ❌ |
| LIGHT · hue 0 | `rgb(242,104,103)` | **1.79:1** ❌ | 1.62:1 ❌ |
| DARK · page background only | `rgb(24,21,20)` | 7.05:1 ✅ | 10.03:1 ✅ |
| DARK · hue 86 | `rgb(112,163,41)` | **1.18:1** ❌ | 1.67:1 ❌ |
| DARK · hue 171 | `rgb(43,163,144)` | 1.22:1 ❌ | 1.73:1 ❌ |

Curve colours are `spectrumColor(i, total) = hsla(h, 85%, 55%, α)` with `h = (1 − i/max(total−1,1))·300` — `../lib/harmonics.ts:82-89`.

---

## §1 · BLOCKERS

### D-1 · BLOCKER — `.glass-wash` is the wrong ladder rung; the legend's own text fails WCAG 1.4.3 by up to 2.5× over its own plot
`ConvergenceLegend.vue:17` (`class="legend-overlay glass-wash"`) · `:89` (`color: var(--muted-foreground)`) · `:90` (`font-size: 13px`)

The legend is an absolutely-positioned overlay (`:46 @apply absolute top-2 right-2`) painted **on top of a live, animated, fully-saturated Canvas2D plot**. It selects `.glass-wash` — the *thinnest* rung of glass-ui's five-tier ladder: **30%α plate** (`tokens/glass.css:22,137`) and a **1px** backdrop blur (`tokens/glass.css:43`). glass-ui's own source calls this rung out by name:

> "`.glass-wash`, which resolves `--glass-blur-wash` = `blur(1px)` — a sub-perceptual diffusion **authored for a small detail TILE**" — `dist/styles/glass/surfaces.css:170-172`
> "`.glass-wash` is sub-perceptual … neither composes an under-shadow rung" — `dist/styles/glass/ladder.css:57-58`

Seventy percent of whatever the canvas paints therefore reaches the eye directly behind 13px monospace text. The measured collapse: `--muted-foreground` falls from **5.18:1** (over the page background) to **1.79:1** over a hue-0 curve in light mode, and to **1.18:1** over a hue-86 curve in dark mode. `--viz-amber` — the token the D.W4 sweep specifically darkened to clear AA (`web/src/style.css:113-121`) — falls to **1.62:1**. Both are Level AA failures under SC 1.4.3 (4.5:1 for text below 18.66px/bold-14px; 13px regular is unambiguously "normal text").

**The overlap is geometric, not incidental.** `toScreen` maps `maxY → PAD.top` (`ConvergencePlot.vue:180-183`) and `PAD.top = 14` (`:54`). The y-range carries 8% padding (`:171 const yP = (tMaxY - tMinY) * 0.08`), so a curve at its plotted maximum lands at `y ≈ 14 + 0.069·plotH` — for the `min-height: 200px` container (`:379-382`) that is **y ≈ 25px**, squarely inside the legend band, which begins at `top-2` = 8px and runs 100+ px down. Only the *x*-coincidence is function-dependent.

**glass-ui already ships the cure, and the component opted out of it.** Two mechanisms in the installed 4.0.0 lift `--muted-foreground` to full `--foreground` on a translucent plate:
- `dist/styles/glass/ladder.css:203` — `:where(.glass-floating, .glass-overlay) { --muted-foreground: var(--foreground); }` — **unconditional**, but only for the overlay band. `.glass-wash` is excluded.
- `dist/styles/glass/ladder.css:134-152` — the `@container style(--glass-backdrop: light)` bucket **does** include `.glass-wash` and does set `--muted-foreground: var(--foreground)`. It never fires: `grep -rn "glass-backdrop" /Users/mkbabb/Programming/fourier-analysis/web/src/` → **empty**. No ancestor in fourier declares the signal, and glass's own comment records that style queries never self-match (`ladder.css:154-158`).

So the component sits in the one gap on the ladder where neither remedy reaches it. Recomputing at the `.glass-floating` rung (0.80α) recovers `--muted-foreground` to **3.82–4.76:1** *before* the unconditional `--foreground` lift, which then clears AA outright.

**Falsifier.** This claim dies if (a) the canvas never paints beneath the legend's top-right band — refuted by the deterministic `toScreen`/`PAD.top` arithmetic above; (b) `.glass-wash` resolves ≥0.8α in the shipped build — refuted by `tokens/glass.css:22,137`; (c) fourier declares `--glass-backdrop: light` on any ancestor — refuted by grep; or (d) an ancestor overrides `--muted-foreground` on the legend — no such rule exists in `web/src/style.css` or in `ConvergencePlot.vue`'s scoped block.
**UNPROVEN-NEEDS-LIVE (SS-13).** The *frequency* with which a saturated curve occupies the legend's x-band for a given input function. The worst-case ratios are token-decidable and stated above; the duty cycle is not.

---

### D-2 · BLOCKER — a real cross-component interaction with no role, no focus, no keyboard path — in the file the app's own canonical-ARIA commit edited and skipped
`ConvergenceLegend.vue:18-19, 23-24, 29-35` (three bare `<div>` interaction sites) · `:58` (`cursor-default`) · `:10-13` (the emit contract)

Each legend row is a bare `<div>` carrying `@pointerenter` / `@pointerleave` and nothing else. Enumerated, the row has: **no `role`**, **no `tabindex`**, **no `@focus`/`@blur`**, **no `@keydown`**, **no `aria-*`**, **no accessible name beyond its text node**, and — actively misleading — **`cursor: default`** (`:58 @apply … cursor-default`), which declares the surface non-interactive to sighted mouse users while it is in fact the app's primary curve-selection affordance.

The interaction is not decorative. `emit('hover', key)` lands on `onLegendEnter` (`ConvergencePlot.vue:299`), which writes `hoveredCurve` and forces a redraw; `hoveredCurve` then re-strokes the canvas at three sites — `:196-197` (original: 2.5px→3.5px, `rgba(180,180,180,0.55)`→`rgba(220,220,220,0.85)`), `:213-215` (harmonic: α0.55→α1.0, width 2.5→3.5), `:229` (sum: shimmer hover branch). This is **functionality**, and it is operable by pointer only. SC 2.1.1 Keyboard (Level A) and SC 4.1.2 Name/Role/Value (Level A).

**The provenance is the sharp part.** Commit `2e4a452` — *"feat(D.W4): design refinement — … contrast sweep + focus rings"* — states in its own message, mechanism (e):

> "`GalleryCard.vue:62-75` converts the bare `<div @click>` to `role="button" tabindex="0" :aria-label` + `@keydown.enter.space.prevent` (**the canonical ARIA pattern**)."

That same commit **modified this file** (`git show 2e4a452 --stat -- …/ConvergenceLegend.vue` → `6 +++---`, 3 insertions / 3 deletions) — the `#f0b632` → `var(--viz-amber)` colour swap only. The wave authored the app's canonical remediation for a bare-`<div>` handler and applied it to a sibling in the same transaction while leaving three instances of the same shape untouched in the file it had open.

**And nothing would have caught it.** The repo runs `@axe-core/playwright` with `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa` and a serious/critical gate (`web/e2e/visualization-ux.spec.ts:26-40`, `visualization-crud.spec.ts:83-95`) — but every one of the seven `checkA11y()` call sites targets `/visualize` or `/v/{slug}` (`visualization-ux.spec.ts:47,114,146,163,201`; `visualization-crud.spec.ts:120,165,525-529,636,659`). The `/equation` route appears **once** in the whole suite, as a screenshot slug (`visual-baseline.spec.ts:34`). The legend has zero a11y coverage.

**Falsifier.** Dies if (a) the highlight were redundant with an accessible path — it is not: the only other route to `hoveredCurve` is the canvas `@mousemove` hit-test (`ConvergencePlot.vue:280-289`), also pointer-only; (b) an ancestor supplied roles — `grep "role=\|aria-"` over `ConvergencePlot.vue` and this file → **no matches**; (c) axe covered `/equation` — refuted by the call-site enumeration above.
**Honest mitigation.** The *information* (which label goes with which n) is plain text and is read by a screen reader. What is lost to keyboard/AT users is the highlight-and-inspect affordance, and to sighted users the discoverability that `cursor-default` suppresses. That is why the severity rests on 2.1.1/4.1.2 rather than on information loss.

---

## §2 · MAJOR

### D-3 · MAJOR — two unit systems in a 53-line stylesheet, torn apart by the app's own mobile root bump
`:46-54, 58, 68, 74-75, 90` vs `web/src/style.css:40-49`

The app raises the root font size **below** 768px:

```css
html { font-size: 1.125rem; line-height: 1.75rem; }          /* style.css:41-43 */
@media (min-width: 768px) { html { font-size: 1rem; … } }     /* style.css:45-49 */
```

Tailwind's `--spacing` is `0.25rem` — **rem**, verified by compilation. So the legend's declarations split cleanly in two:

| scales with the mobile root (6) | frozen in px (8) |
|---|---|
| `top-2` / `right-2` → 8 → **9px** | `padding: 8px 12px` (`:50`) |
| `gap-0.5` → 2 → **2.25px** | `border-radius: 8px` (`:51`) |
| `gap-2.5` → 10 → **11.25px** | `min-width: 100px` (`:54`) |
| `px-2` → 8 → **9px** | `max-height: calc(100% − 16px)` (`:47`) |
| `py-1` → 4 → **4.5px** | `margin: 3px 0` (`:68`) |
| `rounded` → 10 → **11.25px** | `width/height: 10px` (`:74-75`) |
|  | `font-size: 13px` (`:90`) |
|  | `height: 1px` (`:67`) |

On the phone — the viewport where the plot is narrowest and the overlay most intrusive — every inter-element gap and row pad inflates by 12.5% while the type, the swatch, the corner, and the box padding do not. The type-to-space ratio **inverts** relative to desktop: rows get looser, glyphs stay the same, the swatch shrinks relatively against its own gutter. The `top-2` / `calc(100% − 16px)` pair also desynchronises: at 16px root the insets are a symmetric 8px top / 8px bottom; at 18px root they become **9px top / 7px bottom**. A 2px asymmetry is small, but it is *unintended and unowned* — the `16px` literal was written to mirror `top-2`, and it stops mirroring it exactly where the app changes the root.

**Falsifier.** Dies if `--spacing` were px-based (compiled output above: `calc(var(--spacing) * 2)` with `--spacing: 0.25rem`), or if the app did not bump the root below 768px (`style.css:41-49`).

### D-4 · MAJOR — nested-radius inversion: the child corner (10px) is larger than the parent corner (8px)
`:51` (`border-radius: 8px`) vs `:58` (`@apply … rounded`)

`.rounded` compiles to `border-radius: var(--radius)` — **not** a literal — and glass sets `--radius: 0.625rem` (`theme/radius.css:16`), i.e. **10px** at the desktop root. Each `.legend-entry` therefore carries a 10px corner **inside** a container with a hardcoded **8px** corner and 8px/12px padding (`:50`).

Concentric rounding requires `r_child = r_parent − padding`; here that is `8 − 8 = 0` vertically and `8 − 12 < 0` horizontally. The shipped value is `+10`. Because the hovered/`is-hovered` background (`:61-64`) is the only thing that renders the child radius, the defect surfaces exactly on interaction: the hover band's corners bulge past the plate's corner arc at the top and bottom rows. On mobile it widens — the child grows to 11.25px (rem-derived) while the parent stays at 8px (px literal), per D-3. `rounded-sm` (`--radius-sm: 4px`, `theme/radius.css:18`) is the nearest shipped rung and is what the geometry wants.

**Falsifier.** Dies if `.rounded` compiled to a literal `0.25rem` — refuted by the Tailwind 4.3.1 compile output in §0, which shows `border-radius: var(--radius)` with `--radius: 0.625rem` present in the emitted `:root`.

### D-5 · MAJOR — the sole hover indicator computes to 1.13:1, and is byte-identical to the divider
`:61-64` (`background: color-mix(in srgb, var(--foreground) 6%, transparent)`) vs `:66-70`

The row's only state feedback is a 6%-alpha foreground veil. Composited over the wash plate:

| | plate | hover band | contrast |
|---|---|---|---:|
| light | `rgb(251.3, 249.7, 247.0)` | `rgb(237.9, 236.2, 233.5)` | **1.126:1** |
| dark | `rgb(23.6, 21.5, 20.0)` | `rgb(36.1, 34.0, 32.4)` | **1.144:1** |

SC 1.4.11 asks 3:1 of a component-state indicator; this is 1.13. And the *identical* mix paints `.legend-divider` (`:69`, same `color-mix(in srgb, var(--foreground) 6%, transparent)`) — so the hovered row and the group separator render at the same ink. Hovering the legend reads not as "this row is active" but as "a hairline appeared." There is no border change, no dot ring, no weight shift, no scale — the whole affordance is one veil that measures below the threshold of a visible edge.

This matters more than it would elsewhere, because the hover is the component's *entire* purpose (D-2): the row is a control whose pressed/active state is imperceptible.

**Falsifier.** Dies if a second hover cue existed — enumerate `:61-64`: one declaration, `background`. Dies if `--foreground` were higher-contrast than measured — values cited at `color-radius.css:58` / `dark-arm.css:60`.

### D-6 · MAJOR — `rgba(180, 180, 180, 0.6)` hardcoded with no dark arm; 1.48:1; and it survived the sweep that claimed it
`:81-84`

`.legend-dot--dashed` — the sole key for the `f(x)` reference curve — is drawn as a `2px dashed` ring in a raw literal with no token, no light/dark arm, and no `color-mix`. Composited against the plate: **1.48:1 light**, 3.92:1 dark. Against the 3:1 SC 1.4.11 floor for a meaningful graphical object, the light theme fails by half. This is a swatch whose entire job is to be identifiable.

It also contradicts the honesty bar of the commit that touched this file. `2e4a452`'s message asserts: *"All 11 alpha-modifier sites drop to the un-dimmed `text-muted-foreground` token (P4.C2 §7 closed the gap on 6 missing alpha sites)."* This is an alpha-modified hardcode in one of the six files the sweep names, and it was not dropped.

The literal is not arbitrary — it mirrors the canvas paint at `ConvergencePlot.vue:195` (`rgba(180,180,180,0.55)`), so fidelity was the intent. But the canvas stroke sits on a *transparent* canvas over the page, whereas the swatch sits on a 30%α plate; and neither has a dark arm, so the same grey is asked to read on `hsl(40 30% 98%)` and `hsl(24 9% 4%)`.

Secondary rendering note: `border: 2px dashed` on a 10×10px element with `rounded-full` (`:73-75`) and Tailwind's global `box-sizing: border-box` (preflight, compiled output §0) leaves a **6px** content box and a ~31px circumference — the "dash" pattern resolves to roughly four to six specks. It reads as a dotted ring, not as the dashed line it is keying.

**Falsifier.** Dies if a dark-arm override existed for this selector — `grep -n "legend-dot--dashed"` over `web/src/` returns exactly the two lines in this file. Dies if the plate were opaque — refuted by D-1's token chain.

### D-7 · MAJOR — up to 102 rows in a ~184px scroll well, with no fade, no count, no collapse — while `./fading-scroll` sits unused in the installed package
`:47-54` · `FunctionInput.vue:184` · `ConvergencePlot.vue:35`

`nHarmonics` is user-driven with `:min="1" :max="100"` (`FunctionInput.vue:184`), and `groupTrigHarmonics(props.coefficients, props.nHarmonics)` (`ConvergencePlot.vue:35`) caps at exactly that. The legend therefore renders up to **102 rows** (Sum + f(x) + 100 harmonics).

Computed pitch: content `max(dot 10px, 13px × 1.3 = 16.9px)` + `py-1` (8px) = 24.9px, + `gap-0.5` (2px) = **~26.9px/row**. 102 rows ≈ **2 744px**, plus the divider (1 + 6px margin) and the 16px box padding ≈ **2 767px of content**. The container floor is `min-height: 200px` (`ConvergencePlot.vue:381`), so `max-height: calc(100% − 16px)` ≈ 184px, of which ~168px is content: **roughly six rows visible out of 102**.

What the user gets is `overflow-y: auto` + `scrollbar-width: thin` (`:48,52`). There is no fade edge, no "6 of 100" affordance, no amplitude-ordered top-N with a collapse, no shortening of `n=` labels. Worse, `pointer-events-auto` (`:46`) makes the well a **scroll trap** over the canvas: a wheel gesture aimed at the plot is consumed by the legend.

The design system already ships the missing affordance in the installed version: glass-ui 4.0.0 exports `./fading-scroll` (`package.json` exports map; `dist/fading-scroll.d.ts`), whose `FadingScroll` takes `axis: "x" | "y"`, `fadeStart`, `fadeEnd` (`dist/components/custom/fading-scroll/FadingScroll.vue.d.ts:1-7`) — `axis="y"` is exactly this case. It is imported zero times in fourier (`grep -rn "fading-scroll" web/src/` → empty).

**Falsifier.** Dies if `nHarmonics` were capped below ~10 (refuted: `:max="100"`), or if the container had a large intrinsic height (refuted: `min-height: 200px` at `ConvergencePlot.vue:381`, and the legend's `max-height` is expressed against it), or if `./fading-scroll` were absent from 4.0.0 (refuted by the exports map).
**UNPROVEN-NEEDS-LIVE (SS-13).** The exact rendered pitch (font metrics, `line-height: 1.3` rounding). The 100-row cap and the 184px ceiling are static facts; the ~6-visible figure is computed.

### D-8 · MAJOR — `amplitude` is handed to the component and thrown away; 100 rows carry no magnitude
`:5-8` (`harmonics: TrigHarmonic[]`) · `:37` (`n={{ h.k }}`) · `../lib/harmonics.ts:14-19`

`TrigHarmonic` carries `{ k, a_n, b_n, amplitude }` and the prop receives it whole. The legend renders `k` only. Every row is therefore typographically identical — same weight, same size, same colour, same dot diameter — ordered by `k` ascending (`harmonics.ts:47 out.sort((a,b) => a.k - b.k)`), which for a Fourier series is very nearly the *least* informative ordering: a square wave's `n=99` term and its `n=1` term look the same in this legend, though they differ in amplitude by ~99×.

The information exists and is already rendered elsewhere: the canvas tooltip shows `n = k, A = amplitude.toFixed(4)` (`ConvergencePlot.vue:265`). Even a dot diameter proportional to `√amplitude`, or a right-aligned tabular `A=` column (the sibling already establishes the idiom — `ConvergenceTimeline.vue:107-114` uses `font-variant-numeric: tabular-nums` for exactly this), would turn 100 undifferentiated rows into a readable spectrum. Aristotelian proportion is the point: the legend gives equal visual weight to unequal things.

**Falsifier.** Dies if `amplitude` were unavailable to the component (refuted: it is a field of the prop's element type, `harmonics.ts:18`) or if the canvas already encoded magnitude into the legend (refuted: `:36` passes only `spectrumColor(i, harmonics.length)`, a pure hue ramp on index).

### D-9 · MAJOR — state coverage: the empty guard hides `Sum` and `f(x)`, which are drawn unconditionally
`:17` (`v-if="harmonics.length"`) vs `ConvergencePlot.vue:105, 191-207, 228-241`

The single `v-if` gates the **entire** legend on the harmonic count — including the two rows that name curves the plot draws whether or not any harmonic survives. `ConvergencePlot.draw()` returns early only on `if (!ox.length) return;` (`:105`); it then unconditionally strokes the original `f(x)` (`:196-207`) and unconditionally strokes the sum (`:228-241`, which at `totalH = 0` is the flat DC line `lerpDc`).

Two reachable states produce **two labelled-nowhere curves**:
1. A constant or near-constant `f` — `groupTrigHarmonics` drops every `k` whose `amp > 1e-14` fails (`harmonics.ts:44`), returning `[]`.
2. `nHarmonics` at its floor of 1 with a function whose first harmonic vanishes.

There is no loading state and no error state. During `EquationView`'s async recompute the legend is simply absent and then present — it is `absolute`, so nothing reflows, but the overlay pops. A skeleton is not obviously warranted; what *is* warranted is decoupling the two reference rows from the harmonic count:

```
v-if="harmonics.length"        →  the wrapper always renders;
                                   the divider + v-for gate on harmonics.length
```

**Falsifier.** Dies if `ConvergencePlot` skipped drawing when `harmonics` is empty. It does not — enumerate the early returns in `draw()`: `:83` (missing refs), `:87` (zero rect), `:105` (`!ox.length`). None reference `totalH`.

---

## §3 · MINOR

### D-10 · MINOR — hovering the legend never yields the tooltip; the more discoverable target is the less informative one
`ConvergencePlot.vue:346` (`v-if="hoveredCurve && mousePos && tooltipHtml"`) vs `:284` / `:299`

`mousePos` is written in exactly one place — `onCanvasMove` (`:284`) — and cleared in `onCanvasLeave` (`:292`). `onLegendEnter` (`:299`) sets `hoveredCurve` and never touches it. So the KaTeX tooltip (with `A = …`, see D-8) fires for canvas hovers and **never** for legend hovers. The legend is the labelled, scannable, discoverable surface; the bare canvas curve is the one that rewards you.

**Falsifier.** Dies if `mousePos` were set anywhere else — `grep -n "mousePos" ConvergencePlot.vue` → `:31, :283, :291, :345, :349, :350`; the only writes are `:283` and `:291`.

### D-11 · MINOR — the hardcoded font stack drops the metric-matched swap face the design system ships for exactly this
`:88` (`font-family: "Fira Code", monospace`) vs `tokens/scheme-motion.css:46` + `typography/scale.css:64-72`

glass ships `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace`, bridged to `--font-mono` at `theme/bridges.css:70`. The middle rung is not decorative: `"Fira Code Fallback"` is a payload-free, `local()`-only face with `ascent-override: 99.0161%`, `descent-override: 32.2052%`, `size-adjust: 99.9837%` (`typography/scale.css:64-72`), authored — in glass's own words — to *"cover the `font-display: swap` window"* with *"the swap geometrically transparent."*

The literal stack in this file skips it. During the swap window the legend measures against generic `monospace` (platform-dependent metrics), then reflows when Fira Code lands. The legend is a narrow overlay sized by `min-width: 100px` and its content, so a metrics jump changes its width — a visible shift on a 10px-corner glass plate over the plot. The identical hardcode appears at `ConvergenceTimeline.vue:107` and `ConvergencePlot.vue:388`, so the fix is a three-site sweep to `font-family: var(--font-mono)`.

**Falsifier.** Dies if the app declared its own `"Fira Code Fallback"` — `web/public/fonts.css` declares `@font-face { font-family: "Fira Code" }` at `:65-69` and nothing named `Fallback`. Dies if glass's typography partial were not loaded — `dist/styles/typography.css:44` imports `./typography/scale.css`, and `web/src/style.css:3` imports `@mkbabb/glass-ui/styles`.

### D-12 · MINOR — untokenized transition, in the one file the A.W3.d motion sweep missed
`:59` (`transition: background 0.1s`) vs `ConvergenceTimeline.vue:118-122`

The sibling, 400 bytes away in the same directory, carries the sweep's own annotation:

```css
/* A.W3.d — named properties + canonical token, no `transition: all`. */
transition:
    color 0.15s var(--ease-standard),
    background-color 0.15s var(--ease-standard),
    border-color 0.15s var(--ease-standard);
```

The legend has: a raw `0.1s`, an implicit `linear` timing function, and the **`background` shorthand** rather than `background-color` (so `background-image`/`-position`/`-size` are enrolled in the transition list for nothing). glass ships `--duration-fast: 0.2s` and `--ease-standard` (`tokens/scheme-motion.css:67,216`), and the parent file uses `var(--ease-standard)` on its tooltip (`ConvergencePlot.vue:401`). Three of the four files in this feature are tokenized; this one is not.

**Falsifier.** Dies if `--ease-standard` were undefined at this node — it is a `:root` token (`tokens/scheme-motion.css:216`), and the same file already consumes `--z-content` from the same block (`:53`), proving the chain reaches.

### D-13 · MINOR — `border-radius: 8px` disagrees with the sibling overlay in the same container, and cannot follow a `--radius` retune
`:51` vs `ConvergencePlot.vue:387` (`@apply absolute pointer-events-none rounded-md`)

Two overlays live inside `.convergence-container`: the curve tooltip at `rounded-md` = `var(--radius-md)` = **6px**, and this legend at a hardcoded **8px**. They read as different materials at the corner. More consequentially, the tooltip tracks any future `--radius-md` retune and the legend cannot: the mismatch will *drift*, not merely persist.

The escape valve is worth naming, because it is invisible: glass's ladder lives in `@layer components` (`dist/styles/glass/ladder.css:7`) and Vue scoped styles are **unlayered**, so unlayered always wins the cascade regardless of specificity. Every px literal in this file silently outranks the design system — which is why the divergence produces no warning anywhere.

**Falsifier.** Dies if `.glass-wash` set a radius — the ladder's own header declares it *"visual only, no geometry"* (`ladder.css:10`), and the rung's five declarations (`:39-45`) are `position`, `background`, `backdrop-filter`, `border`, `box-shadow`. Radius is genuinely the consumer's to set; the defect is the literal, not the ownership.

### D-14 · MINOR — the swatch is ~2× more saturated than the curve it names
`:36` (`spectrumColor(i, harmonics.length)` — default `alpha = 1`, `harmonics.ts:84`) vs `ConvergencePlot.vue:214`

The canvas strokes a non-hovered harmonic at `spectrumColor(hi, totalH, isHov ? 1.0 : 0.55)`. The legend dot omits the third argument and gets α 1.0. At rest — the state the legend is read in — the key is nearly twice the ink of the thing it keys. (The `f(x)` swatch, by contrast, is faithful: 0.6 vs 0.55.) Defensible as a swatch-legibility choice on a 10px dot; undocumented, and it undercuts the exactness that S-1 otherwise earns.

**Falsifier.** Dies if the canvas drew harmonics at α 1.0 — refuted at `ConvergencePlot.vue:214`.

### D-15 · MINOR — four of eight spectrum swatches fail SC 1.4.11 against their own plate
`:36` · `harmonics.ts:82-89`

`spectrumColor` fixes `S = 85%, L = 55%` and sweeps hue 300→0 (`harmonics.ts:87-88`). A constant-lightness ramp against a near-constant plate means whole bands of the spectrum sit at the plate's luminance. Computed dot-vs-plate contrast, light theme, 8 harmonics:

| i | hue | vs plate |
|---:|---:|---:|
| 0 | 300 | 3.24 ✅ |
| 1 | 257 | 6.49 ✅ |
| 2 | 214 | 3.77 ✅ |
| 3 | 171 | **1.41** ❌ |
| 4 | 129 | **1.50** ❌ |
| 5 | 86 | **1.37** ❌ |
| 6 | 43 | **1.77** ❌ |
| 7 | 0 | 4.02 ✅ |

The cyan/green/lime half of the ramp is invisible as a 10px disc — and the disc is the *only* thing distinguishing one `n=` row from another. This is a generator-level defect (an OKLCH ramp at constant *perceptual* lightness, or a lightness ramp co-varying with hue, would fix all of it), but it lands on this component because this is where the ramp is rendered as a small solid object rather than a 2.5px stroke.

**Falsifier.** Dies if the swatch carried a border or ring separating it from the plate — `:72-76` declares `shrink-0 rounded-full` + `width`/`height` only. Dies if the plate were darker/lighter than measured — token chain at §0.

### D-16 · MINOR — `select-none` makes `n=7` uncopyable in a mathematics tool
`:87` (`@apply select-none`)

The container already carries `select-none` for canvas-drag suppression (`ConvergencePlot.vue:381`, `@apply w-full relative flex-1 select-none`), so the label-level repeat buys nothing and costs the ability to copy a harmonic index out of a Fourier-analysis application. The legend is the only place in the view where `n` values appear as selectable text.

**Falsifier.** Dies if the ancestor did not already suppress selection — refuted at `ConvergencePlot.vue:381`.

---

## §4 · INFO

### D-17 · INFO — no `prefers-reduced-motion` block, where the parent has one
`:59` vs `ConvergencePlot.vue:404-408`

The parent guards its tooltip animation; this file guards nothing. **I decline to call this a WCAG defect**: a 100ms background-colour fade is not motion under SC 2.3.3, and over-flagging it would be exactly the kind of claim L-18 is meant to catch. It is a consistency gap. Recorded because a future `transform`/`opacity` cue added to satisfy D-5 *will* need the block, and the file has no precedent to copy from.

Cross-reference: `lane-frontend.md:619,624` books the real reduced-motion gap in this feature — `ConvergencePlot.vue`'s rAF at `:67-69` is ungated (its `reduce` block at `:404` is CSS-only and does not stop `tick`), so the convergence animation runs at full rate under `reduce`. **That defect is the parent's, not the legend's**; I do not claim it here. The legend does not read `playing` and does not animate on the clock.

### D-18 · INFO — no list semantics; and the legend is the canvas's only description, unassociated
`:17-39` · `ConvergencePlot.vue:342-347`

Structurally the legend is a list of series and renders as flat `<div>`s: no `<ul>`/`role="list"`, so AT announces "Sum f(x) n=1 n=2 …" as loose text with no item boundaries and no count — for up to 102 items. Separately, the canvas it describes has **no `role="img"`, no `aria-label`, no fallback content, and no `aria-describedby`** (`ConvergencePlot.vue:342-347`), while this component holds the only textual description of what the canvas draws. An `id` here plus `aria-describedby` there would cost two attributes. Folded to INFO because the canvas half is the parent's defect and the list half is subsumed by D-2's remediation.

### D-19 · INFO — the layer asymmetry that makes every px literal above silent
`:45-96` (scoped, unlayered) vs `dist/styles/glass/ladder.css:7` (`@layer components`)

Vue scoped styles are emitted unlayered; glass's ladder is in `@layer components`. Unlayered wins over any layer regardless of specificity. So `.legend-overlay`'s `position: absolute` correctly beats `.glass-wash`'s `position: relative` (this is load-bearing and works) — and, by the same mechanism, every hardcoded px in D-3/D-4/D-13 outranks the design system with no diagnostic. Worth recording as the *reason* the token divergences accumulated invisibly, and as the reason a lint rule (not a review pass) is the durable fix.

---

## §5 · SUPERLATIVES — L-18 runs both ways

### S-1 · The swatch is provably the same paint as the curve, by shared code rather than by a copied palette
`:3` (`import { spectrumColor } from "../lib/harmonics"`) · `:36` · `ConvergencePlot.vue:12, 214`

Legend and canvas call the **same function from the same module** with the same `(index, total)` arguments. `grep -rn "spectrumColor" web/src/` → three sites: the definition (`harmonics.ts:82`) and the two consumers. There is no colour array, no duplicated hue formula, no per-component palette to drift. A legend whose swatches silently desynchronise from the plot is the single most common failure of this component type; this design makes it structurally impossible. The alpha divergence (D-14) is a *parameter* mismatch on a shared generator, not a colour mismatch — which is precisely the difference a good factoring buys you.

**Falsifier.** Dies if a second colour source existed for either surface — the grep above enumerates all three sites.

### S-2 · Riding the ladder class buys three accessibility escapes for free — and the sibling that hand-rolled its glass gets none of them
`:17` (`class="legend-overlay glass-wash"`) vs `ConvergenceTimeline.vue:118-125`

The component declares **no** `background`, **no** `backdrop-filter`, **no** `border`, **no** `box-shadow` — it takes the whole plate from the rung. In exchange it inherits, at zero consumer cost, glass-ui's capability overrides (`dist/styles/glass/a11y-fallback.css`):

- `@media (prefers-reduced-transparency: reduce)` → `--glass-level: 0` (`:12-14`) — the plate resolves **fully opaque** `--card`, which incidentally cures D-1 outright for those users;
- `@media (prefers-contrast: more)` → `--glass-level: 0.3` (`:33-35`) — mostly solid;
- `@media (forced-colors: active)` → `--glass-level: 0` (`:61-63`).

The sibling `.play-btn` hand-rolls `background: color-mix(in srgb, var(--background) 60%, transparent)` + `backdrop-filter: blur(8px)` (`ConvergenceTimeline.vue:122-124`) and receives **none** of the three. On a system with reduced-transparency requested, the legend goes solid and the transport button stays glass. The legend made the right structural call; it just picked the wrong rung on the right ladder (D-1).

**Falsifier.** Dies if the component painted its own background — enumerate `:45-55`: `@apply`, `max-height`, `overflow-y`, `overflow-x`, `padding`, `border-radius`, `scrollbar-width`, `z-index`, `min-width`. No paint declarations.

### S-3 · The information architecture is correctly ranked, and the obvious over-design was declined
`:17-38` (order) · `:66-70` (the hairline) · `:77-79, 93-95` (the single emphasis)

Two reference series lead; a 1px hairline separates them from the harmonic stack; the stack follows in ascending `k`. Exactly **one** element in the whole component carries emphasis — "Sum" gets `font-weight: 600`, `--viz-amber`, and a 4px glow (`:79, 94-95`) — and everything else sits in one uniform muted register. The tempting alternative (colour-code every label to match its dot) was available in one line and correctly refused: it would have produced 100 competing accents and destroyed the hierarchy. The divider at 6%α is a whisper, not a rule. That is restraint of the Aristotelian kind — the mean between an undifferentiated list and a carnival — and it is the reason the defects above are all repairable without touching the layout.

Also correct, quietly: `z-index: var(--z-content)` = 10 (`:53`) against the tooltip's `--z-controls` = 20 (`ConvergencePlot.vue:398`, `tokens/scheme-motion.css:335-336`). The overlay stack is ordered by semantic token, not by magic numbers, and the ordering is right.

**Falsifier.** Dies if a second element carried emphasis — `grep "font-weight\|--viz-amber"` over the style block: `:78, 79, 94, 95`, all on the golden pair.

### S-4 · Honestly stateless: 13 lines of script, zero refs, zero watchers, zero lifecycle
`:1-14`

Two props, two emits, one type import, one function import. `grep -E "ref\(|computed\(|watch|onMounted|onUnmounted"` over the file → **no matches**. Every pixel is a pure function of `(harmonics, hoveredCurve)`. This is why the 19 defects above are, without exception, *cosmetic-layer* and individually one-line-to-one-block fixes: there is no state machine to unpick, no derived cache to invalidate, no lifecycle to sequence. The `:key="h.k"` choice (`:30`) is also right — keying on the stable harmonic index rather than the array position means Vue reuses the correct DOM when `groupTrigHarmonics`' `amp > 1e-14` filter (`harmonics.ts:44`) changes which `k` survive.

The whole component is 97 lines and does exactly one thing. The correct disposition of this challenge is *repair*, never rewrite.

**Falsifier.** The grep above; and `defineProps`/`defineEmits` are the only two macros in the block.

---

## §6 · F.W1 tri-package uplift — what breaks, what improves

Per the census break surface [`CENSUS-2026-08-03.md:102-104`, `lane-frontend.md:466-480`]: **metric-badge, hover-card/-popover, dock members, `ToastVariant`**.

### U-1 · The component is **NOT** on the named break surface — zero glass-ui imports
`:1-14`

`grep "@mkbabb/glass-ui"` over this file → **no matches**. It imports none of `./metric-badge`, `./hover-card`, `./hover-popover`, `DockIconButton`, `DockDropdownTrigger`, or `type ToastVariant`. Its entire glass coupling is the CSS class `.glass-wash` and four custom properties (`--viz-amber`, `--muted-foreground`, `--foreground`, `--z-content`). None is renamed or removed at 7.0.0. It also imports no `lucide-vue-next` (the 35-site `@lucide/vue` rename does not reach it). **No import-level remediation is required here.**

### U-2 · 🔴 It **DOES** break — through its one and only import, transitively, on the value.js leg
`:2-3` → `../lib/harmonics.ts:5`

The legend's sole module import is `../lib/harmonics`, which opens with:

```ts
import { easeInOutSine } from "@mkbabb/value.js";   // harmonics.ts:5
```

A **bare-root** specifier. I confirmed against the producer at `/Users/mkbabb/Programming/value.js/package.json` (version `4.0.0`): the exports map has **no `"."` entry** — `hasOwnProperty('.')` → `false`. It declares exactly seven subpaths (`./color ./value ./css ./easing ./math ./transform ./quantize`), and `easeInOutSine` lives behind `./easing` (`src/subpaths/easing.ts:16`, re-exporting `src/easing.ts:22`).

So on the day `value.js 0.13 → 4.0` lands, `harmonics.ts` fails to resolve, and **`ConvergenceLegend.vue` fails to build** — despite containing no easing code, no animation, and no value.js reference of its own. The one-line cure is at `harmonics.ts:5` (`"@mkbabb/value.js"` → `"@mkbabb/value.js/easing"`), not in this file; F.W1 must not scope the fix by grepping value.js imports per *component*, or this component's failure will look unexplained.

This **confirms and sharpens** `CENSUS-2026-08-03.md:38` ("all bare-root specifiers that 4.0.0 no longer exports — latent, not live") and `lane-frontend.md:480`: I verified the absence of the root export directly in the producer's manifest rather than inferring it, and traced the blast radius to a component the lanes list as import-clean (`lane-frontend.md:136`).

### U-3 · 🟢 The uplift **materially improves** D-1 with no consumer edit — sequence accordingly
glass-ui 7.0.0 `src/styles/glass/ladder.css:161-171` · `src/styles/tokens/glass.css:85`

Two changes at 7.0.0 land directly on `.glass-wash`:

1. **The muted lift becomes unconditional for the wash rung.** `src/styles/glass/ladder.css:161-171` re-points `--muted-foreground: var(--on-glass-muted)` on a `:where()` list that now **includes `.glass-wash`**, with the source comment naming the exact failure D-1 measures: *"the page-muted ink is calibrated against the OPAQUE canvas; on a translucent plate it composites toward the lifted backdrop and its contrast collapses (**1.15-3.29:1 measured in dark**)."* My independently computed dark-mode figures (1.18–2.78:1 over curves) fall inside that band — the producer measured the same collapse from the other side.
2. **The wash blur goes 1px → 10px.** `--glass-blur-wash-radius: 10px` at 7.0.0 (`src/styles/tokens/glass.css:85`) against `1px` at 4.0.0 (`dist/styles/tokens/glass.css:43`) — a **10×** increase in backdrop diffusion, which is precisely the mechanism that damps the local contrast swing from a vivid curve passing under the text.

The plate model also moves to `@utility glass-plate` with an "earned darken" clamped by measured backdrop luminance (`src/styles/glass/veil.css:22-49`), which is the general form of the same remedy.

**Consequence for the repair plan.** Under the **old pin**, D-1 is a live blocker and the correct fix is a rung change (`glass-wash` → `glass-floating`, which today carries the unconditional lift at `dist/styles/glass/ladder.css:203`). **After F.W1**, `glass-wash` may itself be sufficient. F.W1 should therefore land the rung change *now* and **re-measure after the uplift** rather than assume either state — reverting to `wash` post-uplift is a legitimate outcome and would restore the lighter material the design clearly wanted.

**Falsifier.** Dies if the producer tree at `/Users/mkbabb/Programming/glass-ui` were not 7.0.0 — `package.json` version reads `7.0.0`. Dies if `.glass-wash` were absent from the `:where()` list — it is enumerated at `src/styles/glass/ladder.css:167`.

### U-4 · 🟡 `--radius` is stable across the hop, so D-4's inversion neither self-heals nor worsens
glass-ui 7.0.0 `src/styles/theme/radius.css:62` — `--radius: 0.625rem`, identical to 4.0.0 `dist/styles/theme/radius.css:16`.

`.rounded` stays at 10px and the hardcoded parent stays at 8px. Likewise `--font-stack-mono` is byte-identical at 7.0.0 (`src/styles/tokens/scheme-motion.css:52`), so D-11 is unchanged by the hop. Both remain consumer-side fixes; the uplift is neutral on them.

---

## §7 · Repair order (for F.W4's per-component D/L/C ledger)

1. **D-2** — `role="button"` + `tabindex="0"` + `@focus`/`@blur` mirroring the pointer handlers + `:focus-visible` ring (the app's canonical ring recipe is already global at `web/src/style.css:138-144`) + `role="list"`/`listitem`, and add `/equation` to a `checkA11y()` call. This is the pattern `2e4a452` (e) already wrote for `GalleryCard.vue:62-75`; lift it verbatim.
2. **D-1** — `glass-wash` → `glass-floating`; re-measure after F.W1 (U-3).
3. **D-5 / D-6 / D-15** — one contrast pass: raise the hover veil to a token that measures ≥3:1, give `.legend-dot--dashed` a `--muted-foreground`-derived arm, and either ring the spectrum dots or move `spectrumColor` off constant-L HSL.
4. **D-3 / D-4 / D-13** — one unit pass: every px literal to the corresponding rem/token; `rounded` → `rounded-sm`.
5. **D-7 / D-8** — `FadingScroll axis="y"` (already installed) + an amplitude encoding; these are the two changes that make a 100-harmonic legend usable rather than merely present.
6. **D-9** — decouple the two reference rows from `harmonics.length`.
7. **D-10 / D-11 / D-12 / D-14 / D-16** — one-liners.
8. **U-2** — must be sequenced *into* F.W1, not into this component's repair.

---

**Provenance note (L-18).** Every contrast figure in this file is computed, not observed; the arithmetic is reproducible from the tokens cited in §0 and the script at `scratchpad/contrast.mjs`. Every Tailwind expansion is compiled against the installed toolchain, not recalled. The two claims that require a live browser to close are marked **UNPROVEN-NEEDS-LIVE (SS-13)** at D-1 (duty cycle of curve-under-legend occlusion) and D-7 (rendered row pitch). Nothing else in this challenge depends on a rendering I did not derive from source.

claude-opus-5[1m]

# Challenge · `EasingTarget.vue` · axis **D — DESIGN**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingTarget.vue` (335 lines) + `EasingTarget.css` (193 lines)
**Mode** static, read-only, source-derived. No browser tooling; no dev server; no installs. Two offline probes executed against **already-installed** packages (`node -e` importing `node_modules/@mkbabb/value.js/dist/subpaths/easing.js` to sample the easing registry; a `@import`-closure walker over `node_modules/@mkbabb/glass-ui/dist/styles/index.css`). No file in keyframes.js or glass-ui was written or mutated.
**Read whole** the component; `EasingTarget.css`; `easingKeys.ts`; `useEasingDemo.ts`; `CopyButton.vue`; `timingCurveUtils.ts`; `easingGroups.ts`; `animationDescriptions.ts`; `demo/styles/style.css`; `demo/styles/design-idioms.css`; and the installed glass-ui 7.0.0 sources for `Chip`, `ToggleGroup`, `FadingScroll`, `glass-chip.css`, `accent-tone.css`, `glass-capsule.css`, `toggle-group/styles.css`, `typography/utilities.css`, `tokens/*`.
**Priors folded** `lane-frontend.md` (F-1 phantom dep; S-1…S-8 shadow census; §6.3 flat-token hazard; §6.5 PRM census) — cited inline. `lane-library.md` (§0 counts) — cited once. **Contradiction to the corpus is stated explicitly at D-1 and at the §Corpus note.**
**Posture** the component is assumed defective until the tree proves otherwise; every claim below carries its falsifier, and three candidate findings were **killed by their own falsifiers** before publication (recorded in §Killed).

---

## 0. Verdict

| severity | count |
|---|--:|
| **BLOCKER** | **2** |
| MAJOR | 8 |
| MINOR | 14 |
| INFO | 2 |
| **defects total** | **26** |
| superlatives (L-18) | 8 |

The scene's *concept* is the strongest thing in the keyframes.js demo — a comparative specimen drawer under one clock is the right pedagogy, and the imperative-painter seam that delivers it is genuinely well built (§Superlatives). The *rendering* of that concept is broken at the cascade: the two glass-ui primitives it composes ship stylesheets the demo never loads, so the selected state has almost no visual carrier and 33 cells render as 9999px lozenges. Underneath that sits an independent WCAG 1.4.11 failure on the one graphic the component exists to show.

---

## 1. BLOCKERS

### D-1 · BLOCKER · The glass-ui stylesheets for `Chip` and `ToggleGroup` are outside the cascade the demo loads

**Claim.** `EasingTarget.vue:83–118` renders 33 `<Chip mode="selectable" shape="cell">` and `:56–63` renders 10 `<ToggleGroupItem>`. Neither component's CSS ever reaches the page. The demo's only glass-ui style entry is `@mkbabb/glass-ui/styles` (`demo/styles/style.css:3`) → `dist/styles/index.css`, whose transitive `@import` closure is **108 files** and contains **neither** `dist/styles/glass/glass-chip.css` **nor** `dist/components/toggle-group/styles.css`. `glass.css` pulls 18 `glass/*.css` siblings; `glass-chip.css` is not among them. No other glass-ui CSS is imported anywhere in `demo/` (`grep -rn "glass-ui.*\.css\|glass-ui/styles" demo/` → `style.css:3`, `style.css:9` only), and the subpath JS entries (`dist/chip.js`, `dist/chip-6ysLmScu.js`, `dist/toggle-group.js`, `dist/toggle-group-BWHkiLdP.js`) carry **no CSS side-effect import** — their import lists are `class-names`, `useAccentTone`/`createContext`, `vue`, `reka-ui`.

**Provenance.** `demo/styles/style.css:3` · `node_modules/@mkbabb/glass-ui/dist/styles/index.css:1` (38 `@import`s; `@source "../*.js"`) · `dist/styles/glass.css:1` (18 glass imports, no chip) · `dist/styles/glass/glass-chip.css:1` · `dist/components/toggle-group/styles.css:1` · `dist/chip-6ysLmScu.js:1–3` · `dist/toggle-group-BWHkiLdP.js:1–3`.

**What is actually lost.** Tailwind *utility* classes on both components survive (glass-ui's `@source "../*.js"` in `styles/index.css:1` globs `dist/*.js`, so `flex-col`, `px-2`, `gap-1.5`, `text-micro`, `inline-flex` are generated). What dies is every *component* rule:

| lost rule | file:line | design consequence |
|---|---|---|
| `.glass-chip[data-mode="selectable"][data-state="on"] { background-color: var(--accent-band); border-color: var(--accent-edge); color: var(--accent-ink) }` | `glass-chip.css:1` | **the selected specimen gets no wash, no edge, no ink.** `EasingTarget.css:169–172` asserts "ToggleChip's `data-state="on"` carries the glass wash (primary 15% = the violet authority)" — against the shipped cascade that sentence is false. Selection is carried only by the two demo rules at `EasingTarget.css:173–180` (a stroke tint + a name colour) |
| `.glass-chip--cell { border-radius: var(--radius-card) }` | `glass-chip.css:1` | `.glass-capsule` **is** loaded (`glass.css` → `glass/glass-capsule.css`) and sets `border-radius: var(--radius-pill)` = **9999px**. With the cell override missing, 33 ≈150×104 px specimens render as **stadium lozenges**, not cells. At the ~104 px tile height the corner radius clips ≈22.8 px in from each edge at the sparkline's endpoint height (r=52; 52−√(52²−43²)) — under `content-visibility: auto`'s paint containment that curvature is a real clip, not just a background shape |
| `.glass-chip { background-image: linear-gradient(var(--glass-fill-tinted), …) }`, `::after` accent flood, `--chip-tint-floor` | `glass-chip.css:1` | the tile has no tinted plate and no selection flood |
| `.toggle-group[data-type="single"] { padding: .25rem; border-radius: …; background: var(--glass-bg-quiet); box-shadow: rim+recess }` | `toggle-group/styles.css:1` | the family filter has **no track**. `EasingTarget.css:80–81` calls it "caption-rung text pills"; there are no pills |
| `.toggle-group__item { min-inline-size/min-block-size: var(--control-h-md); padding-inline: .75rem; font-size: var(--control-text); border-radius: pill; color: var(--muted-foreground) }` and `[data-size="sm"]` | `toggle-group/styles.css:1` | `size="sm"` (`EasingTarget.vue:60`) selects a variant whose entire declaration block is absent → bare `<button>`s at inherited size. See **D-10** |
| `.toggle-group__item[data-state="on"] { background: var(--accent); color: var(--accent-foreground); border-color: … }` | `toggle-group/styles.css:1` | **the active family filter has no pressed appearance.** The one always-in-force filter (`EasingTarget.vue:165–169` guarantees exactly one) is visually indistinguishable from the nine inactive ones |
| `@media (forced-colors: active) { … Highlight/HighlightText … }` | `toggle-group/styles.css:1` | the filter's forced-colors provision never loads (see D-18) |
| `@media (pointer: coarse) { .glass-chip--interactive { min-*: 2.75rem } }`, `@media (prefers-contrast: more) { … border-color: foreground 28% }` | `glass-chip.css:1` | touch floor + high-contrast provisions never load |

**Falsifier.** Any one of: (a) an `@import` chain from `styles/index.css` reaching `glass/glass-chip.css` or `components/toggle-group/styles.css` that my closure walker missed (it follows `@import "…"` only — a `@import url(…)`, a layer-qualified `@import`, or a JS-side `import "./x.css"` inside a *nested* chunk would evade it); (b) a build step in `demo/vite.config.ts` or `demo/app/main.ts` that injects `dist/glass-ui.css` (70 109 bytes, which *does* contain both rule sets) — `grep` found none; (c) glass-ui resolving `./styles` to something other than `./dist/styles/index.css` — its `exports["./styles"]` is exactly that string.

**Contradiction to the corpus.** `lane-frontend.md` §3.2 lists this file's two glass-ui imports (lines 125–126) and §0 F-6 concludes "the glass-ui boundary is otherwise **clean** (GREEN)". At the *import* layer that holds; at the *cascade* layer it does not. This is a second wiring break of the same shape as **F-1** (declared-vs-installed), one layer down: **imported-vs-styled**. F-1 must be fixed first (it is a prerequisite for any lockfile-reproducible fix here), but F-1's remedy — declaring `@mkbabb/glass-ui: 7.0.0` — does **not** fix D-1.

---

### D-2 · BLOCKER · The sparkline — the component's declared pedagogy — sits at 1.59 : 1, against the 3 : 1 non-text floor

**Claim.** `EasingTarget.css:127–133` strokes every specimen portrait at `color-mix(in srgb, var(--foreground) 22%, transparent)`. The portrait is not decoration: `EasingTarget.vue:8–10` calls the sparkline the curve's "portrait" and `:69–75` calls it the "comparative read [that] IS the pedagogy", and `:263–267` makes it the *sole* preview under `prefers-reduced-motion`. WCAG 2.2 SC 1.4.11 requires **3 : 1** for "graphical objects required to understand the content". Computed from the shipped tokens:

| element | colour | composite over `--card` | Y (rel. lum.) | contrast |
|---|---|---|--:|--:|
| substrate `--card` (light) | `hsl(30 85% 96%)` → `rgb(253.5, 244.8, 236.1)` | — | 0.9222 | — |
| sparkline, unselected | `foreground 22%`, `--foreground: hsl(24 10% 10%)` → `rgb(28,25,23)` | `rgb(204,196,189)` | 0.5617 | **1.59 : 1** |
| sparkline, selected (`EasingTarget.css:173–176`) | `--ball-tone 65%`, `--ball-tone → --color-progress → --accent-kf → oklch(0.56 0.17 295)` → `rgb(126,90,204)` | `rgb(171,144,215)` | 0.3354 | **2.52 : 1** |
| origin/terminus ticks (`EasingTarget.css:142–151`) | `foreground 22%` | `rgb(204,196,189)` | 0.5617 | **1.59 : 1** |
| the racing ball (`design-idioms.css:184`, solid `--ball-tone`) | `rgb(126,90,204)` | — | 0.1602 | 4.63 : 1 ✓ |

Method: sRGB→linear per WCAG, `Y = .2126R+.7152G+.0722B`, `(Y₁+.05)/(Y₂+.05)`; `color-mix(… , transparent)` composited as α·fg+(1−α)·bg in gamma space; `--accent-kf` converted OKLCh→OKLab→LMS→linear sRGB. `--card`/`--foreground` from `dist/styles/tokens/color-radius.css:1`; `--accent-kf` from `demo/styles/style.css:130`; `--color-progress: var(--accent-kf)` at `style.css:163`; `--ball-tone: var(--color-progress)` at `EasingTarget.css:7`.

The ticks are the sharp end of it: `EasingTarget.css:136–137` states "Ticks mark the shared origin + terminus: **the departure is LEGIBLE**." A 1-px-wide, 9-px-tall mark at 1.59 : 1 is not legible; it is a rumour. And under PRM the ball stops moving entirely (`:263–267`), so the *only* remaining signal is the 1.59 : 1 stroke.

**Falsifier.** (a) The chip's own plate materially darkens the substrate — but per **D-1** `.glass-chip`'s tinted plate never loads, and `.glass-capsule`'s fill is a *floating-tier* glass mix that in light theme lands lighter, not darker, than `--card` (which would lower the ratio further, not raise it). (b) If the auditor rules the sparkline "pure decoration" — refuted by the component's own three comments above. (c) If `--card` is not the effective substrate because the Card is translucent over a dark app ground: `style.css:203–208` neutralises the glass AA darken for `.glass-quiet`/`[data-tier]` surfaces specifically to keep the plate light, so the light-theme substrate stays near `--card`. **UNPROVEN-NEEDS-LIVE:** the exact composited pixel under the FadingScroll mask + backdrop-filter; the *ordering* (1.59 ≪ 3.0) is not in doubt.

---

## 2. MAJOR

### D-3 · MAJOR · The header literal is a bezier **approximation** of a curve the scene never runs — divergence up to 0.163

`EasingTarget.vue:209–220` computes `literal`; for any name in `NAMED_EASING_BEZIER` it returns `cubicBezierToString(...demo.bezierControlPoints.value)` (`:216`), and `selectEasing` seeds those points from `NAMED_EASING_BEZIER[name]` (`useEasingDemo.ts:250–252`). But the tile's portrait **and** its racing ball use `namedEasing(name)` (`EasingTarget.vue:175–178`, `:288`), which resolves through value.js's *analytic* registry first (`value.js/dist/subpaths/easing.js:205–224`) and only falls back to the preset table. Eight of the 33 specimens are analytic. Measured max |analytic − literal| over t∈[0,1] at 201 samples (probe: `node -e` over the installed `easing.js`):

```
ease-in-out-circ  0.1629 @ t=0.48      ease-out-expo     0.0370 @ t=0.05
ease-in-out-expo  0.1339 @ t=0.51      ease-in-out-cubic 0.0247 @ t=0.26
ease-out-cubic    0.0222 @ t=0.26      ease-in-out-sine  0.0175 @ t=0.66
ease-in-out-quad  0.0192 @ t=0.45
```

0.163 of the rail is ≈20 px on a ~120 px rail: the header literal, the string the `CopyButton` (`:35–39`, label "Copy easing literal") hands the user, describes a curve visibly to the left of the ball on screen. The comment at `:208` markets the literal as "COMPLETE and re-parseable" — true about truncation, silent about identity. Note the tranche prose this scene sits under names "the dishonesty class T.B1" (`useEasingDemo.ts:279–287`) as the thing it exists to kill.
**Falsifier.** If `easing("ease-in-out-circ")` returned the preset bezier rather than the analytic `c` — the registry object at `easing.js:205–224` maps it to the analytic, and the sampled values (0.0670/0.5000/0.9330 at t=.25/.5/.75) match the analytic circ, not the preset.

### D-4 · MAJOR · Editing the bezier orphans the drawer — zero tiles pressed, and the "a curve is always selected" invariant is false

`useEasingDemo.ts:265–271`: `updateBezierPoints` (the sidebar's `EasingPicker` drag) sets `currentEasingName.value = "cubic-bezier"`. `EasingTarget.vue:158` **excludes** the `Custom` family from `SPECIMEN_GROUPS`, so `"cubic-bezier"` has no tile: `curve.name === demo.currentEasingName.value` (`:89`) is false for all 33 chips. Every tile goes `data-state="off"`; the header `<h2>` reads `cubic-bezier`; the drawer shows no selection at all. The component asserts the opposite twice — `:200–206` ("a curve is always selected") and `:166–168` ("a filter is always in force… the pressed tile IS the selected curve"). There is no empty/orphan affordance and no "Custom" tile to fall back to.
**Falsifier.** If the sidebar's `EasingPicker` never routes through `updateBezierPoints`, or if a watcher elsewhere re-seats `currentEasingName` to a named curve after a drag — no such watcher exists in `useEasingDemo.ts`; the only writers are `selectEasing` (`:246`) and `updateBezierPoints` (`:268–270`).

### D-5 · MAJOR · The pressed `steps` tile animates a different curve from the one the header names

`EasingTarget.vue:175–178`: `fnForCurve("steps")` is hardcoded `steppedEasing(4, "jump-end")`; `getCurvePath("steps")` is hardcoded `generateStepSVGPath(4)` (`timingCurveUtils.ts:78–79`) *and memoised in a module-level cache* (`:69, :88`). The header literal is `steps(${demo.stepOptions.value.steps}, …)` (`EasingTarget.vue:212`) and the sidebar edits `stepOptions`. Set steps to 8: the header says `steps(8, jump-end)`, the sidebar drives 8, and the **pressed** tile still draws and races a 4-step staircase. `:172–174` documents the choice ("the selected curve's live parameters ride the header literal… not the tile") — documenting a divergence does not remove it. The pressed tile is the drawer's selection indicator; making it show a curve the user is not editing inverts its meaning.
**Falsifier.** If `stepOptions` is not user-editable in the shipped sidebar. `useEasingDemo.ts:40–43` exposes it as a mutable ref and returns it (`:370`); `EasingSidebar.vue` is listed in `lane-frontend.md` §4 as consuming `LabeledSlider` + `EasingPicker`.

### D-6 · MAJOR · Keyboard: two unnamed roleless tab stops, 45 stops in one card, and roving focus forced off

Three separate defects in one surface:

1. **`FadingScroll` renders `tabindex="0"` unconditionally** (`dist/fading-scroll-DKsoe_vh.js`, FadingScroll setup: `tabindex: "0"` always; `role: ariaLabel||ariaLabelledby ? "region" : undefined`). `EasingTarget.vue:42` and `:76` pass **neither** `aria-label` nor `aria-labelledby` to either scroller. Result: two focusable `<div>`s with **no role and no accessible name** in the tab order (WCAG 4.1.2). The component *does* author a label — but puts it on the **non-focusable** inner `div role="group" aria-label="Easing curve specimens"` (`:80–81`). The label is one element away from the thing that receives focus, and the primitive exposes exactly the props that would fix it.
2. **45 tab stops.** 2 scrollers + 10 `ToggleGroupItem`s + 33 `Chip`s (reka `Toggle` → a real `<button aria-pressed data-state>`, per `chip-6ysLmScu.js` Chip setup, `mode==="selectable"` branch). A 33-cell single-select grid under `role="group"` with no roving tabindex means 33 Tab presses to cross one control.
3. **Roving focus is off in the filter, against reka's default.** glass-ui declares `rovingFocus: { type: Boolean }` with **no `default`** (`toggle-group-BWHkiLdP.js`, ToggleGroup props) — Vue's Boolean casting makes an absent prop `false` — and forwards it to `reka-ui`'s `ToggleGroupRoot`, whose own default is `rovingFocus: true, loop: true` (`node_modules/reka-ui/dist/ToggleGroup/ToggleGroupRoot.js`, props block). The forwarded `false` wins. No arrow-key navigation, no wrap. This originates in glass-ui 7.0.0; the demo inherits it at its **only** `/toggle-group` call site (`lane-frontend.md` §3.1: count 1).

**Falsifier.** For (3): if `useForwardPropsEmits` strips falsy values (it strips `undefined`, not `false`) or if Vue leaves an unset `type: Boolean` prop as `undefined` (it does not — boolean casting is on by default and there is no `default: undefined`). For (1): if a screen reader announced the inner group's label on focusing the outer scroller — it announces the focused element's own name, which is empty.

### D-7 · MAJOR · `content-visibility: auto` amputates the overshoot the scene exists to show

`EasingTarget.css:104–108` puts `content-visibility: auto` on every `.specimen-tile`. `content-visibility: auto` applies `contain: layout style paint` unconditionally — **paint containment clips descendants to the padding box** (radius-adjusted). The ball is a descendant (`EasingTarget.vue:106–110`, inside `.tile-stage`), and its travel is `fn(phase) · maxX` (`:249–252`) with **no clamp**. Sampled from the installed registry, the specimens' ranges are:

```
ease-in-bounce    max 1.1826   ease-out-back   max 1.0868
ease-in-out-back  max 1.0927 / min −0.0927     ease-in-back  min −0.0969
```

At the grid's declared floor — `minmax(150px, 1fr)` (`EasingTarget.css:94`) — with the Chip cell's `px-2` (8 px) padding: stage width 134, `maxX = 120`. `ease-in-bounce` peaks at `1.1826 × 120 = 141.9 px`, putting the ball's box at `[149.9, 163.9]` against a padding-box right edge of 150 px: **≈13.9 px of a 14 px ball is clipped away**, for roughly t ∈ [0.35, 0.95] of the sweep. (If Tailwind's emission order lets `px-3.5` win over `px-2` — both are in the class string, `chip-6ysLmScu.js` `x()` composes size-then-shape — padding is 14 px, stage 122, `maxX` 108, and ≈5.7 px still clips.) `ease-in-back`'s undershoot drives the ball to `−11.1 px`, i.e. `[−3.1, 10.9]` against a left padding edge of 0 → clipped. **D-1**'s 9999 px pill radius compounds this: the clip edge at the ball's mid-height is at the lozenge's widest point, but the sparkline's endpoints (≈9 px and ≈43 px within the 52 px stage) sit where the pill curvature cuts ≈22.8 px inboard.

The bitter part: `EasingTarget.css:118–119` explicitly reasons about this — "18% headroom + visible overflow keep overshoot unclipped" — and that reasoning is *correct for the sparkline* (`ease-in-bounce`'s y = −0.1826 lands 3.3 px inside the stage top; verified). It was never extended to the ball, and the perf primitive added at `:104` silently invalidates the containing assumption for both.
**Falsifier.** If `content-visibility: auto` did not imply paint containment (CSS Contain §3: it does), or if the columns are always ≫150 px in practice — `auto-fill minmax(150px,1fr)` means 150 px is exactly the width reached at every narrow/mobile breakpoint. **UNPROVEN-NEEDS-LIVE:** the exact clipped pixel count, which depends on the Tailwind padding resolution above.

### D-8 · MAJOR · The header's `out-in` transition collapses the tallest element on every selection, reflowing the whole grid

`EasingTarget.vue:23–30` wraps the `<h2 class="specimen-name text-display">` in `<Transition name="specimen-name" mode="out-in">`. `mode="out-in"` **unmounts** the leaving element before mounting the entering one. `.gallery-id` is `display:flex; flex-wrap:wrap; align-items:baseline` (`EasingTarget.css:19–25`) with no reserved height, and `.specimen-name` sets only `line-height: 1.05` (`:27–31`). `text-display` is `--type-display-1` = `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` (`dist/styles/typography/scale.css:1`) — 26–42 px, by far the tallest thing in the header. During the out→in gap the header loses that line: the literal + copy button jump left and up, `.gallery-header` (`shrink-0`) shrinks, and the sibling `FadingScroll .specimen-drawer` (`flex-1 min-h-0`, `:76`) **grows** — re-laying out up to 33 grid cells — then reverses. On the component's primary interaction (tile press), every frame.
**Falsifier.** If Vue's `out-in` overlaps the two elements (it does not — the leave transition completes and the node is removed before enter begins), or if a min-height reserved the line (none is set anywhere in `EasingTarget.css`), or if the h2 were positioned out of flow (it is not).

### D-9 · MAJOR · The selected-name override discards glass-ui's solved ink — a WCAG failure armed to fire the moment D-1 is fixed

`EasingTarget.css:177–180` sets `.specimen-tile[data-state="on"] .tile-name { color: var(--ball-tone); font-weight: 600 }`. glass-ui's own on-state rule sets `color: var(--accent-ink)` (`glass-chip.css:1`), and `--accent-ink: var(--accent-ink-resolved, var(--foreground))` (`glass/accent-tone.css:1`) — with no `tone` prop passed (`EasingTarget.vue:83–93` passes none, so `Chip`'s `k.value` is `undefined` and `--accent-ink-resolved` is never set), that resolves to `--foreground`. The demo therefore replaces a solved ink with the *source hue of the band it sits on*. Computed against the band the primitive would paint — `--accent-band = color-mix(in oklab, var(--card), var(--primary) X)` where `X = max(18%, --chip-tint-floor + 10%)` = **22 %** light / **25 %** dark:

| theme | text | band | contrast | glass-ui's own pairing |
|---|---|---|--:|--:|
| light | `--accent-kf` oklch(.56 .17 295), Y 0.1602 | Y 0.6812 | **3.48 : 1** ✗ (needs 4.5) | `--foreground` on band: **12.18 : 1** ✓ |
| dark | `--accent-kf` oklch(.74 .13 305), Y 0.3845 | Y 0.0652 | **3.77 : 1** ✗ | — |

`.tile-name` is `text-mono-caption` = `--type-caption` = `clamp(0.75rem, 0.71rem+0.21vw, 1rem)` — 12–16 px, never "large text" (`600` weight does not qualify below 18.66 px), so the 4.5 : 1 threshold applies in both arms. Today the rule is *masked* by D-1 (no band paints, so accent-on-card = 4.63 : 1, marginally passing). Fix D-1 without fixing this and the drawer lands in a WCAG AA failure in **both** themes.
**Falsifier.** If `--accent-ink-resolved` were set by some ancestor (`useAccentTone`'s `toneStyle` is applied only when `tone !== undefined` — `chip-6ysLmScu.js`, `k`/`A` computeds), or if the `::after` plus-lighter flood lifts the pair over 4.5 : 1 — it lightens band *and* glyph inside the chip's `isolation: isolate` context, so the direction is not decidable statically. **UNPROVEN-NEEDS-LIVE** for the flood term only; the base pair is arithmetic.

### D-10 · MAJOR · Family-filter tap targets fall below the 24 × 24 floor on coarse pointers — and below the demo's own documented 44 px

Consequence of **D-1**, but independently gated and independently remediable. With `toggle-group/styles.css` absent, `.toggle-group__item`'s entire declaration block — including `min-inline-size/min-block-size: var(--toggle-group-item-size)` and `padding-inline` — never applies, and `[data-size="sm"]`'s `--toggle-group-item-size: var(--control-h-sm)` with it. The items become bare reka `<button>`s sized by their text box. "All" at the inherited body rung is ≈24 × 19 px including no padding — under WCAG 2.2 SC 2.5.8 (24 × 24 AA) and far under the 44 px floor the demo itself codifies as `.tap-floor` (`design-idioms.css:81–85`, "the WCAG 2.5.5 44px minimum touch-target floor"). Ten such targets in a horizontally-scrolling strip on phones — precisely the context `EasingTarget.vue:43–48` reasons about at length.
**Falsifier.** If the tokens the missing rule consumes were themselves enough — they are loaded (`tokens/sizing.css` sets `--control-h-sm: max(2.25rem·--ui-scale, --control-floor)` and coarse pointers get `--ui-scale: 1.5`, `--control-floor: 2.75rem` → 54 px), but nothing consumes them without the rule. If D-1 is wrong, this finding dies with it.

---

## 3. MINOR

**D-11 · Reduced motion parks 33 balls on one identical pixel.** `paintRestState` (`EasingTarget.css`-side comment `EasingTarget.vue:261–267`) writes `tileBallXAt(fn, 1)` for every tile. Every specimen satisfies `fn(1) = 1` (verified: all 33 sample to exactly 1.0000 at t=1, including `steps(4)`, `step-start`, `step-end`). So under PRM all 33 balls sit at the *same* x — 33 identical 14 px violet dots with 10 px glows, carrying zero comparative information while adding the maximum possible visual noise to the state where a user has asked for less. The honest PRM rest is to hide the ball and let the portrait carry the curve, which is what `:262–263` says it is doing.
*Falsifier:* a curve with `fn(1) ≠ 1` in the specimen set — none exists.

**D-12 · Two tiles show a ball that never moves.** `namedEasing("step-start")` → `steppedEasing(1,"jump-start")`, which is ≡ 1 on [0,1]; `step-end` → ≡ 0 except at exactly t=1 (`timingCurveUtils.ts:43–44`; `easing.js` `y()`). Under the shared sweep those two balls are permanently parked at the terminus and the origin respectively. Against the framing "all balls depart together, arrive per their curve" (`EasingTarget.vue:8–9`), a permanently frozen ball reads as a broken tile, not as an instantaneous jump.
*Falsifier:* if the sweep's `p` hits exactly 1.0 often enough for `step-end` to visibly flicker — `sweep.at(phase).p` reaches 1 only at phase exactly 0.5 (`useEasingDemo.ts:139, 185`), i.e. one frame per cycle at best.

**D-13 · Caps tracking on lowercase identifiers.** `text-mono-caption` is `{ font-family: mono; font-size: --type-caption; letter-spacing: var(--type-tracking-caps); text-transform: uppercase }` (`dist/styles/typography/utilities.css:1`); `--type-tracking-caps: 0.1em`. `.tile-name` cancels `text-transform` (`EasingTarget.css:183–184`, un-layered so it beats the `@layer utilities` utility) but leaves the **0.1em caps tracking** on lowercase hyphenated identifiers. At the 15.4 px rung of a 1080p viewport that is +1.54 px per glyph — ≈26 px of dead width on `ease-in-out-cubic`, inside a 150 px column, forcing a wrap the tile did not need.
*Falsifier:* if `--type-tracking-caps` were 0 (it is 0.1em, `tokens/scheme-motion.css:1`), or if `.tile-name` overrode letter-spacing (it does not).

**D-14 · One constant, four copies, and a stale doc.** `BALL_SIZE = 14` (`EasingTarget.vue:228`) · `--ball-size: 14px` (`EasingTarget.css:163`) · the two tick offsets `left: 6.5px` / `right: 6.5px` (`:153, :156`, each = 14/2 − 1/2). Change one and the ticks lie. Worse, the shared idiom documents a seam the tree abandoned: `design-idioms.css:162–163` — "`--ball-size` is the seam EasingTarget reads via `getComputedStyle`" — and `EasingTarget.vue` contains no `getComputedStyle` at all.
*Falsifier:* a `getComputedStyle` read anywhere in the easing scene — `grep` finds none.

**D-15 · Every specimen carries a written description; none is rendered.** `easingGroups.ts:31–35, 41–43, 82–89` gives each curve a human description ("slow start, fast end", "overshoots, settles", "pulls back first"). `EasingTarget` imports `EASING_GROUPS` (`:149`) and drops the field. Meanwhile the entire visual pedagogy is `aria-hidden="true"` (`:94`), so an AT user gets 33 buttons labelled only by identifier and no text equivalent for the thing the component exists to teach — with the equivalent already authored, one `aria-describedby` away.
*Falsifier:* the description appearing elsewhere in the easing scene — `EasingSidebar.vue` is a separate surface and would not name the *hovered/other* tiles.

**D-16 · "ease-in-bounce" is neither a bounce nor an ease-in, and its family has one member.** value.js implements it as a single cubic-bezier (`easing.js:205`, `g = e => m(h(e,.09,.5),.91,1.5)` ⇒ `cubic-bezier(0.09, 0.91, 0.5, 1.5)`): sampled 0.0000 / **0.8944** / 1.1495 / 1.1655 / 1.0000 at t = 0/.25/.5/.75/1, max 1.1826 — one overshoot, no oscillation, and 89 % of the distance covered in the first quarter, i.e. an ease-**out** shape. `easingGroups.ts:87–90` labels it family `Bounce`, description "bouncing ramp up", and gives that family **one** item where every other family has three. The drawer's comparative pedagogy is void for a family of one, and the specimen it does show contradicts its own name.
*Falsifier:* a bounce implementation elsewhere in the registry (`easing.js:205–224` is the whole analytic table; the preset table has no bounce entries).

**D-17 · `will-change: transform` on up to 33 simultaneous elements.** `EasingTarget.css:162–167`. Each promoted ball also carries a static `box-shadow` glow (`design-idioms.css:185`, `0 2px 10px`). Blanket `will-change` on a large homogeneous set is the canonical anti-pattern; the IO gate (`EasingTarget.vue:290–301`) and `content-visibility` suppress the *paint walk*, not the layer promotion of rendered tiles.
*Falsifier:* if the rendered set is always small — with filter "All" (the default, `:161`) it is 33.

**D-18 · Forced-colors: the racing ball disappears; zero provisions in the demo.** `grep -rn "forced-colors" demo/` → **0 hits**, repo-wide. `.progress-ball`'s only visual is `background: var(--ball-tone)` (`design-idioms.css:184`); in forced-colors mode `background-color` is forced to the `Canvas` system colour, so the ball becomes the tile. The one provision that would rescue the *filter* — `toggle-group/styles.css`'s `@media (forced-colors: active)` Highlight block — is unreachable per D-1. glass-ui's generic `accessibility.css` rule (`[aria-pressed="true"], [data-state="on"] { border-color: Highlight !important }`) *is* loaded and would put a border on the selected chip, so the tile selection survives; the ball does not.
*Falsifier:* if the ball's `box-shadow` glow (not a forced property) survives with enough presence to read as a ball — a 10 px blur at 28 % with no core is a smudge, not a marker. **UNPROVEN-NEEDS-LIVE.**

**D-19 · No RTL story.** `left: 0` (`EasingTarget.css:165`), `left: 6.5px` / `right: 6.5px` (`:153, :156`), `translateX(+x)` (`EasingTarget.vue:257`), and an LTR SVG time axis. `grep -rn 'dir="rtl"\|useRtl\|direction: rtl' demo/` → 0 hits repo-wide, so nothing else establishes a direction contract either. A time axis is conventionally LTR even in RTL locales, which is why this is MINOR rather than MAJOR — but the *filter strip* (`FadingScroll axis="x"`, `:42`) is chrome, not a time axis, and it has the same problem via `reka`'s `dir` prop being forwarded as `undefined`.
*Falsifier:* an explicit owner ruling that the demo is LTR-only.

**D-20 · Four specimens print the same string twice, in two faces.** `literal` (`EasingTarget.vue:209–220`) returns the bare `name` for any curve outside `NAMED_EASING_BEZIER` and outside `steps`: `smooth-step-3`, `ease-in-bounce`, `step-start`, `step-end`. For those the header renders the identifier once as an `<h2 class="text-display">` in Instrument Serif and again immediately beside it as `<code class="text-mono-small">` with a "Copy easing literal" button — same characters, two faces, ~0.5 rem apart.
*Falsifier:* verified against `animationDescriptions.ts:16–49` (29 keys) ∩ the 33 specimen names — exactly those four fall through.

**D-21 · Two dead declarations.** (a) `data-register="code"` (`EasingTarget.vue:31, :114`; 8 call sites demo-wide) has **no consumer**: `grep -rn "data-register"` across `demo/**/*.css` and the whole of `node_modules/@mkbabb/glass-ui/dist/` → zero selectors. (b) `.literal-text { text-transform: none }` (`EasingTarget.css:64–67`) is a no-op — `text-mono-small` sets no `text-transform` (`typography/utilities.css:1`), unlike its `-caption` sibling. Both echo the precedent the demo already recorded once (`design-idioms.css:92–95`: "61 call-sites used to resolve to nothing").
*Falsifier:* a `[data-register]` selector in a stylesheet outside the two trees grepped.

**D-22 · The selection comment states a strength the primitive does not use.** `EasingTarget.css:169–172` — "the glass wash (**primary 15 %** = the violet authority)". `glass-chip.css:1` computes `--accent-band-strength: max(18%, calc(var(--chip-tint-floor) + 10%))` with `--chip-tint-floor: 12%` light / `15%` dark → **22 % / 25 %**. The number was never verified against the source; per D-1 the rule does not run at all.

**D-23 · The portrait's origin and the race's origin are half a ball apart.** The sparkline is `inset: 18% 0` — its x-axis spans the full stage width, t=0 at x=0 (`EasingTarget.css:120–126`). The race's origin tick is at x=7 (`:152–153`), because the ball is positioned by its left edge (`design-idioms.css:180–182` sets only `top`/`margin-top`; `EasingTarget.css:165` sets `left: 0`). On a ~130 px stage the two "time zero" marks sit 5.4 % apart, so the portrait and the runner never agree about where the sweep starts.
*Falsifier:* if the ball were centred horizontally the way it is centred vertically — it is not; there is no `margin-left: calc(var(--ball-size)/-2)` here, unlike the sibling consumers (`SpringTarget.vue:344, :352, :443`).

**D-24 · The ball sweeps across the portrait it is meant to complement.** `.tile-stage` is 3.25 rem = 52 px; the sparkline occupies `inset: 18% 0; height: 64%` → 9.4–42.7 px, centre 26 px; the rail is at `top: 50%` = 26 px; the ball is `top: 50%` with `margin-top: -7px` → centre 26 px. All three share one horizontal midline, so the opaque 14 px ball plus its 10 px glow passes directly over the curve's own trace at every crossing of the mid-value band — once per sweep, on the tile the user is looking at.
*Falsifier:* if the sparkline were offset off the rail band — `inset: 18% 0` + `height: 64%` is exactly vertically centred (18 + 64 + 18 = 100).

---

## 4. INFO

**D-25 · The rail measurement can be taken from a tile the browser has not laid out.** `measureRailWidth` and `wirePainter` both read `tileSnapshot[0]?.stage.clientWidth` (`EasingTarget.vue:269–274, :302–303`) — always the **first** tile of the current filter. That tile carries `content-visibility: auto` (`EasingTarget.css:105`), which adds **size containment** while skipped, so its descendants get no boxes. A `useResizeObserver` fire (`:332`) while tile 0 is scrolled out of the skip window would then read `clientWidth === 0` → `maxX = −14` → `tileBallXAt` returns 0 for every tile (`:249–252`) → the entire race freezes at the origin until the next re-wire. **UNPROVEN-NEEDS-LIVE** (the exact `clientWidth` returned from a skipped subtree is engine behaviour, not spec text); cross-axis — logged here because a frozen race is a motion-honesty failure, but it belongs to the correctness lane.

**D-26 · The rail is functionally invisible.** `--rail-tint: 16%` of `--ball-tone` over `--card` composites to ≈`rgb(233,220,231)`, ≈**1.13 : 1**. `EasingTarget.css:135–137` intends exactly this ("at 1px they recede to ruled paper"), so it is recorded rather than charged — but the ball is described as racing *on a rail*, and at 1.13 : 1 there is no rail, only a ball crossing empty space between two invisible ticks (D-2).

---

## 5. Superlatives (L-18 runs both ways)

**L-1 · One clock, one phase, N runners — simultaneity by construction.** `usePainterRegistry(() => [livePhaseValue])` (`useEasingDemo.ts:166–167`) hands every registered painter the *same* scalar; `paintTileDots` (`EasingTarget.vue:254–259`) walks one snapshot with one `phase`. There is no per-ball clock to drift and no synchronisation step to get wrong. The comparative claim at `:226–227` ("the departure is simultaneous by construction") is literally true of the code. *Falsifier:* any painter reading its own timestamp — none does.

**L-2 · Tick geometry that is actually exact.** `left: 6.5px` with `width: 1px` centres the tick at 7 px = `BALL_SIZE/2`, which is the ball's centre at translateX(0); `right: 6.5px` centres at `W−7` = `maxX + 7`, the ball's centre at `fn(1)=1`. Both ends are correct to the half-pixel. Pixel honesty at this level is rare enough to name (even though D-14 charges the way the constant is carried).

**L-3 · An empty state that cannot exist.** `FAMILY_FILTERS = ["All", ...SPECIMEN_GROUPS.map(g => g.family)]` (`EasingTarget.vue:158–159`) derives the filter vocabulary from the specimen data itself, and every group has ≥1 item. `visibleCurves` (`:186–198`) is therefore never empty. The absent empty-state is not an omission — it is a structural impossibility. *Falsifier:* an externally-supplied filter value — `onFamilyChange` (`:165–169`) only accepts non-empty strings and the source is the same array.

**L-4 · The author knew v-for refs are unordered, and said so.** `:282–289` keys the painter snapshot by `el.dataset.curve`, not by index, with the reason written down. This is the exact bug class that silently mispairs 33 curves with 33 balls, and it was pre-empted.

**L-5 · PRM honoured in both mechanisms, and re-wired on change.** The JS sweep (`:263–267, :272–273, :304–307`) *and* the CSS crossfade (`EasingTarget.css:48–53`) both respond, and `watch(reducedMotion, () => wirePainter())` (`:320`) means a mid-session OS toggle takes effect. `lane-frontend.md` §6.5 flags the demo's PRM mechanism as "conscientious but inconsistent" across scenes; this file is the one that uses the reactive `useMediaQuery` seam rather than a one-shot `window.matchMedia?.()`, and it is the right one.

**L-6 · The overflow fix landed at the consumer's own layer.** `.family-row { width: max-content }` (`EasingTarget.css:85–89`) removes the overflow *condition* that stranded "All" past a centred scroll origin, instead of reaching into the vendor root — with the upstream ask lettered to glass-ui (BG-12) rather than patched locally (`EasingTarget.vue:43–48`). That is the correct shape of a consume-seam fix, and it is the discipline `lane-frontend.md` §3.4 notes the demo otherwise bends (`tab-idiom.css` / `playback-idiom.css` styling reka's generated DOM).

**L-7 · A genuine no-truncation commitment.** `overflow-wrap: anywhere` + no `text-overflow` on both the literal (`EasingTarget.css:64–67`) and the tile name (`:183–190`), with the reasoning stated twice. Against an industry default of ellipsis-everything, choosing "wrap and grow" for a re-parseable code literal is the right call.

**L-8 · Every specimen name resolves — verified by execution, not by reading.** All 33 names in `EASING_GROUPS` minus `Custom` resolve through the installed value.js 4.0.0 registry with zero `easing_name_unknown` results. The two that the registry *does* reject (`step-start`, `step-end` → `easing_name_unknown`) are intercepted one layer above (`timingCurveUtils.ts:43–44`) before they can reach it. Since `requireEasing` **throws** on a bad name (`:17–23`) inside a computed (`EasingTarget.vue:186–198`), a single unknown name would blank the scene — the guard is load-bearing and it holds.

---

## 6. Killed by their own falsifiers (recorded so they are not re-raised)

1. **"The selected tile scales 1.074×, so its ball is bigger than the others — contradicting `EasingTarget.css:170–172` ('the BALL stays identical')."** The scale lives in `.glass-chip--interactive { scale: calc(1 + 0.12·--chip-flood-t·--motion-weight) }` (`glass-chip.css:1`), which per **D-1** never loads. The comment's claim survives — by accident of the missing stylesheet.
2. **"The sparkline's overshoot is clipped by the tile."** Computed: `ease-in-bounce`'s peak (v = 1.1826 ⇒ y = −0.1826) lands 6.1 px above the SVG box, i.e. 3.3 px *inside* the 52 px stage. The 18 % headroom at `EasingTarget.css:118–125` is correctly sized. Only the **ball** clips (D-7).
3. **"`namedEasing` throws for `smooth-step-3` / `ease-in-bounce`, blanking the scene."** Both are present in value.js's analytic registry (`easing.js:221–224`). Executed and confirmed (L-8).

---

## 7. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep, RED) | **Extended, one layer down.** D-1 is the same failure class at the cascade layer: imported but unstyled. F-1's remedy (declare + lock 7.0.0) does not fix D-1; D-1's remedy (import the two component stylesheets, or `dist/glass-ui.css`) does not fix F-1. Both are prerequisites for any styling work on this file. |
| `lane-frontend.md` **F-6** ("the glass-ui boundary is otherwise clean — GREEN") | **Contradicted at the CSS layer.** Import-boundary clean, cascade-boundary broken (D-1). |
| `lane-frontend.md` **§3.1** (`/chip` 2, `/toggle-group` 1, `/fading-scroll` 1) | This file is the sole `/toggle-group` and `/fading-scroll` consumer, so D-6(3) and D-10 have exactly one blast radius — and one fix site. |
| `lane-frontend.md` **§6.3** (98 unprefixed demo tokens; **zero** `--kf-*`) | Confirmed and instantiated: `--ball-tone`, `--ball-size`, `--ball-glow`, `--rail-tint` (`EasingTarget.css:7, 140, 163–164`) are flat-namespace names set inside a glass-ui component's subtree, where `.glass-chip`'s own `--chip-tint-floor` / `--accent-band-strength` live. No collision is demonstrable today; the surface is exactly the one §6.3 asks for a dedicated lane on. |
| `lane-frontend.md` **§6.5** (PRM: 13 sites, "inconsistent in mechanism") | This file is the reactive-mechanism exemplar (L-5) — and simultaneously the site of the PRM *content* defect D-11. |
| `lane-frontend.md` **S-7** (`CopyButton` → glass `Button`; runtime `@keyframes` string injection) | Confirmed on read: `CopyButton.vue:70, :83` build `@keyframes fade-in`/`fade-out` as JS template strings. Not re-charged here (it is S-7's finding, not this component's), but noted: `EasingTarget.css:68–75` has to hand-size the button (`width: 1rem; height: 1rem`) precisely because those icons are absolutely positioned at 100 % — a consumer paying for the primitive's absence, which is S-7's argument. |
| `lane-library.md` §0 | Cited for substrate only (145 src files / value.js `/easing` reached from 3 src modules); no library claim is made here. |

---

## 8. Provenance index

`EasingTarget.vue` — 2–10, 8–9, 23–30, 31–40, 35–39, 42–48, 56–63, 60, 69–75, 76, 80–81, 83–93, 94, 104–110, 112–117, 149, 158–159, 161, 165–169, 172–178, 186–198, 200–206, 208–220, 226–228, 249–267, 269–274, 282–307, 320, 332.
`EasingTarget.css` — 7, 19–31, 48–53, 64–67, 80–89, 94, 104–108, 118–133, 135–157, 162–167, 169–180, 183–190.
`useEasingDemo.ts` — 40–43, 139, 166–167, 185, 246–252, 265–271, 279–287, 370.
`timingCurveUtils.ts` — 17–23, 43–44, 48–56, 69, 78–79, 88.
`easingGroups.ts` — 27–103 (families), 31–35, 60, 87–90.
`animationDescriptions.ts` — 16–49, 51.
`demo/styles/style.css` — 3, 9, 130–141, 163, 203–208, 263–274.
`demo/styles/design-idioms.css` — 81–85, 92–95, 161–187.
glass-ui 7.0.0 (installed) — `dist/styles/index.css:1`; `dist/styles/glass.css:1`; `dist/styles/glass/glass-chip.css:1`; `dist/styles/glass/glass-capsule.css:1`; `dist/styles/glass/accent-tone.css:1`; `dist/styles/typography/utilities.css:1`; `dist/styles/typography/scale.css:1`; `dist/styles/tokens/color-radius.css:1`; `dist/styles/tokens/scheme-motion.css:1`; `dist/styles/tokens/sizing.css:1`; `dist/styles/accessibility.css:1`; `dist/components/toggle-group/styles.css:1`; `dist/chip-6ysLmScu.js`; `dist/toggle-group-BWHkiLdP.js`; `dist/fading-scroll-DKsoe_vh.js`.
value.js 4.0.0 (installed) — `dist/subpaths/easing.js:190–275`.
reka-ui (installed) — `dist/ToggleGroup/ToggleGroupRoot.js` (props block).

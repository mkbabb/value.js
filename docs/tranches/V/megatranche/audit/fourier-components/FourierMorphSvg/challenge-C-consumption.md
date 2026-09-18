claude-opus-5[1m]

# CHALLENGE C — CONSUMPTION · `FourierMorphSvg.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/decorative/FourierMorphSvg.vue` (41 lines)
**Axis** C — how this component consumes value.js `^0.13.0`, keyframes.js `^4.3.0`, glass-ui `^4.0.0`, the fourier API; props/emits contract quality; integration seams.
**Method** static + source-derived only. No browser tooling. Live-only claims marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Evidence tree** `/Users/mkbabb/Programming/fourier-analysis` — READ-ONLY. No product source touched in any repo.

**Tally** 13 defects (1 BLOCKER · 4 MAJOR · 5 MINOR · 3 INFO) · 3 superlatives.

---

## 0. The central fact, stated up front

`FourierMorphSvg.vue` **imports nothing.** Not value.js, not keyframes.js, not glass-ui, not `lib/api.ts`. Its entire module-level dependency surface is empty; its whole body is one `withDefaults(defineProps<…>())` and a 15-line template.

Two consequences govern this whole challenge:

1. The prior "assume DEFECTIVE" posture cannot be discharged by finding bad imports — there are none. **The consumption story lives entirely in the component's four props and its two call sites.** That is where I looked.
2. The corpus census is confirmed, not contradicted: `formation/fourier/lane-frontend.md:480` counts the repo's value.js surface at **5 sites** (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — all `easeInOutSine` / `timingFunctions`). `FourierMorphSvg.vue` is correctly absent from that list. `lane-frontend.md:369` files it under "Bespoke with no glass-ui analogue"; `:179` as "Path-only SVG renderer". **I agree with all three rows.**

The two consumers are `layout/DarkModeToggle.vue` (109 lines) and `morph/MorphShapePreview.vue` (175 lines) — `grep -rn "FourierMorphSvg"` returns exactly those two importers plus the definition.

---

## 1. BLOCKER

### C-1 — the primary consumption seam ships an interactive control with **no accessible name** (WCAG 2.1 SC 4.1.2, Level A)

**Provenance**
- `web/src/components/morph/MorphShapePreview.vue:4-10` — the button:
  ```
  <button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">
      <FourierMorphSvg :path="currentPath" :stroke-width="4.5" view-box="0 0 200 200" />
  </button>
  ```
- `web/src/components/decorative/FourierMorphSvg.vue:2-16` — the rendered subtree is `<svg class="fourier-morph-svg" :style><path/></svg>`. No `role`, no `aria-label`, no `aria-hidden`, no `<title>`, no slot through which a caller could inject one.

The button has **zero text content and zero labelling attributes**. Its accessible name computes to the empty string. This is the primary affordance of the `/morph` demo page — the control that starts the morph.

**Contrast that proves the omission is an oversight, not a policy**: the *other* consumer gets this right — `DarkModeToggle.vue:5` carries `:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"`. One of two callers remembered; the component offered nothing to make remembering unnecessary.

**Falsifier** (survived) — the name would be non-empty if any of these existed; I checked each: `aria-label` / `aria-labelledby` on the button (absent, see the tag above); adjacent text inside the button (absent — `FourierMorphSvg` is the only child); a `<title>` in the SVG (absent, `FourierMorphSvg.vue:2-16`); a visually-hidden span (`grep -n "sr-only\|visually-hidden" MorphShapePreview.vue` → no match). The `.info-chip` divs at `:12-25` are **siblings of the button**, not descendants, so they contribute nothing to its name.

**Attribution is split and I state both halves**: the missing `aria-label` is `MorphShapePreview`'s defect; the missing `aria-hidden="true"` default on a component that lives in `components/decorative/` and takes no labelling prop is `FourierMorphSvg`'s. Fixing either closes it. The component-side fix is the one that closes it for all future callers.

**Why BLOCKER and not MAJOR**: SC 4.1.2 is Level A — the floor, not the target — and this is a shipped, primary, keyboard-reachable control. Any a11y-gated release stops here. I hold this as the axis's single blocker and do not inflate the others to match.

---

## 2. MAJOR

### C-2 — the `path: string` contract forces a **~56 KB full-precision `d` string** to be regenerated and written to the DOM on every animation frame

**Provenance**
- `FourierMorphSvg.vue:23` — `path: string`. The contract is a *pre-serialized* path; the component cannot accept points.
- `useFourierMorph.ts:81` — `const currentPath = computed(() => pointsToSvgPath(currentPoints.value));`
- `useFourierMorph.ts:175, 189, 204` — `currentPoints.value = …` is reassigned inside all three phases' per-tick callbacks.
- `useFourierMorph.ts:132` — `useWAAPI: false`, so the keyframes.js `Animation` drives `onTick` off rAF (~60 fps).
- `lib/svg-fourier.ts:68` — `d += \` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}\`;` — **raw float64 interpolation, no rounding, no `toFixed`**.
- Assets: `sun.json` / `moon.json` carry **512 points per level** (`partial_sums["50"].x.length === 512`, verified by reading the JSON).

**Measured, not estimated.** I replayed `pointsToSvgPath`'s exact algorithm (`svg-fourier.ts:47-72`, closed-path branch, modular indexing) over the real level-50 arrays using JS number→string semantics:

| shape | points | `d` length |
|---|---|---|
| `sun.json` | 512 | **57 027 chars (55.7 KB)** |
| `moon.json` | 512 | **56 571 chars (55.2 KB)** |

At the default 350 ms morph (`DEFAULT_MORPH_CONFIG`, `useFourierMorph.ts:59-68`: 150+50+150) that is ≈21 frames × ~56 KB ≈ **1.2 MB of transient string allocation**, each frame followed by a full re-parse of a 512-segment cubic path by the SVG engine.

The precision is the avoidable half: the viewBox is 200 units (`FourierMorphSvg.vue:29`) rendered into a 5 rem box (`DarkModeToggle.vue` `--toggle-size: 5rem`) — ~0.4 px per user unit. Two decimals saturate the display. The tree emits up to 17 significant digits.

**Falsifier** (survived) — the claim dies if the computed does not re-evaluate per tick, or if the string is memoized. Neither holds: `currentPoints` is a `ref` reassigned to a **new array** by `lerpPoints` / `interpolateAtHarmonicLevel` each tick (`svg-fourier.ts:94-106, 125-154` both `return` fresh arrays), so the computed invalidates every frame, and the template reads it every frame. There is no memo anywhere on the path.

**Honest scoping** — the byte counts and the per-frame invalidation are **static fact**. The *perceived jank* is `UNPROVEN-NEEDS-LIVE` (SS-13): I have not measured a dropped frame. On desktop this likely absorbs; on the low-end mobile this repo explicitly targets (`style.css` mobile-first root sizing; `MorphShapePreview.vue:117-142` mobile/desktop chip split) it is the kind of cost that shows. I rate MAJOR on the proven waste, not on unproven jank.

**Note the design tension, in fairness**: `path: string` is *why* the component is dependency-free and reusable (superlative S-2). A points-based prop would be cheaper per frame but would drag `pointsToSvgPath` — and with it `@mkbabb/pencil-boil` (`svg-fourier.ts:11`) — into the renderer. The cheap fix keeps the contract and only rounds at `svg-fourier.ts:68`; it is a one-line change upstream of this component and costs it nothing.

### C-3 — `viewBox` defaults to a magic `"0 0 200 200"` that the shape assets do not actually respect

**Provenance** `FourierMorphSvg.vue:24, 29` (prop + default); `DarkModeToggle.vue:11` and `MorphShapePreview.vue:8` both pass `view-box="0 0 200 200"` explicitly.

Measured bounding boxes of the level-50 partial sums:

| shape | bbox x | bbox y | w × h | bbox centre | offset from (100,100) |
|---|---|---|---|---|---|
| `sun.json` | [13.32, 177.75] | [16.63, 175.42] | 164.4 × 158.8 | (95.53, 96.02) | (−4.47, −3.98) |
| `moon.json` | [30.06, 140.96] | [36.55, 174.73] | **110.9 × 138.2** | (85.51, 105.64) | **(−14.49, +5.64)** |

The moon sits **14.5 units left and 5.6 units below** the box centre and is **33 % narrower** than the sun. At the 5 rem toggle (scale 0.4) that is ~5.8 px of horizontal drift plus a visible size change every time the theme flips. Nothing in the component or the assets links the box to the data — the coordinate system is an undocumented convention duplicated as a string literal in three places.

**Falsifier** (partially killed — reported anyway, with the dead half named): I first suspected **stroke clipping** at `DarkModeToggle.vue:9`'s `:stroke-width="14"`. That claim is **FALSE and I withdraw it**: half-width 7 extends the sun to x∈[6.32, 184.75], y∈[9.63, 182.42] — inside the box — and `FourierMorphSvg.vue:38` sets `overflow: visible`, which would defeat clipping regardless. The off-centre/size-disparity half survives on the measured bboxes.

**Second falsifier, honestly unresolved**: a crescent moon *is* naturally smaller than a rayed sun, so the size delta may be deliberate optical design. I searched for a record of that intent (`docs/tranches/`, the asset commit `e9c7bc4 "Fourier morph system for dark mode toggle"`) and found none. The 14.5-unit **horizontal** offset is not explained by optical centring in any case — optical centring corrects perceived mass, and the moon's mass sits left of the box centre, which pushes the same direction as the error rather than against it. What is certainly a defect regardless of intent: the component exposes no fit/normalise affordance, so a caller who disagrees with the framing must edit a 220 KB JSON.

### C-4 — the shape never resyncs to `isDark`; a system theme change desynchronises the icon from the theme it indicates

**Provenance**
- `DarkModeToggle.vue:33` — `const { isDark, toggleDark } = useGlobalDark();`
- `DarkModeToggle.vue:58-60` — `onMounted(() => { morph.setShape(isDark.value ? moonShape : sunShape); });` — the **only** unconditional `setShape`.
- `DarkModeToggle.vue:62-73` — `handleToggle` is the only other writer, and it runs only on click.
- **There is no `watch(isDark, …)` in the file** (`grep -n "watch" DarkModeToggle.vue` → no match).
- glass-ui contract, `node_modules/@mkbabb/glass-ui/dist/composables/dark/useGlobalDark.d.ts:44-46` — `initialValue` "Defaults to vueuse's `"auto"` (**prefers-color-scheme**)", and `isDark` is a vueuse `useDark` `WritableComputedRef` (`:17`).
- The `"auto"` arm is real in the shipped bootstrap: `dist/dark.js:17` — `(m===null||m==="auto")&&window.matchMedia("(prefers-color-scheme: dark)").matches`.

So `isDark` can flip **without `toggleDark()` ever being called**. When it does, the class toggles, the whole app re-themes — and the SVG keeps rendering the stale shape. The toggle then displays a sun while the app is dark.

It also corrupts the *next* interaction: `handleToggle` computes `const from = isDark.value ? moonShape : sunShape` (`:65`) from the flag, not from what is on screen. With the flag flipped and the shape stale, `from` is the shape **not** being displayed, so the morph snaps to it before animating.

**Falsifier** (survived, with the precondition stated precisely) — this requires the stored scheme to be `null`/`"auto"`, i.e. a visitor who has never toggled, who then changes OS theme with the tab open. Once they click once, vueuse writes `"dark"`/`"light"` to `vueuse-color-scheme` and auto-tracking stops, so the fault self-heals after one glitched transition. Narrow. But a first-time visitor is exactly the population that sees it, the wrong-state indicator persists for the whole pre-click session, and a one-line `watch(isDark, …)` closes it. The `MutationObserver` at `App.vue:13` proves the repo already knows the class can flip outside this component's knowledge — it re-resolves the palette on exactly that event, and the shape was not given the same treatment.

`UNPROVEN-NEEDS-LIVE` for the observed desync; the code path is static fact.

### C-5 — the `MOON_COLOR` provenance comment is false in all three of its possible readings

**Provenance** `DarkModeToggle.vue:31` — `const MOON_COLOR = [192, 132, 252] as const; // #c084fc — matches VIZ_COLORS.legendre`

Three candidate meanings, all false:

1. **Against the seed literal** — `lib/colors.ts:80` seeds `legendre: "#9545b8"`. `#c084fc ≠ #9545b8`.
2. **Against the resolved runtime value** — `colors.ts:93` sets `VIZ_COLORS.legendre = cssVarToHex("--viz-legendre")`. glass-ui ships that token **only in oklch**: `dist/styles/tokens/color-radius.css:265` `--viz-legendre: oklch(0.532 0.180 317.5)` and `dist/styles/tokens/light-dark.css:147` `light-dark(oklch(…), oklch(…))`. `cssVarToHex` (`colors.ts:22-54`) matches **hex · `hsl(…)` · bare `h s% l%` · `rgb(…)`** and nothing else — **there is no oklch arm and no `light-dark()` arm** — so it falls through to `return "#888888"` (`:53`). The runtime value is grey.
3. **Against the palette family** — `#c084fc` is Tailwind `purple-400`, and it appears verbatim at `colors.ts:15` inside `STATIC.rainbow`, which is a *different* palette entry from `legendre`.

This is the "hand-rolled `colors.ts` arms" surface the F.W2 brief names, observed from the one seam where it touches this component: the stroke colour contract. It is not a cosmetic comment defect — it asserts a design coupling that a future maintainer will trust when retuning the palette, and acting on it would silently retheme the toggle.

**Falsifier** (survived) — the claim dies if `getComputedStyle().getPropertyValue()` canonicalises custom properties to `rgb(…)`. It does not: unregistered custom properties (no `@property` registration — `grep -rn "@property" node_modules/@mkbabb/glass-ui/dist/styles/tokens/` finds none covering `--viz-*`) compute to their substituted token text, and `light-dark()` is resolved at used-value time for real properties, not inside a custom property's computed value. So the string handed to those four regexes begins `oklch(` or `light-dark(`. The exact returned string is `UNPROVEN-NEEDS-LIVE`; the absent regex arm is static fact.

**The value.js connection, stated with its counter-argument.** value.js `0.13` is a direct dependency (`web/package.json:18`) and parses CSS colours — the obvious remedy for both `cssVarToHex`'s missing oklch arm and `lerpColor`'s sRGB integer interpolation (`DarkModeToggle.vue:39-44`). I do **not** file that as a defect here, for two reasons the tree supplies: (a) `useFourierMorph.ts:33-36` records a deliberate architectural win — keyframes 2.2.0 moved the value.js-bearing engine behind `loadAnimationEngine()` "so value.js no longer rides the eager bundle"; importing value.js directly into `DarkModeToggle` would **undo exactly that**, since the header is eager. (b) value.js's own ledger records `R1 = live parseCssColor("oklch()") shipping crash`, so the pinned surface would not currently survive the oklch input that motivates the change. The correct disposition is **carry to F.W2** and sequence it behind the parser repair, not adopt now.

---

## 3. MINOR

### C-6 — `strokeColor` default `var(--accent-red)` carries no fallback; a token rename degrades silently
`FourierMorphSvg.vue:30`. The token exists today — `dist/styles/tokens/color-radius.css` / `light-dark.css:142` / `dark-arm.css:111`, plus the bridge `theme/bridges.css:184` — so this is latent, not live. But an undefined `var()` in `color:` is invalid-at-computed-value-time, which makes `color` inherit; the stroke would silently take the parent's text colour rather than fail loudly. **The precedent is in this very repo**: glass-ui removed `.cartoon-card` at C.W5 and fourier had to resurrect it as a local `@utility` shim across 25 sites (`web/src/style.css`, block "D.W4.a"). `var(--accent-red, <literal>)` costs nothing.

### C-7 — `strokeColor?: string` accepts any string, with no validation and no typed colour
`FourierMorphSvg.vue:25`. A typo yields the silent inherit of C-6 rather than an error. I record this as MINOR **and argue against fixing it**: the repo's standing KISS guidance is not to introduce dependencies a 41-line presentational component does not need, and per C-5 the pinned value.js colour surface is not currently sound. `string` is the right type here today.

### C-8 — both callers restate the default `view-box="0 0 200 200"`
`DarkModeToggle.vue:11`, `MorphShapePreview.vue:8`, against the default at `FourierMorphSvg.vue:29`. 100 % of call sites override the default with the default — the value is not a caller decision at all, it is a property of the asset coordinate system (C-3). The default is dead weight that disguises where the constant really belongs.

### C-9 — `lerpColor(SUN, MOON, 1)` / `lerpColor(SUN, MOON, 0)` to express two constants
`DarkModeToggle.vue:48-50`. The idle branch runs a three-channel interpolation to return, provably, `MOON_COLOR` and `SUN_COLOR`. It reads as though the endpoints were computed rather than literal, and obscures that the idle colours are fixed.

### C-10 — two `as any` casts erase the `FourierPathData` contract at the data seam
`DarkModeToggle.vue:26-27` — `prepareFourierShape(sunData as any)` / `(moonData as any)`. `FourierPathData` is fully declared at `svg-fourier.ts:14-28` and the JSON *does* structurally satisfy it (verified: both files carry `original`, `decomposition`, `partial_sums`, `eval_points`, `levels`, `n_harmonics`, `n_samples`, `n_eval`). So the casts are unnecessary today **and** they guarantee that a future schema drift in the assets — the exact drift C-13 flags as unguarded — will not be caught by `vue-tsc`. The likely original cause is Vite's JSON module typing widening `levels` to `number[]`; a single `as unknown as FourierPathData` at a typed loader, or `resolveJsonModule` narrowing, beats two `as any` at the call site.

---

## 4. INFO

### C-11 — zero module-level consumption, confirmed by enumeration
The component imports no value.js, keyframes.js, glass-ui or API symbol. Bare-specifier audit (the F.W2 migration surface): **N/A — no specifiers**. This corroborates rather than contradicts `lane-frontend.md:480`.

### C-12 — R6-8 (operation↔client leaf coupling) is **UNREACHABLE** from this component — explicit disposition
The intake's substantive finding (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:142`, R6-8, TRUE, ADOPT-AS-FACT) concerns `web/src/lib/api.ts:420` `updateVisualization` ↔ `api/routers/visualizations.py:350` `@router.patch("/{slug}")`, and the non-isolability of leaves that embed derived client back-references. **No part of the `FourierMorphSvg` seam touches `lib/api.ts`.** Its data arrives as statically imported JSON (`DarkModeToggle.vue:23-24`) that Vite inlines at build time. The 45-operation surface is not reached, so the R6-8 contract lesson does not bind here. I state this rather than leave it implied, per the brief's requirement to address operation↔client coupling "where reachable" — it is not.

### C-13 — the shape assets are frozen API-decomposition output with no in-tree regeneration path
`web/src/assets/fourier-paths/{sun,moon}.json` (220 KB / 225 KB) are the only two of **seven** JSONs in that directory with an importer. `grep` for a generator across `*.py|*.ts|*.js|*.sh` outside `node_modules` returns only consumers and docs — no script. `git log` shows `9c2086f "feat(web): add Fourier icon generation pipeline for nav icons"`, but no pipeline survives in the tree. The fourier tree's own prior audit already raised the guard question (`docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1700`: morph imports the JSON statically while the shape-extractor regenerates it live — "should the shape-extractor output be validated against the checked-in JSON … to catch drift"), and flagged the five orphan page-named JSONs (`:2274`, ~270 KB each, no importer). Unanswered as of this tree. This is the only sense in which the component has a fourier-API coupling at all, and it is a build-time, unversioned, unguarded one.

---

## 5. SUPERLATIVES (L-18 runs both ways)

### S-1 — the only file in the morph family that is immune to the [P0] tri-package atomic bump
`lane-frontend.md:492` and `:636` name the constellation's most consequential finding: `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` is **one atomic transaction, none can land alone** (keyframes 4.3.0 optional-depends `glass-ui ~4.0.0`; glass-ui 7 peers `keyframes ^6` + `value.js ^4`). Having no imports, `FourierMorphSvg.vue` cannot break under any leg of it. In a repo where the migration is the dominant risk, a component with a provably empty blast radius is a real asset.

**Falsifier (fires — the superlative is granted only in its narrowed form)**: "zero coupling" is **false**. `FourierMorphSvg.vue:30` hardcodes the glass-ui token `var(--accent-red)`, an untyped, unversioned, un-typechecked dependency on glass-ui's palette (that is C-6). What survives is the narrower and still-valuable claim: **zero *module* coupling**, so no specifier rewrite, no type break, no bundler change touches this file.

### S-2 — a correct props-down / no-emits presentational split, validated by two structurally opposite consumers
The component holds no animation state, no composable, and emits nothing. That is what lets a 109-line **stateful** consumer (`DarkModeToggle`, which owns `useFourierMorph`, a phase machine and a colour tween) and a **stateless** one (`MorphShapePreview`, which receives `currentPath` as a prop from `FourierMorphDemo` and re-emits `toggle`) share it without either inheriting the other's machinery.

**Falsifier (survived)**: had the renderer owned `useFourierMorph` — the tempting shortcut, since one of two callers wants exactly that — `MorphShapePreview` would have been forced to instantiate a second animation engine it does not need, or the component would have needed a mode flag. The tree chose the split that makes the reuse free. `MorphShapePreview` importing it (`:48`) while itself holding no morph state is the proof.

### S-3 — `stroke="currentColor"` + `:style="{ color }"` is the correct SVG theming idiom, and it is the one place in this seam that resolves colour in CSS rather than JS
`FourierMorphSvg.vue:6, 11`. Binding `color` and stroking with `currentColor` keeps the token **in the CSS cascade**: `var(--accent-red)` is resolved by the engine, in the right arm, with `light-dark()` and the `.dark` class already applied — and a caller can still opt into inheritance by passing `"inherit"`, or drive it imperatively as `DarkModeToggle.vue:10` does.

This is precisely the mistake `lib/colors.ts` makes and this component avoids. `cssVarToHex` (`colors.ts:22-54`) pulls tokens **out** of CSS into JS, and consequently (a) cannot parse the oklch that glass-ui actually ships (C-5), (b) needs a `MutationObserver` re-resolution pass on every theme flip (`App.vue:13`), and (c) has a documented first-paint race (`useCoeffHover.ts:64`: "`resolveVizColors` has not yet run (mounted before paint)"). `FourierMorphSvg` has none of those three problems, and it has none of them *because of this one line*.

**Falsifier (survived)**: a direct `:stroke="strokeColor"` binding would be one indirection shorter and is the naive choice. It would also break CSS-level theming — `stroke` set inline cannot be overridden by a stylesheet, and `currentColor` inheritance would be unavailable. The extra hop buys the better property.

---

## 6. Carries

| id | to | ask |
|---|---|---|
| C-1 | F.W2 (or any a11y wave) | `aria-hidden="true"` default on `FourierMorphSvg`; `aria-label` on `MorphShapePreview.vue:4`. Two lines, closes a Level-A failure. |
| C-2 | F.W2 | Round the emitted coordinates at `svg-fourier.ts:68` (2 dp saturates a 200-unit box at 0.4 px/unit). One line; ~56 KB → ~12 KB per frame; contract unchanged. |
| C-3 / C-8 | F.W0 asset disposition | Record the asset coordinate convention, or normalise `sun`/`moon` to a shared box; then drop the `viewBox` default rather than have 2/2 callers restate it. |
| C-4 | F.W2 | `watch(isDark, …)` → `morph.setShape` in `DarkModeToggle`, mirroring the `App.vue:13` observer the repo already runs for the palette. |
| C-5 | **F.W2, sequenced behind the value.js parser repair** | Add the oklch + `light-dark()` arms to `cssVarToHex`, or retire `colors.ts` onto value.js — **but only after R1 (`parseCssColor("oklch()")` crash) is closed**. Delete or correct the false comment at `DarkModeToggle.vue:31` now; it costs nothing and is actively misleading. |
| C-13 | F.W0 | Restore or document the icon-generation pipeline; adopt the 2026-06-16 audit's golden-file diff. Disposition the five orphan JSONs (~1.35 MB). |
| — | glass-ui BH inbox (standing relay law) | C-6 is a token-contract observation, not a glass-ui defect — relay as FYI only if the `--accent-red` bridge is in scope for the 4→7 cut. |

**No product source was modified in any repo. This file is the only write.**

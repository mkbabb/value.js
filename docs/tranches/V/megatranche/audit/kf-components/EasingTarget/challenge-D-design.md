served model id: `claude-opus-5[1m]`

# CHALLENGE — `EasingTarget.vue` · axis **D (DESIGN)**

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingTarget.vue` (335 L) + `EasingTarget.css` (193 L)
**Mode** static, read-only, source-derived. No browser tooling, no dev server, no installs. Offline probes ran only against already-installed artifacts (`node -e` reimplementations of shipped token/curve math; an `@import`-closure walker over `node_modules/@mkbabb/glass-ui/dist/styles/index.css`). **Nothing in keyframes.js, glass-ui or value.js was written or mutated. This file is the single write.**
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim carries provenance + a falsifier. **Two of my own drafted findings were killed by their own falsifiers before publication** (§8) — including one I had drafted as a BLOCKER.

| severity | count |
|---|--:|
| **BLOCKER** | **2** |
| MAJOR | 9 |
| MINOR | 11 |
| INFO | 4 |
| **defects total** | **26** |
| superlatives (L-18) | 6 |

**Verdict in one line.** The concept is the best thing in the keyframes.js demo — 28 specimens racing one clock is the right pedagogy, and the imperative-painter seam that delivers it is genuinely well engineered. The *rendering* of that concept is broken in two independent places: the graphic the component exists to show sits at **1.59 : 1**, and the vendor stylesheet carrying the selected-state wash **is outside the cascade the demo loads**, so the component's CSS is written as a supplement to a rule that never paints.

---

## 0. Read set (whole-file, read-only)

Subject + `EasingScene.vue`, `EasingSidebar.vue`, `useEasingDemo.ts`, `easingKeys.ts`; `CopyButton.vue`; `timingCurveUtils.ts`, `easingGroups.ts`, `animationDescriptions.ts`; `demo/styles/{style,design-idioms,font-roles.json}`; `demo/vite.config.ts`, `package.json`; `value.js/src/easing.ts`; and the **installed** glass-ui 7.0.0 dist (`chip-*.js`, `toggle-group-*.js`, `fading-scroll-*.js`, `styles/**`, `glass-ui.css`) cross-read against the glass-ui **source** tree (`glass-chip.css`, `accent-tone.css`, `glass/ladder.css`, `typography/{utilities,scale,semantic}.css`, `tokens/*`, `glass/a11y-fallback.css`, `components/toggle-group/ToggleGroup.vue`).

**Corpus folded** — `formation/keyframes/lane-frontend.md`: **F-1** (glass-ui phantom dep: absent from `package.json` *and* the lock; 7.0.0 only in `node_modules`) — **extended** at D-M-3(c); **S-7** (CopyButton AMBER) — folded at D-m-7; **§6.5** (PRM census, incl. `EasingTarget.css:48`, `EasingTarget.vue:234`) — extended at D-M-4; inventory row L238. No lane finding is contradicted.

**Reconciliation with the prior `challenge-D-design.md` at this path** (same slug/axis/model, superseded by this file) — §9. Its lead BLOCKER is **confirmed for `Chip` and refuted for `ToggleGroup`**, and its specimen count (33) is a transcription of a stale source comment; the tree says **28**.

---

## 1. BLOCKERS

### D-B-1 · The graphic the component exists to show is below the 3:1 floor **and** hidden from AT. Both horns fail.

`EasingTarget.vue:94` puts `aria-hidden="true"` on `.tile-stage`, removing the sparkline, rail, ticks and ball from the accessibility tree; each tile announces as its bare identifier. Correct **iff** the stage is decorative. The component asserts the opposite three times:

- `:8-10` — "a sparkline portrait … **The comparative read IS the pedagogy.**"
- `:262-263` — "Reduced motion: no sweep … **the sparklines ARE the preview (the portrait carries the curve)**."
- `EasingTarget.css:118-119` — "The static sparkline — **the curve's portrait (value vs time)**".

So it is content, and WCAG 2.2 SC 1.4.11 (3:1) applies. Computed from shipped tokens (§7):

| graphic | declaration | light | dark | floor |
|---|---|---|---|---|
| sparkline stroke (idle) | `css:129` `color-mix(in srgb, var(--foreground) 22%, transparent)` | **1.59:1** | **1.87:1** | 3:1 |
| sparkline stroke (**selected** — "the portrait inks up") | `css:174` `color-mix(in srgb, var(--ball-tone) 65%, transparent)` | **2.32:1** | **2.71:1** | 3:1 |
| origin/terminus ticks ("the departure is **LEGIBLE**", css:137) | `css:150` same 22% ink | **1.59:1** | **1.87:1** | 3:1 |
| rail | `css:140` `--rail-tint: 16%` of `--ball-tone` | **1.23:1** | **1.33:1** | 3:1 |

The fork is closed on both horns. **Decorative** ⇒ a low-vision or AT user gets 28 identifiers and nothing else — and under PRM, nothing at all (D-M-4). **Content** ⇒ four graphics fail 1.4.11 and the aria-hiding additionally fails 1.1.1. The only element clearing the floor is the ball (4.63 / 5.77) — the one thing PRM stops.

This is aggravated, not caused, by D-B-2: with the vendor's selected wash absent from the cascade, the 2.32:1 sparkline is carrying *more* of the selection signal than the design assumed.

**Falsifier** — a rendering where the sparkline measures ≥3:1 against its composited plate (i.e. my 22%-over-plate model is wrong; e.g. an ancestor re-points `--foreground` on the chip the way `glass/ladder.css` re-points `--muted-foreground` — no such rule exists in the loaded closure), **or** a text/AT surface in the mounted scene conveying each curve's shape. `EasingSidebar.vue` was read whole: picker, one conditional sentence (`:47-48`), duration slider. There is none.

---

### D-B-2 · `Chip`'s stylesheet is outside the cascade the demo loads: the cells lose `--radius-card`, and the selected state loses its wash, edge and ink

The demo's only glass-ui style entry is `@import "@mkbabb/glass-ui/styles"` (`demo/styles/style.css:3`) → `exports["./styles"] = "./dist/styles/index.css"`. I walked that file's transitive `@import` closure: **108 files**. It reaches `glass/ladder.css`, `glass/accent-tone.css`, `glass/glass-capsule.css`, `../glass-ui.css` and `./components.css` — and it does **not** reach `styles/glass/glass-chip.css`. An exhaustive scan of all **124** CSS files in `dist` finds the string `glass-chip` in **exactly one file**: `styles/glass/glass-chip.css`, the unreachable one. `dist/glass-ui.css` (70 109 B, and *in* the closure) does **not** contain it. `dist/styles/glass.css` imports 18 `glass/*.css` siblings; `glass-chip.css` is not among them. The JS entries carry no CSS side-effect (`chip-6ysLmScu.js` imports `class-names`, `useAccentTone`, `vue`, `reka-ui` only).

Tailwind *utilities* on the chip survive (`styles/index.css` ends with `@source "../*.js"`, globbing `dist/*.js`, so `flex-col px-2 py-2.5 gap-1.5 text-micro inline-flex` are generated). What dies is every *component* rule:

| lost rule | design consequence |
|---|---|
| `.glass-chip--cell { border-radius: var(--radius-card) }` | `.glass-capsule` **does** load and sets `border-radius: var(--radius-pill)` = **9999px** (`glass-capsule.css`; `theme/radius.css`: `--radius-pill: 9999px`, `--radius-card: var(--radius-2xl)` = **1rem**). The 28 ≈150×98 px cells render as **stadium lozenges**, not cells — a 16 px corner replaced by a 49 px one |
| `.glass-chip[data-mode="selectable"][data-state="on"] { background-color: var(--accent-band); border-color: var(--accent-edge); color: var(--accent-ink) }` | **the selected specimen gets no wash, no edge, no vendor ink.** `EasingTarget.css:169-172` asserts "ToggleChip's `data-state="on"` carries the glass wash (primary 15% = the violet authority). The specimen **adds**: the portrait inks up, the name takes the tone." Against the shipped cascade the first sentence is false and the word "adds" is load-bearing and wrong — the two demo rules at `css:173-180` are not a supplement, they are the **entire** selected state |
| `.glass-chip { background-image: linear-gradient(var(--glass-fill-tinted), …) }` + the `::after` accent flood + `--chip-tint-floor` | no tinted plate, no selection flood |
| `.glass-chip--interactive { scale: calc(1 + 0.12 · --chip-flood-t · --motion-weight) }` | the press-pop never fires |
| `@media (pointer: coarse) { .glass-chip--interactive { min-* : 2.75rem } }` | **the 44 px touch floor for all 28 tiles never loads** |
| `@media (prefers-contrast: more) { … border-color: foreground 28% }` | the high-contrast provision never loads |

`accent-tone.css` *is* loaded, so `--accent-band` / `--accent-edge` / `--accent-ink` are all **defined and never read** — the channels exist, the consumer of them does not.

**Falsifier** — any of: (a) an `@import` chain reaching `glass/glass-chip.css` that my walker missed (it follows quoted `@import` only; a `url()` form, or a JS-side `import "./x.css"` inside a nested chunk, would evade it — I checked the chip chunk's import list directly); (b) a build step injecting `dist/glass-ui.css` separately — `grep -rn "glass-ui.*\.css" demo/` returns only `style.css:3` and `:9`, and that file lacks the rules anyway; (c) `exports["./styles"]` resolving elsewhere — it is the literal string `./dist/styles/index.css`. Any one of these kills it.

**Extends census F-1.** F-1 is *declared-vs-installed*. This is the same shape one layer down: *imported-vs-styled*. F-1's remedy (declare `@mkbabb/glass-ui: 7.0.0`, regenerate the lock) does **not** fix D-B-2.

---

## 2. MAJOR

### D-M-1 · The header's "COMPLETE re-parseable literal" is not the curve on screen — 7 of 28 specimens, by up to 16.3% of the rail

`:16-18` promises "its COMPLETE re-parseable literal (Fira Code + CopyButton, never truncated)". But `value.js/src/easing.ts:166-171` resolves `DIRECT_EASINGS` **before** `PRESETS`, while `:213-215` takes the `isBezierEditable` branch for every name in `NAMED_EASING_BEZIER`. For the 8 names in both tables the tile paints the analytic function and the header hands out the bezier approximation:

| specimen | painted | header literal + CopyButton | max ∣Δ∣ | px on a 136 px rail |
|---|---|---|---|---|
| `ease-in-out-circ` | analytic circ | `cubic-bezier(0.785, 0.135, 0.15, 0.86)` | **0.1634** | **19.6 px** |
| `ease-in-out-expo` | analytic expo | `cubic-bezier(1, 0, 0, 1)` | **0.1339** | 16.1 px |
| `ease-out-expo` | analytic | `cubic-bezier(0.19, 1, 0.22, 1)` | 0.0370 | 4.4 px |
| `ease-in-out-cubic` | analytic | `cubic-bezier(0.645, 0.045, 0.355, 1)` | 0.0247 | 3.0 px |
| `ease-out-cubic` | analytic | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 0.0222 | 2.7 px |
| `ease-in-out-quad` | analytic | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | 0.0192 | 2.3 px |
| `ease-in-out-sine` | analytic sine | `cubic-bezier(0.445, 0.05, 0.55, 0.95)` | 0.0175 | 2.1 px |
| `linear` | — | — | 0.0000 | identical — not a defect |

The comment authorising the branch is falsified **by its own example**: `:217-219` reads "An engine-named curve (**ease-in-out-sine**, ease-in-bounce, step-start …): the name IS the literal." `ease-in-out-sine` is in `NAMED_EASING_BEZIER` (`animationDescriptions.ts:26`), so it never reaches that line — it is caught four lines above and rendered as a bezier that diverges from the animation on screen.

**Falsifier** — show `namedEasing("ease-in-out-circ")` returns the `PRESETS` bezier (`easing.ts:167-168` says otherwise). Or rule that the approximation *is* intended — then this downgrades to a prose defect: the header must say "≈", and `:217-219` must stop naming a bezier-table curve as its counter-example.

### D-M-2 · "A curve is always selected" is false by two reachable paths, and the fix seam is exported and ignored

`:201-206` / `:89-92` assert it. **Path A (its own filter):** select `ease-in-bounce` (Bounce), press `Sine` → no tile matches, **zero pressed tiles**, while the `<h2>` still reads `ease-in-bounce`. No affordance says the selection is off-screen. **Path B (the sidebar):** `EasingSidebar.vue:210` → `demo.updateBezierPoints` → `useEasingDemo.ts:265-271` sets `currentEasingName = "cubic-bezier"`, and `cubic-bezier` is the sole member of `Custom`, which `:158` **excludes from the specimen set by construction**. So throughout the bezier-authoring gesture the drawer shows no selection and no ball responds to the edit.

The repair already exists and is dropped: `useEasingDemo.ts:116-118` computes `currentFamily` and exports it at `:387`; `EasingTarget.vue` never reads it. **Falsifier** — a path re-pointing `familyFilter` on selection (`:161` is a bare `ref("All")` written only by `onFamilyChange`), or `Custom` re-entering `SPECIMEN_GROUPS`.

### D-M-3 · 41 tab stops, two of them nameless roleless `<div>`s, and 28 toggles impersonating a single-select

**(a) Nameless focusable scroll regions.** The installed `FadingScroll` renders `tabindex="0"` **unconditionally** but emits `role` only when a label is supplied (`dist/fading-scroll-DKsoe_vh.js`: `o = computed(() => !!(t.ariaLabel || t.ariaLabelledby))`, `role: o.value ? "region" : void 0`, `tabindex: "0"`). `:42` and `:76` pass **neither** → two focusable elements with no role and no name (WCAG 4.1.2). The vendor ships the seam; the component instead put `role="group" aria-label="Easing curve specimens"` on the *inner* `.specimen-grid` (`:80-81`), naming the wrong box and leaving the focusable one mute.

**(b) 28 toggles where a ToggleGroup belongs.** `Chip mode="selectable"` renders reka's `Toggle` → `<button aria-pressed>`. Twenty-eight sit in a plain `role="group"`: nothing conveys mutual exclusivity, no arrow-key navigation, 28 tab stops in a scrolling drawer. The component **imports `ToggleGroup`/`ToggleGroupItem` on line 139** and uses the correct pattern for the 10 filter pills one element up. One file, one interaction, two models — and the tiles got the worse one.

**(c) The filter's roving focus is off in the shipped artifact.** `vite.config.ts:37-59` declares **no** alias for `@mkbabb/glass-ui` and `package.json` declares no dependency, so the demo renders `node_modules/@mkbabb/glass-ui@7.0.0/dist`. That build declares `rovingFocus: { type: Boolean }` with **no default** and forwards the prop bag to `ToggleGroupRoot`; Vue resolves an absent `Boolean` prop to `false`, so reka receives explicit `rovingFocus: false` (same for `loop`). The glass-ui **source** has `withDefaults(…, { rovingFocus: true, loop: true })` (`src/components/toggle-group/ToggleGroup.vue:50-54`). **This extends F-1**: the phantom dependency is not merely unreproducible, it is already *divergent* from the source it is nominally built from — and the divergence costs this component's filter its roving focus (10 tab stops instead of 1).

Total: 1 + 10 + 1 + 28 + 1 = **41 tab stops in one card**. **Falsifiers** — (a) dies on a label I missed (both `FadingScroll`s carry only `axis` + `class`); (b) dies if `aria-pressed` alone conveys single-select (it does not); (c) dies if reka ignores a falsy `rovingFocus`, or if glass-ui resolves outside `node_modules` — `UNPROVEN-NEEDS-LIVE` for the live tab count only; the prop chain is decidable from the two cited files.

### D-M-4 · Reduced motion deletes the scene instead of calming it — and silently kills the transport

Under PRM the component never registers a painter (`:304-307`) and calls `paintRestState()` (`:263-267`), pinning every ball at `fn(1)`. For **all 28** specimens `fn(1) = 1` (including `steppedEasing(4,"jump-end")` and both `step-*`, which `easing.ts:142` clamps to 1). So **all 28 balls sit at the identical x**. The stated pedagogy — "all balls depart together, arrive per their curve … The comparative read IS the pedagogy" (`:8-10`) — is not reduced, it is **deleted**; what remains is the 1.59:1 sparkline of D-B-1.

Worse, the transport keeps its affordance and loses its effect. `EasingScene.vue:94-109` mounts the standard `PlaybackRibbon` scrubber; `useEasingDemo.ts:325-341` routes a paused scrub through `repaintDots()`. Under PRM the registry is empty, so the scrubber slides and **nothing moves**. PRM asks to suppress *automatic* motion; a user dragging a scrubber is explicitly-requested motion. The two are conflated, leaving a dead control on screen. **Falsifier** — a PRM branch that repaints on scrub. `wirePainter` returns at `:306` before `registerDotPainter`; `measureRailWidth` (`:269-274`) and the IO callback (`:297`) both gate on `reducedMotion`. There is none.

### D-M-5 · The header collapses on every selection: ~7.6 px (narrow) to ~19.4 px (1920 px) of jitter, twice per press

`:23-30` wraps the `<h2>` in `<Transition mode="out-in">` keyed on the curve name, so for ~140 ms the `<h2>` is **absent from the DOM**. `.gallery-id` (`css:19-25`) is a wrapping flex row with `align-items: baseline` and **no reserved height**; `.gallery-header` is `align-items: flex-end`; the drawer is `flex-1`.

`text-display` → `--type-display-1` `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` × `line-height: 1.05` → **27.2 px** floor / **44.0 px** @1920. Surviving `.literal-text` is `text-mono-small` → `--type-small` × `--type-leading-small: 1.4` → **19.6 / 24.6 px**. Collapse = **7.6 px** narrow, **19.4 px** @1920 — header shrinks, filter row rides up, drawer grows, then all of it reverses. 280 ms round trip, on the primary interaction. **Falsifier** — a `min-height` on `.gallery-id`/`.specimen-name`, or a `mode`-less/absolute transition. None exist. `UNPROVEN-NEEDS-LIVE` for the exact pixels (a wrapping literal *increases* the delta); the mechanism is decidable.

### D-M-6 · Selection is carried by colour alone, at ≤ 4.63 : 1, plus a 12 px weight bump

Given D-B-2, the entire selected state is `css:173-180`: sparkline stroke → `--ball-tone` 65%, `.tile-name` → `--ball-tone` + `font-weight: 600`. No wash, no border delta, no shape change, no icon, no check. The **only** non-colour cue is a 400→600 weight step at 12 px — which is exactly the cue WCAG 1.4.1 (Use of Color) exists to reject as sole carrier.

The ink measures **4.63 : 1 (light) / 5.77 : 1 (dark)** against `--card`. That clears AA by **0.13** in the light arm — and `--card` is the *optimistic* baseline: the chip's actual plate is `.glass-capsule`, a warm-lifted surface mixing `oklch(0.88 0.1 75)` at **16%** into a floating-glass fill (`glass-capsule.css`; `tokens/glass-fx.css`: `--glass-capsule-warm`, `--glass-capsule-warm-floor: 16%`). Mixing a *lighter* warm into the plate raises its luminance, which **lowers** contrast against the dark violet ink in light mode. So the light arm's true ratio is **≤ 4.63 : 1** with a 0.13 margin — it can cross the floor.

**Falsifier / SS-13 instruction** — sample the computed background of `.specimen-tile[data-state="on"]` and the computed `color` of its `.tile-name` in a light-theme live build and compute the ratio. ≥4.5:1 ⇒ this drops to the 1.4.1 finding alone (still MAJOR); <4.5:1 ⇒ it is an AA text failure. I do **not** claim the failure statically — the glass plate needs a real composite. `UNPROVEN-NEEDS-LIVE` on the ratio; the single-channel conveyance is decidable now.

### D-M-7 · The pressed, violet-inked `steps` tile shows a different curve than its own headline

`:175-178` pins the tile to `steppedEasing(4, "jump-end")` unconditionally; `:211-213` renders the header literal from the **live** `demo.stepOptions`. The comment at `:172-174` declares this ("Parameterized entries get honest static defaults … the selected curve's live parameters ride the header literal + the sidebar editor, not the tile") — declaring a mismatch does not make it honest. It is reachable: `EasingSidebar.vue:186-193` writes `demo.stepOptions` from the picker's native steps mode. Set 8 steps and the drawer shows a tile that is *pressed*, *inked violet*, *named* `steps`, racing a **4-step** staircase, directly beneath an `<h2>` + literal reading `steps(8, jump-end)`. Same class as D-M-1, at the moment of authoring. **Falsifier** — remove the sidebar's steps editor (it exists), or show the tile re-deriving from `stepOptions` (`fnForCurve` at `:175` takes only a name).

### D-M-8 · No forced-colors arm exists in the demo, and the chip's provisions are the ones that don't load

`grep -rn "forced-colors" demo/` → **zero** sites. glass-ui ships a WHC skin (`glass/a11y-fallback.css`) restoring structure for `.glass-material, .glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card, .glass-drawer` — the `.glass-chip`/`.glass-capsule` family is **not in the list**, and the chip's own `@media (forced-colors)` provisions live in the unreachable `glass-chip.css` (D-B-2). Under `forced-colors: active`, `background-color`/`color`/`box-shadow` on the tiles flatten to system values; the surviving differentiator is again `font-weight: 600` alone. Meanwhile SVG `stroke` is **not** among the forced properties, so `.tile-sparkline path` keeps its authored `color-mix(…, var(--foreground) 22%, …)`: in a light-theme document under a forced *dark* palette the sparkline paints near-black over a forced-black canvas. **Falsifier** — a forced-colors rule reaching `.glass-chip`/`.glass-capsule`/`.tile-sparkline` in the *loaded* closure (none), or a demonstration that the engine forces `stroke` (the Color Adjust forced-property list excludes `fill`/`stroke`). `UNPROVEN-NEEDS-LIVE` for the rendered outcome.

### D-M-9 · 16 × 16 px copy target

`css:68-75` sizes the CopyButton to `width: 1rem; height: 1rem; flex: none`, and `CopyButton.vue:5` adds `p-0 m-0` → a **16 × 16 CSS px** target against WCAG 2.2 SC 2.5.8 (24 × 24, AA). The comment (`css:69-71`) explains why it is intrinsically boxed, not why 16 px. Compounding: the chip's coarse-pointer 2.75 rem floor is itself lost (D-B-2), so no target in this card has a touch guarantee. **Falsifier** — SC 2.5.8's Spacing exception: if a 24 px circle centred on `.literal-copy` intersects no other target's bounding box at every breakpoint, this drops to MINOR. It is marginal at best on the wrapped narrow header (`.gallery-header` row-gap 0.5 rem = 8 px; each circle overhangs its box by 4 px → tangent). `UNPROVEN-NEEDS-LIVE` for the exception; the 16 px is decidable.

---

## 3. MINOR

**D-m-1 · Caps tracking on lowercase identifiers.** `text-mono-caption` is a CAPS *register*: `text-transform: uppercase` **and** `letter-spacing: var(--type-tracking-caps)` = 0.1em (`typography/utilities.css:42-47`; `tokens/scheme-motion.css:77`). `.tile-name` (`css:183-190`) opts out of `text-transform` only, leaving 0.1em caps tracking on lowercase hyphenated identifiers at 12 px. Half the register was rejected; the half that hurts lowercase was kept. *Falsifier*: a `letter-spacing` reset — none in `EasingTarget.css`.

**D-m-2 · The ball size is encoded three times, none derived.** JS `BALL_SIZE = 14` (`:228`), CSS `--ball-size: 14px` (`css:163`), tick offsets `6.5px` (`css:153,156` = 14/2 − 0.5 for the tick's own width). The idiom's contract says "`--ball-size` is the seam EasingTarget reads via `getComputedStyle`" (`design-idioms.css:163`) — **it does not**. The ticks could be `calc(var(--ball-size)/2 - 0.5px)`. *Falsifier*: a `getComputedStyle` read of `--ball-size` — none.

**D-m-3 · Falsified factual comments.** (i) `css:135-136` justifies the 1 px rail because "**33 rails** at 2px read as a grid of rules" — the set is **28** (`easingGroups.ts`, non-`Custom`: 5+3+3+4+3+3+3+1+3). (ii) `css:169-171` says the wash is "primary **15%**": the vendor value is `max(18%, --chip-tint-floor + 10%)` = 22% light / 25% dark — *and* the rule does not load at all (D-B-2). Both numbers wrong, and the second describes a rule that never paints.

**D-m-4 · A token restated as a magic number.** `.specimen-name { line-height: 1.05 }` (`css:28`) duplicates `--type-leading-display: 1.05` (`scheme-motion.css:63`), which `text-display` already applies (`semantic.css:134`) — the heading silently opts out of the token.

**D-m-5 · `content-visibility: auto` imposes paint containment on a vendor glass component.** `css:104-108`. It applies layout + style + **paint** containment at all times (not only when skipped), so descendants — including the ball's `0 2px 10px` glow — are clipped to the tile's padding box. Related: `railWidth` is measured from `tileSnapshot[0].stage` only (`:269-274, 302-303`); if a resize lands while tile 0 is scroll-skipped, `clientWidth` may read 0 → `maxX ≤ 0` → **every ball snaps to the origin and stays** (the IO callback repaints but never re-measures). *Falsifier*: show the engine returns laid-out geometry for descendants of a skipped subtree, or add a per-resize re-measure. `UNPROVEN-NEEDS-LIVE`.

**D-m-6 · 28 permanently promoted compositor layers.** `will-change: transform` on `.tile-ball` (`css:166`) applies to every tile in the `v-for`. `will-change` is a transient hint; on an unbounded list it is a standing cost. Mitigated, not removed, by the `content-visibility` gate.

**D-m-7 · The copy button is the only control here without the app's focus ring.** Every glass control carries `focus-ring` (chipVariants' interactive string; `toggle-group__item`); `CopyButton.vue:5` is `cursor-pointer relative inline-block text-foreground p-0 m-0 bg-transparent border-0` — no `focus-ring`, so it falls to the UA outline instead of `--focus-ring-shadow` (`design-idioms.css:76-79`). (Folds census **S-7**, which flagged CopyButton on a different ground.)

**D-m-8 · The scene withholds prose it already owns.** `easingGroups.ts:18-25` gives **every** curve a human description ("slow start, fast end", "overshoots, settles", "Hermite interpolation"). `visibleCurves` (`:191-197`) maps `name`/`fn`/`path` and drops `description`; no tooltip, `title` or `aria-description` carries it, and the sidebar does not show it. A pedagogical gallery with 28 unlabelled portraits is discarding its own copy. *Falsifier*: a consumer of `item.description` in the mounted scene — `useEasingDemo.ts:120-131` also maps name/fn only.

**D-m-9 · A comparison filter that can return a set of one.** `Bounce` holds exactly one item (`easingGroups.ts:87-90`): pressing it yields a single 150 px tile alone in a full-width drawer, with no sparse-state treatment — a "comparative read" with nothing to compare.

**D-m-10 · Filter changes are silent to AT.** Replacing 28 tiles with 3 fires no announcement; `role="group"` (`:80-81`) carries no `aria-live` and there is no status sink — the pattern this codebase already knows (`CopyButton.vue:15`).

**D-m-11 · Two spacing systems in one component.** Tailwind scale in the template (`gap-4 px-4 py-4 lg:px-6`, `:13-14`) alongside off-scale raw values in the stylesheet: `0.45rem`, `0.875rem`, `6.5px`, `9px`, `2px`, `0.125rem`, `3.25rem`, `104px`, `150px`, plus `18%`/`64%` insets. No modular scale governs the second set; the Aristotelian proportion is asserted in prose and encoded nowhere a future edit can hold.

---

## 4. INFO

**D-i-1 · The comment register is doing work verification should do.** 20% of the `.vue` and 18% of the `.css` are commentary in an oracular voice ("THE SPECIMEN DRAWER IS THE SCENE", "the comparative read IS the pedagogy", "the departure is LEGIBLE", "at 1px they recede to ruled paper", "every runner is equal", "honest by construction"). Five of its load-bearing claims are falsified above: the rail count and the band strength (D-m-3), the name-is-the-literal branch (D-M-1), "a curve is always selected" (D-M-2), and "ToggleChip's data-state carries the glass wash" (D-B-2). The prose is not decoration — it is the only place these invariants are recorded, and here its confidence is inversely correlated with its accuracy.

**D-i-2 · `<h2>` for a value readout.** `:24-29` makes the curve identifier a document heading, so a screen reader's heading list reads `ease-in-out-sine`. It is a promoted readout, not a section title.

**D-i-3 · Intrinsic-size drift.** `contain-intrinsic-size: auto 104px` (`css:106`) vs a computed ≈98 px tile (stage 52 + gap 6 + name 16.2 + `py-2.5` 20 + border 2). `auto` remembers the rendered size, so drift affects only never-rendered rows.

**D-i-4 · The race is physical, the grid is logical.** `translateX(+x)` (`:257`), `left: 0` (`css:165`), `::before { left }` / `::after { right }` (`css:152-157`) are physical; `grid-template-columns: repeat(auto-fill, …)` flows logically. Under `dir="rtl"` the tiles reorder right-to-left while every ball departs from the left. No `dir` surface exists (`grep` for `dir="rtl"` / `[dir=` → 0 hits), so this is latent.

---

## 5. SUPERLATIVES (L-18, the other way)

**D-S-1 · The origin/terminus ticks are sub-pixel exact, and derived from the right quantity.** `css:152-157` places 1 px ticks at `left: 6.5px` / `right: 6.5px`, putting each tick's **centre** at x = 7 and railWidth − 7. Given `--ball-size: 14px` and `maxX = railWidth − BALL_SIZE` (`:250-251`), the ball's centre at phase 0 is exactly 7 and at `fn(1) = 1` exactly railWidth − 7. The comments state the intent and the arithmetic delivers it to the half-pixel. This is the class of thing that is almost always off by `BALL_SIZE/2`, and here it is not.

**D-S-2 · The idle label ink rides the vendor's on-glass register instead of a hardcoded colour.** `.tile-name { color: var(--muted-foreground) }` (`css:189`) resolves, inside the chip, through the **loaded** `glass/ladder.css` rule `:where(.feedback-tone, .glass-capsule) { --muted-foreground: var(--on-glass-muted-strong) }` — the register glass-ui calibrated *specifically* for "the selected-glass capsule CHIPS" whose plate "composites BRIGHTER". Measured **8.19 : 1** light / **9.07 : 1** dark. The consumer wrote a token reference and inherited the vendor's whole calibration. Notably this is the one selected/idle ink path the component did **not** override, and it is the one that passes comfortably.

**D-S-3 · The `family-row` fix has exactly the right posture.** `:42-49` + `css:85-89`. The bug (a centred vendor group under overflow strands its left edge past the scroll origin, making "All" unreachable on phones) is *diagnosed*, not patched; the fix removes the overflow condition (`width: max-content`) rather than reaching into the vendor root with `:deep()`; and the strip-posture ask is relayed to glass-ui as BG-12. Three things consumer-side fixes usually get wrong, done right in six lines.

**D-S-4 · The mono register is contract-marked at the call site.** `data-register="code"` on the literal (`:31`) and the tile name (`:114`) is precisely clause (c) of the ruled mono contract — "an explicit identifier chip marked `data-register="code"` (curve names, CSS keywords …) — reviewed exceptions, **self-documented at the call-site**" (`demo/styles/font-roles.json:82`). The attribute is inert in CSS, which is correct: it is a census marker, and it discharges T.D4 exactly as written.

**D-S-5 · The design refuses to differentiate the ball, and that judgement is correct.** `css:169-172`: "The BALL stays identical — the comparative race reads only when every runner is equal." A weaker design would tint the selected ball and force the eye to read two variables at once. The judgement is sound; D-M-6 is a failure of *execution* on the channel this judgement chose, not of the judgement.

**D-S-6 · The tile's accessible name is exactly the curve name.** `aria-hidden="true"` on `.tile-stage` (`:94`) keeps path data, rail and ball out of the accessibility tree, so each of 28 buttons announces as its identifier rather than as a soup of graphics. Correct as far as it goes — D-B-1 concerns what was never provided on the other side of that decision, not this one.

---

## 6. What would change my mind fastest (SS-13 order)

1. **D-B-2** — inspect a tile in a live build: a 9999 px corner radius and no background delta on the pressed tile confirms it; a 1 rem corner with a violet wash kills it. One glance.
2. **D-M-6** — sample computed `background` + `color` on `.specimen-tile[data-state="on"] .tile-name`, light theme. Decides the AA question I deliberately did not settle.
3. **D-B-1** — one contrast read on `.tile-sparkline path`.
4. **D-M-3(c)** — tab the 10 filter pills. One stop kills it; ten confirms it.
5. **D-M-5** — record header `getBoundingClientRect().height` across a tile press.
6. **D-M-2 / D-M-7** — two clicks each (filter away from the selection; set the picker to 8 steps).
7. **D-m-5** — scroll to the bottom, resize, look at the balls.

Items 4–7 are ordinary interactions, not instrumented probes.

---

## 7. Computation transcript (reproducible)

**Contrast.** WCAG 2.x relative luminance; `hsl()` per CSS Color 4; `oklch()` → linear sRGB via the standard OKLab matrices, per-channel gamut-clipped; `color-mix(in oklab, A, B p%)` as the componentwise OKLab lerp; `color-mix(in srgb, C p%, transparent)` composited over the named backdrop at α = p.

Tokens as shipped: `--card` `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` (`tokens/color-radius.css:71`, `tokens/dark-arm.css:86`) · `--foreground` `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` · `--accent-kf` = `--color-progress` = `--ball-tone` = `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` (`demo/styles/style.css:130,163`; `EasingTarget.css:7`) · `--on-glass-muted-strong` `light-dark(hsl(28 28% 28%), hsl(36 13% 81%))` (`tokens/on-glass-fg.css:36`, `tokens/dark-arm.css:254`).

```
card L #fdf5ec    card D #352a22
accent L #7e5acc  accent D #be95ec

selected .tile-name  = --ball-tone over --card      light 4.63:1   dark 5.77:1   [≤, see D-M-6]
idle .tile-name      = --on-glass-muted-strong      light 8.19:1   dark 9.07:1
sparkline / ticks    = --foreground 22%             light 1.59:1   dark 1.87:1
selected sparkline   = --ball-tone 65% over card    light 2.32:1   dark 2.71:1
rail                 = --ball-tone 16%              light 1.23:1   dark 1.33:1
ball (opaque)        = --ball-tone vs card          light 4.63:1   dark 5.77:1
```

**Curve divergence (D-M-1).** `DIRECT_EASINGS` + `PRESETS` re-implemented verbatim from `value.js/src/easing.ts:17-114` (including the 24-iteration bisection `solveBezierX`); `NAMED_EASING_BEZIER` verbatim from `animationDescriptions.ts:16-49`; specimen list = `EASING_GROUPS` minus `Custom`. Sampled at 1001 points on [0,1]; `max |direct(t) − CubicBezier(quad)(t)|`, scaled by `maxX = 136 px` (`150 − 2·8 chip px-2 − 14 ball`). Result table in D-M-1; **specimen count = 28**.

**Cascade closure (D-B-2).** Walker followed quoted `@import` from `dist/styles/index.css` → **108 files** (reaches `glass-ui.css`, `components.css`, `glass/ladder.css`, `glass/accent-tone.css`, `glass/glass-capsule.css`; does **not** reach `glass/glass-chip.css` or `components/toggle-group/styles.css`). Exhaustive scan of all **124** dist CSS files: `glass-chip` appears in exactly one file (the unreachable one); `toggle-group__item` appears in two — the unreachable `components/toggle-group/styles.css` **and** `glass-ui.css`, which **is** in the closure.

**Type metrics.** `--type-caption` `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` → 12.0 px @≤375, 15.4 px @1920 (so WCAG large-text is never reached, at any width) · `--type-small` `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` × `--type-leading-small: 1.4` → 19.6 / 24.6 px · `--type-display-1` `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` × 1.05 → 27.2 / 44.0 px (`typography/scale.css:86-123`; `tokens/scheme-motion.css:56,63,77`).

Scripts: `scratchpad/contrast.mjs`, `scratchpad/curves.mjs` (session scratchpad).

---

## 8. Findings I killed with their own falsifiers

**K-1 · "The selected label discards the vendor's contrast-solved ink and lands at 3.48 : 1" — drafted as a BLOCKER, killed.** I had computed `.tile-name` at `--ball-tone` against the selected accent band (`color-mix(in oklab, --card, --primary 22%)`) → 3.48 : 1 light / 3.77 : 1 dark, versus the vendor default `--accent-ink` → `--foreground` at 12.18 / 7.30, and framed it as a self-inflicted regression over a passing vendor rule. **The cascade walk killed it**: `glass-chip.css` never loads (D-B-2), so there is no band to measure against and no `--accent-ink` rule to discard. The real backdrop is the `.glass-capsule` plate and the ratio is ≈4.63 : 1. What survives is the weaker, honest D-M-6 — and the direction of the error is instructive: I had assumed the vendor rule I could read was the vendor rule that ships.

**K-2 · "The selected tile's `scale` pop desynchronises `railWidth` from the painted geometry."** `.glass-chip--interactive` applies `scale: calc(1 + 0.12 · --chip-flood-t · --motion-weight)`, so a pressed tile grows ~7.4% while `railWidth` is measured with `clientWidth`. **Killed twice**: `scale` is a transform, so `clientWidth` returns the unscaled layout width and the ball's `translateX` scales with the tile — the geometry stays internally consistent; and the rule does not load at all (D-B-2).

**Not killed, but deliberately not claimed:** whether D-M-6's light arm actually fails AA. The glass plate needs a real composite; §6 item 2 is the check.

---

## 9. Reconciliation with the superseded `challenge-D-design.md` at this path

That file (same slug, axis and model) is superseded by this one. Where it was right it is folded above; two of its claims do not survive the tree:

- **Its D-1 is CONFIRMED for `Chip`** (folded as D-B-2, with the closure sizes, the 124-file exhaustive scan, and the `--radius-pill` 9999px / `--radius-card` 1rem values). Its diagnosis of the cascade break is correct and is the most important finding on this axis.
- **Its D-1 is REFUTED for `ToggleGroup`.** It asserts the family filter has "no track" and "no pressed appearance" because `components/toggle-group/styles.css` is outside the closure. That file is indeed unreachable — but the same rules are **also** present in `dist/glass-ui.css`, which **is** in the closure via `@import "../glass-ui.css"` at `styles/index.css`. Verified rules: `.toggle-group[data-type=single]{ border-radius: calc(var(--radius-pill) + .25rem); background: var(--glass-bg-quiet); backdrop-filter: … }` and `.toggle-group__item[data-state=on]{ border-color: color-mix(in oklab, var(--primary) 28%, transparent); background: var(--accent); color: var(--accent-foreground); box-shadow: var(--shadow-sm) }`. **The filter has both a track and a pressed state.** The corresponding rows of its table, and its dependent finding about `size="sm"` having no declaration block, fall with it.
- **Its specimen count of 33 is wrong; the tree says 28.** `EASING_GROUPS` minus `Custom` is 5+3+3+4+3+3+3+1+3 = 28. 33 is the figure asserted by the stale source comment at `EasingTarget.css:135-136` — which is itself one of the defects on this axis (D-m-3). Any per-tile arithmetic in that file (layer counts, grid geometry) is overstated by ~18%.

The general lesson, and the reason K-1 died: on this component, **the vendor rule you can read is not necessarily the vendor rule that ships**. Every claim touching glass-ui styling must be settled against the loaded `@import` closure, not against the source tree or the dist file that happens to contain the selector.

claude-opus-5[1m]

# CHALLENGE · `SpringHeatmap.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringHeatmap.vue` (338 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every colour ratio below is computed from the resolved token chain in the tree (arithmetic reproduced inline so it can be re-run and falsified).
**Read whole:** the component; its imports `./springKeys.ts`, `./useSpringDemo.ts` (499 L), `@mkbabb/glass-ui/dark` (`dist/dark.js` → `dist/dark-z_P5QwqI.js`), `@mkbabb/value.js/math` (`clamp`), `@vueuse/core` (`useResizeObserver`); its sole consumer `./SpringPhysicsFacet.vue:58,136`; the mounting scene `./SpringScene.vue:67`; `./springPresets.ts`; and the token cascade it samples at runtime (`demo/styles/style.css`, `demo/styles/design-idioms.css`, `demo/styles/layout.css`, `node_modules/@mkbabb/glass-ui/dist/styles/tokens/{color-radius,light-dark,dark-arm,scale-paper,scheme-motion}.css`, `.../styles/typography/{semantic,utilities}.css`).
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier; a false defect is worse than a missed one, so anything that turns on unobservable runtime behaviour is marked **UNPROVEN-NEEDS-LIVE** and severity-capped.

---

## 0. Headline

| id | sev | finding |
|---|---|---|
| **D-B1** | **BLOCKER** | The legend labels the **wrong axis** — it annotates left/right with a quantity the paint loop maps to top/bottom, contradicting the component's own `aria-label` 18 lines above it. |
| **D-B2** | **BLOCKER** | **9 of 20 rows paint pixel-identical to the field background**; the field's entire corner-to-corner dynamic range is **2.33 : 1** in light mode (< the 3:1 graphical-object floor), adjacent rows ≤ **1.15 : 1**. |
| **D-B3** | **BLOCKER** | A `role="application"` keyboard widget that exposes **no value and announces no change** — no `aria-valuenow`/`aria-valuetext`, no live region, and the on-screen readout is an unassociated sibling. WCAG 4.1.2 (A). |
| D-M1 | MAJOR | `max-height: 16rem` overrides `aspect-ratio: 11/13` at every shipped rail width → the field is **landscape 1.3–1.9 : 1**, not the declared portrait 0.85 : 1; the two axes are anisotropic by ≈1.5–2.1×, defeating the "true scale" annotation verbatim. |
| D-M2 | MAJOR | The theme repaint **races the class flip**: a default (pre-flush) `watch(isDark)` reads `getComputedStyle` before VueUse applies `.dark` at `flush:"post"`. glass-ui exports `installDarkModeSync` / `onFlipSettled` from the *same* `/dark` subpath for exactly this, unused. |
| D-M3 | MAJOR | The token→canvas bridge hands `ctx.fillStyle` an **unresolved `light-dark(...)` token stream**. Airtight half: the tone string is byte-identical in both themes, so the theme repaint is a provable **no-op for the tone channel**. Conditional half (UNPROVEN-NEEDS-LIVE): if the UA canvas parser rejects it, `fillStyle` silently retains its prior value → the field paints solid `#000`. |
| D-M4 | MAJOR | The interactive field has **no perceivable boundary**: border-vs-own-fill **1.22 : 1** (both themes), fill-vs-host-card **1.04 : 1** in light. WCAG 1.4.11 wants ≥3:1. |
| D-M5 | MAJOR | `@pointerdown` with **no `touch-action`, no pointer capture, no drag** — on touch, the *start of a scroll gesture* over the field rewrites both spring parameters. |
| D-M6 | MAJOR | **Colour is the sole information channel** — no grid, ticks, contours, axis labels or numeric scale; no `forced-colors` treatment, and canvas bitmaps are exempt from forced-colours adjustment. WCAG 1.4.1. |
| D-M7 | MAJOR | **No hover affordance and no preview.** The 20×20 lattice is invisible and the click snaps to cell centres; the user can neither see where a click lands nor that quantisation occurred. |
| D-M8 | MAJOR | The **x axis carries zero information by construction** — overshoot ⊥ response (the file says so at `:93–97`), so all 20 columns are byte-identical. A 20×1 ramp is dressed as a "20×20 parameter-space heatmap". |
| D-m1 … D-m11 | MINOR | keyboard/pointer lattice divergence · ad-hoc green+white fallback literals · false `--ball-tone` inheritance claim · type-register mismatch · unfallbacked `--z-content` at the wrong rung · permanent `will-change` · dead `defineExpose` + no-op `watch` · 33-word aria-label · RTL legend flip · no empty/error state · hand-duplicated range constants. |
| D-i1, D-i2 | INFO | quantised-cell overdraw is benign · DPR capped at 2. |
| **L-1 … L-4** | **SUPERLATIVE** | the analytic-overshoot substitution · PRM honesty (exactly one transition, exactly one kill) · transform + container-query-unit marker positioning · one shared coordinate space with the sliders, no shadow state. |

**Tally — defects 22 charged (blockers 3 · majors 8 · minors 11) · 2 INFO notes recorded but NOT charged (§4) · superlatives 4.**

---

## 1. BLOCKERS

### D-B1 — the legend annotates the wrong axis · **BLOCKER**

**Claim.** The visible legend labels the field's **horizontal** extremes with the **damping** regimes, which the paint loop maps to the **vertical** axis. The component contradicts itself inside 40 lines.

**Provenance.**

`SpringHeatmap.vue:49–53` — the legend, laid out `flex … justify-between`, so span 1 sits at the left edge and span 2 at the right:

```
49  <!-- The legend — names the three regimes the landscape reveals. -->
50  <div class="flex items-center justify-between gap-2 text-caption text-muted-foreground">
51      <span>← underdamped (rings)</span>
52      <span>critical / overdamped →</span>
53  </div>
```

`SpringHeatmap.vue:163–164` — ζ is a function of **row**, i.e. of y:

```
163  const zeta =
164      DAMPING_MAX - ((row + 0.5) / ROWS) * (DAMPING_MAX - DAMPING_MIN);
```

`SpringHeatmap.vue:159–162` — the file states the mapping in prose: *"y (top) = high damping (settled); y (bottom) = low damping (rings) … the TOP of the field is calm/overdamped and the BOTTOM is the ringing underdamped band."*

`SpringHeatmap.vue:171` — the column loop reads `col` only for geometry; `col` never enters `zeta` or `os`.

`SpringHeatmap.vue:32` — the `aria-label` gets it **right**: *"navigate response (horizontal) and damping (vertical)"*.

**Why blocker.** The sighted reading and the assistive reading of the same widget disagree by 90°. A user who trusts the legend and drags rightward expecting to leave the ringing band changes only the response time and gets identical overshoot — the instrument teaches the wrong physics, which is the entire point of the scene. `←`/`→` glyphs placed at the left and right edges of a field admit no diagonal reading.

**Falsifier.** Find any rule that rotates or re-flows this legend to the field's vertical edges (a `writing-mode`, a rotated transform, an absolute placement on the left/right rails), or a paint path where `col` feeds `zeta`. Neither exists: the legend div is a plain flex row directly below the field in normal flow (`:49–53` is the last child of `.spring-heatmap-section`, `:14`), and `zeta` is computed once per `row` outside the `col` loop.

---

### D-B2 — nine of twenty rows paint identically to the background; the whole field spans 2.33 : 1 · **BLOCKER**

**Claim.** Nearly half the "landscape" is a blank rectangle, and the half that is tinted resolves in steps below any plausible discrimination threshold. The field cannot be read as a landscape at all.

**Provenance.** `SpringHeatmap.vue:100–104` (the closed form), `:163–170` (row → ζ → mix), `:169` (`Math.pow(os, 0.7) * 100`, rounded), `:70–73` (`DAMPING_MIN 0.2` / `DAMPING_MAX 1.5`), `:77` (`ROWS = 20`).

**Computation** (reproducible: ζ(row) = 1.5 − 0.065·(row+0.5); mix = round(overshoot(ζ)^0.7 · 100)):

```
row  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
mix  0  0  0  0  0  0  0  0  0  2  4  8 12 17 23 29 35 43 50 59   (%)
```

* **Rows 0–8 — 9 of 20, 45 % of the field height — evaluate to `mix = 0`**, i.e. `color-mix(in oklab, tone 0%, surface)` = the surface exactly. They are not "faintly tinted"; they are the background. Row 9 at 2 % is imperceptible, so **10 of 20 rows are indistinguishable from an unpainted canvas**.
* Every ζ ≥ 1 returns `0` by the `if (zeta >= 1) return 0` early exit (`:101`), and ζ ≥ 1 holds for rows 0–7 by construction; row 8 (ζ = 0.9475) yields `overshoot = 9.1e-5 → mix = round(0.148) = 0`.

**Contrast, computed from the resolved token chain** (`--color-progress: var(--accent-kf)` at `demo/styles/style.css:163`; `--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` at `:130`; `--background: var(--neutral-0)` at `glass-ui/dist/styles/tokens/color-radius.css`; `--neutral-0` light `hsl(40 30% 98%)` / dark `hsl(24 9% 4%)` at `tokens/light-dark.css` + `tokens/dark-arm.css`), mixing in Oklab per `:170`:

| | light arm | dark arm |
|---|---|---|
| full-field range, mix 0 % → 59 % | **2.33 : 1** | 3.14 : 1 |
| worst adjacent-row step (0 → 2 %) | 1.026 : 1 | 1.015 : 1 |
| best adjacent-row step (50 → 59 %) | 1.154 : 1 | 1.253 : 1 |

In light mode the **entire graphical object, corner to corner, is 2.33 : 1** — below the 3 : 1 that WCAG 1.4.11 asks of a graphical object required to understand the content. Every 12.8 px row band differs from its neighbour by ≤ 1.15 : 1.

**And the shipped design vocabulary lives in the blank end of the ramp.** All four canonical presets (`springPresets.ts:17–41`) map to:

```
smooth ζ=0.86 → mix  2 %      bouncy ζ=0.45 → mix 33 %
snappy ζ=0.65 → mix 15 %      gentle ζ=1.00 → mix  0 %
```

and `useSpringDemo.ts:83–84` seeds the scene at `response 0.5 / dampingFraction 0.86` — **mix 2 %**. On first paint the marker sits in a region that is, to the eye, empty.

**Falsifier.** Any of: (a) a second paint pass that draws contours/isolines/cell strokes (none — `paint()` `:135–180` contains exactly one `fillRect` loop and no `stroke*` call); (b) a different gamma or a floor on `mix` (the only shaping is `Math.pow(os, 0.7)` at `:169`); (c) a measured full-field ratio ≥ 3 : 1 in light mode — my Oklab→luminance conversion is exact (full Oklab↔sRGB matrices, WCAG relative-luminance), so this dies only if `--accent-kf` or `--neutral-0` is overridden downstream of `demo/styles/style.css` in the actual cascade. Grep found no such override.

---

### D-B3 — `role="application"` with no exposed value and no change announcement · **BLOCKER**

**Claim.** Arrow keys mutate two continuous parameters and nothing is programmatically determinable or announced. WCAG 4.1.2 Name/Role/**Value** (Level A) fails; 1.3.1 fails for the readout relationship.

**Provenance.** `SpringHeatmap.vue:28–36` is the complete attribute set of the widget:

```
28  <div
29      ref="fieldEl"
30      class="spring-heatmap focus-ring relative w-full select-none cursor-crosshair rounded-md overflow-hidden"
31      role="application"
32      aria-label="Spring parameter-space heatmap — click or use the arrow keys to navigate response (horizontal) and damping (vertical); cells are tinted by peak overshoot"
33      tabindex="0"
34      @pointerdown="onPointerDown"
35      @keydown="onKeydown"
36  >
```

No `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `aria-live`, `aria-describedby`, `aria-controls`. The keydown handler (`:235–263`) writes `demo.response.value` / `demo.dampingFraction.value` and returns — it touches no ARIA state.

The only value surface is `:18–21`:

```
18  <span class="text-mono-caption text-muted-foreground tabular-nums">
19      {{ demo.response.value.toFixed(2) }} /
20      {{ demo.dampingFraction.value.toFixed(2) }}
```

— a sibling span with **no `id`**, therefore unreferenceable, and no live-region role.

**Compounding.** `role="application"` is the strongest possible instruction to a screen reader: leave browse mode, forward every keystroke, announce nothing you would normally announce. Choosing it *and* exposing no value is the worst of both. WAI-ARIA reserves `application` for interfaces with no standard-widget equivalent; a bounded two-value picker has two — a pair of `slider`s (which the same facet already renders at `SpringPhysicsFacet.vue:27–46` for the identical two numbers, with full value semantics from glass-ui `LabeledSlider`), or a `group` wrapping them.

**Falsifier.** An ancestor live region or an `aria-describedby` chain reaching the readout. `SpringPhysicsFacet.vue:21–22` is `<Card cartoon tier="quiet">` → `<CardContent class="panel-content …">`; neither is a live region and neither is referenced. A grep of the component for `aria-live|aria-value|aria-describedby|role="status"` returns nothing.

---

## 2. MAJORS

### D-M1 — `max-height` silently voids the declared aspect ratio; the axes are anisotropic · MAJOR

**Provenance.** `SpringHeatmap.vue:294–304`:

```
295     aspect-ratio: 11 / 13; /* response span (1.1) : damping span (1.3) — true scale */
296     max-height: 16rem;
```

and `:298–303` argues that `container-type: size` is safe *because* "the field's size is fixed by aspect-ratio + width".

**Computation.** With `w-full` (`:30`) the used height is `min(w · 13/11, 256px)`. The declared ratio therefore holds only while **w ≤ 256 · 11/13 = 216.6 px**. The shipped host is the desktop rail: `--rail-width: clamp(25rem, 33svi, 32rem)` = **400–512 px** (grepped from the demo/glass sizing tokens), less `CardContent`'s `px-4` (`SpringPhysicsFacet.vue:22`, 32 px) and the Card's own inset — a field of roughly **330–460 px**.

Consequences at w = 400 px:

* displayed ratio **1.56 : 1 landscape**, against the declared **0.85 : 1 portrait** — the box is inverted in orientation, not merely off by a few percent;
* x scale = 1.1 / 400 = 0.00275 response-units/px; y scale = 1.3 / 256 = 0.00508 ζ-units/px → **anisotropy ≈ 1.85×** (range 1.5–2.1× across the rail's clamp band). Equal pixel travel encodes unequal parameter travel — precisely what the `aspect-ratio` line was written to prevent, annotated "true scale".

**Falsifier.** Measure `document.querySelector('.spring-heatmap').clientWidth` in the shipped rail. If it is ≤ 216.6 px the cap never binds and this claim dies. (It would require the entire physics pane — two labelled sliders, a two-column preset grid, an embedded keyframes editor — to fit under 217 px of content width.)

---

### D-M2 — the theme repaint runs before the theme lands · MAJOR

**Claim.** `watch(isDark, () => paint())` is a **pre-flush** watcher; the `.dark` class that flips the tokens is applied by a **post-flush** watcher. `paint()` therefore samples the *outgoing* theme's tokens and the canvas keeps them until the next resize.

**Provenance.**

* `SpringHeatmap.vue:269–270` — `const { isDark } = useGlobalDark(); watch(isDark, () => paint());` — no `flush` option, so Vue's default `'pre'`.
* `paint()` reads live computed style at `:152–153` → `resolveTone`/`resolveSurface` (`:114–125`), both `getComputedStyle(el).getPropertyValue(...)`.
* `node_modules/@vueuse/core/dist/index.js:2080–2083` — `useColorMode`'s class/attribute application:
  ```
  watch(state, onChanged, {
      flush: "post",
      immediate: true
  });
  ```
  `onChanged` → `defaultOnChanged` → `updateHTMLAttrs` (`:2041`, `:2074`), which is where `classList.add('dark')` happens (`:2064`).
* glass-ui's `useGlobalDark` is `useDark()` from that same VueUse (`dist/dark-z_P5QwqI.js`, `i = useDark`), so the class flip is post-flush.
* Vue's scheduler drains pre-flush jobs, then renders, then post-flush jobs. `paint()` runs strictly first.
* `tokens/dark-arm.css` puts the dark surface behind the class selector: `.dark { … --neutral-0: hsl(24 9% 4%); … }` — higher specificity than `:root`, so **the surface token only changes when the class lands.**

**The producer ships the cure and it is unused.** The same `dist/dark-z_P5QwqI.js` exports two settle APIs, both reachable from the `@mkbabb/glass-ui/dark` subpath the component already imports at `:60`:

```
function l(t) { let { isDark: r } = c(); n(r, () => { e(() => { requestAnimationFrame(t); }); }); }   // installDarkModeSync
```
— i.e. `watch(isDark, () => nextTick(() => requestAnimationFrame(cb)))` — plus `onFlipSettled`, which batches subscribers into one rAF after the flip. These exist because reading computed style on the raw `isDark` edge is too early. The component takes the raw edge.

**Visible failure.** Light → dark leaves the blank top 45 % of the field painted near-white (`hsl(40 30% 98%)`) on a dark panel until a resize fires. This is a regression against an explicit acceptance item: `docs/tranches/R/waves/R.W6.md:621` — *"dark/light theme toggle re-paints the spring heatmap correctly"*.

**Falsifier.** Show that the `.dark` class (or `color-scheme`) is applied pre-flush or synchronously on the same tick — the VueUse source line above says otherwise — **or** show that the sampled tokens are class-independent. That second escape is partly true and is itself D-M3: the *tone* token is class-independent, which makes the race real only for the surface channel. Severity stays MAJOR on that narrower ground, which is exactly the visible white-rectangle case.

---

### D-M3 — an unresolved `light-dark()` token stream is fed to `ctx.fillStyle` · MAJOR (part airtight, part UNPROVEN-NEEDS-LIVE)

**Provenance.** `SpringHeatmap.vue:114–125`, `:152–153`, `:170`:

```
117      cs.getPropertyValue("--ball-tone").trim() ||
118      cs.getPropertyValue("--color-progress").trim() ||
...
124      return cs.getPropertyValue("--background").trim() || cs.backgroundColor || "#fff";
...
170      ctx.fillStyle = `color-mix(in oklab, ${tone} ${mix}%, ${surface})`;
```

Token chain:

* `demo/styles/style.css:163` → `--color-progress: var(--accent-kf)`; `:130` → `--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`, declared **only** at `:root` — there is no `.dark` arm for it anywhere in the demo (the demo does use `.dark` arms elsewhere, e.g. `design-idioms.css:67–71` for `--color-gold`, so the omission is a choice, not an oversight of the idiom).
* `glass-ui/dist/styles/tokens/color-radius.css` → `--background: var(--neutral-0)`; `tokens/light-dark.css` (inside `@supports (color: light-dark(white, black))`) → `--neutral-0: light-dark(hsl(40 30% 98%), hsl(24 9% 4%))`, overriding `color-radius.css`'s plain light literal; `tokens/dark-arm.css` → `.dark { --neutral-0: hsl(24 9% 4%); }`.

An **unregistered** custom property computes to its specified token stream with `var()` substituted and nothing else — `light-dark()` is resolved only when a real color property consumes the value. Therefore `getPropertyValue` returns literal strings:

| | light (no `.dark`) | dark (`.dark`) |
|---|---|---|
| `--color-progress` | `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` | **identical** |
| `--background` | `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))` | `hsl(24 9% 4%)` |

**Airtight consequence.** The tone string is byte-identical across the theme toggle. Whatever the canvas parser does with it, it does the same thing in both themes — so `watch(isDark, () => paint())` (`:270`) **cannot re-tint the accent channel, ever**. The comment at `:111–113` — *"We sample the resolved token from the field element so dark mode re-tints for free"* — is false for the token it actually samples. The two channels also take structurally different parse paths in dark mode (plain `hsl` surface mixed against a `light-dark()` tone in one `color-mix()`), which no code path anticipates.

**Conditional consequence — UNPROVEN-NEEDS-LIVE.** If the UA's canvas 2-D colour parser does not resolve `light-dark()` (it needs an element's used `color-scheme`, which the canvas colour-parsing algorithm does not universally supply), the `fillStyle` assignment is a **no-op that leaves the previous value in place** — the initial value being opaque `#000`. Every row assignment fails identically, so the whole 20×20 field paints solid black in light mode. I do **not** assert this outcome; I assert that the code stakes its entire rendering on an undeclared UA capability with a silent failure mode.

**Airtight regardless of the parser:** `paint()` (`:135–180`) performs **no read-back, no validation, no try, and no fallback**. `ctx.fillStyle` is written 20 times and never compared to what it took. There is no degradation path and no diagnostic.

**Falsifier.** In the shipped browser, after `paint()`, read `ctx.fillStyle` back: if it round-trips to a violet-ward `rgb(...)`/`color(...)` the conditional half dies (the airtight half — identical tone strings across themes, hence a dead tone repaint — survives it). Alternatively, register `--accent-kf` / `--neutral-0` via `@property { syntax: "<color>" }`, which would force computed-value-time resolution and kill the whole finding.

---

### D-M4 — the interactive field has no perceivable boundary · MAJOR

**Provenance.** `SpringHeatmap.vue:294–297`:

```
297     border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
298     background: var(--background);
```

Host surface: `SpringPhysicsFacet.vue:21` `<Card cartoon tier="quiet">` over `--card`.

**Computation** (WCAG relative luminance; the 10 % mix composites as α = 0.1 over the field's own `--background`):

| pair | light | dark |
|---|---|---|
| border vs the field's own fill | **1.223 : 1** | **1.216 : 1** |
| field fill vs `--card` | **1.039 : 1** | 1.418 : 1 |
| border vs `--card` | 1.177 : 1 | — |

The border-vs-own-fill figure is **independent of the host surface** — both operands are the field's own tokens — so it is airtight in both themes: the only edge the control has is 1.22 : 1. Combine with D-B2 (the top 45 % of the interior is exactly `--background`) and, in light mode, the top half of a clickable 400×256 px control is a 1.04 : 1 patch fenced by a 1.22 : 1 hairline. WCAG 1.4.11 asks 3 : 1 for the visual information needed to identify a user-interface component and its state.

**Falsifier.** Show that `Card tier="quiet"` resolves a surface materially darker than `--card` — that would rescue the *fill-vs-card* row (and only that row). The border-vs-fill row cannot be rescued that way; it dies only if `--foreground` or the 10 % literal changes.

---

### D-M5 — a touch-scroll gesture that begins on the field rewrites both parameters · MAJOR

**Provenance.** `SpringHeatmap.vue:34` binds `@pointerdown="onPointerDown"`; `:229–232` navigates immediately on the down edge:

```
229  function onPointerDown(e: PointerEvent): void {
230      navigateFromPointer(e.clientX, e.clientY);
231      fieldEl.value?.focus();
232  }
```

There is **no `touch-action`** on `.spring-heatmap` (`:294–304` is the complete rule) and none on any ancestor of the pane — the only relevant global is `demo/styles/style.css:219`, `html, body { touch-action: manipulation }`, which permits panning. The scenes that *do* own a drag surface declare it explicitly (`CubeTarget.vue:4`, `AmigaScene.vue:254`, `SequenceTarget.css:134`, `OrbitalDrag.vue:350`, `SquareScene.css:64`) — the idiom exists in this tree and this component skips it.

`pointerdown` fires on touch **before** the browser disambiguates tap from pan. A user swiping to scroll the physics pane (which is scrollable — `SpringPhysicsFacet.vue:233–238` caps the keyframes editor at `26rem` with `overflow-y: auto`, and the pane itself sits in a drawer on mobile) and whose finger lands on the field will silently jump `response` and `dampingFraction` to that cell, which then triggers `rebuildLiveSpring` (`useSpringDemo.ts:341`) and re-arms the rAF loop.

**Secondary, same site.** There is no `pointermove`/`setPointerCapture`/`pointerup` pair, so the "navigable landscape" cannot be **dragged** — the single gesture a 2-D parameter field most invites. `navigateFromPointer` (`:205–227`) is already written as a pure `(clientX, clientY) → params` function; the drag is a three-line addition that was not made.

**Falsifier.** Show `touch-action: none` (or `pan-y` scoped away from the field) reaching `.spring-heatmap` from any ancestor, or show that the physics pane can never scroll at any viewport.

---

### D-M6 — colour is the only channel; no forced-colors treatment · MAJOR

**Provenance.** `paint()` (`:135–180`) emits nothing but `fillRect`s — no `strokeRect`, no `fillText`, no `moveTo/lineTo`, no `setLineDash`. The template (`:14–54`) adds no ticks, no axis rules, no corner values. The only numbers anywhere are the *current* pair at `:18–21`; the field's ranges (`RESPONSE_MIN/MAX 0.1–1.2`, `DAMPING_MIN/MAX 0.2–1.5`, `:70–73`) are never shown, so a user cannot know what the corners mean.

The style block's only media query is `:333` (`prefers-reduced-motion`). There is **no `@media (forced-colors: active)`** and no `@media (prefers-contrast: more)` — glass-ui ships both idioms (`dist/styles/accessibility.css`) and the demo never extends them here. Canvas bitmaps are exempt from forced-colours adjustment, so in Windows High Contrast the entire tint channel survives unadjusted over a forced background while the marker's `background: var(--ball-tone, …)` (`:323`) is forced to `Canvas`.

For a monochromat or a user at 2 % ambient contrast, D-B2's ramp is not merely hard to read — there is no second encoding to fall back to.

**Falsifier.** Any redundant encoding in the shipped surface: a grid, a contour, an axis rule, a numeric legend, a pattern fill, or a `forced-colors` block. None is present in `SpringHeatmap.vue`; `SpringPhysicsFacet.vue`'s scoped styles (`:175–241`) add none either.

**Corpus.** This is the surviving core of `docs/tranches/T/audit/lanes/06-spring.md` **F5** ("no axis labels on the field itself") and its remedy **T-SPR-6** ("axis-labeled on the field edges … Gate: the field carries visible axis labels"). `SpringPhysicsFacet.vue:13–16` concedes T-SPR-6 is still "design-PENDING". The gap is **known and open**; this challenge records that it is still open in the tree and adds the forced-colours and 1.4.1 dimensions the lane did not cover.

---

### D-M7 — no hover affordance, no preview, invisible quantisation · MAJOR

**Provenance.** The field's only hover signal is `cursor-crosshair` (`:30`). No `pointermove` handler, no hover cell highlight, no crosshair guides, no tooltip. Meanwhile the click **quantises**: `:214–221` floors to a cell and returns the cell **centre**, and `:225–226` rounds to the 0.01 slider step.

So: the lattice is invisible (D-B2 — adjacent rows differ by ≤1.15 : 1, columns are identical by D-M8), yet clicks snap to it. Two clicks 8 px apart in a visually uniform region produce either the same parameters or a jump of a full cell, with nothing on screen to explain either. The component even computes the honest tolerance — `HALF_CELL_RESPONSE = 0.0275`, `HALF_CELL_DAMPING = 0.0325` (`:82–83`) — and then never surfaces it to the user (see D-m7: it is exposed to code that does not exist).

**Falsifier.** A hover-preview or grid overlay bound to this field elsewhere in the tree. `grep -rn "spring-heatmap" demo/` returns only this file plus its two mount lines in `SpringPhysicsFacet.vue`.

---

### D-M8 — a 20×1 ramp presented as a 20×20 field · MAJOR

**Provenance.** The file states it plainly at `:93–97`:

> *"It is independent of `response` … so the heatmap's overshoot tint varies ONLY with the damping (y) axis — the response (x) axis is the free dimension."*

and the loop confirms it — `zeta`/`os`/`mix` are computed **outside** the `col` loop (`:163–170`), then the identical `fillStyle` is stamped across all 20 columns (`:171–178`).

The surrounding chrome does not disclose this. The header reads *"parameter space — overshoot"* (`:16`), the label promises a 2-D navigation surface with *"cells … tinted by peak overshoot"* (`:32`), and `SpringPhysicsFacet.vue:50–52` bills it as *"a 20×20 response×damping field tinted by the EXACT analytic overshoot"*. What renders is 20 identical columns.

This is not a bug in the mathematics — the closed form is right — it is a **design misrepresentation**: half the affordance (the x axis) is a null channel dressed as signal, and it is the half the legend also gets wrong (D-B1). An honest field would either encode something on x (settle time ∝ response is the obvious candidate and is computable in the same closed form) or drop to a one-dimensional damping ramp with a separate response control.

**Falsifier.** Any dependence of the fill on `col`. Line 170 assigns `fillStyle` before the `col` loop opens at `:171`; the loop body contains only `fillRect`.

---

## 3. MINORS

**D-m1 — keyboard and pointer walk different lattices.** Pointer snaps to cell centres: `RESPONSE_MIN + ((col+0.5)/COLS)·1.1` then `round(·100)/100` (`:218–226`) → {0.13, 0.18, 0.24, 0.29, 0.35, …}. Keyboard adds a raw step to the **current** value: `stepR = 1.1/20 = 0.055`, `stepD = 1.3/20 = 0.065`, then rounds to 0.01 (`:236–237`, `:259–262`). From the seed 0.50 the arrow lattice is {0.56, 0.62, 0.67, …} — off the cell centres, with alternating 0.05/0.06 effective steps from the rounding. A keyboard user's marker therefore never sits where a pointer user's does, and the `HALF_CELL_*` tolerance the component publishes (`:82–83`, `:277`) describes only the pointer path. Also absent: `Home`/`End`/`PageUp`/`PageDown`, which the APG expects of a bounded value widget — `onKeydown`'s switch (`:241–256`) handles exactly four keys. *Falsifier:* show a snap-to-lattice in the keydown path.

**D-m2 — ad-hoc colour literals in the block that forswears them.** `:110–111` declares the tint "rides the scene's `--color-progress` / `--ball-tone` token (**NOT ad-hoc hex**)", and then `:119` hardcodes `"hsl(142 71% 45%)"` — **green** — as the tone fallback, and `:124` hardcodes `"#fff"` as the surface fallback. Green is not the motion authority: `demo/styles/style.css:120–130,163` names the violet `--accent-kf` the single authority, and `SpringPhysicsFacet.vue:200–208` records the same ruling ("the canonical motion-color … the OD-6 violet authority since T.D7"). The white surface fallback would paint a white field in dark mode. *Falsifier:* a token path where green is sanctioned for the spring accent — `grep -rn "142 71%" demo/` finds it only here.

**D-m3 — the `--ball-tone` inheritance claim is false.** `:291–292` states the field "rides the scene's `--ball-tone` seam (inherited from `.spring-target` → `--color-progress`)". `--ball-tone` is declared at `SpringTarget.vue:278` (`.spring-target { --ball-tone: var(--color-progress) }`). `SpringTarget` renders on the **stage** (`SpringScene.vue:10`); `SpringPhysicsFacet` — this component's only parent — renders in the **panel** via the `tabsContent` render function (`SpringScene.vue:67`). They are sibling subtrees, so `--ball-tone` never reaches `.spring-heatmap` and every `var(--ball-tone, var(--color-progress))` here (`:323`, `:325–326`) plus `resolveTone`'s first probe (`:117`) resolves through the fallback. Behaviourally harmless; the *documentation* is load-bearing and wrong, and the fallback is what actually paints. *Falsifier:* a `.spring-target` ancestor of the facet — `SpringScene.vue`'s template (`:8–13`) contains only the target/starting-style branch, and the facet is handed to the shell separately.

**D-m4 — type registers are mismatched to their content.** `text-mono-caption` (`:18`) is defined by glass-ui as `font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform: uppercase` (`dist/styles/typography/utilities.css`) — a **label** register (uppercase, 0.1em caps tracking) applied to a numeric **value** readout, alongside `tabular-nums`, which caps tracking then works against. The legend uses `text-caption` (`:50`), which glass-ui defines as `font-style: italic` (`dist/styles/typography/semantic.css`) — an italic axis annotation. Three registers (`text-small`, `text-mono-caption`, `text-caption`) inside a two-line frame around a 256 px field. *Falsifier:* a demo-side override of either utility — `grep` finds none in `demo/styles/`.

**D-m5 — `--z-content` used without a fallback and at the wrong rung.** `:330` is `z-index: var(--z-content)` — alone among this component's token reads in having **no** fallback, where `:321`, `:328` all supply one (`var(--radius-pill, 9999px)`, `var(--duration-fast, 160ms)`, `var(--ease-standard, ease)`). `--z-content` is `10` (`glass-ui/dist/styles/tokens/scheme-motion.css`) and `demo/styles/style.css:29` documents it as *"the scene subject / target plane"* — a **stage** rung, borrowed here for a marker inside a panel. A local `z-index: 1` inside the field's own stacking context is what the marker actually needs. *Falsifier:* a case where the marker must out-stack a scene-plane sibling; it has none — its only sibling is the canvas.

**D-m6 — permanent compositor promotion.** `:329` `will-change: transform` on an element the file itself describes as moving "only on a param edit" (`:40–41`) and whose transition is 160–200 ms. `will-change` is for imminent change; a permanent declaration holds a layer for the panel's lifetime. *Falsifier:* evidence that the marker moves at animation frequency — `useSpringDemo.ts` proves the opposite (the 60 Hz painters are registered via `registerSpringPainter`, `:152–161` of the facet; the marker is not among them).

**D-m7 — dead expose and a no-op watcher.** `:277` `defineExpose({ HALF_CELL_RESPONSE, HALF_CELL_DAMPING })` — a repo-wide grep for `HALF_CELL` returns only the three lines inside this file. `:281–286` registers a watcher whose entire body is a comment:

```
283      () => {
284          /* marker is reactive (markerStyle); nothing else to repaint */
285      },
```

A watcher that exists to document that no watcher is needed. Both are speculative surface on a component the census already flags for restructuring (`docs/tranches/U/loop/pass1-research-demo-module-census.md:106`). *Falsifier:* a consumer of either.

**D-m8 — the label is a 33-word run-on.** `:32` is announced in full on every focus and on every re-entry to the widget, with a name, two axis assignments, an instruction, and a colour-encoding note in one string. Splitting the instruction into `aria-describedby` (once) from the name (every focus) is the idiom. *Falsifier:* an AT that truncates or defers — not decidable statically, hence MINOR.

**D-m9 — RTL flips the legend but not the field.** The legend is `flex … justify-between` (`:50`); under `dir="rtl"` its two spans swap sides while the canvas paint (`:171–178`) and the marker's `translate(<cqw>, <cqh>)` (`:197`) remain physical-left-origin. The (already wrong, D-B1) legend would then be wrong in a second, opposite way. The demo declares no `dir` anywhere (`grep -rn 'dir="rtl"|\[dir=' demo/` → empty), so RTL is unsupported wholesale — which is why this is MINOR and not a blocker. *Falsifier:* an RTL support claim in the demo's charter.

**D-m10 — no empty / error / loading state.** `paint()` returns silently on a null 2-D context (`:140`) or a zero-sized box (`:144`), leaving a blank rectangle that is — by D-B2 — indistinguishable from a *successful* paint of the top half. There is no skeleton, no error affordance, no diagnostic. Recovery depends entirely on `useResizeObserver` (`:267`) firing later. *Falsifier:* a fallback render path.

**D-m11 — the coordinate contract is hand-duplicated across two files.** `:70–73` declares `RESPONSE_MIN/MAX = 0.1/1.2` and `DAMPING_MIN/MAX = 0.2/1.5` "IDENTICAL to the SpringSidebar sliders' min/max"; the sliders declare the same four numbers as literals at `SpringPhysicsFacet.vue:32–33` and `:43–44`. Four magic numbers, two files, no shared export, and the comment names a component (`SpringSidebar`) that **no longer exists** — it was dissolved into `SpringPhysicsFacet` (`SpringPhysicsFacet.vue:2–20`). A silent divergence would make the marker lie about where the sliders can reach. *Falsifier:* a shared constant module — `springPresets.ts` and `springKeys.ts` export neither.

---

## 4. INFO

**D-i1 — cell overdraw is benign.** `:174–176` inflates each rect by `+1` px to hide seams. Within a row all cells share a fill, and each row's overdraw is overwritten by the next row painted after it, so the only residue is a 1 px bleed past the bottom edge, clipped by the canvas. No defect; recorded so a later reader does not re-raise it.

**D-i2 — DPR capped at 2.** `:147` `Math.min(window.devicePixelRatio || 1, 2)`. On a 3× display the field is upsampled — invisible for a smooth colour ramp, and the cap is the right trade for a full repaint on every resize. Recorded, not charged.

---

## 5. SUPERLATIVES (L-18 runs both ways)

**L-1 — the analytic substitution is the right call, and it is what makes everything else affordable.** `:100–104` replaces 400 live `SpringProgress` instances with `overshoot(ζ) = exp(−ζπ/√(1−ζ²))`, the exact first-peak amplitude of the unit-step second-order response, benched at 507× (`:8–9`, `:98`, probe id `spring-heatmap-probe`, 2026-06-22). The design consequence is the part usually missed: because the whole field costs ~0.002 ms, the component can afford to **recompute from scratch on every resize** (`:127–130`, `:267`) instead of caching pixels — which is why the field is genuinely responsive rather than a stretched bitmap. The docstring also correctly states the negative result (the expression is *not* on the library surface, so it is derived inline, `:91–94`) rather than pretending to reuse an API. *Falsifier:* show the closed form is not the peak overshoot of a damped harmonic oscillator, or a live-instantiation path that is cheaper.

**L-2 — reduced-motion honesty, exactly scoped.** The component declares exactly one transition — `transition: transform var(--duration-fast, 160ms) var(--ease-standard, ease)` (`:328`) — and the PRM block (`:333–337`) disables exactly that one. No over-reach (it does not blanket-kill unrelated properties), no under-reach (there is no second animated property to miss), and it kills the transition rather than shortening it, so the marker jumps, which is the correct PRM semantics for a discrete position. Corroborated by the census, which lists `scenes/spring/SpringHeatmap.vue:333` among the demo's 10 CSS PRM enforcement sites (`formation/keyframes/lane-frontend.md` §6.5). *Falsifier:* any other transition/animation in the component's cascade reaching `.spring-heatmap*` — the scoped block (`:289–337`) is the whole surface and contains no `animation`.

**L-3 — compositor-correct marker positioning, with a real argument for the container type.** `:194–198` positions by `transform: translate(<cqw>, <cqh>)` rather than `left`/`top`, and `:300–303` explains why `container-type: size` is safe here specifically — the box's size comes from `aspect-ratio` + width, never from contents, so size containment cannot collapse it. That is the correct reasoning for the one hazard `container-type: size` actually carries, stated rather than assumed. (D-M1 attacks the `max-height` that voids the *ratio*; it does not touch this argument, which survives intact — the box is still contents-independent under the cap.) *Falsifier:* a content-derived height on `.spring-heatmap`; there is none.

**L-4 — one coordinate space, no shadow state.** The field reads the live params through `markerStyle` (`:183–199`) and writes them back through the same two refs the sliders drive (`:225–226`, `:259–262` → `useSpringDemo.ts:83–84`). There is no local mirror, no debounce, no `emit`-and-reconcile, and no second source of truth to drift — the two-way binding is structural. `clamp` is applied on both the read (`:194–195`) and the write (`:260–262`), so an out-of-range param cannot push the marker outside the field or a keypress outside the slider domain. This is the discipline `useSpringDemo`'s own header calls the anti-D12-shadow-authority rule (`useSpringDemo.ts:43–49`), correctly transposed to a view component. *Falsifier:* a local ref mirroring either parameter — `:57–107` declares none. (Caveat, charged separately as D-m11: the *ranges* that define the shared space are hand-duplicated rather than shared.)

---

## 6. Corpus: folded, and where the tree disagrees

**Folded.**

* `formation/keyframes/lane-frontend.md` §6.5 lists `SpringHeatmap.vue:333` as a PRM enforcement site — corroborates **L-2**.
* `lane-frontend.md` §6.3 records that the demo owns 98 unprefixed custom properties and **zero `--kf-*`** tokens, "a flat global namespace with glass-ui's — a collision surface worth a lane of its own." `SpringHeatmap` is the sharpest instance of that hazard in the tree: `resolveTone`/`resolveSurface` (`:114–125`) resolve unprefixed names — `--ball-tone`, `--color-progress`, `--background` — **by runtime string lookup**, so a name collision does not produce a CSS-level conflict a reviewer could see; it silently repaints the entire instrument. Every other consumer of these names does so declaratively in a stylesheet. Cite `lane-frontend.md` §6.3 as the general finding; this is its worst concrete case.
* `lane-frontend.md` §4 rosters `spring/SpringHeatmap.vue` at 338 lines, glass-consuming (`useGlobalDark` only). Confirmed; and **D-M2** sharpens it — the one glass-ui API this component imports is the one it uses at the wrong flush point while ignoring the two settle helpers exported beside it.
* `docs/tranches/T/audit/lanes/06-spring.md` **F5** and remedy **T-SPR-6** already name the missing axis labels and the redundant control surfaces. `SpringPhysicsFacet.vue:13–16` records T-SPR-6 as design-PENDING. **D-M6** and **D-M7** are the still-open remainder; **D-B1** is new (F5 quoted the legend without noticing its axis is inverted).
* `docs/tranches/R/waves/R.W6.md:621` is an explicit acceptance item — *"dark/light theme toggle re-paints the spring heatmap correctly"* — which **D-M2**/**D-M3** show the current mechanism cannot satisfy for the surface channel and provably cannot satisfy for the tone channel.

**Contradicted — the tree disagrees with the corpus.**

* `06-spring.md:150–152` describes *"the 20×20 canvas heatmap + its two-line **ALL-CAPS** legend … '← UNDERDAMPED (RINGS) / CRITICAL / OVERDAMPED →' — wrapping awkwardly at rail width"*. **Stale.** The tree at `:50` applies `text-caption`, which glass-ui defines with `font-style: italic` and **no `text-transform`** (`dist/styles/typography/semantic.css`); the strings at `:51–52` are lower-case source. The legend was de-capsed after that lane. Its *content* error — the axis inversion — survived the restyle uncaught, which is precisely **D-B1**.
* `06-spring.md:154` calls it *"the unlabeled **red** wash"*, and `06-spring.md:334–337` (T-SPR-5) proposed killing `--color-progress: var(--accent-red)`. **Landed and stale**: `demo/styles/style.css:163` now reads `--color-progress: var(--accent-kf)` (violet). But the tint is not violet-only either — `resolveTone`'s last-resort literal is **green** (`:119`), a third hue belonging to neither the retired red nor the ruled violet (**D-m2**).
* `06-spring.md:150` cites the sliders at `SpringSidebar.vue:56–77` and the presets at `:96–118`. **`SpringSidebar.vue` no longer exists** — dissolved into `SpringPhysicsFacet.vue` (`:2–20`). `SpringHeatmap.vue:69` still names it in a live comment (**D-m11**).

---

## 7. What a live pass must settle (SS-13 hand-off)

Three claims are severity-capped pending observation; nothing else in this challenge depends on them.

1. **D-M3 conditional half** — read `ctx.fillStyle` back after assignment in light mode. Round-trips to a colour → the black-field outcome dies (the dead-tone-repaint half stands regardless). Fails to round-trip → escalate D-M3 to BLOCKER.
2. **D-M1** — measure `.spring-heatmap` `clientWidth` in the shipped rail. ≤ 216.6 px → D-M1 dies.
3. **D-M5** — attempt a vertical scroll gesture beginning inside the field on a touch viewport. Params unchanged → D-M5 dies.

Everything under §1 (blockers), plus D-M2, D-M4, D-M6, D-M7, D-M8 and all eleven minors, is decidable from the tree as read and needs no browser.

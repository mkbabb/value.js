served model id: `claude-opus-5[1m]`

# CHALLENGE · SquareInstrument · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/square/SquareInstrument.vue` (212 L)
**Read whole, plus:** `SquareScene.vue` (331 L), `SquareScene.css` (159 L), `squareKeys.ts`, `useSquareDemo.ts`, `useSquareKeyboard.ts`, `useSquareTumble.ts`, `demo/styles/style.css`, `demo/styles/design-idioms.css`, `demo/styles/layout.css`, glass-ui 7.0.0 `dist/styles/typography/{scale,semantic,utilities}.css`, `dist/styles/tokens/{color-radius,dark-arm,light-dark,scheme-motion}.css`, `dist/styles/accessibility.css`.
**Method** static + source-derived only. No browser (L-law). Contrast ratios computed from resolved tokens (sRGB WCAG 2.x relative luminance; oklch→linear-sRGB→gamma-encode→luminance; alpha composited over the two candidate substrates). Livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; but a false defect is worse than a missed one, so each claim carries its falsifier and §6 records the claims I *killed*.

**Tally — defects 21 (BLOCKER 2 · MAJOR 6 · MINOR 10 · INFO 3) · superlatives 4.**

---

## 0. Substrate for the contrast math (stated once, so every ratio below is auditable)

The instrument renders inside `<Card :shadow="false" class="square-stage …">` (`SquareScene.vue:10-13`). The Card is a translucent glass plate, so the *used* backdrop is between the page background and the card fill. I therefore computed **every** ratio against **both** endpoints and report both; a claim only stands if it fails at **both**.

| token | light | dark |
|---|---|---|
| `--background` = `--neutral-0` | `hsl(40 30% 98%)` | `hsl(24 9% 4%)` |
| `--card` | `hsl(30 85% 96%)` | `hsl(26 22% 17%)` |
| `--foreground` | `hsl(24 10% 10%)` | `hsl(30 14% 90%)` |
| `--muted-foreground` = `--neutral-5` | `hsl(30 22% 40%)` | `hsl(34 14% 62%)` |
| `--border` = `--neutral-4` | `hsl(32 26% 70%)` | `hsl(30 16% 34%)` |
| `--color-progress` = `--accent-kf` | `oklch(.56 .17 295)` → `#7E5ACC` | `oklch(.74 .13 305)` → `#BE95EC` |

Provenance: `tokens/color-radius.css`, `tokens/dark-arm.css`, `tokens/light-dark.css`, `style.css:130-131,163`. The demo does **not** re-point `--muted-foreground` (`grep -rn "\-\-muted-foreground\s*:" demo` → 0 hits), so the ramp above is the live one.

---

## 1. BLOCKERS

### D-1 · BLOCKER · The tether is drawn in the wrong coordinate system and cannot touch either endpoint it claims to join
`SquareInstrument.vue:12-19, 77-97, 146-166`

The `<svg class="square-tether">` carries `preserveAspectRatio="none"` and **no `viewBox`**. The source comment asserts the opposite in so many words:

> `:78-80` — *"The SVG user space is 0..100 (`preserveAspectRatio="none"`); home is the centre (50,50) and the box centre deflects by ±TETHER_REACH user units at full travel."*

Per SVG 1.1 §7.8 / SVG2 §8.8, `preserveAspectRatio` **only applies when `viewBox` is present on the same element**. With no `viewBox` there is no viewBox→viewport transform: one user unit is one CSS pixel. The element is sized `width:100%; height:100%; inset:0` (`:146-155`), so the path

```
M 50 50 Q <cx> <cy> <bx> <by>
```

renders inside a **100 × 100 px patch anchored at the stage plate's top-left corner**. Meanwhile the "home crosshair" it claims to start at is drawn by `.square-field` at `calc(50% ± 0.5px)` — the true geometric **centre** (`:105-124`) — and the box it claims to end at is centred by `grid place-items-center` on the stage (`SquareScene.vue:12`). The tether therefore connects nothing to nothing, in a corner, on every stage larger than 100 × 100 px. The stage cannot be that small: the subject alone is `--size: 12rem` = 192 px (`SquareScene.css:34`).

This is not an idiom the tree is ignorant of — it is the **only** SVG in the demo that gets it wrong. Both siblings pair the two attributes correctly:

* `demo/scenes/spring/SpringTrace.vue:17-19` — `viewBox="0 0 100 60" preserveAspectRatio="none"`
* `demo/scenes/easing/EasingTarget.vue:96-98` — `viewBox="0 0 1 1" preserveAspectRatio="none"`

Consequence on the DESIGN axis: the component's headline gesture — *"the rubber-band TETHER (spring math made physical)"* (`:142-145`) — is the single thing that justifies an SVG layer on this stage, and it is inert. Everything downstream (the `bow` slingshot math at `:93-95`, `vector-effect: non-scaling-stroke` at `:165`, the `--active` fade at `:156-158`) is decoration on a mis-placed line.

**Falsifier.** Show a `viewBox` reaching this `<svg>` — from an attribute I missed, a `v-bind="$attrs"` fallthrough, or a build-time transform. (`grep -rn "viewBox" demo/scenes/square/` → **0 hits**; the component declares props only, has no `inheritAttrs`/`$attrs` path, and `SquareScene.vue:18-26` passes six props and no attrs.) Alternatively: demonstrate that a UA applies `preserveAspectRatio` without a `viewBox` — this would contradict the spec. Or: show the stage plate is exactly 100 × 100 px.

---

### D-2 · BLOCKER · The owner-rejected caption block is still on stage, verbatim, while two closure records assert it was removed
`SquareInstrument.vue:35-56` (and `:21-33`)

`docs/tranches/T/audit/owner-review/VERDICT.md:29` records verdict **#11**:

> `| 11 | 10 | square caption block ("SPRING-CHASED · DRAG THE BOX…/X·Y ∈ [-1,1]/DOUBLE-CLICK TO TUMBLE/PRESS C TO TRACE THE FIELD") | "superfluous nonsense" — remove |`

All four strings are present at HEAD, in order:

| owner's rejected string | HEAD |
|---|---|
| `SPRING-CHASED · DRAG THE BOX…` | `:41-43` `spring-chased &middot; drag the box, or press Play to tour it` |
| `X·Y ∈ [-1,1]` | `:44` `x &middot; y &isin; [-1, 1]` |
| `DOUBLE-CLICK TO TUMBLE` | `:48` `double-click to tumble` |
| `PRESS C TO TRACE THE FIELD` | `:55` `press C to trace the field` |

Against that, the closure record:

* `docs/tranches/T/FINAL.md:36` — `| 11 | square caption "superfluous nonsense" | caption removed | T.A/T.E | proof:stage-inventory (T.M4) | **LANDED** |`
* `docs/tranches/U/audit/lane-03-t-verdict-trace.md:29` — `| 11 | square caption "nonsense" | LANDED | **REAL** — stage-inventory | gate exists |`
* `docs/tranches/T/stage-manifests/square.json:10-13` — `"forbidden": [… "square-caption-block (#11 — the SquareInstrument telemetry/caption strip; a ruled removal …)"]`, under the rule `"any rendered on-stage element NOT in this set REDs proof:stage-inventory"`. The `sanctioned` set is exactly four entries — stage-card, demo-box, axis-sliders, **rubber-band-tether** — and contains neither the telemetry strip nor the coordinate field.

The block renders unconditionally: `:21` (telemetry) and `:35`,`:41`,`:44` (legend, caption, axis-range) carry **no** `v-if`. Only the two hint lines are gated (`:46`, `:53`).

The T-tranche's own gate-oracle lane already diagnosed *why* this survived — `docs/tranches/T/audit/lanes/29-gate-oracle-gap.md:109`: *"The caption is **required** by `proof:square-honest` (b) … Inverted **and** superfluous."* A gate mandating the thing the owner struck. That inversion is unremediated, and the U-tranche re-verification (`lane-03:29`) accepted "gate exists" as proof of removal without reading the template.

Worse for the design axis: the block has **grown** since the rejection. Verdict #11 struck four lines; P.W6 added a fifth (`press C to trace the field`, `:52-55`) and re-worded the first to advertise a second verb (`, or press Play to tour it`, `:42`). And lane-04 records the adjacent binding ruling — `docs/tranches/T/audit/lanes/04-square.md:7-8`: *"#5 (the cube's on-stage numeric readout dies — **the same genus as square's x/y strip**)"* — i.e. the telemetry numerals at `:23-28` fall under a second ruled removal.

**Falsifier.** Produce a post-T owner ruling that reverses #11 or re-sanctions the caption/telemetry (I searched `keyframes.js/docs/**` and `value.js/docs/tranches/V/megatranche/**` for `VERDICT #11` / `square caption` / `square-honest`; the only forward references — `T/FINAL.md:36`, `U/lane-03:29`, `square.json:12` — all treat it as a removal). Or show a runtime path that suppresses the block. Or: `square.json:14-16` lists `square-instrument-disposition` under `pendingOwner` — if a sign-off exists that keeps the strip, this claim collapses to "the manifest is stale", which is still a defect but not a blocker.

---

## 2. MAJOR

### D-3 · MAJOR · `opacity: 0.8` on the legend hints is a WCAG 1.4.3 AA failure, and it is the *sole* cause
`SquareInstrument.vue:203-205`, consumed at `:45-55`

```css
.square-legend-hint { opacity: 0.8; }
```

The hints are `text-caption text-muted-foreground` → `--muted-foreground` at `--type-caption` = `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)`, i.e. **12 px** at the small end (glass-ui `typography/scale.css`). Below 18.66 px this is normal text: AA requires **4.5:1**.

| | light / card | light / page-bg | dark / card | dark / page-bg |
|---|---|---|---|---|
| hint (`--muted-foreground` @ 0.8) | **3.38** ✗ | **3.47** ✗ | **4.04** ✗ | 5.23 ✓ |
| sibling caption (same colour, no opacity) — `:41-43` | 5.01 ✓ | 5.21 ✓ | 5.43 ✓ | 7.70 ✓ |

Three of four substrate/theme combinations fail; the **light theme fails on both endpoints**, so the glass plate's actual resolved value cannot rescue it. The control row is decisive: the caption one line above, in the same colour at the same size, passes at 5.01 — the *only* difference is the `opacity: 0.8`. `--muted-foreground` is already the ramp's minimum-viable text tone; multiplying it is spending contrast the token has none of.

Compounding, same nodes: `text-caption` resolves `font-style: italic` (glass-ui `typography/semantic.css`, `@utility text-caption`) at weight 400. So the hints are *italic, light-weight, muted, 12 px, at 3.38:1* — four attenuations stacked on the only copy that names the scene's hidden verbs.

**Falsifier.** Measure the composited hint against the real glass backdrop; if the plate resolves outside `[--card, --background]` in a direction that lifts the ratio ≥ 4.5:1 in the light theme, the claim dies. Or show `--muted-foreground` is re-pointed inside a glass tier (glass-ui's tier blocks do not touch it in 7.0.0; `style.css:203-208` only zeroes `--glass-tint-strength-aa`).

---

### D-4 · MAJOR · Every keyboard affordance is documented only inside `aria-hidden="true"`
`SquareInstrument.vue:10, 21, 35` (all four roots) · `SquareScene.vue:50` · `useSquareKeyboard.ts:72-96`

The scene ships four keyboard verbs: arrow nudge (±0.25), `Home`/`End` recenter, and the `c` envelope-tour egg (`useSquareKeyboard.ts:73-95`). Two of them are announced **only** by the legend text at `:48` and `:55` — and every root of this component is `aria-hidden="true"` (`:10`, `:21`, `:35`). The box's accessible name is `"Drag the box across two axes — a spring chases each axis"` (`SquareScene.vue:50`) — a pointer verb, naming none of the keyboard ones. `aria-describedby` is absent; there is no `sr-only` twin.

So the population that most depends on written keyboard instructions is the one population guaranteed not to receive them. WCAG 3.3.2 (Labels or Instructions, A) — instructions provided for one input modality and withheld from the modality that needs them.

Note this is *not* the usual "aria-hidden on decoration" case: the x/y numerals **are** correctly duplicated for AT via `aria-valuetext` on the two `role="slider"` children (`SquareScene.vue:63,73`), which is why hiding the telemetry numerals is right. The hints have no such twin.

**Falsifier.** Point to any AT-reachable node in the mounted tree that names `c`, `Home`/`End`, arrows, or double-tap. (`grep -rn "aria-describedby\|sr-only" demo/scenes/square/` → only `.sr-only-slider` at `SquareScene.css:16`, which carries the two axis values and nothing else.)

---

### D-5 · MAJOR · The progressive disclosure is pointer-gated: a keyboard-only user can never reach the hints, even visually
`SquareInstrument.vue:46, 53` (`v-if="tumbleHintShown"`) · `SquareScene.vue:128-130, 149-151, 227-230`

`tumbleHintShown` flips only when `isSettled && hasDragged` (`SquareScene.vue:149-151`), and `hasDragged = true` is written in exactly one place — `captureFrame()` (`SquareScene.vue:230`), which is `useDragScrub`'s `onStart` hook, reached only from `@pointerdown` (`SquareScene.vue:52, 256-260`).

`useSquareKeyboard`'s nudge and tour route through `reseat` + `onTarget` (`useSquareKeyboard.ts:60-61, 87-88, 94-95`) and never touch `hasDragged`. A user who tabs to the box and arrows it to rest satisfies `isSettled` forever and `hasDragged` never — so the two `v-if` nodes never mount, for *anyone* who does not use a pointer. That includes sighted keyboard users and switch-device users, for whom the hidden verbs are the *only* usable ones (`c` and the arrows are keyboard-exclusive).

The disclosure is therefore inverted: it reveals keyboard instructions exclusively to people who have already demonstrated they use a pointer.

**Falsifier.** Find a second writer of `hasDragged`, or a keyboard path into `captureFrame`. (`grep -n "hasDragged" demo/scenes/square/SquareScene.vue` → `:130` declaration, `:149` read, `:230` write. Three sites, one writer.)

---

### D-6 · MAJOR · Even under the *intended* reading, `TETHER_REACH` is uncoupled from the box's real travel
`SquareInstrument.vue:82, 86-87` · `useSquareDemo.ts:64, 203-204`

Grant D-1 its repair — assume `viewBox="0 0 100 100"` were added. The tether's endpoint is then

```
bx = 50 + deflX * 38   (TETHER_REACH = 38, :82)
```

i.e. **38 % of the stage's width** at full deflection. The box's endpoint is

```
tx = springX.value * TRAVEL   with TRAVEL = 110   (useSquareDemo.ts:64, 203)
```

i.e. a fixed **110 CSS px**. Percent and pixel. The two coincide only where `0.38 × stageWidth = 110 px` → **stageWidth = 289 px**, and independently `0.38 × stageHeight = 110 px` → **stageHeight = 289 px**. On any other stage the tether tip overshoots (large stage) or undershoots (small stage) the box it is drawn to; and because `preserveAspectRatio="none"` stretches x and y **independently**, on a non-square stage the miss is **anisotropic** — the tether's error differs per axis, so the "spring pull made physical" points in a direction the spring is not pulling.

The `bow` term inherits the same defect: `bow = min(len * 0.18, 8)` (`:93`) caps at 8 user units — 8 % of the stage under the intended viewBox, so the slingshot curvature is a function of plate size rather than of the deflection it is meant to express.

**Falsifier.** Show the stage plate is constrained square at 289 px, or show `TETHER_REACH` derived from `travel` somewhere. (`SquareScene.vue:18-25` passes `deflX`/`deflY` only; `travel` is destructured at `:132` and used solely for the drag projection at `:261-262` — it never reaches the instrument.)

---

### D-7 · MAJOR · The coordinate field — the component's stated thesis — is drawn below the perception floor
`SquareInstrument.vue:101-140`

The header calls it *"the draughtsman's coordinate field (**the missing axes**)"* (`:101-102`). Measured:

| element | mix | light/card | light/bg | dark/card | dark/bg |
|---|---|---|---|---|---|
| centre crosshair `:113-121` | `color-mix(in srgb, var(--border) 70%, transparent)` | **1.52** | **1.56** | **1.61** | **1.95** |
| quarter-tick frame `:132,137` | `color-mix(in srgb, var(--border) 30%, transparent)` | **1.19** | **1.20** | **1.22** | **1.24** |

WCAG 1.4.11 (Non-text Contrast, AA) sets **3:1** for graphical objects required to understand content. The crosshair peaks at 1.95:1 — 65 % of the floor. The quarter-ticks sit at 1.19–1.24:1, which is *below the threshold of reliable perception for a 1 px line* on any display, in any theme.

`--border` is already the ramp's hairline tone; taking 70 % and 30 % *of a hairline* is the error. The dilemma is exhaustive and both horns are defects:

* if the field is **content** (as `:101-102` and `:8` claim), it fails 1.4.11 by 1.5–2.5×; or
* if it is **pure decoration** (1.4.11-exempt), then the component's own stated purpose — supplying "the missing axes" for a "true 2-axis space" (`:3-4`) — is unfulfilled, and the strongest justification for the layer's existence evaporates.

There is no `@media (forced-colors: active)` and no `@media (prefers-contrast: more)` anywhere in the file; glass-ui's `accessibility.css` handles only `aria-*` state borders, nothing that reaches these gradients.

**Falsifier.** Show a live measurement ≥ 3:1 against the real plate — impossible for the 30 % ticks, whose *maximum* over the four substrates is 1.24:1 and which cannot exceed ~1.3:1 for any backdrop in the ramp. For the crosshair, a substrate outside `[--card, --background]` could in principle lift it; produce it.

---

### D-8 · MAJOR · The instrument chrome sits *inside* the subject's travel envelope — and the `c` egg drives the box straight over the hint that advertises it
`SquareInstrument.vue:171-180, 192-202` · `SquareScene.css:34` · `useSquareDemo.ts:64` · `useSquareKeyboard.ts:24-30`

The box is 12 rem = **192 px** (`SquareScene.css:34`) and travels **±110 px** per axis (`useSquareDemo.ts:64`). Its maximum extent from the stage centre is therefore **96 + 110 = 206 px** in each direction. The chrome is pinned at fixed insets with no reserved gutter:

* `.square-telemetry` — `top: 1rem; left: 1.25rem` (`:172-173`)
* `.square-legend` — `bottom: 1rem; right: 1.25rem` (`:193-194`)

Both carry `z-index: var(--z-content)` (`:179`, `:201`) = **10** — *the same rung the box carries* (`SquareScene.css:33`). Equal z-index resolves by DOM order, and `<SquareInstrument>` precedes the box (`SquareScene.vue:18` vs `:44`), so **the opaque teal box paints over the readout**, not behind it.

Occlusion thresholds, derived: telemetry occupies roughly `x ∈ [20, 125…190]`, `y ∈ [16, 84…108]` (title `text-display` = `--type-display-1` = 25.9–41.9 px with `leading-none`; axes row `text-mono-small` = 14–20 px × 1.4; badge `--type-admin-label` = 10 px + `py-0.5`; gaps `0.25rem`). Box top-left at full negative deflection is `(cx − 206, cy − 206)`. Overlap when **stage < ~790 × 630 px**. For the legend (caption ~48 chars at 12–16 px italic ≈ 290–390 px unwrapped, four rows ≈ 69–90 px tall), overlap when **stage < ~1030 × 625 px**.

On lg the rail eats `--rail-width: clamp(25rem, 33svi, 32rem)` = 400–512 px (`design-idioms.css:47`), so a 1440-px viewport leaves a stage well under 1030 px wide; below lg the stage is full-bleed at phone width. **Occlusion is the normal case, not the edge case.**

And the collision is not incidental — it is *scripted*. `ENVELOPE_LEGS` (`useSquareKeyboard.ts:24-30`) tours `[1,-1] → [1,1] → [-1,1] → [-1,-1] → [0,0]`: leg 2 parks the box at bottom-right, **on top of the legend**, and leg 4 parks it top-left, **on top of the telemetry**. The `c` egg the hint advertises is the one gesture that most reliably hides the hint and the live readout.

`pointer-events: none` (`:177`, `:200`) means nothing is *stolen* — but nothing is *readable* either. This is the classic chrome-in-the-travel-envelope error: the composition comment calls it *"Asymmetric chrome around the centred subject — the instrument-plate composition"* (`:169-170`), which is true only while the subject stays centred, which is precisely what the scene exists to prevent.

**Falsifier.** Measure the stage-cell box in the built app at 1440×900 and at 390×844; if `width ≥ 1030 ∧ height ≥ 630` at *both*, the legend claim dies (the telemetry claim needs only `≥ 790 × 630`). `UNPROVEN-NEEDS-LIVE` for the exact pixel rects; the *thresholds* and the z-order are source-derived and stand independently.

---

## 3. MINOR

### D-9 · MINOR · `.square-live-caption` is a dead class — and the hitherto census still describes it as live
`SquareInstrument.vue:41` · **contradicts** `keyframes.js/docs/tranches/T/audit/lanes/31-font-census.md:126,175`

`grep -rn "square-live-caption" /Users/mkbabb/Programming/keyframes.js` returns four hits: **one** template attribute (`SquareInstrument.vue:41`) and **three** documentation references. **Zero rule definitions** — not in the scoped block (`:100-212`), not in `SquareScene.css`, not in `demo/styles/*`, not in glass-ui.

The T-era font census records it as live and typed:

* `:126` — `| mono | 14.384px | 400 | normal | 1.438px | 58 | \`.square-live-caption\`, \`.text-mono-caption\`, … |`
* `:175` — `| Square live-caption block … | Fira Code 400/14.384px, ls 1.44px | … | Present | \`SquareInstrument.vue:42-55\` \`.square-live-caption\` |`

**I contradict the corpus here.** At HEAD the class resolves to nothing, and the span's actual voice comes from `text-caption` → `var(--font-text)` (Plus Jakarta Sans), **italic**, `--type-caption` 12–16 px — *not* Fira Code, *not* 14.384 px, *not* `ls 1.44px`, *not* uppercase. The provenance is `git log`: commit `f9752c58` *"T.D4 mono demoted to the DATA register (RULED, P-THEME graft) — every UI-voice mono leaf re-homed to Jakarta (… gesture prose/tooltips/legends/status badges → text-small|text-caption font-medium)"*. That commit deleted the rule and left the class attribute behind. Two stale census rows and one orphan hook.

**Falsifier.** Produce the `.square-live-caption` rule from any sheet in the resolved cascade, including a Tailwind-generated one (it is not a utility-shaped name, so Tailwind cannot synthesise it).

---

### D-10 · MINOR · The two halves of the instrument disagree on how the axes are named
`SquareInstrument.vue:24, 26` vs `:44`

* Telemetry labels use `.text-mono-small` → `@utility text-mono-small { font-family: var(--font-mono); font-size: var(--type-small); line-height: … }` — **no `text-transform`**. Renders lowercase `x`, `y`.
* Legend uses `.text-mono-caption` → `@utility text-mono-caption { … letter-spacing: var(--type-tracking-caps); **text-transform: uppercase** }` (glass-ui `typography/utilities.css`). Renders `X · Y ∈ [-1, 1]`.

Same instrument, same two axes, two casings, ~200 px apart. The prop names, the ARIA (`SquareScene.vue:63` `aria-valuetext=\`x ${…}\``) and the doc comments all use lowercase; the legend is the outlier, and it is the one that states the *domain* of the very symbols the telemetry labels. On the design axis a coordinate name is a mathematical identifier — case is semantic, not styling.

**Falsifier.** Show a rule cancelling `text-transform` on `:44`. The scoped block sets none, and `.square-legend` (`:192-202`) declares only layout.

---

### D-11 · MINOR · The readout grid re-measures whenever a value crosses zero
`SquareInstrument.vue:23-28, 185-190`

```css
.square-telemetry-axes { grid-template-columns: auto auto auto auto; gap: 0.15rem 0.45rem; }
```

The values are `toFixed(2)` strings (`SquareScene.vue:266-267, 279-280, 305-306`) that gain and lose a leading `-`. `tabular-nums` (`:24-27`) equalises *digit* advance widths; it does **not** reserve a sign column. With four `auto` tracks, a `0.00 → -0.42` transition widens track 2, which shifts tracks 3 and 4 leftward — so the `y` label and its value jitter horizontally every time `x` changes sign, and vice versa.

Cadence is gesture-rate, not 60 Hz (the readout is written from `onScrub`/`onEnd`/`onTarget`, per the deliberate note at `SquareScene.vue:185-186`), so this is jitter rather than thrash — but it is jitter on the one element whose whole job is to be *read* while moving. The fix is a reserved sign column or a `ch`-sized value track, neither of which is present.

**Falsifier.** Show the values always carry a sign, or a `min-width`/`ch` constraint on the value cells. Neither exists — the format strings are bare `toFixed(2)`.

---

### D-12 · MINOR · RTL: the physical insets and the flow-relative alignment disagree
`SquareInstrument.vue:172-173, 193-198`

`.square-telemetry` pins with `left: 1.25rem`; `.square-legend` pins with `right: 1.25rem` — **physical** properties, direction-blind. But `.square-legend` also sets `align-items: flex-end` (`:197`), which in a column flex container is **cross-axis** — i.e. inline-direction — and therefore *is* direction-aware. Under `dir="rtl"` the block stays pinned to the physical right edge while its children align to the block's *left* edge, and the inherited `text-align: start` flips too: a ragged-left column hugging the right rail, with mixed bidi runs in `x · y ∈ [-1, 1]`. The mirrored composition (telemetry should move to the top-right, legend to the bottom-left) does not occur at all.

The correct forms — `inset-inline-start` / `inset-inline-end` — are what the flow-relative `flex-end` already assumes.

**Falsifier.** The demo ships no `dir` attribute and no i18n (`grep -rn 'dir="rtl"\|direction: rtl\|:dir(' demo index.html` → 0 hits), so this is latent, not live: **INFO if RTL is out of scope by product decision; MINOR as authored**, because the file already mixes the two coordinate systems in a single rule and that is a defect independent of whether RTL ships.

---

### D-13 · MINOR · `prefers-reduced-motion` is honoured cosmetically and the comment says so out loud
`SquareInstrument.vue:80-81, 207-211`

The file's entire PRM concession is:

```css
@media (prefers-reduced-motion: reduce) { .square-tether { transition: none; } }
```

— it turns off a **160 ms opacity fade**. The comment states the exemption plainly: *":80-81 — PRM snaps the FADE off in CSS; **the geometry is unchanged**."*

What remains unchanged under PRM:

* the tether path recomputes every frame from `deflX`/`deflY` (`:83-97`), fed at the paint-loop cadence (`SquareScene.vue:143-152` ← `useSquareDemo.ts:246`);
* the post-release spring chase, which is **not** user-driven — `releasePolicy: "persist"` plus `settle()` re-arms the loop so the box oscillates to rest after the pointer is gone (`SquareScene.vue:273-282`);
* the `c` envelope tour: five legs, `setTimeout(step, 520)` (`useSquareKeyboard.ts:48-69`) — fully autonomous;
* the double-tap tumble: `target += 360` on a spring (`useSquareTumble.ts:42-46`).

None of the three composables contains a PRM query: `grep -n "prefers-reduced-motion\|matchMedia" demo/scenes/square/*.ts` → **0 hits**. The tree proves it knows how — `useCubeDemo.ts:164` and `useSequenceInstrument.ts:31` both gate on `window.matchMedia?.("(prefers-reduced-motion: reduce)")`, and `EasingTarget.vue:234` uses VueUse. Square is the scene that opted out, and the instrument is the layer that draws the un-gated motion.

Direct-manipulation feedback is fairly exempt from PRM; a 5-leg autonomous tour and a 360° barrel roll are not.

**Falsifier.** Show a PRM guard reaching `SpringProgress` inside the engine such that spring output snaps to terminal under PRM (`lane-frontend.md:487` notes `useSceneSwap.ts:29` does this for *scene swaps* — if the same snap governs these springs, the autonomous-motion half of this claim dies and only the tether-geometry half survives).

---

### D-14 · MINOR · Duplicate PRM rule across two files; the census counts both
`SquareInstrument.vue:207-211` **and** `SquareScene.css:136-139` · **contradicts** `lane-frontend.md:475-476`

Both files declare the identical rule for the identical selector:

```css
@media (prefers-reduced-motion: reduce) { .square-tether { transition: none; } }
```

`SquareScene.css` is loaded as `<style scoped src="./SquareScene.css">` (`SquareScene.vue:331`), so its copy compiles to `.square-tether[data-v-<scene>]`. `.square-tether` is rendered by the **child**, and `SquareInstrument` is a **multi-root** component (four sibling roots at `:10`, `:12`, `:21`, `:35`) — Vue does not propagate a parent scope id onto the children of a fragment root, so the parent's copy most likely matches nothing.

`lane-frontend.md:475-476` lists `scenes/square/SquareInstrument.vue:207` and `scenes/square/SquareScene.css:136` as two of the "10 CSS `@media (prefers-reduced-motion: reduce)` blocks" feeding the headline "**13 enforcement sites across 12 files**" (`:471`). **I contradict that count**: these are one rule written twice for one selector, so the true distinct-enforcement figure is 12, and the square scene's apparent double coverage is single coverage of a fade.

**Falsifier.** If Vue *does* stamp the parent scope id onto fragment roots, the parent copy is live — in which case the finding downgrades from "one dead rule + one live rule" to "one redundant duplicate", and the census count is still inflated. The claim survives either branch; only its label changes.

---

### D-15 · MINOR · Off-grid spacing: five step sizes for four elements
`SquareInstrument.vue:128, 172-173, 176, 188, 194, 199`

The file's complete spacing vocabulary: `1rem`, `1.25rem`, `0.25rem`, `0.15rem`, `0.45rem`, `12.5%`. glass-ui's scale is `--spacing: 0.25rem` (`dist/styles/components.css`), and the demo consumes it through Tailwind's `p-*`/`gap-*` steps (the file itself uses `px-2 py-0.5` at `:30`). `0.15rem` (2.4 px) and `0.45rem` (7.2 px) are on no grid — not the 0.25 rem step, not a φ ratio (the demo owns `--phi`, `layout.css`), not a doubling.

Aristotelian proportion asks that the *number* of distinct intervals be as small as the composition permits: four elements needing five bespoke intervals, two of which are sub-3px, is measurement without a measure. Compare the vertical rhythm it is meant to serve — `0.25rem` between title and axes (`:176`) but `0.15rem` between the axis rows (`:188`) and between legend lines (`:199`) — a 1.67× ratio chosen for no stated reason, at a scale (2.4 px vs 4 px) below the threshold at which the distinction is perceptible.

**Falsifier.** Show `0.15rem`/`0.45rem` derive from a token or a stated ratio. `grep -n "0.15rem\|0.45rem" demo/styles/*.css` → 0 hits; they are local literals.

---

### D-16 · MINOR · The tether stroke is sub-pixel, sub-3:1, and its `vector-effect` is inert
`SquareInstrument.vue:159-166`

```css
.square-tether-line { stroke: var(--color-progress); stroke-width: 0.8; opacity: 0.45; vector-effect: non-scaling-stroke; }
```

Composited: **1.85:1** (light/card), **1.87:1** (light/bg), **2.31:1** (dark/card), **2.47:1** (dark/bg) — below the 3:1 non-text floor in all four, before accounting for the sub-pixel width. `stroke-width: 0.8` renders as a 0.8 px line: antialiasing spreads it, so the *effective* peak coverage is lower still than the composite above.

`vector-effect: non-scaling-stroke` is a no-op here — it pins stroke width against the viewBox→viewport scale, and per D-1 there is no viewBox, so the scale is already 1. (Under D-1's repair it would become meaningful, at which point 0.8 px is what it produces anyway.)

The header calls the stroke *"the red motion-authority"* (`:143-144`) — stale prose: `--color-progress` was re-pointed to the **violet** `--accent-kf` at `style.css:155-163` (*"so red exits the chrome entirely"*), which is owner ruling #16 (*"I don't like this latent red theme"*, `VERDICT.md` row 16). The comment names a colour the token no longer carries, three times in this file (`:143`, plus `SquareScene.css:70, 100-101`).

**Falsifier.** Show the tether is decorative-exempt under 1.4.11 — plausible, since the x/y numerals carry the same information textually. That downgrades the contrast half to INFO; the inert `vector-effect` and the stale "red" prose stand regardless.

---

### D-17 · MINOR · "double-click" names the mouse verb the handler was deliberately changed to avoid
`SquareInstrument.vue:48` · `SquareScene.vue:285-292`

The copy reads `double-click to tumble`. The handler is `useDoubleTap` — and the scene records exactly why: *"S.G3 S2 — the Tumble is a POINTER-based double-tap now (touch parity; **the former `@dblclick` was mouse-only**)"* (`SquareScene.vue:285-286`).

So the implementation was migrated off the mouse-only posture for touch parity, and the visible copy still names the mouse-only posture. A touch user reads an instruction for an input device they are not holding, describing a gesture that *does* work for them under a different name. One word (`double-tap`) reconciles copy to behaviour and to the tree's own stated rationale.

**Falsifier.** Show `useDoubleTap` is in fact `dblclick`-based. (`grep -rn "dblclick" demo/composables/useDoubleTap.ts` — the scene's own comment at `:285-286` is the primary evidence and it is unambiguous.)

---

### D-18 · MINOR · The settled/tracking status is a WCAG 4.1.3 status message rendered inside `aria-hidden`
`SquareInstrument.vue:21, 29-33`

The badge flips `settled` ⇄ `tracking` (`:31-32`) driven by the spring's rest state (`SquareScene.vue:146`) — a change of state conveyed visually, without a focus change, that the user did not directly trigger (it fires when the spring *arrives*, seconds after release). That is the definition of a status message (WCAG 4.1.3, AA). It sits inside `aria-hidden="true"` (`:21`) and the scene contains no `role="status"` / `aria-live` — the demo has exactly two such regions, neither in this scene (`App.skeleton.vue:30`, `CopyButton.vue:15`).

Severity is held to MINOR because the state is arguably derivable from the `aria-valuenow` stream on the axis sliders (`SquareScene.vue:62, 72`) and is not required to complete any task.

Two things this claim is **not**: (a) it is not a colour-only-encoding failure — the two states differ by *word*, so `.settled-badge`/`.tracking-badge` (`design-idioms.css:230-237`) do not violate 1.4.1; (b) the badge's own text contrast is fine — computed **7.58:1** (light/card) and **6.33:1** (dark/card) for `.settled-badge`, **4.94:1** / **6.14:1** for `.tracking-badge`, all ≥ 4.5:1 at `--type-admin-label` = 10 px. The idiom's documented "AA-CONTRAST (load-bearing)" claim (`design-idioms.css:213-217`) **holds** on this substrate.

**Falsifier.** Show a live region announcing settle, or argue the state is not a status message per 4.1.3's "not a change of context" clause.

---

## 4. INFO

### D-19 · INFO · Two line-heights compete at equal specificity in the same layer
`SquareInstrument.vue:22`

`class="text-display … leading-none"`. `@utility text-display` sets `line-height: var(--type-leading-display)` = **1.05** (`typography/semantic.css`, `scheme-motion.css`); `leading-none` sets `line-height: 1`. Both are `@layer utilities`, both `(0,1,0)` — the winner is Tailwind v4's emission order between a built-in utility and a plugin `@utility`, which is not stated anywhere in the demo. The delta is ~2 px on a 41.9 px word, so the stakes are low; the *fragility* is that the file cannot state which value it renders.

**Falsifier.** Build the CSS and read the emitted order.

### D-20 · INFO · The `@layer demo-typography` rung-list override could be one token
`demo/styles/style.css:44-51, 263-274`

The comment asserts: *"glass-ui's `text-display-*` rungs hardcode `font-weight:600` and **there is no `--font-display-weight` token to swap it**"*, justifying an eight-selector override list. glass-ui 7.0.0 **does** ship it — `typography/scale.css`: `--font-display-weight: 600; --type-weight-display: var(--font-display-weight);` — and every rung reads `font-weight: var(--type-weight-display)`. Setting `--font-display-weight: 400` at `:root` replaces the whole block. Cited here because `.text-display` at `SquareInstrument.vue:22` is one of its eight consumers.

**Falsifier.** Show the installed glass-ui differs from `node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css` — note **F-1** (`lane-frontend.md:15`): glass-ui is a *phantom dependency*, absent from `package.json` and the lockfile, so the installed 7.0.0 is not reproducible and this reading is only as stable as the current `node_modules`.

### D-21 · INFO · No forced-colors treatment for the field or the tether
`SquareInstrument.vue:105-166`

Zero `@media (forced-colors: active)` in the file; glass-ui's `accessibility.css` covers only `aria-*` state borders. Under forced colors, `stroke` is in the forced-property set so the tether survives (recoloured), while the field's gradient **stops** are not forced — so the crosshair/ticks either vanish or render at an arbitrary relation to `Canvas`. The instrument's two graphical layers degrade *differently*, which is worse than either degrading consistently.

**Falsifier.** UA-dependent; `UNPROVEN-NEEDS-LIVE` for the exact rendering. The *absence* of any forced-colors rule is source-certain.

---

## 5. SUPERLATIVES (L-18 runs both ways — each carries its falsifier)

### S-1 · Zero raw colour literals — every colour flows through a published token
`SquareInstrument.vue:100-212`

Nine colour references in the sheet: `var(--border)` ×4, `var(--foreground)` ×1, `var(--color-progress)` ×1, plus `transparent` in the `color-mix` tails. **No hex, no named colour, no `rgb()`, no `hsl()`.** This is the discipline its own sibling had to be *repaired* into — `SquareScene.css:38-44` records the retirement of a raw `aquamarine` literal onto `--subject-teal`. The instrument never needed that repair.

**Falsifier.** Find a colour literal in `:100-212`. (`grep -nE "#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|\b(aqua|teal|red|blue|white|black)\b" SquareInstrument.vue` over the style block → `white` and `black` appear only in `SquareScene.css:54,57,59`, not here.)

### S-2 · Adds nothing to the flat-namespace collision surface
**folds** `lane-frontend.md:441, 596` · `CENSUS-2026-08-03.md:137`

The census: *"98 unprefixed demo custom properties, **zero `--kf-*`** — flat"*, called out as *"a collision surface worth a lane of its own."* This file **declares zero custom properties** — it only reads published ones — while namespacing **all four** of its own class names (`.square-field`, `.square-tether`, `.square-telemetry`, `.square-legend`) and correctly consuming the *shared* idioms (`.readout-accent`, `.status-badge`, `.settled-badge`, `.tracking-badge`) from their single authoritative home at `design-idioms.css:189-242` rather than re-authoring them. Against a 98-property flat namespace, a 212-line component that adds 0 is the right answer.

**Falsifier.** Find a `--*:` declaration in `:100-212`. There are none; the only `--` occurrences are `var()` reads.

### S-3 · The derived-read claim survives the read
`SquareInstrument.vue:1-9, 59-98` · `useSquareDemo.ts:239-247`

The header promises *"All are DERIVED READS of the spring state SquareScene feeds as props — no second writer, no second rAF"* (`:8-9`). The `<script setup>` is `defineProps` + **one** `computed` (`:83-97`). No `ref`, no `watch`, no lifecycle hook, no `requestAnimationFrame`, no DOM write, no emit. The producer is single and identified: `useSquareDemo.ts:246` is the sole `onTick` call site, mirroring into five refs in `SquareScene.vue:143-152`. Load-bearing architectural comments that survive verification are rarer than they should be; this one does. (D-1 concerns the *geometry* the computed produces, not the discipline that produces it.)

**Falsifier.** Find any write, side effect, or timer in `:59-98`. There are none.

### S-4 · The instrument cannot steal the gesture it measures
`SquareInstrument.vue:11, 17, 177, 200`

All four roots carry `pointer-events: none` — the field (`:111`), the tether (`:151`), the telemetry (`:177`), the legend (`:200`) — and all four carry `aria-hidden="true"`. The layer overlays the entire drag arena (`inset: 0` on two of them) yet is transparent to both the pointer and the AT tree, and the pointer transparency is complete rather than partial. Given D-8 (chrome *inside* the travel envelope) this is the one thing that keeps the overlap a legibility problem rather than a functional one.

**Falsifier.** Find a root without `pointer-events: none`, or a descendant that re-enables it. Neither exists.

---

## 6. Claims I killed (recorded so the challenge can be audited against its own falsifiers)

| candidate | why it died |
|---|---|
| *"`text-caption` here omits `font-medium`, breaking the T.D4 re-voicing idiom"* | **False defect.** 3 of the demo's 8 `text-caption` call-sites use `font-medium` (`SequenceScrubber.vue:11`, `SpringPhysicsFacet.vue:105`) and 5 do not (`SpringHeatmap.vue:50`, `StartingStyleTarget.vue:72`, `CubeScene.vue:136`, plus this file's three). Tree-wide inconsistency, not this component's defect. Dropped. |
| *"`.readout-accent` fails AA in dark"* | **Killed by measurement.** `--color-progress` on card: **4.63:1** light, **5.77:1** dark; on page-bg **4.81** / **8.18**. Passes 4.5:1 everywhere at `--type-small` 14–20 px. (My first pass reported 2.65 — I had omitted the oklab→sRGB gamma encode. Corrected before writing.) |
| *"settled vs tracking is colour-only encoding (1.4.1)"* | **Killed by the tree.** The badge text itself changes (`:32`), so the state is not conveyed by colour alone. Reframed as D-18 (4.1.3), which is a different and weaker claim. |
| *"`.status-badge`'s documented AA claim is false"* | **Killed by measurement.** `design-idioms.css:213-217` claims the 14 %-tint / 50 %-text mix reads ≥ 4.5:1 in both themes; computed 7.58 / 6.33 (settled) and 4.94 / 6.14 (tracking). The idiom's claim holds. Recorded as a positive inside D-18. |
| *"`--type-admin-label` at 10 px is too small for a status word"* | **Not this component's defect.** It is the published glass-ui rung (`scale.css`), consumed correctly, and it passes contrast. A quarrel with the scale, not with the call-site. |
| *"telemetry `aria-hidden` hides the x/y values from AT"* | **Killed by the tree.** The values are correctly duplicated via `aria-valuetext` on both axis sliders (`SquareScene.vue:63, 73`); hiding the visual twin is the *right* call and prevents double announcement. Only the un-twinned content (D-4, D-18) is a defect. |

---

## 7. Ranked remediation (design axis only; no code written — read-only law)

1. **D-1** — add `viewBox="0 0 100 100"`, or drop the SVG and draw the tether from the same px space the box travels in.
2. **D-2** — resolve the standing owner ruling: prune the caption/telemetry per VERDICT #11 + `square.json:12`, or obtain and record the `pendingOwner` sign-off at `square.json:14-16`. The two closure records (`T/FINAL.md:36`, `U/lane-03:29`) need correcting either way.
3. **D-6** — derive `TETHER_REACH` from `travel`, or the repair in (1) is cosmetic.
4. **D-3** — delete `opacity: 0.8`; the measurement shows that single line is the whole failure.
5. **D-4 + D-5** — move the keyboard verbs into the accessible name or an `aria-describedby` twin, and arm the disclosure from the keyboard path as well as the pointer path.
6. **D-8** — reserve a gutter (or shrink the chrome) so the ±206 px envelope cannot reach it; the `c` tour is the reproducer.
7. **D-7** — raise the field off `--border`'s 30 %/70 % dilutions to ≥ 3:1, or retire the layer and stop claiming "the missing axes".
8. Housekeeping — **D-9** (dead class), **D-14** (duplicate PRM rule), **D-10** (axis casing), **D-16**/**D-17** (stale "red" prose, mouse-only verb), **D-15** (off-grid gaps).

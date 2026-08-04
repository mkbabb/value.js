claude-opus-5[1m]

# CHALLENGE · `EasingScene` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingScene.vue` (133 L)
**Tree:** keyframes.js HEAD `8281638c` (`fix(demo-shell): provide tooltip context for the routed control group`); working tree dirty only in `.github/workflows/*` (not in scope).
**Mode:** static, read-only. No installs, no dev server, no browser. `/Users/mkbabb/Programming/keyframes.js` and `/Users/mkbabb/Programming/glass-ui` were read as evidence only; the sole write of this lane is this file.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a **falsifier** — the single observation that kills it. Claims that a live render could overturn are marked **UNPROVEN-NEEDS-LIVE** and are excluded from the blocker count.

## Read set (whole, read-only)

`EasingScene.vue` is a 133-line shell that provides a composable and hands three render-props to the host; it cannot be judged alone. The scene as *rendered* is the closure below, all of it read:

| file | L | role |
|---|---|---|
| `scenes/easing/EasingScene.vue` | 133 | the shell (this challenge's nominal target) |
| `scenes/easing/EasingTarget.vue` | 335 | **the scene proper** — the specimen gallery |
| `scenes/easing/EasingTarget.css` | 193 | the gallery's whole visual language |
| `scenes/easing/EasingSidebar.vue` | 234 | the `tabsContent` surface (curve editor + duration) |
| `scenes/easing/useEasingDemo.ts` | 410 | state, sweep clock, preview channel, facility |
| `scenes/easing/easingKeys.ts` | 9 | injection key + scene id |
| `components/playback/PlaybackRibbon.vue` | 244 | the `ribbonContent` surface |
| `components/playback/AnimationVisualizer.vue` | 256 | the ribbon's second clock readout |
| `components/CopyButton.vue` | 113 | the header literal's copy affordance |
| `utils/reference-data/easingGroups.ts` | 121 | the specimen set (9 families) |
| `utils/reference-data/timingCurveUtils.ts` | 90 | sparkline path generation |
| `utils/reference-data/animationDescriptions.ts` | 129 | `NAMED_EASING_BEZIER` |
| `composables/scene-runtime/useSweepScene.ts` | 122 | the rAF recipe + `onArm` contract |
| `composables/scene-runtime/usePainterRegistry.ts` | 20 | the painter seam |
| `styles/design-idioms.css` §161–192 | — | the `.progress-rail`/`.progress-ball` idiom |
| `styles/style.css` §61–190 | — | `--accent-kf`, `--color-progress`, `--primary` |
| glass-ui 7.0.0 `dist/` (installed) | — | `Chip`, `glass-chip.css`, `accent-tone.css`, `typography/utilities.css`, `tokens/*` |

## Method for the contrast figures

All ratios are computed from tokens, not eyeballed. Script: OKLCH→sRGB (Björn Ottosson matrices), `color-mix(in oklab, …)` in Oklab, `color-mix(in srgb, C p%, transparent)` as `rgba(C,p)` composited over the backdrop in sRGB, then WCAG 2.x relative luminance. Inputs:

- `--card` = `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` — glass-ui `tokens/light-dark.css`
- `--foreground` = `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` — ibid.
- `--accent-kf` = `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` — `demo/styles/style.css:130`
- `--color-progress: var(--accent-kf)` (`style.css:163`); `--primary: var(--accent-kf)` (`style.css:141,189`); `.easing-target { --ball-tone: var(--color-progress) }` (`EasingTarget.css:7`)
- chip on-state ground `--accent-band = color-mix(in oklab, var(--card), var(--primary) 22%)` — `glass-chip.css` (`--chip-tint-floor: 12%`, `--accent-band-strength: max(18%, floor+10%)`)

| sample | light | dark | gate |
|---|---|---|---|
| sparkline stroke (`fg`@22% / card) | **1.59:1** | **1.87:1** | 3:1 (1.4.11) |
| origin/terminus tick (`fg`@22% / card) | **1.59:1** | **1.87:1** | 3:1 |
| rail (`ball-tone`@16% / card) | **1.23:1** | **1.33:1** | 3:1 |
| selected sparkline (`ball-tone`@65% / band) | **2.16:1** | **2.58:1** | 3:1 |
| ball (`ball-tone` solid / card) | 4.63:1 | 5.77:1 | 3:1 ✓ |
| tile name, rest (`--on-glass-muted` / card) | 6.06:1 | 7.22:1 | 4.5:1 ✓ |
| tile name, **selected** (`ball-tone` / band) | **3.48:1** | **3.98:1** | 4.5:1 (1.4.3) |
| header literal (`--on-glass-muted` / card) | 6.06:1 | 7.22:1 | ✓ |
| `<h2>` name (`fg` / card) | 16.19:1 | 11.17:1 | ✓ |

(If the Card does **not** resolve `--muted-foreground` to `--on-glass-muted`, the root value `--neutral-5` gives 5.01:1 light / 5.43:1 dark — still passing. The passing rows are robust either way.)

---

# BLOCKERS (3)

## D-B1 · The scene's entire informational payload is drawn at 1.59:1 — and no choice of ink can fix it

**BLOCKER** · `demo/scenes/easing/EasingTarget.css:127–133`, `:142–151`, `:138–141`

```css
.tile-sparkline path { stroke: color-mix(in srgb, var(--foreground) 22%, transparent); }
.tile-stage::before, .tile-stage::after { background: color-mix(in srgb, var(--foreground) 22%, transparent); }
.tile-rail { --rail-tint: 16%; }
```

The scene declares its own thesis at `EasingTarget.vue:2–10`: *"THE SPECIMEN DRAWER IS THE SCENE … a sparkline portrait … The comparative read IS the pedagogy."* The sparkline **is** the content. It renders at **1.59:1 (light) / 1.87:1 (dark)** against the card — WCAG 2.2 SC 1.4.11 requires **3:1** for graphical objects required to understand the content. The origin/terminus ticks, which `EasingTarget.css:136–137` claims make *"the departure … LEGIBLE"*, sit at the same 1.59:1. The rail is at **1.23:1** — below the 1.3:1 that is, in practice, indistinguishable from the ground.

The selected specimen is supposed to be the rescue (`EasingTarget.css:173–176` inks the portrait up to `ball-tone` @65%). It reaches **2.16:1** — still short of 3:1. **Every one of 28 portraits fails, in both themes, in both states.**

The defect is structural, not a palette choice. Against `--card` (L≈0.90) the *maximum* attainable ratio for any ink at α=0.22 is **1.58:1** — pure black at 22% over that card computes to 1.58. Retuning `--foreground`, the theme, or the hue **cannot** move this figure. To clear 3:1 the composite must land at L≤0.267, i.e. α ≥ **0.70** with a black ink. The alpha is the bug; 22% is off by a factor of ~3.

The one graphic that *does* pass (the ball, 4.63:1) is the one that carries no curve information — every ball is identical by explicit design (`EasingTarget.css:171–172`). So the surface spends its entire contrast budget on the element that is deliberately uninformative and starves the 28 that are not.

**Falsifier:** produce a rendered tile whose sparkline stroke measures ≥3:1 against its actual backdrop under either theme with `--foreground` unchanged; or show that the sparkline is decorative because an equivalent textual description of each curve is present in the DOM (it is not — see D-M4).

## D-B2 · `onArm` seeds the sweep clock with the sweep's *output*, so every resume teleports all 28 balls

**BLOCKER** · `demo/scenes/easing/useEasingDemo.ts:161`, `:185–186`, `:208–210`; `demo/composables/scene-runtime/useSweepScene.ts:82–87`

The sweep is a ping-pong: `new NumericAnimation([{p:0},{p:1},{p:0}])` (`useEasingDemo.ts:138–140`). Per frame:

```ts
const phase = ((now - startTime) / (duration.value * 2)) % 1;   // :185  the CYCLE POSITION φ
livePhaseValue = sweep.at(phase).p;                             // :186  the OUTPUT p = triangle(φ)
```

`NumericAnimation`'s default easing is identity (`src/animation/physics/numeric.ts:103` — `easing == null ? (t) => t`), and positions are evenly distributed (`:113–115`), so `p = 2φ` for `φ ≤ ½` and `p = 2 − 2φ` above. **`p ≠ φ` everywhere except φ ∈ {0, ½}.**

`onArm` then re-seeds the clock by *inverting a phase*, but feeds it the output:

```ts
onArm: () => { startTime = performance.now() - livePhaseValue * duration.value * 2; }   // :208–210
```

`useSweepScene.startLoop` calls `onArm()` on every genuine re-arm (`useSweepScene.ts:83–86`), and `scenePlaybackAdapters.ts:202,212` calls `startLoop()` on machine restore and on resume; `useSceneVisibilityPause` calls it on tab-visible (`useSweepScene.ts:119`).

Worked example at the default `duration = 1500`: pause at φ=0.25 → `livePhaseValue` = 0.5. Resume: `startTime = now − 0.5·3000 = now − 1500` → next frame φ = 0.5 → **p = 1.0**. At the 132 px rail measured in D-M1 the balls jump from x=59 px to x=118 px — **a half-rail teleport of every one of the 28 subjects**, on every play-after-pause, every tab-return, and every scrub-then-resume (a scrub writes `livePhaseValue = t` at `useEasingDemo.ts:222`, a raw fraction, and hands it to the same inversion). Pausing on the return leg (φ>½) is worse: the resume maps back into the *outbound* half, so the race also visibly reverses direction.

The tree contradicts itself on this point in three places, all false: `useSweepScene.ts:28–29` (*"so the sweep resumes in phase with no jump"*), `:118` (*"resumes in phase with no jump"*), `useEasingDemo.ts:206–207` (*"the sweep resumes in phase … the resume anchor is exact"*). The proximate cause is a name: the variable holding the *output* is called `livePhaseValue` (`:161`), and its own comment on the same line calls it *"the raw eased sweep value"* — the identifier and the comment already disagree.

This is a design blocker, not merely a correctness one: the scene exists to teach continuity of motion, and its most-used control produces a discontinuity in the subject.

**Falsifier:** show that `startLoop`/`onArm` is not reached on a play-after-pause (e.g. the machine tears the scene down and remounts, resetting `livePhaseValue` to 0); or show `sweep.at(φ).p === φ` for some φ ∉ {0, ½}.

## D-B3 · "Reverse" is a live decoy: it never touches the stage, and it reflects the scrubber across its own midpoint

**BLOCKER** · `demo/scenes/easing/EasingScene.vue:77–82`, `:94–110`; `PlaybackRibbon.vue:20,181–194`; `AnimationVisualizer.vue:246`; `src/animation/engine/play-lifecycle.ts:448–450`

`onToggleReverse` flips **only** `demo.previewAnim.reversed` (`EasingScene.vue:81`). `previewAnim` paints nothing — it is a time-twin whose `t` is written by a watch (`useEasingDemo.ts:327`). The 28 balls are painted from `livePhaseValue` by `frame()`, which never reads `reversed` (`useEasingDemo.ts:173–195`). Three consequences, each derivable from source:

1. **The stage ignores the verb.** Press Reverse: the balls keep racing forward. A labelled primary transport control has no effect on the only thing on stage.
2. **The ribbon's two widgets disagree with each other.** `AnimationVisualizer` reads `anim.effectiveT` (`AnimationVisualizer.vue:246`), and `effectiveT = reversed ? duration − t : t` (`play-lifecycle.ts:449`) → it shows `1−p`. The scrubber is fed `currentT: demo.progress.value * duration` (`EasingScene.vue:100`), un-mirrored → it shows `p`. After one press the visualizer ball and the scrubber thumb sit at mirrored positions on the same clock, and both disagree with the stage.
3. **The scrubber reflects every drag.** `scrubTo` un-mirrors on the way out — `rawT = animation.reversed ? duration − effectiveT : effectiveT` (`PlaybackRibbon.vue:183–185`) — but the thumb's position is re-derived from the un-mirrored `currentT`. Drop the thumb at 25% → `progress` becomes 0.75 → `currentT` re-renders at 75%. The thumb lands at the mirror of where the user released it.

The comment at `EasingScene.vue:79–80` states the intent — *"so the standard visualizer/scrubber … mirror the reverse"* — which is precisely the half that is wrong: mirroring the readout without mirroring the subject manufactures the disagreement. This is the exact class the repo's own law kills: `EasingScene.vue:97–98` and `useEasingDemo.ts:279–283` celebrate that *"the decoy is DEAD"* for the preview channel. It is not; it moved into the Reverse verb.

**Falsifier:** for (1), show any path by which `previewAnim.reversed` reaches `frame()` or `paintTileDots`. For (3), show that reka's `Slider` retains its drag-final internal position and ignores the subsequent controlled `model-value` write — that would kill (3) alone; (1) and (2) survive regardless.

---

# MAJOR (6)

## D-M1 · The curve portrait is squashed ~4:1 — the comparative read the scene is built on is the first casualty

**MAJOR** · `EasingTarget.vue:95–104`, `EasingTarget.css:92–99`, `:111–126`; glass-ui `chip-6ysLmScu.js` (`cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`)

An easing curve's canonical portrait is the **unit square** — that is what makes `ease-in-quad` distinguishable from `ease-in-cubic` at a glance. Here it is drawn into a 4:1 letterbox:

- grid track floor = `minmax(150px, 1fr)` (`EasingTarget.css:94`)
- `shape="cell"` resolves `px-2` → 8 px inline padding per side, plus the chip's 1 px border
- ⇒ `.tile-stage` inline size ≈ **132 px** at the floor
- `.tile-stage { height: 3.25rem }` = 52 px; `.tile-sparkline { inset: 18% 0; height: 64% }` ⇒ band = **33.28 px**
- ⇒ **132 : 33.28 ≈ 3.97 : 1**

With `preserveAspectRatio="none"` on a `viewBox="0 0 1 1"` (`EasingTarget.vue:97–98`), the vertical axis is compressed to **25%** of canonical. Every curve is pressed toward the diagonal; the family distinctions the gallery exists to teach are the exact signal that compression destroys. And because the tracks are `1fr`, the squash gets *worse* on wide viewports — a 220 px track yields 6:1.

The 18% headroom is genuinely well-measured (see S-7), so this is not a clipping bug — it is a proportion bug. A ~52 px stage is the wrong container for a unit-square specimen; the honest options are a square-ish stage or an explicit non-square rendering that the user is told about.

**Falsifier:** produce the rendered tile at the 150 px floor with a measured stage aspect ≤ 2:1; or show that `getCurvePath` emits a pre-compensated path (it does not — `timingCurveUtils.ts:48–56` emits raw `t, 1−v`).

## D-M2 · The selected tile's label is the least legible label in the grid — the demo overrides glass-ui's contrast-solved ink with the raw brand hue

**MAJOR** · `EasingTarget.css:177–180`; glass-ui `glass/accent-tone.css` (`--accent-ink: var(--accent-ink-resolved, var(--foreground))`), `glass/glass-chip.css` (`[data-mode="selectable"][data-state="on"] { color: var(--accent-ink) }`)

glass-ui hands the chip a *solved* on-accent ink: the on-state sets `color: var(--accent-ink)`, backed by `--accent-ink-resolved` (computed by `accent-tone-solve-Cw7WkRD9.js`) with `--foreground` as the fallback. The demo throws it away:

```css
.specimen-tile[data-state="on"] .tile-name { color: var(--ball-tone); font-weight: 600; }
```

Result: raw `oklch(0.56 0.17 295)` on the accent band (card + 22% of the same violet) = **3.48:1 light / 3.98:1 dark**, against a 4.5:1 requirement. The label runs `text-mono-caption` → `--type-caption` = `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` ≈ **14 px** at a 1280 px viewport — nowhere near the ≥18.66 px-bold large-text exemption, so `font-weight: 600` does not lift the gate.

The affordance is **inverted**: at rest the label reads at 6.06:1; selecting it drops it to 3.48:1. Selection makes the one label the user most needs *harder* to read, in the one state the design intends to promote.

*(The chip's `::after` `plus-lighter` flood — `opacity: var(--chip-flood-t)`, 1 when on — sits above this and will shift the composite. Direction and magnitude **UNPROVEN-NEEDS-LIVE**; the figures above are the pre-flood values. The resting-state figures carry no such caveat: `--chip-flood-t` is 0 and the overlay's opacity is 0.)*

**Falsifier:** measure the rendered selected label at ≥4.5:1; or show `--accent-ink-resolved` never resolves in this build, which would mean the demo's override replaces `--foreground` (16.19:1) rather than a solved ink — worse for the design argument, not better.

## D-M3 · The scene's only explanatory sentence renders in uppercase mono with 0.1 em caps tracking

**MAJOR** · `EasingSidebar.vue:42–49`; glass-ui `styles/typography/utilities.css`

```html
<p v-if="catalogueGap" class="text-mono-caption text-muted-foreground" data-register="code">
    {{ demo.currentEasingName.value }} is engine-native — editing here authors a custom cubic-bezier
</p>
```

`@utility text-mono-caption` is defined as `font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform: uppercase`. `--type-tracking-caps` is `0.1em` (`tokens/scheme-motion.css`). Nothing in `EasingSidebar.vue`'s scoped block (`:214–234`) overrides either. The scene's single sentence of user-facing prose therefore renders as:

> `EASE-IN-BOUNCE IS ENGINE-NATIVE — EDITING HERE AUTHORS A CUSTOM CUBIC-BEZIER`

in Fira Code at 0.1 em tracking. All-caps prose reads as shouting and measurably slows reading; caps tracking on a full sentence widens it further; and the mono family is reserved by this repo's own `data-register` contract (`styles/font-roles.json:82`) for *"real code/kbd/pre content"*, *"tabular numeric readout"*, or *"an explicit identifier chip"* — a sentence is none of the three, yet it carries `data-register="code"` to claim the exemption.

This is provably an outlier, not a house style. Of the 19 `text-mono-caption` sites in the demo, **every other one** is a numeric readout or an identifier (`tabular-nums` on 14 of them); and the repo already ships the remedy at `components/instrument/shell/SharePopover.vue:19` — `class="text-mono-caption normal-case …"`. The author knew the escape hatch and did not reach for it here.

The copy also leaks implementation vocabulary: *"engine-native"* is a term the user has no model for; it names a fact about keyframes.js's internals, not about the curve.

**Falsifier:** find a cascade rule (demo or glass-ui) that resets `text-transform` for `[data-register="code"]` or for `p.text-mono-caption`. `grep -rn "text-mono-caption" demo/styles demo/scenes demo/components` returns no such override.

## D-M4 · The whole graphic payload is `aria-hidden`, and the authored per-curve descriptions are rendered nowhere

**MAJOR** · `EasingTarget.vue:94`, `:112–117`; `utils/reference-data/easingGroups.ts:18–102`

```html
<span class="tile-stage" aria-hidden="true"> …sparkline + rail + ball… </span>
```

Everything that distinguishes one specimen from another — portrait, rail, racing ball — is removed from the accessibility tree. What remains is the curve's *name*. The `<svg>` carries no `role="img"`, no `<title>`, no `aria-label`. So the scene that calls the comparative read *"the pedagogy"* (`EasingTarget.vue:10`) delivers, to assistive tech, a list of 28 CSS identifiers.

The remedy is already authored and simply never rendered. `easingGroups.ts` gives **every** curve a human description:

```ts
item("ease-in", "slow start, fast end"), item("ease-out-back", "overshoots, settles"),
item("smooth-step-3", "Hermite interpolation"), item("steps", "discrete jumps"), …
```

`CurveGroupItem.description` is consumed by **no** template in the demo — not as tile text, not as `title`, not as the chip's accessible description, not as a tooltip. `visibleCurves` (`EasingTarget.vue:186–198`) explicitly projects `{ name, fn, path }` and drops `description` on the floor. A sighted user gets no legend either: there is no axis label, no key, no statement of what the race means.

**Falsifier:** find any render site consuming `CurveGroupItem.description`, or any accessible text on the tile beyond `curve.name`.

## D-M5 · 28 mutually-exclusive specimens are exposed as 28 independent toggle buttons

**MAJOR** · `EasingTarget.vue:79–93`, `:200–206`; glass-ui `chip-6ysLmScu.js` (`import { Toggle as h } from "reka-ui"`, rendered for `mode === "selectable"`)

The container is `role="group" aria-label="Easing curve specimens"`. Each tile is `Chip mode="selectable"`, which glass-ui renders as reka `Toggle` → `<button type="button" aria-pressed="…" data-state="…">`. Screen-reader output is therefore *"ease-in-out, toggle button, not pressed"*, ×28, with nothing conveying that exactly one may be pressed and one always is.

The single-select invariant is asserted three times in the source — `EasingTarget.vue:75` ("single-select"), `:167–168` ("Single-select, never empty"), `:201–204` ("a curve is always selected") — and expressed nowhere in the ARIA. `role="radiogroup"` + `role="radio"` (or `aria-checked` semantics) is the exact mapping, and it also buys arrow-key roving focus over a 28-cell grid, which the current markup does not provide: keyboard users must Tab through all 28 buttons to reach the last family.

**Falsifier:** show that reka's `Toggle` emits `aria-checked`/`role="radio"` when nested in a `role="group"`; or show the demo wraps the tiles in a `ToggleGroup type="single"` (it does not — that primitive is used only for the family filter at `:51`).

## D-M6 · The 14 px ball has three independent authorities, and the documented token seam is not read

**MAJOR** · `EasingTarget.vue:228`, `EasingTarget.css:153,156,163`; `styles/design-idioms.css:162–164`

The shared idiom documents its own contract:

> `--ball-size is the seam EasingTarget reads via getComputedStyle` — `design-idioms.css:163`

`grep -rn "getComputedStyle" demo/scenes/easing/` returns **nothing**. The seam is not read. Instead the 14 px lives in three places that must be edited together and cannot be checked against each other:

| authority | site |
|---|---|
| `const BALL_SIZE = 14` (drives `maxX = railWidth − BALL_SIZE`) | `EasingTarget.vue:228,250` |
| `--ball-size: 14px` (drives the rendered box + `margin-top: calc(size / −2)`) | `EasingTarget.css:163` |
| `left: 6.5px` / `right: 6.5px` (the tick marks, derived from half of 14 minus half the 1 px tick) | `EasingTarget.css:153,156` |

Today they agree exactly (see S-1). Change any one and the race silently de-registers: bump `--ball-size` to 16 px and the ball overshoots the terminus tick by 1 px and runs past the rail end by 2 px, with no type error, no test, and no visual warning until someone looks closely. The idiom's whole purpose — a single parameterized seam — is defeated by the consumer that the idiom names.

**Falsifier:** find a `getComputedStyle` / `CSS.registerProperty` read of `--ball-size` anywhere in `scenes/easing/`, or a build-time assertion tying the three constants.

---

# MINOR (12)

## D-m1 · The scene root leaks four unprefixed custom properties into every glass-ui descendant

**MINOR** · `EasingTarget.css:1–8`, `:140`, `:163–164`

`.easing-target { --ball-tone: var(--color-progress) }` is set on the **Card root**, so it inherits into `FadingScroll`, `ToggleGroup`, all 28 `Chip`s and their internals. `--rail-tint`, `--ball-size`, `--ball-glow` are set on descendants. None is namespaced. This is the flat-namespace hazard the frontend census named — `lane-frontend.md §6.3`: *98 demo-owned custom properties, `--kf-*` count `0`, "a collision surface worth a lane of its own"* — instantiated here on the scene's outermost element. glass-ui ships no `--ball-*` today (`grep -o -- "--ball-[a-z-]*" -r dist/` → empty), so this is latent, not live; but the demo is the *consumer*, and a consumer that publishes unprefixed names into a vendor subtree owns the next collision. Concurs with `lane-frontend.md` recommendation 7.

**Falsifier:** show `--ball-tone` is set on a leaf rather than the Card root, or that glass-ui guards its internals with `@property` + `inherits: false`.

## D-m2 · `will-change: transform` is permanent on up to 28 elements, including under reduced motion

**MINOR** · `EasingTarget.css:166`

`.tile-ball { will-change: transform }` is unconditional. `will-change` is specified as a last-resort hint to be applied shortly before a change and removed after; here it promotes up to 28 elements for the life of the scene. Under `prefers-reduced-motion: reduce` the balls **never move** (`EasingTarget.vue:263–267, 304–307`) and the hint is pure waste — an unmotivated compositor layer per specimen, on the one code path that exists to reduce work. `content-visibility: auto` (`:105`) mitigates for off-screen tiles only.

**Falsifier:** show the PRM branch removes `will-change` (it does not — the property is static CSS, and no JS touches it), or produce a layer count showing no promotion.

## D-m3 · "The departure is LEGIBLE" — the ticks measure 1.59:1

**MINOR** · `EasingTarget.css:135–157`

The comment claims the origin/terminus ticks make the shared departure legible; they are `--foreground` @22%, i.e. **1.59:1 / 1.87:1** (§Method). The rail is worse at **1.23:1 / 1.33:1**. The named 1px-vs-2px design reasoning (*"33 rails at 2px read as a grid of rules; at 1px they recede to ruled paper"*) is sound as *proportion* reasoning and wrong as *contrast* reasoning: recession was achieved by draining contrast rather than by reducing weight at adequate contrast. Distinct from D-B1 (this is the chrome; D-B1 is the data).

**Falsifier:** measure a rendered tick at ≥3:1.

## D-m4 · `label="duration"` breaks the surface's own capitalization, and the unit exists only in a hover tooltip

**MINOR** · `EasingSidebar.vue:53–63`

Every other label on the surface is sentence case: `label="Easing curve editor"` (`:34`), `aria-label="Filter curves by family"` (`EasingTarget.vue:53`), `aria-label="Easing curve specimens"` (`:81`), `label="Copy easing literal"` (`:38`). This one is bare lowercase. Separately, the control's unit lives **only** in `tooltip="Sweep duration (ms)"` — the visible label and the value readout carry no unit, so on touch (no hover) the slider reads "duration: 1500" with no scale. A `1500` that could be ms, frames, or px.

**Falsifier:** show `LabeledSlider` capitalizes labels or renders a unit suffix (the demo passes `label-class="text-small font-medium text-muted-foreground"` — `text-small` sets no `text-transform`).

## D-m5 · Four specimens print the identical string twice in the header, in two different typefaces, with a copy button

**MINOR** · `EasingTarget.vue:21–41`, `:209–220`

`literal` falls through to `return name` for any curve that is neither `steps` nor in `NAMED_EASING_BEZIER`. Cross-referencing `easingGroups.ts` against `animationDescriptions.ts:20–49`, exactly four specimens hit that branch: **`smooth-step-3`, `ease-in-bounce`, `step-start`, `step-end`**. For those, the header shows the same token twice — once as `<h2 class="text-display">` (`--type-display-1` ≈ 40 px Instrument Serif) and once as `<code class="text-mono-small">` beside it — plus a `CopyButton` offering to copy a string already on screen 3 cm to the left. The duplication reads as a rendering fault rather than as the "name + literal" pairing the header is designed around.

**Falsifier:** show a fifth branch in `literal` for engine-native names, or show `text-display` is not applied to the `<h2>`.

## D-m6 · `isAnimStarted` is hard-coded `true` at the call site while `isStarted` is separately exposed

**MINOR** · `EasingScene.vue:46`, `:101`, `:117`

`const isStarted = ref(true)` is created and exposed (`:117`), and then the ribbon is passed the literal `isAnimStarted: true` (`:101`) rather than the ref. Two authorities for one flag, and the ribbon's entire `is-disabled` treatment (`PlaybackRibbon.vue:9,74`) is unreachable for this scene by construction. The scene rests on entry (`autoPlays: false`, `:126`), which is precisely the state a "not yet started" affordance would communicate.

**Falsifier:** show `isStarted` is mutated anywhere, or that the host reads the exposed `isStarted` for a rendering decision.

## D-m7 · Selecting an engine-native curve leaves the editor drawing the previous curve

**MINOR** · `EasingSidebar.vue:99–119`, `:159–166`; `useEasingDemo.ts:246–259`

`seedFor(name)` returns `null` for any name that is neither a steps variant nor a member of glass-ui's `bezierPresets` — i.e. for `ease-in-bounce`, `smooth-step-3`, and every named curve outside the vendor catalogue. `null` ⇒ no remount ⇒ the `EasingPicker` keeps drawing whatever it last held, because glass-ui 4.0.1's `modelValue` is emit-only (`EasingSidebar.vue:19–22`). Meanwhile `selectEasing` silently resets `demo.bezierControlPoints` to `[0,0,1,1]` (`useEasingDemo.ts:257`) — a third value agreeing with neither. Header, editor canvas, and state model show three different curves at once.

The `catalogueGap` caption (D-M3) is the intended mitigation and is a real one — but it explains *why editing departs*, not *why the canvas is showing a curve you did not pick*.

**Falsifier:** show `EasingPicker` re-seeds from a prop on selection change, or show `seedFor` covers the engine-native names.

## D-m8 · No forced-colors handling; the selection cue is hue, with `font-weight` as the only survivor

**MINOR** · `EasingTarget.css` (entire file — zero `@media (forced-colors: active)`)

Selection is signalled by (a) the chip's `--accent-band` wash, (b) the sparkline inked to `--ball-tone`, (c) the label tinted `--ball-tone`, (d) `font-weight: 600`. Under forced-colors, `fill`/`stroke`/`color`/`background-color` are all replaced by system colors, collapsing (a)–(c); `box-shadow` (the ball glow) is dropped. The sole surviving cue is a 600 weight on a ~14 px mono caption — the weakest of the four. glass-ui does ship forced-colors handling (`styles/accessibility.css`, `glass/a11y-fallback.css`), so whether the chip's own on-state survives is **UNPROVEN-NEEDS-LIVE**; the demo's three overrides are proven to be color-only.

**Falsifier:** show a demo or glass-ui `forced-colors` rule that restores a non-color selection cue to `.specimen-tile[data-state="on"]`.

## D-m9 · The header literal translates horizontally on every one of 28 selections

**MINOR** · `EasingTarget.css:19–25`, `EasingTarget.vue:22–41`

`.gallery-id` is a baseline-aligned flex row: `<h2>` then `.specimen-literal`. The `<h2>` is ~40 px display type whose width is a function of the curve name — `ease` (4 chars) to `ease-in-out-cubic` (17). Nothing reserves the name column (no `min-width`, no `flex-basis`, no grid). Selecting across the gallery therefore slides the literal and its copy button back and forth by well over 100 px, on the surface whose *primary* interaction is clicking through 28 tiles. The `mode="out-in"` `<Transition>` (`:23`) adds a one-frame gap in which the `<h2>` leaves the flow entirely, so the literal snaps left and back on top of the slide.

**Falsifier:** show a reserved width on `.specimen-name`/`.gallery-id`, or show the literal is on its own line at the target breakpoints (`.gallery-id` sets `flex-wrap: wrap`, but wrapping is width-dependent, not guaranteed).

## D-m10 · The scene's `provide` does not reach its own control surface; the sidebar is prop-fed and the trap is undocumented

**MINOR** · `EasingScene.vue:21`, `:57`; `EasingSidebar.vue:82–83`; `EasingTarget.vue:152`

`provide(EASING_DEMO_KEY, demo)` runs in `EasingScene`'s setup. `EasingTarget` is a template child and injects correctly. `EasingSidebar` is created by `tabsContent = () => h(EasingSidebar, { demo })` — a render function invoked by **`AnimationControls`**, whose ancestor chain does not include `EasingScene`. So the sidebar *cannot* inject and is fed by prop instead. Two distribution mechanisms for one context in one scene, with the constraint documented nowhere; the 9-line comment block above `tabsContent` (`:48–56`) discusses tab machinery and never mentions it. A future author adding `inject(EASING_DEMO_KEY)!` to `EasingSidebar` gets `undefined` behind a non-null assertion.

**Falsifier:** show `AnimationControls` re-provides the key, or that render-prop vnodes inherit the defining component's provides (they inherit the *invoking* instance's chain).

## D-m11 · Two independent artifacts assert 33 specimens; the tree yields 28

**MINOR** · `EasingTarget.css:135–136`; `demo/styles/font-roles.json:2`

> *"a named delta off the 2px idiom default: **33 rails** at 2px read as a grid of rules"* — `EasingTarget.css:135`
> *"T.E6's **33 specimen-tile curve identifiers** are DATA … measured 81 live + slack"* — `font-roles.json:2`

`EASING_GROUPS` minus `Custom` (excluded at `EasingTarget.vue:158`) sums to **28**: Standard 5 + Sine 3 + Quad 3 + Cubic 4 + Expo 3 + Circ 3 + Back 3 + Bounce 1 + Steps 3. The second citation matters more than the first: `font-roles.json` is the manifest a census gate reads, so a stale population count is a stale gate input.

**Falsifier:** produce a 33-item specimen enumeration from the current `easingGroups.ts`.

## D-m12 · Caps tracking on lowercase identifiers, and two different trackings for the same token

**MINOR** · `EasingTarget.css:183–190`, `EasingTarget.vue:113`, `:32`

`.tile-name` runs `text-mono-caption`, whose `letter-spacing: var(--type-tracking-caps)` = **0.1em**. The demo overrides the utility's `text-transform: uppercase` (`:184`) but leaves the tracking — so the caps compensation is applied to lowercase mixed identifiers, which reads conspicuously loose and widens every name against a 132 px tile. Meanwhile the header literal uses `text-mono-small`, which sets **no** tracking. The same token (`ease-in-out-sine`) therefore renders at 0.1 em in the tile and at 0 in the header. Halving the utility (dropping the transform, keeping the tracking) is the tell: the utility was not meant for lowercase at all.

**Falsifier:** show `--type-tracking-caps` is `0`, or a `.tile-name { letter-spacing: … }` reset.

---

# INFO (7)

- **D-i1 · The shell is a changelog, not a component.** `EasingScene.vue` lines 7–133 hold **58 comment lines to 56 code lines**. The prose documents *deletions* — "the former … POKE is DELETED", "no legacy beside the replacement" (×3), "the decoy is DEAD", "burned a full core at idle ('god awful')" — rather than current behavior or contract. A reader learns what the file used to be. Note D-B2/D-B3: the three comments that *do* describe current behavior are false. **Falsifier:** recount; or show the comments are load-bearing for a consumer.
- **D-i2 · Dead import.** `computed` is imported at `EasingScene.vue:8` and never used.
- **D-i3 · Tautological guard.** `slotProps.selectedControl === "easing"` (`:95`) can only be true — `:23–27` establishes `CONTROL_SURFACES.easing = ['easing']` as the scene's sole surface. Dead branch dressed as a condition.
- **D-i4 · Inert centering.** `class="flex h-full w-full items-center justify-center"` (`:2`) wraps a single child that is itself `h-full w-full` (`EasingTarget.vue:13`). Both alignment utilities are no-ops.
- **D-i5 · Dead reset.** `.literal-text { text-transform: none }` (`EasingTarget.css:65`) guards against an uppercase that `text-mono-small` never applies. Harmless, but it signals the two mono utilities were treated as interchangeable — the root of D-m12.
- **D-i6 · The rest state is the first impression, and it says nothing.** `autoPlays: false` (`:126`) is correct and well-argued (VERDICT #19, zero rAF at idle). But nothing on the surface invites the press: no in-scene affordance, no copy, and at rest the gallery is 28 near-invisible (D-B1) squashed (D-M1) sparklines with 28 identical dots stacked at the left edge. Whether the dock's Play is prominent enough to carry it: **UNPROVEN-NEEDS-LIVE**. The absence of any in-scene cue is proven.
- **D-i7 · Focus-ring clearance unverified.** `.specimen-grid { padding: 2px 2px 1rem }` (`EasingTarget.css:98`) is explicitly sized so *"tile hover/pressed rings never clip against the fade-scroll mask edges"*. glass-ui applies `focus-ring` to interactive chips; whether its outline width + offset fits in 2 px is **UNPROVEN-NEEDS-LIVE**. If it is the common `2px` + `2px offset`, the first column and first row clip by ~2 px.

---

# SUPERLATIVES (7)

L-18 runs both ways. Each of these is above the bar for its class, and each carries its own falsifier.

- **S-1 · Sub-pixel tick registration.** `BALL_SIZE = 14` ⇒ ball centre at phase 0 is x=7 px; the tick is `left: 6.5px; width: 1px` ⇒ centre 7.0 px. Terminus: ball centre = W−14+7 = W−7; tick = `right: 6.5px; width: 1px` ⇒ centre W−7. **Exact at both ends, in a hand-authored offset.** (`EasingTarget.css:142–157`, `EasingTarget.vue:228`.) *Falsifier:* any arithmetic above that is wrong. — Note the coupling this depends on is D-M6.
- **S-2 · `vector-effect="non-scaling-stroke"` under `preserveAspectRatio="none"`.** With a 4:1 anisotropic stretch of a 1×1 viewBox, a normal stroke would render 4× thicker on one axis than the other, varying along the curve. This is the one correct fix and it is applied (`EasingTarget.vue:102`). *Falsifier:* show the stroke is uniform without it.
- **S-3 · A correctly layered three-mechanism off-screen gate.** `IntersectionObserver` with `rootMargin: "25% 0px"` gates the paint walk (`EasingTarget.vue:290–301`); `content-visibility: auto` gates style/layout (`css:105`); `contain-intrinsic-size: auto 104px` keeps the scrollbar honest (`css:106`). Three distinct costs, three distinct mechanisms, none redundant — and the pre-roll margin means a tile is live before it is visible. *Falsifier:* show one of the three is subsumed by another.
- **S-4 · Snapshot keyed by `data-curve`, not by `v-for` index.** `EasingTarget.vue:283–289` explicitly refuses the ref-array ordering assumption — *"NOT v-for index — ref arrays carry no order guarantee"* — and re-derives each tile's function from its own `dataset.curve`. Rare discipline; the naive version breaks silently under filter changes. *Falsifier:* show Vue guarantees ref-array order.
- **S-5 · The no-truncation promise is actually kept.** The surface promises "never truncated" three times and delivers: no `text-overflow`, no `line-clamp`, no fixed width anywhere in `EasingTarget.css`; `overflow-wrap: anywhere` on both the tile name (`:186`) and the header literal (`:66`); `.gallery-id`/`.specimen-literal` both carry `min-width: 0` so the flex children can actually wrap. This is the F7 truncation class killed by construction, not by hope. *Falsifier:* find one clipping rule on this surface.
- **S-6 · Reduced motion is reactive, not read-once.** `useMediaQuery` + `watch(reducedMotion, () => wirePainter())` (`EasingTarget.vue:234, 320`) means toggling the OS setting mid-session re-wires the painter and repaints the rest state. The overwhelming majority of implementations sample the query at mount and never look again — including two sibling scenes in this same demo, which use bare `window.matchMedia?.(…).matches` (`useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`, per `lane-frontend.md §6.5`). This scene is the best of the three. *Falsifier:* show the watch never fires on a live media-query change.
- **S-7 · The 18% headroom is measured, not guessed.** `ease-in-out-back` = `cubic-bezier(0.68, −0.55, 0.265, 1.55)` peaks at ≈1.09 (t≈0.9) and troughs at ≈−0.09 → 0.09 × 33.28 px = **3.0 px** of overshoot, against **9.36 px** (18% of 52 px) of headroom, with `overflow: visible` on the SVG to let it out (`EasingTarget.css:120–126`). Sized with ~3× slack for the worst curve in the set. *Falsifier:* find a specimen in `EASING_GROUPS` whose |overshoot| exceeds 0.28.

---

# Relation to the hitherto corpus

Folded, not re-invented. Cited where this lane overlaps:

- **`lane-frontend.md` §6.3 (flat token namespace, `--kf-*` = 0, "worth a dedicated collision audit")** — instantiated at **D-m1**: the scene sets four unprefixed properties, one of them on the Card root, inheriting into the vendor subtree.
- **`lane-frontend.md` §6.5 (PRM "conscientious but inconsistent in mechanism"; `EasingTarget.vue:234` listed as the `useMediaQuery` site)** — this lane resolves the comparison in EasingTarget's favour at **S-6**, and independently finds the PRM path *incomplete* at **D-m2** (`will-change` survives it) and *contradicted upstream* at **D-B3** (the ribbon's clocks have no PRM guard at all).
- **`lane-frontend.md` §4 (`easing/EasingScene.vue` 133 L, "easing scene shell", marked **b** = no glass-ui import)** — confirmed; the classification is accurate and is itself the finding at **D-i1**: the shell contains no UI, only 58 lines of deletion history.
- **`lane-frontend.md` S-7 (`CopyButton`, "the shell should be glass `Button`")** — this lane touches the same component at `EasingTarget.vue:35–39` and does **not** re-litigate; note only that its intrinsic-box workaround is pushed onto the *consumer* (`EasingTarget.css:68–75` sets `width/height: 1rem` with a comment explaining the absolutely-positioned icons), which is corroborating evidence for the census's "partial shadow" verdict.
- **`lane-frontend.md` F-1 (glass-ui is a phantom dependency — undeclared in `package.json` *and* `package-lock.json`, 7.0.0 present in `node_modules`)** — not re-stated as a finding of this lane, but it is a **precondition** on every glass-ui claim above: `Chip`, `EasingPicker`, `FadingScroll`, `ToggleGroup`, `--accent-band`, `--accent-ink`, `text-mono-caption` are all read from the installed 7.0.0 tree. If F-1 is fixed by pinning a *different* version, D-M2, D-M3 and D-M5 must be re-derived.

**No contradiction of the census was found.** One extension: the census reports `EasingSidebar.vue` (234 L) as a glass-ui consumer drawing `Card*`, `LabeledSlider`, `EasingPicker`. Accurate — and D-M3/D-m7 show the seams *between* those vendor primitives and the demo's state are where this surface actually fails, not inside the primitives.

---

# Tally

| severity | count |
|---|---|
| BLOCKER | **3** |
| MAJOR | 6 |
| MINOR | 12 |
| INFO | 7 |
| **defects total** | **28** |
| SUPERLATIVE | **7** |

**Three claims are marked UNPROVEN-NEEDS-LIVE and are excluded from the blocker count:** the `plus-lighter` flood's effect on the selected-tile composite (D-M2 caveat), glass-ui's forced-colors survival for the chip on-state (D-m8), and focus-ring clearance against the 2 px grid padding (D-i7). Each is queued for the SS-13 visual audit. Every blocker and every major above is derived from source or from token arithmetic and stands without a browser.

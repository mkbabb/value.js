claude-opus-5[1m]

# SequenceScene — Challenge · Axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceScene.vue` (43 L)
**Read whole (read-only)**: `SequenceScene.vue`, `sequenceKeys.ts`, `SequenceTarget.vue`, `SequenceTarget.css`, `SequenceAxis.vue`, `SequencePlayhead.vue`, `SequenceScrubber.vue`, `useSequenceDemo.ts`, `useSequenceInstrument.ts`, `useTypedTrigger.ts`, `demo/composables/useDragScrub.ts`, `demo/state/controlOptionsStore.ts`, `demo/state/controlSurfaces.ts`, `demo/styles/{style,design-idioms}.css`, `demo/app/index.html`, and the resolved glass-ui 7.0.0 dist (`typography/{semantic,scale,utilities}.css`, `tokens/*`, `accessibility.css`, `components/metric/{types.d.ts,styles.css}`, `components/card/Card.vue.d.ts`, `components/button/Button.vue.d.ts`).

**Method** — static + token-derived only. No browser. Every contrast ratio below is computed from the resolved token chain (`--background` → `--neutral-0` → `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))`) using WCAG 2.x relative luminance; every geometry claim is computed from the resolved `rem`/`clamp()` values at a stated viewport. Claims that cannot be settled from the tree are marked **UNPROVEN-NEEDS-LIVE** and are *not* charged.

**Posture** — assumed defective until the tree proved otherwise. Four candidate defects were **killed by the tree during verification** and are recorded in §4 so the next auditor does not re-file them.

**Scope note** — `SequenceScene.vue` is a 43-line provider shell. Judging it in isolation would be a category error: it `provide()`s `SEQUENCE_DEMO_KEY` and renders exactly one child, so the scene's entire design surface is `SequenceTarget` + its three colocated sub-units. The challenge treats the mounted subtree as the unit, and marks which findings live in the 43-line file itself (D21, D23, D24).

**Tally** — 26 charged defects (**2 BLOCKER**, 7 MAJOR, 14 MINOR, 3 INFO) · 7 superlatives · 3 not-charged records.

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` **S-4** (SequenceScrubber → `ScrubberTimeline`/`Slider`, AMBER) and **F-1** (glass-ui phantom dep) are both *confirmed by this tree* and extended below (D5, D15, §3). The census's *shadow* framing (bespoke-vs-glass line counts) is orthogonal to this axis; where the tree adds a **design** reason to S-4 beyond line count, it is stated at D15/D16.

---

## 1 · BLOCKERS

### D1 · BLOCKER · The master-clock ruler and the master playhead resolve column 2 from two different origins — the ruler misreads the playhead by 12 px at t=0

*Provenance* — `SequenceTarget.css:36–45` · `SequenceAxis.vue:22` · `SequencePlayhead.vue:23–31`

```
SequenceTarget.css:37   --label-col: 3.25rem;
SequenceTarget.css:38   --col-gap: 0.75rem;
SequenceTarget.css:39   --track-inset: calc(var(--label-col) + var(--col-gap));   /* = 4rem */
SequenceTarget.css:43   grid-template-columns: var(--label-col) 1fr;
SequenceTarget.css:44   gap: 0.5rem 0;                                            /* column-gap = 0 */
SequenceTarget.css:45   padding: 0.75rem 1rem 1rem;

SequenceAxis.vue:22     .seq-axis { grid-column: 2; }                             /* DIRECT child of .seq-stage */
SequencePlayhead.vue:28 left: calc(1rem + var(--track-inset));                    /* = 5rem, padding-box relative */
SequencePlayhead.vue:29 right: 1rem;
```

`.seq-axis` is a **direct** grid child of `.seq-stage`, placed in the parent's own track 2. The parent's `column-gap` is **0** and `--label-col` is a **definite** 3.25rem track, so no intrinsic sizing can move the line: track 2 begins at exactly `3.25rem` from the content box, i.e. `1rem + 3.25rem = 4.25rem` from the padding box.

`.seq-playhead-track` is absolutely positioned against the same padding box at `1rem + 4rem = 5rem`.

**Δ = 0.75rem = 12 px on the left; the right edges coincide** (`right: 1rem` == content-box right). The two layers therefore map the same `[0, STAGGER_MAX]` domain over two different widths: the ruler over `W + 12`, the playhead over `W`. The positional error is `12·(1 − p)` px — **maximal at t = 0, zero at t = 1**. At rest the playhead sits 12 px to the right of the `0` tick it is supposed to name. Over a ~450 px track that is a ~2.7 % scale error, ≈ 43 ms of the 1600 ms domain.

This is charged BLOCKER rather than MAJOR because of what the scene *is*: `useSequenceDemo.ts:21–45` states the scene exists to prove `Sequence` — "the temporal orchestrator that positions many animations along ONE master clock". The one instrument reading that must be honest is the ruler against the playhead, and it is not. A demo whose time ruler lies about its own playhead falsifies its own thesis.

**Falsifier** — any of: (a) `.seq-axis` is not a direct child of `.seq-stage` at runtime (it is — `SequenceTarget.vue:66` places `<SequenceAxis>` as a sibling of `<SequencePlayhead>` and `.seq-rows` inside `.seq-stage`); (b) `.seq-stage`'s `column-gap` is non-zero (it is `gap: 0.5rem 0`); (c) some later rule overrides `.seq-axis { grid-column }` — grepped: the only other `.seq-axis` rules are `SequenceTarget.css:221` (animation) and `:239` (PRM), neither touches placement; (d) measuring `.seq-axis` and `.seq-playhead-track` bounding rects in the live DOM shows equal `left`.

---

### D2 · BLOCKER · The per-row `@…ms` sub-label computes to **3.37 : 1** in the light arm — WCAG 1.4.3 AA (4.5:1) failure on the storyboard's only per-row data

*Provenance* — `SequenceTarget.vue:85–88` · `SequenceTarget.css:100–103` · `demo/styles/style.css:91` · `demo/app/index.html:78–89`

```
SequenceTarget.vue:85  <span class="seq-row-label text-mono-caption text-muted-foreground …">
SequenceTarget.vue:87    <span class="seq-row-at">@{{ Math.round(row.at) }}ms</span>
SequenceTarget.css:100 .seq-row-at { font-weight: 400; opacity: 0.8; }
```

The span inherits `--muted-foreground` and then multiplies it by `opacity: 0.8`, compositing against the stage plate.

**Computation (light arm — the arm that ships whenever the OS prefers light; `index.html:82–88` adds `.dark` only on `prefers-color-scheme: dark` or a stored preference):**

| quantity | value | rel. luminance Y |
|---|---|---|
| `--background` = `--neutral-0` | `hsl(40 30% 98%)` → `rgb(.986 .982 .974)` | **0.9602** |
| `--muted-foreground` = `--neutral-5` | `hsl(30 22% 40%)` → `rgb(.488 .400 .312)` | 0.1439 |
| composited at α = 0.8 over bg | `rgb(.5876 .5164 .4444)` | **0.2408** |

- opaque muted-fg on bg: `(0.9602+0.05)/(0.1439+0.05)` = **5.21 : 1** ✔ passes
- with `opacity: 0.8`: `(0.9602+0.05)/(0.2408+0.05)` = **3.47 : 1** ✘ **fails 4.5:1**
- against the *actual* backdrop (`SequenceTarget.css:50–55`, `color-mix(… --ball-tone 5%, --background)`, tone = `--color-progress` = `oklch(.56 .17 295)`), the backdrop darkens to ≈ 0.93 → **≈ 3.37 : 1** — the error direction makes the real number *worse*, so the finding is robust to the approximation.

Text size is `--type-caption` = `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` = **14.38 px @1440**, weight 400 — nowhere near the 18.66 px / 24 px large-text exemption. Normal-text 4.5:1 applies.

Dark arm passes (5.23 : 1 by the same method), so this is a **light-arm-only** failure — which is exactly the arm a light-preference user gets by default.

Charged BLOCKER because the codebase sets its own bar and misses it: `design-idioms.css:213–217` annotates the badge family "**AA-CONTRAST (load-bearing)**"; `SequenceTarget.css:95–99` documents that this very span was routed back onto the φ token ladder in a prior pass. The `opacity: 0.8` that breaks it was introduced in the same rule as the fix and never re-measured. Note also that the sibling `.seq-row-name` gets `text-foreground` — the file *knows* how to make the subordination read through weight; the opacity is redundant with the weight-400/600 contrast already present.

**Falsifier** — any of: (a) `--muted-foreground` resolves to something other than `--neutral-5` in the demo (grepped `demo/styles/*.css`: never re-declared); (b) a later rule removes `opacity` from `.seq-row-at`; (c) the composite is done in a linear space (browsers composite `opacity` in the device sRGB space — the computation above assumes that); (d) a live `getComputedStyle` + contrast probe on `.seq-row-at` in light theme returns ≥ 4.5:1. **The single-line fix is to delete `opacity: 0.8`** — the weight delta against `.seq-row-name`'s 600 already carries the subordination the comment argues for.

---

## 2 · MAJOR

### D3 · MAJOR · `--label-col: 3.25rem` cannot contain its own default content — `@1040MS` overflows the label column by ~18 px and crosses the stage border at ≥ ~1400 px

*Provenance* — `SequenceTarget.css:37, 77–83, 100–103` · `useSequenceDemo.ts:65, 108`

The default stagger staircase is `0, 260, 520, 780, 1040 ms` (`useSequenceDemo.ts:65` `STAGGER_EACH = 260`, ×5 rows), so **at first paint** row 5's sub-label is the 7-glyph string `@1040MS`.

`.seq-row-label` is `display:flex; flex-direction:column; align-items:flex-end` (`:77–83`) inside a **definite 3.25rem = 52 px** grid track. Cross-axis (inline) size of a non-stretched flex item is its `fit-content`, and `min-content` of an unbreakable token equals its `max-content` — so the item cannot shrink below its text width and overflows the **start** (left) edge.

Width at 1440 px, `--font-mono: "Fira Code"` (advance 0.6 em) at `--type-caption` = 14.38 px with `--type-tracking-caps: 0.1em` inherited from `text-mono-caption`:

```
per glyph = 0.6 × 14.38 + 0.1 × 14.38 = 10.07 px
7 glyphs  = 70.5 px   vs   label track = 52 px   →  overflow ≈ 18.5 px to the LEFT
```

`.seq-stage`'s `padding-left` is `1rem = 16 px` (`:45`), so the overflow **exceeds the frame's own padding by ~2.5 px at 1440 and ~7 px at 1920** (`--type-caption` reaches 15.39 px at 1920 → 75.4 px). The label crosses the `1px solid` rounded border of the very plate the C-SEQ-2 redesign introduced for "PROPORTION + CONTAINMENT" (`SequenceTarget.vue:45–54`). `.seq-stage` sets no `overflow`, so the text renders outside the frame rather than clipping.

Robustness: at a conservative 0.55 em advance the string is still 65.5 px vs 52 px — the overflow survives any plausible mono metric.

**Falsifier** — measure `.seq-row-at`'s bounding rect against `.seq-row-label`'s in the live DOM at 1440 px with row 5 at its default 1040 ms; if `left(at) ≥ left(label)` the claim dies. Also dies if `--font-mono` falls back to a much narrower face, or if a rule sets `.seq-row-at { font-size }` below `--type-caption` (none does).

---

### D4 · MAJOR · `btn-interactive` is a phantom class — the reel button's named interaction affordance does not exist

*Provenance* — `SequenceTarget.vue:31`

```
SequenceTarget.vue:31   class="h-7 w-7 p-0 btn-interactive"
```

Repo-wide grep across `*.css`, `*.vue`, `*.ts`, `*.js` (excluding `node_modules`) and across the entire resolved `@mkbabb/glass-ui/dist/` returns **8 call sites and zero definitions**:

```
demo/scenes/cube/CubeScene.vue:188,193
demo/scenes/sequence/SequenceTarget.vue:31
demo/scenes/spring/SpringScene.vue:167
demo/scenes/spring/SpringPhysicsFacet.vue:74,105
demo/components/instrument/transport/controls-pane/RibbonBar.vue:135
demo/components/playback/PlaybackRibbon.vue:55
```

There is no `.btn-interactive` rule and no `@utility btn-interactive` anywhere. Whatever hover/press choreography the name promises, the reel button does not have it — its only interaction feedback is `.reel-active` (`SequenceTarget.css:172–176`), which fires *while the egg runs*, not on hover or press. This is charged MAJOR rather than INFO because it is a **silent** design regression: the class reads as intent-satisfied at every one of 8 review sites.

**Falsifier** — a `.btn-interactive` declaration anywhere in the built CSS. Probe: `getComputedStyle` the reel button on `:hover` and compare against a bare glass `Button`; identical computed styles confirm the no-op.

---

### D5 · MAJOR · The scrubber eyebrow renders **italic Plus Jakarta Sans**, not the Fira Code its own comment claims — and `text-admin-label` is the shipped idiom for exactly this

*Provenance* — `SequenceScrubber.vue:9–11, 124–129` · glass-ui `typography/semantic.css` · `typography/utilities.css`

```
SequenceScrubber.vue:9-10  <!-- the instrument-panel micro-cap eyebrow (Fira Code, letter-spaced) -->
SequenceScrubber.vue:11    <span class="seq-eyebrow text-caption font-medium text-muted-foreground">master playhead</span>
SequenceScrubber.vue:126   .seq-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; }
```

glass-ui 7.0.0 resolves `text-caption` to:

```
@utility text-caption { font-family: var(--font-text); font-size: var(--type-caption);
                        line-height: var(--type-leading-caption); font-style: italic; font-weight: 400; }
```

So the rendered eyebrow is **Plus Jakarta Sans, italic, uppercase, 0.18 em tracking** — three simultaneous deviations from the stated intent and from the design system:

1. **Family** — `--font-text`, not `--font-mono`. The comment is false against the tree.
2. **`font-style: italic`** — inherited from `text-caption` and never reset. *Italic + all-caps + wide tracking* is a recognised typographic anti-pattern: the caps flatten the italic's cursive information and the tracking fights the slant. Nothing else in the demo does this (grepped `text-caption` call sites).
3. **`letter-spacing: 0.18em`** — an off-token literal at **1.8×** the system's `--type-tracking-caps: 0.1em`.

glass-ui ships the exact idiom the comment describes: `@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label); text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500; }` — and `SequenceTarget.vue:39` uses it, two files away, on the status badge. The eyebrow is the one micro-cap in the scene that does not.

This extends census **S-4** with a *design* reason: the scrubber is not merely a line-count shadow of `ScrubberTimeline`, it is off-system in its own chrome.

**Falsifier** — a demo-side override of `text-caption`'s `font-style` (grepped `demo/styles/*.css` and the `@layer demo-typography` block at `style.css:263–294`: none), or a live `getComputedStyle('.seq-eyebrow').fontFamily` returning a mono stack.

---

### D6 · MAJOR · The header Metric is a poster-rung primitive in a 10 px-padded chrome bar — φ larger than the scene title, and a duplicate of the scrubber timecode

*Provenance* — `SequenceTarget.vue:12–24` · `SequenceScrubber.vue:16` · glass-ui `metric/styles.css`, `typography/scale.css`

```
SequenceTarget.vue:12  class="… px-4 py-2.5 border-b …"
SequenceTarget.vue:14  <span class="text-display text-foreground truncate">Sequence</span>
SequenceTarget.vue:18-24 <Metric size="xl" label="progress" :value="(demo.progress.value*100).toFixed(0)" unit="%" />
SequenceScrubber.vue:16  <span class="seq-timecode readout-accent text-mono-caption tabular-nums">{{ demo.progress.value.toFixed(3) }}</span>
```

Resolved sizes:

| element | token | @375 px | @1440 px |
|---|---|---|---|
| `Sequence` (`text-display`) | `--type-display-1` = `clamp(1.618rem, 1.2rem+1.6vw, 2.618rem)` | 25.9 px | **41.9 px** |
| Metric value (`[data-size=xl] .metric__value`) | `--type-display-3` = `clamp(2.618rem, 2rem+3vw, 4.236rem)` | 43.3 px | **67.8 px** |
| timecode (`text-mono-caption`) | `--type-caption` | 12.2 px | **14.4 px** |

Two charges:

**(a) Hierarchy inversion.** The progress percentage renders at **exactly φ (1.618×)** the scene title. The φ *ladder* is respected — the *hierarchy* is inverted. A `%`-rounded readout is the least durable information in the header (it is re-derivable from the playhead the user is already watching); the scene name is the most. In a header whose vertical padding is `py-2.5` = 10 px, a 67.8 px `line-height: 1` value forces the bar to ≈ 88 px on desktop — roughly one fifth of the whole card — to display a number the playhead already draws.

**(b) The same scalar is displayed twice, in two units, at a 4.7× scale ratio, ~200 px apart.** `progress` appears as `(p*100).toFixed(0) %` in the header and as `p.toFixed(3)` in the scrubber. `SequenceScrubber.vue:12–15` explicitly claims the timecode is "**the master clock made the brightest number on the page**" — the tree contradicts that comment with a 67.8 px sibling on the same card. Two authoritative-looking readouts of one quantity is a classic instrument-panel error: the user must decide which is the master.

**Falsifier** — if `Metric[data-size=xl]` resolves to a rung ≤ `--type-display-1` in the built CSS (it does not: `metric/styles.css` `.metric[data-size="xl"] .metric__value { font-size: var(--type-display-3) }`), or if the header and the scrubber are never simultaneously visible (they are — both are `shrink-0` children of one `Card`, `SequenceTarget.vue:8`).

---

### D7 · MAJOR · `prefers-reduced-motion` is honoured for the 700 ms boot only — the reel egg's under-damped overshoot cascade has no gate, 30 lines from a working example

*Provenance* — `SequenceTarget.css:237–243` · `useSequenceInstrument.ts:26–35` · `useSequenceDemo.ts:358–392` · `SequenceTarget.vue:29–37, 249`

The scene's only PRM handling is:

```
SequenceTarget.css:237  /* MANDATORY PRM degrade — the boot is decorative; held to the snapped still frame. */
SequenceTarget.css:238  @media (prefers-reduced-motion: reduce) {
SequenceTarget.css:239-241   .seq-stage.is-powering-on .seq-axis, .seq-stage.is-powering-on .seq-row { animation: none; }
```

…plus the JS twin at `useSequenceInstrument.ts:29–32`, which does the check correctly:

```
const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) return;      // snap to settled — no boot animation
```

**`playReel()` has no equivalent.** `useSequenceDemo.ts:360–363` builds `reelOvershoot = springTimingFunction({ response: 0.42, dampingFraction: 0.34 })` — deliberately under-damped, "a pronounced overshoot bounce" — and `:364–392` fires it across all five balls at 90 ms spacing with **no PRM branch**. It is reachable two ways: the visible `Clapperboard` button (`SequenceTarget.vue:29–37`) and the hidden window-level typed trigger (`SequenceTarget.vue:249` → `useTypedTrigger.ts:15`), which fires on the letters `r-e-e-l` typed anywhere outside an editable target — including while a row slider or the scrubber holds focus, since neither handler consumes letter keys (`SequenceTarget.vue:233–243`, `SequenceScrubber.vue:97–111`).

Secondarily ungated under PRM: the `.seq-handle::after` `120ms` hover/focus transitions (`SequenceTarget.css:151–159`) and the `--ball-p`-scaled bloom (`:205–208`).

The essential motion — the ball glide, the playhead sweep — is legitimately *not* PRM-suppressible: it is the demo's subject, and suppressing it would remove the information. That is the correct call and is credited at **S3** below. The charge is narrow and specific: **the file's own decorative/essential boundary was drawn once, correctly, for the boot, and then not applied to the one other purely decorative motion in the scene** — an unprompted, spontaneous, under-damped five-lane bounce.

**Falsifier** — a PRM guard inside `playReel`, a global `@media (prefers-reduced-motion) { *, *::before, *::after { animation-duration: .01ms } }` in the built cascade (grepped `demo/styles/*.css` and `glass-ui/dist/styles/*`: the only PRM blocks are component-scoped, none reach the engine-driven reel), or a live check that the reel is unreachable under PRM.

---

### D8 · MAJOR · Every Card child is `shrink-0` inside `h-fit max-h-full overflow-hidden` — a short cell silently clips the master scrubber with no cue and no scroll

*Provenance* — `SequenceTarget.vue:8, 12, 55, 127` + `SequenceScrubber.vue:7`

```
SequenceTarget.vue:8   <Card … class="seq-target w-full h-fit max-h-full flex flex-col overflow-hidden">
SequenceTarget.vue:12    <div class="… shrink-0">                 ← header
SequenceTarget.vue:55    <div class="seq-storyboard px-4 py-4 shrink-0">   ← storyboard
SequenceScrubber.vue:7   <div class="px-4 py-3 border-t … shrink-0">       ← master scrubber
```

A flex column with `max-height: 100%`, `overflow: hidden`, **no `overflow-y: auto`**, and **all three children `flex-shrink: 0`** has exactly one behaviour when content exceeds the cell: the last child is clipped away. The last child is the master scrubber — the card's only in-content transport control (the dock's DFA row for this scene is empty: `demo/state/controlSurfaces.ts:88` "sequence → []", asserted again at `SequenceScene.vue:26–29`), so there is no fallback surface.

Content height is not small. At 1440×900 the sum is ≈ 460 px (header ≈ 88 from D6, storyboard ≈ 285, scrubber ≈ 85). At 375×667 mobile the compressed metrics (`SequenceTarget.css:249–259`) bring it to ≈ 375 px, but the header **wraps** (`SequenceTarget.vue:12` `flex-wrap`, `:13` `flex-wrap`) around a 43 px Metric value, adding a line. In a landscape phone (667×375) the stage cell cannot plausibly clear 375 px, and the scrubber goes first.

The clipping is **silent**: `overflow: hidden` produces no scrollbar, no fade, no truncation cue.

**Falsifier** — a computed stage-cell `min-height` that provably exceeds the content sum at every supported viewport, or an `overflow-y` other than `hidden` on `.seq-target` in the built cascade (glass-ui `card/styles.css` was checked; the Tailwind `overflow-hidden` at `:8` is the operative declaration). Precise breakpoint: **UNPROVEN-NEEDS-LIVE** — the *mechanism* is decidable from source, the *threshold viewport* is not.

---

### D9 · MAJOR · The reel button is icon-only with no visible or hover name — defeating the one thing it exists to do

*Provenance* — `SequenceTarget.vue:27–37` · corpus grep

```
SequenceTarget.vue:27-28  <!-- EE-SEQ-1 "the reel" — the discoverable twin of the hidden typed "reel" trigger -->
SequenceTarget.vue:29-37  <Button emphasis="secondary" class="h-7 w-7 p-0 btn-interactive"
                            aria-label="Play the reel — a cascading wave replay" …>
                            <Clapperboard class="w-3.5 h-3.5" /></Button>
```

The `aria-label` satisfies WCAG 4.1.2 / 2.4.4 — **this is not an a11y conformance failure** and is not charged as one. The charge is that the component's *stated purpose* is discoverability ("the **discoverable** twin of the hidden typed trigger") and a 28 px unlabelled clapperboard glyph delivers none of it to a sighted pointer user: no `title`, no `<Tooltip>`, no adjacent caption. The `--seq-glow`/reel choreography it triggers is the scene's most elaborate motion and its least findable.

`Tooltip` is the demo's own established idiom for icon-only controls, in use at 9 files (`App.vue`, `TransportDock.vue`, `AnimationControlsGroup.vue`, `ChannelControls.vue`, `ChannelOptions.vue`, `EditorShell.vue`, `KeyframeTimeline.vue`, `TimelineTrack.vue`, `PlaybackRibbon.vue`) — all instrument chrome, none in a scene target.

**Falsifier** — if glass-ui's `Button` mirrors `aria-label` into a native `title` (it does not — `Button.vue.d.ts` exposes `emphasis?: ButtonEmphasis` and no tooltip prop), or if a wrapping `<Tooltip>` exists in an ancestor (`SequenceTarget.vue` is the whole subtree; there is none).

---

## 3 · MINOR

### D10 · MINOR · `text-mono-caption`'s `text-transform: uppercase` renders the SI unit as `@1040MS`

`SequenceTarget.vue:85` applies `text-mono-caption`; glass-ui's `typography/utilities.css` defines it with `text-transform: uppercase`. `.seq-row-at` (`SequenceTarget.css:100–103`) resets weight and opacity but **not** the transform. The template's `@{{ … }}ms` (`SequenceTarget.vue:87`) therefore paints **`@1040MS`**. In SI, `ms` is the millisecond; `MS` parses as mega-siemens. On an instrument panel whose entire premise is millisecond precision, that is a real error. *Falsifier* — a `text-transform: none` on `.seq-row-at`, or the unit moved outside the uppercased span.

### D11 · MINOR · `@property --ball-p` inside a `<style scoped>` block registers a document-global, `inherits: true`, un-namespaced token

`SequenceTarget.css:14–18` declares `@property --ball-p { syntax: "<number>"; inherits: true; initial-value: 0 }`. Vue's `scoped` transform rewrites *selectors*; it cannot scope an at-rule. This registration is global and inheriting. It joins a set of flat, unprefixed, inheriting custom properties this scene both writes and reads — `--ball-tone`, `--ball-size`, `--ball-glow`, `--row-start`, `--row-index`, `--scrub-dir`, `--label-col`, `--col-gap`, `--track-inset` — precisely the flat-namespace hazard class. `--ball-tone`/`--ball-size`/`--ball-glow` are at least *deliberately* shared (`design-idioms.css:161–187` documents them as the promoted rail/ball idiom's drift axes), but `--ball-p`'s **registration** is an unannounced global side effect from a scene-local file: any future consumer of `--ball-p` inherits this syntax and initial value whether it wants them or not. *Falsifier* — evidence that `@property` is scopable by the SFC compiler, or a rename to `--seq-ball-p` / relocation to `design-idioms.css` beside the idiom it parameterises.

### D12 · MINOR · `--stagger-max` is written inline on every render and read by nothing

`SequenceTarget.vue:63` sets `'--stagger-max': demo.STAGGER_MAX` on `.seq-stage`. Repo grep for `--stagger-max` returns two hits, both at `SequenceTarget.vue:63` and `:66` — the latter being the unrelated `:stagger-max` **prop** on `<SequenceAxis>`. No CSS declaration in `SequenceTarget.css`, `SequenceAxis.vue`, `SequencePlayhead.vue` or `SequenceScrubber.vue` reads it. Dead style-attribute traffic on the storyboard host. *Falsifier* — any `var(--stagger-max)` in the built CSS.

### D13 · MINOR · The playhead's vertical origin hard-codes the axis height authored in another file, and the mobile query breaks the coupling

```
SequenceAxis.vue:24-25    .seq-axis { height: 1.1rem; margin-bottom: 0.15rem; }        /* = 1.25rem */
SequencePlayhead.vue:26   top: calc(0.75rem + 1.25rem);   /* frame pad-top + axis ruler height */
SequenceAxis.vue:43-47    @media (max-width: 1023px) { .seq-axis { height: 0.95rem; margin-bottom: 0; } }
```

Desktop: the axis margin box ends at `0.75 + 1.25 = 2rem` and the playhead starts at `2rem` — flush, correct. Below 1023 px the axis margin box ends at `0.75 + 0.95 = 1.70rem` while the playhead still starts at `2rem`, leaving a **0.3rem = 4.8 px detachment**, with the `::before` diamond head (`SequencePlayhead.vue:55–56`, `top: -3px`) now floating in the void instead of tucking under the ruler. The file demonstrates the correct idiom horizontally (`--track-inset`, `SequenceTarget.css:39`) and abandons it vertically. *Falsifier* — a mobile override of `.seq-playhead-track { top }`, or a shared `--axis-h` token; neither exists.

### D14 · MINOR · `.stage-field-x` is confined to the 17.6 px ruler band — the storyboard has no time grid behind its lanes, and paints 4 rules against 5 ticks

`SequenceTarget.vue:52–53` claims the redesign gives the stage "a rounded, master-tinted `.seq-stage` that **OWNS its time grid**"; `SequenceAxis.vue:4–5` says "`.stage-field-x` paints the quarter rules, the ticks NAME them". But `stage-field-x` is applied **only** to `.seq-axis` (`SequenceAxis.vue:6`), which is `height: 1.1rem` (`:24`). The `repeating-linear-gradient` (`design-idioms.css:205–211`) therefore paints 17.6 px-tall stubs inside the ruler strip; the five lanes below have **no vertical time reference at all**. Separately, a `repeating-linear-gradient(… 0 1px, transparent 1px calc(100%/4))` emits rules at 0/25/50/75 % only — **4 rules against the template's 5 ticks** (`SequenceTarget.vue:155` `AXIS_QUARTERS = [0, .25, .5, .75, 1]`), so the `1600` tick names nothing. *Falsifier* — `.stage-field-x` (or an equivalent) on `.seq-stage`/`.seq-rows` in the built cascade.

### D15 · MINOR · Two sliders in one card, two different focus affordances

`.seq-handle:focus-visible` (`SequenceTarget.css:163–167`) paints the demo's canonical `--focus-ring-shadow` with `outline: none`. `.seq-scrub` (`SequenceScrubber.vue:18–30`) is also `role="slider" tabindex="0"` and has **no focus rule at all** — not `.focus-ring`, not `.interactive-item`, nothing in its scoped block (`:114–161`).

**This is not a WCAG 2.4.7 failure**: I grepped every `outline: none` / `outline-style: none` in `glass-ui/dist/styles/**` and `demo/styles/*.css`; all 13 are class-scoped (`.focus-ring`, `.interactive-item`, `.popover-content`, `.input-bar-field`, …) and none reach a bare `div`, so the UA `:focus-visible` ring paints. The charge is design consistency only: the demo declares a single focus contract (`design-idioms.css:73–79` — "the demo-owned `:focus-visible` contract — the **SINGLE** keyboard-focus affordance") and the master scrubber opts out of it by omission. *Falsifier* — a `.focus-ring` class or `:focus-visible` rule reaching `.seq-scrub`.

### D16 · MINOR · The row-handle focus ring outlines a 44×32 phantom, not the 6.4×24 grip it names

`SequenceTarget.css:120–136` makes `.seq-handle` a transparent `44px × 100%` box; `:139–154` paints the *visible* grip as a `0.4rem × 1.5rem` `::after`. The focus ring at `:163–167` is applied to the **host**, so the keyboard indicator is a rounded rect ~7× wider and ~1.3× taller than anything the user can see. WCAG 2.4.11 is satisfied (the indicator encloses the component), but the indicator misrepresents the target's shape and, at `at = 0`, half of it sits over the row's label column (`margin-left: -22px`, `:132`). *Falsifier* — move the ring to `::after`, or a live screenshot showing the ring hugging the grip.

### D17 · MINOR · Neither slider carries `aria-valuetext`; the row slider announces a bare number against a bare max

`SequenceTarget.vue:99–103` — `role="slider"`, `:aria-valuenow="Math.round(row.at)"`, `aria-valuemin="0"`, `:aria-valuemax="demo.STAGGER_MAX"` (= 1600). A screen reader announces "**1040, minimum 0, maximum 1600**" with no unit anywhere in the accessible name (`aria-label="Re-time row 1 start offset"` names the action, not the unit). `SequenceScrubber.vue:24–26` has the same gap on a 0–100 scale. `aria-valuetext="1040 milliseconds"` / `"42 percent"` is the one-attribute fix. *Falsifier* — an ancestor `aria-describedby`, or SR output that infers units.

### D18 · MINOR · The axis is unitless *and* `aria-hidden` — the ms domain is named nowhere a user can reach it

`SequenceAxis.vue:6` sets `aria-hidden="true"` on the whole ruler; `:12` renders `{{ Math.round(q * staggerMax) }}` with **no unit suffix and no axis caption**. A sighted user reads `0 400 800 1200 1600` floating over the stage with nothing saying "milliseconds"; an AT user gets nothing at all. The unit survives only in the per-row `@…MS` (itself mis-cased, D10). Hiding decorative *rules* from AT is right; hiding the only quantitative axis labels is not. *Falsifier* — a visible or `sr-only` axis caption elsewhere in the subtree (there is none), or a `unit` suffix on the last tick.

### D19 · MINOR · Badge salience is inverted for this scene's axis, and direction outranks transport state

```
SequenceTarget.vue:40  :class="demo.isReversed.value ? 'reverse-badge' : (demo.isPlaying.value ? 'tracking-badge' : 'settled-badge')"
SequenceTarget.vue:41  {{ demo.isReversed.value ? "reverse" : (demo.isPlaying.value ? "playing" : "ready") }}
design-idioms.css:230  .settled-badge  { --badge-tone: var(--color-progress); }   /* the violet ACCENT tint */
design-idioms.css:234  .tracking-badge { background: color-mix(in srgb, var(--muted) 60%, transparent);
                                          color: var(--muted-foreground); }        /* NEUTRAL grey */
```

**(a)** The corpus convention (`SquareInstrument.vue:31`, `SpringTarget.vue:46`) is *settled = arrived*, and in those scenes arrival **is** the notable event, so accenting it is right. SequenceScene reuses the pair for a **play/pause** axis it was not authored for — the result is that the accent lands on idle `"ready"` and the muted grey on live `"playing"`. On a transport, the live state is the notable one.

**(b)** `isReversed` outranks `isPlaying` in both ternaries. `useSequenceDemo.ts:261–272` sets `isReversed` from `sequence.rate < 0` and clears it only in `reset()` (`:288–290`), so a **paused, reversed** transport reads `"reverse"` while nothing moves — direction and transport state are conflated in one slot.

*Falsifier* — a documented corpus rule that the accent marks the *quiescent* state (none found in `design-idioms.css:213–242`), or a state matrix showing reverse-while-paused is unreachable (it is reachable: `reverse()` at `:271` only dispatches PLAY when `isMidPlay()`).

### D20 · MINOR · The status badge is not announced

The badge at `SequenceTarget.vue:38–41` is the only textual transport-state surface in the card and carries no `role="status"` / `aria-live="polite"`. Play, pause, reverse and the natural end (`useSequenceDemo.ts:236–238`) all change it silently for AT users. Correctly, `progress` itself is **not** live-regioned (that would spam) — the discrete state word is the right granularity for an announcement and is the one that is missing. *Falsifier* — an ancestor live region, or a dock-side announcement covering the same transition.

### D21 · MINOR · `SequenceScene.vue`'s wrapper contributes nothing but a node

```
SequenceScene.vue:2   <div class="flex h-full w-full items-center justify-center">
SequenceScene.vue:3     <SequenceTarget />
SequenceTarget.vue:2  <div class="seq-root flex flex-col items-center justify-center gap-4 h-full w-full px-6 lg:px-8 …">
```

The child is `h-full w-full`, so in a flex row container `align-items: center` and `justify-content: center` are both no-ops — the wrapper reduces to `h-full w-full`. And `SequenceTarget`'s own root repeats `flex … items-center justify-center h-full w-full`, where `gap-4` is dead against a **single** child (`<Card>`, `:8`). Two nested centering contexts, four inert utilities, one real declaration. *Falsifier* — remove `items-center justify-center` from `SequenceScene.vue:2` and `gap-4` from `SequenceTarget.vue:2`; if any pixel moves, the claim dies.

### D22 · MINOR · The reel button is 28 px against the repo's own declared 44 px floor

`SequenceTarget.vue:31` sizes the button `h-7 w-7 p-0` = **28×28 px**. It clears WCAG 2.5.8 (24 px, AA) but sits well under the floor this repo declares for itself: `design-idioms.css:81–85` defines `.tap-floor` as "the WCAG 2.5.5 **44px** minimum touch-target floor", and `SequenceTarget.css:121–127` spends six lines reasoning carefully about that same 44 px for the row handle — including an explicit, well-argued rejection of a 44 px-*tall* box (credited at **S6**). The reel button, one of two discrete controls in the card, got none of that attention. *Falsifier* — glass-ui `Button` applying a `min-height` ≥ 44 px that survives `p-0` (`Button.vue.d.ts` exposes no such default; `p-0` explicitly zeroes padding).

### D23 · MINOR · The scene writes a persisted user preference it can never expose

```
SequenceScene.vue:30   const storedControls = getStoredAnimationGroupControlOptions(SCENE_ID);
SequenceScene.vue:31   storedControls.isControlsPanelOpen = false;
```

`getStoredAnimationGroupControlOptions` (`controlOptionsStore.ts:66–95`) returns a reactive bucket backed by `useStorage` (localStorage, `"animation-groups-control-options-store"`). Line 31 therefore performs a **localStorage write on every mount** of a preference for a panel that cannot render — the scene's own comment (`SequenceScene.vue:25–29`) states the authority is the DFA (`CONTROL_SURFACES.sequence = []`, confirmed at `controlSurfaces.ts:88`, "sequence → []"). A scene whose DFA is empty should not be reaching into a shared persistence store at all; the emptiness is already load-bearing. *Falsifier* — `CONTROL_SURFACES.sequence` being non-empty, or evidence that the panel container consults the stored flag before the DFA.

### D24 · MINOR · A null ball ref degrades to a silently dead lane

```
SequenceTarget.vue:184-188  onMounted(() => { for (…) { const el = ballEls[i]; if (el) demo.childAnims[i]!.setTargets(el); } })
```

If any `ballEls[i]` is null the guard swallows it, and that lane renders a complete row — label, rail, handle, ball at its start gate — whose traveller never moves. There is no cue, no fallback, no degraded state. State-coverage survey for the rest: **empty** is N/A by construction (`ROW_COUNT = 5` is a module constant, `useSequenceDemo.ts:59`); **loading** is handled at the shell (`App.skeleton`, census S-6) and glass-ui's `Metric` even ships a `loading` prop + `[data-loading]` skeleton (`metric/types.d.ts`, `metric/styles.css`) the scene never uses; **error** has no surface anywhere in the subtree. *Falsifier* — a proof that template refs on a `v-for` with static length cannot be null at `onMounted`, or an error boundary above the scene.

---

## 3b · INFO

### D25 · INFO · `computed` is imported and never used

`SequenceScene.vue:8` — `import { computed, provide, ref } from "vue";`. The file uses `provide` (`:19`), `ref` (`:41`) and `getStoredAnimationGroupControlOptions`; `computed` appears nowhere in its 43 lines. *Falsifier* — any `computed(` in the file.

### D26 · INFO · `--seq-glow: 0` is declared three times on the same inheritance chain

`SequenceTarget.css:10` (`.seq-target`), `:216` (`.cascade-chase`), lifted to `1` at `:29` (`.seq-stage.is-scrubbing`). `.cascade-chase` is applied to the *same element* as `.seq-stage` (`SequenceTarget.vue:61`), which already inherits `0` from `.seq-target` — the second declaration shadows an identical value. Specificity still resolves the `is-scrubbing` lift correctly (`.seq-stage.is-scrubbing[data-v]` (0,3,0) > `.cascade-chase[data-v]` (0,2,0)), so this is redundancy, not breakage. *Falsifier* — a consumer of `.cascade-chase` outside `.seq-target`.

---

## 4 · Candidate defects KILLED by the tree — do not re-file

Recorded so the next auditor does not spend the budget twice. These were investigated, looked like defects, and were falsified by evidence.

| # | hypothesis | why it died |
|---|---|---|
| K1 | The live `progress` Metric jitters the header as the value crosses 9→10→100. | `metric/styles.css` `.metric__value { min-inline-size: 3ch; font-variant-numeric: tabular-nums lining-nums }`. Three digits reserved, equal advances. **No jitter.** The right primitive was chosen. |
| K2 | `.seq-scrub` (`role=slider tabindex=0`) has no focus indicator → WCAG 2.4.7 Level A failure. | Every `outline: none` in `glass-ui/dist/styles/**` and `demo/styles/*.css` is class-scoped; none reaches a bare `div`. The UA `:focus-visible` ring paints. Downgraded to the consistency-only charge D15. |
| K3 | `.seq-row-name`'s `font-weight: 600` is browser-synthesised faux-bold. | `glass-ui/dist/styles/fonts.css` ships Plus Jakarta Sans as a variable face with `font-weight: 200 800`. 600 is a **real** instance. The T.D2/T.D3 fix is correct — credited at **S3**. |
| K4 | Forced-colors mode destroys the storyboard (no `@media (forced-colors: active)` anywhere in the scene, and glass-ui's `accessibility.css` only handles `aria-current`/`selected`/`pressed`/`checked`). | Degradation is **graceful**: every load-bearing signal is text or geometry — row index (`:86`), `@…ms` (`:87`), tick values (`SequenceAxis.vue:12`), badge words (`:41`), handle and ball *positions*. Only the five-stop spectrum and the glow are lost, and both are decorative by the file's own account (`SequenceTarget.vue:157–160`). Recorded, **not charged**. |

**Not-charged records (2 more):**

- **RTL** — the storyboard is entirely physical: `left: 0` (`css:191`, `Playhead:41`), `margin-left: -22px` (`css:132`), `right: 50%` (`Playhead:73`), `text-align: right` (`css:82`), `translateX` throughout, and the axis edge-hug uses `:first-child`/`:last-child` rather than logical selectors (`SequenceAxis.vue:36–41`). `demo/app/index.html:2` is `<html lang="en">` with no `dir` and the demo has no i18n surface, so this is **latent cost, not a live defect**. It becomes MAJOR the day a `dir="rtl"` arm ships — the playhead's `left: calc(1rem + var(--track-inset))` would inset from the wrong side.
- **P1 · UNPROVEN-NEEDS-LIVE** — whether `.seq-row`'s subgrid `column-gap: 0.75rem` (`css:73`) against the parent's `column-gap: 0` (`css:44`) insets the row **track** column. This decides whether the row handles share an origin with the axis (3.25rem) or with the playhead (4rem). It does **not** affect D1, which is forced independently of the answer — but it determines whether the row handles are the third misaligned layer or the second aligned one. **Probe**: compare `.seq-track`, `.seq-axis` and `.seq-playhead-track` `getBoundingClientRect().left` in the live DOM at 1440 px. Reserve for the SS-13 visual audit.

---

## 5 · Superlatives (L-18, both ways)

### S1 · The container-query transform choreography is genuinely excellent
`SequenceTarget.css:106–115` makes each `.seq-track` a `container-type: inline-size`; `:194–199` rides the traveller on `translateX(calc((--row-start + --ball-p·(1 − --row-start)) · (100cqw − --ball-size)))`; `SequencePlayhead.vue:35, 46` and `SequenceScrubber.vue:121, 34` do the same for the playhead and scrub ball. Result: **five engine-driven travellers, a master playhead and a scrub ball all animate on compositor-only transforms with zero per-frame layout**, and every position stays rail-relative without JS measurement. `will-change: transform` is applied at each of the four moving elements. *Falsifier* — a live performance trace showing layout work per frame; or a `left`/`width` write in the animation path (there is none — `useSequenceDemo.ts:133–137` writes only `--ball-p`, `opacity`, `scale`).

### S2 · `--row-start` makes the stagger legible in the *still* frame — a rare piece of real information design
`SequenceTarget.vue:81` sets `--row-start: clamp(row.at / STAGGER_MAX, 0, 1)` per row, and `:194–199` composes it with `--ball-p` so each traveller **rests at its own `at:` gate** and glides from there. At t=0 the five balls draw a diagonal cascade rather than piling at the origin. The scene's entire subject is a *delay distribution*; making that distribution readable with the clock stopped is the correct and non-obvious solution. *Falsifier* — remove `--row-start` from the transform and observe whether the stagger remains legible at rest; it does not.

### S3 · The honest-weight typography chain is correct end to end — verified, not assumed
`style.css:100` sets `font-synthesis: none` at `:root`; `:263–274` overrides glass-ui's hard-coded `font-weight: 600` on every `text-display-*` rung back to Instrument Serif's true 400 with neutral tracking; `SequenceTarget.css:84–94` then retires this component's own serif "engraved" channel number for `var(--font-weight-semibold, 600)` on Plus Jakarta Sans. I verified the load-bearing premise rather than trusting the comment: `--font-weight-semibold: 600` is defined (`glass-ui/dist/styles/components.css`) and Jakarta ships `font-weight: 200 800` as a variable axis (`fonts.css`) — so 600 is a **real instance, not a synthesis**. The reasoning at `:84–89` is sound and the tree backs it.

### S4 · The scrubber consumes the promoted idiom's parameter instead of re-authoring it
```
SequenceScrubber.vue:143-150  /* CONSUME the promoted .progress-ball idiom's --ball-glow parameter
                                 (design-idioms.css:584) rather than re-authoring its box-shadow —
                                 the idiom owns the 0 2px glow shape; the scene only lifts the strength. */
                              .seq-scrub.is-scrubbing .scrub-ball { --ball-glow: 60%; }
```
One custom-property lift, no shadow duplication, with the ownership boundary stated. This is exactly the discipline the flat-namespace hazard punishes elsewhere (D11) — here it is done right, and it is the model the rest of the file should follow.

### S5 · The engine target was moved from track to ball to protect the touch target
`SequenceTarget.vue:108–117` + `:176–182` + `SequenceTarget.css:178–186`: the child animation's target is the **ball**, not the row track, because `scale: 0.7` at the 0 % keyframe (`useSequenceDemo.ts:134`) applied to the track would shrink the whole row and drop the 24 px handle to 16.8 px — under the WCAG 2.5.8 floor. A **motion parameter creating an intermittent target-size failure** is a subtle class of defect; catching it and fixing it *structurally* (relocate the target) rather than by clamping the scale is the right instinct. *Falsifier* — re-target a child to `.seq-track` and measure the handle mid-glide.

### S6 · The 44 px touch floor is applied on the axis that means something, with the rejection argued
`SequenceTarget.css:121–127`: the handle is `width: 44px; height: 100%` — a 44 px floor **on the drag axis**, with an explicit rejection of a 44 px-*tall* box because it would overflow into the stacked neighbour rows and make the targets ambiguous. That is a genuine engineering judgement about which axis carries the gesture, not a cargo-culted 44×44. The visible grip stays 6.4×24 via `::after` with `pointer-events: none` so the host owns every tap. (D16's phantom-ring charge is about the *focus indicator* on this same element, not about the sizing decision, which is right.)

### S7 · The scene refuses to fake its transport authority
`SequenceScene.vue:21–29` + `useSequenceDemo.ts:47–55, 155–158`: a private `isPlaying = ref(false)` shadow was deleted in favour of a read-only projection off `machine.status`, and `SequenceScene.vue` exposes a `SceneFacility` with one honest channel rather than a decoy `AnimationGroup`. On the design axis this matters because it is why the dock shows **no** control affordance for this scene (`controlSurfaces.ts:88`, "sequence → []") — the absence of chrome is a *declared* consequence of an empty DFA rather than a hidden panel. Panel-less-by-declaration is the correct posture for a self-contained stage. (D23 charges the one leftover write that contradicts it.)

---

## 6 · Where this contradicts / extends the hitherto corpus

- **S-4 (lane-frontend.md:350–352)** — confirmed and extended. The census scores `SequenceScrubber` as a 162-line shadow of `ScrubberTimeline`/`Slider` on *line count*. This audit adds the design case: the scrubber is off-system in its own chrome (**D5**, italic Jakarta where the file claims Fira Code and where `text-admin-label` exists two files away) and opts out of the demo's single declared focus contract (**D15**). A `Slider` swap would resolve both by construction. **No contradiction.**
- **F-1 (lane-frontend.md:15, 54)** — independently reconfirmed against `package.json`: `dependencies` is `{ "@mkbabb/value.js": "4.0.0" }` and `@mkbabb/glass-ui` appears in neither `dependencies` nor `devDependencies`, while 7.0.0 sits resolved in `node_modules`. Every glass-ui-derived measurement in this file (the type ladder, the neutral ramp, `Metric`'s `min-inline-size`, `text-caption`'s italic) is therefore taken against an **unlocked** resolution. **All token-derived findings above should be re-verified after F-1 lands.**
- **S-3 (lane-frontend.md:325–348)** — no overlap; the timeline cluster is a different subtree. Noted only because `dist/components/timeline/geometry.d.ts` — the module the census identifies as owning percent-positioning arithmetic — is exactly the kind of primitive that would have prevented **D1**'s three-origin divergence.
- **S-8 / inv ζ** — the census's "dogfood the engine, keep the bespoke" ruling for `TypingDots` applies with equal force here and is respected: the cascade is `Sequence.scrub` fanning `--ball-p` out to five children (`SequenceScrubber.vue:54–73`, `useSequenceInstrument.ts:6–8`), with no hand-rolled rAF. **No design finding above proposes replacing engine-driven motion with CSS.**

---

## 7 · Ranked repair order (cheapest truth first)

| rank | id | fix | cost |
|---|---|---|---|
| 1 | D2 | delete `opacity: 0.8` from `.seq-row-at` | 1 line |
| 2 | D1 | give `.seq-axis` the same origin as the playhead — `left`-inset it by `--col-gap`, or move the playhead to `--label-col` and drop `--col-gap` from `--track-inset` | 1 line, but decide with **P1** in hand |
| 3 | D12, D25, D26, D21 | delete dead style/import/utility traffic | 4 lines |
| 4 | D10 | `text-transform: none` on `.seq-row-at`, or move `ms` out of the uppercased span | 1 line |
| 5 | D5 | `text-caption font-medium` + `.seq-eyebrow` → `text-admin-label` | 2 lines, deletes a rule |
| 6 | D3 | widen `--label-col` to ≥ 4.5rem (measure `@1600MS` at 1920) | 1 token |
| 7 | D7 | PRM guard in `playReel`, mirroring `useSequenceInstrument.ts:29–32` | 3 lines |
| 8 | D13 | promote the axis height to a shared `--axis-h` token consumed by both files | 3 lines |
| 9 | D17, D18, D20 | `aria-valuetext` ×2, a `ms` suffix or `sr-only` axis caption, `role="status"` on the badge | 4 attributes |
| 10 | D6, D8, D9, D19 | header hierarchy, overflow posture, reel discoverability, badge semantics — these want a design decision, not a patch | spec-sized |
| 11 | D4 | resolve `btn-interactive` repo-wide (define it or delete all 8 call sites) | cross-cutting; not this scene's to decide |

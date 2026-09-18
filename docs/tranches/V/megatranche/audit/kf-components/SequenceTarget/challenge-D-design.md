claude-opus-5[1m]

# CHALLENGE · SequenceTarget · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceTarget.vue` (252 L) + its sourced stylesheet `SequenceTarget.css` (259 L).
**Root for all short paths below** `/Users/mkbabb/Programming/keyframes.js/demo/`.
**Method** static, source-derived only. No browser, no devtools (law). Contrast ratios computed from token arithmetic where the substrate is decidable; anything requiring a composited backdrop or a rendered box is marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier; a claim that survives its falsifier is reported, one that does not is dropped (see §4 "checked and clean" for the ones that died).

## Read set (whole, read-only)

| file | L | why |
|---|---|---|
| `scenes/sequence/SequenceTarget.vue` | 252 | target |
| `scenes/sequence/SequenceTarget.css` | 259 | its `<style scoped src>` |
| `scenes/sequence/SequenceAxis.vue` | 49 | imported sub-unit |
| `scenes/sequence/SequencePlayhead.vue` | 87 | imported sub-unit |
| `scenes/sequence/SequenceScrubber.vue` | 162 | imported sub-unit |
| `scenes/sequence/useSequenceDemo.ts` | 482 | `ROW_COUNT`, the injected demo |
| `scenes/sequence/useSequenceInstrument.ts` | 45 | transitive (boot/PRM) |
| `scenes/sequence/useTypedTrigger.ts` | 31 | imported |
| `scenes/sequence/sequenceKeys.ts` | 8 | imported |
| `scenes/sequence/SequenceScene.vue` | 43 | the only mount site |
| `composables/useDragScrub.ts` | 150 | imported |
| `styles/design-idioms.css` | — | `.progress-rail/.progress-ball/.status-badge/.stage-field-x/.readout-accent`, `--rainbow-*` |
| `styles/style.css` | — | `--color-progress`, `--accent-kf`, `--font-mono`, the `@layer demo-typography` display override |
| `styles/layout.css`, `…/AnimationControlsGroup.css` | — | `.stage-cell` (the host box) |
| glass-ui 7.0.0 `dist/components/{card,button,metric}`, `dist/styles/typography/{scale,semantic,utilities}.css`, `dist/styles/glass/{ladder,a11y-fallback}.css`, `dist/styles/utilities/a11y-overrides.css`, `dist/styles/tokens/color-radius.css` | — | every consumed primitive + token |

**Hitherto corpus folded** — `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md`: **S-4** (SequenceScrubber → `ScrubberTimeline`/`Slider`, AMBER), **§6.3** (no `--kf-*` namespace; flat global custom-property surface "worth a lane of its own"), **§6.4** (`seq-ruler-wipe`/`seq-lane-drop` inventory), **§6.5** (PRM census; `useSequenceInstrument.ts:31` listed as a raw-`matchMedia` site), **F-1** (glass-ui phantom dep). Cited inline where they overlap. One explicit contradiction of the corpus is filed at **D-4**.

---

## 1. Blockers

### D-1 · BLOCKER · the timeline has **three different origins for one time axis**
`SequenceTarget.css:36-56` · `SequenceAxis.vue:22` · `SequencePlayhead.vue:23-31` · `SequenceTarget.css:59-74`

`.seq-stage` is a two-column grid `[--label-col 3.25rem][1fr]` with **`gap: 0.5rem 0`** — column-gap **zero** (`SequenceTarget.css:44`). Three things claim to ride "column 2", by three independent formulas:

| element | how it gets its left edge | left edge, from `.seq-stage` **content-box** left |
|---|---|---|
| `.seq-axis` (the ruler that **names** the domain) | `grid-column: 2` as a *direct grid item* of `.seq-stage`, whose column-gap is `0` (`SequenceAxis.vue:22`) | **3.25rem** |
| `.seq-track` (the rail the **handles** ride) | `grid-column: 2` of `.seq-row`, a `subgrid` that overrides the gutter with `column-gap: var(--col-gap)` = 0.75rem (`SequenceTarget.css:70-73`) | somewhere in **(3.25rem, 4rem)** — subgrid-gutter dependent |
| `.seq-playhead-track` (the line that **shows** the position) | `left: calc(1rem + var(--track-inset))`, `--track-inset = 3.25rem + 0.75rem = 4rem`, resolved against the padding box whose padding-left is `1rem` (`SequencePlayhead.vue:29`, `SequenceTarget.css:37-39,45`) | **4rem** |

`.seq-axis` and `.seq-playhead-track` differ by **exactly 0.75rem = 12px**, and this half of the claim needs **no** subgrid reasoning: `.seq-axis` is a direct grid item of a grid whose column-gap is `0`, `.seq-playhead-track` is absolutely positioned at a hand-computed 4rem. They share their *right* edge (axis → content-right; playhead → `right: 1rem` = content-right), so the ruler is **12px wider and 12px further left** than the playhead's travel.

Visible consequence, always, at rest: the `0` tick is `translateX(0)` — flush to the axis's left edge at 3.25rem (`SequenceAxis.vue:36-38`) — while `progress = 0` puts the playhead line at 4rem. **The playhead does not sit on the zero mark.** Every intermediate tick (`400/800/1200`) is displaced by `12px × (1 − q)`. The handles are at a *third* origin, so at most one of the three can be telling the truth.

This is the headline design failure because the scene's entire stated purpose is "the distribution SEEN, not piled left" (`SequenceTarget.vue:53-54`) — an instrument whose ruler, playhead and handles disagree cannot show a distribution. It is also the single geometry the file never derives from one authority: `--track-inset` exists precisely to be that authority (`SequenceTarget.css:39`) and the axis does not consume it.

**Falsifier** measure `getBoundingClientRect().left` of `.seq-axis`, any `.seq-track`, and `.seq-playhead-track` in the same stage. If all three are equal, this claim dies whole. If only the axis/playhead pair is equal, the subgrid half dies and the claim reduces to D-1′ (handles off-axis). The *magnitude* of the track's offset is **UNPROVEN-NEEDS-LIVE**; the axis↔playhead 12px Δ is proven from source.

---

## 2. Major

### D-2 · MAJOR · the traveller rests **half a ball (12.8px) off** its own start gate
`SequenceTarget.vue:96-107` (handle) · `SequenceTarget.css:187-199` (ball) · `design-idioms.css:177-187` (`.progress-ball`)

Both live in the same `.seq-track` containing block, so no subgrid subtlety applies. Let `W` = track width, `s = row.at / STAGGER_MAX`, ball diameter `1.6rem = 25.6px`.

- **Handle grip centre.** Box left `= s·W − 22px` (`left: calc(s·100%)` + `margin-left: -22px`, `.css:120-136`); `::after` centres at `+50%` of the 44px box `= +22px` ⇒ centre `= s·W`.
- **Ball centre.** `.progress-ball` sets no `margin-left`; `.seq-ball` sets `left: 0` and `transform: translateX(calc((s + p·(1−s)) · (100cqw − 25.6px)))`. At rest `p = 0` ⇒ left edge `= s·(W − 25.6)`, centre `= s·(W − 25.6) + 12.8`.

Δ = `s·W − [s·(W − 25.6) + 12.8]` = **`25.6·(s − 0.5)` px**. Zero only at the exact midpoint; **−12.8px at `s = 0` and +12.8px at `s = 1`**.

The default distribution is `at = 0, 260, 520, 780, 1040` over `STAGGER_MAX = 1600` (`useSequenceDemo.ts:65,74,108`) ⇒ `s = 0, .1625, .325, .4875, .65`, so at first paint the five travellers sit **+12.8, +8.6, +4.5, +0.3, −3.8 px** from their gates. Row 1 — the first thing a visitor looks at — shows a ball sitting a full radius to the right of the handle it is documented to be resting on: "each traveller RESTING at its `at:` start gate (C-SEQ-3, `--row-start`)" (`SequenceTarget.vue:52-53`), "it RESTS at its start gate … and glides to the far end" (`.css:183-185`). The mechanism is right (see S-1 below); the two travel ranges were never reconciled — the handle maps `[0,1] → [0,W]`, the ball maps `[0,1] → [0, W−25.6]`.

**Falsifier** render the default state and measure the handle grip's centre x against the ball's centre x on row 1. If they coincide, the claim dies. (It cannot be rescued by `container-type: inline-size` on `.seq-track` — `100cqw` is that same track's content box, and the track has no padding, so `cqw` and `%` share a denominator.)

### D-3 · MAJOR · `.seq-row-at` fails AA — an opacity multiplier on an AA-tuned token
`SequenceTarget.css:100-103` · `SequenceTarget.vue:85-88`

`.seq-row-label` carries `text-mono-caption text-muted-foreground`; `.seq-row-at` adds **`opacity: 0.8`**. Inside a glass-ui `Card`, `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` remaps `--muted-foreground: var(--on-glass-muted)` (`glass-ui/dist/styles/glass/ladder.css`), light arm `hsl(30 26% 35%)`. The label sits on `.seq-stage`'s opaque plate, `color-mix(in srgb, --color-progress 5%, --background)` with `--background = neutral-0 = hsl(40 30% 98%)` and `--color-progress = --accent-kf = oklch(0.56 0.17 295)` (`style.css:130,163`; `.css:50-55`).

Computed (sRGB → relative luminance → WCAG 2.x ratio):

| state | ratio | verdict |
|---|---|---|
| token as designed (opacity 1) | **≈ 5.90 : 1** | passes AA with ~31% headroom |
| `.seq-row-at` as shipped (opacity 0.8) | **≈ 3.82 : 1** | **fails AA (4.5:1) by ~15%** |

Size disqualifies the large-text exemption: `--type-caption` is `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` = **12.15px @375 → 14.38px @1440** at weight 400 — normal text in every viewport (`glass-ui/dist/styles/typography/scale.css`).

The rationale block (`.css:95-99`) argues the sub-line's subordination "reads through WEIGHT + opacity, not an off-ladder sub-caption px" — it correctly refused an off-ladder font-size and then bought the same subordination with the one lever the design system cannot absorb. `--muted-foreground` is *already* the system's low rung; an α multiplier on top of it is a strict reduction from whatever floor the token guarantees, by construction.

**Falsifier** three ways this dies: (a) the Card resolves `--glass-backdrop: light`, whose container-style query in `ladder.css` promotes `--muted-foreground` to `var(--foreground)` — but the demo's cards are `.glass-quiet` (`style.css:195-200` comment), so this query should not fire; confirm the computed color; (b) a measured composited backdrop materially darker than the computed plate; (c) the dark arm (`--on-glass-muted: hsl(34 16% 72%)`) clearing 4.5:1 at 0.8α — **UNPROVEN-NEEDS-LIVE**, though the same strict-reduction argument applies.

### D-4 · MAJOR · `playReel()` — an author-declared *decorative* animation with **no** prefers-reduced-motion path
`useSequenceDemo.ts:351-392` · fired from `SequenceTarget.vue:29-37` (button) and `:249` (hidden typed egg) · contradicts `SequenceTarget.css:237-243`

The file's own law, one stylesheet away: *"**MANDATORY PRM degrade** — the boot is decorative; held to the snapped still frame"* (`.css:237-238`). The reel is described by its own author in the same terms — *"a cascading Mexican-wave overshoot, IGNORING the master clock once — **pure delight**"* (`useSequenceDemo.ts:352-354`) — and is driven with a deliberately **under-damped** spring (`dampingFraction: 0.34`, "a pronounced overshoot bounce", `:362`) fired in a 90ms stagger across five targets. It has no PRM guard anywhere in its call chain.

Nothing upstream catches it. glass-ui's global override (`dist/styles/utilities/a11y-overrides.css`) neuters CSS `animation-duration` and restricts `transition-property` under PRM — but the reel is **engine-driven inline style writes** (`child.play()` → the DOM renderer writes `--ball-p`/`opacity`/`scale` per frame), which no CSS rule can reach. `useSequenceInstrument.powerOn()` guards the *boot* (`:29-32`) and proves the codebase knows the idiom; the reel simply never got it.

**Contradiction of the hitherto corpus (explicit).** `lane-frontend.md §6.5` inventories 13 PRM enforcement sites and lists `useSequenceInstrument.ts:31` for this scene, concluding coverage is *"conscientious but inconsistent in mechanism."* Against the tree that is too generous for this scene: the census counted the guard that exists and did not test the *set of decorative motions* against it. Two of this scene's three decorative motions are guarded (boot ruler-wipe, boot lane-drop); the third and loudest (the reel overshoot cascade) is not, and it is the only one a user can trigger repeatedly — twice over, since the discoverable button and the hidden `reel` keystroke both reach it.

**Falsifier** set `prefers-reduced-motion: reduce`, press the Clapperboard. If the balls snap to terminal without an overshoot excursion, the claim dies. Grep confirms no PRM read in `useSequenceDemo.ts`, `keyframes.js`'s `springTimingFunction`, or `Animation.play` reachable from here.

### D-5 · MAJOR · the scene title is a `<span>`; the sibling scene proves it should be an `<h2>`
`SequenceTarget.vue:14` vs `scenes/easing/EasingTarget.vue:24-29`

```
SequenceTarget.vue:14   <span class="text-display text-foreground truncate">Sequence</span>
EasingTarget.vue:24-27  <h2 :key="…" class="specimen-name text-display text-foreground">
```

Identical class string, identical role in the composition, different element. The sequence scene ships **no heading at all** — `SequenceScene.vue` (43 L) has none, and the only `<h1>`/`<h2>` in the app shell belong to `EditorStartScreen.vue:27,40,45` (the pre-scene start screen). A screen-reader user browsing by heading cannot reach or identify this scene, and the card carries no `role="region"`/`aria-label` substitute either.

**Falsifier** find a heading or a labelled landmark that names this scene from any ancestor. `grep -rn "<h1\|<h2\|<h3\|role=\"region\"\|role=\"main\"" demo/` returns only `EditorStartScreen`, `EasingTarget`, `TimingFunctionPanel`, `KeyboardShortcutsModal` — none of them ancestors of a mounted sequence scene.

### D-6 · MAJOR · `--label-col` is too narrow for the **default-state** label; the text overflows its own grid track
`SequenceTarget.css:37` (`--label-col: 3.25rem` = 52px) · `SequenceTarget.vue:85-88` · `.css:77-83`

The widest default label is row 5's `@1040ms`, uppercased by `.text-mono-caption` to `@1040MS` — **7 glyphs** in `--font-mono: "Fira Code", monospace` (`style.css:56`), advance 0.6em.

| viewport | `--type-caption` | 7 × 0.6em | vs 52px track |
|---|---|---|---|
| 375px | 12.15px | 51.0px | fits (just) |
| 768px | 12.97px | 54.5px | **+2.5px overflow** |
| 1280px | 14.05px | 59.0px | **+7.0px overflow** |
| 1440px | 14.38px | 60.4px | **+8.4px overflow** |
| ≥2209px | 16.00px (clamp max) | 67.2px | **+15.2px overflow** |

Break-even is a **~486px viewport** — i.e. the column was sized on a phone and overflows on every desktop. `.seq-row-label` is a `display:flex; flex-direction:column; align-items:flex-end` box with `text-align:right` and **no `overflow`, no `truncate`, no `min-width:0`**, and its grid track is a *fixed* `3.25rem` (not `auto`), so the track cannot grow: the text spills **leftward**, out of the label column, into the stage's 1rem padding. Dragging a handle to the domain end makes it `@1600MS` — same width, permanently.

Note this is the *only* fixed-width track in the component and it holds the one string that scales with `vw` via a `clamp()`. The `§LABEL-subgrid` idiom it invokes (`.css:58`, `design-idioms.css` `.labeled-field-grid`) uses `[label] auto` precisely to avoid this; the scene hard-coded a rem instead.

**Falsifier** if Fira Code's advance is not 0.6em (the metric-matched `monospace` fallback would need to be ≤ 0.52em to fit at 1440px), or if the rendered label is clipped/ellipsised rather than overflowing, the numbers change. Measure `.seq-row-label` scrollWidth vs the track width at ≥768px.

### D-7 · MAJOR · forced-colors — the travellers and the master playhead **disappear**, the decorative wash survives
`design-idioms.css:166-187` · `SequenceTarget.css:187-209` · `SequencePlayhead.vue:37-52` · demo-wide: **zero** `forced-colors` sites

`grep -rn "forced-colors" demo/` → **0 hits**. glass-ui ships four forced-colors blocks (`glass/a11y-fallback.css`, `utilities/a11y-overrides.css`, `accessibility.css`, `components.css`) but they cover *glass surfaces* (`.glass-*` → `border: 1px solid CanvasText`, decorations off) and *focus rings* — nothing in this scene's own paint. Element by element under `forced-colors: active` (UA forces `background-color`, `border-color`, `color`; forces `box-shadow`/`text-shadow` to `none`; leaves `background-image` alone):

| element | sole visual | in HCM |
|---|---|---|
| `.progress-ball` / `.seq-ball` (the 5 travellers) | `background: var(--ball-tone)` + `box-shadow` bloom | **gone** — Canvas fill, shadow stripped |
| `.seq-playhead` (the master playhead line) | `background: var(--ball-tone)`, 2px wide, + `box-shadow` | **gone** |
| `.progress-rail` (5 rails + the scrub rail) | `background: color-mix(…)` | **gone** |
| `.scrub-ball` | as `.progress-ball` | **gone** |
| `.seq-stage` wash + `.stage-field-x` rules | `background-image` gradients | **survives** (unforced) |
| `.seq-handle::after` grip | `background` + `border: 1.5px solid` | survives as an outline (accidental) |
| `.seq-playhead::after` comet | `background-image` gradient | **survives**, now a stray streak with no line to trail |

Net: in Windows High Contrast the storyboard keeps its decoration and loses every element that carries state. Five draggable sliders remain operable but show nothing; progress is unreadable except as the header percentage. This is a whole-mode failure of the component's only information channel, and it is decidable entirely from source — the paint is `background-color` + `box-shadow` throughout, with no `forced-color-adjust` anywhere.

**Falsifier** render under `forced-colors: active`. If the balls/playhead remain visible (a UA that does not force `background` on these, or a glass-ui rule I missed reaching non-`.glass-*` descendants), the claim dies.

### D-8 · MAJOR · `overflow-hidden` + three `shrink-0` bands = the primary control is silently clipped at short viewports
`SequenceTarget.vue:8` (`h-fit max-h-full flex flex-col overflow-hidden`) · `:12` `:55` header/storyboard `shrink-0` · `SequenceScrubber.vue:7` `shrink-0`

Every child of the Card declares `shrink-0`; the Card declares `overflow-hidden` and `max-h-full`. There is no scroll container and no `min-h-0` anywhere in the chain, so when content exceeds the cell the excess is **discarded, not scrolled** — and the last child is `SequenceScrubber`, the master transport the whole card is built around.

Content floor, from tokens: header ≈ 68px (the `xl` Metric value is `--type-display-3`, 62.7px @1024, `line-height: 1`) + 20px padding ≈ **88px**; storyboard = axis 20 + gap 8 + 5 rows × ~37 + 4 gaps × 8.8 + stage pad 28 + storyboard pad 32 ≈ **300px**; scrubber = eyebrow row ~20 + 8 + rail 36 + pad 24 ≈ **88px**. Total ≈ **476px** plus borders. The host `.stage-cell` on mobile is `position: fixed; inset: 0` minus `padding-block: var(--dock-band-reserve)` on **both** edges (`AnimationControlsGroup.css:90-92,133-140`). A 375×667 phone in **landscape** gives a 375px-tall viewport ⇒ roughly 375 − 2×reserve ≈ **250px** of cell ⇒ ~225px clipped ⇒ **the entire scrubber, plus the last two storyboard rows, are not merely off-screen but unreachable.**

**Falsifier** resize to a ≤400px-tall viewport. If a scrollbar appears, or if the storyboard compresses to fit, the claim dies. Note the mobile media query (`.css:249-259`) trims ~34px of row-gap and track height — an order of magnitude short of the deficit, and see D-13 for why most of that trim is inert.

### D-9 · MAJOR · the status badge is the only textual state signal, is not announced, and **lies during the reel**
`SequenceTarget.vue:38-41` · `design-idioms.css:218-241` · `useSequenceDemo.ts:364-392`

Three problems compound on one 10px span:

1. **Not announced.** No `role="status"`, no `aria-live`. The state changes that matter most are *unprompted*: the sequence reaching its natural end flips `playing → ready` via `machine.dispatch({type:"PAUSE"})` inside a `.finally()` (`useSequenceDemo.ts:231-239`). A screen-reader user is never told the run finished.
2. **It lies.** `playReel()` calls `pause()` and `sequence.pause()` before running (`:367-368`), so `isPlaying` is false and `isReversed` is false ⇒ the badge reads **"ready"** while five balls visibly bounce through an overshoot cascade. `isReeling` has no badge state; the only feedback is a `.reel-active` recolour on the button (and see D-15 — that recolour does not do what it claims).
3. **10px.** `text-admin-label` is `--type-admin-label: 0.625rem` = a flat **10px**, and `.status-badge` overrides the family to `--font-text` at weight 500 while keeping that size (`design-idioms.css:222-229`). A body-face 10px uppercase word is the smallest type in the component and carries its most important non-graphical state.

**Falsifier** (1) find an `aria-live` region elsewhere that mirrors playback state — none exists in `SequenceScene.vue`, `SequenceTarget.vue` or `SequenceScrubber.vue`; (2) trigger the reel and read the badge; (3) measure the badge's computed `font-size` — if a rem-scaling ancestor lifts it above 10px, part 3 dies.

### D-10 · MAJOR · the row sliders speak **bare numbers**, and the only place a unit exists is `aria-hidden`
`SequenceTarget.vue:99-104` · `SequenceAxis.vue:6`

```
role="slider"  aria-label="Re-time row 1 start offset"
aria-valuenow="1040"  aria-valuemin="0"  aria-valuemax="1600"
```

No `aria-valuetext`, and no unit in the label. AT reads *"Re-time row 1 start offset, slider, 1040"* — 1040 of what is nowhere in the accessible name computation. The two places the unit is visible are the `.seq-row-at` sub-line (visual only, unassociated, and see D-3) and the axis ruler, whose entire element carries **`aria-hidden="true"`** (`SequenceAxis.vue:6`). The `aria-hidden` on a purely decorative ruler is defensible in isolation; combined with a unit-less `aria-valuenow` it removes the last non-visual reference to the domain.

Corollary: `aria-valuemax` is bound to `demo.STAGGER_MAX` = 1600 while `ROW_AT_STEP` is 40ms (`:232`) — 40 arrow presses to traverse, no `PageUp`/`PageDown` handling (`:233-243`). APG's slider pattern names both large-step keys.

**Falsifier** add nothing — read the DOM. If an `aria-valuetext` or a unit-bearing `aria-describedby` exists, the claim dies. Neither is present.

### D-11 · MAJOR · proportion — the derived percentage outranks the scene's own name, and one scalar is drawn four ways
`SequenceTarget.vue:14,18-24,127` · `SequenceScrubber.vue:16` · `SequencePlayhead.vue:10` · glass-ui `metric/styles.css`

`Metric size="xl"` resolves `.metric__value` to **`--type-display-3`** = `clamp(2.618rem, 2rem + 3vw, 4.236rem)` → **62.7px @1024, 67.8px @1440**. The scene title `text-display` resolves to `--type-display-1` = **35.6px @1024, 41.9px @1440**. The transient percentage is **1.6–1.8× the identity of the scene**, in the same baseline-aligned flex row (`:13`).

That header strip carries **six** type sizes in ~30px of vertical band: 10px badge · 11px metric label (`--type-micro`) · 14px `stagger × 5` caption · 20px (nothing — that's the row index below) · 36–42px serif title · 63–68px metric value. Aristotle's mean is not "avoid big"; it is that magnitude should track significance. Here it tracks nothing.

And the same scalar — `demo.progress` — is rendered **four** times inside one card: the `xl` Metric as `0–100 %` (`:18-24`), the phosphor timecode as `0.000` (`SequenceScrubber.vue:16`), the swept playhead line (`SequencePlayhead.vue:10`), and the scrub ball's position (`SequenceScrubber.vue:32-35`). Two of the four are *numeric text*, in different units, ~35px apart vertically. The scrubber's own comment stakes a claim the header falsifies: *"the master clock made the brightest number on the page"* (`SequenceScrubber.vue:12-15`) — the timecode renders at `--type-caption` (12–14px); the header Metric is 5× its size.

**Falsifier** if `--type-display-3` does not resolve as computed (e.g. a `font-size` on an ancestor changes the `vw` term — it cannot; `vw` is viewport-relative), or if a demo-layer override retargets `.metric[data-size="xl"]` — `grep -rn "metric__value\|data-size" demo/styles/` returns nothing. The *four-representations* claim is structural and needs no measurement.

---

## 3. Minor / info

### D-12 · MINOR · the playhead's vertical extent is a hand-copied magic number that is already stale
`SequencePlayhead.vue:26` — `top: calc(0.75rem + 1.25rem); /* frame pad-top + axis ruler height */`

Two errors. (a) It omits `.seq-stage`'s **`row-gap: 0.5rem`** (`SequenceTarget.css:44`), which separates the axis grid item from `.seq-rows`; the true top of row 1 is `0.75 + 1.25 + 0.5 = 2.5rem`, so the line over-runs the rows by **8px** on desktop. (b) `SequenceAxis.vue:43-48` changes the ruler to `height: 0.95rem; margin-bottom: 0` below 1024px — the playhead's `top` is not updated, so the error becomes 0.2rem the *other* way on mobile. The `left`/`right` values on the same rule are derived correctly from `--track-inset`; only `top` was hand-copied.

**Falsifier** measure the playhead line's top against row 1's top border. Equal ⇒ dies.

### D-13 · MINOR · the mobile "row-pitch compression" is inert for layout and costs 8px of tap target
`SequenceTarget.css:245-259` · `.css:90-94,106-115` · `SequenceAxis.vue:43-48`

`.seq-row` is `align-items: center` — its height is `max(label, track)`. The label is a two-line flex column: `.seq-row-name` at `--type-subheading` = a **fixed 1.272rem = 20.35px** with `line-height: 1`, plus `.seq-row-at` at `1.15 × --type-caption` ≈ 14.0px @375 ⇒ **≈ 34.3px**. The mobile rule sets `.seq-track { height: 1.5rem }` = 24px — *below* the label, so the row height does not move. The compression's real saving is the `row-gap` change (0.55rem → 0.15rem ≈ 25.6px over four gaps) and 8px of storyboard padding; the track-height line contributes **zero**.

What it does contribute: the handle is `height: 100%` of the track (`.css:125-129`), so on mobile the drag target drops from 32px to exactly **24px** — sitting precisely on the WCAG 2.5.8 minimum with 2.4px of separation from the next row's target, on the surface that the file's own longest comment (`.vue:108-113`, `.css:178-182`) documents as having *already* had a target-size regression. Paying a tap-target margin for a layout saving that does not occur is the wrong trade.

**Falsifier** measure `.seq-row`'s computed height at 375px width. If it equals 24px (label shorter than track), the claim dies. It requires `--type-subheading + 1.15·--type-caption ≤ 24px` — i.e. caption ≤ 3.2px.

### D-14 · MINOR · hierarchy inversion inside the row label
`SequenceTarget.css:90-103`

The **ordinal index** (`1`…`5` — information already carried by vertical order, and by nothing else) is `--type-subheading` 20.35px at `--font-weight-semibold`. The **`at:` value** — the datum the row exists to expose, the one thing a drag re-authors, the one number the whole `Sequence` concept turns on — is 12–14px, muted, at `opacity: 0.8`. The typography says the row number matters 1.7× more than the timing.

The T.D2/T.D3 rationale above it (`.css:84-89`) explains at length why the index dropped its serif for "a REAL weight". It never asks whether the index should be the dominant element at all.

**Falsifier** an argument that the index is the primary identifier (it is not: the sliders' `aria-label` says "row N", the rows are visually ordered, and the tone spectrum already encodes index — `.vue:161-167`).

### D-15 · MINOR · `.reel-active` is documented as a pulse and is a static recolour
`SequenceTarget.css:172-176` — *"The reel button pulses while the egg runs (the active affordance state)"* over a rule that sets only `color` and `border-color`. No `animation`, no `transition`, no `@keyframes`. `grep -rn "reel-active" demo/` returns exactly two sites: this rule and the binding at `SequenceTarget.vue:32`. This matters beyond pedantry because it is the *only* feedback that the reel is running (see D-9.2) and a static tint is the weakest possible signal for a transient 1.3s state.

**Falsifier** find an animation targeting `.reel-active` in glass-ui's `Button` styles or a demo layer. None exists.

### D-16 · MINOR · `btn-interactive` is a dangling reference to a **deleted** glass-ui idiom
`SequenceTarget.vue:31`

`grep -rn "btn-interactive" demo/ node_modules/@mkbabb/glass-ui/` → **8 consumer call-sites in the demo, 0 definitions anywhere.** The class is a no-op. It is not a typo: `docs/precepts/instructions/LESSONS-LEARNED.md:603` records the exact incident — glass-ui commit `b0debec` *"retired `.rainbow-vivid` + `.rainbow-pastel` + **`.btn-interactive`** under a false zero-site verdict"*, with keyframes.js as the stranded consumer. The reel button therefore renders on glass-ui `Button`'s `emphasis="secondary"` alone, and the eight sites that believe they share an interaction idiom share nothing.

Adjacent to `lane-frontend.md` **F-1** (glass-ui is a phantom dependency — undeclared in `package.json`/lock): the same class of un-pinned coupling, one layer down. F-1 makes the *package* unreproducible; D-16 shows a *class contract* that already silently broke across a version the lockfile does not record.

**Falsifier** a Tailwind `@utility btn-interactive` or a plugin-generated rule. Searched `demo/**`, `node_modules/@mkbabb/glass-ui/**` (all extensions) — nothing; and no `tailwind.config.*` exists at the repo root.

### D-17 · MINOR · the `@property --ball-p` rationale is false as written
`SequenceTarget.css:13-18` — *"register `--ball-p` so the bloom **INTERPOLATES** between engine frames."*

Registration makes a custom property *animatable*; it does not itself interpolate anything. Interpolation requires a `transition` or `animation` targeting `--ball-p`, and there is none — the only `transition` in the stylesheet is `.seq-handle::after`'s `background`/`transform` (`.css:151-154`). The engine writes `--ball-p` inline every frame, so the value steps at frame cadence exactly as it would unregistered.

The block is not useless — the `<number>` syntax makes `calc()` on `var(--ball-p)` well-typed and gives `initial-value: 0` for the unset case — but the stated reason is not the operating one, which is the kind of comment that survives a refactor and misleads the next reader.

**Falsifier** find any `transition`/`animation` targeting `--ball-p`, or `transition-property: all` on an ancestor of `.seq-ball`. Neither exists (and glass-ui's PRM block restricts `transition-property` to `opacity, color, background-color, border-color, box-shadow`).

### D-18 · MINOR · flat-namespace hazard, and a `@property` that escapes `<style scoped>`
`SequenceTarget.css:14-18` · folds `lane-frontend.md §6.3`

The census recorded: *"No `--kf-*` namespace exists … Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own."* This component is a dense instance: it contributes **`--ball-tone --ball-p --ball-size --ball-glow --seq-glow --scrub-dir --row-start --row-index --label-col --col-gap --track-inset --tick-p --playhead-p --z-seq-playhead --z-seq-handle --rail-tint`** — sixteen unprefixed names, four of which (`--ball-tone/-size/-glow`, `--rail-tint`) are *shared* with the `design-idioms.css` `.progress-*` idiom consumed by other scenes.

The sharper edge: `@property` is an **at-rule with no selector**, so Vue's scoped-CSS transform cannot attribute-qualify it. Sourcing it from `<style scoped src="./SequenceTarget.css">` (`.vue:252`) registers `--ball-p` **document-globally**, `inherits: true`, typed `<number>`. Today the blast radius is nil (`grep -rn -- "--ball-p" demo/` outside `scenes/sequence/` → 0 hits), so this is latent, not live. But any future consumer of the shared `.progress-ball` idiom that assigns a non-`<number>` `--ball-p` (a `%`, a `var()` chain that fails) hits *invalid at computed-value time* and silently falls back to `0` — a failure mode with no error and no local cause.

**Falsifier** if the build inlines scoped styles through a transform that *does* scope at-rules (it does not — `@property`/`@keyframes` are emitted verbatim by `@vitejs/plugin-vue`), or if `--ball-p` acquires a second author. Neither today.

### D-19 · MINOR · the scrubber eyebrow's stated face is not the face it gets
`SequenceScrubber.vue:9-11,124-129`

The comment specifies *"the instrument-panel micro-cap eyebrow (**Fira Code**, letter-spaced)"* and the CSS adds `text-transform: uppercase; letter-spacing: 0.18em`. The class it uses is **`text-caption`**, which glass-ui binds to `font-family: var(--font-text)` **and `font-style: italic`** (`dist/styles/typography/semantic.css`). The rendered result is an *italic body-face* string, uppercased and tracked to 0.18em — a combination that does none of the three things well: italics fight uppercase, 0.18em tracking is a monospace/caps idiom, and the body face is the one register the "instrument panel" convention is trying to escape. The intended class exists and is used seven lines away: `text-mono-caption` (mono, caption rung, caps, `--type-tracking-caps`) — the timecode on the same row uses it (`:16`).

**Falsifier** compute the eyebrow's `font-family`/`font-style`. If it resolves to Fira Code upright, the claim dies — it cannot, absent a demo override of `.text-caption`, and `grep -rn "text-caption" demo/styles/` shows none.

### D-20 · MINOR · a permanent compositor layer for an element that never transforms
`SequenceTarget.css:215-218` — `.cascade-chase { --seq-glow: 0; will-change: transform; }`

`.cascade-chase` is applied only to `.seq-stage` (`.vue:61`), a ~300×700px container. Nothing ever writes `transform` on it: the transforms in this scene live on `.seq-ball`, `.seq-playhead`, `.scrub-ball` and `.seq-handle` — all of which declare their own `will-change` where appropriate. A standing `will-change: transform` on the container permanently promotes it, creates a stacking context and a containing block for fixed descendants, and does so to buy nothing. The comment justifies the *class* (as the `proof:design-refinement` DOM marker and the `--seq-glow` seam) and never justifies the `will-change`.

**Falsifier** find a rule or a JS write that transforms `.seq-stage` / `.cascade-chase`. The `is-powering-on` animations target `.seq-axis` and `.seq-row`, not the stage (`.css:220-227`).

### D-21 · MINOR · five vertical paddings and six type sizes in one three-band card; the φ claim is decorative
`SequenceTarget.vue:12,55,127` · `SequenceScrubber.vue:7` · `SequenceTarget.css:45,66,74,250-258`

Vertical rhythm across a card of three stacked bands: header `py-2.5` (10px) → storyboard `py-4` (16px) → stage `padding: 0.75rem 1rem 1rem` (12/16) → row-gap `0.55rem` (8.8px) → scrubber `py-3` (12px) → mobile `padding-block: 0.5rem` / row-gap `0.15rem` (2.4px). Seven distinct values, none in a ratio with any other, three of them (`2.5`/`3`/`4`) chosen from Tailwind's step scale with no stated reason to differ.

`.css:95` invokes *"J.W7c φ-ladder (proof:phi-leaf-zero)"* to justify keeping `.seq-row-at` on the token ladder — a good instinct applied to one font-size while the *spacing* around it obeys no ladder at all, and the type scale it defends spans 10 / 11 / 14 / 20 / 36 / 63px, of which only the 20/36 pair (`--type-subheading` 1.272rem, `--type-display-1`) sits on the φ ladder the tokens actually define.

**Falsifier** a spacing token file that maps these to a scale — `styles/layout.css` defines `--rail-width`, `--panel-max-h`, `--mask-fade` and no vertical rhythm scale; the values here are raw Tailwind steps and raw rems.

### D-22 · MINOR · glass conformance — an opaque plate inside a translucent Card
`SequenceTarget.css:50-55`

`.seq-stage`'s background is `linear-gradient(color-mix(in srgb, --ball-tone 5%, var(--background)), … 2% …)`. `color-mix` with an opaque `--background` yields an **opaque** result, so the storyboard — roughly 65% of the card's area — paints a solid plate over the glass surface the `Card` primitive exists to provide. It also reaches for **`--background`** (the *page* neutral, `hsl(40 30% 98%)`) inside a **`--card`** surface (`hsl(30 85% 96%)`), so the framed stage is a measurably different paper (Δ hue 10°, Δ L 2%) from its host with no rationale given.

This sits directly against the demo's own glass posture, which goes to some trouble to *reclaim* translucency: *"the pristine translucent plate (0.50) returns"* (`style.css:195-205`). The stage frame is the right design idea (containment, a bounded time region — see D-1's premise); making it opaque and off-neutral is the wrong execution of it. `--surface-tint-*` (glass-ui ships eleven rungs, `color-mix(--foreground N%, transparent)`) is the token family for a tinted-but-translucent inner plate.

**Falsifier** measure the stage's computed `background-color` alpha. If < 1 (e.g. `--background` resolves to a translucent `light-dark()` arm), the claim dies. `tokens/color-radius.css` defines `--background: var(--neutral-0) = hsl(40 30% 98%)` — opaque.

### D-23 · INFO · the stage's "time grid" is 17.6px tall and misses its own last mark
`SequenceTarget.vue:45-54` · `SequenceAxis.vue:6` · `design-idioms.css:205-211`

The prose promises *"a rounded, master-tinted `.seq-stage` that **OWNS its time grid**"* and `.css:33-35` repeats *"the `.stage-field-x` rules live inside it."* In fact `.stage-field-x` is applied to `.seq-axis` alone — a `height: 1.1rem` (17.6px) strip whose hairlines are drawn *behind the tick labels that sit in the same 17.6px*. No rule descends through the five rows. An instrument that named a grid and then drew it only inside its own ruler has a ruler, not a grid.

Separately, `repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px calc(100% / 4))` places rules at 0/25/50/75% and **not** at 100%, while `AXIS_QUARTERS` labels all five including `1` (`.vue:155`) — the `1600` tick has no rule.

**Falsifier** find a `.stage-field-x` (or equivalent) applied to `.seq-rows`/`.seq-stage`. There is none.

### D-24 · INFO · the 44px handle hit-box crosses two boundaries it should not
`SequenceTarget.css:120-136,163-167`

`width: 44px; margin-left: -22px` centred on the value position means: at `at = 0` the box extends **22px into the label column** (past the 12px `--col-gap`, ~10px over the row label's glyphs); at `at = STAGGER_MAX` it extends **22px past the track's right edge**, clearing the stage's 16px padding and **crossing the `.seq-stage` border** by ~6px. The `:focus-visible` ring is painted on this host (`.css:163-167`) with a `--radius-sm` of its own, so a keyboard user at either extreme sees a focus indicator straddling the frame that is supposed to contain the timeline — and one that is ~7× wider than the 0.4rem grip it indicates.

The 44px choice is well-reasoned in situ (`.css:122-127`: touch floor on the drag axis, height held to the track so stacked rows stay unambiguous). The unhandled consequence is the *overhang at the domain ends*, which no `clamp`/`inset` guards.

**Falsifier** if the Card's `overflow-hidden` clips the overhang invisibly at the right edge (it does not — 22px < the 33px from track edge to card edge) or if the label column is empty (it is not).

### D-25 · INFO · two dead declarations
`SequenceTarget.css:10` + `:216` both declare `--seq-glow: 0`; `.cascade-chase` **is** `.seq-stage`, a descendant of `.seq-target`, so the outer declaration is shadowed for every consumer inside the stage (the playhead, the balls) and reaches nothing else. — `SequencePlayhead.vue:25` declares `grid-column: unset` on a `position: absolute` element, where it is both the initial value and inapplicable.

### D-26 · INFO · one duplicate authority the census flagged, restated against the tree
Folds `lane-frontend.md` **S-4** (AMBER, 162 L): `SequenceScrubber` is a hand-rolled `role="slider"` — rail, ball, pointer projection, four arrow-key branches — where glass-ui ships `Slider` (already imported at `KeyframesEditor.vue:109`, `MatrixEditor.vue:97`, `PlaybackRibbon.vue:92`) and `ScrubberTimeline`. **The tree agrees with the census and raises it**: the *row* handles in `SequenceTarget.vue:96-107` are a **second, independent** hand-rolled slider in the same component — same role, same aria quintet, a near-identical keydown ladder (`:233-243` vs `SequenceScrubber.vue:97-111`) that differs only in step size and clamp. So the scene carries **two** bespoke slider implementations against a shipped primitive, and D-10's missing `aria-valuetext` is duplicated across both. Any S-4 replacement wave should scope both, not just the scrubber.

---

## 4. Checked and clean (claims that died against the tree)

Recorded so the negative space is auditable — each of these looked like a defect and is not.

- **PRM on the power-on boot** — genuinely double-guarded: `useSequenceInstrument.ts:29-32` returns before setting the flag, *and* `SequenceTarget.css:238-243` zeroes the animations, *and* glass-ui's global `a11y-overrides.css` neuters `animation-duration`. Three layers. (The gap is D-4, the reel — not the boot.)
- **Target size (WCAG 2.5.8)** — the handle is 44 × 32px desktop / 44 × 24px mobile; the reel `Button` is `h-7 w-7` = 28 × 28px. All ≥ 24 × 24. (The mobile row is *exactly* at the floor — noted in D-13, not a violation.)
- **Metric reflow** — `.metric__value { min-inline-size: 3ch }` + `tabular-nums` means the 0→100 sweep never shifts the `%` unit or the header layout. Correct consumption of the primitive.
- **Empty / error / loading states** — structurally unreachable: `ROW_COUNT` is a module constant, `rows` is `Array.from({length: 5})`, `progress` is a clamped number, `(p*100).toFixed(0)` is always a non-empty string ⇒ `Metric` never enters `data-empty`/`data-loading`. Nothing here is fetched. No defect.
- **RTL** — the component is physical throughout (`left`, `margin-left`, `translateX`, `right: 50%`), but `grep -rn 'dir="rtl"\|\[dir=\|:dir(' demo/` → **0 hits**: the app never sets a direction and ships no logical-property surface anywhere. Claiming RTL breakage in an LTR-only application would be a false defect. Recorded as an observation, not counted.
- **The typed "reel" egg** — `useTypedTrigger.ts:16-23` correctly skips `INPUT|TEXTAREA|SELECT` and `isContentEditable`, and `useEventListener` scopes teardown. A four-letter global keystroke trigger is still a discoverability/collision question, but it is not a defect: the discoverable twin exists (`.vue:29-37`) and the guard is right.
- **`aria-hidden` on the playhead and axis** — correct in isolation; both are decorative duplicates of state exposed elsewhere. (Only their *interaction* with D-10's unit-less values is a finding.)
- **Pointer plumbing** — `touch-action: none` on the handle (`.css:134`), `pointer-events: none` on the grip so the 44px host owns every tap (`.css:150`), `setPointerCapture` in a `try/catch` for iOS (`useDragScrub.ts:119-123`), and `pointercancel` clearing the global select-suppression token (`:144-147`). This is careful work.
- **`overscroll`/scroll-jacking, `outline: none` without replacement, focus order** — none found. `.seq-handle:focus-visible` replaces the outline with `--focus-ring-shadow` (`.css:163-166`); tab order follows DOM order top-to-bottom.

---

## 5. Superlatives (L-18, running the other way)

### S-1 · `--row-start` — making an invisible *temporal* property legible as *space*, with zero per-frame cost
`SequenceTarget.vue:79-84` · `SequenceTarget.css:183-199`

The scene has to prove `stagger`, a property that by definition is only observable *while time passes*. The solution: push each child's `at:` onto its row as `--row-start = clamp(at / STAGGER_MAX, 0, 1)`, inherit it down to the traveller, and make the ball's rest position a function of it — so the distribution is a **diagonal cascade at `t = 0`**, before anything moves. A user who never presses play still sees what `stagger` means. It costs one custom property per row, no JavaScript, and it composes cleanly with the engine's `--ball-p` in a single `calc()`. This is the best idea in the component and it is a genuinely hard one: making a temporal primitive teach itself statically. (D-2 is a defect in its *arithmetic*, not in this.)

### S-2 · `inv ζ` — four synchronised indicators, exactly one clock
`useSequenceDemo.ts:36-56,178-204,206-249,394-413` · `useSequenceInstrument.ts:5-9`

Five travellers, a master playhead, a scrub ball, a percentage and a timecode all move together, and there is **no demo-owned rAF anywhere**. The engine's own `RAFPlayback` drives the balls; the one reactive mirror rides that same driver and self-terminates on `machine.status.value !== "playing"` (`:188-196`); `suspend`/`resume`/`restore` round-trip through a declared `ScenePlayback` adapter (`:400-413`); `onScopeDispose` stops both (`:447-450`). Even the ignition-cascade "egg" refuses to own a clock — its comment is explicit that the cascade *motion* is the engine's `--ball-p` fan-out and the composable holds only gesture flags (`useSequenceInstrument.ts:5-9`). Components with four moving indicators normally accumulate two or three competing loops and a stale-state bug per loop. This one has one authority and says so at every seam.

### S-3 · compositor-only positioning via `container-type: inline-size` + `translateX(<cqw>)`
`SequenceTarget.css:106-115,190-199` · `SequencePlayhead.vue:32-46` · `SequenceScrubber.vue:33-34,118-121`

Every moving element positions by `transform: translateX(<n>cqw)` against a container-query unit rather than `left: %`. `cqw` resolves against the element's own containment context — the row track for the travellers, the playhead track for the line, the rail for the scrub ball — so each keeps rail-relative geometry while staying on the compositor. Nothing in the storyboard triggers layout on a progress change, at 60fps, across seven independently-positioned elements. `cqw` as the unit that lets you have *both* percentage semantics and transform performance is not an obvious solution, and it is applied consistently at all three sites with the rationale stated once per site (`T.G4`).

### S-4 · the target-size fix that moved the animation **target** instead of deleting the keyframe
`SequenceTarget.vue:108-117,176-182` · `SequenceTarget.css:178-186` · `useSequenceDemo.ts:133-137`

The child animation's `0%` keyframe is `scale: 0.7`. When the engine's target was the *row track*, that keyframe shrank the whole row — dropping the 24px handle to 16.8px and breaking WCAG 2.5.8 **for the duration of every playback**. Two easy wrong fixes were available (drop the `scale` keyframe; hard-code a `min-height`). The fix taken was to **re-point the engine at the ball** (`demo.childAnims[i].setTargets(ballEls[i])`, `.vue:184-188`), which preserves the animation exactly, restores the handle geometry structurally, and — as a bonus — is what the design wanted anyway (the pop should scale the traveller, not its lane). Diagnosing a tap-target regression back to an *animation target choice*, and fixing it at that layer, is rare and correct.

---

## 6. Verdict

**26 defects · 1 blocker · 4 superlatives.**

The component is unusually well-*conceived* and unevenly *executed*. Its three best ideas (S-1, S-2, S-3) are the kind that do not appear by accident, and its documentation of its own past failures (the target-size regression, the φ-ladder discipline, the `inv ζ` posture) is better than most production code. What it lacks is arithmetic closure at the seams: **D-1** (three origins for one axis) and **D-2** (half-ball gate offset) are both failures of the same kind — two formulas for one geometry, each correct alone, never reconciled — and both land squarely on the one thing the scene exists to demonstrate. **D-3** (AA), **D-4** (unguarded decorative motion), **D-5** (no heading), **D-7** (forced-colors), **D-9** and **D-10** (state not announced, values unlabelled) are a coherent second cluster: an instrument built for sighted, motion-tolerant, full-color users, with a11y attended to *locally* (roles, tabindex, focus rings, tap targets — all present and careful) but never *end-to-end*.

Recommended repair order — **D-1 → D-2** first (one `--track-inset` authority consumed by all three riders; one shared `[0, W − ball]` mapping for gate and traveller), then the a11y cluster **D-5/D-10/D-9/D-3**, then **D-6/D-8** (the two clipping failures), then **D-4/D-7** as mode work. **D-16/D-18** are cheap and should ride along with whatever wave lands `lane-frontend.md` **F-1**, since all three are the same untracked-coupling defect at different layers.

Nothing here is livable-only except where marked; the two **UNPROVEN-NEEDS-LIVE** items (the exact subgrid gutter in D-1, the dark-arm ratio in D-3) do not change either verdict — both claims stand on their proven halves.

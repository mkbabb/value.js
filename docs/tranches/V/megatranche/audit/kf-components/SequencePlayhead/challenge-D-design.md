claude-opus-5[1m]

# CHALLENGE · `SequencePlayhead.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequencePlayhead.vue` (87 lines)
**Tree HEAD:** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Every geometric number below is arithmetic over declarations in the tree; every colour number is a hand-computed OkLab→sRGB→WCAG chain with its assumption stated.
**Read whole:** the target + `SequenceTarget.vue` (252) + `SequenceTarget.css` (259) + `SequenceAxis.vue` (49) + `SequenceScrubber.vue` (162) + `useSequenceDemo.ts` (482) + `useSequenceInstrument.ts` (45) + `sequenceKeys.ts` + `demo/styles/style.css` + `demo/styles/design-idioms.css` (`.progress-rail`/`.progress-ball`/`.stage-field-x`) + `@mkbabb/value.js/dist/subpaths/math.d.ts` (`clamp`) + the installed `@mkbabb/glass-ui@7.0.0` `dist/styles/utilities/a11y-overrides.css`, `dist/styles/accessibility.css`, `dist/styles/theme/radius.css`, `dist/components/{timeline,progress}/`.

**Tally: 17 defects · 1 BLOCKER · 4 MAJOR · 7 MINOR · 5 INFO · 5 SUPERLATIVES.**

Posture: assumed defective until the tree proved otherwise. Three suspected defects were **killed by the tree** and are recorded in §KILLED so they are not re-raised downstream.

---

## The geometry the component actually resolves to

Everything in §BLOCKER/§MAJOR rests on one derivation. It is stated once, here, so each finding can be falsified against it independently.

`.seq-playhead-track` is `position: absolute` (`SequencePlayhead.vue:24`) with **`grid-column: unset`** (`:25`) — i.e. `auto` grid placement — inside `.seq-stage`, which is `position: relative; display: grid` (`SequenceTarget.css:41-43`). An abspos box with `auto` grid placement is positioned against its nearest positioned ancestor's **padding box** (CSS 2.1 §10.1; css-grid-1 §9 defers to it for auto-placed abspos children). `.seq-stage` declares `padding: 0.75rem 1rem 1rem` (`SequenceTarget.css:45`).

Let `content-left` / `content-top` be the origin of `.seq-stage`'s content box and `W` its content width. Then, with 1rem = 16px:

| box | declaration | resolved inline start |
|---|---|---|
| `.seq-stage` column 1 (label) | `grid-template-columns: var(--label-col) 1fr` (`SequenceTarget.css:43`), `--label-col: 3.25rem` (`:37`) | `content-left + 0` |
| `.seq-stage` **column gap** | `gap: 0.5rem 0` (`SequenceTarget.css:44`) → row-gap `0.5rem`, **column-gap `0`** | — |
| `.seq-axis` (+ its `.stage-field-x` quarter rules) | `grid-column: 2` (`SequenceAxis.vue:22`) | **`content-left + 3.25rem`** |
| `.seq-playhead-track` | `left: calc(1rem + var(--track-inset))` (`SequencePlayhead.vue:28`), `--track-inset: calc(var(--label-col) + var(--col-gap))` = `4rem` (`SequenceTarget.css:39`) | **`content-left + 4rem`** |

Vertically:

| y (px, from `.seq-stage` padding-box top) | what |
|---|---|
| 12 | content top (`padding-top: 0.75rem`) |
| 12 → 29.6 | `.seq-axis` border box (`height: 1.1rem`, `SequenceAxis.vue:24`) |
| 29.6 → 32 | `.seq-axis` `margin-bottom: 0.15rem` (`SequenceAxis.vue:25`) → grid row 1 margin box = **1.25rem** |
| 32 → 40 | `.seq-stage` **row-gap `0.5rem`** (`SequenceTarget.css:44`) |
| 40 | `.seq-rows` top |
| **32** | `.seq-playhead-track` top — `calc(0.75rem + 1.25rem)` (`SequencePlayhead.vue:26`) |
| **27.34** | `::before` diamond top vertex — un-rotated box `y ∈ [29,37]` (`top:-3px`, `height:8px`, `:56,58`), centre 33, half-diagonal `8·√2/2 = 5.657` |

---

## BLOCKER

### D-1 · The playhead rides a coordinate system 12px right of the ruler that names it — and of the quarter rules painted under it

**Severity: BLOCKER.** *Provenance:* `SequencePlayhead.vue:21-22, 28, 46` · `SequenceTarget.css:37-39, 43-44` · `SequenceAxis.vue:6, 22, 30` · `design-idioms.css:205-211`.

The component's stated contract is at `SequencePlayhead.vue:21-22`:

> `Spans the shared row-track column (inset past the label column) so 'left: %' resolves against the track width — the SAME axis the handles ride.`

The sibling ruler makes the same claim at `SequenceAxis.vue:3-4` ("Spans the SHARED track column (2)"). **They cannot both be true, and the arithmetic says neither is describing the same origin.**

`--track-inset` (`SequenceTarget.css:39`) is `label-col + col-gap = 3.25rem + 0.75rem = 4rem`. But `--col-gap` is **never applied to `.seq-stage`'s own grid** — `SequenceTarget.css:44` sets `gap: 0.5rem 0`, i.e. column-gap **zero**. The 0.75rem gutter exists only one level down, on the `.seq-row` subgrid (`SequenceTarget.css:73`). So the axis, a *direct* `.seq-stage` grid item at `grid-column: 2`, starts at `content-left + 3.25rem`, while the playhead track starts at `content-left + 4rem`.

Both fields end at the same right edge (`right: 1rem` = padding-right = `content-left + W`; axis line 3 = the same). So the two `[0,1]` mappings differ by a linearly tapering offset:

```
Δ(p) = 0.75rem · (1 − p) = 12px · (1 − p)
  p=0.00 → 12px      p=0.50 → 6px
  p=0.25 →  9px      p=0.75 → 3px      p=1.00 → 0px
```

This is not an abstract mismatch. `SequenceAxis.vue:6` carries `class="seq-axis stage-field-x"`, and `.stage-field-x` (`design-idioms.css:205-211`) paints **a literal 1px `var(--border)` rule every 25%** of the axis's width. Those rules are the drawn reference for the master clock. The playhead misses all four of them, by 12/9/6/3px respectively, and lands correctly only at `p = 1`.

Scale of the error against the drawn grid: `.seq-root` is `max-w-3xl` (48rem) with `px-6` (`SequenceTarget.vue:2`), `.seq-storyboard` adds `px-4` (`:55`), `.seq-stage` adds `1rem` each side → `W ≈ 656px`, playhead field ≈ 592px. **12px ≈ 2.0% of the master clock ≈ 39ms of the default 1940ms `Sequence` duration** (`ROW_DURATION 900` + max default `at` 1040, `useSequenceDemo.ts:62,108`). At `p = 0` the offset is **larger than the diamond head is wide** (8·√2 ≈ 11.3px, `:57-58`): the head does not sit on the `0` tick, it sits clear of it.

**Why BLOCKER and not MAJOR.** A playhead has exactly one job — say where on a named grid the clock is. Here the grid is *drawn* (`.stage-field-x`), *labelled* (`SequenceAxis.vue:12`, `Math.round(q * staggerMax)`), and the indicator is systematically off it. The defect is silent (no test, no token binding), self-concealing (it vanishes at `p=1`, the state a casual check lands on after a play-through), and the two comments that would warn a maintainer both assert the opposite. Downgrade to MAJOR only on an explicit owner ruling that a diamond-width origin offset is cosmetic.

**Falsifier.** Measure `getBoundingClientRect().left` of `.seq-axis` and `.seq-playhead-track` in a live mount. If they are equal, this finding dies outright. It also dies if `.seq-stage`'s used `column-gap` is not `0` — but `gap: 0.5rem 0` is unambiguous two-value shorthand and no later rule re-declares it (`grep -n "column-gap\|gap:" SequenceTarget.css` → `:44` stage, `:65` `.seq-rows` row-gap, `:73` `.seq-row` column-gap only).

**Dependent, NOT asserted — UNPROVEN-NEEDS-LIVE.** Whether the playhead matches *the handles* turns on subgrid gutter placement: `.seq-row` is `grid-template-columns: subgrid` with `column-gap: 0.75rem` (`SequenceTarget.css:70-73`) over a parent whose column-gap is `0`. If css-grid-2 places the subgrid gutter *centred* on the parent line, `.seq-track` starts at `3.625rem` and **all three** origins differ (axis −6px, playhead +6px). If the gutter is consumed from track 2 only, `.seq-track` starts at `4rem` and the playhead matches the handles while the axis is the odd one out. I do not assert either; the certain claim above needs neither. Resolve by measuring `.seq-track`'s rect in the SS-13 live pass.

---

## MAJOR

### D-2 · The hardcoded ruler height has **already diverged** — the playhead is 4.8px out on every viewport below 1024px

**Severity: MAJOR.** *Provenance:* `SequencePlayhead.vue:26` · `SequenceAxis.vue:24-25, 43-47` · `SequenceTarget.css:44`.

`SequencePlayhead.vue:26` is `top: calc(0.75rem + 1.25rem); /* frame pad-top + axis ruler height */` — a literal copy of a constant owned by another file. `SequenceAxis.vue` overrides that constant below 1024px:

```
SequenceAxis.vue:43-47   @media (max-width: 1023px) { .seq-axis { height: 0.95rem; margin-bottom: 0; } }
```

Desktop ruler box = `1.1rem + 0.15rem = 1.25rem`. Mobile/tablet = `0.95rem + 0 = 0.95rem`. `SequencePlayhead.vue` has **no media query at all** (`grep -c "@media" SequencePlayhead.vue` → 0). The copy is stale by `0.30rem = 4.8px` on every viewport `< 1024px` — which is every phone and every tablet, and the exact band `SequenceTarget.css:249-258` already treats as a first-class layout case.

Consequence: on mobile `.seq-rows` begins at y = 12 + 15.2 + 8 = 35.2 while the playhead track still begins at y = 32 — and the diamond's top vertex (27.34) now lands at the axis's *bottom edge* (27.2) instead of 2.26px inside it, so the "cap kisses the ruler" read the `::before` exists to produce (`:53`) is lost precisely where the layout is tightest.

Second unbound constant in the same declaration: the comment says `frame pad-top + axis ruler height`, but `.seq-stage` also inserts a **`0.5rem` grid row-gap** between the axis row and `.seq-rows` (`SequenceTarget.css:44`). The arithmetic never accounts for it, so the line overhangs the first row by 8px on desktop and 3.2px on mobile — a third value that drifts on its own axis.

**Falsifier.** Remove `SequenceAxis.vue:43-47`, or add a matching query to `SequencePlayhead.vue`, and the claim dies. It also dies if the two components are never co-mounted below 1024px — they are: `SequenceTarget.vue:66,70` renders both unconditionally, and `SequenceTarget.css:249` proves the sub-1024px band is a live target.

### D-3 · The declared micro-stack is INERT: `container-type` silently inverted the playhead/handle paint order

**Severity: MAJOR.** *Provenance:* `SequencePlayhead.vue:31, 35` · `SequenceTarget.css:20-25, 114, 135, 200, 218`.

`SequenceTarget.css:20-21` states the contract in prose: *"local micro-stack tokens order the absolute siblings"* — `--z-seq-playhead: 1` below `--z-seq-handle: 2` (`:22-23`). The playhead consumes it at `SequencePlayhead.vue:31`; the handle and traveller consume it at `SequenceTarget.css:135` and `:200`. Read at face value: handles and travellers paint **above** the playhead.

They do not. `SequenceTarget.css:114` gives `.seq-track` `container-type: inline-size`. Per css-contain-3, `inline-size` applies **layout containment**; per css-contain-2 §2.2, layout containment makes the element *a containing block for abspos descendants* **and** *creates a stacking context*. `.seq-track` therefore traps `.seq-handle`'s and `.seq-ball`'s `z-index: 2` inside its own context. `.seq-track` itself is `position: relative; z-index: auto` (`SequenceTarget.css:106-115`, `class="seq-track relative"` at `SequenceTarget.vue:91`) → it paints in the z:0 tier of `.seq-stage`'s context. `.seq-playhead-track` sits in that *same* context (`.seq-stage` = `.cascade-chase` is the stacking context, via `will-change: transform`, `SequenceTarget.css:218`) with `z-index: 1` → the positive-z tier.

**Net: the 2px line, the diamond, and the 32px comet trail paint OVER every drag grip and every traveller ball.** The two tokens the codebase declares to order them do nothing; editing either produces no visible change.

The inversion was introduced by the T.G4 `cqw` retrofit (`SequenceTarget.css:111-114`, `SequencePlayhead.vue:32-35`), which added `container-type` for the transform math and took the stacking side-effect along unnoticed — the comments at `:111-113` and `:32-34` discuss only layout cost.

The visual result may even be *preferable* (an After Effects playhead does draw over its layers). That is not the defect. The defect is that a documented ordering contract is dead code and the next maintainer who touches `--z-seq-*` will chase a ghost.

**Falsifier.** Live paint-order inspection: if `.seq-handle` renders above `.seq-playhead` where they overlap, the claim dies. It also dies if `container-type: inline-size` does not create a stacking context in the target browsers — contradicted by css-contain-2 §2.2 and by MDN's `container-type` page, both of which list stacking-context creation explicitly.

### D-4 · "full master red" names a colour the design system deliberately expelled

**Severity: MAJOR.** *Provenance:* `SequencePlayhead.vue:3` · `demo/styles/style.css:130, 155-163`.

`SequencePlayhead.vue:3` — the first substantive line a maintainer reads:

> `the LINE (full master red)`

The token authority says the opposite, in as many words. `style.css:155-162`:

> `── Progress / slider color tokens (the motion-color authority = the VIOLET) ── Every motion surface … reads --color-progress … so red exits the chrome entirely.`

and `style.css:163` → `--color-progress: var(--accent-kf)` → `style.css:130` → `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`. Hand-converted, the light arm is **rgb(126, 90, 216)** — a medium violet, hue 295°, nowhere near red.

The playhead paints `var(--ball-tone, var(--color-progress))` (`:47`), and `--ball-tone` is set to `var(--color-progress)` at `SequenceTarget.css:8`. The line is violet in both themes. This is stale L.W11-era vocabulary that survived the red→violet token migration; the same phrase survives at `SequenceScrubber.vue:134` ("keyed to the master red"), so it is a family defect, not a typo.

Why MAJOR rather than MINOR: this is the one sentence describing what the component *looks like*, in a component with zero user-facing copy, and it is wrong about the single most load-bearing design decision the demo documents. Prose that misidentifies the design system's colour authority actively mis-teaches.

**Falsifier.** Show `--color-progress` resolving to a red hue in either theme, or a `--ball-tone` override reaching `.seq-playhead-track`. Neither exists: the only `--ball-tone` overrides are the per-row `ROW_TONES` set on `.seq-row` (`SequenceTarget.vue:79-83`), and `.seq-playhead-track` is a sibling of `.seq-rows`, not a descendant (`SequenceTarget.vue:70, 74`).

### D-5 · "no per-frame JS" is false — the playhead is the one motion in this scene that *does* round-trip through Vue every frame

**Severity: MAJOR.** *Provenance:* `SequencePlayhead.vue:8, 10` · `SequenceTarget.vue:70` · `useSequenceDemo.ts:32-33, 116-118, 179-204`.

`SequencePlayhead.vue:7-8`:

> `Pure CSS over the engine's 'progress' — no per-frame JS.`

The tree says otherwise, and says it in the composable this component depends on. `useSequenceDemo.ts:180` — `progress.value = clamp(sequence.progress, 0, 1)` — is called from the mirror's `frame()` callback (`:192-197`) on **every engine frame while playing**. `progress` is a Vue `ref` (`:171`). `SequenceTarget.vue:70` passes `demo.progress.value` as a prop, and `SequencePlayhead.vue:10` writes it into an inline `:style` binding. So each frame: ref write → scheduler flush → `SequenceTarget` re-render → `SequencePlayhead` re-render → style patch → CSS custom-property re-parse.

That is precisely the work `useSequenceDemo.ts:32-33` claims the scene avoids:

> `The ENGINE paints the balls directly (the default DOM renderer sets '--ball-p' on each target); there is no per-frame Vue work for the motion.`

True of `.seq-ball`. **False of the playhead** — which is a *second* consumer of what `useSequenceDemo.ts:42-43` scopes as "the ONE reactivity mirror (the master progress read-out)". A read-out is a text node updated at whatever rate the eye tolerates; the playhead promoted it to a 60fps animated graphic on the Vue render path, and then documented itself as the cheap one.

The honest claim is *"no per-frame layout"* — which the `cqw` transform genuinely earns (see L-2). The claim as written is wrong in the one dimension a reader would check.

*Cross-axis rider, not counted here:* `will-change: transform` (`:51`) is unconditional, so the layer stays promoted for the whole session even though the sequence auto-settles (`useSequenceDemo.ts:231-240`). Combined with `.seq-ball` ×5, `.scrub-ball`, and `.cascade-chase` that is 8 permanently promoted layers in one card. Perf lane owns the cost; noted only so it is not lost.

**Falsifier.** Show the engine writing `--playhead-p` directly onto the element (bypassing Vue), or show `progress` not updating per frame. Neither holds: `useSweepScene`'s `frame()` (`useSequenceDemo.ts:192`) runs on the engine's own `RAFPlayback.loop`, and the only writer of `--playhead-p` in the tree is `SequencePlayhead.vue:10` (`grep -rn "playhead-p" demo/` → 2 hits, both in this file).

---

## MINOR

### D-6 · The comet trail escapes the very inset the track declares, washing the row-label column

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue:21-22, 30, 35, 70-85` · `SequenceTarget.css:77-83`.

`.seq-playhead-track` is *defined* as the box that stays clear of the label column (`:21-22`, `left: calc(1rem + var(--track-inset))`). Its `::after` then reaches 32px back past that boundary (`:73-74`, `right: 50%; width: 32px`) with nothing to stop it: `container-type: inline-size` applies layout/style/inline-size containment but **not paint containment**, and no `overflow` is declared on `.seq-playhead-track` or `.seq-playhead`. The first clip is the Card's `overflow-hidden` (`SequenceTarget.vue:8`), ~48px further out.

At `p = 0` the trail spans `[content-left + 32px, content-left + 64px]`, overlapping the right **14–20px** of the right-aligned label column (`SequenceTarget.css:77-83`, `align-items: flex-end`) — i.e. the tail of the `@{{at}}ms` sub-line, which is already the lowest-contrast text on the plate (`opacity: 0.8` on `text-muted-foreground`, `SequenceTarget.css:100-103`). Alpha over that band, from `linear-gradient(to left, color-mix(… calc(28% + glow·32%) …), transparent)` × `opacity: calc(0.5 + glow·0.5)` (`:79-84`): **≈6% at rest, ≈26% while scrubbing** — and scrubbing is exactly when the user is reading those `at:` values.

Not a contrast *failure* (the wash is a tint over text, not a background swap of the text's own contrast pair), but it is a decorative layer crossing into an informational region the component's own comment says it stays out of. `pointer-events: none` (`:85`) keeps it interaction-safe.

**Falsifier.** Any `overflow: hidden`/`clip` on `.seq-playhead-track`, or a live measurement showing the trail terminating at the track's left edge. Neither is declared.

### D-7 · The bevel is theme-blind: computed light-mode contrast ≈ **1.35:1**, so the "machined" read exists only in dark mode

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue:53, 63-64` · `SequenceTarget.css:47-55` · `style.css:130`.

`:63-64` mixes toward a **hardcoded `white`** — the only untokenized colour in the file; every other colour routes through `--ball-tone` / `--color-progress`.

Computed (light arm, `--color-progress` = `oklch(0.56 0.17 295)` = rgb(126, 90, 216); OkLab→linear-sRGB→gamma by hand):

| surface | sRGB | rel. luminance |
|---|---|---|
| bevel `color-mix(in srgb, tone 30%, white)` | rgb(216, 206, 243) | 0.652 |
| stage plate `color-mix(in srgb, tone 5%, --background)` (`SequenceTarget.css:51-55`) | ≈ rgb(244, 242, 250) | 0.896 |
| diamond body `var(--ball-tone)` (`:62`) | rgb(126, 90, 216) | 0.167 |

- **bevel vs plate = 1.35:1** — invisible.
- diamond body vs plate = **4.36:1** — comfortably over the 3:1 non-text floor, so no WCAG 1.4.11 exposure.

So the two `border-*` declarations at `:63-64`, and the "lighter bevel (AE cap)" the comment at `:53` promises, are dead paint in light mode. In dark mode (`--card: hsl(26 22% 17%)`) the same pale rim reads strongly — the affordance is real in exactly one of the two supported themes, and the file gives no signal that this is intentional.

**Falsifier.** Resolve `--background` (= `--neutral-0`) to something darker than ~rgb(230,230,235) in light mode and the ratio climbs. The conclusion is robust across the plausible range: at rgb(240,240,242) the ratio is still ≈1.28:1. Kill the finding by producing a light `--neutral-0` below luminance ~0.5, or by an owner ruling that a dark-mode-only bevel is intended — in which case `white` still wants to be `light-dark()`.

### D-8 · No PRM opt-out for the motion-amplifying decorations, and the glass blanket rule does not reach them

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue` (no `@media`) · `glass-ui@7.0.0 dist/styles/utilities/a11y-overrides.css` · `SequenceTarget.css:237-243` · `useSequenceInstrument.ts:29-32`.

The **position sweep is essential motion** — it is the clock — and correctly carries no PRM guard. That part is right and I do not challenge it.

What is not essential is the **32px smear** and the **glow bloom**, both of which exist to make the motion read *bigger* (`:67-69`, `:49-50`). Neither has an opt-out, and the delegation a reader might assume does not cover them: glass-ui's blanket rule is

```
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important; transition-property: opacity, color, background-color, border-color, box-shadow !important; }
}
```

— it neutralises `animation` and `transition` only. A `transform` driven by a changing custom property is neither. **The full comet survives `prefers-reduced-motion: reduce` intact.**

The scene demonstrably knows how to do this: `SequenceTarget.css:237-243` PRM-kills the power-on boot, and `useSequenceInstrument.ts:29-32` PRM-gates it in JS. The playhead is the one sub-unit in the cluster with neither. A one-rule fix (`@media (prefers-reduced-motion: reduce) { .seq-playhead::after { display: none } }`) would keep the essential indicator and drop the amplifier.

**Falsifier.** A PRM rule elsewhere that reaches `.seq-playhead::after` — `grep -rn "prefers-reduced-motion" demo/` returns 13 sites (census §6.5) and none is in `scenes/sequence/SequencePlayhead.vue`; the two sequence sites (`SequenceTarget.css:238`, `useSequenceInstrument.ts:31`) both scope to the boot. Also dies on an owner ruling that a trailing smear is essential to reading the playhead.

### D-9 · `--z-seq-*` shadows the single-sourced `--z-*` scale with off-scale ad-hoc integers

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue:31` · `SequenceTarget.css:20-25` · `style.css:20-39` · census `lane-frontend.md` §6.3.

`style.css:21` declares the law: *"The demo's stacking order is single-sourced from glass-ui's `--z-*` scale"*, enumerating `--z-behind` −10 → `--z-modal` 140 and forbidding raw `z-[N]` brackets. `--z-seq-playhead: 1` / `--z-seq-handle: 2` (`SequenceTarget.css:22-23`) wear that exact prefix while being neither from the scale nor on it (1 and 2 fall between `--z-behind` and `--z-content`). A reader who greps `--z-` to audit stacking gets two false members.

This is the flat-namespace hazard the census names concretely: `lane-frontend.md` §6.3 records **0 `--kf-*` tokens** against **98 unprefixed demo custom properties** sharing a global namespace with glass-ui's. `--z-seq-*` is that hazard aimed at the one namespace the demo explicitly declared governed.

**Falsifier.** A `--z-seq-*` entry in glass-ui's `dist/styles/tokens.css` scale, or a `style.css` amendment sanctioning local sub-scale members. Neither exists.

### D-10 · Four of five geometric couplings to the parent are hardcoded literals; the fifth is a token — and the pattern has already failed once

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue:26-29` · `SequenceTarget.css:39, 45`.

`.seq-stage { padding: 0.75rem 1rem 1rem; }` is re-typed four times across a component boundary: `top: calc(0.75rem + …)`, `left: calc(1rem + …)`, `right: 1rem`, `bottom: 1rem` (`:26-29`). The one coupling that *is* tokenized — `--track-inset` — proves the author knew the idiom and applied it selectively.

Currently correct, so this is a latent coupling rather than a live break — except that the identical pattern has *already* broken on the fifth constant (D-2). Any edit to `.seq-stage`'s padding silently detunes the playhead with no test, no type, and no cascade error.

**Falsifier.** A test or lint that binds these to `.seq-stage`'s padding. `grep -rn "seq-playhead" demo/ test/` finds no test referencing the class.

### D-11 · `--playhead-p` is an unregistered, unnamespaced global whose only failure mode is silent

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue:10, 46` · `SequenceTarget.css:13-18` · `value.js dist/subpaths/math.d.ts:1`.

The component *authors* a new custom property into the flat global namespace (`--playhead-p`, `:10`) and, unlike its direct sibling `--ball-p` — which `SequenceTarget.css:14-18` registers with `@property { syntax: "<number>"; inherits: true; initial-value: 0 }` for exactly this class of reason — leaves it unregistered. Consequences:

- No type. `clamp(value, min, max): number` (`math.d.ts:1`) does no runtime guarding; if `progress` ever arrives non-numeric the result is `NaN`, `--playhead-p: NaN` substitutes into `calc(NaN * 100cqw - 50%)`, the declaration is invalid at computed-value time, and `transform` falls back to its initial `none` — **the playhead silently snaps to x = 0** rather than erroring. `defineProps<{ progress: number }>()` (`:17`) is compile-time only; the prop has no default and no validator.
- No `initial-value`, so the `var(--playhead-p, 0)` fallback at `:46` is the only floor.
- Asymmetric with the sibling it is designed to sit beside, with no comment explaining the difference.

The NaN path is not currently reachable — `useSequenceDemo.ts:180` clamps a numeric `sequence.progress` — so this is exposure, not a live bug, and it is graded accordingly.

**Falsifier.** Add `@property --playhead-p` and the exposure closes. Show a runtime guard on `progress` and the NaN limb dies.

### D-12 · `--seq-glow` hard-steps 0→1 where the prose promises a brighten

**Severity: MINOR.** *Provenance:* `SequencePlayhead.vue:5, 49-50, 68-69, 84` · `SequenceTarget.css:10, 13-18, 28-29` · `useSequenceInstrument.ts:19-21`.

`:5` and `:68-69` describe a **COMET TRAIL that "brightens with `--seq-glow` while scrubbing"**. `--seq-glow` is a binary: `0` at rest (`SequenceTarget.css:10, 216`), `1` under `.is-scrubbing` (`:29`), toggled by a boolean ref on pointerdown/pointerup (`useSequenceInstrument.ts:19-21`, `SequenceScrubber.vue:84-92`). It is **not** `@property`-registered (only `--ball-p` is, `SequenceTarget.css:14-18`) and **no `transition` is declared** on `.seq-playhead`'s `box-shadow` or on `::after`'s `opacity`.

Unregistered custom properties are not interpolable, and with no transition there is nothing to interpolate anyway. So the box-shadow blur jumps 2px→10px and the trail opacity jumps 0.5→1.0 **in a single frame** on pointerdown. The instrument's whole conceit — a well that "runs hotter when you conduct" (`useSequenceInstrument.ts:11`) — lands as a light switch.

The fix is one declaration and would survive PRM: glass-ui's blanket rule permits `box-shadow` and `opacity` transitions at 0.1s (see D-8), so a `transition: box-shadow 120ms ease, opacity 120ms ease` degrades gracefully rather than being suppressed.

**Falsifier.** A `transition` reaching these properties, or an `@property --seq-glow` registration plus an animation. `grep -n "transition" SequencePlayhead.vue` → 0 hits; `grep -n "@property" SequenceTarget.css` → `:14` only.

---

## INFO

### D-13 · `grid-column: unset` (`:25`) is a dead declaration

Nothing in the cascade sets `grid-column` on `.seq-playhead-track` (`grep -n "grid-column" SequenceTarget.css` → `:60, 68, 107` — `.seq-rows`, `.seq-row`, `.seq-track`; `SequenceAxis.vue:22` — `.seq-axis`). `grid-column` is not inherited, so `unset` = `initial` = `auto`, which is what it already is. It reads as a guard against a rule that does not exist. *Charitable reading:* it documents the load-bearing fact that the placement must stay `auto` so the containing block remains `.seq-stage`'s padding box (§Geometry). If that is the intent, it belongs in the comment, not in a no-op declaration. *Falsifier:* any selector matching this element and setting `grid-column`.

### D-14 · Fallback discipline is exactly inverted

Six `var(--ball-tone, var(--color-progress))` fallbacks (`:47, 50, 62, 63, 64, 81`) **can never fire** — `.seq-target` unconditionally defines `--ball-tone` (`SequenceTarget.css:8`) and the only overrides are per-row on `.seq-row`, which is not an ancestor of this component (`SequenceTarget.vue:70` vs `:74-84`). Meanwhile the two vars whose absence would silently break the component carry **no** fallback: `var(--track-inset)` (`:28`) → invalid `left` → `auto` → the track detaches from the label column; `var(--z-seq-playhead)` (`:31`) → `z-index: auto` → D-3's ordering changes again. Cheap insurance is spent where it cannot pay and withheld where it would. *Falsifier:* a mount path placing `SequencePlayhead` outside `.seq-target` — `grep -rn "SequencePlayhead" demo/` → 2 hits, both `SequenceTarget.vue`.

### D-15 · RTL — direction-blind, but codebase-consistent

Every inset and offset is physical: `left`/`right` (`:28-29, 44, 59, 73`), `translateX` (`:46, 61`), `right: 50%`, `transform-origin: right center` (`:73, 77`). Under `dir="rtl"` the label column moves to the right edge while `--track-inset` still insets from the left, the sweep still runs left→right, and the comet still trails left. **Not scored as a local defect:** `grep -rn "dir=\|rtl\|inset-inline\|inline-start" demo/` returns zero `dir` attributes and 5 incidental logical-property sites in the entire demo. This is a project-level posture, and this component is faithful to it. Raise at the tranche level or not at all.

### D-16 · forced-colors — zero handling anywhere in the demo; **mitigated here by the component's own a11y posture**

`grep -rn "forced-colors\|-ms-high-contrast" demo/` → **0 hits**, tree-wide. Under `forced-colors: active` the UA forces `background-color` to system colours and drops `box-shadow`, so the 2px line and the diamond flatten into the plate and the glow disappears; the `::after` gradient (a `background-image`) survives as an orphan smear. glass-ui's forced-colors block (`dist/styles/utilities/a11y-overrides.css`) covers focus rings and `.glass-dock`/`.hairline-accent` borders only — nothing reaches here.

**This is not a WCAG failure, and that is the component's own doing:** the playhead is `aria-hidden="true"` (`:9`) and its value is carried by an accessible `Metric label="progress"` (`SequenceTarget.vue:18-24`) and by the scrubber's `role="slider" aria-valuenow` (`SequenceScrubber.vue:22-27`). Nothing is lost when the graphic vanishes. Recorded as INFO so the tranche-level forced-colors sweep has the datum, not as a charge against this file. *Falsifier:* a forced-colors rule reaching `.seq-playhead*` — none exists.

### D-17 · Contradicts census `lane-frontend.md` §5: this component is a glass-ui shadow candidate the tally files as "no counterpart"

`lane-frontend.md:398` lists "axis/playhead" under **"Bespoke, no glass counterpart"**, while `lane-frontend.md:342` files `TimelineCaret.vue` (70 lines, described there as "hand-rolled playhead caret") as **S-3 / evaluate** against `ScrubberTimeline` + `geometry`. Same primitive, two verdicts, in the same table.

The tree supports the S-3 side. The installed glass-ui 7.0.0 ships, unimported (census §3.1 confirms `/timeline` and `/progress` are both in the unreached 52):

```
node_modules/@mkbabb/glass-ui/dist/components/timeline/ScrubberTimeline.vue.d.ts
node_modules/@mkbabb/glass-ui/dist/components/timeline/geometry.d.ts
node_modules/@mkbabb/glass-ui/dist/components/progress/Progress.vue.d.ts
```

`geometry.d.ts` is precisely the module that would own the `p → x` mapping that D-1 gets wrong twice over. **Recommendation for the replacement wave:** move `SequencePlayhead` (and `SequenceAxis`, which shares the broken origin) from "no counterpart" into the S-3/S-4 evaluate bucket — the case for delegating the *geometry* (not the phosphor styling, which is legitimately demo-owned) is now evidenced by a live misregistration defect, not just by line count. Blocked behind census **F-1** (glass-ui undeclared in `package.json`/lockfile) like every other shadow item.

*Falsifier:* show `ScrubberTimeline`/`geometry` cannot express a percent-positioned caret over a container-query-sized rail — undecidable from `.d.ts` alone, so this is a **recommendation, not a verdict**. Marked UNPROVEN-NEEDS-LIVE for the wave that opens the primitive.

---

## SUPERLATIVES (L-18 runs both ways)

### L-1 · `aria-hidden="true"` is not just correct — it is **earned**

`:9`. Hand-rolled playheads almost always land in one of two failure modes: expose a `div` with no role and let the screen reader announce nothing useful, or hide the value with no accessible equivalent. This component does neither. It suppresses itself *and* the tree proves the value survives in two accessible forms — `Metric size="xl" label="progress"` at `SequenceTarget.vue:18-24` and `role="slider"` with live `aria-valuenow`/`aria-valuemin`/`aria-valuemax` at `SequenceScrubber.vue:22-27`. Decorative-graphic suppression *with* a demonstrated equivalent is the textbook-correct answer and is rare in hand-rolled instrument chrome. It is also what makes D-16 an INFO instead of a MAJOR — this decision is doing real work.

*Falsifier (L-18):* remove the `Metric` or the scrubber's `aria-value*` and this becomes a WCAG 1.1.1/4.1.2 gap, not a superlative.

### L-2 · The sweep transform is genuinely excellent engineering

`:46` — `transform: translateX(calc(var(--playhead-p, 0) * 100cqw - 50%))`. One declaration does three jobs: `cqw` resolves the percent-of-track against the container established at `:35`, so the mapping is rail-relative with no JS measurement; `- 50%` self-centres against the line's own 2px width without a magic `-1px`; and the whole thing is a transform, so no `left` layout runs per frame. The pattern generalises (the same idiom is applied consistently at `SequenceTarget.css:194-199` and `SequenceScrubber.vue:34`) and is documented at the point of use (`:41-43`). The *comment above it* overclaims (D-5) — the **code** does not.

*Falsifier (L-18):* if `cqw` resolved against the wrong axis or the container were not `inline-size`, the centring would be wrong. `:35` declares it; the axis is correct.

### L-3 · The drag-back direction flip is one declaration and zero branches

`:77-78` — `transform-origin: right center; transform: scaleX(var(--scrub-dir, 1))`. Reversing which side the streak trails on is the kind of thing that normally grows a JS branch, a second class, or a mirrored gradient. Here the anchor point is chosen so a sign flip on an inherited number does the whole job, and the gradient mirrors for free. `useSequenceInstrument.ts:22` (`dir < 0 ? -1 : 1`) keeps the value strictly ±1 so `scaleX(0)` is unreachable — the one failure mode this idiom has, closed at the source.

*Falsifier (L-18):* a `setScrubDir(0)` path would collapse the trail. `useSequenceInstrument.ts:22` normalises; no other writer exists (`grep -rn "setScrubDir" demo/` → 2 hits).

### L-4 · The diamond's transform order is exactly right

`:61` — `translateX(-50%) rotate(45deg)`. Transform functions apply left-to-right against the element's own coordinate system, so the translate resolves against the **un-rotated** 8px box (a clean −4px) and the rotation then happens about an already-centred origin. The common error — `rotate(45deg) translateX(-50%)`, which translates along the rotated axis and throws the head off the line by `4·√2 ≈ 5.7px` diagonally — is avoided. The resulting centre sits at exactly `line-left + 1px`, the true centre of the 2px line. Small, and correct on the first read.

*Falsifier (L-18):* compute the composed matrix; if the head is off-centre the claim dies. It is not.

### L-5 · Real restraint at the size where most codebases lose it

Three distinct visual layers (line, machined head, comet) from **one element and two pseudo-elements**, four lines of template, one JS import, no wrapper divs, no per-layer sub-component, no animation library, no rAF. `.seq-playhead::after`'s `pointer-events: none` (`:85`) and the track's (`:30`) mean the whole decorative stack is interaction-transparent by construction rather than by patch. 87 lines total including 30 of comment. The defects above are failures of *coupling and prose*, not of over-engineering — the component is the right size and the right shape, which is precisely why the misregistration in D-1 is worth fixing rather than replacing.

*Falsifier (L-18):* a simpler formulation delivering the same three layers. I did not find one.

---

## KILLED — suspected defects the tree disproved (do not re-raise)

| # | Suspicion | Why it died |
|---|---|---|
| K-1 | `border-radius: var(--radius-pill)` (`:48`) has no fallback and `--radius-pill` looked undefined in `demo/styles/` → square line caps. | **Defined by glass-ui**: `node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css` → `--radius-pill: 9999px`, reached via `style.css:3` `@import "@mkbabb/glass-ui/styles"`. Rounded caps resolve. (`SpringHeatmap.vue:321` writes `var(--radius-pill, 9999px)` — a redundant fallback, not evidence of absence.) |
| K-2 | The playhead's position sweep lacks a `prefers-reduced-motion` guard → PRM violation. | The sweep **is** the clock — essential motion under WCAG 2.3.3 / the PRM contract. No guard is correct. Only the amplifying decorations are chargeable, and they are scored narrowly at D-8. |
| K-3 | Off-token colour usage throughout, per the flat-namespace hazard. | False except for the single `white` at `:63-64` (D-7). All five other colour sites route through `--ball-tone` → `--color-progress` → `--accent-kf`, and the `color-mix` percentages are parameterised by `--seq-glow` rather than hardcoded per state. Token discipline here is above the demo's average. |

---

## Provenance

Every file cited was read whole and read-only. **No file in `/Users/mkbabb/Programming/keyframes.js` or `/Users/mkbabb/Programming/glass-ui` was written, mutated, or executed**; no installs, no dev servers, no browser tooling. glass-ui claims are sourced from the copy already installed at `keyframes.js/node_modules/@mkbabb/glass-ui` (7.0.0), so every recommendation is reachable without an upgrade. Colour arithmetic (D-4, D-7) is a hand-computed OkLab → linear-sRGB → sRGB → WCAG relative-luminance chain from the token values at `style.css:130` and `glass-ui dist/styles/theme/*`; the one estimated input (`--background` = `--neutral-0`) is stated with its sensitivity range. Census overlaps are cited by id: **F-1** (D-17), **§5 / S-3 / S-4** (D-17), **§6.3** (D-9, D-11), **§6.5** (D-8). The only census **contradiction** is D-17.

The single write performed by this lane is this file.

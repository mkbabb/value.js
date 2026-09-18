claude-opus-5[1m]

# CHALLENGE · `PlaybackRibbon.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/playback/PlaybackRibbon.vue` (245 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every colour number below is *computed* from the token graph (script: `scratchpad/contrast.py`), not eyeballed.
**Read whole:** the target + `AnimationVisualizer.vue` (256) + `transport/composables/useDragCapture.ts` (70) + `styles/playback-idiom.css` (87) + `styles/design-idioms.css` (300) + `styles/style.css` (294) + `styles/layout.css` (visualizer gutter) + the installed producer surfaces it consumes (`node_modules/@mkbabb/glass-ui/dist/`: `components/slider/{Slider.vue.d.ts,types.d.ts}`, `slider-DDia69Fy.js`, `components/button/{Button.vue.d.ts,styles.css}`, `button-B7c944jy.js`, `styles/{tokens,theme,accessibility,transitions,utilities/a11y-overrides,glass/liquid-fill,utilities/base}.css`, `glass-ui.css`) + `@lucide/vue` `arrow-left-right`.
**Mount sites read:** `ChannelOptions.vue:377–400` (teleport → `#controls-ribbon-target`), `RibbonBar.vue:1–20,135` (host plate `<Card cartoon tier="quiet">` / `CardContent p-3`), `SpringScene.vue:108–121`, `EasingScene.vue:94–110`.

**Tally: 25 defects · 3 BLOCKER · 6 superlatives.**

---

## 0. Headline

The ribbon's job is to show *where in time you are* and let you move there. Measured against the tree, **it does neither legibly**: the primitive it drives renders no visible thumb in the variant it uses, and the only remaining position cue — the fill/track boundary — measures **1.23:1** (light) / **1.30:1** (dark) where WCAG 1.4.11 asks 3:1. The 15-line `<style>` block that claims to fix the colour feeds a variable the standard variant never reads, so the component that the codebase designates *the* motion-colour authority paints **zero** of its authority colour on its own rail.

Around that, the file's dominant failure mode is **declarations that cannot act** — six of them — each buried under a comment asserting the opposite. The a11y seams the producer explicitly exposes (`aria-label`/`aria-describedby` passthrough on `Slider`, the `disabled` prop, `size="lg"`) are all present and all unused, while the demo hand-rolls worse versions of two of them.

| # | Finding | Sev |
|---|---|---|
| D-1 | Scrub slider has **no accessible name**; the primitive's naming seam is unused | **BLOCKER** |
| D-2 | **No visible playhead**: standard thumb is `opacity:0;width:0`; fill/track boundary = 1.23–1.38:1 | **BLOCKER** |
| D-3 | `.btn-playback:focus-visible{outline:none}` defeats glass-ui's forced-colors focus remedy | **BLOCKER** |
| D-4 | `--slider-thumb-bg` (×2) is spectrum-only ⇒ dead; "track + thumb paint the SAME violet" is false | MAJOR |
| D-5 | Tooltip bound to a non-focusable `<div>` — keyboard/AT never receive it | MAJOR |
| D-6 | `.is-disabled` is visual-only; thumb stays tab-focusable and arrow-operable | MAJOR |
| D-7 | `:deep()` track-height hack reimplements `size="lg"` — and lands a worse proportion | MAJOR |
| D-8 | Reverse pressed tint = 1.21–1.31:1 against its surface | MAJOR |
| D-9 | `scale-x-[-1]` on a 180°-symmetric glyph: the icon says the same thing in both states | MAJOR |
| D-10 | Play/Pause label 3.58:1 (light) / 4.02:1 (dark-on-card) — under the 4.5:1 AA floor | MAJOR |
| D-11 | `.touch-gate-target` / `.touch-gate-active` undefined everywhere ⇒ swallowed first tap is silent | MAJOR |
| D-12 | Slider focus ring is box-shadow-only ⇒ erased under forced-colors | MAJOR |
| D-13 | `--type-body` on a control; glass-ui's control rung is `--control-text` | MINOR |
| D-14 | `.btn-interactive` undefined (6 demo call-sites, 0 definitions) | MINOR |
| D-15 | Dual pressed-state authority, disagreeing (10%/40% vs 15%/30%) | MINOR |
| D-16 | **Both** height declarations dead; an 8-line comment justifies the deader one | MINOR |
| D-17 | Icon-size mismatch inside one two-cell row (20px vs 24px) | MINOR |
| D-18 | Press squish specificity-shadowed by hover ⇒ never lands on a mouse press | MINOR |
| D-19 | `.timeline-green` names a green retired at T.D7 | MINOR |
| D-20 | Four stale/false prose claims, two of them self-contradicting within the file | MINOR |
| D-21 | Flat 8px rhythm — proximity encodes no grouping | MINOR |
| D-22 | Two playheads for one `t`, off by 24px at t=0 and 8px at t=1 | MINOR |
| D-23 | `source` prop has zero consumers; the empty state is unreachable | INFO |
| D-24 | Zero authored RTL / loading / error handling | INFO |
| D-25 | 63 of 245 lines (26%) are tranche-changelog narration | INFO |

**Hitherto corpus:** this challenge *extends* `lane-frontend.md` §3.4 ("the demo does reach *around* glass-ui at the CSS layer … a soft coupling to glass-ui's internal render tree, but not an import-boundary breach") — D-7 shows the coupling is not merely soft, it is **load-bearing and lands a regression**; and §6.3's "98 unprefixed demo custom properties sharing a global namespace" — D-4/D-15 are that hazard firing, in the *producer's* namespace rather than the demo's. It **does not contradict** any lane finding. `lane-frontend.md` §4 lists `PlaybackRibbon.vue` as a clean glass consumer (`G`); at the import boundary that is correct — every defect below is at the **CSS/contract** boundary the census explicitly bracketed.

---

## 1. BLOCKERS

### D-1 · The scrub slider has no accessible name — **BLOCKER**

`PlaybackRibbon.vue:15–22`

```
<Slider ref="sliderRef" class="p-2" :min="0" :max="effectiveDuration"
        :model-value="[currentT]" @update:model-value="…" />
```

No `aria-label`, no `aria-labelledby`. The rendered node is reka's `SliderThumb` — `role="slider"`, `tabindex=0` — so a screen reader announces *"slider, 4820"* with no indication of what it controls or what the number means.

This is not a producer gap. glass-ui's `Slider` ships an explicit naming passthrough (`slider-DDia69Fy.js`, thumb vnode):

```
"aria-label":       e.$attrs["aria-label"]       ?? void 0,
"aria-labelledby":  e.$attrs["aria-labelledby"]  ?? void 0,
"aria-describedby": e.$attrs["aria-describedby"] ?? void 0,
```

Three purpose-built seams, all unused. It compounds with D-5 (the tooltip text that *would* have been the description never reaches the AT tree) and with `AnimationVisualizer.vue:2–7`, which correctly `aria-hidden`s the visual twin on the reasoning that "**the `<Slider>` is it**" — the whole a11y story for playhead scrubbing is deliberately funnelled into one node, and that node is anonymous.

**Falsifier:** an ancestor supplying an accessible name via `aria-labelledby`/`<label>` that reaches the thumb (grep of all three mount sites — `ChannelOptions.vue:377–400`, `SpringScene.vue:108–121`, `EasingScene.vue:94–110` — shows no `aria-*` passed to `<PlaybackRibbon>` and no wrapping label); or a reka version that derives a name from the surrounding text.

---

### D-2 · There is no visible playhead — **BLOCKER**

Two independent findings compose into one:

**(a) The thumb is invisible.** The component renders `<Slider>` with no `variant`, so `variant` defaults to `"standard"` (`slider-DDia69Fy.js`: `variant: { default: "standard" }`) — confirmed by the component's own selector at `PlaybackRibbon.vue:238`, which targets `[data-variant="standard"]`. In `glass-ui.css`, the standard thumb is:

```
.slider-thumb[data-v-1ba39eb5]{ width:0; height:var(--slider-track-height,.375rem);
                                opacity:0; box-shadow:none; background:0 0; border:none; }
```

Every visible-thumb rule is `[data-variant=spectrum]`-gated. So position is carried **only** by the range/track boundary.

**(b) That boundary is below every non-text-contrast floor.** From `PlaybackRibbon.vue:231–232`:

```
--slider-track-bg: color-mix(in srgb, var(--color-slider-track) 22%, transparent);
--slider-range-bg: color-mix(in srgb, var(--color-slider-track) 45%, transparent);
```

`--color-slider-track` = `color-mix(in srgb, var(--foreground) 35%, var(--border))` (`style.css:164–168`). The range is painted through `.glass-liquid-fill`, which further mixes the tint at `--liquid-fill-strength: 88%` (`styles/glass/liquid-fill.css`), so effective α ≈ 0.396 vs the track's 0.22 — *the same hue at two alphas*.

| theme | substrate | track | range | **range/track** |
|---|---|---|---|---|
| light | `--card` `rgb(253,245,236)` | `rgb(228,219,209)` | `rgb(208,198,187)` | **1.23:1** |
| light | `--background` `rgb(251,250,248)` | `rgb(227,223,218)` | `rgb(207,201,194)` | **1.24:1** |
| dark | `--card` `rgb(53,42,34)` | `rgb(74,63,54)` | `rgb(90,80,70)` | **1.30:1** |
| dark | `--background` `rgb(11,10,9)` | `rgb(41,38,35)` | `rgb(65,60,56)` | **1.38:1** |

WCAG 2.1 SC 1.4.11 requires **3:1** for the parts of a graphical object needed to understand it and for the visual state of a UI component. The measured range is **2.2–2.4× short** in every theme × substrate combination. Under `.is-disabled` (`style.css:249–252`, `opacity:0.5`) it degrades to **1.10:1 / 1.13:1** — indistinguishable.

The host plate is `<Card cartoon tier="quiet">` (`RibbonBar.vue:3`), whose composite sits between `--card` and `--background`; both bounds are tabulated, so the conclusion is substrate-independent.

**Falsifier:** a rule elsewhere painting a distinct playhead marker on this slider (grep for `slider-mark` — `marks` is not passed, so `.slider-marks` never renders); or a producer change making the standard thumb visible; or a live measurement of the composited pixels showing ≥3:1 (which would require the `.glass-material-rim` 0.5px rim or the `--surface-tint-8` 1px ring to be carrying the boundary — both are sub-pixel hairlines at ≤8% and cannot).

---

### D-3 · The transport buttons lose their focus indicator under forced-colors — **BLOCKER**

`styles/playback-idiom.css:72–75`

```
.btn-playback:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }
```

glass-ui's `Button` already stamps `.focus-ring` on its root (`button-B7c944jy.js`: `e("button tap-squish focus-ring", …)`), and glass-ui already ships the forced-colors remedy for exactly this — `styles/utilities/a11y-overrides.css`:

```
@media (forced-colors: active) { .focus-ring:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px; } }
```

Both rules are **unlayered** (`accessibility.css` is imported by `styles/index.css` *without* a `layer()` clause) and both are specificity `(0,2,0)`. Ties break on source order, and `playback-idiom.css` is imported later — `style.css:3` (glass-ui) → `style.css:14` (`design-idioms.css`) → `design-idioms.css:6` (`playback-idiom.css`). So **`outline: none` wins, inside the forced-colors block too** (media queries add no specificity).

Forced-colors mode zeroes `box-shadow`. Result: `box-shadow` → none, `outline` → none ⇒ **Play and Reverse have no focus indicator at all** for a forced-colors user. WCAG 2.4.7 / 2.4.11 failure, authored entirely on the demo side, over a producer fix that was already in the cascade.

The rule is also **wholly redundant in normal mode** — `.focus-ring:focus-visible` in `design-idioms.css:76–79` declares the byte-identical pair, and the primitive already carries the class. Deleting `playback-idiom.css:72–75` fixes the blocker and loses nothing.

**Falsifier:** a browser in forced-colors mode showing a ring on `.btn-playback` (would mean a UA default outline survives `outline-style:none`, which it does not); or a rule I missed raising `.focus-ring:focus-visible`'s weight above `(0,2,0)` — `grep -n "focus-ring" node_modules/@mkbabb/glass-ui/dist/styles/**/*.css` returns only the two sites cited.

---

## 2. MAJOR

### D-4 · The violet never reaches the rail; two declarations are dead

`PlaybackRibbon.vue:213–216` states the design intent:

> "so the track + thumb paint the SAME violet the AnimationVisualizer's ball/dashed-twin draws — ONE motion-color identity"

Against 7.0.0 that is false in both halves. `--slider-thumb-bg` is read **only** by `.glass-slider[data-variant=spectrum] .slider-thumb` (`glass-ui.css`), so both:

- `PlaybackRibbon.vue:233` `--slider-thumb-bg: var(--color-progress);`
- `PlaybackRibbon.vue:241–243` `.timeline-green:hover { --slider-thumb-bg: color-mix(…) }`

are **inert** on the standard variant the same file's line 238 pins. And the *track* half was re-pointed at `--color-slider-track`, a deliberately **neutral** foreground/border mix (`style.css:164–168`, "rails are substrate, not signal"). Net: the ribbon's scrub rail paints **no `--color-progress` at all**, while `AnimationVisualizer.vue:15,21,31,35` paints `bg-accent-kf` four times, 64px below it. The "ONE motion-color identity" is broken precisely at the component that declares itself its author.

**Falsifier:** any rule making the standard thumb consume `--slider-thumb-bg` (`grep -o "[^}]*\.slider-thumb[^{]*{[^}]*}" glass-ui.css` → 7 rules, 6 spectrum-gated, 1 base with `opacity:0`); or a `variant="spectrum"` prop appearing at the call site.

---

### D-5 · The tooltip is bound to a non-focusable `<div>`

`PlaybackRibbon.vue:3–26`: `<TooltipTrigger as-child>` wraps a plain `<div>` (the touch-gate wrapper); `<TooltipContent>Scrub animation timeline</TooltipContent>`.

reka's `TooltipTrigger` binds `@focus` (non-bubbling) on the trigger element. The trigger is a `div` — no `tabindex`, no role, never focusable. Keyboard focus lands on the slider *thumb*, a descendant, so the tooltip never opens for a keyboard user, and its `aria-describedby` (set only while open) attaches to the wrapper, not to the `role="slider"` node. The one piece of instructional copy in the component is **hover-only, sighted-only**.

The primitive's `aria-describedby` passthrough (quoted in D-1) is the intended cure and is unused.

**Falsifier:** a reka version whose `TooltipTrigger` listens on `focusin`, or a `tabindex` on the wrapper (there is none, `:5–14`).

---

### D-6 · `.is-disabled` is a costume, not a disable

`PlaybackRibbon.vue:9` / `:74` apply `is-disabled` when `!isAnimStarted`; `style.css:249–252`:

```
.is-disabled { opacity: 0.5; pointer-events: none; }
```

`pointer-events:none` does not remove an element from the tab order. The reka thumb keeps `tabindex=0` and its full arrow/Home/End key handling, so a keyboard user can scrub a timeline the UI has painted as unavailable — with no `aria-disabled`, so AT is told nothing. glass-ui's `Slider` extends `SliderRootProps` and therefore accepts `disabled` (`components/slider/types.d.ts`), which would set `data-disabled`, drop the thumb from the tab order, and light up glass-ui's own `[data-disabled] .slider-range{opacity:var(--opacity-disabled)}`. Unused.

Second-order: at `opacity:0.5` the D-2 boundary falls to **1.10:1**, so the disabled rail is not merely dim — it is blank.

**Falsifier:** a `tabindex="-1"` or `inert` applied to the wrapper by an ancestor (none at any of the three mount sites); or a reka build that honours `pointer-events:none` for key handling (it does not — keys are bound to the thumb element, not synthesised from pointer events).

---

### D-7 · The track-height hack reimplements `size="lg"`, and lands a worse proportion

`PlaybackRibbon.vue:238–240`

```
.timeline-green :deep(.glass-slider[data-variant="standard"]) { --slider-track-height: 1.5rem; }
```

This is a `:deep()` reach into producer-internal DOM (class + `data-variant` attribute) — precisely the coupling `lane-frontend.md` §3.4 flagged. It is also **unnecessary**: `Slider` has a first-class `size` prop (`components/slider/types.d.ts`: `SliderSize = "sm" | "md" | "lg"`), and glass-ui's ladder is:

| size | `--slider-track-height` | `--slider-thumb-size` | thumb/track |
|---|---|---|---|
| sm | 0.75rem (12px) | 0.5rem (8px) | 0.67 |
| md *(default)* | 1.25rem (20px) | 1rem (16px) | 0.80 |
| **lg** | **1.75rem (28px)** | **1.5rem (24px)** | **0.86** |
| **the hack** | **1.5rem (24px)** | 1rem (16px, untouched) | **0.67** |

`size="lg"` gives a *chunkier* rail than the hand-set value (28px > 24px) **and** scales the thumb with it. The hack lifts only the groove, so the ribbon lands the **`sm` proportion at a large size** — the least prominent thumb-to-track ratio glass-ui ships, on the one control whose entire job is indicating position. The comment at `:229` sells this as a feature — "The thumb keeps its variant size" — which is the defect stated as a virtue. (Under D-2 the thumb is invisible regardless; but the proportion regression is what would remain after D-2 is cured by `variant`/`size`, so it must be fixed too.)

**Falsifier:** a demo-side reason `size="lg"`'s 28px is unacceptable (none is recorded); or a producer change to the size ladder.

---

### D-8 · The pressed state of Reverse is a 1.2:1 tint

`PlaybackRibbon.vue:56,58` + `playback-idiom.css:84–87`. Whichever of the two competing rules wins (see D-15), the sighted signal is a wash of `--primary` (= `--accent-kf`) at 10% or 15% over the button plate:

| tint | light substrate | dark substrate |
|---|---|---|
| 15% (`playback-idiom.css:85`) | **1.21:1** | **1.31:1** |
| 10% (`PlaybackRibbon.vue:56`) | **1.13:1** | **1.19:1** |

SC 1.4.11 asks 3:1 for the visual state of a UI component. The border half of both rules cannot rescue it: `.button { border: 0 }` (`components/button/styles.css`) and the only width comes from `.glass-wash`'s `1px` — a 1px hairline is not the "state" indicator, and its colour delta is the same sub-3:1 mix. The remaining signal is the icon flip, which D-9 shows is null.

**Falsifier:** a live measurement of the composited pressed vs resting plate ≥3:1 (would require the resting plate to be materially darker than `--card`/`--background`, which `.glass-wash`'s `--glass-plate-tinted` at the demo's neutralised `--glass-tint-strength-aa: 0%` (`style.css:203–208`) is not). Marked **partially UNPROVEN-NEEDS-LIVE** for the exact resting-plate value; the *direction* and order of magnitude are certain.

---

### D-9 · The reversed-state icon flip is semantically null

`PlaybackRibbon.vue:63–68`: `<ArrowLeftRight :class="[… userReversed ? 'scale-x-[-1]' : '']" />`.

Lucide `arrow-left-right` (`@lucide/vue/dist/esm/icons/arrow-left-right.mjs`) is four paths: `M8 3 4 7l4 4` · `M4 7h16` · `m16 21 4-4-4-4` · `M20 17H4`. Applying `x → 24−x`:

| | resting | mirrored |
|---|---|---|
| top bar (y=7) | arrowhead at x=4, pointing **left** | arrowhead at x=20, pointing **right** |
| bottom bar (y=17) | arrowhead at x=20, pointing **right** | arrowhead at x=4, pointing **left** |

The silhouette is **identical** — two horizontal bars with one arrowhead each, diagonally opposed. Only which corner each head occupies swaps. The glyph's meaning ("swap / bidirectional") is direction-*agnostic*; it cannot express "now reversed", so it reads the same in both states. A 150ms transform on it is motion that communicates nothing, and it is the only motion the ribbon authors.

Compounding: the two transport cells use **incompatible toggle idioms**. Play/Pause communicates state by swapping its own label *and* its glyph (`:34–36`) — unambiguous. Reverse, in the same 2-cell grid, keeps a fixed label and relies on `aria-pressed` + a 1.2:1 tint + a null glyph flip. The `K.W2 S3` comment at `:46–52` asserts "the transport band carries ONE voice"; on the axis that matters to a user — *how do I know a toggle is on?* — it carries two, and the second is inaudible.

**Falsifier:** a side-by-side render of the two states showing a legibly different glyph (an SS-13 screenshot pair would settle it); or a directional icon (`Rewind`, `ArrowLeft`) appearing at this site.

---

### D-10 · The Play/Pause label fails AA

`playback-idiom.css:28–31` — `.btn-playback-accent` paints `color: var(--color-progress)` on `background: color-mix(in srgb, var(--color-progress) 20%, transparent)`, i.e. **accent ink on its own accent wash**:

| theme / substrate | wash | contrast |
|---|---|---|
| light / `--card` | `rgb(228,214,230)` | **3.58:1** |
| light / `--background` | `rgb(226,218,239)` | **3.70:1** |
| dark / `--card` | `rgb(80,63,74)` | **4.02:1** |
| dark / `--background` | `rgb(47,38,55)` | 6.00:1 ✓ |

The text is `font-weight: 500` at `var(--type-body)` = `clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` = 16–22px. WCAG "large text" begins at 18.66px **bold** or 24px normal; 500 is not bold and 22px < 24px, so the 4.5:1 floor applies. Three of four substrate/theme combinations fail — and the ribbon's actual host is `tier="quiet"`, i.e. the `--card`-ward end of the range, the two worst rows.

The `:hover` state deepens the wash to 32% (`:45`) without darkening the ink, so hovering makes it **worse**.

**Falsifier:** a live composited sample ≥4.5:1 (the glass plate's `backdrop-filter` blurs but does not lighten); or a producer/demo change binding `--btn-playback-accent-ink` to a darker rung. Note the demo already knows this pattern — `design-idioms.css:213–217` documents the `.status-badge` family solving exactly this by pushing the ink toward `--foreground` at a 50% mix "so it reads ≥4.5:1 against the tint in both themes". The recipe exists in the same repo; the transport CTA does not use it.

---

### D-11 · The touch gate's state has no visual expression

`PlaybackRibbon.vue:7–8`

```
'touch-gate-target timeline-green',
gate.isActive.value ? 'touch-gate-active' : '',
```

Neither class is defined **anywhere**:

```
$ grep -rn "touch-gate-target\|touch-gate-active" demo/          → 4 hits, all call-sites (this file ×2, AnimationVisualizer ×2)
$ grep -rn "touch-gate"       node_modules/@mkbabb/glass-ui/     → 1 file, a JSDoc block in useDockTouchGate.d.ts
```

Zero rules. So the design consequence is: on a touch device the first press on a *resting* rail is **swallowed** — `gatedSliderDown` calls `e.stopPropagation(); e.preventDefault(); return` (`:172–175`) — and **nothing on screen changes**. The user taps the timeline, the playhead does not move, and there is no armed/primed affordance to explain that a second deliberate tap is required. That is an invisible modal state on the component's primary control, on the platform the gate exists to serve.

The reactive binding at `:8` is a live subscription to `gate.isActive` re-rendering a class list that resolves to nothing — the same defect class `design-idioms.css:92–95` records having already been paid for once ("61 call-sites used to resolve to nothing" for the `icon-*` family). It recurred.

**Falsifier:** a stylesheet outside the two greps above defining either class (the demo's full CSS surface is the 12 files in `styles/` plus 40 `<style>` blocks; the grep covered `demo/` entirely, not just `.css`); or evidence that glass-ui's `useTouchGate` mutates inline styles on the element it is handed (`composables/dom/useTouchGate.d.ts` exposes only refs and handlers — it never receives a style target, only `(el, clientY)` for geometry).

---

### D-12 · The slider's focus ring is erased under forced-colors

The standard variant's focus affordance is `glass-ui.css`:

```
.glass-slider:not([data-variant=spectrum]):focus-within .slider-track[data-v-…]{ box-shadow: var(--focus-ring-shadow); }
```

box-shadow only. Forced-colors zeroes `box-shadow`, and glass-ui's forced-colors focus list (`utilities/a11y-overrides.css`) names `.focus-ring, .interactive-item, .dock-*, .field-control, .input-pill` — **not** `.glass-slider` or `.slider-track`. The thumb's own UA outline cannot substitute: it is `opacity:0` (D-2a), and opacity applies to an element's outline.

So in forced-colors the ribbon's only scrub rail is focusable with **no indicator** — the same class of failure as D-3, but originating producer-side. Per the standing BH/BI relay law this wants a glass-ui letter, not a demo patch; a demo-side `@media (forced-colors: active)` outline on `.timeline-green :deep(.slider-track)` is the stopgap.

**Falsifier:** a forced-colors rule for `.slider-track` I missed (`grep -rn "forced-colors" node_modules/@mkbabb/glass-ui/dist/styles/` → 4 files, enumerated; none names a slider selector); or a UA that preserves box-shadow in forced-colors.

---

## 3. MINOR

### D-13 · The transport labels sit one rung above every other control
`playback-idiom.css:21` sets `font-size: var(--type-body, 1rem)`. glass-ui's control rung is `--control-text` = `calc(var(--type-small) * var(--ui-scale))` = `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` (14–20px); `--type-body` is the **prose** rung, `clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` (16–22px). Both are fluid, so the gap *widens* with viewport: at 2560px the transport labels are ~21.6px while every sibling control is ~19.2px. The comment at `:22–26` argues *"transport buttons are CONTROLS"* — and then reaches for the token that is not the control rung. **Falsifier:** a demo `@theme` repointing `--control-text` (there is none; `style.css:42–67` declares only fonts and four accent bridges).

### D-14 · `.btn-interactive` is undefined
`PlaybackRibbon.vue:55`. Six demo call-sites (`CubeScene.vue:188,193`, `SequenceTarget.vue:31`, `SpringScene.vue:167`, `SpringPhysicsFacet.vue:74,105`, here), **zero** definitions: `grep -rn "btn-interactive" demo/ --include="*.css"` → empty; `@utility` list in the demo is `icon-{xs,sm,md,lg}` + `ppmycota-stroke` only (`design-idioms.css:96–124`); glass-ui → 0 files. Six components believe there is a shared interactive-button idiom. There is not. **Falsifier:** a Tailwind plugin or `@source`-discovered utility generating it (the demo has no `tailwind.config`; `styles/style.css` is the entry and defines no such utility).

### D-15 · Dual, disagreeing pressed-state authority
`PlaybackRibbon.vue:56` `aria-pressed:bg-primary/10 aria-pressed:border-primary/40` (Tailwind → `@layer utilities`) vs `playback-idiom.css:84–87` `.btn-playback[aria-pressed="true"] { background: …15%; border-color: …30% }` (unlayered). **Unlayered always beats layered**, so the inline utilities are dead — and the two authorities disagree on both numbers (10/40 vs 15/30), so nobody can say from source what the pressed state is meant to look like. This is the exact dual-authority failure the `K.W2 S3` comment at `:46–52` claims to have eliminated from this band, reproduced eight lines below it. **Falsifier:** the demo importing Tailwind's utilities unlayered (it does not — `style.css:1` `@import "tailwindcss"` establishes the standard layer order).

### D-16 · Both height declarations are dead, and 8 lines of comment defend the deader one
`PlaybackRibbon.vue:38–45` justifies `h-10` on Reverse as the equal-height cure. Mechanically: `h-10` (`height:2.5rem`, `@layer utilities`) loses to unlayered `.btn-playback{height:2rem}` (`playback-idiom.css:17`), which is in turn always exceeded by `.button{min-block-size:var(--control-h-md)}` (`components/button/styles.css`) = `max(2.5rem × --ui-scale, --control-floor)` — 40px on fine pointers, 60px on coarse (`--ui-scale: 1.5`, `--control-floor: var(--touch-target, 2.75rem)`). The two cells were **already** equal-height by the primitive's own `min-block-size`; the comment's diagnosis ("it out-specifies the unlayered `.btn-playback`") names the wrong property and the wrong owner ("the reka `<Button>`" — it is glass-ui's `.button`). Net: one dead utility, one dead declaration, and a paragraph asserting a mechanism that does not exist. **Falsifier:** a `size="sm"`/`size="xs"` on either Button lowering `--button-size` below 2rem (neither passes `size`).

### D-17 · Icon sizes disagree inside one two-cell row
`PlaybackRibbon.vue:35–36` `icon-md` (= `size-5`, 20px, per `design-idioms.css:108–113`) on Play/Pause; `:64` `icon-lg` (= `size-6`, 24px) on Reverse. Two buttons, identical height, identical grid track, glyphs 20% apart. **Falsifier:** an optical-size argument for the arrow being larger (none is recorded, and the comments at `:38–52` argue the opposite — that the two cells should read as a matched pair).

### D-18 · The press squish never lands on a mouse press
`playback-idiom.css:76–78` `.btn-playback:active { transform: scale(var(--scale-press)) }` is `(0,2,0)`. Both hover rules that also set `transform` — `.btn-playback-accent:hover` (`:44–50`) and `.btn-playback:not(.btn-playback-accent):hover` (`:65–70`) — are `(0,3,0)`. A mouse press always co-occurs with `:hover`, so the higher-specificity `translateY(-1px)` wins and the squish is shadowed on the entire pointer path. It can only fire on touch or keyboard activation, where `:hover` is absent. (The primitive already owns a press affordance two ways — `.tap-squish`'s `scale` and the `--glass-btn-press-t` specular ramp — so the correct fix is deletion, not a specificity bump.) **Falsifier:** a browser that clears `:hover` on `:active` (none does); or a devtools read showing `transform: scale(…)` computed during a hovered press.

### D-19 · `.timeline-green` names a colour retired at T.D7
`PlaybackRibbon.vue:230,238,241`. The class paints violet and the comment at `:210–212` concedes the name is retained for its own sake. A reader grepping for the motion-colour authority by name finds "green"; a maintainer editing "the green slider" edits the violet one. Name it for what it is (`.scrub-rail`). **Falsifier:** an external consumer keyed on the literal class name (`grep -rn "timeline-green" demo/` → 1 hit, this file).

### D-20 · Four stale or false prose claims
(a) `:228` — "a chunky scrubbable rail with **the red range fill**" while `:232` sets a *neutral* `--color-slider-track` mix; red was killed at VERDICT #16, which the same comment block cites at `:216`. (b) `:229` — "The thumb keeps its variant size", sold as a virtue, is D-7's regression. (c) `:85–87` — "Colocated playback-button skin … Non-scoped global rules" describes rules that are **not in this file**; they live in `demo/styles/playback-idiom.css`. (d) `playback-idiom.css:11` — "A non-scoped colocated **partial imported by PlaybackRibbon.vue**" is false in both halves: it is imported by `design-idioms.css:6`, and `PlaybackRibbon.vue` imports no CSS at all. The consequence is not cosmetic: a maintainer deleting this component would leave the skin loaded and orphaned, and a maintainer editing the skin would look for it inside the SFC. **Falsifier:** a build step injecting the partial per-component (`vite.config.ts` declares 9 aliases and no CSS injection).

### D-21 · Flat 8px rhythm — proximity encodes nothing
`:2` `grid gap-2` between the three bands (rail · transport · visualizer) and `:28` `gap-2` **inside** the transport pair. Identical 8px everywhere, so Gestalt proximity conveys no structure: the two buttons are exactly as related to each other as the button row is to the timeline. An Aristotelian mean here is a ratio, not a constant — e.g. 8px within the pair, 12–16px between bands — which would let the eye parse "one scrubber, one transport group, one visualizer" without reading labels. **Falsifier:** a design token or spec fixing a uniform ribbon rhythm (`layout.css` declares no ribbon gap token).

### D-22 · Two playheads for one `t`, and they cannot align
The ribbon stacks two representations of the same scalar with different geometries:

- **Slider rail** — `<Slider class="p-2">` (`:17`); `.slider-track` is `width:100%` inside the padded box, so the fill edge travels from **8px** to **W−8px** (ribbon-relative).
- **Visualizer rail** — `p-2` outer + `left-6` + `w-[calc(100% − var(--visualizer-track-gutter))]` with `--visualizer-track-gutter: 3rem` (`layout.css:23`); the ball centre travels **32px** → **W−16px**.

At `t=0` the two indicators sit **24px** apart; at `t=1`, **8px**. They diverge continuously in between. Internally the visualizer is self-consistent (its ball-centre travel exactly matches its own rail line — a nice piece of work), but nothing reconciles it to the slider above it. Two playheads that disagree about where "the start" is are worse than one. **Falsifier:** a live screenshot at `t=0` showing the fill edge and ball centre coincident (would require a padding I did not find on `.glass-slider`; `.glass-slider` sets no inline padding — `glass-ui.css` shows `align-items:center; display:flex` only).

---

## 4. INFO

### D-23 · The `source` branch and its empty state are unreachable
`:104–110` declare the `source` prop; `:119–121`, `:195–200` implement it; `:72` gates the visualizer on `animation`. No call site passes `source` — all three (`ChannelOptions.vue:378`, `SpringScene.vue:110`, `EasingScene.vue:96`) pass `animation`. So the documented "light channel" mode is dead API surface, and the `v-if` empty state — which would collapse the ribbon by ~72px (`p-2` 8 + `h-12` 48 + `p-2` 8 + `gap-2` 8) with no reserved space and no transition — is **latent, not live**. Filed as INFO rather than MAJOR for exactly that reason; it becomes a layout-stability defect the day the first scalar channel ships. Note also `isAnimStarted: true` is hardcoded at both scene sites, so `.is-disabled` (D-6) only ever fires on the ChannelOptions path.

### D-24 · No authored RTL, loading, or error state
Zero `dir`/`rtl:`/`:dir()` anywhere in `demo/` (verified by grep), so RTL is out of scope repo-wide; but note the component's two physical-direction affordances — `pl-px` optical nudge on the Play triangle (`:36`) and `scale-x-[-1]` (`:66`) — would both need mirroring, while glass-ui's `Slider` already handles `:dir(rtl)` itself (`glass-ui.css`, `--slider-range-origin`). No loading or error representation exists for a channel that is mid-resolve or failed. **Reduced motion is honoured, but not by this component**: glass-ui's `utilities/a11y-overrides.css` forces `transition-property: opacity, color, background-color, border-color, box-shadow !important` under PRM — an allowlist that happens to exclude `transform`, which is what neutralises the icon flip, the hover lift, and the press scale. The ribbon authors zero PRM handling and is rescued entirely by a consumed global; if that import ever moves behind a layer or is dropped, every motion in this file becomes unguarded silently. Worth a comment at minimum.

### D-25 · Comment mass
The four largest blocks — template `38–52` (15), script `136–147` (12), script `153–166` (14), style `208–229` (22) — total **63 of 245 lines, 26%**, and are tranche-changelog narration (`G7 (H.W10.S2)`, `K.W2 S3`, `J.W2 S1 (W4-4)`, `K.W4 S3/F4`) rather than API or intent. Three of the four are, per D-4/D-7/D-16, wrong about the tree as it stands — narration decays faster than code, and here it has decayed into active misdirection. The *shipping* copy, by contrast, is exemplary (see S-6).

---

## 5. Superlatives (L-18, both ways)

**S-1 · The `aria-hidden` disposition on the visual twin.** `AnimationVisualizer.vue:2–7` reasons correctly and explicitly: one AT slider per scrub value, the reka `<Slider>` is it, the 48px ball is "sighted-only flair". This is the *right* call — a second `role="slider"` for the same scalar would be a worse defect than anything above. **Falsifier:** evidence the ball conveys information the slider does not (it does not — both read `effectiveT / duration`).

**S-2 · `aria-pressed` on Reverse (`:58`) buys forced-colors and high-contrast state for free.** Because the author chose the ARIA attribute over a class, glass-ui's `accessibility.css` lights it up unasked — `@media (forced-colors: active) { [aria-pressed="true"] { border-color: Highlight !important; border-style: solid !important; border-width: 2px !important } }` and the parallel `prefers-contrast: more` block. The one state signal in this component that survives forced-colors survives *because* it was expressed semantically. **Falsifier:** the producer dropping that block.

**S-3 · The `pointerType === "touch"` gate bypass (`:153–179`).** The reasoning — that `"ontouchstart" in window` is true in desktop Chromium even for a mouse, so routing a mouse press through a tap-to-activate gate swallows the drag seam's arming — is subtle, correct, and load-bearing. It is the highest-quality thinking in the file.

**S-4 · Zero colour literals.** Every paint in the `<style>` block routes through `--color-progress` / `--color-slider-track` (`:230–243`); `playback-idiom.css` likewise. The token discipline is real even at the sites where the plumbing misses (D-4) — a repoint at the token root genuinely carries, which is why VERDICT #16's red retirement landed here without touching this file.

**S-5 · `pl-px` on the Play triangle only (`:36`), not on Pause (`:35`).** Optical centring of an asymmetric glyph, applied to exactly the glyph that needs it. Small, correct, and the kind of thing usually missed.

**S-6 · The shipping copy.** "Play" · "Pause" · "Reverse" · "Scrub animation timeline". Four strings, zero clichés, zero filler, zero exclamation marks, no "Let's get started", no "Oops". The tooltip is a verb phrase that names the action and its object. Against a 26% comment-mass of tranche jargon, the user-facing prose is disciplined — the inverse of the usual failure. **Falsifier:** any user-facing string I missed (there are none; `:25,34,63` are the complete set).

---

## 6. Provenance note

Every producer claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy already installed in the target — so every cure named (`variant`, `size="lg"`, `disabled`, `aria-label`/`aria-describedby`) is available today without an upgrade. Contrast figures are computed by `scratchpad/contrast.py` from the token graph (`glass-ui/dist/styles/{tokens,theme}.css` + `demo/styles/style.css:130–168`) using sRGB compositing and WCAG 2.x relative luminance; the oklch→sRGB conversion is the standard Björn Ottosson transform. Cascade-order conclusions (D-3, D-15, D-16) rest on the CSS Cascade Layers rule that unlayered normal declarations outrank layered ones, and on the `@import` order at `style.css:1–15` → `design-idioms.css:6`. Nothing in `keyframes.js`, `glass-ui`, or any other repo was written, mutated, installed, or executed; the only file authored is this one.

**Marked UNPROVEN-NEEDS-LIVE for the SS-13 visual audit:** D-8's exact resting-plate value (direction and magnitude certain, absolute figure bracketed); D-9's perceptual read of the mirrored glyph (the geometry is proven, "does a user notice" is not); D-22's rendered pixel offsets (the arithmetic is proven from the class list).

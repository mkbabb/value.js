claude-opus-5[1m]

# CHALLENGE · GlassTimeline · axis D (DESIGN)

**Target** `fourier-analysis/web/src/components/visualization/GlassTimeline.vue` (127 LOC)
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every row below carries
severity + `file:line` + its own falsifier. Superlatives carry falsifiers too (L-18 both ways).
**Method** static + source-derived only; no browser. Livable-only magnitudes are tagged
`UNPROVEN-NEEDS-LIVE (SS-13)`; the *mechanisms* under them are `CONFIRMED-STATIC`.
**Pin** `@mkbabb/glass-ui ^4.0.0`, resolved **4.0.0** (`web/package.json:14`;
`web/node_modules/@mkbabb/glass-ui/package.json:3`). Producer HEAD on disk = **7.0.0**
(`/Users/mkbabb/Programming/glass-ui/package.json`, git `51cfdfaf`) — read-only, used solely to
compute the F.W1 break/improve surface.

## §0 · Evidence read (whole)

| File | Why |
|---|---|
| `web/src/components/visualization/GlassTimeline.vue` | the target |
| `web/src/components/visualization/AnimationControls.vue` | **sole importer** (`:11`, mount `:91`) |
| `web/src/stores/animation.ts` | the `t`/`seek`/`startScrub`/`endScrub` axis |
| `web/src/components/visualization/VisualizationView.vue:235-236`, `FullscreenViewer.vue:8,131` | the two mount points |
| `web/src/style.css` (143) | app `@theme`, root font-size, token overrides |
| glass-ui 4.0.0 `dist/slider-DQ95MET2.js`, `dist/components/ui/slider/{index,Slider.vue}.d.ts` | the consumed primitive |
| glass-ui 4.0.0 `dist/glass-ui.css` (slider scope `data-v-534634a7`, timeline scope `data-v-a206e2d2`) | the shipped paints |
| glass-ui 4.0.0 `dist/timeline.js`, `dist/components/custom/timeline/*.d.ts` | **the never-imported canonical primitive** |
| glass-ui 4.0.0 `dist/styles/dock/{shell,layers,density}.css`, `tokens/{scheme-motion,scale-paper,shadow}.css`, `typography/{scale,utilities}.css`, `theme/radius.css` | the token + containment truth |
| glass-ui 7.0.0 `src/components/slider/{types.ts,styles.css,Slider.vue}`, `src/components/timeline/ScrubberTimeline.vue` | the uplift surface |

**Hitherto corpus folded, not re-invented.** `formation/fourier/CENSUS-2026-08-03.md:93-104,184-186`
and `formation/fourier/lane-frontend.md:94,324,382,401-403,499,641` already establish (a) that this
file is the tree's **hardest shadow** ("name-identical, zero-import: the strongest shadow signal in
the tree", lane-frontend:403), (b) the 3.1→4.0 variant rename `glass-scrubber → standard`
(lane-frontend:499), (c) that `GlassTimeline.vue:103` is the *only live* `glass-slider` selector in
the repo (lane-frontend:382), and (d) that retirement to `glass-ui/timeline` is already booked at
**F.W3** (census:190; lane-frontend:641 P2 #6). **I do not re-file the shadow.** Everything below
is what the census did *not* reach: the paint-containment blocker, the chimera token, the caret
geometry, the a11y readout gaps, and **one break-surface row the census break list omits (D-2)**.

**Intake overlap.** `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` — I enumerated all
40 rows (R3-1..R3-17, R4-1..R4-13, R5-1..R5-9, R6-1..R6-10, X-1..X-9). **Zero rows touch
GlassTimeline, the slider, the dock chrome, or any design surface**; the lane is entirely
source-provenance/control-closure archaeology. Nothing to cite, nothing to contradict. The single
adjacent row is **R3-10** (`CARRY→F.W4`: six live dynamic-`:is` families are an exhaustiveness gap
in any per-component audit) — GlassTimeline has **no** `<component :is>`, so R3-10's exhaustiveness
caveat does not bind this component. I note it to close the row rather than leave it silent.

---

## §1 · BLOCKERS (2)

### D-1 · BLOCKER · The caret — the component's entire reason to exist — is clipped away by the dock's `contain: paint`

**Provenance.** `GlassTimeline.vue:90-92` (`.timeline-caret { position: absolute; bottom: calc(100% + 6px) }`)
· `GlassTimeline.vue:107-118` (badge box) · glass-ui `dist/styles/dock/shell.css:96` (`contain: paint;`
on `.glass-dock`, **unconditional**) · `AnimationControls.vue:57-62` (`<GlassDock class="animation-dock">`)
· `dist/styles/dock/layers.css:34-37` (`.dock-layers { display: grid; min-width: 0 }` — **no padding**)
· `dist/styles/dock/density.css:82-85` (`--dock-padding-block: 0.375rem` at the default `comfortable`).

The docblock at `:10-11` names the caret "the only divergent surface vs the canonical variant" — it
is the *sole* justification for this file existing rather than a bare `<Slider>`. It cannot paint.

`contain: paint` clips descendants to the element's overflow-clip edge **regardless of the used
`overflow` value** (css-contain-2 §3.2). `.glass-dock:not(.vertical) { overflow-y: visible }`
(shell.css:160-164) does **not** lift it — the producer's own comment at shell.css:83-93 confirms
paint containment as a live "second clip box" it deliberately left UNEDITED. The caret is an
absolutely-positioned descendant painting **upward, out of** `.timeline-row`, so it is squarely in
the clipped region.

Arithmetic (all statically derivable):

```
budget above .timeline-row's top edge, inside the dock padding box
  --dock-padding-block            0.375rem  =  6px   (density.css:83, comfortable default)
  flex-centering slack            (40 − 20)/2 = 10px  (play-btn 2.5rem = 40px, AnimationControls.vue:144-145;
                                                       .timeline-row height = the Slider root = the track,
                                                       --slider-track-height md = 1.25rem = 20px,
                                                       glass-ui.css slider scope, [data-size=md])
                                                 ─────
                                                 16px
caret stack required above that same edge
  bottom offset                             6px   (GlassTimeline.vue:92)
  line-height of @apply text-base         24px   (Tailwind 1.5rem; --text-base: 1rem, components.css:38)
  padding-block 2 × 0.125rem               4px   (:109)
  border 2 × 1px                           2px   (:114)
                                          ─────
                                           36px
```

36px required vs ~16px available ⇒ **the top ~20px of a 30px badge is severed**; roughly the bottom
third paints, bisecting the readout text. At the two live mount points
(`VisualizationView.vue:235-236`, `FullscreenViewer.vue:131`) the dock is the direct ancestor in
both cases, so there is no configuration in which this component's caret renders whole.

**Severity rationale.** Not cosmetic: `t = 0.53` / `N = 7` is the only numeric feedback the scrub
gesture produces, and it is the file's stated raison d'être. A component whose one differentiating
surface never renders is a BLOCKER on the design axis.

**Falsifier.** (i) Show `contain: paint` absent from, or overridden on, `.glass-dock` in the
resolved 4.0.0 stylesheet — I grepped the whole of `dist/styles/dock/` and found exactly one
occurrence, unguarded, with no `overflow-clip-margin` anywhere in the package. (ii) Show the caret
stack fits ~16px — impossible while `line-height` alone is 24px. (iii) A live screenshot at
either mount point showing the full bordered badge floating clear above the dock rim falsifies me
outright. **Mechanism: CONFIRMED-STATIC. Exact severed-pixel count: UNPROVEN-NEEDS-LIVE (SS-13).**

**Note for F.W3.** Adoption of `@mkbabb/glass-ui/timeline` does **not** cure this: the producer's
own `ScrubberTimeline` uses the identical `bottom: calc(100% + 6px)` absolute caret
(4.0.0 `glass-ui.css` scope `data-v-a206e2d2`; 7.0.0 `ScrubberTimeline.vue:245-260`). The cure is
either a portal/`Teleport` for the caret or an inline readout — and it is a **glass-BH relay**, not
a consumer fix.

---

### D-2 · BLOCKER (F.W1-conditional) · `variant="standard"` is definition-absent at glass 7.0.0 — a hard `vue-tsc` break the census break-surface list omits

**Provenance.** `GlassTimeline.vue:67` (`variant="standard"`) · glass-ui 7.0.0
`src/components/slider/types.ts:10` — `export type SliderVariant = "scrubber" | "spectrum";` ·
`types.ts:25` — `variant?: SliderVariant`.

The variant name has now flipped **twice**: `glass-scrubber` → `standard` at the 3.1→4.0 hop
(recorded at lane-frontend.md:499, `9 - variant="glass-scrubber"` / `9 + variant="standard"`), and
`standard` → `scrubber` at 7.0.0. `"standard"` is a literal assigned to a closed string union ⇒
**TS2322**, which `vue-tsc` — per census §5 risk 10 (census:256-258), one of only two frontend
gates — will hard-fail.

Live blast radius in fourier (measured, not estimated): **9 attribute callsites across 7 files**
(`grep -rn 'variant="standard"' web/src` → 14 hits = 9 attributes + 5 prose):
`BasisSelector.vue:170,197` · `EditorControlsDock.vue:117` · `GlassTimeline.vue:67` ·
`ui/SliderControl.vue:83` · `equation/convergence/ConvergenceTimeline.vue:71` ·
`morph/HarmonicLevelGrid.vue:19,42` · `morph/MorphPhaseConfig.vue:23`.

The census break surface (census:102-104, 184-186; lane-frontend §5) enumerates
`metric-badge ×7 files`, `hover-card ×2`, `hover-popover ×2`, `DockIconButton ×2`,
`DockDropdownTrigger ×1`, `ToastVariant`, `lucide-vue-next→@lucide/vue ×35`, pencil-boil. **It does
not contain the slider variant rename.** I confirm the subpath itself survives
(`./slider` present in both 4.0.0 and 7.0.0 export maps) — which is presumably why a subpath-level
census missed it: the break is at the **prop-value** level, invisible to import-graph analysis.
This is a **new break-surface row owed to F.W1**.

**Falsifier.** Show `"standard"` in `SliderVariant` at 7.0.0 (`grep -n 'SliderVariant' types.ts`
returns exactly the two-member union), or show a 7.0.0 back-compat alias — `grep -rn '"standard"'
glass-ui/src/components/slider/` returns nothing. Or show `vue-tsc` is not run in the F.W1 gate
(census:256-258 says it is one of only two).

---

## §2 · MAJOR (5)

### D-3 · MAJOR · `--slider-scrub-track-height` is a chimera — dead at 4.0.0 *and* 7.0.0 — and its death drops the track below the WCAG 2.5.8 target floor

**Provenance.** `GlassTimeline.vue:124-126`.

`grep -r -- "--slider-scrub" ` over the **entire** installed 4.0.0 package (`dist/` + `src/`) returns
**zero**; the same grep over glass-ui 7.0.0 `src/` returns **zero**. The token does not exist and
never has. The real knobs are:

* `--slider-track-height` — the Slider's height token (4.0.0 `glass-ui.css`
  `.glass-slider[data-size=md]{--slider-track-height:1.25rem}`; 7.0.0 `slider/styles.css:45-57`);
* `--timeline-scrubber-height` — the *timeline primitive's* rail token
  (`dist/styles/tokens/scale-paper.css:162`, `0.5rem`).

The authored name is a blend of the two — the fingerprint of an author reaching for the timeline
primitive's vocabulary while holding the Slider's. The declaration is inert CSS: it emits no
warning, fails no gate, and **will survive the F.W1 uplift silently** (7.0.0 re-registers the whole
paint vocabulary onto `--glass-slider-track-background` / `.glass-track-well` /
`.glass-liquid-fill`, so this token lands in neither namespace at either version).

**Consequence, not just tidiness.** The intended 24px is exactly the WCAG 2.5.8 (AA) target-size
floor. With the token dead the `size` prop is unset ⇒ default `md` ⇒ **20px** at desktop root
(16px), **22.5px** at mobile root (`style.css:40-43` sets `html { font-size: 1.125rem }` below
768px). In the `standard` recipe **the track *is* the target** — the thumb is `width: 0; opacity: 0`
and its 44px `touch-hit-area::before` halo is explicitly `pointer-events: none`
(`glass-ui.css`, `.slider-thumb.touch-hit-area[data-v-534634a7]:before{pointer-events:none}`), so
the acquired region is the root's 20px box. 20px < 24px ⇒ fails 2.5.8; the spacing exception is not
obviously available given the `gap-2` (8px) neighbour clearance to the play button
(`AnimationControls.vue:79`). **Had the token been spelled correctly the control would have passed.**

**Uplift note (improve).** 7.0.0 adds a coarse-pointer floor —
`@media (pointer: coarse) { .glass-slider { min-block-size: max(--slider-track-height, --slider-touch-target 1.5rem) } }`
(`slider/styles.css:85-93`) — which cures touch, but **not `pointer: fine`**. Desktop stays 20px
after the uplift unless this component sets `size="lg"` (1.75rem = 28px) or the correct
`--slider-track-height`.

**Falsifier.** Produce one occurrence of `--slider-scrub-track-height` in any glass-ui version's
`dist` or `src`. Or show the standard-variant hit region is not the root box — contradicted by
reka's `SliderRoot` owning the pointer handler and by 7.0.0's own comment at `styles.css:77-79`
("The target a pointer acquires is the TRACK, not a thumb glyph"). The spacing-exception analysis
alone is `UNPROVEN-NEEDS-LIVE (SS-13)`; the 20px measurement is CONFIRMED-STATIC.

---

### D-4 · MAJOR · The caret is systematically mis-registered against the fill edge by ±4px, sign-flipping at midpoint

**Provenance.** `GlassTimeline.vue:84` (`.timeline-row { padding: 0 0.25rem }`) · `:85` (`position: relative`)
· `:62` (`:style="{ left: (anim.t * 100) + '%' }"`) · `:65-75` (`<Slider>` as an in-flow flex child).

An absolutely-positioned element's percentage `left` resolves against the **padding box** of its
positioned ancestor. `.timeline-row` is the ancestor and carries 0.25rem of inline padding. The
`<Slider>` is an in-flow flex child, so it occupies the **content box** — inset 4px on each side.
With `W` the padding-box width and `p = 4px`:

```
caret x(t)     = t·W                      (padding box)
fill-edge x(t) = p + t·(W − 2p)           (content box; thumb width 0 ⇒ reka's
                                           thumbAlignment:"contain" inset degenerates to 0 —
                                           .slider-thumb{width:0}, glass-ui.css slider scope)
error(t)       = 2p·t − p  =  8t − 4  px
```

⇒ **−4px at t=0, 0 at t=0.5, +4px at t=1**, and **±4.5px on mobile** (0.25rem against the
`1.125rem` root). The caret is a pointer: it claims to mark the playhead, and it is wrong
everywhere except the exact centre, with the error reversing sign as you drag through it — the
most legible failure mode a positional readout can have. Aristotelian objection: the padding that
creates the drift buys nothing; the row already has `gap-2` from its neighbours
(`AnimationControls.vue:79`).

**Falsifier.** Show the containing block is the content box (CSS2.1 §10.1 says padding box for
`position: absolute` — universally implemented). Or show `.timeline-row` has no inline padding
(`:84` is literal). Or show reka's `contain` alignment introduces a compensating inset with a
zero-width thumb — `thumbAlignment ||= "contain"` is forced at
`dist/slider-DQ95MET2.js` (`i.thumbAlignment ||= "contain"`), and `contain` with `thumbWidth = 0`
is arithmetically identical to `overflow`. The **exact rendered offsets are UNPROVEN-NEEDS-LIVE
(SS-13)**; the derivation is CONFIRMED-STATIC.

---

### D-5 · MAJOR · No `aria-valuetext` — assistive tech hears a bare `53` where sighted users read `t = 0.53` or `N = 7`

**Provenance.** `GlassTimeline.vue:68-71` (`:min="0" :max="100" :step="1" aria-label="Timeline"`)
· `:35-41` (the ×100 adapter) · `AnimationControls.vue:52-54` (`caretLabel`) · glass-ui 4.0.0
`dist/slider-DQ95MET2.js` (thumb binds only `aria-label`; reka mints `aria-valuemin/max/now`).

Three separate losses stack:

1. **Unit mismatch.** The exposed value axis is `0..100` (a private implementation artifact of the
   `Math.round(anim.t * 100)` adapter at `:36`), while the semantic axis, the visible readout, and
   the store are all `0..1`. A screen reader announces `Timeline, slider, 53`.
2. **Mode loss.** In multi-basis mode `caretLabel` is `N = 7` — a *harmonic count*, not a fraction.
   Nothing in the accessible name or value conveys the mode switch. The entire `N` register is
   invisible to AT.
3. **The caret is not an accessible substitute.** It is `pointer-events: none` (`:94`),
   `opacity: 0` until hover (`:95,102-105`), and carries no `aria-describedby`/`id` association to
   the slider. It is decorative to AT by construction — and per D-1 it is also clipped visually.

**Uplift note (improve).** 7.0.0 ships the exact cure as a first-class prop:
`valueText?: (value: number, index: number) => string` — *"Humane readout for assistive tech — the
string a screen reader hears instead of the raw number. Authored per thumb onto `aria-valuetext`;
reka mints none."* (`glass-ui/src/components/slider/types.ts:30-35`). F.W1 should land
`:value-text="() => label"` here. Under the old pin the only fix is a manual `aria-valuetext` —
which the 4.0.0 `<Slider>` does not forward.

**Falsifier.** Show reka-ui's `SliderThumb` mints `aria-valuetext` — `grep -o 'aria-[a-z]*'
dist/slider-DQ95MET2.js` yields only `aria-label`; the 7.0.0 prop doc explicitly states "reka mints
none". Or show the caret is programmatically associated with the slider — no `id`,
`aria-describedby`, or `aria-labelledby` appears anywhere in the file.

---

### D-6 · MAJOR · The caret reveals on `:hover` and dock-`[data-held]` only — a keyboard scrubber gets no readout at all

**Provenance.** `GlassTimeline.vue:102-105`
(`.timeline-row:hover .timeline-caret, .timeline-row:has(.glass-slider[data-held]) .timeline-caret { opacity: 1 }`).

Neither condition fires for keyboard operation. `:hover` requires a pointer. `[data-held]` is set by
`useDockHold`, which binds **`pointerdown` + `touchstart` only** (4.0.0 `dist/slider-DQ95MET2.js`:
`u.addEventListener("pointerdown", l); u.addEventListener("touchstart", l, {passive:!0})`).
There is **no `:focus-within` arm**. So a user arrowing the slider — the exact path the glass-ui
`<Slider>` advertises ("focus ring, ARIA wiring, and keyboard step", quoted approvingly in this
file's own docblock at `:9-10`) — drives an invisible value with zero feedback.

I verified the selector is not *also* broken by Vue's scoped transform: compiling `:102-105` through
the installed `@vue/compiler-sfc` yields
`.timeline-row:has(.glass-slider[data-held]) .timeline-caret[data-v-…]` — the `:has()` interior is
correctly left un-rewritten, and `.glass-slider` is a child-component root so it inherits the parent
scope id regardless. **The selector works; the state coverage is what is missing.**

**Not cured by F.W3 adoption.** The producer carries the identical omission at both versions
(4.0.0 `glass-ui.css` `data-v-a206e2d2`: `:hover` / `:has(.glass-track:active)`; 7.0.0
`ScrubberTimeline.vue:257-259`: the same two arms). Notably 7.0.0's own docblock retires the
`opacity: 0`-until-hover pattern **for the bead** with the reasoning *"the affordance must be
present during keyboard/touch scrub"* (`ScrubberTimeline.vue:40-43`) — and then leaves the caret
hover-gated anyway. **A glass-BH relay is owed**, per the standing relay law.

**Falsifier.** Show a third arm in `:102-105` (there are two). Show `useDockHold` binds a focus
event (it binds `pointerdown`, `touchstart`, `pointerup`, `pointercancel` — no focus). Or show a
`prefers-reduced-motion`/`:focus-visible` reveal elsewhere in the 4.0.0 slider scope — grep of the
slider scope shows `:focus-within` only on `.slider-track`'s **box-shadow**, never on caret opacity.

---

### D-7 · MAJOR · Keyboard seeks are silently clobbered during playback — the pointer path parks the rAF clock, the keyboard path does not

**Provenance.** `GlassTimeline.vue:49-51` (`@pointerdown → onValueCommitStart → anim.startScrub()`)
· `:73` (the listener is bound to `pointerdown` **only**) · `:35-41` (the setter calls
`anim.seek(next)` and nothing else) · `stores/animation.ts:116-119` (`startScrub()` → `stopRAF()`)
· `animation.ts:60-71` (`tick()` overwrites `t.value` every frame while `playing`).

Pointer drag: `pointerdown` → `startScrub()` → `stopRAF()` → the drag owns `t`. Correct.
Keyboard: `ArrowRight` → reka updates the model → the computed setter runs `anim.seek(next)` → **the
rAF loop is still running** → on the very next frame `tick()` recomputes `t` from `startTime` and
the seek is erased. The user sees the thumb twitch and snap back.

This is the *only* asymmetry between the two input paths, and it silently voids keyboard operability
for the component's primary function whenever the animation is playing — which is its default state
under normal use. WCAG 2.1.1 is met only in the paused case.

The one-line cure exists in the file's own vocabulary: `onValueCommitStart()` is already idempotent
(`:43-47`) and `@value-commit` already closes the pair (`:53-57`); the setter at `:37` simply never
opens it. (Note the store's `seek()` even clamps identically at `animation.ts:128-130` — the clamp at
`:38` is redundant, the missing `startScrub()` is not.)

**Falsifier.** Show `startLoop`'s `tick` does not rewrite `t` — `animation.ts:69` is
`t.value = cycle % 2 === 0 ? frac : 1 - frac`, unconditional. Or show reka's keyboard step routes
through a `pointerdown` (it is a `keydown` handler on the thumb). Or show `@value-commit` fires
*before* the keyboard value change and opens the scrub — it is a **commit** event, emitted after.
The *visible* snap-back is `UNPROVEN-NEEDS-LIVE (SS-13)`; the missing `startScrub()` call and the
unconditional `t` write are CONFIRMED-STATIC.

---

## §3 · MINOR (8)

### D-8 · MINOR · Hard-coded black shadow where the design system ships a scheme-aware token
`GlassTimeline.vue:116` — `box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1)`. The canon is
`--shadow-sm: 0 2px 8px color-mix(in srgb, var(--shadow-color) 6%, transparent)`
(`tokens/shadow.css:26`) — which the **producer's own retired recipe used**
(4.0.0 `glass-ui.css`, `.caret-value[data-v-a206e2d2]{…box-shadow:var(--shadow-sm)…}`). The literal
is simultaneously heavier (10% vs 6%), tighter (6px vs 8px blur), and pinned to pure black, so it
disappears against the dark-scheme `--popover` instead of tracking `--shadow-color`.
**Falsifier.** Show `--shadow-color` is defined as opaque black in both schemes — it is a
scheme-switched token in `tokens/dark-arm.css`/`light-dark.css`; a `color-mix` at 6% of a
scheme-aware colour is not `rgba(0,0,0,0.1)` in either arm.

### D-9 · MINOR · `@apply text-base` opts the caret out of the fluid control-type ramp and inflates it exactly where the clip is worst
`GlassTimeline.vue:110`. The producer's caret used `font-size: var(--type-small)`
(4.0.0 `glass-ui.css` `.caret-value[data-v-a206e2d2]`), i.e.
`clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — the "`--control-text` source (the workhorse)"
(`typography/scale.css:105-109`; `--control-text` at `tokens/offsets-sizing.css:170`). The fork pins a flat `1rem`.
Because `style.css:40-43` sets `html { font-size: 1.125rem }` below 768px, `text-base` renders
**18px on mobile** against `--type-small`'s ~15.75px floor there — ~14% larger on the narrowest
viewport, feeding directly into D-1's overflow. It is also the file's largest type against a 20px
track: a caption-scale badge is the proportionally correct register.
**Falsifier.** Show glass-ui remaps `--text-base` away from `1rem` — `components.css:38` restates
`--text-base: 1rem`, so the divergence is real and the current value is coincidentally Tailwind's
default. Show the app root is 16px on mobile — `style.css:40-43` says otherwise.

### D-10 · MINOR · Four more token-bypassing literals in a 47-line style block
`GlassTimeline.vue:92` `6px` caret offset (no `--popover-offset`/spacing token) ·
`:96` `0.2s ease` where `--duration-fast: 0.2s` (`tokens/scheme-motion.css:67`) and
`--ease-standard` (`:216`) exist and the producer's caret used both ·
`:115` `border-radius: 0.25rem` where `--radius-sm: 4px` (`theme/radius.css:18`) — and these are
**not equal** at mobile root (`0.25rem` = 4.5px vs the token's flat 4px) ·
`:125` a px literal for a token that does not exist (see D-3).
The producer's own retired `.caret-value` used `var(--radius-sm)`, `var(--shadow-sm)`,
`var(--type-small)`, `var(--duration-fast)`, `var(--ease-standard)` — the fork **de-tokenised five
of five**. Given the glass-ui-first precept, this is the axis on which the shadow costs most.
**Falsifier.** Show the tokens are undefined at 4.0.0 — each is cited with file:line above.

### D-11 · MINOR · The docblock is stale or wrong in four places, and the one live comment describes a different declaration than the one beneath it
`:13` "the v1.8.x `<Slider>`" — the resolved dependency is **4.0.0**; the 1.x line is three majors
gone. · `:120` "the glass-scrubber variant tokens" — that variant name was retired at the 3.1→4.0
hop (lane-frontend.md:499) and the file itself passes `"standard"` at `:67`. · `:120-123` the
comment describes a **retint** (`--surface-tint-*`, `color-mix(… var(--foreground) N% …)`) and the
rule beneath it sets a **height** (`:125`) — comment and code have no referent in common; no tint
token appears in the block. · `:10-11` "the only divergent surface vs the canonical variant" — the
canonical surface is `@mkbabb/glass-ui/timeline`'s `<GlassTimeline variant="scrubber">`, whose
`label` prop is *literally this caret* (4.0.0 `GlassTimeline.vue.d.ts`: `/** Tooltip caret text
(scrubber variant only). */ label?: string`), so the divergence is zero — the fold is the census's
(census:93; lane-frontend:401-403), the **prose defect** is new.
**Falsifier.** Show a `1.8.x` glass-ui in the lockfile, or a `--surface-tint-*` declaration inside
`:124-126`.

### D-12 · MINOR · `[data-held]` is the **dock's** flag, not this slider's — any other dock member's keep-open reveals the caret spuriously
`GlassTimeline.vue:103` reads `data-held`, which 4.0.0's Slider binds from
`j?.held.value === !0` where `j` is the **shared** `DockContext`
(`dist/slider-DQ95MET2.js`: `R = a(() => j?.held.value === !0)`, root binding
`"data-held": R.value || void 0`). The `SpeedSelect`, the `DropdownMenu`, or any sibling acquiring
`keepOpen()` sets it. The caret then fades in over an idle scrubber while the user is operating a
different control — a false-positive readout. The correct signal is the slider's own drag state,
which this component **already tracks** in `scrubbing` (`:30`) and does not use for the reveal.
**Falsifier.** Show `held` is per-slider — it is read off the injected dock context, one instance
per `<GlassDock>`; `useDockHold` calls `n.keepOpen()` on that same shared token.

### D-13 · MINOR · The `label` prop has no clock contract, and the parent feeds it a *different* clock than the caret is positioned on
`GlassTimeline.vue:24-26` declares `label: string` — an opaque string with no stated relationship to
the position the caret is drawn at. `:62` draws it at **`anim.t`** (raw). But
`AnimationControls.vue:39-49` computes `currentLevel` from **`anim.easedT`** (`:44`, `:47`) and `:52-54` feeds it in
as `N = …`. With the store's default easing `"sine"` (`animation.ts:24`), `easedT ≠ t` everywhere
but the endpoints — so in multi-basis mode the caret's `N` and the caret's x-position are readouts
of two different clocks, disagreeing by up to the easing's maximum deviation. In epicycle-only mode
the label is `t.toFixed(2)` off raw `t` and they agree — so the incoherence is mode-dependent and
therefore easy to miss. The design root is here: a positional readout component that takes its
number as an unconstrained string while sourcing its position independently from a store is
split-brain by construction. The producer's primitive avoids it by taking `modelValue` **and**
`label` together (4.0.0 `ScrubberTimeline.vue.d.ts`).
**Falsifier.** Show `easedT === t` for the default easing — `animation.ts:27-30` applies
`ANIMATION_EASINGS["sine"].fn`, which is not the identity. Or show multi-basis mode is unreachable —
`AnimationControls.vue:35-37` selects it whenever `activeBases` is not exactly `["fourier-epicycles"]`.

### D-14 · MINOR · `@reference "tailwindcss"` targets the bare framework, not the app entry, so scoped `@apply` cannot see the project `@theme`
`GlassTimeline.vue:80` — and **36/36** scoped blocks in `web/src` do the same
(`grep -rho '@reference "[^"]*"' src | sort | uniq -c` → `36 @reference "tailwindcss"`). Tailwind
v4 (`^4.3.1`) resolves `@reference` against the named file only; the project's real entry is
`src/style.css`, which is where `@theme { --font-sans: "Computer Modern Serif" … }` (`:13-15`) and
`@import "@mkbabb/glass-ui/styles"` (`:3`) live. Today the single `@apply text-base` is benign
because `--text-base: 1rem` coincides with Tailwind's default — but the hazard is live: any
`@apply font-sans` in a scoped block would silently render Tailwind's stock sans instead of the
brand's Computer Modern, and any glass-ui-defined utility would fail or resolve wrong. Systemic,
cheap to fix, and worth booking at F.W1 alongside the uplift.
**Falsifier.** Show Tailwind v4 `@reference "tailwindcss"` transitively loads the consumer's entry
CSS — its own documentation states the opposite and instructs referencing your own file when using
custom theme values. Or show `web/src` has a second entry that re-declares the theme — there is
exactly one `.css` file under `src/`.

### D-15 · MINOR · The hover readout is stacked on the popover rung, one tier above the tooltip rung it semantically occupies
`GlassTimeline.vue:97` — `z-index: var(--z-popover)` = **130**
(`tokens/scheme-motion.css:344`), while `--z-tooltip` = 120 (`:343`) is the rung for a transient,
`pointer-events: none`, hover-revealed label. Benign today (the caret is inert and the
`DropdownMenuContent` is portaled later in DOM order), but it is a deliberate one-rung overshoot in
a system that publishes a 14-rung scale precisely so this is not decided per-component.
**Falsifier.** Show `--z-tooltip` is unsuitable — the caret is exactly a tooltip by shape
(`pointer-events: none`, hover-gated, `--popover` chrome). Or show the caret must out-stack a real
popover — it cannot receive events, so it never needs to.

---

## §4 · INFO (2)

### D-16 · INFO · The `v-model` setter dereferences `arr[0]` while the forwarded emit type is `number[] | undefined`
`GlassTimeline.vue:37-40` — `set: (arr) => { … (arr[0] ?? 0) … }`. The `?? 0` guards the *element*,
not the *array*: 4.0.0 `Slider.vue.d.ts:19` declares
`"update:modelValue": (payload: number[] | undefined) => any`. If reka ever emits `undefined`,
`arr[0]` throws before the coalesce. Cross-axis (belongs to L), filed here only because the
declared shape is visible in the same read.
**Falsifier.** Prove reka-ui's `SliderRoot` never emits `undefined` for a controlled array model —
the type says it may; I did not find a runtime path that does.

### D-17 · INFO · `aria-label="Timeline"` lands twice
`GlassTimeline.vue:71`. 4.0.0's Slider binds it explicitly onto the thumb
(`"aria-label": n.$attrs["aria-label"] ?? void 0`) *and* Vue's automatic single-root fallthrough
puts it on the `SliderRoot` element as well. Harmless — the root span carries no ARIA role — but it
is duplicate authoring, and 7.0.0's Slider adds a dev-time accessible-name warning
(`Slider.vue:229-244`) that formalises the naming contract this component should meet through one
channel.
**Falsifier.** Show 4.0.0's compiled root sets `inheritAttrs: false` — it does not; the compiled
component object contains no such option.

---

## §5 · Superlatives (4) — L-18 runs both ways

### S-1 · The flex hygiene is exactly right, and it is load-bearing
`GlassTimeline.vue:82-83` — `flex: 1 1 0; min-width: 0`. `.glass-dock` sets `white-space: nowrap`
and `max-inline-size: var(--dock-max-inline-size)` (`dock/shell.css:114-115`), and `.dock-layers`
is a grid with `min-width: 0` (`layers.css:34-37`). Without `min-width: 0` the slider's `w-full`
intrinsic minimum would refuse to shrink and blow the dock's inline cap at narrow viewports; with
`flex: 1 1 0` the timeline correctly absorbs *all* the slack while the fixed-width play button,
speed select and menu trigger hold their sizes. This is the one place the file is more careful than
it had to be.
**Falsifier.** Show a `min-width` floor is required by the primitive — the 4.0.0 Slider root sets
none. Or show the dock does not constrain inline size — `shell.css:115` says it does.

### S-2 · The absent empty/loading/error states are **correct**, not missing — the usual charge is falsified here
The obvious design-audit charge ("no empty/loading/error coverage") does **not** land. Both mount
points gate the entire dock on data presence: `VisualizationView.vue:235` mounts
`<AnimationControls>` under `v-if="hasData && !isEditing"`, and `FullscreenViewer.vue:131` is inside
the fullscreen viewer, which does not exist without a visualization. The workspace store's
`loading`/`error` refs (`stores/workspace.ts:49-51`) are consumed upstream. A scrubber that cannot
mount without a timeline to scrub has no empty state to own — hoisting one here would be
contrivance. I raise this deliberately because it is the finding I expected to file and could not.
**Falsifier.** Show a third mount site without the guard — `grep -rn "AnimationControls" web/src`
returns exactly the two, both guarded. Or show `hasData` can be true with `basesData` and
`epicycleData` both null (`AnimationControls.vue:39-50`'s `return 1` fallback would then be live).

### S-3 · The scrub open/close pair is genuinely re-entrancy-safe
`GlassTimeline.vue:43-57` — `onValueCommitStart` early-returns when already scrubbing;
`onValueCommit` early-returns when not. The two are exact inverses over a single boolean, so no
input sequence can emit an unpaired `anim.endScrub()`; a stray commit mid-drag cannot restart the
rAF clock the drag deliberately parked (`animation.ts:121-126`). The guards look redundant until you
notice `@value-commit` also fires on keyboard release — where, without them, an
`endScrub()` would land with no matching `startScrub()`.
**Falsifier.** Construct an input order producing unbalanced `startScrub`/`endScrub` — the boolean
is set before each store call and both branches are guarded. (Note this is orthogonal to D-7: the
pair is *balanced*; it is merely never *opened* by the keyboard.)

### S-4 · The caret's colour pair is the correct designed pair, and contrast is token-decidable
`GlassTimeline.vue:112-113` — `color: var(--popover-foreground)` over `background: var(--popover)`.
This is the system's own guaranteed pair, so contrast holds in **both** schemes without a
per-component override — exactly the discipline `style.css:113-125` had to apply manually for
`--viz-amber` (a light-mode 3.54:1 AA failure the app patches locally). The pair sits one line above
the hard-coded shadow of D-8, which makes the contrast in authoring discipline within a single rule
all the sharper.
**Falsifier.** Show `--popover`/`--popover-foreground` are not scheme-paired in glass-ui's theme
arms — they are declared together in `tokens/light-dark.css` and `tokens/dark-arm.css`.

---

## §6 · F.W1 / F.W3 ledger for this component

| Surface | At 4.0.0 (old pin) | At 7.0.0 | Disposition |
|---|---|---|---|
| `@mkbabb/glass-ui/slider` subpath | present | present | **survives** |
| `variant="standard"` (`:67`) | valid | **absent** (`"scrubber" \| "spectrum"`) | **D-2 BREAK — new break-surface row, 9 callsites / 7 files** |
| `valueCommit` emit (`:74`) | present | present (`Slider.vue:32`) | survives |
| `.glass-slider` class + `data-held` (`:103`) | present | present (`Slider.vue:255,261`) | survives |
| `--slider-scrub-track-height` (`:125`) | **dead** | **dead** | **D-3 SILENT CARRY — inert at both versions, no gate catches it** |
| `aria-valuetext` | unavailable | **`valueText` prop added** | **IMPROVE — land `:value-text="() => label"` (D-5)** |
| target-size floor | none | coarse-pointer `min-block-size: max(…, 24px)` | **PARTIAL IMPROVE — `pointer: fine` still 20px (D-3)** |
| caret hover-gating | hover-only | hover-only (unchanged) | **NOT cured by F.W3 — glass-BH relay owed (D-6)** |
| caret `contain: paint` clip | clipped | clipped (same recipe upstream) | **NOT cured by F.W3 — relay owed (D-1)** |
| **host** `AnimationControls.vue` `MetricBadge` (`:10`) | present | **subpath absent** | census break row (`metric-badge ×7 files`, census:102) — **this component's only mount path breaks with it** |
| **host** `AnimationControls.vue` `DockDropdownTrigger` (`:8`) | present | dock member removed | census break row (census:103) |
| whole component | — | — | **F.W3 books retirement → `glass-ui/timeline` (census:190; lane-frontend:641)** |

**Sequencing consequence.** Because D-1 and D-6 are *upstream* defects the adoption inherits,
retiring this file at F.W3 does **not** discharge them; it relocates them. Both need a glass-BH
relay ahead of F.W3 or the adoption lands a known-broken caret with a clean diff.

---

## §7 · Verdict

**17 defects — 2 BLOCKER, 5 MAJOR, 8 MINOR, 2 INFO — and 4 superlatives.**

The component is defective, and the two blockers are of different kinds. **D-1** is the damning one:
the file exists *only* to add a caret to a `<Slider>`, and that caret is clipped away by the paint
containment of the dock it is always mounted inside — the differentiator does not render, which
means the whole justification for not importing `@mkbabb/glass-ui/timeline` evaporates on inspection
and the census's shadow verdict (lane-frontend:403) is stronger than the census knew. **D-2** is the
one the formation most needs: `variant="standard"` is a prop-value break invisible to subpath-level
census work, and it costs 9 callsites across 7 files at F.W1.

Beneath them the pattern is consistent and citable: the fork **de-tokenised five of five** paints
the producer had already tokenised (D-8/D-9/D-10), invented a token that never existed at any
version (D-3), and dropped the intended 24px that would have cleared the WCAG target floor. The a11y
losses (D-5/D-6/D-7) all share one root — the component treats pointer as the only input modality,
while the primitive it wraps advertises keyboard support in this very file's docblock.

What the file gets right is real and worth preserving through F.W3: the flex hygiene (S-1), the
scrub-pair balance (S-3), the token colour pair (S-4), and the correctly-hoisted state gating (S-2)
that falsified the state-coverage charge I opened expecting to file.

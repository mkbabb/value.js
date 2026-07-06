# S — Lane: The Animation Truth Inventory (feeds S-9 + S-13)

**Mode**: AUDIT ONLY. **Repo**: value.js @ `c5aa091` (tranche-q). **Method**: static
read of `demo/@/styles/animations.css`, every `<Transition>`/rAF/`setTimeout`
motion site in `demo/`, cross-referenced against the R.W4 landed inventory
(`docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md`) +
glass-ui's token source (`../glass-ui/src/styles/tokens/scheme-{motion,spring}.css`);
live Playwright probes at `http://localhost:9000` (dev, unminified) for the sites
whose behavior isn't derivable from source alone (the mix phase-clock mismatch,
confirmed live). This lane does NOT re-measure frame-cost/fps (owned by
`perf-transitions.md`) or the view-select/dock-shell moment (owned by
`design-dock-shell.md`) — it walks the grammar: declared vs authored vs actually-
wired-together, and owns the fresh finds those two lanes didn't surface.

---

## §1 The token truth (ground truth for every "as landed" claim below)

From `../glass-ui/src/styles/tokens/scheme-motion.css` + `scheme-spring.css`:

| Token | Value |
|---|---|
| `--duration-fast` | 0.2s |
| `--duration-normal` | 0.3s |
| `--duration-slow` | 0.45s |
| `--duration-panel` | **0.55s** (the slowest named duration in the system) |
| `--spring-smooth-duration` | 0.45s |
| `--spring-snappy-duration` | 0.4s |
| `--spring-bouncy-duration` | 0.62s |
| `--ease-standard` | `cubic-bezier(0.4,0,0.2,1)` |
| `--ease-decelerate`/`--ease-out` | `cubic-bezier(0,0,0.2,1)` |
| `--ease-accelerate`/`--ease-in` | `cubic-bezier(0.4,0,1,1)` |

The three families (`demo/@/styles/animations.css:82-166`), fully expanded:

| Family | Enter | Exit |
|---|---|---|
| `vj-enter` | opacity 0.3s decelerate **+** transform 0.45s spring-smooth | opacity 0.2s accelerate **+** transform 0.3s accelerate |
| `vj-morph` | opacity 0.2s decelerate **+** transform 0.4s spring-snappy **+** max-height 0.3s decelerate | all 0.2s accelerate |
| `vj-celebrate` | opacity 0.2s decelerate **+** transform 0.62s spring-bouncy **+** max-height 0.3s decelerate | all 0.2s accelerate |

This matches the R.W4 inventory's prose exactly — the three-family collapse is
real and verified in source, not just doc claim. The rest of this lane is about
what sits **outside** that clean grammar.

---

## §2 The per-beat ledger — declared vs authored vs actually-wired

| Beat | Declared motion | Measured/derived | Verdict |
|---|---|---|---|
| **View switch** (dock trigger click) | 4 independent mechanisms fire from ONE click: (a) trigger icon `vj-morph` (0.2s/0.4s), (b) dock `vj-settle` keyframe (`Dock.vue:243`, 0.4s spring-snappy scale), (c) `--view-hue-shift` sweep (`style.css:180`, **0.55s** `--duration-panel`, a `:root`-inherited `@property`), (d) pane `vj-enter` travel (0.45s in / 0.3s out, ±110% translateX + ∓2° rotate) atop PaneSlot's simultaneous co-mount | design-dock-shell P1-6: **first post-click frame 254.7ms**, 16 frames >28ms/2.5s; perf-transitions P1-1: up to **183ms long task** inside the swap | **Quadruple-fire, unsequenced.** None of the 4 mechanisms is gated on the others' completion or on mount-readiness. See §5. |
| **Card enter** (`.stagger-children`, ComponentSliders channel rows) | 6-way cascade, 0/40/80/120/160/200/240ms delay + 0.3s ease-standard fade+rise each; cascade completes ≈540ms | not separately re-measured (low-cost, transform+opacity only) | KEEP — correctly tokenized, PRM-gated (`@media prefers-reduced-motion: no-preference` wraps the whole utility, animations.css:43) |
| **Dialog / overlay** (reka-ui, glass-ui producer) | backdrop 0.3s `allow-discrete`; panel `--spring-bouncy-duration` (0.62s) per glass-ui `animations.css:397-406`; PRM carve-out forces a **150ms literal** opacity-only fade (demo `animations.css:202-212`) | out of scope (producer surface) | the 150ms PRM-carve-out literal is a **documented, deliberate** exception (tighter than `--duration-fast` 0.2s, intentionally — comment explains why) — KEEP |
| **Dock morph** (hover expand/collapse) | `--animate-dock-in: dock-in var(--duration-panel) var(--spring-snappy) both` (glass-ui `literals.css:21`) = **0.55s** | perf-transitions P1-7: worst frame 41.4ms, 7/76 >28ms | **P1 taste flag** (new): 0.55s is the single slowest named duration in the whole system, and it is spent on a **passive hover affordance** — industry hover-reveal norms sit at 150-250ms so the chrome feels responsive to intent, not viscous. Contrast: the same duration is also used for the emphasis-grade view-hue sweep — one token, two very different jobs. |
| **Detent label** (`SpectrumDetentLabel.vue`) | `vj-enter`, geometry PINNED to rest (`--vj-enter-x/-y` set to the live translate) → pure 0.3s-in/0.2s-out opacity fade; position (`left`/`top`) is inline-styled, untransitioned (follows the pointer 1:1, no lag) | not separately measured (cheap: opacity only) | **KEEP, exemplar** — this is the family dogfooded correctly: one property, no compositor cost, no double-authoring |
| **Orchestrated open** (ColorPicker mount, R.W3 Lane E) | plate-land 560ms `--spring-snappy` curve (bespoke duration, borrows the family's CURVE not its 0.4s DURATION token) → field paint-in +180ms (740ms elapsed) → channel stagger +360ms (1100ms) → `plateOpening` flag drops at 1200ms (`ColorPicker.vue:301`) | internally consistent (100ms slack before flag-drop); PRM-gated (`@media prefers-reduced-motion: no-preference` wraps `plate-land`, `ColorPicker.vue:324`) | **P2 taste flag** (new): 1.1-1.2s of orchestrated breath fires on every fresh mount of a *tool* (not a marketing splash) — the choreography itself is well-authored and documented, but its total length is worth a taste pass against S-9. Not a defect — a candidate retune. |
| **Cross-fade** (PaneSlot simultaneous mode) | `vj-enter` (0.45s in / 0.3s out) with `.pane-wrapper--{left,right}` direct-child geometry override | perf-transitions P1-1/P1-2 (already owns the mount-stall + layout-thrash numbers) | reference only — see perf lane |
| **Mix "gathering→mixing→revealing→done"** | see §3 P0-M — **NOT in the R.W4/S inventory at all** (no row in transition-inventory.md §3) | **live-confirmed timing defect**, below | **NEW finding, this lane** |
| **Gradient easing accordion** (S-13) | chevron `rotate-180` via bare `transition-transform` (no duration modifier → Tailwind's un-tokened default, not `--duration-*`); row background-color hover correctly tokenized (`var(--duration-fast) var(--ease-standard)`, `GradientVisualizer.vue:325`) | see §4 for the full S-13 assay | mixed: the row chrome is disciplined, the disclosure chevron is not |

---

## §3 P0 — the mix pane's phase clock does not agree with its own visual clock (NEW, live-confirmed)

**The two authors, and the mismatch.** `useMixingState.ts:86-91` drives the
`animationPhase` state machine off THREE bare `setTimeout` literals — `gathering`
at t=0, `mixing` at **t=800ms**, `revealing` at **t=2300ms**, `done` at
**t=2900ms**. `useMixingAnimation.ts:65-68` independently declares the CANVAS
visual durations for those same phases: `FILL_DURATION=1800ms` (gathering, plus
`STAGGER=200ms` per additional color), `SUFFUSE_DURATION=600ms` (mixing),
`SHRINK_DURATION=600ms` (revealing). **These two files were authored
independently and never reconciled**: for the minimum 2-color mix, section 0
needs the full 1800ms to finish growing and section 1 (staggered +200ms) needs
2000ms — but the phase machine yanks the render loop from the `gathering`
branch to the `mixing` (suffuse) branch at **800ms**, i.e. **at ~40-44%
visual completion**. The canvas jump-cuts mid-growth into the suffuse overlay
every single mix, for every color count (more colors only worsens the
truncation — a 5-color mix needs the last section to *start* growing at 800ms
and finish at 2600ms, well past the 2300ms `revealing` cutover).

**Live-confirmed**: reproduced against the running dev server (`#/mix`, 2
distinct colors selected, Mix clicked) — instrumented sampling shows the phase
label ("Gathering…"/"Mixing…"/"Revealing…") and the canvas paint both change
state at the JS-timer's schedule, independent of whether the canvas's own
eased-progress math has resolved. This is not a taste call — the animation
**never reaches the endpoint it was authored to reach** before the next state
overwrites it.

**Compounding — a THIRD, uncoordinated motion signal.** `MixPane.vue:97-104`
layers a generic `animate-spin` loading spinner + text label *on top of* the
bespoke canvas choreography for the entire `gathering`/`mixing`/`revealing`
window. One says "watch this custom animation," the other says "generic
please-wait" — the two motion languages fight for the same beat.

**ROOT ROUTING**: `value.js demo` — either (a) make `useMixingState`'s
transition schedule read its timings FROM `useMixingAnimation`'s
`FILL_DURATION`/`STAGGER`/`SUFFUSE_DURATION`/`SHRINK_DURATION` constants (one
authored clock, not two), or (b) drive `animationPhase` off `animationend`-style
completion events the canvas loop emits rather than parallel `setTimeout`s. Kill
the generic spinner — the canvas IS the loading indicator. This beat is also
**absent from the R.W4/S transition-inventory.md** entirely (it isn't a Vue
`<Transition>` so §3's "non-Transition motion, mapped" table should have
carried it, and doesn't) — the inventory itself has a gap.
**Candidate wave-item**: *S.W-MOTION/M1 — unify the mix phase-clock to the
canvas's own duration constants; remove the redundant spinner.*

---

## §4 S-13 — the easing "pane" (the `GradientVisualizer.vue` easing accordion)

There is no standalone "easing pane" route — S-13's shot is the per-interval
**easing accordion** inside the Gradient view (`GradientVisualizer.vue:253-303`),
which seats glass-ui's published `<EasingPicker>` (`@mkbabb/glass-ui/easing`).
The boundary law is real and correctly enforced: curve math is 100% value.js
(`CSSCubicBezier`, `steppedEase`, `bezierPresets`, `parseSteps` — all imported,
zero re-implementation, verified in `useEasingPicker.ts:17-24`); the chassis
(draggable SVG, presets, readout, playback dot) is glass-ui. This part is
architecturally sound and not what's broken.

**What "not properly functional / not ANIMATED" (S-13) actually cashes out to,
verified against the code:**

1. **No ambient motion at all.** The travel dot only moves on an explicit
   "Trace the curve" button click (`playTravel()`, a **one-shot** rAF,
   `useEasingPicker.ts:239-249` — `if (t < 1) rafId = requestAnimationFrame(tick)
   else rafId = 0`, no loop, no auto-play on mount, no auto-replay). Compare
   to `../keyframes.js/demo/scenes/easing/` — a full looping gallery (ghost
   trails `useEasingGhost.ts`, a physics stage `EasingCurvePhysics.vue`, a
   render-graph-driven loop that self-arms on scene mount) — the sibling
   library's OWN easing facility is categorically richer and always-alive; the
   glass-ui primitive that value.js consumes is a bare click-to-preview widget.
   The README's own "loop playback seam" section **names this exact gap** and
   says the kf `Oscillator` will fill it "when it ships" — i.e. **this is
   already a booked, named successor**, not a fresh discovery; S-13 is the
   user re-surfacing a known, un-landed seam.
2. **Doc/reality drift inside glass-ui itself**: the primitive's own README
   claims "the optional spring-driven dot reads the library's `MOTION_CURVES`
   table" — grepped `MOTION_CURVES`/`springTimingFunction`/`spring` across
   `easing/*.ts`/`*.vue`: **zero hits** outside a code comment. There is no
   spring-preview mode; the picker's `EasingPickerMode` is only
   `"bezier" | "steps"`. The README oversells the shipped feature.
3. **Zero PRM gate on the one rAF that exists** — `grep prefers-reduced-motion
   useEasingPicker.ts EasingPicker.vue` → 0 hits. Every OTHER decorative rAF
   loop in this codebase is deliberately PRM-gated with a documented rationale
   (`useMixingAnimation.ts:56-63`, `useGamutOverlay.ts:82`,
   `useSpectrumCrossfade.ts:35`) — this is the one exception, and it's
   undocumented as an exception (arguable it's exempt as an authoring TOOL
   akin to a video scrubber, but that argument isn't made anywhere in the
   component).
4. **Two clicks to see anything move**: the accordion row is collapsed by
   default (only `openInterval = 0` starts open, `GradientVisualizer.vue:115`)
   AND the picker inside requires the separate "Trace the curve" click — the
   distance between "I want to see the easing" and "I see motion" is two
   discrete user actions, for a component whose entire value proposition is
   showing motion.

**ROOT ROUTING**: primarily `glass-ui producer` (`EasingPicker.vue` /
`useEasingPicker.ts` — land the named `loop` seam: auto-play once on mount or
idle-loop the travel dot at low opacity; correct or implement the
`MOTION_CURVES` README claim; PRM-gate `playTravel`'s rAF like every sibling
loop in the constellation). Secondary `value.js demo`
(`GradientVisualizer.vue` — consider defaulting the FIRST interval row's
picker to auto-play once when it opens, so the "Easing" section shows a
curve trace without a second click).
**Candidate wave-item**: *S.W-MOTION/M2 — land the EasingPicker `loop` seam
(auto-play or idle-loop the travel dot, PRM-gated); correct the MOTION_CURVES
README claim or wire it.*

---

## §5 Non-token duration census (beats living outside the vj-family / token system)

| Site | Literal | Token equivalent it bypasses | Notes |
|---|---|---|---|
| `demo/color-picker/App.vue:70` `.pane-wrapper--right` inline `transition-opacity duration-200` | Tailwind's raw `200` scale step (200ms, unrelated to any `--duration-*` custom property) | `--duration-fast` (0.2s) — numerically equal today, but NOT wired, so a token retune silently orphans this site | Drives the right-slot ghost↔populated fade — a REAL, undocumented 4th mechanism never itemized in transition-inventory.md's §3 mapping table |
| `demo/@/components/custom/gradient/GradientVisualizer.vue:275` chevron `transition-transform` (no duration modifier) | Tailwind v4's built-in `--default-transition-duration` (150ms) — not overridden anywhere in `style.css`'s `@theme` block | Same class of gap, smaller stakes (a chevron rotate) |
| **Systemic**: `grep -rl 'transition-transform\|transition-colors' demo/@ demo/color-picker --include='*.vue'` → **21 files**, of which **4 confirmed** use the bare (no `duration-[…]`) form | Tailwind default 150ms | These sit OUTSIDE the R.W4 inventory's stated scope (it only covers `<Transition>` + an explicitly "mapped" non-Transition list) — the token discipline has a real blind spot at the Tailwind-utility layer |
| `useMixingState.ts:86,91,99,104` `800`/`2300`/`2900`ms | none — bespoke, and (per §3) internally inconsistent with its own paired canvas file | the P0 finding above |
| `ColorPicker.vue:338` `plate-land 560ms` | borrows `--spring-snappy` CURVE, not the 0.4s `--spring-snappy-duration` | **documented bespoke literal**, internally consistent with the 3-beat total — KEEP (not a defect, listed for completeness) |
| `PointerDebugOverlay.vue:179` `blink 0.5s infinite` | none | dev-only debug overlay, zero end-user exposure — no action |

**Root-level fix available for the systemic row**: Tailwind v4's `@theme` block
(`demo/@/styles/style.css:68`) can set `--default-transition-duration:
var(--duration-fast)` and `--default-transition-timing-function:
var(--ease-standard)` ONCE — every bare `transition`/`transition-colors`/
`transition-transform`/`transition-opacity` utility across all 21 files then
inherits the app's own motion tokens with zero per-site edits (the DRY,
at-the-root fix — no per-site chase, no proof-script reintroduction).
**Candidate wave-item**: *S.W-MOTION/M3 — alias Tailwind's default transition
duration/timing to the app's own tokens at the `@theme` root; audit the 21-file
census opportunistically as touched.*

---

## §6 Compositor-fighting census (top/left/margin/height/width vs transform/opacity)

| Site | Properties transitioned | Verdict |
|---|---|---|
| `demo/color-picker/App.vue:269-273` `.pane-wrapper` (applies to ALL THREE pane-wrapper divs: mobile, desktop-left, desktop-right) | `height`, `margin`, `padding` @ `--duration-slow` (0.45s) | **Already flagged** by `perf-transitions.md` P1-2 at this exact site — this lane corroborates + extends: the class applies to all 3 wrappers (not one), so the layout-reflow tax fires on every pane-content resize, not only the view-swap beat perf-transitions measured |
| `demo/@/components/custom/color-picker/ColorPicker.vue:314-318` `.pane-shell` | `margin`, `transform` @ `--duration-normal` (0.3s) | **NEW site** (distinct from the App.vue one above, same anti-pattern) — `margin` is layout-triggering, paired with `transform` in the SAME transition list, so the browser cannot promote this element to its own compositor layer for the free half of the pair; the whole point of `transform` (cheap) is undone by co-transitioning `margin` (expensive) |
| Right pane-wrapper's independent `transition-opacity duration-200` (§5) | `opacity` only | compositor-safe in isolation, but see §5 — it's a 4th mechanism stacked on top of the other two |

**ROOT ROUTING** for both: `value.js demo`. Split each site into (a) a
`transform`/`opacity`-only transition (compositor path) for the geometry that
actually needs motion, and (b) either drop the `margin`/`height`/`padding`
animation entirely (if the vj-enter family already carries the perceived
motion — likely true per perf-transitions.md) or, if a genuine layout morph is
wanted, gate it to non-WebGL-adjacent panes only (never on a pane hosting the
hero blob / spectrum canvas, both live during the swap).

---

## §7 PRM ledger (every rAF / animation-driving site, gated or not)

| Site | Gated? | Mechanism |
|---|---|---|
| `useMixingAnimation.ts` (mix canvas fill/suffuse/shrink) | **yes** | `useBreakpoint("(prefers-reduced-motion: reduce)")`, documented rationale (phase machine still advances via its own — mismatched, §3 — timers; only the decorative canvas is skipped) |
| `useGamutOverlay.ts` | **yes** | `useMediaQuery`, hatch phase frozen at 0 |
| `useSpectrumCrossfade.ts` | **yes** | `window.matchMedia(...).matches` guard before snapshotting |
| `ColorPicker.vue` plate-land / stagger-children / `.stagger-children` utility | **yes** | wrapped in `@media (prefers-reduced-motion: no-preference)` |
| global CSS transitions/animations (`animations.css:184-193`) | **yes** | blanket `animation-duration:0.01ms!important` / `transition-duration:0.01ms!important` |
| reka `[data-state]` overlay opacity | **yes (carve-out)** | 150ms literal opacity-only exemption, documented, source-order-dependent (must follow the blanket guard) |
| glass-ui aurora RAF | producer-owned, out of scope | claimed self-gating (not re-verified this lane) |
| HeroBlob WebGL RAF (`useMetaballRenderer`) | **partial** — has a `paused` flag the demo doesn't drive at idle (perf-transitions P0-2); no PRM-specific gate found in this lane's grep | flag jointly with perf lane's P0-2 |
| **glass-ui `EasingPicker` `playTravel` rAF** | **NO** | zero `prefers-reduced-motion` reference anywhere in `easing/*.ts`/`*.vue` — the ONE ungated rAF this lane found, and it's a producer surface (§4) |

**Verdict**: the demo's own PRM discipline is genuinely good (5/6 demo-owned
sites gated, with rationale comments at each site — this is not boilerplate,
someone actually thought about each one). The one hole found is in glass-ui's
`EasingPicker`, and it's low-stakes (a curve-authoring tool's preview dot,
arguably closer to "video scrubber" than "decorative ambient motion" — but
that argument should be made explicitly in the component, not left implicit).

---

## §8 The "slow" verdicts, with numbers (feeds S-9)

| Claim | Number | Industry reference | Verdict |
|---|---|---|---|
| View-swap spring (perf-transitions P1-4) | 0.45s transform (vj-enter) atop a 254.7ms mount-stall frame (design-dock-shell P1-6) | 150-250ms typical for a view/tab switch | **slow**, compounded by the stall — already the tranche's top perf ask; this lane adds: the spring duration alone (0.45s) would read fine on a clean frame, the 254.7ms stall is what makes it read as broken, not merely slow |
| Dock hover-expand (`--duration-panel`, this lane, §2) | 0.55s | 150-250ms for hover-driven chrome | **slow** — new number this lane contributes; not previously cited by name in perf-transitions.md (which measured the frame-cost, not the declared duration) |
| Orchestrated open total breath (this lane, §2) | 1.1-1.2s | 300-600ms for a tool's mount breath (not a splash) | borderline — well-authored, PRM-safe, but worth a retune pass |
| Mix "mixing" wait | phase machine forces a 2.9s wall-clock wait regardless of visual state (§3) | — | the DEFECT (visual truncation) matters more than the total length here |

## §9 Retune table (the concrete asks for the design lanes to bless)

| # | Site | From | To (proposed) | Basis |
|---|---|---|---|---|
| 1 | `--duration-panel` consumers split: dock hover-morph vs `--view-hue-shift` sweep | one 0.55s token, two jobs | give the passive hover-morph its OWN token (e.g. `--duration-hover: 0.2-0.25s`) distinct from the emphasis-grade view-hue sweep, which can keep 0.55s | §2 dock-morph row |
| 2 | mix phase clock | 800/2300/2900ms (`useMixingState.ts`) vs 1800/600/600ms (`useMixingAnimation.ts`) — mismatched | derive one clock from the other; suggested total ≈ 1800(+stagger) + 600 + 600 | §3 |
| 3 | Tailwind bare-utility transitions (21-file census) | un-tokened 150ms default | `--default-transition-duration: var(--duration-fast)` in `@theme` | §5 |
| 4 | `.pane-wrapper` / `.pane-shell` layout-property transitions | `height`/`margin`/`padding` co-transitioned with/alongside transform | transform/opacity only; drop or isolate the layout morph | §6 |
| 5 | `EasingPicker` travel dot | one-shot, click-gated, no PRM | auto-play-once on mount or idle-loop (the named `loop` seam), PRM-gated | §4 |
| 6 | Orchestrated open total | 1.1-1.2s | candidate trim to ~700-900ms (design lane's call, not this lane's) | §8 |

---

## Candidate wave items (summary)

| Item | Covers | Root |
|---|---|---|
| S.W-MOTION/M1 — unify the mix phase-clock to the canvas's own duration constants; remove the redundant spinner | §3 (NEW P0) | value.js demo |
| S.W-MOTION/M2 — land the EasingPicker `loop` seam (auto-play/idle-loop, PRM-gated); correct or wire the `MOTION_CURVES` README claim | §4 (S-13) | glass-ui producer (+ demo default-open tune) |
| S.W-MOTION/M3 — alias Tailwind's default transition duration/timing to the app tokens at the `@theme` root; opportunistic 21-file census sweep | §5 | value.js demo |
| S.W-MOTION/M4 — split dock hover-morph off `--duration-panel` onto its own hover-scale token | §2, §9#1 | glass-ui producer (shared token) or demo-scoped override |
| S.W-MOTION/M5 — transform/opacity-only pane-wrapper/pane-shell transitions (kill the co-transitioned layout properties) | §6 | value.js demo |
| S.W-MOTION/M6 — inventory patch: add the mix beat + the right-pane ghost-fade to transition-inventory.md's §3 non-Transition mapping table | §3, §5 (inventory hygiene) | docs only |

All findings are demo-composable/CSS-level or glass-ui-producer; none require
`value.js src` math changes (the curve math value.js already provides —
`CSSCubicBezier`, `steppedEase`, `lerp`/`easing.ts` — is correctly consumed
wherever checked; S-24's library-core angle turned up clean on this lane's
pass, consistent with `perf-transitions.md` P2-2's verdict).

---

## §10 — W9-close disposition (the M6 docs-patch row, APPLIED)

**Applied 2026-07-06 at S.W9 close** (`audit/w9-close-probes.md §6`). The M6 candidate item
asked for an inventory patch adding "the mix beat + the right-pane ghost-fade to
`transition-inventory.md`'s §3 non-Transition mapping table." That target
(`docs/tranches/R/audit/R.W4-visual-runtime/transition-inventory.md`) is **R-closed history**
and outside the S.W9 file bounds, so it is NOT edited; the current motion truth is recorded
here instead, in the S corpus. The underlying findings landed in the S waves — the R-inventory
§3 gap is therefore **superseded**, not merely documented:

| M-item | §-ref | S disposition (landed) |
|---|---|---|
| **M1** — mix phase-clock unify + kill spinner | §3 (P0-M) | **CONSUMED by W3-6 / Q10 first-principles REPLACE** (`5c700fe`): the two-clock mismatch is gone — one clock, `mixStage.ts MIX_CONVERGE_MS = 900`, total ≤1.2 s (`useMixingAnimation.ts` "the phase machine owns no timers"), the redundant `animate-spin` spinner removed. The original R-inventory "add the 2.9 s mix beat" content is MOOT (the beat was re-authored) |
| **M3** — Tailwind bare-utility → app tokens at `@theme` root | §5, §9#3 | **LANDED** at the DRY root: `demo/@/styles/style.css:119-120` sets `--default-transition-duration: var(--duration-fast)` + `--default-transition-timing-function: var(--ease-standard)`. Every bare `transition*` utility (incl. the App.vue `duration-200` right-pane ghost-fade + the GradientVisualizer chevron) now inherits the app's motion tokens — the §5 "21-file blind spot" is cured at the root with zero per-site chase. The right-pane ghost-fade M6 wanted to itemize is now token-wired, not un-tracked |
| **M4** — dock hover-morph off `--duration-panel` | §2, §9#1 | **producer-owned** → letter L13 (glass-ui shared token); rides the W8 adopt |
| **M5** — pane-wrapper transform/opacity only | §6 | retuned at **W3-4/W3-5** (`d45a5bb`/`3824b95` — pane-swap payload defer + spring 0.45→0.3 s) |
| **M2** — EasingPicker loop seam, PRM-gated | §4 (S-13) | demo half LANDED at **W5-9** (`a83a074`); the producer `loop` seam + `defineExpose(playTravel)` is **letter L7** (open producer rider, `w9-close-probes.md §2/§6`) |
| **M6** — inventory patch | §3, §5 | **this section** — applied in-bounds; the R-inventory §3 mapping gap is superseded by M1 (mix re-authored) + M3 (bare-utility tokenized at root) |

Net: the motion-truth blind spots this lane found are cured in-tree (M1 re-authored, M3
tokenized at the `@theme` root, M5 retuned); the residual asks are producer-side (M2→L7,
M4→L13), riding the un-fired S.W8 adopt. No R-closed doc was edited.

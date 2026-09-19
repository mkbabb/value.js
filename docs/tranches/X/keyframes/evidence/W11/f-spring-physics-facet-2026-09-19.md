SERVED MODEL: claude-fable-5-1

# KF.W11.f — the spring-physics-facet packet (P5) · evidence · 2026-09-19

Unit `KF.W11.f` (Track B · X·KF · phase 3). Spec `docs/tranches/X/keyframes/waves/KF-W11.md` §Agent Units `:249-253` · §Carry P5 `:191-193` · §Bounds `:119` · §Gates G-KFW11-5 `:297` · §Sequencing 8 `:324` · §Commit plan 5 `:380`. Home records `registry/adjudicated/kf-SpringHeatmap.md` (`:132`, the packet line) and `kf-SpringPhysicsFacet.md` (`:40` SPF-3 · `:41` SPF-4 · `:42` SPF-5 · `:47` SPF-7 · `:53` SPF-13). Writable set: `demo/scenes/spring/SpringHeatmap.vue` · `demo/scenes/spring/SpringPhysicsFacet.vue` · `test/demo/scenes/spring-heatmap-reversibility.test.ts` (create) · this file · the wave record.

**Seat shape, disclosed.** The dispatch names a tri-fold (Fable-worker ∥ Opus-worker → fresh-Fable arbiter) for the field-encoding decision. This seat is ONE Fable seat with no spawn tool; no sibling draft of the decision exists in `evidence/W11/` (⟨cmd⟩ `ls evidence/W11/` → seven files, none `f-*`). The decision below is this seat's alone, written and committed BEFORE any product byte (§Sequencing 8), and the receipt says so rather than claiming an arbitration that did not happen.

## §0 Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → 2 untracked rows, both `docs/tranches/V/coordination/VALUEJS-INBOUND-*` mail packets — outside this unit's set, untouched. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → `M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's) · `M scripts/dev/dev.sh` (unowned, never staged) · 3 untracked `docs/tranches/X/fourier/evidence/w3/*` (Track C's). **Zero inherited hunks on any path this unit may write** — `SpringHeatmap.vue`, `SpringPhysicsFacet.vue` clean; the test file absent; `evidence/W11/f-*` absent. Nothing to finish, nothing to rewrite.

Substrate at open: ⟨cmd⟩ `git rev-parse --short HEAD` → `0e604af8` · `origin/master` → `2b649a1d` (local is ahead: `.c`/`.g`/`.h` landed on `master` unpushed — this unit commits on the same `master` by pathspec, the roster every landed unit has used).

## §1 Anchors re-resolved at the true bytes (KF-AT-28 / D-19)

`SpringHeatmap.vue` is **383 L** at `0e604af8` (the bank read 338 L at `8281638c`; KF.W6 `a6418729` and the canvas-discipline commit moved it). The bank's rows, at today's bytes:

| row | banked anchor | true bytes at `0e604af8` |
|---|---|---|
| D-B1 legend | `:50-53` | `:57-60` — `← underdamped (rings)` / `critical / overdamped →` in a horizontal flex row; ζ = f(row) at `:151-152`; the aria-label `:39` says "damping (vertical)" |
| D-B2 / D-M8 | paint `:163-171` | `bakeRamp` `:144-165` (tint = f(row) only, `Math.pow(os, 0.7)`), `paint` `:195-205` — 400 `fillRect`s for 20 bands |
| D-M1 + rider | `aspect-ratio: 11/13` + `max-height: 16rem` | `:337-338`, the "true scale" comment intact |
| D-M2 / D-M3 / C-M-1 | raw `watch(isDark)`, raw `getPropertyValue` | **LANDED-BY KF.W6** — `resolveCanvasColor` `:67`/`:159`, `onFlipSettled` `:303-310`. Not this unit's; consumed as landed. |
| D-M4 | border fg 10% | `:339` |
| D-M5 / N-SH-6 | `@pointerdown` only, no `touch-action`, no guards | `:41`, `:255-258`; no `touch-action` in the scoped block (`:336-346`) |
| L-M-1 / N-SH-4 | `stepR = 0.055`, half-cell constants, `*100/100` | `:262-263`, `:90-91`, `:251-252`, `:285-288` |
| N-SH-1 | `fieldEl.focus()` after a pointer navigate | `:257` |
| N-SH-2 | `switch (e.key)`, no modifier read, no `stopPropagation` | `:267-284` |
| N-SH-3 | the reactive `:style` justified by "moves only on a param edit" | `:46-48`; the transition `:373` |
| L-M-7 / C-M-2 / C-M-3 | `defineProps<{ demo }>`; four writes through the prop | `:73-74`; writes `:251-252`, `:285-288`; facet mount `SpringPhysicsFacet.vue:52` |
| L-M-2 | `--ball-tone` fallback prose | `:118`, `:333-335`, `:348-349`, `:365-368` |
| L-M-5 | four range literals ×2 files | heatmap `:78-81` vs facet `:26-28`/`:36-38` |
| L-M-6 | the 507× bench, three sites | `:8`, `:105`, facet `:47` |
| L-m-1 | the empty watcher | `:323-328` |
| L-m-2 / N-SH-4 | `defineExpose({ HALF_CELL_* })` | `:319` |
| L-m-3 | `clientWidth` / `cqw` / `getBoundingClientRect` | `:180-181`, `:223`, `:234` |
| C-m-6 | `overflow-hidden` + −0.45rem margins | `:37`, `:361-362` |
| SPF-3 | `clamp(values[i] ?? 0, 0, 1)` | facet `:169` — ⟨cmd⟩ `grep -c 'clamp(values\[i\] ?? 0, 0, 1)' SpringPhysicsFacet.vue` → **1 · 1** |
| SPF-4 | Chip ×4, `mode="selectable"` | facet `:78-98` |
| SPF-5 | active wash 12 % | facet `:241` |
| SPF-7 | two `!important` | facet `:237`, `:241` — ⟨cmd⟩ `grep -c '!important' SpringPhysicsFacet.vue` → **2 · 2** |
| SPF-13 | `:title="t.preset.blurb"` | facet `:83` |
| KF-SS-37 | `.spring-pane` one usage, zero definitions | facet `:15`; ⟨cmd⟩ `grep -rn 'spring-pane' demo` → the one usage |

Gate at open, double-run: ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/spring-heatmap-reversibility.test.ts` → `No test files found` · `No test files found`. Ratchet at open: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **24** at `0e604af8` (the banked 54 has already fallen through `.r`/`.a`/`.b`/`.d`/`.c`); **0** of the 24 are in this unit's rows (⟨cmd⟩ `… | grep -c 'SpringHeatmap\|SpringPhysicsFacet'` → **0**).

## §2 THE DECISION — written before the family opens (§Sequencing 8; the D-B1·D-B2·D-M8·D-M1 core as ONE decision)

**What the field encodes.** ONE quantity: the **exact analytic peak overshoot** of the unit-step response, `overshoot(ζ) = exp(−ζπ/√(1−ζ²))` for 0 < ζ < 1, `0` for ζ ≥ 1. It is a function of the damping fraction ALONE; the response time sets ω₀ = 2π/response and scales the time axis, never the peak. **The field says so** instead of dressing a 20×1 signal as a 20×20 landscape (D-M8): the legend reads *"peak overshoot 0 → 53 % · tint follows ζ only — response sets tempo, not peak"*, and the tint is painted as horizontal bands, one per damping node, not as 400 rectangles. The corpus's other honest form — settle time on x — is **declined with its reason**: the only closed form the corpus has for settle time is the envelope approximation P.W6 measured at 26 % error against the live solver, and importing an approximate second channel into an instrument whose one virtue is exactness (the record's superlative 1) would cost more truth than it buys; the reserved second channel stays reserved for T-SPR-6's merged instrument, which remains design-PENDING (facet header `:9-11`). A bivariate field (tint = overshoot, iso-lines = settle time) was priced and declined on the same ground plus KISS (E-2).

**On which axes.** x = response, 0.10 → 1.20 s, left → right (a NAVIGATION axis, declared informationless for the tint). y = damping fraction ζ, 1.50 at the TOP → 0.20 at the BOTTOM (calm above, ringing below — the conventional reading the paint loop already used). The **ζ = 1 critical line** is drawn across the field at its true y (38.46 % from the top) with the tag *"ζ = 1"*; the regimes are labelled ON THE VERTICAL AXIS where they belong (D-B1): *"overdamped · no overshoot"* in the top region, *"underdamped · rings"* directly under the critical line. Both labels sit on the 0 % bands (muted-foreground over `--background`: 5.21:1 light / 7.70:1 dark, this seat's token battery below). A left gutter carries the ζ ticks `1.5` · `1.0` · `0.2` at their true positions; a row under the field carries `0.1 s` · *response (s) →* · `1.2 s`.

**At what scale.** Linear in overshoot, normalised to the field's own maximum: `mix% = 100 · overshoot(ζ) / overshoot(0.2)`, `overshoot(0.2) = 0.5268` → the bottom edge is the full accent, ζ ≥ 1 is 0 %. Colour = `color-mix(in oklab, var(--color-progress) mix%, var(--background))` — the same accent seam, the same mix space the shipped ramp used, the gamma dropped (a gamma is a scale the legend cannot show; linear is what a swatch labelled `0 → 53 %` can be honest about). Bands: one per damping node ζ_j = 1.5 − 0.05·j, j = 0..26 (27 bands; the two end bands half-height), so **the tint under the pointer is the overshoot of the value a click writes** — the band IS the lattice row. The mix table at these 27 nodes (the D-B2 snapshot the test freezes): `0 ×11 · 0 · 0 · 1 · 3 · 5 · 9 · 13 · 18 · 24 · 31 · 39 · 48 · 59 · 71 · 84 · 100` (%, rounded) — computed from the formula in the test, never hand-copied. Half the field is flat at 0 % because half the field has no overshoot; that is the physics, and the region label says it. Presets land at smooth 1 % · snappy 13 % · bouncy 39 % · gentle 0 % of the accent — smooth and gentle indistinguishable because their peaks (0.5 % / 0 %) are.

**With what legend.** (1) A continuous swatch `linear-gradient(in oklab to right, mix 0 %, mix 100 %)` — the same two colours, the same interpolation space, the exact continuous form of the banded field — labelled `0` and `53 %` with the words *"peak overshoot · tint follows ζ only"*. (2) The critical line + the two regime labels (the vertical legend). (3) The four preset pips, plotted at their true (response, ζ) with their names under them (N-SH-5) — passive marks (`aria-hidden`, `pointer-events: none`); the Chips below stay the ONE preset surface. (4) The lattice pitch stated: *"0.05 lattice"*. (5) The readout `0.50 s / ζ 0.86` (already shipped) is the field's accessible description.

**Geometry (D-M1 + rider).** The `aspect-ratio: 11/13` "true scale" annotation is DELETED, not restored: seconds and a dimensionless ratio admit no common unit, so no aspect is true (reader-1 M-4, admitted). The field is a layout choice, stated as one: `block-size: 16rem`, inline-size = the rail's content width. The `max-height` cap that always bound is gone with the ratio it was capping. `container-type: size` keeps its refutation (definite block-size + definite inline-size, no contents-derived collapse).

**Render route.** The canvas is DISSOLVED into a CSS background (C-M-4's route, the record's third honest form; KF.W6's canvas discipline — `resolveCanvasColor` + `onFlipSettled` — was correct for a canvas and is simply no longer needed once there is none). 27 bands = one `linear-gradient(to bottom, …)` of 27 hard stops built from the same `overshoot()`; the theme flips through the cascade (no re-bake, no race by construction — D-M2's class dies with the mechanism); no DPR, no resize observer, no `fillStyle` (G-W6-11's "no unresolved token stream reaches a fillStyle" is satisfied by there being no `fillStyle`); forced-colors keeps the DOM line, ticks, labels and pips (a bitmap kept nothing — D-M6's non-colour channel arrives with them). The `overflow-hidden` that clipped the marker at the extremes (C-m-6) is not needed by a background (border-radius clips it) and goes.

## §3 The input-integrity core (L-M-1 · N-SH-1 · N-SH-2 · D-M5 · N-SH-6 · N-SH-4) — one lattice, one gesture/focus spec, one tolerance

**One lattice.** Both axes carry a node lattice of **pitch 0.05**, anchored at the range minimum and ending exactly at the maximum (0.10 → 1.20 = 22 pitches; 0.20 → 1.50 = 26 pitches). Every node lies on the sliders' 0.01 grid, so **no re-quantisation exists**: `snap(f) = round(min + round(f·span/pitch)·pitch, 2)` is exact in hundredths. The pointer path writes the nearest node; the arrow path steps ±1 pitch in INTEGER HUNDREDTHS (`(round(v·100) ± 5) / 100`, clamped to the range), so from any node the walk stays on nodes and from any slider value the offset is preserved. **Reversibility**: every unclamped step is exactly invertible (`step(step(v,+1),−1) === v` for all 111 response / 131 damping hundredths where the step is not clamped; a clamped step lands on the range end, which is a node, and every walk from there is invertible). The banked 84/111 and 95/131 failures were the 0.055/0.065 half-hundredth steps re-rounded; they cannot recur on integer arithmetic.

**One honest published tolerance.** The click→param error is **exactly ≤ pitch/2 = 0.025** on both axes (no rounding leak to add). It is published in three places that agree: the legend text, the exported `LATTICE` constant (the gate witness), and the aria-label. The false `HALF_CELL_*` expose (0.0275/0.0325 vs a true 0.0325/0.0375) is deleted with L-m-2.

**One gesture spec (D-M5 + N-SH-6, folded with L-m-3).** `touch-action: none` on the field (the declaring idiom the sibling scenes use — a pan beginning on a 2-D pad is the gesture, not a scroll). `pointerdown`: refused unless `button === 0 && isPrimary` and no pointer is latched (re-entrancy); latch `pointerId`, `setPointerCapture`, navigate, focus. `pointermove` with the latched id: navigate (the sweep the crosshair advertised); with no latch: update the hover cell. `pointerup` / `pointercancel` / `lostpointercapture` with the latched id: release. All mapping reads ONE box — the content box (`rect + clientLeft/Top`, `clientWidth/Height`), which is also the box `cqw`/`cqh` and the background resolve against (L-m-3 cured by construction).

**One focus spec (N-SH-1).** The field keeps `fieldEl.focus()` on pointerdown (keyboard access after a click — the Safari half of L's S-5) and DISCLOSES the capture: a scoped `:focus:not(:focus-visible)` arm draws the same demo ring (`--focus-ring-shadow`, the token `.kf-focus-ring` already consumes; forced-colors outline beside it). A widget that swallows the arrow keys while focused shows that it has focus, the way every text input does.

**One key spec (N-SH-2 site).** Any modifier → the field does NOT handle the key (Alt/Meta/Ctrl/Shift+Arrow reach the browser and the registry exactly as they would from any non-widget; the history-back and word-nav swallowing ends). A bare arrow the field takes is CLAIMED for that keypress — `preventDefault()` AND `stopPropagation()` — the KF-SS-30 precedent landed at `SpringTarget.vue:475-483` ("A slider that has taken a key owns it for that keypress"). The producer seam (the window registry checks neither `defaultPrevented` nor composite-widget ownership) is NOT cured here; it rides SS-6 as banked (kf-AnimationControlsGroup M-1, carrier #2) and `.j` relays it.

**Announcement (D-B3's lattice-gated half).** A visually-hidden `aria-live="polite"` region INSIDE the application announces field-originated writes (`"0.55 s, ζ 0.86"`); the readout is `aria-describedby`'d to the field; the aria-label is rewritten shorter and true. `role="application"` stays (arrow keys must reach the widget in SR browse mode). The full D-B3 decision (sliders-as-AT-path vs a two-value slider pair) is KF.W9's witness row and is not re-taken here.

## §4 The contract (L-M-7 / C-M-2 + C-M-3)

`SpringHeatmap.vue` drops `defineProps<{ demo }>` for two named models: `defineModel<number>("response", { required: true })` and `defineModel<number>("dampingFraction", { required: true })`. The facet binds `v-model:response="demo.response.value"` / `v-model:damping-fraction="demo.dampingFraction.value"` — the same two refs its two sliders write through their declared `@update:model-value`, now through the same declared seam. The heatmap becomes instantiable with two numbers (the test mounts it with nothing else). The preset pips read `SPRING_PRESETS` directly (a static module, the same one `demo.tracks` was built from) — no context needed.

## §5 N-SH-3 — the marker's transition

Decision: **kill the transition during streams, keep it for discrete edits** (the record's first option; the animation is preserved, not deleted). Mechanism: the component times its model writes; a write landing within one transition-duration of the previous one is part of a stream (a slider drag, an arrow key-repeat, the field's own sweep) and is tracked 1:1 (`transition: none` via a state class); an isolated write (a click, a preset, a single arrow press) glides. The duration is read ONCE from the element's own computed `transition-duration` — the token's value, never a duplicated literal (the L-m-4 class). `will-change: transform` stays earned (K-10). The PRM arm stays (one transition declared, one killed). The LabeledSlider commit-seam datum (`valueCommit` = 0 in the installed dist) rides SS-6.

## §6 D-M4 + D-M7 + N-SH-5 (with the ramp redesign)

D-M4: the boundary becomes `1px solid color-mix(in srgb, var(--foreground) 50%, transparent)` — the smallest foreground mix that clears WCAG 1.4.11's 3:1 against BOTH the field's own 0 % fill and the card in BOTH themes (this seat's battery: light 3.32 / 3.20 · dark 4.49 / 3.16; the shipped 10 % reads 1.22 / 1.18 · 1.22 / 1.17; 45 % fails light at 2.87). D-M7: a hover cell — one lattice cell (100/22 cqw × 100/26 cqh, clipped at the edges) outlined at the node the pointer would write — surfaces the lattice before the click and is the preview; the critical line + ticks + labels are the non-colour channel. N-SH-5: the four preset pips with names (above). The active cell is the marker itself (it sits on the node after any field write).

## §7 The facet (SPF-3 · -4 · -5 · -7 · -13 + KF-SS-24/-25/-28/-37)

**SPF-3.** The painter maps the track value through the symmetric remap `[−0.25, 1.25] → [0, 1]`: `x = (clamp(v, −0.25, 1.25) + 0.25) / 1.5`. Geometry stated: rest (0) sits at 16.7 % of the track, the target (1) at 83.3 %, and the rail is inset to span exactly [0, 1] so an overshoot visibly leaves the rail's end; the headroom 0.25 exceeds the largest preset peak (bouncy 0.205 above AND below — the tracks retarget in both directions, `useSpringDemo.ts:393`/`:429`, so undershoot on a downward retarget is real and symmetric). The four analytic peaks 1.005 / 1.068 / 1.205 / 1.000 map to 83.7 / 87.9 / 97.0 / 83.3 % — distinct, monotone, unclamped. L's cure #2 is not taken (K-10). SPF-15's extraction needs a new file outside the set — carried, named.

**SPF-4.** The `ToggleGroup` port (`@mkbabb/glass-ui/toggle-group`, `type="single"`, the `EasingTarget.vue:116` precedent): reka renders the items `role="radio"` + `aria-checked` inside a `role="group"` with `aria-label`, roving focus, and the derived `:model-value` makes the set un-deselectable by contract (a deselect emits `undefined`, which the facet ignores). The single-mode track plate is reset on the host exactly as `EasingTarget.css`/`.specimen-grid` does (the KF-KC-10-shaped interim override; the producer's track opt-out ask already rides mail from KF.W7's easing wave and is cited, not re-minted). The producer's `[data-state=on]` accent paint is overridden by the scoped preset rules. `:title` survives the item's attr filter (`primitive-B2t2jdqM.js` strips only `as`/`asChild`). The producer constraint (the Chip's selectable filter strips `role`/`aria-pressed`) rides SS-6 as a rider on KF-ET-4's letter.

**SPF-5.** The mix is cured, not the ink: active wash 12 % → **8 %** (muted readout 4.465 → **4.70** light, AA; dark 6.58 → 7.01), hover 8 % → **6 %** (4.83 light / 7.20 dark) so hover and active stay distinct by wash AND outline (35 % / 65 % dashed).

**SPF-7.** Both `!important`s deleted. (≡ KF-SS-25.) The scoped rules outrank the producer's `@layer components` toggle-group rules by layer order alone.

**SPF-13 / KF-SS-24.** `complete_with_misses`: KF.W12's OPTIONS-UNIT has not recorded KF-CO-47's decision (⟨cmd⟩ `grep -n 'CO-47' execution/B/KF-W12.md` → `:318` only, the plan line "write the KF-CO-47 decision down"; no receipt exists). `:title` stays on the items and the re-sample button; the tooltip-vs-slotted-copy decision is spent when W12 records it.

**KF-SS-28.** Carried with rationale: `.keyframes-editor-scroll` contains the editor's own focusable per-stop controls, so the region is keyboard-reachable through its children; the artifact `<code>` half is `.g`'s file. The focusability probe stays SS-13's.

**KF-SS-37.** `.spring-pane` (one usage, zero definitions) deleted from the Card.

## §8 Token battery (this seat's own; sRGB/oklab arithmetic from the installed token values — `color-radius.css` light, `dark-arm.css` dark, `style.css:167` the accent)

```
light  SPF-5 wash 0/6/8/10/12 % → muted 5.21 / 4.83 / 4.70 / 4.58 / 4.47 (12 % = the banked 4.464)
dark   SPF-5 wash 0/6/8/10/12 % → muted 7.70 / 7.20 / 7.01 / 6.80 / 6.58
light  D-M4 border fg 10/45/50 % → vs field 1.22 / 2.87 / 3.32 · vs card 1.18 / 2.77 / 3.20
dark   D-M4 border fg 10/45/50 % → vs field 1.22 / 3.83 / 4.49 · vs card 1.17 / 2.70 / 3.16
light  ramp label ink: muted on 0–5 % ≥ 4.89 · foreground on 16 % 13.65 · on 45 % 9.01 · 100 % vs 0 % 4.81
dark   ramp label ink: muted on 0–5 % ≥ 7.38 · foreground on 16 % 13.22 · on 45 % 7.15 · 100 % vs 0 % 8.18
```
Script: `scratchpad/f/contrast.mjs` (this session; the formulas are WCAG 2.x relative luminance, `color-mix(in srgb)` as opaque component interpolation, `color-mix(in oklab)` as oklab interpolation).

## §9 Commit plan for this unit (§Commit plan 5 — one family per packet core + test)

1. `feat(kf/spring-physics-facet · X.KF.W11.f · the field decision + the two-model contract)` — SpringHeatmap.vue whole (the instrument-truth core D-B1 · D-B2 · D-M8 · D-M1+rider with the render route; the input-integrity core L-M-1 · N-SH-1 · N-SH-2 · D-M5 · N-SH-6 · N-SH-4 + L-m-3; N-SH-3; D-M4 + D-M7 + N-SH-5; the prose sweep L-M-2 · L-M-5 · L-M-6; the hygiene tail L-m-1 · L-m-2 · C-m-6) **and** the facet's binding hunk (`v-model:response` / `v-model:damping-fraction` — the contract's other half). **ONE sha, two files**: the record calls the core one decision and the contract one commit, and a heatmap whose prop surface changes in a different sha from its mount would leave one sha unmountable. The facet's other rows are staged AFTER this commit lands so the sha carries the binding alone from that file.
2. `fix(kf/spring-physics-facet · X.KF.W11.f · SPF-3)` — the painter's symmetric remap + the rail inset to [0, 1] (the stated geometry).
3. `fix(kf/spring-physics-facet · X.KF.W11.f · the preset cell surface — SPF-4 + SPF-5 + SPF-7 + KF-SS-37)` — the ToggleGroup port and the scoped paint rules it re-targets (the mix cure and the two `!important` deletions live on those same rules), the dead `.spring-pane` class.
4. `test(kf/spring-physics-facet · X.KF.W11.f · G-KFW11-5)` — the born-RED file.
5. value.js: this evidence file (before 1), the record receipt (after 4).

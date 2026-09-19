SERVED MODEL: claude-fable-5-1

# KF.W11.e — the spring-plot packet · evidence (P4 · `kf-SpringTrace.md:140`)

Seat: `KF.W11.e`, phase 3. Spec `docs/tranches/X/keyframes/waves/KF-W11.md` §Agent Units `:243-247` ·
§Carry P4 `:187-189` · §Bounds `:118` · §Gates G-KFW11-4 `:295` · §0 OP-4 `:43` · §Sequencing 2/8
`:318`,`:324` · §Commit plan 5 `:380`. Writable set: `demo/scenes/spring/SpringTrace.vue` ·
`test/demo/scenes/spring-trace-truth.test.ts` (create) · this file · the wave record.

**Tiering disclosure.** The dispatch card names a tri-fold (Fable-worker ∥ Opus-worker → fresh-Fable
arbiter) for the N-1 fork. This seat has no spawn surface (no Agent/Task tool in its roster; the only
messaging tools are deferred and address existing sessions). The fork below is therefore ONE Fable
seat's decision, written with its falsifiers so an arbiter can overturn it at the record; nothing here
claims a second arm was run.

## §0 Crash-recovery (standing law, first act) — 2026-09-19 06:01 EDT

⟨cmd⟩ `git -C ../keyframes.js status --porcelain -- demo/scenes/spring/SpringTrace.vue test/demo/scenes/spring-trace-truth.test.ts` → **empty**.
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B/KF-W11.md docs/tranches/X/keyframes/evidence/W11` → **empty**.
**ZERO inherited hunks on any path this unit may write; no inherited paths to name.** Dirty rows outside
the set (keyframes' two untracked `VALUEJS-INBOUND-*` letters; value.js `CARRY-LEDGER.md` and
`scripts/dev/dev.sh`) read and left untouched; `scripts/dev/dev.sh` never staged.

## §1 The open sha, and §Sequencing 2 as it actually reads

⟨cmd⟩ `git -C ../keyframes.js rev-parse --short HEAD` → **`0e604af8`** (keyframes.js `master`).
⟨cmd⟩ `git merge-base --is-ancestor cc8ef498 HEAD && echo ancestor` → **ancestor** — `.c`'s terminal
sha is in this seat's history. ⟨cmd⟩ `git diff --stat cc8ef498 HEAD -- demo/scenes/spring/SpringTrace.vue
demo/scenes/spring/SpringTarget.vue demo/scenes/spring/useSpringLinearStops.ts` → **empty**: the prop
surface `.e` banked (`<SpringTrace :response :damping-fraction>`, `defineProps<{ response; dampingFraction }>`)
is UNCHANGED at open.

**There is no M-3 sha.** `.c` returned M-4→M-3 as **ESCALATION KF11-E(c1)** (record `:1650-1676`):
the swap's bytes are `SpringTrace.vue`, a `.e` file, and `.c` did not write it. ⟨cmd⟩
`grep -c 'E(c1)' docs/tranches/X/COHESION.md docs/tranches/X/execution/LEDGER.md` → **0 · 0** — the
escalation is **UNRULED** at this clock. §Sequencing 2 ("`.e` after `.c`'s M-3 commit") is therefore
satisfied in the only form available: `.e` opens after `.c`'s TERMINAL commit, on the banked prop
surface, exactly as `.c`'s receipt said it would (`:1743`).

**What this seat does about M-4→M-3, stated before any byte.** M-3's DEFECT (the trace spans x∈[2,98];
both `??` guards dead) is the SAME identity as this packet's D-1 (`kf-SpringTrace.md:41` — "D-1 = L-1 =
C-1 … the implicit-position fill clobbers the anchors"; `kf-SpringTarget.md:51` — "M-3/C-2 … dies with
M-4's swap") and is CURED by this family under the route the spec fixes. M-4's SWAP (the parser dies;
the plot draws from `springTimingFunction().fn`) is `.c`'s row, escalated and unruled; **this seat takes
no act on it and prejudges nothing** — the parser it lands is the one the spec's own P4 orders
("the parser posture D-12/L-6/C-4 + the filter cell … inside the same family"), and a later ruling for
(ii) can delete it in one motion. One dated observation is added for the ruling seat, §2.

## §2 OP-4 re-measured at this unit's own clock — the draw route

⟨cmd⟩ `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` → **0** · **0**
(`dist/keyframes.d.ts` mtime 2026-09-19 03:03). **The export has NOT landed. Route taken: the
ANCHOR-HOIST MINIMUM** (spec `:43`, `:189`, `:295`): the resolver stays in the component and becomes
the CSS `linear()` rule in the engine's own phase order (anchors → monotone clamp → even distribution),
fail-explicit; the shared-builder route (`generateCurveSVGPath` + a range parameter) is NOT taken — it
needs a write to `demo/utils/reference-data/timingCurveUtils.ts`, outside this unit's set, and the spec
conditions it on the export.

**Dated observation for KF11-E(c1)'s ruling seat (not a ruling; a measurement).** The `.fn` route is
not a byte-exact substitute for the stops the plot labels: `springTimingFunction` samples a 64-interval
grid (`timing-function.ts` `sampleCount ?? 64`, `dt = maxDuration / 64`) and linearly interpolates,
while `springLinearStops` samples 25 intervals (`dt = maxDuration / 25`). Run against the SHIPPED
`dist/keyframes.js` at this seat, double-run identical:
⟨cmd⟩ `node scratchpad/fnprobe.mjs` → `max |fn(i/25) - stop_i| = 0.00942 {"z":0.2,"r":0.1,"i":3}` ·
same. That is 0.34 viewBox units = **0.41 px at the 72 px measure** at the ζ floor — small, and not
zero; a plot titled "linear() stops" drawn from `.fn` would plot a curve the CSS never runs. The
record's ruling 8 ("samplable at exactly the 26 stop abscissae") holds for the TRAJECTORY, not for the
emitted polyline. The spec's route (parse the artifact the CSS actually runs) is the honest one for a
plot that names the polyline as its mark (superlative S-A).

## §3 THE DECISION — the N-1 fork, written BEFORE the family opens (§Sequencing 8)

**Fork**: (a) drop the `response` prop — a ζ-instrument; or (b) keep it and label x in milliseconds,
`horizon = response × 4` s (the emitter's default `maxDuration`), discharging D-6's x-axis charge.

**RULED (b): label x in ms.** Grounds, each falsifiable at the bytes:
1. **The bound decides half of it.** (a) is not writable from this seat: the parent binds
   `:response="demo.response.value"` at `SpringTarget.vue:249` (a `.c` file, phase 2, closed), and
   `useSpringLinearStops(response, ζ)` requires a response to sample at. Dropping the prop here would
   leave a fallthrough `response` attribute on the root `<div>` — a new defect — or a hard-coded
   sampling response, which plots a call the engine is not making for the live pair.
2. **(b) is the truer instrument.** N-1's mechanism is the x-axis: percent-of-`maxDuration` normalizes
   away the one quantity `response` controls. Labelling the axis in the unit the engine samples in
   makes the first slider's effect VISIBLE where it actually acts — the terminal label moves, the shape
   does not — which is the physics (response scales time; ζ scales shape) told truthfully, instead of
   hidden by amputating the prop. The unit's own Goal reads "in a unit the axis names".
3. **(b) discharges D-6 in the same motion** (the graticule gains `1`, `0`, `0` and `N ms`); (a) would
   still owe D-6 its y-labels and leave x unnamed.
4. **The cost is stated**: the solver still runs per `response` change to redraw a near-identical shape
   (C-10, INFO). Vue's computed equality short-circuits the path rebuild when the emitted string is
   byte-identical (it is at ζ=0.2; ≤3.7e-4 elsewhere); the residual per-frame solver cost is left
   where the record left it (frame-cost magnitude UNPROVEN → SS-13).

**The `4 × response` horizon is a COUPLING to the engine's default and is pinned by test**: the unit
test samples the engine's own `sampleNormalizedSpring` at `dt = horizon / 25` and requires the
resolved stop values to equal those samples to 5 dp — if the engine's default `maxDuration` ever
moves, the axis label and the test move together or the test reds.

## §4 The other decisions, written before their patches

- **Mark design (D-3 + D-4 + N-3, one motion; EasingTarget precedent `EasingTarget.css:127-131`)**:
  both reference lines go NEUTRAL — `color-mix(in srgb, var(--foreground) 55%, transparent)` — so the
  data hue is the trace's alone. Contrast computed at this seat over the producer's `--card` arms
  (light `hsl(30 85% 96%)`, dark `hsl(26 22% 17%)`; `--foreground` light `hsl(24 10% 10%)`, dark
  `hsl(30 14% 90%)`): ⟨cmd⟩ `node scratchpad/contrast.mjs` → at 55 %: **light 3.82 · dark 4.50**
  (≥ 3:1 SC 1.4.11 both arms with margin against the record's ±2 % backdrop uncertainty; 45 % reads
  2.85 light, so 55 % is the first rung that clears both). The target line's dash is authored KNOWING
  `non-scaling-stroke` pins it to device px: `6 4` (a 10 px period — legible as a dash at 1 px); the
  baseline is solid; and the two are named by text (`1`, `0`), so no channel is colour alone.
- **D-6 labels**: HTML text positioned over the frame from the SAME constants as the SVG geometry
  (L-5's binding), never `<text>` inside a `preserveAspectRatio="none"` viewBox (it would stretch
  anisotropically). Register: `.code-token tabular-nums` (N-4 — the demo's case-preserving mono; the
  `ms` unit must not become `MS`).
- **D-7 allocation**: the FIXED scale is KEPT (S-E: the ceiling 1.5556 brackets the drawn max 1.51685
  at the ζ floor). An auto-fitting y-axis would draw every ζ at the same height and destroy the one
  comparison the plot exists for; more height would move N-5's bite point. The headroom now carries
  the `1` label, and the overshoot the pixels cannot resolve at high ζ (0.22 px at ζ=0.86) is carried
  by a NUMERIC `peak` readout computed over the resolved points (K-5's correct form — never over the
  mapped `{x,y}`).
- **D-13 containment + D-9 spacing, one edit**: the header row takes the sibling's `mb-2`
  (`SpringTarget.vue:224`), so the ≤3 px glow extent at the ζ floor (peak 1.672 px from the top, 0.67
  px after the half-stroke) lands inside an 8 px gap it owns instead of a 4 px gap it overruns.
- **L-8 by construction**: the `drop-shadow` moves OFF the inner `<path>` (whose user space is scaled
  7.68 × 1.2 at the 768 px measure — the ≈6:1 anisotropy question) onto a second, data-only `<svg>`
  layer, a CSS box whose filter lengths are CSS px by definition. The stroke (device px via
  `non-scaling-stroke`) and the glow (CSS px on the box) now reason about scale in the SAME direction;
  SS-13 #5's question is no longer asked of this component.
- **D-2 + N-4 (+M-6) + D-10 + D-9, one register pass**: `text-mono-caption` (uppercase at the
  installed pin → Ζ) → `.code-token tabular-nums`; the live readout wears `.readout-accent` like the
  sibling row (`SpringTarget.vue:229`); `ζ 0.86` keeps its space (the form `.g` landed at
  `StartingStyleTarget.vue:121`; the derby tag's `ζ0.86` is `.c`'s file, named not reached);
  `linear()` wears `.code-token` (N-4's rider).
- **D-11**: the primary label stops dressing a constant as a readout — it names the plot
  (`linear() trace`); the stop count moves to the x-axis caption as the description of the sampling
  grid it is.
- **D-12/L-6/C-4 + the filter cell**: the resolver THROWS a `SyntaxError` naming the offending stop on
  any token it cannot read, and reads an empty token as an error rather than dropping it and
  renumbering the axis (`filter(Boolean)` dies). L-11's two-position form is accepted per the CSS rule
  (two coincident stops), so the parser IS the rule rather than a subset of it.
- **L-14**: DOCUMENTED, and the document is a test obligation (travelling lock 3): the ceiling's
  coupling to the ζ floor (`SpringPhysicsFacet.vue:36` `:min="0.2"`; `SpringHeatmap.vue:80`
  `DAMPING_MIN = 0.2`) is pinned as `PLOT_DAMPING_FLOOR = 0.2` beside the geometry, and the test (i)
  samples the engine at that floor across the response range and requires the drawn max under the
  ceiling, (ii) reads the heatmap's declared floor from its bytes and requires it ≥ the pinned floor —
  failing EXPLICITLY if the declaration cannot be found (an anchor move is a re-bind, never a silent
  pass). No clamp: a clamped trace would flat-top silently, the M-2 class.
- **N-5**: found LANDED-BY `.c` `c41a9a74` at the parent (`SpringTarget.vue:20-22`
  `overflow-x-hidden overflow-y-auto` + `:527` `justify-content: safe center`) — the no-scroll
  symmetric clip that was N-5's terminal hazard no longer exists; this file's `shrink-0` root stays.
  GREEN-BEFORE-CURE (R.2): booked, not re-cured.
- **D-16**: clean by construction is RE-READ at the new bytes — the resolver throws on an empty or
  malformed string instead of a dead `:90` guard (`if (!pts.length) return ""` was unreachable and is
  gone with it); RTL untouched (the plot is a time axis, LTR by meaning, and the labels are anchored
  by `left`/`right` on purpose).

## §5 Anchors re-resolved at the true bytes (banked @129 L → open @148 L, `0e604af8`)

The template/script anchors moved **+4** (the KF.W6 L-4/C-8 docblock grew the header comment), the
style anchors **+19** (KF-SS-6's prose): `:9` root → **`:13`** · `:11-13` header spans → **`:15-17`** ·
`:23/:25` line literals → **`:27/:29`** · `:37` props → **`:41`** · `:50-86` parse/fill → **`:56-92`** ·
`:53` `filter(Boolean)` → **`:59`** · `:77-78` dead guards → **`:83-84`** · `:82-83` `Y_TARGET`/`Y_ZERO`
→ **`:88-89`** · `:85` the `{x,y}` map that drops `v` → **`:91`** · `:90` the dead length guard →
**`:96`** · `:111-112` dasharray → **`:130-131`** · `:126-127` non-scaling-stroke/drop-shadow →
**`:145-146`**. Every cure below was written against the right-hand column.

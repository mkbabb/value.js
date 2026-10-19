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

## §6 What landed — the five commits (keyframes.js `master`, all by exact pathspec, each with the session trailer)

| sha | meaning | files (`git show --stat`) |
|---|---|---|
| `e683d9a1` | **the instrument-truth core, ONE family, unsplit** — D-1 + N-1 + N-2 + C-2/L-3 with the parser posture D-12/L-6/C-4 + the filter cell, L-5's bindings, D-11's label, L-10's extraction, D-6's labels (N-1 arm (b)'s discharge) | `SpringTrace.vue` 265+/89− |
| `a54875bd` | mark design — D-3 + D-4 + N-3 (one motion) · L-8 by construction · D-7 decided-and-kept | `SpringTrace.vue` 51 |
| `8e05a0e0` | the register pass — D-2 + N-4 (+M-6) + D-10 + D-9, D-13 riding D-9 | `SpringTrace.vue` 20 |
| `b9ffced8` | L-14 — documented at the geometry, pinned, test-enforced; no clamp | `SpringTrace.vue` 23 |
| `08168b2c` | `test(… G-KFW11-4)` — the born-RED witness, 12 cases | `test/demo/scenes/spring-trace-truth.test.ts` 371 (create) |

The four component commits were built as four successive working-tree states of ONE file so
each carries one meaning (`git commit -- <path>` commits the working tree, so per-meaning
states were written, not staged); the tree after `b9ffced8` is byte-identical to the state
every gate below was run against — ⟨cmd⟩ `cmp scratchpad/SpringTrace.final.vue
demo/scenes/spring/SpringTrace.vue` → identical, checked before and after the commit.
⟨cmd⟩ `git log --oneline 0e604af8..HEAD | grep -c 'X.KF.W11.e'` → **5**; no sibling commit
landed in that range (the five are the whole range).

## §7 Gates — BEFORE → AFTER, every figure double-run at the settled bytes

| gate / clause | command | BEFORE (`0e604af8`) | AFTER (`08168b2c`) |
|---|---|---|---|
| **G-KFW11-4** runtime | `npx vitest run --project demo test/demo/scenes/spring-trace-truth.test.ts` | `No test files found` · same | **12 passed (12)** · **12 passed (12)** — **GREEN** |
| G-KFW11-4 clock clause (OP-4) | `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` | **0 · 0** (at open) | **0 · 0** (at close) — route: anchor-hoist minimum, stated against this figure |
| **§0u ratchet**, this unit's row | `npx vue-tsc --noEmit -p tsconfig.json \| grep -c 'error TS'` → total; `… \| grep -c SpringTrace` → this row | **24** · SpringTrace **0** | **24 · 24** · SpringTrace **0 · 0** — the count did not rise; the row is 0 |
| test-config leg | `npx tsc --noEmit -p tsconfig.test.json \| grep -c 'error TS'`; `… \| grep -c spring-trace` | **23** · **0** | **23 · 23** · **0 · 0** |
| demo suite | `npm run test:demo` | **45 files / 376 tests** | **46 / 388** · **46 / 388** (+1 file, +12 tests, nothing else moved) |
| no masking in the diff | `git diff 0e604af8..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | — | **0** |
| eslint | `npx eslint demo/scenes/spring test/demo/scenes/spring-trace-truth.test.ts` | — | exit **0** |
| `git diff --check` | on every commit | — | clean ×5 |
| §Seq 2 | `git merge-base --is-ancestor cc8ef498 HEAD` | ancestor | ancestor |

**Born-RED basis, per case** (the banked RED form *"No test files found"* reproduced at open, twice):
(2a) contradicts the pre-cure `:83-84` post-fill anchoring (first x = 2, last = 98 — the record's
dist replay `2,4,8,…,96,98`); (3b) contradicts `:59`'s `filter(Boolean)` (an empty token was
dropped and the axis renumbered); (3a) contradicts `:62`'s `{ v: 0, pct: null }`; (5a)
contradicts an axis that had no unit and no terminal label; (5b) contradicts `:16`'s
`text-mono-caption`; (5c) contradicts the literal `y1="20"`/`y1="56"` at `:27/:29` unbound to
`:88-89`; (5d) contradicts `aria-hidden="true"` on the sole informational artifact with no
text carrying its quantity; (1), (2b), (4a), (4b) are the L-10/L-14 obligations that had no
witness at all (⟨cmd⟩ `git grep -c "SpringTrace" 0e604af8 -- test/` → **0**, the spec's own figure).

## §8 P4 roster — every id, its verb

| id | verb | where |
|---|---|---|
| D-1 = L-1 = C-1 | **LANDED** | `e683d9a1` — anchors first, then clamp, then runs; first/last x = 0/100 (test 2a); the monotonic-clamp divergence (reader-B's second cell) closed with it (test 2b) |
| N-1 | **LANDED (arm b)** | decided at `ec4b7eff` §3, cured at `e683d9a1`; witnessed by test 5a (`2000 ms → 4800 ms`, path byte-identical at ζ=0.2) |
| N-2 | **CARRIED — the spec's own route** | the shared-builder route needs `demo/utils/reference-data/timingCurveUtils.ts` (a range parameter) — outside this unit's set and conditioned by OP-4 on the export; the duplicated ~7-line builder is now the ONE exported, tested `tracePathOf`; the "zero value.js imports" cell is UNSPENT (no `@mkbabb/value.js` import was added) |
| C-2 = L-3 | **LANDED to the OP-4 bound; structural half DECLARED** | the round trip stays by the spec's route (the engine exports neither resolver nor sampler: 0 · 0); what remained IN the component is one exported, tested, fail-explicit resolver that IS the CSS rule in the engine's phase order, with a docblock naming `resolveLinearStopPoints` as the one function that goes when C-3 lands (KF.W5/KF.W8) |
| D-12 = L-6 = C-4 (+ the filter cell) | **LANDED** | `e683d9a1`; tests 3a–3c |
| L-5 | **LANDED** | `e683d9a1`; test 5c |
| D-11 | **LANDED** | `e683d9a1` |
| L-10 | **LANDED** | `e683d9a1` + `08168b2c` — extracted into the SFC's plain `<script>` block (a second `.ts` file is outside the set; the idiom is `TimelineHoverPreview.vue`'s and `StartingStyleTarget.vue`'s), tested against `sampleNormalizedSpring` and `resolveTimingFunction` |
| D-3 · D-4 · N-3 | **LANDED, one motion** | `a54875bd` |
| D-6 | **LANDED** | `e683d9a1` (labels) — the a11y posture (one `role="img"` sentence over the resolved points) rides it and is D-5's identity in K-5's correct form; D-5's GRADE question (SS-13 #8, the SR pass) stays KF.W9's |
| D-7 | **DECIDED — allocation KEPT, stated** | `a54875bd`; SS-13 #3's perceptual half stays a witness question, now beside a numeric readout |
| D-13 | **LANDED** | `8e05a0e0` (containment by the gap the glow owns, with D-9) |
| D-2 = C-5 (+M-6) · N-4 · D-10 · D-9 | **LANDED, one pass** | `8e05a0e0`; test 5b; M-6's sibling site (`ζ0.86`, the derby tag) is `SpringTarget.vue`'s — `.c`'s file — NAMED, not reached |
| N-5 | **LANDED-BY `c41a9a74` (`.c`) — GREEN-BEFORE-CURE (R.2)** | `SpringTarget.vue:20-22` + `:527` at the bytes; not re-cured; this file's root `shrink-0` kept |
| L-8 | **LANDED by construction** | `a54875bd`; SS-13 #5's UA question is no longer asked of this component (the glow is on a CSS box) |
| L-14 | **LANDED — documented + pinned + test-enforced** | `b9ffced8`; tests 4a/4b; never clamped |
| D-16 | **RECORDED clean-by-construction, re-read at the new bytes** | the dead `:96` length guard died with the extraction (`tracePathOf([])` is `""` by `map`); malformed input throws instead of drawing; RTL untouched by meaning |
| L-11 | **DIES with the parser cure** | the two-position form is accepted per the CSS rule (test 2b) |
| C-10 | **INFO, unchanged** | Vue's computed equality short-circuits the redraw when the emitted string is byte-identical; the solver still runs per `response` change; magnitude UNPROVEN → SS-13, as banked |
| C-3 | **DECLARED (not owned)** | the export — KF.W5/KF.W8; OP-4 read 0 · 0 at open and close |
| D-8 · D-14 · D-15 · L-4/C-8 · L-7/C-6 · L-13/C-7 | folded / KF.W4-PROSE / KF.W9 per the record | not this packet's; L-4/C-8 and L-7/C-6 were already landed by KF.W6 (`c2ec05ce`, `8411e027`) and their prose was carried forward intact |

**Named to other units/waves, never reached across**: M-4→M-3's SWAP → KF11-E(c1)'s ruling seat
(with §2's `.fn` deviation measurement); C-3 → KF.W5/KF.W8; the derby tag's `ζ0.86` spacing → `.c`'s
file (M-6's other half); the `demo/env.d.ts` shim's default-only knowledge of SFC named exports
(the reason the test narrows at runtime; `aurora-opacity-ceiling.test.ts:61` carries the TS2339
this file avoids) → whichever wave owns `demo/env.d.ts` (a §Bounds Do-NOT-touch row here) —
RECORDED, not escalated: nothing in this unit is blocked by it.

## §9 E13 mail sweep at this seat's clock (read-only; status by cell position)

⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' docs/tranches/V/coordination/INBOX.md` → **79** rows (tail
O-39, rowed by X.F.W8 `.e`); positional scan of every status cell → the only `UNREAD` tokens are
historical (*"Was: UNREAD"* / *"Prior status, kept"*), **0 rows currently UNREAD**. Newest per path:
(1) `V/coordination/` — the 2026-09-18 `value-4.1` letters, ours and rowed; (2)
`../glass-ui/docs/tranches/BK/coordination/` — `glass-outbound-2026-09-18-valuejs-o26-reply.md` =
I-35, rowed; (3) `../keyframes.js/docs/tranches/V/coordination/` — the 07-27 inbound = O-21's
lineage, ours; (4) `../sci-report/atlas/docs/tranches/P/coordination/` — the 07-27/07-24 letters =
I-31/O-12, rowed. **ZERO unrowed, ZERO UNREAD in scope; no `I-n` minted.**

## §10 SELF-COUNT

**5 keyframes.js commits** in this receipt, 5 shas listed, ⟨cmd⟩ `git log --oneline 0e604af8..HEAD |
grep -c 'X.KF.W11.e'` → **5**. **Files written: 2 in keyframes.js** (`SpringTrace.vue` ·
`test/demo/scenes/spring-trace-truth.test.ts`) — exactly the unit's §Bounds `:118` row and `:131`
create row; **zero `src/**` bytes; zero writes outside the set** — **plus 2 in value.js** (this file;
the wave record). **P4 rows: 15 LANDED (D-1 · N-1 · C-2/L-3-to-bound · D-12/L-6/C-4 · L-5 · D-11 ·
L-10 · D-3 · D-4 · N-3 · D-6 · D-13 · D-2/N-4/D-10/D-9 · L-8 · L-14) · 1 DECIDED-KEPT (D-7) · 1
LANDED-BY sibling (N-5) · 1 CARRIED by the spec's route (N-2) · 1 DECLARED to the library (C-3) · 2
RECORDED (D-16 · C-10) · 1 died with the cure (L-11).** Gate: **G-KFW11-4 GREEN 12/12 ×2**; ratchet
**24 → 24, row 0 → 0**. Value.js commits: `ec4b7eff` (the decision) + the receipt commit named in
the record.

# Lane X-KF — keyframes.js Tranche K overlap matrix (RE-VERIFIED PASS)

**Fleet:** Second N-tranche deep-audit (lanes2). **Phase:** tranche development only — nothing
implemented. **Date:** 2026-06-12. **Branch:** `tranche-f-handoff` @ `199fd15` + 0.12.0 published.

**Charter:** Map the overlaps between value.js Tranche N and keyframes.js Tranche K
(`../keyframes.js/docs/tranches/K/`, just authored 2026-06-12). The four edges the brief named:
(1) the easing-curve picker as the donor for the glass-ui easing-configurator (U27) — which kf
component, how K plans to evolve it, whether K's DESIGN-TOTALITY already restyles it; (2) the
0.12.0 consume edge / witness flips (MCI-5 et al.) — does K schedule the re-pin; (3) kf asks on
value.js born in K (new VJ items); (4) the L-SEED frontier. Deliverable: the overlap matrix as
the substrate for X-KF-ITEMS.

**This is a RE-VERIFICATION pass.** A prior lane authored this file + `X-KF-ITEMS.md` +
the sanctioned cross-repo artifact `../keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md`. I
re-grounded every load-bearing claim against the LIVE K/BA/value.js trees this session (not
inherited). **Verdict: the matrix is accurate. One terminology refinement (the re-pin is `~3.13.0`
tilde, not `3.13.0` exact) + fresh file:line confirmations folded in below.** Nothing was found
to overturn.

**Sources re-read this session (every file:line re-verified, not inherited):**
- `../keyframes.js/docs/tranches/K/{K.md, PATH-FORWARD.md, L-SEED.md, VALUEJS-N2-ASKS.md}`
- `../keyframes.js/docs/tranches/K/waves/{K.W1.md, K.W4.md}`
- `../keyframes.js/docs/tranches/K/audit/live-dock-tabs-selects.md`
- kf donor SFCs (file-existence + LoC re-confirmed): `EasingEditor.vue` (4774 B),
  `EasingCurveCanvas.vue` (13284 B), `EasingSelect.vue` (5527 B) under
  `../keyframes.js/demo/@/components/custom/`; `../keyframes.js/demo/easing/easingGroups.ts` (2999 B)
- glass-ui: `../glass-ui/demo/stories/motion/curve-gallery/BezierEditor.vue` (header re-read),
  BA tranche `docs/tranches/BA/waves/BA.W-FOURIER-STUDIO.md` (`StepsEditor` fold) +
  `docs/tranches/BA/coordination/VALUEJS-N2-ASKS-2026-06-12.md` (the X-GU counterpart write)
- value.js: `src/index.ts:222-239` (barrel — re-read live), `package.json` (0.12.0,
  parse-that `^0.9.0` — re-read live), `demo/@/components/custom/gradient/EasingSelector.vue`
  (exists), `docs/tranches/N/N.md:150` (the N.W6.C scope)
- N: `docs/tranches/N/{N.md, PROGRESS.md}`, the user LEDGER (U8/U25/U27)

**Live-app note:** this lane is doc/source-mapping; the donor architecture + the constellation
phasing are fully grounded in SFC + tranche-doc source. The live :9000 look is corroborative,
not load-bearing for an OVERLAP-MATRIX lane. No screenshots emitted (matrix lane).

---

## §0 — The decisive structural fact (the headline)

**All THREE repos converge on the SAME value.js easing substrate, and there are now THREE
independent easing-curve editors in the constellation — none published, all hand-rolled from the
same chassis.** This is the central overlap. The chassis lineage is documented IN GLASS-UI'S OWN
SOURCE (re-read this session):

> `../glass-ui/demo/stories/motion/curve-gallery/BezierEditor.vue:2-13`:
> *"AZ.W-MOTION-SUITE — the live editable cubic-bezier editor, transposed TAILWIND-FIRST from the
> keyframes EasingEditor + EasingCurveCanvas chassis (keyframes.js/demo/@/components/custom/
> EasingEditor.vue + EasingCurveCanvas.vue). … The curve is driven by the REAL value.js
> `CSSCubicBezier` twin (the shipped sampler, no hand-rolled cubic). The dropdown seeds from the
> value.js `bezierPresets`…"* — imports `CSSCubicBezier` from glass-ui's own
> `src/composables/motion/curves` and `bezierPresets` from `@mkbabb/value.js` (`:12-13`).

So the dependency spine is real and one-directional: **value.js owns the easing MATH
(`src/easing.ts`, barrel `src/index.ts:222-239`); keyframes.js + glass-ui each hand-roll their own
EDITOR consuming it.** U27 asks to collapse the editors into ONE published glass-ui primitive —
the natural sink of this convergence, not a net-new design.

| Repo | Easing editor today | Published? | Consumes value.js |
|---|---|---|---|
| keyframes.js | `EasingEditor.vue` (composition root) + `EasingCurveCanvas.vue` (editable bezier, drag-capture, rubber-band, container-bounded) + `EasingSelect.vue` (grouped dropdown, 10 families, per-curve SVG previews, gold-shimmer detail curves) | NO — `demo/@/components/custom/` (demo-only) | `bezierPresets`, `CSSCubicBezier`, the named `ease*` family, `timingFunctionDescriptions` |
| glass-ui | `BezierEditor.vue` + `curve-gallery.vue` (motion-suite story; BA adds `StepsEditor.vue`) | NO — `demo/stories/motion/` (demo-only); NOT in `package.json#exports` | `bezierPresets`, `CSSCubicBezier` (the latter from glass-ui's own `motion/curves`, ultimately value.js) |
| value.js | `gradient/EasingSelector.vue` — a thin `<Select>` + a curve `<polyline>` preview, NO editing | NO — demo-only | `resolveEasing` over `GRADIENT_EASING_NAMES` → ultimately `src/easing.ts` |

value.js's own easing surface (`gradient/EasingSelector.vue`) is the WEAKEST of the three: a select
+ a static curve thumbnail, no draggable handles, no grouping, no readout. This is the U25/U27
target — the pane the user found needs "a lot of work" and wants promoted to a "first-class easing
selector + configurator."

---

## §1 — U27: the easing-configurator donor (THE primary overlap)

**U27 (LEDGER §H):** *"The easing area → a FIRST-CLASS easing selector + configurator, ABSTRACTED
FROM keyframes.js INTO glass-ui, supporting the panoply of easing fns, styled like keyframes.js."*
Initial ownership: glass-ui (the port) + keyframes (the source) — explicitly cross-repo.

### 1.1 Which kf component is the donor — exact (re-confirmed on disk)

The donor is the kf trio, all present under `../keyframes.js/demo/`:

1. **`EasingEditor.vue`** — the composition root. Props-in/events-out, state-shape-agnostic, so
   both kf hosts (the easing rail + the in-panel `TimingFunctionPanel`) mount the identical
   surface. Children: the editable curve canvas, the curve dropdown, a read-only copyable
   `cubic-bezier(…)`/`steps(…)` readout.
2. **`EasingCurveCanvas.vue`** — the editable SVG bezier canvas. The load-bearing mechanism U27
   wants: two draggable control-point handles with hit-test + rubber-band clamp, pointer-smoothing,
   the SHARED `useDragCapture` seam (global select-suppression, no per-surface re-author), a clamped
   overshoot viewBox (covers `ease-*-back`), a `38cqi` container-bounded square (`clamp(160px,
   38cqi, 280px)`, container-query driven), a traveling progress dot. Consumes glass-ui's
   `GlassPanel`.
3. **`EasingSelect.vue` + `easingGroups.ts`** — the grouped dropdown. 10 families (`EASING_GROUPS`:
   Standard / Sine / Quad / Cubic / Expo / Circ / Back / Bounce / Steps / Custom), each `SelectItem`
   rendering its OWN curve SVG preview, `gold-shimmer` on detail curves, per-curve description on
   the secondary rung, `max-h-[var(--easing-dropdown-max-h)]` on the content (the bounded-scroll
   mechanism). **This is also the U8 donor** (see §1.4). Rated SAFE for the U-K16 totality sweep
   (`live-dock-tabs-selects.md:195-198 §2.8`, `:253 S8` — *"dozens of items, OK"*).

The "panoply of easing fns" U27 names is already enumerated TWICE: kf's `EASING_GROUPS` (10
families) and value.js's `bezierPresets` + `timingFunctions` (the full analytic family). value.js
`src/index.ts:222-239` is the single barrel for the curve math:
`CSSCubicBezier`, `solveCubicBezierX` (`:226`); `jumpTerms`, `steppedEase`, `stepStart`, `stepEnd`
(`:232`); `cssLinear`, `bezierPresets`, `timingFunctions`, `timingFunctionDescriptions` (`:233`);
and the Level-1/2 parsers `parseLinearStops`, `parseSteps` (`:238`) — ALL re-verified live this
session.

### 1.2 How K plans to evolve the donor — and the COLLISION (re-verified vs K.W4 source)

K does NOT plan to port the easing editor into glass-ui. K's easing/spring work is INWARD (kf's own
panes), not an abstraction OUT — confirmed against `K.W4.md` this session:

- **K.W4 S1** (`K.W4.md:174,211,216,547`) mounts the engine-owned `KeyframesEditor`
  (`demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue`, confirmed present)
  in the SPRING scene and retires the read-only artifact viewer. That is a DIFFERENT component (the
  keyframe-row grammar), NOT the bezier easing canvas. The EASING scene's `EasingEditor` is NOT
  touched by S1.
- **K.W4 S6** (`K.W4.md:342-343,461-463`, `:556-559`) is the single-option-select TOTALITY: the
  lone violation is `ChromeDock.vue:200`'s controls-tab `<Select>` rendering a 1-item dropdown for
  the single-surface scenes (easing `["easing"]` + spring `["spring"]`). The cure is a `> 1` guard +
  static label — chrome plumbing, NOT the easing CANVAS. `EasingSelect` itself is explicitly RATED
  OK (multiple groups always > 1).
- **K's DESIGN-TOTALITY does NOT restyle the easing editor itself.** No K wave publishes
  `EasingEditor`/`EasingCurveCanvas`/`EasingSelect` to glass-ui.

**The collision:** glass-ui's BA tranche has ALREADY transposed the same chassis into
`BezierEditor.vue` (demo-only) AND folds a `StepsEditor.vue` live-steps sub-editor into the curve
gallery (`../glass-ui/docs/tranches/BA/waves/BA.W-FOURIER-STUDIO.md:96,120,143-145,161` — the new
`steppedEase(n, term)` live sub-editor + the Steps-card fold, RED at HEAD, born-RED-gated). So at
N's open:
- kf has the richest editor (grouped, drag, rubber-band, readout) — demo-only.
- glass-ui has a leaner Tailwind-first twin (`BezierEditor.vue`) — demo-only, in BA's motion-suite,
  being EXTENDED (steps sub-editor) but NOT published.
- value.js has the weakest (`EasingSelector.vue`, no editing) — the U25/U27 pane.

**Neither K nor BA schedules the PUBLISH.** U27's "abstract INTO glass-ui" is therefore a NET-NEW
glass-ui ask that lands in NEITHER sibling's current charter — it must be authored as a glass-ui
tranche item (the sibling X-GU/X-GU-ITEMS lane owns the glass-ui-facing write; X-KF-ITEMS records
the kf hand-off). The donor is settled (the kf trio + the BA twin); the unowned work is the
published primitive + its three consumers.

### 1.3 Is the donor itself bug-clean? (so U27 ports SOTA, not a regression)

- The kf `tab-trigger.css` serif-leak (`live-dock-tabs-selects.md` §4) is a SPRING/in-panel-tabs
  issue, NOT the easing canvas — does not contaminate the U27 port.
- The U-K15/U-K11 stepping-slider defect (`K.W4.md` S2) is a SPRING readout-mirror bug, NOT the
  easing canvas (whose handle drag is continuous via `useDragCapture`). The easing canvas is the
  clean half.
- **The port must NOT pull the kf `useDragCapture` seam wholesale** — glass-ui already owns its own
  drag idiom; the `BezierEditor.vue` twin shows glass-ui re-expresses the pointer math Tailwind-first
  rather than importing kf's composable. The published primitive should use glass-ui's drag idiom +
  value.js's `CSSCubicBezier`, mirroring the BA `BezierEditor`'s existing approach.

### 1.4 U8 rides the SAME donor (the bounded dropdown)

**U8 (LEDGER §D):** *"Dropdowns must bound themselves on the page + scroll within — FIRST-CLASS in
glass-ui; study how the keyframes.js easing-curve picker dropdown does it and bring that
mechanism."* The exact mechanism is `EasingSelect.vue`'s
`<SelectContent class="max-h-[var(--easing-dropdown-max-h)]">` — a token-bounded max-height on the
glass-ui `SelectContent` so the content scrolls within a viewport-relative cap. value.js's
`gradient/EasingSelector.vue` already does the lighter `max-h-[16rem]`. So **U8 and U27 share the
donor** (`EasingSelect`) and should be co-scheduled: the published glass-ui easing primitive's
dropdown IS the U8 reference implementation made first-class. The deeper U8 ask (collision-aware
viewport bounding, not just a static `max-h`) is a glass-ui `SelectContent` enhancement — also a
glass-ui tranche item, also unowned by K/BA.

---

## §2 — The 0.12.0 consume edge / the witness flips (does K schedule the re-pin?)

### 2.1 The witness flips MCI-5 et al. — what they are, and which direction

**The brief's "MCI-5 et al." are kf-side `it.fails` witnesses that flip RED (start PASSING) when kf
consumes value.js's shipped grammar.** They live in the L-SEED §7 ledger + the prior lane's authored
`VALUEJS-N2-ASKS.md §2`, NOT in K's own waves. Re-verified against `VALUEJS-N2-ASKS.md`:

| Witness / consume-edge | value.js status (0.12.0) | kf seam (per the authored slate) | N delivered |
|---|---|---|---|
| **MCI-5** identity-aware arity pad (THE live witness) | `functionIdentityValue` (`src/units/utils.ts:71`) + `FUNCTION_IDENTITY` shipped | `padToLength` `new ValueUnit(0)` → `functionIdentityValue(fn) ?? new ValueUnit(0)` (`kf/src/animation/utils.ts:316`) | N.W7.A landed; flips `kf/test/interpolate-anything.test.ts:256` |
| `lerpArray` → `NumericAnimation.at()` (KF-1) | shipped; KEPT in barrel (N.W7.B — demote premise refuted BY this kf consume-edge) | L-SEED RIPE-NOW; not yet wired kf-side | N.W7 W7B-1: KEEP + fix docstring |
| `deltaEOK` (KF-DELTAE) | shipped | gates ED-4 + CC-2 pixel proof (L) | already shipped |
| `reverseAnimationShorthand` (KF-CC1) | shipped | product-gated on CC-1 (L) | already shipped |
| `linear()`/`steps()` parsers (E1/E2), `toAnimationString` (B1), output-space emit (B2), egress gamut (B4), VJ-3 sentinels | N.W7.A 12-item kf ledger | the kf `it.fails` witnesses | N.W7: "kf `it.fails` witnesses flip" |

**N's PROGRESS confirms N.W7.A+B are DONE** (`PROGRESS.md:21`). So **value.js has ALREADY shipped the
grammar the witnesses gate on, at 0.12.0** (`package.json` re-read: `0.12.0`). The flip is on the KF
SIDE — when kf consumes 0.12.0, its `it.fails`-tagged tests start passing.

### 2.2 Does K schedule the re-pin of value.js? — NO (re-verified against K.W1 source)

**K does NOT schedule a value.js re-pin or a wired value.js-grammar consume in any wave.** Re-verified:
- K's consume-edge wave is **K.W1 = the GLASS-UI re-pin ONLY** — `~3.11.2 → ~3.13.0` (tilde, the
  range syntax kept; `K.W1.md:1` title, `:214` "the floor advance ~3.11.2 → ~3.13.0").
  **Correction over the prior matrix wording:** K phrases the target as `~3.13.0` (tilde window),
  not a bare `3.13.0` exact pin — minor, but the precise consume-edge.
- K's value.js pin is held at **`^0.11.2`** and is NOT advanced in any K wave (`K.md:59` — the
  substrate K develops against).
- **K's value.js consume is a RECORD/re-confirm clause, NOT a wire.** `K.W1.md:146-152` (re-read):
  the K3-internal structured codes LANDED in J.W1 (`src/animation/internal/errors.ts:35`); the FULL
  diagnostics channel is **OUT — deferred to L / value.js VJ.W3 per DL-K17**, *"not a K.W1
  implementation item."* The prior lane's authored `VALUEJS-N2-ASKS.md` is precisely the artifact
  K.W1's "re-pin re-confirm" RECORD clause (DL-K18/K20/K21) consumes — confirmed by the authored
  doc's own §2 cross-reference (`K.W1.md:550-556`).
- **K DEFERS the entire value.js consume edge to L.** `L-SEED.md:29-43` (re-read): L.W2/L.W3 gate on
  net-new value.js grammar (VJ.W1 SCROLL, VJ.W2 RAMP) that *"does not yet exist"*; deferring *"gives
  value.js the interval to ship VJ.W0→VJ.W2 in its own tranche process, so L starts un-blocked."*

**Consequence (a clean cross-repo handshake, no contention):**
- value.js N ships the grammar (0.12.0, done at N.W7).
- K consumes glass-ui `~3.13.0`, holds value.js at `^0.11.2`, and DEFERS the value.js consume to L.
- **L (kf's next tranche after K) is the wave that re-pins value.js → 0.12.0 and wires the
  consume-edges, flipping the `it.fails` witnesses.** L starts un-blocked BECAUSE N shipped first.

So **N.W7 (value.js's library-asks wave) is the UPSTREAM half of kf's L tranche, executed early.**
The two repos are correctly phased — value.js publishes, kf consumes one tranche later. The kf
witness flip is a downstream NOTIFICATION, not an N obligation.

### 2.3 Stale-census caveat K carries (worth flagging to N)

`L-SEED.md:215-218` ("Census correction of record") says value.js's published lineage is
*"0.11.2 = the F handoff + two patches"* and *"Tranche M is planning-only, never dispatched."*
**This is now STALE in N's favor:** N supersedes M, and value.js has shipped **0.12.0** (the L-SEED
VJ.W0 target — `L-SEED.md:199` predicted *"VJ.W0 RIPEN … publishes 0.11.3/0.12.0"*). The L-SEED's
value.js-half census is one tranche behind reality. When L develops, its preface should re-anchor on
N's `PROGRESS.md`, not the L-SEED census. The prior lane already DISCHARGED this notification by
authoring `../keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md §1` (the census correction) — verified
present this session. (`N.md:151`/N.W7.A already records the `parse-that ^0.9` re-pin, re-confirmed
live: `package.json` → `^0.9.0`.)

---

## §3 — kf asks on value.js born in K (new VJ items?)

**K authors NO net-new value.js asks beyond the pre-existing L-SEED §7 VJ ledger.** Re-verified:
every value.js reference in K's waves + audit points back to the SAME L-SEED §7 seed; K's posture is
to DEFER, not to add (`K.md §chronic+deferred fold` → DEFERRED-TO-L band; `PATH-FORWARD.md:114` —
*"the ONLY frontier fold into K is K3-internal"*). The L-SEED §7 items, with their N status:

| VJ item (L-SEED §7) | What | gates kf | N status |
|---|---|---|---|
| **VJ.W0 RIPEN** | VJ-1 `cssLinearFromString`; VJ-4 bound parse-cache; VJ-6 parse-that `^0.8.2→^0.9.0` | ungated; publishes 0.12.0 | **N.W7 LANDED** — parse-that `^0.9.0` re-pin ✓ (`package.json` live); LRU memoize bound ✓; `linear()`/`steps()` parsers ✓. VJ-1 SATISFIED-BY-COMPOSITION (`cssLinear(parseLinearStops(s))` on two barrel symbols `index.ts:233,238`) |
| **VJ.W1 SCROLL GRAMMAR** | `CSSTimelineOptions` typed extractor + inverse serializer — the ONE genuine net-new grammar | gates K.W2/L's SO-1 | **NOT in N.** Net-new; un-scheduled in value.js |
| **VJ.W2 PERCEPTUAL RAMP** | `sampleColorRamp(from,to,n,{space,hueMethod})` beside mix.ts | gates K.W3/L's CC-2 | **NOT in N.** Net-new; un-scheduled |
| **VJ.W3 SUBSTRATE TOTALITY** | VJ-9 TOTAL partial-input contract → VJ-3 diagnostics PRODUCER | K1/K3 tripwires | **PARTIAL in N** — diagnostics producer (`ParseDiagnostic`/`OnParseError`) ✓; `parseCSSValueUnit` empty-input contract shipped (0.11.2, `fbea3e2`); the FULL partial-input totality remains open |
| **VJ.W4 THE BIG ROCK** | VJ-2 arc-length path sampler + MCI-5 arity pad + VJ-5 out-buffer | L parity-gated | **PARTIAL in N** — `PathGeometry.sampleAtLength` w/ tangent angle for `rotate: auto` (`src/transform/path.ts`) ✓, MCI-5 ✓, buffer-reuse unflatten ✓. MorphSVG shape-interp product half stays kf's L work |

### 3.1 VJ-1 `cssLinearFromString` — CLOSED (no symbol owed)

L-SEED §7 named VJ-1 as a `cssLinearFromString` helper *"beside `cssLinear`"* (kf deletes its
`parseLinearStops` shim, ~30 LoC). value.js TODAY exports BOTH `cssLinear` (`src/index.ts:233`) AND
`parseLinearStops` (`:238`). **The string→fn path is `cssLinear(parseLinearStops(s))` on two
published symbols — SATISFIED-BY-COMPOSITION.** No `cssLinearFromString` convenience symbol shipped
or is owed; the EF-3 shim retirement proceeds on the composition. The prior lane discharged this
verify (X-KF-ITEMS §2); re-confirmed live.

### 3.2 The two genuine net-new value.js grammars K's L needs (NOT in N)

The only L-SEED items value.js has NOT touched are **VJ.W1 (scroll-timeline grammar)** and **VJ.W2
(`sampleColorRamp`)**. These gate kf's L. **They are correctly absent from N** — N's scope is the
user-audit repair + 0.12.0, not the kf round-trip frontier. They are RECORDED here (and in
X-KF-ITEMS / `VALUEJS-N2-ASKS.md §3`) as the value.js work a FUTURE value.js tranche (the post-N
successor) must schedule in its OWN process. N is NOT obligated to ship them.

---

## §4 — The L-SEED frontier (the boundary map)

L-SEED is kf's NEXT-tranche seed (the frontier deferred WHOLESALE from K). Its value.js relevance:

- **L-SEED is where kf consumes value.js 0.12.0.** N ships; L consumes. The acyclic publish-spine
  holds: value.js = the pure sink (owns curve math, not playback); kf + glass-ui consume one tranche
  behind. No cycle, no contention.
- **The boundary principle (`L-SEED.md:171-180`, charter law):** *value.js owns VALUES (parse +
  serialize, the keyframes + shorthand grammars, DOM-aware computed resolution, color science,
  easing/bezier math, interpolation kernels); keyframes.js owns TIME (frames, playback,
  group/sequence/stagger, WAAPI + CSS compile, CSSOM walk, physics).* **Spring/decay math stays in
  kf PERMANENTLY** (the "value.js owns spring math" hypothesis was researched-FALSE — value.js ships
  zero spring code; glass-ui consumes spring FROM kf). This bounds U27: the easing CURVE math + the
  bezier presets are value.js's; PLAYBACK/spring is kf's; the EDITOR COMPONENT is glass-ui's (the
  published primitive). The three-way ownership is already drawn.
- **The 12 KILLs (`L-SEED.md §5`) + BOOKs (§6)** are kf-internal — no value.js surface. Not an N
  concern.
- **ED-3 "dogfood inversion" (the demo consumes the PUBLISHED barrel)** is a kf frontier item with a
  value.js PARALLEL: N's own registry-consumption-at-close (N.W9). Both repos independently move
  demos onto published barrels — a shared discipline, no cross-dependency.

---

## §5 — The overlap matrix (the deliverable)

| # | Edge | kf K position | glass-ui BA position | value.js N position | Owner of the unowned work | N action |
|---|---|---|---|---|---|---|
| **O1** | U27 easing-configurator (the published glass-ui primitive) | NO publish; K.W4 touches the SPRING `KeyframesEditor` + the `ChromeDock.vue:200` single-option select, NOT the easing canvas; the kf `EasingEditor`/`EasingCurveCanvas`/`EasingSelect` trio is the donor | `BezierEditor.vue` is the Tailwind-first twin (demo-only, BA motion-suite); BA folds a NEW `StepsEditor.vue` (`W-FOURIER-STUDIO`); NOT published | `gradient/EasingSelector.vue` is the weakest (no editing) — the U25/U27 pane | **glass-ui** (net-new published primitive — in NEITHER sibling's charter) | **glass-ui tranche item** (sibling X-GU/X-GU-ITEMS): publish the editor as a glass-ui primitive consuming value.js `bezierPresets`/`CSSCubicBezier`; re-point all 3 demos (kf rail, glass-ui story, value.js gradient pane); fold BA's `StepsEditor` INTO it, not a 4th fork |
| **O2** | U8 bounded/scrolling dropdown | the `max-h-[var(--easing-dropdown-max-h)]` mechanism on glass-ui `SelectContent` (`EasingSelect.vue`) IS the user's reference | glass-ui owns `SelectContent` | `EasingSelector.vue` already does the lighter `max-h-[16rem]` | **glass-ui** (`SelectContent` collision-aware bounding) | **glass-ui tranche item**; co-schedule with O1 (shares the donor) |
| **O3** | The witness flips (MCI-5 et al.) | the `it.fails` witnesses live KF-side; flip when kf consumes 0.12.0 (deferred to L) | n/a | **0.12.0 SHIPPED the grammar** (N.W7.A+B DONE; `package.json` 0.12.0 verified) | none — phasing is correct | **notify kf at 0.12.0** (DONE — `VALUEJS-N2-ASKS.md §1-2` authored); no N work owed |
| **O4** | the value.js re-pin in kf | K HOLDS value.js `^0.11.2`; K.W1 is the GLASS-UI re-pin (`~3.11.2 → ~3.13.0`); DEFERS the value.js consume to L (`L-SEED.md:29-43`) | n/a | publishes 0.12.0 | kf's **L** tranche (re-pins value.js, wires consume-edges) | none — N is the upstream half; L is downstream |
| **O5** | new VJ asks born in K | K adds NONE; defers to the pre-existing L-SEED §7 ledger | n/a | N.W7 landed VJ.W0 + parts of VJ.W3/W4 | future value.js tranche (post-N) for **VJ.W1 scroll grammar + VJ.W2 `sampleColorRamp`** | RECORD VJ.W1/W2 (NOT an N obligation); VJ-1 `cssLinearFromString` CLOSED-by-composition |
| **O6** | the L-SEED frontier / boundary | L consumes value.js 0.12.0, un-blocked because N shipped first; spring math stays kf | glass-ui owns the editor COMPONENT; consumes spring from kf | value.js = the pure sink (owns curve math, not playback) | n/a — boundary already drawn | re-confirm L's close on the post-N substrate (already N.W9) |
| **O7** | stale L-SEED census | L-SEED §7 census says "0.11.2 + 2 patches, M never dispatched" — one tranche behind | n/a | 0.12.0 shipped; N supersedes M | n/a | **notify kf** so L re-anchors its preface on N's PROGRESS, not the stale census (DONE — `VALUEJS-N2-ASKS.md §1`) |

---

## §6 — The X-KF-ITEMS substrate (the three constellation items this lane seeds)

1. **GLASS-UI item (PRIMARY, serves U27 + U8 + U25 + value.js U30a):** publish the easing editor as
   a first-class glass-ui primitive. Donor: the kf trio (richest) reconciled with glass-ui's own
   `BezierEditor.vue` twin (Tailwind-first, already value.js-driven). Must consume value.js
   `bezierPresets`/`CSSCubicBezier`/`timingFunctions`/`timingFunctionDescriptions`/`parseLinearStops`/
   `parseSteps` (all barrel-exported, `src/index.ts:222-239`). Three consumers re-point: kf's easing
   rail (deletes the demo-local trio, K.W1 net-deletion idiom), glass-ui's curve-gallery story,
   value.js's `gradient/EasingSelector.vue` (the U25/U27 first-class upgrade). **Coordinate with BA's
   `W-FOURIER-STUDIO` `StepsEditor` fold so the steps sub-editor lands in the published primitive,
   not a fourth demo-only fork.** Bound by L-SEED's boundary law: editor COMPONENT = glass-ui, curve
   MATH = value.js, playback/spring = kf. **This is the X-GU/X-GU-ITEMS lane's authored write
   (glass-ui-facing); X-KF-ITEMS records the kf hand-off (donor cede / keep / tripwire).**

2. **value.js item (the consumer side of #1):** `gradient/EasingSelector.vue` → consume the
   published glass-ui easing primitive (replacing the thin select+thumbnail). This is the concrete
   U25/U27 deliverable on the value.js side. It currently lives in **N.W6.C** as *"easing-curve as
   the gradient pane's hero motif + tokenized stroke"* (`N.md:150`) — but N.W6.C scopes only a "hero
   motif," NOT the first-class EDITOR U27 demands. **N.W6.C must be UPGRADED** (or a new wave-item
   authored) to consume the glass-ui primitive — gated on glass-ui shipping it (the O1 cross-repo
   wait). This is the one live N-side action this lane surfaces for the re-divination.

3. **Constellation phasing record (no N work owed, prevents drift):** value.js publishes grammar (N,
   0.12.0 — DONE); kf consumes one tranche later (L re-pins value.js + flips the witnesses); glass-ui
   owns the published editor primitive. RECORD the two net-new value.js grammars L will need (VJ.W1
   scroll-timeline, VJ.W2 `sampleColorRamp`) for a future value.js tranche. The kf notifications
   (0.12.0 shipped, M superseded by N) are DISCHARGED — `VALUEJS-N2-ASKS.md` authored + present in
   kf's tranche root.

---

## §7 — Terminal reading

The whole X-KF overlap reduces to one sentence: **value.js owns the easing math, all three repos
hand-rolled their own editor on it, and U27's "abstract INTO glass-ui" is the natural sink that
NEITHER kf's K nor glass-ui's BA scheduled — so it is a net-new glass-ui primitive item N must seed
across the constellation (via the X-GU lane), with value.js's gradient pane as its first consumer
(the N.W6.C upgrade) and value.js's `bezierPresets`/`CSSCubicBezier` as its substrate.** On the
library axis there is no contention: N already shipped the grammar (0.12.0) that K deferred to L, so
kf's L consumes a STRONGER value.js than the L-SEED census knows about — the phasing is correct, the
only owed acts are notifications (0.12.0 shipped, M superseded — already discharged in
`VALUEJS-N2-ASKS.md`) and a record of the two scroll/ramp grammars L will eventually need.

**RE-VERIFICATION VERDICT:** the prior lane's matrix stands. The single refinement is the K.W1 pin
syntax (`~3.13.0` tilde, not `3.13.0` exact — `K.W1.md:1,214`). Every other load-bearing
file:line re-grounded TRUE against the live K/BA/value.js trees this session.

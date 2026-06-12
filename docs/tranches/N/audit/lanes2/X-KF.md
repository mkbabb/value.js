# Lane X-KF — keyframes.js Tranche K overlap matrix

**Fleet:** Second N-tranche deep-audit (lanes2). **Phase:** tranche development only — nothing
implemented. **Date:** 2026-06-12. **Branch:** `tranche-f-handoff` @ `199fd15` + 0.12.0 published.

**Charter:** Map the overlaps between value.js Tranche N and keyframes.js Tranche K
(`../keyframes.js/docs/tranches/K/`, just authored 2026-06-12). The four edges the brief named:
(1) the easing-curve picker as the donor for the glass-ui easing-configurator (U27); (2) the
0.12.0 consume edge / witness flips (MCI-5 et al.) — does K schedule the re-pin; (3) kf asks on
value.js born in K (new VJ items); (4) the L-SEED frontier. Deliverable: the overlap matrix as
the substrate for X-KF-ITEMS.

**Sources read (load-bearing, file:line grounded):**
- `../keyframes.js/docs/tranches/K/{K.md, PATH-FORWARD.md, L-SEED.md}`
- `../keyframes.js/docs/tranches/K/waves/K.W4.md`
- `../keyframes.js/docs/tranches/K/audit/{live-dock-tabs-selects.md, live-glassui-currency.md}`
- kf donor SFCs: `../keyframes.js/demo/@/components/custom/EasingEditor.vue`,
  `EasingSelect.vue`, `EasingCurveCanvas.vue`, `../keyframes.js/demo/easing/easingGroups.ts`
- glass-ui: `../glass-ui/src/subpaths/motion-curves.ts`, `src/composables/motion/curves.ts`,
  `demo/stories/motion/curve-gallery/BezierEditor.vue` (+ BA tranche
  `docs/tranches/BA/waves/BA.W-FOURIER-STUDIO.md`)
- value.js: `src/easing.ts`, `src/index.ts`, `demo/@/components/custom/gradient/EasingSelector.vue`
- N: `docs/tranches/N/N.md`, `docs/tranches/N/PROGRESS.md`,
  `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md`

**Live-app note:** the shared chrome-devtools browser was profile-locked by a sibling lane
(`The browser is already running … Use --isolated`); creating my own page failed twice. This lane
is doc/source-mapping — the donor architecture is fully grounded in the SFC source I read; the
live look is corroborative, not load-bearing. No screenshots emitted.

---

## §0 — The decisive structural fact (the headline)

**All THREE repos converge on the SAME value.js easing substrate, and there are now THREE
independent easing-curve editors in the constellation — none published, all hand-rolled from the
same chassis.** This is the central overlap. The chassis lineage is documented IN GLASS-UI'S OWN
SOURCE:

> `../glass-ui/demo/stories/motion/curve-gallery/BezierEditor.vue:1-15`:
> *"AZ.W-MOTION-SUITE — the live editable cubic-bezier editor, transposed TAILWIND-FIRST from the
> keyframes EasingEditor + EasingCurveCanvas chassis (keyframes.js/demo/@/components/custom/
> EasingEditor.vue + EasingCurveCanvas.vue). … The curve is driven by the REAL value.js
> `CSSCubicBezier` twin … The dropdown seeds from the value.js `bezierPresets`."*

So the dependency spine is already real and one-directional: **value.js owns the easing MATH
(`src/easing.ts`); keyframes.js + glass-ui each hand-roll their own EDITOR consuming it.** U27 asks
to collapse the two editors into ONE published glass-ui primitive — which is the natural sink of
this convergence, not a net-new design.

| Repo | Easing editor today | Published? | Consumes value.js |
|---|---|---|---|
| keyframes.js | `EasingEditor.vue` = `EasingCurveCanvas.vue` (editable bezier, drag-capture, rubber-band, container-bounded) + `EasingSelect.vue` (grouped dropdown, 10 families, per-curve SVG previews, gold-shimmer detail curves) | NO — `demo/@/components/custom/` (demo-only) | `bezierPresets`, `CSSCubicBezier`, the named `ease*` family, `timingFunctionDescriptions` (via kf demo's `animationDescriptions`) |
| glass-ui | `BezierEditor.vue` + `curve-gallery.vue` (motion-suite story) | NO — `demo/stories/motion/` (demo-only); NOT in `package.json#exports` | `bezierPresets`, `CSSCubicBezier` (`@mkbabb/value.js`) |
| value.js | `gradient/EasingSelector.vue` — a thin `<Select>` + a 30-pt `<polyline>` curve preview, NO editing | NO — demo-only | `resolveEasing` over `GRADIENT_EASING_NAMES` (local), ultimately `src/easing.ts` |

value.js's own easing surface (`gradient/EasingSelector.vue`, 66 LoC) is the WEAKEST of the three:
a select + a static curve thumbnail, no draggable handles, no grouping, no readout. This is the
U25/U27 target — the pane the user found needs "a lot of work" and wants promoted to a "first-class
easing selector + configurator."

---

## §1 — U27: the easing-configurator donor (THE primary overlap)

**U27 (LEDGER §H):** *"The easing area → a FIRST-CLASS easing selector + configurator, ABSTRACTED
FROM keyframes.js INTO glass-ui, supporting the panoply of easing fns, styled like keyframes.js."*
Initial ownership: glass-ui (the port) + keyframes (the source) — explicitly cross-repo.

### 1.1 Which kf component is the donor — exact

The donor is the kf trio (all in `../keyframes.js/demo/`):

1. **`EasingEditor.vue`** (95 LoC) — "THE ONE EASING EDITOR" (I.W2.S4). The composition root.
   Props-in/events-out, state-shape-agnostic, so both kf hosts (the easing rail + the in-panel
   `TimingFunctionPanel`) mount the identical surface. Owns three children only:
   - the editable curve canvas (the subject),
   - the curve dropdown (the sole selector),
   - a read-only copyable `cubic-bezier(…)`/`steps(…)` readout (`EasingEditor.vue:43-59`).
2. **`EasingCurveCanvas.vue`** (385 LoC) — the editable SVG bezier canvas. The load-bearing
   mechanism U27 wants: two draggable control-point handles with hit-test + rubber-band clamp
   (`rubberBand`, `EasingCurveCanvas.vue:198-206`), pointer-smoothing (`SMOOTH_FACTOR=0.35`,
   `:208`), the SHARED `useDragCapture` seam (`:269` — global select-suppression token, no
   per-surface re-author), a clamped overshoot viewBox (`MAX_OVERSHOOT=0.6`, covers `ease-*-back`),
   a `38cqi` container-bounded square (`:300-307` — `clamp(160px, 38cqi, 280px)`, container-query
   driven, the ONE φ-magic), a traveling progress dot. Consumes glass-ui's `GlassPanel
   variant="wash"`.
3. **`EasingSelect.vue`** (137 LoC) + **`easingGroups.ts`** — the grouped dropdown. 10 families
   (`EASING_GROUPS`: Standard / Sine / Quad / Cubic / Expo / Circ / Back / Bounce / Steps / Custom),
   each `SelectItem` rendering its OWN curve SVG preview path, `gold-shimmer` on detail curves,
   per-curve description on the secondary governed rung, `max-h-[var(--easing-dropdown-max-h)]` on
   the content (`:29` — the bounded-scroll mechanism). Consumes glass-ui's `Select`/`SelectContent`/
   `SelectGroup`/`SelectItem`/`SelectLabel`/`SelectSeparator`/`SelectTrigger`. **This is also the U8
   donor** (the bounded dropdown the user wants studied — see §1.4).

The "panoply of easing fns" U27 names is already enumerated TWICE: kf's `EASING_GROUPS` (10
families) and value.js's `bezierPresets` (24 named curves) + `timingFunctions` (the full analytic
family). value.js `src/easing.ts` is the single source of truth for the curve math:
`src/index.ts:226-238` exports `CSSCubicBezier`, `bezierPresets`, `timingFunctions`,
`timingFunctionDescriptions`, `cssLinear`, `steppedEase`, `jumpTerms`, `stepStart`/`stepEnd`.

### 1.2 How K plans to evolve the donor — and the COLLISION

K does NOT plan to port the easing editor into glass-ui. K's easing/spring work is INWARD (kf's
own panes), not an abstraction OUT:

- **K.W4 S1** (`K.W4.md:174-228`) mounts the engine-owned `KeyframesEditor` in the SPRING scene
  (a DIFFERENT component — the keyframe-row grammar, not the bezier canvas) and retires the
  read-only artifact viewer. The EASING scene's `EasingEditor` is NOT touched by S1.
- **K.W4 S4** (`K.W4.md:295-299`, `live-dock-tabs-selects.md §1`) re-cuts the SpringSidebar tabs to
  pills/dock-dropdown and de-serifs `tab-trigger.css` — touches the spring panel chrome, not the
  easing canvas.
- **K's DESIGN-TOTALITY does NOT restyle the easing editor itself.** The easing scene is mentioned
  only as a single-option-select SITE: `live-dock-tabs-selects.md §2.1` flags `ChromeDock.vue:200`
  rendering a 1-item dropdown for the `["easing"]` scene (the U-K16 totality sweep). `EasingSelect`
  itself is rated OK (`§2.8`, "dozens of items, safe"). There is NO K wave that publishes
  `EasingEditor`/`EasingCurveCanvas`/`EasingSelect` to glass-ui.

**The collision:** glass-ui's BA tranche has ALREADY transposed the same chassis into
`BezierEditor.vue` (demo-only) AND folds a `StepsEditor.vue` live-steps sub-editor into the curve
gallery (`../glass-ui/docs/tranches/BA/waves/BA.W-FOURIER-STUDIO.md:55,71,143` — REC-6,
W-MOTION3). So at N's open:
- kf has the richest editor (`EasingEditor`+`EasingCurveCanvas`+`EasingSelect`, grouped, drag,
  rubber-band, readout) — demo-only.
- glass-ui has a leaner Tailwind-first twin (`BezierEditor.vue`) — demo-only, in BA's motion-suite,
  being EXTENDED (steps sub-editor) but NOT published.
- value.js has the weakest (`EasingSelector.vue`, no editing) — the U25/U27 pane.

**Neither K nor BA schedules the PUBLISH.** U27's "abstract INTO glass-ui" is therefore a NET-NEW
glass-ui ask that lands in NEITHER sibling's current charter — it must be authored as a glass-ui
tranche item (see X-KF-ITEMS substrate, §6). The donor is settled (the kf trio + the BA twin); the
unowned work is the published primitive + its three consumers (kf rail, glass-ui story, value.js
gradient pane).

### 1.3 Is the donor itself bug-clean? (so U27 ports SOTA, not a regression)

The kf donor carries one chronic K is fixing INDEPENDENTLY and one nuance:
- The kf `tab-trigger.css` serif-leak (`live-dock-tabs-selects.md §4`) is a SPRING/in-panel-tabs
  issue, NOT the easing canvas — does not contaminate the U27 port.
- The U-K15 stepping-slider defect (`K.W4.md` S2) is a SPRING readout-mirror bug, NOT the easing
  canvas (whose handle drag is continuous via `useDragCapture` + `SMOOTH_FACTOR`). The easing
  canvas is the clean half.
- **The port must NOT pull the kf `useDragCapture` seam wholesale** — glass-ui already owns its own
  drag primitives; the BezierEditor twin shows glass-ui re-expresses the pointer math Tailwind-first
  rather than importing kf's composable. The published primitive should use glass-ui's drag idiom +
  value.js's `CSSCubicBezier`, mirroring the BA BezierEditor's existing approach.

### 1.4 U8 rides the SAME donor (the bounded dropdown)

**U8 (LEDGER §D):** *"Dropdowns must bound themselves on the page + scroll within — FIRST-CLASS in
glass-ui; study how the keyframes.js easing-curve picker dropdown does it and bring that
mechanism."* The exact mechanism the user names is `EasingSelect.vue:29`:
`<SelectContent class="max-h-[var(--easing-dropdown-max-h)]">` — a token-bounded max-height on the
glass-ui `SelectContent` so the content scrolls within a viewport-relative cap. kf's
`EasingSelector` (value.js's, the gradient pane) ALSO already does the lighter version:
`max-h-[16rem]` (`value.js demo/.../gradient/EasingSelector.vue:45`). So **U8 and U27 share the
donor** (`EasingSelect`) and should be co-scheduled: the published glass-ui easing primitive's
dropdown IS the U8 reference implementation made first-class. The deeper U8 ask (collision-aware
viewport bounding, not just a static `max-h`) is a glass-ui `SelectContent` enhancement — also a
glass-ui tranche item, also unowned by K/BA.

---

## §2 — The 0.12.0 consume edge / the witness flips (does K schedule the re-pin?)

### 2.1 The witness flips MCI-5 et al. — what they are, and which direction

**The brief's "MCI-5 et al." are kf-side `it.fails` witnesses that flip GREEN→RED (i.e. start
PASSING) when kf consumes value.js's shipped grammar.** They live in the L-SEED §7 ledger
(`L-SEED.md:184-213`), NOT in K's own waves. The mapping:

| Witness / consume-edge | value.js status (0.12.0) | kf consumes it in… | N delivered |
|---|---|---|---|
| `lerpArray` → `NumericAnimation.at()` (KF-1) | shipped 0.11.2; KEPT in barrel (N.W7.A — the demote premise refuted BY this kf consume-edge) | L-SEED RIPE-NOW; not yet wired kf-side | N.W7 W7B-1: **KEEP** lerpArray + fix docstring |
| `deltaEOK` (KF-DELTAE) | shipped 0.11.2 | gates ED-4 + CC-2 pixel proof (L-SEED) | already shipped |
| `reverseAnimationShorthand` (KF-CC1) | shipped 0.11.2 | product-gated on CC-1 (deferred to L) | already shipped |
| MCI-5 identity-aware arity pad | **N.W7.A item** ("identity-aware arity pad (MCI-5)") | L-SEED VJ.W4 witness-gated rider | **N.W7 landed** (N.md:151) |
| `linear()`/`steps()` parsers (E1/E2), `toAnimationString` (B1), output-space emit (B2), egress gamut (B4), VJ-3 `light-dark()`/`currentColor` sentinels | N.W7.A 12-item kf ledger | the kf `it.fails` witnesses | **N.W7: "kf `it.fails` witnesses flip"** (N.md:151 acceptance) |

**N's PROGRESS confirms N.W7.A+B are DONE** (`PROGRESS.md:21`: *"A+B DONE `9cd815e`+`0deca84`+
`ed0dd00` (verified; 1709 tests); … 11 items landed + witness-mirrored ✓; … lerpArray KEEP (kf
consume-edge refuted the demote premise)"*). So **value.js has ALREADY shipped the grammar the
witnesses gate on, at 0.12.0.** The flip is on the KF SIDE — when kf consumes 0.12.0, its
`it.fails`-tagged tests start passing.

### 2.2 Does K schedule the re-pin of value.js? — NO, and here is the exact reason

**K does NOT schedule a value.js re-pin or a value.js-grammar consume in any wave.** Verified:
- K's consume-edge wave is **K.W1 = the GLASS-UI re-pin ONLY** (`~3.11.2 → 3.13.0`,
  `K.md §finding-cluster`, `PATH-FORWARD.md §5` table, `live-glassui-currency.md §5.1`). value.js is
  NOT touched by K.W1.
- K's value.js pin is held at **`^0.11.2` PUBLISHED** and is explicitly NOT advanced in K:
  `K.md:58` — *"value.js `^0.11.2` … parse-that consumed PUBLISHED"* is the substrate version K
  develops against; no wave bumps it.
- **K DEFERS the entire value.js consume edge to L.** `L-SEED.md:30-43` is unambiguous: K.W2/K.W3
  of the round-trip seed gate on net-new value.js grammar (VJ.W1 SCROLL GRAMMAR, VJ.W2 PERCEPTUAL
  RAMP) that *"does not yet exist"*; the deferral *"un-blocks the frontier"* precisely because
  *"the K interval is exactly when that grammar ships [in value.js's own tranche process]."*
- The ONLY value.js fold INTO K is K3-internal (2 engine diagnostic rows, ~20 LoC), NOT a re-pin
  (`PATH-FORWARD.md §4`).

**Consequence (a clean cross-repo handshake, no contention):**
- **value.js N ships the grammar (0.12.0, already done at N.W7).**
- **K consumes glass-ui 3.13.0, holds value.js at 0.11.2, and DEFERS the value.js consume to L.**
- **L (kf's next tranche after K) is the wave that re-pins value.js → 0.12.0 and wires the
  consume-edges (lerpArray, the linear()/steps() parsers, the sentinels), flipping the
  `it.fails` witnesses.** L starts un-blocked BECAUSE N shipped the grammar first.

So **N.W7 (value.js's library-asks wave) is the UPSTREAM half of kf's L tranche, executed early.**
There is no missing schedule: the two repos are correctly phased — value.js publishes, kf consumes
one tranche later. The N charter already records this: `N.md:236` — *"witnesses — notify at
0.12.0"*; the kf witness flip is a downstream NOTIFICATION, not an N obligation.

### 2.3 Stale-census caveat K carries (worth flagging to N)

`L-SEED.md:215-218` ("Census correction of record") says value.js's published lineage is
*"0.11.2 = the F handoff + two patches"* and that *"Tranche M is planning-only, never dispatched."*
**This is now STALE in N's favor:** N supersedes M (MEMORY: "N SUPERSEDES M"), and value.js has
shipped **0.12.0** (the L-SEED VJ.W0 target — `L-SEED.md:200` predicted *"VJ.W0 RIPEN (S, ungated →
publishes 0.11.3/0.12.0)"*). So the L-SEED's value.js-half census is one tranche behind reality.
When L develops, its preface should read N's `PROGRESS.md`, not the L-SEED census. **N should
notify kf that 0.12.0 shipped + the VJ.W0/W3 items landed** (parse-that re-pin to `^0.9`, the
TOTAL partial-input contract VJ-9, the diagnostics producer VJ-3) so L re-anchors. (`N.md:151`
already lists `parse-that ^0.9 re-pin` in N.W7.A — the VJ-6/VJ.W0 item — done.)

---

## §3 — kf asks on value.js born in K (new VJ items?)

**K authors NO net-new value.js asks beyond the pre-existing L-SEED §7 VJ ledger.** Verified by
grepping K's waves + audit for value.js/VJ items: every value.js reference in K points back to the
SAME L-SEED §7 seed (`VJ.W0 RIPEN`, `VJ.W1 SCROLL GRAMMAR`, `VJ.W2 PERCEPTUAL RAMP`, `VJ.W3
SUBSTRATE TOTALITY`, `VJ.W4 THE BIG ROCK`). K's posture is to DEFER, not to add. The L-SEED §7
items, with their N status:

| VJ item (L-SEED §7) | What | gates kf | N status |
|---|---|---|---|
| **VJ.W0 RIPEN** | VJ-1 `cssLinearFromString` beside `cssLinear` (kf deletes ~30 LoC of `parseLinearStops` shim on consume — EF-3 retirement); VJ-4 bound parse-cache memos `{maxCacheSize}`; VJ-6 parse-that `^0.8.2→^0.9.0` | ungated; publishes 0.12.0 | **N.W7 landed** — parse-that `^0.9` re-pin ✓ (N.md:151); LRU memoize bound (F3/VJ-F6) ✓; `linear()`/`steps()` parsers (E1/E2) ✓. **VJ-1 `cssLinearFromString` — VERIFY against N's shipped surface** (see §3.1) |
| **VJ.W1 SCROLL GRAMMAR** | `CSSTimelineOptions` typed extractor + inverse serializer (`animation-timeline`/`-range`/`timeline-scope`/`animation-trigger`, `scroll()`/`view()`) — the ONE genuine net-new grammar | gates K.W2 (deferred to L's SO-1) | **NOT in N.** Net-new; un-scheduled in value.js |
| **VJ.W2 PERCEPTUAL RAMP** | `sampleColorRamp(from,to,n,{space,hueMethod})` beside mix.ts, reusing `lerpColorValue`+`gamutMapOKLab` | gates K.W3/L's CC-2 (MEASURE-FIRST) | **NOT in N.** Net-new; un-scheduled |
| **VJ.W3 SUBSTRATE TOTALITY** | VJ-9 the TOTAL partial-input contract across every public parse entry (B1 crash class generalized) → VJ-3 diagnostics PRODUCER | K1/K3 tripwires | **PARTIAL in N** — diagnostics sink (VJ-F2) ✓ N.W7.A; the `parseCSSValueUnit` empty-input contract already shipped (0.11.2, commit `fbea3e2`); the FULL partial-input totality is broader |
| **VJ.W4 THE BIG ROCK** | VJ-2 arc-length path sampler (MorphSVG/numeric-MotionPath parity) + MCI-5 arity pad + VJ-5 out-buffer | L parity-gated | **PARTIAL in N** — path-geometry sampler (VJ-F1) ✓, MCI-5 arity pad ✓, buffer-reusing unflatten (VJ-F4) ✓ N.W7.A. **The arc-length sampler VJ-2 may be the VJ-F1 item or a deeper rock — verify** (see §3.2) |

### 3.1 VJ-1 `cssLinearFromString` — the one open verify

L-SEED §7 names VJ-1 as the kf consume-edge: a `cssLinearFromString` helper *"beside `cssLinear`"*
that lets kf delete its `parseLinearStops` shim (~30 LoC). value.js TODAY exports BOTH
`cssLinear` (`src/index.ts:233`) AND `parseLinearStops` (`src/index.ts:238`, from
`parsing/easing`). The question for X-KF-ITEMS: **does value.js's published surface already give kf
the string→fn path it needs, or is the `cssLinearFromString` convenience still owed?** N.W7's
`linear()` parser (E1) likely covers this. This is a BOOK-with-verify, not a confirmed gap — it
gates only kf's L cleanup, not N's close.

### 3.2 The two genuine net-new value.js grammars K's L needs (NOT in N)

The only L-SEED items value.js has NOT touched are **VJ.W1 (scroll-timeline grammar)** and **VJ.W2
(`sampleColorRamp`)**. These gate kf's L (the SO-1 scroll wave + the CC-2 perceptual-densify pixel
proof). **They are correctly absent from N** — N's scope is the user-audit repair + 0.12.0, not the
kf round-trip frontier. But for the constellation handshake, **X-KF-ITEMS should record them as the
value.js work L will need, so a future value.js tranche (post-N, the value.js successor to N) can
schedule them in its OWN process** — exactly the phasing L-SEED §3.1 describes ("L starts
un-blocked because the grammar shipped in the interval"). N is NOT obligated to ship them; the
record prevents them being forgotten when L develops.

---

## §4 — The L-SEED frontier (the boundary map)

L-SEED is kf's NEXT-tranche seed (the frontier deferred WHOLESALE from K). Its value.js relevance:

- **L-SEED is where kf consumes value.js 0.12.0.** N ships; L consumes. The acyclic publish-spine
  (MEMORY: *"value.js = the pure sink … value.js 0.11.0 → glass-ui 3.3.0 → consume"*) holds: value.js
  publishes grammar, kf+glass-ui consume one tranche behind. There is no cycle and no contention.
- **The boundary principle (`L-SEED.md:171-180`, charter law):** *value.js owns VALUES (parse +
  serialize, the keyframes + shorthand grammars, DOM-aware computed resolution, color science,
  easing/bezier math, interpolation kernels); keyframes.js owns TIME (frames, playback, group/
  sequence/stagger, WAAPI + CSS compile, CSSOM walk, physics).* **Spring/decay math stays in kf
  PERMANENTLY** (the "value.js owns spring math" hypothesis was researched-FALSE — value.js ships
  zero spring code; glass-ui consumes spring FROM kf). This bounds U27: the easing CURVE math + the
  bezier presets are value.js's; the PLAYBACK/spring is kf's; the EDITOR COMPONENT is glass-ui's
  (the published primitive). The three-way ownership is already drawn.
- **The 12 KILLs (`L-SEED.md §5`) + BOOKs (§6)** are kf-internal (CC-1 compiler ineligibility, VT
  dispatcher, etc.) — no value.js surface. Not an N concern.
- **ED-3 "dogfood inversion" (the demo consumes the PUBLISHED barrel)** is a kf frontier item with a
  value.js PARALLEL: N's own `inv-N-6` (registry consumption at close) + the L-close-on-N-substrate
  re-confirm (N.W9.C). Both repos are independently moving demos onto published barrels — a shared
  discipline, no cross-dependency.

---

## §5 — The overlap matrix (the deliverable)

| # | Edge | kf K position | glass-ui BA position | value.js N position | Owner of the unowned work | N action |
|---|---|---|---|---|---|---|
| **O1** | U27 easing-configurator (the published glass-ui primitive) | NO publish; K.W4 touches spring/`KeyframesEditor` not the easing canvas; the kf `EasingEditor`/`EasingCurveCanvas`/`EasingSelect` trio is the donor | `BezierEditor.vue` is the Tailwind-first twin (demo-only, BA motion-suite, being extended w/ `StepsEditor`); NOT published | `gradient/EasingSelector.vue` is the weakest (no editing) — the U25/U27 pane | **glass-ui** (net-new published primitive — in NEITHER sibling's charter) | author a **glass-ui tranche item** (X-KF-ITEMS): publish `EasingEditor`/`EasingCurveCanvas`/`EasingSelect` as a glass-ui primitive, consuming value.js `bezierPresets`/`CSSCubicBezier`; re-point all 3 demos (kf rail, glass-ui story, value.js gradient pane) onto it |
| **O2** | U8 bounded/scrolling dropdown | the `max-h-[var(--easing-dropdown-max-h)]` mechanism on glass-ui `SelectContent` (`EasingSelect.vue:29`) IS the user's reference | glass-ui owns `SelectContent` | `EasingSelector.vue:45` already does the lighter `max-h-[16rem]` | **glass-ui** (`SelectContent` collision-aware bounding) | author a **glass-ui tranche item**; co-schedule with O1 (shares the donor) |
| **O3** | The witness flips (MCI-5 et al.) | the `it.fails` witnesses live KF-side; flip when kf consumes 0.12.0 (deferred to L) | n/a | **0.12.0 SHIPPED the grammar** (N.W7.A+B DONE; 11 items + witness-mirrored) | none — phasing is correct | **notify kf at 0.12.0** (N.md:236 already records this); no N work owed |
| **O4** | the value.js re-pin in kf | K HOLDS value.js `^0.11.2`; DEFERS the consume to L (`L-SEED.md:30-43`) | n/a | publishes 0.12.0 | kf's **L** tranche (re-pins value.js, wires consume-edges) | none — N is the upstream half; L is downstream |
| **O5** | new VJ asks born in K | K adds NONE; defers to the pre-existing L-SEED §7 ledger | n/a | N.W7 landed VJ.W0 + parts of VJ.W3/W4 | future value.js tranche (post-N) for **VJ.W1 scroll grammar + VJ.W2 `sampleColorRamp`** | RECORD VJ.W1/W2 as the value.js work L needs (NOT an N obligation); VERIFY VJ-1 `cssLinearFromString` against N's shipped `linear()` parser |
| **O6** | the L-SEED frontier / boundary | L consumes value.js 0.12.0, un-blocked because N shipped first; spring math stays kf | glass-ui owns the editor COMPONENT; consumes spring from kf | value.js = the pure sink (owns curve math, not playback) | n/a — boundary already drawn | re-confirm L's close on the post-N substrate (already N.W9.C) |
| **O7** | stale L-SEED census | L-SEED §7 census says "0.11.2 + 2 patches, M never dispatched" — one tranche behind | n/a | 0.12.0 shipped; N supersedes M | n/a | **notify kf** so L re-anchors its preface on N's PROGRESS, not the stale census |

---

## §6 — The X-KF-ITEMS substrate (the three constellation items this lane seeds)

1. **GLASS-UI item (PRIMARY, serves U27 + U8 + U25 + value.js U30a):** publish the easing editor as
   a first-class glass-ui primitive. Donor: the kf `EasingEditor`+`EasingCurveCanvas`+`EasingSelect`
   trio (richest) reconciled with glass-ui's own `BezierEditor.vue` twin (Tailwind-first, already
   value.js-driven). Must consume value.js `bezierPresets`/`CSSCubicBezier`/`timingFunctions`/
   `timingFunctionDescriptions` (all barrel-exported, `src/index.ts:226-238`). Three consumers
   re-point onto it: kf's easing rail (deletes the demo-local trio), glass-ui's curve-gallery story,
   value.js's `gradient/EasingSelector.vue` (the U25/U27 first-class upgrade). **Coordinate with
   glass-ui's BA `W-FOURIER-STUDIO` `StepsEditor` fold so the steps sub-editor lands in the
   published primitive, not a fourth demo-only fork.** Bound by L-SEED's boundary law: the editor
   COMPONENT is glass-ui's, the curve MATH is value.js's, playback/spring is kf's.

2. **value.js item (the consumer side of #1):** `gradient/EasingSelector.vue` → consume the
   published glass-ui easing primitive (replacing the 66-LoC thin select+thumbnail). This is the
   concrete U25/U27 deliverable on the value.js side; it ALREADY lives in N.W6.C ("easing-curve as
   the gradient pane's hero motif + tokenized stroke") — but N.W6.C scopes only a "hero motif," NOT
   the first-class editor U27 demands. **N.W6.C must be UPGRADED**, or a new wave-item authored, to
   consume the glass-ui primitive (gated on glass-ui shipping it). VERIFY VJ-1 `cssLinearFromString`
   against N's shipped `linear()` parser (E1) — kf's L cleanup gate, low priority.

3. **Constellation phasing record (no N work owed, prevents drift):** value.js publishes grammar (N,
   0.12.0 — DONE); kf consumes one tranche later (L re-pins value.js + flips the `it.fails`
   witnesses); glass-ui owns the published editor primitive. RECORD the two genuine net-new value.js
   grammars L will need (VJ.W1 scroll-timeline, VJ.W2 `sampleColorRamp`) for a future value.js
   tranche. NOTIFY kf that 0.12.0 shipped + M is superseded by N so L re-anchors its preface off
   N's PROGRESS, not the stale L-SEED §7 census.

---

## §7 — Terminal reading

The whole X-KF overlap reduces to one sentence: **value.js owns the easing math, all three repos
hand-rolled their own editor on it, and U27's "abstract INTO glass-ui" is the natural sink that
NEITHER kf's K nor glass-ui's BA scheduled — so it is a net-new glass-ui primitive item N must seed
across the constellation, with value.js's gradient pane as its first consumer and value.js's
`bezierPresets`/`CSSCubicBezier` as its substrate.** On the library axis there is no contention: N
already shipped the grammar (0.12.0) that K deferred to L, so kf's L consumes a STRONGER value.js
than the L-SEED census knows about — the phasing is correct, the only owed acts are notifications
(0.12.0 shipped, M superseded) and a record of the two scroll/ramp grammars L will eventually need.

# N — EXECUTION-ORCHESTRATION: the value.js forward run-plan + the K-grammar fold + the constellation cadence

**Status: RATIFIED 2026-06-15.** Both dispatch gates this plan named (§5) are satisfied: the
**WAVES-2 second block** is RATIFIED (PLANNED→RATIFIED across `N.md §4.1`, `PROGRESS.md`,
`WAVES-2.md`), and **the grammar fold (§3)** is RATIFIED into N's R2 library track —
`sampleColorRamp` = N.W11.D, the scroll-timeline grammar = N.W11′, both → **0.13.0** (the post-N
Tranche O fallback was NOT elected). The forward arc (§1) and the round structure (§2) are the
ratified run-order; the one remaining cross-repo wait is the glass-ui BA 4.0.0 cut, gating only
N.W18 + the N.W9′ registry pin. DOCS ONLY — nothing is implemented; each wave still dispatches on
the orchestrator's round-by-round fan-out per §2.

**Provenance:** authored 2026-06-15 by the constellation orchestrator (the kf arm, cross-repo
hand-off — the mirror of `../keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md` and
`KF-TO-VALUEJS-GRAMMAR-ASKS.md`). This doc does NOT re-author `N.md` (the charter) or `WAVES-2.md`
(the second-block plan); it SYNTHESIZES them into an executable run-order, FOLDS the kf-dispatched
grammar into N's library track (a proposal for ratification), and maps the three-repo cadence.
DOCS ONLY — nothing is implemented; every wave still dispatches on explicit user ratification.

**Why this doc exists:** N is a large two-block tranche targeting v1.0.0 (`N.md`, `PROGRESS.md`).
The first block (W1–W7) is implemented and shipped 0.12.0; the second block (WAVES-2 W10–W18) is
**developed and RATIFIED (2026-06-15)**; and a third concern — the kf-K frontier fold (2026-06-15) —
dispatched two net-new value.js grammars (VJ.W1 scroll-timeline, VJ.W2 `sampleColorRamp`) that
N.W18.C originally only "recorded for the post-N successor" and that this plan **folds into N's
library track (N.W11.D / N.W11′, RATIFIED — §3)**. This plan orchestrates ALL of it into one
forward arc.

---

## §0 — STATUS VERDICT (where N actually stands)

| Block | Waves | State |
|---|---|---|
| **First block** | N.W0–N.W7 | **LANDED** — W0 charter ratified; W1 boot-truth, W2.A types, W3 CRUD, W4 deploy-artifacts, W5 design-system consume, W7 library-asks all DONE; **0.12.0 PUBLISHED** (W7). Residue: W2.BC executing; W4 wire-deploy → W8′ ceremony. |
| **First block tail** | N.W8/W9 | **RE-SEQUENCED** → W8′ (hygiene + wire-deploy + doc-truth) / W9′ (v1.0.0 + π + FINAL), AFTER the second block. |
| **W6 (the dead wave)** | — | **SUPERSEDED** — died un-implemented; re-divined into W10–W18 by the 2026-06-12 user audit (U1–U33). |
| **Second block** | N.W10–N.W18 | **DEVELOPED + RATIFIED (2026-06-15)** — the 33-finding repair; `WAVES-2.md`. The WAVES-2 revision was user-ratified; the waves dispatch on the §2 round-by-round fan-out. |
| **The grammar fold** | VJ.W2 / VJ.W1 → N.W11.D / N.W11′ | **RATIFIED (2026-06-15)** — folded into N's R2 library track (the post-N Tranche O fallback was NOT elected); `sampleColorRamp` = N.W11.D, the scroll grammar = N.W11′, both → 0.13.0 (§3). |

**The constellation snapshot (2026-06-15, orchestrator-verified):**
- **value.js** `0.12.0` published (the RIPE edges `lerpArray`/`deltaEOK`/`reverseAnimationShorthand` + the N2 witness-flip slate all live); on `tranche-f-handoff`, not yet merged to master (W8′.A).
- **glass-ui** `3.13.0` published, **`tranche/BA` cutting 4.0.0** — LIVE, "Batch 4 closed, six glass-grammar waves live-verified." The BA cut carries the U-fix mass.
- **keyframes.js** `4.2.0` published (J closed); **Tranche K developing** — Band I repair + Band II frontier (just folded in, 2026-06-15). K.W1 consumes value.js 0.12.0 + glass-ui 3.13.0/BA; **K.W9/K.W10 gate on value.js VJ.W1/VJ.W2.**

**The cross-repo gates, exactly:**
1. **glass-ui BA cut (4.0.0)** → gates value.js **N.W18 + N.W9′** (the registry pin; `inv-N-6` amended 3.13.0 → the BA cut) AND informs kf **K.W1** (pin 3.13.0 now vs wait for BA).
2. **value.js N library grammar (VJ.W1/VJ.W2, → 0.13.0 if folded)** → gates kf **K.W9 (scroll-as-CSS) + K.W10 (compiler CC-2 densify).**
3. **value.js 0.12.0** → already feeds kf **K.W1 (re-pin) + K.W6 (the N2-resolved DL rows)** — DISCHARGED.

The spine is acyclic: glass-ui → value.js → keyframes; each consumes one tranche behind. No cycle.

---

## §1 — THE FORWARD ARC (three phases, one tranche + one successor)

```
  PHASE A — RATIFY + RUN THE SECOND BLOCK (the bulk repair; mostly BA-independent)
     N.W10 (gate-opener: functional truth + the save-P0 + the cascade kill)
        → N.W11 (color-SOTA library → 0.13.0)  ∥  N.W12 (grand hierarchy)
        → N.W13 (controls) ∥ N.W14 (cards) ∥ N.W15 (perf) ∥ N.W16 (per-pane) ∥ N.W17 (shell/motion/pops)
  PHASE B — CLOSE N AT v1.0.0 (gated on the glass-ui BA cut)
     N.W18 (the BA-cut consume sweep + adopt) → N.W8′ (hygiene + wire-deploy + doc-truth) → N.W9′ (v1.0.0 + π + FINAL)
  PHASE C — THE GRAMMAR (folded into Phase A's library track, §3) — un-blocks kf-K
     VJ.W2 sampleColorRamp → folds into N.W11 (the color-SOTA wave)
     VJ.W1 scroll-timeline grammar → a sibling library wave (N.W11′) beside it → 0.13.0 ships both
```

**The load-bearing ordering:** N.W10 is the **gate-opener** — it kills the unlayered-glass-ui-CSS
cascade (U11's true root: the desktop dual-pane never renders) and the save-data-loss P0. Until
W10 lands, the desktop demo does not render, so EVERY later design wave's console-clean /
in-viewport gate is structurally blind (the same blindspot class kf-K's cold-axis invariant
names). W10 leads exactly as kf-K.W0 leads. Then the library wave (W11 + the grammar fold) and the
design waves (W12–W17) parallelize. Phase B closes on the BA cut.

---

## §2 — PHASE A EXECUTION (the second block, in rounds)

The WAVES-2 board (`WAVES-2.md §1`) is mostly **NOT BA-blocked** — only W18 gates on the cut.
W10–W17 run unilaterally on ratification, in rounds by dependency:

| Round | Waves | Why this round | BA? |
|---|---|---|---|
| **R1 (the gate-opener)** | **N.W10** | Functional truth + the cascade kill + single-mount — MUST land first so the desktop renders and every later design gate is honest (the W10.D computed `display ≠ none @1440` assert is the substrate for W12–W17's gates) | no |
| **R2 (library ∥ keystone)** | **N.W11** (color-SOTA → 0.13.0, **+ the grammar fold §3**) ∥ **N.W12** (the grand hierarchy: font root, accent axis, dark ladder, container-query layout) | W11 is library-only (no demo dep — runs beside everything); W12 is the design keystone the controls/cards waves consume | W12 gray-half free at pin |
| **R3 (the design body)** | **N.W13** (controls) ∥ **N.W14** (cards) ∥ **N.W15** (perf) ∥ **N.W16** (per-pane) ∥ **N.W17** (shell/motion/pops) | file-adjacent but separable; each carries `[data-*]` interims for the BA-axis fixes that close at W18 | interims until W18 |
| **R4 (the cut consume)** | **N.W18** | the BA-cut re-pin + the full inv-N-10 abrogation sweep + the enumerated adopt checklist (the `[data-size]`/watercolor-ghost/Select-rung interims DIE here) | **GATED on BA 4.0.0** |
| **R5 (close)** | **N.W8′** (hygiene + master-merge + wire-deploy + doc-truth) → **N.W9′** (v1.0.0 + π + FINAL) | the wire-deploy ceremony + the v1.0.0 publish | pin discharged by W18 |

**Orchestration mechanics (per the N model discipline — orchestration/synthesis on the core
model, fan-out on opus/sonnet, the per-pane design wave on Fable):** each round is a parallel
fan-out over file-disjoint wave lanes; the design waves carry the standing per-pane Fable
design-audit facility (the dead-W6.A structure, re-runnable) + π paired before/after evidence at
every design gate; the save-P0 (W10.C) and the cascade kill (W10.D) are born-RED-witnessable on
the live built demo TODAY.

**The dirty-tree cleanup (folds into W8′.B):** the 13 dirty files are W6-audit residue
(`.w6a-audit*.mjs`, the data-url dumps, `$OUT`) + the staged CHANGELOG/CONTRIBUTING/VENDOR-POLICY
deletions + the precepts-submodule dirt — all W8′ hygiene items; `.gitignore` the audit-script
class.

---

## §3 — THE GRAMMAR FOLD (the recommended orchestration — symmetric to the kf-K fold)

> **→ developed to executable depth in `GRAMMAR-FOLD.md`** (the two producer signatures, the born-RED gates, the K.W9/K.W10 consume cadence, the slot table, the dispatch gate). This § states the recommendation; that doc is the spec.

kf-K's frontier fold dispatched two grammars to "value.js's post-N successor" (`N.W18.C`,
`KF-TO-VALUEJS-GRAMMAR-ASKS.md`). **Recommendation: do not defer them to a post-N tranche — fold
them into N's library track, shipping in 0.13.0.** The case mirrors the kf-K fold exactly:

- **VJ.W2 — `sampleColorRamp(from,to,n,{space,hueMethod})`** belongs IN **N.W11** (the color-SOTA
  library wave already cutting 0.13.0, doing gamut-map re-anchor + wide-gamut egress). It reuses
  `lerpColorValue` + `gamutMapOKLab` — the exact substrate N.W11.A/B/C already touch. Folding it in
  is ~S-effort beside the wave's existing color work; deferring it spins up a whole post-N tranche
  for one sampler. **Fold → N.W11.D.**
- **VJ.W1 — the `CSSTimelineOptions` scroll-timeline grammar** (`animation-timeline`/`-range`/
  `timeline-scope`/`animation-trigger`; `scroll()`/`view()`/range-phase) is the ONE genuine net-new
  GRAMMAR — bigger (a parser + inverse serializer). It does NOT fit N.W11's color scope, but it IS
  pure library work (parsing), value.js-internal, no demo dependency — so it rides beside the
  library track as a sibling wave **N.W11′ (the scroll-grammar library wave)**, born-RED against the
  kf-K consume edge, shipping in the same **0.13.0** cut.
- **Net:** value.js ships **0.13.0 = N.W11 (color-SOTA + the ramp) + N.W11′ (scroll grammar)**,
  un-blocking kf-K.W9 (scroll) and K.W10-CC2 (densify) **within the constellation beat**, not a
  tranche later. The acyclic spine holds: value.js publishes 0.13.0; kf-K consumes one beat behind.

**The trade-off, named:** folding the grammar adds two library items to N (already large). But they
are library-only (no demo coupling, no BA gate, no contention with the design body W12–W17 — they
run beside it in R2), and the alternative (a post-N tranche for two items) is the heavier path. If
N is judged too large to absorb them, the clean fallback is a tight **post-N Tranche O** (library-
only: VJ.W1 + VJ.W2 + any VJ-ledger residue) dispatched the moment N's library track is free — but
the fold is the better constellation move (value.js and keyframes advance together, as they just
did at 0.12.0).

---

## §4 — THE CONSTELLATION ORCHESTRATION (the three-repo cadence)

```
   glass-ui (tranche/BA → 4.0.0, the U-fix mass)
        │  publishes the cut
        ▼
   value.js (N → v1.0.0)                          keyframes.js (K: Band I repair + Band II frontier)
     0.12.0 ✅ ───────────────────────────────────▶ K.W1 re-pin + K.W6 (DISCHARGED)
     N.W18 consumes BA 4.0.0 ◀── BA cut ──┐
     0.13.0 (N.W11 + N.W11′, the fold) ───┼────────▶ K.W9 (scroll) + K.W10 (compile CC-2)
     v1.0.0 (N.W9′, pin = BA cut) ◀────────┘
```

**The cadence (each arrow is a PUBLISHED consume, born-RED-gated downstream — never a `file:`
link or vendored copy):**
1. **glass-ui ships BA 4.0.0** → value.js N.W18 runs the abrogation-sweep + adopt; kf-K.W1 decides
   pin (3.13.0 now, or hold for BA 4.0.0 if its U-fix mass matters to the K design band).
2. **value.js ships 0.13.0** (N.W11 + N.W11′ grammar fold) → kf-K.W9/K.W10's consume edges light.
3. **value.js ships v1.0.0** (N close) → the constellation's value layer is 1.0; kf-K consumes it
   at K close.

**The two genuinely cross-repo waits:** value.js N.W18/W9′ ON glass-ui BA 4.0.0; kf-K.W9/K.W10 ON
value.js 0.13.0. Both are PUBLISHED-consume waits (the work lands born-RED, the edge lights on the
publish) — neither blocks the producing repo's own progress. glass-ui BA is already cutting; the
constellation is moving.

---

## §5 — THE DISPATCH GATES (the two user gates RATIFIED; one cross-repo wait remains)

| Gate | What it unblocks | Owner | State |
|---|---|---|---|
| **Ratify the WAVES-2 second block** | N.W10–N.W18 dispatch (the 33-finding repair; the save-P0; the cascade kill) — the bulk of value.js's remaining v1.0.0 work | **user** (the explicit WAVES-2 ratification N's PROGRESS gates on) | **RATIFIED 2026-06-15** |
| **Ratify the grammar fold (§3)** | N.W11.D (`sampleColorRamp`) + N.W11′ (scroll grammar) → 0.13.0 → un-blocks kf-K.W9/K.W10 | **user** (the post-N Tranche O fallback was NOT elected) | **RATIFIED 2026-06-15** |
| **glass-ui BA 4.0.0 cut** | N.W18 + N.W9′ (the v1.0.0 pin) | glass-ui's BA tranche (LIVE, on track — Batch 4 closed) | the ONE remaining wait |

**The two user gates are RATIFIED (2026-06-15); the run is fully orchestratable** in the round
structure of §2 (R1 gate-opener → R2 library+keystone → R3 design body → R4 BA-consume → R5 close),
with the grammar folded into R2's library track. The only remaining blocker is the glass-ui BA
4.0.0 cut, gating only N.W18 + the N.W9′ registry pin (the pin is the gate, not the work). Nothing
here is implemented; this is the ratified executable plan.

---

## §6 — THE ONE-PARAGRAPH READING

value.js N is two-thirds landed — the first block shipped 0.12.0; the second block (the 33-finding
user-audit repair, W10–W18) is developed and waiting on your ratification; v1.0.0 closes on the
glass-ui BA cut, which is already in flight. The full execution is one forward arc: ratify and run
the second block in five rounds (the cascade-kill gate-opener leads, then the library and design
body parallelize, then the BA-consume and the v1.0.0 close), and FOLD the two kf-dispatched
grammars into N's library track so value.js ships them in 0.13.0 and keyframes-K un-blocks in the
same beat — exactly as value.js and keyframes advanced together at 0.12.0. The constellation is
acyclic and moving: glass-ui cuts BA, value.js consumes it and ships its grammar, keyframes
consumes that — each one tranche behind, each a published edge, no cycle. Two ratifications open
the whole run.

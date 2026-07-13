# V · pass-2 · CRITIQUE — CHARTER B (the execution vehicle F6 + banked-F2 substrate)

**Critic**: pass-2 fresh critic (NON-author — did not write `charter-b.md` /
`charter-b-move-manifest.md` / the `_proto/*.mjs` instruments). **Mode: RAN** —
every checkable claim re-measured against `tranche-u` HEAD (`d365053`, charter-b
committed) and the worktree HEAD `9423094` the protos re-based to; the `_proto`
instruments read for genuineness. Charter B governs the 5 RUN items of
AGGLOMERATION §3·Charter-B; the self-report claims **5/5 RAN**.

**Verdict up front: earned convergence 45%.** Charter B is the strongest-RUN
deliverable of the pass-2 batch: **all five items carry a real, sophisticated
instrument that executes** — no SPEC-ONLY-where-RUN-was-mandated — and its two
most falsifiable sub-claims (the useColorPipeline census-precision correction, the
goo-blob→blob baseline flip) **verify TRUE on disk**. It genuinely closes the
pass-1 docks that held F6 at 37% (scatter-not-rename, the manifest, the src carve)
and F2 at 40% (validated scanner, the order-independent registry). It has **no
load-bearing claim falsified on disk** — the failure mode that docked retro-f3
(40%) and retro-f4 (36%). What holds it below 50% is a single, verified pattern of
**degree-overstatement in the composed thesis**: the headline convergence ("18/0,
proven before a file moves," "two independent instruments, same verdict") is true
only at the coarsest binary grain — at the destination grain the manifest exists
to ratify, the two RAN lanes disagree on **5 of 18 files, two by outright
reversal**, and the strong 18/0 is a flat-predicate artifact its own ⚠ rows half-
concede. Real execution, honestly gated, wearing a convergence headline the method
does not settle.

---

## What HOLDS (verified on HEAD — measurement earns, elegance earns nothing)

- **All 5 items genuinely RAN with real instruments, not stubs.** Confirmed on
  disk at `wf_1112d3db-442-4/_proto/`: `codemod-scatter.mjs` (9 KB),
  `census-color.mjs` (7 KB, + `color-manifest.json`), `carve-units.mjs` (4 KB),
  `carve-color-scc.mjs` (3 KB), `scan-demo.mjs` (9 KB), `scatter-mv-plan.sh`. The
  scripts are careful: `carve-color-scc.mjs` correctly distinguishes the
  `from ".."` = **color barrel** (inside `conversions/`+`gamut/`) from `from ".."`
  = **value barrel** (`units/index`) in `color/*.ts` itself — the exact ambiguity
  a naïve regex would corrupt. `census-color.mjs` reuses a resolver that resolves
  `@`-alias + `.vue` script-block extraction + index/`.js`→`.ts`. This is a real
  5/5 RAN, materially stronger than the sibling charter-a's 2-SPEC-ONLY items.
- **The census-precision correction is VERIFIED TRUE.** Charter-b's flagship
  correction of retro-f3 G2 ("useColorPipeline's import-edge truth on HEAD is
  App.vue + keys.ts only; the other 4 are comment mentions") is exactly right on
  disk: `valueDomain.ts:8`, `useColorPersistence.ts:29`,
  `useAtmosphereFrameCoalesce.ts:5`, `AboutPane.vue:12` all reference
  `useColorPipeline` inside `/* */`/JSDoc; only `keys.ts:4`
  (`import type … from "./useColorPipeline"`) + `App.vue` are real edges. **Import-
  edge counting over text-mention counting is a genuine methodological upgrade over
  retro-f3's substrate — credit.**
- **The demo-baseline-GREEN premise is real.** Commit `110b56f` (the goo-blob→blob
  U.W-ADOPT swap) exists; `grep glass-ui/goo-blob demo/` = **0** on HEAD.
  retro-f3 G4's "the D1 move is a 0-delta against a 12-error RED baseline" critique
  is **genuinely moot at HEAD** — the oracle is `EXIT 0` absolute, not delta-
  against-RED. This is the single most consequential drift and it verifies.
- **The order-independent registry is the real primitive critique-f2 G3 demanded.**
  `XYZ_FUNCTIONS` is confirmed an **eager** `const … = { … }` table on HEAD
  (`dispatch.ts:111`) — the init-order hazard is live; the lazy-memo fix is
  evidence-only, un-landed, exactly as claimed. The carve+registry co-design (2
  FAIL → 0, `color-conversions` 109/109) is the cycle-severance primitive F3's
  color capsule was blocked on, and it was BUILT and RUN, not asserted.
- **The scanner self-refutation is the strongest validation class.** Item 4a
  reproduced the `ComponentSliders` false-positive CLASS first-hand (the `.vue`
  `<style>` comment-strip bug producing 3 NEW false-positives), then disarmed it —
  the exact critique-f2 G4/G5 precondition ("no demo verdict is actionable until
  the false-positive class is disarmed"), met by living the failure, not asserting
  around it.
- **Clean-break holds end-to-end for charter-b's deliverables.** The scatter is an
  atomic `git mv` + rewrite (no transitional `@`-alias window); the carve keeps the
  8-key exports map byte-stable via a PURE re-export barrel (a single canonical
  path, not a dual path), with export-map de-indirection explicitly DEFERRED as
  glass-ui deferred 5.1.0. No masking fallback, no alias straddle.
- **Neither owner-fork is pre-decided.** §6 holds the `@`-ban idiom
  (eslint-vs-`proof:*`) and the api vocabulary both open and routes them to the
  owner; the scatter+carve are shown idiom-agnostic ("need NEITHER to prove
  correctness"). Correct discipline.
- **Housekeeping verifies**: `units/value-unit.ts` ABSENT (carve un-landed,
  evidence-only ✓); `test/*.test.ts` = **85 files** ✓; 11 `proof:*` scripts
  present, `subpath-budget` among them ✓; `composables/color/` = **18** files ✓.

Everything below is the distance between that RAN execution and the composed
thesis's convergence headline.

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — [LOAD-BEARING] the cross-lane convergence is overstated: the two RAN lanes place 5 of 18 files at DIFFERENT homes (two by reversal), not "a 1-file methodology refinement"

Charter-b §2 (and §8) claims the sibling charter-a "landed **17/18 PROMOTE, 1
COLOCATE** — the same headline verdict … reached by two independent instruments …
**neither finds a feature-capsule** … The 1-file delta is a methodology
refinement, not a disagreement." Re-measured against charter-a's own manifest
(`charter-a.md` L58-69), that framing collapses on two counts:

- **"Neither finds a feature-capsule" is contradicted by its own citation.**
  charter-a's 1 COLOCATE is `generate-color.ts` → `custom/generate/composables/`
  (`charter-a.md:63`, `COLOCATE→feature`). Colocating a file INTO a feature's
  folder **is** the feature-capsule move. So one of the two "converging" lanes
  found exactly one feature-capsule; the blanket "neither finds a feature-capsule"
  is false as stated. (The defensible claim — that the *spec's* "15→color-picker
  capsule" is refuted — is true; the generic version is not.)
- **The "1-file delta" is true only at the binary grain.** At the DESTINATION
  grain — the grain the manifest (item 2) exists to let a human ratify — the two
  RAN trees diverge on **five** files:

  | file | charter-a home | charter-b home | kind |
  |---|---|---|---|
  | `generate-color.ts` | `custom/generate/composables/` (feature) | `@composables/` (kernel) | **REVERSAL** |
  | `ink-walk.ts` | `@composables/` (kernel, FOLLOW→ink) | `demo/color-picker/composables/color/` (app-root) | **REVERSAL** |
  | `useColorPipeline.ts` | app-cluster | `@composables/` (kernel) | different tier |
  | `useCustomColorNames.ts` | app-cluster | `@composables/` (kernel) | different tier |
  | `view-accent.ts` | app-cluster | `@composables/` (kernel) | different tier |

  That is **28% of the bucket placed differently**, including two files sent to
  *opposite* poles (`generate-color` feature↔kernel; `ink-walk` kernel↔app-root).
  charter-a computes a **5-kernel** tree; charter-b a **8-kernel** tree. The
  PROMOTE/COLOCATE binary agrees within 1; the physical codemod output — what
  actually gets committed — disagrees on 5.

- **Why this matters for the composed thesis**: charter-b's own §8 names its single
  most important finding as "the manifest **proves it before a file moves** …
  18/0." But the manifest's value proposition (item 2) is precisely that a human
  ratifies DESTINATIONS, not binary verdicts — and at exactly the destination
  grain, two runs of "the same CC-5 predicate" produce materially different tables.
  The manifest robustly proves DIRECTION (promote-dominant, the spec refuted); it
  does not prove the exact table, and presenting cross-lane agreement as settling
  the table overstates it.

- **What closes it**: reframe §2/§8 as "both lanes agree promote-DOMINANT and both
  refute the spec's 15→color-picker capsule; the exact partition (5-vs-8 kernel,
  generate-color's feature-vs-kernel home, ink-walk's follow-vs-flat) is predicate-
  sensitive and is precisely what the human ratifies on the manifest." Delete
  "neither finds a feature-capsule" (charter-a found one) and "1-file … not a
  disagreement" (five destinations differ).

### G2 — [LOAD-BEARING] "18/0 PROMOTE, 0 COLOCATE" is a FLAT-PREDICATE ARTIFACT; the strong form is not the robust finding

Charter-b's flat CC-5 emits COLOCATE only when **all** of a file's consumers sit
in exactly one real feature-root; every intra-bucket-consumed file is forced to
`PROMOTE(pipeline)`/app-root. So "0 COLOCATE" is close to what the flat predicate
is *built* to output for a heavily intra-coupled bucket — it is not an independent
discovery that no file wants a feature home.

The tell is `generate-color.ts`. Its external consumers are **one feature**
(`custom/generate/GenerateControls.vue` + `generate/composables/useColorGeneration.ts`)
plus **one bucket sibling** (`useColorParsing.ts`) — verified by grep. charter-a
reads the sibling as a transitive-follow → **COLOCATE→feature:generate** (the
defensible placement: the file serves only the generate feature). charter-b reads
the single bucket-sibling edge as "a second feature-root" → **PROMOTE all the way
to the shared cross-feature KERNEL** (`@composables/`). Promoting a file whose only
real external consumers are ONE feature into the *cross-feature-shared* kernel is a
questionable "kernel" citizen — charter-b's own kernel definition is "serves ≥2
unrelated features." The strong 18/0 headline (and its "0 colocate") rests on this
single flat treatment of one bucket-sibling edge.

Charter-b half-concedes this — the `PROMOTE(pipeline)` "flat approximation" note,
the ⚠ `useColorPipeline` row — but the §8 finding ("18/0, proves it") ships the
strong form. The robust, method-independent finding is the one retro-f3 G2
predicted: **promote-DOMINANT, the feature-capsule thesis refuted.** The exact
"18/0" and the kernel membership are artifacts of flat-vs-recursive.

- **What closes it**: retitle the finding "promote-dominant / feature-capsule
  thesis refuted" (robust across both methods), not "18/0 settled"; and reconcile
  `generate-color`'s kernel-promote against its single-feature external consumer
  set (charter-a's COLOCATE is the stronger placement for that specific file).

### G3 — [soft, honestly disclosed] item 1's runtime gate is `vite build`, not smoke; the provide/inject/setup-order survival is ARGUED, not measured, inside charter-b's deliverable

retro-f3 G4 + critique-f2 G1 made "does provide/inject/setup-order survive the
move" the load-bearing runtime question (the demo analogue of the `XYZ_FUNCTIONS`
init-order that broke the src carve). Charter-b's item-1 evidence for it is an
ARGUMENT — "the scatter RENAMES graph nodes without changing any edge's semantics
or import ORDER, so DI-key identity is preserved" (§1) — plus `vite build` EXIT 0,
not a runtime observation. The argument is sound (a file rename does not reorder
imports or change `Symbol()` identity), but it is not a measurement of the exact
risk the critiques elevated. Cross-lane it is covered: charter-a ran `smoke 2/2
zero-console` on the same `composables/color/` bucket. So the campaign has the
runtime confirmation — but charter-b's OWN item-1 deliverable rests on build-green
+ an argument, and AGGLOMERATION Charter-A item 1 (not B) is where "confirm
provide/inject/setup-order survives" is booked. §7.2 discloses this cleanly — it is
a soft, disclosed limitation, not a hidden gap.

- **What closes it**: a landing wave runs the 6-project smoke on the scattered tree
  (charter-b already stipulates it); the atomic scatter+smoke is a single wave act.

### G4 — [soft] the `units/index.ts` line count is misstated (452 vs the on-disk 451)

Charter-b §0 headline and §3 both state the carve goes "**452 → 17** lines." The
file is **451** lines on disk — at HEAD (`d365053`) AND at the worktree HEAD
`9423094` the protos re-based to (`git show 9423094:src/units/index.ts | wc -l` =
451). AGGLOMERATION §1 fact 1 ("451 L") and retro-f4 G3 ("451 LoC at HEAD,
confirmed by `wc -l`") both carry 451. A 1-line error is trivial in isolation, but
the charter's credibility claim is "every number below is MEASURED"; a carve
instrument reporting 452→17 on a 451-line file signals the headline number was
transcribed, not read off `carve-units.mjs`'s output. It weakly undercuts the
"MEASURED" contract the doc leans on.

- **What closes it**: correct to 451→17 (or state the exact source of the 452).

### G5 — [soft, cross-charter] the composed "F3 color capsule + registry → acyclic" is proven at the PRIMITIVE level only; the parsing/color→units/color merge is un-re-run at HEAD

Charter-b item 4b delivers the F2 **color-SCC carve + order-independent registry**
(barrel imports redirected to `base`/`spaces`, `color2` suite GREEN) — the
cycle-severance PRIMITIVE AGGLOMERATION §1 fact 3 says F3's color capsule needs.
That is correctly scoped and genuinely RUN. But the **parsing/color→units/color
MERGE itself** (F3's D3 color-capsule, the thing that gains `color→parsing`=5 and
inherits the barrel SCC) was NOT re-run on HEAD by charter-b (rightly — outside its
assigned item) nor by charter-a (which "cites F3's already-RAN merge result rather
than re-running it," per its own self-report). So the merged-tree acyclicity **at
HEAD** is unproven by the pass-2 batch; only the primitive the merge would consume
is proven. The composed claim "F3's color capsule needs" this registry is true, but
"the capsule now lands acyclic" is not demonstrated on HEAD — it is an inference
from the primitive.

- **What closes it**: state explicitly that merged-tree acyclicity-at-HEAD is
  unproven and the registry is the delivered severance primitive; route the merge
  re-run to the landing wave (or to charter-a's DOMAIN-capsule ratify).

---

## Failure-mode checklist — verdict per hook

| # | hook | verdict on Charter B |
|---|---|---|
| 1 | vacuous convergence (spec passes, owner edict unmet) | **MOSTLY CLEAN** — the owner's per-file SCATTER was genuinely RUN (three gates), not a rename; the residual is G1/G2 (the convergence *framing* overstates a directionally-true result). |
| 2 | gates that cannot fail | **CLEAN** — audit (`SAFE:true`), oracle (`vue-tsc` EXIT 0), build, subpath-budget 11/11, the `color2` suite are all real bites; the scanner's self-caught false-positives prove the gate can fail and was made to pass honestly. |
| 3 | elegant-reduction / "and then the hard part" | **CLEAN** — the two hard parts (the order-independent registry; the validated `.vue` scanner) were BUILT and RUN, not deferred. |
| 4 | dual paths / masked fallbacks / aliases | **CLEAN (credit)** — atomic `git mv`, byte-stable pure barrel, export-map de-indirection explicitly deferred (not a shim). |
| 5 | unverified gestalt | **PARTIAL — G1/G2** — "18/0 proves it / two instruments agree" is a gestalt at the destination grain (5-file divergence); "neither finds a feature-capsule" is unverified against charter-a's own COLOCATE. |
| 6 | consumer-less substrate | **INVERTED (like F2/F3)** — CC-5 HAS a consumer (the scatter, the F6 vehicle). Here the substrate is genuinely wired + validated (the census-correction verifies true) — the mirror failure does NOT recur; credit. |
| — | did every MUST-RUN item RUN | **YES — 5/5**, each with a real executing instrument; no SPEC-ONLY-where-RUN-required. |
| — | owner-reserved fork pre-decided | **NO** — `@`-ban idiom + api vocab both held open (§6); scatter+carve shown idiom-agnostic. |
| — | clean-break law end-to-end | **HOLDS** — atomic cut, no alias window, no dual path, deferral ≠ shim. |
| — | glass-ui / constellation referent | **direction holds** — the pure-barrel carve mirrors the landed `units/color/{base,spaces}` precedent; the registry is glass-ui STRUCTURE-SPEC §2.1's barrel-purity move made runtime-safe. |

## Circularity / masked-fallback sweep

- **Spec-cites-itself?** Minor. The convergence headline (§2) cites the sibling
  charter-a as an independent corroborator — legitimate — but rounds the corroboration
  to "same verdict, 1-file delta" when the destinations diverge on 5 (G1). The
  authority (two CC-5 runs) is real; the claimed agreement is coarser than the data.
- **Masked fallbacks?** None. The carve's pure barrel is a single canonical path;
  the scatter has no alias straddle; the registry replaces eager init with lazy
  memo (a correctness fix, not a fallback).
- **Gates that cannot fail?** None — every gate cited is a real bite, and the
  scanner's own false-positive self-disarm is proof the instrument can fail.

## What Charter B gets RIGHT (fairness — these are why 45% and not lower)

- **The corpus of RUNs is real and the checkable sub-claims verify.** Five
  executing instruments; the census-correction and the goo-blob flip both confirmed
  true on disk; the registry hazard confirmed live (`XYZ_FUNCTIONS` eager) with the
  fix correctly un-landed. This is more RAN, re-verified evidence than F6 (37%) or
  F2 (40%) carried into the fold, and — unlike retro-f3/f4 — **no load-bearing claim
  is falsified on disk.**
- **It closes the pass-1 docks it was chartered to close.** F6-1 (scatter not
  rename), F6-3 (manifest replacing the 221-diff eyeball), F6-4 (the src carve on
  D3), critique-f2 G3 (the order-independent registry), G4/G5 (the validated
  scanner) — each was RUN, not asserted.
- **The reviewability artifact is genuine.** The 18-row manifest is a real human-
  ratification surface with the ⚠ design-call flagged where the flat predicate
  splits a cohesive cluster — the placement judgment the oracle is structurally
  blind to, surfaced for override before the codemod runs.
- **Honest frictions are disclosed, not laundered** (§7): build-not-smoke (G3),
  the flat-predicate cluster split, the single-bucket scope, the un-landed atomic
  commit. The candor lives in the doc.

## EARNED CONVERGENCE: **45%**

| Surface | State | Effect on score |
|---|---|---|
| item 1 — per-file scatter (3 gates: audit ∧ oracle ∧ build) | **RAN, GREEN** — real codemod, not a rename | carries a large share |
| item 3 — `units/index.ts` carve (4 gates: typecheck · 2326 tests · build · subpath-budget 11/11) | **RAN, GREEN** (line count off-by-1, G4) | carries a large share |
| item 4b — order-independent registry / color-SCC carve | **RAN** — 2 FAIL→0, the real cycle-severance primitive; hazard confirmed live on HEAD | strong credit — the hardest part, actually built |
| item 4a — validated demo scanner + false-positive self-disarm | **RAN, validated by first-hand reproduction** | strong credit |
| item 2 — the pre-codemod manifest | **RAN** — genuine ratification surface, ⚠ flagged | credit |
| item 5 — HEAD re-derive + doc third gate + goo-blob flip | **RAN**, goo-blob premise verified true | credit |
| cross-lane convergence framing (18/0, "1-file delta," "neither finds a capsule") | **overstated** — 5-file destination divergence, 2 reversals (G1); 18/0 is a flat-predicate artifact (G2) | the dominant drag |
| item-1 runtime gate = build, DI-order argued not measured | disclosed, cross-covered by charter-a smoke (G3) | soft drag |
| merged-tree acyclicity un-re-run at HEAD (G5) | primitive proven, merge not | soft drag |

**Why above the pass-1 antecedents (F6 37% / F2 40%)**: charter-b RAN and closed
the exact docks that held them — the scatter, the manifest, the src carve, the
validated scanner, and the order-independent registry — with genuine instruments
and green gates, and its checkable claims verify true on disk. It is the best-RUN
deliverable of the batch.

**Why below 50%**: the composed thesis's convergence HEADLINE is overstated in
degree. "18/0, proven before a file moves" and "two independent instruments, same
verdict, 1-file delta" are true only at the binary PROMOTE/COLOCATE grain; at the
destination grain — the grain the manifest exists to ratify and the codemod
actually commits — the two RAN lanes disagree on 5 of 18 files, two by reversal
(G1), and the strong 18/0 is a flat-predicate artifact (G2). Add the disclosed
build-not-smoke DI gate (G3), the un-re-run merge (G5), and the 451/452 slip (G4).

**Why not BLOCKED**: no primitive is missing and none is faked. The hardest thing
(the order-independent registry) was BUILT, RUN, and gated by the `color2` suite it
had to pass; the scatter and carve RAN with green gates; the scanner was validated
by living its own false-positive. The gaps are all overstatement-of-degree or
disclosed-scope, each completable by a wave act — not a hidden hard part.

**Recommendation to the pass-2 agglomerator**: **ADOPT Charter B as the execution
half at 45%** — the F6 vehicle proven on the per-file scatter AND the src carve, the
order-independent registry as the delivered cycle-severance primitive, the validated
F2 scanner, and the manifest as the ratification surface. Two corrections before its
outputs are load-bearing: (a) demote the convergence HEADLINE from "18/0 settled /
two instruments agree" to "promote-DOMINANT, spec's feature-capsule refuted; the
exact partition is predicate-sensitive and human-ratified" — and reconcile the
5-file cross-lane destination divergence (especially `generate-color` feature-vs-
kernel and `ink-walk` follow-vs-flat) on the manifest, not in prose (G1/G2); (b) book
the DI-order runtime confirmation (smoke) and the merged-tree acyclicity re-run at
HEAD as landing-wave acts (G3/G5). The two owner-forks are correctly surfaced, not
settled; the clean-break law holds end-to-end.

# THRICE — SKEPTIC 2 · attack on `armB/program-PC-structure.md`
### assumption: the program is WRONG in every way · evidence-only · 2026-07-19

Inputs re-read whole: the program; sweeps `sweep-{value-lib,kf-lib,value-demo,kf-demo}.md`; L1/L2/C#
canon. Fresh greps run against value.js `tranche-u` + kf `keyframes-v-exec@master` + glass-ui src
(read-only; evidence inline). Verdict up front: **the program's facts are mostly sound (the sweeps
are good), but its SHAPE is wrong — a 14-wave serialized ceremony around ~6 waves of real work,
with one confirmed self-contradiction (F-05 vs its own frozen-surface charter), one unsatisfiable
acceptance gate (F-12), a narrowed C5 close, a contrived born-RED, and a priority inversion that
blocks the owner-decreed parser/color programs behind the 6th wave of a serial chain.**

---

## §1 — CONFIRMED DEFECTS (each verified on tree today)

### S2-1 · F-05 executes pre-boundary SURFACE CUTS that F-04 and charter §1.4 forbid — internal contradiction
Charter §1.4: "Surfaces stay FROZEN until the ONE co-land boundary… all restructures are internal;
this program emits a boundary-delta manifest, never its own surface cut." F-04's gate: "packed-surface
re-verify… keys and types unchanged (7 keys, same symbol set)." Then F-05 — sequenced mid-program,
and a hard dependency of F-06 ("decompose/quantize already out") — does:
- **quantize.ts DEMOTED to demo** → the frozen `./quantize` export key (verified live:
  `package.json` exports = exactly `./color ./value ./css ./easing ./math ./transform ./quantize`)
  loses its source. The key cannot keep resolving; the 7-key parity F-04 just certified goes false.
- **decompose.ts PRUNED** → `subpaths/transform.ts` aggregates `decompose` + `path`
  (sweep-value-lib §3), so the packed `./transform` surface LOSES symbols — a capability removal,
  the exact class P4.2 prices at the boundary.
Meanwhile the program routes the *smaller* same-class changes (`./quantize` KEY drop,
`collectDeclarations` trim) to co-land with tombstones. Same class, two treatments; and F-05's gate
list omits any packed-surface re-check, so the breach is **masked** (the close-class lie the canon
names). Cure: surface-affecting cuts are boundary-delta rows — execute at co-land, or early ONLY
under an explicit owner-ratified no-interim-publish freeze with the capability-diff gate live FIRST.

### S2-2 · F-12's acceptance gate is unsatisfiable as written — and `demo/shared/` is never adjudicated
Gate: `grep 'from "../ui/|/ui/' under demo = 0`. Verified today: the pattern matches **107 lines**,
including ~10 fully legitimate imports of `demo/shared/ui/{PaneHeader,EmptyState}.vue`
(e.g. `demo/workbenches/gradient/GradientPane.vue:4`, `demo/palettes/BrowsePane.vue:189,196`).
Dissolving the 19 `demo/ui/` barrels leaves the gate permanently RED unless `shared/ui/` is renamed —
a move no wave plans. Worse: `demo/shared/` (utils.ts + 2 components, 373 LOC) is exactly the
"shared/ dir" smell the owner's standing feedback (feedback_kiss_no_contrivance) names, and the
program — a STRUCTURE program — never mentions the directory at all.

### S2-3 · The C5 "structural close" is silently narrowed to component imports — shadcn-idiom residue survives
F-12 declares C5's prototype branch EMPTY-SET and closes on barrels + `components.json` + 4 reka
type leaks. Verified residue it misses: **`demo/shared/utils.ts` is the canonical shadcn `cn()`
utility** (`clsx` + `tailwind-merge`, both still value devDeps), imported by **7 demo files** —
while **glass-ui already exports `cn`** (`glass-ui/src/index.ts:281`). "Idiomatic glass-ui +
tailwind v4 usage only" (C5) covers idioms, not just component tags. A one-line retire-onto-glass-ui
+ two devDep drops, and it is absent from the program. The census method (import-tag grep) was too
narrow; a C5 close needs an idiom census (`cn(`/`cva`/`tailwind-merge`/`clsx`).

### S2-4 · F-08's "born-RED anchor-census gate" is contrived RED — gate theater under C21
The law (L1 §0/§9) is born-RED **"wherever the defect is live."** The 13 anchors pointing at
`src/animation/*` today is not a defect — it is the current CORRECT state of an unflattened tree.
A gate that asserts post-flatten paths and is "RED today" is a to-do list wearing a gate costume:
it can never catch a regression, only report that planned work hasn't happened. Contrast the one
genuine born-RED in the program (the manifest gate RED on the committed deps block — verified:
`dependencies: {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}` at HEAD). C21 says
little time on contrived gates; delete this one — the flatten's real acceptance is the triple
verify + zero packed-surface diff, which F-08 already carries.

---

## §2 — ARCHITECTURE AND ORDERING ATTACKS

### S2-5 · Priority inversion: the tranche's top-priority programs wait on wave 6 of a serial chain
The owner DECREED parse-that readoption (P1.6); R-DELTAE is "PREREQUISITE," priority 1 of the
restore ledger (P2.2). Both land "INTO" skeletons that F-06 authors — and F-06 sits behind
F-02 → F-03 → F-05 (plus F-01, plus "thrice clusters V-LIB-A/B converged"). A skeleton CONTRACT
costs zero churn to author; there is no reason the parser and color programs' landing interface
is the 6th artifact of a serialized chain. **Contracts first, day one.**

### S2-6 · Double churn: color/ is re-cut BEFORE the restore ladder lands 6+ new modules into it
F-06 splits `color/anchors.ts` and fixes the module cut now; then R-GAMUT/R-RAMP/R-OKHSL land
boundary/gamut/ramp/okhsl modules into the same dir (P2.2 rows 2,5,9), forcing a second cut. The
program's own instinct ("no pre-churn of the dying regex parser") is right for css/ and then
abandoned for color/. Structure should ENFORCE grammar (R1–R6) on color/ and prescribe its final
cut once — after, or jointly with, the restore landings.

### S2-7 · Enforcement-after-churn: F-10 depends on F-08, inverting the program's own sequencing law
The program cites P3.3 row 7 (MR2/MR4 before the ~340-line churn) as a HARD F-08 dependency — then
schedules its OWN new enforcement (kf test-mirror rule, support allowlist, boundary-cohesion clamp
fold) in F-10, AFTER the flatten, on the "author once, not twice" economy. That is false economy:
the flatten's test churn (265 test import lines; `test/engine/boundary-cohesion.test.ts` verified
inside the churn zone) runs with NO mirror lock and the clamp invariant still trapped in a file
whose anchors are moving. Rules keyed off a single path constant (exactly how depcruise's
`internal/` key already works, P4.1) are authored once AND enforced before the churn.

### S2-8 · §2 vs §3: settled targets AND 13 adjudicating clusters — the program can't have both
§2 declares outcomes as settled ("DISSOLVES," "PRUNED," "TARGET SKELETON ONLY") while §3 charters
13 thrice clusters to adjudicate those same structures — worst case ≈13×3×3 ≈ **117 Fable seats**
against C17 ("Fable cost is outrageous; every seat file-scoped and tight"). Either the clusters are
ceremony (C21 violation) or every §2-anchored acceptance gate is premature. Two clusters for a demo
the program itself calls "largely compliant post-W43," a V-TEST cluster for mechanical mirroring,
and three clusters for a 26-file 0-cycle library is thrice-as-ritual. Thrice belongs on the
genuinely contested cuts only (~5: the skeleton contracts, the value re-cut, the kf packet, the
api re-cut, the shared/-adjudication).

### S2-9 · F-01 is double work by the program's own law
§7.3 (re-derive at execution) is quoted in the header and then contradicted by an opener wave whose
archived DAGs/anchors are stale-by-design at every later wave's re-derivation. The artifacts largely
exist already (`armB/madge-src.json` 26 files/0 cycles; kf zone DAG + 13 anchors re-derived in
sweep-kf-lib §1/§3; the four-tree consumer census in sweep-value-lib §7). A blocking opener that
serializes 13 dependents to reproduce its inputs is process, not work. Fold DAG refresh into each
wave's step-0 — where the program already legally requires it.

### S2-10 · kf dispatch fragmentation: four coordination round-trips where one packet serves
F-08, F-09, F-10, F-13 are four separate SPEC-DISPATCH waves into one inbox for one kf successor,
each with its own ratification latency, each carrying overlapping fence blocks (44-key mirror,
leaf-law key, triple verify stated 3×). P4.5 wants specs + bounded dispatches — nothing mandates
four envelopes. ONE internally-sequenced packet (enforcement → flatten → restructure → riders)
is cheaper, atomically reviewable, and kills the F-10-after-F-08 hazard by construction.

### S2-11 · F-11 has a phantom half; F-07 is plan-only
F-11's kf side "rides F-08/F-09 dispatches" — a wave whose half is executed inside other waves has
the wrong boundary; its value half is a rider on F-06 (rename against the final cut), not a wave.
F-07 delivers "DAG; re-cut PLAN; spec doc; isomorphism map" — under C21 ("majority on direct code
implementation") the 125-file api re-cut has **no owning executor**; the wave censuses and plans,
and nobody restructures. Formation already happened; these waves bind implementation.

---

## §3 — DECISION-QUALITY ATTACKS

### S2-12 · OD-S1's recommendation contradicts the mandate it cites — and is mis-scoped as kf-only
The mandate (L1 §4): `internal/` is OWNER-DECISION "**restructure, not prune**." Recommended option
(b) is a **rename** to a "first-class primitives home" — a rename is not a restructure; it re-labels
the owner's disliked bucket (the alias/no-shim edict's spirit applies to directory aliases too).
Option (c) (split by affinity: scheduler/raf → engine-adjacent, errors/reduced-motion →
constants-adjacent) is the only true restructure on the docket. And the decision is PAIRED, not
kf-only: value's `foundation/` (126 LOC of leaf utilities) is the same abstract facility — under the
letter's cross-repo isomorphism mandate, naming kf's successor without co-deciding value's twin
manufactures the very divergence the tranche exists to kill.

### S2-13 · The largest cross-repo structural divergence — the EXPORT GRAMMAR — has no wave and no OD row
kf publishes `.` + `./engine`; value publishes 7 subpaths and **no root key at all** (verified; the
demo even hand-copied `debounce` into `shared/utils.ts` because the bare specifier drags a 36KiB
chunk — the file's own header documents the pain). "Coherence and isomorphism BETWEEN value.js and
keyframes.js in an abstract facility" (L1 §4) surely covers the public door shape before it covers
selftest vector sharing — and the ONE co-land boundary is the only cheap moment to harmonize it.
The program freezes value's 7-key/no-root shape by assumption. Missing row: OD "export-surface
grammar at the boundary (root + domain subpaths? subpaths-only? kf-style root+engine?)".

### S2-14 · C6's structural half is punted wholesale
"Routing properly defined, alongside state management" (C6) is architecture, not polish. Both demos
route through render-null `Stub` components with no `<router-view>` (value `router/index.ts:19`;
kf `router.ts:15-32`) — routes as a navigation model driving a pane/scene machine. Whether that
idiom is the DEFINED architecture or an accident to regularize is a structure-program question;
the program notes "spines exist" and hands everything to the frontend program. At minimum the
structure program owes the ruling (ratify the stub-route idiom as the pair's shared pattern, or
condemn it) — the frontend program then builds URL-state on whatever is ratified.

### S2-15 · Minor (named, not load-bearing)
- F-02/F-10 "shared selftest vectors," "no new package": shared vectors with no home = copy-paste
  drift (the thing R2 bans) or an undefined transport. Name the home (one repo owns the spec file;
  the dispatch carries it) or drop the "shared" pretense.
- F-12's DELTA screenshots argue against the wave's own π claim ("it IS glass-ui on both sides");
  if the claim is by-construction, don't make it and don't buy 6 screenshot pairs (C21 probe
  parsimony). Build/typecheck/grep is the honest gate.
- F-02/F-03 split: a gate and its cure in one motion is one wave; born-RED is a state within the
  wave, not a wave boundary. Same for the F-04→F-05→F-06 three-way serialization of <1k LOC of
  moves in a 26-file tree.

---

## §4 — THE COUNTER-PROGRAM (wave list, title + intent grain)

~9 waves, 4 parallel tracks, thrice on 5 contested artifacts only. Every letter/packet row the
14-wave program landed still lands (mapping unchanged where not named).

**Track α — unblock the decree (day one)**
- **CS-01 · CONTRACTS FIRST — the css/ + color/ landing skeletons + the export-grammar decision
  sheet.** Author the two skeleton CONTRACTS (co-signed by parser + color programs) with zero code
  churn; open OD rows: OD-S1′ (PAIRED internal/-successor ↔ foundation/ naming; recommend the true
  split-restructure), OD-S7 (export-surface grammar at co-land, S2-13), OD-S3/S4/S6 as-is.
  Unblocks R-PARSER and R-DELTAE immediately. Thrice #1.

**Track β — value.js, gates and moves (parallel)**
- **CS-02 · VALUE STRUCTURE GATE + TEST RE-MIRROR, one motion.** Port R1–R6 + new R-ISO born-RED on
  the LIVE defects (ghost `test/parsing/`, 11 demo-coupled tests, missing mirrors, 3 import idioms,
  899/609/564 R4 rows) and cure in-wave to GREEN; stylesheet.ts R4 = named tracked-RED transfer to
  the parser program (OD-S5 kept). Absorbs F-02+F-03.
- **CS-03 · MANIFEST TRUTH + THE BOUNDARY LEDGER.** deps STRIP/RELOCATE + pre-publish manifest gate
  (the one genuine born-RED); OPEN the boundary-delta manifest and route ALL surface-affecting cuts
  onto it as rows: subpaths dissolution + `./quantize` key drop + quantize demote + decompose prune
  (post OD-S2) + `collectDeclarations` trim — one atomic surface event at co-land, tombstoned, with
  packed-parity checked on both sides. Kills S2-1 by construction.
- **CS-04 · HYGIENE NOW (zero-dependency trivia).** 39 root PNGs, 2× `.DS_Store`, stale
  `components.json`, ghost dirs — pure Opus, no OD, no external gate, no cluster. Decoupled from
  the contentious prunes it was chained to in F-05.
- **CS-05 · VALUE LIBRARY RE-CUT, ONCE.** After (or jointly with) the color-program landings and
  against CS-01's contract: anchors.ts split, grammar→anchors leak reroute, result.ts fold,
  path.ts seam (OD-S6), decompose physical deletion per the CS-03 ledger row. Thrice #2.
- **CS-06 · VALUE DEMO SINGLE-TRACK GLASS-UI + C5 IDIOM CLOSE.** Dissolve `demo/ui/` (48 sites);
  4 reka type leaks via glass-ui export (BH relay if absent); **retire local `cn()` onto glass-ui's
  `cn` (index.ts:281) + drop clsx/tailwind-merge devDeps**; adjudicate `demo/shared/` (utils + 2
  components) under the colocation edict; gates = typecheck/build + corrected greps (`reka-ui`=0;
  barrel-specifier=0 with `shared/ui` resolved, not falsely matched). No screenshot DELTA — no
  visual claim made. Thrice #3 (small, on the shared/ ruling).

**Track γ — keyframes.js (parallel, behind the gates-program preconditions)**
- **CS-07 · THE KF PACKET — one spec-dispatch, internally sequenced.** Preconditions stated once:
  W9 land (`v/w9-staging@b920b190`), MR2/MR4, CI-wire lint+proof:structure. Internal order:
  (1) test-mirror rule + support allowlist + boundary-cohesion clamp fold, all path-parametric
  (enforcement BEFORE churn); (2) the flatten with 13 anchors re-derived at execution HEAD;
  (3) internal/-successor restructure per OD-S1′ + play-lifecycle recombine + name-strip sweep;
  triple verify once at the end. Demo rider: transport/ re-cut + title hook + named frontend
  handoffs (viewport-fit, non-cube multi-touch). Absorbs F-08/09/10/11(kf)/13. Thrice #4.

**Track δ — api + close**
- **CS-08 · API RE-CUT, EXECUTED.** Boundary rule (no library-src imports) + DAG + the actual
  goldilocks re-cut of the 125 files; C7 facility census emitted as spec rows to the api-facility
  program; fourier CRUD-viz isomorphism map. F-07 with an executor. Thrice #5.
- **CS-09 · CLOSE (slim).** Boundary-delta manifest final; zero-drop audit vs the landing table;
  convergence records; relay letters logged. F-14 minus the machinery it no longer needs.

Cost delta: 14 serialized waves / 13 standing clusters → 9 waves / 4 parallel tracks / 5 thrice
engagements; the decree-priority programs unblocked at day one instead of wave six; zero
pre-boundary surface cuts; every gate RED only where a defect lives.

— skeptic 2, armB thrice loop. Model serving this seat: claude-fable-5.

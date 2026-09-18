# THRICE — PC-STRUCTURE — SKEPTIC 1 (assume-WRONG seat)
### Target: `armB/program-PC-structure.md` · 2026-07-19 · all evidence re-derived from the sweeps, the canon (L1/L2/C#), the sibling armB programs, and the live trees

**Verdict up front:** the program is NOT structurally sound as written. It contains two
kill-class internal contradictions (a wave DAG that is unschedulable under its own
frozen-surface law; a gate spec that blocks the tranche's headline owner decree), a
decomposition layer that double-books four artifacts with sibling programs and stakes its
kf critical path on a program that does not exist on disk, one wave whose organizing rule
is contradicted by its own declared reference model, and a gate inventory where at least
seven gates either cannot fail or cannot pass. The truth sweeps underneath are excellent —
the program repeatedly fails to obey them.

---

## §1 — KILL-CLASS FINDINGS

### K1. F-04 ⊥ F-05: the surface-freeze law makes the wave DAG unschedulable as written

- Charter §1.4: "Surfaces stay FROZEN until the ONE co-land boundary … all restructures
  are internal." F-04's acceptance gate: "packed-surface re-verify: `npm pack` +
  api-extractor surface diff = **keys and types unchanged (7 keys, same symbol set)**."
- F-05 (deps: F-01 + OD-S2 only — orderable before, after, or around F-04) PRUNES
  `transform/decompose.ts`. But decompose is NOT internal: the frozen `./transform` key
  re-exports **six runtime symbols + four types** from it — verified on tree,
  `src/subpaths/transform.ts:7-20` (`decomposeMatrix2D, decomposeMatrix3D,
  recomposeMatrix2D, recomposeMatrix3D, slerp, interpolateDecomposed` +
  `DecomposedMatrix2D, DecomposedMatrix3D, Vec4, Mat4`). The moment F-05 lands, F-04's
  "same symbol set" gate is RED and charter §1.4 is violated. The program cannot have all
  three of: F-05 pre-boundary, the F-04 gate, and the frozen-surface law.
- Same defect on quantize: F-05 DEMOTES `quantize.ts` to the demo while the `./quantize`
  key stays frozen until co-land (F-04: "`./quantize` key drop … rides the co-land
  boundary"). Between F-05 and the boundary, the published surface carries a key whose
  source has left `src/` — the options are a broken key, a dual-path copy (forbidden:
  L1 §7 "no dual paths"), or F-05 not executing until the boundary. The program specifies
  none of them.
- Compounding it: the **boundary-delta manifest omits the decompose deltas entirely**.
  F-04 lists the manifest as "`./quantize` key drop + `collectDeclarations` trim"; F-14
  repeats "`./quantize` key drop, `collectDeclarations` trim, any renamed public symbol."
  Ten symbols dying off `./transform` appear in NO manifest row. An undeclared surface
  removal is *exactly* the v4 failure mechanism (P2.1: "no advocate ⇒ no tombstone") this
  tranche's §7.1 law was written to kill — reproduced inside the program that cites the law.

**Fix shape:** all surface-affecting removals (decompose symbols, quantize demote + key
drop, `collectDeclarations`) consolidate into ONE boundary rider — authored (manifest +
tombstones + four-tree re-grep) pre-boundary, EXECUTED at the co-land crossing. F-05
keeps only the genuinely internal rows (PNGs, .DS_Store).

### K2. F-04's manifest gate as specified blocks the parse-that decree

- F-04: "pre-publish manifest gate (**no runtime deps**, no self-dep)."
- The owner decree (L1 §2 / P1.6, tightened by C1): value.js **re-adopts
  `@mkbabb/parse-that` from the registry** "per value's historical pin convention" — a
  runtime dependency at every release v1.0.0→v3.1.0 (P1.6 service record). The sibling
  program knows this: `program-PA-parse.md:41` lands "`package.json` dep row `^1.0.0`"
  plus "**the manifest-gate WHITELIST rule** — parse-that is a REAL runtime dep and the
  deps-STRIP gate must whitelist it, never strip it … load-bearing."
- PC-structure's gate, landed as written, goes RED on the tranche's own headline
  restoration — or forces parse-that out of dependencies, contradicting the decree. The
  correct spec is an allowlist (`runtime deps ⊆ {@mkbabb/parse-that}`), and PC never says
  it because it never reconciled with PA.

### K3. The decomposition double-books four artifacts and hands the kf critical path to a phantom

The armB corpus is exactly six programs: PA-parse, PB-color, PC-structure, PD-frontend,
PE-api, PF-governance (ls-verified). Against that set:

1. **api/ is double-owned.** F-07 delivers "api/ machine DAG; goldilocks re-cut plan for
   the 125 files; enforced no-library-src-import boundary rule; the full facility census
   C7 demands; the isomorphism map to fourier's CRUD viz API" — while `program-PE-api.md`
   is an **eleven-wave program** whose charter claims the same ground: "Both backends
   receive the §4 structure treatment … layer-law enforcement, test displacement, shim
   dissolution, goldilocks granularity," with F-PE-api-01 authoring the C7 facility spec
   and its own EXTRACT/STAY owner row (**OD-api-1 — the same decision PC books as
   OD-S3**, twice-docketed). PC's §7 handoff register does not even LIST an api program —
   it hands off to frontend/parser/color/zones/gates/release and no one else. Two
   censuses, two boundary rules, two OD rows: conflict is guaranteed, Fable spend doubled
   (C17: "Fable cost is outrageous").
2. **The css/ internal cut is double-owned and the "contract" has no counterparty.**
   F-06's deliverable: "css/ skeleton contract doc … **co-signed by the parser
   program**." PA-parse contains zero occurrences of co-sign/contract/skeleton
   (grep-verified) and instead claims the cut itself: `program-PA-parse.md:41` — "the
   restored combinator core in `src/css/` (**internally re-cut to goldilocks
   granularity** — the 899-LOC stylesheet god-module does not survive as one file)." PC's
   contract deliverable is a document awaiting a signature nobody booked.
3. **deps strip + manifest gate is double-owned.** F-04 vs `program-PF-governance-02`
   ("value.js publish-integrity gates: **capability-diff + manifest gate + deps strip**")
   — the same package.json edit and the same gate authored in two programs, with PA
   adding a whitelist rule to it from a third. No named single owner.
4. **The kf gates dependency terminates in a program that does not exist.** F-08's HARD
   external dependency: "**gates program** lands P3.3 rows 1/2/7 FIRST (W9 quartet,
   MR2/MR4, `lint`+`proof:structure` CI-wired)." No file named gates/apparatus exists in
   armB; PF's own charter names its siblings "(parser, color, structure, frontend,
   **apparatus**)" and routes e2e to "[SIBLING:apparatus]"
   (`program-PF-governance.md:364`) — the sixth arm was never written. Consequently
   F-08 → F-09 → F-10 → F-11(kf) → F-13 all serialize behind a phantom, and F-14's
   "zero unlanded §6 rows" close is unauditable: rows "land" as handoffs to recipients
   that cannot be existence-checked. In a zero-silent-drop regime, a handoff to an
   unresolvable name IS the silent drop, renamed.
5. Minor but same family: F-13's "per-scene `document.title` structural hook" is also
   delivered by PD-frontend (`program-PD-frontend.md:262`) — the same hook, two programs.

---

## §2 — EVIDENCE-GROUNDING FAILURES

### E1. F-11 (module-name stripping) is contradicted by its own reference model

- The program's law (§1.7, F-11): glass-ui is "the reference model for
  flattening/component idioms"; the stripping rule is C11's `easing/easing-option.ts →
  easing/option.ts`.
- The reference model itself stutters, deliberately: `glass-ui/src/components/button/Button.vue`,
  `watercolor-dot/WatercolorDot.vue` (ls-verified). Dir-prefixed PascalCase SFC names are
  the Vue idiom (multi-word component names; file = component). Applying "ported R1 + the
  demo-tree conventions" to `.vue` trees either breaks the idiom the program says to copy
  (`WatercolorDot.vue → Dot.vue`?) or the wave exempts `.vue` — and then its census is
  near-empty: value src has **zero** stutter-named TS files (sweep-value-lib §1 full file
  census: result, math, model, anchors, operations, grammar, stylesheet, … — none repeat
  their dir), and subpaths/ dies in F-04 anyway. F-11 is a whole wave (plus thrice review
  of the map) for a rule whose scope the program never defines and whose hit set on the
  unguarded trees is plausibly empty. It is a rider, not a wave.

### E2. Structure-before-content for color/ contradicts the program's own kf sequencing law

- kf side, §2.2: "flatten waits for the prune/owner-decision verdicts — **never flatten
  code that is about to die**." Correct.
- value side, F-06 splits `color/anchors.ts` (377) into tables-vs-23-fns NOW, while
  PB-color is about to land the restore ladder into the same dir: boundary.ts 604 +
  gamut.ts 526 + raytrace.ts 137 + okhsl.ts 270 + ΔE + Into + ramp (P2.1/P2.2) — roughly
  **tripling** color/'s 891 LOC. The goldilocks cut is being made on a third of the final
  mass; the post-restore tree re-litigates it (double churn — the exact waste the kf law
  prevents). The css/ half of F-06 gets this right ("no pre-churn of the dying regex
  parser"); the color/ half violates the same principle in the same wave. One law,
  applied one-sidedly.

### E3. F-02's born-RED showcase is discharge-theater

The R4 born-RED trio: `stylesheet.ts` (899) — transferred to the parser program by name
(OD-S5); `decompose.ts` (609) — dies by F-05 deletion; `path.ts` (564) — OD-S6's default
branch is a "REASONED allowlist row." Potentially **zero of the three REDs are cured by
structural work in this program** — one deleted, one exported, one allowlisted. The gate
satisfies the born-RED letter (L1 §0's "vacuous-green" close-class check) while its green
path is deletion/handoff/allowlist. The honest RED set for THIS program is the R-ISO
family (ghost `test/parsing/`, missing mirrors, 3 import idioms, 11 displaced tests) —
which is real and sufficient; the R4 trio is decoration borrowed from other programs'
work.

---

## §3 — THE GATE INVENTORY: cannot-fail and cannot-pass

| Gate | Defect |
|---|---|
| F-01 "value src reproduces 26/0-cycles **or the delta is explained**" | escape hatch — cannot fail |
| F-07 "DAG cycle-free **or cycles adjudicated**" | escape hatch — cannot fail |
| F-13 "proof:structure untouched-green" | vacuous by scope: proof:structure's birth scope is `src/` only (sweep-kf-lib §6); no demo change can EVER move it — green regardless of the work |
| F-12 "grep `from "../ui/|/ui/"` under demo = 0" | **cannot pass**: `demo/shared/ui/{EmptyState,PaneHeader}.vue` is a legitimate dir imported by 10 files (tree-verified — GradientPane, MixPane, BrowsePane, AdminPane, …); the pattern collides with it forever, or forces an unstated rename |
| F-12 DELTA "RED = any **non-noise** pixel delta" | "non-noise" unoperationalized on a GPU-animated glass surface (aurora, watercolor wobble on `useRAFLoop` — sweep-value-demo §5); either perma-RED or adjudicated by vibes. Needs a freeze protocol (reduced-motion + seeded PRNG) or a DOM-structural diff, stated |
| F-13 DELTA: ONE static screenshot pair for a ~30-file `transport/` re-cut | wrong oracle class: transport is playback/RAF logic; a screenshot cannot fail on a timing regression. kf's own `test:demo` roster (MR4) is the witness and the program never names it |
| F-03 "vitest count diff = 0" while moving 11 test files out of the library tree | underspecified to the point of self-contradiction: if `demo/test/` is a separate vitest project, the library count MUST drop by those files; "diff = 0" is only meaningful summed across both projects, which the gate does not say |
| F-05's central gate = the capability-diff gate, owned by "gates program" | dependency on the §1-K3.4 phantom; as of this corpus the gate's owner is PF-02 (value-side) — never named |

Seven of the program's ~20 gates are defective. For a document whose charter §1.3 is
"this doc says what RED looks like," that is a failing score.

---

## §4 — DROPPED OR FUDGED CANON ROWS

1. **C11 "long-running directories pruned or agglomerated"** — value demo's heaviest tree
   is `palettes/` (84 files / 9,015 LOC, sweep-value-demo §1). F-12's colocation item is
   "audit-confirm, don't churn"; no goldilocks adjudication row for palettes/ exists
   anywhere. The V-DEMO-B cluster (§3) feeds a wave that only dissolves barrels, deletes
   a config, and reroutes 4 types. The structural long-dir audit of the demo — squarely
   this program's charter (§1.1 "both demo component trees") — lands nowhere.
2. **C6 "routing properly defined"** — value's router is a genuine structural oddity: 15
   routes on `Stub = {render: () => null}` components with NO `<router-view>`
   (sweep-value-demo §4) — routes as a navigation model only. "Properly defined" routing
   is a structure question; PC reduces C6 to "structural facet noted" + handoff. No
   adjudication row (ratify-the-Stub-idiom vs real route components) exists in any
   program's docket. That is a fudge, not a landing.
3. **F-07's api "re-cut" is a plan, not a re-cut** — deliverable: "goldilocks re-cut
   PLAN for the 125 files." No wave executes it (and per §1-K3.1 the executor should be
   PE-api — which makes F-07 doubly wrong: it plans what it doesn't own).
4. **C7 "BOTH repos"** — kf has no `api/` dir (ls-verified; PE-api's sweep proved it
   "census-proven"). Zero-drop discipline requires the explicit N/A row; PC's landing
   table row for C7 doesn't carry it.
5. **F-04's retarget spec is unexecutable for 4 of 7 keys** — "each retargeted to
   explicit `dist/<dir>/index`": `./value`, `./easing`, `./math`, `./quantize` map to
   root/leaf files (`value.ts` 36 LOC, `easing.ts`, `foundation/math.ts`, `quantize.ts`)
   — no such dirs exist, and creating a dir per 36-LOC file is the sand the same
   program's §1.7 bans. The dissolution must point root-module keys at module files; the
   spec as written cannot be followed.

---

## §5 — PROCESS, BUDGET, ALTITUDE (C21/C17 violations)

- **F-01 re-derives what is already on disk**: `armB/madge-src.json` (26 files/0 cycles)
  and `armB/depcruise-animation.json` (476KB kf graph) were captured 2026-07-19 — before
  the program was written. A full opening wave to re-run tools whose output exists, plus
  "open the thrice registry," is formation work billed to the implementation phase. C21:
  "Little time on contrived gates or process."
- **The thrice plan has no budget arithmetic**: 13 clusters × 3 Fable seats × ≥2
  consecutive clean passes = **≥78 Fable seats minimum** (≤3 iterations → ~117 ceiling)
  for ONE of six programs, against L1 §0's 32-agent budget and C17's "Fable cost is
  outrageous — every Fable seat is file-scoped and tight." No ledger, no agglomeration
  plan beyond delegating re-cuts to "the wave-01 adjudicator."
- **Wave-shape census**: of 14 waves, ~6 move code (F-03/04/05/06/11/12); 4 are
  dispatch letters (F-08/09/10/13); 2 are pure process (F-01/F-14); F-02/F-07 author
  gates/plans. The owner's stated majority — direct implementation — is a minority of
  the program.
- **Three kf dispatch letters where one suffices**: F-08, F-09, F-10 (plus F-13) each
  produce a separate inbox dispatch for what the kf successor will execute as one
  coordinated restructure. P4.5 wants specs + bounded dispatches, not one letter per
  sub-decision — a single coherent KF STRUCTURE PACKET with the sequencing preconditions
  embedded (W9/MR2/MR4/CI-wiring as in-letter gates) is the KISS shape.

---

## §6 — THE COUNTER-PROGRAM (PC′, 8 waves, title+intent grain)

Laws the counter-shape enforces: ONE owner per artifact; structure-follows-surviving-
content applied uniformly (kf zones AND value color/ AND css/); surface deltas execute
only at the co-land crossing; every handoff names an existing file/wave id; gates
failable-and-passable by construction; thrice batches agglomerated with a seat budget.

- **PC′-01 | value | THE STRUCTURE GATE, BORN-RED** — port kf R1–R6 + author R-ISO as one
  shared rule grammar (spec + shared selftest vectors; per-repo runners). Honest RED set:
  ghost `test/parsing/`, missing `test/{color,css,foundation}` mirrors, 3 import idioms,
  11 demo-referencing tests, R4 on `path.ts` only (stylesheet's RED is PA's by name at
  birth; decompose's is the boundary rider's). Manifest-gate spec co-authored HERE with
  PA/PF as an allowlist (`runtime deps ⊆ {@mkbabb/parse-that}`) — single text, PF owns
  the CI seat.
- **PC′-02 | value | RE-MIRROR + IDIOM UNIFY** — flip R-ISO green; displacement with a
  cross-project test-count parity gate (summed across library + demo vitest projects,
  stated); packed-surface suite kept as the named probe.
- **PC′-03 | value | INTERNAL RE-CUT (uncoupled zones only)** — foundation fold,
  `grammar→anchors` leak heal, `path.ts` seam-or-allowlist (OD), real
  `transform/index.ts`, subpaths/ dissolved with keys frozen (root-module keys point at
  module files — no fabricated dirs). **No color/ split** (booked as a rider ON
  PB-color's landing waves, cut against the post-restore mass); **no css/ contract**
  (PA owns the restored tree's internal cut; PC′-01's ported R1–R6 IS the binding
  contract — a gate, not a co-signed doc). TS-only rename stripping rides here as a
  rider (census: ~0 hits expected; `.vue` explicitly exempt — glass-ui's
  `button/Button.vue` idiom is the reference, cited).
- **PC′-04 | value | THE BOUNDARY RIDER (authorship now, execution at co-land)** — the
  COMPLETE surface-delta manifest: decompose's 10 `./transform` symbols, quantize demote
  + `./quantize` key drop, `collectDeclarations` trim — each with a RIGHTLY tombstone and
  a four-tree re-grep at execution HEAD; hands to PF-07 (the one crossing); PF-02's
  capability-diff gate is the witness. PNGs + `.DS_Store` purge (genuinely internal)
  execute immediately as a hygiene rider here.
- **PC′-05 | value demo | SINGLE-TRACK GLASS-UI + THE LONG-DIR ADJUDICATION** — barrel
  dissolution (48 sites), `components.json` delete, 4 reka type reroutes (BH relay), PLUS
  the dropped C11 row: a goldilocks adjudication of `palettes/` (84 files/9k LOC) and a
  C6 ROUTER-ARCHITECTURE decision row (ratify Stub-navigation-model vs route components)
  into the owner docket. Gates: scoped grep (`from "(../)+ui/"` on the demo/ui specifier
  set only; `shared/ui` named-exempt), typecheck/build, DELTA with a stated freeze
  protocol (reduced-motion + seeded PRNG) — failable and passable.
- **PC′-06 | kf | THE KF STRUCTURE PACKET (one dispatch)** — flatten (13 anchors
  re-derived, the 3 vite drifts already caught) + internal/ restructure per OD-S1 +
  R-ISO(kf) + support allowlist + clamp fold + play-lifecycle recombine, as ONE letter
  with the sequencing preconditions (land W9 `b920b190`, MR2/MR4, wire
  `lint`+`proof:structure`) embedded as in-letter gates for the implementer. PC′'s DONE =
  dispatch rowed in kf's inbox ledger (auditable), never "landed."
- **PC′-07 | kf demo | TRANSPORT RE-CUT SPEC (rider on the PC′-06 letter)** — gated on
  kf `test:demo` (MR4), not a screenshot; `document.title` CEDED to PD-frontend by name
  (dedup); C4 mobile rows handed to PD with the sweep's anchors.
- **PC′-08 | close, INSIDE PF-08** — per-batch convergence records + the zero-drop audit
  **with a recipient-existence check**: every handoff row must cite a real file/wave id
  in the arm corpus (the check that catches the missing apparatus program). PC′ carries
  one arm-level escalation row: the apparatus/gates program MUST be formed or its P3.3/
  P3.4 rows explicitly adopted by PF — no PC′ wave depends on it silently.

Thrice batching: **4 batches** (value-lib+tests = 01/02/03 · boundary = 04 with PF ·
demos = 05/07 · kf packet = 06), 3 seats × 2 passes = **24 seats ceiling** — inside the
32-agent frame, ledger stated.

---

## §7 — WHAT SURVIVES (for the adjudicator's balance)

The four truth sweeps are excellent and largely honored elsewhere: the pin discipline and
anchor re-derivation (3 vite drifts caught — N-ADJ-3 vindicated on live evidence), the
internal/ fan-in correction 10→11, the C7 STAY reconciliation direction (right call,
wrong owner), F-10's honest born-GREEN framing, the F-12 evidence base (19 barrels / 48
sites / 79 direct — all tree-true), and the landing-table habit itself. The program's
failures are decomposition and gate-spec failures, not evidence fabrication: nothing in
it contradicts the tree — it contradicts its siblings and itself.

— Skeptic 1, thrice loop, PC-structure. Every claim above is file:line-cited or
ls/grep-verified this session; sibling-program cites: program-PA-parse.md:41,
program-PE-api.md:1-40, program-PF-governance.md:70,364, program-PD-frontend.md:262.

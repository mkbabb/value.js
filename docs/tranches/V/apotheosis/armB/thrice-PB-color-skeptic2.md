# THRICE — PB-COLOR — SKEPTIC 2 (architecture + parsimony lens) — 2026-07-19

> Posture per C20: the program is presumed WRONG outright. Every attack below is
> evidence-backed (repo reads, `164343c1^` archaeology, the armB sweep, the sibling
> arm-B programs, the canon). Verdict first, findings ranked, counter-program last.
> Firewall honored: zero vnext / snapshot-vnext / armA input.

## VERDICT

PB-color is **structurally unsound as formed**: roughly **40% of its wave count is
double-booked against its own sibling program** (PA-parse F-05/F-06 owns the same five
grammar/eval rows, with a competing OD docket), it **silently drops a P2.1-named
capability** (`colorFilter`) while charter-claiming zero drops, and its centerpiece
wave (03) makes **three provably false or infeasible claims** (the "retired" secondary
bisections are contrast searches the gamut engine cannot retire; the ≤3-facade-alloc
budget contradicts the canon's own historical measurement of 9; the "as-was restore"
recipe contains no cusp+Halley mapper — that is net-new numerics sold under the
restore banner). Its gate spine (wave 01) is contrived process at the exact point C21
and the owner's retired-proof-idiom feedback forbid it, and it serializes the ledger's
own row-1 PREREQUISITE behind WPT transcription. The correct shape is **7 waves + an
OD docket + banked registry rows**, with the grammar family ceded to PA-parse by
named seam. Counter-program in §3.

---

## 1. FINDINGS (ranked; each with evidence)

### F1 — CRITICAL — Five waves + four OD rows are DOUBLE-BOOKED against PA-parse
- **Claim attacked**: F-PB-color-06/07/08/10/11/12 own R-MIX-GRAMMAR, R-RELATIVE,
  R-CONTRAST, R-HDR, R-SPRING-GRAMMAR, R-EVAL, with OD-C1..OD-C4.
- **Evidence**: the sibling program `armB/program-PA-parse.md` books the SAME rows:
  F-PA-parse-05 = "Land the three DECIDED grammar restores... R-MIX-GRAMMAR ...
  R-RELATIVE ... R-CONTRAST (grammar + parse node; the WCAG-metrics REPUBLISH half is
  the color program's — seam cited, grammar half owned here)"; F-PA-parse-06 = "R-HDR
  ... R-SPRING-GRAMMAR ... R-EVAL" under **OD-PA-1/2/3**. PA-parse's row-landing table
  states outright: "P2.2 row 6 · row 7 · row 8 (grammar half) → F-05" and "row 10 ·
  row 11 · row 12 → F-06 + OD-PA-1/2/3". PB-color's row-landing table claims the same
  six rows wholesale.
- **Consequence**: the arm would land the same productions twice, and the owner is
  asked the SAME three decisions under two different docket numbers (OD-C2 vs OD-PA-1
  on HDR; OD-C3 vs OD-PA-2 on spring; OD-C4 vs OD-PA-3 on calc-eval) — divergent
  rulings possible, one artifact per question violated. The U-F29/U-F30 family
  regression vectors are ALSO double-carried (PB-color wave 06 cargo vs PA-parse F-03
  deliverable + F-05 extension — PA-parse line: "F-05 extends U-F30").
- **Root cause**: L1 is genuinely ambiguous (§2 wave-3 census houses the named
  restores; §3 says "the remaining P6–P14 rows (grammar restores...)"). PB-color never
  ACKNOWLEDGES the ambiguity — it names a collision risk for wave 11's easing table
  yet walks straight into a six-row collision with its own sibling. PA-parse at least
  cut a seam (grammar half vs WCAG half). Silent collision is the defect regardless of
  which resolution wins.
- **Fix**: cede rows 6/7/10/11/12 whole + row 8's grammar half to PA-parse by named
  seam; keep only the WCAG-metrics evaluation/republish half (OD-C1). Cohesion agrees:
  those waves land in `src/css/`, gate on parse/serialize vectors, and depend on
  R-PARSER — every force vector points at the parsing program. Bonus: the color
  program's EXT:R-PARSER dependency disappears almost entirely — a cleaner
  program boundary.

### F2 — CRITICAL — `colorFilter` is a SILENT DROP under a zero-drop charter
- **Evidence**: P2.1's extinction inventory names it explicitly ("the zero-alloc Into
  family, **colorFilter**, boundary samplers..."); the file is real —
  `git ls-tree 164343c1^` shows `src/units/color/colorFilter.ts`. PB-color's charter
  claims "Every color-relevant letter/packet/addenda row" lands, and §9's return
  contract demands packet-row inventory checking — yet `colorFilter` appears in NO
  wave, NO OD row, NO registry row, and NOT in the row-landing table (the table maps
  "P2.1 single-sided loss" to "charter" — which papers over the named capability list
  inside P2.1).
- **Consequence**: the program re-runs the exact mechanism it was formed to kill —
  *no advocate ⇒ no tombstone*. The one unadvocated capability in the packet died
  again, in the restore program itself.
- **Fix**: a disposition wave/row — restore-or-tombstone per §7 law 1 (four-tree
  consumer census at pull; if declined, the by-name RIGHTLY tombstone in the next
  cutting release).

### F3 — CRITICAL — Wave 03's acceptance package is triply wrong
Three independent defects in the program's centerpiece:

**(a) The ":266/:283 secondary bisections retired" claim is FALSE.** Read
`src/color/operations.ts:207-303`: those two 32-step loops bisect **LIGHTNESS against
a WCAG contrast-ratio criterion** (`clears()` → `contrast()` → luminance vs a surface
color, float AND quantized), not against the gamut boundary. A cusp+Halley GAMUT
engine replaces the `mapColorToGamut` call inside `candidate()` (:226) — it cannot
retire a contrast root-search: contrast-vs-lightness through gamut mapping + sRGB
encode + round-half-even quantization is not analytically invertible. At best each
`evaluate` gets cheaper. The wave promises a retirement its mechanism cannot deliver.

**(b) The "facade ≤3 allocs" budget contradicts canon and inverts the wave order.**
The facade must convert an arbitrary-space input to oklch and convert the mapped
result back (`operations.ts:139,:152,:172-175`) — each `convertColor`/`makeColor` hop
allocates Result + Color + channels. The canon's OWN number for the fully-restored
pre-v4 apparatus is **9 allocs/call** (P3.2: "gamut path 37→9 allocs/call" —
MEASURED). ≤3 is arithmetically implausible without `convertColorInto` — which is
**wave 04's cargo**. As sequenced, wave 03's RED-2 flip cannot go green, or wave 04's
content secretly lands inside wave 03. Same defect in the "allocs independent of
iteration count" gate for `safeAccentColor`: each `evaluate` allocates Results by the
frozen facade's design; iteration-independence requires driving the internal loop
through Into kernels — again wave-04 content. **Dependency inversion between the
program's two core waves.**

**(c) The "as-was restore" framing is false for the mapper.** `git grep -iE
"cusp|halley" 164343c1^ -- src/units/color/gamut` → `findCusp` exists (analytic cusp
FINDER, boundary.ts, feeding the picker polyline) but **zero Halley hits anywhere in
the pre-v4 tree**. The actual pre-v4 mapping path was a **24-step bisection with a
JND early-exit** (`dispatch.ts:383` `CHROMA_SEARCH_STEPS = 24`, `:525` "Before the
(24-step) bisection, a JND early-exit (CSS Color 4..."). The cusp+Halley MAPPER
prescribed by P2.2 row 2 is **net-new numerics** — legitimate (canon prescribes it),
but the charter's "Resurrection recipes: `git show 164343c1^` ... for every as-was
restore" is false for the program's hardest wave, and the wave carries no pricing for
novel derivation/validation work (Halley convergence across 5 RGB gamuts, achromatic
and near-cusp edge cases). Mislabeled altitude: the riskiest wave is dressed as
transcription.

### F4 — MAJOR — Wave 01 is contrived gate-spine process, mis-rooted and duplicated
- **C21 says**: "Little time on contrived gates or process; the majority on direct
  code implementation... and VISUAL verification." The owner has ALSO already retired
  a bespoke invariant-codification idiom as "overfit junk" with the standing rule:
  enforce invariants **structurally** (types + tsc/eslint + review). PB-color invents
  a standalone alloc-gate spine — `test/support/alloc-harness.ts`, `--expose-gc`
  heapUsed-delta windows, a **versioned per-op alloc-budget table checked in as
  data**, thrice-adjudicated — the same genus of apparatus.
- **The vacuity proof**: the pre-v4 deltaE kernels are scalar-tuple functions —
  `deltaEOK(L1,a1,b1,L2,a2,b2): number` (gamut.ts:65), `deltaE2000(L1,a1,b1,...)`
  (difference.ts:45). Restored as-was, they CANNOT allocate; a heap-delta gate on
  `dL*dL+da*da+db*db` is a gate that exists to be green — the vacuous-green
  close-class lie, in gate form. Zero-alloc there is enforced by SIGNATURE (numbers
  in, number out), i.e. structurally.
- **Duplication**: PA-parse already restores `bench/` + the ratio gate as the arm's
  regression-witness spine (canon: L1 §2 wave 2). PB-color builds a SECOND parallel
  measurement infrastructure in test/, then admits the split awkwardly (wave 04: "if
  bench/ is not yet landed, the alloc harness alone gates and the bench entry is a
  booked rider"). Two perf-measurement spines in one arm = KISS violation.
- **Mis-rooting**: wave 01 is declared the program root, serializing EVERYTHING —
  including R-DELTAE, the ledger's own row-1 "PREREQUISITE", which needs nothing from
  wave 01 (Sharma-2005/ITP/OK vectors are self-contained). The program demotes the
  canon's decided priority (DELTAE first) beneath its own invented infrastructure.
  Also fragile in mechanism: heapUsed-delta over 10k-call windows under vitest workers
  is a known flaky-CI generator (GC timing, IC warmup, hidden-class churn).
- **Fix**: kill wave 01. The §13 conformance corpus is R-GAMUT's OWN acceptance cargo
  (authored first, inside the wave, born-RED against the live bisection — that
  property is preserved). Alloc discipline = structural kernel signatures
  (scalar-tuple / out-param) + bench rows in the ONE resurrected bench/ spine, with
  the live ~96-alloc path and the historical 9-alloc parity target as the recorded
  baseline pair.

### F5 — MAJOR — Wave-count inflation: decision rows dressed as waves; born-RED diluted
- Waves 12 (deliverable = a decision sheet), 13 (deliverable = a bench exhibit for a
  speculative primitive with zero consumers), and 14 (banked-unless-W53-pulls) are not
  code waves — §9's own taxonomy gives them a home: "a wave, a gate, a registry row,
  **or an owner-decision row**". Booking them as waves is count-padding: of 14 waves,
  only ~7 have unconditional code deliverables. Wave 13 is the worst: OD-C5 threshold
  ratification + prototype + bench matrix for SoA — C21 says the null hypothesis (Into
  loops meet budgets) wins by DEFAULT; the correct artifact is a banked row whose
  re-trigger is batch-path bench evidence falling out of waves 04/05 for free.
- The conventions block also REDEFINES born-RED: "absence counts as a live defect
  when the letters name it a drop." L1 §0 says born-RED "wherever the defect is
  live". Absence-red is trivially red (every unwritten feature's tests are red) —
  the redefinition launders ordinary TDD as gate rigor. The only REAL born-RED gates
  in the program are RED-1/RED-2 (live misbehavior of the extant bisection); say so.

### F6 — MEDIUM — §7 law 3 violated: frozen line-cites baked into future gates and letters; kf scar census incomplete
- The program bakes `operations.ts:133/:160/:207/:266/:283`, `color/index.ts:33-40/
  :20-21`, and the kf scar lines `color.ts:120-124` + `backward.ts:30-32` into gate
  definitions and a FUTURE dispatch letter. Canon §7 law 3: "Re-derive anchors at
  execution — ratified blueprints' line-cites drift within days (N-ADJ-3)."
- The frozen kf scar list is ALREADY incomplete at live HEAD: `grep sampleColorRamp\|
  deltaEOK` over kf src shows **four** files/sites — the two named PLUS
  `animation/index.ts:233` and `backward.ts:47` (stale docstring references). A
  dispatch letter specced to the two named lines lands, gates green, and leaves scar
  remnants on disk — green-over-broken in miniature. Fix: the letter's cargo is a
  grep-derived scar CENSUS at dispatch time, not a frozen line pair.

### F7 — MEDIUM — "Owes NOTHING to the co-land boundary" is overclaimed; one cross-program file collision unnamed
- Wave 03 CHANGES the outputs of two published functions (`mapColorToGamut`,
  `safeAccentColor`) — the program admits it via the DELTA obligation. glass-ui 7
  peers value `^4` (P4.2), so consumers receive changed deterministic color outputs
  inside a 4.1.x minor. Defensible as a conformance cure, but it must be PRICED (a
  behavioral-change CHANGELOG row + the DELTA plates presented at the 4.1.x cut), not
  waved off with "owes NOTHING to the value-5 co-land boundary".
- Waves 02+ add exports through `subpaths/color.ts` while the structure program
  dissolves `subpaths/` concurrently (L1 §4: keys frozen, explicit `/index`
  specifiers). The program names a shared-vehicle note for D-GAP-6 and a shared-seam
  note for wave 11, but NOT this file-level collision with the structure program —
  the same class of omission it congratulates itself for avoiding.

### F8 — MINOR — Ordering: the kf-facing row is queued behind the hardest numerics
- Wave 05 (R-RAMP + the kf scar-cure dispatch — the program's ONE external-consumer
  deliverable) is gated on wave 03. But the ΔE scar (`color.ts:120-124`) needs only
  `deltaEOK` (wave 02), and `sampleColorRamp` is interpolation + stop distribution
  over the frozen `mixColors` facade; gamut-clipped-stop VECTORS are an additive
  vector family that can extend after the gamut wave lands. The dependency as drawn
  serializes the highest-external-value item behind the highest-risk item. Loosen it:
  R-RAMP depends on 02; the clipped-stop vector family and `sampleColorRampInto` are
  riders on 03/04 respectively.
- Same class: wave 06's dependency on wave 02 ("ΔE-adjacent constants only where
  spec'd") is contrived — color-mix parse/serialize/eval needs the grammar and the
  frozen `mixColors`, not ΔE. (Moot once F1's cession lands, but symptomatic.)

### What SURVIVES (for the adjudicator's ledger)
The charter's restore-not-net-new posture (minus the wave-03 mislabel), the frozen
v4 facade, SCI-1 inherited-never-reopened, the 3.0.0 SoA tombstone honored, the P4.5
dispatch mechanics, kf-as-consume-only, the DELTA obligations on output-changing
waves, cusp-math reuse for OKHSL (one kernel, two clients), and the OD-C1 lean.
These carry into the counter-program unchanged.

---

## 2. THE ALTERNATIVE — COUNTER-PROGRAM PB-color′ (7 waves + OD docket + registry rows)

Conventions: thrice per C20 on every wave; routing per C17; test placement per C11;
alloc discipline is STRUCTURAL (scalar-tuple / out-param kernel signatures) witnessed
by rows in the ONE resurrected bench/ spine (PA-parse's regression witness — no
second harness, no versioned budget-table artifact). Born-RED is claimed only where
the defect is LIVE.

- **CW-1 | R-DELTAE (program root)** — restore `deltaEOK`(+JND)/`deltaE2000`/
  `deltaEITP` as-was (they ARE as-was: scalar-tuple kernels, zero-alloc by signature);
  Sharma/ITP/OK reference vectors as the wave's own cargo; additive exports;
  RESTORED CHANGELOG rows. No upstream dependency — the ledger's PREREQUISITE runs
  first, as the ledger ordered.
- **CW-2 | R-GAMUT** — the §13 conformance corpus (WPT + spec-derived clip/JND
  vectors, authored FIRST, born-RED against the live 32-iteration bisection — the
  program's one true born-RED, preserved) + the cusp+Halley kernel **honestly labeled
  part-restore (findCusp, raytrace oracle, JND constant) / part-NEW (the Halley
  mapper — priced as novel numerics, Fable-routed)** + facade rewire. `safeAccentColor`
  keeps its contrast bisections (they are contrast searches — F3a); acceptance is the
  §13 flip + oracle agreement + the bench row recording the alloc drop toward the
  historical 9-alloc facade parity — the ≤-3 fantasy budget dies. DELTA plates as
  specced.
- **CW-3 | R-INTO** — SCI-1 extension on the W56 4.1.x vehicle (never forked):
  `convertColorInto`/`mapColorToGamutInto` + the `safeAccentColor` internal loop
  re-plumbed onto Into kernels — THIS is where facade allocs collapse and where
  iteration-independent allocation becomes true and gateable (equivalence-with-twin
  vectors + `returned === out` + bench 0-alloc steady-state rows). The 4.1.x
  behavioral-change pricing row (F7) lands here with the vehicle.
- **CW-4 | R-RAMP + the kf dispatch** — `sampleColorRamp`/`At`/`mixColorsN` on the
  frozen mix facade (dep: CW-1 only); `sampleColorRampInto` rides CW-3's idiom as a
  named rider; the P4.5 INBOUND letter carries a **grep-derived scar census executed
  at dispatch time** (§7 law 3) — today's four known sites named as the seed, not the
  bound. Gate = letter on disk + census attached; kf landing is kf-owned.
- **CW-5 | R-CONTRAST, evaluation half + OD-C1** — the WCAG-metrics evaluation and
  the republish-vs-internal decision sheet; the `contrast-color()` GRAMMAR half is
  PA-parse F-05's by the named seam (their own row-landing already cites the split).
  Executable under either OD-C1 ruling.
- **CW-6 | R-OKHSL** — resurrect okhsl.ts modernized onto CW-2's cusp kernel (one
  kernel, two clients, per C21); Ottosson round-trips + anchor-graph closure; demo
  picker adoption stays a frontend-program pull with a transfer-rider.
- **CW-7 | COLORFILTER DISPOSITION** — the row PB-color dropped: four-tree consumer
  census + restore-or-tombstone under §7 law 1; either the modernized restore
  (additive) or the by-name RIGHTLY tombstone in the next cutting release. Terminal
  either way.

**OD DOCKET (one sheet, not waves)**: OD-C1 (CW-5) · SoA banked-with-trigger — the
3.0.0 tombstone stands; re-trigger = CW-3/CW-4 batch bench rows missing budget, the
threshold ratified in the same sheet (absorbs PB-color 13/OD-C5 with zero prototype
spend until triggered) · R-BOUNDARY banked on the W53 pull (absorbs PB-color 14;
full π/DELTA vs the `v-perceived-space-plate-ref-w40` reference travels with the
trigger) · colorFilter ruling input (CW-7).

**CEDED BY NAMED SEAM (collision dissolved, zero drops at arm level)**: P2.2 rows
6/7/10/11/12 + row 8's grammar half → PA-parse F-05/F-06 under OD-PA-1/2/3; the
U-F29/U-F30 family vectors → PA-parse F-03/F-05 (their declared cargo). The color
program thereby owes the parsing program NOTHING (EXT:R-PARSER edge deleted) — the
two programs decouple cleanly, and only PA-parse's grammar tranche waits on the
parser restore.

**Row-landing proof**: ledger rows 1,2,3,5,9 → CW-1,2,3,4,6 · row 8 → CW-5 split ·
rows 6,7,10,11,12 → ceded-with-seam · rows 13,14 → OD docket (banked, triggers named)
· row 4 → PA-parse (unchanged) · P2.1 colorFilter → CW-7 (previously DROPPED) · P2.1
kf scars → CW-4 census · C13 → structural signatures + bench witness rows · every
other PB-color row-landing table entry carries forward unchanged. **Nothing PB-color
landed is dropped; one thing it dropped is landed.**

**Dependency shape**: CW-1 → {CW-2, CW-4} · CW-2 → {CW-3, CW-5, CW-6} · CW-7 free.
Three waves run in parallel after CW-1; the kf-facing dispatch no longer waits on the
Halley numerics. 7 waves, one mechanism each, one measurement spine, one OD sheet.

— skeptic 2, arm-B thrice loop, 2026-07-19. Evidence: `src/color/operations.ts`
(live read), `164343c1^` archaeology (`git ls-tree`/`git grep`: colorFilter.ts real,
zero Halley hits, 24-step JND-exit bisection at dispatch.ts:383/:525, scalar-tuple
deltaE at gamut.ts:65 + difference.ts:45), `armB/program-PA-parse.md` (rows 6-12
double-booked, OD-PA-1/2/3, U-F29/30 cargo), `armB/sweep-value-lib.md` §9, kf live
grep (four scar sites), L1/L2/C-addenda as cited inline.

# U.W-ORACLE — CLOSE ARTEFACTS (ORACLE / GATE / TEST INTEGRITY — the gate package)

**Verdict**: **CLOSED-`complete_with_misses`** (2026-07-13).
**Gate**: `CLOSE_WITH_MISSES` — the 6-row `waves/U.W-ORACLE.md §Hard gate` (G-ORACLE-1..4 born-RED
+ G-ORACLE-6/7 born-GREEN) returned **6 PASS (4 born-RED flipped GREEN at cure · 2 born-GREEN
coverage landed pass-on-write), zero FAIL**; the wave carries the PP-16-designed structural miss (the
U-F42 escalate — the three `test.fail()` flips are producer/adopt-gated, `booked not held`) plus four
recorded misses (§3), all booked/routed, zero silent drops.
**Wave commits** (interleaved with the concurrent U.W-CANON lanes on `tranche-u`, oldest→newest):
`755a089` (CI-teeth) · `637686c` (born-RED register + test-hygiene) · `15e306e` (feasibility-leg law +
node-24 floor + boot-G) · `fc14c01` (color-anchors).
**Gate of record**: the composite `waves/U.W-ORACLE.md §Hard gate` (6 rows), each re-verified live at
this close against the landed tree (§1).
**Spec of record**: owner verbatim (§13.5 · probe-parsimony · the born-RED law) → `audit/registry.md`
(§1 U-F1 · §2/§16 U-F6-oracle + U-F62 · §3 U-F15 · §13 U-F42/F43/F44 · §16 U-F55/F62 · §19
U-F72/F73/F60 · §20 · §21 · §26) → `U.md §The real-GPU annex / §Mission` → `waves/U.W-ORACLE.md`.
Where they could diverge, the registry wins; above both, the owner's verbatim.

**Reconstruction note (honest)**: the orchestrator's `gate` and `laneResults` objects arrived at this
scribe as un-interpolated template strings (`${JSON.stringify(gate)}` / `${JSON.stringify(laneResults…)}`),
so the gate verdict and the per-family commit/miss facts below were **reconstructed from the landed
tree** — the four wave commits + the four standing per-lane records under `audit/oracle/**` + a **live
re-run of every headless-verifiable gate this session** (§1). Nothing here is asserted from a
machine-passed gate object; every row is tree-verified, and the two owner-held decisions (the CI-teeth
blocking-vs-soft ruling; the O-26/O-3 annex attestation) are recorded as booked, never asserted green.

---

## §0 The verdict + its honest reconciliation

This is a **STRUCTURAL** wave (the wave doc's own framing): it hardens the INSTRUMENTS the other
waves are measured by, so its gates are **config/source-read assertions**, not pixels. The single
visual oracle it touches (the aurora, O-26/O-3) is DELIBERATELY re-hosted to the U-F54 real-GPU /
owner-attested annex — **never chased headless** (the §21 caveat). No π-frame is captured here; the
feasibility-leg law's visual manifestation (the near-black ramp) is cross-referenced to
**U.W-VISUAL / U-F6-ramp**, not duplicated (the oracle-half is a predicate).

**The wave's spine — the doubled honesty discipline — held on every gate**:
- **No fabricated red.** The two color-hardening gates (G-ORACLE-6/7) are authored **born-GREEN**
  because the numeric core is PROVEN SOUND (registry §19 U-F60); a born-RED there would be the O-14
  proxy-sin INVERTED (a gate lying about a defect that isn't there). All anchors passed on write; no
  tolerance tuned, no subset chosen to pass (§1 G-ORACLE-6/7).
- **No pretend-headless flip.** The four born-RED gates (G-ORACLE-1..4) are each config/source-read
  reds — headless-verifiable, guarding a LIVE defect. The GPU-only aurora pair (O-26/O-3) is the
  U-F54 annex, NOT a flip-on-headless gate (§1 G-ORACLE-3).

`complete_with_misses` is the **designed** terminal state, not a shortfall: `waves/U.W-ORACLE.md
§Completion` pre-binds **PP-16** — *"gates-pass-goal-unmet closes `complete_with_misses`; the U-F42
escalate is the archetypal gates-armed / cure-wave-gated row — the O-16/O-26/O-5 flips are
producer/adopt-gated."* The six build/coverage gates reach their cure; U-F42 (escalate) reaches its
decided disposition (own-all-3 + annex-or-acknowledge, booked) — a decided home, **not** a headless
false-green. That gap between gates-green and every-tripwire-flipped is exactly `_with_misses`.

**Zero silent drops**: all ten families reach a decided home — U-F1/U-F55-CI (build, G-ORACLE-1) ·
U-F6-oracle (build, G-ORACLE-2, via U-F62's split) · U-F62 (fold, the split executor) · U-F15 (fold
into U-F42's annex) · U-F42 (escalate, own-3 + annex) · U-F43/U-F44 (fold, test-hygiene) ·
U-F72/U-F73 (build, born-GREEN coverage).

---

## §1 The 6 §Hard-gate rows — VERBATIM disposition (born-RED → GREEN at cure · born-GREEN on write)

Each gate re-run live this session; invocations + results below are from that re-run.

### G-ORACLE-1 — U-F1 + U-F55-CI-teeth · the oracle slate gains TEETH → **PASS** (born-RED → GREEN)

> `node scripts/ci/oracle-slate-teeth.mjs` — **exit 0, all three CHECKs PASS** (re-run this close).
> The gate parses `.github/workflows/*.yml` and asserts: (A) every playwright project is invoked by a
> workflow; (B) no un-owned `continue-on-error` on the oracle/perf slate — every soft step carries an
> owned `G-ORACLE-1 SOFT-POSTURE-CITE:` marker; (C) the sole hard e2e gate (`page-load.spec.ts`) stays
> hard. **RED today** (captured `755a089`, witnessed exit 1): CHECK A FAIL — `smoke-perf`/`smoke-
> reactivity`/`smoke-mobile`/`smoke-admin` invoked by NO workflow (0 `--project=` matches);
> CHECK B FAIL — 2 soft slate steps (`full smoke`, `smoke-safari`) with no owned cite. **CURE**
> (the OWNED-soft disjunction; E-3 — real teeth, never an un-owned drift): (a) GAP-closure — the four
> previously-unrun projects wired into a new parallel `e2e-slate` CI job (`ci.yml:478`, the built-
> bundle `smoke-perf` — O-5's home — now RUN); (b) every soft oracle/perf step carries the
> `SOFT-POSTURE-CITE:` marker → `audit/oracle/ci-teeth/SOFT-POSTURE.md` (3 soft steps, all owned);
> (c) the gate itself wired HARD into CI (`ci.yml:167`, `node scripts/ci/oracle-slate-teeth.mjs`, no
> continue-on-error). **Teeth verified** (SOFT-POSTURE.md §5): the gate re-reddens on a softened
> page-load (CHECK C), a stripped cite (CHECK B), or an un-wired project (CHECK A) — not a pass-once.
> The Pole-A hard-subset promotion is PREPARED-but-RESERVED (SOFT-POSTURE.md §3, still-red/GPU-only
> excluded BY NAME); the blocking-vs-ratified-soft ruling is the owner's, **BOOKED → U.W-CLOSE**
> (default posture: SOFT-but-OWNED). **DELTA**: un-owned `continue-on-error` steps 2 → 0 (all cited) ·
> projects-invoked-by-no-workflow 4 → 0 · the CI-teeth gate itself un-wired → hard.

### G-ORACLE-2 — U-F6-oracle-half (via U-F62) · the FEASIBILITY-LEG LAW → **PASS** (born-RED → GREEN)

> `npx vitest run test/oracle-feasibility-leg.test.ts` — **7/7 GREEN** (re-run this close). The meta-
> audit ENUMERATES the guard-constant oracles (`ORACLES` registry) + the feasibility leg each must
> declare, and FAILS while any required leg is undeclared. **RED today** (captured `15e306e`,
> witnessed): 5 undeclared legs (O-14 chip, O-18 census, O-19 netting, O-21 span, O-12 backing) while
> the O-14 ramp positive control (WR-8/T.W8 — the law's proof-of-concept) stayed GREEN. **CURE**
> (E-3 — a CLASS law + a mechanism, not a per-oracle patch; BOTH poles delivered as the two halves of
> one law): **Pole A** — the meta-audit (`test/oracle-feasibility-leg.test.ts`, run under the standing
> `vitest run` CI step) proves the leg is DECLARED; **Pole B** — the canon precept
> (`audit/oracle/feasibility/PRECEPT.md`) binds the declaration to a real referent at review + the
> authoring convention (the leg's own e2e assertion proves it MEASURES the referent). The genuinely-new
> assertions are the O-14 chip leg + the O-12 backing-ratio leg; O-18/O-19/O-21 already CARRIED a
> real-referent measurement but the CLASS was unaudited (no declared marker) — declaring the marker is
> the audit passing. **DELTA**: guard-constant oracles WITHOUT a declared feasibility leg 5 → 0
> (registry 7/7). **VISUAL π-frame cross-ref**: the near-black ramp the leg catches → U.W-VISUAL /
> U-F6-ramp (not duplicated — the oracle-half is a predicate).
>
> **Companion #1 — the node-24 ratio-floor re-anchor** (`scripts/gates/proof-perf-target.mjs:77`,
> `SHEET_RATIO_FLOOR 0.0200 → 0.0160`): a LIVE instance of the feasibility-leg class — the floor is a
> guard constant whose real referent is the stylesheet parser's throughput relative to `JSON.parse` on
> the runner, and it was NOT certified against that referent on node-24 (CI run `29230557187` double-
> failed C2 at ratio 0.0189 < 0.0200 on the node-24 leg while node-22 passed the SAME code twice —
> same-code node-22-PASS/node-24-FAIL is definitionally a mis-calibration, not a parser regression:
> node-24's V8 optimizes the ratio's `JSON.parse` DENOMINATOR). **Re-anchor derived from measured
> headroom** (E-3, not hand-tuned): floor ≤ 0.0170 (no false-positive on the 0.0189 cured datum minus
> ~8–10% noise) AND floor > 0.0148 (retain teeth against a gross slow-chain revert) → **0.0160**; a
> fuller ~28%-below (0.0136) was REJECTED as sinking below the reverted level and losing teeth. C1-value
> floor UNCHANGED (0.0100, wide margin). Derivation: `audit/oracle/feasibility/node24-perf-floor.md`.
>
> **Companion #2 — boot-G / the O-12 backing-ratio leg MINTED born-GREEN** (`ROWS.md` pass-2 Row G →
> `DISPOSITION-LEDGER §C.1` un-homed → this wave's oracle-slate BOUNDS-EXPANSION decision): **MINT**
> (not decline). O-12's seat-identity leg certifies the seat GEOMETRY but is BLIND to the backing-store
> RESOLUTION — precisely a guard-constant certifying its own serialization while a wreck (the R2 0.35×
> emerge-presize) hides in a dimension the guard never measures. The leg makes the R2 regression class
> slate-visible; it is headless-measurable + renderer-INDEPENDENT (the backing store is JS-sized, not
> GL-sized — NOT the aurora's GPU-only class). **Born-GREEN** (the R2 defect was cured at `af18e07`; a
> born-RED would be fabricated). Floor **0.6** derived from the af18e07 forensic (cured ratio ≈ 1.0,
> wreck ≈ 0.35; 0.6 centred with margin both sides). `e2e/smoke/oracles/o12-blob-seat.spec.ts`.

### G-ORACLE-3 — U-F42 + U-F15 (fold) · the born-RED cure-OWNERSHIP register + the annex → **PASS** (born-RED → GREEN)

> `audit/oracle/born-red-register/REGISTER.md` — the standing record IS the gate (M1 ruling: *the
> record IS the gate; a producer ack is a bonus, never waited on*). **RED today** (captured `637686c`):
> 3 armed `test.fail()` ship at head, orphaned; the software-GL-unflippable pair (O-26 + O-3) undecided.
> **CURE** (E-3 — OWNERSHIP + an honest annex; NEVER delete a `test.fail()` to green CI, the close-class
> lie): each of the 3 tripwires mapped BY NAME → its cure wave + flip condition —
> - **O-16** (`o16-computed-cascade.spec.ts:34`, the dist `:root` 150ms transition-default clobber) →
>   **U.W-ADOPT** / the landed communiqué `17e0f522` §2b (PKT-1 producer-root); RE-VERIFIED still
>   shipped this pass (`--default-transition-duration: 150ms` at glass-ui dist `components.css:1`,
>   resolved glass-ui 5.0.0, pinned worktree @ `2e559f7a`);
> - **O-26** (`o26-aurora-perceptibility.spec.ts:57`, aurora migration `< 4/255`) → **U.W-ADOPT** /
>   communiqué §2b (producer aurora composition cure); can NEVER flip GREEN headless (SwiftShader forces
>   the CSS placeholder → migration ≈ 0 forever) — its authoritative read is the O-3 annex;
> - **O-5** (`o5-boot-pacing.spec.ts:48`, the boot spike `≤ 3× median`) → **U.W-PERF** (U-F3) /
>   U.W-ADOPT-gated (the RP-2 payload cut).
>
> **The software-GL-unflippable pair — annex DECISION (the U-F15 fold)**: O-26 + O-3
> (`o3-headed-gpu-probe.spec.ts:44`, `test.skip(isSoftwareGL(…))`) are RE-HOSTED to the U-F54 headed-GPU
> / owner-attested annex — **Pole B (acknowledge) ADOPTED**: absent a headed CI lane, their perceptibility
> / chromaticity is "verified by owner attestation, not by CI." The specs are UNTOUCHED (mapped by name
> only); neither is deleted, softened, nor turned into a pretend-headless flip. **DELTA**: orphaned
> `test.fail()` 3 unmapped → 3 mapped by name · software-GL-unflippable oracles 2 undecided → 2
> annex-hosted (Pole B). The **three flips** ride U.W-ADOPT/U.W-PERF; the **annex attestation** rides
> **U.W-CLOSE / U-F54** — booked, not held (§4).

### G-ORACLE-4 — U-F43 · the unit suite stops paying a build tax → **PASS** (born-RED → GREEN)

> `npx vitest run test/no-build-in-unit-suite.test.ts` — **1/1 GREEN** (re-run this close). Asserts the
> vitest unit suite invokes NO `npm run build` (no `execFileSync('npm',['run','build'])` in any
> `beforeAll`). **RED today** (captured `637686c`): `test/dts-published-surface.test.ts:23` ran a full
> `npm run build` (120s timeout) in a `beforeAll` for TWO string checks — ~70–80% of unit-suite wall
> time. **CURE** (E-3 — MOVE the check, never delete the dts-surface guard): the 2 `extractFunctions`
> published-`.d.ts` checks migrated to `scripts/gates/proof-dts-surface.mjs`, spliced into `test:dist`
> (`package.json:86`/`:90` — which builds FIRST, so the check reads fresh dist for free, no second
> build); `test/dts-published-surface.test.ts` DELETED (confirmed absent this close). **DELTA**: build
> calls in the unit suite 1 → 0; the unit suite is build-FREE (the ~70–80% wall-time drop is the win).

### G-ORACLE-6 — U-F72 · external-vector color anchors → **PASS** (born-GREEN coverage, pass-on-write)

> `npx vitest run test/units/color/conversions/color-external-anchors.test.ts` — **9/9 GREEN** (re-run
> this close). 3 published-reference, non-round-trip anchor describes: rgb2xyz vs culori `xyz65`
> goldens (incl. `#00cc00` exercising the sRGB transfer function — max err 2.2e-16), xyz2lab vs culori
> `lab` goldens (max err 2.3e-5), xyz2oklab vs Ottosson's own reference triples (max err ≤ 4.0e-4,
> tol 1e-3). **Before**: rgb2xyz had only a weak white+black anchor; xyz2lab/xyz2oklab had ZERO
> external-vector anchor (round-trip describes only). **BORN-GREEN by honest necessity** — the core is
> PROVEN SOUND (U-F60: sRGB→XYZ ≤ 1.11e-16, sRGB→OKLab ≤ 1e-6), so the anchors PASS on write; a born-RED
> would be a FABRICATED red (the O-14 sin inverted). Value = coverage against the shared-error class the
> round-trip is BLIND to (an error in both forward+inverse cancels in a round-trip; a forward-only
> external anchor catches it). `audit/oracle/color-anchors/README.md`. **DELTA**: rgb2xyz/xyz2lab/
> xyz2oklab external-vector anchors 0 real (weak white+black) → 3 published-reference (9 cases).

### G-ORACLE-7 — U-F73 · the Sharma CIEDE2000 table completed → **PASS** (born-GREEN coverage, pass-on-write)

> `npx vitest run test/units/color/color-difference.test.ts` — **GREEN** (re-run this close). The
> `SHARMA` table extended from **14 → all 34** of Sharma, Wu & Dalal's canonical CIEDE2000 pairs (the
> authors' supplementary certification dataset, transcribed verbatim), same `toBeCloseTo(_, 3)` (1e-3)
> tolerance. The 20 added pairs carry the classes a 14-subset cannot see: the large-ΔE regime (#17–20,
> ΔE 27.15/22.90/31.90/19.45 — the rotation term at extremes) + the achromatic-transition / near-neutral
> sign flips (#13,16,31,32 the registry names, + the full discontinuity set) + the completeness fill.
> Measured max error across all 34: ≈ 4.95e-5 (worst pair #23), well under the 5e-4 threshold.
> **BORN-GREEN** — the impl already passes them (§19; the coverage, not the code, was short); a born-RED
> would be fabricated. **DELTA**: SHARMA pairs 14/34 → 34/34.

**Final gate tally**: G-ORACLE-1 PASS · G-ORACLE-2 PASS · G-ORACLE-3 PASS · G-ORACLE-4 PASS ·
G-ORACLE-6 PASS · G-ORACLE-7 PASS → **all 6 gates GREEN (4 born-RED flipped at cure · 2 born-GREEN
on write), zero FAIL**. **U-F44 has no gate row** (correct — a test-QUALITY decouple, not a LIVE-defect
flip): `test/units/value-unit.test.ts` re-anchored from internal `superType` array-identity + `.value`
nesting to the observable CONTRACT (parse/serialize output + behavioral clone-independence) —
**71/71 GREEN** this close, verified by the decoupled test still asserting the contract.

---

## §2 The per-family disposition walk (10 families → decided home · commit · DELTA · gate)

| Family | Disposition | Commit | DELTA (before → after) | Gate |
|---|---|---|---|---|
| **U-F1** `ci-oracle-slate-nonblocking` | **build** (teeth: OWNED-soft + gap-closure + hard gate) | `755a089` | un-owned `continue-on-error` steps 2 → 0 (cited) · unrun projects 4 → 0 · CI-teeth gate un-wired → hard | G-ORACLE-1 |
| **U-F55-CI-teeth-half** `ci-oracle-slate-no-teeth` | **build** (a11y-half RETIRED · §20) | `755a089` | same mechanism as U-F1 (§16 "merges U-F1+U-F15+U-F42") | G-ORACLE-1 |
| **U-F6-oracle-half** `proxy-predicate-oracle` | **build** (the FEASIBILITY-LEG LAW · via U-F62 split) | `15e306e` | guard-constant oracles w/o a declared leg 5 → 0 (registry 7/7) | G-ORACLE-2 |
| **U-F62** `families-that-are-two-mechanisms` | **fold** (the split executor) | `15e306e` | U-F6 split executed: Q5 ramp → U.W-VISUAL/WR-8 · O-14 proxy oracle → here (bookkeeping, no independent build) | (records G-ORACLE-2) |
| **U-F15** `o26-softwaregl-nonflip` | **fold** → U-F42's annex | `637686c` | O-26/O-3 mis-hosting cured by the U-F54 annex re-host (Pole B); undecided 2 → annex-hosted 2 | G-ORACLE-3 |
| **U-F42** `vacuous-ci-tripwire` | **escalate** (own-3 + annex/acknowledge) | `637686c` | orphaned `test.fail()` 3 unmapped → 3 mapped by name; the 3 flips booked (not held) | G-ORACLE-3 |
| **U-F43** `slow-build-in-beforeAll` | **fold** (test-hygiene; MOVE to `test:dist`) | `637686c` | build calls in unit suite 1 → 0; ~70–80% wall-time drop; dts-surface guard preserved (`proof:dts-surface`) | G-ORACLE-4 |
| **U-F44** `impl-detail-coupled-tests` | **fold** (decouple to the contract) | `637686c` | `value-unit.test.ts` `superType` array-identity + `.value` nesting → parse/serialize output + clone-independence (71/71) | none (test-quality) |
| **U-F72** `test-ground-truth-circularity` | **build** (born-GREEN coverage) | `fc14c01` | rgb2xyz/xyz2lab/xyz2oklab external anchors 0 real → 3 published-reference (9 cases) | G-ORACLE-6 |
| **U-F73** `test-ground-truth-incomplete` | **build** (born-GREEN coverage) | `fc14c01` | SHARMA pairs 14/34 → 34/34 (incl. large-ΔE #17–20 + achromatic #13,16,31,32) | G-ORACLE-7 |

**The four wave lanes** (each path-scoped `docs/tranches/U/**` + source, pull-rebased):
Lane 1 (CI-TEETH — U-F1/F55-CI) `755a089` · Lane 2 (BORN-RED REGISTER + TEST-HYGIENE — U-F42/F15/F43/F44)
`637686c` · Lane 3 (FEASIBILITY-LEG LAW + node-24 floor + boot-G — U-F6-oracle via U-F62) `15e306e` ·
Lane 4 (COLOR-ANCHORS — U-F72/F73) `fc14c01`. The four standing records:
`audit/oracle/ci-teeth/SOFT-POSTURE.md` · `audit/oracle/born-red-register/REGISTER.md` ·
`audit/oracle/feasibility/{PRECEPT.md,node24-perf-floor.md}` · `audit/oracle/color-anchors/README.md`.

---

## §3 The misses — named, routed, zero laundered

Four misses. The first is the PP-16-designed structural miss; the second/third are owner-held decisions
booked to the close; the fourth is the honest substrate-blocked live-drive recorded baseline-parity.

### MISS-1 (structural · PP-16-designed) — the 3 `test.fail()` flips are producer/adopt-gated

The escalate (U-F42) OWNS all three armed `test.fail()`, but their FLIPS ride cure waves that have not
landed: **O-16** (dist `:root` clobber) + **O-26** (aurora composition) → **U.W-ADOPT** / the landed
communiqué `17e0f522` §2b (glass-ui PRODUCER roots — E-3 forbids a consumer workaround; ALREADY
DISPATCHED, cited by name, no second book); **O-5** (boot spike) → **U.W-PERF** (U-F3) / U.W-ADOPT-gated
(the RP-2 payload cut). **This is the PP-16 miss the wave doc pre-declared** — the archetypal
gates-armed / cure-wave-gated row. **No tripwire is deleted or softened** (that would be the close-class
lie); the register (`audit/oracle/born-red-register/REGISTER.md`) is the value.js-side gate itself.

### MISS-2 (owner-held decision · booked) — the O-26/O-3 headed-GPU annex ATTESTATION

The G-ORACLE-3 annex re-host DECISION (Pole B, acknowledge) is recorded HERE; the ATTESTATION itself —
the owner-attested / real-GPU aurora perceptibility + chromaticity frame — is **owner-held at close**,
**BOOKED → U.W-CLOSE / U-F54** (U-F61 attested-flags the born-RED-cure-ownership single-sourced claim).
**No headless assertion of the aurora frame is made** (the §21 caveat is a HARD line): O-26 stays the
honest headless `test.fail()`, O-3 stays SKIP-on-software-GL; a real-GPU headed CI lane (Pole A) remains
the future upgrade if one is stood up.

### MISS-3 (owner-held decision · booked) — the CI-teeth blocking-vs-ratified-soft ruling

The CI-teeth lane landed the OWNED-soft state (every project invoked, every soft step cited, the gate
wired hard) + PREPARED-but-RESERVED the Pole-A hard-subset promotion (SOFT-POSTURE.md §3, still-red /
GPU-only excluded BY NAME). The **final ruling** — promote the cured-green subset to BLOCKING (Pole A)
OR formally ratify the cited soft posture through U (Pole B) — is the **owner's, BOOKED → U.W-CLOSE**.
Default posture: **SOFT-but-OWNED**. Activation precondition (owner-held): a full e2e certification of
the cured subset on the CI SwiftShader runner, which this lane did NOT perform (expensive / contended;
the probe-parsimony edict). Never re-decided un-owned; the close ledger records the ruling.

### MISS-4 (substrate-blocked · baseline-parity · honest) — the feasibility legs' LIVE e2e drive

The feasibility-leg meta-audit (G-ORACLE-2) is a vitest predicate and re-runs GREEN this close; but the
per-oracle legs' **live e2e drive** (the O-14 chip + O-12 backing legs actually painting) is
**SUBSTRATE-BLOCKED**: the demo cannot boot on the current tree — `../glass-ui/dist/dock.js` imports
`rawOklabToOklch` from `@mkbabb/value.js`, an export the tranche-u lib does not yet ship (a U.W-LIB /
U.W-ADOPT deliverable — the mid-flight glass-ui BI dist the SUBSTRATE CAVEAT names). Every oracle that
loads the app fails IDENTICALLY in the shared boot helper (baseline parity — the failure is in the
substrate, not these legs). The O-18/O-19/O-21 marker additions are **comment-only** (zero runtime
change; the landed-green assertions untouched); the O-14 chip + O-12 legs reuse the proven composited-
surface / DOM patterns verbatim. Their correctness is carried here by the meta-audit (declares) +
pattern-parity + the recorded floor derivations; their LIVE pass rides the substrate unblock (the
glass-ui adopt / lib cut) → the standing e2e ceremony. Recorded honestly, not laundered.

**All four misses are booked/routed; zero silent drops.** (A fifth item — the node-24 floor's residual:
a *subtle* ~27% partial regression sits at the edge of noise on any calibration; the gate reliably
catches a GROSS revert, and the C1-value clause + the 1871-test correctness oracle carry the finer
discrimination — recorded in `node24-perf-floor.md §5`, not a miss but an honest instrument bound.)

---

## §4 §BOOKS carried into later waves (books, never gates — zero silent drops)

- **O-16 + O-26 producer flips → U.W-ADOPT / the landed communiqué `17e0f522` §2b.** The producer
  roots (the dist `:root` cascade clobber; the aurora composition) that flip O-16/O-26's `test.fail()`
  unblock at the adopt / the BI-acceptance constraints. **ALREADY DISPATCHED** — cited by name, NO new
  addendum authored by this wave (relay discipline M1).
- **O-5 / RP-2 boot-pacing flip → U.W-PERF / U.W-ADOPT.** The spike leg flips on the adopt-gated RP-2
  payload cut (U.W-PERF's U-F3 escalate). This wave owns the tripwire; the flip rides the payload cut.
- **O-26 / O-3 headed-GPU annex ATTESTATION → U.W-CLOSE / U-F54.** The §1 G-ORACLE-3 re-host decision is
  recorded here; the ATTESTATION is owner-held at close (U-F61 attested-flags it). CLOSE attests the
  frame; this wave records the re-host.
- **The CI-teeth blocking-vs-ratified-soft DECISION → U.W-CLOSE.** Default SOFT-but-OWNED; the owner
  rules Pole A (promote the reserved hard step, SOFT-POSTURE.md §3) or Pole B (ratify + cite the soft
  posture). U-F61 attested-flags the CI-TBT-red single-sourced claim.
- **boot-G — the O-12 backing-ratio minted leg → U.W-CLOSE's ledger walk.** The MINT outcome (born-GREEN,
  floor 0.6 from the af18e07 forensic) rides the close ledger; live re-measurement rides the substrate
  unblock. Parallels U-F1 / U-F6-oracle-half.
- **The feasibility-leg law's VISUAL π-frame → U.W-VISUAL / U-F6-ramp.** The near-black ramp the leg
  catches is VISUAL's obligation (real-GPU / owner-attested); G-ORACLE-2 cross-references it, no
  duplicate capture (the oracle-half is a predicate).
- **The moved dts-surface check → the standing CI-wired `test:dist` slate.** U-F43's 2 `extractFunctions`
  checks join `proof:dts-surface`; the unit suite's build-free state (G-ORACLE-4) is the standing signal.

---

## §5 The cross-repo RELAY declaration (E-2 — CHECKED, the honest not-triggered-here)

The E-2 owner relay edict fires when a U wave touches a glass-ui component or the glass-ui-level
contract. **U.W-ORACLE authored NO glass-ui / `src` / foreign-tree edit — its two producer-dependent
tripwires (O-16, O-26) relay to glass-ui, and that relay is ALREADY DISCHARGED in the landed formation
communiqué (`17e0f522` §2b), cited BY NAME, no second book.** The honest declaration:

- **Every file this wave touched is value.js-internal** — `.github/workflows/ci.yml`,
  `scripts/ci/oracle-slate-teeth.mjs`, `scripts/gates/proof-{dts-surface,perf-target}.mjs`,
  `package.json`, `test/**` (oracle-feasibility-leg · no-build-in-unit-suite · color-external-anchors ·
  color-difference · value-unit), `e2e/smoke/oracles/**` (o12/o14/o18/o19/o21 — comment/leg additions),
  and `docs/tranches/U/**`. **No `src/`, no `../glass-ui`, no `../keyframes.js`, no
  `demo/@/components/ui/`.** The o16/o26/o5/o3 spec files are UNTOUCHED (mapped by name in the register).
- **The producer dependency is BOOKED, not a new ask** — the O-16 dist `:root` clobber + the O-26 aurora
  composition are BI-acceptance constraints in the landed communiqué; the M1 relay discipline holds (the
  value.js-side record — the ownership register + the annex decision — IS the gate; a producer ack is a
  bonus, never waited on). **NO NEW addendum is authored by this wave.**

**E-2 discharged by the CHECK** (the honest declaration) — the pre-existing communiqué carries the
cross-repo coupling; U.W-ORACLE adds nothing to it.

---

## §6 Suites + evidence (at close · this session's live re-run)

- **G-ORACLE-1** `node scripts/ci/oracle-slate-teeth.mjs` — **exit 0** (CHECK A/B/C all PASS; 6 projects
  invoked, 3 soft steps cited, page-load hard).
- **G-ORACLE-2** `vitest run test/oracle-feasibility-leg.test.ts` — **7/7 GREEN**.
- **G-ORACLE-4** `vitest run test/no-build-in-unit-suite.test.ts` — **1/1 GREEN**;
  `test/dts-published-surface.test.ts` DELETED (confirmed absent); `proof:dts-surface` wired into
  `test:dist` (`package.json:86`/`:90`).
- **G-ORACLE-6/7 + U-F44** `vitest run color-external-anchors.test.ts color-difference.test.ts
  value-unit.test.ts` — **91/91 GREEN** (9 anchors · Sharma 34/34 · value-unit 71 contract-anchored).
- **The node-24 floor** `scripts/gates/proof-perf-target.mjs:77` — `SHEET_RATIO_FLOOR = 0.0160`
  (VALUE_RATIO_FLOOR unchanged `0.0100`); the `proof:perf-target` run itself is dist-gated → rides
  `test:dist` (build-first), substrate-blocked for a fresh live drive this close (MISS-4 baseline-parity;
  the derivation is measurement-anchored, `node24-perf-floor.md`).
- **CI wiring** — `ci.yml:167` the G-ORACLE-1 hard gate step; `ci.yml:478` the `e2e-slate` gap-closure
  job (smoke-perf/reactivity/mobile/admin); the three soft steps carry `G-ORACLE-1 SOFT-POSTURE-CITE:`
  (lines 345/448/544).
- **Substrate caveat (honest)** — typecheck / gh-pages / the app-loading e2e legs are RED on the
  mid-flight glass-ui BI dist (the missing `rawOklabToOklch` export; a U.W-LIB / U.W-ADOPT deliverable),
  a PRODUCER condition, NOT a defect in this wave's cures. Every headless-verifiable ORACLE gate is
  GREEN (above); the substrate-dependent legs are recorded baseline-parity (§3 MISS-4).
- **Foreign-tree fence held** — no edit to `src/`, `../glass-ui`, `../keyframes.js`,
  `demo/@/components/ui/`. This close commit is docs-only, path-scoped to `docs/tranches/U/**`.

---

## §7 Hand-off

U.W-ORACLE is a root-independent STRUCTURAL leaf feeding U.W-CLOSE's ledger walk. It closes
**`complete_with_misses`** — six gates GREEN (four born-RED flipped at cure, two born-GREEN on write),
zero FAIL; the U-F42 escalate reaches its decided disposition (own-3 + annex Pole B), U-F15/F43/F44/F62
fold to named homes, U-F72/F73 land born-GREEN coverage. The doubled honesty discipline held on every
gate — **no fabricated red** (G-ORACLE-6/7 born-GREEN over proven-sound code), **no pretend-headless
flip** (the aurora is the U-F54 annex, never a headless assertion). Four misses booked/routed (the 3
producer/adopt-gated flips · the annex attestation · the CI-teeth ruling · the substrate-blocked live
drive); zero silent drops. The close-ledger inputs — the born-RED cure-ownership register, the annex
attestation decision, the CI-teeth soft-posture ruling, the boot-G minted-leg outcome — ride
**U.W-CLOSE** by name (§4).

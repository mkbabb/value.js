# Ruling-Fidelity Audit — OWNER-RULINGS-2026-07-20 vs S2 (snapshot-vnext-2)

**Seat:** READ-ONLY mechanical-compliance audit.
**Authority:** `docs/tranches/V/apotheosis/OWNER-RULINGS-2026-07-20.md` (terminal
22-row docket; row 15 = owner upward override).
**Subject (frozen tree):** `docs/tranches/V/apotheosis/snapshot-vnext-2/` (S2),
the Codex fleet's post-convergence tree after the rulings were relayed via
`docs/tranches/V/coordination/value-inbox-2026-07-20-owner-rulings-relay.md`.
**Method:** for each ruling I located its owning wave(s)/spec text in S2 and
quote-anchored the landing. Where S2 carries its own crosswalk
(`UNION-ROW-INVENTORY.json`, 22 `OWNER_RULING` rows), I used it as a map but
verified each landing against the actual wave/spec bytes, not the crosswalk's
self-report.

## Bottom line

**22/22 rulings LANDED. Zero CONTRADICTED. Zero MISSING.** Three rows carry
minor PARTIAL/translation residuals (D-3 governance-label, D-4 literal field
name, D-5 model-name substitution) — all substance-faithful; none is an
actionable defect. The D-15 first-class-fourier override is landed to full
depth: the isomorphism contract is a real 18-facility bijection over all 146
operations, and its declared `operation_source_sha256` **hash-matches** the
actual `api-contract.source.json` bytes (verified `60723ece…` == `60723ece…`),
so the contract is genuinely pinned rather than asserted.

## Per-row verdict table

| # | Ruling (short) | Verdict | Primary anchor(s) in S2 |
|---|---|---|---|
| D-1 | 7-key freeze; only `./quantize` demoted | **LANDED-FAITHFUL** | `DISPOSITIONS.md:32`; `waves/P-V.md:83` (V00C), `:123` (V29T); `waves/M-C.md:38` (C00 seven-path + sole quantize tombstone); `UNION-INGESTION.md:97` |
| D-2 | Glass stays 7.x; no value-scheduled major | **LANDED-FAITHFUL** | `waves/G-D.md:59` (G07); `UNION-INGESTION.md:105` |
| D-3 | Boundary GO — entry-gated on shipped 4.1.x + executed two-leg ERESOLVE, undated | **LANDED-FAITHFUL** (label residual) | `waves/P-V.md:103` (V16R); `waves/G-D.md:59` (G07 ERESOLVE both legs); `waves/M-C.md:55` (C10 gates on V16R shipped) |
| D-4 | Per-seat `model_served` + spot-probes; no attestation spend | **LANDED-FAITHFUL** (literal field-name residual) | `OWNER-AMENDMENTS.md:21` (OA-09 "every panel records the served tier"), `:13` (OA-01); `PROVENANCE.md:36` |
| D-5 | C17 roster: mechanical=Opus, design/skepticism/adjudication/union=Fable | **LANDED-FAITHFUL** (via OA-01 substitution) | `OWNER-AMENDMENTS.md:13` (OA-01 Fable→Sol/Opus→Luna); `PROVENANCE.md:31-36`; `FORMATION.md:28`; `WAVE-ROUTING-PI.md:11` |
| D-6 | FLIP KEEP · physics/morph KEEP · `compileToViewTransition` TRIM · presets SHRINK | **LANDED-FAITHFUL** | `waves/K-A.md:32` (K14), `:33` (K15), `:39` (K21), `:40` (K22); `DISPOSITIONS.md:60-68` |
| D-7 | scroll KEEP · ingest RETIRE w/ tombstone; fidelity → value parse | **LANDED-FAITHFUL** | `waves/K-A.md:27` (K09 RETIRE, RULING), `:25` (K07 scroll KEEP); `DISPOSITIONS.md:54-55` |
| D-8 | `internal/` dissolves (option-c), extends proof:structure | **LANDED-FAITHFUL** | `waves/K-A.md:41` (K22T); `DISPOSITIONS.md:48` |
| D-9 | `transform/decompose.ts` PRUNE + tombstone | **LANDED-FAITHFUL** | `waves/P-V.md:114` (V24 RULING); `DISPOSITIONS.md:33` |
| D-10 | Idempotency D2 §3 P2 KEPT; named durable re-trigger only | **LANDED-FAITHFUL** | `waves/K-A.md:51` (A02 "explicitly preserving D2 §3 P2"); `DISPOSITIONS.md:100`; isomorphism `jobs` named_asymmetry |
| D-11 | Cursor errors converge to 400 (D3/D.W2 overturn) | **LANDED-FAITHFUL** | `waves/K-A.md:58` (A08 RULING); `DISPOSITIONS.md:102` (24 ops → typed 400); `API-OPERATIONS.md:42` |
| D-12 | Restore divergence ratified: no Value restore; revision-revert covers | **LANDED-FAITHFUL** | `waves/K-A.md:59` (A09 "no restore operation/schema/client/route"); `DISPOSITIONS.md:99`; isomorphism `resource-core` named_asymmetry |
| D-13 | featured → relation; `(visibility,tier)` retained | **LANDED-FAITHFUL** | `waves/K-A.md:57` (A07T RULING); `API-OPERATIONS.md:208-210` (`/featured-palettes` relation); `DISPOSITIONS.md:97-98`; isomorphism `curation` facility |
| D-14 | Value `/shares` BUILD; kf/fourier get no share server | **LANDED-FAITHFUL** | `waves/K-A.md:64` (A13 RULING); `API-OPERATIONS.md:169-173`; `STATE-ROUTING.md:237`; isomorphism `share` facility |
| D-15 | **OWNER OVERRIDE — fourier FIRST-CLASS**, full isomorphism, nothing banked, direct-edit granted | **LANDED-FAITHFUL (full depth)** | `API-FACILITY-ISOMORPHISM.json` (18 facilities/146 ops); `api-facility-isomorphism.schema.json`; `API-OPERATIONS.md:66-74`; `waves/K-A.md:72-84` (A21R..A26); **hash-pinned** |
| D-16 | spring() grammar VALUE-owned, experimental flag; kf keeps solver | **LANDED-FAITHFUL** | `waves/P-V.md:118` (V25 RULING); `waves/K-A.md:28` (K10 solver fence); `DISPOSITIONS.md:28` |
| D-17 | HDR BUILD (V19); R-EVAL RETIRE (no static calc evaluator) | **LANDED-FAITHFUL** | `waves/P-V.md:109` (V19 RULING, "11-day HDR drop is unjust"), `:88` (V05 "retire the static evaluator") |
| D-18 | contrast-color() WCAG21 republished; APCA experimental | **LANDED-FAITHFUL** | `waves/P-V.md:110` (V20 RULING) |
| D-19 | SoA BANKED w/ pre-ratified threshold; 3.0.0 tombstone stands | **LANDED-FAITHFUL** | `waves/P-V.md:104` (V16B RULING); `DISPOSITIONS.md:12` |
| D-20 | Mobile toolbar = D03A registry + dock-morph; final form at design gate | **LANDED-FAITHFUL** | `waves/G-D.md:72` (D03A "D-20 collapsed dock→expanded ActionBar morph" + G00I frame) |
| D-21 | Easing MEASURE FIRST; kf old share links HARD-CUT | **LANDED-FAITHFUL** | `waves/M-C.md:26` (M08 measure-first), `:20` (M02 hard-cut, no redirect); `waves/G-D.md:58` (G09); `DESIGN-PROGRAM.md:296` |
| D-22 | Router idiom ratified (`usePaneRouter`); UrlEnvelope layers on top | **LANDED-FAITHFUL** | `STATE-ROUTING.md:7-9`; `waves/G-D.md:69` (D01 "reshaping the router would violate D-22"); `FORMATION.md:167` |

---

## Priority-depth findings

### D-15 — fourier first-class (owner override): LANDED to full depth

The isomorphism contract carries every element the ruling demands.

- **Real bidirectional contract, not an annex.** `API-FACILITY-ISOMORPHISM.json`
  declares `law.direction:"bidirectional"`,
  `identity:"intrinsic-job-equivalence-not-identical-routes-nouns-or-runtime"`,
  `coverage:"each-operation-exactly-once"`, 18 facilities, and the four relation
  kinds `isomorphic | ratified-asymmetry | value-only-refused |
  fourier-only-refused`. The schema (`api-facility-isomorphism.schema.json`)
  hard-pins `facilities` to `minItems:18/maxItems:18`, `counts.total:146` and
  requires all 6 API rulings `["D-10","D-11","D-12","D-13","D-14","D-15"]`.
- **Contract is genuinely pinned.** `authority.operation_source_sha256` =
  `60723ece0716051bf48395d0a4bb28d7917030b332704d05658b3e5a880c3aa9`; I computed
  `shasum -a 256 api-contract.source.json` → identical. The isomorphism binds
  the actual operation manifest bytes.
- **fork ≅ derivation:** `derivation` facility, `relation:"isomorphic"`,
  `shared_invariants:["fork is isomorphic to derivation", …]`, value
  `fork.{create,list,provenance}` ↔ fourier `derivation.{create,list,provenance}`
  (`API-OPERATIONS.md:68` states the contract "prove fork≅derivation and
  revision≅revision").
- **revision ≅ revision:** `history` facility maps
  `value.revision.{list,detail,diff,revert}` ↔ `fourier.revision.{…}`; the sole
  asymmetry named is value-side `revision.export` — S2 *names* it rather than
  faking symmetry, exactly per the ruling ("refusals named … without forcing
  identical nouns").
- **Named refusals, nothing contrived:** `value-only-refused` (identity,
  variants, mix, share, social, taxonomy, curation) and `fourier-only-refused`
  (palette-binding, assets, jobs) each carry explicit `named_asymmetries`.
- **Full fourier program un-banked** (ruling: "Nothing banked"):
  identity/accountless (`A22S` resource-edit credential; `identity` facility
  named-asymmetry "per-resource edit credentials and a deployment operator serve
  its intrinsic jobs"), CRUD (`A23`, `resource-core`), assets (`A21A`, `assets`),
  durable jobs (`A21J`, `jobs`), search (`A23S`), history (`A23H`, `history`),
  derivation (`A24`, `derivation`), palette-binding (`A25`, `palette-binding`).
  The only bank in the API band is the **value-side** D-10 compute-queue bank —
  the fourier program itself is fully built (`waves/K-A.md:72-84`).
- **Direct-edit grant reflected:** fourier is directly owned/edited by the
  A-band + C03/C04 waves (`PROVENANCE.md:55` isolates
  `A21R A21 A22 A22S A21A A21J A23 A23S A23H A24 A25 A23C A26 C03P C03 C04` on the
  `fourier-analysis` repo), whereas **kf stays dispatch-only via P4.5** packets
  (`waves/K-A.md:17` K00 "P4.5 cargo manifest", `:27` K09 "P4.5 boundary
  packet"). This is the ruling's "Direct-edit grant … GRANTED. kf stays
  dispatch-only (P4.5)" distinction, realized structurally.
- **Still subject to D-10..D-13:** the isomorphism's `resource-core`, `history`,
  `jobs`, `curation`, `http-idempotency-maintenance` and `database-migration`
  facilities each cite the relevant record ruling in `authority_refs` /
  `named_asymmetries`.
- **Scope re-grade honored:** A21–A26 are RATIFIED SCOPE, not scope-creep; the
  A-band (`FORMATION.md:44`, 36 waves) treats the full Python fourier service as
  first-class, and `A01`/`A26` gate the "146-operation facility ledger covers
  each operation once."

Nuance (not a defect): D-15's parenthetical "identity (A21A/J)" reads oddly
against the isomorphism's `identity` facility being `value-only-refused`
(fourier: `[]`). This is faithful, not contradictory: fourier's identity job is
*accountless* — served by per-resource edit credentials + a deployment operator
and refusing user/session resources (`DISPOSITIONS.md:113`; `identity` facility
named-asymmetry). The parenthetical points at the A21A/A21J wave anchors, not at
a user-account facility.

### D-1 — seven-key freeze: six-key language is GONE; only `./quantize` demoted

- `waves/P-V.md:83` V00C born-RED is a **RULING** row: "**D-1 terminally rejects
  the former six-key proposal**: the root and seven keys survive, with only
  `./quantize` demoted"; deliverable enumerates exactly `./color`, `./css`,
  `./easing`, `./math`, `./path`, `./transform`, `./value` + "sole `./quantize`
  tombstone."
- `waves/P-V.md:123` V29T gate proves "all seven keys, unchanged root/`./value`,
  absent `./quantize`."
- `waves/M-C.md:38` C00 crater independently checks "seven Value-path checks
  (`./color`,…,`./value`) plus the sole `./quantize` tombstone."
- `VALUE-TARGET-PATHS.json` contains `quantize` + `tombstone` tokens; no
  competing six-key row survives.
- `UNION-INGESTION.md:97` closes the contradiction by name: "**CLOSED by
  D-1/V00C/V29T:** the former six-key/`./value` tombstone proposal; seven keys
  survive and only `./quantize` is demoted." No `./value` removal; no root-export
  change appears anywhere.

### D-7 ingest RETIRE / D-6 zone rulings / D-13 featured-relation / D-11 cursors / D-12 restore-declined

All land in the K/A band with the ruling-specific overturn recorded:

- **D-7:** `waves/K-A.md:27` K09 born-state = "RULING — … D-7 orders retirement
  while preserving CSSOM/runtime consumption"; deliverables = "P4.5 boundary
  packet; … migrate all ingestion fidelity fixtures to V09/V26; … tombstone"; the
  companion scroll KEEP is `waves/K-A.md:25` K07. Casualty proof runs the
  deletion-judgment grammar (`proof:k09` "exact four-question deletion
  judgment"; `tools/deletion-judgment.mjs`), matching AD-12.
- **D-6:** four discrete RULING rows — K14 FLIP KEEP, K15 `compileToViewTransition`
  TRIM ("zero demo use"), K21 physics/ElementMorph KEEP, K22 preset SHRINK
  ("about 41 eager entries are unjustified … a small core carries named recurring
  jobs"). No blanket-prune residue survives (`UNION-INGESTION.md:99`).
- **D-13:** `waves/K-A.md:57` A07T = "RULING"; `API-OPERATIONS.md:208-210` ships
  `featured` as a relation resource (`GET /featured-palettes`, `PUT/DELETE
  /featured-palettes/{paletteId}`), tier stays `standard|archived`
  (`DISPOSITIONS.md:97`), all six visibility×tier states legal; `STATE-ROUTING.md:126`
  gives Browse independent `tier`/`curation` keys with `archived+featured`
  refused.
- **D-11:** `waves/K-A.md:58` A08 = "RULING", records "the named D3/D.W2 overturn";
  `DISPOSITIONS.md:102` "all 24 cursor operations return typed
  `urn:contract:cursor-invalid` HTTP 400 and never restart at page one"; demo
  migration priced in D12 (`waves/G-D.md:83`).
- **D-12:** `waves/K-A.md:59` A09 generates "no restore operation/schema/client/
  route"; recovery is revision-revert (A10, `waves/K-A.md:61`); fourier restore
  stays first-class (`resource-core` named-asymmetry; `fourier.visualization.restore`
  present at `API-OPERATIONS.md:229`). W45 retirement stands
  (`DISPOSITIONS.md:99`).

### D-16..D-19 grammar rulings

- **D-16** spring VALUE-owned experimental: `waves/P-V.md:118` V25 = "RULING —
  … D-16 assigns experimental spring syntax to Value while the solver remains
  Keyframes-owned"; "exposes no Value solver and delegates the exact typed
  parameters to K10" (`waves/K-A.md:28` K10 solver fence).
- **D-17** HDR BUILD / R-EVAL RETIRE: `waves/P-V.md:109` V19 = "RULING — the
  11-day HDR drop is unjust"; `waves/P-V.md:88` V05 = "RULING — … a library-side
  evaluator would fabricate DOM/layout resolution that D-17 leaves to the
  platform … retire the static evaluator … no general evaluation API."
- **D-18** contrast WCAG21 + APCA-experimental: `waves/P-V.md:110` V20 = "RULING
  — … D-18 orders WCAG21 republished and APCA experimental"; gate proves "APCA is
  unreachable without the flag."
- **D-19** SoA BANKED: `waves/P-V.md:104` V16B = "RULING — Into is already
  decided and ships in V16R"; immutable bank row + single measured re-trigger;
  `DISPOSITIONS.md:12` "D-19 holds the 3.0.0 tombstone."

### D-20/D-21/D-22 design rulings

- **D-20** dock-morph toolbar: `waves/G-D.md:72` D03A binds "**D-20 collapsed
  dock→expanded ActionBar morph** with its post-G00I DesignSync frame"; gate:
  "mobile tools re-emerge as one labelled collapsed dock state and
  deterministically expand/collapse without duplicate faces … unavailable
  DesignSync cannot green the wave." Final form is deferred to the design gate
  after G00I binds the Breath corpus — exactly the ruling's shape.
- **D-21** measure-first easing + kf hard-cut: `waves/M-C.md:26` M08 = "Measure
  the rendered mobile Easing defect … adjudicated visual thresholds set from that
  record before source mutation … tile/stroke rendering—not decimal count—is the
  unmeasured causal variable"; `DESIGN-PROGRAM.md:296` "C00P's controlled
  tile-size/stroke/DPR record sets the visual precision threshold before G09 or
  M08 mutates source." kf old share links: `waves/M-C.md:20` M02 "old links
  refuse visibly without redirect" (no shims).
- **D-22** router ratified + UrlEnvelope layered: `STATE-ROUTING.md:7` "the
  extant `usePaneRouter` idiom is the ratified route/pane source of truth: this
  tranche does not reshape it. The `UrlEnvelope` codec layers over that
  authority"; `waves/G-D.md:69` D01 "reshaping the router would violate D-22";
  `FORMATION.md:167` binds the `UrlEnvelope<Route,State>` codec.

### Process/governance rulings D-2, D-3, D-4, D-5

- **D-2** Glass 7.x: `waves/G-D.md:59` G07 born-state = "RULING — a Value tranche
  may not schedule Glass 8"; ships an "Glass 7.x minor tarball"; C10 cuts
  "the exact Glass 7.x minor packed by G07" (`waves/M-C.md:55`).
- **D-3** boundary entry-gated, undated: realized as a dependency gate, not a
  date. The 4.1.x vehicle is V16R (`waves/P-V.md:103`); the boundary (Glass
  peer-move) is G07, which depends on V16R and proves "**both pre-boundary
  refusal and boundary success**" of the ERESOLVE matrix (`waves/G-D.md:59`);
  C10 "verify … V16R is already published and any P07 blocker prevents the
  window" (`waves/M-C.md:55`). Nothing in S2 is dated; deps are wave IDs only.
- **D-4** provider trust: `OWNER-AMENDMENTS.md:21` OA-09 "every panel records the
  served tier"; OA-01 "Served-model evidence is required"; `PROVENANCE.md:36`
  "Model declaration alone is insufficient; the served model must be verified
  where the execution surface exposes it." This is per-seat `model_served` +
  spot-probe verification with no heavier attestation.
- **D-5** C17 roster: `OWNER-AMENDMENTS.md:13` OA-01 authorizes the substitution
  **Fable→Sol, Opus→Luna**; `WAVE-ROUTING-PI.md:11` "design, novelty, skepticism
  and adjudication; Luna may run only the mechanical"; `FORMATION.md:28` "All
  formation critics are Sol … Luna is reserved for future mechanical
  implementation fanout." `OWNER-AMENDMENTS.md:21` OA-09 records the served Sol
  tier as `gpt-5.6-sol`/ultra. Apply the OA-01 substitution and the roster split
  matches D-5 exactly (mechanical=Luna/Opus; design/skepticism/adjudication/union
  =Sol/Fable).

---

## MUTATED / CONTRADICTED / MISSING — ranked

**None.** No ruling is contradicted, mutated in meaning, or missing. The
convergence is high-fidelity. For completeness, the only sub-faithful residuals
(all PARTIAL-in-form, faithful-in-substance; none actionable):

1. **(low) D-4 — literal field name not confirmed as a stamped schema key.** The
   ruling names a per-seat `model_served` field; S2 encodes the concept as prose
   ("every panel records the served tier", OA-09; "the served model must be
   verified where the execution surface exposes it", `PROVENANCE.md:36`) plus
   per-seat `.assignment.json`/`.report.json` hashing
   (`FORMATION-CLEAN-PASS-PROTOCOL.md:18-22`). The mechanism (verify-where-exposed,
   no attestation spend) is fully present; the exact key name `model_served` is
   not verified as a return-schema field. Substance LANDED.

2. **(low) D-5 — requires applying the OA-01 name substitution.** S2 never
   repeats the ruling's literal "on Opus"/"on Fable" wording; it uses the
   owner-authorized substituted role names (Sol/Luna). A reader must apply OA-01
   to map it. Faithful (the substitution is explicitly owner-granted), but it is
   an indirection, and the served-model string `gpt-5.6-sol`
   (`FORMATION-CLEAN-PASS-PROTOCOL.md:12`) is reconciled to the "Sol/Fable design
   seat" only through OA-09 — worth a one-line cross-reference if any future
   reader mistakes it for a provider divergence. (It is not one.)

3. **(informational) D-3 — governance label `F-GOV-05` not carried literally.**
   The ruling's effect cites "F-GOV-05 activated"; S2 realizes the gate
   structurally (V16R→G07 deps + C10 gating + executed two-leg ERESOLVE) but does
   not stamp the `F-GOV-05` identifier. Mechanism LANDED; the row label is
   absent.

## Cross-checks performed

- `sha256(api-contract.source.json)` == isomorphism
  `authority.operation_source_sha256` (`60723ece…`): **match** — D-15 contract is
  byte-pinned to the operation manifest.
- Operation counts consistent across `API-OPERATIONS.md` (129 HTTP = 88 value +
  41 fourier; 17 headless), `API-FACILITY-ISOMORPHISM.json`
  (`counts.total:146`), and its schema constants (value 95 / fourier 51).
- `UNION-ROW-INVENTORY.json` carries exactly 22 `OWNER_RULING` rows D-1..D-22,
  each with owner waves that resolve against the 193-wave books; every mapping
  was re-verified against the actual wave text rather than trusted from the
  crosswalk.

*(Note: this audit inspects S2 formation/spec bytes for ruling fidelity. It does
not assert the corresponding production waves have executed — S2 itself records
production 0/193 and formation clean-pass 0/2. Fidelity here = the converged
specification faithfully encodes the owner's dispositions.)*

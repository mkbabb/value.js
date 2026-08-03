# TRANCHE X — THE CONSTELLATION COHESION SPINE (M-26)

**Authority**: `docs/tranches/V/megatranche/SCOPE.md` M-25 (per-repo wave specs as X sub-tranches)
+ M-26 (this document's charter). Authored by the session root (Fable) 2026-08-03; live document —
the sub-session register and status board are kept current at every boundary; dated sections are
never rewritten.

## §0 The whole

Tranche X is the megatranche's single execution tranche, with four sub-tranches and one
coordinate-only lane:

| sub-tranche | scope | spec home | status |
|---|---|---|---|
| **X·V** | value.js — library, demo, API, CI | `docs/tranches/X/waves/W0..W11.md` | **SPECIFIED** 2026-08-03 (six-pass L-20 loop, `CONFORMANCE-2026-08-03.md`) |
| **X·KF** | keyframes.js — library + demo | `docs/tranches/X/keyframes/waves/` | FORMING (census landed; specs await the intake CARRY table) |
| **X·F** | fourier-analysis — frontend + CRUD union | `docs/tranches/X/fourier/waves/` | FORMING (census landed; specs await the intake CARRY table) |
| **X·P** | parse-that — the CSS-totality parser lane | `docs/tranches/X/parse-that/waves/` | FORMING (spec authoring dispatched 2026-08-03) |
| glass | producer; coordinate-only | batched BJ communique | O-19/I-21 ledger current; next batch assembles from CARRY rows |

One tranche, one carry discipline, one conformance law (L-20), one execution gate: **nothing in
any sub-tranche opens product source until the owner's begin-word.**

## §1 The sub-session register (the orchestrated item-sets)

Each sub-session is an orchestrated workflow (or workflow series) driven by this session (M-24).
A sub-session spawns only when its INPUTS column has landed — an input-starved sub-session
re-invents, violating M-25 ¶2. The Codex marks (the 16 intake files) are routed into these
item-sets by the intake-adjudication CARRY table.

| id | item-set | inputs (hitherto corpus) | outputs | routing (M-23) | status |
|---|---|---|---|---|---|
| SS-1 | **X·KF library design** (parse facade · K-quartet · D/L/C tri-fold · structure/colocation → KF.W0/W2/W4/W5/W8) | kf census + lane-library · intake B10–B21 CARRY rows · O-8/O-11 (post-I-26 amendment) · library-band apotheosis | full X·KF wave specs (library half) | Opus authors; Fable adjudication | AWAITS intake CARRY |
| SS-2 | **X·KF frontend design** (glass suffusion · timeline evaluate · Safari visual · mail cure → KF.W1/W6/W7/W9) | kf census + lane-frontend (shadow census S-1..S-8, phantom-dep F-1) · glass 7 receipts · I-21 rows | full X·KF wave specs (frontend half) | design waves TWICE-AUTHORED Fable∥Opus → fresh-Fable agg | AWAITS intake CARRY |
| SS-3 | **X·F frontend design** (substrate settle · tri-package uplift · shadow retirement · frontend audit → F.W0/W1/W3/W4/W9/W10) | fourier census + lane-frontend · intake R3–R6 CARRY rows · O-14 | full X·F wave specs (frontend half) | Opus authors; uplift + suffusion design twice-authored | AWAITS intake CARRY |
| SS-4 | **CRUD/provenance union** — fourier CRUD ∥ palette CRUD (contract v2 · defect burn-down · trie design · union prototype → F.W5–W8, + the value-side counterparty riding X·V W3/W9 surfaces) | fourier lane-crud SEAM TABLE · J-diff-shape (J-era) · TA-4 atomdiff-excision record · X-W3 P0 rows · owner rulings owed (trie-vs-KISS et al.) | the co-signed shared-provenance contract + X·F CRUD wave specs | contract design TWICE-AUTHORED; Fable adjudication; owner rulings flagged inline | AWAITS intake CARRY + owner rulings |
| SS-5 | **X·P parser lane** (pause verify · fresh root · dual-target JS+Wasm prototype waves) | PARSER-CSS-PAUSE-HANDOFF-2026-08-02 §8/§9 · GATE-VERDICT · parser-band apotheosis · O-15 · M-22 ¶3/¶4 · PLAW-BIND routing | full X·P wave specs | W-architecture wave twice-authored; rest Opus; Fable L-20 | **DISPATCHED 2026-08-03** |
| SS-6 | **Glass communique assembly** | every CARRY row marked NEXT-COMMUNIQUE · I-21/I-21a · intake glass lane | ONE batched BJ letter at the next boundary | root-authored (Fable); E13 | ACCRETING |
| SS-7 | **Corpus adjudication** (88 components ÷ ~10 Goldilocks batches, tri-fold each) | the 264-axis challenge corpus (r2 governs) · motion-quarantine.md · harvest defects | `registry/adjudicated/<slug>.md` ×78 + the NO-WAVE-OWNER register (§4) | 2 Opus re-readers → fresh-Fable apotheosis per component | **RUNNING** — batch 1 LANDED (8/78), batch 2 dispatched |
| SS-8 | **Visual audit** (real-Safari matrix + UNPROVEN-NEEDS-LIVE residue) | apotheoses' UNPROVEN-NEEDS-LIVE rows · the live dev stack · owner probe-parsimony law | evidence packets keyed to apotheosis row ids | bounded live probes; parsimonious | OPEN (task #4) |
| SS-9 | **Codex-intake adjudication** (the marks census: kf B10–B21 · fourier R3–R6 · value V6/V7 · glass ROW8) | the 16 intake files (canonical) · fresh censuses · live trees | `INTAKE-ADJUDICATION-2026-08-03.md` + CARRY table + census addenda | 4 Opus lanes → fresh-Fable master | **RUNNING** (`wf_b1903beb-e2b`) |

## §2 The cross-sub-tranche dependency graph

- **X·P release condition → KF.W3** (parser consumption): gate-keyed, never scheduled; routing is
  PLAW-BIND — parser → value (X·V L1/L5 surfaces) → packed release → consumers. **Direct
  parse-that→fourier is FORBIDDEN** (standing routing law).
- **SS-4 contract co-signature → F.W5 ∥ X·V API row**: neither side's edits gate the other's
  waves; the value-side atomdiff restoration (TA-4) is a named prerequisite or the contract is
  re-scoped explicitly.
- **Glass-8 census (X-W0.j) → X.W4.g**: the one atomic trigger-gated cut; sub-tranches never
  consume glass 8 independently.
- **F.W1 tri-package uplift precedes F.W3/F.W4**: no fourier frontend spec may assume the
  uplifted tree before W1 lands it.
- **I-26 mail cure (KF.W1) precedes any kf wave consuming O-8/O-11 obligations.**
- Cross-repo edges are declared FROM BOTH ENDS in the spec files (the X·V W4-D2 lesson, now law).

## §3 The cohesion criteria (checkable; the X-whole SPECIFIED bar)

1. Every intake-adjudication CARRY row lands in **exactly one** sub-tranche wave (set-difference
   ∅ both directions, the X·V 117-row idiom).
2. Every census wave-sketch id (KF.W0–W10, F.W0–W10) maps to a full spec **or** a terminal kill
   with rationale — no silent drops, no re-booking.
3. Every NO-WAVE-OWNER row (§4) reaches a terminal home — a sub-tranche wave, the next formation
   boundary's ledger, or a kill — before X-whole stamps SPECIFIED.
4. Cross-repo edges reciprocal (both files); zero cycles across the whole constellation graph.
5. Each sub-tranche closes its own L-20 conformance loop to a SPECIFIED stamp with a
   declared-Fable final pass.
6. **X-whole is SPECIFIED only when all four sub-tranches are** — then one X-whole conformance
   pass checks §3.1–§3.5 across the union.

## §4 The NO-WAVE-OWNER intake register (live; seeded from SS-7 batch 1)

Adjudicated-real rows owned by no X wave. Each gets a terminal home per §3.3. Pointer-level —
the per-component apotheoses are authoritative.

| source | rows | pointer |
|---|---|---|
| AboutPane rider A-1 | 3 phantom owners (W18 recomposition · MT-CSS-2 · W-HYGIENE) adjudicated in V, never cut into X | `registry/adjudicated/AboutPane.md` |
| ActionFeedback | G-DEMO-3b re-point + `browser/index.ts:6-7` prose correction | `registry/adjudicated/ActionFeedback.md` |
| AdminAuditPanel | 9 rows (transport shape validation · request sequencing · ApiProblem.detail inversion · dateFormat · cursor pagination · vacuous-gate rider · resource duplication · tsconfig parity · e2e ghost paths) | `registry/adjudicated/AdminAuditPanel.md` |
| (accretes per batch) | — | — |

## §5 Status board (kept current at every boundary)

- 2026-08-03: X·V SPECIFIED · censuses landed (kf, fourier) · SS-7 batch 1 LANDED (8 apotheoses,
  24/24 seats) + batch 2 dispatched · SS-9 intake adjudication RUNNING · SS-5 X·P spec authoring
  DISPATCHED · SS-1..SS-4 await the CARRY table · I-24a/I-26 mail defects rowed · execution gate
  CLOSED (awaits owner begin-word).

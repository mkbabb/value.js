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
| **X·P** | parse-that — the CSS-totality parser lane | `docs/tranches/X/parse-that/waves/W0..W4.md` | **SPECIFIED** 2026-08-04 (three-pass L-20 loop, fable-stamped; fresh root uncreated; Plane B bench bar OWNER-GATED) |
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
| SS-5 | **X·P parser lane** (pause verify · fresh root · dual-target JS+Wasm prototype waves) | PARSER-CSS-PAUSE-HANDOFF-2026-08-02 §8/§9 · GATE-VERDICT · parser-band apotheosis · O-15 · M-22 ¶3/¶4 · PLAW-BIND routing | full X·P wave specs (W0..W4, 5 waves; W2 twice-authored) | W-architecture wave twice-authored; rest Opus; Fable L-20 | **SPECIFIED 2026-08-04** (3-pass loop) |
| SS-6 | **Glass communique assembly** | every CARRY row marked NEXT-COMMUNIQUE · I-21/I-21a · intake glass lane | ONE batched BJ letter at the next boundary | root-authored (Fable); E13 | ACCRETING |
| SS-7 | **Corpus adjudication** (88 components ÷ ~10 Goldilocks batches, tri-fold each) | the 264-axis challenge corpus (r2 governs) · motion-quarantine.md · harvest defects | `registry/adjudicated/<slug>.md` ×78 + the NO-WAVE-OWNER register (§4) | 2 Opus re-readers → fresh-Fable apotheosis per component | **RUNNING** — batch 1 LANDED (8/78), batch 2 dispatched |
| SS-8 | **Visual audit** (real-Safari matrix + UNPROVEN-NEEDS-LIVE residue) | apotheoses' UNPROVEN-NEEDS-LIVE rows · the live dev stack · owner probe-parsimony law | evidence packets keyed to apotheosis row ids | bounded live probes; parsimonious | OPEN (task #4) |
| SS-9 | **Codex-intake adjudication** (the marks census: kf B10–B21 · fourier R3–R6 · value V6/V7 · glass ROW8) | the 16 intake files (canonical) · fresh censuses · live trees | `INTAKE-ADJUDICATION-2026-08-03.md` + CARRY table + census addenda | 4 Opus lanes → fresh-Fable master | **RUNNING** (`wf_b1903beb-e2b`) |
| SS-10 | **X·KF challenge saturation** (M-27 parity: D/L/C per kf component/zone, hash-banked) + SS-10b adjudication | kf census rosters (58 demo `.vue` + 14 library zones) · read-only kf tree | `audit/kf-components/<slug>/challenge-{D,L,C}.md` → apotheoses | 3 Opus challenge seats per component; tri-fold adjudication follows | **RUNNING** (batch 1) |
| SS-11 | **X·F challenge saturation** + SS-11b adjudication | fourier census rosters · read-only fourier tree | `audit/fourier-components/<slug>/…` → apotheoses | same idiom | QUEUED (≤4-workflow law) |
| SS-12 | **X·P challenge saturation** (library modules; no demo) + SS-12b adjudication | parse-that src roster · O-15 · read-only tree | `audit/parse-that-modules/<slug>/…` → apotheoses | same idiom, L+C axes (D n/a) | QUEUED |
| SS-13 | **Per-repo visual audits** (kf demo · fourier frontend, Safari mobile+desktop) | SS-10/SS-11 UNPROVEN-NEEDS-LIVE rows · probe-parsimony law | evidence packets keyed to apotheosis rows | bounded live probes | QUEUED behind saturation |

## §1a The parity map (M-27: the value.js treatment × all four repos)

A cell marked `—` without a QUEUED/RUNNING sub-session is a cohesion defect (§3.7).

| treatment | value.js | keyframes.js | fourier-analysis | parse-that |
|---|---|---|---|---|
| D/L/C challenge saturation (hash-banked) | **DONE** 88/264 | SS-10 RUNNING (16/58, batch 3 in flight) | SS-11 RUNNING (16/66, batch 3 in flight) | **DONE** 2026-08-04 (15/15 modules, 30 L/C axes) |
| Tri-fold adjudication → apotheoses | **SS-7 RUNNING** (27/88, batch 3 in flight) | SS-10b QUEUED (follows saturation) | SS-11b QUEUED | **SS-12b RUNNING** (batch 1 dispatched 2026-08-04) |
| Formation census | done (the megatranche itself) | **DONE** 2026-08-03 | **DONE** 2026-08-03 | done (pause handoff + parser-band + O-15) |
| Codex-marks adjudication | SS-9 RUNNING (V6/V7 lane) | SS-9 RUNNING (B10–B21 lane) | SS-9 RUNNING (R3–R6 lane) | n/a (no intake files; the pause handoff IS the mark, adopted M-22) |
| Wave specs (full, born-RED) | **SPECIFIED** (12 waves) | SS-1/SS-2 AWAIT CARRY | SS-3/SS-4 AWAIT CARRY | **SPECIFIED** (5 waves, 2026-08-04) |
| L-20 conformance loop | **CLOSED** (six passes) | queued behind specs | queued behind specs | **CLOSED** (three passes) |
| Refinement pass (fold own apotheoses pre-final-stamp) | owed — X·V folds SS-7 routings before X-whole stamp | queued | queued | queued |
| Visual audit (Safari mobile+desktop) | SS-8 OPEN (task #4) | SS-13 QUEUED (kf demo) | SS-13 QUEUED (fourier frontend) | n/a (no demo) |
| Mail-ledger surface | INBOX (E13, live) | KF.W1 wave item (+ I-26 cure) | F.W0 wave item | O-15 thread at their docs root |
| Historical excavation | DONE (A..V + M-14) | census docs-lane (their V, 13 waves) | census docs-lane (J/K-deploy/M) | pause-handoff chain (P1–P6) |

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
| AdminTagsPanel | 8 rows (+2 partial) incl. `useAdminTags.ts` in NO X wave file list — the result-surface cure unownable until W7 adopts it | `registry/adjudicated/AdminTagsPanel.md` |
| ApiOfflineChip | transport cluster ×5 (`demo/platform/transport/**` has no X-wave claimant; incl. the confirmed unbounded cooldown burst AP-17 MAJOR) | `registry/adjudicated/ApiOfflineChip.md` |
| BlobPane | MT-CSP-1 (the adjudicated ConfigSliderPane record) ORPHANED from the X carry-cut ledger — 10 identity-folds hang on it | `registry/adjudicated/BlobPane.md` |
| BrowsePane | 5 strands (search-predicate seam · colour-search blindness · card-cluster home · refetch/loadingMore · `request<T>` decoder) | `registry/adjudicated/BrowsePane.md` |
| ErrorBoundary | the boundary successor component (cross-surface residue; EB-2/EB-4 cure-lock binds — boundary must sit OUTSIDE KeepAlive) | `registry/adjudicated/ErrorBoundary.md` |
| MiniColorPicker | `MiniColorPicker.vue` unclaimed by any X wave (DELETE-AND-REBUILD terminal shape adopted) → X-W7 rider else boundary | `registry/adjudicated/MiniColorPicker.md` |
| PaginationBar | 5 rows (composable-layer defects above the clean 48-line leaf) | `registry/adjudicated/PaginationBar.md` |
| (accretes per batch) | — | — |

## §4a The SS-6 communique accretion register (producer-owned rows awaiting the ONE batched BJ letter)

| row | finding | source |
|---|---|---|
| SC-1 | glass-ui 7.0.0 ships `glass-chip.css` and never imports it anywhere (glass.css / index.css / glass-ui.css all 0) — guts the sole Chip consumer; ALL Chip adoption in this repo BLOCKED-ON the producer cure | ATP-23, `adjudicated/AdminTagsPanel.md` (dist greps in-seat) |
| SC-2 | `--type-mono-caption` phantom token is PRODUCER-born (4th consumer in minified glass-ui.css); demo cure `var(--type-micro)` bare, zero pixel delta | `adjudicated/ApiOfflineChip.md` |
| SC-3 | ActionFeedback relay QUESTION: Alert's foreground-ink-on-wash idiom vs the producer ink-rung ask (demoted from ask to question) | `adjudicated/ActionFeedback.md` |
| SC-4 | PG-17: consumer writes `--card-press-t` but the producer press-cast reads `--cartoon-press-t`; `card-press-t` has ZERO readers in the whole glass-ui dist — the press-cast choreography is inert and both in-file comments claiming it works are false. Producer question: which name is canonical? | PG-17, `adjudicated/PaletteCardGrid.md` (r2, dist grep in-seat) |
| SC-5 | ErrorBoundary plate register relay: the caught-plate's paint/stacking contract (plate under the absolute atmosphere canvas; ~1050px owner clamp) belongs in the producer plate register so consumers stop re-deriving it | EB-1/EB-8, `adjudicated/ErrorBoundary.md` |
| (accretes per batch; assembled into ONE letter at the next boundary per SS-6) | | |

## §5 Status board (kept current at every boundary)

- 2026-08-03: X·V SPECIFIED · censuses landed (kf, fourier) · SS-7 batch 1 LANDED (8 apotheoses,
  24/24 seats) + batch 2 dispatched · SS-9 intake adjudication RUNNING · SS-5 X·P spec authoring
  DISPATCHED · SS-1..SS-4 await the CARRY table · I-24a/I-26 mail defects rowed · execution gate
  CLOSED (awaits owner begin-word).

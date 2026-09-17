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
| **X·P** | parse-that — the CSS-totality parser lane | `docs/tranches/X/parse-that/waves/W0..W4.md` | **SPECIFIED** 2026-08-04 (three-pass L-20 loop, fable-stamped) · **EXECUTING — W0 gates 8/8 GREEN 2026-09-17**: fresh root `parse-that-css-totality-p2` OPEN at `f5757082` (`8a83c8bb`), eighteen roots byte-unchanged (census diff empty); IMPLEMENTED is W0's close report's stamp, VERIFIED is X.P.W4's (R-A); Plane B bench bar RULED **RECORDED-NOT-GATING** (§0j.E OC-1) |
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
| SS-10 | **X·KF challenge saturation** (M-27 parity: D/L/C per kf component/zone, hash-banked) + SS-10b adjudication | kf census rosters (58 demo `.vue` + 14 library zones) · read-only kf tree | `audit/kf-components/<slug>/challenge-{D,L,C}.md` → apotheoses | 3 Opus challenge seats per component; tri-fold adjudication follows | **SATURATION DONE 2026-08-06 (58/58, 174 axes)**; SS-10b adjudication next |
| SS-11 | **X·F challenge saturation** + SS-11b adjudication | fourier census rosters · read-only fourier tree | `audit/fourier-components/<slug>/…` → apotheoses | same idiom | **SATURATION DONE 2026-08-07 (66/66, 198 axes)**; SS-11b adjudication running |
| SS-12 | **X·P challenge saturation** (library modules; no demo) + SS-12b adjudication | parse-that src roster · O-15 · read-only tree | `audit/parse-that-modules/<slug>/…` → apotheoses | same idiom, L+C axes (D n/a) | QUEUED |
| SS-13 | **Per-repo visual audits** (kf demo · fourier frontend, Safari mobile+desktop) | SS-10/SS-11 UNPROVEN-NEEDS-LIVE rows · probe-parsimony law | evidence packets keyed to apotheosis rows | bounded live probes | QUEUED behind saturation |

## §1a The parity map (M-27: the value.js treatment × all four repos)

A cell marked `—` without a QUEUED/RUNNING sub-session is a cohesion defect (§3.7).

| treatment | value.js | keyframes.js | fourier-analysis | parse-that |
|---|---|---|---|---|
| D/L/C challenge saturation (hash-banked) | **DONE** 88/264 | **DONE** 2026-08-06 (58/58, 174 axes) | **DONE 2026-08-07 (66/66, 198 axes)** | **DONE** 2026-08-04 (15/15 modules, 30 L/C axes) |
| Tri-fold adjudication → apotheoses | **SS-7 RUNNING** (40/88, batch 5 in flight) | SS-10b UNBLOCKED (saturation done) | SS-11b QUEUED | **DONE 2026-08-06 (15/15 modules)**; refinement fold in flight |
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
| PaletteCard | K-7 registry repair: a 20,018-byte git-tracked CHALLENGE-L report sits at the malformed pass-2 path the governing report says was empty and deleted — evidence-ledger correction, no wave owns registry hygiene | `registry/adjudicated/PaletteCard.md` R-4 |
| PaneHeader | PH-1 (WebKit shrink-ratio pole) has NO carry-ledger row — formation-boundary flag; named gaps: `useHeaderCondense.ts` + `o11-header-gates.spec.ts` in no X-wave file list | `registry/adjudicated/PaneHeader.md` |
| PreviewRamp | named carries in NO X-wave bounds: `color-chips/**`, `preview-chips.test.ts`, the WHCM roster arm, `aurora-harmony-stops.ts`, `mixStage.ts`; + ADJ-1 sequencing rule ([data-color-surface]: GenerateControls G8 deletes it, PreviewRamp's cure mints producers — order bound on both records) | `registry/adjudicated/PreviewRamp.md` |
| PreviewStrip | chip-family residue consolidated as ONE named identity ≡ PCS-10; X-W9.d/.f named gaps DEGRADE to NO-WAVE-OWNER if unadopted at execution | `registry/adjudicated/PreviewStrip.md` |
| (accretes per batch) | — | — |

## §4a The SS-6 communique accretion register (producer-owned rows awaiting the ONE batched BJ letter)

| row | finding | source |
|---|---|---|
| SC-1 | glass-ui 7.0.0 ships `glass-chip.css` and never imports it anywhere (glass.css / index.css / glass-ui.css all 0) — guts the sole Chip consumer; ALL Chip adoption in this repo BLOCKED-ON the producer cure | ATP-23, `adjudicated/AdminTagsPanel.md` (dist greps in-seat) |
| SC-2 | `--type-mono-caption` phantom token is PRODUCER-born (4th consumer in minified glass-ui.css); demo cure `var(--type-micro)` bare, zero pixel delta | `adjudicated/ApiOfflineChip.md` |
| SC-3 | ActionFeedback relay QUESTION: Alert's foreground-ink-on-wash idiom vs the producer ink-rung ask (demoted from ask to question) | `adjudicated/ActionFeedback.md` |
| SC-4 | PG-17: consumer writes `--card-press-t` but the producer press-cast reads `--cartoon-press-t`; `card-press-t` has ZERO readers in the whole glass-ui dist — the press-cast choreography is inert and both in-file comments claiming it works are false. Producer question: which name is canonical? | PG-17, `adjudicated/PaletteCardGrid.md` (r2, dist grep in-seat) |
| SC-5 | ErrorBoundary plate register relay: the caught-plate's paint/stacking contract (plate under the absolute atmosphere canvas; ~1050px owner clamp) belongs in the producer plate register so consumers stop re-deriving it | EB-1/EB-8, `adjudicated/ErrorBoundary.md` |
| SC-6 | AP-37: glass-ui's unlayered `.dropdown-menu__item{color:inherit}` kills its OWN @layer-components accent-foreground highlight ink as well as the consumer's destructive ink — one relay, two victims (class-stack extracted from dropdown-menu-BlbnvMaZ.js in-seat) | AP-37, `adjudicated/PaletteCardMenu.md` |
| SC-7 | Producer chip size-rung ask: chipVariants sm (px-2.5 py-1 text-caption) exceeds the local meta pill on all three axes — xs/pill-micro rung requested; drop-in-Chip cure refuted until it exists | R-3, `adjudicated/PaletteCardMeta.md` |
| SC-8 | Producer radius clobber: components.css re-emits `--radius/-lg/-sm` in layer(components), mis-scaling every consumer of the whole design system; + corrected motion-topology ask (stagger phaseless by construction) | `adjudicated/PaletteCardSkeleton.md` |
| (accretes per batch; assembled into ONE letter at the next boundary per SS-6) | | |
| **DISPATCHED 2026-08-28**: SC-1..SC-8 + the X·KF/X·F authoring-block accretions assembled into **O-20** (`../glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md`, 26 entries; cartoon-card retired, DOCK-ACTIVE negative-ask honored); the table resumes accreting for the next boundary | | |

## §5 Status board (kept current at every boundary)

- 2026-08-03: X·V SPECIFIED · censuses landed (kf, fourier) · SS-7 batch 1 LANDED (8 apotheoses,
  24/24 seats) + batch 2 dispatched · SS-9 intake adjudication RUNNING · SS-5 X·P spec authoring
  DISPATCHED · SS-1..SS-4 await the CARRY table · I-24a/I-26 mail defects rowed · execution gate
  CLOSED (awaits owner begin-word).
- 2026-09-17: **X·P W0 executed** under the begin-word (§0j) — the fresh root
  `parse-that-css-totality-p2` opened at `f5757082` by no-hardlink clone (`8a83c8bb`), the pause
  handoff's seven identities re-derived with 0 MISMATCH (`80d96f18`), the eighteen preserved roots
  enumerated and byte-unchanged across the wave (`b69611a8`; `diff census-before census-after`
  empty), the lane's harvest filed at `registry/harvest/x-p-w0.json` and **PLAW-BIND now declared
  from BOTH ends** — the X·P end at `docs/tranches/X/parse-that/EVIDENCE-CHAIN.md` §5/§6, citing
  §2's X·P release-condition bullet by anchor and quoted sentence, never by line.

## §0a BOUNDARY 2026-08-25 — THE REGISTRY IS WHOLE; THE AUTHORING BLOCK OPENS

The adjudication program is COMPLETE: **227/227 units banked** at `35fc8ebf` — value.js 88/88
(SS-7 CLOSED), keyframes 58/58 (SS-10b CLOSED), fourier 66/66 (SS-11b CLOSED), parse-that 15/15
with the X·P refinement-fold addendum CONFORMANT at pass 10 (`08232cd3`). The §1 register's
status cells for SS-7/SS-10/SS-11/SS-12 read as of 2026-08-04 and are superseded by this block
(dated sections never rewritten). Fleet laws proven in force across all corpora: REGISTRY-FIRST,
BASELINE LAW, STALE-DIST TRAP, registry-currency-is-part-of-the-claim, confirms-need-the-sweep.
**SS-1/SS-2 (X·KF) and SS-3/SS-4 (X·F) LAUNCH at this boundary** — inputs landed (registry whole
+ intake CARRY at `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`); SS-4's owner
rulings are FLAGGED INLINE per the register's routing note, never presumed. Sequencing locks the
authoring MUST carry: the repair-arms-a-defect rows (fr-PaperSearchModal same-commit riders,
PAW-44/LAW-3, MPC-31 one-cut law, FR-MSP-6 two-channel lock), the F.W1 atomic land-or-lose seam,
the F.W0 substrate pre-gates (corrupt glass-ui 4.0.0 dist/styles/index.css; dirty-worktree
settle), KF.W0 §B-12 manifest schism, and the NO-WAVE-OWNER packets (§4 + the per-record
NO-WAVE-OWNER registers). Execution gate unchanged: nothing opens product source until the
owner's begin-word.

## §0b ADDENDUM 2026-08-28 — KF.W3 OWNERSHIP CURED; THE FOLD BLOCK OPENS

**KF.W3 ownership gap (found by the SS-1/SS-2 taxonomy seat): CURED by assignment.** §1 assigned
parser-consumption to neither SS-1 nor SS-2. Disposition: KF.W3 is a library wave (parse façade →
consumption); it belongs to **SS-1**, and its spec was authored under that seat at `KF-W3.md`
(banked `b6e09ed4`). The wave's GATED posture is unchanged — PLAW-BIND keys it to the X·P release
condition; never scheduled by this assignment.

Boundary state: SS-1/SS-2 authoring PARTIAL-BANKED at `b6e09ed4` (7/11 specs: W0 W2 W3 W4 W7 W8
W10 + the 424-row W6 CARRY; W1/W5/W6/W9 fold seats re-running). SS-3/SS-4 authoring RUNNING.
**The X·V refinement fold OPENS this boundary** (per-wave fold files under `refinement/` +
`REFINEMENT-FOLD-2026-08-28.md`, the X·P idiom): NO-WAVE-OWNER packets dispositioned, bounds
convictions answered, §READINESS planning-only. Execution gate unchanged.

## §0c ADDENDUM 2026-08-28 (later) — X·V REFINEMENT FOLD CONFORMANT; THE VALUE.JS SPEC LAYER IS DEVELOP-COMPLETE

**The X·V refinement fold reached CONFORMANT at pass 4** (`c88e1fed`; verdict appended at the
addendum's §ROUND-4). The full apotheosis corpus now rides the wave set: 1,890 rows folded
across the 12 per-wave fold files (walk dated pass-4, gapless bands), 19 NO-WAVE-OWNER packets
terminal (15 homed with their riding rows id-for-id, 4 FORMATION-BOUNDARY), the 6 I-28
glass-8.0.0 external rows minted (§EXTERNAL X-EXT-1..6 — SearchBar delete, ./forms→./input,
grain, --slider-track-bg, o7 re-pin, peer), 22 bounds convictions answered + 44 delegated, six
may-not-be-cited edicts registered, and §READINESS (planning-only) stating the execution-order
picture. **G-F posture**: the fold layer now carries every NWO row at a home; §3.3's register
question is answered by the fold layer itself — the union pass adjudicates the stamp.
Sibling loops standing: X·KF at pass 5 (r4 staged-repair running), X·F at pass 3 (r2 resume
running). **X-whole union pass remains the sole gate between here and tranche-development
COMPLETE.** Execution gate unchanged: the owner's begin-word is the only key.

## §0d ADDENDUM 2026-08-28 (later still) — THE MINTED-UNAUTHORED SUCCESSOR WAVES, DECLARED AT THE BOUNDARY

Per the X·KF W10 seat's upward declaration (its §6.C-E; the seat lawfully refused the COHESION
write as out-of-bounds): **KF.W11 · KF.W12 · KF.W13 — MINTED (KF-W4:249's R-15 homing block;
listed at KF-W1 cross-edge 9), UNAUTHORED; cargo = the 17-packet partition 9+6+2 with the six
travelling locks; authoring seat = the SS-1/SS-2 authoring block; X·KF W10's close stamps the
AUTHORED ELEVEN only.** The successor register of record is `keyframes/waves/KF-W10.md §6.D`;
mechanism F (minted-wave roster census diffed against authored specs ∪ the register) is adopted
program-wide — a mint with neither is a hard escape on sight.

## §0e ADDENDUM 2026-08-29 — X·KF CONFORMANT AT PASS 8; TWO OF THREE LOOPS CLOSED

**X·KF is CONFORMANT** (`3c4807d0`; verdict at `keyframes/conformance/VERDICT.md`): eight passes,
census ZERO escapes twice running, hash-proven close, all residuals MINOR-with-mitigation. Joined
with §0c's X·V fold verdict, the value.js and keyframes spec layers are both develop-complete.
Standing: **X·F census-freeze round running** (CENSUS-CANONICAL.md = the sole census operand;
pass-5 pending). On its CONFORMANT: the X-whole union pass (seams · G-F stamp · the whole-tranche
execution runbook) closes tranche development. Execution gate unchanged.

## §0f ADDENDUM 2026-08-30 — X·F CONFORMANT AT PASS 15; ALL THREE LOOPS CLOSED

**X·F is CONFORMANT** (verdict at `fourier/conformance/VERDICT.md`): fifteen passes, roster ZERO
escapes and fabrication ZERO for eight consecutive passes, canonical FROZEN at `f44362757458`
seven rounds running, hash-proven close, tail = 1 MINOR + 1 LOW + 1 INFO all
mitigation-stated-non-blocking. The loop minted eight program-laws (census freeze · star-topology
pin certificate · strictly-sequential convergence · spelling-agnostic numeric sweeps · the
self-count law · authority-list-first numeric reconciliation · write-then-measure · measure-
don't-inherit closure) — recorded in the verdict and binding on every successor round anywhere
in X. With §0c (X·V) and §0e (X·KF), **all three sub-tranche spec layers are develop-complete.**
Standing: the X-whole union pass (seams · G-F stamp · the whole-tranche execution runbook) is the
sole remaining artifact before tranche development is COMPLETE — launched on this addendum's date.
Execution gate unchanged: the owner's begin-word is the only key.

## §0g ADDENDUM 2026-08-30 — X-UNION REPAIR ROUND 1: THE SPINE'S THREE CURES (S-4 · S-19 · S-9)

**Authority**: `docs/tranches/X/union/SEAMS.md` — the X-whole union pass seam register (24 seams,
15 CONSISTENT, 9 CONVICTED, authored 2026-08-30 by the seam-adjudicator seat). This block executes
**per X-union SEAMS.md S-4 cure, S-19 cure and S-9 cure, 2026-08-30**, the three convictions whose
owning end is this file. Per SEAMS §8's recommendation the spine takes **one** dated addendum at
this boundary rather than three.

**E-3 posture.** This is an **addendum-beside**. **§0a..§0f are not rewritten, §0d is not
rewritten, and §2's bullets keep their bytes** — dated sections are never rewritten; each cure
below states the **strike** and the **replacement** in current voice, and the superseded reading
stays legible at its own site. **No wave is authored here.** No four-verb row moves, no gate is
minted or re-staged, no sibling spec is edited, no product source is opened. Status stays `planned`
in all four sub-tranches. **The owner's begin-word remains the only execution key**, and neither
disposition below may be executed before it.

### §0g.1 · S-4 — THE X·V L1/L5 PARSER-ADOPTION LEG IS **UNHOMED** AND **OWNER-OWED**

**What §2 says.** Its first bullet routes the chain *"PLAW-BIND — parser → value (X·V L1/L5
surfaces) → packed release → consumers"*. **The chain's middle link — the X·V wave authorized to
consume the parser seam — is held by no wave, and both named ends say so in their own bytes.**

- **X·P's end** (`parse-that/waves/W4.md`, §OPEN-PROBLEMS row **OP-4**, read at this seat):
  *"**The X·V adoption surface.** Some X·V (or successor) wave must be authorized to consume the
  seam. | **DOES NOT EXIST — this is the wave's principal finding.** … None of X-W0..X-W11 adopts
  one. | G-9's terminal disposition. This is a **coordination mark carried to the owner**, never a
  unilateral wave invention: X·P does not get to author an X·V wave."*
- **X·V's end** (`waves/W9.md`, §X-W9.g and §Hard Gate row **G31**, read at this seat): the unit
  *"…adopt a parser; it records why value.js ships none of parse-that today"*, and G31's falsifier
  is *"Record a dependency state the manifest does not show, or adopt a parser inside this wave"*,
  against a measured dependency set of exactly
  `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`.

**The defect is the spine's, not either sub-tranche's.** Both ends stated the gap honestly; §2
asserts a chain whose middle link both of them disclaim. **DECLARED HERE, in current voice: the
X·V L1/L5 parser-adoption leg is UNHOMED — no X wave holds it — and its disposition is
OWNER-OWED at the X-W0 sitting.** §2's PLAW-BIND bullet is **not** struck: its routing is correct
and remains the law (direct parse-that→fourier stays FORBIDDEN). What is corrected is the reading
that the L1/L5 leg is an *existing* edge: **it is a declared, unhomed leg pending the owner's
disposition.**

**The three admissible dispositions are G-9's, quoted from `parse-that/waves/W4.md` §Hard Gate
`G-9` and not re-worded here:**

| id | disposition | what it decides |
|---|---|---|
| **A** | *"the owner authorizes a successor X·V wave (a thirteenth X wave, or a post-X tranche wave) that consumes `SEAM-CONTRACT.md` at `src/css/**`"* | mints the missing wave; its authoring seat and boundary are the owner's to name |
| **B** | *"the owner amends X-W9's G31 to admit adoption inside tranche X, which also decides whether the adoption rides X-W9's dated cut and X-W11's release (OP-5)"* | keeps the leg inside X and binds it to the 4.1 cut + release |
| **C** | *"the row closes `BLOCKED-ON <exact condition> + <re-trigger command>` (the X-W11.a idiom, L-4) and X·P ends with RC-P permanently FALSE until that condition fires"* | closes the leg with a named re-trigger; RC-P stays FALSE meanwhile |

**G-F register consequence, stated so the stamp is not taken on a phantom edge.** G-6's **third**
commissioned sentence — *"This wave consumes `docs/tranches/X/parse-that/SEAM-CONTRACT.md` at
`src/css/**`; X·P writes no bytes here."* — enters the X-whole G-F register as
**UNHOMED-PENDING-OWNER**, **never as an existing edge**, and no §3.4 reciprocity is claimed for
it: it has no file to live in until disposition **A** or **B** is ruled. G-6's other two sentences
are unaffected (X·KF's is discharged verbatim at `keyframes/waves/KF-W3.md`; X·F's is the separate
S-3 conviction, owned at `fourier/waves/F-W0.md` and not curable from here).

**No wave is authored by this cure**, and no seat may read it as authorization to author one —
OP-4's own words govern: *"X·P does not get to author an X·V wave"*, and neither does the spine.

### §0g.2 · S-19 RIDER — §0d's `KF-W4:249` ANCHOR IS **STRUCK**; THE STABLE ANCHOR REPLACES IT

**§0d is not rewritten.** Its citation *"KF-W4:249's R-15 homing block"* is **STRUCK as a
coordinate** by this dated rider, and the replacement anchor is:

> **`keyframes/waves/KF-W4.md` §Sequencing — the R-15 homing block** (the paragraph opening
> *"NO-WAVE-OWNER packets, HOMED from this end"*, whose roster is RULINGS **R-15**'s canonical
> SEVENTEEN). **§-heading + rule id, no numeral** — matching KF-W10's own spelling of the same
> citation, *"KF-W4 R-15 homing"*.

**Verified at this seat, 2026-08-30, read-only** (the drift is real and the strike is earned):
`sed -n '249p' keyframes/waves/KF-W4.md | wc -c` → **1** — the cited line is **blank**;
`grep -n 'R-15' keyframes/waves/KF-W4.md` returns the homing block at **`:254`**, its three wave
bullets at `:256`–`:258`, under the heading `## §Sequencing` at `:244`. **The anchor was dead by
five lines when this rider was written, and the numeral is not re-issued** — a fourth coordinate
would repeat the defect rather than cure it. **The replacement anchor resolves uniquely**, which is
the only receipt a stable anchor owes (KF-W4's own LAW E(4) idiom — the coordinate it returns is
deliberately not transcribed): ⟨cmd⟩ `grep -c 'NO-WAVE-OWNER packets, HOMED from this end'
keyframes/waves/KF-W4.md` → **1**; `grep -c '^## §Sequencing' keyframes/waves/KF-W4.md` → **1**.

**The form was the defect independent of the drift.** X·F convicts this class at its own **E-11**
and X·KF at **D3-3/D3-4**; KF-W4's own R-15 row carries three retired coordinates (`:276` → `:401`
→ neither) as its proof that *a line number is not a receipt*. The spine held itself to a lower bar
than the specs it governs; it no longer does. **Standing rule, adopted here for this file: no
COHESION citation into a live sibling carries a line number — §-heading plus row/rule id only.**
§0d's substance is untouched (the mint, the 9+6+2 partition, the six travelling locks, the
SS-1/SS-2 authoring seat, and the AUTHORED-ELEVEN stamp scope all stand exactly as §0d states
them, and S-18 adjudicated them CONSISTENT sentence-for-sentence).

### §0g.3 · S-9 — THE GLASS-8 ATOMIC-CUT LAW IS **RE-SCOPED TO THE REPO IT GOVERNS**

**§2's Glass-8 bullet is not rewritten.** Its current bytes read:

> *"- **Glass-8 census (X-W0.j) → X.W4.g**: the one atomic trigger-gated cut; sub-tranches never
> consume glass 8 independently."*

**The universal quantifier in its second clause is STRUCK by this dated addendum.** The bullet is
**re-scoped, in current voice, to:**

> **Glass-8 census (X-W0.j) → X-W4.g: the one atomic trigger-gated cut IN VALUE.JS. No X·V wave
> consumes glass 8 outside the X-W0.j → X-W4.g family.**

**Why the re-scope, measured.** The atomicity law was stated at the spine alone and reciprocated
nowhere — ⟨cmd, this seat, read-only 2026-08-30⟩ `grep -rl 'X-W0\.j' keyframes/waves/
fourier/waves/` → **no output**; `grep -rn 'glass 8 independently\|Glass-8 census' keyframes/waves/
fourier/waves/` → **no output**. Meanwhile each sibling decides its own producer pin under its own
owner gate: **X·F** at `F-W1` **G1/ESC-1** (the `4→7(→8, G1-gated)` re-pin, 8.0.0-aware at row
granularity), **X·KF** at `KF-W0` **§B-12**'s 7.0.0 EXACT devDep. Under §2's own closing bullet —
*"Cross-repo edges are declared FROM BOTH ENDS in the spec files"* — an edge stated at one end is
not an edge. **X-W0.j is a value.js repin act reading value.js's installed bytes**; it never had
standing to bind another repo's manifest, and the quantifier that said otherwise reached trees this
spine does not own.

**What is NOT changed.** The cut's **atomicity inside value.js is unweakened** — one trigger, one
receiver, one spelling (S-24 adjudicated CONSISTENT: X-EXT-6 → X-W0.j, X-EXT-4 → X-W4.g, every
X-EXT row riding the glass-adopt family); no interim wrapper, no second migration, no copied
selector. **No sibling ruling is edited by this cure.** SEAMS' second move — the one-line
non-edge declaration owed at `fourier/waves/F-W1.md` §Cross-edges and `keyframes/waves/KF-W0.md`
§Sequencing (*"the COHESION §2 Glass-8 atomic cut is a value.js act; this repo's producer pin is
decided at G1/ESC-1 (resp. §B-12's 7.0.0 pin) and creates no edge into X-W0.j"*) — **is owed at
those two files and is NOT written here**: a reciprocity a seat authors on both ends is not a
reciprocity. Until they land, the non-edge is **declared from this end only** and is carried as
such.

**Rider (S-11's fact, so this bullet is not re-scoped onto a stale option set).** The producer has
since cut **9.0.0** (INBOX **I-30**, rowed this boundary). X-W0.j's four-condition verdict is
widened by its own dated addendum to enumerate **8.0.0 AND 9.0.0** as candidate targets; the
atomic-cut law above governs whichever target the census returns, and electing neither is a
complete result.

## §0h ADDENDUM 2026-08-30 — TRANCHE DEVELOPMENT COMPLETE (UNION-CLEAN)

**The X-whole union pass is closed UNION-CLEAN** (check-2 register at `union/CHECK-2/`; repair r1
banked `ba6dcdb3`): the 24-seam register walked with all 9 convictions cured as dated addenda-beside
(zero-line-delta on both sub-tranche sides — no sibling coordinate displaced), **G-F MET WITH
RESIDUALS** (the NO-WAVE-OWNER register question ANSWERED; register of record = the fold/canonical
layers, named in `union/G-F-ADJUDICATION.md`), and **`EXECUTION-RUNBOOK.md`** standing (39 waves ·
27 gates · four tracks, heads = the computed in-degree-zero set {X-W0 · KF.W0+KF.W1 · F.W0 ·
X.P.W0}; twice-authored Fable∥Opus, agglomerated, hostile-checked twice). Carried tail: 6
MINOR-with-mitigation + 2 INFO in the check-2 register — none blocking, each with its named cure.

**Every development obligation of the megatranche is now discharged**: registry 227/227 adjudicated ·
22 wave specs authored · four spec layers CONFORMANT (X·V §0c pass 4 · X·KF §0e pass 8 · X·F §0f
pass 15 · X·P pass 10) · seams walked · G-F stamped · the runbook in hand · mail terminal (I-30
rowed; O-21 = the next mint). Status is **planned** everywhere; no product source was opened at any
point. **The owner's begin-word against `EXECUTION-RUNBOOK.md` is the sole remaining key.** Owner
decision points standing: the L1/L5 adoption leg (§0g.1, G-9's A/B/C) · the glass 8-vs-9 election at
X-W0.j (I-30; tag-pinned 9.0.0, registry walled) · ESC-1/G1 at F.W1.

## §0i ADDENDUM 2026-09-17 — THE THREE STANDING DECISION POINTS, RATIFIED UNDER DELEGATION

**Provenance.** The owner's instruction of 2026-09-17, verbatim: *"Ratify all that you may with your
intelligence."* The orchestrator rules the three decision points §0h left standing, each with the
receipts it was ruled on, measured this date. **This addendum is not the begin-word.** No wave opens,
no gate runs, no product source is opened; status stays `planned` in all four sub-tranches. E-3:
addendum-beside; §0g.1's dispositions table and the runbook's §3.2 keep their bytes.

**Frontier receipts (2026-09-17):** value.js, keyframes.js, fourier-analysis, parse-that, glass-ui —
zero commits since 2026-08-30 in all five. `npm view @mkbabb/glass-ui version` → **8.0.0**
(`dist-tags.latest` 8.0.0; 9.0.0 absent from the registry's version list). glass `v9.0.0` =
`d4f7b24f` (2026-08-29), `v8.0.0` = `17a11bc5` (2026-08-09). Exports delta 8.0.0→9.0.0: `./canvas`
and `./search` removed, nothing added.

### §0i.1 · S-4 — the L1/L5 parser-adoption leg: **DISPOSITION C** (BLOCKED-ON, with A named as the re-trigger's payload)

**Ruled: C.** The row closes `BLOCKED-ON` + re-trigger, in G-9's own idiom, and RC-P stays FALSE
meanwhile. **Exact condition:** the parser proof gate (`docs/tranches/V/apotheosis/parser-proof/
GATE-VERDICT.md`, COMPOSITE 🔴 RED of distance, 2026-07-20 — R1 = the live `parseCssColor("oklch()")`
crash) reads GREEN via mini-tranche V·π Phase A closing. **Re-trigger command:** X.P.W4's RC-P
evaluator returning TRUE at a dated run. **What fires then: disposition A** — the owner authorizes a
successor X·V wave consuming `SEAM-CONTRACT.md` at `src/css/**`; its authoring seat and boundary
are named at that sitting, not here. **Why not A now:** a thirteenth X wave consuming a parser whose
proof gate is RED would mint a wave against a contract with no green producer — the exact
"repair-arms-a-defect" shape the registry forbids. **Why not B:** amending G31 to admit adoption
inside X binds the leg to X-W9's 4.1 cut and X-W11's release; that couples value.js's release
train to parse-that's readiness, and value.js is the paramount path (owner directive 2026-08-28).
C keeps the leg honest, unhomed-with-a-fuse, and leaves value.js's cut unencumbered. OP-4's bar
holds: **no wave is authored by this ruling**; X·P still does not get to author an X·V wave.

### §0i.2 · X-W0.j — the glass election for value.js: **8.0.0**, registry-pinned (`v8.0.0` @ `17a11bc5`)

**Ruled: 8.0.0.** Receipts: (1) PIN-LAW's registry half is satisfiable only at 8.0.0 — the registry
holds 8.0.0 and does not hold 9.0.0; (2) §EXTERNAL X-EXT-1..6 were minted against the 8.0.0
letter (I-28) and their receiving cells (X-W7 · X-W8 · X-W6 · X-W4.g · X-W1 · X-W0.j) are sized for it;
(3) **9.0.0 removes `./search` whole, and value.js consumes it at four live sites** —
`demo/palettes/BrowsePane.vue:195` · `PalettesPane.vue:149` · `admin/AdminPane.vue:87` ·
`browser/slug/PaletteSlugBar.vue:132` (`import { SearchBar } from "@mkbabb/glass-ui/search"`) —
an unbudgeted break no X·V wave carries a cure for (X-EXT-1 budgets the 8.0.0 `SearchBar` DELETE
at X-W7, not the export's removal); (4) the runbook's own law at §3.2 — *"an owner electing 9.0.0
knows it elects a tag."* Nothing here elects a tag. **9.0.0 is recorded as the successor fact** and
re-enters X-W0.j's enumeration as a candidate the moment `npm view @mkbabb/glass-ui version`
returns 9.0.0 (that is the re-trigger; the census re-runs, nothing is pre-decided). **The X-W0.j
mechanism is unchanged**: it still runs CC-003's four conditions read-only and returns a dated
verdict; this ruling fixes the *target* those conditions are read against, not the verdict.

### §0i.3 · ESC-1 / G1 at F.W1 — the glass election for fourier: **8.0.0**, `v8.0.0` @ `17a11bc5`

**Ruled: 8.0.0, same tag and hash as §0i.2.** Receipts: (1) the F.W1 corpus is sized for the 4→8
hop at its own bytes — *"The hop is 4→8, not 4→7 — every producer `file:line` re-keys per G1"*
(F-W1 §2, dock-member row), and three break/cure families exist **only at 8.0.0** (FR-TT-9's dock
collapse cure; K-8/SR-1's `SliderVariant` re-book; M-2's `^0.11.2` floor); adopting 7.0.0 would
stage a second uplift the budget never priced; (2) registry-pinned, so PIN-LAW's *"pins to the
PUBLISHED artifact"* is discharged as written, without invoking the tag clause; (3) constellation
cohesion — value.js and fourier now adopt the same producer major at the same hash, so the
`fr-*` corpus's 66 records re-resolve their `file:line` at ONE audited hash (`17a11bc5`), never at
`d4f7b24f`, whose bytes no seat has audited; (4) 9.0.0's `./canvas` removal is unpriced in every
`fr-*` record. **G1's cell is filled by this ruling: TAG `v8.0.0` · ADOPTED COMMIT HASH `17a11bc5`.**
BASELINE LAW stands (the adopted tag decides regardless of any working tree's self-report).
**F.W0's FR-NP-32 (≡ fr-PaperSidebar M1) BLOCKER is untouched** — measured at the installed 4.0.0
bytes, cured only by the producer's emitter fix (A-1 ACCEPTED at I-30), never by this election.

### §0i.4 · the union check-2 carried tail — **SWEPT IN THE FIRST MAIL ROUND**, not a development round

The 6 MINOR-mitigated + 2 INFO at `union/CHECK-2/` are receipt/citation hygiene in the union
instruments (a blank-line anchor, a two-of-four paste, an emphasis minted into a quotation, a
self-count arm gone stale, an unlanded fifth S-11 site at F-W0, an incomplete AuroraPane
parenthetical). **Ruled:** they ride as the first work item of the §3.3 mail round (I-30
obligations → O-21), executed under the write-then-measure and self-count laws, and are NOT a
reason to reopen tranche development. §0h's COMPLETE stands.

**What this addendum does not do.** It does not open execution. The begin-word remains the
owner's, spoken against `EXECUTION-RUNBOOK.md`; when it comes, the five root waves open with
these three cells already filled.

### §0i.5 · ERRATUM to §0i.2 receipt (3), and the producer-state reading — 2026-09-17, same sitting

**Erratum (E-3: receipt (3) stands as written; this row corrects it).** The four `SearchBar` import
sites are **already budgeted for removal**: §EXTERNAL **X-EXT-1** (glass 8.0.0 deleted `SearchBar`
with the same four `demo/palettes` edges) lands their removal inside the X-W4.g atomic cut. So
9.0.0's `./search` export removal is **not an additional break** once the cut lands; receipt (3)
overstated it. **The ruling does not move**: receipts (1) registry-pinned vs tag-only, (2) the six
§EXTERNAL rows sized at 8.0.0, and (4) the audited hash (`17a11bc5`; no seat has audited `d4f7b24f`'s
bytes) carry it alone. value.js imports nothing from `./canvas` (measured: zero sites).

**Producer state, read at the bytes (2026-09-17).** glass BK is **still executing** (carried-OPEN
register; the A-2..A-14 disposition wave open). 9.0.0 is cut and pushed; the registry PUT is walled by
**npm's account-wide token restriction** — the cure is an owner act (re-mint the token / `npm login`,
then `npm publish` off the `v9.0.0` tag tree; BK's own cursor names it), not glass work. **Measured
against the 8.0.0 tarball on the registry**: `exports["./styles"]` → `dist/styles/index.css` is
**1,514 bytes** (the corpus's known stub figure), one string-interior `@source "../*.js"`, and it
**parses under postcss** — the FR-NP-32 comment-corruption shape is absent at 8.0.0. Whether a
1,514-byte styles entry is the intended shipped surface is exactly F.W0 **G-4**'s question and is
measured there, not ruled here.

## §0j ADDENDUM 2026-09-17 — THE BEGIN-WORD, AND THE OPENING SITTING RULED UNDER DELEGATION

**The begin-word, verbatim (the owner, 2026-09-17):** *"Begin and continue the current tranche. You must
read any and all appurtenant documentation and adhere exactly to the plan, in particular regarding agent
orchestration and deep parallelization. Do not edit items directly unless befitting and fully orchestrate
the processes as team lead. Continue through this indefatigably: do not relinquish control back to me
until you have completed the plan IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt
approaches. Execute with maximal parallelism and workflow usage. You are authorized to publish, push, and
pull whatever items you need--and deploy anything and everything via Cloudflare, AWS's CLI, etc. Use your
core model for orchestration, design, synthesis, but defer to Opus or Sonnet for workflow fanout. Ensure
total robustness with non-spammy or duplicative crons; suffuse durability to survive both crashes and
system walls insofar as rate-limiting or session limits."*

**What it opens.** Execution of the 39 authored waves per `EXECUTION-RUNBOOK.md` §1, all four tracks at
the begin-word (§1.0), under the four-workflow cap (§5.1). The on-disk state machine is
`execution/LEDGER.md`; per-wave records live at `execution/<track>/<wave>.md`. **What it also grants,
read at its words:** (i) *publish, push, pull* authority across the constellation — which discharges
**OP-1** (kf write authority) and X·P's separate **release word** (§0j.E below), each cited by this
quotation; (ii) ONE supervisor cron (a stall guard; E13's no-cron order of 2026-07-17 is superseded only
to that extent). **What it does not change:** `scripts/dev/dev.sh` NEVER touched; pathspec commits; E-3;
sibling trees READ-ONLY until their own wave opens; KF.W3 gate-keyed, never scheduled; F.W9 never opens
beside F.W0.

**Pre-acts banked before this sitting** (runbook §3.3 + R.2): P-1 mail round — four paths swept, zero
unrowed, I-30 remains the tail; the union check-2 tail cured as dated addenda (`642a0098`). P-2 — the 27
born-RED first gates run read-only and banked (`execution/gates/BASELINE-2026-09-17-{value-parse,kf-fourier}.md`,
`fd40535c` · `0bed8379`): **22 RED-AS-EXPECTED · 2 GREEN-BEFORE-CURE (gate 10 as the runbook itself
declares; gate 27, a standing invariant that holds) · 2 DIVERGENT · 1 UNRUNNABLE (gate 21 is an act,
not a command).** The two divergences are facts for the waves, not rulings: **gate 24** — the
`~/Documents/Codex` TCC wall is GONE (PRESENT/readable 2026-09-17; OP-2 GRANTED), so X.P.W0 G-2 records
the three-state as PRESENT with date and the v12 target VERIFIED ABSENT, builder + residue MATCH;
**gate 25** — every git identity of the eighteen roots holds, but `git worktree list` returns 7, not 8
(the prunable `m2-baseline` registry record is gone) — X.P.W0 G-3 states the table at today's bytes.
The dossier of record for this sitting is `execution/SITTING-DOSSIER-2026-09-17.md` (`a3ae9a4f`; 28
items, every option quoted at the spec bytes with a read-only measurement beside it).

**Rulings.** Each carries its rationale; the spec's own honest default is followed wherever one is
stated. Where the dossier measured a predicate, the ruling rests on that measurement.

### §0j.A · X-W0.g — the seven owner rows (CC-014 / DR-29), each LANDED-AS-RULED or RETIRED

| row | ruling | rationale |
|---|---|---|
| **DR-19** vnext `proof:` sites | **RETIRE** + the grep-checkable structural ban in canon (no `scripts/**/proof-*.mjs`; invariants live in types/tsc/eslint/tests) | the ledger's verb; the owner's 2026-06-02 deletion of the idiom (*"overfit junk"*); measured 69 sites in `docs/tranches/V/vnext/`, 0 `proof-*.mjs` in the library band — clean both ways |
| **DR-20** the PARK set | **RETIRE** | `Color.try` → 0 sites; the trigger metric is zero in both directions; the v4 Result surface supersedes |
| **DR-24** `scripts/dev/dev.sh` | **RETIRED-BY-ASSIGNMENT with the NEVER-touch posture made PERMANENT for tranche X**: neither commit nor restore is executed by any seat; the row is owner-held outside every X denominator; receipts paste it and cite this ruling; X-W11's close correspondence explains it by this id | the owner's standing order (never touch) is explicit and repeated; a seat electing either branch would override it |
| **DR-31** the NCSU alias | **ACCEPT the permanent 301 in canon** | measured live: `301 https://color.babb.dev/`; the spec names this disposition as executable without the probe |
| **DR-14** `siblingFsAllowTransient` | **DELETE**, routed to X-W1's config carve (two sites, one file: `vite.config.ts`) | a transient carve-out is a compat shim by another name (no-backwards-compat law); the name may not survive X either way |
| **DR-16** HG6 taste certification | **RETIRE** (option a) — tombstone at X-W0.f; **no** fresh bracket set at X-W10 | (b) manufactures a second unsized sitting — the FM-21 scheduling-failure shape HG-13 exists to prevent |
| **U-F12** Pole A/B | **POLE B** | C3-compliant and met as-built (C 0.0216); Pole A needs a C3-ledger amendment outside every X bound and re-opens dark-accent work X-W4 was not sized for; U-F26's dock-icon 2.26:1 residual discharges against B |

### §0j.B · the FORMATION-BOUNDARY packets (§4.3) and the G-F residuals (§4.4)

**XV-FB, per packet** — the union was sealed UNION-CLEAN at `31dcf279`; electing cargo into a sealed wave
re-opens it, so every packet is dispositioned as a **register row, never silence**: (1) PRE-X
MT-REGISTER → **BOOK TERMINAL** at the G-F register (its live obligations already ride SS-8's
zero-residue-cohort sweep, §4.1); (2) BOUNDARY-SCOPE AB-4/AB-5 → **BOOK TERMINAL** (X-W6's fold books
them; the disposition is the boundary's, i.e. this row); (3) AUTH-SESSION SUBSTRATE AF-50 → **BOOK
TERMINAL** (X-W3-FOLD F-4's NO-WAVE-OWNER banking stands as the record); (4) MIGRATE-DIALOG IDENTITY-FLOW
→ **DECLINE-WITH-REASON**: no wave in X owns an identity-flow migration and no probe resolves it; it stays
behind the OWNER-DECISION gate as a named register row with that gate as its re-trigger; (5) W-HYGIENE's
boundary limb → **BOOK TERMINAL, explicitly NOT ADOPTED** (*"silence is not adoption"* is honoured by
saying the word: the 8 records' routing stays on the register). X-W0.g writes the five rows at
`X-W0-FOLD.md`'s §8 idiom.

**GF-R1** — **BOOK slate entry 15** at `X-W0-FOLD.md` §8, all seven ⟨record · id⟩ id-for-id, and correct
`×5`→`×7` **in the addendum, never in §4's bytes** (the recommended half). **Claimant: X-W3**, by a dated
E-3 addendum widening its bounds to `demo/platform/transport/**` (4 files) as one named unit carrying the
seven rows with AP-17 (the unbounded probe burst against a *"ONE probe"* promise) as its born-RED gate.
Rationale: the transport client is the API contract's client leg — probe cadence is a contract property
under X-W3's route-spec-first law (a.4) — and X-W3 runs at stage 3 of Track A, so a CONFIRMED MAJOR is
cured well before X-W11 stamps. The `ErrorBoundary.vue` contention at W0.22 stays X-W0's.

**GF-R3** — **RATIFY §1**: the fold + canonical layers ARE the register of record (the adjudicator's own
recommendation; zero file motion; X-W11's 117-row walk reads what it already reads). **R-2**'s two
`≡`-pointers (⟨AdminFlaggedPanel · AF-12⟩ ≡ AdminListItem D-5; ⟨ColorNutritionLabel · R6⟩) are written
as two lines at X-W0-FOLD.md §8 by X-W0.g.

### §0j.C · X·KF

**KF-OP1 / §B-12 — the reset is PERFORMED, as the owner's delegated hand, in a reversible form.** The
begin-word's *"pull whatever items you need"* is the owner's hand for this act, cited by quotation.
KF.W0's OP-1 seat performs it **alone and first**, in `/Users/mkbabb/Programming/keyframes.js`, in this
exact order and no other: (1) `git branch kf-sacred-snapshot-2026-09-17` at HEAD `8281638c` — the
1-ahead commit is preserved by ref; (2) `git checkout kf-sacred-snapshot-2026-09-17 && git add -u && git
commit -m "snapshot(kf): the sacred checkout's 252 tracked modifications as found 2026-09-17 (OWNER'S
HAND record; KF.W0 §B-12)"` — the tracked dirty rows are preserved by commit; **untracked files are not
added** and are therefore left in place by the reset exactly as the spec requires (*"untracked V docs
unharmed"*); (3) `git checkout master && git fetch origin && git reset --hard origin/master` — the
spec's own command, direction lock **disk←master** honoured; the four OWNER'S-HAND bounds rows
(`package.json`, `package-lock.json`, the two EE-02 files) are reconciled by the reset itself. The
G-0.1 record dispositions every one of the 252/325/124 rows as **kept (untracked) / committed (to the
snapshot branch) / discarded (superseded by origin/master)** with the snapshot sha as the receipt.
**Forbidden forms stay forbidden**: no partial `git checkout origin/master -- src/`, no stash, no
`master←disk`. The schism §B-12 exists to close was *unauthorized* value.js writes into the sacred
checkout; a dated, quoted, reversible act under the owner's explicit grant is its opposite.

**KF-WRITE — write authority NAMED.** Two substrates, one hand: (a) **KF.W1's delivery** (O-21 and the
O-8/O-11 amendment-addendum) lands in **`keyframes-v-exec`** (HEAD `81a56990` = the frontier; the
exec-clone path the spec built so the mail cure never queues behind §B-12), committed and pushed to
kf `origin/master`; (b) **after §B-12, the sacred checkout on `master` (= `origin/master`) is the
execution substrate for KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 · W10**, every wave pushing `origin HEAD`
at close; `keyframes-v-exec` fast-forwards to it. **Under whose hand:** the value.js orchestrator
under the owner's 2026-09-17 grant (quoted above), every kf commit carrying the session trailer. No
new kf tranche letter is minted — the exec clone and the settled checkout are one frontier.

**KF-OGKF1** — the Codex "Keyframes v8" B-lineage is **STALE-BY-SUBSTRATE and does not continue**; it
is citable only as *"345 exact / 12 partial / 57 unresolved @ 8281638c"*, never as HEAD coverage; the
five conditional TCC re-reads never open; KF.W0's re-count adopts 185-at-HEAD (X-2). Rationale: the
lineage's pin is exactly the tree §0 already ruled non-authoritative, measured live.

**KF-SS3 `smooth-step-3`** — **NOT repointed at `bezierPresets`; its class is preserved.** A smoothstep
polynomial is not a cubic bézier; flipping its class to make a name resolve is a behaviour change dressed
as hygiene, which is the spec's own warning. The easing-name trap (KF-CB-18/24/29 + K1) is cured by
K1's sampled value-identity on the 33-point grid — the mechanism, not a relabel.

**KF-W5R4 — the four library rulings (arm B's ruling commits precede its fixes):** (1) **`fromString`
REPLACES** — a second `fromString` on a populated instance yields the parsed set alone (idempotent; the
B-9 append is a MAJOR defect, not a documented behaviour); G-FROMSTRING asserts it. (2) **`delay` is
PER-PLAY** — one phase offset at play start, never re-slept per iteration (B-8's 27%/cycle unbounded
drift against the compositor clock is the defect; WAAPI semantics agree); G-DELAY asserts it.
(3) **PRM default INVERTED to `respectReducedMotion: true` engine-wide** — one honest default in one
engine (B-6/B-7: the honest default *"exists in-house and is used nowhere"*); PRM-honesty is
constellation law. (4) **`singleTarget` gains a SUPPORTED opt-out** (a constructor/option-level
declaration the recompute honours), retiring the raw poke; one ruling, one commit, in `.c`.

**KF-ODV3 / KF-ODV5 / KF-AT** — **KF.W9's capture band is AUTHORIZED to run** (PACKET-FIRST binding;
OP-3's Safari reachability is measured at run, never assumed); the transport-home ruling is taken by the
orchestrator **from the OD-V3 packet** at KF.W10 `.g`'s sitting under this delegation, and if the packet
does not exist by then KF.W10 closes `complete_with_misses` on that row citing its exact precondition.
**OD-V5 stays DEFERRED** pending glass's dock mark (standing edict: glass rows and OD-V5 route to SS-6,
never demo-side hacks); the `complete_with_misses` shape is authorized in advance. **AT runs inside
KF.W9 `.d`'s arm** (the proposed resolution); no new lane is minted.

### §0j.D · X·F

**OG-F1** — **FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE** (the lane's own evidence; measurements
live-reproduced; R6 `NO_SUCCESSOR`). Consequences as the spec states them: G-1's minute becomes a
disclosure + the LAND set; G-11 narrows to drift-correction; G-14's R-coordinate rows become records;
GAB-13 discharges to a disclosure line.

**OG-F2 / OG-V2** — **CODEX-ERA-SPECIFIC.** The pre-write root-absence-receipt requirement and the
Codex-authored prohibitions died with M-15's abrogation (2026-07-27); the *finding* under OG-F2 (the
absence, TRUE) stays adopted; the `FOURIER-R*` value-side files are records. G-F10-8 closes on the
charter line.

**G-10** — **F8-REACH-01 (`InfoCard.vue`) and F8-REACH-02 (`CanvasOverlayButton.vue`): DELETE, in one
breath**, with FR-COB-17's 8-site `:aria-pressed` lift in the **same commit** using **L's list (seven
sites), not C's**, line numbers re-resolved via G-11 first; the STEP-2i divergence minuted. Rationale:
five DELETE orders already stood unexecuted; both files are unreachable at the frontier; the
constellation's subtraction law.

**G-15 — the four contradictions:** (a) the vue-tsc RED → **LAND**: the settled tree is the committed
substrate; the RED is the uplift's, its cure owned by F.W1/W2 (the pre-ruled green form; the forbidden
exit-criterion shape avoided). (b) the root-size fork → **`html{font-size:1.125rem}` under 768px GOES**:
the 12.5% inflation compounds with `--ui-scale` (67.5px against the token author's 60px); F.W1's
token-parity re-tune absorbs it, F.W4 executes per component. (c) FM-19 → **FROZEN-FOREVER with a
golden-file diff** (no regeneration pipeline exists; building one is unsized work). (d) the emission
contradiction → **ruled UNDECIDABLE on today's evidence**: the written ruling that the two cells are
mutually exclusive, plus its falsifier — the spec's honest-RED relief, by name.

**F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1)** — **NO TRIE**; whole-snapshot duplication is the recorded shipped
behaviour (the honest default; `atomdiff.py:12-14` is the guardrail; zero material on either tree). F.W7
unit `b` never opens, `design/R4-variant-storage.md` is never created, G-F7-5 closes vacuously; unit `a`'s
census runs.

**F-PRODRET (R3 ≡ D3 ≡ G11, the admission gate)** — **PRODUCER**, as a **port** of value.js's shipped
verb (`POST /:slug/flag`) under the SS-4 contract, homed at **F.W8** (the CRUD union prototype) with F.W5
writing the clause; FR-AFP grades re-derive at the populated surface. Rationale: D-15 made the
value↔fourier API isomorphism first-class; retiring the admin half would freeze the two APIs
non-isomorphic where the port is the cheapest act in the union.

**F-SS4REST** — **R1 (TA-4)**: **RE-SCOPE value.js out of the diff clause** (a one-sided §6 verdict,
stated explicitly) — `atomdiff.ts` is wholly excised from value.js and restoring it is value-side
authoring that would couple value.js's release train to the fourier contract (the §0i.1 logic).
**R4**: **REMOVE the affordance** (no dead affordance under `aria-pressed`). **R5**: **STOP MINTING**
the off-state `[]`; the contract does not admit it (no silent rewrite). **R6**: **KEEP** the hard-delete
arm; copy made truthful about irreversibility. **R7**: **CODEGEN** — twins derived from one source
(inv-16/inv-26 restated; structural invariants over prose). **R8**: **REMIX + BORN-PRIVATE** (value.js's
shipped verb and its explicit publish act), the F.W5 seat verifying non-contradiction with ruling D9 at
the record before authoring. **R9**: **DELETE** the dead session subsystem (zero external call sites).

### §0j.E · X·P

**OP-1 — both owner words are given, dated 2026-09-17:** the begin-word (quoted above) opens the X·P
lane; the release word is *"You are authorized to publish, push, and pull whatever items you need"*, in
the same message. X.P.W4's release limb still materializes **only** after `RELEASE-PACKET.md` exists and
`RC-P(V)` is evaluated by running its six commands — the word licenses the limb, it does not bypass the
gates or the §9 STOP conditions.

**OC-1 (OP-3) — ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING**, with the
LIVE regex numbers held as the *recorded ceiling* the GATE-VERDICT proposal names — never a floor, never a
veto, never an invented standard. RC-P conjunct 5 evaluates TRUE on this word once the three-leg table is
recorded at X.P.W3. Rationale: the spec forbids an unruled bar from becoming a permanent veto; value.js
being operational is the paramount path; a −21% sheet deficit is evidence for the record, not a lock.

### §0j.F · BRANCH-TOPOLOGY — value.js `tranche-u` vs `origin/master`

Three words: (1) **The two `ci(release)` hardening commits (`e2652f1c` · `44ddaff7`) RIDE INTO
`tranche-u` before X-W9's cut**, cherry-picked verbatim (1 file, `release.yml`; strictly-stronger
pack-time identity checks). (2) **`7334c793`'s `src/v4` relocation does NOT bind X-W9; X-W9's
public-surface law supersedes it — `tranche-u` is the tree of record.** At X-W11's merge-to-master,
every both-changed path resolves to `tranche-u`'s bytes (the eight tests and the three `scripts/ci`
probes `tranche-u` deleted stay deleted; X-W1's `boot-smoke.mjs` is the surviving add), except
`release.yml`, already reconciled by word (1); local `master` (140 behind) is fast-forwarded to
`origin/master` before the merge. Option D (rebase) is refused: it would re-hash every SHA-pinned
authority in §0h/§0i, the runbook and the ledger. (3) **`.github/workflows/release.yml` joins X-W1's
bounds** by dated E-3 addendum (X-W1 already modifies `ci.yml` and `deploy-pages.yml`; the cherry-pick is
X-W1's first commit); X-W11's Do-NOT-touch stands.

**What this addendum does not do.** It does not stamp any verb. Every ruling above is consumed by the
wave that names it, at its own opening, cited by id; a wave that finds a ruling's measured predicate
false at its own bytes returns to this sitting rather than presuming.

## §0k ADDENDUM 2026-09-17 — X·F: THE FOURIER MAIL-LEDGER SURFACE IS LIVE, AND ITS CROSS-EDGE IS DECLARED FROM THIS END

**APPEND-ONLY (E-3). Nothing above this line is edited.** Authored by **X.F.W0 unit *e***
(`claude-opus-5[1m]`, 2026-09-17) under `fourier/waves/F-W0.md` §2a
(*"`value.js/docs/tranches/X/COHESION.md` — **append-only addendum** (E-3) — §1 register row for the
fourier mail-ledger surface + the §2 cross-edge, declared from this end"*). It **stamps no verb**,
**re-opens no ruling**, and **changes no §0j disposition**; it records two facts the register and the
graph did not yet carry.

### §0k.1 · §1a register row — the fourier **Mail-ledger surface** is no longer a wave *item*; it EXISTS

**§1a's parity map carries, for the `Mail-ledger surface` treatment, the fourier cell
`F.W0 wave item`.** That cell was correct when written and is **superseded as of 2026-09-17**: the
item has landed. The row reads, at today's bytes:

| treatment | fourier-analysis — **as of 2026-09-17** |
|---|---|
| **Mail-ledger surface** | **LIVE** — `fourier-analysis/docs/tranches/F/coordination/INBOX.md`, created at **X.F.W0 unit *b*** (`8bc7736`) together with a root `fourier-analysis/CLAUDE.md`. **G-3 GREEN.** |

**What makes it a surface rather than a file**, stated because an empty ledger over unlogged letters
is unread mail on day one: the **three extant 2026-05-29 letters** (`F-OPERATOR-WINDOW.md` ·
`F-T-N1-status-field-drop.md` · `F-VHOST-CORRECTNESS.md`) **and** the O-14 inbound letter were
**TRIAGED INTO the ledger at creation**, each with a status and a disposition, **before** any new
letter was logged — the triage section precedes both send sections structurally. The letters
themselves are **READ-ONLY**: the ledger records their state, it does not rewrite them. **Two packets
were assembled and logged SENT with dates**: **P-1** (nine entries, 0–8, `FR-NP-32` ≡
`fr-PaperSidebar M1` first — cite both, never substitute, R4-9.8/S-23) and **P-6**.

**The parity map's sibling cells are unchanged**: value.js `INBOX (E13, live)` · keyframes.js
`KF.W1 wave item (+ I-26 cure)` · parse-that `O-15 thread at their docs root`. **With this row, three
of the four constellation repos now hold a live mail surface**, and the E13 law
(*"no wave closes with UNREAD mail in scope"*) is enforceable in the fourier tree for the first time.

**The standing orders are unchanged by this row**: **NO CRONS** (owner, 2026-07-17; §0j's single
supervisor-cron grant is a stall guard and nothing else) — E13 sweeps are session-open acts. **Every
component/glass-ui-level change relays to the active glass-ui BH inbox** (owner edict 2026-07-12), and
**producer rows ride the relay and NEVER become frontend hacks** (FR-COB-8 S-4); `glass-ui` is
**READ-ONLY, ALWAYS**.

### §0k.2 · §2 cross-edge — **F.W0 → F.W7**, declared from the F.W0 end

§2's graph carries the edges the sub-tranches cross on. One edge X·F depends on **hard** was declared
from one end only, and §2's own closing law is *"Cross-repo edges are declared FROM BOTH ENDS in the
spec files (the X·V W4-D2 lesson, now law)."* **This is the F.W0 half.**

> **F.W7 DEPENDS ON F.W0, HARD. F.W0 DEPENDS ON NOTHING OF F.W7's.**
>
> **What F.W7 consumes**: F.W0's published re-grounding — **§4 G-11's corrected ANCHOR table** and
> **§4 G-12's corrected-DENOMINATOR table**, both landed 2026-09-17 in
> `fourier-analysis/docs/tranches/F/SUBSTRATE-LEDGER.md` **§2.1** and **§2.2**. **F.W7 QUOTES them; it
> never re-performs the re-resolution as its own act**, and a divergence from them is a defect against
> G-11, not a rival measurement.
>
> **The halt condition, acknowledged from this end**: F-W7's §6 gate **G-F7-7** carries
> *"If F.W0 fails, the wave HALTS."* **F.W0 acknowledges it: an honest-RED G-11 close HALTS F.W7; it
> does not license F.W7 to proceed on stale bytes.** **G-11 and G-12 both closed GREEN on 2026-09-17**
> (ledger §2.9), so **the halt condition is NOT in force and F.W7's substrate predecessor is
> satisfied.**
>
> **What crosses back: NOTHING.** F.W0 books **no** F.W7 registry row, mints none into F.W7's empty
> column, and takes **no position on the trie question** — which is owner-owed and, per §0j.D's
> **F-TRIE** ruling, already answered: **NO TRIE** (F.W7 unit *b* never opens;
> `design/R4-variant-storage.md` is never created; G-F7-5 closes vacuously; unit *a*'s census runs).
> **F.W7's routing census is a measured ∅ and that ∅ is a finding, not a gap** — no F.W0 act adds a
> row to it.
>
> **Sequencing**: F.W7 opens after F.W0's substrate pre-gates, alongside F.W5's clause predecessors.
> **F.W0 imposes no further order and owes F.W7 no artefact beyond the two tables and this
> declaration.**

**Two facts that travel with the edge, so a consuming seat does not re-derive them:**

1. **The pin of record for X·F is a COMMIT, not a version string.** `v8.0.0^{commit}` =
   **`17a11bc5`** — the ESC-1 election at §0i.3, taken as ruled. The producer HEAD drifted **twice
   more inside X.F.W0's own sitting** (`e91b7b7e` → `887a0db9`, both banked as dated readings and
   neither as a live fact), which is exactly why the cell is tag-resolved. **The standing rule X·F
   exports: producer-side evidence carries the producer COMMIT HASH, never the version string.**
2. **Three X·F gates close honest-RED and say so** — **G-4** (the adopted glass-ui 4.0.0
   `dist/styles/index.css` does not parse: 17 `/*` against 8 `*/`, measured again 2026-09-17),
   **G-5** (gated behind G-4, plus `MISS-A7`'s independent vite-8 break) and **G-15(d)** (the emission
   contradiction, ruled UNDECIDABLE with its falsifier written). **G-4 is PRODUCER-OWNED**; the O-20
   §A-1 ask is **ANSWERED** at **I-30** and, per SEAMS **S-11/S-23**, that *"discharges the ask, not
   the pre-gate"* — **the corruption is in the ADOPTED 4.0.0 bytes, which no later tag alters.**
   **A consumer-side patch would be a GATE FAILURE, not a gate pass**, and none was made.

**What this addendum does not do.** It stamps no verb, adds no wave, moves no ruling, and creates no
obligation on any sub-tranche but the one it names. §1a's superseded cell and §2's graph are **left
exactly as their seats wrote them**; this block is the dated record beside them.

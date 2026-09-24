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
| **X·F** | fourier-analysis — frontend + CRUD union | `docs/tranches/X/fourier/waves/` | **SPECIFIED** 2026-08-30 (fifteen-pass L-20 loop, §0f; canonical FROZEN `f44362757458`) · **EXECUTED 2026-09-20** — all **eleven** waves F.W0–F.W10 CLOSED under the begin-word; **the F-side of §3.1–§3.4 STAMPED at the F.W10 close** (`execution/C/F-W10.md` `g`, §5's 2026-09-20 boundary row). **§3.5's declared-Fable final pass is OWED** (unit `X.F.W10.h`), so the sub-tranche is **not** ACCEPTED and **VERIFIED stays NO** |
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
| SS-5 | **X·P parser lane** (pause verify · fresh root · dual-target JS+Wasm prototype waves) | PARSER-CSS-PAUSE-HANDOFF-2026-08-02 §8/§9 · GATE-VERDICT · parser-band apotheosis · O-15 · M-22 ¶3/¶4 · PLAW-BIND routing | full X·P wave specs (W0..W4, 5 waves; W2 twice-authored) | W-architecture wave twice-authored; rest Opus; Fable L-20 | **VERIFIED 2026-09-20** (R-A stamp by `X.P.W4.s`, one act over W0..W4, G-1..G-9 GREEN at its own clock — `execution/D/X-P-W4S.md`; **not ACCEPTED**, L-18 quartets owed; `RC-P(4.0.0)` FALSE, honestly) |
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
| **DRAINED 2026-09-18** | all **14** source rows above carry a terminal word at **§4.1** — the X.KF.W10 `.b` NO-WAVE-OWNER set-difference (G-2); the intake bytes above are **unchanged** (E-3) | **§4.1**, below |
| **F.W3 S-8 EMISSION 2026-09-19** (X.F.W3.f, `claude-fable-5-1`) — the seven census-methodology rows F.W3 **EMITS and does not own** (spec `F-W3.md` §4 S-8 `:438`); **post-drain, not among §4.1's 14**; each carries the terminal word already earned where one exists, per §3.3 | 7 rows below | `docs/tranches/X/fourier/F-W3-DO-NOT-EXECUTE.md` · `execution/C/F-W3.md` §X.F.W3.f |
| fr-EquationModeToggle **FR-EMT-21** | the §4 shadow aggregate is NOT incrementable — `lane-frontend.md:446`'s headline total disagrees with its own parenthetical (a with-lib and a without-lib total, three figures in one sentence, no published member scope — the literals are g17's forbidden tokens and are not repeated here); three uncoordinated '10' increments; six 🟡 CANDIDATE members excluded. Re-derived BY ENUMERATION under X-9's member-scope law BEFORE any F.W3 budget; **F.W3 quotes, F.W0 publishes** (g17) | `registry/adjudicated/fr-EquationModeToggle.md`; home = F.W0 **G-12** denominator table in fourier `docs/tranches/F/SUBSTRATE-LEDGER.md` — **measured ABSENT 2026-09-19** (⟨cmd⟩ `grep -ic shadow SUBSTRATE-LEDGER.md` → **0**, `.d` and `.f`); g17 honest-RED, no F.W3 budget cell authored. **Terminal home: the next formation boundary's ledger** |
| fr-CoefficientsSpectrum **i-5(a)** | callsite-keyed budgets understate the shadow surface ~20× | same record; rides the G-12 table beside FR-EMT-21 — **same terminal home** |
| fr-CoefficientsPanel **FR-CP-44** | `lane-frontend.md:443`'s `./metric-stack → ./metric` re-seat | **LANDED as a census correction in F.W3 `.d`** (`ca8c8d2`: targets re-seated at the pin — `./metric` and `./chip` present, `./metric-badge` and `./toggle-chip` absent at 8.0.0); the methodology row itself is a record, never quoted downstream |
| fr-EasingCurvePreview **PICKER-RES** | CENSUS:191 SPLIT — the preview half mechanical, the picker half a product decision | preview half **RULED** (§0x S-6a, ROUTE 1) and **LANDED** (`.b` `b9995b3`, `EasingCurvePreview.vue` deleted); picker half (the producer's `EasingPicker` + `useEasingPicker`) neither taken nor refused — routed F.W4 by `.b` residual 4, and F.W4 is CLOSED → **the next formation boundary** |
| fr-FunctionInput **L-m5** + C §0 row 7 | the `./chip`-vs-`./toggle-chip` version qualifier; the false "6× Button" budget (`lane-frontend.md:441`) | qualifier **RESOLVED at the adopted pin** (`.d` `ca8c8d2` read: `./chip` present, `./toggle-chip` absent at 8.0.0 — `Chip.tone` is the target); the "6× Button" figure is a record, superseded by measurement, never quoted |
| fr-CanvasOverlayButton **FR-COB-7** | producer-owned cascade composite (dead border arms fleet-wide; pressed background beats hover by unlayered source order) — TOP of the FR-COB-28 packet | **DISPOSED BY THE PRODUCER**: O-20 §A-11 → I-32 **A-11a KILL** (*"the Button's own `border: 1px solid var(--button-edge)` paints"*) ⊕ **A-11b ANSWER** (*"Button is the command — no `pressed`"*); NWO-1 §2 S-1 struck it; **not re-sent** (§4a). The consumer-awareness prescription (never assume a border channel) stands as a record |
| fr-ContourSettings **i-1** | Multi-threshold ships zero strategy-specific controls — a product-surface decision needing an authored ruling | **OWNER RULING OWED** — a formation-boundary flag; no unit executed a change (`.d` records the ruling-owed state; §0x rules i-3, not i-1) |
| **F.W10 DRAIN 2026-09-20** (X.F.W10 `.c`, `claude-opus-5[1m]`) — the **F-side NO-WAVE-OWNER drain** (spec `fourier/waves/F-W10.md` §2.5/§2.5a/§2.5a-ii/§2.5a-iii; gate **G-F10-7**; §3.3's deadline, F.W10 being the LAST F wave). **A THIRD population, disjoint from both blocks above**: it drains the **66 `fr-*.md`** adjudicated registry, not §4's 14 intake rows (§4.1) and not F.W3's seven emitted rows. Roster **DERIVED, not adopted** — the five partition probes re-run fresh at this seat and published with their arithmetic closing | **89 rows · 89 distinct ids · 89 terminal verbs** ⊕ ONE class verb over the weak class enumerated whole (32 lines / 19 records) | **§4.2**, below |

### §4.1 — X.KF.W10 `.b` · THE NO-WAVE-OWNER SET-DIFFERENCE (G-2), ∅ IN BOTH DIRECTIONS — 2026-09-18

**Authority and scope.** `keyframes/waves/KF-W10.md` **§3.2** (the `.b` unit) and **§5 G-2**; ordering
**§6.A**; the right hand's second half is **§6.D · SUCCESSOR-FORMATION REGISTER**. **§0t is RECORDED here,
never re-minted**: KF.W10 belongs to **SS-2**, so this set-difference is an OWNED assertion. **This wave
consumes; it does not home and it does not cure** (KF-W10 §2) — every disposition below is carried from the
record or the sibling spec that already made it, and **nothing is re-booked: folds are by reference at the
banked id, original ids for life.** The terminal alphabet is G-2's Acceptance, verbatim and closed:
**`LANDED in a wave`** · **`KILLED-with-rationale`** · **`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>`**
· **`ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)`** · **carried to the next formation boundary's ledger**.
**`LANDED in a wave` is a statement of OWNERSHIP, not of shipping** — it says the row has an owning wave and
is no longer NO-WAVE-OWNER; it never asserts that the cure has landed at the bytes.

**OP-5, re-measured AT THIS UNIT'S OWN OPEN (the precondition is on the state at open, never a spec-frozen
figure; R2-5(d)).** ⟨cmd⟩ `ls docs/tranches/X/keyframes/waves/KF-W[0-9].md KF-W10.md | wc -l` → **11**, each
with a bounds block (⟨cmd⟩ `grep -c 'Bounds'` per spec → `W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 ·
W6 59 · W7 36 · W8 46 · W9 49 · W10 12`). ⟨cmd⟩ `wc -c` at the worktree → `W0 259,685 · W1 254,747 ·
W2 362,133 · W3 190,569 · W4 250,775 · W5 305,775 · W6 306,972 · W7 261,120 · W8 269,803 · W9 280,059 ·
W10 263,074`. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/keyframes/` → **zero lines**: **no sibling
spec is modified at this sweep's clock.** **OP-5 GREEN.** The same three commands are re-run at this block's
settled bytes below, because *a sibling bounds block that changes after the sweep fails G-2 on OP-5, not on
arithmetic* (G-2's own falsifier).

**THE TWO DENOMINATORS, measured at this seat, double-run (run 1 ≡ run 2).**
*Left hand, arm 1* — ⟨cmd⟩ `ls registry/adjudicated/kf-*.md | wc -l` → **58** · `grep -l 'NO-WAVE-OWNER' | wc -l`
→ **57** · `grep -o 'NO-WAVE-OWNER' | wc -l` → **1,218**. The one non-carrying record is **`kf-AnimatedText.md`**
(⟨cmd⟩ `grep -L` → that file alone). ⟨KF-W10 §5's **1,216** is a dated 2026-08-28 observation, superseded by
**+2** at these bytes; **membership (58 / 57) reproduces exactly** and membership is what this sweep
partitions. Recorded, not re-derived.⟩
*Left hand, arm 2* — **COHESION §4's register: 14 source rows** (⟨cmd⟩ row count over §4's body → **14**),
drained one-for-one at Table B.
*Right hand* — **the AUTHORED ELEVEN's bounds blocks ∪ §6.D's cargo enumeration**, Table C. **The falsifier is
honoured at its own words**: a right hand computed from authored bounds **alone** fails, so §6.D's 17-packet
cargo is computed as the second half and the two halves are printed separately.

**SELF-COUNT LAW, stated at the write.** Neither denominator moves under this block's own bytes: arm 1 is
measured over `registry/adjudicated/kf-*.md`, a tree this seat never writes, and arm 2 is a **row count** of
§4's 14 intake rows, whose bytes are unchanged (E-3). For completeness, this file's own `NO-WAVE-OWNER`
occurrence count **does** move — ⟨cmd⟩ `grep -o 'NO-WAVE-OWNER' COHESION.md | wc -l` → **12** before this
write — and that figure is in no gate's arithmetic.

#### §4.1.A — LEFT HAND, arm 1: the 57 carrying kf records, each with one terminal word

**Reading rule.** One row per **record** — the granularity G-2's own Witness prescribes (*"the per-record
routing summaries … vs the wave bounds blocks"*). **`occ`** is that record's `NO-WAVE-OWNER` occurrence count,
double-run. Where a record's rows split across homes the **arms are named** rather than rounded to one word:
an arm is not a second verb, it is a second object, and the spec itself splits `KF-HA-4` and `C-22` this way.
**Packet anchors are quoted from the successors' own `§Carry` heading lines** (KF-W11/W12/W13, authored
`f208ff31`), not re-derived at the registry.

| # | record | occ | home | terminal word |
|---|---|---|---|---|
| 1 | `kf-SquareScene` | 54 | **KF.W11 P7 · square** ⟨`:162` +`:40` L-2⟩ | **LANDED in a wave** |
| 2 | `kf-App` | 46 | **KF.W13 P1 · dock-menu** (the KF-APP-1/-17 motion, ARB-1) | **LANDED in a wave**; the `KF-APP-41` limb ⟨`kf-App.md:91`⟩ = **ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)** |
| 3 | `kf-SequenceTarget` | 44 | **KF.W11 P2 · sequence** ⟨`:165` +`:87` ST-4⟩ | **LANDED in a wave** |
| 4 | `kf-CubeScene` | 44 | **KF.W11 P1 · cube** ⟨`:178`, the routing spine⟩ | **LANDED in a wave** |
| 5 | `kf-KeyframeCard` | 43 | **KF.W12 U1 · CARD-UNIT** (by seam) | **LANDED in a wave** |
| 6 | `kf-SquareInstrument` | 41 | **KF.W11 P7 · square** ⟨`:145`⟩ | **LANDED in a wave** |
| 7 | `kf-KeyframesStringControls` | 41 | **KF.W12 U5 · APPLY-UNIT** ⟨`:17` the mint⟩ | **LANDED in a wave** |
| 8 | `kf-SequencePlayhead` | 39 | **KF.W11 P2 · sequence** ⟨`:152`⟩ | **LANDED in a wave** |
| 9 | `kf-OrbitalDrag` | 39 | **KF.W11 P1 · cube** ⟨`:158`⟩ | **LANDED in a wave** |
| 10 | `kf-ControlsPaneWrapper` | 39 | **KF.W12 U2 · OPTIONS-UNIT** (D-B1/N-2/C-2; `proof:stage-visible`) | **LANDED in a wave** |
| 11 | `kf-AmigaScene` | 39 | **KF.W11 P8 · amiga** ⟨`:159`⟩ | **LANDED in a wave** |
| 12 | `kf-SequenceScene` | 38 | **KF.W11 P2 · sequence** ⟨`:154`⟩ | **LANDED in a wave** |
| 13 | `kf-ChromeDock` | 35 | **KF.W13 P1 · dock-menu** ⟨`:45` M-4 · `:99` i-2 · `:106`⟩ | **LANDED in a wave** |
| 14 | `kf-AnimationControlsGroup` | 34 | **KF.W6 §Bounds** (`AnimationControlsGroup.vue` ×5; also KF.W5, KF.W8's `useControlsKeyboardShortcuts.ts`) | **LANDED in a wave** ⟨D-1's portal cure is consumed by KF.W11 P1's C-15 limb as settled — a consumption, not a re-booking⟩ |
| 15 | `kf-SpringTarget` | 33 | **KF.W11 P3 · spring** ⟨`:148`⟩ | **LANDED in a wave**; the **KF.W7-evaluated idiom arm** (surface 6) = **carried**, KF.W7 KEEP-BESPOKE |
| 16 | `kf-TransportDock` | 32 | **KF.W13 P2 · transport/ribbon** ⟨`:131` +`:45-47`/`:64`/`:82-89`⟩ + P1's TD-36 | **LANDED in a wave** |
| 17 | `kf-SpringHeatmap` | 32 | **KF.W11 P5 · spring-physics-facet** ⟨`:132`⟩ | **LANDED in a wave** |
| 18 | `kf-MbabbMenu` | 32 | **KF.W13 P1 · dock-menu** ⟨`:15`/`:26` MM-28/`:169`⟩ | **LANDED in a wave** |
| 19 | `kf-SequenceScrubber` | 31 | **KF.W11 P2** ⟨`:137`⟩ **and P9 · drag-seam** ⟨`:136` +`:40`/`:42`/`:125`⟩ | **LANDED in a wave**; the **KF.W7-evaluated shape rows PERSIST** (surface 4) = **carried** |
| 20 | `kf-EasingScene` | 31 | **KF.W6 §Bounds** (`EasingScene.vue`); parse arm consumed at KF.W2 | **LANDED in a wave** |
| 21 | `kf-StartingStyleTarget` | 30 | **KF.W11 P6 · spring-artifact-truth** ⟨`:140`⟩ | **LANDED in a wave** |
| 22 | `kf-SpringTrace` | 30 | **KF.W11 P4 · spring-plot** ⟨`:140`⟩ | **LANDED in a wave**; the **KF.W7 idiom arm** (surface 6) = **carried** |
| 23 | `kf-MatrixEditor` | 30 | **KF.W11 P1 · cube** ⟨`:42`, the routing law⟩ | **LANDED in a wave** |
| 24 | `kf-ChannelControls` | 30 | **KF.W6 §Bounds** (`ChannelControls.vue` ×18; also KF.W1, KF.W7, KF.W8) | **LANDED in a wave** ⟨L-16/KF-CO-15 are *"kin recorded, not folded"* at KF.W12 U2 — a pointer, never a second home⟩ |
| 25 | `kf-EasingTarget` | 28 | **KF.W6 §Bounds** (`EasingTarget.vue` ×5; also KF.W8 ×2) | **LANDED in a wave** |
| 26 | `kf-DemoGlobalChrome` | 28 | **KF.W6 §Bounds** (`DemoGlobalChrome.vue`; KF.W0 holds its substrate leg) | **LANDED in a wave** |
| 27 | `kf-AnimationVisualizer` | 28 | **KF.W11 P9 · drag-seam** ⟨`:55` KF-AV-15 · `:56` KF-AV-16⟩; **KF.W7 §Bounds** for the surface | **LANDED in a wave** (the two seam rows); the **residual roster = carried**, naming **AnimationVisualizer** — KF-AV-13/-14/-24's cures and KF-AV-32 (relayed as **O-28 R-6**) **stay NO-WAVE-OWNER** by KF.W7's own words; **KF-AV-10 is LANDED** ⟨`72cdc27a`⟩ |
| 28 | `kf-SequenceAxis` | 22 | **KF.W11 P2 · sequence** ⟨`:131`⟩ | **LANDED in a wave** |
| 29 | `kf-EasingSidebar` | 22 | **KF.W12 U2 · OPTIONS-UNIT** ⟨`:50` KF-ES-12⟩ | **LANDED in a wave** |
| 30 | `kf-SpringPhysicsFacet` | 21 | **KF.W11 P5** ⟨`:40`/`:41`/`:42`/`:47`/`:53`⟩ **and KF.W12 U2** ⟨`:38-39` SPF-1/-2, `:53`⟩ **/ U3** ⟨`:51`,`:59`,`:60`,`:66`⟩ | **LANDED in a wave** — one record, three units, **zero re-bookings** (each limb cited at its own banked anchor) |
| 31 | `kf-CopyButton` | 21 | **KF.W6 §Bounds** (`CopyButton.vue`; also KF.W5 ×2, KF.W8's `@components/CopyButton.vue`) | **LANDED in a wave** |
| 32 | `kf-SpringScene` | 17 | **KF.W11 P3 · spring** ⟨`:155`⟩ | **LANDED in a wave** |
| 33 | `kf-TimingFunctionPanel` | 16 | **KF.W12 U2 · OPTIONS-UNIT** ⟨`:45-47`⟩ | **LANDED in a wave** |
| 34 | `kf-CubeTarget` | 16 | **KF.W11 P1 · cube** ⟨`:102`⟩ | **LANDED in a wave** ⟨the `#7` library-diagnostic half is declared to KF.W5 by that packet, not re-homed here⟩ |
| 35 | `kf-PlaybackRibbon` | 15 | **KF.W13 P2 · transport/ribbon** ⟨`:157` · `:36` the routing law + rider · `:40-55` · `:64` N-3⟩ | **LANDED in a wave** |
| 36 | `kf-EditorHeader` | 12 | **KF.W6 §Bounds** (`EditorHeader.vue` ×14; also KF.W8 ×2) | **ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)** for **`KF-APP-41`** (the delete, banked rung *NO-WAVE-OWNER (delete)*); the remaining surface rows **LANDED in a wave** |
| 37 | `kf-RibbonBar` | 11 | **KF.W12 U4 · EDITOR-UNIT** ⟨`:48` M-3/C-8 format half⟩ **and U5 · APPLY-UNIT** ⟨`:27`,`:76` RB-6, `:135`⟩ | **LANDED in a wave** |
| 38 | `kf-EditorShell` | 11 | **KF.W6 §Bounds** (`EditorShell.vue` ×8; also KF.W0, KF.W4, KF.W5) | **ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)** for the **`C-22` orphan-token limb** ⟨`:95`; `--header-items-max-w` at `layout.css:15`⟩ · **`C-22`'s remaining limbs `D-27` and `RR-2 M7` STAY NO-WAVE-OWNER = carried** (R4-1's own falsifier) · **`EH-4` · `EH-5` · `EH-8` LANDED in a wave** at KF.W6 §Bounds, one anchor per row (RULINGS-5 R5-1, the SHADOW restoration) |
| 39 | `kf-EditorStartScreen` | 8 | **KF.W6 §Bounds** (`EditorStartScreen.vue`; also KF.W0, KF.W4, KF.W8 ×2) | **LANDED in a wave**; the **KF-EST-23 doc-truth arm** is **this wave's `.d`** (G-5 addendum 2) |
| 40 | `kf-SharePopover` | 7 | **KF.W6 §Bounds** (`SharePopover.vue` ×5) | **LANDED in a wave** |
| 41 | `kf-KfPillTabs` | 6 | **KF.W6 §Bounds** (`KfPillTabs.vue` ×10 + `useKfPillTabs.ts`) | **LANDED in a wave** |
| 42 | `kf-App.skeleton` | 6 | **KF.W6 §Bounds** (`demo/app/App.skeleton.vue`) | **LANDED in a wave** |
| 43 | `kf-TypingDots` | 4 | **KF.W6 §Bounds** (`TypingDots.vue`; KF.W0 holds its substrate leg, KF.W4 its census leg) | **LANDED in a wave** |
| 44 | `kf-HeroAurora` | 4 | **KF.W6 §Bounds** (`HeroAurora.vue` ×2; also KF.W4, KF.W8) | **LANDED in a wave**; the **`KF-HA-4` manifest limb ONLY** is this wave's `.d` (G-5 addendum 3, SPLIT-LOCK) |
| 45 | `kf-ChannelOptions` | 4 | **KF.W12 U2 · OPTIONS-UNIT** ⟨`:25` the mint · `:45-99` · `:156` · `:198-203`⟩ | **LANDED in a wave** |
| 46 | `kf-TimelineHoverPreview` | 3 | **KF.W7 §Bounds** (`TimelineHoverPreview.vue` ×2; also KF.W5, KF.W6) | **LANDED in a wave** (surface); **governed rows carried**, naming **TimelineHoverPreview** — KF.W7 **KEEP-BESPOKE**, its producer seams travel as **O-28 R-4/R-5**, never as discharges |
| 47 | `kf-LayerConfigPanel` | 3 | **KF.W12 U2 · OPTIONS-UNIT** ⟨`:35` + LP rows⟩ | **LANDED in a wave** |
| 48 | `kf-KeyboardShortcutsModal` | 3 | **KF.W6 §Bounds** (`KeyboardShortcutsModal.vue`; also KF.W8) | **LANDED in a wave**; the **`C-9` `/command` decision record** is filed at this wave's `.a` (**CARRY-C-5**, slot `lane-frontend.md §5 S-17`) |
| 49 | `kf-CSSCodeEditor` | 3 | **KF.W12 U4 · EDITOR-UNIT** ⟨`:30` the mint · `:33-87`⟩ | **LANDED in a wave** |
| 50 | `kf-KeyframesEditor` | 2 | **KF.W12 U3 · KFED-UNIT** ⟨`:36` the mint · `:41-114` · `:172`⟩ | **LANDED in a wave** |
| 51 | `kf-KeyframeCardList` | 2 | **KF.W12 U1 · CARD-UNIT** ⟨`:30` the mint · `:135` the verdict⟩ | **LANDED in a wave** |
| 52 | `kf-CubeAxisLines` | 2 | **KF.W12 U6 · AXISLINE-UNIT** ⟨`:34` the mint · `:38` KF-AX-1⟩ | **LANDED in a wave** |
| 53 | `kf-CSSPasteDialog` | 2 | **KF.W7 §Bounds** (`CSSPasteDialog.vue`; also KF.W4, KF.W6) | **LANDED in a wave** |
| 54 | `kf-TimelineTrack` | 1 | **KF.W7 §Bounds** (`TimelineTrack.vue` ×2; also KF.W4, KF.W6, KF.W8) | **LANDED in a wave** (surface); **governed rows carried**, naming **`KeyframeTimeline / TimelineTrack rail`** — KF.W7 **KEEP-BESPOKE** |
| 55 | `kf-TimelineCaret` | 1 | **KF.W7 §Bounds** (`TimelineCaret.vue` ×2; also KF.W4 ×3, KF.W6, KF.W8) | **LANDED in a wave** — **`C-10` RULED-and-LANDED** ⟨`e42e0aa3`⟩ and **`L-15` RULED-and-LANDED** under G14 P4(a); the rest **carried**, naming **TimelineCaret** |
| 56 | `kf-KeyframesAddDialog` | 1 | **KF.W12 U3 · KFED-UNIT** | **LANDED in a wave** |
| 57 | `kf-KeyframeTimeline` | 1 | **KF.W7 §Bounds** (`KeyframeTimeline.vue` ×2; also KF.W3, KF.W4, KF.W6) | **LANDED in a wave** (surface); **governed rows carried**, naming **`KeyframeTimeline / TimelineTrack rail`** — KF.W7 **KEEP-BESPOKE** |
| — | `kf-AnimatedText` | **0** | — | **not in the left hand**: the one record of 58 that carries no `NO-WAVE-OWNER` row (⟨cmd⟩ `grep -L`). Its `KF-AT-21`/`KF-AT-26(e)` doc-truth arms are G-5's, not this gate's |

**Arm-1 partition, stated so it can be checked (counting rule at the enumeration: the unit is a RECORD).**
**37 homed by a §6.D packet** + **20 homed by an AUTHORED wave's bounds block** = **57**, and 57 + the one
non-carrying record = **58**. The partition is computed, not asserted: ⟨cmd⟩ each record name tested against
the three successors' `### P*`/`### U*` §Carry heading lines → **37 hit · 20 miss**, double-run; each of the
20 then tested against the eleven authored specs' `§Bounds` blocks → **20 of 20 resolve**, **0 unresolved**.
**No record is homed twice by re-keying**: where a record appears under two packets (`kf-SequenceScrubber`,
`kf-SpringPhysicsFacet`, `kf-RibbonBar`, `kf-TransportDock`) the limbs are cited at **different banked
anchors of the same record**, which is a fold by reference, not a re-booking.

#### §4.1.B — LEFT HAND, arm 2: COHESION §4's 14 intake rows, drained

**Method.** §4's rows are **record-level pointers** into the X·V corpus, and their register of record is the
**X·V refinement fold layer** — ratified as such by **§0j.B · GF-R3** (*"RATIFY §1: the fold + canonical layers
ARE the register of record … zero file motion"*). Under the fold's own **HOMED law** (§1: *"a wave adopts it
through that wave's fold addendum — bounds delta + row booking; **the fold file is the row authority**"*), a
row's home is the fold file that books it. Measured this seat, double-run: ⟨cmd⟩ `grep -c '<record>'
refinement/X-W*-FOLD.md`, printed as `total` across the twelve folds and the `top` booking fold. **§4's own
14 rows are byte-unchanged by this drain (E-3)** — the terminal word is recorded here, beside them.

| § 4 row | fold-layer measure (total · top) | terminal word |
|---|---|---|
| AboutPane rider A-1 | 144 · **X-W0** (45) | **LANDED in a wave** — X-W0's fold + X-W6 (27); **the W-HYGIENE limb is `BOOK TERMINAL, explicitly NOT ADOPTED`** (§0j.B (5): *"silence is not adoption"*), i.e. **carried** at the G-F register |
| ActionFeedback | 79 · **X-W7** (41) | **LANDED in a wave** (X-W7's fold; X-W0 holds the `browser/index.ts:6-7` prose leg) |
| AdminAuditPanel | 73 · **X-W7** (36) | **LANDED in a wave** (X-W7's fold; X-W3 the transport/contract leg ×11) |
| AdminTagsPanel | 96 · **X-W7** (46) | **LANDED in a wave** (X-W7's fold; the result-surface cure is W7's adoption, exactly as the intake row anticipated) |
| ApiOfflineChip | 56 · **X-W8** (15) | **LANDED in a wave** — **owner-ruled: §0j.B GF-R1 names the claimant `X-W3`**, by a dated E-3 addendum widening its bounds to `demo/platform/transport/**` (4 files) as ONE unit carrying all seven rows with **AP-17** as its born-RED gate; the `×5`→`×7` correction rides **the addendum, never §4's bytes** |
| BlobPane | 60 · **X-W2** (30) | **LANDED in a wave** (X-W2's fold; X-W6 ×18). MT-CSP-1's 10 identity-folds ride the fold layer's identity rows |
| BrowsePane | 112 · **X-W7** (70) | **LANDED in a wave** (X-W7's fold; X-W3 ×22 for the `request<T>` decoder leg) |
| ErrorBoundary | 128 · **X-W5** (20) | **LANDED in a wave** — **owner-ruled: §0j.B GF-R1's tail, *"the `ErrorBoundary.vue` contention at W0.22 stays X-W0's"***; the EB-2/EB-4 cure-lock (boundary OUTSIDE KeepAlive) travels with it |
| MiniColorPicker | 53 · **X-W7** (26) | **LANDED in a wave** — X-W7's fold; the DELETE-AND-REBUILD terminal shape is **REVERSED to unify-on-the-mini's-containment** at `X-W8-FOLD.md` row 12 (W8.36), which is the row's live disposition, **recorded here, not re-decided** |
| PaginationBar | 65 · **X-W7** (36) | **LANDED in a wave** (X-W7's fold; the composable-layer rows above the 48-line leaf) |
| PaletteCard | 337 · **X-W7** (230) | **LANDED in a wave**; **R-4's registry-hygiene row** (the 20,018-byte CHALLENGE-L report at the malformed pass-2 path) is an **evidence-ledger correction with no wave surface** = **carried to the next formation boundary's ledger** |
| PaneHeader | 75 · **X-W10** (52) | **LANDED in a wave** (X-W10's fold; PH-1's WebKit shrink-ratio pole + `useHeaderCondense.ts` + `o11-header-gates.spec.ts`) |
| PreviewRamp | 124 · **X-W11** (60) | **LANDED in a wave** (X-W11 ×60 + X-W6 ×37); **ADJ-1's sequencing rule is a TRAVELLING LOCK** — `[data-color-surface]`: GenerateControls G8 deletes it, PreviewRamp's cure mints producers; **order bound on both records**, carried intact |
| PreviewStrip | 91 · **X-W6** (35) | **LANDED in a wave** (X-W6's fold; X-W1 ×18, X-W9 ×11). The intake row's own conditional — *"X-W9.d/.f named gaps DEGRADE to NO-WAVE-OWNER if unadopted at execution"* — is **a live re-trigger, carried**, not a disposition this sweep may close |

**Arm-2 result: 14 of 14 drained · 0 silent.** Two rows carry a **carried** limb beside their landing
(AboutPane's W-HYGIENE limb; PaletteCard's R-4 registry-hygiene row), and one carries a live **re-trigger**
(PreviewStrip). **Naming a limb is not a second verb** — it is the honest shape of a row whose parts have
different homes, and the alternative is the closure-by-omission §2 declares fatal.

#### §4.1.C — RIGHT HAND: the AUTHORED ELEVEN's bounds ∪ §6.D's cargo, and ∅ in the second direction

**Half 1 — the authored eleven.** `KF-W0 … KF-W10`, **11 specs, 11 bounds blocks**, measured at OP-5 above.
Twenty of the left hand's 57 records resolve here, and **no authored bounds block claims a NO-WAVE-OWNER
packet**: KF.W4 homed all seventeen onward (§6.D's minting authority), so the two halves are **disjoint by
construction** and the union is a sum, never an overlap.

**Half 2 — §6.D's cargo enumeration, reconciled against the successors' now-real bounds blocks.** The
round-1..4 premise *"MINTED-**UNAUTHORED**"* is **stale at the bytes**: `KF.W11 · KF.W12 · KF.W13` were
**AUTHORED 2026-09-18** ⟨`f208ff31`⟩ and now carry real `§Bounds` and `§Carry` blocks. **The spec's form is
what this gate computes** — `authored bounds ∪ §6.D cargo` — and the successors' own bounds are used as a
**reconciliation, never as a substitute** (the falsifier: *a right hand computed from authored bounds alone,
dropping §6.D's cargo, fails*).

| §6.D row | cargo (the R-15 partition) | reconciled at the successor's own bytes | sum |
|---|---|---|---|
| 1 · **KF.W11 · Demo Scene Repair** | **9** — cube · sequence · spring · spring-plot · spring-physics-facet · spring-artifact-truth · square · amiga · drag-seam | ⟨cmd⟩ `grep -c '^### P[0-9]' KF-W11.md` → **9**; the nine `§Carry` headings name the nine packets **member-for-member**, each with its home record + anchor | **9 = 9** |
| 2 · **KF.W12 · Authoring-Surface Repair** | **6** — CARD-UNIT · OPTIONS-UNIT · KFED-UNIT · EDITOR-UNIT · APPLY-UNIT · AXISLINE-UNIT | ⟨cmd⟩ `grep -c '^### U[0-9]' KF-W12.md` → **6**; six `§Carry` headings, member-for-member | **6 = 6** |
| 3 · **KF.W13 · Chrome, Dock & Transport Repair** | **2** — dock-menu · transport/ribbon | ⟨cmd⟩ `grep -c '^### P[0-9]' KF-W13.md` → **2**; two `§Carry` headings, member-for-member | **2 = 2** |

**9 + 6 + 2 = 17**, the canonical RULINGS **R-15** roster, at the same three homes, in the same partition.
**The falsifier's arithmetic arm is met at every wave**: no §6.D row's cargo count disagrees with its wave's
partition figure. **The terminal verb of the three register rows is untouched by this sweep** — advancing it
is not `.b`'s act, and the authoring event is recorded as a dated observation, not as a re-ruling (E-3).

**∅ in the second direction (right → left), stated as the check it is.** Every home on the right hand is
backed by a banked left-hand row: each of the 17 packet headings cites **≥ 1 record + anchor** from the
58-record registry (**17 of 17**, no heading without a record), and each of the 20 authored-wave homes is a
bounds row over the record's own surface file (**20 of 20**). **There is no phantom home** — no wave, packet
or UNIT in the right hand exists without a left-hand row to fill it — and **there is no empty-union green**:
the right hand is non-empty on both halves (11 bounds blocks · 17 packets), so **L-2's vacuous-gate rule does
not fire.**

#### §4.1.D — the seven §3.2 sequencing locks, reproduced intact

1. **KF-CO-1 / KF-CO-8** cures are **SEQUENCED by LP-1** (no write→render edge) — riding **KF.W12 U2**, whose
   §Carry fixes the order *"KF-CO-1 … + KF-CO-8 ≡ LP-3 … **+ LP-1 in the SAME commit**"*.
2. **kf-ChromeDock M-4's** worded cure **ships an unopenable menu** without the **MbabbMenu MUST-CARRY rider**
   — riding **KF.W13 P1**, which carries the rider by name.
3. **TD-1 / TD-2's cures bundle** — riding **KF.W13 P2** WHOLE (TD-1's *"cure with TD-4 + PRM + test, one
   commit"*; TD-2's one-commit-with-TD-38/TD-40 lock), its sole home.
4. **KF-APP-1's `ppMode` repair disposes the `setPPMode` twin in the same motion as the KF-APP-17 `headerLeft`
   sweep; the `headerLeft` 'fill' arm is a TRAP** — it lands inside an inert toolbar, so **until the KF-APP-5
   producer relay lands, DELETE is the only self-contained cure.** Homed inside an authored wave; **KF.W11 P1
   consumes ARB-1's delete-arm-only law and re-derives nothing**, and KF.W13 P1 obeys the same arm.
5. **Comment-stated invariants are test obligations** — the kf-SquareScene **MISS-3** law (a docblock asserting
   *"paced by the spring's own settle, not a fixed timer"* 46 lines above `setTimeout(step, 520)`); riding
   **KF.W11 P7**, where it is measured **RELOCATED** to `useSquareKeyboard.ts:20`/`:66` with its content
   unchanged — *a comment edit alone does not discharge it*.
6. **Glass-producer rows go to SS-6, never demo-side hacks** — named in all three successors' travelling-lock
   blocks; **glass-ui is READ-ONLY always**.
7. **KF-AV-28 · STANDING SUPERSESSION RIDER** — the sweep input, §4.1.E.

**Six of the seven are the six travelling locks §6.D enumerates** (KF-AV-28 · MbabbMenu MUST-CARRY · TD-1/TD-2
bundling · LP-1 write→render · comment-stated-invariants · glass-producer→SS-6); the seventh — KF-APP-1/-17's
same-motion lock — **is not among them because its packet is homed inside an authored wave**, exactly as §6.D
states. All seven survive this sweep **verbatim**; **none was spent, narrowed or re-worded.**

#### §4.1.E — KF-AV-28 as a SWEEP INPUT: the verdict EXISTS, and it is KEEP

**The rider's force on this gate**: it *"changes which terminal word those rows may lawfully take"*, so the
set-difference cannot be computed without reading KF.W7's verdict. **KF.W7 is CLOSED (2026-09-17)** and its
verdict is **SIX SURFACES · SIX KEEP-BESPOKE · ZERO SWAP** ⟨`.a`'s G1, `4c03ceda`, 2026-09-18⟩. **The discharge
set is EMPTY.** This sweep therefore emits **ZERO** `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` rows —
and **not because a verdict is outstanding, but because the verdict that exists discharged nothing.**

| KF.W7 surface (verbatim) | verdict | this sweep's disposition |
|---|---|---|
| `KeyframeTimeline / TimelineTrack rail` | KEEP-BESPOKE | governed rows **carried**, naming the surface (arm-1 rows 54, 57) |
| `TimelineCaret` | KEEP-BESPOKE | **carried**; `C-10` ⟨`e42e0aa3`⟩ and `L-15` are **LANDED**, not discharged (row 55) |
| `TimelineHoverPreview` | KEEP-BESPOKE | **carried**; producer seams travel as **O-28 R-4/R-5** (row 46) |
| `SequenceScrubber` | KEEP-BESPOKE | **carried** — the shape rows **PERSIST**; `C·C-4`'s narrowed cure is **LANDED** ⟨`43556828`⟩ (row 19) |
| `AnimationVisualizer` | KEEP-BESPOKE | **carried** whole; `KF-AV-10` **LANDED** ⟨`72cdc27a`⟩; `KF-AV-32` relayed (**O-28 R-6**) stays NO-WAVE-OWNER (row 27) |
| `SpringTarget / SpringTrace idiom arms` | KEEP-BESPOKE (house idiom ADOPTED) | **carried**; `C-4` is **RULED** (delete the sentence) and `C-3`'s decision is taken with its implementation edge at KF.W5/KF.W8 — *a decision taken is not a discharge* (rows 15, 22) |

**The packet-level consequence, recorded**: the **drag-seam** and **transport/ribbon** packets — which R-15
sequences *after* KF.W7's verdict — are **un-gated by a swap that did not happen**; their homing at KF.W11 P9
and KF.W13 P2 stands, and their governed rows are carried under the surfaces above. **No governed row is
stamped LANDED or KILLED on the strength of a swap**, which is the rider's own prohibition.

#### §4.1.F — the two INBOUND DECLARATIONS, received exactly as declared

**R4-1 (repair round 4)** — **`KF-APP-41`** and the **kf-EditorShell `C-22` orphan-token limb** leave the left
hand **BY ADOPTION, never by omission**: both read **`ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)`** (arm-1 rows 36, 38),
the authority is R4-1 with KF.W6's LAW-A census of record, and **`C-22`'s remaining limbs `D-27` and `RR-2 M7`
stay NO-WAVE-OWNER and are carried** — this green discharges nothing of theirs (R4-1's own falsifier). The
anti-re-book note is carried at **§6.D's KF.W12 row**: **no successor packet re-books either row.**

**R5-1 / LAW F(2) (repair round 5)** — KF.W6's **SHADOW** notification struck the round-4 MOOT-ON-DELETE premise
and **restored `EH-4` · `EH-5` · `EH-8` LIVE** at their banked anchors under that wave's existing grants. **It
is received as a notification and NOT converted into an obligation**: the three rows read **`LANDED in a wave`**
(arm-1 row 38), **no denominator moves** — the left hand stays **58 / 57 / 1,218** and the right hand stays
**authored bounds ∪ §6.D cargo** — and **this block books nothing new, re-keys nothing and adopts nothing.**
Recorded because *a sweep that silently absorbs a sibling's restoration is the same closure-by-omission the
close-clock arm exists to convict.*

#### §4.1.G — the gate reading

**G-2: RED → GREEN.** **∅ in both directions.** Left hand **58 records / 57 carrying / 1,218 occurrences ∪
COHESION §4's 14 rows = 71 sweep rows, 71 terminal words, 0 silent.** Right hand **the authored eleven's
bounds blocks ∪ §6.D's 17-packet cargo (9 · 6 · 2), reconciled member-for-member against KF.W11/W12/W13's
now-real §Carry blocks.** **Zero re-bookings** — every fold is by reference at the banked id and every original
id is carried for life. **All seven §3.2 sequencing locks reproduce intact, KF-AV-28 among them.** **OP-5 holds
at this block's settled bytes** (the three commands re-run below). **This wave homed nothing and cured
nothing**: it recorded, for every inherited NO-WAVE-OWNER row, the terminal word some other seat had already
earned — which is the only thing a close wave may lawfully do.

### §4.2 — X.F.W10 `.c` · THE F-SIDE NO-WAVE-OWNER DRAIN (G-F10-7): 89 ROWS · 89 DISTINCT IDS · 89 TERMINAL VERBS — 2026-09-20

**Authority and scope.** `fourier/waves/F-W10.md` **§2.5** (`:153-184`) · **§2.5a** (`:185-233`) · **§2.5a-ii**
(`:234-256`) · **§2.5a-iii** (`:257-319`) · gate **§3 G-F10-7** (`:442`); COHESION **§3.3** is the deadline clause
and **F.W10 is the LAST F wave**, so nothing leaves it un-homed. **The operand distinction is kept everywhere**
(F-W10 §1b · §2.5b): the **66 `fr-*.md` are the CORPUS** — the bytes every quotation comes from — and
`fourier/conformance/CENSUS-CANONICAL.md` is the **CENSUS** — the rosters and homes every count comes from; a
quotation cites the corpus, a denominator the canonical, and no third census operand appears. **This block BOOKS
terminal verbs; it homes nothing, cures nothing and re-books nothing** — folds are by reference at the banked id,
original ids for life (R-5). **The registry is READ-ONLY** (⟨cmd⟩ `git diff --stat -- docs/tranches/V/megatranche/registry/`
→ **0**, twice, at this seat's settled bytes), and **producer rows never become frontend hacks**.

**THE DERIVATION, RE-RUN FRESH FROM THE 66 AT THIS SEAT AND PUBLISHED — a roster asserted rather than derived is
what three repair rounds convicted.** ⟨cmd⟩ this seat, 2026-09-20, **double-run, identical both runs**, one base
(`docs/tranches/V/megatranche/registry/adjudicated`), pinned BSD `/usr/bin/grep`, no `-P`, no `\K`, no lookaround,
no bounded wildcard. The three probe variables are declared once and every row re-uses them, so a re-run cannot
silently narrow the operand:

- `BOIL='Routing law|\*\*F\.W[0-9].*\*\*F\.W[0-9].*\*\*F\.W[0-9]'` — the routing-TAXONOMY shape, matched by
  **structure** (three or more wave tokens on one line), never by a hand-listed roster of records and never by one
  of its three spellings (*"Routing law"* · *"Routes:"* · *"Dispositions:"*).
- `ROW='^(\||[-*] \*\*|[0-9]+\. \*\*)'` — the three row shapes (table row ⊕ id-headed bullet ⊕ numbered bullet);
  anything else is prose and is **walked to its enclosing row id**, never dropped.
- `STRICT='(→|⇒) *\*{0,2}NO-WAVE-OWNER|\*\*NO-WAVE-OWNER'` — both strict shapes in one alternation.

| class | probe | lines | records |
|---|---|---|---|
| routing-law / taxonomy boilerplate | `grep -h 'NO-WAVE-OWNER' fr-*.md \| grep -cE "$BOIL"` | **31** | — |
| row-level **STRICT** | `… \| grep -vE "$BOIL" \| grep -E "$ROW" \| grep -cE "$STRICT"` | **68** | **35** |
| row-level **WEAK** | `… \| grep -vE "$BOIL" \| grep -E "$ROW" \| grep -cvE "$STRICT"` | **32** | **19** |
| **prose STRICT** (walked to its row id) | `… \| grep -vE "$BOIL" \| grep -vE "$ROW" \| grep -cE "$STRICT"` | **1** | 1 |
| prose WEAK (dated verdict bytes — immutable) | `… \| grep -vE "$BOIL" \| grep -vE "$ROW" \| grep -cvE "$STRICT"` | **33** | — |
| **TOTAL** | `grep -h 'NO-WAVE-OWNER' fr-*.md \| wc -l` | **165** | **56** of **66** |

**`31 + 68 + 32 + 1 + 33 = 165` — the partition exhausts its operand.** Strict roster = **69 dispositions across 36
records** (the 68 row-level ⊕ the one prose-strict, `fr-PaperSearch`'s *"Infos (7 carried)"* line walked to its
enclosing row id `L-19+C-N1`). Corroborating readings, same clock, double-run: ⟨cmd⟩ `grep -o 'NO-WAVE-OWNER' fr-*.md | wc -l`
→ **167** occurrences · `grep -l … | wc -l` → **56** records · `ls fr-*.md | wc -l` → **66** · **the en-dash arm**
`grep -o 'NO–WAVE' fr-*.md | wc -l` → **0** (∅ today, and it stays in the probe so it can never silently stop being ∅).
The two per-class record counts were taken by **two independent instruments** — a filename-retaining pipeline and a
per-file loop — which agree at **35 / 19**.

**The reconciled roster, and every superseded count word named rather than replaced**: §4.2.A's **23**
(FR-NP-32 among them as the head row, counted ONCE) ⊕ §4.2.B's **36** = **59 distinct ids** ⊕ §4.2.C's **16** = 75
⊕ §4.2.D's **14** = **89**, plus **ONE class verb** over the weak class **enumerated whole** at §4.2.E (32 lines /
19 records). **Never 23, never "SIXTY", never 59, never 75, never 88** — each is a reading superseded by the round
that fixed it. **The falsifier is not the integer**: it is that every row bears a TERMINAL verb and that no verb
reads as a decision while being a deferral.

**THE CLOSED ALPHABET — five verbs, and nothing else appears in this block**: **NAMED WAVE** (incl. NAMED REGISTER)
· **NEXT-BOUNDARY LEDGER** (`BH-RELAY` = the SS-6 glass register at §4a · `CENSUS-INPUT` = the SS-3/SS-4
spec-authoring / census-methodology ledger) · **KILL-WITH-RATIONALE** · **CITE-CONSUMING-WAVE** · **FOLD-WITH-TARGET**
(⊕ `EXCLUDED-WITH-REASON`, R2-6b's own verb, at the single row that takes it). *A closed question and a negative
finding are terminal dispositions too — they are recorded, and they manufacture no work.*

**Cited, never counted in**: §4's **F.W3 S-8 EMISSION 2026-09-19** block above is a **different population** (seven
census-methodology rows F.W3 emits and does not own, post-drain) and **§4.1**'s fourteen are the X·KF/X·V
set-difference. Neither enters this roster, and this roster enters neither.

#### §4.2.A — the drain proper: 23 rows (F-W10 §2.5). **FR-NP-32 heads the table.**

| # | banked id · anchor (frozen corpus) | mechanism, one line | TERMINAL VERB |
|---|---|---|---|
| 1 | **FR-NP-32 (≡ `fr-PaperSidebar M1`)** · fr-NotationPills:35 — **BLOCKER, the drain's head row; cite-both, never substitute** | the ADOPTED glass dist stylesheet was a CSS syntax error (dist emitter injected the AN.W1 fold-block at the first literal `@source`); `vite dev`/`vite build` RED at the 4.0.0 pin | **NAMED WAVE + BH-RELAY REGISTER**, disposition verbatim from the record: *"NO-WAVE-OWNER (producer dist emitter) + glass-ui BH relay at the TOP of the FR-COB-28 packet; F.W1 SEQUENCING GATE"* — F.W0 pre-gates, F.W1 sequences behind it, the register is **SS-6**. **Receipt READ, not asserted**: O-20 row **A-1** (`BK/coordination/…-o20-authoring-block-batch.md`) names the id and the arm; re-confirmed at NWO-1 §1 (*"CONFIRMED by your A-1; one residual, not an ask re-sent"*). Substrate VERIFIED at the 8.0.0 pin by `X.F.W10.b` |
| 2 | **AA-45** · fr-AdminAuditLog:88 | positional `:key` FORCED by the contract (no wire identity; pydantic drops `_id`); hazard unreachable | **NEXT-BOUNDARY LEDGER** — API-contract row (identity on the wire), SS-3/SS-4 input. Its ONE home is here (R3-6.1); F.W5's A1 cites it and books nothing |
| 3 | **AA-46** · :89 | envelope `page`/`pages` discarded and re-derived client-side; lossless round-trip today | **KILL-WITH-RATIONALE** — *"Redundancy records. NO-WAVE-OWNER."* A redundancy record: no defect, no work. Citable at F.W5 as envelope **evidence with the kill noted**, never as an operand |
| 4 | **AA-47** · :90 | no runtime boundary validation; pydantic guarantees shape; survives as UNEVEN defensiveness | **NEXT-BOUNDARY LEDGER** — SS-4 contract input |
| 5 | **FR-AFP-51** · fr-AdminFlaggedPanel:112 | the census ToastVariant break is **UPLIFT-TARGET**, not present-tense | **BOOKED HERE** — the tense correction **LANDED** in `formation/fourier/CENSUS-ADDENDUM-2026-08-25.md` (`X.F.W10.a`, `cd4df502`); it must reach whatever spec quotes the census break table |
| 6 | **FR-AFP-52** · :113 | D grades a surface FR-AFP-1 proves unreachable; the corpus never states its conditional | **NEXT-BOUNDARY LEDGER** — corpus-composition input, SS-3/SS-4 |
| 7 | **FR-AUL-16** · fr-AdminUserList:54 | the only cascade-delete surface, zero coverage of any kind; the *"un-harnessable"* defence KILLED (ruling 3e) | **NAMED WAVES, decided here**: harness decision → **F.W4** · devDependency + admin-tab axe limb → **F.W9**. If SS-4 declines the widening the decline is recorded explicitly with rationale (M-25). C-B2's BLOCKER demoted-and-folded here |
| 8 | **`fr-App i-2`** · :143 | route-owned surface, no component-level home | **NEXT-BOUNDARY LEDGER** — the per-route challenge corpus |
| 9 | **`fr-App C-12`** · :90/:143 | App is **API-INERT** — the negative guard | **KILL-WITH-RATIONALE — AS THE NEGATIVE RECORD, VERBATIM** (⟨cmd⟩ `grep -n 'NO leaf in this component' fr-App.md` → `:90`): *"**R6-8 and R3-7c have NO leaf in this component** — a per-component sweep must not manufacture one."* It keeps F.W5–W8's client-edge sweep off a false leaf |
| 10 | **MG-ι**, value-side limb · fr-App:82/:143 | the `color2` dispatch mis-reads its sibling parser (`color2(parseCSSColor(x))` THROWS; the `.value` unwrap SILENTLY RETURNS WRONG CHANNELS) | **NEXT-BOUNDARY LEDGER — the V·π / parser-seam ledger, WITH THE OWNER-MAIL FLAG.** No fourier wave adopts it. **ROUTE LAW (§4a.12)**: direct parse-that → fourier FORBIDDEN; this block mints no such edge |
| 11 | **FR-AH-30** · fr-AppHeader:88 | the D-axis's own `@layer components` remedy **REVERSES** the outcome (glass's competing rules already sit there at higher specificity — the consumer block silently LOSES) | **NAMED WAVE (cure-constraint) — F.W4**, where FR-AH-11 lands: only `@layer glass-overrides` **APPENDED AFTER `utilities`** works, and it is stated. *"Cure adjudicated separately from the defect"* |
| 12 | **FR-AH-45** · :108 | zero props/emits/slots — a question owed an answer (*"what contract should a shell header state?"*) | **NEXT-BOUNDARY LEDGER** — SS-3/SS-4 spec-input; discharges together with FR-AH-30 |
| 13 | **FR-CP-43** · fr-CoefficientsPanel:81 | canvas renders/hit-tests 40 units in imperative loops, no template node to key — instance censuses read 1 where there are 3 | **KILL-WITH-RATIONALE** — it **COMPLETES** R5-7/R6-6 + `fr-BasisCanvas L§R5-7`'s demand (row 13 of §4.2.D, which carries the terminal verb for that identity); discharged, no work remains |
| 14 | **FR-CP-44** · :82 | `lane-frontend.md:443`'s metric-stack shadow candidacy seated on two hosts neither of which renders a metric | **BOOKED HERE** — census correction **LANDED** in the CENSUS-ADDENDUM (`X.F.W10.a`) **+ F.W3 CANDIDATE** for the re-seat; §4's own F.W3 row records the re-seat measured at the 8.0.0 pin |
| 15 | **FR-CP-45** · :83 | D's line citations drift ≈−10/−2; L and C cite accurately | **ADOPTED AS LAW**, verbatim: *"take D's CLAIMS and L/C's LINES; re-resolve every anchor before quoting into a wave spec"* — binding on every anchor F-W10 quotes, **including its own**, and **DOCUMENT-scoped** per §4.2.D row 10's correction |
| 16 | **`fr-EasingPicker D/D-21`** · :101 | empty/loading/error genuinely N/A (compile-time catalogue — CLOSED, not skipped); the focus-ring question MOOT once D-1's cure lands | **KILL-WITH-RATIONALE** — SS-13 residue only |
| 17 | **PAW-32** · fr-PaperArticleWindow:88 | `PaperSectionBlocks.vue.d.ts` ships no `__VLS_Slots` (its sibling ships 2) — `figure.*`/`callout.*` implicit `any` | **NAMED REGISTER — LATEX-PAPER-RELAY** (F-W10 §2.6; the register is `X.F.W10.d`'s CREATE at `fourier/LATEX-PAPER-RELAY.md`, G-F10-5). Producer gap, no consumer cure |
| 18 | **PAW-38** · :94 | un-deduplicated title slugs collide across FOUR registries at once; LATENT (93/93 unique, `uniq -d` empty) | **NAMED REGISTER — LATEX-PAPER-RELAY**, joint P-6/P-12: the cheapest guard is precisely the harness PAW-50 proves absent |
| 19 | **PAW-39** · :95 | 51 `\section` + 31 `\subsection` flattened to one heading level; the flattener EMITS `sourceLevel` the renderer never reads | **NAMED REGISTER — LATEX-PAPER-RELAY**. **CENSUS LAW: 11 + 51 + 31 = 93 brace-anchored headings; quote 31, NEVER the readers' un-anchored 35** |
| 20 | **PAW-42** · :98 | no empty/loading/error state — **PROVEN UNREACHABLE** (build-time `virtual:paper-content`) | **KILL-WITH-RATIONALE** — epistemic record; an unreachable state is a CLOSED question |
| 21 | **PAW-45 / PAW-46** · :195/:196 | the module-scoped-cache trio's latex halves | **NAMED REGISTER — LATEX-PAPER-RELAY** |
| 22 | **GAB-29** · fr-GalleryAdminBanner:74 | MetricPill is barrel-only-reachable and has **NO source at 8.0.0** (dies with MetricBadge) | **KILL-AS-DESTINATION, RECORDED AS FALSIFIER** — load-bearing for F.W1's budget; it keeps the wave off TWO dead primitives. Never a destination |
| 23 | **FR-COB-20** · fr-CanvasOverlayButton:74 | interaction contract entirely implicit; *"dies with the file"*; the tree favoured DELETE | **NAMED WAVE — F.W0's F8-REACH-02 verb.** Ruled **DELETE** at COHESION §0j.D (`G-10`) and **EXECUTED**: `X.F.W10.b` verified both files GONE, **no HOLD surviving**. F.W10's claim is the VERIFICATION, never a re-booking |

#### §4.2.B — the strict remainder RE-DERIVED FROM THE 66: 36 rows (F-W10 §2.5a)

| # | banked id · anchor | mechanism, one line | TERMINAL VERB |
|---|---|---|---|
| 24 | **FR-NP-11** · fr-NotationPills:52 | PRM squish, unlayered-dist mechanism, harm bounded, cured at 7.0.0 | **BH-RELAY + FOLD-WITH-TARGET → banked FR-COB-12** (producer) — no new booking; rides FR-COB-12's send at O-20 **A-3**, never a second letter |
| 25 | **FR-NP-26** · :67 | clsx + cva live runtime externals; peer enumeration corrected | **CENSUS-INPUT** — census correction, SS-3/SS-4 |
| 26 | **MM-6** · fr-ContourEditorCanvas:92 | `lane-frontend.md:118` describes a composable with neither pan nor zoom; the row propagated into L-7's killed cure | **CENSUS-INPUT** — SS-3/SS-4 spec-authoring input |
| 27 | **`L-§4 / R5-7`** · :96 | the `<circle`/`v-for` split defeats a same-line deriver; same-line = **8**, not 5 (K-17) | **FOLD-WITH-TARGET → intake R5-7** (identity kept), landing in **CENSUS-INPUT** |
| 28 | **FR-EQC-15** · fr-EqCoefficientsPanel:52 | the C axis's citations into `CoefficientsSpectrum.vue` run late (+5..+11, growing down-file) on a HEAD-clean file | **CENSUS-INPUT** — and an input to **F.W0's G-11 anchor table**, quoted never re-performed |
| 29 | **D/m-12** · :76 | 21 sites / 14 files (the shim's *"14"* and the lane's *"25"* both wrong, in opposite directions) | **CENSUS-INPUT + CITE F.W0's G-12 denominator table** — **F.W1 sizing uses 21**; this block books no re-count |
| 30 | **FR-GIG-20** · fr-GalleryInfiniteGrid:82 | the 8-line GalleryCard binding block instantiated at 4 sites / 3 components | **CENSUS-INPUT** — SS-3/SS-4 repair-unit sizing. Its `MISS-5` restatement is the same identity, one home (§4.2.E) |
| 31 | **FR-GV-37** · fr-GalleryView:79 | 442 lines, four responsibilities; the batch feature's only coupling is `adminMode`+`activeTab` | **CENSUS-INPUT** — an extraction seam for spec authors, not a wave's defect |
| 32 | **`F-6 (= C-C-9 = L-15)`** · fr-GalleryDraftsSection:49 | the template-`src`-binding operation edge is structurally invisible to a function-keyed operation↔client model | **CITE-CONSUMING-WAVE — F.W5** (adopted there as the D1 register's SECOND blindness lock, beside COUNTING LOCK K-1). Terminal by citation; nothing booked |
| 33 | **m-18** · :83 | all three axes declare `cd26c65` while reading the dirty worktree; extends banked `fr-CollapsibleSection F-1` | **CENSUS-INPUT (fleet method)**, tied to **GAB-13's F.W0 baseline ruling** — OG-F1 ruled **WORKTREE-AS-BASELINE** (§0j.D), so **the disclosure line IS the disposition** and it is written |
| 34 | **`HLG-32 · MISSED-2`** · fr-HarmonicLevelGrid:88 | glass 4.0.0's unlayered `components.css` defeats its own `@layer components` PRM press guard | **BH-RELAY + FOLD-WITH-TARGET → banked FR-COB-8 (producer CLASS) + FR-COB-12 (the instance)** — novelty struck at its register; this component recorded as a further instance site. The class is **already disposed**: NWO-1 **S-2** (I-32 `A-3` CURE-NEXT-MAJOR) — never re-sent |
| 35 | **FR-MSP-12** · fr-MorphShapePreview:104 | the machine-synthesized non-`color-mix` fallback paints accent-on-accent, outside any layer | **BH-RELAY + FOLD-WITH-TARGET → FR-COB-26 (new site)**. **Disposed**: NWO-1 **S-6** (I-32 `A-12` ROUTE → fourier; producer share measured zero) — the routing is the producer's answer, not a consumer cure |
| 36 | **FR-COB-7** · fr-CanvasOverlayButton:56 | composed cascade: single-channel pressed register + dead `glass` hover/active border arms | **BH-RELAY** — packet item 1. **Disposed**: NWO-1 **S-1** (I-32 `A-11a` KILL ⊕ `A-11b` ANSWER); §4's own row records it; **not re-sent** |
| 37 | **FR-COB-8** · :57 | glass ships pre-compiled utilities UNLAYERED, structurally outranking its own layered a11y resets | **BH-RELAY** — packet item 2, the CLASS `HLG-32` and `D-19` fold into. **Disposed**: NWO-1 **S-2**, CURE-NEXT-MAJOR at 10.0.0 |
| 38 | **FR-COB-23** · :82 | focus-ring contrast ≈**1.94:1** against `--background`, both readers concordant | **BH-RELAY** — packet item 4. **Disposed**: NWO-1 **S-4** (I-32 `A-11c` KILL; cured above our pin) |
| 39 | **FR-COB-26** · :85 | the generated non-`color-mix` fallback paints solid `var(--foreground)` under `text-foreground` ink | **BH-RELAY** — packet item 5; FR-MSP-12 folds here. **Disposed**: NWO-1 **S-5** (I-32 `A-11d` CURE-NOW) |
| 40 | **FR-COB-28** · :87 | **the relay-instruction row itself** — the corpus carried ONE relay instruction where the invariant requires all | **BH-RELAY — THE PACKET.** Every BH-RELAY verb in this block resolves into it; FR-NP-32 rides at its TOP. **G-F10-12 tests the packet's RECEIPT, not its authorship** — O-20 ⊕ NWO-1 ⊕ O-30 ⊕ O-32 are the dispatched instances |
| 41 | **M-16** (**fr-CoefficientsSpectrum**:68, record-qualified) | the corpus's producer layer is pinned to a producer that MOVED (v7.0.0-322 → -393); three tag→HEAD inversions banked | **CITE-CONSUMING-WAVE — F.W1's re-pin gate** (derive the break surface at the ADOPTED commit) **+ CENSUS-INPUT** — producer evidence carries the COMMIT HASH, never the version string (F.W0 G-13) |
| 42 | **M-16** (**fr-MobileFloatingToc**:66, record-qualified — a **HOMONYM**, never merged) | two PaperSearch hosts over one shared state (PaperSidebar mounted at ALL viewports, CSS-only hide) | **CITE-CONSUMING-WAVE — F.W3**, settled at `F-W3.md` §X.1-v4 §5 by the file criterion. Scrim leg K-12; census leg folds to banked FV-27 — **no re-booking, never folded into the CoefficientsSpectrum homonym** |
| 43 | **C-18** · fr-AnimationControls:120 | zero value.js colour consumption in the tree's most colour-dense transport surface (`colors.ts` honestly out of graph) | **CITE-CONSUMING-WAVE — F.W2** (the colors.ts-deletion denominator twin of D1's C-25); nothing booked |
| 44 | **L-8** · :124 | R5-7's blind-spot class transposed: two `v-if/v-else` icon twins invisible to an `:is`-keyed budget | **CENSUS-INPUT** — a scope-of-budget claim, not a runtime defect; remainder-upheld |
| 45 | **C-25** · fr-CanvasControlsDock:96 | zero value.js and zero keyframes.js consumption — this file's F.W2 migration cost is zero | **CITE-CONSUMING-WAVE — F.W2** (the migration-cost denominator) **+ CENSUS-INPUT** |
| 46 | **M-10** · :100 | systematic L-axis line-citation drift against the dirty `VisualizationView.vue` | **CENSUS-INPUT + input to F.W0's G-11 anchor table** — quoted, never re-resolved here |
| 47 | **m-14** · fr-CollapsibleSection:71 | a conditional GATE on the R5-7 derived-evidence surface with **inverted polarity** | **CENSUS-INPUT** — SS-3/SS-4 methodology; paired with `i-8`'s positive control |
| 48 | **i-7** · :83 | the corpus never reconciled its three-way severity spread (same facts at three severities) | **CENSUS-INPUT** — corpus-composition input, the sibling of FR-AFP-52 |
| 49 | **i-3** · fr-ContourSettings:100 | the one panel owning the compute pipeline is the one panel defaulting COLLAPSED, its body inert | **CENSUS-INPUT** — SS-3/SS-4 corpus row; no consumer cure booked. *(Distinct from §4's `fr-ContourSettings i-1` owner-ruling row and from §0x's ruled `i-3` — different axes, disclosed so neither is read onto the other)* |
| 50 | **i-8** · :105 | the R5-7 class does not bite here (the file's one `v-for` is a component callsite) — its **dual** does | **CENSUS-INPUT** — a derivation recommendation, not a defect |
| 51 | **D-19** · fr-ConvergenceLegend:97 | Vue scoped styles are unlayered; glass's ladder opens `@layer components` — unlayered wins categorically | **CENSUS-INPUT, verbatim**: *"the durable fix is a lint rule (unlayered-scoped-vs-system), a spec-authoring input for SS-3/SS-4, not a per-component edit"* — folds to FR-COB-8's class for the producer half |
| 52 | **I-3** · fr-DarkModeToggle:111 | the C axis's self-repo citations drift ~10–11 lines while its `node_modules` citations are byte-exact | **CENSUS-INPUT + input to F.W0's G-11 anchor table** (one of G-11's own named drift registers) |
| 53 | **CITE** · fr-EasingCurvePreview:68 | the D axis's provenance is systematically mis-anchored — one citation past EOF inside its highest-severity carry | **NAMED WAVE — F.W0's G-11**, which names this register by name; this block quotes the published table and re-resolves nothing |
| 54 | **`D-2 / L-3 / C-1`** · fr-EditorControlsDock:51 | the magnet retint block is 100% dead (`--slider-scrub-*` is not a token namespace at 4.0.0; even `width:100%` a no-op per K-8) | **NAMED WAVE — F.W3**, settled at `F-W3.md` §X.1-v4 §5 (`.a` arm, one deletable block) — **cited, not re-booked**. No new F.W10 work |
| 55 | **L-m5** · fr-FunctionInput:62 | `./chip` ABSENT at the installed 4.0.0; `./toggle-chip` present; CENSUS:100 routes NotationPills to `./chip` unqualified | **NAMED WAVE — F.W3** (the record's own routing) **+ CENSUS-INPUT** for the census cell. §4's F.W3 row records the qualifier **RESOLVED at the adopted pin** (`./chip` present, `./toggle-chip` absent at 8.0.0) |
| 56 | **L-i1** · :82 | the R5-7 native-template-loop class does not apply (both `v-for`s are component callsites) — a **positive control** | **CENSUS-INPUT** — a negative finding is a terminal disposition; manufacture no work |
| 57 | **`L·I-2-as-corrected / R5-7`** · fr-GalleryCard:87 | the callsite-keyed-deriver blindness is genuine but L's instance was mis-derived; corrected form recorded | **CENSUS-INPUT** — SS-3/SS-4 census-methodology |
| 58 | **D-26** · fr-VisualizationView:99 | underline indicator element never rendered — anchor-positioning-only by construction | **BH-RELAY (producer, verbatim: *"NO-WAVE-OWNER (producer, glass BH relay)"*)**; engine matrix → SS-13. **LIVE — never sent under its own term across all fifteen outbound glass packets (measured 0, twice); it ACCRETES at §4a row `F10-1`** |
| 59 | **★MF-7** · fr-PaperView:113 | permanent `will-change: opacity` on a fixed full-viewport overlay — a standing compositor layer for far-jump-only chrome | **CITE-CONSUMING-WAVE — F.W4** (set/clear inside `withOverlay`, per the record's own verb) **+ CENSUS-INPUT** for the referral-drop process note |

#### §4.2.C — the SIXTEEN corpus-derived escapes, the rows no check file looked at: 16 (F-W10 §2.5a-ii)

*Record line anchors are lawful here and only here — the registry is the **frozen corpus** (R2-2 clause 2(i)).*

| # | banked id · anchor | in-record disposition, the record's own words | TERMINAL VERB |
|---|---|---|---|
| 60 | **`R2-missed-1`** (fr-ImageUpload's, record-qualified) · :45, MAJOR | *"The corpus never swept the adjudicated registry … → NO-WAVE-OWNER (procedural — binds SS-3/SS-4 spec authoring …: REGISTRY-FIRST is a precondition, not a courtesy)."* | **CENSUS-INPUT** — adopted in the record's own words. **This row is the mechanism of the very defect it names**, twice over, and is recorded as this drain's own falsifier. **Homonym guard**: NOT fr-UserSlugBar's lowercase `r2-MISSED-1`, an ALIAS of `FR-USB-16` cut to **F.W9** |
| 61 | **`R1-MISSED-5`** (fr-ImageUpload's, record-qualified) · :63, INFO | *"→ NO-WAVE-OWNER (spec-authoring input: propagate, don't merely preserve)."* | **CENSUS-INPUT** — a positive census (the tree's ONLY `type="button"`). A propagation candidate is not a defect and mints no work. **Homonym guard**: NOT fr-UserSlugBar's lowercase `r1-MISSED-5` |
| 62 | **C-3** · fr-GalleryInfiniteGrid:50, MAJOR | *"**FOLDS BY REFERENCE to banked FR-GFC-3 (→ F.W5-W8). Do NOT re-book.**… the orphan-client class … is carried NO-WAVE-OWNER → SS-3/SS-4 as census methodology."* | **FOLD-WITH-TARGET → banked FR-GFC-3** (the fold's wave is F.W5–W8, **cited never re-booked**) **+ CENSUS-INPUT** for the orphan-client grain. C's BLOCKER over the banked MAJOR carried as **preserved dissent** |
| 63 | **M-7** · fr-SvgFilters:91, INFO | *"Two of three axes' library proof cells are not re-runnable as published. → NO-WAVE-OWNER (fleet provenance note …)."* | **EXCLUDED-WITH-REASON — fleet provenance note** (R2-6b's own verb): a re-runnability finding about the corpus's evidence, not a surface defect. Joins the provenance register as an input to **F.W0 G-11**; books no consumer work |
| 64 | **`L:L-16`** · fr-PaperSearchDropdown:75, INFO/LATENT | *"L:L-16 — INFO, LATENT · FOLDS into banked fr-PaperSearch L-19 — NO-WAVE-OWNER.** Code-unit/code-point mismatch; 0 non-BMP code points in the live corpus… Re-measure on any paper swap."* | **NAMED FOLD → banked `fr-PaperSearch L-19`** (the target is real: `fr-PaperSearch:57`). The **re-measure trigger travels with the fold**, and the FOLD-TARGET carries its own home at row 89 |
| 65 | **`i-1 = L-INFO-2`** · fr-BasisSelector:92, INFO | *"(census correction UPHELD)… `lane-frontend.md:87`'s 'per-basis term sliders' is wrong. → NO-WAVE-OWNER (SS-3/SS-4 census input)."* | **CENSUS-INPUT** — a lane-doc correction; it lands in the CENSUS-ADDENDUM's errata beside FR-CP-44 / FR-AFP-51, **never as a lane-doc rewrite**. ⚠ **RESIDUAL, flagged not silent**: `X.F.W10.a` landed §1a #8's own enumeration and this row's erratum is **owed and not yet written** — its landing surface is outside this unit's writable set (see §4.2.F) |
| 66 | **`i-2 = L-INFO-1`** · fr-BasisSelector:93, INFO | *"→ NO-WAVE-OWNER (SS-3/SS-4 census methodology)."* | **CENSUS-INPUT** — the `NATIVE_TEMPLATE_LOOP` family's blindness to native NON-loop controls (a 2-of-4 undercount). `fr-BasisCanvas L§R5-7` **cited, never merged** |
| 67 | **`§4 method row + bypass`** · fr-VisualizationView:103 | *"Method → NO-WAVE-OWNER (SS-3/SS-4); bypass → F.W1/F.W4."* | **SPLIT EXACTLY AS BANKED — two banked halves take two verbs, never one averaged verb**: method → **CENSUS-INPUT**; the `responsive` bypass → **CITE-CONSUMING-WAVE (F.W1/F.W4)**. **`fr-VisualizationView L-26` is a DIFFERENT row on a different axis** (ruled to F.W3 by the file criterion); neither homing moves the other |
| 68 | **`i-5 = L-18`** · fr-MobileFloatingToc:93, INFO | *"INFO → NO-WAVE-OWNER (SS-3/SS-4).** `<template v-for>` (:149) is a third loop-host kind falling through both R5-7's … keying and R6-5's `NATIVE_TEMPLATE_LOOP` cure… Census methodology, not a wave row."* | **CENSUS-INPUT** — the corpus's own **third loop-host kind**, which is why the detector above is stated by SHAPE rather than assumed. *"Not a wave row"* is the record's verb and is honoured |
| 69 | **`i-5`** · fr-CoefficientsSpectrum:101, INFO | *"(a) Callsite-keyed instance budgets understate this file ~20× … → NO-WAVE-OWNER (SS-3/SS-4)… All → F.W3/W4 as riders, none needs its own item."* | **CENSUS-INPUT** on limb (a) — an SS-3/SS-4 sizing input; limbs (b)/(c)/(d) are **CITE-CONSUMING-WAVE (F.W3)**, settled at `F-W3.md` §X.1-v4's `.d` partition. **Homonym guard: NOT fr-MobileFloatingToc's `i-5 = L-18`** |
| 70 | **`31`** · fr-ContourPreview:64, MINOR | *"ADJUDICATED → NO-WAVE-OWNER (procedural — binds SS-3/SS-4 spec authoring)."* | **CENSUS-INPUT + input to F.W0 G-11** (this id is named in G-11's own carry roster). The block quotes G-11's published table and re-resolves nothing |
| 71 | **`39`** · fr-ContourPreview:72, INFO | *"ADJUDICATED → NO-WAVE-OWNER (comment/cleanup if row 40's wave touches the file; the heap-correct certification is the record)."* | **KILL-WITH-RATIONALE, conditional-cleanup form**: a dead branch whose *record* is the positive certification. No wave is scheduled; if row 40's wave opens the file the comment rides free |
| 72 | **`41`** · fr-ContourPreview:74, INFO | *"ADJUDICATED → NO-WAVE-OWNER (binds SS-3/SS-4 register)."* | **CENSUS-INPUT** — a grading-consistency rule (default-restatement is documentation-of-intent or noise, never both). Binds the register, mints no edit |
| 73 | **`i-1 = D/i-4`** · fr-CollapsibleSection:77, INFO | *"Callsite count drift in the corpus: A8-17 says 5, design-synth says 3; the tree has **4 usages / 3 files** … → NO-WAVE-OWNER (census correction, SS-3/SS-4)."* | **CENSUS-INPUT** — **quote 4/3, never 5 or 3**. **Homonym guard: NOT fr-BasisSelector's `i-1 = L-INFO-2`** (row 65) |
| 74 | **`FOLD — L-14`** · fr-EditorControlsDock:100 | *"…= the **intake R5-7** identity (already extended at fr-ContourEditorCanvas L-§4)… → NO-WAVE-OWNER with the intake identity."* | **FOLD-WITH-TARGET → intake R5-7** (identity kept, exactly as row 27 folds), landing in **CENSUS-INPUT**. No count row is minted |
| 75 | **`C §0 row 7 census correction`** · fr-FunctionInput:81, INFO | *"INFO — NO-WAVE-OWNER (SS-3/SS-4 spec authoring consumes).** `lane-frontend.md:441`'s 'currently 6× Button' is false: ONE `<Button>` callsite in a `v-for` over 3 options — the F.W3 budget is 1 line, not 6."* | **CENSUS-INPUT + F.W3 SIZING CORRECTION, cited not booked**. §4's F.W3 row already records the *"6× Button"* figure as **a record superseded by measurement, never quoted** |

#### §4.2.D — the FRESH DERIVATION's own landings: 14 rows (F-W10 §2.5a-iii(c))

*Three are the `fr-PathPreview` escapes no check file's set C contained and **no F wave settles**; ten are rows a
round filed under a class verb while the corpus's own detector grades them **STRICT** at the bytes; one is the
prose-strict 69th. **A strict disposition is owed a per-id terminal verb** — today, not on some later re-grading.*

| # | banked id · anchor | why it lands here | TERMINAL VERB |
|---|---|---|---|
| 76 | **PP-CENSUS** (L-1, census-integrity half) · fr-PathPreview:31, MINOR | arrow-form strict: *"MINOR → NO-WAVE-OWNER (M-25 errata; SS-3/SS-4 must read the registry over `lane-frontend.md:183/:366/:369/:444/:565`, which describe a dead component as a live bespoke surface)."* | **CENSUS-INPUT** — the five lane-doc errata land in the CENSUS-ADDENDUM, **never as a lane-doc rewrite**. **The drain's SECOND self-falsifier**: a row whose content is *"SS-3/SS-4 must read the registry"* is exactly the row a drain reading a check file could not see. ⚠ Same **flagged residual** as row 65 |
| 77 | **PP-AGGLOM** · :69, INFO | arrow-form strict: *"INFO → NO-WAVE-OWNER (M-25 intake strike-list, SS-3/SS-4)."* — *"Intake MUST strike at agglomeration or F.W4 double-books."* | **CENSUS-INPUT + CITE-CONSUMING-WAVE (F.W4's strike-at-agglomeration)**: F.W4 **consumes** the strike and says so in terms (*"consumed, not settled here"*), so the **terminal** disposition books HERE and F.W4's consumption is cited, never counted as the home |
| 78 | **PP-SEVLAW** · :70, INFO | arrow-form strict: *"INFO → NO-WAVE-OWNER (spec-authoring input)."* the remount severity law *"must not be inherited by F.W4 as present grades: the correct reading is MINOR-with-a-fork, and the wire branch is EXPENSIVE"* | **CENSUS-INPUT** — a **grading law**, its cost note travelling with it byte-true: *"Every row above marked "wire branch" prices in only there."* F.W4 is cited as the wave it binds and books nothing new |
| 79 | **`FR-TT-21 = L-11`** · fr-Tooltip:55, INFO | **STRICT (bold-terminal)**: *"NO-WAVE-OWNER (SS-3/SS-4 spec authoring consumes the correction)."* R3-7a's *"+1/+3"* parenthetical is a grep artefact | **CENSUS-INPUT + CORRECTED DENOMINATOR, binding**: the shim budget is **35 callsites / 9 consumers** — the figure F-W10 §4b's F.W3 edge quotes. It is **a different denominator on a different axis** from FR-TT-1's **17**-trigger census; neither is quoted for the other |
| 80 | **`FR-TT-22 = C-10`** · fr-Tooltip:56, INFO | **STRICT**: *"NO-WAVE-OWNER."* zero coupling to value.js / keyframes.js / the 45-op API; the chain terminates at reka + Vue | **CENSUS-INPUT — a NEGATIVE BUDGET STATEMENT, terminal as such**, byte-true: *"A zero-cost row on the F.W2 ledger — a negative budget statement."* Joins C-18 and C-25 as an F.W2 migration-cost input, **cited to F.W2, booked nowhere new** |
| 81 | **`FR-USB-34 · D-i1 ⊕ r2-MISSED-3 ⊕ L-14`** · fr-UserSlugBar:77, INFO | **STRICT**: *"NO-WAVE-OWNER (epistemic record + registry correction)."* three dead guards inside `v-if="isLoggedIn"`; carries **RC-4** | **CENSUS-INPUT + REGISTRY CORRECTION carried against interest**: *"the cure prescription there survives, but its provenance points at a provably dead line; re-point."* **FR-EQR-25 is not re-graded and not re-booked** — only its provenance is corrected |
| 82 | **`FR-USB-37 · C-i2`** · :80, INFO | **STRICT**: *"NO-WAVE-OWNER (record; FR-USB-13's cure will likely rework the attribute anyway)."* the bearer credential sits in a `title` attribute on a globally mounted element | **KILL-WITH-RATIONALE, conditional-cleanup form** (the shape row 71 takes): no wave is scheduled; if FR-USB-13's cure opens the attribute the change rides free. The record IS the disposition |
| 83 | **`FR-USB-38 · L-16 / L-17 / D-i2 / C-i3`** · :81, INFO | **STRICT**: *"NO-WAVE-OWNER."* zero value.js / keyframes / canvas / rAF / listener / timer contact | **CENSUS-INPUT + F.W2 EXCLUSION LOCK, verbatim with the corpus's own emphasis**: *"**do NOT book this component into the F.W2 migration surface**"*. **Homonym guard**: this row's `D-i2` is fr-UserSlugBar's alias — **`D-i2` is never a bare identity** (SEVEN records carry the token) |
| 84 | **PAW-56** · fr-PaperArticleWindow:293, INFO | **STRICT**: *"NO-WAVE-OWNER locally (latent, margin-1)"*. the `--section-color` ramp has exactly ONE spare stop and its overflow is silent and total — 13 stops vs 12 top-level entries; a thirteenth ⇒ all six heading-colour declarations drop at once | **NAMED REGISTER — LATEX-PAPER-RELAY**, joining PAW-32/38/39/45/46. It **EXTENDS PAW-1's ramp cell — new mechanism, never a re-book** — and is the producer-side twin of ★MF-10's consumer cure. **SC-3 honoured**: the anchor is `dist :1404`; no producer-src path is cited |
| 85 | **`FR-FG-23 = DU-missed-5`** · fr-FrequencyGraph:61, INFO | **STRICT**: *"NO-WAVE-OWNER."* It restates FR-CP-45 as **document-scoped, not axis-scoped**: *"a spec applying FR-CP-45 verbatim would discard 24 good anchors to guard one."* | **CENSUS-INPUT — and a BINDING CONSTRAINT ON THE LAW ROW 15 ADOPTS.** The law as applied is **DOCUMENT-scoped**. Recorded against interest: the axis-scoped reading would have discarded 24 sound anchors |
| 86 | **`m-4 = D/m-9 = L-10 = C-16 + D/i-3 ∘ DU-missed-5`** · fr-CollapsibleSection:61, MINOR | **STRICT, and a SPLIT ROW**: the cell routes *"→ F.W3/W4 (gap + shrink-0 land with the first consumer) + NO-WAVE-OWNER"* | **SPLIT EXACTLY AS BANKED — two halves, two verbs**: the geometry half is **CITE-CONSUMING-WAVE — F.W3** (`F-W3.md` §X.1-v4 §5's `.d` row); the **A-3-new half is CENSUS-INPUT** — the M-audit's HIGH ask rests on a premise this record falsifies, and the bank's verb is *re-argue before booking upstream*, an SS-3/SS-4 act. **Homonym guard: SEVENTEEN records head or alias an `m-4`; this one is fr-CollapsibleSection's** |
| 87 | **`D-i2`** · fr-PaperSearchInput:82, INFO | **STRICT**: *"NO-WAVE-OWNER — SS-3/SS-4 spec-authoring input."* the focus-state CHANGE measures ≈**1.71:1**, an AAA-2.4.13-register figure | **CENSUS-INPUT, with the corrected denominator binding: quote 1.930:1 for the AA comparison; NEVER 1.71:1** — byte-true: *"Recorded so the forming specs cite each figure under its right criterion."* A criterion-attribution law, not a defect. Record-qualified against the seven-record `D-i2` class |
| 88 | **``fr-BasisCanvas L §R5-7``** · fr-BasisCanvas:106, INFO | **STRICT (arrow-form)**: *"→ NO-WAVE-OWNER (SS-3/SS-4 spec-authoring input; census methodology, not a repair)."* a 9-line template hides N interactive controls with 0 DOM nodes | **CENSUS-INPUT — the identity row 13's FR-CP-43 folds ONTO, so this identity carries the terminal verb, once, here.** ▲ **`fr-ExportModal L-16` FOLDS HERE** (same anchor `:106`), **one home, no re-book**. **Homonym guard: `L-16` is a SIX-record banked head** — neither fr-UserSlugBar's alias (row 83) nor fr-PaperSearchDropdown's `L:L-16` (row 64) is fr-ExportModal's |
| 89 | **``L-19+C-N1``** · fr-PaperSearch:57, INFO-rollup — **the 69th strict disposition** | **PROSE-STRICT**, the *"Infos (7 carried)"* rollup walked to its enclosing row id: *"… · L-19+C-N1 (**NO-WAVE-OWNER** bank) · …"*. It is the **surviving identity of row 64's fold, never the folded one**, and the canonical homes it as a packet row | **NEXT-BOUNDARY LEDGER — CENSUS-INPUT (SS-3/SS-4), carrying the fold's re-measure trigger**: a standing re-measure condition on a latent, currently-vacuous defect — a closed question with a named reopening trigger. **Homonym guard**: this `L-19` is fr-PaperSearch's banked row id — not the LESSON `L-19`, not fr-AdminAuditLog's alias, not fr-VisualizationView's `L-19` (canonical **F.W4**) |

#### §4.2.E — the WEAK class, ENUMERATED WHOLE: 32 row-level lines / 19 records · **ONE class verb**

**Enumerated so predicate and roster regenerate each other in BOTH directions** — a headline is precisely what let
two earlier rounds pass. The class is given by `(record : line → head id)`, carried from F-W10 §2.5a-iii(d) and
re-measured at this seat as **32 lines / 19 records** by the `$BOIL`/`$ROW`/`$STRICT` predicate above:

`fr-AdminFlaggedPanel` **:112** `FR-AFP-51 · L-27` · **:113** `FR-AFP-52` — `fr-App` **:82** `MG-ι` · **:86** `i-2` ·
**:90** `C-12` — `fr-CanvasOverlayButton` **:68** `FR-COB-14` — `fr-CoefficientsSpectrum` **:68** `M-16` —
`fr-DarkModeToggle` **:164** *(numbered lesson 4 — **no banked row id**)* — `fr-EquationResult` **:42**
`FR-EQR-7 = D-9` — `fr-EquationView` **:191** *(fold list; its routed limb is `C·D-28`)* — `fr-FrequencyGraph`
**:58** `FR-FG-20 = D:i-5` — `fr-FunctionInput` **:54** `N-1` · **:62** `L-m5` · **:81** `C §0 row 7` · **:82**
`L-i1` — `fr-GalleryCard` **:87** `L·I-2-as-corrected / R5-7` — `fr-GalleryCardModal` **:93** `GCM-42 · L-14` —
`fr-GalleryInfiniteGrid` **:82** `FR-GIG-20` · **:112** `MISS-5` — `fr-GalleryView` **:79** `FR-GV-37 = L-20` —
`fr-HarmonicLevelGrid` **:26** *(the STRUCK "unbanked" claim; banked identity `HLG-32 · MISSED-2`)* · **:88**
`HLG-32 · MISSED-2` — `fr-InfoCard` **:47** `FR-IC-11` *(a five-id rollup line)* — `fr-MorphShapePreview` **:22**
`FR-MSP-12` *(the admission)* · **:104** `FR-MSP-12` — `fr-NotationPills` **:35** `FR-NP-32` · **:52** `FR-NP-11` ·
**:67** `FR-NP-26` — `fr-PaperArticleWindow` **:88** `PAW-32` · **:94** `PAW-38` · **:95** `PAW-39` —
`fr-PaperSearchDropdown` **:75** `L:L-16`.

**What the enumeration reveals.** **TWENTY-SIX of the 32 already carry a PER-ID TERMINAL VERB above** and are
**cited here, re-booked nowhere**: rows 1 · 5 · 6 · 8 · 9 · 10 · 17 · 18 · 19 · 24 · 25 · 30 · 31 · 34 · 35 · 41 ·
55 · 56 · 57 · 64 · 75 of this block, plus `GCM-42` and `C·D-28` (cut to **F.W9** at F-W10 §2.2's re-cut table),
`MISS-5` (`FR-GIG-20`'s restatement — **one home, no re-book**; a packet-homed head id disposed only as another
id's restatement would be a citation by demotion, so the relation is stated as a relation), and the
`fr-HarmonicLevelGrid:26` struck-claim line whose banked identity is row 34's.

**SIX take the class verb, and they are NAMED rather than left inside a headline**: **`FR-COB-14`** (fallthrough
defeats every pinned attribute) · **`FR-EQR-7 = D-9`** (success glyph **2.101** vs the 3:1 floor; the design
system's own light `--success` fails at **2.175** — the cure is the producer's, and it is **already disposed**:
NWO-1 **S-11**, I-32 `C-1` ANSWER + CURE-NOW) · **`FR-FG-20 = D:i-5`** (a *stronger* census statement than D's:
**ZERO F.W1 break surface** in this file) · **`N-1`** (the `variant="default"` CTA demoted by the 3.1→4.0 bump;
its NO-WAVE-OWNER limb is an explicit **rider**, the DESIGN.md correction) · **`FR-IC-11`** (a MINOR-latent inside
a five-id rollup whose routings stand) · **`fr-DarkModeToggle`'s numbered lesson 4** (*"a reader return SHOULD
carry a 'registry collisions checked' cell"* — **no banked row id exists to book**).

▲ **THE CLASS VERB, one disposition over the six**: **NEXT-BOUNDARY LEDGER — CENSUS-INPUT (SS-3/SS-4
corpus-composition)**. **Why a class verb is lawful here and was never lawful for the ten at §4.2.D**: in every one
of the 32, NO-WAVE-OWNER is a **rider or an in-line mention on a row whose terminal disposition is something
else** — stated as a description of the measured class, never as a re-definition of the predicate. **Any row later
re-graded to a strict disposition re-enters at its banked id through the §4.2.D shape.**

**`MISSED-2` is RECORD-QUALIFIED and the qualification is itself a finding**: three records carry the token
(`fr-ImageUpload`'s `R1-MISSED-2` · `fr-UserSlugBar`'s `r1-`/`r2-MISSED-2` · `fr-HarmonicLevelGrid`'s bare
`MISSED-2`), of which only fr-HarmonicLevelGrid's carries a NO-WAVE-OWNER disposition — **and that identity is
already booked strictly at row 34**. A bare short token is not an identity (R-5); the law reaches `MISSED-2`,
`D-i2` (7 records), `m-4` (17), `L-19` (16), `L-16` (6), `M-16`, `i-5` and `i-1` alike, and every one of them is
disclosed above.

#### §4.2.F — the ESCAPE TEST against the CENSUS OF RECORD, and the gate reading

**The census operand is named once and does not move** (F-W10 §2.5b · R4-3 · R4-10):
`docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md`, **sha256 `f44362757458`** ⟨cmd⟩ this seat, 2026-09-20,
`shasum -a 256 … | cut -c1-12`, **double-run, identical** — so a later rewrite of that file is detectable rather
than deceptive. *A gate that cites another census operand is DEFECTIVE on sight.*

**F.W10's record-side roster is ZERO, by the canonical's own enumeration and not by this block's assertion**:
⟨cmd⟩ `grep -c '^### F\.W10' "$C"` → **0**, twice — §2 carries per-wave rosters for F.W0 · F.W1 · F.W2 · F.W3 ·
F.W4 · F.W5 · F.W5-W8 · F.W9 and **no F.W10 header at all**. The drain **never was a wave-side roster**: its rows
are terminal dispositions over rows the canonical homes at a **PACKET**.

| canonical packet home | rows | this block |
|---|---|---|
| `NWO (packet)` | **32** | booked or cited |
| `NWO→SS-3` | **27** | booked or cited |
| `NWO→SS-13` | **3** | booked or cited |
| `NWO→SS-5` | **3** | booked or cited |
| **the drain's canonical operand** | **65** | **65 booked or cited · 0 escaped** |

**The test, run record-qualified** (an id alone is not an identity, which is how two rows escaped four earlier
passes): each of the 65 `(record, id)` pairs was read from §2's four NWO rosters at the pinned bytes and resolved
against §4.2.A–E. **Sixty-three resolve to a per-id row above; two resolve through §4.2.E's named six** —
**`fr-CanvasOverlayButton FR-COB-14`** (`NWO→SS-3`) and **`fr-GalleryInfiniteGrid MISS-5`** (`NWO→SS-5`, carried as
`FR-GIG-20`'s restatement, one home) — and **both are named, not left inside a headline**, which is the whole
reason the class was enumerated. **Zero escaped.**

**FABRICATION TEST, the other direction** (*"an id booked that the canonical does not home there is that wave's
fabrication"*): since F.W10's canonical roster is empty, every id-bearing cell of the **§2.2 re-cut table** must be
a citation. The two that were not — `FR-TT-1` (canonical **F.W4**) and `PAW-50` (canonical **F.W9**) — are the
spec's own disclosed **PENDING PAIRED EDITS** inside the SHARED §2.2 splice bytes, re-disclosed and **NOT applied**
by `X.F.W10.a`; `FR-TT-1`'s half discharged at repair round 6 to cite-the-holder. **None of them is a row of this
block**, which books only §2.5/§2.5a/§2.5a-ii/§2.5a-iii identities.

**GATE — G-F10-7: RED → GREEN.** BEFORE (this wave's baseline, 2026-09-19): *"COHESION §4 is live-seeded from SS-7
batch 1, every row an X·V slug, **ZERO fourier rows**"* — re-read at this seat's own clock and found to carry
**one** fourier block, **F.W3's S-8 EMISSION**, a *different* population which is **cited and never counted in**;
the F.W10 drain block was **ABSENT**. AFTER: §4 carries this fourier block and **every row of the reconciled
89-row roster bears a TERMINAL verb** from the closed alphabet; **FR-NP-32 heads the table** (§4.2.A row 1);
**`fr-App C-12` lands as the NEGATIVE record verbatim** (§4.2.A row 9); the weak class carries its **one class
verb** over a roster **enumerated whole**. Against the gate's own falsifiers: the roster is **derived from the 66**,
never from a check file; the detector is stated **inline, in both dash spellings and all three row shapes**, and
excludes the taxonomy **by SHAPE**; the partition's arithmetic **closes** (`31 ⊕ 68 ⊕ 32 ⊕ 1 ⊕ 33 = 165`); **no
class verb stands where the detector grades a row STRICT**; and **no roster homes a subset and calls it
zero-left-open** — the escape test above is run against the **canonical**, record-qualified, and returns **65 · 0**.

**THE ALPHABET, MEASURED OVER THE SETTLED BYTES AND DISCLOSED WHERE IT IS WIDER THAN FIVE WORDS.** ⟨cmd⟩ this
seat, double-run, identical: over the block's **89** numbered rows, **89** carry a terminal verb and **0** carry
none. **Seven of the 89 carry the corpus's OWN banked wording rather than a five-family spelling**, and they are
named rather than smoothed into the alphabet: **`BOOKED HERE`** (rows 5 · 14 — a census correction landing in the
CENSUS-ADDENDUM, i.e. a NEXT-BOUNDARY LEDGER / CENSUS-INPUT shape), **`ADOPTED AS LAW`** (row 15 — FR-CP-45, whose
disposition is that the spec binds itself to it), **`NAMED FOLD`** (row 64 — a FOLD-WITH-TARGET at a named banked
target), **`KILL-AS-DESTINATION`** (row 22 — a KILL-WITH-RATIONALE that survives as a falsifier), and **`SPLIT
EXACTLY AS BANKED`** (rows 67 · 86 — **two banked halves, two verbs, never one averaged verb**). *A row's banked
words are kept; what is measured is that every row is terminal, and the mapping is published instead of asserted.*

⚠ **ONE RESIDUAL, FLAGGED RATHER THAN SILENT — it is a bounds fact, not a missing disposition.** Rows **65**
(`i-1 = L-INFO-2`) and **76** (`PP-CENSUS`) name `formation/fourier/CENSUS-ADDENDUM-2026-08-25.md` as the landing
surface for their lane-doc errata. Both rows carry their **terminal verb** here, which is what §3.3's deadline
requires; what is outstanding is the **erratum text** in that addendum, whose path is **outside this unit's
writable set** (`X.F.W10.a` wrote §1a #8's own enumeration and did not reach into a sibling unit's sections).
**Either the close seat lands the two errata, or they are explicitly re-homed** — named here so no reader mistakes
the silence for an oversight, and carried to `X.F.W10.g` as an open bounds question.

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
| **F.W3 ACCRETION 2026-09-19** (X.F.W3.f, `claude-fable-5-1` — g20 in the S-15 form, spec `F-W3.md:417`/`:435` addenda): reconciled against **O-20** (sha256 `f6e04c86ddb8`, unmoved) ⊕ **I-32/I-33** (its dispositions) ⊕ **NWO-1** (F.W1's relay, `fourier-to-glass-2026-09-17-nwo1-bh-relay.md`) ⊕ **O-32/O-33** (F.W4's relays). **STATUS-NOTES — dispatched, NEVER re-sent (8, not the addendum's 5)**: `PD-1` (A-10 → CURE-NOW comments) · `--viz-easing`→`--motion-accent` (B-4 → KILL) · `./clipboard` (B-5 → DECLINE; ships on `./dom`) · `--viz-amber` + cartoon retirement (B-4/§D-2 → KILL; *"4.518 under your 8% wash … the wash inversion persists and is yours by your own ruling"* — §C.E's wash-not-token cure confirmed) · DOCK-ACTIVE (§D-1) · **`AX-1`/`CU-1`** (B-6 → CURE-NOW) · **`FR-COB-7`** (A-11 → A-11a KILL ⊕ A-11b ANSWER; NWO-1 S-1) · **`AA-3`** (WITHDRAWN with cause, O-32 §1.2). Reconciliation record: `docs/tranches/X/fourier/F-W3-DO-NOT-EXECUTE.md` §5–§6; transcript `fourier/evidence/w3/g20-X-F-W3-f.txt`. **Rows F3-1..F3-13 below are the RESIDUAL**, each a producer row, none a frontend hack, glass-ui READ-ONLY at every seat (`git -C ../glass-ui status --porcelain` → 0) | | |
| F3-1 | `fr-GlassTimeline LF-1` limb (b) — producer information: the shipped drag surface wrote an inline `left`% every frame against the producer's own "NEVER `style.left`" rule. The consumer limb (a) is LANDED (`.a` `f36541a`: the playhead rides `inset-inline-start: calc(var(--caret-t) * 100%)`, one custom property, no `style.left`) | `.a` receipt, `execution/C/F-W3.md` (§C.A row); `adjudicated/fr-GlassTimeline.md` |
| F3-2 | `fr-CanvasOverlayButton FR-COB-22` — a REGISTER NOTE, not an ask: the 0.40 glyph-to-box ratio is scale-invariant by construction and deliberate, but thin against the 0.50–0.60 icon-button register; no consumer cell re-tunes a producer constant (S-5) | `.e` residual 7 |
| F3-3 | `./confirm-dialog`'s retirement note (fr-AdminUserList `FR-AUL-28` ⊕ fr-GalleryView `FR-GV-4` ⊕ fr-GalleryMarquee `GM-22`): TRUE at 4.0.0, retired at 7.0.0 with three hand-rolled consumers standing, absent from the 8.0.0 export map — the consumer moved onto the in-file `./dialog` pattern (`.d` `11a0351`); relayed as an instance for the per-major class/subpath-removal manifest O-20 B-3 already asks for | `.d` Act 3 |
| F3-4 | `fr-CollapsibleSection M-5` — QUESTION: is the bare `Collapsible` trigger MEANT to ship affordance-free (the `.disclosure-trigger` hover rung)? The Accordion asymmetry is the cite | `.d` residual 7 |
| F3-5 | `fr-Tooltip FR-TT-13` — the producer ships NO floating-offset token, so every consumer necessarily authors a number (three uncoordinated gaps existed in one dock); ask: one token, or a documented rule. The consumer promoted its gap to a declared parameter meanwhile (`.e` `511cbd0`) | `.e` residual 7 |
| F3-6 | `fr-PaperArticleWindow PAW-53` (SC-10) — the adopted `as-child` Button chassis needs a real border under `forced-colors`, or the glass-ui rung extended to it; refused as a consumer rider at `.d` `8eca678` because it is producer-owned | `.d` residual 7 |
| F3-7 | the `--tier-*` token family (fr-GalleryCard `G-DU8` ⊕ `D-5`; the AA-3 precedent) — **a RIDER on NWO-1 §3 L-4**, which already asks the tier-tint's HOME and GAB's 3.26:1 label rung: this row adds only the chip-plate ask (a self-tinted 12% plate token for the tier chip, so consumers stop re-deriving `.basis-tint`'s recipe) and is never a second send of L-4 | spec §C.J `:371`; NWO-1 L-4 |
| F3-8 | `fr-GlassTimeline R-1[D-14-fallback]` (NEW, raised at `.a`): the producer's default fill measures **1.308:1 light / 1.920:1 dark** against the producer's own default track — uncurable from any consumer | `.a` residual 1 |
| F3-9 | `EasingCurve`'s axis captions are HTML text inside the plot (`aria-hidden` `<span>`s `0`/`1`): right for the a11y tree, wrong for every primitive that derives a label from `textContent` — reka's `SelectItemText` and the menu/select typeahead both do, so a `SelectItem` embedding reads `"01 Linear"` with a dead typeahead (measured at `.b` before the local cure). Ask: SVG `<text>` captions, or a caption opt-out prop | `.b` residual 3 |
| F3-10 | the producer `./search` scorer carries `FR-PSD-TYPE` (`[_lc.type, 10]` ranked above `[_lc.text, 3]`) and `PSM-14` un-cured (the unbounded `score -= max(0,(tLen−pLen)*0.1)` length penalty at 5× the consumer's ratio scale) — both cured consumer-side at `.c` `21e11b0`; `./search` NOT ADOPTED on those grounds (register §3) | `.c` Act 3; `F-W3-DO-NOT-EXECUTE.md` §3 |
| F3-11 | `fr-ContourSettings m-7` ⊕ `m-16` — the section wrapper's fork is unavoidable given its surface (cure: a `#title` slot + `variant`, not discipline); `overflow: hidden` is permanent and clips the producer's outward focus ring | `.d` residual 7 |
| F3-12 | `ConfiguratorLayer` emits no heading — its header is a `<button>` holding a `<span class="configurator-section-label">` (read in the compiled template at the pin), which is why roster 10's INTERLOCK exists and every consumer carries its own `<h3>` (`sr-only`, `.d` `caca3cf`). Ask: a heading-level prop, or the `sr-only` rule documented | `.d` Act 3, residual 7 |
| F3-13 | `fr-Tooltip FR-TT-18` — `--z-tooltip: 120` sits BELOW `--z-popover: 130` at the adopted pin (measured over `dist/**/*.css`), so a tooltip inside a HoverPopover paints beneath its own panel | `.e` residual 7 |
| **KF.W12 ACCRETION 2026-09-19** (X.KF.W12.g, the SECOND CLOSE, `claude-opus-5[1m]`; spec `keyframes/waves/KF-W12.md` §Scope 7 ⊕ §B.2 `:128` ⊕ the travelling lock *"Glass-producer rows → SS-6"*). **ELEVEN rows**, collected by six product units and relayed here as the wave's act, not any unit's: `.b` **7** (receipt `execution/B/KF-W12.md:803-811`) · `.d` **2** (`:1202`) · `.a` **2** (`:927` · `:928`). **`.e` and `.f` surfaced none** — `.f` READ glass-ui's `a11y-overrides.css` / `accessibility.css` / `keyboard.js` to quote the universal PRM guard and the two class/ARIA-keyed `forced-colors` blocks and **stated its reliance in-file rather than re-implementing it demo-side**. **Glass-ui was READ-ONLY at every seat** (⟨cmd⟩ `git -C ../glass-ui status --porcelain \| wc -l` → **0**; **0** glass-ui paths in all 46 keyframes.js commits) and **zero of these rows has a demo-side workaround in the diff** (scoped-style override 0 · re-implemented primitive 0 · copied producer selector 0 · `node_modules` patch 0). Installed producer: **glass-ui 7.0.0**; every prop name below is **quoted from the installed `.d.ts`/`dist`**, never guessed — the quotations are banked at `keyframes/evidence/W12/KF-W12-b-producer-quotation.md` | | |
| KFW12-1 | **`LabeledSelect` `open` — declare `default: undefined`** (OP-5's shape) so an absent prop reads as uncontrolled rather than pinned shut; the same for **`LabeledSwitch` `modelValue`**'s absent case (or make it required in the type, as it already is). This is the producer half of **KF-CO-1 / KF-CO-8**; the consumer half (`:is-open`→`:open` ×4, the switch `model-value`/`@update:model-value` rewire) landed at kf `98675047` **on LP-1's render edge in the same commit** | KF.W12 `.b`, `execution/B/KF-W12.md:805`; evidence `KF-W12-b-producer-quotation.md` |
| KFW12-2 | **`EasingPicker` — a `preset` field on the model (or an `initialPoints` prop)** so a NAMED preset can be re-seated **without a remount**, and **export `STEP_COUNT_MIN` / `STEP_COUNT_MAX` / `DEFAULT_BEZIER_PRESET` from the `./easing` subpath** (the bounds are today quoted out of `constants.d.ts` because the subpath does not export them). This is the producer half of **KF-TFP-1**, the wave's BLOCKER: the consumer cure is the specified `useEasingPickerSeat` composable, consumed by BOTH seats (`TimingFunctionPanel.vue:162`, `EasingSidebar.vue:156`) | KF.W12 `.b`, `:806` ⊕ `:763` |
| KFW12-3 | **`LabeledSlider` — a readout seam** (a value affordance in the label track) so consumers stop welding the number into the label string | KF.W12 `.b`, `:807` |
| KFW12-4 | **`LabeledSelect` — an item-description slot** (the per-item gloss the demo's three description tables carried and now cannot render; the tables become consumerless exports, carried to the reference-data owner) | KF.W12 `.b`, `:808` ⊕ `:753` |
| KFW12-5 | **`LabeledField` — a label-action slot** (the pencil's seat; the hand-rolled label row would fold into the wrapper) | KF.W12 `.b`, `:809` |
| KFW12-6 | **`DockControl.vue.d.ts` — say the hit-cell guarantee is dock-scoped** (KF-CO-42's docstring note) | KF.W12 `.b`, `:810` |
| KFW12-7 | **Vitest loadability, informational** — `button`, `number-field` and `easing` reach `useSpring` → `@mkbabb/keyframes.js`; a consumer holding the self-alias cannot load them under externalized resolution. The demo stubs at the seam; no producer act is demanded | KF.W12 `.b`, `:811` |
| KFW12-8 | **`Skeleton` is root-barrel-only at 7.0.0** — killed-import #2 re-verified: there is no `./skeleton` subpath in the export map | KF.W12 `.d`, `:1202` |
| KFW12-9 | **UPSTREAM (monaco, not glass-ui), informational** — `monaco-editor` ships no `.d.ts` beside its `basic-languages/*/<lang>.js` grammars and its `exports` wildcard carries no `types` condition. This is the root of **E-d1**, the wave's one carried honest-RED, whose cure is a five-line ambient declaration in `demo/env.d.ts` — a file outside every KF.W12 §B.2 row, so the unit **returned it rather than widening its bounds** | KF.W12 `.d`, `:1202`; escalation R-3, built hunk banked in `KF-W12-d-born-red.md` |
| KFW12-10 | **KC-20 — the keyframe-card divider's contrast and its missing `forced-colors` arm**, re-scoped to a glass BH relay per the bank's own correction rather than cured demo-side | KF.W12 `.a`, `:927` |
| KFW12-11 | **A MEASURED REFUTATION, not an ask** — **per-thumb `aria-valuetext` is not expressible at the installed producer**: ⟨cmd⟩ over `dist/slider-DzqeQmMu.js` → **0** occurrences of `aria-valuetext`, **one** `aria-label`/`aria-labelledby` forwarded from `$attrs` to EVERY thumb, **no thumb slot**; `LabeledSlider` is additionally refuted for the retiming control (`modelValue: number`, single-thumb). The consumer landed `LabeledField` instead of reaching into rendered thumbs. Recorded so no future seat re-derives the dead end | KF.W12 `.a`, `:928`; §4.1 of `KF-W12-a-gate-transcripts.md` |
| **KF.W12 DISCLOSURE (not a row)** — the spec's §Scope 7 PREDICTED seven producer rows; the units MEASURED eleven, of which **two match a predicted name** (KFW12-2 the preset seam · KFW12-3 the slider readout seam). Four predicted names — **the viewport-gated grid · the `steps(1, jump-none)` render throw · unlayered scoped styles · the lossy `cn` table** — were **surfaced by NO unit**, and a fifth, *the keyboard registry's missing `defaultPrevented`/scope*, is measured **not to be a producer row at all**: the registry is the demo's own and its cure landed upstream in `orbital-drag/**` at KF.W11 `.a` `fff7232c`. **No row was invented to satisfy the count** — a relayed producer ask nobody measured is a fabricated ask, the class the `.d.ts`-quotation law exists to forbid. Booked as KF.W12 residual **R-12** | | |
| **F.W10 ACCRETION 2026-09-20** (X.F.W10 `.c`, `claude-opus-5[1m]`; spec `fourier/waves/F-W10.md` §2.4's NEXT-COMMUNIQUE roster ⊕ §2.5a's BH-RELAY verbs ⊕ §4b's **SS-6** row `:479`; gate **G-F10-9**'s register limb). **THE F-SIDE BOUNDARY RECONCILES AGAINST WHAT WAS DISPATCHED; IT RE-SENDS NOTHING.** The seventeen glass arms §2.4 names were enumerated by `X.F.W10.b` in `INTAKE-ADJUDICATION-ADDENDUM-2026-08-25.md` §B.2 and are swept here, **arm by arm, against every outbound glass packet** — ⟨cmd⟩ this seat, double-run, `ls ../glass-ui/docs/tranches/B*/coordination/valuejs-outbound-*.md docs/tranches/X/coordination/*glass*.md` → **15 packets**. **FOURTEEN are already dispatched or disposed and are CITED, never re-sent**: `FR-NP-32 ≡ fr-PaperSidebar M1` (**O-20 A-1**, re-confirmed at **NWO-1 §1** — *"CONFIRMED by your A-1; one residual, not an ask re-sent"*) · `FR-COB-7` (NWO-1 **S-1**; I-32 `A-11a` KILL ⊕ `A-11b` ANSWER) · `FR-COB-8` (NWO-1 **S-2**; I-32 `A-3` CURE-NEXT-MAJOR at 10.0.0) · `FR-COB-23` (NWO-1 **S-4**; I-32 `A-11c` KILL, cured above our pin) · `FR-COB-26` (NWO-1 **S-5**; I-32 `A-11d` CURE-NOW) · `FR-MSP-12` (NWO-1 **S-6**; I-32 `A-12` ROUTE → fourier) · `HLG-32` (folds to `FR-COB-8`'s CLASS ⊕ `FR-COB-12`'s instance — **O-20 A-3** names FR-COB-12; a fold is not a second send) · `FR-NP-11` (same fold target, same send) · `L-10/D-M4` ramp headroom (**O-20 B-7**, and the ramp's zero headroom re-measured at **O-32 §2.4**) · `GAB-2` tier-tint home (**NWO-1 §3 L-4**, *"untouched by your disposition and re-sent unchanged"* — sent, so not sent again) · `GAB-9`'s 3.26:1 label rung (**rides L-4**, which carries it in its own words) · `AA-3`'s violet `batch` tone (**WITHDRAWN with cause, O-32 §1.2** — a withdrawal is a disposition) · `FR-EQR` light `--success` 2.175:1 (NWO-1 **S-11**; I-32 `C-1` ANSWER + CURE-NOW; also **O-32 §2.1**) · `fr-AppHeader`'s `cm-serif` undeclared-variable limb (**O-32 §4.1**, measured at 8.0.0) · `FR-GIG-5`'s observer-root (**NWO-1 §3 L-1**, the non-credit lock). **THREE ARMS HAVE NEVER LEFT under their own identifying term** — ⟨cmd⟩ `grep -l` for each across all fifteen packets → **0**, twice — and they are the accretion: **F10-1 · F10-2 · F10-3** below. **PRODUCER ROWS NEVER BECOME FRONTEND HACKS**; glass-ui was **READ-ONLY** at this seat (⟨cmd⟩ `git -C ../glass-ui status --porcelain \| wc -l` → **0**), and none of the three carries a consumer-side cure. **S-16, RESTATED AT THE REGISTER IT CONCERNS**: the `DISPATCHED 2026-08-28` row's **26** is **O-20's OWN count, quoted from the packet's own close line** (*"one letter, twenty-six entries, zero re-sends"*) — **22 id-rows ⊕ 4 §D entries = 26**, two denominators of one letter, both true. The *"correct COHESION §4a"* instruction is **WITHDRAWN** (F-W10 §4b · §5, dated addenda 2026-08-30): **the 26 STANDS and is edited by nobody on this account**, and no §1a #3 carve was spent on it | | |
| F10-1 | `fr-VisualizationView` **D-26** — the underline indicator element is **never rendered**: the active-tab indicator is anchor-positioning-only by construction, so the engine matrix decides whether any consumer sees it. Banked verbatim as *"NO-WAVE-OWNER (producer, glass BH relay)"*; the engine-matrix limb routes **SS-13**. **Ask**: does the producer intend the indicator to have a rendered fallback where anchor positioning is unsupported, or is the anchor-only form the contract? No consumer edit can reach it | `adjudicated/fr-VisualizationView.md` **D-26** (`:99`); drain row **58**, §4.2 |
| F10-2 | `fr-PaperView` **D/M-7** — in the **light** arm `--primary` resolves to the same ink as `--foreground`, so a primary-tinted affordance and body text are **indistinguishable** (a 1.000:1 separation between two tokens the design system declares as different roles). A consumer cannot cure it without re-minting a token app-wide — the same shape as the `--card` ≡ `--background` row already sent at **O-32 §2.2**, and it is NOT that row | `adjudicated/fr-PaperView.md` **D/M-7**; F-W10 §2.4 NEXT-COMMUNIQUE roster |
| F10-3 | `fr-AppHeader` — the **light `--tier-featured`** rung. The record's *other* limb (`@utility cm-serif` reading an undeclared `--font-serif-math`) left at **O-32 §4.1**; **this limb did not**, and it is distinct from `F3-7`'s tier-**chip-plate** ask and from NWO-1 **L-4**'s tier-**tint home**. **Ask**: state the intended contrast band for `--tier-featured` in the light arm, or rebaseline it — a consumer that re-inks it forks the tier vocabulary for every other consumer | `adjudicated/fr-AppHeader.md`; F-W10 §2.4; **not** covered by L-4 or F3-7 (measured: `tier-featured` → **0** across all fifteen packets) |
| **KF.W13S ACCRETION 2026-09-22** (X.KF.W13S Repair 1, `claude-opus-5-5[1m]`; G-KFW13-7's clause *"every producer row relayed and none cured demo-side"*; the `.f2` Close's R-f2-5 *"recorded, not yet relayed"*). The letter is **O-48** at `docs/tranches/X/keyframes/evidence/W13S/KF-W13S-bk-producer-relay-2026-09-22.md`. It carries six rows, five asks and one status note, and none of them is cured demo-side | | |
| KFW13-1 | kf-ChromeDock **M-5**: the touch-gate deactivation's `collapse()` consults neither the hold counter nor the `data-glass-dock-portal` stamp, so a held dock still collapses on the touch axis | O-48 row 1 |
| KFW13-2 | kf-ChromeDock **D-18**: the collapsed summary layer is a bare `<div onClick>` with no role, tabindex or name, and the full layer is `inert`. The collapsed dock has zero tab stops. Ask: focusable and named by construction, or a keyboard `onClickCollapsed` | O-48 row 2 |
| KFW13-3 | kf-MbabbMenu **MM-24**: publish an `./avatar` subpath (it is absent from the exports map, so the import is root-barrel-only) | O-48 row 3 |
| KFW13-4 | kf-MbabbMenu **MM-2** row 2: provide a headless `DarkModeToggle` (`v-model` or an exposed `toggle()`) so that a menu item can actuate the flip | O-48 row 4 |
| KFW13-5 | kf-ChromeDock **D-13**: `startCollapsed: { type: Boolean }` has no default, so the `?? true` arm is dead on the SFC path. Ask: `default: undefined`, or docs that match the runtime | O-48 row 5 |
| KFW13-6 | kf-MbabbMenu **MM-28**, a STATUS NOTE and not re-sent: the `dropdown-menu` `open`/`defaultOpen` `default: undefined` is measured SHIPPED at 7.0.0. The MUST-CARRY rider's obligation holds (`v-model:open="open"` reads 1) | O-48 row 6 |
| **KF.W13T ACCRETION 2026-09-22** (X.KF.W13T `.k2` close, `claude-opus-5[1m]`; the orchestrator's owed accretion under §0ar). The letter is **O-50** (`docs/tranches/X/execution/B/KF-W13T.md` § `### KF.W13.k2` act 6). Two rows, both asks, neither cured demo-side | | |
| KFW13T-BK-1 | kf-ChromeDock **R-k-2**: the dock's wrap recipe hides `.dock-separator` unconditionally, even when the row fits on one line. Ask: hide only on an actual wrap, or export a seam | O-50 row 1 |
| KFW13T-BK-2 | kf-PlaybackRibbon **R-e-1**: the producer Slider ships no visible scrub/playhead thumb on the ribbon's rail. Ask: a visible thumb variant, or the token that paints it | O-50 row 2 |

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
- 2026-09-17: **X·P W1 instruments landed and the bar ledger published — NO BAR IS SET BY IT.**
  The three harnesses exist in the fresh root (`d8a529a` the 52-export totality corpus · `d1458f4`
  the 403-string equivalence oracle, `A/B/C = 0/0/0` reproduced against the sha-pinned published
  tarball · `4df9e91` the bench: one fresh process per cell, `PACKRAT_ARMED` read from the installed
  dist and asserted false at entry **and** exit, nine cells nine distinct PIDs, diagnostics
  quarantined to their own process with byte-empty bench stderr), and the parser-proof tree is off
  the job scratchpad onto tracked disk with a 189-digest manifest (`f9c0acb2`). The lane's
  `evidence/W1/BAR-LEDGER-2026-09-17.md` restates all four budgets against **1,636,680 µs** against
  the fixed native floor **311,883 µs** — `10×` **RETIRED AS LAW** (the floor is 1.906× that budget,
  strengthening from 1.667× under the unproven denominator), and strict-3× / strict-2× /
  break-even each read **`OWNER-GATED-PENDING-RATIFICATION`**, because **§0j.E OC-1 rules the bench
  table RECORDED-NOT-GATING and ratifies no bar**. Plane A's CC-095 three-leg bar is adopted as a
  **reporting format only**, its X·P applicability flagged as an owner confirmation; the two planes
  are never merged. **G-8 (R1 totality) stands RED by its own design** — re-measured `324 throws /
  1,548 calls`, unpiped exit 1 — because this wave writes no grammar. **IMPLEMENTED is the wave's
  own close report's stamp; VERIFIED is X.P.W4's alone (R-A).**
- 2026-09-17 (later): **X·P W2 IMPLEMENTED-with-carried-REDs — one architecture survives and is
  graduated; four candidates carry terminal verbs.** Ten units ran across two sittings; the second
  opened on §0n.1's E-1 word (a) and owed exactly one act. `.i` promoted **AC-1 TAGLESS-TWIN**
  into `<p2>/typescript/src/css/**` **mechanically** — 17 files, every one sha256-equal to the
  candidate's, ⟨`diff -r experiments/w2/ac1-tagless typescript/src/css`⟩ printing only the two
  things §11.1 names as staying (`<p2>` `130f72db`), **zero move-forced import edits, proven with
  node's own resolver**; the close then merged `w2/ac1` → the root's working branch per §9 and
  §0n.2 (`<p2>` `cdf7975`, clean, 0 conflicts), so the fresh root itself now holds `typescript/src/css`
  and **W3 §4a's sequential inheritance is true at the bytes, not only in a worktree**. At the close
  seat's own clock, twice-run: **GREEN** G-2 (contract 22 · js 22 · wasm 22, fingerprints pairwise
  equal, at the graduated location) · G-5 (candidates 0/172 × 3 productions × 2 lowerings, boundary
  7/7 — while the incumbent's published baseline re-reproduces **324 throws / 1,548 calls**, R1
  still live) · G-6 (52 rows ∅ both ways, report half, OP-8) · G-9 (imports **0** over all kinds, no
  start section, 5 enumerated exports, memory 12582912 == 12582912 over 2,000 parses, K-9/K-10
  intact) · G-11 · **ESC-i2** (exit 0, **zero** diagnostics, no RED-PREEXISTING residue, no root
  `tsconfig.json` minted). **CARRIED RED, every one owner- or instrument-owned and none cured
  here**: G-1 (`cut∉alt` **7** — E-3; its other limb, the two `ALGEBRA.md` homes, is GREEN again
  post-F-h7 and post-merge, both `67c8253a…`) · G-3 (**EQ-6 = 2,035** over 30,527 rows, **EQ-1..EQ-5
  = 0** — E-2, W3's first act per §0n.3) · G-4 (R-LAW-2, same E-2 cause) · G-7 (**E-6**, no
  registration surface: ⟨`grep -c 'w2' harness/bench/bench.ts`⟩ → 0; W3's per §0n.4) · G-8
  (instrument band). **G-12 SPLIT→GREEN-WITH-RESIDUALS**: ledger 4/4 terminal, graduation landed.
  Two findings the close surfaced and did not fix: **D-c1** — the promoted `build/ac1.d.ts`'s
  re-export specifier is depth-calibrated to the `.worktrees/ac1` address and resolves to a
  non-existent path at `<p2>` proper, so G-10 prints GREEN in the worktree and RED at the root on
  the excess-property half alone; the cure is the artifact's own declared one, `node
  typescript/src/css/build.mjs`, and it is W3's first act beside §11.3's re-point. **D-i2** —
  `harness/w2/coverage-52-report.mjs` throws whenever a candidate is present at the queried
  location, latent since `.g`, reachable only now. **No bar was set, implied, or printed**;
  `OWNER-GATED-PENDING-RATIFICATION` stands (OP-4 / §0j.E OC-1). **IMPLEMENTED is this wave's own
  close report's stamp; VERIFIED is X.P.W4's alone (R-A).**
- 2026-09-18: **X·P W3 CLOSE-ADJUDICATED by the fresh Fable seat `.e` (`claude-fable-5-1`) —
  honest-RED; one load-bearing claim REFUTED and one divergence row's spec reading REFUTED at the
  bytes** (`parse-that/waves/W3-CLOSE.md`; six units dispatched `.0` `.a`–`.e`, five landed before it,
  `<p2>` at `dc52ed5`). All ten gates re-run at the close seat's own clock, twice, every generated
  evidence artefact regenerated **sha256-equal** to the committed one: **GREEN** G-6 (72/72) · G-8
  (C-7/C-8/C-9, labels never armed, 0 executed writes) · G-5 **on its command** (79,674 cells, 0
  differing bytes) · G-10 **well-formed, no verdict** (a third run beside `.d`'s two; `BAR:
  OWNER-GATED-PENDING-RATIFICATION`; `--denominator 1870633` REFUSED). **GREEN on its command legs
  but NOT reported green**: G-3 (0/10 heads, 72/72 non-string cells one shape, R1 `oklch()` typed in
  both lowerings) — its proof leg *"the shield is non-load-bearing"* is **REFUTED under L-14**: on the
  Wasm lowering `parseStylesheet` over **8,191 rules of `a{color:red}` (98,292 B, VALID)** overflows
  the fixed **mark journal** (`MARK_CAP` 32,768; 32,770 marks), the RAW path throws `HALT: a journal,
  the value stack or the arena overflowed its fixed region`, and the public entry answers `ok:false
  css_syntax ["<stylesheet>"]` **only because the shield fired** while the JS lowering answers
  **`ok:true`**; likewise every input over `INPUT_CAP` 1,048,576 code units on all three entries. G-3's
  falsifier fires by inspection and G-5's intent falls beyond the corpus in the §3a "Wasm memory
  model" direction → **ESC-e1**, routed (X.P.W1/W2 architecture · X.P.W4 adoption), not patched.
  **RED, each with its named owner**: G-1 (5 of 52 TOTAL — F-a.6) · G-2 (324/1,548 twice, structural
  — ESC-d2) · G-4 C-3/C-4 (E-1/E-2; + F-e10: the shield's `catch → css_syntax` is a **third**, live
  fallback arm C-4's regex does not count) · G-7 (5,890 — ESC-d1) · G-9 latch (ESC-c1; depth GREEN
  at 64/65/7,761/7,762 in both lowerings). **L-14, the other two**: (ii) **S-1/ADJ-2 REFUTED as
  stated** — `hsl(120deg50%50%)` and `rgb(255none none)` are ACCEPTED by both lowerings where
  css-syntax-3 §4.3.3 tokenizes `120deg50` / `255none` as single invalid dimension-tokens (F-e1);
  **ADJ-3/S-2 half-REFUTED** — css-color-4 §4.3 normalizes an infinite hue to 0deg and css-values-4 §5
  clamps an over-range angle; the row's "§10.9" is *Type Checking* and its attributed sentence does not
  exist (F-e3); **PB-03 UPHELD** verbatim (§7.1 "100% or 100") with a NEW unrowed divergence beside
  it — legacy `hsl(120, 50, 50)`: incumbent MIS-ACCEPTS, candidate correctly rejects (F-e2). (i)
  closure **NOT refuted on its ⊆ half** over two fresh 20,000-source bands (seeds `0x9e3779b1` ·
  `0x00c0ffee`; 240,000 public calls: 0 codes outside the eight read from value.js
  `6aca8602:src/css/types.ts`, 0 empty tuples, 0 raw throws, 0 `far.code === null`, 0 cross-target
  differences), **refuted on its no-fallback conjunct through the shield**. **Harvest chain**: the
  unmodified harvester (sha256 `77a6e04c…`) run three times, exit 0, outputs byte-identical — measured
  to write **143 files per run** (94 NEW + 2 CHANGED `wf_*.json`, all outside every W3 bound) and the
  ledger wholesale (7,520 → 7,585; the 65 new rows are all empty stubs, W0 R-5; 130 whitespace flags),
  so it ran in a scratch mirror with the script symlinked and, in run B, `DEFECT-LEDGER.md` symlinked
  to the repo's file so the **script itself** wrote the append (sha256 `8092610b…`, equal to run A);
  the wave's THREE run files (`wf_25c53370-7ee` · `wf_3e7ab295-b6d` · `wf_a9980aef-425`) folded
  VERBATIM into `registry/harvest/x-p-w3.json` (fold/2). **Seat count 5 of 6 — RED under L-13's
  letter** (`.e` structurally absent from its own harvest; W0 R-3 / W1 R-3 reproduced — ESC-e2).
  K.7(i) fired a third time and is recorded in `W3-CLOSE.md` §5 / F-e11, never a spec patch. The
  crashed first `.e` seat's uncommitted draft was read whole and **rewritten** where measurement
  disagreed (region, rule count, JS memory figures, cell/file/run counts — `W3-CLOSE.md` §0).
  **IMPLEMENTED is NOT stamped by this seat** (gates are not green); the four-verb line stays
  IMPLEMENTED NO pending the orchestrator's close commit; **VERIFIED is X.P.W4's alone (R-A).**
- 2026-09-20: **X·P VERIFIED — the R-A stamp PERFORMED by `X.P.W4.s` (`claude-fable-5-1`, a FRESH
  Fable adjudicator, M-23 §1; §0ah's standalone stamp act, dispatched last and alone after `.g2`).**
  Precondition met at the seat's own clock, every reading double-run: G-1 `VERDICT: GREEN` EXIT=0
  (`ledger rows 48 · declared-divergence 7 · identical 45`) · G-2 **0** paths under
  `src|demo|api|test|e2e` over the 22 X.P.W4-subject commits (commit predicate, C3-3) · G-3
  `resolved 52 of 52` · `G3 GREEN` · tarball `004bbcce…` · `entryCount 91` · refusals 5 · EXIT=0
  (backgrounded, ×2 same sha) · G-4 `functionKindImportsTotal 0 · unaccountedImportsTotal 0 · GREEN`
  and the §6 spec-literal command `{"total":0,"functionKind":0,"imports":[]}` EXIT=0, `ac1.wasm`
  `f0d063d6…` · G-5 `RC-P(4.0.0) = FALSE — 3 of 6` (1 · 3 at 20,962 · 4) EXIT=1, negative control
  `0.0.0-does-not-exist` → 4 of 6 FALSE · G-6 **25** `RC-P` hits across `KF-W2/W3/W5/W10` + `F-W0`
  · G-7 **0 / 0** (floor held) · G-8 packet 28768 B, INBOX `3/3/30`, 82 rows, no status cell
  `UNREAD` · G-9 disposition **(C)** at `W4-CLOSE.md` §4 (`:131` `:134` `:148`). **The act**: the
  five `### Four-verb status` `VERIFIED` rows of `waves/W[0-4].md` moved `**NO**` → `**YES —
  2026-09-20 …**` in ONE commit with the two COHESION cells (§1 SS-5 · this line), `W4-CLOSE.md`
  §14, `RELEASE-PACKET.md`'s third dated addendum and `registry/harvest/x-p-w4s.json` fold/3
  (predecessor fold/2 embedded whole); shape-(a) sum **5 → 0**, re-measured from the settled bytes
  ×2. **VERIFIED, never ACCEPTED** (W4.md §12 / L-18: two Opus-5 skeptic quartets + a fresh Fable
  adjudication are still owed before ACCEPTED). `RC-P(4.0.0)` stays honestly FALSE — KF.W3 does not
  open, the X·V adoption re-trigger does not fire, S-4 stays DISPOSITION C (§0i.1). X.P.W4's CLOSED
  row untouched; `X.P.W4S`'s row is the orchestrator's.
- 2026-09-20: **X·F BOUNDARY — F.W10 CLOSED, the LAST F wave; the F-side of §3.1–§3.4 is STAMPED
  and §3.5 is OWED.** Seven units (`a`–`g`, `claude-opus-5[1m]`, strictly serial) over 18 pathspec
  commits; record `execution/C/F-W10.md`. **Twelve gates re-run at the close seat's own clock,
  every reading double-run, none argued green: 5 GREEN · 5 SPLIT · 2 honest-RED.** GREEN —
  **G-F10-5** (the `X/fourier/LATEX-PAPER-RELAY.md` register exists, 15 carries rowed, delivery
  point named) · **G-F10-7** (COHESION **§4.2**, the F-side NWO drain: **89 rows · 89 distinct ids
  1–89 no gap no repeat · 89 terminal verbs · 0 rows without one**, measured from outside the file
  twice; escape test against the frozen canonical **65 booked-or-cited · 0 escaped**) ·
  **G-F10-8** (the corrected charter line landed at `cd4df502`; five terminal verbs; `OG-F1` and
  `OG-F2/OG-V2` discharged **by ruling** at §0j.D and re-ruled by nobody) · **G-F10-9** (the
  addendum-beside exists, `git diff --stat` on the dated `INTAKE-ADJUDICATION-2026-08-03.md`
  **empty**, every surviving ask in exactly ONE register) · **G-F10-11**
  **VERIFIED-GREEN-BY-PREDECESSOR on all three limbs, each predecessor named** — the glass dist
  parses at the 8.0.0 pin (**40** top-level nodes, `@source` **1**) is **F.W1**'s, the landed WT
  diff (fourier porcelain **1**) and both F8-REACH deletions (`find` → **0**) are **F.W0**'s.
  SPLIT — **G-F10-1** (value side rowed at last, `I-36`–`I-39` + `O-44` with disposition verbs;
  the *reply-in-fourier's-ledger* leg reads **0** and is **not this side's to turn**, COMMISSION
  §2) · **G-F10-2** (their `CLAUDE.md` · their `INBOX.md` · facility-19 TRACKED are **F.W0**'s
  three legs; `grep -c 'FN-'` in their ledger → **0**) · **G-F10-4** (pin leg **F.W1**'s, packets
  **5** and rows `O-34`–`O-38` **5** **X-W9.i**'s, `npm ls` exit **0** in both trees — published
  **PRE-WINDOW**, because calling today's exit-0 the post-window reading is the gate's own named
  falsifier) · **G-F10-6 ≡ G-F9-21** (both splice `diff`s **empty** ×2 and the §2.2 region exactly
  **3** hunks — E-10 holds; the corpus leg **54 / 25-of-66 / bare `F.W10` 0** reproduces and the
  gate's own falsifier forbids curing it, *"a later seat must not read the green leg as the gate"*)
  · **G-F10-12** (the two arms READ at the producer's path; `MetricPill` **0** · `IntersectionObserver`
  **0** · `latex-paper` **0** across the moved denominator **12**). **honest-RED, with the failing
  case named** — **G-F10-3**: the G24 instrument exits **1** twice, `ERR_MODULE_NOT_FOUND` on the
  0.13-era `dist/value.js`; relayed, never repaired, cure owned by `ESC-W9-G24-SUBSTRATE` (§0ac).
  **G-F10-10**: FR-TT-1's **17 naming legs are MEASURED CURED** (F.W4's cure, re-read at this
  clock), **so no waiver is in play or lawful**; the close axe run is F.W9 `b.9`'s — `/paper`
  **GREEN** · `/equation` **GREEN** · **the admin tab RED, 4 of 4, `[serious] aria-hidden-focus`
  ×2 on glass-ui 8.0.0's `Metric` tile** — a **PRODUCER** row that rides SS-6 and **never becomes a
  frontend hack to turn a gate green**. **S-16 RESTATED**: `22` id-rows ⊕ `4` §D entries = the O-20
  packet's own **26**; the *"correct COHESION §4a"* instruction **stays withdrawn** and §4a's figure
  is edited by nobody. **Bounds**, stated as a PAIRING because the auditor's own commits move the denominator: `dev.sh`
  in **0 of 18** at the close audit's clock (the roster *before* this seat's writes) and **0 of 21**
  including them; **0** paths outside `docs/tranches/`; every commit pathspec'd on the `commit`
  itself. **The invariant is what travels, not the integer.** **E13**: 0 unrowed on all four paths, 0 rows carrying a live UNREAD
  status in scope. **VERIFIED stays NO** — §3.5's declared-Fable final pass (`X.F.W10.h`) is owed,
  and L-18's two quartet gestalt passes are owed after it.
  *(Dated 2026-09-22, `X.F.W10S.a`:)* `h` ran (NOT-CONFORMANT, one HIGH, which CHECK 1 graded MEDIUM as CK-1), and **CK-1 is cured by `F.W10S.a`**: the two census-input errata (`i-1 = L-INFO-2` · `PP-CENSUS`) are landed at `CENSUS-ADDENDUM-2026-08-25.md` §6.5-ERRATA-S, CK-2/CK-3 sit beside `execution/C/F-W10.md`, and F.W10's ACCEPTED remains `F.W10S.d`'s to stamp.

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

## §0k ADDENDUM 2026-09-17 — THE X-W0 CLOSE DOCKET, RULED (same sitting, second session)

**Provenance.** X-W0 closed IMPLEMENTED (`1246f859`; 17/18 hard gates + 8/8 fold gates GREEN at the
close seat) with HG-7 RED, HG-10 SPLIT, and a docket of returned items its seats declined to presume:
the X-W0.g packet's two unruled owner rows (DR-21 · CC-104/OP-1) and eight cross-wave escalations
(S-1..S-8; `W0/OWNER-SITTING-2026-09-17.md` §1 items 8–17, §4, §5), plus X-W0.a/b/c/f's returned
questions. Dossiers of record: `execution/SITTING-DOSSIER-2-2026-09-17.md` (`ee7c78ec`) and the X-W0
close at `execution/A/X-W0.md`. E-3 throughout: no wave file is edited by this ruling; each consuming
wave lands the dated addendum its ruling names at its own open.

### §0k.1 · X-W0's own gates and returned questions

- **HG-7 (E-1) — SCOPE now, HARVEST at X-W11, both.** The completeness validator's non-band law gains
  a **corpus predicate**: it ranges over run records at or before the megatranche dispatch boundary
  (timestamped ≤ 2026-08-03) plus any record a canonical row cites; live tranche-X session journals are
  outside its corpus by construction. The 87 are X-track run records and are **harvested once, at
  X-W11's close** (`harvest-journals.mjs`, which rewrites `registry/DEFECT-LEDGER.md` inside X-W11's
  bounds by dated addendum), so the scope predicate suppresses nothing — the finding is dated and owed.
  **Landed by X-W0's repair seat**: `docs/tranches/V/megatranche/workflows/validate-completeness.mjs`
  is inside X-W0's COMPLETABLE clause (*"docs/** or docs/tranches/V/megatranche/workflows/**"*); the
  self-test S1..S6 must then run and pass on the real tree. No run id borrowed, no allowlist, no cutoff
  written into a fixture.
- **HG-10 (E-2) — the supersession column IS the cure.** A canonical axis row's provenance word records
  the truth of the canonical file and is never re-badged when a later witnessed round supersedes it;
  the falsifier's *"fails the same check twice"* is read against the supersession column. HG-10 GREEN.
- **E-3 (`docs/tranches/X/artefacts/W0/`)** — no new directory. §Verification Artefacts is amended by
  dated addendum at `waves/W0.md` to point at the tracked homes the close record's §4 maps.
- **X-6, the 255 MB rejected denominator — RETAIN (position A).** FINDINGS G05's append-only law
  stands; the measured cost of TRACK was zero pack growth. The eight payloads stay tracked in place.
- **HG-4's "SUPERSEDED in place" — GREEN as landed.** For a sealed record (schema-locked status,
  `additionalProperties:false`, a manifest hash any edit destroys) "in place" means the dated ruling row
  that annotates both readings at their byte coordinates; no byte inside the sealed JSON is owed.
- **RS-1 — DR-14's DELETE rides X-W5's existing `vite.config.ts` modify-carve** (W5.md:94). §0j.A's
  X-W1 routing is corrected by this line (X-W1's bounds do not hold the file); X-W1 owes nothing.
- **RS-2 — `docs/precepts` fast-forwards to `origin/main` `b0f6134` at X-W11** by dated bounds addendum;
  not earlier (precepts text may change law mid-tranche).
- **Contamination (three LW rows)** — recorded, not rewritten: the standing law now reads *pathspec on
  the commit itself* (`git commit … -- <paths>`); every seat from this ruling forward commits so.
- **The `.gitignore` PNG shadow (8800 ignored files under docs/)** → X-W11's close walk; **CROSS R-07**
  (a write into frozen `vnext/**`) → booked terminal at the G-F register (vnext is FROZEN-AS-INHERITED);
  the two dangling e2e fixture imports of `demo/@/lib/palette/types` → X-W1 (owns `e2e/`).

### §0k.2 · the two owner rows (packet §4)

- **DR-21 — NO opt-out.** SCI-1 stands as ruled and sent (O-5: SHIP-4.1 `mixColorsInto`/`toRgba8Into`);
  **CC-088 is BUILD at X-W9.f in the same dated cut as CC-084**; the ninth carry does not happen because
  the row is executed, not carried. X-W9 §X.W9.f may open.
- **CC-104 / OP-1 (X·V namespace, W10.md:368) — the SUBSTITUTE, named in writing, with D-20 amended
  in the same ruling.** DesignSync is **not callable** in this harness: `list_projects` returns
  *"needs design-system authorization — run /design-login"* (an owner act, measured 2026-09-17). The
  substitute: **the design gate's frames are authored in-repo** — the twice-authored (Fable ∥ Opus →
  fresh-Fable agglomeration, M-23 §3) design frames as source (HTML/Vue) under
  `docs/tranches/X/W10/frames/`, rendered by the wave's own bounded Playwright pass to committed PNG at
  390 and 1280, keyed to the design-gate rows. **D-20's frames obligation is amended**: *"Final form at
  the design gate, with DesignSync frames"* → *"with committed rendered frames (source + PNG) at
  `docs/tranches/X/W10/frames/`; a DesignSync push is optional once the owner has run `/design-login`,
  never a precondition."* X-W10's open condition is discharged by this ruling. The three `OP-1`
  spellings stay disambiguated as the packet's §4.3 records.

### §0k.3 · the eight escalations (packet §5), each with the far-end byte it unblocks

| id | ruling | rationale (dossier-2 measurements) |
|---|---|---|
| **S-1** bindPane vs `DockCommand` (X-W5 · X-W8) | **(b) R-8 governs.** `bindPane` narrowed to non-command instance uses (applyExternalColor / commitEdit / cancelEdit); the `DockCommand` provide/inject registry lands at **X-W8** (MT-DOCK-LAYERS-1); X-W5 may not claim C-3; A3's witness stays X-W5's, A3's cure moves to X-W8 | both cures are greenfield (0 sites of either); `usePaneRouter.ts:206-212` dispatches through `paneRefs.*.value?.…` optional chaining — the god-module smell the registry retires (no-god-modules law) |
| **S-2** GAB-5/K-8 per-verb seat (X-W10) | **(a) the Dock set wins**; VC:194 + B-13 + R-B stand; challenge-D's per-verb table stays input; route-local Generate/Gradient/Mix verbs retire INTO the dock set, `seedFromPalette` receiving its dock seat there | the standing cl.2 prohibition; the dock is the action surface (admin-dock law); (b) would create a route-local seat that does not exist today |
| **S-3** `src/color/model.ts` barred vs four W9 rows (X-W9) | **(a) narrow reading** — Do-NOT-touch governs the conversion mathematics; a pure read, a re-export and a return-type retarget are permitted; W9.5/W9.11 publish by re-export from outside `model.ts` with **zero bytes changed inside it** | `SPACE_SCHEMA` (:56), `SPACE_IDS` (:76), `Color<S>` (:38) are already exported; (b) would trip the wave's own Triumvirate trigger |
| **S-4** `UserSortMenu.vue:8` (X-W7 ⟂ X-W8) | **CE-5's shape, order-agnostic**: the register decision (`quiet` vs ghost) is **X-W10's** design ruling; X-W8's G-9 deletes the dead attribute under a null-DELTA pair proving zero pixel change; if `quiet` wins, whichever of X-W8/X-W10 lands second re-stamps G-9's baseline in the same commit; a green G-9 is never cited as the cure of D-5's design limb | the deletion is mechanically safe either way; the paint question is design content (M-23 §3) |
| **S-5** `PaletteCard.vue` verb (X-W7) | **§4 gains `delete` for `PaletteCard.vue` by dated E-3 addendum at W7.md** — X.W7.d deletes it once its three importing consumers have moved to `ActionFeedback.vue` (already in tree), within the same wave | a carved corpse behind a moved consumer set is the compat shim the no-backwards-compat law forbids; §5.d's intent and every AF row were authored against the delete reading |
| **S-6** AdminGate seam (X-W3 ⟂ X-W7) | **X-W3 first**: F-1's guard lands behind the X-W3.6 gate; X-W7 inherits the seam; the edge law binds both — neither wave reports the identity closed alone, and X-W7's gate may not go green over X-W3's edit | §B fixes X-W3 first for the revert-payload edge; S-11 requires the born-RED route spec first; the 21 `if (!token)` sites across 5 composables reproduce unmoved |
| **S-7** `ErrorBoundary.vue` path (X-W5 ⟂ X-W6 ⟂ X-W7) | **(a) `demo/color-picker/ErrorBoundary.vue`** — the only path that exists; X-W5's BD-07 `demo/shell/…` path is an authoring error, corrected by dated addendum at X-W5-FOLD. X-W5 owns the containment altitude only (App.vue:50/:140's wrap); the component's bytes are written by X-W7 (its §BoundsDelta names it); X-W6 and X-W10 read/cite. Write order on the shared file = stage order, each seat re-reading at open | `find demo -name 'ErrorBoundary*'` → one file; `test -f demo/shell/ErrorBoundary.vue` → NO |
| **S-8** MT-CSP-1 ⇄ the carry-cut ledger (X-W6 · X-W8 · W0.1) | **Q1(a) mint the carry-cut id** — X-W6's open seat appends the row (⟨ConfigSliderPane · MT-CSP-1⟩) to `CARRY-CUT-LEDGER.md` by dated append, home **X-W6** (`demo/scenes/ConfigSliderPane.vue` is a scene); **Q2(b) curable now** via the CSP register's G-PAINT single cut (C-3/D-3/D-4/D-14) — the measurement-backed ruling — while CC-105's `--slider-track-bg` wait stays X-W4.g's own; W0.1 keeps the tension row, S-8 books the id: two rows, no double-book | no CC id names the component today; 8 live `slider-track-bg` sites are the glass-8 limb, separable |

**Consequence.** X-W5 (S-1, S-7), X-W6 (S-7, S-8), X-W7 (S-4, S-5, S-6, S-7), X-W8 (S-4, S-8), X-W9
(DR-21, S-3) and X-W10 (CC-104/OP-1, S-2) may open lawfully, each landing the dated addendum its
ruling names as its first docs act. X-W0's repair seat lands §0k.1's HG-7 cure and the §Verification
Artefacts pointer; its fresh check then adjudicates the close.

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

## §0l ADDENDUM 2026-09-17 — THE X.P.W1 CLOSE DOCKET, RULED (same sitting, third session)

**Provenance.** X.P.W1 closed with 9 of 10 gates GREEN and two escalations returned
(`execution/D/X-P-W1.md` §Close). X.P.W0 is CLOSED CONFORMANT. E-3: no wave file is edited here.

- **E-1 — the literal `npx tsx …` gates cannot run from `<p2>`: the fresh root OWNS ITS TOOLCHAIN.**
  Measured cause: `<p2>` (`/Users/mkbabb/Programming/parse-that-css-totality-p2`) has no root
  `package.json`, so npm's up-walk terminates at a stray `/Users/mkbabb/package.json` and the home
  directory becomes the prefix. That file is the owner's and is **not touched**. The cure is the
  idiomatic one: **X.P.W2's first commit lands `<p2>/package.json`** (`"private": true`; exact-pinned
  devDependencies `tsx` · `typescript` · `vitest`) **and its lockfile**, under a dated E-3 addendum to
  `parse-that/waves/W2.md` §4 admitting those two paths (Q-1's named §3a expansion, granted here).
  G-2/G-4/G-5's literal invocations are then re-run from `<p2>` at X.P.W2's open and their readings
  banked beside X.P.W1's; §7's `tsc --noEmit` limb over `harness/bench/bench.ts` (3 diagnostics, R-1)
  and the `vitest` limb (R-2) are cured in the same opening unit. No global install, no `npx` from a
  foreign cwd recorded as the gate's form.
- **E-2 — G-8 is HONEST-RED by its own falsifier** (*"the probe stays wired until the whole surface is
  total"*; §3 L109 forbids this wave the grammar). Owner: **X.P.W3** (the 52-export universe TOTAL; the
  R1 throw class dead). W1.md §6's preamble and §12 are read with that relief; X.P.W1 closes
  IMPLEMENTED with G-8 carried, never GREEN-by-assertion.
- **R-7** (roots-census.sh's missing EPERM disposition) → X.P.W2's open, under the same dated §4
  addendum (one path: `docs/tranches/X/parse-that/evidence/W0/roots-census-v2.sh`, a successor beside
  the sealed original, never an edit of it).
- **R-5 MAJOR — `harvest-journals.mjs` drops every CONFORMANCE-schema row** (severity/claim/receipt):
  1,487 of `DEFECT-LEDGER.md`'s rows are empty stubs. Owner: **X-W11**, which §0k.1 already charges
  with the once-only X-track harvest — the harvester's row template gains the conformance schema
  **before** that harvest runs; falsifier `grep -c '^\*\*Defect\.\*\* $'` → 0. Hand-editing generated
  bytes stays forbidden. R-8/R-9 (79 unharvested runs; the NAMES map's missing X·P entry) ride the
  same X-W11 unit.
- **R-13** — `<p2>` is pinned by convention only; X.P.W2's opening commit states its base
  (`f5757082`) in its body, which is the ref-of-record from then on.

## §0m ADDENDUM 2026-09-17 — THE TRACK B CLOSE DOCKET (KF.W0 · KF.W1 CLOSED; KF.W4 · KF.W9 PARTIAL), RULED

### §0m.0 · A finding against this sitting's own ruling, recorded loud (E-3)

§0j.C ruled the §B-12 reset "snapshot-first, untracked files left in place by the reset exactly as the
spec requires." **That premise was wrong for one class**: `git reset --hard <t>` skips the
untracked-overwrite guard `git checkout` applies, so an untracked file whose *path exists in `<t>`* is
overwritten with `<t>`'s bytes. Measured by the OP-1 seat, double-run: untracked **124 → 6**; under
`docs/tranches/V/` **99 → 2** — **118 files absorbed, 97 of them keyframes' own V-tranche docs**, every one
present at `origin/master` and now carrying frontier bytes. No git object holds the prior bytes (the
snapshot commit `6d280ee7` staged tracked rows only, as ruled); the loss is **irreversible** and the
membership is unrecoverable (APFS birthtimes reset by git). **Bounded**: the six survivors include both
value.js-delivered mail packets (I-26's O-8/O-11 cure, byte- and mtime-intact) — E13's consequence is
nil; the absorbed 97 are the frontier's own authority for this wave (local `8281638c` DISQUALIFIED).
**Owner-facing**: reported in the close report of this session by id. **Law minted**: a reset toward a
target is preceded by `git ls-files --others --exclude-standard | while read p; do git cat-file -e
"<t>:$p" 2>/dev/null && echo "$p"; done` — the untracked paths the target would overwrite — and those
are committed to the snapshot branch first. The spec's own words (*"untracked V docs unharmed"*) were
transcribed without this measurement; that is the defect, and it was this sitting's.

### §0m.1 · KF.W4 — the sequencing head, its three escalations, ruled

- **F-1 — the four orphaned flat-layout src drafts** (`compile/{compiled-frame,interp-slot,value-ast}.ts`,
  `group/composite-storage.ts`; untracked survivors, unreachable by any frontier specifier; 1 of 4
  lib diagnostics and 24/24 `proof:structure` violations): **PRESERVE THEN REMOVE** — the KF.W4 repair
  seat commits them onto `kf-sacred-snapshot-2026-09-17` as a second dated snapshot commit (`git
  checkout <branch> && git add <the four> && git commit`), then removes them from the `master`
  worktree. N-2's orphan hazard, closed the reversible way.
- **F-10 — R-2's reverse-map retirement** needs `constants/types.ts:57-62` (`Easing = {fn, css?}`) and
  `defaults.ts:85` (the nameless default easing): **KF.W4's §Bounds are widened by dated E-3 addendum
  at KF-W4.md to those two loci**, and the default easing gains a name so a bare retirement cannot
  make default-easing serialization throw (§Bounds L65 honoured, not bypassed).
- **KF-CB-29, the `| string` arm — candidate (ii)**: `CssEasingLiteral`, an exported template-literal
  union declared in-bounds, replaces `| string`; §Bounds gain the single type-only token at
  `compile/emit/css-text.ts:30`. (i)'s 14 errors in the shipped preset catalogue prove the bare
  deletion is the wrong cure; (iii) re-routing carries the head's RED into a later wave.
- G-KFW4-3's ten eslint sites (7 `vue/no-mutating-props`, behavioural) and R2's two behavioural defects
  are **honest-RED with named owners** (KF.W6 / the UNIT packets KF.W12–13); G-KFW4-7's nine false
  attributions are cured by the repair seat if in bounds, else routed with receipts. **KF.W4's next
  close pushes its own commits** (`5388907b`, `fb509edd` + the repair) — a wave's close pushes `origin
  HEAD` for the wave's own work; a sibling never pushes it.

### §0m.2 · KF.W9 — the capture substrate, ruled

- **Shape (b): build and serve from a SEPARATE CLONE at the named ref.** `git clone --no-hardlinks
  /Users/mkbabb/Programming/keyframes.js /Users/mkbabb/Programming/keyframes-w9-capture && git -C … checkout
  55e9bf0d` — a grant for that tree only, never the sacred checkout; `npm ci && npm run gh-pages` there;
  the bundle's `bundleSha256` and `substrateSha` are then both measured, never asserted.
- **Substrate: HOLD `55e9bf0d`** (the published pin = `origin/master`); no re-pin on a seat's authority.
- **`--bundle-sha=` discipline unchanged.** iOS cells: **UNREACHABLE-IN-CELL** (no paired device;
  `safari:useSimulator` refused) — recorded, never inferred from webkit-engine (I-20's law).
- `.d` (contrast / forced-colors / AT — the AT arm per §0j.C) and `.e` (the 13 addenda write-back +
  the fold of `.c`'s 27 rows) are dispatched at the relaunch; OD-V3/OD-V5 stay as §0j.C ruled.

## §0n ADDENDUM 2026-09-17 — THE X.P.W2 DOCKET (`W2-KILL-LEDGER.md` §9 E-1..E-8, ESC-i2, C.6), RULED UNDER THE BEGIN-WORD'S DELEGATION

The kill ledger escalated to the owner by name, as `W2.md` §3e told it to. The owner's standing
instruction for this execution is the §0j begin-word — *"do not relinquish control back to me until
you have completed the plan IN TOTALITY"* — under which §0k, §0l and §0m already ruled owner-named
dockets. These rulings are the orchestrator's (served model `claude-fable-5-1`), recorded so the owner
can overturn any of them at read; every one is reversible (the graduation is a copy on a branch; the
unnamed survivor's worktree is preserved, never deleted).

### §0n.1 · E-1 — THE TIE: word (a). **AC-1 TAGLESS-TWIN is the survivor.**

Not by preference and not by averaging: the ledger's §7.1 names the three asymmetries that are neither
encoding- nor instrument-dependent, and each is read here against what W3 must build (the 52, total,
on the library's own surface):

1. **The hypothesis's own words.** The surviving hypothesis asks for a JS lowering *"source-direct on
   the combinator library's own surface"*. In AC-1 *the interpretation IS the parser*: `buildGrammar(A)`
   instantiated over parse-that's `Parser` — the grammar is combinator code, typed by the 22-op
   signature. AC-2's grammar is a data object read by a compiler; source-direct one layer down. Both
   passed G-10; AC-1 satisfies the sentence literally, and W3's grammar authors read and write
   combinator code, not an IR.
2. **Numerics.** AC-1: a correctly-rounded path, **0** mismatches over 520k tokens, undecidables
   flagged. AC-2: exact path on corpus numerals, a **declared non-correctly-rounded fallback (3 ULP
   worst)**. Over the 52's full numeral surface EQ-1 is a K-1 hazard for AC-2 and not for AC-1 — the one
   asymmetry that bears on a kill rule's *future* reading.
3. **§10.2, ruled below (E-4) as DISPATCH-first**: AC-1's one acceptance-changing deviation becomes the
   contract; AC-2 as shipped rejects `linear(…)`. D-2 dissolves in AC-1's favour by the addendum, not by
   taste.
4. A grammar-agnostic Wasm runtime (`run · setTheta · highWater · reset`) versus per-production entries
   over a 32 MiB constant memory — the shape W3's 52 entries need.

**What AC-2 had that W3 keeps (carried as W3 open-seat obligations, not lost):** the closed-union
enforcement — W3 wires a gate that a 23rd operation halts *both* lowerings (AC-1's analog: the
`buildGrammar` destructure of exactly 22, made a wired check); the stripped-`PATH` / scratch-`HOME` /
different-node K-9 recipe becomes W3's K-9 procedure; AC-2's worktree `<p2>/.worktrees/ac2` at `a7ac4ea4`
stays. **E-1(b) Stage 4 is NOT ordered** — K-5 is recorded-not-gating under OC-1, and the mirror-image
G-8 legs make a mixed reading the likely outcome, which the ledger itself routes back to (a).

### §0n.2 · `.i` opens on this word — and ESC-i2

`.i` executes `W2-KILL-LEDGER.md` §11 mechanically for AC-1 (source `<p2>/.worktrees/ac1/experiments/w2/ac1-tagless/**` at `af40fb2d`; destination `<p2>/typescript/src/css/**`; only move-forced relative-import edits, listed one by one; the 1.0.0 import carried, not re-pointed — §0n.7). **ESC-i2 ruled**: the sub-gate's subject is the library workspace's own project — `.i` runs `npm ci` in `<p2>/typescript` (lockfile-pinned install; no tracked byte written; recorded with the lockfile's digest) and then `npx tsc --noEmit -p typescript/tsconfig.json`. No root `<p2>/tsconfig.json` is minted. Errors that remain and sit outside `typescript/src/css/**` are recorded **RED-PREEXISTING** with their counts by code; errors inside the graduated tree are `.i`'s. G-3 reads EQ-6 = 2,035 at the graduated location and is recorded honest-RED with E-2's id (§11.5). The wave closes IMPLEMENTED-with-carried-REDs (G-3 · G-4 · G-7 · G-8), never GREEN-by-assertion. The relaunch's close also performs C.6's remaining §4a acts: the evidence fold beyond `h/**`, the `x-p-w2.json` harvest, the `DEFECT-LEDGER.md` append, the COHESION §5 carve, and the candidate-branch merge (`w2/ac1` → the root's working branch, after the ledger commit — §9 *"merged … only after phase 5"*).

### §0n.3 · The contract addenda (E-2 · E-3 · E-4 · E-5 · E-8) — landed by X.P.W3's first act as ONE dated addendum-beside to `ALGEBRA.md` (both homes, sha256-equal), never by `.i`

- **E-2 (G-3's cause, §4.5 × §10.1).** Cure **(3)**: the `balanced-tail` `DROP` is re-kinded to `skipped` — the dropped tail of an unknown function is skipped opaque text, not a keyword and not a seventh kind. W3's open seat re-measures the cure on the promoted seed (population 2,035 → 0, no other product moved); if it can cite an OP-13 invariant that (3) breaks, it falls back to **(1)** the seventh kind `opaque` and re-indexes `.g`'s serializer. (2) widening `π_keyword` is REFUSED — it admits non-identifiers as keywords.
- **E-3 (the `CUT` idiom).** `DISPATCH` joins §5.2's pass-through list; §10.3's two inert `CUT`s are struck (measured inert over 30,527 rows, `.f`). G-1's structural walk then measures the contract, not an encoding.
- **E-4 (§10.2).** The `DISPATCH` arm first — the minimal reorder, measured by `.d` and `.e` as moving exactly 3 slice rows REJECT → ok.
- **E-5 (EQ-5's sixth coordinate).** Dropped from the cross-lowering tuple; the arena watermark is printed as a G-8 row (AC-1's bytes already read so: 0 in both + `arenaHighWater()`).
- **E-8 (F-8).** `color-body` inlined in the letter; §8 D-3's two-`REF` count stands.

### §0n.4 · E-6 — W1's bench bounds, widened by dated addendum (an owner act, taken under delegation)

`harness/bench/lib/engines.mjs` may gain an `--engine=<adapter>` registration path (a closed chain becomes a chain plus one declared external cell); landed by **X.P.W3** under a dated E-3 addendum to W1's §Bounds, so G-7 has a subject. K-5 stays recorded-not-gating (OC-1); the table is printed for both lowerings of the graduated seed, two runs pasted. Not `.i`'s.

### §0n.5 · E-7 / OP-7 — the substrate

W3 builds the 52 on `<p2>/typescript/src/parse/**` — the fresh root's own library — never on another repository's `node_modules`. The clone point's three unadjudicated `typescript/src/parse/**` commits are **ADOPTED as the base** (R-13 stated `f5757082` as W2's base; reverting them would move the base every W2 number was taken on). The seed's one import specifier is re-pointed by W3's first act (§11.3); the scan union `w2/ac3-scan-union` `76033aac` (F-h8) is consumed at W3's open **by measurement** (library `tsc` + `vitest` unchanged-or-better), else left on its branch.

### §0n.6 · Orchestrator acts performed at this sitting

F-h6: the two blind drafts committed `562077ad`. F-h7: `<p2>/experiments/w2/contract/ALGEBRA.md` re-landed byte-equal (`67c8253a…`) at p2 `4afad90`. `?? .worktrees/` stays (§4b's container). Track D relaunched fresh; seat 0 RESUME MODE dispatches `.i` on this word.

## §0o ADDENDUM 2026-09-18 — THE F.W1 DOCKET (WU-R ESC-2..ESC-7, G19) AND THE KF.W2 ESCALATION, RULED UNDER THE BEGIN-WORD'S DELEGATION; THE RUNNER-DEAD WAVES

Same standing as §0n: orchestrator rulings under the §0j begin-word, reversible, overturnable by the
owner at read. G19's condition — *"ESC-1..ESC-7 each carry a ruling or an explicit deferral with
blocked rows named"* — is met by this addendum; ESC-1 stays as ruled at §0i.3.

| id | ruling | blocked rows released |
|---|---|---|
| **ESC-2** ToC model ownership | **ONE owner.** The ToC model is a single `useSidebarFollow` instance owned by the paper view (the highest common ancestor of sidebar and body), provided through a **typed `InjectionKey`**; the second instance and the untyped `defineExpose` seam are retired. Ruled at F.W1 as WU-R says; **F.W4 executes the collapse**; L-5(a) is its prerequisite. | `fr-PaperSidebar L-4` · `M6` |
| **ESC-3** the invisible picker | **FOLLOW THE PRODUCER.** No edgeless trigger is re-created downstream (glass-ui-first-class law; the producer's docblock at `17a11bc5` rules it out by design). The six pickers gain an edge at the hop — a WU-F diff-review row and edge-9 checkpoint, not a port. | `U-2` |
| **ESC-4** easing drift | **DRIFT REFUSED — no acceptance, silent or explicit.** Measured at the published bytes: value 4.0.0's `./easing` carries 8 analytic survivors; keyframes.js's source carries 8 names; **no producer ships the 22**. The 14 orphans (`ease-in/out/in-out` × back · quad · cubic · sine · expo · circ minus the survivors) are **defined analytically inside the corpus's own `web/src/lib/easings.ts`** (the closed forms the morph catalogue already relies on — one line each; the file already owns the catalogue), the 8 survivors re-point to `@mkbabb/value.js/easing`, and `easings.ts:58`'s `as EasingFn` cast falls with the `timingFunctions` lookup. **The gate is MPC-5's sampler re-run: every one of the 22 samples EQUAL (Δ = 0 at every sample point) to the pre-bump 0.13.0 function under the same key**, so the hop changes no motion; RD-5 RESTORE is thereby executed, not re-priced. No CubicBezier approximation is admitted for any key. | `L/B-1` · `MPC-5/RD-5` · the six bare-root import lines · limb 1's lockstep half |
| **ESC-5** B-2's regrade | **STANDS AS PRICED.** The antecedent (*"if G5 is not adopted"*) is measured false — G5 adopted and GREEN at unit `c`; no revisit. | `B-2` |
| **ESC-6** `color-mix` band | **INFO.** The band is Baseline 2023 (Chromium 111 · Safari 16.2 · Firefox 113); no hand-authored fallback; `FR-COB-26` records the band and the 1.00:1 paint of the generated fallback as the consequence below it. | `FR-MSP-12 → FR-COB-26` |
| **ESC-7** the `outline` register | **RETIRE the register; successor by rule, per-site exception by evidence.** Default mapping `variant="outline"` → `emphasis="secondary"` (the bordered, unfilled register in the producer's four); a site re-selects `quiet` **only** where its own evidence row shows a tertiary action, and the re-selection is written into AA-2's map as that site's row. The lone `link` site → `emphasis="text"` — the G7 evidence's "nearest" reading is **ADOPTED as the banked mapping** by this ruling. **No successor is requested on NWO-1**: asking the producer to re-mint what it retired inverts glass-ui-first-class. G7 sizes the 21/14 (+2 `Badge` sites, which keep `Badge`'s own `variant` if the producer still ships it, else `secondary` likewise); G6's limb 2 is bounded. | the 21 sites / 14 files (register 30/16) · AA-2's sweep · G7's application · `fr-BasisSelector M-1` · G6's atomicity · the `link` site |

**ESC-KFW2-1 (KF.W2 G-W2-2, Tier-A single entry).** The §Bounds addendum-beside is **GRANTED**:
`src/animation/engine/css/metadata.ts` joins KF-W2's Owned-files table by dated E-3 addendum; the
one-import repoint (+ call sites `:42/:102`) is performed by **KF.W8's unit d** beside MISS-β2 (the
same parse/emit neighbourhood, one commit), and G-W2-2 is re-measured at KF.W8's close.

**The runner-dead waves (F.W7 · KF.W6 · KF.W7).** Each open seat died six times with `[Request
interrupted by user]` — the harness's concurrent-agent ceiling, not a wall (A and D ran through it,
no synthetic stop anywhere) — and the stall detector then declared the wave dead. Nothing was
written by any of the eighteen attempts. Cure at the chassis: Tracks B and C relaunch at **one wave
at a time** (`maxWaves: 1`), the fan-out the ceiling tolerates; the waves re-open in RESUME MODE.

**§0o erratum, 2026-09-18 (E-3, dated beside).** The runner-dead paragraph above attributed the six-fold seat deaths to the harness's concurrent-agent ceiling. Measured afterwards in the dead seats' own transcripts: each death follows a tool result answered by **no model turn for > 180 s**, and the transcripts carry **twelve HTTP 429 responses** — the API's rate-limit backoff outran the runner's 180 s no-progress window. The ceiling was never the cause; the one-wave-at-a-time cure stands because it lowers request rate, which is the true lever. Relaunch remains the durability mechanism (the begin-word's *"survive … rate-limiting"*): a runner-dead wave re-opens in RESUME MODE with nothing lost.

## §0p ADDENDUM 2026-09-18 — X.P.W3 NOT-CONFORMANT AFTER TWO REPAIRS: ESC-e1 (THE LOAD-BEARING SHIELD) AND ESC-e2, RULED; TWO UNITS ADDED BY ADDENDUM

Same standing as §0n/§0o. `W3.md` §3a routes a G-5 divergence *"rooted in the Wasm memory model"* to
X.P.W1/W2 as an architecture question; both are CLOSED, so this addendum is the triumvirate's redress
(research: `.e`'s L-14 measurements at `<p2>` `dc52ed5`; plan augment: below; redress: units `.f`/`.g`).

**ESC-e1 — measured.** `parseStylesheet` over 8,191 valid rules overflows the Wasm mark journal
(`MARK_CAP` 32,768; `lowering-wasm/index.mjs:274` throws `HALT: … overflowed its fixed region`), and
`source.length > INPUT_CAP` (1,048,577 code units, `:266`) throws likewise; `entry.mjs:191`'s catch
re-shapes both as `ok:false css_syntax` (`SHIELD.caught` +1) while the JS lowering answers `ok:true`.
The shield is therefore LOAD-BEARING and the two targets diverge on valid input — G-3's falsifier
fires by inspection, G-5's intent fails beyond the corpus.

**Ruling — the depth bound's own idiom, applied to every fixed region.** `bounds.mjs` already states
the law: *a bound is a VALUE, an ASSERTION that the mechanism carries it, and a WITNESS GENERATOR;
a bound reached is an ordinary `ok:false` with a frozen code.* So:
1. Every fixed region of the Wasm memory model — the input window, the mark journal, the value
   stack, the arena and the C/D/P journals (whatever `W_OVF` guards) — becomes a **declared
   capacity in Θ** (`THETA` gains them beside `depthBound`), its VALUE **read from the build's own
   layout constants**, never re-typed by hand and never re-sized by this unit.
2. **Both lowerings carry each bound** and reject at it on the parse path, BEFORE the region can
   overflow: the JS lowering measures the same quantity (source length; its own mark/journal
   counters, which EQ-4 already makes it keep) against the same declared value. The rejection is
   `ok:false` with **`css_syntax`** and a label naming the bound (`marks <= 32768`, the `nesting <=
   64` form). **A ninth code is REFUSED** (`codes.mjs`, §3a) — capacity, like depth, is `css_syntax`.
3. `witnessAtCapacity(bound)` generators (not pinned strings) for each region; `assertCapacityBound`
   reads each value back off BOTH lowerings and the label surface, as `assertDepthBound` does.
4. **Growable regions are REFUSED**: an undeclared bound is the defect (the JS lowering itself dies
   at a 24 MB input on this box — heap OOM, exit 134 — which is the same class); the cure is
   declaration, not elasticity. The shield stays retained and must measure NON-load-bearing on the
   new witnesses (`SHIELD.caught` 0), which restores `.c` item 1's own sentence.
5. G-5 is re-run with the capacity witnesses folded into the corpus as a boundary band; G-9 gains a
   capacity leg beside depth and latch.

**ESC-e2 — L-13's 5-of-6.** A wave's last seat cannot harvest itself. **The successor harvests**:
X.P.W4's seat 0 re-runs the harvester over W3's journals (6 of 6) at its open; W3's L-13 reads
HONEST-RED-BY-CONSTRUCTION at close. **F-e11 / K.7(i)**: the harvester's 143-file spillage and its
wholesale `DEFECT-LEDGER.md` rewrite are a MAJOR defect of the harvester, owed to X-W11's HARVEST
(§0k HG-7's owner); until cured, every harvest runs **from a scratch mirror with the script
symlinked** (the procedure `.e` used), and `W3.md` §4's *"writes only the two registry rows"* gains a
dated addendum-beside naming that procedure — the spec is never patched.

**F-e1 / F-e2 — spec-conformance MIS_ACCEPTs (L-14 (ii)).** `hsl(120deg50%50%)` and
`rgb(255none none)` are accepted by both lowerings where css-syntax-3 §4.3.3 tokenizes `120deg50` /
`255none` as single invalid `<dimension-token>`s; legacy `hsl(120, 50, 50)` is rejected correctly
(the incumbent mis-accepts — a new value.js divergence row). A candidate that accepts invalid CSS
fails R1 totality in the accept direction; cured in-wave as unit `.g` (the juxtaposition boundary in
`algebra/**`), never routed to the adoption seam.

**Units added to `W3.md` §5 by dated addendum-beside** (bounds already granted: §4 row
`typescript/src/css/**` create/modify): **`.f`** capacity bounds (Fable seat — the Wasm memory model
is architecture) → **`.g`** dimension-token boundary (Opus seat), serial, both after `.e`; each
re-runs G-3 · G-5 · G-9 and appends its receipt. Carried unmoved: F-a.6 · E-1/E-2/E-3 · ESC-c1 ·
ESC-d1 · ESC-d2 (their owners stand as W3-CLOSE.md names them). D relaunches on this word.

## §0q ADDENDUM 2026-09-18 — X.P.W3.f's ESCALATION (E-f1 · E-f2 · E-f3), RULED; `.f` REDISPATCHED WITH ITS GRANTS

`.f` halted per §3a without landing a byte (`<p2>` `ab6d694` unmoved; reachability census banked at
`evidence/W3/capacity-reachability-2026-09-18.*`, `e765e079`). Each ask is answered at the bytes it cited.

- **E-f1 — GRANTED.** `.f`'s writable set gains `typescript/src/css/algebra/tables.mjs` (the capacity
  labels appended to `L` AFTER `"<string>"`, no index moves — K-10-safe) and `typescript/src/css/diagnostics.mjs`
  (the promoted rows, e.g. `<mark-journal> (at most 32768 marks)`; `isNamedProduction` accepts them).
  `.g` (`algebra/**`) runs after `.f`, so no two writers share a path.
- **E-f2 — nine `W_OVF` regions, three classes, ruled per class.**
  - **Class 1** (input · marks · recoveries · D): boundary-visible in both lowerings, identical by
    measurement — cured as §0p states.
  - **Class 2** (C · P, restored journals whose guarded quantity is a PEAK): **peak-with-grant.**
    `.f` gains `lowering-js/runtime.mjs` (the appender) and `lowering-js/js-alg.mjs` (the push sites)
    for a high-water counter on the journals the JS lowering ALREADY keeps (EQ-4) — the same quantity
    the module guards, not a second memory model. Final-count-with-proof is REFUSED: a restored
    journal's final count does not bound its peak.
  - **Class 3** (value stack · arena · expsnap; no σ-side quantity; arena overflow a Wasm TRAP):
    **unreachable-by-construction.** Θ declares each class-3 capacity from `layout.mjs`; `.f` derives
    a per-unit ceiling `K` for each from the emitter's own node table (bytes per tag, cells per
    numeral, snapshot depth per `REF`) in terms of already-declared class-1/depth quantities, and
    ASSERTS AT LOAD `cap₃ ≥ K × bound₁` — lowering the declared class-1 bound in Θ (both lowerings)
    where the built module's regions require it, so a class-1 rejection always fires first. The
    suite measures the census maxima against `K` (`≤`, never `=`). Shadow counters are REFUSED.
- **E-f3 — the in-bounds form.** A capacity-band identity leg in `test/css-recovery/boundary/capacity.test.ts`
  using G-5's `canonical()` idiom, reported BESIDE the unchanged 79,674 / 0; `corpus.json` and
  `css-dual-target-identity.mjs` (sealed, `.a`/`.d`) untouched.
- **Also ruled:** the valid-input window witness is `"a"×(INPUT_CAP−1) + "{}"` (the seat's correction
  of R3.4); the mandatory census (20 families, binary-searched) is the suite's boundary band.

`W3.md` gains a second dated addendum widening `.f`'s Files line accordingly. The running D workflow
was STOPPED before its close/check could grade an unrealizable unit; D relaunches on this word.

## §0r ADDENDUM 2026-09-19 — X.P.W3's THIRD CLOSE (NOT-CONFORMANT): THE SURFACE IS UNAUTHORED, NOT UNRELIEVED; FOUR IMPLEMENTATION UNITS ADDED; ESC-g1 · R-f1 · F-z2 RULED

**The finding, at the bytes.** `universe-52.json` tally: runtime **TOTAL 0 · PARTIAL 3 · ABSENT 16**;
types **TOTAL 5 · ABSENT 28**. The candidate realizes 3 of 9 public entries (`parseCssColor`,
`parseTimingFunction`, `parseStylesheet` — the AC-1 slice) and no other runtime export. W3.md §3
items 2–3 scope *"every runtime export TOTAL … every type export TOTAL"*, §2a makes it the goal
criterion, and X.P.W4 §2 checks `universe-52.json all TOTAL` as a precondition — yet §5's five
units (`.a` universe · `.b` recovery union · `.c` R1 execution · `.d` differential floor · `.e`
closure) are instruments and cures, and **no unit was ever scoped to author the remaining six entries
and their families**. The check's CRITICAL (G-1 5/52), HIGH (G-7 1,908 coverage absences over 44
NO-PEER rows) and HIGH (G-4 C-3: 5 of 8 codes emitted by nothing) share that one root. This is a
spec omission at authoring, cured by dated addendum (E-3), not a relief question.

**Four units added to W3.md §5 (`.h` → `.i` → `.j` → `.k`, SERIAL — they share `algebra/grammar.mjs`,
`tables.mjs`, `diagnostics.mjs`; one writer at a time).** Every unit authors in the 22-operation
algebra through `buildGrammar(A)` — ONE grammar source, both lowerings by construction (that is what
AC-1 was chosen for, §0n.1) — with: dispatch rows; labels appended after `"<string>"` (K-10);
promoted diagnostics rows; the export realized on the adapter and in `build/ac1.d.ts`; the universe's
own accept/reject columns as the corpus band; frozen codes only (no ninth); and a receipt with G-1's
rows for its exports, G-2 22/22, G-3 `SHIELD.caught` 0, G-5 identity, G-9's capacity leg with the
re-derived Θ per entry (a new production moves the arena rate — INFO-g1 — so Θ is re-derived and
REPORTED, never silently narrowed).
- **`.h` the value grammar (Fable seat — the design-heavy core):** `parseCssScalar` ·
  `parseCssValue` with the syntax vocabulary (`<length>` … — emitting `syntax_mismatch` /
  `syntax_descriptor_invalid`) · `parseCssValues` · `coerceToSyntax` · `serializeCssColor`;
  `parseCssColor` PARTIAL → TOTAL; types `CssColorSpace` · `CssLinearStop` · `ParseIssue` ·
  `ParseResult` (bidirectional assignability in `.a`'s generated program).
- **`.i` the animation family (Opus):** `parseAnimationRange` · `parseAnimationTimeline` ·
  `parseKeyframeSelector` (`keyframe_selector_invalid`) · `serializeTimelineOptions` ·
  `collectAnimationOptions` (`animation_option_invalid`) · `collectTimelineOptions`; the fifteen
  animation/timeline/range/trigger/view types.
- **`.j` the stylesheet collectors (Opus):** `collectDeclarations` · `collectStyleRules` ·
  `collectKeyframes` · `collectPropertyDescriptors` · `collectCustomFunctions`; `parseStylesheet`
  PARTIAL → TOTAL; `CollectedRule` · `KeyframeRule` · `KeyframesBlock` · `PropertyRule` ·
  `StylesheetItem` · `CSSPropertyDescriptor` · the three `CustomFunction*` types.
- **`.k` universe closure and the ledger (Opus):** G-1 re-run to 52/52 (or the honest remainder,
  by id); G-4 C-3 8/8 emitted; **ESC-g1 GRANTED** — `test/css-equivalence/emit-divergence-ledger.mjs`
  gains a sixth row family (**§6 INCUMBENT-DEFECT**: the oracle mis-accepts, the candidate is right
  per spec — the legacy-`hsl(120, 50, 50)` row first), with §0/§2/§3 headings and prose made
  COUNT-DRIVEN and `equivalence.test.ts`'s heading assertions made count-driven in the same commit
  (an assertion that hard-codes "four" is the defect ESC-g1 measured); **F-z2 ruled** — the
  mirror-defect denominator's `DECLARED_HEADS` is read from the ORACLE's surface (the pinned 4.0.0
  tarball's heads), never the candidate's own `R_disp`; G-7 re-run with the census at 30.

**R-f1 — the input window (Θ.input 65,458, derived).** Lawful under §0q and honest, but a 64 K
window is a product defect for `parseStylesheet`. **Ruled for X.P.W4** (the adoption seam), shape
fixed: (a) the layout derives the class-3 regions FROM Θ (`cap₃ = K × INPUT_CAP`, the full 1 M
window), the linear-memory cost measured and printed; if that cost exceeds 64 MiB, (b) a per-entry
window table carried by both lowerings — value entries at the full window, `parseStylesheet` at the
derived bound — with the table asserted on the label surface. Not a W3 unit; W3 closes with the
derived Θ and CAP-1 rowed.

Carried unmoved: ESC-c1 (latch, the parse-that library seam → W4) · ESC-d2 (G-2, → X·V) · E-2/F-e10
(C-4's dead falsifier → W4). D relaunches on this word.

## §0s ADDENDUM 2026-09-19 — X.P.W3.h's ESCALATION (E-h1 · E-h2 · E-h3), RULED; THE CTOR QUARTET GRANTED TO EVERY GRAMMAR UNIT

`.h` landed no mechanism byte (`ef5e6765`, evidence `value-grammar-bounds-2026-09-19.*`); its finding is structural and applies to `.i` and `.j` equally, so it is ruled once for all three.

- **E-h1 — GRANTED, for `.h`, `.i` and `.j` alike.** In this substrate a value shape exists only through OP-19 `CTOR`, whose constructor is realized per lowering; a CTOR row is therefore ONE algebra write and THREE realizations: `lowering-js/js-alg.mjs` (`CTORS`), `lowering-wasm/wasm-alg.mjs` (`emitCtors`, incl. the colour-space list hard-coded at `:683`) and `bounds.mjs` (`CTOR_ALLOC` / `CTOR_SCRATCH_CELLS`, walked at load and HALTing on an unknown row). Each grammar unit's Files line gains those three, **for CTOR rows only** — the four name-sets stay equal and that equality stays asserted at load (`N=N=N=N`); `layout.mjs` and every CAP untouched; `runtime.mjs` not needed (name guards through the existing `F.kwLookup` over the `T_STR` span). This is the E-f1/E-f2 precedent, generalized: a family that adds shapes adds rows in all four places in ONE commit. `parseCssColor` → TOTAL includes realizing every colour head the ORACLE's surface ships (the 84 unrealized-head cells), not the six the slice carried.
- **E-h2 — RULED, a `.k` act.** G-1's oracle override matches LITERAL inputs (`matrix.mjs:120`) while the rulings it encodes are CLASSES (PB-03 hsl-100× · PB-04/05 clamp · PB-08 rewrite · PB-12 trailing-dot · ADJ-2 juxtaposition …). `.k` extends `test/css-totality/lib/adjudications.mjs` from literal lists to **class predicates**, one per ruling id, each printing its own census (the 4,509 by class as `.h` measured them) so G-1 counts a row TOTAL against the ADJUDICATED expectation and a predicate that swallows an un-ruled input is itself a defect (the predicate census is asserted `≤` the ruling's measured population). Until `.k` lands, `.h`–`.j` report their rows with the two numbers (raw misses · misses-in-adjudicated-classes) — never TOTAL-by-assertion.
- **E-h3 — RULED.** `coerceToSyntax(source, syntax)` and `parseCssValue`'s syntax arm are **surface compositions on `entry.mjs`** (granted to `.h`): the grammar parses the value; the entry checks the descriptor and raises `syntax_descriptor_invalid` spanning the SOURCE (`syntax.ts:96`'s own shape) or `syntax_mismatch` with `expected` = the descriptor's own alternatives — a DYNAMIC expected list is lawful (the frozen surface is the eight-code union; `L` is the grammar's label set, and descriptor alternatives are data), raised through `selectCode`, never a ninth code. `.k`'s closure runner (`scripts/css-recovery-closure.mjs`) gains the two-argument entry so C-3 can count both codes.

`W3.md` gains a fourth dated addendum widening `.h`/`.i`/`.j`'s Files lines and `.k`'s Mechanism. D relaunches on this word.

## §0t ADDENDUM 2026-09-19 — KF.W10 OWNERSHIP CURED; THE X·KF SUB-TRANCHE STAMP UNBLOCKS

**KF.W10 ownership gap (KF-W10.md §2a OP-6, §6.E; RULINGS R-18; vehicle re-cut at repair round 5,
R5-12(2)): CURED by assignment, mirroring §0b.** §1 assigned KF.W0/W2/W4/W5/W8 to SS-1 and
KF.W1/W6/W7/W9 to SS-2 and named no owner for the fold-discharge wave. Disposition: **KF.W10 belongs
to SS-2** — it is the coordination-terminal wave whose hardest dependency is KF.W1's Mail Cure
(O-21, edge 6) and whose content is ledger/mail terminalization, the frontend-and-mail half's own
kind; its spec was authored under that seat at `KF-W10.md`. Consequences, read as the spec reads
them: G-2's set-difference is now an OWNED assertion (`.b`'s product, `.f`/`.g`'s input); the X·KF
sub-tranche-scope SPECIFIED stamp, withheld at KF-W10.md §State pending this line, is no longer
withheld by COHESION; the 7-unit plan banked at `execution/B/KF-W10.md` dispatches unchanged. The
minted-wave boundary (§0d) and KF.W3's GATED posture (§0b) are untouched by this assignment.

## §0u ADDENDUM 2026-09-19 — KF.W11 · KF.W12 · KF.W13's OP-0 (G-KFW4-1 GREEN) IS CIRCULAR AS A COUNT; RULED AS A RATCHET; THE UNOWNED REMAINDER AND THE KF LOCKFILE GET AN OWNER

**Measured by three seats at kf `dd28da55`, double-run:** `npx vue-tsc --noEmit -p tsconfig.json | grep -c 'error TS'` → **54 · 54**. Decomposition: **24** in `demo/scenes/cube/orbital-drag/OrbitalDrag.vue` (KF.W11 `.a`'s own modify row) · **13** inside KF.W12's §B.2 rows (six the type-level shadow of its own named cures) · **4** inside KF.W13's rows (+1 on its declared carve) · the remainder (**≈12**) outside all three. `KF-W4.md:2396` routes G-KFW4-1's demo residue *"to the UNITs"* by name and KF.W4's CHECK 2 (`execution/B/KF-W4.md:2505`) reads the successors *"not blocked by this wave's RED; they await the SS-1/SS-2 authoring block"* — landed at `f208ff31`. A count-zero precondition whose residue lives inside the blocked waves' own rows cannot be met by any lawful seat: **disposition (b), the chassis-landed reading, as a dated addendum-beside (E-3).**

**OP-0, as ruled — a RATCHET, not a threshold.** (1) The precondition each of the three waves checks at open is the **chassis**: `vue-tsc` wired as a blocking leg of `npm run check` on the merge path (G-KFW4-1's WIRED half, GREEN since KF.W4). (2) Each wave banks the count at its open and **may not raise it**; every unit **zeroes the diagnostics inside its own §Bounds rows** as part of the cure that owns them (a diagnostic that is the type-level shadow of a named cure falls WITH that cure, never before it by a cast or a suppression — `@ts-expect-error`, `as`, and `// eslint-disable` are REFUSED as cures). (3) **The count reads 0 at KF.W13's close**, which asserts it double-run; G-KFW4-1 turns GREEN there and KF.W4's row gains the dated note.

**The unowned remainder — unit `KF.W11.r`, FIRST in KF.W11 (dated addendum to KF-W11.md).** Seat 0 enumerates at open every diagnostic outside the W11–W13 §Bounds rows, by file; `.r`'s writable set is exactly those files, for **type-level cures only** (unused symbols, missing `import type`, narrowings the code already performs) — each cure cited to its diagnostic; anything needing a behavioural change is ESCALATED with its owning wave named, never forced.

**R-C3 (KF.W10's residual, assigned to the orchestrator under §0j.C KF-WRITE) — the kf lockfile.** `package-lock.json` never took `3a01e362`'s `@vue/test-utils@^2.5.1`, so `npm ci` kills both CI jobs at the landing SHA and at the pre-landing control alike. **`.r`'s first act**: `npm install --package-lock-only` in the sacred checkout (no `node_modules` byte committed), `npm ci` exit 0 measured, `chore(lock): the lockfile takes the manifest` committed by pathspec and pushed, the CI run observed and its id recorded — so "on the merge path" is true of a pipeline that runs.

## §0v ADDENDUM 2026-09-19 — X.P.W3 CLOSED AT 46/52; THE LAST UNAUTHORED FAMILY (E-j1), THE STALE SEALS, GROUND-C AND THE W4 OPEN, RULED

**State at the bytes.** `.h`–`.k` landed (`bb136ac` · `.i` · `9aa3da2` · `44c6583`): G-1 **46/52 TOTAL, 6 PARTIAL, 0 ABSENT** (from 5/52); G-7 **134** mirror-defects, 121 spec-undecided (from 5,883); the CTOR family 39=39=39=39; class predicates landed with their own censuses (two over-reaches caught by census, cured). X.P.W4 is lawfully blocked at three `Opens after` artefacts that still carry ROUND-1 values (`universe-52.json` 5/52 · `equivalence-full-surface.json` 5,890 · `r1-anchor-after.txt` measuring the INCUMBENT).

**E-j1 — the at-rule and nesting families: unit `.l` (Fable).** `parseStylesheet` is TOTAL only with `@keyframes` · `@property` · `@function` · `@scope` · `@starting-style` · `@scroll-timeline` · `@view-timeline` · the unknown at-rule (± body) · nested style bodies — the incumbent accepts all ten, the candidate refuses all ten, the union corpus witnesses none of them, and three of `.j`'s own collectors are dead code without them. Shape, as `.j` measured and recommended: **the grammar answers the RAW item tree** (`sheetOver` is the landed seam), and **`entry.mjs` completes and validates it** into the frozen `Stylesheet` — every check-over-a-parsed-value (`isSupportedSyntaxDescriptor` + `coerceToSyntax` for `@property`; `parseTimingFunction(serializeCssValue(…))` for `@keyframes`; `parseDeclarations`' option/emptyComma/range/scope/trigger checks) is the E-h3 surface-composition class, never re-parsed inside the grammar. The CTOR quartet grant (§0s) covers the ~8–11 new rows. **The stylesheet corpus band gains the ten shapes**, generated from the ORACLE's accept set (never hand-pinned), so G-1's row witnesses what it claims. **E-j2 GRANTED** to `.l`: `lowering-js/values.mjs` and `lowering-wasm/runtime.mjs`'s `F.splitSelectors` — empty parts dropped as `splitTopLevel` drops them, both lowerings. **F-k2 / F-k3** (the forbidden legacy comma forms; a comment read as a declaration name) are `.l`'s grammar fixes.

**GROUND-C (±Infinity) — RULED.** A numeric token that overflows is **not a syntax error**: css-syntax-3 §4.3.13's conversion yields ±Infinity and css-values-4 §5.1 makes range support and clamping the consumer's; `<finite-number>` as a rejection label is REFUSED. Range validity is decided per production by that production's own spec clause (css-easing-1: cubic-bezier abscissae in [0,1] → `css_syntax`, a range violation; css-values-4 §5.1 clamping where the range is implementation-supported). The 23 `parseTimingFunction` cells re-read under this rule; the cells where the INCUMBENT's behaviour differs become divergence rows adjudicated per cell by **X.P.W4's fresh Fable adjudicator** (M-23 §1), with **ID-1/ID-2** (the incumbent's unanchored-component read and empty-argument tolerance).

**The stale seals — unit `.m` (Opus), after `.l`.** The three artefacts are OUTPUTS of generators, not inputs: `.m` **re-emits** `universe-52.json` and `equivalence-full-surface.json` at W3's final HEAD by the same generators, and banks **`r1-anchor-after.txt` over the CANDIDATE's nine entries** (the anchor probe pointed at the candidate adapter — an `--at typescript/src/css` form — never at value.js's own root, which measures the incumbent: A-1). It then stamps W3 **IMPLEMENTED-with-carried-REDs, every carried cell attributed to a ruling id** (GROUND-C · ID-1/ID-2 · R-f1 · E-k2's un-measurable class-1 bounds under the derived window — R-f1's subject reaching the instrument) — never GREEN-by-assertion. **E-k1's `assignability.mjs` finding** (a compile that took no reading reported clean; now withdraws the cells and prints RED) is upheld as an instrument cure.

**X.P.W4's open — dated addendum to W4.md §2 / OP-2.** `IMPLEMENTED-with-carried-REDs-by-id` is the accepted form iff every non-TOTAL cell is attributed to a ruling id from the set above and NO cell is unauthored surface. §0i.1's refusal ("a contract with no green producer") stands: the seam contract publishes the carried cells as **PENDING-ADJUDICATION** dispositions, not as dispositions the producer cannot honour, and RC-P still evaluates the real state at release. ESC-e2's harvest of W3 (§0p) is the opening seat's first act. D relaunches on this word.

## §0w ADDENDUM 2026-09-19 — X.P.W3's RESIDUAL 270 CELLS, EACH CLASS RULED; UNIT `.n`; THE W4 ID-SET WIDENED BY RULING, NOT BY LISTING

`.l` landed the at-rule families (p2 `92ed4cc9`; G-5 identity over 243,252 cells across all nine entries); `.m` re-attributed every non-TOTAL cell per cell (F-m3). The residue, by class, and its ruling:

| class | cells | what it is, measured | ruling |
|---|---|---|---|
| **BND-1** | 172 | the universe's r1 arm feeds `{id, src}` OBJECTS; the INCUMBENT accepts a non-string as an empty sheet (`e.length` undefined → `[]`), the candidate answers a typed `<string source>` — §2a's own goal met | **instrument defect + incumbent defect.** The r1 arm hands `src` (the string) — `.n`; the incumbent's non-string acceptance is rowed **ID-3** in the ledger's §9 (incumbent-defect family) with a class predicate. |
| **GROUND-C** | 67 (incl. the 36 F-k2-tagged non-finite fourth arguments, re-read per cell by `.m`) | ±Infinity numerals | §0v stands: per-cell adjudication at W4's fresh adjudicator; in the id-set. |
| **F-k2 (genuine)** | 4 (+575 oracle-accepted cells any spec-correct cure exposes) | legacy comma form with mixed `<number>`/`<percentage>` or `none`; css-color-4 §8.1 forbids it; the ORACLE accepts it | **incumbent defect ID-5.** `.n` lands the §8.1 cure (candidate REJECTS) together with the ID-5 class predicate so the exposed cells are adjudicated, not counted — the two withdrawn cures failed only because the predicate did not exist. |
| **SH-1** | 11 | the incumbent's `blocks()` signed paren counter mis-tracks nesting; css-syntax-3 consumes blocks with a stack | **incumbent defect ID-4**, class predicate; candidate correct. |
| **E-j1 (residual)** | 5 | 2× `@container` nested inside a style rule; 3× `;`/`{` inside a `url()` token in an `@namespace` prelude | **candidate gaps — cured in `.n`** (nested at-rules in style bodies; the url-token in preludes). |
| **F-m1** | 3 | the incumbent accepts `col!r` as a declaration NAME and `-!important` as a keyword — ID-1's mechanism one production up | **ID-1's predicate extended** (ID-1b) — `.n`. |
| **F-l3** | — | the oracle ACCEPTS `hwb(10, 10%, 10%)` contrary to PB-11's prose | rowed as an incumbent-defect observation under PB-11; adjudicated at W4. |

**Unit `.n` (Opus, after `.m`)**: the r1 arm hands `src`; the two grammar cures; the §8.1 cure with ID-5; the ID-1b, ID-3, ID-4 predicates and §9 rows; the equivalence emitter's miss entries gain a `rulingId` field (F-z2's lineage — the W4 biconditional becomes machine-checkable); re-emit the seals; G-1 · G-4 · G-7 · G-9 re-run; stamp W3 IMPLEMENTED-with-carried-REDs-by-id.

**The W4 id-set, widened BY RULING**: `{GROUND-C · ID-1/ID-1b · ID-2 · ID-3 · ID-4 · ID-5 · PB-11(F-l3) · R-f1 · E-k2}` — every member a ruled class with a predicate and a printed census; a tag with no ruling (BND-1, SH-1, F-k2, F-m1, E-j1) is never a member. W4.md's OP-2 addendum gains the widened set by dated addendum. D relaunches on this word.

## §0x ADDENDUM 2026-09-19 — F.W3's OWNER-GATED FLAGS S-6a/b/c RULED (MISSED-D · i-3 · P-10); THE WAVE RESUMES AT `.b`

F.W3 closed NOT-CONFORMANT because unit `.b` halted correctly on an unruled owner flag and the chassis
therefore never dispatched `.d`, `.e`, `.f` — incompleteness, not relief. The flags, ruled:

- **S-6a · MISSED-D — the easing adoption route: ROUTE 1, the `EasingCurve` re-home.** glass-ui
  8.0.0 (`1bc09dde`) ships `EasingCurve` (zero-state; `strokes: EasingStroke[]`; `d` a path); the
  premise that once priced the route as a tri-package deadlock is discharged (8.0.0 measured
  installed, `./easing` in the export map — the deadlock arm prices at zero). Consequences exactly as
  `.b`'s docket measured them: `EasingCurvePreview.vue` is a **DELETION**, MorphPhaseConfig's twin
  re-homes onto the same producer component, the `size`/`color` props die (the producer has neither),
  both accent arms re-mint off `--motion-accent` → `--easing-curve-accent` over `--viz-legendre`, one
  `d`-precision policy covers both builders, the single BARREL seam dies with the file; D-3 dies by
  construction. Glass-ui-first-class law (a renderer the producer ships is never re-implemented
  downstream); the ToggleChip route is REFUSED. g7/g8 turn on this route.
- **S-6b · fr-ContourSettings i-3 — the default-collapsed IA: COLLAPSED by default.** Contour settings
  are secondary to the canvas; progressive disclosure is the audit's own posture. No per-viewer
  persistence is minted for it in this wave.
- **S-6c · P-10 — the re-pin target: already ruled** at §0i.3 (`v8.0.0` @ `17a11bc5`), homed at F.W1
  and landed there; cited, not re-opened.

**Orchestrator notes from the check (D-9 and the three MINORs).** The whole-suite playwright cadence
of §7 is RUN as written — the durable fix was already in `visual-baseline.spec.ts` at the wave-open
substrate, so the declined-cadence reason is refuted at the bytes; §5b's worktree plan is honoured by
the remaining units (`.d`/`.e`/`.f` work in their worktrees, not the main checkout); F.W3's §8
transcripts are filed at `docs/tranches/X/fourier/evidence/w3/` (the standing evidence home, mirroring
`w1/`); `e2e/resolve-stack.ts` becomes the ONE `resolveStack`/`openArm` home and
`contrast-floor.spec.ts` imports it. C relaunches; seat 0 RESUME MODE re-dispatches `.b` on this ruling
and then `.d`, `.e`, `.f` per the banked plan.

## §0y ADDENDUM 2026-09-19 — X·P CLOSED UNVERIFIED: THE THREE TRIUMVIRATE ACTS (F-w4b-3 · F-w4c-1 · E-r2-1) RULED; ONE SUPPLEMENT WAVE `X.P.W4S` MINTED FOR THE ADJUDICATIVE CLOSE; Q-RC-1 · Q-RC-2 · F-w4c-2 RULED

Track D ended with every X·P wave CLOSED and X.P.W4 `CLOSED (honest-RED: G-3 · G-10)`: the release
close happened (seam contract, packed protocol, RC-P and its evaluator, packet, dated row, adoption
gap recorded, harvest filed) and the VERIFIED verb did not move because two gates forbid it. Check 3
named the owner of every remaining act as the triumvirate/orchestrator. Ruled here, under the
begin-word's delegation, so that X·P does not end gated on acts that are mine to perform:

- **F-w4b-3 · G-3's packaging cure — cure (a), a dated `W4.md` §4 addendum-beside, for a named unit
  `X.P.W4.e` (Opus).** Three cures, none a workaround: **C1** the manifest — `files` ships the css
  runtime and the Wasm artefact, `exports["./css"]` declares `import` + `types`; **C2** the runtime
  dependency on `tsx/esm/api` DIES from runtime bytes (`js-alg.mjs:23`, `bounds.mjs:834`): the css
  layer imports the library through the package's own built entry (self-reference or `dist/`), never
  TS sources through a loader — declaring `tsx` a runtime `dependency` is REFUSED (it is a workaround
  by another name); **C3** `build.mjs` emits the 33 frozen types as the package's OWN bytes
  (byte-copied at build from the sha-pinned vendored 4.0.0 declaration, sha recorded in the emitted
  header) and `ac1.d.ts` re-exports from that in-package file; no specifier escapes the package root.
  GREEN = `packed-candidate-surface.mjs --seam …` reads `resolved 52 of 52`, `entryCount ≥ 2`,
  `G3 GREEN`, double-run; evidence banked as NEW dated files beside `.b`'s (E-3). Positive control:
  the staged consumer tree outside both repos.
- **F-w4c-1 · G-10's count — shape (a).** The command is narrowed to rows inside a
  `### Four-verb status` block: the sum is over the five files' status tables, never over dated
  addenda that quote a table (W3.md `:836` / `:971` are E-3-lawful and stay). Expected open-state
  sum **5**, close-state **0**. Dated addendum to `W4.md` §6 G-10.
- **E-r2-1 · the adjudicative half of `.d` — unit `X.P.W4.f`, a FRESH Fable adjudicator (M-23 §1).**
  It rules the 45 `PENDING-ADJUDICATION` seam cells by the §0w id-set — GROUND-C cells under §0v's
  ruling (overflow is not a syntax error; range per production → `declared-divergence`, rulingId
  GROUND-C, consumer direction stated), ID-1b · ID-4 · ID-2 cells by each class's predicate → a
  terminal disposition (`identical` / `declared-divergence(rulingId)` / `incumbent-defect(rulingId)`),
  no cell left `PENDING`; records the adjudication in `docs/tranches/X/parse-that/ADJUDICATION-W4.md`
  (create) and re-runs `seam-contract-check.mjs`; re-runs G-1..G-10 at its own clock; performs the
  **R-A stamp iff G-1..G-9 read GREEN** (else withholds again, by gate id — the falsifier binds);
  carves the two COHESION cells under a performed stamp only; re-runs RC-P (V=4.0.0 stays FALSE on
  PUBLISHED by construction — V is the X-W11 coordinate; the evaluation is recorded, not argued); files
  the harvest `x-p-w4s.json`.
- **F-w4c-2** — `registry/harvest/x-p-w3.json` is granted to `.f` (create; the §0p scratch-mirror
  procedure).
- **Q-RC-1 · conjunct 3's subject binding — the V-tarball arm.** EQUIVALENCE(V) binds to V's bytes:
  the differential harness gains an arm whose candidate is the packed V's `/css` subpath (the
  registry tarball, sha-identity printed), and only that arm's 0-MIRROR-DEFECT reading is RC-P's. A
  document declaring "the candidate is what V ships" is a status word and is refused. `.f` lands the
  arm in `rc-p-evaluate.mjs` (its command line and RELEASE-CONDITION.md §2.3 by dated addendum) or
  returns the measured reason.
- **Q-RC-2 · conjunct 4's vacuity — NOT vacuous.** A Wasm-free V has not shipped AC-1's twin;
  ADMITTED reads FALSE with no subject. RC-P is unsatisfiable by a Wasm-free release by design. The
  evaluator's reading stands.
- **The two COHESION carves** stay unperformed until the stamp is performed; `.f` performs both or
  neither.

**Mechanism.** One supplement wave **`X.P.W4S` — the X·P adjudicative close** — is minted in the
LEDGER (`planned (RULED 2026-09-19, §0y)`, opens after X.P.W4 CLOSED), spec = `W4.md` with its third
dated addendum (units `.e` → `.f`, serial), record `execution/D/X-P-W4S.md`, run through the Track D
chassis. X.P.W4's CLOSED row is never rewritten. Carried ids not named here (`U-d` · `F-w4a-1` ·
`SEAM-DRIFT` · `R-w4b-2` · `F-ae1 / F-p1` · the W3 rounds-6–8 set · `F-p1`) are `.f`'s to adjudicate
in-remit or to hand to X-W11's OUT-OF-WAVE roster by id — zero silent drops.

## §0z ADDENDUM 2026-09-19 — X-W6 NOT-CONFORMANT AFTER PASS 3 (18 UNRELIEVED REDs = UNDONE WORK): THE SIX ESCALATIONS (E1–E6) RULED; THE WAVE RE-OPENS IN RESUME MODE

Check 3 of X-W6 is right on both halves: 28 of 28 claimed GREENs reproduce, and 18 of 22 REDs are
red because four units never sat and three landed one gate each. That is incompleteness, and the cure
is dispatch. Ruled:

- **E1 · re-dispatch.** Seat 0 re-opens X-W6 in RESUME MODE and dispatches `.b .c .e .g` whole,
  resumes `.d` at d1 (and re-captures the d2 negative-control transcript so it prints RED in both
  directions — Check 3 defect 3), `.h` at h1, `.i` at i1/i3; `.j` dispatches once X-W5 reads CLOSED
  in the LEDGER (Track A is closing X-W5 now; if it is not yet CLOSED at `.j`'s turn, `.j` is the last
  unit and waits on it, never skipped). ≤ `maxUnits` concurrent, never two on a shared modify path.
- **E2 · the bounds grant (third return).** `test/gradient-parse.test.ts` — `modify`, unit `.a`'s
  migration only (2 stops → 1; 3 stops → 2, arithmetically verified at both sites by Repair 2). Dated
  addendum to `W6.md` §4. §7's `npx vitest run` must read GREEN before close.
- **E3 · a3–a7's stale instruments.** `gate-axis.mjs` / `gate-gesture.mjs` read the pre-X-W4·C2
  accessible name; the substitutes (`aria-valuenow` / `style.left`) are strictly more precise and are
  the **commands of record** for a3–a7 by addendum. The instruments' re-point rides X-W11's
  OUT-OF-WAVE roster to their owner (R-5); no seat edits an `execute, no write` row.
- **E4 · the o25–o27 namespace.** Ordinals are allocated at the bytes: `o25-atmosphere-response`
  stands; `o26-atmosphere-coldload` → **`o28-atmosphere-coldload.spec.ts`**; `o27-scene-contracts` →
  **`o29-scene-contracts.spec.ts`** (`o26-aurora-perceptibility` and `o27-focus-affordance` ship
  already and are untouched). Gate commands i3 · j1–j3 read the new paths by addendum.
- **E5 · the `O-` relay row** for the d2 glass-forward ask (`W6-glass-ask-easing-readout.md`): `.d`
  is granted `docs/tranches/V/coordination/INBOX.md` — mail rows only (E13), next `O-n`.
- **E6 · h1 restated against the deliverable.** h2 measured no stripper: every stage sits at 100.0%
  of the sRGB ceiling and the owner's seed is 12.9× outside it; the ceiling is the drawing buffer's
  gamut, not a bug. The root cure widens the ceiling, not the tolerance: the blob's colour resolver
  and its WebGL2 drawing buffer declare **`display-p3`** where the display offers it
  (`matchMedia('(color-gamut: p3)')`, `gl.drawingBufferColorSpace`, a `display-p3` 2D resolver
  canvas) and fall to sRGB otherwise. **h1 = the painted dominant chroma is within the stated ΔC of
  the current colour's chroma gamut-mapped (css-color-4 §13 chroma reduction) to the buffer's colour
  space**; chroma beyond the display's own gamut is honest-RED-by-physics, by id. `.h` lands it inside
  its §4 rows or returns the exact path it lacks.
- **R-3** (the `ictcp`/`jzazbz` URL round-trip revert, homeless) rides X-W11's OUT-OF-WAVE roster by
  id. **H1's roster**: the close seat passes the wave's full commit roster to `gate-no-chassis.mjs`.

Track A relaunches when its runner ends (X-W5's close); X-W6 resumes on this ruling, then X-W7 →
X-W8 → X-W11 in runbook order. The LEDGER row stays PARTIAL until a fresh check promotes it.

## §0aa ADDENDUM 2026-09-19 — X.P.W4S's `.e` ESCALATIONS (E-w4e-1 · E-w4e-2) RULED; UNIT `.e2` MINTED; `.f` OPENS ONLY ON `G3 GREEN`

`.e` landed C1 · C3 and half of C2 (G-3 `0 of 52` → `19 of 52`, the runtime half 19/19) and returned
two escalations by id rather than widening its own bounds. Both are upheld as measured and ruled:

- **E-w4e-1 · G-3's TYPES half fails on the assertion form, not the tarball.**
  `packed-candidate-surface.mjs:400` emits `export type __check_<N> = <N>;` and `ParseResult<T>` has
  one required parameter, so one TS2314 collapses 33 rows. The cure is the general one, not the
  one-token one: the generator reads each frozen name's type-parameter arity from the installed
  declaration and instantiates it (`unknown` per parameter) — a check line that is valid for every
  generic on the surface. `scripts/packed-candidate-surface.mjs` (`.b`'s file) is granted to unit
  **`X.P.W4.e2`**; the change is to the check-line emitter only, and the negative control (a name
  removed from the staged tree reads unresolved) must still fire.
- **E-w4e-2 · `bounds.mjs:834` — cure (a).** `typescript/src/parse/packrat-entry.ts` exports
  `packratEnter` / `packratExit` so the built `./packrat` subpath carries the latch reader;
  `bounds.mjs` imports `@mkbabb/parse-that/packrat` and the `tsx` loader dies from shipped bytes
  entirely (R-3 dies with it). The instrument's reading is preserved whole; cure (b) is refused (it
  re-characterizes a measurement to avoid a build). Granted to `.e2`: `packrat-entry.ts` (export lines
  only), the built `dist/` it regenerates, `bounds.mjs`.
- **R-4** — `.f` banks the rebuilt `ac1.wasm`'s import listing as a NEW dated file beside `.b`'s.
- **R-5** — an eslint configuration for `<p2>` is an architecture act; it rides X-W11's OUT-OF-WAVE
  roster by id. **R-6** (no remote) is by construction (X.P.W0), not a defect.

**Mechanism.** `X.P.W4S` resumes: `.e`'s commits stand (`93bcb83`; never re-dispatched); unit
**`.e2`** (Opus) lands the two cures and re-runs G-3 on the whole — GREEN = `resolved 52 of 52`,
`G3 GREEN`, double-run, positive control; then **`.f`** opens exactly as §0y states, iff `G3 GREEN`.
The close's ordering ("`.f` must not run" before G-3) is adopted as the wave's serial lock.

## §0ab ADDENDUM 2026-09-19 — X.P.W4S's `.f` RETURNS: THE 45 CELLS ARE RULED, THE STAMP IS WITHHELD BY G-1 ON THE CHECKER'S PRE-ADJUDICATION VOCABULARY (E-w4f-1); F-w4f-2 · F-w4f-1 · F-ab1 RULED; UNITS `.g` ∥ `.h` → `.f2`

`.f` did the adjudicative half whole: 45 cells → 42 `declared-divergence` (candidate correct) · 2
candidate defects (F-w4f-2) · 0 PENDING; 39 premise rows retired (`CN-2` · `CN-3` · `R4` were coverage
claims discharged at G-3); the V-tarball arm landed (arm V read 4.0.0's own bytes, 20,962 mirror-defects
— the reading a V-bound conjunct must give against an oracle the rulings went against); harvests filed
6 of 6. G-1 then reads RED because `seam-contract-check.mjs` was built before the ruling it now
measures. Ruled:

- **E-w4f-1 · the checker learns the post-adjudication vocabulary — unit `.g` (Opus).** Check **E**: a
  ledger row RETIRED in `DIVERGENCE-LEDGER.md` §10 does not bind its `subjects`. Check **G**: a carried
  cell whose ruling is recorded in `ADJUDICATION-W4.md` is terminal — G reads the adjudication, not
  §0v's pre-adjudication rider. Negative controls must still fire: a `PENDING` head with no adjudication
  row; an unretired subject binding against an `identical` row; a disposition id not in the ledger.
  `.g` also cures **F-ab1**: the five-name literal at `run-full-surface.mjs:60` dies — the candidate's
  re-export set is measured from `entry.mjs`'s exports; the emitter's carry gains `§10` so a regeneration
  never drops the retirements (no regeneration is ordered; the ledger stands, E-3). `.g` performs the
  **`DEFECT-LEDGER.md` append** by the §0p procedure's run B (the script's write through the symlink,
  never a hand's).
- **F-w4f-2 (HIGH, candidate defect) · `!important` needs no preceding space — unit `.h` (Opus).**
  css-syntax-3 §5.4.7: after the declaration's value, a `!` delim followed by an ident matching
  `important` (whitespace optional on both sides). The cure lands in the declaration production at its
  realizations (algebra tables; both lowerings and `bounds.mjs` only if a ctor row changes — §0s's
  quartet law); cells `#40` / `#41` re-measure `identical`; the two-cell census is re-emitted as NEW
  dated evidence beside W3's; `ADJUDICATION-W4.md` gains a dated addendum and the two seam rows' cells
  move.
- **F-w4f-1 (MEDIUM, shared) · a non-ident declaration NAME.** css-syntax-3 §5.4.4: the name is one
  ident-token; `col!r` is not. The candidate half is `.h`'s (the production refuses; the new divergence
  against 4.0.0 is `declared-divergence`, rulingId **F-w4f-1**, candidate correct, consumer direction
  stated). The 4.0.0 half is X·V's and rides X-W11's OUT-OF-WAVE roster by id.
- **`.f2` (a FRESH Fable adjudicator, M-23 §1)**, serial after `.g` ∥ `.h`: re-run G-1..G-10 at its own
  clock; the R-A stamp **iff G-1..G-9 GREEN** (else withhold by gate id, again); the two COHESION carves
  under a performed stamp only; a dated §13 in `W4-CLOSE.md`; RC-P re-read.

**Mechanism.** `X.P.W4S` resumes; `.e` · `.e2` · `.f` stand on their commits (never re-dispatched).
Groups: [`.g` ∥ `.h`] (disjoint paths) → `.f2`. Writable sets in `W4.md`'s fifth dated addendum.

## §0ac ADDENDUM 2026-09-19 — TRACK A's RUNNER ENDED: X-W9's TEN CARRIED ESCALATIONS RULED (X-W4 IS CLOSED, SO `ESC-W9R1-SEQUENCING` FIRES); ESC-W10-1 RULED; X-W5's KILLED CLOSE RESUMES

Track A's runner ended with X-W5 WAVE-RUNNER-DEAD at its close seat (the watchdog signature of §0aa's
chassis note — six mid-generation kills, no 429), X-W6 ruled at §0z, X-W9 NOT-CONFORMANT after pass 3
with two HIGHs that six seats agree are curable only behind X-W4's close, and X-W10 blocked on a
ledger cell that abbreviated its spec. X-W4 is CLOSED. Ruled:

- **`ESC-W9R1-SEQUENCING` fires.** X-W9 re-opens in RESUME MODE; units **`X-W9.f`** (the 4.1.0 cut,
  the ship list, `package.json`, `eslint.config.js`'s two rule objects per §Commit Plan row 9) and
  **`X-W9.h`** (`ConsoleRail.vue`'s prefix match, after X-W4) are dispatched under the unchanged
  spec, then CHECK 4.
- **`ESC-W9R1-BOUNDS-GRANT`** (dated addendum to `W9.md` §File Bounds, writer `X-W9.f`):
  `test/v4-css-emerging.test.ts` — the import migrates to `serializeCssValue`'s new home
  (**`ESC-W9d-EMERGING-SERIALIZE`**; the forwarding shim in `stylesheet.ts` stays REFUSED);
  `test/v4-c1.test.ts` — the six retired `./transform` names leave the snapshot, which becomes G27's
  own ratchet (**`ESC-W9b-V4C1-SNAPSHOT`**); `fixtures/public-types/value-v4.ts` — the fourteen stale
  lines naming G27's retired symbols are deleted (**`ESC-W9e-FIXTURE-V4TYPES`**). D-2's typecheck and
  the eleven wave-owned RED tests turn on exactly these three.
- **`ESC-W9d-DTS-SPELLING`** — `src/value.ts` and `src/quantize.ts` are granted to `X-W9.f`: the import
  specifiers take the ONE spelling the subpath barrels use, so the dts rollup's entity cache merges
  (the root cause the seats measured, not a re-export variant); G13/G14 are measured after, and any
  irreducible remainder is named by count.
- **`ESC-W9d-ROOT-AND-SYNTAX`** — (a) G12 LEG2: option **(ii) declared-retired**. O-12 (SENT
  2026-07-27) is the position of record; the probe's own header admits a declared-retired root as
  GREEN; no `"."` key is added. (b) **`ESC-W9a-G3-LEG-SCOPE`**: G3 binds to the entries that declare a
  `string` parameter (the record's stated reading, argued at CH3.7 and D-11); shape/arity violations
  and the spec-ordered `./math` policy are outside its class. `src/css/syntax.ts` is not written.
- **`ESC-W9a-PROBE-UNRUNNABLE` · `ESC-W9c-MTS06-SUPERSEDED`** — `src-surface-totality.mjs` asserts the
  pre-cure shape at MTS-05 (G27 retired the six symbols) and MTS-06 (G11 orders rejection). E-3 keeps
  the dated instrument; `X-W9.f` lands a dated sibling beside it
  (`src-surface-totality.2026-09-19.mjs`) with those two arms re-pointed to the cured contract, and
  G1's command of record re-points to the sibling by the same addendum. Every other arm is unchanged.
- **`ESC-W9e-SHARMA-NO-SUBJECT`** — option (i): the Sharma-table clause is **SUPERSEDED-BY-THE-V4-CUT**
  (no colour-difference metric is on the 4.x surface; a test-local CIEDE2000 would be the circularity
  G18 deletes; shipping one is a surface decision not taken here). G18's Sharma half is relieved by
  this id.
- **`ESC-W9-G24-SUBSTRATE`** — the cure the record names: `X-W9.f` measures the eight analytic arms
  against the registry `0.13.0` tarball (`npm pack` into a scratch directory outside every repo, the
  integrity hash recorded in `bench-table-4.1.md`); `../fourier-analysis` stays untouched.
- **D-10** — `W9.md` §State's tally moves with `.f`'s close-time status edit.
- **ESC-W10-1** — the spec governs (runbook §7): X-W10 opens after X-W5 · X-W6 · X-W7 · X-W8 · X-W9
  stable + X-W0 + X-W1; the LEDGER's abbreviated cell is corrected in place (a ledger cell is
  crash-survival state, not dated evidence) and the Track A chassis carries the same edge, so X-W10 is
  never dispatched ahead of its conjuncts again.
- **X-W5** — RESUME MODE: units `.a`–`.e` stand on their commits; the close is re-seated under the
  watchdog-aware LAW.

Order on relaunch: X-W9 (RESUME `.f` · `.h` → CHECK 4) → X-W6 (§0z) → X-W5 (close) → X-W7 → X-W8 →
X-W10 → X-W11.

## §0ad ADDENDUM 2026-09-19 — KF.W11.r's FOUR ESCALATIONS ROUTED (KF11-E2..E5); THE OP-0 FLOOR IS THE `npm ci` FLOOR; TRACKS B AND C RE-SEATED AFTER A SYNCHRONIZED STORM

KF.W11 CLOSED honest-RED (G-KFW11-4 · G-KFW11-10). `.r` discharged R-C3 (`npm ci` exit 0 in both CI
jobs) and returned four escalations. Routed:

- **KF11-E5 — the banked OP-0 count 54 is unreproducible; the CI-faithful floor at `d8eb43ff` is 31.**
  The enumeration was taken against a `node_modules` the lockfile did not describe. Ruling: every
  KF.W12 / KF.W13 seat banks its OWN `vue-tsc` figure with `npm ci` settled at its open, and §0u's
  ratchet reads *monotone non-increase from that seat's own measured floor* — never from 54. `.a`
  re-derives before spending a cure; `.j` states its delta against the measured floor.
- **KF11-E2 — the three `src/**` TS6133 rows** (`compositor.ts` · `waapi.ts` · `smooth.ts`), the sole
  cause of the `library gates` job's failure: owned by the first KF.W12 unit whose §File Bounds
  carries `src/**`; if none does, KF.W13's close unit under a one-row dated addendum (type-level,
  unused declarations die with their diagnostics — the `.r` idiom).
- **KF11-E3 — `useEasingDemo.ts`'s two rows.** The producer half (`@mkbabb/value.js`
  `dist/subpaths/math.d.ts:5` declares `cubicBezierToString(): string` while the runtime returns the
  template literal) is a value.js declaration row → **X-W11's OUT-OF-WAVE roster by id** (X-W9.f's
  ship list is closed and in flight; not widened). The keyframes half is KF.W12's OPTIONS-UNIT carve
  (the three-file easing-name contract), as the seat measured.
- **KF11-E4 — `EditorShell.vue(175,10)` TS2379 on Vue's `key`** is behavioural, not type-level; it
  rides the shell seam's owning rows in KF.W13 if its §B carries `EditorShell.vue`, else X-W11's
  roster by id. No seat forces it.

**Chassis.** B (KF.W12 at repair 1, KF.W13 at open) and C (F.W9 at open) died at the SAME second
(`18:33:30` · `19:04:02` · `19:29:33` across both runs): a shared storm with silent SDK retries, not
a seat's generation. The chassis now waits 300 s and re-seats up to three more times before a wave is
declared dead (`withRetry`), in all four scripts. Both tracks relaunch in RESUME MODE.

## §0ae ADDENDUM 2026-09-19 — CONCURRENCY REDUCED TO TWO TRACKS UNDER THE BEGIN-WORD'S DURABILITY CLAUSE (THE STORM IS CONTINUOUS AT FOUR)

Measured 21:03–21:40 UTC: six synchronized kill events across all four live runs (`21:03:42` ·
`21:08:48` · `21:24:53` · `21:30:03` · `21:36:00` · `21:40:21`), every seat of every track killed
at the same second, 2–41 tool calls of progress per attempt, `X-W9.f` burning all six attempts in
57 minutes with zero receipts. That is a throughput wall (silent SDK retries on a shared limit),
not a seat fault, and at four tracks the storm is continuous: each kill re-reads the spec whole,
so parallelism above the wall REDUCES throughput. Under *"ensure total robustness … survive both
crashes and system walls insofar as rate-limiting"* the orchestrator runs **two tracks at a time**
until the storm receipts stop: **A** (X·V, the longest chain) and **D** (X.P.W4S, three units);
**C** (F.W9 close → F.W10) relaunches when D ends; **B** (KF.W12 → KF.W13) when C ends. The owner's
cap of four is a ceiling, not a floor. No spec, ledger row, or seat law changes; every stopped
track resumes in RESUME MODE on its own record.

## §0af ADDENDUM 2026-09-20 — THE WALL IS NOT CONCURRENCY-BOUND: EXECUTION PAUSED, THEN RE-ENTERED ONE TRACK AT A TIME

At two tracks the synchronized kills continued (`23:54:42` · `00:12:40` UTC, every seat of both
runs each time), and the attempts between them made **two tool calls in eighteen minutes** — the
model side of each seat is answering in tens of minutes, not the seat's generation. Under the
durability clause the orchestrator **stops both runs** (A at X-W9's close seat with `.f` and `.h`
landed; D at X.P.W4S's open), waits one supervisor interval, then re-enters with **Track A alone**
and measures its seat's cadence (a tool call per minute is healthy; a kill or a ten-minute silence
is not). D joins when A's cadence holds for one interval, then C, then B — never above the four cap,
and back to one whenever a synchronized kill recurs. Every track resumes in RESUME MODE on its own
record; no spec, row, or law changes.

## §0ag ADDENDUM 2026-09-20 — THE "STORM" WAS THE SUPERVISOR CRON: EVERY TICK DELIVERED TO THE ROOT SESSION INTERRUPTS EVERY IN-FLIGHT SEAT; THE CRON IS RETIRED, ALL FOUR TRACKS RETURN

Measured against the root session's own transcript: the synchronized kill times are the tick
delivery times to the second — `21:08:48` · `22:14:40` · `00:12:40/41` · `01:43:10` (and
`22:22:25` = a workflow-completion notification at `22:22:31`). A user turn arriving in the root
session aborts every child seat's in-flight request (`[Request interrupted by user]`), which the
runner then books as a stalled attempt. §0ae/§0af read a throughput wall; the wall was the
supervisor. Ruling: the session-only cron `e8961b17` is **deleted**. Supervision runs on the
runner's own completion notifications (a dead or finished track reports itself) plus the chassis
`withRetry` re-seats; no periodic message enters the root session while seats are live. All four
tracks relaunch in RESUME MODE now (A live · D · C · B), inside the owner's cap. §0ae/§0af are
superseded on their diagnosis, not on their durability posture.

## §0ah ADDENDUM 2026-09-20 — X.P.W4S: NINE OF TEN GATES GREEN AT THREE INDEPENDENT SEATS; THE R-A STAMP RULED IN §3a's FORM (RESEARCH · PLAN AUGMENT · REDRESS), NOT AS A BARE RE-SEAT; ESC-W4g-1 AND C3-3 RULED

Check 3 of X.P.W4S: G-1..G-9 GREEN and reproduced at three seats' own clocks (G-3 `52 of 52` at the
same tarball sha, G-5 honestly FALSE, G-1 GREEN with three negative controls RED); the honest-RED
set is `∅`; the one HIGH is G-10 — the stamp is performable and unperformed for a sixth reading —
and §3a's third-iteration trigger has fired for it (C3-2). Ruled in §3a's mandatory form:

- **Research — why five adjudicator seats did not perform a five-row edit.** Each fresh Fable seat
  sat with the stamp COUPLED to the wave's unit order: `.d`/`.f`/`.f2` each measured G-1..G-9 at
  its own clock and found a gate RED that a LATER seat cured (G-3 by `.e2` after `.f`; G-1 by
  Repair 1 after `.f2`), and every seat that then turned the gate was an Opus repair or check seat
  that M-23 §1 and §5 forbid to stamp. The failure is structural — the stamp was the last unit of a
  wave whose checks and repairs can move gates after it — not a seat defect. A bare re-seat of `.f2`
  would face the same shape.
- **Plan augment — the stamp becomes a standalone dated act with its own precondition, surviving
  any seat.** Unit **`X.P.W4.s`** (a FRESH Fable adjudicator, M-23 §1) is dispatched **last and
  alone**, after every other unit and after the checks that moved gates. Its precondition is its own
  re-run of G-1..G-9 (the long gates backgrounded and polled); GREEN at its clock → the R-A stamp
  (shape-(a) sum 5 → 0 in one act, VERIFIED never ACCEPTED, the §9 family whole: five rows + the two
  COHESION cells + `W4-CLOSE.md` dated §14 + `RELEASE-PACKET.md` addendum + `x-p-w4s.json` fold/3);
  any gate RED at its clock → it performs nothing, and the LEDGER row reads **`BLOCKED-ON G-n`**
  (the gate by id), never `PARTIAL`, so the next act is named by the row itself.
- **Redress — the check reads the stamp as a dispatch condition.** A fresh check that finds
  G-1..G-9 GREEN and G-10 RED with `.s` not yet seated returns the verdict with the cure
  "dispatch `.s`", and the chassis dispatches `.s` on that verdict rather than another repair round.
- **ESC-W4g-1 (F-ab1's second limb)** — `emit-divergence-ledger.mjs:169`'s single carried block
  becomes a carried LIST (`\n### §6.` and `\n## §10`, each sliced to the next level-2 heading, §10's
  slice the tail, emitted under its own preamble in document order); acceptance = the existing
  idempotence check plus §10's retirement rows surviving two consecutive emissions. Unit
  **`X.P.W4.g2`** (Opus), before `.s`. No regeneration is ordered; the ledger stands (E-3).
- **C3-3** — §6 G-2's predicate is a COMMIT predicate (the wave's commits carry no path under
  `src|demo|api|test|e2e`); the working tree is shared with Track A and is not this wave's evidence.
  Dated addendum to `W4.md` §6.
- **C3-4 / R-C3** — the harvest seat-count sub-gate stands owner-named (X-W11's HARVEST lane).

**Mechanism.** `X.P.W4S` resumes: `.e` · `.e2` · `.f` · `.g` · `.h` · `.f2` stand on their commits;
groups: [`.g2`] → [`.s`]. The chassis note carries the redress rule. The first free id is `§0ah`
(Repair 2 measured the collision at `§0ac`).

## §0ai ADDENDUM 2026-09-20 — TRACK B CLOSED HONEST-RED WITH THE DOCK-MENU PACKET UNSPENT: KF13-E2 RULED (THE HARNESS ROW), TD-37 RULED (OP-7), E-b1 · C-11 · E-d1 · KF11-E2 · KF11-E(f1) · KF11-E3 · KF11-E4 · E-c1 · M-1 RULED; ONE SUPPLEMENT WAVE `KF.W13S` MINTED

KF.W12 and KF.W13 CLOSED honest-RED (G-KFW12-4 · -7; G-KFW13-0 · -1 · -2 · -7). Every RED traces to a
byte outside a unit's carve that the seats returned rather than took. Those bytes are ruled here, and
the X·KF sub-tranche is finished by one supplement wave rather than left half-spent:

- **KF13-E2 — the harness row.** glass-ui's dist chunks import the bare self-specifier
  `@mkbabb/keyframes.js`; vitest externalizes `node_modules`, so the Vite alias never sees it and the
  dock chunk is stranded before any test body runs. The root cure is the harness's own idiom, not a
  mock or a patch: `vitest.config.ts` gains `test.server.deps.inline: ["@mkbabb/glass-ui"]` (the
  producer's chunks are transformed by Vite and the S.B7 alias resolves the self-specifier). One row,
  granted to unit **`KF.W13.a2`**, which then spends the dock-menu packet exactly as `.a`'s spec
  reads it (G-KFW13-0 → -1 → -2 in `git log` order; M-4's round-trip, the MUST-CARRY rider, MM-1/MM-6,
  the MbabbMenu family, TD-36, the chrome roster; no deletion on a reading).
- **OP-7 · TD-37 — one face order: PLAY LEADING on both faces.** The faces are concentric and the
  expanded face is the longer-lived state; the collapsed pill becomes `[play][name]` so every
  hover-expand and idle collapse leaves the primary CTA under the reaching pointer. `.b`'s TD-37 row
  is spent by **`KF.W13.e`** under this ruling (TD-21's shared-Set rider with it).
- **E-b1** — the six `playback-idiom.css`-resident halves (D-10 `:30-33` · D-13 `:23` · D-16 css
  `:19` · N-1 `:33/:48/:69/:88` · D-8/D-15 `:87-90` · D-20 `:12-13`) are carved to **`.e`** explicitly.
  **M-1** — TD-17's landing in `useMenubarMeasure.ts` is RATIFIED beside (a genuine cure that zeroed a
  §0u diagnostic; the carve is widened by ruling, not by convenience).
- **C-11** — one line, `vi.mock("@mkbabb/glass-ui/button")`, in KF.W12's
  `channel-options-render-edge.test.ts` → `.e`. **KF.W12 `.e`'s residual 1** — the
  `css-code-editor-seam.test.ts` preset double gains the real seat API (`setTargets`) → `.e`.
- **E-d1 / KF.W12 R-3** — `demo/env.d.ts` gains the five-line ambient declaration for monaco's
  `basic-languages/css/css.js`, and the KF-CE-1/4 arm (b) is re-landed **byte-exact from the banked
  hunk** `evidence/W12/KF-W12-d-born-red.md` into `CSSCodeEditor.vue` → `.e`. The bundle delta the seat
  measured (+4,255 B vendor-monaco, −1,054,628 B css.worker) is the cure's own receipt.
- **KF11-E2** — the three `src/**` TS6133 rows (`compositor.ts` `groupedKeys` · `waapi.ts`
  `KeyframesAnimation` · `smooth.ts` `_startLoop`): unused declarations die with their diagnostics.
  KF-W13 §Excluded is lifted for exactly those three declarations by the dated addendum → `.e`.
- **KF11-E(f1)** — `spring-trace-truth.test.ts` (4b) re-binds to the shipped export
  (`import { DAMPING_AXIS }` … `expect(DAMPING_AXIS.min).toBeGreaterThanOrEqual(PLOT_DAMPING_FLOOR)`),
  the regex read dies → `.e`. G-KFW11-4 / -10 turn on it.
- **KF11-E3 (keyframes half)** — `useEasingDemo.ts`'s `cssValue` getter is typed at its source: the
  bare editor modes (`steps`, `cubic-bezier`) are translated into real CSS before the seam and the
  getter returns the `Easing` union; the three-file easing-name contract (`EasingSidebar.vue` ·
  `EasingTarget.vue` · `useEasingDemo.ts`) is `.e`'s carve; no cast. The value.js declaration half
  stays X-W11's by §0ad.
- **KF11-E4** — `EditorShell.vue:175`: `:key="superKey ?? ''"` — the remount-on-swap semantics are
  unchanged (the key is stable while `superKey` is undefined and changes when it changes); the public
  prop contract is untouched → `.e`.
- **E-c1 / KF.W12 R-5** — `keyframes/utils/parseAnimationCSS.ts` is granted to `.e` for the one
  type-level root cure (no cast, no shim).
- **Close** — unit **`KF.W13.f`** (Opus, serial last): `vue-tsc` **0** asserted as the sub-tranche's
  literal (§0u's ratchet ends where the count ends), `npm run test:demo` all green, `npm run check`
  exit 0, keyframes.js pushed, the LEDGER row and the SS-6 accretion; value.js pushed when the shared
  working tree allows (never over a sibling's staged path — d-R9's rule stands).

**Mechanism.** Supplement wave **`KF.W13S`** (spec `KF-W13.md` + its dated addendum; record
`execution/B/KF-W13S.md`; opens after KF.W13 CLOSED): groups [`.a2` ∥ `.e`] (disjoint sets) →
[`.f`]. KF.W12's and KF.W13's CLOSED rows are never rewritten. KF.W3 stays gate-keyed on RC-P(V).

## §0aj ADDENDUM 2026-09-21 — TRACK C: EVERY X·F WAVE CLOSED HONEST-RED WITH FOUR `web/src` HEADS, THE CENSUS ERRATA AND TWO RELAY ARMS UN-LANDED; ONE SUPPLEMENT WAVE `F.W10S` MINTED; OPERATOR ITEMS ROUTED TO THE OWNER CLOSE REPORT

F.W9 (`CHECK 2`, 2026-09-20) and F.W10 (`CHECK 1`, 2026-09-20) both read CONFORMANT-HONEST-RED with
every RED relieved and owner-named — and four of those owners read *"whichever wave next opens
`web/src`"* or *"F.W3/W4"* (both CLOSED), i.e. nobody. Ruled under delegation (§0j):

- **G-F9-5 · G-F9-8 · G-F9-11 · G-F9-17 (⊕ E-F9b-4)** — the `web/src` heads are GRANTED to one
  fourier product unit: `/equation`'s single contrast node (a token act at the root, never a
  per-instance override); the fullscreen dialog that never opens (C2-M1 — the control resolves
  enabled and the product does not respond: a `web/src` defect, cured at its root, the spec
  untouched); `ContourEditorCanvas.vue(42,9) TS6133` (the unused binding removed, never
  `@ts-ignore`); the two shell-header controls under the 44px coarse floor (`About Fourier
  analysis` 20.8px · `Dark mode` 40.0px — sized at the component's token, not clamped per
  instance). **G-F9-8**: each of the five `test.fixme` keystones (`visualization-ux.spec.ts` ×4 ·
  `visualization-crud.spec.ts:664`) is un-fixme'd ONLY by curing the product defect its in-file note
  names, proven on a full-stack RUN; a keystone whose defect is producer-owned (glass-ui) STAYS fixme
  with its escalation id written into the note and returned — never `test.skip`, never an assertion
  loosened. → unit **`F.W10S.b`**.
- **F.W10 CK-1 (MEDIUM) · CK-2 · CK-3 · CK-4** — the two census-input errata (`i-1 = L-INFO-2`,
  `PP-CENSUS`; text at §4.2 rows 65 / 76) land in `CENSUS-ADDENDUM-2026-08-25.md` beside
  `FR-CP-44` / `FR-AFP-51` as a dated section; CK-2 (stdout **1074**, not 0) and CK-3 (**nine**
  files, not eight) as dated addenda-beside in `execution/C/F-W10.md`, never rewriting `C.2`/`C.7`;
  CK-4 = one sentence in §5's boundary row. → unit **`F.W10S.a`**.
- **G-F10-12 (O-23 · O-32 authored-not-landed) ⊕ E-F9b-2 corrected per CK-5** — the carriage
  hop: both letters copied VERBATIM into `../glass-ui/docs/tranches/BK/coordination/` (the active
  inbox; owner edict 2026-07-12 — **mail is the ONE lawful glass-ui write; product bytes stay
  READ-ONLY**), plus one dated erratum beside E-F9b-2 naming reka-ui `FocusGuards`, not the `Metric`
  tile, as the `aria-hidden-focus` payload; committed in glass-ui by pathspec of those files only and
  pushed; INBOX rows O-23/O-32 advanced to LANDED with the glass-ui sha (rows never rewritten — a
  dated status line beside). → unit **`F.W10S.c`**.
- **C2-M2** — DISCHARGED at the bytes: ⟨cmd⟩ `git -C ../fourier-analysis rev-list --count
  origin/m/w1-bump-migration..HEAD` → **0** at this sitting (`cef242d` is on the remote).
- **G-F9-15 · G-F9-19 · G-F9-23(b)** — operator items (certbot renewal; the docker/nginx host
  authority; `-linux` baselines need a CI-capable seat) → the OWNER CLOSE REPORT, by id; no unit.
- **G-F10-3 · G-F10-4** — X·V's: the drift probe re-runs against the PUBLISHED 4.1.0 coordinate →
  X-W11 (§0ak). **G-F10-6**'s corpus leg is RED by design (nobody). **G-F10-1 / -2**'s
  fourier-ledger verbs → the fourier sub-session (R-4), owner report.
- **C2-M3 (FORMATION)** — the shared LEDGER: pathspec-on-the-commit is necessary, not sufficient;
  standing cure = a seat commits `LEDGER.md` ALONE, in its own commit, immediately after editing it.
  Recorded here as law for every remaining seat; no chassis change.

**Mechanism.** Supplement wave **`F.W10S`** (spec = `F-W10.md` + its dated addendum of 2026-09-21;
record `execution/C/F-W10S.md`; opens after F.W10 CLOSED): groups [`.a` ∥ `.b`] (disjoint trees) →
[`.c`] → [`.d` close, verify-only]; the chassis's fresh check follows. F.W9's and F.W10's CLOSED rows
are never rewritten; F.W10's ACCEPTED is stamped by `.d` only if CK-1 measures cured AND `.b`'s
gates read green — otherwise the row stays CLOSED honest-RED with the residue by id. Track C
relaunches on this ruling alone (one track at a time — the §0ag regime, tightened 2026-09-21 by the
CONTEXT ECONOMY clause `346e11d1`).

## §0ak ADDENDUM 2026-09-21 — X-W9.f's FOUR ESCALATIONS RULED AS ONE X-W11 PRE-PUBLISH UNIT `X.W11.p`; THE UNPUSHED `v4.1.0` TAG RE-MINTED AT ITS CLOSE; THE FOURIER DRIFT PROBE = X-W11's HARVEST

X-W9.f cut 4.1.0 (`f3fccfb7`; annotated tag `v4.1.0`, LOCAL ONLY — ⟨cmd⟩ `git ls-remote --tags
origin 'v4.1*'` → ∅) and returned four escalations. X-W9 and X-W1 are both CLOSED, so the bytes are
owned by nobody. Ruled:

- **ESC-W9f-CSSD-VOCAB-SPELLING** — GRANTED: the 8-line re-point in `src/css/index.ts:51-58`
  (`export type { … } from "../color/index"` → `"../value"`), the one root of `css.d.ts`'s 6 bare
  declares and 60 `_2` references; G1's probe and MTS-09 re-run at the packed bytes.
- **ESC-W9f-PACKED-SURFACE-EXPECTED** — GRANTED: `scripts/ci/verify-packed-surface.mjs`'s
  `expected` + `SMOKE` maps gain the 7 names, each proven from the packed tarball's OWN export list
  (never from the source tree); G20 re-run to GREEN.
- **ESC-W9f-LOCKFILE-DERIVATIVE** — ACCEPTED as X-W9 ruled it at the bytes (benign); `npm ci` must
  pass at `.p`'s close.
- **ESC-W9f-ARCH-DEPS-CLAUSE** — one dated sentence beside the parse-that paragraph in
  `ARCHITECTURE.md`, never rewriting the 2026-09-18 ground-truth line.
- **The tag.** A tag that never left the machine is not evidence in the remote's eyes: `v4.1.0` is
  deleted locally and re-minted ANNOTATED at `.p`'s last commit, X-W9.f's message preserved and one
  dated line appended; both shas recorded in X-W11's record. Not a force-push, not a reset; G29 still
  reads one bump, one tag, no 4.0.1. X-W9's `f3fccfb7` evidence stands as written (E-3).
- **Harvest.** After `.c` publishes, `.e` re-runs the fourier probe
  `fourier-value-import-drift.mjs` (locate with `git ls-files | grep drift`) against the registry
  coordinate and records the result in FINAL as R-2's discharge (G-F10-3 / G-F10-4, owed to X·V).

**Mechanism.** `X.W11.p` (Opus) is the wave's FIRST unit, serial, before `.a`; W11.md's dated
addendum of 2026-09-21 carries its brief and bounds grant. The A chassis is untouched — seat 0 reads
the spec whole and every §0k+ addendum.

## §0al ADDENDUM 2026-09-22 — TRACK C COMPLETE (F.W10S CLOSED honest-RED, `843062c5`); E-F10S-r1 RULED: THE ADDENDUM GOVERNS THE NOTE

F.W10S closed CONFORMANT-HONEST-RED at Check 2: `.a` landed the census errata (G-S-1 0→4), `.b`
landed six fourier cures (G-F9-17 · G-F9-5's `/equation` node · two C2-M1 roots · E-F9b-4 · four of
five keystones un-fixme'd; `m/w1-bump-migration` pushed to `aca2580`), `.c` performed the carriage
(glass-ui `46eec459`, G-S-2 GREEN). What stays RED is producer-owned and relayed by id: **E-F10S-b1**
(G-F9-11 — glass-ui's dock press guard discards a click begun during the hover-expansion morph;
relayed `A-2`) and **E-F10S-b2** (crud `:664` — `SegmentedTabs` inactive underline ink 4.33:1;
relayed `A-3`); the `contrast-floor.spec.ts` leg belongs to F.W4's owners + GLASS-RELAY. F.W10 stays
NOT ACCEPTED; every X·F wave is CLOSED; Track C is COMPLETE. Operator items unchanged (§0aj).

**E-F10S-r1 RULED.** A `test.fixme` note is prose, not an instrument: writing the escalation id into
it neither loosens nor removes an assertion. The RESUME lock's *"fixme removal only"* bound the
ASSERTIONS; the addendum's *"escalation id written into the note"* governs the note. One act, one
Opus seat, no wave: `web/e2e/visualization-crud.spec.ts` `:664` note gains one line naming
`E-F10S-b2` and `A-3` (the stale LC-2 rationale is left in place, dated beside), pushed; a dated
line appended to `execution/C/F-W10S.md` and one LEDGER event line. Nothing else in the file moves.

## §0am ADDENDUM 2026-09-22 — KF.W13S NOT-CONFORMANT AFTER TWO REPAIRS ON THREE UNGRANTED BYTES: ESC-r2-1 · ESC-r2-2 · ESC-r2-3 RULED; ESC-a3-2 DISCHARGED AT `8ae71f51`; UNITS `.a4` → `.e3` → `.t` → `.f2`

Check 3 (2026-09-22) reads 2 HIGH · 1 MEDIUM, every one a byte outside the carves §0ai drew, and
every one measured twice. Ruled under delegation (§0j):

- **ESC-r2-2 / ESC-a3-1 — GRANTED to unit `.a4`**: `demo/scenes/cube/CubeScene.vue` `:96-97`
  (`setPPMode`), `:129-135` (the `headerLeft` render fn), `:267` (its export) and their dead imports
  — the delete arm of the MM-1/MM-6 four-part cure (repair `stored.value.ppMode` = the
  `MbabbMenu.vue:333` TS2339 pair · dispose `setPPMode` with the KF-APP-17 `headerLeft` delete arm ·
  resolve the C-14 bucket split · land MM-5's `CheckboxItem`), which lands as ONE sha under ARB-1
  with NO `headerLeft` fill arm; `sceneExposedApi.ts:43` untouched (G-KFW13-2's grep counts deleted
  lines). KF.W11 is CLOSED; its row is not rewritten — the sha is cited in KF.W13S's row.
- **ESC-r2-1 — GRANTED to unit `.e3`**: `demo/utils/reference-data/easingGroups.ts:7` and
  `animationDescriptions.ts:19` typed by `EasingName` AT THE CATALOGUE (the root; `name: string` →
  `name: EasingName`, `Record<string,…>` → `Record<EasingName,…>` or the narrower shape the data
  proves); `EasingSidebar.vue:150` and `EasingTarget.vue:251` then type-check with no cast and no
  predicate. vue-tsc must read **0**.
- **ESC-r2-3 — the harness row, same class as §0ai's vitest row**: `package.json:37`'s leg 2
  becomes `vue-tsc --noEmit -p tsconfig.test.json` — plain `tsc` cannot see through the
  default-only `*.vue` shim, and the 18 TS2614 rows are that defect (measured 47 → 33). The ONE line
  is granted to `.e3`. Of the 33 residual rows, this wave's `playback-ribbon-contract.test.ts:230`
  (TS2769) → `.e3`; the 29 rows across 12 foreign test files → unit **`.t`** (Opus, serial after
  `.e3`): typed root cures in `test/demo/**`, and in the demo module a row's root sits in ONLY where
  that root is a type declaration; never a cast, `@ts-expect-error`, `skip` or a loosened assertion;
  any row whose root is product behaviour outside that carve is RETURNED by `file:line` and id.
  §0ai's close literal — `vue-tsc 0` · `npm run test:demo` green · `npm run check` exit 0 — STANDS.
- **ESC-a3-2 — DISCHARGED**: TD-36's real bytes (`TransportDock.vue:2-8`) were cured by the Check 2
  repair at kf `8ae71f51` (`pointer-events-none` on the fixed host); the Close's R-f2-2 predates it.
- **R-f2-3 — CORRECTED at the bytes**: `.e2` DID run (kf `17d3e227` · `96079974` · `c03141bc`);
  its remaining rows are `.e3`'s. **R-f2-5** producer asks → `.f2`'s BH relay act (§0ai). **R-f2-4**
  MM carries (SharePopover / DarkModeToggle / style.css seams) → the owner close report by id.
  **R-f2-6** the value.js push → the orchestrator, after Track A's X-W5 seat commits its staged
  deletion. INFO rows: none owed.

**Mechanism.** KF.W13S RESUME (`.a2` · `.e` · `.a3` · `.e2` alreadyDone): [`.a4`] → [`.e3`] →
[`.t`] → [`.f2`]; every seat Opus; the chassis's verify-only close and fresh check follow. Spec =
KF-W13.md's ADDENDUM 2026-09-22. keyframes.js is pushed at every unit's close.

## §0an ADDENDUM 2026-09-22 — X-W6: ESC-W6c-1 RULED (THE §3a GRANT OF SIX PATHS TO `X.W6.c`)

X-W6's third-sitting close (VERIFY-ONLY, 2026-09-22) reads GREEN 30 / RED 20 with `.c` ESCALATED on a
writable-set expansion and `.d` `.e` `.h` `.i` still owed; `.j` BLOCKED-ON X-W5. Ruled under
delegation (§0j), both classes GRANTED to **`X.W6.c`** for its re-dispatch:

1. **Inside `W6.md` §4, outside `.c`'s unit list** — `demo/workbenches/gradient/GradientVisualizer/
   GradientStopEditor.vue` (door repoint · types repoint · `colorAt` → `sampleAt` · G4c ×2 ·
   `.gradient-rail` dedup) · `demo/workbenches/gradient/composables/gradientParse.ts` (cycle edge 2) ·
   `…/GradientVisualizer/GradientEasingEditor.vue` (types repoint) ·
   `…/GradientVisualizer/easing/easingCatalogue.ts` (types repoint).
2. **Outside `W6.md` §4 — the §3a trigger** — `…/GradientVisualizer/easing/useSpecimenRows.ts`
   (types repoint) · `demo/color-session/color-space-meta.ts` (c4: `INTERPOLATION_SPACES` DERIVED
   from `SPACE_CATALOG`, the single home Gradient and Mix both read — no second list).

The unit lands WHOLE as its commit #3 (one meaning, one sha; `caea9d1e` stands as #2). No other
live Lane-1 writer touches `GradientStopEditor.vue` before `.e`, and `.e` does not touch it. The
a2/a13/b3 REDs caused by the foreign X-W5 fixture stay X-W5's (its `.c` cure, `usePalettePorts.ts` /
`useViewManager.ts`, is uncommitted in the shared tree under L-7 and lands when X-W5 resumes).
**Mechanism**: Track A's chassis RESUME on X-W6 dispatches `.c` (on this grant) · `.d` · `.e` · `.h` ·
`.i`; `.j` after X-W5 CLOSED.

## §0ao ADDENDUM 2026-09-22 — THE OWNER'S LIVE AUDIT DOCKET (SIX FINDINGS ACROSS THE APPS), ROUTED: `F.W11` MINTED · X-W8 GAINS `.f` `.g` `.h` · `KF.W13T` MINTED; TOTALITY PER APP RESTATED

The owner audited the four dev stacks at 2026-09-22 and wrote, verbatim: *"In all apps, especially
fourier analysis — we should abrogate any squared harsh lines. Like in the visualizer — why are these
elements not appropriately rounded and glass-ui idiomatic? Further, ensure that our tranche in
totality for each app is addressed. Further, the value.js picker is slow on drag of changing the
color, and frequently the background area goes black. And the right side about the spaces is far too
long and not clipped. And the dock for every app is not quite right — doesn't properly contain
elements (like in keyframes.js), animate (the "login" background and transitions in value.js isn't
right) — there should likely be a dock in the fourier analysis app. And the fourier analysis grid
background does not occupy the entire background, too, it's just the paper — which is not right."*

These are owner rulings, not seat findings. Routed by tree, each to a unit with a born-RED gate:

| # | finding | tree | home | unit |
|---|---|---|---|---|
| OA-1 | squared harsh lines; radii and surfaces not glass-ui idiomatic (esp. the visualizer) | fourier | **`F.W11`** (new) | `.a` radii/tokens · `.c` visualizer glass idiom |
| OA-2 | the grid background is the paper's, not the app's | fourier | `F.W11` | `.b` |
| OA-3 | a dock for fourier | fourier | `F.W11` | `.c` (Fable, design-author; `@mkbabb/glass-ui/dock`) |
| OA-4 | picker slow on drag; background area goes black | value.js | **X-W8** addendum | `.f` |
| OA-5 | the right-side spaces panel too long, not clipped | value.js | X-W8 addendum | `.g` |
| OA-6 | docks: value.js login layer background + transitions wrong; keyframes dock does not contain its elements | value.js · keyframes | X-W8 `.h` (Fable) · **`KF.W13T`** (new) `.k` | |

**Law for every unit above**: measured at the bytes AND in a live browser (probe parsimony: bounded
Playwright, ≤3 viewports, screenshots committed as evidence); the cure is at the root — a token, a
layout, a pipeline — never a clip that hides overflow, a throttle that drops the last value, a
`try/catch` around a shader, or a local copy of a producer component; glass-ui gaps ride mail to
BK, never a frontend hack (§0j). **Totality restated**: the owner close report enumerates, PER APP,
every wave's status, every honest-RED by id with its owner, and every owner-docket row OA-1..6 with
its sha or its relay id — nothing summarized away.

**Mechanism**: `F.W11` spec `fourier/waves/F-W11.md` (opens after F.W10S; Track C relaunches now);
X-W8's dated addendum (consumed by its seat 0 in the live A run); `KF.W13T` on KF-W13.md's third
addendum (B relaunches on it when KF.W13S ends). Rows in the LEDGER.

### §0ao.1 ADDENDUM 2026-09-22 — THE OWNER'S SECOND DOCKET (keyframes.js), OA-7..OA-10, ROUTED TO `KF.W13T` UNIT `.e`

The owner, with two screenshots (banked at `docs/tranches/X/keyframes/evidence/W13T/owner-2026-09-22-*.png`:
the easing picker listing `linear · ease · ease-in · ease-out` with descriptions and NO curve glyph; a
timeline slider with its thumb pinned at the left of a wide dark track), wrote verbatim: *"And the
keyframes easing picker doesn't show the curves, and the slider for the timeline slider is not
draggable, the animations don't work, and it's not styled appropriately. We should also be able to
hide the easing ball animation preview, too, with a small inline toggle."*

| # | finding | home |
|---|---|---|
| OA-7 | the easing picker shows no curves | `KF.W13T.e` |
| OA-8 | the timeline slider is not draggable and not styled | `KF.W13T.e` |
| OA-9 | the animations do not run | `KF.W13T.e` |
| OA-10 | an inline toggle to hide the easing-ball preview | `KF.W13T.e` |

Each is a defect at the root (a glyph never rendered, a pointer path never bound, a clock never
started, a raw control never placed on the producer's slider), measured in a live browser before
and after; the toggle is a small inline control on the producer's toggle primitive, its state
persisted where the scene's other view state lives. `KF.W13T` runs [`.k`] → [`.e`] → [`.k2`].

## §0ap ADDENDUM 2026-09-22 — KF.W13S AT `vue-tsc 0`, `test:demo` 494/494, WITH ONE GATE LEFT (`npm run check` leg 2 = 16 rows in nine LIBRARY test files): ESC-t-1 RULED, THE DELIBERATELY-INVALID-INPUT IDIOM RULED, THE LINT ERRATUM ISSUED, THE `.a4` RESIDUE HOMED; UNITS `.t2` → `.f2`

Resume 2 landed `.a4` (MM-1/MM-6 as ONE sha, kf `82c11a9c`), `.e3` (`EasingName` catalogue half +
leg 2 → `vue-tsc`, `5149fe8e` · `781fd1d7`), `.t` (12 `test/demo/**` rows, `4815cfe8`), Repair 1
(ESC-e3-1 at the root — the typed readonly `[EasingName, BezierQuad][]` entries, `6705d4d8`; ESC-e3-2
the typed ribbon props). Three checks agree: **vue-tsc 0 · test:demo 494/494 · leg 2 = 16**, all
sixteen in `test/{compile,engine,group,ingest,scroll,waapi}/**`, which no row granted. Ruled:

- **ESC-t-1 — GRANTED to unit `.t2`** (Opus): the nine files `test/compile/diagnostics-channel.test.ts`
  · `test/compile/value4-easing-contract.test.ts` · `test/engine/animation.test.ts` ·
  `test/engine/strict-options.test.ts` · `test/engine/w0-crashes.test.ts` · `test/group/group.test.ts` ·
  `test/ingest/platform-adopt.test.ts` · `test/scroll/scroll-scene.test.ts` ·
  `test/waapi/waapi-lifecycle.test.ts`. The ten TS6133/TS6192 rows are unused bindings — deleted
  (the binding, not the test).
- **The deliberately-invalid-input idiom (the six TS2345/TS2322 rows).** A test whose SUBJECT is the
  runtime's refusal of a bad easing must hand the bad value to the runtime through the boundary
  that actually receives untrusted input. Ruled, in order: **(i)** if the API under test has an
  `unknown`-typed ingress (`fromString` / adopt / ingest / a parse entry), the test constructs the
  value as `const bad: unknown = …` and calls THAT ingress — the refusal is then a real runtime
  property; **(ii)** only where no untyped ingress exists, the test asserts the COMPILE-TIME refusal
  with `// @ts-expect-error <one-line reason>` on the call — the lawful TypeScript instrument for
  "this must not type-check" (it fails the build if the error ever disappears). `as any`,
  `as unknown as T`, `@ts-ignore` and loosened assertions stay forbidden. Each of the six is
  recorded as (i) or (ii) with the reason.
- **Lint erratum (C1-4 / C2-2 / C3-2), dated beside KF-W13.md**: the §Verification eslint line runs
  WITHOUT the ignored `demo/styles` glob. The 7 pre-existing errors in three untouched files are
  homed at **`KF.W13T.k2`** (the three files granted there, cure-or-return by `file:line`).
- **`.a4` residue (C3-3)**: R-a4-1 (`superKey` bound at `App.vue:35`, declared in `MbabbMenu.vue`) →
  **`KF.W13T.k`** (both files writable there); R-a4-2 (CubeScene's unreachable hover-card state:
  `ppmycotaOpen`, `autoDismissTimer`, `clearAutoDismiss`, its `watch`, the `onBeforeUnmount` call,
  the dead `watch` import) → `CubeScene.vue` GRANTED to `KF.W13T.k` for exactly those spans.
- **C2-4 (INFO), acknowledged**: value.js `c91bf31b` (a B seat's LEDGER commit) is the CARRIER of the
  `F.W11` and `KF.W13T` rows §0ao minted; no byte change.

**Mechanism.** KF.W13S RESUME 3 (`.a2` `.e` `.a3` `.e2` `.a4` `.e3` `.t` alreadyDone): [`.t2`] → [`.f2`]
(the §0ai close: `vue-tsc 0` · `test:demo` green · `npm run check` exit 0 · R-f2-5 producer asks
relayed to BK · push). Then `KF.W13T` (§0ao/§0ao.1). KF.W3 stays gate-keyed on RC-P(V).

## §0aq ADDENDUM 2026-09-22 — TRACK A's X-W6 AND X-W5 AND TRACK C's F.W11, ALL NOT-CONFORMANT AFTER TWO REPAIRS ON UNGRANTED BYTES OR UNSAT TRIUMVIRATES: EVERY ESCALATION RULED; THE X-W5 §3a TRIUMVIRATE SAT AS UNITS `.t` → `.d2` → `.c2`; X-W6 `.c` `.d` `.e` `.h` `.i` RE-DISPATCHED ON GRANTS; F.W11 `.e` MINTED; ESC-PUSH DISCHARGED

**The push.** value.js `tranche-u` was 204 ahead / 1 behind (`6fc1212e`, X-W9 repair-1 pushed from a
sibling checkout, append-only on `X-W9.md`). Resolved as a merge commit with the remote hunk carried
verbatim AFTER the local appends (E-3: nothing rewritten); pushed; `origin/tranche-u == HEAD`.
ESC-PUSH (X-W5, X-W6, KF.W13S, F.W11) is DISCHARGED. X-W5's shell lane is COMMITTED (its `.c` `.d`
`.e` shas), so X-W6's a2/a13/b3 re-run at its next close.

### X-W6 (GREEN 30 / RED 20 at three checks)
- **ESC-R1-c4** — already inside §0an's class 2 (`color-space-meta.ts`); `.c` lands it.
- **ESC-R1-i3 — GRANTED to `.i`**: `demo/color-picker/index.html`, for the pre-module boot seed
  ONLY (a `<script>` before the module entry that seeds the first-painted atmosphere from the
  persisted pick); W5.md `:321`'s rider binds — the portalled-dialog ancestry is identical
  before/after, measured. X-W5's carve on the same file is not disturbed (serial tracks).
- **ESC-R1-b1 — CURED, not relieved**: b1 (keyboard grammar: Home/End/Up/Down/PageUp/PageDown/Space,
  a keyboard path to CREATE a stop, the ordinal announced) is a `GradientStopEditor.vue` defect and
  that file is `.c`'s under §0an; `.c` lands it as its commit #4 and re-runs b1's arm of
  `gate-seat.mjs`.
- **ESC-R1-g1 — RELIEVED BY ROUTE**: M-23 (W6.md `:154`) assigns the spacing canon to X-W10, and `.g`
  may not mint it; g1's 61.22px readout residue is honest-RED at W6 by id, owned by **X-W10** (its
  unit takes `ColorComponentDisplay.vue` and retires `readout-seam.spec.ts:85-119`; `readoutReservation.ts`
  n.26 alone cannot move it).
- **h1 — RULED**: the OM-6 beyond-sRGB limb is **honest-RED-by-physics, id `H1-P3`**,
  cross-referenced to `waves/W6-glass-ask-hero-blob-p3.md`; `.h` writes the h1 oracle to §0z E6 on
  the in-bounds consumer route (`HeroBlob.vue:15` / `useContrastSafeColor.ts` — `mapColorToGamut`,
  cut at the stripper h2's census measured) and files the display-p3 drawing-buffer limb as a dated
  glass-forward ask by mail (BK). h1's GREEN is carried by the two headroom seeds.
- **§0z E2 full-vitest** — the two foreign W1.a born-RED canaries (`spectrum-luma` C-5,
  `demo/test/shell/reka-binding-idiom.test.ts` NG-6) → **X-W8 `.i`** (below); W6 cites them by id.
- **`.j`** after X-W5 CLOSED (§0z E1). **Mechanism**: RESUME dispatches [`.c`] → [`.d`] → [`.e`] →
  [`.h`] → [`.i`] (`.a` `.b` `.f` `.g` done), then close/check.

### X-W5 (§3a triumvirate triggers: D1 · C1 · A2; bounds: D4 · N15 · N14; routes: C7 · C3)
- **The triumvirate SITS as three units** (W5.md §3a: research + plan augment + redress; the
  failing unit is not re-dispatched alone): **`X.W5.t`** (Fable — RESEARCH + PLAN AUGMENT): D1
  measured under RULED instrument conditions — a quiescent host (the seat runs the gate alone,
  load < 4 recorded), ≥ 10 interleaved runs, medians — with the out-in co-mount re-probe (fold
  `:41`) COMMITTED first under the COUPLED/GATING locks; the swap-travel root on `→/gradient` and the
  Mix scene's own frame cost named at `file:line` with the cure plan; A2's blob arm RE-AUTHORED
  falsifiably (dated addendum-beside); C1's re-metric recorded. → **`X.W5.d2`** (Opus — REDRESS): the
  plan's cures, D1 re-measured by `scene-swap-budget.mjs` under the ruled conditions. → **`X.W5.c2`**
  (Opus): the bounds grants below.
- **C1 — RE-METRICED (dated)**: `innerText` omits `content-visibility: auto` sections that sit
  off-viewport by specification, so the 0.5557 on `#/` at 390 measures the browser's optimisation,
  not amputation; the `textContent` ratio (1.0 on 15/15 routes) is the content-parity the gate
  intends. C1 reads `textContent` ≥ 0.9; rider: every About section stays reachable by scroll at
  390 (one assertion in the same probe). Shrinking desktop is still caught by the existing clause.
- **D4 / ESC-W5d-2 — GRANTED to `.c2`**: `demo/palettes/browser/admin/AdminNamesPanel.vue`, one named
  one-root `<Transition>` as `MixSourceSelector` (BD-22's *"source order only"* widened for exactly
  that).
- **N15 / ESC-W5c-2 — GRANTED to `.c2`**: `demo/palettes/admin/AdminPane.vue` (the query before the
  selector). **N14** (ATP-33: one view identity, declared once, type-visible) — GRANTED to `.c2` over
  the `AdminTagsPanel` family's declaration sites (`demo/palettes/admin/**`), the census printed;
  BD-08 (`router/index.ts`) stays read-mostly.
- **ESC-W5c-3 + landed-by-consequence — GRANTED to `.c2`**: `e2e/visual/census-parity.spec.ts:88-90`,
  `e2e/smoke/oracles/o12-blob-seat.spec.ts:68`, `o16-computed-cascade.spec.ts:158` (one-token
  re-points to `--stage`).
- **C7 — RELIEVED BY ROUTE**: `DockStatusLamp.vue:70` → **X-W8 `.h`** (the dock unit); C7's target 3
  is read with that survivor honest-RED by route. **C3** — the capability-only rows are classified
  OUT of the gate (dated); the three layout forks (`ExtractWorkbench:226` `isWide` ·
  `ConsoleRail:118` · `HeroBlob:71` `isLgViewport`) → **X-W8 `.i`**.
- **Mechanism**: RESUME dispatches [`.t`] → [`.d2`] → [`.c2`] (`.a` `.b` `.c` `.d` `.e` done), then
  close/check; the L-18 rider's two quartet passes precede ACCEPTED as the spec says.

### X-W8 gains unit `.i` — the W5/W6 carries (Opus, serial after `.h`)
The three C3 layout forks · `DockStatusLamp.vue:70` (with `.h`) · the two vitest canaries C-5 /
NG-6 cured at their roots (test-owned, W1.a born-RED) · nothing else. Bounds: the named files.

### F.W11 (G-F11-1..5, 7 GREEN; G-F11-6's e2e leg RED on three snapshot rows) — `.e` minted
- **ESC-F11d-1 — GRANTED to `.e`** (Opus), in this order: (1) **R-d-1 first** — the native inputs
  (`HarmonicLevelGrid` `.level-input`, `MorphPhaseConfig` `.num-input`) and the `PaperSearchInput` /
  `GallerySearchBar` wraps move onto glass-ui's `Input` (spec `.a`: *"local styling yields to the
  producer's surface"*; the owner's own ask); (2) `visual-checkpoint.spec.ts` gains the item-3
  settle-wait on the compute (the 20/10 → 8/8 capture race; NO threshold loosened); (3) the three
  PNGs under `web/e2e/visual-checkpoint.spec.ts-snapshots/` (`:144` admin banner · `:163` disclosure ·
  `[mobile] :182`) are re-baselined AFTER (1), each viewed and its diff described in an eye-review
  receipt (the §0ao restyle is the cause; a behaviour change, if any, is cured not baselined).
  G-F9-23's `-linux` caveat stands for CI (operator). Then `.d2` (verify-only close) re-runs G-F11-6.

**Mechanism.** Track A relaunches (RESUME: X-W6 → X-W5 → X-W7 → X-W8 → X-W10 → X-W11); Track C
relaunches (F.W11 RESUME: `.e` → `.d2`). Every grant above is named in the wave's dated addendum.

## §0ar ADDENDUM 2026-09-22 — KF.W13S CLOSED (IMPLEMENTED at the §0ai literal); KF.W13T LANDED OA-6..OA-10 WITH ONE LIMB RED: ESC-e-1 · ESC-k2-1 · R-k-1 · R-e-2 RULED; THE SS-6 ROWS FOR O-50 ACCRETED; UNITS `.e2` → `.k3` → `.k4`

KF.W13S is CLOSED at `kf 084a3679` — vue-tsc 0 · leg 2 0 · `npm run check` exit 0 · test:demo 494/494 ·
library 1259 unchanged. KF.W13T landed the owner's docket: the dock tether spans the viewport
(`b56e9a41`), the `.a4` residue is gone (`70a9b882` `936b8c74`), every easing row draws its curve
from the easing it runs (`2141883d`), the scrub rail wears the producer Slider's paint (`a71efd0d`),
the animations run (`b4c5dfb1`), the preview toggle exists (`cbe9b904`); G-KFW13T-1..5 GREEN ×2.
Ruled:

- **ESC-e-1 — GRANTED to `.e2`**: `demo/state/controlOptionsStore.ts`, ONE optional field on
  `StoredAnimationGroupControlOptions` beside `ppMode?` — `easingPreview?: "shown" | "hidden"` —
  read by `EasingScene.vue` through `getStoredAnimationGroupControlOptions(EASING_SCENE_ID)`; the
  reload witness is G-KFW13T-6's persistence limb. **R-e-2** (the paused-scrub `AnimationVisualizer`
  twin does not repaint) → `.e2`, cured at the repaint trigger, never a forced re-render loop.
- **ESC-k2-1 — GRANTED to `.k3`**: the six `vue/no-mutating-props` rows are cured at the OWNER of
  the state, with the parent bytes granted: `ChannelOptions.vue` (`:500-510`, `:666`) ↔
  `TimingFunctionPanel.vue` (`:151` `:152` `:156`) and `AnimationControlsGroup.vue` (`:198`, `:213`) ↔
  `ControlsPaneWrapper.vue` (`:62` `:328` `:366`) — `defineModel` / `emit` at the seam, the store
  write moving to the component that holds the key; never an eslint-disable, never a prop cast.
- **R-k-1 — DESIGN RULED (the owner's dock docket, OA-6)**: at 390 the expanded top dock and
  `EditorShell.vue`'s header ribbon (Share · Keyboard shortcuts · theme) collide because there are TWO
  chromes. There is one: the ribbon's controls ride the `ChromeDock` (a dock group/layer on the
  producer's primitives, as fourier's `AppDock` absorbed its header at F.W11) and the ribbon
  retires at every viewport — one home per control, accessible names and the `?` shortcut intact.
  `EditorShell.vue` + `ChromeDock.vue` GRANTED to `.k3`; gate: 0 collisions at 390/768/1440 ×2.
- **O-50's SS-6 rows** — accreted at §4a below (KFW13T-BK-1 · -BK-2), the orchestrator's owed act.
- **`.t2`'s returned R6 blind spot** (`scripts/gates/structure/index.mjs:337` ignores dynamic
  `import()`) → the owner close report (a gate-author item; no wave opens `scripts/gates/**`).

**Mechanism.** KF.W13T RESUME (`.k` `.e` `.k2` alreadyDone): [`.e2`] → [`.k3`] → [`.k4` verify-only
close]; spec = KF-W13.md's ADDENDUM 2026-09-22 (fourth). Then Track B is COMPLETE but for KF.W3
(gate-keyed on RC-P(V) at the X-W11 coordinate).

## §0as ADDENDUM 2026-09-22 — F.W11 CLOSED CONFORMANT (`41e49af`: the Edit-contour toggle rides GlassDock's persistent slot); ITS THREE NON-GATE RESIDUALS SPENT BY ONE TAIL WAVE `F.W12`

F.W11 closed CONFORMANT at Check 2 (0 HIGH; radii 0 · app-wide grid · `AppDock` · eight panels on
producer surfaces · four fields on `Input` · snapshots re-baselined with eye review). Its residuals
are not left to the report: **R-e-1** (arrow-key stepping lost on the numeric fields — glass-ui SHIPS
`number-field`, so the cure is consumer-side: the five numeric sites move onto `NumberField`),
**R-e-2** (two `contrast-pairs.ts` rows and two `style.css` comments describe retired chrome),
**R-e-3** (the native search-cancel glyph — a producer observation, one BK relay row), and Check 2's
MINOR (the `networkidle` readiness wait skips the `:290` keystone under load — replaced by the app's
own readiness signal, never a longer timeout). Wave **`F.W12`** (spec `fourier/waves/F-W12.md`;
[`.a`] → [`.b`]); Track C relaunches on it. Every X·F wave before it is CLOSED.

## §0at ADDENDUM 2026-09-22 — TRACK B COMPLETE BUT FOR KF.W3: KF.W13T CLOSED CONFORMANT (the owner's keyframes docket OA-6..OA-10 landed whole); RESIDUAL DISPOSITIONS

KF.W13T closed IMPLEMENTED and Check 1 read CONFORMANT (0 defects above INFO, 10/10 GREENs ×2) at
kf `cfecfbce` = origin: the dock contains its elements (0 outside the capsule ×6 ×2), every easing
row draws its curve (29/29), the timeline slider drags by pointer/click/keyboard on the producer's
paint, the animations run, the preview toggle hides and persists across reload
(`easingPreview` in the scene's view-state bucket), the header ribbon is retired into the
ChromeDock (0 collisions at 390/768/1440), the six prop mutations are cured at their owners,
vue-tsc 0 · `npm run check` exit 0 · test:demo 505/505 · library unchanged. Every X·KF wave is CLOSED
except **KF.W3**, which stays gate-keyed on RC-P(V) at the X-W11 coordinate (never scheduled).

Residuals, disposed: **Share/theme also as `MbabbMenu.vue:47-80` rows** — BY DESIGN: an app menu
enumerates the chrome's commands (the macOS convention); the dock is the primary home, the menu the
enumeration; no second writer of state exists (measured at `.k3`). **SharePopover glyph one size step
larger** → KF.W9's size ladder, owner close report (design note). **`resize-tracks.test.ts` mounts
`AnimationVisualizer` without `currentT`** (dev warning only) and **the Drawer-detent setter arm not
driven live** → the owner close report by id; neither is gate-bearing. **VERIFIED for X·KF** is an
end-of-plan act with RC-P(V) (the orchestrator's L-18/L-20 passes), recorded then.

## §0au ADDENDUM 2026-09-22 — F.W12: THE PRODUCT LANDED (fourier `c5836a7`), ONE HARNESS COUPLING LEFT; ESC-F12a-1 RULED (b) WITH ITS PROOF OBLIGATION; UNIT `.a2` → `.b2`

F.W12.a landed R-e-1 (five numeric fields on glass-ui `NumberField`, ArrowUp 5/5 ×2), R-e-2, the
readiness signal (`networkidle` 0·0) and the O-51 relay; G-F12-1/-2/-4 GREEN. G-F12-3's full-run
leg is RED because `visualization-ux.spec.ts`'s `test.describe.serial` block lets one load-slow test
(`:109`/`:122`, ~30 s under nine workers against one dev server + compute backend) SKIP every later
test, the `:322` keystone among them. Ruled on ESC-F12a-1:

- **(a) REFUSED** — no `test.slow()`, no timeout raise (the lock stands).
- **(b) GRANTED with a proof obligation** — `.serial` was added at `ca58321` without a stated reason.
  Unit `.a2` first PROVES each test in the block independent (each run ALONE from a fresh page
  passes ×2); any test that depends on a predecessor's state gets its OWN bootstrap (that is the
  real cure — the coupling, not the flag); only then is `.serial` removed. No assertion, wait or
  timeout changes.
- **(c) applies to `:109` ALONE** — it is already in the banked load-flaky six; a timeout on it in a
  full run is not a new failure, provided it passes alone ×2 (B-4). It does not relieve `:322`.

G-F12-3's full-run leg then reads: `:322` EXECUTED and green in two full nine-worker runs, and no
failure absent at `41e49af`. **Mechanism**: F.W12 RESUME (`.a` alreadyDone): [`.a2`] → [`.b2`
verify-only close]. The J-audit PNGs rewritten by `visual-baseline` (outside every set) → the
owner close report (a fourier evidence-home question).

## §0av ADDENDUM 2026-09-22 — F.W12: `.serial` RETIRED ON PROOF (fourier `3e709e4`); ESC-F12a2-1 RULED (ii): THE FULL-RUN LEG IS MEASURED ON A QUIESCED HOST, LIKE X-W5's D1

`.a2` proved all nine block tests independent (18/18 alone), retired `test.describe.serial` with no
assertion, wait or timeout change, and the keystone (`:330`, the spec's `:290`) EXECUTED in 8/8
full runs. Its five timeouts all came at host load ≥ 40 with a sibling track's Playwright live; at
load 17–21 the leg was GREEN ×2 with 0 failures absent at `41e49af`. That is the instrument, not the
product or the harness. Ruled: **(ii)** — G-F12-3's full-run leg is measured on a QUIESCED host:
15-min load average < 20 recorded at start and end, no sibling headless Chromium live (⟨cmd⟩ `pgrep
-fl chrom | grep -vc <own pid>` → 0), two full nine-worker runs. **(a)** stays refused; **(c)** stays
`:109`-only. The nine-worker count against one dev server in CI is CI's own configuration → the
owner close report (operator item, beside G-F9-23's `-linux` baselines). **Mechanism**: F.W12 RESUME
(`.a` `.a2` alreadyDone): [`.b3`] (Opus, verify-only close; waits for quiescence in bounded
background polling ≤ 20 min before measuring; if quiescence never arrives, records the two best
runs with their load and closes honest-RED by instrument, id `G-F12-3-LOAD`).

## §0aw ADDENDUM 2026-09-22 — TRACK C COMPLETE: F.W12 CLOSED honest-RED BY INSTRUMENT (`G-F12-3-LOAD`); THE X·F OPERATOR ITEMS COLLECTED FOR THE OWNER CLOSE REPORT

F.W12 closed (Check 1 CONFORMANT-HONEST-RED, 3 INFO): every product gate GREEN ×2 (five fields on
`NumberField` stepping, rows retired, `networkidle` gone, O-51 sent); the full-run leg is RED by
instrument alone — the §0av bar (15-min load < 20 at start AND end of two nine-worker runs, no
sibling headless Chromium) was never met on a host shared with a csc411 workflow's periodic
Playwright probes; the keystone executed and passed whenever the host was quiet. Every X·F wave is
CLOSED (F.W0–F.W12 with F.W10S). **Operator items (X·F), by id, for the owner close report**:
G-F12-3-LOAD (a dedicated quiesced window or host for the two-run reading) · the nine-worker CI
count against one dev server + compute backend · G-F9-23's `-linux` baselines (a CI-capable seat) ·
G-F9-15 certbot renewal · G-F9-19 docker/nginx host authority · the 21 J-audit PNGs rewritten by
`visual-baseline` on every full run (a fourier evidence-home decision) · the glass-ui relays
A-2 (dock press guard) · A-3 / KFW13T-BK-* / FW12-BK-1 (producer surfaces) awaiting BK.

## §0ax ADDENDUM 2026-09-22 — TRACK A, FIFTH SITTING: THE CHASSIS HALTED BOTH WAVES AT THE FIRST ESCALATED UNIT (X-W6 ran `.c` only; X-W5's `.c2` NEVER SAT TWICE) — THE DISPATCH RULE CORRECTED; X-W5's D1 · LEVERS · GRANTS · LANDMARK MIGRATION RULED; X-W6's b1 · a4 · f3 · h1 · i3 RULED; STAGE ORDER X-W5 BEFORE X-W6

**Chassis.** The wave runner broke out of its group loop on the first `ESCALATED` unit, so every
later group of the same wave was never dispatched (X-W6: `.d .e .h .i`; X-W5: `.c2`, twice) — an
escalation is a RETURN to the orchestrator, not a halt. Corrected: only a `DEAD` seat halts a wave;
escalated units are recorded and the remaining groups run. The A stage `[X-W6, X-W5]` becomes
`[X-W5, X-W6]`: X-W5's `.c2` migrates the landmark query that turned nine W6 gates RED, and W6's `.j`
waits on X-W5 CLOSED anyway.

### X-W5
- **ESC-W5t-1 (D1's host condition) — RULED like G-F12-3-LOAD, with the real-GPU read**: the
  `load < 4, seat alone` bar is unreachable on a host carrying the owner's `vitest-vscode` watchers
  (32 processes at this clock). `.d2` takes D1 in BOTH instruments at the lowest load it can wait
  for (bounded polling ≤ 20 min, load recorded): (1) headless (software GL), the spec's command; (2)
  **headed real-GPU Chromium** on this Mac (the `→/mix` cost is `resume-on-activate on software GL`,
  an artefact the user never sees). The reading OF RECORD is (2); (1) is recorded beside. If (2) is
  within budget, D1 is GREEN-by-instrument with both readings; if not, the levers below apply.
  **Operator item**: a quiesced window (vitest-vscode closed) for a clean headless reading.
- **ESC-W5d2-2 (the levers) — DESIGN RULED**: P-5a (`align-items: start`) is REFUSED — it breaks
  equal-height card pairing on 6 of 7 dual routes; P-5b (`rotate 0deg`) is REFUSED — it deletes a
  motion limb (the preserve-animations edict). The travel jank on `→/gradient` is the About pane's
  7,459 px layer travelling: the cure is CONTAINMENT, not amputation — the leaving and entering
  layers get `contain: layout paint` for the duration of the swap and the About pane's off-viewport
  sections keep `content-visibility: auto` while travelling; nothing is removed. `.d2` measures.
- **GRANTS to `.d2`**: `demo/picker/ColorPicker.vue:2-4` (the root-level comment relocated inside the
  root div — the Vue 3.5 dev-root-fragment × `Transition mode="out-in"` continuation loss, ESC-W5t-2,
  HIGH; the minimal repro rides a letter upstream, owner report) · `demo/shell/ErrorBoundary.vue` +
  `demo/color-picker/main.ts` (EB-2's home, ESC-W5d2-1) · new loading/error plate files under
  `demo/shell/` (ESC-W5t-3). The COUPLED family P-1 · P-2 · P-3 · P-4 lands together. **ESC-W5t-4**
  (`HeroBlob.vue:246-250`, `→/mix` on software GL) → decided by the real-GPU read; a byte owed → X-W8 `.i`.
- **ESC-R1-1 / ESC-R1-2 / ESC-R1-3 — GRANTED to `.c2` (widened)**: the landmark X.W5.a renamed
  (`<main :aria-labelledby>` the route H1) is right; its 61 stale consumers are X-W5's consequence:
  `e2e/**` files querying `getByRole('main',{name:'Color tool panes'})` re-pointed ONCE through the
  fixture (`e2e/smoke/fixtures/dock.ts` exports the main-pane locator; files migrate to it —
  never a per-file copy of the query) · `e2e/visual/census.ts` gains the `not-found` row ·
  `demo/shell/router/index.ts`'s route-name declaration made type-visible (N14's second site; BD-08
  widened for that declaration only). Together with D4 (`AdminNamesPanel.vue` `<Transition>`), N15
  (`AdminPane.vue`), N14's `AdminTagsPanel` sites and the o12/o16/census-parity re-points already
  granted (§0aq).
- **Order**: [`.c2`] → [`.d2`] (`.t` is done: its plan and repro are the input).

### X-W6
- **ESC-W6c-b1-1 — b1 is an INSTRUMENT artefact**: `gate-seat.mjs` G3d focuses the FIRST stop, seeded
  at 0%, where Home and ArrowDown cannot move under any lawful grammar (the axis floor, `aria-valuemin=0`).
  The grammar is complete at `666978d4` and `.c`'s discriminating probe (last stop: Home 100→0,
  ArrowDown 100→99, PageDown 100→90) is **b1's witness of record**; b1 reads honest-RED-by-instrument
  `B1-G3D` until X-W11's OUT-OF-WAVE roster re-points G3d's Home/ArrowDown arms at a stop off the
  floor (an instrument edit, like R-5). No product byte is owed.
- **a4 / a13 (`o21:188`, 5/5 RED, a press sequence)** → the W6 repair seat, in bounds (o21 is a §4
  file; ADD the missing settle/scroll, never loosen the mint or ordinal assertion).
- **f3** (the space listbox stays visible > 8 s after a pick; regressed under X-W5 `2183b814`) → the
  W6 repair seat bisects; `demo/color-session/ColorSpaceSelector.vue` GRANTED if the root lands there.
- **h1** (`goo-blob-canvas` not found within 8 s under load; found at 6 s quiet) → `.h` re-sits on
  the §0aq route, with the boot latency named. **i3** → `.i` on the §0aq `index.html` grant (a duty).
- **Order (RESUME, after X-W5 CLOSED)**: [`.d`] → [`.e`] → [`.h`] → [`.i`] → [`.j`]; the nine
  landmark REDs re-run after `.c2`.

## §0ay ADDENDUM 2026-09-22 — X-W5's `.c2`/`.d2` LANDED (D1 GREEN OF RECORD ON THE REAL GPU); THE SWAP'S ONE REAL DEFECT (ESC-W6close5-1, a stuck enter state on cold first navigation) RULED TO X-W5 `.d3`; ESC-W5c2-1 · ESC-W5c2-2 · ESC-W6i-i3-1 RULED; X-W6 `.a2` · `.i2` · `.j`

X-W5: `.c2` migrated the landmark (61 files through one fixture export, 0 stale), added the
`not-found` census row and the typed route names; `.d2` landed the coupled family (out-in · rAF
mirror · plates · EB-2) in one commit with the dev-root-fragment cure, containment during the swap,
and **D1 of record GREEN 14/14 headed on the real GPU** (all four hops over32 ≤ 0.012, median 10 ms);
headless software-GL recorded beside. X-W6: `.d` `.e` `.h` DONE; `.i` escalated. Ruled:

- **ESC-W5c2-1 — GRANTED to `.c3`**: `o16-computed-cascade.spec.ts:218` and `:266` assert equality
  with the RESOLVED `--spring-snappy-duration` token (`getComputedStyle` on the rule's own element),
  which is R2/R8's stated intent — the literal `"0.4s"` predates glass 7.0.0's `0.44s`. Not a loosening.
- **ESC-W5c2-2 — RULED like D1**: o12 O-12·3's hover frame-diff is read HEADED on the real GPU as
  the reading of record; the 6/255 floor is unchanged; `.c3` runs it. Below the floor on the GPU →
  a blob-mood defect → X-W8 `.i` by id.
- **ESC-W6close5-1 — X-W5's OWN DEFECT, unit `.d3`** (Opus): on a cold first navigation 1 of 5 fresh
  browsers leaves the pane in `vj-enter-enter-from/-active` and the gradient rail at x = −351;
  a5–a12, e1 and g2 (About pane 6.5 px off its track start) regress on `52dc0a5b`/`b36df565`. Find
  the root — the transition name flipping on `viewManager.ready` (`App.vue:134`) during an in-flight
  enter, an enter hook that never fires when out-in has nothing to leave, or the `*-active`
  containment rule — and cure it there; witness: 5 fresh contexts × cold navigation → 0 stuck ×2;
  g2 bisected and re-read ×2. Never a settle, never a forced class removal.
- **ESC-W6i-i3-1 — RULED (a), with a perf gate, to `.i2`**: a hand-copied derive in HTML is the
  copied-producer class and (b) `blocking="render"` trades the wrong first paint for a late one.
  `plugins/vite-ground-tokens.ts` is GRANTED to inject, at build and serve, an IIFE bundled from the
  SAME modules (`useAtmosphere.ts:285-293`'s derive over glass `color.js` + value.js `/color`) that
  seeds the first-painted ground from the URL-hash pick when no persisted ground exists; single
  source preserved by construction. Perf gate (X-W2 is CLOSED; the orchestrator signs): the
  injected IIFE ≤ 12 KB gzip and LCP on `/` within 50 ms of `HEAD~` on a bounded probe ×2 — if the
  bundle cannot meet it, `.i2` returns the size and the wave closes i3 honest-RED by id `I3-SEED-SIZE`
  with (c) recorded as the fallback for the owner.
- **a4 / a13 (`o21:188`) — unit `.a2`** (Opus): `e2e/smoke/oracles/o21-gradient-rail.spec.ts` gains
  the settle/scroll its reload → openView → press sequence lacks; the mint and ordinal assertions
  untouched; suite GREEN ×2.
- **Order**: X-W5 [`.c3`] → [`.d3`]; then X-W6 [`.a2`] → [`.i2`] → [`.j` if X-W5 reads CLOSED].
  b1 = `B1-G3D`, g1 → X-W10, H1-P3 by physics stand.

## §0az ADDENDUM 2026-09-23 — X-W5: THE STUCK-ENTER ROOT FOUND (Vue's `BaseTransition` enter guard drops the pane's enter when the async loading plate and the resolved pane swap under one Transition key) — RULED (a), UNIT `.d4`; o16's PRE-GLASS-7 ROWS RULED, UNIT `.c4`; X-W6 `.j` OMITTED (NOT BLOCKED) UNTIL X-W5 CLOSES

- **ESC-W5d3-1 — RULED (a), GRANTED to `.d4`** (Opus): `demo/shell/usePaneRouter.ts` `lazyPane`
  (`:189-223`, inside the W5F-07 family, P-1..P-4 unsplit) publishes loader readiness; `PaneSlot.vue`
  keys its `<Transition>` child on `(pane, resolved)` so out-in runs plate-leave THEN pane-enter and
  `leavingVNodesCache[key]` can never equal the entering vnode; the vestigial `App.vue:134`
  transition-name flip retires in the same commit. No `__asyncResolved` read (Vue-internal), no frame
  element. Gates: the cold-nav witness (`cold-nav-scene-enter.spec.ts`, 2 routes × 5 fresh contexts)
  0 stuck ×2; W6's a5–a12 / e1 / g2 GREEN ×2 by W6's own commands; D1 headed ×2 unchanged; the
  `PANE_LOAD_DELAY_MS` plate still shows on a slow chunk (witness). The DIAG instrument stays
  read-only evidence.
- **ESC-W5c3-1 — RULED on the resolved-token pattern, GRANTED to `.c4`** (Opus): every o16 row that
  measures a DEMO rule asserts equality with the RESOLVED token AND the demo rule reads that token
  (`.channel-rail-item` transform `0.12s` → `var(--spring-snappy-duration)` or the token the register
  names; `.pane-shell` `0.35s` → its liquid-spatial token; `send-btn` `0s` → its register's token) —
  the oracle exposes literal drift and the drift is cured at the rule, never at the assertion. Every
  row that measures a PRODUCER register asserts the producer's resolved value; a register the
  producer REMOVED (R4 `cartoon-surface`: glass 7.0.0 ships no transition) is RETIRED with a dated
  line beside — if the lost motion is wanted back, that is one BK relay row, never a consumer copy.
  Prose at `:215`/`:264` updated. Bounds: `o16-computed-cascade.spec.ts` whole · `demo/styles/**` ·
  the demo components carrying the literals (named in the receipt). Gate: o16 GREEN ×2 in smoke AND
  oracles-safari.
- **O12-3-HOVER-GPU** (0.30 / 0.53 of 255 on the real GPU against the 6/255 floor) is registered to
  X-W8 `.i` as a blob-mood defect by id — the hover response is genuinely below the floor.
- **X-W6**: seat 0 returned a WAVE-level BLOCKED because `.j` waits on X-W5, so `.a2` and `.i2` never
  ran. Corrected: while X-W5 is not CLOSED, `.j` is OMITTED from the plan (a later resume dispatches
  it); the wave never blocks on `.j` alone.
- **Order**: X-W5 [`.c4`] → [`.d4`]; then X-W6 [`.a2`] → [`.i2`] (→ [`.j`] once X-W5 reads CLOSED).

## §0ba ADDENDUM 2026-09-23 — EIGHTH SITTING: X-W5's STUCK ENTER CURED (`f55e59b7`); THE LAST W5 RED IS AN INSTRUMENT READING A PRE-START POSE → X-W6 `.s`; i3 `I3-SEED-SIZE` RULED HONEST-RED WITH RELAY O-52 (NOT (a), NOT (c)); X-W6 `.f2` · `.v` · `.j`; W5 residuals ROUTED

- **ESC-W5d4-1 — RULED (a), GRANTED to X-W6 `.s`** (Opus). The product cure stands: the cold-nav witness is GREEN ×2 on both arms, the read-only DIAG instrument records 0 dropped enters in 8 runs, D1 headed ×2 unchanged. What remains RED (W6 g2 deterministic 6.50 px; the gradient+o21 suite 20–22/22) is three instruments reading pane geometry while the pane sits in its `vj-enter-enter-from` pose during SwiftShader's first-context frame gap (rAF gap 2,760 ms measured; `getAnimations()` empty because the transition has not started). A pose the user never sees settled is not a product defect; a settle check that counts only running Animations is. **Grant**: ONE settle helper in `e2e/smoke/fixtures/` (a region is settled when it has no running Animations AND no `*-enter-*`/`*-leave-*` transition class on itself or its pane root, awaited with a bounded timeout), used by `companion-pane-track-start.spec.ts`, `gradient.spec.ts` (`:401` and the `:243` drag) and `o21-gradient-rail.spec.ts`; NO product byte, NO per-pane nudge (the OM-10 control stays). Bisect `gradient.spec.ts:243` (Received 12 once): if it is the enter pose, the helper cures it; otherwise ESCALATE `ESC-W6s-1` with the cause named. Gates: g2 GREEN ×3; the gradient+o21 suite 22/22 ×3; gate-a-gesture-paint ×3.
- **X-W5 `.d4`'s g2/e1 leg is RELIEVED by route** (id `W5D4-SETTLE-READ` → X-W6 `.s`); `.d4` reads IMPLEMENTED on the witness ×2 + a5–a12 ×2 + D1 headed ×2. No unit is owed in X-W5: its resume is OPEN (empty plan) → close → check, and the row reads CLOSED on that adjudication. **R5 retirement CONFIRMED** in one line: the `btn-interactive` atom has 0 hits in the 7.0.0 dist (removed at glass `490cc46e`), so the atom row and the send-btn row fall under §0az's producer-removed clause exactly as R4 did.
- **W5 residuals routed to X-W8 `.d` (dead-surface subtraction) by id**: `W5-READY-DEAD` (`useViewManager.ts` `ready` ref `:34/:47-49/:92`, readerless since the App.vue:134 flip retired) · `W5-BTN-INTERACTIVE-DEAD` (the class on `ColorInput.vue:69,78`, `CurrentPaletteEditor.vue:75,78,100`). The motion question rides O-52 R-2 (NOTICE, no wait).
- **ESC-W6i-i3-1 / `I3-SEED-SIZE` — RULED: i3 stays HONEST-RED by id; the cause is the producer's chunking, and the ask is FILED as O-52.** (a) is REFUSED: 50,989 B gzip (≈145 KB raw) parsed before first paint on every load, duplicating the runtime's aurora chunk, is the perf regression the §0ay gate was written to forbid. (c) is REFUSED: re-pointing o28 to the persisted-ground arm would delete the URL-seeded cold load from the requirement, and that is the user-visible case (a shared link's first paint). The banked patch (`W6-evidence/gates/i2-2026-09-23/i2-cure-unlanded.patch`, o28 ΔE_OK 0.0000 ×3 seeds) is the cure of record and re-sits as `.i3` the day a shader-free derive subpath is installable at the pin; no `.i` seat sits before then. `.i2` is alreadyDone (its outcome is this ruling). The §8 cold-load first-paint frame rides that re-sit.
- **X-W6 `.f2`** (Opus): the catalog oracles (`o21-space-catalog-truth`, o22, o24) write their `after-*.png` under `test-results/` (Playwright's outputDir), never into `docs/**`; committed evidence bytes unchanged (E-3; the two oracle-overwritten PNGs were restored to the committed bytes at this seat). Gate: the three oracles run, then `git status --porcelain docs/` empty.
- **X-W6 `.v`** (Opus): the §8 artefacts — gradient BEFORE/AFTER frames (BEFORE from a worktree at the pre-`.a` commit, the seven named cells at 1440 / iphone14) and the owner-mark re-captures (OM-3/4/6/9/10/13 at the same crop, originals under `docs/tranches/V/megatranche/audit/visual/owner-marked/`, ids per `DESIGN-CANON-BRIEF.md`) — force-added past `.gitignore *.png`; an original that does not exist in the tree is recorded with a dated line, never fabricated.
- **X-W6 `.j`** dispatches last, and only if the LEDGER X-W5 row reads CLOSED at that sitting's open (§0az stands).
- **Order**: X-W5 (no units; close → check) → X-W6 [`.s`] → [`.f2`] → [`.v`] → [`.j` if X-W5 CLOSED]. X-W6 closes with i3 honest-RED (`I3-SEED-SIZE`, O-52), b1 `B1-G3D`, g1 → X-W10, as ruled.

## §0bb ADDENDUM 2026-09-23 — NINTH SITTING: X-W5 CLOSED (`db3605d4`); X-W6 `.s` · `.f2` · `.v` LANDED, `.j` LANDED WITH ONE ESCALATION; j4's BLOB LIMB READ BACK TO THE SPEC'S MEASURE-AT-OPEN RETIREMENT AND ROUTED BY ID TO X-W8 `.i`; e1 RE-READ (E-3) ABOVE RASTER NOISE; R-s1 · R-j1 · R-v1 · o23 tsc GRANTED; O-52 RE-ID'D O-53; O-54 FILED

- **X-W5 is CLOSED** (`45d25fd1` close, `db3605d4` LEDGER; check CONFORMANT-HONEST-RED, 24/24 gates reproduced). Its honest-RED ids carry as routed: `W5D4-SETTLE-READ` (X-W6 `.s`, landed `201f737a`), B3 → CC-056, A3/C2 → X-W8, C3 → X-W8 `.i`, C7 → X-W8 `.h`, A5-OUTLINE → X-W10, `O12-3-HOVER-GPU` → X-W8 `.i`, D1 headless beside. `W5-READY-DEAD` was already discharged at `16852e03`; X-W8 `.d` confirms and strikes the id.
- **ESC-W6j-1 — RULED: E-3 re-reading, NOT a shell grant.** W6.md `:323` reads j4 as "the last control and the preview are both reachable" and marks it MEASURE-AT-OPEN: *"If it measures GREEN the gate is retired with the measurement pasted."* It measured GREEN 4 of 4 routes at 720×450 (`6dfdd8d2`), so **j4 is RETIRED under the spec's own clause**. The `.j` seat's o29 blob limb asserts a stronger property (preview visible WHILE the last control is reached), which the spec never wrote; it is a real short-landscape arrangement finding and the shell owns arrangement (`viewSchema.ts:95`, `shell.css` outside W6 §4) → routed by id **`J4-SHORT-LANDSCAPE-BLOB` to X-W8 `.i`** (the layout-forks unit, where `shell.css` is in scope), with the measurement (stage 628 px, blob y 83–325, inspector last control y 771, viewport 450). In the tree the o29 blob limb carries `test.fail(true, "J4-SHORT-LANDSCAPE-BLOB → X-W8 .i")` — an honest-RED that flips the day X-W8 lands it; the atmosphere limb (GREEN 0.079) stays live. → unit **`.j2`** (Opus), which also cures **R-j1**: `GradientPane.vue:28` `function visualizer()` collides with the template ref key `visualizer` (`:14/:48`) and warns on every mount — rename the setup binding (the ref key is the contract), 0 Vue warnings ×2. Writable: `o29-scene-contracts.spec.ts` · `GradientPane.vue` · the record.
- **ESC-W6e1-1 — RULED: E-3 re-reading of e1's `moved`.** `gradient.spec.ts:557` reads `moved` as ANY byte inequality between clipped frames, so a compositor 1-LSB tile re-raster (Repair 2's measured cause) flips it. The property e1 states is "zero settled-frame delta" of a ramp that must NOT move locally; raster noise is not motion. **Re-reading**: `moved` = a per-pixel channel delta ≥ 4 LSB over ≥ 0.5 % of the clip's pixels in any later frame (decode the PNGs; no perceptual library) — AND the a13/e1 arm reads GREEN ×3 under load. Same seat cures **R-s1**: `e2e/smoke/fixtures/settle.ts:64` skips a null pane root, so an EMPTY region reads settled; a region with no pane root is NOT settled (poll until the root exists, bounded) — g2 GREEN ×3. → unit **`.s2`** (Opus); writable: `settle.ts` · `gradient.spec.ts` (the `moved` instrument only, assertions untouched) · the record. NO `demo/**` byte.
- **R-v1 — GRANTED as `.a3`** (Opus): the `.v` AFTER cross-drag frame shows the dragged stop settling at 27.4 % instead of ≈10 % — it appears to stop tracking once it crosses a neighbour. Reproduce with the committed capturer (`W6-evidence/gradient/capture-v.mjs`); if the rail stops tracking after a crossing, cure it at the rail (the `.a` writable set) and add the falsifier the suite lacks: the dragged stop's final position within 2 % of the pointer's release x; the ascending-order assertion stays. If it is the capturer's pointer path, record that with the frame and change no product byte. Gates: a2/a3 ×3, the suite 22/22 ×3.
- **o23 e2e tsc — GRANTED as `.f3`** (Opus): `tsc -p tsconfig.e2e.json` exit 0 (`o23-specimen-gamut-honesty.spec.ts:144/181`, deliberately-invalid-input idiom of §0am if that is what they are; assertions untouched); o22/o23/o24 3 passed ×2.
- **Mail**: the letter first headed O-52 duplicated the KF.W13T id at INBOX `:144`; re-headed **O-53** with a dated erratum line, INBOX `:437` re-id'd (E-3). **O-54** filed: `J3-WEBGPU` (the WebGPU substrate treats a forced `destroyed` loss as terminal by design; asks whether a test seam is intended). Both mirrored byte-identical into the glass BK inbox.
- **LEDGER**: X-W7's Opens-after cell corrected to `X-W3 · X-W4 · X-W6` (W7.md:6); X-W7 is lawfully BLOCKED until X-W6 closes.
- **Hygiene**: four clean seat worktrees of closed waves removed (`value-js-x-w1-c/-d`, `value.js-x-w9-c/-h`) and one prunable entry pruned; Codex-era and named-branch worktrees untouched. The `:9000` dev server restarted on the current bytes.
- **Order**: X-W6 [`.s2`] → [`.j2`] → [`.a3`] → [`.f3`] → close → check. X-W6 closes with i3 (`I3-SEED-SIZE`, O-53), b1 (`B1-G3D`), g1 (→ X-W10), j4-blob (`J4-SHORT-LANDSCAPE-BLOB` → X-W8 `.i`), `J3-WEBGPU` (O-54) as its honest-RED ids. Then X-W7.

## §0bc ADDENDUM 2026-09-23 — THE OWNER'S DOCK + FOURIER DOCKET (five frames) → F.W13 MINTED; THE DOCK BEHAVIOUR IS A PRODUCER ROW → O-55; OPUS 5.5 FOR ALL WORK

- **Owner, 2026-09-23 (model)**: *"Use Opus 5.5 for all work hereof, too. Fable is to not be used quite yet. Let the current workflow finish."* All four chassis route every seat to Opus (`2ddcd6f6`); the in-flight Track A sitting finishes on its launch routing.
- **Owner, 2026-09-23 (docket, verbatim in `fourier/waves/F-W13.md` §Authority; frames banked `fourier/evidence/W13/owner-2026-09-23-{1..5}.png`)**: rows **OA-11** dock shrinks/morphs on scroll, expands on hover/focus, all apps · **OA-12** page-scroll progress in the dock's bottom edge, radius-clipped · **OA-13** frame 1 (paper CONTENTS toggle) under-rounded, non-idiomatic, broken · **OA-14** frame 2 back control not a circle · **OA-15** frame 3 image-mode items broken/non-idiomatic/unrounded · **OA-16** frame 4 duplicate upload text; no sidebar until content, sidebar animates in on drop · **OA-17** frame 5 visualizer panels good but unrounded.
- **OA-11/OA-12 are a PRODUCER row.** glass `GlassDock` morphs on hover/focus only (`useDockState`: collapsed|hover|pinned); no scroll input, no progress seat; `ScrollProgressRim` is standalone. A consumer copy is forbidden (SS-6, owner 2026-07-12). Relay **O-55** filed (mirror in the glass BK dir, addressed to BL's formation, reference = words `useSearchBarScroll.ts`). Each consumer adopts in its own wave when installable; until then `DOCK-SCROLL-MORPH` is honest-RED by id in F.W13 `.d`, and is carried to X-W8 (value.js) and a keyframes adoption row at the same trigger.
- **F.W13 MINTED** (Track C, after F.W12): `.a` radius register + the two broken controls (OA-13/14/17) → `.b` image-mode controls (OA-15) → `.c` one drop affordance, sidebar enters on content (OA-16) → `.d` dock adoption or `DOCK-SCROLL-MORPH` (OA-11/12). Track C relaunches now beside Track A (2 of 4 workflows).
- **Pin gap noted for the owner report**: value.js and keyframes.js install glass 7.0.0, fourier `^8`, glass is at 10.0.1 — dock adoption in value.js/keyframes rides a major bump the X plan has not scheduled.

## §0bd ADDENDUM 2026-09-23 — THE OWNER'S VALUE.JS DOCKET (four frames, OA-18..25) → X-W12 MINTED AHEAD OF X-W8 (ABSORBING X-W8 `.f .g .h`); THE GLASS HALVES → O-56 + THE LIVE GLASS SESSION

- **Owner, 2026-09-23** (verbatim in `waves/W12.md` §Authority; frames `waves/owner-2026-09-23/frame-{1..4}.png`): **OA-18** black background · **OA-19** aurora buggy · drag slow (repeats OA-4) · **OA-20** startup + card animations janky · **OA-21** About pane too long, not clipped to the left pane (repeats OA-5) · **OA-22** login/@user pills off-colour and squared; dock transitions not an iOS-27 morph (extends OA-6) · **OA-23** glass changes at the ROOT, communicated with the running glass-ui instance · **OA-24** Picker card hierarchy wastes space; the blob not animated, not glass-idiomatic · **OA-25** pane/card transitions double-animated and broken.
- **Why a new wave**: OA-4..6 sat in X-W8 behind X-W7, so the owner is still seeing them. X-W12 runs directly after X-W7 and absorbs X-W8 `.f .g .h`; X-W8 opens after X-W12.
- **OA-23 executed**: O-56 filed (mirror in glass BK) AND sent live to session `glass-ui-9d` (msg `5be9806b`) with O-55. glass-ui stays READ-ONLY to value.js; producer halves carry honest-RED ids (`DOCK-SCROLL-MORPH`, `DOCK-MORPH-ROOT`) until glass ships.

## §0be ADDENDUM 2026-09-23 — THE OWNER'S THIRD KEYFRAMES DOCKET (OA-26..29) CONTRADICTS KF.W13T's CONFORMANT CLOSE → KF.W13U MINTED UNDER THE SERVED-PAGE INSTRUMENT RULE; GLASS BL ACKNOWLEDGED O-53..O-56

- **Owner, 2026-09-23** (verbatim in KF-W13.md's KF.W13U addendum; frames `keyframes/evidence/W13U/`): **OA-26** dock animations blurry, janky, jittery · **OA-27** the cube does not animate; none of the animations are wired up · **OA-28** the easing picker shows no current curve in the trigger/header or the dropdown (label and description run together) · **OA-29** the timeline is always greyed out.
- **Finding against our own record**: KF.W13T closed CONFORMANT (`cfecfbce`) on curves 29/29, a draggable slider, and running animations — read in the e2e harness. The owner's served page shows the opposite. Ruling: **the served-page instrument rule** — KF.W13U's gates are read on `http://localhost:5173/` in a headed real-GPU browser (plus gh-pages), each unit first reproduces the owner's observation, and a harness-only GREEN does not count. The keyframes dev server (up since 2026-09-22 17:15) was restarted with `--force` at this seat so the owner's surface serves a fresh dependency graph.
- **glass-ui BL** (session `glass-ui-9d`, 2026-09-23) acknowledged O-53, O-54, O-55, O-56: banked at glass `a97a9ddd`, rowed in `BL/audit/INBOUND.md`, owner words as recap rows N-6..N-8; every row gets a terminal disposition in BL's LEDGER; the landing version is fixed when BL's PLAN forms (likely a major above 10.0.1). Our honest-RED ids stand until then.
- Track B relaunches for KF.W13U (3 of 4 workflows: A, B, C).

## §0bf ADDENDUM 2026-09-23 — OA-30: "MOST OF THE ANIMATIONS ARE BROKEN" → A PLANNED FRAME-BY-FRAME AUDIT OF EVERY KEYFRAMES ANIMATION (read-only), FEEDING A CURE WAVE

- **Owner, 2026-09-23, verbatim**: *"Mark that most of the animations are broken, like the amiga animation does not layer and compose properly--audit every animation and frame by frame thereof, too. In a planned workflow"* → row **OA-30** (keyframes.js; extends OA-26/27).
- **Executed as a dedicated audit workflow** (`kf-animation-audit`, Opus 5.5 every seat, 4th of 4 slots): inventory every animation surface of the keyframes demo (the six scenes Cube · Amiga · Square · Easing · Spring · Sequence, Home, the scene swap, the dock, and the editor/shell chrome), then capture each one frame by frame on the SERVED page (`http://localhost:5173/`, headed real-GPU Chromium; the §0be instrument rule), read the frames against the animation's intended behaviour, root-cause each defect at the bytes (read-only), and have a fresh seat re-read the frames to confirm each finding. Output: `docs/tranches/X/keyframes/audit/KF-ANIMATION-AUDIT.md` (defects by id `KFA-n`, frame indices, cause, severity) + frames under `keyframes/evidence/animation-audit/`. Read-only on keyframes.js (KF.W13U is editing it concurrently; every capture records the kf HEAD sha and dirty state).
- **Routing**: the register is folded into KF.W13U if it is still open when the audit lands, else a cure wave **KF.W13V** is minted from it — every `KFA-n` cured or honest-RED by id.

## §0bg ADDENDUM 2026-09-23 — OA-31 (the easing label) → KF.W13U `.e` sharpened
- **Owner, verbatim**: *"The easing should not say "slow start and end" inline like that in the displayed label--and the curve preview should be in the dropdown and the label, too. Mark."* → **OA-31**: the trigger shows curve + name only (no inline description); the curve preview in the trigger and in every dropdown row. Written into KF-W13.md's KF.W13U addendum (second) so the `.e` seat reads it at dispatch; if `.e` has already sat, the close/check reads the sharpened gate and a repair cures it.

## §0bh ADDENDUM 2026-09-23 — OA-32 (living dock icons) → KF.W13U `.d`
- **Owner, verbatim**: *"And mark that the small dock icons for the chosen animations should animate in a small way, reflective of the ACTUAL animation thereof (and the stacking, too) whilst being bounded and small. Mark."* → **OA-32**: each scene's dock icon animates as a bounded miniature DERIVED from that scene's real animation data through the keyframes.js library (never a look-alike loop), with its layer stacking, PRM-static. Written into KF-W13.md's KF.W13U addendum (third) so `.d` reads it at dispatch; the OA-30 audit's findings on the scenes feed the same unit.

## §0bi ADDENDUM 2026-09-23 — OA-33 (keyframes dock: one mbabb control with a dropdown) → KF.W13U `.d`
- **Owner, verbatim**: *"mark that this should likely be one icon in the dock, just the mbabb logo, and then have a dropdown like before--it takes up too much space"* (frame banked `keyframes/evidence/W13U/owner-2026-09-23-dock-mbabb.png`) → **OA-33**: Share · Keyboard shortcuts · theme collapse into the mbabb logo trigger + dropdown on glass primitives (the `MbabbMenu` family), all three actions intact. Written into KF.W13U's fourth addendum for `.d`.

## §0bj ADDENDUM 2026-09-23 — OA-34 (keyframes card shadows clipped on the left) → KF.W13U `.e`
- **Owner, verbatim**: *"and the shadows on the left clip and are not displayed properly"* (frame `keyframes/evidence/W13U/owner-2026-09-23-shadow-clip.png`: the controls card's shadow cut by a hard left edge, bottom-left corner squared) → **OA-34**: cure the clipping ancestor at its owner, sweep every card, both themes. Written into KF.W13U's fifth addendum for `.e` (the same controls pane as OA-28/OA-31).

## §0bk ADDENDUM 2026-09-23 — X-W6 CLOSED; X-W7's NINE ESCALATIONS ARE ONE CLASS (the cure sits outside the unit's writable set) → RULED AS GRANTS TO SIX SUPPLEMENT UNITS; G3 + G14 PRODUCER-OWNED (O-57 + the glass-8 dismiss axis)

- **X-W6 CLOSED** (honest-RED: b1 `B1-G3D` → X-W11 · g1 → X-W10 · i3 `I3-SEED-SIZE` → glass O-53). `.s2` `4233e83e` (e1 read above raster noise), `.j2` `c121324a`, `.a3` `b1c5ff34` (the cross-drag defect was real: pointer capture lost when the keyed handle node moved on a leftward crossing; capture moved to the rail, release-x falsifier added), `.f3` `c0c1f575` (o23 tsc: `as never` casts removed at the root).
- **X-W7** (units a–g landed partial; 2 repairs; check NOT-CONFORMANT, 1 HIGH + 3 MEDIUM, all "outside §4"). Every escalation is a bounds question, not a design dispute. **RULED — GRANTS**, six serial Opus units:
  1. **`.d2`** (ESC-W7d-INSPECTOR, G13, ESC-W7b-HOST, ESC-W7e-AP6, ESC-W7c-O10D): grant `demo/color-session/keys.ts` (extend X-W4's `SceneActionScene`/`SceneActionToken` unions IN PLACE with the scenes that carry a selected-entity inspector — never a parallel type) · `demo/shell/usePaneRouter.ts` (the action-set builder only) · `demo/shell/dock/layers/ActionBarLayer.vue` · `useBrowsePalettes.ts` · `useDialogBrowseActions.ts` · a new inspector component under the owning scene's dir · `BrowsePane.vue` · `PalettesPane.vue` · `ExtractWorkbench.vue` (the PaletteCard import + `editable-name` prop only) · `e2e/smoke/**/o10d-display-voice-census.spec.ts` (rename via the menu's Rename item) · the PaletteCard battery under `demo/test/**` (re-pointed to `PaletteSpecimen`). Acts: build the inspector on the typed set; migrate the three remaining PaletteCard consumers; DELETE `PaletteCard.vue` (S-5); render `usePaletteExport`'s `failure` in the host (card feedback rail or inspector) with a mounted test; the six mutation rows (rename, tag, publish/unpublish, fork, vote, delete) surface failures visibly (no `console.warn` swallow) with six browser rows. Gates G7, G13 GREEN ×2; `vue-tsc` demo 0.
  2. **`.f2`** (ESC-W7f-SITES, ESC-W7f-DEADAPI, ESC-W7f-MSS16): grant the 26 named display sites (ColorInput, ExtractWorkbench A10/A11, ImageEyedropper, CurrentPaletteEditor, MixResultDisplay, AdminNamesPanel, PaletteCardSwatches, SwatchHoverMenu, GenerateControls, ColorPicker.vue's model write-back) for the ONE change — `formatCssCaption` / `formatColor`; delete `toCSSColorString(_digits)` (`color-model.ts:63`) and the two `DIGITS` constants (`useColorPipeline.ts:28`, `useSliderGradients.ts:14`) with their callers moved; the `.swatch-row` recipe once in `demo/styles/utils.css:177-179`. Gate G16 GREEN (29/29 sites, 0 dead APIs) ×2.
  3. **`.g2`** (ESC-W7g-G19-BOUNDS, -ORACLE, -PANEPLATE, -R14-GLOB): grant `PaletteCardGrid.vue:25` (drop the dead `:eyebrow` forward) · `MixSourceSelector.vue:272` (the empty-state line on the plate's real slot, not a stray attribute) · `demo/shell/PaneErrorPlate.vue` (the drifted error-plate set, one copy) · `crash-battery.spec.ts:60` + `browse-pagination.spec.ts:62` (re-point the asserted strings to the new copy, same property) · crash-battery R14's route glob (narrow it so it no longer blocks Vite's module requests). `EasingSpecimenStrip`'s `.family-eyebrow` is a family label, not the retired eyebrow pattern — G19's grep excludes it by name, recorded. Gate G19 GREEN ×2.
  4. **`.g3`** (XP-EXTRACT remainder): EC-9, EC-10, EC-25, EY-12, EY-23, §R3.2 `ImageDropZone`, the camera cluster, and crash-battery R18's valid leg (the `InvalidStateError` on quantize cured at its cause). Grant: the extract workbench's files and their tests. Gates: each row's own falsifier ×2.
  5. **`.c2`** (ESC-W7c-CI): grant `.github/workflows/ci.yml` — `npx playwright install --with-deps chromium` before the unit job's `npm test`. Gate: the CI unit job passes on the pushed branch (read the run by `gh`).
  6. **`.a2`** (ESC-W7a-G3, in-house half): grant the 25 out-of-bounds files for the INERT-PROP class only (`variant` 37 · `tag` 13 · `surface` 12 and their kin — props a component does not declare, bound as if it did); fallthrough attributes on glass components are NOT touched. G3 then reads honest-RED by id **`G3-FALLTHROUGH-TYPES`** (owner glass, relay **O-57** R-1) with the residual count pasted; `strictTemplates` flips on the day glass types its fallthrough.
- **Confirmed**: ESC-W7e-DISMISS-AXIS — the glass-7 spelling (`:show-close="false"` + a destructive `Button` commit) is correct; G14's `dismiss="deliberate"` grep clause is honest-RED until the glass-8 repin (already rowed). ESC-W7c-G11 (visual goldens for PaletteCard rest/hover) routes to **X-W10**'s visual canon, retargeted to `PaletteSpecimen` since `.d2` deletes PaletteCard. The cold-first seat flake stays a watch (M-5 X-W1 readiness). O-57 R-2 carries `.cartoon-cast`.
- **Order**: X-W7 [`.d2`] → [`.f2`] → [`.g2`] → [`.g3`] → [`.c2`] → [`.a2`] → close → check; then **X-W12** (the owner dockets) → X-W8 → X-W10 → X-W11. Every seat Opus 5.5.

## §0bl ADDENDUM 2026-09-23 — OA-35..OA-38: the keyframes UI is cluttered and one-off; a FULL UI AUDIT of every page (all three apps); one scene idiom; glass shapes to the root; parse-that tasked again

- **Owner, verbatim** (frame `keyframes/evidence/W13U/owner-2026-09-23-easing-page.png`, the Spring scene): *"this entire UI is god awful, not glass-ui idiomatic, cluttered, and too rounded in some pills. A full UI audit of every page should be done, too. The smooth and bouncy pills, for example are too rounded and should be more card like--mark this and route all glass-ui changes, too to the glass-ui session and agent thereof, to be fixed at the root. And for example, why does this page have an inline keyframes editior and NOT properly leverage our idiom of the cube, amiga, etc of having the keyframes pane separate--ensure that we have cohesion between all animation views, too, and NO one-off instances such as this."* and *"Keep task on the other processes, too, like value.js, value.js, and parse-that."*
- Rows: **OA-35** multi-line preset pills too rounded → card-like, at the glass root (sent live to `glass-ui-9d` as **O-58**, msg `77167575`) · **OA-36** a full UI audit of every page · **OA-37** one idiom for every animation scene (the Spring inline keyframes editor is a one-off; the keyframes pane is separate everywhere) · **OA-38** keep value.js and parse-that tasked.
- **OA-36 → the `ui-audit` workflow** (read-only, Opus): every page/route/state of value.js, keyframes.js and fourier-analysis on the served dev pages, headed; per page: hierarchy, clutter, spacing, glass idiom (primitive vs hand-rolled), radius register, states; registers `docs/tranches/X/audit/UI-AUDIT-{value,keyframes,fourier}.md` (`UIA-{V,KF,F}-n`); glass-level rows batched into ONE letter to glass BK + a live message. Launches at the next free workflow slot.
- **OA-37 + OA-35 + both keyframes registers → KF.W13V** (KF-W13.md addendum): `.s` one scene idiom → `.p` tile shapes → `.k` the KFA register → `.u` the UIA-KF register. value.js's UIA-V rows fold into X-W12 (or a supplement after it); fourier's UIA-F rows into an F.W14.
- **OA-38 → X.P.W5 minted** (`parse-that/waves/W5.md`): merge parse-that's CSS surface onto master, cure/row the 44 equivalence mismatches, add `color-mix()`/`light-dark()`, publish, and move value.js onto the seam (hand grammar deleted) — RC-P re-evaluated. Track D relaunches at the next free slot. value.js (Track A) is running (`wf_a55bbec5-8c9`: X-W7 supplements → X-W12 → X-W8 → X-W10 → X-W11).

## §0bm ADDENDUM 2026-09-23 — F.W13 LANDED (OA-13..17 cured; DOCK-SCROLL-MORPH honest-RED) — its three bounds escalations are ONE grant, unit `.e`; the UI AUDIT launched

- F.W13 `.a` (CONTENTS became a real glass Collapsible disclosure — it had been a scroll-to-top in the disclosure seat; the history control a true 40×40 circle; cards on `--radius-card`) · `.b` (the Decomposition reset had drifted to N=50 vs the default 200; replace-image was keyboard-unreachable; seven hand-rolled controls → 0) · `.c` (one drop affordance, no sidebar until an image) · `.d` (`DOCK-SCROLL-MORPH` honest-RED, O-55). Check NOT-CONFORMANT on one HIGH: existing specs + one golden still pin the retired chrome.
- **RULED**: ESC-F13a-1/b-1/c-1 → one grant, **F.W13.e** (F-W13.md addendum): three spec re-points + the one golden re-baseline, assertions unchanged, remaining REDs = the measured baseline set. Track C relaunches for `.e` at the next free slot (queue: C `.e` → Track D X.P.W5).
- **The UI audit (OA-36) launched** as `wf_64896923-d72`.

## §0bn ADDENDUM 2026-09-23 — THE ANIMATION AUDIT LANDED (OA-30): 228 confirmed rows over 36 surfaces (17 BROKEN · 48 HIGH · 72 MEDIUM · 91 LOW) → KF.W13V `.k`; 33 glass-touching rows → O-60; ONE value.js CSS-spec bug (KFA-14)

- Register `keyframes/audit/KF-ANIMATION-AUDIT.md` (`728f82c6`); 0 surfaces dropped; every capture headed real-GPU. The frames (8.4 GB, 25k images) stay on disk, uncommitted, excluded locally via `.git/info/exclude` so no seat can sweep them into history; capture scripts + logs are committed. Archive location is an owner item.
- **Root causes the owner saw**: "the cube doesn't animate" = KFA-1/-2 (the drag layer never renders — `isStarted`/`isPlaying` never set; two writers on `.cube` alternate frames); "the Amiga does not layer and compose" = KFA-18 (the store default `ease-in-out` overwrites every authored Amiga curve on mount) + KFA-181 (Y drifts out of phase — the engine drops each loop's overshoot, `frame.ts:130-134`); "the timeline is always greyed out" = **KFA-14: value.js `src/css/grammar.ts:221-227` rejects legacy `rgba(r, g, b, a)`**, so a Snapshot-built timeline never builds; "the scene transitions are broken" = KFA-12 (`startViewTransition` called without its `document` receiver → Illegal invocation → hard cut); the transport Play = KFA-13 (the hover-expand moves Play 58–77 px under the press).
- **KFA-14 is a CSS Color 4 conformance bug in value.js** (legacy comma syntax is normative). RULED: fixed in value.js's CURRENT grammar now (it ships in the next value.js release and keyframes consumes it at its bump) AND carried as a required case in X.P.W5 `.c`'s seam grammar. Routed to X-W12 as unit **`.l`** (Opus; writable `src/css/grammar.ts` + `test/**`; legacy `rgb()/rgba()/hsl()/hsla()` comma forms per CSS Color 4 §5.1/§6.1, WPT-derived cases, `npm test` GREEN). KF.W13U's timeline unit may meet it and ESCALATE — that is expected; the cure lands through value.js.
- **The 33 glass-touching rows → O-60** (mirror in glass BK; message to `glass-ui-9d`), dock-morph cluster first. The consumer halves ride KF.W13V `.k`.
- **Critic gaps** (matrix-editor tweens, toasts, tooltips, the tab-panel slide, the scene × verb transport matrix, dark-mode legs, mobile Drawer): added to KF.W13V `.k` as capture-and-judge obligations, same instrument.

## §0bo ADDENDUM 2026-09-23 — glass BL's acknowledgment (I-41): every relayed row is re-measured at glass 10.0.1; the dock is one design family
- glass `bf517b61` banks O-57 and O-60 beside O-53..O-56, O-58. BL re-measures every row at glass HEAD before ruling; rows cured between 7.0.0 and 10.0.1 come back ANSWERED with their version. The dock-morph cluster (KFA-7/8/13/50–53/109–112/189/221/222) + O-55 + O-56 G-1/G-2 is ONE family in BL's dock design loop.
- **Consequence for our plan, carried to the owner report**: value.js and keyframes.js sit on glass 7.0.0; a part of what the owner sees may already be cured upstream. When BL's reply names versions, the orchestrator mints ONE glass repin wave per consumer (value.js after X-W12, keyframes before KF.W13V's `.k` if the reply lands first) rather than curing glass-owned rows locally. Until then the honest-RED ids stand.

## §0bp ADDENDUM 2026-09-23 — F.W13 CLOSED (CONFORMANT-HONEST-RED: `DOCK-SCROLL-MORPH`, glass O-55); errata-beside; Track D launched for X.P.W5
- F.W13 `.e` (fourier `f58ef8c`/`429a561`/`216ffbd`, pushed) re-pointed the three specs and re-baselined the one golden after reading its diff; check CONFORMANT-HONEST-RED.
- **Erratum-beside (E-3) to F-W13.md's §0bm addendum**: the baseline-RED list also carries `gallery-admin-a11y` :91 :103 :114 :125 (RED at `3e709e4`; F.W4's honest-RED `G-F4-ADMIN-AXE`). The full-suite 30 s timeouts under load averages 120–250 are the `G-F12-3-LOAD` instrument family (each GREEN ×2 at `--workers=2`).
- Fourier residuals for the next X·F wave (with the UI audit's UIA-F rows): the desktop ToC's lost scroll-to-top, `.sidebar-link` radius, `.c` r1–r4, and the unstaged J-audit PNG rewrites.
- Track D launched for **X.P.W5** (parse-that CSS seam).

## §0bq ADDENDUM 2026-09-23 — OA-39 (keyframes mobile landing not centred) → KF.W13V `.s`
- **Owner, verbatim**: *"Mobile ladning page is not centred properly"* (frame `keyframes/evidence/W13U/owner-2026-09-23-mobile-landing.png`): the idle cube sits ≈65 % down and overlaps the left-aligned headline. → **OA-39**, written into KF.W13V's fourth addendum under `.s` (the scene-shell unit) with centring and non-overlap gates at 390/360 px, both themes. The running UI audit covers the same page; its UIA-KF row, if any, is the same defect.

## §0br ADDENDUM 2026-09-23 — KF.W13U LANDED ITS CORE (the cube, every scene, the timeline, the easing label, the shadow clip); the rest RULED as five grant units; three producer rows → O-61
- Landed and read on the SERVED page (headed, real GPU, dev + gh-pages ×2): `.w` kf `d78bed01` — the cube's three channels each wrote a whole `transform` on ONE element, so only the hover bob survived (the group keeps one writer per property); cure = nested targets `.cube-bob > .cube-pose > .cube`, and the scene auto-plays · `.t` kf `3c8199c5` — the ribbon disabled the rail until `animation.started`, which is false on every scene until Play; the scrub path never needed it · `.e` kf `cd2cd88f`/`57b4815c` — the trigger shows glyph + name through glass `SelectValue`'s slot, description moved to `SelectItem`'s description slot; the card shadows are no longer cut (the inset moved into the scroller).
- **RULED** (KF-W13.md sixth addendum): `.t2` retire `isAnimStarted` · `.d2` the living dock icons (OA-32) with the descriptor as the one binding · `.d3` the scene-switch dock/pane flicker (`App.vue:266-276`: don't feed the machine an empty surface set while pending) · `.d4` Share row keyboard (the theme row is producer, `DARK-MENU-ITEM`) · `.x` the kf e2e close clause (oracle re-seat + usability/S4/S5/M1) under a recorded load-average instrument condition.
- **Host load**: 575–707 load average was measured during this wave. From here, every e2e gate records the load beside its run and reads at `--workers=1`.
- **O-61** filed (mirror + live message): `GLASS-SURFACE-PAINT-CONTAIN`, `KF-TIMELINE-FILL`, `DARK-MENU-ITEM`.
- Track B relaunches for the KF.W13U supplement; KF.W13V follows in the same run once KF.W13U closes (and needs the UIA-KF register).

## §0bs ADDENDUM 2026-09-23 — OA-40/OA-41; THE GLASS REPIN IS PULLED FORWARD: keyframes.js (7.0.0) and value.js (^7.0.0) → glass-ui 10.0.1 NOW (KF.W13R, X-W7R), ahead of the audit-fix waves
- **Owner, verbatim** (frame `keyframes/evidence/W13U/owner-2026-09-23-mobile-controls.png`): *"the mobile controls panels are offset and unreadbale--the dock transitions and animations from small to large are blurry, slow, and jittery--not smooth and ios 27 loke"* → **OA-40** (phone controls drawer: uneven inset, the transport pill over the controls, the top dock wrapping) → KF.W13V `.s`; **OA-41** (dock small↔large morph blurry/slow/jittery, all apps) → the repin waves' `.d`.
- **Measured**: glass HEAD's dock morph has already changed (`morph.css:69-76`: authored blur `blur(0px)`; a JS blur channel remains). The consumers run 7.0.0, where the blur holds through the settle (KFA-53). npm `latest` = **10.0.1**.
- **RULED**: the repin is no longer deferred to BL's reply. **KF.W13R** (after KF.W13U, before KF.W13V) and **X-W7R** (after X-W7, before X-W12) migrate each consumer to glass 10.0.1 at the root (no shims), then re-read every glass-owned row on the served page as CURED-BY-REPIN or still-live. BL's later cut is a second, smaller repin when it lands. fourier (`^8`) is not in this ruling; its repin rides the next X·F wave with the UIA-F rows.
- Running workflows loaded their stage lists before this ruling: KF.W13V's and X-W12's specs now name the repin as their precondition, so an open seat that reaches them first returns BLOCKED; the next relaunch runs the repins in order.

## §0bt ADDENDUM 2026-09-23 — X-W7's third round: the grant loop ENDS (whole-directory grant for the last round + the ADJACENT-LINE RULE in every chassis)
- Landed this round: `.d2` (PaletteInspector on the extended typed `SceneActionSet`; the six mutation rows return typed verdicts shown on the inspector rail, 0 `console.warn`; G7 + G13 GREEN ×2; the oracle caught a real focus-return defect that closed the tag popover — cured) · `.f2` (29/29 display sites on the caption register, dead precision APIs deleted, `.swatch-row` once; G16 GREEN ×2) · `.a2` (G3 312 residual = glass fallthrough; `G3-FALLTHROUGH-TYPES` honest-RED) · `.g2`/`.g3`/`.c2` partial.
- **Diagnosis of the loop**: three rounds of line-exact grants, and each cure needed one adjacent line more (a dead barrel re-export, a twin call site, an oracle string, an eslint ignore). That is the orchestrator's grant shape failing, not the seats.
- **RULED — the ADJACENT-LINE RULE** is added to the LAW of all four chassis: a unit makes the minimal same-repo, same-concern edit its cure strictly requires, in the same commit, and lists it in its receipt as an adjacent edit, instead of escalating. It never reaches glass-ui or sibling repos, pins, another concern, test/assertion deletion, or a co-grouped unit's paths.
- **RULED — X-W7 round 3**, writable = `demo/**` · `e2e/**` · `eslint.config.*` · `.github/workflows/ci.yml` · the record, three serial Opus units:
  1. **`.z1`**: delete `PaletteCard.vue` + `card/index.ts:4` + `browser/index.ts:18-19` in one commit (S-5, ESC-W7d2-BARREL); `useVersionHistory.ts:52,:73` warns → typed verdicts on the rail; ESC-W7g2-G19-PROSE — rename the prose/comments that still say "eyebrow" for the family label to "family label" (DESIGN.md:37, EasingSpecimenStrip.vue:5,138, easingCatalogue.ts:81, GradientCodeEditor.vue:102, ParseEchoReadout.vue:15) so G19's grep reads 0 without widening the exclusion; ESC-W7g2-BROWSEPANE-COPY — OM-15 rows 15/17 copy in `BrowsePane.vue` and the two oracles re-pointed to it; crash-battery R14's recovery leg (`:103`) cured at its cause. Gates: S-5 file absent + vue-tsc 0; G19 0 ×2; R14 GREEN ×2.
  2. **`.z2`**: EC-10 with its twin (`GenerateControls.vue:74-79`, the cure lock); R-15 `--ink-muted` at `:root` + one `.plate-ink` recipe in `demo/styles/` replacing the five scoped twins (incl. `EmptyState.vue:102`, `ErrorBoundary.vue:84`); ESC-W7a2-INBOUNDS — the 31 in-bounds inert-prop sites (same deletion ruling as `.a2`). Gates: each falsifier ×2; the strict probe's residual = glass fallthrough only.
  3. **`.z3`**: ESC-W7c2-LINT — `eslint.config.*` ignores `docs/**` (documentation and banked tooling, not product code; `docs/tranches/C/**` and `docs/precepts/**` are already ignored); `npm run lint` exit 0 locally; push; the CI producer job GREEN on the pushed branch read with `gh run`.
- Honest-RED at close: `G3-FALLTHROUGH-TYPES` (O-57), G11 goldens (→ X-W10), G14 dismiss grep (discharged at X-W7R). The vitest hook timeouts under load stay the X-W1 readiness watch.
- Order on relaunch: X-W7 [`.z1`] → [`.z2`] → [`.z3`] → close/check → **X-W7R** (glass 10.0.1) → X-W12 → X-W8 → X-W10 → X-W11.

## §0bu ADDENDUM 2026-09-23 — OA-42 (fourier admin audit-log table malformed) → F.W14 MINTED (repin to glass 10.0.1 + the admin table + the UIA-F register + F.W13's residuals)
- **Owner, verbatim**: *"these UI elements are malformed in fourier, mark"* (frame `fourier/evidence/W14/owner-2026-09-23-malformed.png`: action badges of fixed width overflowed by long names, a wrapping timestamp column, doubled row rules) → **OA-42**.
- **F.W14** (`fourier/waves/F-W14.md`): `.m` glass `^8` → 10.0.1 (§0bs pattern) → `.t` OA-42 with overflow/one-line/one-rule gates → `.u` every UIA-F row → `.r` F.W13's residuals. Opens once the UI audit's fourier register lands; Track C launches at the next free slot.

## §0bv ADDENDUM 2026-09-23 — OA-43 (fourier sidebars and controls look greyed out) → F.W14 `.g`
- **Owner, verbatim**: *"mark, too, why is the controls items, these sidebars and elements, so gray and grayed out?"* (frame `fourier/evidence/W14/owner-2026-09-23-grayed.png`) → **OA-43**, F.W14 unit `.g` (cause at the bytes; opacity/filter/inert/surface-token gates in both themes; glass-owned tone → BL).

## §0bw ADDENDUM 2026-09-23 — OA-44 (fourier visualizations blurry) · OA-45 (control hierarchy/spacing needs total reconfiguration, every page) → F.W14 `.p` + `.h`
- **Owner, verbatim**: *"The epicycles and viz areas are very vlurry and not high res; and the design hireachy and spacing of these elements and sliders, likely on every page, too, is not optimal and needs total reconfiguration"* (frames `fourier/evidence/W14/owner-2026-09-23-{blurry,hierarchy}.png`) → **OA-44** device-pixel-ratio-correct canvases everywhere (`.p`); **OA-45** one control-row idiom + page hierarchy across every fourier page (`.h`, design seat, effort high; missing primitive → BL). The same control-row question for value.js and keyframes rides X-W12 `.d` and KF.W13V `.u` via the UI audit's registers.

## §0bx ADDENDUM 2026-09-23 — X.P.W5: parse-that's CSS surface merged, equivalence 0 defects, `color-mix()` to WPT; 2.0.0 released but UNPUBLISHED (npm token E401 = OWNER ACT); rulings F-W5c-1 (spec), F-W5d-1 (b), ESC-c1 granted, full Color 4/5 coverage ordered
- Landed and pushed in parse-that: `4eac70c1` (merge), `902172d` (the 152 "mismatches" were already-ruled cells the harness ignored → 0), `ec18f4b` (`color-mix()`, legacy comma forms), `488523c` (2.0.0 release commit).
- **OWNER ACT (the only blocker on publishing)**: `npm whoami` → E401 on this host. The owner runs `npm login`; the resumed `.d` then builds, publishes and tags.
- Rulings (W5.md addendum): F-W5c-1 → the spec (legacy syntax refuses `none`); F-W5d-1 → (b) dependency closure (RELEASE-CONDITION §2.4 addendum); ESC-c1 → `.f`; SC-1 `calc()` in channels, SC-2 `display-p3-linear`, R-c-2 `light-dark()` via the existing context path, R-b-2 `var()` in `animation` → `.g`; perf → `PT-PERF-LOAD` (quiesced read by the orchestrator).
- Track D relaunched.

## §0by ADDENDUM 2026-09-23 — OWNER RULING: the CSS grammar lives in value.js, authored in BBNF on parse-that ("No custom grammar, unless it's BBNF"); X.P.W5 STOPPED → X.P.W6; OA-46: scene editors are DOCK ITEMS, never inline

- **The owner asked** whether the parser is hand-rolled or parse-that-idiomatic and why it lives in parse-that. Measured and reported: value.js ships a hand-rolled parser (`src/css/grammar.ts`); the X·P parser in parse-that is written against a custom 22-operation algebra (AC-1) lowered to parse-that combinators and to Wasm — not parse-that's API; no owner ruling had moved the grammar's home into parse-that (D-23 said BBNF mirrored 1:1 into parse-that combinators, parse-that consumed as a published dependency). **The owner ruled, verbatim: "What you recommend. No custom grammar, unless it's BBNF."**
- **Executed**: Track D (`wf_1e3f97ee-6c7`) STOPPED before any publish (npm E401 also held it). **X.P.W6** minted (`parse-that/waves/W6.md`): `.r` parse-that returns to a library (one ordinary commit removes the CSS surface; evidence moved first; library fixes stay) → `.b` value.js's BBNF grammar with full CSS Color 4/5 coverage → `.h` equivalence vs the shipping parser, 0 mirror-defects → `.x` the swap, hand parser deleted, bench recorded. RC-P re-read (Wasm conjunct retires). X-W12 `.l` retired into X.P.W6 `.b`.
- **OA-46 (owner, verbatim)**: *"the UI for the sequcne, easing, etc is still not right--we should have dock items for keyframes, timeline, etc--NOT inline keyframes like that, etc."* → KF.W13V `.s` sharpened: every scene's editors (Keyframes, Timeline, Controls, editor facets) are dock items opening shared panes; 0 inline editors in any scene.

## §0bz ADDENDUM 2026-09-23 — OA-47 (controls-pane rows: label + control on one line, divider above easing) · OA-48 (dock transitions still blurry) · OA-49 (Easing/Sequence/Spring UIs too rounded, not keyframes-idiomatic)
- **Owner, verbatim** in KF-W13.md's addendum (frame `keyframes/evidence/W13U/owner-2026-09-23-controls-space.png`). Routed: **OA-47** → KF.W13V `.c` (one control-row idiom in the Controls pane, divider above the easing group); **OA-48** → KF.W13R `.d` / X-W7R `.d` at glass 10.0.1, BL's dock family; **OA-49** → KF.W13V `.y` (design-author redesign of Easing, Sequence, Spring on the Cube/Amiga idiom and glass's radius canon). KF.W13V order `.s` → `.c` → `.y` → `.p` → `.k` → `.u`.

## §0ca ADDENDUM 2026-09-23 — the full UI audit landed (OA-37) · the image-history rewrite · the critic's gaps routed · Track C launched
- **The audit landed.** Run `wf_64896923-d72` audited 97 pages across the three apps. The registers are `audit/UI-AUDIT-{value,keyframes,fourier}.md`. The 290 glass rows went to glass as O-59 (`relay/X-ALL-BK-UI-AUDIT.md`).

  | app | rows | BROKEN | HIGH | MEDIUM | LOW |
  |---|---|---|---|---|---|
  | value.js | 676 | 54 | 131 | 275 | 216 |
  | keyframes | 322 | 43 | 57 | 121 | 101 |
  | fourier | 256 | 51 | 70 | 93 | 42 |

- **The history was rewritten before any push.** The audit's commit seat force-added 7,150 frames (3.6 GB) in `1288e433`, which was never pushed. It was rebuilt without them as `372b4d41`, and Track A's CI commit was replayed on top as `464ff743`. The original is kept at `refs/backup/ui-audit-with-images-2026-09-23`. The frames stay on disk, and `.git/info/exclude` covers them. **Owner/operator item:** choose an archive home for these frames and the animation audit's 8.4 GB. Until then, the backup ref is what keeps the local pack at 3.66 GiB.
- **The audit's `dropped` list is a bookkeeping error.** It lists all 97 pages, but the registers show that none went unaudited.
- **The critic's coverage gaps are routed.** value goes to X-W12, keyframes to KF.W13V `.u`, and fourier to F.W14 `.u`. Each spec has a dated addendum.
- **Track C was launched** as `wf_c7aa48ac-f02` for F.W14, now that its precondition register exists.

## §0cb ADDENDUM 2026-09-23 — glass BL round-2 interim facts (glass master `9831f0e4`, R2-02/R2-03)
- Glass sent measurements only. Its rulings and landing versions come later in one outbound reply.
- **Glass-side (producer, relay only):**
  - G-1: DockCrossfade resizes the box in one frame, and the first expand starts from a stale endpoint.
  - G-2 glass half: the dock's content-box background-clip applies to every filled capsule inside it.
  - G-3: the matte blob look.
  - O-58: tiles use `--radius-pill`.
  - O-60: 13 rows still live.
- **Consumer halves, verified here and routed:**
  - G-2: 13 dead Button `variant` bindings in 7 files, against the installed 7.0.0's `emphasis`/`tone`. Routed to X-W12.
  - G-3: HeroBlob parks on a wall clock. Routed to X-W12.
  - G-4: the black ground is value.js's to bisect, because glass measures maroon. Routed to X-W12.
  - KFA-61, 95, 134, 136 and 228 are keyframes-side. Routed to KF.W13V `.u`.
  - Each has a dated spec addendum.
- **R-5: pinning 10.0.1 cures no docket row, and the likely landing is glass 11.0.0.** The 10.0.1 repins (X-W7R, KF.W13R, F.W14 `.m`) still stand, because each retires stale pin surface and shrinks the landing repin. They are not credited as curing any glass row. A landing repin wave for all three apps is minted when BL's reply names the version. fourier's `^8` moves explicitly, never by range drift.

## §0cc ADDENDUM 2026-09-23 — OA-50: fourier's admin panels
- **Owner, verbatim:** *"ui for the admin panels in fourier is awful, not glass-ui idiomatic, and has very poor spacing and design hierarchy--and is inconsistent."* Then: *"On most admin pages thereof"*.
- Routed to F.W14 `.h`, the design seat, as one admin idiom across every admin page. `.h` also re-reads what `.t` landed. `F-W14.md` has the addendum with the frame's defects. It was routed to `.h` rather than `.t` because `.t` was already in flight when the frame arrived.

## §0cd ADDENDUM 2026-09-23 — KF.W13U: the two unrelieved reds ruled; `.d5` minted
- Track B's run `wf_82af6dba-aba` ended with KF.W13U NOT-CONFORMANT after 2 repairs. The check's two HIGH defects are ruled in KF-W13.md's KF.W13U seventh addendum:
  - **C6-1 is relieved.** QUIET-FOCUS-RING and DRAWER-DETENT-REACH are honest-RED ids owned by KF.W13R. Glass 7.0.0 is the cause, and 10.0.1 carries the ring cure and the Sheet. `.m` migrates and `.v` re-reads on the served page. The relief is dated before the re-close, so the routing is no longer circular.
  - **C6-2 is granted.** `KF.W13U.d5` holds every scene-derived dock and pane read, the Scene label included, to one commit point at resolve, and adds warm-on-intent. App.vue and ChromeDock.vue are granted as whole files, with the ADJACENT-LINE RULE.
- Track B resumes from `wf_82af6dba-aba`. The closed waves' open seats replay from cache.

## §0ce ADDENDUM 2026-09-23 — OA-51: a total redesign of the keyframes scene editor UIs
- **Owner, verbatim:** *"this UI is awful. And we need the separate keyframes input, controls, etc. Total redesign of these sort of UIs"* (frame: the Spring scene).
- Routed to KF.W13V, where `.s` and `.y` become one total redesign across all six scenes:
  - Keyframes, Controls, the scene facet and Timeline are separate dock items opening shared panes.
  - There is one control idiom.
  - Presets are glass tiles.
  - The design note comes first.
- The addendum is in KF-W13.md. KF.W13V opens after KF.W13R, and its open seat reads the spec whole.

## §0cf ADDENDUM 2026-09-23 — OA-52: the grey docks = GLASS-VEIL-GREY (O-62)
- **Owner, verbatim:** *"why are our docks grayed out, too"* (fourier frame).
- **Measured cause.** Glass 10.x's light-theme veil is a dark ink, `oklch(0.28 0.035 70)`, at alpha 0.1 to 0.18. Over paper it composites to grey. fourier, at 10.0.1, reads grey. value.js, at 7.0.0, reads a light cream frost at alpha 0.328. This is a producer regression and the same mechanism as OA-43.
- **Relayed as O-62** (`relay/X-ALL-BK-GLASS-VEIL-GREY.md`, mirrored into BK/coordination), and sent live.
- **Routing:**
  - honest-RED **GLASS-VEIL-GREY** on F.W14.
  - X-W7R and KF.W13R measure the plate before and after their 10.0.1 repins, and record the id if the plate turns grey.
  - No local override anywhere.
  - The repins proceed, because of the ring, the Sheet and the stale pin surface.

## §0cg ADDENDUM 2026-09-23 — X.P.W6 CLOSED (CONFORMANT-HONEST-RED); X.P.W6R minted; BBNF-TS-TOOLCHAIN to the owner
- **X.P.W6 closed** in Track D run `wf_41f62d34-81d`. value.js parses CSS only through BBNF: five modules under `src/css/grammar/`, compiled by `@mkbabb/bbnf-lang` 0.1.4 onto parse-that 0.8.2. `grammar.ts` is deleted with no shim. MIRROR-DEFECTS reads 0 twice, and `npm test` reads 908/910. The two failures are the foreign F-W6-open-4 pair. parse-that is a general library again (`92d8ea7`).
- **Honest-RED:** PT-PERF-LOAD, and RES-x-1 (BBNF runs 1.11–2.79× slower than the retired hand parser). Both are under OC-1, an owner item.
- **Ruled:**
  - LW-1, `.x`'s edits to `stylesheet.bbnf` and `value.bbnf`, is ratified under the ADJACENT-LINE RULE.
  - The differential leaving CI, RES-x-4, and parse-that's R-r-1/R-r-2 become **X.P.W6R** (`.c`, `.l`, `.p`).
- **To the owner: BBNF-TS-TOOLCHAIN.** The published TypeScript BBNF compiler has no maintained source and sits on parse-that 0.8.2. Its three defects, F-b-1..3, are worked around and documented at value.js's call sites. The owner's "NO workarounds" needs a root, and choosing the toolchain's home is the owner's decision. The id stays honest-RED until then. No live bbnf-lang session exists to relay to.
- **Release:** the BBNF parser reaches keyframes and consumers at value.js's next publish. That publish is walled by npm E401, which is the standing owner act (`npm login`).

## §0ch ADDENDUM 2026-09-23 — OA-53: BBNF parsing faster than baseline; research workflow launched
- **Owner, verbatim:** *"We need to likely uplift and begin fixing both parse-that and bbnf--look into both of those repos and their megatranches thereof in another workflow to get the parsing speed to be FASTER than baseline"*.
- **Baseline:** the retired hand parser (`grammar.ts` at `2155142b`). The bench of record reads BBNF 1.11–2.79× slower (§0cg RES-x-1). OA-53 therefore also answers OC-1's speed half: the target is faster than the baseline, not a recalibrated bar.
- **Run `wf_aabc0842-0cc`** (script copy in `execution/chassis/bbnf-speed-uplift.js`). Stages:
  - Four survey seats: parse-that's megatranche and TS core; bbnf-lang's megatranche and compiler; where the published 0.1.4 toolchain came from; a CPU profile of value.js's BBNF path.
  - Three blind route seats, each with a measured prototype: a TS compiler revived onto parse-that 2.x; an ahead-of-time BBNF→TS codegen; grammar-driven regex fusion, with Wasm as a comparator only.
  - An arbiter that re-measures on numbers, and a completeness critic.
  - An author, who writes `parse-that/waves/W7.md` (X.P.W7, BBNF SPEED UPLIFT) and `evidence/W7-research/BRIEF.md`.
- **Law:** parse-that and bbnf-lang are read-only for this run. Their programs are surveyed, not written. Prototypes live under `evidence/W7-research/`.
- **Cap:** Track D (X.P.W6R) was stopped at `.c` to free the fourth slot. It resumes from `wf_41f62d34-81d` when this run completes, then X.P.W7 follows. The stopped seat's `ci.yml` line is its inherited path.

## §0ci ADDENDUM 2026-09-23 — owner acts discharged; the delegated rulings; OA-54
- **Owner, verbatim:** *"npm login is done, the typescript compiler should be in BBNF-lang--then use your logic to ratify the rest"*. `npm whoami` reads `mkbabb` (verified).
- **R-1, publishing is unwalled. The E401 owner item retires.**
  - parse-that 2.x and the TypeScript `@mkbabb/bbnf-lang` publish inside X.P.W7, where the compiler depends on the published parse-that.
  - value.js publishes at X-W11, after X.P.W7. Consumers never receive the slower parser.
  - Every publish follows `npm whoami`, a clean tree and its package's own release gate.
- **R-2, BBNF-TS-TOOLCHAIN is ruled by the owner. The TypeScript BBNF compiler lives in bbnf-lang** and is the maintained source of `@mkbabb/bbnf-lang`, on parse-that 2.x.
  - bbnf-lang master carries 243 uncommitted paths of its own program (sk-v25). X.P.W7 works only on branch `x-p-w7-typescript`, in its own worktree beside the repo, and never touches master's worktree.
  - At the wave's close the branch merges into master with a merge commit. Master is never rewritten.
  - F-b-1..3 are cured at the compiler's root, and value.js's three call-site workarounds are removed in the same wave. That discharges "NO workarounds".
  - The research run (`wf_aabc0842-0cc`) still picks the route on measured numbers. Whichever route wins, its compiler and emitter live in bbnf-lang.
- **R-3, OC-1's speed bar is the owner's: faster than the retired hand parser on every bench entry.**
  - The instrument is the paired, interleaved, same-process ratio, with load recorded.
  - A ratio is robust to host load, so **PT-PERF-LOAD retires into it**. The quiesced-machine owner act is withdrawn.
- **R-4, the audit frames.** 7,841 images, from the UI audit and the animation audit, are on disk and were verified byte-identical against the backup ref's tree. They stay local, git-excluded, in their evidence dirs, where the registers cite them.
  - The backup ref `refs/backup/ui-audit-with-images-2026-09-23` is retired.
  - **Erratum to §0ca:** the ref pointed at `31d15db7`, the pre-rewrite tip, not at `1288e433`. The verification read that ref's own tree.
  - The branch reflog still reaches the old objects. Routine reflog expiry and gc reclaim them, so no racy reflog surgery is done while seats commit.
- **R-5, the glass repins converge at BL's cut.**
  - **value.js: X-W7R `.m` ESC-W7Rm-1 is ruled as a hold.** Glass 10's veil recut, which is GLASS-VEIL-GREY (O-62), turns value.js's plates into a dark-ink wash, and the certified-ink instrument throws `contrast_unreachable`. value.js stays on glass 7.0.0. The repin and its migration stay banked as the committed patch, and the working tree returns to the committed pin at X-W7R's close.
  - **A landing-repin wave, X-W7L, mints when BL names its version.** It applies the banked patch on top of the veil cure.
  - **X-W12 proceeds on 7.0.0.**
  - **keyframes** keeps its landed 10.0.1, whose gates are green. KF.W13R measures the plates, and GLASS-VEIL-GREY stays honest-RED until the cut.
  - **fourier** keeps 10.0.1 and carries the same id.
- **R-6, the remaining operator items** (certbot, docker/nginx and the `-linux` baselines) belong to the deploy waves X-W10 and X-W11, which hold the deploy authority from the begin-word. They are not owner acts.
- **OA-54 (owner, verbatim):** *"too gray, and the large dropdowns should not be so rounded. Perhaps for these, the large color space dropdowns, it should just be text, too."* Frame: `audit/owner-2026-09-23-colorspace-dropdown.png`, value.js's "Lab" colour-space trigger. Routed to X-W12 as unit `.t`, with the addendum in W12.md.

## §0cj ADDENDUM 2026-09-23 — OA-55: dock buttons clipped on hover and select = DOCK-TRIGGER-CLIP (O-63)
- **Owner, verbatim:** *"buttons in the dock are clipped on hover and select like this."* The frame is value.js's dock Home trigger.
- **Measured on fourier's dock at glass 10.0.1.** The dock row `.dock-layer--full` computes `overflow: auto hidden` with 4 px of block padding. Its horizontal scroll forces a block-axis clip, so any capsule, ring or outline that extends more than 4 px past the 40 px trigger is cut. It is a producer defect in the dock family, and value.js's glass 7.0.0 dock shows the same cut.
- **Relayed as O-63** (`relay/X-ALL-BK-DOCK-TRIGGER-CLIP.md`, mirrored), and sent live.
- **Routing:**
  - honest-RED **DOCK-TRIGGER-CLIP** in X-W12, in KF.W13R `.v` and in F.W14 `.r`.
  - Each re-reads it on the served page at its landing repin, X-W7L for value.js.
  - No local override.

## §0ck ADDENDUM 2026-09-23 — OA-53 research landed; the X.P.W7 route ratified; seven decisions ruled
- **Run `wf_aabc0842-0cc` finished.** Its first pass lost the arbiter, critic and author to a network error. The resume replayed seven seats from cache, and the three reran carrying §0ci.
- **Outputs:** `parse-that/waves/W7.md` (seven units), `evidence/W7-research/BRIEF.md`, and the judge's re-measured harness and results.
- **The judge's generated module and bundles** existed only in `$TMPDIR/value-js-w7-judge`. They are now banked at `evidence/W7-research/judge/banked-tmp/`, 79 files with a sha256 MANIFEST, so no `/tmp` wipe can lose them.
- **The cause of the slowdown, measured.**
  - parse-that's `mapState` calls `Object.create(state)`, making every per-parse state a V8 prototype. That turns the core's inline caches megamorphic.
  - bbnf-lang 0.1.4 interprets the grammar at runtime: 776 closures, 376 `Parser.lazy` trampolines, and 45–70% of calls failing through labelled error bookkeeping.
  - Unreleased parse-that 2.0.0 (commit `90d4ec5`, "NO RELEASE") runs 1.39–1.65× slower than 0.8.2 on this grammar.
- **Ratified route: staged emission ahead of time.**
  - The compiler and emitter from route ts-compiler live in bbnf-lang's revived TypeScript package (§0ci R-2).
  - Delivery follows route aot-codegen's discipline: a checked-in generated module, a sha256 header checked by `bbnf gen --check` in CI, a typed action-kind manifest, and a frozen golden oracle.
  - value.js runs the generated module with no parse-that and no bbnf-lang at runtime.
  - parse-that takes only general core cures: `mapState` becomes `mapSpan`, a silent failure path, a lazy combinator that patches itself on first use, and F-p-EOF.
  - The judge re-measured the exact form (`jx-aot-pos`): below the retired parser in **35 of 35** fresh-process paired cells, worst 0.882. Medians: color .819, scalar .726, value .494, values .502, keyframe .695, timing .790, stylesheet .768.
  - The other arms each failed parseStylesheet.
- **The seven decisions**, ruled under the owner's standing order to finish the plan in totality and the 2026-09-23 delegation ("use your logic to ratify the rest"):
  1. **F-b-4: accept the grammar's sound answer on non-ASCII leading code units.** The 4 corpus rows and 62 reader rows are rowed as spec-correct divergences in DIVERGENCE-LEDGER, in a dated section. A defect is never reproduced to keep a number.
  2. **Positional concatenation semantics** are the single semantic for the emitter and the façade. That matches parse-that 2.x `all()` and gives typed tuples.
  3. **The revived package is `@mkbabb/bbnf-lang` 0.2.0.** That is a 0.x break, and latex-paper's `^0.1.1` is unaffected.
  4. **The Rust `TsEmitter` is left untouched.** It is within bbnf-lang's own program. The TS package's emitter is the TypeScript output of record for value.js, and the package README says so. Superseding or deleting the Rust face is that program's call.
  5. **bbnf-lang git: nothing of the sk-v25 program is published.**
     - Branch `x-p-w7-typescript` is cut from **`origin/master`**, not local master, which is 71 commits ahead with 243 uncommitted paths. Pushing it therefore publishes no program commit.
     - The close merges it through a GitHub pull request (`gh pr merge --merge`), server side. Local master and its worktree are never checked out or touched.
     - Preflight: `git diff origin/master...x-p-w7-typescript --stat` adds only `typescript/**` plus that package's own CI and release files.
  6. **parse-that release content.** `90d4ec5`'s own message forbids release. On the release line, `.p` reverts it with an ordinary revert commit, unless `.p`'s paired gate shows HEAD with the cures at or below 0.8.2 with the cures on every entry. Publish as 2.0.0.
  7. **value.js drops parse-that and bbnf-lang from its runtime.** bbnf-lang becomes a devDependency, and the generated module is checked in. parse-that's program records, U.W7 "packed value.js adoption" and the Tranche T/U value.js rows, get a dated addendum from `.p` in parse-that's docs.
- **Critic gaps folded:** W7.md's §0ck addendum carries them as gates or units. Material ones:
  - an accepted-versus-rejected input split
  - the depth-guard hot-path cost
  - the parse-that Tranche T boundary
- **Order:** Track D resumes X.P.W6R, then X.P.W7. W7 `.p` branches from the parse-that master tip after W6R `.p`, not from `92d8ea7`.

## §0cl ADDENDUM 2026-09-23 — F.W14 ruled; F.W14U minted; fourier's dev MongoDB restored
- **F.W14** (run `wf_c7aa48ac-f02`) ended NOT-CONFORMANT after 2 repairs. Its check raised two HIGH defects:
  - `.u` covered 88 of 256 UIA-F rows.
  - The close e2e and G-p could not be read, because fourier's MongoDB was down.
  - One close seat was also lost to the network (ENOTFOUND).
- **Ruled:**
  - The golden re-baseline is granted as a new unit, `.h2`, in the same class as §0bm.
  - G-p's one-device-pixel miss on a fractional stage becomes `.p2`: one rounding rule at `useCanvasSetup`'s root.
  - **G-u moves whole to the new wave F.W14U.** It covers the 168 owed rows, in family units with disjoint file sets. `api/**` is granted for the server rows.
  - F.W14 closes with the 88 counted and F.W14U cited.
  - The specs are `F-W14.md` addendum (e) and `F-W14U.md`.
- **MongoDB.**
  - fourier's dev `MONGO_URI` is `mongodb://localhost:27017/fourier`, served by Homebrew `mongod` 8.2.9. That `mongod` has refused to start since 2026-09-22 17:12. Its log shows WiredTiger `txn-recover` ENOENT, then "metadata corruption", then a fatal assertion. The data directory, `/opt/homebrew/var/mongodb` (2.3 GB), may hold other projects' data.
  - **It is left untouched.** `mongod --repair` rewrites files in place, which is irreversible.
  - **Owner item:** repair or restore that database, after copying its directory aside.
  - For the dev and e2e gates, a fresh standalone `mongod` now serves :27017 from `~/.mongo-dev/fourier`, which is outside every repo. fourier uses no transactions and Homebrew had no replica set, so standalone matches.
  - The fourier API held a stale replica-set topology from the dead server and was restarted with its own command. `POST /api/sessions` then returned 200.
- Track C resumes: F.W14 (`.h2`, `.p2`, close), then F.W14U.

## §0cm ADDENDUM 2026-09-24 — F.W14 ESC-C2-1 ruled: the e2e suite owns its data and its instruments
- **F.W14 resume 1 landed:**
  - `.h2`: the golden `a8aa0a1` is ratified, and `:164` reads GREEN twice.
  - `.p2`: fourier `2b86203`, one `backingSize()` rule. G-p reads GREEN headed twice at DPR 1 and 2.
  - The close read 14 REDs outside the named set, and all have one of two causes:
    - `f-w14-uia` ×12 needs a saved visualization that a fresh database lacks.
    - vc `:145`'s admin banner differs by 593 px.
    - `f-w14-dpr :228` fails only headless.
- **Ruled:** the new unit `F.W14.s` seeds through the public API, idempotently and namespaced, in Playwright setup. It makes seeded goldens deterministic, re-baselining only a seed-confined diff. It gives the GPU spec a headed Chromium project, per §0be, so it is never skipped. Spec: `F-W14.md` addendum (f).
- The resumed `.p2` seat restarted the fourier API with `scripts/e2e.sh`'s environment: `BLOB_DIR=/tmp/fourier-e2e-blobs` and raised rate limits. That is the lawful e2e instrument.

## §0cn ADDENDUM 2026-09-24 — host reboot recovered; all four tracks redeployed
- **Owner, verbatim:** *"Continue. Redeploy all workflows."* The host rebooted (uptime 7h47m at 09:44), killing all four runs mid-seat and every dev service. The `/private/tmp` scratchpad was wiped too.
- **Where each run stood:**
  - A (`wf_87c7b042-62b`): X-W12 `.a` and `.e` in flight.
  - B (`wf_82af6dba-aba`): KF.W13V `.u` in flight.
  - C (`wf_c7aa48ac-f02`): F.W14 close and check in flight.
  - D (`wf_41f62d34-81d`): X.P.W7 repair 1 in flight.
  - Each resumes from its run id. Completed seats replay from cache, and in-flight seats rerun with crash-recovery of inherited paths.
- **Services restored, with logs in `~/.dev-logs/`:**
  - value.js: `scripts/dev/dev.sh up`, with the web on :9000, the API on :3000 and the docker mongo `rs0` on :27017. Docker Desktop was started for it.
  - keyframes: `npm run dev` on :5173.
  - fourier: web on :3100 via `npx --prefix web vite web --port 3100`, and API on :8000 with `scripts/e2e.sh`'s env.
  - Verified: fourier `POST /api/sessions` 200, value.js `/health` 200, and :5173, :9000 and :3100 all 200.
- **Port change:** fourier's fresh dev mongod (§0cl) moved from :27017 to **:27018**, because value.js's dev mongo owns :27017. The fourier API runs with `MONGO_URI=mongodb://localhost:27018/fourier`. The Track C chassis tells every fourier seat to export it, because `e2e.sh` defaults to :27017. The owner item on the corrupt Homebrew DB stands.

## §0co ADDENDUM 2026-09-24 — OA-56: the tracking ball rides the curve (KF.W13W minted)
- **Owner, verbatim:** *"with all the easing curves and simulators, the tracking ball must be on the curve itself--mark and ecoute-moi"*. The frame is the easing gallery, where the ball sits on a mid-height rail.
- Minted **KF.W13W** in `KF-W13.md`, to run after KF.W13V. Its units are `.c` (census of every curve or simulator with a marker, including the dock's easing mini), `.b` (one shared curve-to-point primitive, the ball derived from the same function as the stroke), and `.v` (the served-page gate: the ball's centre within 1.5 CSS px of the curve at 12 or more samples per site, RED before the cure).
- KF.W13V was already past its `.y` unit and running `.u` when the frame arrived, so a new wave carries this rather than killing a live seat. The Track B chassis appends KF.W13W. Its live run picks it up on the next resume after KF.W13V.

## §0cp ADDENDUM 2026-09-24 — X.P.W7 ruled: the release acts go to X.P.W7P (gated on the owner's npm one-time password); `.k2` and `.g` minted
- **X.P.W6R CLOSED** (run `wf_41f62d34-81d`). Its only honest-RED is PT-PERF-LOAD on `proof:perf`: W6R changed no measured byte, and the id is named in the spec.
- **X.P.W7 ended NOT-CONFORMANT after 2 repairs.**
- **What landed:**
  - parse-that branch `x-p-w7`: the paired instrument, `mapSpan` in place of `Object.create(state)`, a silent failure path and F-p-EOF.
  - bbnf-lang branch `x-p-w7-typescript`: `typescript/` restored and ported to parse-that 2.x, F-b-1 cured, the single emitter with `bbnf gen --check`, a depth fault at 256 back-edges, and the emitted module proved equal to runtime `compile()`.
  - value.js: the oracle, the adoption on linked worktrees, and `.k`'s module-load binding.
  - **Whole-corpus speed reads 7 of 7 GREEN twice.**
- **Blocked:**
  - **npm answered EOTP.** A one-time password is required, so parse-that 2.0.0 and bbnf-lang 0.2.0 are unpublished and the value.js dependency move cannot commit. This is an owner act: only the owner holds the second factor.
  - Accepted parseKeyframeSelector reads about 1.3× on every engine. The profile puts the floor in value.js's value actions: `tokenQuantity`'s re-splitting regex and a post-hoc `deepFreeze`.
  - Firefox is slower on parseStylesheet and parseCssColor, and WebKit on large sheets.
- **Ruled** in the W7.md 2026-09-24 addendum:
  - The release chain becomes **X.P.W7P**, specified in `W7P.md` and **GATE-KEYED on the owner's one-time password**. X.P.W7 closes its engineering gates by citing it.
  - **`.k2`:** the leaf hands `tokenQuantity` its split, and results are frozen at construction, not walked again.
  - **`.g`:** W7.md (g)'s emitter levers, each admitted only on paired numbers with no regression on any engine, plus the R-v-3 warm-up fix for the retired arm.
  - **LEDGER hygiene:** a seat stages only its own hunk. That cures C3-3, where repair 2 swept in Track C's LEDGER cells.

## §0cq ADDENDUM 2026-09-24 — the owner's 2026-09-24 docket: OA-57..OA-65
- **Owner, verbatim:** *"the dock when collapsed is not correct--same with keyframes.js and the docks in the other apps; … the easing curve picker is not organized well with proper design hierarchy and dividing … the side controls pane in fourier should be seperated, not totally attached, like it is now. The table of contents should be hideable in the paper view, it should slide under the paper and become a drawer that expands out to where it is now. The hide/show animation ball preview in keyframes.js should have a eye icon in every view, and it should not impact the fow, it should float in the top right corner and it should animate the hide and show--ensure that we're not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project. All issues should be fixed at the glass-ui root, too. The mobile view for the controls and panes in keyframes.js are wrong and not centreed and aligned properly. Audit every mobile view for every mobile app view for all projects, too. Keep ttrack of the projects, too, and hold them in your plans and mind, like parse-that, bbnf, keyframes.js, etc."*
- **Routing:**
  - **OA-57, the collapsed dock in every app.**
    - Producer: **O-65** (`relay/X-ALL-BK-DOCK-COLLAPSED-FORM.md`, mirrored, sent live), honest-RED **DOCK-COLLAPSED-FORM**.
    - Consumer halves: X-W12 (e), KF.W13W `.d` and F.W14U `.d`.
  - **OA-58, the easing picker's hierarchy:** KF.W13W `.p`.
  - **OA-59, fourier's side pane detached:** F.W14U `.s`.
  - **OA-60, the paper table of contents as a hideable drawer:** F.W14U `.t`. PaperSidebar and MobileFloatingToc become one component.
  - **OA-61, one floating eye toggle in every keyframes view:** KF.W13W `.e`, retiring duplicates.
  - **OA-62, component cogency, every project,** and **OA-64, mobile views, every project:** **AUDIT-2** (`audit/AUDIT-2.md`). It launches at the next free workflow slot; all four are busy under the cap. keyframes mobile gets its own unit now, KF.W13W `.m`.
  - **OA-63, fixed at the glass root:** every glass half is relayed (O-65 plus the standing O-53..O-64), and no local copies are made.
  - **OA-65, keep track of the projects:** the project roster is held in the orchestrator's memory and in this file's §0cq.
- **The roster:**
  - **value.js:** Track A.
  - **keyframes.js:** Track B.
  - **fourier-analysis:** Track C.
  - **parse-that and bbnf-lang:** Track D, via X.P.W7 and X.P.W7P.
  - **glass-ui:** relay only, live session glass-ui-9d, BL.
  - **latex-paper:** consumed by fourier's paper view, and reached only through F.W14U `.t` if its drawer needs a producer change.

## §0cr ADDENDUM 2026-09-24 — glass I-48 (O-65 registered); P-1 and P-2 ruled for fourier
- Glass registered O-65 at `806b7690`, and it enters D2 pass 2. Read from source only: glass has **no** edge-drawer-under-content primitive (P-2). Its Configurator is a floating card with **no** inset placement (P-1). Both go to glass formation.
- **Ruled.** Placement and hiding are the consumer's layout, not glass surfaces. F.W14U `.s` places glass's own card with an inset gutter, and `.t` hides the table of contents under the paper through fourier's grid. Neither copies a glass surface. Both adopt the glass primitive at the landing repin if formation ships one (P-2-ADOPT). The addendum is in `F-W14U.md` (b).

## §0cs ADDENDUM 2026-09-24 — OA-66 grey selects and OA-67 dock motion, both to the glass root (O-66)
- **Owner, verbatim:** *"the dropdown items when selected are an ugly gray, too, fix this in the glass-ui root. And the dock animations in all apps are poor and need to be fixed in the glass-ui root"*. The frame is keyframes' Controls pane.
- **Relayed as O-66** (mirrored and sent live):
  - GLASS-SELECT-GREY, with the likely mechanism O-62 applied to the Select trigger and selected item
  - the clipped left shadow, in the O-61 R-1 and O-63 family
  - every dock motion as a D2 witness, across all three apps
- **Consumers:**
  - X-W12, KF.W13W and F.W14U record honest-RED **GLASS-SELECT-GREY** with no override, alongside the dock ids.
  - A consumer that passes its own grey class to a Select (the §0cb dead `variant` pattern) is cured locally. Each wave checks its call sites.

## §0ct ADDENDUM 2026-09-24 — OA-68: side docks and their edges (O-67)
- **Owner, verbatim:** *"and the side docks, and the edges thereof, are not right"*. The frame is a dark side or canvas dock whose plate edge does not close, crowds the panel above, and has a status dot overlapping the expand glyph.
- **Relayed as O-67** (mirrored and sent live): side, vertical and canvas docks become a D2 witness family, with whole edges in both themes at every DPR, and a reserved badge seat.
- **Consumers:** X-W12, KF.W13W and F.W14U record honest-RED **SIDE-DOCK-EDGE**. Each checks its ancestor chain for a consumer clip and cures only that. The fourier canvas docks (`CanvasControlsDock`, `EditorControlsDock`) are the first place to read.

## §0cu ADDENDUM 2026-09-24 — OA-69: section actions inline, and hierarchy and space in every UI
- **Owner, verbatim:** *"and the refresh button should be inline in the section when expanded too. Ensure proper design hierarchy and usage of space in all UIs hereof"*. The frame is fourier's Contour section, whose reset sits alone on a row below the header.
- **Cause:** glass `ConfiguratorLayer` has no header-actions slot, as fourier's own source records. **Relayed as O-68** (mirrored, sent live), asking for an additive `#actions` slot, possibly in a 10.x minor.
- **Consumer:** F.W14U `.a` moves every reset into the header when the slot publishes. Until then it records honest-RED CONFIGURATOR-HEADER-ACTIONS, with no local overlay.
- **"All UIs"** becomes AUDIT-2 **Lens 3**, design hierarchy and use of space in every view of every app, which also censuses every lone-row action in value.js and keyframes.

## §0cv ADDENDUM 2026-09-24 — F.W14 ESC-S-1 and ESC-C4-1 ruled; fourier dev storage made persistent
- F.W14 resume 2 landed `.s`: seeding through the API, a GPU project run headed, and `f-w14-uia` GREEN twice. The check left two HIGH defects:
  - vc `:145`'s admin-banner golden, a diff from `.h`'s OA-50 render (ESC-S-1)
  - five blob-500 tests (ESC-C4-1), because the reboot wiped `/tmp/fourier-e2e-blobs` while mongo kept its rows
- **Host cure, done by the orchestrator:** the stale DB was moved aside to `~/.mongo-dev/fourier.pre-2026-09-24-bloblost`. A fresh DB serves :27018, and the API runs with a persistent **`BLOB_DIR=~/.mongo-dev/fourier-blobs`**. `POST /api/sessions` returns 200.
- **Ruled:**
  - `F.W14.s2` re-baselines vc `:145` under the `.h2` grant pattern, after reading the diff, and keys the global seed per run.
  - The product half, a missing blob answering 500 and never re-stored, becomes **`F.W14U.b`** (`api/**`).
- Specs: `F-W14.md` (g) and `F-W14U.md` (d).

## §0cw ADDENDUM 2026-09-24 — Track B: KF.W13U and KF.W13R CLOSED; KF.W13V ruled; KF.W13X minted; slot order
- **KF.W13U CLOSED.** Honest-RED: QUIET-FOCUS-RING, DRAWER-DETENT-REACH, DOCK-MORPH-ROOT and DARK-MENU-ITEM. `.d5` landed keyframes `febb3bcd`: one resolved-scene projection, so the dock changes once per switch (width `1111111111` ×2) and the Scene and Controls labels flip in the same frame.
- **KF.W13R CLOSED**, with glass 10.0.1 in keyframes. Honest-RED: SHEET-POSITION, B7 SPECULAR-REST, DOCK-MORPH-ROOT, GLASS-VEIL-GREY, DOCK-TRIGGER-CLIP and DARK-MENU-ITEM.
- **KF.W13V was NOT-CONFORMANT, with the loop dry.** Ruled in KF-W13.md's KF.W13V addendum:
  - Sequence's inline re-time editors become a Sequence mode of the shared Timeline pane (`.s2`).
  - The 183 KFA rows, the 257 UIA-KF rows, KFA-15, the critic gaps, the `[real-cube]` root cause, KFE-ORPHAN and `vue-sonner` move to the new wave **KF.W13X**.
- **Track B order:** KF.W13V (`.s2` and close), then KF.W13W, then KF.W13X.
- **Slot order (cap of 4):** Track B resumes in its freed slot now, because KF.W13W carries the owner's explicit asks: OA-56 (ball on the curve, "ecoute-moi"), OA-58, OA-61 and OA-64. **AUDIT-2 takes the next freed slot,** Track D's or Track C's.

## §0cx ADDENDUM 2026-09-24 — X.P.W7 ESC-W7g-1 ruled: a root-cause unit `.l`; AUDIT-2 launched
- **X.P.W7 resume** (Track D, `wf_41f62d34-81d`):
  - **`.k2` landed:** bbnf-lang `6d5a2b4a0` (a groups action kind), plus value.js `8850d74d`, `ccb1f7a3` and `baaec604`: `tokenQuantity` takes the leaf's split, and nodes are built frozen with `deepFreeze` deleted. Accepted keyframe is now .56–.68 on node, Chromium and WebKit.
  - **`.g` landed:** the R-v-3 warm-up and the browser paired instrument. Node large sheets now read .38–.45.
  - **Still RED:** Firefox rejected stylesheet at 1.08–1.13, and WebKit and Firefox large sheets at 1.09–1.31. All four granted levers regress another engine.
- **Ruled (W7.md addendum (b)):** a root-cause unit **`.l`**, which profiles per engine by per-rule bisection and cures structurally, one cure for every engine. That includes not building speculative nodes that a refusal discards. The gate stays: faster than the retired parser on every engine. No per-engine path and no relief. A measured impasse goes to the owner.
- **Slots:** AUDIT-2 launched as `wf_375e45f5-661` in Track D's freed slot, as promised in §0cw. **Track D resumes (`.l`) at the next freed slot.** A, B, C and AUDIT-2 are running.

## §0cy — 2026-09-24: AUDIT-2 routed whole; X-W12U minted (it is the X-W12S supplement); O-74 erratum; the critic's 15 gaps homed
- **AUDIT-2 landed** (`wf_375e45f5-661`): 166 rows. value.js has 44 (`39d76f92`), keyframes 60 (`868e69a9`) and fourier 62 (`9c7552d3`). The glass letter was minted as O-69 and filed as **O-74** (`1a05749f`) because of an id collision; every citation now reads O-74. Frames stay local and git-excluded.
- **Routing:**
  - **value → X-W12U** (new `waves/W12U.md`, Track A chassis after X-W12, blocking X-W8).
  - **keyframes → KF.W13X** (KF-W13.md addendum (b)).
  - **fourier → F.W14U** (F-W14U.md addendum (e)).
  - A row with a glass half alone is **ADOPT-AT-LANDING** (value: ADOPT-AT-X-W7L) and names its O-74 row. No consumer copies.
- **Ruled: X-W12U IS the supplement X-W12's close called "X-W12S"** (RESIDUE-U1/U2/U3: 152 + 89 halves, plus 492 rows and 3 held). It is unit `.s`, deduped against AUDIT-2. One successor, not two (KISS). The X-W12 check reads "X-W12S" as X-W12U.
- **The critic's gaps, each homed:**
  1. **The A2-VA-L2-6 mis-route** goes to O-74a E-1, and value's half to X-W12U `.x`.
  2. **The §11 contradiction** goes to O-74a E-2, where glass is asked to rule. The consumer rows are HELD in all three apps.
  3. **Cross-app adoption rows** go to X-W12U `.k` and F.W14U (e).
  4. **The value admin routes, never seen populated**, go to X-W12U `.x` (route stubs).
  5. **The value overlays at 360/430/844×390** go to `.x`.
  6. **The keyframes views never read at phone size** go to KF.W13X (b).
  7. **fourier's Audit Log and the other views L3 never read** go to F.W14U (e).
  8. **value's Markdown `.toc`, the pickers and the runtime mount census** go to `.k`.
  9. **The easing specimen, in all three apps**, goes to O-74a E-3 plus each app's wave.
  10. **`/admin/tags` rendering Not Found** goes to `.x`.
  11. **The safe-area instrument (the CDP override)** goes to every wave, with O-74a E-4.
  12. **keyframes' `docSH`** is added to the A2-KE-L2-2 gate.
  13. **The unrowed pairs** (useSafeStorage, AdminFlaggedPanel, search inputs, sampling law) go to `.k` and F.W14U (e).
  14. **value's 11 px micro type** goes to `.x` and O-74a E-5.
  15. **The fourier re-baseline to `7ad6be2`** goes to F.W14U (e).
  16. **Tablet 768/1024** goes to every wave.
  17. **The instrument:** X-W12U measures on :9000, and every falsifier is a committed script.
- **Slots:** A (X-W12), B (KF.W13V `.s2` → W13W → W13X), C (F.W14 `.s2` → F.W14U) and D (X.P.W7 `.l`) are running. Track A picks up X-W12U when it is resumed on X-W12's completion (the live run predates the stage).

## §0cz — 2026-09-24: owner frame, "the background area between the two elements … should not be displayed"; F.W14V minted; O-75 CONFIGURATOR-DETACHED
- **Owner, verbatim:** *"the background area between the two elements is not right--this should not be displayed--they should be distincitly there"* (frame banked at `fourier/evidence/W14/owner-2026-09-24-configurator-shell-band.png`, fourier `/visualize`, light, desktop).
- **Cause:** glass `Configurator`'s shell (`Configurator.vue:169-199`) is one plate around `#stage` and the aside. F.W14U `.s` (`10c8e1a`) detached the pane as a glass `Card` with an inset gutter. That was the lawful consumer half, but the gutter shows the shell plate, so the pane reads as a card on a card. Ruled: **`.s` is INCOMPLETE** (PARTIAL → F.W14V `.s2`), not landed-wrong.
- **Glass half:** O-75 CONFIGURATOR-DETACHED, sent and mirrored. Glass registered it at `3057474f` (I-53) and merged it with O-65 P-1 and O-68 `#actions` into one Configurator wave. **An early 10.x minor for these is OW-11, the owner's call**, and glass is putting both items to the owner together.
- **F.W14V minted** (`fourier/waves/F-W14V.md`; Track C chassis after F.W14U):
  - `.s2`: the gutter reads the page ground; consumer contributors such as `glass-opaque` on `.viz-configurator` are cured at the root; adopt O-75 on publish, otherwise honest-RED.
  - `.p`: the same frame shows a raw "A session is required to publish." toast over the pane. A signed-out Publish reaches the inline sign-in, and toasts never cover the pane.
  - `.au0` onward: **the AUDIT-2 fourier scope, re-homed from F-W14U addendum (e)**. F.W14U opened before (e) was written, so its plan never carried it; this is recorded in F-W14U addendum (f).
- **Slots:** unchanged. Track C is on F.W14U `.vstage` (unit 8 of 15), and it is not interrupted: the in-flight seat holds uncommitted edits in the same panels. **Track C picks up F.W14V when it is resumed on its completion notification** (the live run predates the stage), the same as Track A with X-W12U.

## §0da — 2026-09-24: owner rules OW-11 (the Configurator changes ship in 10.x); owner reverses UIA-F-172's colour limb
- **OW-11, owner, verbatim:** *"And this should be in 10.0"* (answering whether O-75 CONFIGURATOR-DETACHED and O-68 `#actions` wait for 11.0.0). **Ruled: they ship in a 10.x minor ahead of BL's 11.0.0 cut.** Both are additive, so this is semver-lawful. Relayed live to glass-ui-2d. fourier adopts on publish with an exact pin (F.W14V `.s2`; F.W14U `.a`). value.js and keyframes re-read their stage-plus-inspector shape at adoption. The owner-item list for the close report drops OW-11.
- **Owner, verbatim:** *"What happened to the fourier colors in the configurator and the sliders and the like"*. F.W14U `.vstage` (`9a1d932`) removed the per-basis hues from the controls on UIA-F-172's reading. **Reversed by F-W14U.md addendum (g)**: the colour limb only; the rest of `.vstage` stands. Unit `F.W14U.c1` was dispatched at once as a single Opus seat, outside the chassis loop, in files disjoint from Track C's in-flight seat, with pathspec commits. Its record goes in `execution/C/F-W14U.md` § F.W14U.c1.
- **Lesson (for every audit fold):** an audit row that removes an app's identity colour, type or motion is a design reversal, not a defect cure. It needs an owner ruling before it lands. Future fold seats must mark such rows DESIGN-RULING rather than cure them.

## §0db — 2026-09-24: F.W14U.c1 landed; "and the like" ruled to cover the editor dock; O-76
- **`.c1` landed** (fourier `b7607f8`; record `1e4a98c7`). The census found that only `9a1d932` took hues off the Configurator: 10 sites (the basis-chip tints, Harmonics and Sample Points, and five amber contour rows). All are restored from the one palette through glass's published props, and `--control-accent` is deleted. The e171 assertion is inverted: RED ×2 on `9a1d932`, the spec 18/18 GREEN ×2 after, AA contrast measured in both themes, and no slider on `--destructive`.
- **Ruled:** the owner's "and the like" also covers `dd123a9` (`.vedit`), which removed the contour-editor dock's hover tints (Smooth amber, Simplify blue, Delete pink, Save's red hover, the Magnet red) and, with the ToggleGroup restructure, the ℱ chip glyph. **Unit `.c2`** was dispatched to the same seat, again outside the chassis loop and in disjoint files.
- **The pressed chip's basis-hue border** belongs to glass: **O-76 TOGGLE-PRESSED-TINT** has been sent and mirrored, and is live to glass-ui-2d. The ask is a per-item tint token, fitting the same 10.x minor as O-68 and O-75 (OW-11). The consumer records honest-RED CHIP-PRESSED-TINT.

## §0dc — 2026-09-24: F.W14U.c2 landed; the editor dock's leftovers routed to F.W14V `.c3`
- **`.c2` landed** (fourier `aef636f`; record `5150061c`). The editor dock's tool hues are restored through glass's `--menu-row-bg` and `--btn-hover-color`: Smooth amber, Simplify blue, Delete pink, and Save red with its 15% hover. The Magnet icon is back in the menu (red when on). The ℱ glyph is back on the Epicycles and Series chips. Icon inks are mixed 25% toward the foreground, which puts every icon at ≥ 3:1 (light 3.56–4.92, dark 4.78–6.29); the tints stay the plain hue. The inverted assertions are RED ×2 on `dd123a9` and GREEN ×2 after (vedit 13/13, vstage 18/18).
- **Routed to F.W14V `.c3`** (F-W14V.md addendum (a)): the magnet's state is hidden on the closed dock (ruled: an "on" mark on the More-tools trigger through glass's seat, otherwise ask glass), and the menu-row icon gap (glass's DropdownMenuItem anatomy).
- **Honest-RED:** CHIP-PRESSED-TINT (O-76).
- **For Track C, not ruled here:** the `.c2` test runs left tracked screenshots dirty under `web/e2e/screenshots/f-w14/after-veil-*`. The `after-page-*` frames were already dirty. Their owner decides.

## §0dd — 2026-09-24: glass-ui 10.1.0 live (O-68 + O-75); fourier adopts now
- **glass-ui 10.1.0** is on npm (tag v10.1.0, provenance-signed; I-54) with O-68 ConfiguratorLayer `#actions` and O-75 `Configurator layout="detached"`, both additive. This is the owner's OW-11 ruling (§0da) delivered.
- **fourier adopts at once**, out of the chassis loop (the same single Opus seat as `.c1`/`.c2`, in files disjoint from Track C's in-flight `.gallery`):
  - repin `10.1.0` exact;
  - `layout="detached"` on /visualize, deleting `.s`'s consumer Card wrap and its placement rule;
  - every section reset moved into `#actions`, deleting the body reset rows;
  - falsifier `f-w14v-detached.spec.ts` (gutter = page ground; reset in the header row, never toggling the layer).
  This is **F.W14V `.s2`'s glass half ⊕ F.W14U `.a2`**. When F.W14V opens, `.s2` reads it as landed and verifies it.
- **value.js** stays on glass 7.0.0 until X-W7L (§0ci R-5): X-W12U `.h` records `#actions` / `detached` as ADOPT-AT-X-W7L. **keyframes** adopts `#actions` wherever a section action sits on its own row, in KF.W13X (the owner's "all UIs").
- **O-76** (TOGGLE-PRESSED-TINT) missed the 10.1.0 tag. glass is raising a later minor with the owner; CHIP-PRESSED-TINT stays honest-RED.

## §0de — 2026-09-24: the owner rules "All should be on 10.1."; X-W7L brought forward; keyframes repins now
- **Owner, verbatim:** *"All should be on 10.1."* Every tranche app pins `@mkbabb/glass-ui` **10.1.0 exact**. This **supersedes the §0ci R-5 hold** of value.js on 7.0.0.
- **fourier:** on 10.1.0 (the §0dd adoption seat).
- **keyframes:** 10.0.1 → 10.1.0 (additive) as a single seat, `KF.W13X.g0`, landed ahead of the wave; the `#actions` and detached adoption stays in KF.W13X's addendum (c).
- **value.js: X-W7L** (`waves/W7L.md`) is minted now, not at BL's cut, and runs in the Track A chassis **after X-W12 and before X-W12U** (X-W12U now depends on X-W7L).
  - `.m`: the repin, applying the banked `d49d2238` migration patch at the root.
  - `.i`: the certified-ink `contrast_unreachable` on glass 10's veil (ESC-W7Rm-1's only cause), cured at the root against the real composite. It never holds; a surface that stays unreachable is recorded honest-RED with an O-62 addendum.
  - `.v`: every glass-owned row and every ADOPT-AT-X-W7L AUDIT-2 row re-read at 10.1.0.
  - `.a`: `#actions` and detached where value.js has that shape.
  W12U.md's addendum turns its ADOPT-AT-X-W7L rows into "adopt now". glass has been asked whether 10.1.0 changes the O-62 veil.
- **Outside tranche X (not ruled here; reported to the owner):** atlas `^6.0.0`, chicago `^10.0.1`, slides `3.13.0`, speedtest `^4.0.1`, bbnf-buddy `^3.9.0` also consume glass-ui.

## §0df — 2026-09-24: owner "yes to both": the veil fix ships in 10.x; every glass consumer goes to 10.1.0
- **Veil (O-62) in 10.x.** The owner answered "yes" to shipping the grey-veil fix in a 10.x minor instead of at 11.0.0. This is the ruling glass said it needed, because the recut revises a documented design law. It was relayed to glass-ui-2d: O-62 plus O-66 §1 SELECT-GREY (plus O-76 if it is ready) ship in a 10.x minor, and BL loop D3 is un-paused as the priority. value.js X-W7L `.i` still cures its ink instrument against the current composite, sends any unreachable surface as a measured O-62 addendum, and re-reads its ink at the veil minor.
- **Every consumer on 10.1.0.** The owner answered "yes" to the five glass consumers outside tranche X. One Opus seat each: atlas (`^6.0.0`, library), slides (`3.13.0`, deploys Pages from main), speedtest (`^4.0.1`, 16 pre-existing dirty paths left untouched), bbnf-buddy (`^3.9.0`, no remote), chicago (`^10.0.1`, not a git repo; backed up before the change).
  - Each works on a `glass-10.1` branch with a PR where there is a remote.
  - **No merge to a deploying default branch and no atlas release until the orchestrator has read that seat's report.**
  - The migration is at the root, with no shims.

## §0dg — 2026-09-24: a system-wide stream stall; the six seats resumed; keyframes on 10.1.0
- At about 16:45 every background seat (the six single seats, plus the chassis seats) stalled together on a stream watchdog. The network probe was clean afterwards. Tracks A, C and D re-launched their seats themselves at 16:55. The six single seats were resumed from their transcripts by message, each re-reading `git status` before continuing.
- **keyframes on 10.1.0** (`9fa56c26`, KF.W13X.g0): pixel-identical, and the pin needed no code change. The routed leftovers are in KF-W13.md addendum (d): the pre-existing orbital-drag lint cycles, and the stale :5173 dep cache.

## §0dh — 2026-09-24: fourier on glass 10.1.0 with the detached Configurator and the header actions; O-77
- **Landed** (fourier `239845f`; record `db0058c7`): the owner's shell band is gone. The stage and the pane are separate glass cards with the page ground between them, measured light and dark at 1440 and 1024. The resets sit in their section headers. The honest-REDs CONFIGURATOR-DETACHED and CONFIGURATOR-HEADER-ACTIONS are CURED. Along the way, the :3100 dev server was restarted with `--force` to drop the stale 10.0.1 pre-bundle.
- **O-77 LAYER-HEADER-LABEL** is sent and mirrored: with `#actions`, the label truncates before the sub-label does.
- **Ruled:** /equation moves onto the Configurator if it is a stage plus an inspector (F.W14V `.eq2`), because the owner's complaint was inconsistency across pages.

## §0di — 2026-09-24: Track D returned; X.P.W7 NOT-CONFORMANT only on Firefox; ESC-W7l-1 ruled (static bulk-run emission); `.l2`
- **Track D completed** (`wf_41f62d34-81d`). X.P.W7 is NOT-CONFORMANT after 2 repairs, on one cause only.
- **`.l` cured JSC's large-sheet backtracking** (bbnf-lang `d81016e96`), so WebKit's large sheets went from 1.11–1.19 to .55–.59. WebKit and Chromium are GREEN on 22/22 rows ×2, node 7/7 on every class, and L-G2, L-G3 and all stay-GREEN gates are GREEN.
- **Remaining RED:** Firefox rejected and large `parseStylesheet` (×1.10–1.34). The cause is SpiderMonkey running the emitted class-run loops at half its regex engine's speed.
- **Ruled (W7.md addendum (c)):**
  - (c) relief is refused.
  - (a) is admitted in its **static** form: the emitter classifies bulk-text class runs from the grammar's structure and emits them as sticky regex scans, while token runs stay loops. It uses no input length and no engine detection.
  - (b), the uniform lever at a ×1.02–1.05 cost on Chromium and WebKit (which stay below 1), is the measured fallback only.
- **Unit `.l2`** is the Track D chassis RESUME 4 note. Track D is resumed.
- **The release stays X.P.W7P**, on the owner's npm one-time password. **Reported to the owner**, who can overrule the ruling.

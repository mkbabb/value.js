# Tranche X wave conformance — L-20 adjudication, 2026-08-03

**Seat**: fresh Fable conformance adjudicator (L-20). **Inputs read whole**: `docs/precepts/instructions/tranche/WAVE_SPEC.md` · `docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md` §0/§1/§2 · all twelve `docs/tranches/X/waves/W{0..11}.md`. All verification read-only; docs-only write (this file). Cross-checks run against the tree at `tranche-u` HEAD.

**Verdict roster**: 4 CONFORMANT (W0, W1, W3, W4) · 8 DEFECTS (W2, W5, W6, W7, W8, W9, W10, W11). Every defect below is minor-to-moderate: no wave is missing a WAVE_SPEC section, no COMPLETABLE is vacuous, no glass-bank row is smuggled, no adjudicated disposition is re-litigated, and born-RED discipline (measured baseline or explicit MEASURE-AT-OPEN, with pasted output) holds across all ~230 gates. The defects are seams between waves and small internal inconsistencies, each with an exact fix.

---

## Per-wave verdicts

### W0 — Formation · **CONFORMANT**

All WAVE_SPEC sections present (State, goal criterion, scope, triumvirate, bounds + Do-NOT-touch, disjointness, worktree, units with paired goal/sub-gate, HG-1..HG-16 with falsifiers, cadence, artefacts, commit plan, dependencies, archaeology, L-18 rider). COMPLETABLE argued concretely (docs-only, one VPN-gated probe dispositioned without the probe). Born-RED exemplary: HG-12's nine probes pasted row-by-row, including the honest re-measure 81→69 on DR-19's `proof:` count (FM-22 applied). HG-16 self-polices C-06 across the sibling files. *Observation (no fix required)*: units .b/.c/.d list Mechanism before Goal — content complete, order cosmetic.

### W1 — Re-gate · **CONFORMANT**

21/21 born-RED with B1–B19 pasted verbatim; the two MEASURE-AT-OPEN rows (G-3 execution split, G-13 prod-preview mount) are exactly the two that cannot be honestly measured pre-open, and the file *corrects* its own inherited mechanism (the "two source-broken fixtures" re-diagnosed to the B10 typecheck root — measured, not asserted). G-7/G-9/G-12 make the falsifier a gate. The archaeology table names each prior failure and its specific guardrail. CC-029's run-or-tombstone shape terminates a six-close carry without smuggling.

### W2 — Boot boundary · **DEFECTS (1)**

Strong wave: G2's falsifiable byte prediction (278,124 B upper bound with a triumvirate trigger if wrong), G4's honest demotion of the carried Q14 numbers to superseded-not-met, the ENV block's origin-blindness disclosure, and the no-escalate-arm guardrail are model work.

1. **§2 State `Status: SPECIFIED` is not a WAVE_SPEC status token.** The §2 enum is `planned|in_progress|complete|complete_with_misses|blocked|superseded`; SPECIFIED belongs to the four-verb line, which the file already carries one line below. **Fix**: change the Status field to `planned`.

### W3 — Access, route closure, API policy · **CONFORMANT**

22 gates, 19 born-RED with line-anchored measured baselines (including the live `/openapi.json` re-measure that supersedes the audit's "17 operations"); the G-16 DECISION and G-21 HANDOFF rows are labelled as non-evidence rather than counted. Dispositions D-1..D-8 apply the X-4/X-5 rulings without re-litigating. *Observation*: falsifiers are stated as one collective discipline paragraph ("remove the named cure and the named probe reproduces the named baseline") rather than per-gate; acceptable here because every gate is a runtime probe with a pasted baseline, but the per-gate form used by the other eleven files is the stronger idiom.

### W4 — Semantic controls · **CONFORMANT**

The partition discipline is the tranche's best: §10a states CC-044/CC-003's four machine-checked trigger conditions verbatim and W4 explicitly refuses to be read as the bank rows' home. The A-7 exoneration and MT-F005 element-death are *corrected inheritances*, recorded with the attribution rule rather than re-cured. A5/D3 one-time falsifier demonstrations and B3's receipt-before-edit condition satisfy L-19 in both directions. All three glass rows verified answerable at installed 7.0.0 with disk measurements.

### W5 — One route, one scene · **DEFECTS (1)**

28 gates with the D1/D3-D4 adversarial pairing (budget cannot be met by deleting the motion) and the E1 witness-protection scoping (evidence records excluded from the strike) — both excellent.

1. **Commit plan #6 stamps "status flip to VERIFIED" in the close commit.** The four-verb law and this file's own L-18 rider put gates-green at IMPLEMENTED, with VERIFIED/ACCEPTED only after the two quartet passes (W4 commit 7 and W10 §12 encode it correctly). **Fix**: commit 6 advances the verb line to IMPLEMENTED; VERIFIED is stamped by the post-pass record, not the close commit.

### W6 — Instruments and temporal scenes · **DEFECTS (1)**

The largest file earns its length: 50-gate roster with internally consistent counts (45+1 sub-gates, H1 non-regression justified by its *new-artefact* falsifier, H2 born-RED on the missing quarantine record), the GRADSTOP cure-laws (§14 clamp/splice bans) carried as binding, and the D-6/D2-16 limb banked with the full four-condition trigger quoted.

1. **File Bounds omit the new gate/probe scripts the Hard Gate invokes by path.** f1/f5/h2/i2/H1 run `docs/tranches/X/gates/gate-{catalog-totality,specimen-grammar,blob-pipeline,lband-door,no-chassis}.mjs` and d1/d2/e2/g1 run `…/audit/probes/x-w6/gate-{easing-radius,easing-readout,prm-idiom,card-rhythm}.mjs` — all marked "(new)", none present in §4's table (only `docs/tranches/X/waves/W6-*.md` is bounded). Under §3a's own trigger, a writer creating them expands bounds and invalidates the wave. **Fix**: add two create rows — `docs/tranches/X/gates/*.mjs` and `docs/tranches/V/megatranche/audit/probes/x-w6/*.mjs`.

### W7 — Palette specimen and domain split · **DEFECTS (1)**

G4's product-consumer census ("certified can never again mean certified against itself") is the tranche's cleanest L-19 application; G18's green containment gate is correctly justified; G3/G9's unknown counts are honestly MEASURE-AT-OPEN.

1. **Opens-after omits X-W6 while sharing four `modify` paths with it, against W6's own Blocks claim and the ledger's ratified order.** W7 opens after X-W3 + X-W4 only; W6 (opens after X-W5) declares "Blocks: X-W7 — the palette specimen split reuses `formatSpecimen`'s digit policy," and the two waves both hold `modify` on `demo/color-session/ColorSpaceSelector.vue`, `demo/scenes/atmosphere/AuroraPane.vue`, `demo/workbenches/mix/MixConfigBar.vue`, and `MixSourceSelector.vue`. As written, the dependency graph admits W6 ∥ W7 — a WAVE_SPEC §4a violation ("No two parallel waves may write the same path"). The ledger §2 frontend order (instruments → palette split) says the same. **Fix**: add X-W6 to W7's Opens-after/Depends-on (or, if the authors intend W7 first, invert W6's Blocks row and re-sequence the four shared files — one of the two, recorded).

### W8 — Shadcn and graph subtraction · **DEFECTS (1)**

G-1's census-before-bounds (C-16) with both prior figures marked UNREPRODUCED, G-4's measured tw-animate-css retention receipt, and G-9's null-DELTA justification (attribute-selector grep proving inertness) are exemplary subtraction discipline.

1. **Opens-after omits X-W6 while unit .c rewrites the three gradient composables W6.a/.c own, against W6's own Blocks claim.** W8 opens after X-W5 + X-W7; W6 declares "Blocks: X-W8 — subtraction needs .a/.c's destinations stable," and both waves hold `modify`/`modify-carve` on `demo/workbenches/gradient/composables/{gradientParse,useGradientCSS,useGradientModel}.ts` (W8 File Bounds row 12 vs W6 units a/c). W8's own opening sentence accounts for only 33 of the 48 consumer files via W5/W7 — the workbench remainder is W6's surface. **Fix**: add X-W6 to W8's Opens-after ("X-W5, X-W6, X-W7 stabilize destination ownership").

### W9 — Parser and library apotheosis · **DEFECTS (2)**

The strongest gate table in the tranche: 33 conditions with probe exit codes, the RED-first-commit guardrail, the packed-tarball-as-oracle rule (PT-08), staged gates discharging OC-2 at authoring, and G28's restated-denominator law applied verbatim.

1. **The State block claims "the three explicitly marked MEASURE-AT-OPEN"; exactly one gate (G24) carries the mark.** Every other row in §6 is `[measured]` or a declared GREEN fence. The count is internally false as written. **Fix**: either mark the two other intended rows (the natural candidates: G28's TCC-gated `P4-EVIDENCE-REPLAY.json` denominator reading and G33's post-window `npm ls` leg) or correct the sentence to "the one explicitly marked MEASURE-AT-OPEN."
2. **"Order-independent of X-W2..X-W8" is contradicted by a shared write path with X-W4.** X-W9.h modifies `demo/picker/controls/ComponentSliders/ConsoleRail.vue`; X-W4.a holds `modify-carve` on the same file. The file already sequences itself against X-W8 on `ARCHITECTURE.md` — the same declaration is owed for ConsoleRail vs X-W4. **Fix**: add one §Disjointness cross-wave line sequencing X-W9.h after X-W4 closes (or while X-W4 is not open).

### W10 — Canonical design and motion · **DEFECTS (1)**

The conditional-open is real and argued (OP-1..OP-4 checked at open, not at close); the twice-authored Fable ∥ Opus → fresh-Fable process is encoded, not performed, with blindness given a falsifier (the M6 mtime failure mode); G-4's per-engine pinning and G-7's explicit denominator exclusion of evidence records are correct L-19 work; the DR-13 survivors are enumerated with measured counts before the container is killed.

1. **Phase-3 implementation units (.d/.e/.f) carry no declared model seat.** Units .a/.b/.c declare Fable/Opus/fresh-Fable; the three cure units declare nothing. M-23 seats implementation on Opus, and the tranche's own standard (W3 §5: "An undeclared seat is a defect") applies. **Fix**: one line atop §5 or in each of .d/.e/.f: "Opus 5 implementation seat (M-23 §2)."

### W11 — Release and verified close · **DEFECTS (1)**

The consumes-never-absorbs law is enforced by the triumvirate triggers (a release wave that edits mechanism is not a release wave); G1's extractor names the row that fails; G8's I-20 cell-separation and G9's install-receipt-not-manifest rules bind the two historically-faked evidence classes; the 11 banked rows enter the release table with conditions verbatim.

1. **G2/§7's docs-lint cure names two wrong owners and omits the real one, and its "cured here" arm exceeds this wave's own File Bounds.** The 50 lint problems live in tracked `docs/tranches/V/megatranche/workflows/*.js` — X-W0's track-or-archive (untracked bytes) does not touch them, and no W11 File Bounds row covers them, so "cured here" is a bounds breach if exercised. The actual cure is X-W8's G-6 (`eslint.config.js` ignores `docs/tranches/**`), which lands before W11 opens. **Fix**: replace "cured here or by X-W0's track-or-archive, whichever runs first" with "cured by X-W8 G-6 (docs-tree ignore); W11 asserts the green, it does not produce it."

---

## Tranche-level read

**Coverage (cross-checked against ledger §1, row by row).** All 63 BUILD rows are owned by exactly one wave, in the ledger §2 grouping, with every limb-split (CC-081 four ways, CC-073 two ways, CC-076 rows 7-10 forwarded) explicit in the owning files. All 17 RETIRE acts are executed at named waves (CC-015..023 → W0, CC-039 → W3 D-3, CC-092..095 → W9, CC-103 → W10) — **except CC-011** (below). The 11 BLOCKED-ON bank rows appear with their trigger conditions **verbatim-identical** across W4 §10a, W6 §Blocked, W7, W8, and W11's release table — zero smuggling found anywhere: every glass surface any wave consumes (`./blob-config`, `./aurora`, `./labeled-field`, `dir`/`inverted`, `DockCrossfade`) was measured published at installed 7.0.0.

**Unowned ledger rows (4).**

| row | gap |
|---|---|
| **CC-011** (V·L5 · RETIRE per C-13) | The retire *act* — rewrite the routing law against V·L1..V·L4 + an explicitly defined new cut, normalize `·` with a period-form search alias — appears in **no wave file** (0/12 grep). W0's tombstone set stops at CC-015..CC-023. At W11 G1 the row must emit `RETIRED <tombstone path>` and no wave authors that tombstone. **Fix**: home it in X-W0.f's tombstone set (it is docs-only and formation-shaped). |
| **CC-109** (G-4 thumb glyph · FOLD → glass seat) | Value action = "consume at the 8.0.0 repin census; no value wave row" — and no wave owns the census (next row). Named in 0/12 wave files. |
| **CC-116** (I-21 remainder · FOLD → glass TR seats) | Value action = "the single 8.0.0 repin census." Appears only inside W1's range-mention "(CC-105..CC-116)". No wave owns it. |
| **CC-117** (08-02 peer intakes · FOLD → INBOX I-24) | Evidence-only by design; acceptable — but no wave emits its terminal word for W11 G1's 117-row walk. One line in W11's dispositions table closes it. |

**The repin-census orphan (the one structural gap).** The Glass-8/8.0.0 repin census is the named trigger for CC-003/044/105/106/109/113/114/115/116, and the ledger §2 says banked rows "open inside their receiving waves when the trigger fires" — but **no wave file names itself the receiving wave**, and W4 §10a explicitly disclaims being their home ("named here only so this wave is not read as their home"). If the trigger fires mid-tranche, the atomic cut has no owner; if it never fires, W11's BLOCKED-ON table handles it correctly. **Fix**: one sentence, ledger §2 or W4 §10a — name the receiving surface (the natural reading: the census lands as a dedicated micro-wave under W4/W6/W7's file surfaces, dispatched by the orchestrator on trigger-fire), so "receiving wave" stops being an unresolved pointer.

**Ordering contradictions (2, both one-directional).** W6 declares Blocks: X-W7 and X-W8; neither reciprocates in Opens-after, and both share `modify` paths with W6 (W7: ColorSpaceSelector/AuroraPane/MixConfigBar/MixSourceSelector; W8: the three gradient composables). As written the graph admits W6∥W7 and W6∥W8 parallel opens that violate WAVE_SPEC §4a. Fixes are per-wave defects W7-D1 and W8-D1 above. The rest of the chain is coherent and matches ledger §2 (W0→W1→{W2,W3,W4}→W5→W6→…→W10→W11, W3/W9 order-independent with declared carve-sequencing — W9's ConsoleRail gap noted at W9-D2).

**Status-verb convention drift.** W4/W10 stamp IMPLEMENTED at gates-green with VERIFIED after the L-18 passes; W5 (defect above) and, ambiguously, W1 commit 8 bundle VERIFIED into the close commit. One convention should be ratified for all twelve: gates-green = IMPLEMENTED; VERIFIED = post-quartet.

**Denominator law: clean.** No wave carries an unqualified `264/264` (W0 HG-6 forbids it; W1/W9 cite the 218/46 split); no `proof-*.mjs` is authored anywhere; every cross-product denominator names its product consumer (W1's viewport matrix, W7's N-fixtures, W10's G-7 exclusion clause are the exemplars).

**Superlatives, for the record (L-18 duty runs both ways).** W1's measured correction of its own inherited mechanism; W2's falsifiable byte prediction with a forbidden-re-baseline trigger; W4's partition of CC-003 with the trigger quoted verbatim; W6's H1 green-at-open gate justified by a new-artefact falsifier; W7-G4's "certified against itself" cure; W8's census-before-bounds; W9's RED-first-commit + packed-tarball-oracle guardrails; W11's consumes-never-absorbs triumvirate. This is the strongest wave corpus the tranche ledgers record.

---

*Adjudication complete 2026-08-03. 12 files · 4 CONFORMANT · 8 DEFECTS (9 numbered defects total, each with an exact fix) · 4 unowned ledger rows · 1 structural gap (the repin-census receiver) · 2 ordering contradictions (subsumed by W7-D1/W8-D1).*

---

# SECOND PASS — post-repair re-adjudication, 2026-08-03

**Seat**: fresh Fable conformance adjudicator (L-20), second pass. **Inputs read whole**:
`WAVE_SPEC.md` · `CARRY-CUT-LEDGER.md` §0/§1/§2/§3 · all twelve `waves/W{0..11}.md` at their
post-repair bytes. The first pass above is dated evidence and is not rewritten. All verification
read-only; docs-only write (this file). Rulings **R-A** (status verbs), **R-B** (X-W0 census event →
X-W4.g receiving surface), **R-C** (CC-011 → X-W0), **R-D** (CC-109/116/117 → X-W0) applied as
given, not re-litigated.

**Verdict roster**: **7 CONFORMANT** (W2, W3, W6, W7, W8, W10, W11) · **5 DEFECTIVE**
(W0, W1, W4, W5, W9) · **7 numbered defects**. **NOT tranche-ready.**

## (a) First-pass defects — repair audit

| first-pass defect | status |
|---|---|
| W2-D1 `Status: SPECIFIED` off-enum | **FIXED** — `**Status**: planned`; the four-verb line moved to its own paragraph (`W2.md:9,11`) |
| W5-D1 close commit stamps VERIFIED | **FIXED** — commit 6 now "status flip to IMPLEMENTED (VERIFIED is stamped only at X-W11's release close)" (`W5.md:316`) |
| W6-D1 gate scripts outside File Bounds | **FIXED, exemplary** — all nine new instruments carry `create` rows (`W6.md:118-126`) plus a **Bounds law** paragraph that separately dispositions the four read-only-invoked instruments and routes an edit of one to §3a. Verified: the nine bounded paths are exactly the nine the gates invoke |
| W7-D1 Opens-after omits X-W6 | **FIXED** — Opens-after and §10 both name X-W6 *and cite W6's reciprocal `Blocks: X-W7`*; §4a adds a Cross-wave block naming all four shared paths and the W6∥W7 §4a hazard by name |
| W8-D1 Opens-after omits X-W6 | **FIXED** — Opens-after names X-W5/X-W6/X-W7; the consumer-file accounting corrected 33→**42 of 48** with the remaining six assigned to X.W8.a's census; §10 quotes W6's Blocks row |
| W9-D1 "three MEASURE-AT-OPEN", one marked | **FIXED honestly** — G28 and G33 now carry per-leg marks (`W9.md:335,340`) and §State names which legs are measured and which are not, rather than relabelling to make the count true |
| W9-D2 ConsoleRail vs X-W4 unsequenced | **FIXED** (one-directional — see W4-D2) — §Disjointness Cross-wave sequences X-W9.h after X-W4 closes |
| W10-D1 phase-3 units carry no seat | **FIXED** — §5 preamble "an undeclared seat is a defect" + `Opus 5 implementation seat (M-23 §2)` in each of .d/.e/.f |
| W11-D1 docs-lint cure names wrong owners | **FIXED, and over-delivers** — G2 and §7 both name **X-W8 G-6** as the cure with "W11 asserts the green, it does not produce it", plus a new Do-NOT-touch row for `eslint.config.js` + `megatranche/workflows/**`. X-W8 G-6 verified to exist and to carry that exact rule (`W8.md:262-263`) |

Nine of nine first-pass defects fixed on the merits. No repair is cosmetic.

## (b) Rulings R-A..R-D — application audit

**R-A (status verbs).** Status FIELD = `planned` in **12/12**. Close-stamp convention stated
correctly in W0, W2, W5, W6, W7, W10, W11; silent (no stamp claimed) in W3, W4, W8, W9 — acceptable.
**W1 violates it** — see W1-D1.

**R-C / R-D (CC-011, CC-109, CC-116, CC-117).** Fully applied. **X-W0.i** is a real unit with Goal /
Mechanism / Files / Sub-gate, its own gate **HG-17**, its own commit (8), its own artefact pair
(`vl5-sites-{open,close}.txt`), and a bounded write set of six law-bearing sites with the frozen-copy
and epoch-rule exclusions argued rather than asserted. **X-W0.j** likewise, with **HG-18** carrying
all four conditions **FAIL-AT-AUTHORING measured 0/4** and CC-117's terminal word stated once.
W11 §Dispositions transposes all four and §5 X-W11.a states "authored by its owning wave before this
walk … X-W11 transposes them, never states one first." All four previously-unowned rows now have an
author. Sweep: **117/117 CC-IDs appear in ≥1 wave file** (0 unowned).

**R-B (census → receiving surface). BROKEN IN THE ONE FILE IT NAMES.** X-W0 holds the census event
correctly. W0, W6, W7, W8 and W11 — five files — all point the banked cut at **X-W4.g**. **W4.md
contains no `X-W4.g`, no receiving-surface unit, and no reference to R-B** (0 hits for `W4.g`,
`receiving`, `R-B`), and §10a still closes with the exact sentence R-B ordered replaced: *"they are
named here only so this wave is not read as their home."* The repin-census orphan was not cured; it
was **relocated into a dangling pointer** — the same failure shape as the `V·L5` law keyed to a wave
that was never defined, which X-W0.i exists to retire. See W4-D1.

## (c)–(f) Surviving and newly-found defects

### W0 — Formation · **DEFECT (1)**

The tranche's strongest file: ten units, eighteen gates, `X-W0.j` batch-3-before-the-sitting
sequencing, and an archaeology block that names the receiver-orphan as its own third revisit.

1. **§4's closing bounds claim is falsified by the file's own HG-8.** The table ends
   "**X-W0.j and X-W0.i add no gate script**; every probe is a pasted one-liner, **so no gate in
   this wave invokes a path absent from this table**." **HG-8** (`W0.md:258-261`) invokes
   `node hydrate-reports.mjs && node validate-completeness.mjs` in an ephemeral worktree;
   `docs/tranches/V/megatranche/workflows/hydrate-reports.mjs` is **absent from File Bounds**
   (`validate-completeness.mjs`, `graph-v3.mjs`, `validate-constellation-dag.mjs` are all present).
   Unit .c also invokes it as a generator (`W0.md:116`). The repair added a universal claim wider
   than what it verified. **Fix**: add one row —
   `docs/tranches/V/megatranche/workflows/hydrate-reports.mjs` | `execute, no write (HG-8's replay
   + X-W0.c's regeneration)` — matching W10's idiom for `prm-scroll-timeline.mjs`; or narrow the
   sentence to writes and enumerate the read-only invocation as W6's Bounds law does.

### W1 — Re-gate · **DEFECT (1)**

Untouched since 12:04 and therefore never re-read against R-A. 21/21 born-RED and the B1–B19
transcript remain the corpus's best evidence work.

1. **Commit 8 stamps VERIFIED at this wave's own close, against R-A.** `W1.md:362`: "`docs(X·W1 ·
   close)` | W1-LOG.md final, gate table with verdicts, **four-verb status advanced to VERIFIED**".
   The §L-18 rider repeats it at `:404-405` ("Only after that does the four-verb status advance to
   VERIFIED"), routing VERIFIED to the post-quartet moment — a *third* convention, neither
   own-close-IMPLEMENTED nor X-W11-release. This is the identical defect W5 was repaired for.
   **Fix**: commit 8 advances to **IMPLEMENTED**; the rider's last sentence becomes "…the wave is
   ACCEPTED and CC-029..CC-034 report terminal to the CARRY-CUT-LEDGER; **VERIFIED is stamped only
   at X-W11's release close** (R-A)."

### W4 — Semantic controls · **DEFECTS (2)**

Untouched since 12:15. Its glass-independent partition remains excellent work; both defects are
seams the rulings opened and the repair round never reached.

1. **R-B's receiving surface does not exist.** Five sibling files route the banked atomic cut to
   **X-W4.g**; W4 defines units `.a`–`.d` only and disclaims ownership in §10a. A census PASS at
   X-W0.j therefore fires a unit that no file specifies: no Goal, no Mechanism, no Files, no
   Sub-gate, no File Bounds row for the six impostor sites, no place in §4a's disjointness, no
   commit. **Fix**: author **`### X.W4.g The Glass-8 atomic cut (trigger-gated — CC-044 · CC-003 ·
   the banked W6/W7/W8 limbs)`** with the WAVE_SPEC quartet, an explicit *closed unless X-W0.j's
   census returns PASS* preamble, the trigger's four conditions verbatim, bounds rows for the
   `watercolor-dot` sites and the local paint-only `WatercolorSwatch`, and §4a sequencing against
   .a/.b/.c/.d; replace §10a's final sentence ("named here only so this wave is not read as their
   home") with that ownership; add X-W0 to §10 Depends-on for the census verdict. **Naming note**:
   W4's own units are `X.W4.<x>` (WAVE_SPEC §5 form) while the five siblings write `X-W4.g` — fix
   the glyph in one direction, in the same act that mints the unit, or CC-011's disease is reborn
   inside its own cure.
2. **The ConsoleRail cross-wave sequencing is one-directional.** X-W9's §Disjointness sequences
   X-W9.h after X-W4 on `demo/picker/controls/ComponentSliders/ConsoleRail.vue`; W4 holds that path
   `modify-carve` and its §4a Cross-wave block names only `App.vue` vs X-W5. A W4 writer reading W4
   alone has no notice. **Fix**: one line in W4 §4a Cross-wave — "`ConsoleRail.vue` is also held by
   X-W9.h (`componentDescription()` at `:172-180`); the waves never run concurrently on it."

### W5 — One route, one scene · **DEFECT (1)**

W5-D1 is fixed. The D1/D3-D4 adversarial pairing and E1 witness-protection scoping stand.

1. **X-W2's `Blocks: X-W5` is unreciprocated, and §4a's exclusivity assertion rests on that
   unwritten edge.** `W2.md:284` declares "**Blocks: X-W5** — the o24 LCP-identity re-read and the
   mobile-viewport amputation fact are forwarded from this wave's ENV block." W5's Opens-after names
   X-W4 (+X-W0 for D2's baseline) and §10 enumerates non-dependencies without mentioning X-W2. The
   graph is therefore W0→W1→{W2, W4}, W4→W5 — **W2 ∥ W5 is admissible**, while W5 §4a asserts "**No
   other X wave writes any path above while W5 is open**." W5 holds `e2e/**` (`modify`); W2 holds
   eight `e2e/smoke/**` specs. Worse downstream: **X-W6 shares three exact `modify` paths with
   X-W2** — `demo/picker/visual/HeroBlob.vue` (full `modify` on both sides),
   `demo/scenes/blob/BlobPane.vue`, `demo/color-picker/composables/boot/useAtmosphere.ts` — and
   neither names the other; only the missing W2→W5 edge (W5→W6 is declared) keeps them apart. This
   is the W7-D1/W8-D1 class, one link earlier in the chain. **Fix**: add **X-W2** to W5's
   Opens-after and §10 Depends-on ("reciprocal to W2's `Blocks: X-W5`; the ENV block's LCP-identity
   and mobile-amputation facts are inputs, and W2's boot-path bytes settle before this wave writes
   `e2e/**`"), and narrow W5's `e2e/**` row to the scene-route spec paths it actually writes.

### W9 — Parser and library apotheosis · **DEFECTS (2)**

Both first-pass defects fixed well. The 33-condition table, the RED-first-commit guardrail and the
CC-097 restatement law remain the corpus's strongest gate work.

1. **`eslint.config.js` is held `modify` by two units that run in parallel — an intra-wave §4a
   violation.** `X.W9.a` (`no-non-null-assertion` scoped to `src/css/**`, `W9.md:164-166`) and
   `X.W9.b` (the same rule scoped to `src/transform/**` + `src/foundation/**`, `:183`) both list
   `eslint.config.js` in Files. §4a places them in **different** chains (Chain A `.a→.d→.f`, Chain B
   `.b→.f`) and §4b gives each its own sibling worktree — i.e. concurrent — while asserting "No two
   units hold `modify` on the same path at the same time" and enumerating the shared paths
   (`stylesheet.ts`, `easing.ts`, `subpaths/*`, `transform/*`) **without `eslint.config.js`**.
   WAVE_SPEC §4a and "No hidden cross-wave write conflicts" both bite. **Fix**: name
   `eslint.config.js` in §4a and either fold both rule-object edits into `X.W9.f` (the cut, which
   already integrates both chains) or sequence `.b` after `.a` on that file alone.
2. **The State line's order-independence claim omits a third shared file.** `W9.md:6-8`: "Order-
   independent of X-W2..X-W8 **except on two shared files** … **No other unit is ordered against
   X-W2..X-W8.**" `eslint.config.js` is a third: **X-W4** holds it `modify` (`W4.md:144`, unit .d's
   `no-explicit-any` over the action path) and **X-W8** holds it `modify-carve` (`W8.md:79`; G-6's
   docs-tree ignore, the `demo/@/**` glob deletion, the CC-082 `max-lines` ratchet). The repair
   sharpened this sentence into a falsifiable universal and it is false. The three carves are
   region-disjoint in intent, but no file declares the sequencing. **Fix**: add a third §4a
   Cross-wave row — "`eslint.config.js` is written by X-W4 (.d), X-W8 (.b/.d) and this wave (.a/.b);
   the four waves never run concurrently on it; this wave adds only the two `src/**`-scoped rule
   objects" — and amend the State sentence to "three shared files".

## Tranche-level read, second pass

**Ordering graph.** W0→W1→{W2, W3, W4}; W4→W5→W6→{W7, W8}; W3→W7→W8; W9 free after W0 (two declared
carves); {W5..W9}→W10→W11. **No cycles.** Reciprocity now holds for W6↔W7, W6↔W8, W3↔W7, W4↔W5,
W4↔W6, W4↔W7, W5↔W6, W5↔W8, W7↔W8, W8↔W10, W9↔W10, W10↔W11, W0↔all, W1↔{W2,W6,W7,W11}. **Two edges
remain one-directional**: W2→W5 (W5-D1) and W4→W9 on ConsoleRail (W4-D2). W5→W7 is unreciprocated in
text but transitively closed through W6; not booked.

**Bounds law.** Three idioms now coexist: W6 enumerates read-only-invoked instruments and argues
they take no row; W10 gives its read-only probe an explicit `execute, no write` row; W0 asserts a
universal its own HG-8 falsifies (W0-D1). W6's and W10's are both defensible; **one should be
ratified** so the next pass has a single rule. Every *new* script any wave creates is bounded
(W1 ×3, W2 ×1, W5 ×2 incl. the `workflows/gates/*.mjs` glob, W6 ×9) — the W6 defect class is
extinct. W4's `navprobe.mjs` (artefact 7, read-only re-run) carries neither row nor rationale;
observation, not a defect, since no numbered gate invokes it.

**117-row reachability (W11 G1).** Complete. Every CC-ID resolves to ≥1 wave file; every terminal
word has a named author; the 11 BLOCKED-ON rows carry their §1.M conditions verbatim in W11's
release table and are never converted to carries. **One qualification**: the bank's *receiving*
surface named by that table — X-W4.g — does not exist (W4-D1). G1's walk still terminates (the rows
read BLOCKED-ON either way), so the count is sound; what fails is the trigger-fire path.

**Denominator law: still clean.** No unqualified `264/264` anywhere; no `proof-*.mjs` authored; W0
HG-6 and HG-7 bind the whole tranche; W8's C-16 census-before-bounds, W7's N-fixtures, W9's G28
restatement against 1,636,680 µs, and W11's G2 "the test denominator may rise, never fall" survive
the repairs intact.

**Superlatives (L-18 runs both ways).** W6's Bounds law paragraph is the model repair of the round —
it fixed the letter *and* authored the rule the letter came from. W0's HG-18 records
FAIL-AT-AUTHORING 0/4 with all four probes pasted, then makes the FAIL a *result* rather than a
deferral. W9's G28/G33 repair marked the legs honestly instead of relabelling to make a count true.
W11's §7 turns its own lint red into an X-W8 regression with a named return address. W8 corrected
its own consumer-file arithmetic (33→42 of 48) while fixing an ordering row it was not asked to
re-measure.

**Tranche-ready: NO.** Two blockers, both structural rather than editorial: **W4-D1** (five files
route the banked atomic cut to a unit that does not exist) and **W9-D1** (two concurrent units and
their own worktrees write one file, against §4a and the hidden-write-conflict prohibition). W0-D1,
W1-D1, W4-D2, W5-D1 and W9-D2 are single-edit fixes. All seven have exact fixes above; none requires
re-planning a wave.

---

*Second-pass adjudication complete 2026-08-03. 12 files · 7 CONFORMANT · 5 DEFECTIVE · 7 numbered
defects · 9/9 first-pass defects fixed on the merits · R-A applied 11/12 · R-C/R-D applied 12/12 ·
R-B applied 5/6 (X-W4 omitted, and it is the receiving file) · 117/117 ledger rows reachable ·
2 one-directional ordering edges remain.*

---

# THIRD PASS — post-repair re-adjudication, 2026-08-03

**Seat**: fresh Fable conformance adjudicator (L-20), third pass. **Inputs read whole**:
`WAVE_SPEC.md` · `CARRY-CUT-LEDGER.md` §0/§1/§2 · all twelve `waves/W{0..11}.md` at their
post-repair bytes (`git status`: W0, W1, W4, W5, W9 modified since the second pass; W2, W3, W6, W7,
W8, W10, W11 untouched). Passes one and two above are dated evidence and are not rewritten. All
verification read-only; docs-only write (this file). Rulings **R-A** (stamping site), **R-B**
(X.W4.g receiving surface + alias) and **R-E** (bounds idiom = W10's, tranche-wide) applied as
given, not re-litigated.

**Verdict roster**: **7 CONFORMANT** (W0, W1, W3, W5, W7, W9, W10) · **5 DEFECTIVE**
(W2, W4, W6, W8, W11) · **6 numbered defects**. **NOT tranche-ready.**

## (a) Second-pass defects — repair audit

| second-pass defect | status |
|---|---|
| W0-D1 universal bounds claim falsified by HG-8 | **FIXED on the merits** — the universal sentence is **deleted** (§4 now ends at the table) and `workflows/hydrate-reports.mjs` carries `execute, no write (HG-8's clean-worktree replay + X-W0.c's ledger regeneration)` (`W0.md:85`). Every W0 gate-invoked script now has a row: `validate-completeness.mjs` (modify-carve) · `hydrate-reports.mjs` · `graph-v3.mjs` (create) · `validate-constellation-dag.mjs` (modify-carve) |
| W1-D1 commit 8 stamps VERIFIED | **FIXED** — commit 8 reads "four-verb status advanced to IMPLEMENTED (VERIFIED is stamped only at X-W11's release close)" (`W1.md:363`) and the L-18 rider now closes "…the wave is ACCEPTED and CC-029..CC-034 report terminal…; VERIFIED is stamped only at X-W11's release close (R-A)" (`:406`) — ACCEPTED and VERIFIED separated, not conflated |
| W4-D1 R-B's receiving surface does not exist | **FIXED, and it is the round's principal repair** — `### X.W4.g The Glass-8 atomic cut` exists (`W4.md:277-328`) with the full WAVE_SPEC quartet, the **CLOSED unless X-W0.j's census returns PASS** preamble, the four trigger conditions verbatim, a **second File Bounds table** of 13 trigger-gated rows (incl. `WatercolorSwatch.vue` create and `a11y-swatch-seat.spec.ts`), a §4a sequencing bullet, four sub-gates G1–G4 held **out** of §6's 16 with their own falsifiers, commit 7, artefact 9, and X-W0 added to §10 Depends-on. §10a's disclaiming sentence is replaced by "**This wave owns the receiving surface** (R-B) … The bank is no longer an unresolved pointer." Arithmetic re-checked: 16 gates = 5+3+4+4, 13 RED = 4+2+4+3; 13 bounds rows = 4 impostor SFCs + 7 importers + 2 new files = the 11 imports the mechanism deletes |
| W4-D2 ConsoleRail one-directional | **FIXED** — `W4.md:196-197` reciprocates X-W9.h with the line and range cited |
| W5-D1 X-W2 edge unreciprocated | **FIXED, and over-delivers** — X-W2 in Opens-after (`W5.md:6`), §10 Depends-on (`:342-344`) and a §4a Cross-wave block (`:135-141`); the `e2e/**` glob is **narrowed to six named spec paths** and W2's seven are enumerated to prove file-disjointness. The narrowing is the substantive half: the glob was the hidden conflict |
| W9-D1 `eslint.config.js` held by two concurrent units | **FIXED at the root** — both rule objects are folded into `X-W9.f`, which "is the sole writer" (`W9.md:101`, `:132-137`); `.a`/`.b` drive G5/G10 by explicit `npx eslint --rule` with no config edit, and `.f` re-runs them config-resident as a scope check. The §4a intra-wave paragraph states the sibling-worktree hazard by name |
| W9-D2 order-independence claim omits a third file | **FIXED** — State reads "except on three shared files" with all three named (`W9.md:6-8`); a third §4a Cross-wave block enumerates X-W4's, X-W8's and this wave's region-disjoint carves (`:147-157`) |

**Seven of seven fixed on the merits. No repair is cosmetic, and three (W4's unit .g, W5's glob
narrowing, W9's fold-to-one-writer) cure the disease rather than the citation.**

## (b) R-A, R-B, R-E — application audit

**R-A (stamping site). CLEAN, 12/12.** Status FIELD = `planned` in all twelve. Exactly **one** wave
stamps VERIFIED and it is X-W11, at the release close: `W11.md:22-28` states the rule
("no wave stamps VERIFIED at its own close") and commit 8 carries `IMPLEMENTED→VERIFIED stamps`
with "the per-wave verb stamps this close alone may set (R-A)". W0/W1/W5/W6/W7 close to IMPLEMENTED
with the R-A parenthetical; W2 and W10 state the law in prose; W3/W4/W8/W9 are silent (no stamp
claimed) — admissible. **ACCEPTED ≠ VERIFIED**: no L-18 rider anywhere equates them; W1 and W11
say so explicitly, and W11's rider is the sharpest ("makes X-W11 **IMPLEMENTED** — and, on the
G7/G8/G9 receipts, lets this close stamp **VERIFIED** — but never ACCEPTED").

**R-B (receiving surface + alias). CLEAN.** `X.W4.g` resolves every sibling reference: W0 (§Scope 10,
§Blocked rows, §3a, X-W0.j, HG-18, commit 9, §Blocks, §Archaeology — 9 sites), W6 (H3, §Blocked ×2),
W7 (§2), W8 (Do-NOT-touch ×2, §Receiving surface), W11 (§Dispositions). The alias is stated **once**,
in W4 §10a (`:509-512`): the sibling spelling `X-W4.g` denotes `X.W4.g`, "a search alias, never a
rename — `X.W4.<x>` is the WAVE_SPEC §5 form and is authoritative, exactly as X-W0.i governs the
middot (L-5). No sibling file is re-glyphed." Exactly the ruling, executed without touching five
files.

**R-E (bounds idiom). APPLIED IN 5 OF 12 — the five repaired files only.** W0, W1, W4, W5, W9 all
carry `execute, no write` rows naming the invoking gate, and W9 writes the rule into its own §4
("Every script a gate invokes carries its own row above … no invocation is exempted by prose").
W3, W7 and W10 pass by inspection (W10 is the ratified idiom; W3 and W7 invoke no script outside
their own bounded specs). **W2, W6 and W11 do not** — the repair round never opened them. See
W6-D1, W11-D1, W2-D1.

## (c)–(g) Surviving and newly-found defects

### W2 — Boot boundary · **DEFECT (1)**

The falsifiable byte prediction and the honest demotion of the carried Q14 numbers stand.

1. **`e2e/smoke/perf/serve-built.mjs` is invoked by G3/G4 and carries no bounds row (R-E).** G3's
   and G4's born-RED pilots were run "against a built bundle at `http://localhost:8091`
   (`e2e/smoke/perf/serve-built.mjs`)" and the canonical N≥20 run re-uses that origin; §4 bounds
   four other `e2e/smoke/perf/*` paths but not this one, and Do-NOT-touch does not cover it.
   **Fix**: one row — `e2e/smoke/perf/serve-built.mjs` | `execute, no write (G3's and G4's
   built-bundle origin, re-run unmodified)`.

### W4 — Semantic controls · **DEFECTS (2)**

The new unit .g is well-built — closed-unless-PASS, four conditions verbatim, gates held out of the
open count, one atomic commit. Both defects are seams it and W9's repair opened.

1. **`X.W4.g`'s trigger-gated bounds share four paths with X-W5/X-W6/X-W7/X-W8 and §4a declares no
   cross-wave sequencing for g.** §4a's g-bullet sequences g against `a/b/c/d` only ("never runs
   concurrently with a/b/c/d… if the census fires **mid-wave**"), and the §4a Cross-wave bullets
   cover `App.vue` (X-W5) and `ConsoleRail.vue` (X-W9) — both open-partition paths. But g holds
   `MixSourceSelector.vue` (X-W5 `modify-carve` `W5.md:105`, X-W6 `modify` `W6.md:78`, X-W7 `modify`
   `W7.md:125`), `ColorSpaceSelector.vue` (X-W6 `W6.md:65`, X-W7 `W7.md:122`), `EmptyState.vue`
   (X-W7 `modify-carve` `W7.md:123`) and `Dock.vue` (X-W5, X-W8). The census can PASS at any time
   after X-W0 — that is the whole point of a trigger-gated unit — so g may open while X-W5, X-W6,
   X-W7 or X-W8 is open, writing four of their paths. WAVE_SPEC §4a ("No two parallel waves may
   write the same path") and "No hidden cross-wave write conflicts" both bite, and the receiver was
   authored precisely so the cut would not be ownerless. **Fix**: one §4a Cross-wave line —
   "`X.W4.g` additionally holds `MixSourceSelector.vue` (X-W5/X-W6/X-W7), `ColorSpaceSelector.vue`
   (X-W6/X-W7), `EmptyState.vue` (X-W7) and `Dock.vue` (X-W5/X-W8); on a census PASS the
   orchestrator lands g on clean main with **no other X wave open**, which is what W0 §3a's
   'a PASS is a re-plan event' already requires" — and one matching sentence in §4's trigger-gated
   preamble.
2. **The `eslint.config.js` cross-wave sequencing is one-directional.** `W9.md:147-157` declares
   that X-W4 (.d), X-W8 (.b/.e) and X-W9.f all write `eslint.config.js` and that "X-W9.f sequences
   after both X-W4 and X-W8 close". W4 holds the file `modify` (`W4.md:148`, unit .d's
   `no-explicit-any`) and its §4a Cross-wave block does not name it. A W4 writer reading W4 alone
   has no notice — the identical shape as W4-D2, which this round was told to close reciprocally.
   **Fix**: one §4a Cross-wave line — "`eslint.config.js` is also written by X-W8 (.b/.e) and
   X-W9.f; this wave writes only the action-path `no-explicit-any` object, and the three waves never
   run concurrently on it (W9 §4a)."

### W6 — Instruments and temporal scenes · **DEFECT (1)**

The nine new instruments are bounded, the gate roster is internally consistent, and H1's
new-artefact falsifier stands.

1. **§4's "Bounds law" is the prose-argued exemption R-E abolishes.** `W6.md:105`: "The instruments
   invoked read-only — `…/probes/wb-gradient-stopeditor/gate-{axis,gesture,seat,structure}.mjs` and
   `…/components/wb-gradient-stopeditor/evidence/*` (all verified present today) — **take no bounds
   row**, because a gate that reads them writes nothing." R-E ratifies W10's idiom instead: every
   gate-invoked script gets a row, read-only ones marked `execute, no write` with the invoking gate
   named, "no prose-argued exemptions. One rule, mechanical." Ten distinct instruments are invoked
   by fifteen gates with no row: `gate-axis.mjs` (a3, a4) · `gate-gesture.mjs` (a5, a6, a7) ·
   `gate-seat.mjs` (b1, b2, b4) · `gate-structure.mjs` (c1) · `evidence/parse-probe.ts` (a1) ·
   `WBGSE-O-r3-crossdrag-forcedcolors.mjs` (a2) · `WBGSE-O-r3-gestures.mjs` (a7) · `evidence/p3.mjs`
   (a8) · `p4.mjs` (a9) · `p2.mjs` (a10) · `WBGSE-D-probe4.mjs` (a11) · `WBGSE-D-probe2.mjs` (a12).
   This was the second pass's superlative; R-E supersedes it. **Fix**: delete the exemption sentence
   and add the rows, each `execute, no write` with its gate id — the first clause of the Bounds law
   ("every script a gate invokes is bounded above") then becomes true as written, and the §3a
   halt-on-edit rule survives unchanged as its second clause.

### W8 — Shadcn and graph subtraction · **DEFECT (1)**

Census-before-bounds, the tw-animate-css receipt and the null-DELTA justification are untouched and
still exemplary; the W6 reciprocity repair from the second pass holds.

1. **The `eslint.config.js` cross-wave sequencing is one-directional (the W4-D2 twin).** W8 holds
   the file `modify-carve` (`W8.md:79`) and writes it in **two** units — `.b` (the six dead
   `demo/@/**` globs, G-6's docs-tree ignore, the `no-restricted-imports` ban) and `.e` (the CC-082
   `max-lines` ratchet, "after X.W8.b"). §Disjointness' Cross-wave block names X-W6's five paths and
   `ARCHITECTURE.md` (X-W9, "reciprocated here") but not this file, even though W9 declares the
   three-way sequencing against it and W11 holds it in Do-NOT-touch by name. **Fix**: one
   §Disjointness Cross-wave line — "`eslint.config.js` is also written by X-W4 (.d) and X-W9.f;
   this wave's two carves are the `demo/@/**` globs + docs ignore (.b) and the `max-lines` ratchet
   (.e); the three waves never run concurrently on it (W9 §4a)."

### W11 — Release and verified close · **DEFECT (1)**

R-A's ratification text is authored here and is the tranche's clearest statement of it; the
consumes-never-absorbs triumvirate and the X-W8 G-6 lint attribution both survive the round intact.

1. **Three gate-invoked scripts carry no bounds row (R-E).** (i) `scripts/ci/verify-packed-surface.mjs`
   — G3's probe — appears only in **Do NOT touch**, attributed to its *owner* (X-W9), never to its
   *invoker*; (ii) `docs/tranches/V/megatranche/workflows/safari-real-matrix.js` — G8's probe, named
   by path at `W11.md:289` — is swept under the `docs/tranches/V/megatranche/workflows/**`
   Do-NOT-touch glob whose stated reason is the X-W8 lint cure, so the G8 invocation is nowhere
   dispositioned; (iii) `scripts/ci/boot-smoke.mjs` — G5's probe, named only as "X-W1's restored
   boot-smoke" — has **no** bounds disposition at all, in either table. R-E's rule is the table, not
   the prose or the owner attribution. **Fix**: three rows — `scripts/ci/verify-packed-surface.mjs`
   | `execute, no write (G3's packed-surface probe; X-W9 owns the bytes)` ·
   `docs/tranches/V/megatranche/workflows/safari-real-matrix.js` | `execute, no write (G8's
   real-Safari matrix)` · `scripts/ci/boot-smoke.mjs` | `execute, no write (G5's both-mode boot
   witness; X-W1 authors it)` — and keep the Do-NOT-touch entries as the write-side statement.

## Tranche-level read, third pass

**R-E coverage, mechanically checked.** Every `node`/`npx`-invoked script path across the twelve
files was extracted and matched against the twelve bounds tables. Bounded and correct: W0 ×4,
W1 ×5 (incl. the new `verify-packed-surface.mjs` row), W2 ×1 of 2, W4 ×1, W5 ×4, W9 ×5, W10 ×1.
Unbounded: W2 ×1, W6 ×10, W11 ×3. No **universal exemption claim** survives in W0 (deleted) or W9
(inverted into an inclusion claim that holds); **one survives, in W6 §4** (W6-D1). No wave invokes
a `scripts/**/proof-*.mjs`.

**Ordering reciprocity.** Graph: W0→W1→{W2, W3, W4}; W4→W5→W6→{W7, W8}; W3→W7→W8; W9 free after W0
with three declared carves; {W5..W9}→W10→W11. **No cycles.** Every Blocks claim now has its
Opens-after/Depends-on twin except three, and only one is a hazard:
- **`eslint.config.js`** — declared in W9 only; the shared-write hazard is real because W9 is
  order-independent of W2..W8. **Booked: W4-D2, W8-D1.**
- **`X.W4.g`'s four sibling-owned paths** — declared nowhere. **Booked: W4-D1.**
- **W1 `Blocks: X-W5`** is unreciprocated *and contradicted* — `W5.md:345` reads "No dependency on
  … X-W1's gates". Not booked: the files are write-disjoint, W1 closes before W5 transitively
  (W5←W4←W1), and W5's reading is the defensible one (D1's budget oracle is a node script, so W5 is
  decidable without CI, exactly W9's "soft-couples" shape). **Observation**: W1's Blocks cell should
  be softened to the W9 wording, or W5's §10 should say "soft" rather than "no dependency" — one
  line, either end. W5→W7 remains unreciprocated in text but transitively closed through W6; still
  not booked.

**117-row reachability (W11 G1). COMPLETE, and the trigger-fire path is now intact.** The ledger
carries exactly 117 `CC-` rows; a set-difference against every CC-id occurring in the twelve wave
files returns **∅ in both directions** — 117/117 owned, zero phantom ids. The four rows the first
pass found unowned (CC-011, CC-109, CC-116, CC-117) are authored at X-W0.i / X-W0.j and transposed
at W11 §Dispositions. The 11 BLOCKED-ON rows carry their §1.M conditions verbatim and now route to a
unit that **exists**: on PASS, X-W0.j fires `X.W4.g`, which lands CC-044 + CC-003 + CC-105/106/113/
114/115 and W6's CC-058 limb as one commit; on FAIL, g stays shut and W11's release table transposes
the FAIL. The gap that made the second pass NOT-ready is closed — what remains on that path is
W4-D1's missing cross-wave sequencing, not a missing owner.

**Denominator law: still clean.** No unqualified `264/264`; no `proof-*.mjs` authored; W0 HG-6/HG-7
bind the tranche; W8's C-16 census, W7's N-fixtures, W9's G28 restatement against 1,636,680 µs and
W11's "the test denominator may rise, never fall" all survive the round.

**No new defect introduced by the repairs, with one exception.** W0, W1, W5 and W9's repairs are
clean and self-contained. W4's repair is the exception in a benign direction: authoring `X.W4.g`
was correct and ordered, and it created the cross-wave surface W4-D1 books — the unit had to exist
before its bounds could collide with anything. W9's repair likewise created the half-edge W4-D2 and
W8-D1 book. Both are the cost of moving from "no owner" to "an owner", and both are single-line
fixes.

**Superlatives (L-18 runs both ways).** W4's `X.W4.g` is the round's principal act: a unit authored
to be *closed*, whose gates are deliberately excluded from its wave's count, whose FAIL branch is
recorded as a result rather than a deferral, and whose alias problem was solved by one sentence
rather than five renames — CC-011's disease named, and then not repeated inside its own cure.
W5's repair narrowed a glob instead of adding a sentence, killing the conflict rather than
declaring it. W9 folded two writers into one rather than sequencing them, which is the stronger of
the two fixes it was offered. W0 deleted its false universal instead of narrowing it.

**Tranche-ready: NO — but the blockers are gone.** Neither second-pass blocker survives: the
receiving surface exists, and no two concurrent units share a write path inside any wave. All six
remaining defects are **single-edit, single-section** fixes: three are R-E bounds rows in files the
repair round never opened (W2, W6, W11 — 14 rows total), two are one-line §4a reciprocity
statements (W4, W8), and one is a one-line cross-wave sequencing statement for `X.W4.g` (W4). None
requires re-planning a wave, re-measuring a baseline, or moving a ledger row.

---

*Third-pass adjudication complete 2026-08-03. 12 files · 7 CONFORMANT · 5 DEFECTIVE · 6 numbered
defects · 7/7 second-pass defects fixed on the merits · R-A applied 12/12 · R-B applied 6/6 (the
receiving surface exists; the alias is stated once) · R-E applied 5/12 (W2, W6, W11 unrepaired) ·
117/117 ledger rows reachable with the trigger-fire path intact · 2 one-directional edges remain
(`eslint.config.js`, `X.W4.g`'s four sibling paths) · 0 cycles.*

## Receipt correction — third-pass seat model (scribe, 2026-08-03)

The §THIRD PASS header reads "fresh Fable conformance adjudicator"; the harness receipt records
the seat served by **`claude-opus-5`** (workflow `wf_5f5140a6-4a0`, agent `a6cc90b6319ffe48c`,
233,147 tokens): the reconform seat declared no model and inherited the session model as it stood
at workflow launch. Per the receipts law (M-12/M-23: a seat counts as the model that produced it;
no relabeling), the third pass stands as an **Opus-adjudicated** pass — its findings are admissible
as an L-18-grade challenge and its verdict is ADOPTED, but the M-23 adjudication tier was not met
by declaration. The fourth pass declares `fable` explicitly and states its served model in its own
header. The pass text above is dated evidence and is not rewritten.

---

# FOURTH PASS — post-repair re-adjudication, 2026-08-03

**Served model: `claude-fable-5`** — declared `fable`, stated here per the receipts law (M-23; see
the scribe's correction above — the third pass's findings stand as Opus-adjudicated, and this pass
restores the declared Fable tier).
**Seat**: fresh Fable conformance adjudicator (L-20), fourth pass. **Inputs read whole**:
`WAVE_SPEC.md` · `CARRY-CUT-LEDGER.md` §0/§1/§2 · all twelve `waves/W{0..11}.md` at their
post-repair bytes (mtimes: W1/W2/W4/W6 13:02–13:03, W11 13:02, W8 13:02 modified since the third
pass; W0/W3/W5/W7/W9/W10 untouched). Passes one–three are dated evidence, not rewritten. All
verification read-only; docs-only write (this file). Rulings **R-A**, **R-B**, **R-E** applied as
given, not re-litigated.

**Verdict roster**: **10 CONFORMANT** (W1, W2, W3, W4, W5, W6, W7, W9, W10, W11) · **2 DEFECTIVE**
(W0, W8) · **2 numbered defects**. **NOT tranche-ready.**

## (a) Third-pass defects — repair audit

| third-pass defect | status |
|---|---|
| W2-D1 `serve-built.mjs` no bounds row | **FIXED** — `W2.md:65`: `execute, no write (G3's and G4's built-bundle origin, re-run unmodified)`, verbatim the prescribed row |
| W4-D1 `X.W4.g`'s four sibling paths unsequenced | **FIXED** — both prescribed halves landed: the §4 trigger-gated preamble (`W4.md:151-157`) and a §4a Cross-wave bullet (`:202-205`) name all four paths with their holders, and both cite W0 §3a's "a PASS is a re-plan event". Holdings re-verified against the sibling tables: `MixSourceSelector.vue` (W5 `modify-carve`/W6 `modify`/W7 `modify`) · `ColorSpaceSelector.vue` (W6/W7) · `EmptyState.vue` (W7 `modify-carve`) · `Dock.vue` (W5/W8 `modify-carve`) — all exact |
| W4-D2 `eslint.config.js` one-directional at W4 | **FIXED** — `W4.md:206-208` names X-W8 (.b/.e) and X-W9.f with the never-concurrent clause and the W9 §4a cite |
| W6-D1 Bounds-law prose exemption (R-E) | **FIXED, at full depth** — the exemption sentence is deleted; **twelve** `execute, no write` rows landed (`W6.md:104-115`; the third pass counted ten — the true set is 4 gates + 8 evidence probes, and all 12 are now rows), each naming its invoking gate id(s), all cross-checked against §5's commands (a1–a12, b1/b2/b4, c1 — exact); the rewritten Bounds law (`:117`) is now an inclusion claim citing R-E/W10's idiom, and it is **true as written** |
| W8-D1 `eslint.config.js` one-directional at W8 | **FIXED** — `W8.md:133-135` names X-W4 (.d) and X-W9.f, states W8's two carves (.b globs+ignore, .e ratchet), cites W9 §4a. The W4/W8/W9 three-way declarations are now mutually consistent (.b/.e everywhere) |
| W11-D1 three gate-invoked scripts unbounded (R-E) | **FIXED, exactly as prescribed** — `W11.md:94-96`: `verify-packed-surface.mjs` (G3; X-W9 owns the bytes) · `safari-real-matrix.js` (G8) · `boot-smoke.mjs` (G5; X-W1 authors it), each `execute, no write` with its gate named; the Do-NOT-touch entries survive as the write-side statement — the two-sided idiom done cleanly |

**Six of six fixed on the merits; none cosmetic.** The third pass's **adopted observation** (W1's
`Blocks: X-W5` contradicted by `W5.md:345`) is also repaired, on the W1 end: the Blocks cell drops
X-W5 and a **Soft-couples to: X-W5** paragraph adopts the W9 wording, quoting `W5.md:345` (verified:
that line reads "No dependency on glass-ui, the API, X-W1's gates, or any §1.M bank row") and
stating the transitive order W5←W4←W1. The contradiction is gone in both files' readings.

## (b) Tranche-level mechanical checks, re-run fresh

**R-E coverage.** Every `node`/`vite-node`-invoked script path was machine-extracted from the
twelve files (33 distinct paths) and matched against the twelve bounds tables; the prose-named
invocations (`boot-smoke`, `oracle-slate`, `serve-built`, `regenerate-goldens`,
`layout-utilization`, `app-shell-truth-probe`, `navprobe`, `safari-real-matrix`,
`fourier-value-import-drift`, `verify-packed-surface`) were hand-matched. **Every extracted path has
a row in its invoking wave** — W0 ×4, W1 ×5, W2 ×2, W4 ×1 (`navprobe.mjs`, the third pass's
observation, now a row), W5 ×4, W6 ×21 (9 create + 12 execute), W9 ×5, W10 ×1, W11 ×3; W3/W7 invoke
no script outside their own bounded specs. **One descriptive invocation escapes the extraction and
the tables both**: W8 G-7 (below). No universal exemption claim survives anywhere; W6's and W9's
inclusion claims were both verified true against their own gate rosters.

**Ordering reciprocity + cycles.** Every Blocks claim in all twelve files now has its
Opens-after/Depends-on twin (W0→{W1,W4,W8,W9,W10,W11,all} · W1→{W2,W6,W7,W11} · W2→{W5,W11} ·
W3→W7 · W4→{W5,W6,W7} · W5→{W6,W8,W10} · W6→{W7,W8,W10,W11} · W7→W8 · W8→{W10,W11} ·
W9→{W10,W11} · W10→W11 — checked pairwise), with two benign residuals unchanged from prior passes:
W5→W7 transitively closed through W6, and W7's "Feeds: X-W10" as the weaker verb on a reciprocated
edge. The three `eslint.config.js` writers and the `ConsoleRail.vue`/`ARCHITECTURE.md` carves are
declared from **all** ends. **0 cycles.** The two edges the third pass left one-directional
(`eslint.config.js`; `X.W4.g`'s four sibling paths) are **both closed**.

**117-row set-difference.** The ledger carries exactly 117 `CC-` ids; a sorted set-difference
against every CC-id occurring in the twelve wave files returns **∅ in both directions** — 117/117
owned, zero phantom ids, no range-expansion needed (every id also occurs literally somewhere).

**Denominator law.** Every `264/264` occurrence in the twelve files is the ban or the split law
itself (W0 HG-6/scope/archaeology, W1 §10, W9 §10) — none gates. Every `proof-*.mjs` mention is the
structural ban; `ls scripts/**/proof-*.mjs` → 0. Clean.

**R-A.** `Status: planned` in **12/12** (grep). Sole VERIFIED-stamp site = W11 (its R-A block,
commit 8); every other close-stamp claim reads IMPLEMENTED with the R-A parenthetical or is silent.
ACCEPTED and VERIFIED nowhere conflated. **12/12 clean.** HG-16's own probe re-run:
`grep -L 'COMPLETABLE' waves/W*.md` → empty.

## (c) Defects

### W0 — Formation · **DEFECT (1)**

1. **X-W0.e's declared write surface — "the 46 report-authored axis files" — has no File Bounds
   row.** The unit's Files clause (`W0.md:174`) and HG-11 (`:275`: every motion/PRM assertion
   *across the 46 axes* carries a stamp) bind writes into axis files spanning the 88 component
   slugs on disk, while §4's table bounds only the three named slugs' trees (`:96`) and
   §Disjointness books e as "`audit/components/<three slugs>/**`" (`:110`). ~43 slugs' axis files
   are written outside every bounds row — the same table-vs-gate mismatch class as the second
   pass's W0-D1, one row over. **Fix**: one §4 row —
   `docs/tranches/V/megatranche/audit/components/**` | `modify (X-W0.e's HG-11 quarantine stamps in
   the 46 REPORT-AUTHORED axes only)` — and the matching widening of §Disjointness's e-line; **or**
   re-point HG-11's stamps at the now-landed quarantine record (below), dropping the axis-file
   writes entirely.

### W8 — Shadcn and graph subtraction · **DEFECT (1)**

1. **G-7 invokes the typed-graph oracle without naming its path, and the script has no bounds row
   (R-E).** G-7 reads "Run under X-W0's typed graph authority over `demo/**`" — the oracle is
   `docs/tranches/V/megatranche/workflows/graph-v3.mjs` (W8 §Dependencies: "typed graph authority =
   G-7's oracle"; W0 HG-14 creates it), and the wave **executes** it: §Verification Artefacts banks
   "the G-7 graph-oracle output **before and after**", and G-7's falsifier ("reintroduce the
   `Dock.vue → './'` edge; the oracle must go RED") requires running it on a mutated tree. No W8
   bounds row or Do-NOT-touch entry covers it, and the gate names no command — the descriptive
   invocation is exactly the prose exemption R-E abolishes, and it evaded three passes' literal-path
   extraction *because* no path is written. **Fix**: one row —
   `docs/tranches/V/megatranche/workflows/graph-v3.mjs` | `execute, no write (G-7's SCC oracle over
   demo/**; X-W0 authors the bytes)` — and G-7's probe line states the command
   (`node docs/tranches/V/megatranche/workflows/graph-v3.mjs …`), matching W10's idiom.

## Observations (not booked)

- **W6 H2's born-RED baseline is stale at the current tree, in the benign direction.**
  `audit/codex-provenance/motion-quarantine.md` — "does not exist, verified 2026-08-03" at
  authoring — now **exists and is tracked** (32,260 B, mtime 12:21, before W6's 13:03 repair
  edit): the sibling lane landed the 46-file two-guard quarantine record mid-day. The `test -f`
  leg is green; H2's remaining legs (every MOTION-SOURCED assertion cites it) stay W6's own and
  the D-19 re-measure-at-open duty governs. This also removes the only reading under which H2's
  cure was ownerless. Not a defect — dated evidence is dated — but the open-time re-measure is now
  load-bearing, and X-W0.e's fix above should prefer the re-point option this record enables.
- **W4's cite `W0.md:327` for the census 0/4 drifted one line** (now `:328`) after W0's 12:46
  repair shifted the file. Single-line anchor drift into a sibling; the corpus's line-anchor law
  already handles it at open.

## Tranche-level read, fourth pass

**No new defect was introduced by the six repairs.** All six are additive rows or declarations;
each was verified against the surface it cites (W6's twelve rows against §5's commands; W11's three
against G3/G5/G8; W4's four paths against the sibling tables; the eslint three-way against all
three files). The two defects above are **misses of prior passes on unchanged bytes**, not
regressions: W0's axis-row gap survived because the second pass's bounds audit stopped at HG-8's
script, and W8's oracle survived because R-E's mechanical extraction keys on literal paths — which
is itself the finding: a gate that invokes by description defeats the check that R-E installs.

**Superlatives (L-18 runs both ways).** W6's repair went deeper than the defect it was handed —
twelve rows where ten were booked, each naming its gate ids, and the Bounds law rewritten into a
verifiable inclusion claim. W11's repair kept the Do-NOT-touch entries as the write-side statement,
minting the cleanest two-sided (execute-row + write-ban) idiom in the corpus. W1's soft-couples
repair executed an *observation* with a live, verified citation rather than a soft word. And
outside the round entirely: the sibling lane's `motion-quarantine.md` (per-assertion, two-guard,
`file:line` rulings over all 46 axes) converts W6 H2's hardest leg from owed work into a landed,
tracked fact — CC-027's substance, delivered while the passes argued about its bounds.

**Tranche-ready: NO — by the thinnest margin yet.** Ten of twelve waves are clean; both remaining
defects are single-edit bounds/gate-naming fixes in files the repair rounds never opened for these
seams (W0 §4 + one §Disjointness line; W8 §File Bounds + one G-7 command line). No re-planning, no
re-measurement, no ledger motion.

---

*Fourth-pass adjudication complete 2026-08-03. 12 files · 10 CONFORMANT · 2 DEFECTIVE · 2 numbered
defects · 6/6 third-pass defects + the adopted W1 observation fixed on the merits · R-A 12/12 ·
R-B intact (receiving surface + alias unchanged) · R-E 11/12 (W8's descriptive invocation the sole
residual) · 117/117 ledger ids, ∅ set-difference both directions · 0 cycles · 0 one-directional
edges remaining · denominator law clean.*

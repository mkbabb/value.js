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

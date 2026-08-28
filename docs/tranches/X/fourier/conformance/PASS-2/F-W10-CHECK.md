# F-W10 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 2)

**Subject**: `docs/tranches/X/fourier/waves/F-W10.md` (340 lines, `status: planned`, working-tree ` M`)
**Corpus authority**: the 66 `fr-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
**Real carries**: `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` ONLY (`find carry -type f` → exactly 2 — no `F-W10-CARRY.md`, and none minted)
**Seat**: fresh adversarial reader, 2026-08-28. **Re-derived, not inherited** — PASS-1's roster was treated as a claim to test, never as an obligation set to copy.
**Census detector law applied**: every routing token matched in BOTH hyphen and en-dash (U+2013) form.
**Verdict**: **DEFECTIVE** — the repair genuinely cured PASS-1 D1/D2/D3/D4/D6 at the bytes, but D5's *mechanism* survived it, and the repair round introduced two new defects of its own.

---

## §0 Method

Three obligation sets, unioned and deduped by `(record, line)` anchor.

| set | basis | count |
|---|---|---|
| **A · digraph** | every `F.W9/W10` routing identity in the 66 records | **26** |
| **B · by-mechanism** | entrants §2.2 admits without a digraph leg | **5** |
| **C · strict NO-WAVE-OWNER** | row-level lines carrying a strict NO-WAVE-OWNER disposition, owed a terminal home at the §3.3 deadline **this spec declares is itself** | **81** |
| | **union, deduped by anchor** | **110** |

**Carried** = the banked id OR the `record:line` anchor appears in `F-W10.md`, OR the row is named in the §2.5a class-level verb over the loose candidates.

### §0.1 Detector law — en-dash sweep (clean)

```
grep -o 'F\.W9/W10'  fr-*.md | wc -l        → 54   (25 of 66 records)
grep -o 'F.W9–W10'   fr-*.md | wc -l        → 0    (no en-dash routing form exists)
grep -o 'F–W'        fr-*.md | wc -l        → 0
grep -o 'F-W10'      fr-*.md | wc -l        → 0
grep -o 'F\.W10'     fr-*.md | wc -l        → 0    (no bare F.W10 routing anywhere)
grep -o 'NO–WAVE'    fr-*.md | wc -l        → 0
grep -o 'NO-WAVE-OWNER' fr-*.md | wc -l     → 167  (56 records)
```
**No en-dash routing token exists in the corpus.** The hyphen sweep is therefore complete, and the spec's counts are not hiding an en-dash tail.

---

## §1 ID-KEYED CENSUS — sets A and B: **31 routed · 31 booked · 0 escaped · CLEAN**

### §1.1 The 54, re-anatomised independently — the spec's decomposition is EXACT

Re-derived line-by-line from the 54 hits, not copied from PASS-1:

| class | measured | spec §2.1 claims |
|---|---|---|
| routing identities | **26** | 26 ✅ |
| routing-law boilerplate (header line listing every wave id) | **14** | 14 ✅ |
| same-identity restatements (`fr-App:142` · `fr-PaperArticleWindow:186`) | **2** | 2 ✅ |
| verdict / adjudication prose | **12** | 12 ✅ |

The **"seven records yield ZERO re-cut rows"** claim (VisualizationView, CoefficientsPanel, FrequencyGraph, HarmonicLevelGrid, InfoCard, CanvasOverlayButton, AdminUserList) — each measures exactly **1** hit and each is the header line. **VERIFIED.**

### §1.2 The 26 routing identities — all resolve at the bytes

Every one of the 26 was re-resolved at its cited `record:line` and the banked id read off the byte. **26/26 exact.** Spot receipts:

- `fr-AdminAuditLog:87` → `- **AA-44 · L-18.** Zero frontend tests; nine e2e specs never exercise the audit tab…` ✅
- `fr-Tooltip:26` → `- **FR-TT-1 = D-1 / L-4 — BLOCKER (FOLD).** The shim is the only label on **17** icon-only triggers…` ✅ (the 17-count the spec quotes is the record's own)
- `fr-PaperArticleWindow:199/:200` → `**PAW-49**` / `**PAW-50**`, both flagged `⟨re-cut⟩` to F.W0/F.W4 ✅
- `fr-UserSlugBar:53` → `- **FR-USB-16 · r1-MISSED-5 ≡ r2-MISSED-1 — ADJUDICATED MAJOR (r2's MINOR overruled…)**` ✅

**26 booked · 0 escaped · 0 re-booked.** Cut arithmetic: 23 → F.W9 · 1 → F.W0 · 1 → F.W4 · 1 → F.W10.

### §1.3 By-mechanism entrants (set B): **5 routed · 5 booked · 0 escaped**

`FR-AUL-16` (fr-AdminUserList:54) · `FV-26` (fr-FullscreenViewer:79) · `FR-COB-20` (fr-CanvasOverlayButton:74) · `FR-AH-45` (fr-AppHeader:108) · `PAW-33` (fr-PaperArticleWindow:89) — all five present, all five anchors resolving to the named id.

---

## §2 THE ESCAPES — set C: **81 strict routed · 65 booked · 16 escaped**

### §2.1 Root cause — the roster was inherited, not re-derived

`RULINGS.md` R-7.2 directed the cure as: *"The drain roster becomes **23 homed + the 36-strict roster of F-W10-CHECK §2.1**."* §2.5a complied **exactly** — and says so: *"the check's §2.1 roster is 28 table rows enumerating 37 banked ids … the remaining **36** land here."*

**The roster was therefore measured against PASS-1's check file, never against the 66 records.** PASS-1's set C was itself a subset, so its blind spot propagated intact through the repair. This is PASS-1 D5's own mechanism — *"a drain complete-looking because it counted only what it chose to look at"* — surviving the cure with a larger number attached to it.

The spec's own §4b makes the measurement basis explicit and correct in law: §3.1 closes *"measured against the 66 `fr-*.md` **and** `conformance/PASS-1/F-W10-CHECK.md`"*. The drain took only the second conjunct.

### §2.2 The 16 strict escapes (id · anchor · in-record disposition verbatim)

Each carries the **strict** `→ NO-WAVE-OWNER` form — so by §2.5a's own stated criterion (*"their in-record disposition token is weaker than the strict NO-WAVE-OWNER form"* defines the loose class) each belongs in §2.5a's **table**, not in the class-level verb. None appears in `F-W10.md` by banked id, by `record:line` anchor, or by record name.

| banked id | anchor | in-record disposition (verbatim) | in spec? |
|---|---|---|---|
| **11** | fr-ImageUpload:45 | MAJOR — *"The corpus never swept the adjudicated registry"* … `→ **NO-WAVE-OWNER** (procedural — binds SS-3/SS-4 spec authoring…)` | record cited at `:61` only |
| **C-3** | fr-GalleryInfiniteGrid:50 | MAJOR — *"carried **NO-WAVE-OWNER → SS-3/SS-4** as census methodology"* (folds by reference to FR-GFC-3) | record cited at `:82` only |
| **M-7** | fr-SvgFilters:91 | *"Two of three axes' library proof cells are not re-runnable as published. **→ NO-WAVE-OWNER** (fleet provenance note…)"* | `fr-SvgFilters` → **0** |
| **L:L-16** | fr-PaperSearchDropdown:75 | *"INFO, LATENT · FOLDS into banked fr-PaperSearch L-19 — **NO-WAVE-OWNER**"* | `fr-PaperSearchDropdown` → **0** |
| **i-1 = L-INFO-2** | fr-BasisSelector:92 | *"→ **NO-WAVE-OWNER** (SS-3/SS-4 census input)"* | `fr-BasisSelector` → **0** |
| **i-2 = L-INFO-1** | fr-BasisSelector:93 | *"→ **NO-WAVE-OWNER** (SS-3/SS-4 census methodology)"* | `fr-BasisSelector` → **0** |
| **§4 (method row + bypass)** | fr-VisualizationView:103 | *"Method → **NO-WAVE-OWNER (SS-3/SS-4)**; bypass → F.W1/F.W4"* | record cited at `:99` only |
| **i-5 = L-18** | fr-MobileFloatingToc:93 | *"INFO → **NO-WAVE-OWNER (SS-3/SS-4)**"* | record cited at `:66` only |
| **i-5** | fr-CoefficientsSpectrum:101 | *"census methodology, **→ NO-WAVE-OWNER (SS-3/SS-4)**"* | record cited at `:68` only |
| **29** | fr-ImageUpload:63 | *"→ **NO-WAVE-OWNER** (spec-authoring input: propagate, don't merely preserve)"* | record cited at `:61` only |
| **31** | fr-ContourPreview:64 | *"ADJUDICATED → **NO-WAVE-OWNER** (procedural — binds SS-3/SS-4 spec authoring)"* | record cited at `:71` only |
| **39** | fr-ContourPreview:72 | *"→ **NO-WAVE-OWNER** (comment/cleanup if row 40's wave touches the file…)"* | record cited at `:71` only |
| **41** | fr-ContourPreview:74 | *"→ **NO-WAVE-OWNER** (binds SS-3/SS-4 register)"* | record cited at `:71` only |
| **i-1 = D/i-4** | fr-CollapsibleSection:77 | *"→ **NO-WAVE-OWNER** (census correction, SS-3/SS-4)"* | record cited at `:71`/`:83` only |
| **FOLD — L-14** | fr-EditorControlsDock:100 | *"… **NO-WAVE-OWNER** with the intake identity"* | record cited at `:51` only |
| **C §0 row 7 census correction** | fr-FunctionInput:81 | *"INFO — **NO-WAVE-OWNER** (SS-3/SS-4 spec authoring consumes)"* | record cited at `:62`/`:82` only |

**Not counted as escapes** (correctly disposed): the 16 rows named in the loose-candidate class verb (`FR-IC-11`, `FR-TT-21/-22`, `FR-USB-34/-37/-38`, `PAW-56`, `FR-FG-20/-23`, `FR-EQR-7`, `m-4`, `FR-COB-14`, `N-1`, `D-i2`, `MISSED-2`), and `fr-BasisCanvas:106`'s `L §R5-7`, which §2.5's FR-CP-43 row does cite by name (*"it COMPLETES R5-7/R6-6 + fr-BasisCanvas L§R5-7's demand"*).

**Partial mitigation, recorded**: `F-W4.md:28` §0a NEGATIVE ROSTER does name **PaperSearchDropdown** (*"R5-7 NOT applicable on two independent grounds"*) and **SvgFilters** (*"deriver-leaf MAJOR withdrawn"*) as proven negatives. But those entries dispose of the **R5-7 / deriver-leaf** question only — the escaped rows at those anchors are a code-unit/code-point row (`L:L-16`) and a provenance-drift row (`M-7`). Neither is covered.

### §2.3 Consequence

`§5 Excluded` is headed *"**zero adjudicated registry rows among them** — the exclusions below are boilerplate, other waves' work, producer work, and owner acts."* Sixteen adjudicated registry rows with strict NO-WAVE-OWNER dispositions are neither in §2.5, nor §2.5a's table, nor the loose class, nor §5. **M-25: a spec ignoring adjudicated rows is DEFECTIVE.** G-F10-7's re-denominated falsifier (*"a roster that homes a subset and calls it zero-left-open"*) is self-falsifying at 59 of 75.

---

## §3 AUTHORITY REALITY — every quoted coordinate re-resolved at the bytes

### §3.1 Verified EXACT (the repair's own corrections are sound)

| citation | probe | result |
|---|---|---|
| `F-W1.md:276` — eleven-limb transaction | `sed -n 276p` | ✅ **exact**, and it *is* eleven limbs |
| `F-W1.md:294` — vaul-vue INSIDE | `sed -n 294p` | ✅ *"FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before."* |
| `carry/F-W1-CARRY.md:246` — cross-edge 9 | `sed -n 246p` | ✅ *"9. **F.W1 → F.W9 / F.W10.** The visual-regression checkpoint set…"* |
| `CENSUS-2026-08-03.md:211` | | ✅ *"11. **F.W10 · coordination discharge + close**"* |
| `CENSUS-2026-08-03.md:263` | | ✅ `## §6 — THE ADMISSION GAP` |
| `CENSUS-2026-08-03.md:310-316` | | ✅ §6.7 correction **verbatim**: *"Zero UNVERIFIED credit — every Codex verdict enters the formation through per-claim adjudication (M-21)"* |
| `INTAKE-ADJUDICATION-2026-08-03.md:221` | | ✅ `### NEXT-COMMUNIQUE` |
| `X/waves/W9.md:366` / `:375` | | ✅ G24 row / G33 row |
| `X/waves/W11.md:319` | | ✅ the `^0.13.0` three-majors-stale row |
| `COHESION.md:129` | | ✅ the O-20 dispatch note naming `BK/coordination/` |
| `fr-NotationPills:35` disposition | quoted VERBATIM in §2.3 and §2.5 | ✅ byte-for-byte |
| **E-1** ADOPTION-ASKS re-enumeration | rows `:109`–`:125` counted | ✅ **17 id-rows**, exactly the 17 named; header `:107`, G.W8 stamp `:105` — **PASS-1 D3 CURED and the new number is right** |
| **E-2** relay sweep | `find glass-ui/docs -name 'valuejs-outbound-*.md' \| wc -l` | ✅ **11** (BJ 10 ⊕ BK 1) |
| **E-2** o20 row A-1 | `grep -n '\| A-1'` | ✅ carries `FR-NP-32 ≡ fr-PaperSidebar M1` in its provenance column; `@source`=1, `FR-NP-32`=1, `fourier`=10, 59 lines — **PASS-1 D1/D2 CURED** |
| term sweep, all 11 packets | | ✅ `MetricPill` **0** · `IntersectionObserver` **0** · `latex-paper` **0** — the three RED arms are genuinely RED |
| **E-6** `FOURIER-R*` glob | | ✅ **9** |
| **E-7** latex-paper producer inbox | `ls latex-paper/docs` | ✅ `tranches/` + `virtual-paper.md` — **no coordination/inbox path** |
| **E-9** Codex residue | | ✅ `/tmp/fourier-r4-files.sha256` **GONE**; `~/.codex/worktrees/d0be/fourier-analysis` **still registered** |

### §3.2 DEFECT — all eight `F-W0.md` citations are drifted +12 against the working tree

The spec cites `F-W0.md:199` (×4, at `:39`, `:176`, `:201`, `:306`), `F-W0.md:204` (×2, at `:177`, `:306`), `F-W0.md:209` (×2, at `:189`, `:306`).

```
committed HEAD f6842ef3 : G-11 :199   G-12 :204   G-13 :209     ← what F-W10 cites
working tree (F-W0 ' M'): G-11 :211   G-12 :216   G-13 :221     ← uniform +12
working-tree :199 → (blank line)
working-tree :204 → "**Owning rows**: 18, 17, 19."   (G-9's, not G-12's)
working-tree :209 → "**Owning rows**: 3, 4, 26."     (G-10's, not G-13's)
```

`F-W0.md:9` carries *"**Amendment minute — X·F L-20 repair round 1, 2026-08-28.**"* — **the same repair round that produced this file amended F-W0 and shifted its gate anchors, without re-resolving the eight F-W10 citations that point into it.** Both files are simultaneously dirty.

This lands on the one axis the spec made load-bearing against itself:
- §2.8 header: *"every anchor re-resolved per FR-CP-45's law"*
- §4a.13: *"FR-CP-45's rule governs every anchor this spec quotes"*
- §4b F.W0: *"**divergence from that table is a defect against G-11**, not a rival act"*
- masthead: witnesses *"re-measured read-only 2026-08-28 against value.js HEAD `54a97489`+**worktree**"*

Against the worktree — the artifact the spec names and the one GAB-13 insists is the baseline question — all eight resolve to blank lines or the wrong gate's `Owning rows`. E-4 states *"Corrected anchors used throughout"*; these were not among them.

### §3.3 DEFECT — G-F10-6's shared-bytes leg: the twin already landed a DIVERGENT splice

E-3 states: *"repair round 1 (2026-08-28) splices the R-2b checkpoint set into it as a declared PAIRED edit — byte-identity is RE-WITNESSED only when **the twin's identical splice lands**."*

Measured, both files' §2.2 regions extracted between the `### §2.2` and `### §2.3` headers:

```
F-W10 §2.2 region : 13,273 B
F-W9  §2.2 region : 17,481 B      diff: 26 lines
```

The divergence is not a pending splice. **F-W9 has already landed its own, larger version** — a 4-column checkpoint table headed *"**THE F.W1 VISUAL-REGRESSION CHECKPOINT SET — 8 items, HOMED HERE** (**R-2b**…)"*, 17 lines, absent from F-W10. And `RULINGS.md:95` assigns the direction the other way:

> *"**Cure**: F.W9 books the 8 as one checkpoint table inside the §2.2 SHARED region, citing `carry/F-W1-CARRY.md:246` by path; **F.W10 receives the IDENTICAL bytes by paired splice** (the twins' shared-bytes law: spliced, never retyped)."*

So F.W9 is the **home/author** and F.W10 is the **receiver**. F-W10 instead authored a compact prose paragraph of its own and describes the outstanding act as the twin's. Two consequences:

1. **R-2b is not applied as ruled** — F-W10 did not receive F-W9's bytes.
2. **A reader following E-3 performs the wrong cure**: splicing F-W10's paragraph into F-W9 would overwrite the twin's ruled-in table.

Additionally, the region's very first line differs (F-W9: *"carried **verbatim** from F-W10.md §2.2 — spliced, never retyped"* vs F-W10: *"the **shared bytes** — the twin spliced them verbatim"*), so the in-file assertion *"the twin spliced them verbatim"* is false of the current bytes. The RED **is** disclosed — that part is honest — but its mechanism is mis-stated and its direction inverted.

### §3.4 Drift recorded, NOT charged as a defect

`grep -c 'latex-paper' INBOX.md` → **1** today and `grep -c 'UNREAD'` → **5**, against the spec's stated **0** and **4**. At the spec's **declared baseline** `54a97489` both reproduce exactly (`0` and `4`); commit `7a7dc6ef` (I-28/I-29 rowed) landed after and is not an ancestor of it. HEAD is now `f6842ef3`. The spec declares its baseline and the witnesses hold there; §4a.12's MEASURE-AT-OPEN law already governs. **No conviction** — but G-F10-5's and E-8's witnesses need re-measurement at wave open, and the new I-29 `latex-paper` mention is incidental (a repo list), so the register-does-not-exist mechanism is intact.

---

## §4 GATES (L-19) — 12 gates, every witness probed

| gate | born state | witness probe | verdict |
|---|---|---|---|
| G-F10-1 | RED [measured] | ADOPTION-ASKS `:105`/`:107`/`:109-125` → **17 rows**; INBOX `grep -ni fourier` → **6** | ✅ real, and the corrected denominator is right |
| G-F10-2 | RED [at fourier HEAD `cd26c65`] | `rev-parse --short` → **cd26c65**; `find docs -name INBOX.md` → **0** | ✅ |
| G-F10-3 | RED — MEASURE-AT-OPEN | `…/audit/probes/fourier-value-import-drift.mjs` (4,365 B) | ✅ script EXISTS |
| G-F10-4 | RED [measured] | `web/package.json:18` → `"@mkbabb/value.js": "^0.13.0"` | ✅ |
| G-F10-5 | RED [measured] | `grep -c 'latex-paper' INBOX.md` → **1** at HEAD (0 at declared baseline); COHESION §4a glass-only; `latex-paper` **0** across all 11 packets | ⚠ stale count, mechanism intact (§3.4) |
| G-F10-6 | RED [measured] | 54 / 25 / 66 / bare-`F.W10` 0 — all **EXACT**; §2.2 `diff` **NOT empty** | ✅ counts; ⚠ diff leg mis-narrated (§3.3) |
| G-F10-7 | RED [measured] | 167 / 56 / 94 row-level — **all three re-derived EXACT**; COHESION §4 `grep -c 'fr-'` → 1 | ✅ numbers; ✗ roster (§2) |
| G-F10-8 | RED [measured] | CENSUS `:263`/`:310-316` ✅ · INTAKE `:221` ✅ · glob **9** ✅ · `/tmp` file GONE ✅ · worktree registered ✅ | ✅ |
| G-F10-9 | RED [measured] | INTAKE `:221` vs COHESION §4a | ✅ |
| G-F10-10 | RED [measured] | `ls web/e2e/*.spec.ts \| wc -l` → **8**; `grep -rln "admin" web/e2e/` → **0** | ✅ (E-5's paired disclosure honest) |
| G-F10-11 | RED [measured] | glass-ui installed **4.0.0** ✅; `git status --porcelain \| wc -l` → **exactly 28** ✅; `grep -c 'FR-NP-32'` → **13** (was 0 — **D6 CURED**) | ✅ |
| G-F10-12 | **SPLIT, born honestly** | 11 packets; o20 A-1 carries `FR-NP-32`; `@source`=1 GREEN; MetricPill/IntersectionObserver/latex-paper = 0 RED | ✅ correct in both halves |

**L-19 result: no proof-farm scripts, no phantom paths.** Every named command and file exists and returns what the spec says, with the drift at §3.2/§3.4. All 12 born RED (one honestly SPLIT).

---

## §5 NO INVENTION / M-25 DEPTH · ATOMICITY · POSTURE

**Locks carried where their rows land — CLEAN.** `FR-NP-32` **13×** (by id, cite-both-never-substitute with `≡ fr-PaperSidebar M1`) · `PAW-44` 5× · `LAW-3` 3× · `LAW-4` 2× · `MPC-31` 2× · `FR-MSP-6` 2× · the six same-commit riders enumerated at §4a.6 · harness-before-rider 3× · flag-before-split · seam-before-seat 2× · teleport lock 2× · HOLD-is-RED 4× · the FR-TT-1 promotion lock · the L-11+M2 rename hard lock · GCM-42's console lock.

**F.W3 / F.W4 boundary — no invention.** F-W10 routes to F.W3/F.W4 by citation only and prescribes no cure there, so F.W3's anti-cure roster and F.W4's §0a NEGATIVE ROSTER are not contradicted. Consistency spot-check: F-W4's roster pins *"Tooltip shim | KEEP-AND-REPARAMETERISE … **no deletion row**"*; F-W10 §2.2/§4b route the shim leg to F.W3 *"keeping its R3-7a/X-11 identity"* — **no deletion proposed** ✅. (The `DELETE`-favouring language at FR-COB-20 is CanvasOverlayButton under F8-REACH-02, a different row.)

**ATOMICITY — CURED.** `grep -c` on F-W10: the eleven-limb transaction is **cited whole** at `F-W1.md:276` with vaul-vue INSIDE per `:294` (§4a.3, §2.7 FR-EQR-3, §4a.13), and the three-limb restatement PASS-1 D4 convicted is **gone** — §4a.3 now names that restatement as a forbidden shape. ✅

**POSTURE — CLEAN.**
- `status: planned` — **1** occurrence, no other status token.
- **Zero VERIFIED stamps**: 9 `VERIFIED` tokens, all either the four-verb `VERIFIED **NO**`, prose (*"receipt VERIFIED, not asserted"*, *"F.W10 VERIFIES"*), or `seat-verified` predicates.
- Execution verbs in current/past voice → **0**.
- **Fourier tree READ-ONLY**: §1a's 8 write paths are all value.js-side; §1c excludes all product source in both trees plus `scripts/dev/dev.sh`; *"asked, never made"* stated 5×; every fourier witness is a read (`grep`/`ls`/`find`/`git status`/`rev-parse`/`sed`).
- **SS-4 owner flags inline, never presumed**: the seven rulings enumerated (trie-vs-KISS 3× with the `atomdiff.py:12-14` guardrail-INCUMBENT dissent · remix-vs-fork · born-visibility · visibility-enum · version-`_id` · redaction parity · pagination); `OG-F1`/`OG-F2` 6×; the L-4 escalation carries *"F.W10 CANNOT STAMP TERMINAL DISPOSITION WHILE THE ESCALATION IS UNANSWERED"*.
- **R-3 honoured**: no `F-W10-CARRY.md` invented; the masthead demotes the 77-row provenance to *"HISTORICAL NOTE with no gate weight"*; carries cited BY PATH.

**RULINGS spot-check (those addressed to F-W10).** R-7.1/R-8 (FR-NP-32 FIRST, id in §2.3/G-F10-11) ✅ · R-7.2/.3 (drain re-cut, G-F10-7 re-denominated) ✅ *as directed*, ✗ against the corpus (§2) · R-3 (masthead demoted) ✅ · R-4b (siblings CITE never restate — applied at §4a.3 + §2.7) ✅ · **R-2b ✗** (§3.3).

**Count defect (MINOR).** §2.5a's reconciliation reads *"23 rows from §2.5 (23 ids) ⊕ FR-NP-32 ⊕ the 36-row strict remainder = **SIXTY** banked ids."* But **FR-NP-32 is itself §2.5's head row** (`F-W10.md:142`) and §2.5a's own preamble says so (*"FR-NP-32 heads §2.5"*). §2.5's table measures **23 rows including it**; §2.5a's table measures **36 rows**. The distinct roster is **59**, not 60 — the reconciliation adds FR-NP-32 twice. §4a.13 declares this denominator *"binding on this file against itself"*.

**Cross-wave drift (MINOR).** `RULINGS.md:30` (R-1b) directs F-W7 to cite the trie dissent at *"`F-W5.md:153` (the banked home) **≡ `F-W10.md:114`**"*. After this repair, `F-W10.md:114` is the CODEX-R3–R6 residue row; the trie dissent sits at **`:116`**. The repair shifted the coordinate without a note, so F-W7's ruled citation no longer resolves.

---

## §6 AXES THAT HOLD (recorded so the pass is not read as uniformly hostile)

The repair is substantial and largely excellent. **PASS-1 D1, D2, D3, D4, D6 are all genuinely cured at the bytes**, each with a correct new measurement rather than a hand-wave: the sweep now reads the live `BK/` inbox and correctly finds the eleventh packet and its `FR-NP-32` row; the denominator is re-enumerated to a verified 17/11/6-of-which-4; the F.W1 transaction is cited whole instead of restated; FR-NP-32 is restored 13× under its banked id with its disposition quoted verbatim. G-F10-12 is born SPLIT rather than averaged, and both halves measure correctly. The digraph census is again exemplary — 26 for 26, the 54/26/14/2/12 anatomy exact to the line, and the corpus contains **no en-dash routing form** to hide behind. Dissents are carried in their own words (FR-AFP-49's blocker-weight · reader-2's FR-EMT-11 scope warning · DU's GCM-4 · LC's PAW-12 MINOR · r2's FR-USB-16 overruled-and-recorded · worker-DU's GAB-13 worktree election · OG-V2's Codex-verb dissent · the trie-vs-KISS guardrail-incumbent). No owner ruling is pre-answered anywhere.

---

## §7 CENSUS SUMMARY

| | |
|---|---|
| **routedTotal** (union of A ∪ B ∪ C, deduped by anchor) | **110** |
| — set A · digraph routing identities | 26 (**26 booked, 0 escaped**) |
| — set B · by-mechanism entrants | 5 (**5 booked, 0 escaped**) |
| — set C · strict NO-WAVE-OWNER rows owed at the §3.3 deadline | 81 (**65 booked, 16 escaped**) |
| **bookedCount** | **94** |
| **escapedCount** | **16** |
| **defects** | **5** (3 MAJOR · 2 MINOR) |
| **verdictLocal** | **DEFECTIVE** |

**The repair cured five of PASS-1's seven defects at the bytes and did so with real measurement.** What survives is narrower but structural: the drain roster was taken from the check file rather than the registry, so PASS-1's under-count propagated into a bigger number that is still a subset (16 strict rows escape, and §5 asserts none do); and the repair round amended `F-W0.md` while leaving all eight citations into it drifted by twelve lines, on the exact anchor-law axis this spec declares binding on itself. The R-2b splice was applied in the wrong direction — F-W9 is the ruled home and has already landed a larger table, which E-3 narrates as a pending twin edit.

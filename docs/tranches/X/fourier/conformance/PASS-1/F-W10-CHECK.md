# F-W10 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Subject**: `docs/tranches/X/fourier/waves/F-W10.md` (292 lines, `status: planned`)
**Corpus authority**: the 66 `fr-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
**Seat**: fresh adversarial reader, 2026-08-28. Every number below re-measured read-only in this session.
**Verdict**: **DEFECTIVE** — the digraph census is CLEAN and exact, but six independently receipted defects survive, four of them at gate-witness level.

---

## §0 Method

Three obligation sets were enumerated and unioned by `(record, line)` anchor:

| set | basis | count |
|---|---|---|
| **A · digraph** | every `F.W9/W10` routing identity in the 66 records (the ONLY W10 markup that exists — see §1) | **26** |
| **B · by-mechanism** | the entrants F-W10 §2.2 itself admits enter without a digraph leg | **5** |
| **C · NO-WAVE-OWNER** | row-level lines carrying a NO-WAVE-OWNER disposition, owed a terminal home at the §3.3 deadline **this spec declares is itself** (§4b X-whole: *"§3.3 … closes HERE"*) | **94** (50 strict) |
| | **union, deduped by anchor** | **121** |

**Carried** = the banked id OR the `record:line` anchor appears anywhere in `F-W10.md`.

---

## §1 ID-KEYED CENSUS — the digraph (set A): **26 routed · 26 booked · 0 escaped · CLEAN**

### §1.1 The 54, anatomised — the spec's own decomposition verified EXACT

```
grep -o 'F\.W9/W10' fr-*.md | wc -l   → 54
grep -l 'F\.W9/W10' fr-*.md | wc -l   → 25   (of 66)
grep -o 'F\.W10'    fr-*.md | wc -l   → 0    (no bare F.W10 routing anywhere)
grep -onE 'F[.·-]?W ?9? ?/? ?W?10|W10|wave 10' fr-*.md | uniq -c
                                       → 54, ALL of form `F.W9/W10`. No other W10 markup exists.
```

The spec's §2.1 anatomy table claims **26 routing / 14 boilerplate / 2 restatement / 12 verdict-prose**. Re-derived line-by-line, this is **exactly right**:

**14 boilerplate** (routing-law header lines listing every wave id — mint no rows):
`fr-AdminAuditLog:31` · `fr-AdminUserList:28` · `fr-AdminFlaggedPanel:38` · `fr-CanvasOverlayButton:36` · `fr-CoefficientsPanel:29` · `fr-ContourPreview:30` · `fr-EquationView:41` · `fr-FrequencyGraph:29` · `fr-GalleryAdminBanner:33` · `fr-GalleryView:30` · `fr-InfoCard:33` · `fr-HarmonicLevelGrid:36` · `fr-PaperView:35` · `fr-VisualizationView:39`

**2 same-identity restatements**: `fr-App:142` (re-states `fr-App:91`'s C-13) · `fr-PaperArticleWindow:186` (R2-7 re-states PAW-12's booked rider)

**12 verdict / adjudication prose**: `fr-AdminAuditLog:142` · `fr-AdminFlaggedPanel:169` · `fr-ContourPreview:137` · `fr-EquationModeToggle:93` · `fr-EquationResult:127` · `fr-GalleryAdminBanner:122` · `fr-GallerySearchBar:124` · `fr-PaperArticleWindow:157` · `:247` · `:254` · `fr-PaperSidebar:124` · `fr-PaperView:214`

**The spec's "seven records yield ZERO re-cut rows"** — VisualizationView, CoefficientsPanel, FrequencyGraph, HarmonicLevelGrid, InfoCard, CanvasOverlayButton, AdminUserList — each measures exactly **1** hit, and each is the header line. VERIFIED.

### §1.2 The 26 routing identities, id-for-id

| # | anchor | banked identity | cut in §2.2 | carried? |
|---|---|---|---|---|
| 1 | fr-AdminAuditLog:87 | **AA-44** | F.W9 | ✅ BOOKED |
| 2 | fr-AdminFlaggedPanel:95 | **FR-AFP-42** | F.W9 | ✅ BOOKED |
| 3 | fr-AdminFlaggedPanel:110 | **FR-AFP-49** | F.W9 | ✅ BOOKED |
| 4 | fr-App:91 | **C-13 (App)** | F.W9 | ✅ BOOKED |
| 5 | fr-ContourPreview:71 | **38** | F.W9 | ✅ BOOKED |
| 6 | fr-EquationModeToggle:41 | **FR-EMT-11 (= C-16)** | F.W9 | ✅ BOOKED |
| 7 | fr-EquationResult:41 | **FR-EQR-6** (axe leg) | F.W9 | ✅ BOOKED |
| 8 | fr-EquationResult:72 | **FR-EQR-31** | F.W9 | ✅ BOOKED |
| 9 | fr-EquationView:62 | **D·D-B2** (axe leg) | F.W9 | ✅ BOOKED |
| 10 | fr-EquationView:191 | **C·D-28** | F.W9 | ✅ BOOKED |
| 11 | fr-FunctionInput:80 | **C-13 = D-24** | F.W9 | ✅ BOOKED |
| 12 | fr-GalleryAdminBanner:49 | **GAB-10** (coverage half) | F.W9 | ✅ BOOKED |
| 13 | fr-GalleryCardModal:93 | **GCM-42 (= L-14)** | F.W9 | ✅ BOOKED |
| 14 | fr-GallerySearchBar:54 | **FR-GSB-17** | F.W9 | ✅ BOOKED |
| 15 | fr-GalleryView:78 | **FR-GV-36 (= L-24)** | F.W9 | ✅ BOOKED |
| 16 | fr-ImageUpload:61 | **27** | F.W9 | ✅ BOOKED |
| 17 | fr-PaperArticleWindow:58 | **PAW-12 (= C-M-2/L-8/C-m-2)** | F.W9 | ✅ BOOKED |
| 18 | fr-PaperArticleWindow:90 | **PAW-34 (= C-i-5)** | F.W9 | ✅ BOOKED |
| 19 | fr-PaperArticleWindow:199 | **PAW-49** | **F.W0** ⟨re-cut⟩ | ✅ BOOKED |
| 20 | fr-PaperArticleWindow:200 | **PAW-50** | **F.W4** ⟨re-cut⟩ | ✅ BOOKED |
| 21 | fr-PaperSidebar:49 | **D-B2** (axe leg) | F.W9 | ✅ BOOKED |
| 22 | fr-PaperSidebar:58 | **C-M4** | F.W9 | ✅ BOOKED |
| 23 | fr-PaperSidebar:67 | **M7** | F.W9 | ✅ BOOKED |
| 24 | fr-PaperView:120 | **D/i-1** | F.W9 | ✅ BOOKED |
| 25 | fr-Tooltip:26 | **FR-TT-1** (promotion note) | **F.W10** ⟨re-cut⟩ | ✅ BOOKED |
| 26 | fr-UserSlugBar:53 | **FR-USB-16 (≡ r1-MISSED-5 ≡ r2-MISSED-1)** | F.W9 | ✅ BOOKED |

**26/26 carried. Zero escapes. Zero re-books. 23 → F.W9 · 1 → F.W0 · 1 → F.W4 · 1 → F.W10**, arithmetic consistent with §4b's "The 23 F.W9-cut execution limbs".

### §1.3 By-mechanism entrants (set B): **5 routed · 5 booked · 0 escaped**

`FR-AUL-16` (fr-AdminUserList:54) · `FV-26` (fr-FullscreenViewer:79) · `FR-COB-20` (fr-CanvasOverlayButton:74) · `FR-AH-45` (fr-AppHeader:108) · `PAW-33` (fr-PaperArticleWindow:89) — all five present, all five with their anchors resolving to the named id.

### §1.4 Anti-rename spot-audit (46 anchors)

46 banked ids cited by F-W10 were re-resolved at their cited `record:line`. **45 resolve exactly**; the 46th (`fr-PaperSidebar:66`) is a legitimate combined citation — the spec writes `L-4 = C-B2 = D-N10 (+M6)` at `:33/:66`, and `:66` carries the `(+M6)` leg. **No renames, no phantom ids, no re-books detected.**

---

## §2 THE ESCAPES — the NO-WAVE-OWNER register (set C)

**61 of the 121 union anchors appear nowhere in `F-W10.md`, by id or by anchor. All 61 are NO-WAVE-OWNER rows. 36 of them carry an unambiguous NO-WAVE-OWNER *disposition* (arrow/dash/parenthesis-adjacent) and are the convicting core.**

The spec's own posture makes these its debt:
- §2.5 heading: *"The NO-WAVE-OWNER drain, **F-side** … COHESION §3.3 deadline — F.W10 is the last F wave, **nothing leaves it un-homed**"*
- §2.5 closing: *"**Twenty-three rows, twenty-three verbs, zero left open.**"*
- G-F10-7 falsifier: *"every one of the **23** rows bears a TERMINAL verb"*
- §4b X-whole: *"§3.3 (every NO-WAVE-OWNER row terminally homed — **the deadline**) closes HERE"*
- And `F-W9.md:243` explicitly **refuses** the drain: *"FR-AUL-16 and FR-AH-45 have no honest home today; P-12 proposes their execution limbs here and **F.W10 decides terminal**."* — F.W10 is the sole drain.

Measured: `grep 'NO-WAVE-OWNER' fr-*.md | wc -l` → **167** occurrences across **56** records; **94** are row-level lines after stripping routing-law boilerplate; **50** carry a strict NO-WAVE-OWNER disposition. §2.5 homes **23**. §5 Excluded carries **no line** for the remainder.

### §2.1 The 36 strict escapes (id · anchor · disposition verbatim)

| banked id | anchor | in-record disposition |
|---|---|---|
| **FR-NP-32** | fr-NotationPills:35 | *"**BLOCKER — NO-WAVE-OWNER (producer dist emitter) + glass-ui BH relay at the TOP of the FR-COB-28 packet; F.W1 SEQUENCING GATE**"* |
| FR-NP-11 | fr-NotationPills:52 | "MINOR, FOLDS to banked FR-COB-12 — NO-WAVE-OWNER (producer) + BH relay" |
| FR-NP-26 | fr-NotationPills:67 | "MINOR, census correction — NO-WAVE-OWNER (SS-3/SS-4)" |
| MM-6 | fr-ContourEditorCanvas:92 | "MINOR (census-corrections bundle; NO-WAVE-OWNER — SS-3/SS-4 spec-authoring input)" |
| L-§4 | fr-ContourEditorCanvas:96 | "INFO · FOLD (census methodology…)" |
| FR-EQC-15 | fr-EqCoefficientsPanel:52 | "INFO (method; NO-WAVE-OWNER)" |
| D/m-12 | fr-EqCoefficientsPanel:76 | census-count row, NO-WAVE-OWNER |
| FR-GIG-20 | fr-GalleryInfiniteGrid:82 | "INFO · NO-WAVE-OWNER (SS-3/SS-4 repair-unit sizing input)" |
| FR-GV-37 | fr-GalleryView:79 | "INFO · NO-WAVE-OWNER (SS-3/SS-4 repair-unit sizing input)" |
| F-6 | fr-GalleryDraftsSection:49 | "INFO; → NO-WAVE-OWNER (SS-3/SS-4 census methodology; F.W5 provenance-contract input)" |
| m-18 | fr-GalleryDraftsSection:83 | "MINOR; → NO-WAVE-OWNER (fleet method)" |
| HLG-32 | fr-HarmonicLevelGrid:88 | glass 4.0.0 unlayered sheet defeats its own PRM press guard — producer-owned |
| FR-MSP-12 | fr-MorphShapePreview:104 | "MINOR — FOLD → FR-COB-26 (new site)" |
| FR-COB-7 · -8 · -23 · -26 · -28 | fr-CanvasOverlayButton:56/57/82/85/87 | five producer-owned rows (incl. the FR-COB-28 relay-instruction row FR-NP-32 rides) |
| M-16 | fr-CoefficientsSpectrum:68 | "MAJOR (method/structural)" |
| M-16 | fr-MobileFloatingToc:66 | "MAJOR" (distinct id, same slug) |
| C-18 · L-8 | fr-AnimationControls:120/124 | value.js-consumption + budget-scope rows |
| C-25 · M-10 | fr-CanvasControlsDock:96/100 | F.W2 cost row + L-axis citation-drift row |
| m-14 · i-7 | fr-CollapsibleSection:71/83 | R5-7 polarity row + three-way severity-spread row |
| i-3 · i-8 | fr-ContourSettings:100/105 | default-collapsed row + R5-7 non-application |
| D-19 | fr-ConvergenceLegend:97 | unlayered-scoped-styles row |
| I-3 | fr-DarkModeToggle:111 | provenance-hygiene method note |
| CITE | fr-EasingCurvePreview:68 | merged provenance mis-anchoring row |
| D-2 | fr-EditorControlsDock:51 | dead magnet-retint block |
| L-m5 · L-i1 | fr-FunctionInput:62/82 | `./chip` absence + R5-7 non-application |
| L·I-2-as-corrected | fr-GalleryCard:87 | R5-7 census-methodology input |
| D-26 | fr-VisualizationView:99 | producer underline-indicator row |
| ★MF-7 | fr-PaperView:113 | permanent `will-change: opacity` compositor row |

Twenty-five further loose candidates (`FR-IC-11`, `FR-TT-21`, `FR-TT-22`, `FR-USB-34/-37/-38`, `PAW-56`, `FR-FG-20/-23`, `FR-EQR-7`, `m-4`, `FR-COB-14`, `N-1`, `D-i2`, `MISSED-2`, et al.) also appear nowhere in F-W10; they are recorded here but not counted as convicting, since their in-record disposition token is weaker.

**Consequence.** G-F10-7's falsifier is satisfiable by homing 23 rows while ≥36 NO-WAVE-OWNER rows stay un-homed at the wave that declares itself the §3.3 deadline. This is the L-18 base the spec names in its own close act — *"a re-cut complete-looking because it counted boilerplate"* — inverted: a **drain complete-looking because it counted only what it chose to look at**.

---

## §3 GATE WITNESSES (L-19) — 12 gates, witnesses probed one by one

| gate | witness | probe result |
|---|---|---|
| G-F10-1 | ADOPTION-ASKS live table `:105/:111/:113/:116/:118`; INBOX `grep -ni fourier` → 6 | anchors **EXIST and resolve exactly**; INBOX 6 ✅ — but the **denominator is wrong** (§4 D3) |
| G-F10-2 | fourier HEAD `cd26c65`; `find docs -name INBOX.md` → 0 | `git -C fourier rev-parse --short HEAD` → **cd26c65** ✅; INBOX count → **0** ✅ |
| G-F10-3 | `fourier-value-import-drift.mjs` at `X/waves/W9.md:366` | script **EXISTS**: `docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs`; `W9.md:366` is the G24 row ✅ **NOT a phantom** |
| G-F10-4 | `X/waves/W9.md:375`; fourier `web/package.json:18` `^0.13.0` | `:375` is the G33 row ✅; `sed -n 18p` → `"@mkbabb/value.js": "^0.13.0"` ✅ |
| G-F10-5 | `grep -c 'latex-paper' INBOX.md` → 0; COHESION §4a glass-only | INBOX → **0** ✅; §4a rows are SC-1..SC-8, all glass ✅ |
| G-F10-6 | 54 / 25 / 66 / bare-F.W10 0; §2.2 `diff` empty vs F-W9 | all four counts **EXACT** ✅; extracted §2.2 shared regions **byte-identical** (9748 B both) ✅ |
| G-F10-7 | COHESION §4 zero fourier rows vs "the **23** owed" | §4 exists at `COHESION.md:93`, `grep -c 'fr-'` → 1 ✅ — but **"23 owed" is refuted** (§2, D5) |
| G-F10-8 | CENSUS `:263` / `:310-316`; INTAKE `:221`; 9 `FOURIER-R*`; `/tmp` file; codex worktree | `:263` = `## §6 — THE ADMISSION GAP` ✅; `:310-316` = the §6.7 correction **verbatim** ✅; `:221` = `### NEXT-COMMUNIQUE` ✅; glob → **9** ✅; `/tmp/fourier-r4-files.sha256` → **No such file** ✅; `~/.codex/worktrees/d0be/fourier-analysis` → **registered** ✅ |
| G-F10-9 | INTAKE `:221` vs COHESION §4a | both resolve ✅ — but the ask roster is incomplete (**FR-NP-32**, D6) |
| G-F10-10 | 8 specs; `grep -rln "admin" web/e2e/` → 0 | `ls web/e2e/*.spec.ts \| wc -l` → **8** ✅; admin grep → **0** ✅ (E-5's paired-defect disclosure is CORRECT and honest) |
| G-F10-11 | glass-ui **4.0.0** installed; `git status --porcelain \| wc -l` → 28 | installed version → **4.0.0** ✅; porcelain → **exactly 28** ✅; corrupt-dist prose at `:203+` present ✅ — but the M1 relay leg is **mis-stated RED** (D1) |
| G-F10-12 | ten `valuejs-outbound-*.md` under `BJ/coordination/`; term sweep | BJ packets → **10** ✅; o17 rows **B-1..B-10 naming U-1..U-11** ✅ (76 lines) — but the sweep **missed the 11th packet** (D1/D2) |

**L-19 result: no proof-farm scripts, no phantom paths.** Every named command and file exists and returns what the spec says it returns, with the four exceptions detailed in §4. The witnesses are genuine measurements, not contrivances.

---

## §4 DEFECTS

### D1 — MAJOR · G-F10-12 / G-F10-11: the relay-receipt sweep reads a superseded inbox path; the M1 arm is already discharged

**Claim.** §2.8 E-2 and G-F10-12 assert *"term-sweep across all **ten** packets → `@source` **0** · `MetricPill` 0 · `IntersectionObserver` 0 · `latex-paper` 0"*, and G-F10-11 requires *"M1 relayed to the glass BH/BJ inbox"* as an unmet falsifier.

**Receipt.**
```
find glass-ui/docs -name 'valuejs-outbound-*.md' | wc -l          → 11   (not 10)
```
The eleventh is `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md` (59 lines), and it is recorded in **`docs/tranches/X/COHESION.md:129`** — a file this spec MODIFIES at §1a #3:

> `**DISPATCHED 2026-08-28**: SC-1..SC-8 + the X·KF/X·F authoring-block accretions assembled into **O-20** (`../glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md`, 26 entries…)`

That packet's row **A-1** reads:

> `| A-1 | **Corrupt published stylesheet (BLOCKER, fourier F.W0 pre-gate)**: `dist/styles/index.css` as published at 4.0.0 is a CSS **syntax error** — the emitter injected the AN.W1 fold-block at the first *literal* `@source` occurrence, which sits inside a comment, so `:195-203` terminates the com…`

`grep -c '@source'` in o20 → **1**; `grep -c 'FR-NP-32'` → **1**; `grep -c 'fourier'` → **10**.

**Consequence.** `@source` is **not 0**. The M1 / corrupt-dist arm has a packet under the producer's inbox path containing the arm's identifying term — G-F10-12's own GREEN condition, already met, and asserted RED. G-F10-11's M1 relay leg likewise. This is the spec's own RELAY-RECEIPT-LAW failure mode running backwards: *relay-sent-never-read*. The E-2 erratum that corrected "six letters" → "ten packets" is itself stale by one, and the one it missed is precisely the one carrying an F-side term.

### D2 — MAJOR · §1b bounds and every receipt witness name BJ; the live producer inbox is BK

**Claim.** §1b: *"`glass-ui/docs/tranches/BJ/coordination/valuejs-outbound-*.md` (the ten sent packets — **read for receipts, G-F10-12**)"*. §4b SS-6: *"every accreted glass ask rides the ONE batched letter at the boundary — **F.W10 is the F-side boundary**"*.

**Receipt.** `ls glass-ui/docs/tranches/BK/coordination/` → `ATLAS-BATCH-ROUTING.md`, `ATLAS-TO-GLASS-2026-08-03-AUDIT-BATCH.md`, `valuejs-outbound-2026-08-28-o20-authoring-block-batch.md`. The batched letter **already dispatched on 2026-08-28** — the same day this spec was authored — to a tranche path (BK) the spec's read-only bounds never name. A close-gate whose whole purpose is *"a receipt read, never asserted"* is scoped to a directory the correspondence has moved out of.

### D3 — MAJOR · E-1 / G-F10-1: the "denominator sharpening" sharpens to a wrong denominator

**Claim.** §2.8 E-1 and G-F10-1's born-RED witness: *"Measured on the **live re-triggered table** (G.W8 stamp at `:105`): **11 id-rows, ALL 11 OPEN, FOUR against value.js**"*.

**Receipt.** `fourier-analysis/docs/constellation/ADOPTION-ASKS.md`, table starting `:107`, enumerated row by row — **17 id-rows**, not 11:

`1 · 2 · 3 · 4 · 5 · 6 · 7 · inv-22-color · glass-ui-a11y · cascade-vjs · cascade-kf · cascade-gui · words-spa · valuejs-J-atomdiff · valuejs-J-publish · ~~glass-ui-P5-inner-rounding~~ · glass-ui-dock-vt-name`

Of these, **11 are OPEN**; **6 are not** — Ask 4 (*"fourier portion LANDED G.W7"*), glass-ui-a11y (*SATISFIED-UPSTREAM*), glass-ui-dock-vt-name (*SATISFIED-UPSTREAM*), valuejs-J-atomdiff (*DONE-in-sibling*), valuejs-J-publish (*DONE-in-sibling*), glass-ui-P5-inner-rounding (*KILLED-AS-PHANTOM*).

"ALL 11 OPEN" is true of the eleven; "**11 id-rows**" understates the live table by six. The spec adopts **FR-CP-45's anchor law as binding on its own citations** (§2.8 header, §4a.13) and files E-1 explicitly as a *denominator* correction of the CARRY — so the mis-count lands on the one axis the spec made load-bearing against itself. (The four-against-value.js figure is correct **for the OPEN subset**; the table in fact targets value.js on **six** rows, the two extra being the J-parity residuals §4b does carry as fourier-owned.)

### D4 — MAJOR · §4a.3 restates the F.W1 atomic transaction with three of its eleven limbs

**Claim.** §4a.3 and §2.7's FR-EQR-3 row both state the transaction as: *"producer bump + 162-site prop rewrite + `copied`→`status` triple in ONE change"*.

**Receipt.** `F-W1.md:276` charters it as **eleven** limbs in the ONE change:

> `**The atomic transaction (ONE change, G6):** producer bump (glass + keyframes + value, lockstep per MPC-14) + 162-attribute Button rewrite (G8-preserving) + `copied`→`status` triple + lucide rename (35 imports; +1 D·D-M11; the 17 hand-svgs ledgered) + G10 disclosure deletions + **FR-EQC-7 vaul-vue manifest gate** + G13 manifest/lock moves + PP-REDGATE ambient declaration + FR-CP-13's gap decision + ExportModal M-γ deletion + GCM-22 `p-0` retirement (7-target only) + the pencil-boil floor per G14.`

and `F-W1.md:294` makes the binding explicit: *"**FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before.**"*

In `F-W10.md`: `grep -ci 'vaul-vue'` → **0** · `grep -ci 'RE-PIN'` → **0** · `grep -ci 'class census'` → **0** (against F-W1's 4 / 5 / 3). F.W10's declared duty is to **verify** F.W1's atomicity riders (§2.7 FR-EQR-3, §4a.3, §4b F.W1). A three-limb restatement is a gate that passes while the vaul-vue manifest gate, the RE-PIN act at the adopted commit hash, and the P0 CSS-class census land separately — the exact land-or-lose posture failure the L-18 base forbids.

### D5 — MAJOR · §2.5 / G-F10-7: the NO-WAVE-OWNER drain is under-counted at its own declared deadline

**Claim.** §2.5: *"Twenty-three rows, twenty-three verbs, **zero left open**."* G-F10-7: *"every one of the **23** rows bears a TERMINAL verb."* §4b: *"§3.3 (every NO-WAVE-OWNER row terminally homed — the deadline) **closes HERE**."* `F-W9.md:243` refuses the drain and defers to F.W10.

**Receipt.** `grep 'NO-WAVE-OWNER' fr-*.md | wc -l` → **167** across **56** records; **94** row-level lines; **50** with a strict disposition token. **36** carry a strict NO-WAVE-OWNER disposition and appear in `F-W10.md` under **neither their banked id nor their `record:line` anchor** — full roster at §2.1 above, including `MM-6`, `FR-EQC-15`, `F-6`, `FR-GIG-20`, `FR-GV-37`, `FR-NP-11`, `FR-NP-26`, `FR-COB-7/-8/-23/-26/-28`, `HLG-32`, `M-16` (×2 distinct records), `FR-MSP-12`, `D-26`, `★MF-7`. §5 Excluded contains **no** line covering them — they are neither carried, folded, nor excluded-with-reason. **M-25: a spec ignoring adjudicated rows is DEFECTIVE.**

### D6 — MAJOR · FR-NP-32, a BLOCKER NO-WAVE-OWNER + glass-BH-relay row, appears nowhere in the spec

**Claim.** §2.3's M1 row and G-F10-11 describe the glass-ui 4.0.0 corrupt-dist mechanism in the spec's own words (*"a dist-GENERATION bug; producer source at HEAD intact"*), and §2.4's NEXT-COMMUNIQUE roster claims to place *"every surviving ask into **EXACTLY ONE register**"* (G-F10-9's falsifier).

**Receipt.** `fr-NotationPills.md:35`:

> `- **FR-NP-32 ★NEW · reader-1 M1, reproduced by this seat — BLOCKER — NO-WAVE-OWNER (producer dist emitter) + glass-ui BH relay at the TOP of the FR-COB-28 packet; F.W1 SEQUENCING GATE.** The ADOPTED `@mkbabb/glass-ui@4.0.0` dist stylesheet is a CSS syntax error: the dist emitter injected the AN.W1 fold-block … at the first literal `@source` occurrence — a PROSE MENTION inside a comment … so dist/styles/index.css :195-203 terminates the comment early and leaves :203-221 as un-commented prose whose apostrophes open an unterminated string (delimiters 17/8 dist vs 15/6 src, my counts; src is intact).`

`grep -c 'FR-NP-32' F-W10.md` → **0**. It is the banked identity for the exact defect §2.3's M1 row describes, it is a declared **glass-ui BH relay** ask absent from §2.4's roster at the wave that declares itself *"the F-side boundary"* for SS-6, and it is a **BLOCKER** NO-WAVE-OWNER row absent from §2.5's drain at the §3.3 deadline. M-25's identity discipline is cite-both-book-once; here neither id nor grade is cited. (Corroborating irony: the O-20 packet of D1 names FR-NP-32 explicitly — the producer's inbox carries the id the consumer's close-gate does not.)

### D7 — MINOR · the "F.W10 intake CARRY" has no in-tree file

**Claim.** Masthead line 3: *"the F.W10 intake CARRY consumed **whole**: **77 rows · 12 gates · 12 cross-edges · zero silent drops**"*; §2.8 E-1/E-2/E-6 quote "the CARRY" as an authority nine times.

**Receipt.** `find docs/tranches/X/fourier/carry -type f` → exactly two files: `F-W1-CARRY.md`, `F-W4-CARRY.md`. No `F-W10-CARRY.md` exists; `grep -on 'carry/[A-Za-z0-9./-]*' F-W10.md` → **0 path citations**. The spec cites no phantom *path* (it never names one), but the 77/12/12 provenance census is unverifiable against the tree. Gates (12) and cross-edges (12) independently check out; the 77-row figure cannot be audited.

---

## §5 AXES THAT HOLD (recorded so the pass is not read as uniformly hostile)

**E-3 + STATUS — CLEAN.** `grep -on 'status: [a-z]*'` → one hit, `3:status: planned`. Zero VERIFIED stamps: every `VERIFIED` token is either the four-verb `VERIFIED **NO**` (line 9), the word in prose (*"receipt VERIFIED, not asserted"*, *"F.W10 VERIFIES"*), or a measured-verification predicate. No execution verbs in current voice (`^\*\*(Landed|Executed|Implemented|Applied|Committed)`, `we (ran|landed|committed|edited)`, `has been (landed|committed|applied)` → **0 hits**). §1c excludes all product source in both trees plus `scripts/dev/dev.sh` explicitly. Every fourier-tree act is `asked, never made` (5 explicit statements); every fourier witness in §2.3/§3 is a read (`grep`, `ls`, `find`, `git status`, `rev-parse`, `sed`) — **the fourier tree stays READ-ONLY in every witness**.

**E-3 ADDENDA-NOT-PATCH — CLEAN.** §1a #7 and #8 are CREATE-BESIDE; §1a #3 is MODIFY-carve with §2/§3 quoted-never-rewritten; §1b holds all 66 `fr-*.md` read-only and the re-cut lands as a table, not an edit. G-F10-9's falsifier requires `git diff --stat` on the dated intake to stay empty.

**PAIRED SHARED BYTES — CLEAN and verified at write.** The §2.2 region extracted from `F-W10.md` and `F-W9.md` is **byte-identical** (9748 B each, `diff` empty), exactly as §2.2's preamble and E-3 require. The E-5 paired defect (the AA-44 cell's "9 e2e" vs K11's "quote 8, never 9") is **disclosed honestly** outside the shared bytes and re-measured correctly (`ls web/e2e/*.spec.ts | wc -l` → 8). No prose outside the shared bytes quotes 9. This is the correct handling of a defect one may not unilaterally fix.

**NAMED LOCKS — CARRIED, not merely cited.** §4a.6 names all six same-commit riders (`fr-PaperSearchModal D-1+D-3+outline:none` · **PAW-30 in the same repair as PAW-1** · **LAW-3** PAW-44-restore-only-WITH-or-AFTER · **LAW-4** one clearance authority with PAW-47 dependent · **MPC-31 / MPC-3⊕10⊕13⊕8⊕22 one-cut law** · **FR-MSP-6 two-channel lock**), each routed to F.W3/W4 *where its rows land* and re-declared at §5 Excluded so no seat re-books them. PAW-44 ×5, LAW-3 ×3, LAW-4 ×2, MPC-31 ×2, FR-MSP-6 ×2. §4a.7 carries PAW-2's coupling law verbatim; §4a.5 carries harness-before-rider (PAW-50) and flag-before-split (PAW-49); §4a.9 the FR-TT-1 promotion lock; §4a.10 the L-11+M2 rename hard lock; §4a.11 seam-before-seat, the teleport lock, HOLD-is-RED.

**DISSENTS — CARRIED VERBATIM, not summarised.** FR-AFP-49's blocker-weight dissent · reader-2's FR-EMT-11 MAJOR ruled a scope error with the warning preserved · DU's GCM-4 BLOCKER and the SR composite · LC's PAW-12 MINOR sustained at R-2 · r2's FR-USB-16 MINOR overruled-and-recorded · worker-DU's GAB-13 *"the fleet has already elected to treat the working tree as the scope"* · OG-V2's Codex-verb dissent · the fr-CollapsibleSection ERESOLVE dissent · the PAW-39 a11y-composite cluster dissent · the trie-vs-KISS guardrail-incumbent dissent · the peer-gated ≈zero-discharge-rate standing law. All present in the spec's own words.

**OWNER RULINGS — FLAGGED INLINE, NEVER PRESUMED — CLEAN.** OG-F1 and OG-F2 flagged with evidence-favours notes but explicitly unruled (§2.3, G-F10-8, §4a.13, §5). The L-4 producer-ownership escalation is flagged with *"F.W10 CANNOT STAMP TERMINAL DISPOSITION WHILE THE ESCALATION IS UNANSWERED"*. SS-4's seven rulings (trie-vs-KISS · remix-vs-fork · born-visibility · visibility-enum · compound-vs-global version `_id` · redaction parity · cursor-vs-offset pagination) are enumerated and flagged in §2.3, §4b F.W5–W8, and §5. The **SS-4-PREREQ (TA-4 atomdiff)** BLOCKER is carried with the *"co-signature over un-runnable probes is VOID"* lock. **No SS-4 ruling is pre-answered anywhere.**

**F.W0-FIRST POSTURE — HELD.** §4a.2 puts the substrate pre-gates before everything (M1 · GAB-13 · F8-REACH-01/02 · Codex residue · MG-θ ≡ M7 one-substrate-edit-two-records-booked-once · re-cut PAW-49), and §2.3 restricts F.W10 to VERIFY, never re-rule. The anchor re-resolution law (FR-CP-45) is adopted as binding on the spec's own citations and applied at §2.8 — and, as §1.4 shows, it *worked*: 45 of 46 anchors re-resolve exactly.

**G-F10-12 SPLIT HONESTY — the right shape, the wrong measurement.** The gate is born SPLIT rather than averaged, and says so explicitly. Its U-half GREEN-by-verified-receipt is **confirmed** (o17 packet, 76 lines, rows B-1..B-10 naming U-1..U-11). Only its F-half measurement is defective (D1).

---

## §6 CENSUS SUMMARY

| | |
|---|---|
| **routedTotal (union of the three obligation sets, deduped by anchor)** | **121** |
| — set A · digraph routing identities | 26 (**26 booked, 0 escaped**) |
| — set B · by-mechanism entrants | 5 (**5 booked, 0 escaped**) |
| — set C · NO-WAVE-OWNER rows owed at the §3.3 deadline | 94 (**33 booked, 61 escaped**; 36 strict) |
| **bookedCount** | **60** |
| **escapedCount** | **61** (36 strict-dispositioned) |
| **defects** | **7** (6 MAJOR · 1 MINOR) |
| **verdictLocal** | **DEFECTIVE** |

**The digraph half of this spec is exemplary** — 26 for 26, the 54/26/14/2/12 anatomy exact to the line, the shared bytes byte-identical, 45 of 46 anchors re-resolving, every gate witness a real path or command, every named lock and dissent carried in its own words, every owner ruling flagged and none presumed. **The defects are all at the perimeter the spec chose for itself**: a receipt sweep pointed at last tranche's inbox, a denominator sharpened to the wrong number, an atomic transaction restated with three of its eleven limbs, and a NO-WAVE-OWNER drain that books 23 of ≥50 and calls it zero-left-open at the deadline wave.

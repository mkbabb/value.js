# F-W7 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 2)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W7.md` (285 lines, mtime **2026-08-28 13:40:33**)
**Corpus authority**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls fr-*.md | wc -l` → **66**)
**Carry authority admitted**: `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` ONLY (R-3). **No `F-W7-CARRY.md` exists and none is cited** — the repaired spec strikes its own prior CARRY receipt as false. ✓
**Seat posture**: FRESH. Nothing inherited from PASS-1 or RULINGS; every figure below re-derived read-only by this seat 2026-08-28. Zero product bytes, zero fourier bytes; the only write is this file.
**Census detector law honoured**: every routing probe run with BOTH U+002D and U+2013.

**VERDICT: DEFECTIVE** — not for its measurements, which are the most honest in the lane, but because a **concurrent repair round moved every sibling spec after this one was written**, and the spec asserts its anchors as *"re-read this seat"*. Its two founding coordinates, its zero-re-booking operand, its two "DECLARED" reciprocals and one whole gate now address other text.

---

## §0 — THE GOVERNING FACT OF THIS PASS: THE REPAIR ROUND WAS CONCURRENT

```
$ stat -f "%Sm %N" -t "%Y-%m-%d %H:%M:%S" waves/*.md   conformance/PASS-1/RULINGS.md
2026-08-28 13:31:24  RULINGS.md
2026-08-28 13:39:24  F-W9.md
2026-08-28 13:40:26  F-W5.md      ← 7 s before F-W7
2026-08-28 13:40:33  F-W7.md      ← the spec under trial
2026-08-28 13:40:41  F-W10.md
2026-08-28 13:41:41  F-W4.md
2026-08-28 13:42:11  F-W1.md
2026-08-28 13:43:05  F-W3.md
2026-08-28 13:43:42  F-W0.md
2026-08-28 13:43:50  F-W6.md
2026-08-28 13:44:39  F-W8.md
2026-08-28 13:44:45  F-W2.md
```

Nine sibling seats repaired in the same round. **F-W1 alone pinned its coordinates against exactly this hazard** (`F-W1.md:309`, verbatim: *"`conformance/PASS-1/RULINGS.md` pins four coordinates in THIS file and hands them to nine sibling seats repairing in the same round"*) — and F-W7's two F-W1 anchors are the only sibling anchors in this spec that still resolve.

Everything else drifted. **This is a real defect, not a technicality**: L-20's authority-reality axis is *"every quoted authority exists at its coordinate AT THE BYTES"*, and the spec's own §12 closing lesson is ***"a citation is a measurement, and an unreproduced measurement is an invention."*** Judged by its own rule, twenty-two of its citations are now unreproduced.

**Drift table** (cited → live occupant → true live coordinate):

| cited | F-W7's claim | live occupant at the cited line | true live line |
|---|---|---|---|
| `F-W5.md:153` | E16 ⊙ honest default + the trie dissent | **E8** AnimationSettings | **:161** |
| `F-W5.md:226` | §3 **G7** ⊙ UNRULED | the **D-19 discipline** note | **:236** |
| `F-W5.md:138` | E1 | **D15** Query semantics | :146 |
| `F-W5.md:140` | E3 | **D17** Date serialization | :148 |
| `F-W5.md:142` | E5 | the `### §E` **heading** | :150 |
| `F-W5.md:144` | E7 | a **table header** row | :152 |
| `F-W5.md:145` | E8 | the **`\|---\|` separator** | :153 |
| `F-W5.md:147` | E10 + *"Distinct from B4's"* | **E2** | :155 |
| `F-W5.md:150` | E13, C-25 verbatim | **E5** | :158 |
| `F-W5.md:154` | E17 | **E9** | :162 |
| `F-W5.md:146/:148/:149` | the E9/E11/E12 anti-rename triple | **E1 / E3 / E4** | :154 / :156 / :157 |
| `F-W5.md:33` | §0b FR-GIG-5 bar | §0a **goal criterion** | :37 (§0b @ :35) |
| `F-W5.md:212` | `## 3. Gates — 22, all born-RED` | a **dissent-register** row | :222 |
| `F-W5.md:245` | §4 cross-edges | gate **G16** | :255 |
| `F-W5.md:251` | §4 edge **X-1** | gate **G22** | :261 |
| `F-W3.md:289` | the P-10 declared-not-carried quote | **blank line** | **nowhere** (D-3) |
| `F-W3.md:396` | *"Explicitly declared as an edge, not carried"* | `---` | :410 |
| `F-W6.md:182` | the **DECLARED** F.W7 edge | fr-EquationView **M-CK** row | :304 |
| `F-W8.md:204` | the **DECLARED** sibling edge + *"BOTH sides"* | `### 5b.` **heading** | :217 |
| `F-W10.md:114` | the dissent ≡ home | **CODEX-R3–R6 residue** row | **nowhere** (D-4) |
| `F-W10.md:105` | §2.3 *"F.W0 RULES; F.W10 VERIFIES"* | the F.W1→F.W9/W10 checkpoint row | :107 |
| `F-W0.md:199` | **G-11** | **blank line** | :211 |
| `F-W0.md:63` | `SUBSTRATE-LEDGER.md` create row | the `fourier/CLAUDE.md` row | :65 |

---

## §1 — ID-KEYED CENSUS: **CLEAN**

### 1a. Routing to F-W7 across the 66 records — token-bounded, both dash forms

```
$ cd docs/tranches/V/megatranche/registry/adjudicated
$ grep -noE '(^|[^A-Za-z])F\.W7([^0-9A-Za-z-]|$)' fr-*.md | wc -l
0
$ grep -o "F\.W7" fr-*.md | wc -l
2                       # fr-Tooltip.md:10 and :32
$ grep -c "KF\.W7" fr-Tooltip.md
2                       # both hits are the substring inside KF.W7 (keyframes relay)
$ grep -n "F-W7" fr-*.md ; grep -n "FW7" fr-*.md
(no output)
```

Full routing-token distribution, **spelling-agnostic** (`grep -rhoE 'F\.W[0-9]+(\s*[-–/]\s*W?[0-9]+)*'`):

| target | occ | | target | occ |
|---|---|---|---|---|
| F.W4 | 1128 | | **F.W5-W8** (hyphen) | **120** |
| F.W3/W4 | 1010 | | **F.W5–W8** (en-dash) | **72** |
| F.W1 | 839 | | F.W2 | 68 |
| F.W3 | 246 | | F.W9/W10 | 54 |
| F.W0 | 153 | | F.W1/W2 · F.W0/W1 · F.W1/W3 | 5 · 2 · 1 |
| F.W5 | 53 | | **F.W7** | **2 — both `KF.W7`** |

> **`routedTotal` = 0. `bookedCount` = 0. `escapedCount` = 0.**

**No span token in the corpus reaches W7 except the four-wave band.** `grep -rhoE 'F\.W[0-9]+[-–]W?[0-9]+'` returns exactly `F.W5-W8` and `F.W5–W8`; every other span is a slash form (`F.W3/W4`, `F.W9/W10`, `F.W0/W1`, `F.W1/W2`, `F.W1/W3`), none containing 7.

### 1b. The band, measured under R-6's ruled idiom — and correctly disowned

`grep -rlE 'F\.W5[-–]W8' fr-*.md | wc -l` → **49 records** (**192** occurrences: 120 hyphen / 72 en-dash; 24 records en-dash-bearing, 26 hyphen-bearing). F-W7 §5a states the denominator is **F.W5's row, not F.W7's**, and states the detector correctly and by name: *"measured spelling-agnostically (`F\.W5[-–]W8`, BOTH U+002D and U+2013) per the program's census idiom."* Confirmed at the keystone's own end — **`F-W5.md:266`** books the band and states *"F.W7 … books no registry row of its own (its routing census is a measured ∅, R-11)."* ✓

### 1c. Escapes — **ZERO**

PASS-1's single escape (`fr-ContourEditorCanvas` **L-5**, the corpus's ONE word-bounded true hit) is now **excluded-with-reason at §8 row 1**, quoted correctly, and carried again in §12 as the qualifier on the "no material" framing. Re-verified at the bytes:

```
$ grep -rniE "\btrie\b|prefix.?tree|\bradix\b|patricia|structural.?sharing|delta.?compress" fr-*.md
fr-ContourEditorCanvas.md:56:- **L-5 — MAJOR.** Unbounded deep-reactive undo stack …
                              … **ADJUDICATED → F.W3/W4** (cap + structural sharing candidate)
$ grep -rniE "trie|prefix.?tree|radix|patricia|structural.?sharing|delta.?compress" fr-*.md | wc -l
147
```

**147 total = 146 substring artefacts + 1 true hit.** F-W7 §5a N-2 and §8 both state exactly `147 / 146 / 1`. **CURED and byte-exact.** No other adjudicated id in the corpus touches this wave's subject.

---

## §2 — AUTHORITY REALITY

### 2a. What reproduces **EXACTLY** (the spec's real strength)

**Product source, both trees — 100 % reproduction, every probe:**

| probe | result |
|---|---|
| `git -C $F status --porcelain \| wc -l` | **28** ✓ |
| `git -C $F rev-parse --short=8 HEAD` | **cd26c653** on `m/w1-bump-migration` ✓ |
| `git -C $F cat-file -t 14d83356` | **fatal: Not a valid object name** ✓ |
| `atomdiff.py:1` | *"authored once (fourier), adopted twice (value.js twin)"* ✓ |
| `atomdiff.py:7` | ``lib/crud/atomdiff.ts`` — the excised twin ✓ |
| `atomdiff.py:12-14` | the flat-BAG / whole-atom-replace / no-DAG guardrail ✓ |
| `atomdiff.py:38` | the five atoms, `animation_settings` **4th** ✓ |
| `grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` | **1 comment hit**, `palettes-forks.test.ts:9` ✓ |
| `ls $V/api/src/lib` | **No such file or directory** ✓ |
| `grep -rniE "merkle\|flat bag\|not a tree" $V/api/src $V/src` | **1 hit**, `hash.ts:6` *"(Merkle property)"* ✓ |
| `hash.ts:8-17` | folds `{name, colors}` — **never `paletteSlug`** ✓ |
| `paletteVersion.ts:13-14` · `:47` | `findByHash` → `{_id: hash}`, unscoped; early return on hit ✓ |

**Registry records — every anchor verbatim-exact** (10 records, 14 anchors): `fr-AdminAuditLog:126` (S-8's *"an absence-proof must enumerate the surface, not query one name for it"*) · `fr-GalleryAdminBanner:90` (K-13, *"26 occurrences / 17 files"*) · `fr-ContourEditorCanvas:48/:56/:105/:139` · `fr-ContourSettings:43/:69/:126` · `fr-SpeedSelect:44/:45` · `fr-GalleryDraftsSection:40/:80` · `fr-GalleryView:34` · `fr-ImageUpload:124` (R1's dissent) · `fr-CanvasOverlayButton:64` (confirmed a table header — a true false positive) · `fr-BasisCanvas` BC-20 · `fr-PaperSidebar` M1 · GAB-13.

**Formation + spine authorities — exact:** `lane-crud.md:399` (*"both sides carry an explicit anti-tree KISS guardrail (`atomdiff.py:12-14`)"* — the premise N-1 corrects) · `lane-crud.md:218` §2 R-4 · `CENSUS-2026-08-03.md:203-204` sketch 8 (*"a structural-sharing/delta design proven on both object kinds"*) · `INTAKE-ADJUDICATION §4` **OG-F1** at `:233` with its exact R-list, `§3 F.W0` at `:168` · **COHESION `:83-84`** verbatim (*"maps to a full spec **or** a terminal kill with rationale — no silent drops, no re-booking"*) · **COHESION `:77`** (*"Cross-repo edges are declared FROM BOTH ENDS in the spec files"*) · **COHESION `:70-71`** (*"the value-side atomdiff restoration (TA-4) is a named prerequisite or the contract is re-scoped explicitly"*) · **`F-W1.md:276`** (the eleven-limb transaction) and **`:294`** (*"FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before"*) · `F-W5.md:114` §C2 (*"CROSS-REFERENCED, NOT MERGED with F-4"*) · `F-W5.md:125` §D1 (the `@router.` counting lock) · `J-diff-shape.md` **§6 at `:254`** — *"The close-gate clause (both conformance probes assert against THIS doc)"* — present ONLY in the read-only fourier tree, exactly as §2a now spells it, and absent value-side (`find $V -name "J-diff-shape*"` → nothing) ✓.

**Every substance the drifted anchors point at also reproduces** — at the new coordinates. This is drift, not fabrication, in all but two cases (D-3, D-4).

### 2b. Self-counts

| claim | reproduces? |
|---|---|
| §5 "**15**, counted" = 5a **5** + 5b **1** + 5c **4** + 5d **3** + 5e **2** | ✓ **EXACT** (PASS-1 D-4 cured) |
| §6 "11 conditions", 9 keyed + 2 ⟨added⟩ | ✓ **11** gate rows; G-F7-10/-11 marked ⟨added⟩ |
| §7c "**17 rows, counted**: 15 edges + F.W1 lock + F.W9/W10" | ✓ **17** |
| §1 evidence: "**9** adjudicated `fr-*.md` records cited" | ✗ **12 distinct records named in §5** (10 excluding the two disposal cites) — **D-10** |
| §2a `find … -type d` → *"`carry`, `waves`, `conformance` only"* | ✗ four dirs + root; `conformance/PASS-1` omitted — **D-12** (conclusion unaffected) |

---

## §3 — NO INVENTION / M-25 DEPTH: **CLEAN**

### 3a. The named locks from the brief — none belongs here, and none appears here

`grep -c` over `F-W7.md`: **FR-NP-32 → 0 · PAW-44 → 0 · LAW-3 → 0 · MPC-31 → 0 · FR-MSP-6 → 0 · "NEGATIVE ROSTER" → 0 · "anti-cure" → 0.** Each lands in its own wave (FR-NP-32 in nine sibling specs; PAW-44/LAW-3/MPC-31/FR-MSP-6 in seven each). Because **`routedTotal = 0`**, no row of theirs lands at F.W7 — their absence is the correct disposition, and the spec neither books nor manufactures one. ✓ The same-commit riders, F.W3's four anti-cures and F.W4's derivation-law preamble + NEGATIVE ROSTER are likewise absent, correctly.

### 3b. The ∅ is declared, not filled

§5a's minted **`F-MAIL-∅`** row states the token-not-substring probe *"so the grep it invites cannot falsify it"*, disposes both `KF.W7` hits inline, and refuses to mint filler. `KF-W1.md:136` (the C-14 form) and `:256` (the lock) both exist ✓ — **but the lock is quoted as "verbatim" and is not** (D-7).

### 3c. Cure-integrity locks, riders and dissents — **all carried**

▲ K-3 upsert arm KILLED (§5d + §7b + §8) · ▲ C-2 *"MOVE A POINT FIRST"* (verbatim vs `:139`) · ▲ E1 unscoped-keying is a defect generator · ▲ E13/C-25 superset — **and the quote is now conformed to F-W5's real bytes**, *"SUPERSET of the **request** fields the operation consumes"* (PASS-1 D-14 cured on wording) · ▲ M-12 snapshot/result stamping (the fourth key lock) · ▲ SS-C-2 do-not-size-over-dead-fields · ▲ m-15 CROSS-REFERENCED-NOT-MERGED · ▲ FR-GIG-5 no-credit bar · ▲ BC-20 stays banked · ▲ D-19. **Dissent 1** (trie-vs-KISS) is real and preserved — banked at live `F-W5.md:161`, not invented (PASS-1 D-2 was itself wrong; R-1b's A-α amendment is correct) — **but its ≡ co-anchor is false** (D-4). **Dissent 2** (`fr-ImageUpload:124`) carried with its SS-13 re-grade trigger ✓. **Dissent 3** (L-8 severity-follows-consequence) cited as the overruling precedent ✓.

### 3d. The four clause re-keys R-1e ordered — **all correct by ID**

C-25 ≡ **E13** ✓ · C-2 ⊕ K-3 ≡ **E17** ✓ · SS-C-1 ≡ **E7** ✓ · SS-C-2 rides **inside E8** ✓ · the "E10/B4" pairing dropped with F-W5's own separation quoted ✓ · G-F7-8's roster = **E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17** ✓. Every anti-rename note (E9/E11/E12 are other clauses) is substantively right. **Only the line numbers are stale** (D-5).

---

## §4 — GATES: 11, all born-RED, witness reproduction

| gate | verdict |
|---|---|
| **G-F7-1** ⊙ | **PARTIAL ✗.** `sed -n '1,15p' $F/api/lib/crud/atomdiff.py` reproduces exactly (guardrail `:12-14`, twin `:1`/`:7`). PASS-1's fabricated *"No trie design absent G7's ruling"* is **struck** and re-voiced per R-1a ✓. But **both grounding coordinates (`F-W5.md:153`, `:226`) now address other clauses** — D-1 |
| **G-F7-2** | **✓.** S-8 · K-13 verbatim; the four counter-witnesses reproduce; N-2's `147 / 146 / 1` **now exact** |
| **G-F7-3** | **✓ EXACT.** 1 comment hit; `ls $V/api/src/lib` → No such file or directory |
| **G-F7-4** | **✓ EXACT.** `hash.ts:8-17` unscoped fold; `paletteVersion.ts:13-14` `{_id: hash}` |
| **G-F7-5** | **PARTIAL ✗.** Wording now conformed to F-W5's bytes ✓; the coordinate `:150` is E5, not E13 |
| **G-F7-6** | **PARTIAL ✗.** `fr-SpeedSelect:45` exact ✓; E10's disposition genuinely UNSTATED ✓; `:147` is E2 |
| **G-F7-7** | **✓ EXACT, all three git probes** + M1 + GAB-13 |
| **G-F7-8** | **PARTIAL ✗.** Artefact declared, L-19-clean, roster correct by id ✓. Its stated operand — *"live `F-W5.md:138-157`"* — addresses **D15…E12**; the E-register is `:146-165`. The set-difference as written runs against a line window that no longer holds the clauses (D-5) |
| **G-F7-9** | **✓ EXACT.** COHESION `:83-84` verbatim |
| **G-F7-10** ⟨added⟩ | **✓ EXACT.** One `Merkle property` hit; `atomdiff.py:7` names the excised adopter |
| **G-F7-11** ⟨added⟩ | **✗ REFUTED BY ITS OWN RE-RUN — D-2.** The `ls` half reproduces (11 files) ✓; the F.W5-spine half is false at the bytes |

**Every gate command's path exists and executes as written.** **L-19 CLEAN** — no proof scripts; §10's tripwire framing of `typecheck/test/lint` is correct posture. **Bounds discipline CLEAN** — four `create` paths with explicit conditionality; `contract/**` + `OWNER-RULINGS-F.W5.md` correctly demoted to *prospective, cited-when-created* (PASS-1 D-10 cured); `J-diff-shape.md` re-pointed into the read-only fourier tree where it genuinely lives (PASS-1 D-9 cured).

---

## §5 — ATOMICITY + POSTURE

| axis | verdict |
|---|---|
| **F.W1 cited-not-restated** | **✓ EXEMPLARY.** R-4b's exact text applied verbatim; the three-limb restatement **struck in terms** (*"a partial roster of a land-or-lose transaction normalises a partial landing"*). `F-W1.md:276` (eleven limbs) and `:294` (FR-EQC-7 INSIDE) **both reproduce exactly** — the only sibling anchors in this spec that survived the round |
| **F.W0 pre-gates honored** | **✓ substance / ✗ pointers.** HARD predecessor in §1, §3a, §5e, §6 G-F7-7, §7c, §10, §11, with an explicit HALT arm; G-11 and `SUBSTRATE-LEDGER.md` now **named** (PASS-1 D-15 cured) and correctly framed as *quoted, never re-performed*. Both coordinates stale — D-9 |
| **SS-4 owner flags INLINE** | **✓ EXEMPLARY.** §4 is a standing inline ruling block: question stated, honest default carried and **not contradicted**, three-branch cost table **including NO-RULING** (*"The wave cannot open"*), ⊙ on every gated row, unit **b** blocked until the owner speaks, P-10's *no second ruling file* honoured. §1a's XOR (*"Both is a defect. Neither is a defect"*) and *"A completed wave is not the same thing as a wave that produced a design"* remain the best lines in the sub-tranche |
| **fourier tree READ-ONLY** | **✓.** Zero fourier bytes. Every fourier witness is `sed` / `git status` / `rev-parse` / `cat-file`. §2a bars `/Users/mkbabb/Programming/fourier-analysis/**` whole-tree |
| **status planned / zero VERIFIED** | **✓.** `grep -n "VERIFIED"` → line 26 only, `**NO**`. `**Status**: planned`. `IMPLEMENTED \| **NO**`. No execution verb in current voice |
| **Rulings addressed to F-W7 applied** | **✓ 8 of 8 in substance.** R-1a ✓ (own voice) · R-1b ✓ (re-anchored; coordinates since drifted) · R-1e ✓ (four re-keys + roster + §2 pointers + C-25 conformed) · R-11 ✓ (all five items: ∅ row KF.W1-form, L-5 exclusion, 147/146+1, count 15-over-14, G-F7-11 re-measured) · R-3 ✓ (CARRY struck as a false receipt over a nonexistent artefact) · R-10.3/.4/.5 ✓ · R-9.1 ✓ (named) · R-4b ✓ (verbatim). **R-1f applied but the re-measurement introduced a NEW false claim** — D-2 |
| **Split-verdict discipline** | **✓.** *"F.W7 never claims a GREEN it did not execute"*; GREEN-owner column separates owner / F.W0 / F.W5 / value.js API row from F.W7 itself |

---

## §6 — DEFECT REGISTER (12)

**D-1 · CRITICAL — the wave's two founding coordinates address other clauses.**
`F-W5.md:153` is cited **nine times** (§1 evidence · §1b · §3 · §4 twice · §5a · §6 G-F7-1 · §7c · §8 · §11) as the verbatim home of E16's honest default *and* of the trie dissent — it is the entire basis of R-1a's and R-1b's cures. `F-W5.md:226` is cited **five times** as §3 G7 ⊙ UNRULED.
Receipt: `sed -n '153p' F-W5.md` → `| **E8** AnimationSettings — the three-way reconciliation | BC-9/C-6/D-20 ⊕ SS-C-2 …`. `sed -n '226p' F-W5.md` → `▲ **D-19 discipline**: every fourier-side witness below is **MEASURE-AT-OPEN** …`. The real homes are **`:161`** (E16, whose ▲ block carries the dissent verbatim including *"`atomdiff.py:12-14` is the INCUMBENT"*) and **`:236`** (G7 ⊙, *"owner rules trie-vs-KISS"*). The substance is intact; **the addresses are not**, and the spec presents them as this seat's own re-read.

**D-2 · CRITICAL — G-F7-11 is refuted by re-running its own command; the F.W5→F.W7 reciprocal it declares "owed" is ALREADY WRITTEN.**
§7c row 2: *"**owed at the spine** — measured directly by this seat: `F-W5.md` §4 (`:245`) declares edges to F.W0/F.W1/F.W2/F.W3-W4/F.W6/F.W9-W10/SS-4/SS-6/SS-13/the value.js API row + the FORBIDDEN row, and **NO edge to F.W7**."* Repeated in G-F7-11's born-RED witness (*"enumerates ten edges and declares NONE to F.W7"*), in §7c rows 3/4/5 (*"owed (same spine gap)"* ×3), and in the §7 close.
Receipt: `grep -n "F\.W7" F-W5.md` → **`:266`** — `| **F.W5 → F.W7** | states, never books | **F.W7 CITES; F.W5 STATES.** The trie question is this wave's clause **E16** and gate **G7 ⊙** — F.W7 owns the owner-gated design that follows a ruling and **books no registry row of its own** (its routing census is a measured **∅**, R-11) …`. This is **RULINGS R-5's ruled cure, landed at 13:40:26 — seven seconds before this spec was written.** The live §4 table (`:255`, not `:245`) holds **13 rows**, including both the F.W7 row the spec says is absent and an `F.W5 → F.W8` row the enumeration also omits. **This is the exact recurrence of PASS-1 D-5 in a new coordinate: a gate whose born-RED witness its own command refutes.** The wave's single genuinely-owed reciprocal is now **F.W0's alone** (`grep -c "F\.W7" F-W0.md` → **0** ✓, which does reproduce).

**D-3 · CRITICAL — a P-10 corroboration quote exists at no coordinate in the tree.**
§5a row 2, presented as *"Corroborated, both anchors re-read this seat"*: **`F-W3.md:289`** — *"Declared-not-carried edge: **F.W7's anti-tree KISS guardrail stays inline in F.W7.**"*
Receipt: `sed -n '289p' F-W3.md` → **blank**. `grep -rn "Declared-not-carried edge" docs/tranches/X/` → **`F-W7.md:121` and `conformance/PASS-1/F-W7-CHECK.md:86` only** — the sentence is nowhere in F-W3.md. F-W3's live S-6 (`:299`) reads *"**S-6 · Owner-gated flags (a/b/c)** — flagged inline, never presumed: (a) MISSED-D … (b) fr-ContourSettings i-3 … (c) P-10, the 7.0.0-vs-8.0.0 re-pin target (homed at F.W1)"* — different text. The **second** P-10 anchor survives, at `F-W3.md:410` (cited `:396`): *"| **F.W7's anti-tree KISS guardrail** | **Explicitly declared as an edge, not carried** — it stays inline in F.W7 (S-6) |"*. So P-10's discharge is genuinely corroborated **once**, not twice, and one of the two quotes marked re-read is unlocatable.

**D-4 · MAJOR — the dissent's ≡ co-anchor carries no such sentence.**
§5a and §8 both give **`F-W10.md:114`** as the dissent's second home, *"the SS-4-PREREQ row, same substance: **'THE GUARDRAIL IS THE INCUMBENT; an owner ruling precedes design'**"*.
Receipt: `sed -n '114p' F-W10.md` → the **CODEX-R3–R6 residue** row. The SS-4-PREREQ row is at **`:116`** and is about the TA-4 excision and un-runnable probes — it does **not** contain that sentence. `grep -rn "GUARDRAIL IS THE INCUMBENT" docs/tranches/X/` → **`F-W7.md:120` only**. PASS-1 convicted a dissent quote at blank `F-W10.md:106`; the repair moved it two lines and re-minted a sentence that still exists nowhere in F-W10. The dissent itself is real — at `F-W5.md:161` — so the cure is to drop the ≡ leg or re-anchor it at `:116` with F-W10's own words.

**D-5 · MAJOR — G-F7-8's operand window no longer holds the clause register.**
The zero-re-booking gate, §2a's reconciliation operand, §5c/§5e, §7c and §9c all name *"live `F-W5.md:138-157`"* as the register the set-difference runs against.
Receipt: `:138-157` is live **D15 · D17 · §E heading · table header · separator · E1…E12**. The E-clause register is **`:146-165`**. Two of the eight roster anchors (`:142` for E5, `:145` for E8) now point at a **section heading** and a **`|---|` table separator** — structurally impossible occupants for a clause citation. The roster is correct **by id** (R-1e discharged); only the addresses fail. A gate that exists to prove ∅ in both directions must name an operand that resolves.

**D-6 · MAJOR — both "DECLARED" reciprocals — the cells that discharge G-F7-11 from the far end — cite non-content lines.**
§7c: *"**DECLARED — `F-W6.md:182`** (re-read this seat: …)"* and *"**DECLARED — `F-W8.md:204`** (re-read this seat: *'SIBLING — OWNER-GATED, no gating either way'*)"*.
Receipt: `sed -n '182p' F-W6.md` → the **fr-EquationView M-CK** carry row; F.W6's F.W7 edge is at **`:304`** (and its exclusion twin at `:323`), where the quoted words do reproduce. `sed -n '204p' F-W8.md` → **`### 5b. Cure-integrity locks (bind the repair, not the finding)`**; F.W8's sibling row is at **`:217`**, where the quote reproduces. Both substances hold; both citations are ~120 and ~13 lines off.

**D-7 · MAJOR — the minted ∅ row's lock is labelled "verbatim" and is not.**
§5a `F-MAIL-∅`: *"▲ **LOCK, verbatim (KF.W1 C-14, `KF-W1.md:256`): *a wave with no registry rows gets no manufactured ones* — the ∅ is a finding, not a gap.**"*
Receipt: `sed -n '256p' KF-W1.md` → *"| **Any registry row, gate, or bounds item manufactured to fill the empty column** | **A wave with no adjudicated rows gets no invented ones. The ∅ is a finding ⟨C-14⟩** |"*. Two substitutions (**registry**←adjudicated, **manufactured**←invented — the first word borrowed from the row title, conflating title with cell) plus an appended clause (*"not a gap"*). Substantively faithful; **declared verbatim, and not**. Same class as PASS-1 D-14, which this round cured elsewhere and re-committed here.

**D-8 · MAJOR — the N-1 propagation rider names a heading.**
§5a N-1, §7c and §12 all assert *"**F-W8.md:204** repeats the stale *'carried on BOTH sides'* premise"* — §12 makes it the wave's closing lesson (*"the premise had already propagated once"*).
Receipt: `grep -rn "carried on BOTH sides" docs/tranches/X/` → **`F-W8.md:217`** (inside the F.W7 sibling row) and three self-references in `F-W7.md`. `:204` is a heading. The propagation claim is TRUE; its address is not, and it is asserted as re-read.

**D-9 · MEDIUM — R-9.1's two F.W0 pointers are both off.**
§7c: *"`F-W0.md:199` G-11 — *'ONE corrected anchor table published; every later wave quotes it'* — landing in `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (`F-W0.md:63`)"*; repeated at §11.
Receipt: `sed -n '199p' F-W0.md` → **blank**; G-11's heading is at **`:211`** (`### G-11 — ONE corrected anchor table published; every later wave quotes it` ✓ verbatim). `sed -n '63p' F-W0.md` → `| `fourier/CLAUDE.md` | **create** …`; the ledger's create row is at **`:65`**. (Note: `F-W1.md:294` cites `F-W0.md:199` for the same law, so the drift is lane-wide — but F-W7's is still unreproduced.)

**D-10 · MEDIUM — an uncounted denominator survives in §1, in the file that retires denominators-by-assertion.**
§1's AUDITED row: *"**9** adjudicated `fr-*.md` records **cited**, none routed to F.W7"*. §5's own §112 line insists *"a census wave may not state its own denominator by assertion."*
Receipt: `sed -n '110,155p' F-W7.md | grep -ohE 'fr-[A-Za-z]+' | sort -u | wc -l` → **12** (`fr-AdminAuditLog · fr-BasisCanvas · fr-ContourEditorCanvas · fr-ContourSettings · fr-GalleryAdminBanner · fr-GalleryDraftsSection · fr-GalleryView · fr-ImageUpload · fr-PaperSidebar · fr-SpeedSelect · fr-Tooltip · fr-VisualizationView`) — **10** excluding the two disposal cites. Neither reading is 9. The §5 count was cured; this one was not.

**D-11 · MEDIUM — six further F-W5 section/line pointers stale.**
`F-W5.md:33` (§0b's FR-GIG-5 bar, cited at §1b **and** at G-F7-8's close condition) → live §0a's goal criterion; §0b is `:35`, the bar's bytes `:37`. `F-W5.md:212` cited as *"`F-W5.md:212` = `## 3. Gates — 22, all born-RED`"* — the load-bearing proof that F.W5 has **no** §3 Prohibitions, stated three times — → live a dissent-register content row; the heading is `:222` (**the claim is still TRUE**, only its receipt fails). `F-W5.md:150` (C-25) → E5. `F-W5.md:147` (E10 + *"Distinct from B4's liveness predicate"*) → E2. `F-W5.md §4 edge X-1 (:251)` → gate G22; X-1 is `:261`. `F-W5.md:146/:148/:149` (the E9/E11/E12 anti-rename triple) → E1/E3/E4.

**D-12 · MINOR — a stated probe output does not reproduce.**
§2a: *"`find docs/tranches/X/fourier -type d` returns `carry`, `waves`, `conformance` only."*
Receipt: it returns the root plus **`carry`, `waves`, `conformance`, `conformance/PASS-1`**. The load-bearing conclusion — no `contract/`, no `design/` — holds.

---

## §7 — WHAT SURVIVES INTACT (recorded so pass 3 does not overshoot)

1. **The census is perfect and the escape is closed.** `routedTotal = 0` / `bookedCount = 0` / `escapedCount = 0`, proven with the token-not-substring probe under both dash forms. L-5 is excluded-with-reason; N-2's `147 / 146 / 1` is exact; the `KF.W7` disposal is right.
2. **Every product-source and git probe in both trees reproduces exactly** — twelve for twelve, unchanged from PASS-1.
3. **Every registry-record quotation reproduces verbatim at its stated line** — the 66-record corpus is cited with total fidelity. **The drift is entirely in the sibling-spec layer, not the corpus layer.**
4. **All sixteen PASS-1 defects are cured in substance**, including the two CRITICAL fabrications: the invented F-W5 prohibition is struck and re-voiced (R-1a), the dissent is re-anchored to bytes that genuinely bank it (R-1b), the four clause ids are correct, the CARRY receipt is struck as false over a nonexistent artefact, and the count is stated over a counted table.
5. **The F.W1 atomicity citation is exemplary** and its anchors are the round's only survivors.
6. **§4's inline-ruling discipline, the XOR goal criterion, the no-credit posture and the HALT arms are unchanged and remain the best in the sub-tranche.**
7. **L-19, E-3, status and read-only posture: clean.**

**Repair order (smallest cut first).** D-1, D-5, D-9, D-11 are **one mechanical re-anchor** against the live siblings (+8 into F-W5; the F-W0/F-W10 pairs; the E-register window `:146-165`). D-6 and D-8 are two more. D-2 is the only cure with **content**: the F.W5 spine reciprocal is **written** — G-F7-11's witness and four §7c cells must record it as **DECLARED at `F-W5.md:266`**, leaving **F.W0 as the sole owed reciprocal**. D-3 and D-4 must be **struck or re-sourced** — one quote survives only at `F-W3.md:410`, the other at no coordinate at all. D-7 is one word-for-word transcription; D-10 one count; D-12 one clause.

**Structural recommendation for pass 3 (lane-wide, not F.W7's alone).** Nine specs repaired inside four minutes and each re-cited the others' pre-repair line numbers. Only F-W1 survived, because `F-W1.md:309` **pinned its coordinates and said so**. Cross-wave citation in a concurrent round should carry a **section+id address** (`F-W5.md §2 clause E16`) with the line as a hint, or the same drift will re-convict every seat next round.

---

## §8 — TALLY

| metric | value |
|---|---|
| adjudicated row ids routing to F-W7 (**routedTotal**) | **0** |
| of those, booked by the spec (**bookedCount**) | **0** |
| escaped (**escapedCount**) | **0** — PASS-1's L-5 escape CURED at §8 |
| rows the spec carries | **15** — declared 15, counted 15 ✓ |
| carried rows tracing cleanly to a banked id | **15 of 15** (id-level) |
| carried rows mis-keyed against their F.W5 home **by id** | **0** (PASS-1's 4 cured) |
| gates | **11** declared, 11 present, all born-RED |
| gate witnesses reproducing exactly | **6 of 11** (G-F7-2/3/4/7/9/10) |
| gate witnesses substantively right, coordinate stale | **4** (G-F7-1/5/6/8) |
| gate witnesses refuted at the bytes | **1** (G-F7-11) |
| quotations that exist at **no** coordinate | **2** (D-3, D-4) |
| quotations declared verbatim that are not | **1** (D-7) |
| stale-but-real citations (concurrent-repair drift) | **22** |
| phantom paths cited as existing witness-holders | **0** (all three PASS-1 phantoms cured) |
| **verdict** | **DEFECTIVE** |

*Read-only everywhere except this file. Zero product bytes; zero fourier bytes.*

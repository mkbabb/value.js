# F-W7 — FRESH ADVERSARIAL SPEC CHECK, PASS 3 (X·F L-18/L-20)

**Seat**: fresh, 2026-08-28. **No roster inherited.** Every figure below was re-derived at the bytes by this seat; the two prior registers (`PASS-1/F-W7-CHECK.md`, `PASS-2/F-W7-CHECK.md`) and their rulings (`PASS-1/RULINGS.md`, `PASS-2/RULINGS-2.md`) were read for *binding law only*, never for findings. **This file is this seat's only write.** Target: `docs/tranches/X/fourier/waves/F-W7.md` (301 lines at this writing). Corpus: the **66** `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`. Real carries: `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` only — **no `F-W7-CARRY.md` exists** and none is assumed.

**Verdict: DEFECTIVE** — 4 MAJOR · 3 MEDIUM · 4 MINOR/INFO. The census axis is **CLEAN**; the failures are all quote-provenance, canonical-form and internal-consistency, i.e. exactly the class the spec's own §12 thesis names.

---

## §1 · AXIS 1 — ID-KEYED CENSUS (fresh enumeration; escapes by bytes)

**Detector stated inline** (R2-9): tokens `F.W7` in **any row shape** — markdown table rows ⊕ id-headed route-marked bullets ⊕ prose routings walked to their enclosing row id — probed in **both dash spellings** (U+002D and U+2013), with every slash/band form expanded to its member set.

| probe | ⟨cmd⟩ (this seat, read-only, cwd = `registry/adjudicated/`) | result |
|---|---|---|
| token-bounded `F.W7`, any format | `grep -oE '(^\|[^A-Za-z])F\.W7([^0-9A-Za-z-]\|$)' fr-*.md \| wc -l` | **0** across all 66 |
| bare substring `F.W7` | `grep -n 'F\.W7' fr-*.md` | **2** — `fr-Tooltip.md:10` and `:32` |
| are both inside `KF.W7`? | `grep -c 'KF\.W7' fr-Tooltip.md` | **2** — yes; both are the keyframes cross-repo relay note (`kf-TimelineHoverPreview MISSED-1 ariaLabel cure @ KF.W7`). **Disposed, not routed.** |
| bare `W7` token | `grep -ohE '(^\|[^A-Za-z0-9.])W7([^0-9A-Za-z]\|$)' fr-*.md \| wc -l` | **0** |
| every span/slash form in the corpus | `grep -ohE 'F\.W[0-9]+[-–/]W?[0-9]+' fr-*.md \| sort \| uniq -c` | `F.W3/W4` **1010** · `F.W5-W8` **120** · `F.W5–W8` **72** · `F.W9/W10` **54** · `F.W1/W2` **5** · `F.W0/W1` **2** · `F.W1/W3` **1**. **No `F.W6-W8`, no `F.W7`-bearing span in either dash spelling.** |

**routedTotal = 0 · bookedCount = 0 · escapedCount = 0.**

The `F.W5–W8` band (192 occurrences, both dash spellings) is **F.W5's** row by the adjudicated split the spec disowns it to (§5d B-2), and the spec measures it spelling-agnostically in the `F-MAIL-∅` cell. **This is a confirmation of R2-8's closed posture, not a re-litigation**: the corpus has not changed and no seat re-derives `routedTotal` as an open question.

**§5 denominator, re-derived:** the spec's own probe `awk '/^## 5\. Carry/,/^## 6\. Gates/' F-W7.md | grep -ohE 'fr-[A-Za-z]+' | sort -u | wc -l` → **15**, and the published decomposition is exact: **10 substance** (`fr-AdminAuditLog · fr-BasisCanvas · fr-ContourEditorCanvas · fr-ContourSettings · fr-GalleryAdminBanner · fr-GalleryDraftsSection · fr-GalleryView · fr-ImageUpload · fr-PaperSidebar · fr-SpeedSelect`) · **2 disposal** (`fr-Tooltip`, `fr-VisualizationView`) · **3 quote-resident only** (`fr-EquationView`, `fr-GallerySearchBar`, `fr-FourierShapeExtractor`). **CLEAN.**

**§5 row arithmetic, re-counted**: §5a **5** + §5b **1** + §5c **4** + §5d **3** + §5e **2** = **15**, and the §5 span holds exactly 15 `| **` rows. **CLEAN.** §6 gates = **11**. §7c = **17** (15 edges + F.W1 + F.W9/W10). §2a bounds = **5**. All published counts reproduce.

**N-2's measured figures reproduce exactly**: six-term unbounded probe over the 66 → **147** lines; word-bounded → **1** survivor, `fr-ContourEditorCanvas.md:56` L-5, banked **`ADJUDICATED → F.W3/W4`** — excluded-with-reason at §8, correctly not booked.

---

## §2 · AXIS 2 — QUOTE REALITY (every quotation re-run by this seat)

**44 ⟨cmd⟩ notes** in the file. Verified byte-exact against live targets: the F-W5 `F.W5 → F.W7` row · F-W5 clause heads **E1 · E3 · E5 · E7 · E8 · E9 · E10 · E11 · E12 · E13 · E16 · E17** · gates **G4 · G7** · the `§E` heading and its `E1…E20` membership · `§D` clause D1's register · §0b FR-GIG-5 · §1a's `OWNER-RULINGS-F.W5.md` create row and its `ls → No such file` line · E16 ▲'s bilaterality adoption · E10's *"Distinct from B4's liveness predicate"* · C2's *"m-15 is CROSS-REFERENCED, NOT MERGED with F-4"* · F-W3 §4's S-6 tail and §X's exclusion row · F-W3 §C.K's P-10 row · F-W6 §4 + §5's F.W7 rows · F-W8 §5c's F.W7 row · F-W10 §2.3's heading and its SS-4-PREREQ dissent (byte-identical) · F-W10 §2.8's E-16 minute · F-W0 §6b's F.W7 reciprocal (three clauses, ellipses honest) · F-W0 §4's anchor-stability masthead, G-11/G-12/G-13 headings, §2a's SUBSTRATE-LEDGER create row · F-W1 §4 step 4's TWELVE-limb charter · KF-W1 §5 C-14's LOCK (L-19) clause, its *empty column* sentence, and §8's ⟨C-14⟩ exclusion row (**all three split, un-fused — R2-1d's cure correctly applied**) · COHESION §2 (TA-4 prerequisite; both-ends law) and §3 item 2 · CENSUS §4 sketch 8's wrapped `both object`/`kinds` · lane-crud §7's *"both sides carry"* and §R-4's `flat BAG` · `fr-AdminAuditLog:126` · `fr-GalleryAdminBanner:90` · `fr-ContourSettings:43/:69/:100/:126` · `fr-ContourEditorCanvas:48/:56/:105/:139` · `fr-EasingPicker:70` · `fr-ImageUpload:124` · `fr-SpeedSelect:44/:45` · `fr-GalleryDraftsSection:40/:80` · `fr-GalleryView:34` · `fr-CanvasOverlayButton:64` · `atomdiff.py:1/:7/:12-14`.

**Anchor idiom (R2-2): FULLY CONFORMANT.** `grep -oE '(F-W[0-9]+\.md|KF-W[0-9]+\.md|COHESION\.md)[^ ]{0,3}:[0-9]+' F-W7.md` → **∅**. Every surviving `:NNN` addresses the frozen corpus or product source. This is the cleanest anchor posture in the lane.

**Live product/substrate probes, all re-run and all reproduced**: `grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` → **1** comment hit (`palettes-forks.test.ts:9`) · `ls $V/api/src/lib` → *No such file or directory* · `grep -rniE "merkle\|flat bag\|not a tree" $V/api/src $V/src` → **1**, `hash.ts:6` *"(Merkle property)"* · `hash.ts:8-17` folds `{name, colors}`, never `paletteSlug` · `paletteVersion.ts:13-14` `findByHash → {_id: hash}`, `:47` early return · `git -C $F status --porcelain | wc -l` → **28** · HEAD **`cd26c653`** on `m/w1-bump-migration` · `git cat-file -t 14d83356` → **fatal** · `find fourier -type d` → root + **5** (`carry · waves · conformance · conformance/PASS-1 · conformance/PASS-2`; neither `contract/` nor `design/`) · `ls waves/` → **11** files · `J-diff-shape.md` absent value-side, present fourier-side with **`## §6 — The close-gate clause (both conformance probes assert against THIS doc)`**.

### D-1 · MAJOR — FABRICATED AUTHORITY, minted BY the anchor-idiom paragraph itself

§0 item 1 publishes, attributed to F-W5's `F.W5 → F.W7` row: *"That same row instructs its consumer in this exact idiom: **"cite E16 and G7 by clause and gate id, never by line."**"*

⟨cmd⟩ `grep -c 'cite E16 and G7' F-W5.md` → **0**. ⟨cmd⟩ `grep -c 'by clause and gate id' F-W5.md` → **0**. ⟨cmd⟩ `grep -rln 'cite E16 and G7' waves/` → **`F-W7.md` only**. The string's real home is ⟨cmd⟩ `grep -n 'cite E16 and G7' conformance/PASS-2/RULINGS-2.md` → **`:65`, R2-2 LAW item 1** — a **rulings file**, which **R2-1-LAW item 3** declares *"not quotable authority … a spec quoting 'the banked lock' quotes the BANK, by command, at the bank's live bytes — never the ruling's paraphrase of it."* The quotation additionally carries **no ⟨cmd⟩ note** (R2-1-LAW item 2: *"a 'verbatim' label without a ⟨cmd⟩ note is a defect per se"*).

The live bytes say the same thing in different words — F-W5's row reads *"cited by **clause id at this end and by §-anchor + row label at the other, with NO line number at either end**"* — so the **substance holds and the attribution does not**. This is R2-1d's convicted class recommitted, in the very item that announces the class closed by construction. **Cure**: strike the quotation marks and the "instructs its consumer in this exact idiom" framing; state the idiom in F.W7's own voice, or quote F-W5's actual sentence with its ⟨cmd⟩.

### D-2 · MAJOR — a ⟨cmd⟩ that cannot produce the bytes it is offered for (spelling-blind, in the row that cures spelling-blindness)

§5a's **P-10** row: *"**Corroborated TWICE, at two stable anchors, both produced by one command this seat ran this round** — ⟨cmd⟩ `grep -rn "not carried" waves/F-W3.md`: [F-W3 §4, the S-6 row's declared-not-carried tail] … and [F-W3 §X, the exclusion row]."*

⟨cmd⟩ `grep -c "not carried" F-W3.md` → **1**; ⟨cmd⟩ `grep -n "not carried" F-W3.md` → **`:533` only** (the §X exclusion row). F-W3's §4 S-6 tail spells it **hyphenated** — *"Declared-**not-carried** edge"* — so the stated command **never returns it**. One command is claimed to produce two quotes and produces one; the miss is a **hyphen-vs-space spelling blindness**, the exact detector failure R2-9 decrees against. R2-1-LAW item 4 (two homes → two quotes, two ⟨cmd⟩ notes) is breached in the same sentence. *(The row's earlier ⟨cmd⟩ `grep -n 'S-6 · Owner-gated flags' waves/F-W3.md` **does** return `:379` — so the correct command exists elsewhere in the same cell and was not used here.)*

### D-3 · MEDIUM — count word inside an elision disclosure

§7c's **F.W0** row quotes F-W0 §2a's SUBSTRATE-LEDGER create row and declares: *"the trailing ellipsis marks elision of the row's **five** further artefacts, never an addition."* ⟨cmd⟩ `sed -n '77p' F-W0.md | sed 's/.*G-13 pin table + lattice · //' | tr '·' '\n'` → **four**: the stale-dist admissibility rule · the Codex dispositions · the four rulings (§4 G-15) · the recorded OPTIONs. A wave whose §1 republishes its denominator as a command rather than a number publishes this one as a number, and it is wrong by one.

### D-4 · MEDIUM — emphasis added inside a *"verbatim and **whole**, no elision"* marker (the file's own D-6 law)

§7c's **F.W6** row quotes F-W6 §4's F.W7 row under that exact label and renders *"(`atomdiff.py:12-14`, **quoted both trees**)"*. ⟨cmd⟩ `sed -n '316p' F-W6.md` → the source has **`quoted both trees`, plain**. The same row is quoted **un-bolded** at G-F7-11 in this same file — so the spec disagrees with itself about the bytes of one sentence. This is the identical class F-W5's E13 struck as its D-6 (*"emphasis-capitalisation inside a verbatim marker is a rendering, not the bytes"*), which this file **adopted in terms** at §5c.

### D-5 · MEDIUM — a corpus quotation with no ⟨cmd⟩ and a casing change

§5c's **N-3** row publishes `fr-ContourSettings.md:126` as *"Client and server independently converged on content-addressed compute identity … **the** same idea, no shared code — …"*. ⟨cmd⟩ `grep -c '⟨cmd⟩' <the row>` → **0** (R2-1-LAW item 1: a quotation enters only as pasted command output with the command beside it), and ⟨cmd⟩ `sed -n '126p' fr-ContourSettings.md` shows the record's sentence-initial **"The same idea"**. Down-casing inside a verbatim marker is the same rendering-vs-bytes defect the row's own §5c neighbour struck.

### D-6 · MINOR — ⟨cmd⟩ narrower than the quote it certifies

§5b publishes D1's counting lock as **"`@router.` grep is BLIND to prefixed routers (`@gallery_router.get("/cursor")`) — read against 13/44, never as zero."** under ⟨cmd⟩ `grep -on 'grep is BLIND to prefixed routers.\{0,90\}' waves/F-W5.md`. That command's output **begins at "grep is BLIND"**; ⟨cmd⟩ `grep -o '.\{60\}grep is BLIND to prefixed routers' F-W5.md` shows the source reads *"a `@router.` grep is BLIND"*. The published quote is a true substring of the source but is **not** the pasted output of the stated command, and it silently drops the leading "a ".

### D-7 · MINOR — two unmarked truncations

(i) G-F7-11 quotes COHESION §2 as *"Cross-repo edges are declared FROM BOTH ENDS in the spec files."* with a terminal period; ⟨cmd⟩ `grep -n 'Cross-repo edges are declared FROM BOTH ENDS' COHESION.md` → `:77`, which continues *"… in the spec files (the X·V W4-D2 lesson, now law)."* (ii) §5a's E16 ▲ quotation stops at *"states the substance in F.W5's own voice"* where `F-W5.md:181` continues *": the trie/structural-sharing requirement collides …"*. Both elisions are unmarked in a file that elsewhere annotates every ellipsis.

### D-8 · INFO — code-formatting added inside a quotation

K-3's dead upsert arm is quoted at §7b and §8 as (*"a different `point_count` can come back"*); ⟨cmd⟩ `sed -n '105p' fr-ContourEditorCanvas.md` → `("a different point_count can come back")`, no backticks.

---

## §3 · AXIS 3 — M-25 DEPTH (locks · riders · dissents · anti-cures)

**HELD, with one canonical-form failure.**

Verified present and correctly non-booked: the **dissent** at F-W10 §2.3's SS-4-PREREQ row (byte-identical, one home, quoted once) with F-W5 §2 clause **E16 ▲** as its clause-side home cited by id and never quoted through — **the R2-2.3 / R2-10.7 cure is correctly executed at this end** · the **preserved dissent** on the dedup family (`fr-ImageUpload.md:124`, R1's MAJOR, overruled by the `fr-VisualizationView` **L-8** severity-follows-consequence precedent — both re-verified at the bytes, `:78`/`:151`) with its SS-13 re-grade trigger intact · **anti-cures**: K-3's upsert arm KILLED and forbidden as design rationale; E17's `C-2` record-qualified *(NOT fr-GallerySearchBar C-2 at D10, nor fr-FourierShapeExtractor C-2 at G2c; U-12)*; the retired mis-keyings **C-25 ≢ E12 · C-2⊕K-3 ≢ E11 · SS-C-1/2 ≢ E8/E9** each re-verified against the live clause heads · **BC-20**'s `duration = ref(20000)` zero-writers fold banked, never re-booked (`fr-BasisCanvas.md:54` ✓) · **m-15 CROSS-REFERENCED, NOT MERGED with F-4** ✓ · **FR-GIG-5 / F-W5 §0b** no-credit bar ✓ · **D-19** anchor law honoured throughout (every fourier figure declared pre-F.W0 and gated).

**PAW-44 / LAW-3 (`fr-PaperArticleWindow`) · MPC-31 (`fr-MorphPhaseConfig`) · FR-MSP-6 (`fr-MorphShapePreview`)**: none routes to F.W7 (the census is ∅), and none is a lock this wave inherits. Their absence from F-W7 is **correct**, not an escape.

### D-9 · MAJOR — the corrupt-dist gate is stated three times and never in its canonical form

**R2-7.5** fixes the canonical form **`FR-NP-32 (≡ fr-PaperSidebar M1)`** *"everywhere it is stated"*, and closes the loophole in terms: *"absence from a directive index lifts nothing."*

⟨cmd⟩ `grep -c 'FR-NP-32' F-W7.md` → **0**. The fact is stated three times as **M1 alone**: §5e's OG-F1 row (*"glass-ui 4.0.0's syntactically corrupt `dist/styles/index.css` (M1)"* — bare token), §6 G-F7-7's witness (*"`fr-PaperSidebar` M1"* — record-qualified but not canonical), §7c's F.W0 row (*"corrupt glass-ui 4.0.0 `dist/styles/index.css` (M1)"* — bare token).

⟨cmd⟩ `grep -rc 'FR-NP-32' F-W*.md` → **F-W0 6 · F-W1 3 · F-W2 9 · F-W3 5 · F-W4 2 · F-W5 1 · F-W6 1 · F-W8 1 · F-W9 4 · F-W10 16 · F-W7 0**. F-W7 is **the only X·F spec that does not carry it**, while F-W3 §4's S-1 row and F-W5's X-1 row both model the canonical spelling. Two of the three sites are additionally **bare `(M1)`** — R-5's *"a bare token is not an identity"*, and `M1` is a live homonym class across the corpus.

---

## §4 · AXIS 4 — GATES

**Born-RED**: all **11** gates carry `born-RED witness` cells; §6's masthead and §1's *"All 11 born-RED"* agree with the counted table (⟨cmd⟩ → 11). **G-F7-1** is marked ⊙ OWNER-GATED and declared unauthorable unruled ✓. The **split-verdict discipline** (*"F.W7 never claims a GREEN it did not execute"*) is stated and every gate carries a distinct GREEN owner ✓.

**Witnesses real**: every one re-run above and reproduced — including G-F7-11's hardest operand, where ⟨cmd⟩ `grep -c 'F\.W7' F-W0.md` → **3** and the §6b register's **12** rows have `| **F.W7**` **ninth** (exactly as published), and ⟨cmd⟩ `grep -c 'F\.W7' F-W10.md` → **1**, that hit being §2.8's E-16 minute and **not** a cross-edge row. F-W10 §4b's cross-edge register carries `F.W9 · F.W4 · F.W0 · F.W1 · F.W3 · F.W5–W8/SS-4 · SS-6 · LATEX-PAPER-RELAY · X·V · the fourier sub-session · KF.W10 · X-whole` and **no F.W7 row** — so the gate's **OWED** statement is true at the bytes. The re-basing of G-F7-11 off counts and onto named rows is **correct and correctly minuted**.

### D-10 · MINOR — the closure gate's operand is row-shape-restricted, contra R2-9

**G-F7-8**'s set-difference operands are stated as `grep -cE '^\| \*\*(E1|E3|E5|E7|E8|E10|E13|E17)\*\*' waves/F-W5.md` and `awk '/^### §E/,/^### §F/' waves/F-W5.md | grep -oE '^\| \*\*E[0-9]+\*\*'` — both anchored to **markdown-table shape**. R2-9 is a *program-wide, standing* decree: *"every closure/census gate's operand is the shape- and spelling-agnostic roster … A gate that states a shape- or spelling-restricted operand is DEFECTIVE at authoring, whatever its result … **Every gate cell states its detector INLINE** (shapes + spellings + the expansion set)."* G-F7-8's cell states no shape tolerance and no spelling set. The result is correct today (**8/8 resolve; §E membership = E1…E20**), which is precisely the condition R2-9 says does not cure the operand.

*(By contrast, the §5a `F-MAIL-∅` census detector **is** shape- and spelling-agnostic — token-bounded over whole files, both dash spellings named. That half is model-conformant and is why Axis 1 is CLEAN.)*

---

## §5 · AXIS 5 — POSTURE

| requirement | finding |
|---|---|
| **F.W1 transaction cited whole, pinned coordinate, correct limb count** | **HELD.** §7c's F.W1 row cites *"the **TWELVE**-limb roster chartered at **F-W1 §4 step 4**"*, re-quoted from the corrected charter — and F-W1's `## §4 Sequencing` (`:270`) step 4 (`:276`) is where the roster lives ✓. `grep -c 'ELEVEN-limb' F-W7.md` → **0**; the retirement is stated ✓. The earlier three-limb restatement is struck with the correct reason (*"a partial roster of a land-or-lose transaction normalises a partial landing"*) ✓. R2-5 fully discharged. *(Minor rendering: the quote bolds `**TWELVE**` where F-W1 bolds the whole sentence, and its ellipsis elides the `:294` pin — the latter is **correct** under R2-2 and is not charged.)* |
| **F.W0 pre-gates honoured** | **HELD.** Hard opens-after at §1; G-F7-7 born-RED with all three probes reproduced; §7c and §11 quote **G-11 / G-12** by gate id and the SUBSTRATE-LEDGER by §2a's create row; the HALT branch is stated three times and is byte-identical to the branch F-W0 quotes back. D-19 respected: no HEAD figure or line anchor is claimed live. |
| **W7's ruled posture declared** | **HELD.** §0: *"**The ∅ posture is CLOSED** (round-2 cross-wave ruling R2-8)"*, with the non-re-litigation condition stated correctly (*"unless the corpus itself changes — a new `fr-*.md` routing a row to F.W7"*). This seat re-measured only to confirm; the corpus is unchanged. |
| **F.W9/W10 splice direction (R-2b / R2-6a)** | **HELD, non-inverted.** F.W7 carries no splice obligation. Its F.W9/W10 row quotes F-W10 §2.3's heading verbatim — *"F.W0 RULES; F.W10 VERIFIES, never re-rules"* — and states *"F.W10 verifies that the disposition landed; it does not re-rule it, and F.W7 claims no F.W9/W10 GREEN."* Direction correct; no rival-authoring implication. |
| **SS-4 flags inline** | **HELD.** §7c's SS-4 row: *"SS-4 **FLAGS the trie-vs-KISS ruling INLINE, never presumes it**"*, matched to F-W5 E16 ▲'s *"SS-4 FLAGS THIS RULING INLINE"* and F-W10 §2.3's *"FLAGGED INLINE, never presumed"*. P-10's inline routing is honoured; **no second ruling file** is minted, and `contract/OWNER-RULINGS-F.W5.md` is correctly held **prospective** (`find` shows no `contract/`). |
| **Tree READ-ONLY** | **HELD.** `/Users/mkbabb/Programming/fourier-analysis` declared read-only in §0, §2a and §8; zero fourier bytes proposed; the whole-tree and product-source do-not-touch lists are complete, and `scripts/dev/dev.sh` is named never-staged. All sibling specs, the 66 records, both carries and both conformance passes are listed immutable. |
| **status planned · zero VERIFIED** | **HELD.** `**Status**: planned` (§1) and the four-verb table reads AUDITED **YES** / SPECIFIED **YES** / IMPLEMENTED **NO** / VERIFIED **NO**. ⟨cmd⟩ `grep -on 'VERIFIED[^*]\{0,50\}' F-W7.md` → **one** occurrence, the table row itself. No GREEN, no VERIFIED, no execution claim anywhere. |
| **RULINGS-2 faithfully applied** | **PARTIAL.** R2-8 (posture CLOSED; G-F7-11 re-measured; count words 9→12→**15** published as a probe; find-dirs corrected) ✓ · R2-1d (C-14 split-quote, three quotes, three ⟨cmd⟩, stable KF-W1 anchors) ✓ · R2-2 (**zero** line cites into live siblings) ✓ · R2-5 (TWELVE) ✓. **Failing**: R2-1-LAW items 1/2/3/4 at **D-1**, **D-2** and **D-5**; **R2-7.5**'s canonical form at **D-9**; **R2-9**'s shape-agnostic operand at **D-10**. |

### D-11 · MAJOR — §8 names one stale sibling premise where the file measures two

§8 is the no-silent-drops table (*"each is named so a later reader cannot mistake absence for oversight"*). Its sibling row reads *"`COHESION.md` edits; edits to **F-W8.md's** stale N-1 premise"* — one site. But §5c **N-1** and §12 both measure the bilaterality premise stale at **two**, in two spellings: ⟨cmd⟩ `grep -rn "carried on BOTH sides" waves/` → **`F-W8.md:256`** (§5c's F.W7 sibling row) and ⟨cmd⟩ `grep -rn "quoted both trees" waves/` → **`F-W6.md:316`** (§4's F.W7 cross-edge row) — one hit each, nowhere else. ⟨cmd⟩ `awk '/^## 8\. Excluded/,/^## 9\./' F-W7.md | grep -c 'F-W6'` → **0**. §12 says in terms that the premise *"stands corrected at the keystone and **stale at two consumers**"*; §8 excludes only one of them from editing. The routing request **is** correctly declared at §7c's F.W6 row, so this is a completeness failure in the exclusion table rather than a lost obligation — but §8 is the one table whose whole function is that absence cannot be mistaken for oversight.

---

## §6 · SUMMARY

| | |
|---|---|
| **wave** | F-W7 |
| **routedTotal** | **0** |
| **bookedCount** | **0** |
| **escapedCount** | **0** |
| **defects** | **11** — 4 MAJOR (D-1, D-2, D-9, D-11) · 3 MEDIUM (D-3, D-4, D-5) · 4 MINOR/INFO (D-6, D-7, D-8, D-10) |
| **verdictLocal** | **DEFECTIVE** |

**What holds.** The census axis is exact and its detector is model-conformant; the anchor idiom is the cleanest in the lane (zero line cites into live siblings); every born-RED gate witness reproduces at the bytes; the ∅ posture, the read-only law, the four-verb status and the R2-1d/R2-2/R2-5/R2-8 cures are all correctly executed; and the substance of every carry row survived independent re-derivation.

**What fails.** Every MAJOR is a **provenance or canonical-form** defect, not a substance defect — the spec's own §12 thesis, turned on its author for a fourth consecutive round: **D-1** quotes a *rulings file's paraphrase* as a sibling's bytes, inside the paragraph that declares that class closed; **D-2** offers one command for two quotes and the command returns one, missed by a hyphen; **D-9** is the single lane-wide canonical form this spec alone does not carry; **D-11** is the exclusion table under-naming what the file's own measurement found. The generalisation the spec wrote for itself still applies unamended: *a citation is a measurement, and an unreproduced measurement is an invention.*

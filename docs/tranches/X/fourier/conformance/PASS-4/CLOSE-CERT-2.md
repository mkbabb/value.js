# X·F CONFORMANCE PASS 4 — CLOSE-CERT-2

**Seat**: TRULY-LAST PURGE + HASH-CERT seat, round 4. **Date**: 2026-08-29. **Order**: LAW E / **R4-8.1** — every repair seat landed, the UNION/adjudication seat re-read and re-hashed, and this seat ran **last, touching every file after every other seat's final byte**. Nothing writes after the sha256 table at §8. Any seat that writes a wave spec or the census after this certificate issues **VOIDS it mechanically** — the table proves it.

**Writable set, honoured**: the eleven specs at `docs/tranches/X/fourier/waves/F-W*.md` (receipt and label edits only) and this file. No carry, no check, no union, no ruling, no census byte was written by this seat. The census was **read** as the sole record-side operand and **hashed**, never amended.

**Toolchain, pinned (R4-2.1/.2)**: `bash` with `PATH=/usr/bin:/bin:/usr/sbin:/sbin` — BSD `/usr/bin/grep` · `sed` · `awk` · `cut` · `comm` · `diff` · `find` · `shasum`. Bare `grep` in the recorded interactive shell resolves to **ugrep** and silently differs (it errors at bounds this seat's BSD runs accept, and accepts patterns BSD rejects); every figure below was taken with the pinned binaries, never ugrep.

**Standing falsifier honoured (UNION §5, R4-4)**: this seat authored none of the receipts it convicts. Every cure below was measured, not inherited; every claim in this certificate was produced by a command run this session.

---

## §1 — SCOPE AND METHOD

Every `⟨cmd⟩` marker in the eleven specs was enumerated mechanically and each one carrying an executable operand was **re-run on the pinned toolchain against the live bytes**, across a ladder of thirteen candidate bases (`waves/` · `fourier/` · `carry/` · `conformance/` · the frozen 66-record corpus · `formation/fourier/` · `megatranche/` · `X/` · the value.js root · the fourier product root and `web/`, `web/src/`, the installed glass-ui `dist/`). Declared in-block base variables (`R` `V` `F` `P` `X` `C` `S` `M` `O`) were bound from each file's own declaration block before execution — never guessed.

| measure | figure |
|---|---|
| `⟨cmd⟩` markers, all eleven specs | **1 299** |
| markers that are prose uses of the token (law statements, strike notes, cross-references) | **363** |
| **⟨cmd⟩ receipts carrying an executable operand — RE-RUN THIS SESSION** | **944** |
| resolved to a runnable base and executed to completion | **891** |
| unresolved by the mechanical extractor (residue, itemised at §6) | **53** |
| full re-run sweeps performed (pre-cure, post-cure/settle) | **2**, plus one second-chance extraction pass over the whole residue |

The post-cure sweep is the one this certificate stands on: **every figure at §3 and §4 was re-measured after the last cure landed**, so no cure below is warranted by a reading taken before it.

---

## §2 — SWEEP CLASSES AND THEIR VERDICTS

### Class A — PORTABLE-COMMAND LAW (R4-2.1/.2): **CLEAN, 0 convictions**

- **`-P` / `-coP` / `\K` / lookaround in an executable operand: ZERO across all eleven specs.** The scan returned twenty textual hits; every one is prose *stating* the law (F-W0 §R4-2, F-W6 §0.2 and §607, F-W7 §(A), F-W8 §29, F-W10 E-24) or a pattern-internal capital `P` inside a quoted string (`RE-POINT`, `Plot`, `PaperSidebar`). **There is no `-P` flag left in this programme to cure into `-E` form** — R4-2's re-cut table discharged the F-W4 flagship-witness cluster and its six siblings, and this seat confirms the discharge at the bytes rather than accepting it on report.
- **Bounded wildcards above the BSD 255 limit in an executable operand: ZERO.** The three surviving `.{0,262}` strings (F-W7 `:28`, `:67`, `:253`) are prose citations of the *dead* form inside F-W7's own toolchain minute — the lesson, not the machinery. Widest live bound measured: `.{0,190}` (F-W6), inside the limit.
- **Undefined shell variables**: every `$R` / `$V` / `$F` / `$P` / `$X` / `$C` / `$S` / `$M` consumed by a live ⟨cmd⟩ resolves to a declaration in its own file. The R4-2.3 conviction that named this seat's predecessor (**cert count iv**, F-W5's phantom `$R`) is **CURED**: F-W5 now carries `R=docs/tranches/V/megatranche/registry/adjudicated` as an executable assignment with 15 consumers, and F-W6 / F-W9 carry their `C=` and `V=` in fenced blocks ahead of use.

### Class B — VERBATIM AND PASTED SPANS: **271 byte-checked, 2 convicted**

Every receipt whose paste is a quoted span (`*"…"*`, `"…"`, or a backticked line) was normalised for markdown emphasis, backticks, curly quotes and dash spelling — **never for words** — and tested for containment in the command's live output. 271 spans qualified; 9 failed first pass; **7 cleared on inspection** and **2 CONVICTED** (§3 items 2 and 5).

The seven cleared, each with its reason, because an attestation of sweep that hides its residue is the defect R4-1.9 struck:

| site | why it cleared |
|---|---|
| F-W3 `:412` | trailing `\`` is the markdown escape for a backtick; the span is a true prefix of `sed -n '49p' fr-App.md` |
| F-W4 `:183` | the cell **declares** its base (*"the fourier tree"*); run there, `find . -name 'DELTA.md' -not -path '*/node_modules/*'` returns exactly the one path pasted |
| F-W5 `:17` | the receipt is labelled *"the ids"*, not verbatim; both id lists re-derived from the frozen corpus and correct (`AA-44…AA-48`; `L-m3/C-10 · L-m4/C-12 · L-m5 · M-5 · M-7 · M-8 · M-9`) |
| F-W6 `:308` | the span carries a disclosed `…` elision; both halves live at `F-W5.md:415`, contiguous with the elided clause |
| F-W8 `:369` `:370` `:371` | leading and trailing `…` disclose the cut; each paste is an exact suffix/substring of the `tail -c` window the command prints |

### Class C — NUMERIC RECEIPTS: **11 flagged, 2 convicted**

Nine cleared, and the reasons matter because they are two distinct idioms the next round must not re-convict:

1. **Table-cell pipe escaping.** Inside a markdown table cell a `|` is written `\|`. Read as the cell renders, F-W1 `:266` (`66` · `681` · `845` · `0` · `0`), F-W2 `:264` (`1`), F-W6 `:199` (`13`) and F-W10 `:419` (`56` · `31` · `61`) **reproduce exactly**; F-W9 `:113` `:124` `:143` reproduce exactly (`9` · `2` · `3`) read as ERE literal pipes. Both readings are in use in this programme and **no receipt fails under both**, so none is convicted here — but the idiom is inconsistent across files and F-W1's own E-3 row already rules the pipe-free re-cut the correct form. **Recorded as OUTSTANDING for pass 5** (§7 item 1), not cured by this seat, because curing it means re-cutting commands rather than editing receipts.
2. **Quoted-dead receipts inside their own strike notes.** F-W4 `:112` and `:137`, F-W6 `:630`, F-W8 `:36` publish a *superseded* figure inside a note that states, at the same site, that it does not reproduce and why. That is the E-3 addenda idiom working correctly; the live divergence is the note's own thesis.

### Class D — CROSS-WAVE RECEIPTS AGAINST FINAL SIBLING BYTES: **341 checked, 4 convicted**

Every receipt whose operand is a sibling `F-W*.md` or a carry was re-run against the sibling's **settled** bytes. Twins first, as ordered:

- **The F-W9 ⟷ F-W10 twin.** All six published `diff <(awk …F-W9.md) <(awk …F-W10.md)` legs — the `THE F.W1 VISUAL-REGRESSION`→`Born-RED witness` region and the `| record | identity`→`By-mechanism entrants` table — were re-run at this settle. **Every one returns EMPTY.** The twin is byte-identical in both spliced regions, at both ends, after all round-4 writes. `G-F9-21`'s `diff`-empty leg and `G-F10-6` are **GREEN at the bytes** and the twin hand-off is real, not narrated.
- **F-W6 `:382` / `:383`** (the `fr-ConvergencePlot C-7` and `fr-FunctionInput L-M3 ⊕ fr-ConvergencePlot L-m13` mirror receipts against F-W5) reproduce exactly.
- **F-W7 `:250`** (the `§E` clause-register set-differences against F-W5) reproduces exactly: `E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17` and `E1…E20`.
- **Four convicted**: §3 items 1, 2, 4, 5 below.

### Class E — CENSUS OPERAND (task item 4, enforcing R4-3 / R4-10): **PASS — no spec cites another census as an operand**

`CENSUS-CANONICAL.md` is named **138 times** across the eleven and is the roster/denominator operand at every one of them. Two other census filenames appear; neither is an operand anywhere:

| name | where | disposition, verified at the bytes |
|---|---|---|
| `formation/fourier/CENSUS-2026-08-03.md` | F-W0 (11) · F-W1 (2) · F-W2 (1) · F-W4 (3) · F-W6 (9) · F-W7 (5) · F-W9 (16) · F-W10 (6) | **DEMOTED, never a denominator.** F-W6 §1 r7 states it in terms (*"survives in bounds ONLY as the routing-law authority … never as a denominator"*); F-W10 §2.5 **DEMOTES it to provenance**; F-W9 §2.8a enumerates its three sites and rules it *"an operand at none"* — its uses are the §4 wave-sketch **authorization clauses** and one **absence probe** (`grep -o '4\.5'` → ∅, exit 1). F-W0/F-W1/F-W2/F-W4/F-W7 cite it only as charter text, bounds, or an errata-addendum target. `G-F4-CENSUS-CELLS` takes it as a **correction target**, which is the opposite of a denominator. |
| `CENSUS-ADDENDUM-2026-08-25.md` | F-W9 (3) · F-W10 (1) | a **MODIFY target** and a bounds row; cited as an operand nowhere. |
| a check file as an operand | 2 ⟨cmd⟩ sites, both F-W0 `:55` | both are attestation quotes of the born-RED gate count, not rosters. R3-4 / R4-3 hold: **no denominator anywhere descends from a `PASS-n/*-CHECK.md`.** |

**Verdict: no spec cites a census operand other than `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md`.**

---

## §3 — CONVICTIONS AND CURES (11 receipt sites; 10 fixed from live output, 1 struck with its dependents)

Every cure below was produced by a command this seat ran, on the pinned toolchain, **after** every other seat's final byte; every one is re-verified at §4.

### 1 · F-W0 — THE R4-8.3 SIBLING-HASH RIDER FIRED ON ITS FIRST OUTING · **FIXED** (6 quote sites)

Round 4 banked `⟨cmd⟩ shasum -a 256 F-W1.md F-W3.md F-W7.md | awk '{print substr($1,1,12), $2}'` → `83ffe83cb37f F-W1.md` · `a89c3386f3f8 F-W3.md` · `8b631aca0dc1 F-W7.md`. **Two of the three are false at the settle.** F-W7 was re-written after F-W0 quoted it; F-W1 twice more, the second time by this seat's own cures at items 3 and 4. `F-W3.md` alone holds.

This is **the first mechanical proof this programme has** that a same-round cross-file quotation went stale rather than merely being suspected of it — the exact failure mode (F-W8 masthead 19:15 vs F-W5 rewrite 19:19) that LAW E was minted to end. The rider worked. All six sites in F-W0 (`:29` ×2, `:186` ×3, `:335`, `:455`, `:457`) are re-pinned; the quoted **words** at §6b, §7c and §8 were re-run against the new bytes and reproduce unchanged — only the fingerprints moved.

### 2 · F-W1 `:372` — CROSS-WAVE RECEIPT AGAINST F-W2 RETURNS ∅ · **FIXED**

Published: `grep -o 'home \*\*F\.W1\*\* costing + \*\*F\.W4\*\* hygiene' F-W2.md` → *"home **F.W1** costing + **F.W4** hygiene"*. Re-run: **∅, exit 1**. F-W2's repair seat re-wrote its `MISSED-F` terminal cell (`F-W2.md:149`) and the words moved. Re-cut to the live bytes: `grep -o '\*\*F\.W1\*\* (costing correction) \*\*+ F\.W4\*\* (no-duplicate-imports hygiene)' F-W2.md` → *"**F.W1** (costing correction) **+ F.W4** (no-duplicate-imports hygiene)"*. The cell's finding — that F-W2 already cited the home and F-W1 never answered — is **unchanged**; only the receipt moved. The companion receipt in the same cell (`CITES. **A1's five-site inventory inherits the costing correction**`) reproduces and was left alone.

### 3 · F-W1 `:363` — ONE COMMAND, TWO BASES (R4-2.4) · **FIXED**

`grep -l 'D-corpus' F-W1.md carry/F-W1-CARRY.md` **resolves under no single base**: from `waves/` the carry is absent, from `fourier/` the spec is absent; exit 2 at every root on the ladder. Re-rooted at `fourier/` where both operands exist: `grep -l 'D-corpus' waves/F-W1.md carry/F-W1-CARRY.md` → `waves/F-W1.md`. The SET is unchanged and the finding (the carry is not a member) stands.

### 4 · F-W4 `:111` — BANKED SELF-COUNT FALSE BY ONE · **FIXED**

Round 4's purge seat banked *"re-run over the settled bytes → `11`"*. Live at this settle: **`12`**. The drift is the *shape's*, not a miscount — a self-count is false one edit after it is written, which is why **R3-3.10 / R4-8.3** ban it outright and why the identical shape at F-W4 §2.H was struck rather than re-pasted. Corrected rather than struck here only because three sibling receipts in the same block carry the same pairing and a lone strike would break the block's form. **The figure is true as of §8's table and must be re-run, never inherited.**

### 5 · F-W4 `:140` — BANKED LOOP FIGURES FALSE AT THE FIRST MEMBER · **FIXED**

Banked `4 · 3 · 3 · 7`; live **`7 · 3 · 3 · 7`**. Same shape, same disposition. The erratum is written **token-free on purpose** — naming the ids in prose would itself move the figures it corrects, which is the whole lesson of the banned shape, and this seat proved it the hard way: a first draft of these two errata quoted the ids and pushed `12`→`13` and `7`→`8` inside the same edit. The prose was re-cut until the published figures are the measured ones.

*(The two other self-count receipts in the same block reproduce exactly and were left untouched: the ten-member GCM loop `5 · 3 · 5 · 12 · 3 · 3 · 3 · 3 · 4 · 5`, and the `D:m-6` pair `1` and `1`.)*

### 6 · F-W6 `:379` — CROSS-WAVE RECEIPT AGAINST F-W5 RETURNS ∅ · **FIXED**

Published: `grep -o 'FR-NP-30b (cited A5)' waves/F-W5.md` → *"FR-NP-30b (cited A5)"*. Re-run: **∅, exit 1**. F-W5's round-4 seat **restored `FR-NP-30` as the banked head with `FR-NP-30b` riding beside it** (anti-rename R-5/U-12, the canonical homing `FR-NP-30` at F.W5 with an F.W1 leg) and re-wrote both its A5 and D12 cells — so the quoted spelling no longer exists there. Re-cut to the live A5 cell's own words: `grep -o 'R6-8 sub-arm carried beside the banked head, never instead of it' waves/F-W5.md`. **The citation is unchanged** — F.W5 D12/A5, 3-CITE ⊙ — only the receipt moves.

### 7 · F-W0 `:451` — THREE LINE COORDINATES INTO A LIVE SIBLING, ALL FALSE · **STRUCK, WITH ITS DEPENDENTS RE-CUT**

Published: *"§7c Cross-edges at `:214`", "§11 Dependencies at `:299`", "the quoted words live at `:218`"*. Re-run at the settle: §7c is at **`:267`**, §11 at **`:352`**, the quoted words at **`:271`** — **all three false by 53 lines**, F-W7 having been re-written after this cell quoted it (item 1 convicts the same drift independently through the hash).

**Struck rather than re-pasted.** R2-2's anchor idiom forbids addressing a live sibling by line number at all; three fresh numerals would re-arm the identical defect for pass 5. The claim the cell actually makes is **structural** — §7c holds the source, §11 holds a *different* F.W0 row — and it is now warranted by two receipts that survive the next edit of the file they describe:

- `/usr/bin/grep -oE '^#{2,3} (7c\. Cross-edges|11\. Dependencies)' F-W7.md` → `### 7c. Cross-edges` · `## 11. Dependencies`
- `/usr/bin/awk '/^### 7c\. Cross-edges/,/^## 8\./' F-W7.md | /usr/bin/grep -c 'FR-NP-32'` → `1`

---

## §4 — PER-WAVE RECEIPTS (post-cure, re-run by this seat at the settle)

| wave | ⟨cmd⟩ operands re-run | convictions | cures landed | post-cure verdict |
|---|---|---|---|---|
| **F-W0** | 82 | 4 (hash triple ×2 sites · 2 hash pins · the `:451` coordinate triple) | 6 quote sites re-pinned · 1 strike + 2 anchor probes | **CLEAN.** `shasum -a 256 F-W1.md F-W3.md F-W7.md \| awk '{print substr($1,1,12), $2}'` → `a1302689aaa3 F-W1.md` · `a89c3386f3f8 F-W3.md` · `5cc3346db23e F-W7.md` — matching all six in-file pins. Anchor probes return `### 7c. Cross-edges` · `## 11. Dependencies`; containment probe → `1`. F-W7 word quotes re-run: `If F.W0 fails, the wave HALTS` ✓ · the canonical-pair `grep -Fc` pair → `0` / `1` ✓ |
| **F-W1** | 129 | 2 (`:363` two-base · `:372` ∅) | both re-cut | **CLEAN.** `grep -l 'D-corpus' waves/F-W1.md carry/F-W1-CARRY.md` → `waves/F-W1.md`; the F-W2 re-cut returns its span exactly. Roster arms re-run: `66` files · `681` lines · `F.W1` **845** · `F·W1` `F–W1` `F-W1` **0** each. Ragged-row self-probe → **NO OUTPUT** (clean table geometry) |
| **F-W2** | 138 | 0 | — | **CLEAN.** `:264` → `1` ✓ · `:170` → `0` ✓ · `:266` → `114:});` ✓ · the census `### F.W2 — **31 rows**` locate ✓. Its `MISSED-F` cell is the *source* F-W1's item 2 re-cut now quotes |
| **F-W3** | 84 | 0 | — | **CLEAN.** `1990` → `0` · `2079` → `0` · `1 990\|2 079` → `1` · thin-space → `0` · `1 315` → `1`; the `SUBSTRATE-LEDGER` and `### 2a` locates into F-W0 reproduce; `sed -n '49p' fr-App.md` paste is byte-true |
| **F-W4** | 82 | 2 (two banked self-counts) | both corrected from live output | **CLEAN.** `BC-10` → **12** · PAW loop → **7 · 3 · 3 · 7** · GCM loop → **5 · 3 · 5 · 12 · 3 · 3 · 3 · 3 · 4 · 5** · `showImageOverlay` / `shape only` → **1** and **1** · `find . -name 'DELTA.md' …` in the fourier tree → the one pasted path · `grep '^### G-11' waves/F-W0.md` ✓ |
| **F-W5** | 116 | 0 | — | **CLEAN.** `$R` phantom (round-3 cert count iv) **CURED**: `R=` declared once, 15 consumers, all resolving. Both corpus ranges re-derive their pasted id lists exactly. `SS-L-07 / SS-C-10` and the `:59` full-return paste reproduce |
| **F-W6** | 148 | 1 (`:379` ∅ against F-W5) | re-cut to the live A5 words | **CLEAN.** `:382` / `:383` mirror receipts reproduce · `:199` → `13` ✓ · the census `28 rows` / `90 rows` heading quotes ✓ · the routing-law `sed -n '200,202p'` quotes ✓ · the nine `grep -l … waves/F-W5.md` absence probes all still **not members**, as published |
| **F-W7** | 182 | 0 | — | **CLEAN — and the round-3 cert's count (i) is answered.** No `-P`, no `\K`, no live bound above 255; the two `.{0,262}` non-executables are prose citations of the dead form inside the file's own toolchain minute. `§E` register set-differences reproduce (`E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17`; `E1…E20`). Its `:271` cross-edge row is the source F-W0's item 7 anchor probes now reach without a line number |
| **F-W8** | 85 | 0 | — | **CLEAN.** All three `tail -c` window pastes are exact substrings with their cuts disclosed; `R=`/`C=`/`V=`/`F=` all declared in-block beside first use (R4-2.3 satisfied); `grep -rho "F\.W8" "$R"/fr-*.md` → **∅**, the canonical §4.1 zero it publishes |
| **F-W9** | 155 | 0 | — | **CLEAN.** All twin `diff` legs **EMPTY**. `$C` and `$M` declared in fenced blocks ahead of use; `'^\| .C-13. '` → **9**, `'^\| .R2-7. '` → **2**, `'^\| .D-B2. '` → **3** over the canonical; the `4\.5` absence probe → **∅, exit 1**; the three census names enumerate as published |
| **F-W10** | 98 | 0 | — | **CLEAN.** Twin `diff` legs **EMPTY** from this end too. `NO-WAVE-OWNER` probes → **56** files · **31** arrow-form · **61** bold-terminal-cell, all three exact. The `Zero UNVERIFIED credit` word-output quote is byte-true in `formation/fourier/` |

---

## §5 — DATED ERRATUM: ROUND 3's CLOSE-CERT COUNTS, FALSIFIED

> **ERRATUM 2026-08-29 (pass-4 truly-last purge seat, re-run at the bytes, not inherited from the union).** `docs/tranches/X/fourier/conformance/PASS-3/CLOSE-CERT.md` is **FALSIFIED on four counts**. Per **E-3 (addenda-not-patch)** its body is not edited; this row is the correction of record and travels with any citation of it.
>
> **(i) §2/§9's *"F-W7 … no command-level defect"* is FALSE.** Round 3 certified a file that carried three command-level defects plus two receipts **non-executable on the declared engine** (`.{0,262}`, above the BSD 255 bound — at the legal maximum the output stops seven characters short of its own paste). **Re-measured by this seat at the pass-4 settle, F-W7 is now genuinely clean** — the bounds were re-cut to the two-stage `grep -n` → `cut` windowed form and the residues demoted to prose. The certificate was wrong about round 3's bytes; round 4's bytes have earned the claim it made prematurely.
>
> **(ii) §5's *"no third disposition survives anywhere in the eleven specs"* is FALSE by one** (union §2 item 12), and the seat that wrote it did not re-run it.
>
> **(iii) §6.1's *"**724** label sites byte-checked: **0** word-level drifts"* is FALSE.** This seat byte-checked **271 pasted spans** across the eleven at the pass-4 settle and convicted **two** outright (F-W1 `:372` → ∅ against F-W2; F-W6 `:379` → ∅ against F-W5), plus a **three-coordinate address triple** (F-W0 `:451`) false by 53 lines and a **sibling-hash triple** false at two of three. A sweep that reports zero drifts across 724 sites, in a round where three of the eleven files were re-written after being quoted, was not a measurement. **The `0` is retracted.**
>
> **(iv) §3d's *"Rooted to `$R` and re-run"* was FALSE at round 3** — `$R` was defined nowhere in F-W5 (3 uses, 0 definitions), so the "cure" shipped a phantom witness minted by the purge seat itself. **CURED at round 4 and verified here**: F-W5 declares `R=docs/tranches/V/megatranche/registry/adjudicated` as an executable assignment and all 15 consumers resolve.
>
> **This certificate may not be cited as an operand without this row.** And its own successor is bound by the same clause that bound it: **no certificate is inherited — pass 5 re-runs these claims or it has none.**

---

## §6 — RESIDUE, DECLARED (R4-1.9: an attestation of sweep lists its residue or does not exist)

**53 of the 944** extractions did not resolve to a runnable base under the mechanical extractor. A second-chance extraction pass — re-reading each site's bytes and taking the span to the last backtick before the receipt arrow — recovered and executed the great majority; they run and reproduce. The residue decomposes as:

1. **Extractor artefact — a literal backtick inside a quoted pattern (≈30 sites).** The published command is correct at the bytes and runs; the single-backtick markdown code span that carries it is broken by the inner backticks, so the *rendered* form is not copy-pasteable. Confirmed runnable and reproducing at, among others, F-W0 `:449` (`0` / `1`), F-W1 `:361`, F-W3 `:410`, F-W4 `:206`, F-W5 `:140` `:175`, F-W9 `:222`. **Not a receipt defect; a rendering defect.** Recorded at §7 item 2.
2. **Declared command SHAPES, correctly carrying no output (10 sites).** `shasum -a 256 <file>` (F-W2 `:442`) · `sed -n 'Np' "$R"/<record>` (F-W8 `:80`) · `grep -cF '<the label's WHOLE extent>' <home>` (F-W9 `:388`) · `diff -q` (F-W8 `:268`) · `comm -13` (F-W5 `:102`) · `grep -qF` (F-W5 `:140`) · the four analysis-script names (F-W3 `:412` `:691`). R4-1 permits a cure to state the command **shape**; each of these publishes no receipt beside it. **Lawful.**
3. **Elliptical continuations (7 sites)** — `grep -cw 'M-10' …` (F-W5 `:107`) · `… | grep -c .` (F-W10 `:380`) · `grep -n 'latex-paper' …/INBOX.md` (F-W10 `:346`) · `grep -l … | wc -l` (F-W10 `:419`) · `head -1` (F-W0 `:315`) · `git show HEAD:…/F-W6.md …` (F-W6 `:630`, itself an explicitly struck receipt). The full command is stated in the same cell and every published figure reproduces when it is run (`2`/`3`; `17`; `56`; the F-W0 head-lines). Under a strict R4-2.5 reading a ⟨cmd⟩ that cannot be executed **as printed** is convictable on sight. **This seat records them as OUTSTANDING rather than rewriting cells whose every figure reproduces** — §7 item 3.
4. **Two live-tree paths that no longer exist** (F-W0 `:315`'s `fourier/docs/tranches/F/coordination/INBOX.md`; F-W2 `:83`'s `value.js/audit`) — both are **absence receipts**: the pasted output *is* `No such file or directory`, and both reproduce.

---

## §7 — OUTSTANDING FOR PASS 5 (not cured here; named so nothing is lost)

1. **The table-cell pipe idiom is inconsistent across the eleven.** F-W1 / F-W2 / F-W6 / F-W10 write `\|` meaning the rendered alternation; F-W9 writes `\|` meaning an ERE literal pipe. No receipt fails under both readings today, so none is convicted — but F-W1's own E-3 row already rules the **pipe-free re-cut** the correct form, and a single convention should be imposed before another round quotes across the boundary.
2. **≈30 ⟨cmd⟩ spans are broken by inner backticks in single-backtick code spans.** The bytes are right, the render is not. The fix is mechanical (double-backtick fences) and touches no figure.
3. **7 elliptical `…` continuations** (§6 item 3) sit inside R4-2.5's strict reading.
4. **Ragged table rows**, measured with F-W1's own awk idiom at the settle: F-W0 `:149` `:396` `:399` `:445` · F-W4 `:351` · F-W6 `:213` `:214` `:233`. **All pre-existing and none at a line this seat touched** — its edits left every cell count on the rows it wrote unchanged, and F-W1 remains fully clean (its own §E-3 receipt, *"NO OUTPUT"*, still reproduces). Outside a receipt/label mandate, so recorded rather than cured.
5. **The self-count shape survives at F-W4** in four paired receipts. Corrected here from live output; **R3-3.10 / R4-8.3 say it should not exist at all.** The next round should convert all four to classifications, as F-W4 §2.H already did for the fifth.

---

## §8 — THE SHA256 CERTIFICATE — THE ABSOLUTE LAST ACT

Computed **after** this seat's final edit to every wave spec, on the pinned toolchain, from the repository root. Command, verbatim:

```
shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W*.md /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

Full output, pasted unedited:

```
282f0c120cd448e87abf61ad62f4f55d4a18b07b26ff21e452eef302a6c8626e  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W0.md
a1302689aaa3662c030c046a16dc593fa0713c415b4f86685feb1e3fb022662f  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W1.md
bb58dc400cff76715000cb6a12d76fab63a6f0ffe164fcc72e60a803ccd9f907  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W10.md
578dba1fb42eeeee0352ff71eb73a0d2349523f03093104c0a8fa173d1a0f4d2  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W2.md
a89c3386f3f805f909194658a06b1eb5d0ed4716694df096249ab5530e6a6d1d  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md
39e1a60b3fc96247ca731771c92d30571851619ad86f8cad83330ab5dba26af0  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md
132c0319217641d8ce8096c8f3a0f5053181aaa08ff304e409e07eed832869d0  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md
c8c6d1d7f1369812d8246bb0704244c40d30b3d5ad4ed47546d0f5850b2efcb2  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W6.md
5cc3346db23eee9bce5fb143b66077f92d5fdeb4fb03791a9475a2d2ad9aa387  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W7.md
1e3698adf4ff402e0dc5aa06de6fc1ac44a594c36d9a07fd74f9c1c4dc000dc8  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W8.md
e9a9c3016f4c1c9e471d587384d17458850f9497c2a98248d633a2f118d6b9ae  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W9.md
a450b8e9f80ebaf29b223b87cbe4fd31f5242147dea0427662bd0696722a99d8  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Any seat that writes one of these twelve files after this table is published VOIDS this certificate by construction** — re-hash and the mismatch names the writer (R4-8.2). Nothing was written after it.

**— TRULY-LAST PURGE + HASH-CERT seat, X·F round 4, 2026-08-29.**

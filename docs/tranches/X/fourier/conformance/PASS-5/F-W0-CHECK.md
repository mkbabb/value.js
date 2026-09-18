# X·F CONFORMANCE PASS 5 — F-W0 CHECK (L-18/L-20, fresh adversarial seat)

**Seat**: FRESH pass-5 check seat, authored none of the bytes under test and none of the round-4 cures. **Date**: 2026-08-29.
**Subject**: `docs/tranches/X/fourier/waves/F-W0.md` (535 lines, 39 `⟨cmd⟩` markers).
**Census law honoured**: `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` is the SOLE census operand. The census axis below is mechanical — F.W0's canonical roster is differenced against the spec, and the canonical itself is separately spot-audited against `docs/tranches/V/megatranche/registry/adjudicated/` bytes. **A canonical error is filed against the canonical, not against F-W0.**
**Toolchain, pinned (R4-2)**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin` — BSD `/usr/bin/grep` · `sed` · `awk` · `cut` · `find` · `shasum`. Bare interactive `grep` (ugrep) was never used.

**Cert integrity, checked FIRST.** `CLOSE-CERT-2.md` §8 says any write after its table voids it. Re-hashed this seat:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

All twelve hashes match §8 byte for byte (`282f0c12…` F-W0 · `a1302689…` F-W1 · `bb58dc40…` F-W10 · `578dba1f…` F-W2 · `a89c3386…` F-W3 · `39e1a60b…` F-W4 · `132c0319…` F-W5 · `c8c6d1d7…` F-W6 · `5cc3346d…` F-W7 · `1e3698ad…` F-W8 · `e9a9c301…` F-W9 · `a450b8e9…` census). **The round-4 certificate is NOT voided; nothing wrote after it.** This check writes only to `PASS-5/`.

**Address discipline (R2-2 / R4-8.3).** F-W0 and the canonical are frozen under that certificate, so the `:NNN` addresses in this file are **hash-pinned**, not live-sibling line cites: they resolve against `F-W0.md` @ `282f0c120cd4` and `CENSUS-CANONICAL.md` @ `a450b8e9f80e`. If either file is written, re-anchor by the quoted span, never by the numeral. Corpus addresses (`fr-*.md`) are E-1-immutable and permitted outright.

---

## Axis 1 — ROSTER: BOOKED / CITED, COMPLETE (mechanical)

**Operand**: `CENSUS-CANONICAL.md` §2 → `### F.W0 — **56 rows**` (29 records). Extracted by splitting each roster bullet on the top-level ` · ` row separator (§0.1 ROW-SEPARATOR; the bare `·` inside `C·D-27` is a QUALIFIER and is protected). Declared per-record counts and token counts agree at every one of the 29 records; sum = **56**.

**Difference against F-W0 §3b's booking table** (spec lines 229–257), run by this seat:

| measure | figure |
|---|---|
| canonical F.W0 records | **29** |
| canonical F.W0 ids | **56** |
| §3b booking-table records | **29** |
| §3b declared per-record counts summed | **56** |
| records in the canonical missing from §3b | **0** |
| records in §3b that the canonical does not home at F.W0 | **0** |
| per-record count mismatches | **0** |
| canonical ids NOT found in their §3b row | **0** |

**Every one of the 56 was then resolved to its NAMED booking site and the id confirmed present there** — not accepted on the map's word. Sites carrying multiple bookings were read whole (row 10 = 3 254 chars, row 15 = 2 143, row 16 = 912, row 4 = 1 589, row 37 = 2 200, row 18 = 1 083):

- **row 10** carries `R-7` · `C-13` · `FR-AFP-54` · `FR-AUL-56` · `FR-AH-33` · `fr-ConvergenceTimeline M-6` · `C-3` · `FR-EQR-29` · `C·D-27` · `FR-GFC-21` · `FR-GSB-31` · `C-m9` — **12/12 present**.
- **row 15** carries `MG-θ` · `i-3` · `L·D-3` · `L-8` · `GM-F6` · `K7` · `FR-USB-21` · `M7` — **8/8 present**.
- **row 16** (`i-3` · `L·D-6`), **row 4** (`FR-IC-1` · `FR-IC-2` · `FR-COB-10`), **row 37** (`M-15` · `L-2` · `K7` · `PP-REDGATE`), **row 18** (`PP-NOTEST` · `R-20` · `M7`) — **all present**.
- `D-24`'s site is **§6b's SS-13 row**, and the row does name it — *"Conversely, **fr-PaperSearch's D-24 emission decider is F.W0, NOT SS-13** — verbatim: 'it needs the build, not a browser.'"* The map's pointer is honest; this seat's first, truncated read of the row was the error, and it is recorded here rather than filed.

**The 30 CITED ids** (§3b's second table, 28 rows; `L-7 · M-10` and `C-3 · D-M3` carry two each; `FM-17..FM-19` is one banded row) were each differenced against the canonical's own home column. **20 of 30 sampled across every distinct home class — F.W1, F.W2, F.W3 (file-criterion .a/.c/.d/.e), F.W4, F.W5, TERMINAL, UNROUTED, band — reproduce the canonical's home and legs EXACTLY**, including the `<sub>legs:</sub>` spellings. Verified: `GAB-13`→F.W1(legs F.W3,F.W0) · `FR-NP-32`→F.W1(legs NO-WAVE-OWNER) · `FR-EQR-33`→F.W1(legs F.W0) · `C·D-11`→F.W2(legs F.W0) · `L-7`,`M-10`→F.W1 · `MISSED-D`→F.W3(legs F.W0) · `C/m-6`→F.W4 · `FR-CP-32`→F.W3 §5.d · `M-N14`→F.W3 §5.e · `R-3`→F.W3 §5.a · `FR-GSB-6`→F.W3 §5.e · `FR-GFC-22`→F.W4 · `L-12`→F.W4 · `FR-AUL-23`→F.W4 · `FM-21`→F.W4(legs SS-13) · `C-3`,`D-M3`→F.W1 · `AA-23`→F.W5 · `FM-17..FM-19`→F.W4, band = 3.

**Alias law (M-25, aliases beside heads).** 16 head-alias pairs were differenced against the canonical's alias column: `FR-NP-2 (=L·D-1)` · `FR-NP-4 (=L·D-2)` · `FR-EQR-30 (=C-10)` · `FR-GV-28 (=L-25)` · `K7 (=L-13)` · `GM-F6 (=L-19)` · `R-20 (=C-14)` · `FR-AH-33 (=C-14)` · `FR-EQR-24 (=L-m2)` · `FR-USB-22 (=L-9)` · `F-2 (=C-5)` · `i-3 (=C-17)` · `FR-EQC-7 (=C-1)` · `i-3 (=LC-missed-7)` — **14 exact**. One is a CANONICAL alias drop, not a spec drift (D-5). One id in a head position is in neither §3b table (D-7).

**AXIS 1 VERDICT: rosterSize 56 · booked 56 · cited 30 · escaped 0 · fabricated 0, measured against the canonical as stamped.** The map is not a claim; it survives the falsifier it publishes. *(The canonical itself is not clean — see Axis 6. On the record bytes the true F.W0 roster is **57**.)*

---

## Axis 2 — RECEIPT REALITY (re-run, not read)

**Portability scan first (R4-2.5, convict-on-sight).** `-P` / `-coP` / `\K` / lookaround in an executable operand: **ZERO** — the single textual hit is line 31, prose stating the law. `.{n,m}` bounded wildcards of any size: **ZERO** in the whole file. Undefined shell variables consumed by a live `⟨cmd⟩`: **ZERO** (F-W0 declares none and consumes none; every base is spelled absolutely or is the block's stated root). Multi-base single commands (R4-2.4): the one convicted site, §7b archaeology, now publishes two complete commands each with its own absolute base — both run.

**Re-run this seat, on the pinned toolchain, against live bytes. Target was ≥10; 44 were executed. Non-reproducing: ZERO.**

| # | site | ⟨cmd⟩ (as published) | result |
|---|---|---|---|
| 1 | §3a Q1 | `sed -n '151,152p' COHESION.md \| tr '\n' ' ' \| grep -o 'the F.W0 substrate pre-gates[^)]*)'` | *"the F.W0 substrate pre-gates (corrupt glass-ui 4.0.0 dist/styles/index.css; dirty-worktree settle)"* — **EXACT** |
| 2 | Q2 | `sed -n '35p' fr-NotationPills.md` | contains the quoted BLOCKER span verbatim — **EXACT** |
| 3 | Q3 | `grep -n 'already elected to treat the working tree' fr-GalleryAdminBanner.md` | `130:` + span — **EXACT** |
| 4 | Q4 | `sed -n '40p' fr-CanvasOverlayButton.md \| grep -o 'if F.W0 rules ABANDON.*$'` | span — **EXACT** |
| 5 | Q5 | `grep -o 'when MISS-A7.*outlive the evidence.' fr-PaperSearch.md` | span — **EXACT** |
| 6 | Q6 | `grep -o 'D-3 dies by construction on adoption.*actually owes' fr-EasingPicker.md` | span — **EXACT** (emphasis normalised per the file's declared convention 2) |
| 7 | Q7 | `grep -noE 'dies with the file \(\*\*F\.W0\*\*[^)]*\)' fr-CanvasOverlayButton.md` | `52:…rm)` · `58:…)` · `69:…)` — **THREE, exactly as pasted** |
| 8 | Q9 | `grep -n 'favors \*\*freeze-with-adoption\*\*' INTAKE-ADJUDICATION-2026-08-03.md` | `233:` + span — **EXACT** |
| 9 | Q10 | `grep -o 'one relay letter, seven items, …' fr-CanvasOverlayButton.md` | span — **EXACT** |
| 10 | Q12 | `sed -n '99p' fr-FourierMorphSvg.md` | contains the F.W0-adjacent span — **EXACT** |
| 11 | Q13 | `grep -o 'The cure (ambient.*NOT as an F.W0 precondition.' fr-PathPreview.md` | span — **EXACT** |
| 12 | Q14 | `sed -n '74p' fr-EquationResult.md` | contains the `v7.0.0 facts` span — **EXACT** |
| 13 | Q19 | `grep -n 'it needs the build, not a browser' fr-PaperSearch.md` | `86:` + span — **EXACT** |
| 14 | §6b (i) a | `/usr/bin/grep -Fc 'dist/styles/index.css` (M1), GAB-13, F8-REACH-01/02.' F-W7.md` | **0** — as published |
| 15 | §6b (i) b | `/usr/bin/grep -Fc 'corrupt glass-ui 4.0.0 …(≡ `fr-PaperSidebar M1`)** — GAB-13, F8-REACH-01/02.' F-W7.md` | **1** — as published. The R4-1.1 canonical-pair cure is REAL at the bytes |
| 16 | §6b (ii) a | `/usr/bin/grep -oE '^#{2,3} (7c\. Cross-edges\|11\. Dependencies)' F-W7.md` | `### 7c. Cross-edges` · `## 11. Dependencies` — **EXACT** |
| 17 | §6b (ii) b | `/usr/bin/awk '/^### 7c\. Cross-edges/,/^## 8\./' F-W7.md \| /usr/bin/grep -c 'FR-NP-32'` | **1** — containment holds without a line address |
| 18 | §6b (iv) | `shasum -a 256 F-W7.md \| awk '{print substr($1,1,12)}'` | **`5cc3346db23e`** — pin still true |
| 19 | §6b (1) | `/usr/bin/grep -oF 'If F.W0 fails, the wave HALTS' F-W7.md \| /usr/bin/sort -u` | span — **EXACT** |
| 20 | §6b strike | `grep -rl 'Genuinely owed' waves/` | SET = `F-W0.md` · `F-W7.md` — **EXACT** (the set-membership form is the only receipt in that cell that has survived four rounds) |
| 21 | §6b strike | `grep -o "an absence receipt that its own quotation falsified" F-W7.md` | span — **EXACT** |
| 22 | §6b strike | `grep -o "stopped being true the instant this file quoted F-W0's strike" F-W7.md` | span — **EXACT** |
| 23 | §6b existence | `awk '/^### 6b\./,/^---$/' F-W0.md \| grep -o '^\| \*\*F\.W7\*\*'` | `\| **F.W7**` — **EXACT** |
| 24 | §4 anchor note | `grep -o 'cited by gate id[^\|]*' F-W1.md` | **two cells**, the second the reciprocal — **EXACT** |
| 25 | Q17 / G-6 | `grep -o 'The roster is [A-Z]* limbs and stays [a-z]*' F-W1.md` | *"The roster is TWELVE limbs and stays twelve"* — **EXACT** |
| 26 | Q17 / G-6 | `grep -o "FR-EQC-7's vaul-vue gate lands INSIDE the F\.W1 transaction, not before\." F-W1.md` | span — **EXACT** |
| 27 | §3a hash rider | `shasum -a 256 F-W1.md F-W3.md F-W7.md \| awk '{print substr($1,1,12), $2}'` | `a1302689aaa3` · `a89c3386f3f8` · `5cc3346db23e` — **all three pins TRUE at this settle.** The rider that fired on its first outing in round 4 is green in round 5 |
| 28–29 | §1 hard gate | `grep -n '15 of 15' …PASS-1/F-W0-CHECK.md` · `grep -n 'spot-check\|but see defect\|no witness of its own' …` | `153:` · `168:`/`169:`/`171:` — **both EXACT** (but see D-6: the OPERAND is a check file) |
| 30–31 | §7b archaeology | `ls …/megatranche/formation/fourier/` · `find …/megatranche -iname '*EIGHT-HOUR*'` | four files, none the delta · **six** coordination files, the delta among them — **EXACT, each from its own absolute base** |
| 32 | §1 inputs | `sed -n '78p' …/intakes/lane-fourier-r3-r6.md` | the R3-7 row — **EXACT** |
| 33 | §6b SS-13 | `sed -n '120p' fr-PaperSearchInput.md` | the *"at 7.0.0"* span — **EXACT**, the round-1 re-dating stays struck |
| 34 | §6b SS-13 | `/usr/bin/sed -n '114p' fr-PaperSearchDropdown.md` | the FR-PSD-CB residue item — **EXACT** |
| 35–37 | G-1 | `git rev-parse --abbrev-ref HEAD` · `--short HEAD` · `git status --porcelain \| wc -l` | `m/w1-bump-migration` · `cd26c65` · **28** — **EXACT** |
| 38 | G-2 | `git status --porcelain \| grep '^??'` | the single `docs/tranches/N/valuejs-inbound-…-facility19-migration-table.md` — **EXACT** |
| 39–40 | G-3 | `ls …/fourier-analysis/CLAUDE.md` · `ls …/docs/tranches/F/coordination/` | *No such file or directory* · the **three** 2026-05-29 letters, named — **EXACT** |
| 41–42 | G-4 | installed version · `grep -o '/\*' … \| wc -l` / `grep -o '\*/' … \| wc -l` on dist **and** src | **4.0.0** · dist **17 / 8**, src **15 / 6** — **EXACT** |
| 43 | G-4 | `sed -n '1,3p' web/src/style.css` | `:3` = `@import "@mkbabb/glass-ui/styles";`, lines 1–2 tailwindcss / tw-animate-css — **EXACT** |
| 44 | G-5 | `git ls-files web/dist \| wc -l` · `ls -ld web/dist` | **0** · present, `Jun 12 18:13` — **EXACT** |
| 45–48 | G-14 | `ls /tmp/fourier-r4-files.sha256` · `ls ~/.codex/worktrees` · `sed -n '306p' HANDOFF.md` · `sed -n '360p' CENSUS-2026-08-03.md` | evaporated · **`7e28` `9167` `d0be`** · both 74,507 B attributions — **EXACT** |

**AXIS 2 VERDICT: CLEAN.** 44 re-runs, 0 non-reproducing, 0 `-P`, 0 over-bound wildcards, 0 phantom variables, 0 two-base commands. The three sibling hash pins hold; the R4-1.1 `0`/`1` pair — the round-4 headline cure — is confirmed by a seat that did not author it, which is the standing falsifier's whole requirement.

---

## Axis 3 — M-25 DEPTH (locks by banked id; aliases beside heads)

**Aliases beside heads: HELD.** Every §3 row head carries its aliases in the canonical form (`FR-COB-1 (= D-2/L-1/C-1 = F8-REACH-02)` · `FR-NP-2 (= L·D-1)` · `i-3 (fr-BasisSelector, = LC-missed-7)` · `FR-EQC-7 (= C-1, re-provenanced per R-4)`), and 14 of 16 differenced pairs match the canonical's alias column exactly. Nowhere does an alias appear as a standalone booked row: §3b's *"absorption is not a booking"* clause is applied, not merely stated — the three ids **id-keyed for the first time at round 4** (`R-7`, `R-4`, `L-2`) are each present as CONTENT at the site now named, and each was verified at that site by this seat.

**Locks: PARTIALLY HELD.** §6a locks 1–4, 6, 8–11 key to gate ids or named laws. **Locks 5 and 7 key to §3 ROW NUMBERS** — *"rows 8/9/10/11/12/14/34/35"* and *"Row 16 is a rider on M-10, never landed alone"*. Row numbers resolve (R2-2.5 declares them stable in-file), so nothing is broken; but M-25 depth wants the lock keyed to the banked id — lock 7's subject is `i-3` (fr-BasisSelector) and the lock never says so, which is exactly the shape that let three ids sit un-keyed for three rounds. **D-8, LOW.**

**Lock 11 (R4-3.3) is APPLIED**: the census authority now reads *"`conformance/CENSUS-CANONICAL.md` §2's `### F.W0 — 56 rows` roster, and nothing else"*, with the struck `PASS-1/F-W0-CHECK.md` phrasing minuted in place under E-3 rather than silently overwritten.

---

## Axis 4 — GATES (canonical operands only · reachable GREEN · portable commands)

- **Canonical operands.** No gate takes a census operand other than `CENSUS-CANONICAL.md`. `CENSUS-2026-08-03.md` appears as charter text, bounds and errata target — never a denominator. §8's closure operand is *"`CENSUS-CANONICAL.md`, §2's `### F.W0 — 56 rows`, AND NOTHING ELSE"*, and the round-1/2 `82/82`-over-a-check-file basing stays struck with its minute. **PASS.** One residue: §1's two check-file `⟨cmd⟩` sites (D-6).
- **Reachable GREEN.** All fifteen gates carry a green clause that is an achievable state, not a restatement of the RED. Spot-verified as reachable and non-circular: **G-1** (per-path disposition + porcelain empty *or* exactly the ruled-ABANDON set, with rows 24/25 named as must-LAND exceptions and a wholesale reset declared a FAILURE — a green that cannot be faked by `git checkout .`); **G-4** (producer-side parse, *"a consumer-side patch is a GATE FAILURE"*); **G-5** (build exit 0 **and** three named readbacks, with an explicit prediction — *build succeeds, grep 0* — so the gate can be wrong in public); **G-6** (re-cut at R-4a to AUTHOR+MEASURE, branch-conditioned on G-1, with the DECLARE+LOCK landing explicitly a limb of F-W1's twelve; the previously forbidden shape — unsatisfiable on ABANDON, later-wave-gated on LAND — is gone); **G-9/G-15**. G-15(a)'s falsifier is non-destructive and sequenced after G-1 by lock 10, with `git stash` banned file-wide — the one witness that used to write the fourier tree.
- **Portable commands.** See Axis 2's scan: clean on all five R4-2 clauses. **PASS.**

---

## Axis 5 — POSTURE

| item | finding |
|---|---|
| **F.W1 transaction whole** | **HELD at four sites** — §6a lock 5, §6b cross-edge 1, §4 G-6, §8 row 2 all cite the **TWELVE-limb** roster *"chartered at F-W1 §4 Sequencing, intra-wave step 4"*, quoted from the charter and never restated; the round-1 three-limb restatement that re-fractured it stays struck. Both charter receipts re-run EXACT (Axis 2 #25/#26), hash-pinned to `a1302689aaa3`. |
| **W7 ∅ closed** | **HELD.** §6b clause (2): *"F.W7's routing census is a measured ∅ and that ∅ is a finding, not a gap (R2-8, ruled CLOSED: no wave re-litigates `routedTotal`, and no F.W0 act may add a row to it)"*; *"What crosses back: NOTHING."* Corroborated by the canonical's own corpus-wide probe (§0.1: `F.W7` → 2 hits, both inside `KF.W7`). |
| **SS-4 flags** | **HELD.** §6b's SS-4 row: *"SS-4 must FLAG its owner rulings INLINE (trie-vs-KISS et al.)"* and must name the TA-4 prerequisite **or re-scope explicitly** — *"never presume"*. §5 flags OG-F1 and OG-V2 inline and decides neither. |
| **tree READ-ONLY** | **HELD.** §1 posture note reconciles against F-W5's `$F/**` read-only row (both locating receipts re-run EXACT); §8's penultimate row excludes *"any edit to the 21 remaining ` M` SFCs … or any product source — Execution gate: disposition objects only; the specs await the owner's begin-word."* Lock 9 keeps `scripts/dev/dev.sh` unstaged; lock 10 bans `git stash`. |
| **status planned** | **HELD.** §1a: AUDITED **YES** · SPECIFIED **YES** · IMPLEMENTED **NO** · VERIFIED **NO**. |
| **zero VERIFIED** | **HELD.** `VERIFIED` occurs twice: the §1a **NO**, and the L-18 rider *"VERIFIED is the X·F release close's to stamp"*. No wave-level VERIFIED credit anywhere. |
| **RULINGS-4 applied** | **HELD on all eight F-W0 directives.** R4-1.1 (§6b re-pasted from F-W7's true bytes, canonical pair, re-addressed §11→§7c, three line coordinates STRUCK not re-numbered) · R4-2.4 (§7b's two-commands-one-base, each with its own absolute root) · R4-3.3 (lock 11 re-based; the check-file-derived 11 struck) · R4-4.3 (round-3-minted reciprocal unwound whole) · R4-7.3 (the *"other 30"* count-word retired **with its instrument**, the measured 8/22 split disclosed, no corrected number re-banked) · R4-8.3 (hash-pinned cross-quotes, all three TRUE) · R4-9.8 (canonical `FR-NP-32 (≡ fr-PaperSidebar M1)` pair at §6b, G-4, G-5, row 30 — all four verified) · R4-10 (§3b, the 56-row map). |

---

## Axis 6 — SPOT-AUDIT OF THE CANONICAL AGAINST THE ADJUDICATED BYTES (5 records + 1)

Six records were re-derived against `docs/tranches/V/megatranche/registry/adjudicated/` bytes under §0/§0.1's own rules. **Four are clean. Two carry defects, and they are structural, not clerical.**

**CLEAN — fr-InfoCard.** `FR-IC-1` → `F.W0` (`:37`) · `FR-IC-2` → `F.W0` first-arrow, F.W3/W4 leg, and the canonical *discloses its inference source* as `record (:38)` · `FR-IC-8` → `F.W1 + F.W0`, home F.W1 (`:44`) · `FR-IC-23` → F.W3/W4 first, home F.W3 §5.e · `FR-IC-25` → `:57` closes *"**→ F.W0 substrate note + F.W1.**"*, home F.W0 legs F.W1. Five for five.

**CLEAN — fr-EqCoefficientsPanel.** `C-3` → *"→ F.W0."* (`:72`) · `R-4` → `:31`'s ruled-disagreement row states *"home F.W0 manifest gate inside the F.W1 transaction"*, exactly one `F.W0` token on the line · `FR-EQC-7` → *"→ F.W0 manifest gate INSIDE the F.W1 transaction"* (`:44`). The round-4 §0.3 re-homing of this record is correct at the bytes.

**CLEAN — fr-PaperSearchDropdown.** `C:S-2` → *"**F.W0.**"* (`:72`); `FR-PSD-CB` → SS-13 · F.W3/W4, home F.W3 §5.c. F-W0's claim that `C:S-2` is *"the record's ONLY F.W0 row"* is true at the bytes, and the phantom `residue 12` is genuinely absent from the corpus.

**CLEAN — fr-ContourSettings.** `R-7` → `:31`, one `F.W0` token · `C-13` → `:52` *"(→ **F.W0** manifest hygiene; the lucide rename itself F.W1)"* · `D-i1` → F.W3/W4 first, home F.W3 §5.d.

**DEFECTIVE — fr-PathPreview (unit §5.d, canonical 53 rows).** Two rows are false against the record's own banked-head lines:

1. **`PP-GATE`.** Canonical: `| PP-GATE | — | — | **UNROUTED** |`. Bytes, `fr-PathPreview.md:49`: `14. **PP-GATE** (D-1 gate half · C-10 · L-3) — **MINOR · FOLD → F.W0** (banked: fr-GalleryFeaturedCarousel.md:56 FR-GFC-22 `noUnusedLocals` rider).` A **sole `F.W0` token on the banked-head line** ⇒ §0.1 rule 3 homes it at **F.W0**. The canonical's routing column is empty where the record spells the token. **Consequence: the F.W0 roster is 57, not 56** — and F-W0, obeying the canonical, sheds a live F.W0 duty into the SS-3/SS-4 routing frontier.
2. **`PP-DEAD`.** Canonical: `| PP-DEAD | — | *DEAD* | **TERMINAL (∅)** |`. Bytes, `fr-PathPreview.md:30`: `1. **PP-DEAD** (D-1 · C-1 · L-1) — **MINOR · FOLD → F.W3/W4** (delete-or-complete, a design decision) **+ F.W0 `noUnusedLocals` rider**.` The routing column's `*DEAD*` is a **token that does not exist on the line**; the line carries `F.W3/W4` then an `F.W0` rider ⇒ §0.1 rule 3 twin law, unit §5.d ⇒ home **F.W3**, leg F.W0. TERMINAL is unreachable from these bytes.

Also noted, lower confidence: `K7` is homed F.W0 on the strength of an `F.W0` token that sits **inside the description of the claim being killed** (`:80` — *"L-2's BLOCKER framing, reader A's F.W0 confirmation of it … all three die together"*). Rule 2's verbatim-token reading gets there; rule 2's own register clause (killed-claims are TERMINAL) does not. Flagged for the amendment seat, not filed.

**DEFECTIVE — fr-CanvasOverlayButton (54 canonical rows).** The record books its main register as a TABLE with an explicit alias column; the canonical **drops that column and then re-books two of the dropped tokens as rows of their own**:

- Record `:52` `| **FR-COB-3** | D-3 / L-3 / C-3 | …` and `:69` `| **FR-COB-15** | L-9 / C-10 / D-8 / L-8 | …`. Canonical: both rows carry aliases `—`.
- Canonical `:931` `| C-3 | D-17 | — | **TERMINAL (∅)** |` and `:932` `| L-9 | L-2 | F.W1 | **F.W1** |`.
- §0.1 ONE HOME PER ID: *"An id **claimed as an alias** by another row in the same record is **not a standalone identity** and books no row of its own."* `C-3` and `L-9` are claimed as aliases by FR-COB-3 and FR-COB-15 respectively. **Both are fabricated rows**, and `L-9` propagates into §2's F.W1 roster (`fr-CanvasOverlayButton (8): … · L-9`), inflating F.W1's 362 by one.
- The mechanism is systematic, not a one-off: `FR-COB-3` (`D-3/L-3/C-3`), `FR-COB-9` (`D-4/C-9`), `FR-COB-15` (`L-9/C-10/D-8/L-8`), `FR-COB-24` (`D-14`), `FR-COB-25` (`D-17`), `FR-COB-28` (`DU-miss-6`), `fr-AdminUserList FR-AUL-58` (`D-28`), `fr-PathPreview PP-GATE` (`D-1 gate half · C-10 · L-3`) all carry a populated alias cell at the record and `—` at the canonical. This is the P4-1 atomiser class the canonical was minted to end, arriving through the opposite door: **not by splitting a head, but by losing the alias cell and then finding the orphaned token in a later register.**

---

## §7 — DEFECT REGISTER (9; 4 filed against the CANONICAL, 5 against F-W0)

| # | sev | against | claim | receipt |
|---|---|---|---|---|
| **D-1** | **HIGH** | CANONICAL | `PP-GATE` is routed `F.W0` at its banked-head line; the canonical records routing `—` / home **UNROUTED**. The F.W0 roster is understated by one — **57, not 56** — and the wave sheds a live duty. | `sed -n '49p' fr-PathPreview.md` → `14. **PP-GATE** (D-1 gate half · C-10 · L-3) — **MINOR · FOLD → F.W0** …` vs `CENSUS-CANONICAL.md:4334` `\| PP-GATE \| — \| — \| **UNROUTED** \|` |
| **D-2** | **HIGH** | CANONICAL | `PP-DEAD`'s routing column carries `*DEAD*`, a token absent from the record's line; the line routes `F.W3/W4` + an `F.W0` rider ⇒ home **F.W3** (§5.d), not TERMINAL (∅). | `sed -n '30p' fr-PathPreview.md` → `**MINOR · FOLD → F.W3/W4** … **+ F.W0 \`noUnusedLocals\` rider**` vs `CENSUS-CANONICAL.md:4313` `\| PP-DEAD \| — \| *DEAD* \| **TERMINAL (∅)** \|` |
| **D-3** | **HIGH** | CANONICAL | Alias-drop → alias-rebooking: `C-3` and `L-9`, alias tokens of `FR-COB-3` / `FR-COB-15` at the record's own alias cells, are booked as standalone canonical rows; `L-9` propagates into §2's F.W1 roster. Forbidden by §0.1 ONE HOME PER ID. | record `:52` `\| **FR-COB-3** \| D-3 / L-3 / C-3 \|` · `:69` `\| **FR-COB-15** \| L-9 / C-10 / D-8 / L-8 \|` vs canonical `:931` `\| C-3 \| D-17 \| — \| TERMINAL (∅) \|`, `:932` `\| L-9 \| L-2 \| F.W1 \| F.W1 \|` |
| **D-4** | **HIGH** | **F-W0** | F-W0 holds D-2's falsifier **in its own bytes** and files nothing: §3 row 15 quotes `fr-PathPreview.md:30`'s routing tokens verbatim, while §3b's citation table declares the same id `TERMINAL (∅) … a census fact, not a wave debt`. §0's disagree-or-amend clause (*"a gate that disagrees with this file re-derives against it or amends it by ruling"*) was available and unexercised. | F-W0 `:154` (row 15) *"fr-PathPreview **PP-DEAD** (`fr-PathPreview.md:30` — *'MINOR · FOLD → F.W3/W4 … **+ F.W0 `noUnusedLocals` rider**'*)"* vs F-W0 `:290` `\| `PP-DEAD` … \| **TERMINAL (∅)** \|` |
| **D-5** | **MEDIUM** | CANONICAL | The alias column is dropped systematically for table-form registers — `FR-COB-3/9/15/24/25/28`, `FR-AUL-58`, `PP-GATE` all read `—` against populated record cells. This is D-3's mechanism, and it silently converts every dropped token into a candidate for re-booking in a later register. | canonical `:890 :896 :902 :911 :912 :915` aliases `—`; records `fr-CanvasOverlayButton.md:52 :58 :69 :83 :84 :87`, `fr-AdminUserList.md:106`, `fr-PathPreview.md:49` all carry alias cells |
| **D-6** | **MEDIUM** | **F-W0** | §1's hard-gate paragraph takes `conformance/PASS-1/F-W0-CHECK.md` as the operand of two `⟨cmd⟩` receipts, load-bearing for the *"reproduced gate-for-gate by two independent adversarial seats"* claim. **R4-3 restates R3-4 program-wide — *"a check file is never an operand"* — with no denominator qualifier.** `CLOSE-CERT-2.md` §2 Class E cleared both by a narrowing (*"attestation quotes, not rosters"*) the ruling's text does not contain, and R4-2.5 forbids the charitable reading. Both receipts reproduce; the defect is legal, not factual. | F-W0 `:55`; `grep -n '15 of 15' …PASS-1/F-W0-CHECK.md` → `153:` and the three-row qualifier grep → `168:/169:/171:` — both run this seat, both EXACT |
| **D-7** | **MEDIUM** | **F-W0** | §3b's PP-GATE cell sheds the row with an **unmeasured editorial gloss** — *"the UNROUTED tier is the routing frontier owned by the forming SS-3/SS-4 specs, not an F.W0 obligation"* — carrying no receipt over the id's banked-head line. Had one been run, D-1 would have surfaced at authoring. Every neighbouring cell in that table carries a home receipt; this one carries an argument. | F-W0 `:291`; the absent receipt is `sed -n '49p' fr-PathPreview.md`, run here (D-1) |
| **D-8** | **LOW** | **F-W0** | §3b's second table claims to be exhaustive over *"ids this spec's rows touch that the canonical homes ELSEWHERE"*, but `FR-COB-24` — carried in §3 row 33's **HEAD** (`FR-AUL-58 ≡ FR-COB-24 (= D-28 / D-14)`) and homed **F.W1** by the canonical — is in neither table. It is discharged only by §8's exclusion row, which names the wave but not the holder. | F-W0 `:172` (row 33 head) · `:265–292` (no FR-COB-24 row) · canonical `:911` `\| FR-COB-24 \| — \| F.W1 \| **F.W1** \|` · F-W0 `:505` §8 exclusion |
| **D-9** | **LOW** | **F-W0** | M-25 depth: §6a locks 5 and 7 key to §3 **row numbers** rather than banked ids (*"Row 16 is a rider on M-10"* — row 16's banked id is `i-3`; *"rows 8/9/10/11/12/14/34/35"*). The addresses resolve under R2-2.5, so nothing breaks; but a lock that does not name its id is the shape that let `R-7`, `R-4` and `L-2` sit un-keyed for three rounds. | F-W0 `:425` (lock 5) · `:427` (lock 7) vs §3b's `i-3` → row 16 booking |

---

## §8 — VERDICT

**F-W0, LOCAL: DEFECTIVE** — on **D-4** alone (HIGH, spec-side): the file quotes, in its own §3, the record bytes that falsify the canonical row it defers to in its own §3b, and files neither an amendment nor a divergence minute. The remaining spec-side findings are one legal defect (D-6), one unmeasured gloss (D-7) and two form defects (D-8, D-9).

**What is genuinely strong, said plainly, because a check that only convicts is not a measurement.** The census axis is now mechanical and F-W0 survives it whole: 56 canonical ids, 29 records, per-record counts exact, **every id present at its named booking site when the site is read in full**, 30 citations each reproducing the canonical's home *and its legs* verbatim, 0 escapes, 0 fabrications. Forty-four receipts re-run on the pinned toolchain by a seat that authored none of them, **zero non-reproducing** — including the three sibling hash pins and the `0`/`1` pair that was round 4's headline cure. The portable-command law is clean on all five clauses. Every round-4 directive addressed to this file landed, and the two hardest ones landed in the hard way: the three stale line coordinates were **struck rather than re-numbered**, and the *"other 30"* count-word was **retired with its instrument** rather than restated with a corrected figure.

**What pass 5 must carry forward.** Three of the four HIGH findings are against the **canonical**, not the spec — and that is the round's real result. The census freeze bought reproducibility, and F-W0 honours it exactly; but a stamped operand that no wave may re-cut is only as good as its derivation, and a six-record spot-audit put two records in the defect column. **The F.W0 roster is 57.** The amendment seat — never a wave — owes: `PP-GATE` → F.W0, `PP-DEAD` → F.W3 (leg F.W0), `C-3` and `L-9` struck as fabricated rows with F.W1's 362 re-summed, and the alias column restored for every table-form register before another round differences against it. Until then, **§3b is correct and its denominator is not**, and that is a sentence the next union must not lose.

*— PASS-5 F-W0 check seat, X·F, 2026-08-29. Every figure above was produced by a command this seat ran this session, on the pinned toolchain, against the live bytes. Nothing was inherited.*

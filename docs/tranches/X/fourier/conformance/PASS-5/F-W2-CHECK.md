# X·F CONFORMANCE PASS 5 — F-W2 ADVERSARIAL SPEC CHECK (L-18/L-20, fresh seat)

**Seat**: fresh pass-5 check seat, 2026-08-29. **Target**: `docs/tranches/X/fourier/waves/F-W2.md` (repair round 5, the CENSUS FREEZE round).
**Census operand — sole**: `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` §2's `F.W2` roster, read whole.
**Rulings operand**: `PASS-4/RULINGS-4.md`. **Cert**: `PASS-4/CLOSE-CERT-2.md` (read; not cited as an operand — the R4-1.E-3 erratum bars that).
**Toolchain**: `bash` + BSD `/usr/bin/grep` · `/usr/bin/sed` · `/usr/bin/awk` · `/bin/ls` · `node v26` · darwin arm64. No `-P`, no `\K`, no lookaround, no `.{n,m}` used by this seat.
**Tree state**: `registry/adjudicated/**` and `/Users/mkbabb/Programming/fourier-analysis` read READ-ONLY throughout. No product byte opened for write. Only this file written.

**VERDICT: DEFECTIVE** — 15 defects (5 HIGH · 4 MEDIUM · 6 LOW). **The census axis is CLEAN and is the round's real achievement**: 31 canonical rows, 31 booked, 0 escaped, 0 fabricated, 27 citations all correctly homed. Every defect below is a RECEIPT, a COUNT WORD, a BASE, or a CANONICAL derivation — none touches a banked word, a booking, a gate's born-RED state, or the wave's posture.

---

## §1 AXIS 1 — ROSTER BOOKED/CITED COMPLETE · **CLEAN**

### 1a. The mechanical set-difference

The canonical's `F.W2` roster (`CENSUS-CANONICAL.md:4851`, `### F.W2 — **31 rows**`) enumerates 31 ids across 17 records. §8a of the spec books 31 rows. Set-difference **∅ both ways**.

⟨cmd⟩ `/usr/bin/grep -n '^### F\.W2' /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` → `4851:### F.W2 — **31 rows**`

| record | canonical ids | §8a rows | verdict |
|---|---|---|---|
| fr-AdminAuditLog | `AA-20` | 1 | ✓ |
| fr-AdminUserList | `FR-AUL-55` | 2 | ✓ |
| fr-CanvasControlsDock | `C-25` | 3 | ✓ |
| fr-CoefficientsSpectrum | `M-10` | 4 | ✓ |
| fr-ContourPreview | `D:B-1` · `C:D-1` · `D:m-8` | 5 · 6 · 7 | ✓ |
| fr-ConvergenceLegend | `C-2` · `C-15` · `C-1` · `K-7` | 8 · 9 · 10 · 11 | ✓ |
| fr-ConvergencePlot | `RD-5` · `L-M6` · `C-19` · `C-22` · `K-11` | 12–16 | ✓ |
| fr-ConvergenceTimeline | `S-9` | 17 | ✓ |
| fr-EquationModeToggle | `FR-EMT-24` | 18 | ✓ |
| fr-EquationView | `SC-4` · `C·D-11` · `I-5` · `K-5` · `K-6` | 19–23 | ✓ |
| fr-GalleryFeaturedCarousel | `FR-GFC-8` | 24 | ✓ |
| fr-GalleryInfiniteGrid | `C-5` · `FR-GIG-17` | 25 · 26 | ✓ |
| fr-ImageUpload | `C:C-11` | 27 | ✓ |
| fr-MorphShapePreview | `C·S-2` | 28 | ✓ |
| fr-PaperView | `C-08` | 29 | ✓ |
| fr-Tooltip | `FR-TT-22` | 30 | ✓ |
| fr-UserSlugBar | `FR-USB-38` | 31 | ✓ |

**rosterSize 31 · booked 31 · escaped 0 · fabricated 0.**

### 1b. Column-2 fidelity — every §8a routing→home cell re-derived at the canonical's §1

Extraction (this seat, this round):

⟨cmd⟩ `/usr/bin/awk '/^### fr-/ { rec=$2 } /^\| `/ { print rec "\t" $0 }' CENSUS-CANONICAL.md > rows.tsv` → **4269 rows** (exactly the canonical's §3 TOTAL)

⟨cmd⟩ `/usr/bin/awk -F'\t' '$2 ~ /\| \*\*F\.W2\*\*/ {print $1}' rows.tsv | /usr/bin/sort | /usr/bin/uniq -c` → the identical 17-record / 31-row distribution as §2's roster. **The canonical is §1 = §2 consistent at this wave's home.**

Each of the 31 §8a column-2 cells (routing verbatim + home + `<sub>legs</sub>`) and each `⟨aliases …⟩` bracket was compared to its canonical §1 row. **31 of 31 byte-identical** — including the twelve leg-carrying rows (`AA-20` legs F.W4 · `C-25` legs NWO · `M-10` legs F.W3/W4 · `C-2` legs F.W4 · `C·D-11` legs F.W0 · `C-08` legs F.W4 · `FR-TT-22` legs NWO · `FR-USB-38` legs NWO) and the four alias sets (`M-10`⟨`L-M4`·`D-m11`·`C-2`⟩ · `FR-EMT-24`⟨`C-17`·`S-4`·`S-5`⟩ · `FR-USB-38`⟨`L-16`·`L-17`·`D-i2`·`C-i3`⟩ · `RD-5`⟨`D-2`·`C-14`⟩).

### 1c. The 27 citations — all verified at the canonical, all correctly homed

`cited = 27`. Every §8b row's declared canonical home reproduces at the canonical's §1 bytes:

- **F.W1 (9)**: `fr-App C-2` ✓ · `fr-EquationView M-RTC` ✓ (legs F.W2, SS-13) · `fr-PaperArticleWindow K-24` ✓ · `fr-GalleryInfiniteGrid C-6` ✓ · `fr-PathPreview PP-REDGATE` ✓ (legs F.W0, F.W1, F.W1/W2) · `fr-EasingPicker L/B-1` ✓ ⟨alias `C/B-1`⟩ · `fr-EasingPicker MISSED-F` ✓ · `fr-EasingCurvePreview CENSUS-MC` ✓ · `fr-MorphPhaseConfig MPC-2` ✓
- **F.W3 (2)**: `fr-CoefficientsSpectrum B-3` ✓ (file-criterion §5.d, legs F.W2) · `fr-NotationPills FR-NP-9` ✓ (idem)
- **F.W4 (2)**: `fr-ConvergencePlot D-1` ✓ · `fr-HarmonicLevelGrid HLG-4` ✓
- **F.W5-W8 (1)**: `fr-PaperSearchDropdown C:C-23` ✓
- **NWO packet (1)**: `fr-AnimationControls C-18` ✓ (routing sole token `NO-WAVE-OWNER`)
- **TERMINAL ∅ (4)**: `fr-EquationPanel D-3` ✓ *KILLED, KILL* (and its `D-9` cure arm → F.W4 ✓) · `fr-GalleryView K6` ✓ *KILL* · `fr-CollapsibleSection R-3` ✓ · `fr-EquationView RD-2`⟨`C·D-16`⟩ ✓ *STRUCK*
- **UNROUTED (2)**: `fr-InfoCard FR-IC-20` ✓ · `fr-PaperSearch C-Z1` ✓
- **out-of-domain §0.2 (6)**: `fr-FunctionInput` item 6 · `fr-MobileFloatingToc` item 9 · `fr-PathPreview` item 7 · `fr-HarmonicLevelGrid` superlative 3 · `fr-FourierMorphSvg` *"NEW fold (r2)"* · `fr-PaperSearchInput` item 5 — each confirmed at the record bytes as a head with no banked id token.

9+2+2+1+1+4+2+6 = **27**; the enumeration equals the figure. **R4-10's express duty is discharged**: `C·D-16` is cited at `carry/F-W1-CARRY.md §D` and that section exists — ⟨cmd⟩ `/usr/bin/grep -n 'viz-\*. palette collapse' carry/F-W1-CARRY.md` → `39:### D · The \`--viz-*\` palette collapse identity`.

**R4-10's two failure modes are both absent.** No id booked that the canonical homes elsewhere; no canonical id absent from both booking and citation. **This axis is CLEAN and the round-5 freeze did what it set out to do.**

---

## §2 AXIS 2 — RECEIPT REALITY · **DEFECTIVE (2 HIGH, plus the sha-pin failure)**

### 2a. Portability sweep — CLEAN

⟨cmd⟩ `/usr/bin/grep -n 'grep -[a-z]*P' F-W2.md` → **no output**. **No `-P`, no `\K`, no lookaround anywhere in the file.**
⟨cmd⟩ `/usr/bin/grep -no '[.]{0,[0-9]*}' F-W2.md` → **no output**. No bounded wildcard; the BSD 255 ceiling is never approached.
⟨cmd⟩ `/usr/bin/grep -oE '…/[a-zA-Z@]' F-W2.md` → **no output**. No elided path survives.
Shell variables: `$W`/`$K`/`$F`/`$V`/`$R` occur at lines 28, 36, 134, 248 — **all inside the strike notes that retire them; none inside a ⟨cmd⟩** (verified by extracting every backticked span on those lines). R4-2.3 satisfied.

### 2b. Twenty-three receipts re-run; twenty-one reproduce

| # | ⟨cmd⟩ | published | this seat |
|---|---|---|---|
| 1 | `grep -n '^### F\.W2' …/CENSUS-CANONICAL.md` | `### F.W2 — **31 rows**` | ✓ (`:4851`) |
| 2 | `sed -n '35p' fr-NotationPills.md` | FR-NP-32's row, *"producer dist emitter"* | ✓ |
| 3 | `grep -Fn "proven with value.js's own dist" fr-NotationPills.md` | `:47` | ✓ |
| 4 | `grep -Fc "…own dist**,** the very declared-and-bypassed…"` (comma form, struck) | **0** | ✓ **0** |
| 4b | em-dash form, B11's cure | (implied 1) | ✓ **1** (`grep -Fc` over the full parenthetical) |
| 5 | `sed -n '57p' fr-AdminAuditLog.md` | AA-20's row, *"F.W2 must widen or exclude with reasons"* | ✓ |
| 6 | `sed -n '107p' fr-PathPreview.md` | roster item 7, *"install = a write"* | ✓ |
| 7 | `sed -n '114p' fr-PathPreview.md` | the 29-row tally | ✓ |
| 8 | `sed -n '50p' fr-PathPreview.md` | PP-REDGATE, *"owned by F.W1/W2"* | ✓ |
| 9 | `sed -n '48p' fr-GalleryInfiniteGrid.md` | C-6 *"Do NOT re-book."* | ✓ |
| 10 | `sed -n '74p' fr-EquationView.md` | C·D-16's fold | ✓ |
| 11 | `sed -n '138p' fr-MorphShapePreview.md` | C·S-2 preservation | ✓ **byte-true** (the D-2 cure holds) |
| 12 | `sed -n '113p' fr-HarmonicLevelGrid.md` | HLG remedy hierarchy | ✓ |
| 13 | `sed -n '46p' fr-FourierMorphSvg.md` | *"14/22 presets drift…"* | ✓ |
| 14 | `grep -n 'basis-display' fr-GFC.md fr-GIG.md` | both read `basis-display.ts:1-7` | ✓ |
| 15 | `sed -n '1,9p' …/basis-display.ts` | literal opens `:3`, closes `:7` | ✓ |
| 16 | `grep -rn 'hexToRgba(' …/web/src/ \| grep -v 'export function'` | **5 lines / 3 files** | ✓ exact 5 coordinates |
| 17 | `sed -n '95,113p' src/easing.ts \| grep -c ','` | **19** | ✓ |
| 18 | `grep -n 'Object.freeze' / '^});' src/easing.ts` | `:94` / `:114` | ✓ |
| 19 | `node -p "Object.keys(require('…/glass-ui/package.json').exports).length"` | **80** | ✓ |
| 20 | `grep -c 'hsl(40' ContourPreview.vue ContourEditorCanvas.vue` | **1 + 8 = 9** | ✓ |
| 21 | `wc -l < …/colors.ts` | **117** | ✓ |
| 22 | `sed -n '34p' .gitignore` | `*.png` | ✓ |
| 23 | `ls …/audit/probes/app-wave/` | `BORN-RED-2026-07-27.json`, `app-shell-truth-probe.mjs` | ✓ |
| 24 | `ls /Users/mkbabb/Programming/value.js/audit` | *No such file or directory* | ✓ |
| 25 | `grep -lE '(F[.·–-]?W[0-9]+[/–-])?F?[.·–-]?W2' fr-*.md` (retired detector) | **32** records | ✓ **32** |
| 26 | G2 `easingNames\|timingFunctions` · G9 `colorUnit2\|color2` · `sampleColorRamp\|mixColorsN` | **0 / 0 / 0** | ✓ |
| 27 | G13 correspondence grep | **1 line**, `-o` → **2** | ✓ |
| 28 | G17 `hexToRgb(` minus `hexToRgba` | zero call sites outside `colors.ts:111` | ✓ |
| 29 | G16 `easing(x).value === easing(x).value` | **false** | ✓ |
| 30 | `./easing` exports / `bezierPresets` | **16 / 30** | ✓ |
| 31 | value.js `exports` keyset | 7 subpaths, no `"."` | ✓ |
| 32 | `grep -o 'vaul-vue' F-W1.md` | **ten sites** | ✓ **10** |
| 33 | `grep -o 'zero-cells' F-W5.md` | 3 rows (§8d note) | ✓ **3** |
| 34 | `grep -o 'The roster is ELEVEN' / 'TWELVE' F-W1.md` | ∅ / the phrase | ✓ |
| 35 | `grep -o 'PP-REDGATE ambient declaration' F-W1.md` | the phrase | ✓ |
| 36 | `grep -Fn 'colour-source divergence' F-W4.md` | M-β1's row | ✓ (`:246`) |
| 37 | `grep -o 'exports zero-cells (P-9)' F-W5.md` | the phrase | ✓ |
| 38 | `grep -o 'NO-WAVE-OWNER (producer emitter)' F-W0.md` (struck) | **no output** | ✓ |
| — | **`grep -o 'F.W0 additionally owns the pre-gate (G-4) + relay item 0' F-W0.md`** | *"returns that sentence"* | ✗ **D5-2** |
| — | **`grep -n '^### G-1[0-9]' F-W0.md`** | three lines | ✗ **D5-3** (returns six) |

### 2c. **D5-2 (HIGH) — a fabricated quotation under a "returns that sentence" attestation, third generation, same site**

B11 (F-W2 `:184`) publishes:

> ⟨cmd⟩ `grep -o 'F.W0 additionally owns the pre-gate (G-4) + relay item 0' F-W0.md` **returns that sentence**, and it occurs **inside that carry row**: *"F.W0 additionally owns the pre-gate (G-4) + relay item 0"*.

⟨cmd⟩ `/usr/bin/grep -o 'F.W0 additionally owns the pre-gate (G-4) + relay item 0' F-W0.md` → **no output (exit 1)**.
⟨cmd⟩ `/usr/bin/grep -c 'additionally owns' F-W0.md` → **0**. The word *additionally* is at **no byte of F-W0**.

What F-W0's live carry row 1 (`:140`) actually reads: *"…and the F.W0 half was always the one this row owns: the pre-gate (G-4) + relay item 0."*

The string **did** exist in four committed generations (⟨cmd⟩ `git show fffb9685:…/F-W0.md | grep -c 'additionally owns the pre-gate'` → 1) and F-W0's round-5 seat rewrote the sentence. So the mechanism is staleness — but §8d's F-W0 row asserts *"all five anchors re-resolved at the new bytes"*, and this is one of them. **This is the third generation of the same defect at the same paragraph**: round 3 struck *"NO-WAVE-OWNER (producer emitter)"* here, round 5 struck the `:35`/FR-NP-9 mis-receipt here, and the round-3 cure's own replacement — *"the two real strings above, each by command"* — is now one real string and one that returns nothing.

### 2d. **D5-3 (HIGH) — §2b's anchor-authority receipt is a 3-of-6 cut, undisclosed, and is not staleness**

§2b publishes ⟨cmd⟩ `grep -n '^### G-1[0-9]' F-W0.md` → three outputs (`G-11 …` · `G-12 …` · `G-13 …`).

⟨cmd⟩ `/usr/bin/grep -n '^### G-1[0-9]' F-W0.md` → **six** lines: `359:### G-10 …` · `364:### G-11 …` · `369:### G-12 …` · `374:### G-13 …` · `386:### G-14 …` · `391:### G-15 …`.

Not staleness: ⟨cmd⟩ `git show fffb9685:…/F-W0.md | /usr/bin/grep -c '^### G-1[0-9]'` → **6**; live → **6**. The command has returned six since before round 5. Two further form defects on the same paste: the `NNN:` prefixes that `-n` produces are stripped, and the `### ` heading marker is stripped. This is the R4-1.10 class ("receipt … cut undisclosed") standing on the receipt that establishes this spec's *entire* stable-anchor authority for `G-11`/`G-12`/`G-13`.

### 2e. **D5-4 (HIGH) — §8d's hash pins are false for 4 of 8 rows**

⟨cmd⟩ `/usr/bin/shasum -a 256 <file> | /usr/bin/cut -c1-12`, run from `docs/tranches/X/`:

| file | §8d pin | live | |
|---|---|---|---|
| `fourier/conformance/CENSUS-CANONICAL.md` | `a450b8e9f80e` | `a450b8e9f80e` | ✓ |
| `fourier/waves/F-W0.md` | `cd64d6580098` | **`282f0c120cd4`** | ✗ |
| `fourier/waves/F-W1.md` | `8507ec30f0bd` | **`a1302689aaa3`** | ✗ |
| `fourier/waves/F-W3.md` | `a89c3386f3f8` | `a89c3386f3f8` | ✓ |
| `fourier/waves/F-W4.md` | `71f3b640d51e` | **`39e1a60b3fc9`** | ✗ (row asserts *"moved: no"*) |
| `fourier/waves/F-W5.md` | `8047404bb6fc` | **`132c03192176`** | ✗ |
| `fourier/carry/F-W1-CARRY.md` | `0d0b091e86ca` | `0d0b091e86ca` | ✓ |
| `waves/W9.md` | `820bd500999f` | `820bd500999f` | ✓ |

By §8d's own closing law — *"If a hash here no longer matches at wave open, the quotation it covers is STALE BY CONSTRUCTION and is re-walked, not re-trusted"* — **every quotation those four rows cover is unverified at this reading**. This seat re-walked them: the F-W1 set (vaul-vue **10** · TWELVE · `PP-REDGATE ambient declaration` · `WU-K`/`WU-R`/`ESC-4`/`G12` anchors), the F-W4 `M-β1` row and the F-W5 `zero-cells`/`P-9` rows **all still resolve**; the F-W0 set does **not** (D5-2, D5-3). **The instrument worked — it made the movement visible — but the mechanism is the disclosure, not the cure, and one of the four covered sets is now materially false.** LAW E's ordering (purge seat truly last) has not yet reached this wave.

---

## §3 AXIS 3 — M-25 DEPTH · **SUBSTANTIALLY CLEAN (1 LOW)**

**Locks by banked id.** Every §6a lock names its banked authority: `G14`/FR-NP-32 · FR-EQR-3 (atomicity) · FR-GIG-5 (credit bar) · `fr-App C-2` (colours exception) · G5/G6 (same-commit riders) · `B11/K-8` with `fr-HarmonicLevelGrid.md:113` (NEVER-clause) · M-N11/D-7/D-9/M-N12 (one-edit law) · D-19 (measure-at-open). The B5 anti-rename lock carries **`M-β1`, original for life** at B5 itself.

**Aliases beside heads, never re-keyed.** §8a's `⟨aliases …⟩` brackets are the canonical's own alias cells, verbatim, at all 31 rows. §8a row 26 discharges the sharpest M-25 hazard explicitly: `fr-GalleryInfiniteGrid FR-GIG-17` ⟨alias `C-18` **of that record** — distinct from `fr-AnimationControls C-18` at §8b⟩ — two `C-18`s, two records, two homes, neither collapsed. §8b row 19 carries `RD-2` ⟨alias `C·D-16`⟩ and refuses to re-book the alias. §7's final row minutes rather than lists the `C·D-16` fold, precisely because the fold books two increments and one is a contest against this wave's own charter.

**D5-14 (LOW)** — §6a's lock line reads *"Anti-rename law, B5. ONE ramp identity, never re-booked per surface."* and states the lock by the spec's own row label without the banked id at the lock site. B5 carries `M-β1`; the lock does not. M-25 depth is satisfied one hop away rather than at the lock.

---

## §4 AXIS 4 — GATES · **DEFECTIVE (1 HIGH, 2 LOW)**

**Canonical operands only — CLEAN.** ⟨cmd⟩ `/usr/bin/grep -on 'PASS-[0-9]/[A-Za-z0-9.-]*' F-W2.md` → six occurrences, all at lines **5 · 7 · 20 · 30** — i.e. entirely inside the repair-round mastheads as strike/provenance notes. **No gate cell in the §5 table cites a check file, a prior pass, or a superseded census.** G19's LHS is the canonical roster and nothing else; every prior instrument (the CARRY rows, the PASS-1-keyed 54, the four-axis detector's 57) is named as STRUCK. R4-3 and R4-9.6 are satisfied.

**Reachable GREEN — CLEAN.** All 20 gates are born RED and each names a reachable green owner or a ruling act: G1/G5/G6/G17 = F.W2's own edits; G3/G4's GREENs are explicitly ceded to F.W1 (FR-GIG-5's bar, in both directions); G7/G8/G20 close on `RULINGS-F.W2.md` being written (⟨cmd⟩ `ls …/RULINGS-F.W2.md` → *No such file or directory* — the RED is real); G12's four PNGs are inside §2a's File Bounds as create rows at a live directory (the R3-9.1 cure holds — ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/probes/app-wave/` resolves); G14 is declared a hard precondition F.W2 states and never closes; G18 files its reciprocal to X-W9 and claims no GREEN. **No gate is a `scripts/**/proof-*.mjs`** — verified against the whole table.

**D5-1 (HIGH) — the §5 base declaration is false at its own bytes, and two phantom witnesses survive the round that killed five.**

§5 declares: *"**Every ⟨cmd⟩ in this file therefore carries a LITERAL ABSOLUTE PATH and consumes no shell variable at all** — the only form that cannot fail R4-2.1–4"*, then names **three** roots (the waves dir, the frozen corpus, and the fourier tree *"absolute and never relative (R-10.6)"*).

⟨cmd⟩ `/usr/bin/grep -o '⟨cmd⟩ \`[^\`]*\`' F-W2.md | /usr/bin/sed 's/⟨cmd⟩ //' | /usr/bin/sort -u | /usr/bin/wc -l` → **82** distinct commands.
⟨cmd⟩ … `| /usr/bin/grep -c '/Users/'` → **14**. **Sixty-eight of eighty-two carry no absolute path.**

Two consequences, one benign and one not:

1. **A FOURTH, undeclared base is in use — the value.js repo root** — nine distinct commands: `grep -n 'Object.freeze' src/easing.ts` · `grep -n '^});' src/easing.ts` · `grep -n 'Object.freeze\|^});' src/easing.ts` · `sed -n '92,135p' src/easing.ts` · `sed -n '95,113p' src/easing.ts | grep -c ','` (×2 spellings) · `grep -rn 'sampleColorRamp\|mixColorsN' src/ dist/ | wc -l` · `sed -n '34p' .gitignore` · `ls docs/tranches/V/megatranche/audit/probes/app-wave/`. This is exactly the *"Rounds 1–3 mixed **three** of them in one file — so at most one of the three could resolve from any single cwd"* defect the round-4 minute claims to have retired, reproduced with a fourth base under a universal asserting there are none.
2. **Two fourier-tree commands remain RELATIVE**, at §2b item 3, against the same paragraph's *"absolute and never relative"*:
   ⟨cmd⟩ `ls web/src/components/equation/convergence/` → from the value.js root: *No such file or directory*; from the declared `waves/` base: *No such file or directory*.
   ⟨cmd⟩ `find web/src -name 'Convergence*.vue'` → *No such file or directory*.
   **These are phantom witnesses of precisely the R-10.6 class the round-4 cure enumerated and closed** (*"the five relative commands G5/G8/G11/G13/G17 previously carried were phantom witnesses"*) — five were cured, two were never counted. They carry §2b item 3's *"two SFCs, not one"* correction, which is a contribution to F.W0's owned G-11 anchor table.

**D5-10 (LOW) — the anchor-idiom self-receipt is produced by a regex that cannot match.**
The masthead publishes ⟨cmd⟩ `grep -noE 'F-W[0-9]+\.md:[0-9-]+\|W9\.md:[0-9]+' F-W2.md` → **∅**. Under `-E`, `\|` is a **literal pipe**, not alternation, so the pattern requires the substring `…md:12|W9.md:34` and can never match. The published ∅ is therefore produced for the wrong reason. **The claim itself survives**: re-run with true ERE alternation (⟨cmd⟩ `/usr/bin/grep -noE 'F-W[0-9]+\.md:[0-9-]+|W9\.md:[0-9]+' F-W2.md`) → **also ∅**. No line-number-into-a-live-sibling anchor exists in this file. The idiom holds; its witness does not witness it.

**D5-15 (LOW) — table-cell `\|` under `-E`.** G13's ⟨cmd⟩ `grep -rniE 'megatranche\|facility-19\|library-band' …` sits in a table cell where `\|` is markdown's pipe escape; read literally into an ERE it is a literal pipe and returns **0**, not the published **1**. Rendered (`|`) it returns 1 — verified. BSD grep *does* honour `\|` in BRE (⟨cmd⟩ `printf 'alpha\nbeta\n' | /usr/bin/grep -c 'alpha\|beta'` → **2**), so the BRE siblings (G2, G9) are unaffected; only the `-E` form is ambiguous. R4-2.5's *"convicts on sight, no charitable reading"* is the standard that makes this a defect rather than a note.

---

## §5 AXIS 5 — POSTURE · **CLEAN**

| obligation | measurement | verdict |
|---|---|---|
| **F.W1 transaction whole** | §6a and §6b both cite *"the TWELVE-limb roster chartered at F-W1 §4 step 4 … cited whole, never restated here"*, and R-4b strikes the fold-seat restatement that re-fractured it. §2a's EXPLICITLY-NOT-IN-BOUNDS block excludes `web/package.json`, `App.vue:11,:13-17`, `main.ts`. `PP-REDGATE` is cited at F.W1 (§8b row 5), not booked. ⟨cmd⟩ `grep -o 'The roster is TWELVE' F-W1.md` returns the phrase; `'…ELEVEN'` → ∅ | **HELD** |
| **W7 ∅ closed** | ⟨cmd⟩ `/usr/bin/grep -c 'F\.W7' F-W2.md` → **0**. The wave routes nothing to F.W7 and asserts nothing about it — consistent with the canonical's §0.1 verification (`grep -o "F\.W7" fr-*.md` → 2 hits, both inside `KF.W7`) and R4-10's F-W7 row | **HELD** |
| **SS-4 flags** | ⟨cmd⟩ `/usr/bin/grep -c 'SS-4' F-W2.md` → **28**. §7 flags FN-5 as *"chained to the TA-4 value-side atomdiff restoration = **SS-4's OWNER-GATED G4**. F.W2 names the gate and does not pre-empt the ruling"*; §2a flags facility-19's home as SS-3/SS-4-reseatable; §6b's F.W5 edge is labelled **F.W5 (SS-4)**; §8b routes the UNROUTED pair to *"the forming SS-3/SS-4 specs"* and refuses to adopt them | **HELD** |
| **tree READ-ONLY** | Masthead `:40` — *"`/Users/mkbabb/Programming/fourier-analysis` is **READ-ONLY at spec time**"*; §2a's corpus row *"**READ ONLY** — immutable (E-1/E-3)"*; §2a's G12 row *"This is a **value.js-tree** create; the fourier tree stays READ-ONLY"*; §5's closing *"**The fourier tree stays READ-ONLY in every witness below** (greps, `ls`, node reads only)"*. This seat opened no fourier byte for write | **HELD** |
| **status planned** | `:3` — *"**Status: planned**"*; `EXECUTION IS NOT AUTHORIZED BY THIS FILE` at `:40` | **HELD** |
| **zero VERIFIED** | §1 verb table `:59` — `\| VERIFIED \| **NO** \| — stamped only at the X·F sub-tranche release close`. IMPLEMENTED **NO**. AUDITED YES rests on the canonical alone | **HELD** |
| **RULINGS-4 applied** | R4-1.2 (FR-NP-9 re-quoted at `:47`, comma→em-dash, `grep -Fc` on the struck form → 0) ✓ · R4-2 (`$V` and all bases retired from every ⟨cmd⟩) ✓ *with D5-1's residue* · R4-3/R4-9.6 (detector retired, canonical the sole operand) ✓ · R4-7.1 (six emphasis quotations re-pasted) ✓ *with D5-6's survivor* · R4-8.3 (§8d sha table minted) ✓ *with D5-4's staleness* · R4-10 (31 booked / 27 cited / `C·D-16` at its carry holder) ✓ | **APPLIED** |

**On the round's own headline claim** — *"the three 'exclusions' were never exclusions"* — this seat confirms it at the bytes: `PP-REDGATE` and `fr-GalleryInfiniteGrid C-6` are canonical **F.W1** rows, and `fr-PathPreview` roster item 7's head (⟨cmd⟩ `sed -n '107p' fr-PathPreview.md`) is *"7. **The committed substrate's gate under its OWN toolchain**"* — a numbered prose head with **no banked id token**, out of the census's domain by §0.2. The retirement of the "exclusion-with-reason" vocabulary for census rows is correct and is the right reading of R4-10.

---

## §6 CANONICAL SPOT-AUDIT — five records read against `registry/adjudicated/` bytes

**Method**: five records were re-derived against the frozen bytes under the canonical's own §0/§0.1 rules. **Findings here are filed against `CENSUS-CANONICAL.md`, not against F-W2** — the spec's duty under R4-10 is to book what the canonical homes, and it does.

**Machine pre-check (clean).** ⟨cmd⟩ per-record header counts vs actual §1 table rows, joined and diffed → **zero mismatches across all 66 records**; §1 row total **4269** = §3 TOTAL exactly; §1's F.W2 homes = §2's F.W2 roster exactly. **The canonical is internally consistent.** The findings below are derivation errors, not bookkeeping errors.

### 6a. `fr-ConvergencePlot` — **D5-7 (MEDIUM): one identity triple-booked**

The canonical carries, in one record:
- `RD-5` | aliases `D-2` · `C-14` | → **F.W2**
- `D-1` | alias `D-2` | → **F.W4**
- `D-2` | alias `C-14` | → **UNROUTED**

`D-2` is simultaneously an alias of two rows **and** a standalone banked row — against §0.1's own ONE-HOME rule: *"An id **claimed as an alias** by another row in the same record is **not a standalone identity** and books no row of its own."* `C-14` is likewise aliased twice. And `D-1`'s alias is manufactured: ⟨cmd⟩ `/usr/bin/sed -n '48p' fr-ConvergencePlot.md` shows the head is bare `| **D-1** |` with no alias token anywhere on the line. Inflates the 4269 total and the 307-row UNROUTED frontier by at least one. **No effect on F.W2's roster** — `RD-5` stays homed here, `D-1` stays a citation.

### 6b. `fr-ContourPreview` — **D5-8 (MEDIUM): `(a)`/`(b)` disambiguators stripped**

Record heads: row 1 = `| 1 | D:B-1 · C:D-1(a) · L:L-9 |`; row 14 = `| 14 | C:D-1(b) |`; row 22 = `| 22 | D:m-8 · L:L-9(system) |` (⟨cmd⟩ `sed -n '34p;47p;55p' fr-ContourPreview.md`). The canonical normalises `C:D-1(a)` → `C:D-1` as `D:B-1`'s alias **and** `C:D-1(b)` → `C:D-1` as a standalone F.W2 row — the same one-home violation, and `L:L-9` is aliased by two rows for the same reason.

**Consequence for the spec, disclosed:** §8a books row 5 (`D:B-1` ⟨aliases `C:D-1` · `L:L-9`⟩) and row 6 (`C:D-1`, *"— row 14"*). The spec disambiguates by record position, which is the best it can do — but §8a's closing absolute, *"**An alias is never re-booked as a row, here or anywhere**"*, is falsified by its own rows 5 and 6. **The root is the canonical's stripped disambiguator; the absolute is the spec's sentence.**

### 6c. `fr-ConvergenceLegend` + `fr-ConvergencePlot` — **D5-9 (MEDIUM): mention-harvested homes**

`C-15`'s own routing cell (⟨cmd⟩ `sed -n '83p' fr-ConvergenceLegend.md`) reads: *"**FOLD → the ramp identity (M-β1/FR-CP-2)**, which already adopted the F.W2 `sampleColorRamp` angle; this row is its legend-site instance."* The row's own arrow is a FOLD to the ramp identity — which RULINGS-4 D4-2 records the canonical homing at **F.W4**. The sole `F.W2` token modifies *another identity's* angle. Same shape at `RD-5` (⟨cmd⟩ `sed -n '26p' fr-ConvergencePlot.md`): a ruled-disagreement head whose six register siblings `RD-1/2/3/4/6/8` are all **TERMINAL (∅)**, and whose lone `F.W2` token sits inside *"the banked identity's F.W2 `sampleColorRamp` adoption angle must re-route to `oklch`/`mixColors`"*.

Strictly, §0.1 rule 2 (*"a row's ROUTING is the X-token(s) on its line"*) licenses both readings, and this seat does not overrule it. But **two of F.W2's thirty-one rows rest on tokens that grammatically belong to another identity**, and rule 2 has no instrument to tell a routing from a mention. Filed as a canonical derivation limitation for the SS-3/SS-4 seats to rule, not as a re-cut.

### 6d. `fr-Tooltip` — **arguable, filed at LOW**

⟨cmd⟩ `sed -n '56p' fr-Tooltip.md` → *"**FR-TT-22 = C-10 — INFO.** … A zero-cost row on the F.W2 ledger — a negative budget statement. **NO-WAVE-OWNER.**"* The row's bolded terminal disposition is `NO-WAVE-OWNER`; `F.W2` appears as a ledger mention. The canonical homes it **F.W2** legs NWO on first-token order. Same class as 6c; same disposition.

### 6e. `fr-MorphShapePreview` — **CLEAN**

⟨cmd⟩ `sed -n '138p' fr-MorphShapePreview.md` → `3. **C·S-2 — dodging \`lib/colors.ts\`'s broken oklch path by staying in CSS — carried.** Preserve verbatim through F.W2.` Head `C·S-2`, no aliases, routing `F.W2`, home **F.W2** — canonical exact. The spec's D3 rendering is **byte-true** and the superseded round-3 rendering survives only inside its strike note. The PASS-3 D-2 cure holds.

---

## §7 THE REMAINING DEFECTS

### D5-5 (HIGH) — §7's "six" over an eight-id list, and two incompatible SIXes

§7's zero-cell row (`:334`): *"its sixteen members are counted for the DENOMINATOR at G11 … — **six** of them are canonical `F.W2` rows and are booked at §8a (`FR-AUL-55` · `C-25` · `S-9` · `FR-EMT-24` · `C-08` · `FR-TT-22` · `FR-USB-38` · `C·S-2`)"* — **the enumeration is EIGHT.** R4-7.3 is explicit: *"every 'N ids/files/records' adjacent to an enumeration must equal the enumeration; where the prose and the list disagree, the LIST is authoritative."*

Worse, G11 enumerates a **differently-composed** six: *"⊕ the **SIX F.W2 measured itself** (Tooltip FR-TT-22 · EquationModeToggle FR-EMT-24 · **FunctionInput item 6** · PaperView C-08 · ConvergenceTimeline S-9 · AdminUserList FR-AUL-55)"*. `FunctionInput item 6` is **not** an §8a booking — §8b row 22 homes it *"out of the census's domain (§0.2)"*. So of G11's six, exactly **five** are canonical F.W2 rows, while §7 asserts six and lists eight. **The `16 = TEN ⊕ SIX` decomposition and §7's eight cannot both be true.** This is the D-7 class round 4 declared *"separated at D3, G11 and §7"* — separated at two of the three, and the third now disagrees with both. (Each of the eight ids §7 lists *is* a genuine §8a row — rows 2, 3, 17, 18, 28, 29, 30, 31 — so nothing escapes; the defect is arithmetic and attribution, not census.)

### D5-6 (MEDIUM) — an R4-7.1 emphasis-drift survivor at G15, contradicted three times by its own file

G15 renders the banked W.L5 probe span as *"…`timingFunctions` deleted; **8/22 curves drift, max 0.192**"*.
⟨cmd⟩ `/usr/bin/grep -Fc '**8/22 curves drift, max 0.192**' library-band.md` → **0**.
⟨cmd⟩ `/usr/bin/grep -Fc '8/22 curves drift, max 0.192' library-band.md` → **1**. ⟨cmd⟩ `/usr/bin/sed -n '296p' library-band.md` → `  \`timingFunctions\` deleted; 8/22 curves drift, max 0.192); \`fourier-vizcolor-oklch.mjs\` 5/6` — **the bank sets no emphasis**.
The **same file** renders the same span **plain** at three other sites (⟨cmd⟩ `grep -o '5 × ERR_PACKAGE_PATH_NOT_EXPORTED.\{0,90\}' F-W2.md | sort -u` → four renderings, one bolded, three plain). Round 5's minute states *"all six re-pasted byte-true against their own `sed`"*; a seventh survived, and it is the load-bearing drift figure G15 exists to state.

### D5-11 (LOW) — §3's manifest mis-describes the probe span's boundary

The manifest states the W.L5 probe's *"receipt `sed -n '294,297p'`, **span `:295-296`** (`:294` is the `### W.L5 — FOURIER…` heading and **`:297` is the `fourier-vizcolor-oklch.mjs` leg**, so neither carries a quoted word)."* ⟨cmd⟩ `/usr/bin/sed -n '294,297p' library-band.md` shows that leg's **name lands on `:296`**, inside the declared span; `:297` is its continuation (`(four oklch tokens → \`#888888\`…)`). The span is right; the sentence that justifies it is not. Given this file's own round-3 minute — *"a false witness authored by the rule's own author is still a false witness"* — the boundary argument should state what the four lines hold.

### D5-12 (LOW) — a bold boundary elided inside a verbatim span

G15 renders `fr-EasingPicker.md:52` as *"**14 of 22 silently drift analytic→CubicBezier-approximation** (8 stay analytic incl. ease-out-cubic/-expo)"*. ⟨cmd⟩ `/usr/bin/sed -n '52p' fr-EasingPicker.md` shows the bank opens the bold one word earlier: `…**but 14 of 22 silently drift analytic→CubicBezier-approximation**…`. The elided *but* is **inside** the emphasised span, so the quotation's emphasis boundary is not the bank's. (⟨cmd⟩ `grep -Fc '**14 of 22 silently drift analytic→CubicBezier-approximation**' fr-EasingPicker.md` → **0**; the plain phrase → 1.) The same phrase is rendered a third way at `:148` with the bold closing at the end of the parenthetical.

### D5-13 (LOW) — "returns exactly it" overstates the receipt

The round-5 masthead states FR-NP-9 is *"Re-quoted at `:47` beside the `grep -Fn` that returns exactly it."* ⟨cmd⟩ `/usr/bin/grep -Fn "proven with value.js's own dist" fr-NotationPills.md` returns **the whole of line 47** (a ~400-character banked row), not the quoted parenthetical. The quotation itself **is** byte-true — ⟨cmd⟩ `/usr/bin/grep -Fc "(nine of nine channels, proven with value.js's own dist — the very declared-and-bypassed dependency this row books)" fr-NotationPills.md` → **1** — so the cure landed; only its description of its own witness is loose. Under R4-1's law (*"a receipt may only be published beside the command that produced it"*) the honest form is `grep -Fc` over the span, which returns 1 and is exact.

---

## §8 DEFECT REGISTER

| # | sev | claim | receipt |
|---|---|---|---|
| D5-1 | **HIGH** | §5's *"Every ⟨cmd⟩ … carries a LITERAL ABSOLUTE PATH"* is false at 68/82; a fourth undeclared base (value.js root) is in use at 9 commands; two fourier-tree commands survive RELATIVE against *"absolute and never relative"* and resolve from no declared base | `…\| sort -u \| wc -l` → 82; `\| grep -c '/Users/'` → 14; `ls web/src/components/equation/convergence/` → *No such file or directory* (value.js root and `waves/`); `find web/src -name 'Convergence*.vue'` → *No such file or directory* |
| D5-2 | **HIGH** | B11's *"returns that sentence"* receipt returns nothing; the quoted head is at no byte of F-W0 — third generation of the same defect at the same paragraph | `grep -o 'F.W0 additionally owns the pre-gate (G-4) + relay item 0' F-W0.md` → no output (exit 1); `grep -c 'additionally owns' F-W0.md` → 0; live `F-W0.md:140` reads *"…the F.W0 half was always the one this row owns: the pre-gate (G-4) + relay item 0"* |
| D5-3 | **HIGH** | §2b's anchor-authority receipt prints 3 of 6 outputs, cut undisclosed, with `-n` prefixes and `### ` markers stripped — and it is not staleness | `grep -n '^### G-1[0-9]' F-W0.md` → 6 lines (`:359 :364 :369 :374 :386 :391`); `git show fffb9685:…F-W0.md \| grep -c '^### G-1[0-9]'` → 6 |
| D5-4 | **HIGH** | §8d's hash pins are false for 4 of 8 rows; by §8d's own law every quotation they cover is stale-by-construction, and the F-W0 set is now materially false (D5-2, D5-3) | `shasum -a 256`: F-W0 `cd64d6580098`→`282f0c120cd4`; F-W1 `8507ec30f0bd`→`a1302689aaa3`; F-W4 `71f3b640d51e`→`39e1a60b3fc9` (row asserts *moved: no*); F-W5 `8047404bb6fc`→`132c03192176` |
| D5-5 | **HIGH** | §7 states *"**six** … booked at §8a"* over an EIGHT-id list (R4-7.3); G11's differently-composed SIX includes `FunctionInput item 6`, which §8b homes out-of-domain, so the `16 = TEN ⊕ SIX` decomposition and §7's eight cannot both be true | `sed -n '334p' F-W2.md` → `six of them … (FR-AUL-55 · C-25 · S-9 · FR-EMT-24 · C-08 · FR-TT-22 · FR-USB-38 · C·S-2)` = 8; `grep -o 'SIX F.W2 measured itself.\{0,170\}' F-W2.md` → the 6-set with `FunctionInput item 6`; §8b row 22 |
| D5-6 | **MEDIUM** | R4-7.1 emphasis-drift survivor at G15 under a *verbatim* idiom; the same file renders the same span plain at 3 other sites | `grep -Fc '**8/22 curves drift, max 0.192**' library-band.md` → 0; plain form → 1; `sed -n '296p' library-band.md` |
| D5-7 | **MEDIUM** *(canonical)* | `fr-ConvergencePlot` triple-books one identity: `D-2` is an alias of `RD-5`, an alias of `D-1`, and a standalone UNROUTED row — against §0.1's ONE-HOME rule; `D-1`'s alias is manufactured | `grep -F 'fr-ConvergencePlot\t\| \`D-1\`' rows.tsv` · same for `RD-5`, `D-2`; `sed -n '48p' fr-ConvergencePlot.md` → head is bare `**D-1**`, no alias token |
| D5-8 | **MEDIUM** *(canonical)* | `fr-ContourPreview`'s `(a)`/`(b)` disambiguators are stripped, so `C:D-1` is both `D:B-1`'s alias and a standalone F.W2 row; the spec mirrors it and thereby falsifies §8a's *"An alias is never re-booked as a row, here or anywhere"* | `sed -n '34p;47p;55p' fr-ContourPreview.md` → `D:B-1 · C:D-1(a) · L:L-9` / `C:D-1(b)` / `D:m-8 · L:L-9(system)`; canonical `:1238`/`:1251` |
| D5-9 | **MEDIUM** *(canonical)* | Two of F.W2's 31 rows are homed on `F.W2` tokens that grammatically modify another identity: `C-15` (own arrow = FOLD → ramp identity, canonically F.W4) and `RD-5` (ruled-disagreement head whose six register siblings are all TERMINAL ∅) | `sed -n '83p' fr-ConvergenceLegend.md` → *"**FOLD → the ramp identity (M-β1/FR-CP-2)**, which already adopted the F.W2 `sampleColorRamp` angle"*; `sed -n '26p' fr-ConvergencePlot.md` |
| D5-10 | **LOW** | The anchor-idiom self-receipt uses `\|` under `-E` (a literal pipe), so its published ∅ is produced by a regex that cannot match; the claim survives a corrected re-run | as printed → ∅ (exit 1); `grep -noE 'F-W[0-9]+\.md:[0-9-]+\|W9\.md:[0-9]+'` with true alternation → also ∅ |
| D5-11 | **LOW** *(canonical-adjacent)* | §3's manifest says *"`:297` is the `fourier-vizcolor-oklch.mjs` leg"*; that leg's name is on `:296`, inside the declared span | `sed -n '294,297p' library-band.md` |
| D5-12 | **LOW** | G15's `fr-EasingPicker.md:52` quotation opens its bold at *14*; the bank opens it at *but*, so the elided word sits inside the emphasised span; a third rendering at `:148` closes the bold elsewhere | `grep -Fc '**14 of 22 silently drift analytic→CubicBezier-approximation**' fr-EasingPicker.md` → 0; `sed -n '52p'` → `…**but 14 of 22 silently drift…**` |
| D5-13 | **LOW** | *"the `grep -Fn` that returns exactly it"* — the command returns the whole ~400-char line 47, not the span; the quotation itself is byte-true | `grep -Fn "proven with value.js's own dist" fr-NotationPills.md` → full `:47`; `grep -Fc "(nine of nine channels, …books)"` → 1 |
| D5-14 | **LOW** | §6a states the anti-rename lock by the spec's own row label without its banked id at the lock site (B5 itself carries `M-β1`) | `grep -o 'ONE ramp identity.\{0,120\}' F-W2.md` → §6a *"ONE ramp identity, never re-booked per surface."* vs B5 *"ONE ramp identity, `M-β1`, original for life"* |
| D5-15 | **LOW** | G13's `-E` command carries a table-cell `\|`; read literally into an ERE it is a literal pipe and returns 0, not the published 1 (R4-2.5 admits no charitable reading). BRE siblings unaffected — BSD grep honours `\|` in BRE | `printf 'alpha\nbeta\n' \| grep -c 'alpha\|beta'` → 2 (BRE ok); `grep -rniE 'megatranche\|facility-19\|library-band' …` rendered → 1 |

---

## §9 VERDICT

**verdictLocal: DEFECTIVE** — 15 defects, **5 HIGH · 4 MEDIUM · 6 LOW**; three of the four MEDIUMs are filed against `CENSUS-CANONICAL.md`, not against this spec.

**What is clean, and it is the important part.** The census axis is **CLEAN**: 31 canonical rows, 31 booked at §8a, 0 escaped, 0 fabricated, 27 citations every one of which resolves at the holder the canonical names. Every column-2 routing cell, every alias bracket and every leg is byte-identical to the canonical's §1. The R4-10 freeze worked: this is the first round in five whose denominator was not manufactured by the wave that consumed it, and the retirement of the detector — together with the retirement of the "exclusion-with-reason" vocabulary for census rows — is the correct reading of the ruling and should not be re-opened. Posture is intact on all seven obligations; no gate cites a check file; all 20 remain born-RED with reachable owners.

**What convicts.** The defects cluster in one place: **the receipt apparatus, and specifically the seam between this file and its live siblings.** D5-2 and D5-3 are both F-W0 quotations — one now false, one a 3-of-6 cut that was never true — and D5-4 shows the §8d hash instrument correctly flagging the first while four of its eight pins have themselves gone stale. D5-1 is the base declaration promising an absoluteness that 68 of 82 commands do not have, with two genuinely unrunnable fourier-relative survivors of a class this round enumerated and closed. D5-5 is a count word contradicting its own list *and* its own sibling section, on the D-7 arithmetic round 4 claimed to have separated.

**The pattern, stated once.** Five rounds have now cured receipts one at a time and left the shape that generates them. Round 3 cured eight, round 4 converted six to classifications, round 5 hash-pinned eight — and each round's cure was falsified by the next round's siblings moving underneath it. **The instrument is not the problem; the ordering is.** R4-8's LAW E (*"the purge seat runs LAST, touching every file AFTER every other seat's final byte"*) has not yet reached this wave: four of eight siblings moved after F-W2 closed, and F-W2's own §8d predicted exactly that and could do nothing about it. **A hash table is a smoke detector, not a fire door.** Until a settle-then-cert ordering actually runs, every cross-file receipt in this program is a wager on a file holding still, and pass 6 will find the same class again at different coordinates.

**Recommended dispositions for the pass-5 rulings seat.**
1. **D5-2 · D5-3 · D5-4** ride ONE cure: re-walk all five F-W0 anchors at the live bytes, publish the `grep -n '^### G-1[0-9]'` output whole (six lines, with prefixes) or narrow the command to the three gates it means, and re-hash §8d **after** every sibling's final byte — not before.
2. **D5-1** is two edits: absolutise `ls web/src/components/equation/convergence/` and `find web/src …`, and either declare the value.js repo root as a fourth base or absolutise its nine commands. The universal must then be restated as what it can prove.
3. **D5-5** takes the LIST as authoritative per R4-7.3 (eight), and G11's SIX must be reconciled with §8a — `FunctionInput item 6` cannot be a member of a set described as booked here.
4. **D5-6 · D5-12** are one re-paste each against their own `sed`.
5. **D5-7 · D5-8 · D5-9 · D5-11** are **canonical amendments**, not spec edits, and must be made by amendment at the canonical under its own §0 rules — never by a wave re-cutting a roster. F-W2 books what the canonical homes and is correct by obedience; if D5-9 is ruled, `C-15` and `RD-5` move and §8a follows the canonical, in that order and never the reverse.

*— end of PASS-5 F-W2-CHECK. Every ⟨cmd⟩ in this file was run by this seat, this round, on the pinned BSD toolchain; no output is transcribed from a prior pass, a rulings file, or another check. Nothing outside this file was written.*

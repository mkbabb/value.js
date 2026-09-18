# X·F CONFORMANCE PASS 5 — F-W8 CHECK (fresh adversarial seat, L-18/L-20)

**Wave**: F.W8 — the CRUD union prototype, end to end. **Spec under test**: `docs/tranches/X/fourier/waves/F-W8.md` (373 lines).
**Seat**: FRESH. Authored none of the bytes it convicts; every figure below was produced by a command run **this session** on the pinned toolchain and is re-runnable from the command printed beside it.
**Date**: 2026-08-29.

**Operands, and nothing behind them.**

- **CENSUS (sole)**: `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` — read and hashed this session. The census axis is mechanical per the standing order: take F-W8's canonical roster, verify each id is BOOKED or CITED to its holder. No check file, no prior pass, no re-derivation of this seat's own is an operand anywhere below.
- **EVIDENCE**: the 66 frozen records at `docs/tranches/V/megatranche/registry/adjudicated/` (immutable, line-citable).
- **RULINGS**: `PASS-4/RULINGS-4.md` (R4-1..R4-10). **CERT**: `PASS-4/CLOSE-CERT-2.md` — cited only under its own closing clause (*"no certificate is inherited — pass 5 re-runs these claims or it has none"*), and re-run below.

---

## §0 — TOOLCHAIN, PINNED AND DISCLOSED (R4-2)

```
PATH=/usr/bin:/bin:/usr/sbin:/sbin
/usr/bin/grep --version  →  grep (BSD grep, GNU compatible) 2.6.0-FreeBSD
```

▲ **A hazard this seat hit on its first command, minuted so the next seat does not lose an hour to it.** In the recorded interactive shell **bare `grep` is a shell FUNCTION that re-execs `ugrep`** — `which -a grep` returns the function body before `/usr/bin/grep`, and the function prints `ugrep: warning: …` on a missing operand where BSD grep prints `grep: …: No such file or directory`. CLOSE-CERT-2 §0 warned of this in prose; it is now warned of with the receipt. **Every measurement in this file was taken with `/usr/bin/grep` spelled absolutely**, never with the bare token.

## §0a — LAW E HELD: THE SHA256 CERT IS NOT VOIDED

`⟨cmd⟩ shasum -a 256 waves/F-W*.md conformance/CENSUS-CANONICAL.md` (this seat, run from `docs/tranches/X/fourier`) — **all twelve digests match CLOSE-CERT-2 §8 exactly**, including `1e3698adf4ff402e0dc5aa06de6fc1ac44a594c36d9a07fd74f9c1c4dc000dc8  waves/F-W8.md` and `a450b8e9f80ebaf29b223b87cbe4fd31f5242147dea0427662bd0696722a99d8  conformance/CENSUS-CANONICAL.md`.

**Consequence, and it cuts both ways.** R4-8's ordering held — no seat wrote after the purge seat, so the cert is mechanically intact. **Which means the two convictions at §2 items 1 and 2 below were IN F-W8 at the settle**, under the same bytes the cert measured, and CLOSE-CERT-2 §4's F-W8 row — *"85 ⟨cmd⟩ operands re-run · 0 convictions · **CLEAN**"* — is **falsified on its own hashes**. The cert is not voided by a later write; it is falsified by re-measurement, exactly as its own closing clause invited.

---

## §1 — AXIS 1: ROSTER BOOKED/CITED COMPLETE

### 1a. What F-W8's canonical roster IS

```
C=conformance/CENSUS-CANONICAL.md
⟨cmd⟩ /usr/bin/grep -nE '^### F\.W[0-9]' "$C" | /usr/bin/grep -c 'F\.W8'   → 0
⟨cmd⟩ /usr/bin/grep -nE '^### F\.W5(-W8)? — ' "$C"
  4990:### F.W5 — **28 rows**
  5004:### F.W5-W8 — **90 rows**
```

**§2 carries no `F.W8` roster header at all.** The canonical homes **zero** record-side rows at F.W8 (§4.1, re-run below), which R4-10's table states as *"F-W8 | **0** record-side (§4.1)"*. A zero roster is discharged vacuously and measures nothing, so this axis runs against the roster **F-W8 itself declares as its citation operand and its G15 RHS** — the canonical §2 `F.W5-W8` band (**90 rows**), held at **F-W5** per R4-10 — with §2 `F.W5` (**28 rows**) admitted as the second half of the file's own declared operand where a row lands there.

▲ **The §4.1 quotation the whole posture rests on reproduces byte-for-byte.**

```
⟨cmd⟩ /usr/bin/grep -nF 'are likewise named by **no record**' "$C"
  5394:   `F.W6`, `F.W8` and `F.W10` are likewise named by **no record** — their wave-side populations are
⟨cmd⟩ /usr/bin/sed -n '5393,5396p' "$C"
   two `F.W7` substrings in all 66 records are inside `KF.W7` (the keyframes relay at `fr-Tooltip`).
   `F.W6`, `F.W8` and `F.W10` are likewise named by **no record** — their wave-side populations are
   folds, operands and gate machinery, never record routings. Four passes measured F-W6/F-W8
   "escapes" against record-side rows that do not exist; §1 is the denominator that settles it.
⟨cmd⟩ R='…/registry/adjudicated'; /usr/bin/grep -rho "F\.W8" "$R"/fr-*.md   → no output, exit 1
```

All three are as the spec pastes them at its masthead and §1. **F.W8's zero is real at both ends.**

### 1b. The roster extracted and swept

```
⟨cmd⟩ /usr/bin/awk '/^### F\.W5-W8 — /{f=1;next} /^### /{f=0} f' "$C" | /usr/bin/grep -c '^- \*\*'   → 32   (record bullets)
⟨cmd⟩ …expanded to (record, id) pairs…                                                              → 90   (= the header's 90)
⟨cmd⟩ …per-bullet declared counts summed…                                                           → 90   (header ≡ bullets ≡ pairs)
```

**The spec's own coverage finding reproduces.** §0 publishes: *"every one of its 90 rows was tested for bytes in this file (⟨cmd⟩ per row `grep -qF '<id>' waves/F-W8.md` … over the roster extracted from canonical §2) … re-run the same sweep against these bytes and **no row is absent**."* Re-run by this seat with `/usr/bin/grep -qF`: **90 present · 0 absent.** The receipt is true as printed.

▲ **And it is the wrong instrument, by the file's own law.** `grep -qF` over a bare token is what R-5 forbids as an identity test; F-W8 says so at §3, §5b, G15 and §6a, then warrants its only coverage claim with it. Re-run **record-qualified** — an id counts as identified when it is corpus-unique, or when its record's name co-occurs on the line that carries it:

```
⟨cmd⟩ …for each of the 90, count distinct records holding that id across all §2 rosters…
  → 40 of the 90 are corpus-AMBIGUOUS (≥2 records)
⟨cmd⟩ …for each ambiguous pair, /usr/bin/grep -F "<id>" waves/F-W8.md | /usr/bin/grep -cF "<record short name>"…
  → 38 qualified · 2 NOT QUALIFIED ANYWHERE IN THE FILE:
       fr-BasisSelector      m-7    (7 records hold `m-7` in §2; 17 files in the frozen corpus)
       fr-GalleryDraftsSection m-15 (6 records hold `m-15` in §2)
```

### 1c. The disposition of all ninety

| disposition | count | how measured |
|---|---|---|
| **BOOKED** — named in a §3 row's banked-ids cell (this wave's assertion rows) | **65** | id ∈ column 3 of the 28 `^\| \*\*(P\|J\|R\|M\|D)[0-9]` rows at `:171`–`:218` |
| **CITED** — in §6a's 40 with its record, or elsewhere with a named holder | **24** | 16 in §6a's forty; 8 more cited by name (FR-AFP-9 · FR-AFP-10 · FR-AFP-70 → *"their SEMANTICS ruling is F.W5/F.W6's"*; FR-AFP-66 · FR-AFP-33 → F.W9/W10 and SS-13 rows; M-14 → row 37's E14 quote; fr-GalleryCard D-7 → P5's fold; `C:C-23` → §6a's header, cited to F-W5 with its divergence minuted) |
| **ESCAPED** | **1** | `fr-GalleryDraftsSection m-15` — present only inside the quoted F-W5 C2 span at `:40` and `:210`, bare, ambiguous, in no §3 cell and no §6a row |
| | **90** | |

▲ **`m-7` is not an escape but is worse placed than one**: it is **BOOKED** at §3 J4 (*"**m-7** (= C-6-as-rescoped)"*) and re-cited at G4, §5b K-3 and §6, **bare at all four sites**, in a file that books `C-6/C-7 (EditorControlsDock)` at §3 P7 — two different `C-6`s one screen apart. The canonical row is `| m-7 | C-6-as-rescoped | F.W5–W8 | **F.W5-W8** |` at fr-BasisSelector, so the alias is right and the head is right; only the record is missing. Neither `m-7` nor `m-15` appears on §5b's declared collider roster (`B-1 B-2 C-2 C-3 C-4 C-17 C-18 D-13 L-B1 L-M3 M-10 M-13`) — a roster round 2 built *"by CONVICTION, not by caution"* from the tokens that had already failed, which is precisely why it does not contain the two that were failing silently.

### 1d. THE OTHER DIRECTION — §6a's forty against the canonical

§6a declares itself *"the per-id operand **G15** runs its set difference against"* and closes *"**Every one of the forty rows below is now a band-routed identity by its own cited bytes.**"* Differenced against the file's own declared roster of record (§2 `F.W5` ⊎ `F.W5-W8` = 118 rows):

```
⟨cmd⟩ /usr/bin/sed -n '332,371p' waves/F-W8.md | /usr/bin/awk -F'|' '{print $2" ||| "$3}'   → the 40 rows
⟨cmd⟩ …joined by (record, id) against the 118-row union…
  → 17 of 40 name an identity ABSENT from the declared operand
```

Resolved one by one in the canonical's §1 tables, the seventeen split cleanly:

| class | rows | canonical status |
|---|---|---|
| canonical rows homed at **F.W4** or **F.W3** carrying `<sub>legs: F.W5-W8</sub>` | 2 · 8 · 9 · 13 · 14 · 15 · 16 · 17 · 22 · 23 · 25 · 26 · 30 · 32 · 38 · 39 | band-**routed** (leg), not band-**homed**; e.g. `\| \`AA-10\` \| \`D-M2\` · \`L-13\` \| \`F.W4\` · \`F.W5–W8\` \| **F.W4** <sub>legs: F.W5-W8</sub> \|` |
| **no canonical row at all** | **40** | see §2 item 1 |

Sixteen of the seventeen are legitimate legs and §6a's header pre-empts them in terms (*"the canonical's **home** is where a record's routing token sends the row; this table's **STATING home** is which F-W5 clause states the contract rule"*), so they are **disclosed, not hidden**. What is not discharged is R4-10's actual duty — *"BOOKS each canonical id, or **CITES the holder by name**"* — and R4-6's leg law, *"each leg books as ONE explicit row at the wave that HOLDS the host id."* Fifteen of the sixteen name an **F-W5 clause** where the canonical holder is **F-W3** or **F-W4**; only row 17 names F.W4, and it names it because F-W3 §X.1-v4's criterion forced it to. Booked at §3 as a MEDIUM (§2 item 7).

**Axis 1 verdict: DEFECTIVE** — 1 escape, 1 fabricated row, 15 legs cited to a clause instead of their canonical holder.

---

## §2 — AXIS 2: RECEIPT REALITY (26 ⟨cmd⟩ operands re-run; 2 convicted, 3 flawed)

`⟨cmd⟩ /usr/bin/grep -o '⟨cmd⟩' waves/F-W8.md | /usr/bin/wc -l` → **85** markers, **44** lines. This seat re-ran **twenty-six** operands spanning every section — masthead, §0, §1, §3, §4, §5c, §6a — chosen to include every receipt that crosses a file boundary and every one that carries a figure.

### CONVICTED

#### 1 · §6a row 40 — AN IDENTITY THE CENSUS OF RECORD DOES NOT CARRY · **HIGH**

Row 40 rows `fr-CanvasControlsDock **C-28**` as one of the forty band identities, homed at F-W5 clause B1, and §6a's closing stamp rests on it.

```
⟨cmd⟩ /usr/bin/grep -c 'C-28' "$C"                                              → 8
⟨cmd⟩ /usr/bin/grep -n 'C-28' "$C"  →  455 · 2953 · 3507 · 3619 · 4966 · 5059 · 5178 · 5333
        455  = | `C-28` | — | `GLASS-RELAY` | **GLASS-RELAY** |      (fr-AnimationControls)
        5059 = - **fr-AnimationControls** (1): `C-28`                  (the GLASS-RELAY roster)
        the other six are FR-GFC-28 / FR-IC-28 / MPC-28 substrings
⟨cmd⟩ /usr/bin/awk 'NR>=806 && NR<876' "$C" | /usr/bin/grep -c 'C-28'           → 0
⟨cmd⟩ R='…/registry/adjudicated'; /usr/bin/grep -nE '^\| \*\*C-28' "$R"/fr-CanvasControlsDock.md → no output, exit 1
```

**`fr-CanvasControlsDock` has no `C-28` row in the canonical's 4269, and no banked row head at the frozen record.** At the corpus `C-28` lives only in prose — `:102`'s `**Full-coverage note**` (*"C-28 into D-4's F.W5–W8 rider"*) and `:150`'s R6-8 bullet (*"C-28 folds"*) — as a fold **into `D-4`**, and `D-4` **is** a canonical row (`\| \`D-4\` \| \`L-1\` · \`C-3\` \| \`F.W4\` · \`F.W5–W8\` \| **F.W4** <sub>legs: F.W5-W8</sub> \|`) which §3 P7 already books.

The row convicts itself in its own cell: *"F.W8 books **D-4/L-1/C-3** … at §3 **P7** and **does not** book C-28: C-28 is the D-4 **server-arm dedupe rider**."* The file knows it is a rider on D-4 and numbers it as an identity anyway. **G15's LHS therefore carries a member its RHS — the canonical §2 roster — cannot contain**, which is a non-empty set difference in one direction *at authoring*: the wave's own stated HALT condition, met for the third round running in a new shape (round 2 = homonym collision, round 3 = row-identity mis-attachment on a multi-identity line, round 4/5 = **a prose fold-reference promoted to a roster row**). R4-10's word for it is exact: *"an id booked that the canonical does not home there is that wave's fabrication."*

**Cure**: strike row 40 as a numbered identity; carry `C-28` where the record carries it — as a named **fold on `D-4`** inside P7's cell — and re-derive the header and the closure stamp after the row moves (R2-7.4), never defend them.

#### 2 · §4 G15 — "THE SAME PROBE" CANNOT PRODUCE ITS STATED OUTPUT · **HIGH**

G15's cell publishes, with its command:

> ⟨cmd⟩ `C='docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md'; grep -nF 'fr-ContourPreview** (1): ' "$C"` → `4996:- **fr-ContourPreview** (1): `L:L-5`` inside the **§2 `F.W5`** roster (with `C:D-11` at F.W9 and `R6-8` at UNROUTED on the same probe, disclosed rather than trimmed) … ▲ **It is also a TENTH colliding token** … : **the same probe returns `L:L-5` a second time inside the canonical's §2 `F.W3` roster, at `fr-PaperSearchDropdown`**

Re-run verbatim:

```
⟨cmd⟩ /usr/bin/grep -nF 'fr-ContourPreview** (1): ' "$C"
  4996:- **fr-ContourPreview** (1): `L:L-5`
  5044:- **fr-ContourPreview** (1): `C:D-11`
  5309:- **fr-ContourPreview** (1): `R6-8`
⟨cmd⟩ /usr/bin/grep -nF 'fr-ContourPreview** (1): ' "$C" | /usr/bin/grep -c 'L:L-5'   → 1
```

**Three lines, `L:L-5` once.** The first half of the cell reproduces perfectly — 4996 is inside §2 `F.W5` (`4990`–`5003`), 5044 inside `F.W9` (starts `5039`), 5309 inside `UNROUTED` (starts `5298`), and the residue is disclosed rather than trimmed, which is the idiom working. The second half **cannot run**: the second `L:L-5` is at `:4920`, an `fr-PaperSearchDropdown` line that the fixed-string filter `fr-ContourPreview** (1): ` excludes **by construction**, at any reading, on any base.

The FACT is true and this seat re-proved it with the probe the cell should have printed:

```
⟨cmd⟩ /usr/bin/grep -nF 'L:L-5' "$C"
  4920:- **fr-PaperSearchDropdown** (25): … `L:L-5` …        (inside §2 F.W3, 4871–4932)
  4996:- **fr-ContourPreview** (1): `L:L-5`                   (inside §2 F.W5, 4990–5003)
```

So the tenth collision is real and worth naming. **The receipt warranting it is dead**, and R4-2.5 forbids the charitable reading that would save it (*"convicts it ON SIGHT as unrunnable machinery — no charitable reading, no 'intent was clear'"*). It sits **inside a gate cell** — the site this file itself calls *"the worst place this class can hide"* when it struck round 2's `grep -c "F\.W8" F-W5.md → 0` from the identical position. The class it was cured of at round 3 has re-entered the same cell in a new shape at round 4.

**Cure**: publish the two-probe pair — the `fr-ContourPreview` locate for the homing, `grep -nF 'L:L-5' "$C"` for the collision — each with its own output. One command, one claim.

### FLAWED, NOT CONVICTED (cure at the site; none changes a finding)

#### 3 · The masthead's FIRST receipt fails three ways · **MEDIUM-HIGH**

`⟨cmd⟩ grep -n 'SS-4' COHESION.md` (`:3`).

```
(a) BASE.  From docs/tranches/X/fourier — the base at which every other operand in this file
    resolves (waves/…, carry/…, conformance/…) — the file does not exist:
    ⟨cmd⟩ cd docs/tranches/X/fourier && /usr/bin/grep -n 'SS-4' COHESION.md
        → grep: COHESION.md: No such file or directory
    It resolves only from docs/tranches/X/.  R4-2.4 (one command, one base); R4-2.5 convicts on sight.

(b) RESIDUE.  From the base where it does resolve it returns SEVEN lines:
    ⟨cmd⟩ cd docs/tranches/X && /usr/bin/grep -n 'SS-4' COHESION.md | /usr/bin/cut -d: -f1
        → 36 57 69 135 146 147 165
    The paste discloses two (§1's row and §2's co-signature row) and states no residue.  R4-1.9:
    "an attestation of sweep must list its residue or not exist."

(c) VERBATIM LABEL OVER A TRUNCATION.  The paste, explicitly labelled verbatim, ends
    "· TA-4 atomdiff-excision record · X-W3 P0 rows".  The live cell continues:
    ⟨cmd⟩ /usr/bin/sed -n '36p' COHESION.md
        | SS-4 | … · X-W3 P0 rows · owner rulings owed (trie-vs-KISS et al.) | the co-signed
        shared-provenance contract + X·F CRUD wave specs | contract design TWICE-AUTHORED; Fable
        adjudication; owner rulings flagged inline | AWAITS intake CARRY + owner rulings |
    Four further cells and a trailing clause, cut with no ellipsis, under the label that means
    bytes.  R4-7.1: "re-paste byte-true, or re-label."
```

The routing claim is unaffected — SS-4 does charter the union prototype to F.W5–W8 — which is exactly why the form has to be fixed rather than argued, in the words the file uses on its own siblings.

#### 4 · §1's count sentence is wrong on the one figure a reader can check · **MEDIUM-HIGH**

§1 replaced the struck arithmetic with an enumeration and warranted it: *"**16 gates** (§4, `G1`–`G16`), **28 carry rows** (§3 …), **40 citation rows** (§6a, numbered 1–40), **9 file-bounds paths** (§2a) and **13 declared cross-edges** (§5c). Every one of those is a list a reader can count without trusting a number."* Counted:

```
⟨cmd⟩ /usr/bin/awk 'NR>=130 && NR<=141 && /^\| `\$V/' waves/F-W8.md                    | wc -l → 9   ✓
⟨cmd⟩ /usr/bin/awk 'NR>=163 && NR<=219 && /^\| \*\*(P|J|R|M|D)[0-9]/' waves/F-W8.md    | wc -l → 28  ✓
⟨cmd⟩ /usr/bin/awk 'NR>=230 && NR<=248 && /^\| \*\*G[0-9]+\*\*/' waves/F-W8.md         | wc -l → 16  ✓
⟨cmd⟩ /usr/bin/awk 'NR>=331 && NR<=372 && /^\| [0-9]+ \|/' waves/F-W8.md               | wc -l → 40  ✓
⟨cmd⟩ /usr/bin/awk 'NR>=265 && NR<=278 && /^\| /' waves/F-W8.md                        | wc -l → 14  ✗  (prose says 13)
```

§5c's table runs `:265`–`:278`: F.W0 · F.W1 · F.W2 · F.W5 · F.W6 · F.W7 · F.W9/W10 · the value.js API row · SS-4 · SS-13 · glass-ui BH relay · X·parse-that · the fourier tree · the execution gate = **fourteen**. R4-7.3 is unambiguous: *"where the prose and the list disagree, the **LIST** is authoritative and the prose is corrected."* Four of five figures survive their own instruction; the fifth is the shape R4-3.2 was written to end, surviving one sentence past the strike that produced it.

#### 5 · Verbatim-label drift in two of the seven §1 band negatives · **LOW**

All seven `sed -n 'Np'` pastes are **present on their cited lines** — re-run at the frozen corpus, every quoted span is found (`fr-App :144` · `fr-CollapsibleSection :131` · `fr-MobileFloatingToc :97` · `fr-MorphShapePreview :110` · `fr-PaperSearch :90` · `fr-PaperSearchDropdown :77` · `fr-PaperSearchInput :125`). Two carry form defects:

```
⟨cmd⟩ /usr/bin/sed -n '144p' "$R"/fr-App.md
  - **Nothing routes → F.W5–W8**: App's coupling budget is spent entirely on the CSS-token↔parser
    seam and the mount seam; the CRUD/provenance union has no edge in this component (C-12).
```
F-W8 quotes it as *"Nothing routes → F.W5–W8"* — **emphasis stripped inside a verbatim span**, while the sibling paste one clause later preserves it (*"**F.W5–W8 gets nothing**"* at fr-MobileFloatingToc `:97`, byte-true). This is PASS-3 D-4's convicted class inverted: round 3 convicted markup *added*, this is markup *removed*, and R4-7.1's rule covers both — *"nothing is added, nothing is re-styled."*

`fr-CollapsibleSection :131` is a mid-sentence subset (the bytes continue *", and that negative is recorded;"*) offered with no ellipsis. Same cure, lower stakes.

### RE-RUN AND REPRODUCING (21 of 26)

Stated because an attestation that hides its residue is the defect R4-1.9 struck — and because five rounds have now convicted this file for pasting a sweep it did not run.

| receipt | re-run result |
|---|---|
| `grep -nE -- '-P \|\\K\|\.\{[0-9]*,[0-9]*\}' waves/F-W8.md` (§0's R4-2 set-membership claim) | **exactly one line, `:29`, the minute itself** ✓ — the claim's whole design is that a violation surfaces as a *second line*, and there is none |
| `grep -o '§6b\|§6c' waves/F-W5.md` | no output ✓ |
| `grep -n '^## ' waves/F-W5.md` | all **seven** labels reproduce; the marked elision now reads `(the canonical F.W5 band: 28 ⊕ 90 = 118 record-side rows)` — **exactly the convergence the masthead predicted**, and the hash-pin idiom is what made it visible ✓ |
| `grep -o 'F\.W8' waves/F-W5.md` | returns the token ✓ (the R-5 reciprocal is landed) |
| `grep -nF 'fr-PaperSearchDropdown' "$C"` | `5034:- **fr-PaperSearchDropdown** (1): \`C:C-23\`` present; paste labelled *"among its rows"*, cut disclosed ✓ |
| `grep -n "^### G-1[123]" waves/F-W0.md` | `364/369/374` — all three heading lines, **heading markup as bytes**, third line disclosed not trimmed ✓ (round 3's D-3/D-4 cure holds) |
| `grep -n "The roster is" waves/F-W1.md` | the TWELVE-limb charter sentence, byte-identical ✓ |
| `grep -o 'One question of a PATH…never books' waves/F-W3.md` | §X.1-v4's criterion, byte-identical ✓ |
| `grep -oE '^## §[A-Za-z0-9]+' carry/F-W4-CARRY.md` | `§0 §Rows §Gates §Bounds §CrossEdges` ✓ — the narrowed probe returns exactly what is rendered (round 3's D-3 cure holds) |
| `grep -n '^### D · ' carry/F-W4-CARRY.md` | `172:### D · … (the transport cluster)` ✓ |
| `grep -cE "F\.W5[-–]W8" $R/fr-AdminUserList.md` · `sed -n '89p' … \| tail -c 120` | **1** ✓; *"**F.W5** — surface the cap in the shared contract; client-side chunk or block"* ✓ |
| `grep -nE "F\.W5[-–]W8" $R/fr-FourierShapeExtractor.md \| cut -d: -f1` | **22** lines, the exact list pasted at D2 ✓ |
| `sed -n '59p' $R/fr-EditorControlsDock.md \| grep -oE 'F\.W[0-9]+…'` | `F.W4` then `F.W5–W8` ✓ — row 17's sole-spelling homing stands |
| row 19's two `grep -oE` corpus probes | both return their pasted spans exactly ✓ |
| rows 37 · 38 · 39 · 40 `sed \| tail -c` pastes | all four are true substrings of their windows with cuts disclosed by ellipsis ✓; **row 39's and row 40's PURGE-SEAT byte-checks are confirmed** — the record carries no emphasis at either site ✓ |
| F-W5 clause anchors `E14` `F9` `D17` `B1` `B5` `C2` `D12` `G22` `§5 SS-L-07` `v1 §6` | **every one resolves at the settled bytes**, and D17's witness cell does carry *"**`fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12`** folds here — the FULL banked spelling"* ✓ |
| `grep -n 'HLG-23' $R/fr-HarmonicLevelGrid.md` | `:74`, the B5 strike stands ✓ |
| `grep -n 'PaperSidebar' waves/F-W8.md` | **1** ✓ — R-8's canonical form stated once |
| `grep -n 'raw-findings' waves/F-W8.md` | the erratum line alone ✓ — the set-membership form works |

▲ **`grep -n "M-10" waves/F-W5.md` (§0 ERRATUM 1) returns 19 lines and the paste discloses one** — the D12 clause row, which is the right one and is quoted byte-true. Not convicted: the cell states a homing, not a sweep. Recorded so pass 6 does not re-find it as new.

---

## §3 — AXIS 3: M-25 DEPTH (locks by banked id; aliases beside heads)

**Aliases beside heads — CLEAN where checked.** Every alias form this seat tested against the canonical's §1 alias column is faithful, and the head is the canonical head:

| F-W8 spelling | canonical §1 row |
|---|---|
| §6a 37 `fr-ContourSettings M-13 (= LC-missed-2)` | `\| \`M-13\` \| \`LC-missed-2\` \| \`F.W5–W8\` \| **F.W5-W8** \|` ✓ |
| §6a 38 `fr-ContourSettings M-10 (= L-M6 / C-19 / D-m9)` | `\| \`M-10\` \| \`L-M6\` · \`C-19\` · \`D-m9\` \| … \|` ✓ |
| §6a 19 `fr-EquationPanel D-10+D-L12+C-22` | `\| \`D-10\` \| \`D-L12\` · \`C-22\` \| \`F.W5-W8\` \| **F.W5-W8** \|` ✓ |
| §3 R3 `M-9 (BasisSelector) = L-M4 / C-20` | `\| \`M-9\` \| \`L-M4\` · \`C-20\` \| … \|` ✓ |
| §3 J3 `fr-CoefficientsSpectrum M-13 = that record's own C-7` | `\| \`M-13\` \| \`C-7\` \| … \|` ✓ |
| §3 J4 `m-7 (= C-6-as-rescoped)` | `\| \`m-7\` \| \`C-6-as-rescoped\` \| … \|` ✓ **alias right, record missing** (§1c) |

Anti-rename holds: no banked id is re-minted, shortened or silently merged — row 39 explicitly carries `L·M-4 / D-13 / C-8(a) + L·D-2 / C-12` under the record's full banked spelling rather than the bare `D-13` that hid it for two rounds.

**Locks by banked id — one merge defect.** §5b's eighteen locks are each keyed to something citable (`K-1` `K-3` `K9` `K12` `M-2` `M-CK` `MF-9` `BC-20` `D9` `X-9` `D-19` `FR-GV-24` `fr-FourierShapeExtractor C-3` `FR-GIG-5` and the four laws), and each is re-stated at the row that binds it. The exception:

▲ **`F-4 (= banked FR-AFP-4)` at §3 M4 collapses two distinct canonical band rows into one unqualified token · MEDIUM.**

```
⟨cmd⟩ /usr/bin/awk 'NR>=2848 && NR<2915' "$C" | /usr/bin/grep -E '^\| `F-4`'
  | `F-4` | `C-C-8` · `FR-AFP-4` · `R3-7b` | `F.W5-W8` | **F.W5-W8** |        (fr-GalleryDraftsSection)
⟨cmd⟩ /usr/bin/awk 'NR>=208 && NR<292' "$C" | /usr/bin/grep -E '^\| `FR-AFP-4`'
  | `FR-AFP-4` | — | `F.W5-W8` | **F.W5-W8** |                                (fr-AdminFlaggedPanel)
⟨cmd⟩ /usr/bin/grep -n 'fr-GalleryDraftsSection' waves/F-W5.md
  315:| **fr-GalleryDraftsSection** (2) | `F-4` → C1 · `m-15` → C2 |
```

The canonical carries **two** band rows here and F-W5 homes them at **two different clauses** (C1 and C2). M4 writes the pair as one identity with neither record named — R-5's exact prohibition, at a token the keystone had already separated. The same cell is where `m-15` enters bare (§1c's escape), so both halves of fr-GalleryDraftsSection's band pair are unqualified at the same site.

**Axis 3 verdict: substantially met — aliases clean, anti-rename clean, one identity merge.**

---

## §4 — AXIS 4: GATES

| sub-axis | result |
|---|---|
| **canonical operands only** | **PASS.** `⟨cmd⟩ /usr/bin/grep -c 'CENSUS-2026-08-03\|CENSUS-ADDENDUM' waves/F-W8.md` → **0**. The only census file named in this spec is `CENSUS-CANONICAL.md`. The nine surviving `census §…` citations (§4.9 ×3 · §3b · §3c · §5 risk 3 · risk 9 · ADDENDUM §6.7 · §4) are provenance for witnesses and artefact lists — none supplies an id, a roster or a denominator, and §2a explicitly refuses the intake census as authority (*"Bounds authority — the table above, and nothing behind it … the nine rows are **this spec's own tree-derived enumeration**"*). G15 is re-keyed on the canonical; the A-2 spelling census is demoted to a dated detector reading with its figures struck. |
| **reachable GREEN** | **PASS.** 16 gates, all born-RED, each with a named GREEN owner and none owned by nobody: G1 · G7 · G12 → owner/F.W5's ruling block (⊙, correctly unauthored); G3 · G14 · G15 → F.W8's own units c/e; G4 · G13 · G16 → split F.W5-or-F.W4 ∥ F.W8; the rest → the fourier or value.js API rows and F.W3/W4. No gate is discharged by an SS-13 probe (§5c states the bar); no seventeenth gate was minted for A-1/A-2 (L-19 honoured — both are absorbed as witness corrections). |
| **portable commands** | **PASS on the letter, one base defect.** No `-P`, no `-coP`, no `\K`, no lookaround, no bounded wildcard anywhere: the file's own set-membership probe returns exactly one line and this seat confirms no second. `R=` `C=` `V=` `F=` are declared **in-block beside first use** at the masthead, §1, §3, §4 and §6a — R4-2.3's cure landed and holds. The single failure is the masthead's `COHESION.md` operand (§2 item 3a). |

---

## §5 — AXIS 5: POSTURE

| requirement | measured |
|---|---|
| **F.W1 transaction whole** | ✓ §5c cites *"the **TWELVE-limb** roster chartered at F-W1 §4 (Sequencing), step 4"*, quotes the charter sentence byte-true, and restates nothing. The declared cycle (fr-AdminFlaggedPanel roster-wide ruling 5 vs the DAG) is raised for adjudication at the spine, not resolved here. |
| **W7 ∅ closed** | ✓ §5c's F.W7 row is `SIBLING — OWNER-GATED, no gating either way`; F.W8 designs no trie, carries the KISS default with the `atomdiff.py:12-14` guardrail quoted on both sides, and routes nothing to F.W7. Corroborated at the canonical: `F.W7` is named by no record (§4.1, re-run at §1a). |
| **SS-4 flags** | ✓ Owner rulings flagged inline per SS-4's charter; F.W8 surfaces **only** the two F.W5's block does not own — the fixture-direction law's exception set (FR-IC-6) and the G4-declines-TA-4 re-scope branch carrying A-1's third limb. Everything else routes to `OWNER-RULINGS-F.W5.md` and is consumed, never re-ruled. |
| **tree READ-ONLY** | ✓ Declared at §0 (with the measurement carve-out stated precisely — *inspection is permitted, dated and attributed, and produces no authorization; mutation waits*), §2b (whole-tree bar) and §5c (`READ-ONLY, ALWAYS`). Zero fourier bytes; the FN-6 ask travels as a letter; `union-walk.mjs` is **authored here, executed at F.W9/W10**. |
| **status planned** | ✓ `:52` `**Status**: **planned**.` |
| **zero VERIFIED** | ✓ Four-verb table: `VERIFIED \| **NO** \| — stamped only at X·F's release close`. |
| **RULINGS-4 applied** | ✓ Both directive items land. **R4-3.2**: `⟨cmd⟩ /usr/bin/grep -c '\*\*124\*\*\|\*\*84\*\*' waves/F-W8.md` → **1**, and that one is inside `:78`'s strike sentence (*"the figures **124** and **84** are **STRUCK**"*); the two `routedTotal`/`bookedCount` mentions are likewise inside dated strike minutes, preserved per E-3 rather than deleted. **R4-10 / R4-8.3**: the masthead paste is re-cut to labels-plus-marked-elision with `F-W5.md` hash-pinned at three successive readings — and the pin **earned itself**, since the elided parenthetical has now read `167`, `170` and `28 ⊕ 90 = 118` across three rounds while every clause anchor held. |

**Axis 5 verdict: CLEAN.** The posture is the strongest part of this file, and the R4-8.3 hash-pin is the round's genuine advance — it is the first mechanism in this programme that makes a sibling's drift *detectable rather than deceptive*, and this seat watched it work.

---

## §6 — CANONICAL SPOT-AUDIT (5 records against the frozen bytes; a canonical error files against the canonical)

| # | canonical row | frozen bytes | verdict |
|---|---|---|---|
| 1 | fr-CanvasControlsDock — **no `C-28` row** | `⟨cmd⟩ /usr/bin/grep -nE '^\| \*\*C-28' $R/fr-CanvasControlsDock.md` → no output; `C-28` appears only at `:102` (`Full-coverage note`, *"C-28 into D-4's F.W5–W8 rider"*) and `:150` (*"C-28 folds"*) | **CANONICAL CORRECT.** The omission is right: `C-28` is a fold on `D-4`, not a row. The error is F-W8's (§2 item 1). |
| 2 | `\| \`C:C-23\` \| \`C:C-24\` \| \`F.W5-W8\` \| **F.W5-W8** \|` at fr-PaperSearchDropdown | `⟨cmd⟩ /usr/bin/grep -n 'C:C-23' $R/fr-PaperSearchDropdown.md` → `77:- **C:C-23 / C:C-24 / L:§5 — INFO · FOLDS into banked fr-PaperSearch C-Z1/C-Z2.** … **F.W5-W8 = no rows.**` | **CANONICAL DEFECTIVE (LOW).** §0.1 rule 2 (*a row's ROUTING is the X-token(s) on its line*) read a **load-bearing negative** as a positive routing: the only `F.W5-W8` on `:77` is the record's own declaration that the band gets nothing. The row is also an `INFO` that FOLDS by reference. **F-W8's handling is exemplary** — it minutes the divergence three times (§1's bullet, §5c's F.W2 row, §6a's header), cites the id to F-W5 as the roster's holder, books nothing either way, and says in terms that *"a wave with zero record-side rows may not settle a record-side reading."* The repair belongs to the census and to F-W5. |
| 3 | `\| \`m-7\` \| \`C-6-as-rescoped\` \| \`F.W5–W8\` \| **F.W5-W8** \|` at fr-BasisSelector | `⟨cmd⟩ /usr/bin/sed -n '73p' … \| tail -c 150` → *"… Constructive cure: generate client bounds from the operation models (the R6-8 dual). → **F.W5–W8**."* | **CANONICAL CORRECT** — head, alias and home all re-derive. |
| 4 | `\| \`m-15\` \| \`r2-missed-3\` \| \`F.W5-W8\` \| **F.W5-W8** \|` at fr-GalleryDraftsSection | `⟨cmd⟩ /usr/bin/grep -n 'm-15' … ` → `80:- **m-15 = r2-missed-3 (re-proven) — MINOR.** … → F.W5-W8 (rides the image contract).` | **CANONICAL CORRECT** — and it is the id F-W8 escapes (§1c). |
| 5 | fr-ContourSettings `M-13` (`LC-missed-2`, F.W5-W8) and `M-10` (`L-M6·C-19·D-m9`, F.W3 + leg) | `⟨cmd⟩ /usr/bin/sed -n '70p' …` → *"… **→ F.W5–W8** (contour provenance/CRUD union …)"*; `⟨cmd⟩ /usr/bin/sed -n '67p' …` → *"… **→ F.W3/W4** (one typed vocabulary; the shared-enum contract itself is an **F.W5–W8 rider**)"* | **CANONICAL CORRECT** — including the leg/host distinction, which is exactly the axis §6a blurs. |

**Spot-audit result: 4 of 5 clean; 1 canonical defect (row 2), filed against the canonical, already minuted by the spec.**

---

## §7 — DEFECT REGISTER

| # | severity | claim | receipt |
|---|---|---|---|
| **D5-1** | **HIGH** | §6a row 40 rows `fr-CanvasControlsDock C-28` as a band identity; the canonical carries no such row and the frozen record carries no such head — it is a prose fold **into `D-4`**, which §3 P7 already books. G15's LHS therefore holds a member its canonical RHS cannot contain: a non-empty difference at authoring, i.e. the wave's own HALT condition, third round running | `/usr/bin/awk 'NR>=806 && NR<876' "$C" \| /usr/bin/grep -c 'C-28'` → **0**; `/usr/bin/grep -n 'C-28' "$C"` → the only `C-28` row is `:455` fr-AnimationControls, homed **GLASS-RELAY**; `/usr/bin/grep -nE '^\| \*\*C-28' $R/fr-CanvasControlsDock.md` → ∅, exit 1 |
| **D5-2** | **HIGH** | G15's *"the same probe returns `L:L-5` a second time … at `fr-PaperSearchDropdown`"* is unproducible by the command printed beside it; the second `L:L-5` is on an `fr-PaperSearchDropdown` line the fixed-string filter excludes by construction. Fact true, receipt dead, inside a gate cell | `/usr/bin/grep -nF 'fr-ContourPreview** (1): ' "$C"` → 3 lines (`4996`·`5044`·`5309`), `\| grep -c 'L:L-5'` → **1**; the true probe `/usr/bin/grep -nF 'L:L-5' "$C"` → `4920` + `4996` |
| **D5-3** | **MEDIUM-HIGH** | §1's replacement-for-the-arithmetic sentence — the one R4-3.2 required to be countable — mis-states §5c as **13** cross-edges against **14** enumerated rows | `/usr/bin/awk 'NR>=265 && NR<=278 && /^\| /' waves/F-W8.md \| wc -l` → **14** (F.W0·F.W1·F.W2·F.W5·F.W6·F.W7·F.W9/W10·value.js API·SS-4·SS-13·BH relay·X·parse-that·fourier tree·execution gate); the other four figures (9·28·16·40) all check |
| **D5-4** | **MEDIUM-HIGH** | The masthead's first receipt fails three ways: the operand does not resolve at the file's own base; the probe returns seven lines and two are disclosed with no residue statement; and the *verbatim*-labelled cell is truncated mid-row with no ellipsis | base: `cd …/fourier && /usr/bin/grep -n 'SS-4' COHESION.md` → `No such file or directory`; residue: from `…/X`, `\| cut -d: -f1` → `36 57 69 135 146 147 165`; truncation: `/usr/bin/sed -n '36p' COHESION.md` continues *"· owner rulings owed (trie-vs-KISS et al.)"* plus four further cells |
| **D5-5** | **MEDIUM** | The file's only coverage proof over the 90-row band roster is a bare-token `grep -qF` sweep — the instrument R-5 forbids as an identity test and this file convicts five times. Re-run record-qualified, **two of ninety are unidentifiable here**, and one of those is a true escape | sweep reproduces **90/90** with `/usr/bin/grep -qF`; **40/90** are corpus-ambiguous; of those, `fr-BasisSelector m-7` and `fr-GalleryDraftsSection m-15` have **zero** same-line record qualification anywhere in the file. `m-15` is in no §3 cell and no §6a row → **ESCAPED** |
| **D5-6** | **MEDIUM** | §6a assigns an **F-W5 clause** as "STATING home" to fifteen rows the canonical homes at **F.W3/F.W4** with a band leg, where R4-6 puts a leg at the holder of the host id and R4-10 requires citing the holder **by name**. Disclosed by §6a's two-axis caveat, undischarged as a duty | the 40 joined against §2 `F.W5` ⊎ `F.W5-W8` (118): **17 outside**; canonical §1 shows 16 as `<sub>legs: F.W5-W8</sub>` under home **F.W4**/**F.W3** (e.g. `\| \`AA-10\` \| … \| **F.W4** <sub>legs: F.W5-W8</sub> \|`); only row 17 cites F.W4 |
| **D5-7** | **MEDIUM** | `m-7` is BOOKED bare at §3 J4 and re-cited bare at G4, §5b and §6, in a file that books a different `C-6` at §3 P7; neither `m-7` nor `m-15` is on §5b's declared collider roster, which was built only from tokens that had already failed | `/usr/bin/grep -n 'm-7' waves/F-W8.md` → `:185 :187×2 :235 :259 :302`, none carrying `BasisSelector`; `m-7` is held by **7** records in §2 and **17** files in the frozen corpus; §5b's roster lists `B-1 B-2 C-2 C-3 C-4 C-17 C-18 D-13 L-B1 L-M3 M-10 M-13` |
| **D5-8** | **MEDIUM** | §3 M4's `F-4 (= banked FR-AFP-4)` collapses two distinct canonical band rows — fr-GalleryDraftsSection `F-4` and fr-AdminFlaggedPanel `FR-AFP-4` — into one token with neither record named, where F-W5 already homes them at two different clauses | canonical: `\| \`F-4\` \| \`C-C-8\`·\`FR-AFP-4\`·\`R3-7b\` \| … \|` and `\| \`FR-AFP-4\` \| — \| … \|`; `/usr/bin/grep -n 'fr-GalleryDraftsSection' waves/F-W5.md` → `315:\| **fr-GalleryDraftsSection** (2) \| \`F-4\` → C1 · \`m-15\` → C2 \|` |
| **D5-9** | **LOW** | §1's fr-App band-negative strips the record's emphasis inside a span labelled verbatim (PASS-3 D-4's class, inverted); the fr-CollapsibleSection paste is a mid-sentence subset with no ellipsis | `/usr/bin/sed -n '144p' $R/fr-App.md` → `- **Nothing routes → F.W5–W8**:` vs the spec's *"Nothing routes → F.W5–W8"*; the sibling `fr-MobileFloatingToc :97` paste preserves its `**` correctly |
| **D5-10** | **LOW** *(against the CANONICAL)* | The canonical band-homes `fr-PaperSearchDropdown C:C-23` off a line whose own sentence is *"**F.W5-W8 = no rows.**"* — §0.1 rule 2 read a load-bearing negative as a positive routing, on an `INFO` row that FOLDS by reference | `/usr/bin/grep -n 'C:C-23' $R/fr-PaperSearchDropdown.md` → `:77` as quoted; canonical `:4007` `\| \`C:C-23\` \| \`C:C-24\` \| \`F.W5-W8\` \| **F.W5-W8** \|`. **Not a spec defect** — F-W8 minutes it three times and refuses to resolve it, which is the correct posture for a wave with zero record-side rows |

---

## §8 — VERDICT

**DEFECTIVE.**

Two convictions, and neither is bookkeeping. **D5-1** puts an identity in G15's operand that the census of record does not contain — the same structural failure round 2 (homonym), round 3 (mis-attached row identity) and now round 4 (a prose fold promoted to a row) have each produced in a new costume, and the pattern is now legible: *this table keeps being re-derived from the corpus when its RHS is the canonical.* R4-10 said so in one sentence — *"No wave derives, samples, or re-cuts a roster from any other source"* — and §6a's own closing words, *"band-routed identity **by its own cited bytes**"*, are the admission that it still does. **D5-2** is a dead receipt in a gate cell, in a file whose masthead spends four paragraphs on why a receipt that cannot be re-run is not a receipt.

What must be said with equal force: **this is a strong spec, and its round-4 work was real.** The census freeze landed — every canonical quotation reproduces byte-for-byte, `84`/`124` are struck with no figure re-computed under a new name, the arithmetic is replaced by countable lists, R4-2.3's in-block declarations are everywhere they need to be, the portable-command law holds without exception, the posture is clean on all six sub-axes, and the R4-8.3 hash pin caught a live sibling rewrite mid-sitting and made it *visible* — the first time this programme has had mechanical proof of staleness rather than suspicion of it. Twenty-one of twenty-six re-run receipts reproduce exactly, including every one that crosses into `F-W5.md`, `F-W0.md`, `F-W1.md`, `F-W3.md` and the carry.

The residue is small, sharp and cheap to cure: **strike one fabricated row, split one probe into two, correct one count word from 13 to 14, root and disclose one masthead command, and record-qualify two tokens.** None of it touches a finding; all of it touches the machinery that warrants findings — which is the only thing this loop has ever been measuring.

**Standing recommendation to the pass-5 union seat**: CLOSE-CERT-2's F-W8 row must be errata'd (`0 convictions` → 2), and the next round's per-wave sweep should test §6a's forty against the canonical §2 rosters *mechanically*, in both directions, before any seat reads the closure stamp — the join is twelve lines of `awk` and it finds in one run what five prose passes did not.

*— FRESH ADVERSARIAL SPEC CHECK, X·F pass 5, F-W8, 2026-08-29. Every figure above was produced by a command this seat ran on the pinned BSD toolchain this session; none is inherited, and none was authored by a seat that also wrote the bytes it convicts.*

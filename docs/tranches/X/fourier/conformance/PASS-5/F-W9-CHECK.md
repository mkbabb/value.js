# X·F CONFORMANCE PASS 5 — F-W9 ADVERSARIAL SPEC CHECK (L-18 / L-20, fresh seat)

**Seat**: fresh pass-5 adversary, 2026-08-29. **Subject**: `docs/tranches/X/fourier/waves/F-W9.md`
(548 lines). **Census operand**: `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` §2's
`### F.W9 — **17 rows**`, sha256-at-check-time **`a450b8e9f80e`** — identical to the spec's own PIN
TABLE row, so the roster axis is mechanical. **Rulings consumed**: `PASS-4/RULINGS-4.md` (R4-1 ..
R4-10). **Cert consumed**: `PASS-4/CLOSE-CERT-2.md`. **Toolchain**: `bash` + BSD
`/usr/bin/grep` (`grep (BSD grep, GNU compatible) 2.6.0-FreeBSD`), `/usr/bin/sed`, `awk`,
`shasum -a 256` — the interactive shell aliases `grep` to `ugrep`, so **every receipt below was
run against the explicit `/usr/bin/grep` binary**, which is the binary R4-2 pins.

**Bases assigned in this block; every ⟨cmd⟩ in this file runs from the value.js repo root unless
its own row states otherwise:**

```
X=docs/tranches/X/fourier
V=docs/tranches/V/megatranche
R="$V/registry/adjudicated"
M="$V/formation/fourier"
C="$X/conformance/CENSUS-CANONICAL.md"
W="$X/waves/F-W9.md"
```

**Verdict: DEFECTIVE.** Roster axis CLEAN (17/17, zero escapes, zero fabrications). Receipt
reality convicts on **four** of ~62 re-run samples, and all four are the same family — a
certification published over a probe that no longer expresses, or never expressed, its own
subject. Two more axes carry count-word and base-portability defects that RULINGS-4 named by
number and the round-4 repair did not land.

---

## §0 SCOREBOARD

| axis | verdict | note |
|---|---|---|
| **(1) roster booked/cited complete** | **CLEAN** | 17 canonical ids · **17 BOOKED** at §2.0 · 0 cited-away · **0 escapes** · **0 fabrications**. Ten band-leg ids the canonical homes elsewhere are cited to holders at §2.0a; five entrants cited to packets at §2.0b. |
| **(2) receipt reality** | **DEFECTIVE** | ~62 ⟨cmd⟩ re-run on the pinned BSD binary. **58 reproduce byte-for-byte** — including all eleven §2.8a labelled spans with their three published FAILs. **4 do not**: D-1, D-2 below. `-P`-free confirmed; the one bounded wildcard is `.{0,18}` ×4, far inside the BSD 255. |
| **(3) M-25 depth (locks by banked id · aliases beside heads)** | **DEFECTIVE** | §2.0's alias column matches the canonical at **all 17** rows (verified record by record). But row numbers `38` / `27` stand as identities in the wave's OWN voice at **five seat-local sites**, two of them ordering LOCKS (§4a-4, §4a-8) — D-6. |
| **(4) gates: canonical operands · reachable GREEN · portable commands** | **DEFECTIVE** | Operands clean (`$C` only; no check file, no superseded census in any gate cell). 23 gates, all born-RED, each naming a live witness. **Commands are not portable from the declared cwd** — D-4. G-F9-21's GREEN condition disagrees with itself by one obligation — D-3. |
| **(5) posture** | **CLEAN** | `status: planned` ×1 + close-act `Until then: **planned**`; four-verb `IMPLEMENTED **NO** · VERIFIED **NO**`; `VERIFIED` = **10 occurrences, 2 USES** (four-verb row + "VERIFIED is F.W10's close to stamp"), 8 mentions — **zero stamp**. `F.W7` → **0 occurrences** (∅ posture whole). F.W1 cited as ONE atomic TWELVE-limb transaction, never restated. SS-4 owner rulings flagged inline ×7. Registry READ-ONLY declared; fourier writes "asked, never made" ×3. `EXECUTION IS NOT AUTHORIZED BY THIS FILE` present. |
| **canonical spot-audit (5 records)** | **CLEAN ×5, 1 query** | 5 of 5 reproduce at the registry bytes; a sixth reading is queried against the canonical, not the spec — D-10. |

**Counts**: rosterSize **17** · booked **17** · cited **0** · escaped **0** · fabrications **0**.

---

## §1 AXIS 1 — THE ROSTER, MECHANICALLY

The census law makes this axis arithmetic. The canonical block, re-run:

```
$ shasum -a 256 "$C" | cut -c1-12
a450b8e9f80e                                   ← identical to the spec's PIN TABLE row

$ /usr/bin/grep -o '^### F\.W9 — \*\*17 rows\*\*' "$C"
### F.W9 — **17 rows**

$ awk '/^### F\.W9 — /,/^### GLASS-RELAY/' "$C" | /usr/bin/grep -c '^- \*\*fr-'
15

$ awk '/^### F\.W9 — /,/^### GLASS-RELAY/' "$C" | /usr/bin/grep -o '`[^`]*`' | wc -l
      17
```

All three of §2.0's published receipts reproduce. The 17 ids, and their disposition in the spec:

| # | record | canonical id · aliases | §2.0 row | verdict |
|---|---|---|---|---|
| 1 | fr-AdminAuditLog | `AA-44` | BOOKED | ✓ |
| 2 | fr-AdminFlaggedPanel | `FR-AFP-49` · `D-21` · `L-26` | BOOKED | ✓ |
| 3 | fr-App | `C-13` | BOOKED (pair-qualified, 9-row homonym) | ✓ |
| 4 | fr-ContourPreview | `C:D-11` · `L:L-12` | BOOKED | ✓ |
| 5 | fr-EquationModeToggle | `FR-EMT-11` · `C-16` | BOOKED | ✓ |
| 6 | fr-EquationResult | `FR-EQR-31` · `L-i3` · `C-14` · `D-20` | BOOKED | ✓ |
| 7 | fr-FunctionInput | `C-13` · `D-24` | BOOKED (pair-qualified) | ✓ |
| 8 | fr-GalleryAdminBanner | `GAB-10` · `D-M9` · `C-16` | BOOKED | ✓ |
| 9 | fr-GalleryCardModal | `GCM-42` · `L-14` | BOOKED | ✓ |
| 10 | fr-GallerySearchBar | `FR-GSB-17` · `L-11` · `C-7` | BOOKED | ✓ |
| 11 | fr-GalleryView | `FR-GV-36` · `L-24` · `GAB-10` · `GCM-42` | BOOKED | ✓ |
| 12 | fr-ImageUpload | `L:L-i2` | BOOKED | ✓ |
| 13 | fr-PaperArticleWindow | `PAW-34` · `C-i-5` | BOOKED | ✓ |
| 14 | fr-PaperArticleWindow | `R2-7` | BOOKED (new at round 4) | ✓ *(canonical query — D-10)* |
| 15 | fr-PaperArticleWindow | `PAW-50` | BOOKED WHOLE (⟨re-cut⟩ struck) | ✓ |
| 16 | fr-PaperView | `D/i-1` | BOOKED | ✓ |
| 17 | fr-UserSlugBar | `FR-USB-16` · `r1-MISSED-5` | BOOKED | ✓ |

**Alias fidelity, record by record (⟨cmd⟩ `awk` slice of `$C` §1 per record, `/usr/bin/grep -E 'F\.W9'`)** —
every alias set in §2.0 is the canonical's alias set, in the canonical's order, with the head left
and the aliases beside it. No head is re-spelled, no alias is promoted, no id is renamed.

**Fabrication check.** §2.2's 26-identity table enumerates 22 rows carrying 26 identities (four
rows carry two: `fr-AdminFlaggedPanel:95/:110`, `fr-EquationResult:41/:72`,
`fr-EquationView:62/:191`, `fr-PaperArticleWindow:58/:90`). Subtracting the ten ids §2.0a cites to
holders (`FR-AFP-42` · `FR-EQR-6` · `D·D-B2` · `C·D-28` · `PAW-12` · `PAW-49` · `D-B2` · `C-M4` ·
`M7` · `FR-TT-1`) leaves **16**, which is the canonical 17 less `R2-7` — the id §2.0 row 14 books
new. The partition closes: **no id is booked that the canonical does not home here.**

**Escape check.** Every canonical id appears in the booked column. `escaped = 0`.

**Citation form.** §2.0a's ten rows use R4-10's citation idiom (*held at* ⟨wave⟩) with the home
verified by ⟨cmd⟩ per row; §2.0b's five entrants cite packet homes (`NWO→SS-3` ×2 · `SS-3` ·
`UNROUTED` · `F.W1`). The three struck ⟨re-cut⟩ labels (PAW-49 → F.W0 · PAW-50's decision → F.W4 ·
FR-TT-1 → F.W10) are correctly struck seat-locally and correctly disclosed as **P-8** where they
survive inside the paired bytes. **This axis is CLEAN and R4-3.1 / R4-10 are applied whole.**

---

## §2 AXIS 2 — RECEIPT REALITY (~62 SAMPLES, BSD TOOLCHAIN)

### §2a WHAT REPRODUCES (58 of 62 — recorded so the failures are not read as a pattern)

**Canonical homonym probes**, all on `/usr/bin/grep`:

```
$ /usr/bin/grep -cE '^\| .C-13. ' "$C"        → 9      (§2.0 row 3 claims 9)         ✓
$ /usr/bin/grep -cE '^\| .R2-7. ' "$C"        → 2      (§2.0 row 14 claims 2)        ✓
$ /usr/bin/grep -c  'C·D-28'      "$C"        → 0      (§2.0a / §5 claim 0)          ✓
$ /usr/bin/grep -cE '^\| .D-B2. ' "$C"        → 3      (§2.0a claims 3)              ✓
$ /usr/bin/grep -cE '^\| .C-M4. ' "$C"        → 2      (§2.0a claims 2)              ✓
$ /usr/bin/grep -cE '^\| .M7. '   "$C"        → 2      (§2.0a claims 2)              ✓
```

**Self-probes and portability certificates**:

```
$ /usr/bin/grep -o 'CENSUS-[A-Za-z0-9-]*\.md' "$W" | sort -u
CENSUS-2026-08-03.md / CENSUS-ADDENDUM-2026-08-25.md / CENSUS-CANONICAL.md   → three names ✓
$ /usr/bin/grep -o '4\.5' "$M/CENSUS-2026-08-03.md"    → ∅, exit 1                   ✓
$ /usr/bin/grep -Ec '^\| \*\*P-[0-9]+\*\* \|' "$W"     → 9                           ✓
$ /usr/bin/grep -Ec '^\| \*\*P-[0-9]+\*\* \|.*OUTSTANDING' "$W" → 8                  ✓
$ /usr/bin/grep -nE 'grep -[a-z]*P |\\[K]|\(\?[=!]' "$W" → ∅, exit 1                 ✓
$ /usr/bin/grep -on '\.{0,[0-9]*}' "$W"  → 3:.{0,18} 297:.{0,18} 325:.{0,18} 496:.{0,18}  ✓
$ /usr/bin/grep -n 'the CARR[Y]' "$W"    → 3 · 282 · 290 · 294 · 512 — masthead, errata ×3, §5 ✓
```

**Frozen-corpus counts (RE-CUT-0)** — the only counts this file banks, and all four hold:

```
$ cd "$R"; /usr/bin/grep -o 'F\.W9/W10' fr-*.md | wc -l   → 54   ✓
$ /usr/bin/grep -l 'F\.W9/W10' fr-*.md | wc -l            → 25   ✓
$ /usr/bin/grep -o '[^9/]F\.W10' fr-*.md | wc -l          → 0    ✓  (bare F.W10 routing)
$ ls fr-*.md | wc -l                                      → 66   ✓
```

**The eleven §2.8a labelled spans, re-run whole — the transcript reproduces EXACTLY, pass and fail
alike.** This is the strongest evidence the round-4 seat produced and it survives a hostile re-run:

| # | span | published | this seat |
|---|---|---|---|
| 1 | `coverage rides the B-1/B-2 cure wave.` @ `$R/fr-PaperView.md` | 1 ✓ | **1** ✓ |
| 2 | `BLOCKER at any F.W9/W10 axe close-gate.` @ `$R/fr-Tooltip.md` | 1 ✓ | **1** ✓ |
| 3 | `L-4's table is the citable one (…= 17)` @ `$R/fr-Tooltip.md` | 1 ✓ | **1** ✓ |
| 4 | `the only e2e "Fullscreen" hit is a comment` @ `$R/fr-FullscreenViewer.md` | 1 ✓ | **1** ✓ |
| 5 | `extend one axe keystone into the admin tab + a vitest devDependency` @ `$R/fr-AdminUserList.md` | 1 ✓ | **1** ✓ |
| 6 | `The visual-regression checkpoint set the uplift mints with no typecheck signal` @ `$X/carry/F-W1-CARRY.md` | 1 ✓ | **1** ✓ |
| 7 | `harness before rider, flag before split (PAW-49/PAW-50)` @ `$X/carry/F-W4-CARRY.md` | 1 ✓ | **1** ✓ |
| 8 | `…ride their own waves.` (with period) @ `$R/fr-EquationModeToggle.md` | **0 FAIL** | **0** ✓ |
| 8′ | same without the period | 1 | **1** ✓; `grep -oF 'ride their own waves).'` → `ride their own waves).` ✓ |
| 9 | `this one spec would have caught B-1, …` @ `$R/fr-EquationView.md` | **0 FAIL** | **0** ✓ |
| 9′ | the record's own span | 1 | **1** ✓ |
| 10 | `Producer corroboration at 8.0.0 (`` `:69-73` ``)` @ `$R/fr-Tooltip.md` | 1 ✓ | **1** ✓ |
| 10′ | `Producer corroboration glass-ui 8.0.0:69-73` | **0 FAIL** | **0** ✓ |

**Structural receipts against the twin**, re-run this seat, read-only:

```
$ cd "$X/waves"
$ diff <(awk '/^\| record \| identity/,/^\*\*By-mechanism entrants/' F-W9.md) \
       <(awk '/^\| record \| identity/,/^\*\*By-mechanism entrants/' F-W10.md)      → EMPTY ✓
$ diff <(awk '/^\*\*THE F.W1 VISUAL-REGRESSION/,/^\*\*Born-RED witness/' F-W9.md) \
       <(awk '/^\*\*THE F.W1 VISUAL-REGRESSION/,/^\*\*Born-RED witness/' F-W10.md)  → EMPTY ✓
$ diff <(/usr/bin/grep -h '^\*Heading mirrored' F-W9.md) \
       <(/usr/bin/grep -h '^\*Heading mirrored' F-W10.md)                            → DIFFER ✓
$ /usr/bin/grep -o 'RECEIVED HERE BY SPLICE' F-W10.md  → RECEIVED HERE BY SPLICE     ✓
```

**All thirteen F-W0 quotations, all four F-W1 quotations, and the F-W4 cross-edge quotation
reproduce**, re-run against bytes that have MOVED since the pin (see D-11) — the G-9 heading, the
runner-seat clause, both mirror-clause spans, the Disjointness paragraph, G-11's and G-12's
publication clauses, the 8-`e2e` row, §1d item 2, the 21-cartoon-card shim, the
`text-admin-label` 7/4 row, the SUBSTRATE-LEDGER create row, §6b's `F.W9 / F.W10` cross-edge row,
the `RETRACTED at the fold seat` absence (exit 1), `The roster is TWELVE limbs and stays twelve`,
Cross-edges item 9, the checkpoint-homing row, and F-W4 §5.2's `→ F.W9/W10` row.

**§-existence sweep** (the file's own standing probe law, applied to it): `F-W0 §6b` EXISTS
(heading `### 6b.` at `F-W0.md:433`); `F-W0 §1d` EXISTS (`### 1d.` at `:75`); `F-W3 §X.1-v4`
EXISTS; `$C §2 PER-WAVE ROSTERS` EXISTS (`:4746`); `F-W1 §4 Intra-wave order (binding)` resolves
(`grep -c` → 1). **No phantom anchor found this round.**

### §2b WHAT DOES NOT REPRODUCE — the four convictions

See **D-1** and **D-2** in §6. Both are the same class the last three rounds convicted: a
certification published over a probe that does not express its subject, and — new this round — a
certification whose subject the *certifying round itself minted* between the probe and the paste.

---

## §3 AXIS 3 — M-25 DEPTH

**Aliases beside heads: CLEAN.** Verified per record against `$C` §1 (receipts in §1 above). No
alias is a standalone identity anywhere in §2.0; the homonym classes are pair-qualified where the
canonical carries a class (`C-13` ×9, `R2-7` ×2, `D-B2` ×3, `C-M4` ×2, `M7` ×2), and each
qualification's ⟨cmd⟩ reproduces.

**Locks by banked id: DEFECTIVE.** §4a-4 (HARNESS-BEFORE-RIDER) keys its governed set on
`ContourPreview 38`; §4a-8 (MATRIX-BEFORE-COARSE) keys its coarse-pointer witness on
`ImageUpload 27's drag path`. Both are row NUMBERS, not banked ids — the precise defect §2.0
rows 4/12 restore and P-6/P-7 disclose. Full site list at **D-6**. A lock keyed on a row number is
a lock that survives no re-numbering of the record, which is what §0.1 rule 1 exists to prevent.

**Dissent, folds, sequencing carried:** FR-AFP-49's blocker-weight dissent, reader-2's FR-EMT-11
MAJOR + the L-9.1 ruling, DU's GCM-4 BLOCKER, LC's PAW MINOR, r2's FR-USB-16 MINOR-overruled, and
worker-DU's GAB-13 dissent are all present and quoted by ⟨cmd⟩ in §2.8a section A — all reproduce.
Folds cite rather than mint (GAB-10 → AA-44; GCM-42 → AA-44/FR-AUL-16; FunctionInput C-13 →
fr-CollapsibleSection m-8). **No id is re-booked and none is renamed.**

---

## §4 AXIS 4 — GATES

**Operands: CLEAN.** 23 gates (`G-F9-1` .. `G-F9-23`, distinct count 23, all born-RED with a named
live witness). `conformance/PASS-1/F-W9-CHECK.md` appears at exactly four sites — the masthead
(named a PRIOR RUN), the §2.2 R-2b provenance note (which cites `PASS-1/RULINGS.md`, a different
file), §2.8 E-11(a), and §5's exclusion row. **It appears in no gate cell and in no denominator.**
G-F9-21's census operand is `$C` §2's 17, cited with the sha; `54 / 25 / 66` is disclaimed as a
band-token measurement on the gate's own face and at §2.1. No superseded census is a denominator
anywhere; `CENSUS-2026-08-03.md` is used only as a **decision clause** (`a unit-test floor (vitest)
decision`, reproduces) and as an **absence probe** (`4.5` → ∅ exit 1, reproduces), both of which
R4-3 permits by its own terms.

**Reachable GREEN: DEFECTIVE by one obligation.** G-F9-21's GREEN requires "every one of the
canonical's 17 F.W9 ids booked … or cited" (satisfied) **and** the paired obligations closed. The
face's census ⟨cmd⟩ returns **8 OUTSTANDING**; the face's own closing prose requires **seven**;
§4a-17's enumeration names **seven** and omits **P-9** entirely. A gate whose GREEN condition
names one fewer obligation than its own census is indeterminate at the boundary — **D-3**.

**Portable commands: DEFECTIVE.** `-P`-free and lookaround-free confirmed by re-run; the single
bounded wildcard is `.{0,18}` (×4), inside the BSD 255. **But 44 inline ⟨cmd⟩s do not resolve from
the cwd §2.0 declares** — **D-4**. R4-2.5 makes this convictable on sight, "no charitable reading".

**Oracle discipline: CLEAN.** No gate re-derives a G-11/G-12 figure; §2.8's DENOMINATOR PROVENANCE
classifies every figure the spec states and routes the four unpublished banked figures to G-12 for
adoption. G-F9-3's falsifier explicitly forbids authoring a rival oracle (KF.W4(d)).

---

## §5 AXIS 5 — POSTURE

| clause | probe | result |
|---|---|---|
| **F.W1 transaction whole** | `grep -o 'The roster is [*]*[A-Z]* limbs and stays [a-z]*' "$X/waves/F-W1.md"` | `The roster is TWELVE limbs and stays twelve` — cited whole at §4a-3 / §4b, **restated nowhere** (R-4b honoured) ✓ |
| **W7 ∅ closed** | `grep -on 'F\.W7' "$W"` | **∅ — zero occurrences.** Nothing routes to F.W7 and the spec does not claim one ✓ |
| **SS-4 flags** | §4b F.W5–W8 row | seven owner rulings FLAGGED INLINE, never presumed (trie-vs-KISS · remix-vs-fork · born-visibility · visibility-enum · version-`_id` · redaction parity · pagination idiom); inv-28 declared a DEPLOY gate, "never … an API-shape gate" ✓ |
| **tree READ-ONLY** | §1b write-seat declaration · §1c · §5 | "fourier-tree writes **asked, never made**" ×3; `the registry is READ-ONLY` ×1; `scripts/dev/dev.sh` named NEVER; F-W10 not authored ✓ |
| **status planned** | `grep -c 'status: planned'` → 1; close act | `Until then: **planned**, born-RED` ✓ · `EXECUTION IS NOT AUTHORIZED BY THIS FILE` ✓ |
| **zero VERIFIED** | `grep -on 'VERIFIED' "$W"` | 10 occurrences: **2 USES** (four-verb `VERIFIED **NO**`; close act "VERIFIED is F.W10's close to stamp"), 8 MENTIONS in the E-10(g)/§2.8a retirement cells. **No stamp** ✓ |
| **RULINGS-4 applied** | per-directive | R4-3.1 ✓ · R4-10 ✓ · R4-1.11 ✓ · R4-7.1 ✓ (S2 subset re-label lands, span 9′ reproduces) · R4-7.2 ✓ (list installed) · R4-8.3 ✓ (PIN TABLE) · **R4-2 PARTIAL — D-4** · **R4-7.3 NOT LANDED — D-3, D-5, D-8** |

---

## §6 DEFECTS — twenty slots, ten filed, worst first

### D-1 · HIGH — E-10(a)'s residue probe returns a live line-cite; the masthead's absolute is falsified by round 4's own bytes

§2.8 **E-10(a)** publishes the stem-alternation probe with the output *"**exactly two distinct
forms, `PROGRESS.md:15` and `lane-frontend.md:568`**"*, then the residue probe with *"**∅ (exit
1)**"*, and then the load-bearing conditional: *"**only after that ∅ is the masthead's absolute
re-stated** — now in its true scope: *no line number into a live sibling survives in this spec's
own voice*."* **E-11(b)** re-certifies the same class as *"**∅ unlicensed**"*.

Re-run, cwd `$X/waves`, BSD binary:

```
$ /usr/bin/grep -oE '(F-W[0-9]+(-CARRY)?|KF-W[0-9]+|COHESION|lane-(docs|frontend|crud)|CENSUS[A-Za-z0-9-]*|INTAKE[A-Za-z0-9-]*|J-diff-shape|PROGRESS)(\.md)? ?:[0-9]+' F-W9.md | sort -u
F-W1.md:272
PROGRESS.md:15
lane-frontend.md:568                                    ← THREE forms, not two

$ … | sort -u | /usr/bin/grep -v -e 'lane-frontend\.md:568' -e 'PROGRESS\.md:15'
F-W1.md:272
$ echo $?
0                                                       ← exit 0, not the published exit 1
```

`F-W1.md:272` is a **live line number into a LIVE sibling, in this spec's own voice**, at two
sites — **`F-W9.md:297`** (§2.8 E-11(f): *"while `F-W1.md:272` reads `**Intra-wave order
(binding):**`"*) and **`F-W9.md:460`** (P-9's cell on G-F9-21's face). **Both were minted by round
4's own repair**, in the two cells that announce the anchor cure, and the residue probe was pasted
un-re-run afterwards. `F-W1.md` has since moved (D-11) and `:272` happens to still resolve — luck,
not method, and precisely the coordinate-over-a-live-sibling class E-8 law (ii) and R3-3.10 bank
against. This is the fifth consecutive round in which a certification of a CLASS is published over
an enumeration short by one, and the first in which the certifying round supplied the counter-
example itself.

### D-2 · HIGH — the F-W3 set-membership receipt does not reproduce at the hash it pins

§4b's F.W3 row states the load-bearing negative *"F-W3 still carries no F.W9 cross-edge"* over:

> ⟨cmd⟩ `grep -oE 'F\.W9(/(F\.)?W10)?' waves/F-W3.md | sort -u` → **one distinct form, `F.W9/W10`**
> (set-membership, never a count of a live sibling — R3-3.10)

Re-run, cwd `$X`, BSD binary:

```
$ shasum -a 256 waves/F-W3.md | cut -c1-12
a89c3386f3f8                              ← IDENTICAL to the spec's PIN TABLE row for F-W3.md

$ /usr/bin/grep -oE 'F\.W9(/(F\.)?W10)?' waves/F-W3.md | sort -u
F.W9
F.W9/W10                                  ← TWO distinct forms
```

The sibling has **not moved**: the hash matches the pin exactly, so R4-8.3's mechanism proves the
receipt was false **at the bytes it pinned**, not stale by drift. The second form lives at
`F-W3.md:783` inside a round-4 R4-10 clause (*"`F.W0`'s 56, `F.W1`'s 362, … and `F.W9`'s 17 are
held at their own specs"*). On inspection the CONCLUSION survives — that occurrence is a
census-roster mention, not a cross-edge, so F.W3's reciprocal is still genuinely owed — but the
published receipt is not the output of the published command, which R4-1's opening law
("a receipt may only be published beside the command that produced it") forbids outright.

### D-3 · HIGH — R4-7.3's count-word law is unlanded on G-F9-21's own face; three prose numbers, three values, none equal to the census ⟨cmd⟩

R4-7.2 ordered G-F9-21's face converted from a prose count to a labelled enumeration with its own
census command. The enumeration landed and its command reproduces:

```
$ /usr/bin/grep -Ec '^\| \*\*P-[0-9]+\*\* \|' "$W"                     → 9
$ /usr/bin/grep -Ec '^\| \*\*P-[0-9]+\*\* \|.*OUTSTANDING' "$W"        → 8
```

Around it, three prose statements survive at two different, both-wrong values, and a fourth
enumeration is short by one row:

| site | text (⟨cmd⟩-verified) | list says |
|---|---|---|
| §2.8 E-11 disposition | *"**Five** paired obligations stand outstanding and none was fixed unilaterally** — P-1 · P-2 · P-4 · P-5 · P-6 · P-7 · P-8"* — the word says FIVE, its own list names SEVEN | **8** |
| G-F9-21 face, closing | *"**All seven** land in ONE commit with the twin"* | **8** |
| G-F9-21 face, closing | *"The gate stays RED on **all seven** outstanding paired obligations"* | **8** |
| §4a-17 PAIRED-BYTES LAW | *"Outstanding: **P-1** … **P-8**"* — enumerates seven and **omits P-9 entirely** | **8** |

R4-7.3 is explicit: *"where the prose and the list disagree, the **LIST** is authoritative and the
prose is **corrected in place**."* The list was installed; the prose was not corrected. **P-9 is
OUTSTANDING by the list and invisible to every prose statement of what must close** — which makes
G-F9-21's GREEN condition indeterminate by one obligation (axis 4). This is the fourth consecutive
round the same gate face has under-counted itself, now inside the round that installed the cure.

### D-4 · HIGH — 44 inline ⟨cmd⟩s consume a cwd the spec's own base block forbids; PASS-3 D5 is disclosed-as-cured but is not cured

§2.0's assignment block: *"Every ⟨cmd⟩ in this section and at §2.8a runs from the **value.js repo
root** after this exact block."* §2.8a repeats the block *"so this register is self-contained"*.
Measured:

```
-- ⟨cmd⟩ taking a bare  waves/F-W*.md     operand : 33
-- ⟨cmd⟩ taking a bare  formation/fourier/… operand:  7
-- ⟨cmd⟩ taking a bare  registry/adjudicated/… op. :  2
-- ⟨cmd⟩ taking a bare  carry/F-W*-CARRY.md operand:  2       → 44 total

$ cd /Users/mkbabb/Programming/value.js
$ /usr/bin/grep -o 'No unit-test runner — vitest is ABSENT' formation/fourier/lane-frontend.md
grep: formation/fourier/lane-frontend.md: No such file or directory   (exit 2)
```

Those 44 resolve only from `$X` (`waves/…`, `carry/…`) or from `$V`
(`formation/…`, `registry/…`) — **at least three incompatible cwds**, which is verbatim the defect
§2.8 E-10(e) records and declares cured: *"three incompatible path roots ran through the file with
no base stated anywhere, so no single cwd reproduced the file."* Round 3 answered it with a
*convention* (the "prefix rule"); R4-2.3 answered it with an *assignment*, and the assignment
block was written but the 44 consuming ⟨cmd⟩s were not re-rooted to it. §2.8a's own section-B table
carries `waves/F-W0.md` operands **inside the register that publishes the repo-root rule** — a
direct internal contradiction. R4-2.5: *"any pass-5 seat that meets a ⟨cmd⟩ failing 1–4 convicts
it ON SIGHT as unrunnable machinery — no charitable reading."* Every one of the 44 runs once its
base is supplied, and this seat supplied it; **as published, none runs from the cwd the file names.**

### D-5 · MEDIUM — §2's disposition arithmetic double-counts PAW-50; "now 46" is 45

§2 states *"**26** registry routing identities ⊕ **5** by-mechanism entrants ⊕ **5** §2.5 rows =
**36**"* and *"**36 + 8 = 44 dispositions in all**, now **46** with round 4's two canonical
additions (`(fr-PaperArticleWindow, R2-7)` ⊕ `(fr-PaperArticleWindow, PAW-50)` booked whole)"*.
The 26-identity table, enumerated:

```
$ awk '/^\| record \| identity/,/^\*\*By-mechanism entrants/' "$W" | /usr/bin/grep -c '^| fr-'
22                       (22 rows; four carry two identities → 26 identities)
… row 16 :  | fr-PaperArticleWindow:200 | **PAW-50** | **F.W4** ⟨re-cut⟩ | …
```

**PAW-50 is already inside the 26, and therefore already inside the 44.** Round 4 moved its HOME
(⟨re-cut⟩ → F.W4 struck, booked whole at F.W9); it did not add a disposition. Only `R2-7` is a
genuinely new disposition — §2.0 row 14 says so in terms ("Rounds 1–3 … minted no row"). Counting
the sections, which is the falsifier §2 installs for itself at E-10(c) (*"falsifiable by counting
the sections rather than by trusting this sentence"*), gives **45**. R4-7.3 again.

### D-6 · MEDIUM — row numbers stand as identities in the wave's own voice at five seat-local sites, two of them ordering LOCKS

P-6/P-7 disclose `38` and `27` **inside** the shared §2.2 bytes (lines 181, 190 — correctly paired,
correctly not fixed unilaterally), and §2.0 rows 4/12 plus §2.4 restore the canonical `C:D-11` and
`L:L-i2`. Outside the shared region (lines 176–201) the struck spelling is live in the wave's own
voice at five sites, every one of which needs no permission from the twin:

```
$ /usr/bin/grep -noE '(ContourPreview|ImageUpload)[^|]{0,40}(\*\*)?(38|27)(\*\*)?' "$W"
193:ContourPreview 38          ← inside shared bytes (P-6/P-7 territory)  — licensed
199:ImageUpload 27             ← inside shared bytes                       — licensed
236:ImageUpload 27             ← §2.3 S5, the seat's rows-it-discharges column:  **27** (ImageUpload: **15** entries / **6** files…)
440:ImageUpload 27             ← G-F9-13's witness cell
475:ContourPreview 38          ← §4a-4 HARNESS-BEFORE-RIDER — a LOCK, keyed on a row number
479:ImageUpload 27             ← §4a-8 MATRIX-BEFORE-COARSE — a LOCK, keyed on a row number
499:ContourPreview 38 · ImageUpload 27   ← §4b's F.W10 hand-off roster
```

§4a-17 asserts *"the seat-local corrections that need no permission (§2.0's roster, §2.0a's
citations, §2.3 S2's re-label) were **taken in full**"* — an absolute falsified at five sites, and
§2.3 S5 is itself one of them. This is E-11(b)'s own named lesson ("a strike rendered at one of
its occurrences and certified over all of them") repeating one round later, on the very ids
E-11(b) struck.

### D-7 · MEDIUM — E-11(b)'s "Both are now in the bracket class" is false: the strike re-creates its own subject

E-11(b) certifies that the plain spelling `§1 :48` — the twin the round-3 `:[5]68` strike never
rendered — is now bracket-classed at both sites. The two ORIGINAL sites were bracketed
(`F-W9.md:295` E-9(g)'s strike cell, `F-W9.md:428` G-F9-1's witness, both now `§1 :[4]8`), but the
clauses that ANNOUNCE the bracketing re-spell it plain:

```
$ /usr/bin/grep -oE '.{90}1 :48.{40}' F-W9.md
…`:568` — **both now rendered in E-4's BRACKET CLASS at round 4**, because the plain `§1 :48` spelling survived here and at G-F9-1 a…
…`:[5]68` bracket-class strike had a **twin it never rendered**: the plain spelling `§1 :48` survived as a live occurrence at **two**…
```

Two new plain occurrences (lines 295, 297), minted by the cell that declares the form extinct.
E-11(b)'s companion claim *"**∅ unlicensed**"* is false on this and on D-1's `F-W1.md:272`.

### D-8 · MEDIUM — §2.8a's "ELEVEN labelled spans" matches neither reading of its own table

```
$ awk '/^\| # \| labelled span/,/^\*\*Three failures/' "$W" | /usr/bin/grep -oE '^\| [0-9]+.? \|'
| 1 | | 2 | | 3 | | 4 | | 5 | | 6 | | 7 | | 8 | | 8′ | | 9 | | 9′ | | 10 | | 10′ |     → 13 rows
```

Thirteen rows; **ten** distinct labelled spans (`#1..#10`), the three primed rows being the
records' own spans rather than labels. The prose says *"over **ELEVEN** labelled spans"* and *"the
**eleven-span** transcript"* — neither 10 nor 13. R4-7.3, inside the register that publishes the
count law.

### D-9 · LOW — E-1's re-scoped absolute is falsified inside its own cell, and its enumeration is short by one

R4-7.3/E-11(e) re-scoped *"No prose in this file quotes 9"* to *"…**OUTSIDE the shared §2.2
bytes**"*. Measured:

```
$ /usr/bin/grep -n '9 e2e never enter the audit tab' F-W9.md
178:  ← inside the shared bytes (the AA-44 cell, licensed)
282:  ← E-1's own cell, OUTSIDE the shared bytes
452:  ← P-1's cell on G-F9-21's face, OUTSIDE the shared bytes — minted at round 4
```

The `sort -u` receipt (*"one distinct span"*) reproduces; the cell's enumeration of where the span
lives — *"the shared cell's, plus **this row's** quotation of it"* — accounts for two of three and
predates P-1's cell by one round. Same shape as D-1 and D-8: axis right, enumeration short.

### D-10 · LOW — FILED AGAINST THE CANONICAL, NOT THE SPEC: `(fr-PaperArticleWindow, R2-7)` books at F.W9 on a routing token that qualifies PAW-12

The canonical homes `R2-7` at **F.W9** (`$C` §1, `| `R2-7` | — | `F.W9/W10` | **F.W9** …`), and
F-W9 §2.0 row 14 books it **correctly under R4-10** — a wave may not re-cut a canonical home, and
the spec explicitly declines to. The query is the canonical's own derivation. At the registry
bytes:

```
$ /usr/bin/grep -n 'R2-7' "$R/fr-PaperArticleWindow.md"
186:| **R2-7** | **No unit harness in web/ at all** (LC missed find 4) | absent | filed INFO |
     **ADMITTED → PAW-50 (INFO).** | My reads: … PAW-12's booked F.W9/W10 set-equality rider has
     no home to live in …
$ /usr/bin/sed -n '176,178p' "$R/fr-PaperArticleWindow.md"
## Ruled items (this seat's actual work, R2-1..R2-9)
```

R2-7 is a **Ruled-items** row whose own terminal-disposition column reads *"ADMITTED → PAW-50
(INFO)"* — an admitted missed find folded INTO PAW-50 (its siblings R2-1..R2-6/R2-8 read
identically: `RATIFIED → PAW-44 + K-18`, `ADMITTED → PAW-49`, `SUSTAINED → K-20`, …). The only
`F.W9/W10` token on the line sits in the seat's evidence prose and grammatically qualifies
**PAW-12's** rider, not R2-7. Under §0.1's ROUTING rule the token is admittedly "on the line"; under
§0.1's TERMINAL-DISPOSITION-BY-REGISTER and ONE-HOME-PER-ID readings R2-7 and PAW-50 are one
finding banked twice. If the canonical sustains the reading, nothing moves in F-W9; if it does
not, F.W9's roster is 16 and §2.0 row 14 falls with it. **A pass-5 ruling is owed at the canonical,
not at this spec.**

### D-11 · LOW (disclosure for the successor, not a conviction) — three PIN TABLE rows are stale, one of them unmarked

```
sibling                    pinned at quote time   at this check   status
CENSUS-CANONICAL.md        a450b8e9f80e           a450b8e9f80e    ✓
F-W0.md                    cd64d6580098 ⟨moved⟩   282f0c120cd4    MOVED AGAIN
F-W1.md                    0bfd6c8cd369 ⟨moved⟩   a1302689aaa3    MOVED AGAIN
F-W3.md                    a89c3386f3f8           a89c3386f3f8    ✓  (see D-2)
F-W4.md                    71f3b640d51e           39e1a60b3fc9    MOVED — row not marked ⟨moved⟩
F-W10.md                   bb58dc400cff ⟨moved⟩   bb58dc400cff    ✓
F-W1-CARRY.md              0d0b091e86ca           0d0b091e86ca    ✓
F-W4-CARRY.md              bf1da6fe1e7e           bf1da6fe1e7e    ✓
lane-docs.md               1a5caf437d54           1a5caf437d54    ✓
lane-frontend.md           4433d809fac7           4433d809fac7    ✓
CENSUS-2026-08-03.md       684de3d8a8a0           684de3d8a8a0    ✓
```

**All eighteen quotations F-W9 takes from F-W0 / F-W1 / F-W4 were re-run against the moved bytes by
this seat and every one still reproduces**, so no conviction follows — this is R4-8.3's mechanism
doing exactly its job, and it is recorded so the next seat re-hashes rather than inherits. Note
that the pin table's usefulness is asymmetric: it caught nothing at F-W3, where the hash MATCHED
and the receipt was false anyway (D-2). **A hash proves the bytes did not move; it does not prove
the paste was produced by the command.** That gap is the whole of D-2 and is the standing lesson
this check leaves for pass 5's rulings.

---

## §7 WHAT THIS CHECK DID NOT FIND

Stated so absence is not read as un-swept. **No phantom §-anchor** (every cited `§` in an external
authority was greped for its own existence — F-W0 §6b, F-W0 §1d, F-W3 §X.1-v4, F-W1 §4's
Intra-wave heading, `$C` §2, lane-docs §6 arm (b), lane-frontend §1/§6, CENSUS §4 item 5 — all
resolve). **No fabricated quotation** — all thirty-plus corpus and sibling quotations reproduce,
including the three the file itself publishes as FAILs. **No censusrival operand** — `$C` is the
sole census in every gate cell and every denominator. **No booked-id drift, no rename, no
double-home** — §2.0's 17 match the canonical head-for-head and alias-for-alias. **No posture
breach** — planned, born-RED, zero VERIFIED, tree read-only, F.W7 unnamed, F.W1 cited whole.

The four rounds' pattern holds one round further and should be stated as the finding above the
findings: **the axis is never wrong and the enumeration under it is always short.** Round 5's
convictions are, in order, a residue probe not re-run after its own round minted the residue
(D-1), a receipt not produced by its command over bytes that never moved (D-2), a count law
installed and not applied to the three sentences beside it (D-3), and a base block written but not
consumed (D-4). Every one of them is the same failure at a different altitude, and every one is
seat-local — **none requires the twin's permission to cure.**

---

*— end of PASS-5 F-W9-CHECK. This file measures; it directs nothing. Every ⟨cmd⟩ above was run
read-only by this seat on 2026-08-29 against BSD `/usr/bin/grep` 2.6.0-FreeBSD from the bases
assigned in the masthead block. No file outside `conformance/PASS-5/` was written.*

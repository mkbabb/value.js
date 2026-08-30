# X·F · PASS-11 SEAL — THE VERIFY-ONLY RE-HASH AND THE INDEPENDENT NUMERIC RE-SWEEP

**2026-08-30 · the seal seat · ZERO EDITS TO ANY SPEC, TO THE CANONICAL, OR TO THE CERTIFICATE.**

⊘ **What this seat is.** A verifier, not a repairer. It re-hashes the twelve pinned files against
`PIN-PURGE-CERT.md` §ERRATA-R11's table, **rebuilds the census authority list from the frozen
canonical without reading a single spec first**, probes all eleven specs for stale members **by
context and never by known-bad value**, re-runs every round-11 re-cut receipt at the settled bytes,
and re-runs the post-settle coordinate sweep for the one file round 11 lengthened. **Every finding
below lives in this seal and nowhere else** — no spec, no cert append, no canonical byte was
touched, and the corrections this seal names are owed to a round-12 seat, not taken here.

⊙ **Base for every ⟨cmd⟩ in this instrument**, declared once: repo root
`/Users/mkbabb/Programming/value.js`; wave-relative commands run from
`docs/tranches/X/fourier/waves/`; `$C = ../conformance/CENSUS-CANONICAL.md`. Pinned BSD toolchain,
`/usr/bin/grep` · `/usr/bin/awk` · `/usr/bin/sed` addressed absolutely wherever the receipt under
test addressed them absolutely.

⊙ **This seal cannot perturb any receipt it verifies.** Every self-count probe in the corpus is
scoped to a single wave file (`F-W2.md`, `F-W8.md`, `F-W9.md`, `F-W10.md`); the one probe that was
ever directory-scoped — `F-W7:16`'s residue enumeration — was re-scoped to `waves/` by this very
round, where no conformance artefact can enter it. A file written here is outside all of them by
construction.

---

## §1 — THE RE-HASH: TWELVE OF TWELVE, BYTE-IDENTICAL

⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md`

**All twelve digests reproduce §ERRATA-R11's table exactly — first-12 prefixes below, full output at
§7 as this write's last act.**

| # | file | §ERRATA-R11 (authority) | this seat | verdict |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `1f5a93c90ed7` | `1f5a93c90ed7` | ✓ |
| 2 | `waves/F-W1.md` | `ab2437af09e0` | `ab2437af09e0` | ✓ |
| 3 | `waves/F-W2.md` | `77854a06b2ee` | `77854a06b2ee` | ✓ |
| 4 | `waves/F-W3.md` | `be86ae410118` | `be86ae410118` | ✓ |
| 5 | `waves/F-W4.md` | `2fb6e6d637bb` | `2fb6e6d637bb` | ✓ |
| 6 | `waves/F-W5.md` | `40bcad59cd2b` | `40bcad59cd2b` | ✓ |
| 7 | `waves/F-W6.md` | `e83dcad051f5` | `e83dcad051f5` | ✓ |
| 8 | `waves/F-W7.md` | `75a08eeee03a` | `75a08eeee03a` | ✓ |
| 9 | `waves/F-W8.md` | `d8237cf6b11e` | `d8237cf6b11e` | ✓ |
| 10 | `waves/F-W9.md` | `b265bf677869` | `b265bf677869` | ✓ |
| 11 | `waves/F-W10.md` | `9415e4c93e57` | `9415e4c93e57` | ✓ |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | **`f44362757458`** | ✓ **FROZEN, third round** |

▲ **The canonical is unmoved for a third consecutive round**, exactly as §ERRATA-R11 ⊙ states. Round
11 was a repair of the specs *against* the canonical and never of it, and this seat confirms it from
the outside.

⊙ **Line-count corroboration of §ERRATA-R11·d's by-construction claim.** Live: F-W1 735 · F-W2 465 ·
F-W3 912 · F-W4 470 · F-W5 433 · F-W6 634 · F-W7 359 · F-W8 374 · F-W9 557 · F-W10 515 — **all ten
byte-identical to the figures §ERRATA-R11·d publishes**. `F-W0` stands at **596**, its declared
pre-append 535 plus the 61-line EOF note. Corpus total **6050** post-append; **5989** pre-append,
which is the figure `F-W0` §R11-4 publishes. Both arithmetics close.

---

## §2 — THE AUTHORITY LIST, BUILT FROM THE FROZEN CANONICAL BEFORE ANY SPEC WAS OPENED

**This is the discipline R11-5 law 1 states, executed independently.** The list below was derived by
summing the canonical's **own §2 roster bodies** — not by reading its §3 table and not by reading
`F-W0`'s §R11-2 transcription — and only then compared against both.

⟨cmd⟩ per home, `awk '$0 ~ "^### <home> — "{f=1;next} /^### /{f=0} f && /^- \*\*/'` over `$C`,
counting records and summing each record's parenthesised row count:

| home | rows (summed from roster) | records | §3 table | §R11-2 | verdict |
|---|---|---|---|---|---|
| F.W0 | **55** | **29** | 55 | 55 / 29 | ✓ |
| F.W1 | **330** | **65** | 330 | 330 / 65 | ✓ |
| F.W2 | **23** | **15** | 23 | 23 / 15 | ✓ |
| F.W3 | **919** | **59** | 919 | 919 / 59 | ✓ |
| F.W4 | **1007** | **54** | 1007 | 1007 / 54 | ✓ |
| F.W5 | **27** | **11** | 27 | 27 / 11 | ✓ |
| F.W5-W8 | **89** | **31** | 89 | 89 / 31 | ✓ |
| F.W9 | **16** | **15** | 16 | 16 / 15 | ✓ |

⊙ **§3 aggregates, re-derived**: records censused **66** · ROWS **4242** · ids after band expansion
**4287** · ALIASES **2780** · rows routing NO-WAVE-OWNER **88** · TERMINAL (∅) **1220** · UNROUTED
**307**. ⟨cmd⟩ the §3 home-table summed mechanically — `awk '/^\| home \| rows \|/,/^\| \*\*TOTAL\*\*/' "$C" | grep -E '^\| \*\*' | grep -v TOTAL | sed -E 's/.*\| ([0-9]+) \|/\1/' | paste -sd+ - | bc`
→ **4242**, which **equals the published TOTAL**. The census is internally closed.

⊙ **§4.3 re-derived**: **2780** alias tokens ride beside **4242** banked ids; an atomiser promoting
them mints up to **2779** bookings.

⊙ **§4.2 re-derived, both arms**: the twin law's **864** duals = **778** ⊕ **86** ✓; and the five
criterion-negatives' own §1 headers — `fr-BasisCanvas` 79 · `fr-ContourEditorCanvas` 73 ·
`fr-EquationResult` 46 · `fr-GalleryAdminBanner` 52 · `fr-FourierMorphSvg` 32 — sum to **282** ✓,
the errata-round-6 corrected figure and not the inherited 289.

▲ **`F-W0` §R11-2's transcribed authority table is EXACT in all 28 values**, including *wave-duty*
**2466** and *TERMINAL* **1220**. A successor may quote it — though R11-1's own rule (re-derive, do
not quote) remains the better practice, and this seat followed it.

**29 authority values established and verified independently: 8 row totals · 8 record counts ·
8 §3 aggregates · 3 §4.3 magnitudes · 2 §4.2 arithmetics.**

---

## §3 — THE CONTEXT SWEEP OVER ALL ELEVEN SPECS

**Method (R11-5 law 2, executed against the list above and not against a list of known-bad values).**
Every `F.W<n>`-adjacent numeral, every `N rows` / `N records` claim, and every totals-family token
(`ROWS` · `band expansion` · `alias tokens` · `NO-WAVE-OWNER` · `TERMINAL` · `UNROUTED` ·
`records censused` · `duals` · `criterion-negative`) was extracted with its 200-character
neighbourhood and triaged: **current → leave · dated / struck / quoted-as-history → read and record
· stale in current voice and unchased → FINDING.**

### §3.1 — F-W4, re-verified per the mandate

| claim | verdict |
|---|---|
| zero **unchased** `1014` | ✓ — **five** occurrences, `:7` `:297` `:349` `:374` `:455`, **every one inside an R11 or round-7 chase note or a quoted superseded reading** |
| zero unchased `1012` | ✓ — four occurrences, all chased (`:7` `:297` and the round-7 minutes) |
| `:349` arithmetic sums to 1007 | ✓ — *"crosswalked-and-already-booked **29** (a); newly booked here **71** (b); … the remaining **907** … **29 + 71 + 907 = 1007**"* — **29 + 71 + 907 = 1007** closes, and the denominator is the canonical's F.W4 |
| the gate at `:374` cites 1007 | ✓ — `G-F4-CARRY-CLOSURE` leg (b)'s roster reads **`§2 → F.W4 (1007 rows, 54 records)`**, with the self-refuting `1014` preserved inside its chase note |
| the **54-record** claim | ✓ **independently re-verified** — the canonical's F.W4 roster body carries exactly **54** record bullets |

▲ **The masthead and §2.X.2 now agree**, which is what §ERRATA-R11·c row 5 claims. Before the cure
`:374` named 1014 in the same breath as *"hash-pinned at §2.X.2"* while §2.X.2 read 1007; at these
bytes both read 1007.

### §3.2 — F-W3, re-verified per the mandate

| claim | verdict |
|---|---|
| carries `2780` | ✓ — 2 occurrences (`:32`, `:784`) |
| carries `4242` | ✓ — 3 occurrences (`:32`, `:703`, `:784`) |
| carries `2779` | ✓ — 1 occurrence (`:32`) |
| zero unchased `2768` / `4269` / `2767` | ✓ — **six** occurrences across `:32` `:703` `:784`, **every one inside an R11 chase note or the canonical's own quoted supersession record** |
| `926` / `928` | ✓ — nine occurrences at `:17` `:28` `:416` `:707` `:787` `:901`, all chased; `:17`'s byte-true `RULINGS-4.md` quotation is chased by the adjacent `:19` block |

▲ **§ERRATA-R11·c row 4's claim that the file "now carries all three" is TRUE**, and the pre-cure
`grep -c '4242\|2780\|2779'` → 0 is consistent with the three sites the round re-based.

### §3.3 — The remaining nine specs: every stale member read, and its disposition

| site | member | disposition | verdict |
|---|---|---|---|
| `F-W0:564` | the whole superseded-generation list | self-declared history (*"named so a successor recognises one on sight"*) | ✓ lawful |
| `F-W0:225` | round-5 `57 rows` minute | dated round-5 clause; the governing operand on the same line reads **55** under a round-7 chase; **on R11-3's explicit "read and deliberately NOT cured" list** | ✓ lawful |
| `F-W10:322` | round-4 `4278 → 4269` | chased at round-7 to ROWS **4242** · expanded **4287** · ALIASES **2780** · wave-duty **2466** · TERMINAL **1220** · UNROUTED **307** | ✓ lawful |
| `F-W6:476` `:526` `:601` | `28` / `90` | all three re-based at repair round 8 with dated notes; `:601` is the bare-spelling site the round-8 spelling-agnostic sweep found | ✓ lawful |
| `F-W8:20` | dated canonical paste incl. `F.W5 — **28 rows**` | REST-51 minute, dated | ✓ lawful |
| `F-W7:291` | `1014` ×2 | inside the R11 chase note quoting the superseded receipt | ✓ lawful |
| `F-W3:17` | `926` ×2 | byte-true frozen-ruling quotation, chased at `:19` | ✓ lawful |
| **`F-W7:101`** | `F.W5 (28)` | **MIXED-GENERATION pair — see LW-R11-c** | ⌧ **MINOR** |
| **`F-W10:363`** | `F.W9 = 17`, and `R2-7` homed F.W9 | **STALE, CURRENT VOICE, UNCHASED — see LW-R11-a** | ⌧ **HIGH** |

**33 stale-member sites read and correctly disposed. ONE live stale magnitude survives (§6).**

---

## §4 — EVERY ROUND-11 RE-CUT RECEIPT, RE-RUN VERBATIM AT THE SETTLED BYTES

**36 command outputs re-run. 35 reproduce exactly. ONE does not.**

### §4.1 — `F-W2:248` — the paired figures ⌧ **THE VERBATIM ARM DOES NOT REPRODUCE**

| ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|
| `/usr/bin/grep -oE '⟨cmd⟩ \`[^\`]*\`' F-W2.md \| sort -u \| /usr/bin/wc -l` | **84** | **86** | ⌧ **FAILS** |
| `… \| /usr/bin/grep -c '/Users/'` | **16** | **16** | ✓ |
| `/usr/bin/awk 'NR!=248' F-W2.md \| /usr/bin/grep -oE '⟨cmd⟩ \`[^\`]*\`' \| sort -u \| /usr/bin/wc -l` | **81** | **81** | ✓ |
| `… \| /usr/bin/grep -c '/Users/'` | **16** | **16** | ✓ |
| `/usr/bin/grep -oE '⟨cmd⟩ \`[^\`]*\$[^\`]*\`' F-W2.md` | no output | no output (exit 1) | ✓ |
| `grep -n 'grep -[a-z]*P' F-W2.md` | no output | no output (exit 1) | ✓ |
| `grep -no '[.]{0,[0-9]*}' F-W2.md` | no output | no output (exit 1) | ✓ |

⊘ **The self-excluding arm is EXACT and both absolute counts are EXACT. Only the verbatim arm moved,
and it moved because the cure that published it is what changed it.** Full disposition at LW-R11-b.

### §4.2 — `F-W10:338` — the `:442` re-base ✓ **REPRODUCES**

| ⟨cmd⟩ | published | this seat |
|---|---|---|
| `/usr/bin/awk 'NR!=338' F-W10.md \| /usr/bin/grep -cE '(^\|[^A-Za-z0-9])L-16([^A-Za-z0-9]\|$)'` | **10** | **10** ✓ |
| `/usr/bin/grep -nE '(^\|[^A-Za-z0-9])L-16([^A-Za-z0-9]\|$)' F-W10.md` | `191 193 244 276 291 296 297 301 303 338 442` | **identical, all eleven** ✓ |
| `FR-NP-32` corroboration at `:446` | present | present ✓ |

⊙ **`419 + 23 = 442` and `423 + 23 = 446` both check.** The eight coordinates above the round-10
insertion are unmoved; the ninth is correctly re-based.

### §4.3 — `F-W10:467` — the `14 · 14 · 14` pairing ✓ **REPRODUCES**

| ⟨cmd⟩ | published | this seat |
|---|---|---|
| `/usr/bin/grep -n "§2.5a-iii's 1[34]" F-W10.md` | `:314` `:442` `:467` | **identical** ✓ |
| the three values | `14` · `14` · `14` | **`14` · `14` · `14`** ✓ |
| `/usr/bin/awk 'NR!=467' F-W10.md \| /usr/bin/grep -c "§2.5a-iii's 1[34]"` | **2**, both `14` | **2**, both `14` ✓ |
| `23 + 36 + 16 + 14` | **89** | **89** ✓ |

⊙ **This is the R3-3.8 before/after pairing done correctly** — the very discipline `F-W2:248`'s
verbatim arm failed to complete. Two cures of the same class, one round, opposite outcomes.

### §4.4 — `F-W9` — the `+7` re-base and the `:505` cross-file cure ✓ **REPRODUCE**

| ⟨cmd⟩ | published | this seat |
|---|---|---|
| `/usr/bin/grep -n '9 e2e never enter the audit tab' F-W9.md` | `185` `289` `461` | **identical** ✓ |
| `grep -o '9 e2e never enter the audit tab' F-W9.md \| sort -u` | one distinct span | **one distinct span** ✓ |
| `/usr/bin/grep -nE '(^\|[^A-Za-z0-9])L-26([^A-Za-z0-9]\|$)' F-W9.md` | `119` `304` `505` | **identical** ✓ |
| `/usr/bin/awk 'NR!=505' F-W9.md \| … \| /usr/bin/grep -c 'fr-VisualizationView'` | **0** | **0** ✓ |
| `F-W3.md:783` at the settled bytes | **BLANK LINE** | **blank** ✓ |
| `/usr/bin/grep -n 'F\.W9/W10' F-W3.md` | **`815`** | **`815`**, content `\| fr-AdminFlaggedPanel FR-AFP-42 \| the seam; test seat → F.W9/W10 \| **F.W4** \|` ✓ |

▲ **The `+32` cross-file drift is real and the re-base is correct.** §ERRATA-R11·c row 10's claim
that *"no single file's line count reveals this class"* is sustained: `F-W3` never changed length in
round 11, and `:783` still rotted.

### §4.5 — `F-W7` — the `waves/`-scoped probe and the `:291` quoted receipt ✓ **REPRODUCE**

| ⟨cmd⟩ | published | this seat |
|---|---|---|
| the residue probe **re-scoped to `docs/tranches/X/fourier/waves/`** | `F-W7.md` **alone** | **`docs/tranches/X/fourier/waves/F-W7.md`, alone** ✓ |
| the same probe unscoped over `docs/` | **seven at cure time** | **7** ✓ (PASS-5 ×3, PASS-10 SEAL, PASS-11 CHECK ⊕ CHECK-RETURN.json, F-W7) |
| `grep -o '^### F\.W4 — \*\*1007 rows\*\*' conformance/CENSUS-CANONICAL.md` | *"### F.W4 — **1007 rows**"* | **exact string returned** ✓ |
| the superseded `1014` form | **ZERO** | **0** ✓ |
| `/usr/bin/grep -c 'criterion negative → F.W4' $C` ⊕ the five names | **5** ⊕ five records | **5** ⊕ `fr-BasisCanvas` `fr-ContourEditorCanvas` `fr-EquationResult` `fr-FourierMorphSvg` `fr-GalleryAdminBanner` ✓ |
| `… \| grep -o '\*\*fr-ContourEditorCanvas\*\* (40)'` | *"**fr-ContourEditorCanvas** (40)"* | **exact** ✓ |
| `… \| grep -o '· .L-5. ·'` | `` · `L-5` · `` | **exact** ✓ |
| `sed -n '56p' fr-ContourEditorCanvas.md` | the L-5 MAJOR row | **exact** ✓ |

▲ **§ERRATA-R11·c row 8's headline holds**: the cured receipt returns **1** at the frozen canonical
and the superseded form returns **0**, and **all three companion receipts on the row reproduce
exactly** as the cert claims. This was the round's genuinely new class — a magnitude the spec
*quotes from the authority* rather than asserts — and the cure is sound.

### §4.6 — `F-W8:324` and §ERRATA-R11·b ✓ **REPRODUCE**

| ⟨cmd⟩ | published | this seat |
|---|---|---|
| `/usr/bin/grep -n 'C:C-23' F-W8.md` | eleven: `20 25 27 40 78 81 165 246 267 322 324` | **identical, all eleven** ✓ |
| the label, corrected `nine → ten` | ten, `11 − 1` | **11 − 1 = 10** ✓ arithmetic closes |
| `/usr/bin/grep -nF 'fr-PaperSearchDropdown' $C` | `:5428` | **5428** ✓, inside `### UNROUTED` at **5386** ✓ |
| `/usr/bin/grep -cF '(≡ M1' waves/F-W10.md` | **1** | **1** ✓ |
| `/usr/bin/awk 'NR!=446' waves/F-W10.md \| /usr/bin/grep -cF '(≡ M1'` | **0** | **0** ✓ |

▲ **§ERRATA-R11·b's INFO note is correct and its warning is well-founded**: the sole hit is at
`F-W10:446`, inside the strike that retires the spelling, and the self-excluding form is the lawful
probe. A round-12 gate written as a bare `grep -cF` would convict lawful bytes.

### §4.7 — `F-W0`'s EOF-append non-perturbation invariants ✓ **REPRODUCE**

| set | cert claim | this seat, post-append |
|---|---|---|
| quoted canonical row headings across the eleven | 24 → **24** | **24** ✓ |
| `N records` claims across the eleven | 157 → **157** | **157** ✓ |

▲ **The append perturbed neither enumerated set it reports**, exactly as §ERRATA-R11·c row 1 claims.

---

## §5 — THE POST-SETTLE COORDINATE SWEEP FOR THE FILE ROUND 11 LENGTHENED

⊙ **Round 11 lengthened exactly ONE file: `F-W0`, 535 → 596, by a 61-line append beginning past
every pre-existing byte.** Ten specs are byte-identical in length; the canonical did not move. The
displacement hazard is therefore confined to `F-W0` addresses at-or-below the insertion point — and
**there is no such point**, because the insertion is at end-of-file.

**(a) Every coordinate in the corpus that addresses `F-W0`.** ⟨cmd⟩ a corpus-wide scan for
`F-W0.md:NNN` returns exactly three distinct addresses — **`:199`** · **`:204`** · **`:209`** (plus
`:63`, named in the same strike sentence) — cited from `F-W0` `F-W1` `F-W3` `F-W4` `F-W6` `F-W8`
`F-W10`. **All are ≪ 536 and therefore unmoved by construction**, and all three resolve at the
settled bytes: `:199` → the `Q8` row, `:204` → the `Q13` row (`PP-REDGATE`), `:209` → the `Q18` row
(`fr-PaperSearchInput` residue). ⊘ They are cited **as STRUCK BYTES** — the retired G-11/G-12/G-13
addressing idiom, self-disclosing at `F-W1:689` — which is the licensed form, and their resolution
is verified regardless.

**(b) The R11 note's own cross-file coordinates.** The note was written last, after every spec
settled, so its fifteen outbound addresses are the sweep's real exposure. **All fifteen resolve to
the content the note names:**

`F-W4` `:7` masthead ✓ · `:349` the falsifiable arithmetic ✓ · `:374` `G-F4-CARRY-CLOSURE` ✓ ·
`:455` the register row ✓ — `F-W3` `:32` the blindness-axis clause ✓ · `:703` the v5 sentence ✓ ·
`:784` the 30 zero-homed prefix-axis ids ✓ — `F-W7` `:291` the `L-5` row ✓ · `:16` the P-10 limb ✓ —
`F-W2` `:248` the born-RED gate block ✓ — `F-W8` `:324` the two-canonical-ids paragraph ✓ —
`F-W10` `:467` the ADMISSION GAP row ✓ · `:338` the escape test ✓ — `F-W9` `:505` the shadow-retirement
row ✓ · `:289` the `E-1` erratum row ✓.

**(c) The intra-file sets re-run in full** (§4.2 · §4.4 · §4.6): `F-W10`'s eleven `L-16` homes, its
three `§2.5a-iii` hits and the `FR-NP-32` strike; `F-W8`'s eleven `C:C-23` lines; `F-W9`'s three.
**Every one verifies unchanged.**

▲ **VERDICT: the coordinate corpus is intact after round 11.** §ERRATA-R11·d's "48 verify unchanged,
1 already-drifted and re-based" is sustained on every coordinate this seat re-ran, and the EOF-append
discipline (R11-5 law 4, applied prospectively) did what it was written to do. **18 coordinates
re-resolved at this seat; zero newly drifted.**

---

## §6 — LANDED WRONG (3) — RECORDED HERE, CURED NOWHERE

⊘ **These are this seat's findings against the round-11 settled bytes. None is applied. Each is owed
to a round-12 seat, and each names the ruling it needs.** Two of the three were filed by no prior
pass, check, seal or certificate; PASS-11's own register (`D-1`…`D-11`) contains neither.

### ⌧ **LW-R11-a — HIGH. `F-W10:363` publishes a SUPERSEDED canonical magnitude in the present tense, unchased — and a set-membership that goes with it. THIS IS THE ROUND'S ONE LIVE STALE MAGNITUDE.**

**The bytes.** `:363` states, twice and in current voice:

> *"…the F.W9-roster reconciliation named in the next breath (**26 cut identities against a 17-row
> canonical roster**, the `C:D-11` / `L:L-i2` / `R2-7` divergences…)"*

> *"…the §2.2 table cuts **26 identities** while the canonical's **F.W9 roster is 17 rows**, and the
> two sets are not nested — the canonical homes `C:D-11` (fr-ContourPreview), `L:L-i2`
> (fr-ImageUpload) and **`R2-7` (fr-PaperArticleWindow) at F.W9**…"*

**The frozen canonical.** `### F.W9 — **16 rows** *(errata round 5, 2026-08-29: read 17; `R2-7` →
TERMINAL at E5-16)*` — **16 rows across 15 records**, independently re-derived at §2 by summing the
roster body. ⊘ **And the membership limb is false on the same errata row**: ⟨cmd⟩ the F.W9 roster
body carries `fr-PaperArticleWindow (2): PAW-34 · PAW-50` and **no `R2-7`**; `R2-7` sits in
**`TERMINAL (∅)`** (canonical `:3391`, `:3956`, `:5371`). **The one erratum that took 17 → 16 is the
erratum that moved `R2-7`** — so the two halves of this sentence are the same defect counted twice.

**Why it is not a licensed history note.** There is no chase anywhere on the line. The single
`re-based` token on `:363` is inside the byte-true R4-10 quotation *"F-W9 | F.W9 → 17 | masthead
re-based"*, which is the ruling's own words about a duty — not a chase on the operand. The
surrounding sentence is in the present indicative (*"is 17 rows"*, *"the canonical homes"*) and is
offered as *"the canonical figures measured"*.

**Three aggravations, stated so the ruling is easy.**
1. **The twin already disagrees with it.** `F-W9:109` prints ⟨cmd⟩ `grep -o '^### F\.W9 — \*\*16 rows\*\*' "$C"` → `### F.W9 — **16 rows**` as a verbatim receipt. **F-W9 is right and F-W10 is wrong about F-W9's own roster.** This is §ERRATA-R11·c row 9's shape exactly — *"the cert was right and the spec disagreed with it"* — with the cert's place taken by the sibling.
2. **It is NOT in the shared §2.2 splice.** ⟨cmd⟩ `grep -c 'F.W9 roster is 17 rows'` → `F-W9.md:0` · `F-W10.md:1`. The sentence is `F-W10`'s own prose (*"F.W10's act is to state it, from this end"*), so no Δ=∅ splice lock stands between a round-12 seat and the cure. **It is unilaterally curable, which is why it should have been cured.**
3. **Round 11 wrote this file twice and did not reach it.** `F-W10` took cures at `:338` and `:467`; `:363` sits between them.

**The class, named for the successor.** R11-1's instrument was correct and its **run was incomplete**.
The context-anchor list R11-2 declares — `canonical` · `census` · `§2` · `§3` · `§4.3` · `rows` ·
`records` · `operand` · `roster` — **matches this line on four anchors simultaneously**
(`canonical`, `roster`, `rows`, `records`). A sweep built to find exactly this walked past it. ⊘ **So
the lesson is not a sixth law but the enforcement of R11-5 law 2: a context probe must be run to
exhaustion over every spec, and its per-file hit count published**, or a seat cannot tell a clean
file from an unvisited one. **`F-W10` reads identically in both cases.**

▲ **The substantive conclusion at `:363` — that the two sets are not nested and the reconciliation is
F-W9's duty under R4-10 — survives**, and `C:D-11` and `L:L-i2` are correctly homed at F.W9. What
must move is the magnitude, the `R2-7` limb, and the cut count's denominator.

### ⌧ **LW-R11-b — MEDIUM. `F-W2:248`'s VERBATIM arm does not reproduce: the cure that published the figure is what changed it. Third consecutive round this line has published a false verbatim count.**

| reading | published by R11 | this seat, at the sealed bytes |
|---|---|---|
| **VERBATIM** (whole file, this line included) | **84** distinct · 16 absolute · **68** no-absolute-path | **86** distinct · **16** absolute · **70** no-absolute-path |
| **SELF-EXCLUDING** (`NR!=248`) | **81** distinct · **16** absolute · **65** no-absolute-path | **81 · 16 · 65** — **EXACT** |
| the line's own contribution | *"exactly **3** of the 84 … and **0** of the 16"* | **5** of the 86, and **0** of the 16 |

**The mechanism, enumerated rather than asserted.** ⟨cmd⟩ `comm -23` of the verbatim and
self-excluding sorted-unique sets returns **five** members, not three. Two of the five are bytes the
R11 chase note itself introduced:

1. `⟨cmd⟩ `)***⟩ The four bases are named below…`` — a match opening at the note's own closing
   delimiter and running to the next backtick;
2. ``⟨cmd⟩ `/usr/bin/awk 'NR!=248' F-W2.md | /usr/bin/grep -oE '⟨cmd⟩ \` `` — **the self-excluding
   probe the cure added**, truncated at its first escaped backtick.

The other three (`/usr/bin/grep -oE '⟨cmd⟩ \``, `grep -n 'grep -[a-z]*P' F-W2.md`,
`grep -no '[.]{0,[0-9]*}' F-W2.md`) pre-date the cure. **So `84` was a true measurement of the
pre-write bytes, published as a reading of the post-write bytes**, and the `3` was derived from it
by subtraction rather than measured.

⊘ **This is R11-5 law 4 with one word changed.** The law reads *"a cure that inserts lines re-bases
every coordinate at-or-below its insertion point in the same edit."* The general form the round
stopped one step short of is: **a cure that edits bytes its own receipt COUNTS must re-measure the
count after the write, not only re-base the coordinates.** `F-W10:467` — same round, same class —
made exactly that generalisation and reproduces perfectly (§4.3). `F-W2:248` did not.

⊙ **What is NOT wrong, stated so a round-12 seat cures the number and not the paragraph.** The
self-excluding arm is exact in all three figures. Both absolute counts are exact. The declared
exclusion, the R3-3.8 both-forms requirement, and the diagnosis (*"this line is itself a member of
the class it counts"*) are all correct and are the right shape. **And the substantive claim holds in
every reading** — most commands run from a declared base rather than an absolute path: **68/84**
published, **70/86** live, **65/81** self-excluding. **Only the receipt is false, and only in one of
its two arms.** The prose word-forms *"sixty-eight of the eighty-four"* move with it.

⊘ **The recurrence, for the record.** Round 10 published `83` / `sixty-seven`; PASS-11 `D-4` convicted
it; round 11 published `84` / `sixty-eight`; the bytes read **86** / **seventy**. A cure that
re-measures only the arm that excludes itself will fail this line again in round 12.

### ⌧ **LW-R11-c — MINOR. `F-W7:101` attributes a MIXED-GENERATION pair of magnitudes to a single frozen ruling.**

**The bytes.** ⟨*REST-37: R4-5 makes F.W5 **(28)** and F.W5-W8 **(89)** two distinct canonical
denominators; this file states the band correctly elsewhere and the two sentences did not agree*⟩.

**The defect.** `28` is the **R4-5-era** F.W5 figure, superseded at **E6-3** (→ **27**). `89` is the
**LIVE** F.W5-W8 figure — R4-5's own reading was **90**, superseded at **E5-15**. **The parenthetical
therefore attributes to one ruling two figures that never coexisted in it.** Either both belong to
R4-5 (`28` · `90`) or both to the frozen canonical (`27` · `89`); as written the pair is true of no
state of the operand.

⊙ **Not counted among the live stale magnitudes, and the reasoning is disclosed.** The site is a
dated `REST-37` repair minute whose subject is the **distinctness** of two denominators rather than
their values; its live-figure companion shows the seat was not asserting a current census reading;
and `F-W7` states the band correctly elsewhere. **But it is on no round's "read and deliberately NOT
cured" list** — R11-3's block names `F-W6:19`/`:476`'s declared-zero `28 rows` probes and not this —
so it was never adjudicated, and it is recorded here so a round-12 seat rules rather than rediscovers.

---

## §7 — THE VERDICT AND THE TALLY

| axis | result |
|---|---|
| **§1 hash re-verification** | ✓ **12 / 12 byte-identical**; canonical `f44362757458` **FROZEN, third consecutive round** |
| **§2 independent authority list** | ✓ **29 / 29** values re-derived from the frozen canonical's own rosters; `F-W0` §R11-2's transcription **EXACT in all 28** |
| **§3 context sweep** | ✓ 33 stale-member sites read and correctly disposed · ⌧ **1 LIVE STALE MAGNITUDE** (`F-W10:363`) |
| **§4 round-11 re-cut receipts** | **35 / 36 outputs reproduce exactly**; ⌧ 1 fails (`F-W2:248` verbatim arm) |
| **§5 post-settle coordinate sweep** | ✓ **18 / 18 coordinates resolve**; zero newly drifted; the EOF-append invariant holds by construction and by measurement |
| **VERIFIED** | **127** |
| **LANDED WRONG** | **3** — LW-R11-a HIGH · LW-R11-b MEDIUM · LW-R11-c MINOR |
| **LIVE STALE MAGNITUDES** | **1** |

▲ **THE HONEST SUMMARY.** Round 11 was the right round run with the right instrument, and it did the
hardest part correctly: it found the two classes nobody had named — a magnitude *quoted from* the
authority (`F-W7:291`) and a *cross-file* coordinate rotting behind a conclusion that kept running
true (`F-W9:505`) — and it re-based eleven sites and five coordinates without displacing a single
byte elsewhere. **The cert's arithmetic, its authority table and eleven of its twelve digests are
sound, and the twelfth is frozen.**

⊘ **What it did not do is finish.** The round's own §R11-3 claims *"stale sites CURED, in current
voice and unchased: **11**"*. **The true figure at these bytes is 11 cured and ONE LEFT STANDING** —
`F-W10:363`, on four context anchors, in a file the round opened twice. And the round's own law 4,
stated for coordinates, was not carried across to counts, so `F-W2:248`'s verbatim arm published a
pre-write measurement for the third round running.

⊘ **Therefore this seal does NOT certify round 11 as closing the numeric-reconciliation loop.** It
certifies the hashes, the authority list, the coordinate corpus and 35 of 36 receipts. **`F-W10:363`
is a `F.W9`-magnitude escape of exactly the kind §ERRATA-R11 declares extinct**, and a round-12
append is owed: the cure at `:363`, the re-measure at `F-W2:248`, the ruling on `F-W7:101`, and —
the only structural item — **the per-file hit-count publication that makes an unvisited spec
distinguishable from a clean one.**

⊙ **E-3 observed throughout.** Nothing above was patched into any spec, into `PIN-PURGE-CERT.md`, or
into `PASS-11/CHECK.md`. The certificate's §ERRATA-R11 remains the pin authority; this seal is a
reading of it and never an amendment to it.

---

## §8 — THE HASH TABLE — THE ABSOLUTE LAST ACT OF THIS WRITE

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned
BSD toolchain, taken **after every byte of §0–§7 above had settled and with no write of any kind
following it**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

⊘ **Rows 1–12 below are byte-identical to `PIN-PURGE-CERT.md` §ERRATA-R11's table.** Row 13 —
`PIN-PURGE-CERT.md` at **`024943b69d11`** — is the certificate's own digest, which the certificate
cannot state about itself; it is recorded so a round-12 seat can prove the cert was unedited across
this seal. **This seal edited no hashed file: the table below is taken of the same bytes §1 read.**

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell
produced it. NOTHING FOLLOWS IT.**

```
1f5a93c90ed7e9f4463d859d104b76377bbd190f5b38c8a971a2cc989f734411  docs/tranches/X/fourier/waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  docs/tranches/X/fourier/waves/F-W1.md
9415e4c93e578b4af5426ef442a2297d69b31bea089c0272fbee8890f67f092c  docs/tranches/X/fourier/waves/F-W10.md
77854a06b2ee2b79c29b6abb3ed91566873f6e3d236344b5adb7b56048bfc7c7  docs/tranches/X/fourier/waves/F-W2.md
be86ae4101184d8d7278879f5ab5a8abc9102fbcfdfb554d0523affde576bfcf  docs/tranches/X/fourier/waves/F-W3.md
2fb6e6d637bb6d0fad710716fb1dfa103d39fc41f67d8ff0fb856e4c0126cdb6  docs/tranches/X/fourier/waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  docs/tranches/X/fourier/waves/F-W6.md
75a08eeee03a0557af843f953d96eda66d1ca4f71ee0c7dfcde327916cae9937  docs/tranches/X/fourier/waves/F-W7.md
d8237cf6b11ef248e4080b8d805a2ee7477139b8d4cf9cf3564922096e29bd45  docs/tranches/X/fourier/waves/F-W8.md
b265bf677869b0ec6f3c02c54b93272f657111e55498cf05bef14578d6c4b53b  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
024943b69d11de399450b70632610743dc3dd311e63a8ac829107561ee523c36  docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```


# X·F REPAIR ROUND 6 — THE SEAL

**Seat**: SEAL SEAT, X·F round 6. **VERIFY-ONLY — this seat edited nothing.** Every figure below is this seat's own measurement, taken on the pinned BSD toolchain (`PATH=/usr/bin:/bin:/usr/sbin:/sbin`, `/usr/bin/grep` · `sed` · `awk` · `shasum` · `od` — never the interactive `grep`, a shell function wrapping `ugrep`). Nothing is inherited from the round-6 repair seats, the purge seat, or `PASS-6/CHECK.md`.

**Date**: 2026-08-29. **Base for wave probes**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves`. **Base for canonical probes**: `.../fourier/conformance`.

---

## §0 THE SEAL IN ONE PARAGRAPH

**35 round-6 edits spot-verified at the final bytes; 3 landed wrong, all three in `PIN-PURGE-CERT.md`, all three count-shaped, none moving a home, a booking, a roster, a gate or the purge's substance.** The pin purge is **REAL**: `grep -rnoE '[0-9a-f]{12}' waves/` returns **148** tokens and **not one is a live wave-spec pin** — all four of D-1's live digests are gone, and the five superseded digests that survive sit in dated history under E-3, each re-read by this seat with its line. The certificate exists, and its §TABLE is **byte-identical to a fresh re-hash of all twelve files taken by this seat after the purge seat's last write** — 12 of 12, `diff` empty. **Nothing has moved since the purge seat hashed.** The four arithmetic re-derivations this seat performed independently — D-3's four-token loop, E6-1's strike accounting, E6-5's five-record sum, and §3's twenty-three home rows against `TOTAL` — **all four land exactly on the published figures.**

---

## §1 THE HASH GATE — **PASSED, 12 of 12, `diff` EMPTY**

The purge seat's expiry condition is *"these twelve are true of the bytes as this seat left them and of no later state; any seat that writes a spec after this certificate issues VOIDS it by construction."* This seat tested exactly that.

⟨cmd⟩ (base `fourier/`) `shasum -a 256 waves/F-W0.md … waves/F-W10.md conformance/CENSUS-CANONICAL.md` → 12 rows, written to `/tmp/fresh.txt`; the certificate's pasted block extracted mechanically by `awk` to `/tmp/cert.txt`; `diff /tmp/cert.txt /tmp/fresh.txt` → **empty**.

**The certificate is LIVE and unvoided.** No writer has touched a spec or the canonical since it issued. The mtime ordering corroborates independently: waves last written 20:52–21:10, `CENSUS-CANONICAL.md` 21:00, `PIN-PURGE-CERT.md` 21:14 — the purge seat wrote last, as LAW E (R4-8.1) requires, and nothing wrote after it.

---

## §2 THE PIN PURGE — **VERIFIED. ZERO LIVE WAVE-SPEC PINS SURVIVE.**

### §2.1 The sweep, re-run whole

⟨cmd⟩ `grep -rnoE '[0-9a-f]{12}' waves/` → **148**, matching S-1's *after* figure exactly. Every distinct token was tabulated by `sort | uniq -c` and adjudicated against the certificate's four classes. **The class arithmetic closes**: 61 (b, wave digests in dated history) ⊕ 86 (c, pins of files outside the eleven) ⊕ 1 (d, non-pin) = **148**. Not an occurrence unaccounted for.

### §2.2 D-1's live digests — **all four GONE**

⟨cmd⟩ `for d in 34e03162e793 fe6fe8970f71 d524036ef161 571afa710bdb; do grep -lF "$d" F-W*.md; done` → **∅**. PASS-6 §4.1's *"only four live digests appear anywhere in any spec, all inside `F-W1.md` alone"* is now zero-of-four. S-5 reproduces.

### §2.3 D-1's ten superseded digests — **five survive, every one in history position, each read at its line**

| digest | specs | this seat read it as |
|---|---|---|
| `a89c3386f3f8` | F-W0 `:29` · F-W1 `:437` · F-W9 `:505` | *"The round-4 write banked …"* · *"The round-4 block read …"* · REST-54's matching-hash record, **now qualified** *"as it then stood, before the R4-8.2 purge retired it to the certificate"* |
| `a1302689aaa3` | F-W0 `:29` | inside the `83ffe83cb37f → a1302689aaa3` movement minute |
| `39e1a60b3fc9` | F-W3 `:787` · F-W9 `:334` | F-W3's clause now reads **"pinned per `PIN-PURGE-CERT.md §TABLE (2026-08-29)`"** with the round-5 value retired into ⟨⟩; F-W9's REST-64 re-stamp minute |
| `bb58dc400cff` | F-W9 `:352` | the three-of-eleven moved-mid-round chain |
| `5cc3346db23e` | F-W0 `:29` | the `8b631aca0dc1 → 5cc3346db23e` movement minute |

**Five gone entirely** — `282f0c120cd4` · `132c03192176` · `e9a9c3016f4c` · `c8c6d1d7f136` · `1e3698adf4ff` → **0 specs each.**

⊘ **This is the model PASS-6 §6 named** — *"its history marked rather than deleted"* — applied to the wave pins. Deleting these five would have destroyed the programme's own evidence of the failure mode six rounds spent diagnosing.

### §2.4 The cite-the-certificate cure, measured

⟨cmd⟩ `grep -o 'pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)' F-W*.md | wc -l` → **41** (S-2 reproduces). ⟨cmd⟩ `grep -o 'PIN-PURGE-CERT.md §TABLE' F-W*.md | wc -l` → **44** (S-3 reproduces). ⟨cmd⟩ `grep -lF` → **nine specs**: F-W0 · F-W1 · F-W2 · F-W3 · F-W4 · F-W6 · F-W7 · F-W8 · F-W9 (S-4 reproduces; F-W5 and F-W10 carried no wave-spec pin). The three non-canonical spellings were read individually — F-W0 `:186`, F-W2 `:284`, F-W4 `:295` — and **all three are live citations embedded in sentences, not idiom declarations.**

**Seven purged coordinates spot-checked at the bytes** — F-W0 `:150` · F-W1 `:726` · F-W2 `:447` · F-W4 `:295` · F-W6 `:51` · F-W7 `:56` · F-W9 `:343` — **each now carries the certificate citation. 7 of 7.**

**§PURGED's arithmetic re-summed by this seat**: rows 1–17 = 13⊕7⊕5⊕4⊕3⊕3⊕3⊕2⊕2⊕(8×1) = **50 stale pin sites**, ⊕ §PURGED-LIVE's **3** = **53 pins retired**, matching the headline. Rows 1–7 and 12–14 are **exactly** D-1's ten.

### §2.5 Non-pin hex, noted as ordered

- **`F-W3.md:69` — `5ad4277c6e5e`.** Not a digest: the tail of a session-scratchpad UUID inside a ⟨cmd⟩ path (`/private/tmp/claude-504/…/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/w3repair/census.py`). Correctly classed by the certificate at §RESIDUE (d). **Left alone; noted here so no successor purges it.**
- **86 occurrences pinning files outside the eleven** — `CENSUS-CANONICAL.md` (39 live ⊕ 22 struck) · `carry/F-W1-CARRY.md` 5 · `carry/F-W4-CARRY.md` 2 · the glass-ui O-20 letter 3 · `PASS-4/RULINGS-4.md` 2 · `../COHESION.md` 3 · `keyframes/waves/KF-W1.md` 3 · `waves/W9.md` 1 · `formation/fourier/CENSUS-2026-08-03.md` 2 · four frozen formation files 4. **Sum = 86, exact.** Out of scope for this purge and correctly declared so — *"named as out-of-scope, not as clean."*
- **The probe's recall is not 1**, as the certificate itself discloses: the frozen corpus is cited at F-W1 `:644` by the **8**-hex commit sha `35fc8ebf`, invisible to a `{12}` probe. Any successor census of pins must state its width.

---

## §3 THE SPOT-VERIFICATION — **35 EDITS, EACH RE-MEASURED**

### §3.1 · D-3 — the self-count, **CURED STRUCTURALLY** ⟨4 edits⟩

⟨cmd⟩ this seat, over the **final** bytes: `for t in PAW-6 PAW-18 PAW-26 PAW-29; do /usr/bin/grep -oE "\b$t\b" F-W4.md | wc -l; done` → **`7 · 4 · 4 · 8`**.

| # | edit | this seat |
|---|---|---|
| 1 | F-W4 `:146` (§2.I) publishes `7 · 4 · 4 · 8` | ✔ **identical to my re-run** |
| 2 | F-W4 `:462` (§Y.2 item 3) publishes `7 · 4 · 4 · 8` | ✔ identical, and identical to `:146` |
| 3 | both errata written **token-free** | ✔ **measured**: each of the four tokens occurs **exactly once** at `:146` and **exactly once** at `:462` — i.e. only inside the published loop. No corrective prose spells an audited id. |
| 4 | the receipt of record is the **CLASSIFICATION**, integers demoted to its dated measurement | ✔ present at `:146`; and the classification is TRUE at the bytes — the four are booked as one row each at `:147` `:148` `:149` `:150`, and F-W3 §X.1 `:837` hands them over with **F.W4** in column 3, the declared twin partition |

⊘ **`7 · 3 · 3 · 7` still returns 2 — and both are correct practice.** Both sit inside dated strike narration (*"round 5 corrected the first member to `7 · 3 · 3 · 7` and its own corrective sentence spelled each of the four audited ids once more"*), never as a live claim. This is the F-W7 *"four negatives"* handling PASS-6 §3 blessed. **The fixed-point equation is dissolved, not re-solved**: the erratum no longer moves the figure it publishes.

### §3.2 · D-5 — F-W6 `:470`, both halves ⟨2 edits⟩

| # | edit | this seat |
|---|---|---|
| 5 | the count word | ⟨cmd⟩ `grep -noE 'R-5 qualifies exactly \*\*[a-z]+\*\*' F-W6.md` → **∅**. `:470` now reads *"R-5 qualifies **at least TEN** colliding tokens"* and **reads the roster from §0 rather than re-counting it**. The ten listed (`M-13` `L-B1` `L-M3` `C-17` `C-18` `B-1` `B-2` `C-2` ⊕ `M-10` `M-9`) **count to ten** and match §0 `:65`'s REST-20 clause verbatim. |
| 6 | the struck four-spelling detector | `:470` now carries ⌧ *"retained as dated round-3 provenance and **STRUCK AS AN OPERAND** … **it is NOT a co-equal falsifier here**"*. `grep -noE 'four-spelling'` → `248 · 470 · 526 · 526` — same four occurrences, but `:470` is now a strike face, not a live forward direction. |

### §3.3 · D-6 — MID-42's per-clause holder marks ⟨5 edits⟩

**Corpus movement: 8 holder marks of any spelling → 25.** All five clauses PASS-6 §4.6 named as bare now carry a mark **at their own site**:

| # | clause | line | the mark |
|---|---|---|---|
| 7 | `FR-IC-6` | `:143` | `FR-IC-6 (→L·m-7) ⟨**LEG — held at F-W4**⟩` |
| 8 | `HLG-23` | `:156` | `HLG-23 (C:C-12) ⟨**LEG — held at F-W4**⟩` |
| 9 | `FR-GSB-1` | `:182` | `**and FR-GSB-1** ⟨**LEG — held at F-W4**⟩ **fold here**` |
| 10 | `GAB-17` | `:183` | `GAB-17 (D-M7/C-11/L·D-13) ⟨**LEG — held at F-W4**⟩` |
| 11 | `VV-R2-B` | `:186` | `VV-R2-B (MAJOR · NEW, the FRAME row…) ⟨**LEG — held at F-W4**⟩` |

⊘ **R4-6's half is now discharged alongside P5-8's.** *"A reader at clause B5 still does not know"* is no longer true: `:156` is clause B5 and it names the holder inline. Marks land at 19 distinct clause lines beyond `:275`'s ▲ block, four of them carrying both an F-W3 and an F-W4 leg.

### §3.4 · D-8 ⊕ D-10 — the locale-declared re-cut ⟨2 edits⟩

| # | edit | this seat |
|---|---|---|
| 12 | locale declared **in the command line** | F-W10 `:296`: `LC_ALL=C /usr/bin/sed -n '49p' fr-ExportModal.md \| LC_ALL=C /usr/bin/tr '·' '\n' \| LC_ALL=C /usr/bin/grep -n 'L-16'` — **all three stages**. ⟨cmd⟩ this seat, re-run at `registry/adjudicated/` → `19: L-16 → fr-BasisCanvas :106, NO-WAVE-OWNER `. **Reproduces exactly.** Under `LC_ALL=en_US.UTF-8` I get `10:` — the 10 ↔ 19 flip the cell now documents. `grep -c LC_ALL` across all eleven: **F-W10 only, 1 site** — the sole `tr '·'` receipt, as declared. |
| 13 | the one-space paste (D-10) | ⟨cmd⟩ this seat, `od -c` over the piped output → `1 9 : ␣ L - 1 6 ␣ → …` — **ONE `0x20` after the colon**, and the record's own single trailing space before `\n`. The published paste is **byte-true to the re-run**, including the trailing byte, which the cell declares in terms. |

### §3.5 · D-9 — the last fabrication, cited to its holder ⟨4 edits⟩

| # | edit | this seat |
|---|---|---|
| 14 | F-W10 `:94` cite-the-holder row | `\| fr-Tooltip:26 \| **FR-TT-1** (promotion note) \| **F.W4** ⟨**CITED — the canonical's holder; NOT booked by either twin**⟩ \|` — and the canonical homes it **F.W4** at `:4637` and in the F.W4 roster `:5074` (*"**fr-Tooltip** (1): `FR-TT-1`"*). **The booking is gone; the citation names the canonical's own holder.** |
| 15 | F-W9 `:205` — the twin half, in the same pass | ⟨cmd⟩ `shasum -a 256` of the two extracted lines → **`f481699d…` for both**; `diff` empty. **Δ=∅ across the shared §2.2 splice is PRESERVED** — G-F10-6 ≡ G-F9-21 survives the cure, which is precisely the trap a unilateral edit would have sprung. |
| 16 | F-W10 `:3` — §2.5b's PENDING PAIRED EDIT discharged | ⌧ *"the `FR-TT-1` half is DISCHARGED at repair round 6"* |
| 17 | F-W10 `:33` — the §2.2 divergence addendum re-cut | now *"records two deviations and one discharged fabrication"* (`PAW-49→F.W0 · PAW-50→F.W4`), the third **RETIRED** |

⊘ **`fabricated` moves 1 → 0** on the certificate of this seat's own reading: the sole surviving fabrication PASS-6 §8 counted is cured, and cured in the *form* the check ordered — cite-the-holder, not re-home.

### §3.6 · D-12 — the posture verb ⟨2 edits⟩

| # | edit | this seat |
|---|---|---|
| 18 | F-W4 `:16` | `\| VERIFIED \| **NO** \| stamped only at X·F's sub-tranche release close…` — the declaration the eleventh spec lacked |
| 19 | F-W4 `:12` | the dated erratum naming D-12 and disclosing *"the program-wide zero-VERIFIED posture held in fact and was unstated at this end"* |

⟨cmd⟩ across all eleven: `VERIFIED` now occurs in **11 of 11** specs; ⟨cmd⟩ for any `VERIFIED … YES` spelling → **∅**. **Eleven of eleven declare it; zero assert it.**

### §3.7 · The canonical errata — **five filed, all five verified, and the arithmetic re-derived by this seat** ⟨16 edits⟩

**E6-1 (D-4, filed as *understated*) — the strike accounting, re-derived independently:**

| # | claim | my derivation |
|---|---|---|
| 20 | 19 rows struck across **four** records (D-4 named two, and 17) | 16 (NP) ⊕ 1 (MSP) ⊕ 1 (MPC, unfiled by any seat) ⊕ 1 (FMS, PASS-6's own *positive control*) = **19** ✔ |
| 21 | `fr-NotationPills` 55 → **39** | header reads **39 rows**; ⟨cmd⟩ over the record's true span `:3833`–`:3876` → **39 banked-head rows**, and **0** standalone `K-2`…`K-17` rows. The band row survives, correctly spelled: `` `K-1..K-17` `` `<sub>band = 17 ids</sub>` → TERMINAL (∅). **Header, band and measured rows agree three ways.** ✔ |
| 22 | `fr-MorphShapePreview` 69 → **68** | header **68 rows** ✔ |
| 23 | `fr-MorphPhaseConfig` 63 → **62** | header **62 rows** ✔ |
| 24 | `fr-FourierMorphSvg` 33 → **32** | header **32 rows** ✔ |
| 25 | 34 duplicate ⟨record,id⟩ pairs | 16 ⊕ 8 ⊕ 9 ⊕ 1 = **34** ✔ (D-4's own figure was 24) |
| 26 | band expansion 60 → **45** extra ids | the two struck bands carried 7 ⊕ 8 = **15** extra ids; 60 − 15 = **45** ✔ |

**E6-2 (D-7) — the band spelling:**

| # | claim | my derivation |
|---|---|---|
| 27 | five malformed §2 spans cured | ⟨cmd⟩ `awk '/^## §2/,/^## §3/' \| grep -ohE '`[^`]+\.\.[^`]+`' \| sort -u` → **four spans, all clean**: `FM-17..FM-19` · `FM-4..FM-16` · `K-1..K-16` · `K-1..K-17`. Three re-spelled, two vanished with E6-1's struck bands. ✔ |

**E6-3 (D-13a ⊕ D-13c) — the arrow-clause re-derivation, actually run:**

| # | claim | my derivation |
|---|---|---|
| 28 | 49 killed-claims rows re-homed | ⟨cmd⟩ `grep -c 'errata R6 E6-3, 2026-08-29'` → **49**, exactly. Movement: F.W0 −2 · F.W1 −28 · F.W2 −4 · F.W3 −9 · F.W4 −5 · F.W5 −1 = **−49** ✔ |
| 29 | wave-duty 2515 → **2466** | 2515 − 49 = **2466** ✔ |
| 30 | `fr-PathPreview K7` **MOVES** — D-13(c) ruled by the same act | present and reasoned at the bytes; the *"flagged, not moved"* residue is closed ✔ |

**E6-4 (D-13b) — the alias orphan:**

| # | claim | my derivation |
|---|---|---|
| 31 | `fr-PathPreview` `C-10` STRUCK, 53 → **52** | ⟨cmd⟩ over the record → **0** standalone `` `C-10` `` rows; header reads **52 rows** with its round-6 errata note ✔ |

**E6-5 — a derived total corrected against interest:**

| # | claim | my derivation |
|---|---|---|
| 32 | §4.2 `289` → **282** | the five criterion-negatives' own headers, measured by this seat: `fr-BasisCanvas` **79** ⊕ `fr-ContourEditorCanvas` **73** ⊕ `fr-EquationResult` **46** ⊕ `fr-GalleryAdminBanner` **52** ⊕ `fr-FourierMorphSvg` **32** = **282** ✔ (283 before E6-1). None of the five is `fr-PathPreview`, so E6-4's −1 correctly does not enter this sum. |

**§3 TOTALS — re-summed a third time, and re-derived here from the round-5 base:**

| # | figure | published | my derivation |
|---|---|---|---|
| 33 | ROWS | **4242** | 4262 − 19 (E6-1) − 1 (E6-4) = **4242** ✔ |
| 34 | ids after band expansion | **4287** | 4242 ⊕ 45 = **4287** ✔ |
| 35 | TERMINAL (∅) | **1220** | 1190 − 18 (E6-1) ⊕ 48 (E6-3) = **1220** ✔ |
| — | UNROUTED | **307** | 307 ⊕ 1 (E6-3) − 1 (E6-4) = **307** ✔ |
| — | SS-13 | **134** | 135 − 1 (E6-1) = **134** ✔ |
| — | F.W0 · F.W1 · F.W2 · F.W3 · F.W4 · F.W5 | 55 · 330 · 23 · 919 · 1007 · 27 | 57−2 · 358−28 · 27−4 · 928−9 · 1012−5 · 28−1 ✔ **six of six** |

⊙ **The independent closure that is not a re-derivation but a measurement.** ⟨cmd⟩ `awk` summing the **23 home rows** of §3's table, `TOTAL` excluded → **4242**, equal to the published `TOTAL` to the unit. The census's internal consistency is not asserted here; it is computed.

---

## §4 LANDED WRONG — **3, all in `PIN-PURGE-CERT.md`, all count-shaped**

> Filed here and **nowhere else**: this seat edited nothing.

### LW-1 · **the headline's citation-site count is off by one — 43 published, 42 true**

`PIN-PURGE-CERT.md` ¶4 publishes *"Fifty-three inline wave-spec digest pins are retired to this certificate across **forty-three citation sites in nine specs**."* **The true figure is 42**, proved two independent ways that agree per-spec:

⟨cmd⟩ this seat: `grep -n 'PIN-PURGE-CERT.md §TABLE' F-W*.md | awk -F: '{print $1":"$2}' | sort -u | wc -l` → **42**, distributed **F-W0 8 · F-W1 4 · F-W2 10 · F-W3 1 · F-W4 1 · F-W6 5 · F-W7 7 · F-W8 1 · F-W9 5**.

⟨cmd⟩ this seat: the **certificate's own** §PURGED ⊕ §PURGED-LIVE coordinate lists, de-duplicated — F-W0 {29,150,154,172,186,335,455,457} · F-W1 {437,449,450,726} · F-W2 {184,282,284,301,302,447,448,449,450,451} · F-W3 {787} · F-W4 {295} · F-W6 {48,49,50,51,52} · F-W7 {51,52,53,54,55,56,57} · F-W8 {40} · F-W9 {341,342,343,344,345} = **8·4·10·1·1·5·7·1·5 = 42**, **matching the live measurement spec for spec, all nine.**

⊘ 43 matches **neither** available metric: the certificate's own S-3 measures **44** *occurrences* (two lines carry two citations each) and the distinct-site count is **42**. The "nine specs" half is exact. **LOW** — the purge's substance is untouched; the number is simply between its own two receipts.

### LW-2 · **§RECEIPTS S-6's *after* cell overstates the survivors — 6 published, 5 true**

S-6's *after* cell reads **"6 digests / 4 specs, history position only"**. ⟨cmd⟩ this seat, over D-1's ten superseded digests one at a time: exactly **five** survive — `a89c3386f3f8` · `a1302689aaa3` · `39e1a60b3fc9` · `bb58dc400cff` · `5cc3346db23e`. The other five (`282f0c120cd4` · `132c03192176` · `e9a9c3016f4c` · `c8c6d1d7f136` · `1e3698adf4ff`) return **0 specs each**.

⊘ **The certificate's own §RESIDUE (b) names exactly five**, so the file disagrees with itself by one; the "4 specs" half is exact ({F-W0, F-W1, F-W3, F-W9}), and the load-bearing clause — *"history position only"* — is **TRUE**, verified line by line at §2.3 above. **LOW.**

### LW-3 · **§WHAT-THIS-SEAT-DID-NOT-DO item 2 asserts a corpus-wide universal that the round falsifies at F-W4**

Item 2 reads: *"**No line numbers moved in any spec.** Every edit is within-line. **Every `:NNN` address in every check, seal, union and work order still resolves to the content it named.**"* The first two sentences are true **of the purge seat**. The third is a universal over the corpus **as the certificate leaves it**, and it is **FALSE**.

⟨cmd⟩ this seat: `git diff --numstat` → every wave file has adds = deletes **except `F-W4.md`, 9/3**; `git diff -U0` gives the hunk header **`@@ -11,0 +12,6 @@`** — the D-12 repair inserted **six lines** after `:11`, shifting every F-W4 address below `:12` by **+6** (the diff's own later hunks confirm: `-140 → +146`, `-289 → +295`, `-456 → +462`).

**Both of `PASS-6/CHECK.md`'s F-W4 coordinates are broken by it:**

| cited | claimed content | at that line now | where the content went |
|---|---|---|---|
| `F-W4.md:338` (CHECK `:66`) | the suffix-elision chains | an unrelated `GM-6` F.W1-rider row | `:344` |
| `F-W4 :458` (CHECK `:113`) | §Y.3's residual-string declaration | **blank line** | `:464` |

⊘ **The blame is not the purge seat's** — its own edits were within-line, and the D-12 insertion is a *correct* cure that had to add lines. What is wrong is a seat certifying, from inside its own edit set, a property of edits it did not make. **That is D-3's class exactly**, one instrument up: a whole-corpus claim stated as fact by a seat with a one-seat view. **LOW–MEDIUM.** Its practical cost is real but bounded: a round-7 seat re-running PASS-6's two F-W4 coordinates lands on a blank line and an unrelated row.

---

## §5 OBSERVATIONS — recorded, **not** counted as landed wrong

1. **E6-2's *"The malformed spelling is now absent from this file"* is falsified by its own row.** ⟨cmd⟩ `grep -nE '`[^`]*\.\.[^`]*\([0-9]+ ids\)[^`]*`' CENSUS-CANONICAL.md` → **`:142`** (E5-10 quoting the defect it cured) and **`:179`** (E6-2 quoting the two spans that vanished with E6-1's bands). **No live band row carries the spelling** — both survivors are dated errata quotations, lawful under E-3 and the same practice PASS-6 §3 blessed for F-W7's *"four negatives"*. **The cure is real; only the universal's wording over-reaches**, and it should read *"absent from the census rows."*
2. **The census pin `3e0a9acb3381` is stale in all eleven specs, 39 sites.** ⟨cmd⟩ this seat: 39 occurrences, 11 of 11 files, against the canonical's true `b6d8d858c387`. **Disclosed by the certificate against interest** at §ERRATA item 2, correctly **routed to the canonical's seat and not executed** by a seat E-3 forbids to edit dated instruments. **This is a round-7 duty, not a round-6 defect** — and it is the sharpest available proof of §WHY: a single-writer operand with no cycle at all still could not keep 39 inline copies true for three hours.
3. **`PIN-PURGE-CERT.md` §ERRATA item 1 (D-11) is exact.** ⟨cmd⟩ this seat: `awk 'NR>=642 && NR<=673 && /^\|/' F-W1.md | wc -l` → **26**; the lines are `646`–`671`; `:671` is the `fr-EquationView` **`vue-tsc`** disposal row. **The seal's `25` was off by one and its prose was right**, exactly as filed. That this remains re-derivable *after* the purge is itself a receipt for the within-line edit shape.
4. **D-1 and D-2 are closed by construction and by issuance respectively** — and the certificate is right to refuse to certify itself (*"no certificate issues its own conformance"*). **This seal is that successor re-run**, and the re-run passes on every load-bearing claim.

---

## §6 WHAT THIS SEAT DID NOT DO

1. **Edited nothing.** No wave, no canonical, no certificate, no check, no prior seal. The three landed-wrong findings live only in this file.
2. **Inherited nothing.** Every figure in §1–§4 is this seat's own command output. Where a published figure and my measurement agree, they agree because both were taken, not because one was copied.
3. **Adjudicated nothing.** LW-1…LW-3 are measurements. No home, booking, roster line, grade or gate was touched or re-graded.
4. **Claimed no conformance verdict.** The bar is PASS-6 §8's and the adjudication is the round's, not this seat's. What this seat certifies is narrower and it is stated exactly: **the round-6 edits landed, the purge is real, the certificate is unvoided, and three counts inside the certificate are wrong.**

---

## §7 THE HASH BLOCK — TAKEN AS THE ABSOLUTE LAST ACT

⟨cmd⟩ this seat, 2026-08-29, base `/Users/mkbabb/Programming/value.js`, pinned BSD toolchain, **after every write of this session including this file's own body** — no write of any kind follows it:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Output, pasted whole:**

```
d26cc4630f80167b09a69027d3af9e14b5aa61de9d019b441dd2064798aef603  docs/tranches/X/fourier/waves/F-W0.md
fc3e28d3a5f88340097bd80035be7e4fdf9601f55a8e577e0ed4791590e4ee9b  docs/tranches/X/fourier/waves/F-W1.md
80eff6ad1a26ae48140917eb9122cc40e19523fc88047eff11b0a7962efa6c84  docs/tranches/X/fourier/waves/F-W10.md
02c5ba9448f5de3a04f78f36aecb5687e3e080dc87e3681d70c3cbd1ee5c61ab  docs/tranches/X/fourier/waves/F-W2.md
ae589556a1b210a48b81f4031f6857baea4252befb1e85fd131033b31b4129dc  docs/tranches/X/fourier/waves/F-W3.md
d503170c111bf61bad8eafe5c4eea7ba4b29574b6d91cc92c1ac8f572f1e2fc1  docs/tranches/X/fourier/waves/F-W4.md
a5ce07de3e6d87281014df73d0fa7ac285f85c56e4c09c7158a492b237e94802  docs/tranches/X/fourier/waves/F-W5.md
2d9969fb83205abce3ff6d5d3334fbff31196f4e417e67e9c1e851add32dfc58  docs/tranches/X/fourier/waves/F-W6.md
c03cf709a963d8b2d37410888eef03210f5290ea1e3cd0427c32664dfb285d5b  docs/tranches/X/fourier/waves/F-W7.md
6c1408766fd05cdec70303d161d6b5fd8ba99b4bef6288edd246984c574070e7  docs/tranches/X/fourier/waves/F-W8.md
459d959db1569cc86bb24bd5e334bd2ad742abdfccec7c87e08e44465a5d0624  docs/tranches/X/fourier/waves/F-W9.md
b6d8d858c3875f2afe1af95bb7c6f3e504610726a4f2f1ebd6be1df49fc7766b  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
52264bcce7c938558a2cdb7a9c88abf7ae302a5beed7367b9b53e415e579c087  docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**— sealed 2026-08-29 by the X·F round-6 SEAL SEAT. Verify-only; nothing edited. 35 edits verified, 3 landed wrong, all three in the certificate and all three count-shaped. No write follows this block. —**

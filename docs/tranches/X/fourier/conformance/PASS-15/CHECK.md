# PASS-15 · CHECK — X·F round 15, a fresh adversarial whole-corpus check (L-18 / L-20)

**Seat**: CHECK, X·F round 15 · **2026-08-30** · base `/Users/mkbabb/Programming/value.js`, pinned BSD toolchain.
**Posture**: **READ-ONLY over the whole fourier tree.** This seat wrote exactly one file — this one. Zero bytes of any spec, of `CENSUS-CANONICAL.md`, of `PIN-PURGE-CERT.md`, or of any prior PASS directory were written or amended.
**Operand**: the eleven `waves/F-W*.md` at the round-14 settled bytes · `conformance/CENSUS-CANONICAL.md` **FROZEN at `f44362757458`** (verified, §1) · `conformance/PIN-PURGE-CERT.md` incl. `§ERRATA-R7..R14` · `conformance/PASS-14/SEAL.md` · the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` carrying `F-W1-CARRY.md` and `F-W4-CARRY.md` only.

⊘ **SELF-EXCLUSION, DECLARED FIRST AND BEFORE ANY COUNT IN THIS FILE.** Every enumeration below was measured **excluding this file's own bytes**, which are **an operand for no gate**. This is the `F-W0:598` / `§ERRATA-R14:758` clause, adopted deliberately — and §4 below shows exactly why a successor that publishes a bare figure there re-creates `:707`'s defect a fourth time.

---

## §0. VERDICT

> # **CONFORMANT.**

| axis | result |
|---|---|
| **Hash re-verification (13 files vs `PASS-14/SEAL.md` §9)** | **GREEN — byte-identical, 13/13** |
| **Canonical freeze** | **GREEN — `f44362757458`, SEVENTH consecutive round** |
| **THE ROSTER — boundary-exact subtraction, proved at the id level** | **GREEN — closes at ZERO; 23 sections, header = Σ(N) = Σ(ids) in all 23** |
| **Canonical-row paste sweep** | **GREEN — zero mismatches** |
| **The pass-14 register (7 items), individually re-derived at the bytes** | **GREEN — 7/7 CLOSED** |
| **Comparator A ⊕ B over ALL 11 — `D13-1`'s class** | **GREEN — measured member count ZERO** (A: 99 hits / 8 read-whole / **8 acquitted, 0 convicted**; B: 3 pairs / 0 unchased) |
| **Digest-pin reality sweep (49 distinct 12-hex tokens, 180 occurrences)** | **GREEN — every live pin resolves; every non-live token dated, struck or declared** |
| **Receipts re-run (55, incl. every round-14 cure)** | **GREEN — 55/55 byte-exact. FABRICATION ZERO.** |
| **Coordinate sweep (261 cross-file ⊕ 179 registry `sed`)** | **GREEN — ZERO dead live coordinates** |
| **Self-count probe** | **AMBER — 29 found; 27 dated/declared, 1 licensed on its own line, 1 STALE (D15-1, LOW)** |
| **Gates + posture** | **GREEN with one MINOR (D15-2)** |
| **BLOCKER / CRITICAL / HIGH** | **ZERO** |

**Tail: 1 MINOR · 1 LOW · 1 INFO, each with a stated mitigation. Nothing material survived. Fifteen passes; fabrication ZERO and roster ZERO for an eighth consecutive round.**

⊙ **Stated against interest, because the bar requires it in both directions**: this seat *did* find two fresh, previously-unfiled defects, and it files them rather than smoothing them to reach a clean sheet. Neither is material. **`D15-1` is a stale receipt whose conclusion is proved un-stale-ably thirty lines below it, in the same section, by the cured form of the identical probe. `D15-2` is a single-site citation-form departure in a cross-reference that books nothing.** No census magnitude, roster row, home, grade or booking moves under either. Under the stated bar — *a MINOR/LOW with a stated mitigation does not block* — the corpus is **CONFORMANT**, and this seat says so plainly rather than manufacturing materiality to avoid the word.

---

## §1. FIRST ACT — hash re-verification against `PASS-14/SEAL.md`'s table

Taken as this seat's **first act**, before any other measurement.

⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md`

| # | file | `PASS-14/SEAL.md` §9 | this seat | ✓ |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `3d62e5f4e78b` | `3d62e5f4e78b` | ✓ |
| 2 | `waves/F-W1.md` | `ab2437af09e0` | `ab2437af09e0` | ✓ |
| 3 | `waves/F-W10.md` | `8ae0ad8fa623` | `8ae0ad8fa623` | ✓ |
| 4 | `waves/F-W2.md` | `0b967619bb35` | `0b967619bb35` | ✓ |
| 5 | `waves/F-W3.md` | `025db038cc44` | `025db038cc44` | ✓ |
| 6 | `waves/F-W4.md` | `2fb6e6d637bb` | `2fb6e6d637bb` | ✓ |
| 7 | `waves/F-W5.md` | `26aebcdc7bac` | `26aebcdc7bac` | ✓ |
| 8 | `waves/F-W6.md` | `e83dcad051f5` | `e83dcad051f5` | ✓ |
| 9 | `waves/F-W7.md` | `b5247b852f46` | `b5247b852f46` | ✓ |
| 10 | `waves/F-W8.md` | `d8237cf6b11e` | `d8237cf6b11e` | ✓ |
| 11 | `waves/F-W9.md` | `b265bf677869` | `b265bf677869` | ✓ |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | **`f44362757458`** | ✓ |
| 13 | `conformance/PIN-PURGE-CERT.md` | `6e4059c8599c` | `6e4059c8599c` | ✓ |

⊙ **THIRTEEN ROWS, THIRTEEN BYTE-IDENTICAL. No mismatch; nothing convicts.**
⊙ **The canonical is FROZEN at `f44362757458` for a SEVENTH consecutive round.** ⊙ ⟨cmd⟩ `/usr/bin/grep -rn 'be86ae410118\|ba9be3e37613' waves/` → **∅ (exit 1)**: neither superseded digest is pinned literally in any of the eleven.
⊙ **Live-pin occurrence vector re-measured**: ⟨cmd⟩ `/usr/bin/grep -c 'f44362757458' waves/F-W*.md` → **5 · 13 · 2 · 6 · 9 · 4 · 5 · 4 · 2 · 6 · 3** (glob order) — reproducing `PASS-14/SEAL.md` §1 **element for element**, including the `F-W0 = 5` reading and its `§ERRATA-R12`-vs-`R13·b` reconciliation.

---

## §2. THE ROSTER — closes at ZERO, proved at the id level

**The subtraction was not adopted from any instrument.** This seat parsed `§2 PER-WAVE ROSTERS` mechanically: for each `### <home> — **N rows**` heading it summed the per-record parenthetical `(n)` and, independently, **counted the backticked id tokens themselves** (splitting on the ` · ` separator, *not* on the bare `·` that lives inside ids such as `C·D-27`, `L·D-3`, `D·D-M10` — the tokenizer trap that manufactures a false +104).

| home | header | Σ per-record `(N)` | Σ **ids counted** | band-expanded | ✓ |
|---|---|---|---|---|---|
| `F.W0` | 55 | 55 | **55** | 55 | ✓ |
| `F.W1` | 330 | 330 | **330** | 342 | ✓ |
| `F.W2` | 23 | 23 | **23** | 23 | ✓ |
| `F.W3` | 919 | 919 | **919** | 919 | ✓ |
| `F.W4` | 1007 | 1007 | **1007** | 1009 | ✓ |
| `F.W5` | 27 | 27 | **27** | 27 | ✓ |
| `F.W5-W8` | 89 | 89 | **89** | 89 | ✓ |
| `F.W9` | 16 | 16 | **16** | 16 | ✓ |
| `GLASS-RELAY` | 22 | 22 | **22** | 22 | ✓ |
| `NWO (packet)` | 32 | 32 | **32** | 32 | ✓ |
| `NWO→SS-13` | 3 | 3 | **3** | 3 | ✓ |
| `NWO→SS-3` | 27 | 27 | **27** | 27 | ✓ |
| `NWO→SS-5` | 3 | 3 | **3** | 3 | ✓ |
| `SS-1` | 5 | 5 | **5** | 5 | ✓ |
| `SS-13` | 134 | 134 | **134** | 134 | ✓ |
| `SS-2` | 7 | 7 | **7** | 7 | ✓ |
| `SS-3` | 9 | 9 | **9** | 9 | ✓ |
| `SS-4` | 3 | 3 | **3** | 3 | ✓ |
| `SS-5` | 2 | 2 | **2** | 2 | ✓ |
| `SS-6` | 1 | 1 | **1** | 1 | ✓ |
| `SS-7` | 1 | 1 | **1** | 1 | ✓ |
| `TERMINAL (∅)` | 1220 | 1220 | **1220** | 1251 | ✓ |
| `UNROUTED` | 307 | 307 | **307** | 307 | ✓ |
| **TOTAL** | **4242** | **4242** | **4242** | **4287** | ✓ |

⊙ **TWENTY-THREE sections. Header = Σ(N) = Σ(ids) in every one. ZERO malformed rows; ZERO unparsed lines.**

### 2.1 The boundary-exact subtraction

- **WAVE-DUTY** = `F.W0 ⊕ F.W1 ⊕ F.W2 ⊕ F.W3 ⊕ F.W4 ⊕ F.W5 ⊕ F.W5-W8 ⊕ F.W9` = `55+330+23+919+1007+27+89+16` = **2466** ✓ *(matches the frozen total exactly)*
- **RELAY/NWO/SS block** (the thirteen non-wave, non-terminal, non-unrouted homes) = **249**
- **TERMINAL (∅)** = **1220** ✓ · **UNROUTED** = **307** ✓

> **`4242 − 2466 − 249 − 1220 − 307 = 0`.**
> **The roster closes at ZERO, and it closes at the ID LEVEL, not at the header level.**

⊙ **A second, independent confirmation this seat did not go looking for and reports because it corroborates**: expanding the `K-1..K-17`-shaped bands by their own inline `<sub>band = N ids</sub>` declarations returns **4287** — *exactly* the canonical's declared `ids after band expansion` at §3. Two figures derived by one parse from one operand, agreeing without adjustment.

### 2.2 Three-way §1 = §2 = §3 identity, re-derived

⟨cmd⟩ 66 `### fr-… · **N rows**` headings summed independently: **66 records · 4242 rows**, **zero duplicate record names**.
⊙ **`§1 = §2 = §3 = 4242`** ✓ — the canonical's own claim, re-derived by this seat from three separate regions of the file.
⊙ **`§2` names exactly 66 distinct `fr-` records** ✓ — the roster's record-side domain is the census's, whole.

### 2.3 Canonical-row paste sweep — ZERO mismatches

Every wave-side citation of a canonical magnitude was bound to the canonical's own live authority set (61 magnitudes, extracted mechanically from §1 / §2 / §3) and to a superseded set derived mechanically from the canonical's own `read **N**` and `N → **M**` errata prose (44 numerals). **Zero pastes diverge from the operand in current voice** — the full instrument, its 99 hits and its 8 read-whole adjudications are at §5.

### 2.4 The five criterion-negatives, re-summed from scratch

⟨cmd⟩ `/usr/bin/awk 'NR==768||NR==1265||NR==2133||NR==2462||NR==2753' conformance/CENSUS-CANONICAL.md`
→ `fr-BasisCanvas` **79** · `fr-ContourEditorCanvas` **73** · `fr-EquationResult` **46** · `fr-FourierMorphSvg` **32** · `fr-GalleryAdminBanner` **52**.
⊙ **`79 ⊕ 73 ⊕ 46 ⊕ 32 ⊕ 52 = 282`** ✓ — re-derived left-to-right: `79+73=152` · `+46=198` · `+32=230` · `+52=` **282**.
⊙ Corroborated in two further independent places: canonical `:5496` reads `carry **282 rows**`; erratum `E6-5` at `:182` rules *"§4.2 289 → **282**"*.

---

## §3. THE PASS-14 REGISTER — seven items, individually closed at the bytes

| # | item | grade at round 14 | this seat's re-derivation | verdict |
|---|---|---|---|---|
| **D14-1** | `F-W3:780` — *"the five carry **289** rows"*, attributed to canonical §4.2 | MEDIUM, the round's blocker | ⟨cmd⟩ `/usr/bin/awk 'NR==780' waves/F-W3.md`: reads `carry **282 rows**` ✓ · chase tokens `errata` · `chased` · `E6-5` · `282` · `repair round` → **5 of 5** ✓ · stale `'289 rows'` on the line → **0** ✓ | **CLOSED** |
| **D14-2** | `F-W7:58` — `../COHESION.md` third column read `no` against a moved file | LOW | ⟨cmd⟩ `shasum -a 256 docs/tranches/X/COHESION.md` → **`956e71a83e32`** ✓; `:58` third column reads **YES** with the re-measurement inline ✓; the quote-time digest column left standing at `91c6d974db9b` under its own *"sha256-**at-quote-time**"* header — **correctly NOT cured**, the licensed `E-3` class ✓ | **CLOSED** |
| **D14-3** | blast radius of the `COHESION.md` move | — | all three quoted spans re-run at the moved bytes: `Cross-repo edges are declared FROM BOTH ENDS` **1/1** · `the value-side atomdiff restoration` **1/1** · `Every census wave-sketch id` **1/1** ✓ | **CLOSED** |
| **D14-4** | `F-W7:62` — the `⌧` minute's count-word | INFO | `:62` reads `TWO "no"s NOW FALSE` ✓; re-derived against the `§0(C)` table's own **ten** rows ✓; the *"FIVE STALE"* partition holds under the minute's own definitions (`KF-W1` sits in the `"no"` bucket, not the stale-pin bucket) — the six-strikethrough reading does **not** falsify it | **CLOSED** |
| **D14-5** | `§ERRATA-R13·b`'s unsourced *"108 → 108 / 101 → 101"* → instrument `R14-I2` | INFO | re-run in **both** states. Pre-cure `F-W5.md` recovered at `babc83ad^` → digest **`40bcad59cd2b`** ✓ (byte-identical to `§ERRATA-R13·b` row 6's *"old"*). **total 172 → 172 · distinct 132 → 132 · register lines 93 → 93 · line count 433 → 433 — INVARIANT in all four columns** ✓ | **CLOSED** |
| **D14-6** | instrument-A tally reconciliation across three tunings | INFO | this seat is a **FIFTH** independent instrument (99 / 8) and lands on the **same adjudicated outcome** the other four did. §ERRATA-R14·c's thesis — *tally is tuning-dependent, adjudicated outcome is not* — now holds across five instruments | **CLOSED** |
| **D14-7** | `PASS-13/SEAL.md` §2.1's bolded `**16**` inside a quotation | INFO, ruled LAWFUL | quotation-of-cure; no value misstated; dated instrument history under `E-3`. **Licensed — not re-filed.** | **CLOSED** |

**7 of 7 closed at the bytes. `LANDED-WRONG` findings against either round-14 cure: ZERO.**

⊘ Both anchor drifts `PASS-14/SEAL.md` disclosed (`:780` unbolded, not bolded; the `:62` minute at `:62`, not `:60`) are confirmed accurate at these bytes. **The certificate disclosed them rather than smoothing them, and the disclosures are true.**

---

## §4. THE `:707` SWEEP — re-measured, with its scope declared BEFORE its number

⟨cmd⟩ `/usr/bin/grep -rn '289 rows' waves/ conformance/`, run exactly as `:707` publishes it, from `docs/tranches/X/fourier`.

⊙ **Raw return: TWENTY-TWO.** ⊙ **Under this seat's declared-first self-exclusion ⊕ `§ERRATA-R14`'s (`PIN-PURGE-CERT.md` `≥:756`, five hits) ⊕ `PASS-14/SEAL.md`'s own declared self-exclusion (four hits): THIRTEEN.**

| scope | hits |
|---|---|
| `waves/F-W0.md:598` (the lawful, self-excluded `R11-6` addendum) | 1 |
| `conformance/CENSUS-CANONICAL.md:182` (the frozen `E6-5` ruling) | 1 |
| `conformance/PIN-PURGE-CERT.md:707` | 1 |
| `PASS-13/SEAL.md` `:120` `:132` `:134` `:143` | 4 |
| `PASS-14/CHECK-RETURN.json` `:6` `:15` `:16` | 3 |
| `PASS-14/CHECK.md` `:128` `:232` `:382` | 3 |
| — **EXCLUDED**: `PIN-PURGE-CERT.md` `:762` `:764` `:766` `:770` `:827` (§ERRATA-R14's own bytes) | 5 |
| — **EXCLUDED**: `PASS-14/SEAL.md` `:82` `:153` `:169` `:264` (that seal's own bytes, self-excluded at its head) | 4 |
| **SCOPED TOTAL** | **13** |

⊙ **`waves/F-W3.md:780` IS NOT AMONG THEM** ✓ — the round-14 cure removed it from the sweep, exactly as `¶766` and `PASS-14/SEAL.md` §4 claim.
⊙ **`waves/F-W0.md:598` is the ONLY `'289 rows'` anywhere in `waves/`** ✓ — the universal holds at these bytes.
⊙ **ZERO of the thirteen is a corpus defect.**

▲ **`PASS-14/SEAL.md` §4's structural note is CONFIRMED BY A FRESH MEASUREMENT, and that is the point of recording it here.** The raw return moved **4 → 8 → 18 → 22** across rounds 13, 14's check, 14's seal and this pass, and **every increment is a self-match of the quoted pattern inside a new instrument**. The delta 18 → 22 is *precisely* `PASS-14/SEAL.md`'s own four quotations, and nothing else. **The seal predicted this file's measurement before this file was written, and it was right.** *(Filed **INFO — `D15-3`**. Not a defect: a property. It never blocks, and it is recorded only so a successor declares a scope instead of publishing a bare figure.)*

---

## §5. THE COMPARATORS, ALL ELEVEN SPECS — the measured member count

**Both instruments were built from scratch by this seat.** The superseded set (44 numerals) was derived **mechanically from the canonical's own `read **N**` and `N → **M**` errata prose** — never transcribed from any instrument. The live authority set (61 magnitudes) was extracted mechanically from §1 / §2 / §3.

### 5.1 Instrument B — the four-form wave-magnitude comparator

Forms `F.W<k> (N)` · `F.W<k> …is/of/reads N rows` · `N-row F.W<k>` · `the N F.W<k> rows`, against the canonical's own §2 per-wave headings (`F.W0` 55 · `F.W1` 330 · `F.W2` 23 · `F.W3` 919 · `F.W4` 1007 · `F.W5` 27 · `F.W5-W8` 89 · `F.W9` 16, all extracted mechanically).

| pair | site | claimed | canonical | ✓ |
|---|---|---|---|---|
| 1 | `F-W0:25` | `F.W0` 55 | 55 | ✓ |
| 2 | `F-W3:40` | `F.W3` 919 | 919 | ✓ |
| 3 | `F-W10:363` | `F.W9` 16 | 16 | ✓ |

⊙ **3 pairs captured · 0 chased mismatches · ZERO UNCHASED MISMATCHES.** ✓ Reproduces `§ERRATA-R13·c` and `PASS-14/SEAL.md` §6.1 exactly. *(Pair 3 is `R4-10`'s licensed byte-true quotation — verified true, not re-filed.)*

### 5.2 Instrument A — census-attributed context binding

Every `\d{2,}` bound to a census noun (`N rows` / `N records` / `roster of N` / `N-row`) on a line carrying census attribution (`canonical|census|roster|operand|§2|§3|§4.2|§4.3|censused`), across **all eleven** specs.

⊙ **99 hits · 91 carrying an on-line chase · 8 READ WHOLE.**

**ALL EIGHT adjudicated on their face. Every one ACQUITS:**

| # | site | numeral | adjudication |
|---|---|---|---|
| 1 | `F-W0:114` | 28 | **ACQUIT** — the 28 dirty tree paths, derived on-line as `27 ` M` + 1 `??`` and enumerated item-for-item. Not a census magnitude. |
| 2 | `F-W0:581` | 1014 | **ACQUIT** — the dated `R11-3` minute *convicting* `F-W7:291`. Lawful `E-3`: it reports the defect, it does not assert the magnitude. |
| 3 | `F-W2:346` | 29 | **ACQUIT** — a byte-true record quotation of `fr-PathPreview` roster item 7, expressly *"NOT A CENSUS ROW IN ANY WAVE"*. |
| 4 | `F-W2:423` | 307 | **ACQUIT — AND THE DETECTOR IS WRONG, NOT THE SPEC.** `307` entered the superseded set from the canonical's `:5386` *"read 307; **total HELD**, composition moved"*. But `307` is **LIVE**: `### UNROUTED — **307 rows**`, `:5480` `UNROUTED \| 307`, `:5502` *"**307 rows are UNROUTED**"*. This is the trap `PASS-14/SEAL.md` §6.2 filed forward against no one; **this seat's instrument fell into it exactly as predicted and caught it by adjudication.** |
| 5 | `F-W2:436` | 29 | **ACQUIT** — the §8c index, *"no gate weight"*. Re-derived: `A×7 ⊕ B×13 ⊕ C×2 ⊕ D×4 ⊕ E×2 ⊕ F×1 = 29` ✓, and ⟨cmd⟩ a token count of `:438` returns **29** ✓. |
| 6 | `F-W3:65` | 66 | **ACQUIT — same over-capture class as #4.** `66` entered the superseded set from canonical `:1905`'s per-record round-4 note; the line's use is *"**66 of 66** records"* — the canonical's **live** `records censused`. |
| 7 | `F-W3:709` | 66 | **ACQUIT** — *"applied uniformly to all **66 records**"*. Same live figure. |
| 8 | `F-W8:163` | 28 | **ACQUIT** — the wave's own carry table; `38 − 5 − 5 = 28` ✓ re-derived. |

### 5.3 THE MEMBER COUNT — measured, not assumed

> ## **SURVIVING MEMBERS OF `D13-1`'s CLASS: ZERO.**
> **Instrument B: 3 pairs, 0 unchased mismatches. Instrument A: 99 hits, 8 read whole, 8 acquitted, 0 convicted.**
> **This seat MEASURED zero. It did not assume zero, and it did not certify zero without enumerating and adjudicating every candidate its own instrument raised.**

⊙ **`F-W3:780` appears in NEITHER instrument's read-whole bucket.** The round-14 cure removed it from the instrument that convicted it — verified, not inherited.
⊘ **Round 13's comparator claim of closure was FALSE at the time and the certificate said so. This seat re-measured the member count rather than certifying it, states what it measured, and states its method: 5 read-whole candidates fewer than round 14's fifteen, because a broader live-authority set correctly pre-acquits the `307`/`66` class before it reaches adjudication.** The tally differs from all four prior runs (`48/41/7` · `49/42/7` · `54/39/15` · `66/51/15`); **the adjudicated outcome is identical to all four.** Five instruments, five tunings, **one answer.**

---

## §6. DIGEST-PIN REALITY SWEEP — every 12-hex token in the eleven

⟨cmd⟩ harvest of every `` `[0-9a-f]{12}` `` span across `waves/F-W*.md`: **49 distinct tokens · 180 occurrences.**

**Every LIVE pin resolves, re-measured by this seat:**

| token | subject | measured | ✓ |
|---|---|---|---|
| `f44362757458` (64 occ) | `conformance/CENSUS-CANONICAL.md` | `f44362757458` | ✓ |
| `956e71a83e32` (3) | `../COHESION.md` | `956e71a83e32` | ✓ |
| `919e484b8a60` (2) | `../keyframes/waves/KF-W1.md` | `919e484b8a60` | ✓ |
| `0d0b091e86ca` (5) | `carry/F-W1-CARRY.md` | `0d0b091e86ca` | ✓ |
| `bf1da6fe1e7e` (2) | `carry/F-W4-CARRY.md` | `bf1da6fe1e7e` | ✓ |
| `820bd500999f` (1) | `../waves/W9.md` | `820bd500999f` | ✓ |
| `1a5caf437d54` (1) | `$M/lane-docs.md` | `1a5caf437d54` | ✓ |
| `4433d809fac7` (1) | `$M/lane-frontend.md` | `4433d809fac7` | ✓ |
| `684de3d8a8a0` (2) | `$M/CENSUS-2026-08-03.md` | `684de3d8a8a0` | ✓ |
| `40bcad59cd2b` | pre-cure `F-W5.md` at `babc83ad^` | `40bcad59cd2b` | ✓ |

⊙ **NINE live pins across four trees, ALL EXACT** — and three of them (`$M/lane-docs` · `$M/lane-frontend` · `$M/CENSUS-2026-08-03`) were verified by **no prior pass, check or certificate in fifteen rounds**. This seat resolved `$M` from `F-W9:316`'s own declaration and hashed the files. **Every one holds.**

**Every non-live token is dated, struck or declared** — 4 all-struck (`40c1a5f5a576` · `91c6d974db9b` · `b11f08894b9d` · `ee33bf25cb2a`), 8 mixed struck→live chains (`a450b8e9f80e` → `3e0a9acb3381` → `f44362757458` etc.), and the remainder carried inside dated round-history minutes (`052731a56a12` = *"at the pass-10 check's bytes"*; `83ffe83cb37f` = *"the PRE-REPAIR bytes of this file … disclosed as a DATED PRIOR RUN and not re-pasted as a live figure"*; `69b05ccbb320` · `cd64d6580098` · `d9f3c812cf36` · `6f8d3b948982` · `f82115ddeb89` · `c00ec40d8673` = `F-W7:64`'s six mid-round drift observations). **ZERO tokens present a stale digest as a live pin.**

---

## §7. COORDINATE SWEEP — zero dead

**(a) Cross-file / intra-file coordinates.** 261 citations of the forms `File.md:N`, `sed -n 'Np' file`, `awk 'NR==N' file` captured across the eleven and resolved against the live tree.

- **253 resolve live to a non-blank line.**
- **4 are `grep -c` OUTPUTS, not coordinates** — `F-W1.md:0` · `:1` · `:2` and `F-W1-CARRY.md:0`, the `file:count` shape. `F-W1:697` names the class in terms: *"(ii) `grep -c` outputs of the form `F-W1.md:1`"*. Detector over-capture, **ACQUIT**.
- **2 are the SAME struck coordinate quoted inside its own erratum** — `F-W3.md:783`, at `F-W9:505` (which carries the full chase: *"the citation read `F-W3.md:783`, and at the settled bytes `:783` is a BLANK LINE … drifted +32 to `:815`"*) and at `F-W0:582` (the `R11-3` minute that found it). ⟨cmd⟩ re-run: `F-W3.md:815` resolves live to `| fr-AdminFlaggedPanel FR-AFP-42 | the seam; test seat → F.W9/W10 | **F.W4** |` ✓. **Dated chases, ACQUIT.**

**(b) Registry coordinates.** ⟨cmd⟩ all **179** `sed -n 'Np' fr-*.md` receipts resolved against the frozen 66: **179 live, 0 blank, 0 out-of-bounds.**

> **DEAD LIVE COORDINATES: ZERO.** *(Twelve are enumerated above by name; the bar asked for ≥8.)*

---

## §8. GATES AND POSTURE

| gate | measured | verdict |
|---|---|---|
| **Canonical operands only** | `CENSUS-CANONICAL` cited in all 11 (14·19·13·9·16·10·11·9·9·13·8). `CENSUS-2026-08-03.md` appears at 58 sites and is an **operand at none** — `F-W9:83` declares it (*"named at three sites and an operand at none"*), and a targeted probe for a rival row-denominator returns **1 hit**, which is `F-W4:315`'s own chased singles list, not a borrowed census | **GREEN** |
| **Portable commands** | `-P` / `\K` / lookaround: the only occurrences are `F-W4:447` and `F-W4:464`'s **§Y.3 RESIDUAL-STRING DECLARATION**, written expressly *"so a mechanical pass does not re-file a cured defect"*. `.{n,m}` bounds: all within the declared BSD ceiling (widest standing `.{0,190}`, law at `F-W6:24` / `:611`) | **GREEN** |
| **No false universals in current voice** | every universal this seat could falsify was run: roster closure (§2), `F.W6`/`F.W8` = **0** in the corpus, `F.W7` = **2** and both inside `KF.W7` at `fr-Tooltip`, bare `F.W10` = **0** records, `F-W0:598` is the sole `'289 rows'` in `waves/`, stale-pin sweep ∅. **None falsified** | **GREEN** |
| **Count-words match lists** | 18 count-word/list pairs captured; **all 18 reconcile on their line's own terms** (`F-W0:198` 3-limbs-in-2-forms · `F-W2:172` 5 sites/3 files · `F-W2:262` `5 ⊕ 1 = 6` · `F-W5:152` `3 ⊕ 1 = 4` · `F-W6:470` `8 ⊕ 2 = 10` · `F-W8:328` `1 ⊕ 5 = 6` · `F-W3:416`'s SIX configurations corroborated at `:664`'s *"all six runs"*). **Zero count-word defects** | **GREEN** |
| **`F.W1` transaction whole** | `F-W1:276` carries the atomic transaction as **ONE change (G6)**, all limbs on one row — producer bump (glass ⊕ keyframes ⊕ value, lockstep per MPC-14) · 162-attribute Button rewrite (G8-preserving) · `copied`→`status` triple · lucide rename (35 imports, +1 `D·D-M11`, 17 hand-svgs ledgered) · G10 disclosure deletions · FR-EQC-7 vaul. Intra-wave order binding at `:272`–`:277` | **GREEN** |
| **`F.W7` / `F.W6` / `F.W10` zero-roster postures** | proved **at the corpus**, not asserted: ⟨cmd⟩ `/usr/bin/grep -ro 'F\.W7' fr-*.md` → **2**, both inside `KF.W7` (verified by a 6-char left window: `re @ KF.W7` · `e at KF.W7`); `F\.W6` → **0**; `F\.W8` → **0**; `grep -rlw 'F\.W10'` → **0 records**. Canonical §4.1 holds | **GREEN** |
| **`FR-NP-32` canonical form** | 70 occurrences across the eleven; the cite-both law at `F-W5:394` / `F-W10:128` holds at **69 of 70**. **One departure — `D15-2` below** | **MINOR** |
| **SS-4 flags inline** | `F-W10:478` carries the seven owner rulings inline (trie-vs-KISS `atomdiff.py:12-14` INCUMBENT · remix-vs-fork · born-visibility · visibility-enum · version-`_id` · redaction parity · pagination) with `BOTH-ENDS REQUIRED` and the reciprocal-sentence obligation stated; `F-W10:467` re-states them at the admission gap | **GREEN** |
| **Zero `VERIFIED-YES`** | ⟨cmd⟩ `/usr/bin/grep -rn 'VERIFIED-YES\|VERIFIED: *YES\|VERIFIED \*\*YES\*\*' waves/` → **0** | **GREEN** |
| **Status `planned`** | all eleven declare it (`F-W0` *"Status stays `planned`"* · `F-W1` · `F-W2` · `F-W3` *"Status fields stay `planned`"* · `F-W4` · `F-W5` · `F-W6` · `F-W7` · `F-W8` (`:40`, `:278`) · `F-W9` · `F-W10`) | **GREEN** |
| **fourier tree READ-ONLY** | **this seat wrote exactly one file — this one.** No spec, no canonical, no certificate, no prior PASS directory was touched | **GREEN** |
| **`E-3` discipline** | every licensed history class was checked *in order to confirm it is licensed, and none is re-filed*: `F-W8:40`'s round-2→round-3 probe-form minute · `F-W10:363`'s `R4-10` byte-true quotation · quote-time digest columns under at-quote-time headers · dated errata rows with chased sub-notes · strike-quoted retired spellings · `F-W5:243`'s shader `42·100+42 = 4242` (arithmetic about a frame seed, **not a census magnitude**) · `F-W0:588` under `:541`'s scope clause (its *"F-W0 535 … total 5989"* is correct **of the pre-append settle**; the +63 delta is the §R11 note's own appended bytes, and the other ten line counts are byte-identical today: 735·465·912·470·433·634·359·374·557·515) · `PASS-13/SEAL.md` §2.1's quotation-of-cure | **GREEN** |
| **No product source opened** | this seat read only `docs/tranches/**` and hashed three external-tree files named by the specs' own pin tables. No `src/`, `demo/`, `api/` or `web/` byte was opened | **GREEN** |

---

## §9. FINDINGS

### `D15-1` — **LOW** · `F-W3:634`'s self-count receipt has gone stale on one of three arms

**Fresh; filed by no prior pass, check or certificate in fifteen rounds** (⟨cmd⟩ `/usr/bin/grep -rn 'F-W3:634\|F-W3\.md:634' conformance/` → **∅**).

`:634`'s F.W4-negatives cell asserts, in current voice:

> *"no §1 bounds row and no §5 file list holds `BasisCanvas.vue`, `ContourEditorCanvas.vue` or `EquationResult.vue` (⟨cmd⟩ this seat, `grep -c 'components/[a-z/]*<file>\.vue' F-W3.md` → **0** for each of the three)"*

⟨cmd⟩ re-run at the settled bytes, per arm:

| arm | published | measured | ✓ |
|---|---|---|---|
| `BasisCanvas` | 0 | **1** | ✗ |
| `ContourEditorCanvas` | 0 | **0** | ✓ |
| `EquationResult` | 0 | **0** | ✓ |

⟨cmd⟩ `/usr/bin/grep -n "components/[a-z/]*BasisCanvas\.vue" F-W3.md` → **`664`**, and `:664` is *a different receipt's pasted output*: `find web/src -name 'BasisCanvas.vue'` → `web/src/components/visualization/BasisCanvas.vue`. **The receipt was falsified by a later paste inside its own file** — the exact self-count fragility `R3-3.10` abolished (*"no banked ⟨cmd⟩ whose output is a count of a live sibling or of the citing file"*), in the exact manner it predicted.

⊘ **STATED MITIGATION — and it is why this is LOW and not higher.** **The substantive claim is TRUE**, and it is proved **thirty lines below, in the same section, by the cured form of the identical probe** — `:664`'s scoped instrument, *"a probe scoped to the structural rows so it cannot match this section's own prose (R3-3.7)"*: ⟨cmd⟩ `/usr/bin/grep -h '^- \*\*Files\*\*' F-W3.md | /usr/bin/grep -o 'GalleryAdminBanner\|BasisCanvas\|ContourEditorCanvas\|EquationResult' | sort -u` → **no output** ✓, re-run by this seat. That probe **cannot** go stale under any paste. `:664` even discloses the self-match hazard in terms for the parallel `GAB-25` case (*"it now greps in this file because **this v4 row is the hit**"*). The parallel sentence at `:691` carries **no receipt at all** and is unharmed.
⊙ **Nothing booked moves.** No census magnitude, roster row, home, grade or booking changes; the LAW's default arm still takes the four negatives, and `§2`'s roster closes at zero either way.
⊙ Secondary, recorded not separately filed: the receipt is spelled with a literal `<file>` placeholder, so it is a *schema* rather than a runnable command — which is how it survived thirteen rounds of value-matching sweeps.

### `D15-2` — **MINOR** · `F-W3:384` cites the corrupt-dist fact by one witness where the law says cite-both

**Fresh; filed by no prior pass** (⟨cmd⟩ `/usr/bin/grep -rn 'F-W3:384\|F-W3\.md:384' conformance/` → **∅**).

The law, in the corpus's own words — `F-W5:394`: *"The corrupt-dist fact carries **BOTH** its banked witnesses — canonical form: `FR-NP-32` (≡ `fr-PaperSidebar M1`)"*; `F-W10:128`: *"two banked witnesses of ONE fact; the citation form is **cite-both, never substitute**"*.

`F-W3:384` (the `GAB-13` substrate pre-gate row) reads: *"Companion: glass-ui 4.0.0's syntactically corrupt `dist/styles/index.css` (**fr-PaperSidebar M1**)."* — the second witness alone.

⟨cmd⟩ corpus-wide probe: `/usr/bin/grep -rn 'fr-PaperSidebar M1' waves/ | /usr/bin/grep -vc 'FR-NP-32'` → **1**. **This is the only site in all eleven specs.** 69 of 70 `FR-NP-32` citations carry the canonical form.

⊘ **STATED MITIGATION.** The row's subject is `GAB-13` (the 28-path dirty worktree), not the dist; the clause is a **companion cross-reference that books nothing**. `F-W3` carries `FR-NP-32` **5 times** elsewhere, including at its F.W3-binding sites, so the primary banked id is not lost from the file — only from this one line. No booking, homing, grading or magnitude moves. **The harm the law guards against — a reader losing the primary id — is bounded to a single parenthetical inside a row that routes to `g18`.**

### `D15-3` — **INFO** · the `:707` sweep's raw return grew 18 → 22, exactly as `PASS-14/SEAL.md` §4 predicted

Fully reconciled at §4 above: the four new hits are `PASS-14/SEAL.md`'s own quotations of the pattern, and that file self-excludes at its head. **A property, not a defect. Never blocks. Recorded only so round 16 declares a scope before publishing a figure here.**

---

## §10. RECEIPTS — 55, every one re-run by this seat

| # | receipt | measured | ✓ |
|---|---|---|---|
| R1–R13 | the thirteen `shasum -a 256` rows vs `PASS-14/SEAL.md` §9 | **13/13 byte-identical** | ✓ |
| R14 | `grep -c 'f44362757458' waves/F-W*.md` | `5·13·2·6·9·4·5·4·2·6·3` | ✓ |
| R15 | stale-pin sweep `be86ae410118\|ba9be3e37613` in `waves/` | **∅ (exit 1)** | ✓ |
| R16 | `wc -l waves/F-W3.md` | **912** | ✓ |
| R17 | `grep -c 'ContourSettings M-16' F-W3.md` | **5** | ✓ |
| R18 | `grep -c 'paraphrase — drift noted' F-W3.md` | **21** | ✓ |
| R19 | `awk '/verbatim/ && !/⟨cmd⟩/' F-W3.md \| wc -l` | **30** | ✓ |
| R20 | `grep -c '4242\|2780\|2779' F-W3.md` | **3** | ✓ |
| R21 | `:780` reads `carry **282 rows**` | **1** | ✓ |
| R22 | `:780` chase tokens | **5 of 5** | ✓ |
| R23 | `:780` stale `'289 rows'` | **0** | ✓ |
| R24 | `grep -c '^### fr-' CENSUS-CANONICAL.md` | **66** | ✓ |
| R25 | F.W3 roster records (`awk` window `720..778`, `sort -u`) | **59** | ✓ |
| R26 | `wc -l waves/F-W7.md` | **359** | ✓ |
| R27 | `grep -c 'Genuinely owed' F-W7.md` | **2** | ✓ |
| R28 | `§0(C)` table rows `:51`–`:60` | **10** | ✓ |
| R29 | `:58` carries `956e71a83e32` | **1** | ✓ |
| R30 | `:62` reads `TWO "no"s NOW FALSE` | **1** | ✓ |
| R31 | `shasum -a 256 ../COHESION.md` | `956e71a83e32` | ✓ |
| R32 | `shasum -a 256 ../keyframes/waves/KF-W1.md` | `919e484b8a60` | ✓ |
| R33–R35 | the three `COHESION.md` quoted spans, both files | **1/1 · 1/1 · 1/1** | ✓ |
| R36 | `shasum -a 256 carry/F-W1-CARRY.md` | `0d0b091e86ca` | ✓ |
| R37 | `shasum -a 256 carry/F-W4-CARRY.md` | `bf1da6fe1e7e` | ✓ |
| R38 | `shasum -a 256 ../waves/W9.md` | `820bd500999f` | ✓ |
| R39 | `shasum -a 256 $M/lane-docs.md` | `1a5caf437d54` | ✓ |
| R40 | `shasum -a 256 $M/lane-frontend.md` | `4433d809fac7` | ✓ |
| R41 | `shasum -a 256 $M/CENSUS-2026-08-03.md` | `684de3d8a8a0` | ✓ |
| R42 | `git show babc83ad^:…/F-W5.md` digest | `40bcad59cd2b` | ✓ |
| R43 | `R14-I2` total, post-cure / pre-cure | **172 / 172** | ✓ |
| R44 | `R14-I2` distinct, post-cure / pre-cure | **132 / 132** | ✓ |
| R45 | register lines, both states | **93 → 93** | ✓ |
| R46 | `F-W5` line count, both states | **433 → 433** | ✓ |
| R47 | `:707` sweep, raw / scoped | **22 / 13** | ✓ |
| R48 | five canonical §1 headers | **79 · 73 · 46 · 32 · 52** | ✓ |
| R49 | `F-W5:271` band receipt (`-row` / `-rw` / `-rlw` over the 66) | **245 / 240 / 54** | ✓ |
| R50 | `F.W9/W10` blocker receipt (`F-W9:173` ≡ `F-W10:53`) | **54 / 25 / 0** | ✓ |
| R51 | `F.W7` in the corpus, both inside `KF.W7` | **2 / 2** | ✓ |
| R52 | `F.W6` · `F.W8` · bare `F.W10` in the corpus | **0 · 0 · 0** | ✓ |
| R53 | `F-W2:436` §8c index re-derivation | **29** (`7+13+2+4+2+1`) | ✓ |
| R54 | `F-W5:269` self-count re-derivation | **93** (`22` gate rows ⊕ `71` clause rows = `6+5+5+16+20+9+10`) | ✓ |
| R55 | `:664`'s scoped structural probe (D15-1's mitigation) | **no output** | ✓ |

**55 receipts. 55 byte-exact.**

> ## **FABRICATED FIGURES: ZERO.**
> Every numeral this seat could bind to an operand was re-run against that operand. Not one receipt in the eleven specs published a figure its own command does not return — **with the single exception of `D15-1`, which is filed above rather than absorbed.**

---

## §11. WHAT THIS SEAT LOOKED FOR AND DID NOT FIND

Recorded so a successor does not re-run these on the assumption they were skipped:

1. **A roster escape.** None. The subtraction closes at zero at the id level, the band expansion independently reproduces `4287`, and `§2` names all 66 records. **`rosterEscapes = 0`.**
2. **A stale pin presented as live.** None. Nine live pins across four trees, all exact; three of them verified here for the first time in fifteen rounds.
3. **A dead coordinate in current voice.** None. 440 coordinates resolved; the only two dead ones are the same struck `F-W3.md:783` quoted inside its own erratum and its convicting minute.
4. **A member of `D13-1`'s class.** None. Two disjoint instruments, ninety-nine hits, eight read whole, eight acquitted.
5. **A false universal.** None. Six were run to destruction and all six held.
6. **A count-word that misses its list.** None. Eighteen pairs, all reconciling.
7. **A rival census operand used as a denominator.** None.

⊘ **And one thing this seat deliberately did NOT do**: it did not re-file any of the licensed `E-3` history the charge enumerates. Each was opened, confirmed to be in its licensed state, and left alone. **An audit that re-files a class three prior rounds adjudicated closed is not hostile; it is noisy.**

---

## §12. CLOSING HASH — the last act of this write

⟨cmd⟩ this seat, 2026-08-30, base = repo root, taken **after every receipt above closed byte-exact, and after which nothing in this file is written**:

```
3d62e5f4e78b99d5f3552a8b4d1ed377981854ca47db80b8471b8f4690651645  waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  waves/F-W1.md
8ae0ad8fa623de2201a6184ec32dfcb2a6bd25e2443b69ad4377e24746eeddc9  waves/F-W10.md
0b967619bb35763b6f1b09529db080fa2f9a37db2fa3e5e1eac70ce2aef7b7a6  waves/F-W2.md
025db038cc44e360363ce2a4499c876f4a077cf1b740a0c47e4dff42b1493608  waves/F-W3.md
2fb6e6d637bb6d0fad710716fb1dfa103d39fc41f67d8ff0fb856e4c0126cdb6  waves/F-W4.md
26aebcdc7bacb6bc85e31b3bf1205097bacb4311855ade0fe1c581784ff2ad85  waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  waves/F-W6.md
b5247b852f46d9a5b6c3cb468be799cbe6315a387b31e52a0cc8397c8d76c5d2  waves/F-W7.md
d8237cf6b11ef248e4080b8d805a2ee7477139b8d4cf9cf3564922096e29bd45  waves/F-W8.md
b265bf677869b0ec6f3c02c54b93272f657111e55498cf05bef14578d6c4b53b  waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  conformance/CENSUS-CANONICAL.md
6e4059c8599ccf0c475a254a490de4f5c60cf1d461891eb7cca64a61f7f04bc4  conformance/PIN-PURGE-CERT.md
```

**Thirteen rows, unmoved from `PASS-14/SEAL.md` §9. The canonical FROZEN at `f44362757458` for a SEVENTH consecutive round. This seat wrote no byte of any of them.**

---

## §13. THE WORD

Fifteen passes. Fourteen rounds of monotone convergence. The bar was: *zero BLOCKER/CRITICAL/HIGH · hashes clean · roster closed · fabrication zero · tail MINOR-or-below with stated mitigations.*

**Hashes clean, 13/13. Roster closed at zero, proved at the id level. Fabrication zero across fifty-five receipts. Roster escapes zero. The comparator class measured — not assumed — at zero members. The tail is one MINOR, one LOW and one INFO, each with a mitigation stated at its own entry.**

A fresh hostile pass, running five instruments it built itself against operands it derived mechanically, found **nothing material**. That is the condition the loop was written to detect, and it is met.

> ## **X·F IS CONFORMANT.**

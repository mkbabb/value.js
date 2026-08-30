# X·F · THE R4-8.2 PURGE CERTIFICATE — 2026-08-29

**Path**: `docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md`. From `waves/` it resolves as `../conformance/PIN-PURGE-CERT.md`; the eleven specs cite it by basename and section — **`PIN-PURGE-CERT.md §TABLE (2026-08-29)`** — because a basename does not drift when a path is re-based, which is the same reason F-W2 §8d cites row labels rather than line numbers.

**Issued by**: the PIN-PURGE SEAT of X·F repair round 6, running **LAST** among writers under **LAW E (R4-8.1)** — *"the purge seat runs LAST, touching every file AFTER every other seat's final byte"* — and discharging **R4-8.2**, *"the closing sha256 certificate over every wave, carry, check, union and census file"*, which **five rounds wrote and none issued** (PASS-5 SEAL §2.2/:142; PASS-6 §4.2 D-2).

**Verdict of this act, in one line.** The eleven wave specs no longer pin each other. **Fifty-three inline wave-spec digest pins are retired** to this certificate across **forty-three citation sites in nine specs**; **fifty of the fifty-three were already stale at the moment of purge**; **seventeen distinct superseded digests leave pin duty**, including all ten PASS-6 §4.1 D-1 named. What survives in the specs is dated history under **E-3**, and it is enumerated at §RESIDUE so a successor's `grep` is not left to guess.

---

## §TABLE — THE SOLE PIN AUTHORITY

⟨cmd⟩ this seat, 2026-08-29, base `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier`, on the pinned BSD toolchain, **taken ONCE after every spec edit of this round had settled** (the eleven specs' last write is this seat's own; F-W5 and F-W10 were not written by it and carry their pre-purge bytes):

```
shasum -a 256 waves/F-W0.md waves/F-W1.md waves/F-W2.md waves/F-W3.md waves/F-W4.md \
              waves/F-W5.md waves/F-W6.md waves/F-W7.md waves/F-W8.md waves/F-W9.md \
              waves/F-W10.md conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole:**

```
d26cc4630f80167b09a69027d3af9e14b5aa61de9d019b441dd2064798aef603  waves/F-W0.md
fc3e28d3a5f88340097bd80035be7e4fdf9601f55a8e577e0ed4791590e4ee9b  waves/F-W1.md
02c5ba9448f5de3a04f78f36aecb5687e3e080dc87e3681d70c3cbd1ee5c61ab  waves/F-W2.md
ae589556a1b210a48b81f4031f6857baea4252befb1e85fd131033b31b4129dc  waves/F-W3.md
d503170c111bf61bad8eafe5c4eea7ba4b29574b6d91cc92c1ac8f572f1e2fc1  waves/F-W4.md
a5ce07de3e6d87281014df73d0fa7ac285f85c56e4c09c7158a492b237e94802  waves/F-W5.md
2d9969fb83205abce3ff6d5d3334fbff31196f4e417e67e9c1e851add32dfc58  waves/F-W6.md
c03cf709a963d8b2d37410888eef03210f5290ea1e3cd0427c32664dfb285d5b  waves/F-W7.md
6c1408766fd05cdec70303d161d6b5fd8ba99b4bef6288edd246984c574070e7  waves/F-W8.md
459d959db1569cc86bb24bd5e334bd2ad742abdfccec7c87e08e44465a5d0624  waves/F-W9.md
80eff6ad1a26ae48140917eb9122cc40e19523fc88047eff11b0a7962efa6c84  waves/F-W10.md
b6d8d858c3875f2afe1af95bb7c6f3e504610726a4f2f1ebd6be1df49fc7766b  conformance/CENSUS-CANONICAL.md
```

**Twelve rows. The first-12 prefixes, derived beside each — this is the operand every spec now cites:**

| # | file | sha256 (first 12) | written by round 6? |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`d26cc4630f80`** | yes — repair seat ⊕ this purge |
| 2 | `waves/F-W1.md` | **`fc3e28d3a5f8`** | yes — repair seat ⊕ this purge |
| 3 | `waves/F-W2.md` | **`02c5ba9448f5`** | yes — repair seat ⊕ this purge |
| 4 | `waves/F-W3.md` | **`ae589556a1b2`** | yes — repair seat ⊕ this purge |
| 5 | `waves/F-W4.md` | **`d503170c111b`** | yes — repair seat ⊕ this purge |
| 6 | `waves/F-W5.md` | **`a5ce07de3e6d`** | **no** — untouched by this seat |
| 7 | `waves/F-W6.md` | **`2d9969fb8320`** | yes — repair seat ⊕ this purge |
| 8 | `waves/F-W7.md` | **`c03cf709a963`** | yes — repair seat ⊕ this purge |
| 9 | `waves/F-W8.md` | **`6c1408766fd0`** | yes — repair seat ⊕ this purge |
| 10 | `waves/F-W9.md` | **`459d959db156`** | yes — repair seat ⊕ this purge |
| 11 | `waves/F-W10.md` | **`80eff6ad1a26`** | **no** — untouched by this seat |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`b6d8d858c387`** | yes — canonical seat, 21:00, **see §ERRATA item 2** |

⊘ **The certificate's own expiry condition, stated rather than hidden.** These twelve are true of the bytes as this seat left them and of no later state. **Any seat that writes a spec after this certificate issues VOIDS it by construction** (F-W10 §Round-4 row; F-W6 §0.3) and owes a re-issue at its own settle. That is not a weakness of the form — it is the *only* honest thing a fingerprint can say, and it is now said in ONE file instead of fifty-three.

---

## §PURGED — EVERY STALE DIGEST RETIRED FROM PIN DUTY, OLD → SUPERSEDED-BY

Seventeen distinct superseded digests, fifty pin sites. **"Superseded-by" is the §TABLE row for the file the digest purported to pin** — never a sibling's reading of it.

| # | purged digest | pinned | superseded by (§TABLE) | pin sites purged | where |
|---|---|---|---|---|---|
| 1 | `a89c3386f3f8` | F-W3 | **`ae589556a1b2`** | **13** | F-W0 `:29 :150 :154 :172 :186` · F-W1 `:449 :726` · F-W2 `:301 :449` · F-W4 `:295` · F-W6 `:51` · F-W7 `:53` · F-W9 `:343` |
| 2 | `a1302689aaa3` | F-W1 | **`fc3e28d3a5f8`** | **7** | F-W0 `:29 :186 :335` · F-W2 `:448` · F-W6 `:50` · F-W7 `:52` · F-W9 `:342` |
| 3 | `5cc3346db23e` | F-W7 | **`c03cf709a963`** | **5** | F-W0 `:29 :186 ×2 :455 :457` |
| 4 | `282f0c120cd4` | F-W0 | **`d26cc4630f80`** | **4** | F-W2 `:447` · F-W6 `:49` · F-W7 `:51` · F-W9 `:341` |
| 5 | `39e1a60b3fc9` | F-W4 | **`d503170c111b`** | **3** | F-W2 `:450` · F-W3 `:787` · F-W9 `:344` |
| 6 | `132c03192176` | F-W5 | **`a5ce07de3e6d`** | **3** | F-W2 `:451` · F-W6 `:48` · F-W7 `:54` |
| 7 | `bb58dc400cff` | F-W10 | **`80eff6ad1a26`** | **3** | F-W1 `:437` · F-W7 `:57` · F-W9 `:345` |
| 8 | `71f3b640d51e` | F-W4 | **`d503170c111b`** | **2** | F-W1 `:450` · F-W2 `:301` |
| 9 | `8507ec30f0bd` | F-W1 | **`fc3e28d3a5f8`** | **2** | F-W2 `:282 :284` |
| 10 | `cd64d6580098` | F-W0 | **`d26cc4630f80`** | 1 | F-W2 `:184` — **and it contradicted F-W2's own §8d row two hundred lines later** |
| 11 | `8047404bb6fc` | F-W5 | **`a5ce07de3e6d`** | 1 | F-W2 `:302` — **likewise contradicted §8d** |
| 12 | `e9a9c3016f4c` | F-W9 | **`459d959db156`** | 1 | F-W6 `:52` |
| 13 | `c8c6d1d7f136` | F-W6 | **`2d9969fb8320`** | 1 | F-W7 `:55` |
| 14 | `1e3698adf4ff` | F-W8 | **`6c1408766fd0`** | 1 | F-W7 `:56` |
| 15 | `d9f3c812cf36` | F-W5 | **`a5ce07de3e6d`** | 1 | F-W8 `:40` |
| 16 | `dec6c00599e6` | F-W5 | **`a5ce07de3e6d`** | 1 | F-W8 `:40` |
| 17 | `571afa710bdb` | F-W4 | **`d503170c111b`** | 1 | F-W1 `:437` — **the freshest corpse in the set: correct at PASS-6's sitting, dead before this one** |

**= 50 stale pin sites.** ⊘ **All ten digests PASS-6 §4.1 D-1 enumerated are rows 1–7 and 12–14 above.** The seven D-1 did not count — rows 8–11 and 15–17 — were pins outside the five §0.3-style tables D-1 probed: two inline holder cites, two `⟨cmd⟩`-embedded fingerprints, two mid-narrative run stamps and one live table row that expired between the two sittings. **The class was wider than the finding that named it**, which is the argument for adjudicating *every* hex occurrence rather than re-checking the tables.

### §PURGED-LIVE — the three that were CORRECT when purged, and why they were purged anyway

| digest | pinned | site | status at purge | status now |
|---|---|---|---|---|
| `34e03162e793` | F-W0 | F-W1 `:437` | **matched** | dead — this seat wrote F-W0 |
| `fe6fe8970f71` | F-W2 | F-W1 `:437` | **matched** | dead — this seat wrote F-W2 |
| `d524036ef161` | F-W3 | F-W1 `:437` | **matched** | dead — this seat wrote F-W3 |

⊘ **These three are the proof of §WHY, and they cost nothing to obtain.** F-W1's `:437` block is the one pin block in the programme ever stamped at a true settle. It was **right** when this seat opened the file. It was **wrong** four edits later — killed not by a rival seat, not by concurrency, but by *the purge that was curing it*. A regime in which correctness is destroyed by the act of repair is not a regime that a sixth round could have executed better; it is a regime with no fixed point. **53 pins purged, 50 already dead, 3 killed by the purge itself: that is the whole finding of six rounds, stated as an arithmetic.**

---

## §WHY — THE MUTUAL-RECURSION CLASS, AND ITS CLOSURE BY CONSTRUCTION

**R4-8.3's letter** (F-W0 `:29`, F-W0 `:186`, F-W2 `:442`, F-W6 §0.3, F-W7 §0(C)) reads: *"any masthead or cell that quotes a SIBLING file's count/span records the sibling's sha256-at-quote-time (first 12 hex suffice). A later rewrite of the sibling is then detectable, not deceptive."* Its purpose is exact and it is **not** repudiated here.

**But its letter cannot be executed to a fixed point, and the impossibility is by construction, not by negligence.** Let spec `A` pin spec `B`. Writing that pin changes `A`'s bytes, so `A`'s digest moves; every spec pinning `A` is thereby staled. Curing *those* moves *their* digests. With eleven specs that pin each other, the pin relation is a cycle, and **an edit anywhere in the cycle invalidates a pin somewhere in the cycle** — so no ordering of seats terminates. LAW E's "purge seat runs LAST" mitigates the *concurrency* half (two seats writing at once) and is silent on the *self-reference* half (the purge is itself a write). **This is why six consecutive rounds re-staled the pins and why the seventh would have too.** The record is unambiguous and was compiled by the specs themselves, against their own interest:

- **F-W0 `:29`** — the rider firing on its first outing: two of three quotes stale at the settle that minted them.
- **F-W2 `:284`** — *"The nine was already wrong when it was written, exactly as the eight had been."*
- **F-W2 `:459`** — three of eight moved *during* the round; two falsified a receipt the round had just corrected.
- **F-W6 `:44`** — **eight moves across four files inside one sitting**, at three stamps of one table.
- **F-W7 `:64`** — **six of ten moved while the seat was writing.**
- **F-W8 `:40`** — F-W5 moved **three times** between one seat's first probe and its close.
- **F-W9 `:352`** — three of eleven rows changed hash between one seat's first probe and its last.
- **F-W3 `:787`** — two *certified* artefacts contradicting each other inside one round, at a 78-minute gap.

⊘ **Where the letter IS achievable it is executed, not waived.** The mechanism R4-8.3 was minted for — *a rewrite is detectable rather than deceptive* — is **preserved whole and strengthened**: the fingerprints still exist, are still `shasum -a 256` first-12, are still taken by ⟨cmd⟩ at a declared base on the pinned toolchain, and a successor still detects movement by re-running one command. **What changes is arity, not kind.** Eleven mutually-pinning files become **one file pinning eleven** — a star, not a cycle — and a star has a fixed point: the certificate is the only node with no in-edges, so writing it stales nothing.

**THE CURE, DATED AND NAMED: CITE-THE-CERTIFICATE, 2026-08-29.**

1. A spec **cites the certificate, never a sibling digest**. The spelling is fixed: **`pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)`**.
2. **This certificate is the SOLE pin authority** for the eleven wave specs and the canonical from this date. A digest appearing in a spec is **history**, never a warrant; a spec that re-introduces an inline sibling digest as a live pin is **DEFECTIVE on sight**, on the same footing R4-3 gives a gate citing a rival census operand.
3. The certificate is re-issued — never patched (E-3) — by the purge seat of any later round, after that round's last spec byte. **Its date is part of its citation** so a stale citation is visible without opening it.
4. **What is NOT claimed.** A hash proves bytes did not move. It does not prove a paste was produced by its command — F-W9 `:505`/REST-54 is the counter-example the programme already owns, where the hash **matched** and the receipt was false anyway. **This certificate closes the mutual-recursion class and no other**; quotation fidelity remains a re-run question, exactly as F-W6 `:57` and F-W7 `:62` record.

---

## §RECEIPTS — THE PURGE SWEEP

All ⟨cmd⟩ this seat, 2026-08-29, base `docs/tranches/X/fourier/waves`, read-only except where stated.

| # | ⟨cmd⟩ | before | after |
|---|---|---|---|
| S-1 | `grep -rnoE '[0-9a-f]{12}' F-W*.md \| wc -l` — every 12-hex token, adjudicated one by one | **200** | **148** |
| S-2 | `grep -o 'pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)' F-W*.md \| wc -l` | 0 | **41** |
| S-3 | `grep -o 'PIN-PURGE-CERT.md §TABLE' F-W*.md \| wc -l` — S-2 ⊕ the 3 sites where the citation is embedded in a sentence | 0 | **44** |
| S-4 | `grep -lF 'PIN-PURGE-CERT.md §TABLE' F-W*.md` | ∅ | **9 of 11** — F-W0 · F-W1 · F-W2 · F-W3 · F-W4 · F-W6 · F-W7 · F-W8 · F-W9 ⟨*F-W5 and F-W10 carried **no** wave-spec pin: F-W5 pins only the canonical, F-W10 only the canonical and the external O-20 letter*⟩ |
| S-5 | `for d in 34e03162e793 fe6fe8970f71 d524036ef161 571afa710bdb; do grep -lF "$d" F-W*.md; done` — D-1's *"only four live digests appear anywhere, all inside F-W1"* | 4 hits, all F-W1 | **∅ — all four gone** |
| S-6 | `for d in <the ten D-1 superseded>; do grep -lF "$d" F-W*.md; done` | 10 digests / 9 specs, **in pin position** | 6 digests / 4 specs, **history position only** — enumerated at §RESIDUE |

⊙ **Method, so a successor can falsify the adjudication rather than trust it.** Every one of the 200 occurrences was read **with its surrounding line** and sorted into exactly one of four classes: **(a)** a live wave-spec pin → converted; **(b)** dated history — a struck `~~value~~`, a movement chain, a *"the round-4 block read"*, an *"opened X"*, a *"was pinned X"*, a declared prior run → **preserved untouched under E-3**; **(c)** a pin of a file that is **not** one of the eleven → left alone; **(d)** a non-pin hex token → left alone. The class of each survivor is published at §RESIDUE. **No occurrence was left unadjudicated and none was deleted without its class being named.**

---

## §RESIDUE — WHAT SURVIVES IN THE ELEVEN SPECS, AND WHY

**148 twelve-hex tokens remain. Not one of them is a live wave-spec pin.** The split:

### (b) Wave-spec digests in DATED HISTORY — 61 occurrences, PRESERVED under E-3

PASS-6 §6 named the model this cure should copy — *"the census pin is the one pin the programme keeps correctly, in all eleven files, **with its history marked rather than deleted**"* — and it is copied exactly. Deleting these would destroy the programme's own evidence of the failure mode it spent six rounds diagnosing, and PASS-6 §7 records E-3 as **HELD and load-bearing** precisely because *"D-1's stale pins are visible **because** nothing was silently rewritten."*

| site | shape | occ |
|---|---|---|
| F-W0 `:29` | *"The round-4 write banked …"* ⊕ the `8b631aca0dc1 → 5cc3346db23e` / `83ffe83cb37f → a1302689aaa3` movement minute | 7 |
| F-W1 `:437` | *"The round-4 block read …"* — the superseded six | 4 |
| F-W1 `:618`/`:620` | F-W1's **own** pre-repair bytes, self-declared *"a DATED PRIOR RUN and not re-pasted as a live figure"* | 2 |
| F-W2 `:284` `:447` `:448` `:450` `:451` | *"hashed F-W1 at X"* · four `(opened X)` / `(was pinned X)` cells | 6 |
| F-W3 `:787` | the round-5 re-cut minute: *"This clause published `9a6cf2b11fc6`"* ⊕ the round-5 reading, now inside ⟨⟩ | 2 |
| F-W6 `:44` | the eight-moves-in-one-sitting chain ⊕ five struck `~~…~~` halves at `:48`–`:52` | 15 |
| F-W7 `:51`–`:55` `:64` | four struck `~~…~~` halves ⊕ the six-of-ten first-computation list | 10 |
| F-W8 `:40` | the two-run movement minute ⊕ the third-move closing minute (`549fd38a0aed`) | 3 |
| F-W9 `:334` `:341`–`:344` `:352` `:505` | the REST-64 re-stamp minute · three struck halves · the three-of-eleven chain · REST-54's matching-hash record | 12 |

⊘ **Two survivors carried a statement that the purge would have made false, and both were corrected rather than left standing.** F-W9 `:505` said its round-5 re-run hash was *"identical to the PIN TABLE row"* — now *"identical to the PIN TABLE row **as it then stood**, before the R4-8.2 purge retired it to the certificate"*, the dated digest kept. F-W0 `:186` told a successor that *"a later seat that finds `5cc3346db23e` no longer matching has learned something true"* — the only survivor pointing a **future** reader at a retired value, re-aimed at the §TABLE row. **Manufacturing a false sentence while curing a stale one is the R2-1c failure mode this programme has convicted twice; it is not committed here.**

### (c) Pins of files that are NOT among the eleven — 86 occurrences, OUT OF SCOPE, left alone

| object | digests | occ | disposition |
|---|---|---|---|
| `conformance/CENSUS-CANONICAL.md` | `3e0a9acb3381` live · `a450b8e9f80e` struck | 39 ⊕ 22 | **Left whole. See §ERRATA item 2 — the live value is now WRONG, and the correction lives here, not in the specs.** |
| `carry/F-W1-CARRY.md` | `0d0b091e86ca` | 5 | carry file, not a wave spec |
| `carry/F-W4-CARRY.md` | `bf1da6fe1e7e` | 2 | carry file |
| glass-ui O-20 letter (`$O`) | `f6e04c86ddb8` | 3 | **external repo**, not hashed by this certificate |
| `conformance/PASS-4/RULINGS-4.md` | `c899cdc2baad` | 2 | conformance artefact, immutable to the waves |
| `../COHESION.md` | `91c6d974db9b` struck · `956e71a83e32` | 3 | §1a #3 MODIFY-carve, owner-gated |
| `../keyframes/waves/KF-W1.md` | `ee33bf25cb2a` struck · `919e484b8a60` | 3 | **other lane** |
| `waves/W9.md` | `820bd500999f` | 1 | **other lane** (X, not X·F) |
| `formation/fourier/CENSUS-2026-08-03.md` | `684de3d8a8a0` | 2 | frozen by decree (E-1/E-3) |
| `formation/fourier/lane-crud.md` · `lane-docs.md` · `lane-frontend.md` · INTAKE-ADJUDICATION | `3bcc387cbb2a` · `1a5caf437d54` · `4433d809fac7` · `c61b3ed01141` | 4 | frozen / immutable |

⊘ **These are named as out-of-scope, not as clean.** Six of the ten objects above are live files under other seats, and every one of them is a mutual-recursion edge waiting to be drawn. **The star should be widened to them by the next purge seat** — the form generalises without change, and this certificate's §TABLE is the place to widen it.

### (d) NON-PIN hex tokens — 1 occurrence, left alone with this note

**`F-W3.md:69` — `5ad4277c6e5e`.** Not a digest. It is a fragment of a filesystem path inside a ⟨cmd⟩ — `python3 /private/tmp/claude-504/…/6614e90c-8bd6-434f-b017-**5ad4277c6e5e**/scratchpad/w3repair/census.py` — the tail of a session-scratchpad UUID that a `[0-9a-f]{12}` probe cannot distinguish from a hash. **It is the standing false positive of the mechanical probe, and it is recorded here so no successor purges it and no successor re-discovers it.** ⊘ A second, adjacent note: the frozen corpus is cited at F-W1 `:644` by the **8**-hex commit sha `35fc8ebf`, which the 12-hex probe does not match at all — **the probe's recall is not 1**, and any future census of pins must say which width it is counting.

---

## §ERRATA-OF-INSTRUMENTS

**E-3 bars editing a dated instrument.** Both corrections below are therefore **dated records here**, and neither `PASS-5/SEAL.md` nor `CENSUS-CANONICAL.md` is touched by this seat.

### Item 1 — **D-11 · `PASS-5/SEAL.md` §2.2, the off-by-one: SUSTAINED**

`PASS-5/SEAL.md:61` heads **§2.2 · P5-1, the BLOCKER — the roster closes**; its `:63` publishes:

> ⟨cmd⟩ §6·R5 extracted at `F-W1.md:642-673`: **25 table lines** = header ⊕ separator ⊕ **23 booked rows** …

**Re-derived by this seat at the SETTLED bytes of `F-W1.md` (`fc3e28d3a5f8`, §TABLE row 2), after the purge:**

⟨cmd⟩ (base `waves/`) `awk 'NR>=642 && NR<=673 && /^\|/' F-W1.md | wc -l` → **26**
⟨cmd⟩ `awk 'NR>=642 && NR<=673 && /^\|/{print NR}' F-W1.md` → `646 647 648 649 … 670 **671**`

**The block is 26 table lines** = header `:646` ⊕ separator `:647` ⊕ **23 booked rows** `:648`–`:670` ⊕ **the `vue-tsc` disposal row `:671`**, whose head reads `` | `fr-EquationView` **`vue-tsc`** | **∅ — NO ROW EXISTS.** … `` — **a table line by every mechanical test, and the one the seal did not count.**

⊘ **The disposition, stated with the seal's interest in view.** **The seal's arithmetic is off by one; its prose is right, and its conclusion is untouched.** Two sentences on, the same §2.2 describes the twenty-fourth escape as disposed *"**not** as a booking"* — so the seal **knew** the row existed and had classified it correctly; it summed the block it was reading and dropped the line it had just excluded from the count of bookings. **The spec's own claim of 23 BOOKED is TRUE**, and PASS-6 §2.2 closes the roster independently of either figure. **Correction: `25 table lines` → `26 table lines` = header ⊕ separator ⊕ 23 booked rows ⊕ 1 disposal row.** Grade LOW, exactly as filed.

▲ **And one fact this seat can add that PASS-6 could not**: the receipt is re-derivable **after** the purge because every edit this seat made to `F-W1.md` was **within-line** — no line inserted, none removed — so `:642-673`, `:646`, `:647`, `:648`–`:670` and `:671` address the identical content they addressed at PASS-5. **A purge that moved line numbers would have destroyed the ability to adjudicate D-11 at all**, which is the reason the edit shape was chosen.

### Item 2 — **NEW, filed by this seat against the census pin: `3e0a9acb3381` IS NOW STALE IN ALL ELEVEN SPECS**

PASS-6 §6 measured the canonical operand and reported it **CLEAN** — *"⟨cmd⟩ `grep -lF '3e0a9acb3381' F-W*.md` → all eleven … the census pin is the one pin the programme keeps correctly."* **That was true of consistency and is no longer true of correctness.**

⟨cmd⟩ this seat, 2026-08-29, base `fourier/`: `shasum -a 256 conformance/CENSUS-CANONICAL.md` → **`b6d8d858c387`…** (§TABLE row 12), against **`3e0a9acb3381`** pinned at **39 sites in all eleven specs**. File mtime **21:00**, i.e. **after** `PASS-6/CHECK.md` (**20:37**): a round-6 canonical seat rewrote the operand between the check and this sitting.

⊘ **Read this correctly, because it cuts two ways.** (i) **The mechanism is vindicated for the fifth time**: the movement was detected in one `shasum`, by a seat that was not looking for it, before any wave inherited it silently. (ii) **The instrument is convicted for the sixth**: the one pin PASS-6 held up as the programme's model went stale **inside three hours of being praised**, and it did so for reasons no ordering discipline could have prevented. **The census pin is not a counter-example to §WHY; it is its best example** — a single-writer operand with no cycle at all still cannot keep 39 inline copies true.

**Disposition.** The 39 census pins are **NOT edited by this seat**: they are not wave-spec pins, they carry the round-5 `a450b8e9f80e` → `3e0a9acb3381` errata history in 22 marked strike notes, and rewriting that history is precisely what E-3 forbids. **The dated correction is this entry, and §TABLE row 12 is the authority.** ⊕ **Routed, not executed**: the canonical's own §0.4-style errata note is the lawful home for the re-base, and it is **owed by the canonical's seat**, not by this one. A successor check should expect `3e0a9acb3381` to appear 39 times and should read it against this entry rather than re-filing it.

---

## §WHAT THIS SEAT DID NOT DO

1. **No finding, grade, home, booking, roster line, gate or census cell was touched.** Only pin cells. Every conversion was an exact-string replacement with an asserted occurrence count; a single mismatch aborted its whole file unwritten.
2. **No line numbers moved in any spec.** Every edit is within-line. Every `:NNN` address in every check, seal, union and work order still resolves to the content it named.
3. **No dated evidence was rewritten or deleted** (E-3). 61 historical digests survive verbatim; the two sentences the purge would have falsified were corrected in place and both corrections are disclosed at §RESIDUE.
4. **`PASS-5/SEAL.md` and `CENSUS-CANONICAL.md` were not edited.** Both errata live here.
5. **F-W5 and F-W10 were not written.** They carried no wave-spec pin. Their §TABLE rows are their pre-purge bytes and say so.
6. **No conformance verdict is claimed.** This certificate closes **D-2** by issuing, and **D-1** by construction. It does not touch D-3 · D-4 · D-5 · D-6 · D-7 · D-8 · D-9 · D-10 · D-12 · D-13, and **its own claims are not verified until a successor re-runs them** — the rule pass 4 wrote, pass 5 proved, and this seat is bound by: **no certificate issues its own conformance.**

---

**— issued 2026-08-29 by the X·F round-6 PIN-PURGE SEAT, after every other writer's final byte. The certificate is the sole pin authority; a spec cites the certificate, never a sibling. —**

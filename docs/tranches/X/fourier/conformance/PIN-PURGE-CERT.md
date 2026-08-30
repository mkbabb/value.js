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

---
---

# §ERRATA-R7 — DATED APPEND, 2026-08-29 · X·F ROUND 7 · THE CERT-REBASE SEAT

**Everything above this rule is round-6 dated evidence and is NOT edited** (E-3). This block **appends**; it corrects four counts filed against this certificate at `PASS-7/CHECK.md` §4.5 (LW-1 · LW-2 · LW-3 ⊕ the seat's own fourth), and it **re-bases the digest table**, which was stale by construction the moment the round-7 canonical seat and re-base seat wrote.

⊘ **Two byte-states are in play, and every figure below names which.**

- **R6** — the round-6 settled state, the bytes §TABLE describes. Reachable at commit **`3c12ec3d`**. ⟨cmd⟩ this seat, base repo root: `for f in F-W0 F-W1 F-W2 F-W3 F-W4 F-W5 F-W6 F-W7 F-W8 F-W9 F-W10; do git show 3c12ec3d:docs/tranches/X/fourier/waves/$f.md | shasum -a 256 | cut -c1-12; done` ⊕ the same for `conformance/CENSUS-CANONICAL.md` → **the twelve of §TABLE, 12 of 12**, and the certificate itself at `52264bcce7c9`, the row `PASS-7/CHECK.md` §1 published. **§TABLE was true of the bytes it named**; its expiry clause, not its arithmetic, is what fired.
- **R7** — the working tree as the round-7 canonical seat and the re-base seat left it, **frozen before this seat's first byte**. This is what the new table hashes.

**Toolchain**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, absolute `/usr/bin/grep` throughout (the interactive `grep` here is a `ugrep` shell function and is not the instrument), BSD `awk` · `sed` · `sort` · `od` · `shasum` · `git`. Every command below is published so the correction can be falsified rather than trusted.

---

## LW-1 — **the headline's "forty-three citation sites in nine specs": the site count is 42. SUSTAINED.**

The Verdict paragraph (¶4) reads *"…retired to this certificate across **forty-three citation sites in nine specs**."*

⟨cmd⟩ this seat at the **R6** bytes, base `waves/`:

```
/usr/bin/grep -n 'PIN-PURGE-CERT.md §TABLE' F-W*.md | awk -F: '{print $1":"$2}' | sort -u | wc -l
```

→ **42**, distributed `F-W0` **8** · `F-W1` **4** · `F-W2` **10** · `F-W3` **1** · `F-W4` **1** · `F-W6` **5** · `F-W7` **7** · `F-W8` **1** · `F-W9` **5**. Nine files, by `grep -lF … | wc -l` → **9**.

**Correction: `forty-three citation sites` → `FORTY-TWO citation sites`. "in nine specs" is EXACT and stands.** ⊘ **Forty-three matches neither of the two lawful metrics**, which is the tell: the **site** count is 42 and the **occurrence** count is 44 — the certificate's own §RECEIPTS S-3 measured that 44 correctly, and `PASS-7/CHECK.md` §5 R6-6 re-ran it and got 44. Two lines carry two citations each, which is exactly the gap. The headline took neither figure; it took one between them. Grade LOW, count-shaped: **no pin, conversion, home, booking or roster cell is touched by this, and the 53-retired / 50-stale / 17-digest arithmetic of the same paragraph is unaffected.**

▲ **At the R7 bytes the same command returns 77 sites / 83 occurrences / 11 of 11 specs** — the re-base seat widened the star to F-W5 and F-W10 and cited the certificate at every denominator it re-based. **That figure is R7's, not this paragraph's**; the ¶4 sentence is a dated statement about what the round-6 purge did, and it is corrected here to 42 in that voice.

## LW-2 — **§RECEIPTS S-6's "after" cell reads "6 digests / 4 specs": the true figure is FIVE digests. SUSTAINED.**

S-6's row tracks D-1's **ten** superseded digests from pin position into history. Its *after* cell publishes *"**6 digests** / 4 specs, **history position only**"*.

⟨cmd⟩ this seat at the **R6** bytes, base `waves/`, one digest at a time rather than by class:

```
for d in a89c3386f3f8 a1302689aaa3 5cc3346db23e 282f0c120cd4 39e1a60b3fc9 \
         132c03192176 bb58dc400cff e9a9c3016f4c c8c6d1d7f136 1e3698adf4ff; do
  printf "%s : " "$d"; /usr/bin/grep -lF "$d" F-W*.md | tr '\n' ' '; echo
done
```

| digest (D-1's ten) | specs it survives in | occ |
|---|---|---|
| `a89c3386f3f8` | `F-W0` · `F-W1` · `F-W9` | 3 |
| `a1302689aaa3` | `F-W0` | 1 |
| `5cc3346db23e` | `F-W0` | 1 |
| `39e1a60b3fc9` | `F-W3` · `F-W9` | 2 |
| `bb58dc400cff` | `F-W9` | 1 |
| `282f0c120cd4` · `132c03192176` · `e9a9c3016f4c` · `c8c6d1d7f136` · `1e3698adf4ff` | **∅ — extinct in the corpus** | 0 |

**FIVE survive, in eight occurrences, across `{F-W0, F-W1, F-W3, F-W9}` = four specs.**

**Correction: `6 digests / 4 specs` → `5 DIGESTS / 4 specs`. "4 specs" and "history position only" are both TRUE and stand.** ⊘ **The certificate already knew.** §RESIDUE (b) enumerates the survivors and they count to five; the file disagreed with itself by one across two sections, and `PASS-7/CHECK.md` §4.5 LW-2 caught it on exactly that ground — *"the certificate's own §RESIDUE (b) says five."* **The tabular cell is the error; the enumeration is right.** Unchanged at the **R7** bytes: the same loop returns the same five, the same four specs.

## LW-3 — **the false corpus-wide universal at §WHAT-THIS-SEAT-DID-NOT-DO item 2, RESTATED as the enumerated truth. SUSTAINED.**

Item 2's second sentence reads *"**Every `:NNN` address in every check, seal, union and work order still resolves to the content it named.**"* **That universal is false, it was never measured over the corpus it quantifies, and it is withdrawn here.** What the round-6 seat actually established, and what this seat re-established, is narrower and is stated without "every":

**(i) The within-line property holds in TEN of the eleven specs, and fails in one.** ⟨cmd⟩ `git show --numstat --format= 3c12ec3d -- docs/tranches/X/fourier/waves` → adds **=** deletes for `F-W0` 8/8 · `F-W1` 4/4 · `F-W2` 10/10 · `F-W3` 1/1 · `F-W5` 14/14 · `F-W6` 6/6 · `F-W7` 7/7 · `F-W8` 1/1 · `F-W9` 10/10 · `F-W10` 5/5 — and **`F-W4.md` 9/3**. ⟨cmd⟩ `git show --format= --unified=0 3c12ec3d -- …/F-W4.md | /usr/bin/grep -E '^@@'` → **`@@ -11,0 +12,6 @@`** ⊕ three pure substitutions (`-140 +146`, `-289 +295`, `-456 +462`). **Six lines were inserted after `F-W4.md:11`. Every `F-W4` address at or below `:11` still resolves; every one above it is displaced by exactly +6.**

**(ii) The addresses this certificate re-derived DO resolve, and they are the D-11 coordinates in `F-W1.md`** — the only addresses §ERRATA item 1 actually put through a command. ⟨cmd⟩ this seat at the **R7** bytes: `awk 'NR>=642 && NR<=673 && /^\|/' F-W1.md | wc -l` → **26**, and `awk '…{printf "%s ", NR}'` → `646 647 648 … 670 671` — **the identical line numbers PASS-5 addressed**, still holding two rounds and one re-base later. Item 1's ▲ claim is therefore **true as made about `F-W1`** and is not disturbed.

**(iii) Two addresses are PROVEN BROKEN, both into `F-W4`, both cited by `PASS-6/CHECK.md`.** Artifact: **`PASS-7/CHECK.md` §4.5 LW-3**, whose two coordinates this seat re-walked at the R7 bytes. `PASS-6/CHECK.md:66` cites `` `F-W4.md:338` `` for the **suffix-elision chains**; ⟨cmd⟩ `sed -n '338p' F-W4.md` → the unrelated `` - **`GM-6` — the ENABLING F.W1 rider…** `` row, the named content at **`:344`**. `PASS-6/CHECK.md:113` cites `` F-W4 `:458` `` for the **§Y.3 residual-string declaration**; ⟨cmd⟩ `sed -n '458p' F-W4.md | od -c` → **`\n`**, a blank line, the named content at **`:464`**. Both are the +6 displacement, exactly.

**(iv) Named as UNAUDITED, so no successor reads this correction as a clearance.** ⟨cmd⟩ `/usr/bin/grep -rnoE 'F-W4(\.md)?[^0-9]{0,4}:[0-9]{2,4}' conformance --include='*.md'` returns **eleven further pre-round-6 `F-W4` coordinates** inside PASS-2/3/4 instruments, all in the displaced region: `F-W4:217` (`PASS-2/F-W1-CHECK.md:68`, `PASS-2/UNION.md:35`) · `F-W4.md:28` (`PASS-2/F-W10-CHECK.md:107`, `PASS-2/F-W5-CHECK.md:231`) · `F-W4:274` (`PASS-3/F-W10-CHECK.md:78/:115/:116`, `PASS-3/RULINGS-3.md:44`, `PASS-3/UNION.md:35`) · `F-W4:202` (`PASS-3/RULINGS-3.md:144`) · `F-W4.md:241` (`PASS-4/F-W2-CHECK.md:173`) · `:111 :140 :206 :351 :183 :112` (`PASS-4/CLOSE-CERT-2.md`). **This seat does not claim they were ever correct** — they were taken at older bytes than round 6 — **only that the +6 insertion is a second, independent reason they may not resolve, and that nobody has checked.**

⊘ **The corrected sentence, in the certificate's own voice, with no universal in it:**

> **Round 6's edits were within-line in ten of the eleven specs. `F-W4.md` took a six-line insertion at `@@ -11,0 +12,6 @@`, so `F-W4` addresses at or below `:11` still resolve and those above it are displaced by +6. The addresses this certificate re-derived — `F-W1`'s D-11 coordinates `:642-673` · `:646` · `:647` · `:648`–`:670` · `:671` — resolve, and are re-derived again at §ERRATA-R7. Two `F-W4` coordinates in `PASS-6/CHECK.md` (`:338`, `:458`) do not. No other `:NNN` address in any check, seal, union or work order has been measured, and eleven `F-W4` coordinates in the PASS-2/3/4 instruments sit in the displaced region unaudited.**

▲ **Why this one is not merely count-shaped, said plainly.** LW-1, LW-2 and LW-4 are arithmetic. **This was a claim of a property over a corpus the seat never enumerated**, made in the section whose whole purpose is to bound what was *not* done — the one place a false universal costs a successor the most, because it is read as a licence to skip a check. It is the same species as the canonical's E6-2 wording (`PASS-7/CHECK.md` §4.6) and it is retired the same way: **replace the quantifier with the enumeration.**

## LW-4 — **§RESIDUE (b)'s "five struck halves at `:48`–`:52`": FOUR carry a digest. SUSTAINED.**

The `F-W6 :44` row of §RESIDUE (b) reads *"the eight-moves-in-one-sitting chain ⊕ **five struck `~~…~~` halves at `:48`–`:52`**"*, occurrence total **15**.

⟨cmd⟩ this seat, base `waves/`, at the **R6** bytes and again at **R7** — identical both times:

```
/usr/bin/grep -noE '[0-9a-f]{12}' F-W6.md | awk -F: '$1>=44 && $1<=52'
```

→ `:44` carries **11** tokens (the movement chain); then `:48 d4f47eb3ec4f` · `:49 cd64d6580098` · `:50 839d9964010b` · `:52 eda1fab4e865` — **four lines, one digest each. `:51` carries no 12-hex token at all.** ⟨cmd⟩ `awk -F: '$1>=48 && $1<=52 {print $1}' | sort -u | wc -l` → **4**.

**Correction: `five struck halves at :48–:52` → `FOUR struck halves at :48–:50 and :52`.** ⊘ **The missing one is this certificate's own work, and the row is otherwise exact.** §PURGED row 1 lists `a89c3386f3f8` at **`F-W6 :51`** among its thirteen pin sites: `:51`'s struck half *was* a digest and the purge retired it, leaving that line carrying only the `§TABLE` citation. **The span `:48`–`:52` is right, the strike-count is one high, and `11 ⊕ 4 = 15` — the row's published occurrence total — is EXACT**, which is why the class arithmetic `61 (b) ⊕ 86 (c) ⊕ 1 (d) = 148` closed for `PASS-7/CHECK.md` §3 D-1 despite the miscount. **The error is in the prose gloss, not in the census it glosses.**

---

## §TABLE-R7 — **THE RE-BASE. §TABLE IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

**§TABLE (2026-08-29, round 6) is stale by construction and stands as HISTORY.** It was true of the R6 bytes and of no later state — its own ⊘ expiry clause says so in terms: *"Any seat that writes a spec after this certificate issues VOIDS it by construction … and owes a re-issue at its own settle."* **Three round-7 seats wrote after it** — the canonical seat, the re-base seat, and the eleven specs' denominators with them — so all twelve rows moved. **This is the owed re-issue, discharged in the lawful shape: an append, never a patch (E-3).**

⊙ **What a spec cites is unchanged.** The spelling `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` **still resolves**, because both tables are dated `2026-08-29` and this section states the precedence: **the table below is the operand; §TABLE above is the round-6 reading of the same star.** The topology is untouched — one file pinning eleven, no in-edges, no cycle, and writing this certificate stales nothing.

⊙ **The census pin, re-measured at these bytes.** `PASS-7/CHECK.md` §4.4 convicted 39 live sites of the superseded `3e0a9acb3381` in 11 of 11 specs. ⟨cmd⟩ this seat at R7: `3e0a9acb3381` → **8 occurrences in 6 specs** (history position), `b6d8d858c387` → **0**, and **`f44362757458` → 39 occurrences in 11 of 11** — which is **row 12 below**. **The re-base seat re-pinned the canonical and it is correct at these bytes.** ⟨cmd⟩ total 12-hex tokens across the eleven → **156** (R6: 148); the growth is the re-base's own dated strike history, and adjudicating it is the next check's work, not this append's claim.

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat found frozen and of no later state. **The next seat to write a spec voids this table too and owes the next append.** A hash still proves only that bytes did not move; it does not prove a paste was produced by its command (F-W9 `:505`/REST-54 remains the programme's own counter-example), and **no certificate issues its own conformance** — `PASS-7`'s verify-only seal re-runs what follows.

⟨cmd⟩ this seat, 2026-08-29, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **AFTER** the canonical's and the re-base seat's last byte and **as the absolute last act of this write**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  docs/tranches/X/fourier/waves/F-W0.md
d03e07468c7477a775217d933f20e16c22c88e34eeae36be4f7c8ddaacdc12c0  docs/tranches/X/fourier/waves/F-W1.md
d97a0123bf99ceba2f9c97a4a484ba03e482188f478b0e4d0910e32e80910fa9  docs/tranches/X/fourier/waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  docs/tranches/X/fourier/waves/F-W2.md
bfa4278c5599b7866e87865f74b0380b91b27c2af77400f979d610e017f56cad  docs/tranches/X/fourier/waves/F-W3.md
0932ced1a4c0fcc22a73e8eb2b942891f55ae5cd352d2f8bba5d12b4089472f2  docs/tranches/X/fourier/waves/F-W4.md
2990f5b510568a469b165ac07cf32d970b227bdc31d8f96139c625d32f05918f  docs/tranches/X/fourier/waves/F-W5.md
f16b290bcf62bfcdecb831b06ab37d5b42204af0380b48473168712c1ce0a0f0  docs/tranches/X/fourier/waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  docs/tranches/X/fourier/waves/F-W7.md
0d464a4a7d3abe8bdcbaa2fe16248f6cf672c8f836fa03b7a90f61b1df16c6dc  docs/tranches/X/fourier/waves/F-W8.md
4972f6a418322629c73cd8e1ffac331d4ec4ecdab897bbed5bf1a79ceacf9602  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE (`docs/tranches/X/fourier/` + the label = the path above). The first-12 prefixes derived beside each — THIS IS THE OPERAND EVERY SPEC NOW CITES:**

| # | file | sha256 (first 12) — **R7, CURRENT AUTHORITY** | superseded §TABLE row (R6, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`c03149fc2f9e`** | `d26cc4630f80` |
| 2 | `waves/F-W1.md` | **`d03e07468c74`** | `fc3e28d3a5f8` |
| 3 | `waves/F-W2.md` | **`655a21e7a64d`** | `02c5ba9448f5` |
| 4 | `waves/F-W3.md` | **`bfa4278c5599`** | `ae589556a1b2` |
| 5 | `waves/F-W4.md` | **`0932ced1a4c0`** | `d503170c111b` |
| 6 | `waves/F-W5.md` | **`2990f5b51056`** | `a5ce07de3e6d` |
| 7 | `waves/F-W6.md` | **`f16b290bcf62`** | `2d9969fb8320` |
| 8 | `waves/F-W7.md` | **`16e35d5bb571`** | `c03cf709a963` |
| 9 | `waves/F-W8.md` | **`0d464a4a7d3a`** | `6c1408766fd0` |
| 10 | `waves/F-W9.md` | **`4972f6a41832`** | `459d959db156` |
| 11 | `waves/F-W10.md` | **`d97a0123bf99`** | `80eff6ad1a26` |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `b6d8d858c387` |

---

## §ERRATA-R9 — **2026-08-29. THE RE-BASE. §TABLE-R7 IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

**§TABLE-R7 expired exactly as it said it would, and it expired TWICE before this append discharged it.** Its own clause reads: *"These twelve are true of the bytes this seat found frozen and of no later state. **The next seat to write a spec voids this table too and owes the next append.**"* **Round 8 wrote five specs and never appended** — the debt `PASS-9/CHECK.md` files as INFO-1 — and **round 9, this seat, then wrote five more.** This append discharges both debts at once, in the lawful shape: **an append, never a patch (E-3).** §TABLE and §TABLE-R7 stand as HISTORY and are not edited.

⊙ **What a spec cites is unchanged.** The spelling `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` **still resolves**: all three tables are dated `2026-08-29`, and precedence is stated here — **the table below is the operand; §TABLE-R7 is the round-7 reading and §TABLE the round-6 reading of the same star.** The topology is untouched: one file pinning eleven, no in-edges, no cycle.

⊙ **The census pin did not move, and that is the load-bearing fact of this round.** Row 12 stands at **`f44362757458`**, byte-identical to §TABLE-R7's row 12 — the canonical was **FROZEN** for the whole of round 9 and every repair above was cut against it. **No spec's census citation is stale.** ⊘ The round's largest finding was that a frozen operand is not a frozen *address*: fourteen canonical `:NNNN` coordinates across `F-W3` and `F-W8` had died under errata rounds 5–6 while the digest they cite stayed exact, and one `sed` line-range in `F-W6` silently changed what it addressed. **A pin proves bytes, never coordinates** — the same limit this certificate already states about pastes and their commands.

### The six changed rows, old → new

- **Row 2 · `waves/F-W1.md`** — `d03e07468c74` **→ `176280bebc23`** ⟨*through the un-appended round-8 state `0b638dc6386b`*⟩ — §6·R5's stale `K1` canonical paste struck and sub-noted (E6-3), and the section's count-word plus its universal re-measured and restated enumerated.
- **Row 4 · `waves/F-W3.md`** — `bfa4278c5599` **→ `93bc1ebc4a24`** ⟨*untouched at round 8; this spec moves for the first time since R7*⟩ — three dead canonical coordinates re-based (`4393`→`4433`, `1761`→`1875`, `1764`→`1878`) and two `verbatim` pastes completed with the `<sub>legs: F.W4</sub>` they had silently elided.
- **Row 5 · `waves/F-W4.md`** — `0932ced1a4c0` **→ `052731a56a12`** ⟨*through the un-appended round-8 state `2f18c3d385f2`*⟩ — the self-refuting `FM-18` receipt re-stated honestly at its true count with the R3-3.8 pairing, and §2.X.2(b)'s record denominator re-derived `17 records` → **`16 records`**.
- **Row 6 · `waves/F-W5.md`** — `2990f5b51056` **→ `40bcad59cd2b`** ⟨*round-8 state, carried; this seat did not write F-W5 and its bytes are unchanged since round 8*⟩ — appended here only because §TABLE-R7 never recorded the move.
- **Row 7 · `waves/F-W6.md`** — `f16b290bcf62` **→ `e83dcad051f5`** ⟨*through the un-appended round-8 state `f32f8ec4eca5`*⟩ — §2.11's range receipt re-cut `4990,5038p` → **`5078,5091p`** and its failed *"stamped operand never moves"* defence struck for the dated truth.
- **Row 9 · `waves/F-W8.md`** — `0d464a4a7d3a` **→ `355d8c97c383`** ⟨*through the un-appended round-8 state `73ddc4d0bf0e`*⟩ — the `ConvergencePlot` receipt re-cut discriminating on the §6a citation-row shape, eight dead canonical coordinates re-based (three of them found by this seat's own sweep, at the masthead), and the two E5-15 mid-sentence splice artifacts repaired.

**Six unchanged and carried forward exact: rows 1 (`F-W0`), 3 (`F-W2`), 8 (`F-W7`), 10 (`F-W9`), 11 (`F-W10`) and 12 (the canonical).**

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table too and owes the next append** — and round 8 is the standing proof that the debt is real and can go undischarged. A hash proves only that bytes did not move; it does not prove a paste was produced by its command (`F-W9 :505`/REST-54 remains the programme's own counter-example), and **no certificate issues its own conformance** — the round-9 verify seat re-runs what follows.

⟨cmd⟩ this seat, 2026-08-29, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **as the absolute last act of this write, after every spec edit settled**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  docs/tranches/X/fourier/waves/F-W0.md
176280bebc230da62efa5dbd9fda3469fd7b5773ad7db8f535fda64f7a578093  docs/tranches/X/fourier/waves/F-W1.md
d97a0123bf99ceba2f9c97a4a484ba03e482188f478b0e4d0910e32e80910fa9  docs/tranches/X/fourier/waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  docs/tranches/X/fourier/waves/F-W2.md
93bc1ebc4a24d33bc9dc062a308eed0d42169665199a8875f2f7920d31443622  docs/tranches/X/fourier/waves/F-W3.md
052731a56a1257e0d886841db1cf7f056716c526b22fd2bdd902321b42b2aff4  docs/tranches/X/fourier/waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  docs/tranches/X/fourier/waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  docs/tranches/X/fourier/waves/F-W7.md
355d8c97c383438094b40eceeea4744cc93b3333362f733688a55aade7d4305f  docs/tranches/X/fourier/waves/F-W8.md
4972f6a418322629c73cd8e1ffac331d4ec4ecdab897bbed5bf1a79ceacf9602  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE and §TABLE-R7 (`docs/tranches/X/fourier/` + the label = the path above). The first-12 prefixes derived beside each — THIS IS THE OPERAND EVERY SPEC NOW CITES:**

| # | file | sha256 (first 12) — **R9, CURRENT AUTHORITY** | superseded §TABLE-R7 row (R7, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`c03149fc2f9e`** | `c03149fc2f9e` *(unmoved)* |
| 2 | `waves/F-W1.md` | **`176280bebc23`** | `d03e07468c74` |
| 3 | `waves/F-W2.md` | **`655a21e7a64d`** | `655a21e7a64d` *(unmoved)* |
| 4 | `waves/F-W3.md` | **`93bc1ebc4a24`** | `bfa4278c5599` |
| 5 | `waves/F-W4.md` | **`052731a56a12`** | `0932ced1a4c0` |
| 6 | `waves/F-W5.md` | **`40bcad59cd2b`** | `2990f5b51056` |
| 7 | `waves/F-W6.md` | **`e83dcad051f5`** | `f16b290bcf62` |
| 8 | `waves/F-W7.md` | **`16e35d5bb571`** | `16e35d5bb571` *(unmoved)* |
| 9 | `waves/F-W8.md` | **`355d8c97c383`** | `0d464a4a7d3a` |
| 10 | `waves/F-W9.md` | **`4972f6a41832`** | `4972f6a41832` *(unmoved)* |
| 11 | `waves/F-W10.md` | **`d97a0123bf99`** | `d97a0123bf99` *(unmoved)* |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` *(FROZEN, unmoved)* |

---

## §ERRATA-R10 — **2026-08-30. THE RE-BASE. §ERRATA-R9 IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

**§ERRATA-R9 expired exactly as it said it would, and this append discharges the debt in the same sitting the specs moved.** Its own clause reads: *"These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table too and owes the next append.**"* **Round 10 wrote five specs** — `F-W1`, `F-W4`, `F-W8`, `F-W9`, `F-W10` — so the table above is void and this one replaces it. **An append, never a patch (E-3):** §TABLE, §TABLE-R7 and §ERRATA-R9 all stand above as HISTORY and not one byte of them is edited.

⊙ **Precedence, restated.** The spelling `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` **still resolves**: **the table below is the operand**; §ERRATA-R9 is the round-9 reading, §TABLE-R7 the round-7 reading and §TABLE the round-6 reading of the same star. The topology is untouched — one file pinning eleven, no in-edges, no cycle.

⊙ **The census pin did not move, for the second consecutive round.** Row 12 stands at **`f44362757458`**, byte-identical to §ERRATA-R9's and §TABLE-R7's row 12. **The canonical was FROZEN for the whole of round 10, verified at this seat's first act and again at its last, and every repair below was cut against it.** No spec's census citation is stale, and `rosterEscapes` is untouched at **ZERO**.

### §ERRATA-R10·a — the correction this append owes §ERRATA-R9 (seal `LW-3`; PASS-10 `LW-R10-d`, MINOR)

⌧ **Row 9 of the block above undercounts the round-9 re-based coordinates, and the undercount is in the certificate's own summary of that round.** It reads *"eight dead canonical coordinates re-based **(three of them found by this seat's own sweep, at the masthead)**"*. **The masthead three are ADDITIONAL, not a subset of the eight.** ⟨cmd⟩ enumerated from `F-W8`'s own notes: `F-W8:15` (masthead) → `5394` · `5393` · `5396` — and `F-W8.md:15` says so in terms, *"Found by this seat's own round-9 sweep … **not by the pass-9 check's list**"* — ⊕ `F-W8:81` → `5034` (1) ⊕ `F-W8:246`(A) → `5044` · `5091` · `5358` (3) ⊕ `F-W8:246`(B) → `4968` · `5044` · `1305` · `4037` (4). The check-listed subtotal is `3 + 4 + 1 = 8`; **the masthead adds three.**

▲ **THE CORRECTION, stated here and never patched into row 9 (E-3):** *"three of them"* **must read** *"three more"*, and *"eight"* **must read ELEVEN** — **11 mentions / 10 DISTINCT coordinates**, `5044` being the one that appears in both `:246` receipts. **Non-load-bearing — all eleven verify** at `PASS-10/CHECK.md` §4.1 R-1…R-14 — and named because it lands in the one document the next seat reads, and because it undercounts round 9's best work by three.

### §ERRATA-R10·b — the five changed rows, old → new

- **Row 2 · `waves/F-W1.md`** — `176280bebc23` **→ `ab2437af09e0`** — the last live superseded census digest chased (PASS-10 `LW-R10-h`). `§E-3·R4`'s dated errata row at `:725` carries `a450b8e9f80e` present-tense and unstruck; **E-3 bars rewriting a dated row**, so a `<sub>` note was **APPENDED beside it** naming `f44362757458` as the current digest. **Not one byte of the row itself changed.** Pass 9's universal now holds at **all 30** occurrences of the two superseded digests: 28 by an adjacent `f44362757458`, two (`F-W1:437`, `F-W2:32`) inside explicit strike minutes.
- **Row 5 · `waves/F-W4.md`** — `052731a56a12` **→ `7b427c227275`** — **two cures, both seal-filed and both uncured for a round.** `:192`'s `showImageOverlay` receipt (`LW-R10-b`, MEDIUM, seal `LW-1`): the published *"one occurrence each, **both inside this row**"* was false — the true count was **2**, and the second, `:347`, is round 9's own restatement spelling the token in full **inside the sentence certifying `:192` GREEN**. Re-cut self-excluding: `awk 'NR!=192' … | grep -c` → **1**. `:347`'s byte-universal (`LW-R10-c`, MINOR, seal `LW-2`): *"the sole occurrence of `FM-18` at any byte of this spec"* is refuted by the clause stating it; struck and restated to the **substantive-byte** form the same line already carried, with `awk 'NR!=347' … | grep -c` → **0** banked in its place. ⊙ The GREEN sibling `grep -c 'shape only'` → **1** is untouched, and `D:m-6`'s booking is unmoved.
- **Row 9 · `waves/F-W8.md`** — `355d8c97c383` **→ `16d587cb7d77`** — `:324`'s *"zero bytes anywhere else in this file"* for `fr-PaperSearchDropdown C:C-23` (`LW-R10-e`, MINOR) restated **enumerated**: **zero SUBSTANTIVE bytes**, with the token's **eleven** lines listed — `:20` `:25` `:27` `:40` `:78` `:81` `:165` `:246` `:267` `:322` `:324` — and each of the other ten identified as a chase note, disclosure or E5-15/REST-51 minute **about this same non-booking**. Substance re-verified and unchanged: `C:C-23` is cited to F-W5, homed `UNROUTED` at canonical `:5428`, booked nowhere at F.W8.
- **Row 10 · `waves/F-W9.md`** — `4972f6a41832` **→ `66030d34992d`** — `:505`'s pair-universal (`LW-R10-f`, MINOR) — *"`(fr-VisualizationView, L-26)` … appears nowhere in this spec"*, whose own clause was the sole site — struck and restated **self-excluding**: `awk 'NR!=505' … | grep -E '…L-26…' | grep -c 'fr-VisualizationView'` → **0**, with the boundary probe's three `L-26` lines (`:119` `:304` `:505`) enumerated. **The substance — no BOOKING of that pair in F-W9 — is unchanged and confirmed by the canonical id-set identity.**
- **Row 11 · `waves/F-W10.md`** — `d97a0123bf99` **→ `d3fa14c669dd`** — **the round's principal repair, and the site nine passes read past.** `:338`'s `ExportModal` receipt (`LW-R10-a`, MEDIUM) published ⟨cmd⟩ `grep -cF 'ExportModal' waves/F-W10.md` → **0** in a sentence spelling the token three times — **unproducible from any byte-state containing that line**, not stale — while `:296` books `fr-ExportModal L-16` as a fold (REST-65) that `:338` listed among its escapes. Struck and re-cut self-excluding: whole-file **2** (`:296`, `:338`), `awk 'NR!=338'` → **1** at the live booking; the universal **WITHDRAWN**; the count-word corrected **`52 · 13` → `53 · 12`** by re-running the note's own record-qualified probe per pair with `:338` excluded (`fr-ExportModal L-16` = 1, the other twelve = 0); and the collateral *"9 hits, every one another record's"* re-cut to **10** with `:296` named as `fr-ExportModal`'s own. ⊕ `:446`'s disposition cell re-qualified `FR-NP-32 (≡ **fr-PaperSidebar** M1)` (`LW-R10-g`, MINOR; R-5 — an unqualified short token is not an identity). ⊕ **§R10-LAW added**, which is where the round's law and its corpus sweep live.

**Seven unchanged and carried forward exact: rows 1 (`F-W0`), 3 (`F-W2`), 4 (`F-W3`), 6 (`F-W5`), 7 (`F-W6`), 8 (`F-W7`) and 12 (the canonical).**

### §ERRATA-R10·c — the law this round added, and the sweep that applies it

▲ **THE SELF-COUNT LAW, stated once in the corpus at `F-W10.md` §R10-LAW and binding on all eleven specs:** *a receipt that counts or denies a token **inside its own file** must EITHER use the **self-excluding probe** (`awk 'NR!=<own-line>' file | grep …`, exclusion declared inline) OR **quantify over SUBSTANTIVE bytes** (bookings, roster rows) **with the self- and chase-note occurrences enumerated beside it**. A bare "appears nowhere" over a file containing the claiming sentence is **defective at authoring** — never producible, therefore never merely stale.* ⊘ **The corollary the programme paid ten rounds to learn: `grep -c` counts LINES, so a receipt can be arithmetically GREEN while the universal wrapped around it is false at the bytes.** The receipt and the sentence are two claims and both must be checked.

⊙ **The sweep (PASS-10 item 8), corpus-wide over all eleven specs, at the settled bytes: 35 MEMBERS · 5 FALSIFIED and cured · 30 already lawful.** Two instruments, unioned and deduped by site — **(A)** own-file `grep -c/-o/-q/-l` receipts whose own line matches their own pattern (**20** sites); **(B)** own-file-scoped absence universals over a declared phrase set (**20** sites); minus **11** hand-adjudicated non-members whose subject is another file, another doc, a product-tree token or a path. **The five falsified are exactly the five cured above.** ⚠ **The tally is INSTRUMENT-RELATIVE and says so at its own site** — it is what the two published probes return at these bytes, not a universal over every receipt in the corpus, which is the very shape the law forbids. ⊙ **One member carries a separate defect round 10 did not cure and does not claim to**: `F-W9:289`'s three-home enumeration is lawful as a count but its coordinates have drifted — it cites `:178` `:282` `:452` where the token now stands at **`:185` `:289` `:461`**. **Filed for round 11.**

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table too and owes the next append.** A hash proves only that bytes did not move; **it does not prove that a paste was produced by its command, nor that a sentence wrapped around a true count is itself true** — `LW-R10-a` is this round's demonstration of both, found *after* a hash table that was, and remains, clean. **No certificate issues its own conformance**; the round-10 verify seat re-runs what follows.

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **as the absolute last act of this write, after every spec edit settled**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  docs/tranches/X/fourier/waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  docs/tranches/X/fourier/waves/F-W1.md
d3fa14c669dd2a60419ad217b42ffdb374f8f4ea76b7e3b5458b24cef2a494d0  docs/tranches/X/fourier/waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  docs/tranches/X/fourier/waves/F-W2.md
93bc1ebc4a24d33bc9dc062a308eed0d42169665199a8875f2f7920d31443622  docs/tranches/X/fourier/waves/F-W3.md
7b427c227275ce7c6c3463e8bafbab1c17fdb3d05caea7fa80510d6e4df0d1e3  docs/tranches/X/fourier/waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  docs/tranches/X/fourier/waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  docs/tranches/X/fourier/waves/F-W7.md
16d587cb7d77c60195622d89623b9e94c9a0861ac0543c08d4e36bc8b278e762  docs/tranches/X/fourier/waves/F-W8.md
66030d34992db570b47d9e6496b56350b6c71c91897c7bd7320ba65e1d5f3f13  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE, §TABLE-R7 and §ERRATA-R9 (`docs/tranches/X/fourier/` + the label = the path above). The first-12 prefixes derived beside each — THIS IS THE OPERAND EVERY SPEC NOW CITES:**

| # | file | sha256 (first 12) — **R10, CURRENT AUTHORITY** | superseded §ERRATA-R9 row (R9, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`c03149fc2f9e`** | `c03149fc2f9e` *(unmoved)* |
| 2 | `waves/F-W1.md` | **`ab2437af09e0`** | `176280bebc23` |
| 3 | `waves/F-W2.md` | **`655a21e7a64d`** | `655a21e7a64d` *(unmoved)* |
| 4 | `waves/F-W3.md` | **`93bc1ebc4a24`** | `93bc1ebc4a24` *(unmoved)* |
| 5 | `waves/F-W4.md` | **`7b427c227275`** | `052731a56a12` |
| 6 | `waves/F-W5.md` | **`40bcad59cd2b`** | `40bcad59cd2b` *(unmoved)* |
| 7 | `waves/F-W6.md` | **`e83dcad051f5`** | `e83dcad051f5` *(unmoved)* |
| 8 | `waves/F-W7.md` | **`16e35d5bb571`** | `16e35d5bb571` *(unmoved)* |
| 9 | `waves/F-W8.md` | **`16d587cb7d77`** | `355d8c97c383` |
| 10 | `waves/F-W9.md` | **`66030d34992d`** | `4972f6a41832` |
| 11 | `waves/F-W10.md` | **`d3fa14c669dd`** | `d97a0123bf99` |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` *(FROZEN, unmoved)* |

---

# §ERRATA-R11 — **2026-08-30. THE RE-BASE. §ERRATA-R10 IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

**§ERRATA-R10 expired exactly as it said it would.** Its own clause reads: *"These twelve are true of the bytes this seat settled and of no later state. The next seat to write a spec voids this table."* **Eight specs were written in round 11 — the numeric reconciliation — and this append discharges the debt in the same sitting.**

⊙ **Precedence, restated.** The spelling `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` **still resolves**: **the table at the foot of this section is the operand**; §ERRATA-R10 is the round-10 reading, §ERRATA-R9 the round-9 reading, §TABLE-R7 and §TABLE the older ones — all preserved, none patched (E-3).

⊙ **The census pin did not move, for the THIRD consecutive round.** Row 12 stands at **`f44362757458`**, byte-identical to §ERRATA-R10's, §ERRATA-R9's and §TABLE-R7's row 12. **The canonical was FROZEN across the whole of round 11 and no seat wrote to it**; round 11 was a repair of the specs *against* it, never of it.

### §ERRATA-R11·a — the correction this append owes `PASS-10/SEAL.md` §3.2 (PASS-11 `D-10`, MINOR; E-3 — the correction lives HERE and the seal is not patched)

⌧ **The seal states a distribution in one unit and its total in another.** §3.2 publishes: *"⟨cmd⟩ `grep -ohE '3e0a9acb3381|a450b8e9f80e' F-W*.md | wc -l` → **30**, distributed `F-W1` 7 · `F-W2` 5 · `F-W9` 2 · seven files 1 each · `F-W0` 0."* **That distribution sums to 21, not 30.**

▲ **THE DISPOSITION, stated here and never patched into the seal (E-3): both numbers are RIGHT and the sentence conflates two units.** **The total `30` is per-OCCURRENCE; the distribution is per-LINE.** Re-measured by this seat at the round-11 settled bytes, both ways:

- **per-OCCURRENCE** (`grep -ohE … | wc -l`): `F-W0` 0 · `F-W1` **8** · `F-W2` **7** · `F-W3` 2 · `F-W4` 3 · `F-W5` 1 · `F-W6` 2 · `F-W7` 2 · `F-W8` 1 · `F-W9` 3 · `F-W10` 1 = **30** ✓
- **per-LINE** (`grep -cE …`): `F-W0` 0 · `F-W1` **7** · `F-W2` **5** · `F-W3` 1 · `F-W4` 1 · `F-W5` 1 · `F-W6` 1 · `F-W7` 1 · `F-W8` 1 · `F-W9` **2** · `F-W10` 1 = **21** ✓ — **exactly the seal's list.**

⊙ **The corpus figure 30 is correct and the chase audit is clean**: all 21 lines carry a same-line chase to the frozen digest, and **zero live superseded digests lack their marker**. Only the seal's sentence mixed units. **Both figures are unmoved by round 11's eight spec writes** — the round's chase notes cite `f44362757458` and never a superseded digest — so this disposition is stated against bytes that are current, not against the seal's.

### §ERRATA-R11·b — the `FR-NP-32` literal-probe note (PASS-11 `D-11`, INFO; recorded so a round-12 gate is not written to fire on lawful bytes)

⊙ ⟨cmd⟩ `grep -cF '(≡ M1' waves/F-W10.md` → **1**, not 0. **The single hit is the retired bare spelling quoted INSIDE ITS OWN STRIKE** at `F-W10:446`, standing beside two live, properly qualified `FR-NP-32 (≡ fr-PaperSidebar M1)`. Self-excluding: ⟨cmd⟩ `awk 'NR!=446' waves/F-W10.md | grep -cF '(≡ M1'` → **0**.

▲ **The axis-5 requirement — zero UNQUALIFIED `≡ M1` — is SATISFIED, and the self-excluding form is the lawful probe.** **A gate written to expect a literal zero fires on lawful bytes**: it convicts a strike note for containing the very spelling the strike retires. Recorded here, per round 10's own self-count law, so the next seat writes `awk 'NR!=n' … | grep -cF` and not a bare `grep -cF`.

### §ERRATA-R11·c — the eight changed rows, old → new

- **Row 1 · `waves/F-W0.md`** — `c03149fc2f9e` **→ `1f5a93c90ed7`** — the **§R11 numeric-reconciliation note** appended at **end-of-file**: method, the authority list copied whole from the frozen canonical, the tally, and the round's five laws. Appended at EOF deliberately, **so no coordinate can stand at-or-below its insertion point**. Scoped and non-universal per the self-count law, and **verified not to perturb either enumerated set it reports** (quoted canonical row headings 24 → 24; `N records` claims 157 → 157).
- **Row 3 · `waves/F-W2.md`** — `655a21e7a64d` **→ `77854a06b2ee`** — `:248`'s self-count member (PASS-11 `D-4`, MEDIUM; seal `LW-S3`), **live through passes 8, 9 and 10 including the pass convened to close this exact class.** `83`/`sixty-seven` **→ `84`/`sixty-eight`**, with the exclusion **declared** and both readings published per R3-3.8: verbatim **84 · 16 · 68**, self-excluding **81 · 16 · 65**, the line contributing **3** of the 84 and **0** of the 16.
- **Row 4 · `waves/F-W3.md`** — `93bc1ebc4a24` **→ `be86ae410118`** — **HIGH (PASS-11 `D-2`).** `:32`, `:703` and `:784` attributed **superseded** magnitudes to canonical §4.3 **by name, in the present tense** — `2768` tokens / `4269` banked ids / `2767` bookings, the pre-errata-round-5 reading, with `:32` asserting *"Both are rules of the operand now"*. Re-based to **2780 / 4242 / 2779** with dated notes citing the canonical's own E5-era supersession record. **Before the cure the file carried NOT ONE current magnitude** (⟨cmd⟩ `grep -c '4242\|2780\|2779'` → **0**); it now carries all three.
- **Row 5 · `waves/F-W4.md`** — `7b427c227275` **→ `2fb6e6d637bb`** — **HIGH (PASS-11 `D-1` ⊕ `D-3`, MEDIUM).** Four unchased sites declared a **SOLE census operand the frozen canonical does not carry**: `:7` the masthead, `:349` the falsifiable arithmetic, `:374` the closure gate `G-F4-CARRY-CLOSURE` — **self-refuting**, naming `1014` in the same breath as *"hash-pinned at §2.X.2"*, and §2.X.2 reads `1007` — and `:455` the register. All four re-based **`1014` → `1007`**; the arithmetic re-based **`29 + 72 + 913 = 1014` → `29 + 71 + 907 = 1007`**, citing the `(b)` heading that already read **71** under its own round-7 chase note. **The 54-record claim was re-verified against the canonical roster and is unmoved and CORRECT.**
- **Row 8 · `waves/F-W7.md`** — `16e35d5bb571` **→ `75a08eeee03a`** — **TWO cures, the first of them NEW and filed by no prior pass, check or certificate.** ⌧ `:291` published a ⟨cmd⟩ receipt claiming the canonical returns `"### F.W4 — **1014 rows**"`; **at the frozen canonical that command returns ZERO.** Re-based to `1007`, at which the probe returns **1**. It survived ten rounds because it is not a magnitude the spec *asserts* but one it *quotes from the authority* — a class no prior sweep probed. Its three companion receipts on the same row were re-run and **all three reproduce exactly**. ⊙ `:16`'s residue enumeration (PASS-11 `D-9`, MINOR) took that check's **own prescribed cure — the instrument is scoped, not the count re-cut**: the probe is re-scoped from `docs/` to `docs/tranches/X/fourier/waves/`, where it returns `F-W7.md` alone and is **structurally stable**. The unscoped figure is recorded at cure time as **seven** — it stood at four, then five, and `PASS-11/CHECK.md` with its `CHECK-RETURN.json` became members six and seven **while round 11 was running**, which is the defect proving itself.
- **Row 9 · `waves/F-W8.md`** — `16d587cb7d77` **→ `d8237cf6b11e`** — `:324`'s count word (PASS-11 `D-7`, MINOR): the label read **nine** while the enumeration beneath it lists **ten** (`11 − 1` for the claiming line). **This certificate's own §ERRATA-R10·b row 9 already stated it correctly as *"the other ten"*, so the cert was right and the spec disagreed with it**; the spec now agrees. All eleven coordinates re-verify; the `UNROUTED` homing is untouched.
- **Row 10 · `waves/F-W9.md`** — `66030d34992d` **→ `b265bf677869`** — **TWO cures.** `:289`'s coordinate citation (PASS-11 `D-8`, MINOR), filed for this round by **§ERRATA-R10·c** and confirmed by the seal: `:178` `:282` `:452` **→ `:185` `:289` `:461`**, a uniform **+7**; the word-output half re-runs TRUE and is unmoved. ⌧ **And one NEW, found by this round's post-settle sweep and filed by nobody**: `:505` cited **`F-W3.md:783`**, which at the settled bytes is a **BLANK LINE**; the true home is **`:815`**, a **+32** cross-file drift. **The set-membership conclusion is untouched and still correct** — only the address had rotted. **No single file's line count reveals this class**, which is why the sweep is run across files and not within them.
- **Row 11 · `waves/F-W10.md`** — `d3fa14c669dd` **→ `9415e4c93e57`** — **TWO cures, both of them round 10's own repairs convicting themselves.** `:338` (PASS-11 `D-5`, MEDIUM; seal `LW-S1`) published the ninth `L-16` home as **`:419`** — and **the cure that published it is what displaced it**, having expanded that line from one to twenty-four and moved everything below by **+23**; `419 + 23 = 442`, re-based, and corroborated by the identical +23 at the `FR-NP-32` site (`:423` → `:446`). `:467` (PASS-11 `D-6`, MINOR; seal `LW-S4`) published `14 · 14 · 13` while **being itself the third of the three hits it counts**, the third value being the one its own REST-67 cure had just changed; restated as the true **`14 · 14 · 14`** with the **R3-3.8 before/after pairing** and the self-excluding figure (**2**, both `14`) declared. The substance re-derives TRUE at `23 + 36 + 16 + 14 = 89`.

**Four unchanged and carried forward exact: rows 2 (`F-W1`), 6 (`F-W5`), 7 (`F-W6`) and 12 (the canonical, FROZEN for a third round).**

### §ERRATA-R11·d — the round's coordinate discipline, stated for the next seat

▲ **Every cure in round 11 was an IN-PLACE, SINGLE-LINE replacement, and the §R11 note was appended at END-OF-FILE.** All eleven wave-spec line counts are **byte-identical before and after** the repair — `F-W1` 735 · `F-W2` 465 · `F-W3` 912 · `F-W4` 470 · `F-W5` 433 · `F-W6` 634 · `F-W7` 359 · `F-W8` 374 · `F-W9` 557 · `F-W10` 515, with `F-W0` 535 growing **only** by its EOF append. **No coordinate anywhere in the corpus was displaced by this round, by construction** — the `+23` class that produced `:419` and `:423` cannot recur from these edits.

⊙ **The sweep re-ran regardless rather than reasoning from the invariant** — 36 intra-file and 13 cross-file coordinates: **48 verify unchanged; 1 was found ALREADY drifted and re-based** (`F-W9:505` → `F-W3.md:815`). **Five coordinates were deliberately re-based this round**: `F-W10`'s `:419` → `:442`, `F-W9`'s `:178`/`:282`/`:452` → `:185`/`:289`/`:461`, and `F-W9:505`'s cross-file `:783` → `:815`.

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table** and owes the corpus a `§ERRATA-R12` in the same sitting.

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **as the absolute last act of this write, after every spec edit settled**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

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
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE, §TABLE-R7, §ERRATA-R9 and §ERRATA-R10 (`docs/tranches/X/fourier/` + the label = the path above). Eight moved; four are unmoved, the canonical among them for a third consecutive round.**

| # | file | sha256 (first 12) — **R11, CURRENT AUTHORITY** | superseded §ERRATA-R10 row (R10, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`1f5a93c90ed7`** | `c03149fc2f9e` |
| 2 | `waves/F-W1.md` | **`ab2437af09e0`** | `ab2437af09e0` *(unmoved)* |
| 3 | `waves/F-W2.md` | **`77854a06b2ee`** | `655a21e7a64d` |
| 4 | `waves/F-W3.md` | **`be86ae410118`** | `93bc1ebc4a24` |
| 5 | `waves/F-W4.md` | **`2fb6e6d637bb`** | `7b427c227275` |
| 6 | `waves/F-W5.md` | **`40bcad59cd2b`** | `40bcad59cd2b` *(unmoved)* |
| 7 | `waves/F-W6.md` | **`e83dcad051f5`** | `e83dcad051f5` *(unmoved)* |
| 8 | `waves/F-W7.md` | **`75a08eeee03a`** | `16e35d5bb571` |
| 9 | `waves/F-W8.md` | **`d8237cf6b11e`** | `16d587cb7d77` |
| 10 | `waves/F-W9.md` | **`b265bf677869`** | `66030d34992d` |
| 11 | `waves/F-W10.md` | **`9415e4c93e57`** | `d3fa14c669dd` |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` *(FROZEN, unmoved)* |

---

# §ERRATA-R12 — **2026-08-30. THE RE-BASE. §ERRATA-R11 IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

**§ERRATA-R11 expired exactly as it said it would.** Its own clause reads: *"These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table** and owes the corpus a `§ERRATA-R12` in the same sitting."* **Three specs were written in round 12 — the terminal surgical round — and this append discharges the debt in the same sitting.**

⊙ **Precedence, restated.** The spelling `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` **still resolves**: **the table at the foot of this section is the operand**; §ERRATA-R11 is the round-11 reading, §ERRATA-R10 the round-10 reading, §ERRATA-R9, §TABLE-R7 and §TABLE the older ones — all preserved, none patched (E-3).

⊙ **The census pin did not move, for the FOURTH consecutive round.** Row 12 stands at **`f44362757458`**, byte-identical to §ERRATA-R11's, §ERRATA-R10's, §ERRATA-R9's and §TABLE-R7's row 12. **The canonical was FROZEN across the whole of round 12 and no seat wrote to it**; round 12, like the three rounds before it, was a repair of the specs *against* the canonical and never of it. **The freeze was verified as this seat's FIRST act, before a byte was written**, and re-verified inside both figure-settle runs. ⊙ **No stale pin propagated**: ⟨cmd⟩ `grep -n '77854a06b2ee\|75a08eeee03a\|9415e4c93e57' waves/F-W*.md` → **∅ (exit 1)** — not one of the three digests this append supersedes is cited anywhere in the eleven, and all eleven carry the live `f44362757458` (4 · 13 · 2 · 6 · 9 · 4 · 5 · 4 · 2 · 6 · 3 occurrences, glob order).

### §ERRATA-R12·a — the correction this append owes `PASS-11/SEAL.md` §2 (PASS-12 `P12-4`, INFO; E-3 — the correction lives HERE and the seal is not patched)

⊙ **The seal's count-word runs one ahead of the sentence a reader counts it in.** §2 closes: *"**29 authority values established and verified independently: 8 row totals · 8 record counts · 8 §3 aggregates · 3 §4.3 magnitudes · 2 §4.2 arithmetics.**"* Its §3-aggregate sentence enumerates **seven** — *"records censused **66** · ROWS **4242** · ids after band expansion **4287** · ALIASES **2780** · rows routing NO-WAVE-OWNER **88** · TERMINAL (∅) **1220** · UNROUTED **307**"* — and the eighth, **wave-duty 2466**, is named only in the ▲ note two paragraphs below (*"`F-W0` §R11-2's transcribed authority table is EXACT in all 28 values, including wave-duty **2466** and TERMINAL **1220**"*).

▲ **THE TRUE ARITHMETIC, stated in both readings so neither is mistaken for the other.**

- **The class-sum is RIGHT, and the count word with it.** `8 + 8 + 8 + 3 + 2 = 29`, because the eighth §3 aggregate **exists, is real, and was verified**.
- **The readable enumeration is one short.** Counted from the circled sentence alone — the only place a reader looks for a list of §3 aggregates — the tally is `8 + 8 + 7 + 3 + 2 = 28`.
- **The eighth value, re-derived independently by this seat from the canonical's own §3 home table rather than quoted from the seal**: the eight wave homes sum to wave-duty — `55 + 330 + 23 + 919 + 1007 + 27 + 89 + 16 = 2466` ✓ — and the residual closes exactly on the enumerated relay/packet/SS band: `4242 − 2466 − 1220 − 307 = 249` ✓.

⊘ **The defect is PLACEMENT, not arithmetic, not verification and not the census.** Nothing the seal says about the census is wrong; one aggregate sits outside the sentence that counts it. **Recorded here and patched nowhere (E-3)** — and stated in terms so that a later seat re-counting the seal's list files it as a known disposition rather than as a fresh discrepancy in the census.

### §ERRATA-R12·b — the three changed rows, old → new

- **Row 3 · `waves/F-W2.md`** — `77854a06b2ee` **→ `0b967619bb35`** — **MEDIUM (PASS-12 `P12-2`), the THIRD consecutive recurrence of one class at one line.** `:248`'s **verbatim arm** published a true measurement of its own PRE-cure bytes as a reading of the bytes it shipped on: round 10 read `83` / *sixty-seven*, round 11 read `84` / *sixty-eight*, and the settled bytes read **86** / *seventy*, with the line's own contribution **5** and not `3` — **two of those five distinct commands being bytes the round-11 chase note ITSELF introduced**, the self-excluding probe the cure added among them, so the delta had been derived by subtraction rather than measured. Re-stated at the figures this seat measured: **verbatim 86 · 16 · 70**; **self-excluding 81 · 16 · 65**, re-verified unmoved and exact in all three; the line contributing **5** of the 86 and **0** of the 16; the count word tracking the verbatim form. **The substantive claim was never in doubt and holds in every reading** — 68/84 published, **70/86** live, 65/81 self-excluding. ▲ **And the law that ends the recurrence is written onto the line itself — WRITE-THEN-MEASURE**: *a published count is a reading of the SETTLED bytes, never of the bytes that existed while the cure was being drafted.* Its settle order is stated in terms — land every prose edit; run a **FINAL FIGURE-SETTLE PASS** permitted to alter **numerals inside existing spans ONLY** (no new command span, no new token of any counted class, since an addition there changes the very count it certifies); then re-run every touched receipt **once more** and confirm byte-exact reproduction. This is the generalisation `R11-5` law 4 stopped one word short of: that law re-bases the coordinates a cure displaces, and this one re-measures the counts a cure's own receipt measures.
- **Row 8 · `waves/F-W7.md`** — `75a08eeee03a` **→ `ba9be3e37613`** — **MINOR (PASS-12 `P12-3`), a MIXED-GENERATION attribution, ADJUDICATED rather than rediscovered.** `:101`'s `REST-37` minute read *"R4-5 makes F.W5 (28) and F.W5-W8 (89) two distinct canonical denominators"*, attributing to ONE frozen ruling a pair of figures that never coexisted in it: **`28` is R4-5-era `F.W5`, superseded to `27` at E6-3 (`fr-ConvergencePlot K-13` → TERMINAL); `89` is the LIVE band, whose R4-5-era reading was `90`, superseded at E5-15 (`C:C-23` → UNROUTED).** Either `28 ⊕ 90` (R4-5) or `27 ⊕ 89` (frozen) — never one of each, so the published pair was true of **no** state of the operand. Re-stated at the axis that was actually confused: **the DISTINCTNESS is R4-5's ruling; the FIGURES belong to their own eras.** R4-5's pair is quoted as dated history (**28 ⊕ 90**), the frozen canonical's is stated live with both errata cites (**27 ⊕ 89** — the same pair `F-W5` §2 and `F-W8` §6a re-based on at repair round 8), and the superseded mixed pair is named as what rounds 5–11 published. **Filed by no prior round, check or certificate — the coordinate returns zero hits across the eleven specs, this certificate and `PASS-11/CHECK.md` — so this entry is the ruling the finding needed and not a second discovery of it.**
- **Row 11 · `waves/F-W10.md`** — `9415e4c93e57` **→ `8ae0ad8fa623`** — **HIGH (PASS-12 `P12-1`); the escape `PASS-11/SEAL.md` filed as `LW-R11-a` and left uncured, the bytes provably unmoved between the two passes.** `:363` asserted — twice, in the present indicative, unchased, and offered as *"the canonical figures measured"* — that the canonical's **F.W9 roster is 17 rows** and that the canonical homes **`R2-7` (fr-PaperArticleWindow) at F.W9**. The frozen canonical reads `### F.W9 — **16 rows** *(errata round 5, 2026-08-29: read 17; `R2-7` → TERMINAL at E5-16)*` — **16 rows across 15 records** — and homes `R2-7` in **TERMINAL (∅)** (`CENSUS-CANONICAL.md` `:3956`, `:5371`), its F.W9 roster body carrying `fr-PaperArticleWindow (2): PAW-34 · PAW-50` and no `R2-7` at all. **The erratum that took 17 → 16 IS the erratum that moved `R2-7`, so the two halves were one defect counted twice** — and they are cured as one act. Both magnitudes chased to **16** with the **E5-16** citation; **the cut count's denominator re-based on the same line** (*"26 cut identities against a **16**-row canonical roster"*); the **`R2-7` limb re-homed TERMINAL (∅)** and **withdrawn from the divergence list**, because the canonical homes it TERMINAL and §2.2 cuts it to no wave — agreement, not divergence. **The R4-10 quotation is byte-true history and its inside is untouched** (*"F-W9 | F.W9 → 17 | masthead re-based"*): a chase now stands OUTSIDE its marks recording that the ruling's `17` is that ruling's own era reading and that what R4-10 assigns is the **DUTY**, unchanged by the magnitude — precisely the point `PASS-12` made when it found the line's lone `re-based` to be the ruling's word about an obligation and never a chase on the operand. **The line is coherent at last with `:494`'s own `⟨*16 at E5-16*⟩` chase on the identical spread, 131 lines below, which this file had carried all along**: ⟨cmd⟩ `grep -c 'F.W9 roster is 17 rows' waves/F-W10.md` → **1** before, **0** after; ⟨cmd⟩ `grep -c '16 rows' waves/F-W10.md` → **0** before, **1** after. **The substantive conclusion survives untouched** — the two sets are not nested, and the reconciliation remains **F-W9's duty under R4-10** — as do the `C:D-11` and `L:L-i2` homings. **The cure was lawfully unilateral**: `:363` is `F-W10`'s own prose at §R10-LAW and sits outside the shared §2.2 splice, and both splice legs `diff` **EMPTY** after the write, so `G-F9-21 ≡ G-F10-6`'s `Δ=∅` is intact.

**Eight unchanged and carried forward exact: rows 1 (`F-W0`), 2 (`F-W1`), 4 (`F-W3`), 5 (`F-W4`), 6 (`F-W5`), 7 (`F-W6`), 9 (`F-W8`) and 10 (`F-W9`) — and row 12, the canonical, FROZEN for a FOURTH consecutive round.**

### §ERRATA-R12·c — the round's coordinate and figure discipline, stated for the next seat

▲ **Every cure in round 12 was an IN-PLACE, SINGLE-LINE replacement, and NOTHING was appended to any spec.** All eleven wave-spec line counts are **byte-identical before and after** the repair — `F-W0` 596 · `F-W1` 735 · `F-W2` 465 · `F-W3` 912 · `F-W4` 470 · `F-W5` 433 · `F-W6` 634 · `F-W7` 359 · `F-W8` 374 · `F-W9` 557 · `F-W10` 515, **total 6050 both times**, reproducing §ERRATA-R11·d and `PASS-12/CHECK.md` §1 exactly. **No coordinate anywhere in the corpus was displaced by this round, by construction, and none needed re-basing** — round 11's `+23` class cannot arise from edits that add no line.

⊙ **THE FIGURE-SETTLE PASS RAN, AND THEN RAN AGAIN.** The three cures landed first; every receipt they touched — and every receipt in the three writable files whose counted class those edits could have moved — was then re-measured **at the settled bytes**, the numerals re-stated under the numerals-only constraint, and the whole battery re-run a second time. **32 receipts, byte-exact on both runs, ZERO drift.** The classes deliberately held invariant, measured before and after: `F-W2`'s command census (**86 · 16 · 81 · 16 · delta 5**), its shell-variable, PCRE and bounded-wildcard probes (**∅ · ∅ · ∅**) and its live-sibling-coordinate probe (**∅**); `F-W7`'s §5 carry census (**15**, unmoved — `:101` sits outside the `## 5. Carry` … `## 6. Gates` range) and its `waves/`-scoped residue (**`F-W7.md` alone**); `F-W10`'s eleven `L-16` coordinates (**ending `:442`**; self-excluding **10**), its `§2.5a-iii's 1[34]` triple (**`14 · 14 · 14`** at `:314` `:442` `:467`; self-excluding **2**), the `(≡ M1` strike (**1**; self-excluding **0**), `35 callsites / 9 consumers` (**2**) and `35/9` (**1**), and the §2.5 pipe-row block (**23**); **both legs of the shared §2.2 splice, `diff` → EMPTY**; and corpus-wide, the two enumerated sets `F-W0` §R11-4 publishes — **quoted canonical row headings 24 → 24** and **`N records` claims 157 → 157** — neither perturbed by a single one of this round's three writes.

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table** and owes the corpus a `§ERRATA-R13` in the same sitting.

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **as the absolute last act of this write, after every spec edit settled and both figure-settle runs closed**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
1f5a93c90ed7e9f4463d859d104b76377bbd190f5b38c8a971a2cc989f734411  docs/tranches/X/fourier/waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  docs/tranches/X/fourier/waves/F-W1.md
8ae0ad8fa623de2201a6184ec32dfcb2a6bd25e2443b69ad4377e24746eeddc9  docs/tranches/X/fourier/waves/F-W10.md
0b967619bb35763b6f1b09529db080fa2f9a37db2fa3e5e1eac70ce2aef7b7a6  docs/tranches/X/fourier/waves/F-W2.md
be86ae4101184d8d7278879f5ab5a8abc9102fbcfdfb554d0523affde576bfcf  docs/tranches/X/fourier/waves/F-W3.md
2fb6e6d637bb6d0fad710716fb1dfa103d39fc41f67d8ff0fb856e4c0126cdb6  docs/tranches/X/fourier/waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  docs/tranches/X/fourier/waves/F-W6.md
ba9be3e376139204a17ad7b5ebc858513bc3880e26f63f7340ebce14145547d7  docs/tranches/X/fourier/waves/F-W7.md
d8237cf6b11ef248e4080b8d805a2ee7477139b8d4cf9cf3564922096e29bd45  docs/tranches/X/fourier/waves/F-W8.md
b265bf677869b0ec6f3c02c54b93272f657111e55498cf05bef14578d6c4b53b  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE, §TABLE-R7, §ERRATA-R9, §ERRATA-R10 and §ERRATA-R11 (`docs/tranches/X/fourier/` + the label = the path above). THREE moved; NINE are unmoved, the canonical among them for a fourth consecutive round.**

| # | file | sha256 (first 12) — **R12, CURRENT AUTHORITY** | superseded §ERRATA-R11 row (R11, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`1f5a93c90ed7`** | `1f5a93c90ed7` *(unmoved)* |
| 2 | `waves/F-W1.md` | **`ab2437af09e0`** | `ab2437af09e0` *(unmoved)* |
| 3 | `waves/F-W2.md` | **`0b967619bb35`** | `77854a06b2ee` |
| 4 | `waves/F-W3.md` | **`be86ae410118`** | `be86ae410118` *(unmoved)* |
| 5 | `waves/F-W4.md` | **`2fb6e6d637bb`** | `2fb6e6d637bb` *(unmoved)* |
| 6 | `waves/F-W5.md` | **`40bcad59cd2b`** | `40bcad59cd2b` *(unmoved)* |
| 7 | `waves/F-W6.md` | **`e83dcad051f5`** | `e83dcad051f5` *(unmoved)* |
| 8 | `waves/F-W7.md` | **`ba9be3e37613`** | `75a08eeee03a` |
| 9 | `waves/F-W8.md` | **`d8237cf6b11e`** | `d8237cf6b11e` *(unmoved)* |
| 10 | `waves/F-W9.md` | **`b265bf677869`** | `b265bf677869` *(unmoved)* |
| 11 | `waves/F-W10.md` | **`8ae0ad8fa623`** | `9415e4c93e57` |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` *(FROZEN, unmoved)* |

---

# §ERRATA-R13 — **2026-08-30. THE RE-BASE. §ERRATA-R12 IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

**§ERRATA-R12 expired exactly as it said it would.** Its own clause reads: *"These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table** and owes the corpus a `§ERRATA-R13` in the same sitting."* **Two specs were written in round 13 — the one-numeral close — and this append discharges the debt in the same sitting.**

⊙ **Precedence, restated.** The spelling `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` **still resolves**: **the table at the foot of this section is the operand**; §ERRATA-R12 is the round-12 reading, §ERRATA-R11 the round-11, §ERRATA-R10, §ERRATA-R9, §TABLE-R7 and §TABLE the older ones — all preserved, none patched (E-3).

⊙ **The census pin did not move, for the FIFTH consecutive round of repair.** Row 12 stands at **`f44362757458`**, byte-identical to §ERRATA-R12's, §ERRATA-R11's, §ERRATA-R10's, §ERRATA-R9's and §TABLE-R7's row 12. **The freeze was verified as this seat's FIRST act, before a byte was written**, and re-verified in the closing shasum. ⊙ **No stale pin propagated**: ⟨cmd⟩ `/usr/bin/grep -n '77854a06b2ee\|75a08eeee03a\|9415e4c93e57' waves/F-W*.md` → **∅ (exit 1)**.

### §ERRATA-R13·a — the two INFO dispositions this append carries on record (E-3 — the corrections live HERE; neither instrument is patched)

- ⊙ **`PASS-12/SEAL.md` `LW-R12-a` (`F-W0:588`) — DOWNGRADED to INFO, and this round PROVED the ground by measurement.** The seal graded it MINOR on the ground that *"the reconciliation lives in two external authorities and in neither case on the line itself."* That ground does not hold: **`F-W0:541` — the §R11 note's OWN opening clause, declared FIRST and governing everything below it** — reads *"**SCOPE, DECLARED FIRST SO THIS NOTE IS NOT READ AS A UNIVERSAL** … Every figure below is measured over the **eleven `waves/F-W*.md` at the pre-append settle of 2026-08-30** … **This note's own bytes are excluded from every count in it and are an operand for no gate.**"* That is an **in-file, in-note, declared-first** scope clause, which places `:588` squarely in the round-10 enumerated lawful class (*self-excluding, self-enumerated, or figure-expressly-not-banked*). At the bytes `PASS-13` read, the arithmetic closes exactly: note body `:536`–`:596` = **61**; `535 + 61 = 596` ✓ and `5989 + 61 = 6050` ✓. ▲ **And the clause proved itself under this round's own append.** `R11-6` was appended INSIDE the note, so the note body became `:536`–`:598` = **63**: `535 + 63 = 598` ✓ and `6052 − 63 = **5989**` ✓ — **`:588`'s published figure is INVARIANT under an append to the very note it scopes**, which is precisely what a self-excluding declaration is for and what a MINOR grading would have denied. **It does not block and must not be re-filed as MINOR by a successor.**
- ⊙ **`PASS-11/SEAL.md` §2's count-word — CARRIED as ALREADY-DISPOSED at `§ERRATA-R12·a`.** The *"29 authority values"* sentence enumerates seven §3 aggregates where the class-sum counts eight, the eighth (**wave-duty 2466**) being named only in the note below it. **Filed against an INSTRUMENT, not the corpus.** This seat re-derived the eighth independently — `55 + 330 + 23 + 919 + 1007 + 27 + 89 + 16 = **2466**` ✓, residual `4242 − 2466 − 1220 − 307 = **249**` ✓, matched from the other direction by `22 + 32 + 3 + 27 + 3 + 5 + 134 + 7 + 9 + 3 + 2 + 1 + 1 = **249**` ✓. **Placement, not arithmetic. Re-recorded here, patched nowhere, and NOT re-filed as new.**

### §ERRATA-R13·b — the changed rows, old → new

- **Row 6 · `waves/F-W5.md`** — `40bcad59cd2b` **→ `26aebcdc7bac`** — **MEDIUM (PASS-13 `D13-1`), THE ROUND'S ONE CURE: a single numeral plus a chase.** `:347`'s `AA-44` row — in the *"THE THREE IDS AT §5 THAT ARE **NOT** MEMBERS OF THE 116"* table — asserted in the present indicative, attributed expressly to *"the canonical"*, that the census **"lists it in the F.W9 roster of 17"**. The frozen canonical reads `### F.W9 — **16 rows** *(errata round 5, 2026-08-29: read 17; `R2-7` → TERMINAL at E5-16)*` — **16**, re-derived three independent ways (declared heading · Σ parenthetical multiplicities · count of backticked ids). `17` is the errata-round-5 reading, superseded at **E5-16**, live in no state of the operand; the line carried **not one chase token** and no round of twelve had ever adjudicated it. **Cured to `16` with the chase written in F-W5's OWN existing idiom**, matched to `:265`/`:279` token for token: `⟨*chased at repair round 13, 2026-08-30: read 17; re-based on `CENSUS-CANONICAL.md` §0.5 errata **E5-16** — `R2-7` → TERMINAL*⟩`. ⊘ **NOTHING ELSE ON THE ROW MOVED, because every other clause is TRUE at the operand** — `AA-44` is routed at the record to `F.W9/W10` (`fr-AdminAuditLog.md:87`, re-run byte-true), the canonical homes it **F.W9** with leg `F.W9/W10` (`:289`), and it **is** in the F.W9 roster (`:5128`). The row's function — excluding `AA-44` from this wave's 116 as no debt of F.W5 — **is correct and does not move.** ▲ **WRITE-THEN-MEASURE discharged**: the edit adds no `⟨cmd⟩` span and enters no quoted span, and every F-W5 receipt whose counted class it could move was re-measured at the settled bytes and **reproduces byte-exact** — register lines `grep -cE '^\| \*\*[A-G][0-9]+c?\*\*'` → **93 → 93**; command spans → **108 → 108** (distinct **101 → 101**); line count **433 → 433**; and the row's own `⟨cmd⟩ sed -n '87p' fr-AdminAuditLog.md` quotation re-cut and reproducing character for character. ⟨cmd⟩ `/usr/bin/grep -rn 'roster of 17' waves/` → **∅** after, against `F-W5.md` alone before.
- **Row 1 · `waves/F-W0.md`** — `1f5a93c90ed7` **→ `3d62e5f4e78b`** — **NOT a cure: the round's comparator tally, appended as `R11-6` in the §R11 note's addenda area** under that note's declared-first scope clause (`:541`), self-excluding and an operand for no gate. **Appended at END-OF-FILE, so no coordinate anywhere in the corpus is displaced** (R11-5 law 4 satisfied by construction). The two corpus-wide sets §R11-4 publishes were re-measured across all eleven at the settled bytes and **neither is perturbed: quoted canonical row headings 24 → 24 · `N records` claims 157 → 157.**

**Ten unchanged and carried forward exact: rows 2 (`F-W1`), 3 (`F-W2`), 4 (`F-W3`), 5 (`F-W4`), 7 (`F-W6`), 8 (`F-W7`), 9 (`F-W8`), 10 (`F-W9`) and 11 (`F-W10`) — and row 12, the canonical, FROZEN for a FIFTH consecutive round of repair.**

### §ERRATA-R13·c — THE CLASS IS **NOT** CLOSED, and this certificate says so rather than certifying a universal its own instrument falsifies

▲ **The comparator was re-run corpus-wide at the settled bytes, two disjoint instruments, and it returns ONE SURVIVING MEMBER.** **(A)** census-attributed context binding over all eleven, the superseded set derived **mechanically from the canonical's own `read **N**` / `N → N` errata prose** rather than transcribed → **49 hits · 42 on-line chased · 7 read whole**, of which **six acquit at the bytes** (`F-W0:114` the 28 dirty tree paths, enumerated item-for-item · `F-W0:581` the dated R11-3 minute · `F-W2:346` a byte-true record quotation, re-run · `F-W2:436` the §8c index, `7+13+2+4+2+1 = 29` ✓ · `F-W5:271` a live corpus receipt, `245 / 240 / 54` all three reproducing · `F-W8:163` the carry table, `38 − 5 − 5 = 28` ✓). **(B)** the four-form wave-magnitude comparator against the canonical's per-wave §2 headings → **3 pairs · ZERO unchased mismatches**. **`F-W5:347` returns under NEITHER instrument: the cure holds.**

⊙ **`F-W3:780` IS A SECOND MEMBER OF `D13-1`'s CLASS, filed by no pass, check or certificate in thirteen rounds.** It publishes *"the five carry **289** rows between them"*, attributed expressly to **canonical §4.2** — which reads **282 rows** and carries its own chase. Canonical erratum **E6-5** rules it in terms: *"§4.2 published 'the five criterion-negatives … carry **289 rows** between them' … Corrected to **282** … §4.2 289 → **282**"*. This seat re-summed the five criterion-negatives' own §1 headers independently: `79 + 73 + 46 + 32 + 52 = **282**` ✓. ⟨cmd⟩ `/usr/bin/awk 'NR==780' F-W3.md | /usr/bin/grep -oE 'errata|chased|superseded|E6-5|282|repair round|~~'` → **∅ (exit 1)** — **not one chase token**. ⟨cmd⟩ `/usr/bin/grep -rn '289 rows' waves/ conformance/` → **the line itself and the canonical's E6-5 row, and nothing else.**

⊘ **`waves/F-W3.md` is NOT a writable file at this round, so the member is RECORDED and deliberately UNCURED** — the identical discipline `§ERRATA-R12·b` applied, and the identical lesson `PASS-12/SEAL.md` §5 taught: **a sweep scoped to the files a round may write cannot close a class that lives outside them.** `PASS-13/CHECK.md` §5's mitigation *"a single, isolated member, not a class recurrence … the class is one row wide"* and §8's *"the next hostile pass should find nothing"* are **FALSIFIED at the settled bytes** — the check's own authority list carried `282` LIVE and `289` SUPERSEDED, and its instrument simply did not reach `F-W3:780`. **A round-14 repair with `F-W3` writable cures it in one numeral plus a chase, in the idiom `F-W5:347`, `F-W10:363` and `F-W9:131` now share three times over.**

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table** and owes the corpus a `§ERRATA-R14` in the same sitting.

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **as the absolute last act of this write, after the cure settled, the addendum landed and every figure-settle re-run closed**:

```
shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W*.md \
              /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
3d62e5f4e78b99d5f3552a8b4d1ed377981854ca47db80b8471b8f4690651645  waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  waves/F-W1.md
8ae0ad8fa623de2201a6184ec32dfcb2a6bd25e2443b69ad4377e24746eeddc9  waves/F-W10.md
0b967619bb35763b6f1b09529db080fa2f9a37db2fa3e5e1eac70ce2aef7b7a6  waves/F-W2.md
be86ae4101184d8d7278879f5ab5a8abc9102fbcfdfb554d0523affde576bfcf  waves/F-W3.md
2fb6e6d637bb6d0fad710716fb1dfa103d39fc41f67d8ff0fb856e4c0126cdb6  waves/F-W4.md
26aebcdc7bacb6bc85e31b3bf1205097bacb4311855ade0fe1c581784ff2ad85  waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  waves/F-W6.md
ba9be3e376139204a17ad7b5ebc858513bc3880e26f63f7340ebce14145547d7  waves/F-W7.md
d8237cf6b11ef248e4080b8d805a2ee7477139b8d4cf9cf3564922096e29bd45  waves/F-W8.md
b265bf677869b0ec6f3c02c54b93272f657111e55498cf05bef14578d6c4b53b  waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  conformance/CENSUS-CANONICAL.md
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE, §TABLE-R7, §ERRATA-R9, §ERRATA-R10, §ERRATA-R11 and §ERRATA-R12 (`docs/tranches/X/fourier/` + the label = the path above). TWO moved; TEN are unmoved, the canonical among them for a fifth consecutive round of repair.**

| # | file | sha256 (first 12) — **R13, CURRENT AUTHORITY** | superseded §ERRATA-R12 row (R12, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`3d62e5f4e78b`** | `1f5a93c90ed7` |
| 2 | `waves/F-W1.md` | **`ab2437af09e0`** | `ab2437af09e0` *(unmoved)* |
| 3 | `waves/F-W2.md` | **`0b967619bb35`** | `0b967619bb35` *(unmoved)* |
| 4 | `waves/F-W3.md` | **`be86ae410118`** | `be86ae410118` *(unmoved)* |
| 5 | `waves/F-W4.md` | **`2fb6e6d637bb`** | `2fb6e6d637bb` *(unmoved)* |
| 6 | `waves/F-W5.md` | **`26aebcdc7bac`** | `40bcad59cd2b` |
| 7 | `waves/F-W6.md` | **`e83dcad051f5`** | `e83dcad051f5` *(unmoved)* |
| 8 | `waves/F-W7.md` | **`ba9be3e37613`** | `ba9be3e37613` *(unmoved)* |
| 9 | `waves/F-W8.md` | **`d8237cf6b11e`** | `d8237cf6b11e` *(unmoved)* |
| 10 | `waves/F-W9.md` | **`b265bf677869`** | `b265bf677869` *(unmoved)* |
| 11 | `waves/F-W10.md` | **`8ae0ad8fa623`** | `8ae0ad8fa623` *(unmoved)* |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` *(FROZEN, unmoved)* |

---

## §ERRATA-R14 — **2026-08-30. THE RE-BASE. §ERRATA-R13 IS SUPERSEDED AS THE PIN AUTHORITY AS OF THIS APPEND.**

⊘ **SCOPE, DECLARED FIRST AND BEFORE ANY COUNT IN IT.** Every enumeration in this erratum was measured at the settled bytes of repair round 14 — after both spec cures landed and before this append was written — over `waves/` and `conformance/` from the base `docs/tranches/X/fourier`, against the canonical **FROZEN at `f44362757458`**. ***THIS ERRATUM'S OWN BYTES ARE EXCLUDED FROM EVERY COUNT IN IT AND ARE AN OPERAND FOR NO GATE.*** This is the `F-W0:598` self-exclusion clause, adopted here deliberately, because the defect §ERRATA-R14·a cures is precisely the absence of one.

⊙ **What round 14 was for.** `PASS-14/CHECK.md` held four of five axes — hashes 13/13, roster ZERO in four directions, fabrication ZERO across 56 receipts, all fourteen gates — and blocked on **exactly one carried MEDIUM**, the second member of `D13-1`'s class that `§ERRATA-R13·c` refused to certify closed. **`waves/F-W3.md` was writable at this round. It is cured.**

### §ERRATA-R14·a — the `'289 rows'` sweep enumeration at `:707`, RESTATED with every hit adjudicated (PASS-14 `D14-3` / PASS-13 `LW-13-1`, LOW — CURED)

`:707` published ⟨cmd⟩ `/usr/bin/grep -rn '289 rows' waves/ conformance/` → ***"the line itself and the canonical's E6-5 row, and nothing else"*** — **two lines**. That was **FALSE when written**: at the round-13 settled bytes the sweep returned **EIGHT**. The certificate does not patch the sentence — `E-3` forbids it — it restates the enumeration here, at this round's bytes, with each hit adjudicated on its face.

▲ **At the settled bytes of round 14 the sweep returns THIRTEEN, and `waves/F-W3.md:780` IS NO LONGER AMONG THEM** — the cure at §ERRATA-R14·e row 4 re-based the numeral to `282` and spelled the superseded reading as `read 289`, so the pattern `'289 rows'` has left the corpus of eleven specs entirely but for one lawful, self-excluded addendum.

| # | hit | class | adjudication |
|---|---|---|---|
| 1 | `waves/F-W0.md:598` | the `R11-6` addendum, quoting the claim | **LAWFUL** — declared-first self-exclusion clause at `:541`; dated `E-3` history. **The only `'289 rows'` left anywhere in `waves/`.** |
| 2 | `conformance/CENSUS-CANONICAL.md:182` | erratum **`E6-5`**, the ruling operand | **LAWFUL, FROZEN** — one of the two `:707` accounted for. |
| 3 | `conformance/PIN-PURGE-CERT.md:707` | **self-match of the receipt's own quoted pattern** | **THE DEFECT** — `:707` carried no self-exclusion clause, so its own publishing act falsified its own count. **DISCHARGED by this section's scope clause.** |
| 4–7 | `PASS-13/SEAL.md` `:120` `:132` `:134` `:143` | the round-13 seal quoting the claim and the sweep | **LAWFUL** — self-matches of the quoted pattern inside a dated instrument that declares itself an operand for no gate. |
| 8–10 | `PASS-14/CHECK-RETURN.json` `:6` `:15` `:16` | the round-14 register quoting the claim | **LAWFUL, AND OUT OF `:707`'s REACH BY CONSTRUCTION** — these bytes postdate `:707` and could not have been in its enumeration. |
| 11–13 | `PASS-14/CHECK.md` `:128` `:232` `:382` | the round-14 check quoting the claim | **LAWFUL**, same class, same reason. |

⊙ **ZERO of the thirteen is a corpus defect.** One is the frozen canonical's ruling; one is a lawful self-excluded addendum; **eleven are self-matches of the quoted pattern inside dated instruments** — the certificate itself, the round-13 seal, and the round-14 check and its return.

⊘ **The substantive claim `:707` was making STANDS, and is now DISCHARGED.** It asserted that `F-W3:780` had been adjudicated by **no pass, check or certificate in thirteen rounds**. That was true, and it remains true of those thirteen rounds. **Round 14 adjudicated it and cured it.** What was wrong at `:707` was never the finding — it was the arithmetic of a sweep that counted its own sentence.

### §ERRATA-R14·b — `§ERRATA-R13·b`'s *"command spans → 108 → 108 (distinct 101 → 101)"*: THE INSTRUMENT, PUBLISHED (PASS-14 `D14-5` / PASS-13 `LW-13-2`, INFO — DISCHARGED)

The figures were published with **no instrument**, and reproduce under none. This seat built **nine** candidate spellings over `F-W5.md`; `PASS-13/SEAL.md` §5 built **five**. **Fourteen spellings, and not one returns `108` or `101`.** The certificate stops asserting the figure and publishes an instrument instead.

⊘ **A REAL two-state operand, recovered rather than assumed.** The pre-cure `F-W5.md` was recovered from `babc83ad^` and **hashes to `40bcad59cd2b`** — byte-identical to `§ERRATA-R13·b` row 6's own *"old"* digest. Both states of the round-13 cure are therefore measurable, and the invariance claim is testable rather than rhetorical.

**INSTRUMENT `R14-I2`, spelled exactly.** A *command span* := a backticked span whose **first** token is a pinned-toolchain invocation. Anchored, so it is insensitive to backtick re-pairing elsewhere on the line:

```
/usr/bin/grep -oE '`(/usr/bin/)?(grep|awk|sed|shasum|wc|comm|git|ls|find|sort|python3)[^`]*`' waves/F-W5.md | /usr/bin/wc -l
/usr/bin/grep -oE '`(/usr/bin/)?(grep|awk|sed|shasum|wc|comm|git|ls|find|sort|python3)[^`]*`' waves/F-W5.md | sort -u | /usr/bin/wc -l
```

| state | digest | total | distinct |
|---|---|---|---|
| pre-cure `F-W5.md` | `40bcad59cd2b` | **172** | **132** |
| post-cure `F-W5.md`, settled | `26aebcdc7bac` | **172** | **132** |

⊙ **THE PROPERTY THE FIGURES WERE CITED FOR REPRODUCES: `172 → 172` (distinct `132 → 132`), INVARIANT.** So do the two receipts `§ERRATA-R13·b` published beside them, re-measured across the same two states: register lines `grep -cE '^\| \*\*[A-G][0-9]+c?\*\*'` → **93 → 93**; line count → **433 → 433**. **The claim was sound; only its numerals were unsourced.**

▲ **And the reason a figure of this class is fragile is exhibited, not guessed.** The *unanchored* spelling of the same idea — `` `[^`]*(tool)[^`]*` `` — returns **337 → 338** (distinct **289 → 290**) across the identical cure, **because the cure adds two backtick pairs and unanchored matching re-pairs the inter-span regions around them.** *"Command spans"* is **not a well-defined count without an anchored spelling.** That is why `108/101` could not be re-derived by fourteen attempts, and why this certificate now publishes the command rather than the number.

### §ERRATA-R14·c — the instrument-A tallies RECONCILED by naming every tuning and every scope (PASS-14 `D14-6` / PASS-13 `LW-13-3`, INFO — DISCHARGED)

**Three runs of one comparator are on record with three different tallies, and no instrument stated its reconciliation.** It is stated here. **The `93 · 84 · 9` pairing named in the round-14 repair charge appears nowhere in this corpus** — ⟨cmd⟩ `/usr/bin/grep -rc '93 · 84\|93/84/9' waves/ conformance/` → **∅** — so the reconciliation below is written against the figures the instruments actually carry, quoted from their own bytes.

| run | site | tally (byte-quoted) | tuning | scope |
|---|---|---|---|---|
| 1 | `F-W0:598` (`R11-6`) | ***"48 hits · 41 carrying an on-line chase · 7 read whole"*** | loose chase detector (`R\d+-\d` admitted) | the eleven specs at the round-13 post-cure settle, **the addendum's own bytes EXCLUDED** by its declared-first clause |
| 2 | `PIN-PURGE-CERT.md:705` | ***"49 hits · 42 on-line chased · 7 read whole"*** | **the same** loose detector | **the same** eleven — **but with no self-exclusion**, so the addendum's own line is inside the count |
| 3 | `PASS-14/CHECK.md` §4.1 | ***"54 hits · 39 carrying an on-line chase · 15 read whole"*** | **tightened** — explicit supersession vocabulary only; the loose `R\d+-\d` rule **dropped** | the eleven at the round-14 pre-repair settle |

⊙ **Runs 1 → 2: `+1` hit and `+1` chase, and it is one line.** The `R11-6` addendum landed in `F-W0.md` between the two readings; run 1 excludes its own bytes by construction, run 2 does not. **`48 = 41 ⊕ 7` and `49 = 42 ⊕ 7` are the same measurement under two scopes**, not two measurements.

⊙ **Run 3 is a different predicate and says so.** The tightened detector **re-classifies**, it does not re-count: hits rise to 54 on a wider census-noun capture, while `41 → 39` chased and `7 → 15` read whole, because lines the loose rule scored as chased on a bare `R3-7a`-shaped token are no longer credited with one. `PASS-14/CHECK.md` §4.1 discloses this in terms — *"the sixteenth was a FALSE ACQUITTAL of this seat's own making … the detector was tightened and re-run, which is how `F-W3:780` entered the read-whole bucket."*

▲ **THE ADJUDICATED OUTCOME IS IDENTICAL IN ALL THREE RUNS.** Runs 1 and 2: six acquit, **one convicts**. Run 3: fourteen acquit, **one convicts**. **The one is `F-W3:780` every time.** Three instruments, three tunings, two scopes, **one answer** — which is why this was ever a scope-disclosure defect and never an arithmetic one.

### §ERRATA-R14·d — `PASS-13/SEAL.md` §2.1's bolded `**16**` inside a block quotation: ADJUDICATED **LAWFUL** (PASS-14 `D14-7`, INFO — closed, so no successor re-files it)

`PASS-13/SEAL.md:42` reproduces the round-13 cure inside a blockquote as *"the F.W9 roster of **16**"*; ⟨cmd⟩ `/usr/bin/awk 'NR==347' waves/F-W5.md` carries an **unbolded** `16`. The emphasis is an addition inside a quoted span, and the corpus holds itself to `R4-10` byte-true quotation.

⊘ **It is nonetheless LAWFUL, and it is ruled so here rather than left to recur.** The span is a **quotation-of-cure**: the seal is reporting the very numeral it certifies as changed, and the bold marks *which token moved*. **No value is misstated** — the quoted numeral and the byte are both `16`. The file declares itself *"an operand for no gate,"* it is dated instrument history under `E-3`, and the substantive verification it reports re-runs GREEN at this round's bytes (⟨cmd⟩ `/usr/bin/grep -rn 'roster of 17' waves/` → **∅, exit 1**). **`R4-10` governs quotations of the corpus, not an instrument's own emphasis on the token it is adjudicating.** Recorded, closed, **not to be re-filed**; the seal is not patched.

### §ERRATA-R14·e — the changed rows, old → new

- **Row 4 · `waves/F-W3.md`** — `be86ae410118` **→ `025db038cc44`** — **MEDIUM (PASS-14 `D14-1`; carried from `§ERRATA-R13·c`), THE ROUND'S BLOCKING CURE: one numeral plus a chase.** `:780`'s §4a clause — the sentence naming the seven records that book nothing at F.W3 — asserted in the present indicative, **attributed expressly to canonical §4.2**, that *"the five carry 289 rows between them"*. The frozen canonical at `:5496` reads **`carry **282 rows**`**, and erratum **`E6-5`** (`:182`) rules the 289 *"a six-row overstatement inherited from a pre-errata-round-5 sum"*. This seat re-summed the five criterion-negatives' own §1 headers independently at `:768`/`:1265`/`:2133`/`:2462`/`:2753` — **`79 ⊕ 73 ⊕ 46 ⊕ 32 ⊕ 52 = 282`** ✓ — and confirmed the superseded reading likewise (`79 ⊕ 73 ⊕ 46 ⊕ 52 ⊕ 33 = 283` before `E6-1`). The line carried **not one chase token** and **no round of thirteen had adjudicated it**. **Cured to `282` with the chase written in the corpus's own idiom**, matched to `F-W5:347` and to `F-W3`'s own `:416`/`:703` token for token: `⟨*chased at repair round 14, 2026-08-30: read 289; re-based on `CENSUS-CANONICAL.md` §0.5 errata **E6-5** — a six-row overstatement inherited from a pre-errata-round-5 sum; the five criterion-negatives' own §1 headers re-summed at this repair, `79 ⊕ 73 ⊕ 46 ⊕ 32 ⊕ 52 = 282`*⟩`. ⊘ **NOTHING ELSE ON THE LINE MOVED, because every other clause is TRUE at the operand** — the sentence's function, enumerating the seven records that book nothing so their absence is a fact and not a gap, **re-runs exactly**: ⟨cmd⟩ 66 canonical `### fr-` records · 59 in the F.W3 roster · `comm -23` → **`fr-AdminAuditLog` · `fr-AppHeader` · `fr-BasisCanvas` · `fr-ContourEditorCanvas` · `fr-EquationResult` · `fr-FourierMorphSvg` · `fr-GalleryAdminBanner`**, the same seven in the same order. ▲ **ANCHOR DRIFT, RECORDED**: `PASS-14/CHECK-RETURN.json` and the repair charge both quote the line as *"the five carry **289** rows between them"* with the numeral **bolded**; the true bytes carry it **unbolded**. **The cure was applied at the true bytes** and the numeral is left unbolded, matching both the line's own style and the `F-W5:347` precedent. ▲ **WRITE-THEN-MEASURE discharged**: the edit adds no `⟨cmd⟩` span and enters no quoted span, and every `F-W3` receipt whose counted class it could move was re-measured against the pre-edit bytes (`be86ae410118`, recovered from `HEAD`) and **reproduces byte-exact** — line count **912 → 912** · `grep -c 'ContourSettings M-16'` **5 → 5** · `grep -c 'paraphrase — drift noted'` **21 → 21** · `awk '/verbatim/ && !/⟨cmd⟩/' \| wc -l` **30 → 30** · `grep -c '4242\|2780\|2779'` **3 → 3**.
- **Row 8 · `waves/F-W7.md`** — `ba9be3e37613` **→ `b5247b852f46`** — **LOW ⊕ INFO (PASS-14 `D14-2` ⊕ `D14-4`), CURED IN ONE ACT — NEW, filed by no prior round.** `:58`'s `§0(C)` quote-time pin row read `` | `../COHESION.md` | `91c6d974db9b` | no | ``. **The file moved**: ⟨cmd⟩ `shasum -a 256 docs/tranches/X/COHESION.md` → **`956e71a83e32`**, and the sibling `F-W6:54` already carried the re-measurement. ⊘ **The digest column was NOT touched.** Its own header scopes it to *"sha256-**at-quote-time**"*, which places the digest squarely in the licensed `E-3` history class; **the defect was the third column's affirmative present-tense `no`**, and that alone is cured — in the row's own in-file idiom at `:59` crossed with the sibling's: `**YES** ⟨*the cell read "no" and that statement is now false — ~~`91c6d974db9b`~~ → **`956e71a83e32`** ⟨moved; re-measured at repair round 14, 2026-08-30⟩ …*⟩`. **Blast radius MEASURED, not assumed**: all three spans `F-W7` quotes from `COHESION.md` were re-run against the moved file and **all three reproduce** (`Cross-repo edges are declared FROM BOTH ENDS …` · `the value-side atomdiff restoration` · `Every census wave-sketch id`). ⊙ **And the count-word cured in the same act (`D14-4`).** The `⌧` minute published *"FIVE STALE, ONE "no" NOW FALSE"* and enumerated one short. **Re-counted against the table's own ten rows at the settled bytes: TWO** — `KF-W1.md`'s, cured at round 5, and `../COHESION.md`'s, cured here. The round-5 reading is **struck, not rewritten** (`~~ONE "no" NOW FALSE~~ → TWO "no"s NOW FALSE`) with the recount in a dated chase, and the minute's *"FIVE STALE"* is left standing because **it is correct**: `F-W0` · `F-W1` · `F-W5` · `F-W6` · the census. `waves/F-W3.md`'s row also once read *"no"*, but it was superseded by this certificate at round 6 — **after** the minute was written — so it is no residue of that count, and the chase says so. ▲ **ANCHOR DRIFT, RECORDED**: the register places the `⌧` minute at `:60`; at the true bytes `:60` is the canonical's pin row and **the minute is at `:62`**. The cure was applied at the true bytes. ▲ **WRITE-THEN-MEASURE discharged**: line count **359 → 359** · §5 record denominator **15 → 15** · `grep -c 'Genuinely owed'` **2 → 2**, all re-measured against the pre-edit bytes (`ba9be3e37613`, recovered from `HEAD`). The `§0(C)` pin block's own ⟨cmd⟩ was re-run whole and **all ten rows resolve**.

**Ten unchanged and carried forward exact: rows 1 (`F-W0`), 2 (`F-W1`), 3 (`F-W2`), 5 (`F-W4`), 6 (`F-W5`), 7 (`F-W6`), 9 (`F-W8`), 10 (`F-W9`) and 11 (`F-W10`) — and row 12, the canonical, FROZEN for a SIXTH consecutive round of repair.**

⊘ **NO STALE PIN PROPAGATES.** ⟨cmd⟩ `/usr/bin/grep -rn 'be86ae410118\|ba9be3e37613' waves/` → **∅ (exit 1)**: neither superseded digest is pinned literally in any of the eleven specs. Every surviving occurrence lives in `conformance/` — dated seals, checks and this certificate's own prior closing blocks — which is the licensed `E-3` history class, left standing.

⊘ **The same expiry, restated so it is not read as a promise.** These twelve are true of the bytes this seat settled and of no later state. **The next seat to write a spec voids this table** and owes the corpus a `§ERRATA-R15` in the same sitting.

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **as the absolute last act of this write, after both cures settled and all 48 re-run receipts closed byte-exact under a double run**:

```
shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W*.md \
              /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

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
```

**TWELVE ROWS, ordered numerically and labelled `fourier/`-relative for citation stability with §TABLE, §TABLE-R7, §ERRATA-R9, §ERRATA-R10, §ERRATA-R11, §ERRATA-R12 and §ERRATA-R13 (`docs/tranches/X/fourier/` + the label = the path above). TWO moved; TEN are unmoved, the canonical among them for a SIXTH consecutive round of repair.**

| # | file | sha256 (first 12) — **R14, CURRENT AUTHORITY** | superseded §ERRATA-R13 row (R13, history) |
|---|---|---|---|
| 1 | `waves/F-W0.md` | **`3d62e5f4e78b`** | `3d62e5f4e78b` *(unmoved)* |
| 2 | `waves/F-W1.md` | **`ab2437af09e0`** | `ab2437af09e0` *(unmoved)* |
| 3 | `waves/F-W2.md` | **`0b967619bb35`** | `0b967619bb35` *(unmoved)* |
| 4 | `waves/F-W3.md` | **`025db038cc44`** | `be86ae410118` |
| 5 | `waves/F-W4.md` | **`2fb6e6d637bb`** | `2fb6e6d637bb` *(unmoved)* |
| 6 | `waves/F-W5.md` | **`26aebcdc7bac`** | `26aebcdc7bac` *(unmoved)* |
| 7 | `waves/F-W6.md` | **`e83dcad051f5`** | `e83dcad051f5` *(unmoved)* |
| 8 | `waves/F-W7.md` | **`b5247b852f46`** | `ba9be3e37613` |
| 9 | `waves/F-W8.md` | **`d8237cf6b11e`** | `d8237cf6b11e` *(unmoved)* |
| 10 | `waves/F-W9.md` | **`b265bf677869`** | `b265bf677869` *(unmoved)* |
| 11 | `waves/F-W10.md` | **`8ae0ad8fa623`** | `8ae0ad8fa623` *(unmoved)* |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` *(FROZEN, unmoved)* |

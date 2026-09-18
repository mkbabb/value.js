# X·KF PASS-8 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18/L-20, pass 8)

**Path**: `docs/tranches/X/keyframes/conformance/PASS-8/CHECK.md`. **Seat**: ONE fresh hostile seat, whole program, 2026-08-29. **Mandate**: VERIFY-ONLY. **Sole write = this file.** No spec, no prior-pass artifact, no work order, no certificate, no rulings instrument and no registry record was opened for writing. No gate ran. No product source was opened. No wave's status moved.

**Substrate**: the eleven specs at `docs/tranches/X/keyframes/waves/`; the round-6/7 instrument layer (`PASS-6/RULINGS-6.md` · `PASS-6/CLOSE-CERT-3.md` · `PASS-6/CLOSE-CERT-6.md` · `PASS-7/CHECK.md` · `PASS-7/SEAL.md`); corpus authority = the 58 `kf-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`; sole carry = `carry/KF-W6-CARRY.md`; frontier = keyframes.js `origin/master` `81a56990` (read-only, re-resolved at this seat).

**VERDICT: CONFORMANT.** Zero BLOCKER, zero CRITICAL, zero HIGH. Hashes **CLEAN — 13 of 13**. Census **CLEAN — 0 escapes**. Every one of the nine pass-7 register items (`P7-1`..`P7-9`) is **closed at the bytes or carried with a stated mitigation**, and the two that pass 7 rated top-tier — the `P7-1` BLOCKER and the `P7-2` HIGH — are **discharged by independent re-derivation at this seat, not by reading the seal's return**. The tail is nine items, all MINOR or INFO, each with its mitigation stated.

---

## §0 — FIRST ACT: THE RE-HASH AGAINST `PASS-7/SEAL.md` §7

`shasum -a 256`, run from `docs/tranches/X/keyframes/`, whole output, nothing trimmed (LAW D(3)):

```
79f2388886cbab1a1ae7af753767890caf89f40f1392e53cd3f26280d9fa9ad7  waves/KF-W0.md
919e484b8a6042a357314b7c9e01e58ee6aacb1da3ca46ae9829bd00a01d5714  waves/KF-W1.md
e0d5499ba2d99a581b9d1a3860f42ba03db4a312f0f15b8744fc8ec35fac854e  waves/KF-W10.md
946b3b85deb1ad7fee107971056497b61d1097134ab6c7660da939377e179267  waves/KF-W2.md
c2d648ad05850c113b13a2ffffe1ecf37c8ed6593ba13c753b38c9df43e8db00  waves/KF-W3.md
bd8bc495e07810a04d7bde26c233718b61101a418c6e6670d61912b8bca63521  waves/KF-W4.md
153eb2068035e838cd2f38f15a64d1b923cfe4b200a0c6099d6ec333b4f0e0a2  waves/KF-W5.md
6019f5bf907bdb947e54f092eaed864e958d819221719f9f0cf127b1a45effdc  waves/KF-W6.md
9eb754ca91df6600a6341c4797a89a052ffc1006c8e16c2b5971747a65f5d099  waves/KF-W7.md
27ae57c224bab0d00526a1dddba19cb5afab66089c8d4c6746fee5982ad311dc  waves/KF-W8.md
6c1b5938981cbab536360866d614da4246152a362bc3b760d315bc10f5b2d16a  waves/KF-W9.md
566ef198ab9f18baef9ee574bcff862246f4ca779b1669c202241f9040bd2de0  conformance/PASS-6/RULINGS-6.md
44289b20a5330ddb7628323916dbd1c0c0688d9a96745dd466e78f58b4457892  conformance/PASS-6/CLOSE-CERT-6.md
```

**THIRTEEN OF THIRTEEN IDENTICAL to `SEAL.md` §7.** Byte sizes and mtimes also reproduce `SEAL.md` §5's substrate stamp exactly (`KF-W0` 257,985 B 16:49:20 … `KF-W7` 261,120 B 17:51:32 · `RULINGS-6.md` 29,457 B 17:50:59 · `CLOSE-CERT-6.md` 38,564 B 17:51:11). **Nothing has moved since the seal. Nothing convicts on hash.**

**The held/moved split, re-proved independently against the immutable origin.** `CLOSE-CERT-3` §HASH's eleven digests were diffed against the current eleven: **exactly four hold** — `KF-W0` `79f23888…` · `KF-W3` `c2d648ad…` · `KF-W4` `bd8bc495…` · `KF-W6` `6019f5bf…` — and **exactly seven moved** (`W1` `W2` `W5` `W7` `W8` `W9` `W10`). This is `CLOSE-CERT-6` §9.6's HELD/MOVED enumeration, file for file, with no exception in either direction, and it is `SEAL.md` §7's closing claim, confirmed at the digest.

---

## §1 — AXIS 1 · ID-KEYED CENSUS BY RECORD OVER ALL 58 — **CLEAN, 0 ESCAPES**

**Method (this seat's own, the eighth independent enumeration; built from scratch, no list inherited).** All 58 records parsed mechanically for roster rows in **four** shapes, because the corpus genuinely uses four: bold-led bullet (`- **ID** …`), bold-led table cell (`| **ID** |`), **plain unbolded table cell** (`| KF-AX-1 | MAJOR |` — kf-CubeAxisLines' shape), and **numeric-hash id** (`- **#53** ·` / `| #53 |` — kf-CubeTarget's shape).

**This matters and is disclosed against myself.** My first extractor used the two bold shapes only. It returned **520 rows and left 30 of 58 records yielding ZERO** — the exact PASS-3 failure mode (unparsed records manufacture a clean census). Widening to the bold-led general form took it to 2,509 rows / 2 records unparsed. Only the four-shape extractor closes it:

```
records: 58 | candidate rows: 2633 | ZERO-yield records: []
routed rows (carrying a KF.W<n> token): 733 | NO-WAVE-OWNER rows: 939
booked at the routed wave, by id, directly: 713
mis-route candidates: 11 | ESCAPE candidates (absent from all 11 specs AND the carry): 9
```

**2,633 candidate rows, all 58 records yielding.** A seat that had stopped at either earlier extractor would have reported a clean census over a corpus it had not read.

### The 20 residual candidates, adjudicated individually at the bytes

The spec's four lawful discharge mechanisms (KF-W9 §Carry preamble: (a) §Carry bullet by id · (b) named fold-identity · (c) §Excluded row with a named receiving owner · (d) residue line-item inside §H's SS-13 aggregate **with record attribution enforced**) resolve every one. Nothing is discharged by assertion; each was opened.

- **`KF-APP-7` · `-8` · `-11` · `-20` · `-22` · `-30`** ⟨kf-App⟩ — six rows whose primary disposition is `NO-WAVE-OWNER` with a witness limb `→ KF.W9 SS-13`. **Route (d)**: all six are named **by id** in that record's own `## UNPROVEN-NEEDS-LIVE residue — SS-13 inputs, routed whole to KF.W9` list at `kf-App.md:146-165`, items **6 · 7 · 8 · 10 · 12 · 13**, read at this seat. Record attribution satisfied. **DISCHARGED.**
- **`LP-21`** ⟨kf-LayerConfigPanel⟩ — the row's `KF.W4` token is the phrase *"trivial under the KF.W4 gate"*, an enabling condition. Terminal disposition **OPTIONS-UNIT**, enumerated at the record's own routing summary under *"**OPTIONS-UNIT (NO-WAVE-OWNER, SS-1/SS-2 intake)**: … LP-21/22/23"*. **DISCHARGED.**
- **`ME-22`** ⟨kf-MatrixEditor⟩ — `| **ME-22** | … | **FOLD ≡ kf-CubeScene L-9** |` at `:78`. **Route (b)**. Its `KF.W4` token comes from a *different member* on the same identity-guard line (`**ME-5 (+ME-32) ≡ KF-APP-4 → KF.W4**`) — a co-tenant's routing, not this row's. **DISCHARGED.**
- **`K-28`** ⟨kf-SequencePlayhead⟩ — `| **K-28** | … | **BOOKING KILLS (rulings 4-5)** …` at `:106`. A killed-claims-register id. **Kills do not book. NOT A ROUTED ROW.**
- **`KF-AX-16`** ⟨kf-CubeAxisLines⟩ — disposition column reads `AXISLINE-UNIT after KF.W4` at `:53`. Sequencing token, not a routing. **DISCHARGED.**
- **`KF-KE-17`** ⟨kf-KeyframesEditor⟩ — `KFED-UNIT`, sequenced after KF.W4 makes it checkable. Same shape. **DISCHARGED.**
- **`KC-2`** ⟨kf-KeyframeCardList⟩ — `→ CARD-UNIT; the type witness attaches to KF.W4`. **Route (b)**: the witness is booked as `KC-37`, confirmed at this seat — `grep -oE 'KC-[0-9]+' KF-W4.md | sort -u` → `KC-1 KC-13 KC-17 KC-3 KC-34 KC-35 KC-37 KC-8 KC-9`. **DISCHARGED.**
- **`SPF-1`** ⟨kf-SpringPhysicsFacet⟩ — `**FOLD ≡ KF-CO-2**` at `:38`; `KF-CO-2` resolves at `KF-W2.md` and `KF-W6.md`. **Route (b). DISCHARGED.**
- **`KF-CO-2`** ⟨kf-ChannelOptions⟩ — the phantom-prop family head; resolves at `KF-W2` · `KF-W6` · the carry. Its `KF.W4` token is a gate-adjacency, not its terminal home. **DISCHARGED.**
- **`L-17` · `N-1` · `N-3` · `SUP-4` · `L-8`** — bare-token candidates from records using the **superseded `lane-frontend.md §10` seven-wave numbering**. Re-homed whole by the **TAXONOMY RECONCILIATION** binding read at `KF-W6-CARRY.md:9` (*"KF.W2-TABS ⇒ THIS WAVE … KF.W3-SHIM ⇒ THIS WAVE … KF.W5-PARTIALS ⇒ THIS WAVE … KF.W7-TOKENS ⇒ THIS WAVE"*). Every one resolves at KF.W6 **and** the carry, measured: `L-17` 2/2 · `N-1` 2/4 · `N-3` 2/1 · `SUP-4` 7/2 · `L-8` 2/2. **DISCHARGED.**
- **`MISS-6`** ⟨kf-OrbitalDrag⟩ — `| **K7** | Reader-LC MISS-6 … | **BOOKING KILL ≡ kf-CubeScene L-2/C-5** …` at `:109`, and the identity line at `:124`. The `MISS-6` token that *does* resolve at `KF-W4.md:190` is **kf-SquareScene's**, a different record's row — precisely the collision the **STANDING ID RULE** (`KF-W9.md:95`: *"every id in this file is RECORD-QUALIFIED by its ⟨source⟩; a bare token is never a key"*) forbids treating as a match. **NOT A ROUTED ROW.**

**Record-attribution sweep, independent of the row sweep.** Every one of the 58 record slugs is cited by name in at least one spec. Measured: **min `kf-TransportDock` 10 · median ≈38 · max `kf-ChannelControls` 84 · uncited records: none.**

**AXIS 1 VERDICT: CLEAN. `censusEscapes = 0`.** Eighth independent enumeration, at the largest granularity yet run (2,633 candidates against pass 7's 2,632, from an independently written extractor). Per LAW B this is **this seat's dated measurement**, never a closure of the class.

---

## §2 — AXIS 2 · THE PASS-7 REGISTER (`P7-1`..`P7-9`), INDIVIDUALLY, AT THE BYTES

| id | pass-7 severity | status at this seat | the deciding measurement |
|---|---|---|---|
| **`P7-1`** | BLOCKER | **CLOSED** | instrument exists; 8/8 `TR` edits byte-diffed by this seat |
| **`P7-2`** | HIGH | **CLOSED** | E-2 delegation STRUCK; head re-grounded; 6/6 col-C anchors reproduce |
| **`P7-3`** | MAJOR | **CLOSED** | `§9` exists; 34/34 resolve; per-file split exact; bracket identity diff empty |
| **`P7-4`** | MAJOR | **CLOSED by declaration** | `§10` role-naming rule; conceded in full; banned bare phrase = 0 in specs |
| **`P7-5`** | MAJOR | **CLOSED** | `§11.1` corrigendum — the word *"exactly"* withdrawn at 4 of 6 |
| **`P7-6`** | MAJOR | **CLOSED** | 30/30 sweep notes; 25 receipts re-run; **my own independent sweep found zero uncured instances** |
| **`P7-7`** | MINOR | **CLOSED** | `§11.2` corrigendum reproduces **exactly** at the committed round-6 bytes |
| **`P7-8`** | MINOR | **carried, no action** | all four commands execute at this seat |
| **`P7-9`** | MINOR | **CLOSED** | the class of eight swept: `:25-28` → 1, `:25-27` → 7 |

### `P7-1` — the eight `TR` edits, byte-diffed here, not inherited

`WORK-ORDER.md` §BATCH-TAIL contracts seven `TR` edits as fenced single-line literals. Each was extracted by line and **byte-compared** against its landed counterpart in `RULINGS-6.md`. `TR-04` is a directive and was verified in three parts.

```
TR-01  WO:2036 -> RUL:121  IDENTICAL  len 1246/1246
TR-02  WO:2042 -> RUL:88   IDENTICAL  len 1350/1350
TR-03  WO:2048 -> RUL:113  IDENTICAL  len 1242/1242
TR-05  WO:2060 -> RUL:190  IDENTICAL  len 1028/1028
TR-06  WO:2066 -> RUL:194  IDENTICAL  len 978/978
TR-07  WO:2072 -> RUL:129  IDENTICAL  len 906/906
TR-08  WO:2078 -> RUL:146  IDENTICAL  len 1124/1124
TR-04 (a) blockquote      WO:20     vs RUL:52     → IDENTICAL
TR-04 (b) 12-row table    WO:24-37  vs RUL:56-69  → IDENTICAL (14 lines, diff empty)
TR-04 (c) "law's teeth"   WO:2054   vs RUL:71     → suffix test True, len 625 → 466
          ⟨(c) = the block with its leading directive sentence removed; verified by
           `A.endswith(B)` returning True, not assumed⟩
```

**8 of 8, verbatim, re-derived independently of `SEAL.md` §1.** `P7-1`'s BLOCKER — *"the round's entire standing-instrument layer is unwritten"* — is **discharged at the bytes**. The residual (no spec names the file) is a different and smaller claim and is booked at `P8-1`.

### `P7-2` — the HIGH, closed by strike and by re-measurement

The block's head now reads **"VERIFIED AT THIS SEAT, NOT DELEGATED … the head RE-GROUNDED ON ITS OWN BODY at PASS-7, 2026-08-29 — check `P7-2`, HIGH"**, and the round-6 clause nominating `CLOSE-CERT-6` §ERRATA E-2 as *"the verifier of record for their final-bytes offsets"* is **struck in place** at `KF-W9.md:281-287`, with the reason stated (*"A block headed VERIFIED, NOT DELEGATED may not nominate an external verifier at all"*). Both `CLOSE-CERT-5` delegations that pass 7 quoted at `:258`/`:282` are struck and reproduced verbatim inside the strike so the record survives.

**col C re-run whole at this seat, every command, every line:**

```
(A1) grep -n 'X.KF.W9' KF-W10.md                  → :22
(A2) grep -n 'OP-4' KF-W10.md                     → :68 :232 :530 :537 :541
(A3) grep -n 'PACKET-FIRST' KF-W10.md             → :68 :84 :519 :537
(A4) grep -n 'D. → KF.W9 (Safari Visual Audit)'   → :553
(A5) grep -n 'surface verify' KF-W10.md           → :212
(A6) grep -n 'CH2-02' KF-W10.md                   → :203 :214 :232 :537
git diff --numstat -- waves/KF-W10.md             → 2  2  (the in-line claim, confirmed)
```

**6 of 6 reproduce col C exactly, at whole output.** The block's own in-line-edit claim (*"2 added / 2 deleted, no line created or destroyed"*) is confirmed by `git diff --numstat`. **`P7-2` CLOSED.**

### `P7-3` / `P7-5` / `P7-7` — the certificate layer

```
grep -oh 'CLOSE-CERT-6.md` §9' waves/KF-W*.md | wc -l  → 34
per file: W0 0 · W1 0 · W2 4 · W3 0 · W4 0 · W5 1 · W6 0 · W7 0 · W8 27 · W9 0 · W10 2
## §9 — THE ROUND-6 HASH BRACKET   at CLOSE-CERT-6.md:40, with §9.0–§9.6 (7 subsections)
§9.2 digests vs CLOSE-CERT-3 §HASH: 11 vs 11, `diff` EMPTY, exit 0
```

**34/34 resolve; the per-file split is exact, including the sub-defect §9.4 corrects (`KF-W9` at 0, not the 2 that `CLOSE-CERT-3` §S-2 mis-seated).** `P7-3` CLOSED.

`P7-5` is CLOSED by **`§11.1 — E-2 CORRIGENDUM ⟨P7-5⟩ — the word "exactly" is withdrawn at four of six anchors**, which concedes the finding in `P7-2`'s own arithmetic and names the cause in the clocks. `P7-7` is CLOSED by **`§11.2`**, and its corrected form was re-derived at this seat **at the bytes §11.2 declares** (the hash-locked round-6 state, read through `git show HEAD:`):

```
$ per-file over the committed round-6 bytes
occurrences = 63   lines = 36   ⟨KF-W5 alone: 35 occurrences on 10 lines⟩
```

**63 on 36, and `KF-W5` 35-on-10 — the corrigendum's figures, exactly, including its explanation of why occurrences and lines diverge.** A corrected census that reproduces at the bytes it names is the whole point of the exercise, and this one does.

### `P7-4` — closed by declaration, and the declaration is the right instrument

`§10` declares *"Round 6 has ONE close certificate in TWO parts, named by role"* — `CLOSE-CERT-3` = **the round-6 SEAL** (origin of the hash bracket), `CLOSE-CERT-6` = **the round-6 ERRATUM CERT** — and rules the unqualified phrase *"the round-6 certificate"* **ambiguous and not to be used**. It concedes `P7-4`'s sharpening *in full* and grounds the refusal to rename on **E-3** (a dated artifact is not renamed). It then enumerates the round's **third** instrument by path, so the set is closed by enumeration rather than left to inference. Measured at this seat: the banned bare phrase appears **0 times across all eleven specs**. **CLOSED.**

### `P7-9` — a class of eight, swept

```
grep -c ':25-28' KF-W8.md  → 1     (and that one is inside the dated correction note that quotes the old spelling)
grep -c ':25-27' KF-W8.md  → 7
```

Pass 7 measured `:25-28` at **7** against a single-site cure. The seven moved. **CLOSED.**

---

## §3 — AXIS 3 · RECEIPT / COORDINATE REALITY — **25 RECEIPTS RE-RUN, INCLUDING 11 ROUND-7 COORDINATE FIXES, ZERO EXCEPTIONS**

**Population enumerated mechanically before sampling**, per the seal's own better instinct: `grep -o 'P7 COORDINATE SWEEP' waves/KF-W*.md | wc -l` → **30**, per file `W2` 6 · `W5` 1 · `W7` 5 · `W8` 15 · `W9` 1 · `W10` 2 — reproducing `SEAL.md` §3's enumeration member for member.

### §3.1 — eleven round-7 coordinate fixes, each command re-executed

| # | source → target | pattern | printed by the landed note | **this seat** | ✓ |
|--:|---|---|--:|--:|:-:|
| 1 | W8 → W6 | `THE ACT: ONE ATOMIC COMMIT, three limbs` | 464 | **464** | ✔ |
| 2 | W8 → W5 | `Structure & Colocation` | 444 | **444** | ✔ |
| 3 | W8 → W5 | `OP-4 · LOCUS DECLARED` | 353 | **353** | ✔ |
| 4 | W8 → W5 | `^\| \*\*D-6` ⟨BRE, as written⟩ | 378 | **378** | ✔ |
| 5 | W10 → W8 | `TRIGGER, named` | 411 | **411** | ✔ |
| 6 | W8 → W2 | `ORDERED: KF.W8 precedes` | 63 | **63** | ✔ |
| 7 | W7 → W2 | `KF.W7 may not decide` | 786 | **786** | ✔ |
| 8 | W7 → W2 | `Both directions are now declared at both ends` | 829 | **829** | ✔ |
| 9 | W2 → W6 | `Taxonomy (binding` | 38 | **38** | ✔ |
| 10 | W5 → W4 | `The ten rulings this spec owes` | 100 | **100** | ✔ |
| 11 | W5 → W4 | `Census S-2` | 125 | **125** | ✔ |

### §3.2 — fourteen further receipts, whole-output claims against whole outputs

```
B-16          KF-W5.md  → :66 :307 :353 :409 :444                                     IDENTICAL
G-OPTSET      KF-W5.md  → :201 :234 :235 :244 :350 :351 :352 :353 :396 :409 :509      IDENTICAL
KF-HA-13      KF-W6.md  → :446 :454                                                   IDENTICAL
G-KFW4-1\b    KF-W4.md  → :10 :15 :16 :55 :60 :161 :165 :207  ⟨gate def :207; :198 not a hit⟩  AS CLAIMED
vitejs/plugin-vue      KF-W4.md → :55 :59 :167 :213                                   IDENTICAL
plugin-vue REGISTRATION KF-W4.md → :270 :323                                          IDENTICAL
test-utils    KF-W7.md  → :31 :61 :305 :351 :355 :397 :418  ⟨"seven not six"⟩         IDENTICAL
never globbed KF-W7.md  → :71 :354  ⟨"two not one"⟩                                   IDENTICAL
KF-APP-41     KF-W6.md  → :70 :462 :471 :472 :517 :542 :560 :567 :574 :598 :630 ⟨ELEVEN⟩ IDENTICAL
KF-KC-37      KF-W6.md  → :418 :572                                                   IDENTICAL
KF-CB-37      KF-W6.md  → :572                                                        IDENTICAL
cssom split disposition KF-W5.md → :444, one hit                                      IDENTICAL
'66-75'       KF-W5.md  → :230 :232 :343 :386 (+ :405 :499)   ⟨all four claimed present⟩ AS CLAIMED
'TEN S-9'     KF-W0.md  → :310 :377 :695                                              IDENTICAL
```

### §3.3 — the seal's own §5 figures, re-run after this seat's last analytical act (LAW I)

```
LAW G → 12   ·   RULINGS-6 → 0   ·   CLOSE-CERT-6.md` §9 → 34   ·   CLOSE-CERT-6 bare → 37
SHADOW \(LAW F\(1\)  : W0 0 · W1 3 · W2 3 · W3 0 · W4 2 · W5 0  · W6 6 · W7 0 · W8 7 · W9 2 · W10 1
SHADOW \(LAW F       : W0 0 · W1 3 · W2 3 · W3 0 · W4 2 · W5 15 · W6 6 · W7 0 · W8 7 · W9 2 · W10 1
'SIX acts carry a LAW F(1) verb in this file' KF-W6.md → 1
LAW E(4) timestamp sweep, files carrying a 15:–19: stamp → 8 of 11
    KF-W1 · KF-W2 · KF-W3 · KF-W5 · KF-W7 · KF-W8 · KF-W9 · KF-W10
KF-W0 receipts: OP-4 5 · B-16 3 · locus 3 · parseAnimationCSS 3
```

**Every figure reproduces.** The LAW E(4) sweep's 8-of-11 enumeration matches `CLOSE-CERT-6` §9.5 member for member, including §9.5's added file `KF-W3`.

### §3.4 — MY OWN independent staleness sweep, and the three false-positive waves it produced

Not content to re-run the notes the round wrote, this seat built its own extractor over **99** cross-spec `grep -n '<pat>' KF-W<n>.md … → :N` assertions, re-executed each command, and flagged every assertion whose claimed coordinate was not a measured hit. **It reported 42 suspects, then 26, then 21 as the cure-detection window widened.** Every one opened by hand resolved to the **cure form** — the stale numeral preserved in its own labelled cell as record, the corrected reading restated and dated. Three worked examples, because a summary here would be worthless:

- **`G-KFW4-1`** — the cell reads *"the gate definition is at `:205`, and `:198` is not a hit at all"* and is followed by ⟨**P7 COORDINATE SWEEP, 2026-08-29** — *"the gate definition is at `:207` — `:205` is retired in its turn, and `:198` is still not a hit"*⟩. Measured: `:207` is a hit, `:205` and `:198` are not. **Cured, and cured correctly.**
- **`G-OPTSET`** — the round-4 reading `:339` survives in its cell; the sweep note prints the **whole output** `:201 :234 :235 :244 :350 :351 :352 :353 :396 :409 :509` and identifies `:409` as the gate. Measured identical.
- **`DISCHARGED by KF.W7 SWAP verdict`** ⟨`KF-W7.md:347`⟩ — my sweep's strongest candidate: a note dated 2026-08-29 asserting `:276 :407 :530 — **UNMOVED** across the twelfth write`, against a measurement of `:282 :413 :536`, each `+6`. **It is already struck**, by a nested note reading ***"THE 'UNMOVED' IS FALSE AND IS STRUCK — PASS-7 COORDINATE SWEEP, 2026-08-29, check `P7-6`"*** which prints `:282 :413 :536` and names the `+6`. The round caught its own worst instance.

**Zero uncured stale coordinates found.** The instrument's false-positive rate is booked against *me* at `P8-6`, not against the corpus — this is the same class `SEAL.md` §3.2 disclosed against itself, and it reproduced here at larger scale, which is evidence the seal's disclosure was honest rather than decorative.

---

## §4 — AXIS 4 · GATES, LAWS, PORTABLE COMMANDS, FALSE UNIVERSALS

**Gate posture.** `born-RED` appears **138** times across the eleven; `reachable-GREEN` **3**; `GREEN` **168**. `KF-W6.md:523` states the standing form — *"Born-RED, each with a live witness measured at `origin/master 81a56990` … **Witnesses re-verify at wave-open (D-19). No gate mints a grep-idiom `proof:*` mark.**"* — which is both the born-RED/reachable-GREEN law and the retired-`proof:*` precept, held in one sentence. **No gate anywhere claims a GREEN it has run**; every wave's status is `planned` and no gate executed at this seat or any prior one.

**LAW A–I, measured.** `LAW A` 165 · `B` 168 · `C` 200 · `D` 132 · `E` 226 · `F` 114 · `G` 12 · **`H` 0** · **`I` 0**. The two zeros are **expected and correct**: `LAW H` (read the output, never summarise it) and `LAW I` (re-run every asserted figure after the last analytical act) are **seat-binding conformance laws** landed at `RULINGS-6` `TR-02`/`TR-03`. They bind auditors, not specs — `SEAL.md` invokes both by name, and so does this file at §3.3. Booked at `P8-8` so the zero reads as a measurement and not an omission.

**Instrument-path resolvability.** Every `conformance/PASS-*/….md` path cited in backticks across the eleven specs was tested for existence: **53 distinct paths, 53 resolve, 0 dangling.** No spec cites a `RULINGS-7`, a `CLOSE-CERT-7`, or a `PASS-7/CHECK.md` — so **the round-7 pass introduced no new dangling instrument**, which was the failure shape `P7-1` and `P7-3` both had.

**Portable commands** (`P7-8` carried). Four commands carry absolute `/Users/mkbabb/…` paths; three are cross-repo by necessity. All execute at this seat:

```
git -C /Users/mkbabb/Programming/keyframes.js rev-parse origin/master
    → 81a56990736ced5b5edde0b84c527680ac7689b1        ⟨= the declared frontier⟩
git -C /Users/mkbabb/Programming/keyframes-v-exec rev-parse HEAD
    → 81a56990736ced5b5edde0b84c527680ac7689b1        ⟨identical⟩
git -C /Users/mkbabb/Programming/keyframes-v-exec status --porcelain | wc -l   → 0
ls /Users/mkbabb/Programming/keyframes-v-exec/docs/tranches/V/coordination/ | wc -l  → 10
```

**No false universal was found in current voice anywhere in the corpus at this pass.** The one that pass 7 found (`P7-2`) is struck at its site with its own falsification printed beside it. The `P7-6` class's worst instance (`UNMOVED across the twelfth write`) is likewise struck with the true reading printed. This is the correct disposal form under `LAW G` and it is now visible in three separate places.

---

## §5 — AXIS 5 · POSTURE

| item | measurement | result |
|---|---|---|
| every wave `planned` | 10 of 11 carry `**Status**: planned`; `KF-W6` carries `**status: \`planned\`**` inline at its Wave line | **HELD** — 11 of 11 planned, one spelling variant |
| zero `VERIFIED` stamps | `grep -nE '^\*\*Status\*\*.*VERIFIED'` → **0** | **HELD** |
| no product source | every Status line that elaborates says so (*"No product byte is written by this file; authoring it opened no product source"*); `keyframes-v-exec` tree clean at 0 dirty | **HELD** |
| W4 head / W3 gated | `W4 head` ×1; `KF.W3 is GATED` ×1 + `KF.W3 is gated` ×2 | **HELD** |
| `O-21` | W1 13 · W10 7 · W2 6 · W4 2 · W9 2 = **30** | **HELD** |
| `§6.D` / `§0d` | 79 / 27 | **HELD** |
| `E-3` (addenda, not patch) | 296 citations; and **structurally obeyed** — `§9`/`§10`/`§11` are *appended blocks*, `E-2`'s and `E-5`'s original text is left standing with corrigenda beneath, and `§10` refuses a rename explicitly on E-3 grounds | **HELD** |
| frontier read-only | keyframes.js `origin/master` `81a56990`, re-resolved; its 252 dirty rows are the pre-existing worktree the records themselves describe and disqualify as witness substrate | **HELD** |

---

## §6 — THE DEFECT REGISTER: nine, all MINOR or INFO, each with its mitigation

### **`P8-1` · MINOR — `LAW G`'s instrument exists but is unreachable by grep from the spec side**
`grep -oh 'RULINGS-6' waves/KF-W*.md | wc -l` → **0**, across all eleven, while `LAW G` is cited **12** times in current voice. `P7-1`'s BLOCKER is discharged — the instrument is real and this seat byte-diffed all eight of its `TR` edits — so what survives is a **reachability** gap, not a dangling instrument. **Mitigation**: `CLOSE-CERT-6` §10 now enumerates the round's three instruments **by path**, so `RULINGS-6` is reachable from the certificate layer; the seal declined to cure the spec side on the correct ground that a spec edit lay outside its writable set. Booked by the seal at `OBS-5` and carried here unchanged. **A one-command round-8 sweep closes it.**

### **`P8-2` · MINOR — a third `CLOSE-CERT-5` delegation survives at `KF-W9.md:77`, outside the block that struck the other two**
The `:258` block's repair note names exactly two struck strings, *"(1)"* and *"(2)"*. The §Bounds capture-receipt cell at `:77` still reads, in current voice, *"that verification is carried **by command at S-10** as this round's baseline, and **CLOSE-CERT-5 re-verifies from it**"*. **Mitigation, and it is why this is MINOR and not a repeat of the HIGH**: `:77` carries **no false universal** — it sits under §Bounds, not under a bold *"NOT DELEGATED"* head — and the verification it points at **demonstrably happened**: all six anchors reproduce at this seat (§2). The clause is therefore a forward re-verification duty layered on a completed verification, which is exactly the shape `LAW E(5)(ii)` names as a sweep class. Nothing rides on it.

### **`P8-3` · MINOR — `KF-W9`'s `LAW F(1)` form count is 2 against a ledger of 8** ⟨seal `OBS-2`, carried⟩
Re-measured at current bytes: `grep -oE 'SHADOW \(LAW F\(1\)' KF-W9.md | wc -l` → **2**. **Mitigation**: `RULINGS-6` **self-books this unrepaired rather than certifying it away**, and the round's contract carried no widening edit. Booking a known gap forward is the correct conduct; it is the round's declared live carry.

### **`P8-4` · MINOR — `TR-08`'s own mandated pattern returns 0 at the file it holds up as the standard** ⟨seal `OBS-3`, carried⟩
`SHADOW \(LAW F\(1\)` → **0 at `KF-W5`**, the file `TR-08` cites at *"fourteen"*. Widened to `SHADOW \(LAW F` → **15**, resolving to 14 acts + 1 mention under `LAW G`'s act-vs-mention split. **`KF-W5`'s fourteen are real and owe no repair; the pattern is what is wrong.** **Mitigation**: `RULINGS-6` diagnoses this against itself and states the round-8 choice as an exclusive-or (widen the pattern *and* apply the act/mention split, **or** land the `(1)` spelling at `KF-W5`) — one or the other, not both, not neither.

### **`P8-5` · MINOR — the round-6/7 instrument layer is untracked or uncommitted in git**
`git status --porcelain -- docs/tranches/X/keyframes/` returns `?? …/PASS-6/RULINGS-6.md`, `?? …/PASS-7/SEAL.md`, and ` M` on seven wave specs plus `CLOSE-CERT-6.md`. The hash bracket's authority therefore rests on **working-tree bytes only**; the round-6 "immutable origin" is not yet backed by repo history. **Mitigation**: the seven modified specs are **exactly** the seven `§9.6` lists as MOVED (verified at the digest, §0), the program is pre-execution and doc-only, pathspec-commit discipline is the standing rule, and every digest in the seal table reproduces at this seat — so the bytes are the bytes. **No figure in the corpus is wrong; the record is simply not yet durable.**

### **`P8-6` · MINOR (this seat's own instrument, disclosed against itself) — the coordinate-cure form systematically defeats mechanical staleness sweeps**
My independent sweep of 99 cross-spec coordinate assertions reported **42**, then **26**, then **21** suspects as the cure-detection window widened from 150 to 700 to 3,000 characters. **Every one opened by hand was a cure**, not a defect. The mechanism: the mandated cure form *preserves the stale numeral in place as record* and states the corrected reading afterwards, so any forward-window parser harvests the struck value first. **Mitigation and the reason it is booked**: a round-8 seat running the obvious instrument will manufacture the same false positives, and had these shipped unopened they would have convicted the corpus of exactly the class it has cured. The correct instrument requires the *corrected* value to be absent, not merely the *first* value to be stale.

### **`P8-7` · INFO — `E-5`'s corrected census is scope-bound and does not reproduce at current bytes**
`§11.2`'s corrected form reads *"63 occurrences on 36 lines"*. At the **committed round-6 bytes** — the scope `§11.2` itself declares (*"measured over the hash-locked bytes"*) — this seat measured **63 occurrences on 36 lines**, `KF-W5` alone at 35-on-10: **exact, including the divergence explanation.** At **current working-tree bytes** the same commands return **65 on 35**, because the round-7 spec writes moved the file. **Mitigation**: nothing is asserted falsely — the figure names its bytes, which is the entire cure `§9` was built to institute. Recorded so no round-8 seat reads the delta as drift. This is `OBS-4`'s shape, correctly handled.

### **`P8-8` · INFO — `LAW H` and `LAW I` have zero surface in the eleven specs**
`grep -oh 'LAW H' waves/KF-W*.md` → **0**; `'LAW I\b'` → **0**. **Mitigation**: both are seat-binding conformance laws (`TR-02`/`TR-03`), landed at `RULINGS-6`, binding auditors rather than specs — `SEAL.md` §3/§5 exercises both explicitly and so does this file. **Expected zero.** Booked only so that the number is a measurement and not an unexamined absence.

### **`P8-9` · INFO — four commands carry absolute machine paths** ⟨`P7-8`, carried⟩
Three are cross-repo and a path is unavoidable; only the value.js-root `find` could be relativised. All four execute at this seat and both named clones exist at the declared refs (§4). **No action required.**

---

## §7 — WHAT THIS SEAT AFFIRMS

**The hash discipline is real.** Thirteen digests reproduce the seal's table with no exception; four hold and seven moved, exactly as `§9.6` predicted **before** they moved. A round-6 instrument that correctly predicts its own round-7 drift by name and by file is the strongest available evidence that the scope declarations are load-bearing rather than decorative.

**The census is closed at a granularity that could have hidden it.** 2,633 rows across 58 records, four row shapes, twenty residual candidates each opened individually. My own first two extractors would have reported a clean census over 30 and then 2 unread records; the failure mode is disclosed at §1 rather than buried.

**The two top-tier findings of pass 7 are cured in the mandated form, not argued away.** `P7-1`'s instrument exists and its eight edits are byte-identical under this seat's own diff. `P7-2`'s delegation is struck **with its own falsification printed beside it**, the head re-grounded on the body, and the six anchors re-measured to whole output — all six reproduce.

**The corpus convicts itself in three places.** `RULINGS-6` books `OBS-2` and `OBS-3` unrepaired rather than certifying them closed; `§11.1` withdraws the word *"exactly"* from `E-2`; `§11.2` corrects `E-5`'s correction; and `KF-W7.md:347` strikes its own *"UNMOVED"* as false and prints the true `+6`. **A program that prints its own defeats at four separate instruments is not one that has learned to hide them.**

**What is left is a tail.** Two reachability gaps (`P8-1`, `P8-2`), two declared carries the round chose to book rather than close (`P8-3`, `P8-4`), one durability gap (`P8-5`), one instrument caution against my own successor (`P8-6`), and three INFO measurements. **None is a defect in what landed.**

---

## §8 — VERDICT

| axis | result |
|---|---|
| 1 · ID-keyed census by record over all 58 | **CLEAN — 0 escapes** ⟨2,633 rows · 58/58 records parsed · 20 residuals adjudicated⟩ |
| 2 · the pass-7 register `P7-1`..`P7-9`, individually at the bytes | **7 CLOSED · 1 CLOSED-by-declaration · 1 carried no-action** |
| 3 · receipt / coordinate reality | **25 receipts re-run, 11 of them round-7 coordinate fixes — ZERO exceptions; 0 uncured stale coordinates** |
| 4 · gates + laws + portable commands + false universals | **HELD — 0 false universals in current voice; 53/53 instrument paths resolve; 0 new danglers** |
| 5 · posture | **HELD on every item** |
| hashes | **CLEAN — 13 of 13** |

**BLOCKER 0 · CRITICAL 0 · HIGH 0 · MAJOR 0 · MINOR 6 · INFO 3.**

# **CONFORMANT.**

The bar was: zero BLOCKER/CRITICAL/HIGH, hashes clean, census closed, tail MINOR-or-below with stated mitigations. **All four are met, and they are met at the bytes rather than at the seal's word** — every figure in this file is the output of a command run by this seat, including the three false-positive waves my own staleness instrument produced and my second pass opened by hand, which are recorded at `P8-6` because a check that prints only its confirmations has checked nothing.

---

*PASS-8 CHECK SEAT, 2026-08-29. VERIFY-ONLY. This file is the seat's only write: no spec, check, union, work order, rulings instrument, certificate or registry record was opened for writing; no gate ran; no product source was opened; every wave's status stays `planned`. E-3 held throughout. LAW H obeyed — every output above is printed, not summarised. LAW I obeyed — every figure was re-run after this seat's last analytical act.*

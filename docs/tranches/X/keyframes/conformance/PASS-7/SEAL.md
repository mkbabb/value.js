# X·KF PASS-7 — SEAL (round-7 seal seat)

**Bare name**: `SEAL-7`. **Path of record**: `docs/tranches/X/keyframes/conformance/PASS-7/SEAL.md`.
**Seat**: PASS-7 SEAL SEAT, 2026-08-29. **Charge**: VERIFY-ONLY, three counts, plus the closing hash table.
**Authority**: `PASS-6/WORK-ORDER.md` §BATCH-TAIL (the eight `TR` specs) · `PASS-6/RULINGS-6.md` (the landing under test) · `PASS-6/CLOSE-CERT-6.md` §9 (the section under test) · `PASS-7/CHECK.md` `P7-1` / `P7-3` / `P7-6` (the findings this seal adjudicates) · `PASS-6/CLOSE-CERT-3.md` §HASH (the immutable round-6 origin).

**ZERO EDITS.** This seat's writable set is this file and nothing else. No spec, no check, no union, no work order, no rulings artifact and no prior-pass certificate was opened for writing. No gate ran, no product source was opened, no wave's status moved. Every figure below is the output of a command run by this seat; **nothing is inherited from the artifact under test**, which is the only posture from which a seal can convict the thing it seals.

**Verdict, stated first: THREE CHARGES PASS, ZERO LANDED WRONG.** 72 discrete items verified — 8 TR edits, 34 citations, 30 coordinate fixes. Five observations are booked at §4; **none is a defect in what landed**, and each is disclosed in the artifact that carries it rather than found against it, which is the distinction this seat was convened to draw.

---

## §1 — CHARGE 1: `RULINGS-6.md` exists and carries the eight `TR` edits

**Existence**: `PASS-6/RULINGS-6.md`, 29,457 B, 2026-08-29 17:50:59. `P7-1`'s BLOCKER — *"LAW G existed in no instrument of record"* — is discharged at the path the round contracted.

**Method, stated because a weaker one would not convict.** `WORK-ORDER.md` §BATCH-TAIL contracts seven of the eight `TR` edits as **fenced literal blocks** (one line each). Those were extracted by line and **byte-diffed** against their landed counterparts — not read for sense, not spot-quoted. `TR-04` is the exception: it is a **directive** (*"Land LAW G verbatim as written at §0 of this work order…"*), so it was verified in three parts against §0.

| edit | contracted at | landed at | method | result |
|---|---|---|---|---|
| `TR-01` LAW E(4) re-issued | `WORK-ORDER.md:2036` | `RULINGS-6.md:121` | byte-diff | **IDENTICAL** |
| `TR-02` LAW H | `:2042` | `:88` | byte-diff | **IDENTICAL** |
| `TR-03` LAW I | `:2048` | `:113` | byte-diff | **IDENTICAL** |
| `TR-04` LAW G | `:2054` → §0 | `:52` · `:56-69` · `:71` | 3-part, below | **IDENTICAL** |
| `TR-05` R6-A | `:2060` | `:190` | byte-diff | **IDENTICAL** |
| `TR-06` R6-B | `:2066` | `:194` | byte-diff | **IDENTICAL** |
| `TR-07` LAW E(5) re-cut | `:2072` | `:129` | byte-diff | **IDENTICAL** |
| `TR-08` LAW F re-issued | `:2078` | `:146` | byte-diff | **IDENTICAL** |

**`TR-04`'s three parts, each diffed separately:**

```
(a) the LAW G blockquote        WORK-ORDER.md:20      vs  RULINGS-6.md:52      → IDENTICAL
(b) the twelve-instance table   WORK-ORDER.md:24-37   vs  RULINGS-6.md:56-69   → IDENTICAL (14 lines)
(c) the "law's teeth" paragraph WORK-ORDER.md:2054    vs  RULINGS-6.md:71      → IDENTICAL
    ⟨(c) = TR-04's block with its leading directive sentence removed; the removal was
     verified by prefix test, not assumed⟩
```

**8 of 8 landed, and landed verbatim.** The file's own claim — *"the text between the rules is the block as `WORK-ORDER.md` §BATCH-TAIL wrote it, not a re-authoring of it"* — **is true at the bytes.** One re-punctuation is booked at §4 `OBS-1`; it falls outside every contracted block.

**Adjacency checked, because `TR-01` places a duty on another file.** `TR-01` mandates that the LAW E(4) sweep's per-file result **including the zeros** be printed *in the close certificate*. It is, at `CLOSE-CERT-6.md` §9.5 — see §2 below. A law whose mandated output lands nowhere is `P7-1`'s shape repeated, and it does not repeat here.

---

## §2 — CHARGE 2: `CLOSE-CERT-6.md` §9 resolves the 34 dangling citations

**`P7-3`** convicted 34 landed citations of the literal ``PASS-6/CLOSE-CERT-6.md` §9`` pointing at a section that did not exist, and offered two mitigations: **add a §9**, or **re-point all 34**. The certificate took the first and says so — *"the content is CARRIED here, not re-pointed elsewhere… The alternative mitigation `P7-3` offered was declined, because it would require thirty-four edits across five specs to repair a certificate's own missing section, and this seat's writable set contains no spec."*

**Existence**: `## §9 — THE ROUND-6 HASH BRACKET` at `CLOSE-CERT-6.md:40`, with §9.0–§9.6.

**The census, re-run by this seat at current bytes:**

```
$ grep -oh 'CLOSE-CERT-6\.md` §9' waves/KF-W*.md | wc -l
      34
$ per file (zeros included, per LAW E(4)'s sweep form):
  KF-W0 0 · KF-W1 0 · KF-W2 4 · KF-W3 0 · KF-W4 0  · KF-W5 1
  KF-W6 0 · KF-W7 0 · KF-W8 27 · KF-W9 0 · KF-W10 2
```

**34, and the per-file split reproduces §9.4 exactly** — including the sub-defect §9.4 corrects, `KF-W9` at **0** and not the `2` that `CLOSE-CERT-3` §5 `S-2` mis-seated under the `→ 34` command. **All 34 citations resolve as written.** No spec was edited to achieve it, which was the constraint.

**The bracket's identity re-proved independently.** §9.3 offers a spec-independent check — the digests **as written into §9.2** diffed against the immutable origin at `CLOSE-CERT-3` §HASH. This seat re-ran it:

```
$ awk '/## §9.2/,/Eleven of eleven/' CLOSE-CERT-6.md | grep -oE '^[0-9a-f]{64}' | sort > written
$ grep -oE '^[0-9a-f]{64}' CLOSE-CERT-3.md | sort                                  > cert3
$ wc -l written cert3   →  11  11
$ diff written cert3 ; echo "exit $?"
exit 0
```

**Empty diff, 11 against 11.** §9.2 is a faithful printing of the round-6 bracket, and the check that proves it **reads only the two certificates** — so it is stable against the round-7 spec writes disclosed at §9.6. This is the correct construction: a hash bracket that moved when a later round wrote would be worthless.

**`TR-01`'s mandated sweep, re-run:**

```
$ grep -lE '\b1[5-9]:[0-5][0-9]:[0-5][0-9]\b' waves/KF-W*.md   → 8 of 11
  KF-W1 · KF-W2 · KF-W3 · KF-W5 · KF-W7 · KF-W8 · KF-W9 · KF-W10
```

**8 of 11, and the enumeration matches §9.5 member for member.** §9.5's added file `KF-W3` carries its **single** hit `18:50:14` at `:310` — verified by this seat at both the value and the coordinate. Per-file occurrence counts reproduce §9.5's at ten of eleven files; the eleventh is booked at §4 `OBS-4` as a **post-capture** movement, correctly covered by §9.0's scope declaration.

---

## §3 — CHARGE 3: the specs seat's coordinate fixes, re-run

**Charge**: spot-verify 15. **Performed**: the seat first enumerated the population mechanically rather than sampling a list handed to it — `grep -o 'P7 COORDINATE SWEEP' KF-W*.md` returns **30 notes across 5 files** (`KF-W2` 6 · `KF-W5` 1 · `KF-W7` 5 · `KF-W8` 15 · `KF-W9` 1 · `KF-W10` 2). **All 30 were re-run, not 15**, because the charged 15 are `P7-6`'s table and the sweep is wider than the finding that provoked it.

### §3.1 — the charged 15 (`P7-6`'s table), each command re-executed

| # | source → target | pattern | printed | `P7-6` | **this seat** | ✓ |
|--:|---|---|--:|--:|--:|:-:|
| 1 | W8 → W6 | `THE ACT: ONE ATOMIC COMMIT, three limbs` | 416 | 464 | **464** | ✔ |
| 2–5 | W8 → W5 | `Structure & Colocation` ⟨4 sites⟩ | 430 | 444 | **444** | ✔ |
| 6 | W8 → W5 | `OP-4 · LOCUS DECLARED` | 339 | 353 | **353** | ✔ |
| 7 | W8 → W5 | `^\| \*\*D-6` | 364 | 378 | **378** | ✔ |
| 8 | W10 → W8 | `TRIGGER, named` | 391 | 411 | **411** | ✔ |
| 9 | W8 → W2 | `ORDERED: KF.W8 precedes` | 59 | 63 | **63** | ✔ |
| 10 | W7 → W2 | `KF.W7 may not decide` | 782 | 786 | **786** | ✔ |
| 11 | W7 → W2 | `Both directions are now declared at both ends` | 825 | 829 | **829** | ✔ |
| 12–13 | W2 → W6 | `Taxonomy (binding` ⟨2 sites⟩ | 18 / 35 | 38 | **38** | ✔ |
| 14 | W5 → W4 | `The ten rulings this spec owes` | 99 | 100 | **100** | ✔ |
| 15 | W5 → W4 | `Census S-2` | 124 | 125 | **125** | ✔ |

**15 of 15 measure at the value the landed note prints, every one a single hit.** Each was then checked at the **citing** end: the source spec carries a dated ⟨`P7 COORDINATE SWEEP, 2026-08-29`⟩ note holding the corrected coordinate. The cure form is `TR-01`'s mandated one throughout — **the stale numeral is struck as authority and preserved as record**, the anchor is restated, and the new reading is dated. `KF-W2`'s `Taxonomy (binding` pair is the clearest instance: the pre-round-4 `:18` survives in its own labelled cell and the live coordinate reads *"→ `:35` (was `:18`) ⟨P7 COORDINATE SWEEP … `:38`⟩"* — three readings, one anchor, none re-issued as current.

### §3.2 — the other 15, swept the same way

The remaining notes were parsed for their command and their claim and re-executed. **Whole-output claims match whole outputs exactly:**

```
KF-W2  'B-16'     KF-W5.md  claimed :66 :307 :353 :409 :444          measured identical  ✔ (×2 sites)
KF-W2  'G-OPTSET' KF-W5.md  claimed :201 :234 :235 :244 :350 :351
                            :352 :353 :396 :409 :509                 measured identical  ✔
KF-W2  'KF-HA-13' KF-W6.md  claimed :446 :454, quoted row at :454    measured identical  ✔ (×2 sites)
KF-W2  'G-KFW4-1\b' KF-W4.md  claims gate def at :207, ":198 not a hit"
                            → :207 IS the `G-KFW4-1` vue-tsc gate row; :198 is blank    ✔
KF-W7  'vitejs/plugin-vue'      KF-W4.md  claimed :55 :59 :167 :213   measured identical  ✔ (×2 sites)
KF-W7  'plugin-vue REGISTRATION' KF-W4.md claimed :270 :323, 2 lines  measured identical  ✔
KF-W8  'test-utils'    KF-W7.md  claimed :31 :61 :305 :351 :355 :397 :418, "seven not six"
                                                                     measured identical  ✔ (×2 sites)
KF-W8  'never globbed' KF-W7.md  claimed :71 :354, "two not one"      measured identical  ✔ (×3 sites)
KF-W8  'KF-APP-41'     KF-W6.md  claimed ELEVEN :70 :462 :471 :472 :517 :542 :560 :567
                                 :574 :598 :630; sentence 1 at :462, sentence 2 at :464
                                                                     measured identical  ✔
KF-W8  'KF-KC-37'      KF-W6.md  claimed :418 :572                    measured identical  ✔
KF-W8  'KF-CB-37'      KF-W6.md  claimed :572                         measured identical  ✔
KF-W8  "ingest/cssom.ts`'s split disposition" KF-W5.md  claimed :444, one hit
                                                                     measured identical  ✔
KF-W9  '66-75'         KF-W5.md  claimed :230 :232 :343 :386          all present         ✔
KF-W10 'TEN S-9'       KF-W0.md  claimed :310 :377 :695               measured identical  ✔
```

**30 of 30 clean. Zero landed wrong.**

**A methodological note this seat owes, because LAW H requires the output be read and not summarised.** This seat's first mechanical pass reported **2 MISMATCH and 1 PARTIAL** — `KF-W7`'s two `plugin-vue` notes and the `D-6` row. **All three were the seat's own instrument, not the artifact's**, and each was opened by hand before being written down:

- the two `plugin-vue` "mismatches" were a **claim-extraction artifact** — the parser's forward window ran past the sweep note into an adjacent clause and harvested `:438`, `:61`, `:105` from the round-6 rider that follows. Read directly, both notes print `:270 :323` and `:55 :59 :167 :213`, and **both match**;
- the `D-6` "partial" was a **regex-dialect artifact** — the seat ran `grep -nE '^| \*\*D-6'`, where ERE reads `|` as alternation and matches every line of the file. The spec writes `grep -n`, BRE, where `|` is literal; re-run as written it returns **`:378`, one hit**, matching.

**Three false positives, all the auditor's, none the auditee's — recorded because a seal that prints only its confirmations is a summary.** Had these shipped unopened they would have manufactured exactly the class `P7-6` prosecutes: a numeral asserted under a command that did not produce it.

---

## §4 — OBSERVATIONS: five, none a defect in what landed

**`OBS-1` ⟨`TR-04`, cosmetic⟩.** `RULINGS-6.md:54`'s table-header sentence is re-punctuated against `WORK-ORDER.md:22` — *"…each executed at its own numbered edit **—** twelve members"* became *"**The law's own worked examples —** its instances… numbered edit**;** twelve members"*. This sentence sits in §0's framing prose, **outside every fenced `TR` block**, and `TR-04`'s directive explicitly asks for the instances *"carried as the law's own worked examples"*. The LAW G blockquote and all twelve table rows are byte-identical. **Not a landing defect; recorded so no later seat reads it as drift.**

**`OBS-2` ⟨standing carry, round 8⟩.** `RULINGS-6` self-books an **unrepaired** item rather than certifying it away: `KF-W9`'s LAW F(1) form count is **2 against a ledger of 8**. Re-run by this seat at current bytes: **still 2.** The round's contract carried no edit widening it. **This is correct conduct — booked forward, not closed — and it is the round's live carry.**

**`OBS-3` ⟨standing carry, round 8⟩.** `TR-08`'s own mandated pattern `SHADOW \(LAW F\(1\)` returns **0 at `KF-W5`** — the very file `TR-08` holds up as the in-round standard at *"fourteen"*. Re-run by this seat: narrow pattern **0**, widened pattern `SHADOW \(LAW F` **15**, resolving to **14 acts + 1 mention** under LAW G's act-vs-mention split. **`KF-W5`'s fourteen are real and owe no repair; the pattern is what is wrong.** `RULINGS-6` diagnoses this against itself and states the round-8 choice as exclusive-or — widen the pattern (and then apply the act/mention split, or the widening re-imports the defect LAW G bans) **or** land the `(1)` spelling at `KF-W5`. **One or the other, not both, not neither.**

**`OBS-4` ⟨dated-reading, correctly scoped⟩.** §9.5's per-file E(4) census reproduces at ten of eleven files. `KF-W9` reads **14** now against §9.5's **7** (TOTAL 170 vs 163, delta exactly +7, all of it `KF-W9`), because `KF-W9` was written at **17:50:00** — *after* §9.5's declared capture window of **17:36–17:41**. §9.6 lists `KF-W9` as **MOVED** and §9.0 declares the whole block scoped to the §9.2 bytes, so **nothing is asserted falsely**. Recorded only because §9.6's HELD/MOVED enumeration was taken at 17:48 and this figure moved at 17:50, two minutes after — **the disclosure is sound; its timestamp is simply earlier than the last write.**

**`OBS-5` ⟨open, `P7-4`⟩.** `RULINGS-6` records, as a fact and not as a repair, that **not one of the twelve `LAW G` citations names the file** — they cite *"LAW G"* bare, so `grep -c 'RULINGS-6' waves/KF-W*.md` returns **0 across all eleven**, re-confirmed by this seat. The instrument now exists but remains **unreachable by grep from the spec side**. The seat declined to cure it on the correct ground (a spec edit is outside its writable set). Separately, `P7-4`'s two-certificates-two-names collision is disposed at §10 **by declaration rather than by rename or merge**, so the phrase *"the round-6 certificate"* still has two referents. **Both are live for round 8.**

---

## §5 — RECEIPTS: this seal's own figures, all re-run at current bytes

Per LAW I, every figure this seat asserts in its own voice, re-run **after** its last analytical act. Outputs whole, per LAW D(3). Run from `docs/tranches/X/keyframes/`.

```
$ grep -oh 'LAW G' waves/KF-W*.md | wc -l
      12
$ grep -oh 'RULINGS-6' waves/KF-W*.md | wc -l
       0
$ grep -oh 'CLOSE-CERT-6\.md` §9' waves/KF-W*.md | wc -l
      34
$ grep -oh 'CLOSE-CERT-6' waves/KF-W*.md | wc -l
      37

$ for f in waves/KF-W{0,1,2,3,4,5,6,7,8,9,10}.md; do
    echo "$f $(grep -noE 'SHADOW \(LAW F\(1\)' $f | wc -l)"; done
KF-W0 0   KF-W1 3   KF-W2 3   KF-W3 0   KF-W4 2   KF-W5 0
KF-W6 6   KF-W7 0   KF-W8 7   KF-W9 2   KF-W10 1

$ (same loop, pattern widened to 'SHADOW \(LAW F')
KF-W0 0   KF-W1 3   KF-W2 3   KF-W3 0   KF-W4 2   KF-W5 15
KF-W6 6   KF-W7 0   KF-W8 7   KF-W9 2   KF-W10 1

$ grep -noE 'SHADOW \(LAW F\(1\)' waves/KF-W6.md | wc -l              → 6
$ grep -c 'SIX acts carry a LAW F(1) verb in this file' waves/KF-W6.md → 1

$ grep -c 'OP-4' waves/KF-W0.md               → 5
$ grep -c 'B-16' waves/KF-W0.md               → 3
$ grep -c 'locus' waves/KF-W0.md              → 3
$ grep -c 'parseAnimationCSS' waves/KF-W0.md  → 3

$ grep -o 'P7 COORDINATE SWEEP' waves/KF-W*.md | wc -l                 → 30
```

**Every RULINGS-6 receipt figure reproduces at current bytes, with zero drift** — `LAW G` 12 · `RULINGS-6` 0 · the F(1) form table at **all eleven** files · the widened table at all eleven · KF-W6's 6-against-6 · LAW E(5)'s actor test at 5/3/3/3 against a pre-repair 0/0/0/1. The one figure that moved is the **bare** `CLOSE-CERT-6` count, **36 → 37**, which `CLOSE-CERT-6` §9.6 discloses in advance by name and file (`KF-W9` 2 → 3). **A round-6 instrument predicting its own round-7 drift, correctly, is the strongest evidence available that the scope declarations are real and not decorative.**

**Substrate at seal time**, `stat` immediately before the hash table below:

```
KF-W0  257,985 B 16:49:20   KF-W1  254,747 B 17:45:24   KF-W2  362,133 B 17:47:50
KF-W3  190,569 B 16:55:18   KF-W4  244,262 B 16:59:17   KF-W5  302,874 B 17:47:50
KF-W6  306,972 B 16:51:21   KF-W7  261,120 B 17:51:32   KF-W8  269,803 B 17:51:13
KF-W9  280,059 B 17:50:00   KF-W10 261,653 B 17:47:50
RULINGS-6.md 29,457 B 17:50:59        CLOSE-CERT-6.md 38,564 B 17:51:11
```

**These are ROUND-7 bytes and are not the round-6 bracket.** Seven specs moved after `CLOSE-CERT-6` §9.2's capture window; the table below is **this seal's own bracket over the round-7 state**, and `PASS-6/CLOSE-CERT-3.md` §HASH remains the immutable round-6 origin. **The two are different brackets over different bytes and neither supersedes the other** — which is precisely the discrimination §9.3 draws and this seat is bound by.

---

## §6 — VERDICT

| charge | items | result |
|---|--:|---|
| 1 · `RULINGS-6.md` carries the eight `TR` edits | 8 | **PASS** — 8/8 verbatim, byte-diffed |
| 2 · `CLOSE-CERT-6.md` §9 resolves the 34 danglers | 34 | **PASS** — 34/34 resolve, split exact, bracket identity re-proved |
| 3 · the specs seat's coordinate fixes | 30 | **PASS** — 30/30 re-run clean ⟨15 charged⟩ |
| | **72** | **LANDED WRONG: 0** |

`P7-1` (LAW G dangling) and `P7-3` (§9 dangling ×34) are **discharged at the bytes**. `P7-6`'s stale-coordinate class is **cured across 30 sites in the mandated form**. Five observations stand at §4; `OBS-2`, `OBS-3` and `OBS-5` are **live carries for round 8** and are booked, not closed.

---

## §7 — HASH TABLE ⟨THE ABSOLUTE LAST ACT OF THIS SEAT⟩

`shasum -a 256`, whole output, nothing trimmed (LAW D(3)). Run after every other act above, at the bytes stamped at §5.

```
$ shasum -a 256 docs/tranches/X/keyframes/waves/KF-W*.md \
                docs/tranches/X/keyframes/conformance/PASS-6/RULINGS-6.md \
                docs/tranches/X/keyframes/conformance/PASS-6/CLOSE-CERT-6.md

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

**Thirteen of thirteen.** Paths are shown relative to `docs/tranches/X/keyframes/` for reading; the command was run against absolute paths and the digests are the command's own bytes, transcribed whole and unaltered.

**Four of the eleven wave digests are identical to `CLOSE-CERT-6` §9.2 / `CLOSE-CERT-3` §HASH** — `KF-W0` · `KF-W3` · `KF-W4` · `KF-W6`, exactly the four §9.6 lists as **held**. The other seven differ, exactly the seven §9.6 lists as **MOVED**. **§9.6's disclosure is confirmed at the digest level, file for file, with no exceptions in either direction** — the four it said held, hold; the seven it said moved, moved.

---

*PASS-7 SEAL SEAT, 2026-08-29. VERIFY-ONLY. This file is the seat's only write: no spec, check, union, work order, rulings artifact or prior-pass certificate was opened for writing; no gate ran; no product source was opened; every wave's status stays `planned`. E-3 held throughout. Every figure above is this seat's own command output, including the three false positives its first mechanical pass produced and its second opened by hand — which are recorded because a seal that prints only its confirmations has verified nothing.*

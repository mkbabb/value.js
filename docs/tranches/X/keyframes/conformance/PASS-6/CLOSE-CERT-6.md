# X·KF PASS-6 — CLOSE-CERT-6 (the round-6 instrument of record)

**Bare name**: `CLOSE-CERT-6`. **Path**: `docs/tranches/X/keyframes/conformance/PASS-6/CLOSE-CERT-6.md`. **One name per certificate, round-numbered** — this ends the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual spelling that made a single quantity greppable two ways and produced two of this round's census defects (E-4, E-5).

**Opened 2026-08-29 by the round-6 BATCH-CERT seat**, executing `PASS-6/WORK-ORDER.md` §BATCH-CERT edits `C-01`–`C-11`.

**E-3 governs.** `PASS-5/CLOSE-CERT-2.md` is a prior-pass artifact and is **immutable**: not one byte of it is edited by this file or by the round-6 repair. Every correction that certificate is owed **lives forward, here**, as a dated erratum row naming the cert's §, the printed value and the true value. Each row below is a complete insert; **none edits PASS-5**.

**Forward reference, declared so it is not read as landed**: the round-6 **§9 hash bracket** — the opening/closing digest table this instrument's authority rests on, and the stamp authority of record that `KF-W10.md`'s struck substrate table and its §6.D minting-citation block are re-pointed to — is the **RECONCILE seat's act at round-6 close** and is not written by this seat. Only §ERRATA is landed here.

---

## §ERRATA — eleven dated rows, 2026-08-29

| erratum | correction of record |
|---|---|
| **E-1 · §6.1 (`:204`) — THE WRITE-ORDER TABLE, RE-DERIVED AT ELEVEN** | `CLOSE-CERT-2.md:204` printed NINE entries for ELEVEN specs and substituted the predecessor-reconcile pass's insertion clocks at three (W1, W7, W10), leaving those three specs with no per-wave write clock and placing stage-1 W1 after stage-2 W8/W9 under a sentence certifying the stage order. **The eleven true per-wave clocks, derived from the round-5 authoring journal (per-spec repair agent, last write; UTC→EDT at −4, the conversion verified against the cert's own 19:28:45 / 19:30:41 predecessor values): W0 18:49:33 → W4 18:50:12 → W3 18:50:14 → W6 18:52:46 → W2 18:54:59 → W5 18:55:45 → W1 18:56:54 → W9 19:05:06 → W8 19:11:06 → W7 19:11:33 → W10 19:13:55.** Under the true clocks the certified sentence is TRUE AND DERIVABLE for the first time: every stage-1 spec (W0·W1·W2·W3·W4·W5·W6, all ≤ 18:56:54) wrote before every stage-2 spec (W7·W8·W9·W10, all ≥ 19:05:06); W0 is first; **W10 at 19:13:55 is last of the per-wave seats**. Two of the cert's printed figures are corrected in the same motion: **W5 18:55:46 → 18:55:45** (one second, transcription) and **W9 19:17:10 → 19:05:06** (the journal shows the W9 per-wave agent's last write at 19:05:06; if a later touch is claimed for W9 it must be produced as a command's output, per LAW G). The predecessor-reconcile insertions — W1 19:28:19, W7 19:28:45, W10 19:30:41 — are a SEPARATE pass and are recorded as such, never as per-wave clocks. **E-3: `PASS-5/CLOSE-CERT-2.md` is not edited; this row is the correction of record.** |
| **E-2 · §7.2 — COL B STRUCK; THE LAW E(4) DEMONSTRATION RE-GROUNDED ON COL A ↔ COL C** | §7.2 re-tabled `KF-W9.md`'s col B without re-deriving it and named it *"the entire argument for LAW E(4)"*. Col B describes **no state of `KF-W10.md` at any clock in round 5**: A3 −10 · A4 −10 · A5 −8 · A6 +3 against the file's only two reconstructible states. Col C is correct and reproduces exactly at final bytes (`:22 :68 :513 :547 :206 :197`). **The drift class survives the strike and is demonstrated on the two MEASURED columns alone: A ⟨209,923 B baseline⟩ = `:20 :66 :485 :519 :182 :184` → C ⟨final⟩ = `:22 :68 :513 :547 :206 :197` — SIX of six offsets moved, +2/+2/+28/+28/+24/+13.** That is a stronger demonstration than the one struck, and it is measured. **Compounding, recorded here because it is the same block**: three of the six commands the block pastes are multi-line and were printed as single numerals — at col B's claimed state `grep -n 'OP-4' KF-W10.md` returns 5 lines, `grep -n 'PACKET-FIRST'` 4, `grep -n 'CH2-02'` 4, printed as `→ :68`, `→ :503`, `→ :200`. **A numeral that rides must be its command's WHOLE output (LAW D(3)).** The seam itself is sound: all six anchors resolve and all six quoted passages are byte-exact at their true lines. |
| **E-3 · §9 — OPENING-COLUMN CORRECTION (two rows)** | §9's opening column, declared quoted from the FROZEN `RULINGS-5` LAW E(3) table, misquotes it at two of eleven rows: **`KF-W6.md` printed `…0a11`, true tail `a11e`** (an off-by-one slice of the true digest) and **`KF-W8.md` printed `…3b62`, four characters that appear NOWHERE in `126426de…be090429273e2`, true tail `73e2`**. Attribution: **abbreviation transcribed by hand, not measurement** — the underlying digests are right, and the §9 verdict *"All eleven moved — every spec took repair this round"* is TRUE and survives independently of how the openings are abbreviated. **The closing column is exact at all eleven rows and is the arm LAW E(2) arms; the gate, the round's close and the banking of the round-5 repairs are unaffected.** **LAW E(3) gains one clause, effective this round: an abbreviated digest is produced by `cut -c1-8` and `rev \| cut -c1-4 \| rev` over the pasted full value, and is never transcribed by hand.** A hash digest is the one figure in the program that cannot be approximately right. |
| **E-4 · §4 R5-R6 — THE 70 IS SUPERSEDED BY THE CERT'S OWN HEAD AND BY THE BYTES: 73** | The certificate's head (`:7`) and its §4 R5-R6 transcript print two figures for one quantity over bytes the certificate itself hash-sealed. Re-run at this seat, the identical command over the identical bytes: **`grep -oh 'PASS-5/CLOSE-CERT-2\.md' waves/KF-W*.md \| wc -l` → 73**, decomposing per file as **W0 3 · W1 27 · W2 5 · W3 1 · W4 4 · W5 1 · W6 5 · W7 2 · W8 8 · W9 8 · W10 9**. The head's 73 is correct; the transcript's 70 is a pre-final-pass reading re-issued under an "after" label. **The cure banks: the dead path `PASS-5/CLOSE-CERT.md` measures 0 in all eleven, verified independently.** The count was UNDER-stated, never over-stated. |
| **E-5 · §head + §4 R5-R6 — THE BARE-NAME CENSUS, WITH ITS COUNTING RULE** | Both sites read *"The bare-name spelling `CLOSE-CERT-5` (**63 sites**)"*. Measured over the hash-locked bytes: `grep -oh 'CLOSE-CERT-5' waves/KF-W*.md \| wc -l` → **64 occurrences**; `grep -c` summed per file → **37 lines**. **Neither reading yields 63, and the word "sites" names neither.** Nothing rides it — the bare name is declared a round-name and not a path, and resolves for every reader regardless of cardinality — but it is D6-3's shape in the same document: a census figure stated without its counting rule at an instrument whose whole authority is that its figures reproduce. **Corrected form: `CLOSE-CERT-5` — 64 occurrences on 37 lines across the eleven specs; counting rule: one unit = one OCCURRENCE.** The dual spelling itself ends this round: the round-6 instrument's bare name and file name are both `CLOSE-CERT-6`. |
| **E-6 · §7.6 — THE LAW F(2) TERMINUS RE-SWEEP, PERFORMED AND PRINTED (16 of 16)** | §7.6's *"every terminus and every citing sibling re-swept"* was a SINGULAR sweep wearing a universal (LAW G). The sweep, executed here over `KF-W0.md:743`'s own **`1 + 3 + 2 + 6 + 4 = 16`** partition: **(a) BOOKED AT KF.W0 — 1**: `EH-1` ⟨the two repo-qualified letters at `C-14`, the gate at `G-0.10`, the §Sequencing glass-ui FYI row⟩. **(b) RESTORED LIVE — 3**: `EH-4` ⟨EditorShell.vue:45 + MbabbMenu.vue:20⟩ · `EH-5` ⟨:46⟩ · `EH-8` ⟨the shell ribbon cluster :20/:32-40/:36/:44-47⟩ — terminus KF.W6, BOOKED (occurrence counts 18/20/17; three rows, three anchors, all in surviving §Bounds files; frontier anchors byte-exact at `81a56990` at four seats). **(c) DISCHARGED-BY-TWIN — 2**: `EH-9 ≡ SP-10` ⟨W6-J⟩ · `EH-10 ≡ RB-5` ⟨W6-D⟩ — carriers verified by command at KF-W6's bytes, BOOKED. **(d) NO-WAVE-OWNER UNDER G-2's TERMINAL SWEEP — 6**: `EH-2` ⟨kf-EditorHeader.md:41⟩ · `EH-3` ⟨:42⟩ · `EH-12` ⟨:51⟩ · `EH-13` ⟨:52⟩ · `EH-14` ⟨:53⟩ · `EH-15` ⟨:54⟩ — terminus KF.W10 §E `NWO-TERMINAL-SWEEP` G-2, named by `KF-W0.md:745`'s own SHADOW line — **NOT BOOKED AT THE TERMINUS: `grep -oE 'EH-[0-9]+' KF-W10.md` returns EH-1/EH-4/EH-5/EH-8 only. THIS IS THE ROUND'S HARD ESCAPE 2, and this cell is where the round-5 cert should have caught it.** Landed at edit `C-28`. **(e) OUTSIDE R5-1's STRUCK SET, AT THEIR BANKED DISPOSITIONS AND NONE OF THEM W0's — 4**: `EH-6` ⟨:45⟩ · `EH-7` ⟨:46⟩ · `EH-11` ⟨:50⟩ · `EH-16` ⟨:55⟩. **16 of 16 accounted; the ONE unlanded leg was (d)'s terminus booking — six ids — and it is landed at `C-28`.** LAW F(2) gains its enforcement clause: **the sweep's output is diffed row-by-row against the roster it claims to satisfy, and the diff is printed** — summarising an output is the conviction (U6-D). ⟨***PARTITION CORRECTED AT EXECUTION, 2026-08-29: the work order printed this partition as `3 + 2 + 6 + 4 = 16`, which sums to FIFTEEN and drops `EH-1`'s leg, and glossed its four-leg as the record's MOOT-ON-DELETE residue at `kf-EditorHeader.md:106` item 5 — five items (L-M1 · D-11 · D-6/D-14 · D-22 · D-9) that carry no `EH-*` id at all and therefore cannot be a leg of an `EH-*` partition. `KF-W0.md:743` carries `1 + 3 + 2 + 6 + 4 = 16` over the sixteen ids `EH-1 … EH-16`, its leg 5 being the four banked-disposition ids above. The record's five moot items stand where they are — correctly moot, on the record's own residue register — and are not counted here. A sweep row whose arithmetic does not close is the exact conviction this row records.***⟩ |
| **E-7 · §5 — THE LAW E(4) RETIREMENT IS A SWEEP WITH AN ENUMERATION, NOT A CERTIFICATION OF A SAMPLE** | §5 certified the class retired with *"these are its terminal members"*; at final bytes the class is alive in **7 of 11 specs**, enumerated per file with its owning edit: **`KF-W7.md`** — the BACKWARD receipt block `:343` carrying four stale sibling mtimes (`17:02:55` · `16:59:44` · `16:55:55` · `16:59:25`/`10:49:45`) and four false coordinates, under the words *"Verified this round"* → edit `T7-03`. **`KF-W8.md`** — twenty per-seat stamps in the body (`16:55:55` ×10 · `16:59:25` ×5 · `15:39:04` ×4 · `15:51:10` ×1 · `17:02:55` ×2 · `16:58:59`/`16:56:52`/`16:59:44`), **eight of them asserting *"final stage-1 bytes"*** of substrates that have moved twice → edit `T8-04`. **`KF-W10.md`** — the ten-row per-seat substrate table at `:140-146`, every row at a round-4 clock, the `KF-W1.md` row labelled ***"1 (final)"*** of bytes superseded twice, plus a second stamp at the §6.D minting-citation block `:581` → edit `C-33`; and the INBOUND row-2 cell `:529` carrying a sibling mtime **and** two sibling figures → edit `C-34`. **`KF-W5.md`** — seven live sibling clocks (`16:59:44` · `16:59:25` · `16:58:59` · `17:17:02` in the ⟨RECONCILE SEAT⟩ block; `14:06` · `14:22` · `15:32` at §Excluded), under a probe-free negative universal → edit `T5-03`. **`KF-W2.md`** — the retained stamp at `:23` (*"substrate `KF-W3.md`, mtime 2026-08-28 15:43:45"*) plus three round-4 *"FINAL BYTES"* cells → edit `T2-12`. **`KF-W9.md`** — the S-10 block's twelve sibling line numbers and six quoted sibling passages → edits `C-19`/`C-20`. **`KF-W1.md`** — §13's table already struck AS AUTHORITY and preserved as record; **this is the ONE spec that executed LAW E(4) and its form is the proven cure** — struck label + dated-record preservation + stamp authority re-pointed to the certificate, exactly as `KF-W8.md:24` does at its ledger header. **ZERO members of this class are load-bearing**: every anchor those stamps accompany resolves, which is LAW E(4)'s point and why the cure is DELETION, never refreshment. |
| **E-8 · §5 drift row 6 — THE ARTIFACT-OF-RECORD FIGURE IS THE CLASS SIZE, NOT THE CITE COUNT** | §5 row 6 books W3's D-3 as *"CURED — one artifact (`PASS-5/KF-W3-CHECK`, **16 sites**)."* Re-run: `grep -on 'PASS-[0-9]/KF-W3-CHECK\.md' KF-W3.md` → **16 hits on 8 lines, of which 9 are PASS-5, 5 are PASS-3 and 2 are PASS-4**. The **16** is the size of the whole greppable class, not the count of artifact-of-record cites; the seven non-PASS-5 hits are the class-(ii)/(iii) HISTORY cites that W3's own §B.6 discriminator says must **never** be re-pointed. **Corrected form: one artifact of record — `PASS-5/KF-W3-CHECK.md`, 9 cites; 7 further hits are frozen dated-record references and are correctly not re-pointed; greppable class 16 on 8 lines.** The cure itself is sound and W3's §B.6 states the split correctly; the cert's summary is the only place the two numbers are conflated. |
| **E-9 · §1 — THE CROSS-CLASS SWEEP TESTS WHETHER THE NAMED ACTOR BOOKS THE ACT, NOT WHETHER THE TOKEN APPEARS** | §1 books class **(iii)** — *stage-1 ↔ stage-1 and stage-2 → stage-1 (backward)* — at **418 tokens**, verdict *"swept whole; 1 defect found."* The sweep counted TOKENS. It did not test the one property that matters: **whether a wave named as an ACTOR by a sibling books the act at its own end.** `KF-W5.md:66` commissions `W0 runs \`git grep -n 'parseAnimationCSS' -- src demo\` at 81a56990 and prints declaration sites`; `KF-W8.md:256` books `B-16` as *"BOOKED CONDITIONAL — arms if and only if KF.W0's OP-4 locus probe resolves demo-side"*; at `KF-W0.md`'s final bytes `OP-4` → **0**, `B-16` → **0**, `locus` → **0**, `parseAnimationCSS` → **1** (an OUTBOUND row at `:697` that ASSERTS the probe's answer without running it). **That is hard escape 1, and it travelled straight through a 418-token sweep.** **The re-cut, effective round 6: for every sentence in the eleven that names a sibling wave as the ACTOR of an act (`W<n> runs` · `W<n> prints` · `resolves if and only if KF.W<n>` · `→ KF.W<n>` on a commissioning clause), the sweep opens the named sibling and requires a cell, a §Bounds row or a seat that holds the act; a token match is not a landing.** Generalised, R5-10(3)'s close-clock arm catches this shape too — it was scoped to mechanism-D terminus verbs at KF.W10 only. |
| **E-10 · §2 — THE PER-FILE "CHECKED / FIXED" TALLY DOES NOT REACH TWO LIVE W5 COORDINATES** | §2 books `KF-W5.md` at **145 checked · 1 fixed**. Two coordinates in that file were off by one at the time of the sweep and remain off at final bytes: the ⟨RECONCILE SEAT⟩ block's *"the four receipts … re-verified at final bytes, **all resolving**"* prints `:98` and `:123`, and the same pair is re-printed at §0 R-1.4 under a live *"Command, run this seat"* label. Measured: **`grep -n 'The ten rulings this spec owes' waves/KF-W4.md` → 99** (printed 98) and **`grep -n 'Census S-2' waves/KF-W4.md` → 124** (printed 123, one hit, quotation byte-exact). `grep -n ':123\|:98\|Census S-2'` over the certificate → **0 hits** — the sweep never reached them, while cert §5 rows 7 and 8 retire the identical class at two siblings. **Corrected values: `:98` → `:99`, `:123` → `:124`; landed at edit `T5-01`.** |
| **E-11 · LAW E(3) AND THE CERTIFICATE'S NAME — TWO CONSTRUCTION CLAUSES, EFFECTIVE ROUND 6** | **(a) Digest abbreviation** (from E-3 above): abbreviated digests are produced by `cut -c1-8` and `rev \| cut -c1-4 \| rev` over the pasted full value, never transcribed by hand. **(b) One name per certificate**: the round-6 instrument is `PASS-6/CLOSE-CERT-6.md`, bare name `CLOSE-CERT-6`, round-numbered — ending the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual spelling that produced two of this round's census defects (E-4, E-5) by making a single quantity greppable two ways. **(c) The write-order table carries ELEVEN rows or it states, in the same sentence, exactly which specs' per-wave clocks were captured** — a nine-row table under an eleven-spec universal is LAW G's exact shape at the instrument LAW E exists to make unfalsifiable. |

---
---

# CLOSING BLOCK — appended 2026-08-29 by the PASS-7 INSTRUMENTS seat

**What this block is.** Three dated appends discharging `PASS-7/CHECK.md` `P7-3`, `P7-4`, `P7-5` and `P7-7`. **Nothing above this rule is edited.** The §ERRATA table's eleven rows, the head, and the forward reference at `:9` stand exactly as the round-6 BATCH-CERT seat wrote them at 16:55:39; where a row of theirs is corrected, the correction lives **here**, below, under its own date — the same E-3 discipline this certificate applies to `PASS-5/CLOSE-CERT-2.md`.

**Why the append is lawful and not a rewrite.** The head at `:9` declares §9 a **forward reference** — *"the round-6 §9 hash bracket … is the RECONCILE seat's act at round-6 close and is not written by this seat. Only §ERRATA is landed here."* That act never ran. This block performs it, late, and says so. **The forward reference is now satisfied at the path it named.**

---

## §9 — THE ROUND-6 HASH BRACKET

**Disposition, stated first and unambiguously: the content is CARRIED here, not re-pointed elsewhere.** The thirty-four landed citations that read ``PASS-6/CLOSE-CERT-6.md` §9's hash bracket`` / ``§9's hash table`` resolve **as written**, at this path, at this §, with no spec edited and no citation re-aimed. The alternative mitigation `P7-3` offered — re-pointing all thirty-four at `CLOSE-CERT-3` §HASH — was **declined**, because it would require thirty-four edits across five specs to repair a certificate's own missing section, and this seat's writable set contains no spec.

### §9.0 — SCOPE, declared before any figure ⟨read this first⟩

**§9 is the ROUND-6 bracket. It describes the round-6 CLOSING state of the eleven specs and nothing later.** Every figure in this entire closing block — §9, §10, §11 — was measured against **those** bytes: the eleven digests at §9.2, whose identity with the round's sealed state was proved by empty diff **immediately before capture** (§9.3). **The capture window is 2026-08-29 17:36–17:41.**

**This scope is not a hedge; it is the only correct one.** A round-6 erratum re-measures round-6 bytes. `E-2` and `E-5` above are convicted at §11 precisely *because* they printed figures captured before the round-6 files stopped moving; **the cure is not to chase a moving substrate but to name the bytes a figure describes, which is what a hash bracket is for.** §9.2 names them.

**Round-7 writes have begun and this block does not describe them — see §9.6, which is dated and enumerated.** Nothing in §9–§11 should be read as a claim about current bytes.

### §9.1 — Substrate: the ROUND-6 CLOSING stamp

Identical to `CLOSE-CERT-3` §HASH's substrate stamp, re-`stat`ed at this seat within the capture window and confirmed:

`KF-W0.md` 257,985 B 16:49:20 · `KF-W1.md` 253,510 B 16:56:26 · `KF-W2.md` 360,896 B 16:54:19 · `KF-W3.md` 190,569 B 16:55:18 · `KF-W4.md` 244,262 B 16:59:17 · `KF-W5.md` 302,497 B 17:01:41 · `KF-W6.md` 306,972 B 16:51:21 · `KF-W7.md` 259,042 B 17:04:44 · `KF-W8.md` 264,219 B 17:07:18 · `KF-W9.md` 274,478 B 16:58:16 · `KF-W10.md` 261,141 B 17:00:22 — all 2026-08-29.

### §9.2 — The bracket, `shasum -a 256`, whole output (LAW D(3))

```
$ shasum -a 256 KF-W*.md          # run from docs/tranches/X/keyframes/waves/

79f2388886cbab1a1ae7af753767890caf89f40f1392e53cd3f26280d9fa9ad7  KF-W0.md
ee33bf25cb2a77daba206ae2a16e05cb78ada702dd40cebb211300a822b97aa7  KF-W1.md
c3ae7794fa1542cd854078f7d15d332e74c45a659dfffd82fe472b1c2962e296  KF-W10.md
902f12924a681f042cfa7123890faf766761595df639c6f2f8e1d6dedb392d2c  KF-W2.md
c2d648ad05850c113b13a2ffffe1ecf37c8ed6593ba13c753b38c9df43e8db00  KF-W3.md
bd8bc495e07810a04d7bde26c233718b61101a418c6e6670d61912b8bca63521  KF-W4.md
61b9183ff1765806c79df0d9a11423177898a6cb307e410a87ae1076dcea296c  KF-W5.md
6019f5bf907bdb947e54f092eaed864e958d819221719f9f0cf127b1a45effdc  KF-W6.md
c9fb9a565097bb071e54734a6b911c4d14b2fa2c6de5255a9130af50b148f52a  KF-W7.md
706f37cfdf095897df1f205e815bb67d1a4b8f624e24c415bcc59a16e33cc8fe  KF-W8.md
917da19189dc62f32b3afb1826000065aa84a1e973caaea02b0e1131bce6d618  KF-W9.md
```

**Eleven of eleven.** Abbreviations, where a reader needs one, are produced by `cut -c1-8` and `rev | cut -c1-4 | rev` over these values and never transcribed by hand (§ERRATA `E-11(a)`).

### §9.3 — ONE bracket, TWO printings — the identity proved, not asserted

This table is **not a second, independent hash bracket**. It is the **same** bracket as `PASS-6/CLOSE-CERT-3.md` §HASH, re-derived from the same eleven files and **diffed against it at this seat**:

```
⟨run within the capture window, 2026-08-29 17:39⟩
$ shasum -a 256 KF-W*.md | awk '{print $1}' | sort                       > mine
$ grep -oE '^[0-9a-f]{64}' ../conformance/PASS-6/CLOSE-CERT-3.md | sort  > cert3
$ diff mine cert3 ; echo "exit $?"
exit 0
```

**Empty diff, 11 rows against 11 rows** — that is the proof that this seat's figures were captured at the sealed round-6 bytes. `CLOSE-CERT-3` §HASH is the **ORIGIN** — derived first, at the seal seat, 17:19:53, and immutable under E-3. **§9 is its printing at the path the thirty-four citations name.** If the two ever disagree, `CLOSE-CERT-3` §HASH governs and §9 is the defect.

**Re-proved a second way, independent of the specs and therefore stable against §9.6's round-7 writes** — the digests **as written into §9.2 above** diffed against the immutable origin:

```
⟨run 2026-08-29 17:49, after round-7 writes had begun⟩
$ awk '/## §9.2/,/Eleven of eleven/' CLOSE-CERT-6.md | grep -oE '^[0-9a-f]{64}' | sort > written
$ diff written cert3 ; echo "exit $?"
exit 0
```

**Empty diff, 11 against 11.** This second check reads only the two certificates, never the specs, **so it stays true no matter what round 7 writes** — §9.2 is and remains a faithful printing of the round-6 bracket.

This is the exact inverse of the collision `P7-4` convicts (§10 below): **two names over identical, diff-proven content is a synonym; two names over disjoint content is an ambiguity.** Only the second is a defect, and §10 disposes of it.

### §9.4 — The citation census this section answers

```
$ grep -oh 'CLOSE-CERT-6\.md` §9' waves/KF-W*.md | wc -l
      34
$ per file:  KF-W8 27 · KF-W2 4 · KF-W10 2 · KF-W5 1 · KF-W9 0
             KF-W0 0 · KF-W1 0 · KF-W3 0 · KF-W4 0 · KF-W6 0 · KF-W7 0
$ grep -oh 'CLOSE-CERT-6' waves/KF-W*.md | wc -l
      36
$ per file:  KF-W8 27 · KF-W2 4 · KF-W10 2 · KF-W9 2 · KF-W5 1   (the rest 0)
```

**All thirty-four now resolve.** Zeros are printed with the hits, per LAW E(4)'s sweep form. Both censuses are at the §9.2 bytes; **the 34 was re-checked at 17:48 under round-7 writes and held at 34 with an unchanged per-file split** (the bare count did move — §9.6).

**Sub-defect of `P7-3`, corrected here because `CLOSE-CERT-3` is immutable under E-3.** `CLOSE-CERT-3` §5 `S-2` prints the per-file list *"KF-W8 27 · KF-W2 4 · KF-W10 2 · KF-W9 2 · KF-W5 1"* directly beneath its `→ 34` command, where it reads as the §9 breakdown. **It sums to 36 and is the BARE-MENTION census, not the §9 census.** The true §9 breakdown has **`KF-W9` at 0, not 2** — W9's two `CLOSE-CERT-6` mentions are non-`§9` references. `S-2`'s following parenthetical disambiguates it and nothing rides on it, but a census figure seated under a command that did not produce it is the class this round prosecutes, so both censuses are printed above with their commands attached. **`CLOSE-CERT-3` is not edited; this is the correction of record.**

### §9.5 — LAW E(4)'s mandated sweep, per file, ZEROS INCLUDED

`RULINGS-6.md` §LAW E(4) (`TR-01`) mandates that this sweep's **per-file result including the zeros** be printed in the close certificate. It is printed here, run at this seat at final bytes:

```
$ grep -lE '\b1[5-9]:[0-5][0-9]:[0-5][0-9]\b' waves/KF-W*.md   → 8 of 11
  KF-W1 · KF-W2 · KF-W3 · KF-W5 · KF-W7 · KF-W8 · KF-W9 · KF-W10

$ per-file occurrence count, zeros included:
  KF-W0   0     KF-W1  24     KF-W2  19     KF-W3   1
  KF-W4   0     KF-W5  13     KF-W6   0     KF-W7  11
  KF-W8  54     KF-W9   7     KF-W10 34            TOTAL 163
```

**Read exactly, and no further.** At round-5 close the same command returned **SEVEN** of eleven; at round-6 close it returns **EIGHT**. The added file is `KF-W3`, whose **single** hit is `18:50:14` at `:310` — a round-5 **write-order clock**, quoted as a dated record (it is one of `E-1`'s eleven recovered per-wave clocks), not a per-seat substrate stamp. **This regex matches the clock FORM. It does not discriminate a live stamp from a stamp struck-as-authority-and-preserved-as-record, and it does not discriminate either from a quoted dated clock.** The 163 is therefore a **candidate** census and is labelled one; the live-member enumeration is §ERRATA `E-7`'s, which names seven specs and their owning edits individually. **This sweep is reported as this seat's dated reading at the §9.2 bytes and closes no class.**

### §9.6 — THE ROUND-7 MOVE, DISCLOSED ⟨dated 2026-08-29 17:47–17:49⟩

**Between this block's capture window and its final write, seven of the eleven specs moved.** They are moving under **concurrent round-7 repair seats** — a different round, writing to repair `P7-2`, `P7-6` and the rest of the PASS-7 register. This seat opened no spec and wrote none; the moves are other seats'.

| spec | round-6 seal state (§9.1/§9.2) | observed 17:47:50 | |
|---|---|---|---|
| `KF-W1.md` | 253,510 B 16:56:26 | 254,747 B 17:45:24 | **MOVED** |
| `KF-W2.md` | 360,896 B 16:54:19 | 362,133 B 17:47:50 | **MOVED** |
| `KF-W5.md` | 302,497 B 17:01:41 | 302,874 B 17:47:50 | **MOVED** |
| `KF-W7.md` | 259,042 B 17:04:44 | 260,860 B 17:47:50 | **MOVED** |
| `KF-W8.md` | 264,219 B 17:07:18 | 269,378 B 17:47:50 | **MOVED** |
| `KF-W9.md` | 274,478 B 16:58:16 | 279,199 B 17:47:50 | **MOVED** |
| `KF-W10.md` | 261,141 B 17:00:22 | 261,653 B 17:47:50 | **MOVED** |
| `KF-W0` · `KF-W3` · `KF-W4` · `KF-W6` | — | unchanged at seal bytes | held |

**THIS DOES NOT FALSIFY §9, AND THE REASON IS THE WHOLE POINT OF A HASH BRACKET.** §9 certifies the **round-6 closing state**. A round-7 write produces round-7 bytes, which round 7's own bracket must cover. **A round-6 bracket that changed when round 7 wrote would be worthless** — its value is precisely that it is fixed. §9.3's second check proves §9.2 still matches the immutable origin, and that check does not read the specs at all.

**What round-7 movement DOES affect, disclosed rather than left for a later seat to find.** Re-run at **17:48**, after the first round-7 writes:

- **HELD:** the 34 `§9` citations (34, same per-file split) · `LAW G` at 12 · `RULINGS-6` references at 0 · the F(1) form table at all eleven files.
- **MOVED:** bare `CLOSE-CERT-6` mentions **36 → 37** (`KF-W9` 2 → 3) · `CLOSE-CERT-5` **63 occ / 36 lines → 65 occ / 35 lines** (`KF-W9` 10/10 → 12/9).

**Both moved figures are §11.2's, and §11.2 states its scope at the §9.2 bytes.** They are **not** re-stated here to a round-7 value: chasing a substrate that is still being written is the error, not the cure. **Round 7 measures round 7's bytes at round 7's close.** This seat's obligation is to say which bytes it measured and to prove it — §9.2 and §9.3 do that.

---

## §10 — THE TWO-CERTIFICATE NAMING, DECLARED ⟨dated clarification, 2026-08-29⟩

`P7-4` and `CLOSE-CERT-3` `S-3` both stand on one fact: round 6 produced **two certificates under two bare names**, and `E-11(b)` above rules *"one name per certificate, round-numbered."* The two files:

| bare name | path | bytes | mtime | payload |
|---|---|--:|---|---|
| **`CLOSE-CERT-6`** | `PASS-6/CLOSE-CERT-6.md` | 16,060 → this append | 16:55:39 | §ERRATA (eleven dated rows) + this closing block (§9 · §10 · §11) |
| **`CLOSE-CERT-3`** | `PASS-6/CLOSE-CERT-3.md` | 29,505 | 17:19:53 | §1–§6 verification receipts, the 67-probe anchor sweep, findings `S-1`–`S-7`, **§HASH — the bracket of ORIGIN** |

**THE DECLARATION, and it is the disposition of record for the pair:**

> **Round 6 has ONE close certificate in TWO parts, and the parts are named by role, not merely by number.**
> **`PASS-6/CLOSE-CERT-3.md` is THE ROUND-6 SEAL** — the SEAL SEAT's verify-only instrument and the **origin** of the hash bracket. It is third in the sequential series `PASS-4/CLOSE-CERT.md` → `PASS-5/CLOSE-CERT-2.md` → `PASS-6/CLOSE-CERT-3.md`, which is the series its own head declares and the name its seat was ordered to write.
> **`PASS-6/CLOSE-CERT-6.md` is THE ROUND-6 ERRATUM CERT** — the BATCH-CERT seat's corrections-of-record owed to round 5, plus (this block) the §9 bracket the thirty-four citations name.
> **Neither is redundant and neither is superseded.** *"The round-6 certificate"* unqualified is **ambiguous and is not to be used**; a citation names the role or the path.

**`E-11(b)` is satisfied by this declaration, and is NOT satisfied by a rename.** `E-3` bars renaming a dated artifact: both files are dated 2026-08-29 instruments, both are cited by landed edits and by two subsequent check passes, and a rename would break thirty-four citations in one direction or the `CLOSE-CERT-3` citations in the other while destroying the dated record of which seat wrote what. **`E-11(b)`'s purpose is greppability — that one quantity not be reachable two ways — and that purpose is met by binding each name to a distinct role over distinct content, which the table and the declaration above do.** `E-11(b)` is therefore **restated, effective forward**: *one name per certificate ROLE, declared at the head of each; where a round produces more than one certificate, the round's instruments are enumerated in a single declaration and no unqualified phrase is left with two referents.*

**What `P7-4` sharpened, and it is conceded in full.** The dual spelling `E-11(b)` retired (`CLOSE-CERT-2` / `CLOSE-CERT-5`) named **one** file, which declares both spellings and its path of record at its own `:1` and `:3` — benign, a greppability defect. The collision `E-11(b)` **created** names **two different files with disjoint content** — worse in kind. **The rule was violated by the round that wrote it, at the same instrument class, in the harder direction.** That conviction stands as written at `P7-4` and is not diminished by this declaration; what the declaration does is remove the ambiguity going forward, which is the only remedy available to a seat that may not rename.

**Third instrument, named here so the round's set is enumerated and not left to inference:** `PASS-6/RULINGS-6.md` — the round's **standing-instrument layer** (LAWS G · H · I, the E(4)/E(5)/F re-issues, §END `R6-A`/`R6-B`), created 2026-08-29 by the PASS-7 instruments seat, discharging `P7-1`/`S-1`. **Round 6's complete instrument set is exactly three files: `RULINGS-6.md` · `CLOSE-CERT-6.md` · `CLOSE-CERT-3.md`.** No fourth is implied and none exists.

---

## §11 — ERRATA CORRIGENDA: two of the eleven rows above, re-measured at the round-6 closing bytes ⟨dated 2026-08-29⟩

Both rows below were written at **16:55:39**. Four specs were still moving: `KF-W10.md` closed **17:00:22**, `KF-W5.md` **17:01:41**, `KF-W7.md` **17:04:44**, `KF-W8.md` **17:07:18**. **Both rows are figures captured before the files they describe stopped moving — the exact class the rows themselves convict.** Neither row's *argument* fails; both rows' *numerals* do.

### §11.1 — `E-2` CORRIGENDUM ⟨`P7-5`⟩ — the word "exactly" is withdrawn at four of six anchors

`E-2` above certifies: *"Col C is correct and **reproduces exactly at final bytes** (`:22 :68 :513 :547 :206 :197`)."* **Re-measured at this seat against `KF-W10.md` at its round-6 closing bytes — 261,141 B, 17:00:22, the §9.1 stamp and the §9.2 digest `c3ae7794…2e296` — each anchor by its own command, whole output pasted per LAW D(3), the discipline `E-2` itself invokes three sentences later:**

| # | anchor | WHOLE output at final bytes | `E-2` printed | Δ |
|---|---|---|--:|--:|
| A1 | `X.KF.W9` | `22` | `:22` | **0 ✓** |
| A2 | `OP-4` | `68 · 232 · 530 · 537 · 541` | `:68` | **0 ✓** (first of 5) |
| A3 | `PACKET-FIRST` | `68 · 84 · 519 · 537` | `:513` | **+6 ✗** (→ `519`, third of 4) |
| A4 | `D. → KF.W9 (Safari Visual Audit)` | `553` | `:547` | **+6 ✗** |
| A5 | `surface verify` | `212` | `:206` | **+6 ✗** |
| A6 | `CH2-02` | `203 · 214 · 232 · 537` | `:197` | **+6 ✗** (→ `203`, first of 4) |

**FOUR OF SIX ARE WRONG. The word "exactly" in `E-2` is WITHDRAWN.** Cause, visible in the clocks: this certificate closed **16:55:39**; `KF-W10.md`'s last write landed **17:00:22**; `C-28`/`C-29`/`C-33`/`C-34` inserted six lines above four of the six anchors. **`E-2` was written to convict a numeral captured before its file stopped moving, and committed that act in the same row.** Conceded without qualification.

**`E-2`'s ARGUMENT survives, and is re-derived stronger on the corrected values.** The claim is that col B describes no real state while col A → col C shows real drift. With col A ⟨209,923 B baseline⟩ = `:20 :66 :485 :519 :182 :184` and **col C re-measured at final bytes** = `:22 :68 :519 :553 :212 :203`:

```
A1  20 → 22   +2        A2  66 → 68   +2        A3  485 → 519  +34
A4 519 → 553  +34       A5 182 → 212  +30       A6 184 → 203  +19
```

**SIX of six offsets moved — `+2 / +2 / +34 / +34 / +30 / +19`.** The struck col B (`−10 / −10 / −8 / +3`) still describes no state of the file at any clock, so the row's verdict is untouched. **Corrected form of `E-2`'s parenthetical, replacing the withdrawn one:** *col C at final bytes is `:22 :68 :519 :553 :212 :203`, three of the six commands returning multiple lines (`OP-4` 5 · `PACKET-FIRST` 4 · `CH2-02` 4) whose whole outputs are tabled above; the six anchors resolve **6 of 6** and every quoted passage is byte-exact.* **This seat verified that last clause and it holds.**

**Standing consequence, and it is the one that matters.** `KF-W9.md:269-271` — a **landed round-6 edit** — nominates *"`PASS-6/CLOSE-CERT-6.md` §ERRATA E-2"* as *"the verifier of record for their final-bytes offsets."* **That nomination now points at figures corrected in this block rather than at figures that are wrong.** It is repaired at the source, not by re-aiming the spec. **`P7-2` is NOT thereby discharged**: its two other delegations — `KF-W9.md:258` and `:282`, both reading *"`CLOSE-CERT-5` re-verifies"* — remain live, and a round-5 instrument (`PASS-5/CLOSE-CERT-2.md`, 15:24:27) cannot re-verify `KF-W10.md` bytes that stopped moving at 17:00:22. **Those two clauses are spec text, outside this seat's writable set, and stand open.**

### §11.2 — `E-5` CORRIGENDUM ⟨`P7-7`⟩ — the corrected census was itself off by one

`E-5` above corrects *"63 sites"* to *"**64 occurrences on 37 lines**"*. **Re-measured at this seat at the round-6 closing bytes — the §9.2 digests, which is the scope `E-5` itself declares ("measured over the hash-locked bytes"):**

```
$ grep -oh 'CLOSE-CERT-5' waves/KF-W*.md | wc -l
      63
$ grep -c 'CLOSE-CERT-5' waves/KF-W*.md   (summed)
      36
```

**63 occurrences on 36 lines — not 64 on 37.** Off by one in **the same direction as the figure `E-5` struck**, and by the same mechanism as §11.1: `E-5` was written 16:55:39, and `KF-W5.md` (17:01:41), `KF-W7.md` (17:04:44) and `KF-W8.md` (17:07:18) all moved afterwards.

**Per-file, both readings, zeros included — so the counting rule is inspectable and not merely asserted:**

| spec | occurrences | lines |
|---|--:|--:|
| KF-W0 | 3 | 3 |
| KF-W1 | 9 | 8 |
| KF-W2 | 0 | 0 |
| KF-W3 | 2 | 1 |
| KF-W4 | 0 | 0 |
| KF-W5 | **35** | 10 |
| KF-W6 | 0 | 0 |
| KF-W7 | 3 | 3 |
| KF-W8 | 1 | 1 |
| KF-W9 | 10 | 10 |
| KF-W10 | 0 | 0 |
| **TOTAL** | **63** | **36** |

**Corrected form of `E-5`, replacing *"64 occurrences on 37 lines"*:** ***`CLOSE-CERT-5` — 63 occurrences on 36 lines across 7 of the 11 specs; counting rule: one unit = one OCCURRENCE (`grep -oh … | wc -l`); the line reading (`grep -c`, summed) is 36, and the two differ chiefly because `KF-W5` carries 35 occurrences on 10 lines.*** For the companion spelling, measured the same way at the same bytes: **`CLOSE-CERT-2` — 88 occurrences on 72 lines.**

**Nothing rides either figure** — both spellings name one file, `PASS-5/CLOSE-CERT-2.md`, which declares its bare name `CLOSE-CERT-5` at its `:1` and its path of record at its `:3`, so every reader resolves it at either spelling. **`E-5` says this itself and is right.** The correction is booked because `E-5` restated a census **with its counting rule** at an instrument whose whole authority is that its figures reproduce — and it did not reproduce.

**Live-substrate disclosure, and it is the reason the scope sentence above is not decoration.** Re-run at **17:48**, after round-7 seats began writing (§9.6), this same census reads **65 occurrences on 35 lines** — `KF-W9` moved from 10/10 to 12/9 under a concurrent repair. **The corrected form above is NOT amended to 65/35.** `E-5` is a round-6 erratum about round-6 bytes; its correct value is its value at the hash-locked state, **63 on 36**, and that is what is banked. **A figure re-chased to every later write is a figure with no scope — which is the defect `E-2` and `E-5` were convicted for, arriving from the opposite direction.**

---

*PASS-7 INSTRUMENTS SEAT, closing block, 2026-08-29, capture window 17:36–17:41, final write 17:52. Appended only: not one byte above the `CLOSING BLOCK` rule was edited, and `PASS-6/CLOSE-CERT-3.md`, `PASS-6/WORK-ORDER.md`, `PASS-6/UNION.md`, the eleven PASS-6 checks and every PASS-1..PASS-5 artifact are cited and untouched. **This seat opened no spec for writing** — the round-7 movement at §9.6 is other seats' and is disclosed, not caused, here; no gate ran, no product source was opened, and every spec's status stays `planned`. Every figure in this block is the whole output of a command run by this seat at the round-6 closing bytes named at §9.1/§9.2, none inherited — including the five that convict rather than console: `E-2` at four of six anchors, `E-5` at one, `S-2`'s mis-seated per-file list, the LAW E(4) sweep's seven-to-eight, and §9.6's own disclosure that the substrate moved while this block was being written.*

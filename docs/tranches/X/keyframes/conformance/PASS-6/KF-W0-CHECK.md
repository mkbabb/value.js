# KF-W0 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 6)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W0.md` — 755 lines, 253,997 B, mtime **2026-08-29 15:17:38**, **five times repaired** (rounds 1–5 vs `PASS-1/RULINGS.md` … `PASS-5/RULINGS-5.md`).

**Seat**: FRESH. Nothing below is inherited from `PASS-1`…`PASS-5` registers, from any RULINGS file, from `PASS-5/CLOSE-CERT-2.md`, or from the spec's own prose. The census is derived **by record** from the 58 `kf-*.md` bytes plus the sole carry plus the ten sibling specs; every receipt is re-executed at its own anchor; every figure printed beside a command is that command's output at this seat's clock.

**Substrate of record (TREE LAW)**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` (`git rev-parse origin/master`, run this seat, read-only). Local HEAD `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` is **DISQUALIFIED**. `git merge-base HEAD origin/master` → `a59d3a22…`; `git merge-base --is-ancestor` fails in both directions — neither ref an ancestor of the other. All three re-verified this seat.

**Corpus**: the 58 `kf-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58) + the sole carry `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.

**Date**: 2026-08-29.

---

## §0 — LAW E(2), DISCHARGED AS THIS SEAT'S FIRST ACT: **THE ROUND IS HASH-PROVEN**

`RULINGS-5` LAW E(2): *"The pass-6 union seat re-hashes all 11 as its FIRST act; any mismatch is the round's own conviction — the moved file is named, the round did not close, no repair banks."*

**Executed before any other read at this seat.** `shasum -a 256 waves/KF-W*.md`:

```
fd226ecb26ea68e36724fb14ee359a974b3d7d1579ca3398483217f3ec06d09a  KF-W0.md
f6986de7b90c2f009c0d0cfdbea6e59a73e3a56c10cbb9223e93a1ef6f6112f0  KF-W1.md
5f3656e32363e49d4fed431facc32c7a458f45d20dc6a69f427b9d0aa2bd11a4  KF-W2.md
4b68baf35a63357d9af857c2c96e73022ecbdd7a3cecfd2a5374be70cde786f7  KF-W3.md
4028327cb221b6b65f29f6fa7e5e232f1581eb73e6bfca5e2e80c254d5aafe68  KF-W4.md
8baba077d0e6612f7f44888a91d855ebeb2fa7857baf720ed968326bdd4a404d  KF-W5.md
b41e55769f9cea837f8ba579b5e59e0bf2cc94abf46f35e53abb648bd993daaa  KF-W6.md
ed5f0851378cde7175b3523cb8f33d2ebc606cfa36103f6a6d07b811d9986f21  KF-W7.md
c7c1144599f8c8cfbe2533c5a4bb65d36357e4e8fb45918e9c09a9c056fba1c9  KF-W8.md
bea2d9a6c519bf975393c54c2b9b23ccad325afb2ef8721b4157eb02143cc744  KF-W9.md
1c107329458e0ba1ff6762923a5a684391ac32824dc7d7fac42d8e33f4851c50  KF-W10.md
```

**All eleven match `CLOSE-CERT-2.md` §9's closing column exactly. ZERO mismatches. The round-5 write-order is PROVEN and every round-5 repair BANKS.**

This is the first time in six passes that the round's closing artifact survives its own falsification test. Rounds 4 and 5 both died on write-order (U4-A; U5-A's third firing at 19:28–19:30). LAW E's construction — hash, not mtime — worked. **Recorded first and without qualification, because it is the program's single largest structural gain this round.**

Two consequences follow and are used below: (a) the mtimes in `CLOSE-CERT-2.md` §6.1 are not load-bearing and are not audited as claims; (b) the **opening** column of §9 is a quotation from a frozen source and *is* audited — see **D-3**.

---

## §1 — CENSUS UNIT AND METHOD (BY RECORD)

**Unit** = one ⟨record-or-sibling-spec : banked obligation explicitly routed to KF.W0⟩ pair. **BOOKED** = the spec resolves the pair by bytes to a named disposition **and the banked id resolves to that pair**. A pair whose content is carried but whose **banked id is absent, or resolves only to a different limb**, is an **ESCAPE** — the spec's own C-1.G rule, applied to the spec.

**Derivation re-executed this seat at the current bytes:**

```
$ cd docs/tranches/V/megatranche/registry/adjudicated
$ ls kf-*.md | wc -l                                              → 58
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | wc -l                       → 237   (pre-discard lines)
$ grep -l -E 'KF\.W0|KF-W0' kf-*.md | wc -l                       →  50   (pre-discard records)
$ BP='ADJUDICATED, not VERIFIED|agglomeration input|wave sketch|census lane taxonomy|census taxonomy|Status verbs per M-25'
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | grep -cE "$BP"              →  64   (discarded)
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | grep -vE "$BP" | wc -l      → 173   (post-discard lines)
$ per-record survivor count > 0                                   →  44   (post-discard RECORDS)
$ records the discard drops whole                                 →   6
    kf-AnimationVisualizer · kf-CSSCodeEditor · kf-KeyframeCardList
    kf-KeyframeTimeline · kf-TimelineHoverPreview · kf-TransportDock
```

**The round-3/4/5 sweep reproduces byte-exactly at a fifth clock** — 237/50 · 64 · 173/44 · and the six dropped-whole records are the six the spec names.

**Counting rule for the routed total, stated AT the receipt (R5-11).** This seat adopts PASS-5's reproducible base of **100** and declares its two deltas rather than re-deriving a fresh denominator that would not be comparable:

| component | n | ground |
|---|--:|---|
| PASS-5's routed base | 100 | reproduces at this seat; the corpus is unmoved (no round-5 registry addendum was written — RULINGS-5 §END: *the kf-EditorHeader record "needed and receives NO addendum"*) |
| **+ the EH family, un-bundled** | **+15** | PASS-5 counted the EH bundle as ONE pair (its E-3) because the partition was stated nowhere. Round 5 enumerates **16** ids with 16 dispositions, so 15 further ⟨record : id⟩ pairs are now individually routed and individually resolvable |
| **+ the W5 `OP-4` locus probe** | **+1** | a sibling-declared obligation naming KF.W0 as the actor, enumerated for the first time at this seat (PASS-5 missed it too) |
| **routed total** | **116** | |

**Result: routed 116 · booked 115 · escaped 1.**

**The corpus-side and carry-side membership sweeps are CLEAN — this is the headline census fact.** Executed by command over every KF.W0-routing line, extracting each banked id and testing it against the spec's bytes:

```
$ for f in kf-*.md; do <post-discard KF.W0 lines> | <extract banked ids> |
      while read id; do grep -qF "$id" KF-W0.md || echo "MISS $f $id"; done; done
  → 0 misses   (id shapes swept: KF-XX-nn · X-nn · X·X-nn · EH-nn · MISS-xx · KAD-nn · OD-nn)
$ same sweep over carry/KF-W6-CARRY.md (7 routing lines)
  → 0 misses
```

**Every banked id the 58 records and the sole carry route to KF.W0 resolves in `KF-W0.md`.** For the first time in six passes the corpus half of the census has no escape at all. The one escape this seat finds is **not** in the corpus — it is a **sibling-declared** obligation (§2, D-1), which is precisely where LAW F and R5-10(3) predicted the escape frontier would move.

**The §Carry denominator reproduces exactly**, re-counted this seat by table-row scan over the bytes (rule: one row per `|`-row per sub-table, header + separator rows excluded):

```
main table (C-1..C-22)   22        C-1.F  13        C-1.G  22        C-1.R   7        C-17.R  15
22 + 13 + 22 + 7 + 15 = 79    ← matches the spec's stated 79 and its stated +1 delta against round 4's 78
```

---

## §2 — DEFECTS

### D-1 · MAJOR — **THE ONE ESCAPE**: KF.W5's `OP-4` locus probe is assigned to KF.W0 by name from two sibling ends, and reaches no cell in this file

**The obligation, quoted by command from both declaring ends.**

⟨`KF-W5.md:66`, its own open-questions table⟩ — the fourth column *is* the resolution mechanism and it names this wave as the actor:

> *"| **OP-4** | **The `parseAnimationCSS` LOCUS.** … | **UNRESOLVED.** | **W0 runs `git grep -n 'parseAnimationCSS' -- src demo` at `81a56990` and prints declaration sites.** Both dispositions pre-declared (§Carry B-16) so the row cannot be lost either way. |"*

⟨`KF-W8.md:256`, §Carry⟩ — a live booking conditioned on this wave's output:

> *"| **B-16 shadow-name** — inbound from KF.W5, R-19c(iv) | **BOOKED CONDITIONAL** — arms **if and only if KF.W0's `OP-4` locus probe resolves demo-side** | …"*

**Byte receipt against `KF-W0.md` at its final round-5 bytes:**

```
$ grep -c 'OP-4'              KF-W0.md   → 0
$ grep -c 'B-16'              KF-W0.md   → 0
$ grep -ci 'locus'            KF-W0.md   → 0
$ grep -c 'parseAnimationCSS' KF-W0.md   → 1
```

The single hit is **§Sequencing `:697`**, an OUTBOUND row to the keyframes.js engine lane:

> *"Preserved halves of rows whose substrate faces land here: … the `parseAnimationCSS.ts` per-stop timing-function drop (R3-forwarded, lane-library §4.6 seam). **Engine work, not substrate work — named so the reconciliation does not absorb them.**"*

**Why this is an escape and not carriage.** That row routes the **cure** and, in doing so, *asserts the answer to the probe* — it declares the locus engine-side (`src/`). But W5 books the locus as **UNRESOLVED** and commissions a **measurement** from this wave; W8's B-16 arms or does not arm on that measurement's output. This file therefore:

1. **spends the probe's conclusion without running the probe** — no `git grep -n 'parseAnimationCSS' -- src demo` is pasted anywhere, in the wave whose entire method is *command + literal output pasted and dated* (§Scope 5);
2. **names neither `OP-4` nor `B-16`**, so a seat executing W0 has no handle, and a seat auditing W8's conditional cannot resolve it from the wave it points at;
3. **has no landing surface** — §Bounds' `W0/COUNTS-2026-XX-XX.md` row is scoped *"SCH-1..7 + X-2, command + literal output per row"*, and `OP-4` is neither; **§Agent Units** has five seats (OP-1 · `.b` · `.c` · `.d` · `.e`) and none of them owns it. **An act with no bounds row and no seat is an act the wave cannot perform** — axis (4)'s own test, failed on a live cross-wave dependency.

**This is exactly the class the wave defines for itself.** C-1.G's charter: *"the fold ids whose CONTENT C-1 already carried and whose ID was absent by bytes … indexing is not curing; it is what makes the fold's closure checkable."* Here the content is not merely un-indexed — it is *contradicted in direction* by an unreceipted assertion, which is one step worse than the `L-M-9` miss round 5 just cured.

**Why it survived five rounds and the round-5 sweep.** `CLOSE-CERT-2.md` §1 books class **(iii)** — *stage-1 ↔ stage-1 and stage-2 → stage-1 (backward)* — at **418 tokens**, verdict *"swept whole; 1 defect found."* `KF-W5 → KF-W0` is class (i)-adjacent and `KF-W8 → KF-W0` is squarely class (iii). The sweep counted the tokens; it did not test whether the **named actor books the act**. R5-10(3)'s CLOSE-CLOCK arm was written for exactly this shape (*"the enumeration source is now the bytes, not the roster"*) but was scoped to **mechanism-D terminus verbs at KF.W10 only**. Generalised, it catches this.

**Cure**: (1) a §Carry or §Scope row — `OP-4 ⟨KF-W5 §Open Questions, the parseAnimationCSS LOCUS row⟩: this wave runs the probe and prints declaration sites; both dispositions pre-declared at KF-W5 §Carry Arm B row B-16; W0 measures and does not decide the home` (anchor-only per LAW E(4)); (2) the probe added to unit **`.d`**'s charter and its output to the **`COUNTS-*.md`** §Bounds row's scope clause; (3) §Sequencing `:697`'s engine-lane assertion re-cut to *route the cure* without *pre-empting the locus*, or re-stated as the probe's expected result pending the paste.

---

### D-2 · MAJOR — C-1.R row 7's **membership receipt**, labelled *"re-run this seat"*, does not reproduce at the tables it cites

The `L-M-9` row added at repair round 5 (D-3) states, in the cell that justifies the booking:

> *"**Membership receipt, re-run this seat**: thirty-four records fold F-1 to KF.W0 under a banked id; **thirty-three carry a C-1.F row (13) or a C-1.G row (22 — `kf-SequencePlayhead` twice)**; `kf-KeyframesStringControls` was **the single omission**."*

**Counted at the bytes this seat**, by row-subject (the ⟨record : line⟩ in each row's *Banked id* cell — never by rider text, which names further records inside the cells):

```
C-1.F  13 rows → 13 distinct row-subjects
  kf-DemoGlobalChrome · kf-EasingTarget · kf-EasingSidebar · kf-EasingScene · kf-KeyframesEditor
  kf-TimingFunctionPanel · kf-AnimatedText · kf-ChannelOptions · kf-ChromeDock · kf-CSSPasteDialog
  kf-KeyframesAddDialog · kf-KeyframeCardList · kf-App.skeleton

C-1.G  22 rows → 21 distinct row-subjects  (kf-SequencePlayhead at rows 14 and 15)

$ comm -12 <(C-1.F subjects) <(C-1.G subjects)   → ∅   (the two tables are DISJOINT)

13 + 21 = 34 records carry a row      ← the receipt says 33
34 carriers + 1 stated omission = 35  ← the receipt's fold denominator says 34
```

**Both figures in the sentence are one short**, and they are short in a way that is internally checkable: the row prints its own operands (`13` and `22`) and its own duplicate (`kf-SequencePlayhead` twice) one clause away from the total that does not close over them.

**Why it bites.** This is `PASS-5` **D-2** — *"the R4-10(1) LAW-A scope receipt's own verb tally does not sum to its own row count"* — recurring **in the row written to close a different D-3 in the same round**, under **R5-11**, the ruling that exists to end it: *"a receipt whose own arithmetic does not reproduce is a defect REGARDLESS of the scope's truth … the pass-6 checks test receipt arithmetic before testing scope."* It is also a **provenance failure**: the sentence is inherited verbatim from `PASS-5/KF-W0-CHECK.md` §1 E-1, where the same 33/34 appeared, while carrying the label *"re-run this seat."* A figure that is copied and stamped as measured is the short-transcript class in its purest form.

**What is NOT damaged, verified rather than assumed.** The row's **conclusion holds at the bytes**: `kf-KeyframesStringControls` appears as a row-subject in **neither** table, so it genuinely was the single omission and the booking is correct. The cure is right; only its arithmetic is false — the same shape as pass 5's D-2, which is why it is MAJOR and not BLOCKER.

**Cure**: restate as *"**34 records** carry a C-1.F row (13 subjects) or a C-1.G row (22 rows / 21 subjects, `kf-SequencePlayhead` twice); with `kf-KeyframesStringControls` the fold set is **35**"*, with the counting rule (*one record per row-SUBJECT — the ⟨record : line⟩ of the Banked id cell; rider text inside a cell names further records and is not counted*) and the disjointness receipt (`comm -12` → ∅) pasted beside it.

---

### D-3 · MAJOR — `PASS-5/CLOSE-CERT-2.md` §9's **opening** hash column is falsified at 2 of 11 rows, one of them not a substring of the hash it claims to quote

Reached from this wave's seat because **§Repair Round 4's LAW C paragraph** — this file's sole `CLOSE-CERT` citation, re-pointed at round 5 under D-1 — conditions this file's own round-closure on that instrument: *"**Without that certification the round did not close**, and no sentence in this file is written on its behalf."* Auditing the cert is therefore this wave's business, exactly as PASS-5's D-1 was.

§9 prints an **opening** column *"quoted from `RULINGS-5` LAW E(3)'s hash-bracketed table (an immutable frozen source, not a per-seat stamp)"* beside the closing column. Re-derived this seat by parsing both files and comparing:

| spec | §9 prints (opening) | LAW E(3)'s true value | verdict |
|---|---|---|:--:|
| KF-W6 | `83509bf9…**0a11**` | `83509bf9…**a11e**` | **FALSE** — off-by-one slice; `0a11` is a substring, but not the tail |
| KF-W8 | `126426de…**3b62**` | `126426de…**73e2**` | **FALSE** — `3b62` **is not a substring of the hash at all** |

The other nine rows verify head-and-tail exactly.

**Why it bites rather than being bookkeeping.** §9 is **LAW E's centrepiece** — the instrument minted this round to replace an mtime table precisely because *"an mtime table is a claim about the past; a hash table is a challenge to the future."* The cert's own §3 states the standard it is judged by: *"**a certification's exhibits do not get to be approximately true.**"* And R5-11 makes receipt arithmetic the **first** thing a pass-6 check tests. A hash digest is the one figure in the program that cannot be approximately right: four hex characters either are the tail of a 64-character string or they are not, and for KF-W8 the printed characters appear nowhere in it.

**What is NOT damaged, and it matters.** The **closing** column — the half that is the challenge to the future, and the half LAW E(2) makes this seat re-run — is **correct at all eleven rows** (§0). §9's conclusion, *"All eleven moved — every spec took repair this round"*, is **true**, and survives independently: the closing hashes I derived differ from the openings regardless of how the openings are abbreviated. **The round still banks.** This is a falsified exhibit inside a sound proof, which is why it is MAJOR and not BLOCKER — but it is the fourth consecutive round in which the round's own closing artifact carries a figure its source refutes, and the class is supposed to be dead.

**Cure** (owner: the round-6 RECONCILE seat, since `PASS-5/CLOSE-CERT-2.md` is now a prior-pass artifact and immutable under E-3): CLOSE-CERT-6 carries a dated *"OPENING-COLUMN CORRECTION"* line naming both rows with their true digests and attributing the slip to abbreviation rather than to measurement; and LAW E(3) gains one clause — *"abbreviated digests are produced by `cut -c1-8` and `rev | cut -c1-4 | rev` over the pasted full value, never transcribed by hand."*

---

### D-4 · MINOR — the §Carry preamble's dependent cell re-issues **78** under a denominator the same paragraph re-counts to **79**

`§Carry`, the preamble that states the closure denominator, re-counted this round to **79** with its rule and its +1 delta declared (*"the single round-5 addition is C-1.R row 7"*) — all of which **reproduces exactly** (§1). Twenty lines later in the same paragraph:

> *"**All seven are cured at this round's D-1..D-6** and the two new rows are counted in **the 78 above**."*

**There is no 78 above.** The figure above now reads **79**; `78` is round 4's, correct for round 4's tables and left standing under a round-5 re-count. The sentence is a round-4 dependent cell that the round-5 altitude sweep did not carry.

**Why it is a defect and not a typo.** It is **LAW D(3)**'s exact arm — *"dependent cells point at the enumeration rather than re-issuing the numeral"* — and it is this file's **own round-1 law**, restated in its own round-5 altitude sweep one section earlier: *"a cure landed in one place and left standing in another is **relocated**, not repaired."* The §Carry preamble is the one paragraph in the file whose job is to hand a closure sweep a denominator; a seat reading it top-to-bottom is handed 79 and then told the additions sit inside 78.

**Cure**: `"…are counted in the denominator above"` — a pointer, not a numeral, per LAW D(3); or `"…in round 4's 78, which this round re-counts to 79"` if the historical figure is wanted.

---

### D-5 · MINOR — the LAW-B citation that discharges §Carry's closure is homed at a **superseded** pass, in the round that retired the freshness class program-wide

`§Carry`'s preamble makes its LAW-B conversion — the sentence that stops the denominator being a closure asserted in the file's own voice — against `PASS-4`:

> *"**This preamble asserts no closure in its own voice (LAW B…)**: the id-keyed carriage of these tables is measured at `docs/tranches/X/keyframes/conformance/**PASS-4**/KF-W0-CHECK.md` §0/§1/§3 (2026-08-28) … **and still found routed 121 · booked 114 · escaped 7**."*

**PASS-5 measured this file at routed 100 · booked 97 · escaped 3** and the preamble does not mention it. The artifact-of-record split across the file, counted this seat:

```
$ grep -oE 'PASS-[0-9]/KF-W0-CHECK\.md' KF-W0.md | sort | uniq -c
   1 PASS-1     1 PASS-2     8 PASS-3     9 PASS-4     3 PASS-5
```

**Five passes cited, PASS-4 dominant, and the load-bearing LAW-B discharge on the oldest-but-one.**

**Why it is a defect.** This is **R5-9 row 1**'s class verbatim — *"freshest-artifact citation split PASS-4/PASS-3 at five sites → one artifact of record, the class made greppable"* — cured this round at **KF-W1** (20 sites), **KF-W3** (16) and **KF-W9** (18) per `CLOSE-CERT-2.md` §5. KF-W0 was never assigned the directive and carries the widest split in the program. The consequence is not cosmetic: a later seat verifying that §Carry's closure is *measured, not asserted* is sent to a census (121/114/7) that a subsequent pass superseded by 21 pairs.

**Cure**: re-point the preamble's LAW-B measurement to `PASS-5/KF-W0-CHECK.md` (and, after this round, to `PASS-6/`), keeping the PASS-3/PASS-4 readings only where they are explicitly dated history — the same one-artifact-of-record form R5-9 row 1 applied at W1, with the class made greppable (`grep -n 'PASS-[0-9]/KF-W0-CHECK'`).

---

## §3 — AXIS VERDICTS

| Axis | Verdict | Ground |
|---|---|---|
| **(1) ID-KEYED CENSUS (by record)** | **DEFECTIVE (marginally) — and the corpus half is CLEAN for the first time** | routed **116** · booked **115** · **escaped 1**. The discard sweep reproduces byte-exactly at a fifth clock (237/50 · 64 · 173/44 · the six dropped-whole). The §Carry denominator reproduces by table-row scan (**22/13/22/7/15 = 79**, with the +1 named as C-1.R row 7). **The by-command membership sweep over all 58 records and the sole carry returns ZERO absent ids** — every banked id routed to KF.W0 resolves in the spec. All three PASS-5 escapes are cured and verified: `L-M-9` at C-1.R row 7 (quoted byte-exact against `kf-KeyframesStringControls.md:86`, with C-1's retired-probe cell record-qualified so the two limbs are grep-separable), `AGG-P1` at C-1's identity chain (both `kf-AmigaScene` citations quoted byte-exact, its `CENSUS-2026-08-03.md` `:9`/`:32`/`:62` home named), and the EH bundle enumerated **whole at sixteen** against a denominator derived **by command** at the bank (`grep -oE '\*\*EH-[0-9]+' kf-EditorHeader.md \| sort -u` → 16, re-run here; partition `1+3+2+6+4 = 16` ✔). **The single escape is not in the corpus** — it is KF.W5's `OP-4`, a sibling-declared act naming this wave as its actor (D-1). The escape frontier has moved off the registry entirely, which is the state the program has been driving at for six rounds. |
| **(2) ANCHOR + SUBJECT-IDENTITY · RECEIPT REALITY** | **HOLDS in the spec; DEFECTIVE at the round's closing artifact and at one new receipt** | **LAW E(2) discharged: all eleven closing hashes match — the round is hash-proven and every repair banks** (§0). Every receipt this seat re-executed in the spec resolves at its anchor and its target mentions its subject. Frontier, re-run read-only at `81a56990`: `rev-list HEAD..origin/master` → **41** · `origin/master..HEAD` → **1** · `status --short` → **252** · `diff --name-only origin/master` → **325** · untracked → **124** ✔ · `scripts/gates/` → **9** files ✔ · `package.json:77` = `"@mkbabb/glass-ui": "7.0.0",` ✔ · `:43` = `"gh-pages": "vite build --mode gh-pages",` ✔ · `EditorShell.vue:116` = `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";` ✔ · `useKeyframesParsing.ts:97` = `() => animation.templateFrames.length,` ✔ · `KeyframeCardList.vue:11` = `:frame-start="startScalar(frames[i].start)"` ✔ · `App.vue:176` = `provide(TABS_EXTERNALLY_MANAGED_KEY, true);` ✔ · `CopyButton.vue:42` = `timingFunction: "easeInBounce",` ✔ (sole `CopyButton.vue` at the frontier — the bare leaf is unambiguous). **The R5-1 restoration's frontier anchors are TRUE**, re-derived here rather than inherited: `EditorShell.vue:45` = `title="Toggle dark mode"`, `:46` = `class="aspect-square w-8 scale-on-hover"`, the shortcuts `Button`'s sizing utility at `:36`, `MbabbMenu.vue:20-21` = the third instance with `w-5`. **All eleven EH banked anchors resolve to their exact ids** at `kf-EditorHeader.md` `:41`–`:55`, and `EH-2`/`EH-3`'s own rows carry **NO-WAVE-OWNER**, so the partition is sound at the bank. The working-tree delta against the round-5 commit is **exactly 3 lines**, all `PASS-5/CLOSE-CERT.md` → `PASS-5/CLOSE-CERT-2.md` (`grep -c` → **3** and **0**), matching the cert's declared *"cert-path ×3"* for this file. **Against all of that**: `CLOSE-CERT-2.md` §9's opening column is falsified at 2 of 11 (D-3), and C-1.R row 7's membership receipt is labelled *re-run* but is inherited and does not reproduce (D-2). |
| **(3) M-25 DEPTH + MECHANISM S (shadows)** | **HOLDS — and the SHADOW line is the best instrument in the file** | **LAW F fully satisfied at the one act this round performs.** The §Excluded SHADOW line names the **re-pointed set of eleven ids each against its OWN banked anchor** (`EH-4 ⟨:43 → EditorShell.vue:45⟩ · EH-5 ⟨:44 → :46⟩ · EH-8 ⟨:47 → the shell cluster⟩ · EH-9 ⟨:48⟩ · EH-10 ⟨:49⟩ · EH-2 ⟨:41⟩ · EH-3 ⟨:42⟩ · EH-12 ⟨:51⟩ · EH-13 ⟨:52⟩ · EH-14 ⟨:53⟩ · EH-15 ⟨:54⟩`), **explicitly never by co-id twin, host file or fold-carrier** (LAW F(3) — the precise error that manufactured the R4-1 BLOCKER), **plus the four members it did NOT re-point** (`EH-6 ⟨:45⟩ · EH-7 ⟨:46⟩ · EH-11 ⟨:50⟩ · EH-16 ⟨:55⟩`) on the stated ground that *"an act that declares a family's routing must show the members it left untouched, or the enumeration is a selection"* — a strictness LAW F does not require and which is the right reading of it. Termini notified anchor-only: KF.W6 · KF.W9 (the guard row R5-1(5) vindicates) · KF.W10 §E `NWO-TERMINAL-SWEEP` · G-2. **Every one of the sixteen anchors re-verified at the bank this seat.** The wave's self-description is honest and checkable — *"one such act this round"*, with D-2/D-6 striking sentences **of this file's own** and D-3/D-4 adding handles that spend no cure — and the bytes agree. Carriage depth elsewhere is unchanged and genuine (C-1.F's thirteen riders verbatim; C-19's 30+2 ledger; C-20 as the named test case with both contradicting cells quoted; the dissent surface intact). **The one M-25 gap is D-1, and it is outside the corpus.** |
| **(4) GATES: reachable GREEN · LAW-A censuses · corpus-derived operands · lawful landing surfaces** | **MIXED — gates provably untouched and sound; ONE act lacks its bounds row** | **The round-5 claim that no gate moved is VERIFIED at the bytes, not taken on the file's word**: the `## Gates` → `## Agent Units` section extracted from the round-4 commit (`60b8b03e`) and the round-5 commit (`fffb9685`) is **174 lines each and byte-identical — `diff` reports 0 changed lines**. Round 5 touched no gate, exactly as it says. **Born-RED**: all ten baselines stand at their round-4 measurements; no gate is green-by-authoring. **LAW-A Census 1 REPRODUCES at the frontier**, re-derived here: the emit tree at `src/animation/compile/emit/` is `backward/{backward,color,index,walk}.ts` (4) + **7 flat** (`css-text` · `densify` · `easing-serialize` · `entry` · `index` · `refusal-probes` · `view-transition`) + `format/` ×3 = 14 — the corrected split the round-4 D-5 cure landed, exact. **LAW-A's access-column receipt, re-summed at its own enumeration** (the round-5 D-2 cure): all 19 §Bounds rows classified by first access token at this seat — `create ×7` (:331–:337) · `modify-append ×6` (:338 :339 :340 :342 :343 :344) · `modify-carve ×1` (:341) · `OWNER'S HAND ×4` (:345–:348) · `regenerate-only ×1` (:349) — **7+6+1+4+1 = 19 ✔, ordinals 1..19 each once, `delete`/`repoint`/`shim`/`move` ×0 ✔**. The round-4 partition that summed to 20 is struck loudly and the corrected one reproduces exactly, coordinates and all. **LAW B**: the round-5 conversion of the §LAW-A declared negative landed — the bare universal is struck, the negative is now *measured* and quoted from an artifact with the enumeration carried **inline beside the sentence** (the G-0.7 form), and the receipt and the negative cite each other in both directions. **Operands are corpus-derived**: the EH denominator by command at the bank (16), the S-10 roster by re-derivation, `D-19` by census, the gate roster over the frontier's 9 files. **What fails is a landing surface**: `OP-4` (D-1) has no §Bounds row and no §Agent Units seat, so the wave is named as an actor for an act it is not equipped to perform. |
| **(5) POSTURE** | **HOLDS — six of six legs, the first unqualified posture pass** | **W4 head** ✔ — §Sequencing `:688` declares KF.W4 *"OUTBOUND — **may not open before this re-anchor**"*. **W3 gated** ✔ — §Sequencing `:696`'s V·π row names the three value.js-side carries as *explicitly NOT SS-13* so no KF wave books them. **O-21** ✔ — `grep -oE '\bO-[0-9]+\b' KF-W0.md` returns **only `O-8` and `O-11`**, the two obligation packets; the wave mints no `O-` id and names no mint site, and `KF-W10.md` carries `O-21` ×7 where R4-11/R5 put it. **§6.D successor register, coherent from both ends** ✔ — W0's §Sequencing packet row `:695` carries the canonical **17** with the partition **KF.W11 ×9 · KF.W12 ×6 · KF.W13 ×2** and the boundary *"homing is SS-1/SS-2's act; this wave supplies their ground"*; `KF-W10.md` carries **§6.D SUCCESSOR-FORMATION REGISTER** (4 heading hits, 21 §6.D references) with the same 9+6+2 cargo; the two do not disagree. **COHESION §0d** ✔ — landed and cited where R5-12 put it, at **KF-W10** (`grep -c '§0d'` → **10**); W0 carries no §0d obligation and correctly asserts none (its sole COHESION cite is §4, a precedent inside C-13). **The EH-4/5/8 restoration with true anchors** ✔ — verified end-to-end at three levels: the ids at the bank (`:43`/`:44`/`:47`), the frontier bytes (`EditorShell.vue:45`/`:46`, the `:36` cluster mate, `MbabbMenu.vue:20-21`), and the reciprocal's form (W0 declares the routing, books none of the three, asserts nothing about their cures, cites KF.W6 anchor-only). **The R4-1 false premise is struck at its source and the record needed no addendum — round 5's central act was making the spec say what the record always said, and at this wave's end it does.** |

---

## §4 — WHAT REPAIR ROUND 5 ACTUALLY FIXED (re-executed, not taken on the spec's word)

All six §END directives were re-run at this seat. **Six of six landed; five landed cleanly.**

- **D-1 (cert citation → CLOSE-CERT-5)** — **closed.** The file's sole `CLOSE-CERT` site re-pointed; `grep -c 'PASS-5/CLOSE-CERT-2.md'` → **3**, `grep -c 'PASS-5/CLOSE-CERT.md'` → **0**. The LAW C paragraph carries R5-2's attribution (the twelfth write, +21 B / +22 s, the round-4 RECONCILE seat's own), banks round 4's repairs, voids its certificate as proof-of-order, and states LAW E's mechanism. `PASS-4/CLOSE-CERT.md` is not edited (4 surviving cites, all historical). **The instrument it now points at is itself defective at 2 of 11 rows (D-3) — but the pointer is right and the round it certifies is hash-proven.**
- **D-2 (the LAW-A verb tally)** — **closed and arithmetically sound**, which is the half that matters. The `7+7+1+4+1 = 20` partition is **struck loudly** (E-3), re-summed to **19** with its counting rule stated and all nineteen row coordinates pasted, keyed by **ordinal** with line numbers declared non-load-bearing. Re-classified cell-by-cell at this seat: **exact**. The negative half re-verifies. **Closed.**
- **D-3 (`L-M-9` → C-1.R row 7)** — **landed, and the home is the better one.** The row quotes `kf-KeyframesStringControls.md:86` byte-exact, separates the MAJOR fold limb from the retired-probe limb, record-qualifies C-1's *"Probes RETIRED here"* cell so the two are grep-separable, declares why C-1.R and not C-1.G (*the id was present and mis-resolving, not absent*), refuses a second row (*"two rows for one fold would be the re-booking C-1.G's charter forbids"*), and states the closure test as *"not how many hits, but how many dispositions."* That reasoning is right and the disambiguation works. **Its membership receipt does not reproduce (D-2 above).**
- **D-4 (`AGG-P1` at C-1)** — **closed.** Named at the SCH-1 cell it decided, as the census-probe id it is; both `kf-AmigaScene` citations (`:6`, `:98`) quoted byte-exact against the bank at this seat, with the nested-quote re-spelling **declared**; its `CENSUS-2026-08-03.md` `:9`/`:32`/`:62` home named; the pre-round `grep -c` → 0 recorded as a **dated observation, explicitly not a standing claim** under LAW E(4). Booked once, with no C-1.R row, on the stated ground that a probe id is not a routing stated differently from its bank. **Closed.**
- **D-5 (the EH §Excluded reciprocal)** — **the strongest repair of the round.** Three new rows, a sixteen-id partition against a **command-derived** denominator, and a SHADOW line that exceeds LAW F's requirement (§3 axis 3). The seat's own first draft is **recorded as having been wrong** — *"this seat's own first draft summed a twelve-id partition and called the family ten; it was caught by re-running the denominator at the bank before the round closed"* — which is the honesty R5-11 was written to produce. **Closed.**
- **D-6 (the declared negative → LAW-B form)** — **closed.** The universal struck, the negative measured and quoted from an artifact, the enumeration carried inline beside the sentence, and a back-pointer added at the §Scope receipt so the two state each other in both directions. **Closed.**

**The file is materially stronger than its prior state, and the improvement is again in the axis that failed four rounds running.** Escapes **10 → 7 → 3 → 1**, and the last one is not a registry escape at all. Two of this pass's three MAJORs are **arithmetic in receipts** rather than lost cures, and the third is in a sibling artifact.

---

## §5 — VERDICT

**DEFECTIVE.**

Three MAJOR defects and two MINOR, over one census escape.

**But the shape of the round has changed, and the change should be recorded before the defects are.** For five rounds this program could not prove its own closure: round 4's certificate was falsified by its author twenty-two seconds later, and round 5's predecessor reconcile pass falsified its own substrate stamp and then ended without laying a certificate at all. LAW E answered with a hash table instead of a clock. **This seat re-hashed all eleven specs as its first act and all eleven match.** The round-5 write-order is proven, every round-5 repair banks, and the drift class that produced sixteen tail rows is — on this evidence — actually dead rather than declared dead.

The census tells the same story. The corpus half is **clean**: every banked id that the 58 records and the sole carry route to KF.W0 resolves in the spec, verified by command, id by id. The three PASS-5 escapes are cured and each cure survives re-derivation at the bank. The EH family — the corpus's sharpest unrouted bundle, and the record the R4-1 BLOCKER was manufactured against — is enumerated whole at sixteen against a denominator derived by command, with a shadow line that names even the members it declined to touch. The gates are provably untouched: byte-identical between the round-4 and round-5 commits.

What survives is what survived last round: **arithmetic inside the instruments built to prevent arithmetic**, plus one act with no seat to perform it.

`13 + 21 = 34` sits one clause away from a receipt that says **33**, in the row written this round to close a fold-index escape, labelled *"re-run this seat"* and in fact copied from the pass that named it (**D-2**). `126426de…3b62` sits in **§9 of the hash table**, quoting four characters that appear nowhere in the digest it claims to abbreviate, inside the one instrument in this program whose entire authority is that a hash cannot be approximately right (**D-3**). And **KF.W5's `OP-4`** — a probe two siblings assign to this wave by name, with `KF-W8`'s `B-16` booking armed or disarmed by its result — reaches no cell, no bounds row and no seat, while §Sequencing quietly asserts the answer the probe was commissioned to measure (**D-1**).

**D-1 is the one that must not survive another round**, because it is the only one that costs a cure rather than a figure: a wave that is named as an actor and does not know it will not act, and `B-16`'s conditional will resolve by default at whichever end reads its own sibling first. It is also cheap — a §Carry row, a clause in unit `.d`, and one line in the `COUNTS` bounds row.

**Ordered for repair**: **D-1** (`OP-4` booked by id, with its bounds row and its seat; §Sequencing's engine-lane assertion re-cut so it routes the cure without pre-empting the locus) · **D-2** (the membership receipt re-derived by row-subject: 34 carriers, 35 folds, with the disjointness receipt pasted) · **D-3** (CLOSE-CERT-6 carries the opening-column correction; LAW E(3) gains the mechanical-abbreviation clause) · **D-4** (`the 78 above` → a pointer, per LAW D(3)) · **D-5** (one artifact of record for §Carry's LAW-B discharge, the class made greppable).

*Register written 2026-08-29. Substrate `81a56990`, read-only; local `8281638c` disqualified and cited nowhere as authority. Census derived by record from the 58 adjudicated bytes, the sole carry, and the ten sibling specs. LAW E(2) discharged as the first act: eleven of eleven hashes match. Every command above was re-run at this seat. Nothing inherited.*

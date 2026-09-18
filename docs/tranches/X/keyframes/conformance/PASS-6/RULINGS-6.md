# X·KF REPAIR ROUND 6 — CROSS-WAVE RULINGS (RULINGS-6)

**Bare name**: `RULINGS-6`. **Path of record**: `docs/tranches/X/keyframes/conformance/PASS-6/RULINGS-6.md`.
**Seat**: PASS-7 INSTRUMENTS seat, 2026-08-29 — landing the eight standing edits `TR-01`…`TR-08` that `PASS-6/WORK-ORDER.md` §BATCH-TAIL contracted to this file and that the round-6 repair never executed.
**Authority**: `PASS-6/WORK-ORDER.md` §0 + §BATCH-TAIL (`docs/tranches/X/keyframes/conformance/PASS-6/RULINGS-6.md` (new file) — eight standing edits) · `PASS-6/UNION.md` (the 103-row register) · the eleven `PASS-6/KF-W*-CHECK.md` registers · `PASS-5/RULINGS-5.md` (LAWS A–F, binding except where re-issued here) · `PASS-6/CLOSE-CERT-6.md` §ERRATA (eleven dated rows) · `PASS-6/CLOSE-CERT-3.md` §HASH (the round's closing bracket) · `PASS-7/CHECK.md` `P7-1`.

**What this file is.** The round's **standing-instrument layer**: three new laws (**G**, **H**, **I**), three re-issues (**E(4)**, **E(5)**, **F(1)/(2)**), and the two **§END directives** (`R6-A`, `R6-B`) that round 5's rulings artifact named an owner for but never commissioned. Each section below is the work order's contracted block, landed **verbatim** — the text between the rules is the block as `WORK-ORDER.md` §BATCH-TAIL wrote it, not a re-authoring of it.

**What this file is not.** It is **not** a re-opening of round 6. No spec is edited by this seat, no gate runs, no product source is opened, no wave's status moves, and no figure in any prior-pass artifact is rewritten. **E-3 governs**: `PASS-5/CLOSE-CERT-2.md`, `PASS-5/RULINGS-5.md`, the eleven PASS-6 checks, `PASS-6/UNION.md`, `PASS-6/WORK-ORDER.md` and `PASS-6/CLOSE-CERT-3.md` are cited and never edited; corrections owed to them live forward at `PASS-6/CLOSE-CERT-6.md` §ERRATA and §9.

**Provenance, stated because the order is unusual and matters.** A rulings artifact normally precedes its work order. This one does not: the round-6 sequence ran UNION → WORK-ORDER → per-wave repair → `CLOSE-CERT-6` §ERRATA → `CLOSE-CERT-3` (seal), and the eight `TR` edits — the only edits in the contract whose target file did not yet exist — were the eight that did not land. `CLOSE-CERT-3` §5 `S-1` found this and declined to seal on it; `PASS-7/CHECK.md` `P7-1` confirmed it independently at the bytes and graded it BLOCKER. **This file is the landing, not a rewrite.** The 122 per-spec edits that did land are unaffected by it and are not re-litigated here.

**The dangle this closes, measured at this seat (2026-08-29, at final bytes):**

```
$ grep -c 'LAW G' waves/KF-W*.md
waves/KF-W0.md:0    waves/KF-W1.md:0    waves/KF-W10.md:1   waves/KF-W2.md:1
waves/KF-W3.md:0    waves/KF-W4.md:1    waves/KF-W5.md:2    waves/KF-W6.md:2
waves/KF-W7.md:2    waves/KF-W8.md:1    waves/KF-W9.md:2
                                                      TOTAL 12, across 8 of 11 specs

$ grep -c 'RULINGS-6' waves/KF-W*.md
0 in all eleven
```

**Twelve landed strikes across eight specs cite LAW G in current voice. Before this file, LAW G existed in no instrument of record.** The state change, both readings printed:

```
BEFORE  $ grep -rl 'LAW G (the false-universal ban)' docs/tranches/X/
        conformance/PASS-7/CHECK.md          ⟨the check that convicted the dangle⟩
        conformance/PASS-7/CHECK-RETURN.json ⟨its return⟩
        conformance/PASS-6/WORK-ORDER.md     ⟨the contract that specified the law⟩
        conformance/PASS-6/CLOSE-CERT-3.md   ⟨the seal that declined on it⟩
                                             — four files, and NOT ONE of them an instrument

AFTER   $ grep -rl 'LAW G (the false-universal ban)' docs/tranches/X/
        conformance/PASS-7/CHECK.md
        conformance/PASS-7/CHECK-RETURN.json
        conformance/PASS-6/RULINGS-6.md      ← the instrument of record, this file
        conformance/PASS-6/WORK-ORDER.md
        conformance/PASS-6/CLOSE-CERT-3.md
```

**The law exists now, at §LAW G, at the path the round contracted.** The `RULINGS-6` census above is reported as a fact and **not** as a defect this file repairs: **not one of the twelve citations names this file** — they cite *"LAW G"* bare — so the dangle was invisible to a reader of any spec, and **it remains invisible to `grep` from the spec side.** Writing this file does not change that property; it is recorded here so the next round can decide whether the twelve citations should be qualified. **No spec is edited to add the reference** — that would be a spec edit, and this seat's writable set contains no spec.

---

## LAW G · THE FALSE-UNIVERSAL BAN — landed verbatim ⟨`TR-04`⟩

**The rule, as written at `PASS-6/WORK-ORDER.md` §0 and landed here without alteration:**

> **LAW G (the false-universal ban).** A spec may not declare, **in current voice about its own bytes**, a universal quantifier over its own acts — *"every act below…"*, *"all fifteen gates"*, *"the only clocks this file prints"*, *"swept whole"*, *"rebuilt by command over the 58 records"*, *"applied whole, three ways"*, *"this file alone"*. Wherever such a sentence exists it is replaced by **one of exactly two lawful forms, never a third**: **(a)** the **enumerated list** of the covered members, written at the sentence; or **(b)** a **citation of a census artifact** that carries the enumeration, by path + § + date, with the figure quoted and not re-asserted in the spec's voice. A universal that is neither enumerated nor cited is struck by dated note in the same edit that replaces it. **Verification is by FORM, never by token**: a pattern that cannot distinguish an act from a mention (`grep -c 'SHADOW'`) does not verify the law it audits — this is the exact failure that let `D-P6-2` through `CLOSE-CERT-2 §7.6`.

**The law's own worked examples — its instances in this round's register, each executed at its own numbered edit; twelve members, enumerated, no thirteenth implied:**

| # | file | the false universal, verbatim | edit |
|---|---|---|---|
| 1 | KF-W6.md `:10` | *"**every** act below that strikes, restores, re-scopes or re-points carries its **SHADOW line in the same edit**"* | `W6-08` |
| 2 | KF-W6.md `:202` | *"TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS"* | `W6-02` |
| 3 | KF-W9.md `:603` | *"Per LAW F(1) **each act** carries its own SHADOW line AT the act"* | `C-21` |
| 4 | KF-W9.md `:95` | *"**banked aliases are written in full, never discharged by identity**"* | `C-25` |
| 5 | KF-W7.md `:344` | *"**every one of them** now passing the four-part test above"* | `T7-06` |
| 6 | KF-W5.md §END | *"the **only** clocks this file now prints are the frozen CARRY's and its own"* | `T5-03` |
| 7 | KF-W5.md G-CSSIDENT | *"no other spec cites this cell … returns **this file alone**"* | `T5-02` |
| 8 | KF-W4.md §Bounds | *"**every** pasted command in this file was RE-RUN at this seat's write time"* | `T4-03` |
| 9 | KF-W8.md act-coverage | *"**Swept whole**"* over ten of fourteen acts | `T8-08` |
| 10 | KF-W8.md §Gates G7 | *"The template is now applied whole, **three ways**"* | `T8-02` |
| 11 | KF-W2.md §Excluded `:886` | the engaged-record counting rule enumerating 48 under a 7-row table | `T2-01` |
| 12 | KF-W10.md `:122` | *"**No unbooked terminus survives this run**"* | `C-30` |

**The law's teeth are in its last sentence: verification is by FORM, never by token.** `CLOSE-CERT-2 §7.6` certified *"five SHADOW lines present"* at KF-W6 by running `grep -c 'SHADOW'` → 5 — **the word, not the form** — while the file carried ONE line in LAW F(1)'s form against SIX acts in its own ledger. The form-pattern for LAW F(1) is `grep -noE 'SHADOW \(LAW F\(1\)'`; a pattern that cannot distinguish an act from a mention does not verify the law it audits.

**Landing receipt, run at this seat at final bytes** — the form-pattern against the file the law was written from:

```
$ grep -noE 'SHADOW \(LAW F\(1\)' waves/KF-W6.md | wc -l
6
$ grep -c 'SIX acts carry a LAW F(1) verb in this file' waves/KF-W6.md
1
```

**6 against a declared 6.** The instance the law exists to convict is dead at the bytes, and it is dead **by form**, which is the property `grep -c 'SHADOW'` could not have established.

---

## LAW H · THE READING DISCIPLINE — the output-vs-roster diff ⟨`TR-02`, U6-D⟩

**LAW H (the reading discipline).** A pasted command's OUTPUT is compared ROW BY ROW against the roster it is claimed to satisfy, and **the comparison is printed**. Summarising an output is the conviction — at every seat, every time. **The evidence this law is written from**: pass 6's second hard escape travelled through THREE instruments, each individually defensible, and the chain was never read. (i) `KF-W0.md:743`'s LAW F(1) SHADOW line was written, and written CORRECTLY, routing six NO-WAVE-OWNER `EH-*` ids to `KF.W10 §E · G-2`. (ii) `CLOSE-CERT-2` §7.6's LAW F(2) sweep CERTIFIED every terminus re-swept and performed ONE leg — it read `KF-W0.md`'s reciprocal, quoted its arithmetic `3 + 2 + 6 + 4 = 16 ✔`, and did not follow the `6`. (iii) `KF-W10.md:122`'s close-clock arm RAN, **its own output contained `KF-W0.md:743`**, its verdict said *"No unbooked terminus survives this run"*, and its notification roster said FOUR where the bytes carried FIVE. **What R5-10(3) built was a command; what it did not build is the discipline that the command's output is diffed against the roster rather than summarised into a sentence.** Fourth consecutive round of the same shape (PASS-3's R-4 triggers · PASS-4's minted waves · PASS-5's `C-14` · PASS-6's `EH-*` six) — and **the first in which the instrument caught it and the seat read past it.**

**LAW H's own first application, printed here because a law that does not demonstrate itself is a summary.** The roster is `KF-W0.md:743`'s corrected partition `1 + 3 + 2 + 6 + 4 = 16`; the claim under test is that leg (d)'s six ids are booked at their named terminus, `KF-W10.md`. Command and whole output, run at this seat at final bytes:

```
$ grep -oE 'EH-[0-9]+' waves/KF-W10.md | sort -u | tr '\n' ' '
EH-1 EH-11 EH-12 EH-13 EH-14 EH-15 EH-16 EH-2 EH-3 EH-4 EH-5 EH-6 EH-7 EH-8
$ grep -oE 'EH-[0-9]+' waves/KF-W10.md | sort -u | wc -l
      14
```

**The diff, row by row against the six-id roster of leg (d)** — each id counted for itself, not read off the sorted set:

```
EH-2 → 2    EH-3 → 1    EH-12 → 1    EH-13 → 1    EH-14 → 1    EH-15 → 1
```

**6 of 6 present, zero absent.** The pre-repair state of this same command was `EH-1/EH-4/EH-5/EH-8` only — four ids, the state `CLOSE-CERT-6` §ERRATA `E-6` convicted. `C-28` landed the six. **The output is printed whole and diffed; it is not summarised as "the escape is closed."**

**And the diff is read in BOTH directions, which is the half that catches things.** The distinct set is **14**, not the **16** of `E-6`'s partition: `EH-9` and `EH-10` are **absent from `KF-W10.md`** — `grep -c 'EH-9\|EH-10' waves/KF-W10.md` → **0**. That absence is **lawful, and it is not a fifteenth escape**: they are `E-6` leg **(c) DISCHARGED-BY-TWIN** (`EH-9 ≡ SP-10` ⟨W6-J⟩ · `EH-10 ≡ RB-5` ⟨W6-D⟩), whose carriers sit at KF.W6, where the pair measures **23** (`grep -oh 'EH-9\|EH-10' waves/KF-W6.md | wc -l` → 23). An id discharged by its twin is booked at the twin's wave; requiring it at W10 as well would be double-homing. **This paragraph exists because this seat's first draft of this block asserted "sixteen distinct ids" — reasoning from `E-6`'s arithmetic instead of from the command's output — and the LAW I re-run at §RECEIPTS falsified it before it shipped. LAW I's exact conviction, committed inside LAW H's own demonstration and caught by the instrument that follows it.**

---

## LAW I · RECEIPT PROVENANCE — no receipt ships unrun ⟨`TR-03`, U6-E⟩

**LAW I (receipt provenance).** No receipt ships without its own command RE-RUN at the seat's LAST edit — the standing `KF-W3.md:189` rule, promoted program-wide. **A receipt bearing the words "re-run this seat" that was not re-run is a LAW D(1) FALSITY, not an arithmetic slip**, and is graded as one. **The lineage this closes** — R2-5 → R3-11(e) → R4-10(1) → R5-11 → this — and the round-6 evidence that R5-11 detects perfectly and does not yet govern authoring: `KF-W0.md`'s C-1.R row 7 (both figures one short under a "re-run this seat" label, and INHERITED VERBATIM from the prior pass's check) · `KF-W6.md`'s A-5 census (9 composed as 8, no counting rule) · `KF-W7.md`'s phantom `+1` operand and its SHADOW denominator · `KF-W4.md`'s numeric-arm receipt (three exceptions listed after the round corrected four more) · `KF-W1.md`'s class-(b) locus (7 of 15 members outside the stated range) and its six-rows-over-five · `KF-W5.md`'s tally mis-partition · `KF-W9.md`'s alias universal (six co-ids falsify) · `KF-W10.md`'s 12-of-13 transcript (the dropped coordinate MINTED BY THE CERTIFYING SEAT ITSELF, 47 seconds earlier). **The law's own instrument — arithmetic before scope — is precisely how the pass-6 checks convicted this crop.**

**LAW I binds this file.** Every command printed in `RULINGS-6.md` is re-run at §RECEIPTS below, **after** this seat's last edit to this file, and the outputs there are the ones of record. Where a figure above and a figure at §RECEIPTS disagree, §RECEIPTS is correct and the disagreement is the seat's conviction.

---

## LAW E(4), RE-ISSUED WITH ITS SWEEP ⟨`TR-01`, U6-C⟩

**LAW E(4), RE-ISSUED WITH ITS SWEEP (round 6).** The retirement of per-seat substrate stamping is discharged by a SWEEP WITH AN ENUMERATION, never by a certification. The sweep is: `grep -lE '\b1[5-9]:[0-5][0-9]:[0-5][0-9]\b' waves/KF-W*.md`, and **the per-file result — including the ZEROS — is printed in the close certificate**. At round-5 close the command returned SEVEN of eleven (`KF-W1` · `KF-W2` · `KF-W5` · `KF-W7` · `KF-W8` · `KF-W9` · `KF-W10`) while `CLOSE-CERT-2` §5 certified *"16 of 16 disposed. The class is retired … these are its terminal members."* **THE PROVEN CURE FORM, applied at one seat of seven and now mandated at all: the struck-label form at `KF-W8.md:24` — ⟨dated round-N reading; struck as a live claim at round M — stamps live at ⟨the certificate⟩⟩ — which strikes the stamp AS AUTHORITY, preserves it AS RECORD, and re-points the stamp authority to the certificate's hash bracket. The cure is DELETION, never REFRESHMENT**, because every member of this class is non-load-bearing by construction: the anchors the stamps accompany all resolve, which is the whole reason the numerals may go. **Member roster for round 6, with owning edits: `T7-03` · `T8-04` · `C-33` · `C-34` · `T5-03` · `T2-12` · `C-19`/`C-20`.**

**Where the sweep's output is printed.** The block above mandates the close certificate. `CLOSE-CERT-6.md` §9 did not exist when the mandate was written; it exists now, and the sweep's per-file result **including the zeros** is printed there, at `PASS-6/CLOSE-CERT-6.md` §9, dated 2026-08-29, alongside the hash bracket. **It is not restated in this file's voice**, per LAW G(b): the figure is cited by path + § + date and quoted, not re-asserted here.

---

## LAW E(5), RE-CUT — the cross-class sweep on the actor test ⟨`TR-07`⟩

**LAW E(5), RE-CUT (round 6).** The cross-wave sweep's classes are unchanged; its TEST is not. For every sentence in the eleven that names a sibling wave as the ACTOR of an act — `W<n> runs` · `W<n> prints` · `arms if and only if KF.W<n>` · a commissioning `→ KF.W<n>` — **the sweep OPENS the named sibling and requires a cell, a §Bounds row, or a seat that holds the act. A token match is not a landing.** `CLOSE-CERT-2` §1 swept class (iii) at **418 tokens**, verdict *"swept whole; 1 defect found"*, and pass 6's hard escape 1 — `OP-4`, commissioned at `KF-W5.md:66` and conditioned at `KF-W8.md:256`, reaching `grep -c 'OP-4' KF-W0.md` → **0** — travelled straight through it. **R5-10(3)'s close-clock arm was written for exactly this shape and was scoped to mechanism-D terminus verbs at KF.W10 only; generalised as above, it catches this.** Landed at edits `T0-01`/`T0-02`/`T0-03` and erratum `C-09`.

**The actor test, run against its own founding instance at this seat's final bytes** — the sibling is OPENED, not token-matched:

```
$ grep -c 'OP-4'            waves/KF-W0.md    → 5
$ grep -c 'B-16'            waves/KF-W0.md    → 3
$ grep -c 'locus'           waves/KF-W0.md    → 3
$ grep -c 'parseAnimationCSS' waves/KF-W0.md  → 3
```

**Against a pre-repair state of 0 · 0 · 0 · 1.** The commissioned act now has a surface at the wave named as its actor, and the surface is a cell — not a mention. Hard escape 1 is dead at the bytes.

---

## LAW F, RE-ISSUED — verification by form, and the terminus sweep's printed diff ⟨`TR-08`⟩

**LAW F, RE-ISSUED (round 6).** **F(1)** is unchanged in substance and gains its verification pattern: the at-the-act SHADOW line is tested by `grep -noE 'SHADOW \(LAW F\(1\)'` — THE FORM — and the count is diffed against the file's own act ledger, per file, with the diff printed. At round-5 close KF-W6 carried **1 of 6** and KF-W9 **2 of 8**, both under declared universals, while KF-W5 carried **fourteen** (writing one even where nothing moves — *"struck set = ∅ rows — a clock is struck"*) and KF-W8 carried three including two `widened set =` lines for exactly the grant-widening act KF-W6 performed bare: **the standard was available in-round at two siblings, so the failure was reception, not capability.** **F(2)** gains LAW H's printed diff (`TR-02`) and one addition: **the SHADOW ledger's STRUCK list is grepped against the file's own bytes before close — an act declared struck that still occurs is an UNLANDED act, whatever the ledger says** (the mechanism behind PASS-6 KF-W6 D-P6-3, where `:643`'s ledger listed the TransportDock *"four subsumed names"* count as struck while the phrase was live at `:560`).

**F(1)'s per-file diff, printed per the law's own requirement** — the FORM pattern across the eleven, run at this seat at final bytes, **zeros included**:

```
$ for f in waves/KF-W*.md; do echo "$f $(grep -noE 'SHADOW \(LAW F\(1\)' $f | wc -l)"; done
KF-W0.md 0   KF-W1.md 3   KF-W2.md 3   KF-W3.md 0   KF-W4.md 2   KF-W5.md 0
KF-W6.md 6   KF-W7.md 0   KF-W8.md 7   KF-W9.md 2   KF-W10.md 1
```

**The reading, stated as a dated reading and not as a closure.** `KF-W6` returns **6 against its own declared 6** — the round's cure, landed, and passing the form its own law names. `KF-W9` returns **2**, the same figure the block above records at round-5 close against a ledger of 8: **the KF-W9 shortfall this law names is unrepaired in the form pattern at final bytes.** The round's contract carried no `TR` or `C` edit widening KF-W9's F(1) coverage, so it is outside this file's landing scope; it is booked forward here rather than certified away.

**The pattern falsifies itself at KF-W5, and that is the most useful thing on this page.** `TR-08` cites KF-W5 as carrying **fourteen** — the in-round standard, the sibling that proved the capability was available. The mandated pattern returns **0** there. The cause is spelling, not absence:

```
$ grep -oE 'SHADOW \(LAW F[^ ]*' waves/KF-W5.md | sort | uniq -c
   1 SHADOW (LAW F)'
   1 SHADOW (LAW F)**
  13 SHADOW (LAW F)**:

$ for f in waves/KF-W*.md; do echo "$f $(grep -noE 'SHADOW \(LAW F' $f | wc -l)"; done
KF-W0.md 0   KF-W1.md 3   KF-W2.md 3   KF-W3.md 0   KF-W4.md 2   KF-W5.md 15
KF-W6.md 6   KF-W7.md 0   KF-W8.md 7   KF-W9.md 2   KF-W10.md 1
```

**KF-W5 writes `SHADOW (LAW F)`; the mandated pattern demands `SHADOW (LAW F(1)`.** Dropping the `(1)` moves KF-W5 from **0 to 15** and moves **no other file by a single count** — the two tables are identical at all ten other rows. So `TR-08`'s own verification pattern reads **zero** at the exact file `TR-08` holds up as the standard. **A pattern tuned to one file's spelling does not measure the class — LAW G's last sentence, turned back on the instrument that wrote it.**

**And the 15 resolves to TR-08's fourteen by LAW G's own act-vs-mention test.** The three-row output above separates them: **13 `**:` + 1 `**` = 14 ACTS**, and **1 `'` — a mention**, the trailing quote of a pasted `grep` command inside the file's own ledger. **14 acts is exactly the figure `TR-08` cites.** So the block's claim about KF-W5 is TRUE at the bytes and only its *pattern* is wrong. Recorded as a defect of the pattern, not of KF-W5: **KF-W5's fourteen SHADOW lines are real, present, and owed no repair.** The narrow pattern is retained above as contracted and this paragraph is its dated erratum; **the next round either widens the pattern to `SHADOW \(LAW F` (and then applies the act-vs-mention split, or the widening re-imports the very defect LAW G bans) or lands the `(1)` spelling at KF-W5 — one or the other, not both, and not neither.**

The remaining zeros (`KF-W0` · `KF-W3` · `KF-W7`) are printed because the law requires the zeros. **This sweep does not discriminate "no qualifying act" from "qualifying act, no line"** — that discrimination is a per-file ledger read, not a grep, and it is not performed here.

---

## §END · PER-WAVE DIRECTIVE MAP — the two directives round 5 never commissioned

Round 5's rulings artifact assigned owners its §END directive map never told. Those two rulings are the single largest manufacturer of this round's top-tier defects, so they are written here **as commissioned directives, not as ruling-body prose**.

| directive | owning seat | status |
|---|---|---|
| **R6-A** — the re-issue of R5-6(3) | **KF-W6** | executed at `W6-17`; sibling clause corrected at `T8-02` |
| **R6-B** — the citing-sibling half of R5-12(2) | **KF-W3** | executed at `T3-02` and `T3-03` |

### R6-A ⟨`TR-05`⟩

**§END · KF-W6 — DIRECTIVE R6-A (the re-issue of R5-6(3), never commissioned at RULINGS-5 §END and therefore never landed; PASS-6 KF-W8 D-2, HIGH).** KF.W6's `→ KF.W8` cross-edge G7-facts row states, IN KF.W6's OWN VOICE, the WAVES' execution order: the barrel-line strike lands FIRST inside the R4-1 atomic commit; KF.W8 §Gates G7 MEASURES the result afterward and performs no barrel edit (R4-5(c), KF.W6 is the barrel's ONE write owner). **This is an ordering of the waves' EXECUTION, not of the repair round's WRITES — the discrimination PASS-5 D-4 convicted the round-4 sentence for collapsing.** Executed at edit `W6-17`; the sibling's certifying clause is corrected at `T8-02`. **Attribution recorded because it is the round's transferable finding: RULINGS-5's body assigned owner KF-W6 and its §END row listed seven directives without this one — a ruling that names an owner but does not reach the directive map is a ruling that does not exist, and it manufactured a HIGH at a seat that executed everything it was told.**

### R6-B ⟨`TR-06`⟩

**§END · KF-W3 — DIRECTIVE R6-B (the citing-sibling half of R5-12(2), never swept; PASS-6 KF-W3 D-3, MAJOR).** The COHESION ownership vehicle is re-cut at KF-W3's `:311` and `:41` to the ruled form — *"§0e or a successor letter, because §0c and §0d are OCCUPIED"* — because `COHESION.md:170` IS `§0c` and carries the unrelated X·V refinement-fold subject, so a seat resolving KF.W10's ownership gap from W3's routing opens §0c, finds it landed, and reads the precondition satisfied: **verbatim the outcome R5-12(2) exists to prevent.** Executed at edits `T3-02` and `T3-03`. **Attribution: R5-12(2) enumerated FIVE sites, every one inside `KF-W10.md`; W10 executed thoroughly (7 instances of the replacement form) and the ruling never reached the citing sibling. LAW F(2) put that duty on RECONCILE — "re-sweeps every named terminus and every CITING SIBLING" — and W10's own SHADOW ledger booked the re-point at "TEN sites", ten being its own, naming no citing sibling at all.**

**The transferable rule both directives carry, stated once:** a ruling that names an owner in its body but does not reach the §END directive map is a ruling that does not exist. **This file's §END is the map; `R6-A` and `R6-B` are on it.**

---

## §RECEIPTS — every command in this file, RE-RUN at this seat's last edit (LAW I)

Re-run 2026-08-29 at the PASS-7 instruments seat, from `docs/tranches/X/keyframes/`, **after** the last edit to this file. Outputs pasted whole per LAW D(3).

**SCOPE, declared before the figures.** Every command below was run at the **round-6 closing bytes** — the eleven digests at `PASS-6/CLOSE-CERT-6.md` §9.2, identical to `CLOSE-CERT-3` §HASH, proved by empty `diff` immediately before capture. **Capture window: 17:36–17:41.** From **17:44** onward, **seven of the eleven specs began moving under concurrent round-7 repair seats** (`KF-W1` · `KF-W2` · `KF-W5` · `KF-W7` · `KF-W8` · `KF-W9` · `KF-W10`; enumerated with their clocks at `CLOSE-CERT-6` §9.6). **This seat opened no spec** — the movement is other seats' and is disclosed, not caused, here.

**Re-checked at 17:48 against the moving substrate, so the reader knows which figures are robust and which are dated:** `LAW G` **12 — HELD** · `RULINGS-6` references **0 — HELD** · the F(1) form table **HELD at all eleven files** · the widened-pattern table **HELD**. **No figure in this file has been chased to a round-7 value.** A law's instrument is scoped to the round it rules; round 7 measures round 7 at round 7's close.

```
$ grep -oh 'LAW G' waves/KF-W*.md | wc -l
      12
$ grep -c 'LAW G' waves/KF-W*.md
waves/KF-W0.md:0   waves/KF-W1.md:0   waves/KF-W10.md:1  waves/KF-W2.md:1   waves/KF-W3.md:0
waves/KF-W4.md:1   waves/KF-W5.md:2   waves/KF-W6.md:2   waves/KF-W7.md:2   waves/KF-W8.md:1
waves/KF-W9.md:2

$ grep -c 'RULINGS-6' waves/KF-W*.md
waves/KF-W0.md:0   waves/KF-W1.md:0   waves/KF-W10.md:0  waves/KF-W2.md:0   waves/KF-W3.md:0
waves/KF-W4.md:0   waves/KF-W5.md:0   waves/KF-W6.md:0   waves/KF-W7.md:0   waves/KF-W8.md:0
waves/KF-W9.md:0

$ grep -noE 'SHADOW \(LAW F\(1\)' waves/KF-W6.md | wc -l
       6
$ grep -c 'SIX acts carry a LAW F(1) verb in this file' waves/KF-W6.md
1

$ for f in waves/KF-W0.md waves/KF-W1.md waves/KF-W2.md waves/KF-W3.md waves/KF-W4.md \
           waves/KF-W5.md waves/KF-W6.md waves/KF-W7.md waves/KF-W8.md waves/KF-W9.md \
           waves/KF-W10.md; do echo "$f $(grep -noE 'SHADOW \(LAW F\(1\)' $f | wc -l)"; done
KF-W0.md 0   KF-W1.md 3   KF-W2.md 3   KF-W3.md 0   KF-W4.md 2   KF-W5.md 0
KF-W6.md 6   KF-W7.md 0   KF-W8.md 7   KF-W9.md 2   KF-W10.md 1

$ (same loop, pattern widened to 'SHADOW \(LAW F')
KF-W0.md 0   KF-W1.md 3   KF-W2.md 3   KF-W3.md 0   KF-W4.md 2   KF-W5.md 15
KF-W6.md 6   KF-W7.md 0   KF-W8.md 7   KF-W9.md 2   KF-W10.md 1

$ grep -oE 'SHADOW \(LAW F[^ ]*' waves/KF-W5.md | sort | uniq -c
   1 SHADOW (LAW F)'
   1 SHADOW (LAW F)**
  13 SHADOW (LAW F)**:

$ grep -oE 'EH-[0-9]+' waves/KF-W10.md | sort -u | tr '\n' ' '
EH-1 EH-11 EH-12 EH-13 EH-14 EH-15 EH-16 EH-2 EH-3 EH-4 EH-5 EH-6 EH-7 EH-8
$ grep -oE 'EH-[0-9]+' waves/KF-W10.md | sort -u | wc -l
      14
$ grep -c 'EH-9\|EH-10' waves/KF-W10.md
0
$ grep -oh 'EH-9\|EH-10' waves/KF-W6.md | wc -l
      23
$ for i in 2 3 12 13 14 15; do echo "EH-$i $(grep -oh "EH-$i\b" waves/KF-W10.md | wc -l)"; done
EH-2 2   EH-3 1   EH-12 1   EH-13 1   EH-14 1   EH-15 1

$ grep -c 'OP-4' waves/KF-W0.md              → 5
$ grep -c 'B-16' waves/KF-W0.md              → 3
$ grep -c 'locus' waves/KF-W0.md             → 3
$ grep -c 'parseAnimationCSS' waves/KF-W0.md → 3
```

**Counting rule for the two `LAW G` censuses**: `grep -oh … | wc -l` counts **occurrences**; `grep -c` counts **lines**. `LAW G` returns 12 by both, so the two readings coincide and either may be quoted; they are printed together so no reader has to assume it.

**LAW I's own verdict on this file, stated because the law would be a summary otherwise.** This re-run **falsified two figures written earlier in this same file** before they shipped: the `EH-*` distinct set (drafted as **16** from `E-6`'s partition, measured **14**) and the F(1) per-file table (drafted from the round-5 figures quoted inside `TR-08`, measured different at **six of eleven** files). Both are corrected in place above, with the correction and its cause stated at the act. **Neither was inherited knowingly and both were caught by the mechanism this file installs** — which is the only evidence a receipt-provenance law can offer for itself.

---

*PASS-7 INSTRUMENTS SEAT, landing `PASS-6/RULINGS-6.md`, 2026-08-29. This file lands the eight standing edits `TR-01`…`TR-08` contracted at `PASS-6/WORK-ORDER.md` §BATCH-TAIL, verbatim, and adds nothing to their substance. It edits no spec, no check, no union, no work order and no prior-pass artifact; it stamps no wave, runs no gate, opens no product source, and every spec's status stays `planned`. E-3 held throughout. Every figure printed above is the output of a command run by this seat at the round-6 closing bytes named at §RECEIPTS, none inherited — including the four that convict rather than console: `KF-W9`'s F(1) form count at **2 against a ledger of 8**, the **zero** `RULINGS-6` references from the spec side, `TR-08`'s own verification pattern reading **0 at the very file it holds up as the standard**, and the two figures this seat drafted wrong and its own LAW I re-run caught before they shipped.*

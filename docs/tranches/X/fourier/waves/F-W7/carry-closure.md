SERVED MODEL: claude-fable-5-1

# F.W7 — carry closure: the G-F7-8 set-difference against F-W5 §2's `§E` clause register

**Unit** X.F.W7.c (the fresh adjudicator seat, spec §9) · **dated** 2026-09-19 · **gate** G-F7-8 (spec §6) ·
**verdict: ∅ IN BOTH DIRECTIONS — F.W7 BOOKS ZERO AND CITES ALL EIGHT. No triumvirate.**

This file is measurement. It books nothing, cures nothing, designs nothing and writes no sibling byte.
Every figure below was read from settled bytes and double-run; every quotation is the output of the
command beside it (⟨cmd⟩), run under `bash` with the pinned BSD `/usr/bin/grep` (spec §0(A)) and
`LC_ALL=en_US.UTF-8`. Commands carrying a shell pipe are set in fenced blocks so they run **as written** —
no table-escaped pipe stands anywhere in this file.

## 0. Operands, bases, pins

- **Left operand** — the roster spec §6 G-F7-8 names: **E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17**.
- **Right operand** — `waves/F-W5.md` §2's `§E` clause register, **named by its heading and differenced by
  clause id** — never a line window, never a per-wave carry ledger, never a check file (spec §2a's
  reconciliation; R-3; R2-2).
- **Booking operand** — `conformance/CENSUS-CANONICAL.md`, the census of record, ⊕ the frozen 66
  `fr-*.md` (spec §0(D)).
- **Base** `X=/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier` for every `waves/…`,
  `conformance/…`, `contract/…` receipt; `A=/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated`
  for every `fr-*.md` receipt. No receipt mixes two bases.
- **Hash pins at measure time** (`shasum -a 256`, first 12 hex): `waves/F-W5.md` **`26aebcdc7bac`** ·
  `conformance/CENSUS-CANONICAL.md` **`f44362757458`** (character-match to the frozen digest of spec
  §0(C)) · `waves/F-W7.md` **`b5247b852f46`** — *the dated spec body, before this unit's addendum-beside
  was appended*; §5 below re-runs the F.W7-side detector over the settled post-addendum bytes.

## 1. The detector — the spec's own, run as written, on four axes

Spec §6 G-F7-8's detector, **token-bounded and delimiter-free, derived from axis (ii)'s spelling list**:

```sh
cd $X && /usr/bin/grep -ohE '(^|[^A-Za-z0-9])(E1|E3|E5|E7|E8|E10|E13|E17)([^0-9A-Za-z]|$)' waves/F-W5.md | sed -E 's/[^A-Za-z0-9]//g' | sort -u
```

→ `E1` · `E10` · `E13` · `E17` · `E3` · `E5` · `E7` · `E8` (run 1 ≡ run 2) — **the set, as words.**

The register's identity and membership, by the same detector:

```sh
cd $X && /usr/bin/grep -o '^### §E — Provenance, lineage and persistence (the union.s core)' waves/F-W5.md
cd $X && awk '/^### §E/,/^### §F/' waves/F-W5.md | /usr/bin/grep -ohE '(^|[^A-Za-z0-9])(E[0-9]+)([^0-9A-Za-z]|$)' | sed -E 's/[^A-Za-z0-9]//g' | sort -u
```

→ *"### §E — Provenance, lineage and persistence (the union's core)"* · membership `E1` … `E20`, every
ordinal between present.

**The four axes, as this run applied them.**

| axis | the law (spec §6) | how it was discharged here |
|---|---|---|
| **(i) shapes** | an id counts wherever written — table row, id-headed bullet, prose | the detector reads whole lines with no row anchor; every hit outside a table row was walked to its enclosing clause (§4's classification) |
| **(ii) spellings** | `**E13**` · `clause E13` · `§2 clause E13` · `E13 ▲` · `E16 ⊙` — marks never separate an id from itself | the pattern is bounded by *any* non-alphanumeric byte, so bold, mark, slash, apostrophe and parenthesis all bound a token equally |
| **(iii) positions** | first or second in a compound (`C-25 ≡ E13`, `E13`/C-25) | position-free by construction; the compound row heads at §2 are matched whole |
| **(iv) register-qualification** | the test is the **(register, clause-id) PAIR** | every `E<n>` token on the F.W7 side was classified as *this register's clause* or *a homonym* — §4 publishes the homonyms found, and there are two classes of them |

## 2. Direction 1 — F.W7 → F.W5: every rostered id LANDS at a live clause, and F.W7 CITES every one

Each clause head below is the output of an exact-string probe run **inside the register's own heading
range** (`awk '/^### §E — /,/^### §F — /' waves/F-W5.md`, then `/usr/bin/grep -o '<head>'`), so the landing
is register-qualified and not merely somewhere in the file. Each F.W7 citing row is the output of an
exact-string probe over `waves/F-W7.md`.

| id | landing clause in F-W5 §2 `§E` (probe output) | banked-id cell at the landing (probe output) | F.W7's citing row (probe output) | F.W7 books |
|---|---|---|---|---|
| **E1** | *"**E1** Compound per-entity version identity"* | *"**V-β** (lane-crud §V-β, +§7) — value-side"* | §5c *"**V-β ≡ E1**"* · §6 G-F7-4 · §7b lock · §7c DEPENDS row | **0** |
| **E3** | *"**E3** ⊙ Diff-clause participation"* | *"**TA-4** (megatranche COHESION §2 / lane-crud §7 / SS-4 prerequisite)"* | §5c *"**TA-4 ≡ E3** ⊙ ‡"* · §6 G-F7-3 · §7c DEPENDS — OWNER-GATED row | **0** |
| **E5** | *"**E5** Create idempotency and dedupe — ONE clause, TWO entry points ‡"* | the row's id cell opens *"**fr-GalleryDraftsSection B-2**"* and folds FR-GV-1 | §5d *"FR-GV-1 (=L-2/C·C-3) ≡ E5** ‡"* (the row head's tail) · §7c CITED-NOT-BOOKED row | **0** |
| **E7** | *"**E7** PATCH atom coverage + `set_hash` recompute"* | *"**F-β (lane-crud) ⊕ SS-C-1 write leg**"* | §5e *"**SS-C-1 (write leg) ≡ E7 ⊕ SS-C-2 (rides INSIDE E8) ⊕ M-β4 / L·m-6 ≡ E10**"* · §7c CITED-NOT-BOOKED row | **0** |
| **E8** | *"**E8** AnimationSettings — the three-way reconciliation"* | *"**BC-9/C-6/D-20 ⊕ SS-C-2**"* | the same §5e row (SS-C-2 **rides inside** E8 — §7b's lock, kept) · §7c CITED-NOT-BOOKED row | **0** |
| **E10** | *"**E10** Produced-and-unconsumed: ONE disposition"* | *"M-β4 · **fr-EquationView L·m-6** (=C·D-14) · **FR-EMT-20** (cited F1)"* | the same §5e row · §6 G-F7-6 · §7c DEPENDS row | **0** |
| **E13** | *"**E13** Cache identity ⊇ consumed fields ‡"* | *"**fr-ContourSettings B-4 = C-1 ∘ C-25 / R6-8 ⊕ i-7 ⊕ m-18**"* | §5c *"**C-25 ≡ E13**"* · §6 G-F7-5 · §7b lock (led on the banked head `fr-ContourSettings B-4`) · §7c CLAUSE INHERITANCE row | **0** |
| **E17** | *"**E17** Image bounds on write ‡"* | *"**fr-ContourEditorCanvas C-2**"* (record-qualified, the clause's own spelling) | §5d *"**K-3 ⊕ C-2 ≡ E17** ‡"* · §7c CITED-NOT-BOOKED row | **0** |

**Set-difference, direction 1.** ROSTER ∖ REGISTER = **∅** (eight of eight land at a live, named clause).
ROSTER ∖ CITED-BY-F.W7 = **∅** (eight of eight are cited by a carry row **and** a §7c edge row). **No id
is silently dropped.**

**Second-level landing, recorded because F.W5 has since executed** (LEDGER Track C: F.W5 CLOSED
2026-09-17). Each of the eight is also a stated clause of the landed contract —

```sh
cd $X && /usr/bin/grep -oE '^### E(1|3|5|7|8|10|13|17) [^R]{0,90}' contract/J-diff-shape-v2.md
```

→ eight headings, one per rostered id — `### E1 — Compound per-entity version identity` · `### E3 ⊙ —
Diff-clause participation — ` · `### E5 — Create idempotency and dedupe — ONE clause, TWO entry points ‡` ·
`### E7 — PATCH atom coverage and ` + the backticked `set_hash` + ` recompute` · `### E8 — AnimationSettings
— the three-way reconciliation` · `### E10 — Produced-and-unconsumed: ONE disposition` · `### E13 — Cache
identity ⊇ consumed fields ‡` · `### E17 — Image bounds on write ‡` (the negated class stops E3's heading
before its *RULED* tail; that cut is the pattern's, disclosed, and no other heading is cut). **F.W7
authored no byte of that file and books none of its clauses.**

## 3. Direction 2 — F.W5 → F.W7: nothing the register routes here is un-cited, and F.W7 BOOKS ZERO

**3a. What the register sends this way.** The `§E` clauses that name this wave at all, by a
token-bounded probe admitting both spellings (`F.W7` and `F-W7`) and reading each hit line's **leading
token, whatever shape the line has** (row, bullet or prose — axis (i); no row anchor):

```sh
cd $X && awk '/^### §E — /,/^### §F — /' waves/F-W5.md | /usr/bin/grep -E '(^|[^A-Za-z])F[.-]W7([^0-9A-Za-z]|$)' | sed -E 's/^[^A-Za-z0-9]*([A-Za-z0-9]+).*/\1/' | sort -u
```

→ `E16`, **and no other clause** (run 1 ≡ run 2). E16 is **R-4 ≡ E16 ≡ G7**, the one identity F.W7 exists downstream
of; F.W7 cites it at §5a's first row (*"**R-4 ≡ E16 ≡ G7** ⊙"*), at §4, at §6 G-F7-1 and at §7c's SAME
IDENTITY row. **REGISTER-ROWS-NAMING-F.W7 ∖ CITED-BY-F.W7 = ∅.** Outside the register, `F-W5.md` names
this wave at two further places and neither hands it a row: the BC-20 lock bullet (a record of where
BC-20 is *cited*) and §4's `F.W5 → F.W7` edge row, whose own words are ⟨cmd⟩
`/usr/bin/grep -o 'books no registry row of its own' waves/F-W5.md` → *"books no registry row of its own"*.

**3b. What F.W7 mentions beyond the roster, each accounted.** The F.W7-side token set (method at §4):
`E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17` ⊕ `E16` ⊕ `E9 · E11 · E12` ⊕ `E20`.

| non-roster id | every occurrence is… | disposition |
|---|---|---|
| **E16** | the same-identity citation (R-4 ≡ E16 ≡ G7) — the ruling's clause-side home | **cited, never re-booked** (M-25); RULED at COHESION §0j.D **F-TRIE** |
| **E9** | §5e's anti-rename: *"F.W5's E9 owns neither SS-C-1 nor SS-C-2"* + the retired keying | a **denial** — cited to refuse a mis-keying; books nothing |
| **E11** | §5d's anti-rename: *"F.W5's E11 is a DIFFERENT clause"* + the retired keying | a **denial**, likewise |
| **E12** | §5c's and §7c's anti-rename: *"F.W5's E12 is a DIFFERENT clause"* | a **denial**, likewise |
| **E20** | the range endpoint of the register-membership receipt, *"**E1…E20**"* | a **membership statement** about the register; no clause content is claimed |

**MENTIONED ∖ (ROSTER ∪ accounted) = ∅.** No `§E` clause is leaned on by F.W7 without being either
rostered or explicitly disposed above.

**3c. The booking census — B = ∅.**

```sh
cd $X && /usr/bin/grep -o 'The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration' conformance/CENSUS-CANONICAL.md
cd $X && /usr/bin/grep -o '^### F\.W7' conformance/CENSUS-CANONICAL.md        # → no output, exit 1
cd $A && /usr/bin/grep -lE '(^|[^A-Za-z])F\.W7([^0-9A-Za-z-]|$)' fr-*.md      # → no output, exit 1
```

→ *"The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration"* · **no `### F.W7` roster section** in the
census of record (an absence published as an absence) · **no frozen record carries the `F.W7` token**
(66 records, double-run). The landed `contract/` names this wave **only inside
`J-diff-shape-v2.md` §E16** (the F-TRIE ruling's consequence, and the dissent's quote-once discipline) **and
in `OWNER-RULINGS-F.W5.md` rows R2 and R-4**; `operation-register.md` names it nowhere (⟨cmd⟩
`/usr/bin/grep -cE '(^|[^A-Za-z])F[.-]W7([^0-9A-Za-z]|$)' contract/*.md`, every hit read) — **none assigns
F.W7 a cure.** Unit `a`'s
artefact books zero in its own words (`design/R4-enumeration-census.md`, FR-GIG-5 lock row: X-W3's
release/payload split and fourier's shipped compound `_id` *"recorded as **measurements**, each with its
author named and **booked at ZERO**"*).

**Set-difference, direction 2.** REGISTER ∩ BOOKED-BY-F.W7 = **∅**. **No cure is credited to this wave.**

## 4. Axis (iv) at work — the homonyms this run found, and one instrument limit disclosed

**Homonym class 1 — `E13` the mail law.** `waves/F-W7.md` writes `E13` for two different things. The
clause (F-W5 §2's `§E` register) is what G-F7-8 differences. The **owner's mail/inbox edict of
2026-07-17** is also spelled `E13`, and it occurs at two sites in the spec — §2a's INBOX bounds row
(*"**append-only** (E13)"*) and §8's *"An INBOX row"* exclusion (*"E13 is append-only"*):

```sh
cd $X && /usr/bin/grep -oE '.{0,18}(^|[^A-Za-z0-9])E13([^0-9A-Za-z]|$).{0,16}' waves/F-W7.md | /usr/bin/grep -E 'append-only'
```

→ the two spans, and nothing else. **Both are excluded as homonyms, by classification and with their
sites named** — a bare token count would have booked them as two clause citations. Neither exclusion
moves the result (E13 the clause is cited at every site §2 lists).

**Homonym class 2 — the census errata ids.** `E5-14`, `E5-15`, `E6-3`, `E5-1..E5-18` and `E6-1..E6-5` are
**`CENSUS-CANONICAL.md` errata ids** (round 5 / round 6), not clauses. The spec's detector **matches
them** — a hyphen is a lawful right-bound — so on the F.W7 side it reports `E6` although this spec never
cites clause E6:

```sh
cd $X && /usr/bin/grep -ohE '(^|[^A-Za-z0-9])E[0-9]+-[0-9]+' waves/F-W7.md | sed -E 's/^[^E]*//' | sort -u
```

→ `E5-1` · `E5-14` · `E5-15` · `E5-18` · `E6-1` · `E6-3` · `E6-5`. Every `E6` hit and the errata share of
the `E5` hits are this class. **Excluded as homonyms**; `E5` the clause is independently cited (§2).

**Instrument limit, disclosed rather than smoothed — SHARED-DELIMITER BLINDNESS.** The spec's pattern
consumes one bounding byte on each side, and `grep -o` matches do not overlap, so **two ids separated by a
single byte cannot both match**: ⟨cmd⟩ `printf 'E7/E8/E10\n'` piped through the detector → `E7` · `E10` —
**`E8` is not seen in that occurrence.** For **set membership** the limit is harmless wherever an id also
occurs with its own delimiters, which every rostered id does in both files (§1's run returns all eight).
It is **not** harmless in general: on `waves/F-W7.md` the detector **misses `E20`**, whose only occurrence
is *"**E1…E20**"* (the ellipsis is one character and `E1` consumes it). The cross-check that closes it
tokenises instead of pattern-bounding, after neutralising homonym class 2:

```sh
cd $X && sed -E 's/E([0-9]+)-([0-9]+)/ERRATUM\1x\2/g' waves/F-W7.md | tr -cs 'A-Za-z0-9' '\n' | /usr/bin/grep -xE 'E[0-9]+' | sort -u
```

→ `E1` · `E10` · `E11` · `E12` · `E13` · `E16` · `E17` · `E20` · `E3` · `E5` · `E7` · `E8` · `E9`
(run 1 ≡ run 2) — the set §3b disposes, `E20` recovered and the errata `E6` gone. The same tokeniser
over `waves/F-W5.md` whole, and over its `§E` range, returns `E1` … `E20` both times. **The gate's answer
is unchanged by the cross-check — which, by this programme's own R2-9, is exactly the condition that does
not excuse an instrument.** The limit is therefore **recorded here as a dated finding against the
detector's form** and routed to whichever seat next re-cuts G-F7-8's operand; **the dated spec byte is not
patched** (E-3), and this artefact's verdict rests on the two instruments agreeing.

## 5. Re-run over the settled post-addendum bytes (WRITE-THEN-MEASURE)

This unit appends a dated addendum-beside to `waves/F-W7.md` (§13 — the ruling record and the terminal
kill). The addendum cites clause ids, so the F.W7-side operand moved after §0's pin. **Re-run at the
settled bytes** — `waves/F-W7.md` now **`06d89cf13e52`** (double-run), the append proven additive by
⟨cmd⟩ `git diff --numstat -- docs/tranches/X/fourier/waves/F-W7.md` → insertions only, **`0` deletions**:

- the spec's detector over the whole settled file → `E1` · `E10` · `E13` · `E17` · `E3` · `E5` · `E7` ·
  `E8` — **all eight, unchanged**;
- the tokeniser over the whole settled file (run 1 ≡ run 2) → `E1` · `E10` · `E11` · `E12` · `E13` · `E16` ·
  `E17` · `E20` · `E3` · `E5` · `E7` · `E8` · `E9` — **the same set §3b disposes; the addendum introduced
  no new id**;
- the tokeniser over the addendum alone (`awk '/^## 13\. ADDENDUM 2026-09-19/,0'`) → `E1` · `E10` · `E13` ·
  `E16` · `E17` · `E3` · `E8` — every occurrence read and classed: a register-qualified **citation**
  (*"F-W5 §2 clause E1"*, *"clause E13"*, *"clause E17"*, *"clause E8"*, *"clause E10"*, the contract's
  `§E16` / `§E3`), a member of the ruling id `F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1)`, or a pointer to this
  spec's own row (*"§7c's E3 row"*). **None books**; the kill rationale says so in terms (*"F.W7 books none
  of those cures and takes credit for none"*);
- homonym class 1 is unchanged — the mail-law `E13` still stands at exactly the two dated sites §4 names,
  and the addendum spells that law in words (*"the mail/inbox law"*) so it mints no third.

**Both directions re-read at the settled bytes: ∅ · ∅.** This is the second closure pass.

## 6. The non-`§E` companions of the roster, and the locks kept

Spec §6 G-F7-8 rides three further identities that are **not** `§E` clauses; each is cited, none booked:
**ImageUpload roster 12** (= `L:L-M3` / `C:C-6`) and **roster 23** (= `R2-missed-3`; `K-8` TERMINAL ∅) —
homed at **F.W3** by the census of record's file criterion (spec REST-32); **m-15** (= `r2-missed-3`) —
held at the `F.W5-W8` band, its cure at **F-W5 §2's `§C` register, clause C2**, where ⟨cmd⟩
`/usr/bin/grep -o 'm-15 is CROSS-REFERENCED[^*]*' waves/F-W5.md` → *"m-15 is CROSS-REFERENCED, NOT MERGED
with F-4"*. **This artefact keeps that separation: m-15 and F-4 appear here as two identities and are
merged nowhere.**

The other §7b locks, as this artefact honoured them: **K-3** — the upsert arm is dead and is used as
rationale nowhere in this unit's bytes · **C-2** — its witness recipe (*"MOVE A POINT FIRST"*) is cited
by name and not re-performed (no probe of this unit saves a contour) · **E1** — no key was designed over
the identity under repair, because no key was designed · **`fr-ContourSettings B-4`** (= `C-1`, ∘ `C-25` /
`R6-8`; home F-W5 §2 clause E13) — the lock is led on the banked head, the alias never promoted ·
**M-12** — clause taken, nothing booked · **SS-C-2** — rides inside E8, and **no saving, ratio or byte
figure is computed anywhere in this unit** · **BC-20** — stays banked at `fr-BasisCanvas`, never
re-booked · **FR-GIG-5 / F-W5 §0b** — ⟨cmd⟩ `/usr/bin/grep -o 'F.W5 claims credit for none of them —
FR-GIG-5.s lesson adopted as a standing bar' waves/F-W5.md` reproduces; F.W7 adopts the same bar ·
**D-19** — every fourier anchor this unit cites is F.W0's re-grounded substrate, its identity measured
(`git -C $F diff --name-only 8bc7736 HEAD -- api/` → no paths, double-run), never re-resolved.

## 7. Verdict

| direction | difference | result |
|---|---|---|
| **F.W7 → F.W5** | ROSTER ∖ REGISTER · ROSTER ∖ CITED-BY-F.W7 | **∅ · ∅** |
| **F.W5 → F.W7** | REGISTER-ROWS-NAMING-F.W7 ∖ CITED-BY-F.W7 · MENTIONED ∖ (ROSTER ∪ accounted) · REGISTER ∩ BOOKED-BY-F.W7 | **∅ · ∅ · ∅** |

**G-F7-8: ∅ in both directions at the first closure pass, reproduced at the second. F.W7 books ZERO of
E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17 and cites ALL of them, each at a named landing clause. The
triumvirate trigger (spec §3a — *non-empty in either direction after two closure passes*) is not met.**

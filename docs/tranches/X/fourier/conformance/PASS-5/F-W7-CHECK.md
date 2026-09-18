# X·F CONFORMANCE PASS 5 — `F-W7.md` ADVERSARIAL SPEC CHECK (L-18/L-20, fresh seat)

**Seat**: fresh pass-5 adversarial seat, 2026-08-29. **Subject**: `docs/tranches/X/fourier/waves/F-W7.md`
(`shasum -a 256` = `5cc3346db23eee9bce5fb143b66077f92d5fdeb4fb03791a9475a2d2ad9aa387` — **identical to
`PASS-4/CLOSE-CERT-2.md` §8's stamp**, so this check reads the certified bytes and no seat wrote after
the cert; R4-8.2 satisfied at this file).

**Census operand — the only one.** `conformance/CENSUS-CANONICAL.md`
(`a450b8e9f80ebaf29b223b87cbe4fd31f5242147dea0427662bd0696722a99d8`, likewise at the cert's stamp).
Rulings consumed: `PASS-4/RULINGS-4.md` (R4-1…R4-10). Cert consumed: `PASS-4/CLOSE-CERT-2.md`.
Prior runs (never operands): `PASS-1`…`PASS-4`'s `F-W7-CHECK`.

**Toolchain, declared before the first receipt.** Every ⟨cmd⟩ below was executed as
**`/usr/bin/grep` — `grep (BSD grep, GNU compatible) 2.6.0-FreeBSD`** on `Darwin 25.4.0 arm64`, the pinned
binary, invoked by absolute path because this host's interactive shell defines a `grep` **function** that
resolves to `ugrep`. **A receipt run through that wrapper is not run on the pin** (F-W7 §0(A) says so in
terms); every figure in this file is from the absolute-path binary.

**Verdict: DEFECTIVE — 3 HIGH · 3 MEDIUM · 2 MEDIUM against the CANONICAL · 5 LOW.**
The ∅ posture is **TRUE and correctly sourced**; the census axis passes outright. The convictions are
receipt-provenance and holder-citation, not substance — and two of the three HIGHs are *cures this round
declared landed that did not land at all their sites*, which is the class the programme has now convicted
in five consecutive rounds.

---

## §1 CENSUS AXIS — roster booked/cited complete · **PASS**

**F.W7's canonical roster is ZERO.** Mechanically, from the operand and nowhere else:

- ⟨cmd⟩ (base `$V/docs/tranches/X/fourier`) `/usr/bin/grep -o '^### F\.W7' conformance/CENSUS-CANONICAL.md`
  → **no output** (exit 1). §2 carries no `F.W7` roster section at all.
- ⟨cmd⟩ `/usr/bin/grep -o 'The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration' conformance/CENSUS-CANONICAL.md`
  → *"The F.W7 ∅ posture is TRUE AT THE CORPUS, by enumeration"*.
- `RULINGS-4` R4-10's table row: `F-W7 | **0** — ∅ posture TRUE at the corpus (§4.1) | … nothing routes here`.

| quantity | value | basis |
|---|---|---|
| roster size (canonical F.W7 home) | **0** | §2 has no `### F.W7` section; §3's home table lists no F.W7 row |
| booked in the spec | **0** | `bookedCount = 0` declared at §5a's `F-MAIL-∅`; no §5/§6/§7c cell books an F.W7 registry row |
| cited to canonical holder | **0** | nothing to cite — the roster is empty |
| escaped | **0** | an empty roster admits no escape |
| fabricated (booked where the canonical does not home) | **0** registry rows | see §1.2 |

### §1.1 The wave's own derivation still reproduces (belt and braces, not the operand)

Run at the frozen 66 (base `$V/docs/tranches/V/megatranche/registry/adjudicated`):

- ⟨cmd⟩ `/usr/bin/grep -oE '(^|[^A-Za-z])F\.W7([^0-9A-Za-z-]|$)' fr-*.md | wc -l` → **0**
- ⟨cmd⟩ `/usr/bin/grep -o "F\.W7" fr-*.md` → `fr-Tooltip.md:F.W7` ×2
- ⟨cmd⟩ `/usr/bin/grep -c "KF\.W7" fr-Tooltip.md` → **2**; ⟨cmd⟩ `/usr/bin/grep -n "F\.W7" fr-Tooltip.md | /usr/bin/grep -oE '^[0-9]+'` → `10` · `32`

`routedTotal = 0` confirmed a fifth time. **The spec is right to stop deriving it** — §5a's round-4 cure
correctly demotes this to a citation of the canonical.

### §1.2 Fabrication check

No cell of `F-W7.md` books a registry row at F.W7. §5's fifteen carry rows are cited-not-booked at every
site, and the eight F.W5-homed clause ids (`E1 · E3 · E5 · E7 · E8 · E10 · E13 · E17`) are named as
F.W5's throughout. Four ids in §5 are **minted by this wave** (`N-1` · `N-2` · `N-3` ⟨NEW⟩ ·
`F-MAIL-∅` ⟨minted⟩); each is disclosed as a measurement rather than a registry row, and the
`KF-MAIL-∅`/C-14 form it copies is banked at `../keyframes/waves/KF-W1.md` (verified, §2 receipt 25).
Recorded as **D5-13 (LOW)**, not as a fabrication.

### §1.3 Canonical spot-audit — 5 records against the adjudicated bytes

Per the standing law, a canonical error is filed **against the canonical**, never against the spec.

| record | canonical | derived at the bytes | verdict |
|---|---|---|---|
| `fr-Tooltip` (31) | 31 rows | 24 roster (`FR-TT-1..24`, the record's own scoreboard) + 3 killed-claims new heads (`D-6` · `D·S-2` · `D·S-3`) + 3 superlative heads (`L·S-1` · `C·S-1` · `L·S-3`) + 1 UNPROVEN new head (`D-16`) = **31** | **count exact**; one home contested → **D5-8** |
| `fr-PaperSidebar` (43) | 43 rows | 40 roster heads − 1 (`C-M1(a)`/`C-M1(b)` are one left token, §0.1's ONE-HOME rule) + 4 killed-claims new heads (`D-N7` · `D-N6` · `C-B1` · `C-M7`) = **43** | **count exact, homes clean** |
| `fr-BasisCanvas` (79) | `BC-20` booked as a row **and** as an alias of `BC-10` | `:54` banks `BC-20`; `:56` banks `BC-10 / C-9`; the alias claim comes from `:148`'s UNPROVEN citation `7. BC-10/BC-20/M-β2 magnitudes:` | **canonical self-contradiction → D5-7** |
| `fr-ContourSettings` (81) | `i-7` aliases `C-25` · `R6-8`; `B-4` aliases `C-1` only | `:43` = `**B-4 = C-1 (∘ C-25/R6-8 fold) — BLOCKER.**` (first banking line); `:104` = `**i-7 = C-25 / R6-8 — INFO (fold).**` | **first-line inversion → D5-9** |
| `fr-ImageUpload` (64) | `L:L-M3` → **F.W3**; `R2-missed-3` → **F.W3**; `K-8` → **TERMINAL (∅)** | tables and §2 rosters agree; F.W4 line is `R2-missed-4 · D:m-8 · C:C-13 · F6` | **canonical clean — the SPEC is wrong here → D5-1** |

Whole-file arithmetic re-derived this seat (python over the operand): §1's 66 per-record row counts sum to
**4269**; §2's per-record roster entries sum to **4269**; §3's home table sums to **4269**; **zero**
per-record mismatches and **zero** `·`-list miscounts against a declared `(n)`. The canonical's totals are
sound; the three findings above are rule-application errors inside sound arithmetic.

---

## §2 RECEIPT REALITY — 60 ⟨cmd⟩ samples re-run on the pinned BSD binary

`F-W7.md` carries **182** ⟨cmd⟩ markers (⟨cmd⟩ `/usr/bin/grep -o '⟨cmd⟩' F-W7.md | wc -l` → 182 — matching
`CLOSE-CERT-2` §4's figure). **Sixty** were re-run. **Fifty-nine reproduced byte-for-byte. One does not.**

**Portability sweep first (R4-2.1/.2/.5).** No `-P`, no `-coP`, no `\K` in any executable operand
(`\K` occurs once, inside §0(A)'s prohibition sentence). No lookaround: ⟨cmd⟩
`/usr/bin/grep -oE '\(\?[=!<]' F-W7.md` → **no output**. Interval bounds: ⟨cmd⟩
`/usr/bin/grep -oE '\{[0-9]+,[0-9]+\}' F-W7.md | sort -u` → `{0,262}` **only**, and all three occurrences
sit inside strike notes naming the dead form (`:28` · `:67` · `:253`). **Class A clean at this file — with
one exception the round-4 cert missed: the base map, D5-3.**

**Samples that reproduced** (grouped; all outputs matched the published spans exactly):

- **F-W5 spine** — `F.W7 CITES; F.W5 STATES.` · the `E16`/`G7 ⊙` trie-question span · the five-membered
  `**F.W5 → F.W[0-9]+**` set (`F.W1 · F.W2 · F.W6 · F.W7 · F.W8`) · `cite E16 and G7` → **∅ by design** ·
  the "clause id at this end … NO line number at either end" span.
- **G-F7-1's keystone** — ⟨cmd⟩ `/usr/bin/grep -o 'owner rules trie-vs-KISS.\{0,110\}' waves/F-W5.md`
  → **exactly 134 characters**, ending `…the recorded shipped`, the cut left cut. **R4-1.10's cure is
  correctly landed and measurable.** The completing probe `The honest default[^*]*` prints the whole
  sentence with its terminal period.
- **Clause heads** — `E5` · `E9` · `E11` · `E12` · `E13` · `E16` · `E17`, the `E13` banked-id cell, the
  `§E` register head, `G7 ⊙ | trie disposition (R-4)`, `Distinct from B4's liveness predicate`,
  `v2 states ONE disposition…`, `m-15 is CROSS-REFERENCED, NOT MERGED with F-4`, the `SS-4 FLAGS THIS
  RULING INLINE…` span (**451 chars, ending `…the owner ruling precedes design`** — the round-3
  truncation cure holds), `BILATERALITY CORRECTED AT THIS END…`, `guardrail is the INCUMBENT, but it is
  NOT carried on both sides today`, `The correction narrows the premise…`, `FR-GIG-5`'s standing bar,
  the `X-1` row head, `Opens after: F.W0 …`, the `FR-NP-32` canonical-form sentence, the AA-44 third hit,
  `OWNER-RULINGS-F.W5.md` create row, and F-W5's seven `## N.` headings (no Prohibitions section).
- **G-F7-8's detector** (R4-9.7) — token-bounded, delimiter-free → `E1 · E10 · E13 · E17 · E3 · E5 · E7 ·
  E8`; the `§E` range → `E1…E20`. **Both reproduce; the re-cut is sound.**
- **F-W0** — `**F.W7** (the owner-gated trie design)` · the `THE RECIPROCAL, written at repair round 2…`
  head · `F.W0 books **no** F.W7 registry row…` · `### G-11` / `### G-12` headings · the whole
  `single durable artefact: …` row (nine artefacts, no count word).
- **F-W6** — all three exact-string probes (R4-2.2's re-cut of the dead `.{0,262}`), each printing its own
  span, the third running to its true end `moves it`; plus the two §5 exclusion-twin spans. **D-1's cure is
  correctly landed** and the anchor-is-the-window principle executes on the pin.
- **F-W8** — `F.W8 designs no trie.\{0,110\}` → 130 chars cut mid-word at `KISS gu`, cut disclosed ·
  `there is no three-way / DAG / merge.\{0,30\}` → the budget's fragment, disclosed.
- **F-W3** — the `S-6` declared-not-carried tail · the §X exclusion row · the §X.1-v4 heading whole · the
  file criterion · the four-file negatives sentence · `**F.W3 CITES, F.W4 BOOKS.**` · `ContourSettings` in
  a `- **Files**` list.
- **F-W1** — the `TWELVE limbs and stays twelve` span and the `it is the extent every sibling spec cites`
  span, at F-W1's own emphasis.
- **F-W10** — the SS-4-PREREQ dissent span.
- **Corpus (frozen, line cites lawful)** — S-8's method law at `fr-AdminAuditLog.md:126` · C-25's superset
  sentence at `fr-ContourSettings.md:43` · the two `S-3`/`The same idea…` spans · K-3's unformatted upsert
  arm · `MOVE A POINT FIRST` at `fr-ContourEditorCanvas.md:139`.
- **KF-W1** — all three C-14/§8 spans (`a wave with no registry rows gets no manufactured ones` ·
  `The empty column is a finding, not a gap.` · `A wave with no adjudicated rows gets no invented ones. The
  ∅ is a finding ⟨C-14⟩`), reachable at the corrected `../keyframes/waves/KF-W1.md` base. **§0(B)'s ⟨CC⟩
  path cure works.**
- **Canonical** — the four census-of-record spans, the `### F.W4 — **1014 rows**` head, the
  `**fr-ContourEditorCanvas** (40)` cell, the `· \`L-5\` ·` membership. **§8's D-11 re-basing is real.**
- **Value tree** — `/usr/bin/grep -rniE "merkle|flat bag|not a tree" $V/api/src $V/src` → **exactly one
  hit**, `api/src/modules/palette/hash.ts:6`, asserting the opposite word. N-1 holds.
- **Wave set** — `ls waves/` → the eleven `F-W*.md` and nothing else (the spec renders it numerically; the
  claim is membership, not a paste, so this is not a drift).
- **Propagation** — `grep -rl "carried on BOTH sides" waves/` → `F-W7.md` · `F-W8.md`;
  `grep -rl "quoted both trees" waves/` → `F-W6.md` · `F-W7.md`. **The stale-at-two premise is still stale
  at two, in two spellings — §12's measurement holds.**
- **Self-probes** — §1's roster `awk … | grep -ohE 'fr-[A-Za-z]+' | sort -u` → the fifteen names, exactly
  as published; §5's `5 + 1 + 4 + 3 + 2 = 15` and §7c's `17` re-counted mechanically off the tables (5·1·4·3·2
  and 17 rows respectively); §6 carries **11** gate rows, matching §1's "11 conditions".

**The one that does not reproduce** — §2a's `find . -type d`. See **D5-5**.

---

## §3 M-25 DEPTH — locks by banked id, aliases beside heads · **PASS with one LOW**

§7b's ten cure-integrity locks are each keyed to an identity, not to prose: `K-3` · the `C-2` witness
recipe · `E1` · `C-25` · `M-12` · `SS-C-2` · `m-15` · `FR-GIG-5`/F-W5 §0b · `BC-20` · `D-19`. §5's row heads
carry their aliases beside them in the banked spelling (`B-4 = C-1, ∘ C-25 / R6-8 fold, ⊕ i-7` ·
`m-15 (=r2-missed-3) ⊕ ImageUpload roster 12 (=L:L-M3/C:C-6) ⊕ roster 23 (=R2-missed-3, K-8)` ·
`B-2 (=C-C-1 ∘ L-3, ∘ m-13 rider) ⊕ FR-GV-1 (=L-2/C·C-3)` · `SS-C-1 … ⊕ M-β4 / L·m-6`), and the
anti-rename blocks (`E12 ≠ E13`, `E11 ≠ E17`, `E9 ≠ E7/E8`) each carry a live clause-head receipt. The
record-qualification discipline is exemplary: `fr-ContourEditorCanvas C-2` is spelled against the two
homonym `C-2`s, and `M1` is never left bare after R3-8.1.

Cross-checked against the canonical, the cited identities resolve as banked heads:
`L-5` (F.W4) · `C-2` (F.W5-W8) · `K-3` (TERMINAL, alias `C-8`) · `B-4` (F.W5-W8) · `M-12` (F.W3, aliases
`L-M2` · `LC-missed-3`) · `m-15` (F.W5-W8) · `SS-C-1`/`SS-C-2` (F.W5-W8) · `M-β4` (F.W5-W8) · `B-2` (F.W3,
leg F.W5-W8) · `FR-GV-1` (F.W3, legs F.W5-W8, SS-13) · `GAB-13` (F.W1, legs F.W3, F.W0) · `FR-NP-32` (F.W1,
leg NWO) · `fr-PaperSidebar M1` (F.W0, leg F.W1) · `BC-20` (F.W4). One lock keys on a token the canonical
carries as an alias — **D5-10 (LOW)**.

---

## §4 GATES — canonical operands only · reachable GREEN · portable commands

| gate | operand class | verdict |
|---|---|---|
| G-F7-1 ⊙ | product bytes + F-W5 clause/gate ids | **clean** — receipt truncated to its true 134 chars, cut disclosed; second probe supplies the whole sentence |
| G-F7-2 | corpus method law + counter-witnesses | clean |
| G-F7-3 | live value-tree probes | clean (re-measured: 1 comment hit; `api/src/lib` absent) |
| G-F7-4 | product `sed` windows | clean |
| G-F7-5 | frozen-record quote + clause id | **operand clean; close condition unreachable on the AGAINST branch — D5-12** |
| G-F7-6 | `fr-SpeedSelect` + clause E10 | clean |
| G-F7-7 | substrate figures + `FR-NP-32 (≡ fr-PaperSidebar M1)` | clean; canonical-form spelling landed at all three sites |
| G-F7-8 | F-W5 `§E` clause register (**+ "F.W4's ImageUpload roster 12/23"**) | **DEFECTIVE — the census half of the operand names the wrong holder; D5-1** |
| G-F7-9 | COHESION §3 item 2 | clean (pasted whole, wrap disclosed) |
| G-F7-10 | live value-tree probe | clean |
| G-F7-11 | COHESION §2 + five wave-spec far ends | clean — all five re-verified; born-RED correctly re-based onto the non-spec ends |

**No gate cites a superseded census.** §0's fold provenance and §2a's bounds reconciliation both strike the
check-file operand and name `CENSUS-CANONICAL.md` (R4-3/R4-10 discharged at the *declaration*). The residual
census defect is a **holder mis-citation inside G-F7-8's operand list**, not a rival census.

---

## §5 POSTURE · **PASS**

| item | state | receipt |
|---|---|---|
| F.W1 transaction whole | **held** | §7c's F.W1 row cites the TWELVE-limb charter whole, two spans two commands, both reproduce; the `ELEVEN-limb` cite survives only inside its own retirement note |
| W7 ∅ closed | **held** | §0's closure paragraph + the canonical's §4.1 adoption; `routedTotal = 0` re-derived here |
| SS-4 flags | **held** | §7c's SS-4 row (`IS a member wave` / `FLAGS … INLINE, never presumes it` / TA-4 prerequisite-or-rescope); the E16 flag span reproduces to its sentence end |
| tree READ-ONLY | **held** | §2a's do-not-touch glob covers `conformance/**` *whole* (count word retired per D-9), the fourier tree, all product source, the frozen 66, and every sibling spec; §0(F) refuses even the CLOSE-CERT erratum as out of bounds — correct under R4-8 |
| status planned | **held** | header and §1 both read `planned`; `IMPLEMENTED | NO` |
| zero VERIFIED | **held** | §1's verb table reads `VERIFIED | **NO** | — stamped only at X·F's sub-tranche release close` |
| RULINGS-4 applied | **partial** | R4-1.9 · R4-1.10 · R4-2 · R4-7.1 · R4-8.3 · R4-9.7 landed and measurable. R4-1.8 landed but is stale again (**D5-5**). R4-3/R4-10 landed at the declaration, **not at four holder citations** (**D5-1**, **D5-6**). R4-7.3 landed for `(both passes)`, **not for `four negatives`** (**D5-4**) |

---

## §6 DEFECT REGISTER

### D5-1 · **HIGH** · The wrong canonical holder, at five sites, one of them a gate operand

`F-W7.md` names **F.W4** as the holder of `fr-ImageUpload` "roster 12 / 23" at **§1b** (*"plus F.W4's
ImageUpload roster 12/23"*), **§5d**'s banked-id cell (*"homes **F.W5 §C2** (m-15) / **F.W4** (12, 23)"*),
**§6 G-F7-8**'s operand list (*"+ F.W4's ImageUpload roster 12/23"*) and **§8**'s exclusion row
(*"Homes are **F.W4** and **F.W5 §C2**"*).

The census of record homes both ids at **F.W3**:

```
$ /usr/bin/awk '/^### F\.W3 —/,/^### F\.W4 —/' CENSUS-CANONICAL.md | /usr/bin/grep '^- \*\*fr-ImageUpload\*\*'
- **fr-ImageUpload** (18): `D:m-4` · `B-1` · `D:B-2` · `D:M-2` · `D:M-4` · `L:L-M4` · `L:L-B1` ·
  `R1-MISSED-1` · `R1-MISSED-2` · `L:L-M3` · `D:m-3` · `D:m-9` · `D:m-1` · `D:m-7` · `C:C-15` ·
  `R2-missed-2` · `R2-missed-3` · `R1-MISSED-4`

$ /usr/bin/awk '/^### F\.W4 —/,/^### F\.W5 —/' CENSUS-CANONICAL.md | /usr/bin/grep '^- \*\*fr-ImageUpload\*\*'
- **fr-ImageUpload** (4): `R2-missed-4` · `D:m-8` · `C:C-13` · `F6`
```

and at the per-record table: `| \`L:L-M3\` | \`C:C-6\` | \`F.W3/W4\` | **F.W3** <sub>file-criterion → §5.d</sub> |`
and `| \`R2-missed-3\` | — | \`F.W3/W4\` | **F.W3** <sub>file-criterion → §5.d</sub> |`; `K-8` is
`| \`K-8\` | \`L:S-1\` · \`C:S-1\` · \`R1\` | — | **TERMINAL (∅)** |`.

R4-10: *"A wave BOOKS each canonical id, or CITES the holder by name."* Four of the five sites name a
holder the operand contradicts, and the fifth (§5b's witness list) names none. **The sharpest form**: this
is the *same table* (§8) in which round 4's D-11 re-based `L-5` onto the canonical — the cure was applied
to the row above and not to the row below it, so §8 now cites one holder from the census of record and
another from a superseded reading, in adjacent rows.

*Nothing books either way — F.W7's roster is zero and the wave takes no credit — so no count moves. What
moves is where a reader is sent, in the table whose whole declared function is that absence cannot be
mistaken for oversight.*

### D5-2 · **HIGH** · §12's closing universal is false in the round that wrote it

§12's fourth failure mode closes:

> *"Every receipt in this spec is now one of the surviving forms, and the one place a numeral remains — the
> frozen 66-record corpus — is the one operand in the program that cannot move."*

§8's L-5 erratum banks, in the same round:

> *"`grep -n 'ContourEditorCanvas' waves/F-W4.md \| grep -c 'L-5'` → **0**, and the same probe against
> `F-W3.md` → **0**"*

— two numerals over two **live wave specs**, precisely the form R3-3.10 forbids and §12 declares extinct.
Re-run this seat (base `$V/docs/tranches/X/fourier`):
`/usr/bin/grep -n 'ContourEditorCanvas' waves/F-W4.md | /usr/bin/grep -c 'L-5'` → **0**;
against `waves/F-W3.md` → **0**. **The measurement reproduces; the attestation does not.**

This is exactly the class round 4 struck at §0 item 7 (R4-1.9 / PASS-4 D-4: *"An attestation of sweep must
publish its residue or not exist"*), recommitted one section later in the same file, in the same round, by
the same cure. The residue here is two receipts, and §12 says there are none.

### D5-3 · **HIGH** · Three receipts resolve under no declared base and exit 2 on the pin

§0(B) declares the base map *"binding on every ⟨cmd⟩ in this file"* and enumerates five cwds —
`$V/docs/tranches/X/fourier` · `…/registry/adjudicated` · `$V/docs/tranches/X` ·
`…/formation/fourier` · `…/fourier/waves` — **none of which is the repository root**. Three receipts take a
bare `docs/` operand, which resolves only from `$V`:

```
$ cd $V/docs/tranches/X/fourier            # the map's base for every waves/… receipt
$ /usr/bin/grep -rl "trie ruling stays inline" docs/
grep: docs/: No such file or directory     # exit 2

$ cd $V
$ /usr/bin/grep -rl "trie ruling stays inline" docs/
docs/tranches/X/fourier/waves/F-W7.md      # exit 0
```

Sites: **§0 item 6** (`grep -rl … docs/`, the only one that names its base, inline, *"from the repo
root"*) · **§4's erratum** (`grep -rn … docs/`) · **§5a's P-10 row** (`grep -rn … docs/`). R4-2.5:
*"any pass-5 seat that meets a ⟨cmd⟩ failing 1–4 convicts it ON SIGHT as unrunnable machinery — no
charitable reading."* R4-2.4 is one-command-one-base; a receipt with **no** declared base is the degenerate
case of the same rule.

The exactness of the recurrence is the point: §0(B)'s own ⟨CC⟩ paragraph is titled **"The path that
resolved nowhere"** and cures `../keyframes/…` — *"Three passes read that receipt and none ran it"* — while
three receipts on the facing page resolve nowhere under the map that paragraph publishes.
`PASS-4/CLOSE-CERT-2.md` Class A recorded **"F-W7 | 182 | 0 | — | CLEAN"**; that row is falsified here, and
the cert's own §3 item 3 shows base-resolution was in scope (it convicted F-W1 `:363` for exactly this
law).

*Rider*: two of the three still carry the `grep -rn` address form that **§0 item 6's own round-3 cure
retired** (*"stated as a file-list and a classification rather than as `grep -rn`'s addresses, which move
whenever a strike note is edited"*). The cure landed at one of its three sites. The substance is
undisturbed — from `$V` the `-rn` form returns four addresses, all inside `F-W7.md`, so *"this file and
nowhere else in the tree"* is true.

### D5-4 · **MEDIUM** · A count word declared retired at §12 still stands at §8, and contradicts the operand

§8's L-5 row: *"`ContourEditorCanvas.vue` is one of the partition's **four negatives**"*.
§12, same file, same round: *"The pass-3 count word 'four negatives' is **retired for membership**: the
canonical enumerates that set differently from the sibling probe this file quoted."*
The canonical enumerates **five**:

```
$ /usr/bin/grep -c 'criterion negative → F.W4' CENSUS-CANONICAL.md
5
$ /usr/bin/grep -n 'criterion negative → F.W4' CENSUS-CANONICAL.md | /usr/bin/grep -oE 'fr-[A-Za-z]+'
fr-BasisCanvas / fr-ContourEditorCanvas / fr-EquationResult / fr-FourierMorphSvg / fr-GalleryAdminBanner
```

R4-7.3: *"where the prose and the list disagree, the LIST is authoritative and the prose is corrected."*
Two defects in one: a count word against the census of record, and a **retirement announced and not
executed** — the D-4/D5-2 class again, at a third site.

### D5-5 · **MEDIUM** · §2a's `find . -type d` paste no longer reproduces

Published at round 4 (D-3, curing R4-1.8's *"five directories"*) as **"The live output, pasted whole"**, an
eight-line block. Re-run on the pin at the pass-5 settle:

```
$ cd $V/docs/tranches/X/fourier && find . -type d
.  ./carry  ./waves  ./conformance
./conformance/PASS-3  ./conformance/PASS-4  ./conformance/PASS-5  ./conformance/PASS-2  ./conformance/PASS-1
```

**Nine lines** — `./conformance/PASS-5` is absent from the paste. The absence probe beside it still holds
(`find . -type d | grep 'contract\|design'` → **no output**, exit 1), and that probe is what every gate
rests on, so nothing load-bearing moves. But this is the **third** generation of one receipt: round 2
struck it for understating, round 3 replaced it with a differently-wrong list, round 4 re-listed it —
against the file's own argument, written two sentences below the block: *"round 3 then replaced it with a
differently-wrong list, which is the whole argument for not listing at all."* The cure is the one §2a
already names and then declines to take: publish the classification, drop the enumeration.

### D5-6 · **MEDIUM** · `m-15`'s holder is stated as the wave where the canonical states the band

§5d's banked-id cell and §8's exclusion row read *"homes **F.W5 §C2** (m-15)"*. The operand:
`| \`m-15\` | \`r2-missed-3\` | \`F.W5-W8\` | **F.W5-W8** |`, and §2's `F.W5-W8` roster carries
`- **fr-GalleryDraftsSection** (2): \`F-4\` · \`m-15\``. R4-5 makes **F.W5 (28)** and **F.W5-W8 (90)** two
distinct canonical denominators; naming one where the operand names the other is the D5-1 class, softer
only because F-W5 §2's `§C2` clause genuinely holds the cure and the spec elsewhere states the band
correctly (*"the band denominator `F.W5–W8` is **F.W5's** row, not F.W7's"*). The two sentences do not
agree with each other.

### D5-7 · **MEDIUM — filed against the CANONICAL** · `BC-20` and `M-β2` booked as rows *and* as claimed aliases

`CENSUS-CANONICAL.md` §1, `fr-BasisCanvas`:

```
| `BC-20` | —                              | `F.W3/W4` | **F.W4** <sub>file-criterion → no §5 list</sub> |
| `BC-10` | `C-9` · `BC-20` · `M-β2`       | `F.W3/W4` | **F.W4** <sub>file-criterion → no §5 list</sub> |
```

and §2's F.W4 roster lists `BC-20`, `BC-10` **and** `M-β2` as separate members. §0.1: *"An id **claimed as
an alias** by another row in the same record is **not a standalone identity** and books no row of its own."*
The two readings cannot both stand.

At the record bytes the alias claim has no head to come from: `fr-BasisCanvas.md:54` banks
`- **BC-20 — MAJOR.**`, `:56` banks `- **BC-10 / C-9 — MAJOR …**` (no `BC-20`), `:62` banks
`- **M-β2 — MAJOR (missed find…)**`, and the only line joining the three is `:148`'s UNPROVEN item
`7. BC-10/BC-20/M-β2 magnitudes: …` — which under §0.1's ONE-HOME rule (*"later banked-head lines carrying
the same left token are **citations**, not second rows"*) is a **citation of three already-banked rows**,
not an alias-bearing head. **The rows are right; the alias column absorbed a citation.** Cure: strike
`BC-20` and `M-β2` from `BC-10`'s alias cell (the ALIASES total 2768 moves by 2; no ROW moves, no home
moves, F.W4 stays 1014).

### D5-8 · **MEDIUM — filed against the CANONICAL** · `FR-TT-22` homed at a wave its arrow never names

Record, `fr-Tooltip.md:56`, whole: *"**FR-TT-22 = C-10 — INFO.** Zero coupling to value.js / keyframes.js /
the 45-op API; the chain terminates at reka + Vue (my whole-file read: one import). A zero-cost row on the
F.W2 ledger — a negative budget statement. **NO-WAVE-OWNER.**"*

Canonical: `| \`FR-TT-22\` | \`C-10\` | \`F.W2\` · \`NO-WAVE-OWNER\` | **F.W2** <sub>legs:
NO-WAVE-OWNER</sub> |`, and §2's `F.W2` roster carries `- **fr-Tooltip** (1): \`FR-TT-22\``.

§0.1's HOME rule takes *"the first wave token **its own arrow names** (the adopting wave)"*. This row's
arrow is `**NO-WAVE-OWNER.**` and names no wave; `F.W2 ledger` is descriptive prose about where a
zero-cost row would sit, in a sentence whose point is that it costs nothing. The sibling row `FR-TT-21`,
whose arrow *does* read `**NO-WAVE-OWNER** (SS-3/SS-4 …)`, is correctly homed `NWO→SS-3` — so the canonical
applies the rule correctly two rows up and inverts it here. This is the §0.3-item-2 home-inversion class,
uncured at this row. If sustained, `F.W2` drops 31 → 30 and `NWO` rises 29 → 30; the TOTAL is unchanged.

*This does not disturb F.W7: the ∅ posture is an F.W7-token enumeration, and `fr-Tooltip`'s two hits are
`KF.W7` substrings either way.*

### D5-9 · **LOW — filed against the CANONICAL** · `C-25` / `R6-8` attached to the second head, not the first

`fr-ContourSettings.md:43`: `- **B-4 = C-1 (∘ C-25/R6-8 fold) — BLOCKER.**`
`fr-ContourSettings.md:104`: `- **i-7 = C-25 / R6-8 — INFO (fold).**`
Canonical: `B-4` aliases `C-1` **only**; `i-7` aliases `C-25` · `R6-8`.

§0.1: a banked id's banking line is its **first** banked-head line; `B-4`'s head precedes `i-7`'s by 61
lines and claims both tokens inside its own head under the ALIAS rule (`∘` and `/` between id-shaped
tokens). The canonical inverted the attachment. **`F-W7.md`'s own keying follows the record** (§5c:
`B-4 = C-1, ∘ C-25 / R6-8 fold, ⊕ i-7`) — the spec is right and the operand is not, which is worth saying
out loud in a programme where the operand is now supreme.

### D5-10 · **LOW** · Two locks key on a token the canonical carries as an alias

§7b's `▲ **C-25 (home: F-W5 §2 clause E13; bytes: \`fr-ContourSettings.md:43\`)**` and **G-F7-5**'s operand
lead with `C-25`, which `CENSUS-CANONICAL.md` carries as an **alias** (of `i-7`), never as a banked head.
M-25 wants the banked id with its aliases beside it. Mitigated twice: §5c names `B-4` and `i-7` beside it,
and D5-9 shows the canonical's own attachment is contested. Cure is one word — lead with `B-4` (or `i-7`)
and carry `C-25` beside.

### D5-11 · **LOW** · The (C) hash pin is stale at the certified settle, and one "no" is now false

Re-run of §0(C)'s own published command (base `$V/docs/tranches/X/fourier`):

| sibling | published | at the cert's settle |
|---|---|---|
| `waves/F-W0.md` | `cd64d6580098` | **`282f0c120cd4`** |
| `waves/F-W1.md` | `0bfd6c8cd369` | **`a1302689aaa3`** |
| `waves/F-W3.md` | `a89c3386f3f8` | `a89c3386f3f8` ✓ |
| `waves/F-W5.md` | `40c1a5f5a576` | **`132c03192176`** |
| `waves/F-W6.md` | `b11f08894b9d` | **`c8c6d1d7f136`** |
| `waves/F-W8.md` | `1e3698adf4ff` | `1e3698adf4ff` ✓ |
| `waves/F-W10.md` | `bb58dc400cff` | `bb58dc400cff` ✓ |
| `../COHESION.md` | `91c6d974db9b` | `91c6d974db9b` ✓ |
| `../keyframes/waves/KF-W1.md` | `ee33bf25cb2a` (**"moved mid-round? no"**) | **`919e484b8a60`** |
| `conformance/CENSUS-CANONICAL.md` | `a450b8e9f80e` | `a450b8e9f80e` ✓ |

§0(C) explicitly disclaims settled-tree scope (*"It is a **quote-time** record … the settled-tree hash
table is the PURGE SEAT's closing act"*), and **every span this check re-ran from all five moved files
reproduced** — so the mechanism did what R4-8.3 built it for: drift is a fact, not an argument. Two
residues remain: the table cannot be used to verify anything without a re-run, and the `KF-W1` row's
`moved mid-round? no` is now false at the settle. Recorded, not convicted.

### D5-12 · **LOW** · G-F7-5 has no discharging act on the AGAINST branch, while §9 asserts it closes

G-F7-5's F.W7-close: *"Any F.W7 key spec names its consumed-field set and proves the superset relation.
**RED by absence: no key spec exists today**"*, GREEN owner *"F.W7 (FOR branch)"*. §9's `X.F.W7.b` sub-gate
line asserts *"**G-F7-3/4/5/6** close for F.W7"* for **both** branches — but §2a row 3 says
`R4-variant-storage.md` is *"**never created**"* if the ruling goes against, so on AGAINST there is no key
spec and no stated act that closes G-F7-5. §1a's XOR does not cover it. One clause fixes it: *on AGAINST,
G-F7-5 closes vacuously with the kill rationale recording that no key was designed.*

### D5-13 · **LOW** · Four minted ids in the carry table of a wave whose canonical roster is zero

`N-1` · `N-2` · `N-3` ⟨NEW⟩ and `F-MAIL-∅` ⟨minted⟩ are four of §5's fifteen counted rows, while §5a's own
LOCK carries KF-W1's *"a wave with no registry rows gets no manufactured ones"* and *"No registry row,
gate, or bounds item is minted to fill the empty column."* Each is disclosed at every site as a measurement
or a correction rather than a registry row, and the `KF-MAIL-∅`/C-14 form is banked at KF-W1 §5 and §8
(all three spans verified this seat) — so the tension is **declared, not concealed**, and this seat does
not convict it. Recorded so pass 6 need not re-derive the question.

---

## §7 WHAT THIS CHECK DOES NOT WRITE

`waves/F-W7.md` is **read-only to this seat**; every cure above is a routed request to the F.W7 repair
seat. `CENSUS-CANONICAL.md` is likewise read-only here: **D5-7 · D5-8 · D5-9 are filed against the
canonical** and are the census seat's to rule, by amendment and never by hand-pick. `PASS-4/CLOSE-CERT-2.md`
is a conformance artefact under the immutable glob; the notice it needs is here rather than in an edit to
it: **its §2 Class A "0 convictions" and its §4 "F-W7 | 182 | 0 | — | CLEAN" row are falsified by D5-3**
(three receipts with no lawful base, exit 2 on the pinned binary under every base the file declares), and
its Class C "numeric receipts" sweep did not reach §8's live-sibling `grep -c` pair (D5-2). No product
byte, no fourier byte, no sibling spec byte is written by this seat.

---

## §8 VERDICT

**DEFECTIVE.** Roster 0 / booked 0 / cited 0 / escaped 0 — **the census axis passes outright and the ∅
posture is sound at the operand**. Fifty-nine of sixty receipts reproduce on the pinned BSD binary,
including every one of round 4's twelve named cures at its own site. What convicts is the same thing that
convicted rounds 2, 3 and 4, one level up again: **three cures this round declared complete are complete at
some of their sites and not all of them** — the canonical re-basing (D5-1, D5-6), the count-word retirement
(D5-4), the base map (D5-3) — and one attestation (D5-2) says a residue is empty while the file's own §8
holds two of it. The programme's recurring lesson has a fifth statement: *a cure is not a ruling, an
announcement, or a paragraph. It is an edit at every site the class occupies, and the seat that cannot
enumerate those sites has not cured the class.*

*— pass-5 adversarial seat, X·F, 2026-08-29. Every figure above was executed at `/usr/bin/grep` on this
host and is re-runnable from the command printed beside it.*

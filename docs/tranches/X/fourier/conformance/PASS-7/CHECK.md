# X·F CONFORMANCE PASS 7 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18 / L-20)

**Seat**: PASS-7 CHECK SEAT, X·F round 7, 2026-08-29. **VERIFY-ONLY. This file is the seat's only write.** Zero edits to any wave spec, to `CENSUS-CANONICAL.md`, to `PIN-PURGE-CERT.md`, to the frozen corpus, to any round-6 instrument, or to product source in either tree. No product source was opened. Findings are recorded here and cured nowhere.
**Toolchain**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, BSD `/usr/bin/grep` · `sed` · `awk` · `shasum` · `od` · `tr` · `diff` · `git`. ⚠ **Named because it changed a result**: the interactive `grep` in this environment is a shell function wrapping `ugrep`, and it *fails* on `.{0,70}`-class patterns with `exceeds complexity limits`. **Every load-bearing probe below was re-run with the absolute path `/usr/bin/grep`.** Extraction of the census into ⟨block, record, id⟩ triples used `python3` (declared here, not a shell tool; scripts at the session scratchpad, no repo write).
**Operands**: the eleven `waves/F-W*.md` · `conformance/CENSUS-CANONICAL.md` · the round-6 instruments `PIN-PURGE-CERT.md` and `PASS-6/SEAL.md` (and `PASS-6/CHECK.md` as the register under test) · the frozen 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated` (`35fc8ebf`, `git status --porcelain` **empty**, `git diff --stat HEAD` **empty**, **66** files) · carries `F-W1-CARRY` and `F-W4-CARRY` only.
**Standing**: this seat authored no wave spec, no check, no union, no work order, no seal and no certificate in this programme. Nothing below is inherited; every figure is this seat's own command output, and where it agrees with a published figure it agrees because both were taken.

---

## §0 THE VERDICT IN ONE PARAGRAPH

**NOT CONFORMANT — and for the first time the failure is not in the fingerprints.** The round-6 instruments did their work and this seat confirms it without charity: **the hash gate passes 13 of 13**, **the R4-8.2 certificate exists and its §TABLE block is byte-identical to a fresh re-hash taken by this seat** (`diff` empty, 12 of 12), **not one live wave-spec pin survives anywhere in the eleven** (148 twelve-hex tokens, every one adjudicated, all 61 wave-digest survivors read at their line as dated history), **D-3's self-count is dissolved and its published loop reproduces to the integer**, and **D-5 · D-6 · D-7(canonical) · D-8 · D-9 · D-10 · D-12 are each closed at the bytes** — `FR-TT-1` now cites **F.W4**, the canonical's holder, in *both* twins, and the two lines still hash identically so the paired-bytes law survived the cure. **The roster still closes at ZERO escapes**, and this seat proved it by re-running the boundary-exact subtraction **at the new post-errata totals** — 2466 wave-duty rows ⊕ 65 drain rows, 68 F.W4 strict misses, all 68 resolved under the two idioms F-W4 §2.X.2(f) declares. **What fails is the thing the round-6 canonical errata moved and no seat followed: the denominators.** The canonical went `ROWS 4262 → 4242` and re-homed 49 rows off six wave rosters — **and not one wave spec was re-based.** Six of the eight wave-duty specs now publish a record-side roster figure the canonical does not state, at forty-plus sites, **with published ⟨cmd⟩ receipts that return different numbers when re-run**; and **47 of the 49 re-homed ids are still booked at their old wave**, 37 of them proven by a mechanical diff of the specs' own transcribed registers against the live canonical blocks. **The corpus is right, the canonical is right, and the specs are describing a census that no longer exists.** The mechanism detected it — the census pin is stale in all eleven files and the certificate says so against its own interest — and the round routed the *fingerprint* while the *figures* walked away unattended.

---

## §1 FIRST ACT — THE HASH GATE: **PASSED, 13 of 13**

⟨cmd⟩ this seat, first act, base `/Users/mkbabb/Programming/value.js`:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

Compared line-for-line with `PASS-6/SEAL.md` §7's pasted block: **every one of the thirteen matches to the full 64 hex characters.**

| file | sha256 (first 12) | seal §7 | |
|---|---|---|---|
| `F-W0.md` | `d26cc4630f80` | `d26cc4630f80` | ✔ |
| `F-W1.md` | `fc3e28d3a5f8` | `fc3e28d3a5f8` | ✔ |
| `F-W10.md` | `80eff6ad1a26` | `80eff6ad1a26` | ✔ |
| `F-W2.md` | `02c5ba9448f5` | `02c5ba9448f5` | ✔ |
| `F-W3.md` | `ae589556a1b2` | `ae589556a1b2` | ✔ |
| `F-W4.md` | `d503170c111b` | `d503170c111b` | ✔ |
| `F-W5.md` | `a5ce07de3e6d` | `a5ce07de3e6d` | ✔ |
| `F-W6.md` | `2d9969fb8320` | `2d9969fb8320` | ✔ |
| `F-W7.md` | `c03cf709a963` | `c03cf709a963` | ✔ |
| `F-W8.md` | `6c1408766fd0` | `6c1408766fd0` | ✔ |
| `F-W9.md` | `459d959db156` | `459d959db156` | ✔ |
| `CENSUS-CANONICAL.md` | `b6d8d858c387` | `b6d8d858c387` | ✔ |
| `PIN-PURGE-CERT.md` | `52264bcce7c9` | `52264bcce7c9` | ✔ |

**`hashesClean = true`. No mismatch convicts. Nothing has moved since the seal's absolute-last-act block** — which also means every uncured round-6 finding is live at pass 7 by construction, and this seat re-measured each rather than inheriting it.

---

## §2 AXIS 1 — THE ROSTER: **CLOSED. ZERO ESCAPES, RE-DERIVED AT THE POST-ERRATA TOTALS.**

### §2.1 The extraction and the three-way arithmetic, re-run against the round-6 canonical

⟨cmd⟩ `python3`, parsing §1's 66 record tables, §2's 23 roster blocks and §3's home table out of `CENSUS-CANONICAL.md` mechanically:

| measurement | result |
|---|---|
| §1 records | **66** |
| §1 banked-head rows (`^\| \`id\``) | **4242** |
| §1 per-record header `**N rows**` vs measured rows | **66 OK, 0 mismatches** |
| §2 ids extracted across 23 blocks | **4242** |
| §2 block headers `**N rows**` vs measured | **23 OK, 0 mismatches** |
| §2 per-record parentheticals `(n)` vs their own id lists | **0 mismatches** across every record line of every block |
| §2 blocks vs §3 home table | **0 diffs**, cell for cell, all 23 |
| §3 sum of home rows (TOTAL excluded) | **4242** = the `TOTAL` cell |

**§1 = §2 = §3 = 4242 by machine, in three independent directions, at the new totals.** ⊙ The seal measured the 23 home rows summing to `TOTAL`; this seat adds the two directions it did not take — the 66 per-record headers and the per-record parentheticals inside §2 — and both close at zero.

**Band expansion re-derives.** Four band rows survive E6-1: `FM-4..FM-16` (13) · `FM-17..FM-19` (3) · `K-1..K-16` (16) · `K-1..K-17` (17) → extras `12+2+15+16 = 45`; `4242 + 45 = ` **4287**, the published figure. ⊘ **D-4's duplicate class is GONE**: expanding all four bands and counting ⟨record, id⟩ pairs returns **0 duplicates** (PASS-6 measured 24). The E6-1 strike is real and complete.

### §2.2 The subtraction — boundary-exact, at 2466 ⊕ 65

Every canonical id tested against its home spec with the flanking characters required to be outside `[A-Za-z0-9_-]`. `F.W0→F-W0.md` … `F.W5-W8→F-W5..F-W8` concatenated, `F.W9→F-W9.md`; the drain tested against all eleven.

| block | rows | strict misses |
|---|---|---|
| F.W0 · F.W1 · F.W2 · F.W3 · F.W5 · F.W5-W8 · F.W9 | 1459 | **0** |
| F.W4 | 1007 | 68 → **all 68 resolved** |
| **drain** (NWO ⊕ NWO→SS-13 ⊕ NWO→SS-3 ⊕ NWO→SS-5) | **65** | **0** |

**Wave-duty rows checked 2466; distinct ⟨wave,id⟩ pairs 1916. Seven of eight rosters and the whole drain close on the first pass.** The 68 F.W4 misses were adjudicated **one at a time**, not by class:

1. **36 are RECORD-PREFIX compounds** (idiom 1, F-W4 `:344`) — re-tested with the left boundary relaxed, each is found: `FR-CL-M-R1` · `EP-D/D-8` · `EV-D·D-B4` · `GIG-D-1-residue` · `IU-F6` · `PS-C-M1` · `SS-D-01` and their siblings, each printed with its line and 30 characters of left context.
2. **32 are ELISION-CHAIN members** (idioms 2 and 3, F-W4 `:344`/`:345`), and **every count word in those chains is TRUE at the bytes**: `FR-USB-17..-20 ⊕ -28 ⊕ -29 ⊕ -30 ⊕ -31` says *"books eight"* → expands to **8**, covering my 4 `FR-USB` misses; `FR-GFC-12 ⊕ … ⊕ -28` says *"books eleven"* → expands to **11**, covering my 6; `EV-L·m-1 ⊕ m-2 ⊕ …` says *"nine `L·m-*` ids"* → **9**, covering my 7; the `FR-AH` chain carries `⟨no count word: the expansion IS the statement⟩` and its 20 members cover my 15. ⊕ **`FR-AH-27` is visibly absent from the chain** with its ⚠ cure note, and the canonical homes it at **F.W1**, where F-W1 books it with zero misses.

**`rosterEscapes = 0`, at the post-errata totals.** ⊘ **Stated exactly, because the number is easy to over-read**: this is the *forward* direction — every id the canonical homes is present in its home spec. The *reverse* direction is where this pass fails, and it fails badly (§4.2).

### §2.3 The zero-roster postures — TRUE by absence

⟨cmd⟩ `/usr/bin/grep -cE '^### F\.W(6|7|10) — ' CENSUS-CANONICAL.md` → **0**. No `F.W6`, `F.W7` or `F.W10` block exists in §2. The three ∅ postures are not assertions; each spec also declares its own in its own voice.

### §2.4 Spot audit — **seven** canonical readings against the frozen corpus bytes

| # | record | canonical / errata claim | at the corpus bytes | |
|---|---|---|---|---|
| 1 | `fr-NotationPills` | E6-1: `K-2`…`K-17` were re-bookings of stubs inside the band's head line; 55 → **39** | `:79` is **one** line and carries **17** `**K-n**` tokens; the only other `**K-` lines are `:83`–`:86` = `K-18`…`K-21`. Census: header **39**, measured **39**, K-rows = band ⊕ `K-18..K-21` | ✔ |
| 2 | `fr-MorphShapePreview` | E6-1: the band row was minted from prose; 69 → **68** | `:29` is prose (*"K-1..K-8 re-ratification"*); the real banked heads are table rows `:120`–`:127`. Census: **68**, no band row survives | ✔ |
| 3 | `fr-FourierMorphSvg` | E6-1: `FM-6` struck as a member of the record's own `FM-4..FM-16` band; 33 → **32** | census 32 rows; `K-1..K-16` band ⊕ standalone `K-17`…`K-20` at `:66`–`:69`, **no overlap** — the positive control PASS-6 named still holds | ✔ |
| 4 | `fr-PathPreview` | E6-4: standalone `C-10` STRUCK; 53 → **52** | census **52** rows, **no** `C-10` row; RC-1's `:49` `PP-GATE` line reproduces byte-identical | ✔ |
| 5 | `fr-Tooltip` | `FR-TT-1` homes **F.W4** | `:26` `- **FR-TT-1 = D-1 / L-4 — BLOCKER (FOLD).**` — a real banked head; canonical F.W4 block reads `- **fr-Tooltip** (1): \`FR-TT-1\`` | ✔ |
| 6 | `fr-BasisSelector` | E6-3: `K-12` is a killed-claims row → TERMINAL | `:111` `- **K-12 · C-5's migration sequencing (the \`./icon-tooltip\` one-word swap as the F.W3 cheap arm) — KILLED**` — **the `F.W3` token stands inside the claim being killed.** §0.1's operative arrow clause applies exactly | ✔ |
| 7 | `fr-ExportModal` | REST-65 / D-8: `L-16` folds at `fr-BasisCanvas:106`, `NO-WAVE-OWNER` | the re-cut command reproduces (§5 RC-16) | ✔ |

**Seven of seven confirm the canonical at the frozen bytes — including #6, which confirms the canonical against the wave spec that still contradicts it.**

---

## §3 AXIS 2 — THE PASS-6 REGISTER, D-1…D-13, AT THE BYTES

| # | pass-6 finding | state at pass 7 | this seat's evidence |
|---|---|---|---|
| **D-1** | pin regime stale program-wide (HIGH) | **CLOSED for wave-spec pins** — see the census-pin carve-out at §4.4 | ⟨cmd⟩ `/usr/bin/grep -rnoE '[0-9a-f]{12}' F-W*.md` → **148**; class arithmetic closes **61 (b) ⊕ 86 (c) ⊕ 1 (d) = 148**; **all four of D-1's live digests return ∅**; the 61 (b) occurrences sit at **27 distinct lines**, and this seat read **every one** — struck `~~…~~` halves (`F-W6 :48 :49 :50 :52`, `F-W7 :51 :52 :54 :55`, `F-W9 :341 :342 :344`), `(opened X)`/`(was pinned X)` cells (`F-W2 :447 :448 :450 :451`), movement minutes (`F-W0 :29`, `F-W1 :437`, `F-W3 :787`, `F-W6 :44`, `F-W7 :64`, `F-W8 :40`, `F-W9 :334 :352`), a self-declared prior run (`F-W1 :618 :620`), a re-run record (`F-W9 :505`). **Not one is a live warrant.** |
| **D-2** | R4-8.2 certificate owed for six rounds (HIGH) | **CLOSED BY ISSUANCE AND BY RE-RUN** | the certificate exists at `conformance/PIN-PURGE-CERT.md`. ⟨cmd⟩ its pasted `shasum` block extracted mechanically by `awk` on fence index, vs this seat's fresh 12-file re-hash → **`diff` EMPTY, 12 of 12**; its §TABLE first-12 column, extracted by `awk -F'\|'`, matches the fresh output **12 of 12**. **The cite-the-cert regime is coherent**: `pinned per PIN-PURGE-CERT.md §TABLE (2026-08-29)` × **41**, any-`§TABLE` citation × **44**, in **9** specs (F-W5 and F-W10 carried no wave-spec pin), at **42 distinct file:line sites** |
| **D-3** | MID-21's self-count false (HIGH) | **CLOSED — the published figures ARE the command's output** | ⟨cmd⟩ this seat, verbatim: `for t in PAW-6 PAW-18 PAW-26 PAW-29; do /usr/bin/grep -oE "\b$t\b" F-W4.md \| wc -l; done` → **`7 · 4 · 4 · 8`**, identical to what `:146` and `:462` publish. `'7 · 4 · 4 · 8'` occurs **2** (the two publishing sites); `'7 · 3 · 3 · 7'` occurs **2**, both inside dated strike narration. The fixed point is dissolved, not re-solved |
| **D-4** | band/standalone double-bank, 17 phantom rows / 24 dup ids (MEDIUM) | **CLOSED, and understated by the filing** | E6-1 struck **19** rows across **four** records (NP 16 ⊕ MSP 1 ⊕ MPC 1 ⊕ FMS 1); headers measured **39 · 68 · 62 · 32**; duplicates after full band expansion → **0** |
| **D-5** | F-W6 `:470` count-word ⊕ struck detector (MEDIUM) | **CLOSED** | ⟨cmd⟩ `grep -noE 'R-5 qualifies exactly \*\*[a-z]+\*\*' F-W6.md` → **∅**; `:470` reads *"R-5 qualifies **at least TEN** colliding tokens"* and reads the roster from `:65`, whose REST-20 list — `M-13 L-B1 L-M3 C-17 C-18 B-1 B-2 C-2 M-10 M-9` — **counts to ten** |
| **D-6** | MID-42 per-clause holder marks ~8 of 20 (MEDIUM) | **CLOSED** | ⟨cmd⟩ over `F-W5.md`: `'LEG — held at F-W4'` × **14**, any `held at F[-.]W[0-9]` × **23**, `'LEG CITED, HELD AT'` × **3** (pass 6 measured **8** of any spelling) |
| **D-7** | E5-10's cure landed at 1 band row of 6 (MEDIUM) | **canonical half CLOSED; SPEC half LIVE — §4.3** | ⟨cmd⟩ `awk '/^## §2/,/^## §3/' CENSUS-CANONICAL.md \| grep -ohE '\`[^\`]+\.\.[^\`]+\`' \| sort -u` → **four spans, all clean**. The canonical's one surviving malformed spelling is at `:179` **inside E6-2's own errata row**, lawful under E-3. **But `F-W1.md` still spells `FM-4..FM-16 (13 ids)` at 3 sites** |
| **D-8** | REST-65 locale-dependent, undeclared (MEDIUM) | **CLOSED** | `F-W10 :296` declares `LC_ALL=C` on **all three** pipeline stages. ⟨cmd⟩ this seat at `registry/adjudicated/` reproduces `19: L-16 → fr-BasisCanvas :106, NO-WAVE-OWNER `; under `LC_ALL=en_US.UTF-8` → `10:`, the documented flip. `grep -c LC_ALL` across the eleven → **F-W10 only, 1 site**, the sole `tr '·'` receipt |
| **D-9** | `FR-TT-1` fabrication, disclosed and uncured (MEDIUM) | **CLOSED — and cured in the ordered form** | `F-W10 :94` reads `\| **F.W4** ⟨**CITED — the canonical's holder; NOT booked by either twin**⟩`; the canonical homes it F.W4. ⟨cmd⟩ `sed -n '205p' F-W9.md \| shasum -a 256` and `sed -n '94p' F-W10.md \| shasum -a 256` → **both `f481699d4436…`**. **Δ=∅ across the shared §2.2 splice survived the cure** |
| **D-10** | REST-65's two-space paste (LOW) | **CLOSED** | ⟨cmd⟩ `od -c` over the piped output → `1 9 : ␣ L - 1 6 ␣ →` — **ONE `0x20`**, byte-true to what `:296` publishes, trailing space and all |
| **D-11** | `PASS-5/SEAL.md` §2.2 off-by-one (LOW) | **SUSTAINED, lawfully routed** | ⟨cmd⟩ `awk 'NR>=642 && NR<=673 && /^\|/' F-W1.md \| wc -l` → **26**. The seal is not edited (E-3); the dated correction lives at `PIN-PURGE-CERT.md §ERRATA` item 1. **The address still resolves after the purge**, which is the receipt for the within-line edit shape |
| **D-12** | F-W4 carries no `VERIFIED` declaration (LOW) | **CLOSED** | `F-W4 :16` `\| VERIFIED \| **NO** \|`; `:12` the dated erratum. Program-wide: `VERIFIED` in **11 of 11** specs, **45** occurrences, **zero** `VERIFIED…YES` of any spelling |
| **D-13** | three canonical residues (LOW) | **CLOSED** | (a) the arrow-clause re-derivation ran — **49** rows tagged `errata R6 E6-3, 2026-08-29`, movement `F.W0 −2 · F.W1 −28 · F.W2 −4 · F.W3 −9 · F.W4 −5 · F.W5 −1 = −49`; (b) the alias orphan — `fr-PathPreview` header **52**, zero `C-10` row; (c) `K7` **moved**, not merely flagged |

**Thirteen of thirteen adjudicated; twelve closed at the bytes; D-7's spec-side half survives as §4.3.** The round-6 repair, the errata and the purge all did what they said they did.

---

## §4 THE FINDINGS

### §4.1 · **BLOCKER — the eleven specs' record-side denominators are STALE against the census of record, and six specs' published ⟨cmd⟩ receipts no longer reproduce**

The round-6 canonical errata moved `ROWS 4262 → 4242` and re-based six wave rosters. **No wave spec was re-based.** The canonical's own §0 stamp is unambiguous — *"supersedes every prior denominator … a gate that cites another census operand is **DEFECTIVE on sight**"* — and R4-3/R4-10 repeat it inside the specs. Every figure below is the spec asserting a roster *by citation to this operand*, in its own live voice, not in a strike note.

| spec | what it publishes, and where | canonical now | Δ |
|---|---|---|---|
| `F-W0.md` | `` §2's `### F.W0 — **57 rows**` `` at `:7` `:25` `:62` `:111` `:132` — `:132` calls it *"the **CANONICAL F.W0 ROSTER — 57 rows, CITED, NEVER DERIVED HERE**"* | `:4841` **55 rows** | **−2** |
| `F-W1.md` | *"**358 rows over 65 records**"* at `:9` `:266` `:544` `:548`; `:622`'s probe *"returns **SPEC 358 · CARRY 0 · NEITHER 0**"* | **330** | **−28** |
| `F-W2.md` | ⟨cmd⟩ *"→ `` ### F.W2 — **27 rows** ``"* at `:32` `:56` `:270` `:354`; `:270` *"VERBATIM — 27 rows, read whole"* | `:4941` **23 rows** | **−4** |
| `F-W3.md` | **928** at 14 sites; `:30` *"**The one number this file now asserts is `928`**, and it asserts it by citation"*; `:787` also publishes `F.W0` **57** · `F.W1` **358** · `F.W2` **27** | **919** | **−9** |
| `F-W4.md` | `:293` `` §2.X.2 — **F.W4 = 1012 rows across 54 records** ``; `:295` *"verbatim: **1012 rows, 54 records**, summing to the canonical §3 table"* | **1007** (records 54 ✔) | **−5** |
| `F-W5.md` | `:9` `:265` `:279` — `` **`F.W5` — 28 rows** `` | `:5078` **27 rows** | **−1** |
| `F.W5-W8` · `F.W9` | 89 · 16 | 89 · 16 | **0 ✔** |

**Wave-duty asserted across the specs = 2515. Canonical = 2466.** ⟨cmd⟩ across all eleven specs: **`4242` → 0 hits** (F-W5's one `4242` is `42·100+42` inside an arithmetic refutation), **`4287` → 0**, **`2466` → 0**, **`1220` → 0**, **`1007` → 0**, **`330` → 0**. The post-errata census is spelled **nowhere in the corpus of specs.**

**The receipts, re-run verbatim by this seat, base `conformance/`:**

| spec's own ⟨cmd⟩ | published | this seat | |
|---|---|---|---|
| `awk '/^### F\.W1 — /{f=1;next} f&&/^### F\.W2 /{exit} f&&/^- /{p=$0; sub(/^[^(]*\(/,"",p); sub(/\).*$/,"",p); c+=p} END{print c}' CENSUS-CANONICAL.md` (F-W1 `:266`, `:548`) | **358** | **330** | ✘ |
| the same roster piped to `tr -cd '\140'` then `wc -c` (F-W1 `:266`, `:548`) | **716** | **660** | ✘ |
| the same roster, `wc -l` — the record count | **65** | **65** | ✔ |
| `grep -n '^### F\.W2' CENSUS-CANONICAL.md` (F-W2, four sites) | `` ### F.W2 — **27 rows** `` | `` ### F.W2 — **23 rows** `` | ✘ |
| `grep -n '^### F\.W0' …` (F-W0, five sites) | `` **57 rows** `` | `` **55 rows** `` | ✘ |
| F.W3 roster sum (F-W3 `:25` *"records 59 declared 928 enumerated 928"*) | 59 / **928** | 59 / **919** | ✘ |
| F.W4 roster sum (F-W4 `:293`/`:295`) | 54 / **1012** | 54 / **1007** | ✘ |

⊘ **Why this is a BLOCKER and not another D-1.** D-1 was a *fingerprint* going stale — the quotations it guarded all reproduced, and PASS-6 said so in the round's favour. **Here the guarded quantity is the roster itself**: the record-side obligation each wave discharges, the denominator every one of its booking gates is sized against, and the operand each spec names *by path* while transcribing a superseded state of it. F-W1 `:548` even carries the correct disclosure — *"Both count a STAMPED, hash-pinned artefact — the lawful shape"* — which is true of the form and false of the fact, because the stamp it names (`3e0a9acb3381`) is not the artefact's current digest (§4.4). **The mechanism fired and no one read the alarm.**

⊘ **Mitigation, stated in full.** (i) **`rosterEscapes` is unaffected** — §2.2 measured the forward direction against the *live* canonical and it closes at zero, so nothing the canonical homes is missing from its spec; the specs over-state, they do not under-cover. (ii) **The cure is mechanical and bounded**: six figures, ~40 sites, one re-base pass by a seat that runs after the canonical and edits no census cell — the same shape as the purge, one instrument up. (iii) **Nothing is deceptive**: every site names the operand by path, so a successor re-running the receipt finds the truth in one command, which is exactly what happened here.

### §4.2 · **HIGH — 47 of the 49 E6-3 re-homed ids are still BOOKED at the wave the canonical no longer homes them; 37 proven inside the specs' own transcribed registers**

This is §4.1's consequence in the *reverse* direction, and it is D-9's class — *"a real id booked at a wave the canonical does not home it"* — multiplied.

⟨cmd⟩ `python3`, for the two specs that transcribe a full `- **fr-X** (n): ids` register, diffing each register line against the live canonical block for the same record:

| spec | register span | **spec books, canonical does not home** | canonical homes, spec's line lacks |
|---|---|---|---|
| `F-W1.md` §6·R4 | `:551`–`:610` | **29** | 1 (the band-spelling pair, §4.3) |
| `F-W3.md` §X.1-v5 | `:724`–`:773` | **9** | 0 |

**Worked instances, printed side by side:**

- `F-W1.md:593` — `` - **fr-GalleryView** (3): `R-6` · `FR-GV-18` · `K11` `` · canonical F.W1 — `` - **fr-GalleryView** (2): `R-6` · `FR-GV-18` ``
- `F-W3.md:724` — `` - **fr-BasisSelector** (31): … · `K-12` `` · canonical F.W3 — `` - **fr-BasisSelector** (30): … `` *(ending at `m-22`)*
- `F-W2.md:374` / `:379` — `` | 11 | `fr-ConvergenceLegend K-7` | `F.W2` → **F.W2** | `` and `` | 16 | `fr-ConvergencePlot K-11` | `F.W2` → **F.W2** | `` · canonical F.W2 homes `fr-ConvergenceLegend` `C-2 · C-1` and `fr-ConvergencePlot` `L-M6 · C-19 · C-22` — **neither `K-7` nor `K-11`**

For the four specs whose transcription is not a `(n):` register (F-W0, F-W2, F-W4, F-W5), a boundary-exact **co-location** test — record name and id token on one line of the old home spec — finds **47 of the 49** still present, including `F-W0 :248` (`` | **fr-GalleryView** (2) | `FR-GV-28` … · `K7` … | ``), `F-W4 :315` (`KILL-3`), `F-W4 :112` (`SpeedSelect` `K-11`) and `F-W5 :288` (`fr-ConvergencePlot K-13`). **Only `fr-ConvergenceLegend K-10` and `fr-MorphShapePreview K-13` are not co-located at F.W4.**

⊘ **The canonical is right and the specs are wrong, and this seat checked that at the corpus rather than assuming it.** `fr-BasisSelector.md:111` reads *"**K-12 · C-5's migration sequencing (the `./icon-tooltip` one-word swap as the F.W3 cheap arm) — KILLED**"* — the `F.W3` token stands **inside the claim being killed**, which is precisely §0.1's operative arrow clause. E6-3 read the record correctly; `F-W3.md` is transcribing the pre-errata reading.

⊘ **Mitigation.** All 49 moved to **TERMINAL (∅)** or **UNROUTED**, so no *other* wave is short-changed and no cure is mis-assigned; the defect is over-claim, not conflict. And `FR-TT-1` — the one PASS-6 counted — **is genuinely cured**, so this is a fresh population, not an old one re-counted.

### §4.3 · **HIGH — D-7's spec-side half is uncured, and it now breaks the register match F-W1 claims is verbatim**

⟨cmd⟩ `/usr/bin/grep -c 'FM-4..FM-16 (13 ids)'`: **`F-W1.md` → 3**; canonical → **1**, and that one is inside E6-2's own errata row at `:179`. PASS-6 measured F-W1 at **3** and it is still 3. E6-2 cured the canonical's five malformed §2 spans; the specs that had *inherited* the malformed spelling were never re-based.

⊘ The cost is no longer cosmetic. F-W1 `:580` transcribes `` `FM-4..FM-16 (13 ids)` `` while the canonical's F.W1 line now reads `` `FM-4..FM-16` ``, so the same mechanical diff that found §4.2's 29 also reports the band row as **both** an unmatched booking **and** a missing canonical id — one row, two false signals, inside the register F-W1 `:544` calls *"the canonical F.W1 roster … taken VERBATIM AND ENTIRE"*. **A differ that must special-case a row is a differ nobody runs.**

### §4.4 · **HIGH — the census pin `3e0a9acb3381` is a superseded digest pinned live at 39 sites in 11 of 11 specs**

⟨cmd⟩ this seat: `/usr/bin/grep -o '3e0a9acb3381' F-W*.md | wc -l` → **39**, `grep -lF` → **11 of 11**. ⟨cmd⟩ for the true digest `b6d8d858c387` → **0 occurrences in any spec.** These are not history: F-W1 `:548` reads *"operand sha256 **`3e0a9acb3381`** at quote time"*, F-W2 `:270` *"operand sha256 **`3e0a9acb3381`**, §8d"*, F-W4 `:295` publishes it as a live ⟨cmd⟩ output. **The pass-7 bar for D-1 is *zero superseded digest pins*, and this is thirty-nine.**

⊘ **Mitigation, and it is substantial.** The purge seat **found this itself, disclosed it against its own interest** at `PIN-PURGE-CERT.md §ERRATA` item 2 — *"That was true of consistency and is no longer true of correctness"* — classed it **(c) out-of-scope, not clean**, refused to edit it under E-3 (the 22 marked `a450b8e9f80e` strike notes are dated history), and **routed it to the canonical's seat as a round-7 duty** with the instruction that a successor *"should expect `3e0a9acb3381` to appear 39 times and should read it against this entry rather than re-filing it."* This seat honours that: it is filed **once**, not thirty-nine times. But the disclosure is not the cure, and §4.1 is what the un-executed cure cost.

### §4.5 · **LOW — three uncured counts inside `PIN-PURGE-CERT.md`, all three re-measured and all three sustained**

| # | the certificate says | this seat measures | |
|---|---|---|---|
| LW-1 | *"across **forty-three** citation sites in nine specs"* (¶4) | ⟨cmd⟩ `grep -n 'PIN-PURGE-CERT.md §TABLE' F-W*.md \| awk -F: '{print $1":"$2}' \| sort -u \| wc -l` → **42** — F-W0 8 · F-W1 4 · F-W2 10 · F-W3 1 · F-W4 1 · F-W6 5 · F-W7 7 · F-W8 1 · F-W9 5. *"nine specs"* is exact | ✘ |
| LW-2 | §RECEIPTS S-6 *after*: *"**6 digests** / 4 specs, history position only"* | of D-1's ten superseded digests, exactly **five** survive (`a89c3386f3f8` · `a1302689aaa3` · `39e1a60b3fc9` · `bb58dc400cff` · `5cc3346db23e`); the certificate's own §RESIDUE (b) says five. *"4 specs"* and *"history position only"* are both **TRUE** | ✘ |
| LW-3 | §WHAT-THIS-SEAT-DID-NOT-DO item 2: *"**Every `:NNN` address in every check, seal, union and work order still resolves to the content it named**"* | ⟨cmd⟩ `git diff --numstat` → every wave adds = deletes **except `F-W4.md`, 9/3**. `PASS-6/CHECK.md`'s `F-W4.md:338` now lands on an unrelated `GM-6` row (content at `:344`); its `F-W4 :458` now lands on a **blank line** (content at `:464`) | ✘ |

⊕ **A fourth, this seat's own, of the same size**: §RESIDUE (b) describes *"five struck `~~…~~` halves at `:48`–`:52`"* in F-W6; **four** lines carry a digest there (`:48 :49 :50 :52` — `:51`'s was purged). The row's occurrence total, **15**, is exact.

⊘ All four are count-shaped, none moves a home, a booking, a roster, a gate or the purge's substance, and every one of them is re-derivable because the certificate published the coordinate lists that falsify it.

### §4.6 · **LOW — E6-2's universal over-reaches, unchanged from the seal's reading**

The canonical's E6-2 row says the malformed spelling *"is now absent from this file"*; ⟨cmd⟩ finds it at `:142` and `:179`, both inside dated errata quotations. **No live band row carries it** (§3 D-7), so the cure is real and only the wording is a universal it cannot hold. It should read *"absent from the census rows."*

---

## §5 RECEIPT REALITY — **26 receipts re-run; 19 round-6; fabrication ZERO among them**

Every command re-run by this seat on the pinned BSD toolchain from its declared base.

**Round-6 re-cuts and instruments (19):**

| # | edit / instrument | published | this seat | |
|---|---|---|---|---|
| R6-1 | the 13-file hash gate vs `SEAL.md` §7 | 13 rows | identical, full 64 hex | ✔ |
| R6-2 | `PIN-PURGE-CERT.md` §TABLE block vs fresh re-hash | 12 rows | `diff` **empty** | ✔ |
| R6-3 | §TABLE first-12 column vs fresh | 12 prefixes | 12 of 12 | ✔ |
| R6-4 | S-1 `grep -rnoE '[0-9a-f]{12}'` | 148 | **148** | ✔ |
| R6-5 | S-2 canonical cite spelling | 41 | **41** | ✔ |
| R6-6 | S-3 any `§TABLE` cite | 44 | **44** | ✔ |
| R6-7 | S-4 `grep -lF` | 9 specs | **9**, the named nine | ✔ |
| R6-8 | S-5 D-1's four live digests | ∅ | **∅** | ✔ |
| R6-9 | D-3 the four-token loop (F-W4 `:146`/`:462`) | `7 · 4 · 4 · 8` | **`7 · 4 · 4 · 8`** | ✔ |
| R6-10 | D-5 `R-5 qualifies exactly **[a-z]+**` | ∅ | **∅**; `:470` = *"at least TEN"*, list = 10 | ✔ |
| R6-11 | D-6 F-W5 holder marks | 25 (seal) | **23** any-spelling ⊕ 14 `LEG — held at F-W4` ⊕ 3 `LEG CITED` | ✔ |
| R6-12 | D-8/D-10 the locale-declared re-cut ⊕ `od -c` | `19: L-16 → …`, one space | **byte-identical**, `1 9 : ␣ L` | ✔ |
| R6-13 | D-9 twin-line hash (F-W9 `:205` ≡ F-W10 `:94`) | Δ=∅ | **both `f481699d4436…`** | ✔ |
| R6-14 | D-12 `VERIFIED` program-wide | 11 declare / 0 YES | **11 / 45 occ / 0 YES** | ✔ |
| R6-15 | E6-1 `fr-NotationPills` band head ⊕ header | 39 rows, 17 stubs on one line | **39 · 17 · 0 standalone `K-2..K-17`** | ✔ |
| R6-16 | E6-1 MSP · MPC · FMS headers | 68 · 62 · 32 | **68 · 62 · 32** | ✔ |
| R6-17 | E6-2 §2 band spans | four clean | **four, all clean** | ✔ |
| R6-18 | E6-3 `grep -c 'errata R6 E6-3, 2026-08-29'` ⊕ movement | 49 / −2 −28 −4 −9 −5 −1 | **49** / **identical** | ✔ |
| R6-19 | E6-4 `fr-PathPreview` ⊕ E6-5 §4.2 sum | 52 rows, 0 `C-10`; 282 | **52 · 0 · 282** (79⊕73⊕46⊕52⊕32) | ✔ |

**Round-5 re-cuts (RC-*), re-run independently of PASS-6's table:**

| # | edit | published | this seat | |
|---|---|---|---|---|
| RC-1 | REST-01 `sed -n '49p' fr-PathPreview.md` | the `PP-GATE` line | byte-identical | ✔ |
| RC-2 | REST-35 `grep -c 'criterion negative → F.W4' $C` | 5 | **5** | ✔ |
| RC-3 | MID-41 `grep -cw 'P-9' $C` | 0 | **0** | ✔ |
| RC-4 | MID-47 `grep -row/-rw/-rlw 'F\.W5' fr-*.md` | 245 · 240 · 54 | **245 · 240 · 54** | ✔ |
| RC-5 | MID-32 `FR-CP-` CoefficientsPanel vs ConvergencePlot | 92 · 3 | **92 · 3** | ✔ |
| RC-6 | REST-44 `grep -n 'SS-4' COHESION.md` | 36 57 69 135 146 147 165 | **identical** | ✔ |
| RC-7 | REST-25 `shasum -a 256 COHESION.md` | `956e71a83e32` | **`956e71a83e32`** | ✔ |
| RC-8 | REST-69 `` grep -c '^\| `L-16` \|' $C `` ⊕ `grep -l 'L-16' fr-*.md` | 6 ⊕ 25 | **6 ⊕ 25** | ✔ |
| RC-9 | REST-67 `grep -o "§2.5a-iii's 1[34]" F-W10.md` | 14 · 14 · 14 | **14 · 14 · 14** | ✔ |
| RC-10 | REST-55 `P-n … OUTSTANDING` in F-W9 | 8 | **8** | ✔ |
| RC-12 | MID-08 `grep -n '^### G-1[123] — ' F-W0.md` | 364 · 369 · 374 | **identical** | ✔ |
| RC-13 | MID-07 `grep -c 'additionally owns' F-W0.md` | 0 | **0** | ✔ |
| RC-14 | MID-27 `FR-CP-L[A-Z][0-9]+ \| sort -u` | nine | **nine**, `LB2 LB3 LM1 LM2 LM3 LM4 LM5 LM7 LM8` | ✔ |
| RC-11 | MID-33 `F.W4 = 1012 rows across 54 records` | 1012 | **1007** at the canonical | ✘ **§4.1** |

**Fabrication among the re-run receipts: ZERO.** No figure was invented; every number a command was asked to produce, it produced — **except the seven of §4.1, which are not inventions but transcriptions of an operand that moved after they were taken.** That distinction is the whole difference between a fabrication and a stale receipt, and it is stated here so the finding is not read as an accusation of bad faith.

---

## §6 AXIS 4 — GATES

| gate | state | receipt |
|---|---|---|
| **canonical operands only** | ✘ **BROKEN — §4.1** | all eleven cite `CENSUS-CANONICAL.md` by path and **none** cites a rival census as a denominator (`CENSUS-2026-08-03` appears in 8 specs, `CENSUS-ADDENDUM` in 2, always as history or as a named-and-struck operand). The failure is not a rival file — **it is a superseded *state* of the right file** |
| **portable commands, declared bases** | **HELD** | sweep over all eleven: `grep -P` 5 · `\K` 12 · lookaround 9 — **every hit read individually**, each is a law declaration (*"no `-P`, no `\K`, no lookaround"*, F-W0 `:31`, F-W1 `:9`/`:435`, F-W10 `:3`/`:191`), a strike narration (F-W4 `:374`), or a declared Python-regex-form parenthetical (F-W3 `:416`, F-W4 `:214`). **No live command uses one** |
| **declared locale where locale-sensitive** | **HELD** | `LC_ALL` at exactly one site — F-W10 `:296`, the sole `tr '·'` receipt (D-8) |
| **no false universals** | **HELD in the specs; broken in the instruments** | F-W6 `:24`'s bound claim re-tested: max bound in the file is exactly `.{0,190}`, **TRUE**. The only over-255 bounds are F-W7's three `.{0,262}`, all inside the narration of the receipt struck **as unexecutable**. ⊘ The two false universals are `PIN-PURGE-CERT.md` item 2 (§4.5 LW-3) and the canonical's E6-2 wording (§4.6) |
| **count-words match their lists** | **HELD in the specs** | the F.W4 chains: *"books eight"* → 8, *"books eleven"* → 11, *"nine `L·m-*`"* → 9; F-W6 `:470` *"at least TEN"* → 10; F-W10's `14` reproduces ×3. ⊘ The four failing count-words are all inside `PIN-PURGE-CERT.md` (§4.5) |
| **born-RED / no gate argued GREEN** | **HELD** | `born-RED` × **83**; `**GREEN**` × 16, and every one read is a *criterion* cell paired with a `**RED witness**` cell (e.g. F-W0 `:305`/`:306`), never a state claim. `reachable GREEN` as an assertion: **0** |

---

## §7 AXIS 5 — POSTURE

| posture | state | receipt |
|---|---|---|
| `status: planned`, all eleven | **HELD** | present in **11 of 11**; spellings vary (`Status stays \`planned\`` · `**Status**: \`planned\`` · `**Status: planned**` · `all \`planned\``), stylistic and not a defect at this bar |
| zero `VERIFIED` | **HELD** | 11 of 11 declare; **45** occurrences; **zero** `VERIFIED…YES` of any spelling |
| F.W1 transaction whole, 12 limbs | **HELD** | *"TWELVE limbs and stays twelve — the eleven chartered plus the FR-EQC-7 …"* |
| F.W6 / F.W7 / F.W10 zero-roster postures | **HELD, TRUE by absence** | `grep -cE '^### F\.W(6\|7\|10) — '` over the canonical → **0** |
| `FR-NP-32` canonical form | **HELD** | 111 occurrences, carried as `` **FR-NP-32** (≡ `fr-PaperSidebar M1`) `` with R-8's *"cite both, never substitute"* stated at F-W0 `:140` |
| SS-4 flags inline | **HELD** | present in **11 of 11** |
| fourier tree READ-ONLY | **HELD** | declared in 11 of 11; **true in fact** — this seat wrote only `PASS-7/CHECK.md` |
| E-3 (dated evidence never rewritten) | **HELD, and load-bearing** | the certificate refused to edit `PASS-5/SEAL.md` and `CENSUS-CANONICAL.md` and filed both corrections as dated entries; the 61 historical digests and the 22 `a450b8e9f80e` strike notes survive verbatim. **§4.1 and §4.4 are visible *because* nothing was silently rewritten** |
| corpus READ-ONLY at `35fc8ebf` | **HELD** | `git status --porcelain` **empty**, `git diff --stat HEAD` **empty**, 66 `fr-*.md` |
| carries limited to `F-W1-CARRY` · `F-W4-CARRY` | **HELD** | the two files exist; every mention of `F-W0/2/3/5/6/7/10-CARRY` is an explicit **"no such file exists"** declaration (F-W0 `:7`, F-W2 `:5`/`:52`/`:248`, F-W10 `:3`) |
| no product source opened | **HELD** | this seat opened none |

---

## §8 THE BAR, APPLIED

| bar clause | required | measured | |
|---|---|---|---|
| BLOCKER / CRITICAL | zero | **one BLOCKER** (§4.1) | ✘ |
| HIGH | zero | **three** (§4.2 · §4.3 · §4.4) | ✘ |
| hashes clean | yes | **13 of 13, full 64 hex** | ✔ |
| roster closed at the post-errata totals | yes | **0 escapes** over 2466 wave-duty ⊕ 65 drain, boundary-exact | ✔ |
| fabrication | zero | **47** (§4.2); `FR-TT-1` itself **cured to 0** | ✘ |
| tail MINOR-or-below with mitigations | yes | **two LOW**, each with its mitigation stated | ✔ |

# **NOT CONFORMANT.**

**One BLOCKER, three HIGH, forty-seven stale bookings. The bar is not met and this seat does not say it is.**

**What the round earned, said plainly.** The round-6 instruments are the best this programme has produced. **The purge is real and complete** — 148 hex tokens adjudicated, not one live wave-spec pin left, the mutual-recursion cycle replaced by a star with a fixed point, and the certificate honest enough to publish its own expiry condition and its own contrary evidence. **D-2 closed by issuance, D-1 closed by construction, and eleven of the thirteen remaining findings closed at the bytes**, including the two hardest: D-3's self-referential count, dissolved by citing the classification instead of re-counting; and D-9's fabrication, cured **in both twins at once** so the paired-bytes law survived. **The census errata were real and were understated by their own filing** — 19 phantom rows struck where D-4 found 17, 34 duplicate pairs where D-4 counted 24, and a derived total corrected *against interest* at E6-5.

**And the round lost the thing it was holding.** While six seats cured the fingerprints, the canonical they all point at moved underneath them — `4262 → 4242`, six rosters re-based, 49 rows re-homed — and **no seat carried the movement into the specs.** The purge seat detected it in one `shasum`, wrote it down against its own interest, and correctly declined to fix it from a seat E-3 forbids to edit the canonical. **Nobody was assigned the other half.** The result is that the eleven specs now describe a census that has not existed since 21:00, with receipts that were true when written and are false when run — which is, exactly, D-1's disease at one level of abstraction up, on the only quantity in the programme that a wave cannot discharge without.

**The one act that closes this round is a RE-BASE SEAT, and its shape is already proven by the purge.** It edits no census cell and no finding; it runs **after** the canonical's last byte; it re-writes six denominators (`F.W0 55 · F.W1 330 · F.W2 23 · F.W3 919 · F.W4 1007 · F.W5 27`), re-runs the four published roster commands and pastes what they return, strikes the 47 bookings the arrow clause moved — **as strikes, under E-3, never as deletions** — re-spells F-W1's three `FM-4..FM-16 (13 ids)`, and re-pins the 39 census sites to `b6d8d858c387`. Then it re-issues `PIN-PURGE-CERT.md` at its own settle, correcting the three counts at §4.5 as it goes. **And then a successor re-runs its claims, because no seat certifies itself — the rule this programme wrote at pass 4, proved at pass 5, and honoured at pass 6.**

---

## §9 WHAT THIS SEAT DID NOT DO

1. **No edit to anything but this file.** Not to a wave spec, not to `CENSUS-CANONICAL.md`, not to `PIN-PURGE-CERT.md`, not to `PASS-6/SEAL.md` or `PASS-6/CHECK.md`, not to the frozen corpus, not to product source, not to `scripts/dev/dev.sh`. **Every finding is uncured**; each names its site and its instrument.
2. **No inheritance.** The hash table, the 148-token adjudication, the roster subtraction, the register diff, the 26 receipts and the seven corpus spot audits are this seat's own output. Where a figure agrees with the seal or the certificate, both were taken.
3. **No re-cut of any roster, denominator or detector.** The canonical was read, never derived from. §4.1 reports a disagreement between two documents; it does not choose a number for either.
4. **No adjudication.** §4.1–§4.6 are measurements. No home, booking, roster line, grade, gate, severity, dissent or sequencing lock was touched or re-graded. `status: planned` and `VERIFIED **NO**` stand wherever they stood.
5. **No conformance claimed on any axis this seat did not measure.** P5-15's M-25 lock-depth gaps were not re-measured and are **declared, not asserted**, exactly as PASS-6 left them.

**— PASS 7, X·F, 2026-08-29. Verify-only; nothing edited. Hashes clean 13/13 · roster escapes 0 · fabrication 47 · NOT CONFORMANT. —**

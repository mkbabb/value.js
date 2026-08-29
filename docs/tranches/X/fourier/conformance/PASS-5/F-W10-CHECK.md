# X·F CONFORMANCE PASS 5 — F-W10 ADVERSARIAL SPEC CHECK (L-18/L-20, fresh seat)

**Seat**: FRESH pass-5 adversarial seat, 2026-08-29. **Subject**: `docs/tranches/X/fourier/waves/F-W10.md` (repair round 4, the census freeze).
**Census operand**: `conformance/CENSUS-CANONICAL.md` — **the sole census operand**, per R4-3 · R4-10 and the spec's own §1b/§2.5b adoption.
**Rulings applied**: `PASS-4/RULINGS-4.md` (R4-1.12 · R4-2 · R4-3 · R4-4.4 · R4-7.1 · R4-7.3 · R4-8.3 · R4-9.3/9.4 · R4-10).
**Cert status carried**: `PASS-3/CLOSE-CERT.md` is FALSIFIED on four counts and may not be cited without the R4-1.E-3 erratum row; `PASS-4/CLOSE-CERT-2.md` is read as a register, never as an operand.

**Toolchain, declared before any receipt.** Every ⟨cmd⟩ below was run by THIS seat on the pinned toolchain — `bash` + **BSD `/usr/bin/grep` 2.6.0-FreeBSD** / `/usr/bin/sed` / `/usr/bin/awk` — with the binary named by ABSOLUTE PATH at every call. **This is not a formality on this host**: a bare `grep` resolves to a shell function wrapping `ugrep 7.8.4`, whose `-E` handling of anchor-in-group alternation (`(^|X)…($|Y)`) diverges from BSD grep and silently returns 0 where BSD returns 2. A pass-5 seat that runs the corpus receipts through the bare name is measuring a different engine than R4-2 pins. Recorded so the next seat does not re-discover it. Zero `-P`, zero `\K`, zero lookaround, zero `.{n,m}` were used or needed.

**Two-key discharge.** R4-4's standing falsifier — *no cure lands without its receipt re-run by a seat that did not author it* — is discharged for round 4's cures by this seat: **R4-1.12's band re-cut, R4-7.1's five byte-true pastes, R4-7.3's 12/17 and 22-row corrections, R4-8.3's sha256 pin and R4-2.3's `$V`/`$F` declarations were all re-run here and all reproduce EXACT** (§2 below). This seat authored none of them.

---

## §0 VERDICT

**LOCAL VERDICT: DEFECTIVE.**

| axis | result |
|---|---|
| (1) roster booked/cited complete | **DEFECTIVE** — 60 canonical roster ids · 57 booked · 2 cited · **1 ESCAPED** (`fr-ExportModal L-16`); the spec's own **"60 present · 0 missing"** receipt is unsound by construction |
| (2) receipt reality (≥10 ⟨cmd⟩ re-runs) | **HOLDS** — **41 of 41** sampled receipts reproduce EXACT on the BSD toolchain, including all six of round 4's cures and the three figures of the REVOKED round-3 command |
| (3) M-25 depth (locks by banked id; aliases beside heads) | **HOLDS WITH ONE GAP** — alias spellings match the canonical byte-for-byte at every sampled row; **`L-16`, a SIX-record banked-head homonym, is the one collision the file never guards, and it is the collision that hides the escape** |
| (4) gates (canonical operands only, reachable GREEN, portable commands) | **HOLDS** — 12 gates, canonical-only operands, every falsifier reachable, every published command runnable on the pinned binary |
| (5) posture | **HOLDS** — F.W1 transaction cited whole (TWELVE limbs, by ⟨cmd⟩), W7 ∅ closed at the corpus, SS-4 rulings flagged never presumed, tree READ-ONLY, `status: planned`, `VERIFIED **NO**`, RULINGS-4 applied at every named site **except one stale count word (§4a.13)** |

**Five defects against the spec** (2 HIGH · 2 MEDIUM · 1 MEDIUM-low) and **five defects against the CANONICAL** — filed there, not here, per the census law: *a canonical error is filed against the canonical.* The canonical defects are a single class and they are the more consequential finding of this pass.

---

## §1 THE CENSUS AXIS — mechanical, against `CENSUS-CANONICAL.md` and nothing else

### §1.1 F.W10's canonical record-side roster is ZERO, and that reproduces

⟨cmd⟩ `C='conformance/CENSUS-CANONICAL.md'; /usr/bin/grep -c '^### F\.W10' "$C"` → **0**.
⟨cmd⟩ `/usr/bin/grep -o 'F\.W6\|F\.W8\|F\.W10' fr-*.md | wc -l` → **0** · `/usr/bin/grep -o 'F\.W7' fr-*.md | wc -l` → **2**, both inside `KF\.W7` (⟨cmd⟩ `/usr/bin/grep -o 'KF\.W7' fr-*.md | wc -l` → **2**).
⟨cmd⟩ `/usr/bin/grep -o '[^/]F\.W10' fr-*.md | wc -l` → **0** (the spec's §2.1 bare-`F.W10` figure).

§4.1's statement holds at the corpus, R4-10's duty row holds, and §2.5b's ZERO stamp is correct. **The wave carries no record-side debt.**

### §1.2 The auditable roster is therefore the canonical's four NWO packet rosters — 60 ids

Extracted mechanically from §2: `NWO (packet)` **29** ⊕ `NWO→SS-3` **25** ⊕ `NWO→SS-13` **3** ⊕ `NWO→SS-5` **3** = **60**. This is the operand §2.5b itself adopts, and it is the only non-vacuous census this wave can be held to.

| disposition | count |
|---|---|
| **BOOKED** — own drain row bearing a terminal verb (§2.5 · §2.5a · §2.5a-ii · §2.5a-iii(c)) | **57** |
| **CITED** — named, disposed at another holder or under the §2.5a-iii(d) class verb | **2** (`FR-COB-14` · `MISS-5`) |
| **ESCAPED** — absent from booking and citation | **1** (`fr-ExportModal L-16`) |

### §1.3 D-1 · HIGH · THE ESCAPE, AND THE RECEIPT THAT COULD NOT HAVE FOUND IT

§2.5b publishes: *"the 60 ids extracted from `CENSUS-CANONICAL.md` §2's four NWO rosters and each tested `grep -qF` against `F-W10.md`: **60 present · 0 missing**."*

**The result is an artefact of the probe.** `grep -qF` over a four-character id cannot distinguish a booking from a substring of a foreign id, and for exactly one row it does not:

- Canonical row: ⟨cmd⟩ `awk '/^### fr-ExportModal /,/^### fr-FourierMorphDemo /' "$C" | /usr/bin/grep -F '\`L-16\`'` → `` | `L-16` | — | `NO-WAVE-OWNER` | **NWO (packet)** | ``
- ⟨cmd⟩ `/usr/bin/grep -cF 'ExportModal' waves/F-W10.md` → **0**. The record is named **nowhere** in the spec.
- ⟨cmd⟩ boundary-aware, `/usr/bin/grep -cE '(^|[^A-Za-z0-9])L-16([^A-Za-z0-9]|$)' waves/F-W10.md` → **9**, and every one of the nine belongs to another record: `FR-USB-38 · L-16 / L-17 / D-i2 / C-i3` (fr-UserSlugBar's **alias**, §2.5a-iii(c)) and `L:L-16` (fr-PaperSearchDropdown's **distinct token**, §2.5a-ii). Zero name fr-ExportModal.

**This is the file's own convicted class, re-created inside the cure written to end it.** §2.5b's closing paragraph reads *"A bare roster number is not a banked id; a booking under one is invisible to every id-keyed gate in the programme, which is why this test found two rows four passes did not."* The same sentence, one clause further, condemns the test that wrote it: **a bare `grep -qF` on a short id is invisible to the escape it is supposed to catch.** The test that restored `R2-missed-1` and `R1-MISSED-5` manufactured a sixtieth presence in the same run.

**Mitigation, stated because it bounds the severity.** The row is materially disposed, just not by name: ⟨cmd⟩ `/usr/bin/sed -n '49p' fr-ExportModal.md | tr '·' '\n' | /usr/bin/grep -n 'L-16'` → `10: L-16 → fr-BasisCanvas :106, NO-WAVE-OWNER`. Its identity folds onto **`fr-BasisCanvas L §R5-7`** — which F-W10 books at §2.5a-iii(c) row 13, at the same anchor (`fr-BasisCanvas:106`). So the disposition exists; the **id** does not, the **fold** is declared at neither end, and the canonical's own `NWO (packet)` row for it is un-answered.

**Cure**: add the fold sentence to §2.5a-iii(c)'s `L §R5-7` row (`fr-ExportModal L-16` folds here, per `fr-ExportModal:49` conjunct 10 — one home, no re-book), and re-cut the escape test to a **record-qualified, boundary-anchored** probe. A by-name test is the only test R4-10's letter admits: *"An id absent from both booking and citation is that wave's escape."*

### §1.4 D-2 · HIGH · THE FABRICATION TEST IS ASSERTED UNIVERSAL AND WAS RUN OVER ONE SECTION

§2.5b: *"Since F.W10's canonical roster is empty, **every id-bearing cell of this file must be a citation, and one is not**: §2.2's re-cut table cuts `FR-TT-1` to F.W10, while the canonical homes `fr-Tooltip FR-TT-1` at F.W4."*

The named cell is real — re-run and reproducing: ⟨cmd⟩ `awk '/^### F\.W4 —/,/^### F\.W5 —/' "$C" | /usr/bin/grep -F '**fr-Tooltip**'` → `- **fr-Tooltip** (1): \`FR-TT-1\``. But the **universal** is false, and §5's round-4 exclusion row — headed *"The **three** §2.2 canonical divergences"* — is short by at least one:

| §2.2 cut | canonical home (`CENSUS-CANONICAL.md` §1) | disclosed? |
|---|---|---|
| `FR-TT-1` → **F.W10** ⟨re-cut⟩ | **F.W4** | YES (§2.5b · §5) |
| `PAW-49` → **F.W0** ⟨re-cut⟩ | `` | `F.W3/W4` · `F.W9/W10` | **F.W3** `` | YES (§5) |
| `PAW-12` → **F.W9** | `` | `F.W3/W4` · `F.W9/W10` | **F.W3** `` | YES (§5) |
| **`PAW-50` → F.W4 ⟨re-cut⟩** (and carried F.W4 at §2.7) | `` | `F.W9/W10` | **F.W9** `` | **NO — UNDISCLOSED** |

⟨cmd⟩ `awk '/^### fr-PaperArticleWindow /,/^### fr-PaperSearch /' "$C" | /usr/bin/grep -F '\`PAW-50\`'` → `` | `PAW-50` | — | `F.W9/W10` | **F.W9** <sub>legs: F.W9/W10</sub> | ``

`PAW-50` is the harness-before-rider row §4a.5 makes load-bearing for five other bookings and §2.7 files as "PAW-50's DECISION leg ⟨re-cut → F.W4⟩". The canonical homes it at F.W9. Under R4-10's converse clause the cell is a fabrication exactly as `FR-TT-1` is; under R4-7.3's list-over-prose rule the enumeration "three" is authoritative only if it is complete, and it is not.

Eight further §2.2 cuts sit against canonical wave homes as `F.W9/W10` **legs** rather than primaries (`FR-AFP-42`→F.W3 · `FR-EQR-6`→F.W4 · `D·D-B2`→F.W4 · PaperSidebar `D-B2`→F.W4 · `C-M4`→F.W4 · `M7`→F.W0, all re-run). Those are arguably the re-cut act itself operating on the canonical's leg column, and this seat does **not** convict them. `PAW-50` is different in kind: the canonical's PRIMARY is F.W9 and §2.2 cuts away from it.

**Cure**: either widen the fabrication test to the whole file and publish its output, or state its scope in the sentence (`run over §2.2's re-cut table`) — a universal that was measured over one section is the "erratum written to prove that checking happened" shape this file convicts three times at E-4.

### §1.5 D-3 · MEDIUM · §2.5b's PACKET CLAIM IS FALSE FOR FIVE OF FOURTEEN

§2.5b: *"The drain **never was** a wave-side roster … its rows are **terminal dispositions over rows the canonical homes at a PACKET**, which is exactly R4-10's 'cites the canonical packet row'."*

Re-run against the canonical, the fourteen rows §2.5a-iii(c) lands:

| (c) row | canonical home | packet? |
|---|---|---|
| `PP-CENSUS` | NWO→SS-3 | ✔ |
| **`PP-AGGLOM`** | **F.W4** | ✘ |
| **`PP-SEVLAW`** | **F.W4** | ✘ |
| `FR-TT-21` | NWO→SS-3 | ✔ |
| **`FR-TT-22`** | **F.W2** | ✘ |
| `FR-USB-34` | NWO (packet) | ✔ |
| `FR-USB-37` | NWO (packet) | ✔ |
| **`FR-USB-38`** | **F.W2** | ✘ |
| `PAW-56` | NWO (packet) | ✔ |
| `FR-FG-23` | NWO (packet) | ✔ |
| `m-4` | F.W3 (legs NWO · SS-3 · SS-4) | ✘ — but the spec SPLITS it correctly, disclosed by construction |
| **`D-i2`** | **F.W1** | ✘ |
| `fr-BasisCanvas L §R5-7` | not banked as an id — flagged at §5 | n/a |
| `L-19` | NWO (packet) | ✔ |

Five of fourteen are canonically wave-homed and the spec asserts the contrary of the census it names as sole operand. **The spec is RIGHT at the record bytes and the CANONICAL is wrong on all five (§3 below)** — which is precisely why this is a MEDIUM and not a HIGH: the defect is the undisclosed conflict, not the disposition. A wave that stamps *"the canonical homes these at a packet"* while its own rows contradict the stamped census owes the reader the divergence, in the idiom §4.5/§5 already uses for the `PAW-4` twin question.

**Cure**: convert the sentence to the amendment idiom — name the five, name the canonical rule they fail (§0.1's arrow clause), keep the drain's verbs unchanged, and flag it as a census amendment the way §5's round-4 row already flags the unspelled-head class.

### §1.6 D-4 · MEDIUM · §4a.13's BINDING DENOMINATOR DOES NOT CLOSE

⟨cmd⟩ `/usr/bin/grep -o "§2.5a-iii's 1[34]" waves/F-W10.md` → **`14` · `14` · `13`**.

§4a.13 — the clause headed *"Corrected denominators, **binding on this file against itself**"* — publishes:

> the NO-WAVE-OWNER drain is **89 rows / 89 distinct ids / 89 terminal verbs** — §2.5's 23 ⊕ §2.5a's 36 (= **59** distinct ids) ⊕ §2.5a-ii's 16 (= 75) ⊕ **§2.5a-iii's 13**

**23 + 36 + 16 + 13 = 88.** The round-4 13→14 landing (the 69th strict disposition `L-19+C-N1`, R4-7.3) reached §2.5a-iii's own reconciliation, §5's header and G-F10-7's cell — and **not** §4a.13. The arithmetic published under the label 89 sums to the figure the same clause names as superseded.

This is the **E-13 / E-22 shape for a third consecutive round**: a denominator declared binding on the file against itself, wrong by one, inside the clause that declares it. It is also the exact site R4-7.3 targets ("*where the prose and the list disagree, the LIST is authoritative*"). The section-extraction instrument reproduces the true operands: ⟨cmd⟩ the four `awk … | /usr/bin/grep -c '^| \*\*'` probes → **23 · 36 · 16 · 14**, and `23 + 36 + 16 + 14 = 89`.

**Cure**: `13` → `14` at §4a.13. One character. It is filed at MEDIUM because it is the *third* generation of the same defect and it sits in the clause built to stop it.

### §1.7 D-5 · MEDIUM-low · THE M-25 HOMONYM GAP THAT HIDES D-1

The file's homonym discipline is otherwise exemplary and every guard re-runs exact:

⟨cmd⟩ `/usr/bin/grep -lE '(^|[^A-Za-z0-9-])m-4([^0-9A-Za-z-]|$)' fr-*.md | wc -l` → **17** · `/usr/bin/grep -l 'D-i2' fr-*.md | wc -l` → **7** · `/usr/bin/grep -ln 'MISSED-2' fr-*.md | wc -l` → **3** (fr-HarmonicLevelGrid · fr-ImageUpload · fr-UserSlugBar) · `/usr/bin/grep -l 'L-19' fr-*.md | wc -l` → **16**. `M-16`, `i-5`, `i-1` are record-qualified at both instances; the canonical's alias columns match the spec's spellings byte-for-byte at every sampled row (`FR-USB-34 · D-i1 ⊕ r2-MISSED-3 ⊕ L-14` ↔ canonical `D-i1 · r2-MISSED-3 · L-14`; `m-4 = D/m-9 = L-10 = C-16 + D/i-3 ∘ DU-missed-5` ↔ canonical `D/m-9 · L-10 · C-16 · D/i-3 · DU-missed-5`; `L-19+C-N1` ↔ canonical alias `C-N1`).

**`L-16` is the one that got away, and it is the worst possible one to miss:**

⟨cmd⟩ `/usr/bin/grep -l 'L-16' fr-*.md | wc -l` → **25 records carry the token**.
⟨cmd⟩ `/usr/bin/grep -n '^| \`L-16\`' CENSUS-CANONICAL.md` → **SIX records bank `L-16` as a HEAD id** — five homed at F.W4 or TERMINAL, and **one — fr-ExportModal's — homed at `NWO (packet)`, i.e. inside this wave's own roster.**
And `L-16` appears in F-W10 only as **fr-UserSlugBar's ALIAS**, on `FR-USB-38` — a row §2.5a-iii(c) books, and whose homonym guard covers `D-i2` and not `L-16`.

The file applies the qualify-short-ids law to `M-16`, `i-5`, `i-1`, `MISSED-2`, `D-i2` (7) and `m-4` (17), and disclosed the `L-19` collision at round 4 after three rounds of silence. `L-16` is a six-way banked-head collision that was never disclosed at all — and **the unguarded token is the mechanism of D-1**.

---

## §2 RECEIPT REALITY — 41 ⟨cmd⟩ SAMPLES RE-RUN ON THE PINNED BSD TOOLCHAIN

All commands run by this seat, 2026-08-29, `/usr/bin/grep` 2.6.0-FreeBSD, one base per block, read-only. **41 of 41 reproduce EXACT. No `-P`, no `\K`, no lookaround, no `.{n,m}` was used, and none appears in any runnable ⟨cmd⟩ span of the spec** — the masthead's portability claim and E-24's sweep both verified independently: ⟨cmd⟩ `/usr/bin/grep -cF -- ' -P' F-W10.md` → **0** · `\K` → **0** · `(?=` / `(?!` / `(?<` → **0** · `/usr/bin/grep -cE '\.\{[0-9]+,[0-9]+\}' F-W10.md` → **0**.

### §2.1 Corpus receipts (base: `docs/tranches/V/megatranche/registry/adjudicated/`)

| # | ⟨cmd⟩ | spec | this seat |
|---|---|---|---|
| 1 | `grep -o 'F\.W9/W10' fr-*.md \| wc -l` | 54 | **54** ✔ |
| 2 | `grep -l 'F\.W9/W10' fr-*.md \| wc -l` | 25 | **25** ✔ |
| 3 | `ls fr-*.md \| wc -l` | 66 | **66** ✔ |
| 4 | `grep -o 'NO-WAVE-OWNER' fr-*.md \| wc -l` | 167 | **167** ✔ |
| 5 | `grep 'NO-WAVE-OWNER' fr-*.md \| wc -l` | 165 | **165** ✔ |
| 6 | `grep -l 'NO-WAVE-OWNER' fr-*.md \| wc -l` | 56 | **56** ✔ |
| 7 | `grep -o 'NO–WAVE' fr-*.md \| wc -l` (en-dash arm) | 0 | **0** ✔ |
| 8 | arrow-form, `Routing law` filtered | 31 | **31** ✔ |
| 9 | arrow-form records | 16 | **16** ✔ |
| 10 | bold-terminal form, arrow-excluded | 61 | **61** ✔ |
| 11 | `grep -o '[^/]F\.W10' fr-*.md \| wc -l` | 0 | **0** ✔ |
| 12 | `grep -o 'F\.W7' fr-*.md \| wc -l` / all inside `KF.W7` | 2 / 2 | **2 / 2** ✔ |

### §2.2 §2.5a-iii(a) — the balanced partition, re-run with `$BOIL`/`$ROW`/`$STRICT` as declared

| class | spec | this seat |
|---|---|---|
| routing-law / taxonomy boilerplate | 31 | **31** ✔ |
| row-level STRICT (records) | 68 (35) | **68 (35)** ✔ |
| row-level WEAK (records) | 32 (19) | **32 (19)** ✔ |
| prose STRICT | 1 | **1** ✔ |
| prose WEAK | 33 | **33** ✔ |
| TOTAL | 165 | **165** ✔ |

`31 + 68 + 32 + 1 + 33 = 165`. **The partition exhausts its operand and the arithmetic closes.** The strict roster of **69 dispositions / 36 records** follows from the 68 ⊕ 1 as published. This is the single strongest artefact in the file and it survives a hostile re-run intact.

### §2.3 R4-1.12 / R4-4.4 — the REVOKED band pipeline and its RE-CUT (the round's flagship cure)

| ⟨cmd⟩ | spec | this seat |
|---|---|---|
| re-cut, filenames retained, both taxonomy filters, one base — **lines** | 92 | **92** ✔ |
| same brace group `\| cut -d: -f1 \| sort -u \| wc -l` — **records** | 44 | **44** ✔ |
| `grep -l 'NO-WAVE-OWNER' fr-*.md \| wc -l` — the separated 56 | 56 | **56** ✔ |
| E-21's claim about the DEAD form: `-hn` arrow arm | 27 | **27** ✔ |
| E-21: `-hn` both arms | 70 | **70** ✔ |
| E-21: `-n` unfiltered | 45 | **45** ✔ |

**The cure is sound and the erratum about the dead command is true.** E-21's assertion — *"as printed it returns 27 / 70 / 45 — never 44"* — is not narration; all three figures reproduce, and the honest pipeline independently produces the 92/44 the figure stands on. R4-1.12's direction (*the figure follows the pipeline, never the reverse*) is satisfied at the bytes. **Two-key rule DISCHARGED for R4-1.12.**

### §2.4 R4-7.1 — the five byte-true re-pastes

Each `/usr/bin/sed -n 'NNp'` re-run in the frozen corpus; each published span compared byte-for-byte:

| site | published span | bytes |
|---|---|---|
| `PP-SEVLAW` fr-PathPreview:70 | *"Every row above marked "wire branch" prices in only there."* | **EXACT** ✔ (straight double quotes restored) |
| `FR-TT-22` fr-Tooltip:56 | *"A zero-cost row on the F.W2 ledger — a negative budget statement."* | **EXACT** ✔ (leading capital + em-dash clause restored) |
| `PAW-56` fr-PaperArticleWindow:293 | *"**NO-WAVE-OWNER locally** (latent, margin-1)"* | **EXACT** ✔ (`(latent, margin-1)` restored, no invented period) |
| `D-i2` fr-PaperSearchInput:82 | *"Recorded so the forming specs cite each figure under its right criterion."* | **EXACT** ✔ (opening verb + full stop restored) |
| `FR-USB-38` fr-UserSlugBar:81 | *"**do NOT book this component into the F.W2 migration surface**"* | **EXACT** ✔ (emphasis restored, span coincides) |

**5/5. Two-key rule DISCHARGED for R4-7.1.** CLOSE-CERT §6.1's *"724 label sites … 0 word-level drifts"* is falsified by these five, as the R4-1.E-3 erratum already records.

### §2.5 R4-7.3 / R4-8.3 / R4-2.3 — the count and pin corrections

| ⟨cmd⟩ | spec | this seat |
|---|---|---|
| `sed -n '109,125p' ADOPTION-ASKS.md \| grep -c 'OPEN'` | 12 | **12** ✔ |
| `… \| grep -c .` | 17 | **17** ✔ |
| `grep -cE '^\| [A-Z]+-[0-9]+ \|' "$O"` (O-20 id-rows) | 22 | **22** ✔ |
| `grep -cE '^\|' "$O"` | 28 | **28** ✔ |
| `wc -l < "$O"` | 59 | **59** ✔ |
| `shasum -a 256 "$O" \| cut -c1-12` | `f6e04c86ddb8` | **`f6e04c86ddb8`** ✔ |
| `grep -c '@source' "$O"` / `'FR-NP-32'` / `'fourier'` | 1 / 1 / 10 | **1 / 1 / 10** ✔ |
| `find glass-ui/docs -name 'valuejs-outbound-*.md' \| wc -l` | 11 | **11** ✔ |
| term-sweep across all 11: `MetricPill` / `IntersectionObserver` / `latex-paper` | 0 / 0 / 0 | **0 / 0 / 0** ✔ |
| E-4, `$V` declared: `grep -ho 'Restored analytic in/out arms match 0\.13\.0' "$V"/…/W9.md` | exact | **exact** ✔ |
| E-4: `grep -ho 'Packets sent, exact-pin consumers notified' "$V"/…/W9.md` | exact | **exact** ✔ |
| E-24: the three-`W9.md` `ls … \| wc -l` | 3 | **3** ✔ |

**R4-8.3's hash pin holds — the sibling has not moved since the spec quoted it, and it is now provable rather than assertable. Two-key rule DISCHARGED for R4-7.3, R4-8.3 and R4-2.3.**

### §2.6 Splice, gate-quote and self-count receipts

| ⟨cmd⟩ | spec | this seat |
|---|---|---|
| `diff` of the F-W9/F-W10 checkpoint-block extracts | empty | **empty** ✔ |
| `diff` of the `\| record \| identity` → entrant-block extracts | empty | **empty** ✔ |
| E-10 whole-§2.2 `diff` | exactly 3 hunks | **3** ✔ |
| E-11 `grep -h '^### G-1[123] — ' F-W0.md` (prefix-free) | 3 gate headings | **3, verbatim** ✔ |
| G-12 `grep -o 'shim \*\*21 cartoon-card sites / 14 files\*\*'` | reproduces | **reproduces** ✔ |
| G-12 `grep -o '\`text-admin-label\` \*\*7 / 4 files\*\*'` | reproduces | **reproduces** ✔ |
| `grep -c '35 callsites / 9 consumers' F-W10.md` / `grep -c '35/9'` | 2 / 1 | **2 / 1** ✔ |
| section instrument: §2.5 / §2.5a / §2.5a-ii / (c) | 23 / 36 / 16 / 14 | **23 / 36 / 16 / 14** ✔ |
| §2.5a-iii(d) weak-class enumeration, line entries | 32 | **32** ✔ (and 19 records; 26 + 6 = 32 closes) |

### §2.7 Corpus quotation reality — every "verbatim" label spot-checked

`grep -c 'producer dist emitter' fr-NotationPills.md` → **1** ✔ · `grep -no 'Redundancy records. \*\*NO-WAVE-OWNER\*\*\.' fr-AdminAuditLog.md` → **`89:`** ✔ · `grep -no 'R6-8 and R3-7c have NO leaf in this component' fr-App.md` → **`90:`** ✔ · `grep -rc 'never scheduled independently' fr-*.md` summed → **0 in all 66** ✔ (the E-20 minted-quotation finding is true) · `grep -no 'coverage rides the B-1/B-2 cure wave' fr-PaperView.md` → **`120:`** ✔ · `grep -no 'L-19+C-N1' fr-PaperSearch.md` → **`57:`** ✔ · `grep -n 'unlayered-scoped-vs-system' fr-ConvergenceLegend.md` → **`97`** ✔ · `grep -ho 'FOLD → R5-7/R6-6 + fr-BasisCanvas L§R5-7' fr-CoefficientsPanel.md` → **exact** ✔.

### §2.8 Anchor reality — 15 record line anchors re-resolved

Every anchor the drain cites was re-`sed`'d and lands on its id: `fr-CollapsibleSection:83`→`i-7` · `fr-CanvasControlsDock:100`→`M-10` · `:96`→`C-25` · `fr-FunctionInput:82`→`L-i1` · `fr-GalleryDraftsSection:83`→`m-18` · `fr-AdminAuditLog:89`→`AA-46` · `:90`→`AA-47` · `fr-ContourSettings:100`→`i-3` · `:105`→`i-8` · `fr-AnimationControls:124`→`L-8` · `fr-PaperView:113`→`★MF-7` · `fr-EasingCurvePreview:68`→`CITE` · `fr-EditorControlsDock:51`→`D-2 / L-3 / C-1` · `fr-CoefficientsSpectrum:68`→`M-16` · `fr-MobileFloatingToc:66`→`M-16`. **15/15 exact.** FR-CP-45's anchor law, adopted by this file as binding on its own citations, holds at the bytes.

**Axis (2) verdict: HOLDS.** This is the first F-W10 round in which a hostile seat could not break a single published receipt. Four rounds of false-at-write receipts — E-3, E-4, E-11's second minute, E-21 — are terminated at round 4, and the two-key rule is discharged for every round-4 cure.

---

## §3 FILED AGAINST THE CANONICAL — `CENSUS-CANONICAL.md`, five defects, one class

Per the census law, a canonical error is filed against the canonical. The 5-record spot-audit required by this check found the canonical's **arithmetic sound and its routing derivation defective in one systematic way.**

### §3.1 Arithmetic control — the canonical is internally consistent at all five spot-audited records

| record | declared header | §1 table rows | §2 roster membership sum |
|---|---|---|---|
| fr-PathPreview | 53 | **53** | **53** |
| fr-Tooltip | 31 | **31** | **31** |
| fr-UserSlugBar | 60 | **60** | **60** |
| fr-PaperSearchInput | 50 | **50** | **50** |
| fr-CollapsibleSection | 53 | **53** | **53** |

And §3 closes whole: wave-side `56+362+31+926+1014+28+90+17 = 2524`; packets/relay/SS-*/terminal/unrouted `= 1745`; **2524 + 1745 = 4269 = §3's TOTAL.** RULINGS-4's claim that §1 = §2 = §3 is machine-verified survives this sample.

### §3.2 CANON-1 · HIGH · PROSE-TOKEN CAPTURE — five rows homed at a wave their own arrow never names, three of them at a wave the record explicitly FORBIDS

§0.1's HOME clause is unambiguous: *"Where a row carries more than one wave token, the **home is the first wave token its own arrow names** (the adopting wave) and every further token is a LEG/RIDER."* Rule 2 scopes routing to *"the X-token(s) **on its line**"* — a scope that, applied without the arrow clause, swallows prose.

| # | canonical row | canonical home | the row's own arrow / terminal disposition (bytes) | where the captured wave token actually sits (bytes) |
|---|---|---|---|---|
| 1 | `fr-PathPreview PP-SEVLAW` (:70) | **F.W4** <sub>legs: NO-WAVE-OWNER</sub> | `**INFO → NO-WAVE-OWNER** (spec-authoring input)` | *"The remount severity law … **must not be inherited by F.W4** as present grades"* — an explicit NEGATION |
| 2 | `fr-PathPreview PP-AGGLOM` (:69) | **F.W4** <sub>legs: NO-WAVE-OWNER, SS-3, SS-4</sub> | `**INFO → NO-WAVE-OWNER** (M-25 intake strike-list, SS-3/SS-4)` | *"Intake MUST strike at agglomeration **or F.W4 double-books**."* — a warning ABOUT F.W4 |
| 3 | `fr-Tooltip FR-TT-22` (:56) | **F.W2** <sub>legs: NO-WAVE-OWNER</sub> | `**NO-WAVE-OWNER.**` (terminal, sole) | *"A **zero-cost row on the F.W2 ledger** — a negative budget statement."* — a statement that it costs F.W2 nothing |
| 4 | `fr-UserSlugBar FR-USB-38` (:81) | **F.W2** <sub>legs: NO-WAVE-OWNER</sub> | `**NO-WAVE-OWNER.**` (terminal, sole) | *"**do NOT book this component into the F.W2 migration surface**"* — an explicit PROHIBITION |
| 5 | `fr-PaperSearchInput D-i2` (:82) | **F.W1** <sub>legs: NO-WAVE-OWNER, SS-3, SS-4</sub> | `**NO-WAVE-OWNER** — SS-3/SS-4 spec-authoring input.` | *"(banked **MISS-A6, F.W1 token re-ink**)"* — a citation of a DIFFERENT banked id's routing |

**The positive control, which proves the rule is applicable and was simply not applied here.** `fr-CollapsibleSection m-4` (:61) genuinely carries both: ⟨cmd⟩ `/usr/bin/sed -n '61p' fr-CollapsibleSection.md` → *"→ **F.W3/W4** (gap + shrink-0 land with the first consumer) + **NO-WAVE-OWNER** (the A-3-new re-argument, SS-3/SS-4 census input)."* Its arrow names F.W3/W4 first, so canonical **F.W3** with NWO as a leg is CORRECT. The five above have no such arrow.

**Consequence, measured.** The F-side NO-WAVE-OWNER packet population is understated by five: the drain's canonical operand is **65, not 60**; `F.W1` is inflated by 1, `F.W2` by 2, `F.W4` by 2. `PP-SEVLAW` and `FR-USB-38` are the sharpest — the canonical homes each at the exact wave its record forbids in bold.

**This is the mirror of P4-1's atomiser.** That defect manufactured identities by splitting tokens; this one manufactures ROUTINGS by capturing tokens that are prose, negations or foreign-id citations. Both are position-blind scans over a line that rule §0.1 was written to constrain. §0.2 promises *"every routing token is the record's own"* — for these five it is the record's own token quoted in the record's own refusal.

**Cure (canonical, by amendment — not a re-cut detector).** Make §0.1's arrow clause operative rather than advisory: a wave token is a ROUTING only where it is named by the row's routing arrow or terminal-disposition span; a token inside prose, a negation, a warning, or a parenthetical citing another banked id is **not** a routing and books no leg. Re-derive the five rows to `NWO (packet)` / `NWO→SS-3` as their dispositions state, re-base §2's `F.W1`/`F.W2`/`F.W4`/`NWO*` rosters and §3's totals by −1/−2/−2/+5, and carry a dated §0.3-style note at each record. **F-W10's drain verbs need no change — the spec already books all five correctly.**

**Standing note for the pass-5 union.** The class is not proven confined to five: the audit sampled five records of sixty-six. A full re-derivation restricted to the arrow clause is the honest next act, and it is a CANONICAL act — R4-3's *"a gate that disagrees with this file re-derives against it or amends it by ruling"* points there and not at any wave spec.

### §3.3 INFO — a third-party arithmetic slip, recorded so it is not inherited

`PASS-4/RULINGS-4.md` R4-10's roster table prints the packet line as `GLASS-RELAY 22 · NWO 29 · NWO→SS-3 25 · NWO→SS-13 3 · NWO→SS-5 3 · **SS-\* 178** · TERMINAL 1190 · UNROUTED 307`, which sums to **1757** against the same ruling's parenthetical **1745**. The canonical's own `SS-*` rows sum to **166** (5+138+7+9+3+2+1+1), not 178, and with GLASS-RELAY's 22 the packet block is 1745 exactly. **The canonical is right; RULINGS-4's summary line is off by 12.** Filed here so no pass-5 seat quotes the ruling's line as a denominator. Neither the canonical nor F-W10 quotes it.

---

## §4 AXES (3), (4), (5) — the passing axes, with what was actually tested

### §4.1 M-25 depth — HOLDS WITH ONE GAP (D-5)

Locks are keyed to banked ids throughout and none is re-booked, re-graded or renamed: `AA-45`/`-46`/`-47`'s one-home ruling with the direction stated at this end (R3-6.1), `FR-AUL-46` "stays cured and is re-booked by nobody", `HLG-32 · MISSED-2` folded to `FR-COB-8`/`-12` with novelty struck at the register, `FR-CP-43` folding ONTO `fr-BasisCanvas L §R5-7` with the fold direction read off the corpus rather than asserted, `L:L-16` → `L-19` with the fold source and fold target holding one row each. Aliases ride beside heads and match the canonical's alias columns byte-for-byte at every sampled row. Record-qualification is applied to `M-16` ×2, `i-5` ×2, `i-1` ×2, `D-i2` (7 records), `m-4` (17), `MISSED-2` (3) and `L-19` (16, newly disclosed at round 4). `R2-missed-1` and `R1-MISSED-5` are restored from round 3's bare roster numbers with the fr-UserSlugBar lowercase-alias guard attached. **The one gap is `L-16` (§1.7), and it is load-bearing because it hides D-1.**

### §4.2 Gates — HOLDS

Twelve gates (⟨cmd⟩ `/usr/bin/grep -cE '^\| \*\*G-F10-[0-9]+\*\*' F-W10.md` → **12**), each born RED with a measured witness, one honestly SPLIT (G-F10-12) rather than averaged.

- **Canonical operands only.** G-F10-7's operand is the 66 records with the canonical as census; §4b's X-whole row re-based at R4-3 with the corpus/census distinction spelled out; the superseded `CENSUS-2026-08-03.md` demoted to provenance with all four of its surviving citations audited as provenance-or-decision cites, none a denominator. No second census operand appears anywhere in the file.
- **Reachable GREEN.** Every falsifier names a state a wave can reach: rows in INBOX with verbs (G-F10-1), a fourier-side INBOX with ≥1 row (G-F10-2), `max|Δ| < 1e-3` re-measured at open (G-F10-3), `npm ls` exiting 0 in both trees (G-F10-4), the register file existing with every §2.6 carry rowed (G-F10-5), `diff`-empty plus 26 cuts (G-F10-6), 89 terminal verbs (G-F10-7), the charter line in corrected wording plus owner rulings (G-F10-8), an addendum-beside with an empty `git diff --stat` (G-F10-9), an axe run or a named dated waiver (G-F10-10), the dist parsing or the pin moving (G-F10-11), a grep-able packet per declared arm (G-F10-12). None is a proof-farm script; none rests on a peer actor's action as an acceptance condition — G-F10-1's own falsifier forbids exactly that.
- **Portable.** Every published gate command runs on the pinned binary; the `\|` table escape is disclosed once at §2.5a and unescapes correctly; `$BOIL`/`$ROW`/`$STRICT`/`$V`/`$F`/`$FA`/`$C`/`$O` are each declared in the block that consumes them (R4-2.3 discharged — verified by re-running E-4's two receipts from the declared `$V`).
- **No self-count is banked as an operand.** E-19's conversion holds: the four section-extraction commands are marked as an instrument with a shelf life, the escape test's result is stated as a classification, the PP probes are `grep -lo` word-output over filenames, and G-F10-11's former `grep -c … F-W10.md` is struck and re-stated as a classification.

### §4.3 Posture — HOLDS

| clause | finding |
|---|---|
| **F.W1 transaction whole** | §4a.3 and §2.7 both cite the **TWELVE-limb roster chartered at F-W1 §4 step 4** by ⟨cmd⟩ (`grep -n "The roster is" waves/F-W1.md`), never restated; "ELEVEN-limb" named superseded at E-15. No three-limb restatement anywhere. ✔ |
| **W7 ∅ closed** | true at the corpus and independently re-run here (2 `F.W7` hits, both `KF.W7`); F-W10 mints no F.W7 row and claims none. ✔ |
| **SS-4 flags** | §2.3's SS-4-PREREQ row and §4b's F.W5–W8/SS-4 edge flag all seven owner rulings INLINE with the trie-vs-KISS guardrail recorded as INCUMBENT and the dissent preserved; §5 excludes owner acts as "FLAGGED INLINE, never presumed, never pre-answered". Nothing pre-answered. ✔ |
| **tree READ-ONLY** | §1a writes gated on the begin-word; §1c excludes all product source in both trees, `package.json`, `scripts/dev/dev.sh`, the fourier sub-session and every producer tree; §5 excludes "Any edit to `registry/adjudicated/fr-*.md`"; G-F10-6's falsifier is "**ANY edit to `fr-*.md`**". ✔ |
| **status planned** | ⟨cmd⟩ `grep -c 'status: planned'` → **1**; §5 excludes "any status advance beyond `planned`". ✔ |
| **zero VERIFIED** | ⟨cmd⟩ `grep -noE 'VERIFIED \*\*(YES\|NO)\*\*'` → `9:VERIFIED **NO**`, sole occurrence. IMPLEMENTED **NO**. ✔ |
| **RULINGS-4 applied** | R4-1.12 ✔ (band re-cut, verified §2.3) · R4-2 ✔ (toolchain swept, variables declared) · R4-3 ✔ (canonical sole operand) · R4-4.4 ✔ (round-3 pipeline revoked) · R4-7.1 ✔ (5/5 byte-true) · R4-7.3 **partial — §4a.13's `13` stale (D-4)** · R4-8.3 ✔ (sha pin reproduces) · R4-9.3/9.4 ✔ · R4-10 ✔ (roster from the canonical, ids restored). |

---

## §5 THE WORST-20 DEFECT REGISTER

| # | sev | claim | receipt |
|---|---|---|---|
| 1 | **HIGH** | §2.5b's escape test **"60 present · 0 missing"** does not reproduce as a by-name test: `fr-ExportModal L-16` (canonical `NWO (packet)`) is neither booked nor cited; the record is named 0 times. `grep -qF` on a 4-char id manufactured the sixtieth presence — the file's own convicted class re-created inside the cure that names it | `/usr/bin/grep -cF 'ExportModal' waves/F-W10.md` → **0**; boundary probe `(^\|[^A-Za-z0-9])L-16([^A-Za-z0-9]\|$)` → **9 hits, all fr-UserSlugBar's alias or `L:L-16`**; canonical row `` \| `L-16` \| — \| `NO-WAVE-OWNER` \| **NWO (packet)** \| `` |
| 2 | **HIGH** | §2.5b's fabrication test asserts a universal — *"every id-bearing cell of this file must be a citation, and one is not"* — but was run over §2.2 alone; §5's enumeration *"The **three** §2.2 canonical divergences"* omits **`PAW-50` → F.W4 ⟨re-cut⟩ against canonical F.W9** | `awk '/^### fr-PaperArticleWindow /,/^### fr-PaperSearch /' "$C" \| grep -F '\`PAW-50\`'` → `` \| `PAW-50` \| — \| `F.W9/W10` \| **F.W9** \| ``; `grep -c 'PAW-50.*canonical\|canonical.*PAW-50' F-W10.md` → **0** |
| 3 | **MEDIUM** | §2.5b's *"its rows are terminal dispositions over rows the canonical homes at a **PACKET**"* is false for 5 of §2.5a-iii(c)'s 14 — `PP-AGGLOM`/`PP-SEVLAW`→F.W4, `FR-TT-22`/`FR-USB-38`→F.W2, `D-i2`→F.W1. The spec is right at the bytes and the canonical is wrong (CANON-1), but the conflict with the stamped sole operand is undisclosed | canonical §1 rows for all five, re-run and pasted at §1.5/§3.2 |
| 4 | **MEDIUM** | §4a.13 — the clause headed *"binding on this file against itself"* — publishes **89 rows** over `23 ⊕ 36 ⊕ 16 ⊕ **13** = 88`. The round-4 13→14 landing reached §2.5a-iii, §5 and G-F10-7 and not here; third consecutive round of the E-13/E-22 shape | `grep -o "§2.5a-iii's 1[34]" F-W10.md` → **`14` · `14` · `13`**; instrument re-run → **23 · 36 · 16 · 14** |
| 5 | **MEDIUM** | M-25 gap: `L-16` is a **six-record banked-head homonym** (one of them, fr-ExportModal's, inside this wave's own roster) and appears in F-W10 only as fr-UserSlugBar's ALIAS on `FR-USB-38` — un-guarded, while `D-i2`(7), `m-4`(17), `L-19`(16), `MISSED-2`(3), `M-16`, `i-5`, `i-1` all carry guards. The unguarded token is the mechanism of defect 1 | `grep -n '^\| \`L-16\`' CENSUS-CANONICAL.md` → **6 banked heads**; `grep -l 'L-16' fr-*.md \| wc -l` → **25 records** |
| 6 | **LOW** | `MISS-5` (canonical `NWO→SS-5` head id) is carried only inside §2.5a-iii(d)'s weak enumeration as *"(restatement of FR-GIG-20)"* and counted among the 26 cited-elsewhere. A packet-homed head id disposed only as another id's restatement is a citation by demotion; disclose the relation or book it | `grep -nF 'MISS-5' F-W10.md` → 2 hits, both §2.5a-iii(d); canonical `- **fr-GalleryInfiniteGrid** (2): \`FR-GIG-20\` · \`MISS-5\`` |
| 7 | **INFO** | Environmental hazard for successor seats: on this host a bare `grep` is a shell function wrapping `ugrep 7.8.4`, which returns **0** for `-cE '(^\|[^A-Za-z0-9])C-18([^A-Za-z0-9]\|$)'` where `/usr/bin/grep` returns **2**. R4-2's pin is BSD `/usr/bin/grep`; every receipt must name the binary by absolute path or the engine is not the pinned one | `type grep` → shell function → `ARGV0=ugrep`; `grep -cE '(^\|…)C-18(…\|$)' F-W10.md` → 0 vs `/usr/bin/grep …` → 2 |

*(Register closes at 7. No further finding survived verification: 41 of 41 receipts reproduce, 15 of 15 anchors resolve, 5 of 5 byte-true pastes are exact, the 165-line partition closes, and axes 3–5 hold.)*

### §5.1 FILED AGAINST `CENSUS-CANONICAL.md` (not against this spec)

| # | sev | claim | receipt |
|---|---|---|---|
| C1 | **HIGH** | **PROSE-TOKEN CAPTURE**: five rows are homed at a wave token their own routing arrow never names — three of them at the wave their record explicitly forbids. `PP-SEVLAW`→F.W4 (*"must not be inherited by F.W4"*), `PP-AGGLOM`→F.W4 (*"or F.W4 double-books"*), `FR-TT-22`→F.W2 (*"a zero-cost row on the F.W2 ledger"*), `FR-USB-38`→F.W2 (*"do NOT book this component into the F.W2 migration surface"*), `D-i2`→F.W1 (the token is inside a citation of `MISS-A6`). §0.1's HOME clause — *"the first wave token its own arrow names"* — was not applied | `sed -n '70p' fr-PathPreview.md` · `'69p'` · `sed -n '56p' fr-Tooltip.md` · `sed -n '81p' fr-UserSlugBar.md` · `sed -n '82p' fr-PaperSearchInput.md`, all pasted at §3.2; positive control `sed -n '61p' fr-CollapsibleSection.md` shows the rule applied correctly where an arrow exists |
| C2 | **MEDIUM** | Consequence of C1: the F-side NWO packet population is understated by **5** (the drain's canonical operand is **65**, not 60) and `F.W1`/`F.W2`/`F.W4` are inflated by 1/2/2. Every count in §2 and §3 that touches those four homes carries the error | derived from C1's five rows against §2's rosters |
| C3 | **INFO** | Scope caveat, stated against interest: the class was found in a five-record spot audit of sixty-six. It is not proven confined to five. A re-derivation restricted to the arrow clause is a CANONICAL act (R4-3), not a wave's | — |
| C4 | **CLEAR** | Arithmetic control PASSES: declared = §1 rows = §2 membership for all five spot-audited records (53/31/60/50/53), and §3 closes at 2524 + 1745 = **4269** | §3.1 |
| C5 | **INFO** | `PASS-4/RULINGS-4.md` R4-10's packet line prints `SS-* 178`, summing to 1757 against its own parenthetical 1745; the canonical's `SS-*` rows sum to **166**. The canonical is right; the ruling's summary line is off by 12. Recorded so no pass-5 seat quotes it as a denominator | §2 rosters summed: 5+138+7+9+3+2+1+1 = 166 |

---

## §6 WHAT THIS ROUND ACTUALLY ACHIEVED, AND WHERE IT STOPS

Round 4 is the first round of this file in which **the receipts are true**. Four generations of false-at-write receipts — E-3's unperformed retirement, E-4's phantom `$V`, E-11's self-staling coordinate paste, E-21's band pipeline that could not print its own number — are terminated, and this seat could not break one of the forty-one it re-ran. The 165-line partition is the strongest artefact the F-side has produced: it exhausts its operand, its arithmetic closes, and a hostile re-run reproduces every class and both record counts. The census freeze did what a freeze is for.

**What it did not do is close the census axis, and the reason is instructive.** Both HIGH defects are the same defect wearing round-4 clothes: **a test whose result was published without its probe being adversarial to itself.** The escape test used `grep -qF` on ids as short as four characters, in a file that carries six-record homonyms; the fabrication test claimed the whole file and measured one section. Neither is a false receipt — both commands run and both print what the file says they print. They are **sound commands answering the wrong question**, which is the successor form of the class this file has now convicted five times and named four: *a receipt is not the number it prints — it is the command that prints it*, and round 5's addition is that **a command that prints truly can still be measuring the wrong thing**. The cure for both is one line each and neither touches the shared §2.2 splice bytes.

**And the canonical is now the larger risk.** The stamp that ended four rounds of detector-oscillation carries a systematic routing defect that inverts five records' plain instructions — twice at a bold prohibition. Because R4-3 makes the canonical the sole operand *and* forbids a wave from re-cutting a detector, no wave spec can fix it; only an amendment can. **A wave that is right at the bytes and wrong against the census is the exact failure mode a sole-operand rule creates**, and F-W10 §2.5b is standing in it right now — booking five rows correctly while asserting a property of the census that the census does not have.

**Sequencing recommendation for the pass-5 union.** The canonical amendment (C1) lands FIRST — it changes F-W10's roster from 60 to 65 and moots part of D-3. Then D-1's fold sentence and re-cut probe, D-4's one character, D-2's scope sentence and `PAW-50` row, D-5's `L-16` guard. None of the five needs a paired edit; none opens product source; none re-books, re-grades or renames an id. **The wave's dispositions are sound. Its census claims are not yet.**

---

*Read-only everywhere except this file. Every ⟨cmd⟩ above was run by this seat on `bash` + BSD `/usr/bin/grep` 2.6.0-FreeBSD / `/usr/bin/sed` / `/usr/bin/awk`, with the binary named by absolute path, and every one is re-runnable from the command as printed. No id is re-booked, re-graded or renamed by this check. `PASS-3/CLOSE-CERT.md` is cited nowhere as an operand; `PASS-4/CLOSE-CERT-2.md` is read as a register. Two-key rule DISCHARGED for R4-1.12 · R4-2.3 · R4-7.1 · R4-7.3 · R4-8.3.*

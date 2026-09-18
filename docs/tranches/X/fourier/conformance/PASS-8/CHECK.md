# X·F CONFORMANCE PASS 8 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18 / L-20)

**Seat**: X·F pass-8 hostile check, 2026-08-29. **Operand**: the eleven `waves/F-W*.md`, `conformance/CENSUS-CANONICAL.md` (the sole census operand), `conformance/PIN-PURGE-CERT.md` incl. §ERRATA-R7, `conformance/PASS-7/SEAL.md`. **Corpus**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`, carrying `F-W1-CARRY` + `F-W4-CARRY` only.

**Toolchain**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, absolute `/usr/bin/grep` throughout, BSD `awk` · `sed` · `sort` · `shasum` · `git`, `python3` for the set derivations. **Base named per command.** This seat wrote exactly one path: this file.

---

## §0 THE VERDICT IN ONE PARAGRAPH

**NOT CONFORMANT — one HIGH.** The hash gate passes 13 of 13. **Axis 1 closes perfectly**: the canonical re-derives at ROWS **4242** · WAVE-DUTY **2466** · TERMINAL **1220** · UNROUTED **307**, all 23 §2 blocks agree header = per-record `(n)` sum = live token count = §1 bucket, and the §1↔§2 membership diff returns **ZERO escapes in both directions**. The 49 E6-3 re-homes are **all 49 at their new disposition** (48 TERMINAL, 1 UNROUTED), reproducing E6-3's delta cell exactly, with **zero live bookings** anywhere in the eleven specs and both transcribed registers reconciling 0/0/0. Fabrication is **ZERO**. The census-pin sweep is **clean**. Eight of the pass-7 register's nine items are **CLOSED at the bytes**. **The ninth — the BLOCKER — is only partly closed.** The six wave-duty roster denominators were re-based and re-run correctly, but **the F.W5-band denominator was not**: `F.W5` **28** ⊕ `F.W5-W8` **90** = **118** survives at **twelve live, current-voice sites across three specs** — including **F-W5's declared §2 Operand, G19's gate cell and G19's run instruction**, and **two published ⟨cmd⟩ receipts in F-W6 that return EMPTY when re-run**. The canonical reads **27 ⊕ 89 = 116**. `F-W5:9` quotes the canonical's own stamp — *"a gate that cites another census operand is DEFECTIVE on sight"* — and the same file's G19 then cites one.

---

## §1 FIRST ACT — THE HASH GATE: **PASSED, 13 of 13.**

⟨cmd⟩ this seat, base repo root `/Users/mkbabb/Programming/value.js`:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

Diffed cell-for-cell against `PASS-7/SEAL.md` **§8**'s thirteen-row table. **All thirteen byte-identical, full 64-hex:**

| # | file | first-12 | ✔ |
|---|---|---|---|
| 1 | `waves/F-W0.md` | `c03149fc2f9e` | ✔ |
| 2 | `waves/F-W1.md` | `d03e07468c74` | ✔ |
| 3 | `waves/F-W10.md` | `d97a0123bf99` | ✔ |
| 4 | `waves/F-W2.md` | `655a21e7a64d` | ✔ |
| 5 | `waves/F-W3.md` | `bfa4278c5599` | ✔ |
| 6 | `waves/F-W4.md` | `0932ced1a4c0` | ✔ |
| 7 | `waves/F-W5.md` | `2990f5b51056` | ✔ |
| 8 | `waves/F-W6.md` | `f16b290bcf62` | ✔ |
| 9 | `waves/F-W7.md` | `16e35d5bb571` | ✔ |
| 10 | `waves/F-W8.md` | `0d464a4a7d3a` | ✔ |
| 11 | `waves/F-W9.md` | `4972f6a41832` | ✔ |
| 12 | `conformance/CENSUS-CANONICAL.md` | `f443627574581` → `f44362757458` | ✔ |
| 13 | `conformance/PIN-PURGE-CERT.md` | `4fc65bbd1d9b` | ✔ |

**Nothing moved between the seal's last byte and this seat's first. `hashesClean = true`.**

---

## §2 AXIS 1 — THE ROSTER: **CLOSED. ZERO ESCAPES, BOTH DIRECTIONS.**

### §2.1 The three-way close, re-derived by this seat (not read from any check)

⟨cmd⟩ this seat, `python3`, base `conformance/`. §1 parsed as per-record tables (banked head + terminal **home** cell, pipes masked inside backtick spans); §2 parsed as per-block rosters with `~~…~~` and `<sub>…</sub>` stripped.

```
§1 rows 4242   records 66   unparsed home cells 0
blocks with  §2hdr == per-record (n) sum == live token count == §1 bucket :  23 / 23
FORWARD  §1 -> §2 membership escapes : 0
REVERSE  §2 -> §1 membership escapes : 0
§2 header sum = 4242   §1 rows = 4242   equal: True
```

**Per-record declared-vs-counted mismatches across all 66 records: `[]`. Declared sum 4242.**

### §2.2 The boundary-exact subtraction at the POST-E6 totals

| quantity | this seat | required |
|---|---|---|
| ROWS | **4242** | 4242 ✔ |
| WAVE-DUTY (`F.W*` headers) | **2466** | 2466 ✔ |
| TERMINAL (∅) | **1220** | 1220 ✔ |
| UNROUTED | **307** | 307 ✔ |
| residue (SS-1..7 · SS-13 · NWO · NWO→SS-3/5/13 · GLASS-RELAY) | **249** | — |

`4242 − 2466 − 1220 − 307 − 249 = ` **0**. **IT CLOSES AT ZERO.**

Wave-duty decomposition, re-derived: `F.W0 55 · F.W1 330 · F.W2 23 · F.W3 919 · F.W4 1007 · F.W5 27 · F.W5-W8 89 · F.W9 16` = **2466**.

⊘ **Four §1 rows and one §2 block initially read as anomalies and all five were this seat's parser, not the file.** Rows `:472` `:1007` `:1019` `:1589` carry an unescaped `|` inside a `<sub>` quotation of a record's own table row; masking pipes inside backtick spans resolves all four to `**F.W0**`×3 and `**F.W4**`×1, which is what §2 homes them at. The `F.W9` block appeared to over-run because the header regex did not admit `### GLASS-RELAY` / `### NWO (packet)`. **Both corrected before grading; neither is a defect and neither is reported below.** *(Recorded so a successor does not re-file them.)*

### §2.3 The 49 E6-3 re-homes — **all 49, at both sites**

⟨cmd⟩ this seat, `python3`: every §1 row carrying `errata R6 E6-3`, record resolved from the enclosing `### fr-` header, old home parsed from the row's own `read home **F.Wn**` clause.

```
E6-3 rows found: 49
by NEW disposition: TERMINAL 48 · UNROUTED 1
by OLD home:  F.W1 28 · F.W3 9 · F.W4 5 · F.W2 4 · F.W0 2 · F.W5 1
```

**This reproduces E6-3's published delta cell exactly** (`F.W0 −2 · F.W1 −28 · F.W2 −4 · F.W3 −9 · F.W4 −5 · F.W5 −1 · TERMINAL +48 · UNROUTED +1`), and the single UNROUTED is `fr-GalleryCardModal K-2`, the identity fold E6-3 names.

**Nineteen read individually at the canonical site**, spanning all six old homes: `fr-AdminFlaggedPanel K1` `:393` · `fr-AnimationControls K-13` `:591` · `fr-App K-9` `:668` · `fr-BasisCanvas K-1` `:839` · `fr-GalleryView K11` `:3367` · `fr-PaperArticleWindow K-24` `:3990` · `fr-SliderControl K-3` `:4488` · `fr-BasisSelector K-12` `:920` · `fr-ConvergenceTimeline K-6` `:1715` · `fr-EasingCurvePreview K-11` `:1830` · `fr-ConvergenceLegend K-7` `:1551` · `fr-ConvergencePlot K-11` `:1654` · `fr-EquationView K-5` `:2275` · `fr-GalleryView K7` `:3363` · `fr-ContourPreview KILL-3` `:1386` · `fr-EquationResult K-10` `:2179` · `fr-SpeedSelect K-11` `:4551` · `fr-ConvergencePlot K-13` `:1656` · `fr-GalleryCardModal K-2` `:2944`. **Every one reads `**TERMINAL (∅)**` (or `**UNROUTED**` for K-2) with the E6-3 `<sub>` citation.**

**The spec side, at the bytes** — the four non-register-shaped specs read one line at a time: `F-W2:374` `:379` `:385` `:386` (all four `~~…~~ — **CITED, NOT BOOKED** | F.W2 → **TERMINAL (∅)**`) · `F-W0:248` (`~~· K7 (= L-13) → row 15 fold list~~` ⊕ note) · `F-W4:315` `:317` `:319` (three struck bookings ⊕ notes) · `F-W5:288` and the `F7` lock cell `:226` (both struck, the lock re-stated to *"carries NO canonical F.W5 row and books none"*). **The register-shaped pair is proven mechanically below rather than by sampling.**

### §2.4 The reverse register diff — **the instrument §4.2 was filed on, re-run with no special case**

⟨cmd⟩ this seat, `python3`: parse each spec's transcribed register (`^- **fr-X** (n): …`), **strip `~~…~~` and `<sub>…</sub>`**, diff record-for-record and id-for-id against the live canonical block.

| register | records | spec BOOKS / canonical does NOT home | canonical HOMES / spec lacks | `(n)` mismatches | live-id sum |
|---|---|---|---|---|---|
| `F-W1` §6·R4 vs canonical `F.W1` | 65 = 65 | **0** | **0** | **0** | **330 = 330** |
| `F-W3` §X.1-v5 vs canonical `F.W3` | 59 = 59 | **0** | **0** | **0** | **919 = 919** |

⊕ **Corpus-wide live-booking hunt over the 49**: every register-shaped line in all eleven specs, strikes and sub-notes stripped, tested against the 49 `(record, id)` pairs → **0 live bookings.** *(A naive whole-file token scan returns 365 "live" hits; every one is a cross-record collision — `K-1` alone is shared by five records — or prose. Under each spec's own citation rule an id spelled outside the register is a citation. The register is the booking surface and it is clean.)*

**§4.2 (HIGH) and §4.3 (HIGH) of pass 7 are CURED. `rosterEscapes = 0`. `fabricated = 0`.**

### §2.5 Fabrication probe on the one enumeration that is not a register — `F-W5` §2c

The `F.W5`-band enumeration is a table, not a register, and it uses suffix elision. Parsed with elision expansion and diffed against the canonical band:

```
canonical band (F.W5 ⊕ F.W5-W8) : 116
F-W5 enumeration: 43 rows, declared (n) sum : 116
```

**The declared sum is 116 — the canonical LHS, exactly.** The 15 raw "fabrication" hits and 2 raw "escape" hits are all parser artefacts of the slash-combined spelling (`D-7 / C·I-2`, `D-14 / MIN-4 / …`), of prose fragments inside `fr-PaperSearchDropdown`'s row, and of two tokens the row's own words exclude (`C-28` — *"its `C-28` body-mention books nothing"* — and `FR-NP-30b` — *"rides beside it"*). **Real fabrications: ZERO. Real escapes: ZERO.** §2c's published `booked 113 · cited 3 · escaped 0` sums to 116 and is sustained.

---

## §3 AXIS 2 — THE PASS-7 REGISTER, ITEM BY ITEM

| # | pass-7 item | grade | status at these bytes |
|---|---|---|---|
| 1 | §4.1 stale record-side denominators | BLOCKER | **PARTLY CLOSED — see §4.1.** Six wave-duty rosters re-based and re-run correct; the **F.W5-band denominator is not**. |
| 2 | §4.2 47 of 49 still booked | HIGH | **CLOSED** — §2.4, 0/0/0 both registers, 0 live bookings corpus-wide |
| 3 | §4.3 D-7 band spelling spec-side | HIGH | **CLOSED** — `grep -c 'FM-4..FM-16 (13 ids)' F-W1.md` → **1**, and that one is the E-3 quotation of the defect at `:548`; the register diff matched with no special case |
| 4 | §4.4 census pin `3e0a9acb3381` live at 39 sites | HIGH | **CLOSED** — see §5.2. Live pins of a superseded digest: **ZERO** |
| 5 | §4.5 LW-1 `forty-three` → 42 | LOW | **CLOSED** — appended at §ERRATA-R7 `:247`, SUSTAINED; R7 ▲ figure re-run: **77 sites / 83 occ / 11 specs** ✔ |
| 6 | §4.5 LW-2 `6 digests` → 5 | LOW | **CLOSED** — per-digest re-run: 5 survive (`a89c3386f3f8` 3 · `a1302689aaa3` 1 · `5cc3346db23e` 1 · `39e1a60b3fc9` 2 · `bb58dc400cff` 1) in **8 occurrences across {F-W0, F-W1, F-W3, F-W9} = 4 specs**; the other five extinct ✔ |
| 7 | §4.5 LW-3 false corpus-wide universal | LOW | **CLOSED** — `grep -n 'Every :NNN address'` → **no hit**; restated as the enumerated truth at `:289` |
| 8 | §4.5 LW-4 `five struck halves` → four | LOW | **CLOSED** — `:44` carries **11** tokens; `:48` `:49` `:50` `:52` carry one each = **4**; `:51` carries none (`grep` re-run). `11 ⊕ 4 = 15`, the row's published total ✔ |
| 9 | §4.6 E6-2's universal over-reaches | LOW | **CLOSED** — `CENSUS-CANONICAL.md:179` now reads `~~The malformed spelling is now absent from this file.~~` ⊕ an R7 `<sub>` restating it as *"absent from every **census row**"* with the two surviving sites enumerated ✔ |

**Eight of nine CLOSED. One partly closed, and its residue is this pass's only HIGH.**

---

## §4 THE FINDINGS

### §4.1 · **HIGH — the F.W5-band census operand is STALE at twelve live sites in three specs, including two gate cells and two ⟨cmd⟩ receipts that return EMPTY.**

**The canonical, frozen at `f44362757458`:**

```
5078:### F.W5 — **27 rows** *(errata round 6, 2026-08-29: read 28; `fr-ConvergencePlot K-13` → TERMINAL at E6-3)*
5092:### F.W5-W8 — **89 rows** *(errata round 5, 2026-08-29: read 90; `C:C-23` → UNROUTED at E5-15)*
```

`27 ⊕ 89 = ` **116**, and this seat re-derived the band membership set independently: **exactly 116 `(record, id)` pairs.**

**The two receipts that do not reproduce.** `F-W6.md:19` is a numbered posture declaration in current voice — *"**THE RECORD-SIDE DENOMINATOR OF THE BAND IS THE CANONICAL'S, NOT THIS FILE'S.**"* — and publishes its own commands with quoted outputs. ⟨cmd⟩ this seat, base `conformance/`, verbatim from the line:

```
/usr/bin/grep -o '^### F\.W5 — \*\*28 rows\*\*'    CENSUS-CANONICAL.md   →  (NO OUTPUT)
/usr/bin/grep -o '^### F\.W5-W8 — \*\*90 rows\*\*' CENSUS-CANONICAL.md   →  (NO OUTPUT)
```

**Both return empty. The line publishes them as returning `"### F.W5 — **28 rows**"` and `"### F.W5-W8 — **90 rows**"`, and then derives `**118 record-side rows in the band**`.** The true figure is 116.

**The twelve live sites** (liveness tested mechanically — outside `~~…~~`, outside `<sub>…</sub>`, outside `⟨…⟩` chase notes):

| spec:line | the text | why it bites |
|---|---|---|
| `F-W5:95` | *"the same one **G19 now runs on**: … §2's `F.W5` **(28)** ⊕ `F.W5-W8` **(90)** rosters, verbatim"* | names G19's operand |
| `F-W5:99` | `## 2. Carry — … (the canonical F.W5 band: **28 ⊕ 90 = 118** record-side rows)` | section heading |
| `F-W5:101` | `**Operand**: … the `F.W5` roster **(28)** ⊕ the `F.W5-W8` roster **(90)**, adopted verbatim` | **the wave's declared operand** |
| `F-W5:381` | **G19's gate cell** — *"the CANONICAL F.W5 band — … `F.W5` roster **(28)** ⊕ `F.W5-W8` roster **(90)** = **118** record-qualified rows, verbatim — **and nothing else**"* | **a gate citing a superseded operand** |
| `F-W5:427` | **G19's run instruction** — *"run the set-difference both directions — the CANONICAL F.W5 band (… `F.W5` **28** ⊕ `F.W5-W8` **90** = **118** rows), verbatim — that roster ALONE"* | tells a runner to run a roster that does not exist |
| `F-W6:19` | the two non-reproducing ⟨cmd⟩ receipts ⊕ *"**118 record-side rows in the band**"* | receipt reality |
| `F-W6:476` | *"all three inside the canonical's **`### F.W5 — **28 rows**`** roster"* | quotes a header that is not there |
| `F-W6:526` | **gate `FW6-G17`** — *"with the band's own record-side denominator at **F.W5 = 28 rows · F.W5-W8 = 90 rows**"* | **second gate on a superseded operand** |
| `F-W8:78` | *"beside the canonical's **§2 `F.W5` (28 rows)**"* | and the same line correctly carries **89** for the band — internally split |
| `F-W8:246` | *"and **§2 `F.W5` (28 rows)**"* | same |

⊘ **The file convicts itself by its own quoted law.** `F-W5:9` opens by quoting the canonical's stamp — *"a gate that cites another census operand is DEFECTIVE on sight"* — and `F-W5:381`/`:427` are gate cells citing one.

⊘ **Why HIGH and not BLOCKER, stated exactly.** The *derivations* are all correctly re-based: §2c's LHS reads **116**, the enumeration table's declared `(n)` sum is **116**, the published result `booked 113 · cited 3 · escaped 0` sums to 116, and the fabrication probe at §2.5 returns zero both ways. **No booking, no home, no identity and no subtraction is wrong.** What is wrong is the *stated operand* at twelve sites, in two gate cells and two receipts. It is a citation-and-label defect at gate altitude, not a roster defect.

⊕ **Why the round-7 reconcile missed it, and why the seal certified it clean.** `PASS-7/SEAL.md` §2.2's row for `F-W5` reads *"`28` inside the chase notes only ✔"*. **That is false at the bytes** — `:95` `:99` `:101` `:381` `:427` carry it live. The seal's probe searched the `**28 rows**` spelling; every surviving site spells it `(28)` or `28 ⊕ 90`. **A spelling-restricted detector, which is the exact class `F-W6:526`'s own R2-9 decree calls *"DEFECTIVE at authoring, whatever its result"*.** Filed once here, not twelve times.

**Cure shape, bounded:** twelve string sites, `28 → 27` · `90 → 89` · `118 → 116`, each with a dated chase note in the established idiom; ⊕ `F-W6:19`'s two ⟨cmd⟩ quoted outputs re-cut. **Zero census cells, zero registers, zero bookings, zero counts of anything else.**

### §4.2 · **MEDIUM — `F-W5:265` states a false universal about the very figure §4.1 finds live five lines away.**

> `F-W5:265` — *"The superseded **"booked-or-cited = 118"** survives only inside this note."*

**Falsified in its own file**: `:95` `:99` `:101` `:381` `:427`. The clause is in current voice and is the sentence a successor would rely on to conclude the re-base was total. **Mitigation**: the same line publishes the correct `27 ⊕ 89 = 116` LHS and the correct `113 + 3 = 116` result, so a reader who checks rather than trusts is led to the right number.

### §4.3 · **MINOR — `F-W4:317`'s singles arithmetic was half re-based and now contradicts its own section header.**

Three figures on one page, two re-based at round 7 and one not:

```
F-W4:315  **(b) THE ESCAPES, BOOKED BY BANKED ID — 71 rows on 17 records**
            ⟨re-based at round-7 reconcile, 2026-08-29: read 72; fr-ContourPreview KILL-3 re-homed TERMINAL per E6-3⟩
F-W4:317  - **The singles — eight rows on eight records (8)** ⟨re-based … read nine/9⟩
F-W4:317  ⊘ **The nine sum with the eight record-groups above to 20+17+7+7+4+3+3+2+9 = 72**
```

⟨cmd⟩ this seat, base `waves/`: the summing sentence is **not** inside `~~…~~` (`grep -c '~~.*The nine sum.*~~'` → **0**) and **not** inside a `<sub>` (→ **0**). `20+17+7+7+4+3+3+2 = 63`; **`63 + 8 = 71`** (the header) and **`63 + 9 = 72`** (the sentence). The bullet enumerates **nine** items of which **one — `fr-ContourPreview KILL-3` — is struck**, leaving **eight** live, which is what the bullet head now says.

**So the count-word `nine` and the addend `+9` and the total `72` are all stale, in current voice, against a header two lines up that reads `71`.** `grep -o '= 72'` → **1**; `grep -o '= 71'` → **0**.

**Mitigation (substantial)**: the authoritative figure is published in the section header immediately above; the list is enumerable in place; and the sentence's own closing clause invites the check — *"the ⟨record → rows⟩ split is stated so a reader can re-add it rather than trust it"* — and re-adding yields 71 and catches the error. **Books nothing, moves no home, touches no roster, gate or digest.**

### §4.4 · **MINOR — `LW-R7-a` is still open, exactly as the seal left it.**

`PASS-7/SEAL.md` §5 filed it and cured nothing. Re-read at these bytes:

```
F-W1:402  ### §2·R3a — ~~`fr-PaperArticleWindow K-20` BOOKED~~ — **DISPOSED, NOT BOOKED** <sub>*re-homed TERMINAL per E6-3 …*</sub>
F-W1:408  ### §2·R3b — `fr-PaperArticleWindow K-24`'s F.W1 LEG ANSWERED (ruling R3-2.2 item 2, second half; …)
```

E6-3 re-homed **both** K-20 and K-24 from F.W1 to TERMINAL and `F-W1:602` strikes both in the register; only the first heading received the parallel disposition. **Mitigation**: the section books nothing and says so at `:412`; §2.4's mechanical diff returns 0 for this record. **Carried, not re-graded.**

### §4.5 · **INFO — the seal's `F-W5` certification cell is falsified.**

Recorded so the next seat does not inherit it: `PASS-7/SEAL.md` §2.2 row 6 certifies `F-W5` as *"`28` inside the chase notes only ✔"*. §4.1 lists five live sites. **The seal's other five denominator rows re-verify correct** (`F-W0` 55 · `F-W1` 330 · `F-W2` 23 · `F-W3` 919 · `F-W4` 1007, all re-run below), so this is one cell, not a method-wide failure — but it is the cell that let the HIGH through.

---

## §5 AXIS 3 — RECEIPT REALITY: **40 receipts re-run; 10 are round-7 re-cuts; FABRICATION ZERO; 2 receipts DO NOT REPRODUCE.**

### §5.1 The re-runs

Base `conformance/` unless stated; `$C = CENSUS-CANONICAL.md`, `$R = docs/tranches/V/megatranche/registry/adjudicated`.

| # | receipt | returned | claimed | |
|---|---|---|---|---|
| R1 ▲ | `F-W1:548` awk roster-sum over `F.W1` | **330** | 330 | ✔ |
| R2 ▲ | same roster piped `tr -cd '\140' \| wc -c` | **660** | 660 | ✔ |
| R3 ▲ | `F.W1` roster line count | **65** | 65 | ✔ |
| R4 ▲ | `grep -n '^### F\.W2' $C` | `4941:### F.W2 — **23 rows**` | 23 | ✔ |
| R5 ▲ | `grep -o '^### F\.W0 — \*\*55 rows\*\*'` | `### F.W0 — **55 rows**` | 55 | ✔ |
| R6 ▲ | `grep -o '^### F\.W3 — \*\*919 rows\*\*'` | matched | 919 | ✔ |
| R7 ▲ | `grep -o '^### F\.W4 — \*\*1007 rows\*\*'` | matched | 1007 | ✔ |
| R8 | `grep -o '^### F\.W9 — \*\*16 rows\*\*'` | matched | 16 | ✔ |
| R9 | `grep -o '^### TERMINAL (∅) — \*\*1220 rows\*\*'` | matched | 1220 | ✔ |
| R10 | `grep -o '^### UNROUTED — \*\*307 rows\*\*'` | matched | 307 | ✔ |
| R11 | §3 `ROWS` total row | `**4242**` | 4242 | ✔ |
| R12 | §3 `ids after band expansion` | `**4287**` | 4287 | ✔ |
| R13 ▲ | `grep -o '^### F\.W5 — \*\*27 rows\*\*'` | matched | 27 | ✔ |
| R14 ▲ | `grep -o '^### F\.W5-W8 — \*\*89 rows\*\*'` | matched | 89 | ✔ |
| R15 | `F-W3:787` cross-wave cell carries 55/330/23 | **1** line | 1 | ✔ |
| R16 | `ls $R/fr-*.md \| wc -l` | **66** | 66 | ✔ |
| R17 | `ls carry/` | `F-W1-CARRY.md F-W4-CARRY.md` | those two only | ✔ |
| R18 | `F-W3` register record count | **59** | 59 | ✔ |
| R19 | `§TABLE` distinct citation sites (R7) | **77** | 77 | ✔ |
| R20 | `§TABLE` occurrences (R7) | **83** | 83 | ✔ |
| R21 | `§TABLE` specs (R7) | **11** | 11 of 11 | ✔ |
| R22 ▲ | `grep -c 'FM-4..FM-16 (13 ids)' F-W1.md` | **1** | 1 (the E-3 quotation) | ✔ |
| R23 | same over `$C` | **1** | 1 (E6-2's row) | ✔ |
| **R24** | **`F-W6:19` cmd A: `grep -o '^### F\.W5 — \*\*28 rows\*\*'`** | **(EMPTY)** | *"### F.W5 — **28 rows**"* | **✘** |
| **R25** | **`F-W6:19` cmd B: `grep -o '^### F\.W5-W8 — \*\*90 rows\*\*'`** | **(EMPTY)** | *"### F.W5-W8 — **90 rows**"* | **✘** |
| R26 | `F-W6:476` quoted `fr-AdminUserList` (11) roster | reproduced verbatim | ✔ | ✔ |
| R27 | `F-W6:476` quoted `fr-AdminAuditLog` (4) roster | reproduced verbatim | ✔ | ✔ |
| R28 | `F-W6:476` quoted `fr-GalleryAdminBanner` (2) roster | reproduced verbatim | ✔ | ✔ |
| R29 ▲ | `F-W5` `booked 113 · cited 3 · escaped 0` | 1 site; `113+3 = 116` = LHS | 116 | ✔ |
| R30 | `F-W7` books-nothing declarations | `:29` `:101` `:208` `:216` | posture | ✔ |
| R31 | `F-W10` books-none declaration | `:336` `:455` | posture | ✔ |
| R32 | `F-W6` none-at-F.W6 declaration | `:19` `:526` | posture | ✔ |
| R33 | register-shaped lines per spec | only `F-W1` 65 · `F-W3` 59; nine specs **0** | zero-roster postures | ✔ |
| R34 | `grep -o 'VERIFIED-YES'` over the eleven | **0** | 0 | ✔ |
| R35 | `status … planned` | **8** sites | planned | ✔ |
| R36 | `FR-NP-32` in `$C` / in specs | **2** / **111** | — | ✔ |
| R37 | `fr-NotationPills` header `**39 rows**` | matched | 39 | ✔ |
| R38 | `grep -o '^### SS-4 — \*\*3 rows\*\*'` | matched | 3 | ✔ |
| R39 | CARRY files inside `$R` | **0** | 0 (carries live in `fourier/carry`) | ✔ |
| R40 | `git status --porcelain` under `fourier/` | 13 `M` (the uncommitted round-7 state) ⊕ **0 written by this seat** | — | ✔ |

**▲ = a round-7 re-cut. Ten of them (R1 · R2 · R3 · R4 · R5 · R6 · R7 · R13 · R14 · R22 ⊕ R29), against the bar of eight.**

**Thirty-eight of forty reproduce. The two that do not are `F-W6:19`'s own published commands, filed at §4.1.**

⊘ **Fabrication, under the stated definition — *a booking at a wave the canonical does not home there* — is ZERO.** §2.4's corpus-wide register scan returns 0 live bookings of the 49; both transcribed registers diff 0/0/0 in both directions; §2.5's band probe returns 0 real fabrications. **`fabricated = 0`.**

### §5.2 The census-pin sweep — **ZERO live superseded digests**

⟨cmd⟩ this seat, base `waves/`:

```
/usr/bin/grep -o 'f44362757458' F-W*.md | wc -l   →  39     ⊕  grep -lF → 11 of 11
/usr/bin/grep -o '3e0a9acb3381' F-W*.md | wc -l   →   8
/usr/bin/grep -o 'a450b8e9f80e' F-W*.md | wc -l   →  22
/usr/bin/grep -o 'b6d8d858c387' F-W*.md | wc -l   →   0
/usr/bin/grep -oE '[0-9a-f]{12}' F-W*.md | wc -l  → 156
```

**The current digest is pinned at 39 sites in 11 of 11 specs.** The 30 superseded-digest survivors were classified by position and every one read: all are **struck chains** (`~~a450b8e9f80e~~ → ~~3e0a9acb3381~~ → **f44362757458**`), **dated movement records**, or **provenance narratives naming the pin as stale**. Six borderline cases were read individually — `F-W0:29` (round-4 write provenance) · `F-W1:9` (the re-base instruction naming what it replaces) · `F-W1:725` (a dated `| 2026-08-29 |` changelog row) · `F-W4:295` (the mechanism reporting its own two moves, live operand `f44362757458` in the same ⟨cmd⟩) · `F-W9:352` (sibling-spec pin provenance) — **all E-3 history, none a pin.**

⊕ **This seat also swept `a450b8e9f80e` (22 occurrences), which `PASS-7/SEAL.md` §2.5 did not** — it checked only `3e0a9acb3381` and `b6d8d858c387`. **All 22 are struck or stale-marked. Nothing changes; the sweep is now complete rather than partial.**

**Live-pin occurrences of a superseded census digest across the eleven specs: ZERO. D-1's bar is MET.**

---

## §6 AXIS 4 — GATES

| gate property | finding |
|---|---|
| canonical operands only | **VIOLATED at two gate cells** — `F-W5:381`/`:427` (G19) and `F-W6:526` (FW6-G17) cite `F.W5 28 ⊕ F.W5-W8 90 = 118`. §4.1. **Every other gate operand checked resolves to the canonical at its current figures.** |
| portable commands, declared bases | **HOLDS** — the 40 re-runs above all carried a declared base; `$C`/`$R`/`$X` are defined at each spec's head |
| locale where sensitive | **HOLDS** — ordering is declared `UTF8_BYTEWISE_CODEPOINT` and `localeCompare` is prohibited by name (`F-W4:32`) |
| no false universals in current voice | **VIOLATED once** — `F-W5:265`. §4.2. *(E6-2's canonical universal and the cert's LW-3 universal are both now struck and enumerated.)* |
| count-words match lists | **VIOLATED once** — `F-W4:317` *"The nine"* / `+9 = 72` against a live list of eight and a header of 71. §4.3 |

---

## §7 AXIS 5 — POSTURE

| posture | finding |
|---|---|
| F.W1 transaction whole | **HOLDS** — *"glass-ui 4→7(→8, G1-gated) ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0, ONE land-or-lose transaction"*, restated at the §7 uplift rows and at CENSUS-2026-08-03 `:109`/`:184-186` |
| W7 / W6 / W10 zero-roster postures | **HOLD** — R33: nine of eleven specs carry **zero** register-shaped lines; F-W7 declares books-ZERO at `:101` `:208` `:216`, F-W10 at `:336`, F-W6 at `:19`/`:526`. *(F-W6's posture is sound; only its cited denominator is stale.)* |
| FR-NP-32 canonical form | **HOLDS** — canonical homes it `**F.W1**` with a `NO-WAVE-OWNER` leg (`:3839`) and §2's F.W1 roster carries it (`:4926`); the specs use the cite-both form `FR-NP-32 (≡ fr-PaperSidebar M1)` and one states *"`FR-NP-32` is **CITED to its holder F-W1**, not booked here"* |
| SS-4 flags inline | **HOLDS** — present in 11 of 11 specs (14–46 sites each) |
| fourier tree READ-ONLY | **HOLDS for this seat** — the only path written is `conformance/PASS-8/CHECK.md`. *(R40: thirteen files show `M` against HEAD; that is the uncommitted round-7 state this seat inherited and hash-verified at §1, not a write by this seat.)* |
| E-3 (dated evidence not rewritten) | **HOLDS** — every stale figure this seat declined to grade was verified to sit inside a strike, a `<sub>` note, a `⟨…⟩` chase note or a dated errata parenthetical |
| zero `VERIFIED-YES` | **HOLDS** — R34 → 0 |
| status planned | **HOLDS** — R35 |
| no product source opened | **HOLDS** — this seat read only the eleven specs, the canonical, the certificate, the pass-6/7 instruments and the 66-file corpus listing |

---

## §8 THE BAR, APPLIED

| bar clause | required | this pass |
|---|---|---|
| BLOCKER / CRITICAL / HIGH | **zero** | **ONE HIGH** (§4.1) ✘ |
| hashes clean | yes | **13 of 13** ✔ |
| roster closed at the post-E6 totals | yes | **4242 · 2466 · 1220 · 307, escapes 0 both directions** ✔ |
| fabrication | zero | **ZERO** ✔ |
| tail MINOR-or-below with stated mitigations | yes | one MEDIUM (§4.2) ⊕ two MINOR ⊕ one INFO ✘ |

# **NOT CONFORMANT.**

**One HIGH, one MEDIUM, two MINOR, one INFO.** The programme is close and the distance is now precisely measurable: **twelve string sites, two ⟨cmd⟩ outputs, one count-word, one addend and one section heading.** No booking, no home, no identity, no digest and no subtraction is wrong anywhere in the eleven specs or the canonical — this pass re-derived all of them and they close at zero. What fails is the *stated operand* of two gates and the *stated total* of one bullet.

⊘ **The lesson this pass adds to the loop's arsenal, stated once.** Round 7 re-based every site spelled `**N rows**` and missed every site spelled `(N)` — and the seal that certified the re-base used the same spelling-restricted probe, so the certificate and the defect shared a blind spot. **`F-W6:526`'s own decree already names the failure — *a gate that states a shape- or spelling-restricted operand is DEFECTIVE at authoring, whatever its result* — and it is the line the defect hides in.** The next seat's sweep must be **spelling-agnostic over the number**, not over the noun: search `27|28`, `89|90`, `116|118` in every spelling and adjudicate each hit, rather than searching for the phrase that happened to be wrong last round.

---

## §9 WHAT THIS SEAT DID NOT DO

1. **It edited nothing but this file.** No wave, no canonical, no certificate, no prior pass instrument. Every defect above is filed and cured nowhere.
2. **It did not read all 49 E6-3 spec rows with its own eyes.** Nineteen were read at the canonical site and the four non-register specs' nine sites were read at the spec site; the register-shaped remainder is proven **mechanically**, in both directions, with no special case (§2.4).
3. **It did not re-audit the canonical's §1 derivations against the 66 corpus records.** It consumed §1 as the census of record and re-derived only the §1↔§2↔§3 closure, the E6-3 delta and the band membership.
4. **It did not re-run the other pass-7 receipts** beyond the 40 published at §5.1.
5. **It did not audit `:NNN` addresses outside those it cites.** LW-3(iv)'s eleven displaced `F-W4` coordinates in the PASS-2/3/4 instruments remain **UNAUDITED**.
6. **A hash proves only that bytes did not move.** It does not prove a paste was produced by its command — §4.1's two empty returns are this pass's own demonstration — and **no check issues its own conformance.**

---

## §10 THE HASH TABLE — THE ABSOLUTE LAST ACT OF THIS WRITE

⟨cmd⟩ this seat, 2026-08-29, base **repo root `/Users/mkbabb/Programming/value.js`**, BSD `shasum`, taken **AFTER** every byte of §1–§9 and with **nothing written after it**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

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
4fc65bbd1d9b548fb01d18550194349c3a00274adf598dddc19012b04d5537b6  docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Thirteen rows, byte-identical to `PASS-7/SEAL.md` §8 and to §1 of this check. The corpus this seat graded is the corpus the seal froze.**

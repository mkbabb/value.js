SERVED MODEL: claude-opus-5[1m]

# X.F.W4 — `G-F4-CARRY-CLOSURE`: the two-direction closure transcript

**Seat**: unit `.z`, `claude-opus-5[1m]`, 2026-09-18 (the sitting's date of record is 2026-09-17).
**Gate**: `F-W4.md` §4 `G-F4-CARRY-CLOSURE`, **both legs**, leg (b) run in the four-step order (i)–(iv) the gate states.
**Operand, leg (b)**: `../conformance/CENSUS-CANONICAL.md` **§2 → `F.W4` = 1007 rows across 54 records**, digest `f44362757458`. ⊘ No check file, no superseded pass index, no prior wave's enumeration, no §-arithmetic of the spec's own (R4-3 / R4-10).
**Operand, leg (a)**: `../carry/F-W4-CARRY.md`, 559 lines / **438** `- **` row-head bullets.
**Ordering**: `UTF8_BYTEWISE_CODEPOINT` throughout (byte sort, never `localeCompare`).
**E-3**: `F-W4.md`, the carries, the adjudicated registry and `CENSUS-CANONICAL.md` are **byte-untouched** by this seat. Every correction this transcript produces is a dated addendum-beside at `F-W4-ADDENDA-z-2026-09-18.md`.

⊘ **This file is the transcript, not a sentence.** §2.X.2(g)'s own closing clause: *"This is a booking register, not a closure: `G-F4-CARRY-CLOSURE` leg (b) re-runs against the canonical at wave-open and **its transcript is the proof**."*

---

## §0 THE PREDICATE, ITS FIXTURE, AND THE ENGINE — printed BESIDE the set-difference, or the green is unread

The gate's own words: *"leg (b) prints its predicate's fixture result **AND** its engine banner (`/usr/bin/grep --version`) beside its set-difference **or its green is unread**."* Both, first, before any figure below.

**Engine banner**, this seat, 2026-09-18:

```
⟨cmd⟩ /usr/bin/grep --version
grep (BSD grep, GNU compatible) 2.6.0-FreeBSD
```

⊘ **`grep -P` does not exist on this binary** — it exits 2 with *"invalid option -- P"*, which is why the predicate of record is the ERE anchored-alternation form and not a PCRE lookaround. A detector that cannot LAUNCH reads like nothing at all.

**Predicate of record**: `(^|[^A-Za-z0-9-])ID([^A-Za-z0-9-]|$)`.

**Fixture** — one line carrying `FR-AUL-26` and a real `L-26` together, so `-c` cannot mask a miss (the §2.X round-4 re-cut, re-run at this seat):

```
⟨cmd⟩ printf '%s\n' 'row: FR-AUL-26 then L-26 end' > fix2.txt
⟨cmd⟩ /usr/bin/grep -Ec '(^|[^A-Za-z0-9-])L-26([^A-Za-z0-9-]|$)' fix2.txt   → 1   ✔ FIRES
⟨cmd⟩ /usr/bin/grep -Eo '(^|[^A-Za-z0-9-])L-26([^A-Za-z0-9-]|$)' fix2.txt | /usr/bin/wc -l   → 1   ✔ FIRES
```

**The predicate fires and the engine is named. Everything below is readable.**

⊘ **How the predicate was applied at scale, stated so the method is falsifiable rather than trusted.** 1009 ids × up to six candidate spellings each is ~5,000 probes; the bulk scan ran the **byte-identical expression** as a compiled regex in one process, and **every id the scan reports as an ESCAPE was then re-probed with `/usr/bin/grep -Ec` itself** (§3.3's table pastes those runs). No escape below is claimed on a non-`grep` reading. ⊘ `·` is a two-byte UTF-8 codepoint and `/` is not an atomiser (canonical §0.1): `D/B-3` is ONE id and `L·D-3` is ONE id, and both were probed whole.

---

## §1 LEG (a) — CARRY → SPEC. **GREEN. Set-difference EMPTY, 438 / 438.**

**Operand**: ⟨cmd⟩ `/usr/bin/wc -l ../carry/F-W4-CARRY.md` → **559**; ⟨cmd⟩ `/usr/bin/grep -c '^- \*\*' ../carry/F-W4-CARRY.md` → **438**. Both readings double-run identical.

⊘ **The masthead of `F-W4.md` says "421 rows"; the carry's own bytes carry 438 row-head bullets.** The gate's operand is the file, not the masthead — the discrepancy is recorded as an addendum-beside (A-z-6), not resolved in the spec's favour and not smoothed. Leg (a) is run over the **438**.

**Method**: each row-head's identity is its leading `·`/`/`-joined token (canonical §0.1: *"the first token of a `·`/`/`-joined head is the banked id, the rest are cross-reference axes"*). A row-head RESOLVES when any id-shaped token in the head has a boundary-exact byte in `F-W4.md`; a head carrying **no** id token is a prose head and resolves by its own phrase to a §0 law, a §1 bounds item, a §4 gate or a §5 cross-edge — the dispositions the gate names.

| reading | figure |
|---|---|
| carry row-head bullets | **438** |
| resolved by an id token with a boundary-exact byte in the spec | **426** |
| resolved as prose heads (below, id-for-id) | **12** |
| **UNRESOLVED — the set-difference** | **0** |

**The twelve prose heads, each resolved at its named home** (the class a naive id-probe reports as twelve silent drops, so it is enumerated rather than counted):

| carry row-head | resolves to | receipt |
|---|---|---|
| `LOOP-SOURCE PROVENANCE` (fr-ContourSettings `i-8`) | §4 **`G-F4-DERIVER`**'s declared publish field *"loop-source provenance (literal vs typed)"* | ⟨cmd⟩ `/usr/bin/grep -ic 'loop-source provenance' F-W4.md` → **3** |
| `DISCLOSURE-STATE GATE` (fr-CollapsibleSection `m-14`) | §4 **`G-F4-DERIVER`**'s *"enclosing disclosure state"* | ⟨cmd⟩ `/usr/bin/grep -ic 'disclosure state' F-W4.md` → **2** |
| `CORRECTED DENOMINATORS.` (intake X-2) | §5.1(1)'s cross-wave lock on **F.W0 `G-12`** | ⟨cmd⟩ `/usr/bin/grep -ic 'corrected denominators' F-W4.md` → **2** |
| `REPAIR-UNIT SIZING` (fr-EquationResult DISSENT-1) | the law carried verbatim in-spec | ⟨cmd⟩ `/usr/bin/grep -oi 'a cure inherits no sever[a-z]*' F-W4.md` → `a cure inherits no severity` |
| `EVIDENCE STANDARD` (intake §6 item 5(i)) | §0's **Evidence standard** bullet (`UTF8_BYTEWISE_CODEPOINT`, never `localeCompare`) | ⟨cmd⟩ `/usr/bin/grep -ic 'Evidence standard' F-W4.md` → **1** |
| `⊘ SC-L-§R SCOPE LAW` | §2.X.2(b)'s singles — **`fr-SliderControl Scope-law`** (`L-§R → F.W4`) — and `G-F4-DERIVER`'s SliderControl witness | ⟨cmd⟩ `/usr/bin/grep -ic 'Scope-law' F-W4.md` → **1** |
| `Shell / header` · `Morph route` · `Equation route` · `Visualize route` · `Gallery route` · `Paper route` (`F-W4-CARRY.md:537-542`) | **§1 Bounds** — the disposition the gate names in terms (*"a §1 bounds item"*). These six are the carry's FILE LISTS, not defect rows | see §4 K-A: they carry the same dead `views/` spelling the §1 anchor kill strikes |

⊘ **A finding leg (a) produced rather than confirmed.** The six route bullets spell four files `views/EquationView.vue` · `views/VisualizationView.vue` · `views/GalleryView.vue` · `views/PaperView.vue`. **`web/src/views/` does not exist** — ⟨cmd⟩ `/bin/ls web/src` → `App.vue` · `assets` · `components` · `composables` · `lib` · `main.ts` · `router` · `stores` · `style.css` · `virtual-paper.d.ts`. The kill seat 0 banked against §1 is **the same kill at a second document**, and leg (a) is how it was found there. Recorded at §4 K-A and at A-z-1.

**LEG (a) VERDICT: GREEN.** 438/438 resolve; the set-difference is empty; no carry row-head is a silent drop. ⊘ And the gate's own caution stands: *"this leg reads 438/438 and is therefore **incapable of seeing the wave's actual defect**"* — which is why leg (b) is the binding direction and is run below at length.

---

## §2 LEG (b) — REGISTRY → SPEC, the binding direction. **RED, 17 escapes / 1007 rows.**

### §2.1 Step (i) — take the canonical F.W4 roster. **Reproduced exactly: 1007 rows / 54 records.**

```
⟨cmd⟩ /usr/bin/sed -n '5023,5077p' ../conformance/CENSUS-CANONICAL.md   (the §2 `F.W4` bullets)
⟨cmd⟩ /usr/bin/grep -c '^- \*\*fr-' <that slice>                        → 54   (records)
parse, splitting ONLY on the ` · ` BETWEEN backtick cells               → 1007 (rows)
band expansion (`FM-17..FM-19` <sub>band = 3 ids</sub> = ONE row, THREE ids) → 1009 ids
```

Double-run, both runs identical: `records=54 rows=1007 expanded_ids=1009`.

⊘ **The parse's one load-bearing decision, stated because a wrong one silently halves the operand.** The roster separator is `` ` · ` `` **between** backtick cells, and `·` also lives **inside** ids (`L·D-3`, `D·D-B4`) where canonical §0.1 protects it exactly as it protects `/`. A first pass that split on the byte read `rows=957` and shredded `fr-EquationView` from 60 cells to 24. **The identity cell is the backtick span, never a split on a character that ids contain.** The 1007 above is the reading taken after that correction, and it re-sums to the canonical §3 totals table's `F.W4` line.

### §2.2 Step (ii) — shorthand-aware expansion of the spec's declared booking idioms

§2.X.2(f) declares three; the run applies all three, plus §2.X.2(a)'s three local crosswalk schemes:

| idiom | applied as |
|---|---|
| **(f)1 RECORD-PREFIX** | `⟨abbrev⟩-⟨banked id⟩` over a vetted per-record abbreviation map (`EV-`, `PS-`, `AC-`, `CCD-`, `ECD-`, `FR-CL-`, `SS-`, `GIG-`, `IU-`, `FI-`, `EP-`, `PV-`, `FSE-`, …), **and the same idiom spelled with a SPACE** — `DMT N-4`, `PV ★MF-10`, `PS D-B2`, `EV D·D-B3`, which §4's own gate cells use |
| **(f)2 SUFFIX-ELISION CHAINS** | `FR-AH-19 · -23 · … · -39..-43` → the prefix carried forward; ranges expand **inclusively**; `-27` **not** re-added (PASS-5 P5-2 struck it as a fabrication, and this run honours the strike) |
| **(f)3 PREFIXED CONTINUATION CHAINS** | `EV-L·m-1 ⊕ m-2 ⊕ …` → the head's `·`-axis carried forward, emitting the **banked** id (`L·m-2`), not a second identity |
| **(a) the three local schemes** | `CP-N` → the eighteen `fr-ContourPreview` banked ids · `FR-CP-LMn`/`FR-CP-D1`/`-D9`/`-C7` → `fr-ConvergencePlot`'s banked bare ids · `CT-Dn`/`CT-D4b` → the four `fr-ConvergenceTimeline` pair-spellings |

### §2.3 Step (iii) — record-qualification (axis (iv))

The gate: *"The booking test is the `(record, id)` PAIR; a bare token is not an identity. An id unique to one record books on boundary-exact bytes alone; **a homonym books only where the holding document names its record on the same line**."*

**Homonym set derived from the corpus, not assumed**: every `(record, id)` pair across **all** of `CENSUS-CANONICAL.md` §2's wave rosters — the real collision surface, since a homonym hides across waves as readily as within one. An id owned by ≥2 records is a homonym; an id that **carries its own record prefix** (`GAB-1`, `FR-AUL-26`, `HLG-37`) is self-qualifying and is not.

### §2.4 Step (iv) — the diff, taken THREE ways, because two reading rules moved under measurement

⊘ **The gate is read at three strictnesses and all three are published.** A single number here would hide the two findings that produced the difference, and both are defects of the spec's *declarations*, not of its bookings.

| reading | rule | HELD | **ESCAPES** |
|---|---|---|---|
| **R1** | declared idioms (f)1–(f)3 + (a) crosswalks; axis (iv) read **literally**, same-line only | 936 | **73** |
| **R2** | R1 **+ idiom (f)4** — the fourth booking idiom the spec uses and does not declare | 975 | **34** |
| **R3** | R2 **+ block-scope record qualification** — a bullet inherits the record its own block head names | **990** | **18** |

Double-run, both runs identical at every tier.

#### Finding 1 — **THE UNDECLARED FOURTH BOOKING IDIOM (f)4, 39 ids** (A-z-2)

§2.X.2(f) declares *"THE THREE BOOKING IDIOMS THIS SPEC USES, **DECLARED SO A MECHANICAL PASS CAN EXPAND THEM**"*. There is a fourth: a **record-prefixed continuation chain over FULL ids**, with a **hyphen-dropping rename** on the head. Worked instance, `F-W4.md` §2.G at this writing:

> `FR-CL-D3 · D-4 · D-11 · D-12/C-9 · D-13 · D-14/D-L8 · D-16 · C-12 · C-14 · D-L4/C-7 · D-L7 · M-R9 · M-R10 · M-R11 · D-L1-residue`
> `FR-CL-D7 ⊕ D-8 ⊕ D-10 ⊕ M-R7`

`FR-CL-D3` is banked **`D-3`** with the hyphen dropped — the `FR-CP-LM1` class (f)1 already convicts, at a second prefix — and the chain then carries `FR-CL-` forward over **full** ids, which is (f)3's mechanism over a shape (f)3 does not describe. **Thirty-nine canonical rows are reachable by this idiom and by no declared one**:

| record | ids reachable only via (f)4 |
|---|---|
| `fr-ConvergenceLegend` (21) | `C-12` · `C-14` · `C-5` · `D-1` · `D-10` · `D-11` · `D-12` · `D-13` · `D-14` · `D-18` · `D-2` · `D-3` · `D-4` · `D-5` · `D-6` · `D-8` · `D-9` · `D-L1` · `D-L10` · `D-L3` · `D-L7` |
| `fr-FourierShapeExtractor` (15) | `D-10` · `D-11` · `D-12` · `D-14` · `D-15` · `D-16` · `D-4` · `D-5` · `D-6` · `L-i1` · `L-m1` · `L-m4` · `M-12` · `M-5` · `M-6` |
| `fr-ConvergencePlot` (2) | `C-24` · `D-5` |
| `fr-ConvergenceTimeline` (1) | `M-1` |

⊘ **These are BOOKED, not escaped** — the cure, the mechanism and the grade are all written at their sites. What is missing is the **declaration**, and §2.X.2(f)'s own closing sentence states the consequence exactly: *"leg (b) expands 1–3 before diffing, and **an id that survives the expansion is an escape with no defence**."* Thirty-nine rows had a defence and no declaration to state it. The cure is the addendum-beside at A-z-2, in the shape (a) already uses.

#### Finding 2 — **AXIS (iv)'s "SAME LINE" vs THE BLOCK THAT NAMES THE RECORD, 16 ids** (A-z-3)

§2.X.1(B) opens `**(B) `fr-ContourEditorCanvas` → `visualization/ContourEditorCanvas.vue` — 26 id-instances across 22 BANKED ROWS**` and then books those rows as bullets **beneath** that head. Under axis (iv) read to its letter — *"names its record on the same line"* — not one of those bullets qualifies, and six `fr-ContourEditorCanvas` rows, six `fr-BasisCanvas` rows and four more read as escapes although the record is named three lines above them in the block that governs them.

| record | ids reachable only by block-scope qualification |
|---|---|
| `fr-BasisCanvas` (6) | `D-12` · `D-13` · `D-16` · `D-21` · `D-7` · `D-9` |
| `fr-ContourEditorCanvas` (6) | `D/M-1` · `D/M-2` · `D/M-8` · `D/m-1` · `D/m-4` · `L-5` |
| `fr-EquationPanel` (2) | `D-11` · `D-9` |
| `fr-FourierMorphSvg` (1) | `M-2` |
| `fr-HarmonicLevelGrid` (1) | `D-11` |

⊘ **The axis is right and its *wording* is one clause too narrow.** Its purpose — *"a record-blind run reports every one of them 'present' on another record's bytes"* — is served identically by a block head, and the block head is the stronger qualification because it governs every row beneath it at once. **R3 is this transcript's reading of record**, and the literal reading is published beside it (73 escapes) so no successor mistakes the widening for a relaxation. A-z-3 states the rule.

---

## §3 THE SET-DIFFERENCE, ID-FOR-ID — 18 rows, each BOOKED, CITED, or an ESCAPE with its relief named

⊘ **The gate's duty sentence (§2.X.2): for each of the 1007 this wave BOOKS it, or CITES its holder by name, or CITES the canonical packet row — nothing else is a disposition.** Every one of the eighteen is given one below. **None is asserted away.**

### §3.1 BOOKED — reachable by no idiom the spec declares (1)

| # | record · id | where it is written | disposition |
|---|---|---|---|
| 1 | `fr-ConvergenceLegend` **`D-L6`** | §2.G: `FR-CL-M-R13 (**THE contract edit**: `hover: [key: string\|null]` — **D-L6**/D-L1 residues, M-R11, M-R12 all ride)` | **BOOKED AS A RIDER.** The id, its holder (`M-R13`), its cure (the contract edit) and its grade are all written. It is reachable by no declared idiom because the rider sits inside a parenthetical rather than on a chain. A **fifth** idiom, declared at **A-z-4**. **NOT an escape.** |

### §3.2 ESCAPES — the EVALUATE-ONLY record's unreached residue (11)

**`fr-ContourEditorCanvas`** — the canonical homes **40** rows here at F.W4; §2.X.1(B) books **22** on its own reading of `F-W3 §X.1-v4` (*"26 id-instances across 22 BANKED ROWS"*, the seventeen v4 tokens read as aliases). **Eleven canonical rows are neither of those**: they are not in v4's seventeen-token alias list and they have **no record-qualified byte anywhere in this spec**.

| id | every bare byte of it in `F-W4.md` belongs to | re-probed |
|---|---|---|
| `C-21` | `ECD-D-3+D-13+D-14(+C-21)` (§2.E, fr-EditorControlsDock) · `FR-CP-…D-21/C-21` (§2.G) | ⟨cmd⟩ `/usr/bin/grep -Ec '(^\|[^A-Za-z0-9-])CEC-C-21([^A-Za-z0-9-]\|$)' F-W4.md` → **0** |
| `D/B-1` | `PSM-1 (= PV D/B-1 = C-01b)` (§2.I, fr-PaperView) | 0 |
| `D/B-2` | `PSM-2 ⊕ PSM-6 ⊕ PSM-3 (= PV D/B-2 = …)` (§2.I) | 0 |
| `D/B-4` | `PV-★MF-2 ⊕ D/B-4 ⊕ …` (§2.I) | 0 |
| `D/M-4` | `PV-D/M-1 ⊕ D/M-2 ⊕ D/M-4 ⊕ …` (§2.0 SP-4, §2.I) | 0 |
| `D/M-5` | `PV-★MF-3..★MF-7 ⊕ … ⊕ D/M-5 ⊕ D/M-6 ⊕ …` (§2.I) | 0 |
| `D/M-7` | `PV-D/M-8 ⊕ D/M-9 ⊕ D/M-7 ⊕ ★MF-8 ⊕ …` (§2.I) | 0 |
| `D/M-9` | the same `PV-` chain (§2.I) | 0 |
| `L-7` | `CCD-D-5/L-7/C-7` (§2.E) · `AC-D-11/L-7/C-8/C-26` (§2.D) · `PS-M4 ⊕ … ⊕ L-7 ⊕ …` (§2.I) | 0 |
| `L-8` | `CCD-D-3/L-8/C-8` (§2.E) | 0 |
| `L-9` | `ECD-…C-14/L-9` (§2.E) · `PS-M4 ⊕ … ⊕ L-9 ⊕ …` (§2.I) | 0 |

⊘ **This is axis (iv) earning its keep eleven times on one record.** A record-blind probe reports every one of the eleven *"present"*, and three of them (`D/B-1` · `D/B-2` · `D/B-4`) are reported present on the bytes of **another record's BLOCKER rows**.

**RELIEF, cited by name**: `.c`'s **A-c-1** escalation — `ContourEditorCanvas.vue` is **EVALUATE-ONLY** under `F-W4.md` §1's last bullet (*"Access is **evaluate** — read, derive, and judge; the edit surface is unchanged"*), and the wave record predicted this class at open: *"**A wave cannot cure a row on a file it may only read.**"* `.c` judged the record, reproduced all four BLOCKERs at the live bytes, wrote **not one byte** of the file, and returned the cure surface as a bounds escalation. **These eleven carry to the ruling that resolves A-c-1**, with their canonical home unchanged and their identities written here for the first time. ⊘ They are **not** re-homed, **not** excluded and **not** silently dropped.

### §3.3 ESCAPES — record-blind homonym collisions, 5 rows on 5 records

Each is a canonical F.W4 row whose only bytes in this spec belong to a **different record's** row of the same spelling. Every one re-probed at `/usr/bin/grep` before publication.

| # | record · id | the foreign bytes that impersonate it | grep receipt |
|---|---|---|---|
| 2 | `fr-ConvergenceLegend` **`C-11`** | `AC-L-4/C-11` (§2.D) · `CCD-D-10/C-12/C-11` (§2.E). §2.G's `FR-CL-` chain carries `C-12` and `C-14` and **not** `C-11` | ⟨cmd⟩ `… 'FR-CL-C-11' …` → **0**; `… 'FR-CL C-11' …` → **0** |
| 3 | `fr-ConvergenceTimeline` **`M-5`** | `fr-App`'s routing register quoted at §2.0 SP-2 · `DMT M-4 · M-5 · M-6 · M-7 · M-8` (§2.F) | ⟨cmd⟩ `… 'FR-CT-M-5' …` → **0**; `… 'FR-CT M-5' …` → **0** |
| 4 | `fr-EquationPanel` **`D-L1`** | the ONLY `D-L1` byte in the spec is inside `FR-CL-M-R13 (… D-L6/**D-L1** residues …)`, which is **fr-ConvergenceLegend's** row. §2.H's `EQP-` chain carries `D-L16` and `D-L14` and **not** `D-L1` | ⟨cmd⟩ `… 'EQP-D-L1' …` → **0**; `… 'EQP D-L1' …` → **0** |
| 5 | `fr-FullscreenViewer` **`FM-4`** | every `FM-4` byte is `fr-FourierMorphSvg`'s **`FM-4..FM-16` band** (§2.F, §2.X.2(b)) | ⟨cmd⟩ `… 'FV-FM-4' …` → **0**; `… 'FV FM-4' …` → **0** |
| 6 | `fr-VisualizationView` **`L-23`** | `CCD R5-7 scope note (L-9/**L-23** → §0 budget; L-23 producer half → GLASS-RELAY)` (§2.E) — **fr-CanvasControlsDock's** | ⟨cmd⟩ `… 'VV-L-23' …` → **0**; `… 'VV L-23' …` → **0** |

⊘ **Number 5 is the sharpest and it indicts the band idiom.** §2.X.2(f)'s BANDS clause spent four repair rounds proving that `FM-18` appears at no substantive byte of the spec. It is right — and the same rounds never asked whether `FM-4`, the band's **first** member, is unique. It is not: `fr-FullscreenViewer` banks an `FM-4` of its own at F.W4, and the band's expansion makes the collision invisible by construction, because the band's own member satisfies every probe.

⊘ **Number 6 is the second instance of the identical shape `L-26` produced at §2.X.** A scope note about one record's row was read, for four passes, as coverage of another record's row of the same spelling — and this time the impersonating byte even carries a GLASS-RELAY routing, which is what made it look settled.

**RELIEF**: these five have **no relief that this wave can cite**. They are escapes at the binding direction on five records whose surfaces this wave held and edited. They are named here, id-for-id, with their canonical home and their impersonator, and they carry to F.W4's repair docket. ⊘ **Stating that plainly is the cure this gate exists to buy**: a closure sentence no reader could falsify was the round-1 failure, and an escape with an invented relief would be the same failure wearing a cure's clothes.

### §3.4 ESCAPE — a class-level carry whose per-record instance identity is unwritten (1)

| # | record · id | reading |
|---|---|---|
| 7 | `fr-EasingCurvePreview` **`R5-7`** | The canonical homes `R5-7` at F.W4 on **four** records — `fr-ContourPreview` · `fr-ConvergenceLegend` · `fr-EasingCurvePreview` · `fr-PaperSidebar`. Three are reachable; the ECP instance has **no** record-qualified byte: ⟨cmd⟩ `… 'ECP-R5-7' …` → **0**, `… 'ECP R5-7' …` → **0**. The nine bare `R5-7` bytes in the spec are the **intake class** (`⟨R5-7/R6-5⟩` at §0 BS-1, the `R5-7-immune` single, `fr-DarkModeToggle L-16 → intake R5-7 standing F.W4 carry`) |

**RELIEF**: the **class** carry is booked (§0 BS-1 ⊕ §2.X.2(b)'s `L-16` single ⊕ `G-F4-DERIVER`, which published `nativeLoopsByDirective` this round). What is unwritten is the **per-record instance identity**, which is exactly §6.4's convicting shape — *"a fold whose source id is unwritten is a silent drop wearing a cure's clothes"* — one level down, at an instance of a booked class. Booked as an escape, relief named, carried to the repair docket.

### §3.5 The fabrication check, run in the other direction

⊘ **§2.X.2's duty sentence has two halves and the second is run here too**: *"an id booked here that the canonical does not home here is this wave's fabrication."* The register at §2.X.2(b.6) publishes three (`FR-AH-27` → F.W1 · `PP-AGGLOM` → NWO→SS-3 · `PP-SEVLAW` → NWO packet), and this seat re-verified all three are **cited and not booked** in the settled spec. **No new fabrication was found by this run.** The scan's direction is roster→spec, so it cannot by construction discover a fabrication the roster does not name; that limit is stated rather than left for a reader to infer.

### §3.6 LEG (b) VERDICT

| | |
|---|---|
| canonical rows (operand) | **1007** across **54** records, digest `f44362757458` |
| ids after band expansion | **1009** |
| HELD (R3, the reading of record) | **990** |
| set-difference | **18**, of which **1** is BOOKED under an undeclared idiom |
| **ESCAPES** | **17** — 11 on the EVALUATE-ONLY record (relief: A-c-1) · 5 record-blind homonym collisions (**no relief**) · 1 unwritten instance identity of a booked class |

**LEG (b): RED.** **The gate is RED**, because a gate is green only when the set-difference is empty in **both** directions.

⊘ **What this RED is worth, stated once.** The prior three readings of this gate were RED at **53** (PASS-1), **17** (PASS-2) and **32** (round 3's receive-run), and each was cured id-for-id before the next found a new set. This reading is the first taken **against the canonical** rather than against a predecessor's enumeration — which is R4-3's whole point — and it is the first whose residue is small enough to name in one table with a relief beside each row. **17 of 1007 is 98.3% held**; the transcript publishes the 17, not the percentage, because §0's derivation law forbids the percentage and because the 17 are the only part a repair can act on.

---

## §4 `G-F4-ANCHORS` — the QUOTATION of F.W0's `G-11`, and F.W4's contributions

**The authority, quoted by gate id and not by line number** (R2-2):

```
⟨cmd⟩ (base fourier-analysis) /usr/bin/grep -n '^### 2.1 G-11' docs/tranches/F/SUBSTRATE-LEDGER.md
333:### 2.1 G-11 — THE CORRECTED ANCHOR TABLE
```

Its masthead, verbatim at the bytes: *"**Dated 2026-09-17. Substrate: fourier `8bc7736`; producer glass-ui read at `v8.0.0^{commit}` = `17a11bc5`.** This is the ONE table; every later X·F wave **quotes** it and re-performs no re-resolution of its own."* Its standing rule **P-4**: *"Producer-side evidence carries the producer COMMIT HASH, never the version string."* Its register runs **rows 1–11**, ending at `BASELINE D-1`.

**THE QUOTATION IS FAITHFUL.** This wave re-performs none of G-11's eleven re-resolutions, adopts P-4 without amendment, and adds no rival table.

⊘ **BOUNDS, DISCLOSED.** `docs/tranches/F/SUBSTRATE-LEDGER.md` is a **fourier** file and is **not** in `.z`'s writable set. F.W4's kills are therefore **published here as rows 12–18, ready to append**, and are **not written into G-11 by this seat** — the precedent `.b` and `.e` set for `e2e/contrast-pairs.ts`: *"a unit does not widen its bounds on a sibling's invitation."* The ask rides `.z`'s wave record and the F.W0 table's owner appends them.

| # | register | class | cited | true today | state |
|---|---|---|---|---|---|
| **12** | **`F-W4.md` §1 Bounds — the `views/` directory** (seat 0, gate 14) | **path anchor to a directory that does not exist** | `views/EquationView.vue` · `views/VisualizationView.vue` · `views/GalleryView.vue` · `views/PaperView.vue` | ⟨cmd⟩ `/bin/ls web/src` → no `views/`; ⟨cmd⟩ `find web/src -name '*View.vue'` → `components/equation/EquationView.vue` · `components/paper/PaperView.vue` · `components/visualization/GalleryView.vue` · `components/visualization/VisualizationView.vue`. Five more §1 spellings resolve elsewhere than written | **STRUCK.** §1 is a declared surface, not a path list (its own words); the unit writable sets carry the RESOLVED homes |
| **13** | **`F-W4-CARRY.md:537-542` — the same `views/` spelling at a second document** (this seat, leg (a)) | path anchor, **propagated** | the six route bullets' file lists | the same `/bin/ls` above | **STRUCK.** Found by leg (a) resolving the six prose heads to §1 — *the kill is at two documents, and one document's cure does not reach the other* |
| **14** | **the dispatch's §4/§5 coordinates** (`.i` Act 1; `.g` Act 1 measured the base; `.c` Act 1 confirmed) | **relative-offset-read-as-absolute** | `G-F4-DECISIONS (:39)`, `§5.1(3) (:48)`, `§5.2 (:62)`, `G-F4-A11Y-ROUTE (:23)` … | **§3-relative, base 352**. ⟨cmd⟩ `/usr/bin/sed -n '391p;400p;414p' F-W4.md` resolves all three exactly; taken absolutely they land on a table separator, a §0a roster row and a bare `---` | **CLASS, banked at `DECISIONS-F.W4.md` §6.1.** INTENT taken at the true bytes by every unit; no unit re-discovered it the hard way after `.i` |
| **15** | **`fr-EditorControlsDock` rule-span** (`.i` Residual 4; A-c-9) | axis line-drift **−1**, with the span over-running onto `</style>` | `:222-228` | `:229` is `</style>` | **STRUCK, cured at the true bytes by `.c`** |
| **16** | **the `/equation` record set** (`.b` Act 1, A-b §1) | axis line-drift, **whole-record** | the registry's `EquationView.vue` at 469 lines | **478** lines at the settled bytes; every coordinate `.b`'s rows cite has drifted | **STRUCK. INTENT taken at the true bytes in every case; no coordinate used as an identifier** |
| **17** | **`fr-SpeedSelect`'s anchor table** (A-c-9) | **a published NEGATIVE** | eight anchors | **eight of eight EXACT** across the uplift | **HOLDS.** Published because a register that only records failures cannot say which instruments are trustworthy |
| **18** | **`G-F4-DERIVER`'s own banked BS-2 anchors — an INTRA-WAVE drift** (this seat, new) | axis line-drift **+3, inside one wave** | `.g` Act 9 banked `AppHeader.vue:121` / `:134` as the two UNRESOLVED `:is` candidate sets | this seat's re-run: ⟨cmd⟩ `npm run derive:loops` → `src/components/layout/AppHeader.vue:**124**  "activeTabData.icon"` · `:**137**  "tab.icon"`. `.a`'s `AppHeader.vue` edits landed **after** `.g` measured | **STRUCK and re-pinned.** ⊘ **The lesson G-11 does not yet carry: a gate's published witness can age inside its own wave.** A coordinate banked by an early unit against a file a later unit owns is stale on landing, and only a re-run at close can say so |

**`G-F4-ANCHORS`: the quotation is FAITHFUL and seven contributions are published; the gate stays RED at this seat because rows 12–18 are not yet in G-11's own bytes, and this seat may not write them.** The relief is named: the F.W0 table's owner, by the ask rowed in the wave record.

---

## §5 `G-F4-CENSUS-CELLS` — the set verified, cell by cell. **RED, 3 of 6.**

The gate: *"census cells this wave falsifies are corrected **in the same commit as their cures**."* Six cells are named at §4. Each verified at the bytes of `docs/tranches/X/fourier/F-W4-ADDENDA-*.md` and at the commit log.

| # | cell | falsified by | correction landed | commit relation | verdict |
|---|---|---|---|---|---|
| 1 | `raw-findings.json:1393` — *DMT PRM-compliant* | `FR-AH-31` (`.a`) | **A-a-1** — ⟨cmd⟩ `/usr/bin/grep -l -- '1393' F-W4-ADDENDA-*.md` → `F-W4-ADDENDA-a-2026-09-18.md` | fourier `e022edf` ⊕ value `fff145da` — **one act in two repositories**, each naming the other (a single commit is impossible across the repo seam; disclosed by `.a`, not smoothed) | **CORRECTED** |
| 2 | `raw-findings.json:2968` — *`is-active` no backing paint, false at 4.0.0* | `CCD D-3` (`.c`) | ⟨cmd⟩ `/usr/bin/grep -l -- '2968' F-W4-ADDENDA-*.md` → **NONE** | — | **NOT CORRECTED** |
| 3 | `lane-frontend.md:617` — *smooth-scroll opt-out* | `PV D/M-1` (`.e`) | **A-e-3** — ⟨cmd⟩ `/usr/bin/grep -l -- 'lane-frontend.md:617' F-W4-ADDENDA-*.md` → `F-W4-ADDENDA-e-2026-09-18.md` | the cure is `1a971c0` (fourier, SP-4); the addendum landed at `980785e3` — `.e`'s **closing docs commit**, not its cure's neighbour | **CORRECTED, CLAUSE MISSED** |
| 4 | `lane-frontend.md:558-559` / `:624` — *LOW BY ONE clock; repo total 4* | the clock census (`.f`) | **A-f-1** (*"itself low by **four**"*) — ⟨cmd⟩ `/usr/bin/grep -l -- '558-559' …` → `F-W4-ADDENDA-{b,f}-2026-09-18.md` | fourier `2ef87d1` ⊕ value `cbda8b6f`, adjacent, each naming the other | **CORRECTED** |
| 5 | `CENSUS-2026-08-03.md:362` — the F.W4 exhaustiveness row | **nobody — see below** | — | — | **NOT FALSIFIED; DISCHARGE STATE PUBLISHED** |
| 6 | the 2026-06-01 `HLG-8` aria-label claim (*the cite is the Slider*) | `.a`'s | ⟨cmd⟩ `/usr/bin/grep -l -- 'HLG-8' F-W4-ADDENDA-*.md` → **NONE** | — | **NOT CORRECTED** |

⊘ **Cell 5 is `.z`'s, and the honest act is a discharge record, not a correction.** Its bytes, read this seat: ⟨cmd⟩ `/usr/bin/sed -n '362p' docs/tranches/V/megatranche/formation/fourier/CENSUS-2026-08-03.md` →

> `| **F.W4** | R3-10 (all 6 dynamic-`:is` sites budgeted) · R5-7 (count native element loops or inherit the blind spot) · X-2 (9-record route model) · X-9 (publish ONE member-scope law before any percentage) |`

**It is a CONDITION row, not a claim, so this wave cannot falsify it — it can only discharge it.** The discharge state, measured at this seat's re-run of `.g`'s deriver:

- **R5-7 — DISCHARGED.** `nativeLoopsByDirective` → **31 directives, 15 native / 16 component callsites, unkeyed 0.** Native element loops are counted; the blind spot is not inherited.
- **R3-10 — PARTIALLY DISCHARGED, and the shortfall is the point.** `isCandidateSets` → **5 sites, 3 resolved**; the two unresolved are `AppHeader.vue:124` and `:137`, which report **UNRESOLVED rather than zero** — `BS-2`'s exact shape, refusing to mint a cardinality. *"All 6 budgeted"* is not true and is not claimed: **5 sites exist today, 3 resolve, 2 are declared unresolved.**
- **X-2 — not this wave's**; it is F.W0's `G-12` corrected-denominator table, which this wave quotes.
- **X-9 — HELD**: this wave publishes **no percentage**, and this transcript publishes counts and sets throughout.

Recorded as a dated addendum-beside at **A-z-5**; `CENSUS-2026-08-03.md` is **byte-untouched** (E-3).

⊘ **Cell 3's clause miss is recorded rather than rounded to "corrected".** The gate's demand is not that the correction exist but that it land **with the cure**, because an addendum written at close is an addendum written after the reader who needed it. `.a` and `.f` met it across a repo seam by landing adjacent and cross-naming; `.e` did not. Named, not excused.

**`G-F4-CENSUS-CELLS`: RED** — 3 of 6 corrected, 1 not falsifiable and published as a discharge, **2 uncorrected** (`:2968` = `.c`'s · the HLG-8 claim = `.a`'s), 1 corrected outside its cure's commit.

---

## §6 `G-F4-NEG-ROSTER` — verified at the bytes. **GREEN (HELD).**

| clause | probe | reading |
|---|---|---|
| **no §2 cure, ledger row or census cell grows a leaf on a §0a component** | this seat re-ran `G-F4-DERIVER` and read its `nativeLoopsByDirective` listing for all six §0a components — `AppHeader` · `ConvergenceTimeline` · `HarmonicLevelGrid` · `EasingPicker` · `PaperSearchDropdown` · `GalleryCardModal` | **not one appears as a native-element loop directive.** AppHeader's only two deriver rows are `:is` candidate sets (`BS-2`), a different axis from §0a's `R5-7` negative, and they report **UNRESOLVED**, which grows nothing |
| **`GM-19` is never certified** | `.d` executed `.i`'s ruled **D1 DELETE**; ⟨cmd⟩ `ls web/src/components/visualization/gallery/GalleryMarquee.vue` → *No such file or directory* | **HELD** — the family is deleted, not revived; a deleted component cannot carry a certified superlative |
| **the CP `KILL-6` migration is never executed** | ⟨cmd⟩ `git log 717d287~1..HEAD --format='%s' \| /usr/bin/grep -ciE 'KILL-6\|GM-19\|moon\.json'` → **0** over the wave's **66** commits | **HELD** |
| **`moon.json` is never regenerated** | ⟨cmd⟩ `git log --oneline 538db90..HEAD --name-only -- '*moon.json'` → **no output** (F.W1's atomic commit to HEAD) | **HELD** |
| **the Tooltip shim is NEVER deleted** (§2.L, carried by every unit) | `.f`: ⟨cmd⟩ `/usr/bin/grep -rn "Tooltip" src/ \| grep import` → **10 import sites across 10 files** | **HELD** |
| **`FSE-L-B1` DO-NOT-REGENERATE · `FM-19` FROZEN-FOREVER** (§0j.D `G-15(c)`) | `.a`'s receipt: `HLG-44`'s `--minimal` regeneration stays **blocked by ruling**; `M-10`'s RNG rider discharged **vacuously** because no `L-B1`/`L-B2` cure was attempted | **HELD** — the canonical sun cannot re-roll |

**`G-F4-NEG-ROSTER`: GREEN.** No leaf grown, nothing certified, nothing regenerated, nothing migrated.

---

## §7 `G-F4-VUE-TSC-CLEAN` — the final reading. **RED (exit 1), 18 → 1.**

```
⟨cmd⟩ (from fourier-analysis/web) npx vue-tsc -b --force   ×2, both runs byte-identical
EXIT=1
src/components/visualization/ContourEditorCanvas.vue(42,9): error TS6133: 'dragging' is declared but its value is never read.
⟨cmd⟩ /usr/bin/diff tsc1.txt tsc2.txt → IDENTICAL
```

| | count |
|---|---|
| baseline at wave-open (seat 0) | **18** (17 × TS6133 + 1 × TS6196) |
| at close, double-run | **1** |
| **delta** | **−17** |

⊘ **The one survivor is unwritable by any seat in this wave.** `ContourEditorCanvas.vue` is EVALUATE-ONLY under §1; `.c` named this exact diagnostic in its Act 10 judgement (*"the only `G-F4-VUE-TSC-CLEAN` diagnostic left in this unit's directory, one deletion, not taken"*) and wrote no byte. **`.f` read the same 1 at its close and this seat reproduces it.** Relief: **A-c-1**, the same bounds escalation that relieves §3.2's eleven escapes — *one ruling closes both*.

⊘ **The gate's original witness is long dead and is not re-reported.** §4's cell reads *"HEAD does not typecheck (`glass-scrubber` ∉ the pinned vocabulary — MPC-13)"*; F.W1's uplift cured that, and the gate has been RED on a stronger mechanism (`noUnusedLocals`, landed at F.W0 `b3b736c`) since wave-open. Disclosed at seat 0 and carried here — a gate re-reported RED on a cured witness is a false receipt.

---

## §8 `G-F4-ZERO-CONSOLE` — **MEASURED, and the colour published. 1 GREEN / 3 UNREADABLE-BY-ENVIRONMENT.**

⊘ **This is the gate the wave record left `UNMEASURED-AT-OPEN` and declared it must not close that way.** It is measured here.

**The four gates, named at their bytes** — ⟨cmd⟩ `/usr/bin/grep -rn 'consoleErrors' e2e/`:

1. `e2e/workspace-flow.spec.ts:175` — *"no console errors during full flow"*
2. `e2e/paper-performance.spec.ts:235` — *"long scroll keeps mounted sections bounded and logs no browser errors"*
3. `e2e/gallery.spec.ts:118` — *"no console errors on gallery page"*
4. `e2e/contour-extraction.spec.ts:139` — *"no console errors during flow"*

(The fifth hook site, `visualization-crud.spec.ts:612`'s `expect(probes.consoleErrors()).toEqual([])`, is invariant 3 **inside** the CRUD lifecycle test and is not one of the four.)

**RUN**, vite dev at `:3000`, `--project=chromium`, double-run, both runs identical:

| gate | run 1 | run 2 | cause |
|---|---|---|---|
| `paper-performance` *"…logs no browser errors"* | **✓ 2.6s** | **✓ 2.5s** | the only one of the four that touches no API |
| `gallery` *"no console errors on gallery page"* | ✘ 2.3s | ✘ 2.3s | `expect(realErrors).toEqual([])` received **exactly one** distinct entry: `"Failed to load resource: the server responded with a status of 500 (Internal Server Error)"` |
| `workspace-flow` *"no console errors during full flow"* | ✘ 15.6s | ✘ 15.4s | `TimeoutError: page.waitForURL: Timeout 15000ms exceeded` — the upload POST has no backend to answer, so the app never navigates |
| `contour-extraction` *"no console errors during flow"* | ✘ 15.6s | ✘ 15.4s | the same shape at `contour-extraction.spec.ts:155` |

**The environment, measured at this seat before the run and stated as the cause rather than inferred after it:**

```
⟨cmd⟩ nc -z localhost 27017   → MONGO DOWN
⟨cmd⟩ docker info             → DOCKER DOWN
```

⊘ **The discriminator, because "the backend is down" is an excuse unless it is measured.** ⟨cmd⟩ `/usr/bin/grep -ciE 'pageerror|Uncaught|TypeError:|ReferenceError'` over **both** run transcripts → **0** and **0**. **Not one page error, uncaught exception, TypeError or ReferenceError in either run.** The three failures are an absent HTTP peer and a navigation that therefore never happens; none is an error thrown by application code, and none is attributable to a byte this wave wrote.

⊘ **The atomicity precondition the gate actually guards is separately GREEN.** F.W1's twelve-limb transaction landed as **ONE** commit (`538db90`, 58 files) and `.g` verified at its own close that **zero bytes** of the five hook-bearing specs were touched (⟨cmd⟩ `git diff --name-only cc6c32d~1..HEAD -- web/e2e/` → seven paths, none of the five). `FR-GIG-5`'s pagination-drain cure is claimed by nothing in this wave.

**`G-F4-ZERO-CONSOLE`: HONEST-RED, and for the first time READ.** 1 of 4 green; 3 of 4 **unreadable at this seat** with the cause measured, the failure shape named per gate and zero app-code errors in either run. **Relief**: CI's backend arm, where `npm ci` + the compose stack answer `/api`. ⊘ The gate is **not** claimed green and it is **not** left unmeasured — the difference between those two is the whole reason it was flagged at open.

---

## §9 THE HONEST-RED CLOSE — every gate, its colour, its relief

| gate | colour at close | relief, cited by name |
|---|---|---|
| `G-F4-DECISIONS` | **GREEN** (`.i`, `aacf5f28`) | — ⊘ re-read at close per `.i`'s own standing clause: no unit executed an arm `DECISIONS-F.W4.md` did not rule (`.b` Act 13 D2/D3, `.c` Act 8 D8, `.d` step 1 D1, `.e` step 2 D4/step 1 D9), so the green does **not** retroactively redden |
| `G-F4-VITEST` | **GREEN** (`.g`, `cc6c32d`) | — · 7 files / 50 tests at `.e`'s close, all four ruled subjects landed |
| `G-F4-NO-UNUSED` | **GREEN mechanism / RED findings** | 10 `no-duplicate-imports` at `.g`; cleared by `.a` `e365203`, `.b`, `.c` `3f47dcb`, `.e`. `web-build` is green only when the residue is zero |
| `G-F4-A11Y-ROUTE` | **GREEN (i) / GREEN (ii) at close** | 6 of 7 routes joined; `.a`'s AFTER reading: `/paper` · `/morph` · `/demo/shape-extractor` · `/visualize` **CLEAN**; `/equation` 1 `button-name` (`.b`'s, since cured) ; `/gallery` 2 `aria-hidden-focus` = **producer**, riding the relay |
| `G-F4-ADMIN-AXE` | **GREEN mechanism / RED, producer-caused** | `.d` at a production build: **zero `color-contrast`** over banner + three panels; what remains is reka's FocusScope sentinel — **GLASS-RELAY**, no consumer edit cures it without the local patch §0 forbids |
| `G-F4-OCCLUSION` | **GREEN** | `.g` re-pointed it at `<main>` + vertical clip; the 97px it found at shape-extractor is **0** after `.a` |
| `G-F4-CONTRAST-FLOOR` | **RED, bounds-caused** | the cures are in the bytes (`.b` 3.380/4.038 · 4.272/4.532/4.527; `.d` GAB-1 → ≈4.72; `.e` all four ★MF-10 stops; `.f` 4.511/4.513/4.508 on the stricter `--card` plate) and `e2e/contrast-pairs.ts` is **`.g`'s file**. Three units handed over complete replacement rows rather than widen their bounds (`.b` §3, `.d` §B, `.e` §A-e-1). **One paste by the path owner closes it** |
| `G-F4-PRM-CLOCK` | **GREEN** (`.f`, `2ef87d1`) | 8 rAF call owners, **8** consulting PRM, double-run; live probe 0 callbacks in the reduced arm vs 15, 0 page errors |
| `G-F4-DERIVER` | **GREEN** (`.g`, `717d287`) | all eight fields published + CI + 8 assertions. ⊘ Two readings **moved** after `.g` measured — see A-z-7 |
| `G-F4-KATEX-QUIET` | **GREEN** (`.b`, `4a770c2`) | one `renderLatex()` home; `warns=0`, hooks intact |
| `G-F4-DEAD-DEP` | **GREEN** (`.f`, ledger + bundle diff both directions) | `F-W4-SCRUB-LEDGER.md`; two dead deps (`class-variance-authority`, `clsx`) proved and **declared** to the manifest owner, not deleted out of bounds |
| `G-F4-CONV-STUDY` | **GREEN** (`.f`, after `.b`'s `b3b9a35` measurement) | `F-W4-CONV-STUDY.md`, a measured memo; adoption routed SS-3/SS-4 |
| **`G-F4-CARRY-CLOSURE`** | **leg (a) GREEN · leg (b) RED → GATE RED** | §3: **17 escapes**. 11 relieved by **A-c-1** (EVALUATE-ONLY bounds); 5 with **no relief**, carried to the repair docket id-for-id; 1 unwritten instance identity of a booked class |
| **`G-F4-ANCHORS`** | **RED** | the quotation is faithful and rows **12–18** are published ready-to-append; `SUBSTRATE-LEDGER.md` is outside `.z`'s writable set — the F.W0 table's owner appends |
| **`G-F4-CENSUS-CELLS`** | **RED** | 3 of 6 corrected · cell 5 published as a discharge (**A-z-5**) · `:2968` owed by `.c` · the HLG-8 claim owed by `.a` · cell 3 corrected outside its cure's commit |
| **`G-F4-NEG-ROSTER`** | **GREEN (HELD)** | — |
| **`G-F4-VUE-TSC-CLEAN`** | **RED, 18 → 1** | the single survivor is `ContourEditorCanvas.vue(42,9)`, **unwritable by any seat in this wave**; relief **A-c-1** — one ruling closes it and §3.2's eleven |
| **`G-F4-ZERO-CONSOLE`** | **HONEST-RED, MEASURED** | 1 of 4 green; 3 unreadable with `nc -z localhost 27017` **DOWN** and `docker info` **DOWN**, **0** app-code errors in either run. Relief: CI's backend arm |

**18 gates. 11 GREEN · 7 RED, every RED with its relief named and not one of them relieved by a fabrication.**

---

## §10 DEFERRED, WITH HOLDERS — nothing resolved inline

**SS-13 flags, carried as deferred (§5.2), never resolved inline** — each with the unit that raised it:

`.a` — `FM-21`/`FR-AH-16`'s scaling-system owner (§3 D10, the 768×1024 coarse witness) · `FMD-16`'s `--ui-scale` coarse-growth residue.
`.b` — `FR-CP-D1` dark-axes readback · `D·D-B1` coarse+fine · `M-FR`'s ring · `D·D-M1`'s truncation threshold · `D·D-M3` on BOTH engines (the `fr-CCD R-9/K-9` qualification travels with the row) · `FR-EQR-8`'s overflow onset.
`.c` — `AC-D-1`/`SW-1` · `MPC-31`'s cured scheme at a non-boot state · the coarse-factor readbacks · `CCD-D-8`/`ECD-D-4` · `ECD-D-3`'s readback.
`.d` — `GCM-38`'s witness (the row **poses**, and this wave does not answer it).
`.e` — `PAW-15`'s AT-behaviour residue.
`.f` — the composited readback of a populated workspace in the reduced arm · the `BasisCanvas` ↔ `FourierField` **RASTERISATION** comparison (the only half of the study no headless instrument can weigh) · the gBCR magnitude over a KaTeX subtree · `PAW-55`'s own question.

**Routed to later waves, with their reasons**: `FR-GFC-1 = FR-GSB-1`'s list contract, `VV-R2-B` + `GCM-1`'s wiring unit, `SS-C-1`'s persisted `speed` atom, `getMe`'s contract surface, `AA-5`/`-6`/`-10`'s taxonomy, `FR-AUL-21`/`-25`, `GAB-15`, `GCM-1`'s fork provenance, `AA-40`'s sighted-keyboard half → **F.W5–W8**. `PAW-12` + `noUncheckedIndexedAccess` (**priced at 265 diagnostics**, +247) and the two-unit-runner consolidation → **F.W9/W10**. The CONV-STUDY's four adoption questions and `D2(b)`/`D3`/`D7`/`D10`'s posed legs → **SS-3/SS-4**.

**Escalations open at close, each returned and none a block**: `A-g-8` (`web/package-lock.json` ratification) · `A-a-5` ⊕ `A-c-3` (the morph bounds seam, one ruling closing both ends; ⊘ `MPC-31` is a ONE CUT and must not be split across it) · **`A-c-1`** (the EVALUATE-ONLY cure surface — *the single highest-value ruling this wave asks for: it closes eleven closure escapes, the last `vue-tsc` diagnostic, and four live BLOCKERs at once*) · `A-c-2` (`CP-ROW-40`'s third rewire) · `.b`'s and `.e`'s and `.d`'s `contrast-pairs.ts` hand-overs · `.d`'s four not-landed rows (`FR-GFC-1`, `GCM-1`/`GCM-25`/`VV-BLK-1`, `AA-37`, `GAB-28`) · `.f`'s `FR-GFC-1` **refusal with cause** (*"the refusal is the cure"*) and its two dead-dependency declarations.

---

## §11 WHAT THIS CLOSURE DOES NOT CLAIM

- It does **not** claim `VERIFIED`. `F-W4.md`'s posture table says `VERIFIED | **NO** | stamped only at X·F's sub-tranche release close`, and no wave stamps it at its own close.
- It does **not** claim leg (b) green. Seventeen rows escape and five of them have no relief this wave can cite.
- It does **not** claim the three unreadable zero-console gates are green, and it does not claim they are broken. It claims they were **run**, and publishes what the run returned and why.
- It does **not** re-derive `G-11`, `G-12`, the canonical, the carries or the registry. It quotes them, and where it disagrees it files a dated addendum-beside (**E-3**), never an edit.
- It does **not** re-cut an atomiser. Steps (i)–(iv) ran as written; the two reading-rule widenings at §2.4 are **declarations of idioms the spec already uses**, published with the literal reading beside them so the widening can be refused.

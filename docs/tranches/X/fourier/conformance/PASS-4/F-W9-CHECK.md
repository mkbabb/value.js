# X·F · F-W9 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20 **PASS 4**)

**Seat**: fresh. Nothing inherited — not PASS-1/2/3's rosters, not the spec's own §2.1 taxonomy, not RULINGS-3's figures, not CLOSE-CERT's certification. The PASS-3 register, `RULINGS-3.md` and `CLOSE-CERT.md` were read to know what was **ruled** and what was **certified**, never to know what is **true**; every figure below was measured by this seat this session, `/usr/bin/grep` under `bash`.
**Target**: `docs/tranches/X/fourier/waves/F-W9.md` (385 lines, `status: planned`), repaired three times (L-20 rounds 1–3) plus a fabrication-purge sitting.
**Corpus authority**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`. **Real carries (R-3)**: `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` — by path, nothing else.
**Tree probes**: read-only against fourier HEAD `cd26c65` (re-run: `git log --oneline -1` → `cd26c65`; `git log -1 --format=%cd` → **2026-07-03**; `git status --porcelain | wc -l` → **28**). No product source written. No fourier byte written. This file is this seat's only write.
**Verdict**: **DEFECTIVE** — 2 MAJOR · 5 MINOR · 1 LOW. **The census is CLEAN (0 escapes)**, **all 23 gates re-run RED against witnesses this seat executed at the tree**, and **every one of 47 ⟨cmd⟩ receipts re-run by this seat reproduces**. The convictions are: a check-file named as a closure operand in the masthead, which R3-4 made FAIL-BY-CONSTRUCTION program-wide and which no round has touched; and a second *"verbatim"*-labelled span inside the paired region that fails the round's own third test, against two independent certifications that it does not exist.

---

## §1 CENSUS DETECTOR — re-derived, both dash spellings, shape-agnostic, record-qualified (R2-3a / R2-9 / R3-5)

```
# every F.W token in the corpus, both dashes, slash/range expansion at EVERY position
grep -ohE 'F\.W[0-9]+((/(F\.)?W[0-9]+)|([-–—]W[0-9]+))*' fr-*.md | sort | uniq -c | sort -rn
  → 1115 F.W4 · 1010 F.W3/W4 · 824 F.W1 · 232 F.W3 · 147 F.W0 · 120 F.W5-W8 · 72 F.W5–W8
  ·   63 F.W2 ·  54 F.W9/W10 · 52 F.W5 · 9 F.W3/F.W4 · 5 F.W1/W2 · 5 F.W1/F.W3 · … · 2 F.W7

# the F.W9 axis, exhaustively — every W9 token in ANY surrounding context
grep -onE '[A-Za-z.]*W9[/A-Za-z0-9.-]*' fr-*.md | grep -v 'F\.W9/W10'   → ∅, exit 1
grep -c 'F\.W9–W10' fr-*.md | grep -v ':0'                              → ∅  (en-dash arm probed, empty)
grep -o  'F\.W9/W10' fr-*.md | wc -l                                    → 54
grep -l  'F\.W9/W10' fr-*.md | wc -l                                    → 25 records
grep -onE '(^|[^9/])F\.W10' fr-*.md                                     → ∅  (no bare F.W10)
ls fr-*.md | wc -l                                                      → 66
```

**Finding of record**: the F.W9 routing token is **slash-formed only**, in every record, at every position. The en-dash arm is a measured ∅. No `F.W9/F.W10` long form, no bare `F.W9`, no bare `F.W10`. **54 / 25 / 66 reproduces.**

**The 54-occurrence taxonomy, recomputed from zero this seat** (the spec *consumes* F-W10 §2.1's taxonomy under KF.W4(d); recomputed here independently and it reproduces **exactly**). Every one of the 54 sites was opened and read:

| class | n | how it was verified |
|---|---|---|
| routing-law boilerplate (masthead lane taxonomy; **mints no row**) | **14** | all 14 lines read: each is a *"Routing law / Routing targets / Routes:"* census-lane enumeration. AdminAuditLog:31 · AdminFlaggedPanel:38 · AdminUserList:28 · CanvasOverlayButton:36 · CoefficientsPanel:29 · ContourPreview:30 · EquationView:41 · FrequencyGraph:29 · GalleryAdminBanner:33 · GalleryView:30 · HarmonicLevelGrid:36 · InfoCard:33 · PaperView:35 · VisualizationView:39 |
| verdict / ruling prose (dated adjudication bytes, immutable) | **12** | all 12 read: each opens `**ADJUDICATED`/`**DEFECTIVE` or sits in a reader-scorecard/ruling paragraph. AdminAuditLog:142 · AdminFlaggedPanel:169 · ContourPreview:137 · EquationModeToggle:93 · EquationResult:127 · GalleryAdminBanner:122 · GallerySearchBar:124 · PaperArticleWindow:157/:247/:254 · PaperSidebar:124 · PaperView:214 |
| same-identity restatements | **2** | App:142 = *"- **→ F.W9/W10**: C-13 (the four ambient contracts as vitest-floor input)."* (C-13 restated; booked at App:91) · PaperArticleWindow:186 = the R2-7 admission row restating PAW-12's booked rider |
| **routing identities** | **26** | §2a below — each line opened and its id read off the bytes |
| **total** | **54** | ✓ 14 + 12 + 2 + 26 |

**Seven records yield zero re-cut rows** (boilerplate-only, independently derived): AdminUserList · CanvasOverlayButton · CoefficientsPanel · FrequencyGraph · HarmonicLevelGrid · InfoCard · VisualizationView. **18 records carry the 26 identities.**

**Row-shape tolerance (R2-3a.1 / R2-9)**: the 26 are drawn from **all three shapes** — table rows (AFP:95/:110 · ContourPreview:71 · GCM:93 · ImageUpload:61 · PAW:58/:90/:199/:200 · PS:49/:58/:67 · PV:120), id-headed bullets (AAL:87 · App:91 · EMT:41 · EQR:41/:72 · FunctionInput:80 · GAB:49 · GSB:54 · GV:78 · Tooltip:26 · USB:53 · EqView:62) and prose routings walked to their enclosing row id (EqView:191). **No gate below states a shape- or spelling-restricted operand.**

**F.W7 control (R2-8, honoured not re-litigated)**: token-bounded `grep -conE '(^|[^A-Za-z])F\.W7([^0-9]|$)' F-W9.md` → **0**. The corpus's 2 `F.W7` hits are `KF.W7` substrings. F-W9 reaches F.W7 only through the `F.W5–W8` band (×2, `:167` and `:341`). **Nothing here re-derives F.W7's `routedTotal`; the posture stays CLOSED.**

---

## §2 ID-KEYED CENSUS — **39 routed · 35 booked · 4 excluded-with-reason · 0 ESCAPES**

### §2a The 26 registry routing identities, under the §X.1-v4 twin partition

| # | record:line | id | law-assigned home | spec disposition | ✓ |
|---|---|---|---|---|---|
| 1 | fr-AdminAuditLog:87 | **AA-44** | F.W9 | §2.2 · S1 · G-F9-3 | ✓ |
| 2 | fr-AdminFlaggedPanel:95 | **FR-AFP-42** | F.W9 (seat; **seam → F.W4 per §X.1-v4**) | §2.2 seam-before-seat · S1 · §4a-5 | ✓ |
| 3 | fr-AdminFlaggedPanel:110 | **FR-AFP-49** | F.W9 | §2.2 (fold; dissent preserved) · S1 | ✓ |
| 4 | fr-App:91 | **C-13 (App)** | F.W9 | §2.2 · §2.4 · G-F9-1 | ✓ |
| 5 | fr-ContourPreview:71 | **38** | F.W9 | §2.2 · §2.4 (both flagship cures REFUTED, carried) | ✓ |
| 6 | fr-EquationModeToggle:41 | **FR-EMT-11 (= C-16)** | F.W9 | §2.2 · S2 · G-F9-5/-6 — **see D2** | ✓ |
| 7 | fr-EquationResult:41 | **FR-EQR-6** | F.W9 | §2.2 (axe leg) · S2 · §4a-6 | ✓ |
| 8 | fr-EquationResult:72 | **FR-EQR-31** | F.W9 | §2.2 · S2 | ✓ |
| 9 | fr-EquationView:62 | **D·D-B2** | F.W9 | §2.2 (axe leg) · S2 · §4a-6 | ✓ |
| 10 | fr-EquationView:191 | **C·D-28** | F.W9 | §2.2 · S2 · G-F9-6 | ✓ |
| 11 | fr-FunctionInput:80 | **C-13 = D-24** | F.W9 | §2.2 (distinct id from App's C-13, stated twice) | ✓ |
| 12 | fr-GalleryAdminBanner:49 | **GAB-10** | F.W9 | §2.2 (folds by reference → AA-44) · S1 | ✓ |
| 13 | fr-GalleryCardModal:93 | **GCM-42 (= L-14)** | F.W9 | §2.2 · S4 · G-F9-9/-10 · §4a-9 F.W1 lock | ✓ |
| 14 | fr-GallerySearchBar:54 | **FR-GSB-17** | F.W9 | §2.2 · S4 · G-F9-7 | ✓ |
| 15 | fr-GalleryView:78 | **FR-GV-36 (= L-24)** | F.W9 | §2.2 · S4 | ✓ |
| 16 | fr-ImageUpload:61 | **27** | F.W9 | §2.2 · S5 (15/6 pair quoted, never re-derived) | ✓ |
| 17 | fr-PaperArticleWindow:58 | **PAW-12** | F.W9 (rider limb) | §2.2 · §2.4 · G-F9-14 | ✓ |
| 18 | fr-PaperArticleWindow:90 | **PAW-34** | F.W9 | §2.2 · S3 | ✓ |
| 19 | fr-PaperArticleWindow:199 | **PAW-49** | bank: *"F.W3/W4 rider … **+ F.W9/W10** (the flag itself is a repo-config decision)"* | ⟨re-cut⟩ **F.W0** · §2.6 parity · §5 exclusion | ✓ excl |
| 20 | fr-PaperArticleWindow:200 | **PAW-50** | bank: *"→ F.W9/W10 (sequencing input: harness-before-rider…)"* | ⟨re-cut⟩ decision **F.W4** · §2.4 EXECUTE · §2.6 · §5 | ✓ excl |
| 21 | fr-PaperSidebar:49 | **D-B2** | F.W9 (axe leg; token → F.W4) | §2.2 · S3 · G-F9-4 | ✓ |
| 22 | fr-PaperSidebar:58 | **C-M4** | F.W9 | §2.2 · S4 (DISTINCT mechanism, never folded) | ✓ |
| 23 | fr-PaperSidebar:67 | **M7** | F.W9 (axe + lint limb; tsconfig half ≡ MG-θ at F.W0) | §2.2 · S3 | ✓ |
| 24 | fr-PaperView:120 | **D/i-1** | F.W9 | §2.2 · S3 · §4a-10 coupled lock | ✓ |
| 25 | fr-Tooltip:26 | **FR-TT-1** | bank: legs → **F.W4** (17 naming) **+ F.W3** (shim); the F.W9/W10 token is the **promotion note** | ⟨re-cut⟩ **F.W10** · §2.6 · G-F9-22 promotion lock. **Legs restated faithfully at §2.2** | ✓ excl |
| 26 | fr-UserSlugBar:53 | **FR-USB-16** | F.W9 | §2.2 · S4 + S5 · G-F9-7/-13 · §4a-8 | ✓ |

**23 of 26 cut to F.W9; 3 re-cut away, each flagged ⟨re-cut⟩, each deviation warranted at the bank's own bytes (column 4 above, read this seat) and carried for parity at §2.6.** No id double-homed. No id re-booked under a new name.

**§X.1-v4 conformance, re-derived at F-W3's live bytes**: `grep -oE 'F\.W9(/(F\.)?W10)?' waves/F-W3.md | sort -u` → **one distinct form, `F.W9/W10`**, at **F-W3.md:682**: `| fr-AdminFlaggedPanel FR-AFP-42 | the seam; test seat → F.W9/W10 | **F.W4** |`. v4 books the FR-AFP-42 **seam** at F.W4 and routes the **test seat** to F.W9/W10 — which is exactly §2.2's row-2 disposition (seam-before-seat, seam homed F.W3/W4). **`§X.1-v4` heading probed for existence before citation** (`grep -o '^### §X\.1-v4 — THE DEFINITIVE FILE-CRITERION PARTITION' waves/F-W3.md` → reproduces). **No F.W9 identity enters v4's partition; v4 re-cuts no F.W9 identity.** Δ both directions = ∅. *(v4's `L-26` and `GAB-25` rulings: verified to touch no F.W9 row — see **D6** for the record-blind form of the spec's own warrant.)*

### §2b By-mechanism entrants — each coordinate opened; none appears in the 54

| record:line | id | verified at the bytes | disposition |
|---|---|---|---|
| fr-AdminUserList:54 | **FR-AUL-16** | *"zero automated coverage of any kind: no vitest, no test script, **8** e2e specs…"* ✓ · *"Un-harnessable by construction"* killed ✓ · cure *"extend one axe keystone into the admin tab + a vitest devDependency"* ✓ | **booked** (devDep + admin-tab axe limb); terminal home **AT F.W10** |
| fr-FullscreenViewer:79 | **FV-26 (= D-23 · C-m7)** | *"the only e2e \"Fullscreen\" hit is a comment"* ✓ (tree: `gallery.spec.ts:113` **is** a comment ✓) | **booked** · S5 · G-F9-11, teleport lock |
| fr-CanvasOverlayButton:74 | **FR-COB-20 (= C-7)** | *"dies with the file"* ✓; tree: file is **595 B** ✓ | **booked conditionally** — F8-REACH-02 HOLD is RED |
| fr-AppHeader:108 | **FR-AH-45 · C-16** | *"what contract should a shell header state"* ✓ · NO-WAVE-OWNER ✓ · FR-AH-30's REVERSED remedy (*"`glass-overrides` appended after `utilities`) works, and it must be stated"*) ✓ | **booked** (execution limb) · G-F9-12; terminal AT F.W10 |
| fr-PaperArticleWindow:89 | **PAW-33 · C-i-2** | *"**→ F.W1 ledger** (pin-truth row)"* ✓ | **excluded-with-reason** (§5 — rides the C-19 ⊕ PAW-33 pin-truth row) |

### §2c Carry-routed dispositions (R-3: only these two carries are citable)

- **`carry/F-W4-CARRY.md` §CrossEdges, the `F.W9/W10` row** — `grep -F`'d **whole**, this seat: the row reproduces byte-exact including the `⊘ harness before rider, flag before split (PAW-49/PAW-50)` terminator. **Four-for-four booked**, all four folding onto ids already counted (rows 21, 1 ⊕ 12, 22, 17). **No new identity.**
- **`carry/F-W1-CARRY.md` §CrossEdges item 9** — the probe as written (`grep -A0 -n 'F.W1 → F.W9 / F.W10' carry/F-W1-CARRY.md`) resolves to **:246**, and the full 8-item sentence `grep -F`s byte-exact end-to-end including *"Plus the SS-13 residues each record names."* **8 items booked** in the shared §2.2 region under **R-2b**, gated by **G-F9-23**, sequenced at §4a-16, excluded-as-limbs at §5. The SS-13 tail is carried as a **named class**, not absorbed.

### §2d Escape hunt — run independently, and empty

```
grep -n 'NO-WAVE-OWNER' fr-*.md
  | grep -iE 'zero (automated )?coverage|no vitest|unit runner|unit-test|e2e|axe|untested|no test|lint'
  | grep -v 'F\.W9' | grep -viE 'routing law|census lane taxonomy|Routes:|Routing:|Routing per|Routing targets'
  → 14 lines / 0 escapes
```

All fourteen opened and resolved: **FR-AUL-16** and **FR-AH-45** are booked entrants (§2b); **FR-NP-32** is booked F.W0-gated at §4a-2 / G-F9-20; **FR-CP-43/-44/-45** and **GAB-29** are routed as SS-3/SS-4 spec input at §4b/§5; **fr-ImageUpload row 11** and **fr-SvgFilters M-7** are F.W10 drain rows (verified held: `fr-SvgFilters:91, INFO` carries a terminal verb in `F-W10.md:243`); the remainder (**FR-EQC-15** · GalleryDraftsSection **F-6**/**m-18** · **PAW-38** · fr-ConvergenceLegend **D-19** (a cascade row, not a coverage row) · fr-ExportModal/fr-MorphShapePreview verdict-and-instrument prose) carry no coverage-execution limb. **Nothing routed to F.W9 in any format, by any spelling, in any row shape, at any position, is missing from §2a–§2c.**

### §2e Totals

`routedTotal = 26 + 5 + 8 = **39**` · `booked = 23 + 4 + 8 = **35**` · `excluded-with-reason = **4**` (PAW-49 → F.W0 · PAW-50's DECISION leg → F.W4 · FR-TT-1 → F.W10 · PAW-33 → F.W1 ledger) · **`escaped = 0`**.

**Arithmetic falsifiability re-checked against the sections themselves** (PASS-3 D3's cure): §2.2 table = **22 physical rows**, 4 of which carry two coordinate/id pairs (`grep -c '^| fr-[A-Za-z]*:[0-9]* / :[0-9]*'` → **4**) = **26 identities** ✓ · entrant bullets = **5** ✓ · checkpoint items = **8** ✓ · §2.5 rows = **5** ✓ · §2.6 rows = **5** ✓ · gates = **23** ✓ · seats = **5** ✓. **26 ⊕ 5 ⊕ 5 = 36; 36 + 8 = 44.** The denominator is now falsified by counting the sections, which is what §2 claims. **PASS.**

**M-25 census axis: PASS.**

---

## §3 RECEIPT REALITY — 47 ⟨cmd⟩ receipts re-run by this seat; **all 47 reproduce**

Bases bound as §2.8a declares: `$X` = `docs/tranches/X/fourier/` · `$V` = `docs/tranches/V/megatranche/` · `$R` = `$V/registry/adjudicated/` · `$M` = `$V/formation/fourier/` · `$F` = `/Users/mkbabb/Programming/fourier-analysis` @ `cd26c65`. **The base rule was tested, not assumed: every inline ⟨cmd⟩ this seat ran resolved from the base its first path component names, and no command mixed two bases.**

**Cross-spec (11):** G-9 heading ✓ · *"a runner is installed … proving the seat live"* ✓ · the **Disjointness with F.W9** paragraph ✓ · *"**Explicitly NOT green-by-coverage** — F.W0 must not pre-empt the floor's scope."* ✓ (two spans, as labelled) · `| **F.W9 / F.W10** | F.W0 owns only the **seats**` ✓ · the 8-`e2e/*.spec.ts` row **with its full parenthetical** ✓ · *"The e2e denominator is 8.** Stated positively"* ✓ · *"shim **21 cartoon-card sites / 14 files**"* ✓ · *"`text-admin-label` **7 / 4 files**"* ✓ · *"ONE corrected anchor table published; every later wave quotes it"* ✓ · *"Every later wave cites this table rather than a challenge file"* ✓ · ``SUBSTRATE-LEDGER.md` | **create**`` ✓.

**F-W1 / F-W3 / F-W4 (5):** *"The roster is TWELVE limbs and stays twelve"* ✓ · *"9. **F.W1 → F.W9/F.W10.** The minted visual-regression checkpoint set"* ✓ · *"the 8-item visual-regression checkpoint set | **F.W9** home, **F.W10** terminal-verify (R-2b)"* ✓ · *"- **→ F.W9/W10**: axe on `/paper` (PS D-B2)"* ✓ · F-W3's `§X.1-v4` heading ✓ and its single seam routing cell ✓.

**Formation / census / relay (7):** *"**(b) API → self-hosted Docker at `babb.dev`.**"* ✓ · `grep -o '6b' lane-docs.md` → **∅, exit 1** ✓ (absence form holds) · `grep -o '4\.5' CENSUS-2026-08-03.md` → **∅, exit 1** ✓ · *"a unit-test floor (vitest) decision"* ✓ · *"No unit-test runner — vitest is ABSENT"* ✓ · `### INP / long-task discipline` ✓ · the **flattened** lane-docs health-gate sentence (`tr '\n' ' ' | grep -o …`) ✓ — the line-wrap note is accurate.

**Structural splice (5):** checkpoint-block `diff` → **EMPTY** (18 lines each) ✓ · 26-identity-table `diff` → **EMPTY** (26 lines) ✓ · `^\*Heading mirrored` `diff` → **DIFFER** ✓ · `RECEIVED HERE BY SPLICE` at the twin ✓ · the twin's *"below are the SHARED BYTES, authored here and carried verbatim into F-W9 §2.2"* ✓. **The paired splice is PERFORMED at both ends, in both ruled directions** — F.W9 authored the checkpoint block and F.W10 received it; F.W10 authored the re-scoped D/i-1 cell and F.W9 received it. `grep -o 'F\.W10 does not author F\.W9' F-W10.md` → **2 hits** ✓.

**Corpus register, all 24 rows (§2.8a A + B):** every one re-run against the frozen 66 — **all reproduce**, including the two labelled composites, the FR-CP-32 three-record set (`grep -l 'FR-CP-32' *.md` → exactly `fr-CoefficientsPanel` · `fr-EqCoefficientsPanel` · `fr-FrequencyGraph`, one booking + two citations, **no double-home**), the M1 parse witness (*"35 top-level nodes; **zero** valid `@source`; one garbage at-rule literally named `` source` `` spanning :203–222"*), FR-GIG-15's two spans, and the N-2 cure row.

**Round-3's headline repair, re-run (R3-3.5):** the pasted form-agnostic probe returns **exactly two distinct forms** — `PROGRESS.md:15` and `lane-frontend.md:568` — and the residue probe returns **∅, exit 1**, precisely as pasted. `grep -onE 'lane-frontend ?:\[5\]68' F-W9.md` → **4 bracket-class mentions** (`:3`, `:204`, `:205`, `:368`), **not one an occurrence** — the bracket idiom works as designed, and §5's row now carries the row label. **E-9(g)'s conviction is genuinely cured at the bytes.** *(But see **D4** — the probe's stated scope still exceeds its reach.)*

**Third-axis (SPAN) sweep, this seat's own** — `grep -F` of each label's **whole** extent, not the fragment pasted. Nine labelled spans tested; **seven pass** (the D/i-1 quote **with** its period ✓ · FR-TT-1's promotion note **with** its period ✓ · the L-4 census parenthetical whole ✓ · FV-26's quoted span whole ✓ · FR-AUL-16's cure whole ✓ · the 8-item checkpoint sentence whole ✓ · the F-W4-CARRY row whole ✓). **Two fail — D2 and D7 below.**

**Meta**: no receipt in this file was convicted on an automated verdict; every failure was read at its site by hand, and the escaped-pipe (`\|`) and shadowed-`grep` traps CLOSE-CERT §1.3 discloses were avoided by running `/usr/bin/grep` under `bash` with bare pipes.

---

## §4 GATES — 23 born-RED, every witness re-executed read-only at `cd26c65`

| gate | witness re-run by this seat | state |
|---|---|---|
| G-F9-1 | scripts = `dev,build,preview,test:e2e,test:e2e:ui` **exactly**; `vitest` in **neither** dep block (`undefined`/`undefined`); no `vitest.config.*`; `find web/src -name '*.test.ts' -o -name '*.spec.ts'` → **0** | **RED ✓** |
| G-F9-2 | `ls web/ | grep -iE 'eslint|oxlint|biome'` → **0**; no `lint` script | **RED ✓** |
| G-F9-3 | `grep -rln "admin" web/e2e/ | wc -l` → **0** | **RED ✓** |
| G-F9-4 | AxeBuilder in exactly **2** files (`visualization-ux`, `visualization-crud`); `/paper` **is** navigated — `paper-performance.spec.ts:38` `await page.goto("/paper", …)` ✓ | **RED ✓** |
| G-F9-5 | `"@axe-core/playwright": "^4.11.3"` present, never pointed at `/equation` | **RED ✓** |
| G-F9-6 | `grep -rn "/equation" web/e2e/` → **one** hit, `visual-baseline.spec.ts:34`, an assertion-free slug | **RED ✓** |
| G-F9-7 | `:19-22` `.or()` mask ✓ · `:49-53` `.glass-dock` branch ✓ · `:57-63` `if (await filterToggle.isVisible())` ✓ · `:66-82` `isVisible().catch(() => false)` ✓ · `grep -rn glass-dock web/src/` → **0** ✓ | **RED ✓** |
| G-F9-8 | `test.fixme` → **five** call sites: ux `:110` `:133` `:192` **`:212`**, crud `:630`. `:212`'s own comment reads *"Un-skip at W3 when the auto-recompute seam … lands."* — the carve-by-name is **exact** | **RED ✓** |
| G-F9-9 | `modal|dialog|card|Open Visualizer` in `gallery.spec.ts` → **0**; **6** `test(` blocks | **RED ✓** |
| G-F9-10 | guard filters `error`-only + `404` | **RED ✓** |
| G-F9-11 | `gallery.spec.ts:113` is a **comment** ✓; `<Teleport to="body">` sites = exactly **2** (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105`) ✓ | **RED ✓** |
| G-F9-12 | `paper-performance.spec.ts:328` `/switch to dark mode/i` ✓; `:329` `waitForTimeout(250)` ✓; the F.W4 cure attribution ⟨cmd⟩ reproduces at `fr-DarkModeToggle` ✓ | **RED ✓** |
| G-F9-13 | `playwright.config.ts` `projects:` opens `:46`, closes `:51`, exactly **one** `chromium`/Desktop-Chrome project ✓; 8 specs / **29** `test(` blocks ✓ | **RED ✓** |
| G-F9-14 | `TRANSCODED_FIGURES` at `lib/figureDimensions.ts:52` + `:56` only; `PaperArticleWindow.vue` → **0**; `resolveFigure` at `PaperArticleWindow.vue:44` ✓. **Invariant HOLDS**: `assets/` = **28 png / 26 avif / 26 webp**, unpaired = exactly `fourier.png` + `maintainer-avatar.png` ✓; `FIGURE_DIMENSIONS` keys = **26** = `\includegraphics` count **26** ✓ | **RED ✓** |
| G-F9-15 | `f2fe447` exists; `git rev-list --count f2fe447..HEAD` → **49**; HEAD date **2026-07-03**; porcelain **28**; `M/PROGRESS.md` M.W2/W3/W4/W11 all `planned` ✓ (`:15-28` is the M.W0–M.W13 board). C-1 stands | **RED ✓**, MEASURE-AT-OPEN correctly declared |
| G-F9-16 | `grep -c 'conclusion\|workflow_run\|gh run\|inv-28' scripts/deploy-hook.sh` → **0**; `deploy-pages.yml:48-57` carries the named `inv-28 gate` with the three-clause `if:` ✓ | **RED ✓** |
| G-F9-17 | M.W11 `planned`; no run id on record | **RED ✓** |
| G-F9-18 | FR-AH-1 order-lock facts byte-exact at the record | **RED ✓** |
| G-F9-19 | `web/Dockerfile` = **43** lines; `:5` = `COPY web/package.json web/package-lock.json ./`, removal comment `:6-10` ✓; `COPY assets/ public/assets/` `:24` ✓; six-file `COPY paper/…` `:26-29` ✓; `FROM nginx:alpine AS production` `:31` ✓; `nginx/fourier.conf` = **72** lines ✓ | **RED ✓** |
| G-F9-20 | HEAD pins `^3.1.0`/`^2.2.0`/`^0.10.0`/lucide `latest` vs WT `^4.0.0`/`^4.3.0`/`^0.13.0`/`^1.0.0` — **verified by `git show HEAD:web/package.json` diffed against the WT** ✓; `CanvasOverlayButton.vue` = **595 B** ✓; M1's `:203–222` byte-exact ✓; **FR-NP-32 (≡ fr-PaperSidebar M1)** canonical at **all three** statements of the gate (`:304` G-F9-20, `:316` §4a-2, `:337` §4b) — **R-8 / R3-8 satisfied** | **RED ✓** |
| G-F9-21 | 54 / 25 records / 0 bare `F.W10` / 66 ✓; both shared regions `diff` **empty** ✓ | **RED ✓** — face carries E-1 + E-9(b); **see D2: there is a fourth, undisclosed** |
| G-F9-22 | FR-TT-1 promotion lock byte-exact; the L-4 attribution word **restored** and its ⟨cmd⟩ reproduces ✓; `admin` → 0, no axe on `/paper`, `/equation` = one slug | **RED ✓** |
| G-F9-23 | `toHaveScreenshot` → **0 in all 8** ✓; no `*-snapshots` tree-wide ✓; `visual-baseline.spec.ts:48` is the π capture, `page.screenshot({` opens **`:55`**, keys `:56-58`, `});` at `:59` ✓; `--shadow-cartoon` → **1 file / 3 hits** ✓; `cartoon-surface` → **1 file** vs `cartoon-card` → **15 files** ✓; `text-admin-label` → **4 files** ✓; `.disclosure-content` → **0** ✓ | **RED ✓** |

**23/23 born-RED against commands this seat ran. Every cited path exists or carries a `create` marker with its path. Every gate's GREEN is reachable and named. L-19: PASS.**

**Operand purity (R2-9), gate by gate**: no gate cell states a shape- or spelling-restricted operand; G-F9-21's closure operand is the corpus's own `54/25/66` and the 26 routing identities over all three row shapes; the ImageUpload `15/6` and FR-TT-1 `17` denominators are **quoted at their banked homes and routed to G-12 for adoption**, never re-derived; KF.W4(d) is honoured (§2.1 consumes F-W10's taxonomy; G-F9-3 extends the existing keystone rather than authoring a rival oracle). **No gate cell cites a check file.** **The breach is in the masthead, not in a gate — see D1.**

---

## §5 DEFECTS

### D1 · **MAJOR** — a CHECK FILE is named as a co-operand of this spec's id-keyed closure, which R3-4 made FAIL-BY-CONSTRUCTION program-wide

The masthead (`F-W9.md:3`), re-run this seat:

```
grep -o "this spec's id-keyed closure runs against.\{0,180\}" F-W9.md
  → this spec's id-keyed closure runs against the 66-record registry at
    `docs/tranches/V/megatranche/registry/adjudicated/` plus `conformance/PASS-1/F-W9-CHECK.md`
```

**RULINGS-3 §R3-4**, stated as a standing law and expressly *"made program-wide"*: *"a closure/census transcript whose LHS is a count copied from any check file **FAILS BY CONSTRUCTION** — check files and rulings are measurements and cure-shapes, never quotable operands. A gate whose operand is a superseded seat's enumeration can only ever re-find that seat's misses… **Check files may be named as prior runs, never as the operand.**"* This sentence names `PASS-1/F-W9-CHECK.md` as part of **what the closure runs against** — an operand, in the plainest form the ruling forbids, not a prior run.

**Why three rounds walked past it.** R3-4 applied the law **by name to five denominators** (F-W0's 82 · F-W1's 357 · F-W3's 691/62 · F-W4's gate witness · F-W5's 167) and F-W9's was not among them. **That absence lifts nothing** — R3-8 ruled exactly this loophole shut in terms for FR-NP-32 (*"absence from a directive index lifts nothing"*), and R3-4's own clause is a standing law, not a five-item list. The per-wave directive index for F-W9 carries R3-3.5 · R3-3.7 · R3-9.5 and the PASS-3 riders; it does not carry R3-4, and the repair seat read the index rather than the law.

**The aggravation is that the same sentence gets the class right twice and wrong once.** Twenty words earlier the masthead declares the fold seat's intake packet *"**not an in-tree authority**"* carrying *"NO gate weight"* (R-3), and forty words later it declares *"rulings files are cure-shapes, never quotable authority"*. The file knows that measurements and cure-shapes are not operands. It applies the rule to the packet and to the rulings, and exempts the check file — the one of the three that is literally a superseded seat's enumeration of this very census.

**Class**: check-file operand (R2-9 / R3-4 / R3-10 row 8). Nothing booked moves and no gate cell carries it — the conviction is against the closure's declared basis. **Cure**: one clause — the closure runs against the 66 records; `PASS-1/F-W9-CHECK.md` is named as a **prior run**, which is the disposition the ruling licenses.

### D2 · **MAJOR** — a SECOND *"verbatim"*-labelled span fails the round's own third test, inside the paired region, against two independent certifications that it does not exist

§2.2's `fr-EquationModeToggle:41` cell (`F-W9.md:92`, inside the SHARED bytes):

> *Rider verbatim: "the gates for FR-EMT-1/-5's cures ride their own waves."*

The quote marks close **after a terminal period**. The record's bytes (`fr-EquationModeToggle.md:41`, frozen corpus) are:

```
**→ F.W9/W10** (the gates for FR-EMT-1/-5's cures ride their own waves).
```

— the period falls **outside** the parenthesis. Receipts, this seat:

```
grep -cF "the gates for FR-EMT-1/-5's cures ride their own waves." $R/fr-EquationModeToggle.md → 0
grep -cF "the gates for FR-EMT-1/-5's cures ride their own waves"  $R/fr-EquationModeToggle.md → 1
grep -oF "ride their own waves)."                                  $R/fr-EquationModeToggle.md → ride their own waves).
```

**This is E-10(b)'s exact class, three rows above E-10(b)'s own cell, and two certifications say it is not there.** §2.8a's Sweep result asserts: *"**Every *"verbatim"* label in this file is re-read under the third test at round 3; the one that failed is E-10(b)**"* — false by one. `PASS-3/CLOSE-CERT.md` §6.1 certifies *"**724** label sites byte-checked: **0** word-level drifts"* and §6.2 lists eleven markup cures of which F-W9's is the fr-Tooltip bold — this span appears in neither list, and it is neither a word drift nor a markup drift: it is a **scope** drift, which is precisely the axis §2.8a says round 3 added. The axis was declared and the sweep under it was not exhaustive.

**The consequence is a live under-count on a gate's face.** The cell sits in the paired §2.2 region, so its cure is a **paired** edit landing in both specs in one commit — making it a **FOURTH** paired obligation that **G-F9-21's face does not carry**. That face today reads *"the paired obligations are THREE… **E-1** and **E-9(b)** remain outstanding"*. PASS-3 **D2** convicted this same face for carrying **two** when there were **three**; the face was corrected, the sweep that would have found the fourth was declared complete, and the count went stale again in the same round. **§4a-17's own law is the cure**: disclosed-and-paired, never fixed unilaterally, never left unsaid.

**Rider (same class, weaker):** §2.3's **S2** cell labels *"The packet's strongest seat argument, verbatim: this one spec would have caught B-1, B-2, C-29, D-07 and D-14 mechanically"*. The record reads *"one interaction spec (compute → notation → budget → reload) **would have caught** B-1, B-2, C-29, D-07 and D-14 mechanically"* — the emphasised fragment `grep -F`s clean, the **labelled extent** does not (`this one spec` is spec-authored). Unlike D2 proper this span carries no quote marks and lies outside the paired region, so it is a seat-local one-word re-scope.

### D3 · **MINOR** — E-1's absolute is falsified by the very cell E-1 discloses, and unlike the masthead's it was never re-scoped

§2.8 **E-1**'s disposition column (`F-W9.md:191`) states, as an unqualified absolute:

> ***No prose in this file quotes 9.***

Two sentences earlier the same cell states the opposite: *"both specs carry the byte-identical table **including the defect**, and this row is the disclosure."* Measured:

```
grep -on '9 e2e[^,.]*\|nine e2e[^,.]*' F-W9.md
  → 88: 9 e2e never enter the audit tab       ← the shared AA-44 cell, UNQUOTED, in the table's own voice
  → 191: 9 e2e never enter the audit tab"* …  ← E-1's own quotation of :88
```

`F-W9.md:88` is not a quotation and carries no quote marks: it is the routing cell's own prose. The masthead's parallel absolute (*"no line number into a live sibling survives"*) **was** re-scoped at round 3 to *"in this spec's own voice"* after E-10(a) convicted it; E-1's was left in its round-1 spelling and has now carried through three repair rounds and a purge sitting. Same shape, same file, one cured and one not. **Cure**: the four words *"outside the shared bytes"*, which is what the cell already means and already argues.

### D4 · **MINOR** — the "form-agnostic" probe is still a stem list, and its scope sentence is false

**E-10(a)** certifies its probe is run *"over **every external authority this file names**"*. The pasted alternation names eight stems (`F-W[0-9]+(-CARRY)?`, `KF-W[0-9]+`, `COHESION`, `lane-(docs|frontend|crud)`, `CENSUS…`, `INTAKE…`, `J-diff-shape`, `PROGRESS`). This seat's **stem-agnostic** sweep —

```
grep -onE '[A-Za-z][A-Za-z0-9_.-]*(\.[a-z]+)? ?:[0-9]+(-[0-9]+)?' F-W9.md
```

— returns at least two coordinates into named authorities the alternation cannot see: **`atomdiff.py:12-14`** (`:341`, §4b's SS-4 row) and, in a shape no `NAME[ .]:[0-9]+` law can express at all, **`glass-ui 8.0.0:69-73`** (`:108` — a `version:LINE` form beginning with a digit). `SUBSTRATE-LEDGER` and the `fr-*` record stems are likewise named and likewise absent.

**Nothing escapes today**: `atomdiff.py` resolves in the **fourier tree at pinned HEAD** (`$F/api/lib/crud/atomdiff.py`, verified present), which R2-2 item 2 permits; and `:69-73` is **the record's own coordinate** (`fr-Tooltip.md:26` reads *"Producer corroboration at 8.0.0 (`:69-73`)"*), quoted not adopted. So the residue ∅ is true in substance. **What is false is the certification's scope sentence** — and the close act's standing law it installs (*"a probe that certifies a CLASS is written over the class's SHAPES — `NAME[ .]:[0-9]+`, **not a list of stems**"*) is contradicted by the very probe pasted to discharge it, which is a list of stems with a widened shape. Four rounds have now written a probe whose stated reach exceeds its expressed reach.

### D5 · **MINOR** — the file's most-cited cross-spec anchor returns ∅ under the file's own §-existence probe, as the file spells it

`F-W1 §4, intra-wave order step 4` is this spec's load-bearing anchor for the ATOMIC transaction — cited **9 times** (`grep -c 'intra-wave order step 4' F-W9.md` → **9**), at §2.2 items 5/7, §2.4, §4a-3, §4b's F.W1 row, §5's limb row and the DENOMINATOR block. The close act's standing law: *"a `§` cited into any external authority is greped for its own existence before it is cited."* Run as the file spells it:

```
grep -c 'intra-wave order' waves/F-W1.md   → 0
grep -c 'Intra-wave order' waves/F-W1.md   → 1     (F-W1.md:272, `**Intra-wave order (binding):**`)
```

Step 4 is at `F-W1.md:276` and does carry *"The roster is TWELVE limbs and stays twelve"*, so **the anchor resolves case-insensitively and no substance moves.** But the existence probe the file installed at round 3 — the one whose absence let `lane-docs §6b` and `census §4.5` survive two rounds — returns **∅** for the anchor this file cites more than any other, and returns it for a one-character reason. E-9's own lesson (*"an anchor idiom that abolishes line numbers does not, by itself, make a citation real"*) applies to case as it does to existence.

### D6 · **MINOR** — the v4-consumption warrant is a record-blind absence claim over a live homonym class one of whose members this spec books

§4b's F.W3/F.W4 row justifies *"v4 CONSUMED, and it moves nothing here"* with the parenthetical:

> *"…`L-26` appears nowhere in this spec"*

The first half of the sentence is properly record-qualified (`fr-VisualizationView L-26` → F.W3); the **warrant** is not. `L-26` is a live three-member homonym class in the frozen corpus:

```
grep -n 'L-26' fr-*.md
  fr-AdminFlaggedPanel.md:110 | FR-AFP-49 · D-21 / L-26  ← THIS SPEC BOOKS IT (census row 3)
  fr-FourierMorphDemo.md:78   | FMD-31 · m-1 ⊕ i-1 ⊕ L-26
  fr-VisualizationView.md:91  | L-26 (r1-carried) … → F.W3/W4   ← the one v4 rules
```

**R3-5.3** made record-qualification the fourth inline detector axis on exactly this ground (*"the booking test is the (record, id) PAIR — a bare token is not an identity"*; 140 head-ids collide across records). The conclusion survives — v4's `fr-VisualizationView L-26` genuinely touches no F.W9 row, and F.W9's booking is `(fr-AdminFlaggedPanel, FR-AFP-49)` under its own name — but the sentence that carries the whole v4-conformance claim is stated in the bare-token form the ruling convicted at F-W3's g19. One record qualifier fixes it. *(`GAB-25` is correctly handled: verified absent from F-W9 and a glyph-scale row at `fr-GalleryAdminBanner:67`, not a coverage row.)*

### D7 · **LOW** — the shared bytes re-spell the record's own coordinate

§2.2's FR-TT-1 cell renders *"Producer corroboration glass-ui 8.0.0:69-73:"*; the record (`fr-Tooltip.md:26`) reads *"Producer corroboration at 8.0.0 (`:69-73`)"*. The address is the record's and licensed; the **spelling** is the spec's. Anti-rename cuts both ways — this is E-10(f)'s class (the FR-TT-1 attribution word) one cell over, and it is inside the paired region, so its cure rides a paired edit rather than a unilateral one. Noted so it is not later mistaken for the record's own form, and because it is the shape D4's probe cannot express.

---

## §6 AXES THAT PASS

| axis | verdict | receipt |
|---|---|---|
| **ID-KEYED CENSUS (M-25) under §X.1-v4** | **PASS** | 39 routed · 35 booked · 4 excluded-with-reason · **0 escapes**. Taxonomy recomputed from zero and reproducing exactly (14/12/2/26 = 54); all 54 sites opened and read; 7 zero-row records confirmed; both dash spellings swept and the en-dash arm measured ∅; second-position and record-qualified expansion run; all three row shapes represented; the independent NO-WAVE-OWNER escape hunt returns 14 lines and **0 escapes**. **v4 conformance verified at F-W3's live bytes**: one `F.W9/W10` form, one routing cell, booked F.W4 — the disposition §2.2 already carries. Each of the three ⟨re-cut⟩ deviations warranted against the bank's own routing column, read this seat. **§2's decomposition is falsifiable by counting the sections and it closes: 26 ⊕ 5 ⊕ 5 = 36; +8 = 44** |
| **RECEIPT REALITY** | **PASS with D2/D7** | **47 of 47 ⟨cmd⟩ receipts reproduce**, including all 24 register rows against the frozen corpus, all 11 cross-spec quotations, both absence probes (`6b` → ∅ exit 1; `4\.5` → ∅ exit 1), the flattened lane-docs probe, the round-3 form-agnostic probe **and its residue ∅**, and the bracket-class idiom (4 mentions, 0 occurrences). **Both structural splice `diff`s EMPTY; the head-sentence `diff` DIFFERs as declared.** The `$X`/`$V`/`$F`/`$R`/`$M` base rule was tested rather than assumed and holds for every command run. Exceptions: D2's span (paired region) and D7's re-spelling (paired region) |
| **M-25 DEPTH** | **PASS** | **FR-NP-32 (≡ fr-PaperSidebar M1)** canonical at **all three** statements of the gate (`:304`/`:316`/`:337`) — R-8 / R3-8 satisfied, the two register rows being home attributions not gate statements · **PAW-44 / LAW-3** byte-exact at the bank (*"PAW-44 restoration lands WITH-or-AFTER PAW-1 + PAW-30, never before"*) and **LAW-4** (*"one clearance authority only"*) beside it · **MPC-31 = MPC-3⊕10⊕13⊕8⊕22** verified (*"MPC-13 ⊕ MPC-8 ⊕ MPC-22 edits land as **one cut**"*, MPC-3/MPC-10 the conjunction terms) · **FR-MSP-6** verified as *"THE VOID-CURE LOCK"* that REPLACED the killed D-2 cure (K-13), and *"two-channel"* is the record's own word · **anti-cures honoured**: ContourPreview 38's two flagship cures REFUTED at the bank (*"21-site typecheck break at the uplift target (KILL-6)"*; the `out-in` mount-order refutation), FR-AH-30's REVERSED remedy (*"`glass-overrides` appended after `utilities`) works, and it must be stated"*), GAB-29 carried as a cure-**falsifier**, `fr-App C-12` as a NEGATIVE record · **dissents preserved**: FR-AFP-49's blocker-weight, FR-EMT-11's reader-2 MAJOR under L-9.1, FR-USB-16's overruled r2 MINOR, GAB-13's worker-DU, GCM-4's DU BLOCKER, PAW-12's LC MINOR · **twin law obeyed both ways**: the checkpoint set booked (no silent drop) **and** paired (no unilateral edit), performed in both ruled directions |
| **GATES (L-19 / R2-9)** | **PASS** | 23/23 born-RED against witnesses this seat executed at `cd26c65`. Every numeric witness re-derived independently — 8 specs · 29 `test(` · 5 `test.fixme` · 2 AxeBuilder files · 2 Teleport sites · 1 chromium project · 595 B · 49 ahead · 28 porcelain · 43 Dockerfile lines · 72 nginx lines · 28/26/26 assets · 26 = 26 · the HEAD-vs-WT pin quadruple. **No gate cell states a shape- or spelling-restricted operand and no gate cell cites a check file**; every GREEN is reachable and named; KF.W4(d) honoured at §2.1 and G-F9-3. **The check-file operand is in the masthead — D1** |
| **POSTURE** | **PASS** | `status: planned` (one occurrence) · four-verb IMPLEMENTED **NO** / VERIFIED **NO** · **VERIFIED accounting re-derived: 10 tokens, 2 USES** (`:15` four-verb, `:385` close act), 8 MENTIONS (`:3` masthead, `:205` ×4 E-10(g), `:224` ×3 the re-worded §2.8a heading) — **E-10(g)'s mention/use disclosure is TRUE at the bytes and the third stamp is genuinely retired** · **F.W7 zero-row posture intact** — token-bounded `F\.W7` in F-W9 → **0**; band contact only, ×2 · **F.W1 transaction cited whole at its pinned coordinate with the CORRECT extent TWELVE**, re-verified at the charter's live bytes (`F-W1.md:276`), never restated (R-4b) — *see D5 for the anchor's case* · **F.W0 pre-gates honoured** with G-F9-20 as witness · **SS-4 owner rulings flagged inline, never presumed** (trie-vs-KISS with the `atomdiff.py:12-14` INCUMBENT dissent · remix-vs-fork · born-visibility · visibility-enum · version-`_id` · redaction parity · pagination idiom) plus OG-F1/OG-F2/OG-V1-V3 · **both trees READ-ONLY** — §1b's WRITE-SEAT DECLARATION, F-W5's *"`fourier-analysis` is READ-ONLY, always"*, COMMISSION §2 restated, producer rows ask-only via SS-6 / LATEX-RELAY · execution gate restated as §5's last row |
| **RULINGS-3 APPLIED TO F-W9** | **3 of 3 directives landed; ONE standing law missed** | **R3-3.5** ✓ fully — `:354` converted to the row label at both statements, the form-agnostic probe pasted and **reproducing**, the masthead absolute re-stated only in its true scope, the bracket-class idiom working (4 mentions / 0 occurrences) · **R3-3.7** ✓ **PERFORMED** — F.W10 authored the re-scoped D/i-1 cell, F.W9 received it by splice, the table `diff`s empty, the coupling clause is outside the quote marks and the corpus probe (`never scheduled independently` → 0 in all 66) reproduces · **R3-7.3** ✓ — N-2's cure attributed to **F.W4** at all three sites (§4a-12, G-F9-12's falsifier, §5's exclusion row), each carrying the bank's own ⟨cmd⟩, which reproduces · **R3-9.5** ✓ — four bases declared and the rule holds under test · **R3-3.10** ✓ — the five `grep -c … → 0` receipts over live siblings are absence probes now; counts survive only over the frozen corpus and pinned tree · **PASS-3 riders** ✓ — D3 decomposed inline, D4 homed, D5 rooted, D6 restored at G-F9-22, D7 retired, D8 disclosed-not-trimmed. **MISSED: R3-4's standing FAIL-BY-CONSTRUCTION law** — the per-wave index did not name F-W9 and the masthead's check-file operand survives (**D1**) |

---

## §7 VERDICT

**DEFECTIVE — and at a higher standard than pass 3 could reach.**

Everything pass 3 convicted is genuinely cured, and this seat re-derived each cure rather than accepting it. The `lane-frontend :[5]68` survivor is converted and rendered in a bracket class that makes the strike self-consistent; the form-agnostic probe is pasted and returns exactly what it says; the D/i-1 *"verbatim"* label is re-scoped and — the part that could have been asserted and was not — **the re-scope was PERFORMED as a paired splice, with the twin authoring and this file receiving**, so the region `diff`s empty in both directions. N-2's cure is homed at F.W4 in three places under the bank's own words. The 36/44 denominator is decomposed into terms a reader falsifies by counting sections, and it closes. The third `VERIFIED` is retired and the mention/use accounting is true at the bytes. Four command bases are declared and the rule survives being tested. Forty-seven receipts re-run, forty-seven reproduce. Twenty-three gates born-RED against a tree this seat opened itself. The census is clean by a full independent recomputation from the 54 sites up.

What convicts is two things, and both are the same failure at different altitudes: **a rule the file states correctly and applies incompletely.**

**D1** is the sharper. The masthead names a check file as a co-operand of this spec's id-keyed closure — the exact form R3-4 declared FAILS BY CONSTRUCTION and made program-wide, in the same sentence that correctly refuses the intake packet and correctly refuses rulings files. Three rounds walked past it because R3-4 was applied *by name* to five denominators and F-W9's was not one, and the repair seat read the directive index rather than the law. **R3-8 had already ruled that shape shut** — *"absence from a directive index lifts nothing, which is exactly how these two waves escaped it"* — for FR-NP-32, one ruling earlier, in the same file.

**D2** is the same shape one level down. Round 3's contribution was the SPAN axis: a *"verbatim"* label must be `grep -F`'d over its whole extent, not the fragment the seat chose to paste. The axis is right, the law is stated in the close act, and the sweep run under it stopped at one cell. Three rows above E-10(b)'s own subject, `Rider verbatim: "…ride their own waves."` closes its quote marks around a period the record puts outside a parenthesis. §2.8a certifies that every label was re-read under the third test and that exactly one failed; CLOSE-CERT certifies 724 label sites and zero drifts. Both are false by one, and the consequence is a **fourth** paired obligation that G-F9-21's face does not carry — which is precisely the under-count PASS-3 D2 convicted that face for, corrected in the same round that re-created it.

The five remaining findings are of one family: an absolute never re-scoped (**D3**, where the masthead's twin *was* re-scoped and this one was not); a probe whose stated reach exceeds its expressed reach (**D4**, round four of the same); an existence probe that returns ∅ for the file's most-cited anchor over a capital letter (**D5**); a record-blind warrant under a ruling that made record-qualification an axis (**D6**); and a re-spelled coordinate inside the paired bytes (**D7**). Not one of them moves a gate's RED state, a booked id, a lock, a dissent or a disposition.

**Repair shape (all seat-local except two paired disclosures, no new authorities):** strike `plus conformance/PASS-1/F-W9-CHECK.md` from the closure sentence and name it a **prior run**; disclose the FR-EMT-11 span as the **fourth** paired obligation at E-10 and on G-F9-21's face, cured in one commit with E-1 and E-9(b), and re-run the third test over **all** nine labelled spans with the transcript pasted; add *"outside the shared bytes"* to E-1's absolute; re-state E-10(a)'s scope sentence over what the probe actually expresses, or widen it to the shapes it names (`atomdiff`, `glass-ui`'s `version:LINE`, `SUBSTRATE-LEDGER`); spell the F-W1 anchor `Intra-wave order`; and record-qualify the `L-26` warrant.

**Standing note for pass 5**: the two convictions of this pass were both found by asking *"which law does this file state correctly and then apply to a list instead of a class?"* — the directive index instead of R3-4's law; the one cured label instead of all nine. Four rounds have now been convicted on probes and sweeps whose **scope** was narrower than their **claim**, in four different axes (stems, form, span, and now roster). The next seat should assume the axis is right and the enumeration under it is short.

*Read-only everywhere except this file.*

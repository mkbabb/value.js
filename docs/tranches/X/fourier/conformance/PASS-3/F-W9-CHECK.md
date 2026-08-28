# X·F · F-W9 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20 **PASS 3**)

**Seat**: fresh, re-derived from the bytes. Nothing inherited — not PASS-1's roster, not PASS-2's roster, not the spec's own §2.1 taxonomy, not RULINGS-2's figures. `PASS-1/F-W9-CHECK.md`, `PASS-2/F-W9-CHECK.md`, `PASS-1/RULINGS.md` and `PASS-2/RULINGS-2.md` were read to know what was *ruled*, never to know what is *true*; every figure below was measured by this seat this session.
**Target**: `docs/tranches/X/fourier/waves/F-W9.md` (371 lines, `status: planned`), repaired twice (L-20 round 1, L-20 round 2 in three sittings) plus a re-anchor sweep.
**Corpus authority**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`. **Real carries (R-3)**: `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` — by path, nothing else.
**Tree probes**: read-only against fourier HEAD `cd26c65` (`git log --oneline -1` re-run; 2026-07-03; `git status --porcelain | wc -l` → **28**). No product source written. No fourier byte written. This file is this seat's only write.
**Verdict**: **DEFECTIVE** — 1 MAJOR · 4 MINOR · 3 LOW. **The census is CLEAN (0 escapes)** and every one of the 23 gates re-runs RED against a witness this seat executed. The conviction is a single false receipt, in the erratum cell whose subject is false receipts.

---

## §1 CENSUS DETECTOR — re-derived, both dash spellings, shape-agnostic (R2-3a / R2-9)

```
# every F.W token in the corpus, slash- and dash-forms, in ONE sweep
grep -ohE 'F\.W[0-9]+((/W[0-9]+)|(/F\.W[0-9]+)|([-–]W[0-9]+))*' fr-*.md | sort | uniq -c
  → 1115 F.W4 · 1010 F.W3/W4 · 824 F.W1 · 232 F.W3 · 147 F.W0 · 120 F.W5-W8
  ·   72 F.W5–W8 ·  63 F.W2 ·  54 F.W9/W10 ·  52 F.W5 ·  9 F.W3/F.W4 · … · 2 F.W7

# the F.W9 axis, exhaustively
grep -ohE '.{6}W9.{8}' fr-*.md | sort | uniq -c        → every hit is `F.W9/W10`
grep -onE 'F\.W9(/W10)?' fr-*.md | grep -v 'F.W9/W10'  → 0   (no bare F.W9)
grep -c 'F\.W9–W10' fr-*.md                            → 0   (en-dash arm ∅, probed)
grep -o  'F\.W9/W10' fr-*.md | wc -l                   → 54
grep -l  'F\.W9/W10' fr-*.md | wc -l                   → 25 records
ls fr-*.md | wc -l                                     → 66
```

**Finding of record**: the F.W9 routing token is **slash-formed only**. The en-dash arm is a measured ∅ (it bites on `F.W5–W8`, which is the F.W5–W8 band's problem). No `F.W9/F.W10` long form exists. **The spec's own §2.1 probe is not spelling-blind for its own token, and R2-9's both-dash requirement is satisfiable and satisfied here.**

**The 54-occurrence taxonomy, recomputed from zero** (the spec *consumes* F-W10 §2.1's taxonomy under KF.W4(d); this seat recomputed it and it reproduces **exactly**):

| class | n | receipt (record:line) |
|---|---|---|
| routing-law boilerplate (masthead lane taxonomy; **mints no row**) | **14** | AdminAuditLog:31 · AdminFlaggedPanel:38 · AdminUserList:28 · CanvasOverlayButton:36 · CoefficientsPanel:29 · ContourPreview:30 · EquationView:41 · FrequencyGraph:29 · GalleryAdminBanner:33 · GalleryView:30 · HarmonicLevelGrid:36 · InfoCard:33 · PaperView:35 · VisualizationView:39 |
| verdict / ruling prose (dated adjudication bytes, immutable) | **12** | AdminAuditLog:142 · AdminFlaggedPanel:169 · ContourPreview:137 · EquationModeToggle:93 · EquationResult:127 · GalleryAdminBanner:122 · GallerySearchBar:124 · PaperArticleWindow:157 / :247 / :254 · PaperSidebar:124 · PaperView:214 |
| same-identity restatements | **2** | App:142 (C-13 restated in the route-summary bullet) · PaperArticleWindow:186 (PAW-12's booked rider restated inside the R2-7 → PAW-50 admission) |
| **routing identities** | **26** | §2a below |
| **total** | **54** | ✓ 14 + 12 + 2 + 26 |

**Seven records yield zero re-cut rows** (boilerplate-only, independently derived): AdminUserList · CanvasOverlayButton · CoefficientsPanel · FrequencyGraph · HarmonicLevelGrid · InfoCard · VisualizationView. **18 records carry the 26 identities.** ✓ matches §2.1's `54 / 25 / 66` and its 26/14/2/12 split at the byte.

**Row-shape tolerance (R2-3a.1 / R2-9)**: the 26 are drawn from **all three shapes** — 11 table rows (AFP:95/:110 · ContourPreview:71 · GCM:93 · ImageUpload:61 · PAW:58/:90/:199/:200 · PS:49/:58/:67 · PV:120), 13 id-headed bullets (AAL:87 · App:91 · EMT:41 · EQR:41/:72 · FunctionInput:80 · GAB:49 · GSB:54 · GV:78 · Tooltip:26 · USB:53 · EqView:62) and 2 prose routings walked to their enclosing row id (EqView:191's fold list; App:142's restatement, classed as restatement not row). **No shape-restricted operand appears in any gate below.**

**F.W7 control (R2-8, honoured not re-litigated)**: token-bounded `(?<![A-Za-z])F\.W7(?![0-9])` over the 66 → **0**; every `F.W7` substring in the tree is `KF.W7`. F-W9 makes **zero** `F.W7` mentions and reaches F.W7 only through the `F.W5–W8` band (×2, §2.5 and §4b). **Nothing in this file re-derives F.W7's `routedTotal`; the posture question stays CLOSED.**

---

## §2 ID-KEYED CENSUS — **39 routed · 35 booked · 4 excluded-with-reason · 0 ESCAPES**

### §2a The 26 registry routing identities

| # | record:line | id | cut | spec disposition | ✓ |
|---|---|---|---|---|---|
| 1 | fr-AdminAuditLog:87 | **AA-44** | F.W9 | §2.2 · S1 · G-F9-3 | ✓ |
| 2 | fr-AdminFlaggedPanel:95 | **FR-AFP-42** | F.W9 | §2.2 (seam-before-seat) · S1 · §4a-5 | ✓ |
| 3 | fr-AdminFlaggedPanel:110 | **FR-AFP-49** | F.W9 | §2.2 (fold; dissent preserved) · S1 | ✓ |
| 4 | fr-App:91 | **C-13 (App)** | F.W9 | §2.2 · §2.4 · G-F9-1 | ✓ |
| 5 | fr-ContourPreview:71 | **38** | F.W9 | §2.2 · §2.4 (both flagship cures REFUTED, carried) | ✓ |
| 6 | fr-EquationModeToggle:41 | **FR-EMT-11 (= C-16)** | F.W9 | §2.2 · S2 · G-F9-5/-6 | ✓ |
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
| 17 | fr-PaperArticleWindow:58 | **PAW-12** | F.W9 | §2.2 (rider limb) · §2.4 · G-F9-14 | ✓ |
| 18 | fr-PaperArticleWindow:90 | **PAW-34** | F.W9 | §2.2 · S3 | ✓ |
| 19 | fr-PaperArticleWindow:199 | **PAW-49** | ⟨re-cut⟩ **F.W0** | §2.6 parity · §5 exclusion | ✓ excl |
| 20 | fr-PaperArticleWindow:200 | **PAW-50** | ⟨re-cut⟩ **F.W4** (decision) | §2.4 EXECUTE · §2.6 · §5 exclusion of the decision leg | ✓ excl |
| 21 | fr-PaperSidebar:49 | **D-B2** | F.W9 | §2.2 (axe leg) · S3 · G-F9-4 | ✓ |
| 22 | fr-PaperSidebar:58 | **C-M4** | F.W9 | §2.2 · S4 (DISTINCT mechanism, never folded) | ✓ |
| 23 | fr-PaperSidebar:67 | **M7** | F.W9 | §2.2 (axe + lint limb; tsconfig half ≡ MG-θ at F.W0) | ✓ |
| 24 | fr-PaperView:120 | **D/i-1** | F.W9 | §2.2 · S3 · §4a-10 coupled lock | ✓ |
| 25 | fr-Tooltip:26 | **FR-TT-1** | ⟨re-cut⟩ **F.W10** | §2.6 · §5 · binds via G-F9-22 promotion lock | ✓ excl |
| 26 | fr-UserSlugBar:53 | **FR-USB-16** | F.W9 | §2.2 · S4 + S5 · G-F9-7/-13 · §4a-8 | ✓ |

**23 of 26 cut to F.W9; 3 re-cut away, each flagged ⟨re-cut⟩ and carried for parity at §2.6.** No id double-homed. No id re-booked under a new name. The App C-13 / FunctionInput C-13 homonym is separated in both directions; the FR-CP-32 / fr-ContourPreview-bare-number prefix collision is separated at §2.8a row B10 (verified: `grep -l 'FR-CP-32'` → 3 records, one booking at `fr-CoefficientsPanel:67`, two citations).

### §2b By-mechanism entrants — verified to carry **no** F.W9 digraph

Each coordinate opened by this seat; none appears in the 54.

| record:line | id | bytes at the coordinate | disposition |
|---|---|---|---|
| fr-AdminUserList:54 | **FR-AUL-16** | *"zero automated coverage of any kind: no vitest, no test script, **8** e2e specs with zero admin references"* · *"Un-harnessable by construction"* killed · cure *"extend one axe keystone into the admin tab + a vitest devDependency"* ✓ | **booked** (devDep + admin-tab axe limb); terminal home **AT F.W10**, decline-with-rationale required |
| fr-FullscreenViewer:79 | **FV-26 (= D-23 · C-m7)** | *"the only e2e \"Fullscreen\" hit is a comment (gallery.spec.ts:113, seat grep)"* ✓ (tree: `:113` **is** a comment ✓) | **booked** · S5 · G-F9-11, teleport lock |
| fr-CanvasOverlayButton:74 | **FR-COB-20 (= C-7)** | *"no test anywhere (`web/e2e` 8 specs, zero references)"* · *"dies with the file"* ✓ | **booked conditionally** — F8-REACH-02 HOLD is RED; no harness for a file that may be DELETE |
| fr-AppHeader:108 | **FR-AH-45 · C-16** | *"no e2e touches the header's nav/logo/toggle"* · **NO-WAVE-OWNER** SS-3/SS-4 ✓ | **booked** (execution limb) · G-F9-12; terminal AT F.W10 |
| fr-PaperArticleWindow:89 | **PAW-33 · C-i-2** | *"**→ F.W1 ledger** (pin-truth row)"* ✓ | **excluded-with-reason** (§5 — rides the C-19 ⊕ PAW-33 pin-truth row) |

### §2c Carry-routed dispositions (R-3: only these two carries are citable)

- **`carry/F-W4-CARRY.md` §CrossEdges, the `F.W9/W10` row** — reproduced byte-exact this seat: `| **F.W9/W10** | test + visual seats | axe on /paper (PS D-B2) · admin-mode e2e (AA-44/GAB-10) · the PaperSidebar Collapsible-root guard re-key (PS C-M4) · resolveFigure set-equality (PAW-12) — **⊘ harness before rider, flag before split (PAW-49/PAW-50).** |` — **four-for-four booked**, all four folding onto ids already counted (rows 21, 1 ⊕ 12, 22, 17). **No new identity.**
- **`carry/F-W1-CARRY.md` §CrossEdges item 9** — reproduced byte-exact: *"The visual-regression checkpoint set the uplift mints with no typecheck signal: `--shadow-cartoon` sign flip · `cartoon-surface` hover loss across 21 sites · the `.disclosure-content` body register · the tooltip re-proportion · GCM-22's `p-0` insets · the Badge rim · FR-CP-13's fused-card gap · the `text-admin-label` reversion. Plus the SS-13 residues each record names."* — **8 items booked** in the shared §2.2 region under **R-2b**, gated by **G-F9-23**, sequenced at §4a-16, excluded-as-limbs at §5. The SS-13 tail is carried as a **named class**, not absorbed.

### §2d Escape hunt — run, and empty

Beyond the token sweep, this seat probed for coverage/test/axe-mechanism rows the F.W9 axis might own without saying so:

```
# every NO-WAVE-OWNER row whose mechanism is coverage-shaped and which carries no F.W9 token
python: NO-WAVE-OWNER ∧ (zero coverage|no vitest|unit runner|e2e|axe|untested) ∧ ¬F.W9 ∧ ¬boilerplate
  → 14 lines / 0 escapes
```

All fourteen resolve: **FR-AUL-16** and **FR-AH-45** are already booked as entrants (§2b); **FR-NP-32** is booked F.W0-gated at §4a-2 / G-F9-20; **FR-CP-43/-44/-45** and **GAB-29** are routed as SS-3/SS-4 spec input at §5; **fr-ImageUpload 11** and **fr-SvgFilters M-7** are **R2-6b's** named F.W10 drain rows, not this axis's; the remainder (FR-EQC-15 · GalleryDraftsSection F-6 / m-18 · PAW-38 · two verdict-prose lines) are method/provenance rows with no coverage-execution limb. **Nothing routed to F.W9 in any format, by any spelling, in any row shape, is missing from §2a–§2c.**

### §2e Totals

`routedTotal = 26 + 5 + 8 = **39**` · `booked = 23 + 4 + 8 = **35**` · `excluded-with-reason = **4**` (PAW-49 → F.W0 · PAW-50's DECISION leg → F.W4 · FR-TT-1 → F.W10 · PAW-33 → F.W1 ledger) · **`escaped = 0`**.

**M-25 census axis: PASS.**

---

## §3 QUOTE REALITY — every ⟨cmd⟩ in the file re-run by this seat

**Cross-spec / formation / carry / twin (16 + 9 probes, all reproduce):**

| quotation | home | result |
|---|---|---|
| *"shim **21 cartoon-card sites / 14 files**"* | F-W0 §4 G-12 | ✓ byte-exact |
| *"`text-admin-label` **7 / 4 files**"* | F-W0 §4 G-12 | ✓ |
| *"**8 `e2e/*.spec.ts`** (banked ×3 … any 7-spec figure is superseded and forbidden)"* | F-W0 §4 G-12 | ✓ **the R2-1c cure landed** — the round-1 fabrication *"RETRACTED at the fold seat"* measures **0** at F-W0 and appears nowhere in this spec as an authority |
| *"The e2e denominator is 8.\*\* Stated positively"* | F-W0 §1d item 2 | ✓ |
| *"### G-9 — A unit-runner SEAT exists (the FLOOR's scope belongs to F.W9/W10)"* | F-W0 §4 G-9 | ✓ |
| *"a runner is installed, **wired into `ci.yml`**, … proving the seat live"* | F-W0 §4 G-9 | ✓ |
| *"**Disjointness with F.W9 (one sentence, declared identically at both ends — R-5)**"* | F-W0 §4 G-9 | ✓ — **the reciprocal IS written; E-9(d) is right to strike the "owed" claim** |
| *"**Explicitly NOT green-by-coverage** — F.W0 must not pre-empt the floor's scope."* | F-W0 §4 G-9 | ✓ — and it is indeed **two spans** (bold ends at `coverage`); E-9(c)'s de-fusing is correct |
| `| **F.W9 / F.W10** | F.W0 owns only the **seats**` | F-W0 §6b cross-edge row | ✓ |
| *"The roster is TWELVE limbs and stays twelve"* | F-W1 §4, intra-wave order step 4 | ✓ **R2-5 landed at both ends** |
| *"9. **F.W1 → F.W9/F.W10.** The minted visual-regression checkpoint set"* | F-W1 §4 Cross-edges item 9 | ✓ |
| *"the 8-item visual-regression checkpoint set | **F.W9** home, **F.W10** terminal-verify (R-2b)"* | F-W1 | ✓ |
| *"- **→ F.W9/W10**: axe on `/paper` (PS D-B2)"* | F-W4 §5.2 Cross-edges | ✓ — F.W4's reciprocal exists; **F.W3's genuinely does not** (F-W3's only F.W9 token is a routing cell in §X.1's handover table, booked F.W4 — a routing cell is not a declared edge). The spec's split of this claim is correct. |
| *"ONE corrected anchor table published; every later wave quotes it"* · *"Every later wave cites this table rather than a challenge file"* | F-W0 §4 G-11 / G-12 | ✓ both |
| `` SUBSTRATE-LEDGER.md` | **create** `` | F-W0 §2 Bounds | ✓ (the re-spanned C-4 ⟨cmd⟩ now reads and runs) |
| `grep -c '6b' lane-docs.md` → **0**; *"**(b) API → self-hosted Docker at `babb.dev`.**"* | lane-docs §6 arm (b) | ✓ **E-9(a) is TRUE — the phantom `§6b` is real and correctly struck** |
| `grep -c '4\.5' CENSUS-2026-08-03.md` → **0**; *"a unit-test floor (vitest) decision"* at **§4 item 5** | census | ✓ **E-9(b) is TRUE**; item 5 is the F.W4 wave-sketch row, verified by reading §4's flat 1–11 list |
| *"No unit-test runner — vitest is ABSENT"* · *"### INP / long-task discipline"* | lane-frontend | ✓ both |
| *"builds, fails the 60 s health-gate, rolls back, exits non-zero into a log nobody watches"* (flattened probe) | lane-docs §6 | ✓ — the line-wrap note is accurate |
| twin head · deixis clause · *"AUTHORED BY F.W9 and RECEIVED HERE BY SPLICE** — R2-6a's ruled direction, performed at repair round 2"* | F-W10 §2.2 / §2.8 | ✓ all three |

**Corpus quotations — §2.8a register, both sections, every row re-run against the frozen 66:** all **24** reproduce byte-exact (FR-AFP-49 dissent · FR-EMT-11 rider · the labelled reader-2/L-9.1 composite · *"an icon-only trigger labels ITSELF"* · *"BLOCKER at any F.W9/W10 axe close-gate"* · *"coverage rides the B-1/B-2 cure wave"* · the FR-AUL-16 two-span pair · FV-26 · *"dies with the file"* · FR-AH-45 · PAW-33's pin-truth row · FR-NP-32's disposition · M1's *"35 top-level nodes … `` source` `` spanning :203–222"* · GAB-13's worker-DU dissent · FR-AH-1's `sun.json` sentence · FR-GIG-15's two spans · *"B-1, B-2, C-29, D-07 and D-14 mechanically"* · the FR-CP-43/-45 verbatim-law pair · FR-CP-32's three homes). **`J-diff-shape.md §6` is path-qualified to the fourier tree and resolves there.**

**Structural splice receipts, re-run by this seat (R2-6a):**

```
diff <(awk '/^\*\*THE F.W1 VISUAL-REGRESSION/,/^\*\*Born-RED witness/' F-W9.md) <(… F-W10.md)  → EMPTY  (18 lines each)
diff <(awk '/^\| record \| identity/,/^\*\*By-mechanism entrants/'      F-W9.md) <(… F-W10.md)  → EMPTY  (26 lines)
diff <(awk '/^\*\*By-mechanism entrants/,/^\*\*THE F.W1 VISUAL-REGRESSION/' F-W9.md) <(… F-W10.md) → EMPTY
diff <(grep -h '^\*Heading mirrored' F-W9.md) <(grep -h '^\*Heading mirrored' F-W10.md)          → DIFFER
```

**The paired splice is PERFORMED at both ends, in the ruled direction.** F.W9 authored the checkpoint block; F.W10 deleted its rival paragraph and received the identical bytes, declaring the receipt in its own voice. E-2's discharge and G-F9-23's *"PAIRED — DISCHARGED"* are **true at the bytes**. E-7's scope correction (head sentence never spliced) is also true.

**Meta-receipts (the spec's claims about its own probes) — both re-run and both reproduce:** E-4's struck probe `grep -o 'The roster is \*\*\?[A-Z]*'` returns **∅, exit 1** in this environment (the `\?` diagnosis holds, though the binary is **ugrep 7.8.4**, not BSD grep — a mislabel, not a wrong result); C-7's wide anchor probe returns **∅**. **See §5 D1: the probe's *shape* is still too narrow, and one cite survives it.**

---

## §4 GATES — 23 born-RED, every witness executed read-only at `cd26c65`

| gate | witness re-run by this seat | state |
|---|---|---|
| G-F9-1 | scripts = `dev,build,preview,test:e2e,test:e2e:ui` exactly; `vitest` in **neither** dep block; no `vitest.config.*`; 0 `*.test.ts`/`*.spec.ts` under `web/src` | **RED ✓** |
| G-F9-2 | `ls web/ | grep -iE 'eslint|oxlint|biome'` → **0**; no `lint` script | **RED ✓** |
| G-F9-3 | `grep -rln "admin" web/e2e/ | wc -l` → **0** | **RED ✓** |
| G-F9-4 | AxeBuilder in exactly **2** files (ux, crud); `/paper` **is** navigated — `paper-performance.spec.ts:38` `page.goto("/paper"…)` ✓ | **RED ✓** |
| G-F9-5 | `"@axe-core/playwright": "^4.11.3"` present, never pointed at `/equation` | **RED ✓** |
| G-F9-6 | `grep -rn "/equation" web/e2e/` → **one** hit, `visual-baseline.spec.ts:34`, an assertion-free slug | **RED ✓** |
| G-F9-7 | `:19-22` `.or()` mask ✓ · `:49-53` `.glass-dock` branch ✓ · `:57-63` `if (await filterToggle.isVisible())` ✓ · `grep -rn glass-dock web/src/` → **0** ✓ | **RED ✓** |
| G-F9-8 | `test.fixme` → **five** call sites: ux `:110` `:133` `:192` **`:212`**, crud `:630`. `:212`'s own comment reads *"Un-skip at W3…"* — the spec's carve-by-name is **exact**, and the gate's rendered four keystones now match the command it cites | **RED ✓** |
| G-F9-9 | `modal|dialog|card|Open Visualizer` in `gallery.spec.ts` → **0**; **6** `test(` blocks | **RED ✓** |
| G-F9-10 | guard filters `error`-only + `404` | **RED ✓** |
| G-F9-11 | `gallery.spec.ts:113` is a **comment** ✓; Teleport sites = exactly **2** (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105`) ✓ | **RED ✓** |
| G-F9-12 | `paper-performance.spec.ts:328` `getByRole("button",{name:/switch to dark mode/i})` ✓; `:329` `waitForTimeout(250)` ✓ | **RED ✓** (see D4) |
| G-F9-13 | `playwright.config.ts` `projects:` opens `:46`, closes `:51`, exactly **one** `chromium`/Desktop-Chrome project ✓; 8 specs / **29** `test(` blocks ✓ | **RED ✓** |
| G-F9-14 | `TRANSCODED_FIGURES` at `lib/figureDimensions.ts:52` + `:56` only; `PaperArticleWindow.vue` → **0**; `resolveFigure` at `PaperArticleWindow.vue:44` ✓. **Invariant HOLDS**: `assets/` = **28 png / 26 avif / 26 webp**, unpaired = exactly `fourier.png` + `maintainer-avatar.png` ✓; `FIGURE_DIMENSIONS` keys = **26** = `\includegraphics` count **26** ✓ | **RED ✓** — R-1f's bare-`:52` discipline intact |
| G-F9-15 | `f2fe447` exists; HEAD `cd26c65` is **49** ahead; HEAD date **2026-07-03**; porcelain **28**; `M/PROGRESS.md` M.W2 `:17` · M.W3 `:18` · M.W4 `:19` · M.W11 `:26` all `planned` ✓. **C-1 re-verified**: `deploy-hook.sh` (last touched `e9faab6`, G.W7 ε.2) really does carry `health_gate()`, `${HTTP_PORT:-8100}`, `/api/health`, a last-known-green marker, rebuild-on-rollback and an explicit `ALERT` — the narrowing is **sharper, not smaller**, exactly as C-1 says | **RED ✓**, MEASURE-AT-OPEN correctly declared |
| G-F9-16 | `grep -n 'conclusion\|workflow_run\|gh run\|inv-28' scripts/deploy-hook.sh` → **0**; `deploy-pages.yml:48-57` carries the named `inv-28 gate` with the three-clause `if:` ✓ | **RED ✓** |
| G-F9-17 | M.W11 `planned`; no run id on record | **RED ✓** |
| G-F9-18 | FR-AH-1 order-lock facts byte-exact at the record | **RED ✓** |
| G-F9-19 | `web/Dockerfile` = **43** lines; `COPY assets/` `:24` ✓; six-file `COPY paper/…` `:26-29` ✓; `FROM nginx:alpine AS production` `:31` ✓; printf block `:33-43` ✓; removal comment `:6-10` with `:5` = `COPY web/package.json …` ✓ (**E-5(c) correction verified**); `nginx/fourier.conf` = **72** lines, rate zones `:16-17`, five headers `:25-29` ✓; `docker-compose.prod.yml` declares read_only/tmpfs/cap_drop/no-new-privileges/2G/256M/`--tlsMode requireTLS` + the documented `--tlsAllowConnectionsWithoutCertificates` pivot + the G.W7 BOOKED mongo residuals ✓ | **RED ✓**, C-3's as-declared-vs-as-running re-scope is correct |
| G-F9-20 | HEAD pins `^3.1.0`/`^2.2.0`/`^0.10.0`/lucide `latest` vs WT `^4.0.0`/`^4.3.0`/`^0.13.0`/`^1.0.0` — **verified by `git show HEAD:web/package.json`** ✓; `CanvasOverlayButton.vue` = **595 B** ✓; M1's `:203–222` byte-exact ✓; **FR-NP-32 (≡ fr-PaperSidebar M1)** canonical both-witness form used at **every** statement of the gate (§4a-2, G-F9-20, §4b) — R-8 satisfied | **RED ✓** |
| G-F9-21 | 54 / 25 records / 0 bare `F.W10` / 66 ✓; both shared regions `diff` **empty** | **RED ✓** — outstanding paired obligations correctly faced as **E-1 + E-9(b)** (see D2: there is a third) |
| G-F9-22 | FR-TT-1 promotion lock byte-exact; `admin` → 0, no axe on `/paper`, `/equation` = one slug | **RED ✓** |
| G-F9-23 | `toHaveScreenshot` → **0 in all 8** ✓; no `*-snapshots` tree-wide ✓; `visual-baseline.spec.ts:48` is the π capture, `page.screenshot({` opens **`:55`**, keys `:56-58`, `});` at `:59` ✓ (**E-5(b) verified**); `--shadow-cartoon` → **1 file / 3 hits** at GalleryCard `:193/:212/:224` ✓ (**E-5(a) verified**); `cartoon-surface` → **1 file**, applied once at `style.css:108` **inside** `@utility cartoon-card` ✓ vs `cartoon-card` → **15 files** (**E-6 verified**); `text-admin-label` → **4 files** ✓; `.disclosure-content` → **0** ✓ | **RED ✓** |

**23/23 born-RED. Every cited path exists or carries a `create` marker with its path. Every command re-runs and returns what the cell says. L-19: PASS.**

---

## §5 DEFECTS

### D1 · **MAJOR** — E-9(g)'s receipt is FALSE at the bytes: a live-formation line cite survives in the spec's own voice, and the third sitting's sweep could not see it

§2.8 **E-9(g)** certifies:

> *"the two `lane-frontend` line cites in this spec's own voice (`§1 :48`, `:568`) are converted to row labels — the `:568` form survives **only** inside FR-GIG-15's banked words, where it is the record's and stays the record's (anti-rename)"*

It does not. `F-W9.md:354`, §5's exclusion table, first cell, unquoted, in the wave's own voice:

```
| **The pagination-drain credit (FR-GIG-5) · lane-frontend :568 as hygiene** | Locks live in F.W1's spec … |
```

Three of the four `:568` occurrences are legitimate (`:235` the register row, `:289` G-F9-18's ⟨cmd⟩, `:327` a labelled mention) — **`:354` is the fourth and it is none of those.** By the spec's **own** classification this is the struck class: G-F9-1's cell strikes the sibling form as *"the earlier sittings' `§1 :48` line cite into a live formation file"*, and `formation/fourier/lane-frontend.md` is a live, unpinned, uncommitted-hash value.js doc — precisely what R2-2 item 2 refuses a line number.

**Why three rounds walked past it — and why this is the round's own headline failure repeating one level down.** C-7's certifying probe is

```
grep -noE '(waves/)?F-W[0-9]+\.md:[0-9]+|CARRY\.md:[0-9]+|KF-W[0-9]+\.md:[0-9]+|COHESION\.md:[0-9]+' F-W9.md → ∅
```

re-run by this seat: **∅, correctly.** But the surviving cite is spelled `lane-frontend :568` — **no `.md`, and a space before the colon.** The probe cannot match it in principle. §2.8 **E-8(a)** convicted the first sitting for exactly this — *"the probe was also stem-narrow (it could not see `F-W3.md:` or `KF-W1.md:` forms at all)"* — and the second sitting widened the **stems** while leaving the **form** fixed. This seat's wider probe finds it in one line:

```
grep -onE 'lane-[a-z]+ :[0-9]+|lane-[a-z]+\.md:[0-9]+' F-W9.md
  → 235: lane-frontend.md:568   235: lane-frontend.md:568   289: lane-frontend.md:568
  → 354: lane-frontend :568          ← the survivor, spec's own voice
```

**Class**: false receipt in a repair cell (R2-1-LAW / R2-2.4). The masthead's absolute — *"**not one line number into a live sibling survives in this file**"* — is false as written. Nothing booked moves; the conviction is against the certification.

### D2 · **MINOR** — a "verbatim" label inside the SHARED §2.2 bytes covers words that exist nowhere in the corpus: an undisclosed THIRD paired obligation

§2.2's `fr-PaperView:120` cell (`:107`):

> *"**Coupled: rides the B-1/B-2 cure wave, never scheduled independently** (verbatim lock)"*

The record's bytes (`fr-PaperView.md:120`, frozen corpus) are:

```
| **D/i-1** | Zero automated coverage of the search surface; no vitest runner in web/. | **F.W9/W10** — coverage rides the B-1/B-2 cure wave. |
```

`grep -rc 'never scheduled independently' fr-*.md` → **0 corpus-wide**. `grep -c 'Coupled' fr-PaperView.md` → **0**. Roughly half the labelled span is spec-authored. This is **E-7's exact class** — a "verbatim" label over-reaching its own scope — which the spec elevated to its own erratum when the over-reach was one *sentence*; here it is one *clause*, and it sits inside the paired region. §2.3's S3 cell proves the spec knows the correct form (*"D/i-1's coupled lock, verbatim: \"coverage rides the B-1/B-2 cure wave\" — never scheduled independently"* — quote marks closing before the spec's own words). §2.8a section A registers the verbatim span but discloses no partial scope, and §2.8a's Sweep result asserts *"Every quotation in this spec reproduces at its named home."*

**Consequence for G-F9-21**: its face states *"the outstanding paired obligations are now TWO: E-1 AND E-9(b)."* On this finding there are **three**. Disclosed-and-paired, never fixed unilaterally, is the right cure — §4a-17's own law.

### D3 · **MINOR** — §2's governing denominator is an unsourced count word, inherited from a source the same file declares un-citable

§2 opens: *"**Thirty-six banked rows**, agglomerated by mechanism, **plus the eight-item F.W1 visual-regression checkpoint set** … (**44 dispositions in all**)."* No ⟨cmd⟩, no operand, no decomposition anywhere in the file. The only arithmetic that closes is **26** re-cut identities + **5** by-mechanism entrants + **5** §2.5 rows (M.W2/W3/W4/W11 + containerization) = 36 — and **the last five are not banked registry rows**: four are M-board rows and the fifth's own cell reads *"census-assigned scope; **no registry row**"*. The figure traces to the masthead's intake packet (*"36 rows · 22 gates · 13 cross-edges"*), which the **same masthead** declares *"**not an in-tree authority**"* carrying *"NO gate weight"* per R-3.

This is the one count word the third sitting's sweep never touched, and it governs the whole carry section. Against **E-8 law (i)/(ii)** and **E-9(e)**'s own lesson (*"a count word retired for being unrun must not be replaced by another count word of the same shape"*), an unfalsifiable denominator sourced from a declared non-authority should either state its decomposition inline or be struck the way *"SIXTY"* was at F.W10.

### D4 · **MINOR** — N-2's cure is claimed for F.W9 and homed nowhere, against the file's own cure-ownership law

The banked disposition (`fr-DarkModeToggle.md:88`, verified byte-exact — the record's rider naming `paper-performance.spec.ts:328`, the `/switch to dark mode/i` locator and the 250-vs-350 ms morph is **exactly** as the spec restates it) routes N-2 to **F.W4**:

> `| **F.W4** — `aria-pressed` (+ consider `role="switch"` per the producer) in the same commit as the spec's locator update. |`

F-W9 instead: §4a-12 files N-2 under riders *"carried where their rows land, F.W3/W4"* and then adds *"**N-2's label+locator same-commit rider** (G-F9-12) — this one **is** F.W9's"*; §1b's e2e row says the locator *"co-lands with N-2's label cure, same commit"*; **G-F9-12's falsifier requires the label change to land** (*"and the DarkModeToggle a11y label change lands in the SAME commit as the spec locator update"*). **The string `F.W4` never appears beside N-2 anywhere in the file**, and §5's cure-exclusion row — which enumerates eleven F.W3/W4 cures by name — omits it.

Against the wave's own opening law: *"**F.W9 owns GATES. F.W9 owns no CURE.** Every repair named below is homed at F.W0/W1/W3/W4 or rides a producer relay."* The spec-side half genuinely is F.W9's; the *label* half is F.W4's and the file never says so. One clause fixes it.

### D5 · **MINOR** — the ⟨cmd⟩ notes are not reproducible as written: three incompatible path bases in one file

R2-1-LAW.1 admits a quotation **only** as *"the pasted output of a `grep`/`sed` command run this round"*, and the close act raises it to standing law (*"quote by command AND anchor by command"*). But the inline notes resolve from three different roots:

- `waves/F-W0.md`, `waves/F-W1.md`, `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` → relative to `docs/tranches/X/fourier/`
- `formation/fourier/lane-docs.md`, `formation/fourier/CENSUS-2026-08-03.md`, `formation/fourier/lane-frontend.md` → relative to `docs/tranches/V/megatranche/`
- `registry/adjudicated/fr-GalleryInfiniteGrid.md` (G-F9-18) → also `docs/tranches/V/megatranche/`

**No single working directory runs the file's ⟨cmd⟩ set.** §2.8a declares `$R` and `$M` from repo root — but only for the register's own rows; the inline notes carry no base at all. Every command *does* reproduce once the reader supplies the right cwd (this seat did), so the substance stands; the receipts are weaker than the law they discharge. One `$X = docs/tranches/X/fourier/` line beside the existing `$R`/`$M` closes it.

### D6 · **LOW** — the FR-TT-1 census drops the record's own attribution word

Banked (`fr-Tooltip.md:26`): *"L-4's table is the citable one (Editor ×10 · Canvas ×6 · **FunctionInput** Wand2 ×1 = 17)"*. The spec renders *"(Editor ×10 · Canvas ×6 · Wand2 ×1)"* at §2.2 (shared bytes), §2.6 and G-F9-22. The sum is right, the identity is recoverable from §2.2's FunctionInput cell, and the parenthetical is not quote-marked — so no R2-1-LAW conviction. A fidelity nick under anti-rename, noted so it is not mistaken for the record's spelling.

### D7 · **LOW** — a third `VERIFIED` token enters at §2.8a's section-A heading

*"**A · Quotations inside the SHARED §2.2 bytes — VERIFIED READ-ONLY, NOT EDITED.**"* The four-verb still reads VERIFIED **NO**, the close act still reserves the stamp (*"VERIFIED is F.W10's close to stamp, never this one's"*), and the corpus law the program cites is *"dispositions are ADJUDICATED, not VERIFIED"*. The token is an adjective over quotations, not a status stamp — posture holds — but the file went from two `VERIFIED` tokens to three during a repair round whose subject is stamp discipline.

### D8 · **LOW** — §5 names two transaction limbs no local gate binds

§4a-3 correctly cites the TWELVE-limb transaction whole and names three limbs the checkpoint set binds. §5's limb-exclusion row extends the list to *"the `--shadow-cartoon` / Badge / `cartoon-surface` paint, **the lucide and Button legs that move with them**"*. R-4b permits naming a limb *where a local gate binds one*; the checkpoint set binds five of the seven named, but **no gate in this file binds the lucide or Button legs**. The row still refuses to book them, so the atomicity is not fractured — the naming simply exceeds R-4b's licence by two.

---

## §6 AXES THAT PASS

| axis | verdict | receipt |
|---|---|---|
| **ID-KEYED CENSUS (M-25)** | **PASS** | 39 routed · 35 booked · 4 excluded-with-reason · **0 escapes**. 54-occurrence taxonomy recomputed from zero and reproducing exactly (14/12/2/26); 7 zero-row records confirmed; both dash spellings swept and the en-dash arm measured ∅; all three row shapes represented in the roster (11 table · 13 bullet · 2 prose-walked); the NO-WAVE-OWNER coverage-mechanism escape hunt returns 14 lines and **0 escapes** |
| **QUOTE REALITY** | **PASS with D2** | all 16 cross-spec / formation / carry / twin ⟨cmd⟩s re-run and reproducing; all 24 register rows re-run against the frozen corpus and reproducing; both structural splice `diff`s **empty**; the head-sentence `diff` **DIFFERs** as declared; both meta-receipts (E-4's struck probe, C-7's anchor probe) reproduce. **The R2-1c fabrication is genuinely dead** — *"RETRACTED at the fold seat"* measures 0 at F-W0 and appears nowhere here as an authority. **E-9(a) and E-9(b) are both TRUE**: `lane-docs §6b` and `census §4.5` each measure 0 at their own file, and the substance sits at §6 arm (b) and §4 item 5 respectively. Sole exception: D2's scope over-reach |
| **M-25 DEPTH** | **PASS** | **FR-NP-32 by id** — canonical `FR-NP-32 (≡ fr-PaperSidebar M1)` at every statement of the gate (§4a-2, G-F9-20, §4b), R-8 satisfied · **PAW-44 / LAW-3** restated exactly as banked (*"LAW-3: PAW-44 restoration lands WITH-or-AFTER PAW-1 + PAW-30, never before"*) · **MPC-31** restated as `MPC-3⊕10⊕13⊕8⊕22` — **all five members verified at the record** (MPC-13 *"now subsumed into MPC-31's one-cut"*, MPC-22 *"rides the one-cut"*, MPC-8 *"pulled into the one-cut sequencing"*, MPC-3/MPC-10 the conjunction terms) · **FR-MSP-6** carried as the lock that REPLACED the killed D-2 cure (K-13) · **same-commit riders**: `fr-PaperSearchModal D-1 + D-3 + outline:none` verified as a genuine repair-arms-a-defect chain (PSM-1 = D-1 the scoping BLOCKER; PSM-4 = D-3 *"LATENT — armed by PSM-1's cure"*; PSM-13's `outline:none` *"inert today only because PSM-1 kills it"*) · **anti-cures honoured**: ContourPreview 38's two REFUTED flagship cures carried verbatim, FR-AH-30's REVERSED remedy carried at the FR-AH-45 entrant, GAB-29 carried as a cure-**falsifier** not a destination, `fr-App C-12` carried as a NEGATIVE record · **dissents preserved**: FR-AFP-49's blocker-weight, FR-EMT-11's reader-2 MAJOR under L-9.1, FR-USB-16's overruled r2 MINOR, GAB-13's worker-DU, GCM-4's DU BLOCKER, PAW-12's LC MINOR · **twin law of RULINGS-2 obeyed both ways**: the checkpoint set is booked (no silent drop) **and** paired (no unilateral edit) |
| **GATES (L-19 / R2-9)** | **PASS** | 23/23 born-RED against witnesses this seat executed. No gate states a shape- or spelling-restricted operand: G-F9-21's closure operand is the 26 routing identities over all row shapes; the ImageUpload 15/6 and FR-TT-1 17 denominators are **quoted at their banked homes and routed to G-12 for adoption**, never re-derived; KF.W4(d) is honoured (§2.1 consumes F-W10's taxonomy, G-F9-3 extends the existing keystone rather than authoring a rival oracle) |
| **POSTURE** | **PASS with D4/D7** | `status: planned` · four-verb IMPLEMENTED **NO** / VERIFIED **NO** · **F.W1 cited whole at F-W1 §4 intra-wave order step 4 with the CORRECT limb count TWELVE**, re-verified at the charter's live bytes (R2-5 landed at both ends), never restated (R-4b) · **F.W0 pre-gates honoured** — FR-NP-32/M1, GAB-13, F8-REACH-01/02, MG-θ ≡ M7, ⟨re-cut⟩ PAW-49, the Codex residue set, all carried for gating and none booked, with G-F9-20 as the witness · **F.W7's ruled posture untouched** (zero `F.W7` mentions; band-only contact; nothing re-derived — R2-8's closure respected) · **F.W9/W10 splice direction correct per R-2b/R2-6a and PERFORMED both ends** · **SS-4 owner rulings flagged inline, never presumed** (trie-vs-KISS with the `atomdiff.py:12-14` INCUMBENT dissent · remix-vs-fork · born-visibility · visibility-enum · version-`_id` · redaction parity · pagination idiom) plus OG-F1/OG-F2/OG-V1-V3 · **both trees READ-ONLY** — §1b's explicit WRITE-SEAT DECLARATION, F-W5's *"`fourier-analysis` is READ-ONLY, always"* carried, COMMISSION §2 restated in five places, producer rows ask-only via SS-6 / LATEX-RELAY · execution gate restated as §5's last row |
| **RULINGS-2 APPLIED TO F-W9** | **4 of 4, one imperfectly** | **R2-1c** ✓ fully — struck-bytes quote replaced by G-12's live bytes; *"the CARRY"* appears 5× and **every one is a mention, none a use** (masthead's R2-1c note · E-1 · E-4 · E-8 · §5's prohibition) · **R2-6a** ✓ **PERFORMED both ends**, `diff`-witnessed structurally, no count over the live twin (E-8 law (ii) honoured) · **R2-5** ✓ TWELVE, re-quoted by working command, no sibling edit owed · **R2-2** ✓ for every `.md:N` form into a sibling (probe returns ∅) — **but see D1**: the space-form `lane-frontend :568` survives in the spec's own voice, so the idiom is applied to the forms the probe can see and not to the one it cannot |

---

## §7 VERDICT

**DEFECTIVE — narrowly, and at a higher standard than pass 2 could reach.**

Everything pass 2 convicted is genuinely cured, and this seat re-derived each cure rather than accepting it: the fabricated G-12 quotation is gone and the real bytes are in its place; the fourteen stale `F-W0.md:` coordinates are replaced by gate ids that resolve; `cartoon-card` is restored as G-12's token with the carry's own `cartoon-surface` wording preserved beside it; `--shadow-cartoon` is 1 file, `page.screenshot()` is `:55-59`, the Dockerfile comment is `:6-10`; the roster is TWELVE at both ends; and the checkpoint splice is not merely claimed but **performed** — three regions `diff` empty against a twin this seat opened itself. The census is clean by a full independent recomputation, and 23 of 23 gates are RED against commands that ran.

What convicts is one sentence in **E-9(g)** that certifies a state the file does not hold, and it convicts because of *what kind* of sentence it is. The third sitting's contribution was the insight that *"cite by stable anchor" becomes "cite by unfalsifiable anchor" the moment no seat greps for the heading* — and it then wrote a certification about line cites that its own probe was structurally unable to test, because the probe matches `file.md:N` and the survivor is spelled `lane-frontend :568`. **E-8(a)** convicted the first sitting for a stem-narrow probe; the second sitting widened the stems and left the form; the third sitting inherited the form and certified on it. The masthead's absolute — *"not one line number into a live sibling survives in this file"* — is false at `:354`, in §5, in the wave's own voice.

The remaining four MINORs are of one family and one shape: a "verbatim" label whose scope exceeds its bytes inside the paired region (a **third** paired obligation G-F9-21's face does not yet carry); a governing denominator inherited from a packet the same file declares un-citable; a cure named in a gate falsifier and homed to no wave; and a ⟨cmd⟩ set no single cwd can reproduce. Not one of them moves a gate's RED state, a booked id, a lock, or a disposition.

**Repair shape (all seat-local except one disclosure, no new authorities):** convert `lane-frontend :568` at §5 to the row label it already uses at §4b (*"lane-frontend §6's `INP / long-task discipline` row"*) and re-state E-9(g)'s receipt over a **form-agnostic** probe pasted beside it; disclose the D/i-1 verbatim-scope defect as the **third** paired obligation at E-9 and on G-F9-21's face, cured in the same commit as E-1 and E-9(b); state §2's 36 = 26 + 5 + 5 decomposition inline or strike the count word; add *"— N-2's cure is **F.W4's** (banked); F.W9 owns only the spec-side half of the coupling"* to §4a-12 and a row to §5's cure-exclusion table; and declare `$X = docs/tranches/X/fourier/` beside §2.8a's `$R`/`$M`.

**Standing note for pass 4**: the probe that finds D1 is not a wider stem list. It is a probe over **shapes** — `NAME[ .]:[0-9]+` for every external authority the file names, not just the ones spelled with `.md`. Three rounds have now widened the wrong axis of the same probe.

*Read-only everywhere except this file.*

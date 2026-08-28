# F-W4 — FRESH ADVERSARIAL SPEC CHECK, PASS 3 (L-18/L-20)

**Seat**: fresh, 2026-08-28. **Roster inherited: NONE** — every figure below was re-derived this session from the frozen corpus (66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`), the live `waves/F-W*.md`, the two real carries (`carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md`), and the fourier tree at HEAD `cd26c65` (read-only). PASS-1/PASS-2 checks and `RULINGS.md`/`RULINGS-2.md` were read for the cure-shapes they prescribe; **no number in this file is copied from any of them**. This file is the seat's only write.

**Verdict: DEFECTIVE.**

---

## §A — DETECTOR AND METHOD (stated so the run is reproducible)

Row-shape decree honoured: a row is a table row whose terminal cell routes, **or** an id-headed bullet routed in context (`→` · `⇒` · `ADJUDICATED →`), **or** a prose routing walked to its enclosing row id. Token set `{F.W4, F.W3/W4}`, **both dash spellings** (U+002D and U+2013).

Corpus token basis, this seat:

- ⟨cmd⟩ `grep -oh 'F\.W4' fr-*.md | wc -l` → **1128** / `grep -l` → **56 records**
- ⟨cmd⟩ `grep -oh 'F\.W3/W4' fr-*.md | wc -l` → **1010** / `grep -l` → **55 records**
- ⟨cmd⟩ `grep -oh 'F\.W3–W4' fr-*.md | wc -l` → **0** · `grep -oh 'F\.W3-W4' fr-*.md | wc -l` → **0** (the en-dash arm of this pair is a measured ∅; the only spans in the corpus are `F.W5-W8`/`F.W5–W8`, ⟨cmd⟩ `grep -oh 'F\.W5[-–]W8' fr-*.md | wc -l` → **192**)

Atomiser: **boundary-exact** `(?<![A-Za-z0-9-])ID(?![A-Za-z0-9-])`, fixture-checked to fire (`L-26` inside `FR-AUL-26` does not match; a real `L-26` does). Presence in `F-W4.md` was then re-tested through a **shorthand-aware expander** covering every elision idiom the spec actually uses — dotted chains (`FR-AH-19 · -23 · … · -54`), ranges (`-39..-43`, `FR-USB-17..-20`, `VV-L-15..L-25`), `⊕`-chains (`EV-L·m-1 ⊕ m-2 ⊕ …`), the `| N |` → `CP-N`/`IU-N` row-number idiom, and per-record spec prefixes (`PV-`, `PS-`, `SS-`, `AC-`, `CCD-`, `ECD-`, `VV-`, `GIG-`, `FR-CP-LM…`, `IU-`, `BC-`). Every survivor was then hand-adjudicated at the bytes.

**Census result (head-level, F.W4-token-bearing, all 66 records):**

| figure | value |
|---|---|
| routed rows | **1491** |
| booked in `F-W4.md` (boundary-exact after shorthand/alias expansion, hand-verified) | **1447** |
| absent from `F-W4.md` | **44** |
| — of which **LAW-assigned to F.W4** (sole-`F.W4`, or dual on a file in **no** F-W3 §5 `.a`–`.e` unit list) | **36** ← the escape set |
| — of which LAW-assigned to F.W3 (dual on a `.a`–`.e` file: the eight `fr-FrequencyGraph` `FR-FG-*` rows, `equation/{InfoCard,FrequencyGraph}.vue` ∈ `.e`) | 8 (correctly not booked here) |

**Leg (a) — CARRY→spec — is GENUINELY CLEAN and is confirmed here.** ⟨cmd⟩ this seat: the carry's `§Rows` block holds exactly **421** bullet row-heads (matching the spec's `421 rows` claim at the bytes, though the carry never writes the numeral), and every one of the 421 resolves in `F-W4.md` — the 14 heads that carry no digit-bearing atom (`SS-MISS-HOVER`, `EP-MISSED-A`, `EP-MISSED-F`, `ECP-RESOLVER`, `ECP-GATE`, `ECP-FLOOR / BARREL / ONECALL`, `FR-CL ANCHOR LOCK`, `FR-EQC-residue`, `EV-M-FR`, the EV reader-unattacked carry, `EV/EQR ANCHOR LOCK`, `PP-AGGLOM ⊕ PP-SEVLAW`, `PP-PREFLIGHT ⊕ PP-PAR`, `SC-L-§R`) each resolve by name. **421/421.** The spec's own diagnosis — that leg (a) "is incapable of seeing the wave's actual defect" — is correct, and pass 3 finds the defect exactly where leg (b) points.

---

## §B — THE ESCAPES (36 · LAW-assigned to F.W4 · zero bytes in `F-W4.md`)

### §B.1 — The twin's own hand-off, unreceived (28)

`F-W3.md` §X.1-v3 (line 573, the landed bytes of this same repair round) publishes a partition row reading, verbatim:

> **F.W4 — the LAW's negatives** | `fr-BasisCanvas` (18) · `fr-ContourEditorCanvas` (9) · `fr-EquationResult` (1) | 28 | **citation only**: no §1 bounds row and no §5 file list holds `BasisCanvas.vue`, `ContourEditorCanvas.vue` or `EquationResult.vue` … so the dual spelling takes the LAW's default arm — as `fr-App MG-λ` does. F.W3 cites these records … and books none of their rows

Independently re-derived here from the frozen corpus (never from `F-W3.md`): `fr-BasisCanvas` carries **46** `F.W3/W4` occurrences and **19** routed row-heads with no byte in `F-W4.md`; `fr-ContourEditorCanvas` carries **43** and **9**; `fr-EquationResult` is **24 routed / 24 booked / 0 escaped**. Two seats, two methods, the same 28.

**Born-RED witness, this seat** ⟨cmd⟩ over `waves/F-W4.md`, boundary-exact:

`BC-3=0 BC-7=0 BC-12=0 BC-16=0 BC-18=0 BC-20=0 BC-22=0 BC-23=0 BC-24=0 MM-1=0 MM-2=0 MM-3=0 MM-4=0 MM-5=0 MM-7=0 MM-8=0 MM-9=0 MM-12=0`

Full set — `fr-BasisCanvas` (19): `BC-3 / C-2b` · `BC-7` · `BC-20` · `M-α1` · `M-β1` · `M-β2` · `M-β3` · `BC-12` · `BC-16` · `BC-18` · `D-10-remnant` · `M-α4` · `M-α7` · `M-α8` · `BC-22` · `BC-23` · `BC-24` · `M-β7` · `M-β8`. `fr-ContourEditorCanvas` (9): `MM-1` · `MM-2` · `MM-3` · `MM-4` · `MM-5` · `MM-7` · `MM-8` · `MM-9` · `MM-12`.

Against this, `F-W4.md` §2.X declares: *"**(2) The F.W4 side — the default arm, booked (2).**"* — `fr-App MG-λ` and `fr-VisualizationView L-26`. The count word is falsified by the corpus by an order of magnitude, and §2.X's own closing sentence (*"a wave that cannot say which rows are not its own has no partition, only a preference"*) is the standard it fails.

### §B.2 — Residue beyond the 28 (8 instances / 7 ids)

| banked id | record | routing | status in `F-W4.md` |
|---|---|---|---|
| `SS-C-1` (read leg: `loadVisualization` zero callers) | `fr-SpeedSelect:26`, `:72` | `F.W4 + F.W5-W8 rider`, fold → `GCM-1` | **0 bytes.** The *mechanism* is booked (§2.J's `GCM-1 ⊕ GCM-25 ⊕ VV-BLK-1`, *"`loadVisualization` has ZERO call sites"*); the *identity* is nowhere, and §6.4 does not register it. Exactly the class R-2c restored for `SS-C-7`/`FR-AH-24`/`CP-33`. |
| `FR-EMT-19` | `fr-EquationModeToggle:49` | `→ **F.W3/W4.**` | 0 bytes |
| `FR-EMT-23` | `fr-EquationModeToggle:53` | `→ **F.W3/W4**` | 0 bytes |
| `FR-EQC-14` | `fr-EqCoefficientsPanel:51` | `→ **F.W3/W4** rider` | 0 bytes; `FR-EQC-residue` is an unnamed bucket, not an id booking |
| `D·D-M12` | `fr-EquationView:67` | `**F.W3/W4**` | 0 bytes (`EV-D·D-M13` is booked; `-M12` is not) |
| `m-15` | `fr-CollapsibleSection:72` | `→ **F.W3/W4**` | 0 bytes (distinct from `CP-25`'s timer row) |
| `i-6` | `fr-CollapsibleSection:82` | `→ **F.W3/W4** (rides M-4)` | 0 bytes |

---

## §C — DEFECTS

**D-1 · BLOCKER · the twin's 28-row hand-off is unreceived, and the count word denies it.** §B.1. `F-W4.md` books zero of the 28 and declares the default arm delivers **two**. `G-F4-CARRY-CLOSURE`'s round-total (*"this round's booking total is **17 + 1**"*) enumerates seventeen ids id-for-id — none of them a `BC-*`, `M-α*`, `M-β*` or `MM-*`. The gate that exists to measure the registry→spec direction is green over a wave that dropped 28 rows in that direction.

**D-2 · BLOCKER · the flagship booking violates the criterion it restates.** §2.X(1) quotes the `.e` roster fragment `visualization/{CanvasControlsDock,VisualizationView,SpeedSelect}.vue` (⟨cmd⟩ reproduced this seat against `waves/F-W3.md`) and uses it to home `fr-VisualizationView MAJ-5` and `MAJ-7` at **F.W3**. Two paragraphs later §2.X(2) books `fr-VisualizationView L-26` at **F.W4** by the default arm. `L-26` is dual — ⟨cmd⟩ `grep -n '^- \*\*L-26\*\*' fr-VisualizationView.md` → `:91` *"… → F.W3/W4."* — and its target file is the same `VisualizationView.vue` in the same `.e` roster. **Same record, same file, opposite homings inside one section.** The boundary-exact/hash-pinned work that found the row is sound; the homing contradicts the rule the section publishes.

**D-3 · MAJOR · the gate's stated operand excludes the gate's own closure set.** `G-F4-CARRY-CLOSURE` leg (b): *"leg (b)'s F.W4-side operand is **the dual population minus F-W3's file-criterion share**"*. Its enumerated bookings are ten `GCM-*` ids (⟨cmd⟩ `grep -o "\`.e\` holds \`GalleryCard.vue\`, \`GalleryCardModal" waves/F-W3.md` → hit: `GalleryCardModal.vue` ∈ `.e`) and four `PAW-*` ids (⟨cmd⟩ `grep -o "\`.d\` holds \`PaperArticleWindow.vue\` alone" waves/F-W3.md` → hit). All fourteen are dual rows on `.a`–`.e` files — i.e. **inside F-W3's file-criterion share, outside the operand the gate declares**. The R2-3c override (`per §X.1's own column 3`) is real but is nowhere disclosed in the operand sentence, so the gate as written would report its own bookings as out-of-scope.

**D-4 · MAJOR · a fold onto a home the wave neither books nor bounds.** §2.E: *"the target homes **at F.W4** by the default arm and this fold has a real home to fold onto."* But (i) `fr-BasisCanvas BC-10/C-9` is booked nowhere in `F-W4.md` — every `BC-10` byte (⟨cmd⟩ boundary-exact → **6**) sits inside the §2.E/§6.4(f) fold notes themselves; and (ii) `§1 Bounds` lists neither `BasisCanvas.vue` nor `ContourEditorCanvas.vue` in any row. The fold's target is a row this wave does not hold, on a file this wave does not own.

**D-5 · MAJOR · the fold's load-bearing receipt does not reproduce, and breaks the spec's own prohibition.** §2.E publishes ⟨cmd⟩ `grep -c 'BasisCanvas.vue' waves/F-W3.md` → **0**. Live, this seat: **1** (`F-W3.md:573`). That receipt is the *entire* warrant for "homes at F.W4 by the default arm". Worse, §2.X(1) states the prohibition in terms — *"it is decided by quoting the roster's own spelling of each path, **never by counting mentions in a live sibling**: F-W3 is under its own repair round and a count taken from it drifts between two reads of the same session"* — and §2.E does exactly that. (The *conclusion* survives, because the one hit is prose in §X.1-v3 and not a unit-list entry; the receipt does not.)

**D-6 · MAJOR · §0 PIN LAW count word falsified by round-2's own bookings.** §0: *"**The eight sites** where this spec names 8.0.0 behaviour … are each tagged ⊘ ESC-1/G1"*, with an eight-item enumeration. ⟨cmd⟩ `grep -o 'ESC-1/G1' F-W4.md | wc -l` → **12** occurrences across **11** contexts; net of the §0 declaration itself, **ten** sites carry the tag. The two beyond the enumeration are round-2 bookings: §2.J's `GCM-6` (*"takes §0's PIN LAW tag — ⊘ ESC-1/G1-GATED"* — a site §0 does not list) and §2.J's `FR-USB-18` (*"the `loading` prop half is F.W1's and is ESC-1/G1-gated"*). §6.4 states the governing law — *"the count follows the operand, never the reverse"* — and re-denominated itself to 40; §0 did not.

**D-7 · MINOR · a receipt its own publication falsified.** §2.I: ⟨cmd⟩ `grep -c 'EV-D·D-M4' F-W4.md` → **1**, cited to prove the homonym that hid `D-M4 extended`. Live: **2** — because the note containing the receipt is itself the second line holding the token. §0 names this exact failure mode: *"⊘ The stable receipt is the **set**, never a count this very sentence would change."* The law is stated at §0 and broken at §2.I.

**D-8 · MINOR · a stale disclosure about a live sibling, now false.** `G-F4-ZERO-CONSOLE`: *"⊘ Disclosure … at this writing F-W1's charter sentence still reads eleven (⟨cmd⟩ `grep -o 'The roster is [A-Z]* limbs and stays [a-z]*' waves/F-W1.md` → `The roster is ELEVEN limbs and stays eleven`)"*. Live, this seat: **`The roster is TWELVE limbs and stays twelve`**. R2-5's F.W1-side edit has landed; the disclosure asserting otherwise has not been retired, and now contradicts the two correct `TWELVE-limb` citations standing beside it.

**D-9 · MINOR · seven further un-booked F.W4-held ids.** §B.2 — `SS-C-1` (identity dropped while its mechanism is booked, and unregistered at §6.4, the register that exists for precisely this), `FR-EMT-19`, `FR-EMT-23`, `FR-EQC-14`, `D·D-M12`, `m-15`, `i-6`. All boundary-exact **0** in `F-W4.md`.

**D-10 · MINOR · check files quoted as the central gate's born-RED authority.** §0: *"rulings/check files are cure-shapes and measurements, **never quotable authority**"*; §2.X: *"a figure copied from a check file is a measurement borrowed, and leg (b) prints its own."* Yet `G-F4-CARRY-CLOSURE`'s born-RED cell rests on two check-file readings quoted as its witness (`963 / 910 / 53` from PASS-1 §A/§B; `1,069 / 1,052 / 17` from PASS-2 §B.1). L-19 asks for a witness true today; a historical check reading is neither the spec's own measurement nor a live state.

---

## §D — WHAT HOLDS (verified at the bytes, so the verdict is not read as blanket)

- **Leg (a) 421/421** — independently reproduced (§A). The carry direction is genuinely closed.
- **Every corpus ⟨cmd⟩ receipt reproduces at its stated coordinate**, checked one by one: `fr-App:95` MG-λ · `fr-ConvergenceTimeline:56` `D·D-5 + C·C-5` · `fr-CanvasControlsDock:98`/`:102`/`:150`/`:116` (L-18, C-28, K-9) · `fr-BasisCanvas` `BC-10 / C-9` (1 hit) · `fr-FourierMorphSvg:39` `FM-4..FM-16` · `fr-PaperSidebar:51` `D-M4 extended` · `fr-ContourPreview:76` `D:m-6` · `fr-VisualizationView:91`/`:128` `L-26` · `fr-PaperArticleWindow:220` LAW-3 · both carry quotes (`Cohort: FR-AFP-34, FR-USB-19, D/m-17.` and the `SS-C-7` corroboration bracket) · all four F-W3 quotations in §2.X · the `THE CONTROL` cell.
- **F-W0/F-W1 anchors** — `### G-11`, `### G-12`, F-W1's `**Name**` pin string `F.W1 — glass-ui 4→7(→8, G1-gated)`, `ESC-1 ruled (G1)`, `4. **The atomic transaction (ONE change, G6):**`, and the vaul-vue twelfth-limb sentence all reproduce exactly.
- **Anchor idiom** — ⟨cmd⟩ `grep -ohP 'F-W[0-9]+\.md:[0-9]+' waves/F-W4.md | sort -u` → exactly `F-W0.md:199` · `F-W0.md:204` · `F-W1.md:7`, **three dead addresses, all inside struck-address errata or the §0 declaration, no fourth**. §0's set-receipt is true.
- **R2-5 compliance** — `ELEVEN-limb` **0** · `TWELVE-limb` **2**.
- **Gate witnesses re-measured live at fourier HEAD `cd26c65`**: `G-F4-ADMIN-AXE` (`grep -rln "admin" web/e2e/` → ∅) ✔ · `G-F4-VITEST` (scripts exactly `dev/build/preview/test:e2e/test:e2e:ui`; no vitest; 0 `*.test.ts|*.spec.ts` under `web/src`) ✔ · `G-F4-NO-UNUSED` (13 `compilerOptions` keys, no `noUnusedLocals`; no ESLint config in `web/`) ✔ · `G-F4-A11Y-ROUTE` (**7** `checkA11y` call sites; `new AxeBuilder` ×2) ✔ · `G-F4-OCCLUSION` (`App.vue:24` the `overflow-hidden` shell, `:26` the sole `<main>` scroller) ✔ · `G-F4-VUE-TSC-CLEAN` (`glass-scrubber` live in `BasisSelector.vue:315`, `EditorControlsDock.vue:48/:222`) ✔ · `G-F4-DEAD-DEP` (`components/paper/search/index.ts` zero external consumers) ✔.
- **M-25 depth** — `FR-NP-32 (≡ fr-PaperSidebar M1)` canonical at §5.1(1) with the R-8 note ✔ · PAW-44/LAW-3 stated as two sentences from two homes with ⟨cmd⟩ notes and the trap carried ✔ · MPC-31 ONE-CUT, FR-MSP-6 TWO-CHANNEL, FR-MSP-10 NAME-CURE, EQP-M-N11, ECD-B-2⊕CCD-M-2 inversion lock, PSM-1's three same-commit riders, HLG-41 ordering edict, M-10 RNG rider, DO-NOT-REGENERATE — all present and sequenced at §5.1(3) ✔ · anti-cures registered at §6.1 (**19**, verified) ✔ · dissents preserved (FR-AFP-5 α, GV-L-5, FR-AUL-33/-35, ECD-D-3 DU, CCD-D-17 LC, MPC-12 reader-2, HLG `:disabled` D) ✔.
- **Count words that DO hold**: §6.1 **19** ✔ · §6.2 **7** ✔ · §6.3 **7** ✔ · §6.4 **40 = 12+12+7+4+1+4** ✔ (each sub-register counted) · §3 **D1..D10** ✔ · §0a roster 21 rows, no count word claimed.
- **The GCM-38 minute is correct**: R2-3c's landing table enumerates fourteen rows against a *fifteen* head sentence; the omitted id is indeed `GCM-38`, and the spec states the arithmetic rather than smoothing it.
- **Posture** — `planned` ×4 including the masthead and the closing execution gate; tree declared READ-ONLY twice; **zero** occurrences of `VERIFIED`; SS-4 owner-rulings flagged INLINE at §5.2; F.W0 pre-gates honoured at §5.1(1); F.W1 cited whole as **TWELVE** limbs at both sites. No F.W7 edge is asserted (consistent with the ruled ∅ posture — only F.W0's reciprocal is owed).

---

## §E — DISPOSITION

`routedTotal = 1491` · `bookedCount = 1447` · `escapedCount = 36` · `doubleHomed = 14 declared-out-of-operand (D-3)` · **verdictLocal = DEFECTIVE**.

The wave is materially better than a transcription and its carry direction is closed. It fails pass 3 on the axis it was repaired twice to fix: **the registry→spec direction still leaks, and it leaks at the seam the twin explicitly published** — 28 ids handed over by name in landed bytes, received by nobody, under a count word that says two; a control-row booking that contradicts the partition rule stated in the same section; and a fold whose warrant is a receipt that no longer reproduces onto a row this wave never books.

# F-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md` (422 lines, 91 §2 carry bullets, 20 gates, 6 units)
**Corpus authority**: the 66 `fr-*.md` adjudicated records at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` + the two in-tree carries `carry/F-W1-CARRY.md` and `carry/F-W4-CARRY.md`
**Seat**: fresh adversarial checker, pass 1. Read-only against `/Users/mkbabb/Programming/fourier-analysis` (greps + `wc` + `git show` only; zero writes, zero browser probes).
**Verdict**: **DEFECTIVE** — 71 escapes of 317 routed rows; g19's witness names a ledger that does not exist; 20 phantom bounds paths; F.W0's anchor/pin discipline never quoted.

---

## §0 Method (the X·P terminal method, id-keyed)

1. Every line in all 66 `fr-*.md` records that is a markdown table row whose **terminal (routing) cell** names `F.W3` or `F-W3` — in any markup: `**F.W3**`, `**F.W3/W4**`, `→ F.W3`, `FOLD (F.W3)`, `ADJUDICATED → F.W3`, dotted/prose forms inside the routing cell. **317 rows across 37 records.**
2. The row's banked id is taken **verbatim from cell 1**, split on `/ · , + ⊕ =` into atomic banked ids (bold/italic/parenthetical stripped; `FOLD — ` prefixes stripped).
3. A row is **BOOKED** iff at least one of its atomic banked ids occurs in `F-W3.md` under a **boundary-exact** match `(?<![A-Za-z0-9-])ID(?![A-Za-z0-9-])` — this is what kills the `FR-AFP-5` ⊂ `FR-AFP-59` false positive that a naive `grep -F` produces.
4. Otherwise **ESCAPED**, and the id is then re-tested against `F-W0.md`, `F-W1.md`, `F-W1-CARRY.md`, `F-W4.md`, `F-W4-CARRY.md` to separate *routed-away* (some other X·F seat holds it) from *nowhere in X·F* (a corpus escape with no home at all).

**Counts**: routed **317** · booked **246** · escaped **71** · escaped-and-nowhere-in-X·F **23** · sole-`F.W3`-routed escapes (no F.W4 can claim them) **9**.

Reproduction: `/private/tmp/…/scratchpad/final2.py` + `gen.py` (boundary-exact matcher, 66-file walk).

---

## §1 DEFECTS (ranked)

### D-1 — CRITICAL · g19's RED witness names a PHANTOM ledger; the closure gate is unrunnable

g19 reads: *"The CARRY authority folded by this spec names 90 rows … `grep -F` per banked id → not yet run at close"*, and §Z: *"the CARRY authority's **90 rows** land whole in §2 … **18 CARRY gates → g1..g18 id-for-id** … 11 cross-edges → S-1..S-11."*

There is **no F.W3 carry ledger in the tree**:

```
$ ls docs/tranches/X/fourier/carry/
F-W1-CARRY.md   F-W4-CARRY.md
$ grep -rl "F-W3-CARRY" docs/tranches/X/fourier/
(no output)
```

`F-W3.md` names exactly one carry path anywhere — `carry/F-W1-CARRY.md`, at OP-3, and that is a *precondition* cite, not the folded authority. The "CARRY authority" of §0/§Z/g19 is unnamed and unopenable; §0 sources it to *"two drafts"* (draft A, draft B, `C-01..C-90`) which are session artefacts, not in-tree bytes. **g19's GREEN check — "every CARRY row id greps in this file AND every §2 row traces to a CARRY id" — cannot be executed by any seat**, because the left-hand set has no address. Under **L-19** ("no gate exists without a real named witness") g19 is convicted, and with it §Z's whole zero-silent-drops claim, which rests on g19.

*(Contrast: F-W1.md and F-W4.md each name their carry by path. F-W3 is the outlier.)*

### D-2 — CRITICAL · 71 of 317 F.W3-routed banked rows escape by bytes; 23 have no home anywhere in X·F

Escapes by record: **fr-PaperArticleWindow 24 · fr-AdminFlaggedPanel 17 · fr-GalleryCardModal 16** · fr-CanvasOverlayButton 2 · fr-EasingCurvePreview 2 · fr-MorphShapePreview 2 · fr-AnimationControls, fr-CanvasControlsDock, fr-EasingPicker, fr-ExportModal, fr-FourierMorphSvg, fr-GlassTimeline, fr-ImageUpload, fr-MorphPhaseConfig 1 each.

Of those, **23 occur in NO X·F wave spec and NO X·F carry ledger** (not F-W0, F-W1, F-W1-CARRY, F-W4, F-W4-CARRY):

`GCM-24` · `GCM-44` · `GCM-45` · `GCM-46` · `GCM-49` · `PAW-7` · `PAW-9` · `PAW-11` · `PAW-13` · `PAW-14` · `PAW-15` · `PAW-19` · `PAW-21` · `PAW-23` · `PAW-24` · `PAW-55` · `PAW-57` · `FR-COB-5` · `FR-COB-22` · `FM-4..FM-16` · `LF-1` · `M-δ` · `Producer-arrival severity` (fr-EasingPicker L30)

A whole-family sweep sharpens it: banked ids absent from F-W3 **and** from every other X·F document — `PAW-*`: **25** (`PAW-4,5,6,7,9,11,13,14,15,16,17,18,19,21,23,24,25,26,27,29,34,42,43,55,57`); `GCM-*`: **41** (`GCM-2,3,4,6,7,8,9,11,12,14..21,24,26,27,28,30,31,32,34,35,36,37,38,40,41,42,43,44,45,46,48,49,51,52`); `FR-AFP-*`: **13** (`FR-AFP-4,7,24,29,33,36,40,49,51,52,53,66,69`).

This directly refutes §X's F.W4-deferral row, which asserts the deferrals are *"each named at its row with its trigger"*, and §Z's *"zero silent drops."*

### D-3 — MAJOR · nine escapes are **sole-`F.W3`** routes — no F.W4 exists to claim them

| record | line | banked id | routing cell (verbatim) |
|---|---|---|---|
| fr-GlassTimeline | 65 | `LF-1` | `**GLASS-RELAY** + **F.W3** *(r1)*` — inline `left` % written every frame vs the producer's own "NEVER `style.left`" rule |
| fr-MorphShapePreview | 103 | `FR-MSP-11` | `**ADJUDICATED → F.W3** — one ring vocabulary chosen at the FMD-12 re-basing` |
| fr-MorphShapePreview | 74 | `L-15 ⊕ L-18` | `**INFO** — context records for F.W3` |
| fr-AnimationControls | 75 | `L-1b` | `**F.W3** (dies with L-1); cheapest interim: timelines read \`anim.scrubbing\`` |
| fr-MorphPhaseConfig | 30 | `MISS-2` | `… same F.W3 sweep — folds onto …` (the `${x},${y}` no-quantisation leg beside `toFixed(3)`) |
| fr-GalleryCardModal | 85 | `GCM-34 · D-25/L-10` | `**FOLD (F.W3)**` (the spec writes the shorthand `GCM-29/34`, never the id `GCM-34`) |
| fr-EasingCurvePreview | 25 | `R-4` | the `vector-effect` contract-portability rider **on the F.W3 target** |
| fr-EasingCurvePreview | 30 | `R-9` | the producer frame-furniture ruling that F.W3's re-home consumes |
| fr-EasingPicker | 30 | `Producer-arrival severity` | *"re-homes an entire F.W3 disposition, kills two prescribed cures"* |

`LF-1` is the sharpest: it is routed **GLASS-RELAY + F.W3**, and F-W3's S-5 SS-6 letter roster enumerates the GlassTimeline relay items as *"AX-1's four-item same-edit law · CU-1's cursor deletion · PD-1's docblock-vs-render contradiction"* — `style.left` is on **neither** the §2 carry nor the letter. It is dropped in both directions at once.

### D-4 — MAJOR · §1 Bounds carries **20 paths that do not exist**, and the corpus itself states the live ones

Verified live (read-only `ls`/`find` under `/Users/mkbabb/Programming/fourier-analysis/web/src`):

| §1 bounds path | live path |
|---|---|
| `components/visualization/ConvergenceTimeline.vue` | `components/equation/convergence/ConvergenceTimeline.vue` |
| `components/visualization/EqCoefficientsPanel.vue` | `components/equation/EqCoefficientsPanel.vue` |
| `components/visualization/HarmonicLevelGrid.vue` | `components/morph/HarmonicLevelGrid.vue` |
| `components/visualization/SvgFilters.vue` | `components/decorative/SvgFilters.vue` |
| `components/equation/EquationPanel.vue` | `components/visualization/EquationPanel.vue` |
| `components/paper/PaperSearchInput.vue` · `PaperSearchDropdown.vue` · `PaperSearchModal.vue` | `components/paper/search/…` |
| `components/admin/AdminUserList.vue` · `AdminFlaggedPanel.vue` · `AdminAuditLog.vue` | `components/visualization/gallery/…` |
| `lib/notation.ts` | `lib/equation/notation.ts` |
| `lib/labels.ts` | `components/visualization/lib/canvas-drawing/labels.ts` |
| `lib/basis-display.ts` | `components/visualization/lib/basis-display.ts` |
| `lib/paper/paperSearchIndex.ts` · `lib/paper/searchHelpers.ts` | `components/paper/search/…` |
| `composables/usePaperSearch.ts` | `components/paper/search/usePaperSearch.ts` |
| `composables/useScrollNavigation.ts` | `components/paper/useScrollNavigation.ts` |
| `composables/useWorkspaceLoader.ts` | `components/visualization/composables/useWorkspaceLoader.ts` |
| `types.ts` | ambiguous — three candidates (`lib/types.ts`, `lib/equation/types.ts`, `components/visualization/lib/canvas-drawing/types.ts`) |
| `index.html` **(repo root)**, and §Z's `/Users/mkbabb/Programming/fourier-analysis/index.html` | `web/index.html` — the repo-root file **does not exist** |

The §1 hedge ("directory spellings follow the tree at execution … the bound is the FILE, not the spelling") is scoped to the gallery set only, and cannot rescue the disjointness law: **§5a's whole conflict proof is a directory-glob split** (*"`visualization/` is split by FILE … `.d` holds the retirement set, `.e` holds `CanvasControlsDock/VisualizationView/SpeedSelect/SvgFilters` and the gallery/admin split as listed"*). With `SvgFilters` in `decorative/`, `EquationPanel` in `visualization/`, and the admin trio in `visualization/gallery/`, the `.d`/`.e` split as written does not partition the real tree. **Aggravating**: the corpus states the corrections — `fr-NotationPills.md:23` *"EquationPanel.vue (live at `components/visualization/`)"* and `:9` *"live path `components/visualization/gallery/`"*. The spec's authority already fixed these paths and the spec ignored it.

Corollary: **g3's witness cannot be reproduced from the spec's own bounds.** `wc -l` = 146 is TRUE, but only at `components/equation/convergence/ConvergenceTimeline.vue`, a path §1 never names.

### D-5 — MAJOR · F.W0's anchor/denominator/pin discipline is never quoted (posture axis 5)

```
$ grep -n "G-11\|G-12\|G-13\|re-resolv\|anchor table\|SUBSTRATE-LEDGER\|COMMIT HASH\|P-4" F-W3.md
(no hits)
```

F-W0.md publishes three tables every later wave is required to quote (G-11 anchors, G-12 denominators, G-13 pin), on the record that *"a repair agent following D's anchors lands OUTSIDE the file"* (D-19) and *"Line numbers are re-resolved via G-11 before the lift is applied; the record's anchors are never followed raw"* (F-W0.md:251). F-W3 quotes ~100 raw record anchors (`PaperSearch.vue:41`, `PaperView.vue:344`, `GlassTimeline.vue:16-18`, `Toggle.js:68`, `surfaces.css:46-56`, `style.css:113-127`, `W3-button-ledger.md:93`, `lane-frontend.md:441/443/446`, …) and orders the FR-COB-17 8-site `:aria-pressed` lift **into F.W0's own `rm` commit** (§C.F, g9, §9) with no re-resolution clause — precisely the act F-W0 forbids at raw anchors. It also re-owns the aggregate re-derivation at **g17** without citing G-12/X-9 as the publishing seat, duplicating ownership of a NO-WAVE-OWNER row it simultaneously emits at S-8.

### D-6 — MAJOR · P-4 violated in a gate witness; 20 live `7.0.0` cites at an 8.0.0 pin

F-W0 row 20 (M-10/K-9) rules **the producer pin is 8.0.0, not 7.0.0**, and mints **P-4: "producer-side evidence carries the producer COMMIT HASH, never the version string."** F-W3 carries **20** occurrences of `7.0.0` as live producer evidence and only **3** hashes in the whole file (`1bc09dde`, `35fc8ebf`, `ffba307` — none a producer HEAD). **g6's entire RED baseline is a version-string anchor**: *"Producer `v7.0.0:Slider.vue:69-78`"*. The spec does carry SR-2's blanket re-read rule (*"Every 'at 7.0.0' disposition in this folder re-reads as 'at 8.0.0'"*) inside §C.H — but a blanket re-read is not a re-resolved anchor, and g6 is the gate whose cure-SHAPE re-derives on failure (§6).

### D-7 — MAJOR · `FR-NP-32` — the corrupt-dist sequencing gate — is not carried by id, and §7's cadence is RED by construction

```
$ grep -c "FR-NP-32" F-W3.md      → 0
$ grep -l "FR-NP-32" X/fourier/waves/*.md X/fourier/carry/*.md
F-W0.md  F-W1.md  F-W2.md  F-W4.md  F-W1-CARRY.md  F-W4-CARRY.md
```

`fr-NotationPills FR-NP-32` is the banked **BLOCKER + "F.W1 SEQUENCING GATE"**: the adopted `@mkbabb/glass-ui@4.0.0` `dist/styles/index.css` is a CSS syntax error, reproduced with the app's own toolchain (`CssSyntaxError: Unterminated string: 's own'`), so *"`vite dev` and `vite build` are RED at the `^4.0.0` pin"* and *"F.W1 opens on a red build."* F-W3 carries the **fact** only under a different banked identity (`fr-PaperSidebar M1`, at OP-2/g18) — an anti-rename miss on the identity the whole fleet uses — and then mandates in §7: *"`npx vue-tsc -b --noEmit` and `npx vite build` after each integration batch and before close."* That cadence is RED at the installed pin until FR-NP-32 clears, and the spec never says so.

### D-8 — MODERATE · 48 dual-routed rows silently handed to F.W4 with no §X line

Rows routed `F.W3/W4` that F-W3 neither carries nor excludes, but that F-W4/F-W4-CARRY holds: `FR-AFP-5,6,11,12,14,15,16,17,21,22,23,25,26,30,58,60,63,65,67,35,41,42,43` · `GCM-2,3,4,6,7,8,9,11,12,13,14,15,16,17,26,27,28,30,32,40,41,43` · `PAW-2,3,4,5,12,16,17,25,26,27,28,29,52,54` · `M-α,M-γ` · `FR-COB-5` … §X's disposition row promises each F.W4 deferral is *"named at its row with its trigger"*; these are named nowhere. Defensible as scheduling, indefensible as a **zero-silent-drops** claim.

### D-9 — MODERATE · two OR-escape GREENs

- **g12**: *"Each adoption landed **OR** explicitly ruled-not-adopted with rationale"* — satisfiable with zero adoptions and five paragraphs. The RED witness (three zero-import subpaths) is real and reproduced (below); the GREEN is not a measurement.
- **g17**: *"the aggregate re-derived BY ENUMERATION … before any F.W3 percentage or budget cell"* — no target number, no artefact path, no failure condition.

### D-10 — LOW · §5b worktree plan is unexecutable at the stated precondition

`.a`–`.e` run in `/Users/mkbabb/Programming/fourier-analysis/.worktrees/f3{a..e}`, *"No worktree is created before F.W0 settles the 28 dirty rows."* The 28-row count is TRUE today (`git status --porcelain | wc -l` → 28), but `.worktrees/` inside the repo root will itself become an untracked path against the very cleanliness the plan gates on; no `.gitignore` row is specified.

---

## §2 WHAT SURVIVED THE ATTACK (recorded so the pass is honest both ways)

**Gate witnesses independently reproduced against the live tree (read-only):**

| gate | claim | measured |
|---|---|---|
| g1 | `PaperSearch.vue:41` `<style scoped>`; 48 rule blocks | `<style scoped>` at **:41**; rule-block count **48** ✔ |
| g1 | the modal's classes live only in children | `search-modal*` appears **23×** inside `PaperSearch.vue`'s scoped block; `PaperSearchModal.vue` is at `paper/search/` ✔ |
| g2 | `grep -rn -- "--slider-scrub" web/src` → 23 decl / 7 files | **23** hits / **7** files ✔ |
| g2 | `grep -rl slider-scrub node_modules/@mkbabb/glass-ui` → EMPTY | EMPTY ✔ |
| g3 | `GlassTimeline.vue` = 127, `ConvergenceTimeline.vue` = 146 | **127** / **146** ✔ (path caveat, D-4) |
| g7 | `.easing-preview` = 4 grep hits | **4** ✔ |
| g11 | `max-width` over the tooltip chain → 0 | **0** in `components/ui/tooltip/` ✔ |
| g12 | `glass-ui/forms` → 0, `glass-ui/search` → 0, `./fading-scroll` 0 imports | **0 / 0 / 0** ✔ |
| g13 | PSM-13 `.search-modal-input { outline: none }`, no `:focus-visible` anywhere | `outline: none` at `PaperSearch.vue:285`; `focus-visible` count **0** across the family ✔ |
| g15 | `function timeAgo` → 5; `startsWith("fourier")` → 7 | **5** / **7** ✔ |
| g18 | 28 dirty rows; HEAD pins `^3.1.0`/`^2.2.0`/`^0.10.0`/`latest`; worktree pins `^4.0.0`/`^4.3.0`/`^0.13.0`/`^1.0.0` | `git status --porcelain \| wc -l` → **28**; `git show HEAD:web/package.json` → **exactly those four HEAD pins** ✔ |
| g18/FR-GFC-7 | `embla-carousel-vue` undeclared | `grep embla web/package.json` → **absent** ✔ |
| g20 | `ls …/F-W3-DO-NOT-EXECUTE.md` → No such file; `grep -c "F.W3" INBOX.md` → 0 | **both TRUE** ✔ |
| §7 | "no eslint config and no `noUnusedLocals`" | confirmed — the two named replacements are honest, not proof-farm scripts (L-19 clears) |

**M-25 depth — the named locks, all present with their verbatim clauses:**

- **fr-PaperSearchModal same-commit riders** — PSM-1 head + PSM-13 + MISS-LC1 + PSM-4 + FR-PS-BDT/FR-PS-CLIP all in §C.D, all gated at **g13** with *"ALL FOUR riders land in ONE commit; no rider deferred"*, and restated as a commit shape in §9. ✔
- **MPC-31 ONE-CUT LAW** — verbatim in §C.B, including the witnessability precondition (*"the acceptance witness … taken at a non-boot state (or after MPC-8's re-domain)"*) and the MPC-13 `glass-scrubber`→`standard` ordering. ✔
- **FR-MSP-6 TWO-CHANNEL LOCK** — verbatim in §C.J ANTI-CURE 2, with the do-not-execute entry, the 67/79/67/61% clearing mix, and the F.W3-carries-the-law / F.W4-owns-the-edit split. ✔
- **F.W3's four named anti-cures** — §C.J: (1) naive `@layer` wrap [→ g16], (2) D-2 tint plate, (3) `ariaLabel` forward [→ FR-TT-4], (4) token-swap-that-leaves-the-press. All four, all with kill cites, all cross-cited into F.W4's budget at S-3. ✔
- **PAW-44 / LAW-3** — correctly EXCLUDED at §X as F.W4's, *"the lock travels WITH the row; named here so it is never read as silently dropped."* ✔ (Exemplary — and the contrast that convicts D-2/D-8: this is what a named exclusion looks like, and 71 rows did not get one.)
- **Owner rulings flagged INLINE, never presumed** — OP-4 + S-6 (a) MISSED-D, (b) i-3, (c) P-10; g7 *"Gated on the MISSED-D ruling; may not presume 8.0.0"*; §6 makes *"g7 forced while MISSED-D is unruled"* a triumvirate event. ✔
- **SS-4 posture** — S-4 correctly declines to presume F.W5–W8's rulings: *"SS-4's own obligations, not F.W3's."* ✔

**E-3 / status posture — CLEAN.** `VERIFIED` appears twice, both as **NO** (:28, :412). `Status: planned` at :7, :19, :412. Line 7: *"EXECUTION IS NOT AUTHORIZED BY THIS FILE … `/Users/mkbabb/Programming/fourier-analysis` is READ-ONLY until then."* §Z: *"none written at execution by this session."* No execution verb in current voice; every gate witness is a read-only grep/`ls`/`wc`/`git status`; the fourier tree is opened by no witness in this file. ✔

**F.W1 atomicity — no conviction.** OP-3's *"F.W1 landed — **or** the unit is expressly pin-scoped (§C.H)"* scopes **F.W3's** units, never F.W1's transaction; §C.H's rows are the ones K-7/K-12 refuted the version framing for, and §X returns every F.W1 leg (budget cell, tone re-grammar, MG-β census gate, `showClose`→`dismiss`, `min-width:300px`) to F.W1 whole. S-2 additionally guards the credit: *"F.W1 must NOT be credited for the pagination-drain cure."* ✔

---

## §3 ID-KEYED CENSUS — every F.W3-routed row, record by record

Legend: **BOOKED** = at least one atomic banked id present in `F-W3.md` by boundary-exact bytes · **ESCAPED** = absent, with the other X·F documents that hold it · **ESCAPED (NOWHERE IN X·F)** = held by no X·F wave or carry.

### fr-AdminFlaggedPanel — 34 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 53 | `FR-AFP-5` | **F.W3/W4** — refreshing-not-destroying reload + focus restoration; destination residue → SS-13; family = FR-AUL-24 | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 54 | `FR-AFP-6` | **F.W3/W4** — explicit error + retry branch | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 56 | `FR-AFP-8` | **F.W5-W8** identity surface, with a **one-token F.W3/W4 rider** (pass `item.slug` as the label) | **BOOKED** — id present by bytes: `FR-AFP-8` |
| 59 | `FR-AFP-11` | **F.W3/W4** — delegate to the store or a shared invalidation channel | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 60 | `FR-AFP-12` | **F.W3/W4** — guard the catches; the seam identity is **banked FR-AUL-3 / AA-8 (R6-8 class) — fold by reference** | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 61 | `FR-AFP-14` | **F.W3/W4** — generation token or shared key; interim `hasMore && !loading` gate | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 62 | `FR-AFP-15` | **F.W3/W4** — splice-in-place + natural key | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 63 | `FR-AFP-16` | **F.W3/W4** guards; the one-word primitive (`Button loading`, producer `:27`) lands with **F.W1** | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 64 | `FR-AFP-17` | map success→"success" **now** (F.W3/W4-eligible); adapter rewrite rides **F.W1** | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 66 | `FR-AFP-19` | **F.W1** rest-state tone + **F.W3/W4** focus-visible rider | **BOOKED** — id present by bytes: `FR-AFP-19` |
| 68 | `FR-AFP-21` | **F.W3/W4** — render the evidence being adjudicated | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 69 | `FR-AFP-22` | **F.W3/W4** — typed catch posture at the seam | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 70 | `FR-AFP-23` | **F.W3/W4** — await-then-close + guard; primitive shape per FR-AFP-37 | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 71 | `FR-AFP-59` | **F.W3/W4** — reuse the sibling `data-tier` recipe; narrow the type with FR-AFP-31's cure | **BOOKED** — id present by bytes: `FR-AFP-59` |
| 72 | `FR-AFP-60` | **F.W3/W4** — col-direction gap + order fix + `dismiss`-guarded preset (FR-AFP-37); flushness witness → SS-13 | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 74 | `FR-AFP-67` | **F.W3/W4** — rethrow-or-return from reload (one error channel per action); binds to FR-AFP-6's error state | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 80 | `FR-AFP-25 · L-6 / D-22 / C:D-16` | **F.W3/W4** guard posture; idiom identity = **AA-28, fold by reference** | **BOOKED** — id present by bytes: `L-6` |
| 81 | `FR-AFP-26 · D-11` | **F.W3/W4** re-rung | **BOOKED** — id present by bytes: `D-11` |
| 84 | `FR-AFP-30 · D-14 / L-18` | **F.W3/W4** — move the empty state out of the container | **BOOKED** — id present by bytes: `D-14` |
| 85 | `FR-AFP-31 · D-15 / L-15 / C:D-17` | **F.W3/W4** (same edit narrows FR-AFP-59's tier) | **BOOKED** — id present by bytes: `FR-AFP-31`, `D-15` |
| 86 | `FR-AFP-32 · D-16 / L-13 / C:D-15` | **F.W3** — one shared formatter (**= FR-AUL-17, fold by reference**); serializer unification → **F.W5-W8**; JSC acceptance → SS-13 | **BOOKED** — id present by bytes: `FR-AFP-32`, `L-13` |
| 88 | `FR-AFP-34 · D-19` | **F.W3** — rides **R3-7a**'s title→Tooltip migration, fold by reference; one label source, no `title`, drop "(save tier)" | **BOOKED** — id present by bytes: `FR-AFP-34` |
| 89 | `FR-AFP-35 · D-20 / C:D-19` | **F.W3/W4** copy pass (truth clause owned by FR-AFP-9's wave) | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 92 | `FR-AFP-38 · L-12` | **F.W3/W4** — extract `useCursorPagination` | **BOOKED** — id present by bytes: `FR-AFP-38` |
| 93 | `FR-AFP-39 · L-19` | **F.W3/W4** — **= AA-29, fold by reference** | **BOOKED** — id present by bytes: `FR-AFP-39`, `L-19` |
| 94 | `FR-AFP-41 · L-24` | **F.W3/W4** — clear on close; null-target guard must not silently close | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 95 | `FR-AFP-42 · C:D-18` | **F.W3/W4** seam; test seat → F.W9/W10 | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 96 | `FR-AFP-43 · β-miss-6` | **F.W3/W4** — persistent region, swapped text; AT trace → SS-13 | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 98 | `FR-AFP-45 · superseded-draft carry` | **F.W3/W4** — icon+label re-semantics; composes with FR-AFP-19 | **BOOKED** — id present by bytes: `FR-AFP-45` |
| 100 | `FR-AFP-58 · NEW` | **F.W3/W4** — visible text/skeleton busy state; perception witness → SS-13 | **BOOKED** — id present by bytes: `NEW` |
| 101 | `FR-AFP-61 · NEW` | **F.W3** shadow retirement (available now) / **F.W1** for the tone re-grammar | **BOOKED** — id present by bytes: `FR-AFP-61`, `NEW` |
| 102 | `FR-AFP-62 · NEW` | **F.W3/W4** — `rounded-card` | **BOOKED** — id present by bytes: `FR-AFP-62`, `NEW` |
| 103 | `FR-AFP-63 · NEW` | **F.W3/W4** — wrap control; overflow witness → SS-13 (fixture-gated per FR-AFP-1) | **BOOKED** — id present by bytes: `NEW` |
| 117 | `FR-AFP-65 · NEW` | **F.W3/W4** hygiene with FR-AFP-42's seam | **BOOKED** — id present by bytes: `NEW` |

### fr-AdminUserList — 7 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 44 | `FR-AUL-6` | **F.W3** — shadow retirement: the raw input IS a shadow of a shipped, forward-safe primitive; swap to `Input` | **BOOKED** — id present by bytes: `FR-AUL-6` |
| 55 | `FR-AUL-17` | **F.W3** — one shared util, one dialect, capped and guarded | **BOOKED** — id present by bytes: `FR-AUL-17` |
| 56 | `FR-AUL-18` | **F.W3** — one shared local toolbar component; D-17's surviving z-10/z-20 residue folds here | **BOOKED** — id present by bytes: `FR-AUL-18` |
| 65 | `FR-AUL-27` | **F.W3** — extract `useAdminMultiSelect` + `useAdminAction`; each seam has a second consumer today | **BOOKED** — id present by bytes: `FR-AUL-27` |
| 71 | `FR-AUL-28` | **F.W3** + BH relay (rerouted ask: "`./confirm-dialog` was retired at 7.0.0 with three hand-rolled consumers standing") | **BOOKED** — id present by bytes: `FR-AUL-28` |
| 94 | `FR-AUL-51` | **F.W3** — composable seam fix alongside FR-AUL-52 | **BOOKED** — id present by bytes: `FR-AUL-51` |
| 95 | `FR-AUL-52` | **F.W3** | **BOOKED** — id present by bytes: `FR-AUL-52` |

### fr-AnimationControls — 15 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 29 | `R-7` | Both malformed tooltip anchors (`div`, `svg`) duplicate accessible names already present (`aria-label="More options"` on the trigger; `SpeedSelect`'s own `aria-label="Pla | **BOOKED** — id present by bytes: `R-7` |
| 52 | `L-1` | **F.W3** — dies in the M-1 re-derivation (unconditional session pair incl. `pointercancel`); freeze-gesture + cancel probes → SS-13. Constellation echo: value.js's `Compo | **BOOKED** — id present by bytes: `L-1` |
| 53 | `L-3` | **F.W3** — same re-derivation; MUST carry an explicit keyboard-seek acceptance test. | **BOOKED** — id present by bytes: `L-3` |
| 55 | `C-4` | **F.W3** — identity = census §3a HARD-shadow row (folded; this record adds the emits-level proof + the 7.0.0 route correction). | **BOOKED** — id present by bytes: `C-4` |
| 56 | `D-9 / C-9` | **F.W3** — primitive adoption or Popover re-home; preserve the correct `aria-required-children` reasoning (S-1). Live keystroke → SS-13 (severity re-opens to blocker-clas | **BOOKED** — id present by bytes: `D-9`, `C-9` |
| 64 | `L-6` | **F.W3** — both forks die in the same re-derivation; M-14 names the coupling that forced the fork. | **BOOKED** — id present by bytes: `L-6` |
| 65 | `M-1` | **F.W3** — with K-14's route: at 7.0.0 the pairing is re-derived on `<Slider>`'s own `@pointerdown`/`@pointerup` + `pointercancel`. | **BOOKED** — id present by bytes: `M-1` |
| 67 | `M-3` | **F.W3** — the re-derivation must decide an at-rest, touch-reachable readout; D-23's swap is the ready design answer. | **BOOKED** — id present by bytes: `M-3` |
| 75 | `L-1b` | **F.W3** (dies with L-1); cheapest interim: timelines read `anim.scrubbing` instead of triplicating private flags. | **ESCAPED** — absent from F-W3 by bytes; found in F-W4-CARRY |
| 79 | `C-5` | **F.W3** — 3-line budget; correct knob or `size`. | **BOOKED** — id present by bytes: `C-5` |
| 80 | `C-6` | **F.W3** — desync pixels → SS-13. | **BOOKED** — id present by bytes: `C-6` |
| 83 | `D-10 / C-16` | **F.W3** — folds to intake **R3-7a** (identity stays there; riders: don't port as-is; `icon-tooltip` is the displaced seat; D §7's shim-hardening row). | **BOOKED** — id present by bytes: `D-10`, `C-16` |
| 106 | `M-11` | **F.W3** — dies with the M-1 re-derivation (float model or stable array); magnitude → SS-13. | **BOOKED** — id present by bytes: `M-11` |
| 108 | `M-14` | **F.W3** — the coupling correction collapses L-6's two files. | **BOOKED** — id present by bytes: `M-14` |
| 127 | `M-13` | fold-rider on **fr-BasisCanvas D-9/BC-8** (the fabricated-`N` family; this record adds the dock-side face) → F.W3/W4 with that row. | **BOOKED** — id present by bytes: `M-13` |

### fr-App — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 31 | `R-7` | Production blast radius is bounded (the root never unmounts; `attributeFilter` is set); the live legs are HMR accumulation, the missing test-mount hygiene, 5 forced style | **BOOKED** — id present by bytes: `R-7` |

### fr-AppHeader — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 42 | `FR-AH-1 · L-1/C-1` | **F.W4** (async boundary + payload prune: `defineAsyncComponent` or shallow-import seam + generator-side field/level prune — the census's "characterful, keep" survives at | **BOOKED** — id present by bytes: `FR-AH-1`, `L-1`, `C-1` |

### fr-CanvasControlsDock — 2 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 43 | `D-1 / L-3 / C-1` | **F.W4** — six attributes land today. Rider on **R3-7a's F.W3** Tooltip migration: the X-11 census-contradiction re-scope ("re-point the import AND mint a naming leg") is | **BOOKED** — id present by bytes: `D-1`, `L-3`, `C-1` |
| 98 | `L-18` | **fold by reference → fr-BasisCanvas BC-10/C-9** (banked MAJOR, F.W3/W4 there) — this record adds only the entry-point fact; not re-booked. | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W4-CARRY |

### fr-CanvasOverlayButton — 9 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 52 | `FR-COB-3` | dies with the file (**F.W0** rm). The fourier-wide vocabulary consolidation (`.is-active`/`.is-active-sub`/`.is-playing`/`.liked`/the `:is-active` PROP at PaperView.vue:3 | **BOOKED** — id present by bytes: `FR-COB-3` |
| 53 | `FR-COB-4` | dies with the file; the LAW carries to **F.W3/W4**: the lifted `aria-pressed` idiom (FR-COB-17) binds ONLY on true toggles — never on the FullscreenViewer close action (K | **BOOKED** — id present by bytes: `FR-COB-4` |
| 54 | `FR-COB-5` | **F.W3/W4** — the icon-command naming sweep (36 `size="icon"` sites are the denominator); the wrapper's own instance dies with the file | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 56 | `FR-COB-7` | **NO-WAVE-OWNER (producer)** — glass-ui BH relay, top of the FR-COB-28 list. Consumer awareness note → **F.W3/W4** (any fourier pressed-state work must not assume a borde | **BOOKED** — id present by bytes: `FR-COB-7` |
| 60 | `FR-COB-11` | **F.W3/W4** — the corpus correction rides with FR-COB-17's lift; the DOCK-ACTIVE ask closure → the BH-relay note (FR-COB-28) | **BOOKED** — id present by bytes: `FR-COB-11` |
| 69 | `FR-COB-15` | dies with the file (**F.W0**); the ledger ruling is the standing wrapper policy → **F.W3/W4** | **BOOKED** — id present by bytes: `FR-COB-15` |
| 71 | `FR-COB-17` | **F.W3/W4** (the lift rider, sequenced with F.W0's rm); toggle-vs-action law from FR-COB-4 governs the lift | **BOOKED** — id present by bytes: `FR-COB-17` |
| 72 | `FR-COB-18` | **F.W3/W4** (glyph-register sweep row: size-* children on icon Buttons); qualifies FR-COB-22's 0.40 | **BOOKED** — id present by bytes: `FR-COB-18` |
| 81 | `FR-COB-22` | **F.W3/W4** register note; producer constant question rides the BH relay | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |

### fr-ContourPreview — 3 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 36 | `3` | ADJUDICATED → **F.W3** (`<ConfiguratorLayer>` adoption at this site) | **BOOKED** — id present by bytes: `3` |
| 37 | `4` | ADJUDICATED → **F.W3** (re-scope the BH relay: send `--viz-amber` only, RETIRE the cartoon-card ask) + **F.W1 rider** (do NOT migrate; correct the shim's stale comment pe | **BOOKED** — id present by bytes: `4` |
| 57 | `24` | ADJUDICATED → **F.W3** (rides row 3's ConfiguratorLayer adoption — the producer trigger carries `:focus-visible` box-shadow, my disclosure.css read :45-47) | **BOOKED** — id present by bytes: `24` |

### fr-ContourSettings — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 30 | `R-6` | The `:133` keystone ("ContourSettings Configurator-open is a11y-clean") is one of the four fixmes already censused and banked inside **fr-BasisSelector B-3** (this seat's | **BOOKED** — id present by bytes: `R-6` |

### fr-ConvergenceLegend — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 57 | `D-15` | **F.W3/W4** — an arm of the banked ramp identity (fr-BasisCanvas M-β1 / fr-CoefficientsPanel FR-CP-2): the OKLCH/`sampleColorRamp` re-home carries lightness co-variation  | **BOOKED** — id present by bytes: `D-15` |

### fr-ConvergenceTimeline — 12 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 43 | `L·D-1 + C·C-1` | **F.W3** — identity SHARED with banked fr-AnimationControls L-1/L-6 (the two verbatim forks die in ONE unconditional-session re-derivation incl. `pointercancel`); this re | **BOOKED** — id present by bytes: `L`, `D-1`, `C`, `C-1` |
| 49 | `L·D-2` | **F.W3** — dies in the same re-derivation; the value.js `useSliderTouchGates.ts` precedent (same primitive, cured downstream) recorded as pattern, not re-booked. Touch-ga | **BOOKED** — id present by bytes: `L`, `D-2` |
| 52 | `L·D-5 + C·C-4 + D·D-9` | **F.W3** for the enabling pairing defect (with an explicit keyboard-seek acceptance test, per the banked fr-AnimationControls L-3); the amplifier pair (unguarded `startLo | **BOOKED** — id present by bytes: `L`, `D-5`, `C`, `C-4`, `D`, `D-9` |
| 53 | `L·D-7` | **F.W3** — identity = the census HARD-shadow row + banked fr-AnimationControls C-4/M-1 (folded, not re-booked). **The prescribed 4.0.0 adoption cure is REJECTED by this s | **BOOKED** — id present by bytes: `L`, `D-7` |
| 63 | `C·C-7` | **F.W3** — dissolves if the re-derivation adopts the float 0..1 axis (the producer scrubber's own contract); else F.W4 with an explicit announcement-rate decision. | **BOOKED** — id present by bytes: `C`, `C-7` |
| 65 | `L·D-6 + D·D-10 + C·C-8` | **F.W3** — the sweep, at the **amended 23-declaration / 7-file budget** (seat count; identity = banked fr-AnimationControls C-5, AMENDED not re-booked; see M-2 for the fi | **BOOKED** — id present by bytes: `L`, `D-6`, `D`, `D-10`, `C` |
| 70 | `L·D-12 + C·C-14` | **F.W3** — the adapter dies with the fork; if the Slider composition is kept, widen the setter parameter — F.W4. | **BOOKED** — id present by bytes: `L`, `D-12`, `C` |
| 71 | `L·D-13 + D·D-14` | **F.W3** (latch dies with the pairing re-derivation) + **F.W4** (wrapper + spacing, sequenced after M-1's fragment-root collapse). | **BOOKED** — id present by bytes: `L`, `D-13`, `D`, `D-14` |
| 74 | `C·C-9` | **F.W3** — dies when start/end derive from one source. | **BOOKED** — id present by bytes: `C`, `C-9` |
| 81 | `C·C-13` | **F.W3** — the re-derived contract states units; no `withDefaults` correctly absent. | **BOOKED** — id present by bytes: `C`, `C-13` |
| 90 | `M-2` | MINOR · **F.W3** — AMENDS banked fr-AnimationControls C-5 at the true scope (L-9.1 scope law); ~4× L's prescribed budget. | **BOOKED** — id present by bytes: `M-2` |
| 92 | `M-4` | INFO · **F.W3** — the re-derivation corrects the header; census cell correction rides the F.W3 record. | **BOOKED** — id present by bytes: `M-4` |

### fr-DarkModeToggle — 3 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 96 | `N-10 · D-m9/D-m10` | **F.W3/W4** — resolves inside the shadow-reconcile (SR-2: target `./dark-mode-toggle` at 8.0.0). | **BOOKED** — id present by bytes: `N-10` |
| 97 | `N-11 · D-m11` | **F.W3/W4** — same reconcile. | **BOOKED** — id present by bytes: `N-11` |
| 110 | `I-2 · D-I5/C-16 + SR-2` | **F.W1/F.W3** — re-baseline note; every "7.0.0" cell in this folder re-reads at 8.0.0. | **BOOKED** — id present by bytes: `I-2`, `C-16`, `SR-2` |

### fr-EasingCurvePreview — 28 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 23 | `R-2` | The dead ±0.3 headroom is unconditionally proven (this seat's range run: six ranges exactly [0,1]); the aspect mismatch letterboxes in ANY box (attribute 28×19.6 → 12.25  | **BOOKED** — id present by bytes: `R-2` |
| 25 | `R-4` | Under K-GEOM no value of `size` moves the box, the scale, or the stroke: the prop is INERT, not a weight knob. The `vector-effect` absence survives as a contract-portabil | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W1, F-W1-CARRY |
| 28 | `R-7` | True within this corpus, false within the fleet: the identity is already banked (MAJOR, blocker-class pending the SS-13 keystroke, F.W3) with the same MenuContentImpl mec | **BOOKED** — id present by bytes: `R-7` |
| 30 | `R-9` | Verified (the template emits one `<path>` and nothing else; the producer's frame furniture — unit rect, dashed diagonal, grids, endpoints, HTML axis captions — read by th | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 44 | `GEO-1` | **F.W3** — dies whole in the `<EasingCurve>` adoption (constant square frame, letterbox zero by aspect identity — producer constants.ts:6-12, this seat's read). No interi | **BOOKED** — id present by bytes: `GEO-1` |
| 45 | `GEO-2` | **F.W3** — the re-home deletes the prop (EasingCurve is CSS-sized, `block aspect-square w-full`); **F.W4** rider: sweep the other `[&_svg]`-governed icon sites for the sa | **BOOKED** — id present by bytes: `GEO-2` |
| 46 | `D-2` | **F.W3** — the producer's px-stroke + frame furniture is the cure; perceptual half → SS-13 (U-4). | **BOOKED** — id present by bytes: `D-2` |
| 47 | `TOKEN` | **F.W3** (currentColor + token in the re-home) + **GLASS-RELAY**: re-scope the filed `--viz-easing` ask to the `--motion-accent` seam; correct the false carry-note in the | **BOOKED** — id present by bytes: `TOKEN` |
| 48 | `CARRY-1.4.3` | **F.W3/F.W4** — one edit with TOKEN; attributed to EasingPicker (the literal's second home), cross-ref banked fr-AnimationControls M-6 (same element, distinct defect: siz | **BOOKED** — id present by bytes: `CARRY-1.4.3` |
| 49 | `INVERT` | **F.W3/F.W4** — same edit as TOKEN/CARRY; the D-2 SS-13 render doubles as its witness. | **BOOKED** — id present by bytes: `INVERT` |
| 50 | `FORK` | **F.W3** — identity = census §3a HARD-shadow row + intake **R3-12** (folded, never re-booked); this record adds the geometric-incompatibility and third-barrel proof. | **BOOKED** — id present by bytes: `FORK` |
| 51 | `CCOLOR  · C-D-1)` | **F.W3** — dies in the re-home (EasingCurve strokes `currentColor` off one channel). | **BOOKED** — id present by bytes: `CCOLOR` |
| 60 | `BARREL` | **F.W3/F.W4** — colocation repair has three seams; the alias `EasingName` (dominant 3-vs-2) reconciles in the re-home. | **BOOKED** — id present by bytes: `BARREL` |
| 62 | `FACET` | **F.W3** rider — re-derive `n` (or adaptive sampling near the tangent) at the adopted geometry; fourier keeps generating `d`, so the sampler survives the re-home. | **BOOKED** — id present by bytes: `FACET` |
| 63 | `PROSE` | **F.W3** — the file dies in the re-home; any surviving remnant takes a header stating coordinate space + pad derivation. | **BOOKED** — id present by bytes: `PROSE` |
| 64 | `A11Y` | **F.W3** — the adoption resolves it; accname effect (U-1) → SS-13. | **BOOKED** — id present by bytes: `A11Y` |
| 65 | `DEADCOPY` | **F.W3** — wire as the `label` copy in the adoption, or delete with rationale. | **BOOKED** — id present by bytes: `DEADCOPY` |
| 66 | `WRONGPAD` | **F.W3** — both previews onto `<EasingCurve>`; its `clipped` excursion contract (seat-read) owns the overshoot honestly. | **BOOKED** — id present by bytes: `WRONGPAD` |
| 67 | `NOFRAME` | **F.W3** — free in the adoption; MINOR to avoid double-charging D-2's harm. | **BOOKED** — id present by bytes: `NOFRAME` |
| 74 | `VEFF` | **F.W3** — the adoption ships it. | **BOOKED** — id present by bytes: `VEFF` |
| 75 | `DEGEN` | **F.W3** — props die in the re-home. | **BOOKED** — id present by bytes: `DEGEN` |
| 76 | `FLOOR` | **F.W3/F.W4** — layout decision in the re-laid-out host; U-3 (menu overflow) → SS-13. | **BOOKED** — id present by bytes: `FLOOR` |
| 77 | `SAMPLE` | **F.W3** sweep rider with FACET (one `n` decision). | **BOOKED** — id present by bytes: `SAMPLE` |
| 78 | `NAMES` | **F.W3** sweep. | **BOOKED** — id present by bytes: `NAMES` |
| 79 | `PARDEF` | **F.W3** sweep. | **BOOKED** — id present by bytes: `PARDEF` |
| 80 | `ONECALL` | **F.W3/F.W4** sweep. | **BOOKED** — id present by bytes: `ONECALL` |
| 82 | `PICKER-RES` | **F.W3** — census row split note; preview half = mechanical de-dup, picker half = decision. | **BOOKED** — id present by bytes: `PICKER-RES` |
| 98 | `K-11` | **Seat-minted booking kill** (R-7). The mechanism is real, re-corroborated, and **already banked** at fr-AnimationControls D-9/C-9 (MAJOR, blocker-class pending SS-13, F. | **BOOKED** — id present by bytes: `K-11` |

### fr-EasingPicker — 14 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 30 | `Producer-arrival severity` | The arrival re-homes an entire F.W3 disposition, kills two prescribed cures, converts EasingCurvePreview.vue from a re-style into a deletion, and dates the census a full  | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 50 | `D/D-1 + C/M-6` | **F.W3** — identity = **banked fr-AnimationControls D-9/C-9, AMENDED to BLOCKER by this record** (the escalation condition is discharged statically; the banked "live keys | **BOOKED** — id present by bytes: `D`, `D-1`, `C`, `M-6` |
| 51 | `D/D-2` | **F.W3** — the cure is NOT the `--viz-amber` one-arm precedent (style.css:113-127, my read): both arms need re-minting, and the producer now ships the landing chain with  | **BOOKED** — id present by bytes: `D`, `D-2` |
| 59 | `D/D-3 + L/M-2` | **F.W3** — the durable cure is `EasingCurve` adoption (constant square frame by producer doctrine — constants.ts:6-12/:47, my read), sequenced behind F.W1; DU's hand-pick | **BOOKED** — id present by bytes: `D`, `D-3`, `L`, `M-2` |
| 60 | `D/D-4 + C/M-3` | **F.W3** — styling adoption rides the D-1 cure; the "needs axe run" residual is killed (register); D-9's dead-pressed-vocabulary observation folds here at INFO. | **BOOKED** — id present by bytes: `D`, `D-4`, `C`, `M-3` |
| 61 | `D/D-5 + C/M-1 + L/m-5` | **F.W3** (dies with the chassis re-home) / **F.W4** if landed under the pin. Painted geometry → SS-13. Mobile numbers amended by the root-font row below. | **BOOKED** — id present by bytes: `D`, `D-5`, `C`, `M-1`, `L`, `m-5` |
| 62 | `D/D-6 + L/M-1 + C/M-2` | **F.W3/F.W4** — contingent-MAJOR; the build grep (`npm run build` in web/ then grep `svg:not(\[class\*=size-\])`) is the settle command, no browser needed. Decides whethe | **BOOKED** — id present by bytes: `D`, `D-6`, `L`, `M-1`, `C`, `M-2` |
| 64 | `D/D-10` | **F.W3** (dies with chassis: both ToggleChip-cell styling and RadioItem hover are translucent mixes) / **F.W4** one-line `color-mix` otherwise. | **BOOKED** — id present by bytes: `D`, `D-10` |
| 67 | `MISSED-A` | **F.W4** (carry the full six-leg set or delete the declaration) — dies early if the F.W3 chassis re-home lands first. Same defect CLASS as banked fr-ConvergenceTimeline D | **BOOKED** — id present by bytes: `MISSED-A` |
| 68 | `MISSED-B` | **F.W3** — one cure event with D-2 (the producer accent chain clears both criteria by construction); exact ratio over the real blurred backdrop → SS-13 (AA verdict safe:  | **BOOKED** — id present by bytes: `MISSED-B` |
| 70 | `MISSED-D` | **F.W0** (substrate re-derivation: the census's 4→7 delta table is one major stale) + re-homes **F.W3**. DU's INFO grading preserved; adjudicated MAJOR as formation input | **BOOKED** — id present by bytes: `MISSED-D` |
| 76 | `D/D-11 + D/D-12 + D/D-13` | **F.W3** (DropdownMenuLabel/Group adoption erases all three) / **F.W4** otherwise. | **BOOKED** — id present by bytes: `D`, `D-11`, `D`, `D-12`, `D`, `D-13` |
| 79 | `D/D-17 + D/D-18` | **F.W3/F.W4** — same edit as D-1's cure. | **BOOKED** — id present by bytes: `D`, `D-17`, `D` |
| 86 | `L/M-4  + C/m-8` | **F.W3** — both re-home onto producer `EasingCurve` (MISSED-D); the "not-drop-in" half of the old disposition is killed (register). | **BOOKED** — id present by bytes: `L`, `M-4`, `C`, `m-8` |

### fr-EditorControlsDock — 6 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 23 | `R-2` | Seat mount-predicate reads: `ContourEditorCanvas` mounts under `v-if="store.contour"` (VV:203); `EditorControlsDock` under `v-if="isEditing && store.contour"` (VV:238) —  | **BOOKED** — id present by bytes: `R-2` |
| 41 | `C-3` | **F.W4** — both channels on all twelve, today. The shim-migration leg keeps its **R3-7a/X-11** identity (this file = 10 of the 35 Tooltip callsites, the largest single co | **BOOKED** — id present by bytes: `C-3` |
| 44 | `L-1` | **→ F.W3/W4** with the banked row (wrap `onPointerUp` as pointerdown is wrapped). | **BOOKED** — id present by bytes: `L-1` |
| 63 | `L-6` | **→ F.W3/W4** with the banked identity; magnitude rides its existing SS-13 slot. | **BOOKED** — id present by bytes: `L-6` |
| 65 | `L-5` | **→ F.W3/W4** with the banked row. | **BOOKED** — id present by bytes: `L-5` |
| 118 | `K-11` | **Identity-guard kill: this is fr-ContourEditorCanvas L-5, banked MAJOR (→ F.W3/W4) on 2026-08-08** — same composable, same 36-line read, same no-cap/slice+push facts, in | **BOOKED** — id present by bytes: `K-11` |

### fr-EquationModeToggle — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 21 | `C-3 severity` | fr-App.md:77 (MG-δ, MINOR, → F.W3/W4) + fr-EasingPicker.md:67 (MISSED-A: "same defect CLASS as banked fr-ConvergenceTimeline D·D-4 — pattern identity noted, separate site | **BOOKED** — id present by bytes: `C-3` |

### fr-EquationView — 4 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 67 | `D·D-M12` | **F.W3/W4** — either retire the hand-roll onto SegmentedTabs or add the one attribute the sanctioned mechanism needs; NotationPills rides the same edit. | **BOOKED** — id present by bytes: `D`, `D-M12` |
| 82 | `D·D-M5` | **F.W3** — execute the standing demand; the drift facts are its new evidence. | **BOOKED** — id present by bytes: `D`, `D-M5` |
| 83 | `D·D-M14` | **F.W3** — `<FadingScroll axis="y">`, available at the current pin. | **BOOKED** — id present by bytes: `D`, `D-M14` |
| 102 | `L·m-8` | **F.W3** — dies with the hover-card migration (K-4's popover destination). | **BOOKED** — id present by bytes: `L`, `m-8` |

### fr-ExportModal — 9 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 27 | `R2-3` | The banked M-2 row says "closes the whole L-6 cluster with library wiring" and cites only the `.d.ts` prop list. This seat read the *implementation*: `.labeled-field` is  | **BOOKED** — id present by bytes: `R2-3` |
| 35 | `LC-1` | **→ F.W3/W4** (e2e repair rider on the C-D-23/C-D-29 keystone cluster): scope `checkA11y` with `.include()` per surface, and assert `results.incomplete` for the modal-sup | **BOOKED** — id present by bytes: `LC-1` |
| 36 | `LC-2` | **→ F.W3/W4**: re-run the fixme'd workspace-default keystone at the installed pin; banked K-13 predicts green → delete the fixme AND its rationale rather than porting eit | **BOOKED** — id present by bytes: `LC-2` |
| 37 | `LC-3` | **→ F.W3/W4 rider ON M-2** (which stays MINOR): accept the anatomy change explicitly or take locally-authored `id`/`for` pairs keeping `.option-row`. Side-by-side anatomy | **BOOKED** — id present by bytes: `LC-3` |
| 38 | `M-α` | **→ F.W3/W4, re-spelled `dismiss="deliberate"` and sequenced WITH/AFTER F.W1** — this row supersedes r1's D-m7 cure cell (D-m7's defect row itself is unchanged). | **BOOKED** — id present by bytes: `M-α` |
| 40 | `M-γ` | **→ F.W3/W4** (inside the banked D-m8 deletion row, now sequenced before/with F.W1's uplift); raises UNPROVEN-6's stakes (SS-13 #6). | **BOOKED** — id present by bytes: `M-γ` |
| 41 | `M-δ` | **→ F.W3/W4** (one line: `@open-auto-focus.prevent` + explicit target, or the producer's dismissal/primary convention). Landing-element probe in BOTH workspace states → S | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 42 | `M-ε` | **→ F.W3/W4** (with the D-m2 pitch cure — the same rows). Ratio-at-three-widths probe → SS-13 #16. | **BOOKED** — id present by bytes: `M-ε` |
| 65 | `K-20` | **KILLED as citation (reader-LC; seat-verified)** — the installed rule also carries `none: ['no-implicit-explicit-label']`, a precisely label-aware check family the axis  | **BOOKED** — id present by bytes: `K-20` |

### fr-FourierMorphDemo — 2 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 54 | `FMD-12 · D-13` | **MAJOR · F.W3** (shadow retirement). Chip-arm cure caution **FOLDS → banked FM-14**: `./metric-badge` is GONE at 8.0.0 — target `./chip`. | **BOOKED** — id present by bytes: `FMD-12`, `D-13` |
| 79 | `FMD-32 · C-12 ⊕ i-5 ⊕ L-24` | **FOLD → fr-EasingCurvePreview BARREL + FORK · F.W3.** Census carry-6 correction rides: the morph subtree's share was uncounted. The m-5 residue (`.easing-preview` lacks  | **BOOKED** — id present by bytes: `FMD-32`, `i-5` |

### fr-FourierMorphSvg — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 39 | `FM-4..FM-16` | As ruled in r1 (chip contrast demoted-with-rationale · always-inline color style · no proportion contract (px cell re-stated per FM-21) · fallback-less `var()` · 4-site p | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |

### fr-FourierShapeExtractor — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 67 | `M-3` | **F.W3/W4** — with D-8's axe pass. | **BOOKED** — id present by bytes: `M-3` |

### fr-GalleryCardModal — 41 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 43 | `GCM-2 · C-1` | **→ F.W5-W8** (ship the 46th operation or delete the affordance — the decision is the CRUD union's) + **F.W3/W4** frontend arm | **BOOKED** — id present by bytes: `C-1` |
| 44 | `GCM-3 · C-2/L-2` | **→ F.W3/W4** (take the identity, derive the row: `selectedSlug` + computed lookup — three lines; lands before every other data fix per C's own dependency order) | **BOOKED** — id present by bytes: `C-2`, `L-2` |
| 50 | `GCM-4 · D-01/L-7/C-6` | **→ F.W3/W4** — `<DialogTitle>` (sr-only acceptable) naming the entity, not the FK; one edit with GCM-17 and MF-3 | **BOOKED** — id present by bytes: `C-6` |
| 52 | `GCM-6 · D-03` | **→ F.W3/W4**, contingency-noted on the F.W1 target (free only if the target becomes 8.0.0) | **ESCAPED** — absent from F-W3 by bytes; found in F-W1-CARRY, F-W4, F-W4-CARRY |
| 53 | `GCM-7 · D-04/C-11` | **→ F.W3/W4** (plate the ✕ or re-scope the scroll/bleed; composes with GCM-6/GCM-8) | **BOOKED** — id present by bytes: `C-11` |
| 54 | `GCM-8 · D-05/C-11` | **→ F.W3/W4** (pin the dismissal outside the scroller) | **BOOKED** — id present by bytes: `C-11` |
| 55 | `GCM-9 · D-06/L-8` | **→ F.W3/W4** (local `ref(true)` flipped before emit — correct standalone AND restores the exit animation) | **BOOKED** — id present by bytes: `L-8` |
| 56 | `GCM-10 · D-07/L-5/C-3` | **→ F.W3/W4** (guard) + **F.W5-W8** (a `tier` field with a default on the model — the serialization-bypass family, with MF-9) | **BOOKED** — id present by bytes: `GCM-10`, `L-5`, `C-3` |
| 57 | `GCM-11 · D-08/L-11` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `L-11` |
| 58 | `GCM-12 · D-09` | **→ F.W3/W4** (empty state or `v-if`) | **ESCAPED** — absent from F-W3 by bytes; found in F-W4-CARRY |
| 59 | `GCM-13 · D-10` | **→ F.W3/W4**, sequenced WITH F.W1 (the `loading` prop is the cure's seat) | **BOOKED** — id present by bytes: `D-10` |
| 60 | `GCM-14 · D-11` | **→ F.W3/W4** (retire `w-full`, adopt the producer geometry), sequenced with F.W1 | **BOOKED** — id present by bytes: `D-11` |
| 61 | `GCM-15 · D-12` | **→ F.W3/W4** (inside the m-22 repair family) | **BOOKED** — id present by bytes: `D-12` |
| 62 | `GCM-16 · D-13` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `D-13` |
| 63 | `GCM-17 · D-14/L-16/D-22` | **→ F.W3/W4** (one edit with GCM-4: title the dialog with the entity, `alt` from prose or empty) | **BOOKED** — id present by bytes: `D-14` |
| 69 | `GCM-23` | **→ F.W3/W4** (drop the `border-radius: inherit` declaration rule-wide; pairs with the D-24-as-rescoped cure) | **BOOKED** — id present by bytes: `GCM-23` |
| 70 | `GCM-24` | **→ F.W3/W4** (with GCM-3; cross-cite FR-AFP-11's "delegate to the store or a shared invalidation channel") | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 77 | `GCM-26 · D-11` | **→ F.W3/W4** (adopt the producer `scroll` posture at F.W1) | **BOOKED** — id present by bytes: `D-11` |
| 78 | `GCM-27 · D-17` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `D-17` |
| 79 | `GCM-28 · D-18` | **→ F.W3/W4** (dies inside GCM-30's dedup) | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 80 | `GCM-29 · D-19/L-6/C-12` | **FOLD (F.W3/W4 · F.W3)** | **BOOKED** — id present by bytes: `GCM-29`, `L-6` |
| 81 | `GCM-30 · D-20` | **→ F.W3/W4** (dies with GCM-52's wrapper deletion) | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 82 | `GCM-31 · D-21/C-8` | **→ GLASS-RELAY** (producer: teach `cn` its own aliases) + site cure F.W3/W4; NEEDS-BUILD probe | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 83 | `GCM-32 · D-23` | **→ F.W3/W4** (re-derive with GCM-18) | **BOOKED** — id present by bytes: `D-23` |
| 84 | `GCM-33 · D-24-as-rescoped` | **→ F.W3/W4** (with GCM-23 — same rule) | **BOOKED** — id present by bytes: `GCM-33` |
| 85 | `GCM-34 · D-25/L-10` | **FOLD (F.W3)** | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W4, F-W4-CARRY |
| 86 | `GCM-35 · D-26` | **→ F.W3/W4** | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 87 | `GCM-36 · D-27` | **→ F.W3/W4** | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 88 | `GCM-37 · D-28/C-17` | **→ F.W3/W4** hygiene | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W4, F-W4-CARRY |
| 89 | `GCM-38 · D-29` | **→ F.W3/W4** | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY |
| 90 | `GCM-39 · D-30/L-9/C-9` | **→ F.W3/W4** (rename at source) | **BOOKED** — id present by bytes: `GCM-39`, `C-9` |
| 91 | `GCM-40 · L-12/C-13` | **→ F.W3/W4** (dies inside GCM-29's dedup) | **BOOKED** — id present by bytes: `C-13` |
| 92 | `GCM-41 · L-13` | **→ F.W3/W4** (key on the source token) | **BOOKED** — id present by bytes: `L-13` |
| 94 | `GCM-43 · C-10` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `C-10` |
| 95 | `GCM-44` | **→ F.W3/W4** (`@open-auto-focus.prevent` onto the GCM-4 title — one edit, two rows) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 96 | `GCM-45` | **→ F.W3/W4** | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 97 | `GCM-46` | **→ F.W3/W4** | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 98 | `GCM-47` | **→ F.W3/W4** (import the type; with GCM-39's rename) | **BOOKED** — id present by bytes: `GCM-47` |
| 104 | `GCM-48 · D-31/D-32/L-15` | **→ F.W3/W4** (delete; kills GCM-30) | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 105 | `GCM-49 · D-33` | **→ F.W3/W4** | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 118 | `K-2` | **SUSTAINED (DU's re-ink + LC's K-5 provenance ground), settled by this seat's own instrument**: the pill ink is the FROZEN `basisDisplay` copy, never the live token (the | **BOOKED** — id present by bytes: `K-2` |

### fr-GalleryDraftsSection — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 27 | `R-3` | **reader-2 wins on the identity guard.** My read of fr-BasisSelector M-10 (:59): it already banks the 7-site `startsWith("fourier")` census (my grep re-run: exactly 7 fil | **BOOKED** — id present by bytes: `R-3` |

### fr-GalleryMarquee — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 24 | `R-5` | fr-GalleryCard L·M-4 rules the whole timeAgo family "FOLDS BY REFERENCE, nothing new to book" → FR-AUL-17 (F.W3) + FR-AFP-32, both naming GalleryCard:53-61. Identity guar | **BOOKED** — id present by bytes: `R-5` |

### fr-GlassTimeline — 27 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 41 | `D-1` | **GLASS-RELAY** + **F.W3 rider** *(r1)*. Severed-pixel count at BOTH roots → SS-13 #2. | **BOOKED** — id present by bytes: `D-1` |
| 43 | `L-B1 / C-1` | **F.W3** — FOLD: banked fr-AnimationControls L-1/L-6 + fr-ConvergenceTimeline L·D-1/L·D-2/K-4 *(r1)*. Freeze/cancel probes → SS-13 #6. | **BOOKED** — id present by bytes: `L-B1`, `C-1` |
| 44 | `L-M2 / C-2 / D-7` | **F.W3** — FOLD: banked fr-AnimationControls L-3 + fr-ConvergenceTimeline L·D-5(a) *(r1)*. | **BOOKED** — id present by bytes: `L-M2`, `C-2`, `D-7` |
| 45 | `C-9 / L-m3 / L-i4` | **F.W3** — FOLD: banked fr-AnimationControls C-4/M-1/M-14/L-6 + census §3a + fr-ConvergenceTimeline L·D-7 *(r1)*. | **BOOKED** — id present by bytes: `C-9`, `L-m3`, `L-i4` |
| 46 | `PD-1` | **F.W1** — binding-verification probe at the new pin (cheapest form: assert `anim.scrubbing === true` mid-drag) becomes a charter obligation, per the producer's own state | **BOOKED** — id present by bytes: `PD-1` |
| 52 | `D-3 / C-4 / L-m1` | **F.W3** — FOLD: banked fr-AnimationControls C-5/K-16, fr-ConvergenceTimeline M-2/K-6 (23 decl/7 files), K-2 specificity, K-11 remedy *(r1)*. SS-13 probe #5 RETIRED. | **BOOKED** — id present by bytes: `D-3`, `C-4`, `L-m1` |
| 53 | `D-4 / C-15` | **GLASS-RELAY** + F.W3 note *(r1)*. Offsets → SS-13 #3. | **BOOKED** — id present by bytes: `D-4` |
| 55 | `D-6` | **F.W3** + **GLASS-RELAY** *(r1)*. | **BOOKED** — id present by bytes: `D-6` |
| 56 | `D-12 / L-M4 / C-7` | **F.W3**; negative probe → SS-13 #4 *(r1)*. | **BOOKED** — id present by bytes: `D-12`, `L-M4`, `C-7` |
| 57 | `D-8 / D-9 / D-10 / L-m5` | **F.W3** (block deletes with the fork); transition leg folds to banked fr-AnimationControls M-7 *(r1)*. | **BOOKED** — id present by bytes: `D-8`, `D-9`, `D-10`, `L-m5` |
| 58 | `D-11 / L-m2` | **F.W3** *(r1 + r2 law)*. | **BOOKED** — id present by bytes: `D-11`, `L-m2` |
| 59 | `L-M3 / C-3 / D-13` | **F.W3/W4** — NEW FACE of the banked caret-clock family *(r1)*. | **BOOKED** — id present by bytes: `L-M3`, `C-3`, `D-13` |
| 60 | `L-M1 / C-13` | **F.W3** — FOLD: banked M-11/M-12 + fr-ConvergenceTimeline M-5 *(r1)*. | **BOOKED** — id present by bytes: `L-M1`, `C-13` |
| 61 | `L-B2` | **F.W3** *(r1, K-7 reachability)*. | **BOOKED** — id present by bytes: `L-B2` |
| 62 | `L-m6` | **F.W3** *(r1)*. | **BOOKED** — id present by bytes: `L-m6` |
| 63 | `DT-1` | **F.W3** — 3-line delete *(r1)*. | **BOOKED** — id present by bytes: `DT-1` |
| 64 | `DH-1` | **F.W3** *(r1 + r2)*. | **BOOKED** — id present by bytes: `DH-1` |
| 65 | `LF-1` | **GLASS-RELAY** + **F.W3** *(r1)*. | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 66 | `TS-1` | **F.W3/W4** *(r1)*. | **BOOKED** — id present by bytes: `TS-1` |
| 67 | `C-6` | **F.W3** — FOLD *(r1)*; regression read → SS-13 #9. | **BOOKED** — id present by bytes: `C-6` |
| 69 | `CU-1` | **GLASS-RELAY** (producer-owned deletion — rides the same letter as D-1/D-4/C-6's affordance family) + **F.W3 rider** (the re-derivation must not land a cursor-less drag  | **BOOKED** — id present by bytes: `CU-1` |
| 70 | `AX-1` | **F.W3** + **GLASS-RELAY amendment** — the banked three-item ask becomes four items with the same-edit law. Engine caveat → SS-13 #7 (AX-tree dump; `opacity:0` exposure v | **BOOKED** — id present by bytes: `AX-1` |
| 76 | `C-8 / C-11 / C-12 / C-14 / L-i1 / D-16` | FOLD: banked fr-AnimationControls C-6 + fr-ConvergenceTimeline C·C-7/L·D-12 — **F.W3** *(r1)*. | **BOOKED** — id present by bytes: `C-11` |
| 77 | `C-16` | **F.W3** — delete the block *(r1)*. | **BOOKED** — id present by bytes: `C-16` |
| 78 | `Z-1` | **F.W3** *(r1)*. | **BOOKED** — id present by bytes: `Z-1` |
| 79 | `RC-1` | **F.W3**; divergence → SS-13 *(r1)*. | **BOOKED** — id present by bytes: `RC-1` |
| 94 | `rK-20` | Both readers convergent; decided at MY bytes: the producer's own `.timeline-caret[data-v-a206e2d2]` carries `bottom:calc(100% + 6px)` as a bare literal — a de-tokenisatio | **BOOKED** — id present by bytes: `rK-20` |

### fr-HarmonicLevelGrid — 2 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 57 | `HLG-11 · C:C-6` | **FOLD → banked fr-BasisSelector M-6 (MAJOR · F.W3)** — which already books the two hand-copies and the clamp regression; banked K-11 there killed the visible-divergence  | **BOOKED** — id present by bytes: `HLG-11`, `C:C-6` |
| 58 | `HLG-12 · D:D-12` | **FOLD → banked FMD-12 (MAJOR · F.W3** — the hand-rolled-overflow-strip arm). Today-fixable, not F.W1-gated. | **BOOKED** — id present by bytes: `HLG-12` |

### fr-ImageUpload — 20 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 35 | `1` | Populated-state replace control is a bare `<div @click>` — no role/tabindex/name/keydown; the real `<button>` (:92-94) is `v-else` and gone; input :120-127 is `class="hid | **BOOKED** — id present by bytes: `1` |
| 36 | `2` | Strip advertises SVG (:109); API refuses it with 400 (images.py:61 no `.svg`, :99-100) and accepts 7 formats the copy omits; client gate passes it (useImageUpload.ts:4 `s | **BOOKED** — id present by bytes: `2` |
| 37 | `3` | Sole busy affordance gated on `store.computing` (:115), which `uploadImage` never sets — my grep: `beginCompute()` at :243/:265/:287/:312 only; uploadImage writes `loadin | **BOOKED** — id present by bytes: `3` |
| 38 | `4` | 47 lines of hand-rolled indeterminate progress, zero a11y channel (`grep -c aria-` → 0; no role/status/sr-only). `./progress` (variant `gradient`, `indeterminate`) is exp | **BOOKED** — id present by bytes: `4` |
| 39 | `5` | Rainbow bar fails WCAG 1.4.11: ALL SEVEN hardcoded stops < 3:1 against the `--muted` track (R1's extension adopted; R2's arithmetic correction adopted — #34d399 = 1.74:1  | **BOOKED** — id present by bytes: `5` |
| 40 | `6` | Scoped `.ring-dashed` writes bare `var(--tw-ring-inset)` (:179-180); Tailwind 4.3.1 registers `--tw-ring-inset` with NO initial-value (R2's compile probe + R1's dist extr | **BOOKED** — id present by bytes: `6` |
| 41 | `7` | Async callback through `(file: File) => void` (:14); invoked bare in non-async handlers (:38/:71 — Vue's callWithAsyncErrorHandling never engages); rejection floats (`gre | **BOOKED** — id present by bytes: `7` |
| 43 | `9` | Every SUCCESSFUL upload blanks/collapses the card: the :20-23 watcher fires on the new slug → `clearPreview()` discards an already-decoded data URL; `hasPreview()` stays  | **BOOKED** — id present by bytes: `9` |
| 44 | `10` | ImageUpload is the LAST bespoke panel in a stack whose mount host declares the migration complete (VisualizationView.vue:188-192, my read: "the control panels (each now a | **BOOKED** — id present by bytes: `10` |
| 46 | `12` | Dedup re-upload: sha256-stable slug never fires the :20-23 watcher → multi-MB data URL stranded AND preferred over the REGENERATED thumbnail (:65), defeating workspace.ts | **BOOKED** — id present by bytes: `12` |
| 49 | `15` | Dead `group` class ×2 (:53 AND :95 — R1's count adopted), zero `group-*` variants; consequence real at :53: cursor-pointer preview region with `bg-black/0` and no hover s | **BOOKED** — id present by bytes: `15` |
| 50 | `16` | null` (:25); no gate catches it — **web/tsconfig.json** (the real file; C-16's tsconfig.app.json provenance KILLED, K-6) has strict but not noUnusedLocals; no lint script | **BOOKED** — id present by bytes: `16` |
| 51 | `17` | `alt="Uploaded image"` constant while `ImageMeta.original_name` (required, types.ts:56) is in scope — the only human handle in a slug-addressed workspace. → **F.W3/W4**. | **BOOKED** — id present by bytes: `17` |
| 53 | `19` | Arithmetic: 6px bar in an 8px gutter overhanging the 12px type column by 4px/side (:135-138 vs :38); `mb-3` (12px) > card `py-2` (8px) — inner gap 1.5× the outer. → **F.W | **BOOKED** — id present by bytes: `19` |
| 54 | `20` | No width/height/aspect-ratio/decoding on the `<img>` (:63-69) ⇒ cold-load CLS; the :132 comment advertises "no layout shift" for the bar 65 lines below. Happy-path manife | **BOOKED** — id present by bytes: `20` |
| 55 | `21` | No props/emits/expose; reads the global Pinia singleton; unmountable in a second context, untestable without a live store (vitest absent) — contrast every sibling in the  | **BOOKED** — id present by bytes: `21` |
| 56 | `22` | `URL.createObjectURL`/`revokeObjectURL` is the primitive; `createObjectURL` appears NOWHERE in the product tree (my corroboration of R2's grep). readAsDataURL costs a mai | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 57 | `23` | `activeReader` never nulled after a SUCCESSFUL read (:82-84 — my read, ruling 3): preview + `activeReader.result` hold the same string twice until the next setPreview/cle | **BOOKED** — id present by bytes: `23` |
| 58 | `24` | The PRM residual that survives K-2 and is sharper than the claim both axes lost: under PRM the bar freezes at its 100% frame (blanket clamp, ruling 1) while the `<Transit | **BOOKED** — id present by bytes: `24` |
| 94 | `K-12 · D:M-7/M-3 uplift framing` | Version dependency refuted: installed 4.0.0 exports `./toast` AND `./progress` AND `./card` (my node read, 80 keys); fourier consumes ./toast TODAY. Cures belong to F.W3/ | **BOOKED** — id present by bytes: `K-12`, `D:M-7`, `M-3` |

### fr-MorphPhaseConfig — 8 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 30 | `MISS-2` | Seat-read easings.ts:115-127: `${x},${y}` with no quantisation, beside `generateCurveSVGPath`'s `toFixed(3)` nine lines up. Same module, opposite polarity (no rounding vs | **ESCAPED** — absent from F-W3 by bytes; found in F-W4-CARRY |
| 47 | `MPC-3 · D-4 ⊕ L-D2 ⊕ C-1` | **FOLD → fr-BasisSelector B-2 / FMD-3 · F.W1 (execution F.W3/W4).** Cure AMENDED by MPC-10; **sequencing hardened by MPC-31: lands in one cut with MPC-10 ⊕ MPC-13 ⊕ MPC-8 | **BOOKED** — id present by bytes: `MPC-3`, `D-4`, `C-1` |
| 60 | `MPC-11 · L-D3a` | **FOLD → FMD-12 + fr-BasisSelector M-6 · F.W3.** Substitution recipe stays killed (K-6). | **BOOKED** — id present by bytes: `MPC-11` |
| 71 | `MPC-17 · D-22 ⊕ C-9 ⊕ L-D14` | **FOLD → FMD-32 → fr-EasingCurvePreview BARREL + FORK · F.W3.** ► MPC-33 and MPC-34 ride the same consolidation. | **BOOKED** — id present by bytes: `MPC-17`, `C-9` |
| 73 | `MPC-19 · L-D8 ⊕ C-8 ⊕ C-20` | **FOLD → FMD-34 → BARREL · F.W3**; `./clipboard` subpath ask rides the glass BH relay. | **BOOKED** — id present by bytes: `MPC-19` |
| 77 | `MPC-23 · NEW` | **MINOR · books HERE → F.W3** (dies in the FMD-32 consolidation; constant square frame). Perceptibility + K-GEOM instrument → SS-13. | **BOOKED** — id present by bytes: `MPC-23`, `NEW` |
| 92 | `MPC-33 · NEW` | **INFO · FACET rider on fr-EasingCurvePreview SAMPLE · F.W3** — ONE `d`-precision decision for the module's two builders; never booked twice. | **BOOKED** — id present by bytes: `MPC-33`, `NEW` |
| 93 | `MPC-34 · NEW` | **INFO · rider sharpening FMD-32/FORK · F.W3.** Whitespace-collapse residue in the trigger text → SS-13. | **BOOKED** — id present by bytes: `NEW` |

### fr-MorphShapePreview — 6 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 52 | `D-11 ⊕ L-14 ⊕ C-4` | **FOLD → FM-14 / FMD-12** · **F.W1/F.W3** — mapping rider: **3×`Metric` + 1×`Chip.tone`**. | **BOOKED** — id present by bytes: `D-11`, `L-14`, `C-4` |
| 54 | `D-13` | **FOLD → FMD-12 + FR-AH-11** · **F.W3** (re-basing, not break-cure). | **BOOKED** — id present by bytes: `D-13` |
| 72 | `L-06` | **MINOR · F.W3** — the API re-shape belongs to the re-basing decision (KISS: not a standalone edit). | **BOOKED** — id present by bytes: `L-06` |
| 74 | `L-15 ⊕ L-18` | **INFO** — context records for F.W3. | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W4, F-W4-CARRY |
| 83 | `FR-MSP-1 · L-13` | **ADJUDICATED → F.W4** — may discharge free under FMD-12's F.W3 re-basing; the ticket checks F.W3's outcome first. | **BOOKED** — id present by bytes: `FR-MSP-1`, `L-13` |
| 103 | `FR-MSP-11 · r2-missed #6` | **ADJUDICATED → F.W3** — one ring vocabulary chosen at the FMD-12 re-basing. | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W4-CARRY |

### fr-PaperArticleWindow — 42 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 42 | `PAW-1 · D-B-1/L-1` | **→ F.W1 ledger rider** (the transaction as chartered is INSUFFICIENT for the paper route: latex-paper is a fourth package the constellation must reconcile — add the **LA | **BOOKED** — id present by bytes: `L-1` |
| 48 | `PAW-2 · D-B-2/L-2/C-B-1` | **→ F.W3/W4 + LATEX-PAPER carry**: gate `measureSection` on the CV-state event, or skip the write when `offsetHeight` equals the estimate, or move `.deferred-section` off | **BOOKED** — id present by bytes: `L-2` |
| 49 | `PAW-3 · L-5` | **→ F.W3/W4**: extract `PaperWindowSection.vue` taking `:item` so the slots leave the `v-for` scope (compiler-verified cure shape — clears `hasDynamicSlots`); the extract | **BOOKED** — id present by bytes: `L-5` |
| 50 | `PAW-4 · L-4/D-i-3` | **→ F.W3/W4**, sequenced strictly AFTER PAW-2 (the coupling law) | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 51 | `PAW-5 · L-3/C-M-1/D-i-1` | **→ F.W3/W4** (the PAW-3 extraction is where `@error` belongs) | **BOOKED** — id present by bytes: `L-3` |
| 52 | `PAW-6 · D-M-3/L-9/C-m-8` | **→ F.W3/W4** — but the cure is CONSTRAINED by K-17: **no whole-figure boolean is correct for f20** (mixed panels); re-rasterise f20's panels separately or ship dark-mode | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W1-CARRY, F-W4, F-W4-CARRY |
| 53 | `PAW-7 · D-M-2/C-m-12` | **→ F.W3/W4** (`alt=""` beside the adjacent rendered caption, or a distinct short description) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 54 | `PAW-8 · D-M-4/C-M-3` | **→ F.W3/W4** (glass Button `as-child`, thin skin — the R3-7a precedent shape); composes with PAW-22's banked GCM-23/K-5 cure and PAW-41's radius tokens | **BOOKED** — id present by bytes: `PAW-8` |
| 55 | `PAW-9 · D-M-5` | **→ F.W3/W4** (`max-block-size: min(60svh, 34rem)` in the scoped block — cascade-reachable) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 56 | `PAW-10 · D-M-7` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `PAW-10` |
| 57 | `PAW-11 · D-M-8` | **→ F.W3/W4** (rides the PAW-1 cure for visuals; the focusability arm needs real `href`/tabindex semantics at the latex-paper emitter — LATEX-PAPER carry rider) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 58 | `PAW-12 · C-M-2/L-8/C-m-2` | **→ F.W3/W4** (split the predicates) **+ F.W9/W10 rider** (build-time set-equality assertion) | **BOOKED** — id present by bytes: `L-8` |
| 59 | `PAW-13` | **→ F.W3/W4** (dies with the PAW-1 cure; recorded so the repair's visual test asserts the HOVER state too) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 60 | `PAW-14` | **→ F.W3/W4** (print stylesheet that unwinds the window, or an explicit PDF affordance — formation decision) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 61 | `PAW-15` | **→ F.W3/W4** (signposting + a windowing-aware a11y posture); AT behaviour residue → SS-13 | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 62 | `PAW-16 · D-M-6/L-11` | **→ F.W3/W4** — cure CONSTRAINED by K-16: **measurement-safe forms only** (`padding-bottom` on `.paper-window-section`, or `.paper-window-section > .paper-section { margi | **BOOKED** — id present by bytes: `L-11` |
| 68 | `PAW-17 · C-m-3/L-6` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `L-6` |
| 69 | `PAW-18 · C-M-4/L-7/D-i-2` | **→ F.W3/W4** (one computed per figure in the PAW-3 extraction) | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 70 | `PAW-19 · D-m-1/C-m-4/L-14-easing` | **→ F.W3/W4** | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 71 | `PAW-20 · D-m-2` | **→ F.W3/W4** (dies inside PAW-8's Button adoption) | **BOOKED** — id present by bytes: `PAW-20` |
| 72 | `PAW-21 · D-m-3` | **→ F.W3/W4** (`aria-hidden` on the span) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 73 | `PAW-22 · D-m-4/C-m-5` | **FOLD (F.W3/W4, inside the GCM-23 repair)** | **BOOKED** — id present by bytes: `PAW-22` |
| 74 | `PAW-23 · D-m-8` | **→ F.W3/W4** | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 75 | `PAW-24 · C-m-1` | **→ F.W3/W4** (delete + correct the comment) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 76 | `PAW-25 · C-m-6/7/9/10/11` | **→ F.W3/W4** | **BOOKED** — id present by bytes: `7`, `9`, `10`, `11` |
| 77 | `PAW-26 · L-10` | **→ F.W3/W4** (distinguish the two nulls; keep the type) | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W4, F-W4-CARRY |
| 78 | `PAW-27 · L-13` | **→ F.W3/W4** (derive the token per-item, with PAW-2) | **BOOKED** — id present by bytes: `L-13` |
| 79 | `PAW-28 · L-17` | **→ F.W3/W4 + LATEX-PAPER carry** (instance-scope or namespace the cache) | **BOOKED** — id present by bytes: `L-17` |
| 80 | `PAW-29 · L-18` | **→ F.W3/W4** (width variants ride the PAW-12 generator) | **ESCAPED** — absent from F-W3 by bytes; found in F-W0, F-W4-CARRY |
| 81 | `PAW-30` | **→ F.W3/W4, sequenced WITH PAW-1** | **ESCAPED** — absent from F-W3 by bytes; found in F-W1, F-W1-CARRY, F-W4, F-W4-CARRY |
| 87 | `PAW-31 · D-m-5` | **→ F.W3/W4** (cheap: add the SAI term) | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 91 | `PAW-35 · C-i-4` | **→ F.W3/W4** (correct the comment in whatever wave touches the file) | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 96 | `PAW-40` | **→ F.W3/W4** (rides PAW-6's inversion redesign) | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 97 | `PAW-41` | **→ F.W3/W4** (with PAW-8/PAW-22) | **BOOKED** — id present by bytes: `PAW-41` |
| 194 | `PAW-44` | **→ F.W3/W4**, under **LAW-3**: candidate cheap cure is `overflow-x: clip` (clips without minting a scroll container) **but restoration MUST land WITH-or-AFTER the PAW-1  | **BOOKED** — id present by bytes: `PAW-44` |
| 197 | `PAW-47` | **→ F.W3/W4**, under **LAW-4**: one clearance authority — either `getScrollOffset()` reads the theme's constant, or `scroll-padding-block-start` on `.paper-scroll` with s | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 198 | `PAW-48` | **→ F.W3/W4** (adopt `cartoon-card`/`cartoon-surface` on the callout — delivers PAW-10's 2px boundary + stamp, retires PAW-20's `transform` shorthand in the same edit; co | **BOOKED** — id present by bytes: `PAW-48` |
| 289 | `PAW-52` | **→ F.W3/W4** (router `scrollBehavior` + hash wiring through `ensureTargetWindow` + hash emission on active-section change — an app+component repair) **+ LATEX-PAPER carr | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 290 | `PAW-53` | **→ F.W3/W4 rider on PAW-8** — but NOT discharged by it automatically (SC-10): the adopted chassis needs a real border under WHC or the glass-ui rung extended to it (**GL | **BOOKED** — id present by bytes: `PAW-53` |
| 291 | `PAW-54` | **→ F.W3/W4**, rides the PAW-44 decision (LAW-3's scrollport question decides whether the x-axis clips or scrolls) **+ LATEX-PAPER carry note** (`.math-inline` needs an o | **ESCAPED** — absent from F-W3 by bytes; found in F-W4, F-W4-CARRY |
| 292 | `PAW-55` | **→ F.W3/W4** (declare the intended pair explicitly — `overflow-y: hidden` + sufficient padding, or `clip` with `overflow-clip-margin` — a one-rule fix in the file the re | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |
| 294 | `PAW-57` | **→ F.W3/W4** (delete-or-comment in whatever wave touches the file; zero behavior change today) | **ESCAPED (NOWHERE IN X·F)** — absent from F-W3 and from every other X·F wave/carry |

### fr-PaperSearchModal — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 22 | `R-5` | This seat enumerated every block of `PaperSearch.vue:41-397` from its own whole-file read: 40 selector blocks (:43,:47,:58,:62,:69,:80,:84,:97,:103,:118,:132,:137,:150,:1 | **BOOKED** — id present by bytes: `R-5` |

### fr-PaperSidebar — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 37 | `L-8 = C-m3 = D-N5` | F.W3 — rides R3-7a's Tooltip migration budget (+1 callsite, which M4's row component makes free). | **BOOKED** — id present by bytes: `L-8` |

### fr-PaperView — 3 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 41 | `★NAV-1` | **F.W3** (de-fork to the producer's scroll domain, or widen `performScroll` with a getElementById arm) — the navStack push must move after a successful scroll. SS-13 conf | **BOOKED** — id present by bytes: `★NAV-1` |
| 114 | `★MF-11` | **F.W3** — clean before the `./search` diff. | **BOOKED** — id present by bytes: `★MF-11` |
| 135 | `★MF-13` | **F.W3** — one-line spelling fix during the sidebar work; the adoption itself stays exemplary (S-4). | **BOOKED** — id present by bytes: `★MF-13` |

### fr-PathPreview — 1 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 20 | `L-14` | My read of GalleryView.vue: the marquee sits at `:269` inside `v-if="!gallery.entries.length && !gallery.loading"` (`:266`) under its own guard `v-if="featuredEntries.len | **BOOKED** — id present by bytes: `L-14` |

### fr-SliderControl — 2 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 22 | `D §6.3` | My node read of the installed 4.0.0: export map carries `./labeled-field` and `LabeledSlider.vue.d.ts` exists — **the cure ships AT THE PIN** (already banked at fr-Fourie | **BOOKED** — id present by bytes: `D` |
| 68 | `K-7 · D §6.3 framing` | KILLED AS FRAMED — ruled above (ships at pin per FMD-14; REQUIRED `tooltip`, no description/formatValue/color per my d.ts read — the LC-3 not-drop-in precedent; D-8 dead; | **BOOKED** — id present by bytes: `K-7`, `D` |

### fr-SpeedSelect — 3 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 27 | `SS-C-9 grade` | fr-AnimationControls:29 **R-7** ruled this exact anchor MINOR ("duplicates accessible names already present … `SpeedSelect`'s own `aria-label`"); identity stays with inta | **BOOKED** — id present by bytes: `SS-C-9` |
| 60 | `SS-L-09` | **F.W4** — un-fixme rides the F.W3 menu re-home (banked D-9/C-9); the speed round-trip joins `settings-persistence.spec.ts` | **BOOKED** — id present by bytes: `SS-L-09` |
| 71 | `SS-C-9 / SS-L-11` | F.W3 | **BOOKED** — id present by bytes: `SS-C-9`, `SS-L-11` |

### fr-SvgFilters — 3 F.W3-routed row(s)

| record line | banked id (verbatim) | route cell | F-W3 disposition |
|---|---|---|---|
| 20 | `R-1 · L-2 grade + blast radius` | Mechanism re-derived whole by this seat at 0.4.1: PRM return :129 precedes enrolment :134; resume branch :84-90 calls `ensureScheduler()` unconditionally; tick :34-55 re- | **BOOKED** — id present by bytes: `R-1`, `L-2` |
| 25 | `R-6 · boil-can't-boil grade` | The row is the decision input F.W3/W4's delete-vs-rewire ruling most needs: the animated register **cannot produce the register it names** (no `seed` variation anywhere — | **BOOKED** — id present by bytes: `R-6` |
| 28 | `R-9 · D-5 grade` | Certain and design-load-bearing (dual-theme app; producer inverts in three places; v7.0.0 writes the physics — "screen lifts (NOT soft-light, which collapses to identity  | **BOOKED** — id present by bytes: `D-5` |
---

## §4 VERDICT

**verdictLocal: DEFECTIVE.**

Three convictions carry it. **(1)** g19 — the gate on which §Z's entire zero-silent-drops claim rests — names a CARRY authority that does not exist in the tree, so the closure proof is unrunnable by construction (L-19). **(2)** 71 of 317 F.W3-routed banked rows escape by bytes, 23 of them into no X·F document at all, and nine of those are **sole-`F.W3`** routes that no F.W4 can claim — against a §X that demonstrates, at PAW-44/LAW-3, exactly what a named exclusion should look like. **(3)** the §1 bounds table names 20 paths the tree does not hold, contradicting corrections the spec's own authority already published (`fr-NotationPills.md:9/:23`), which leaves §5a's file-disjointness proof — the wave's only defence against the X·V W5-D1 conflict class — unproven against the real tree.

Against that: the M-25 depth is genuine, not transcription. Every named lock the check demanded is present with its verbatim clause; the four anti-cures are carried whole with their kill cites; the owner rulings are flagged inline and made triumvirate-triggering; the status posture is clean; and **fourteen of the twenty gate witnesses were independently reproduced against the live tree**, several to the exact integer (48 rule blocks, 23/7 declarations, 127/146 lines, 5 `timeAgo`, 7 `startsWith`, 28 dirty rows, four HEAD pins). The spec is not contrivance. It is a strong spec with a phantom closure gate, a leaking census tail, and a bounds table authored against a remembered tree instead of the one on disk.

**PASS-1 remedies, in order**: (a) name or author the F.W3 CARRY ledger and re-cut g19's witness against a real path; (b) book or exclude-with-reason the 71 escapes, starting with the nine sole-`F.W3` rows and `LF-1`'s missing SS-6 letter line; (c) re-derive §1 from the live tree and re-prove §5a; (d) quote F.W0's G-11/G-12/G-13 tables and re-anchor g6 at a producer commit hash under P-4; (e) carry `FR-NP-32` by id and sequence §7's `vite build` behind it.

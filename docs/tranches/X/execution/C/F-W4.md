SERVED MODEL: claude-opus-5[1m]

# X.F.W4 — execution record (Track C · X·F · fourier-analysis)

**Spec of record**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md` (470 lines, read WHOLE at this seat: §0 · §0a · §1 · §2.0 · §2.A–§2.L · §2.X/§2.X.1/§2.X.2 · §3 · §4 · §5.1/§5.2 · §6 · §Y).
**Runbook**: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.3 (Track C order + edge reasons) · §3.4 (locks) · §5 (seat law).
**Rulings read to file end**: `docs/tranches/X/COHESION.md` §0i · §0i.5 · §0j (incl. §0j.D X·F, §0j.F) · §0k ×2 · §0l · §0m · §0n · §0o · §0p · §0q.

---

## Open

**Date**: 2026-09-17 (the sitting's date of record; wall clock 2026-09-18, 17:1x–17:5x EDT).
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`. No product byte written by this seat — every fourier-side reading below is a read (`git`, `grep`, `find`, `ls`, `npx vue-tsc -b`), and `vue-tsc -b` is the spec's own declared witness, which `npm run build` already runs (§4 `G-F4-VUE-TSC-CLEAN`).

### CRASH-RECOVERY sweep (standing law) — nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅** (clean tree; branch `m/w1-bump-migration`, HEAD `f7fa1e3`).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **12 modified ⊕ 3 untracked**, and **none of the 15 sits inside this wave's writable set**: the ten `demo/**` SFCs and `docs/tranches/V/reformation/CARRY-LEDGER.md` are sibling seats', `scripts/dev/dev.sh` is the unowned standing-dirty path (**NEVER touched, never staged**), `docs/tranches/X/waves/evidence/` and the two `e2e/smoke/**a11y-control-targets.spec.ts` are Track A's. `docs/tranches/X/execution/C/F-W4.md` was **ABSENT** before this seat wrote it — ⟨cmd⟩ `/bin/ls docs/tranches/X/execution/C/` → `F-W0.md` · `F-W1.md` · `F-W2.md` · `F-W5.md` · `F-W6.md`. **No killed predecessor seat's partial work exists on this unit. Zero inherited paths.**

### Preconditions — verified at the bytes AND in the ledger

| condition | source | receipt | verdict |
|---|---|---|---|
| **F.W1 CLOSED** (the sole declared predecessor; "gated whole", no partial arm) | ledger row `F.W1`; runbook §1.3 edge `F.W1 → F.W3 / F.W4` (*"F.W4 carries no such exception and is gated whole"*) | ⟨cmd⟩ `grep -n '^\| F\.W1 ' LEDGER.md` → **`CLOSED 2026-09-18 (honest-RED: G9 · G20(b))` — CHECK 1 CONFORMANT-HONEST-RED, 19/19 claimed GREEN readings reproduce** | **MET** |
| **F.W1's ONE atomic land-or-lose transaction actually landed as ONE change** (§5.1(2); splitting it reddens the four zero-console gates, FR-EQR-3) | fourier git | ⟨cmd⟩ `git show --stat --oneline 538db90` → **`feat(fourier)!: the atomic tri-package uplift` · 58 files changed, 1500 insertions(+), 744 deletions(-)` — ONE commit** | **MET** |
| **the uplifted tree is installed** (COHESION `:74`: *"no fourier frontend spec may assume the uplifted tree before W1 lands it"*) | `web/package.json` | ⟨cmd⟩ `grep -nE '"@mkbabb/' web/package.json` → `"@mkbabb/glass-ui": "^8.0.0"` (`:15`) · `"@mkbabb/keyframes.js": "^6.0.0"` (`:16`) · `"@mkbabb/value.js": "^4.0.0"` (`:19`); ⟨cmd⟩ `grep -n 'lucide' web/package.json` → `"@lucide/vue": "^1.16.0"` (`:14`) — the rename limb landed too | **MET** |
| **F.W0 CLOSED** (transitive; §5.1(1) *"F.W0 substrate pre-gates FIRST"*) | ledger row `F.W0` | `CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))`, 10 fourier + 10 value commits, both repos PUSHED | **MET** |
| **ESC-1 RULED** (§0 PIN LAW: F.W1 is `4→7(→8, G1-gated)` and opens only after ESC-1 is ruled; every `⊘ ESC-1/G1-GATED` cell in this spec depends on the branch) | COHESION **§0i.3** | glass **8.0.0 @ `17a11bc5`** — the **8-branch** is the live branch. Every `⊘ ESC-1/G1-GATED` cell in §2.0 (SP-7 `LabeledSelect`, SP-9 `SS-D-01/SS-L-04` + `MPC-32`, §2.J GAB-3's `loading` posture) reads on its **8.0.0 arm**; the 7-branch alternatives are struck. **Cite, never re-open.** | **MET / RULED** |
| **D9 (PS-L-4 +M6) — OWNER-GATED, "unauthorable unruled"** | COHESION **§0o**, row `ESC-2` | *"**ONE owner.** The ToC model is a single `useSidebarFollow` instance owned by the paper view (the highest common ancestor of sidebar and body), provided through a **typed `InjectionKey`**; the second instance and the untyped `defineExpose` seam are retired. Ruled at F.W1 as WU-R says; **F.W4 executes the collapse**; L-5(a) is its prerequisite."* Blocked rows released: `fr-PaperSidebar L-4` · `M6`. | **RULED — unit `.e` executes** |
| **G-15(b) root-size fork** (§3/§2 dependents) | COHESION **§0j.D** | *"the root-size fork → **`html{font-size:1.125rem}` under 768px GOES**: the 12.5% inflation compounds with `--ui-scale` (67.5px against the token author's 60px); F.W1's token-parity re-tune absorbs it, **F.W4 executes per component**."* | **RULED — unit `.a` lands the sheet leg; every unit executes its own per-component leg** |
| **G-10 / F8-REACH-01+02** (§5.1(1), and the §2/§4 rows that cite them) | COHESION §0j.D + fourier tree | ⟨cmd⟩ `find web/src -name 'InfoCard*' -o -name 'CanvasOverlayButton*'` → **∅**. Both files are **DELETED** (F.W0 `5842377`). See `greenBeforeCure` #3 — this moves live rows in this spec. | **MET (and consequential)** |
| **ESC-4 easing drift** (SP-10-adjacent; `lib/easings.ts` is in §1 *Shared* bounds) | COHESION §0o row `ESC-4` | *"DRIFT REFUSED … the 14 orphans are defined analytically inside the corpus's own `web/src/lib/easings.ts` … the 8 survivors re-point to `@mkbabb/value.js/easing`."* Landed at F.W2 `.a` (`0cc9b00`). **Cite, never re-open.** | **MET / RULED** |
| **F.W2 landed on shared files this wave also owns** (`lib/colors.ts`, `lib/easings.ts`, `lib/golden-shimmer.ts`, `BasisCanvas.vue`, `ContourPreview.vue`, `ContourEditorCanvas.vue`) | fourier git | `0cc9b00` (A3/SC-4 lerp retire) · `0106a85` (ONE CUT, `--contour-stroke`, nine amber sites) · `f7fa1e3` (`hexToRgba`/`hexToRgb` deleted with the B7 join). **These bytes are LANDED and are the substrate this wave edits on top of — never re-derived, never reverted.** | **NOTED** |

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (**2026-09-18 17:16 EDT**), compared against **every row** of `docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **Status cell**, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**); `INBOX.md` **self-excluded** (SELF-COUNT law). Delta taken against **17:11**, the clock of the foot sweep line then standing (X.P.W3 RESUME-4).

⟨cmd⟩ `/usr/bin/find <each path> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 17:11"`, over the four landing paths ⊕ the atlas **P**-lane ⊕ the Track-C fourier mail-ledger surface (COHESION §0k.1):

1. `docs/tranches/V/` → **∅** · `docs/tranches/V/coordination/` → **`INBOX.md` only (self)**
2. `../glass-ui/docs/tranches/BK/coordination/` → **∅**. **BK re-confirmed the newest glass tranche dir** — ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -5` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/` · `BH/`. Its newest entry is `glass-outbound-2026-09-18-valuejs-o26-reply.md` @ Sep 18 14:41, **already rowed I-35** (X-W1 RESUME).
3. `../keyframes.js/docs/tranches/V/coordination/` → **∅**
4. `../sci-report/atlas/docs/tranches/P/coordination/` → **∅**
5. `../fourier-analysis/docs/tranches/F/coordination/` → **∅**

⟨cmd⟩ `/usr/bin/grep -nE '\| *UNREAD' docs/tranches/V/coordination/INBOX.md` → **no output**.

**Result: 0 unrowed · 0 UNREAD in scope.** No row minted; a dated sweep line is appended at `INBOX.md`'s end.

---

## Baseline — the spec's own §4 gates, run READ-ONLY, double-run

All commands run from `/Users/mkbabb/Programming/fourier-analysis/web` unless a path says otherwise. Every count below was taken **twice** in one invocation and both runs agree (WRITE-THEN-MEASURE / double-run law); the consolidated double-run transcript is pasted after the table.

| # | gate | BEFORE (this seat's measurement) | verdict at open |
|---|---|---|---|
| 1 | **G-F4-CARRY-CLOSURE** | leg (a): `carry/F-W4-CARRY.md` = **559 lines / 438 `- **` row-head bullets**. leg (b) basis re-derived over the 66 adjudicated records: `F.W4` → **1128** occurrences / **56** records; `F.W3/W4` → **1010** / **55**; both dash spellings of the span form → **0** / **0** (the en-dash arm stays a measured ∅, as the gate requires); canonical §2 `F.W4` = **1007 rows** (`CENSUS-CANONICAL.md:5462`). **No closure transcript exists in tree.** | **RED** |
| 2 | **G-F4-A11Y-ROUTE** | **10** `checkA11y(` lines in `e2e/` (2 are the helper definitions → **8** call sites), **2** `new AxeBuilder` constructions. `/equation` **HAS joined** (`e2e/visualization-ux.spec.ts:260` — `await checkA11y(page, "/equation")`); `/paper`, `/morph`, `/demo/shape-extractor` have **not**. | **PARTIAL-RED** — see `greenBeforeCure` #2 |
| 3 | **G-F4-ADMIN-AXE** | ⟨cmd⟩ `grep -rln "admin" e2e/ \| wc -l` → **0** | **RED** (witness reproduces exactly) |
| 4 | **G-F4-OCCLUSION** | `e2e/visual-baseline.spec.ts:63` measures `document.documentElement.scrollWidth - document.documentElement.clientWidth`; `App.vue:24` ships `overflow-hidden` on the `h-dvh` root and `:26` `overflow-y-auto` on `<main>` → the horizontal gate passes **by construction**, and no VERTICAL-clip assertion exists. | **RED** (witness reproduces) |
| 5 | **G-F4-VITEST** | `web/package.json` scripts are exactly `dev` · `build` · `preview` · `test:e2e` · `test:e2e:ui`; **0** `vitest.config.*`; **0** `*.test.ts`/`*.spec.ts` under `web/src`. | **RED** (witness reproduces) |
| 6 | **G-F4-VUE-TSC-CLEAN** | ⟨cmd⟩ `npx vue-tsc -b` → **EXIT=1**, **18 diagnostics** (**17 × TS6133** + **1 × TS6196**), identical across two runs. The 18 sites, verbatim: `useCoeffHover.ts(22,5) notation` · `EquationView.vue(57,7) loading` · `FrequencyGraph.vue(2,43) onUnmounted` · `AppHeader.vue(49,7) workspaceStore` · `PaperView.vue(20,1) PaperSectionData` · `usePaperSearch.ts(10,10) SearchEntry` · `BasisSelector.vue(11,7) fourierModes` · `ContourEditorCanvas.vue(42,9) dragging` · `GalleryCard.vue(9,1) VIZ_COLORS` · `GalleryCard.vue(10,1) PathPreview` · `ImageUpload.vue(2,15) computed` · `labels.ts(20,18) width` · `labels.ts(20,25) height` · `labels.ts(85,18) width` · `labels.ts(85,25) height` · `VisualizationView.vue(2,25) watch` · `api.ts(5,5) AnimationSettings` (TS6196) · `contourEditing.ts(20,53) tension`. **⊘ The spec's stated witness (`glass-scrubber` ∉ the pinned vocabulary — MPC-13) is DEAD: F.W1's uplift cured it. The gate is still RED, on an entirely different and STRONGER mechanism** — `noUnusedLocals` is now on and the tree has 18 violations. | **RED (mechanism moved; disclosed, not smoothed)** |
| 7 | **G-F4-NO-UNUSED** | `web/tsconfig.json` carries **18** `compilerOptions` keys (not the spec's 13) and **`noUnusedLocals: true` (`:10`) + `noUnusedParameters: true` (`:11`) ARE PRESENT** — landed at F.W0 `b3b736c` (*"toolchain gates + lint floor"*). ESLint leg: **0** eslint configs at `web/` top level; no `lint` script in `web/package.json` and no root `scripts` block. | **PARTIAL-RED** — see `greenBeforeCure` #1 |
| 8 | **G-F4-CONTRAST-FLOOR** | No executable harness anywhere: `grep -rln 'contrast\|relativeLuminance'` over `e2e/` → **∅**; the only two `src/` hits are `ContourSettings.vue` and `style.css` (both authoring uses, not assertions). None of the named pairs is asserted in either arm. | **RED** |
| 9 | **G-F4-PRM-CLOCK** | **8** files use `requestAnimationFrame` (`stores/animation.ts` · `paper/PaperView.vue` · `paper/useScrollNavigation.ts` · `visualization/composables/useCanvasHover.ts` · `equation/ConvergencePlot.vue` · `equation/composables/useCurveTransition.ts` · `decorative/SvgFilters.vue` · `router/index.ts`). PRM is consulted by `matchMedia` in exactly **3** of those 8 (`PaperView.vue:176` · `SvgFilters.vue:9` · `router/index.ts:17`); **12** files mention `prefers-reduced-motion` at all (the rest are CSS-side). **The five ungated clock owners are `stores/animation.ts` · `useScrollNavigation.ts` · `useCanvasHover.ts` · `ConvergencePlot.vue` · `useCurveTransition.ts`.** | **RED** |
| 10 | **G-F4-CENSUS-CELLS** | No correction landed for any of the six named cells; all six homes verified present in tree. | **RED** |
| 11 | **G-F4-DERIVER** | ⟨cmd⟩ `find .. -name '*deriv*' -not -path '*/node_modules/*' -maxdepth 3` → **∅**. No deriver exists; none of the seven declared publish fields is emitted. | **RED** |
| 12 | **G-F4-ZERO-CONSOLE** | The atomicity precondition **holds** (F.W1 landed as ONE commit, `538db90`). Five e2e specs carry console/pageerror hooks (`visualization-crud` · `workspace-flow` · `paper-performance` · `gallery` · `contour-extraction`). **The four gates themselves are NOT run at open** — a full Playwright suite is outside probe parsimony (§5.2) for an opening seat, and this gate is a *keep-green* obligation across the wave, not a cure. | **UNMEASURED-AT-OPEN** (declared, not claimed) |
| 13 | **G-F4-KATEX-QUIET** | No `strict` and no `trust` option is passed at any KaTeX call site (`grep -rn 'trust' src/ \| grep -i katex` → **∅**); KaTeX's defaults (`strict: "warn"`) are therefore live at all **6** katex-touching files (`main.ts` · `EquationPanel.vue` · `ConvergencePlot.vue` · `useCoeffHover.ts` · `EquationResult.vue` · `EquationView.vue` · `style.css`). ⊘ This is also the SP-18 born-RED: **there is no single `renderLatex()` home** — the call surface is spread across five modules. | **RED** |
| 14 | **G-F4-ANCHORS** | **A NEW live anchor kill, found by this seat at open and recorded here rather than discovered by a unit mid-edit**: the spec's **§1 Bounds** cites a `views/` directory that **does not exist** — ⟨cmd⟩ `/bin/ls web/src` → `assets/` `components/` `composables/` `lib/` `router/` `stores/`, and ⟨cmd⟩ `find web/src -name '*View.vue'` → `components/equation/EquationView.vue` · `components/paper/PaperView.vue` · `components/visualization/GalleryView.vue` · `components/visualization/VisualizationView.vue`. Five more §1 spellings resolve elsewhere than written: `FourierMorphSvg.vue` → `components/decorative/`, `UserSlugBar.vue` → `components/visualization/gallery/`, `FourierShapeExtractor.vue` → `components/morph/`, `{PathPreview,SliderControl,CollapsibleSection,Tooltip}.vue` → `components/ui/`, `{ConvergenceLegend,ConvergenceTimeline}.vue` → `components/equation/convergence/`. **§1 is a declared surface, not a path list (its own words); the unit writable sets below carry the RESOLVED homes, and the resolution is the gate's first contribution.** | **RED, with one kill already banked** |
| 15 | **G-F4-DEAD-DEP** | `components/paper/search/index.ts` **present** (zero-consumer proof owed). `InfoCard.vue` and `CanvasOverlayButton.vue` **ABSENT** — F.W0's G-10 DELETE landed. **0** zero-byte `.css` under `web/src` (FR-AUL-39's linked stylesheet is a *built* artefact, to be re-proved at the emission, not at source). Two dead `GalleryCard.vue` imports (`VIZ_COLORS`, `PathPreview`) are now **compiler-visible** at gate 6 — FR-GFC-22's enabling condition is live. | **RED on the remainder; two witnesses discharged** |
| 16 | **G-F4-NEG-ROSTER** | Nothing authored yet; the roster is vacuously intact at open. This is a **keep-green obligation binding on every unit**, never a cure: no §2 cure, ledger row or census cell may grow a leaf on a §0a component; **GM-19 is never certified**; the CP KILL-6 migration is **never executed**; `moon.json` is **never regenerated**. | **HELD-AT-OPEN (obligation)** |
| 17 | **G-F4-DECISIONS** | ⟨cmd⟩ `/bin/ls docs/tranches/X/fourier/` → `RULINGS-F.W2.md` · `carry/` · `conformance/` · `contract/` · `evidence/` · `facility-19.md` · `waves/`. **`DECISIONS-F.W4.md` does not exist.** D9 is released by COHESION §0o ESC-2 (above); D1..D8 and D10 are unruled. | **RED** |
| 18 | **G-F4-CONV-STUDY** | No study memo anywhere in either tree; `FR-CP-LB3`'s memoisation is unlanded, so any measurement taken today misattributes recomputation cost to Canvas2D — exactly the trap the gate names. | **RED** |

### Pasted transcripts (double-run)

⟨cmd⟩ (from `fourier-analysis/web`) two identical passes of one consolidated probe:

```
--- run 1
a11y=10 axe=2 admin=0 vitest_cfg=0 tests=0 eslint=0 tscfg_keys=18 raf=8 prm=12
--- run 2
a11y=10 axe=2 admin=0 vitest_cfg=0 tests=0 eslint=0 tscfg_keys=18 raf=8 prm=12
```

⟨cmd⟩ (from `value.js/docs/tranches/V/megatranche/registry/adjudicated`) the leg-(b) basis, twice:

```
run1: FW4=1128 recs=56 F3W4=1010 recs=55 total=66
run2: FW4=1128 recs=56 F3W4=1010 recs=55 total=66
en-dash F.W3–W4 = 0 ; hyphen span F.W3-W4 = 0
CENSUS-CANONICAL.md:5462  | **F.W4** | 1007 |
```

⟨cmd⟩ (from `fourier-analysis/web`) `npx vue-tsc -b`, twice:

```
EXIT=1
18            (lines)
18            (error TS lines)
  17 error TS6133
   1 error TS6196
```

### R.2 — GREEN-BEFORE-ITS-CURE findings (a GREEN before its cure is a finding, and these are listed, not smoothed)

1. **`G-F4-NO-UNUSED`, the tsconfig leg.** The gate's born-RED witness reads *"tsconfig has 13 compilerOptions keys, no `noUnusedLocals`"*. Measured today: **18 keys, with `noUnusedLocals: true` at `web/tsconfig.json:10` and `noUnusedParameters: true` at `:11`** — landed by **F.W0 `b3b736c`** (*"toolchain gates + lint floor"*), i.e. by a predecessor wave of this track, not by this wave. The witness is **superseded**, the *enabling condition* the gate exists to create is **already live**, and what remains RED is the ESLint leg (`vue/require-v-for-key`, `no-duplicate-imports`) and the CI wiring. Consequence carried forward: **the 18 `vue-tsc` diagnostics at gate 6 are that enablement's output** — the class the gate was written to make visible is visible, and the cure is now *deletion at 13 sites*, not *configuration*.
2. **`G-F4-A11Y-ROUTE`, the `/equation` leg.** The gate's witness reads *"axe drives `/visualize` + `/v/{slug}` ONLY (7 checkA11y sites; AxeBuilder ×2 both `/visualize`)"* and predicts *"the moment `/equation` joins, fr-CL M-R2 + FR-EQR-6/R2-r3 fire TWO `scrollable-region-focusable` BEFORE any hover finding — that is the RED."* Measured today: **`/equation` has already joined** (`e2e/visualization-ux.spec.ts:260`), and the site count is **8 calls (10 lines incl. 2 helper defs)**, not 7. ⊘ **The gate's predicted RED is therefore either already firing in CI or already cured, and this seat did not run the suite to find out (probe parsimony).** Unit `.g` must *measure that leg first* and report which, before it adds `/paper`, `/morph` and `/demo/shape-extractor` — adding three routes on top of an unread verdict is how an honest-RED becomes an unread one.
3. **`G-F4-DEAD-DEP` / the F8-REACH pair, and a live consequence for §2's bookings.** `InfoCard.vue` and `CanvasOverlayButton.vue` are **both absent** (COHESION §0j.D `G-10`, landed at F.W0 `5842377`). Two consequences the units must carry rather than re-derive: (a) the gate cell's *"`CanvasOverlayButton.vue` zero consumers (**delete AFTER restoration, never before**)"* is **moot** — the deletion already happened, and nothing restores it under this wave; (b) **every `FR-IC-*` row this spec books is now dead-by-deletion** — `FR-IC-2`/`FR-IC-3..24` at **SP-3**, `FR-IC-6` at **SP-13**, and §5.2's *"FR-IC's 21/14 census rides an F.W1-sequenced F.W3"* — because the component they charge no longer exists. **These are booked rows whose subject was deleted by a predecessor wave; they are DISCHARGED-BY-DELETION, not silently dropped**, and unit `.b` states them id-for-id in its receipt with this receipt as provenance (the silent-drop class is exactly what `G-F4-CARRY-CLOSURE` exists to kill).

### Two structural findings recorded at open (neither is a cure; both bind units)

- **`vue-tsc`'s stated witness is dead and the gate is RED on a different mechanism.** See gate 6. `glass-scrubber` is in the 8.0.0 vocabulary; MPC-13's premise died with F.W1. Disclosed rather than smoothed — a gate re-reported RED on a cured witness is a false receipt.
- **EVALUATE-SCOPE is narrower than the census assigns.** §1's last bullet grants `BasisCanvas.vue` and `ContourEditorCanvas.vue` **evaluate** access only — *"read, derive, and judge; the edit surface is unchanged"* — while §2.X.1 books those two records' whole residue to this wave (including three `fr-ContourEditorCanvas` BLOCKERs the `/`-atomiser had hidden). **A wave cannot cure a row on a file it may only read.** Unit `.c` judges both files, books its verdicts, and **ESCALATES** the cure surface by dated addendum-beside rather than writing either file; it does **not** widen its own bounds. (F.W2 `.b` held a *separate, F.W2-side* grant on these two files for the colours arm; that grant is F.W2's and expired with it — it is not inheritable here.)

---

## Unit plan

**§1 Units: 9** — `.i` (decisions, docs-only, FIRST and ALONE) → `.g` (gate chassis) → `.a` (shell · morph · the global sheet) → `.b` ∥ `.c` → `.d` ∥ `.e` → `.f` → `.z`. **Seven ordered groups, peak concurrency 2**, inside the owner's four-workflow cap (runbook §5.1) and inside the two-concurrent ceiling.

**Model tiering.** The spec declares **no `§State`/`Agents` line** (⟨cmd⟩ `grep -cE 'Agents|Agent Units|Worktree|Disjointness' F-W4.md` → **0**) and **names no Fable, fresh-Fable, adjudicator or design-author seat** (⟨cmd⟩ `grep -oicE 'fable|design-author|fresh-Fable' F-W4.md` → **0**). Runbook §5.1's residual rule therefore governs — *"Opus solo for mechanical/challenge seats (censuses, greps, gate runs, single-file cures)"* — and **all nine seats are `opus`**, the F.W2 precedent exactly (whose `.c` was a *rulings* record and was Opus).

**Disjointness law for this wave (the partition is by RESOLVED path, never by the spec's §1 spelling — see gate 14).** No two units in one group share a modify path; three files carry an explicit sole-owner declaration because more than one §2 section reaches them:

- **`web/src/style.css` has exactly two owners, in sequence and never concurrently**: **`.a`** (SP-6's `@layer glass-overrides` cascade decision — ⊘ the ONLY shape that works, `@layer components` **reverses** the outcome, FR-AH-30; SP-10's font decision; §0j.D G-15(b)'s `html{font-size:1.125rem}` removal) and then **`.f`** (the collected cross-route residue: PAW-55's `.katex-display` computed-`auto`, the `.sidebar-link` font-weight transition, FR-EQR-22's unearned `!important` neighbourhood). Any other unit's sheet need is **declared to `.f` in its receipt**, never written.
- **`web/e2e/**` and `.github/workflows/**` are `.g`'s**, with ONE declared exception: DMT **N-2's RIDER LOCK** — *"the aria-label is a load-bearing e2e locator — label changes land WITH `paper-performance.spec.ts:328`"* — so that single locator line is **`.a`'s**, in `.a`'s own commit. `.g` runs strictly **before** `.a`, so the path is never concurrently held.
- **`components/visualization/GalleryView.vue` + `gallery/**` + `stores/gallery.ts` are `.d`'s**, carved out of `.c`'s directory claim by name.

**Ordering law, sourced.** (1) §3's own heading — *"Decisions this wave authors (**unit i — FIRST, docs only**)"* — plus §4 `G-F4-DECISIONS` (*"no cluster depending on an unruled decision has opened"*) puts `.i` first and alone. (2) §5.1(3)'s last clause — *"**G-F4-VITEST before any unit-test rider**"* — puts `.g` before `.b` (FR-CP-LM1's 6-line `snapshotForTransition` test) and `.c` (CP-ROW-40's `contourBounds`), and `.g` needs D6 ruled, so `.g` is second. (3) SP-6's cascade decision is the substrate every scoped-style cure downstream relies on, so `.a` is third and alone. (4) §5.1(3)'s *"FR-CP-LB3 measured BEFORE G-F4-CONV-STUDY"* puts `.f`'s study after `.b`. (5) `.z` is last: its closure gates read the settled bookings.

| group | units |
|---|---|
| **1** | `.i` |
| **2** | `.g` |
| **3** | `.a` |
| **4** | `.b` ∥ `.c` |
| **5** | `.d` ∥ `.e` |
| **6** | `.f` |
| **7** | `.z` |

**Binding on every unit** (stated once here, never restated per unit): born-RED law · L-19 (no gate without a live named witness) · **E-3** (the spec, the adjudicated registry, `CENSUS-CANONICAL.md`, the carries and all prior conformance artefacts are IMMUTABLE — corrections are **dated addenda-beside** under `docs/tranches/X/fourier/`, never in-place) · **G-F4-CENSUS-CELLS**: a unit that falsifies a census cell lands its dated addendum-beside **in the same commit as the cure** · **G-F4-NEG-ROSTER**: §0a's proven negatives are never re-derived and never grown on · **§5.1(5)** direct parse-that→fourier is FORBIDDEN · **§5.1(6)** glass-producer rows go to the BH relay (SS-6) and **NEVER** become frontend hacks (glass-ui is READ-ONLY, always) · **§6**'s 19 adjudicated-dead cure shapes are ⊘ locks, never executed · every `⊘ ESC-1/G1-GATED` cell reads on its **8.0.0 arm** (COHESION §0i.3) · SS-13 flags are **deferred**, never resolved inline (§5.2) · probe parsimony (§5.2) · pathspec commits only, with the `Claude-Session` trailer · receipts appended to this file's `## Unit receipts`, line 1 of any new file = `SERVED MODEL:`.

---

### Unit `.i` — the decisions record

- **Model**: opus
- **Sections**: §3 *Decisions this wave authors* (`:353-369`, D1..D10 whole) · §4 gate **`G-F4-DECISIONS`** (`:39`) · the decision heads at their cure sites — §2.J's D1 marquee head (`:168`), §2.E's D8 `ECD-D-2/L-3/C-1` (`:114-119`), §2.I's D4/LAW-3 + D5/LAW-5 (`:142-166`), §2.G/§2.H's D2/D3 (`:127-141`), §2.F's D7/HLG-35 (`:120-126`), §2.L's **VITEST-FLOOR** (`:198`) · §5.1(3) riders (`:48`) · §5.2's `→ NO-WAVE-OWNER / SS-3/SS-4` row (`:62`) · §6 (`:418-438`) · COHESION **§0o ESC-2** (D9) and **§0j.D G-15** (b)/(c)/(d)
- **Writable**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/DECISIONS-F.W4.md` (new) · this record's `## Unit receipts`
- **Gates**: `G-F4-DECISIONS`
- **Locks**: strictly **first and alone**; **no fourier byte is written by this unit**. D9 is **RULED** at COHESION §0o ESC-2 (ONE owner · typed `InjectionKey` · *"F.W4 executes the collapse"* · L-5(a) prerequisite) — **transcribe the ruling with its id and never re-open it**; D6's ruled arm is `.g`'s whole precondition, so D6 is decided in this record, not deferred; D1's default is **DELETE** with the D/C BLOCKER dissents preserved verbatim; D10 is the **posed-with-default** batch and routes to SS-3/SS-4 — it states defaults, it does **not** answer them. Each of D1..D10 lands as **RULED** or **DEFERRED-WITH-DEFAULT**, with the honest default carried and **the cost of each branch stated** (§3's own words). One commit.
- **Brief**: Author `DECISIONS-F.W4.md`. For each of D1..D10, in order: state the decision, the mechanism (quoting §3's own bytes), the **honest default**, the **cost of each branch**, and the verdict (RULED / DEFERRED-WITH-DEFAULT) with its dependent cluster named. D9 is transcribed **from COHESION §0o ESC-2** as already ruled, with `fr-PaperSidebar L-4`/`M6` named as released and `.e` named as the executor. D6 must be decided outright (vitest runner in `web/` vs PAW-50's Vite-build-plugin arm) and must name the first four assertions — `snapshotForTransition` · `contourBounds` · `resolveFigure` · `fuzzyMatch` — because `.g` cannot open otherwise. Preserve every recorded dissent (D1 D/C BLOCKER; D2's D-axis LOG minority; D4's open design dissent) verbatim. ⊘ Do not author any cure; ⊘ do not touch `F-W4.md`.

### Unit `.g` — the gate chassis

- **Model**: opus
- **Sections**: §4 gates **`G-F4-VITEST`** (`:26`) · **`G-F4-NO-UNUSED`** (`:28`) · **`G-F4-A11Y-ROUTE`** (`:23`) · **`G-F4-ADMIN-AXE`** (`:24`) · **`G-F4-OCCLUSION`** (`:25`) · **`G-F4-CONTRAST-FLOOR`** (`:29`) · **`G-F4-DERIVER`** (`:32`) · **`G-F4-ZERO-CONSOLE`** (`:33`, the keep-green obligation) · §2.L *VITEST-FLOOR* and *SCRUB*'s `G-F4-NO-UNUSED` gating clause (`:194-199`) · §5.1(3)'s *"G-F4-VITEST before any unit-test rider"* and *"`noUncheckedIndexedAccess` (or an honest return type) before PAW-12's predicate split"* (`:48`) · §5.2's `→ F.W9/W10` row (`:58`) · §0's BS-1 (the deriver's callsite-keyed blindness)
- **Writable** (fourier): `web/package.json` · `web/tsconfig.json` · `web/vitest.config.ts` (new) · `web/eslint.config.js` (new) · `web/e2e/**` *(except `e2e/paper-performance.spec.ts:328`'s locator line, which is `.a`'s N-2 rider)* · `.github/workflows/**` · the deriver's own new module under `web/scripts/` or `web/e2e/` as D6's ruled arm dictates; (value.js): `docs/tranches/X/fourier/F-W4-ADDENDA-g-2026-09-18.md` (dated addendum-beside, if any spec cell is falsified)
- **Gates**: `G-F4-VITEST` · `G-F4-NO-UNUSED` (ESLint + CI legs) · `G-F4-A11Y-ROUTE` · `G-F4-ADMIN-AXE` · `G-F4-OCCLUSION` · `G-F4-CONTRAST-FLOOR` (harness only — the *pairs* are the surface units') · `G-F4-DERIVER`
- **Locks**: opens only after `.i` rules **D6** — build the ruled arm, never both. **Measure the `/equation` axe leg FIRST and report its verdict** before joining three more routes (`greenBeforeCure` #2 — an unread predicted-RED must not be buried under new routes). The **tsconfig leg of `G-F4-NO-UNUSED` is already green** (`greenBeforeCure` #1): this unit adds the **ESLint** rules and the **CI wiring** and claims no credit for `noUnusedLocals`. ⊘ **Nothing in `web/e2e/` may be edited in a way that splits F.W1's twelve-limb transaction** (`G-F4-ZERO-CONSOLE`, FR-EQR-3) and **F.W4 must not be credited for the pagination-drain cure (FR-GIG-5)**. No `test.skip`, no `continue-on-error`, no allowlist — each is a HIGH defect. The `G-F4-CONTRAST-FLOOR` harness must assert **both arms** and, per §4's cell, **all four `PV ★MF-10` stops (4.36 / 4.48 / 4.33 / 3.58), not the worst alone**. `G-F4-OCCLUSION` measures **`<main>`, not `documentElement`**, and adds the **VERTICAL-clip** assertion (HLG-20). One commit per gate family.
- **Brief**: Stand the chassis up. In order: (1) run the existing axe `/equation` leg and bank its verdict; (2) build D6's ruled arm and land the first four assertions as real executing tests; (3) add the ESLint config (`vue/require-v-for-key`, `no-duplicate-imports`) over `web/src` and wire it plus the vitest/vue-tsc steps into CI as **blocking** steps; (4) re-point the occlusion gate at `<main>` and add the vertical-clip assertion; (5) add one e2e spec that enters **admin mode** and runs axe over the banner + panels; (6) join `/paper`, `/morph`, `/demo/shape-extractor` to the axe keystone set; (7) build the contrast harness that re-derives the §4 named pairs in both arms; (8) build the deriver emitting all seven declared fields (native-loop count by directive with bounds+multiplicity, `:is` candidate sets, producer-internal loops from first-party d.ts, `url(#id)` edges, enclosing disclosure state, loop-source provenance). Bank each gate's AFTER reading double-run.

### Unit `.a` — the shell, the morph chain, and the global sheet

- **Model**: opus
- **Sections**: §2.F *the shell/morph chain* (`:120-126`, whole, incl. the `R-2a` FM-4..FM-16 band and `FR-AH-24 · L-14`) · §2.0 spine members landing here: **SP-6** (the ONE cascade decision, `:86`), **SP-10** (font truth, `:90`), **SP-19** (the silent-degradation asset chain, `:99`), plus SP-3/SP-4/SP-5/SP-7/SP-9/SP-11/SP-15's `FR-AH-*` · `DMT-*` · `FMD-*` · `FM-*` · `HLG-*` members · §2.K's `FSE-*` rows on `FourierShapeExtractor.vue` (`:188-193`) · §3 **D7** (HLG-35) and **D10**'s FR-AH-2 / FR-AH-16⊕FM-21 legs (`:353-369`) · §4 `G-F4-CENSUS-CELLS` (`:31`) · §5.1(3)'s `FR-AH-8`/`DMT M-1`, `HLG-41`-before-colour, `FMD-22`+`FR-AH-31`, `DMT N-2`, `FR-AH-23`-before-`DMT M-2`, `FM-3` memo+fixed-precision, `M-10` RNG rider (`:48`) · COHESION §0j.D **G-15(b)** and **G-15(c)** (FM-19 FROZEN-FOREVER)
- **Writable** (fourier): `web/src/App.vue` · `web/src/style.css` · `web/index.html` · `web/src/router/index.ts` · `web/src/components/layout/{AppHeader,DarkModeToggle}.vue` · `web/src/components/morph/{FourierMorphDemo,MorphShapePreview,MorphPhaseConfig,HarmonicLevelGrid,FourierShapeExtractor}.vue` · `web/src/components/decorative/FourierMorphSvg.vue` · `web/src/composables/{useMorphConfig,useFourierMorph}.ts` · `web/src/lib/svg-fourier.ts` · **the single locator line `web/e2e/paper-performance.spec.ts:328`** (DMT N-2's rider, this unit's commit); (value.js): `docs/tranches/X/fourier/F-W4-ADDENDA-a-2026-09-18.md`
- **Gates**: contributes to `G-F4-CONTRAST-FLOOR` · `G-F4-PRM-CLOCK` · `G-F4-CENSUS-CELLS` · `G-F4-DEAD-DEP` · `G-F4-VUE-TSC-CLEAN` (its two sites: `AppHeader.vue(49,7)`, and `labels.ts`/`VisualizationView.vue` are `.c`'s)
- **Locks**: **runs alone**; sole owner of `web/src/style.css` for this group and **must land SP-6's cascade decision as `@layer glass-overrides` appended AFTER `utilities`** — ⊘ **`@layer components` REVERSES the outcome (FR-AH-30) and is an adjudicated-dead shape (§6)**. ⊘ **FM-2 sequencing**: the de-sprung-lift ticket describes a lift that no longer exists post-uplift — it is **after F.W1 or dropped**, never re-derived. **Same-commit families that must not split**: `FMD-18⊕19` (top gutter + state-class order + tokenise `#60a5fa`); `FMD-22`'s PRM edit **WITH** `FR-AH-31`'s census-cell correction at `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1393` **path-qualified** (else the MAJOR regrade REOPENS); `DMT N-2`'s label **WITH** the e2e locator; `FR-AH-23`'s palette **BEFORE** `DMT M-2` and before the SUN/MOON re-route; `FR-AH-8`'s cancellation **WITH-OR-BEFORE** `DMT M-1`'s watcher; `HLG-41`'s two dead `:style` deletions **BEFORE/WITH** the `cssVarToHex` colour cure (the colour cure mints the trigger); `FM-3`'s memo **WITH** fixed-precision (or 667.6 KiB stays resident); `DMT N-15`'s `size===0` throw **WITH** `FM-23`'s **UNIFORM-LENGTH** assertion (not emptiness — that is the link emptiness misses); `M-10`'s **RNG-entanglement rider travels with EVERY `L-B1`/`L-B2` cure** (skipping innerPoly's discarded draws re-rolls the canonical sun). ⊘ **`FSE-L-B1` is DO-NOT-REGENERATE** and **`moon.json` is never regenerated** (`G-F4-NEG-ROSTER`); **FM-19 is FROZEN-FOREVER with a golden-file diff** (§0j.D G-15(c)) — HLG-44's `--minimal` regeneration stays **blocked** behind the provenance decision. `FM-20` (=FMD-1, the level-table lie in four places) is **lifted WHOLE with the record as provenance, never re-derived per component** (FM-2 precedent). ⊘ **`FR-AH-7` CURE-COMPLETENESS**: strike `:21-27` **AND** the `:29` barrel re-export, or the eager edge survives — that is also `FR-AH-24 · L-14`'s independent leg.
- **Brief**: Land the cascade, the font decision, the shell a11y/contrast/PRM cures and the asset chain. Order: (1) SP-6 — append `@layer glass-overrides` after `utilities` in `style.css` and retire the unlayered scoped clobbers (`FR-AH-11`+MISS-3 ⊕ `FMD-13` ⊕ `FMD-N3` ⊕ `FMD-27`) plus the shorthand-truncation and one-property-deletion members that live on these files; (2) SP-10 — rule the font identity once (wire `@import "@mkbabb/glass-ui/styles/fonts"` **or** commit to the CM identity) and sweep the family sink; (3) §0j.D G-15(b) — remove `html{font-size:1.125rem}` under 768px; (4) §2.F's `FR-AH-*` / `DMT-*` / `FMD-*` rows in their same-commit families; (5) the `FM-4..FM-16` band lifted whole, with `FM-14`'s split disposition **stated, not merged** (the F.W3 leg is cited, not booked); (6) SP-19's asset chain under the two DO-NOT-REGENERATE locks. Every census cell this unit falsifies gets its dated addendum-beside **in the same commit**. Book `D7`/`D10`'s posed legs as **posed**, never answered.

### Unit `.b` — the `/equation` route, whole (instrument + authoring surface)

- **Model**: opus
- **Sections**: §2.G *the `/equation` convergence instrument* (`:127-129`) · §2.H *the `/equation` authoring surface* (`:130-141`, whole, incl. the `R-2a` adoptions `fr-EquationView M-ZM` · `I-3` · `I-4` and `FR-EQR-18/-20/-22/-23/-28`) · §2.0 spine members landing here: **SP-18** (the KaTeX singleton, `:98`), plus SP-1/SP-2/SP-3/SP-4/SP-5/SP-7/SP-8/SP-11/SP-13/SP-16's `FR-CP-*` · `EV-*` · `FR-EQR-*` · `FR-CL-*` · `FR-CT-*` · `FR-NP-*` · `FR-EMT-*` · `EQP-*` · `FR-FG-*` members · §3 **D2** (fr-CP-R-7) and **D3** (FR-EQC-residue ⊕ -12 ⊕ -1) (`:353-369`) · §4 `G-F4-KATEX-QUIET` (`:34`), `G-F4-CONTRAST-FLOOR` (`:29`), `G-F4-PRM-CLOCK` (`:30`) · §5.1(3)'s `EV force`-memo-after-`M-CK`, `EV-C·D-02`+banner ONE edit, `FR-CL M-R2` tabindex WITH `D-2`, `FR-CP-LM1`'s `deep` drop in the SAME edit as the `old[1]` fix, `FR-CT-M1` collapse-then-move, **`FR-CP-LB3` measured BEFORE `G-F4-CONV-STUDY`** (`:48`) · §5.2's `→ F.W3` row (`:55`)
- **Writable** (fourier): `web/src/components/equation/**` (`EquationView.vue` · `EquationResult.vue` · `EquationModeToggle.vue` · `FunctionInput.vue` · `NotationPills.vue` · `ConvergencePlot.vue` · `FrequencyGraph.vue` · `EqCoefficientsPanel.vue` · `convergence/{ConvergenceLegend,ConvergenceTimeline}.vue` · `composables/{useCoeffHover,useCurveTransition,useEquationCache}.ts` · `lib/{harmonics,grid,hit-test}.ts`) · `web/src/components/visualization/{CoefficientsPanel,EquationPanel}.vue` *(named carve-out from `.c`: D2's `fr-CoefficientsPanel` and the `EQP-*` rows)* · the `snapshotForTransition` test file under `.g`'s ruled runner home; (value.js): `docs/tranches/X/fourier/F-W4-ADDENDA-b-2026-09-18.md`
- **Gates**: `G-F4-KATEX-QUIET` · contributes to `G-F4-CONTRAST-FLOOR` · `G-F4-PRM-CLOCK` · `G-F4-VITEST` (the `snapshotForTransition` rider) · `G-F4-VUE-TSC-CLEAN` (its four sites: `useCoeffHover.ts(22,5)`, `EquationView.vue(57,7)`, `FrequencyGraph.vue(2,43)`, and `BasisSelector.vue(11,7)` is `.c`'s) · `G-F4-CENSUS-CELLS` · `G-F4-DEAD-DEP`
- **Locks**: ⊘ **SP-18 is ONE `renderLatex()` home in `lib/equation/`** carrying `FR-EQR-4`/`-15`/`-16`/`-19` and `FR-CP-LM8`'s catch — **four-site patching is an `FR-EQR-17` escalation at wave-open**, so the singleton lands first or the unit escalates. ⊘ **`trust: true` is LOAD-BEARING** (`fr-EquationView I-3`): the cure is a trust **HANDLER whitelisting `\htmlClass` + the class set** — **never `trust:false`, never a naive handler** (both are §6 adjudicated-dead and *silently delete the feature the component exists to provide*). ⊘ **`FR-CP M-D1`: both prescribed PRM cures freeze at `t=0` — the reduced arm SEEDS THE TERMINAL FRAME.** ⊘ **`EV-B-1`'s `M-CK`**: `computeKey()` under-determines 4-of-7, so **both** prescribed cures reproduce B-1 one layer down — **normalize at ONE seam, then key**. ⊘ **`EV-B-2`'s `M-BR`**: the slider-side clamp is KILLED — clamp at the ref or the two request sites; the shared bound constant is **F.W5's**, cited not booked. ⊘ **`EV-C·D-02` and its banner are ONE edit** (the two defects gate each other's reachability). ⊘ **`FR-CP-LB3` must be memoised AND MEASURED before `.f` runs the convergence study**, or the study misattributes recomputation cost to Canvas2D. ⊘ `FR-CS-i1` / `CoefficientsSpectrum` / `FrequencyGraph`'s ramp homes are **F.W3's** (§5.2 twin seam (3)) — **cite, grow no leaf**. ⊘ **The `FR-IC-*` rows are DISCHARGED-BY-DELETION** (`greenBeforeCure` #3): state them id-for-id in the receipt with the deletion as provenance; do **not** re-create `InfoCard.vue`.
- **Brief**: Land the KaTeX singleton first (SP-18, with the trust **handler**), then the `/equation` epistemic-truth and budget cures (`EV-B-1` normalize-then-key · `EV-B-2` clamp at the ref/request sites · `EV-L·M-4`'s abortable backoff · `EV-C·D-02`+banner as ONE edit · `EV-D·D-B4`'s `loading` wiring), then SP-4's three ungated plot clocks under the terminal-frame law, then SP-3's contrast pairs (`FR-CP-D1` BLOCKER — theme-blind by enumeration, `golden` absent from the resolver, fails BOTH arms), then SP-1/SP-5/SP-7/SP-8's abort/focus/naming/live-region members, then the `FR-EQR-20/-22/-23/-28` hygiene sweeps as their declared single edits, then `FR-CP-LM1`'s `old[1]` fix + `deep` drop + the 6-line test **in ONE edit**, then `FR-CP-LB3`'s memoisation **with its measurement banked** for `.f`. Rule D2 and D3 per `.i`'s record; do not re-decide them.

### Unit `.c` — the `/visualize` + `/morph` authoring surfaces, the transport cluster and the two docks

- **Model**: opus
- **Sections**: §2.D *the transport cluster* (`:111-113`) · §2.E *the two docks* (`:114-119`, incl. the `R2-3c` named fold `fr-CanvasControlsDock L-18` → `BC-10 / C-9`) · §2.K *the `/visualize` + `/morph` authoring surfaces* (`:188-193`, incl. `CP-ROW-40`, the `| N | → CP-N` scheme, and the id-less roster row `fr-ContourPreview D:m-6`) · §2.0 spine members landing here: SP-1/SP-3/SP-4/SP-5/SP-6/SP-7/SP-9/SP-11/SP-13/SP-16/SP-19's `AC-*` · `CCD-*` · `ECD-*` · `SS-*` · `MPC-*` · `FV-*` · `IU-*` · `CP-*` · `VV-*` members · §3 **D8** (`ECD-D-2/L-3/C-1`) (`:353-369`) · §4 `G-F4-DERIVER`'s `SliderControl`/`CollapsibleSection`/`SvgFilters` witnesses (`:32`) · §5.1(3)'s **`ECD-B-2` ⊕ `CCD-M-2` INVERSION LOCK**, `MPC-31`'s one-cut, `FR-CT-M1`, `noUncheckedIndexedAccess` (`:48`) · §5.2's twin-seam rows (1) and (3) (`:56`) · §1's **EVALUATE-SCOPE** bullet (`:74`)
- **Writable** (fourier): `web/src/components/visualization/*.vue` **EXCEPT** `GalleryView.vue`, `CoefficientsPanel.vue`, `EquationPanel.vue` **and EXCEPT the two EVALUATE-ONLY files below** — i.e. `AnimationControls` · `BasisSelector` · `CanvasControlsDock` · `ContourPreview` · `ContourSettings` · `EasingCurvePreview` · `EasingPicker` · `EditorControlsDock` · `ExportModal` · `FullscreenViewer` · `GlassTimeline` · `ImageUpload` · `SpeedSelect` · `VisualizationView` · `web/src/components/visualization/{composables,lib}/**` (incl. `lib/canvas-drawing/{transforms,labels,epicycles}.ts`) · `web/src/components/ui/{CollapsibleSection,PathPreview,SliderControl}.vue` + `web/src/components/ui/tooltip/**` · `web/src/components/decorative/SvgFilters.vue` · `web/src/lib/contourEditing.ts` · the `contourBounds` test file under `.g`'s runner home; (value.js): `docs/tranches/X/fourier/F-W4-ADDENDA-c-2026-09-18.md`
- **Gates**: contributes to `G-F4-CONTRAST-FLOOR` · `G-F4-PRM-CLOCK` · `G-F4-DEAD-DEP` · `G-F4-VITEST` (the `contourBounds` rider) · `G-F4-DERIVER` (witnesses) · `G-F4-VUE-TSC-CLEAN` (its seven sites: `BasisSelector.vue(11,7)` · `ImageUpload.vue(2,15)` · `VisualizationView.vue(2,25)` · `labels.ts` ×4 · `contourEditing.ts(20,53)`) · `G-F4-CENSUS-CELLS`
- **Locks**: ⊘ **`BasisCanvas.vue` and `ContourEditorCanvas.vue` are EVALUATE-ONLY** (§1's last bullet: *"Access is **evaluate** — read, derive, and judge; the edit surface is unchanged"*). This unit **judges** their booked residue (§2.X.1, incl. the three `fr-ContourEditorCanvas` BLOCKERs the `/`-atomiser had hidden) and **ESCALATES** the cure surface by dated addendum-beside; it writes **neither file**, and it does **not** widen its own bounds (a write outside the writable set is an ESCALATION, per the seat law). ⊘ **`ECD-B-2` ⊕ `CCD-M-2` INVERSION LOCK**: cured **TOGETHER** or the consumer cure **manufactures** the BLOCKER; the naive focusable summary alone is §6 adjudicated-dead. ⊘ **`MPC-31` is ONE CUT** (`MPC-3⊕10⊕13⊕8⊕22`) and **spans F.W1+F.W4** — the F.W1 half is landed; the witness is at a **non-boot** state → SS-13. ⊘ **`AC-D-1` is ONE rename** `--dock-max-inline-size` + delete `:133-136`, fixing `AC-L-10/C-23` + `AC-D-21` in the same edit; **SW-1 amends CAP→FLOOR**; the dock scoped-block frame break is a **GLASS-RELAY** ask, never a frontend hack. ⊘ **`CP-ROW-40` is THE single cure** — extract `contourBounds(points, margin)` into `lib/contourEditing.ts` and rewire **three** callsites, closing rows 7, 17, 28-client and 33 in ONE move (`CP-33` is a named fold onto it, never a second edit). ⊘ **`CCD-D-4/L-1/C-3`** (Publish re-entrancy) — **do not author it as if the error channel worked**: `fr-VisualizationView L-26` is **F.W3's** and the server arm is **F.W5's**; cite both, book neither (§5.2 twin seam (1)). ⊘ `fr-CanvasControlsDock C-28` is **cited here, booked at F.W5**. ⊘ **`fr-BasisCanvas M-β1`'s ramp**: only `canvas-drawing/transforms.ts` is this wave's; three of the four homes are F.W3's, and **a unilateral edit at either end leaves the 213°-vs-262° divergence intact** — state the constraint, do not half-land it. ⊘ **`GM-19` is never certified**; ⊘ the **CP KILL-6 migration is never executed** (`G-F4-NEG-ROSTER`). ⊘ The **Tooltip shim is NEVER deleted** (§2.L); SP-7's leg is *re-point the import AND mint a naming leg* — **a description is never a name**.
- **Brief**: Land the dock/transport/authoring cures in their declared families. Order: (1) the two INVERSION-LOCK pairs (`ECD-B-2`⊕`CCD-M-2`; `MPC-31`'s one cut) — nothing else may precede them; (2) `CP-ROW-40`'s single extraction + three rewires + its `contourBounds` test; (3) SP-4's ungated clocks on this surface (`AC-D-8/C-19`'s auto-starting 60fps clock, the `.mini-fill` retargeted transition deletion, the two 60Hz readouts) under the terminal-frame law; (4) SP-9's literal-geometry deletions **on the 8.0.0 arm** (`SS-D-01/SS-L-04`'s `size` props are dead at 8.0.0 — **delete the widths**; `MPC-32`'s 22.5px bare track; `CCD-D-5/L-7/C-7`⊕`ECD-D-10/L-4`'s two icon-size idioms, 14 of 15 `:size` inert); (5) SP-7's naming leg on all twelve ECD channels and CCD's six attributes; (6) SP-6's remaining scoped-cascade and dead-CSS deletions (`FV-8` — press **COMPOUNDS** the token; `FV-22`'s one name/two owners; the VV five-declaration dead-CSS census); (7) D8's ruled arm (delete whole **or** realize the intent in pure CSS — ⊘ never half-land); (8) the EVALUATE-ONLY judgement + escalation for the two canvases. Every falsified census cell gets its addendum-beside in the same commit.

### Unit `.d` — the `/gallery` route and the three admin panels

- **Model**: opus
- **Sections**: §2.A *fr-AdminAuditLog* (`:102-104`) · §2.B *fr-AdminFlaggedPanel* (`:105-107`) · §2.C *fr-AdminUserList* (`:108-110`) · §2.J *the `/gallery` route* (`:167-187`, whole, incl. the `R-2a/R-2c` GCM adoptions, the **ten** `§X.1` dual-route handovers `GCM-6/-12/-28/-30/-31/-35/-36/-37/-38/-48`, the named-fold kill/dedup cycle, and `FR-USB-18`) · §2.0 spine members landing here: **SP-17** (the dead scoped-style sweep — *exactly 4 files, all `gallery/`*, `:97`), plus SP-1/-2/-3/-5/-7/-8/-9/-11/-12/-14/-15's `AA-*` · `FR-AFP-*` · `FR-AUL-*` · `GAB-*` · `GM-*` · `GCM-*` · `FR-GFC-*` · `FR-GIG-*` · `FR-GSB-*` · `FR-USB-*` members · §3 **D1** (the marquee DELETE-OR-REVIVE) (`:353-369`) · §4 `G-F4-ADMIN-AXE` (`:24`), `G-F4-CONTRAST-FLOOR` (`:29`), `G-F4-DEAD-DEP` (`:36`) · §5.2's `→ F.W5–W8` and `→ GLASS-RELAY` rows (`:57`, `:60`)
- **Writable** (fourier): `web/src/components/visualization/gallery/**` (`AdminAuditLog` · `AdminFlaggedPanel` · `AdminUserList` · `GalleryAdminBanner` · `GalleryCard` · `GalleryCardModal` · `GalleryDraftsSection` · `GalleryFeaturedCarousel` · `GalleryInfiniteGrid` · `GalleryMarquee` · `GallerySearchBar` · `UserSlugBar`) · `web/src/components/visualization/GalleryView.vue` · `web/src/stores/gallery.ts` · `web/src/composables/useOffsetPagination.ts`; (value.js): `docs/tranches/X/fourier/F-W4-ADDENDA-d-2026-09-18.md`
- **Gates**: contributes to `G-F4-ADMIN-AXE` (the surface the spec `.g` writes must pass over) · `G-F4-CONTRAST-FLOOR` · `G-F4-DEAD-DEP` (SP-17's four files + `FR-GFC-22`'s two dead imports) · `G-F4-VUE-TSC-CLEAN` (its two sites: `GalleryCard.vue(9,1)` `VIZ_COLORS`, `(10,1)` `PathPreview`) · `G-F4-CENSUS-CELLS`
- **Locks**: **D1 governs the whole GalleryMarquee family** — every `GM-*` row is that decision's cure list, **none independently schedulable**; execute `.i`'s ruled arm and no other. ⊘ **`AA-8` BEFORE `AA-1`; `AA-1` + `AA-7` = ONE generation-token cure** (⊘ `useToast` first **or** an inline banner, never both). ⊘ **`AA-4` is the `cartoon-card` cure, NOT `border-border`**; **`AA-20` dies with `AA-3`**. ⊘ **`FR-AUL-4` must preserve `performPrune`'s `loadPage(1)`** (S-7); ⊘ **`FR-AUL-22` is booked SEPARATELY — the `FR-AUL-1` watch-cure does not close it.** ⊘ **`FR-AFP-17` maps success→`"success"` NOW at the pin — deferring it to F.W1 is a scheduling error.** ⊘ **`FR-AFP-15` ⇢ `FR-AFP-56`**: the splice model and the natural key `(content_hash, reporter_slug)` land in the **SAME** change. ⊘ **`GAB-3` is an inline error arm, NOT a toast**, and the store stops swallowing; `GAB-10` rides `GAB-4`'s `aria-busy`; the coverage half is **F.W9/W10's**. ⊘ The **GCM kill/dedup cycle is ONE block**: `GCM-48` deletes and **kills** `GCM-30`, which **kills** `GCM-28` — no seat executes them separately. ⊘ **`GCM-31`'s producer leg (teach `cn` its own aliases) is a GLASS-RELAY ask**, never a site hack; ⊘ `GCM-38` is a **design decision this wave POSES, not answers**. ⊘ **`GAB-25`'s vehicle is F.W3's** (§5.2 twin seam (2)): if the `FR-COB-18` glyph-register sweep does not run, the site cure is a standalone one-token edit at this end — **say so, do not wait**. ⊘ **F.W4 must not be credited for the pagination-drain cure (`FR-GIG-5`)**. ⊘ `AA-5`/`AA-6`/`AA-10`'s taxonomy, `FR-AUL-21`'s closed domain, `FR-AUL-25`'s prune count, `GAB-15`'s storage-tile bias and `GCM-1`'s fork provenance are **F.W5–W8's** — book the display/template riders only, cite the contracts.
- **Brief**: Land the admin trio and the gallery route. Order: (1) D1's ruled arm for the marquee family, whole; (2) SP-2's error-state≠empty-state cures across `AA-1`+`AA-7`, `AA-33`, `FR-AFP-6`+`-67`, `FR-AUL-2`, `FR-AUL-4`, `GAB-3` — with `AA-8` first; (3) SP-1's abort-identity members (`AA-18`+`AA-27`'s cursor-key growth, `FR-AFP-12`/`-14`+`-48`, `FR-AUL-15`/`-29`/`-32`, `GAB-20`'s self-aborting request, `GAB-21`, `FR-USB-7`/`-8`/`-27`); (4) SP-3's contrast cures (`GAB-1` BLOCKER 1.03/1.06/1.45/2.58 + `GAB-18`'s amber bypass; `AA-3`'s Badge adoption; `FR-AUL-7`/`-23`; `FR-USB-5`'s ONE credential-field rework with `-12/-13/-14/-33`); (5) SP-7/SP-8's naming + live-region cohort (`FR-AUL-9` discharges both halves; `FR-AUL-26`+`FR-AH-12(+18)`+`GAB-24`'s 2.5.3 cohort; `FR-AUL-33`/`-34`/`-36`/`-41`/`-48`); (6) the ten `GCM-*` handovers and the GCM restore family, as the declared blocks; (7) SP-17's four-file dead-stylesheet sweep and `FR-GFC-22`'s two dead imports with zero-consumer proofs; (8) SP-14's mobile input hygiene (`AA-21` head, `FR-AUL-40`, `FR-GSB-11f`, `FR-USB-14`). GLASS-RELAY asks are collected for `.z`'s letter, never landed locally.

### Unit `.e` — the `/paper` route

- **Model**: opus
- **Sections**: §2.I *the `/paper` route* (`:142-166`, whole, incl. the `R-2a` adoptions — the twelve `PAW-*` rows, the four `§X.1` handovers `PAW-6/-18/-26/-29`, the three `⟨annex⟩` rows, and the `PV ★MF-*` finds) · §2.0 spine members landing here: SP-1/-3/-4/-5/-6/-7/-9/-10/-11/-13/-14's `PSM-*` · `PS-*` · `PV-*` · `PAW-*` · `CP-25` members · §3 **D4** (PAW-44/LAW-3), **D5** (PAW-52/LAW-5), **D9** (PS-L-4, **RULED** at COHESION §0o ESC-2) (`:353-369`) · §4 `G-F4-CONTRAST-FLOOR` (`:29`), `G-F4-DERIVER`'s PaperSidebar/PAW-36 witnesses (`:32`), `G-F4-DEAD-DEP` (`:36`) · §5.1(3)'s **LAW-3/LAW-4/LAW-5**, the `PSM-1` colocation riders, `PS-M2` RELAY-BEFORE-RENAME (`:48-49`) · §5.2's `→ LATEX-PAPER relay` row (`:61`)
- **Writable** (fourier): `web/src/components/paper/**` (`PaperView.vue` · `PaperArticleWindow.vue` · `PaperSidebar.vue` · `PaperSearch.vue` · `MobileFloatingToc.vue` · `paperTree.ts` · `useScrollNavigation.ts` · `search/{PaperSearchInput,PaperSearchDropdown,PaperSearchModal}.vue` · `search/{index,paperSearchIndex,searchHelpers,usePaperSearch}.ts`) · `web/src/lib/paperContent.ts` · `web/src/lib/figureDimensions.ts` · the `resolveFigure` / `fuzzyMatch` test files under `.g`'s runner home; (value.js): `docs/tranches/X/fourier/F-W4-ADDENDA-e-2026-09-18.md`
- **Gates**: contributes to `G-F4-CONTRAST-FLOOR` (`PS D-B2` 2.39/3.00 · `PV D/M-8` 2.88 · **`PV ★MF-10`'s four stops 4.36/4.48/4.33/3.58, all four asserted**) · `G-F4-PRM-CLOCK` (both `scrollTo` sites) · `G-F4-DEAD-DEP` (`search/index.ts`) · `G-F4-VITEST` (`resolveFigure` + `fuzzyMatch` riders) · `G-F4-VUE-TSC-CLEAN` (its two sites: `PaperView.vue(20,1)` · `usePaperSearch.ts(10,10)`) · `G-F4-CENSUS-CELLS` (`lane-frontend.md:617`)
- **Locks**: **D9 is RULED** (COHESION §0o **ESC-2**): ONE `useSidebarFollow` instance owned by the paper view (the highest common ancestor), provided through a **typed `InjectionKey`**; the second instance and the untyped `defineExpose` seam retire; **`L-5(a)` is its prerequisite**; this unit **executes the collapse** (delete the `paperTree.ts` adapter + the losing index) and releases `fr-PaperSidebar L-4` · `M6`. ⊘ **LAW-3 is a sequencing LAW, not a preference**: `PAW-44`'s scrollport restoration lands **WITH-OR-AFTER** `PAW-1`'s header-background cure + `PAW-30`'s bleed handling, **NEVER before** — restoring the scrollport first makes `K-18`'s killed see-through-header catastrophe **REAL**. ⊘ **LAW-4**: one clearance authority, its constant **dependent** on D4's outcome. ⊘ **LAW-5**: any deep-link cure routes through `ensureTargetWindow`, under LAW-4, and **REQUIRES `PAW-38`'s slug uniquification FIRST** — which is a **LATEX-PAPER relay** ask, so D5's arm may be *posed and blocked*, and saying so is the cure. ⊘ **`PSM-1` is ONE repair with THREE same-commit riders** — `PSM-13` (**the repair arms the defect**), `PSM-4`, `PSM-12` — **none schedulable apart from the colocation commit**. ⊘ **`PSM-2` ⊕ `PSM-6` ⊕ `PSM-3`**: ONE modal owner at PaperView altitude. ⊘ **`PS-M2` RELAY-BEFORE-RENAME**: no rename/restyle of `.sidebar-top-btn` until the latex-paper data-attribute hook lands. ⊘ **`PAW-4` is F.W3's** (§5.2 twin seam (4), canonical-confirmed) — **cite, grow no leaf**; `PAW-6`/`-18`/`-26`/`-29` are **this unit's**. ⊘ **`PAW-26`'s K-12 is load-bearing: the TYPE is not dead code.** ⊘ **`PAW-29` rides the `PAW-12` generator** — never a hand-authored `srcset` at the consumer. ⊘ `PAW-45`/`-46` (KaTeX memo pair) are **cap, don't delete** and route to the LATEX-PAPER relay; `PAW-28`/`-32`/`-38`/`-39`/`-54` likewise. ⊘ **`PAW-15`'s AT-behaviour residue → SS-13**, never resolved inline.
- **Brief**: Execute in law order. (1) `L-5(a)`, then **D9's ruled collapse** — one typed-`InjectionKey`-provided `useSidebarFollow` owned by `PaperView`, adapter and losing index deleted, `defineExpose` seam retired; (2) `PAW-1`'s header-background cure + `PAW-30`'s bleed handling, **then** D4's ruled arm for `PAW-44` (retire or restore) under LAW-3/LAW-4, with `PAW-47`'s clearance constant and `PAW-54`'s x-axis posture following as dependents; (3) `PSM-1`'s colocation repair with its three riders in ONE commit, then `PSM-2⊕6⊕3`'s single modal owner; (4) SP-4's two ungated `scrollTo` sites + `CP-25`'s un-PRM-guarded `scrollIntoView` on an uncancelled timer, with the `lane-frontend.md:617` census correction as a dated addendum-beside **in the same commit**; (5) SP-3's contrast cures incl. all four `PV ★MF-10` stops; (6) SP-7/SP-9's naming and geometry (`PAW-21`'s ℱ name pollution, `PV ★MF-4`'s display glyph, `PV ★MF-5`'s iOS auto-zoom + the missing `.ios` class); (7) the `PAW-9`/`-13`/`-14`/`-19`/`-23`/`-24`/`-55`/`-57` row set and `PAW-7`/`-11`/`-15`'s annex arms; (8) `search/index.ts`'s zero-consumer proof and deletion; (9) `resolveFigure` + `fuzzyMatch` tests. D5's deep-link arm is posed with its blocking prerequisite named; the LATEX-PAPER asks are collected for `.z`'s relay letter.

### Unit `.f` — shared lib/stores, the SCRUB ledger, the global-sheet residue, and the convergence study

- **Model**: opus
- **Sections**: §2.L *Charter items not exhausted above* (`:194-199`) — **CONV-STUDY**, **PRM-CLOCK** (the cross-surface closure), **SCRUB** · §2.0 spine members that are lane carries rather than component charges: **SP-12** (idiom rows, `:92`), **SP-2**'s `fr-App MG-λ` (`useToast.ts`, `:82`), **SP-13**'s shared-seam members (`:93`), **SP-16**'s store-side `shallowRef` members (`:96`) · §4 `G-F4-CONV-STUDY` (`:37`), `G-F4-DEAD-DEP` (`:36`), `G-F4-PRM-CLOCK` (`:30`), `G-F4-VUE-TSC-CLEAN` (`:27`) · §5.2's `→ F.W5–W8` and `→ SS-13` rows (`:57`, `:59`)
- **Writable** (fourier): `web/src/stores/{workspace,animation,auth}.ts` · `web/src/lib/{api,api-problem,colors,easings,scheduler,defaults,types,bases,draftStorage,evaluators}.ts` · `web/src/composables/{useToast,useSafeStorage}.ts` · **`web/src/style.css` (the collected cross-route residue pass — this unit's second and final ownership window)**; (value.js): `docs/tranches/X/fourier/F-W4-CONV-STUDY.md` (new) · `docs/tranches/X/fourier/F-W4-SCRUB-LEDGER.md` (new) · `docs/tranches/X/fourier/F-W4-ADDENDA-f-2026-09-18.md`
- **Gates**: `G-F4-CONV-STUDY` · `G-F4-DEAD-DEP` (the ledger of zero-consumer proofs + the bundle diff) · `G-F4-PRM-CLOCK` (closure over all five ungated clock owners) · `G-F4-VUE-TSC-CLEAN` (its one site: `api.ts(5,5)` TS6196) · `G-F4-CENSUS-CELLS` (`lane-frontend.md:558-559`/`:624`, the LOW-BY-ONE clock count — repo total **4**)
- **Locks**: ⊘ **`G-F4-CONV-STUDY` runs ONLY AFTER `FR-CP-LB3`'s memoisation is landed AND MEASURED by `.b`** — else Canvas2D takes the blame for recomputation cost; its cost baseline also carries EV's gBCR items (MEASURE-BEFORE). ⊘ **Every deletion in the SCRUB carries a zero-consumer proof in the ledger; no dependency is removed while still imported; the bundle diff is recorded** (`G-F4-DEAD-DEP`). ⊘ **Deletions respect the negative roster**: `I-2`'s empty state survives; `CanvasOverlayButton` is already gone and is **not** re-created; the **Tooltip shim is NEVER deleted**. ⊘ **`fr-App MG-λ`**: honour `options.duration` **or delete the parameter** — never the half-landing that leaves a typed knob inert; the `ToastVariant` limb is **F.W1's fold, cited, never re-booked**. ⊘ **SP-12's `resetMs` polarity as filed is INVERTED**: **`UserSlugBar` is the deviant, not `EquationResult`**; 2000 is producer-sanctioned. ⊘ `SS-L-07/SS-C-10`'s `lib/speeds.ts` literal-union catalog is *the single highest-leverage change* and **its type reaches F.W5's wire rows** — book the client half, cite the wire. ⊘ **`VV-R2-B`'s ten dead workspace-store exports are adoption-or-deletion decided WITH the `GCM-1` repair unit** — coordinate with `.d`'s receipt, never delete unilaterally. ⊘ The study's adoption decisions route to **SS-3/SS-4**, not this wave.
- **Brief**: (1) Land SP-12's three idiom sweeps — the `getAdminToken()!` 11-site type-lie, the `catch (e:any)`/RFC-7807 discard via a typed catch helper at the seam, the `resetMs` normalize-UP sweep at its true deviant; (2) SP-13's restore/rehydration validation seam (`AC-L-11`+`M-10`, the `speeds.ts` catalog, `EV C·D-04`'s unvalidated `JSON.parse`, `DMT N-14`'s typed loader over `as any`); (3) SP-16's store-side `shallowRef` members; (4) `MG-λ`'s toast decision; (5) the SCRUB, every deletion with its zero-consumer proof written into `F-W4-SCRUB-LEDGER.md` and the bundle diff recorded, negative roster respected; (6) the collected `style.css` residue pass declared by `.a`–`.e`; (7) `G-F4-PRM-CLOCK` closure — re-measure all eight rAF owners and show each consults PRM with a converged/static-truthful reduced frame, banking the repo-total-4 clock census correction as a dated addendum-beside in the same commit; (8) **after** `.b`'s memoisation measurement, run the BasisCanvas↔FourierField convergence study and write `F-W4-CONV-STUDY.md` as a **measured** memo stating which renderer owns which regime, with adoption routed to SS-3/SS-4.

### Unit `.z` — closure, correspondence and the two-direction census

- **Model**: opus
- **Sections**: §4 **`G-F4-CARRY-CLOSURE`** (`:22`, both legs, with leg (b)'s four-step order, the record-qualification axis, the boundary-exact ERE predicate **and its fixture result and engine banner printed beside the set-difference**) · **`G-F4-ANCHORS`** (`:35`) · **`G-F4-CENSUS-CELLS`** (`:31`, verification of the set) · **`G-F4-NEG-ROSTER`** (`:38`) · **`G-F4-VUE-TSC-CLEAN`** (`:27`, the final green) · **`G-F4-ZERO-CONSOLE`** (`:33`) · §2.X / §2.X.1 / §2.X.2 (`:200-352`, the twin law, the received hand-off, the canonical roster and its register) · §5.2 (`:405-417`, every cross-edge and relay row) · §6 (`:418-438`) · §Y (`:439-470`)
- **Writable** (value.js): `docs/tranches/X/fourier/F-W4-CLOSURE.md` (new — the two-direction closure transcript) · `docs/tranches/X/coordination/value-to-glassui-2026-09-DD-fw4-relay.md` (new, the ONE GLASS-RELAY letter) · `docs/tranches/X/coordination/value-to-latexpaper-2026-09-DD-fw4-relay.md` (new) · `docs/tranches/V/coordination/INBOX.md` (rows + close sweep) · `docs/tranches/X/execution/C/F-W4.md` (this record) · `docs/tranches/X/execution/LEDGER.md` (the F.W4 row + event log) · `docs/tranches/X/fourier/F-W4-ADDENDA-z-2026-09-18.md`
- **Gates**: `G-F4-CARRY-CLOSURE` (a) + (b) · `G-F4-ANCHORS` · `G-F4-CENSUS-CELLS` (set verification) · `G-F4-NEG-ROSTER` · `G-F4-VUE-TSC-CLEAN` · `G-F4-ZERO-CONSOLE`
- **Locks**: ⊘ **leg (b) is the binding direction** and its operand is `CENSUS-CANONICAL.md` **§2 → `F.W4` = 1007 rows across 54 records** at digest `f44362757458` — **never a check file, never a prior pass's enumeration, never this spec's own arithmetic** (R4-3). ⊘ **The gate does not re-cut an atomiser**: apply steps (i)–(iv) as written — canonical roster → shorthand-aware expansion of dotted/elided bookings and the three declared local schemes → **record-qualification** → diff; step (iii)'s add-back operand is **`§X.1-v4` ALONE** (which is why `PAW-4` is cited at F.W3 and the fourteen `GCM-*`/`PAW-*` survive). ⊘ **Predicate of record is the ERE `(^|[^A-Za-z0-9-])ID([^A-Za-z0-9-]|$)`** — `grep -P` **does not exist** on the pinned `/usr/bin/grep` (BSD 2.6.0-FreeBSD, exits 2); **print the fixture result AND the engine banner beside the set-difference or the green is unread**. ⊘ **`/` is NOT an atomiser** (canonical §0.1) — `D/B-3` is ONE id. ⊘ Ordering `UTF8_BYTEWISE_CODEPOINT`. ⊘ **CS-i-7's tally law**: naive summing triple-counts; book from the deduplicated ledger only. ⊘ **`F-W4.md`, the carries, the registry, the canonical and every prior conformance artefact are IMMUTABLE (E-3)** — this unit writes addenda-beside, never in place. ⊘ **ONE glass-ui BH relay letter** carrying every `GLASS-RELAY` ask collected by `.a`–`.f` (the standing formation invariant; glass-ui is READ-ONLY — producer rows ride mail, never frontend hacks). ⊘ **No wave closes with UNREAD mail in scope** (E13). ⊘ Every SS-13 flag is **carried as deferred**, never resolved inline.
- **Brief**: Close the wave honestly. (1) Run `G-F4-CARRY-CLOSURE` leg (a) over the 438 carry row-heads and leg (b) over the canonical 1007/54 with the four-step order, printing the predicate fixture and engine banner; publish the transcript (not a sentence) in `F-W4-CLOSURE.md`, with every escape booked, cited-at-a-named-holder, or excluded-with-reason **id-for-id**. (2) Run `G-F4-ANCHORS` — re-resolve every line anchor cited by a landed repair against `origin/master` **against F.W0's G-11 table**, strike the unresolvable, and contribute this wave's kills to that table, the §1 `views/` kill included (gate 14 above). (3) Verify the `G-F4-CENSUS-CELLS` set: each falsified cell has a dated addendum-beside **in its cure's own commit**. (4) Verify `G-F4-NEG-ROSTER`: no leaf grown on §0a, GM-19 uncertified, KILL-6 unexecuted, `moon.json` unregenerated. (5) Re-run `npx vue-tsc -b` double and publish the delta from the 18-diagnostic baseline. (6) Run the four zero-console e2e gates and publish their colour — this is the one gate this record left UNMEASURED at open, and it must not close that way. (7) Send the ONE GLASS-RELAY letter and the LATEX-PAPER letter, row them in `INBOX.md`, sweep the four paths a final time. (8) Write the honest-RED close: each still-RED gate named with its relief cited by name, each deferred row with its holder, each SS-13 flag with its packet id. (9) Set the ledger row and append the event-log line.

---

## Unit receipts

*(empty at open — each unit appends its own receipt here, line 1 of any file it creates being `SERVED MODEL: <its model id>`)*

### `.i` — the decisions record

**Seat**: `.i`, `claude-opus-5[1m]`, 2026-09-18. **Status: DONE.** **Gate turned: `G-F4-DECISIONS` — RED → GREEN.**
**Commit**: `aacf5f28` (one commit, one path). **Writable set honoured exactly**: `docs/tranches/X/fourier/DECISIONS-F.W4.md` (new) ⊕ this receipt. **⊘ No fourier byte written** — every fourier-side reading below is a read.

#### Act 0 — CRASH-RECOVERY sweep (standing law): nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅** (clean, both runs).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 12 modified ⊕ 3 untracked, **none inside this unit's writable set**: the ten `demo/**` SFCs and `docs/tranches/V/reformation/CARRY-LEDGER.md` are sibling seats'; `scripts/dev/dev.sh` is the unowned standing-dirty path (**NEVER touched, never staged**); `docs/tranches/X/waves/evidence/` and the two `e2e/smoke/**a11y-control-targets.spec.ts` are Track A's.
⟨cmd⟩ `ls docs/tranches/X/fourier/DECISIONS-F.W4.md` → **ABSENT** before this seat wrote it. **Zero inherited paths; no killed predecessor's partial work on this unit.**

#### Act 1 — anchors verified at the true bytes BEFORE any write (the unit's own sections)

All §2/§3/§6 coordinates in the dispatch resolve **exactly**: ⟨cmd⟩ `sed -n '353p;168p;114p;142p;127p;120p;198p;418p' F-W4.md` → `## §3 Decisions this wave authors…` · `⊘ FR-GFC-9 / GM-F1 — **THE DELETE-OR-REVIVE RULING (= §3 D1)…` · `### §2.E · the two docks…` · `### §2.I · the /paper route` · `### §2.G · the /equation convergence instrument` · `### §2.F · the shell/morph chain…` · `- **VITEST-FLOOR · the DECISION (= §3 D6)**…` · `## §6 Excluded…`.

**⊘ ONE ANCHOR CLASS DRIFTED, and it is recorded rather than silently re-pointed.** The §4/§5 coordinates in the dispatch (`G-F4-DECISIONS (:39)` · `§5.1(3) riders (:48)` · `§5.2 →NO-WAVE-OWNER (:62)`) are **§3-relative offsets (base 352), not absolute**. Taken as absolute they land on a table separator, a §0a negative-roster row and a bare `---`: ⟨cmd⟩ `sed -n '39p;48p;62p' F-W4.md` → `|---|---|---|` · `| SvgFilters | 16 native / 0 callsites…` · `---`. Resolved: ⟨cmd⟩ `sed -n '391p;400p;414p' F-W4.md` (double-run, identical) → `| **G-F4-DECISIONS** | \`DECISIONS-F.W4.md\` carries D1..D10, each RULED…` · `3. **Repair-arms-a-defect same-commit riders** (the sharpest class): P…` · `- **→ NO-WAVE-OWNER / SS-3/SS-4 spec authoring** (consumed, not settle…`. **INTENT taken at the true bytes 391 / 400 / 414**, and the class is banked at the decisions record §6.1 so `.g`–`.z` do not each re-discover it. ⊘ Every §4/§5 gate coordinate in the unit plan reads the same way; this is a reading rule, not a defect in the plan.

#### Act 2 — the born-RED reading (double-run, before the write)

| probe | reading (both runs) |
|---|---|
| ⟨cmd⟩ `ls docs/tranches/X/fourier/DECISIONS-F.W4.md` | **ABSENT** |
| ⟨cmd⟩ `grep -c '^### \.' docs/tranches/X/execution/C/F-W4.md` | **0** — no dependent cluster has opened |
| ⟨cmd⟩ `git -C ../fourier-analysis status --porcelain \| wc -l` | **0** |

`G-F4-DECISIONS`'s witness reproduces as written, **with one limb already relieved and the relief cited, not claimed**: the cell reads *"D9 is OWNER-GATED and unauthorable unruled"*, which was true at authoring and is **false today** — COHESION **§0o ESC-2** ruled it 2026-09-18. Recorded as a witness-moved disclosure in the same spirit as seat-0's gate 6.

#### Act 3 — evidence gathered for the rulings (all read-only, all double-run)

**D6's substrate and its four assertions, located at the bytes** — this is what decided the branch, and it is measurement, not preference:

⟨cmd⟩ (from `fourier-analysis/web`) `grep -nA8 '"scripts"' package.json` → exactly `dev` · `build` (`vue-tsc -b && vite build`) · `preview` · `test:e2e` · `test:e2e:ui`.
⟨cmd⟩ `grep -nE '"vite"|vitest|jsdom|happy-dom|"@vue/test-utils"' package.json` → **`"vite": "^7.3.6"` and nothing else**; ⟨cmd⟩ `ls node_modules/vitest` → absent; ⟨cmd⟩ `grep -m1 '"version"' node_modules/vite/package.json` → `7.3.6`. Repo-root `package.json` carries `@playwright/test` alone.
⟨cmd⟩ `grep -rn 'snapshotForTransition' src` → **defined `components/equation/composables/useCurveTransition.ts:57`** (already importable pure TS).
⟨cmd⟩ `grep -rn 'fuzzyMatch' src/components/paper/search/` → **defined `paperSearchIndex.ts:70`**, re-exported by **`search/index.ts:2`**.
⟨cmd⟩ `grep -n 'resolveFigure' src/components/paper/PaperArticleWindow.vue` → `:44 function resolveFigure(filename: string)` — SFC-local, unimportable, exactly as PAW-50 states.
⟨cmd⟩ `grep -rln 'contourBounds' src` → **∅** — the function does not exist until `CP-ROW-40`'s extraction mints it.

⊘ **A lock this unit minted from that measurement, because nothing else would have caught it**: `fuzzyMatch`'s assertion must import from **`./paperSearchIndex`**, never from **`search/index.ts`** — the barrel is the **zero-consumer file the SCRUB deletes** (`G-F4-DEAD-DEP`; §2.L *"PSM's zero-consumer `search/index.ts`"*; `.e` step 8). A test importing the barrel **manufactures a consumer and falsifies `.e`'s zero-consumer proof** — a green gate bought by reddening another. Banked at the decisions record D6 and in `.g`'s and `.e`'s path.

**D8's premise re-measured at the LIVE pin, because the record states it at 4.0.0 and F.W1 moved the tree to 8.0.0:**

⟨cmd⟩ `grep -m1 '"version"' node_modules/@mkbabb/glass-ui/package.json` → `"version":"8.0.0"`.
⟨cmd⟩ `grep -roh -- '--slider-scrub[a-z-]*' node_modules/@mkbabb/glass-ui/dist | sort -u` → **∅** (both runs) · ⟨cmd⟩ `grep -roh -- '--slider-[a-z0-9-]*' … | sort -u | wc -l` → **6** (the 4.0.0 census read ten, zero `scrub`). **The premise HOLDS at 8.0.0 and is stronger there** — the retint block is dead at both pins, so its deadness is not an artefact of the version the census ran on.
⟨cmd⟩ `grep -n -- '--slider-scrub\|magnet-slider-track\|glass-scrubber\|VIZ_COLORS' src/components/visualization/EditorControlsDock.vue` → `:8` import edge · `:48`/`:221` the two stale `glass-scrubber` comments · `:121` class · `:122` `:style` binding · `:222-228` rule (`:229` = `</style>`).
⊘ **A sub-limb disclosed rather than smoothed**: K-8's *"`w-full` is in the slider's cva base, seat byte-verified"* was taken at 4.0.0. ⟨cmd⟩ `grep -c 'w-full' node_modules/@mkbabb/glass-ui/dist/slider-gsc8jDIo.js` → **0** (both runs) — the record's own probe does not reproduce at 8.0.0's dist layout. **This does not falsify K-8 and the verdict does not move** (the block is dead on the namespace measurement alone), but **`.c` re-earns the "zero visual delta today" claim at 8.0.0 before deleting `width: 100%`**, rather than inheriting it. Chased no further at this seat — probe parsimony; the cure site is `.c`'s.
⟨cmd⟩ `grep -rl -- '--slider-scrub' src` → **seven files** (`ConvergenceTimeline` · `HarmonicLevelGrid` · `MorphPhaseConfig` · `SliderControl` · `BasisSelector` · `EditorControlsDock` · `GlassTimeline`) — banked as **D8's scope boundary**: the verdict rules the ECD unit only, and the other six keep their own rows and their own `C-1⊕C-2` coupling.

**Dissents pulled from their own records for verbatim preservation**: ⟨cmd⟩ `grep -n 'GM-F1' fr-GalleryMarquee.md` → `:29` (*"MAJOR banked; **D/C BLOCKER dissents preserved**"*) and `:159` (*"BLOCKER dissents preserved again"*) — **both recordings carried**; ⟨cmd⟩ `grep -n 'minority position' fr-CoefficientsPanel.md` → `:130` (the D-axis LOG minority, *"preserved so the F.W4 spec inherits the argument, not just the disposition"*) — carried in full, not summarised; D4's design dissent carried in §3's own sentence; `FSE-L-B1`'s *"reader-1's BLOCKER preserved in DISSENT"* carried at D10.5.

#### Act 4 — the landing

`DECISIONS-F.W4.md` authored: §0 reading law · §1 verdict table · §2 D1..D10 (each: §3's bytes quoted, mechanism at the corpus by ⟨cmd⟩, **cost of EACH branch**, verdict, dependent cluster, dissents) · §3 what is NOT decided (with holders) · §4 the gate reading · §5 the fifteen double-run measurements · §6 the anchor notes.

**The verdicts**: **D1 RULED DELETE** (§3's own stated default, adopted on GM-24's static proof) · **D2(a) RULED DELETE / D2(b) DEFERRED-WITH-DEFAULT** (keep the shipped linear arm, wire no control; the touch constraint binds under both arms and is *not* deferred) · **D3 RULED RE-WORD, not fill** (and the record states why the routed half and the ruled half are different questions) · **D4 DEFERRED-WITH-DEFAULT** (neither restore nor retire; PAW-47's constant authored once against the inert geometry under LAW-4) · **D5 DEFERRED-WITH-DEFAULT** (posed and blocked; PAW-38 named and relayed) · **D6 RULED — vitest runner in `web/`** · **D7 DEFERRED-WITH-DEFAULT** (posed to SS-3/SS-4; **no rename**, which §3 forecloses in terms) · **D8 RULED DELETE WHOLE** · **D9 RULED — transcribed from COHESION §0o ESC-2** with its id, `fr-PaperSidebar L-4`/`M6` named released, `L-5(a)` named prerequisite, `.e` named executor · **D10 DEFERRED-WITH-DEFAULT ×5**, defaults stated and **not** answered.

⊘ **D6's declined arm is priced with its real advantage first** (zero new dependencies; `vite@7.3.6` installed) before its three costs — build-coupling, no per-assertion report, and a hand-rolled evaluation harness for two subjects that are already importable pure TS. A branch dismissed without its strongest case is not priced.

#### Act 5 — gate reading, AFTER (double-run at the settled bytes)

| probe | AFTER (both runs) |
|---|---|
| ⟨cmd⟩ `ls docs/tranches/X/fourier/DECISIONS-F.W4.md` | **PRESENT** |
| ⟨cmd⟩ `grep -c '^### D[0-9]' DECISIONS-F.W4.md` | **10** — D1..D10, all present |
| ⟨cmd⟩ `grep -c '^\*\*VERDICT' DECISIONS-F.W4.md` | **11** (D2 splits into its two arms) |
| ⟨cmd⟩ `grep -oE '^\*\*VERDICT[^—]*— [A-Z-]+( WITH-DEFAULT)?'` | `RULED \| (a) RULED \| (b) DEFERRED-WITH-DEFAULT \| RULED \| DEFERRED-WITH-DEFAULT \| DEFERRED-WITH-DEFAULT \| RULED \| DEFERRED-WITH-DEFAULT \| RULED \| RULED \| DEFERRED-WITH-DEFAULT` — **every one lands on one of the two lawful words** |
| ⟨cmd⟩ `grep -c '^### \.' docs/tranches/X/execution/C/F-W4.md` | **0** at the moment of the write — no dependent cluster had opened |
| ⟨cmd⟩ `head -1 DECISIONS-F.W4.md` | `SERVED MODEL: claude-opus-5[1m]` |

**`G-F4-DECISIONS`: RED → GREEN**, on both of its clauses, and the three gating relations the cell names are discharged in the direction it asks — D1 gates every GalleryMarquee row (RULED, `.d` may open) · D4 gates PAW-47/PAW-54 (default executable, `.e` opens on the default arm and no other) · D6 gates PAW-12's rider (RULED, `.g`'s precondition met; PAW-12 itself stays F.W9/W10's).
⊘ **Stated so `.z` does not read this green as broader than it is**: the gate's second clause is a **standing obligation across the wave**, not a one-time reading. It is satisfied at this instant by measurement, and **`.z` re-reads it at close** — a unit that executes an arm this record did not rule reddens it retroactively.

#### Act 6 — E13 mail (this seat's own act)

⟨cmd⟩ `grep -nE '\| *UNREAD' docs/tranches/V/coordination/INBOX.md` → **no output** — 0 UNREAD in scope. No row minted (this unit corresponds with no sibling repo); the four-path sweep and the close sweep are seat-0's and `.z`'s respectively.

#### Commits

| hash | paths | meaning |
|---|---|---|
| `aacf5f28` | `docs/tranches/X/fourier/DECISIONS-F.W4.md` | the decisions record (one commit, as the unit's lock requires) |
| *(this line's own)* | `docs/tranches/X/execution/C/F-W4.md` | this receipt |

⟨cmd⟩ `git show --name-only --format='' aacf5f28` → **exactly one path** — no sibling seat's staged bytes swept in.

#### Residuals and escalations

- **Escalations: NONE.** No write was attempted outside the writable set; `F-W4.md` untouched (**E-3**); no fourier byte written; `scripts/dev/dev.sh` untouched.
- **Residual 1 — carried to `.c`**: D8's K-8 sub-limb (`width: 100%` no-op) does not reproduce at 8.0.0 with the record's own probe. `.c` re-measures before asserting zero visual delta; the DELETE-WHOLE verdict is unaffected.
- **Residual 2 — carried to `.g` and `.e`**: the `fuzzyMatch` import-home lock (definition, never the barrel), or `.e`'s zero-consumer deletion of `search/index.ts` is falsified by `.g`'s own test.
- **Residual 3 — carried to `.e` and `.z`**: D5's default is *posed and blocked*; **PAW-38's slug uniquification must ride `.z`'s LATEX-PAPER letter**, or the deferral renews itself silently at the next wave.
- **Residual 4 — carried to every unit**: `G-F4-ANCHORS` gains two contributions (the §3-relative §4/§5 coordinate class; the ECD −1 drift with the rule span over-running onto `</style>`), banked at the decisions record §6 for `.z`'s G-11 quotation.
- **Routed, not settled** (each with its holder named in the record's §3): D2(b)'s LOG default, D3's fill-`#graph` product question, D4's retire-or-restore, D7's shared domain, and D10's five legs.

---

### `.g` — the gate chassis

**Seat**: `.g`, `claude-opus-5[1m]`, 2026-09-18. **Status: DONE (with one bounds disclosure, A-g-8).**
**Gates turned**: `G-F4-VITEST` · `G-F4-NO-UNUSED` · `G-F4-ADMIN-AXE` · `G-F4-OCCLUSION` · `G-F4-CONTRAST-FLOOR` · `G-F4-DERIVER` **RED → GREEN (mechanism)**; `G-F4-A11Y-ROUTE` **RED → GREEN on clause (i), honest-RED on clause (ii)**; `G-F4-ZERO-CONSOLE` **HELD BY CONSTRUCTION**.
**Commits**: 7 fourier (`cc6c32d` `f93eacc` `e8251cd` `ccf7c7f` `05af77b` `4489f21` `717d287`) + 1 value (`b9837bcd`) + this receipt.
**Addendum-beside**: `docs/tranches/X/fourier/F-W4-ADDENDA-g-2026-09-18.md` — **nine corrections**, `A-g-1..A-g-9`. `F-W4.md` untouched (**E-3**).

⊘ **READ THE DISTINCTION THIS RECEIPT KEEPS THROUGHOUT, or its greens read as broader than they are.** Six of these gates are **MECHANISM** gates: they ask that a thing be measured, not that it measure clean. `G-F4-OCCLUSION` asks the gate to measure `<main>`; it now does, and the first honest reading is RED. `G-F4-ADMIN-AXE` asks that one spec enter admin mode; it does, and all four states are RED. Every such finding is **routed to the unit that owns the file**, and is named below. **No gate here is green because its subject is clean.**

#### Act 0 — CRASH-RECOVERY sweep: nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅** (clean; branch `m/w1-bump-migration`, HEAD `f7fa1e3`).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 13 modified ⊕ 4 untracked, **none inside this unit's writable set**: the ten `demo/**` SFCs, `api/src/modules/admin/**`, `CARRY-LEDGER.md` and `execution/B/KF-W6.md` are sibling seats'; `scripts/dev/dev.sh` is the unowned standing-dirty path (**NEVER touched, never staged**); `docs/tranches/X/waves/evidence/` and the two `e2e/smoke/**a11y-control-targets.spec.ts` are Track A's. **Zero inherited paths; no killed predecessor's partial work on this unit.**

#### Act 1 — anchors verified at the true bytes BEFORE any write

⊘ **`.i`'s Residual 4 is INDEPENDENTLY CONFIRMED, with its base measured.** This unit's dispatch cites its §4 gates as `(:23)…(:33)` and §5 as `(:48)`/`(:58)`. Taken absolutely they land in §0a's negative roster and on a bare `---`. They are **§3-relative, base 352** — the same base `.i` found. ⟨cmd⟩ `sed -n '375p;376p;377p;378p;380p;381p;384p;385p' F-W4.md` → `| **G-F4-A11Y-ROUTE** |` · `| **G-F4-ADMIN-AXE** |` · `| **G-F4-OCCLUSION** |` · `| **G-F4-VITEST** |` · `| **G-F4-NO-UNUSED** |` · `| **G-F4-CONTRAST-FLOOR** |` · `| **G-F4-DERIVER** |` · `| **G-F4-ZERO-CONSOLE** |` — **all eight, in dispatch order, at +352**. ⟨cmd⟩ `sed -n '400p;410p' F-W4.md` → `3. **Repair-arms-a-defect same-commit riders**…` · `- **→ F.W9/W10**: axe on `/paper`…`. §2.L's `:194-199` are **absolute and correct** — ⟨cmd⟩ `sed -n '194p;198p' F-W4.md` → `### §2.L · Charter items not exhausted above` · `- **VITEST-FLOOR · the DECISION (= §3 D6)**…`. **INTENT taken at the true bytes; the offset is now measured (352), not just named.**

#### Act 2 — the lock discharged FIRST: the `/equation` axe leg, measured before any route joined

The unit's lock: *"**Measure the `/equation` axe leg FIRST and report its verdict** before joining three more routes (`greenBeforeCure` #2 — an unread predicted-RED must not be buried under new routes)."* Discharged as the first act, on the untouched tree.

⟨cmd⟩ (vite dev on :3000) `npx playwright test visualization-ux.spec.ts --project=chromium --reporter=list -g "keystone: /equation is a11y-clean"`, twice → identical:

```
• [critical] button-name — Buttons must have discernible text (1 node(s))
      .is-auto-active
```

**VERDICT: the leg is RED, and the gate cell's prediction is FALSIFIED.** Predicted: TWO `scrollable-region-focusable`, *"before any hover finding"*. Measured: **ZERO** of them, **ONE `[critical] button-name`** on `FunctionInput.vue:192` (the `icon-only` Auto/Parseval `Button`, sole child a `<Wand2>` glyph, no `aria-label`). The predicted class is real and lives on **`/demo/shape-extractor`** (`#output`), not `/equation`. Full treatment at **A-g-1**. **The `/equation` cure is `.b`'s.**

#### Act 3 — `G-F4-VITEST`: D6's ruled arm, and no other (`cc6c32d`)

D6 ruled *"stand a vitest runner up in `web/`"* and forbade the Vite-plugin arm being built, half-built or kept as a fallback. Landed: `vitest.config.ts` (`environment: "node"`, no DOM bought — D6's own pricing), `"test:unit": "vitest run"`, and the two assertion subjects that **exist today**, from their definitions.

⊘ **`.i`'s Residual 2 honoured exactly**: `fuzzyMatch` is imported from `@/components/paper/search/paperSearchIndex`, **never** from `search/index.ts`. The lock is restated in the test file's own header so a later "tidy" cannot quietly manufacture a consumer and falsify `.e`'s zero-consumer proof.

| | BEFORE | AFTER (double-run) |
|---|---|---|
| vitest config | **0** | `web/vitest.config.ts` |
| `*.vitest.ts` files | **0** | **4** |
| executing assertions | **0** | **28**, all passing |
| CI step | — | `Unit floor (X·F F.W4, G-F4-VITEST)` — **blocking**, no `continue-on-error`, no `--passWithNoTests` |

⟨cmd⟩ `npm run test:unit`, twice → `Test Files 4 passed (4) · Tests 28 passed (28)`.
⟨cmd⟩ `npx playwright test --list | grep -c 'vitest.ts'` → **0** — the `*.vitest.ts` suffix keeps them out of Playwright's `**/*.@(spec|test).*` collection; Playwright still lists `69 tests in 8 files`.
⟨cmd⟩ resolved version, as D6 requires this seat to record rather than inherit: **`vitest@5.0.1`**, peers `vite ^6.4||^7||^8` (installed **7.3.6**) and node `^22.12||^24||>=26` (CI node 22.x). Pinned **exact**.

⊘ **D6's branch table was short by one, and the omission is recorded not smoothed (A-g-2).** A unit runner already existed in `web/`: F.W0's `G-9` `node:test` seat, wired in CI. D6 priced vitest vs the Vite plugin and never saw it. The verdict is unaffected — F.W0's own file calls that seat *"explicitly NOT coverage"* and routes the floor's runner choice away from itself — and **this seat did not re-home it**, because that would redden a closed wave's landed gate. The two-runner state is disclosed in the workflow file itself and consolidation is **F.W9 `G-F9-1`**'s.

#### Act 4 — `G-F4-NO-UNUSED`: the ESLint leg and its CI wiring (`f93eacc`)

The tsconfig leg was already GREEN (F.W0 `b3b736c`; `greenBeforeCure` #1) and **no credit is claimed for it**. Landed: `eslint.config.js` — flat, scoped to `src/**`, exactly the two rules the gate names, both `error`; `"lint": "eslint src"`; CI step `Keyed-loop + duplicate-import gate`, blocking.

| leg | BEFORE | AFTER |
|---|---|---|
| `noUnusedLocals` / `noUnusedParameters` | already present (`tsconfig.json:10-11`, F.W0) | unchanged — **not this wave's** |
| ESLint configs in `web/` | **0** | `eslint.config.js` |
| `lint` script | absent | present |
| CI wiring | absent | blocking step in `web-build` |
| findings | unmeasurable | **10 `no-duplicate-imports`, 0 `vue/require-v-for-key`** (double-run identical) |

⊘ **`allowSeparateTypeImports` was measured and DECLINED, and the decline is written into the config.** Bare rule → **10**; with the option → **1**. The gate names the rule with no qualifier, and an option that suppresses nine findings is the seat narrowing its own gate. The ten are routed by path at **A-g-3** — `.a` ×2 · `.b` ×1 · `.c` ×3 · `.e` ×3 · plus `BasisCanvas.vue:15`/`:31`, whose `:31` is `EP-MISSED-F`'s own same-kind shape (two `import type` from one specifier).

⊘ **`EP-MISSED-F`'s cited site is DISCHARGED-BY-PREDECESSOR** — `lib/easings.ts` now carries ONE import statement (F.W2 `.a` `0cc9b00` / COHESION §0o ESC-4). Recorded so `.z` does not book a cure for a site that no longer exists.
⊘ **oxlint is NOT replaced** (F.W0's `FR-IC-25` floor). It parses no Vue template AST and carries neither named rule; both floors run and neither discharges the other. ⟨cmd⟩ `npx --yes oxlint@1.42.0 src e2e vite.config.ts playwright.config.ts` → **0 errors, 18 warnings, 146 files** — unmoved by this unit's files.

#### Act 5 — `G-F4-OCCLUSION`: the gate stops measuring nothing (`e8251cd`)

Re-pointed at `<main>` per `FSE-M-4`, plus `HLG-20`'s vertical-clip arm on the non-scrolling shell. A missing `<main>` is now itself a failure — that is how this gate would silently return to measuring nothing.

| | BEFORE | AFTER (double-run) |
|---|---|---|
| horizontal probe | `documentElement.scrollWidth − clientWidth`, pinned to 0 by `App.vue:24/:26` | `<main>.scrollWidth − clientWidth` |
| vertical probe | **none** | shell `scrollHeight − clientHeight` (the box that clips and cannot scroll) |
| reading | `21/21 GREEN` = 21/21 UNMEASURED | **20 passed / 1 failed** |

**The one failure is the record's own defect, reproduced to the pixel**: `horizontal overflow inside <main> on shape-extractor @ 375x667 … Expected: <= 2 · Received: 97` — `fr-FourierShapeExtractor D-1`'s booked *"the Moon box (272..472) loses 97px"*. **Routed to `.a`.** The vertical arm reads 21/21 clean and is a REGROWTH gate, stated as such.

⊘ **A harness defect cured in passing, under E-3.** Running this spec overwrites 21 CHECKED-IN PNGs under `docs/tranches/J/audit/screenshots/` — prior evidence, immutable — so the gate could not be read without destroying the record it is read against. `VISUAL_OUT` now redirects the capture sink; **the default is byte-identical** to the previous behaviour. ⟨cmd⟩ `git status --porcelain` after both runs → only `web/e2e/visual-baseline.spec.ts`. **Nothing in the J trees was written.**

#### Act 6 — `G-F4-ADMIN-AXE`: the admin surface is graded for the first time (`ccf7c7f`)

BEFORE — ⟨cmd⟩ `grep -rln "admin" e2e/ | wc -l` → **0**. AFTER — `e2e/gallery-admin-a11y.spec.ts`, four tests: banner + Users + Flagged + Audit Log.

Admin mode is entered through the **shipped path** (`?admin=` → `activateAdmin` → `verifyAdmin` → `adminMode`); only the HTTP boundary is stubbed, and the reasoning is written into the spec: a gate needing an `ADMIN_TOKEN` secret is a gate that quietly stops running, and a fresh CI database renders every panel EMPTY — axe over an empty table grades nothing, and `GAB-1`'s cells are the whole point. Each test refuses to grade until its own content is visible, so no run can pass vacuously.

**Four states, all RED, double-run identical:**

| finding | nodes | site | owner |
|---|---|---|---|
| `[serious] aria-hidden-focus` | 2, on **every** state | reka-ui focus-guard sentinels (`<span aria-hidden="true" tabindex="0">`, fixed 1×1, clipped) | **GLASS-RELAY (SS-6)** — producer, **never a frontend hack** |
| `[critical] button-name` | 1 | `GallerySearchBar.vue:68` `.filter-toggle` (icon-only, no accessible name) | `.d` |
| `[serious] color-contrast` | 1 | `AdminUserList.vue:376` `bg-red-500/20` status chip — twin at `AdminFlaggedPanel.vue:176` | `.d` |

⊘ `aria-hidden-focus` is a **producer row**: it rides the BH inbox relay letter (`.z`'s), and no consumer-side patch is authored. Named here so `.z`'s letter carries it.

#### Act 7 — `G-F4-A11Y-ROUTE`: three routes join (`05af77b`)

| | BEFORE | AFTER |
|---|---|---|
| routes under axe | 3 of 7 (`/visualize`, `/v/{slug}`, `/equation`) | **6 of 7** (+ `/paper`, `/morph`, `/demo/shape-extractor`) |
| `checkA11y` call sites | 8 | **11** |

Each keystone settles on its own rendered content — the compiled article's H1, `HarmonicLevelGrid`'s `Morph` heading, the `Moon` figure heading — never a blind timeout, so a route that fails to boot fails loudly instead of grading an empty `<main>`. Run individually (Playwright stops the file on first failure, which would otherwise suppress the later routes), double-run:

| route | verdict | findings → owner |
|---|---|---|
| `/paper` | **GREEN** | — |
| `/morph` | **RED** | `button-name` ×4 (`.morph-button`; three glass-ui `select-trigger` comboboxes with no accessible name) · `label` ×5 (`.num-input` ×3, `.level-input` ×2) → **`.a`** |
| `/demo/shape-extractor` | **RED** | `scrollable-region-focusable` ×1 (`#output`) → **`.a`** |
| `/equation` (pre-existing) | **RED** | `button-name` ×1 (`FunctionInput.vue:192`) → **`.b`** |

⊘ **`/paper`'s GREEN is a finding, not a clearance, and it is this wave's sharpest justification for a separate contrast gate.** `PS D-B2` books 2.39/3.00 and `PS D-M4 extended` four sub-4.5 ramp stops **on that very route**, and axe reports neither: axe grades text over a resolvable ancestor background, while ramp inks behind `color-mix` plates, canvas strokes and control BOUNDARIES (1.4.11) fall outside it. **A green axe run is not a contrast reading** — argued at adjudication, measured here.

**Gate verdict: clause (i) — the four routes joined — GREEN. Clause (ii) — zero serious/critical — honest-RED on 3 of 4, every finding routed.** `.g` owns the joining; the cures are `.a`'s and `.b`'s.

#### Act 8 — `G-F4-CONTRAST-FLOOR`: an executable both-arm harness (`4489f21`)

BEFORE: *"No executable harness anywhere"* — reproduced. AFTER, three parts:

- `scripts/contrast.ts` — pure WCAG arithmetic (sRGB transfer → relative luminance → ratio; floors 4.5 text / 3 non-text, **no large-text relief**, because no named pair qualifies and a relief clause nothing uses is a hole). **THROWS** on an unresolved colour rather than grading it — the failure that would otherwise read a dead `var()` as black and buy a flattering 21:1.
- `e2e/contrast-pairs.ts` — the declarative registry: **34 pairs**, each a stack of CSS expressions with its record id, kind, owner and banked figure.
- `e2e/contrast-floor.spec.ts` — resolves each stack on a 1×1 canvas so the **browser's own compositor** handles `var()`, `light-dark()`, `color-mix()`, `oklch()` and alpha, then grades **both arms**.

⊘ **`banked` is never asserted against** — the live reading is the fact, and a divergence prints as DRIFT.
⊘ **`PS D-M4 extended` is enumerated over ALL THIRTEEN ramp stops**, not four hand-picked indices. §4 requires *"all four, not the worst alone"*; enumerating the ramp is strictly stronger and cannot go stale when a cure moves which stops fail. `★MF-10`'s zero headroom means a 14th root resolves to nothing, which the harness raises as an **unresolvable colour**, not a silent pass.

**Readings, double-run** — light **24 of 34 RED**, dark **12 of 34 RED**. The registry reproduces across the board: `FR-MSP-7` 1.035/1.086 (banked 1.038/1.084) · `HLG-37` 1.283/1.365 L, 1.383/1.385 D · `FR-USB-5` 1.283/1.929/1.720 · `PSM-4@45%` 1.888 L / 2.378 D · `FR-EQR-7` 2.110 · `GAB-1[plate/page]` 1.031 · `stop-11` **3.614** (banked 3.58). The registry's *"dark arm passes throughout"* for `GAB-1`/`AA-3`/`FR-EQR-7` is **confirmed by measurement**, as is `HLG-37`'s both-arm failure. Four figures DRIFT at the 8.0.0 pin and one `PS D-M4` stop has risen above the floor — all at **A-g-5**.

⊘ **`FR-IC` is absent BY DELETION, not by omission** (F.W0 `5842377`; `greenBeforeCure` #3), stated in the registry file itself so its silence reads as a ruling.
⊘ **Seven named pairs are RED-because-underived, never skipped**: `FR-CP-D1` · `DMT M-2` · `ECD D-5` · `ECD D-6` · `EV D·D-B3` · `PS D-B2` · `PV D/M-8`. Each paints its ink rather than declaring it; expressing them as static stacks at this seat would be a guess wearing a measurement's clothes. They are enumerated with owners and the harness **fails** on them. The roster IS the RED and closes by being emptied, one row per owning unit's cure.

#### Act 9 — `G-F4-DERIVER`: the four blind spots become a published census (`717d287`)

BEFORE — ⟨cmd⟩ `find .. -name '*deriv*' -not -path '*/node_modules/*' -maxdepth 3` → **∅**. AFTER — `scripts/derive-loops.ts`, `npm run derive:loops`, published in CI, **8 vitest assertions** pinning the blind spots as behaviours.

**The first census (double-run identical):**

| clause | reading |
|---|---|
| `nativeLoopsByDirective` | **33 directives** — 17 native, 16 component callsites; **0 unkeyed** |
| `loopBounds` | 1 closed · **32 runtime** |
| `loopMultiplicity` | static 1 · reactive 25 · runtime 7 |
| `isCandidateSets` | 6 sites, **4 resolved** |
| `producerInternalLoops` | glass-ui **8.0.0**: 15 `renderList` modules / 144 `d.ts` components · latex-paper **0.2.1**: 8 calls / 7 components |
| `urlRefEdges` | **4 edges, ALL FOUR UNRESOLVED** |
| `disclosureState` | recorded for all 39 sites |
| `loopSourceProvenance` | literal-array 1 · typed-domain 32 |

- **`BS-1` discharged at its own witness**: `PaperSidebar.vue`'s **three nested `<li v-for>`** are all found, all native, all `host: "li"` — a component-callsite census reads that file as **0**. `FR-AUL-54`'s refinement is structural: the index is the DIRECTIVE and `native` is a property of a row, never the partition.
- **`FR-NP-2` honoured structurally**: a number is emitted only for a literal range or literal array; every typed domain is `"runtime"`. The deriver refuses to mint a cardinality, and a vitest assertion enforces it.
- **`BS-2`**: `AppHeader.vue:121`/`:134` report **UNRESOLVED**, not zero — the candidate set is assembled across a data structure, `BS-2`'s exact shape.
- **`BS-3`**: the denominator is the INSTALLED dist and is **versioned**; none of it is visible to a `web/src` census.
- **`BS-4`, and it is a live finding**: `SvgFilters.vue` defines `#title-boil` `:69`, `#wobble-celestial` `:96`, `#paper-grain` `:122`, `#canvas-grain` `:150`, and **nothing under `src` references any of them**. The 178-line survivor is measured: four filter definitions, zero in-tree consumers. **Routed to the SCRUB (`G-F4-DEAD-DEP`, `.f`)** — ⊘ with the standing caution that an `url(#id)` edge is precisely the edge no import graph represents, so a consumer in a producer package or in emitted CSS must be excluded before any deletion.
- ⊘ **The deriver publishes its own method limits**, so no consumer mistakes a derived figure for a runtime one.
- ⊘ **A correction to the naive instrument**: `grep -rn 'v-for' src | wc -l` → **34**; the deriver reads **33**. The 34th is prose in a `<script>` doc comment at `CoefficientsSpectrum.vue:76`. The template-scoped read is the correct one.

#### Act 10 — `G-F4-ZERO-CONSOLE`: held by construction; the reading is owed to CI

- ⟨cmd⟩ `git diff --name-only cc6c32d~1..HEAD -- web/e2e/` → seven paths, **none** of `visualization-crud` · `workspace-flow` · `paper-performance` · `gallery` · `contour-extraction` — the five specs carrying the console/`pageerror` hooks. **Zero bytes of the zero-console gates were touched**, so F.W1's twelve-limb transaction is not split by any edit here.
- ⊘ `e2e/paper-performance.spec.ts:328` (`.a`'s DMT N-2 rider) **not touched** — ⟨cmd⟩ `git diff cc6c32d~1..HEAD -- web/e2e/paper-performance.spec.ts` → **0 lines**.
- ⊘ **`FR-GIG-5` is claimed by nothing here** — ⟨cmd⟩ `git log --oneline -7 | grep -ci 'pagination\|GIG-5'` → **0**.
- **The gates cannot be READ at this seat**: ⟨cmd⟩ `nc -z localhost 27017` → **DOWN**; ⟨cmd⟩ `docker info` → **DOWN**. Run without a backend, `gallery.spec.ts:118` fails on `500 (Internal Server Error)` from the dead `/api` proxy — an environment artefact, and asserting on it would be a false reading in either direction. Declared, as seat 0 declared it at open, **not claimed**.

#### Act 11 — §5.1(3)'s `noUncheckedIndexedAccess`, priced and routed

§5.1(3) sequences it *before* `PAW-12`'s predicate split, and `PAW-12` is **F.W9/W10's** — so it is not due here. It was nonetheless **measured**, because a sequencing lock priced by guess hands the next wave a surprise:

| tsconfig | `vue-tsc -b --force` |
|---|---|
| as landed | **18** (17 × TS6133 + 1 × TS6196 — seat 0's baseline, unmoved by this unit) |
| + `noUncheckedIndexedAccess` | **265** (102 × TS18048 · 77 × TS2532 · 26 × TS2345 · 22 × TS2538 · 19 × TS2322 · …) |

**+247, overwhelmingly in `src/**`** — files `.g` may not write and every sibling is mid-cure on. Landing it now would block `npm run build` for the rest of the wave. **Routed to F.W9/W10 with `PAW-12`, priced.** The probe was reverted byte-exactly and committed nowhere (⟨cmd⟩ `git status --porcelain` → `web/tsconfig.json` absent).

#### Act 12 — E13 mail (this seat's own act)

⟨cmd⟩ `grep -nE '\| *UNREAD' docs/tranches/V/coordination/INBOX.md` → **no output** — **0 UNREAD in scope**. Four-path sweep at this seat's clock: `V/` ∅ · `V/coordination/` self only · glass BK `glass-outbound-2026-09-18-valuejs-o26-reply.md` **already rowed I-35** · keyframes ∅ · atlas P ∅ · fourier F ∅. No row minted — this unit corresponds with no sibling repo directly; the two **producer rows it surfaced** (reka-ui `aria-hidden-focus` sentinels; the light-arm `--success` rung at 2.133) are named here for **`.z`'s SS-6 relay letter** and are authored as frontend hacks nowhere.

#### Gate readings, BEFORE → AFTER

| gate | BEFORE | AFTER | reading |
|---|---|---|---|
| `G-F4-VITEST` | RED — no runner, 0 assertions | **GREEN** | vitest@5.0.1, 4 files / **28 assertions**, CI-blocking |
| `G-F4-NO-UNUSED` | PARTIAL-RED — tsconfig leg green, no ESLint | **GREEN** | 2 named rules over `src`, wired blocking; 10 findings routed |
| `G-F4-A11Y-ROUTE` | PARTIAL-RED — 3 of 7 routes, verdict unread | **GREEN (i) / honest-RED (ii)** | 6 of 7 routes; `/paper` clean, 3 RED routed |
| `G-F4-ADMIN-AXE` | RED — 0 admin files in `e2e/` | **GREEN** | 1 spec, 4 states; 3 finding classes routed |
| `G-F4-OCCLUSION` | RED — passes by construction | **GREEN** | `<main>` + vertical clip; **97px** found at shape-extractor |
| `G-F4-CONTRAST-FLOOR` | RED — no harness | **GREEN** | 34 pairs, both arms; 24 L / 12 D RED, 7 underived, all routed |
| `G-F4-DERIVER` | RED — no deriver | **GREEN** | 8 fields published + CI + 8 assertions |
| `G-F4-ZERO-CONSOLE` | UNMEASURED-AT-OPEN | **HELD BY CONSTRUCTION** | 0 bytes of the 5 hook specs touched; reading owed to CI's backend arm |

**Unmoved by this unit, recorded so `.z` reads no drift into them**: `G-F4-VUE-TSC-CLEAN` **18 diagnostics, identical before and after** (none from `e2e/**` or `scripts/**`); oxlint **0 errors / 18 warnings**; Playwright collection **69 tests in 8 files → 79 in 10** (⟨cmd⟩ `npx playwright test --list | tail -1` → `Total: 79 tests in 10 files`; +3 route keystones, +4 admin, +3 contrast), **no existing test renamed or removed**. ⊘ This figure was first written as 76 from arithmetic and corrected against the settled bytes before the receipt closed — the count follows the operand.

#### Commits

| hash | repo | paths | meaning |
|---|---|---|---|
| `cc6c32d` | fourier | `web/package.json` · `web/package-lock.json` · `web/vitest.config.ts` · `web/e2e/unit/{curve-transition,paper-search}.vitest.ts` · `web/tsconfig.json` · `.github/workflows/ci.yml` | the unit floor (D6's ruled arm) |
| `f93eacc` | fourier | `web/eslint.config.js` · `web/package.json` · `web/package-lock.json` · `.github/workflows/ci.yml` | the ESLint leg + CI wiring |
| `e8251cd` | fourier | `web/e2e/visual-baseline.spec.ts` | occlusion re-point + vertical clip |
| `ccf7c7f` | fourier | `web/e2e/gallery-admin-a11y.spec.ts` | the admin-mode axe spec |
| `05af77b` | fourier | `web/e2e/visualization-ux.spec.ts` | three routes join the keystone set |
| `4489f21` | fourier | `web/scripts/contrast{,.vitest}.ts` · `web/e2e/contrast-{pairs.ts,floor.spec.ts}` | the contrast harness |
| `717d287` | fourier | `web/scripts/derive-loops{,.vitest}.ts` · `web/package.json` · `.github/workflows/ci.yml` | the deriver |
| `b9837bcd` | value.js | `docs/tranches/X/fourier/F-W4-ADDENDA-g-2026-09-18.md` | the dated addendum-beside |
| *(this line's own)* | value.js | `docs/tranches/X/execution/C/F-W4.md` | this receipt |

Every commit carried its own pathspec on the commit itself; ⟨cmd⟩ `git show --name-only --format=''` on each returns **exactly the listed paths** — no sibling seat's staged bytes swept in.

#### Residuals and escalations

- **ESCALATION — one, and it is a ratification request, not a block (A-g-8).** `web/package-lock.json` is **not named** in this unit's writable set, and this seat wrote it. Both manifest-bearing gates need devDependencies, and `npm ci` — which all three CI jobs run — **fails outright** on a `package.json`/lock desync, so writing the granted manifest byte without its lock would have turned every CI job RED: a half-landing and, by this wave's own standard, a HIGH defect. Treated as inside the granted surface because the lock is that byte's deterministic derivative, because **F.W0's own file pairs them as ONE reservation** (*"reserves `web/package.json` + `package-lock.json` entirely to unit a"*), and because no sibling seat in this wave holds either file. **Asked of the orchestrator**: ratify it into `.g`'s set by dated addendum (the §Bounds shape COHESION §0o already used at `ESC-KFW2-1`), or say the word and the manifest transaction is reverted whole and both gates re-opened. Isolated to **two commits** (`cc6c32d`, `f93eacc`), each a plain `npm install` result.
- **Residual 1 — carried to `.a`**: `shape-extractor @ 375×667` overflows `<main>` by **97px** (`FSE-D-1`), and `/morph` + `/demo/shape-extractor` carry **10 axe findings** (4 `button-name`, 5 `label`, 1 `scrollable-region-focusable`). The occlusion and keystone specs go green when those land, by no other means.
- **Residual 2 — carried to `.b`**: `/equation`'s `[critical] button-name` at `FunctionInput.vue:192`. The gate cell predicted a different defect; **A-g-1** is the provenance.
- **Residual 3 — carried to `.d`**: `GallerySearchBar.vue:68` `.filter-toggle` name · the `bg-red-500/20` chip (`AdminUserList.vue:376`, twin `AdminFlaggedPanel.vue:176`) · every `GAB-1`/`FR-USB-5`/`AA-3` contrast row.
- **Residual 4 — carried to `.f`**: `SvgFilters.vue`'s **four `url(#id)` definitions with zero in-tree consumers**. ⊘ An `url(#id)` edge is the edge no import graph represents — exclude a producer-package or emitted-CSS consumer before deleting.
- **Residual 5 — carried to every surface unit**: the **seven underived contrast pairs**. Each owning unit lands its pair's expression stack in `e2e/contrast-pairs.ts` **in the same commit as its cure**; the harness's third test closes only by that roster being emptied.
- **Residual 6 — carried to `.z`, for the SS-6 relay letter**: reka-ui's focus-guard sentinels (`aria-hidden-focus`, 2 nodes on every gallery/admin state) and the producer's light-arm `--success` rung (**2.133:1**, floor 3). Producer rows; no frontend hack authored.
- **Residual 7 — carried to F.W9/W10**: consolidate the two unit runners (F.W0's `node:test` seat + this floor) under `G-F9-1`, per F.W0's own routing; and land `noUncheckedIndexedAccess` with `PAW-12` at the **measured** price of 265 diagnostics.
- **Residual 8 — carried to `.z`**: the ten `no-duplicate-imports` findings are the ESLint leg's born-RED and are owned across `.a`/`.b`/`.c`/`.e`; `web-build` stays RED until they land. `allowSeparateTypeImports` was measured (1 finding) and **declined** — re-opening it is a decision, not a fix.

---

### `.a` — the shell, the morph chain, and the global sheet

**Seat**: `.a`, `claude-opus-5[1m]`, 2026-09-18. **Status: PARTIAL** (every act below landed and measured; the unbooked residue is enumerated at *Residuals*, never dropped).
**Commits**: 12 in fourier (`e4599ec` … `e365203`), 1 in value.js (`fff145da`), ⊕ this receipt. **Writable set honoured exactly**; ⊘ `scripts/dev/dev.sh` never touched; ⊘ `web/e2e/**` touched at **one line only**, the granted `paper-performance.spec.ts:328`.

#### Act 0 — CRASH-RECOVERY sweep (standing law): nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅** (clean; branch `m/w1-bump-migration`, HEAD `717d287` = `.g`'s last).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 12 modified ⊕ 3 untracked, **none inside this unit's writable set** (the ten `demo/**` SFCs and `CARRY-LEDGER.md` are sibling seats'; `scripts/dev/dev.sh` is the unowned standing-dirty path; `docs/tranches/X/waves/evidence/` and the two `e2e/smoke/**` specs are Track A's). `docs/tranches/X/fourier/F-W4-ADDENDA-a-2026-09-18.md` **ABSENT** before this seat wrote it. **Zero inherited paths.**

#### Act 1 — anchors verified at the true bytes BEFORE any write

Every §2.F / §2.0 / §2.K coordinate in the dispatch resolves: ⟨cmd⟩ `sed -n '120p;122p;125p;86p;90p;99p;188p;353p'` over `waves/F-W4.md` → `### §2.F · the shell/morph chain…` · `**⟨R-2a adoptions…⟩**` · `- **FR-AH-24 · L-14 …**` · `- **SP-6 · unlayered-scoped cascade clobbers…**` · `- **SP-10 · font truth…**` · `- **SP-19 · the silent-degradation asset chain…**` · `### §2.K · the /visualize + /morph authoring surfaces` · `## §3 Decisions this wave authors…`. ⊘ `.i`'s **Residual 4** applies as banked: the `§4 (:31)` / `§5.1(3) (:48)` coordinates are §-relative, and INTENT was taken at the true bytes (`G-F4-CENSUS-CELLS` in the §4 table; §5.1 item 3 at `:400`).

#### Act 2 — SP-6, the ONE cascade decision (`e4599ec`) — **and a second route to `FR-AH-30`'s dead outcome**

The adjudicated cure-shape is *"`@layer glass-overrides` appended after `utilities`"*, and ⊘ `@layer components` **reverses** it. **This seat reached the reversal anyway, by a route the record does not name, and measured it before shipping.** Vite emits SFC `<style>` output **before** the entry stylesheet (`main.ts` imports `App.vue` above `./style.css`), so the first `@layer glass-overrides { … }` block in a **component** registers the layer FIRST — at the BOTTOM of the order. ⟨cmd⟩ over the emitted bundle, before the fix: `glass-overrides` at byte **4193** · `properties` **33911** · `theme` **36806** · `base` **41501** · `components` **45523** · `utilities` **235579**.

**Cure**: ONE `@layer theme, base, components, utilities, glass-overrides;` statement in the document head, which is first in document order in **both** modes (the build appends its `<link>` at the end of `<head>`; the dev server injects `<style>` at the end too). ⟨cmd⟩ `dist/index.html`: statement at **2874**, bundled CSS link at **4144** → statement first. `style.css` carries a "do not add a rival statement here" note so the next seat cannot silently re-invert it.

**Verified in a real browser at the built bytes** (`.nav-dropdown-item`, after): `min-block-size: 44px` (the producer's coarse-pointer floor, **restored**) · `transition-property: background-color, color, border-color, box-shadow, translate, scale` (the six-leg list **restored** — `MISS-3`'s truncation to two legs gone, so `--menu-row-lift: -1px` springs instead of snapping) · `gap: 10px` (the layered consumer divergence, **surviving**).

Landed in the same commit: `FR-AH-11` (the base re-skin, the `:hover` re-skin and the `outline:none` **deleted**, not layered) · `FMD-13` (both Button re-skins deleted; `emphasis` governs) · `FMD-N3` ⊕ `FMD-27` (the hover `box-shadow` **composes** the `cartoon-surface` stamp instead of replacing it) · `HLG-3`/`FMD-3` (the dead `--slider-scrub-*` block) · `HLG-6` (shorthand truncation) · `HLG-40` (the focus indicator's transition listed one of the two properties it changes) · `HLG-34` · `FMD-18`'s top gutter and state ORDER (`.is-bound:not(.active)`; boot state is always a bound tile, so *selected* was overpainted by *bound* at every idle rest) · `FMD-28` · `FMD-35` · SP-15/`DMT N-16` hover gating.

#### Act 3 — SP-10, the font decision, RULED (`a3f1fc2`) — §3 D10's font leg, STATED

**COMMIT TO THE CM IDENTITY**, on arithmetic: ⟨cmd⟩ `wc -c dist/styles/fonts.css` → **132,840 B**; ⟨cmd⟩ `grep -o 'font-family: *"[^"]*"' … | sort -u` → `"Fira Code"` · `"Plus Jakarta Sans"` — two families, one already self-hosted by this app, the other with **zero** application sites in an app whose `@theme` fork exists to reject it. The alternative would ship a third of a megabyte of CSS to cure a phantom.

⊘ **A fork-point that read elegantly and silently did not take, recorded because the failure mode is the row's own.** `--font-stack-text` (the producer's single bridge head) was tried first: `@theme` beats `bridges.css`'s leaf declarations but **loses** against the stack head, leaving `--font-serif`/`--font-text` on Plus Jakarta and `--font-sans` resolving to **nothing**. Four declarations that are proven to win replaced it. ⊘ `--font-text` is the one the PRODUCER's own `body { font-family: var(--font-text) }` reads, and that rule beats this app's `@layer base` binding — forking the leaves without it left the page's own body copy on an unloaded sans while every branded element moved, and the omission was invisible because the fallback is also a serif.

**Browser-verified at the built bytes**: `--font-sans`/`--font-serif`/`--font-text`/`--font-serif-math` all → Computer Modern · `--font-display` → Fraunces · `body` → Computer Modern (was Plus Jakarta) · masthead ℱ = Fraunces and wordmark = CM (**one identity**, not two unrelated fallbacks) · `Plus Jakarta Sans Fallback` **stops loading entirely** · all **four** CM faces now requested (the italic face was absent before). `FR-AH-36`: the three preloads gain `crossorigin` — a `@font-face` fetch is always CORS-anonymous, so a bare preload occupies a different cache key and can never match — and both halves of that row's alternative are now met, so they live.

#### Act 4 — COHESION §0j.D `G-15(b)` (`6b628a5`)

`html{font-size:1.125rem}` under 768px **GONE**. It inflated every rem by 12.5% on exactly the viewports where `--ui-scale` is already scaling, and minted a third breakpoint 128px from the app's own 640px — the band that made the `/morph` title render LARGER below 768 than above it (`FMD-29` · `HLG-19`) and the header toggle's ladder non-monotonic at 45 → 49.5 → 44 px (`FM-21`). ⊘ `FM-21`'s own scaling-system question is **POSED at D10, not answered**.

#### Act 5 — `FM-2`'s ring rider (`2e41c00`) — a finding no banked row carries

⟨cmd⟩ `grep -roh -- '--[a-z-]*ring[a-z-]*: *[^;}]*' node_modules/@mkbabb/glass-ui/dist --include='*.css' | sort -u` → `--focus-ring-color` · `--focus-ring-shadow` · `--focus-ring-width` · `--control-edge-ring` · `--dock-ring` · `--dot-ring-*`, and **no `--ring`, no `--color-ring`**; ⟨cmd⟩ `grep -rn -- '--ring *:\|--color-ring *:' src public` → **∅**. So `outline: 2px solid var(--ring)` is invalid at computed-value time and **dropped**: six read sites across five files — exactly `FM-2`'s banked extent — were painting **no focus ring at all** at HEAD. Three cured; **three NAMED, not written** (`ImageUpload.vue:200` → `.c`; `GalleryCard.vue:222`/`:223` → `.d`). Riding: `DMT N-5` · `N-6` · `N-7` (`--scale-hover`) · `N-8` (the reduced arm nulled `transition` only, so the hover transform became an instantaneous snap — motion reduction inverted into **sharpening**) · `N-9` · `N-16`.

#### Act 6 — SP-3, the palette re-route (`f32e912`)

`FR-AH-23` **before** `DMT M-2` and before the SUN/MOON re-route, as the lock sequences it; the precondition (`fr-BasisCanvas D-1`'s resolver cure — *"else it lerps `#888888`"*) landed at F.W2, verified: `cssVarToHex` and both `#888888` returns are gone from `lib/colors.ts`. Two hard-coded sRGB triples → `--viz-amber` / `--viz-legendre`, and the channel lerp → `color-mix(in oklab, …)`, which kills `DMT N-13`'s ~37% chroma collapse with the engine doing the work and **nothing added to the boot path**. The idle branch stops recomputing two constants through a lerp at t=0 and t=1.

**Colour model validated three times against banked figures before any edit**: `#E88845` on `--background` → **2.513** (banked `DMT M-2` **2.51**) · `--foreground`@12% on `--card` → **1.275 L / 1.395 D** (banked `HLG-37` **1.275 / 1.398**) · `#60a5fa` on `--background` → **2.446** (banked `FMD-19` **2.45**).

#### Act 7 — SP-4, the PRM gate (`e022edf`) ⊕ the census correction (`fff145da`)

`FMD-22` ⊕ `FR-AH-31` ⊕ `DMT D-M1/L-7/C-5` are ONE ungated clock seen from two components, so all three close at `morphTo()`. ⊘ The reduced arm seeds the **TERMINAL** frame — `setShape(to)` at `highLevel`, `morphProgress = 1` — never t=0 and never blank (SP-4's M-D1 clause, and the census cell's own `proposed` arm verbatim). The early return also skips the dynamic engine import. `FR-AH-6` is **not pre-empted**: the router's second predicate stays and both sites carry the note, because F.W5's rider owns which home survives.

**`G-F4-CENSUS-CELLS`**: the 06-16 M-deep-audit run's `B5-01` evidence line (`raw-findings.json:1393`, **path-qualified**; anchor re-resolved — `:1390` `"id"`, `:1391` `"title"`, `:1392` `"severity"`, `:1393` `"evidence"`) names `DarkModeToggle` among *"10 components [that] do honour it"*. **False**: its at-rule nulled `transition` alone, and its actual clock consulted the preference nowhere. Corrected by dated addendum-beside, entry **A-a-1**. ⊘ **Cross-repo disclosure**: the lock says *same commit* and the two live in different repositories, so one commit cannot hold both — they are one act landed adjacently, and **each names the other** (`e022edf`'s message cites the addendum; A-a-1 cites `e022edf`).

**PRM arm verified in a browser** (`reducedMotion: "reduce"`): after the toggle the glyph's `d` is **19,534 chars — non-empty** and the moon, `aria-pressed="true"`, `dark=true`. The terminal frame, not a blank one.

#### Act 8 — SP-7, the `/morph` BLOCKER (`5081b37`)

`FM-1` (= `FMD-2`): the leaf's contract is now **decorative by default, nameable on request** — a host with its own name mounts it `aria-hidden` (that is also `DMT N-4`), a host without passes `title` and it becomes a named `role="img"`. The host carries a **transaction-stable** name, honouring `FR-MSP-10`'s NAME-CURE LOCK: a name built from the current shape inverts the instant the control is used. `FMD-14` (`for`/`id`, `useId`-derived because the phase card mounts three times) · `FMD-15` (three sliders announced one byte-identical name; each card is now a named `role="group"`) · `HLG-8` · `DMT N-2`/`N-3`/`N-17`.

⊘ **RIDER LOCK discharged by construction**: ⟨cmd⟩ `grep -rn -i 'switch to dark\|switch to light\|sun-moon-toggle' e2e/` → **exactly one hit, `paper-performance.spec.ts:328`** — the single line this unit is granted. It moved in the same commit to the stronger `{ name, pressed: false }` form; ⟨cmd⟩ `git diff --numstat` on that file → **1 1**.

#### Act 9 — §2.K's FSE rows (`362b210`)

`FSE-D-1` ⊕ `FSE-M-4`: the page was framed by inline literals — 2rem root padding and a non-wrapping flex row with 2rem gap holding two fixed 200px subjects = 496px of incompressible content in a 375px viewport. The row wraps and the subjects shrink; the extraction geometry is untouched because `extractContours` reads user-space coordinates through `viewBox`. `FSE-D-8` (named, focusable region with a polite status line announcing the OUTCOME, not reading a 128-point dump aloud; named `role="img"` subjects) · `FSE-D-9` (⊘ `stroke="red"` deliberately **LEFT**: it is a debug instrument's tracing ink and must not follow a theme) · `FSE-L-M4` · `FSE-M-5` · `FSE-M-12`.

⊘ **`FSE-L-B1` DO-NOT-REGENERATE honoured**: the extractor was never re-run, `moon.json` is untouched, and **`M-10`'s RNG rider is not engaged because no `L-B1`/`L-B2` cure was attempted** — the generator calls, their order and their discarded draws are untouched, so the canonical sun cannot re-roll. ⊘ **`FM-19` FROZEN-FOREVER** (§0j.D `G-15(c)`) respected; **`HLG-44` stays blocked**.

#### Act 10 — the epoch/cancellation family (`0a5c028`)

The engine's `stop()` **RESOLVES** the pending `play()`, and `morphTo` is a three-await coroutine, so every superseding act — `stopAnim`, `setShape`, `setLevel`, Reset, a second morph, `onUnmounted` — **ADVANCED** the dead coroutine instead of killing it, and it kept writing points, level and phase on top of whatever replaced it. A monotonic **epoch**, checked after each await and inside each tick, makes a superseded run do nothing. `DMT M-3`/`FMD-6`: `phase` was first written AFTER the dynamic import, so the re-entry guard was exactly as wide as the chunk fetch and widest on the cold path it protects — the phase is now claimed **before** the await. `FR-AH-20`: a throw past that point left `phase` non-idle **forever** and bricked both consumers' guards for the life of the page; `try/finally` restores idle, and only when the run is still live, so a teardown cannot report itself as a completion. `FMD-9`: the engine memo was poisoned **on existence** rather than on success; it clears in the catch and re-throws. `DMT M-1`'s watcher lands **with** the cancellation, as the lock requires, because before the epoch a watcher firing mid-morph would have handed the glyph to two writers.

**Behaviour verified in a browser**: six rapid activations inside the import window run **exactly one** morph and settle to `idle`; a further activation still works (**not bricked**); `aria-pressed` tracks the class; **zero** console errors.

#### Act 11 — SP-19's chain, `FM-20` and the 17-digit text (`6a0e842`)

`DMT N-15` **WITH** `FM-23` — they catch different things by construction (nothing-present vs present-but-mismatched, the one link emptiness misses) and **neither can fire on the shipped assets**: ⟨cmd⟩ over `sun.json`/`moon.json` → both `levels [1,2,3,5,8,12,18,25,35,50]`, `n_harmonics 50`, **every** `partial_sums` entry exactly **512** points. `FM-22` (= `FR-AH-53`) ⊘ with `HLG-43`'s hazard respected — only the EDGE dies, `pencil-boil` keeps two live consumers. `FR-AH-37` · `FMD-26`.

`FM-20` (= `FMD-1`) **lifted whole**: the ladder hard-coded 75/100 while both assets top out at 50 — two cells painted byte-identical paths to n=50, one click gave two highlight answers, the readout ran over a frozen glyph, and Export serialised an unhonourable `highLevel`. The ceiling is the **shape's own table**, named by the caller that knows which shape it is previewing, so a regenerated asset re-derives the UI domain (the pairing `FM-19`'s golden-file ask wants).

`FM-3` (= `FMD-10`) **WITH** `FMD-N6` and `DMT N-14`'s 2dp emission. ⊘ **The precision leg was landed WRONG first and re-landed**: rounding the INPUT points leaves full float64 in the emitted string, because the Catmull-Rom control points are computed FROM them — ⟨cmd⟩ browser, after the first attempt: `maxDecimals: 15`. Moved to emission; after: **2**.

**Measured at the built bytes**: strip cells **12 → 10** · identical paths **3 → 0** · High input `max` **100 → 50** · resident `d`-text **684,348 → 199,306 chars (−70.9%)** · the toggle's per-frame `d` **57,029 → 19,972 (−65.0%)** · decimals **17 → 2** · zero console errors.

#### Act 12 — `FR-AH-7` ⊕ `FR-AH-24 · L-14` (`afc40b4`), and a banked claim falsified

The static `@/lib/easings` edge put the easing catalog on every route's boot path; `getEasingFn` is needed inside `morphTo` alone, which already awaits a dynamic import, so it rides that same window. ⊘ **CURE-COMPLETENESS is the half that matters**: striking the import alone would have left the colocation re-export beneath it re-creating the identical static edge — that re-export is `FR-AH-24 · L-14`'s independent leg, its surface is `EASING_PRESETS`/`EASING_PRESET_NAMES` + two types and **not** `getEasingFn`, and it had zero consumers.

⊘ **`FR-AH-7`'s banked claim is FALSIFIED and recorded, not smoothed.** The row books this edge as the reason `vendor-math` rides the eager bundle. Measured after the cut: the easing chunk **leaves** the eager set (six modulepreloads → five; entry chunk **493.49 → 485.03 kB**) but **`vendor-math` is STILL eagerly preloaded**, on an independent and deliberate edge — `lib/colors.ts` imports `@mkbabb/value.js/color` and `/css`, and `main.ts` calls `installVizColors()` before mount precisely so no child wins the palette race. That file is outside this unit's writable set; the residue is named for `.f`/F.W5 and is **not half-landed here**. `FR-AH-19` in the same commit.

#### Act 13 — `no-duplicate-imports` (`e365203`)

Three of the eleven are on this unit's files; **one of the three was minted by this seat** two commits earlier and is recorded that way rather than folded into the other two. **11 → 8**.

#### Act 14 — E13 mail (this seat's own act)

⟨cmd⟩ `grep -nE '\| *UNREAD' docs/tranches/V/coordination/INBOX.md` → **no output — 0 UNREAD in scope.** No row minted; this unit corresponds with no sibling repo directly. The **two producer rows it surfaced** are named for `.z`'s SS-6 relay letter at *Residuals* and are authored as frontend hacks nowhere.

#### Gate readings, BEFORE → AFTER (this unit's contribution)

| gate | BEFORE (seat 0 / `.g`) | AFTER (this unit) | reading |
|---|---|---|---|
| `G-F4-CENSUS-CELLS` | RED — no correction landed for any of the six named cells | **one cell CLOSED** (still RED overall) | `raw-findings.json:1393` corrected by dated addendum **A-a-1**, in the same act as `FMD-22`'s PRM edit. The other five belong to `.b`/`.c`/`.e` |
| `G-F4-PRM-CLOCK` | RED — 5 ungated clock owners | **the morph clock GATED** (still RED overall) | `morphTo` consults PRM and seeds the TERMINAL frame; browser-verified in the reduced arm. The other four (`stores/animation.ts` · `useScrollNavigation.ts` · `useCanvasHover.ts` · `ConvergencePlot.vue` · `useCurveTransition.ts`) are `.b`/`.c`/`.e`/`.f`'s |
| `G-F4-CONTRAST-FLOOR` | RED — 24 L / 12 D of 34 pairs | **22 L / 10 D of 38 pairs** | 4 pairs ADDED by this unit (`FMD-18`, `FMD-19`, `DMT M-2[sun]`, `DMT M-2[moon]`) and **all four pass in both arms**; `HLG-37`'s two boundary pairs cured in both arms; `DMT M-2` moved out of `PAIRS_AWAITING_THEIR_OWNER` (7 → 6). ⊘ **`HLG-37[grid-cell-fill]` stays RED BY DESIGN** — `--card` ≡ `--background` in the light arm (1.035:1 measured, banked 1.000 reproduced) is a producer palette fact and rides the SS-6 relay, not a frontend hack |
| `G-F4-DEAD-DEP` | RED on the remainder | **advanced, still RED** | deleted with zero-consumer proofs: the `catmullRomToBezier` edge (⊘ package retained, `HLG-43`), `xyToPoints`'s export, `updateField`, the easings barrel re-export, `useWorkspaceStore()`, the `--slider-scrub-*` block, two Button re-skins, `.btn-icon`. Bundle diff recorded at Act 12 |
| `G-F4-VUE-TSC-CLEAN` | RED — **18** diagnostics | **RED — 17**, and **zero are this unit's** | `AppHeader.vue(49,7)` cured; the remaining 17 are `.b`/`.c`/`.e`'s |

**Unmoved by this unit, recorded so `.z` reads no drift**: `G-F4-VITEST` **28 assertions, 4 files, all passing** before and after · `G-F4-NO-UNUSED`'s ESLint leg **11 → 8** errors · axe serious/critical at the built bytes, six routes: `/paper` **CLEAN** · `/morph` **CLEAN** (was 4 `button-name` + 5 `label` across the two morph routes) · `/demo/shape-extractor` **CLEAN**, `<main>` horizontal overflow **97px → 0** at 375×667 · `/visualize` **CLEAN** · `/equation` 1 `button-name` (`.b`'s) · `/gallery` 2 `aria-hidden-focus` (producer) + 1 `button-name` (`.d`'s). ⊘ The two `500`s in the console log are the dead `/api` proxy with no backend at this seat — the environment artefact `.g` declared, not a code error, and `G-F4-ZERO-CONSOLE`'s five hook specs were not touched.

#### Commits

| hash | repo | paths | meaning |
|---|---|---|---|
| `e4599ec` | fourier | `index.html` · `style.css` · `AppHeader.vue` · `FourierMorphDemo.vue` · `MorphShapePreview.vue` · `HarmonicLevelGrid.vue` | SP-6 — the ONE cascade decision |
| `a3f1fc2` | fourier | `style.css` · `index.html` | SP-10 — the CM identity, ruled |
| `6b628a5` | fourier | `style.css` | `G-15(b)` — the root-size fork |
| `2e41c00` | fourier | `style.css` · `AppHeader.vue` · `DarkModeToggle.vue` | `FM-2`'s ring rider ⊕ `DMT N-5..N-9/N-16` |
| `f32e912` | fourier | `DarkModeToggle.vue` · `HarmonicLevelGrid.vue` · `e2e/contrast-pairs.ts` | SP-3 — the palette re-route |
| `e022edf` | fourier | `useFourierMorph.ts` · `router/index.ts` | SP-4 — the PRM gate |
| `fff145da` | value.js | `docs/tranches/X/fourier/F-W4-ADDENDA-a-2026-09-18.md` | the dated addenda-beside (A-a-1's half of the lock) |
| `5081b37` | fourier | `FourierMorphSvg.vue` · `MorphShapePreview.vue` · `DarkModeToggle.vue` · `HarmonicLevelGrid.vue` · `MorphPhaseConfig.vue` · `e2e/paper-performance.spec.ts` | SP-7 — the `/morph` BLOCKER ⊕ the locator rider |
| `362b210` | fourier | `FourierShapeExtractor.vue` | §2.K's FSE rows |
| `0a5c028` | fourier | `useFourierMorph.ts` · `DarkModeToggle.vue` · `FourierMorphDemo.vue` | the epoch/cancellation family |
| `6a0e842` | fourier | `svg-fourier.ts` · `useMorphConfig.ts` · `HarmonicLevelGrid.vue` · `FourierMorphDemo.vue` | SP-19's chain ⊕ `FM-20` ⊕ `FM-3` |
| `afc40b4` | fourier | `useFourierMorph.ts` · `AppHeader.vue` | `FR-AH-7` ⊕ `FR-AH-24 · L-14` ⊕ `FR-AH-19` |
| `e365203` | fourier | `useFourierMorph.ts` · `HarmonicLevelGrid.vue` · `FourierMorphDemo.vue` | `no-duplicate-imports` |
| *(this line's own)* | value.js | `docs/tranches/X/execution/C/F-W4.md` | this receipt |

⟨cmd⟩ `git show --name-only --format=''` on each returns **exactly the listed paths** — no sibling seat's staged bytes swept in. ⊘ `6a0e842` was **amended once** before anything landed on top: an unquoted backtick in the first message let the shell substitute two words out of one sentence. Disclosed rather than left as a silently short receipt.

#### Same-commit families — discharge register

| family | discharged |
|---|---|
| `FMD-18` ⊕ `19` | ✔ `e4599ec` (gutter + state order) and `f32e912` (the tokenised bound colour) — ⊘ **split across two commits by MEANING**, structure and contrast; both landed, neither half shipped alone |
| `FMD-22`'s PRM edit **WITH** `FR-AH-31`'s path-qualified census correction | ✔ `e022edf` ⊕ `fff145da`, **one act in two repositories** (a single commit is impossible across the seam); each names the other. The MAJOR regrade does **not** reopen |
| `DMT N-2`'s label **WITH** the e2e locator | ✔ `5081b37`, one commit, and the locator is the tree's only one |
| `FR-AH-23`'s palette **BEFORE** `DMT M-2` and the SUN/MOON re-route | ✔ `f32e912` — one expression carries all three |
| `FR-AH-8`'s cancellation **WITH-OR-BEFORE** `DMT M-1`'s watcher | ✔ `0a5c028`, one commit |
| `HLG-41`'s two dead `:style` deletions **BEFORE/WITH** the `cssVarToHex` cure | ✔ **discharged by predecessor** — both bindings already absent and `cssVarToHex` already gone (F.W2). Recorded at addenda §2 |
| `FM-3`'s memo **WITH** fixed precision | ✔ `6a0e842`, one commit (the precision at emission, per the re-landing above) |
| `DMT N-15`'s `size===0` throw **WITH** `FM-23`'s UNIFORM-LENGTH assertion | ✔ `6a0e842`, one commit |
| `M-10`'s RNG rider with EVERY `L-B1`/`L-B2` cure | ✔ **vacuous and stated** — no `L-B1`/`L-B2` cure was attempted, so the rider has nothing to travel with and the canonical sun cannot re-roll |

#### Residuals and escalations

- **ESCALATION — ONE, and it is a bounds seam, not a block (A-a-5).** `MorphPhaseConfig.vue` and `MorphShapePreview.vue` are in **`.a`'s writable set** while their `MPC-*` and `FR-MSP-*`/`MSP-*` rows are in **`.c`'s sections**. `.a` wrote only its own sections' rows on those files (`FMD-14`, `FMD-15`, `FMD-3`, `FMD-N3`, `FMD-27`); the `MPC-*`/`FR-MSP-*` rows are **NOT landed and NOT dropped**. ⊘ **`MPC-31` is declared a ONE CUT spanning F.W1+F.W4 — it cannot be half-landed across a bounds seam.** ⊘ A second face of the same seam: `.g`'s contrast registry names **`owner: ".a"`** on `FR-MSP-7` (measured today at **1.038 L / 1.086 D**, the banked figures reproduced), which the unit plan gives to `.c`. **Asked of the orchestrator**: either a dated bounds addendum moving the two files into `.c`'s writable set, or a dispatch giving `.a` those sections. Either resolves it; neither seat should widen its own bounds.
- **Residual 1 — carried to `.c`**: `FM-2`'s ring rider at `ImageUpload.vue:200` (`outline: 2px solid var(--ring)`, invalid and dropped). One token swap to `--focus-ring-color`.
- **Residual 2 — carried to `.d`**: the same at `GalleryCard.vue:222` (`border-color`) and `:223` (a `color-mix` over it) — the card's focus affordance is **doubly** absent.
- **Residual 3 — carried to `.f` / F.W5**: `FR-AH-7`'s banked claim that the easings edge is why `vendor-math` is eager is **false**. The live edge is `lib/colors.ts`'s `@mkbabb/value.js/color` + `/css`, held eagerly **by design** (`installVizColors()` before mount). Whether that 307.58 kB cluster can be deferred without losing the palette race is a real question this seat did not answer and did not pretend to.
- **Residual 4 — carried to `.f`**: `FMD-22`'s second half, the false `scheduler.ts:13-15` off-screen-gate comment. `lib/scheduler.ts` is Shared, outside this unit's set.
- **Residual 5 — carried to `.z`, for the SS-6 relay letter**: (a) **`--card` ≡ `--background` in the light arm** — the `HLG-37[grid-cell-fill]` 1.000:1 separation is a producer palette fact no consumer edit can cure without re-minting a token app-wide; (b) **`@utility cm-serif` reads `var(--font-serif-math, serif)` against a variable glass-ui never declares**, so it silently no-ops for every consumer that does not know to declare it (`FR-AH-2`'s own GLASS-RELAY ask, now measured at 8.0.0).
- **Residual 6 — carried to `.z`/SS-13**: figures this wave POSES rather than answers — `FM-21`/`FR-AH-16`'s scaling-system owner (§3 D10, F.W0-adjacent; the 768×1024 coarse witness) and `FMD-16`'s `--ui-scale` coarse-growth residue (⊘ its banked *overflow* premise is dead at 8.0.0 — addenda §2).
- **Residual 7 — carried to `.z`**: **§3 D7 (`HLG-35`) is POSED, not answered.** `.i` ruled it DEFERRED-WITH-DEFAULT and §3 forecloses a rename in terms; this unit renamed nothing, collapsed no domain and adopted no two-thumb range. What it did land (`HLG-37`'s boundary contrast, `FMD-18`'s state order) survives whichever way D7 falls.
- **Residual 8 — carried to F.W9/W10 and `.z`**: `FR-AH-1`'s BLOCKER (async boundary + per-shape field/level prune, ~450 kB of eager JSON) is **NOT landed**. `FM-20`'s cure removes the *domain* lie above level 50 but not the *payload*: the eight ballast levels still ship. ⊘ `HLG-44`'s `--minimal` regeneration — the cheapest form of that cure — is **blocked by ruling** behind `FSE-L-B1`'s provenance decision and `FM-19`'s FROZEN-FOREVER (§0j.D `G-15(c)`), so the prune cannot be taken by regenerating and must be taken at the reader.
- **Residual 9 — carried to `.z`**: §2.F rows this unit did **not** reach, named so the closure gate counts them rather than inferring them — `FR-AH-3`(+`-44`/`-56`) the route→tab source · `FR-AH-4` · `FR-AH-6`'s collapse (F.W5's) · `FR-AH-10`(+`-17`) real-sticky-or-drop · `FR-AH-12`(+`-18`) · `FR-AH-14` (nav landmark + skip link) · `FR-AH-15`(+`-55`) · `FR-AH-26` · `FR-AH-43` (SS-13 readback FIRST) · `FMD-4`'s BLOCKER (the starved duration slider at 640-767) · `FMD-7` (ONE config home) · `FMD-8` · `FMD-N4`⊕`N-2` · `FMD-N5` · `FMD-N1` · `FMD-12` · `FMD-23`'s clipboard arm · `FMD-24` · `FMD-30`..`34` · `HLG-13`'s degenerate-range find · `HLG-14` · `HLG-21` · `HLG-25`/`26` · `HLG-42` · `FM-4..FM-16`'s band (⊘ **the band is LIFTED but NOT swept**: its members' mechanisms are re-derived per-id at wave-open by the record's own terms, and `FM-14`'s split disposition is **STATED not merged** — the F.W3 leg is cited, never booked here) · `DMT N-1`'s flash-rewind · `N-10`/`N-11`/`N-12`'s remaining halves · the FSE rows beyond Act 9 (`D-3`..`D-7`, `L-M6`, `L-i1`, `M-6`).
- ⊘ **`G-F4-NEG-ROSTER` held throughout**: no §2 cure, ledger row or census cell grew a leaf on a §0a component; `GM-19` was never certified; the CP KILL-6 migration was never executed; `moon.json` was never regenerated.

### `.c` — the `/visualize` + `/morph` authoring surfaces, the transport cluster and the two docks

**Seat**: `.c`, `claude-opus-5[1m]`, 2026-09-18. **Status: PARTIAL** (every act below landed and measured; three escalations returned, never dropped; the unbooked residue is enumerated at *Residuals*).
**Commits**: 8 fourier (`714b758` `9c7a1b6` `24b81ff` `e005f82` `1a59f16` `5696c4a` `a6fdc7b` `3f47dcb`) + 2 value (the addendum ⊕ this receipt) + the ledger row.
**Addendum-beside**: `docs/tranches/X/fourier/F-W4-ADDENDA-c-2026-09-18.md` — **nine entries**, `A-c-1..A-c-9`, of which **three are ESCALATIONS**. `F-W4.md`, the registry and the canonical are byte-untouched (**E-3**).

#### Act 0 — CRASH-RECOVERY sweep (standing law): nothing inherited

⟨cmd⟩ `git status --porcelain` in `/Users/mkbabb/Programming/fourier-analysis` → **no output**, branch `m/w1-bump-migration`, HEAD `e365203` (`.a`'s last). In value.js, **zero dirty paths inside this unit's writable set**: the 13 dirty rows are `demo/**` (unowned), `V/reformation/CARRY-LEDGER.md`, `X/execution/A/X-W3.md` (Track A), `LEDGER.md` (concurrent, edited by minimal in-place replacement only) and `scripts/dev/dev.sh` (**never staged, never touched**). No killed predecessor's work existed to inherit; nothing was stashed or restored.

#### Act 1 — anchors verified at the true bytes BEFORE any write

⊘ The dispatch's `§4`/`§5` coordinates are **§-relative offsets, not absolute** — the class `.i` banked at `DECISIONS-F.W4.md` §6.1 and this seat did not re-discover it the hard way. INTENT taken at the true bytes: `G-F4-DERIVER` **`:384`** · `§5.1(3)` **`:400`** · `§5.2`'s twin seam **`:408`**; `§1`'s EVALUATE-SCOPE bullet at **`:74`** is absolute and resolved exactly. Full treatment at **A-c-9**, where the `fr-SpeedSelect` anchor table is the one in this unit's set that survived the uplift **with zero drift** — eight of eight exact, published as a receipt rather than omitted for being negative.

#### Act 2 — the INVERSION LOCK, both faces, ONE commit (`714b758`)

The lock ordered first, and it inverted under measurement — **the most consequential finding of this unit, treated as a finding and not as a re-scope**.

⊘ **`fr-CanvasControlsDock M-2`'s booked consumer cure — *"focusable summary content"* — would, at 8.0.0, CREATE `fr-EditorControlsDock B-2`.** The producer shipped the half both relay letters asked for: the collapsed summary layer is now the disclosure itself (`role="button"` · `tabindex="0"` · `aria-label="Expand dock"` · `aria-expanded` · `aria-controls`, gated on `interaction === "auto" && pole === "summary"`), its `focusin` is `withModifiers(() => {}, ["stop"])` — **B-2's trigger edge, severed at the producer** — and its Enter/Space handler expands and then `(fullLayer.querySelector(focusable) ?? fullLayer).focus({ preventScroll: true })`, which is *"move focus into the expanded layer on expand"* verbatim.

⊘ **A probe that would have read GREEN-BY-TYPO, named so no successor inherits it**: the record's `grep keydown dock.js → 0` still returns **0** at 8.0.0 — the compiled bundle spells it `onKeydown`. The handler exists. The gate would have passed on a lowercase miss.

**What was left was a consumer defect the producer's cure creates, in exactly one file**: a `role="button"` host may not contain interactive content, and this dock's `#collapsed` did. Landed: the ECD Save moves `#collapsed` → **`#persistent`** (the never-inert region the producer renders *outside* `.dock-layers`, present at both poles), taking the point-count badge and retiring the expanded row's duplicate; the summary keeps a non-interactive identity glyph. `S-4`/`M-9`'s design fact is **strengthened, not traded** — Save is now reachable in *every* state. On the CCD face the correct content is what was already there, so `M-2`'s consumer arm becomes its other half, `D-9/C-15 ⊕ L-22`: each collapsed glyph is conditioned on the state it stands for (the Pencil no longer advertises an Edit the expanded dock may not have), the view-dot rides the summary, and `M-7`'s two hard-coded opacity utilities become `--opacity-icon-muted`. Full treatment + the pasted producer bytes at **A-c-5**.

#### Act 3 — `CP-ROW-40`, the single cure, and a claim upgraded from characterisation to arithmetic (`9c7a1b6`)

⟨cmd⟩ (double-run, **before** any write) `md5` of `ContourPreview.vue:19-25` and of `ContourEditorCanvas.vue:60-66` → **`b9bf953f46449d13d580f251f7f57ba8`** for BOTH. Row 33's *"whitespace-identical clone"* is a **hash equality**, not a reading.

`contourBounds(points, margin)` extracted into `lib/contourEditing.ts`, returning the box, the per-axis pads and the Y-flipped viewBox, and screening non-finite input. It closes **row 7** (the X-derived pad spent on both axes — past h ≳ 15.8·w the extreme vertices clipped against the SVG root's `overflow: hidden`), **row 17** (no degenerate-extent floor — a zero X extent emits viewBox width 0, which the spec says *disables rendering of the element*), **row 28-client** (one non-finite coordinate blanked the preview in silence, because an invalid viewBox is simply ignored) and **row 33**. `CP-33` folded onto it, never re-booked. `CP-36`'s dead `tension` knob deleted with it (it was also `contourEditing.ts(20,53)`).

⊘ **Two of three callsites rewired; the third is inside the EVALUATE-ONLY lock** → **A-c-2**. `PathPreview` is the sharper of the two landed: it already had the `|| 1` floors but no finite screen, and there a single non-finite coordinate poisons `Math.min` to `NaN`, every projected point stringifies `NaN,NaN`, and the `<path d>` is discarded — a blank tile on the gallery's densest surface with nothing in the console. ⊘ Its **uniform-scale** framing is its own contract and was NOT flattened into the per-axis form; the extraction supplies the box, the floors and the screen, and the projection stays local.

**`G-F4-VITEST`'s `contourBounds` rider**: `web/e2e/unit/contour-bounds.vitest.ts` at `.g`'s ruled runner home, **7 tests, every one a booked row rather than a paraphrase of the implementation**. ⟨cmd⟩ `npm run test:unit` ×2 at this seat's clock → `Test Files 5 passed (5) · Tests 35 passed (35)` (was 4/28). ⊘ **The whole-suite total is a MOVING figure and is banked as dated, not as a standing fact**: `.b` runs concurrently in this group and a re-run minutes later reads `36`. The stable claim is this unit's own — **one new file, seven passing tests, all `contourBounds`** — and a successor re-runs the suite rather than inheriting either total.

#### Act 4 — SP-4: the clocks that started themselves (`24b81ff`)

⊘ **M-D1's TERMINAL-FRAME LAW is the whole content of this act.** Gating `playing` at mount freezes an epicycle drawing at t = 0 — the state in which nothing has been drawn — so the "accessible" arm would hand a reduced-motion reader a blank instrument and call it an accommodation.

- **`AC-D-8 / C-19`'s auto-start half** (`useWorkspaceLoader.ts`, the row's own second evidence home): the reduced arm **seeks t = 1**, the converged trace, and leaves the clock stopped. Same information, delivered as a static image. ⊘ The rAF loop itself is `stores/animation.ts` — **`.f`'s file** — and is **declared, not written** (**A-c-8**).
- **`useCanvasHover.ts`'s two clocks** (hover-scale ease + shimmer), both inside these bounds, both named at the wave record's open as ungated owners: the ease **SNAPS to the terminal scale and repaints once** rather than freezing mid-ease (the same law in its general form); the shimmer, being pure decoration over an already-legible label, draws the hovered state once and starts no clock.
- **`AC-M-8`** — `.mini-fill`'s `transition: width 0.1s linear` **deleted**, not shortened: `width` is rewritten every rAF tick, so a 100ms transition retargeted every ~16ms **never once completed**. The collapsed dock's only position readout was structurally ~100ms behind the clock it claimed to report, and the browser ran a live interpolation for the whole playback to achieve that.
- **`AC-M-12`** — the two 60Hz readouts **isolated into their own render scopes**. Both dock layers are always mounted, and the template read `anim.t` directly in two places, so the parent's render effect re-ran the entire two-branch vnode tree sixty times a second beside two Canvas2D surfaces. ⊘ Components and not `v-memo`: the cure has to be a render **boundary**, and memoisation still runs the parent's render.
- **`AC-M-7`** — the three child transitions (`EasingPicker` ×2, `GlassTimeline` ×1) tokenised and PRM-gated; they are the surfaces that extend D-8's inventory from six to eight.

#### Act 5 — SP-9 on the 8.0.0 arm (`e005f82`)

Every literal that opted a control out of the ladder it belongs to, deleted.

- **`SS-D-01 / SS-L-04`** — the two fixed WIDTHS. `0.25×` and `0.5×` lost 60%+ of their glyphs silently and **mid-character**: ~24px padding + ~16px chevron leaves 16px of a 56px box for a 42px label, and `line-clamp-1` compiles to `-webkit-box` + `overflow:hidden`, whose ellipsis fires only on a wrap `white-space: nowrap` forbids. **Deleted, not enlarged** — a content-sized trigger cannot be too small for its content, and the `size` props that would have carried a fix are dead at 8.0.0, so the deletion is the only leg schedulable under either ESC-1 branch.
- **`SS-D-02 / SS-L-02 / SS-C-5`** — the two literal HEIGHTS, which opted the control out of `max(calc(2.5rem · --ui-scale), --control-floor)`: 36px painted against a cohort at 67.5px below 640px, where the compact form is the **only** speed control on the surface.
- **`SS-D-04/C-3` ⊕ `SS-D-05` ⊕ `SS-D-06` ⊕ `SS-D-03-demoted/L-03` ⊕ `SS-D-10/C-14 + MISS-PILL`** — `var(--font-mono)` (family-only, NOT `text-mono-small`; this app deliberately does not restate the token, so the producer's Fira Code **with its zero-payload metric-matched fallback face** resolves); `@apply text-sm` deleted so the `--control-text` comfort chain returns; `backdrop-filter` reset on BOTH longhands (the hand-roll stripped the two cheap `.control-surface` declarations and orphaned the two expensive ones, leaving a live `blur(8px · --glass-level)` on a transparent element); and the compact block — which was the producer's `.input-pill` register transcribed **by value**, with the border alpha frozen at the producer's stale *prose* figure (~15%) instead of the shipped token (19%) — replaced by the register itself.
- **`CCD-D-5/L-7/C-7` (+D-13/D-14) ⊕ `ECD-D-10/L-4`** — **both** icon-size idioms, in both docks, one edit, because they are inverse failures of one cascade. CCD pinned glyphs with utility CLASSES (`@layer utilities` **beats** the producer's `@layer components` `.dock-icon-button > svg` rule) — a real freeze, out of the `--dock-scale` ladder including its coarse re-declaration, glyph/plate 0.385 vs the system's 0.50. ECD used `:size` presentation attributes, which **lose** to the same rule and did nothing at 14 of 15 sites. ⟨cmd⟩ `:size` bindings in ECD **15 → 0**; `h-4.5 w-4.5` in CCD **5 → 0**. The mechanism re-verified at 8.0.0 (**A-c-9**'s census-cell row).
- **`FV-8 ⊕ FV-12 ⊕ FV-13 ⊕ FV-22 ⊕ FV-14`** — one block, four readings of one decision. ⊘ `FV-8`'s corrected mechanism is the sharp half: the local rule set `transform` while the producer's press seat is the `scale` **longhand**, so the two did not override — they **COMPOUNDED** into a press deeper than either author specified. `FV-12` is the same declaration surviving the PRM blanket twice (the `.tap-squish:active { scale: 1 }` reset cannot reach a `transform`; the blanket strips `transform` from the *transitioned* set, un-animating the jump without removing it — **motion reduction inverted into sharpening**). `FV-22`'s `calc(var(--z-fullscreen) + 10)` minted an unnamed rung numerically equal to `--z-toast` **inside the backdrop's own stacking context**, where any positive value orders identically. `FV-14`'s `flex:1; min-height:0` deleted — both children declare the pair on their own roots — while the **chrome strip is kept**, which is the genuine design judgement the record credits.

#### Act 6 — SP-7: eighteen controls get names of their own (`1a59f16`)

`ECD-C-3`'s twelve channels + `CCD-1`'s six attributes. The author's rule was tooltip-XOR-label, stated with perfect consistency — and a tooltip supplies `aria-describedby` **only while open**: a description, never a name, and reka's tooltip is touch-excluded, so below 768px it was no label for anyone. Both Saves were among the unnamed. ⊘ Names are **transaction-stable** (`FR-MSP-10`'s NAME-CURE LOCK read as a principle, not just as its own row): the Save reads `"Save contour"` in both states and the status rides the glyph, because a name that inverts at activation is worse than none. State is carried by `DockControl`'s `active` → `aria-pressed`, which is where it belongs. ⊘ The Tooltip shim was **NEVER deleted** (§2.L) and its import was not re-pointed — that leg is F.W3's.

Riding, and they are the reason this is one commit: **`ECD-M-6`** (trigger and slider both named "Magnet radius" — indistinguishable disclosure-vs-value in an AT control list; the trigger becomes "Magnet options"), **`ECD-M-7`** (`.is-save.saved`'s unlayered `color` beat the layered hover unconditionally, so in the saved state the plate retinted toward `--viz-fourier` while the glyph stayed `--success` green — a half-hover no one authored, on the control users hover to confirm; the saved state now owns both registers), and **`ECD-M-5` ⊕ `CCD-M-8`/`C-9`** — **one glyph per meaning across BOTH docks**, which they need because they swap in place over one canvas on the `isEditing` flip and read as one surface: `Wand2` was the editor's identity mark AND its Smooth action one gesture apart (Smooth → `Sparkles`); `Eye` was the overlay MENU trigger and the ghost-ON STATE glyph, so the trigger painted identically in all four overlay states, while the sibling spelt the same toggle `Spline` (both are `Spline` now); and `import { Image }` shadowed the global (`C-17`) for a glyph lucide also exports as `ImageIcon`, which the sibling already imported.

#### Act 7 — SP-6: the scoped rules that beat the library (`5696c4a`)

- **`ECD-D-9/L-8` (+D-26) ⊕ the CCD twin** — both scoped `.dock-separator` rules deleted and **`<DockSeparator>` adopted**. Scoped styles are UNLAYERED, so both beat the producer's `@layer components` rule unconditionally: the hairline lost the library's `0 0.375rem` margin, re-based its tint off a local `color-mix` instead of `--dock-hairline` and its dark-arm re-base, and forfeited `role="separator"` + `data-orientation`. The drift was visible on one stage — the CCD copy carried `margin: 0 0.125rem`: **two docks, one canvas, two hairline rhythms**. ECD's `.dock-spacer` shadow went with them.
- **`ECD-D-18`** — `gap-2`'s fixed 0.5rem against `--dock-layer-gap` (0.375rem × `--dock-scale`): 33% wide at 1×, frozen on touch. ⊘ Its banked cure was *"discharged for free by INFO-3's `DockLayerGroup` adoption"*, and **that premise has MOVED at 8.0.0** — the primitive is now a `role="tablist"` face-switcher composing `<DockCrossfade>`, and this dock has ONE face, so adopting it would mint a tablist over a single tab to obtain a gap. The defect is cured in the row's own terms instead: the token, directly. Full treatment at **A-c-4**.
- **`VV L-17 / D-16 / MIN-3`** — the five-declaration dead-CSS census, each with its zero-consumer proof: `.controls-overlay { overflow: visible }` restated the initial value AND its evident intent is defeated by two ancestors, making it **simultaneously inert and a false "escape permitted" signal** — the expensive half; the three `.expand-pop-*` rules styled a `<Transition>` no template node carried, their `transform` leg consuming `--ease-apple-spring`, ⟨cmd⟩ `grep -roh -- '--ease-apple-spring' node_modules/@mkbabb/glass-ui/dist | wc -l` → **0**; `.viz-grid` the same shape.

#### Act 8 — §3 `D8`, RULED DELETE WHOLE (`a6fdc7b`)

Landed as **ONE block**: the rule, the `magnet-slider-track` class, the `:style` `--track-color` binding, the `VIZ_COLORS` import edge and both stale `glass-scrubber` comments — `C-13` and `C-22` riding, no leaf grown on the pure-CSS arm, and `D8`'s scope boundary honoured exactly (the other six `--slider-scrub` files are their own rows and this seat deleted none).

⊘ **The one sub-limb `.i` refused to inherit was re-earned here, as ordered.** K-8's *"even `width:100%` is a no-op (`w-full` is in the slider's cva base)"* was a 4.0.0 measurement and its probe does **not** reproduce (⟨cmd⟩ `grep -c 'w-full' dist/slider-gsc8jDIo.js` → **0**). Re-measured at the byte that governs today, double-run: `components/slider/styles.css` declares `.glass-slider { … inline-size: 100% … }`. **Zero visual delta holds at 8.0.0, by a different mechanism than the one banked** — evidence taken at this pin rather than inherited (**A-c-6**).

#### Act 9 — the hygiene legs (`3f47dcb`)

This unit's seven declared `G-F4-VUE-TSC-CLEAN` sites, **all seven cleared**: `BasisSelector.vue(11,7)` · `ImageUpload.vue(2,15)` · `VisualizationView.vue(2,25)` · `labels.ts` ×4 · `contourEditing.ts(20,53)` (which died with `CP-36` at Act 3). ⊘ `labels.ts`'s `width`/`height` were **deleted rather than voided**: both routines anchor to the top-left, so a destructure that exists to be ignored is a false claim about the drawing model. The two `no-duplicate-imports` sites `A-g-3` routes to `.c` (`useWorkspaceLoader.ts:2`/`:6`) cleared. ⊕ **`FM-2`'s ring rider, the site `.a` named and handed over**: `ImageUpload.vue`'s `outline: 2px solid var(--ring)` — `--ring` is declared in no tree at the adopted pin, so an outline with an undeclared `var()` colour is invalid at computed-value time and **dropped**; the rule whose only purpose is a focus ring was painting none. Now `--focus-ring-width`/`--focus-ring-color`, the producer's own registers.

#### Act 10 — the EVALUATE-ONLY judgement, and NO byte written (**A-c-1**)

`BasisCanvas.vue` and `ContourEditorCanvas.vue` judged and **neither written**; bounds not widened. Every reading double-run, both runs identical.

**All four `fr-ContourEditorCanvas` BLOCKERs REPRODUCE at the live bytes**: `D/B-3·L-1·C-1` (`:210` window-scoped keydown, no target/focus/mode guard, in a component that is hidden-not-unmounted with live editable fields co-mounted) · `D/B-5·L-2·C-3` (`FullscreenViewer` mounts a **second** editor with no ref and no listeners while saves read only the inline one — and this seat re-confirms at the **cured** bytes that `CanvasControlsDock` still renders Edit and Fullscreen outside the `v-if="!isEditing"` template, so fullscreen-while-editing is one click) · `D/B-6·L-3·C-4` (`:42` destructures `onPointerUp` **raw** on the very line where its sibling is taken to be wrapped with `emitState()`; `emit(` appears **once** in the file — the drag path never emits) · `D/B-2` (**zero** `aria-`/`role=`/`@keydown` anywhere; a 100% pointer-only editing grammar the dock cannot rescue). Plus `ContourEditorCanvas.vue(42,9)` — the only `G-F4-VUE-TSC-CLEAN` diagnostic left in this unit's directory, one deletion, not taken — and `BasisCanvas.vue`'s **three** import statements from one specifier, `EP-MISSED-F`'s own shape. `BC-10/C-9`'s occlusion-blind observer is live, and §2.E's `L-18` fold fact is re-stated from the cured side: this dock's `toggleFullscreen` is still the sole entry into that state.

#### Act 11 — E13 mail (this seat's own act)

Six paths swept read-only (the four landing paths ⊕ the atlas P-lane ⊕ the fourier mail-ledger surface, COHESION §0k.1), delta against **19:00**: ⟨cmd⟩ `find … -newermt '2026-09-18 19:00'` → **∅ on all six**. ⊘ **A probe-shape correction, stated rather than repeated**: `grep -cE '\| *UNREAD'` returns **0** on these bytes and that reading is **FALSE** — the live cells are spelled `| **UNREAD 2026-09-17** —`. The classifying probe returns **three**: `I-32 · I-33 · I-34`, every one routed at its own Routing cell to X-W0.j / the X formation mail seat, and not one naming a `/visualize`, `/morph`, dock, transport or contour byte. **0 unrowed · 0 new `I-n` · 0 UNREAD in this unit's scope.** A dated sweep line appended at `INBOX.md`'s end (**pure append; no row edited, re-keyed or re-worded** — the E13-law act `.i` and `.g` each performed at their own close, disclosed here for the same reason). ⊘ **One GLASS-RELAY-shaped fact DECLARED, not sent**: `M-2`'s producer half reads as SHIPPED at 8.0.0 — item (ii) of the standing consolidated letter. A relay letter is the wave's act, not a unit's; the measurement is banked at **A-c-5** for `.z`.

#### Gate readings, BEFORE → AFTER (this unit's contribution; every AFTER double-run)

| gate | BEFORE (wave baseline) | AFTER | verdict |
|---|---|---|---|
| **G-F4-VITEST** (`contourBounds` rider) | `.g` GREEN with 4 files / 28 assertions; **no `contourBounds` subject** | **+1 file, +7 row-keyed `contourBounds` tests, all passing** (suite total dated, not standing — `.b` is concurrent) | **rider DISCHARGED** |
| **G-F4-VUE-TSC-CLEAN** | 18 diagnostics at open; **7 declared `.c` sites** | **7 total tree-wide, 0 of them this unit's**; 3 in `visualization/` are `.d`'s ×2 + the EVALUATE-ONLY file | **this unit's leg GREEN** |
| **G-F4-DEAD-DEP** | VV 5 dead declarations · ECD's dead retint unit · 2 idiom families · 2 no-op `:deep()` props | all deleted **with zero-consumer proofs in the code** (`--ease-apple-spring` → 0 · `--slider-scrub-*` → ∅ · both children declare the flex pair) | **advanced** |
| **G-F4-PRM-CLOCK** | 5 ungated clock owners; `AC-D-8/C-19` auto-starting | **`useCanvasHover`'s two gated** + the auto-start path gated under the terminal-frame law; `stores/animation.ts`'s loop **declared to `.f`** | **advanced, honest-RED** |
| **G-F4-CONTRAST-FLOOR** | `ECD D-5` 3.32 / `D-6` 1.97 (GLASS-RELAY `--success` light arm) | **NOT claimed by this unit** — the `--success` rung is the producer's; `.g`'s harness owns the reading | **unmoved, declared** |
| **G-F4-DERIVER** | `SliderControl`/`CollapsibleSection`/`SvgFilters` witnesses published by `.g` | **unmoved by this unit** — no loop, `:is` family or `url(#id)` edge added or removed on those three | **held** |
| **G-F4-CENSUS-CELLS** | 0 corrections landed | **6 cells falsified and corrected** by dated addendum-beside (A-c-4/5/6 + row 33's hash + the `:size` re-verification) | **advanced** |
| **G-F4-NEG-ROSTER** | obligation | `GM-19` never certified · CP `KILL-6` never executed · `moon.json` never regenerated · **Tooltip shim never deleted** · no leaf grown on any §0a component | **HELD** |

⊘ **`G-F4-CONTRAST-FLOOR` and `G-F4-DERIVER` are reported unmoved rather than claimed**: this unit's §2 rows on both are producer-owned (`ECD D-5`/`D-6`'s `--success` light rung is a GLASS-RELAY carry) or were already published by `.g`. A gate this unit did not turn is not credited to it.

#### Commits

| # | hash | meaning |
|---|---|---|
| 1 | `714b758` | the INVERSION LOCK — both docks, one edit, the producer's half read at 8.0.0 |
| 2 | `9c7a1b6` | `CP-ROW-40` — one bounding box, four rows, the clone proved identical at the bytes |
| 3 | `24b81ff` | SP-4 — the clocks that started themselves, and the reduced arm that shows the finished picture |
| 4 | `e005f82` | SP-9 on the 8.0.0 arm — every literal that opted a control out of its ladder |
| 5 | `1a59f16` | SP-7 — eighteen names, and the two docks stop disagreeing about what a glyph means |
| 6 | `5696c4a` | SP-6 — the scoped rules that beat the library, and five declarations nothing consumed |
| 7 | `a6fdc7b` | `D8` RULED DELETE WHOLE — the retint that never painted, gone as one block |
| 8 | `3f47dcb` | the `noUnusedLocals` sites, the two duplicate imports, and `.a`'s handed-over focus ring |

Pathspec on every commit; **`scripts/dev/dev.sh` in 0 of 8**; zero glass-ui bytes; zero writes to `waves/F-W4.md`, the registry or the canonical (**E-3**). Four sibling `.b` commits interleave in the log and **no path of theirs is in any commit above**.

#### Same-commit families — discharge register

`ECD-B-2 ⊕ CCD-M-2` (+`D-9/C-15` ⊕ `L-22` ⊕ `M-7`) → **`714b758`, one commit, both faces** · `CP-ROW-40` ⊕ `CP-33` ⊕ `CP-36` ⊕ rows 7/17/28-client ⊕ the vitest → **`9c7a1b6`** · `D8` + `C-13` + `C-22` → **`a6fdc7b`, one block** · `CCD-D-5/L-7/C-7` ⊕ `ECD-D-10/L-4` → **`e005f82`, both idioms one edit** · `AC-D-8/C-19` ⊕ `M-7` ⊕ `M-8` ⊕ `M-12` → **`24b81ff`** · `ECD-D-9/L-8` ⊕ the CCD twin ⊕ `D-18` → **`5696c4a`**. **No declared family split.**

#### Residuals and escalations

**THREE ESCALATIONS, all returned, none a block** (full text with measurements in the addendum):

1. **A-c-1 — the EVALUATE-ONLY surface.** Four BLOCKERs + two hygiene rows, live and measured, on two files this unit may only read. Ask: a dated bounds addendum, or an explicit routing to a later wave with the evaluate-only status restated. ⊘ The wave record predicted this at open (*"a wave cannot cure a row on a file it may only read"*); it is now measured.
2. **A-c-2 — `CP-ROW-40`'s third rewire**, inside that same lock. The cure landed and closes all four `ContourPreview` rows; what is deferred is the **deduplication** of a clone proved identical by hash. Four lines with the grant.
3. **A-c-3 — the morph bounds seam, the reciprocal face of `.a`'s `A-a-5`.** `MorphPhaseConfig.vue`/`MorphShapePreview.vue` are in `components/morph/`, outside this unit's grant, while their `MPC-*`/`FR-MSP-*`/`MSP-*` rows are in §2.K. ⊘ **`MPC-31` is declared a ONE CUT and cannot be half-landed across a bounds seam** — the brief ordered it second among this unit's acts, the bounds place its file elsewhere, and **the bounds govern**. One ruling closes both ends. ⊘ A third arm — splitting `MPC-31` across two seats — is named here so it is refused explicitly rather than by omission.

**Carried, named, not landed** (no leaf grown, no silent drop): `fr-ContourPreview D:m-6` — **unruled, `SS-3` decides**, and this seat owes the decider one changed fact: arm (b) was priced *"with row 40 or not at all"*, row 40 landed without it, so **the joint pricing window closed by execution** (**A-c-7**) · `CCD-D-4/L-1/C-3`'s Publish re-entrancy — ⊘ **not authored as if the error channel worked**; `fr-VisualizationView L-26` is F.W3's and the server arm F.W5's, both cited, neither booked (§5.2 twin seam (1)) · `fr-CanvasControlsDock C-28` cited, booked F.W5 · `fr-BasisCanvas M-β1`'s ramp — only `canvas-drawing/transforms.ts` is this wave's, three of four homes are F.W3's, and **a unilateral edit at either end leaves the 213°-vs-262° divergence intact**, so the constraint is stated and nothing half-landed (§5.2 twin seam (3)) · `AC-D-1`'s `--dock-max-inline-size` rename + `SW-1`'s CAP→FLOOR amendment + the dock scoped-block frame break (a **GLASS-RELAY** ask, never a frontend hack) · `ECD D-26` and `CCD-L-9`'s latent rider · `CCD-M-1`'s exit-after-save BLOCKER, `CCD-M-3`, `ECD-M-2` · the §2.D `AC-*`/`EP-*`/`ECP-*` MINOR sweeps and `SS-C-8`/`SS-L-09` · SS-13 flags **deferred, never resolved inline** (`AC-D-1`/`SW-1` · `MPC-31`'s cured scheme at a non-boot state · the coarse-factor readbacks · `CCD-D-8`/`ECD-D-4` · `ECD-D-3`'s readback).

---

### `.b` — the `/equation` route, whole (instrument + authoring surface)

**Seat**: `.b`, `claude-opus-5[1m]`, 2026-09-18. **Status: PARTIAL** (every act below landed; the residuals are named at §Residuals with why, and two contrast-registry rows are OWED to the path owner rather than written out of bounds).
**Writable set honoured exactly**: `web/src/components/equation/**` · `web/src/components/visualization/{CoefficientsPanel,EquationPanel}.vue` · `web/src/lib/equation/**` · `web/e2e/unit/curve-transition.vitest.ts` (`.g`'s ruled runner home) · `docs/tranches/X/fourier/F-W4-ADDENDA-b-2026-09-18.md` ⊕ this receipt. **⊘ Not one byte outside it.**

#### Act 0 — CRASH-RECOVERY sweep (standing law): nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅** (clean; branch `m/w1-bump-migration`, HEAD `e365203` = `.a`'s last).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 12 modified ⊕ 3 untracked, **none inside this unit's writable set**: ten `demo/**` SFCs and `CARRY-LEDGER.md` are sibling seats'; `scripts/dev/dev.sh` is the unowned standing-dirty path (**NEVER touched, never staged**); `docs/tranches/X/waves/evidence/` and the two `e2e/smoke/**a11y-control-targets.spec.ts` are Track A's.
**Zero inherited paths. No killed predecessor seat's partial work exists on this unit.**

#### Act 1 — anchors verified at the true bytes BEFORE any write

Every line coordinate this unit's rows cite has drifted (`EquationView.vue` reads **478** lines against the registry's 469). **INTENT was taken at the true bytes in every case and the class is recorded** — the drift table is §1 of the addendum, and no coordinate was used as an identifier.

⊘ **One bounds resolution, stated because it decided where a file could be written.** The dispatch's writable-set string is truncated mid-entry (`"web/src/... the snapshotForTransition test file at .g's ruled runner home"`). `src/lib/equation/**` is resolved to this unit by three independent readings that agree: the wave record's `.b` **Writable** line, §1 Bounds' **Equation** row (which names `lib/equation/*` in the same row that grants this unit its surface), and **this unit's own SP-18 LOCK**, which names `lib/equation/` as the singleton's required home. No other unit claims it. Files written there: `render.ts` (new) · `notation.ts` · `api.ts`.

#### Act 2 — the born-RED readings (double-run, before any write)

| gate / row | BEFORE (both runs agree) |
|---|---|
| **G-F4-KATEX-QUIET** | **4** `katex.renderToString` call sites, three byte-identical option triples, one omitting `trust`, three divergent fallbacks. ⟨cmd⟩ node, twice: a two-hook sigma render with `trust:true` and no `strict` → **`warns=2`** |
| **G-F4-VUE-TSC-CLEAN** (this unit's four sites) | `useCoeffHover.ts(22,5) notation` · `EquationView.vue(57,7) loading` · `FrequencyGraph.vue(2,43) onUnmounted` — **3** of the four; `BasisSelector.vue(11,7)` is `.c`'s. Tree total **17** |
| **G-F4-VITEST** | `Test Files 4 passed (4) · Tests 28 passed (28)` — no `snapshotForTransition` seam assertion for `L-M1` |
| **G-F4-CONTRAST-FLOOR** | `FR-CP-D1` and `EV D·D-B3` both in `PAIRS_AWAITING_THEIR_OWNER` with `owner: ".b"`; `FR-EQR-7[instance]` in `CONTRAST_PAIRS` at `rgb(34 197 94)`. Measured: axes **1.190 L / 1.370 D** · original curve **1.404 / 3.102** · tier inks **2.127 / 1.979 / 3.503 L** · success glyph **2.110 L** |
| **G-F4-PRM-CLOCK** | **2** rAF owners in this surface (`ConvergencePlot.vue` · `useCurveTransition.ts`), **0** consulting PRM. The autoplay clock started itself at mount |
| **G-F4-DEAD-DEP** | `FrequencyGraph`'s selection contract live with **zero** consumers — ⟨cmd⟩ `grep -rn "activeIndices\|toggle-harmonic\|hover-harmonic" src/` minus the file itself → **∅** |
| **G-F4-CENSUS-CELLS** | None of the six named cells is this unit's (enumerated at §Gate readings). Vacuously held, stated not assumed |

#### Act 3 — SP-18, the KaTeX singleton, FIRST (`4a770c2`)

The lock's own words: *four-site patching is an `FR-EQR-17` ESCALATION at wave-open*, so the singleton landed before anything else. `lib/equation/render.ts` carries **`FR-EQR-15`/`I-3`** (a trust **HANDLER** — `\htmlClass` only, over the closed class set the backend's four emission sites use, everything else refused; ⊘ never `trust:false`, which deletes the hover feature *silently*, and never a naive `() => true`), **`FR-EQR-16` ⊕ `fr-CP L-M8/C-9`** (`escapeHtml` in the one catch), **`FR-EQR-19`** (the `strict` callback), **`FR-EQR-4`** (`plainLatex()`). **`FR-EQR-18`**'s residue landed as the comment naming the four-file two-language contract at the DOM-owning component.

⟨cmd⟩ (node, twice) handler + strict silencer over a two-hook sigma render → **`warns=0 hooks_intact=true`**. The feature and the silence are both real; that pair is the whole of I-3's constraint.
⟨cmd⟩ `grep -rn "renderToString\|from \"katex\"" src/ | grep -vc "lib/equation/render.ts"` → **0**.

Riding the same `useCoeffHover` edit: **`L·m-2`** (the `notation` ref it never read), **`L·m-3`** (ONE fold, ONE epsilon — the second ±n fold with a `1e-10` against the canonical `1e-14` is gone, and `fr-CP L-m12`'s O(n²) `find` pair with it), **`L·m-12`** (one `MAX_ROWS`, so six harmonics stop promising a seventh).

#### Act 4 — the compute identity (`bfbc7ec`)

**`M-CK`** first, because it *binds* `B-1`'s cure: the key returned 4 fields while the POST carried 7, two of them response-determining, which is why **both** prescribed `B-1` cures reproduced `B-1` one layer down. ONE normalization seam (`currentRequest()`) now produces the body **and** the keys, which discharges **`R2-N5`** (the key read the untrimmed expression while the body sent the trimmed one) in the same stroke.

**`B-1` BLOCKER cured**: `notation` is in the compute identity, so the notation watcher routes through `doCompute` — the only operation that can refresh `latex_sigma`, since `/simplify` carries no such field on either side of the wire. ⊘ `budget` stays OUT and the comment states why the omission is **sound**: every response field is either keyed or repaired by the `doSimplify` the memo branch calls. **`L·m-1`**'s `force` memo comes alive as the budget-only cheap path — *after* the key fix, never before, exactly as the spec sequences it. **`L·M-3`**: the result record carries its own key, so a restore compares PROVENANCE instead of nullity and the corrective recompute that could never fire now does. **`C·D-04`**: both loaders shape-check between `JSON.parse` and the caller.

#### Act 5 — `B-2`, the budget bound (`b34226a`)

Three parts, none of them the slider-side clamp **`M-BR`** killed by enumeration (the restore path never passes through the slider): **`L·M-6`** deletes the rescale arm whose guard was a tautology and which IS the recurrence engine (`budget(v) = v − 10` on a monotone up-drag), keeping only the honest half and gaining `immediate: true` so a reload reconciles at all; the request seam clamps into `[2, 50]`, a local mirror of the server bound **until F.W5–W8 mints the shared constant, cited not booked**; **`FI-N-5`** clamps the Display-terms WRITE, so the control can no longer display a number the component will not send.

#### Act 6 — the error channel, ONE edit (`063975f`)

⊘ The lock is *"`EV-C·D-02` and its banner are ONE edit"*, because the two defects gate each other's reachability, and they landed as one. **`C·D-02`'s client half**: `title` falls back to an empty `statusText` over HTTP/2 and an empty string is falsy, so a real failure rendered as SILENCE; a failure names itself now whatever the envelope carried. **`D·D-B4`**: `loading` had zero consumers since it was written — it dims the stage and drives `aria-busy`, and doSimplify's terminal `/* silent */` catch gets doCompute's banner, which is the seam the user actually drives. **`L·m-10`**: any successful settle clears `error`. **`D·D-M6`**: `role="status"` / `role="alert"` / `aria-hidden` on the spinners, in ONE pass with the loading wiring as the record asks. **`D·D-M7`**: the message wraps and carries a `title` instead of truncating into nothing, and both error surfaces offer a retry.

#### Act 7 — SP-1, abort identity and teardown (`bc90680`)

**`L·M-2`**: a generation counter per abort key, so request A's `finally` stops clearing `computing` while B is in flight — the arm that dropped the template into the empty state mid-compute. doSimplify takes the same shape, because `D-B4` just gave `simplifying` the template consumer whose absence made its identical race consequence-free. **`L·M-7`**: `onScopeDispose(() => abortInflight([...]))`, with the two keys named once beside the calls that register them. ⊘ **`I-2` honoured**: the empty state is this defect's only visible symptom and was left standing, not cleaned up as an unused branch.

#### Act 8 — SP-4, the three plot clocks under the terminal-frame law (`1e40f02`)

⊘ **`M-D1` is the whole constraint and it is honoured literally.** Both prescribed gates freeze at `t = 0`, and at `t = 0` `easeInOutSine(0) = 0`, every `harmonicProgress` returns 0, every cursor is 0, the `cursors[hi] < 3` guard skips EVERY harmonic stroke and hit region, and the sum collapses to DC — a blank grid whose only escape is a keyboard-dead scrubber. **The reduced arm seeds `t = 1`, the TERMINAL frame.** The transition clock takes PRM as an **argument** rather than a media query (the module is pure and node-assertable) and settles at `progress = 1` — the NEW curve — and paints once. A user who presses Play still gets motion; what PRM gates is the clock nobody asked for.

**`L-M3 + D-26`**: an IntersectionObserver gate, because the mobile panel is `display:none` WHILE MOUNTED and a `display:none` element never intersects. **`L-B2`**: the store's two guards ported (the old `rafId !== null` predicate was untruthful because `tick`'s early return never nulled it) and `playing` cleared on unmount, the arm where an orphan rAF retained the whole closure. **`M-L7`**: the component's own PRM media block deleted — ⟨cmd⟩ glass-ui `utilities/a11y-overrides.css` opens `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:0.01ms !important;…}}`, so the one act of compliance was a no-op.

#### Act 9 — SP-3, the contrast pairs (`99aea3e`)

**`FR-CP-D1` BLOCKER**: theme-blind BY ENUMERATION, so three frozen greys painted the same pixels in both arms. The canvas already carries `text-muted-foreground`, so `getComputedStyle().color` hands back the USED value with `light-dark()` and the alias chain resolved by the engine — the sibling `FrequencyGraph`'s own in-tree probe, and the only form that follows a theme flip without a string-parsing guess. Hover moves to stroke WIDTH, which was always the second channel; the brightness step that used to carry it is what put the resting curve at 1.40.

⊘ **The `golden` limb is NOT cured and is NOT silently dropped**: `VIZ_COLORS.golden` is absent from `resolveVizColors`'s token list in `lib/colors.ts` (**`.f`'s**) and the shimmer paint lives in `lib/golden-shimmer.ts` (**in no unit's writable set**). The spec routes the swatch/shimmer JOIN through `fr-ConvergenceLegend C-2` as an **F.W2 edge**; the resolver line is declared to `.f` at addendum §3.

**`EV D·D-B3`**: three hard-coded sRGB triples bypassing the token layer, one import away from a `style.css` override that had already measured 3.54 as a failure. Routed through the app's ramp; the pill's plate goes transparent because a 15% tint OF THE INK darkened the ground under the colour it was tinting. **`FR-EQR-7` (instance)**: the success glyph leaves `text-green-500` for the same ramp — ⊘ adopting the producer's `--success` would have restated the defect in token clothing (it fails at 2.175 itself). **`L·m-7`**: `TIER_INFO` keyed by `EquationTier`, with the fallback the type system had proved dead surviving as a function, because the backend types `tier` as a bare `str`.

| pair | BEFORE | AFTER | floor |
|---|---|---|---|
| `FR-CP-D1` axes | 1.190 L / 1.370 D | **3.380 / 4.038** | 3 |
| `FR-CP-D1` original curve | 1.404 / 3.102 | **3.716 / 4.360** | 3 |
| `EV D·D-B3` symbolic | 2.127 L | **4.272** / 7.193 | 4.5 — ⊘ **0.23 SHORT, disclosed** |
| `EV D·D-B3` identified | 1.979 L | **4.532** / 7.715 | 4.5 |
| `EV D·D-B3` spline | 3.503 L | **4.527** / 4.851 | 4.5 |
| `FR-EQR-7` instance | 2.110 L | **4.272** / 7.193 | 3 |

⊘ The banked figures reproduce within 0.05 (the record's ground is `--popover`, this seat's `--card`); conclusions unchanged. ⊘ The `symbolic` residual is a PRODUCER row: no light-arm stop in the ramp clears 4.5 (the nearest, `--section-color-10`, is 4.239) and minting a local hex is the exact defect `D·D-B3` charges. It rides the GLASS-RELAY letter.

#### Act 10 — SP-5 ⊕ SP-7 ⊕ SP-8, and the `FR-EQR` hygiene sweeps (`2394f9a`)

**`D·D-B2`** ×2 (the info button and the Wand2 auto-harmonics button — a Tooltip supplies a description, and a description is never a name) · **`FR-EQR-26`** (named by `title` alone, three lines from a sibling already using `aria-label`) · **`FR-EQR-6`** (the scroll region had no tabindex, no role, no name, over a KaTeX span tree with no focusable descendant) · **`FR-CL-D-7` ⊕ `FR-EQR-23`** — ONE `<FadingScroll>` adoption, two records, and ⊘ **`M-R2`'s ordering lock is discharged by construction**: the producer's port ships `tabindex="0"` and `role="region"` when named (byte-read at the installed dist), so `scrollable-region-focusable` cannot fire ahead of the hover findings · **`FR-EQR-8`** (`justify-content: safe center`; ⊘ K-7's kill honoured — deleting `text-align` alone is a no-op because the vendor sheet does the centring) · **`FR-EQR-5`** (awaited, and announced, with `status` read by name — the `failure` arm the callsite discarded) · **`FR-EQR-25`/`-13`** (`:disabled="!latex"`) · **`M-FR`** (glass-ui's ring is a purely OUTSET box-shadow with the native outline already deleted, and `overflow: hidden` clipped it off both toggle buttons; ⊘ `overflow: clip` does not help, so a frame gives the ring somewhere to land) · **`D·D-M12`** (aria-pressed on the toggle and the pills, against a primitive whose CVA ships the arms and a pattern `notation.ts`'s own docblock describes) · **`C·D-22`** (the `:disabled` that could fire from neither end) · **`D·D-m6`** (Compute with an empty expression was a dead button) · **`M-ZM`** (`--z-modal` → the exactly-named `--z-hovercard` rung) · **`M-US`** (the tier description is selectable again) · **`FR-EQR-22`** (the unearned `!important` and the `overflow: visible` that restated the initial value).

#### Act 11 — `L-M1`, in ONE edit with its test (`8c74054`)

The snapshot was taken from the NEW state and called previous: `trigHarmonics`/`dcTerm` are computeds and a pre-flush watcher runs after the source has mutated, so every harmonic and DC lerp was an IDENTITY for all `tp` and the bounds came from a hybrid state that never existed on screen. `old[1]` was in the watcher's hand the whole time. ⊘ **The `deep: true` drop is in the SAME edit and is not a tidy**: a deep watcher on in-place mutation returns the same reference as both arguments, destabilising the very `old` tuple the cure reads (`SP-16`'s member — the traversal was priced for nothing). The 6-line assertion lands at the seam `RD-8` named as the reason this survived (*"there is no seam at which the identity-lerp could have been observed"*): it asserts the snapshot's bounds depend on the harmonics argument at all.

#### Act 12 — `L-B3`, memoised AND MEASURED before `.f`'s study (`b3b9a35`)

Memo key exactly the record's — `[coefficients, nHarmonics, domain, transition.progress]`, identity-compared. **The measurement `G-F4-CONV-STUDY` is gated on**, double-run, at the component's own arithmetic (500-point grid):

| N | per-frame (run 1 / run 2) | trig calls | allocations |
|---|---|---|---|
| 20 | 0.289 / 0.284 ms | 40,000 | ~10,520 |
| 60 | 0.848 / 0.869 ms | 120,000 | ~30,560 |
| **100** (UI ceiling) | **1.377 / 1.417 ms** | **200,000** | **~50,600** |

Reproduces the record's ≈200k/≈51k estimate; ~8.5% of a 60 Hz frame budget at N=100 for work whose inputs did not change, **doubled** during the 500 ms transition window. **`.f` may open the study.** Rider in the same pass: the extents fold instead of spreading a 500-element array through `Math.min`/`Math.max`.

#### Act 13 — `D2` and `D3`, executed as `.i` ruled them (`2808fb5`)

⊘ **Nothing re-decided.** **D2(a) DELETE**: the selection contract's zero-consumer basis re-verified at the bytes before the cut — ⟨cmd⟩ `grep -rn "FrequencyGraph\|activeIndices\|toggle-harmonic\|hover-harmonic" src/` minus the file → the only other callsite (`visualization/CoefficientsPanel.vue`) passes `:components` and `:max-bars` alone. `FR-FG-22` stays INFO *because* this arm ruled delete, and its dead `onUnmounted` import goes with the contract. **D2(b) DEFERRED-WITH-DEFAULT**: the linear arm ships, no control is wired, and **nothing on the log side is deleted** — the annotated transform, the axis label's log branch and the tooltip's log row all survive; the D-axis minority routes to SS-3/SS-4 intact. ⊘ **The touch constraint binds under BOTH arms and was not deferred**: the hit-test moves into pointer handlers, because `onClick` read state only `mousemove` ever wrote. **D3 RE-WORD, do not fill**: the subtitle stops promising a spectrum the panel declines, the em-dash gloss goes with it, and **`FR-EQC-1`**'s honesty repair lands on the three surfaces that exist today with both real numbers. The FEATURE question routes to SS-3/SS-4 **carrying its consequence** — filling `#graph` re-opens this reconciliation at a fourth surface and must be re-priced there.

#### Act 14 — the instrument stops lying about its inputs (`350e0bf`)

**`L-M2` ⊕ `M-L1`**: `props.domain` feeds `omega`, the x-grid, the closing sample and `maxX` and had NO watcher; the callsite bound LIVE refs against last-response data while `onDomainInput` emits nothing, so a typed domain edit rendered wrong-frequency curves for an UNBOUNDED window. Both halves land, and the precondition nobody stated is stated. **`D-5` ⊕ `M-CP`**: `role="img"` with a name that carries the READING. **`L-m10` ⊕ `D·D-m9`**: one rect at the event instead of two per render, and `mousePos` written only when there is something to place. **ConvergenceTimeline** — `D·D-3`/`C·C-2` (the play control was named by nothing) · `D·D-4`/`C·C-3` (the `aria-valuenow/-valuemin/-valuemax` FALLTHROUGH trio announced the harmonic COUNT while the control moves the sweep POSITION; deleted for `aria-valuetext`, and the count span gets its live region) · `D·D-5`/`C·C-5` (the literal `1.75rem` box defeated both producer knobs — 31.5px rendered against a 49.5px coarse floor; **the delete is the leg that holds under either producer branch**).

#### Act 15 — E13 mail (this seat's own act)

⟨cmd⟩ `/usr/bin/grep -nE '\| *UNREAD' docs/tranches/V/coordination/INBOX.md` → **no output**. Four-path sweep ⟨cmd⟩ `find <each> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 17:11"` → three hits, **all already rowed** (`INBOX.md` self · `valuejs-outbound-…-kfw7-bh-relay-ADDENDUM-A9.md` = **O-31** · `glass-outbound-…-o26-reply.md` = **I-35**, routed Track B). **0 unrowed · 0 UNREAD in scope · 0 new `I-n`.** No row minted; this unit corresponds with no sibling repo, and its GLASS-RELAY asks are collected for `.z`'s ONE letter.

#### Gate readings, BEFORE → AFTER (double-run at the settled bytes)

| gate | BEFORE | AFTER | verdict |
|---|---|---|---|
| **G-F4-KATEX-QUIET** | 4 call sites; `warns=2` per sigma render | **1** home (⟨cmd⟩ `grep -rn "renderToString\|from \"katex\"" src/ \| grep -vc render.ts` → **0**); `warns=0`, hooks intact, both runs | **GREEN** |
| **G-F4-VUE-TSC-CLEAN** | tree 17; this unit's sites **3 of 4** open | tree **6 / 6** (double-run); ⟨cmd⟩ `npx vue-tsc -b \| grep -cE "useCoeffHover\|EquationView\|FrequencyGraph"` → **0** | **GREEN for this unit**; tree RED on `.c`/`.d`/`.e`/`.f` sites |
| **G-F4-VITEST** | `Tests 28 passed (28)` | `Tests 36 passed (36)`, twice — the `L-M1` seam assertion is among them | **GREEN** |
| **G-F4-PRM-CLOCK** | 2 rAF owners in this surface, **0** consulting PRM | ⟨cmd⟩ `grep -rln requestAnimationFrame src/components/equation/` → the same 2; ⟨cmd⟩ `grep -lc "reducedMotion\|prefersReducedMotion"` → **both** | **GREEN for this surface**; `.f` owns the repo-wide closure over all eight owners |
| **G-F4-CONTRAST-FLOOR** | axes 1.190/1.370 · curve 1.404/3.102 · tiers 2.127/1.979/3.503 · glyph 2.110 | **3.380/4.038 · 3.716/4.360 · 4.272/4.532/4.527 · 4.272** | **RED — the CURES landed, the REGISTRY ROWS are owed**; see Escalations |
| **G-F4-DEAD-DEP** | the zero-consumer selection contract live | deleted with its proof taken at the bytes first; `katex` still imported (by `render.ts`), so no dependency was removed while still in use | **GREEN for this unit's deletions**; the SCRUB ledger is `.f`'s |
| **G-F4-CENSUS-CELLS** | — | **No cell in the gate's set is this unit's**: `raw-findings.json:1393` + the HLG-8 claim are `.a`'s · `:2968` is `.c`'s · `lane-frontend.md:617` is `.e`'s · `:558-559`/`:624` is `.f`'s · `CENSUS-2026-08-03.md:362` is `.z`'s. This unit falsified none and invented none; the clock figure `.f` needs (**2** rAF owners here, both PRM-gated) is banked at addendum §3 | **HELD (vacuous, enumerated not assumed)** |

#### Commits

| hash | meaning |
|---|---|
| `4a770c2` | SP-18 — ONE `renderLatex()` home, and the trust that could not be withdrawn |
| `bfbc7ec` | the compute identity — `B-1` dies with the key that under-determined it |
| `b34226a` | `B-2` — the budget bound, clamped where the restore path can reach it |
| `063975f` | the error channel — one edit, because the two defects gated each other's reachability |
| `bc90680` | SP-1 — the loading flag stops belonging to whichever request finishes |
| `1e40f02` | SP-4 — the plot's three clocks consult PRM, and the reduced arm shows the converged curve |
| `99aea3e` | SP-3 — every meaning-bearing mark on this route stops being theme-blind |
| `2394f9a` | SP-5 ⊕ SP-7 ⊕ SP-8 — every control gets a name, a state and an outcome |
| `8c74054` | `L-M1` — the snapshot was taken from the new state and called previous (+ its test) |
| `b3b9a35` | `L-B3` — the frame geometry is memoised, and MEASURED before the study reads it |
| `2808fb5` | `D2` and `D3`, executed as `.i` ruled them |
| `350e0bf` | the instrument stops lying about its inputs, and starts saying what it is |
| `e8576d03` (value.js) | the dated addendum-beside |
| *(this line's own)* | this receipt |

⊘ Every commit carried its own pathspec on the commit itself; ⟨cmd⟩ `git show --name-only` on each returns **only** this unit's files. `scripts/dev/dev.sh` untouched. A concurrent `.c` committed to the same index throughout and **not one of its paths appears in any commit above**.

#### Escalations

**ONE, and it is a bounds escalation, not a cure failure.**

**`G-F4-CONTRAST-FLOOR`'s registry rows for `FR-CP-D1` and `EV D·D-B3` are OWED, not written.** `.g`'s `e2e/contrast-pairs.ts` invites the owning unit to move its own row *"in the same commit as the cure"*, but the wave record's disjointness law states that **`web/e2e/**` is `.g`'s with exactly ONE declared exception, and that exception is `.a`'s**. Two authorities conflict; the wave-level partition is the binding one, and a seat that mints itself a second exception is widening its own bounds — the act `.c` was told in terms not to perform. **This seat did not write the file.** The rows are handed over complete at addendum §3 — ids, expression stacks, `kind`, banked figures, owner — so the move is a paste, and `FR-EQR-7[instance]`'s existing row needs its stack moved from `rgb(34 197 94)` to `var(--section-color-4)` by the same hand. **Until that lands the gate reads RED, which is the honest colour: the cures are in the bytes and the harness has not been told where to look.**

#### Residuals

- **Declared to `.f`** (files in `.f`'s set, cures in hand at addendum §3): `EV-L·M-4`'s three-part cure (surface `retryOn429` on `ApiFetchOptions` · make the backoff sleep **abortable** — `:174`'s `setTimeout` ignores `signal`, so a 30s sleep survives an abort and its generation clobbers the next · a client timeout posture) · `fr-CP D-1`'s `golden` resolver line in `lib/colors.ts` · `C·D-02`'s array-`detail` half in `api-problem.ts` · the clock census (**2** rAF owners here, both gated).
- **DISCHARGED-BY-DELETION, stated id-for-id** (addendum §2.1; provenance F.W0 `5842377`): `FR-IC-2` · `FR-IC-3..24` · `FR-IC-6` · `FR-IC-25` · §5.2's 21/14 census line · `D·D-M5` · `D·D-M10`'s InfoCard site. ⊘ `InfoCard.vue` **not re-created**.
- **DISCHARGED-BY-PREDECESSOR, with the arithmetic published**: **`FR-EQR-20`** — its mechanism was the root font dropping 18px→16px at the same 768px breakpoint as the `1.4em→1.8em` ramp (delivering +14.3% for an authored +28.6%). `.a`'s `G-15(b)` landing removed the root fork, so the ramp now delivers its authored figure. **No cure by this unit; `.z` should book none.**
- **Carried, named, not landed** (addendum §7, each with why): `EV-D·D-B1` (the one-owner anchor row spans two components and its witness is SS-13-deferred) · `EV-D·D-M1` (the 160px stage's escape hatch, threshold SS-13) · `EV-L·m-13` (`useEquationSession()` — the roster it would carry is **already cured in place**; extracting now moves cured code for testability alone) · `EV-D·D-M13`/`m2`/`C·D-13` (the breakpoint authority pairs with `D·D-M2`'s unruled default-tab question) · `EV-M-TL` (**DECLINED per the spec's own cell**, the ratified `kf-KfPillTabs:85` kill) · `FR-CP-LM4`/`LM5`/`LM7` (LM7 blocked at the contract — ⊘ K-13: `latex` IS the truncated render and the original needs the F.W5 `sp.latex(expr)` field) · `FR-CP-C7` (⟨cmd⟩ `grep -rn trigAmplitude src` → **∅**, discharged at the bytes) · the four reader-unattacked `C·D-17/-19/-20/-21` carries.
- **F.W3's, cited, no leaf grown**: `FR-CS-i1` · `shared/CoefficientsSpectrum.vue` · `FrequencyGraph`'s ramp home (§5.2 twin seam (3)).
- **GLASS-RELAY for `.z`'s ONE letter**: a light-arm status ramp clearing 4.5:1 (blocks `FR-EQR-7`'s `--success` rung at 2.175 and `D·D-B3`'s `symbolic` at 4.272) · `SegmentedTabs`' `modelValue: string` (`C·D-23`) · is `glass-floating` reaching portaled content (`D·D-M4`).
- **SS-13, deferred never resolved inline**: `FR-CP-D1` dark axes readback · `D·D-B1` coarse+fine · `M-FR`'s ring · `D·D-M1`'s truncation threshold · `D·D-M3` on BOTH engines (the `fr-CCD R-9/K-9` qualification travels with the row) · `FR-EQR-8`'s overflow onset.

#### Negative roster — held

⊘ `I-2`'s empty state **survives** (it is `L·M-2`'s only visible symptom, and was not deleted as an unused branch while that very defect was cured) · `InfoCard.vue` not re-created · `GM-19` not certified · CP KILL-6 not executed · `moon.json` not regenerated · the **Tooltip shim is not deleted** — `FunctionInput` still imports it, and SP-7's leg here was to add the NAME beside the description, never to remove the description.

---

### `.d` — the `/gallery` route and the three admin panels

**Sections**: §2.A `fr-AdminAuditLog` · §2.B `fr-AdminFlaggedPanel` · §2.C `fr-AdminUserList` · §2.J the `/gallery` route (whole) · §2.0's AA-\*/FR-AFP-\*/FR-AUL-\*/GAB-\*/GM-\*/GCM-\*/FR-GFC-\*/FR-GIG-\*/FR-GSB-\*/FR-USB-\* members of SP-1/2/3/5/7/8/9/11/12/14/15/17 · §3 D1 · §4 ADMIN-AXE / CONTRAST-FLOOR / DEAD-DEP · §5.2 →F.W5-W8, →GLASS-RELAY.
**Addendum-beside**: `docs/tranches/X/fourier/F-W4-ADDENDA-d-2026-09-18.md` — census corrections, the contrast-registry hand-off, the relay asks, and the escalations, each with its measurement.

#### What landed, in the order the brief set

1. **D1's ruled arm, whole.** `GalleryMarquee.vue` deleted (134 lines) with its import and its mount. The predicate was `featuredEntries.length >= 4` inside a block guarded by `!gallery.entries.length`, and `featuredEntries` is a filter *of* `gallery.entries` — |filter(S)| ≤ |S|, so the mount read `0 >= 4` for every input that has ever existed. GM-24's static proof holds at every build; the empty gallery renders what it always rendered.
2. **SP-2's error ≠ empty cures.** AA-8 first (the composable learns the difference between an abort, a losing request and a failure — one generation ticket, `onScopeDispose`, `isAbortError`), then AA-1 + AA-7, AA-33, FR-AFP-6 + `-67`, FR-AUL-2, FR-AUL-4, GAB-3. The audit log is a system of record and the one thing it may never do is answer a question it could not ask.
3. **SP-1's abort-identity members**, component-side: the generation token at every read path — `FR-AFP-14`/`-48`, `GAB-20`/`-21` (`ADMIN_STATS_KEY` + `abortInflight` on deactivate), `FR-AUL-15`/`-29`, `FR-AFP-12`. ⊘ The registry **key shape** (`AA-27`/`FR-AUL-3`) is `lib/api.ts` = `.f`'s — routed, addendum §E-5.
4. **SP-3's contrast floor.** GAB-1 (BLOCKER) composes the plate, border and mark off the repo's own ratified `--viz-amber` carry — the border and mark move from 1.25–1.27 and 1.60 to ≈4.72:1; GAB-18 dies with it. AA-3 retires five single-theme palette triples for the producer `Badge`, reshaped by AA-24 and AA-5's display arm into a **verb-token** classifier so `batch_users:delete` stops reading benign beside `batch_users:unsuspend` and the nine `janitor:*` actions stop landing in the sky default. AA-4 gives chassis and rows `cartoon-card` (the `--muted` fill used as a border read 1.01–1.07:1 in both arms). FR-AUL-7 takes the sole "suspended" signifier (2.0:1) and the prune control (1.3:1) to producer registers. FR-AUL-23 and FR-USB-5's ONE rework land as `Input` swaps, carrying `-12`/`-13`/`-14`/`-33`/`-40`/`-6` with them.
5. **SP-7/8's naming and live-region cohort.** FR-GSB-11's **five** unnamed controls (not the three every axis enumerated). FR-AUL-9 and AA-12: one permanently-mounted region each, outside every gate — both panels' previous regions were born with their own messages, the pattern least likely to fire. FR-AUL-26, GAB-24, GCM-36: 2.5.3 label-in-name. FR-AUL-41 moves the disabled-state reasons off `title`, which a disabled element exposes to nobody. AA-9/AA-39, FR-AUL-34, GCM-35, GCM-49.
6. **The ten §X.1 GCM handovers + the GCM restore family.** GCM-3 (the modal stops being a photograph) · GCM-48 → GCM-30 → GCM-28 as **one deletion** · GCM-44 + GCM-4 as one edit · GCM-12 · GCM-31 (site leg; producer leg is a relay) · GCM-35 · GCM-36 · GCM-37 · GCM-45 · GCM-46 (also K-15's falsifier, recorded not re-derived) · GCM-49 · FR-USB-18's producer-independent half. FR-GFC-2/-23/-20 wire selection through the **second** live host of the same card. **GCM-38 is posed, not answered, as its row instructs.**
7. **SP-17's sweep + FR-GFC-22.** Re-derived once across 11 gallery SFCs: 3 blocks at zero rules deleted whole, 2 dead `@reference`s deleted from blocks that keep their rules, 2 blocks genuinely using `@apply`/`theme()` kept, 1 file with no block. The ruled 4-file set's fourth member (`AdminFlaggedPanel`) **converted** rather than deleted — FR-AFP-3's token rule landed in it earlier in this unit. Both dead imports carry zero-consumer proofs.
8. **SP-14's mobile hygiene.** AA-21 (iOS sentence-case silently defeating an exact-match compliance filter), FR-AUL-40, FR-GSB-11f, FR-USB-13/-14/-33, and AA-22's touch-floor strip across **every** `h-7`/`h-7 w-7`/`h-6 w-6` literal in both panels — `cn`'s height bucket is last-write-wins, so each of those pinned 28 px over the producer's 44 px coarse clamp.

#### Gates

| gate | reading | witness |
|---|---|---|
| `G-F4-VUE-TSC-CLEAN` | **GREEN for this unit's files** | ⟨cmd⟩ `npx vue-tsc -b --force` → the only residues are `ContourEditorCanvas.vue:42` and `lib/api.ts:5`, **neither in `.d`'s set**. `npx vite build` → ✓ built. |
| `G-F4-DEAD-DEP` | **GREEN** | every deletion carries a zero-consumer proof in its commit; `VIZ_COLORS`/`PathPreview` measured at 1 occurrence each (the import line). |
| `G-F4-CENSUS-CELLS` | **GREEN** | three cells falsified and each landed its addendum-beside **in the same commit as its cure** — `text-admin-label` (not emitted), `./forms` (not a key at 8.0.0), `ButtonTone` (no `warning` member). Addendum §A. |
| `G-F4-ADMIN-AXE` | **RED, producer-caused** | run against a production build at `:4173` with `.g`'s spec unmodified: **zero `color-contrast` violations** over the banner and all three panels — the class GAB-1/AA-3/FR-AUL-7 were filed under. What remains is `focusable-not-tabbable` ×8 + `aria-hidden-focus` ×4 on **one** node shape: reka's FocusScope sentinel `<span aria-hidden="true" tabindex="0">`, producer DOM through `glass-ui/dialog`. No consumer edit cures it without the local patch §0 forbids → GLASS-RELAY ask, addendum §C-1. |
| `G-F4-CONTRAST-FLOOR` | **RED, bounds-caused** | `e2e/contrast-pairs.ts` is `.g`'s file and is not in `.d`'s writable set. The harness is a static token-expression evaluator, so it still grades the **pre-cure** recipes. The eleven row replacements are handed over complete — ids, stacks, `kind`, and which row to **delete** — at addendum §B, alongside the five DRIFT readings the harness recorded. The DOM-side evidence that the cures are in the bytes is the admin-axe run above. |

#### Commits

| commit | subject |
|---|---|
| `d028f0c` | D1 RULED DELETE — the marquee family, whole, and the band that never painted |
| `048f03c` | AA-8 — the composable learns the difference between an abort, a loser and a failure |
| `326926c` | SP-2 — a failed fetch stops being an affirmative statement about the ledger |
| `bc2aadc` | FR-AFP-6 ⊕ FR-AFP-67 — the moderation queue stops issuing false all-clears |
| `094dac5` | the admin banner gets a register, a failure arm, a voice and an honest byte count |
| `f76347b` | FR-AUL-1 BLOCKER — the cascade stops firing at users the operator cannot see |
| `3c5a5b0` | the moderation queue shows the image, keeps its generation, and mutates the store in place |
| `077f947` | SP-3 ⊕ SP-7 ⊕ SP-8 on the two admin panels |
| `e7e3438` | SP-17 ⊕ FR-GFC-22 — the stylesheets that styled nothing, and the imports nobody read |
| `6fea644` | the search bar's five unnamed controls, and one credential field that stops failing three ways at once |
| `e1b4d88` | the §X.1 handovers land — the modal stops being a photograph, and one deletion discharges three rows |
| `72c3f06` | FR-GFC-2 ⊕ -23 ⊕ -20 — the second host of the same card joins the selection it was already drawing |
| *(this line's own)* | the dated addendum-beside + this receipt |

⊘ Every commit carried its own pathspec **on the commit itself**; ⟨cmd⟩ `git show --name-only` on each returns only this unit's files. `scripts/dev/dev.sh` untouched. Concurrent `.e` and `.c` seats committed to the same index throughout and **not one of their paths appears in any commit above** — nor any of mine in theirs.

#### Escalations (addendum §E, each with its measurement)

- **FR-GFC-1 = FR-GSB-1 — NOT LANDED.** Measured: `stores/gallery.ts` builds both list requests from `{limit, sort, cursor, owner}` alone; `searchQuery`, `tierFilter` and `basisFilter` never reach the wire while `GalleryView` assigns all four and watches three, so three of four controls are inert end-to-end and every dead interaction wipes pagination. The cure needs `api.listVisualizations`'s signature — `lib/api.ts`, `.f`'s file — and the list *contract* is F.W5's. Escalated whole rather than half-landed; the store half is two lines once `.f` widens it.
- **GCM-1 / GCM-25 / VV-BLK-1 — NOT LANDED.** GCM-3's half is landed in `GalleryView.vue`; the loader half is `VisualizationView.vue` + `stores/workspace.ts`, outside the set.
- **AA-37 — NOT LANDED.** A `components/admin/` directory move, outside `gallery/**`.
- **GAB-28 — NOT LANDED.** The rename breaks `.g`'s spec locator `getByRole("region", { name: "Admin mode banner" })`, which `.d` may not edit.
- **Routed to `.f`**: FR-AFP-17 (`VARIANT_MAP` `success → 'success'` **now**, not F.W1 — the spec calls deferring it a scheduling error) · AA-27/FR-AUL-3 (the abort key shape) · FR-AFP-36 (`content_hash` is not on `FlaggedVisualization`, so `(content_hash, reporter_slug)` cannot be spelled; the splice is keyed `(item.slug, flag.reporter_slug)` **with the substitution documented in-code**, never silently made).

#### Residuals and roster

- **RED-with-cause, by arithmetic**: `GAB-1[plate/page]`. A 4–10% alpha fill cannot reach 3:1 against the page and remain a wash; the admin register is carried by the border and the mark, which now do carry it. Named, not excused.
- **Half landed, half posed**: `AA-40`. The assistive half is real `sr-only` text; the sighted-keyboard half is a design ruling this unit was not given (a per-cell Tooltip trigger costs two tab stops on each of 25 rows) → F.W5–W8.
- **Posed, not answered**: `GCM-38`, as its own row instructs. Witness → SS-13.
- **GLASS-RELAY for `.z`**: the FocusScope sentinel (new, measured) · the light-arm `--tier-featured`/`--tier-saved` rebaseline (carried, GAB-9/GAB-2(a)) · GCM-31's producer leg (teach `cn` its aliases).
- **⊘ Withdrawn ask, with cause**: AA-3's violet `batch` ADOPTION-ASK. AA-24 rules the batch arm's own existence the defect — `batch` is a namespace, not a severity — so asking the producer for a violet tone would ship the inversion into the design system. Carried to `.z` as a **note** so no later seat re-opens it from AA-3's text alone.
- **Negative roster — held**: `GM-19` not certified (the marquee family is deleted, not revived) · no glass-ui byte touched · no `e2e/**` byte touched · no `test.skip`, allowlist, try/catch-around-a-defect or `node_modules` patch anywhere in this unit.

### `.e` — the `/paper` route

**Sections**: §2.D `fr-PaperView` · §2.E `fr-PaperSidebar` · §2.F `fr-PaperSearchModal` · §2.G `fr-PaperArticleWindow` · §2.0's PV-\*/★MF-\*/PS-\*/PSM-\*/PAW-\* members of SP-1/3/4/5/7/9/11/14/17 · §3 D4 · D6 · D9 · §4 CONTRAST-FLOOR / PRM-CLOCK / DEAD-DEP / VITEST / VUE-TSC-CLEAN / CENSUS-CELLS · §5.2 →F.W5-W8, →GLASS-RELAY, →LATEX-PAPER.
**Addendum-beside**: `docs/tranches/X/fourier/F-W4-ADDENDA-e-2026-09-18.md` — the contrast-registry hand-off, the ramp overrides declared to `.f`, the census correction, five producer facts and the escalations, each with its measurement.

#### What landed, in the order the brief set

1. **`L-5(a)`, then `D9`'s ruled collapse.** The disclosure became a real `CollapsibleTrigger as-child` control with `aria-label="Subsections of …"`. Then `D9`/`ESC-2`: three parallel derivations of one 98-node tree across two producers, arbitrated by an untyped `defineExpose`, collapse to **one** `useSidebarState` owned by `PaperView` and provided on a typed `InjectionKey` (`paperToc.ts`). `registerNavEl` replaces the `any`-shaped seam; the losing adapter (`paperSectionToTreeNode`) is deleted; both hosts inject.
2. **`PAW-1` + `PAW-30` posed and escalated** (they are upstream and inert — addendum §A-e-9(b)), then **`D4` on its ruled DEFAULT**: the stack carried INERT-BY-MEASUREMENT, nothing restored and nothing deleted, `PAW-47`'s clearance authored **once** as `SCRIM_CLEARANCE_PX`. `LAW-3` honoured: no scrollport restored.
3. **`PSM-1` with its three same-commit riders, then `PSM-2⊕6⊕3`'s single modal owner.** `PSM-1` is the scope-id mechanism itself — `PaperSearchDropdown` is *fragment-rooted*, so no parent scope id ever reached it and its entire subtree was unstyled. Rules moved to the components that own them. The modal became a real `Dialog`/`DialogContent` with `DialogTitle`/`DialogDescription`, and its geometry is bound **inline with the reason written beside it**: a scoped class cannot reach a portalled producer root — the very defect `PSM-1` names.
4. **`SP-4`'s two ungated `scrollTo` sites** (live `prmQuery` + `scrollBehavior()`, read per call rather than sampled at arm time) **+ `CP-25`** (escalated: the cure site is `.c`'s) **+ the `lane-frontend.md:617` census correction** as addendum-beside.
5. **`SP-3`'s contrast**, including all four `PV ★MF-10` ramp stops: every diluted `color-mix(…, transparent)` ink on the route retired to full-strength `--muted-foreground`, and the two registers the record demanded more of to `--muted-foreground-strong`. Three light-arm ramp stops remain and are **declared to `.f`** with their replacements measured (§A-e-2).
6. **`SP-7`/`SP-9`'s naming + geometry**: the nested click-only `<span>` in the mobile bar became a real sibling `<Button aria-label="Search paper">`; `aria-expanded`/`aria-controls` on the trigger; `role="group"` on the panel; `aria-label="Chapters"`, `role="status" aria-live="polite"` on the overlay, `aria-label="Back"`; the ≥1.5rem scroll-to-top control with a real name.
7. **The `PAW-9/-13/-14/-19/-23/-24/-55/-57` set + annex arms**: the inline `max-height` cap moved into a cascade-reachable rule, `alt=""` so a caption is not read twice, `DARK_INVERT_EXEMPT` replacing a `filename.includes("portrait")` test that was wrong in **both** directions on the only two figures it decided, callout text through `PAPER_CONTEXT`, three dead declarations deleted.
8. **`search/index.ts` deleted** with a twice-run zero-consumer proof.
9. **`resolveFigure` + `fuzzyMatch` tests** — `resolveFigure` moved out of the SFC so the unit floor can reach it, then 14 assertions across two files.

#### Two defects this unit did not predict, and found by measuring rather than by reading

- **`G-F4-PRM-CLOCK` on a clock no row names.** The reading-progress bar rendered `scaleX(0)` for the whole read under `prefers-reduced-motion`. The producer's `.scroll-progress` keyframe **and** its `animation-timeline` both sit inside `@media (prefers-reduced-motion: no-preference)` over a base of `scaleX(0)`, so the composited path is inert under PRM on every engine — and the consumer had disarmed its JS floor under PRM too, on the reasoning that the native path would cover it. Both silent. Witness, measured in a `reduce` context scrolled to `1.000` with the writer's inline value dropped so only the cascade paints: **`matrix(0, 0, 0, 1, 0, 0)`**; the `no-preference` control converges at `matrix(1, …)`. Cure: *absent OR inert*. Addendum §A-e-4.
- **`PSM-28` survived the cure named for it.** `toLowerCase()` may return **more code points than it is given** (`"İ"` → `"i"` + U+0307), so an index into the lower-cased text does not name the same character in the original — a second length axis the first map did not close. Executed: `highlightFuzzy("İstanbul set", "set")` marked **`"tt"`**. Found by *writing its own test*, which is the argument for `G-F4-VITEST` in one row. Addendum §A-e-6.

#### Gates

| gate | BEFORE | AFTER | witness |
|---|---|---|---|
| `G-F4-VITEST` | **RED** — *"no vitest/jest anywhere"* | **GREEN** | ⟨cmd⟩ `npx vitest run --reporter=dot` ×2 → `Test Files 7 passed (7) · Tests 50 passed (50)`, identical both runs. `D6`'s arm names four pure functions; **`resolveFigure` and `fuzzyMatch` are this unit's two** — 5 + 9 assertions at `.g`'s ruled runner home. ⊘ `PAW-12`'s disk-set-equality rider is F.W9/W10's and is **not** attempted here (§5.1(3), harness-before-rider). |
| `G-F4-DEAD-DEP` | **RED** — *"`search/index.ts` zero consumers"* | **GREEN for this unit's deletion** | ⟨cmd⟩ `grep -rnE '^\s*(import\|export)[^\n]*from\s+["'"'"'][^"'"'"']*paper/search["'"'"']' src/ e2e/ \| wc -l` → **0**, and the relative form (`./index`, `../search`) → **0**. `ls src/components/paper/search/index.ts` → *No such file or directory*. The four remaining textual hits are **comments naming the deletion**, in this unit's own files and in `.g`'s runner. |
| `G-F4-PRM-CLOCK` | **RED** on this surface — two ungated `scrollTo({behavior:"smooth"})` sites **and** a blank reduced frame | **GREEN for `/paper`** | Every clock on the route consults PRM: ⟨cmd⟩ `grep -rn "prmQuery\|scrollBehavior\|prefers-reduced-motion" src/components/paper/` → the two smooth sites route through `scrollBehavior()` (`:277`, `:334`), every other `scrollTo` is literal `"instant"`, no `scroll-behavior: smooth` exists anywhere in `src/`, and the progress bar now converges in **both** arms (`matrix(1, …)` at 1.000, double-run). ⊘ The gate's other named clocks — `AC-D-8`/`C-19` (`stores/animation.ts`) and `FR-CP D-9`/`C-2` (`ConvergencePlot`) — are **not this unit's files**; the gate is wave-level and closes with them. |
| `G-F4-CENSUS-CELLS` | **RED** — `lane-frontend.md:617` *"smooth-scroll opt-out"* | **GREEN for this unit's cell** | The cell is false and its falseness is *why* `PV D/M-1` went unseen: that `matchMedia` consult gates the **progress-bar listener**, a different clock in a different file, while the two smooth sites were ungated. Correction landed as a dated addendum-beside (E-3: the census file is not edited), §A-e-3, with both halves' settled coordinates — `PaperView.vue:228` and `useScrollNavigation.ts:55-63`. |
| `G-F4-VUE-TSC-CLEAN` | **RED** | **GREEN for this unit's files; the gate stays RED wave-level** | ⟨cmd⟩ `npx vue-tsc -b --force; echo "EXIT=$?"` ×2 → `EXIT=1`, exactly two rows, **neither on this surface**: `ContourEditorCanvas.vue(42,9) TS6133` (under `.c`'s evaluate-only lock) and `lib/api.ts(5,5) TS6196` (`.f`'s). **Zero** diagnostics on `src/components/paper/**`, `src/lib/paperContent.ts`, `src/lib/figureDimensions.ts`. ⟨cmd⟩ `npx eslint src/components/paper src/lib/figureDimensions.ts src/lib/paperContent.ts` → exit **0**, zero output lines. Reported RED with the two rows named and homed rather than claimed GREEN over a subset. |
| `G-F4-CONTRAST-FLOOR` | **RED** — `PSM-4` 1.74–2.39 · `PS D-B2` 2.39/3.00 · `PV D/M-8` 2.88 · `PV ★MF-10` 3.58–4.48 | **RED, bounds-caused; the cures are in the bytes** | `e2e/contrast-pairs.ts` is `.g`'s file and **not** in this unit's writable set, so the registry still grades the **pre-cure** recipes — its `PSM-4` rows measure `color-mix(--muted-foreground 40/45/50%, transparent)`, and ⟨cmd⟩ `grep -rn "muted-foreground" src/components/paper/` returns **24 hits, not one a dilution**. Every replacement row is handed over complete — id, stack, `kind`, both arms' live readings, and which rows to **collapse** — at addendum §A-e-1, re-derived by `.g`'s own method and double-run. Three light-arm ramp stops (4.443 / 4.373 / 3.614) are **`.f`'s tokens**, with the exact `oklch()` replacements and their measured ratios (4.636 / 4.626 / 4.603) at §A-e-2. |

#### Commits

| commit | subject |
|---|---|
| `c4c46b0` | L-5(a) — the disclosure becomes a control that announces itself, and the row stops collapsing what you just opened |
| `2721c9b` | D9 executed — one ToC model, owned by the view, on a typed key; the losing index and the untyped seam are gone |
| `a3030dd` | PSM-1 with its three riders — the search chrome reaches its elements, and the repair does not ship the regression it arms |
| `9144cb1` | PSM-2 ⊕ 6 ⊕ 3 — one modal, owned by the view, that is a dialog and a combobox rather than a div that looked like one |
| `1a971c0` | SP-4 — both scroll sites consult reduced motion, and the page has one clearance authority instead of two that never met |
| `3048002` | L/D2 ⊕ L/D3 ⊕ L/D9 — the navigation composable owns its clocks and refuses to run two teleports at once |
| `ccef6b6` | L-1 and L/D3 corrected by measurement — navigation reveals rather than toggles, and a second jump supersedes the first instead of being dropped |
| `b687b66` | SP-3 ⊕ SP-5 ⊕ ★MF-10 — the route's muted inks reach their floors, the sole history control shows focus, and the saturated ramp stops being a silent drop |
| `555477e` | the PaperArticleWindow row set — a cascade-reachable cap, a caption that is not read twice, a discriminator made of data, and three dead declarations gone |
| `4039e1a` | the search engine stops lying — short queries find things, the cache keeps what it scored, rows have identities, and close means closed |
| `1f2d45c` | resolveFigure leaves the SFC so it can be measured |
| `901c002` | the unit floor for the two defect classes a page cannot show |
| `76d1997` | D-B3(b)'s border reaches its floor — the resting state stops being weaker than the hover state |
| `d0a87da` | G-F4-PRM-CLOCK — the reduced arm stops telling the reader they have read nothing |
| *(this line's own)* | the dated addendum-beside + this receipt |

⊘ Every commit carried its own pathspec **on the commit itself**. `scripts/dev/dev.sh` untouched. Concurrent `.c` and `.d` seats committed to the same index throughout and **not one of their paths appears in any commit above** — nor any of mine in theirs. No `git stash`, no `reset --hard`, no force-push, no `add -A`/`-u`.

#### Escalations (addendum §A-e-9, each with its measurement)

- **`CP-25` — NOT LANDED.** The cure site is `components/ui/CollapsibleSection.vue`, inside `.c`'s writable set. Cited and handed over; no byte written.
- **`PAW-1` / `PAW-30` — NOT LANDED, and inert in this app.** latex-paper's `theme.css` consumes its tokens as bare HSL triplets (⟨cmd⟩ `grep -cE "hsl\(var\("` → **42**), while this app's tokens are whole colours, so every such declaration is IACVT and **dropped**. And the sheet is **never loaded** — it is an opt-in subpath (`package.json:22 "./theme"`) and ⟨cmd⟩ `grep -rn "theme.css" src/ vite.config.ts` → no output. `K-9`'s kill of the consumer-alias limb is confirmed at the bytes: there is no alias to author, and authoring one would invent a dependency in order to patch it. Producer row → `.z`'s LATEX-PAPER letter.
- **`D5` — POSED AND BLOCKED**, with `PAW-38` named for the same letter. No byte written toward it.
- **`e2e/contrast-pairs.ts` — OWED, not written.** `.g`'s registry invites the owning unit to update its own rows; the wave's disjointness law gives `web/e2e/**` to `.g`. A unit does not widen its bounds on a sibling's invitation. `.b`'s precedent followed: cure at the site, publish the stack with its live reading (§A-e-1).
- **`style.css` — DECLARED to `.f`**, not written: the three light-arm ramp stops (§A-e-2). Chroma and hue untouched in all three; only the L channel moves, so every chapter keeps the hue that identifies it.
- **E13 — swept, and the ledger line deliberately not written.** ⟨cmd⟩ `find <the six paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 19:45'` → one hit, `INBOX.md` itself (self-excluded). ⟨cmd⟩ `grep -oE '\| \*\*UNREAD[^|]{0,60}'` → three live rows, **I-32 · I-33 · I-34**, every one routed at its own Routing cell to X-W0.j / the X formation mail seat, not one naming a `/paper`, search, figure or ToC byte. **0 unrowed · 0 new `I-n` · 0 UNREAD in `.e`'s scope.** `docs/tranches/V/coordination/INBOX.md` is **not** in this unit's writable set, so no sweep line was appended to it — stating the restraint is the point: a unit that writes outside its bounds to satisfy one law has broken another.

#### Residuals and roster

- **GLASS-RELAY for `.z`** (declared, not sent — a relay letter is the wave's act): `useSidebarFollow` **hard-codes a consumer class name**, ⟨cmd⟩ `grep -o "sidebar-top-btn" dist/sidebar.js` → `e.target?.closest("[data-toc-id], .sidebar-top-btn")`, which is why `PS-M2` is RELAY-BEFORE-RENAME and why the class name is deliberately unchanged in this tree · `--border` reaches only **1.865:1 / 2.001:1** on `--card`, so a design system's border token cannot be an SC 1.4.11 control boundary (same shape as `.g`'s `FR-EQR-7[--success rung]`) · the section ramp has **zero headroom** (13 stops, 13 roots; widening it is a producer change) · no `aria-modal` on the rendered dialog (reka-ui 2.9.10 emits none: ⟨cmd⟩ `grep -ro "aria-modal" node_modules/reka-ui/dist/ | wc -l` → **0**).
- **LATEX-PAPER for `.z`**: `PAW-1`/`PAW-30`'s bare-triplet sheet · `PAW-38` (with `D5`) · the `parentId` defect, which **both** producers carry in the same shape — `parentId: depth === 0 ? node.id : parentId` (latex-paper) and `parentId: a === 0 ? l.id : o` (glass-ui): a root is its own parent and every descendant inherits the *root's* id. This unit routes around it, which is exactly why it will stay broken unless relayed.
- **GREEN-BEFORE-ITS-CURE**: `PS D-B1` (*"no animation"*) — the 8.0.0 `Collapsible` ships the height transition, so the disclosure inherits it. Listed, not smoothed, and not claimed as this unit's work.
- **⊘ E-3 near-miss, disclosed**: a `-g "paper"` Playwright run collected `visual-baseline.spec.ts`, whose default sink is `docs/tranches/J/audit/screenshots/before/` — tracked, immutable evidence from a closed tranche. Three PNGs were rewritten and restored with `git checkout --`; no evidence byte is altered at HEAD. The hazard is structural, not personal: **a filtered e2e run in this repo can write into a prior tranche's evidence**. `VISUAL_OUT` is the documented escape; the wave residual suggested to `.g`/`.z` is to make the scratch path the default and the evidence directory the opt-in.
- **⊘ Method note for every seat still reading colour**: one `requestAnimationFrame` after toggling `color-scheme` is **not** enough for a `light-dark()` custom property to re-resolve at a computed style — the first element-level read of `D-B3` returned the *light* ink over the *dark* plate (`2.573:1`). 250ms settles it. Every figure published by this unit was taken after the settle and double-run.
- **Negative roster — held**: no glass-ui byte touched (READ-ONLY always) · no `e2e/**` byte touched except the two new unit files at `.g`'s ruled runner home · no `test.skip`, allowlist, `fixme`, try/catch-around-a-defect, copied producer selector or `node_modules` patch anywhere in this unit · no producer pin moved · `LAW-3` honoured, no scrollport restored.

### `.f` — shared lib/stores, the SCRUB ledger, the global-sheet residue, and the convergence study

**Seat**: `.f`, `claude-opus-5[1m]`, 2026-09-18. **Status: PARTIAL** (five gates turned GREEN for this unit; `G-F4-VUE-TSC-CLEAN` reported RED wave-level with its one surviving row named and held by another unit's lock — reported honestly rather than claimed).
**Sections executed**: §2.L *CONV-STUDY* · *PRM-CLOCK* · *SCRUB* · §2.0 **SP-12** (`:92`) · **SP-2**'s `fr-App MG-λ` (`:82`) · **SP-13** (`:93`) · **SP-16** (`:96`) · §4 `G-F4-CONV-STUDY` · `G-F4-DEAD-DEP` · `G-F4-PRM-CLOCK` · `G-F4-VUE-TSC-CLEAN` · `G-F4-CENSUS-CELLS` · §5.2 `→ F.W5-W8` · `→ SS-13`.
**Addendum-beside**: `docs/tranches/X/fourier/F-W4-ADDENDA-f-2026-09-18.md` (A-f-1 · A-f-1b · A-f-2 … A-f-11). **New artefacts**: `F-W4-SCRUB-LEDGER.md` · `F-W4-CONV-STUDY.md`.

#### Act 0 — CRASH-RECOVERY sweep (standing law): nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅** (clean; branch `m/w1-bump-migration`, HEAD `d0a87da`).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **13 modified ⊕ 4 untracked**, and **not one of the 17 is inside this unit's writable set**: the ten `demo/**` SFCs, `docs/tranches/V/reformation/CARRY-LEDGER.md`, `docs/tranches/X/execution/B/KF-W8.md` and the Track-A `e2e/smoke/**` + `docs/tranches/X/waves/evidence/W4/` paths are sibling seats'; `scripts/dev/dev.sh` is the unowned standing-dirty path (**NEVER touched, never staged**). The three value.js files this unit creates were **ABSENT** before it wrote them. **Zero inherited paths; no predecessor work on this unit.**

#### Act 1 — anchors verified at the true bytes BEFORE any write

- **`getAdminToken()!` is an 11-site row with 2 live sites.** ⟨cmd⟩ `grep -rn "getAdminToken()!" src/ | wc -l` → **2** (`AdminFlaggedPanel.vue`, `AdminUserList.vue`). The count moved because `.d` landed the gallery-route cures; the row's MECHANISM is unmoved, and the cure taken here is at the seam those sites pass through, not at the sites. INTENT at the true bytes, recorded.
- **`lib/speeds.ts` does not exist and is not in this unit's writable set** — A-f-3. Catalog authored in `lib/defaults.ts`; the row's substance landed, its filename not.
- **`search/index.ts` already deleted** by `.e`; ⟨cmd⟩ `ls src/components/paper/search/` → seven files, no `index.ts`. The SCRUB row is DISCHARGED-BY-PREDECESSOR, not re-taken.
- **`EP-MISSED-F`'s duplicate import already gone**: ⟨cmd⟩ `grep -n '^import\|from "' src/lib/easings.ts` → **one** import statement from `@mkbabb/value.js/easing`. ESC-4's F.W2 rewrite (`0cc9b00`) discharged it. Listed, not smoothed.
- **`FR-GFC-22`, `FM-22`/`FMD-26`/`FR-AH-37`, `FR-AUL-39`** — all landed by `.d`/`.a` (`e7e3438`, `6a0e842`). Not re-taken.

#### Act 2 — SP-12's typed catch at the seam (`7b736f8`)

`lib/api-problem.ts` gains `problemMessage(e, fallback)` — **the shared home `.d`'s own `adminError.ts` header says it owes** (*"the SHARED seam version of this helper belongs in `lib/api-problem.ts`, which is unit `.f`'s file"*) — and `ApiProblem.from` stops discarding FastAPI's ARRAY-shaped `detail`: the prior reader destructured `detail` out of `...extensions` and then tested `typeof detail === "string"`, so a 422's per-field `[{loc,msg,type}]` survived **nowhere at all**. It is now rendered for humans AND kept addressable in `extensions`.
`stores/workspace.ts`'s **ten** `catch (e: any)` sites become `catch (e: unknown)` + `problemMessage(…)`. Three holes close with the shape: an EMPTY message (`"" ?? x` is `""`, and `statusText` is empty under HTTP/2), a non-`Error` throw rendering `undefined`, and — at `saveVisualization` — an abort being reported as a failure, which that site alone did not guard.
⟨cmd⟩ `grep -c "catch (e: any)" src/stores/workspace.ts` → **0**.

#### Act 3 — SP-12's admin posture ⊕ `EV-L·M-4` ⊕ `IU-25` (`dabbb17`)

- **The guard-posture family row, cured where it is caused.** `AdminToken = string | null` at the seam; `coreFetch`'s null path throws a typed `ApiProblem` (`urn:fourier:admin-token-missing`, 401) instead of `new Error("coreFetch: auth='admin' requires adminToken")` — the internal sentence **five admin-facing toasts rendered verbatim to an operator** (`FR-AUL-30`'s `:175/:186/:197/:208/:219`). Thirteen wrapper signatures widened; the three divergent postures (assert / toast / silent `return`) now meet ONE answer. ⟨cmd⟩ `grep -c "token: AdminToken" src/lib/api.ts` → **13**.
- **`EV-L·M-4` ⊕ `C·C-34 (RD-1)` ⊕ `R2-N6` ⊕ `R2-r4`, all three parts.** (i) `retryOn429` surfaced on `ApiFetchOptions` — it was declared on `CoreFetchOptions` and absent here, and `apiFetch` is the only exported wrapper, so no caller could decline the retry *even in principle*; (ii) the backoff sleep is **abortable** — `:174`'s `setTimeout` ignored `signal`, so a 30s sleep outlived its own abort and its generation clobbered the request that replaced it; (iii) the timeout posture is a **cumulative** `RATE_LIMIT_BUDGET_MS = 20_000`, checked BEFORE each sleep, because a per-request cap cannot see a ~150s envelope in which every individual wait is within its cap.
- **`IU-25`'s dead client trio deleted** with its proof (`F-W4-SCRUB-LEDGER.md` §1.1), and the `AnimationSettings` TS6196 with it.

#### Act 4 — SP-13, the restore seam (`02010de`)

`AC-L-11 + M-10` = `EP L/M-3` = `SS-D-08/SS-L-01/SS-C-6`, cured where the records actually land rather than where they are read: **`stores/workspace.ts`'s two restore paths**, which spread an IndexedDB draft and a server `Visualization` straight over the defaults. `coerceContourSettings` / `coerceAnimationSettings` (in `lib/defaults.ts`) reject field-by-field, so one drifted atom cannot take the record with it; `coerceAnimationEasingName` (in `lib/easings.ts`, which owns the catalog) retires `as EasingName`, the assertion of an OPEN string into a six-key union whose two consumers degraded in OPPOSITE directions — the store fell silently to linear, the picker showed no active chip.
**`SS-L-07 / SS-C-10`, the wave's single highest-leverage change**: `ANIMATION_SPEEDS` / `AnimationSpeed` / `isAnimationSpeed` / `coerceAnimationSpeed`. ⊘ `if (as?.speed)` dropped a legitimate 0 by truthiness; the coercer reads the VALUE. Off-catalog-but-finite snaps to the NEAREST member (ties up), because restoring a persisted 3× as 1× discards a choice the person made.
**`FR-AFP-59`'s type half**: `FlaggedVisualization.tier` narrowed `string | null` → `GalleryTier | null` — the one row that widened a union closed on both wire sides.

#### Act 5 — SP-16, measured before it was claimed (`b62dcf2`)

`imageMeta` and `drafts` are server/IndexedDB records only ever assigned WHOLESALE; ⟨cmd⟩ over every consumer confirms **no in-place field mutation** (`GalleryView.vue:122`'s `workspace.drafts = []` is itself a wholesale assign). Both become `shallowRef`. The cost, measured with Vue's own `reactive` over a draft at the app's defaults (`n_points` 1024, `n_harmonics` 200, 50 levels), double-run identical:

```
drafts=1   deep-ref proxies=2090   walk=41.7ms   |  shallowRef proxies=0  walk=1.6ms
drafts=5   deep-ref proxies=10446  walk=206.8ms  |  shallowRef proxies=0  walk=8.2ms
drafts=20  deep-ref proxies=41781  walk=819.1ms  |  shallowRef proxies=0  walk=32.1ms
```

**2,090 proxy targets per draft**, re-wrapped on every `refreshDrafts()`.

#### Act 6 — `MG-λ`, decided by the producer's own surface (`a512661`)

`options.duration` was accepted, typed, documented and read by nothing. The ruling is HONOUR-OR-DELETE, and the producer settles which: glass-ui 8.0.0's `ToastOptions` carries `duration` (*"forwarded to reka-ui's `ToastRoot`; omit to inherit the `ToastProvider` default"*). **HONOURED** — forwarded when given, omitted when not, so the provider default still governs the common case. ⊘ The `ToastVariant` limb stays F.W1's fold, cited, not re-booked.

#### Act 7 — `G-F4-PRM-CLOCK` CLOSES, and a comment stops lying (`2ef87d1` ⊕ value `cbda8b6f`)

`stores/animation.ts` was **the app's last ungated JS clock**. The gate sits in `startLoop()` rather than `play()` because **six** paths re-arm this clock — `play`, `toggle`, `endScrub`, `setCanvasVisible`, the speed watcher, and the new media-query listener — and only one is a deliberate press. The reduced arm calls `parkAtTerminalFrame()`: stop the rAF, drop the playing INTENT so the transport reports what is true, and seed `t = 1` — **M-D1's terminal-frame law**, the converged trace rather than the blank canvas t = 0 would give. Every frame stays reachable by hand; the scrub is untouched.
Two riders in the same predicate: **MISS-SCRUB** (`scrubbing` was absent from `startLoop`'s guard while its sibling park-condition was present, so the speed watcher re-armed the clock against a live drag — ⊘ the `C-2` direction-state half is `.c`'s file, cited not taken) and **`SS-L-05 / SS-C-13`** (`speed` becomes a writable computed coercing on write, so `SpeedSelect`'s unguarded `parseFloat` can no longer put `NaN` into `dur = duration/NaN` and thence through `structuredClone` into the draft).
`lib/scheduler.ts`: **`FMD-22`'s second half** (`.a`'s Residual 4). The header claimed *"the epicycle/morph RENDER loop … is already rAF-paced AND off-screen-gated (I.γ, `stores/animation.ts`)"*. The MORPH loop is driven by keyframes.js `KeyframesAnimation` in `useFourierMorph.ts`, owns no rAF, registers no observer and has never passed through this store's reference count. A comment naming a safety property a loop does not have is worse than none.

**Gate reading, double-run** — ⟨cmd⟩ `for f in $(grep -rl "requestAnimationFrame(" src/ | sort); do …; done`:

```
run 1: rAF CALL owners=8 consulting PRM=8
run 2: rAF CALL owners=8 consulting PRM=8
```

**Verified live, not argued** (A-f-1b; one bounded Playwright probe, two contexts, double-run — §5.2 parsimony, no suite run, no screenshots):

```
reducedMotion=reduce          matchMedia=true   rAF callbacks in 1.2s = 0    pageerrors=0
reducedMotion=no-preference   matchMedia=false  rAF callbacks in 1.2s = 15   pageerrors=0
```

⊘ **The census correction is ONE act in two repos.** `G-F4-CENSUS-CELLS` requires it *"in the same commit as the cure"*; the cure is a fourier byte and the correction a value.js byte, so they land adjacently and each names the other (`.a`'s disclosed precedent). The cell's *"LOW BY ONE clock; repo total 4"* is itself **low by four** — A-f-1.

#### Act 8 — the collected sheet residue (`0a16b83`)

- **`PAW-55`**: `.katex-display { overflow-x: auto; overflow-y: visible }` — per CSS Overflow 3 §3 the `visible` COMPUTES TO `auto`, so the authored line was dead and every display-math box on `/paper` was a block-axis scroll container clipping tall KaTeX at its padding box. Cured with `overflow-y: clip` + `overflow-clip-margin: 0.75rem`, the value that does what `visible` was written to mean.
- **`PV ★MF-10`'s three light-arm ramp stops**, handed over measured by `.e` — and taken **0.003–0.006 darker, with the arithmetic**. `.e` measured live against `rgb(251 250 248)` = `--background`; the ramp also paints on `--card` (`rgb(253 245 236)`), the STRICTER light plate, where `.e`'s values read **4.454 / 4.438 / 4.433** — all three back under the floor. The values landed clear 4.5:1 on BOTH plates (card 4.511 / 4.513 / 4.508; background 4.687 / 4.690 / 4.684), chroma and hue untouched, dark arm restored to the producer's values in the shape `--section-color-5` already used.
- **`fr-CP D-1`'s `golden` limb** (`lib/colors.ts`): `golden` was absent from `VIZ_TOKENS` — theme-blind BY ENUMERATION — so the sum curve, hover trail and shimmer all painted a frozen `#f0b632` reading **1.766:1** in the light arm, roughly half the 3:1 graphical-object floor. Resolved to `--viz-amber` (**4.709:1** on `--background`, **4.532:1** on `--card`, **10.940:1** dark), ⊘ **not** a newly minted `--viz-golden`: both were offered and this one claims no colour authority this seat was given. `useCoeffHover.ts:75` already read `VIZ_COLORS.amber || VIZ_COLORS.golden`, so the alias makes an existing fallback honest rather than introducing a collision.

#### Act 9 — the SCRUB, and the half of its arithmetic a deletion ledger usually omits

`F-W4-SCRUB-LEDGER.md`. **DELETED**: `IU-25`'s trio, each with its proof. **MEASURED DEAD, NOT DELETED**, with holders: `getMe` (a wire wrapper over a live endpoint — a contract decision, F.W5-W8's), `evaluateBasis` (under the CONV-STUDY's own adoption question), `loadDraftByVisualizationSlug`/`deleteDraft` (the same `GCM-1` adoption gap), and three exports that are **live internally** and only over-exported (`yieldToMain`, `generateCurveSVGPath`, `ANIMATION_DEFAULTS`) — the class a naive census miscounts.
**`VV-R2-B`: RETAINED FOR ADOPTION**, decided WITH `.d`'s `GCM-1` receipt as the lock requires. 10 of 10 zero-consumer figures reproduce; four of the ten are exactly the surface the un-landed wiring unit adopts, and the row itself rules *"a single wiring unit at this component, not scattered repairs."* Deleting them would delete that unit's landing site. **Answered jointly, not deferred.**
**Bundle diff, two builds, same `node_modules`** (a detached worktree at `7b736f8` vs the tree at `0a16b83`): JS **2,077,343 → 2,080,018 B (+2,675, +0.13 %)**, CSS **525,248 → 526,515 B (+1,267)**, five chunks moved. ⊘ **This unit's span ADDED bytes and the SCRUB is not why** — the growth is the cures. And the deletions' own share is **zero, measured**: `computeSha256`, `checkImageHash`, `by-hash`, `class-variance-authority`, `clsx`, `tailwind-merge` and `url(#paper-grain)` return **0** occurrences in the emitted assets at **BOTH** builds. The trio was already tree-shaken before it was deleted, so the deletion removes source surface — a contract, a raw `fetch` outside the parametric core, a bare `throw` — and not one shipped byte. A ledger reporting only its deletions would be reporting half its own arithmetic.
**`.a`'s Residual 4 discharged as an exclusion**, with the precise probe `url(#<id>)` rather than a substring: 0 in `src`, 0 across three producer `dist` trees, 0 in the emitted output. ⊘ The loose probe returns **three** glass-ui files for `paper-grain` and every hit is a custom-property NAME (`--paper-grain-tooth`/`-tile`/`-relief`) — a seat running it would have recorded a producer consumer that does not exist. The DELETION is not this unit's file.

#### Act 10 — `G-F4-CONV-STUDY`, opened only after `.b` measured (`cbda8b6f`)

`F-W4-CONV-STUDY.md`. The lock is discharged by `.b`'s `b3b9a35` + its published table. Findings, all measured:

1. **The coefficient substrates are not merely duplicated — they are IDENTICAL.** Same spectrum, both implementations, one node process, 1,001 samples of `t`, double-run: `max|Δ|` chain = **0** and `max|Δ|` curve point = **0** at N = 10/50/100. Throughput within **1.9 %** in both directions. The duplication buys nothing and costs nothing; it is a maintenance liability and only that — a smaller finding than the census implied, and a cleaner one.
2. **The Fourier math is NOT the cost a GPU move would offload.** `BasisCanvas` calls `fourierPositionsAt` **once per frame**; at the app's default 200 harmonics that is **≈3.1 µs — 0.019 % of a 16.67 ms frame**. What `FourierField` would take over is RASTERISATION, and that half no headless instrument can weigh → SS-13, flagged not guessed.
3. **`BasisCanvas` owns the INSTRUMENT regime and is not replaceable**: three bases, hit-tested labels, image overlay, a user's own contour, ghost path. `FourierField` at 8.0.0 is fourier-only and seeded, and its own README calls itself decorative. **`FourierField` owns the AMBIENT regime, where this app has no consumer at all** (⟨cmd⟩ `grep -rn 'fourier-field\|fourier-math' src/` → **0**) and where it already ships live PRM freeze, offscreen pause and a deterministic `freeze` still.
4. **The highest-value row the census did not name**: the producer ships a client-side FORWARD DFT (`dftFromPoints`, **2.2 ms / 256 samples, round-trip error 2.8e-14**) and this app buys the same step with a network round trip to Python.

⊘ Adoption decisions route to **SS-3/SS-4**, per §2.L's own terms. Nothing scheduled, nothing landed, no producer byte touched. §5's gBCR MEASURE-BEFORE baseline is recorded as a COUNT (17 repo-wide; `useCoeffHover.ts`'s 2 are `D·D-m9`'s pair); the magnitude is SS-13.

#### Act 11 — E13 mail (this seat's own act)

Swept read-only at this seat's clock (**2026-09-18 21:24 EDT**), six paths, delta against 19:45 (`.e`'s sweep line): ⟨cmd⟩ `/usr/bin/find <each> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 19:45"` → **∅** on all six except `INBOX.md` itself (**self-excluded**, SELF-COUNT law).
⟨cmd⟩ `/usr/bin/grep -nE '\| *\*\*UNREAD' docs/tranches/V/coordination/INBOX.md` → **three** rows, `I-32` · `I-33` · `I-34`, each classified from its own **Status** cell, never from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**). Every one is routed at its Routing cell to X-W0.j / the X formation mail seat; not one names a `lib/`, `stores/`, `style.css`, SCRUB or convergence byte. **0 unrowed · 0 new `I-n` · 0 UNREAD in `.f`'s scope.**
⊘ `docs/tranches/V/coordination/INBOX.md` is **not** in this unit's writable set, so no sweep line was appended. Stating the restraint is the point, and it follows `.e`'s precedent: a unit that writes outside its bounds to satisfy one law has broken another.

#### Gate readings, BEFORE → AFTER (every AFTER double-run at the settled bytes)

| gate | BEFORE (wave baseline) | AFTER (this unit) | verdict |
|---|---|---|---|
| **`G-F4-PRM-CLOCK`** | RED — 5 ungated clock owners; `stores/animation.ts` the one no sibling could reach | **8 rAF call owners, 8 consulting PRM** (double-run) ⊕ live: 0 rAF callbacks in the reduced arm vs 15, 0 page errors | **GREEN** |
| **`G-F4-CONV-STUDY`** | RED — *"No study exists"*; `L-B3` unmemoised | `F-W4-CONV-STUDY.md` — a MEASURED memo taken after `b3b9a35`, naming which renderer owns which regime, adoption routed to SS-3/SS-4 | **GREEN** |
| **`G-F4-DEAD-DEP`** | RED — dead surfaces live; no ledger | `F-W4-SCRUB-LEDGER.md` — every deletion with its zero-consumer proof, no dependency removed while imported, bundle diff recorded in BOTH directions | **GREEN** |
| **`G-F4-CENSUS-CELLS`** | RED — no correction landed for any of the six cells | this unit's cell (`lane-frontend.md:558-559`/`:624`) corrected by dated addendum-beside, banked adjacent to its cure | **GREEN for this unit's cell** |
| **`G-F4-VUE-TSC-CLEAN`** | RED — 18 diagnostics at wave-open; this unit's site `api.ts(5,5)` TS6196 | ⟨cmd⟩ `npx vue-tsc -b --force` ×2 → **1** diagnostic, `ContourEditorCanvas.vue(42,9) TS6133`, under `.c`'s EVALUATE-ONLY lock and unwritable by any seat in this wave. ⟨cmd⟩ `npx eslint src/lib src/stores src/composables` → exit **0** | **GREEN for this unit's file; RED wave-level, reported with the one row named** |

#### Commits

| hash | repo | meaning |
|---|---|---|
| `7b736f8` | fourier | SP-12 — one typed catch at the seam; the array-shaped `detail` stops being parsed and thrown away |
| `dabbb17` | fourier | SP-12 ⊕ EV-L·M-4 ⊕ IU-25 — one answer to a missing admin token, a backoff an abort can reach, three client verbs nobody called |
| `02010de` | fourier | SP-13 — the restore seam validates; the speed domain is named once instead of five times in a template |
| `b62dcf2` | fourier | SP-16 — two wholesale-assigned records stop being deep proxies |
| `a512661` | fourier | MG-λ — the toast's duration is honoured, because the producer has a place to put it |
| `2ef87d1` | fourier | `G-F4-PRM-CLOCK` closes ⊕ FMD-22's false gate comment |
| `0a16b83` | fourier | the sheet's collected residue — PAW-55, three ramp stops, the golden resolver line |
| `cbda8b6f` | value.js | the SCRUB ledger, the convergence study, the dated addenda-beside |
| *(this line's own)* | value.js | this receipt |

⊘ Every commit carried its own pathspec **on the commit itself**; ⟨cmd⟩ `git show --name-only` on each returns only this unit's files — **not one sibling path in any of the nine**. `scripts/dev/dev.sh` untouched. No `git stash`, no `reset --hard`, no force-push, no `add -A`/`-u`.

#### Escalations (each with its measurement; full text in the addendum)

- **`FR-GFC-1 = FR-GSB-1` — REFUSED at this end, with cause (A-f-6).** `.d` asked for the `api.listVisualizations` widening. Measured at the server: ⟨cmd⟩ `grep -n "async def list_visualizations" -A 6 api/routers/visualizations.py` → the endpoint accepts `limit`, `sort`, `cursor`, `owner` and **nothing else**. Widening the client to carry `q`/`tier`/`basis` would put them on a wire that ignores them while the client's own types CLAIMED the filter existed — a filter that filters nothing, which is the masking class this wave forbids by name. The row is a CONTRACT row; F.W5-W8 owns it. **The refusal is the cure.**
- **The `speed` type narrowing — landed at runtime, declared at the type (A-f-4).** Pinia collapses a `WritableComputedRef<T, S>` to its getter type, so narrowing the store surface breaks exactly three assignment sites in two files outside these bounds. Named line-for-line; the runtime guarantee holds for every writer meanwhile.
- **`SP-12`'s `resetMs` deviant is outside this unit (A-f-5).** Three sites, two values; `UserSlugBar.vue:25`'s **1500** is the sole deviation and the lock's inversion reproduces exactly. One line, `.d`'s file. **No byte written.**
- **Two dead dependencies, proofs complete, edit declared (A-f-10.7).** `class-variance-authority` and `clsx`: **0** references across `src`, `e2e`, `vite.config.ts`, `index.html`, and neither a glass-ui peer dependency. `web/package.json` is `.g`'s under §1 (*gates only*). ⊘ Census correction in passing: the same cell's other two names are wrong today — `tailwind-merge` is **not a dependency at all** and `reka-ui` has **6** live consumers.
- **Four further one-line follow-ups declared to `.z`** (A-f-10): `adminError.ts` re-points at the now-landed seam · the two inert `getAdminToken()!` assertions · `gallery.ts`'s silent third posture, now able to call through · `lib/equation/api.ts` passing `retryOn429: false`, the line `.b` named as owed *"the moment (i) exists"* — and (i) now exists.

#### Residuals and roster

- **GREEN-BEFORE-ITS-CURE, listed not smoothed**: `EP-MISSED-F`'s duplicate import (discharged by ESC-4's F.W2 rewrite, `0cc9b00`) · `search/index.ts` (deleted by `.e`) · `FR-EQR-22`'s unearned `!important` (cured by `.b`; ⟨cmd⟩ `grep -rn "!important" src/` → **5** live sites, all `/equation` SFCs, none in `style.css`) · the `.sidebar-link` font-weight transition (deleted by `.e` under `PV ★MF-6`, in `PaperSidebar.vue`, never in `style.css`).
- **A method note worth more than the finding (A-f-2)**: this seat's first clock census ran `grep -rln "requestAnimationFrame"` and then read **9** owners after the seat wrote a COMMENT containing that identifier. A census keyed on a bare identifier counts prose. The instrument of record is the call shape `requestAnimationFrame(`, and every figure published here is taken with it.
- **SS-13, deferred never resolved inline**: the composited readback of a populated workspace in the reduced arm · the `BasisCanvas` ↔ `FourierField` RASTERISATION comparison (the only half of the study no headless instrument can weigh) · the gBCR magnitude over a KaTeX subtree · `PAW-55`'s own question, whether a specific equation was clipping.
- **F.W5-W8, routed with their reasons**: `VV-R2-B` + `GCM-1`'s wiring unit · `FR-GFC-1`'s list contract · `SS-C-1`'s persisted `speed` atom and the `AnimationSettings.speed` wire · `getMe`'s contract surface · the CONV-STUDY's four adoption questions (to SS-3/SS-4).
- **⊘ Negative roster — held**: `I-2`'s empty state survives · `CanvasOverlayButton` not re-created · **the Tooltip shim is NOT deleted** — ⟨cmd⟩ `grep -rn "Tooltip" src/ | grep import` → **10 import sites across 10 files**, and it was never a candidate · `GM-19` not certified · CP KILL-6 not executed · `moon.json` not regenerated · **no glass-ui byte touched** (READ-ONLY always; the producer-shaped facts ride A-f-8's exclusion and `.z`'s relay) · no `test.skip`, allowlist, `fixme`, try/catch-around-a-defect, copied producer selector or `node_modules` patch anywhere in this unit · no producer pin moved · no `e2e/**` or `package.json` byte written.

---

### `.z` — closure, correspondence and the two-direction census

**Seat**: `.z`, `claude-opus-5[1m]`, 2026-09-18 (sitting's date of record 2026-09-17). **Status: DONE** — every gate this unit owns was RUN and every reading published, including the one the wave record left `UNMEASURED-AT-OPEN`.
**Gates turned**: `G-F4-NEG-ROSTER` **GREEN (HELD)**. **Gates RUN and reported RED with relief cited**: `G-F4-CARRY-CLOSURE` (leg (a) **GREEN**, leg (b) **RED**) · `G-F4-ANCHORS` · `G-F4-CENSUS-CELLS` · `G-F4-VUE-TSC-CLEAN` (18 → **1**) · `G-F4-ZERO-CONSOLE` (**MEASURED**, 1 of 4 green).
**Commits**: 5 value.js (`17cd2097` `dbc9be3a` `04b90ada` + this receipt + the ledger row). **Zero fourier bytes written by this seat** — every fourier-side reading below is a read (`git`, `grep`, `find`, `ls`, `nc`, `npx vue-tsc -b --force`, `npm run derive:loops`, four named Playwright tests). **Zero glass-ui bytes, ever.**
**New artefacts**: `docs/tranches/X/fourier/F-W4-CLOSURE.md` · `docs/tranches/X/fourier/F-W4-ADDENDA-z-2026-09-18.md` (**A-z-1 … A-z-9**) · the two relay letters. **`F-W4.md`, the carries, the registry, `CENSUS-CANONICAL.md` and `CENSUS-2026-08-03.md` are byte-untouched (E-3).**

#### Act 0 — CRASH-RECOVERY sweep (standing law): nothing inherited

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | /usr/bin/wc -l` → **0** (clean; branch `m/w1-bump-migration`, HEAD `0a16b83` = `.f`'s last).
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 12 modified ⊕ 5 untracked, and **not one is inside this unit's writable set**: the ten `demo/**` SFCs and `docs/tranches/V/reformation/CARRY-LEDGER.md` are sibling seats'; `scripts/dev/dev.sh` is the unowned standing-dirty path (**NEVER touched, never staged**); `docs/tranches/X/waves/evidence/**` and the two `e2e/smoke/**a11y-control-targets.spec.ts` are Track A's. The three value.js files this unit creates were **ABSENT** before it wrote them. **Zero inherited paths; no killed predecessor's partial work on this unit.**

#### Act 1 — the predicate, its fixture and the engine banner, BEFORE any figure

The gate's own condition: *"leg (b) prints its predicate's fixture result **AND** its engine banner beside its set-difference **or its green is unread**."*

⟨cmd⟩ `/usr/bin/grep --version` → **`grep (BSD grep, GNU compatible) 2.6.0-FreeBSD`** — ⊘ **no PCRE**, so `grep -P` exits 2 and a receipt written on it cannot launch.
⟨cmd⟩ `printf '%s\n' 'row: FR-AUL-26 then L-26 end' > fix2.txt; /usr/bin/grep -Ec '(^|[^A-Za-z0-9-])L-26([^A-Za-z0-9-]|$)' fix2.txt` → **1** ✔ · `… -Eo … | /usr/bin/wc -l` → **1** ✔. **The predicate of record FIRES.**

⊘ **Method, stated so it is falsifiable rather than trusted.** 1009 ids × up to six candidate spellings is ~5,000 probes; the bulk scan ran the **byte-identical expression** compiled in one process, and **every id it reported as an ESCAPE was re-probed with `/usr/bin/grep -Ec` itself** before publication. No escape below is claimed on a non-`grep` reading.

#### Act 2 — `G-F4-CARRY-CLOSURE` leg (a): CARRY → spec. **GREEN, 438/438**

⟨cmd⟩ `/usr/bin/wc -l ../carry/F-W4-CARRY.md` → **559**; ⟨cmd⟩ `/usr/bin/grep -c '^- \*\*' ../carry/F-W4-CARRY.md` → **438** (double-run identical).

| reading | figure |
|---|---|
| carry row-head bullets | **438** |
| resolved by an id token with a boundary-exact byte in the spec | **426** |
| resolved as prose heads to a §0 law / §1 bounds item / §4 gate / §5 cross-edge | **12** |
| **set-difference** | **0 — EMPTY** |

The twelve prose heads are resolved **id-for-id** at `F-W4-CLOSURE.md` §1 (`LOOP-SOURCE PROVENANCE` and `DISCLOSURE-STATE GATE` → `G-F4-DERIVER`'s own publish fields · `CORRECTED DENOMINATORS` → F.W0 `G-12` · `REPAIR-UNIT SIZING` → the *"a cure inherits no severity"* law carried in-spec · `EVIDENCE STANDARD` → §0 · `⊘ SC-L-§R SCOPE LAW` → §2.X.2(b)'s `fr-SliderControl Scope-law` · the six route bullets → **§1 Bounds**).

⊘ **The masthead says 421 and the file carries 438.** The gate's operand is the file, not the count word (R4-7.3). Leg (a) ran over the 438; the divergence is banked at **A-z-6** and `F-W4.md` is not amended.
⊘ **A finding leg (a) produced rather than confirmed**: the six route bullets at `F-W4-CARRY.md:537-542` carry the **same dead `views/` spelling** seat 0 struck in §1. The kill is at **two** documents and curing one does not reach the other — **A-z-1**, and G-11 row 13.

#### Act 3 — leg (b): REGISTRY → spec, the binding direction. **RED, 17 escapes**

**Step (i)** — the canonical roster, reproduced exactly. ⟨cmd⟩ `/usr/bin/sed -n '5023,5077p' ../conformance/CENSUS-CANONICAL.md`; ⟨cmd⟩ `/usr/bin/grep -c '^- \*\*fr-'` → **54 records**; parse → **1007 rows**; band expansion (`FM-17..FM-19` = ONE row, THREE ids) → **1009 ids**. Double-run identical. ⊘ **The parse's one load-bearing decision**: the separator is ` · ` **between backtick cells**, and `·` also lives **inside** ids (`L·D-3`, `D·D-B4`) where canonical §0.1 protects it exactly as it protects `/`. A first pass that split on the byte read **957** and shredded `fr-EquationView` from 60 cells to 24. **The identity cell is the backtick span, never a split on a character ids contain.**

**Step (ii)** — (f)1 record-prefix (**including the space spelling** `DMT N-4` / `PV ★MF-10` / `PS D-B2`, which §4's own cells use) · (f)2 suffix-elision chains with inclusive ranges and `-27` **left struck** per PASS-5 P5-2 · (f)3 prefixed continuation chains emitting the **banked** id · §2.X.2(a)'s three local schemes (`CP-N` ×18 · `FR-CP-L*`/`-D1`/`-D9`/`-C7` ×12 · `CT-D*` ×4).

**Step (iii)** — record-qualification, homonym set derived from **every** `(record, id)` pair across **all** of the canonical §2 rosters (the real collision surface), with self-prefixed ids (`GAB-1`, `FR-AUL-26`, `HLG-37`) exempt.

**Step (iv)** — the diff, taken THREE ways, all double-run identical:

| reading | rule | HELD | ESCAPES |
|---|---|---|---|
| **R1** | (f)1–(f)3 + (a); axis (iv) read **literally**, same line only | 936 | **73** |
| **R2** | + **idiom (f)4** — the fourth booking idiom the spec uses and does not declare | 975 | **34** |
| **R3** | + **block-scope** record qualification | **990** | **18** |

**Two findings produced the difference and both are defects of the spec's DECLARATIONS, not of its bookings:**

- **A-z-2 — the undeclared fourth idiom, 39 rows.** §2.G ships `FR-CL-D3 · D-4 · D-11 · D-12/C-9 · …` and `FR-CL-D7 ⊕ D-8 ⊕ D-10 ⊕ M-R7`: a **record-prefixed continuation chain over FULL ids** with a **hyphen-dropping rename on the head** (`FR-CL-D7` = banked `D-7`) — the `FR-CP-LM1` class (f)1 already convicts, at a second prefix. 39 canonical rows are reachable by it and by no declared idiom. **Declared, not re-spelled**: re-spelling would fracture six §2 cells to buy what one declaration buys, and §2.X.2(a) already sets that precedent.
- **A-z-3 — axis (iv)'s "on the same line" is one clause too narrow, 16 rows.** §2.X.1(B) names `fr-ContourEditorCanvas` in its **block head** and books 22 rows as bullets beneath it, none repeating the record. **The block-scope form is the reading of record**, published with the literal reading beside it (73) so the widening can be refused. ⊘ It rescues nothing that matters: the 11 + 5 escapes below are escapes at **every** reading.

**THE SET-DIFFERENCE, id-for-id — 18 rows, each with a disposition:**

| class | rows | disposition |
|---|---|---|
| **BOOKED under a fifth, undeclared idiom** (1) | `fr-ConvergenceLegend` **`D-L6`** | written at §2.G as a **parenthetical rider** on `FR-CL-M-R13` with its cure; **not an escape**. Idiom **(f)5** declared at **A-z-4**, with `fr-EquationPanel D-L1` given as the counter-case that (f)5 does **not** rescue |
| **ESCAPES — the EVALUATE-ONLY record's unreached residue** (11) | `fr-ContourEditorCanvas` `C-21` · `D/B-1` · `D/B-2` · `D/B-4` · `D/M-4` · `D/M-5` · `D/M-7` · `D/M-9` · `L-7` · `L-8` · `L-9` | the canonical homes **40** rows here; §2.X.1(B) books **22** on its reading of `§X.1-v4`; these eleven are **neither**, and **every bare byte of each belongs to a foreign record** (`PV D/B-1`, `ECD …C-21`, `CCD-D-3/L-8/C-8`, `PS-M4 ⊕ … L-7 … L-9`). **Relief: `.c`'s A-c-1** — the file is **EVALUATE-ONLY** under §1 and *a wave cannot cure a row on a file it may only read* |
| **ESCAPES — record-blind homonym collisions** (5) | `fr-ConvergenceLegend` **`C-11`** · `fr-ConvergenceTimeline` **`M-5`** · `fr-EquationPanel` **`D-L1`** · `fr-FullscreenViewer` **`FM-4`** · `fr-VisualizationView` **`L-23`** | each impersonated by another record's row of the same spelling; **no relief this wave can cite**, named id-for-id with the impersonating bytes and carried to the repair docket |
| **ESCAPE — a booked class whose per-record instance identity is unwritten** (1) | `fr-EasingCurvePreview` **`R5-7`** | the canonical homes `R5-7` on **four** records; three are reachable, the ECP instance has no record-qualified byte. The **class** is booked (§0 BS-1 ⊕ the `L-16` single ⊕ `G-F4-DERIVER`); the **instance identity** is not — §6.4's convicting shape one level down |

⊘ **Two of the five collisions indict the programme's own idioms.** `fr-FullscreenViewer FM-4`: four repair rounds proved `FM-18` appears at no substantive byte of the spec and **never asked whether the band's FIRST member is unique** — it is not, and the band's own expansion makes the collision invisible by construction. `fr-VisualizationView L-23`: the impersonating byte is a `CCD R5-7 scope note` **carrying a GLASS-RELAY routing**, which is what made it look settled — the identical shape §2.X spent five paragraphs on for `L-26`, run a second time.

⊘ **The fabrication direction was run too** and found nothing new: §2.X.2(b.6)'s three (`FR-AH-27` → F.W1 · `PP-AGGLOM` · `PP-SEVLAW`) are all **cited and not booked** at the settled bytes. The scan's direction is roster→spec, so it cannot by construction discover a fabrication the roster does not name; that limit is **stated**, not left to be inferred.

**Leg (b) verdict: RED.** 990 of 1009 held; **17 escapes / 1007 rows**. ⊘ Prior readings were RED at 53 (PASS-1), 17 (PASS-2) and 32 (round 3). **This is the first taken against the canonical rather than against a predecessor's enumeration** — R4-3's whole point — and the first whose residue fits in one table with a relief beside each row. The transcript publishes the 17, never a percentage (§0 forbids it, and the 17 are the only part a repair can act on).

#### Act 4 — `G-F4-ANCHORS`: the quotation verified, seven kills contributed (`17cd2097`)

⟨cmd⟩ `/usr/bin/grep -n '^### 2.1 G-11' docs/tranches/F/SUBSTRATE-LEDGER.md` → `333:### 2.1 G-11 — THE CORRECTED ANCHOR TABLE`. Its masthead (*"This is the ONE table; every later X·F wave **quotes** it and re-performs no re-resolution of its own"*) and its rule **P-4** (*"producer-side evidence carries the producer COMMIT HASH, never the version string"*) are adopted unamended; its register runs rows **1–11**. **THE QUOTATION IS FAITHFUL** — this wave re-performs none of the eleven and adds no rival table.

**Seven contributions, published as rows 12–18 at `F-W4-CLOSURE.md` §4**: (12) §1's `views/` directory — **STRUCK**, ⟨cmd⟩ `/bin/ls web/src` has no `views/` and the four `*View.vue` live under `components/` · (13) the same spelling at `F-W4-CARRY.md:537-542`, found by leg (a) · (14) the §3-relative §4/§5 coordinate class, **base measured 352** · (15) `fr-EditorControlsDock`'s −1 rule-span over-running onto `</style>` · (16) the `/equation` record set's whole-record drift (`EquationView.vue` 478 vs 469) · (17) **`fr-SpeedSelect` 8-of-8 EXACT — a published NEGATIVE**, because a register that records only failures cannot say which instruments are trustworthy · (18) **NEW, this seat: an INTRA-WAVE drift.** `.g` Act 9 banked `AppHeader.vue:121`/`:134` as the two UNRESOLVED `:is` sets; this seat's re-run reads **`:124`/`:137`**, because `.a`'s edits landed after `.g` measured. **A gate's published witness aged inside its own wave**, and G-11 carries no row of that class.

⊘ **BOUNDS, DISCLOSED**: `SUBSTRATE-LEDGER.md` is a **fourier** file and is **not** in `.z`'s writable set. The rows are published **ready-to-append** and not written — `.b`'s and `.e`'s precedent for `e2e/contrast-pairs.ts`: *a unit does not widen its bounds on a sibling's invitation*. **`G-F4-ANCHORS` stays RED at this seat for exactly that reason**, with the relief named (the F.W0 table's owner).

#### Act 5 — `G-F4-CENSUS-CELLS`: the set verified cell by cell. **RED, 3 of 6**

| cell | landed | verdict |
|---|---|---|
| `raw-findings.json:1393` (FR-AH-31) | ⟨cmd⟩ `/usr/bin/grep -l -- '1393' F-W4-ADDENDA-*.md` → `…-a-…` | **CORRECTED**, `e022edf` ⊕ `fff145da`, one act in two repositories, each naming the other |
| `raw-findings.json:2968` (CCD D-3) | ⟨cmd⟩ `… '2968' …` → **NONE** | **NOT CORRECTED** — `.c`'s |
| `lane-frontend.md:617` (PV D/M-1) | ⟨cmd⟩ `… 'lane-frontend.md:617' …` → `…-e-…` | **CORRECTED, CLAUSE MISSED** — the cure is `1a971c0`, the addendum landed at `980785e3`, `.e`'s **closing** docs commit |
| `lane-frontend.md:558-559`/`:624` | ⟨cmd⟩ `… '558-559' …` → `…-f-…` | **CORRECTED**, `2ef87d1` ⊕ `cbda8b6f`, adjacent and cross-named |
| `CENSUS-2026-08-03.md:362` | — | **NOT FALSIFIABLE.** ⟨cmd⟩ `/usr/bin/sed -n '362p'` shows it is a **CONDITION row** (R3-10 · R5-7 · X-2 · X-9), not a claim. **Discharge state published at A-z-5**: R5-7 **DISCHARGED** (31 directives, 15 native / 16 callsites, 0 unkeyed); R3-10 **PARTIAL and the shortfall is the point** (5 sites, 3 resolved, 2 UNRESOLVED-not-zero — `BS-2`'s shape); X-2 is F.W0's; X-9 **HELD** (no percentage published). ⊘ Filing a "correction" against a sentence that was never wrong would have been a false receipt of the cheapest kind |
| the 2026-06-01 HLG-8 aria-label claim | ⟨cmd⟩ `… 'HLG-8' …` → **NONE** | **NOT CORRECTED** — `.a`'s |

⊘ **The same-commit clause is not ceremony**: the next seat to read `lane-frontend.md:617` between `1a971c0` and `980785e3` would have read a false cell with the cure already in the tree. Named at **A-z-8**, not excused.

#### Act 6 — `G-F4-NEG-ROSTER`: **GREEN (HELD)**

Verified at the bytes, not asserted: this seat **re-ran** `G-F4-DERIVER` (⟨cmd⟩ `npm run derive:loops`, exit 0) and read its `nativeLoopsByDirective` listing for **all six §0a components** — `AppHeader` · `ConvergenceTimeline` · `HarmonicLevelGrid` · `EasingPicker` · `PaperSearchDropdown` · `GalleryCardModal`. **Not one appears as a native-element loop directive**; AppHeader's only two deriver rows are `:is` candidate sets (`BS-2`, a different axis from §0a's R5-7 negative) and both report **UNRESOLVED**, which grows nothing.
⟨cmd⟩ `ls web/src/components/visualization/gallery/GalleryMarquee.vue` → *No such file or directory* — **`GM-19` cannot be certified**: `.d` executed D1 DELETE and the family is deleted, not revived.
⟨cmd⟩ `git log 717d287~1..HEAD --format='%s' | /usr/bin/grep -ciE 'KILL-6|GM-19|moon\.json'` → **0** over the wave's **66** commits.
⟨cmd⟩ `git log --oneline 538db90..HEAD --name-only -- '*moon.json'` → **no output** — never regenerated since F.W1's atomic commit.
Tooltip shim: `.f`'s ⟨cmd⟩ `grep -rn "Tooltip" src/ | grep import` → **10 import sites across 10 files** — never deleted.

#### Act 7 — `G-F4-VUE-TSC-CLEAN`: the final green, measured. **RED, 18 → 1**

```
⟨cmd⟩ npx vue-tsc -b --force   ×2, /usr/bin/diff → IDENTICAL
EXIT=1
src/components/visualization/ContourEditorCanvas.vue(42,9): error TS6133: 'dragging' is declared but its value is never read.
```

**Delta from the 18-diagnostic baseline: −17.** ⊘ **The single survivor is unwritable by any seat in this wave** — `.c` named this exact diagnostic in its Act 10 judgement and wrote no byte, `.f` read the same 1 at its close, and this seat reproduces it. **Relief: A-c-1 — one ruling closes this diagnostic AND the eleven closure escapes at Act 3.** ⊘ The gate's stated witness (`glass-scrubber` ∉ the pinned vocabulary, MPC-13) died with F.W1's uplift and is **not** re-reported; the gate has been RED on `noUnusedLocals` since wave-open, disclosed at seat 0.

#### Act 8 — `G-F4-ZERO-CONSOLE`: **RUN. The gate the record left UNMEASURED is measured**

The four gates named at their bytes (⟨cmd⟩ `/usr/bin/grep -rn 'consoleErrors' e2e/`): `workspace-flow.spec.ts:175` · `paper-performance.spec.ts:235` · `gallery.spec.ts:118` · `contour-extraction.spec.ts:139`. (The fifth hook site, `visualization-crud.spec.ts:612`, is invariant 3 inside the CRUD lifecycle test and is not one of the four.)

RUN against vite dev at `:3000`, `--project=chromium`, **double-run, both runs identical**:

| gate | run 1 | run 2 | cause |
|---|---|---|---|
| `paper-performance` | **✓ 2.6s** | **✓ 2.5s** | the only one of the four touching no API |
| `gallery` | ✘ | ✘ | `realErrors` received **exactly one** distinct entry: `"Failed to load resource: … 500 (Internal Server Error)"` |
| `workspace-flow` | ✘ | ✘ | `TimeoutError: page.waitForURL: Timeout 15000ms exceeded` — the upload POST has no backend, so the app never navigates |
| `contour-extraction` | ✘ | ✘ | the same shape at `:155` |

Environment measured **before** the run and named as the cause rather than inferred after it: ⟨cmd⟩ `nc -z localhost 27017` → **DOWN**; ⟨cmd⟩ `docker info` → **DOWN**.
⊘ **The discriminator, because "the backend is down" is an excuse unless it is measured**: ⟨cmd⟩ `/usr/bin/grep -ciE 'pageerror|Uncaught|TypeError:|ReferenceError'` over **both** transcripts → **0** and **0**. **Not one page error, uncaught exception, TypeError or ReferenceError in either run.**
⊘ The atomicity precondition the gate actually guards is separately green: F.W1 landed as ONE commit (`538db90`, 58 files) and `.g` verified zero bytes of the five hook specs were touched.

**HONEST-RED, and for the first time READ.** 1 of 4 green; 3 unreadable at this seat with the cause measured and zero app-code errors. Relief: CI's backend arm. ⊘ **It is not claimed green and it is not left unmeasured** — the difference between those two is why it was flagged at open.

#### Act 9 — the two relay letters, rowed, and the E13 close sweep (`dbc9be3a`, `04b90ada`)

**ONE glass-ui BH/SS-6 letter**, as the law requires, carrying every `GLASS-RELAY` ask `.a`–`.f` **declared and did not send**: eleven measured rows over four contrast facts (`--success` 2.133 light / 2.175 itself; `--card` ≡ `--background` at 1.035; `--border` 1.865/2.001 against 3:1; the ramp's zero headroom), three DOM/semantics rows (reka FocusScope sentinels ×12 at a production build **beside zero `color-contrast` violations**; no `aria-modal`; `useSidebarFollow` hard-coding `.sidebar-top-btn`), the `parentId` defect **both** producers carry, and three API rows. ⊘ **Credit first**: `CCD M-2`/`ECD B-2` **shipped at 8.0.0** and **inverted our own booked cure**, with the GREEN-BY-TYPO probe handed over (`keydown` vs `onKeydown`). ⊘ **One ask WITHDRAWN with cause** (`AA-3`'s violet `batch` tone — `batch` is a namespace, not a severity; shipping it would carry our inversion into the design system).
**ONE latex-paper letter**: the theme sheet inert twice over (42 `hsl(var(` + never loaded) with `K-9`'s kill confirmed at the bytes; **`PAW-38`**, carried because `.i`'s Residual 3 says the D5 deferral *renews itself silently* otherwise; the shared `parentId` defect; cap-don't-delete for `PAW-45`/`-46`.
Rowed **O-32** and **O-33**. ⟨cmd⟩ `git -C ../glass-ui status --porcelain | /usr/bin/grep -ci 'fw4-relay'` → **0**.

**E13 close sweep**, six paths at this seat's clock, delta against `.f`'s 21:24 → **∅ on all six** except `INBOX.md` itself (self-excluded). Classification from each row's **Status** cell, never from a bare `grep -i unread`: **three** UNREAD rows, `I-32` · `I-33` · `I-34`, **every one routed at its own Routing cell to X-W0.j / the X formation mail seat**, and not one names a fourier `web/` byte or any F.W4 row. **0 unrowed · 0 UNREAD in F.W4's scope · 2 rows minted.**

#### Gate readings, BEFORE → AFTER (this unit's own gates; every AFTER double-run)

| gate | BEFORE (seat 0) | AFTER (this seat) | verdict |
|---|---|---|---|
| `G-F4-CARRY-CLOSURE` | RED — no closure transcript in tree; leg (b) never measured against the canonical | leg (a) **438/438, set-difference EMPTY**; leg (b) **990/1009 held, 17 escapes** named id-for-id | **leg (a) GREEN · leg (b) RED → GATE RED** |
| `G-F4-ANCHORS` | RED, one kill banked | quotation **FAITHFUL**; **7** kills published ready-to-append (rows 12–18) | **RED** — the table is outside this seat's bounds |
| `G-F4-CENSUS-CELLS` | RED — no correction landed for any of six | **3 corrected · 1 published as a discharge · 2 uncorrected · 1 outside its cure's commit** | **RED** |
| `G-F4-NEG-ROSTER` | HELD-AT-OPEN (obligation) | verified at the bytes on all six clauses | **GREEN (HELD)** |
| `G-F4-VUE-TSC-CLEAN` | RED — **18** diagnostics | **1**, double-run identical, unwritable by any seat in this wave | **RED, −17** |
| `G-F4-ZERO-CONSOLE` | **UNMEASURED-AT-OPEN** | **RUN**: 1 GREEN / 3 unreadable-by-environment, **0** app-code errors in either run | **HONEST-RED, MEASURED** |

**Wave-level close: 18 gates — 11 GREEN · 7 RED, every RED with its relief named and not one relieved by a fabrication.** The per-gate table is `F-W4-CLOSURE.md` §9.

#### Commits

| hash | repo | paths | meaning |
|---|---|---|---|
| `17cd2097` | value.js | `docs/tranches/X/fourier/F-W4-CLOSURE.md` · `docs/tranches/X/fourier/F-W4-ADDENDA-z-2026-09-18.md` | the two-direction closure transcript and its dated addenda-beside (one family, one commit: the addenda **are** the transcript's corrections and each names the other) |
| `dbc9be3a` | value.js | `docs/tranches/X/coordination/value-to-glassui-2026-09-DD-fw4-relay.md` · `docs/tranches/X/coordination/value-to-latexpaper-2026-09-DD-fw4-relay.md` | the wave's two relay letters |
| `04b90ada` | value.js | `docs/tranches/V/coordination/INBOX.md` | O-32 / O-33 + the E13 close sweep line |
| *(this line's own)* | value.js | `docs/tranches/X/execution/C/F-W4.md` | this receipt |
| *(the next)* | value.js | `docs/tranches/X/execution/LEDGER.md` | the F.W4 row + the event-log line |

⊘ Every commit carried its own pathspec **on the commit itself**; ⟨cmd⟩ `git show --name-only --format=''` on each returns **exactly** the listed paths. `scripts/dev/dev.sh` untouched and never staged. No `git stash`, no `reset --hard`, no force-push, no `add -A`/`-u`. **Zero fourier bytes, zero glass-ui bytes.**

#### Escalations

1. **A-z-9 — the relay letters' filenames carry the dispatch's unexpanded `DD` placeholder.** Writing `…-2026-09-18-…` would be a **different path** and therefore a write outside the hard bound, which the seat law makes an ESCALATION. **The literal paths were written** and each letter's masthead carries the real date. **Asked**: rename both by a dated bounds addendum, or ratify the spelling. ⊘ A seat does not widen its own bounds to tidy a filename — the act `.c` was told in terms not to perform.
2. **`G-F4-ANCHORS`' seven kills cannot be written into `G-11`** — `docs/tranches/F/SUBSTRATE-LEDGER.md` is a fourier file outside this seat's writable set. Published ready-to-append; **the gate stays RED until the F.W0 table's owner appends them**, and that is stated rather than worked around.
3. **The two uncorrected census cells (`raw-findings.json:2968` = `.c`'s · the HLG-8 claim = `.a`'s)** are in fourier-side and value.js-side surfaces this seat does not own as cure sites. Named with their owners at **A-z-8**; not written.

#### Residuals

- **THE ONE RULING THIS WAVE MOST NEEDS: `A-c-1`.** It relieves **eleven** leg-(b) escapes, the **last** `vue-tsc` diagnostic, and **four live BLOCKERs** on `ContourEditorCanvas.vue` at once. Every other open escalation is smaller than it.
- **Five leg-(b) escapes have NO relief** — `fr-ConvergenceLegend C-11` · `fr-ConvergenceTimeline M-5` · `fr-EquationPanel D-L1` · `fr-FullscreenViewer FM-4` · `fr-VisualizationView L-23` — on five records this wave held and edited. Carried to F.W4's repair docket, named id-for-id with their impersonating bytes.
- **`fr-EasingCurvePreview R5-7`**: the class carry is booked, the per-record instance identity is not.
- **`G-F4-CONTRAST-FLOOR` closes by ONE paste**: three units (`.b` §3 · `.d` §B · `.e` §A-e-1) handed over complete replacement rows for `e2e/contrast-pairs.ts` rather than widen their bounds; the cures are already in the bytes.
- **Open escalations at close**, each returned and none a block: `A-g-8` (package-lock ratification) · `A-a-5` ⊕ `A-c-3` (the morph bounds seam — ⊘ `MPC-31` is a ONE CUT and must not be split) · `A-c-2` (`CP-ROW-40`'s third rewire) · `.d`'s four not-landed rows · `.f`'s `FR-GFC-1` **refusal with cause** and its two dead-dependency declarations.
- **SS-13 flags, deferred and never resolved inline**, enumerated per unit at `F-W4-CLOSURE.md` §10.
- ⊘ **`G-F4-DERIVER`'s census MOVED after `.g` measured it** (A-z-7): `nativeLoopsByDirective` 33 → **31**, `isCandidateSets` 6/4 → **5/3**, `urlRefEdges` 4 → **7**. **Three of the seven new edges are METHOD ARTEFACTS, not dead ids** — `#audit-action-filter` and `#audit-target-filter` are `<label for>` targets and `#gallery-filter-drawer` is an `aria-controls` target, all three `.d`'s own SP-7/SP-8 naming cures. **A seat reading "7 UNRESOLVED" would delete accessibility wiring.** The SCRUB's exclusion test must ask `for=`/`aria-controls=`/`aria-labelledby=` **before** it asks `url()`.

#### Negative roster — held

⊘ No leaf grown on any §0a component (verified at the deriver's own listing, all six) · `GM-19` not certified · CP `KILL-6` not executed · `moon.json` not regenerated · the Tooltip shim not deleted · `FSE-L-B1` not regenerated and `FM-19` still FROZEN-FOREVER · **no glass-ui byte touched** (READ-ONLY always) · no `test.skip`, allowlist, `fixme`, try/catch-around-a-defect, copied producer selector or `node_modules` patch anywhere in this unit · no producer pin moved · `F-W4.md`, the carries, the registry, `CENSUS-CANONICAL.md` and `CENSUS-2026-08-03.md` **byte-untouched** (E-3).

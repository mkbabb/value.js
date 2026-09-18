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

**Unmoved by this unit, recorded so `.z` reads no drift into them**: `G-F4-VUE-TSC-CLEAN` **18 diagnostics, identical before and after** (none from `e2e/**` or `scripts/**`); oxlint **0 errors / 18 warnings**; Playwright collection **69 → 76 tests**, no existing test renamed or removed.

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

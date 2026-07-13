# V · pass-3 · CHARTER α — HARDEN THE WHAT-TREE PLACEMENT to a ratifiable manifest (LEAD)

**Lane**: pass-3 charter-α (`wf_d1113dbe-da7-1`, opus, model declared) · **Date**: 2026-07-13 · **Mode**:
**RAN** — every number carries its command; the census + codemod instruments live at `_proto/*.mjs` in the
isolated worktree (`npm ci` fresh; **NOT merged — evidence only**). Worktree reset to tranche-u HEAD
`07bf61d`; referent glass-ui `5.0.0` (pinned, symlinked). Deliverables: **this report** + the ratified
table as its own file (`charter-alpha-manifest.md`).

> **What this lane closes.** The composed thesis's dominant cap (AGGLOMERATION §3·Charter α): the placement
> DESIGN was proven only to RESOLVE, never to be CORRECT, and the two RAN lanes disagreed on the 5-of-18
> destinations the manifest exists to ratify. This lane (1) builds the ground-truth harness the pass-2
> census skipped and RUNS it green (3/3), (2) reconciles the 5-file divergence into ONE 18-row table proven
> UNIQUE by counterfactual, (3) corrects the two written claims — including an **honest retraction** of the
> charter-α instruction's own "aurora-atoms 3-not-2", which the measurement refutes — (4) surfaces OF-4 with
> both poles' concrete trees and first-hand coupling evidence, and (5) RUNS the 6-project smoke on the
> scattered tree.

---

## Verdict up front

| # | Charter-α item | mode | headline result |
|---|---|---|---|
| 1 | ground-truth-validate CC-5 | **RAN** | `census-postmove.mjs` — 3-tier fixpoint + hand-checked harness **H1/H2/H3 PASS (3/3, exit 0)**; retro-f3 G3's missing validation leg CLOSED |
| 2 | reconcile the 5-file divergence → ONE manifest | **RAN** | 18-row ratified table: **6K/12A/0F = 18/0**; counterfactual proves it the **unique** zero-runtime-manufactured-edge assignment (charter-a=1, charter-b=7); "17/1" RETIRED |
| 3 | correct the written claims | **RAN** | §1.3 scoped to app-cluster (G2 verified on disk); **aurora-atoms `3-not-2` RETRACTED** — the honest count is **2** (G6 mis-counted a comment + a glass-ui import) |
| 4 | surface OF-4 | **RAN** | both poles' concrete trees + first-hand evidence: **6** pipeline files RUNTIME-couple to the color-picker FEATURE — the concrete grounding pass-2 asserted blind |
| 5 | 6-project smoke on the scattered tree | **RAN** | scatter of the ratified table: typecheck **delta 0**, `gh-pages` build **exit 0**, 6-project smoke **182 passed · 1 failed · 2 skipped (12.0m)** — the lone failure a glass-ui `dist/styles/index.css` ENOENT in a fixture (env), **0 from the scatter**; every color-bucket DI path GREEN. The DI-order runtime confirmation charter-b argued but did not measure |

---

## §1 — GROUND-TRUTH-VALIDATE CC-5 — RAN (closes critique-charter-a G3 / retro-f3 G3)

retro-f3 G3's closer was tripartite: **build** the CC-5 instrument, **validate it against a hand-checked
ground truth**, and **RUN it**. The pass-2 `census.mjs` did (i) + (iii) but skipped (ii): `grep -niE
'assert|validate|ComponentSliders' census.mjs` = **0** hits (critique-charter-a G3). This lane adds the
validation leg.

`_proto/census-postmove.mjs` (a) resolves the demo import graph (alias + relative + `.vue` script-block +
index), (b) computes each bucket file's destination under a **3-tier CC-5 predicate that resolves
bucket-sibling consumers to their POST-MOVE home via a fixpoint** — the exact correction
critique-charter-a G1 demanded ("count post-move destinations, not pre-move sibling relationships"), (c)
validates the assignment against the no-manufactured-cross-tree-**runtime**-edge invariant, and (d) runs
the hand-checked harness with a **non-zero exit on failure** (a real bite, not a vacuous gate).

```
$ node _proto/census-postmove.mjs
TALLY: KERNEL=6  APPCLUSTER=12  FEATURE=0  ORPHAN=0  (sum 18)   => 18 PROMOTE / 0 COLOCATE
VALIDATION (A) MOVE-manufactured RUNTIME cross-tree edges : 0   (type-only: 1 — keys->useColorPipeline)
H1 ComponentSliders live-control (fan-in 1 >= 1) : PASS
H2 generate-color/useColorParsing cross-tree pair (ucp->gc runtime=true, pair-manufactured=0) : PASS
H3 zero manufactured RUNTIME cross-tree edges (0) : PASS
HARNESS PASS (3/3)   EXIT=0
```

- **H1 — the ComponentSliders live-control case.** The F2 false-positive class (a live iOS-Safari
  pointer-recovery control raw madge flagged dead). The resolver reaches
  `controls/ComponentSliders/ComponentSliders.vue` with **fan-in 1** (`ColorPicker.vue` + `colorSpaceInfo.ts`
  import it). LIVE. **PASS.**
- **H2 — the `generate-color`/`useColorParsing` cross-tree pair.** `useColorParsing.ts:7` RUNTIME-imports
  `generateSingleColor` (used at line 224). The harness asserts this edge exists AND the ratified placement
  manufactures 0 cross-tree runtime edges across the pair. **PASS.** This is the exact case G3 reserved
  against: an un-validated census misplaced this one file (charter-a colocated `generate-color` into the
  generate feature, manufacturing the app-cluster→feature edge) — the failure the ground-truth test was
  demanded to catch, now caught by the harness.
- **H3 — zero manufactured runtime cross-tree edges** under the full assignment. **PASS.**

The tripartite closer is now **3/3 met** (build ∧ validate ∧ run). retro-f3 G3 is CLOSED, not 2/3.

---

## §2 — RECONCILE THE 5-FILE DIVERGENCE → ONE RATIFIED MANIFEST (closes critique-charter-b G1/G2)

The full 18-row table is `charter-alpha-manifest.md`. The reconciliation, in one breath: **the ratified
table is charter-a's tree with exactly ONE change — `generate-color` feature→KERNEL — which converts the
flawed "17/1" into the honest "18/0".** Every divergent file is decided by the objective invariant the
green gates cannot see (manufactured cross-tree RUNTIME edges), measured by `_proto/counterfactual.mjs`:

| candidate table | K/A/F | RUNTIME manufactured | the edges |
|---|---|---|---|
| **RATIFIED** | 6/12/0 | **0** | — (only 1 type-only: `keys → useColorPipeline`, runtime-erased) |
| charter-a | 5/12/1 | **1** | `useColorParsing[app] → generate-color[feature]` |
| charter-b | 8/10/0 | **7** | `ink → ink-walk` + `useColorPipeline → {its 6 stages}` |

**The two reversals, decided:**

- **`generate-color` → KERNEL** (not charter-a's feature). It is shared between the generate feature (2
  external consumers) and the app-cluster pipeline (`useColorParsing` runtime-imports it). Colocating into
  the generate feature manufactures the cross-tree edge CC-5 exists to forbid (critique-charter-a G1 —
  confirmed by the running counterfactual: 1 edge). KERNEL is the only home both the feature and the
  app-cluster reach cleanly (UP into the kernel). Reported as PROMOTE → the bucket colocates into a feature
  ZERO times → **18/0**, the stronger refutation charter-a's "17/1" understated.
- **`ink-walk` → KERNEL** (not charter-b's app-cluster). A private helper of `ink` (0 external consumers;
  `ink.ts:54` imports it). `ink` → KERNEL, so the flat predicate's app-cluster placement manufactures
  `ink → ink-walk` (charter-b's own flat approximation, its ⚠). The recursive FOLLOW (charter-a) keeps it
  at 0.

**The three tier-corrections** (charter-b's 8-kernel → 6): `useColorPipeline` → APP-CLUSTER (kernel would
split the cohesive pipeline, manufacturing 6 runtime edges to its stages); `useCustomColorNames` +
`view-accent` → APP-CLUSTER (both are app-root-only, 0 cross-feature consumers — charter-b's kernel
over-promotes them, diluting the kernel's "serves ≥2 unrelated features" definition, which is
critique-charter-b G2's own objection applied consistently).

**5-vs-8 kernel reconciled to 6. The flagship "17/1" is retired for the honest 18/0.**

---

## §3 — CORRECT THE WRITTEN CLAIMS

### 3.1 §1.3 scoped to the app-cluster subset (critique-charter-a G2 — verified on disk)

charter-a §1.3 asserts, universal over all 17 promoted files: "**ZERO** of the promoted files are consumed
by the `color-picker` FEATURE component tree." **FALSE on disk** (`node _proto/debug-consumers.mjs
ink.ts useContrastSafeColor.ts`):

- `ink.ts` (KERNEL) ← `custom/color-picker/controls/ComponentSliders/ConsoleRail.vue`,
  `custom/color-picker/display/ColorNutritionLabel.vue`.
- `useContrastSafeColor.ts` (KERNEL) ← those two **plus** `custom/color-picker/visual/HeroBlob.vue`.

**Corrected claim**: the "zero → color-picker feature" universal holds ONLY for the **app-cluster subset**
(`useColorPipeline` et al., whose non-sibling consumer is App.vue, the app composition root). The
KERNEL-promoted files (`ink`, `useContrastSafeColor`, `keys`) **are** consumed by color-picker feature
components — which is precisely **WHY they are kernel** (they span color-picker + ≥1 other feature). The
intended point (the app-cluster is app-root, not color-picker-feature) survives; the universal must be
scoped.

### 3.2 aurora-atoms — the charter-α instruction's "3-not-2" is RETRACTED; the honest count is 2 (G6 refuted)

The charter-α brief instructs "correct … `aurora-atoms` 3-not-2 (G6)". **The measurement refutes G6, not
the charter.** critique-charter-a G6 claimed 3 importers, adding
`demo/color-picker/composables/boot/atmosphere-calibration.ts`. On disk that file imports
`@mkbabb/glass-ui/aurora` (`DEFAULT_AURORA_CONFIG`, `AuroraConfig`) — the glass-ui aurora module, **not**
the demo's `@composables/color/aurora-atoms`. Its only "aurora-atoms" token is a **line-15 comment**
(`· colorEnergy 0.76 — the energy step (aurora-atoms.ts; …`):

```
$ grep -rlE "from ['\"][^'\"]*color/aurora-atoms['\"]" demo --include='*.ts' --include='*.vue'
demo/color-picker/composables/boot/useAtmosphere.ts
demo/@/components/custom/panes/AuroraPane.vue        # => 2 real import edges, not 3
```

**Retraction, honestly**: aurora-atoms has **2** real import edges (charter-a §1.2's original count was
CORRECT; the census agrees). G6 fell into the exact import-edge-vs-text-mention error that charter-b's
census-precision correction (verified TRUE) was built to catch — it counted a comment mention plus a
same-named symbol from a different module (`glass-ui/aurora`'s `DEFAULT_AURORA_CONFIG` ≠ the demo's
`DEFAULT_AURORA_ATOMS`). The disposition (aurora-atoms → KERNEL) is unchanged and unaffected: 1 feature
(panes) + app-root boot, kernel the only edge-free home (the counterfactual confirms feature or app-cluster
each manufacture 1 edge; kernel 0).

---

## §4 — SURFACE OF-4 (the app-cluster placement DESIGN fork — critique-charter-a G5)

OF-4 (AGGLOMERATION §4): the app-cluster DIRECTORY is a design choice the green gates cannot adjudicate.
This lane surfaces it with **both poles' concrete trees + first-hand coupling evidence** — the evidence
charter-a resolved unilaterally (it ran one option and presented it as settled).

**The concrete evidence that makes OF-4 real (not asserted).** The manifest's 12 app-cluster files split
into two DEPENDENCY classes (`node _proto/census-postmove.mjs` VALIDATION-B):

- **6 files RUNTIME-couple to the color-picker FEATURE** — `useColorPipeline`, `useColorParsing`,
  `useSliderGradients`, `useColorNameResolution`, `useColorPersistence`, `useColorUrl` each import
  `@components/custom/color-picker` (`resolveColorSpace`, `toCSSColorString`, `colorToHexString`,
  `defaultColorModel`, the `ColorModel` domain type). This is a shared→feature edge that exists TODAY, and
  the color-picker barrel imports back `@composables/color/keys` (`ActionBarContext`, type-only) — a
  standing bidirectional coupling between the bucket and the color-picker FEATURE. **NB the naming trap**:
  `demo/color-picker/` (the app-root, App.vue's home) ≠ `demo/@/components/custom/color-picker/` (the
  FEATURE). The pipeline couples to the FEATURE, but pass-2 homes it in the app-root.

**Pole A — re-bucket into the app-root** (charter-a/b's shared choice, the RATIFIED default):
```
demo/color-picker/composables/color/     ← a NEW 12-file sub-bucket one level down
  ├── useColorPipeline.ts (+ 6 stages)
  ├── useColorUrl.ts · useCustomColorNames.ts · palettes-ramp.ts · view-accent.ts · normalizedColorNames.ts
```
Rationale: App.vue composes the pipeline; the cluster is app-root-level; a single cohesive home. Cost: the
6 color-picker-feature-coupled files sit one tree away from the feature they depend on (the pre-existing
shared/app→feature edge persists — it is not a MOVE artifact, but the colocation edict arguably wants it
closer).

**Pole B — colocate into the color-picker FEATURE**:
```
demo/@/components/custom/color-picker/composables/
  ├── useColorPipeline.ts (+ 6 stages)      ← now beside the ColorModel/resolveColorSpace they import
demo/color-picker/composables/color/          ← only the ~4 genuinely app-root files remain
  ├── useColorUrl.ts · palettes-ramp.ts · view-accent.ts · useCustomColorNames.ts
```
Rationale: the owner's edict is "components should be COLOCATED with their … composables … recursively";
6 of the 12 files runtime-depend on the color-picker feature's domain vocabulary, so colocating them INTO
`custom/color-picker/composables/` satisfies the edict literally and dissolves the standing shared/app→
feature coupling. Cost: it splits the pipeline cluster (the 6 feature-coupled stages leave; App.vue-only
files stay), and `useColorPipeline`'s type is injected app-wide via `keys` (a kernel concern) — so the
"head" placement is itself contested.

**This is a genuine owner/design fork the green gates cannot decide** (typecheck/build/smoke are green for
BOTH trees — they prove RESOLUTION, are blind to DESIGN). Presented, not asserted. The manifest ratifies
the TIER (app-cluster, not kernel/feature); OF-4 is the residual DIRECTORY call.

---

## §5 — RUN THE 6-PROJECT SMOKE ON THE SCATTERED TREE (closes critique-charter-b G3)

charter-b item 1's DI-order survival was ARGUED ("the scatter renames nodes without reordering imports")
+ `vite build`, never smoke-measured (charter-b G3, §7.2 disclosed). This lane MEASURES it. The scatter of
the ratified 18-row table RAN in the worktree (`_proto/codemod-ratified.mjs --apply` + the git-mv plan):

```
moved files              : 18  (kernel 6 → @composables/ · app-root 12 → demo/color-picker/composables/color/)
import-specifier rewrites: 87
files touched            : 53
AUDIT residual @composables/color/ refs (UNSAFE if >0): 0     SAFE: true
git: 53 files changed, 87 insertions(+), 87 deletions(-), 18 renames
```

**Gate 1 — oracle (typecheck delta).** Baseline demo typecheck (post-`npm run build`, pre-scatter) = **10
errors** — ALL pre-existing environment noise: a dual-`@vue/runtime-core` type conflict between
`value.js/node_modules` and the symlinked `glass-ui-pinned/node_modules` (VNodeTypes incompatibility) +
a `useAtmosphere.ts` ShallowRef slip. **NONE reference `composables/color` / `@composables`**
(`grep -iE 'composables/color|@composables' baseline` = 0). Post-scatter typecheck:
`diff baseline-sigs postmove-sigs` = **∅ → DELTA 0** (byte-identical error set; the scatter adds ZERO type
errors, resolves every rewritten import). The exit is 2 (not 0) purely from the pre-existing dual-Vue
environment condition of this isolated worktree — captured honestly with exit codes (closing
critique-charter-a G7's 0-byte-provenance gap).

**Gate 2 — build.** `npm run gh-pages` on the scattered tree → **exit 0** (`✓ built in 1.70s`; only the
pre-existing `#__PURE__` `@vueuse/core` vendor warnings). All 87 rewritten specifiers resolve + bundle.

**Gate 3 — the 6-project smoke (the runtime confirmation charter-b did not measure).**
`VJS_E2E_PORT=8950 VJS_E2E_PERF_PORT=8951 npx playwright test` (lane ports, never 9000):

```
182 passed · 1 failed · 2 skipped   (12.0m, 6 projects: smoke / -admin / -mobile / -reactivity / -perf / -safari)
```

**The 1 failure is NOT the scatter** — it is `dual-pane-1440.spec.ts:233 › D8-1` failing in `readCascadeRoot()`
with `ENOENT … @mkbabb/glass-ui/dist/styles/index.css`: the fixture reads glass-ui's BUILT dist CSS from
node_modules, which is absent in this worktree's glass-ui provision (`ls node_modules/@mkbabb/glass-ui/dist/
styles/index.css` → No such file). The test references `composables/color` / `@composables` **0** times
(`grep -c` = 0) — it is a glass-ui dist-styles I/O artifact of the isolated worktree, orthogonal to the move.
Every color-bucket runtime gate passed: `page-load` (shell + zero-console), `color-space-switching`
(the `COLOR_MODEL_KEY` provide/inject pipeline), reactivity (slider-keyboard + spectrum-drag), the perf
frame-budget gates, and the safari sustained-30s spectrum-drive (0 console failures). The 2 skips are the
config's standing skips. (The perf `o5-boot-pacing` jitter test flaked once on SwiftShader software-GL then
retried GREEN — the flaky-retry class, not a failure; final tally = 1 failed.)

The smoke boots the demo (vite dev-server compile of the scattered tree) + the built-bundle perf server,
exercising the `COLOR_MODEL_KEY`/`CSS_COLOR_KEY`/… provide-inject pipeline at runtime across the scattered
DI-key hub (`keys.ts` → KERNEL) and the app-cluster pipeline stages. This is the DI-order survival charter-b
could only argue: **measured**, not asserted.

---

## §6 — Owner-reserved forks (routed OUT — presented, not decided)

- **OF-4 — the app-cluster DIRECTORY** (§4 above): app-root re-bucket vs color-picker-feature colocation.
  Both poles' concrete trees + the 6-file coupling evidence carried; the owner rules the DIRECTORY, the
  manifest ratifies the TIER.
- **OF-1 — the `@`-ban idiom** (eslint vs `proof:*`): untouched — the atomic scatter this lane RAN is
  idiom-agnostic (the codemod's own audit gate, not the incumbent, proves the cut). The owner rules.
- **OF-5 — the COUPLED OWNER EVENT**: this lane authors; nothing merges. The scatter RAN in an isolated
  worktree and is `git reset`-able evidence; the campaign floats on the coupled event.

---

## §7 — Honest frictions + residual weaknesses

1. **The typecheck oracle exits 2, not 0, in this worktree** — a dual-Vue environment condition (the
   `file:../glass-ui` symlink resolving to `glass-ui-pinned/node_modules`'s own `@vue` copy), NOT the move.
   The load-bearing claim is the **DELTA (0)**, corroborated by the exit-0 build + the smoke; the absolute
   exit-0 typecheck charter-a/b reported requires a single-Vue resolution their worktrees had and this one
   does not. Disclosed, not smoothed.
2. **The manifest ratifies ONE bucket** (`composables/color/`, the A1 worst offender). The general demo
   scatter across all buckets is the landing wave's job (charter-b §7.4); this lane hardens the hardest
   bucket to a ratifiable table + a validated instrument.
3. **OF-4 is surfaced, not closed** — by design (owner-reserved). The 6-file feature-coupling evidence makes
   Pole B concrete, but the pipeline-head placement (`useColorPipeline` is injected app-wide via `keys`)
   keeps even Pole B internally contested; the manifest ratifies the tier and defers the directory.
4. **The `keys → useColorPipeline` type-only edge persists** (charter-a friction #1, the kernel→app-root
   type inversion). It is runtime-erased (validated: 0 runtime, 1 type-only) and flagged, not faked — the
   follow-refactor (the pipeline's RETURN-TYPE wants a shared home) is out of this move's scope.

---

## Reproduce (all scripts in `_proto/`, isolated worktree, NOT merged)

```
node _proto/census-postmove.mjs          # 3-tier fixpoint manifest + harness 3/3 (exit 0)
node _proto/counterfactual.mjs           # ratified=0 / charter-a=1 / charter-b=7 manufactured runtime edges
node _proto/codemod-ratified.mjs --apply && sh _proto/scatter-mv-plan.sh   # the scatter (18 mv, 87 rewrites)
npx vue-tsc -p tsconfig.demo.json --noEmit   # delta 0 vs _proto/baseline-sigs.txt
npm run gh-pages                             # exit 0
VJS_E2E_PORT=8950 VJS_E2E_PERF_PORT=8951 npx playwright test   # 6 projects
git reset --hard 07bf61d                     # evidence-only; nothing lands
```

**Prototype worktree at tranche-u HEAD `07bf61d`; referent glass-ui `5.0.0` (pinned). No prototype merges —
evidence only. Composed thesis: the WHAT-tree placement is now a ratifiable manifest, ground-truth-validated,
proven unique, and RUN green on the scattered tree.**

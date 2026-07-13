# V · pass-3 · Charter α — THE RATIFIED WHAT-TREE MANIFEST (`composables/color/`)

**The single ratifiable placement table** the composed thesis was capped on (AGGLOMERATION §1 fact 6:
"the two RAN lanes diverge on 5 of 18 destinations, two by reversal … the central pass-3 obligation").
This file reconciles charter-a's **5-kernel** tree and charter-b's **8-kernel** tree into ONE table,
**ground-truth-validated** by a running instrument (`_proto/census-postmove.mjs`, harness 3/3 PASS) and
**proven unique** by counterfactual (`_proto/counterfactual.mjs`): the ratified table is the ONLY one of
the three that manufactures **zero** cross-tree RUNTIME edges.

- **Substrate**: `demo/@/composables/color/` = **18** `.ts` files (tranche-u HEAD `07bf61d`; the pass-2
  proto era `9423094` bucket is byte-identical — `git diff 9423094 07bf61d -- demo/@/composables/color/` = ∅).
- **Regenerate**: `node _proto/census-postmove.mjs` (`--json` for machine). The tally, the harness, and the
  manufactured-edge validation all recompute per run — no hardcoded verdicts.
- **Tiers** (three, not the spec's binary kernel|feature — charter-a friction #3):
  - **KERNEL** → `demo/@/composables/` — genuinely cross-**feature** (serves ≥2 unrelated features, OR
    a private helper following a kernel parent, OR shared between a feature and app-root with kernel the
    only edge-free home).
  - **APP-CLUSTER** → `demo/color-picker/composables/color/` — app-root-only (App.vue / boot) + the
    intra-coupled pipeline cluster kept cohesive. **(Directory subject to OF-4 — see charter-alpha.md §4.)**
  - **FEATURE** → `demo/@/components/custom/<feature>/composables/` — colocate into one owning feature.
    **The bucket yields ZERO of these** (the feature-capsule thesis, refuted BY the manifest).

---

## The manifest — 18 rows, RATIFIED

| # | file | consumers (import edges) | consumer feature-roots | **RATIFIED tier** | destination |
|---|---|---|---|---|---|
| 1 | `keys.ts` | 26 (25 ext + 1 sib) | 6 features (color-picker, dock, image-palette-extractor, markdown, palette-browser, panes) + app-root | **KERNEL** | `demo/@/composables/` |
| 2 | `useContrastSafeColor.ts` | 11 | 6 features (color-picker, dock, gradient, image-palette-extractor, markdown, palette-browser) + app-root boot | **KERNEL** | `demo/@/composables/` |
| 3 | `ink.ts` | 6 | 3 features (color-picker, image-palette-extractor, markdown) + 1 sib | **KERNEL** | `demo/@/composables/` |
| 4 | `ink-walk.ts` | 1 | `ink` (private helper, 0 external) | **KERNEL** *(follow ink)* | `demo/@/composables/` |
| 5 | `aurora-atoms.ts` | 2 | panes (feature) + app-root boot | **KERNEL** | `demo/@/composables/` |
| 6 | `generate-color.ts` | 3 | generate (feature ×2) + `useColorParsing` (app-cluster sib, RUNTIME) | **KERNEL** | `demo/@/composables/` |
| 7 | `useColorPipeline.ts` | 2 | App.vue (app-root) + `keys` (sib, **type-only**) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 8 | `useColorParsing.ts` | 1 | `useColorPipeline` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 9 | `useSliderGradients.ts` | 1 | `useColorPipeline` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 10 | `useColorNameResolution.ts` | 1 | `useColorPipeline` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 11 | `useColorPersistence.ts` | 1 | `useColorPipeline` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 12 | `useAtmosphereFrameCoalesce.ts` | 1 | `useColorPipeline` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 13 | `valueDomain.ts` | 1 | `useColorPipeline` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 14 | `normalizedColorNames.ts` | 2 | `useColorNameResolution` + `useColorUrl` (app-cluster sibs) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 15 | `useColorUrl.ts` | 1 | App.vue (app-root) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 16 | `useCustomColorNames.ts` | 2 | App.vue (app-root) + `useColorNameResolution` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 17 | `palettes-ramp.ts` | 1 | boot/`useViewAccents` (app-root) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |
| 18 | `view-accent.ts` | 3 | boot/`useViewAccents` + boot/`view-accents` (app-root) + `palettes-ramp` (sib) | **APP-CLUSTER** | `demo/color-picker/composables/color/` |

**TALLY: 6 KERNEL · 12 APP-CLUSTER · 0 FEATURE = 18.  →  18/18 PROMOTE, 0 COLOCATE.**

> The honest count is **18/0**, not charter-a's flagship "17/1". The one file charter-a colocated
> (`generate-color` → the generate feature) manufactures a cross-tree runtime edge and is retired to KERNEL
> below. The bucket contains **zero** feature-capsule content — the strongest possible refutation of the
> spec's "the other 15 → color-picker capsule."

---

## The 5-file divergence, DECIDED on the table

The pass-2 lanes agreed on 13 of 18 files (4 KERNEL — `keys`/`useContrastSafeColor`/`ink`/`aurora-atoms`;
9 APP-CLUSTER). The 5 they split are decided here by the **no-manufactured-cross-tree-runtime-edge**
invariant (charter-a §1.1: "else the move manufactures a cross-directory edge"), measured by counterfactual.

| file | charter-a | charter-b | **RATIFIED** | deciding evidence (`_proto/counterfactual.mjs`) |
|---|---|---|---|---|
| `generate-color.ts` | feature:generate | kernel | **KERNEL** | Shared between the generate feature and the app-cluster pipeline (`useColorParsing:7` RUNTIME-imports `generateSingleColor`). Charter-a's feature-colocation manufactures **1** runtime edge (`useColorParsing[app] → generate-color[feature]`); KERNEL manufactures **0** — both the feature and the app-cluster import UP into the kernel cleanly. (critique-charter-a G1) |
| `ink-walk.ts` | kernel *(follow ink)* | app-cluster *(flat)* | **KERNEL** | `ink-walk` is a private helper of `ink` (0 external consumers; `ink.ts:54` imports it). `ink` → KERNEL, so charter-b's app-cluster placement manufactures **1** runtime edge (`ink[kernel] → ink-walk[app]`); the recursive FOLLOW keeps it at 0. Charter-a's recursive-follow is correct. (critique-charter-b G1) |
| `useColorPipeline.ts` | app-cluster | kernel | **APP-CLUSTER** | The pipeline HEAD imports **6** app-cluster stages (`valueDomain`/`useColorParsing`/`useSliderGradients`/`useColorNameResolution`/`useColorPersistence`/`useAtmosphereFrameCoalesce`). Charter-b's kernel placement manufactures **6** runtime edges (kernel reaching down into its stages); app-cluster keeps the cluster cohesive, leaving only the `keys → useColorPipeline` edge which is **type-only** (`keys.ts:4 import type UseColorPipelineReturn`, runtime-erased). (critique-charter-b G1/⚠) |
| `useCustomColorNames.ts` | app-cluster | kernel | **APP-CLUSTER** | App-root-only (App.vue + `useColorNameResolution` app-cluster sib) — **0** cross-feature consumers. Charter-b's kernel placement OVER-PROMOTES an app-level file into the cross-**feature** kernel, diluting the kernel's "serves ≥2 unrelated features" definition (critique-charter-b G2's own objection). |
| `view-accent.ts` | app-cluster | kernel | **APP-CLUSTER** | App-root-only (2 boot consumers + `palettes-ramp` app-cluster sib) — **0** cross-feature consumers. Same over-promotion as `useCustomColorNames`. |

**Net vs charter-a**: exactly ONE change — `generate-color` feature→KERNEL (which converts "17/1" to "18/0").
**Net vs charter-b**: `ink-walk` app-cluster→KERNEL, and `useColorPipeline`/`useCustomColorNames`/`view-accent`
kernel→APP-CLUSTER (8-kernel → 6-kernel).

### The counterfactual (the decisive numbers)

| candidate table | KERNEL/APP/FEATURE | MOVE-manufactured RUNTIME cross-tree edges | type-only |
|---|---|---|---|
| **RATIFIED** | 6 / 12 / 0 | **0** | 1 (`keys → useColorPipeline`, erased) |
| charter-a | 5 / 12 / 1 | **1** (`useColorParsing → generate-color`) | 1 |
| charter-b | 8 / 10 / 0 | **7** (`ink → ink-walk` + 6 pipeline-head → stages) | 0 |

The ratified table is the **unique** zero-runtime-manufactured-edge assignment. That is the objective
tie-breaker the green gates (typecheck/build/smoke) are structurally blind to.

---

## Ground-truth validation (the retro-f3 G3 leg the pass-2 census skipped)

`_proto/census-postmove.mjs` carries a hand-checked harness (the leg critique-charter-a G3 docked: the
pass-2 `census.mjs` had **0** assert/validate/ComponentSliders hits). All three assertions PASS (exit 0):

- **H1 — the ComponentSliders live-control case** (the F2 false-positive class): the resolver reaches
  `controls/ComponentSliders/ComponentSliders.vue` with **fan-in 1** (imported by `ColorPicker.vue` +
  `colorSpaceInfo.ts`) — LIVE, not the dead-flag raw madge produced. **PASS.**
- **H2 — the `generate-color`/`useColorParsing` cross-tree pair**: `useColorParsing` is a confirmed RUNTIME
  consumer of `generate-color` (`useColorParsing.ts:7`), and the ratified placement manufactures **0**
  cross-tree runtime edges across the pair. **PASS.**
- **H3 — zero manufactured RUNTIME cross-tree edges** under the full assignment. **PASS.**

## Two edge classes the pass-2 censuses conflated (both lanes counted only reverse/consumer edges)

- **(A) MOVE-manufactured** = bucket↔bucket edges the SPLIT newly creates (both endpoints siblings today).
  Ratified = **0** runtime, 1 type-only. This is the invariant the manifest keeps clean.
- **(B) PRE-EXISTING** = **6** pipeline files RUNTIME-import the color-picker **FEATURE** barrel
  (`@components/custom/color-picker`: `resolveColorSpace`, `toCSSColorString`, `colorToHexString`,
  `defaultColorModel`) — a shared→feature edge that exists TODAY (the bucket already sits in the shared
  `composables/` tree). The move does not create it; it is the standing coupling and the concrete grounding
  for **OF-4** (charter-alpha.md §4). Neither pass-2 census checked the bucket's own outbound dependencies,
  so neither surfaced it.

## The ratification contract

A landing wave takes THIS table as input. `generate-color = KERNEL` and `ink-walk = KERNEL` and the three
app-cluster demotions are the reconciliation; the tier column is ratified. The remaining owner call is
**OF-4** (the app-cluster DIRECTORY: the app-root `demo/color-picker/composables/color/` sub-bucket vs
colocation into `custom/color-picker/composables/`) — presented, not decided. The scatter + git-mv of this
exact table RAN in the lane worktree: typecheck delta 0, `gh-pages` build exit 0, 6-project smoke (see
charter-alpha.md §5).

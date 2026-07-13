# V · pass-2 · charter-b · the PRE-CODEMOD destination MANIFEST (item 2)

**The human-ratifiable placement artifact, authored BEFORE the codemod runs** —
the reviewability story for placement DESIGN, which the oracle (`vue-tsc`) is
structurally blind to (critique-f6 F6-3: *"vue-tsc says 'it compiles,' never
'it's colocated correctly'"*). Replaces the 221-diff eyeball with a 18-row
verdict table a human ratifies (or overrides) in one read. Regenerable:
`node _proto/census-color.mjs --json` (against HEAD `9423094`).

## The predicate (CC-5, run for real)

> Two consumers are UNRELATED iff their nearest common feature-root is the demo
> root ⇒ span ≥2 feature-roots ⇒ **PROMOTE** to a module-level `composables/`;
> all in ONE feature-root ⇒ **COLOCATE** into that feature.

Consumers are counted as **import edges** (the resolved graph), never text
mentions — a correction to retro-f3 G2, which read `useColorPipeline` as
"imported by 4 siblings + AboutPane" where the import-edge truth is **App.vue +
keys.ts only** (the other 4 mention it in `/* */` comments; verified by grep).

## The manifest — `composables/color/` (the A1 worst-offender, 18 files)

| file | import consumers | consumer feature-roots | CC-5 verdict | destination |
|---|---|---|---|---|
| `keys.ts` | 26 | color-picker, dock, image-palette-extractor, markdown, palette-browser, panes, +bucket, +app-root (**8 roots**) | **PROMOTE(kernel)** | `demo/@/composables/` |
| `useContrastSafeColor.ts` | 11 | color-picker, dock, gradient, image-palette-extractor, markdown, palette-browser, app-root (**7**) | **PROMOTE(kernel)** | `demo/@/composables/` |
| `ink.ts` | 6 | color-picker, image-palette-extractor, markdown, +bucket (**4**) | **PROMOTE(kernel)** | `demo/@/composables/` |
| `view-accent.ts` | 3 | bucket, app-root | **PROMOTE(kernel)** | `demo/@/composables/` |
| `generate-color.ts` | 3 | feature:generate, bucket | **PROMOTE(kernel)** | `demo/@/composables/` |
| `aurora-atoms.ts` | 2 | panes, app-root | **PROMOTE(kernel)** | `demo/@/composables/` |
| `useCustomColorNames.ts` | 2 | bucket, app-root | **PROMOTE(kernel)** | `demo/@/composables/` |
| `useColorPipeline.ts` | 2 | bucket (keys), app-root (App.vue) | **PROMOTE(kernel)** | `demo/@/composables/` ⚠ |
| `palettes-ramp.ts` | 1 | app-root | **PROMOTE(app-root)** | `demo/color-picker/composables/color/` |
| `useColorUrl.ts` | 1 | app-root | **PROMOTE(app-root)** | `demo/color-picker/composables/color/` |
| `ink-walk.ts` | 1 | bucket (ink) | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `normalizedColorNames.ts` | 2 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `useAtmosphereFrameCoalesce.ts` | 1 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `useColorNameResolution.ts` | 1 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `useColorParsing.ts` | 1 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `useColorPersistence.ts` | 1 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `useSliderGradients.ts` | 1 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |
| `valueDomain.ts` | 1 | bucket | **PROMOTE(pipeline)** | `demo/color-picker/composables/color/` |

**Tally: 18 PROMOTE · 0 COLOCATE.** (8 kernel → `@composables/`; 10 → the
app-root pipeline home.)

## What the human ratifies here that the oracle CANNOT (item 2's whole point)

1. **The thesis is refuted BY the manifest, before a single file moves.** The
   retro-f3 G2 prediction — *"most promote, closer to F2's global answer than
   F3's feature-capsule answer"* — is confirmed EXACTLY: **not one** color-bucket
   file colocates into a feature. The owner's colocation edict, applied honestly
   via CC-5, yields a small module-kernel + an app-root pipeline cluster, NOT
   feature capsules. A reviewer sees this in the tally, not by eyeballing 94
   rewrite diffs.

2. **⚠ The one DESIGN call CC-5 gets debatably wrong** — `useColorPipeline.ts`
   is the HEAD of the pipeline cluster, but CC-5 sends it to the module kernel
   (it has one app-root + one bucket consumer) while its 8 pipeline STAGES go to
   the app-root home. A flat predicate splits a cohesive cluster. **This is
   exactly the placement DESIGN judgment the oracle is blind to** — the manifest
   surfaces it for a human to OVERRIDE (keep the pipeline head with its stages)
   before the codemod runs. `vue-tsc` would bless either placement identically.

3. **The `PROMOTE(pipeline)` rows are a flat approximation.** A file consumed
   only by one bucket sibling *transitively* follows that sibling's home; the
   flat CC-5 sends all intra-only files to the app-root cluster (correct, because
   the cluster head App.vue composes them there), but a reviewer should confirm
   the cluster coheres at ONE home rather than fragmenting — again a DESIGN read
   the oracle cannot make.

## The ratification contract

A landing wave takes THIS table as input. The human either **accepts** it (the
codemod runs the 18 moves verbatim) or **annotates overrides** (e.g. row ⚠ →
`demo/color-picker/composables/color/`) — a diff against an 18-row table, never
against 94 scattered specifier rewrites. The codemod's two gates
(`audit SAFE:true` ∧ `oracle delta==0`) then prove the RATIFIED manifest lands
with correct RESOLUTION; the manifest is what proves it lands with correct
PLACEMENT.

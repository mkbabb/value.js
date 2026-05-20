# B.W4 Lane 2 — Substrate-Without-Consumer Audit

Read-only close audit for tranche B's close ceremony. Precept §8: nothing is
introduced without a real consumer. Every artefact tranche B added is listed
below with its consumer count and a verdict; the dangling-references section
records the inverse check (anything B deleted that is still referenced).

Audit date: 2026-05-19. Working tree at branch `w.w2.1-value-js-prebuild`.
All counts cited are `grep` results against `demo/`, `src/`, `test/`,
`e2e/`, and `playwright.config.ts`.

## Artefact table

| Artefact | Kind | Consumers | Verdict |
| --- | --- | --- | --- |
| `demo/@/composables/usePaneRouter.ts` (B.W2) | Demo composable | 4 — `demo/color-picker/App.vue:102,168` (value import); `demo/@/components/custom/dock/Dock.vue:22` and `demo/@/components/custom/dock/layers/GenericActionBar.vue:4` (type imports of `DockActionBar`/`DockAction`); `demo/@/components/custom/panes/PaneSlot.vue:5` (comment reference + slot path) | Consumed — live |
| `e2e/smoke/page-load.spec.ts` (B.W3) | E2E spec | 1 — the `smoke` Playwright project's `testDir: "./e2e/smoke"` (`playwright.config.ts:15-16`) globs all three specs | Consumed — runs under `npm run test:e2e` |
| `e2e/smoke/color-space-switching.spec.ts` (B.W3) | E2E spec | 1 — same `smoke` project `testDir` glob | Consumed — runs |
| `e2e/smoke/view-switch.spec.ts` (B.W3) | E2E spec | 1 — same `smoke` project `testDir` glob | Consumed — runs |
| `demo/@/components/ui/alert/index.ts` (B.W2) | UI barrel — glass-ui re-export | 2 — `demo/@/components/custom/markdown/Markdown.vue`, `demo/@/components/custom/color-picker/display/ColorNutritionLabel.vue` (both import `ui/alert` unchanged) | Consumed — live |
| Reduced-motion overlay carve-out, `demo/@/styles/animations.css:43-58` (B.W1 Lane B) | Live CSS `@media` rule | n/a — live CSS in the global stylesheet; consumed by definition (cascade applies it to every reka-ui overlay under `prefers-reduced-motion: reduce`) | Consumed — live by definition |
| `src/parsing/animation-shorthand.ts` (B.W3 Lane B) | Library module — 2 exports (`parseAnimationShorthand`, `reverseAnimationShorthand`) | 2 internal: re-exported by `src/index.ts:301`; `parseAnimationShorthand` imported by `src/parsing/extract.ts:1`. 0 test/demo consumers. | Public surface — valid consumer-less library export |
| `src/parsing/extract.ts` (B.W3 Lane B) | Library module — 4 fns + `AnimationOptions` type | 1: re-exported by `src/index.ts:294-295`. 0 test/demo consumers. | Public surface — valid consumer-less library export |
| `src/parsing/serialize.ts` (B.W3 Lane B) | Library module — 6 exports | 1: re-exported by `src/index.ts:311`. 0 test/demo consumers. | Public surface — valid consumer-less library export |
| `src/parsing/stylesheet.ts` (B.W3 Lane B) | Library module — types + `parseCSSStylesheet` | 1: re-exported by `src/index.ts:278,286`. 0 test/demo consumers. | Public surface — valid consumer-less library export |
| `src/units/interpolate.ts` (B.W3 Lane B) | Library module — 5 fns (`lerpComputedValue`, `lerpColorValue`, `lerpNumericValue`, `lerpValue`, `prepareInterpVar`) | 1: re-exported by `src/index.ts:57`. 0 test/demo consumers. | Public surface — valid consumer-less library export |

### Note on the five B.W3 Lane B library modules

The new `src/parsing/*` and `src/units/interpolate.ts` modules each have
exactly one consumer: their re-export line in `src/index.ts`. For a library,
a public-API export *is* a legitimate terminal consumer — the barrel surfaces
the symbol to downstream importers of the published package, so these are not
"substrate without a consumer" in the §8 sense. They are, however, **not yet
exercised by any in-repo test or demo** (0 hits across `test/` and `demo/`).
This is the committed-WIP state the task brief flagged ("B.W3 Lane B
committed WIP"); B.W3 Lane B is expected to add test coverage. Recorded here
as a distinction, not a defect: a library export with zero in-repo callers is
a valid public surface; the same module with zero re-export *and* zero
callers would be dead substrate. None of the five is dead — all are
re-exported, and `parseAnimationShorthand` additionally has a real internal
caller (`extract.ts:1`).

## Dangling references

The inverse check: every module tranche B deleted, grepped for any residual
import across `demo/`, `src/`, `test/`, `e2e/`.

B.W2 commit `4fde60e` deleted 21 files. The task brief named 7 (the three
pane-router/atmosphere composables and the alert + table barrels); the commit
also retired four dock modules and `PaneSearchBar`. All deleted modules were
grepped:

- `useAtmosphere` — 0 references.
- `useDesktopPaneRouter` — 0 import references. 1 textual hit at
  `demo/@/composables/usePaneRouter.ts:2`, inside the module's own header
  comment ("It replaces the parallel `useMobilePaneRouter` +
  `useDesktopPaneRouter`"). Documentation prose, not an import.
- `useMobilePaneRouter` — 0 import references. Same single comment hit at
  `usePaneRouter.ts:2`.
- `ui/table` (`Table.vue` + 8 sibling SFCs + `index.ts`) — 0 references.
- `ui/alert` SFCs (`Alert.vue`, `AlertTitle.vue`, `AlertDescription.vue`) —
  0 references to the deleted SFC paths; the surviving `ui/alert/index.ts`
  glass-ui re-export carries the `Alert`/`AlertTitle`/`AlertDescription`
  names for the two live consumers.
- `PaneSearchBar` — 0 references.
- `DockMainLayer.vue`, `useDockActionBar.ts`, `useDockLayers.ts`,
  `useGenericActionBar.ts` (the other four `4fde60e` deletions) — 0
  references.

**Dangling references: none.** Every deleted module is fully retired; the
only textual survivors are two occurrences of the old composable names inside
`usePaneRouter.ts`'s own explanatory header comment, which are intentional
provenance documentation and resolve to no import.

## Verdict

Clean. All eleven tranche-B artefacts have a real consumer. The five B.W3
Lane B library modules are consumer-less only in the test/demo sense — each
is a re-exported public surface (a valid §8 outcome for a library), and one
additionally has an internal caller. No dangling references exist.

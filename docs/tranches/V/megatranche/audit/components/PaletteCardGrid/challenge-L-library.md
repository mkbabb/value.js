# CHALLENGE-L — `PaletteCardGrid.vue` library-boundary audit

Source `demo/palettes/browser/card/PaletteCardGrid.vue`, lines 1–53, SHA-256 `e4ee08d80c1a2c23742f7fddc236c23aba3d5271d41fdd4a4f7a81856e4d7107`. Static tranche audit.

**Verdict: SOURCE-RED.** The leaf uses one shared EmptyState but leaves the more important collection, state, and responsive contracts untyped.

## Findings

- `EmptyState` is a demo-local primitive reached by a deep relative path; the grid has no shared collection-state primitive for loading/error/filtered empty.
- `gridClass?: string` exports raw styling authority to every consumer, defeating a stable library API and allowing incompatible column grammars.
- Default and named slots are unconstrained. The root’s list semantics depend on undocumented child behavior.
- `$slots.emptyAction` couples rendering to Vue slot presence rather than a typed action model; accessible name and result semantics remain caller-owned.
- The component has no relation to the sortable/reorder library despite comments about `$el` and `useSortable`; the structural requirement is folklore rather than a typed adapter.

## Target boundary

Define a `CollectionSurfaceState` union and a `PaletteGridLayout` axis. Provide a list-item wrapper or documented `asChild` contract, and encapsulate sortable root access in an adapter. Consumers should not send arbitrary class programs into a shared collection primitive.

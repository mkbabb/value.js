# CHALLENGE-C — `PaletteCardGrid.vue` implementation audit

Source `demo/palettes/browser/card/PaletteCardGrid.vue`, lines 1–53, SHA-256 `e4ee08d80c1a2c23742f7fddc236c23aba3d5271d41fdd4a4f7a81856e4d7107`. Source-only.

**Verdict: SOURCE-RED.** The component cannot derive or validate its own collection truth.

## Findings

1. `empty` can contradict the default slot; there is no item count or state union to enforce exclusivity.
2. `v-if="$slots.emptyAction"` checks only whether a slot function exists, not whether it produces an actionable node.
3. Optional text props are passed through unchanged, so an empty plate can be semantically empty.
4. Arbitrary `gridClass` can override columns, display, containment, or visibility and makes layout testing unbounded.
5. The implementation relies on a single-element root for an external `$el` consumer, but no automated guard prevents a future fragment root regression.
6. `contain: content` is unconditional; no escape exists for descendants that require overflow or layout participation.

Closure requires contradictory-state rejection, stable default copy, bounded layout variants, semantic list-item enforcement, and a root-shape regression check.

# CHALLENGE-D — `PaletteCardGrid.vue` design audit

## Receipt

Source `demo/palettes/browser/card/PaletteCardGrid.vue`, lines 1–53, SHA-256 `e4ee08d80c1a2c23742f7fddc236c23aba3d5271d41fdd4a4f7a81856e4d7107`. Source-only.

**Verdict: SOURCE-RED.** The true-empty treatment is directionally strong, but the grid has no owned loading/error/filter-empty distinction and delegates responsive layout through an opaque class string.

## Findings

1. `empty` is an external boolean independent of slot content. A caller can render cards and the empty plate simultaneously, or neither.
2. The empty copy is entirely optional. A true-empty surface can therefore render blank annotation fields and lose the careful invitation hierarchy.
3. `grid-cols-1` is the only built-in layout; every responsive decision arrives through `gridClass`. The component cannot guarantee card width, reading order, or breakpoint behavior.
4. The root has `role=list`, but comments assume children use `role=article`; that is not equivalent to `listitem` and not enforced.
5. Loading, transport failure, filtered-zero, permission-denied, and first-run empty require distinct copy and actions; the grid exposes only one `empty` bit.
6. `contain: content` is a performance choice with visual consequences for overflow, sticky descendants, and positioned affordances; those consequences are not part of the design contract.

## Required state matrix

True empty · filtered empty · loading · partial loading · error · populated 1/2/many · reorder/drag · selection · mobile/desktop · touch/keyboard. The grid should own a typed state and responsive column policy, while slots provide only card and action content.

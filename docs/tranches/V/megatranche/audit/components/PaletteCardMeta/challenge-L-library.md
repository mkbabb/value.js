# CHALLENGE-L — `PaletteCardMeta.vue` library-boundary audit

Source `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue`, lines 1–64, SHA-256 `95dd9725de21b2c00e3a2c46f08606abd2afa1a5426d5fbd970b60971cb13c16`. Source-only.

**Verdict: SOURCE-RED.** The component reimplements chip, icon-button, tooltip, and pressed-state responsibilities rather than consuming producer contracts.

## Findings

- `@lucide/vue` and a demo `Palette` type are the only imported boundaries. All visual/interaction primitives are raw spans and a raw button.
- Tag pills duplicate the role of glass-ui `Chip`, including pill geometry and compact typography, but omit its selection/removal/static semantics.
- The vote button hand-owns destructive color, pressed state, focus behavior, and icon geometry. A producer icon-button/toggle would make naming, hit area, and state structural.
- Native `title` is used as the information architecture for fork/version instead of a shared tooltip/visually-hidden label.
- `tags: string[]` erases tag identity/category and makes overflow/duplicate handling a view concern.

## Target boundary

Use typed `PaletteProvenance`, `TagSummary`, and `VoteState` inputs, producer `Chip`/tooltip/toggle primitives, and a typed vote result. The parent should pass a normalized visible-tag/overflow model rather than an unbounded array. No library-admission credit follows from this report.

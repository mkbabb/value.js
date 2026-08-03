# CHALLENGE-L — `PaletteRenameInput.vue` library-boundary audit

Source `demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue`, lines 1–66, SHA-256 `97483747a1c97e35531288a267a874b54627fd83a742b4c27eb3a58b203e849b`. Source-only; execution count **0**.

**Verdict: SOURCE-RED.** This leaf consumes the producer-owned `input-bar`/`input-bar-field` CSS recipe, but has no structural Input/form contract and hand-builds both icon actions.

## Boundary findings

- Imports are only `vue` and `@lucide/vue`; the raw input consumes producer utility classes, but there is no glass-ui `Input`, `Button`, form-field, validation, or pending component contract.
- The producer CSS recipe owns the input border, radius, padding, focus, typography, placeholder, and flex behavior. The two raw icon buttons still hand-author padding, radius, hover, active scale, focus, and icon sizing.
- The emit surface (`submit`, `cancel`) carries no request identity, busy state, or typed rejection. Persistence semantics live entirely in an unseen parent.
- Icons provide shape, not semantics. A design-system icon button would require an accessible name and enforce the hit target.

## Target structure

Consume a producer-owned inline-edit field composed from `Input`/field-message and named icon buttons, or promote the whole pattern to glass-ui if reused. Its contract should be `{value, status, problem}` plus `commit(next)` and `cancel()`, not two unacknowledged emits. Until the producer boundary owns focus, geometry, naming, and state, this L axis remains red.

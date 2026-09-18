# CHALLENGE-D — `PaletteRenameInput.vue` design audit

## Receipt

Source `demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue`, lines 1–66, SHA-256 `97483747a1c97e35531288a267a874b54627fd83a742b4c27eb3a58b203e849b`. Static tranche audit only.

**Verdict: SOURCE-RED.** The inline rename concept is appropriate, but its interaction is visually ambiguous, under-labelled, and missing every asynchronous/error state.

## Findings

1. The text field uses a placeholder as its only visible label. Once filled, “Palette name” disappears; assistive naming is not source-proven.
2. Confirm and cancel are icon-only controls with tiny `p-0.5` geometry. No source-level accessible names are supplied, and the touch target is well below 44 px.
3. Both actions sit at equal visual weight immediately beside editable text; there is no dirty indicator or clear distinction between destructive cancellation and committed rename.
4. The field cannot express duplicate-name, empty-name, server-pending, rejected, or conflict states. A name may appear accepted before persistence is known.
5. The transition classes do not declare a reduced-motion branch, and auto-focus/select can be disorienting if editing is entered indirectly.

## State product

`idle → focused-clean → focused-dirty → validating → saving → saved | duplicate | conflict | transport-error | cancelled`, crossed with keyboard/pointer/touch and mobile/desktop cards. A deliberate “title edit” treatment should keep the palette name typographically continuous, add visible Save/Cancel labels on mobile touch widths, reserve error space, and preserve focus on failure.

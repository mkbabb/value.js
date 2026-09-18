# CHALLENGE-C — `PaletteRenameInput.vue` implementation audit

Source `demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue`, lines 1–66, SHA-256 `97483747a1c97e35531288a267a874b54627fd83a742b4c27eb3a58b203e849b`. Static source inspection only.

**Verdict: SOURCE-RED.** The local editor handles the happy path but lacks composition, validation, concurrency, and persistence semantics.

## Findings

1. A prop watcher unconditionally replaces `localName` when the parent name changes. An external refresh can overwrite an in-progress draft without conflict or preservation.
2. `onMounted` immediately focuses and selects without checking how the editor was entered or preserving the prior focus target for cancellation.
3. Submit trims the value; empty or unchanged input emits `cancel`. That is deterministic, but it silently discards an attempted empty edit instead of explaining the validation rule.
4. The form commits through `@submit.prevent`; only Escape has an explicit key handler. There is no source-level composition guard, so IME/Enter behavior remains an unverified form-submit risk rather than a proven `@keydown.enter` defect.
5. `v-model` writes `localName` on input events; paste/newline/very-long input and normalization are unbounded.
6. `submit` is fire-and-forget. Double submission, pending disablement, server rejection, and rollback cannot be represented.

## Required source contract

Add prop synchronization rules, a composition-safe commit path, a total validator with an owned message, a pending lock, and a typed parent result. Verification later must cover Enter/Escape, blur, IME, empty/duplicate/long names, double activation, rejected persistence, and focus restoration.

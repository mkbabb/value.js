# CHALLENGE-C — `ColorComponentDisplay.vue` implementation audit

Source `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue`, lines 1–214, SHA-256 `4e14149252a20e6c140c06ed284fb60a0186c0b7e8801d718dbf1a6728b24466`. Static source inspection only.

**Verdict: SOURCE-RED.** Browser-mutated `contenteditable` DOM and Vue-rendered nested spans have no coherent commit/reconciliation contract.

## Findings

1. The editable element contains nested spans for integer/fraction. Browser editing can split/remove those nodes while Vue still assumes the rendered structure.
2. `@input` reads `innerText.trim()` and emits raw text; it does not handle composition, paste normalization, newline insertion, blur, Enter, Escape, or invalid input.
3. `role=textbox` lacks `aria-invalid`, `aria-describedby`, `inputmode`, `spellcheck=false`, and an edit/readonly state.
4. `update` is declared but never emitted, so consumers can bind to an event that cannot occur.
5. `:key="component"` and the `formatted` record assume unique matching component IDs; duplicates or missing entries render empty/editable cells.
6. `readoutDecimals` currently returns only 0 or 1, so precision itself is bounded; however, reactive updates while the cell is focused can overwrite the user’s browser-edited DOM without an explicit policy.

## Required closure

Move editing to controlled input state, validate before commit, preserve raw draft separately from formatted value, and test IME/paste/selection/blur/Enter/Escape, external updates while focused, duplicate/missing metadata, both supported precision rungs, and all numeric boundaries.

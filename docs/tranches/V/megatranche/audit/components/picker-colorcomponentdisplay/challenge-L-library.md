# CHALLENGE-L — `ColorComponentDisplay.vue` library-boundary audit

Source `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue`, lines 1–214, SHA-256 `4e14149252a20e6c140c06ed284fb60a0186c0b7e8801d718dbf1a6728b24466`. Static review only.

**Verdict: SOURCE-RED.** The view has a coherent local reservation module, but bypasses form primitives and exposes a weak data model.

## Findings

- `CardTitle` is imported through a deep demo forwarding path and used as the root of multiple editable textboxes; heading/title and form-control responsibilities are conflated.
- `readoutReservation` is a useful owned module, but the component contract passes `[string, any][]` and `Record<string, ComponentFormat>`, eliminating typed correspondence between components and formats.
- `ComponentFormat` permits arbitrary string values while `space` is an arbitrary string; reservation, parser, and color-model registries can drift.
- Raw `contenteditable` replaces a producer numeric/input primitive, leaving focus, validation, mobile keyboard, disabled, and error semantics local.
- Both `update` and `input` emits are declared, but only `input` is used; the public library surface advertises a dead event.

## Target boundary

Define a validated discriminated component model with ID, value, formatted parts, unit, range, precision, and edit parser. Separate `ColorReadout` from `ColorComponentEditor`; use a producer form-control boundary for editing and delete the unused emit.

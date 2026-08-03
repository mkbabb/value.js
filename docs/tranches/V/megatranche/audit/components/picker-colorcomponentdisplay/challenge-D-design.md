# CHALLENGE-D — `ColorComponentDisplay.vue` design audit

## Receipt

Source `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue`, lines 1–214, SHA-256 `4e14149252a20e6c140c06ed284fb60a0186c0b7e8801d718dbf1a6728b24466`. Source-only tranche audit.

**Verdict: SOURCE-RED.** The contiguous typographic readout is distinctive and carefully reserved, but the same numbers are silently editable with no affordance, validation, selection, or commit model.

## What is strong

- Tabular figures, stable per-space precision, negative-zero removal, and line reservation treat the readout as an instrument rather than decorative text.
- Integer/fraction/unit hierarchy is deliberate and removes fractional-format churn, although intrinsic cells still move at digit-count boundaries such as `9.9 → 10.0`.

## Findings

1. Each figure is `contenteditable`, yet it visually reads as static display type. There is no edit affordance, caret treatment, instruction, or mode transition.
2. Editing emits on every DOM input with no visible valid/invalid/pending state. The user cannot know whether a string was parsed, rejected, clamped, or committed.
3. A large responsive display type used as a textbox can be difficult on phone keyboards and at 200% zoom; there is no input mode, selected component label, or mobile editor treatment.
4. Units sit outside the editable span, so selection/paste and screen-reader reading order may not match the conceptual value.
5. Color alone demotes fractions/units; forced-colors and contrast against live surfaces remain unproven.
6. The line-lock deliberately reserves air, but the reservation can become a large blank zone in short tuples and needs real viewport evidence.

## Target gestalt

Keep the readout as a precise typographic instrument in idle state. On activation, transform one cell into a visibly bounded numeric editor with unit, range, validation, Apply/Cancel semantics, and a stable keyboard. Audit every space/component, min/max/out-of-range, invalid text, IME/paste, phone/desktop Safari, 200% text, forced colors, and reduced motion.

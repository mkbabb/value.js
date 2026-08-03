# CHALLENGE-C — `PaletteCardMeta.vue` implementation audit

Source `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue`, lines 1–64, SHA-256 `95dd9725de21b2c00e3a2c46f08606abd2afa1a5426d5fbd970b60971cb13c16`. Static inspection only.

**Verdict: SOURCE-RED.** Rendering is straightforward, but the action and truncation rules are incomplete and caller inconsistencies are silently accepted.

## Findings

1. `tags.slice(0, 3)` discards information without emitting an overflow count or preserving a navigation path to the full list.
2. Tag values are keys. Duplicate tag strings produce duplicate Vue keys; empty strings still render a pill.
3. `voteCount ?? 0` conflates unavailable count with a verified zero.
4. The visual heart fill reflects `palette.voted`, but the button has no `aria-pressed`, disabled, or pending state; repeated activation can emit multiple `vote` events.
5. The component accepts `palette.voted=true` with absent/negative vote count and fork/version flags without their companion values. No invariant is checked.
6. The button stops propagation but keyboard/card activation interactions remain an implicit parent contract.

## Closure tests required later

Duplicate/empty/long tags, `>3` overflow, unknown vs zero count, pending/double vote, rejected vote rollback, nested card keyboard activation, and extreme localized numerals. The result must bind the exact emitted action to the updated state.

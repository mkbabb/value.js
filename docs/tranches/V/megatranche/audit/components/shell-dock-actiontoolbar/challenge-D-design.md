# CHALLENGE-D — `ActionToolbar.vue` design audit

## Receipt

Source `demo/shell/dock/ActionToolbar.vue`, lines 1–92, SHA-256 `bb73802a79a4b57857969d0d05a1cb57bbcfae65326b33f5204784621e3b3df8`. Source-only audit.

**Verdict: SOURCE-RED.** Five equally weighted icon actions provide breadth but not hierarchy, state truth, or touch-first explanation.

## Findings

1. Reset, copy, randomize, palettes, and extract are distributed evenly even though they differ in frequency, destructiveness, and navigation scope.
2. Titles/descriptions appear to be hover-driven through `ActionButton`; touch users cannot depend on hover explanations.
3. Editing disables palettes and extract but leaves reset/random/copy active. The rationale and consequences during an edit are not visible.
4. Palette has an active visual style, but the toolbar has no selected/expanded relationship to the palette surface.
5. Copy, random, and reset have no pending/success/failure register at this boundary.
6. `canProposeName` is accepted but has no visual effect, suggesting an intended command or state is missing.
7. Equal spacing across a narrow dock can produce small targets or crowding; no overflow/label mode is specified.

## Direction and states

Group value operations (reset/random/copy) separately from workspace navigation (palettes/extract), give the highest-frequency command a persistent label at wider widths, and show command results adjacent to origin. Audit idle/editing/palette-open/extract-open/copy success-fail/reset confirmation/random pending; phone/desktop; keyboard/touch; reduced motion; and large text.

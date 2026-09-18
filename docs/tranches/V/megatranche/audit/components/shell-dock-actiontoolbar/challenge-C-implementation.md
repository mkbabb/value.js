# CHALLENGE-C — `ActionToolbar.vue` implementation audit

Source `demo/shell/dock/ActionToolbar.vue`, lines 1–92, SHA-256 `bb73802a79a4b57857969d0d05a1cb57bbcfae65326b33f5204784621e3b3df8`. Source-only.

**Verdict: SOURCE-RED.** The component emits fire-and-forget commands, contains a dead prop, and allows state combinations it cannot explain.

## Findings

1. `canProposeName` is declared and never read.
2. `activeHover` is `string | null` rather than a command-ID union. Current children emit only their hard-coded `hoverKey` or null, but compile-time correspondence is not enforced.
3. Five repeated update handlers create drift risk and no invariant ensures unique hover keys.
4. `isEditing` disables only two commands. Reset/random can mutate the edited value and copy can capture an intermediate value; no atomic edit policy is encoded.
5. Events have no command/result ID, pending lock, or error return. Double activation and out-of-order completion are unrepresentable.
6. `paletteActive` can be true while the palette action is disabled, and there is no corresponding extract-active state.
7. `clearHover` is exposed and the parent holds a typed `InstanceType<typeof ActionToolbar>` ref, but repository search finds no caller; the imperative is currently dead public surface.

Closure requires a finite command registry, explicit availability derivation, edit-state law, typed async receipts, double-activation controls, complete active-state representation, and removal of the dead prop/exposed hover imperative.

# CHALLENGE-L — `ActionToolbar.vue` library-boundary audit

Source `demo/shell/dock/ActionToolbar.vue`, lines 1–92, SHA-256 `bb73802a79a4b57857969d0d05a1cb57bbcfae65326b33f5204784621e3b3df8`. Static audit only.

**Verdict: SOURCE-RED.** The toolbar centralizes one local button component but still duplicates command declaration and exposes hover state as shared mutable string state.

## Findings

- Five near-identical `ActionButton` invocations repeat icon, key, title, description, color, event, and hover wiring instead of consuming a typed command registry.
- Lucide components and action emits are separate bindings and can evolve independently, but no typed registry enforces the intended command↔glyph↔label correspondence.
- `ActionButton` is demo-local, so toolbar, tooltip, icon button, and command-result behavior remain outside the producer library.
- `activeHover` is a free-form string shared by every child rather than a union of command IDs.
- The imperative `clearHover` exposure leaks presentation state to a parent.
- `canProposeName` is dead at this boundary, evidence that the prop/API contract has drifted.

## Target boundary

Use a typed `DockCommand[]` registry with ID, label, description, icon token, group, availability, active state, and execution status. A producer command-toolbar primitive should own roving focus, touch explanation, overflow, and result announcement; hover state should remain internal.

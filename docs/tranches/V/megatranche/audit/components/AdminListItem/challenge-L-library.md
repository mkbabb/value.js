# CHALLENGE-L — `AdminListItem.vue` library-boundary audit

Source `demo/palettes/browser/admin/AdminListItem.vue`, lines 1–24, SHA-256 `a15213314633bee79679f923988feaeb3e387d683106d574f03089b2b99e2c7a`. Source-only.

**Verdict: SOURCE-RED.** This is a reusable primitive in practice but has no explicit library contract.

## Findings

- There are no imports, props, or types: reuse occurs through three unconstrained slots and copied class expectations.
- Comments specify an expected 8×8 swatch and typography, but the component neither supplies nor validates those primitives.
- The row frame is duplicated in `AdminListSkeleton` instead of shared structurally.
- Action semantics, item semantics, selection, disclosure, and navigation are all delegated, so consumers can produce incompatible or inaccessible rows under the same visual shell.
- If this pattern is common, it belongs in the application UI layer or glass-ui as a compound primitive—not as an untyped leaf in one feature directory.

Target a typed compound API with `as`, semantic role, density, state, leading/content/actions/detail slots, and one shared skeleton frame.

# CHALLENGE-C — `AdminListItem.vue` implementation audit

Source `demo/palettes/browser/admin/AdminListItem.vue`, lines 1–24, SHA-256 `a15213314633bee79679f923988feaeb3e387d683106d574f03089b2b99e2c7a`. Static inspection only.

**Verdict: SOURCE-RED.** The implementation cannot enforce the semantic or layout invariants its comments promise.

## Findings

1. Empty `swatch` and `actions` slots still leave fixed boxes/gaps; there is no conditional rendering.
2. Arbitrary slot content can violate expected dimensions, overflow, or contain nested interactive controls with conflicting row behavior.
3. The root has no `role`, item ID, selected state, disabled state, or keyboard contract.
4. There is no detail/disclosure region even though admin rows often need it; consumers may create detached siblings.
5. Truncation is delegated to content supplied by callers; the wrapper only hides overflow, potentially clipping focus rings or important text.

Closure requires slot-presence adaptation, semantic root selection, invariant checks for interactive composition, focus-ring preservation, and narrow/RTL/large-text tests.

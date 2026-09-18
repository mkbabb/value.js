# CHALLENGE-C — `AdminListSkeleton.vue` implementation audit

Source `demo/palettes/browser/admin/AdminListSkeleton.vue`, lines 1–24, SHA-256 `be2b810a2edbdc8e6f52a2787905bcc08921a1f4422daa00f90e2d2314910db4`. Source-only.

**Verdict: SOURCE-RED.** The static leaf is simple but creates duplicate status nodes and cannot adapt to the collection it represents.

## Findings

1. Multiple instances each expose `role=status aria-label=Loading`; no deduplication or `aria-busy` relationship exists.
2. All sizes are fixed utility values, so large-text and narrow-container behavior is unbounded.
3. Vue fallthrough permits a parent to add `aria-hidden=true` to this single root, but the component has no explicit typed/owned policy coordinating that choice with a collection-level loading announcement.
4. There is no prop for row variant or action absence; false geometry is unavoidable for some consumers.
5. Transition from skeleton to data has no focus/announcement contract.

Required later verification: repeated rows produce one announcement, reduced motion eliminates the producer's default scan animation, geometry matches each row variant, and replacement does not shift focus or announce stale loading.

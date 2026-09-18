# CHALLENGE-L — `AdminListSkeleton.vue` library-boundary audit

Source `demo/palettes/browser/admin/AdminListSkeleton.vue`, lines 1–24, SHA-256 `be2b810a2edbdc8e6f52a2787905bcc08921a1f4422daa00f90e2d2314910db4`. Static audit only.

**Verdict: SOURCE-RED.** The component consumes glass-ui Skeleton but locally hard-codes a collection-specific composition and accessibility policy.

## Findings

- `Skeleton` arrives through a demo forwarding barrel; the installed primitive accepts only class, so repeated `surface="glass"`/`variant="breath"` are inert rather than producer axes, while utility geometry remains local.
- The row is coupled to `AdminListItem` only by comments and copied classes. No shared row-frame primitive guarantees that their layouts remain identical.
- Loading semantics belong to a list/resource boundary, not each visual placeholder.
- No variant prop represents row anatomy, density, or count; consumers must duplicate the component or accept a false shape.

Target: a shared `AdminListRowFrame` used by both real and skeleton rows, with collection-level `ResourceState` owning busy/error semantics and producer motion tokens owning reduced-motion behavior.

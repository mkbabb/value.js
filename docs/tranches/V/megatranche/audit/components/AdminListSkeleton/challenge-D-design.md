# CHALLENGE-D — `AdminListSkeleton.vue` design audit

## Receipt

Source `demo/palettes/browser/admin/AdminListSkeleton.vue`, lines 1–24, SHA-256 `be2b810a2edbdc8e6f52a2787905bcc08921a1f4422daa00f90e2d2314910db4`. Source-only.

**Verdict: CONDITIONAL / SOURCE-RED.** The skeleton accurately mirrors the row grammar, but its announcement, quantity, motion, and long-wait behavior are unspecified.

## Findings

1. Every instance is `role=status` named “Loading.” Repeating several rows can create duplicate announcements instead of one collection-level busy state.
2. The anatomy is fixed to swatch, two text lines, and action pill. Admin rows that differ will incur layout shift or promise controls they do not have.
3. `surface="glass"` and `variant="breath"` are not accepted Skeleton props and are inert attrs. The installed primitive therefore runs its default scan animation, which is already gated by `prefers-reduced-motion: no-preference`; the remaining gap is a truthful local long-wait/calm-state contract, not missing reduced-motion gating.
4. There is no error/slow-network escalation; the skeleton can persist indefinitely with no explanation.
5. Fixed widths encode one content rhythm but are not responsive to narrow containers or large text.

## Closure

Move status/busy semantics to the list container; make the row decorative. Audit 1/many rows, keyboard traversal during replacement, reduced motion, 200% text, mobile phone widths, long wait, transition to ready/empty/error, and variant anatomies.

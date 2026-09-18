# CHALLENGE-D — `PaginationBar.vue` design audit

## Receipt

Source `demo/palettes/browser/admin/PaginationBar.vue`, lines 1–48, SHA-256 `3006c9b99288b591c70272dada3b587fb5b30a88ef8bf775b67ea8e78b73322c`. Source-only.

**Verdict: SOURCE-RED.** The compact previous/page/next grammar is legible, but it cannot distinguish data loading, invalid pagination, unknown totals, or destructive page changes.

## Findings

1. The bar disappears whenever `pageCount <= 1`; that conflates a verified single page with unknown count, loading, error, and invalid negative/zero totals.
2. Page changes have no busy register. Users can repeatedly activate arrows while results are loading and receive no relation between displayed page text and displayed rows.
3. There are no first/last or direct-page affordances; that may be correct for small sets, but no threshold or large-count design exists.
4. The live page sentence is useful, yet rapid updates could announce intermediate states before content is ready.
5. Icon-only buttons are named, but intended `variant="outline"` is not the current producer vocabulary; the visual hierarchy may not match the source.

## Required cells

Known 1/2/many pages; unknown total; first/middle/last; loading; request failure; stale page after deletion; phone/desktop; keyboard/touch; large numerals/localization. Announce the page only when the corresponding list has committed.

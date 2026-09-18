# CHALLENGE-D — `AdminListItem.vue` design audit

## Receipt

Source `demo/palettes/browser/admin/AdminListItem.vue`, lines 1–24, SHA-256 `a15213314633bee79679f923988feaeb3e387d683106d574f03089b2b99e2c7a`. Static tranche audit.

**Verdict: SOURCE-RED.** The row has a sensible three-zone composition, but it is only geometry: semantics, states, density, selection, and mobile action behavior are absent.

## Findings

1. The root is a generic `div`, not a list item, article, row, link, or button. Consumers must invent semantics independently.
2. Swatch, content, and actions are visual slots with no labels or required anatomy. Empty slots still reserve space.
3. The trailing action cluster can grow without a width/overflow policy and can squeeze identity content on phone widths.
4. Hover, focus-within, selected, disabled, destructive, pending, and expanded states have no row-level design.
5. The row has a border/radius but no signature connection to the admin information architecture; it risks becoming a generic card repeated everywhere.

## Direction

Use a data-ledger row: stable leading identity marker, explicit primary/secondary semantic slots, a bounded action menu, and an optional disclosed detail region. Audit idle/hover/focus/selected/pending/error/expanded, missing swatch/actions, long text, RTL, 200% text, phone and desktop Safari.

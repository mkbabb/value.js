// palette-browser — the mega-feature's TOP-LEVEL SEAM (U.W-DEMO · U-F47).
//
// The stable public API of the palette-browser feature: a single barrel that
// re-exports the six sub-feature faces (card · admin · search · dialog · slug ·
// status). External consumers reach the feature through THIS seam (or a
// sub-barrel it re-exports), never a raw internal `.vue` file — the G-DEMO-3b
// boundary (eslint.config.js) enforces it standing.
//
// PI-6 (T.W1 F7): NAMED re-exports ONLY — never a star re-export. A Vue SFC's
// scoped `<style>` is a side-effecting import; named re-exports let the bundler
// tree-shake unused members per consumer (so reaching the seam for one symbol
// does not pull every sibling SFC's style into the consumer's chunk). App.vue's
// eager `index.js` chunk therefore still reaches `MigratePalettesDialog`
// through the `dialog/` sub-barrel directly (a named re-export that
// tree-shakes) — the seam's presence is the public contract; the sub-barrel is
// the tree-shake-honest reach.

export {
    PaletteCard,
    PaletteCardGrid,
    PaletteCardSkeleton,
    ShadowPalette,
    PaletteColorStrip,
    CurrentPaletteEditor,
} from "./card";

export {
    AdminUsersPanel,
    AdminNamesPanel,
    AdminAuditPanel,
    AdminFlaggedPanel,
    AdminTagsPanel,
} from "./admin";

export { SearchFilterBar, UserSortMenu, TagEditPopover } from "./search";

export {
    FlagReportDialog,
    VersionHistoryDrawer,
    MigratePalettesDialog,
    useDialogBrowseActions,
} from "./dialog";

export { PaletteSlugBar } from "./slug";

export { ApiOfflineChip } from "./status";

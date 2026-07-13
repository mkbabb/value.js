// palette-browser · dialog cluster — hardened public surface (T.W1 F7).
// NAMED re-exports only (PI-6). U.W-DEMO · U-F47 (G-DEMO-3b): App.vue's eager `index.js` chunk
// now reaches MigratePalettesDialog through THIS barrel (the seam), never the raw `.vue` file. The
// PI-6 eager-chunk hygiene residual (the `./demo/**` sideEffects mark defeats the named-re-export
// tree-shake) is BOOKED to the bundle-config reconciliation — see App.vue's import note.
export { default as FlagReportDialog } from "./FlagReportDialog.vue";
export { default as VersionHistoryDrawer } from "./VersionHistoryDrawer.vue";
export { default as MigratePalettesDialog } from "./MigratePalettesDialog.vue";
export { useDialogBrowseActions } from "./composables/useDialogBrowseActions";

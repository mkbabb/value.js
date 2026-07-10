// palette-browser · dialog cluster — hardened public surface (T.W1 batch 5).
// NAMED re-exports only (PI-6: App.vue's eager `index.js` chunk imports only
// `MigratePalettesDialog` from here — named re-exports tree-shake the sibling dialogs away,
// keeping the eager chunk clean). Batch 5 re-exports from the still-flat locations; batch 6
// repoints to the moved sub-folder.
export { default as FlagReportDialog } from "../FlagReportDialog.vue";
export { default as VersionHistoryDrawer } from "../VersionHistoryDrawer.vue";
export { default as MigratePalettesDialog } from "../MigratePalettesDialog.vue";
export { useDialogBrowseActions } from "../PaletteDialog/composables/useDialogBrowseActions";

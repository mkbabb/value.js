// palette-browser · dialog cluster — hardened public surface (T.W1 F7).
// NAMED re-exports only (PI-6). App.vue's eager `index.js` chunk imports MigratePalettesDialog
// DIRECTLY (not via this barrel) to keep the eager chunk from pulling the lazy sibling dialogs'
// side-effecting <style> — see App.vue's import note.
export { default as FlagReportDialog } from "./FlagReportDialog.vue";
export { default as VersionHistoryDrawer } from "./VersionHistoryDrawer.vue";
export { default as MigratePalettesDialog } from "./MigratePalettesDialog.vue";
export { useDialogBrowseActions } from "./composables/useDialogBrowseActions";

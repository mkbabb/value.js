// palette-browser · status cluster — hardened public surface (T.W1 batch 5).
// NAMED re-exports only (PI-6: App.vue's eager `index.js` chunk imports only
// `DevMisconfigBanner` from here). Batch 5 re-exports from the still-flat locations; batch 6
// repoints to the moved sub-folder.
export { default as ApiOfflineChip } from "../ApiOfflineChip.vue";
export { default as DevMisconfigBanner } from "../DevMisconfigBanner.vue";

// palette-browser · status cluster — hardened public surface (T.W1 F7).
// NAMED re-exports only (PI-6). ApiOfflineChip's live consumer is CurrentPaletteEditor (internal,
// direct relative import); DevMisconfigBanner's is App.vue (eager, direct). This barrel is the
// declared public surface for any future non-eager external consumer.
export { default as ApiOfflineChip } from "./ApiOfflineChip.vue";
export { default as DevMisconfigBanner } from "./DevMisconfigBanner.vue";

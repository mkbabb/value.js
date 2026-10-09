// palette-browser · card cluster — hardened public surface (T.W1 F7).
// X-W12U .k2 (A2-VA-L1-17): the specimen, strip and skeleton are re-homed to
// shared/ui (their consumers span palettes, workbenches and admin); they are
// imported from there, never re-exported through this cluster.
// NAMED re-exports only (PI-6: never a star re-export — SFC scoped <style> is a side-effecting
// import; named re-exports let the bundler tree-shake unused members per consumer).
export { default as PaletteCardGrid } from "./PaletteCardGrid.vue";
export { default as CurrentPaletteEditor } from "./CurrentPaletteEditor.vue";

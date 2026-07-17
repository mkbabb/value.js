// picker feature — public entry (the route leaf). The DOMAIN model + color-space
// metadata live in color-session (`color-model.ts` / `colorSpaceInfo.ts`);
// ColorNutritionLabel colocated with its sole consumer (scenes/about); the
// shared ColorSpaceSelector promoted to color-session — all at W43b3 (RF-15).
export { default as ColorPicker } from "./ColorPicker.vue";

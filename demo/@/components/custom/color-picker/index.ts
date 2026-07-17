// color-picker feature — UI barrel. The DOMAIN model + color-space metadata
// moved to color-session (`color-model.ts` / `colorSpaceInfo.ts`) at W43b3
// (RF-15): color-session owns the product color domain, the picker owns its UI.
export { default as ColorPicker } from "./ColorPicker.vue";
export { default as ColorNutritionLabel } from "./display/ColorNutritionLabel.vue";

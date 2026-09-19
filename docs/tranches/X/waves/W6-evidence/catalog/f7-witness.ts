// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.f · X:CSS-1 gate **f7** — THE TYPE WITNESS.
//
//   npx vue-tsc --noEmit -p docs/tranches/X/waves/W6-evidence/catalog/tsconfig.f7-witness.json
//
// The gate's own words: "The boundary is the domain type", and **lint is
// INADMISSIBLE** — eslint exits 0 with all three `colorSpace: any` holes
// present, so a grep-and-lint pair cannot tell a cured boundary from an uncured
// one. The evidence is `vue-tsc` plus THIS witness.
//
// How it reads. `@ts-expect-error` is an ASSERTION that the next line does not
// compile. Under the pre-cure contract — `modelValue: string` — assigning
// "not-a-space" compiles fine, so the directive goes UNUSED and TypeScript
// reports `Unused '@ts-expect-error' directive`: the witness is RED precisely
// because the wrong binding was accepted. Under `defineModel<DisplayColorSpace>`
// the assignment is an error, the directive is used, and the file compiles
// clean. The control line below fails in the opposite direction if the type ever
// widens back to `string` OR narrows past the catalog.
//
// This file is evidence, not shipped code: it sits under `W6-evidence/` and is
// compiled by its own project beside the demo program, never by it.
import ColorSpaceSelector from "../../../../../../demo/color-session/ColorSpaceSelector.vue";
import type { DisplayColorSpace } from "../../../../../../demo/color-session/color-model";

type SelectorProps = InstanceType<typeof ColorSpaceSelector>["$props"];
type BoundSpace = SelectorProps["modelValue"];

// @ts-expect-error — "not-a-space" is not a DisplayColorSpace. RED when the prop
// is the wide `string` the component used to declare.
export const wrongBinding: BoundSpace = "not-a-space";

// The control: a real catalog member binds, and the bound type IS the domain
// type — not a widening of it.
export const rightBinding: BoundSpace = "display-p3";
export const domainRoundTrip: DisplayColorSpace = rightBinding;
export const boundIsDomain: BoundSpace = "oklch" satisfies DisplayColorSpace;

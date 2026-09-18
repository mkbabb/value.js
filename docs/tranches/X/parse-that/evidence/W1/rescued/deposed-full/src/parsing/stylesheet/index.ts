// The stylesheet-surface cluster barrel (T.W1-src §3 — name-preserving).
//
// `stylesheet.ts` (at-rules + qualified rules; the public head) over the shared
// AST hub `stylesheet-types.ts` + the `extract.ts` walkers + the `serialize.ts`
// AST→string path. `stylesheet.ts` already surfaces the public AST types (it
// re-exports them from the leaf), so the barrel re-exports each symbol from
// exactly ONE source — no duplicate-member collision. The old `parsing/stylesheet`
// specifier is byte-stable here; `parsing/extract` + `parsing/serialize` consumers
// repoint to the leaf paths (`./parsing/stylesheet/{extract,serialize}`). Named
// re-exports only (never `export *`, PI-6).
export { parseCSSStylesheet } from "./stylesheet";
export type {
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    PropertyDescriptor,
    ScrollTimelineDescriptor,
    Stylesheet,
    StylesheetItem,
    ViewTimelineDescriptor,
} from "./stylesheet";
export {
    extractKeyframes,
    extractProperties,
    extractFunctions,
    extractStyleRules,
    extractAnimationOptions,
} from "./extract";
export type { CSSAnimationOptions } from "./extract";
export {
    serializeKeyframeSelector,
    serializeDeclaration,
    serializeStylesheetItem,
    serializeStylesheet,
    formatCSS,
    stylesheetToString,
} from "./serialize";

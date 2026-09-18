// The color-parse cluster barrel (T.W1-src §3 — name-preserving at the barrel).
//
// `parsing/color` was a single 718-LoC file; the cluster is now `color.ts` (the
// public head) over its two cluster-private members `color-unit.ts` and
// `relative-color.ts` (a sealed sub-graph — neither has an external importer).
// This barrel re-exports the SAME symbol set the old `parsing/color` specifier
// resolved to (color.ts's public exports), so `./parsing/color` is byte-stable
// at the FROZEN public surface. Named re-exports only (never `export *`, PI-6).
export {
    CSSColor,
    parseCSSColor,
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "./color";
export type { ParsedColorUnit } from "./color";

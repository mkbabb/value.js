import { bezierPresets } from "@mkbabb/value.js/easing";
import {
    SPECIMEN_FAMILIES,
    SPECIMEN_TILES,
    bezierLiteral,
    specimenNameFor,
    tileIdFor,
    glyphPath,
} from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue";

const presetNames = Object.keys(bezierPresets);
console.log("bezierPresets count      :", presetNames.length);
console.log("SPECIMEN_TILES count     :", SPECIMEN_TILES.length);
console.log("families rendered        :", SPECIMEN_FAMILIES.map((f) => f.family).join(", "));
const tileIds = new Set(SPECIMEN_TILES.map((t) => t.id));
const missing = presetNames.filter((n) => !tileIds.has(n));
console.log("presets WITH NO TILE     :", missing.join(", ") || "(none)");

for (const name of missing) {
    const css = bezierLiteral([...(bezierPresets as any)[name]]);
    const interval = { css, mode: "bezier" } as any;
    console.log(
        `  ${name.padEnd(18)} css=${css.padEnd(40)} tileIdFor=${String(tileIdFor(interval))} specimenNameFor=${specimenNameFor(interval)}`,
    );
}

// duplicate-literal identity check
const byCss = new Map<string, string[]>();
for (const t of SPECIMEN_TILES) {
    byCss.set(t.css, [...(byCss.get(t.css) ?? []), t.id]);
}
console.log(
    "duplicate literals       :",
    [...byCss.entries()].filter(([, v]) => v.length > 1).map(([k, v]) => `${k} -> ${v.join("/")}`).join(" | ") || "(none)",
);

// domain-boundary behaviour of the glyph painter
const boundary: Array<[string, (t: number) => number]> = [
    ["NaN-fn", () => NaN],
    ["Infinity-fn", () => Infinity],
    ["negzero-fn", () => -0],
    ["huge-fn", () => 1e300],
];
for (const [label, fn] of boundary) {
    const d = glyphPath(fn as any, 2);
    console.log(`glyphPath(${label.padEnd(12)}) = ${d}`);
}

// steps identity: any non-default steps literal presses the generic tile
for (const css of ["steps(5, jump-end)", "steps(12, jump-both)", "steps(1, jump-none)"]) {
    const interval = { css, mode: "steps" } as any;
    console.log(`steps identity ${css.padEnd(22)} -> tile ${tileIdFor(interval)}`);
}

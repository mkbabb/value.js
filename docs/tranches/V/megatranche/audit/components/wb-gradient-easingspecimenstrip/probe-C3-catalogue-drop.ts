import { bezierPresets } from "@mkbabb/value.js/easing";
import {
    SPECIMEN_FAMILIES,
    SPECIMEN_TILES,
    tileIdFor,
    bezierLiteral,
} from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue";

const presetNames = Object.keys(bezierPresets);
console.log("bezierPresets count:", presetNames.length);
console.log("SPECIMEN_TILES count:", SPECIMEN_TILES.length);
console.log("families:", SPECIMEN_FAMILIES.map((f) => `${f.family}(${f.tiles.length})`).join(" "));

const tileIds = new Set(SPECIMEN_TILES.map((t) => t.id));
const dropped = presetNames.filter((n) => !tileIds.has(n));
console.log("DROPPED presets (" + dropped.length + "):", dropped.join(", "));

for (const n of dropped) {
    const quad = (bezierPresets as any)[n];
    const css = bezierLiteral([...quad]);
    console.log(`  ${n} -> ${css}  tileIdFor => ${JSON.stringify(tileIdFor({ css } as any))}`);
}

// duplicate css literals?
const seen = new Map<string, string[]>();
for (const t of SPECIMEN_TILES) {
    seen.set(t.css, [...(seen.get(t.css) ?? []), t.id]);
}
for (const [css, ids] of seen) if (ids.length > 1) console.log("DUP literal", css, ids);

// steps identity round-trip
console.log("tileIdFor steps(4, jump-end) =", tileIdFor({ css: "steps(4, jump-end)" } as any));
console.log("tileIdFor steps(7, jump-both) =", tileIdFor({ css: "steps(7, jump-both)" } as any));
console.log("tileIdFor linear(0, 1) =", tileIdFor({ css: "linear(0, 0.25 50%, 1)" } as any));
console.log("tileIdFor '' =", tileIdFor({ css: "" } as any));

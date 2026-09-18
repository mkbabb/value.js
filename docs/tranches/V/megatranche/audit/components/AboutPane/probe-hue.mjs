// AboutPane C-3 probe: does About's space change clobber the pipeline's
// stableHue invariant, where the picker's identical act does not?
//
// About writes model.value = {...} directly (App.vue:345 `updateModel: (v) =>
// { model.value = v }`), so useColorPipeline's stableHue watch classifies it
// EXTERNAL and recomputes stableHue from the color.  The picker writes via
// pipeline.updateModel (self-originated) and the watch SKIPS.
//
// The watch body (useColorPipeline.ts:88-95):
//   const hsv = convertPickerColor(m.color, "hsv");
//   if (s * v > 0.01) stableHue.value = channelNumber(hsv, "h");
//
// So: find a model color where hsv(s*v) > 0.01 AND the hsv hue differs from a
// deliberate stableHue -> About's space change makes the picker's hue slider
// and spectrum handle JUMP.
import { parseCssColor } from "@mkbabb/value.js/css";
import * as C from "@mkbabb/value.js/color";

const conv = (css, to) => {
    const p = parseCssColor(css);
    if (!p.ok) throw new Error("parse " + css);
    const r = C.convertColor(p.value, to);
    if (!r.ok) throw new Error("convert " + css);
    return r.value;
};
const ch = (c, key) => {
    const i = { h: 0, s: 1, v: 2 }[key];
    const x = c.channels[i];
    return typeof x === "number" ? x : 0;
};

console.log("space | css | hsv h | hsv s | hsv v | s*v | watch fires?");
for (const c of [0.30, 0.10, 0.05, 0.02, 0.015, 0.01, 0.005, 0.002, 0.0]) {
    const css = `oklch(0.5 ${c} 210)`;
    const hsv = conv(css, "hsv");
    const h = ch(hsv, "h"), s = ch(hsv, "s"), v = ch(hsv, "v");
    console.log(
        `oklch c=${c}`.padEnd(14),
        css.padEnd(22),
        `h=${h.toFixed(3)}`.padEnd(12),
        `s=${s.toFixed(4)}`.padEnd(12),
        `v=${v.toFixed(4)}`.padEnd(12),
        `s*v=${(s * v).toFixed(5)}`.padEnd(14),
        s * v > 0.01 ? "YES -> stableHue := " + h.toFixed(3) : "no (hue held)",
    );
}

// --- Part 2: how far does stableHue drift from hsv(color).h under a NON-hue
// component edit?  (updateColorComponent only refreshes stableHue for h/hue.)
console.log("\nL-sweep at fixed oklch hue 210, c=0.02 -> hsv hue:");
for (const L of [0.10, 0.20, 0.30, 0.50, 0.70, 0.90, 0.98]) {
    const css = `oklch(${L} 0.02 210)`;
    const hsv = conv(css, "hsv");
    console.log(`  ${css.padEnd(22)} hsv h=${ch(hsv,"h").toFixed(3).padStart(8)}  s*v=${(ch(hsv,"s")*ch(hsv,"v")).toFixed(5)}`);
}
console.log("\nlab a/b sweep (a fixed 0, b swept) -> hsv hue:");
for (const b of [40, 20, 8, 4, 2, 1]) {
    const css = `lab(60% 0 ${b})`;
    const hsv = conv(css, "hsv");
    console.log(`  ${css.padEnd(22)} hsv h=${ch(hsv,"h").toFixed(3).padStart(8)}  s*v=${(ch(hsv,"s")*ch(hsv,"v")).toFixed(5)}`);
}

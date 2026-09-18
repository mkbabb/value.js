// Challenge-C evidence probe (read-only): does the demo's gradient parse path
// REJECT or THROW on the MT-F001 empty-argument colour functions, and does it
// accept the exact CSS the stop editor's own drag produces?
import { parseCssColor } from "/Users/mkbabb/Programming/value.js/src/css/index";
import { parseGradientCSS } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/gradientParse";

const emptyFns = ["oklch()", "rgb()", "hsl()", "lab()", "lch()", "oklab()", "hwb()", "color()"];
for (const s of emptyFns) {
    try {
        const r = parseCssColor(s);
        console.log(`parseCssColor(${JSON.stringify(s)}) -> ${r.ok ? "ok" : "reject"}`);
    } catch (e) {
        console.log(`parseCssColor(${JSON.stringify(s)}) -> THROW ${(e as Error).name}: ${(e as Error).message}`);
    }
}

const cssCases = [
    // the exact string the live drag put in the CSS editor (see report §D-1)
    "linear-gradient(90deg, oklch(0.75 0.15 145) 74.9%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)",
    "linear-gradient(90deg, oklch(), blue)",
    "linear-gradient(90deg, red, blue)",
];
for (const css of cssCases) {
    try {
        const r = parseGradientCSS(css);
        console.log(`parseGradientCSS -> ${r.ok ? "ok" : `reject: ${r.reason}`}  << ${css}`);
    } catch (e) {
        console.log(`parseGradientCSS -> THROW ${(e as Error).name}: ${(e as Error).message}  << ${css}`);
    }
}

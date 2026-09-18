/* eslint-disable no-console */
import { parseCssColor, parseCssScalar } from "@mkbabb/value.js/css";
import { parseGradientCSS } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/gradientParse";

const tokens = [
    "oklch()", "oklab()", "lch()", "lab()", "rgb()", "rgba()", "hsl()", "hsla()",
    "hwb()", "color()", "color-mix()", "light-dark()", "device-cmyk()",
    "oklch(", "oklch(0.5", "oklch(0.5 )", "oklch( )", "rgb(,)", "rgb(1,)",
    "#", "#f", "#ff", "#ffff", "#fffffff", "red", "transparent",
    "var(--x)", "currentColor", "color(srgb)", "color(display-p3)",
];

console.log("── parseCssColor(token) totality ──");
for (const t of tokens) {
    try {
        const r = parseCssColor(t);
        console.log(`  ${JSON.stringify(t).padEnd(18)} → ${r.ok ? "ok" : "not-ok"}`);
    } catch (e: any) {
        console.log(`  ${JSON.stringify(t).padEnd(18)} → *** THROWS ${e.constructor.name}: ${e.message}`);
    }
}

console.log("\n── parseCssScalar(token) totality (position path) ──");
for (const t of ["50%", "%", "calc()", "calc(1", "e", "1e", "1e400%", "-0%", "NaN%", "Infinity%", "()"]) {
    try {
        const r = parseCssScalar(t);
        console.log(`  ${JSON.stringify(t).padEnd(14)} → ${r.ok ? "ok " + JSON.stringify((r as any).value?.payload) : "not-ok"}`);
    } catch (e: any) {
        console.log(`  ${JSON.stringify(t).padEnd(14)} → *** THROWS ${e.message}`);
    }
}

console.log("\n── parseGradientCSS end-to-end (the editor's live path) ──");
const inputs = [
    "linear-gradient(90deg, oklch(), blue)",
    "linear-gradient(90deg, red, oklch())",
    "linear-gradient(90deg, red, rgb())",
    "linear-gradient(90deg, red, color())",
    "linear-gradient(oklch(), oklch())",
    "conic-gradient(from 45deg, lab(), blue)",
    "radial-gradient(hsl(), blue)",
];
for (const css of inputs) {
    try {
        const r = parseGradientCSS(css);
        console.log(`  ${css.padEnd(44)} → ${r.ok ? "ok" : "reject: " + r.reason}`);
    } catch (e: any) {
        console.log(`  ${css.padEnd(44)} → *** THROWS ${e.message}`);
    }
}

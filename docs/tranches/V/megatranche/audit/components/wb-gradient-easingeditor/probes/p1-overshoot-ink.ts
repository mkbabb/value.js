/**
 * P1 — the specimen row's ink derivation at overshoot / steps regimes.
 * useSpecimenRows.ts:53-59 mixes the two endpoints at t = fn(0.5).
 * For the `back` family fn(0.5) is NOT in [0,1]. What comes out?
 */
import { bezierPresets, CubicBezier, steppedEase } from "@mkbabb/value.js/easing";
import { interpolateStopColors } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
import { easingFnOf } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";

const c0 = "oklch(0.75 0.15 145)";
const c1 = "oklch(0.65 0.18 265)";

console.log("== fn(0.5) per catalogue preset ==");
const outOfRange: string[] = [];
for (const [name, quad] of Object.entries(bezierPresets)) {
    const r = CubicBezier(...(quad as [number, number, number, number]));
    if (!r.ok) { console.log(`  ${name.padEnd(22)} INVALID`); continue; }
    const t = r.value(0.5);
    const flag = t < 0 || t > 1 ? "  <-- OUT OF [0,1]" : "";
    if (flag) outOfRange.push(name);
    let mixed = "";
    try {
        mixed = interpolateStopColors(c0, c1, t, "oklch", "shorter");
    } catch (e) {
        mixed = `THREW: ${(e as Error).message}`;
    }
    console.log(`  ${name.padEnd(22)} fn(0.5)=${t.toFixed(6).padStart(10)}  mid=${mixed}${flag}`);
}
console.log("\nout-of-range presets:", outOfRange.join(", ") || "(none)");

console.log("\n== steps family ==");
for (const [n, pos] of [[4, "jump-end"], [1, "jump-start"], [1, "jump-end"]] as const) {
    const r = steppedEase(n, pos as never);
    if (!r.ok) { console.log(`  steps(${n},${pos}) INVALID`); continue; }
    const t = r.value(0.5);
    let mixed = "";
    try { mixed = interpolateStopColors(c0, c1, t, "oklch", "shorter"); }
    catch (e) { mixed = `THREW: ${(e as Error).message}`; }
    console.log(`  steps(${n}, ${pos})`.padEnd(26), `fn(0.5)=${t}`, "mid=", mixed);
}

console.log("\n== a linear() literal via the css door (no fn cache) ==");
for (const css of ["linear(0, 1)", "linear(0, -0.5 50%, 1)", "cubic-bezier(0.5, 3, 0.5, -3)"]) {
    try {
        const fn = easingFnOf({ css });
        const t = fn(0.5);
        console.log(`  ${css.padEnd(32)} fn(0.5)=${t}  mid=${interpolateStopColors(c0, c1, t, "oklch", "shorter")}`);
    } catch (e) {
        console.log(`  ${css.padEnd(32)} THREW: ${(e as Error).message}`);
    }
}

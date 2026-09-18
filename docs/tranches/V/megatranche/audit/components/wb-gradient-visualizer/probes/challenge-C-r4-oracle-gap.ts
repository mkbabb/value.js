/* eslint-disable no-console */
/**
 * CHALLENGE-C round 4 · probe 1 — the ORACLE GAP.
 *
 * `gradientParse.isColorToken` validates with `parseCssColor().ok`.
 * The render pipeline (`sampleCoalescedStops` → `parseColorIn` → `convertColor`,
 * then `mixColors`) is a DIFFERENT predicate and THROWS on failure.
 * Any token in the gap = an ACCEPTED parse whose model destroys the pane at
 * render time, with `parseVerdict === null`.
 *
 * Also: the `-1` "unspecified position" sentinel vs. an authored negative %.
 *
 * Run: npx vite-node docs/.../probes/challenge-C-r4-oracle-gap.ts
 */
import { parseCssColor } from "@mkbabb/value.js/css";
import { mixColors } from "@mkbabb/value.js/color";
import { parseGradientCSS } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/gradientParse";
import {
    serializeCoalescedGradient,
    serializeRailRamp,
    linearInterval,
} from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientCSS";
import { parseColorIn } from "/Users/mkbabb/Programming/value.js/demo/color-session/color-utils";
import type { GradientModelState } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientModel";

const CANDIDATES = [
    // CSS Color 4 `none` channels — spec-valid, and the model's own space is oklch
    "oklch(none 0.15 145)",
    "oklch(0.7 none 145)",
    "oklch(0.7 0.15 none)",
    "rgb(none 0 0)",
    "hsl(none 50% 50%)",
    "lab(none 20 30)",
    "oklch(0.7 0.15 145 / none)",
    // keywords
    "transparent",
    "currentColor",
    "rebeccapurple",
    // alpha / hex forms
    "#ff000080",
    "rgb(0 0 0 / 50%)",
    // out-of-CSS-picker spaces
    "color(srgb 1 0 0)",
    "color(rec2020 1 0 0)",
    "color(xyz 0.5 0.5 0.5)",
    // extreme numerics
    "oklch(1e400 0.1 90)",
    "oklch(0.5 0.1 1e400)",
    "rgb(1e400 0 0)",
    "hsl(NaN 50% 50%)",
    "oklch(-0 -0 -0)",
    "oklch(99999 99999 99999)",
];

console.log("=== A · the oracle gap: parseCssColor OK, then parseColorIn / mixColors ===");
for (const token of CANDIDATES) {
    let accepted: string;
    try {
        accepted = parseCssColor(token).ok ? "ACCEPTED" : "rejected";
    } catch (e) {
        console.log(`  ${token.padEnd(26)} oracle THREW ${(e as Error).message}`);
        continue;
    }
    if (accepted !== "ACCEPTED") {
        console.log(`  ${token.padEnd(26)} oracle rejected (no gap)`);
        continue;
    }
    // the render pipeline, exactly as sampleCoalescedStops runs it
    let renderVerdict = "renders";
    try {
        const c0 = parseColorIn(token, "oklch");
        const c1 = parseColorIn("oklch(0.65 0.18 265)", "oklch");
        const mixed = mixColors(c0, c1, 0.5, { space: "oklch", hue: "shorter" });
        if (!mixed.ok) renderVerdict = `*** mixColors NOT-OK: ${mixed.error.code} → THROW`;
    } catch (e) {
        renderVerdict = `*** THROWS ${(e as Error).name}: ${(e as Error).message}`;
    }
    console.log(`  ${token.padEnd(26)} oracle=ACCEPTED  render=${renderVerdict}`);
}

console.log("\n=== B · end-to-end: parseGradientCSS accepts, then the render computed throws ===");
const E2E = [
    "linear-gradient(90deg, oklch(none 0.15 145) 0%, oklch(0.65 0.18 265) 100%)",
    "linear-gradient(90deg, rgb(none 0 0) 0%, blue 100%)",
    "linear-gradient(90deg, currentColor 0%, blue 100%)",
    "linear-gradient(90deg, transparent 0%, blue 100%)",
    "linear-gradient(90deg, color(srgb 1 0 0) 0%, blue 100%)",
];
for (const css of E2E) {
    let parsed;
    try {
        parsed = parseGradientCSS(css);
    } catch (e) {
        console.log(`  ${css}\n     parse THREW ${(e as Error).message}`);
        continue;
    }
    if (!parsed.ok) {
        console.log(`  ${css}\n     REJECT: ${parsed.reason}`);
        continue;
    }
    const model: GradientModelState = {
        ...parsed.model,
        interpolationSpace: "oklch",
        hueMethod: "shorter",
    };
    let coal = "ok";
    let rail = "ok";
    try {
        serializeCoalescedGradient(model);
    } catch (e) {
        coal = `*** THROWS ${(e as Error).name}: ${(e as Error).message}`;
    }
    try {
        serializeRailRamp(model);
    } catch (e) {
        rail = `*** THROWS ${(e as Error).name}: ${(e as Error).message}`;
    }
    console.log(`  ${css}\n     parse=OK (verdict null)  coalescedCSS=${coal}  railRampCSS=${rail}`);
}

console.log("\n=== C · the `-1` position sentinel vs. an AUTHORED negative percentage ===");
const NEG = [
    "linear-gradient(90deg, red 0%, green -20%, blue 100%)",
    "linear-gradient(90deg, red 0%, green -0.0001%, blue 100%)",
    "linear-gradient(90deg, red 0%, green -20%, lime -40%, blue 100%)",
    "linear-gradient(90deg, red 0%, green 20%, blue 100%)", // control
    "linear-gradient(90deg, red 0%, green -0%, blue 100%)", // negative zero
    "linear-gradient(90deg, red -50%, blue 100%)", // r2-N6's terminal clamp case
];
for (const css of NEG) {
    const r = parseGradientCSS(css);
    console.log(
        `  ${css}\n     → ${r.ok ? r.model.stops.map((s) => `${s.cssColor}@${s.position}`).join(" ") : "REJECT: " + r.reason}`,
    );
}

console.log("\n=== D · easingFnOf's cache + CSS-timing machinery: reachable? ===");
console.log("  linearInterval().fn is", typeof linearInterval().fn, "→ easingFnOf returns at line 122 always");

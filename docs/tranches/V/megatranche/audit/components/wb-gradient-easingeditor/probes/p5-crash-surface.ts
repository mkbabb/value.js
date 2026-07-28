/**
 * P5 — the full crash surface: which catalogue tiles put an eased sample
 * outside mixColors' declared [0,1] progress domain?
 *  · head ink   → useSpecimenRows: ONE sample at fn(0.5)
 *  · row ramp   → serializeIntervalRamp → sampleCoalescedStops: 33 samples
 *  · render CSS → serializeCoalescedGradient (the PARENT tile): same law
 */
import { bezierPresets, CubicBezier } from "@mkbabb/value.js/easing";
import { serializeIntervalRamp } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import { interpolateStopColors } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
import type { GradientModelState } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientModel";

const rows: string[] = [];
let headCrash = 0, rampCrash = 0;
for (const [name, quad] of Object.entries(bezierPresets)) {
    const r = CubicBezier(...(quad as [number, number, number, number]));
    if (!r.ok) continue;
    const fn = r.value;
    let head = "ok", ramp = "ok";
    try { interpolateStopColors("oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)", fn(0.5), "oklch", "shorter"); }
    catch { head = "CRASH"; headCrash++; }
    const model: GradientModelState = {
        type: "linear", direction: 90,
        stops: [{ id: "a", cssColor: "oklch(0.75 0.15 145)", position: 0 },
                { id: "b", cssColor: "oklch(0.65 0.18 265)", position: 100 }],
        intervals: [{ mode: "bezier", css: `cubic-bezier(${quad.join(", ")})`, fn, points: [...quad] as never, steps: 4, term: "jump-end" }],
        interpolationSpace: "oklch", hueMethod: "shorter",
    };
    try { serializeIntervalRamp(model, 0); } catch { ramp = "CRASH"; rampCrash++; }
    // out-of-domain extent over the 33 samples the ramp law uses
    let lo = Infinity, hi = -Infinity;
    for (let j = 0; j <= 32; j++) { const y = fn(j / 32); lo = Math.min(lo, y); hi = Math.max(hi, y); }
    rows.push(`  ${name.padEnd(20)} head:${head.padEnd(6)} ramp:${ramp.padEnd(6)} eased∈[${lo.toFixed(4)}, ${hi.toFixed(4)}]`);
}
console.log("== catalogue crash surface (2-stop gradient, oklch) ==");
rows.forEach((r) => console.log(r));
console.log(`\nbezier tiles: ${rows.length}  head-ink crashes: ${headCrash}  interval-ramp crashes: ${rampCrash}`);
console.log("\n== the producer's own declared authoring domain ==");
console.log("glass-ui 7 EasingPicker sr-only help: \"Up and Down change y from -0.6 to 1.6\"");
for (const y of [-0.6, 1.6]) {
    const r = CubicBezier(0.5, y, 0.5, y);
    if (!r.ok) continue;
    let lo = Infinity, hi = -Infinity;
    for (let j = 0; j <= 32; j++) { const v = r.value(j / 32); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    console.log(`  cubic-bezier(0.5, ${y}, 0.5, ${y}) eased∈[${lo.toFixed(4)}, ${hi.toFixed(4)}]  -> mixColors domain [0,1] violated: ${lo < 0 || hi > 1}`);
}

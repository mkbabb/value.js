// Challenge-C evidence probe (read-only): what does ONE `update:position` emit
// cost downstream? Times the three computeds the stop editor's drag invalidates.
import {
    serializeCoalescedGradient,
    serializeRailRamp,
    serializeGradient,
    linearInterval,
} from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientCSS";
import type { GradientModelState } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientModel";

function model(n: number): GradientModelState {
    const stops = Array.from({ length: n }, (_, i) => ({
        id: `s${i}`,
        cssColor: i % 2 ? "oklch(0.65 0.18 265)" : "oklch(0.75 0.15 145)",
        position: (i / (n - 1)) * 100,
    }));
    return {
        type: "linear", direction: 90, stops,
        intervals: Array.from({ length: n - 1 }, () => linearInterval()),
        interpolationSpace: "oklch" as never, hueMethod: "shorter" as never,
    };
}
function time(label: string, fn: () => unknown, iters = 500) {
    fn(); // warm
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) fn();
    const ms = (performance.now() - t0) / iters;
    console.log(`${label}: ${ms.toFixed(3)} ms/call`);
    return ms;
}
for (const n of [2, 3, 6]) {
    const m = model(n);
    console.log(`--- ${n} stops ---`);
    const a = time("serializeCoalescedGradient", () => serializeCoalescedGradient(m));
    const b = time("serializeRailRamp        ", () => serializeRailRamp(m));
    const c = time("serializeGradient        ", () => serializeGradient(m));
    console.log(`  per invalidation (all three computeds): ${(a + b + c).toFixed(3)} ms`);
}

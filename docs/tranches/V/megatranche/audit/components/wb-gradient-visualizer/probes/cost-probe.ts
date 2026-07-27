/**
 * Per-tick cost probe — what ONE change to any field of `modelState`
 * (GradientVisualizer.vue:32-49 → useGradientModel.modelState) makes the
 * visualizer's subtree recompute.  Run:
 *   npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/cost-probe.ts
 */
import {
    serializeCoalescedGradient,
    serializeRailRamp,
    serializeIntervalRamp,
    easingFnOf,
} from "../../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import { interpolateStopColors } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
import {
    glyphPath,
    specimenNameFor,
    tileIdFor,
} from "../../../../../../../../demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue";
import type { GradientModelState } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientModel";

const iv = () => ({
    mode: "bezier" as const, css: "cubic-bezier(0, 0, 1, 1)",
    fn: easingFnOf({ css: "cubic-bezier(0, 0, 1, 1)" }),
    points: [0, 0, 1, 1] as [number, number, number, number], steps: 4, term: "jump-end" as const,
});

function modelOf(n: number): GradientModelState {
    const stops = Array.from({ length: n }, (_, i) => ({
        id: `s${i}`, cssColor: i % 2 ? "oklch(0.65 0.18 265)" : "oklch(0.75 0.15 145)",
        position: (i / (n - 1)) * 100,
    }));
    return {
        type: "linear", direction: 90, stops,
        intervals: Array.from({ length: n - 1 }, iv),
        interpolationSpace: "oklch", hueMethod: "shorter",
    };
}

// the useSpecimenRows body, minus the contrast certification (browser-only canvas)
function specimenRows(model: GradientModelState) {
    const rows = [];
    for (let i = 0; i < model.intervals.length; i++) {
        const s0 = model.stops[i]!, s1 = model.stops[i + 1]!, interval = model.intervals[i]!;
        const fn = easingFnOf(interval);
        const mid = interpolateStopColors(s0.cssColor, s1.cssColor, fn(0.5),
            model.interpolationSpace, model.hueMethod);
        rows.push({ css: interval.css, name: specimenNameFor(interval), glyph: glyphPath(fn), tileId: tileIdFor(interval), mid });
    }
    return rows;
}

const time = (label: string, f: () => unknown, n = 400) => {
    for (let i = 0; i < 30; i++) f();
    const t0 = performance.now();
    for (let i = 0; i < n; i++) f();
    const ms = (performance.now() - t0) / n;
    console.log(`  ${label.padEnd(34)} ${ms.toFixed(3)} ms`);
    return ms;
};

for (const n of [2, 4, 8]) {
    const m = modelOf(n);
    console.log(`\n== ${n} stops ==`);
    const a = time("coalescedCSS (render tile)", () => serializeCoalescedGradient(m));
    const b = time("railRampCSS (editing rail)", () => serializeRailRamp(m));
    const c = time("specimenRows (easing heads)", () => specimenRows(m));
    const d = time("openIntervalRamp (open row)", () => serializeIntervalRamp(m, 0));
    console.log(`  ${"ONE modelState tick".padEnd(34)} ${(a + b + c + d).toFixed(3)} ms`);
    console.log(`  ${"…doubled by the bar+handle emit".padEnd(34)} ${((a + b + c + d) * 2).toFixed(3)} ms`);
    console.log(`  inline style bytes written per tick: tile ${serializeCoalescedGradient(m).length + 16} · rail ${serializeRailRamp(m).length + 14}`);
}

console.log("\n== is any of that work invariant to the field that triggered it? ==");
const base = modelOf(4);
const turned = { ...base, direction: 271 };
console.log(`railRampCSS  same at 90deg and 271deg? ${serializeRailRamp(base) === serializeRailRamp(turned)}`);
console.log(`specimenRows same at 90deg and 271deg? ${JSON.stringify(specimenRows(base)) === JSON.stringify(specimenRows(turned))}`);
console.log(`intervalRamp same at 90deg and 271deg? ${serializeIntervalRamp(base, 0) === serializeIntervalRamp(turned, 0)}`);

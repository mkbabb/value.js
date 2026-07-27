/**
 * Direction/type probe — is the Direction slider (GradientVisualizer.vue:232)
 * connected to anything the render tile paints, for every Type the Type select
 * offers?  Run:
 *   npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/direction-probe.ts
 */
import {
    serializeCoalescedGradient,
    serializeGradient,
    serializeRailRamp,
    easingFnOf,
} from "../../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import { parseGradientCSS } from "../../../../../../../../demo/workbenches/gradient/composables/gradientParse";
import type { GradientModelState } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientModel";

const model = (type: GradientModelState["type"], direction: number): GradientModelState => ({
    type,
    direction,
    stops: [
        { id: "a", cssColor: "red", position: 0 },
        { id: "b", cssColor: "blue", position: 100 },
    ],
    intervals: [{
        mode: "bezier", css: "cubic-bezier(0, 0, 1, 1)",
        fn: easingFnOf({ css: "cubic-bezier(0, 0, 1, 1)" }),
        points: [0, 0, 1, 1], steps: 4, term: "jump-end",
    }],
    interpolationSpace: "oklch",
    hueMethod: "shorter",
});

console.log("== does the Direction slider change the render tile? ==");
for (const type of ["linear", "radial", "conic"] as const) {
    const a = serializeCoalescedGradient(model(type, 0));
    const b = serializeCoalescedGradient(model(type, 270));
    console.log(`${type.padEnd(7)} 0deg vs 270deg identical? ${a === b}   head: ${b.slice(0, 46)}…`);
}

console.log("\n== does the Direction slider change the editing rail? ==");
for (const type of ["linear", "radial", "conic"] as const) {
    const a = serializeRailRamp(model(type, 0));
    const b = serializeRailRamp(model(type, 270));
    console.log(`${type.padEnd(7)} identical? ${a === b}`);
}

console.log("\n== radial round-trip through the editor's own text ==");
const radial = model("radial", 137);
const text = serializeGradient(radial);
console.log(`simpleCSS shown for radial @137deg: ${text}`);
const back = parseGradientCSS(text);
console.log(`re-parsed direction: ${back.ok ? back.model.direction : `reject: ${back.reason}`} (authored 137)`);

console.log("\n== linear at exactly 180deg ==");
console.log(`simpleCSS: ${serializeGradient(model("linear", 180))}`);
console.log(`re-parsed: ${(() => { const r = parseGradientCSS(serializeGradient(model("linear", 180))); return r.ok ? r.model.direction : r.reason; })()}`);

console.log("\n== domain-boundary directions the slider cannot reach but the editor can ==");
for (const css of [
    "linear-gradient(-90deg, red, blue)",
    "linear-gradient(1e6deg, red, blue)",
    "linear-gradient(NaNdeg, red, blue)",
    "linear-gradient(0.25turn, red, blue)",
]) {
    try {
        const r = parseGradientCSS(css);
        console.log(`${css.padEnd(38)} → ${r.ok ? `direction=${r.model.direction}` : `reject: ${r.reason}`}`);
    } catch (e) {
        console.log(`${css.padEnd(38)} → THREW ${(e as Error).message}`);
    }
}

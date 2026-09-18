/**
 * CHALLENGE-C probe for GradientVisualizer.vue — run headless with vite-node:
 *   npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/visualizer-probe.ts
 *
 * Every assertion here mirrors a code path the VISUALIZER owns (its handlers,
 * its exposed actions, its template bindings). Nothing is mutated in src/ or
 * demo/ — this file only imports and calls.
 */
import { nextTick } from "vue";
import { useGradientModel } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientModel";
import {
    serializeGradient,
    serializeCoalescedGradient,
    serializeRailRamp,
    easingFnOf,
} from "../../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import { interpolateStopColors } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientInterpolation";
import { parseGradientCSS } from "../../../../../../../../demo/workbenches/gradient/composables/gradientParse";
import type { GradientModelState } from "../../../../../../../../demo/workbenches/gradient/composables/useGradientModel";

const line = (s: string) => console.log(s);
const hr = (t: string) => line(`\n===== ${t} =====`);

const stepsInterval = {
    mode: "steps" as const,
    css: "steps(4, jump-end)",
    fn: undefined as never,
    points: [0, 0, 1, 1] as [number, number, number, number],
    steps: 4,
    term: "jump-end" as const,
};
// The picker payload always carries a live `fn`; build it from the css literal
// exactly the way `easingFnOf` would.
const steps4 = { ...stepsInterval, fn: easingFnOf({ css: "steps(4, jump-end)" }) };
const easeInOut = {
    mode: "bezier" as const,
    css: "cubic-bezier(0.42, 0, 0.58, 1)",
    fn: easingFnOf({ css: "cubic-bezier(0.42, 0, 0.58, 1)" }),
    points: [0.42, 0, 0.58, 1] as [number, number, number, number],
    steps: 4,
    term: "jump-end" as const,
};

// ── P1: resetGradient (GradientVisualizer.vue:118-125) does not reset easing ──
async function p1() {
    hr("P1 — resetGradient leaves an authored easing curve in place");
    const m = useGradientModel();
    m.updateInterval(0, steps4);
    await nextTick();
    line(`before reset: stops=${m.stops.value.length} interval[0].css=${m.intervals.value[0]!.css}`);
    // verbatim body of GradientVisualizer.resetGradient()
    m.setStopsFromColors(["oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)"]);
    m.type.value = "linear";
    m.direction.value = 90;
    m.interpolationSpace.value = "oklch";
    m.hueMethod.value = "shorter";
    await nextTick();
    line(`after  reset: stops=${m.stops.value.length} interval[0].css=${m.intervals.value[0]!.css}`);
    line(`RESET RESTORED THE linear SEED? ${m.intervals.value[0]!.css === "cubic-bezier(0, 0, 1, 1)"}`);
    line(`coalesced after reset: ${serializeCoalescedGradient(m.modelState.value).slice(0, 110)}…`);
}

// ── P2: a mid-ramp add re-hosts every downstream authored curve ──
async function p2() {
    hr("P2 — onAddStop re-hosts authored curves (index-keyed intervals)");
    const m = useGradientModel();
    m.addStop("lime", 50);
    await nextTick();
    m.updateInterval(0, easeInOut);
    m.updateInterval(1, steps4);
    await nextTick();
    line(`before: ${m.stops.value.map((s) => s.position).join(",")} → ${m.intervals.value.map((i) => i.css).join(" | ")}`);
    m.addStop("red", 25); // the visualizer's onAddStop path
    await nextTick();
    line(`after:  ${m.stops.value.map((s) => s.position).join(",")} → ${m.intervals.value.map((i) => i.css).join(" | ")}`);
    line("interval that was 50→100 (steps) now covers: " +
        `${m.stops.value[1]!.position}→${m.stops.value[2]!.position}`);
}

// ── P3: the drag path breaks the ordering invariant the parser enforces ──
async function p3() {
    hr("P3 — onStopPositionUpdate emits CSS the app's own parser rejects");
    const m = useGradientModel();
    m.addStop("lime", 50);
    await nextTick();
    const firstId = m.stops.value[0]!.id;
    m.updateStop(firstId, { position: 70 }); // the visualizer's drag handler
    await nextTick();
    const simple = serializeGradient(m.modelState.value);
    line(`positions: ${m.stops.value.map((s) => s.position).join(",")}`);
    line(`simpleCSS (what the editor shows): ${simple}`);
    const re = parseGradientCSS(simple);
    line(`re-parse of the app's own output: ${re.ok ? "ok" : `REJECTED — ${re.reason}`}`);
    const rail = serializeRailRamp(m.modelState.value);
    const positions = [...rail.matchAll(/ (\d+\.\d\d)%/g)].map((x) => Number(x[1]));
    let inversions = 0;
    for (let i = 1; i < positions.length; i++) if (positions[i]! < positions[i - 1]!) inversions++;
    line(`rail sub-stop positions: ${positions.length} samples, ${inversions} DECREASING steps`);
    line(`rail head: ${rail.slice(0, 120)}…`);

    // colorAtPosition (GradientVisualizer.vue:64-88) verbatim, against this state
    const colorAtPosition = (position: number): string => {
        const list = m.stops.value;
        if (list.length === 0) throw new Error("A gradient must retain at least one stop");
        if (position <= list[0]!.position) return list[0]!.cssColor;
        const last = list[list.length - 1]!;
        if (position >= last.position) return last.cssColor;
        for (let i = 0; i < list.length - 1; i++) {
            const s0 = list[i]!;
            const s1 = list[i + 1]!;
            if (position < s0.position || position > s1.position) continue;
            const span = s1.position - s0.position;
            const t = span > 0 ? (position - s0.position) / span : 0;
            const interval = m.intervals.value[i];
            if (!interval) throw new Error(`Gradient interval ${i} is missing`);
            const easedT = easingFnOf(interval)(t);
            return interpolateStopColors(s0.cssColor, s1.cssColor, easedT,
                m.interpolationSpace.value, m.hueMethod.value);
        }
        throw new Error(`No gradient interval contains ${position}%`);
    };
    line(`ghost/add color the visualizer mints at 60%: ${colorAtPosition(60)}`);
    line(`(the rail at 60% paints the CLAMPED slab colour — see the decreasing steps above)`);
}

// ── P4: the Hue control is inert in every non-polar space ──
function p4() {
    hr("P4 — the Hue select is a dead control in non-polar spaces");
    const base = (space: string, hue: string): GradientModelState => ({
        type: "linear",
        direction: 90,
        stops: [
            { id: "a", cssColor: "red", position: 0 },
            { id: "b", cssColor: "blue", position: 100 },
        ],
        intervals: [{ mode: "bezier", css: "cubic-bezier(0, 0, 1, 1)", fn: easingFnOf({ css: "cubic-bezier(0, 0, 1, 1)" }), points: [0, 0, 1, 1], steps: 4, term: "jump-end" }],
        interpolationSpace: space as GradientModelState["interpolationSpace"],
        hueMethod: hue as GradientModelState["hueMethod"],
    });
    for (const space of ["oklch", "lch", "hsl", "oklab", "lab", "rgb", "xyz"]) {
        const a = serializeCoalescedGradient(base(space, "shorter"));
        const b = serializeCoalescedGradient(base(space, "longer"));
        line(`${space.padEnd(6)} shorter===longer ? ${a === b}`);
    }
}

// ── P5: what Copy actually puts on the clipboard vs what the editor shows ──
function p5() {
    hr("P5 — copyCSS copies a different string from the one on screen");
    const m = useGradientModel();
    const simple = serializeGradient(m.modelState.value);
    const coalesced = serializeCoalescedGradient(m.modelState.value);
    line(`editor shows (simpleCSS, ${simple.length} chars): ${simple}`);
    line(`clipboard gets (coalescedCSS, ${coalesced.length} chars): ${coalesced.slice(0, 140)}…`);
    line(`identical? ${simple === coalesced}`);
}

// ── P6: cost of ONE model tick (what a single pointermove pays) ──
async function p6() {
    hr("P6 — cost of one recompute of the visualizer's CSS computeds");
    const m = useGradientModel();
    const model = m.modelState.value;
    const N = 300;
    for (let i = 0; i < 20; i++) { serializeCoalescedGradient(model); serializeRailRamp(model); }
    let t0 = performance.now();
    for (let i = 0; i < N; i++) serializeCoalescedGradient(model);
    const coalesced = (performance.now() - t0) / N;
    t0 = performance.now();
    for (let i = 0; i < N; i++) serializeRailRamp(model);
    const rail = (performance.now() - t0) / N;
    line(`2 stops: coalescedCSS ${coalesced.toFixed(3)} ms · railRampCSS ${rail.toFixed(3)} ms · sum ${(coalesced + rail).toFixed(3)} ms`);

    m.addStop("lime", 33);
    await nextTick();
    m.addStop("gold", 66);
    await nextTick();
    line(`(synchronous read straight after addStop, before the interval watcher flushes:)`);
    try {
        m.addStop("cyan", 80);
        serializeCoalescedGradient(m.modelState.value);
        line("  no throw");
    } catch (e) {
        line(`  THREW ${(e as Error).message}`);
    }
    await nextTick();
    const model4 = m.modelState.value;
    t0 = performance.now();
    for (let i = 0; i < N; i++) { serializeCoalescedGradient(model4); serializeRailRamp(model4); }
    const four = (performance.now() - t0) / N;
    line(`4 stops: coalesced+rail ${four.toFixed(3)} ms  (×2 for the duplicated pointermove emit = ${(four * 2).toFixed(3)} ms)`);
}

// ── P7: the parse path the visualizer treats as total ──
async function p7() {
    hr("P7 — applyCSS is not total: parseGradientCSS THROWS on some input");
    for (const css of [
        "linear-gradient(90deg, oklch(), blue)",
        "linear-gradient(90deg, rgb(), blue)",
        "linear-gradient(90deg, color(), blue)",
    ]) {
        try {
            const r = parseGradientCSS(css);
            line(`${css} → ${r.ok ? "ok" : `reject: ${r.reason}`}`);
        } catch (e) {
            line(`${css} → THREW ${(e as Error).name}: ${(e as Error).message}`);
        }
    }
}

// ── P8: unvalidated palette seed (seedFromPalette → setStopsFromColors) ──
async function p8() {
    hr("P8 — seedFromPalette accepts any string; the render computeds then throw");
    const m = useGradientModel();
    m.setStopsFromColors(["#112233", "not-a-color"]); // a palette row with bad css
    await nextTick();
    try {
        line(serializeCoalescedGradient(m.modelState.value).slice(0, 80));
    } catch (e) {
        line(`coalescedCSS computed THREW ${(e as Error).name}: ${(e as Error).message}`);
    }
    const m2 = useGradientModel();
    m2.setStopsFromColors(["#112233"]); // a 1-colour palette
    await nextTick();
    line(`1-colour seed → stops=${m2.stops.value.length} intervals=${m2.intervals.value.length}`);
}

// ── P9: id minting — two counters, one shape ──
function p9() {
    hr("P9 — stop ids come from two independent counters with the same shape");
    const m = useGradientModel();
    line(`model-minted: ${m.stops.value.map((s) => s.id).join(", ")}`);
    const parsed = parseGradientCSS("linear-gradient(90deg, red, blue)");
    if (parsed.ok) line(`parser-minted: ${parsed.model.stops.map((s) => s.id).join(", ")}`);
}

await p1();
await p2();
await p3();
p4();
p5();
await p6();
await p7();
await p8();
p9();

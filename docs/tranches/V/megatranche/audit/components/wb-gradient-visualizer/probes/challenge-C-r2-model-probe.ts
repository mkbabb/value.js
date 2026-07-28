/* eslint-disable no-console */
import { nextTick } from "vue";
import { useGradientModel } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientModel";
import { parseGradientCSS } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/gradientParse";
import {
    serializeGradient,
    serializeCoalescedGradient,
    serializeRailRamp,
    easingFnOf,
} from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientCSS";
import { interpolateStopColors } from "/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/composables/useGradientInterpolation";

function hr(s: string) {
    console.log("\n========== " + s + " ==========");
}

// Verbatim copy of GradientVisualizer.vue:64-88 colorAtPosition, parameterised.
function colorAtPosition(m: any, position: number): string {
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
        return interpolateStopColors(
            s0.cssColor,
            s1.cssColor,
            easedT,
            m.interpolationSpace.value,
            m.hueMethod.value,
        );
    }
    throw new Error(`No gradient interval contains ${position}%`);
}

async function main() {
    // ── R1: seedFromPalette with >2 colors — synchronous read of coalescedCSS ──
    hr("R1  setStopsFromColors(5) then SYNCHRONOUS coalescedCSS read");
    {
        const m = useGradientModel();
        m.setStopsFromColors(["red", "orange", "yellow", "green", "blue"]);
        console.log("stops:", m.stops.value.length, "intervals:", m.intervals.value.length);
        try {
            const css = m.coalescedCSS.value;
            console.log("coalescedCSS OK:", css.slice(0, 60));
        } catch (e: any) {
            console.log("THROW (sync):", e.message);
        }
        await nextTick();
        console.log("after nextTick intervals:", m.intervals.value.length);
        try {
            console.log("coalescedCSS OK now:", m.coalescedCSS.value.slice(0, 60));
        } catch (e: any) {
            console.log("STILL THROWS:", e.message);
        }
    }

    // ── R2: drag a middle stop past its neighbour (updateStop never re-sorts) ──
    hr("R2  drag stop 2 from 33% to 90% (past stop 3 at 66%)");
    {
        const m = useGradientModel();
        m.setStopsFromColors(["red", "lime", "blue", "black"]);
        await nextTick();
        const ids = m.stops.value.map((s) => s.id);
        console.log("before:", m.stops.value.map((s) => `${s.cssColor}@${s.position}`).join(" "));
        m.updateStop(ids[1]!, { position: 90 });
        await nextTick();
        console.log("after :", m.stops.value.map((s) => `${s.cssColor}@${s.position}`).join(" "));
        const simple = m.simpleCSS.value;
        console.log("simpleCSS  :", simple);
        const rt = parseGradientCSS(simple);
        console.log("re-parse of our OWN simpleCSS:", rt.ok ? "ok" : `REJECT → ${rt.reason}`);
        const rail = m.railRampCSS.value;
        console.log("railRampCSS:", rail.slice(0, 200), "...");
        const pcts = [...rail.matchAll(/([\d.]+)%/g)].map((x) => Number(x[1]));
        let desc = 0;
        for (let i = 1; i < pcts.length; i++) if (pcts[i]! < pcts[i - 1]!) desc++;
        console.log("rail stop-% count:", pcts.length, "descending transitions:", desc);
        console.log("rail % range:", Math.min(...pcts), "→", Math.max(...pcts));
    }

    // ── R3: brute force a colorAtPosition throw over drag-reachable states ──
    hr("R3  brute-force colorAtPosition('No gradient interval contains') ");
    {
        const m = useGradientModel();
        m.setStopsFromColors(["red", "lime", "blue", "black"]);
        await nextTick();
        const ids = m.stops.value.map((s) => s.id);
        let found: any = null;
        outer: for (const a of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
            for (const b of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
                for (const c of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
                    for (const d of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
                        m.stops.value = m.stops.value.map((s, i) => ({
                            ...s,
                            position: [a, b, c, d][i]!,
                        }));
                        for (let p = 0; p <= 100; p += 0.5) {
                            try {
                                colorAtPosition(m, p);
                            } catch (e: any) {
                                found = { positions: [a, b, c, d], p, msg: e.message };
                                break outer;
                            }
                        }
                    }
        console.log(found ? JSON.stringify(found) : "no throw found over 4-stop grid");
        void ids;
    }

    // ── R4: interval identity migrates when a stop is removed from the middle ──
    hr("R4  authored easing on interval 2, then remove stop 0 → identity drift");
    {
        const m = useGradientModel();
        m.setStopsFromColors(["red", "lime", "blue", "black"]);
        await nextTick();
        m.updateInterval(2, {
            mode: "bezier",
            css: "cubic-bezier(0.9, 0, 0.1, 1)",
            fn: undefined as any,
            points: [0.9, 0, 0.1, 1],
            steps: 4,
            term: "jump-end",
        } as any);
        await nextTick();
        console.log("intervals before:", m.intervals.value.map((i) => i.css));
        m.removeStop(m.stops.value[0]!.id);
        await nextTick();
        console.log("stops after     :", m.stops.value.map((s) => s.cssColor).join(","));
        console.log("intervals after :", m.intervals.value.map((i) => i.css));
    }

    // ── R5: addStop in the middle — new interval appended at the END ──
    hr("R5  authored easing on interval 0, then add a stop at 50% → drift");
    {
        const m = useGradientModel();
        m.updateInterval(0, {
            mode: "bezier",
            css: "cubic-bezier(0.9, 0, 0.1, 1)",
            points: [0.9, 0, 0.1, 1],
            steps: 4,
            term: "jump-end",
        } as any);
        await nextTick();
        console.log("intervals before:", m.intervals.value.map((i) => i.css));
        m.addStop("teal", 50);
        await nextTick();
        console.log("stops after     :", m.stops.value.map((s) => `${s.cssColor}@${s.position}`).join(" "));
        console.log("intervals after :", m.intervals.value.map((i) => i.css));
    }

    // ── R6: domain-boundary + malformed input through the parser path ──
    hr("R6  parser boundary probes (applyCSS reason strings)");
    {
        const cases = [
            "linear-gradient(NaNdeg, red, blue)",
            "linear-gradient(1e400deg, red, blue)",
            "linear-gradient(-0deg, red, blue)",
            "linear-gradient(red, blue",
            "linear-gradient()",
            "linear-gradient(red)",
            "linear-gradient(90deg, oklch(), blue)",
            "linear-gradient(90deg, color(display-p3 1 0 0), blue)",
            "linear-gradient(90deg, red 1e400%, blue)",
            "linear-gradient(90deg, red -50%, blue 300%)",
            "linear-gradient(90deg, rgb(255 0 0 / 50%), blue)",
            "linear-gradient(in oklch, red, blue)",
            "conic-gradient(red, blue)",
            "linear-gradient(90deg, red, color-mix(in oklch, red, blue))",
        ];
        for (const c of cases) {
            let r: any;
            try {
                r = parseGradientCSS(c);
            } catch (e: any) {
                console.log(`  ${c}\n     → THREW: ${e.message}`);
                continue;
            }
            console.log(
                `  ${c}\n     → ${r.ok ? "OK dir=" + r.model.direction + " stops=" + r.model.stops.map((s: any) => s.cssColor + "@" + s.position).join(",") : "reject: " + r.reason}`,
            );
        }
    }

    // ── R7: does a huge / NaN direction survive into the render string? ──
    hr("R7  direction domain boundary → serializer output");
    {
        for (const d of [0, -0, 360, 1e21, Number.NaN, Number.POSITIVE_INFINITY]) {
            const model: any = {
                type: "linear",
                direction: d,
                stops: [
                    { id: "a", cssColor: "red", position: 0 },
                    { id: "b", cssColor: "blue", position: 100 },
                ],
                intervals: [
                    { mode: "bezier", css: "cubic-bezier(0, 0, 1, 1)", points: [0, 0, 1, 1], steps: 4, term: "jump-end" },
                ],
                interpolationSpace: "oklch",
                hueMethod: "shorter",
            };
            try {
                console.log(`  direction=${String(d)} → ${serializeGradient(model).slice(0, 44)}`);
            } catch (e: any) {
                console.log(`  direction=${String(d)} → THREW ${e.message}`);
            }
        }
        void serializeCoalescedGradient;
        void serializeRailRamp;
    }
}

main().catch((e) => {
    console.error("FATAL", e);
    process.exit(1);
});

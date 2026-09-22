// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W6 · X.W6.a (CC-058 · MT-GRADSTOP-1 r3) — THE GRADIENT MODEL'S EXECUTABLE
 * OWNER.
 *
 * Before this file the model had no runtime test at all: its only reference
 * anywhere under `test/` was a TYPE import, so deleting the sort — or setting
 * the rail's axis inset to zero — left every assertion in the repository green
 * (GRADSTOP-A §13, the vacuous-suite finding). Each `describe` below names the
 * mutation it exists to catch.
 *
 * The two laws under test land together (GRADSTOP-A §14) and are tested
 * together, because neither is safe alone:
 *
 *   NORMALISE ON WRITE — `setStopPosition` is the sole position mutator and
 *   re-sorts, so the model can never serialize CSS its own parser rejects.
 *   Equality stays LEGAL: coincident positions are CSS hard stops and
 *   `gradientParse` admits them with `<`, never `<=`.
 *
 *   STOP-OWNED EASING — a curve hangs on the stop that OPENS its interval, so
 *   a re-sort or an insert cannot re-pair it onto a neighbouring span.
 */

import { describe, expect, it } from "vitest";
import { useGradientModel } from "../demo/workbenches/gradient/composables/useGradientModel";
import { parseGradientCSS } from "../demo/workbenches/gradient/composables/gradientParse";
import {
    formatColorLiteral,
    railPosition,
    serializeGradient,
    serializeRailRamp,
} from "../demo/workbenches/gradient/composables/useGradientCSS";
import {
    easingFnOf,
    sampleAt,
    sampleCoalescedStops,
} from "../demo/workbenches/gradient/model/sample";

const GREEN = "oklch(0.75 0.15 145)";
const BLUE = "oklch(0.65 0.18 265)";
const RED = "oklch(0.62 0.22 27)";

/** A complete authored payload — the shape <EasingPicker> emits, `fn` and all. */
const STEPS = {
    mode: "steps" as const,
    css: "steps(4, jump-end)",
    fn: easingFnOf({ css: "steps(4, jump-end)" }),
    points: [0, 0, 1, 1] as [number, number, number, number],
    steps: 4,
    term: "jump-end" as const,
};

/** Positions in ordinal order — the model's whole shape, in one line. */
const positionsOf = (m: ReturnType<typeof useGradientModel>) =>
    m.stops.value.map((s) => s.position);

const curvesOf = (m: ReturnType<typeof useGradientModel>) =>
    m.stops.value.map((s) => s.easing.css);

describe("the model cannot serialize CSS its own parser rejects", () => {
    // The falsifier: delete `.sort()` from `setStopPosition` and every
    // assertion in this block reds.

    it("re-parses its own output after a drag PAST both neighbours", () => {
        const m = useGradientModel();
        m.addStop(RED, 50);
        expect(positionsOf(m)).toEqual([0, 50, 100]);

        // The exact live drag the adjudication recorded: the leftmost handle
        // dragged to 74.9%, which serialized `… 74.9%, … 50%, … 100%` — a
        // string the model's own parser rejected as non-decreasing.
        const leftmost = m.stops.value[0]!.id;
        m.setStopPosition(leftmost, 74.9);

        expect(positionsOf(m)).toEqual([50, 74.9, 100]);
        const css = m.simpleCSS.value;
        expect(css).toContain("74.9%");
        const reparsed = parseGradientCSS(css);
        expect(reparsed.ok, reparsed.ok ? "" : reparsed.reason).toBe(true);
    });

    it("re-parses after EVERY write of a crossing sweep, in both directions", () => {
        const m = useGradientModel();
        m.addStop(RED, 40);
        m.addStop(GREEN, 70);

        const rejected: string[] = [];
        for (const target of [95, 3, 70, 0, 100, 42.5, 12.3, 88.8, 50, 50]) {
            // Always move the CURRENTLY leftmost stop, so the sweep crosses
            // every neighbour in turn, in both directions.
            m.setStopPosition(m.stops.value[0]!.id, target);
            const css = m.simpleCSS.value;
            const verdict = parseGradientCSS(css);
            if (!verdict.ok) rejected.push(`${verdict.reason}  <<  ${css}`);
        }
        expect(rejected).toEqual([]);
    });

    it("keeps positions non-decreasing after add, remove and move alike", () => {
        const m = useGradientModel();
        m.addStop(RED, 80);
        m.addStop(BLUE, 20);
        m.setStopPosition(m.stops.value[2]!.id, 5);
        m.removeStop(m.stops.value[0]!.id);

        const positions = positionsOf(m);
        const sorted = [...positions].sort((a, b) => a - b);
        expect(positions).toEqual(sorted);
    });
});

describe("the sole mutator REORDERS, it never clamps (the D-8 refusal species)", () => {
    // The falsifier: clamp `setStopPosition` to its neighbours and the drag
    // below silently lands at 50 instead of 90 — a deleted gesture wearing a
    // green gate.

    it("a drag across a neighbour keeps every stop and lands where it was aimed", () => {
        const m = useGradientModel();
        m.addStop(RED, 50);
        const dragged = m.stops.value[0]!.id;

        m.setStopPosition(dragged, 90);

        expect(m.stops.value).toHaveLength(3);
        expect(m.stops.value.find((s) => s.id === dragged)!.position).toBe(90);
        expect(positionsOf(m)).toEqual([50, 90, 100]);
    });

    it("EQUALITY IS LEGAL: coincident stops survive, in build order", () => {
        // A CSS hard stop IS two coincident positions. A minimum-separation
        // rule would delete the capability outright (GRADSTOP-A §15).
        const m = useGradientModel();
        m.addStop(RED, 30);
        const [left, mid] = [m.stops.value[0]!.id, m.stops.value[1]!.id];

        m.setStopPosition(mid, 60);
        m.setStopPosition(left, 60);

        expect(positionsOf(m)).toEqual([60, 60, 100]);
        // The sort is STABLE, so a tie is broken by the seat each stop already
        // held: `left` wrote itself onto `mid`'s position from the seat before
        // it and keeps that seat. Deterministic, and no stop is lost to the
        // tie — which is the whole capability a `<=` comparison would delete.
        expect(m.stops.value[0]!.id).toBe(left);
        expect(m.stops.value[1]!.id).toBe(mid);
        const verdict = parseGradientCSS(m.simpleCSS.value);
        expect(verdict.ok, verdict.ok ? "" : verdict.reason).toBe(true);
    });
});

describe("an authored easing never migrates", () => {
    // The falsifier: key easings by interval index again (or splice one in at
    // an insert) and the curve re-pairs onto the neighbouring span.

    it("survives an insert BEFORE the interval it was authored on", () => {
        const m = useGradientModel();
        m.addStop(RED, 50); // → 0, 50, 100
        const opener = m.stops.value[1]!.id; // the stop that opens 50 → 100
        m.setStopEasing(opener, STEPS);
        expect(curvesOf(m)).toEqual([
            "cubic-bezier(0, 0, 1, 1)",
            "steps(4, jump-end)",
            "cubic-bezier(0, 0, 1, 1)",
        ]);

        m.addStop(BLUE, 25); // → 0, 25, 50, 100

        expect(positionsOf(m)).toEqual([0, 25, 50, 100]);
        // The curve is still on the stop at 50, i.e. still on 50 → 100; the
        // minted 25 → 50 interval opens `linear`. Keyed by index it would have
        // re-attached to 25 → 50.
        expect(m.stops.value.find((s) => s.id === opener)!.position).toBe(50);
        expect(curvesOf(m)).toEqual([
            "cubic-bezier(0, 0, 1, 1)",
            "cubic-bezier(0, 0, 1, 1)",
            "steps(4, jump-end)",
            "cubic-bezier(0, 0, 1, 1)",
        ]);
    });

    it("travels WITH its stop across a reordering drag", () => {
        const m = useGradientModel();
        m.addStop(RED, 50);
        const opener = m.stops.value[0]!.id; // opens 0 → 50
        m.setStopEasing(opener, STEPS);

        m.setStopPosition(opener, 75); // now opens 75 → 100

        expect(positionsOf(m)).toEqual([50, 75, 100]);
        expect(m.stops.value[1]!.id).toBe(opener);
        expect(m.stops.value[1]!.easing.css).toBe("steps(4, jump-end)");
    });

    it("every stop carries a curve after every mutator", () => {
        const m = useGradientModel();
        m.addStop(RED, 60);
        m.setStopPosition(m.stops.value[0]!.id, 90);
        m.setStopColor(m.stops.value[0]!.id, BLUE);
        m.removeStop(m.stops.value[1]!.id);
        expect(m.stops.value.every((s) => typeof s.easing.css === "string")).toBe(true);

        const applied = m.applyCSS("linear-gradient(45deg, red, lime 30%, blue)");
        expect(applied.ok).toBe(true);
        expect(m.stops.value.every((s) => typeof s.easing.css === "string")).toBe(true);
    });
});

describe("ONE axis: the rail ramp and the handle map are one expression", () => {
    // The falsifier: change either side's map — the old `HANDLE_HALF` literal
    // is exactly this mutation — and the ramp paints an ordinal at a pixel
    // where no handle sits.

    it("the rail ramp places every stop at that stop's own handle expression", () => {
        const m = useGradientModel();
        m.addStop(RED, 25);
        const ramp = m.railRampCSS.value;

        for (const stop of m.stops.value) {
            expect(ramp).toContain(railPosition(stop.position / 100));
        }
        // X-W6 · X.W6.c: the strip carries the model's ` in <space>` clause.
        expect(ramp).toMatch(/^linear-gradient\(90deg in oklch, /);
    });

    it("the map reads the rail's own custom properties, never a px literal", () => {
        expect(railPosition(0)).toBe("calc(var(--rail-inset) + var(--rail-track) * 0)");
        expect(railPosition(1)).toBe("calc(var(--rail-inset) + var(--rail-track) * 1)");
        expect(railPosition(0.749)).toContain("* 0.749");
    });
});

describe("setStopsFromColors is validated by the shipped parseCssColor oracle", () => {
    // X-W9's cure made `parseCssColor("oklch()")` RETURN `{ok:false,…}` where
    // it once threw. The consumer branches on that shape — there is no
    // `try`/`catch` here and there must never be one (the masking-fallback
    // ban): a wrapped defect is a defect nobody can see.

    it("refuses an unparseable literal and leaves the model untouched", () => {
        const m = useGradientModel();
        const before = m.stops.value;

        const verdict = m.setStopsFromColors(["oklch()", "blue"]);

        expect(verdict.ok).toBe(false);
        expect(verdict.ok === false && verdict.reason).toContain("oklch()");
        expect(m.stops.value).toBe(before);
    });

    it("refuses a one-colour seed — a gradient needs two stops", () => {
        const m = useGradientModel();
        const verdict = m.setStopsFromColors([GREEN]);
        expect(verdict.ok).toBe(false);
        expect(verdict.ok === false && verdict.reason).toMatch(/at least 2/);
    });

    it("applies a valid seed, evenly spaced, each stop carrying `linear`", () => {
        const m = useGradientModel();
        const verdict = m.setStopsFromColors([GREEN, RED, BLUE]);

        expect(verdict.ok).toBe(true);
        expect(positionsOf(m)).toEqual([0, 50, 100]);
        expect(curvesOf(m).every((css) => css === "cubic-bezier(0, 0, 1, 1)")).toBe(true);
        const round = parseGradientCSS(serializeGradient(m.modelState.value));
        expect(round.ok, round.ok ? "" : round.reason).toBe(true);
    });
});

/**
 * X-W6 · X.W6.c — c2. "The colour of this ramp at p" has ONE implementation:
 * the add ghost and the caret sample through `sampleAt`, the rail paints
 * `sampleCoalescedStops`, and both go through the same interval law. Mutation
 * each case catches: re-introducing a second sampler (an exact walk beside the
 * discretised one) diverges at a sub-stop; dropping the curve from either path
 * diverges on the `steps()` interval; mis-owning the zero-span interval at a
 * hard stop paints the wrong side of the edge.
 */
describe("one sampling law", () => {
    it("the ghost's sampler and the rail's sub-stops agree at every sample", () => {
        const m = useGradientModel();
        m.addStop(RED, 40);
        m.hueMethod.value = "longer";
        m.setStopEasing(m.stops.value[1]!.id, STEPS);
        const model = m.modelState.value;

        const samples = sampleCoalescedStops(model);
        expect(samples.length).toBeGreaterThan(8);
        const ramp = serializeRailRamp(model);
        for (const { position, color } of samples) {
            const ghost = formatColorLiteral(sampleAt(model, position));
            expect(ghost).toBe(formatColorLiteral(color));
            // …and it is the literal the rail PAINTS at that ordinal.
            expect(ramp).toContain(`${ghost} ${railPosition(position / 100)}`);
        }
    });

    it("a minted stop is the colour the ghost previewed at that position", () => {
        const m = useGradientModel();
        m.setStopEasing(m.stops.value[0]!.id, STEPS);
        const preview = formatColorLiteral(sampleAt(m.modelState.value, 37.5));
        m.mintStop(37.5);
        const minted = m.stops.value.find((s) => s.position === 37.5);
        expect(minted?.cssColor).toBe(preview);
    });

    it("just past a hard stop the ramp is the stop that opens the next span", () => {
        const m = useGradientModel();
        m.addStop(RED, 50);
        m.addStop(BLUE, 50); // coincident with RED: a CSS hard stop at 50
        const model = m.modelState.value;
        const atEdge = sampleCoalescedStops(model).filter((s) => s.position === 50);
        // The rail paints several samples at the edge; the browser shows the
        // LAST of them just past it — and that is what `sampleAt` returns.
        expect(atEdge.length).toBeGreaterThan(1);
        const past = formatColorLiteral(atEdge[atEdge.length - 1]!.color);
        expect(formatColorLiteral(sampleAt(model, 50))).toBe(past);
        expect(past).not.toBe(formatColorLiteral(atEdge[0]!.color));
    });
});

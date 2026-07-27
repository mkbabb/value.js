/**
 * GATE G2 — the stop list is ordered by construction, and the model's own serializer
 * emits CSS its own parser accepts.
 *
 * Asserted product properties:
 *   G2a  after any position commit, stops[] is non-decreasing in `position`.
 *   G2b  serializeGradient(model) round-trips: parseGradientCSS(serializeGradient(m)).ok.
 *   G2c  an interval's authored easing stays attached to the SAME stop pair across an insert.
 *
 * Input that makes it RED today:
 *   G2a/G2b  a three-stop model whose first stop is moved past the second by the mutator
 *            GradientStopEditor drives on every pointermove (`updateStop`, which applies no
 *            ordering policy, while `addStop` sorts and `parseGradientCSS` rejects).
 *   G2c      inserting a stop between two stops whose interval carries a non-linear easing.
 *
 * ENV: node (vite-node) over the demo modules — no browser, no dev server, no API.
 * Structurally blind to: the rendered rail (the paint half of the same defect is G1/G4's
 * job) and to pointer-gesture reachability.
 *
 * Run: npx vite-node docs/tranches/V/megatranche/audit/probes/wb-gradient-stopeditor/gate-order.mts
 * Exit 0 = GREEN. Exit 1 = RED.
 */
import { parseGradientCSS } from "../../../../../../../demo/workbenches/gradient/composables/gradientParse";
import { serializeGradient, linearInterval } from "../../../../../../../demo/workbenches/gradient/composables/useGradientCSS";
import type { GradientModelState, GradientStop } from "../../../../../../../demo/workbenches/gradient/composables/useGradientModel";

const fails: string[] = [];

const base = (stops: GradientStop[]): GradientModelState => ({
    type: "linear",
    direction: 90,
    stops,
    intervals: stops.slice(1).map(() => linearInterval()),
    interpolationSpace: "oklch",
    hueMethod: "shorter",
});

// The exact mutator GradientStopEditor drives (useGradientModel.ts:127-131), verbatim.
const updateStop = (stops: GradientStop[], id: string, patch: Partial<GradientStop>) =>
    stops.map((s) => (s.id === id ? { ...s, ...patch } : s));

// ── G2a: a drag past a neighbour leaves the list non-monotonic ──
const stops: GradientStop[] = [
    { id: "a", cssColor: "oklch(0.75 0.15 145)", position: 0 },
    { id: "b", cssColor: "oklch(0.7 0.165 205)", position: 50 },
    { id: "c", cssColor: "oklch(0.65 0.18 265)", position: 100 },
];
const after = updateStop(stops, "a", { position: 81.2 });
const pos = after.map((s) => s.position);
if (!pos.every((v, i) => i === 0 || v >= pos[i - 1]!)) {
    fails.push(`G2a  after moving stop "a" to 81.2%, stops[] positions are ${JSON.stringify(pos)} — not non-decreasing`);
}

// ── G2b: the serializer emits what the parser rejects ──
const css = serializeGradient(base(after));
const re = parseGradientCSS(css);
if (!re.ok) {
    fails.push(`G2b  serializeGradient produced ${JSON.stringify(css)}\n       which parseGradientCSS REJECTS: "${re.reason}"`);
}

// ── G2c: an insert re-pairs authored easing ──
{
    const two: GradientStop[] = [
        { id: "a", cssColor: "red", position: 0 },
        { id: "c", cssColor: "blue", position: 100 },
    ];
    const authored = { ...linearInterval(), css: "cubic-bezier(0.34, 1.56, 0.64, 1)" };
    // addStop (useGradientModel.ts:117-119) sorts the stops; the interval array only grows
    // at its TAIL, via the length watch (useGradientModel.ts:87-98).
    const sorted = [...two, { id: "b", cssColor: "green", position: 50 }].sort((x, y) => x.position - y.position);
    const grown = [authored, linearInterval()];
    const pairNowCarryingTheAuthoredCurve = `${sorted[0]!.id}->${sorted[1]!.id}`;
    if (grown[0]!.css === authored.css && pairNowCarryingTheAuthoredCurve !== "a->c") {
        fails.push(`G2c  the authored curve ${authored.css} was attached to the pair a->c; after inserting a stop at 50% it is attached to ${pairNowCarryingTheAuthoredCurve} — intervals are keyed by array index, not by the stop pair`);
    }
}

if (fails.length) {
    console.error("GATE G2 (ordered-by-construction) — RED\n" + fails.map((f) => "  " + f).join("\n"));
    process.exit(1);
}
console.log("GATE G2 (ordered-by-construction) — GREEN");

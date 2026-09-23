// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.h — THE DIVERGENCE CLASSES THE BBNF GRAMMAR OPENS AGAINST THE SHIPPING PARSER, each with
// its ruling and its row (`DIVERGENCE-LEDGER.md` §15). Consulted only for a cell the differential
// already reads RED and no per-cell ruling governs.
//
// EVERY CLASS IS A MECHANISM TEST, NEVER A MATCH (the F-w4f-1 discipline, `lib/ruled.mjs`): the
// ruled construct is repaired out of the source, and the class governs only when the repaired
// source reads NOT RED under every ruling (it AGREES, or another ruling governs what remains) and,
// for a widening, the candidate still accepts it — so the construct was the whole divergence
// between the two engines. A predicate that matches and a repair that fails leave the cell exactly
// as RED as it was, with the failure in its `why`.

import { isDeepStrictEqual } from "node:util";

import type { CellResult } from "./lib/ruled.mjs";
import type { Call, Token } from "./lib/tokens.mjs";
import { callsOf, soleNumeric, spliceAll, tokenize } from "./lib/tokens.mjs";
import type { Cell, Entry, Verdict } from "./differential";

export type W6Args = {
    entry: Entry;
    input: string;
    incumbent: CellResult;
    candidate: CellResult;
    cell: Cell;
    /** The differential's full classification of another source (rulings included). */
    reclassify: (source: string) => Cell;
    run: { incumbent: (source: string) => CellResult; candidate: (source: string) => CellResult };
    red: (verdict: Verdict) => boolean;
};

type Edit = { start: number; end: number; text: string };
type W6Class = Readonly<{
    id: string;
    /** The RED verdict the class can govern: which engine accepts. */
    governs: "MIS_ACCEPT" | "FALSE_REJECT_IN_SHAPE";
    edits: (input: string) => Edit[];
    /** Extra conditions on the repaired source, beyond "not RED". */
    holds?: (args: W6Args, repaired: string) => string | null;
}>;

const ok = (r: CellResult) => !r.threw && r.value?.ok === true;

/** The source span of every call named in `heads` (outermost first), through its closing `)`. */
function callSpans(input: string, heads: ReadonlySet<string>): Array<{ head: string; start: number; end: number }> {
    const tokens: Token[] = tokenize(input);
    const out: Array<{ head: string; start: number; end: number }> = [];
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i]!;
        if (t.kind !== "function" || !heads.has(t.text.toLowerCase())) continue;
        let depth = 1;
        let j = i + 1;
        for (; j < tokens.length && depth > 0; j++) {
            const u = tokens[j]!;
            if (u.kind === "function" || (u.kind === "punct" && u.text === "(")) depth += 1;
            else if (u.kind === "punct" && u.text === ")") depth -= 1;
        }
        if (depth === 0) out.push({ head: t.text.toLowerCase(), start: t.start, end: tokens[j - 1]!.end });
    }
    return out.filter((s) => !out.some((o) => o !== s && o.start <= s.start && s.end <= o.end));
}

const HUE_INDEX: Readonly<Record<string, number>> = { hsl: 0, hsla: 0, hwb: 0, lch: 2, oklch: 2 };
const COLOUR_HEADS = ["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color"];
const MATH_HEADS = new Set(["calc", "min", "max", "clamp", "abs", "sign"]);
const COLOUR5_HEADS = new Set(["color-mix", "light-dark"]);

/** A colour argument that IS one math-function call, as the span it covers. */
function mathArguments(input: string): Edit[] {
    const edits: Edit[] = [];
    for (const call of callsOf(input, COLOUR_HEADS) as Call[]) {
        for (const arg of call.args) {
            const body = arg.filter((t) => t.kind !== "ws");
            const head = body[0];
            if (head === undefined || head.kind !== "function" || !MATH_HEADS.has(head.text.toLowerCase())) continue;
            const span = callSpans(input, new Set([head.text.toLowerCase()])).find((s) => s.start === head.start);
            if (span === undefined || span.end !== body[body.length - 1]!.end) continue;
            // A percentage-typed calculation stands in as `0%`, every other as `0` (css-values-4 §10.1).
            edits.push({ start: span.start, end: span.end, text: /%/.test(input.slice(span.start, span.end)) ? "0%" : "0" });
        }
    }
    return edits;
}

/** Every non-finite numeral that is a hue argument's sole token, rewritten as `0` in its own unit. */
function nonFiniteHues(input: string): Edit[] {
    const edits: Edit[] = [];
    for (const call of callsOf(input, Object.keys(HUE_INDEX)) as Call[]) {
        const n = soleNumeric(call.args[HUE_INDEX[call.head]!]);
        if (n !== null && !Number.isFinite(n.value)) edits.push({ start: n.start, end: n.end, text: `0${n.unit}` });
    }
    return edits;
}

/** An EMPTY comma part — `(,` · `,,` · `,)` — as the comma that opens it. */
function emptyCommaParts(input: string): Edit[] {
    const edits: Edit[] = [];
    for (const m of input.matchAll(/,(?=\s*[,)])/g)) edits.push({ start: m.index, end: m.index + 1, text: "" });
    for (const m of input.matchAll(/\((\s*),/g)) edits.push({ start: m.index + 1 + m[1]!.length, end: m.index + 2 + m[1]!.length, text: "" });
    return edits.filter((e, i) => edits.findIndex((o) => o.start === e.start) === i);
}

/**
 * The classes, in resolution order. Each `id` is the ruling that owns the mechanism; the ledger row
 * (§15) carries its spec citation and consumer direction.
 */
export const W6_CLASSES: readonly W6Class[] = [
    {
        // ID-2 (COHESION §0w id-set; ADJUDICATION-W4 §2.2 `#10`): an empty comma part is not a
        // component value (css-values-4 §2.1, css-syntax-3 §5.4.1). The incumbent drops it; the
        // BBNF grammar refuses the input. Repair: delete the empty parts — the candidate must then accept.
        id: "ID-2",
        governs: "FALSE_REJECT_IN_SHAPE",
        edits: emptyCommaParts,
        holds: ({ run }, repaired) => (ok(run.candidate(repaired)) ? null : "the candidate still refuses the repaired source"),
    },
    {
        // GROUND-C (COHESION §0v): an overflowing numeral is not a syntax error; a <hue> has no range,
        // and an infinite hue is normalized to 0deg (css-color-4 §4.3 / WPT color-valid-hsl "the <hue>
        // component is again normalized to 0 degrees"). Repair: the hue spelled `0` — the candidate's
        // colour must be the SAME tree, so the normalization is the whole effect.
        id: "GROUND-C",
        governs: "MIS_ACCEPT",
        edits: nonFiniteHues,
        holds: ({ run, candidate }, repaired) =>
            isDeepStrictEqual(candidate.value?.value, run.candidate(repaired).value?.value)
                ? null
                : "the candidate's tree moves when the infinite hue is spelled 0",
    },
    {
        // SC-1 (COHESION §0bx; W6.md `.b`): a math function in a colour channel (css-color-4 §4.1,
        // css-values-4 §10). The incumbent has no calculation in a colour. Repair: each such argument
        // spelled as a plain `0` / `0%` — the incumbent must then read the colour.
        id: "SC-1",
        governs: "MIS_ACCEPT",
        edits: mathArguments,
    },
    {
        // W6.md `.b` Color 5 (COHESION §0bx "full Color 4/5 coverage"): `color-mix()` (css-color-5 §3,
        // WPT-pinned 931/931 in `test/css/css-color5.test.ts`) and `light-dark()` (§4). The incumbent
        // has neither production. Repair: each call spelled `red` — the rest must then agree.
        id: "C5-MIX",
        governs: "MIS_ACCEPT",
        edits: (input) => callSpans(input, COLOUR5_HEADS).map((s) => ({ start: s.start, end: s.end, text: "red" })),
    },
    {
        // SC-2 (COHESION §0bx; W6.md `.b`): `display-p3-linear` (css-color-4 §10.5). Repair: the space
        // spelled `display-p3` — the incumbent must then read the colour.
        id: "SC-2",
        governs: "MIS_ACCEPT",
        edits: (input) =>
            [...input.matchAll(/\bdisplay-p3-linear\b/gi)].map((m) => ({ start: m.index, end: m.index + m[0].length, text: "display-p3" })),
    },
];

/** The first class whose repair explains the cell, or the cell unchanged (with every failed repair named). */
export function resolveW6(args: W6Args): Cell {
    const failed: string[] = [];
    for (const klass of W6_CLASSES) {
        if (args.cell.verdict !== klass.governs) continue;
        const edits = klass.edits(args.input);
        if (edits.length === 0) continue;
        const repaired = spliceAll(args.input, edits);
        const after = args.reclassify(repaired);
        const why =
            args.red(after.verdict) ? `the repaired source still reads ${after.verdict}`
            : klass.governs === "MIS_ACCEPT" && !ok(args.run.candidate(repaired)) ? "the candidate refuses the repaired source"
            : (klass.holds?.(args, repaired) ?? null);
        if (why === null) return { verdict: "DECLARED_DIVERGENCE", why: `${klass.id} honoured — repaired to ${JSON.stringify(repaired).slice(0, 80)}`, ruling: klass.id };
        failed.push(`${klass.id}: ${why}`);
    }
    return failed.length === 0 ? args.cell : { ...args.cell, why: `${args.cell.why} · ${failed.join(" · ")}` };
}

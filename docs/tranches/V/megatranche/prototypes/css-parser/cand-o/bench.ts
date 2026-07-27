/**
 * cand-O · micro-benchmark against the published `parseCssColor`.
 *
 *     npx tsx cand-o/bench.ts
 *
 * METHOD, stated before the numbers.
 *
 *  · SAME PROCESS, INTERLEAVED. Each round runs every cell once, in rotation,
 *    and the rounds are repeated. A/A/A/…/B/B/B/… would hand the second block a
 *    warmer heap and a colder inline cache; rotation spreads both.
 *  · WARMUP DISCARDED. The first `WARMUP` rounds are thrown away after the
 *    corpus has been run enough times for V8 to have tiered the hot functions.
 *  · MEDIAN, NOT MEAN. One GC pause during one round should not move the
 *    headline. The spread (min / median / max) is printed so the reader can see
 *    how noisy the measurement was rather than take the median on faith.
 *  · SINK. Every result is folded into a counter that is printed, so nothing is
 *    eliminated as dead code.
 *  · THE CORPUS IS SHARED AND ACCEPTED BY BOTH. Benchmarking cand-O on inputs
 *    the incumbent rejects early (or crashes on) would be measuring different
 *    work and calling it a speed difference. A separate failure corpus is timed
 *    on its own, and only over inputs the incumbent does NOT throw on.
 *
 * KNOWN ASYMMETRIES, both directions, since a benchmark without them is a
 * marketing number:
 *
 *   Costs cand-O pays that the incumbent does not
 *     · combinator backtracking: modern syntax is attempted before legacy, so
 *       `rgb(1,2,3)` parses its first channel twice;
 *     · strictness: cand-O enforces the same-type rule, the `<hue>` type, the
 *       `1.`-is-not-a-number rule and the {3,4,6,8} hex lengths. Rejecting
 *       correctly costs work that accepting sloppily does not;
 *     · a real AST with a `syntax` provenance tag.
 *
 *   Costs the incumbent pays that cand-O does not
 *     · `deepFreeze` on every success (cand-O freezes the result, the value and
 *       the channels array — comparable, but not identical);
 *     · a recursive re-entry into `parseCssColor` for every `<named-color>`
 *       (name → hex string → parse again);
 *     · four `String.prototype.match` calls and two hand-written split loops on
 *       the functional path, allocating intermediate arrays and substrings.
 *
 * The standing evidence from the prior proof gate — the LIVE regex parser
 * measured FASTEST, ~1.8× — is treated with respect: this file reports what it
 * measures on this machine and makes no claim beyond it.
 */

import { parseColor, parseColorNode } from "./index";
import { parseCssColor } from "./vendor/value-js-4.0.0/dist/subpaths/css.js";

const ROUNDS = 40;
const WARMUP = 10;
const REPS = 200;

/** Inputs both parsers accept, weighted the way real stylesheets are. */
const SHARED_CORPUS: readonly string[] = [
    // hex — the most common form on the web by a wide margin
    "#fff", "#000", "#f0f0f0", "#1a2b3c", "#ff000080", "#abcd",
    // named
    "red", "white", "black", "transparent", "rebeccapurple", "cornflowerblue",
    // rgb, legacy three-argument (the four-argument form the incumbent cannot parse)
    "rgb(255,0,0)", "rgb(17, 34, 51)", "rgb(0,0,0)",
    // rgb, modern
    "rgb(255 0 0)", "rgb(17 34 51 / 0.5)", "rgb(50% 25% 75%)",
    // hsl
    "hsl(120 50% 50%)", "hsl(210, 100%, 50%)", "hsl(0.5turn 50% 50% / 0.25)",
    // css-color-4 functions
    "hwb(120 20% 30%)", "lab(50% 40 30)", "lch(50 30 40deg)",
    "oklab(0.5 0.1 -0.1)", "oklch(0.7 0.15 200)", "oklch(70% 50% 200deg / 0.5)",
    // color()
    "color(srgb 1 0 0)", "color(display-p3 0.5 0.5 0.5 / 0.8)",
    "color(xyz-d50 0.2 0.3 0.4)",
];

/** Inputs both parsers REJECT without the incumbent throwing. */
const FAILURE_CORPUS: readonly string[] = [
    "notacolor", "#gg0000", "#12345", "rgb(1 2)", "rgb(1px 2 3)",
    "hsv(120 50% 50%)", "var(--brand)", "currentColor", "1px", "",
];

interface Cell {
    readonly name: string;
    readonly run: (source: string) => number;
}

const CELLS: readonly Cell[] = [
    {
        name: "cand-O parseColorNode (AST)",
        run: (source) => (parseColorNode(source).ok ? 1 : 0),
    },
    {
        name: "cand-O parseColor  (CssColor)",
        run: (source) => (parseColor(source).ok ? 1 : 0),
    },
    {
        name: "published parseCssColor 4.0.0",
        run: (source) => {
            try {
                return parseCssColor(source).ok ? 1 : 0;
            } catch {
                return 0;
            }
        },
    },
];

let sink = 0;

const timeRound = (cell: Cell, corpus: readonly string[]): number => {
    const started = process.hrtime.bigint();
    for (let rep = 0; rep < REPS; rep += 1) {
        for (const source of corpus) sink += cell.run(source);
    }
    const elapsed = Number(process.hrtime.bigint() - started);
    return elapsed / (REPS * corpus.length);
};

const median = (values: readonly number[]): number => {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    const lower = sorted[middle - 1] ?? 0;
    const upper = sorted[middle] ?? 0;
    return sorted.length % 2 === 0 ? (lower + upper) / 2 : upper;
};

const measure = (corpus: readonly string[]) => {
    const samples = new Map<string, number[]>(CELLS.map((cell) => [cell.name, []]));

    for (let round = 0; round < ROUNDS; round += 1) {
        for (const cell of CELLS) {
            const nanos = timeRound(cell, corpus);
            if (round >= WARMUP) samples.get(cell.name)?.push(nanos);
        }
    }

    return CELLS.map((cell) => {
        const values = samples.get(cell.name) ?? [];
        return {
            name: cell.name,
            median: median(values),
            min: Math.min(...values),
            max: Math.max(...values),
        };
    });
};

const report = (label: string, corpus: readonly string[]) => {
    const rows = measure(corpus);
    const baseline = rows[rows.length - 1];
    const width = Math.max(...rows.map((row) => row.name.length));

    console.log(`\n${label}  —  ${corpus.length} inputs × ${REPS} reps × ${ROUNDS - WARMUP} scored rounds`);
    console.log("-".repeat(width + 44));
    for (const row of rows) {
        const ratio =
            baseline === undefined || baseline.median === 0
                ? "—"
                : `${(baseline.median / row.median).toFixed(2)}×`;
        console.log(
            `${row.name.padEnd(width)}  ${row.median.toFixed(0).padStart(7)} ns/op` +
                `   [${row.min.toFixed(0)}–${row.max.toFixed(0)}]` +
                `   ${ratio.padStart(6)} vs published`,
        );
    }
};

const perFamily = () => {
    const families: ReadonlyArray<readonly [string, readonly string[]]> = [
        ["hex        ", ["#fff", "#f0f0f0", "#ff000080"]],
        ["named      ", ["red", "cornflowerblue", "transparent"]],
        ["rgb legacy ", ["rgb(255,0,0)", "rgb(17, 34, 51)"]],
        ["rgb modern ", ["rgb(255 0 0)", "rgb(17 34 51 / 0.5)"]],
        ["oklch      ", ["oklch(0.7 0.15 200)", "oklch(70% 50% 200deg / 0.5)"]],
        ["color()    ", ["color(srgb 1 0 0)", "color(display-p3 0.5 0.5 0.5 / 0.8)"]],
    ];

    console.log("\nper-family median ns/op (cand-O parseColor vs published)");
    console.log("-".repeat(62));
    for (const [label, corpus] of families) {
        const rows = measure(corpus);
        const ours = rows[1];
        const theirs = rows[2];
        if (ours === undefined || theirs === undefined) continue;
        console.log(
            `${label}  cand-O ${ours.median.toFixed(0).padStart(6)}` +
                `   published ${theirs.median.toFixed(0).padStart(6)}` +
                `   ${(theirs.median / ours.median).toFixed(2)}×`,
        );
    }
};

console.log(
    `node ${process.version} · ${process.platform} ${process.arch}` +
        ` · @mkbabb/parse-that 1.0.0 · @mkbabb/value.js 4.0.0 (published tarball)`,
);

report("SHARED CORPUS (both accept)", SHARED_CORPUS);
report("FAILURE CORPUS (both reject, no throw)", FAILURE_CORPUS);
perFamily();

console.log(`\nsink=${sink}`);
console.log(
    "\nA ratio > 1 means cand-O is faster. Read the method block at the top of\n" +
        "this file before quoting any number from it.",
);

/**
 * MICRO-BENCH — candidate-F parse-that grammar vs the PUBLISHED
 * `parseCssColor` (`@mkbabb/value.js@4.0.0`, the LIVE regex parser the prior
 * proof gate measured FASTEST ~1.8×).
 *
 * METHOD (and its honest limits):
 *   · hot loop over a fixed mixed corpus; `performance.now()` around
 *     `ROUNDS` interleaved A/B/A/B rounds (alternation shares JIT/GC
 *     weather); median-of-rounds reported; warmup rounds discarded.
 *   · SAME PROCESS, tsx/esbuild transpile, no isolation, no GC control,
 *     N=1 machine/run — this ranks the two parsers on this box today; it is
 *     NOT a calibrated benchmark and decides nothing by itself (OC-1, the
 *     bench-bar recalibration, is an open owner concern).
 *   · The two parsers do DIFFERENT work per accept: mine builds a
 *     syntax-faithful AST (chain-validation allocates small parsers per
 *     keyword/hex parse); the published one regex-matches AND resolves
 *     color(srgb …)→rgb. Costs are not like-for-like and are not claimed
 *     to be.
 *   · Failure corpus: mine returns ok:false; the published parser THROWS
 *     (MT-F024), so its failure loop pays throw+catch — that IS its real
 *     shipping cost, and is labelled as such rather than hidden.
 *
 * Run: npx tsx cand-f/bench.ts
 */

import { performance } from "node:perf_hooks";

import { parseCssColor } from "@mkbabb/value.js/css";

import { parseColor } from "./color.js";

const VALID_CORPUS: readonly string[] = [
    "#ff0099",
    "#f09",
    "red",
    "rebeccapurple",
    "transparent",
    "rgb(255 0 153)",
    "rgb(255 0 153 / 0.5)",
    "rgb(100% 0% 60%)",
    "rgb(255, 0, 153)",
    "rgb(none 0 0 / none)",
    "hsl(120 50% 50%)",
    "hsl(150deg 30% 60%)",
    "hsl(0.5turn 100% 50%)",
    "hsl(120, 50%, 50%)",
    "hwb(194 0% 0%)",
    "hwb(194deg 30% 40% / 0.5)",
    "lab(50% 40 59.5)",
    "lab(100% -100% 100%)",
    "oklab(59% 0.1 0.1)",
    "lch(52.2% 72.2 50deg)",
    "oklch(60% 0.15 50deg)",
    "oklch(0.6 0.15 50)",
    "color(srgb 0 0.5 1)",
    "color(display-p3 1 0.5 0)",
];

/** Mine rejects these; the published parser THROWS on every one (R1 class). */
const REJECT_CORPUS: readonly string[] = [
    "rgb()",
    "hsl(  )",
    "oklch(/)",
    "hwb()",
    "rgba()",
    "lab()",
    "color()",
    "foo()",
];

const REPS_PER_ROUND = 2_000;
const ROUNDS = 9;
const WARMUP_ROUNDS = 3;

let blackhole = 0; // defeat dead-code elimination

const candidateValid = (): void => {
    for (let i = 0; i < REPS_PER_ROUND; i++) {
        for (const input of VALID_CORPUS) {
            if (parseColor(input).ok) blackhole++;
        }
    }
};

const publishedValid = (): void => {
    for (let i = 0; i < REPS_PER_ROUND; i++) {
        for (const input of VALID_CORPUS) {
            if (parseCssColor(input).ok) blackhole++;
        }
    }
};

const candidateReject = (): void => {
    for (let i = 0; i < REPS_PER_ROUND; i++) {
        for (const input of REJECT_CORPUS) {
            if (!parseColor(input).ok) blackhole++;
        }
    }
};

const publishedReject = (): void => {
    for (let i = 0; i < REPS_PER_ROUND; i++) {
        for (const input of REJECT_CORPUS) {
            try {
                if (!parseCssColor(input).ok) blackhole++;
            } catch {
                blackhole++; // the throw IS the shipping behaviour (MT-F024)
            }
        }
    }
};

const median = (xs: number[]): number => {
    const sorted = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const a = sorted[mid];
    const b = sorted.length % 2 === 0 ? sorted[mid - 1] : a;
    return a === undefined || b === undefined ? Number.NaN : (a + b) / 2;
};

interface Lane {
    readonly name: string;
    readonly run: () => void;
    readonly parsesPerRound: number;
}

const measure = (label: string, lanes: readonly Lane[]): void => {
    const times = new Map<string, number[]>(lanes.map((l) => [l.name, []]));
    for (let round = 0; round < WARMUP_ROUNDS + ROUNDS; round++) {
        // Alternate lane order per round so neither lane owns the warm cache.
        const order = round % 2 === 0 ? lanes : [...lanes].reverse();
        for (const lane of order) {
            const t0 = performance.now();
            lane.run();
            const t1 = performance.now();
            if (round >= WARMUP_ROUNDS) times.get(lane.name)?.push(t1 - t0);
        }
    }
    console.log(`\n── ${label} ──`);
    const medians = new Map<string, number>();
    for (const lane of lanes) {
        const ms = median(times.get(lane.name) ?? []);
        medians.set(lane.name, ms);
        const perParseNs = (ms * 1e6) / lane.parsesPerRound;
        const opsPerSec = (lane.parsesPerRound / ms) * 1e3;
        console.log(
            `${lane.name.padEnd(32)} median ${ms.toFixed(2)} ms/round · ` +
                `${perParseNs.toFixed(0)} ns/parse · ${(opsPerSec / 1e6).toFixed(3)} M parses/s`,
        );
    }
    const first = lanes[0];
    const second = lanes[1];
    if (first !== undefined && second !== undefined) {
        const a = medians.get(first.name);
        const b = medians.get(second.name);
        if (a !== undefined && b !== undefined && b > 0) {
            console.log(
                `ratio: ${first.name} / ${second.name} = ${(a / b).toFixed(2)}× time ` +
                    `(${a > b ? "published faster" : "candidate faster"})`,
            );
        }
    }
};

console.log(
    "cand-f micro-bench · node " +
        process.version +
        " · corpus valid=" +
        VALID_CORPUS.length +
        " reject=" +
        REJECT_CORPUS.length +
        ` · ${REPS_PER_ROUND} reps/round · median of ${ROUNDS} rounds (after ${WARMUP_ROUNDS} warmup)`,
);

measure("VALID corpus (both accept)", [
    {
        name: "candidate-F (parse-that)",
        run: candidateValid,
        parsesPerRound: REPS_PER_ROUND * VALID_CORPUS.length,
    },
    {
        name: "published parseCssColor",
        run: publishedValid,
        parsesPerRound: REPS_PER_ROUND * VALID_CORPUS.length,
    },
]);

measure("REJECT corpus (R1 class; published throws — try/catch included)", [
    {
        name: "candidate-F (parse-that)",
        run: candidateReject,
        parsesPerRound: REPS_PER_ROUND * REJECT_CORPUS.length,
    },
    {
        name: "published parseCssColor+catch",
        run: publishedReject,
        parsesPerRound: REPS_PER_ROUND * REJECT_CORPUS.length,
    },
]);

console.log(`\nblackhole=${blackhole} (anti-DCE; ignore)`);

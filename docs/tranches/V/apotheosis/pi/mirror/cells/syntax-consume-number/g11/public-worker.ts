import { Parser, ParserState, regex, string } from "@mkbabb/parse-that/core";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

type Leaf = Readonly<{ value: number; type: "integer" | "number"; sign: "+" | "-" | null }>;
type PrefixCase = {
    id: string;
    source: string;
    offset: number;
    expected?: { representation: string; value: number; type: "integer" | "number"; sign: "+" | "-" | null; start: number; end: number } | null;
    representation?: string;
    value?: number;
    value_kind?: "finite" | "negative-zero" | "positive-infinity" | "negative-infinity";
    type?: "integer" | "number";
    sign?: "+" | "-" | null;
    end?: number;
};

const [mode, modulePath, exportName, corpusPath, construction] = process.argv.slice(2);
if (mode === "--hang") await new Promise(() => {});
if (!modulePath || !exportName || !corpusPath) throw new Error("worker requires module, export, and corpus");
const loadedParser: unknown = (await import(pathToFileURL(modulePath).href))[exportName];
if (!(loadedParser instanceof Parser)) throw new Error(`${exportName} is not a parse-that Parser`);
const parser: Parser<Leaf> = loadedParser;
const corpus = JSON.parse(await readFile(corpusPath, "utf8"));
const inherited = JSON.parse(await readFile(new URL(corpus.inherited.public_cases.path, pathToFileURL(corpusPath)), "utf8"));

const fail = (message: string): never => { throw new Error(message); };
const expectedValue = (test: PrefixCase): number => {
    const expected = test.expected;
    const representation = expected?.representation ?? test.representation ?? fail(`${test.id}: no representation`);
    return Number(representation);
};
const expectedLeaf = (test: PrefixCase): Leaf => {
    const expected = test.expected;
    return {
        value: expectedValue(test),
        type: expected?.type ?? test.type ?? fail(`${test.id}: no type`),
        sign: expected?.sign ?? test.sign ?? null,
    };
};
const expectedEnd = (test: PrefixCase): number => test.expected?.end ?? test.end ?? fail(`${test.id}: no end`);
const sameLeaf = (actual: unknown, expected: Leaf): actual is Leaf => {
    if (typeof actual !== "object" || actual === null) return false;
    const leaf = actual as Leaf;
    return Object.is(leaf.value, expected.value) && leaf.type === expected.type && leaf.sign === expected.sign
        && Object.keys(leaf).sort().join(",") === "sign,type,value";
};

const predecessor = (name: string): unknown => {
    switch (name) {
        case "undefined": return undefined;
        case "null": return null;
        case "false": return false;
        case "zero": return 0;
        case "empty-string": return "";
        case "array": return Object.freeze(["predecessor"]);
        case "object": return Object.freeze({ tag: "predecessor" });
        default: return fail(`unknown predecessor ${name}`);
    }
};

function runPrefix(test: PrefixCase, prior: unknown, diagnostics: "ordinary" | "preseeded-ahead") {
    const state = new ParserState<any>(test.source, prior, test.offset);
    const source = state.src;
    const seed = diagnostics === "preseeded-ahead" ? {
        furthest: test.offset + corpus.transaction_profiles.preseed_ahead_delta,
        expected: ["preexisting-ahead"],
        suggestions: [{ kind: "trailing-content" as const, message: "preexisting" }],
        secondarySpans: [{ offset: test.offset + 1, label: "preexisting" }],
    } : null;
    if (seed) {
        state.furthest = seed.furthest;
        state.expected = [...seed.expected];
        state.suggestions = seed.suggestions.map((item) => ({ ...item }));
        state.secondarySpans = seed.secondarySpans.map((item) => ({ ...item }));
    }
    try { parser.call(state); } catch (error) { fail(`${test.id}: threw ${String(error)}`); }
    if (state.src !== source) fail(`${test.id}: source mutated`);
    if (test.expected === null) {
        if (!state.isError || state.offset !== test.offset || !Object.is(state.value, prior)) fail(`${test.id}: failure not transactional for ${String(prior)}`);
        if (seed && (state.furthest !== seed.furthest
            || JSON.stringify(state.expected) !== JSON.stringify(seed.expected)
            || JSON.stringify(state.suggestions) !== JSON.stringify(seed.suggestions)
            || JSON.stringify(state.secondarySpans) !== JSON.stringify(seed.secondarySpans))) fail(`${test.id}: ahead diagnostics mutated`);
        return;
    }
    if (state.isError || state.offset !== expectedEnd(test) || !sameLeaf(state.value, expectedLeaf(test))) fail(`${test.id}: success observation mismatch`);
}

function parent(kind: string, prefix: string, suffix: string): Parser<unknown> {
    const base = string(prefix).next(parser);
    if (kind === "percentage") return base.skip(string("%")).skip(string(suffix));
    if (kind === "dimension") return base.then(regex(/[a-zA-Z]+/)).skip(string(suffix));
    if (kind === "integer") return base.chain((leaf) => leaf.type === "integer"
        ? string(suffix).map(() => leaf)
        : string("\u0000").map(() => leaf));
    return base.skip(string(suffix));
}

function runComposition(test: any) {
    const composed = parent(test.kind, test.prefix, test.suffix);
    const state = new ParserState<any>(test.source, Object.freeze({ tag: "parent-predecessor" }), 0);
    try { composed.call(state); } catch (error) { fail(`${test.id}: composition threw ${String(error)}`); }
    if (test.accepts) {
        if (state.isError || state.offset !== test.source.length) fail(`${test.id}: composition should accept`);
        const leaf = test.kind === "dimension" ? state.value[0] : state.value;
        if (leaf.type !== test.type || (test.representation !== undefined && !Object.is(leaf.value, Number(test.representation)))) fail(`${test.id}: composed leaf mismatch`);
        if (test.kind === "dimension" && state.value[1] !== test.unit) fail(`${test.id}: unit mismatch`);
    } else if (!state.isError) fail(`${test.id}: composition should reject`);
}

function makeWork(kind: string, size: number): { source: string; end: number } {
    if (kind === "digits") return { source: "7".repeat(size), end: size };
    if (kind === "fraction") return { source: `1.${"7".repeat(size - 2)}`, end: size };
    if (kind === "exponent") return { source: `1e+${"7".repeat(size - 3)}`, end: size };
    if (kind === "incomplete-exponent") return { source: `${"7".repeat(size - 2)}e+`, end: size - 2 };
    return fail(`unknown work construction ${kind}`);
}

if (mode === "--suite") {
    let prefixRuns = 0;
    for (const row of inherited.number_start_prefix_evidence as any[]) {
        const test: PrefixCase = { id: row.id, source: row.source, offset: row.offset, representation: row.representation, value: Number(row.representation), type: row.representation.includes(".") || /[eE]/.test(row.representation) ? "number" : "integer", sign: row.representation.startsWith("+") ? "+" : row.representation.startsWith("-") ? "-" : null, end: row.offset + row.representation.length };
        runPrefix(test, Object.freeze({ tag: "success-predecessor" }), "ordinary"); prefixRuns++;
    }
    for (const test of [...inherited.prefix_cases, ...corpus.additional_prefix_cases] as PrefixCase[]) {
        if (test.expected === null) {
            for (const prior of corpus.transaction_profiles.predecessors) for (const diagnostics of corpus.transaction_profiles.diagnostics) {
                runPrefix(test, predecessor(prior), diagnostics); prefixRuns++;
            }
        } else {
            runPrefix(test, Object.freeze({ tag: "success-predecessor" }), "ordinary"); prefixRuns++;
            runPrefix(test, false, "preseeded-ahead"); prefixRuns++;
        }
    }
    for (const test of inherited.composition_cases) runComposition(test);
    for (const source of corpus.no_throw_extras as string[]) {
        const state = new ParserState<any>(source, Object.freeze({ tag: "hostile" }), 0);
        try { parser.call(state); } catch (error) { fail(`hostile ${JSON.stringify(source)} threw ${String(error)}`); }
        if (state.src !== source || state.offset < 0 || state.offset > source.length) fail(`hostile ${JSON.stringify(source)} corrupted state`);
    }
    process.stdout.write(`${JSON.stringify({ status: "PASS", mode, export: exportName, prefix_runs: prefixRuns, composition_runs: inherited.composition_cases.length, no_throw_runs: corpus.no_throw_extras.length })}\n`);
} else if (mode === "--work") {
    if (!construction) fail("work construction missing");
    const workConstruction = construction!;
    const samples: Array<{ size: number; ns: number; digest: string }> = [];
    for (const size of corpus.work.sizes_utf16) {
        const { source, end } = makeWork(workConstruction, size);
        const run = () => {
            let digest = 0;
            const started = process.hrtime.bigint();
            for (let i = 0; i < corpus.work.iterations_per_sample; i++) {
                const state = new ParserState<any>(source, undefined, 0);
                parser.call(state);
                if (state.isError || state.offset !== end) fail(`${workConstruction}/${size}: extent mismatch`);
                digest = ((digest * 33) ^ state.offset ^ (Object.is(state.value.value, -0) ? -1 : Number.isFinite(state.value.value) ? 1 : 2)) | 0;
            }
            return { ns: Number(process.hrtime.bigint() - started), digest: `${digest}` };
        };
        for (let i = 0; i < corpus.work.warmups; i++) run();
        for (let i = 0; i < corpus.work.samples; i++) samples.push({ size, ...run() });
    }
    process.stdout.write(`${JSON.stringify({ status: "PASS", mode, export: exportName, construction: workConstruction, samples })}\n`);
} else fail(`unknown mode ${mode}`);

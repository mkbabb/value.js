// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.c` — gate V-C, the WPT value-conformance instrument (W8.md §Scope 2):
//   npx vite-node bench/wpt-conformance/conformance.ts [--misses <module>|all]
// Reads the dated case JSON extracted from the vendored WPT files (`test/css/wpt-values/`) and
// drives the PRODUCT parser (`src/css` `parseCssValue` + `serializeCssValue`) over every case:
//   valid   → parses, and its serialization equals WPT's expected serialization (any listed form);
//   invalid → refused.
// A case that does neither is a MISS. A miss is cleared only by a cure in BBNF or by a ruled row in
// `ruled.json` (exact file + kind + property + input, with its spec reason); there is no skip, no
// pattern and no allowlist. A ruled row that no longer names a miss is STALE and fails too.
// Exit 0 only when every miss is ruled and no row is stale; otherwise exit 1 (the born-RED read).
// X.P.W9 `.vc9`: the census (`census-*.json`) lists every css-variables-1 / css-syntax-3 file at the
// pin; each is extracted (in pins.json) or ruled at file level (`ruled-files.json`). A census file
// that is neither is an UNRULED FILE, and a ruled file that is also extracted is a STALE FILE; both
// fail. A round-trip case WPT compares case-folded (`fold`) is folded before comparison.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { parseCssColor, parseCssValue, parseTimingFunction, serializeCssColor, serializeCssValue } from "../../src/css/index";

export const CASES_FILE = "cases-2026-11-04-r1.json";

type Case = Readonly<{ module: string; file: string; kind: "valid" | "invalid" | "computed" | "used"; property: string; input: string; expected?: readonly string[]; fold?: "upper" | "lower"; epsilon?: number }>;
type Ruled = Readonly<{ file: string; kind: string; property: string; input: string; class: string; reason: string; spec: string }>;
type Miss = Readonly<{ c: Case; why: "refused" | "serialize-error" | "serialization" | "accepted"; actual?: string }>;

const HERE = path.dirname(new URL(import.meta.url).pathname);
const corpus = JSON.parse(readFileSync(path.join(HERE, "../../test/css/wpt-values", CASES_FILE), "utf8")) as { wptCommit: string; count: number; cases: Case[] };
const ruledRows = (JSON.parse(readFileSync(path.join(HERE, "ruled.json"), "utf8")) as { rows: Ruled[] }).rows;

const key = (r: { file: string; kind: string; property: string; input: string }) => JSON.stringify([r.file, r.kind, r.property, r.input]);
for (const r of ruledRows) {
    if (!r.reason || !r.spec || !r.class) throw new Error(`HALT: ruled row without class/reason/spec: ${key(r)}`);
}
const ruled = new Map(ruledRows.map((r) => [key(r), r]));

const VALUES = path.join(HERE, "../../test/css/wpt-values");
type RuledFile = Readonly<{ file: string; class: string; reason: string; spec: string }>;
const ruledFiles = (JSON.parse(readFileSync(path.join(HERE, "ruled-files.json"), "utf8")) as { rows: RuledFile[] }).rows;
for (const r of ruledFiles) {
    if (!r.reason || !r.spec || !r.class) throw new Error(`HALT: ruled file without class/reason/spec: ${r.file}`);
}
const pinned = new Set(Object.keys((JSON.parse(readFileSync(path.join(VALUES, "pins.json"), "utf8")) as { files: Record<string, string> }).files));
// A recorder repair re-runs the census on the same pin under a suffixed date (§0ht.1); the census
// is the union of the files every census lists, each counted once.
const censusFiles = [...new Set(readdirSync(VALUES).filter((n) => /^census-\d{4}-\d{2}-\d{2}(-[a-z0-9]+)?\.json$/.test(n))
    .flatMap((n) => (JSON.parse(readFileSync(path.join(VALUES, n), "utf8")) as { files: { file: string }[] }).files.map((f) => f.file)))];
const ruledFileSet = new Set(ruledFiles.map((r) => r.file));
const unruledFiles = censusFiles.filter((f) => !pinned.has(f) && !ruledFileSet.has(f));
const staleFiles = ruledFiles.filter((r) => pinned.has(r.file) || !censusFiles.includes(r.file)).map((r) => r.file);

// X.P.W10 `.c10`: color-testcommon.js's fuzzy comparison, verbatim in effect — the numbers of the two
// texts (split on space, "(" and ",", each parseFloat'd) within epsilon, and the texts stripped of
// [0-9.] equal. A case carries `epsilon` only when WPT's own harness compares it fuzzily.
function fuzzyEqual(actual: string, expected: string, epsilon: number): boolean {
    const numbers = (t: string) => t.split(/( |\(|,)/).map((e) => parseFloat(e)).filter((n) => !Number.isNaN(n));
    const a = numbers(actual), b = numbers(expected);
    if (a.length !== b.length || a.some((n, k) => Math.abs(n - b[k]!) > epsilon)) return false;
    return actual.replace(/[0-9.]/g, "") === expected.replace(/[0-9.]/g, "");
}
const matches = (c: Case, text: string) => (c.expected ?? [c.input]).some((e) => (c.epsilon === undefined ? e === text : fuzzyEqual(text, e, c.epsilon)));

// X.P.W10 `.c10`: each case kind is judged by the entry that claims it (W10.md): a computed colour by
// `parseCssColor` + `serializeCssColor`; a computed easing by `parseTimingFunction`, equal when the
// expected text parses to the same timing function (no serializer is authored here); every other
// computed and used case, and every specified case, by `parseCssValue` + `serializeCssValue`.
function judgeComputed(c: Case): Miss | null {
    if (c.module === "css-color") {
        const parsed = parseCssColor(c.input);
        if (!parsed.ok) return { c, why: "refused" };
        const text = serializeCssColor(parsed.value);
        if (!text.ok) return { c, why: "serialize-error" };
        return matches(c, text.value) ? null : { c, why: "serialization", actual: text.value };
    }
    if (c.module === "css-easing") {
        const parsed = parseTimingFunction(c.input);
        if (!parsed.ok) return { c, why: "refused" };
        const same = (c.expected ?? [c.input]).some((e) => { const x = parseTimingFunction(e); return x.ok && isDeepStrictEqual(x.value, parsed.value); });
        return same ? null : { c, why: "serialization", actual: JSON.stringify(parsed.value) };
    }
    return judgeSpecified(c);
}

function judge(c: Case): Miss | null {
    return c.kind === "computed" ? judgeComputed(c) : judgeSpecified(c);
}

function judgeSpecified(c: Case): Miss | null {
    const parsed = parseCssValue(c.input);
    if (c.kind === "invalid") return parsed.ok ? { c, why: "accepted" } : null;
    if (!parsed.ok) return { c, why: "refused" };
    const text = serializeCssValue(parsed.value);
    if (!text.ok) return { c, why: "serialize-error" };
    const got = c.fold === "upper" ? text.value.toUpperCase() : c.fold === "lower" ? text.value.toLowerCase() : text.value;
    return matches(c, got) ? null : { c, why: "serialization", actual: text.value };
}

type Row = { cases: number; pass: number; ruled: number; refused: number; serialization: number; "serialize-error": number; accepted: number };
const table = new Map<string, Row>();
const unruled: Miss[] = [];
const hit = new Set<string>();
for (const c of corpus.cases) {
    const row = table.get(c.module) ?? { cases: 0, pass: 0, ruled: 0, refused: 0, serialization: 0, "serialize-error": 0, accepted: 0 };
    table.set(c.module, row);
    row.cases++;
    const miss = judge(c);
    if (!miss) { row.pass++; continue; }
    const k = key(c);
    if (ruled.has(k)) { row.ruled++; hit.add(k); continue; }
    row[miss.why]++;
    unruled.push(miss);
}
const stale = ruledRows.filter((r) => !hit.has(key(r)));

const cols = ["module", "cases", "pass", "ruled", "refused", "serialization", "serialize-error", "accepted", "MISS"] as const;
const lines: string[][] = [];
const total: Row = { cases: 0, pass: 0, ruled: 0, refused: 0, serialization: 0, "serialize-error": 0, accepted: 0 };
for (const [module, r] of [...table].sort(([a], [b]) => a.localeCompare(b))) {
    const miss = r.refused + r.serialization + r["serialize-error"] + r.accepted;
    lines.push([module, ...(["cases", "pass", "ruled", "refused", "serialization", "serialize-error", "accepted"] as const).map((k) => String(r[k])), String(miss)]);
    for (const k of Object.keys(total) as (keyof Row)[]) total[k] += r[k];
}
lines.push(["TOTAL", ...(["cases", "pass", "ruled", "refused", "serialization", "serialize-error", "accepted"] as const).map((k) => String(total[k])), String(unruled.length)]);
const width = cols.map((h, i) => Math.max(h.length, ...lines.map((l) => l[i]!.length)));
const fmt = (l: readonly string[]) => l.map((v, i) => (i === 0 ? v.padEnd(width[i]!) : v.padStart(width[i]!))).join("  ");
console.log(`V-C · WPT ${corpus.wptCommit.slice(0, 12)} · ${CASES_FILE} · ${corpus.count} cases · ${ruledRows.length} ruled rows · census ${censusFiles.length} files (${censusFiles.length - ruledFiles.length} extracted, ${ruledFiles.length} ruled)`);
console.log(fmt(cols));
for (const l of lines) console.log(fmt(l));

const want = process.argv.indexOf("--misses");
if (want >= 0) {
    const mod = process.argv[want + 1] ?? "all";
    for (const m of unruled) {
        if (mod !== "all" && m.c.module !== mod) continue;
        const exp = m.c.kind === "valid" ? ` expected=${JSON.stringify(m.c.expected)}` : "";
        const act = m.actual === undefined ? "" : ` actual=${JSON.stringify(m.actual)}`;
        console.log(`MISS ${m.why} ${m.c.file} ${m.c.property}: ${JSON.stringify(m.c.input)}${exp}${act}`);
    }
}
for (const r of stale) console.log(`STALE ruled row (names no miss): ${key(r)}`);
for (const f of unruledFiles) console.log(`UNRULED FILE (census, neither extracted nor ruled): ${f}`);
for (const f of staleFiles) console.log(`STALE FILE (ruled but extracted, or not in the census): ${f}`);
const verdict = unruled.length === 0 && stale.length === 0 && unruledFiles.length === 0 && staleFiles.length === 0;
console.log(`V-C ${verdict ? "GREEN" : "RED"}: ${unruled.length} unruled misses, ${stale.length} stale ruled rows, ${unruledFiles.length} unruled files, ${staleFiles.length} stale files`);
process.exitCode = verdict ? 0 : 1;

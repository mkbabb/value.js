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
import { readFileSync } from "node:fs";
import path from "node:path";
import { parseCssValue, serializeCssValue } from "../../src/css/index";

export const CASES_FILE = "cases-2026-10-07.json";

type Case = Readonly<{ module: string; file: string; kind: "valid" | "invalid"; property: string; input: string; expected?: readonly string[] }>;
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

function judge(c: Case): Miss | null {
    const parsed = parseCssValue(c.input);
    if (c.kind === "invalid") return parsed.ok ? { c, why: "accepted" } : null;
    if (!parsed.ok) return { c, why: "refused" };
    const text = serializeCssValue(parsed.value);
    if (!text.ok) return { c, why: "serialize-error" };
    return (c.expected ?? [c.input]).includes(text.value) ? null : { c, why: "serialization", actual: text.value };
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
console.log(`V-C · WPT ${corpus.wptCommit.slice(0, 12)} · ${CASES_FILE} · ${corpus.count} cases · ${ruledRows.length} ruled rows`);
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
const verdict = unruled.length === 0 && stale.length === 0;
console.log(`V-C ${verdict ? "GREEN" : "RED"}: ${unruled.length} unruled misses, ${stale.length} stale ruled rows`);
process.exitCode = verdict ? 0 : 1;

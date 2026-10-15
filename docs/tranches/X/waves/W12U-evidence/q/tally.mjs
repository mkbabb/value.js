// SERVED MODEL: claude-opus-5-5
// X.W12U.q — join a project's runs into one row per test (COHESION §0ev.2).
// usage: node tally.mjs <project> <tag1> [tag2 ...] [--tsv]     (a tag may be "r2a+r2b": batches of one run)
// Reads results/<tag>-<project>.json for each tag in order. tag1 is the whole
// project; later tags are re-runs of the previous tag's not-passed tests.
// Row: id · title · per run "status@load(:errLine)" · class
//   PASS     passed in tag1
//   FLAKE    not passed in an earlier run, passed in a later one
//   STEADY   not passed in every run it was given (n runs)
// Default output: every non-PASS row, then the counts. --tsv: tab-separated, all rows.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
const args = process.argv.slice(2);
const tsv = args.includes("--tsv");
const [project, ...tags] = args.filter((a) => a !== "--tsv");
const here = path.dirname(new URL(import.meta.url).pathname);
const samples = existsSync(path.join(here, "logs/load-samples.txt"))
    ? readFileSync(path.join(here, "logs/load-samples.txt"), "utf8").trim().split("\n").map((l) => { const p = l.split(" "); return [Number(p[0]) * 1000, Number(p[3])]; })
    : [];
const loadAt = (ms) => {
    let best = null;
    for (const s of samples) if (best === null || Math.abs(s[0] - ms) < Math.abs(best[0] - ms)) best = s;
    return best && Math.abs(best[0] - ms) < 60_000 ? best[1].toFixed(0) : "?";
};
const strip = (s) => String(s ?? "").replace(/\u001b\[[0-9;]*m/g, "");
const rows = new Map();
let notRun = 0;
let interrupted = false;
// A run column may be several batch files joined with "+", e.g. r2a+r2b.
tags.forEach((group, ti) => group.split("+").forEach((tag) => {
    const f = path.join(here, `results/${tag}-${project}.json`);
    if (!existsSync(f)) return;
    const walk = (suite, trail = []) => {
        const here2 = suite.title && !/\.spec\.ts$/.test(suite.title) ? [...trail, suite.title] : trail;
        for (const s of suite.suites ?? []) walk(s, here2);
        for (const spec of suite.specs ?? [])
            for (const t of spec.tests ?? []) {
                const r = t.results?.[t.results.length - 1];
                // An interrupted report lists the tests it never reached with no result
                // (or "skipped" at 0 ms) and the one it was in as "interrupted": not a run.
                if (!r || r.status === "interrupted" || (interrupted && r.status === "skipped")) {
                    if (ti === 0) notRun++;
                    continue;
                }
                const key = `${spec.file}:${spec.line} › ${[...here2, spec.title].join(" › ")}`;
                const row = rows.get(key) ?? { id: `${spec.file}:${spec.line}`, title: spec.title, runs: [] };
                const loc = r?.error?.location ?? r?.errors?.[0]?.location;
                const err = strip(r?.error?.message ?? r?.errors?.[0]?.message ?? "").split("\n").filter(Boolean)[0] ?? "";
                row.runs[ti] = { st: r?.status ?? "skipped", load: loadAt(Date.parse(r?.startTime ?? 0)), line: loc?.line, err: err.slice(0, 130), s: Math.round((r?.duration ?? 0) / 1000) };
                rows.set(key, row);
            }
    };
    const text = readFileSync(f, "utf8");
    const report = JSON.parse(text);
    interrupted = /"status":\s*"interrupted"/.test(text);
    for (const s of report.suites ?? []) walk(s);
}));
const count = { PASS: 0, FLAKE: 0, STEADY: 0, SKIPPED: 0 };
const out = [];
for (const row of rows.values()) {
    const given = row.runs.filter(Boolean);
    const first = given[0];
    let cls;
    if (first.st === "skipped") cls = "SKIPPED";
    else if (first.st === "passed") cls = "PASS";
    else if (given.some((r) => r.st === "passed")) cls = "FLAKE";
    else cls = "STEADY";
    count[cls]++;
    row.cls = cls;
    row.n = given.length;
    out.push(row);
}
const cell = (r) => (r ? `${r.st}@${r.load}${r.line ? ":" + r.line : ""}/${r.s}s` : "-");
for (const row of out) {
    if (!tsv && (row.cls === "PASS" || row.cls === "SKIPPED")) continue;
    const last = [...row.runs].reverse().find((r) => r && r.st !== "passed");
    const cols = [row.cls + (row.cls === "STEADY" ? `x${row.n}` : ""), row.id, row.title.slice(0, 80), ...tags.map((_, i) => cell(row.runs[i])), last?.err ?? ""];
    console.log(cols.join(tsv ? "\t" : " · "));
}
if (!tsv) console.log(`COUNT ${project} [${tags.join(",")}] total=${out.length} PASS=${count.PASS} FLAKE=${count.FLAKE} STEADY=${count.STEADY} SKIPPED=${count.SKIPPED} notRunInFirstTag=${notRun}`);

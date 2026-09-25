// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l4 — THE ITEM-WALK SPLIT of the large-sheet cell (W7.md ADDENDUM (f) 1). `build.mjs`'s recorder arm logs
// every reader call `parseStylesheet` makes over the G-large sheets (ruleList, atPrelude, splitTopLevel, declaration,
// …); this probe replays each reader over exactly those arguments, UNINSTRUMENTED, on the product, plus parseCssValue
// over the values the recorded `declaration` calls return, and the whole parseStylesheet. The remainder (whole −
// Σ readers − values) is the stylesheet layer's own JS: assembly, freezing, result objects. One engine per page.
//   node bench/paired/readers.mjs <tag> [engines=node,firefox] [rounds=11]
// `R:<name>` rows time the retired arm's counterpart over the same arguments (retired-split.mjs, built by phases.mjs).
// Writes bench/records/2026-09-25-x-p-w7-readers-<tag>.json.
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, RECORDS, REPO, largeSheets, median, uptime } from "./common.mjs";

const [TAG = "run", ENG = "node,firefox", ROUNDS = "11"] = process.argv.slice(2);
const sheets = largeSheets().map((s) => s.text);
const recorder = await import(path.join(BUILD, "recorder.mjs"));
globalThis.__readerLog = globalThis.__readerLog ?? [];
globalThis.__recording = true;
for (const s of sheets) recorder.css.parseStylesheet(s);
globalThis.__recording = false;
const calls = {};
// splitTopLevel is keyed by its separator (`splitTopLevel;` / `splitTopLevel,` / …): one list reader per separator.
for (const [n, ...a] of globalThis.__readerLog) (calls[n === "splitTopLevel" ? `${n}${a[1]}` : n] ??= []).push(a);
const product = await import(path.join(BUILD, "product.mjs"));
calls.parseCssValue = (calls.declaration ?? []).map(([row]) => product.sheet.declaration(row)).filter(Boolean).map((d) => [d.value]);
const counts = Object.fromEntries(Object.entries(calls).map(([n, xs]) => [n, xs.length]));

function install(m, ret, sheets, calls) {
    const fns = { parseStylesheet: m.css.parseStylesheet, parseCssValue: m.css.parseCssValue, splitTopLevel: m.splitTopLevel, ...m.sheet };
    // The retired arm's counterparts over the same arguments (`R:`): its whole parse, its rule-list scan (`blocks`),
    // its value parser and its list splitter.
    const R = { ruleList: ret.blocks, parseCssValue: ret.hand.parseCssValue, splitTopLevel: ret.hand.splitTopLevel };
    globalThis.split = (rounds) => {
        const jobs = { whole: () => { for (let i = 0; i < sheets.length; i++) fns.parseStylesheet(sheets[i]); },
            "R:whole": () => { for (let i = 0; i < sheets.length; i++) ret.parseStylesheet(sheets[i]); } };
        // Per sheet, both arms (`whole@i` / `R:whole@i`): the arms' refusal points differ by sheet.
        sheets.forEach((x, i) => { jobs[`whole@${i}`] = () => fns.parseStylesheet(x); jobs[`R:whole@${i}`] = () => ret.parseStylesheet(x); });
        for (const [n, xs] of Object.entries(calls)) {
            const f = R[n.startsWith("splitTopLevel") ? "splitTopLevel" : n];
            if (f) jobs[`R:${n}`] = () => { for (let i = 0; i < xs.length; i++) f(...xs[i]); };
        }
        for (const [n, xs] of Object.entries(calls)) { const f = fns[n.startsWith("splitTopLevel") ? "splitTopLevel" : n]; jobs[n] = () => { for (let i = 0; i < xs.length; i++) f(...xs[i]); }; }
        const names = Object.keys(jobs), t = Object.fromEntries(names.map((n) => [n, []]));
        for (let w = 0; w < 5; w++) for (const n of names) jobs[n]();
        for (let r = 0; r < rounds; r++) for (const n of names) { const K = 8, t0 = performance.now(); for (let k = 0; k < K; k++) jobs[n](); t[n].push((performance.now() - t0) / K); }
        return t;
    };
}

const record = { tag: TAG, instrument: "bench/paired/readers.mjs (X.P.W7.l4)", counts, results: [] };
for (const eng of ENG.split(",")) {
    const u0 = uptime();
    let t;
    if (eng === "node") { install(product, await import(path.join(BUILD, "retired-split.mjs")), sheets, calls); t = globalThis.split(+ROUNDS); }
    else {
        const entryFile = path.join(BUILD, `readers-entry-${TAG}.mjs`), bundle = path.join(BUILD, `readers-${TAG}.js`);
        writeFileSync(entryFile, `import * as m from ${JSON.stringify(path.join(BUILD, "product.mjs"))};
import * as ret from ${JSON.stringify(path.join(BUILD, "retired-split.mjs"))};
(${install.toString()})(m, ret, ${JSON.stringify(sheets)}, ${JSON.stringify(calls)});
`);
        await build({ entryPoints: [entryFile], outfile: bundle, bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "warning",
            absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")] });
        const { [eng]: L } = await import(path.join(REPO, "node_modules/playwright/index.mjs"));
        const browser = await L.launch(), page = await browser.newPage();
        await page.addScriptTag({ path: bundle });
        t = await page.evaluate((n) => globalThis.split(n), +ROUNDS);
        await browser.close();
    }
    const ms = Object.fromEntries(Object.entries(t).map(([n, xs]) => [n, +median(xs).toFixed(3)]));
    const parts = Object.entries(ms).filter(([n]) => n !== "whole" && !n.startsWith("R:") && !n.startsWith("whole@")).reduce((a, [, v]) => a + v, 0);
    record.results.push({ engine: eng, msPerPass: ms, remainder: +(ms.whole - parts).toFixed(3), uptime: [u0, uptime()] });
    console.log(`${eng} ${JSON.stringify(ms)} remainder(whole − Σ readers − values) ${(ms.whole - parts).toFixed(3)} load ${[u0, uptime()].map((u) => u.split("averages:")[1].trim().split(" ")[0]).join("→")}`);
}
mkdirSync(RECORDS, { recursive: true });
const out = path.join(RECORDS, `2026-09-25-x-p-w7-readers-${TAG}.json`);
writeFileSync(out, JSON.stringify(record, null, 1));
console.log(`counts ${JSON.stringify(counts)} · wrote ${path.relative(REPO, out)}`);

// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l — runs the INSTRUMENTED arm (`instrument.mjs` → `_build/instrumented.mjs`) over a cell and banks the per-rule
// profile: node (V8, the control) in-process, Chromium / WebKit (JSC) / Firefox (SpiderMonkey) in one fresh Playwright
// page each. A cell = entry × class (whole / acc / rej split by the retired arm's verdict, as bench.mjs; large = the
// G-large sheets). Warm-up passes, then `resetProfile()`, then `passes` timed passes. Counts are exact and the same
// on every engine (one code path); times are inclusive per function and carry the timer's own cost, so they rank
// rules within an engine, and the paired bench (browser.mjs / isolated.mjs) stays the only speed verdict.
//   node bench/paired/profile.mjs <tag> [engines=node,chromium,webkit,firefox] [cells=parseStylesheet:large,parseStylesheet:rej] [passes=3]
// Writes bench/records/2026-09-24-x-p-w7-profile-<tag>.json.
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, INPUTS, RECORDS, REPO, largeSheets } from "./common.mjs";

const [TAG = "run", ENG = "node,chromium,webkit,firefox", CELLS = "parseStylesheet:large,parseStylesheet:rej", PASSES = "3"] = process.argv.slice(2);
const cells = CELLS.split(",").map((c) => c.split(":"));

/** The in-page / in-process half: `run(entry, cls, passes)` → the profile of `passes` passes after warm-up. */
function install(inst, retired, inputs, sheets) {
    const WARM = 2;
    globalThis.run = (entry, cls, passes) => {
        const fn = inst.css[entry], ret = entry === "parseStylesheet" ? retired.parseStylesheet : retired.hand[entry];
        const accepts = (s) => { try { return ret(s)?.ok === true; } catch { return false; } };
        const xs = cls === "whole" ? inputs : cls === "acc" ? inputs.filter(accepts) : cls === "rej" ? inputs.filter((s) => !accepts(s)) : sheets;
        const pass = () => { for (let i = 0; i < xs.length; i++) fn(xs[i]); };
        for (let w = 0; w < WARM; w++) pass();
        inst.parser.resetProfile();
        const t0 = performance.now();
        for (let p = 0; p < passes; p++) pass();
        const wallMs = performance.now() - t0;
        return { entry, class: cls, n: xs.length, passes, wallMs, profile: inst.parser.profile() };
    };
}

/** The table a record keeps: per function (calls, fails, inclusive ms, discarded action values), per action, per entry. */
function tables(r) {
    const p = r.profile, per = (x) => x / r.passes;
    const fns = p.slots.map((label, j) => ({ label, calls: per(p.calls[j]), fails: per(p.fails[j]), ms: +per(p.time[j]).toFixed(3), discarded: per(p.discarded[j]) }))
        .filter((f) => f.calls > 0).sort((a, b) => b.ms - a.ms);
    const acts = p.actions.map((name, j) => ({ name, calls: per(p.actionCalls[j]), ms: +per(p.actionTime[j]).toFixed(3) })).filter((a) => a.calls > 0).sort((a, b) => b.ms - a.ms);
    const ents = p.entries.map((name, j) => ({ name, calls: per(p.entryCalls[j]), refused: per(p.entryFails[j]), ms: +per(p.entryTime[j]).toFixed(3) })).filter((e) => e.calls > 0).sort((a, b) => b.ms - a.ms);
    const sum = (xs, k) => xs.reduce((a, x) => a + x[k], 0);
    return { entry: r.entry, class: r.class, n: r.n, wallMsPerPass: +per(r.wallMs).toFixed(2), entryMsPerPass: +sum(ents, "ms").toFixed(2),
        glueMsPerPass: +(per(r.wallMs) - sum(ents, "ms")).toFixed(2), actionMsPerPass: +sum(acts, "ms").toFixed(2),
        calls: sum(fns, "calls"), fails: sum(fns, "fails"), actionCalls: sum(acts, "calls"), discarded: sum(fns, "discarded"),
        entries: ents, functions: fns.slice(0, 40), actions: acts.slice(0, 25) };
}

const record = { tag: TAG, instrument: "bench/paired/profile.mjs (X.P.W7.l)", passes: +PASSES, cells: CELLS,
    valuejsHead: execSync(`git -C "${REPO}" rev-parse HEAD`, { encoding: "utf8" }).trim(), uptimeStart: execSync("uptime", { encoding: "utf8" }).trim(), versions: {}, results: [] };
const sheets = largeSheets().map((s) => s.text);
for (const eng of ENG.split(",")) {
    if (eng === "node") {
        install(await import(path.join(BUILD, "instrumented.mjs")), await import(path.join(BUILD, "retired.mjs")), INPUTS, sheets);
        record.versions.node = process.version;
        for (const [entry, cls] of cells) record.results.push({ engine: eng, ...tables(globalThis.run(entry, cls, +PASSES)) });
    } else {
        const entryFile = path.join(BUILD, `profile-entry-${TAG}.mjs`), bundle = path.join(BUILD, `profile-${TAG}.js`);
        writeFileSync(entryFile, `import * as inst from ${JSON.stringify(path.join(BUILD, "instrumented.mjs"))};
import * as retired from ${JSON.stringify(path.join(BUILD, "retired.mjs"))};
(${install.toString()})(inst, retired, ${JSON.stringify(INPUTS)}, ${JSON.stringify(sheets)});
`);
        await build({ entryPoints: [entryFile], outfile: bundle, bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "warning",
            absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")] });
        const { [eng]: L } = await import(path.join(REPO, "node_modules/playwright/index.mjs"));
        const browser = await L.launch();
        record.versions[eng] = browser.version();
        for (const [entry, cls] of cells) {
            const page = await browser.newPage();
            await page.addScriptTag({ path: bundle });
            const r = await page.evaluate(([e, c, p]) => globalThis.run(e, c, p), [entry, cls, +PASSES]);
            await page.close();
            record.results.push({ engine: eng, ...tables(r) });
        }
        await browser.close();
    }
    for (const r of record.results.filter((x) => x.engine === eng)) {
        console.log(`${eng} ${r.entry}:${r.class} n=${r.n} wall ${r.wallMsPerPass} ms/pass · entries ${r.entryMsPerPass} · glue ${r.glueMsPerPass} · actions ${r.actionMsPerPass} · calls ${r.calls} fails ${r.fails} actionCalls ${r.actionCalls} discarded ${r.discarded}`);
    }
}
record.uptimeEnd = execSync("uptime", { encoding: "utf8" }).trim();
mkdirSync(RECORDS, { recursive: true });
const out = path.join(RECORDS, `2026-09-24-x-p-w7-profile-${TAG}.json`);
writeFileSync(out, JSON.stringify(record, null, 1));
console.log(`wrote ${path.relative(REPO, out)}`);

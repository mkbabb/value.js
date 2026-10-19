// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l — BISECTION of a RED cell, uninstrumented (W7.md ADDENDUM (b) 1). Each probe is one slice of the work a
// cell does, timed as whole passes (no per-call timer), interleaved over rounds with the retired parser's whole cell
// in the same process / page; the answer is each probe's median share of the retired cell's time. Arms: the retired
// bundle and `_build/probe.mjs` (`instrument.mjs`: the SHIPPED module, the parser exposed). node (V8, control) runs
// in-process; Chromium / WebKit / Firefox in one fresh Playwright page per engine.
//   node bench/paired/bisect.mjs <tag> [engines=node,chromium,webkit,firefox] [cls=large] [rounds=11] [probes=all]
// Writes bench/records/2026-09-24-x-p-w7-bisect-<tag>.json.
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, INPUTS, RECORDS, REPO, largeSheets } from "./common.mjs";

const [TAG = "run", ENG = "node,chromium,webkit,firefox", CLS = "large", ROUNDS = "11", ONLY = ""] = process.argv.slice(2);

function install(P, R, inputs, sheets) {
    const accepts = (s) => { try { return R.parseStylesheet(s)?.ok === true; } catch { return false; } };
    const xs = CLS_ === "large" ? sheets : CLS_ === "rej" ? inputs.filter((s) => !accepts(s)) : inputs.filter(accepts);
    const E = P.parser.entries;
    // Each probe: one pass over the cell's sources.
    const probes = {
        retired: () => { for (const s of xs) R.parseStylesheet(s); },
        product: () => { for (const s of xs) P.css.parseStylesheet(s); },
        ruleList: () => { for (const s of xs) E.ruleList(s); },
        // The rule list's blocks, each body read as declarations (the style-rule path's grammar half).
        declarations: () => { for (const s of DECL) E.semiItems(s); },
        values: () => { for (const s of VALS) E.valueTop(s); },
        declaration: () => { for (const s of DECLS) E.declaration(s); },
        // The class split by the rule list's own verdict: sources whose rule list ends on a fault, and the rest.
        retiredFault: () => { for (const s of FAULT) R.parseStylesheet(s); },
        productFault: () => { for (const s of FAULT) P.css.parseStylesheet(s); },
        ruleListFault: () => { for (const s of FAULT) E.ruleList(s); },
        wrapperFault: () => { for (const s of FAULT) P.sheet.ruleList(s); },
        failureFault: () => { for (const s of FAULT) P.failure(s, "css_syntax", ["rule"], 0); },
        retiredBlocks: () => { for (const s of BLOCKS) R.parseStylesheet(s); },
        productBlocks: () => { for (const s of BLOCKS) P.css.parseStylesheet(s); },
    };
    const FAULT = xs.filter((s) => E.ruleList(s)?.fault !== undefined), BLOCKS = xs.filter((s) => E.ruleList(s)?.fault === undefined);
    // The inputs the style-rule path hands its entries, harvested once from the product's own reads.
    const DECL = [], VALS = [], DECLS = [];
    for (const s of xs) { const v = E.ruleList(s); for (const b of (v && v.blocks) || []) if (b.body !== null) DECL.push(b.body); }
    for (const b of DECL) { const items = E.semiItems(b); if (Array.isArray(items)) for (const d of items) { if (typeof d === "string" && d.trim()) { DECLS.push(d); const c = d.indexOf(":"); if (c > 0) VALS.push(d.slice(c + 1).trim()); } } }
    globalThis.bisect = (names, rounds) => {
        const t = Object.fromEntries(names.map((n) => [n, []]));
        for (const n of names) for (let w = 0; w < 3; w++) probes[n]();
        for (let r = 0; r < rounds; r++) {
            const order = names.map((_, i) => names[(i + r) % names.length]);
            if (r % 2) order.reverse();
            for (const n of order) { const t0 = performance.now(); probes[n](); probes[n](); t[n].push(performance.now() - t0); }
        }
        const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };
        return { n: xs.length, harvested: { bodies: DECL.length, declarations: DECLS.length, values: VALS.length, fault: FAULT.length, blocks: BLOCKS.length },
            ms: Object.fromEntries(names.map((n) => [n, +(med(t[n]) / 2).toFixed(2)])),
            ofRetired: Object.fromEntries(names.map((n) => [n, +med(t[n].map((x, i) => x / t.retired[i])).toFixed(3)])) };
    };
}

const PROBES = ONLY ? ["retired", ...ONLY.split(",")] : ["retired", "product", "ruleList", "declarations", "declaration", "values"];
const sheets = largeSheets().map((s) => s.text);
const record = { tag: TAG, instrument: "bench/paired/bisect.mjs (X.P.W7.l)", cls: CLS, rounds: +ROUNDS, probes: PROBES,
    valuejsHead: execSync(`git -C "${REPO}" rev-parse HEAD`, { encoding: "utf8" }).trim(), uptimeStart: execSync("uptime", { encoding: "utf8" }).trim(), versions: {}, results: {} };
const src = install.toString().replace("CLS_", JSON.stringify(CLS)).replaceAll("CLS_", JSON.stringify(CLS));
for (const eng of ENG.split(",")) {
    let r;
    if (eng === "node") {
        (0, eval)(`(${src})`)(await import(path.join(BUILD, "probe.mjs")), await import(path.join(BUILD, "retired.mjs")), INPUTS, sheets);
        record.versions.node = process.version;
        r = globalThis.bisect(PROBES, +ROUNDS);
    } else {
        const entryFile = path.join(BUILD, `bisect-entry-${TAG}.mjs`), bundle = path.join(BUILD, `bisect-${TAG}.js`);
        writeFileSync(entryFile, `import * as P from ${JSON.stringify(path.join(BUILD, "probe.mjs"))};
import * as R from ${JSON.stringify(path.join(BUILD, "retired.mjs"))};
(${src})(P, R, ${JSON.stringify(INPUTS)}, ${JSON.stringify(sheets)});
`);
        await build({ entryPoints: [entryFile], outfile: bundle, bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "warning",
            absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")] });
        const { [eng]: L } = await import(path.join(REPO, "node_modules/playwright/index.mjs"));
        const browser = await L.launch();
        record.versions[eng] = browser.version();
        const page = await browser.newPage();
        await page.addScriptTag({ path: bundle });
        r = await page.evaluate(([p, n]) => globalThis.bisect(p, n), [PROBES, +ROUNDS]);
        await browser.close();
    }
    record.results[eng] = r;
    console.log(`${eng} n=${r.n} ${JSON.stringify(r.harvested)} ` + PROBES.map((p) => `${p} ${r.ms[p]}ms (${r.ofRetired[p]})`).join(" · "));
}
record.uptimeEnd = execSync("uptime", { encoding: "utf8" }).trim();
const out = path.join(RECORDS, `2026-09-24-x-p-w7-bisect-${TAG}.json`);
writeFileSync(out, JSON.stringify(record, null, 1));
console.log(`wrote ${path.relative(REPO, out)}`);

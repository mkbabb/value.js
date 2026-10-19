// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l4 — THE PHASE SPLIT of the accepted large-sheet cell (W7.md ADDENDUM (f) 1). The `.l` profile ranks rules
// inside one engine but carries its timer's cost; this probe times, UNINSTRUMENTED and paired in one page (or one
// node process), the two halves of `parseStylesheet` on the G-large sheets for every arm:
//   sheet   parseStylesheet over the sheets (the cell browser.mjs gates)
//   values  parseCssValue over every declaration value those sheets carry (harvested once, in node, through the
//           product's readers), each arm's own parseCssValue
//   rules   the product's top-level rule list alone (`sheet.ruleList`) against the retired arm's WHOLE parseStylesheet:
//           against the retired arm's own rule-list scan (`blocks`, module-private at 2155142b: `_build/retired-split.mjs`
//           re-bundles the retired arm with that one function exported, its bytes unchanged)
// sheet − values is the arm's STRUCTURE layer (rule list, declaration split, preludes, selectors, assembly, freeze).
// Arms: `retired` + the product (+ any `_build/<arm>.mjs` named). Rounds interleave and rotate like browser.mjs.
//   node bench/paired/phases.mjs <tag> [engines=node,firefox,chromium,webkit] [rounds=11] [arms=product]
// Writes bench/records/2026-09-25-x-p-w7-phases-<tag>.json.
import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, RECORDS, REPO, largeSheets, median, uptime } from "./common.mjs";

const [TAG = "run", ENG = "node,firefox,chromium,webkit", ROUNDS = "11", ARMS = "product"] = process.argv.slice(2);
const armNames = ["retired", ...ARMS.split(",")];
const RET_SHEET = path.join(BUILD, "retired-src/src/css/stylesheet.ts");
const RET_ENTRY = path.join(BUILD, "retired-split-entry.ts");
writeFileSync(RET_ENTRY, `export * as hand from ${JSON.stringify(path.join(BUILD, "retired-src/src/css/grammar.ts"))};
export { parseStylesheet, blocks } from ${JSON.stringify(RET_SHEET)};
`);
await build({ entryPoints: [RET_ENTRY], outfile: path.join(BUILD, "retired-split.mjs"), bundle: true, platform: "node",
    format: "esm", target: "node22", logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")],
    plugins: [{ name: "export-blocks", setup(b) {
        b.onLoad({ filter: /retired-src\/src\/css\/stylesheet\.ts$/ }, (a) => (a.path === RET_SHEET
            ? { contents: `${readFileSync(a.path, "utf8")}\nexport { blocks };\n`, loader: "ts" } : undefined));
        b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
        b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
    } }] });
const armFile = (a) => path.join(BUILD, `${a === "retired" ? "retired-split" : a}.mjs`);
const sheets = largeSheets().map((s) => s.text);

// Harvest the declaration values (the product's readers; the retired arm reads the same texts).
const probe = await import(path.join(BUILD, "product.mjs"));
const values = [];
const walk = (text) => {
    for (const b of probe.sheet.ruleList(text).blocks) {
        if (b.body === null) continue;
        const at = probe.sheet.atPrelude(b.prelude.trim());
        if (at !== null) { walk(b.body); continue; }
        for (const row of probe.splitTopLevel(b.body, ";") ?? []) {
            const d = probe.sheet.declaration(row);
            if (d) values.push(d.value);
        }
    }
};
for (const s of sheets) walk(s);

function install(arms, sheets, values) {
    const F = {};
    for (const [name, m] of Object.entries(arms)) {
        F[name] = name === "retired" ? { sheet: m.parseStylesheet, values: m.hand.parseCssValue, rules: m.blocks }
            : { sheet: m.css.parseStylesheet, values: m.css.parseCssValue, rules: m.sheet.ruleList };
    }
    globalThis.phase = (ph, rounds, floor) => {
        const names = Object.keys(F), xs = ph === "values" ? values : sheets;
        const pass = (fn, k) => { const t = performance.now(); for (let j = 0; j < k; j++) for (let i = 0; i < xs.length; i++) fn(xs[i]); return performance.now() - t; };
        for (let w = 0; w < 3; w++) for (const a of names) pass(F[a][ph], 1);
        let k = 1; while (pass(F.retired[ph], k) < floor) k *= 2;
        const t = Object.fromEntries(names.map((a) => [a, []]));
        for (let r = 0; r < rounds; r++) {
            const order = names.map((_, i) => names[(i + r) % names.length]);
            if (Math.floor(r / names.length) % 2) order.reverse();
            for (const a of order) t[a].push(pass(F[a][ph], k) / k);
        }
        return { k, t };
    };
}

const summarise = (eng, ph, { k, t }) => {
    const out = { engine: eng, phase: ph, k, msPerPass: {}, ratio: {} };
    for (const a of Object.keys(t)) {
        out.msPerPass[a] = +median(t[a]).toFixed(3);
        if (a !== "retired") out.ratio[a] = +median(t[a].map((x, i) => x / t.retired[i])).toFixed(3);
    }
    return out;
};

const record = { tag: TAG, instrument: "bench/paired/phases.mjs (X.P.W7.l4)", rounds: +ROUNDS, arms: armNames, sheets: sheets.length, values: values.length, results: [] };
const PHASES = ["sheet", "values", "rules"];
const FLOOR = { node: 50, chromium: 50, webkit: 50, firefox: 100 };
for (const eng of ENG.split(",")) {
    const u0 = uptime();
    if (eng === "node") {
        install(Object.fromEntries(await Promise.all(armNames.map(async (a) => [a, await import(armFile(a))]))), sheets, values);
        for (const ph of PHASES) record.results.push({ ...summarise(eng, ph, globalThis.phase(ph, +ROUNDS, FLOOR.node)), uptime: [u0, uptime()] });
    } else {
        const entryFile = path.join(BUILD, `phases-entry-${TAG}.mjs`), bundle = path.join(BUILD, `phases-${TAG}.js`);
        writeFileSync(entryFile, `${armNames.map((a, i) => `import * as a${i} from ${JSON.stringify(armFile(a))};`).join("\n")}
(${install.toString()})({ ${armNames.map((a, i) => `${JSON.stringify(a)}: a${i}`).join(", ")} }, ${JSON.stringify(sheets)}, ${JSON.stringify(values)});
`);
        await build({ entryPoints: [entryFile], outfile: bundle, bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "warning",
            absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")] });
        const { [eng]: L } = await import(path.join(REPO, "node_modules/playwright/index.mjs"));
        const browser = await L.launch();
        for (const ph of PHASES) {
            const page = await browser.newPage();
            await page.addScriptTag({ path: bundle });
            const r = await page.evaluate(([p, n, f]) => globalThis.phase(p, n, f), [ph, +ROUNDS, FLOOR[eng]]);
            await page.close();
            record.results.push({ ...summarise(eng, ph, r), uptime: [u0, uptime()] });
        }
        await browser.close();
    }
    for (const r of record.results.filter((x) => x.engine === eng)) console.log(`${eng} ${r.phase} k=${r.k} ms/pass ${JSON.stringify(r.msPerPass)} ratio ${JSON.stringify(r.ratio)} load ${r.uptime.map((u) => u.split("averages:")[1].trim().split(" ")[0]).join("→")}`);
}
mkdirSync(RECORDS, { recursive: true });
const out = path.join(RECORDS, `2026-09-25-x-p-w7-phases-${TAG}.json`);
writeFileSync(out, JSON.stringify(record, null, 1));
console.log(`values ${values.length} · wrote ${path.relative(REPO, out)}`);

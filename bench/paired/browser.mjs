// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.g — THE BROWSER PAIRED INSTRUMENT (G-browser: Chromium, WebKit, Firefox via Playwright; V-5 and V-6), promoted
// from the `.v`/`.k2` scratch harness. The arms are `build.mjs`'s `_build/<arm>.mjs` bundles (retired + product, or
// any extra arm copied there, e.g. a lever's before-bytes); they are bundled with `browser-page.mjs` and the sources
// into `_build/browser-<tag>.js`. One fresh page per cell, the retired parser in the same page. Per engine and rep the
// entry order rotates; odd reps reverse the arm list. HYGIENE (isolated.mjs's rule): a cell whose retired passes
// spread ≥ 1.6× is SET ASIDE — kept, counted, reported, never averaged in — and re-run (≤ 3 re-runs per position).
// `uptime` before and after every cell. Floors: 20 ms, Firefox 100 ms. X.P.W8 Repair 1 (ESC-W8lg1-1): Firefox's content process runs at the default scheduling priority (31)
// while Chromium's and WebKit's run elevated (46–54), so on a loaded host SpiderMonkey's page alone is starved and
// preempted mid-pass (measured 2026-10-09: ~1 M performance.now() spins/s at load ~150). Firefox therefore reads
// SLICED rounds (browser-page.mjs: 16 slices, the least of 5 interleaved repeats per slice — preemption only adds time),
// which needs a fine clock, so it is launched with its timer precision unreduced (`privacy.reduceTimerPrecision:
// false`; Firefox 150: the default 1 ms clamp → 0.02 ms); Chromium (0.1 ms) and WebKit (1 ms) keep the unsliced pass
// (slices = repeats = 1). LAUNCH and SLICING are recorded. The record is written to
// bench/records/2026-09-24-x-p-w7-browser-<tag>.json. Classes: `large-eq` is the equal-work large cell of record (X.P.W7
// `.eq`, ADDENDUM (g): bench/corpus/large-prefix-2026-09-25/); `large` (the whole sheets, unequal work) is INFO.
//   node bench/paired/browser.mjs <tag> [engines=chromium,webkit,firefox] [reps=2] [classes=whole,acc,rej,large-eq,large]
//        [rounds=11] [arms=product] [entries=all]
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, ENTRIES, HERE, INPUTS, RECORDS, REPO, largePrefixSheets, largeSheets, median } from "./common.mjs";

const [TAG = "run", ENG = "chromium,webkit,firefox", REPS = "2", CLASSES = "whole,acc,rej,large-eq,large", ROUNDS = "11", ARMS = "product", ONLY = ""] = process.argv.slice(2);
// RERUNS: the spread re-runs inform only (the §0ev.1 gate reads attempt 0, bootstrap.mjs); PAIRED_RERUNS=0 reads attempt 0 alone.
const SPREAD = 1.6, RERUNS = Number(process.env.PAIRED_RERUNS ?? 3), FLOOR = { chromium: 20, webkit: 20, firefox: 100 };
const LAUNCH = { chromium: {}, webkit: {}, firefox: { firefoxUserPrefs: { "privacy.reduceTimerPrecision": false } } };
const SLICING = { chromium: [1, 1], webkit: [1, 1], firefox: [16, 5] };
if (Number(ROUNDS) < 11) throw new Error("≥ 11 rounds");
const arms = ["retired", ...ARMS.split(",").filter((a) => a && a !== "retired")];
const entries = ONLY ? ONLY.split(",") : ENTRIES;
const { chromium, webkit, firefox } = await import(path.join(REPO, "node_modules/playwright/index.mjs"));
const L = { chromium, webkit, firefox };

const entryFile = path.join(BUILD, `browser-entry-${TAG}.mjs`);
writeFileSync(entryFile, `import { install } from ${JSON.stringify(path.join(HERE, "browser-page.mjs"))};
${arms.map((a, i) => `import * as a${i} from ${JSON.stringify(path.join(BUILD, `${a}.mjs`))};`).join("\n")}
install({ ${arms.map((a, i) => `${JSON.stringify(a)}: a${i}`).join(", ")} }, ${JSON.stringify(INPUTS)}, ${JSON.stringify(largeSheets().map((s) => s.text))}, ${JSON.stringify(largePrefixSheets().map((s) => s.text))});
`);
const bundle = path.join(BUILD, `browser-${TAG}.js`);
await build({ entryPoints: [entryFile], outfile: bundle, bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "warning",
    absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")], define: { "process.env.NODE_ENV": '"production"' } });
const up = () => execSync("uptime", { encoding: "utf8" }).trim();
const record = { tag: TAG, instrument: "bench/paired/browser.mjs (X.P.W7.g; sliced rounds X.P.W8 Repair 1)", arms, reps: +REPS, rounds: +ROUNDS, floors: FLOOR, launch: LAUNCH, slicing: SLICING, reruns: RERUNS, spreadRule: SPREAD,
    valuejsHead: execSync(`git -C "${REPO}" rev-parse HEAD`, { encoding: "utf8" }).trim(), uptimeStart: up(), versions: {}, cells: [] };
for (const eng of ENG.split(",")) {
    const browser = await L[eng].launch(LAUNCH[eng]);
    record.versions[eng] = browser.version();
    for (let rep = 0; rep < +REPS; rep++) {
        const order = entries.map((_, i) => entries[(i + rep) % entries.length]);
        for (const cls of CLASSES.split(",")) for (const entry of order) {
            if (cls.startsWith("large") && entry !== "parseStylesheet") continue;
            for (let attempt = 0; attempt <= RERUNS; attempt++) {
                const page = await browser.newPage();
                await page.addScriptTag({ path: bundle });
                const u0 = up();
                const c = await page.evaluate(([e, k, r, rv, f, sl, rp]) => globalThis.cell(e, k, r, rv, f, sl, rp), [entry, cls, +ROUNDS, rep % 2 === 1, FLOOR[eng], ...SLICING[eng]]);
                await page.close();
                const clean = c.spread < SPREAD;
                record.cells.push({ engine: eng, rep, attempt, clean, uptimeBefore: u0, uptimeAfter: up(), ...c });
                console.log(`${eng} r${rep}a${attempt} ${entry.padEnd(22)} ${cls.padEnd(8)} n=${c.n} k=${c.k} S=${c.slices} ` +
                    arms.slice(1).map((a) => `${a} x${c.ratio[a].paired} (${c.ratio[a].below1}/${ROUNDS}<1)`).join(" | ") + ` spread ${c.spread}${clean ? "" : " SET-ASIDE"}`);
                if (clean) break;
            }
        }
    }
    await browser.close();
}
record.uptimeEnd = up();
record.summary = {};
for (const a of arms.slice(1)) for (const c of record.cells) {
    const key = `${c.engine}|${c.class}|${c.entry}`;
    const row = ((record.summary[a] ??= {})[key] ??= { every: [], ratios: [] });
    row.every.push({ rep: c.rep, attempt: c.attempt, k: c.k, clean: c.clean, spread: c.spread, paired: c.ratio[a].paired });
    if (c.clean) row.ratios.push(c.ratio[a].paired);
}
for (const rows of Object.values(record.summary)) for (const r of Object.values(rows)) {
    r.median = r.ratios.length ? +median(r.ratios).toFixed(3) : null;
    r.allBelow1 = r.ratios.length > 0 && r.ratios.every((x) => x < 1);
}
mkdirSync(RECORDS, { recursive: true });
const file = path.join(RECORDS, `2026-09-24-x-p-w7-browser-${TAG}.json`);
writeFileSync(file, JSON.stringify(record, null, 1) + "\n");
console.log("\nSUMMARY (clean cells' paired ratio arm/retired; every rep listed, set-aside marked)");
for (const [a, rows] of Object.entries(record.summary)) for (const [k, v] of Object.entries(rows))
    console.log(a, k.padEnd(40), k.includes("|large|") ? "INFO" : v.allBelow1 ? "<1" : "RED", v.every.map((c) => `x${c.paired}${c.clean ? "" : "(SA)"}`).join(" "));
console.log(record.uptimeStart, "\n", record.uptimeEnd, "→", path.relative(process.cwd(), file));

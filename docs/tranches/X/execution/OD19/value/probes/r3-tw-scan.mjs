#!/usr/bin/env node
// OD19 repair 3 (C3-V-01) — what demo/styles/foundation.css hands the dev server's file watcher.
// Runs the stylesheet through vite's own CSS pipeline (`preprocessCSS`, the repo's vite.config.ts, serve)
// with Tailwind's automatic source detection ON (`@import "tailwindcss";`) and OFF
// (`@import "tailwindcss" source(none);`), and reports for each: the dependency files (vite watches every
// one), by top-level directory, the compile time, and the emitted rule-selector set; the selector diff
// must be empty (the explicit `@source` globs already cover every authored demo file).
// One mode per process: @tailwindcss/postcss caches its compiler per input file across calls.
// usage: node r3-tw-scan.mjs <auto|none> <out.json>   then: node r3-tw-scan.mjs diff <auto.json> <none.json> <out.json>
import { preprocessCSS, resolveConfig } from "vite";
import postcss from "postcss";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const REPO = path.resolve(import.meta.dirname, "../../../../../../..");
const ID = path.join(REPO, "demo/styles/foundation.css");
const [MODE, ...ARGS] = process.argv.slice(2);
if (MODE === "diff") {
    const [a, n] = ARGS.slice(0, 2).map((f) => JSON.parse(readFileSync(f, "utf8")));
    const A = new Set(a.selectors), N = new Set(n.selectors);
    const res = { auto: { ...a, selectors: A.size }, none: { ...n, selectors: N.size }, lostWithNone: [...A].filter((s) => !N.has(s)), gainedWithNone: [...N].filter((s) => !A.has(s)) };
    writeFileSync(ARGS[2], JSON.stringify(res, null, 2));
    console.log(JSON.stringify({ auto: { ms: a.ms, deps: a.deps, selectors: A.size, bytes: a.bytes }, none: { ms: n.ms, deps: n.deps, selectors: N.size, bytes: n.bytes, depsByDir: n.depsByDir }, lostN: res.lostWithNone.length, lost: res.lostWithNone.slice(0, 20), gainedN: res.gainedWithNone.length }));
    process.exit(0);
}
const src = readFileSync(ID, "utf8");
const config = await resolveConfig({ configFile: path.join(REPO, "vite.config.ts") }, "serve");
const out = {};
for (const mode of [MODE]) {
    const code = src.replace(/^@import "tailwindcss"[^;]*;/m, mode === "none" ? '@import "tailwindcss" source(none);' : '@import "tailwindcss";');
    const t = performance.now();
    const r = await preprocessCSS(code, ID, config);
    const ms = Math.round(performance.now() - t);
    const by = {};
    for (const d of r.deps ?? []) { const k = path.relative(REPO, d).split(path.sep).slice(0, d.includes("node_modules") ? 3 : 1).join("/"); by[k] = (by[k] ?? 0) + 1; }
    const sels = new Set(); postcss.parse(r.code).walkRules((rule) => sels.add(rule.selector));
    out[mode] = { ms, deps: r.deps?.size ?? 0, depsByDir: Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 10), selectors: sels, bytes: r.code.length };
}
writeFileSync(ARGS[0], JSON.stringify({ ...out[MODE], selectors: [...out[MODE].selectors] }));
console.log(MODE, out[MODE].ms, "ms", out[MODE].deps, "deps", out[MODE].selectors.size, "selectors");
process.exit(0);

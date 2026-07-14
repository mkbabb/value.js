// V · pass-4 · Charter ε — THE @-ABROGATION SURFACE CENSUS (durable instrument)
// ---------------------------------------------------------------------------
// Counts every `@`-alias import SITE in demo/ (the ~351-site abrogation the owner's
// clause-1 edict targets) and classifies each alias by its abrogation TARGET:
//   in-demo  → the alias points inside demo/@/ ; abrogation = a relative path (the
//              clean-break rewrite once demo/@/ is flattened to demo/).
//   x-bound  → the alias points OUTSIDE demo/ (repo-root src/ or assets/) ; a literal
//              relative rewrite crosses the demo boundary (deep, brittle ../../..).
//   dead     → 0 sites (already abrogated / retired).
// Re-runnable from the value.js repo root against any tree:
//   node docs/tranches/V/design/pass-4/instruments/alias-census.mjs

import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const DEMO = resolve("demo");
const ALIAS_TARGET = {
    "@components": { dir: "demo/@/components", scope: "in-demo" },
    "@composables": { dir: "demo/@/composables", scope: "in-demo" },
    "@lib": { dir: "demo/@/lib", scope: "in-demo" },
    "@utils": { dir: "demo/@/utils", scope: "in-demo" },
    "@styles": { dir: "demo/@/styles", scope: "in-demo" },
    "@src": { dir: "src", scope: "x-bound" },
    "@assets": { dir: "assets", scope: "x-bound" },
};

function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        const s = statSync(p);
        if (s.isDirectory()) {
            if (e === "node_modules" || e === "public" || e === "dist") continue;
            walk(p, acc);
        } else if (/\.(ts|vue|mts|css)$/.test(e)) acc.push(p);
    }
    return acc;
}
const files = walk(DEMO);

// count both `from "@x/..."`, dynamic `import("@x/...")`, bare side-effect
// `import "@x/..."`, and css `@import "@x/..."`.
const SITE_RE =
    /(?:from|import)\s*\(?\s*["']@([a-z]+)[\/"']|@import\s+["']@([a-z]+)[\/"']/g;
const counts = {};
for (const a of Object.keys(ALIAS_TARGET)) counts[a] = 0;
for (const f of files) {
    const src = readFileSync(f, "utf8");
    let m; SITE_RE.lastIndex = 0;
    while ((m = SITE_RE.exec(src))) {
        const a = "@" + (m[1] || m[2]);
        if (a in counts) counts[a]++;
    }
}

let total = 0, inDemo = 0, xBound = 0;
console.log("=== @-ABROGATION SURFACE (demo import sites per alias) ===\n");
console.log("alias\t\tsites\tscope\ttarget");
for (const [a, meta] of Object.entries(ALIAS_TARGET)) {
    const n = counts[a];
    const scope = n === 0 ? "DEAD" : meta.scope;
    console.log(`${a}\t${a.length < 8 ? "\t" : ""}${n}\t${scope}\t${meta.dir}`);
    total += n;
    if (n > 0 && meta.scope === "in-demo") inDemo += n;
    if (n > 0 && meta.scope === "x-bound") xBound += n;
}
console.log(`\nTOTAL sites: ${total}`);
console.log(`  in-demo (relative-rewrite): ${inDemo}`);
console.log(`  x-bound (crosses demo/ boundary — FORK): ${xBound}`);
console.log(`  dead (0 sites): ${Object.entries(counts).filter(([, n]) => n === 0).map(([a]) => a).join(", ") || "none"}`);

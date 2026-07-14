// V · pass-4 · Charter ε — THE panes/ ENCAPSULATION CARVE (durable instrument)
// ---------------------------------------------------------------------------
// The owner's clause-4: "Long running dirs must and always be broken into common
// modules and encapsulated thereof." panes/ is 16 flat files / ~2009 LoC. This
// instrument classifies each file and emits the chassis-carve PLAN + census:
//   CHASSIS  → a pane-FRAMEWORK primitive consumed by ≥2 sibling panes, or by the
//              router/dock/App shell as framework (PaneHeader/PaneSlot/PaneSegmented
//              Control/ConfigSliderPane). These are the "common modules" the long
//              dir is broken into → panes/chassis/.
//   LEAF     → an individual routed pane (usePaneRouter lazy-imports it). Stays flat.
//   DATA     → a private constant/data module of ONE leaf → colocate with it.
//   DEAD     → 0 consumers → DELETE (clean break, no legacy).
//
// THE OBJECTIVE (NG-3): the carve axis is ENCAPSULATE-THE-SHARED-FRAMEWORK (separate
// the reusable pane chassis from the routed leaf panes), not reduce-LoC (a move
// preserves LoC). The metric that improves is top-level fan-out (files at panes/ root)
// + framework encapsulation. The ALTERNATIVE axis (literal per-pane recursive dirs —
// AuroraPane/{AuroraPane.vue,aurora-harmony-stops.ts}) is named in the charter.
//
// Re-runnable from the value.js repo root against any tree:
//   node docs/tranches/V/design/pass-4/instruments/panes-carve.mjs

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, relative, dirname } from "node:path";

const PANES = resolve("demo/@/components/custom/panes");
const DEMO = resolve("demo");

if (!existsSync(PANES)) {
    console.error("panes-carve: demo/@/components/custom/panes not found — run from repo root.");
    process.exit(2);
}

// all demo source files (for the external-consumer scan)
function walk(dir, acc = []) {
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        const s = statSync(p);
        if (s.isDirectory()) {
            if (["node_modules", "public", "dist"].includes(e)) continue;
            walk(p, acc);
        } else if (/\.(vue|ts|mts)$/.test(e)) acc.push(p);
    }
    return acc;
}
const allFiles = walk(DEMO);
const paneFiles = readdirSync(PANES).filter((f) => /\.(vue|ts)$/.test(f)).sort();

// count references to a pane basename across the whole demo (import specifiers +
// dynamic imports; both `./X.vue`, `@components/custom/panes/X.vue`).
function referencesTo(basename) {
    const stem = basename.replace(/\.(vue|ts)$/, "");
    const internal = [], external = [];
    for (const f of allFiles) {
        const src = readFileSync(f, "utf8");
        // import specifier matches (from/import(...) that names the file)
        const re = new RegExp(`["'\\\`][^"'\\\`]*panes/${stem}(\\.vue|\\.ts)?["'\\\`]|["'\\\`]\\./${stem}(\\.vue|\\.ts)?["'\\\`]`, "g");
        if (!re.test(src)) continue;
        const isInPanes = f.startsWith(PANES + "/");
        // exclude self
        if (f.endsWith("/" + basename)) continue;
        (isInPanes ? internal : external).push(relative(DEMO, f));
    }
    return { internal, external };
}

// which routed pane names does usePaneRouter lazy-import?
const routerSrc = existsSync(resolve("demo/@/composables/usePaneRouter.ts"))
    ? readFileSync(resolve("demo/@/composables/usePaneRouter.ts"), "utf8") : "";
const routedStems = new Set(
    [...routerSrc.matchAll(/panes\/(\w+)\.vue/g)].map((m) => m[1])
);

const plan = [];
for (const bn of paneFiles) {
    const stem = bn.replace(/\.(vue|ts)$/, "");
    const { internal, external } = referencesTo(bn);
    const totalCons = internal.length + external.length;
    const routed = routedStems.has(stem);
    let cls;
    if (totalCons === 0 && !routed) cls = "DEAD";
    else if (bn.endsWith(".ts") && external.length === 0 && internal.length >= 1 && !routed) cls = "DATA";
    else if (!routed && (internal.length >= 1 || (external.length >= 1 && /^Pane[A-Z]/.test(stem) === false && /Pane$/.test(stem) === false)))
        cls = "CHASSIS";
    else if (!routed && (/^Pane[A-Z]/.test(stem) || external.length >= 1)) cls = "CHASSIS";
    else cls = "LEAF";
    plan.push({ file: bn, stem, cls, routed, internal: internal.length, external: external.length,
        intoDir: cls === "CHASSIS" ? "panes/chassis/" : cls === "DEAD" ? "(delete)" : "panes/",
        consumers: [...internal, ...external] });
}

// census
const loc = {};
let total = 0;
for (const bn of paneFiles) {
    const n = readFileSync(join(PANES, bn), "utf8").split("\n").length;
    loc[bn] = n; total += n;
}

console.log("=== panes/ ENCAPSULATION CARVE PLAN ===\n");
console.log("file\tclass\trouted\tint/ext cons\tLoC\t-> destination");
for (const p of plan) {
    console.log(`${p.file}\t${p.cls}\t${p.routed ? "Y" : "-"}\t${p.internal}/${p.external}\t${loc[p.file]}\t${p.intoDir}`);
}
const byCls = plan.reduce((a, p) => ((a[p.cls] = (a[p.cls] || 0) + 1), a), {});
console.log(`\nTALLY: CHASSIS=${byCls.CHASSIS || 0}  LEAF=${byCls.LEAF || 0}  DATA=${byCls.DATA || 0}  DEAD=${byCls.DEAD || 0}  (sum ${plan.length})`);
console.log(`Total LoC: ${total} (MOVE-preserving — the carve relocates, it does not reduce LoC)`);
const rootAfter = plan.filter((p) => p.cls === "LEAF" || p.cls === "DATA").length;
console.log(`Top-level panes/ files: BEFORE ${plan.length}  →  AFTER ${rootAfter} leaves + 1 chassis/ dir (${byCls.CHASSIS || 0} files) - ${byCls.DEAD || 0} deleted`);

console.log("\n=== DEAD (delete — clause: NO legacy code, clean breaks) ===");
for (const p of plan.filter((p) => p.cls === "DEAD")) console.log(`  ${p.file}  (0 consumers)`);
console.log("\n=== CHASSIS (→ panes/chassis/, the encapsulated common modules) ===");
for (const p of plan.filter((p) => p.cls === "CHASSIS")) console.log(`  ${p.file}  (int:${p.internal} ext:${p.external})  <- ${p.consumers.slice(0, 4).join(", ")}${p.consumers.length > 4 ? " …" : ""}`);

// STYLE-RELATIVE HAZARD (the class the first RUN's gh-pages build caught):
// a CHASSIS file moved one level deeper into chassis/ carries any relative
// `<style>` path (@reference/@import/url(../…)) that must shift +1 level, or the
// Tailwind/postcss build fails. The script move must rewrite these too.
console.log("\n=== STYLE-RELATIVE HAZARD (chassis moves shift <style> relative paths +1 level) ===");
let hazards = 0;
for (const p of plan.filter((p) => p.cls === "CHASSIS")) {
    const src = readFileSync(join(PANES, p.file.startsWith("chassis/") ? p.file : p.file), "utf8");
    // note: run pre-move (files still flat) — scan the current source
    const rel = [...src.matchAll(/@reference\s+["']([^"']*\.\.\/[^"']*)["']|@import\s+["']([^"']*\.\.\/[^"']*)["']|url\(\s*["']?(\.\.\/[^)"']*)/g)];
    for (const m of rel) {
        const path = m[1] || m[2] || m[3];
        console.log(`  ${p.file}: "${path}"  → prepend one "../" after move into chassis/`);
        hazards++;
    }
}
if (hazards === 0) console.log("  (none — no chassis file carries a relative <style> path)");

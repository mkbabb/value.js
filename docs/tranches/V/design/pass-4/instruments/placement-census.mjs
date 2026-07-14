// V · pass-4 · Charter ε — THE DEMO-WIDE PLACEMENT CENSUS (durable instrument)
// ---------------------------------------------------------------------------
// Generalizes α's `census-postmove.mjs` (which ran ONLY on demo/@/composables/color/,
// 18 files) to EVERY shared demo/@/ bucket — composables/ (all depths), lib/, utils/ —
// producing the per-dir ratifiable placement table the pass-3 AGGLOMERATION §3-ε asked
// for. Re-runnable from the value.js repo root against any tree:
//
//   node docs/tranches/V/design/pass-4/instruments/placement-census.mjs         # table
//   node docs/tranches/V/design/pass-4/instruments/placement-census.mjs --json  # machine
//
// THE OBJECTIVE (NG-3 — stated, not dressed as measurement) --------------------
//   The tier of each shared file is decided by a CHOSEN objective. This census
//   reports BOTH:
//     • objective A = MIN-MANUFACTURED-EDGE (α's default): a shared file stays
//       KERNEL/APP unless ALL its consumers live in ONE feature — colocating a
//       multi-consumer file would manufacture cross-tree runtime edges.
//     • objective B = LITERAL-COLOCATION (the owner's verbatim "colocate … with
//       their consuming feature, recursively"): push a file toward its DOMINANT
//       consuming feature even at the cost of an UP edge, colocating whenever a
//       single feature is the plurality consumer.
//   Where A and B DIVERGE, the file is a fork row (OF-4-widened). Neither is
//   "ground truth"; the owner rules the objective.
//
// TIERS (three, generalizing α's KERNEL|APP-CLUSTER|FEATURE):
//   KERNEL  → stays in a shared composables/ (serves ≥2 features, or a shared/app
//             consumer with kernel the only edge-free home, or a private helper of
//             a kernel parent).
//   APP     → app-root-only (color-picker/App.vue + boot) — the app-cluster.
//   FEATURE → colocate into the ONE owning feature's composables/.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const DEMO = resolve("demo");
const ALIASES = {
    "@composables": resolve("demo/@/composables"),
    "@components": resolve("demo/@/components"),
    "@lib": resolve("demo/@/lib"),
    "@utils": resolve("demo/@/utils"),
    "@styles": resolve("demo/@/styles"),
    "@src": resolve("src"),
    "@assets": resolve("assets"),
};

// ---- collect demo source files ----
function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        const s = statSync(p);
        if (s.isDirectory()) {
            if (e === "node_modules" || e === "public" || e === "dist") continue;
            walk(p, acc);
        } else if (/\.(ts|vue|mts)$/.test(e)) acc.push(p);
    }
    return acc;
}
const files = walk(DEMO);

// ---- specifier resolver (alias + relative + index + .vue) ----
const EXTS = ["", ".ts", ".vue", ".mts", "/index.ts", "/index.vue", "/index.mts"];
function tryResolve(base) {
    for (const ext of EXTS) {
        const cand = base + ext;
        try { if (statSync(cand).isFile()) return cand; } catch {}
    }
    return null;
}
function resolveSpec(spec, fromFile) {
    let base = null;
    if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
    else {
        for (const [a, target] of Object.entries(ALIASES)) {
            if (spec === a || spec.startsWith(a + "/")) { base = target + spec.slice(a.length); break; }
        }
    }
    if (!base) return null;
    return tryResolve(base);
}

// ---- .vue <script> extraction (imports never live in <style>/<template>) ----
function scriptOf(file, src) {
    if (!file.endsWith(".vue")) return src;
    let out = "";
    const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = re.exec(src))) out += m[1] + "\n";
    return out;
}

// ---- build import graph; record type-only (runtime-erased) edges ----
const IMPORT_RE = /(?:import|export)\s+(type\s+)?[^;]*?\bfrom\s*['"]([^'"]+)['"]|import\s*(?:type\s+)?\(?\s*['"]([^'"]+)['"]/g;
const outEdges = new Map(); // file -> [{target, typeOnly}]
for (const f of files) {
    const raw = readFileSync(f, "utf8");
    const src = scriptOf(f, raw);
    const edges = [];
    let m; IMPORT_RE.lastIndex = 0;
    while ((m = IMPORT_RE.exec(src))) {
        const typeOnly = !!m[1];
        const spec = m[2] || m[3];
        if (!spec) continue;
        const r = resolveSpec(spec, f);
        if (r) edges.push({ target: r, typeOnly });
    }
    outEdges.set(f, edges);
}
function consumersOf(target) {
    const out = [];
    for (const [f, edges] of outEdges)
        for (const e of edges) if (e.target === target) out.push({ file: f, typeOnly: e.typeOnly });
    return out;
}

// ---- roots ----
const CUSTOM = resolve("demo/@/components/custom");
const APPROOT = resolve("demo/color-picker");
const SHARED_COMPOSABLES = resolve("demo/@/composables");
const LIB = resolve("demo/@/lib");
const UTILS = resolve("demo/@/utils");
const UI = resolve("demo/@/components/ui");

// a SHARED file = a candidate for the kernel-vs-colocate decision.
function isShared(f) {
    return f.startsWith(SHARED_COMPOSABLES + "/") || f.startsWith(LIB + "/") || f.startsWith(UTILS + "/");
}
const shared = files.filter(isShared).sort();

// static feature-root classifier for a NON-shared consumer.
function classifyStatic(file) {
    if (file.startsWith(CUSTOM + "/")) return { kind: "feature", feature: relative(CUSTOM, file).split("/")[0] };
    if (file.startsWith(APPROOT + "/")) return { kind: "app" };
    if (file.startsWith(UI + "/")) return { kind: "shared" }; // vendored ui = global
    return { kind: "shared" }; // top-level components, router, etc. -> global/kernel
}

// destination tier of a shared file, resolved by fixpoint (a shared file's
// consumers may themselves be shared files whose tier is still resolving).
const dest = new Map(shared.map((f) => [f, "UNRESOLVED"]));
function tierRoot(t) {
    if (t === "KERNEL") return { kind: "shared" };
    if (t === "APP") return { kind: "app" };
    if (t && t.startsWith("FEATURE:")) return { kind: "feature", feature: t.slice(8) };
    return null;
}
function verdict(f) {
    const cons = consumersOf(f).filter((c) => c.file !== f);
    if (cons.length === 0) return "ORPHAN";
    const F = new Set();
    let hasApp = false, hasShared = false, deferred = false;
    for (const c of cons) {
        let cls;
        if (isShared(c.file)) {
            const r = tierRoot(dest.get(c.file));
            if (!r) { deferred = true; continue; }
            cls = r;
        } else cls = classifyStatic(c.file);
        if (cls.kind === "feature") F.add(cls.feature);
        else if (cls.kind === "app") hasApp = true;
        else hasShared = true;
    }
    // 3-tier CC-5 (α's exact predicate, generalized)
    if (F.size >= 2) return "KERNEL";
    if (F.size === 1) return (hasApp || hasShared) ? "KERNEL" : `FEATURE:${[...F][0]}`;
    // F.size === 0
    if (hasShared && hasApp) {
        // ambiguous kernel-vs-app: OBJECTIVE-A tie-break = α's COHESION rule
        // (charter-alpha-harness.mjs L178, generalized): if this file imports
        // same-directory shared siblings (an intra-coupled cluster HEAD), keep the
        // cluster cohesive at app-root (APP); else the residual app+shared file is
        // KERNEL. This reproduces α's ratified 6-KERNEL/12-APP color-bucket split.
        const myDir = dirname(f);
        const intraClusterDeps = (outEdges.get(f) || []).filter(
            (e) => isShared(e.target) && e.target !== f && dirname(e.target) === myDir
        ).length;
        return intraClusterDeps > 0 ? "APP" : "KERNEL";
    }
    if (hasShared) return "KERNEL";
    if (hasApp) return "APP";
    if (deferred) return "UNRESOLVED";
    return "ORPHAN";
}
for (let iter = 0; iter < 40; iter++) {
    let changed = false;
    for (const f of shared) {
        const v = verdict(f);
        if (v !== dest.get(f)) { dest.set(f, v); changed = true; }
    }
    if (!changed) break;
}

// OBJECTIVE-B literal-colocation: the DOMINANT (plurality) consuming feature, if any.
function dominantFeature(f) {
    const cons = consumersOf(f).filter((c) => c.file !== f && !c.typeOnly);
    const tally = {};
    let app = 0, shared = 0;
    for (const c of cons) {
        let cls;
        if (isShared(c.file)) { const r = tierRoot(dest.get(c.file)); if (!r) continue; cls = r; }
        else cls = classifyStatic(c.file);
        if (cls.kind === "feature") tally[cls.feature] = (tally[cls.feature] || 0) + 1;
        else if (cls.kind === "app") app++;
        else shared++;
    }
    const feats = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    if (feats.length === 0) return null;
    // literal-colocation: if a single feature is the plurality (>= app+shared and
    // strictly beats the runner-up feature), push there.
    const [topF, topN] = feats[0];
    const runner = feats[1] ? feats[1][1] : 0;
    return topN >= app + shared && topN > runner ? topF : null;
}

// ---- per-directory grouping ----
function bucketOf(f) {
    const rel = relative(DEMO, f);
    // e.g. @/composables/color/keys.ts -> "@composables/color"; @/lib/palette/... -> "@lib/palette"
    const parts = rel.split("/"); // ["@","composables","color","keys.ts"]
    if (parts[0] !== "@") return dirname(rel);
    const top = "@" + parts[1];
    const sub = parts.length > 3 ? "/" + parts.slice(2, -1).join("/") : "";
    return top + sub;
}

const rows = shared.map((f) => {
    const t = dest.get(f);
    const domB = dominantFeature(f);
    // objective-A destination
    const destA = t === "KERNEL" ? "shared:composables/"
        : t === "APP" ? "app:color-picker/composables/"
        : t.startsWith("FEATURE:") ? `feature:${t.slice(8)}/composables/`
        : t === "ORPHAN" ? "(orphan — 0 consumers)"
        : "(unresolved)";
    // objective-B: colocate to dominant feature if one exists, else same as A
    const tierB = domB ? `FEATURE:${domB}` : t;
    const destB = domB ? `feature:${domB}/composables/` : destA;
    return {
        file: relative(DEMO, f),
        bucket: bucketOf(f),
        consumers: consumersOf(f).filter((c) => c.file !== f).length,
        tierA: t, destA,
        tierB, destB,
        diverges: tierA_neq_tierB(t, tierB),
    };
});
function tierA_neq_tierB(a, b) { return a !== b; }

// ---- α-REPRODUCTION HARNESS (durable reproducibility gate, NG-1/NG-2) ----
// This generalized census MUST reproduce α's RATIFIED color-bucket table
// (charter-alpha-manifest.md: 6 KERNEL / 12 APP-CLUSTER / 0 FEATURE) under
// objective A. If it does not, the generalization has drifted from the ratified
// ground and the manifest below is untrustworthy.
const colorRows = rows.filter((r) => r.bucket === "@composables/color");
const cK = colorRows.filter((r) => r.tierA === "KERNEL").length;
const cA = colorRows.filter((r) => r.tierA === "APP").length;
const cF = colorRows.filter((r) => r.tierA.startsWith("FEATURE:")).length;
const alphaOK = colorRows.length === 18 && cK === 6 && cA === 12 && cF === 0;

// ---- output ----
if (process.argv[2] === "--json") {
    const byBucket = {};
    for (const r of rows) (byBucket[r.bucket] = byBucket[r.bucket] || []).push(r);
    console.log(JSON.stringify({ rows, byBucket }, null, 2));
} else {
    console.log("=== DEMO-WIDE PLACEMENT CENSUS (shared composables/ + lib/ + utils/) ===\n");
    const byBucket = {};
    for (const r of rows) (byBucket[r.bucket] = byBucket[r.bucket] || []).push(r);
    let nK = 0, nA = 0, nF = 0, nO = 0, nDiv = 0;
    for (const [bucket, brows] of Object.entries(byBucket).sort()) {
        console.log(`── ${bucket} (${brows.length} files) ──`);
        for (const r of brows) {
            const mark = r.diverges ? "  <<FORK (A≠B)" : "";
            console.log(`  ${r.file.replace("@/", "")}\t[${r.consumers} cons]\tA=${r.tierA} B=${r.tierB}${mark}`);
            if (r.tierA === "KERNEL") nK++;
            else if (r.tierA === "APP") nA++;
            else if (r.tierA.startsWith("FEATURE:")) nF++;
            else if (r.tierA === "ORPHAN") nO++;
            if (r.diverges) nDiv++;
        }
        console.log("");
    }
    console.log(`TALLY (objective A / cohesion-min-edge): KERNEL=${nK}  APP=${nA}  FEATURE=${nF}  ORPHAN=${nO}  (sum ${rows.length})`);
    console.log(`A≠B divergence rows (OF-4-widened forks): ${nDiv}`);
    console.log(`\nα-REPRODUCTION (color bucket = 6K/12A/0F, α's ratified table): ${alphaOK ? "PASS" : `FAIL (got ${cK}K/${cA}A/${cF}F)`}`);
}
process.exit(alphaOK ? 0 : 1);

# V · pass-3 · Charter α — THE GROUND-TRUTH HARNESS (durable source)

The instrument critique-charter-a G3 / retro-f3 G3 demanded be **committed and re-runnable** (the pass-2
`census.mjs` lived only in a worktree and had 0 assert/validate hits). The `_proto/` working copies are
git-ignored evidence (`.gitignore:12` = `_*`, the campaign convention); this file embeds the load-bearing
instrument's source so the ground-truth validation survives worktree cleanup and re-runs from repo root:

```
# from the value.js repo root, against the clean tranche-u tree (pre-scatter):
sed -n '/^```js census-postmove/,/^```$/p' docs/tranches/V/design/pass-3/charter-alpha-harness.md \
  | sed '1d;$d' > /tmp/census-postmove.mjs
node /tmp/census-postmove.mjs           # 6K/12A/0F · harness 3/3 PASS · exit 0
```

Result on tranche-u HEAD (`07bf61d`, byte-identical bucket at current HEAD): `TALLY KERNEL=6 APPCLUSTER=12
FEATURE=0`; VALIDATION-A runtime-manufactured=0 (type-only=1: `keys→useColorPipeline`); VALIDATION-B 6
bucket files runtime-coupled to the color-picker FEATURE (OF-4 evidence); **H1/H2/H3 PASS, exit 0**.

The companion `counterfactual.mjs` (same resolver; scores the three candidate tables) yields RATIFIED=0 /
charter-a=1 / charter-b=7 runtime-manufactured edges — the uniqueness proof. `codemod-ratified.mjs` is
charter-b's `codemod-scatter.mjs` with the KERNEL/APP-CLUSTER membership swapped to the ratified 6/12 split.

---

```js census-postmove
import { readFileSync, readdirSync, statSync } from "node:fs";
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

// ---- build import graph; record whether each edge is `import type` (runtime-erased) ----
// edge: importer -> { target, typeOnly }
const IMPORT_RE = /(?:import|export)\s+(type\s+)?[^;]*?\bfrom\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;
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
  for (const [f, edges] of outEdges) for (const e of edges) if (e.target === target) out.push({ file: f, typeOnly: e.typeOnly });
  return out;
}

// ---- static feature-root classifier (for NON-bucket consumers) ----
const CUSTOM = resolve("demo/@/components/custom");
const COLORBUCKET = resolve("demo/@/composables/color");
const APPROOT = resolve("demo/color-picker");
const SHAREDCOMP = resolve("demo/@/composables");
function classify(file) {
  if (file.startsWith(COLORBUCKET + "/")) return { kind: "sibling", feature: null };
  if (file.startsWith(CUSTOM + "/")) return { kind: "feature", feature: relative(CUSTOM, file).split("/")[0] };
  if (file.startsWith(APPROOT + "/")) return { kind: "app", feature: null };
  if (file.startsWith(SHAREDCOMP + "/")) return { kind: "shared", feature: null };
  return { kind: "shared", feature: null }; // lib/utils/router/top-level components -> global
}

// ---- the 18 bucket files ----
const bucket = readdirSync(COLORBUCKET).filter((f) => /\.ts$/.test(f)).sort();
if (bucket.length === 0) {
  console.error("census-postmove: demo/@/composables/color/ is EMPTY — this is a PRE-move analysis tool.");
  console.error("Run it against the clean tranche-u HEAD tree, BEFORE applying the scatter codemod.");
  process.exit(2);
}
const bpath = (n) => join(COLORBUCKET, n);
const isBucket = (f) => f.startsWith(COLORBUCKET + "/");

// destination tokens: "KERNEL" | "APPCLUSTER" | "FEATURE:<x>" | "UNRESOLVED" | "ORPHAN"
// root a destination contributes when it is itself a consumer:
//   KERNEL -> shared ; APPCLUSTER -> app ; FEATURE:x -> feature x
function destRoot(dest) {
  if (dest === "KERNEL") return { kind: "shared" };
  if (dest === "APPCLUSTER") return { kind: "app" };
  if (dest && dest.startsWith("FEATURE:")) return { kind: "feature", feature: dest.slice(8) };
  return null; // UNRESOLVED/ORPHAN
}

// files this bucket file imports that are ALSO bucket siblings (pipeline-cohesion signal).
// keyed by full path — outEdges keys are absolute file paths.
function bucketDeps(name) {
  const f = bpath(name);
  return (outEdges.get(f) || []).filter((e) => isBucket(e.target) && e.target !== f);
}

// ---- fixpoint: resolve each bucket file's destination ----
const dest = new Map(bucket.map((n) => [n, "UNRESOLVED"]));
function verdict(name) {
  const target = bpath(name);
  const cons = consumersOf(target).filter((c) => c.file !== target);
  if (cons.length === 0) return "ORPHAN";
  const F = new Set();
  let hasApp = false, hasShared = false, deferred = false;
  for (const c of cons) {
    const cls = classify(c.file);
    if (cls.kind === "sibling") {
      const d = dest.get(relative(COLORBUCKET, c.file));
      const r = destRoot(d);
      if (!r) { deferred = true; continue; }         // sibling not yet resolved
      if (r.kind === "feature") F.add(r.feature);
      else if (r.kind === "app") hasApp = true;
      else hasShared = true;
    } else if (cls.kind === "feature") F.add(cls.feature);
    else if (cls.kind === "app") hasApp = true;
    else hasShared = true;
  }
  // 3-tier CC-5
  if (F.size >= 2) return "KERNEL";
  if (F.size === 1) return (hasApp || hasShared) ? "KERNEL" : `FEATURE:${[...F][0]}`;
  // F.size === 0
  if (hasShared && hasApp) {
    // ambiguous kernel-vs-app-cluster: break by dependency cohesion.
    // if this file imports app-cluster pipeline stages, keep it with them (APPCLUSTER);
    // the residual shared-consumer edge is validated (type-only) below.
    return bucketDeps(name).length > 0 ? "APPCLUSTER" : "KERNEL";
  }
  if (hasShared) return "KERNEL";
  if (hasApp) return "APPCLUSTER";
  if (deferred) return "UNRESOLVED";
  return "ORPHAN";
}
for (let iter = 0; iter < 20; iter++) {
  let changed = false;
  for (const n of bucket) {
    const v = verdict(n);
    if (v !== dest.get(n)) { dest.set(n, v); changed = true; }
  }
  if (!changed) break;
}

// ---- destination directory for each tier ----
const KERNEL_DIR = "demo/@/composables/";
const APPCLUSTER_DIR = "demo/color-picker/composables/color/";
function destDir(name) {
  const d = dest.get(name);
  if (d === "KERNEL") return KERNEL_DIR;
  if (d === "APPCLUSTER") return APPCLUSTER_DIR;
  if (d && d.startsWith("FEATURE:")) return `demo/@/components/custom/${d.slice(8)}/composables/`;
  return "(unresolved)";
}
// the future absolute home of a bucket file (for the edge-manufacture check)
function futureHomeRoot(name) {
  const d = dest.get(name);
  if (d === "KERNEL") return { kind: "shared" };
  if (d === "APPCLUSTER") return { kind: "app" };
  if (d && d.startsWith("FEATURE:")) return { kind: "feature", feature: d.slice(8) };
  return { kind: "shared" };
}
// the tree a NON-bucket file lives in (for cross-tree comparison)
function fileTree(file) {
  const cls = classify(file);
  if (cls.kind === "feature") return `feature:${cls.feature}`;
  if (cls.kind === "app") return "app";
  return "shared"; // kernel-level
}
function destTree(name) {
  const r = futureHomeRoot(name);
  return r.kind === "feature" ? `feature:${r.feature}` : r.kind === "app" ? "app" : "shared";
}

// A cross-tree edge is manufactured when importer.tree !== imported.tree AND the edge
// is NOT a clean UP edge into `shared` (kernel). Any file may import UP into the kernel;
// feature<->app and kernel->(feature|app) are the manufactured cross-tree edges.
function isCleanEdge(fromTree, toTree) {
  if (fromTree === toTree) return true;
  if (toTree === "shared") return true; // anyone may import UP into the kernel
  return false;
}

// ---- VALIDATION ----
// Two distinct edge classes:
//  (A) MOVE-MANUFACTURED = both endpoints are bucket files (siblings TODAY, same tree),
//      that land in DIFFERENT trees post-move and the edge is not a clean UP-into-kernel.
//      These are the edges the SPLIT newly creates — the charter-a §1.1 "ink-walk->ink"
//      hazard. This set is the invariant the manifest must keep at 0 runtime.
//  (B) PRE-EXISTING coupling = a bucket file imports a NON-bucket file (e.g. the color-picker
//      FEATURE barrel `@components/custom/color-picker`). Cross-tree TODAY (the bucket sits in
//      the shared `composables/color/` tree already); the move does not create it. Reported
//      separately as the standing coupling (the OF-4 evidence), never counted as a move defect.
const moveManufactured = [];       // bucket<->bucket, split by the move, RUNTIME
const moveManufacturedType = [];   // bucket<->bucket, split by the move, type-only
const preExistingCoupling = [];    // bucket -> non-bucket feature (runtime), pre-move & post-move
for (const [importer, edges] of outEdges) {
  const impBucket = isBucket(importer);
  if (!impBucket) continue; // only bucket files' outgoing edges matter here
  const impName = relative(COLORBUCKET, importer);
  const impTree = destTree(impName);
  for (const e of edges) {
    const tgtBucket = isBucket(e.target);
    if (tgtBucket) {
      const tgtName = relative(COLORBUCKET, e.target);
      const tgtTree = destTree(tgtName);
      if (isCleanEdge(impTree, tgtTree)) continue;
      const rec = { from: impName, fromTree: impTree, to: tgtName, toTree: tgtTree, typeOnly: e.typeOnly };
      (e.typeOnly ? moveManufacturedType : moveManufactured).push(rec);
    } else {
      // bucket -> external: is it cross-tree (a feature/app that isn't the kernel)?
      const tgtTree = fileTree(e.target);
      if (tgtTree.startsWith("feature:") && !e.typeOnly) {
        preExistingCoupling.push({ from: impName, to: relative(DEMO, e.target), toTree: tgtTree });
      }
    }
  }
}
const runtimeManufactured = moveManufactured;       // the load-bearing invariant set
const typeOnlyManufactured = moveManufacturedType;

// ---- HAND-CHECKED HARNESS ----
const failures = [];
// H1 — ComponentSliders live-control: resolver reaches it, fan-in >= 1
const CS = files.find((f) => f.endsWith("controls/ComponentSliders/ComponentSliders.vue"));
const csFanIn = CS ? consumersOf(CS).length : -1;
const H1 = CS && csFanIn >= 1;
if (!H1) failures.push(`H1 FAIL: ComponentSliders.vue ${CS ? `fan-in ${csFanIn} (<1 => false-positive dead)` : "not resolved by walker"}`);

// H2 — generate-color / useColorParsing cross-tree pair
const gc = bpath("generate-color.ts");
const gcConsumers = consumersOf(gc).map((c) => relative(DEMO, c.file));
const ucpImportsGc = (outEdges.get(bpath("useColorParsing.ts")) || []).some((e) => e.target === gc && !e.typeOnly);
const pairManufactured = runtimeManufactured.filter(
  (r) => (r.to.endsWith("generate-color.ts") && r.from.endsWith("useColorParsing.ts")) ||
         (r.from.endsWith("generate-color.ts") && r.to.endsWith("useColorParsing.ts"))
);
const H2 = ucpImportsGc && pairManufactured.length === 0;
if (!ucpImportsGc) failures.push("H2 FAIL: useColorParsing does not RUNTIME-import generate-color (ground-truth broken)");
if (pairManufactured.length) failures.push(`H2 FAIL: ${pairManufactured.length} manufactured cross-tree runtime edge(s) across the generate-color/useColorParsing pair`);

// H3 — the assignment manufactures ZERO cross-tree RUNTIME edges
const H3 = runtimeManufactured.length === 0;
if (!H3) failures.push(`H3 FAIL: ${runtimeManufactured.length} manufactured cross-tree RUNTIME edge(s) under the assignment`);

// ---- output ----
const rows = bucket.map((n) => ({ file: n, dest: dest.get(n), dir: destDir(n) }));
const tally = rows.reduce((a, r) => ((a[r.dest.startsWith("FEATURE:") ? "FEATURE" : r.dest] = (a[r.dest.startsWith("FEATURE:") ? "FEATURE" : r.dest] || 0) + 1), a), {});

if (process.argv[2] === "--json") {
  console.log(JSON.stringify({ rows, tally, runtimeManufactured, typeOnlyManufactured, harness: { H1, H2, H3, csFanIn, ucpImportsGc } }, null, 2));
} else {
  console.log("=== CC-5 POST-MOVE manifest (18 bucket files) ===\n");
  console.log("file\tdestination\tdir");
  for (const r of rows) console.log(`${r.file}\t${r.dest}\t${r.dir}`);
  console.log(`\nTALLY: KERNEL=${tally.KERNEL || 0}  APPCLUSTER=${tally.APPCLUSTER || 0}  FEATURE=${tally.FEATURE || 0}  ORPHAN=${tally.ORPHAN || 0}  (sum ${rows.length})`);
  console.log(`  => ${(tally.KERNEL || 0) + (tally.APPCLUSTER || 0)} PROMOTE / ${tally.FEATURE || 0} COLOCATE`);

  console.log(`\n=== VALIDATION (A): MOVE-manufactured cross-tree edges (bucket<->bucket splits) ===`);
  console.log(`RUNTIME manufactured : ${runtimeManufactured.length}`);
  for (const r of runtimeManufactured) console.log(`  [RUNTIME] ${r.from} (${r.fromTree}) -> ${r.to} (${r.toTree})`);
  console.log(`TYPE-ONLY manufactured (flagged smells, runtime-erased): ${typeOnlyManufactured.length}`);
  for (const r of typeOnlyManufactured) console.log(`  [type]    ${r.from} (${r.fromTree}) -> ${r.to} (${r.toTree})`);

  console.log(`\n=== VALIDATION (B): PRE-EXISTING bucket->feature coupling (exists TODAY; OF-4 evidence) ===`);
  const byFile = {};
  for (const r of preExistingCoupling) (byFile[r.from] = byFile[r.from] || new Set()).add(r.toTree);
  console.log(`bucket files runtime-coupled to a FEATURE today : ${Object.keys(byFile).length}`);
  for (const [f, roots] of Object.entries(byFile)) console.log(`  ${f} -> ${[...roots].join(", ")}`);

  console.log(`\n=== HAND-CHECKED HARNESS ===`);
  console.log(`H1 ComponentSliders live-control (fan-in ${csFanIn} >= 1) : ${H1 ? "PASS" : "FAIL"}`);
  console.log(`H2 generate-color/useColorParsing cross-tree pair (ucp->gc runtime=${ucpImportsGc}, pair-manufactured=${pairManufactured.length}) : ${H2 ? "PASS" : "FAIL"}`);
  console.log(`H3 zero manufactured RUNTIME cross-tree edges (${runtimeManufactured.length}) : ${H3 ? "PASS" : "FAIL"}`);
  console.log(`\nHARNESS ${failures.length === 0 ? "PASS (3/3)" : "FAIL:\n  - " + failures.join("\n  - ")}`);
}
process.exit(failures.length === 0 ? 0 : 1);
```

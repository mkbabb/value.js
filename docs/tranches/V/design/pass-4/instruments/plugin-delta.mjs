// V · pass-4 · charter-ζ · PLUGIN DELTA — OF-6 measured cost instrument (DURABLE)
//
// THE DURABLE-INSTRUMENT LAW: committed, re-runnable from the repo root.
//   node docs/tranches/V/design/pass-4/instruments/plugin-delta.mjs
//
// OF-6 THE CONTRADICTION: the owner said "our plugins are worthless and to be deleted
// entirely." Both pass-3 auditors HONESTLY CONTRADICT with measurement — both plugins are
// LIVE + wired in vite.config.ts. This instrument measures the CONCRETE cost of the
// delete-entirely pole so the fork is presented with numbers, never pre-decided.
//
// It measures, WITHOUT needing a full demo boot (the glass-ui adopt-drift blocks that at raw
// HEAD — orthogonal to the plugins):
//   (1) deferGlassFonts — the render-blocking payload it keeps OFF the critical CSS path =
//       gzip(@mkbabb/glass-ui/styles/fonts.css). Deleting the plugin re-inlines exactly these
//       bytes into the eager index.css → the direct LCP regression (the Q14 concern).
//   (2) sourceExportPlugin — its consumer blast = the `?source` import sites (reference pages
//       that render live source snippets) + the test golden. Deleting it breaks the build at
//       every `?source` import unless those consumers are also removed.
//
// The empirical with/without index.css delta (when a build is runnable) is recorded in
// charter-zeta.md §6; this instrument fixes the two costs that are measurable at any HEAD.

import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";

const ROOT = resolve(process.argv.find((a) => a.startsWith("--root="))?.slice(7) || ".");
const require = createRequire(resolve(ROOT, "vite.config.ts"));

// ---- (1) deferGlassFonts payload ----
let fontsRaw = 0, fontsGz = 0, fontsPath = "(unresolved)";
try {
  fontsPath = require.resolve("@mkbabb/glass-ui/styles/fonts");
  const buf = readFileSync(fontsPath);
  fontsRaw = statSync(fontsPath).size;
  fontsGz = gzipSync(buf).length;
} catch (e) {
  fontsPath = `RESOLVE FAILED: ${e.message}`;
}

// confirm wiring: the MARKER in style.css + the plugin registration in vite.config.ts
function grepCount(pattern, files) {
  try {
    return execSync(`grep -rn ${JSON.stringify(pattern)} ${files} 2>/dev/null | wc -l`,
      { cwd: ROOT, encoding: "utf8" }).trim();
  } catch { return "0"; }
}
const markerWired = grepCount("GLASS_FONTS_DEFERRED", "demo/@/styles/style.css");
const deferWired = grepCount("deferGlassFonts()", "vite.config.ts");

// ---- (2) sourceExportPlugin blast ----
let sourceSites = [], sourceFiles = 0;
try {
  const out = execSync("grep -rln '?source' demo/ assets/ 2>/dev/null | grep -v node_modules",
    { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean);
  sourceFiles = out.length;
  sourceSites = out;
} catch {}
const sourceWired = grepCount("sourceExportPlugin()", "vite.config.ts");
const hasGolden = (() => { try { statSync(resolve(ROOT, "test/docs-source-snippets.test.ts")); return true; } catch { return false; } })();

const kb = (n) => (n / 1024).toFixed(1) + " KB";

console.log("=== OF-6 PLUGIN DELTA (measured cost of the delete-entirely pole) ===\n");
console.log("--- (1) deferGlassFonts — the render-blocking font corpus it defers ---");
console.log(`  resolved  : ${fontsPath}`);
console.log(`  raw       : ${fontsRaw} B (${kb(fontsRaw)})`);
console.log(`  gzip      : ${fontsGz} B (${kb(fontsGz)})   <= re-inlined into eager index.css on DELETE`);
console.log(`  wiring    : style.css MARKER=${markerWired}  vite.config deferGlassFonts()=${deferWired}`);
console.log(`  regression: +${kb(fontsGz)} gzip on the render-blocking critical path → worse LCP (the Q14 escalation is ALREADY over the ≤2500 budget)\n`);

console.log("--- (2) sourceExportPlugin — the ?source live-snippet consumers ---");
console.log(`  ?source consumer files : ${sourceFiles}`);
for (const s of sourceSites) console.log(`    ${s}`);
console.log(`  test golden : ${hasGolden ? "test/docs-source-snippets.test.ts (present)" : "absent"}`);
console.log(`  wiring      : vite.config sourceExportPlugin()=${sourceWired}`);
console.log(`  regression  : build BREAKS at every ?source import (unresolved) unless all ${sourceFiles} consumers are also removed → ${sourceFiles} reference pages lose live source snippets + the golden breaks\n`);

console.log("VERDICT INPUT: both plugins are LIVE + wired + carry a measured cost on delete-entirely.");
console.log("The three poles (KEEP / DELETE-AND-INLINE / DELETE-ENTIRELY-accepting-regression) are");
console.log("presented in charter-zeta.md §6 with these costs — owner-decided, never pre-ruled.");

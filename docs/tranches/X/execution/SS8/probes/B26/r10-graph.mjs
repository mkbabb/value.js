// R-10 witness: the PRODUCTION (gh-pages) build graph — where do glass-ui's runtime
// `@mkbabb/value.js/*` imports land? A spy plugin reads Rolldown's module graph at buildEnd.
// Emits to node_modules/.cache/ss8-b26-r10 (durable-enough, outside dist/ which other seats sweep). Node-only, no browser.
import { build } from "/Users/mkbabb/Programming/value.js/node_modules/vite/dist/node/index.js";
import { writeFileSync } from "node:fs";
const root = "/Users/mkbabb/Programming/value.js";
const EV = root + "/docs/tranches/X/execution/SS8/evidence/B26-extract-generate-panes/";
const out = { at: new Date().toISOString(), builds: [] };
const spy = {
  name: "ss8-r10-spy",
  buildEnd() {
    const b = {}; out.builds.push(b);
    const ids = [...this.getModuleIds()];
    const glass = ids.filter((i) => i.includes("/node_modules/@mkbabb/glass-ui/"));
    const edges = {};
    for (const g of glass) {
      const info = this.getModuleInfo(g);
      for (const d of [...(info.importedIds || []), ...(info.dynamicallyImportedIds || [])]) {
        if (/value\.js/.test(d) && !/glass-ui/.test(d)) { const k = d.replace(root, "<repo>"); edges[k] = (edges[k] || 0) + 1; }
      }
    }
    b.glassModules = glass.length;
    b.glassToValueEdges = edges;
    b.graphHasNodeModulesValueJs = ids.filter((i) => i.includes("/node_modules/@mkbabb/value.js/")).map((i) => i.replace(root, "<repo>")).slice(0, 20);
    b.graphHasDistSubpaths = ids.filter((i) => i.includes(root + "/dist/subpaths/")).length;
  },
};
try {
  await build({ configFile: root + "/vite.config.ts", mode: "gh-pages", logLevel: "warn", plugins: [spy], build: { outDir: root + "/node_modules/.cache/ss8-b26-r10", emptyOutDir: true } });
} catch (e) { out.err = String(e.message).slice(0, 400); }
writeFileSync(EV + "r10-graph.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 2000));

// SERVED MODEL: claude-opus-5-5
// X.W12U.g2s2 falsifier (i) (COHESION §0ft.1; W12U.md ADDENDUM (i)): the open5/chunk-exp idiom, re-pointed
// at a built tree. Per arm, a scratch app: main.js EAGERLY imports parseCssColor from <tree>/dist/subpaths/<arm>.js;
// lazy.js (dynamic import on click) uses parseTimingFunction from <tree>/dist/subpaths/css.js. Built with vite
// (the demo's bundler; minified). GREEN = the eager index chunk reads atKeyframes:false (stylesheet grammar lazy)
// and the lazy chunk carries it.  Usage: node run.mjs <tree> <scratch-dir> <css|color>
import { build } from "vite";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
const [tree, dir, arm] = process.argv.slice(2);
const app = join(dir, arm, "app"), out = join(dir, arm, "out");
rmSync(join(dir, arm), { recursive: true, force: true }); mkdirSync(app, { recursive: true });
writeFileSync(join(app, "index.html"), `<script type="module" src="./main.js"></script>\n`);
writeFileSync(join(app, "main.js"), `import { parseCssColor } from ${JSON.stringify(join(tree, "dist/subpaths", arm + ".js"))};\nconsole.log(parseCssColor("red"));\ndocument.onclick = () => import("./lazy.js").then((m) => m.run());\n`);
writeFileSync(join(app, "lazy.js"), `import { parseTimingFunction } from ${JSON.stringify(join(tree, "dist/subpaths/css.js"))};\nexport const run = () => console.log(parseTimingFunction("ease"));\n`);
await build({ configFile: false, logLevel: "silent", root: app, build: { outDir: out, emptyOutDir: true, minify: true } });
let verdict = "RED";
for (const f of readdirSync(join(out, "assets")).sort()) {
  const b = readFileSync(join(out, "assets", f)); const s = b.toString(); const lazy = /^lazy/.test(f);
  const kf = s.includes("atKeyframes");
  if (!lazy && /^index/.test(f)) verdict = kf ? "RED" : "GREEN";
  console.log(arm, f.replace(/-[\w-]{8}\.js$/, ".js"), b.length, gzipSync(b).length, "atKeyframes:" + kf, "lazy:" + lazy);
}
console.log(arm, "VERDICT", verdict);

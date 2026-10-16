// SERVED MODEL: claude-opus-5-5
//
// X.W12U.g2s act 1 — the scratch entry (COHESION §0fr.1): a module importing ONLY `parseCssColor` /
// `serializeCssColor` from a built tree's published subpath, bundled by the demo's own bundler (vite /
// rolldown, minified, tree-shaken), beside a module re-exporting the whole `./css`. If the stylesheet
// grammar (`ruleList`, `atKeyframes`, …) survives in the colour-only bundle, it is not shaken away.
//
//   node scratch-entry.mjs <tree> <subpath css|color> <outdir>
// Run from a directory whose node_modules holds vite (the run copies the tree's node_modules).
import { build } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const [tree, subpath, outdir] = process.argv.slice(2);
mkdirSync(outdir, { recursive: true });
const lib = path.join(tree, "dist/subpaths", `${subpath}.js`);
const sources = {
    entry: `import { parseCssColor, serializeCssColor } from ${JSON.stringify(lib)};\n` +
        "export const probe = (s) => { const r = parseCssColor(s); return r.ok ? serializeCssColor(r.value) : null; };\n",
    full: `export * from ${JSON.stringify(path.join(tree, "dist/subpaths/css.js"))};\n`,
};
for (const [name, text] of Object.entries(sources)) {
    const file = path.join(outdir, `${name}.js`);
    writeFileSync(file, text);
    await build({ configFile: false, logLevel: "silent", build: { outDir: path.join(outdir, `out-${name}`), emptyOutDir: true,
        minify: true, lib: { entry: file, formats: ["es"], fileName: () => `${name}.js` } } });
    const bytes = readFileSync(path.join(outdir, `out-${name}`, `${name}.js`));
    const text2 = bytes.toString();
    const rules = ["valueTop", "ruleList", "atKeyframes", "declaration", "timingFunction"].filter((r) => text2.includes(r));
    console.log(`${name}${name === "entry" ? `(${subpath})` : ""} raw=${bytes.length} gz=${gzipSync(bytes, { level: 9 }).length} stylesheet/value-rules-present=[${rules.join(",")}]`);
}

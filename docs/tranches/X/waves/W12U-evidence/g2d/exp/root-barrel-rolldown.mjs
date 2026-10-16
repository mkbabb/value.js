// SERVED MODEL: claude-opus-5-5
// X.W12U.g2d probe: does the demo's bundler (vite/rolldown, minified, tree-shaken) keep glass families
// (Dialog/Sheet/Collapsible/NumberField/Menu…) when an entry imports only the three names the demo takes
// from the glass ROOT barrel ("@mkbabb/glass-ui": useClipboard, writeClipboard, useTouchGate)? Externals: vue, reka-ui.
// Usage (from the repo root): node root-barrel-rolldown.mjs <outdir>
import { build } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
const outdir = path.resolve(process.argv[2]); mkdirSync(outdir, { recursive: true });
const cases = {
    root: 'import { useClipboard, writeClipboard, useTouchGate } from "@mkbabb/glass-ui";\nexport const p = [useClipboard, writeClipboard, useTouchGate];\n',
    subpaths: 'import { useTouchGate } from "@mkbabb/glass-ui/dom";\nexport const p = [useTouchGate];\n',
};
for (const [name, text] of Object.entries(cases)) {
    const file = path.join(process.cwd(), `.g2d-probe-${name}.js`);
    writeFileSync(file, text);
    try {
        await build({ configFile: false, logLevel: "silent", build: { outDir: path.join(outdir, `out-${name}`), emptyOutDir: true, minify: true,
            rollupOptions: { external: (id) => id === "vue" || id.startsWith("reka-ui") || id.startsWith("@vueuse/") },
            lib: { entry: file, formats: ["es"], fileName: () => `${name}.js` } } });
    } finally { (await import("node:fs")).rmSync(file); }
    const b = readFileSync(path.join(outdir, `out-${name}`, `${name}.js`)); const t = b.toString();
    const fam = ["Dialog", "Sheet", "Collapsible", "NumberField", "DropdownMenu", "ContextMenu", "Accordion", "Command"].filter((k) => new RegExp(k).test(t));
    console.log(`${name} raw=${b.length} gz=${gzipSync(b).length} families=[${fam.join(",")}]`);
}

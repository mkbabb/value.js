// CHALLENGE-L (PreviewStrip, pass 2) — does the barrel edge cost SHIPPED bytes,
// or is it purely a static-graph (structural) defect that Rollup tree-shakes?
// Build two minimal entries and diff the emitted bytes.
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFileSync, mkdirSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = "/Users/mkbabb/Programming/value.js";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/L2/ts";
const SRC = path.join(OUT, "src");
mkdirSync(SRC, { recursive: true });

const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
const selfAlias = Object.entries(pkg.exports).map(([sp, c]) => ({
    find: new RegExp("^" + ("@mkbabb/value.js" + sp.slice(1)).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"),
    replacement: path.resolve(ROOT, c.import),
}));

const CHIPS = path.join(ROOT, "demo/color-session/color-chips");
const ENTRIES = {
    "A-barrel":   `import { PreviewStrip } from "${CHIPS}/index.ts"; export default PreviewStrip;`,
    "B-direct":   `import PreviewStrip from "${CHIPS}/PreviewStrip.vue"; export default PreviewStrip;`,
    "C-nostamp":  `import { defineComponent } from "vue"; export default defineComponent({});`, // floor
};

for (const [name, code] of Object.entries(ENTRIES)) {
    const entry = path.join(SRC, `${name}.ts`);
    writeFileSync(entry, code);
    const dir = path.join(OUT, name);
    await build({
        root: ROOT, configFile: false, logLevel: "error",
        plugins: [vue()],
        resolve: { alias: selfAlias },
        build: {
            outDir: dir, emptyOutDir: true, minify: "esbuild", target: "es2022",
            lib: { entry, formats: ["es"], fileName: "out" },
            rollupOptions: { external: ["vue"] },
        },
    });
    let bytes = 0, files = [];
    for (const f of readdirSync(dir)) {
        const s = statSync(path.join(dir, f)); if (s.isFile()) { bytes += s.size; files.push(`${f}:${s.size}`); }
    }
    const js = readdirSync(dir).filter((f) => f.endsWith(".js")).map((f) => readFileSync(path.join(dir, f), "utf8")).join("");
    const marks = {
        "mixColors-impl": /interpolateHue|hueDelta|progress/.test(js),
        "parseCssColor-impl": /parseCssColor|colorFunctionNames|hexToRgb/i.test(js),
        "convertColor-impl": /srgbToLinear|linearToSrgb|XYZ|oklab/i.test(js),
        "stampStops-inlined": /join\("\|"\)|join\('\|'\)/.test(js),
    };
    console.log(`### ${name.padEnd(10)} total=${String(bytes).padStart(6)}B  files=${files.join(" ")}`);
    console.log(`     markers: ${JSON.stringify(marks)}`);
}

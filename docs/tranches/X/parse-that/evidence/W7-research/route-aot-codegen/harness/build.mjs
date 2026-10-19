// Bundles: base (retired hand parser + retired stylesheet layer), bbnf (the product: bbnf-lang 0.1.4 on
// parse-that 0.8.2), and one aot-<variant> per generated parser (value.js's UNCHANGED actions, ./load
// redirected to gen/load-aot.ts). Evidence-only.
import path from "node:path";
import { readdirSync } from "node:fs";
import { build, common, rawPlugin, aotPlugin, here } from "../gen/build-lib.mjs";
const h = path.join(here, "harness"), out = path.join(here, "out");
await build({ ...common, entryPoints: [path.join(h, "entry-base.ts")], outfile: path.join(out, "base.mjs"), plugins: [rawPlugin] });
await build({ ...common, entryPoints: [path.join(h, "entry-bbnf.ts")], outfile: path.join(out, "bbnf.mjs"), plugins: [rawPlugin] });
for (const f of readdirSync(out).filter((f) => f.endsWith(".generated.js"))) {
    const v = f.replace(/^css-grammar\./, "").replace(/\.generated\.js$/, "");
    await build({ ...common, entryPoints: [path.join(h, "entry-aot.ts")], outfile: path.join(out, `aot-${v}.mjs`), plugins: [rawPlugin, aotPlugin(path.join(out, f), v.startsWith("text"))] });
}
console.log("built");

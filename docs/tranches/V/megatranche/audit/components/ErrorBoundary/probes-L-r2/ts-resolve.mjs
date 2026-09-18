// Probe: where does the DEMO TypeScript program actually resolve each
// @mkbabb/value.js specifier? Read-only; uses the TS compiler API with the
// exact tsconfig.demo.json options.
import ts from "typescript";
import path from "node:path";

const root = process.cwd();
const cfgPath = path.join(root, "tsconfig.demo.json");
const raw = ts.readConfigFile(cfgPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(raw.config, ts.sys, root, undefined, cfgPath);
const opts = parsed.options;

const containing = path.join(root, "demo/color-picker/App.vue.ts");
const specs = [
  "@mkbabb/value.js",
  "@mkbabb/value.js/color",
  "@mkbabb/value.js/value",
  "@mkbabb/value.js/css",
  "@mkbabb/value.js/easing",
  "@mkbabb/value.js/math",
  "@mkbabb/value.js/transform",
  "@mkbabb/value.js/quantize",
  "@mkbabb/value.js/parsing",
  "@mkbabb/value.js/units",
];
const cache = ts.createModuleResolutionCache(root, (x) => x, opts);
for (const s of specs) {
  const r = ts.resolveModuleName(s, containing, opts, ts.sys, cache);
  const f = r.resolvedModule?.resolvedFileName;
  const where = !f ? "UNRESOLVED"
    : f.includes("node_modules") ? "node_modules (registry copy)"
    : "local checkout";
  console.log(String(s).padEnd(32), where.padEnd(28), f ? path.relative(root, f) : "-");
}

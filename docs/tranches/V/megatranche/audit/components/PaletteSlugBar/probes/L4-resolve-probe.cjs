const ts = require("/Users/mkbabb/Programming/value.js/node_modules/typescript");
const path = require("path");
const REPO = "/Users/mkbabb/Programming/value.js";
const cfgPath = path.join(REPO, "tsconfig.demo.json");
const raw = ts.readConfigFile(cfgPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(raw.config, ts.sys, REPO, undefined, cfgPath);
const containing = path.join(REPO, "demo/palettes/browser/slug/PaletteSlugBar.ts");

const specs = [
  "@mkbabb/value.js", "@mkbabb/value.js/color", "@mkbabb/value.js/css",
  "@mkbabb/value.js/value", "@mkbabb/value.js/math", "@mkbabb/value.js/easing",
  "@mkbabb/value.js/quantize", "@mkbabb/value.js/transform",
  "@mkbabb/value.js/parsing", "@mkbabb/value.js/units",
];

function run(opts, label) {
  console.log("\n===== " + label + " =====");
  for (const s of specs) {
    const r = ts.resolveModuleName(s, containing, opts, ts.sys);
    const f = r.resolvedModule ? r.resolvedModule.resolvedFileName.replace(REPO, "<repo>") : null;
    console.log((f ? "OK   " : "FAIL ") + s.padEnd(30) + (f || "unresolved"));
  }
}

run(parsed.options, "WITH tsconfig.demo.json paths (as shipped)");

const noPaths = Object.assign({}, parsed.options);
delete noPaths.paths;
run(noPaths, "WITHOUT the value.js paths block (self-reference only)");

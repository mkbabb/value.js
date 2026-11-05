#!/usr/bin/env node
// V-D6 falsifier: the demo program resolves `@mkbabb/value.js*` through the
// package's own `exports` map and nothing else.
//   leg A  tsconfig.demo.json declares no `@mkbabb/value.js*` paths (RED: 8 phantom keys)
//   leg B  the specifiers the demo program can resolve == the exports map's keys,
//          and the two non-exported subpaths (`/parsing`, `/units`) and the bare
//          root do not resolve.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../../..");
const ts = createRequire(join(ROOT, "package.json"))("typescript");
const cfgPath = join(ROOT, "tsconfig.demo.json");
const parsed = ts.getParsedCommandLineOfConfigFile(cfgPath, {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {} });
const fails = [];
const phantom = Object.keys(parsed.options.paths ?? {}).filter((k) => k.startsWith("@mkbabb/value.js"));
if (phantom.length) fails.push(`A ${phantom.length} phantom paths keys: ${phantom.join(" ")}`);

const exportsKeys = Object.keys(JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).exports);
const want = new Set(exportsKeys.map((k) => "@mkbabb/value.js" + k.slice(1)));
const candidates = [...want, "@mkbabb/value.js", "@mkbabb/value.js/parsing", "@mkbabb/value.js/units"];
const from = join(ROOT, "demo/app/main.ts");
const resolved = candidates.filter((s) => {
    const r = ts.resolveModuleName(s, from, parsed.options, ts.sys).resolvedModule;
    return !!r && !r.resolvedFileName.includes("node_modules/@mkbabb/value.js");
});
const got = new Set(resolved);
const extra = [...got].filter((s) => !want.has(s));
const missing = [...want].filter((s) => !got.has(s));
if (extra.length || missing.length) fails.push(`B parity: extra [${extra}] missing [${missing}]`);
for (const f of fails) console.error("RED", f);
console.log(fails.length ? `RED ${fails.length}` : `GREEN resolves exactly the ${want.size} exports`);
process.exit(fails.length ? 1 : 0);

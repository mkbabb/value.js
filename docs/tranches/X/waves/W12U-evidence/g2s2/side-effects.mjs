// SERVED MODEL: claude-opus-5-5
// X.W12U.g2s2: is `package.json` `"sideEffects": false` true to the emitted bytes?
// Copies a built tree's dist/*.js + dist/subpaths/*.js to a scratch dir with NO package.json (so no
// sideEffects flag applies), then for every emitted file bundles `import "<file>";` alone with rolldown
// (tree-shaking on, every module presumed side-effectful, minified) and prints what survives. A file
// whose bare import bundles to nothing has no top-level effect the bundler can see.
// Usage: node side-effects.mjs <tree> <scratch-out>
import { rolldown } from "rolldown";
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const [tree, out] = process.argv.slice(2);
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "lib/subpaths"), { recursive: true });
const files = [];
for (const f of readdirSync(join(tree, "dist"))) if (f.endsWith(".js")) { cpSync(join(tree, "dist", f), join(out, "lib", f)); files.push(f); }
for (const f of readdirSync(join(tree, "dist/subpaths"))) if (f.endsWith(".js")) { cpSync(join(tree, "dist/subpaths", f), join(out, "lib/subpaths", f)); files.push("subpaths/" + f); }
let effectful = 0;
for (const f of files.sort()) {
  const entry = join(out, "entry.mjs");
  writeFileSync(entry, `import ${JSON.stringify(join(out, "lib", f))};\n`);
  const b = await rolldown({ input: entry, treeshake: { moduleSideEffects: true }, logLevel: "silent" });
  const { output } = await b.generate({ format: "es", minify: true });
  await b.close();
  const code = output[0].code.replace(/\/\/#.*$/gm, "").trim();
  if (code.length) effectful++;
  console.log(f.replace(/-[\w-]{8}\.js$/, ".js"), "survives=" + code.length, code.slice(0, 160).replace(/\n/g, " "));
}
console.log("EFFECTFUL", effectful, "of", files.length);

// Part 2: what the survivors DO. The bundler keeps a top-level call it cannot prove pure (`Object.freeze`,
// `new Set`, a matrix inverse, `createParser(actions)`), so part 1 reads the flag as REQUIRED; whether
// `false` is TRUE is read by executing each file alone in a fresh node and diffing the observable global
// state: globalThis's own keys and every own key of the built-in prototypes and constructors.
import { spawnSync } from "node:child_process";
const probe = `
const targets = { globalThis, Object, Array, String, Number, Function, Map, Set, Promise, Symbol, JSON, Math, Reflect,
  ObjectP: Object.prototype, ArrayP: Array.prototype, StringP: String.prototype, NumberP: Number.prototype,
  FunctionP: Function.prototype, MapP: Map.prototype, SetP: Set.prototype, PromiseP: Promise.prototype, RegExpP: RegExp.prototype };
const snap = () => Object.fromEntries(Object.entries(targets).map(([k, o]) => [k, Reflect.ownKeys(o).map(String).sort().join(",")]));
const before = snap(); await import(process.argv[1]); const after = snap();
const diff = Object.keys(before).filter((k) => before[k] !== after[k]);
console.log(diff.length ? "GLOBAL-WRITE " + diff.join(",") : "no-global-write");`;
let writers = 0;
for (const f of files.sort()) {
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", probe, join(out, "lib", f)], { encoding: "utf8" });
  const line = (r.stdout.trim() || r.stderr.trim().split("\n")[0]);
  if (line !== "no-global-write") writers++;
  console.log("exec", f.replace(/-[\w-]{8}\.js$/, ".js"), line);
}
console.log("GLOBAL-WRITERS", writers, "of", files.length, writers === 0 ? '=> "sideEffects": false is TRUE to the bytes (and REQUIRED: part 1)' : '=> "sideEffects": false is FALSE to the bytes');

// Regenerates out/*.generated.js: (1) rule names from the BBNF front end, (2) the action manifest by
// running value.js's own attach code against the slot table, (3) the emitter, one file per variant.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { emit, frontEnd, grammarText } from "./emit.mjs";
import { build, common, rawPlugin, aotPlugin, here } from "./build-lib.mjs";
const out = path.join(here, "out"); mkdirSync(out, { recursive: true });
const text = grammarText();
const names = [...frontEnd(text).ast.keys()];
const stub = path.join(out, "names-stub.mjs");
writeFileSync(stub, `export const RULE_NAMES = ${JSON.stringify(names)}; export const ACTION_MANIFEST = {}; export function createParser() { throw new Error("stub"); }\n`);
const manifestOf = async (textActions) => {
    const f = path.join(out, `manifest-${textActions ? "text" : "orig"}.mjs`);
    await build({ ...common, entryPoints: [path.join(here, "gen", "manifest-entry.ts")], outfile: f, plugins: [rawPlugin, aotPlugin(stub, textActions)] });
    const m = JSON.parse(execFileSync("node", [f], { encoding: "utf8" }));
    writeFileSync(f.replace(/\.mjs$/, ".json"), JSON.stringify(m, null, 1));
    return m;
};
const manifests = { orig: await manifestOf(false), text: await manifestOf(true) };
for (const [k, m] of Object.entries(manifests)) console.log(k, "rules", names.length, "actions", Object.keys(m).length, Object.entries(m).filter(([, x]) => x !== "map").map(([n, x]) => `${n}:${x}`).join(" "));
// variant → [actions, emitter options]
const variants = { full: ["orig", { memo: false }], nolower: ["orig", { lower: false, memo: false }], plain: ["orig", { prune: false, recognizers: false, lower: false, memo: false }], text: ["text", {}], textnomemo: ["text", { memo: false }] };
for (const [v, [m, o]] of Object.entries(variants)) {
    const src = emit(text, manifests[m], o);
    const file = path.join(out, `css-grammar.${v}.generated.js`);
    if (process.argv.includes("--check")) {
        // CI drift gate: regenerate in memory; any byte difference from the checked-in artifact fails.
        const have = existsSync(file) ? readFileSync(file, "utf8") : "";
        if (have !== src) { console.error(`STALE: ${file} differs from a fresh generation`); process.exitCode = 1; }
        else console.log(v, "up to date");
        continue;
    }
    writeFileSync(file, src);
    console.log(v, src.length, "bytes");
}

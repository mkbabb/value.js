// SERVED MODEL: claude-opus-5-5
// X.P.W8 Repair 1 — the disposable one-off that authors the `random-item()` ruled rows (evidence; run once,
// on the settled miss list):  npx vite-node bench/records/W8r1/rule.ts <(gunzip -c bench/records/W8r1/vc-before.txt.gz)
// Reads the unruled misses the V-C instrument printed, requires every one to be a random-item() case in the
// vendored css-values-5 files (HALT otherwise), matches each to its exact corpus case, MEASURES the
// mechanism the row names (a valid case refused or re-spaced, an invalid case read as a generic <function>),
// and appends one explicit row per case to bench/wpt-conformance/ruled.json.
import { readFileSync, writeFileSync } from "node:fs";
import { parseCssValue, serializeCssValue } from "../../../src/css/index";

type Case = { file: string; kind: string; property: string; input: string; expected?: string[] };
const corpus = (JSON.parse(readFileSync("test/css/wpt-values/cases-2026-10-07.json", "utf8")) as { cases: Case[] }).cases;
const ruledPath = "bench/wpt-conformance/ruled.json";
const ruled = JSON.parse(readFileSync(ruledPath, "utf8")) as { rows: object[] };
const lines = readFileSync(process.argv[2]!, "utf8").split("\n").filter((l) => l.startsWith("MISS "));

function halt(why: string): never { throw new Error(`HALT: ${why}`); }
const HELP = /<link rel="help" href="https:\/\/drafts\.csswg\.org\/css-values-5\/#funcdef-random-item">/;
for (const f of ["random-item-valid.html", "random-item-invalid.html"]) {
    if (!HELP.test(readFileSync(`test/css/wpt-values/wpt/css/css-values/${f}`, "utf8"))) halt(`${f} does not cite css-values-5 random-item()`);
}
const CLASS = "W8r1-CSS-VALUES-5";
const SPEC = "css-values-5 #funcdef-random-item (§9.2 random-item()); W8.md §Scope 1 (css-values-4)";
const WHY = "random-item() is defined by CSS Values 5 (the vendored WPT file's rel=help names css-values-5 #funcdef-random-item), a level X.P.W8's corpus scope does not claim (W8.md §Scope 1: css-values-4 math, url, attr, units) and value.js's value model does not read as a function of its own (no item lists, no {} blocks); the BBNF cure written at .v (DIVERGENCE-LEDGER §19-V) measured 848 B gz over the E-6 ceiling.";

let added = 0;
for (const line of lines) {
    const m = /^MISS (\S+) (\S+) ([\w-]+): (".*?")(?: expected=.*)?$/.exec(line) ?? halt(`unreadable ${line}`);
    const [, why, file, property, json] = m;
    if (!/^css\/css-values\/random-item-(?:in)?valid\.html$/.test(file!)) halt(`not a random-item() case ${line}`);
    const input = JSON.parse(json!) as string;
    if (!/^random-item\(/i.test(input)) halt(`not a random-item() input ${line}`);
    const c = corpus.find((x) => x.file === file && x.property === property && x.input === input) ?? halt(`no case ${line}`);
    const parsed = parseCssValue(input);
    let read: string;
    if (why === "accepted") {
        if (c.kind !== "invalid" || !parsed.ok) halt(`not accepted ${line}`);
        read = " Measured: accepted as a generic <function> (invalid only against random-item()'s own grammar).";
    } else if (why === "refused") {
        if (c.kind !== "valid" || parsed.ok) halt(`not refused ${line}`);
        read = ` Measured: refused ${parsed.diagnostics[0]!.code} (an empty item or a {} block, which a generic <function> argument list does not hold).`;
    } else if (why === "serialization") {
        if (!parsed.ok) halt(`not parsed ${line}`);
        const text = serializeCssValue(parsed.value);
        if (!text.ok) halt(`serialize ${line}`);
        const again = parseCssValue(text.value);
        const fix = again.ok ? serializeCssValue(again.value) : again;
        if (!fix.ok || fix.value !== text.value) halt(`not a fixpoint ${line}`);
        read = ` Measured: parses and serializes as a generic <function> (a fixpoint, ${JSON.stringify(text.value)}); WPT keeps random-item()'s authored comma spacing.`;
    } else halt(`kind ${line}`);
    ruled.rows.push({ file, kind: c.kind, property, input, class: CLASS, reason: WHY + read, spec: SPEC });
    added++;
}
if (added !== 14) halt(`expected the 14 ESC-W8v-1 cases, read ${added}`);
writeFileSync(ruledPath, JSON.stringify(ruled, null, 2) + "\n");
console.log(`added ${added} rows → ${ruled.rows.length}`, JSON.stringify({ [CLASS]: added }));

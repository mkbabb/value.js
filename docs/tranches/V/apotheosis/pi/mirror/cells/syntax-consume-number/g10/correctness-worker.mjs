import { ParserState } from "@mkbabb/parse-that/core";
import { pathToFileURL } from "node:url";

const [mode, modulePath, exportName, casesPath] = process.argv.slice(2);
if (mode === "--hang") await new Promise(() => {});
if (!modulePath || !exportName || !casesPath) throw new Error("worker requires module, export, and cases paths");
const cases = JSON.parse(await (await import("node:fs/promises")).readFile(casesPath, "utf8")).cases;
const loaded = await import(pathToFileURL(modulePath).href);

const same = (actual, expected) => actual.type === expected.type
    && actual.sign === expected.sign
    && Object.is(actual.value, expected.negative_zero ? -0 : expected.value);

for (const test of cases) {
    let actual;
    if (mode === "--peer") actual = loaded.observePeer(exportName, test.source, test.offset);
    else if (mode === "--candidate") {
        const parser = loaded[exportName];
        if (parser?.call === undefined) throw new Error(`${exportName} is not a parser`);
        const state = new ParserState(test.source, undefined, test.offset);
        parser.call(state);
        actual = state.isError ? { ok: false, end: state.offset } : { ok: true, end: state.offset, ...state.value };
    } else throw new Error(`unknown mode: ${mode}`);
    if (!actual.ok || actual.end !== test.end || !same(actual, test)) throw new Error(`${test.id}: observation mismatch`);
}
process.stdout.write(`${JSON.stringify({ status: "PASS", mode, export: exportName, cases: cases.length })}\n`);

import { readFileSync } from "node:fs";
import { buildBundle, runBundle, sha256 } from "./lib.mjs";

const corpusPath = new URL("./peer-corpus.json", import.meta.url);
const corpus = JSON.parse(readFileSync(corpusPath, "utf8"));
const built = await buildBundle(new URL("./peer-worker.mts", import.meta.url).pathname);
const execution = await runBundle(built.output, [corpusPath.pathname], { timeoutMs: 5000, maxBytes: 1048576 });
if (execution.timedOut || execution.overflow || execution.code !== 0 || execution.stderr !== "") throw new Error(`peer execution failed: ${JSON.stringify(execution)}`);
const observed = JSON.parse(execution.stdout);
const expectedValue = (row) => row.value_kind === "negative-zero" ? -0 : row.value_kind === "positive-infinity" ? Infinity : row.value_kind === "negative-infinity" ? -Infinity : row.value;
const matches = (actual, row) => actual.ok === true && actual.end === row.end && Object.is(actual.value, expectedValue(row)) && actual.type === row.type && actual.sign === row.sign;
const names = ["live_regex", "deposed", "c14"];
const lanes = {};
for (const name of names) {
    const included = []; const excluded = [];
    for (const row of corpus.cases) (matches(observed.observations[name][row.id], row) ? included : excluded).push(row.id);
    lanes[name] = { included, excluded };
}
const common = corpus.cases.filter((row) => names.every((name) => matches(observed.observations[name][row.id], row))).map((row) => row.id);
const report = { schema: "value.pi.syntax-consume-number.g12.peer-result/v1", status: "PASS", cases: corpus.cases.length, common, lanes, observations: observed.observations };
if (process.argv[2] === "--print") process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else if (process.argv[2] === "--verify") {
    const expected = JSON.parse(readFileSync(new URL("./peer-expected.json", import.meta.url), "utf8"));
    const actual = { schema: "value.pi.syntax-consume-number.g12.peer-expected/v1", cases: report.cases, common: report.common, lanes: report.lanes, observations_sha256: sha256(JSON.stringify(report.observations)) };
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("peer observation or lane drift");
    process.stdout.write(`${JSON.stringify({ status: "PASS", cases: report.cases, common: report.common, exact_expected: true })}\n`);
} else throw new Error("usage: --print | --verify");

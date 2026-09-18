import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const mirror = resolve(root, "../../..");
const corpusPath = join(root, "peer-corpus.json");
const corpus = JSON.parse(readFileSync(corpusPath, "utf8"));
const worker = join(root, "peer-worker.mjs");
const loader = join(mirror, "node_modules/tsx/dist/loader.mjs");
const resolver = join(root, "peer-resolver.mjs");

const child = spawn(process.execPath, ["--import", resolver, "--import", loader, worker, corpusPath], {
    cwd: root,
    env: { ...process.env, NODE_PATH: join(mirror, "node_modules") },
    stdio: ["ignore", "pipe", "pipe"],
});
let stdout = ""; let stderr = ""; let timedOut = false;
child.stdout.on("data", (chunk) => { stdout += chunk; });
child.stderr.on("data", (chunk) => { stderr += chunk; });
const timer = setTimeout(() => { timedOut = true; child.kill("SIGKILL"); }, 5000);
const result = await new Promise((resolveResult, reject) => {
    child.once("error", reject);
    child.once("close", (code, signal) => resolveResult({ code, signal }));
});
clearTimeout(timer);
if (timedOut || result.code !== 0) throw new Error(`peer execution failed: ${JSON.stringify({ ...result, timedOut, stdout, stderr })}`);
const executed = JSON.parse(stdout);

const expectedValue = (test) => test.value_kind === "negative-zero" ? -0
    : test.value_kind === "positive-infinity" ? Infinity
    : test.value_kind === "negative-infinity" ? -Infinity
    : test.value;
const matches = (actual, test) => actual.ok && actual.end === test.end && Object.is(actual.value, expectedValue(test)) && actual.type === test.type && actual.sign === test.sign;
const peerNames = ["live_regex", "deposed", "c14"];
const lanes = {};
for (const name of peerNames) {
    const included = []; const excluded = [];
    for (const test of corpus.cases) (matches(executed.observations[name][test.id], test) ? included : excluded).push(test.id);
    lanes[name] = { included, excluded };
}
const common = corpus.cases.filter((test) => peerNames.every((name) => matches(executed.observations[name][test.id], test))).map((test) => test.id);
if (common.length === 0) throw new Error("no honest common peer lane");
process.stdout.write(`${JSON.stringify({ status: "PASS", execution: "EXACT_PINNED_DOORS_BEFORE_NORMALIZATION", cases: corpus.cases.length, common, lanes, observations: executed.observations }, null, 2)}\n`);

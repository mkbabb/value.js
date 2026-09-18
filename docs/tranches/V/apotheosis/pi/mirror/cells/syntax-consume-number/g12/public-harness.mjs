import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { root, runBounded } from "./lib.mjs";

const [mode, seat, closure] = process.argv.slice(2);
if (mode !== "--candidate" || !["h", "b", "s", "d"].includes(seat) || !closure) throw new Error("usage: --candidate <h|b|s|d> <candidate-closure.json>");
const corpus = JSON.parse(readFileSync(new URL("./public-corpus.json", import.meta.url), "utf8"));
const result = await runBounded(process.execPath, [resolve(root, "candidate-closure.mjs"), "--run", seat, resolve(closure)], corpus.limits);
if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "") throw new Error(`candidate closure invocation failed: ${JSON.stringify(result)}`);
const parsed = JSON.parse(result.stdout);
const expected = { schema: "value.pi.syntax-consume-number.g12.public-result/v1", status: "PASS", success_cases: 70, failure_runs: 168, hostile_runs: 10, composition_cases: 5, signed_integer_exponents: 4 };
if (JSON.stringify(parsed) !== JSON.stringify(expected)) throw new Error(`public result shape drift: ${result.stdout}`);
process.stdout.write(`${JSON.stringify(parsed)}\n`);

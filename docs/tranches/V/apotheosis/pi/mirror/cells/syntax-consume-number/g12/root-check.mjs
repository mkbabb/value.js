import { buildBundle, root, runBundle } from "./lib.mjs";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const corpus = join(root, "public-corpus.json");
const worker = join(root, "public-worker.ts");
const expected = { schema: "value.pi.syntax-consume-number.g12.public-result/v1", status: "PASS", success_cases: 70, failure_runs: 168, hostile_runs: 10, composition_cases: 5, signed_integer_exponents: 4 };
const shapes = Object.fromEntries(["h", "b", "s", "d"].map((seat) => [seat, readFileSync(join(root, "root", "probes", seat, "index.ts"), "utf8")]));
if (!shapes.h.includes("[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?")) throw new Error("H lost whole-prefix recognizer");
for (const seat of ["b", "s"]) if (shapes[seat].includes("[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?") || shapes[seat].includes(".peek()")) throw new Error(`${seat} shares H recognizer`);
if (!shapes.b.includes("all(") || !shapes.b.includes("any(") || !shapes.s.includes(".then(") || !shapes.d.includes("dispatch(")) throw new Error("orthogonal root construction assay drift");
for (const seat of ["h", "b", "s", "d"]) {
    const built = await buildBundle(worker, join(root, "root", "probes", seat, "index.ts"));
    const result = await runBundle(built.output, [corpus], { timeoutMs: 5000, maxBytes: 1048576 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "" || JSON.stringify(JSON.parse(result.stdout)) !== JSON.stringify(expected)) throw new Error(`root topology ${seat} failed: ${JSON.stringify(result)}`);
}
const incomplete = await buildBundle(worker, join(root, "root", "incomplete-signed-exponent.ts"));
const rejected = await runBundle(incomplete.output, [corpus], { timeoutMs: 5000, maxBytes: 1048576 });
if (rejected.timedOut || rejected.overflow || rejected.code === 0 || !rejected.stderr.includes("cross/+/7/e2: observation mismatch")) throw new Error(`G11 incomplete parser was not rejected: ${JSON.stringify(rejected)}`);
process.stdout.write(`${JSON.stringify({ status: "PASS", topology_probes: 4, orthogonal_recognizers: "H_REGEX_B_FACTORIZED_S_STAGED_D_DISPATCH", reproduced_incomplete_parser: "REJECTED_ON_SIGNED_INTEGER_EXPONENT", timing_gates: 0 })}\n`);

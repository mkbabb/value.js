// SERVED MODEL: claude-opus-5-5
// X.W12U.q — failed tests (and failed files with no test result) of a vitest JSON report.
// usage: node vitest-fails.mjs results/vitest-rN.json
import { readFileSync } from "node:fs";
const r = JSON.parse(readFileSync(process.argv[2], "utf8"));
let n = 0;
for (const f of r.testResults) {
    const file = f.name.replace(/.*value\.js\//, "");
    const bad = f.assertionResults.filter((a) => a.status === "failed");
    for (const a of bad) { n++; console.log(`T ${file} › ${a.fullName.slice(0, 120)} :: ${(a.failureMessages?.[0] ?? "").split("\n")[0].slice(0, 110)}`); }
    if (f.status === "failed" && bad.length === 0) console.log(`F ${file} (file-level) :: ${(f.message ?? "").split("\n")[0].slice(0, 140)}`);
}
console.log(`COUNT failedTests=${n} numFailedTests=${r.numFailedTests} numPassedTests=${r.numPassedTests} numTotalTests=${r.numTotalTests} failedSuites=${r.numFailedTestSuites}/${r.numTotalTestSuites}`);

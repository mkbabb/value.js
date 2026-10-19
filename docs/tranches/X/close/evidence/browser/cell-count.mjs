// SERVED MODEL: claude-opus-5-5
//
// X.W11.d · G7 — the executed-count reading, taken apart from the exit code (W11.md G7
// Falsifier; fold S6 / W11.10). Reads a Playwright JSON report and prints, per project:
// executed (= expected + unexpected + flaky; skipped is NOT executed) · passed · failed ·
// flaky · skipped. Verdict GREEN only when executed > 0 AND failed == 0; a report with
// zero executed tests is VACUOUS and fails, whatever the run's exit code was.
//
// Usage: node cell-count.mjs <report.json | report.json.gz> [...]
import fs from "node:fs";
import zlib from "node:zlib";

let bad = 0;
for (const file of process.argv.slice(2)) {
    const raw = fs.readFileSync(file);
    const j = JSON.parse(
        (file.endsWith(".gz") ? zlib.gunzipSync(raw) : raw).toString("utf8"),
    );
    const per = {};
    const walk = (s) => {
        for (const x of s.suites ?? []) walk(x);
        for (const sp of s.specs ?? [])
            for (const t of sp.tests) {
                const p = (per[t.projectName] ??= {
                    expected: 0,
                    unexpected: 0,
                    flaky: 0,
                    skipped: 0,
                });
                p[t.status] += 1;
            }
    };
    for (const s of j.suites ?? []) walk(s);
    const st = j.stats;
    const executed = st.expected + st.unexpected + st.flaky;
    const verdict = executed === 0 ? "VACUOUS" : st.unexpected > 0 ? "RED" : "GREEN";
    if (verdict !== "GREEN") bad += 1;
    console.log(
        `${file}: executed=${executed} passed=${st.expected} failed=${st.unexpected} flaky=${st.flaky} skipped=${st.skipped} -> ${verdict}`,
    );
    for (const [p, c] of Object.entries(per))
        console.log(
            `  ${p}: executed=${c.expected + c.unexpected + c.flaky} passed=${c.expected} failed=${c.unexpected} flaky=${c.flaky} skipped=${c.skipped}`,
        );
}
process.exit(bad ? 1 : 0);

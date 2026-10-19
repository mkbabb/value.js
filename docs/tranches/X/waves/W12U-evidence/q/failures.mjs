// SERVED MODEL: claude-opus-5-5
// X.W12U.q — list a run's outcomes from Playwright's JSON report (§0ev.2).
// usage: node failures.mjs <results/tag-project.json> [--ids]
//   default: one line per NOT-passed test: file:line · status · seconds ·
//            1-min load at its start (nearest logs/load-samples.txt row) · first error line
//   --ids:   only `file:line` (the re-run list)
//   --notrun: only `file:line` of the tests an interrupted report never reached
// Last line (default mode): counts, read from the same walk.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const [file, flag] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname);
const samples = existsSync(path.join(here, "logs/load-samples.txt"))
    ? readFileSync(path.join(here, "logs/load-samples.txt"), "utf8").trim().split("\n").map((l) => { const p = l.split(" "); return [Number(p[0]) * 1000, Number(p[3])]; })
    : [];
const loadAt = (ms) => {
    let best = null;
    for (const s of samples) if (best === null || Math.abs(s[0] - ms) < Math.abs(best[0] - ms)) best = s;
    return best && Math.abs(best[0] - ms) < 60_000 ? best[1].toFixed(0) : "?";
};
const strip = (s) => String(s ?? "").replace(/\u001b\[[0-9;]*m/g, "");
const report = JSON.parse(readFileSync(file, "utf8"));
const count = { passed: 0, failed: 0, timedOut: 0, skipped: 0, interrupted: 0 };
const rows = [];
const notrun = new Set();
const walk = (suite) => {
    for (const s of suite.suites ?? []) walk(s);
    for (const spec of suite.specs ?? [])
        for (const t of spec.tests ?? []) {
            const r = t.results?.[t.results.length - 1];
            const st = r?.status ?? "skipped";
            // --notrun: the tests an INTERRUPTED report never reached (no result, or the
            // 0 ms "skipped" rows it writes for them) and the one it was interrupted in.
            if (flag === "--notrun") {
                if (!r || st === "interrupted" || (st === "skipped" && (r.duration ?? 0) === 0)) notrun.add(`${spec.file}:${spec.line}`);
                continue;
            }
            count[st] = (count[st] ?? 0) + 1;
            if (st === "passed" || st === "skipped") continue;
            const err = strip(r?.error?.message ?? r?.errors?.[0]?.message ?? "").split("\n").filter(Boolean);
            const loc = r?.error?.location ?? r?.errors?.[0]?.location;
            rows.push({ id: `${spec.file}:${spec.line}`, st, s: ((r?.duration ?? 0) / 1000).toFixed(1), load: loadAt(Date.parse(r?.startTime ?? 0)), at: loc ? `:${loc.line}` : "", err: (err[0] ?? "").slice(0, 150), title: spec.title.slice(0, 70) });
        }
};
for (const s of report.suites ?? []) walk(s);
if (flag === "--notrun") console.log([...notrun].join("\n"));
else if (flag === "--ids") console.log([...new Set(rows.map((r) => r.id))].join("\n"));
else {
    for (const r of rows) console.log(`${r.id} · ${r.st} · ${r.s}s · load ${r.load} · ${r.title} · at${r.at} ${r.err}`);
    console.log(`COUNT passed=${count.passed} failed=${count.failed} timedOut=${count.timedOut} skipped=${count.skipped} interrupted=${count.interrupted} total=${Object.values(count).reduce((a, b) => a + b, 0)}`);
}

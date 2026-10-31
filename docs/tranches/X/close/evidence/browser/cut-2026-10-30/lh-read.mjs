// SERVED MODEL: claude-opus-5-5
// X.W11.cut: reads one Lighthouse JSON and its saved trace: mode, the modeled TBT and long tasks, and the raw (observed)
// main-thread tasks over 50 ms with what ran inside them. usage: node lh-read.mjs <report.json> [<trace.json>]
import { readFileSync } from "node:fs";
const [rep, tr] = process.argv.slice(2);
const r = JSON.parse(readFileSync(rep));
const a = r.audits;
const row = { mode: r.configSettings.throttlingMethod, cpu: r.configSettings.throttling.cpuSlowdownMultiplier, tbt: Math.round(a["total-blocking-time"].numericValue),
    lhLongTasks: (a["long-tasks"].details?.items ?? []).slice(0, 4).map((i) => Math.round(i.duration)),
    observedFcp: a.metrics.details.items[0].observedFirstContentfulPaint, tti: a.metrics.details.items[0].interactive };
if (tr) {
    const ev = JSON.parse(readFileSync(tr)).traceEvents;
    const main = ev.find((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain" && ev.some((x) => x.pid === e.pid && x.name === "EvaluateScript"));
    const on = ev.filter((e) => e.pid === main.pid && e.tid === main.tid && e.ph === "X");
    const t0 = Math.min(...on.map((e) => e.ts));
    const short = (u) => (u ? u.split("/").pop() : "");
    row.rawTasks = on.filter((e) => e.name === "RunTask" && e.dur > 50000).map((k) => ({
        at: Math.round((k.ts - t0) / 1000), dur: Math.round(k.dur / 1000),
        kids: on.filter((e) => e !== k && e.ts >= k.ts && e.ts + e.dur <= k.ts + k.dur && e.dur > 10000 && e.name !== "RunTask")
            .sort((x, y) => y.dur - x.dur).slice(0, 6)
            .map((e) => `${e.name}${short(e.args?.data?.url ?? e.args?.data?.scriptName)?`@${short(e.args?.data?.url ?? e.args?.data?.scriptName)}`:""}${e.args?.data?.functionName?`:${e.args.data.functionName}`:""} ${Math.round(e.dur/1000)}`),
    }));
}
console.log(JSON.stringify(row));

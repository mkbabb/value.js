// SERVED MODEL: claude-opus-5-5
// X.W11.cut: trace-tbt.mjs of repair2-15-2026-10-30 (dated, immutable) with the gate's rank imported from
// frame-budget.ts (Check 3 D-7) and a per-chunk total, for the dock-mount row. The original's header follows.
// X-W11 Repair 2 (RESUME fifteenth), Check 2 D-4/D-5: attributes the blocking time of
// eager-payload's mobile-4x-cpu load on the real-GPU cell. Read-only against the built
// bundle; it asserts no bar and changes none. Same launch as e2e/smoke/perf/real-gpu.ts:
// branded headless Chrome (channel "chrome") with ANGLE Metal, because that is the cell of
// record named by COHESION §0gw.1 and the readings under attribution came from it.
// One browser, a new context per load, everything closed in finally (machine law).
// usage: node trace-tbt.mjs <origin> <loads> <out.json>
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { loadavg } from "node:os";
import { percentile } from "../../../../../../../e2e/smoke/perf/frame-budget.ts";

const [origin, loadsArg, out] = process.argv.slice(2);
const LOADS = Number(loadsArg);
const SETTLE_MS = Number(process.env.TRACE_SETTLE_MS ?? 3000); // default = eager-payload.spec.ts SETTLE_MS
const LONG = 50;

const short = (u) => (u ? u.split("/").pop().split("?")[0] : "");

/** Self time per `chunk :: function` of the samples that land inside the long tasks. */
function attribute(profile, tasks) {
    const byId = new Map(profile.nodes.map((n) => [n.id, n]));
    const self = new Map();
    let t = profile.startTime;
    profile.samples.forEach((id, i) => {
        t += profile.timeDeltas[i];
        const task = tasks.find((k) => t >= k.ts && t <= k.ts + k.dur);
        if (!task) return;
        const f = byId.get(id).callFrame;
        const key = `${short(f.url) || "(native)"} :: ${f.functionName || "(anon)"}`;
        self.set(key, (self.get(key) ?? 0) + profile.timeDeltas[i] / 1000);
    });
    return self;
}

// TRACE_LHCI_CELL=1: the D-5 lhci cell's binary and flags (Chrome for Testing, lighthouserc.gpu.json,
// read at the repo root), a named witness per the browser law, with lhci's mobile viewport.
const LHCI = process.env.TRACE_LHCI_CELL === "1";
const lhciFlags = LHCI
    ? JSON.parse(readFileSync("lighthouserc.gpu.json")).ci.collect.settings.chromeFlags.split(/\s+/).filter((f) => !f.startsWith("--headless"))
    : [];
const browser = await chromium.launch(
    LHCI
        ? { executablePath: chromium.executablePath(), headless: true, args: lhciFlags }
        : { channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] },
);
const loads = [];
const totals = new Map();
try {
    for (let i = 0; i < LOADS; i++) {
        const context = await browser.newContext({ viewport: LHCI ? { width: 412, height: 823 } : { width: 390, height: 844 } });
        try {
            const page = await context.newPage();
            await page.addInitScript(() => {
                window.__lt = [];
                new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration)))
                    .observe({ type: "longtask", buffered: true });
            });
            const cdp = await context.newCDPSession(page);
            await cdp.send("Network.enable");
            await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            await cdp.send("Profiler.enable");
            await cdp.send("Profiler.setSamplingInterval", { interval: 1000 });
            await cdp.send("Profiler.start");
            await browser.startTracing(page, {
                categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "toplevel", "v8", "disabled-by-default-v8.compile"],
            });
            const load1 = loadavg()[0];
            await page.goto(`${origin}/#/`);
            await page.getByRole("main").first().waitFor({ state: "visible", timeout: 30_000 });
            await page.waitForTimeout(SETTLE_MS);
            const trace = JSON.parse((await browser.stopTracing()).toString());
            const { profile } = await cdp.send("Profiler.stop");

            const ev = trace.traceEvents;
            const main = ev.find(
                (e) => e.name === "thread_name" && e.args?.name === "CrRendererMain" &&
                    ev.some((x) => x.pid === e.pid && x.name === "EvaluateScript"),
            );
            const onMain = ev.filter((e) => e.pid === main.pid && e.tid === main.tid && e.ph === "X");
            if (!onMain.some((e) => e.name === "RunTask")) throw new Error("no RunTask in the trace: a 0 here would be vacuous");
            const tasks = onMain.filter((e) => e.name === "RunTask" && e.dur / 1000 > LONG);
            const gateTbt = await page.evaluate(() => window.__lt.reduce((s, d) => s + Math.max(0, d - 50), 0));
            const shape = tasks.map((task) => {
                const kids = onMain
                    .filter((e) => e !== task && e.ts >= task.ts && e.ts + e.dur <= task.ts + task.dur && e.dur > 5000)
                    .filter((e) => /FunctionCall|EvaluateScript|FireAnimationFrame|TimerFire|v8.compile|Layout|UpdateLayoutTree|Paint|ParseHTML|ParseAuthorStyleSheet|RunMicrotasks/.test(e.name))
                    .sort((a, b) => b.dur - a.dur)
                    .slice(0, 4)
                    .map((e) => {
                        const d = e.args?.data ?? e.args?.fileName ?? {};
                        return `${e.name}${d.url ? `@${short(d.url)}` : ""}${d.functionName ? `:${d.functionName}` : ""} ${(e.dur / 1000).toFixed(0)}`;
                    });
                return { dur: Math.round(task.dur / 1000), kids };
            });
            const tbt = tasks.reduce((s, k) => s + (k.dur / 1000 - LONG), 0);
            const self = attribute(profile, tasks);
            tasks.forEach((task, n) => {
                const one = attribute(profile, [task]);
                shape[n].selfByChunk = {};
                for (const [k, v] of one) {
                    const c = k.split(" :: ")[0];
                    shape[n].selfByChunk[c] = Math.round((shape[n].selfByChunk[c] ?? 0) + v);
                }
                shape[n].topSelf = [...one].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => `${k} ${Math.round(v)}`);
            });
            for (const [k, v] of self) totals.set(k, (totals.get(k) ?? 0) + v);
            loads.push({ i, load1: +load1.toFixed(1), tbt: Math.round(tbt), gateTbt: Math.round(gateTbt), longTasks: tasks.length, shape });
            console.log(`load ${i}: load1=${load1.toFixed(1)} tbt=${tbt.toFixed(0)} gateTbt=${gateTbt.toFixed(0)} tasks=${tasks.map((k) => Math.round(k.dur / 1000)).join(",")}`);
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
const tbts = loads.map((l) => l.tbt).sort((a, b) => a - b);
const gateSorted = loads.map((l) => l.gateTbt).sort((a, b) => a - b);
const byChunk = new Map();
for (const [k, v] of totals) { const c = k.split(" :: ")[0]; byChunk.set(c, (byChunk.get(c) ?? 0) + v); }
const chunks = [...byChunk].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => ({ chunk: k, meanSelfMsInLongTasks: Math.round(v / LOADS) }));
const p75Gate = percentile(gateSorted, 75);
const top = [...totals].sort((a, b) => b[1] - a[1]).slice(0, 25)
    .map(([k, v]) => ({ site: k, meanSelfMsInLongTasks: Math.round(v / LOADS) }));
writeFileSync(out, JSON.stringify({ origin, loads: LOADS, p75Gate, tbtSorted: tbts, gateSorted, chunks, top, perLoad: loads }, null, 1));
console.log(JSON.stringify({ p75Gate, gateSorted, chunks, top: top.slice(0, 15) }));

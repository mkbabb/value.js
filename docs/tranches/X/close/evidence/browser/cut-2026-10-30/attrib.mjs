// SERVED MODEL: claude-opus-5-5
// X.W11.cut (COHESION §0gx.3): separates the two consumer candidates by caller and by long task.
// Wraps CSSStyleDeclaration.getPropertyValue and {Element,Document}.getAnimations with a timer and a
// short stack, on the real-GPU launch (e2e/smoke/perf/real-gpu.ts), 390x844, 4x CPU, cold cache,
// 3000 ms settle. Not a gate reading: the wrappers cost time. Asserts no bar.
// percentile comes from e2e/smoke/perf/frame-budget.ts (Check 3 D-7), so ranks match the gate's.
// One browser, a new context per load, closed in finally. Usage: node attrib.mjs <origin> <loads> <out.json>
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { loadavg } from "node:os";
import { percentile } from "../../../../../../../e2e/smoke/perf/frame-budget.ts";

const [origin, loadsArg, out] = process.argv.slice(2);
const init = () => {
    window.__lt = [];
    window.__calls = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push({ t: e.startTime, d: e.duration })))
        .observe({ type: "longtask", buffered: true });
    const wrap = (proto, name, label) => {
        const orig = proto[name];
        proto[name] = function (...a) {
            const t = performance.now();
            const r = orig.apply(this, a);
            const d = performance.now() - t;
            if (d >= 0.5) {
                const frames = new Error().stack.split("\n").slice(2, 7)
                    .map((s) => s.trim().replace(/^at /, "").replace(/https?:\/\/[^/]+\/(assets\/)?/, ""));
                window.__calls.push({ what: label, arg: typeof a[0] === "string" ? a[0] : "", cls: this?.className?.toString?.().slice(0, 40) ?? "", t, d, frames });
            }
            return r;
        };
    };
    wrap(CSSStyleDeclaration.prototype, "getPropertyValue", "getPropertyValue");
    wrap(Element.prototype, "getAnimations", "el.getAnimations");
    wrap(Document.prototype, "getAnimations", "doc.getAnimations");
};
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const loads = [];
try {
    for (let i = 0; i < Number(loadsArg); i++) {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
        try {
            const page = await context.newPage();
            await page.addInitScript(init);
            const cdp = await context.newCDPSession(page);
            await cdp.send("Network.enable");
            await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            const load1 = loadavg()[0];
            await page.goto(`${origin}/#/`);
            await page.getByRole("main").first().waitFor({ state: "visible", timeout: 30_000 });
            await page.waitForTimeout(3000);
            const { lt, calls } = await page.evaluate(() => ({ lt: window.__lt, calls: window.__calls }));
            const task = (t) => lt.findIndex((k) => t >= k.t && t <= k.t + k.d);
            loads.push({
                i, load1: +load1.toFixed(1),
                tbt: Math.round(lt.reduce((s, k) => s + Math.max(0, k.d - 50), 0)),
                tasks: lt.map((k) => Math.round(k.d)),
                calls: calls.map((c) => ({ ...c, t: Math.round(c.t), d: +c.d.toFixed(1), task: task(c.t) })),
            });
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
const tbts = loads.map((l) => l.tbt);
const sum = (f) => {
    const m = new Map();
    for (const l of loads) for (const c of l.calls) { const k = f(c); m.set(k, (m.get(k) ?? 0) + c.d); }
    return [...m].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => ({ site: k, meanMsPerLoad: +(v / loads.length).toFixed(1) }));
};
const res = { origin, n: loads.length, p75Tbt: percentile(tbts, 75), tbts, bySite: sum((c) => `${c.what} ${c.arg || c.cls} task=${c.task} <- ${c.frames[0]}`), perLoad: loads };
writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ p75Tbt: res.p75Tbt, tbts, tasks: loads.map((l) => l.tasks), top: res.bySite.slice(0, 14) }, null, 0));

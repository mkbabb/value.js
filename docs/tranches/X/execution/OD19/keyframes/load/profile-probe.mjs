// CPU profile of (a) cold boot to #/cube and (b) warm swaps, CPU 4x. Aggregates
// self time by function@file. Usage: node profile-probe.mjs <out.json> [BASE]
import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:4181/";
const agg = (p) => {
    const by = new Map(); const nodes = new Map(p.nodes.map((n) => [n.id, n]));
    const dt = p.timeDeltas; const self = new Map();
    p.samples.forEach((id, i) => self.set(id, (self.get(id) ?? 0) + (dt[i] ?? 0) / 1000));
    for (const [id, ms] of self) { const n = nodes.get(id); const cf = n.callFrame; const k = `${cf.functionName || "(anon)"}@${(cf.url.split("/").pop() || cf.url).replace(/-[\w-]{8}\.js/, ".js")}:${cf.lineNumber}`; by.set(k, (by.get(k) ?? 0) + ms); }
    const byFile = new Map(); for (const [k, v] of by) { const f = k.split("@")[1].split(":")[0]; byFile.set(f, (byFile.get(f) ?? 0) + v); }
    const top = (m, n) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => [k, Math.round(v)]);
    const parent = new Map(); for (const n of p.nodes) for (const ch of n.children ?? []) parent.set(ch, n.id);
    const nm = (n) => `${n.callFrame.functionName || "(anon)"}@${(n.callFrame.url.split("/").pop() || "").replace(/-[\w-]{8}\.js/, ".js")}:${n.callFrame.lineNumber}:${n.callFrame.columnNumber}`;
    const chains = new Map();
    for (const [id, ms] of self) { const n = nodes.get(id); if (!/^(getPropertyValue|elementsFromPoint|getBoundingClientRect|_readFromDomElements|getComputedStyle|removeChild)$/.test(n.callFrame.functionName)) continue; let c = [nm(n)]; let q = parent.get(id); for (let i = 0; i < 6 && q; i++) { c.push(nm(nodes.get(q))); q = parent.get(q); } const k = c.join(" < "); chains.set(k, (chains.get(k) ?? 0) + ms); }
    return { fns: top(by, 25), files: top(byFile, 12), chains: top(chains, 8) };
};
const out = {};
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    try {
        const c = await ctx.newCDPSession(page);
        await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        await c.send("Profiler.enable"); await c.send("Profiler.setSamplingInterval", { interval: 200 });
        await c.send("Profiler.start");
        await page.goto(BASE + "#/cube", { waitUntil: "load" });
        await page.waitForTimeout(1500);
        out.boot = agg((await c.send("Profiler.stop")).profile);
        await page.waitForTimeout(3000);
        for (const r of (process.env.SWAPS ?? "square,easing,spring").split(",")) {
            await c.send("Profiler.start");
            await page.evaluate((h) => { location.hash = h; }, "#/" + r);
            await page.waitForTimeout(1500);
            out["swap-" + r] = agg((await c.send("Profiler.stop")).profile);
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) { console.log("==", k); console.log(v.files.map((x) => x.join(" ")).join(" | ")); console.log(v.fns.slice(0, 8).map((x) => x.join(" ")).join("\n")); console.log(v.chains.map((x) => x[1] + " " + x[0]).join("\n")); }

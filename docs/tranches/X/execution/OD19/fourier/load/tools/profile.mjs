// CPU profile of one cold load at CPU x4: self time by script and by top functions.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const [BASE = "http://localhost:4192", route = "/gallery", ready = ".gallery-card"] = process.argv.slice(2);
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  try {
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Profiler.enable");
    await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
    await cdp.send("Profiler.start");
    await page.goto(BASE + route, { waitUntil: "commit" });
    const at = await (await page.waitForFunction((s) => { const e = document.querySelector(s); return e && e.getClientRects().length && !document.querySelector("main [aria-busy=true]") ? performance.now() : false; }, ready, { polling: "raf", timeout: 60000 })).jsonValue();
    const { profile } = await cdp.send("Profiler.stop");
    const dt = new Map(); const ids = new Map(profile.nodes.map((n) => [n.id, n]));
    profile.samples.forEach((id, i) => dt.set(id, (dt.get(id) || 0) + (profile.timeDeltas[i] || 0)));
    const byUrl = new Map(), byFn = new Map();
    for (const [id, us] of dt) { const n = ids.get(id); const u = (n.callFrame.url || "(" + n.callFrame.functionName + ")").replace(/^.*\/assets\//, ""); byUrl.set(u, (byUrl.get(u) || 0) + us); const k = `${n.callFrame.functionName || "anon"} ${u}:${n.callFrame.lineNumber}:${n.callFrame.columnNumber}`; byFn.set(k, (byFn.get(k) || 0) + us); }
    console.log("content at", Math.round(at), "ms");
    [...byUrl].sort((a, b) => b[1] - a[1]).slice(0, 14).forEach(([k, v]) => console.log(String(Math.round(v / 1000)).padStart(6), k));
    console.log("--- functions");
    [...byFn].sort((a, b) => b[1] - a[1]).slice(0, 22).forEach(([k, v]) => console.log(String(Math.round(v / 1000)).padStart(6), k));
  } finally { await ctx.close(); }
} finally { await browser.close(); }

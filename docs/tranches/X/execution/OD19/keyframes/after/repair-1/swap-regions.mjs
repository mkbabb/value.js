// repair-1: inclusive CPU time by source module (the unminified build's //#region markers) across one
// cube -> <target> swap. usage: node swap-regions.mjs <unminifiedDist> [Easing|Spring|Sequence]
import fs from "node:fs"; import path from "node:path";
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist, target = "Easing"] = process.argv.slice(2);
const regionsOf = new Map();
function regionAt(url, line) {
  const f = url.split("/").pop(); if (!f.endsWith(".js")) return null;
  if (!regionsOf.has(f)) { const p = path.join(dist, "assets", f); const marks = []; if (fs.existsSync(p)) fs.readFileSync(p, "utf8").split("\n").forEach((l, i) => { const m = l.match(/^\/\/#region (.+)$/); if (m) marks.push([i, m[1]]); }); regionsOf.set(f, marks); }
  let r = null; for (const [i, n] of regionsOf.get(f)) { if (i <= line) r = n; else break; } return r ? r.replace(/^.*node_modules\//, "nm/") : f;
}
const server = await serveDist(dist);
let result;
try {
  await withBrowser(async (browser) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    // Sync points: each scene-swap measure spins 3 ms in a named function, so the profile's samples show
    // where the prepare ended and the commit ended (the window between them is VT capture + commit).
    await ctx.addInitScript(() => {
      const m = performance.measure.bind(performance);
      const spin = { kfSyncPrepare() { const t = performance.now(); while (performance.now() - t < 3); }, kfSyncCommit() { const t = performance.now(); while (performance.now() - t < 3); } };
      performance.measure = (name, o) => { const r = m(name, o); if (name === "scene-swap:prepare") spin.kfSyncPrepare(); if (name === "scene-swap:commit") spin.kfSyncCommit(); return r; };
    });
    try {
      const page = await ctx.newPage(); page.setDefaultTimeout(15000);
      await page.goto(server.url + "/#/cube", { waitUntil: "load" }); await page.waitForTimeout(4000);
      const d = page.locator(".glass-dock").first(); const b = await d.boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
      await d.locator('[aria-label="Scene"]:visible').last().click(); await page.waitForTimeout(600);
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 100 }); await cdp.send("Profiler.start");
      await page.getByRole("option", { name: target }).click();
      await page.waitForTimeout(1200);
      const { profile } = await cdp.send("Profiler.stop");
      const marks = await page.evaluate(() => Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:")).slice(-3).map((e) => [e.name.slice(11), [Math.round(e.startTime), Math.round(e.duration)]])));
      const byId = new Map(profile.nodes.map((n) => [n.id, n])); const parent = new Map();
      for (const n of profile.nodes) for (const c of n.children || []) parent.set(c, n.id);
      const incl = new Map(), self = new Map(); let total = 0;
      const ts = []; let acc = profile.startTime; profile.timeDeltas.forEach((d) => ts.push((acc += d)));
      const syncT = (fn) => { const i = profile.samples.findIndex((id) => byId.get(id).callFrame.functionName === fn); return i < 0 ? null : ts[i]; };
      const w0 = syncT("kfSyncPrepare"), w1 = syncT("kfSyncCommit");
      const windowMs = w0 && w1 ? Math.round((w1 - w0) / 1000) : null;
      profile.samples.forEach((id, i) => {
        if (w0 && w1 && (ts[i] < w0 || ts[i] > w1)) return;
        const us = profile.timeDeltas[i + 1] ?? 0; const n0 = byId.get(id); const fn0 = n0.callFrame.functionName;
        if (fn0 === "(idle)" || fn0 === "(program)" || fn0 === "(garbage collector)") { self.set(fn0, (self.get(fn0) || 0) + us); return; }
        total += us; const seen = new Set(); let cur = id;
        while (cur !== undefined) { const n = byId.get(cur); const r = regionAt(n.callFrame.url, n.callFrame.lineNumber); if (r && !seen.has(r)) { seen.add(r); incl.set(r, (incl.get(r) || 0) + us); } cur = parent.get(cur); }
        const k = (n0.callFrame.functionName || "(anon)") + " " + (regionAt(n0.callFrame.url, n0.callFrame.lineNumber) || "native"); self.set(k, (self.get(k) || 0) + us);
      });
      result = { target, marks, windowMs, jsMs: Math.round(total / 1000), inclusive: [...incl].sort((a, b) => b[1] - a[1]).slice(0, 45).map(([k, v]) => `${(v / 1000).toFixed(1)} ${k}`), self: [...self].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `${(v / 1000).toFixed(1)} ${k}`) };
    } finally { await ctx.close(); }
  }, { label: "swap-regions" });
} finally { await server.close(); }
console.log(JSON.stringify(result, null, 1));

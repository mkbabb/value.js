// repair-1: the swap's View Transition lifecycle against its frames. Wraps document.startViewTransition to stamp
// call / callback-done / ready / finished, beside the scene-swap marks and the rAF gaps. usage: node swap-vt.mjs <dist> [rate]
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist, rate = "1"] = process.argv.slice(2);
const out = [];
const server = await serveDist(dist);
try {
  await withBrowser(async (browser) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    await ctx.addInitScript(() => {
      const orig = Document.prototype.startViewTransition;
      if (!orig) return;
      Document.prototype.startViewTransition = function (arg) {
        const s = (window.__vt = { call: performance.now() });
        const cb = typeof arg === "function" ? arg : arg?.update;
        const wrapped = async () => { s.cbStart = performance.now(); try { return await cb?.(); } finally { s.cbEnd = performance.now(); } };
        const vt = orig.call(this, typeof arg === "function" ? wrapped : { ...arg, update: wrapped });
        vt.updateCallbackDone.then(() => (s.ucd = performance.now()), () => {});
        vt.ready.then(() => (s.ready = performance.now()), () => (s.readyRejected = performance.now()));
        vt.finished.then(() => (s.finished = performance.now()), () => {});
        return vt;
      };
    });
    try {
      const page = await ctx.newPage(); page.setDefaultTimeout(15000);
      if (+rate > 1) await (await ctx.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: +rate });
      await page.goto(server.url + "/#/cube", { waitUntil: "load" }); await page.waitForTimeout(4000);
      for (const target of ["Easing", "Spring", "Sequence"]) {
        const d = page.locator(".glass-dock").first(); const b = await d.boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
        await d.locator('[aria-label="Scene"]:visible').last().click(); await page.waitForTimeout(600);
        await page.evaluate(() => { window.__f = []; const t0 = (window.__t0 = performance.now()); const f = () => { const t = performance.now() - t0; window.__f.push(t); if (t < 1500) requestAnimationFrame(f); }; requestAnimationFrame(f); });
        await page.getByRole("option", { name: target }).click();
        await page.waitForTimeout(1700);
        const r = await page.evaluate(() => { const t0 = window.__t0; const rel = (x) => (x === undefined ? null : Math.round(x - t0)); const f = window.__f; const gaps = f.slice(1).map((t, i) => [Math.round(f[i]), Math.round(t - f[i])]).filter((g) => g[1] > 34); const vt = Object.fromEntries(Object.entries(window.__vt || {}).map(([k, v]) => [k, rel(v)])); const m = Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:") && e.startTime >= t0).map((e) => [e.name.slice(11), [rel(e.startTime), Math.round(e.duration)]])); return { vt, marks: m, longGaps: gaps }; });
        out.push({ target, ...r }); console.error(target, JSON.stringify(r));
        await page.mouse.move(1437, 450); await page.waitForTimeout(2500);
      }
    } finally { await ctx.close(); }
  }, { label: "swap-vt" });
} finally { await server.close(); }
console.log(JSON.stringify(out, null, 1));

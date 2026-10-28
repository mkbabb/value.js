// repair-1 diagnosis: one swap per target off #/cube via the dock Scene select,
// rAF frame gaps + scene-swap marks + LoAF script attribution. Prod build.
// usage: node swap-diag.mjs <distDir> <rate> [scheme] [width]
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist, rate = "1", scheme = "dark", width = "1440"] = process.argv.slice(2);
const W = +width, H = W === 1440 ? 900 : 844;
const server = await serveDist(dist);
const out = [];
try {
  await withBrowser(async (browser) => {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: scheme });
    try {
      const page = await ctx.newPage(); page.setDefaultTimeout(15000);
      if (+rate > 1) await (await ctx.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: +rate });
      await page.goto(server.url + "/#/cube", { waitUntil: "load" });
      await page.waitForTimeout(5000);
      for (const target of ["Spring", "Easing", "Sequence"]) { console.error("swap", target);
        const d = page.locator(".glass-dock").first(); const b = await d.boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200);
        await d.locator('[aria-label="Scene"]:visible').last().click(); await page.waitForTimeout(600);
        await page.evaluate(() => {
          performance.clearMeasures(); window.__f = []; window.__loaf = []; window.__h = null;
          const t0 = performance.now(); window.__t0 = t0; const h0 = location.hash;
          window.__po?.disconnect();
          window.__po = new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push({ start: Math.round(e.startTime - t0), dur: Math.round(e.duration), block: Math.round(e.blockingDuration), render: Math.round(e.renderStart - e.startTime), style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0), scripts: e.scripts.map((s) => ({ inv: s.invoker.slice(0, 60), src: (s.sourceFunctionName || "") + "@" + (s.sourceURL || "").split("/").pop() + ":" + s.sourceCharPosition, dur: Math.round(s.duration), fsl: Math.round(s.forcedStyleAndLayoutDuration) })).filter((s) => s.dur > 5) }); });
          window.__po.observe({ type: "long-animation-frame" });
          const f = () => { const t = performance.now() - t0; window.__f.push(t); if (window.__h === null && location.hash !== h0) window.__h = t; if (t < 2500) requestAnimationFrame(f); }; requestAnimationFrame(f);
          document.addEventListener("pointerup", () => { window.__click = performance.now() - t0; }, { once: true, capture: true });
        });
        await page.getByRole("option", { name: target }).click();
        await page.waitForTimeout(2800);
        const r = await page.evaluate(() => {
          const f = window.__f; const d = f.slice(1).map((t, i) => [Math.round(f[i]), Math.round(t - f[i])]);
          const marks = Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:")).map((e) => [e.name.slice(11), [Math.round(e.startTime - window.__t0), Math.round(e.duration)]]));
          return { click: Math.round(window.__click), hashMs: window.__h && Math.round(window.__h), worst: Math.max(...d.map((x) => x[1])), over50: d.filter((x) => x[1] > 50), marks, loaf: window.__loaf.filter((l) => l.dur > 50) };
        });
        out.push({ target, ...r }); console.error(target, r.worst, JSON.stringify(r.marks));
        await page.mouse.move(W - 3, H / 2); await page.waitForTimeout(3000);
      }
    } finally { await ctx.close(); }
  }, { label: "swap-diag" });
} finally { await server.close(); }
console.log(JSON.stringify(out, null, 1));

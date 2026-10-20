// repair-1: what fills the swap's long frames. Per variant (baseline / no backdrop-filter / no VT animation),
// one swap cube->Easing and cube->Spring via the dock Scene list, LoAF render/script split; plus a CPU profile
// (self time by function) across the baseline Easing swap.  usage: node swap-profile.mjs <dist>
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist] = process.argv.slice(2);
const VARIANTS = { base: "", noBackdrop: "*,*::before,*::after{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}", noVtAnim: "::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}" };
const out = {};
const server = await serveDist(dist);
try {
  await withBrowser(async (browser) => {
    for (const [name, css] of Object.entries(VARIANTS)) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
      try {
        const page = await ctx.newPage(); page.setDefaultTimeout(15000);
        await page.goto(server.url + "/#/cube", { waitUntil: "load" });
        if (css) await page.addStyleTag({ content: css });
        await page.waitForTimeout(4000);
        const rows = [];
        for (const target of ["Easing", "Spring"]) {
          const d = page.locator(".glass-dock").first(); const b = await d.boundingBox();
          await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
          await d.locator('[aria-label="Scene"]:visible').last().click(); await page.waitForTimeout(600);
          // rest frames for 600 ms first (the cost of a frame with nothing swapping)
          const rest = await page.evaluate(() => new Promise((res) => { const f = []; const t0 = performance.now(); const s = () => { f.push(performance.now()); if (performance.now() - t0 < 600) requestAnimationFrame(s); else { const d = f.slice(1).map((t, i) => t - f[i]); res(Math.round(Math.max(...d))); } }; requestAnimationFrame(s); }));
          const cdp = name === "base" && target === "Easing" ? await ctx.newCDPSession(page) : null;
          if (cdp) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 200 }); await cdp.send("Profiler.start"); }
          await page.evaluate(() => { window.__loaf = []; const t0 = performance.now(); window.__t0 = t0; window.__f = []; const f = () => { const t = performance.now() - t0; window.__f.push(t); if (t < 1500) requestAnimationFrame(f); }; requestAnimationFrame(f); window.__po?.disconnect(); window.__po = new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push([Math.round(e.startTime - t0), Math.round(e.duration), Math.round(e.startTime + e.duration - e.renderStart), e.scripts.reduce((a, s) => a + s.duration, 0) | 0]); }); window.__po.observe({ type: "long-animation-frame" }); });
          await page.getByRole("option", { name: target }).click();
          await page.waitForTimeout(1700);
          if (cdp) {
            const { profile } = await cdp.send("Profiler.stop");
            const self = new Map(); const byId = new Map(profile.nodes.map((n) => [n.id, n]));
            const dt = profile.timeDeltas; const counts = new Map();
            profile.samples.forEach((id, i) => counts.set(id, (counts.get(id) || 0) + (dt[i] || 0)));
            for (const [id, us] of counts) { const n = byId.get(id); const k = `${n.callFrame.functionName || "(anon)"} ${n.callFrame.url.split("/").pop()}:${n.callFrame.lineNumber}:${n.callFrame.columnNumber}`; self.set(k, (self.get(k) || 0) + us); }
            out.profileTop = [...self].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, us]) => `${(us / 1000).toFixed(1)}ms ${k}`);
            await cdp.detach();
          }
          const r = await page.evaluate(() => { const f = window.__f; const d = f.slice(1).map((t, i) => t - f[i]); const m = Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:") && e.startTime >= window.__t0).map((e) => [e.name.slice(11), Math.round(e.duration)])); return { worst: Math.round(Math.max(...d)), over50: d.filter((x) => x > 50).length, marks: m, loaf: window.__loaf.filter((l) => l[1] > 50) }; });
          rows.push({ target, rest, ...r });
          await page.mouse.move(1437, 450); await page.waitForTimeout(2500);
        }
        out[name] = rows; console.error(name, JSON.stringify(rows));
      } finally { await ctx.close(); }
    }
  }, { label: "swap-profile" });
} finally { await server.close(); }
console.log(JSON.stringify(out, null, 1));

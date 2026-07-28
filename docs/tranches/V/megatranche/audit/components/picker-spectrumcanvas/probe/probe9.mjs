import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(() => {
  window.__long = [];
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__long.push(Math.round(e.duration)); }).observe({ entryTypes: ["longtask"] }); } catch {}
});
await page.goto("http://localhost:9000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1800);

const collect = async (fn, tag) => {
  await page.evaluate(() => { window.__long.length = 0; window.__frames = []; let last = 0;
    window.__stop = false;
    const tick = t => { if (last) window.__frames.push(t - last); last = t; if (!window.__stop) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); });
  await fn();
  const r = await page.evaluate(() => { window.__stop = true;
    const f = window.__frames.slice(3).sort((a,b)=>a-b);
    const q = p => f.length ? +f[Math.floor(f.length*p)].toFixed(1) : null;
    return { n: f.length, p50: q(0.5), p95: q(0.95), long: window.__long.slice(), longOver50: window.__long.filter(d=>d>50).length }; });
  console.log(tag, JSON.stringify(r));
  return r;
};

// idle control
await collect(async () => { await page.waitForTimeout(1600); }, "IDLE           ");

// L-channel slider drag (the path the repo's §6.2 oracle gates)
const sl = page.getByRole("slider", { name: /channel/ }).first();
const sb = await sl.boundingBox();
await collect(async () => {
  await page.mouse.move(sb.x + sb.width * 0.08, sb.y + sb.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 24; i++) { await page.mouse.move(sb.x + (sb.width * 0.84 * i) / 24 + sb.x * 0, sb.y + sb.height / 2, { steps: 3 }); await page.waitForTimeout(30); }
  await page.mouse.up();
}, "SLIDER-DRAG    ");

// spectrum drag, SAME cadence (24 steps, 30ms dwell)
const pb = await page.locator(".spectrum-picker").boundingBox();
await collect(async () => {
  await page.mouse.move(pb.x + pb.width * 0.1, pb.y + pb.height * 0.9);
  await page.mouse.down();
  for (let i = 1; i <= 24; i++) { const f = i / 24; await page.mouse.move(pb.x + pb.width * (0.1 + 0.8 * f), pb.y + pb.height * (0.9 - 0.8 * f), { steps: 3 }); await page.waitForTimeout(30); }
  await page.mouse.up();
}, "SPECTRUM-DRAG  ");

await browser.close();

// SERVED MODEL: claude-opus-5-5
// X-W12U Repair 1 (C7-3): why does the 1440 page paint at 1.5-5 fps on
// SwiftShader during the w12-drag surface drag? Same launch args as the smoke
// project (playwright.config.ts), same viewport/theme/route/settle/drag path as
// e2e/smoke/w12-drag.spec.ts (surface leg + slider L). Arms isolate the paint:
//   as-is · no-webgl (atmosphere + goo-blob canvases display:none) ·
//   no-backdrop (every backdrop-filter none) · neither · blank (a plain page
//   repainting a full-viewport fill per move).
// Usage: node drag-probe.mjs <origin> <label>
import { chromium } from "@playwright/test";
const [origin, label] = process.argv.slice(2);
const CSS = {
  "as-is": "",
  "no-webgl": "canvas.atmosphere-canvas, canvas.goo-blob-canvas, .atmosphere-canvas, .goo-blob-canvas { display: none !important; }",
  "no-backdrop": "*, *::before, *::after { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }",
};
CSS.neither = CSS["no-webgl"] + "\n" + CSS["no-backdrop"];
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]; };
async function drag(page, loc, axis) {
  const b = await loc.boundingBox();
  const y0 = b.y + (axis === "xy" ? b.height * 0.15 : b.height / 2), y1 = b.y + (axis === "xy" ? b.height * 0.85 : b.height / 2);
  const x0 = b.x + b.width * 0.08, x1 = b.x + b.width * 0.92;
  await page.mouse.move(x0, y0); await page.mouse.down();
  await page.evaluate(() => { window.__f = []; window.__l = performance.now(); });
  const st = Date.now(); let i = 0;
  while (Date.now() - st < 2000) { const u = ((Date.now() - st) / 2000) * 2; const f = u <= 1 ? u : 2 - u; await page.mouse.move(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f); i++; }
  const fr = (await page.evaluate(() => window.__f.slice())).slice(1);
  await page.mouse.up();
  return `moves=${i} frames=${fr.length} p50=${pct(fr, 50)?.toFixed(1)} p95=${pct(fr, 95)?.toFixed(1)}`;
}
try {
  for (const arm of [...Object.keys(CSS), "blank"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const page = await ctx.newPage();
      await page.addInitScript(() => { localStorage.setItem("vueuse-color-scheme", "dark"); window.__f = []; window.__l = performance.now(); const t = (n) => { window.__f.push(n - window.__l); window.__l = n; requestAnimationFrame(t); }; requestAnimationFrame(t); });
      if (arm === "blank") {
        await page.setContent(`<div id="s" style="position:fixed;inset:0;background:#335"></div><script>window.__f=[];window.__l=performance.now();(function t(n){if(n){window.__f.push(n-window.__l);window.__l=n;}requestAnimationFrame(t)})();addEventListener('pointermove',e=>{s.style.background='hsl('+(e.clientX%360)+' 60% 40%)'})</script>`);
        await page.waitForTimeout(1000);
        const box = page.locator("#s");
        console.log(`[drag-probe ${label}] ${arm.padEnd(11)} fill: ${await drag(page, box, "xy")}`);
        continue;
      }
      await page.goto(origin + "/#/?space=lab");
      if (CSS[arm]) await page.addStyleTag({ content: CSS[arm] });
      await page.waitForTimeout(3000);
      const surf = await drag(page, page.locator(".spectrum-picker").first(), "xy");
      await page.waitForTimeout(400);
      const sl = await drag(page, page.getByRole("slider", { name: "L channel" }).first(), "x");
      console.log(`[drag-probe ${label}] ${arm.padEnd(11)} surface: ${surf} | slider L: ${sl}`);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }

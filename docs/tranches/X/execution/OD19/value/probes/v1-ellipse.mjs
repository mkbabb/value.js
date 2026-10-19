// OD19-V1 — reproduce the dock ellipse: rest, hover, Tools layer; dump pseudo layers. Headless shell.
import { chromium } from "@playwright/test";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = process.env.OUT;
const browser = await chromium.launch({ headless: true });
const res = [];
try {
  for (const scheme of ["dark", "light"]) for (const w of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 120000 });
      const dock = page.locator(".glass-dock").first();
      await dock.waitFor({ timeout: 120000 });
      await page.waitForTimeout(2500);
      const tag = `${w}-${scheme}`;
      await dock.screenshot({ path: `${OUT}/v1-dock-rest-${tag}.png` });
      const tgl = page.locator('.glass-dock button[aria-label="Toggle action bar"]');
      if (await tgl.isVisible()) {
        await tgl.click();
        await page.waitForTimeout(1200);
        await dock.hover();
        await page.waitForTimeout(300);
        await dock.screenshot({ path: `${OUT}/v1-dock-tools-${tag}.png` });
      } else {
        await dock.click({ position: { x: 20, y: 20 } }).catch(() => {});
        await page.waitForTimeout(1200);
        await dock.screenshot({ path: `${OUT}/v1-dock-expanded-${tag}.png` });
      }
      const d = await page.evaluate(() => {
        const rows = [];
        for (const el of document.querySelectorAll(".glass-dock, .glass-dock *")) {
          for (const ps of [null, "::before", "::after"]) {
            const cs = getComputedStyle(el, ps);
            if (ps && cs.content === "none") continue;
            const img = cs.backgroundImage;
            const r = el.getBoundingClientRect();
            if ((img && img !== "none" && /gradient/.test(img)) || cs.borderRadius.includes("50%") || (cs.backdropFilter !== "none" && r.width > 100))
              rows.push(`${el.className.toString().slice(0,60)}${ps ?? ""} ${Math.round(r.width)}x${Math.round(r.height)} rad=${cs.borderRadius} op=${cs.opacity} bf=${cs.backdropFilter.slice(0,30)} img=${img.slice(0,120)}`);
          }
        }
        return rows;
      });
      res.push({ tag, rows: d });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
console.log(JSON.stringify(res, null, 1).slice(0, 9000));

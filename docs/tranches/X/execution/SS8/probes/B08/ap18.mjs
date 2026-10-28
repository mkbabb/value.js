// SS-8 B08 ApiOfflineChip U-6 / AP-18: a PRODUCTION build (mode gh-pages, no VITE_API_URL) served on
// LOOPBACK — does the misconfigured face shout? Served bytes: B15's gh-pages build at
// demo/app/node_modules/.cache/ss8-b15-ghp (built 2026-10-19 14:43, after the last api-status/availability
// change 2026-10-13), served by `python3 -I -m http.server` on 127.0.0.1:$PORT. One Chromium, one context per cell.
import { chromium } from "playwright";
import { EV } from "./lib.mjs";
const PORT = process.env.PORT ?? "9477";
const browser = await chromium.launch();
try {
  for (const host of ["localhost", "127.0.0.1"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const reqs = [];
      await ctx.route(/api\.color\.babb\.dev|localhost:3000/, (r) => { reqs.push(r.request().url().replace(/\?.*$/, "")); return r.abort(); });
      const page = await ctx.newPage(); page.setDefaultNavigationTimeout(120000);
      const logs = []; page.on("console", (m) => /misconfig|warn|error/i.test(m.type() + m.text()) && logs.push(m.type() + ": " + m.text().slice(0, 160)));
      await page.goto(`http://${host}:${PORT}/#/palettes`, { waitUntil: "load" });
      await page.waitForTimeout(5000);
      await page.evaluate(() => document.querySelector(".current-palette-well .add-slot-ghost")?.click());
      await page.waitForTimeout(2500);
      const f = await page.evaluate(() => ({
        chips: [...document.querySelectorAll(".api-status-chip")].map((c) => ({ seat: c.dataset.seat, variant: c.dataset.variant, role: c.getAttribute("role"), text: c.textContent.trim() })),
        misconfiguredTextAnywhere: document.body.innerText.includes("misconfigured"),
        liveRegions: [...document.querySelectorAll("[role=alert],[role=status]")].map((e) => e.getAttribute("role") + ":" + e.textContent.trim().slice(0, 60)).filter((t) => t.length > 8),
      }));
      await page.screenshot({ path: `${EV}ap-u6-prod-loopback-${host}.png` });
      console.log("ap18", host, JSON.stringify({ ...f, apiRequests: [...new Set(reqs)].slice(0, 6), consoleMisconfig: logs.filter((l) => /misconfig/i.test(l)).slice(0, 3) }));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }

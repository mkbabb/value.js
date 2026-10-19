// SS-8 B14 discovery: which requests, panes and lists exist on #/browse and #/palettes.
import { chromium } from "playwright";
const BASE = "http://localhost:9000/";
const browser = await chromium.launch();
try {
  for (const route of ["#/browse", "#/palettes", "#/extract"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const page = await ctx.newPage();
      const reqs = [];
      page.on("request", (r) => { if (!r.url().includes(":9000")) reqs.push(r.method() + " " + r.url()); });
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const info = await page.evaluate(() => ({
        hash: location.hash,
        lists: [...document.querySelectorAll('[role="list"]')].map((e) => e.className.slice(0, 80)),
        grids: document.querySelectorAll(".palette-card-grid").length,
        skel: [...document.querySelectorAll('[data-slot="palette-card-skeleton"],[data-slot="shadow-palette"]')].map((e) => e.dataset.slot),
        panes: [...document.querySelectorAll("[data-pane],[data-pane-id]")].map((e) => e.getAttribute("data-pane") || e.getAttribute("data-pane-id")),
        empty: [...document.querySelectorAll('[role="status"]')].map((e) => (e.textContent || "").trim().slice(0, 60)),
      }));
      console.log(route, JSON.stringify(info), "\n  reqs:", reqs.slice(0, 12).join(" | "));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }

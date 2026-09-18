/** CHALLENGE-C live probe #7 — does `variant="ghost"` do anything on a Glass 7 Button? */
import { chromium } from "playwright";
const KEY = "color-palettes";
const SEED = { version: 1, palettes: [{ id: "id-A", name: "Alpha", slug: "alpha",
  colors: [{ css: "#e11d48", position: 0 }],
  createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", isLocal: true }] };
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.addInitScript(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find(x => x.getAttribute("aria-label") === "Delete all saved palettes");
  const cs = getComputedStyle(b);
  return {
    outerHTML: b.outerHTML.replace(/\s+/g, " ").slice(0, 320),
    strayVariantAttr: b.getAttribute("variant"),
    dataEmphasis: b.getAttribute("data-emphasis") ?? b.dataset.emphasis ?? null,
    backgroundColor: cs.backgroundColor,
    backdropFilter: cs.backdropFilter,
    borderColor: cs.borderTopColor,
    boxShadow: cs.boxShadow.slice(0, 60),
    color: cs.color,
    box: (({width,height}) => ({width: Math.round(width), height: Math.round(height)}))(b.getBoundingClientRect()),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();

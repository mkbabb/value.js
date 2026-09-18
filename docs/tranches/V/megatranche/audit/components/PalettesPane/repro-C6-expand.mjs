/** CHALLENGE-C live probe #6 — does the card expand at all, and by what input? */
import { chromium } from "playwright";
const KEY = "color-palettes";
const SEED = { version: 1, palettes: [{ id: "id-A", name: "Alpha", slug: "alpha",
  colors: [{ css: "#e11d48", position: 0 }, { css: "#0ea5e9", position: 1 }],
  createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", isLocal: true }] };
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.addInitScript(([k, s]) => localStorage.setItem(k, JSON.stringify(s)), [KEY, SEED]);
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".palette-card-grid [role='article']", { timeout: 20000 });
await page.waitForTimeout(1500);
const card = page.locator(".palette-card-grid [role='article']").first();
const size = async () => page.evaluate(() => {
  const c = document.querySelector(".palette-card-grid [role='article']");
  return { h: Math.round(c.getBoundingClientRect().height), kids: c.querySelectorAll("*").length };
});
console.log("rest            :", JSON.stringify(await size()));
await card.click({ position: { x: 200, y: 40 } });
await page.waitForTimeout(700);
console.log("after mouse click:", JSON.stringify(await size()));
await card.click({ position: { x: 200, y: 40 } });
await page.waitForTimeout(700);
console.log("after 2nd click  :", JSON.stringify(await size()));
await browser.close();

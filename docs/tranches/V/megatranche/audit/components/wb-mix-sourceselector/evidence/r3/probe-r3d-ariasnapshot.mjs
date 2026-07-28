import { chromium } from "playwright";
const now = new Date().toISOString();
const store = { version: 1, palettes: [
  { id: "l1", name: "Sunrise", slug: "sunrise", colors: [{css:"#ff5a5f",position:0},{css:"#ffb400",position:1}], createdAt: now, updatedAt: now, isLocal: true },
]};
const browser = await chromium.launch();
try {
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript((s) => window.localStorage.setItem("color-palettes", JSON.stringify(s)), store);
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.getByRole("button", { name: "Palettes", exact: true }).click({timeout:5000});
await page.waitForTimeout(900);
const snap = await page.locator("main").ariaSnapshot();
console.log("ARIA-SNAPSHOT-MAIN:\n" + snap);
console.log("--- Palette menu role count:", await page.getByRole("button", { name: "Palette menu" }).count());
} catch(e) { console.log("ERR", String(e).split("\n")[0]); }
await browser.close();

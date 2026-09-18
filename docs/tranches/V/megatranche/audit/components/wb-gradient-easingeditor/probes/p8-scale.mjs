import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"], channel: "chromium" });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:9000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(5000);
const pill = page.locator(".glass-dock.collapsed"); if (await pill.count()) { await pill.click(); await page.waitForTimeout(900); }
await page.getByRole("combobox", { name: "Select view" }).click({ timeout: 60000 }); await page.waitForTimeout(500);
await page.getByRole("option", { name: "Gradient", exact: true }).click();
await page.locator("#easing-interval-0").waitFor({ state: "visible", timeout: 20000 });
await page.waitForTimeout(800);
const snap = () => page.evaluate(() => ({
  heads: document.querySelectorAll("button[aria-controls^='easing-interval-']").length,
  tiles: document.querySelectorAll("[data-specimen]").length,
  pickers: document.querySelectorAll("[data-testid='easing-picker']").length,
  glyphNodes: document.querySelectorAll("[data-specimen] path").length,
  all: document.querySelectorAll("*").length,
}));
console.log("DOM @2 stops:", JSON.stringify(await snap()));
const ce = page.locator("[role='textbox'][contenteditable='true']").last();
console.log("contenteditable count:", await page.locator("[role='textbox'][contenteditable='true']").count());
await ce.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.insertText("linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.7 0.16 200) 20%, oklch(0.65 0.18 265) 40%, oklch(0.6 0.2 320) 60%, oklch(0.7 0.14 60) 80%, oklch(0.8 0.1 100) 100%)");
await page.waitForTimeout(1800);
console.log("DOM @6 stops:", JSON.stringify(await snap()));
// authoring stages mounted while collapsed?
console.log("pickers while all tune-stages CLOSED:", await page.evaluate(() => document.querySelectorAll("[id^='easing-authoring-'] [data-testid='easing-picker']").length));
console.log("hidden rows' strips mounted:", await page.evaluate(() => [...document.querySelectorAll("[id^='easing-interval-']")].map(e => ({ id: e.id, display: getComputedStyle(e).display, tiles: e.querySelectorAll("[data-specimen]").length }))));
await b.close();

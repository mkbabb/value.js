import { chromium } from "@playwright/test";
const now = new Date().toISOString();
const mk = (name, slug, cssList) => ({
  id: slug, name, slug, colors: cssList.map((css, position) => ({ css, position })),
  createdAt: now, updatedAt: now, isLocal: true, visibility: "private", tier: "standard",
});
const store = { version: 1, palettes: [
  mk("Probe A", "probe-a", ["#ff0000", "#00ff00", "#0000ff", "#ffff00"]),
  mk("Probe B", "probe-b", ["#000000", "#ffffff", "#888888", "#00ffff"]),
]};
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), store);
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.evaluate(() => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Palettes").click();
});
await page.waitForTimeout(600);
await page.evaluate(() => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  [...card.querySelectorAll("button")].filter((b) => /^Select palette /.test(b.getAttribute("aria-label") || "")).forEach((b) => b.click());
});
await page.waitForTimeout(500);
// mid-flight capture at ~450ms
await page.evaluate(() => {
  const h3 = [...document.querySelectorAll("main h3")].find((h) => h.textContent.trim() === "Mix");
  let card = h3; while (card && !card.classList.contains("pane-scroll-fade")) card = card.parentElement;
  [...card.querySelectorAll("button")].find((b) => b.textContent.trim() === "Mix").click();
});
await page.waitForTimeout(450);
await page.locator(".pane-wrapper--right").screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chalC-midflight.png" });
await page.waitForTimeout(2200);
await page.locator(".mix-plate").screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chalC-plate.png" });
console.log("ok");
await browser.close();

// CHALLENGE-D · SearchFilterBar — probe 7: pixel proof of the radio focus register.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/sfb";
const ORIGIN = "http://localhost:9000";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
await context.route("**/platform/transport/availability.ts*", async (route) => {
  const res = await route.fetch();
  const body = (await res.text()).replace(/function assertApiAttemptAllowed\(\)\s*\{/, "function assertApiAttemptAllowed() { return;");
  await route.fulfill({ response: res, body, headers: { ...res.headers(), "content-type": "text/javascript" } });
});
await context.route("https://api.color.babb.dev/**", async (route) => {
  const cors = { "access-control-allow-origin": ORIGIN, "access-control-allow-credentials": "true", "access-control-allow-headers": "*", "access-control-allow-methods": "*", "content-type": "application/json" };
  if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors, body: "" });
  return route.fulfill({ status: 200, headers: cors, body: JSON.stringify([{ name: "pastel" }, { name: "neon" }]) });
});
const page = await context.newPage();
await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Filters"]').click();
await page.waitForTimeout(1000);

const clip = await page.evaluate(() => {
  const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const sec = c.querySelector(".filter-section");
  const r = sec.getBoundingClientRect();
  return { x: Math.round(r.x - 12), y: Math.round(r.y - 6), width: Math.round(r.width + 24), height: Math.round(r.height + 12) };
});
await page.screenshot({ path: `${OUT}/radio-unfocused.png`, clip });
// Keyboard-focus the FIRST radio (Tab once from the open popover puts focus on the checked radio).
await page.keyboard.press("Tab");
await page.waitForTimeout(1000);
const who = await page.evaluate(() => ({ role: document.activeElement.getAttribute("role"), state: document.activeElement.getAttribute("data-state"), fv: document.activeElement.matches(":focus-visible") }));
await page.screenshot({ path: `${OUT}/radio-focused.png`, clip });
// Now Tab to the 3rd tag checkbox for comparison of registers in one frame is not possible; capture a checkbox clip.
const clipTags = await page.evaluate(() => {
  const c = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map(w => w.firstElementChild).filter(Boolean).pop();
  const secs = [...c.querySelectorAll(".filter-section")];
  const sec = secs.find(s => s.querySelector(".section-label")?.textContent.trim() === "Tags") || secs[2];
  const r = sec.getBoundingClientRect();
  return { x: Math.round(r.x - 12), y: Math.round(r.y - 6), width: Math.round(r.width + 24), height: Math.round(r.height + 12) };
});
for (let i = 0; i < 2; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(400); }
const who2 = await page.evaluate(() => ({ role: document.activeElement.getAttribute("role"), fv: document.activeElement.matches(":focus-visible") }));
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/checkbox-focused.png`, clip: clipTags });
writeFileSync(`${OUT}/measure7.json`, JSON.stringify({ clip, who, clipTags, who2 }, null, 1));
console.log(JSON.stringify({ who, who2 }));
await browser.close();

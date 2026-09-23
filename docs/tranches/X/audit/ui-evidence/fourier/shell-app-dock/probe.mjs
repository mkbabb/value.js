// Targeted probes: about popover open, login form focus/escape, dock width jump, a11y hits.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
for (const [vp, size] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  // 1. about popover from a fresh page
  if (vp === "m") await page.locator(".logo-trigger").tap(); else await page.locator(".logo-trigger").click();
  await page.waitForTimeout(1000);
  const about = await page.evaluate(() => { const el = document.querySelector(".hover-card-content"); if (!el) return null; const r = el.getBoundingClientRect(); return { w: r.width, h: r.height, x: r.x, y: r.y, radius: getComputedStyle(el).borderRadius, vis: getComputedStyle(el).visibility, op: getComputedStyle(el).opacity }; });
  console.log(vp, "about", JSON.stringify(about), "expanded", await page.locator(".logo-trigger").getAttribute("aria-expanded"));
  await page.screenshot({ path: OUT + `${vp}-light-aboutopen-fresh.png` });
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
  // 2. login form: focus + escape
  const w0 = await page.locator(".app-dock").evaluate((e) => e.getBoundingClientRect().width);
  const logoX0 = await page.locator(".logo-trigger").evaluate((e) => e.getBoundingClientRect().x);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await page.waitForTimeout(600);
  const focused = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
  const w1 = await page.locator(".app-dock").evaluate((e) => e.getBoundingClientRect().width);
  const logoX1 = await page.locator(".logo-trigger").evaluate((e) => e.getBoundingClientRect().x);
  await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  const stillOpen = await page.locator("#user-slug-input").count();
  // click elsewhere
  await page.mouse.click(size.width / 2, size.height - 50); await page.waitForTimeout(300);
  const stillOpen2 = await page.locator("#user-slug-input").count();
  const closeBtn = await page.getByRole("button", { name: /cancel|close/i }).count();
  console.log(vp, "login: focus after open =", focused, "dockW", w0, "->", w1, "logoX", logoX0, "->", logoX1, "open after Esc(unfocused)", stillOpen, "after outside click", stillOpen2, "cancel buttons", closeBtn);
  // submit a malformed slug to capture error state (client-side only, no request)
  await page.locator("#user-slug-input").fill("bad slug");
  await page.locator("#user-slug-input").press("Enter"); await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + `${vp}-light-login-error.png` });
  await page.screenshot({ path: OUT + `${vp}-light-login-error-dock.png`, clip: { x: 0, y: 0, width: size.width, height: 140 } });
  const btns = await page.locator(".app-dock button, .app-dock input").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return `${e.getAttribute("aria-label") || e.id || e.tagName} ${Math.round(r.width)}x${Math.round(r.height)} r=${getComputedStyle(e).borderRadius}`; }));
  console.log(vp, "controls:", btns.join(" | "));
  await ctx.close();
  // 3. logged in: control sizes
  const ctx2 = await browser.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  await ctx2.addInitScript(() => { localStorage.setItem("fourier-user-slug", "jasper-newt-of-rampant"); localStorage.setItem("fourier-user-token", "audit-seeded-token"); });
  const p2 = await ctx2.newPage(); await p2.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }); await p2.waitForTimeout(600);
  const b2 = await p2.locator(".app-dock button, .app-dock [role=group] > div > div").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return `${e.getAttribute("aria-label") || e.className.toString().slice(0, 40)} ${Math.round(r.width)}x${Math.round(r.height)} r=${cs.borderRadius} bg=${cs.backgroundColor} bd=${cs.borderTopWidth} ${cs.borderTopColor}`; }));
  console.log(vp, "loggedin controls:", b2.join("\n   "));
  await ctx2.close();
}
await browser.close();

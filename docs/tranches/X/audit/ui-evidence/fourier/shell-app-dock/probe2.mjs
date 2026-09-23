// 390 overflow: are the trailing controls reachable when logged in / admin / login form open?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const size = { width: 390, height: 844 };
async function report(page, tag) {
  const r = await page.evaluate(() => {
    const dock = document.querySelector(".app-dock"); const dr = dock.getBoundingClientRect();
    const scrollers = [dock, ...dock.querySelectorAll("*")].filter((e) => e.scrollWidth > e.clientWidth + 1 && ["auto", "scroll", "hidden", "clip"].includes(getComputedStyle(e).overflowX)).map((e) => `${e.className.toString().slice(0, 50)} sw=${e.scrollWidth} cw=${e.clientWidth} ox=${getComputedStyle(e).overflowX}`);
    const ctl = [...dock.querySelectorAll("button,input")].map((b) => { const br = b.getBoundingClientRect(); const cx = br.x + br.width / 2, cy = br.y + br.height / 2; const hit = document.elementFromPoint(cx, cy); return `${b.getAttribute("aria-label") || b.id} x=${Math.round(br.x)}..${Math.round(br.right)} inDock=${br.right <= dr.right + 1 && br.x >= dr.x - 1} hit=${hit === b || b.contains(hit)}`; });
    return { dock: `${Math.round(dr.x)}..${Math.round(dr.right)} h=${Math.round(dr.height)}`, scrollers, ctl };
  });
  console.log(tag, JSON.stringify(r, null, 1));
}
for (const mode of ["loggedout", "loggedin", "admin"]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  if (mode !== "loggedout") await ctx.addInitScript(() => { localStorage.setItem("fourier-user-slug", "jasper-newt-of-rampant"); localStorage.setItem("fourier-user-token", "audit-seeded-token"); });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3100/" + (mode === "admin" ? "gallery?admin=dev" : "paper"), { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await report(page, mode);
  if (mode === "loggedout") { await page.getByRole("button", { name: "Log in", exact: true }).tap(); await page.waitForTimeout(700); await report(page, "loginform"); await page.screenshot({ path: OUT + "m-light-loginform-fresh-dock.png", clip: { x: 0, y: 0, width: 390, height: 130 } }); }
  if (mode === "admin") { await page.waitForTimeout(5000); await page.screenshot({ path: OUT + "m-light-admin-after-toast-dock.png", clip: { x: 0, y: 0, width: 390, height: 130 } }); }
  await ctx.close();
}
// desktop: second-click swallow after nav menu
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage(); await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }); await page.waitForTimeout(600);
await page.locator(".nav-trigger").click(); await page.waitForTimeout(500);
await page.locator(".logo-trigger").click({ force: true }); await page.waitForTimeout(800);
console.log("nav-open then click logo: about open =", await page.locator(".hover-card-content").count(), "menu open =", await page.locator(".nav-dropdown").count());
await page.screenshot({ path: OUT + "d-light-nav-then-logo.png", clip: { x: 0, y: 0, width: 1440, height: 320 } });
await page.keyboard.press("Escape"); await page.waitForTimeout(500);
await page.locator(".nav-trigger").click(); await page.waitForTimeout(500); await page.keyboard.press("Escape"); await page.waitForTimeout(600);
await page.locator(".logo-trigger").click(); await page.waitForTimeout(800);
console.log("nav Esc then click logo: about open =", await page.locator(".hover-card-content").count());
await page.screenshot({ path: OUT + "d-light-navesc-then-logo.png", clip: { x: 0, y: 0, width: 1440, height: 320 } });
await ctx.close(); await browser.close();

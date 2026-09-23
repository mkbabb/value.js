// Probes: (a) storage-blocked first visit to "/" (Chrome "block all site data" throws SecurityError on localStorage access);
// (b) nav dropdown on /nope — which item reads as selected; (c) history after "/" redirect.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
for (const [vp, size] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  let ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { Object.defineProperty(window, "localStorage", { get() { throw new DOMException("The operation is insecure.", "SecurityError"); } }); });
  let page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 140)));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 140)); });
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(1500);
  const s = await page.evaluate(() => ({ url: location.pathname, main: document.querySelector("main")?.children.length ?? null, app: document.querySelector("#app")?.children.length }));
  await page.screenshot({ path: OUT + `${vp}-light-storage-blocked-root.png` });
  console.log(vp, "storage-blocked /", JSON.stringify(s), errs.slice(0, 4));
  // storage-blocked on a direct /paper visit (afterEach setItem)
  await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(1500);
  const s2 = await page.evaluate(() => ({ url: location.pathname, main: document.querySelector("main")?.children.length ?? null }));
  await page.screenshot({ path: OUT + `${vp}-light-storage-blocked-paper.png` });
  console.log(vp, "storage-blocked /paper", JSON.stringify(s2), errs.slice(-3));
  await ctx.close();
  ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2 }); page = await ctx.newPage();
  await page.goto("http://localhost:3100/nope", { waitUntil: "networkidle" }); await page.waitForTimeout(800);
  await page.locator(".nav-trigger").click(); await page.waitForTimeout(700);
  const sel = await page.evaluate(() => [...document.querySelectorAll("[role=menuitemradio],[role=menuitem],[role=option],[data-state=checked],[aria-current]")].map((e) => (e.textContent || "").trim().slice(0, 20) + "|" + e.getAttribute("role") + "|" + (e.getAttribute("data-state") || e.getAttribute("aria-checked") || e.getAttribute("aria-current"))));
  await page.screenshot({ path: OUT + `${vp}-light-unknown-nope-navopen.png` });
  console.log(vp, "nope nav items", JSON.stringify(sel));
  await page.keyboard.press("Escape");
  const focusables = await page.evaluate(() => document.querySelectorAll("main a, main button, main h1").length);
  console.log(vp, "nope main focusables/h1", focusables);
  await ctx.close();
}
await browser.close();

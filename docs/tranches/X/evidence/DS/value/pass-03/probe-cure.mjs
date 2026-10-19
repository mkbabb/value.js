// X-DS value pass 3 — cure probe (headless real Chrome, §0ei): the About port at the
// smoke viewport, and the Extract range ink vs its ground.
import { chromium } from "@playwright/test";
const BASE = process.argv[2] || "http://localhost:9000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, colorScheme: theme });
  const page = await ctx.newPage();
  await page.goto(BASE + "/#/", { waitUntil: "load" });
  await page.locator(".about-card .pane-header").waitFor({ timeout: 60000 });
  await page.waitForTimeout(3000);
  out[`about-${theme}`] = await page.evaluate(() => [...document.querySelectorAll("main .pane-scroll-fade")].map((el) => ({
    cls: el.className.slice(0, 80), offsetParent: !!el.offsetParent, sh: el.scrollHeight, ch: el.clientHeight,
    cardH: el.closest(".card")?.getBoundingClientRect().height })));
  await page.goto(BASE + "/#/extract?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"), { waitUntil: "load" });
  await page.locator('[data-o18="extract-kc"] .slider-range').waitFor({ timeout: 60000 });
  await page.waitForTimeout(3000);
  out[`extract-${theme}`] = await page.evaluate(() => {
    const r = document.querySelector('[data-o18="extract-kc"] .slider-range');
    const cs = getComputedStyle(r);
    const root = getComputedStyle(document.documentElement);
    return { rangeBg: cs.backgroundColor, sliderRangeBg: getComputedStyle(r).getPropertyValue("--slider-range-bg"),
      primaryAtRange: cs.getPropertyValue("--primary"), primaryRoot: root.getPropertyValue("--primary"), inkMuted: root.getPropertyValue("--ink-muted"),
      trackBg: getComputedStyle(r.parentElement).backgroundColor };
  });
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();

// X-DS value pass 5 — the floating content roots' classes and inks. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const BASE = "http://localhost:9000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const dump = () => page.evaluate(() => {
  const out = [];
  for (const w of document.querySelectorAll("[data-reka-popper-content-wrapper], [role=listbox], [role=dialog], [data-state=open][role]")) {
    const cs = getComputedStyle(w);
    out.push({ tag: w.tagName, role: w.getAttribute("role"), cls: (w.className?.baseVal ?? w.className).slice(0, 200), color: cs.color,
      fg: cs.getPropertyValue("--foreground"), mfg: cs.getPropertyValue("--muted-foreground"), pfg: cs.getPropertyValue("--popover-foreground") });
  }
  const r = getComputedStyle(document.documentElement);
  out.push({ root: true, inkP: r.getPropertyValue("--ink-primary"), inkM: r.getPropertyValue("--ink-muted"), inkFP: r.getPropertyValue("--ink-floating-primary"), inkFM: r.getPropertyValue("--ink-floating-muted") });
  return out;
});
await page.goto(BASE + "/#/browse"); await page.waitForTimeout(4500);
await page.getByRole("button", { name: /^Filters/ }).first().click(); await page.waitForTimeout(800);
console.log("FILTER", JSON.stringify(await dump(), null, 1));
await page.keyboard.press("Escape");
await page.goto(BASE + "/#/gradient"); await page.waitForTimeout(4500);
await page.locator("main [role=combobox]").first().click(); await page.waitForTimeout(800);
console.log("SELECT", JSON.stringify(await dump(), null, 1));
const desc = await page.evaluate(() => [...document.querySelectorAll("[role=option] span")].slice(0, 6).map(s => ({ t: s.textContent.trim().slice(0, 30), cls: s.className, c: getComputedStyle(s).color })));
console.log("DESC", JSON.stringify(desc, null, 1));
await browser.close();

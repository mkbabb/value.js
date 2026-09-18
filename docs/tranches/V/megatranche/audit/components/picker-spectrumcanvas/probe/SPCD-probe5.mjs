import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const r = await page.evaluate(() => {
  const d = document.querySelector(".spectrum-dot");
  const cs = getComputedStyle(d);
  const rules = [];
  for (const sheet of document.styleSheets) {
    let list; try { list = sheet.cssRules; } catch { continue; }
    const walk = (rs) => { for (const rule of rs) {
      if (rule.cssRules) { walk(rule.cssRules); continue; }
      if (!rule.selectorText) continue;
      if (/spectrum-dot|watercolor-swatch/.test(rule.selectorText) && /position|box-shadow|transform|border\b/.test(rule.style.cssText)) {
        rules.push({ sel: rule.selectorText, css: rule.style.cssText.slice(0, 150), href: (sheet.href||"inline").split("/").pop() });
      }
    }};
    walk(list);
  }
  return { computedPosition: cs.position, computedDisplay: cs.display, plateDisplay: getComputedStyle(d.parentElement).display, rules };
});
console.log(JSON.stringify(r, null, 2));
await browser.close();

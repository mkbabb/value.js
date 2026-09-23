import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4000);
const r = await page.evaluate(() => {
  const dock = document.querySelector('[data-dock-tether="top"] .glass-dock');
  const full = dock.querySelector(".dock-layer--full");
  const kids = [...full.children].map((k, i) => { const s = getComputedStyle(k); return { i: i + 1, el: k.tagName + "." + (k.className.split(" ")[0] || "") + (k.getAttribute("aria-label") ? `[${k.getAttribute("aria-label")}]` : ""), display: s.display, tp: s.transitionProperty, td: s.transitionDuration, onset: s.getPropertyValue("--dock-stagger-onset") }; });
  // find which stylesheet rules give transitions on these kids
  const hits = [];
  for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; }
    const walk = (rs) => { for (const ru of rs) { if (ru.cssRules) walk(ru.cssRules); if (ru.selectorText && ru.style && (ru.style.transition || ru.style.transitionProperty)) { for (const k of full.children) { try { if (k.matches(ru.selectorText)) hits.push({ kid: k.getAttribute("aria-label") || k.className.slice(0,30), sel: ru.selectorText.slice(0, 140), tr: (ru.style.transition || ru.style.transitionProperty).slice(0, 200), href: (sh.href || "inline").split("/").slice(-2).join("/") }); } catch {} } } } };
    walk(rules); }
  return { kids, hits, cs: getComputedStyle(dock).getPropertyValue("--dock-stagger-step"), win: getComputedStyle(dock).getPropertyValue("--dock-stagger-window-size") };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();

import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: true });
try { const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const page = await ctx.newPage();
  try { await page.goto("http://localhost:3100/v/hazy-etching-cream-elk", { waitUntil: "load" }); await page.waitForTimeout(3500);
    await page.screenshot({ path: `${OUT}light-390-viz-initial.png` });
    console.log(await page.evaluate(() => [...document.querySelectorAll("[role=tab], button")].filter((b) => b.offsetParent).map((b) => (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 24)).join(" | ")));
    console.log(await page.evaluate(() => { const d = document.querySelector(".animation-dock"); const out = []; for (let e = d; e; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden" || e.hasAttribute("hidden") || e.inert) out.push(`${e.tagName}.${String(e.className).slice(0, 60)} d=${cs.display} v=${cs.visibility} inert=${e.inert}`); } return out.join("\n"); }));
  } finally { await ctx.close(); } } finally { await browser.close(); }

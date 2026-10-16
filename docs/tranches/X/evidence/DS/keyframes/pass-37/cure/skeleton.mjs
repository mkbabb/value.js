// X-DS keyframes r7 pass 4 — where is the 390 resting skeleton the census counts? Headless real Chrome only (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const w of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(8000);
    const r = await page.evaluate(() => [...document.querySelectorAll(".skeleton")].map((e) => { const b = e.getBoundingClientRect(); const chain = []; let p = e; for (let i = 0; i < 8 && p; i++, p = p.parentElement) chain.push(p.tagName.toLowerCase() + "." + String(p.className).split(" ").slice(0, 3).join(".")); return { rect: [b.x, b.y, b.width, b.height].map(Math.round), anim: getComputedStyle(e).animationName, vis: getComputedStyle(e).visibility, chain, busy: e.closest("[aria-busy]")?.getAttribute("aria-busy"), checkVisibility: e.checkVisibility(), skippedByContentVisibility: getComputedStyle(e.closest(".monaco-pane")).contentVisibility }; }));
    console.log(w, JSON.stringify(r, null, 1));
    await ctx.close();
  }
} finally { await browser.close(); }

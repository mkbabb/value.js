// X-DS keyframes r7 pass 5 (cure seat): is the census's skeleton-breathe row painted? Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const r of ["cube", "easing", "spring"]) {
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(5000);
    console.log(r, JSON.stringify(await page.evaluate(() => [...document.querySelectorAll(".skeleton")].map((e) => ({ visible: e.checkVisibility({ contentVisibilityAuto: true }), pane: e.closest(".monaco-pane")?.className, anims: e.getAnimations().map((a) => a.animationName) })))));
    await page.context().close();
  }
} finally { await browser.close(); }

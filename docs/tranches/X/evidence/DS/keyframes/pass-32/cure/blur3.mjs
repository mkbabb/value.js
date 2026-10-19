import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const variants = {
  base: "",
  ovhidden: ".spring-target{overflow:hidden!important}",
  nobefore: ".spring-target::before{display:none!important}",
  nocontain: ".spring-target{contain:none!important}",
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const route of ["spring", "square"]) for (const [k, css] of Object.entries(variants)) {
    if (route === "square" && k !== "base") continue;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "load" });
    await page.waitForTimeout(4000);
    if (css) await page.addStyleTag({ content: css });
    await page.mouse.move(5, 890); await page.waitForTimeout(500);
    await page.screenshot({ path: `h-${route}-${k}-0.png` });
    await page.mouse.move(900, 600); await page.waitForTimeout(800);
    await page.screenshot({ path: `h-${route}-${k}-1on.png` });
    await page.mouse.move(5, 890); await page.waitForTimeout(1200);
    await page.screenshot({ path: `h-${route}-${k}-2off.png` });
    const b = await page.evaluate(() => { const c = document.querySelector(".spring-target, .square-stage"); const s = getComputedStyle(c, "::before"); return { content: s.content, op: s.opacity, blend: s.mixBlendMode, bg: s.backgroundImage.slice(0, 80), inset: s.inset }; });
    console.log(route, k, JSON.stringify(b));
    await ctx.close();
  }
} finally { await browser.close(); }
console.log("done");

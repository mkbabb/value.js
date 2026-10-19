import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const variants = { only: "", };
const _v = {
  base: "",
  ovhidden: ".spring-target{overflow:hidden!important}",
  ovclip: ".spring-target{overflow:clip!important}",
  nocontain: ".spring-target{contain:none!important}",
  nowc: ".spring-target *{will-change:auto!important}",
  hostnotf: ".scene-host{transform:none!important;opacity:1!important}",
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [k, css] of Object.entries(variants)) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    if (css) await ctx.addInitScript((css) => { document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }); }, css);
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5173/#/spring`, { waitUntil: "load" });
    await page.mouse.move(5, 890);
    await page.waitForTimeout(4500);
    await page.screenshot({ path: `i-${k}.png` });
    await ctx.close();
  }
} finally { await browser.close(); }
console.log("done");

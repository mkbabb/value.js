import { chromium } from "playwright";
const out = {};
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
// simulate a NON-SECURE-CONTEXT origin: no navigator.clipboard at all
await page.addInitScript(() => { try { Object.defineProperty(navigator, "clipboard", { get: () => undefined, configurable: true }); } catch {} });
const warns = [];
page.on("console", m => { if (m.type() === "warning" || m.type() === "error") warns.push(m.type() + ": " + m.text().slice(0, 120)); });
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3800);
const F = `(() => { let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) return c; c = c.parent; } return null; })()`;
await page.evaluate(`(() => { const c = ${F}; c.setupState.selectedColors = [{css:"oklab(0.7 0.1 0.05)",source:"p"},{css:"oklab(0.4 -0.08 0.12)",source:"p"}]; })()`);
await page.waitForTimeout(250);
await page.evaluate(`(() => { ${F}.setupState.startMix(); })()`);
await page.waitForTimeout(2400);
out.clipboardAvailable = await page.evaluate(() => !!(navigator.clipboard && navigator.clipboard.writeText));
const btn = page.locator(".mix-plate button").nth(0);
out.before = { title: await btn.getAttribute("title") };
await btn.click();
await page.waitForTimeout(400);
out.afterFailedCopy = {
  title: await btn.getAttribute("title"),
  iconIsCheck: await page.evaluate(() => { const s = document.querySelectorAll(".mix-plate button")[0].querySelector("svg"); return /check/i.test(s.getAttribute("class") || ""); }),
  anyVisibleFeedback: await page.evaluate(() => { const p = document.querySelector(".mix-plate"); return p.innerText.trim(); }),
  liveRegions: await page.evaluate(() => document.querySelectorAll("[aria-live],[role=status],[role=alert]").length),
};
out.consoleNoise = warns.filter(w => /clipboard/i.test(w));
console.log(JSON.stringify(out, null, 1));
await b.close();

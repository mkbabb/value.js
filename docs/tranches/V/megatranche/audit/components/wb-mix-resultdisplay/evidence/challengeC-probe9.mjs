import { chromium } from "playwright";
const out = {};
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3800);
const F = `(() => { let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) return c; c = c.parent; } return null; })()`;
await page.evaluate(`(() => { const c = ${F}; c.setupState.selectedColors = [{css:"oklab(0.7 0.1 0.05)",source:"p"},{css:"oklab(0.4 -0.08 0.12)",source:"p"}]; })()`);
await page.waitForTimeout(250);
await page.evaluate(`(() => { ${F}.setupState.startMix(); })()`);
await page.waitForTimeout(2500);
const names = () => page.evaluate(() => {
  const raw = localStorage.getItem("color-palettes");
  if (!raw) return null;
  const s = JSON.parse(raw);
  const arr = s.palettes || s;
  return { count: arr.length, names: arr.map(p => p.name).slice(0, 6) };
});
out.before = await names();
const saveBtn = page.locator('.mix-plate button[title="Save to palettes"]');
// snapshot the visually meaningful surface (text + button titles + icon classes)
const surface = () => page.evaluate(() => { const p = document.querySelector(".mix-plate");
  return { text: p.innerText.trim(), titles: [...p.querySelectorAll("button")].map(x=>x.getAttribute("title")),
           icons: [...p.querySelectorAll("button svg")].map(x=>x.getAttribute("class")) }; });
out.surfaceBefore = await surface();
await saveBtn.click(); await page.waitForTimeout(600);
out.after = await names();
out.surfaceAfter = await surface();
await saveBtn.click(); await page.waitForTimeout(600);
out.afterSecond = await names();
console.log(JSON.stringify(out, null, 1));
await b.close();

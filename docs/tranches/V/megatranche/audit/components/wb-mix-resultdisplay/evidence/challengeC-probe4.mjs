import { chromium } from "playwright";
const out = {};
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3800);

const findPane = `(() => { let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) return c; c = c.parent; } return null; })()`;

await page.evaluate(`(() => { const c = ${findPane}; c.setupState.selectedColors = [
  { css: "oklab(0.7 0.1 0.05)", source: "p" }, { css: "oklab(0.4 -0.08 0.12)", source: "p" }]; })()`);
await page.waitForTimeout(300);
await page.evaluate(`(() => { const c = ${findPane}; c.setupState.startMix(); })()`);
await page.waitForTimeout(2500);

// (a) copy confirmation: sample title + icon path over time
const copyBtn = page.locator(".mix-plate button").nth(0);
out.copyBefore = { title: await copyBtn.getAttribute("title"), icon: await copyBtn.locator("svg").getAttribute("class") };
await copyBtn.click();
out.copySamples = [];
for (let i = 0; i < 8; i++) {
  out.copySamples.push(await page.evaluate(() => {
    const b = document.querySelectorAll(".mix-plate button")[0];
    const sv = b.querySelector("svg");
    return { t: Math.round(performance.now()), title: b.getAttribute("title"), path: sv ? [...sv.querySelectorAll("path,polyline,rect")].map(p => (p.getAttribute("d")||p.getAttribute("points")||"").slice(0,18)).join("|") : null };
  }));
  await page.waitForTimeout(120);
}
out.clip = await page.evaluate(() => navigator.clipboard.readText());
await page.waitForTimeout(1600);
out.copyAfterReset = await copyBtn.getAttribute("title");

// (b/c/d) palette branch boundaries — drive mixResult directly
const setResult = async (r) => {
  await page.evaluate(`(() => { const c = ${findPane}; c.setupState.mixResult = ${JSON.stringify(r)}; c.setupState.animationPhase = "done"; })()`);
  await page.waitForTimeout(500);
  return page.evaluate(() => {
    const p = document.querySelector(".mix-plate");
    if (!p) return { plate: false };
    const strip = [...p.querySelectorAll("div")].find(d => d.getAttribute("role") === "presentation");
    const dots = [...p.querySelectorAll(".watercolor-swatch")];
    return {
      plate: true,
      text: p.innerText.trim().slice(0, 160),
      dotCount: dots.length,
      dotTitles: dots.map(d => d.getAttribute("title")),
      stripPresent: !!strip,
      stripInlineBg: strip ? strip.getAttribute("style") : null,
      stripComputedBg: strip ? getComputedStyle(strip).backgroundImage.slice(0, 200) : null,
      stripRect: strip ? (() => { const r = strip.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })() : null,
    };
  });
};
out.palette3 = await setResult({ type: "palette", colors: [
  { css: "oklab(0.7 0.1 0.05)", position: 0 }, { css: "oklab(0.5 0 0.1)", position: 1 }, { css: "oklab(0.3 -0.1 0)", position: 2 }] });
out.palette1 = await setResult({ type: "palette", colors: [{ css: "oklab(0.7 0.1 0.05)", position: 0 }] });
out.palette0 = await setResult({ type: "palette", colors: [] });
out.palette0copy = await (async () => {
  const btn = page.locator(".mix-plate button").nth(0);
  await page.evaluate(() => navigator.clipboard.writeText("SENTINEL"));
  await btn.click(); await page.waitForTimeout(250);
  return { title: await btn.getAttribute("title"), clip: await page.evaluate(() => navigator.clipboard.readText()) };
})();
out.colorNoCss = await setResult({ type: "color" });
out.colorNoCssCopy = await (async () => {
  const btn = page.locator(".mix-plate button").first();
  if (!(await btn.count())) return { noButtons: true };
  await page.evaluate(() => navigator.clipboard.writeText("SENTINEL2"));
  await btn.click(); await page.waitForTimeout(250);
  return { title: await btn.getAttribute("title"), clip: await page.evaluate(() => navigator.clipboard.readText()) };
})();
console.log(JSON.stringify(out, null, 1));
await b.close();

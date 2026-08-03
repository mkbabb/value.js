import { chromium } from "playwright";
const out = {};
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
const page = await ctx.newPage();
const errs = [];
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0,160)); });
page.on("pageerror", (e) => errs.push("PAGEERR " + String(e).slice(0,200)));
await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await page.waitForTimeout(3800);

// Reach MixPane's setup state through the live Vue instance tree.
out.inject = await page.evaluate(() => {
  const anchor = document.querySelector(".swatch-row");
  if (!anchor) return { error: "no .swatch-row" };
  let c = anchor.__vueParentComponent;
  const seen = [];
  while (c) {
    const ss = c.setupState || {};
    seen.push(Object.keys(ss).slice(0, 12).join(","));
    if (ss.selectedColors && ss.startMix) {
      ss.selectedColors = [
        { css: "oklab(0.7 0.1 0.05)", source: "probe" },
        { css: "oklab(0.4 -0.08 0.12)", source: "probe" },
      ];
      return { ok: true, depth: seen.length };
    }
    c = c.parent;
  }
  return { error: "not found", seen: seen.slice(0, 12) };
});
await page.waitForTimeout(400);
out.chips = await page.evaluate(() => document.querySelectorAll("[data-mix-source]").length);

// start the mix through the component's own API (the dock action's path)
await page.evaluate(() => {
  let c = document.querySelector(".swatch-row").__vueParentComponent;
  while (c) { const ss = c.setupState || {}; if (ss.startMix && ss.selectedColors) { ss.startMix(); return; } c = c.parent; }
});
await page.waitForTimeout(90);
out.ghost = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  return {
    platePresent: !!p,
    plateClass: p ? p.className : null,
    computedOpacity: p ? getComputedStyle(p).opacity : null,
    dataMixTargetCount: document.querySelectorAll("[data-mix-target]").length,
    ghostDot: !!document.querySelector('.mix-plate [data-variant="ghost"]'),
    ghostDotAttrs: (() => { const d = document.querySelector('.mix-plate [data-variant="ghost"]'); return d ? [...d.attributes].map(a=>a.name) : null; })(),
    plateHTML: p ? p.outerHTML.slice(0, 900) : null,
  };
});
// sample opacity over the ghost window to see whether the vj-morph enter fade ran
out.opacityTrace = [];
for (let i = 0; i < 10; i++) {
  out.opacityTrace.push(await page.evaluate(() => { const p = document.querySelector(".mix-plate"); return p ? [Math.round(performance.now()), getComputedStyle(p).opacity, p.className.includes("ghost")] : null; }));
  await page.waitForTimeout(40);
}
await page.waitForTimeout(2500);
out.settled = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  if (!p) return { error: "no plate" };
  const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
  const btns = [...p.querySelectorAll("button")].filter(vis);
  const acc = x => x.getAttribute("aria-label") || x.getAttribute("aria-labelledby") || x.textContent.trim();
  return {
    plateClass: p.className, opacity: getComputedStyle(p).opacity,
    text: p.innerText.trim().slice(0,200),
    buttons: btns.map(x => { const r = x.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), title: x.getAttribute("title"), aria: x.getAttribute("aria-label"), namelessByReportHeuristic: !acc(x), type: x.getAttribute("type"), tabIndex: x.tabIndex }; }),
    resultDotAttrs: [...p.querySelectorAll(".watercolor-swatch")].map(x => [...x.attributes].map(a=>a.name)),
    liveRegions: p.querySelectorAll("[aria-live],[role=status],[role=alert]").length,
    svgAriaHidden: [...p.querySelectorAll("button svg")].map(s => s.getAttribute("aria-hidden")),
  };
});
out.copy = await (async () => {
  const btn = page.locator('.mix-plate button[title="Copy color"]').first();
  if (!(await btn.count())) return { skipped: true };
  await btn.click(); await page.waitForTimeout(220);
  const t = await btn.getAttribute("title");
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  await page.waitForTimeout(1600);
  return { titleAfterClick: t, clip, titleAfterReset: await btn.getAttribute("title") };
})();
// keyboard reachability of the plate's controls
out.keyboard = await page.evaluate(() => {
  const p = document.querySelector(".mix-plate");
  const focusables = p ? [...p.querySelectorAll("button,[tabindex]:not([tabindex='-1']),a[href]")] : [];
  return { count: focusables.length, titles: focusables.map(f => f.getAttribute("title")) };
});
out.errs = errs;
console.log(JSON.stringify(out, null, 1));
await b.close();

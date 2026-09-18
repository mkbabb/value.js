import { chromium } from "playwright";
const ORIGIN = "http://localhost:9010";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// (1) sample the pane scrollHeight from BOOT — the skeleton -> wall out-in swap
await page.addInitScript(() => {
  window.__samples = [];
  const tick = () => {
    const p = document.querySelector(".pane-scroll-fade");
    if (p) window.__samples.push([performance.now() | 0, p.scrollHeight, p.querySelectorAll("[class*='skeleton'], .palette-card-skeleton").length, p.querySelectorAll(".palette-card-grid > *").length]);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(6000);
const s = await page.evaluate(() => window.__samples);
const uniq = s.filter((v, i) => i === 0 || v[1] !== s[i - 1][1]);
console.log("=== pane scrollHeight trace from boot (t, scrollH, skeletons, gridChildren) ===");
console.log(uniq.map(r => r.join("/")).join("  "));
console.log("min/max scrollH:", Math.min(...s.map(r => r[1])), Math.max(...s.map(r => r[1])));

// (2) the filter trigger geometry + which declaration wins
const btn = await page.evaluate(() => {
  const b = document.querySelector('.search-seated button[aria-label="Filters"]');
  const bar = document.querySelector(".search-seated");
  const cs = getComputedStyle(b), bcs = getComputedStyle(bar);
  const br = b.getBoundingClientRect(), barR = bar.getBoundingClientRect();
  return {
    btnClass: b.className,
    computed: { h: cs.height, w: cs.width, minH: cs.minHeight, minW: cs.minWidth, borderRadius: cs.borderRadius },
    rect: { w: +br.width.toFixed(1), h: +br.height.toFixed(1), top: +br.top.toFixed(1), bottom: +br.bottom.toFixed(1) },
    barRect: { h: +barR.height.toFixed(1), top: +barR.top.toFixed(1), bottom: +barR.bottom.toFixed(1), padRight: bcs.paddingRight, radius: bcs.borderRadius },
    overhangTop: +(barR.top - br.top).toFixed(1),
    overhangBottom: +(br.bottom - barR.bottom).toFixed(1),
    aspect: +(br.width / br.height).toFixed(3),
  };
});
console.log("\n=== SearchFilterBar trigger vs the bar it sits in ===\n", JSON.stringify(btn, null, 1));

// (3) the search bar's dead click zone
const dead = await page.evaluate(() => {
  const bar = document.querySelector(".search-seated");
  const input = bar.querySelector("input");
  const r = bar.getBoundingClientRect(), ir = input.getBoundingClientRect();
  const probe = (x, y) => { const el = document.elementFromPoint(x, y); return el ? el.tagName.toLowerCase() + "." + String(el.className).split(/\s+/)[0] : null; };
  return {
    barH: +r.height.toFixed(1), inputH: +ir.height.toFixed(1),
    deadBandTop: +(ir.top - r.top).toFixed(1), deadBandBottom: +(r.bottom - ir.bottom).toFixed(1),
    hitAt_barTopPlus3: probe(r.x + r.width / 2, r.top + 3),
    hitAt_inputMid: probe(ir.x + 20, ir.top + ir.height / 2),
    hitAt_iconGap: probe(r.x + 26, r.top + r.height / 2),
    barHasLabel: bar.tagName.toLowerCase(),
  };
});
console.log("\n=== search field hit geometry ===\n", JSON.stringify(dead, null, 1));
// actually click the dead band and see if the input focuses
await page.mouse.click(400, (await page.evaluate(() => document.querySelector(".search-seated").getBoundingClientRect().top + 3)));
console.log("focus after clicking the bar's top 3px:", await page.evaluate(() => document.activeElement.tagName + "." + String(document.activeElement.className).split(/\s+/)[0]));

// (4) the AX identity of the loading divs + the wall's a11y wiring
const ax = await page.evaluate(() => {
  const pane = document.querySelector(".pane-scroll-fade");
  return {
    liveRegions: [...pane.querySelectorAll("[aria-live],[role=status],[role=alert]")].map(e => `${e.tagName.toLowerCase()} role=${e.getAttribute("role")} live=${e.getAttribute("aria-live")}`),
    ariaBusy: [...pane.querySelectorAll("[aria-busy]")].length,
    gridClass: document.querySelector(".palette-card-grid")?.className,
    gridRole: document.querySelector(".palette-card-grid")?.getAttribute("role"),
    gridTag: document.querySelector(".palette-card-grid")?.tagName,
    resultCountAnnounced: pane.innerText.match(/\d+\s+palette/i)?.[0] ?? null,
  };
});
console.log("\n=== a11y wiring of the wall ===\n", JSON.stringify(ax, null, 1));

// (5) .pane-scroll-fade — is there any actual fade?
const fade = await page.evaluate(() => {
  const p = document.querySelector(".pane-scroll-fade");
  const cs = getComputedStyle(p);
  const before = getComputedStyle(p, "::before"), after = getComputedStyle(p, "::after");
  return {
    maskImage: cs.maskImage, webkitMaskImage: cs.webkitMaskImage,
    beforeContent: before.content, beforeBg: before.background.slice(0, 60),
    afterContent: after.content, afterBg: after.background.slice(0, 60),
    overflowY: cs.overflowY, contain: cs.contain, scrollbarWidth: cs.scrollbarWidth,
    scrollH: p.scrollHeight, clientH: p.clientHeight,
  };
});
console.log("\n=== .pane-scroll-fade: does the named fade exist? ===\n", JSON.stringify(fade, null, 1));

// (6) how many api requests does the route fire on mount (tag catalog duplication)
const reqs = [];
page.on("request", r => r.url().includes(":9101") && reqs.push(r.url().replace("http://localhost:9101", "")));
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
reqs.length = 0;
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
console.log("\n=== API requests on entering #/browse ===\n", reqs.join("\n"));

await browser.close();

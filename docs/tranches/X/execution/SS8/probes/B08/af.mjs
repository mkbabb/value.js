// SS-8 B08 ActionFeedback witnesses (U-1 contrast, U-4 wrap threshold, U-5 registry leak).
// Run: guarded -- node af.mjs [cells...]   (one Chromium per run, one context per cell)
import { chromium } from "playwright";
import { O, EV, routeApi, newCell, settle, pixelMean, servedCr } from "./lib.mjs";
const want = process.argv.slice(2);
const on = (c) => !want.length || want.includes(c);

async function browse(browser, opts) {
  const ctx = await newCell(browser, opts);
  const hits = await routeApi(ctx, () => "mock");
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", (m) => /error|warn/.test(m.type()) && logs.push(m.type() + ": " + m.text().slice(0, 160)));
  page.on("pageerror", (e) => logs.push("pageerror: " + e.message.slice(0, 160)));
  await page.goto(O + "/#/browse", { waitUntil: "load" });
  await page.waitForSelector('[role="article"]', { timeout: 20000 });
  await settle(page, 2500);
  return { ctx, page, logs, hits };
}
// call the pane's own showFeedback channel on a mounted card
const show = (page, slug, msg, variant) => page.evaluate(([slug, msg, variant]) => {
  const pane = __ss8.findInstances("BrowsePane")[0];
  pane.setupState.cardRefs[slug].showFeedback(msg, variant);
}, [slug, msg, variant]);

const browser = await chromium.launch();
try {
  if (on("af-contrast")) for (const scheme of ["light", "dark"]) {
    const { ctx, page } = await browse(browser, { scheme });
    try {
      const out = {};
      for (const variant of ["success", "error"]) {
        await show(page, "audit-alpha", variant === "success" ? "Saved!" : "Couldn't publish.", variant);
        await page.waitForTimeout(900); // past the enter transition (opacity settled)
        out[variant] = await page.evaluate(() => {
          const chip = document.querySelector(".feedback-chip"); const t = chip.querySelector("span");
          const r = __ss8.ink(t); const icon = __ss8.ink(chip.querySelector("svg"), "color");
          return { dark: document.documentElement.classList.contains("dark"), text: r, icon: icon.cr, chipBg: getComputedStyle(chip).backgroundColor, fontPx: getComputedStyle(t).fontSize, opacity: getComputedStyle(chip).opacity };
        });
        { const chip = await page.locator(".feedback-chip").first().boundingBox(); // ground = the chip's own left padding strip (tint + glass + atmosphere, as served)
          const px = await pixelMean(page, { x: chip.x + 2, y: chip.y + chip.height / 2 - 3, width: 6, height: 6 });
          out[variant].served = servedCr(out[variant].text.raw, px); delete out[variant].text.stack; }
        if (variant === "error") await page.locator(".feedback-chip").first().screenshot({ path: `${EV}af-u1-chip-error-${scheme}.png` });
        await page.waitForTimeout(2600); // auto-dismiss
      }
      console.log("af-contrast", scheme, JSON.stringify(out));
    } finally { await ctx.close(); }
  }
  if (on("af-wrap")) for (const w of [390, 768, 1024, 1440]) {
    const { ctx, page } = await browse(browser, { w, h: 900 });
    try {
      // binary-search the message length (realistic words) at which the chip's content wraps past one line
      const words = "Couldn't change visibility because the palette service refused the request for this palette right now please try again later".split(" ");
      const mk = (n) => { let s = ""; let i = 0; while (s.length < n) s += (s ? " " : "") + words[i++ % words.length]; return s.slice(0, n); };
      let lo = 4, hi = 400, h1 = null;
      const measure = async (n) => { await show(page, "audit-alpha", mk(n), "error"); await page.waitForTimeout(700);
        return page.evaluate(() => { const c = document.querySelector(".feedback-chip"); const s = c.querySelector("span"); const lh = parseFloat(getComputedStyle(s).lineHeight); return { h: c.getBoundingClientRect().height, sh: s.getBoundingClientRect().height, lh, cw: c.getBoundingClientRect().width, cap: getComputedStyle(c).getPropertyValue("--vj-celebrate-expanded").trim() }; }); };
      h1 = await measure(lo);
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; const m = await measure(mid); if (m.sh > h1.sh * 1.5) hi = mid; else lo = mid; }
      const at = await measure(hi);
      console.log("af-wrap", w, JSON.stringify({ oneLine: h1, wrapsAtChars: hi, firstWrapped: at, rem: await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize)) }));
    } finally { await ctx.close(); }
  }
  if (on("af-leak")) {
    const { ctx, page, logs } = await browse(browser, {});
    try {
      const before = await page.evaluate(() => ({ keys: Object.keys(__ss8.findInstances("BrowsePane")[0].setupState.cardRefs), mounted: document.querySelectorAll('[role="article"]').length }));
      const search = page.locator('input[type="search"], input[placeholder*="earch"]').first();
      await search.fill("Alpha");
      await page.waitForFunction(() => document.querySelectorAll('[role="article"]').length === 1, null, { timeout: 10000 });
      await page.waitForTimeout(600);
      const after = await page.evaluate(() => { const refs = __ss8.findInstances("BrowsePane")[0].setupState.cardRefs; const keys = Object.keys(refs);
        return { keys, mounted: document.querySelectorAll('[role="article"]').length, dead: keys.filter((k) => !refs[k]?.$el?.isConnected) }; });
      const n0 = logs.length;
      const lost = await page.evaluate(async () => { const refs = __ss8.findInstances("BrowsePane")[0].setupState.cardRefs;
        const k = Object.keys(refs).find((k) => refs[k] && refs[k].$el && !refs[k].$el.isConnected); if (!k) return { deadKey: null };
        let threw = null; try { refs[k].showFeedback("Published!", "success"); } catch (e) { threw = e.message; }
        await new Promise((r) => setTimeout(r, 400));
        return { deadKey: k, threw, chips: document.querySelectorAll(".feedback-chip").length, bodyHasVerdict: document.body.innerText.includes("Published!") }; });
      await page.screenshot({ path: `${EV}af-u5-verdict-lost.png` });
      console.log("af-leak", JSON.stringify({ before, after, lost, newLogs: logs.slice(n0) }));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }

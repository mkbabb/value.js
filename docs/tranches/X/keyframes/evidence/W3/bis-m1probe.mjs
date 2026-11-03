// SERVED MODEL: claude-opus-5-5
// KF.W3.bis — M1 sheet measurement (read-only): one browser, one context, closed in finally.
import { resolveChromium, serveDist } from "/Users/mkbabb/Programming/.kf-bis-wt/scripts/lib/demo-driver.mjs";
const chromium = resolveChromium();
const browser = await chromium.launch();
const srv = await serveDist("/Users/mkbabb/Programming/.kf-bis-wt/dist/gh-pages");
const geo = (page, tag) => page.evaluate((tag) => {
  const w = document.querySelector('[data-slot="sheet-content"]');
  const p = document.querySelector(".controls-pane");
  const vh = innerHeight; const r = w?.getBoundingClientRect();
  return { tag, t: w ? getComputedStyle(w).getPropertyValue("--detent-t").trim() : null,
    pos: w ? getComputedStyle(w).position : null, top: r ? Math.round(r.top) : null, h: r ? Math.round(r.height) : null,
    visFrac: r ? +((vh - r.top) / vh).toFixed(3) : null, paneClientH: p?.clientHeight, paneScrollH: p?.scrollHeight,
    overflowY: p ? getComputedStyle(p).overflowY : null };
}, tag);
async function swipe(page, dir, dy = 360) {
  const b = await page.evaluate(() => { const h = document.querySelector('[data-slot="sheet-detent-handle"]'); if (!h) return null; const r = h.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; });
  if (!b) return;
  const cdp = await page.context().newCDPSession(page);
  try {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [b] });
    for (let i = 1; i <= 10; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: b.x, y: Math.round(b.y + dir * dy * i / 10) }] }); await page.waitForTimeout(20); }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } finally { await cdp.detach().catch(() => {}); }
  await page.waitForTimeout(1500);
}
try {
  for (let run = 1; run <= 2; run++) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
    try {
      const page = await ctx.newPage();
      await page.goto(`${srv.url}/#/amiga`, { waitUntil: "load" });
      await page.waitForSelector('[data-slot="sheet-detent-handle"]', { timeout: 15000 });
      await page.waitForTimeout(2500);
      console.log(JSON.stringify({ run, ...(await geo(page, "born")) }));
      await swipe(page, -1); console.log(JSON.stringify({ run, ...(await geo(page, "after-up")) }));
      await swipe(page, 1); console.log(JSON.stringify({ run, ...(await geo(page, "after-down")) }));
      await swipe(page, 1); console.log(JSON.stringify({ run, ...(await geo(page, "after-down-from-peek")) }));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); await srv.close(); }

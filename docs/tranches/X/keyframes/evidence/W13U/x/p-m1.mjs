// SERVED MODEL: claude-opus-5-5
import { withPage, navToScene } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const MOBILE = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 };
async function swipe(page, from, to) { const cdp = await page.context().newCDPSession(page); await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [from] }); for (let i = 1; i <= 10; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: Math.round(from.x + (to.x - from.x) * i / 10), y: Math.round(from.y + (to.y - from.y) * i / 10) }] }); await page.waitForTimeout(20); } await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await cdp.detach(); }
const r = await withPage({ distDir: "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages", label: "probe", context: MOBILE }, async (page, { url }) => {
  await page.goto(`${url}/#/amiga`, { waitUntil: "load" });
  await navToScene(page, "amiga", "Controls", { timeout: 12000 });
  await page.waitForTimeout(1500);
  const h = await page.evaluate(() => { const r = document.querySelector(".glass-drawer-handle")?.getBoundingClientRect(); return r && { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; });
  if (h) await swipe(page, h, { x: h.x, y: h.y - 360 });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => { const p = document.querySelector(".controls-pane"); const r = p.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = Math.min(r.top + r.height / 2, (r.top + innerHeight) / 2); const hit = document.elementFromPoint(cx, cy); const chain = []; for (let e = hit; e && chain.length < 25; e = e.parentElement) { const cs = getComputedStyle(e); chain.push(`${e.tagName.toLowerCase()}.${(e.className?.toString?.() || "").split(" ").slice(0, 3).join(".")} oy=${cs.overflowY} ta=${cs.touchAction} sh=${e.scrollHeight} ch=${e.clientHeight}${e === p ? " <PANE>" : ""}`); } const rect = (s) => { const b = document.querySelector(s)?.getBoundingClientRect(); return b && [Math.round(b.top), Math.round(b.bottom), Math.round(b.height)]; }; return { rects: { drawer: rect(".glass-drawer"), pane: rect(".controls-pane"), wrap: rect(".controls-pane-wrapper") }, t: getComputedStyle(document.querySelector(".glass-drawer")).getPropertyValue("--glass-drawer-t"), cx, cy, sh: p.scrollHeight, ch: p.clientHeight, chain }; });
  await swipe(page, { x: Math.round(info.cx), y: Math.round(info.cy) }, { x: Math.round(info.cx), y: Math.round(info.cy) - 180 });
  await page.waitForTimeout(600);
  info.after = await page.evaluate(() => { const out = []; for (const e of document.querySelectorAll("*")) if (e.scrollTop > 0) out.push(e.className?.toString?.().slice(0, 50) + "=" + e.scrollTop); return { pane: document.querySelector(".controls-pane").scrollTop, any: out, t: getComputedStyle(document.querySelector(".glass-drawer")).getPropertyValue("--glass-drawer-t") }; });
  return info;
});
console.log(JSON.stringify(r, null, 1).slice(0, 6000));

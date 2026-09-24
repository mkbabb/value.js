// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.d (OA-57 §0cq · OA-68 §0ct, KF-W13.md :497-499, :504-505) — served read of every
// keyframes dock in its COLLAPSED state: the plate box, every visible collapsed-face descendant
// against it (spill), every clipping ancestor (consumer clip), and the gap to the nearest panel.
// Usage: node probe-collapsed-dock.mjs [--base URL] [--w 1440 --h 900] [--theme light|dark] [--frames dir] [--scenes a,b]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://127.0.0.1:5293"), W = +arg("w", 1440), H = +arg("h", 900);
const THEME = arg("theme", "light"), FRAMES = arg("frames", null);
const SCENES = arg("scenes", "cube,square,amiga,easing,spring,sequence").split(",");
if (FRAMES) mkdirSync(FRAMES, { recursive: true });
const mobile = W < 768;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
const page = await ctx.newPage();
const out = { viewport: `${W}x${H}`, theme: THEME, scenes: {} };
for (const s of SCENES) {
  await page.goto(`${BASE}/#/${s}`, { waitUntil: "networkidle" });
  // arm every dock's idle collapse: hover (desktop) or tap (touch) each dock once, then leave.
  for (const b of await page.$$eval(".glass-dock", (ds) => ds.map((d) => { const r = d.getBoundingClientRect(); return [r.x + 4, r.y + r.height / 2]; }))) {
    if (mobile) await page.touchscreen.tap(b[0], b[1]); else await page.mouse.move(b[0], b[1]);
    await page.waitForTimeout(400);
  }
  if (mobile) await page.touchscreen.tap(W / 2, H * 0.45); else await page.mouse.move(W - 5, H * 0.45);
  // wait for every dock to reach the collapsed class (the one 3600 ms idle window) and settle its morph
  await page.waitForFunction(() => [...document.querySelectorAll(".glass-dock")].every((d) => d.classList.contains("collapsed") && !d.hasAttribute("data-morphing")), null, { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(900);
  const r = await page.evaluate(() => {
    const R = (e) => { const b = e.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const vis = (e) => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && b.height > 0 && cs.visibility !== "hidden" && +cs.opacity > 0.01; };
    return [...document.querySelectorAll(".glass-dock")].map((dock) => {
      const plate = dock.querySelector(".dock-plate") ?? dock;
      const pr = plate.getBoundingClientRect();
      const tether = dock.closest("[data-dock-tether]")?.getAttribute("data-dock-tether");
      const attrs = Object.fromEntries([...dock.attributes].filter((a) => a.name.startsWith("data-")).map((a) => [a.name, a.value]));
      // the collapsed face = the visible summary seat + every persistent seat (glass `#persistent` /
      // `#persistent-end`, in-flow on both faces)
      const seats = [...dock.querySelectorAll(".dock-layer--summary, .dock-persistent")].filter(vis);
      const face = seats.length ? seats : null;
      const spill = [];
      if (face) for (const e of seats.flatMap((x) => [...x.querySelectorAll("*")])) {
        if (!vis(e) || e.closest("svg") !== null && e.tagName !== "svg") continue;
        const b = e.getBoundingClientRect();
        const o = { l: pr.left - b.left, r: b.right - pr.right, t: pr.top - b.top, b: b.bottom - pr.bottom };
        const worst = Math.max(o.l, o.r, o.t, o.b);
        if (worst > 0.5) spill.push({ el: e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.split(/\s+/).slice(0, 2).join(".") : ""), text: e.textContent.trim().slice(0, 20), over: +worst.toFixed(1) });
      }
      const clips = [];
      for (let a = dock.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        const cs = getComputedStyle(a);
        if (cs.overflowX !== "visible" || cs.overflowY !== "visible" || cs.clipPath !== "none" || cs.contain.includes("paint")) {
          const ab = a.getBoundingClientRect();
          const cut = Math.max(ab.left - pr.left, pr.right - ab.right, ab.top - pr.top, pr.bottom - ab.bottom);
          clips.push({ el: a.tagName.toLowerCase() + "." + String(a.className).split(/\s+/).slice(0, 2).join("."), ov: `${cs.overflowX}/${cs.overflowY}`, cut: +cut.toFixed(1) });
        }
      }
      // the nearest panel above/below/beside (a .card or [role=dialog] not inside a dock): gap in px
      let gap = null;
      for (const c of document.querySelectorAll(".card, [role=dialog]")) {
        if (c.closest(".glass-dock") || !vis(c)) continue;
        const cb = c.getBoundingClientRect();
        const hOverlap = cb.left < pr.right && cb.right > pr.left, vOverlap = cb.top < pr.bottom && cb.bottom > pr.top;
        let g = null;
        if (hOverlap) g = cb.top >= pr.bottom ? cb.top - pr.bottom : cb.bottom <= pr.top ? pr.top - cb.bottom : -1;
        else if (vOverlap) g = cb.left >= pr.right ? cb.left - pr.right : pr.left - cb.right;
        if (g !== null && (gap === null || g < gap)) gap = +g.toFixed(1);
      }
      return { tether, cls: String(dock.className), attrs, plate: R(plate), collapsedFaceVisible: !!face, faceChildren: face ? seats.flatMap((x) => [...x.children]).filter(vis).map((e) => ({ tag: e.tagName.toLowerCase(), label: e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 20), box: R(e) })) : [], spill, clips, nearestPanelGap: gap };
    });
  });
  out.scenes[s] = r;
  if (FRAMES) {
    await page.screenshot({ path: `${FRAMES}/${W}-${THEME}-${s}.png` });
    for (const [i, d] of r.entries()) {
      const p = d.plate, m = 24;
      await page.screenshot({ path: `${FRAMES}/${W}-${THEME}-${s}-dock${i}-${d.tether}.png`, clip: { x: Math.max(0, p.x - m), y: Math.max(0, p.y - m), width: Math.min(W, p.w + 2 * m), height: Math.min(H, p.h + 2 * m) } });
    }
  }
}
console.log(JSON.stringify(out));
await browser.close();

// X-DS fourier pass 3 (redeploy) — CURE AFTER frames + measures for critic F3R's
// consumer rows C1, C2, C3, C5. Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  try {
    // C2 — gallery search rule
    await go("/gallery"); await shot(p, `gallery-${k}`);
    o.c2 = await p.evaluate(() => { const s = document.querySelector(".search-rule"); const f = document.querySelector(".search-pill input, input.search-pill, .search-pill"); const inp = document.querySelector("input[placeholder*=Search]"); const r = s?.getBoundingClientRect(), fr = inp?.getBoundingClientRect(); return s && fr ? { rule: [r.top, r.bottom, r.height].map((n) => +n.toFixed(1)), field: [fr.top, fr.bottom, fr.height].map((n) => +n.toFixed(1)), offCentre: +(((r.top + r.bottom) / 2) - ((fr.top + fr.bottom) / 2)).toFixed(2), alignSelf: getComputedStyle(s).alignSelf } : null; });
    // C3 — paper citations
    await go("/paper", 3500);
    await p.evaluate(() => { const port = document.querySelector(".paper-scroll"); if (port) port.scrollTop = 2600; else window.scrollTo(0, 2600); });
    await p.waitForTimeout(1500); await shot(p, `paper-scrolled-${k}`);
    o.c3 = await p.evaluate(() => { const cs = [...document.querySelectorAll(".paper-article .paper-cite")]; const art = document.querySelector(".paper-article").getBoundingClientRect(); const rows = cs.map((c) => ({ t: c.textContent, w: c.getBoundingClientRect().width, lines: c.getClientRects().length, right: c.getBoundingClientRect().right })); return { n: cs.length, hyphens: cs[0] && getComputedStyle(cs[0]).hyphens, ws: cs[0] && getComputedStyle(cs[0]).whiteSpace, multiLine: rows.filter((r) => r.lines > 1).length, widest: rows.sort((a, b) => b.w - a.w).slice(0, 2), articleW: art.width, articleRight: art.right, overflowing: rows.filter((r) => r.right > art.right + 0.5).length, proseHyphens: getComputedStyle(document.querySelector(".paper-article p")).hyphens }; });
    // C5 — empty stage
    await go("/w", 2000); await shot(p, `w-${k}`);
    o.c5 = await p.evaluate(() => { const z = document.querySelector(".drop-zone"), s = document.querySelector(".configurator-stage"); const zc = getComputedStyle(z), zr = z.getBoundingClientRect(), sr = s.getBoundingClientRect(); return { zoneBorder: `${zc.borderTopWidth} ${zc.borderTopStyle} ${zc.borderTopColor}`, zoneRadius: zc.borderRadius, zone: [zr.x, zr.y, zr.width, zr.height].map(Math.round), stage: [sr.x, sr.y, sr.width, sr.height].map(Math.round), stageRadius: getComputedStyle(s).borderRadius }; });
    if (w === 1440) {
      // the drag state: the rim is inked while a file is over the page
      await p.evaluate(() => { const dt = new DataTransfer(); dt.items.add(new File(["x"], "a.png", { type: "image/png" })); const t = document.querySelector(".drop-zone"); for (const type of ["dragenter", "dragover"]) t.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt })); });
      await p.waitForTimeout(500); await shot(p, `w-dragging-${k}`);
      o.c5drag = await p.evaluate(() => { const z = document.querySelector(".drop-zone"); const zc = getComputedStyle(z); return { dragging: !!document.querySelector(".drop-target[data-dragging]"), zoneBorder: `${zc.borderTopWidth} ${zc.borderTopStyle} ${zc.borderTopColor}` }; });
    }
    // C1 (+ C4 as it stands) — /v Basis layer
    await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v still computing", k));
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, w === 390 ? `v-controls-${k}` : `v-loaded-${k}`);
    o.c1 = await p.evaluate(() => { const fs = (e) => e && { t: e.textContent.trim().slice(0, 24), px: +parseFloat(getComputedStyle(e).fontSize).toFixed(2), lh: getComputedStyle(e).lineHeight }; return { headings: [...document.querySelectorAll(".basis-group-label")].map(fs), rowLabels: [...document.querySelectorAll(".configurator-aside .control-row-label")].slice(0, 3).map(fs) }; });
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/f3r-cure-probe-after.json`, JSON.stringify(out, null, 1));
}
await b.close();

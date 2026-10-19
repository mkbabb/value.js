// X-DS fourier pass 5 (cure seat for critic F5X): AFTER frames for the critic's cells. Headless real Chrome only (§0ei).
// Cells: /paper 1440 light+dark at rest (pointer parked at 0,0 BEFORE navigating; asserts no .toc-link :hover, DS-F5X-T1)
// and with the pointer on a non-selected ToC row (toc-hover); /equation 390 light+dark, the dock plate radius read at load
// and after 8 s idle (DS-F5X-G1 witness, glass-owned).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
const tocState = (p) => p.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const links = [...document.querySelectorAll(".toc-link")].filter(vis);
  const row = (l) => l && { text: l.innerText.trim().slice(0, 40), rowBg: getComputedStyle(l.parentElement).backgroundColor,
    linkBg: getComputedStyle(l).backgroundColor, rowW: l.parentElement.getBoundingClientRect().width, linkW: l.getBoundingClientRect().width,
    chevronInside: !!l.parentElement.querySelector(".toc-disclosure"), hover: l.matches(":hover") };
  return { n: links.length, hovered: links.filter((l) => l.matches(":hover")).length,
    leaf: row(links.find((l) => l.hasAttribute("data-leaf"))), hoverRow: row(links.find((l) => l.matches(":hover"))) };
});
try {
for (const theme of ["light", "dark"]) {
  // /paper 1440
  { const k = `${theme}-1440`; const o = (out[`paper-${k}`] = {});
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try {
      await p.mouse.move(0, 0);
      await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(4000);
      await p.mouse.move(0, 0);
      o.rest = await tocState(p);
      if (o.rest.hovered !== 0) throw new Error(`T1: ${o.rest.hovered} .toc-link match :hover at rest`);
      await shot(p, `paper-${k}`);
      const target = p.locator(".toc-link:not([aria-current])").filter({ visible: true }).nth(1);
      const bb = await target.boundingBox(); await p.mouse.move(bb.x + 40, bb.y + bb.height / 2); await p.waitForTimeout(800);
      o.hover = await tocState(p);
      await shot(p, `toc-hover-${k}`);
      await p.mouse.move(0, 0); await p.waitForTimeout(600); o.left = await tocState(p);
    } catch (e) { o.err = e.message.slice(0, 300); }
    await ctx.close(); }
  // /equation 390
  { const k = `${theme}-390`; const o = (out[`equation-${k}`] = {});
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    const dock = () => p.evaluate(() => { const pl = document.querySelector(".dock-plate"), sh = document.querySelector(".app-dock");
      return { plateRadius: pl && getComputedStyle(pl).borderRadius, plateW: pl && pl.getBoundingClientRect().width, shellRadius: sh && getComputedStyle(sh).borderRadius }; });
    try {
      await p.goto(BASE + "/equation", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(2000);
      o.load = await dock(); await shot(p, `equation-${k}`);
      await p.waitForTimeout(8000); o.late = await dock(); if (theme === "light") await shot(p, "dock-equation-late");
    } catch (e) { o.err = e.message.slice(0, 300); }
    await ctx.close(); }
  writeFileSync(`${OUT}/f5x-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }

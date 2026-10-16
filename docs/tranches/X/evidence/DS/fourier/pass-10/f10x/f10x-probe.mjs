// X-DS fourier pass 10 cure (F10X): frames + computed reads for DS-F10X-C1/C2/C3/T1. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const levels = (p) => p.evaluate(() => {
  const strip = document.querySelector(".levels-card .grid");
  const kids = [...strip.children];
  const t = kids[0]; const r = t.getBoundingClientRect(); const cs = getComputedStyle(t);
  const svg = t.querySelector(".grid-svg").getBoundingClientRect();
  const rowTops = kids.map((k) => Math.round(k.getBoundingClientRect().top)); const perRow = [...new Set(rowTops)].map((y) => rowTops.filter((v) => v === y).length);
  const s = strip.getBoundingClientRect();
  const whole = kids.filter((k) => { const q = k.getBoundingClientRect(); return q.right <= s.right + 1 && q.left >= s.left - 1; }).length;
  return { perRow, tilesWhole: whole, tileW: +r.width.toFixed(1), tileH: +r.height.toFixed(1), ratio: +(r.height / r.width).toFixed(3), radius: cs.borderTopLeftRadius, radiusOverW: +(parseFloat(cs.borderTopLeftRadius) / r.width).toFixed(3), svg: [Math.round(svg.width), Math.round(svg.height)], labelPx: parseFloat(getComputedStyle(t.querySelector(".grid-label")).fontSize) };
});
const shell = (p) => p.evaluate(() => {
  const m = document.querySelector("main"); const cs = getComputedStyle(m);
  return { mainScrollTop: Math.round(m.scrollTop), mainScrollable: m.scrollHeight > m.clientHeight, scrolled: m.dataset.scrolled ?? null, borderTop: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` };
});
const gallery = (p) => p.evaluate(() => {
  const host = document.querySelector(".gallery-grid-host"); const grid = document.querySelector(".gallery-grid");
  const tb = document.querySelector("main [role=tablist]")?.closest(".flex");
  const dock = document.querySelector(".dock-plate, [data-slot=dock]")?.getBoundingClientRect();
  const cards = [...grid.children].map((c) => c.getBoundingClientRect());
  const h = host.getBoundingClientRect(); const t = tb?.getBoundingClientRect();
  return { vw: innerWidth, host: [Math.round(h.left), Math.round(h.width)], hostCenter: Math.round(h.left + h.width / 2), toolbar: t && [Math.round(t.left), Math.round(t.width)], toolbarCenter: t && Math.round(t.left + t.width / 2), dockCenter: dock && Math.round(dock.left + dock.width / 2), cols: getComputedStyle(grid).gridTemplateColumns, cards: cards.length, firstCardX: cards[0] && Math.round(cards[0].left), lastCardRight: cards.length && Math.round(Math.max(...cards.map((c) => c.right))) };
});
const aside = (p) => p.evaluate(() => {
  const a = document.querySelector(".configurator-aside"); const fs = a?.querySelector(".fading-scroll");
  if (!a) return null; const ar = a.getBoundingClientRect(); const cs = fs && getComputedStyle(fs); const acs = getComputedStyle(a);
  return { aside: [Math.round(ar.top), Math.round(ar.bottom)], scrollH: fs?.scrollHeight, clientH: fs?.clientHeight, scrollTop: fs?.scrollTop, fadeEnd: fs?.style.getPropertyValue("--fade-end"), mask: cs?.maskImage?.slice(0, 160), asideBorderBottom: `${acs.borderBottomWidth} ${acs.borderBottomStyle} ${acs.borderBottomColor}`, fsBorderBottom: cs && `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`, scrolledEnd: fs?.dataset.scrolledEnd ?? null };
});
const cells = [["morph", 1440], ["morph", 1024], ["morph", 390], ["gallery", 1440], ["gallery", 390], ["equation", 1440]];
try {
  for (const theme of ["light", "dark"]) for (const [route, w] of cells) {
    const k = `${route}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try {
      await p.mouse.move(0, 0);
      await p.goto(BASE + "/" + route, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(4000);
      const rec = {};
      if (route === "morph") {
        rec.shellTop = await shell(p);
        if (w === 1024) { await p.evaluate(() => { document.querySelector("main").scrollTop = 200; }); await p.waitForTimeout(600); await p.screenshot({ path: `${OUT}/${k}-scrolled.png` }); rec.shellScrolled = await shell(p); }
        await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
        rec.levels = await levels(p);
      }
      if (route === "gallery") { await p.waitForSelector(".gallery-grid > *", { timeout: 20000 }).catch(() => {}); rec.gallery = await gallery(p); }
      if (route === "equation") { await p.waitForTimeout(3000); rec.aside = await aside(p); }
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = rec;
    } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
    await ctx.close();
  }
} finally { await b.close(); writeFileSync(`${OUT}/f10x-probe.json`, JSON.stringify(out, null, 1)); }

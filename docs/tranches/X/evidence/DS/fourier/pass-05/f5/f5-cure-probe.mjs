// X-DS fourier pass 5 (critic F5) — the AFTER frames and the cure measurements. Headless real Chrome only (§0ei).
// Usage: node f5-cure-probe.mjs OUT [BASE] [TAG]
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const TAG = process.argv[4] ?? "after";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const r4 = (r) => r && [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)];
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`;
  for (const [n, r] of Object.entries({ gallery: "/gallery", morph: "/morph", paper: "/paper", "no-such-route": "/no-such-route" })) {
    const p = await page(theme, w);
    await p.goto(BASE + r, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(4000);
    await p.screenshot({ path: `${OUT}/${n}-${k}.png` });
    if (n === "gallery") {
      res[`gallery-${k}`] = await p.evaluate(() => {
        const g = document.querySelector(".gallery-grid");
        const cards = [...g.children].map((c) => c.getBoundingClientRect());
        return { cols: getComputedStyle(g).gridTemplateColumns, cardW: [...new Set(cards.map((c) => Math.round(c.width)))], n: cards.length };
      });
      if (w === 1440) {
        const card = p.locator(".gallery-card").first();
        const rest = await card.evaluate((e) => getComputedStyle(e).backgroundColor + " | " + getComputedStyle(e).backgroundImage).catch(() => null);
        await card.hover().catch(() => {}); await p.waitForTimeout(500);
        const hov = await card.evaluate((e) => getComputedStyle(e).backgroundColor + " | " + getComputedStyle(e).backgroundImage).catch(() => null);
        res[`gallery-hover-${k}`] = { rest, hover: hov };
        await p.screenshot({ path: `${OUT}/gallery-hover-${theme}-1440.png` });
        // card size against result count: filter the search to one term
        const s = p.locator("input[type=search], .search-pill input").first();
        if (await s.count()) {
          const word = await p.evaluate(() => (document.querySelector(".gallery-card")?.textContent.match(/[a-z]{4,}/) ?? ["plush"])[0]); await s.fill(word); await p.waitForTimeout(1500);
          res[`gallery-search-${k}`] = await p.evaluate(() => { const g = document.querySelector(".gallery-grid"); if (!g) return null; const c = [...g.children].map((x) => Math.round(x.getBoundingClientRect().width)); return { term: document.querySelector(".search-pill input")?.value, n: c.length, cardW: [...new Set(c)] }; });
        }
      }
    }
    if (n === "morph") {
      res[`morph-${k}`] = await p.evaluate(() => {
        const st = document.querySelector(".stage-column"); const act = document.querySelector(".stage-actions");
        const cells = [...document.querySelectorAll(".levels-card .grid-cell")].slice(0, 3).map((c) => { const r = c.getBoundingClientRect(); const l = c.querySelector(".grid-label").getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), labelToBottom: Math.round(r.bottom - l.bottom), radius: getComputedStyle(c).borderRadius }; });
        return { stage: [Math.round(st.getBoundingClientRect().top), Math.round(st.getBoundingClientRect().height)], position: getComputedStyle(st).position, actionsInStage: st.contains(act), actions: [Math.round(act.getBoundingClientRect().top), Math.round(act.getBoundingClientRect().height)], cells };
      });
      const card = p.locator(".levels-card");
      await card.screenshot({ path: `${OUT}/morph-levels-${k}.png` }).catch(() => {});
      await p.mouse.wheel(0, 900); await p.waitForTimeout(1500); await p.screenshot({ path: `${OUT}/morph-scroll-${k}.png` });
      res[`morph-scroll-${k}`] = await p.evaluate(() => { const st = document.querySelector(".stage-column").getBoundingClientRect(); return { stageTop: Math.round(st.top), stageBottom: Math.round(st.bottom), pctOfViewport: Math.round((st.height / innerHeight) * 1000) / 10 }; });
    }
    if (n === "paper") {
      res[`paper-${k}`] = await p.evaluate(() => [...document.querySelectorAll("dl.paper-description dt")].map((d) => ({ text: d.textContent.trim(), weight: getComputedStyle(d).fontWeight })));
      const dl = p.locator("dl.paper-description").first();
      await dl.scrollIntoViewIfNeeded().catch(() => {}); await p.waitForTimeout(400);
      await dl.screenshot({ path: `${OUT}/paper-description-${k}.png` }).catch(() => {});
    }
    if (n === "no-such-route") {
      res[`notfound-${k}`] = await p.evaluate(() => {
        const card = document.querySelector("[data-testid=not-found]");
        const glyphLeft = (el) => { const rg = document.createRange(); const t = [...el.querySelectorAll("*"), el].flatMap((x) => [...x.childNodes]).find((c) => c.nodeType === 3 && c.textContent.trim()); rg.selectNodeContents(t); return Math.round(rg.getBoundingClientRect().left * 10) / 10; };
        const title = card.querySelector("h1"); const btns = [...card.querySelectorAll("button")];
        return { titleGlyph: glyphLeft(title), buttons: btns.map((b) => ({ t: b.textContent.trim(), emph: b.dataset.emphasis, top: Math.round(b.getBoundingClientRect().top), plateLeft: Math.round(b.getBoundingClientRect().left * 10) / 10, glyphLeft: glyphLeft(b) })) };
      });
    }
    await p.context().close();
  }
  if (w === 1440) {
    const p = await page(theme, w);
    await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0);
    await p.waitForTimeout(5000);
    await p.screenshot({ path: `${OUT}/v-stage-${theme}-1440.png` });
    const c = p.locator("canvas").first(); const bb = await c.boundingBox().catch(() => null);
    if (bb) { await p.mouse.move(bb.x + bb.width * 0.25, bb.y + bb.height * 0.65); await p.waitForTimeout(1200); }
    await p.screenshot({ path: `${OUT}/v-epicycle-hover-${theme}-1440.png` });
    await p.context().close();
  }
}
fs.writeFileSync(`${OUT}/f5-cure-probe-${TAG}.json`, JSON.stringify(res, null, 1));
await b.close();

// X-DS fourier pass 9 · F9C cure probe (DS-F9C-C1 /404 card pad, DS-F9C-C2 /gallery search edge). Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3153";
const cells = [["light",1440],["dark",1440],["light",390],["dark",390]];
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const route of ["404", "gallery"]) for (const [theme, w] of cells) {
    const k = `${route}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
    try {
      await p.goto(BASE + (route === "404" ? "/no-such-route-f9c" : "/gallery"), { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.waitForSelector(route === "404" ? "[data-testid=not-found]" : ".gallery-grid > *", { timeout: 30000 }).catch(() => {});
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = await p.evaluate((route) => {
        const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x*10)/10, y: Math.round(r.y*10)/10, w: Math.round(r.width*10)/10, h: Math.round(r.height*10)/10, right: Math.round(r.right*10)/10 }; };
        if (route === "404") {
          const card = document.querySelector("[data-testid=not-found]"); const h1 = card?.querySelector("h1");
          const hdr = card?.querySelector(".card-header"); const foot = card?.querySelector(".card-footer");
          const cs = hdr ? getComputedStyle(hdr) : null; const btns = [...(foot?.querySelectorAll("button") ?? [])].map(box);
          const range = document.createRange(); if (h1) range.selectNodeContents(h1); const tr = h1 ? range.getBoundingClientRect() : null;
          return { card: box(card), h1: box(h1), h1FontSize: h1 ? getComputedStyle(h1).fontSize : null, headerPad: cs?.padding, cardPad: card ? getComputedStyle(card).getPropertyValue("--card-pad") : null,
            titleInsetTop: tr && card ? Math.round((tr.top - card.getBoundingClientRect().top)*10)/10 : null, titleInsetLeft: tr && card ? Math.round((tr.left - card.getBoundingClientRect().left)*10)/10 : null,
            actions: btns, actionsDeadRight: btns.length && card ? Math.round((card.getBoundingClientRect().right - Math.max(...btns.map(b => b.right)))*10)/10 : null, scrollW: document.documentElement.scrollWidth };
        }
        const grid = document.querySelector(".gallery-grid"); const cards = grid ? [...grid.children].map((c) => c.getBoundingClientRect()) : [];
        const row0 = cards.filter((r) => Math.abs(r.y - (cards[0]?.y ?? 0)) < 2);
        return { tabs: box(document.querySelector("[role=tablist]")), searchRoot: box(document.querySelector("[role=search]")), searchField: box(document.querySelector("#gallery-search-input")?.closest(".search-pill") ?? document.querySelector(".search-pill")),
          grid: box(grid), columns: row0.length, columnEdges: row0.map((r) => [Math.round(r.left), Math.round(r.right)]), scrollW: document.documentElement.scrollWidth };
      }, route);
      out[k].pageErrors = errs;
    } catch (e) { out[k + "-err"] = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f9c-probe.json`, JSON.stringify(out, null, 1)); }

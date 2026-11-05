// x-0hm-cures value seat — served falsifiers for D-19/D-20/D-24/D-31/D-32/D-33.
// One browser per run, a context per cell, close in finally.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "https://color.babb.dev";
const TAG = process.argv[2] || "r";
const OUT = process.env.HOME + "/.dev-logs/x-0hr/d/" + TAG;
fs.mkdirSync(OUT, { recursive: true });
const VP = {
  land: { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  m390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  m430: { viewport: { width: 430, height: 932 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  d18: { viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 1 },
  d14: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
};
const PLAN = (process.env.PLAN || "land:/,land:/mix,m390:/,m430:/,m390:/browse,d18:/atmosphere,m390:/atmosphere,d14:/,d14:/browse").split(",");
const res = [];
const browser = await chromium.launch();
try {
  for (const cell of PLAN) {
    const [c, r] = cell.split(":");
    const ctx = await browser.newContext({ ...VP[c], colorScheme: "dark" });
    try {
      const page = await ctx.newPage();
      const errs = [];
      page.on("pageerror", (e) => errs.push("PE " + String(e).slice(0, 160)));
      page.on("console", (m) => { if (m.type() === "error") errs.push("CE " + m.text().slice(0, 160)); });
      await page.goto(BASE + "/#" + r, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(4000);
      const m = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
        const vh = innerHeight;
        const out = { vw: innerWidth, vh, docH: document.documentElement.scrollHeight };
        out.panes = [...document.querySelectorAll(".pane-wrapper")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => [e.className.match(/pane-wrapper--\w+/)?.[0], ...R(e)]);
        const band = document.querySelector(".pane-container");
        out.row = band ? R(band) : null;
        out.cols = band ? getComputedStyle(band).gridTemplateColumns : null;
        const insp = document.querySelector(".pane-wrapper--inspector");
        out.inspector = insp ? R(insp) : null;
        const sl = document.querySelector(".pane-wrapper--stage [role=slider]:last-of-type") ;
        const sliders = [...document.querySelectorAll(".pane-wrapper--stage [role=slider]")];
        out.lastSliderBottom = sliders.length ? Math.round(Math.max(...sliders.map((s) => s.getBoundingClientRect().bottom))) : null;
        out.cards = [...document.querySelectorAll(".palette-card")].slice(0, 4).map((card) => {
          const n = card.querySelector("[data-palette-name]");
          const v = card.querySelector('button[aria-label$="click to vote"]');
          let hit = null;
          if (v) {
            const b = v.getBoundingClientRect();
            // hit extent: probe elementFromPoint outward from centre
            const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
            const ext = (dx, dy) => { let k = 0; for (; k < 40; k++) { const el = document.elementFromPoint(cx + dx * k, cy + dy * k); if (!el || !(el === v || v.contains(el))) break; } return k; };
            hit = [ext(-1, 0) + ext(1, 0) - 1, ext(0, -1) + ext(0, 1) - 1];
          }
          return { card: R(card), name: R(n), nameTrunc: n ? n.scrollWidth > n.clientWidth : null, nameText: n?.textContent?.trim(), vote: R(v), voteHit: hit };
        });
        out.labels = [...document.querySelectorAll(".aurora-form label, .aurora-form [id$='-arrangement']")].map((l) => { const nx = l.nextElementSibling; return [l.textContent.trim(), ...R(l), nx ? Math.round(nx.getBoundingClientRect().x - l.getBoundingClientRect().right) : null]; });
        return out;
      });
      const shot = `${OUT}/${c}${r.replace(/\//g, "_")}.png`;
      await page.screenshot({ path: shot, scale: "css" });
      res.push({ c, r, errs: [...errs].slice(0, 5), ...m });
    } catch (e) { res.push({ c, r, error: String(e).slice(0, 200) }); } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(OUT + "/res.json", JSON.stringify(res, null, 1)); }

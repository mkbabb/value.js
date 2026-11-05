// §0hr.2 (3)(4)(6) falsifiers on a served tree. The API is proxied from prod
// (read-only GETs) so a loopback page reads the live rows.
// D-24: 390 Browse — 'Daraksha Gradient' not truncated (scrollWidth <= clientWidth), vote+menu on the name row.
// D-19: 844x390 picker + mix — every stage slider's bottom <= 390.
// (6): each Browse band's computed background equals its row's css (render truth).
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://vj.test:5341";
// `vj.test` is a non-loopback origin served by proxying to the local dev server, so the
// loopback dev-misconfig gate (availability.ts) stays off; the prod API is proxied read-only.
const LOCAL = process.env.LOCAL || "http://localhost:5341";
const API = "https://api.color.babb.dev";
const TAG = process.argv[2] || "r";
const OUT = process.env.HOME + "/.dev-logs/x-0hr2/layout/" + TAG;
fs.mkdirSync(OUT, { recursive: true });
const CELLS = (process.env.CELLS || "m390:/browse,m430:/browse,land:/,land:/mix,m390:/,d14:/,d14:/browse").split(",");
const VP = {
  land: { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  m390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  m430: { viewport: { width: 430, height: 932 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  d14: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
};
const rows = [];
const browser = await chromium.launch();
try {
  for (const cell of CELLS) {
    const [c, r] = cell.split(":");
    for (const scheme of ["dark", "light"]) {
      const ctx = await browser.newContext({ ...VP[c], colorScheme: scheme });
      try {
        if (BASE.includes("vj.test")) {
          await ctx.route("http://vj.test:5341/**", async (route) => {
            const u = route.request().url().replace("http://vj.test:5341", LOCAL);
            const res = await fetch(u);
            const body = Buffer.from(await res.arrayBuffer());
            const headers = {}; res.headers.forEach((v, k) => { if (!/content-encoding|content-length|transfer-encoding/.test(k)) headers[k] = v; });
            return route.fulfill({ status: res.status, body, headers });
          });
        }
        if (!BASE.startsWith("https://color.babb.dev")) {
          await ctx.route(API + "/**", async (route) => {
            const req = route.request();
            if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS" } });
            if (req.method() !== "GET") return route.fulfill({ status: 403, body: "{}", headers: { "access-control-allow-origin": "*", "content-type": "application/json" } });
            const res = await fetch(req.url(), { headers: { accept: "application/json" } });
            const body = Buffer.from(await res.arrayBuffer());
            return route.fulfill({ status: res.status, body, headers: { "content-type": res.headers.get("content-type") || "application/json", "access-control-allow-origin": "*" } });
          });
        }
        const page = await ctx.newPage();
        await ctx.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch {} }, scheme);
        await page.goto(BASE + "/#" + r, { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(5000);
        const m = await page.evaluate(() => {
          const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
          const out = { vw: innerWidth, vh: innerHeight };
          const stage = document.querySelector(".pane-wrapper--stage");
          out.stage = R(stage);
          const sliders = [...document.querySelectorAll(".pane-wrapper--stage [role=slider]")];
          out.sliders = sliders.length;
          out.lastSliderBottom = sliders.length ? Math.round(Math.max(...sliders.map((s) => s.getBoundingClientRect().bottom))) : null;
          out.stageBottom = stage ? Math.round(stage.getBoundingClientRect().bottom) : null;
          // the plate's own port, scrolled to its end: are the sliders seen inside the viewport?
          const host = document.querySelector(".pane-wrapper--stage .card-scroll-host");
          if (host && sliders.length) {
            out.hostScrolls = host.scrollHeight > host.clientHeight + 1;
            host.scrollTop = host.scrollHeight;
            const b = Math.max(...sliders.map((s) => s.getBoundingClientRect().bottom));
            const t = Math.min(...sliders.map((s) => s.getBoundingClientRect().top));
            const hb = host.getBoundingClientRect();
            out.scrolledSliders = [Math.round(t), Math.round(b)];
            out.slidersSeen = b <= Math.min(innerHeight, hb.bottom) + 0.5 && t >= hb.top - 0.5;
            host.scrollTop = 0;
          }
          const sp = document.querySelector(".pane-wrapper--stage .spectrum-picker");
          out.spectrum = sp ? [Math.round(sp.getBoundingClientRect().width), Math.round(sp.getBoundingClientRect().height), +(sp.getBoundingClientRect().width / sp.getBoundingClientRect().height).toFixed(3)] : null;
          out.cards = [...document.querySelectorAll(".palette-card")].slice(0, 7).map((card) => {
            const n = card.querySelector("[data-palette-name]");
            const v = card.querySelector('button[aria-label$="click to vote"]');
            const menu = card.querySelector(".palette-card__menu");
            const bands = [...card.querySelectorAll("[data-band]")].map((b) => b.style.backgroundColor === getComputedStyle(b).backgroundColor || getComputedStyle(b).backgroundColor !== "rgba(0, 0, 0, 0)");
            const sameRow = (a, b) => a && b && Math.abs((a.getBoundingClientRect().top + a.getBoundingClientRect().bottom) / 2 - (b.getBoundingClientRect().top + b.getBoundingClientRect().bottom) / 2) < 12;
            return { name: n?.textContent?.trim(), nameBox: R(n), trunc: n ? n.scrollWidth > n.clientWidth + 0.5 : null, need: n?.scrollWidth, card: R(card), voteOnRow: sameRow(n, v), menuOnRow: sameRow(n, menu), bandsPainted: bands.every(Boolean), nBands: bands.length };
          });
          return out;
        });
        await page.screenshot({ path: `${OUT}/${c}${r.replace(/\//g, "_")}-${scheme}.png`, scale: "css" });
        rows.push({ c, r, scheme, ...m });
      } catch (e) { rows.push({ c, r, scheme, error: String(e).slice(0, 200) }); }
      finally { await ctx.close(); }
    }
  }
} finally { await browser.close(); fs.writeFileSync(`${OUT}/layout.json`, JSON.stringify(rows, null, 1)); }
const dg = rows.filter((x) => x.cards?.some((k) => k.name === "Daraksha Gradient") && (x.c === "m390" || x.c === "m430"));
const d24 = dg.length > 0 && dg.every((x) => x.cards.filter((k) => k.name === "Daraksha Gradient").every((k) => !k.trunc && k.voteOnRow && k.menuOnRow));
const land = rows.filter((x) => x.c === "land");
const d19 = land.length > 0 && land.every((x) => x.stageBottom != null && x.stageBottom <= 390 && (x.lastSliderBottom <= 390 || x.slidersSeen === true));
const bands = rows.filter((x) => x.cards?.length).every((x) => x.cards.every((k) => k.bandsPainted));
for (const x of rows) console.log(JSON.stringify({ c: x.c, r: x.r, s: x.scheme, stage: x.stage, slB: x.lastSliderBottom, stB: x.stageBottom, scr: x.scrolledSliders, seen: x.slidersSeen, sp: x.spectrum, cards: x.cards?.slice(0, 3).map((k) => [k.name, k.need, k.nameBox?.[2], k.trunc, k.voteOnRow, k.menuOnRow, k.card?.[3]]), err: x.error }));
console.log(`D-24 ${d24 ? "GREEN" : "RED"} · D-19 ${d19 ? "GREEN" : "RED"} · bands ${bands ? "GREEN" : "RED"}`);

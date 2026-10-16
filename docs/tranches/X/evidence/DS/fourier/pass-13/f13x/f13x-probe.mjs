// X-DS fourier pass 13 cure (F13X): AFTER frames + computed reads for DS-F13X-T1 (the selected tile ring). Headless real Chrome (§0ei).
// usage: BASE=http://localhost:3132 node f13x-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3132";
const out = {};

// The tile edges, the card's own edge, and the contrast of each candidate edge ink over --card.
const read = (p) => p.evaluate(() => {
  const card = document.querySelector(".levels-card");
  const cells = [...card.querySelectorAll(".grid-cell")];
  const edge = (e) => { const cs = getComputedStyle(e); return { w: cs.borderTopWidth, c: cs.borderTopColor, ring: cs.boxShadow }; };
  const resting = cells.find((t) => !t.matches(".active"));
  const active = cells.find((t) => t.matches(".active"));
  // paint an expression over --card on a canvas and grade it
  const probe = document.createElement("div"); card.appendChild(probe);
  const resolve = (expr) => { probe.style.color = expr; return getComputedStyle(probe).color; };
  const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d", { willReadFrequently: true });
  const px = (under, over) => { g.clearRect(0, 0, 1, 1); g.fillStyle = under; g.fillRect(0, 0, 1, 1); if (over) { g.fillStyle = over; g.fillRect(0, 0, 1, 1); } return [...g.getImageData(0, 0, 1, 1).data].slice(0, 3); };
  const lum = ([r, gg, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(3); };
  const cardC = resolve("var(--card)"); const base = px(cardC);
  const grade = (expr) => ratio(base, px(cardC, resolve(expr)));
  const res = {
    resting: resting && edge(resting), active: active && edge(active), card: edge(card),
    ringOnCard: {
      "accent-red solid (the cure)": grade("var(--accent-red)"),
      "accent-red 15% (before)": grade("color-mix(in srgb, var(--accent-red) 15%, transparent)"),
    },
  };
  // DS-F3C-G4 light twin: the Select trigger's fill against the numeric field beside it, in one card.
  const trig = document.querySelector('[data-slot="select-trigger"], button[role="combobox"]');
  const host = trig && (trig.closest(".card, [data-slot=card]") ?? trig.parentElement);
  const field = host && host.querySelector('input[inputmode], input[type="number"], [data-slot="number-field"] input, input');
  if (trig && field) {
    const tb = getComputedStyle(trig).backgroundColor, fb = getComputedStyle(field).backgroundColor;
    res.selectVsField = { trigger: tb, field: fb, triggerOnCard: grade(tb), fieldOnCard: grade(fb) };
  }
  probe.remove(); return res;
});

const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light", "dark"]) {
    const ctxOf = (w) => b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    const init = (ctx) => ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    for (const w of [1440, 1024, 390]) {
      const k = `morph-${theme}-${w}`; const ctx = await ctxOf(w); await init(ctx); const p = await ctx.newPage();
      try {
        await p.mouse.move(0, 0).catch(() => {});
        await p.goto(BASE + "/morph", { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(3000);
        await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
        out[k] = await read(p);
        await p.screenshot({ path: `${OUT}/${k}-levels.png` });
        await p.locator(".levels-card").screenshot({ path: `${OUT}/${k}-levels-card.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
      finally { await ctx.close(); }
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f13x-probe.json`, JSON.stringify(out, null, 1)); }

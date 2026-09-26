// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.matrix · UIA-KF-063 legibility: the cell-name ink, BEFORE formula (ME-13, toward --background)
// vs AFTER formula (toward --foreground), both resolved on the served page against the cell's painted ground, per axis, per theme.
// Usage: BASE=http://localhost:5196 node contrast.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5196";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch();
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(`${BASE}/#/cube`); await p.waitForSelector(".cube-pose"); await sleep(3000);
  await p.locator('[aria-label="Select animation"]:visible').first().click(); await sleep(700);
  await p.getByRole("option", { name: /^Matrix/ }).first().click(); await sleep(1200);
  await p.evaluate(() => [...document.querySelectorAll('[data-dock-surface-item][aria-label="Matrix Controls"]')].find((e) => e.getBoundingClientRect().width > 0)?.click()); await sleep(1800);
  // the painted GROUND under each first-row label: a screenshot pixel from the label box's top-left corner (outside the centred glyphs)
  const boxes = await p.evaluate(() => { const grid = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0); return ["x", "y", "z", "w"].map((ax) => { const l = [...grid.querySelectorAll(`.matrix-axis-label.${ax}`)][0]; const r = l.getBoundingClientRect(); return { ax, x: Math.floor(r.left) + 1, y: Math.floor(r.top) + 1 }; }); });
  const grounds = {};
  for (const bx of boxes) { const png = await p.screenshot({ clip: { x: bx.x, y: bx.y, width: 2, height: 2 } }); grounds[bx.ax] = png.toString("base64"); }
  const r = await p.evaluate(async (grounds) => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 2; const g = cv.getContext("2d", { willReadFrequently: true });
    const px = async (b64) => { const im = new Image(); im.src = "data:image/png;base64," + b64; await im.decode(); g.clearRect(0, 0, 2, 2); g.drawImage(im, 0, 0); const d = g.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
    const rgb = (c) => { g.clearRect(0, 0, 2, 2); g.fillStyle = "#000"; g.fillStyle = c; g.fillRect(0, 0, 1, 1); const d = g.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
    const lum = ([r, gg, bb]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(bb); };
    const ratio = (a, c) => { const [x, y] = [lum(a), lum(c)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
    const grid = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0);
    const probe = document.createElement("span"); grid.appendChild(probe); const out = {};
    for (const ax of ["x", "y", "z", "w"]) {
      const bg = await px(grounds[ax]);
      probe.style.color = `color-mix(in oklab, var(--axis-${ax}) 55%, var(--background))`; const before = getComputedStyle(probe).color;
      probe.style.color = `color-mix(in oklab, var(--axis-${ax}) 55%, var(--foreground))`; const after = getComputedStyle(probe).color;
      const painted = getComputedStyle(grid.querySelector(`.matrix-axis-label.${ax}`)).color;
      out[ax] = { ground: bg.join(","), before: ratio(rgb(before), bg), after: ratio(rgb(after), bg), painted: ratio(rgb(painted), bg) };
    }
    probe.remove(); return { out };
  }, grounds);
  console.log(theme, JSON.stringify(r.out));
  await ctx.close();
}
await b.close();

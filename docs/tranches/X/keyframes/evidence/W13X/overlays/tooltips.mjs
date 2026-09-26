// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.overlays · critic gap "tooltips" (KF-W13V record :322), captured + judged (READ-ONLY)
// Per route: visible native [title] tooltips (the unstyled OS tooltip), and the glass Tooltip on hover of each dock item:
// does it appear, is it the glass surface (role=tooltip), is it inside the viewport, does it clear on leave.
// Usage: BASE=http://localhost:5246 RUN=r1 node tooltips.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5246"; const FR = `${OUT}frames/tooltips-${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const lines = []; const L = (s) => { lines.push(s); console.log(s); };
const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, reducedMotion: "reduce" }); const p = await ctx.newPage();
  for (const route of ["", "cube", "amiga", "square", "easing", "spring", "sequence"]) {
    await p.goto(`${BASE}/#/${route}`); await sleep(2600);
    const nat = await p.evaluate(() => [...document.querySelectorAll("[title]")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && e.tagName !== "svg" && !e.closest("svg"); })
      .map((e) => `${e.tagName.toLowerCase()}${e.getAttribute("aria-label") ? `[${e.getAttribute("aria-label")}]` : ""}="${e.getAttribute("title")}"`));
    L(`${theme} /${route} native-title ${nat.length} ${JSON.stringify(nat.slice(0, 8))}`);
    const dk = p.locator("[data-dock-tether=top] .glass-dock").first();
    for (let k = 0; k < 4 && !(await dk.evaluate((e) => e.classList.contains("expanded")).catch(() => true)); k++) { await dk.hover({ force: true }).catch(() => {}); await sleep(500); }
    const items = p.locator("[data-dock-tether=top] [data-dock-surface-item], [data-dock-tether=top] button[aria-label]");
    const n = Math.min(await items.count(), 6); let ok = 0, miss = [], out = [], stuck = 0;
    for (let i = 0; i < n; i++) {
      const it = items.nth(i); if (!(await it.isVisible().catch(() => false))) continue; const name = await it.getAttribute("aria-label");
      await it.hover({ force: true }).catch(() => {}); await sleep(900);
      const t = await p.evaluate(() => { const e = [...document.querySelectorAll("[role=tooltip]")].find((x) => x.getBoundingClientRect().width > 0); if (!e) return null; const r = e.getBoundingClientRect(); const c = e.closest("[data-reka-popper-content-wrapper]") || e;
        return { text: e.textContent.trim(), in: r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight, bg: getComputedStyle(c.firstElementChild || c).backgroundColor, bf: getComputedStyle(c.firstElementChild || c).backdropFilter }; });
      if (i === 0 && route === "cube") await p.screenshot({ path: `${FR}tooltip-${theme}-cube-${(name || "item").replace(/\W+/g, "_")}.png` });
      if (!t) miss.push(name); else { ok++; if (!t.in) out.push(name); }
      await p.mouse.move(720, 60); await sleep(700);
      if (await p.evaluate(() => [...document.querySelectorAll("[role=tooltip]")].some((x) => x.getBoundingClientRect().width > 0))) stuck++;
    }
    // the bottom (transport) band: the glass Tooltip's in-tree home
    const bot = p.locator("[data-dock-tether=bottom] button[aria-label]"); const nb = Math.min(await bot.count(), 4); let bok = 0, bmiss = [];
    for (let i = 0; i < nb; i++) { const it = bot.nth(i); if (!(await it.isVisible().catch(() => false))) continue; const name = await it.getAttribute("aria-label");
      await it.hover({ force: true }).catch(() => {}); await sleep(1000);
      const t = await p.evaluate(() => { const e = [...document.querySelectorAll("[role=tooltip]")].find((x) => x.getBoundingClientRect().width > 0); if (!e) return null; const r = e.getBoundingClientRect(); return { text: e.textContent.trim(), in: r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight }; });
      if (t && !bok && route === "cube") await p.screenshot({ path: `${FR}tooltip-${theme}-cube-bottom-${(name || "item").replace(/\W+/g, "_")}.png` });
      if (t) bok++; else bmiss.push(name); await p.mouse.move(720, 60); await sleep(600); }
    L(`${theme} /${route} bottom-band glass-tooltip ${bok}/${nb} missing ${JSON.stringify(bmiss)}`);
    L(`${theme} /${route} glass-tooltip on-hover ${ok}/${n} missing ${JSON.stringify(miss)} out-of-viewport ${JSON.stringify(out)} stuck-after-leave ${stuck}`);
  }
  await ctx.close();
}
await b.close(); fs.writeFileSync(`${OUT}tooltips-${RUN}.txt`, lines.join("\n") + "\n");

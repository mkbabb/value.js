// SERVED MODEL: claude-opus-5-5
// KF.W13V.y — G-W13V-y3 + y5 on the served page, per scene × vp × theme, stage and facet pane.
// y3: elements whose computed radius is a stadium (>= h/2-0.5 or >= 999px) AND whose text lays out on >1 line.
// y5: presets = tiles on --radius-field with 0 inner sliders/rails; figure title + legend each one line;
//     stage: ONE violet primary readout; the verb line holds no code token.
// Usage: node shape.mjs <baseUrl> [vps] [themes]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", vps = "1440x900,390x844", th = "light,dark"] = process.argv.slice(2);
const SCENES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const b = await chromium.launch({ headless: false });
let fails = 0;
for (const theme of th.split(",")) for (const vp of vps.split(",")) for (const scene of SCENES) {
  const [w, h] = vp.split("x").map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
  const p = await ctx.newPage();
  await p.goto(base.replace(/#.*$/, "") + `#/${scene}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2300);
  const read = () => p.evaluate(() => {
    const lines = (el) => {
      // a LINE = a cluster of text rects whose vertical extents overlap (same row);
      // rows that do not overlap are separate lines.
      const rs = [];
      const walk = (n) => { for (const c of n.childNodes) {
        if (c.nodeType === 3 && c.textContent.trim()) { const r = document.createRange(); r.selectNodeContents(c); for (const q of r.getClientRects()) if (q.width > 1 && q.height > 1) rs.push([q.top, q.bottom]); }
        else if (c.nodeType === 1 && getComputedStyle(c).display !== "none" && !c.classList.contains("sr-only")) { const cr = c.getBoundingClientRect(); if (cr.width > 1 && cr.height > 1) walk(c); } } }; // visually-hidden boxes (1px clip) are not laid-out text
      walk(el);
      rs.sort((a, b) => a[0] - b[0]);
      let n = 0, end = -Infinity;
      for (const [t, bt] of rs) { const mid = t + (bt - t) / 2; if (mid > end) { n++; end = bt; } else end = Math.max(end, bt); }
      return n;
    };
    const stadiumMulti = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight) continue;
      const cs = getComputedStyle(el); if (cs.visibility === "hidden") continue;
      const rad = parseFloat(cs.borderTopLeftRadius) || 0;
      const stadium = rad >= 999 || (rad > 0 && rad >= Math.min(r.height, r.width) / 2 - 0.5);
      if (!stadium) continue;
      const bg = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px" || cs.outlineStyle !== "none" || cs.boxShadow !== "none";
      if (!bg) continue;
      const n = lines(el); if (n > 1) stadiumMulti.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")}[${n}L ${Math.round(r.height)}px]`);
    }
    const presets = [...document.querySelectorAll(".preset-cell, .specimen-tile")].filter((e) => e.getBoundingClientRect().width > 0);
    const presetRad = [...new Set(presets.map((e) => getComputedStyle(e).borderTopLeftRadius))];
    const innerSliders = presets.reduce((a, e) => a + e.querySelectorAll('[role=slider], .progress-rail:not(.tile-rail), .preset-track').length, 0);
    const figTitles = [...document.querySelectorAll("[data-figure-title]")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => lines(e));
    const figLegends = [...document.querySelectorAll("[data-figure-legend]")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => lines(e));
    const host = document.querySelector(".scene-host");
    const violet = host ? [...host.querySelectorAll(".readout-accent, .spring-readout-primary, [data-readout=primary]")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && getComputedStyle(e).display !== "none"; }).length : -1;
    const primary = host ? host.querySelectorAll("[data-readout=primary]").length : -1;
    const codeInHint = host ? host.querySelectorAll(".stage-legend .code-token, #spring-rail-hint .code-token, p .code-token").length : -1;
    const fieldPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--radius-field")) * (/rem/.test(getComputedStyle(document.documentElement).getPropertyValue("--radius-field")) ? 16 : 1);
    return { stadiumMulti, presets: presets.length, presetRad, innerSliders, figTitles, figLegends, violet, primary, codeInHint };
  });
  const stage = await read();
  let pane = null;
  const dock = p.locator("[data-dock-tether=top]");
  const facet = dock.locator('[data-dock-surface-item][data-surface="easing"], [data-dock-surface-item][data-surface="spring"]');
  if (await facet.count()) {
    await dock.hover({ force: true }).catch(() => {}); await p.waitForTimeout(1300);
    if ((await facet.first().getAttribute("aria-pressed")) !== "true") await facet.first().click().catch(() => {});
    await p.mouse.move(w / 2, h - 5); await p.waitForTimeout(1500);
    pane = await read();
  }
  const bad = [...stage.stadiumMulti, ...(pane?.stadiumMulti ?? [])];
  const all = pane ?? stage;
  const presetOk = all.presets === 0 || (all.innerSliders === 0 && all.presetRad.every((r) => r === "16px"));
  const figOk = [...all.figTitles, ...all.figLegends].every((n) => n === 1);
  const readoutOk = scene === "cube" || scene === "amiga" || scene === "square" || (stage.primary === 1 && stage.codeInHint === 0);
  const ok = bad.length === 0 && presetOk && figOk && readoutOk;
  if (!ok) fails++;
  console.log(`${theme} ${vp} ${scene.padEnd(8)} y3 stadium-multi=${bad.length}${bad.length ? " " + bad.slice(0, 4).join(",") : ""} | presets=${all.presets} rad=${all.presetRad.join("/")} inner=${all.innerSliders} | fig title=${JSON.stringify(all.figTitles)} legend=${JSON.stringify(all.figLegends)} | primary=${stage.primary} violet=${stage.violet} code=${stage.codeInHint} -> ${ok ? "PASS" : "FAIL"}`);
  await ctx.close();
}
await b.close();
console.log(`fails=${fails}`);
process.exit(fails ? 1 : 0);

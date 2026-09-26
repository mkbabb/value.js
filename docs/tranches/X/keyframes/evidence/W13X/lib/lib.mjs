// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.lib · served predicates (READ-ONLY falsifier)
// Rows: A2-KE-L3-11 (one label track across the main form and the advanced sub-pane)
//       A2-KE-L1-22 (.kf-focus-ring against glass .focus-ring, ordinary + forced-colors)
// Usage: BASE=http://localhost:5311 RUN=before-r1 node lib.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`;
fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5311";
const CFGS = (process.env.CFGS || "cube-1440x900-light,cube-1440x900-dark,cube-390x844-light,cube-390x844-dark,amiga-1440x900-light").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
const b = await chromium.launch({ headless: false });

const HELPERS = () => {
  const card = () => [...document.querySelectorAll("[data-channel-options], .panel-row")].map((e) => e.closest(".card") || e.parentElement.closest("div")).find((c) => c && c.getBoundingClientRect().height > 0);
  const entry = (c) => [...c.querySelectorAll("button[aria-controls]")].find((x) => document.getElementById(x.getAttribute("aria-controls"))?.classList.contains("panel-row"));
  const track = (g) => (g ? parseFloat(getComputedStyle(g).gridTemplateColumns.replace(/\[[^\]]*\]/g, " ").trim().split(/\s+/)[0]) : null);
  const labelLeftEdges = (g) => [...g.querySelectorAll(":scope > .labeled-field")].filter((f) => f.getBoundingClientRect().height > 0).map((f) => { const kids = [...f.children].filter((k) => k.getBoundingClientRect().width > 0); return kids[1] ? Math.round(kids[1].getBoundingClientRect().left) : null; });
  window.__lib = { card, entry, track, labelLeftEdges };
};

for (const cfg of CFGS) {
  const [scene, vp, theme] = cfg.split("-");
  const [w, h] = vp.split("x").map(Number);
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme, reducedMotion: "reduce" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const row = { cfg };
  try {
    await p.goto(`${BASE}/#/${scene}`);
    await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await p.evaluate((t) => localStorage.setItem("vueuse-color-scheme", t), theme);
    await p.reload();
    await sleep(3800);
    row.glass = await p.evaluate(async () => { try { const r = await fetch("/node_modules/@mkbabb/glass-ui/package.json"); return (await r.json()).version; } catch { return null; } });
    await p.evaluate(HELPERS);
    if (!(await p.evaluate(() => !!window.__lib.card()))) {
      const it = p.locator('[data-dock-surface-item][aria-label="Controls"]').first();
      if (await it.count()) { await it.click({ force: true }).catch(() => {}); await sleep(1400); }
    }
    if (!(await p.evaluate(() => !!window.__lib.card()))) throw new Error("no controls card");
    // ── A2-KE-L3-11: the main form's label track, then the advanced sub-pane's ──
    Object.assign(row, await p.evaluate(() => { const c = window.__lib.card(); const g = c.querySelector(".panel-row .labeled-field-grid"); return { mainTrack: window.__lib.track(g), mainValueLeft: window.__lib.labelLeftEdges(g)[0] ?? null }; }));
    await p.evaluate(() => window.__lib.card().scrollIntoView({ block: "start" }));
    await sleep(200);
    await p.screenshot({ path: `${FR}${cfg}-main.png` });
    await p.evaluate(() => window.__lib.entry(window.__lib.card()).click());
    await sleep(900);
    Object.assign(row, await p.evaluate(() => { const c = window.__lib.card(); const pane = document.getElementById(window.__lib.entry(c).getAttribute("aria-controls")); const g = pane.querySelector(".labeled-field-grid"); return { advTrack: window.__lib.track(g), advValueLeft: window.__lib.labelLeftEdges(g)[0] ?? null }; }));
    await p.screenshot({ path: `${FR}${cfg}-advanced.png` });
    row.L3_11_delta = row.mainTrack != null && row.advTrack != null ? Math.round((row.mainTrack - row.advTrack) * 10) / 10 : null;
    row.L3_11 = row.L3_11_delta !== null && Math.abs(row.L3_11_delta) < 0.5 && row.mainValueLeft === row.advValueLeft ? "GREEN" : "RED";
    // ── A2-KE-L1-22: a demo .kf-focus-ring host vs a glass .focus-ring probe, keyboard-focused ──
    const ring = async () => p.evaluate(() => {
      const host = [...document.querySelectorAll(".kf-focus-ring")].find((e) => e.getBoundingClientRect().width > 0);
      const probe = document.createElement("button"); probe.className = "focus-ring"; probe.textContent = "probe"; document.body.append(probe);
      const read = (el) => { el.focus({ focusVisible: true }); const cs = getComputedStyle(el); return { visible: el.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, offset: cs.outlineOffset }; };
      const out = { kf: host ? { cls: host.className.split(" ").slice(0, 2).join(" "), ...read(host) } : null, glass: read(probe) };
      probe.remove();
      return out;
    });
    row.L1_22 = await ring();
    await p.emulateMedia({ forcedColors: "active" });
    row.L1_22_forced = await ring();
    await p.emulateMedia({ forcedColors: "none" });
    const k = row.L1_22.kf, g = row.L1_22.glass;
    row.L1_22_equivalent = !!k && k.boxShadow === g.boxShadow && k.outline === g.outline;
  } catch (e) {
    row.error = String(e).slice(0, 200);
  }
  rows.push(row);
  console.log(JSON.stringify(row));
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(rows, null, 1));

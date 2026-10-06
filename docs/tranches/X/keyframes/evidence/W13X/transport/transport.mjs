// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.transport · the transport dock + the ribbon, served (READ-ONLY falsifier)
// Rows: KFA-54 · 166 · 167 · UIA-KF-018 · 051 · 151 · 152 · 153 · 154 · 155 · 225 · 256 · 257 (+ re-homed 108 dock half · 261 · 283)
// Usage: BASE=http://localhost:5261 RUN=before-r1 node transport.mjs   (one GREEN/RED line per row x config)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5261"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = (id, bad, msg) => console.log(`${bad ? "RED  " : "GREEN"} ${id} ${msg}`);
const b = await chromium.launch({ channel: "chrome", headless: true });
async function page(route, w, h, theme, prm = "reduce") {
  const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: prm, isMobile: touch, hasTouch: touch });
  const p = await ctx.newPage(); await p.goto(`${BASE}/#/${route}`); await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await sleep(3500);
  return { ctx, p };
}
const DOCK = "[data-dock-tether=bottom] .glass-dock";
const expanded = (p) => p.locator(DOCK).first().evaluate((e) => e.classList.contains("expanded"));
async function expand(p) { const d = p.locator(DOCK).first(); for (let k = 0; k < 5 && !(await expanded(p)); k++) { await d.hover({ force: true }).catch(() => {}); await sleep(500); } }
const CFGS = { d: [1440, 900, "light"], m: [390, 844, "dark"] };
for (const [w, h, theme] of (process.env.CFG || "dm").split("").map((k) => CFGS[k])) {
  const cfg = `${w}x${h}-${theme}`;
  // KFA-166 · boot posture: no interaction for 10 s
  let { ctx, p } = await page("cube", w, h, theme);
  await p.mouse.move(2, 2); await sleep(10000);
  R("KFA-166", await expanded(p), `${cfg} dock expanded after 10 s idle: ${await expanded(p)}`);
  await p.screenshot({ path: `${FR}boot-idle-${cfg}.png` });
  // UIA-KF-018 · Tab walk into the collapsed transport
  if (w >= 1024) {
  // at phone width the controls Sheet opens modal at boot (a focus trap, .mobile's) — close it first so the walk reaches the page
    if (w < 1024) { const c = p.locator('[role=dialog] button[aria-label="Close"], [role=dialog] button:has-text("Close")').first(); if (await c.count()) { await c.click({ force: true }).catch(() => {}); await sleep(900); } }
    const walk = [];
    for (let k = 0; k < (w < 1024 ? 90 : 40); k++) { await p.keyboard.press("Tab"); await sleep(60);
      const a = await p.evaluate(() => { const e = document.activeElement; return { tag: e?.tagName, name: e?.getAttribute("aria-label") || e?.textContent?.trim().slice(0, 24), inDock: !!e?.closest("[data-dock-tether=bottom]") }; });
      walk.push(a); }
    await sleep(250);
    const tabNames = walk.filter((a) => a.inDock).map((a) => a.name);
    const lostToBody = walk.filter((a) => a.tag === "BODY").length;
    R("UIA-KF-018", !tabNames.includes("Reset animation") || (!tabNames.includes("Select animation") && w >= 1024), `${cfg} dock tab stops ${JSON.stringify([...new Set(tabNames)])} · BODY hits ${lostToBody}`);
  } else console.log(`NOTE  UIA-KF-018 ${cfg} not read: the controls Sheet opens modal at boot and traps Tab (Close does not release it) — .mobile / SHEET-POSITION, not the transport`);
  await ctx.close();
  // select rows
  ({ ctx, p } = await page("cube", w, h, theme, "no-preference"));
  await expand(p);
  const trig = p.locator(`[data-dock-tether=bottom] [aria-label="Select animation"]`).first();
  const hasTrig = await trig.count();
  if (hasTrig) {
    const tt = await trig.evaluate((t) => { const cs = getComputedStyle(t); const r = t.getBoundingClientRect(); const row = t.closest(".transport-row")?.getBoundingClientRect();
      return { fs: parseFloat(cs.fontSize), h: r.height, rowH: row?.height, wrap: t.parentElement?.className, cls: t.className }; });
    R("UIA-KF-256", /dock-label/.test(tt.cls), `${cfg} trigger font ${tt.fs}px h ${tt.h.toFixed(1)} row ${tt.rowH?.toFixed(1)} dock-label ${/dock-label/.test(tt.cls)}`);
    await trig.hover(); await sleep(1200);
    const tips = await p.evaluate(() => [...document.querySelectorAll("[role=tooltip]")].map((t) => t.textContent.trim()).filter((t) => /select animation/i.test(t)).length);
    R("UIA-KF-257", tips > 0 || /relative flex items-center gap-1\.5/.test(tt.wrap), `${cfg} 'Select animation' tooltips ${tips} · wrapper '${tt.wrap}'`);
    // play, then open the select
    await p.locator(`[data-dock-tether=bottom] [aria-label="Play animation"]`).first().click({ force: true }).catch(() => {}); await sleep(800);
    await trig.click(); await sleep(900);
    const lb = await p.evaluate((D) => { const l = document.querySelector("[role=listbox]"); const d = document.querySelector(D); if (!l) return null; const lr = l.getBoundingClientRect(), dr = d.getBoundingClientRect();
      const rows = [...l.querySelectorAll("[role=option]")].map((o) => ({ dot: o.querySelector(".progress-dot") ? getComputedStyle(o.querySelector(".progress-dot")).getPropertyValue("--dot-p") : null, status: o.querySelector("[data-state],[class*=status]")?.getAttribute("data-state") || null, bold: !!o.querySelector(".font-bold"), ind: !!o.querySelector("[data-reka-select-item-indicator], .select-item-indicator, svg") }));
      return { x: lr.x, bottom: lr.bottom, dockTop: dr.top, rows }; }, DOCK);
    await p.screenshot({ path: `${FR}select-open-${cfg}.png` });
    if (!lb) R("SELECT-OPEN", true, `${cfg} listbox did not open`);
    else {
      R("UIA-KF-152", lb.bottom > lb.dockTop - 2, `${cfg} listbox bottom ${lb.bottom.toFixed(1)} vs dock top ${lb.dockTop.toFixed(1)}`);
      const dots = lb.rows.map((r) => r.dot).filter((x) => x !== null);
      R("KFA-167", dots.length > 1 && new Set(dots.map((d) => d.trim())).size === 1, `${cfg} per-row --dot-p ${JSON.stringify(dots)}`);
      R("UIA-KF-151", lb.rows.some((r) => r.dot !== null || r.status) || lb.rows.some((r) => r.bold), `${cfg} rows ${JSON.stringify(lb.rows)}`);
      // KFA-54 · an open select holds the dock open
      await p.mouse.move(w / 2, 40); const x0 = lb.x; await sleep(7000);
      const later = await p.evaluate((D) => { const l = document.querySelector("[role=listbox]"); return { open: !!l, x: l?.getBoundingClientRect().x, exp: document.querySelector(D).classList.contains("expanded") }; }, DOCK);
      await p.screenshot({ path: `${FR}select-7s-${cfg}.png` });
      R("KFA-54", later.open && (!later.exp || Math.abs(later.x - x0) > 2), `${cfg} after 7 s: open ${later.open} dock expanded ${later.exp} listbox x ${x0?.toFixed(1)} → ${later.x?.toFixed(1)}`);
      await p.keyboard.press("Escape");
    }
  } else R("SELECT", true, `${cfg} no Select animation trigger`);
  await ctx.close();
  // KFA-174 · a paused Reverse re-seats the ribbon at once (cube, the channel ribbon)
  if (w >= 1024) {
    ({ ctx, p } = await page("cube", w, h, theme, "no-preference"));
    const playLbl = () => p.locator("[data-dock-tether=bottom] button[aria-label$=' animation']").first().getAttribute("aria-label");
    if ((await playLbl()) === "Pause animation") { await p.locator("[data-dock-tether=bottom] button[aria-label$=' animation']").first().click({ force: true }); await sleep(700); }
    const thumb = p.locator("[role=slider][aria-label*='Scrub']").first();
    if (await thumb.count()) {
      await thumb.focus(); await p.keyboard.press("End"); await sleep(500); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await sleep(600);
      const v0 = Number(await thumb.getAttribute("aria-valuenow")); const max = Number(await thumb.getAttribute("aria-valuemax"));
      await p.locator("button.btn-playback").filter({ hasText: "Reverse" }).first().click(); await sleep(400);
      const v1 = Number(await thumb.getAttribute("aria-valuenow"));
      await p.screenshot({ path: `${FR}reverse-paused-${cfg}.png` });
      R("KFA-174", Math.abs(v1 - v0) < 1, `${cfg} cube paused: thumb ${v0.toFixed(0)}/${max.toFixed(0)} -> ${v1.toFixed(0)} 400 ms after Reverse`);
    } else console.log(`NOTE  KFA-174 ${cfg} no scrub thumb on /cube`);
    await ctx.close();
    // KFA-104 · selecting a channel never starts playback (spring: Entry)
    ({ ctx, p } = await page("spring", w, h, theme, "no-preference"));
    await expand(p);
    const trig2 = p.locator(`[data-dock-tether=bottom] [aria-label="Select animation"]`).first();
    if (await trig2.count()) {
      const l0 = await playLbl(); await trig2.click(); await sleep(700);
      const opts = p.locator("[role=listbox] [role=option]"); const n = await opts.count();
      const entry = opts.filter({ hasText: /entry/i }); const pick = (await entry.count()) ? entry.first() : opts.nth(n > 1 ? 1 : 0);
      const pickName = (await pick.textContent())?.trim(); await pick.click(); await sleep(900);
      const l1 = await playLbl(); await p.screenshot({ path: `${FR}spring-select-${cfg}.png` });
      R("KFA-104", l0 === "Play animation" && l1 === "Pause animation", `${cfg} spring: select '${pickName}' — dock ${l0} -> ${l1}`);
    } else console.log(`NOTE  KFA-104 ${cfg} spring has no channel Select`);
    await ctx.close();
  }
  // UIA-KF-154 · single-channel: collapsed vs expanded faces on /square
  ({ ctx, p } = await page("square", w, h, theme));
  await p.mouse.move(2, 2); await sleep(1500);
  const faces = async () => p.evaluate((D) => { const d = document.querySelector(D); return { exp: d.classList.contains("expanded"), text: [...d.querySelectorAll("*")].filter((e) => e.checkVisibility?.() && e.children.length === 0).map((e) => e.textContent.trim()).filter(Boolean).join("|") }; }, DOCK);
  const f1 = await faces(); await expand(p); const f2 = await faces();
  R("UIA-KF-154", /Transform/.test(f1.text) !== /Transform/.test(f2.text), `${cfg} collapsed(${f1.exp}) '${f1.text}' vs expanded(${f2.exp}) '${f2.text}'`);
  // UIA-KF-225 · dock top rim vs stage card bottom rim (square here; easing below)
  const ov = await p.evaluate((D) => { const d = document.querySelector(D).getBoundingClientRect(); const s = document.querySelector(".square-stage, .easing-target")?.getBoundingClientRect(); return { dockTop: d.top, bottom: s?.bottom ?? NaN }; }, DOCK);
  R("UIA-KF-225", !(ov.bottom <= ov.dockTop), `${cfg} square: stage-card bottom ${ov.bottom.toFixed(1)} vs dock top ${ov.dockTop.toFixed(1)}`);
  await ctx.close();
  // UIA-KF-051 / 155 · the controls-pane ribbon's Play twin on /easing
  ({ ctx, p } = await page("easing", w, h, theme));
  const tw = await p.evaluate(() => { const bs = [...document.querySelectorAll("button.btn-playback")]; const play = bs.find((x) => /^(Play|Pause)/.test(x.textContent.trim()));
    if (!play) return { n: bs.length, play: false }; const cs = getComputedStyle(play); return { n: bs.length, play: true, bg: cs.backgroundColor, fg: cs.color }; });
  R("UIA-KF-051", tw.play, `${cfg} easing: ribbon btn-playback ${tw.n}, Play twin ${tw.play}`);
  const ov2 = await p.evaluate((D) => { const d = document.querySelector(D).getBoundingClientRect(); const s = document.querySelector(".easing-target")?.getBoundingClientRect(); return { dockTop: d.top, bottom: s?.bottom ?? NaN }; }, DOCK);
  R("UIA-KF-225", !(ov2.bottom <= ov2.dockTop), `${cfg} easing: stage-card bottom ${ov2.bottom.toFixed(1)} vs dock top ${ov2.dockTop.toFixed(1)}`);
  R("UIA-KF-155", tw.play, `${cfg} easing: ribbon Play ${tw.play ? `bg ${tw.bg} fg ${tw.fg}` : "absent"}`);
  await ctx.close();
}
await b.close();

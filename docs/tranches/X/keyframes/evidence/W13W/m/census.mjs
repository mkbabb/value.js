// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.m (OA-64) — served census of the phone controls + panes.
// Per viewport x theme x scene x surface (every ENABLED top-dock surface item,
// opened by click after expanding the collapsed top dock): the mobile Sheet
// (.controls-drawer-content), the pane body's top-level cards (outermost .card
// under the sheet), and the in-sheet transport row. Reads, in CSS px:
//   dC   = inline centre - viewport centre (law: |dC| <= 1)
//   L, R = the box's left inset and right inset from the viewport edges
//   ovf  = document scrollWidth - clientWidth, and every sheet descendant that
//          scrolls horizontally (scrollWidth > clientWidth + 1, overflow-x not
//          hidden/clip) (law: 0)
//   det  = the Sheet handle's aria-valuenow + the sheet's block size (detents)
//   gutter = calc(var(--space-family) + 1rem) resolved; every sheet card and
//          stage panel has |L - gutter| <= 1 and |R - gutter| <= 1
// Usage: node census.mjs --w 390 --h 844 --theme light [--out f.json] [--frames dir] [--base URL]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://localhost:5173"), W = +arg("w", 390), H = +arg("h", 844), THEME = arg("theme", "light");
const OUT = arg("out", null), FRAMES = arg("frames", null);
if (FRAMES) mkdirSync(FRAMES, { recursive: true });
const SCENES = ["cube", "square", "amiga", "easing", "spring", "sequence"];
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
const page = await ctx.newPage();
const READ = () => {
  const r2 = (v) => Math.round(v * 10) / 10;
  const vw = document.documentElement.clientWidth, cx = vw / 2;
  const box = (e) => { const r = e.getBoundingClientRect(); return { l: r2(r.left), r: r2(r.right), t: Math.round(r.top), b: Math.round(r.bottom), dC: r2((r.left + r.right) / 2 - cx), L: r2(r.left), R: r2(vw - r.right) }; };
  const sheet = document.querySelector(".controls-drawer-content");
  const res = { vw, iw: innerWidth, vv: r2(visualViewport.width), docOvf: document.documentElement.scrollWidth - vw, docSH: document.scrollingElement.scrollHeight - innerHeight, sheet: null, cards: [], transport: null, scrollers: [], det: null };
  // The page gutter as the stylesheet declares it (layout.css --page-gutter,
  // AFTER the cure) — BEFORE the cure the token is absent, so the law's gutter
  // is read as glass's --space-family + 1rem (the Sheet's inset + the pane
  // body's shadow reserve), the same definition.
  const probe = document.createElement("div"); probe.style.cssText = "position:absolute;visibility:hidden;width:calc(var(--space-family) + 1rem)"; document.body.append(probe);
  res.gutter = r2(probe.getBoundingClientRect().width); probe.remove();
  res.gutterToken = getComputedStyle(document.documentElement).getPropertyValue("--page-gutter").trim() || null;
    res.stage = [];
  // A stage PANE is a glass Card or a painted canvas plate; the cube's 3D faces
  // and axis lines are the subject, not a pane.
  for (const e of document.querySelector(".stage-cell")?.querySelectorAll(".card, canvas") ?? []) {
    const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    if (r.width < 150 || r.height < 60 || !e.checkVisibility()) continue;
    const vis = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px" || cs.boxShadow !== "none" || cs.backdropFilter !== "none";
    if (vis && !res.stage.some((o) => o.el.contains(e))) res.stage.push({ el: e, cls: e.className.toString().split(" ").slice(0, 3).join("."), ...box(e) });
  }
  res.stage = res.stage.map(({ el, ...o }) => o);
  const tp = document.querySelector("[data-dock-tether=bottom] .dock-plate"); if (tp) res.transport = box(tp);
  if (!sheet) return res;
  res.sheet = box(sheet);
  const cards = [...sheet.querySelectorAll(".card")].filter((c) => !c.parentElement.closest(".card") && c.getBoundingClientRect().width > 0);
  res.cards = cards.map((c) => ({ cls: c.className.toString().split(" ").slice(0, 2).join("."), ...box(c) }));

  // Horizontal overflow: every visible element (page-wide) whose box, clipped by
  // its clipping ancestors, reaches outside [0, vw]; plus every real horizontal
  // scroller (overflow-x auto/scroll with scrollWidth > clientWidth + 1).
  for (const e of document.querySelectorAll("body *")) {
    if (!(e instanceof HTMLElement) || e.closest(".monaco-aria-container, .sr-only") || !e.checkVisibility({ visibilityProperty: true, opacityProperty: true })) continue;
    const cs = getComputedStyle(e);
    if ((cs.overflowX === "auto" || cs.overflowX === "scroll") && e.scrollWidth > e.clientWidth + 1 && !e.closest(".monaco-editor")) (e.matches(".catalogue-filter, .catalogue-filter *") ? res.designed ??= [] : res.scrollers).push(["scroll", e.className.toString().split(" ")[0] || e.tagName, e.scrollWidth - e.clientWidth]);
    const r = e.getBoundingClientRect(); if (!r.width || !r.height) continue;
    // the spill scan reads the controls and panes (sheet, dock tethers, stage
    // panels); the page itself is docOvf. The cube's 3D axis lines are subject.
    if (!e.closest(".controls-drawer-content, [data-dock-tether], .stage-cell .card")) continue;
    let l = r.left, rr = r.right;
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const ac = getComputedStyle(a); if (ac.overflowX !== "visible") { const ar = a.getBoundingClientRect(); l = Math.max(l, ar.left); rr = Math.min(rr, ar.right); } if (ac.position === "fixed") break; }
    if (rr - l <= 0) continue;
    if (l < -0.5 || rr > vw + 0.5) res.scrollers.push(["spill", e.className.toString().split(" ")[0] || e.tagName, r2(Math.min(0, l)), r2(Math.max(0, rr - vw))]);
  }
  const h = sheet.querySelector('[role="slider"]') ?? document.querySelector('[data-slot="sheet-content"] [role="slider"]');
  res.det = { now: h?.getAttribute("aria-valuenow") ?? null, bs: Math.round(sheet.getBoundingClientRect().height) };
  return res;
};
const out = { viewport: `${W}x${H}`, theme: THEME, states: [] };
for (const s of SCENES) {
  await page.goto(`${BASE}/#/${s}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2200);
  const plate = await page.evaluate(() => { const r = document.querySelector("[data-dock-tether=top] .dock-plate")?.getBoundingClientRect(); return r && [r.left + r.width / 2, r.top + r.height / 2]; });
  const labels = await page.$$eval("[data-dock-tether=top] [data-dock-surface-item]:not([disabled])", (es) => es.map((e) => e.getAttribute("aria-label")));
  out.states.push({ scene: s, surface: "(initial)", ...(await page.evaluate(READ)) });
  for (const lab of labels) {
    const item = page.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${lab}"]`);
    if (!(await item.isVisible()) && plate) { await page.mouse.click(plate[0], plate[1]); await page.waitForTimeout(900); }
    // Re-query after a transient dock re-render; a surface that never returns is
    // recorded RED (missing), never skipped silently.
    let active;
    try { active = await item.getAttribute("data-selected", { timeout: 8000 }); }
    catch { await page.waitForTimeout(1500); if (!(await item.count())) { out.states.push({ scene: s, surface: lab, missing: true, cards: [], stage: [], scrollers: [] }); continue; } active = await item.getAttribute("data-selected"); }
    const sheetOpen = await page.locator(".controls-drawer-content").count();
    if (!(active !== null && sheetOpen)) { await item.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(1400); }
    const st = { scene: s, surface: lab, ...(await page.evaluate(READ)) };
    out.states.push(st);
    if (FRAMES) await page.screenshot({ path: `${FRAMES}/${W}x${H}-${THEME}-${s}-${lab.replace(/\s+/g, "-")}.png` });
  }
}
await browser.close();
// verdicts
const bad = [];
for (const st of out.states) {
  const tag = `${st.scene}/${st.surface}`;
  if (st.missing) { bad.push(`${tag} surface item missing`); continue; }
  if (st.docOvf > 0 || st.iw !== W) bad.push(`${tag} docOvf ${st.docOvf} iw ${st.iw}`);
  for (const sc of st.scrollers) bad.push(`${tag} hscroll ${sc.join(":")}`);
  for (const c of [...(st.transport ? [{ cls: "transport-plate", ...st.transport }] : [])]) if (Math.abs(c.dC) > 1) bad.push(`${tag} ${c.cls} dC ${c.dC} (L ${c.L} R ${c.R})`);
  for (const c of [...st.cards, ...st.stage]) {
    if (Math.abs(c.dC) > 1) bad.push(`${tag} ${c.cls} dC ${c.dC}`);
    if (Math.abs(c.L - st.gutter) > 1 || Math.abs(c.R - st.gutter) > 1) bad.push(`${tag} ${c.cls} edges L ${c.L} R ${c.R} off gutter ${st.gutter}`);
  }
}
out.bad = bad; out.summary = { states: out.states.length, red: bad.length };
if (OUT) writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.summary), "\n" + bad.slice(0, 60).join("\n"));
console.log("gutter:", [...new Set(out.states.map((s) => s.gutter + "/" + s.gutterToken))].join(" "), "edges:", [...new Set(out.states.flatMap((s) => [...s.cards, ...s.stage].map((c) => `${c.L}/${c.R}`)))].join(" "), "sheet:", [...new Set(out.states.filter(s=>s.sheet).map((s) => `${s.sheet.L}/${s.sheet.R}`))].join(" "), "det:", [...new Set(out.states.map((s) => s.det && `${s.det.now}@${s.det.bs}`))].join(" "));

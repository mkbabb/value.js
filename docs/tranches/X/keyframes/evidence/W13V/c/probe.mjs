// SERVED MODEL: claude-opus-5-5
// KF.W13V.c — the Controls-pane control-row idiom + the rail bound (OA-47 / OA-51 / C1-1), read on the served page, headed.
// usage: node probe.mjs <baseUrl> <scene> <WxH> [out.json]
import fs from "node:fs";
import { withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [url = "http://localhost:5173", scene = "cube", vp = "1440x900", out, png, theme = "light"] = process.argv.slice(2);
const [W, H] = vp.split("x").map(Number);
const r = await withBrowser(async (b) => {
  const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme });
  const p = await ctx.newPage();
  await p.goto(`${url}/#/${scene}`, { waitUntil: "load" });
  await p.waitForTimeout(2500);
  // open the shared pane on the Controls surface (the dock item), unless it already shows it.
  // A DOM click (the dock may rest collapsed on a playing scene; the item's own behaviour is .s's gate).
  const clicked = await p.evaluate(() => {
    const it = [...document.querySelectorAll('[data-dock-surface-item][data-surface="controls"]')].find((e) => e.getBoundingClientRect().width > 0);
    if (!it) return "absent";
    const showing = !!document.querySelector(".panel-row--active .labeled-field-grid") && [...document.querySelectorAll(".panel-row--active .labeled-field-grid")].some((g) => g.getBoundingClientRect().height > 0);
    if (it.getAttribute("aria-pressed") === "true" && showing) return "already";
    it.click(); return "clicked";
  });
  await p.waitForTimeout(1500);
  await p.waitForTimeout(800);
  if (png) { const el = p.locator(W >= 1024 ? ".controls-pane-wrapper" : ".panel-row--active .labeled-field-grid").first(); if (await el.count()) await el.screenshot({ path: png }); }
  return await p.evaluate((CLICKED) => {
    const R = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), b: +r.bottom.toFixed(1) }; };
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const opts = [...document.querySelectorAll(".panel-row--active .labeled-field-grid")].filter(vis)[0];
    const card = opts?.closest(".card, [data-slot=card]") ?? null;
    const rows = [];
    if (opts) {
      for (const row of opts.children) {
        if (!vis(row)) continue;
        const label = row.querySelector("label, .glass-label");
        const ctl = row.querySelector("input, button[role=combobox], [role=combobox], [data-slot=select-trigger]");
        if (!label || !ctl) continue;
        const lr = label.getBoundingClientRect(), cr = ctl.getBoundingClientRect();
        rows.push({ label: label.textContent.trim().slice(0, 20), labelMidY: +((lr.top + lr.bottom) / 2).toFixed(1), ctlMidY: +((cr.top + cr.bottom) / 2).toFixed(1), dMid: +Math.abs((lr.top + lr.bottom) / 2 - (cr.top + cr.bottom) / 2).toFixed(1), oneLine: lr.bottom > cr.top && cr.bottom > lr.top, rowH: +row.getBoundingClientRect().height.toFixed(1), ctlW: +cr.width.toFixed(1) });
      }
    }
    // separator directly before the easing group (same parent, previous element sibling)
    const easingGroup = opts ? [...opts.children].find((c) => /easing/.test(c.querySelector("label")?.textContent ?? "")) : null;
    let prev = easingGroup?.previousElementSibling ?? null;
    const sepBeforeEasing = !!prev && (prev.getAttribute("role") === "separator" || prev.getAttribute("data-slot") === "separator" || /separator/.test(prev.className));
    const wrapper = document.querySelector(".controls-pane-wrapper");
    const pane = document.querySelector(".controls-pane");
    const band = document.querySelector(".menubar-safe-pb");
    const sheet = document.querySelector("[data-slot=sheet-content]");
    return { clicked: CLICKED, vw: innerWidth, vh: innerHeight, card: R(card), wrapper: R(wrapper), pane: R(pane), paneScrollH: pane?.scrollHeight ?? null, sheet: R(sheet), menubarBand: R(band), rows, sepBeforeEasing };
  }, clicked);
}, { launch: { headless: false } });
const v = r.value ?? r;
if (out) fs.writeFileSync(out, JSON.stringify(v, null, 1));
console.log(JSON.stringify(v));

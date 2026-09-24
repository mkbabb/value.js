// SERVED MODEL: claude-opus-5-5
// KF.W13V.p — G-W13V-p1 + p2 on the served page: every route (home + 6 scenes) ×
// stage + every ENABLED dock surface pane, per vp × theme.
// CENSUS  = every SELECTABLE element (radio/option/tab/checkbox/aria-pressed/-checked/
//           -selected/data-state on|off/button/link) whose laid-out text spans > 1 line.
// p1 FAIL = a census tile whose computed corner radius > --radius-field (computed px).
// p2 FAIL = ANY painted element whose text spans > 1 line and whose radius is a
//           stadium (rounded-full / 9999px, i.e. >= 999 px, or >= min(h,w)/2 - 0.5).
// Line law = .y's shape.mjs (a line = a cluster of vertically-overlapping text rects;
// visually-hidden 1-px boxes and .sr-only skipped) WIDENED by .p to the brief's
// "by computed height": a painted graphic leaf (svg/canvas/img/video) is a row box
// too, so a tile stacking a sparkline over a one-line name reads 2 rows, while an
// icon beside its label (vertically overlapping) stays one line.  Usage: node tiles.mjs <base> [vps] [themes]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [base = "http://localhost:5173/", vps = "1440x900,390x844", th = "light,dark"] = process.argv.slice(2);
const ROUTES = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const b = await chromium.launch({ headless: false });
let p1 = 0, p2 = 0, tiles = 0;
const seen = new Map();
const read = (p) => p.evaluate(() => {
  const lines = (el) => {
    const rs = [];
    const walk = (n) => { for (const c of n.childNodes) {
      if (c.nodeType === 3 && c.textContent.trim()) { const r = document.createRange(); r.selectNodeContents(c); for (const q of r.getClientRects()) if (q.width > 1 && q.height > 1) rs.push([q.top, q.bottom]); }
      else if (c.nodeType === 1 && getComputedStyle(c).display !== "none" && !c.classList.contains("sr-only")) { const cr = c.getBoundingClientRect(); if (cr.width > 1 && cr.height > 1) { if (/^(svg|canvas|img|video)$/i.test(c.tagName)) rs.push([cr.top, cr.bottom]); else walk(c); } } } };
    walk(el); rs.sort((a, b) => a[0] - b[0]);
    let n = 0, end = -Infinity;
    for (const [t, bt] of rs) { const mid = t + (bt - t) / 2; if (mid > end) { n++; end = bt; } else end = Math.max(end, bt); }
    return n;
  };
  const probe = document.createElement("div"); probe.style.borderTopLeftRadius = "var(--radius-field)"; document.body.appendChild(probe);
  const field = parseFloat(getComputedStyle(probe).borderTopLeftRadius); probe.remove();
  const SEL = "[role=radio],[role=option],[role=tab],[role=checkbox],[role=menuitemradio],[aria-pressed],[aria-checked],[aria-selected],[data-state=on],[data-state=off],button,a[href],[role=button]";
  const name = (el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")}${el.getAttribute("role") ? "[" + el.getAttribute("role") + "]" : ""}`;
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width >= 2 && r.height >= 2 && cs.visibility !== "hidden" && cs.display !== "none" ? r : null; };
  const census = [], bad1 = [], bad2 = [];
  for (const el of document.querySelectorAll(SEL)) {
    const r = vis(el); if (!r) continue; const n = lines(el); if (n < 2) continue;
    const rad = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    const row = `${name(el)} "${el.textContent.trim().replace(/\s+/g, " ").slice(0, 24)}" ${n}L h=${Math.round(r.height)} r=${rad > 999 ? "9999" : rad}`;
    census.push(row); if (rad > field + 0.01) bad1.push(row);
  }
  for (const el of document.querySelectorAll("body *")) {
    const r = vis(el); if (!r) continue; const cs = getComputedStyle(el);
    const rad = parseFloat(cs.borderTopLeftRadius) || 0; if (!rad) continue;
    const stadium = rad >= 999 || rad >= Math.min(r.height, r.width) / 2 - 0.5; if (!stadium) continue;
    const painted = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderTopWidth !== "0px" || cs.outlineStyle !== "none" || cs.boxShadow !== "none"; if (!painted) continue;
    const n = lines(el); if (n > 1) bad2.push(`${name(el)} ${n}L h=${Math.round(r.height)} r=${rad > 999 ? "9999" : rad}`);
  }
  return { field, census, bad1, bad2 };
});
for (const theme of th.split(",")) for (const vp of vps.split(",")) for (const route of ROUTES) {
  const [w, h] = vp.split("x").map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme });
  const p = await ctx.newPage();
  await p.goto(base.replace(/#.*$/, "") + `#/${route}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(2300);
  const views = [["stage", await read(p)]];
  const dock = p.locator("[data-dock-tether=top]");
  const items = await dock.locator("[data-dock-surface-item]").evaluateAll((els) => els.map((e) => [e.getAttribute("data-surface"), e.getAttribute("aria-disabled") === "true"]));
  for (const [surface, off] of items) {
    if (off) continue;
    await dock.hover({ force: true }).catch(() => {}); await p.waitForTimeout(1300);
    const it = dock.locator(`[data-dock-surface-item][data-surface="${surface}"]`);
    if ((await it.getAttribute("aria-pressed")) !== "true") await it.click().catch(() => {});
    await p.mouse.move(w / 2, h - 5); await p.waitForTimeout(1300);
    views.push([surface, await read(p)]);
  }
  const out = [];
  for (const [v, r] of views) {
    tiles += r.census.length; p1 += r.bad1.length; p2 += r.bad2.length;
    for (const c of r.census) { const k = `${route || "home"}/${v} ${c.replace(/ h=\d+/, "")}`; const h = +c.match(/ h=(\d+)/)[1]; const o = seen.get(k) || [h, h]; seen.set(k, [Math.min(o[0], h), Math.max(o[1], h)]); }
    out.push(`${v}: tiles=${r.census.length} p1bad=${r.bad1.length}${r.bad1.length ? " " + r.bad1.slice(0, 3).join(" ; ") : ""} p2bad=${r.bad2.length}${r.bad2.length ? " " + r.bad2.slice(0, 3).join(" ; ") : ""}`);
  }
  console.log(`${theme} ${vp} ${(route || "home").padEnd(8)} field=${views[0][1].field}px | ${out.join(" | ")}`);
  await ctx.close();
}
await b.close();
console.log("--- distinct multi-line selectable tiles (route/view element text lines radius):");
for (const [k, [lo, hi]] of seen) console.log(`  ${k} h=${lo}${hi !== lo ? "-" + hi : ""}px`);
console.log(`tile-reads=${tiles} p1-fail=${p1} p2-fail=${p2}`);
process.exit(p1 || p2 ? 1 : 0);

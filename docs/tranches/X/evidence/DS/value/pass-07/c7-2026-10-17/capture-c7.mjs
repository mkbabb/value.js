// X-DS · value · pass 7 cure (critic V7C, 2026-10-17) — AFTER frames for the critic's cells:
// /#/nope (V7C-01/-03), /#/generate and the current-palette well (V7C-02), and Atmosphere as the
// single-column reference, at 1440 and 390 in light and dark. Probes:
//   notfound  — the header ::before display, the plate's box against Atmosphere's column, and a
//               column of composited pixels across the header's bottom edge (the old step);
//   swatches  — every watercolor swatch's computed radii, per-side sums and straight runs.
// Real Chrome, new headless (§0ei). ONE browser for the run, a new context per cell, both closed
// in a finally.   usage: node capture-c7.mjs [base]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "../../pass-04/redispatch-2026-10-16/harness.mjs";

const BASE = process.argv[2] || "http://localhost:9263";
const OUT = import.meta.dirname;
const CELLS = [["notfound", "/#/nope"], ["atmosphere", "/#/atmosphere"], ["generate", "/#/generate"], ["palettes-new", "/#/palettes"]];
const results = [];
const log = (o) => { results.push(o); console.log(JSON.stringify(o)); };

const PLATE = () => {
  const card = document.querySelector(".pane-wrapper .card");
  const head = document.querySelector(".pane-wrapper .pane-header");
  const cr = card?.getBoundingClientRect(), hr = head?.getBoundingClientRect();
  return {
    card: cr && { x: Math.round(cr.left), w: Math.round(cr.width), top: Math.round(cr.top), h: Math.round(cr.height) },
    header: hr && { top: Math.round(hr.top), bottom: Math.round(hr.bottom) },
    veil: head ? getComputedStyle(head, "::before").display : null,
    seated: !!card?.querySelector(":scope > .pane-header ~ .pane-scroll-fade"),
    docScroll: document.documentElement.scrollHeight - innerHeight,
  };
};

const SWATCHES = () => [...document.querySelectorAll('[data-testid="watercolor-swatch"]')].map((el) => {
  const r = el.getBoundingClientRect();
  if (!(r.width > 20 && r.height > 20)) return null;
  const cs = getComputedStyle(el);
  const px = (v, L) => (v.endsWith("%") ? (parseFloat(v) / 100) * L : parseFloat(v));
  const pair = (v) => v.split(" ");
  const [tlh, tlv = tlh] = pair(cs.borderTopLeftRadius), [trh, trv = trh] = pair(cs.borderTopRightRadius);
  const [brh, brv = brh] = pair(cs.borderBottomRightRadius), [blh, blv = blh] = pair(cs.borderBottomLeftRadius);
  const W = r.width, H = r.height;
  const s = { top: px(tlh, W) + px(trh, W), bottom: px(brh, W) + px(blh, W), left: px(tlv, H) + px(blv, H), right: px(trv, H) + px(brv, H) };
  const f = Math.min(1, W / s.top, W / s.bottom, H / s.left, H / s.right);
  const run = Math.max(W - s.top * f, W - s.bottom * f, H - s.left * f, H - s.right * f);
  return { x: Math.round(r.left), w: Math.round(W), maxStraightPx: Math.round(run * 10) / 10 };
}).filter(Boolean);

async function edgeColumn(page, x, y0, y1) {
  const b64 = (await page.screenshot()).toString("base64");
  return page.evaluate(async ({ b64, x, y0, y1 }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const g = c.getContext("2d"); g.drawImage(img, 0, 0);
    const out = [];
    for (let y = y0; y <= y1; y += 5) { const d = g.getImageData(x, y, 1, 1).data; out.push([y, d[0], d[1], d[2]]); }
    return out;
  }, { b64, x, y0, y1 });
}

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const [name, route] of CELLS) {
    const file = `${name}-${width}-${theme}.png`;
    let page;
    try {
      page = await newPage(browser, width, theme);
      if (name === "notfound") { await page.goto(BASE + route, { waitUntil: "load", timeout: 300_000 }); await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 }); await page.waitForTimeout(5000); }
      else await bootRoute(page, BASE + route);
      if (name === "palettes-new") { await page.locator("[data-well-label-row]").first().click(); await page.waitForTimeout(1200); }
      await page.screenshot({ path: path.join(OUT, file) });
      const o = { file, ok: true };
      if (name === "notfound" || name === "atmosphere") {
        o.plate = await page.evaluate(PLATE);
        if (name === "notfound" && o.plate.card && o.plate.header) {
          const x = Math.round(o.plate.card.x + o.plate.card.w * 0.85);
          o.edge = { x, samples: await edgeColumn(page, x, o.plate.header.bottom - 25, o.plate.header.bottom + 15) };
        }
      } else o.swatches = await page.evaluate(SWATCHES);
      log(o);
    } catch (e) { log({ file, ok: false, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "capture-c7.json"), JSON.stringify({ base: BASE, results }, null, 1));
}

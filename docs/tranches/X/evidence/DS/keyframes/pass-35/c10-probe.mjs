// X-DS keyframes r6 pass 10 cure (critic C10) — AFTER probe + frames. Headless real Chrome only (§0ei).
// KF-C10-02  the Back row: every tile's ball and name on the same lines (the bounce tile's note hangs below).
// KF-C10-03  #/sequence: each lane's solid rail starts at its gate (the resting ball's centre).
// KF-C10-04  the collapsed dock glyph rests while the scene is settled/paused, plays while the transport plays; spring glyph redrawn.
// KF-C10-05  #/cube Timeline, empty: no caret row; the notice sits at the column's pitch under the track.
// KF-C10-07  #/spring: the groove starts at the ring's edge at 1440 and 390 (the ring is empty).
// KF-C10-08  #/easing 390 after 'ease-in' then 'steps': a partial row shows under the filter rule.
// KF-C10-10  #/easing, #/spring, #/square (and every scene) at 1440: the pane ends on the stage plate's foot.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SETTLE = Number(process.env.SETTLE ?? 4000);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { easing: {}, sequence: {}, spring: {}, timeline: {}, feet: {}, glyph: {}, frames: [], fails: [] };
const fail = (id, cell, why) => report.fails.push(`${id} ${cell}: ${why}`);
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const visit = async (page, route) => { await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(SETTLE); await painted(page); };
const snap = async (page, name, opts = {}) => { const vp = page.viewportSize(); await page.mouse.move(5, vp.height - 10); await page.waitForTimeout(800); await painted(page); await page.screenshot({ path: path.join(OUT, `${name}.png`), ...opts }); report.frames.push(name); };
const feet = (page) => page.evaluate(() => { const c = [...document.querySelectorAll("[data-slot=card]")].map((e) => ({ pane: e.classList.contains("pane-frame"), r: e.getBoundingClientRect() })).filter((x) => x.r.width > 250 && x.r.top > 80 && x.r.top < 200);
  const p = c.find((x) => x.pane), s = c.find((x) => !x.pane); return { pane: p && Math.round(p.r.bottom), stage: s && Math.round(s.r.bottom) }; });
const glyphLive = (page) => page.evaluate(() => { const b = [...document.querySelectorAll("button[aria-label=Scene]")].find((e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden"); const g = b?.querySelector(".dock-glyph"); return g ? g.hasAttribute("data-live") : null; });
const pickSurface = async (page, surface) => {
  const item = page.locator(`[data-dock-surface-item][data-surface="${surface}"]`).first(); if (!(await item.count())) return false;
  if ((await item.getAttribute("data-selected")) === null) {
    if (!(await item.isVisible())) { const b = await page.locator("button[aria-label=Scene]:visible").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200); }
    await item.click({ timeout: 5000 }); await page.waitForTimeout(1500); await painted(page);
  }
  return page.evaluate((t) => [...document.querySelectorAll(".configurator-section-label")].some((l) => l.textContent.trim() === t && l.getBoundingClientRect().width > 0), surface === "timeline" ? "Timeline" : "Physics");
};
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage(); const cell = (r) => `${r}-${w}-${scheme}`;
    // ── easing: the Back row, then ease-in → steps
    await visit(page, "easing");
    const tile = (name) => page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${name}"]`).first();
    const pick = async (name) => { const t = tile(name); if (await t.count()) { await t.click(); await page.waitForTimeout(1200); await painted(page); } };
    await pick("ease-in-bounce");
    const row = await page.evaluate(() => { const t = document.querySelector('.easing-target .specimen-tile[data-state="on"]'); const top = t.getBoundingClientRect().top;
      return [...t.closest(".specimen-grid").querySelectorAll(".specimen-tile")].filter((x) => Math.abs(x.getBoundingClientRect().top - top) < 4).map((x) => ({ name: x.querySelector(".tile-name").textContent.trim(), ball: Math.round(x.querySelector(".tile-ball").getBoundingClientRect().top), nameY: Math.round(x.querySelector(".tile-name").getBoundingClientRect().top) })); });
    report.easing[cell("back-row")] = row;
    if (new Set(row.map((r) => r.ball)).size !== 1 || new Set(row.map((r) => r.nameY)).size !== 1) fail("KF-C10-02", cell("easing"), JSON.stringify(row));
    const sec = await page.locator('.easing-target .specimen-tile[data-state="on"]').first().evaluate((t) => { const r = t.closest(".catalogue-section").getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
    await page.mouse.move(5, h - 10); await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, `${cell("easing-back-row")}.png`), clip: { x: Math.max(0, sec[0] - 8), y: Math.max(0, sec[1] - 8), width: Math.min(w, sec[2] + 16), height: Math.min(h - sec[1] + 8, sec[3] + 16) } }); report.frames.push(cell("easing-back-row"));
    await pick("ease-in"); await pick("steps");
    const top = await page.evaluate(() => { const d = document.querySelector(".easing-target .specimen-drawer"); const dr = d.getBoundingClientRect();
      const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => ({ k: e.classList.contains("catalogue-family") ? "h:" + e.textContent.trim() : "t:" + e.querySelector(".tile-name")?.textContent.trim(), t: Math.round(e.getBoundingClientRect().top - dr.top), b: Math.round(e.getBoundingClientRect().bottom - dr.top) })).filter((r) => r.b > 0 && r.t < dr.height);
      const sel = d.querySelector('.specimen-tile[data-state="on"]').getBoundingClientRect();
      return { first: rows[0], firstWholeTop: rows.find((r) => r.t >= 0)?.t, selectedWhole: sel.top >= dr.top - 0.5 && sel.bottom <= dr.bottom + 0.5 }; });
    report.easing[cell("steps-top")] = top;
    if (!top.selectedWhole) fail("KF-C10-08", cell("easing"), "steps not whole");
    if (w === 390 && !(top.first.t < 0 && top.first.b > 16)) fail("KF-C10-08", cell("easing"), `no partial row under the rule: ${JSON.stringify(top.first)}`);
    report.feet[cell("easing")] = await feet(page);
    await snap(page, cell("easing"));
    // ── spring: the groove clear of the ring
    await visit(page, "spring");
    if (w === 1440) await pickSurface(page, "spring");
    // painted, not boxed: the groove's pixels inside the ring equal the plate's just above it; outside the ring they do not.
    const g = await page.evaluate(() => { const ring = document.querySelector(".spring-target-marker").getBoundingClientRect(); const rail = document.querySelector(".spring-track .progress-rail").getBoundingClientRect(); return { cx: ring.left + ring.width / 2, right: ring.right, y: rail.top + rail.height / 2 }; });
    await page.mouse.move(5, h - 10); await page.waitForTimeout(500);
    const shot = (x, y, wd) => page.screenshot({ clip: { x, y: y - 0.5, width: wd, height: 1 } }).then((b) => b.toString("base64"));
    const [inside, plate, groove] = [await shot(g.cx + 3, g.y, g.right - g.cx - 7), await shot(g.cx + 3, g.y - 6, g.right - g.cx - 7), await shot(g.right + 6, g.y, 24)];
    const px = (b64) => page.evaluate(async (d) => { const im = new Image(); im.src = "data:image/png;base64," + d; await im.decode(); const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const x = c.getContext("2d"); x.drawImage(im, 0, 0); const a = x.getImageData(0, 0, im.width, im.height).data; const o = []; for (let i = 0; i < a.length; i += 4) o.push([a[i], a[i + 1], a[i + 2]]); return o; }, b64);
    const [I, P, G] = [await px(inside), await px(plate), await px(groove)];
    const dist = (a, b) => Math.max(...a.map((p, i) => Math.max(...p.map((v, k) => Math.abs(v - (b[i] ?? b[0])[k])))));
    const s = { insideVsPlate: dist(I, P), grooveVsPlate: dist(G.map((p) => p), P.slice(0, G.length).length ? P.slice(0, G.length) : P) };
    report.spring[cell("spring")] = s; if (s.insideVsPlate > 10 || s.grooveVsPlate < 10) fail("KF-C10-07", cell("spring"), JSON.stringify(s));
    report.feet[cell("spring")] = await feet(page);
    report.glyph[cell("spring-rest")] = await glyphLive(page);
    if (report.glyph[cell("spring-rest")] === true) fail("KF-C10-04", cell("spring"), "the glyph plays while the scene is settled");
    await snap(page, cell("spring"));
    // ── sequence (1440): rails from the gate
    if (w === 1440) {
      await visit(page, "sequence");
      const q = await page.evaluate(() => [...document.querySelectorAll(".seq-track")].map((t) => { const r = t.querySelector(".progress-rail").getBoundingClientRect(); const b = t.querySelector(".seq-ball").getBoundingClientRect(); return { railLeft: Math.round(r.left), ballCentre: Math.round(b.left + b.width / 2) }; }));
      report.sequence[cell("sequence")] = q; if (q.some((x) => Math.abs(x.railLeft - x.ballCentre) > 1)) fail("KF-C10-03", cell("sequence"), JSON.stringify(q));
      report.feet[cell("sequence")] = await feet(page);
      await snap(page, cell("sequence"));
      await visit(page, "square"); report.feet[cell("square")] = await feet(page); await snap(page, cell("square"));
      for (const [k, v] of Object.entries(report.feet)) if (k.endsWith(`1440-${scheme}`) && v.pane != null && v.stage != null && v.pane !== v.stage) fail("KF-C10-10", k, JSON.stringify(v));
    }
    // ── cube Timeline (empty)
    await visit(page, "cube");
    if (await pickSurface(page, "timeline")) {
      if (w === 390) { const hd = page.locator("[data-slot=sheet-detent-handle]").first(); if (await hd.count() && Number(await hd.getAttribute("aria-valuenow")) < 0.3) { await hd.focus(); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(1200); await painted(page); } }
      const tl = await page.evaluate(() => { const t = [...document.querySelectorAll(".timeline-track")].find((e) => e.getBoundingClientRect().width > 0); const p = [...document.querySelectorAll("p")].find((x) => /keyframes? in CSS/.test(x.textContent)); return { gap: Math.round(p.getBoundingClientRect().top - t.getBoundingClientRect().bottom), mb: getComputedStyle(t).marginBottom }; });
      report.timeline[cell("cube")] = tl; if (tl.mb !== "0px" || tl.gap > 21) fail("KF-C10-05", cell("cube"), JSON.stringify(tl));
      await snap(page, cell("timeline-cube-timeline")); if (w === 390) await snap(page, cell("timeline-cube-timeline-fullpage"), { fullPage: true });
    } else fail("KF-C10-05", cell("cube"), "Timeline surface not reached");
    await ctx.close();
  }
  // ── glyphs (1440 light, dsf 2): the collapsed tile at rest on spring and sequence, then spring playing
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const page = await ctx.newPage();
  const tileShot = async (name) => { const b = await page.locator("button[aria-label=Scene]:visible").first().boundingBox(); await page.screenshot({ path: path.join(HERE, "cure", `glyph-${name}.png`), clip: { x: b.x - 14, y: b.y - 14, width: b.width + 28, height: b.height + 28 } }); };
  for (const sc of ["spring", "sequence", "easing"]) { await visit(page, sc); await page.mouse.move(5, 890); await page.waitForTimeout(1200); report.glyph[`${sc}-rest`] = await glyphLive(page); await tileShot(`after-${sc}-rest`); }
  await visit(page, "spring");
  const play = page.locator('button[aria-label="Play animation"]:visible').first();
  if (await play.count()) { await play.click(); await page.waitForTimeout(400); report.glyph["spring-playing"] = await glyphLive(page); await page.mouse.move(5, 890); await page.waitForTimeout(300); await tileShot("after-spring-playing"); }
  if (report.glyph["spring-playing"] !== true) fail("KF-C10-04", "spring-1440", `glyph not live while playing (${report.glyph["spring-playing"]})`);
  for (const sc of ["spring", "sequence", "easing"]) if (report.glyph[`${sc}-rest`] === true) fail("KF-C10-04", sc, "glyph plays at rest");
  await ctx.close();
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c10-probe.json"), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ frames: report.frames.length, fails: report.fails }, null, 1));

// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.controls · the Controls card's served predicates (READ-ONLY falsifier)
// Rows: UIA-KF-036 079 080 081 082 115 117 165 166 169 171 269 270 271 272 273 · KFA-36 101 150 209 · A2-KE-X-6.
// Usage: BASE=http://localhost:5236 RUN=before-r1 node controls.mjs
// Probe note (after the BEFORE runs): u171_marked first looked for an <svg> only; glass 10.1.0 marks the
// selected item with a dot span (frame blend-open), so the predicate reads either indicator.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5236";
const CFGS = (process.env.CFGS || "cube-1440x900-light,cube-1440x900-dark,cube-390x844-light,cube-390x844-dark,cube-844x390-light,amiga-1440x900-light,amiga-390x844-dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const r1 = (v) => Math.round(v * 10) / 10;
const rows = [];
const b = await chromium.launch({ headless: false });

// ── in-page helpers: the ACTIVE channel's card is the one whose main row has a height ──
const HELPERS = () => {
  const card = () => [...document.querySelectorAll("[data-channel-options], .panel-row")].map((e) => e.closest(".card") || e.parentElement.closest("div")).find((c) => c && c.getBoundingClientRect().height > 0);
  const vis = (e) => { if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const rowsOf = (c) => [...c.querySelectorAll(".panel-row")];
  const contentOf = (row) => row.querySelector(":scope > .panel-content");
  const backs = (c) => [...c.querySelectorAll('button[aria-label*="ack to controls"]')];
  const lineCount = (e) => { const cs = getComputedStyle(e); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2; return Math.round(e.getBoundingClientRect().height / lh); };
  const alphaOf = (el) => { let a = 1; for (let e = el; e; e = e.parentElement) a *= +getComputedStyle(e).opacity; const c = getComputedStyle(el).color; const m = c.match(/\/\s*([\d.]+)\)|rgba\([^)]*,\s*([\d.]+)\)/); return a * (m ? +(m[1] ?? m[2]) : 1); };
  const scrollerOf = (el, stop) => { for (let e = el.parentElement; e && e !== stop; e = e.parentElement) { const oy = getComputedStyle(e).overflowY; if (oy === "auto" || oy === "scroll") return e; } return null; };
  const frames = (ms) => new Promise((res) => { const out = []; const t0 = performance.now();
    const f = (t) => { const c = card(); const rs = c ? rowsOf(c) : [];
      out.push({ t: t - t0, cardH: c ? c.getBoundingClientRect().height : 0, op: rs.map((r) => +getComputedStyle(contentOf(r)).opacity), st: Math.max(0, ...rs.map((r) => contentOf(r).scrollTop)) });
      if (t - t0 < ms) requestAnimationFrame(f); else res(out); }; requestAnimationFrame(f); });
  const entry = (c) => [...c.querySelectorAll("button[aria-controls]")].find((b) => document.getElementById(b.getAttribute("aria-controls"))?.classList.contains("panel-row"));
  window.__co = { entry, card, vis, rowsOf, contentOf, backs, lineCount, alphaOf, scrollerOf, frames };
};

for (const cfg of CFGS) {
  const [scene, vp, theme] = cfg.split("-"); const [w, h] = vp.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: touch, hasTouch: touch, colorScheme: theme, reducedMotion: "no-preference" });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); const row = { cfg };
  const shot = (tag) => p.screenshot({ path: `${FR}${cfg}-${tag}.png` });
  try {
    await p.goto(`${BASE}/#/${scene}`); await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.evaluate((t) => localStorage.setItem("vueuse-color-scheme", t), theme); await p.reload(); await sleep(3800);
    await p.evaluate(HELPERS);
    // the Controls surface: at phone the sheet may need a tap on its Controls item
    if (!(await p.evaluate(() => !!window.__co.card()))) { const it = p.locator('[data-dock-surface-item][aria-label="Controls"]').first(); if (await it.count()) { await it.click({ force: true }).catch(() => {}); await sleep(1400); } }
    const cardOk = await p.evaluate(() => !!window.__co.card()); row.cardOk = cardOk; if (!cardOk) throw new Error("no controls card");
    await p.evaluate(() => window.__co.card().scrollIntoView({ block: "start" }));
    await sleep(300); await shot("rest");
    // UIA-KF-115 (the easing label vs its siblings) · UIA-KF-117 (gutters at phone) · UIA-KF-271 (trigger + label state)
    Object.assign(row, await p.evaluate(() => { const c = window.__co.card(); const labs = [...c.querySelectorAll(".panel-row")[0].querySelectorAll("label, .label")].filter(window.__co.vis);
      const st = labs.map((l) => { const cs = getComputedStyle(l); return `${l.textContent.trim()}|${cs.fontSize}|${cs.color}|${Math.round(l.getBoundingClientRect().left)}`; });
      const easing = st.find((s) => s.startsWith("easing|")); const dur = st.find((s) => s.startsWith("duration|"));
      const sc = window.__co.scrollerOf(c, document.body); const cr = c.getBoundingClientRect(); const sr = sc ? sc.getBoundingClientRect() : null; const scs = sc ? getComputedStyle(sc) : null;
      const trig = c.querySelector('[aria-haspopup="dialog"], [aria-labelledby*=" "]');
      return { u115_easingLabel: easing, u115_durationLabel: dur, u115_same: !!easing && !!dur && easing.split("|").slice(1).join("|") === dur.split("|").slice(1).join("|"),
        u117_gutL: sr ? r1(cr.left - sr.left - parseFloat(scs.borderLeftWidth)) : null, u117_gutR: sr ? r1(sr.right - cr.right - parseFloat(scs.borderRightWidth) - (sc.offsetWidth - sc.clientWidth)) : null, u117_shadow: getComputedStyle(c).boxShadow.slice(0, 60),
        restH: r1(cr.height), triggerText: trig ? trig.textContent.trim().replace(/\s+/g, " ") : null, goldLabel: !!c.querySelector(".gold-shimmer") };
      function r1(v) { return Math.round(v * 10) / 10; } }));
    // ── the detail editor: open (KFA-101 · KFA-209 · UIA-KF-079 · 080 · 150 · 036 · A2-KE-X-6) ──
    const pencil = p.locator('[aria-label="Edit easing curve"]:visible').first();
    const openRec = p.evaluate(() => window.__co.frames(700));
    await pencil.click(); const fo = await openRec; await sleep(250);
    await shot("detail");
    row.k101_openMaxScrollTop = r1(Math.max(...fo.map((f) => f.st)));
    row.k209_doubleExposure = fo.filter((f) => f.op.length >= 2 && f.op[0] > 0.15 && f.op[0] < 0.85 && f.op[1] > 0.15 && f.op[1] < 0.85).length;
    Object.assign(row, await p.evaluate(() => { const c = window.__co.card(); const det = c.querySelector(".panel-row--detail");
      const back = window.__co.backs(det)[0]; const title = det.querySelector("h1,h2,h3,h4,[data-subpane-title]");
      const note = [...det.querySelectorAll("p")].find(window.__co.vis);
      const br = back.getBoundingClientRect(), tr = title.getBoundingClientRect(); const tcs = getComputedStyle(title);
      const labelFs = parseFloat(getComputedStyle(c.querySelector(".label")).fontSize);
      const sc = window.__co.scrollerOf(back, c); const plot = det.querySelector('[data-slot="easing-curve"] svg');
      const hit = document.elementFromPoint(br.left + br.width / 2, br.top + br.height / 2);
      const pr = plot ? plot.getBoundingClientRect() : null;
      return { u079_titleText: title.textContent.trim(), u079_titleFs: tcs.fontSize, u079_titleFsOverLabel: Math.round((parseFloat(tcs.fontSize) / labelFs) * 100) / 100, u079_titleLines: window.__co.lineCount(title),
        u079_noteUnderTitle: note ? note.getBoundingClientRect().top >= tr.bottom - 1 : null, u079_noteLines: note ? window.__co.lineCount(note) : 0, u079_noteText: note ? note.textContent.trim() : null,
        u080_backLeftOfTitle: br.right <= tr.left + 1, u269_backClass: back.className.includes("h-auto") || back.className.includes("p-1 "), u269_backSize: `${Math.round(br.width)}x${Math.round(br.height)}`,
        u036_headerInScroller: !!sc, u036_backHit: !!hit && (hit === back || back.contains(hit)), u036_backInView: br.top >= 0 && br.bottom <= innerHeight,
        x6_plotBottom: pr ? Math.round(pr.bottom) : null, x6_ih: innerHeight, x6_plotInView: pr ? pr.top >= 0 && pr.bottom <= innerHeight : null, openH: Math.round(c.getBoundingClientRect().height) }; }));
    // ── back without editing (UIA-KF-165 · KFA-36 · UIA-KF-272 · KFA-101) ──
    const closeRec = p.evaluate(() => window.__co.frames(700));
    await p.evaluate(() => window.__co.backs(window.__co.card().querySelector(".panel-row--detail"))[0].click()); const fc = await closeRec; await sleep(250);
    row.k36_closeMinCardH = r1(Math.min(...fc.map((f) => f.cardH))); row.k101_closeMaxScrollTop = r1(Math.max(...fc.map((f) => f.st)));
    Object.assign(row, await p.evaluate(() => { const c = window.__co.card(); const trig = c.querySelector('[aria-haspopup="dialog"], [aria-labelledby*=" "]');
      return { u165_triggerAfterPeek: trig ? trig.textContent.trim().replace(/\s+/g, " ") : null, u165_goldAfterPeek: !!c.querySelector(".gold-shimmer"), backH: Math.round(c.getBoundingClientRect().height), focusAfterBack: document.activeElement?.getAttribute("aria-label") || document.activeElement?.tagName }; }));
    row.u165_unchanged = row.u165_triggerAfterPeek === row.triggerText && !row.u165_goldAfterPeek;
    await pencil.click(); await sleep(900);
    row.reopenH = await p.evaluate(() => Math.round(window.__co.card().getBoundingClientRect().height));
    row.u272_stable = row.reopenH === row.openH;
    await p.evaluate(() => window.__co.backs(window.__co.card().querySelector(".panel-row--detail"))[0].click()); await sleep(700);
    // ── the layer (advanced) sub-pane (UIA-KF-269 · 273 · 082 · 270 · 081 · 169 · 171) ──
    Object.assign(row, await p.evaluate(() => { const c = window.__co.card(); const entry = window.__co.entry(c);
      return { u269_entryRaw: !!entry && !entry.hasAttribute("data-slot"), u269_entryFocusRing: !!entry && entry.className.includes("kf-focus-ring"), u273_entryText: entry ? entry.textContent.trim() : null }; }));
    await p.evaluate(() => window.__co.entry(window.__co.card()).click()); await sleep(800);
    await shot("layer");
    Object.assign(row, await p.evaluate(() => { const c = window.__co.card(); const pane = c.querySelector(`[id="${window.__co.entry(c).getAttribute("aria-controls")}"]`);
      const back = window.__co.backs(pane)[0]; const br = back.getBoundingClientRect();
      const title = [...pane.querySelectorAll("span, h1, h2, h3, h4, [data-subpane-title]")].find((e) => window.__co.vis(e) && e.getBoundingClientRect().top < br.bottom && e.getBoundingClientRect().bottom > br.top && !back.contains(e));
      const labs = [...pane.querySelectorAll(".label")].filter(window.__co.vis); const lab = labs.find((l) => l.textContent.trim() === "blend") || labs[0];
      const zi = pane.querySelector('[data-stub="NumberField"] input, input'); const txt = pane.textContent;
      const grid = pane.querySelector(".labeled-field-grid"); const main = c.querySelector(".panel-row .labeled-field-grid");
      const weight = labs.find((l) => /^weight/.test(l.textContent.trim()));
      return { u269_layerBackClass: back.className.includes("h-auto"), u269_layerBackSize: `${Math.round(br.width)}x${Math.round(br.height)}`, u080_layerBackLeftOfTitle: title ? br.right <= title.getBoundingClientRect().left + 1 : null,
        u273_titleText: title ? title.textContent.trim() : null, u273_titleFs: title ? getComputedStyle(title).fontSize : null, u273_titleWeight: title ? getComputedStyle(title).fontWeight : null, u273_labelFs: lab ? getComputedStyle(lab).fontSize : null, u273_labelWeight: lab ? getComputedStyle(lab).fontWeight : null,
        u082_reasonShown: /single[- ]target/i.test(txt), u082_zIndexDisabled: zi ? zi.disabled : null, u082_blendDisabled: !!pane.querySelector('button[role=combobox][disabled], button[role=combobox][data-disabled]'),
        u081_weightLabel: weight ? weight.textContent.trim() : null, u081_layerTrack: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ")[1] : null, u081_mainTrack: main ? getComputedStyle(main).gridTemplateColumns.split(" ")[1] : null }; }));
    if (scene === "amiga") {
      const paneSel = await p.evaluate(() => "#" + CSS.escape(window.__co.entry(window.__co.card()).getAttribute("aria-controls")));
      const track = () => p.evaluate((s) => getComputedStyle(document.querySelector(s + " .labeled-field-grid")).gridTemplateColumns.split(" ")[1], paneSel);
      const t0 = await track(); const sl = p.locator(`${paneSel} [role=slider]`).first();
      if (await sl.count()) { await sl.focus(); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await sleep(300); }
      const t1 = await track(); row.u081_trackAt100 = t0; row.u081_trackAfterStep = t1; row.u081_stable = t0 === t1 && row.u081_weightLabel === "weight";
      // UIA-KF-169 — enabled off: every disabled row dims its label with its control
      await p.locator(`${paneSel} button[role=switch]`).first().click(); await sleep(500); await shot("layer-disabled");
      Object.assign(row, await p.evaluate((s) => { const pane = document.querySelector(s); const a = {}; for (const l of pane.querySelectorAll(".label")) if (window.__co.vis(l)) a[l.textContent.trim().split(" ")[0]] = Math.round(window.__co.alphaOf(l) * 100) / 100; return { u169_labelAlpha: a, u169_same: a["z-index"] !== undefined && a["z-index"] === a["blend"] }; }, paneSel));
      await p.locator(`${paneSel} button[role=switch]`).first().click(); await sleep(500);
      // UIA-KF-171 — the blend select's items: a description each, and the current value marked
      await p.locator(`${paneSel} button[role=combobox]`).first().click(); await sleep(700); await shot("blend-open");
      Object.assign(row, await p.evaluate(() => { const opts = [...document.querySelectorAll("[role=listbox] [role=option]")];
        return { u171_items: opts.map((o) => o.textContent.trim().replace(/\s+/g, " ")), u171_described: opts.length > 0 && opts.every((o) => o.textContent.trim().split(/\s+/).length > 1), u171_marked: opts.some((o) => { if (o.getAttribute("aria-selected") !== "true") return false; const ind = o.querySelector(":scope > span[aria-hidden]"); const mark = ind && ind.querySelector("svg, span span, span[class*=rounded]"); return !!mark && window.__co.vis(mark); }) }; }));
      await p.keyboard.press("Escape"); await sleep(400);
    }
    await p.evaluate(() => window.__co.backs(window.__co.card()).find(window.__co.vis)?.click()); await sleep(700);
    // ── UIA-KF-166 — a rejected duration: a short human message, the row barely moves ──
    const h0 = await p.evaluate(() => window.__co.card().getBoundingClientRect().height);
    const dur = p.locator(".panel-row--active input").first(); await dur.fill("abc"); await sleep(500); await shot("invalid");
    Object.assign(row, await p.evaluate((h0) => { const c = window.__co.card(); const err = [...c.querySelectorAll('[id*="error"], .labeled-field-error, [data-slot*=error], [role=alert]')].find((e) => window.__co.vis(e) && e.textContent.trim());
      return { u166_errText: err ? err.textContent.trim() : null, u166_errLen: err ? err.textContent.trim().length : null, u166_errLines: err ? window.__co.lineCount(err) : null, u166_growPx: Math.round(c.getBoundingClientRect().height - h0) }; }, h0));
    await dur.fill("5s"); await sleep(400);
  } catch (e) { row.error = String(e.message || e).slice(0, 200); }
  rows.push(row); console.log(JSON.stringify(row));
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(rows, null, 1));

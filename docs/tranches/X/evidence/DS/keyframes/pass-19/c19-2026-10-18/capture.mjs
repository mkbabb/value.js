// X-DS keyframes r9 pass 19 (cure seat, critic C19): the pass-18 instrument (BASE :5219) plus `glyphs-<w>-<scheme>` on the cube Controls surface: every trailing glyph's centre and right edge with the data-slot that owns it (the ConfiguratorLayer header chevron, the glass Select carets, the consumer layer-row chevron, the field and readout edges, and at 390 the Sheet close ×), so KF-C19-01/-02 are measured against their owners.
// X-DS keyframes r9 pass 18 (cure seat, critic C18): the pass-17 instrument with KF-C18-02 cured (the inline Import is pressed with element.click() inside evaluate, so no actionability scroll runs; the shot waits for the [data-slot=toast] node and asserts the Timeline title's effective opacity is 1 and the parked port's scrollTop is 0, recorded as `importGate`), plus KF-C18-01 (`feet`: the pane frame's foot against the stage plate's foot on every scene at 1440, delta must be 0 or >= one section rung) and the critic's 390-dark imported cell at t = 600 / 2500 / 6000 ms.
// X-DS keyframes r9 pass 17 (cure seat, critic C17): the pass-16 instrument plus KF-C17-01 (the layer region cell at 1440, and `paneBottom`/`stageBottom` on every surface so the hugging frame is measured against the stage), KF-C17-03 (the caption's line count and last-line text) and KF-C17-04 (the Spring row-label rungs).
// Inherited (pass 16): the pass-15 instrument plus KF-C16-01 fields: `ribbonTop` (the ribbon section's top, i.e. its rule), `contentBottom` (the bottom of the block before it) and `bandAbove` (the blank between them), so the Timeline rhythm is measured against Controls.
// Inherited (pass 15): the pass-14 instrument, with KF-C15-02 fixed: before the inline Import click every element's scrollTop is snapshotted, and after it each scroller Playwright's actionability scroll moved (the 390 sheet body) is restored, so the imported frame shows the peek a user sees (the title row in view). The scroll moved and restored is recorded as `restoredScroll` in capture.json.
// Inherited header (pass 14): AFTER frames for every route (1440/390, light/dark) and the cube pane's three ribbon surfaces (Controls, Keyframes, Timeline empty and imported) at 1440 and 390. KF-C14-01: each surface's lead plate and glyph edge against the pane title. KF-C14-02: every verb's visible text. KF-C14-04: the ribbon row's foot against the card's foot. KF-C14-06: at 390 the open fact is set in the same patch (isControlsPanelOpen: true), and the sheet's served detent is recorded. Headless real Chrome (§0ei); one browser, a context per cell, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), process.env.OUT ?? "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5219/";
const ROUTES = process.env.ROUTES !== "0";
const KEY = "animation-groups-control-options-store";
const routes = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setSurface = (page, scene, patch) => page.evaluate(([k, scene, patch]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, patch]);
const edges = (page, surface) => page.evaluate((surface) => {
  const vis = (e) => e && e.getBoundingClientRect().width > 0;
  const frame = [...document.querySelectorAll(".pane-frame")].find(vis);
  const title = [...(frame ?? document).querySelectorAll(".configurator-section-label")].find(vis);
  let row = null;
  if (surface === "controls") row = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Reverse" && vis(b))?.parentElement;
  else if (surface === "keyframes") row = [...document.querySelectorAll("button")].find((b) => /Apply CSS/.test(b.textContent) && vis(b))?.parentElement;
  else row = [...(document.querySelector("#timeline-ribbon-target")?.querySelectorAll("button") ?? [])].find(vis)?.parentElement;
  if (!row) return { title: title && +title.getBoundingClientRect().left.toFixed(1), row: null };
  const btns = [...row.children].map((c) => c.matches("button") ? c : c.querySelector("button")).filter(vis);
  const lead = btns[0]; const lr = lead.getBoundingClientRect(); const ls = getComputedStyle(lead);
  const glyph = lead.querySelector("svg");
  const rr = row.getBoundingClientRect(); const last = btns.at(-1).getBoundingClientRect();
  return {
    titleText: title?.textContent.trim(), title: title && +title.getBoundingClientRect().left.toFixed(1),
    lead: lead.getAttribute("aria-label") ?? lead.textContent.trim(), leadBg: ls.backgroundColor,
    plateLeft: +lr.left.toFixed(1), glyphLeft: glyph && +glyph.getBoundingClientRect().left.toFixed(1),
    justify: getComputedStyle(row).justifyContent, rowLeft: +rr.left.toFixed(1), rowRight: +rr.right.toFixed(1),
    gutterStart: +(lr.left - rr.left).toFixed(1), gutterEnd: +(rr.right - last.right).toFixed(1),
    lastName: btns.at(-1).getAttribute("aria-label") ?? btns.at(-1).textContent.trim(),
    verbs: btns.map((b) => ({ name: b.getAttribute("aria-label") ?? b.textContent.trim(), text: b.innerText.trim(), glyph: Boolean(b.querySelector("svg")), clipped: b.scrollWidth > b.clientWidth + 0.5 })),
    rowBottom: +rr.bottom.toFixed(1), frameBottom: frame && +frame.getBoundingClientRect().bottom.toFixed(1),
    stageBottom: (() => { const sc = document.querySelector(".stage-cell"); return sc ? +sc.getBoundingClientRect().bottom.toFixed(1) : null; })(),
    footGap: frame && +(frame.getBoundingClientRect().bottom - rr.bottom).toFixed(1),
    ...(() => { const rb = [...document.querySelectorAll(".ribbon-bar")].find(vis); if (!rb) return {}; const prev = rb.previousElementSibling; const t = rb.getBoundingClientRect().top; const pb = prev && prev.getBoundingClientRect().bottom; return { ribbonTop: +t.toFixed(1), contentBottom: pb != null ? +pb.toFixed(1) : null, bandAbove: pb != null ? +(t - pb).toFixed(1) : null }; })(),
    inView: rr.top >= 0 && rr.bottom <= innerHeight,
    sheet: (() => { const sh = document.querySelector("[data-slot=sheet-content]"); if (!sh) return null; const b = sh.getBoundingClientRect(); return { top: +b.top.toFixed(1), height: +b.height.toFixed(1), snap: sh.getAttribute("data-snap") ?? sh.getAttribute("data-detent") ?? null }; })(),
  };
}, surface);
const glyphs = (page) => page.evaluate(() => {
  const vis = (e) => e && e.getBoundingClientRect().width > 0;
  const r = (e) => { const b = e.getBoundingClientRect(); return { cx: +((b.left + b.right) / 2).toFixed(1), right: +b.right.toFixed(1), top: +b.top.toFixed(1) }; };
  const owner = (e) => { const o = e.closest("[data-slot]"); return o ? o.getAttribute("data-slot") : null; };
  const out = {};
  const sheet = [...document.querySelectorAll("[data-slot=sheet-content]")].find(vis);
  const root = sheet ?? [...document.querySelectorAll(".pane-frame")].find(vis) ?? document;
  const hdr = [...root.querySelectorAll(".configurator-layer-chevron")].find(vis);
  if (hdr) out.headerChevron = { ...r(hdr), owner: owner(hdr), cls: "configurator-layer-chevron" };
  out.selectCarets = [...root.querySelectorAll("[data-slot=select-trigger] svg")].filter(vis).map((s) => ({ ...r(s), owner: owner(s) }));
  const lb = [...root.querySelectorAll("button")].find((b) => vis(b) && b.querySelector("span")?.textContent.trim() === "layer");
  const lc = lb && [...lb.querySelectorAll("svg")].at(-1);
  if (lc) out.layerRowChevron = { ...r(lc), owner: owner(lc), pe: getComputedStyle(lb).paddingInlineEnd };
  out.fieldEdges = [...root.querySelectorAll("input")].filter(vis).map((i) => +(i.closest("[data-slot]") ?? i).getBoundingClientRect().right.toFixed(1));
  if (sheet) { const c = [...sheet.querySelectorAll("button")].filter(vis).find((b) => /close/i.test(b.getAttribute("aria-label") ?? "") || /close/i.test(b.querySelector(".sr-only")?.textContent ?? "")); if (c) { const g = c.querySelector("svg") ?? c; out.sheetClose = { ...r(g), owner: c.getAttribute("data-slot") ?? owner(c), label: c.getAttribute("aria-label") ?? c.textContent.trim() }; } }
  return out;
});
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    try {
      if (ROUTES) for (const r of routes) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(OUT, `${r || "home"}-${w}-${scheme}.png`) });
      }
      if (w === 1440) for (const r of ["cube", "amiga", "square", "easing", "spring", "sequence"]) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3000);
        rep[`feet-${r}-1440-${scheme}`] = await page.evaluate(() => {
          const vis = (e) => e && e.getBoundingClientRect().width > 0;
          const frame = [...document.querySelectorAll(".pane-frame")].find(vis);
          const plate = document.querySelector(".stage-cell [data-slot=card]");
          const f = frame?.getBoundingClientRect(); const p = plate?.getBoundingClientRect();
          return { frameTop: f && +f.top.toFixed(1), frameBottom: f && +f.bottom.toFixed(1), plateTop: p && +p.top.toFixed(1), plateBottom: p && +p.bottom.toFixed(1), delta: f && p ? +(p.bottom - f.bottom).toFixed(1) : null, alignSelf: frame && getComputedStyle(frame.closest(".controls-pane-wrapper") ?? frame).alignSelf };
        });
      }
      await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
      for (const [surface, patch] of [["controls", { selectedControl: "controls", isTimelineExpanded: false }], ["keyframes", { selectedControl: "keyframes", isTimelineExpanded: false }], ["timeline", { selectedControl: "timeline", isTimelineExpanded: true }]]) {
        await setSurface(page, "cube", w === 390 ? { ...patch, isControlsPanelOpen: true } : patch);
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000); await page.mouse.move(0, 0);
        const tag = surface === "timeline" ? "timeline-empty" : surface;
        await page.screenshot({ path: path.join(OUT, `cube-${tag}-${w}-${scheme}.png`) });
        rep[`${tag}-${w}-${scheme}`] = await edges(page, surface);
        if (surface === "controls") rep[`glyphs-${w}-${scheme}`] = await glyphs(page);
        if (surface === "timeline") {
          // KF-C18-02 — press the inline Import as a user's tap does (no actionability scroll), then wait for the toast and the settled peek.
          const pressed = await page.evaluate(() => { const p = [...document.querySelectorAll("p")].find((e) => /to edit here/.test(e.textContent) && e.getBoundingClientRect().width > 0); const b = p && (p.nextElementSibling?.matches("button") ? p.nextElementSibling : p.parentElement.querySelector("button")); if (!b) return false; b.click(); return true; });
          let importGate = { pressed };
          if (pressed) {
            await page.waitForSelector("[data-slot=toast]", { timeout: 5000 }).catch(() => null);
            await page.mouse.move(0, 0);
            const gate = () => page.evaluate(() => {
              const vis = (e) => e && e.getBoundingClientRect().width > 0;
              const frame = [...document.querySelectorAll(".pane-frame")].find(vis);
              const title = [...(frame ?? document).querySelectorAll(".configurator-section-label")].find((e) => vis(e) && e.textContent.trim() === "Timeline");
              let op = 1; for (let e = title; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
              const scrolled = [...document.querySelectorAll(".pane-frame, .pane-frame *")].filter((e) => e.scrollTop > 0.5).map((e) => ({ el: (e.getAttribute("data-slot") ?? e.className?.toString?.() ?? e.tagName).slice(0, 60), top: +e.scrollTop.toFixed(1) }));
              return { titleOpacity: +op.toFixed(3), toast: Boolean(document.querySelector("[data-slot=toast]")), scrolled, rootScroll: document.scrollingElement.scrollTop };
            });
            const t0 = Date.now(); let g = await gate();
            while ((g.titleOpacity < 1 || g.scrolled.length) && Date.now() - t0 < 4000) { await page.waitForTimeout(100); g = await gate(); }
            importGate = { pressed, ...g, settleMs: Date.now() - t0 };
            if (w === 390 && scheme === "dark") for (const t of [600, 2500, 6000]) { const el = Date.now() - t0; if (t > el) await page.waitForTimeout(t - el); await page.screenshot({ path: path.join(OUT, `imported-390-dark-t${t}.png`) }); importGate[`t${t}`] = await gate(); }
          }
          await page.screenshot({ path: path.join(OUT, `cube-timeline-imported-${w}-${scheme}.png`) });
          rep[`timeline-imported-${w}-${scheme}`] = { ...(await edges(page, surface)), importGate };
        }
      }
      await setSurface(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });

      if (w === 1440) {
        // KF-C17-01/03 — the layer region (the critic's cell).
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
        try {
          await page.getByText("single-target only").first().click({ timeout: 3000 }); await page.waitForTimeout(900); await page.mouse.move(0, 0);
          await page.screenshot({ path: path.join(OUT, `layer-region-1440-${scheme}.png`) });
          rep[`layer-region-1440-${scheme}`] = await page.evaluate(() => {
            const vis = (e) => e && e.getBoundingClientRect().width > 0;
            const frame = [...document.querySelectorAll(".pane-frame")].find(vis);
            const cap = [...document.querySelectorAll("[data-subpane-caption]")].find((e) => vis(e) && /Layer compositing/.test(e.textContent));
            const rb = [...document.querySelectorAll(".ribbon-bar")].find(vis);
            const range = cap && document.createRange(); let lines = null, last = null;
            if (cap) { range.selectNodeContents(cap); const tops = [...new Set([...range.getClientRects()].map((r) => Math.round(r.top)))]; lines = tops.length; last = cap.textContent.trim().split(/\s+/).slice(-2).join(" "); }
            const fb = frame?.getBoundingClientRect().bottom; const rbb = rb?.getBoundingClientRect().bottom;
            return { frameBottom: fb && +fb.toFixed(1), ribbonBottom: rbb && +rbb.toFixed(1), footGap: fb && rbb && +(fb - rbb).toFixed(1), stageBottom: +document.querySelector(".stage-cell").getBoundingClientRect().bottom.toFixed(1), caption: cap?.textContent.trim(), captionLines: lines, captionLastWords: last, captionWrap: cap && getComputedStyle(cap).textWrap };
          });
        } catch (e) { rep[`layer-region-1440-${scheme}`] = { error: e.message.split("\n")[0] }; }
        // KF-C17-04 — the Spring pane's row-label rungs.
        await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500); await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(OUT, `spring-pane-1440-${scheme}.png`) });
        rep[`spring-labels-1440-${scheme}`] = await page.evaluate(() => [...document.querySelectorAll("label, span")].filter((e) => ["response", "damping", "time", "Peak overshoot"].includes(e.textContent.trim())).map((e) => { const s = getComputedStyle(e); return { text: e.textContent.trim(), fontSize: s.fontSize, fontWeight: s.fontWeight, color: s.color }; }));
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(OUT, "capture.json"), JSON.stringify(rep, null, 1)); }

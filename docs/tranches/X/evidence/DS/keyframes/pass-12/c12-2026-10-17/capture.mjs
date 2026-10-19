// X-DS keyframes r9 pass 12 (critic C12): AFTER frames for the same cells as pass 11 (pass-11/c11-2026-10-17/): every route (1440/390, light/dark), the empty cube Timeline and after its one-press inline Import, the ribbon Import's paste dialog, and the cube controls pane. KF-C12-01: the lead capsule's glyph-to-edge against its computed padding in the imported state. KF-C12-02: the preview clone's painted bounds sampled over 6 s against the well's padding box. Headless real Chrome (§0ei); one browser, a context per cell, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.join(path.dirname(fileURLToPath(import.meta.url)), "after"); fs.mkdirSync(HERE, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5199/";
const KEY = "animation-groups-control-options-store";
const routes = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setSurface = (page, scene, patch) => page.evaluate(([k, scene, patch]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, patch]);
const timelineState = (page) => page.evaluate(() => {
  const hint = [...document.querySelectorAll("p")].find((e) => /to edit here/.test(e.textContent));
  const dialog = document.querySelector("[role=dialog]");
  return { hintShown: !!hint, dialogOpen: !!dialog, dialogTitle: dialog?.querySelector("h2")?.textContent.trim() ?? null, stops: document.querySelectorAll(".keyframe-marker[role=slider]").length, stopValues: [...document.querySelectorAll(".keyframe-marker[role=slider]")].map((e) => e.getAttribute("aria-valuetext")), carets: document.querySelectorAll(".timeline-caret").length };
});
const band = (page) => page.evaluate(() => {
  const host = document.querySelector("#timeline-ribbon-target"); if (!host) return null;
  const ribbonTop = Math.round(host.getBoundingClientRect().top);
  const surf = host.closest(".pane-frame")?.querySelector(".controls-surface");
  const rows = [...(surf?.querySelectorAll("button, p, .timeline-track, .keyframe-marker, .timeline-caret") ?? [])].filter((e) => e.getBoundingClientRect().height > 0);
  const lastBottom = Math.round(Math.max(...rows.map((e) => e.getBoundingClientRect().bottom)));
  const frame = host.closest(".pane-frame")?.getBoundingClientRect();
  return { lastContentBottom: lastBottom, ribbonTop, band: ribbonTop - lastBottom, frameBottom: frame && Math.round(frame.bottom) };
});
const transport = (page) => page.evaluate(() => {
  const out = {};
  for (const name of ["Reverse", "Preview"]) {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === name && b.getBoundingClientRect().width > 0);
    if (!btn) { out[name] = null; continue; }
    const svg = btn.querySelector("svg"); const word = [...btn.querySelectorAll("span")].find((s) => s.textContent.trim() === name);
    out[name] = { glyphFirst: !!(svg && word && (svg.compareDocumentPosition(word) & Node.DOCUMENT_POSITION_FOLLOWING)), buttonLeft: Math.round(btn.getBoundingClientRect().left), glyphLeft: svg && Math.round(svg.getBoundingClientRect().left), wordLeft: word && Math.round(word.getBoundingClientRect().left) };
  }
  return out;
});
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    try {
      for (const r of routes) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(HERE, `${r || "home"}-${w}-${scheme}.png`) });
        if (w === 1440 && ["cube", "amiga", "square", "easing", "spring"].includes(r)) rep[`transport-${r}-${scheme}`] = await transport(page);
      }
      if (w === 1440) {
        // KF-C9-04 — the empty Timeline's inline lead imports in one press.
        await setSurface(page, "cube", { selectedControl: "timeline", isTimelineExpanded: true });
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
        await page.screenshot({ path: path.join(HERE, `cube-timeline-empty-${w}-${scheme}.png`) });
        rep[`band-empty-${scheme}`] = await band(page);
        rep[`snapshot-glyph-${scheme}`] = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Snapshot"); const s = b?.querySelector("svg"); return b ? { buttonLeft: Math.round(b.getBoundingClientRect().left), glyphLeft: s && Math.round(s.getBoundingClientRect().left) } : null; });
        const before = await timelineState(page);
        const lead = page.locator("p:has-text('to edit here') + button, p:has-text('to edit here') ~ button").first();
        const leadText = (await lead.textContent())?.trim();
        await lead.click(); await page.waitForTimeout(1500); await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(HERE, `cube-timeline-imported-${w}-${scheme}.png`) });
        rep[`inline-lead-${scheme}`] = { leadText, before, after: await timelineState(page) };
        rep[`band-imported-${scheme}`] = await band(page);
        rep[`lead-imported-${scheme}`] = await page.evaluate(() => {
          const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Snapshot" && x.getBoundingClientRect().width > 0); if (!b) return null;
          const r = b.getBoundingClientRect(); const s = getComputedStyle(b); const rg = document.createRange(); rg.selectNodeContents(b); const c = rg.getBoundingClientRect();
          const row = b.parentElement; const labels = [...row.querySelectorAll("button span")].map((sp) => [sp.textContent.trim(), getComputedStyle(sp).position !== "absolute"]);
          return { emphasisLead: s.backgroundColor, rowWidth: row.getBoundingClientRect().width, padL: s.paddingLeft, padR: s.paddingRight, glyphToEdge: +(c.left - r.left).toFixed(2), wordToEdge: +(r.right - c.right).toFixed(2), contentBox: +(r.width - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight) - 2 * parseFloat(s.borderLeftWidth)).toFixed(2), contentWidth: +c.width.toFixed(2), quietLabelsShown: labels };
        });
        rep[`well-imported-${scheme}`] = await page.evaluate(async () => {
          const stage = document.querySelector(".timeline-preview-stage"); const subj = stage?.querySelector("[data-timeline-preview-subject]"); if (!subj) return null;
          const sr = stage.getBoundingClientRect(); const bw = parseFloat(getComputedStyle(stage).borderTopWidth);
          const pad = { top: sr.top + bw, bottom: sr.bottom - bw, left: sr.left + bw, right: sr.right - bw };
          let t = 1e9, bo = -1e9, l = 1e9, ri = -1e9, frames = 0; const t0 = performance.now();
          while (performance.now() - t0 < 6000) { await new Promise((r) => requestAnimationFrame(r)); frames++;
            for (const e of subj.querySelectorAll("*")) { const r = e.getBoundingClientRect(); if (!r.width) continue; t = Math.min(t, r.top); bo = Math.max(bo, r.bottom); l = Math.min(l, r.left); ri = Math.max(ri, r.right); } }
          return { frames, paddingBox: pad, painted: { top: t, bottom: bo, left: l, right: ri }, inside: t >= pad.top - 0.5 && bo <= pad.bottom + 0.5 && l >= pad.left - 0.5 && ri <= pad.right + 0.5, frameTransform: subj.parentElement.style.transform };
        });
        // KF-C9-03 — the ribbon Import keeps the paste dialog; its confirming glyph leads the word.
        await page.locator("button[aria-label^='Import CSS']").last().click(); await page.waitForTimeout(1200);
        rep[`dialog-${scheme}`] = await page.evaluate(() => {
          const d = document.querySelector("[role=dialog]"); if (!d) return null;
          const btn = [...d.querySelectorAll("button")].find((b) => /^Import$/.test(b.textContent.trim()));
          const svg = btn?.querySelector("svg"); const txt = btn && [...btn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
          let glyphFirst = null; if (svg && txt) glyphFirst = !!(svg.compareDocumentPosition(txt) & Node.DOCUMENT_POSITION_FOLLOWING);
          const cs = (e) => e && { size: getComputedStyle(e).fontSize, weight: getComputedStyle(e).fontWeight };
          const pane = [...document.querySelectorAll(".configurator-section-label")].find((e) => e.getBoundingClientRect().width > 0);
          return { titleType: cs(d.querySelector("h2")), descriptionType: cs(d.querySelector("p")), paneTitle: pane && { text: pane.textContent.trim(), ...cs(pane) }, title: d.querySelector("h2")?.textContent.trim(), confirm: btn?.textContent.trim(), glyphFirst, glyphLeft: svg && Math.round(svg.getBoundingClientRect().left), buttonLeft: btn && Math.round(btn.getBoundingClientRect().left) };
        });
        await page.screenshot({ path: path.join(HERE, `cube-import-dialog-${w}-${scheme}.png`) });
        await page.keyboard.press("Escape"); await page.waitForTimeout(600);
        await setSurface(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500); await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(HERE, `cube-controls-${w}-${scheme}.png`) });
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "capture.json"), JSON.stringify(rep, null, 1)); }

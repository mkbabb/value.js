// X-DS keyframes r9 pass 10 (critic C10): AFTER frames for the same cells as pass 9 (pass-61/): every route (1440/390, light/dark), the empty cube Timeline and after its one-press inline Import, the ribbon Import's paste dialog, and the cube controls pane. KF-C10-01: the transport row's Reverse and Preview glyphs lead their words (measured per scene at 1440). KF-C10-02: the stop count reads the markers TimelineTrack renders (`.keyframe-marker`, role slider) and their carets (`.timeline-caret`). Headless real Chrome (§0ei); one browser, a context per cell, closed in finally.
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
        rep[`snapshot-glyph-${scheme}`] = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Snapshot"); const s = b?.querySelector("svg"); return b ? { buttonLeft: Math.round(b.getBoundingClientRect().left), glyphLeft: s && Math.round(s.getBoundingClientRect().left) } : null; });
        const before = await timelineState(page);
        const lead = page.locator("p:has-text('to edit here') + button, p:has-text('to edit here') ~ button").first();
        const leadText = (await lead.textContent())?.trim();
        await lead.click(); await page.waitForTimeout(1500); await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(HERE, `cube-timeline-imported-${w}-${scheme}.png`) });
        rep[`inline-lead-${scheme}`] = { leadText, before, after: await timelineState(page) };
        // KF-C9-03 — the ribbon Import keeps the paste dialog; its confirming glyph leads the word.
        await page.locator("button[aria-label^='Import CSS']").last().click(); await page.waitForTimeout(1200);
        rep[`dialog-${scheme}`] = await page.evaluate(() => {
          const d = document.querySelector("[role=dialog]"); if (!d) return null;
          const btn = [...d.querySelectorAll("button")].find((b) => /^Import$/.test(b.textContent.trim()));
          const svg = btn?.querySelector("svg"); const txt = btn && [...btn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
          let glyphFirst = null; if (svg && txt) glyphFirst = !!(svg.compareDocumentPosition(txt) & Node.DOCUMENT_POSITION_FOLLOWING);
          return { title: d.querySelector("h2")?.textContent.trim(), confirm: btn?.textContent.trim(), glyphFirst, glyphLeft: svg && Math.round(svg.getBoundingClientRect().left), buttonLeft: btn && Math.round(btn.getBoundingClientRect().left) };
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

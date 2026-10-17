// X-DS keyframes r9 pass 9 (critic C9): AFTER frames for the same cells as pass 8 (pass-60/): every route (1440/390, light/dark), the empty cube Timeline at 1440 with its inline lead pressed (KF-C9-04: one press imports, no dialog), the ribbon Import's paste dialog (KF-C9-03: the glyph leads the word), and the cube controls pane's layer sub-pane (KF-C9-02, glass-cited). Headless real Chrome (§0ei); one browser, a context per cell, closed in finally.
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
  return { hintShown: !!hint, dialogOpen: !!dialog, dialogTitle: dialog?.querySelector("h2")?.textContent.trim() ?? null, stops: document.querySelectorAll("[data-keyframe-id], [data-stop-id], .timeline-stop").length };
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
      }
      if (w === 1440) {
        // KF-C9-04 — the empty Timeline's inline lead imports in one press.
        await setSurface(page, "cube", { selectedControl: "timeline", isTimelineExpanded: true });
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
        await page.screenshot({ path: path.join(HERE, `cube-timeline-empty-${w}-${scheme}.png`) });
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

// X-DS keyframes r9 pass 13 (critic C13): AFTER frames for every route (1440/390, light/dark) and the cube pane's three ribbon surfaces (Controls, Keyframes, Timeline empty and imported) at 1440 and 390. KF-C13-01: each surface's lead edge against the pane title's left edge. Headless real Chrome (§0ei); one browser, a context per cell, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), process.env.OUT ?? "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5198/";
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
  };
}, surface);
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
      await page.goto(`${BASE}#/cube`, { waitUntil: "load" });
      for (const [surface, patch] of [["controls", { selectedControl: "controls", isTimelineExpanded: false }], ["keyframes", { selectedControl: "keyframes", isTimelineExpanded: false }], ["timeline", { selectedControl: "timeline", isTimelineExpanded: true }]]) {
        await setSurface(page, "cube", patch);
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4000); await page.mouse.move(0, 0);
        const tag = surface === "timeline" ? "timeline-empty" : surface;
        await page.screenshot({ path: path.join(OUT, `cube-${tag}-${w}-${scheme}.png`) });
        rep[`${tag}-${w}-${scheme}`] = await edges(page, surface);
        if (surface === "timeline") {
          const lead = page.locator("p:has-text('to edit here') + button, p:has-text('to edit here') ~ button").first();
          if (await lead.count()) { await lead.click(); await page.waitForTimeout(1500); await page.mouse.move(0, 0); }
          await page.screenshot({ path: path.join(OUT, `cube-timeline-imported-${w}-${scheme}.png`) });
          rep[`timeline-imported-${w}-${scheme}`] = await edges(page, surface);
        }
      }
      await setSurface(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(OUT, "capture.json"), JSON.stringify(rep, null, 1)); }

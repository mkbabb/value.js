// X-DS keyframes r8 pass 8 cure seat: AFTER frames for the critic C8 cells (pass-52/capture.mjs re-pointed at pass-53/after/; BASE from env). Headless real Chrome (§0ei).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.join(path.dirname(fileURLToPath(import.meta.url)), "after"); fs.mkdirSync(HERE, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5193/";
const KEY = "animation-groups-control-options-store";
const routes = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setSurface = (page, scene, patch) => page.evaluate(([k, scene, patch]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, patch]);
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    try {
      for (const r of routes) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        await page.screenshot({ path: path.join(HERE, `${r || "home"}-${w}-${scheme}.png`) });
        // KF-C8-02 — the die's top/left edge, zoomed (the critic's cell: home 390, around (300,700)).
        if (w === 390 && (r === "" || r === "cube")) await page.screenshot({ path: path.join(HERE, `${r || "home"}-390-${scheme}-seam.png`), clip: { x: 200, y: 560, width: 190, height: 240 } });
        if (r === "easing") rep[`easing-drawer-${w}-${scheme}`] = await page.evaluate(() => {
          const d = document.querySelector(".catalogue-family")?.closest(".fading-scroll"); if (!d) return null;
          const b = d.getBoundingClientRect(); const fold = b.top + d.clientTop + d.clientHeight;
          const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => { const r = e.getBoundingClientRect(); return { kind: e.classList.contains("catalogue-family") ? "heading" : "tile", text: e.textContent.trim().slice(0, 18), top: Math.round(r.top), bottom: Math.round(r.bottom) }; });
          const above = rows.filter((x) => x.top < fold - 0.5);
          const last = above[above.length - 1];
          return { fold: Math.round(fold), maxBlockSize: d.style.maxBlockSize, lastAbove: last, orphanHeading: last?.kind === "heading" };
        });
      }
      if (w === 1440) {
        for (const surf of ["keyframes", "timeline"]) {
          await setSurface(page, "cube", { selectedControl: surf, isTimelineExpanded: surf === "timeline" });
          await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
          await page.screenshot({ path: path.join(HERE, `cube-${surf}-${w}-${scheme}.png`) });
        }
        await setSurface(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
        rep[`chevron-${scheme}`] = await page.evaluate(() => [...document.querySelectorAll("[role=combobox]")].map((b) => { const svg = b.querySelector("svg.lucide-chevron-down"); const anc = b.parentElement?.closest("[data-state=open]"); return { text: b.textContent.trim().slice(0, 24), state: b.getAttribute("data-state"), rot: svg ? getComputedStyle(svg).rotate + " | " + getComputedStyle(svg).transform : null, openAncestor: anc ? (anc.tagName + "." + String(anc.className).slice(0, 60)) : null }; }));
        await page.mouse.click(958, 70); await page.waitForTimeout(1200);
        await page.screenshot({ path: path.join(HERE, `cube-dock-open-${w}-${scheme}.png`) });
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "capture.json"), JSON.stringify(rep, null, 1)); }

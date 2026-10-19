// X-DS keyframes r8 pass 6 cure seat: AFTER frames for the critic C6c cells (pass-50/capture.mjs, re-pointed at pass-51/after/). Headless real Chrome (§0ei).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.join(path.dirname(fileURLToPath(import.meta.url)), "after"); fs.mkdirSync(HERE, { recursive: true });
const BASE = "http://localhost:5173/";
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

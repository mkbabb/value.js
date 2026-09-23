// probe: the animation dock's collapsed summary (mini progress + speed Metric) — geometry + computed style only
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const slug = readFileSync(OUT + "slug.txt", "utf8").trim();
const b = await chromium.launch({ headless: false }); const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3100/w/" + slug, { waitUntil: "networkidle" }); await page.locator(".play-control").waitFor(); await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const dock = document.querySelector(".controls-overlay .glass-dock"); const d = dock.getBoundingClientRect();
  const pick = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return { tag: el.tagName, cls: String(el.className).slice(0, 70), attrs: [...el.attributes].map((a) => a.name).filter((n) => n.startsWith("data-v")).join(","), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height), display: cs.display, bg: cs.backgroundColor, width: cs.width, color: cs.color, text: el.children.length ? "" : el.textContent.trim() }; };
  const sum = dock.querySelector("[aria-label='Expand dock']") || dock;
  return { dock: [Math.round(d.x), Math.round(d.width)], summaryHTML: sum.outerHTML.slice(0, 1500), nodes: [...sum.querySelectorAll("*")].slice(0, 20).map(pick),
    timelineCaret: (() => { const c = [...document.querySelectorAll(".controls-overlay *")].find((e) => /^t = /.test(e.textContent.trim()) && !e.children.length); if (!c) return null; const cs = getComputedStyle(c.parentElement); return { r: getComputedStyle(c).borderRadius, pr: cs.borderRadius, cls: c.className }; })() };
});
writeFileSync(OUT + "probe-summary.json", JSON.stringify(r, null, 1)); console.log(JSON.stringify(r, null, 1).slice(0, 5000)); await b.close();

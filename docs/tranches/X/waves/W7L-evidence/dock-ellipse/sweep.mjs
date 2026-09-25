// Width sweep: per viewport width, read every .dock-plate's four corner radii + its run's overflow.
// usage: node sweep.mjs <url> <label> <scheme> [widths csv]
import { chromium } from "playwright";
import fs from "node:fs";
const [url, label, scheme = "light", ws = "390,480,560,640,768,900,1024,1180,1280,1440"] = process.argv.slice(2);
const out = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const rows = [];
for (const w of ws.split(",").map(Number)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => [...document.querySelectorAll(".dock-plate")].map((p) => {
    const cs = getComputedStyle(p), d = p.closest(".glass-dock"), run = d?.querySelector(".dock-run"), b = p.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height), ss: cs.borderStartStartRadius, se: cs.borderStartEndRadius, es: cs.borderEndStartRadius, ee: cs.borderEndEndRadius,
      anim: cs.animationName, overflow: run ? run.scrollWidth - run.clientWidth : null, pitch: d ? getComputedStyle(d).getPropertyValue("--dock-pitch") : null, cls: d?.className };
  }));
  const ellip = r.some((x) => /%/.test(x.ss + x.se));
  if (ellip) { const b = await page.locator(".dock-plate").first().boundingBox(); if (b) await page.screenshot({ path: `${out}${label}-${w}.png`, clip: { x: Math.max(0, b.x - 20), y: Math.max(0, b.y - 20), width: b.width + 40, height: b.height + 40 } }); }
  rows.push({ w, plates: r });
  await ctx.close();
}
fs.writeFileSync(`${out}${label}-sweep.json`, JSON.stringify(rows, null, 1));
for (const { w, plates } of rows) for (const p of plates) console.log(w, `${p.w}x${p.h}`, "ss", p.ss, "se", p.se, "ovf", p.overflow, p.anim);
await browser.close();

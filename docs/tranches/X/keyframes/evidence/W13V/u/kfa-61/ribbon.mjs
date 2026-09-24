// SERVED MODEL: claude-opus-5-5
// KFA-61 · the scrub rail's paint on the served page: track / range / thumb computed tones + a crop frame.
// usage: node ribbon.mjs <tag>   (tag = before|after|after2)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false });
const out = [];
for (const [scene, scheme] of [["cube", "light"], ["cube", "dark"], ["amiga", "light"]]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
  const p = await ctx.newPage(); await p.goto(`http://localhost:5173/#/${scene}`); await p.waitForTimeout(4000);
  const probe = async () => p.evaluate(() => {
    const th = [...document.querySelectorAll('[role=slider][aria-label*="crub"]')].find((x) => x.offsetParent);
    if (!th) return null;
    const root = th.closest(".glass-slider"); const cs = (e) => e ? getComputedStyle(e) : null;
    const tr = root?.querySelector(".slider-track"), rg = root?.querySelector(".slider-range");
    const r = root.getBoundingClientRect();
    return { variant: root.getAttribute("data-variant"), now: th.getAttribute("aria-valuenow"), max: th.getAttribute("aria-valuemax"),
      track: cs(tr)?.backgroundColor, range: cs(rg)?.backgroundColor, rangeBgImg: cs(rg)?.backgroundImage?.slice(0, 80), rangeW: rg?.getBoundingClientRect().width,
      thumb: { bg: cs(th).backgroundColor, border: cs(th).borderTopColor + " " + cs(th).borderTopWidth, w: th.getBoundingClientRect().width, op: cs(th).opacity },
      box: { x: r.x, y: r.y, w: r.width, h: r.height } };
  });
  const a = await probe();
  if (a) await p.screenshot({ path: `${OUT}${scene}-${scheme}.png`, clip: { x: Math.max(0, a.box.x - 16), y: Math.max(0, a.box.y - 24), width: a.box.w + 32, height: a.box.h + 48 } });
  else await p.screenshot({ path: `${OUT}${scene}-${scheme}-full.png` });
  out.push({ scene, scheme, a }); await ctx.close();
}
fs.writeFileSync(OUT + "probe.json", JSON.stringify(out, null, 1));
for (const o of out) console.log(JSON.stringify(o));
await b.close();

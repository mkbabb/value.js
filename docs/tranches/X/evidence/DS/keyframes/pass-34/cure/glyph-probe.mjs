// X-DS keyframes r6 pass 9 (KF-C9-11) — the collapsed dock tile's scene glyph, per scene (headless real Chrome, §0ei).
import { createRequire } from "node:module"; import path from "node:path"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url)); const TAG = process.env.TAG ?? "before";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const s of ["cube", "amiga", "square", "easing", "spring", "sequence"]) {
    await page.goto(`http://localhost:5173/#/${s}`, { waitUntil: "load" }); await page.mouse.move(5, 890); await page.waitForTimeout(5000);
    const b = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button[aria-label=Scene]")].find((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && getComputedStyle(e).visibility !== "hidden"; });
      const g = btn?.querySelector(".dock-glyph"); const svg = g?.querySelector("svg");
      const kids = svg ? [...svg.querySelectorAll("circle,rect,path,ellipse,polygon,line")].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0) : [];
      const u = kids.reduce((a, r) => ({ l: Math.min(a.l, r.left), t: Math.min(a.t, r.top), r: Math.max(a.r, r.right), b: Math.max(a.b, r.bottom) }), { l: 1e9, t: 1e9, r: -1e9, b: -1e9 });
      const r = btn?.getBoundingClientRect(); const gr = g?.getBoundingClientRect();
      return { btn: r && [r.x, r.y, r.width, r.height].map(Math.round), glyph: gr && [Math.round(gr.width), Math.round(gr.height)], content: kids.length ? [Math.round(u.r - u.l), Math.round(u.b - u.t)] : null };
    });
    out[s] = b;
    if (b.btn) await page.screenshot({ path: path.join(HERE, `glyph-${TAG}-${s}.png`), clip: { x: b.btn[0] - 14, y: b.btn[1] - 14, width: b.btn[2] + 28, height: b.btn[3] + 28 } });
  }
} finally { await browser.close(); }
console.log(JSON.stringify(out));

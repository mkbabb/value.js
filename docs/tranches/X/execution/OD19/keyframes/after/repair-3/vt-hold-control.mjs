// C3-KF-03 control: a NULL View Transition (no DOM change) whose update callback
// holds HOLD ms, on a settled #/sequence page; screenshots taken during the hold.
// If a CDP capture inside the update window reads the bare background, the
// strip's blank frame is the capture of the render-suppressed VT window, not an
// empty consumer layer. Usage: KF_DIST=... node vt-hold-control.mjs <out>
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const { PNG } = createRequire("/Users/mkbabb/Programming/keyframes.js/package.json")("pngjs");
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const std = (buf) => { const p = PNG.sync.read(buf); let s = 0, s2 = 0; const n = p.width * p.height; for (let i = 0; i < p.data.length; i += 4) { const y = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; s += y; s2 += y * y; } const m = s / n; return Math.round(Math.sqrt(Math.max(0, s2 / n - m * m)) * 10) / 10; };
const server = process.env.KF_URL ? { url: process.env.KF_URL, close: async () => {} } : await serveDist(process.env.KF_DIST);
const res = [];
try {
  await withBrowser(async (browser) => {
    for (const hold of [0, 60, 150, 300]) {
      for (let run = 0; run < 3; run++) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
        try {
          const page = await ctx.newPage();
          await page.goto(`${server.url}/#/sequence`, { waitUntil: "load" });
          await page.waitForTimeout(3000);
          await page.evaluate((hold) => { window.__vt = document.startViewTransition(async () => { await new Promise((r) => setTimeout(r, hold)); }); }, hold);
          const strip = [];
          for (let i = 0; i < 4; i++) { const b = await page.screenshot(); strip.push(std(b)); if (run === 0) fs.writeFileSync(path.join(OUT, `vt-hold-${hold}-${i}.png`), b); }
          await page.evaluate(() => window.__vt.finished);
          res.push({ hold, run, strip });
        } finally { await ctx.close(); }
      }
    }
  }, { label: "vt-hold-control" });
} finally { await server.close(); }
fs.writeFileSync(path.join(OUT, "vt-hold.json"), JSON.stringify(res));
for (const r of res) console.log(JSON.stringify(r));

// C3-KF-03 control 2: the same null View Transition (update held HOLD ms), read
// by the compositor's PRESENTED frames (CDP Page.startScreencast) instead of a
// forced capture (Page.captureScreenshot). A blank presented frame would be a
// real flash; a blank forced capture alone is the capture of the suppressed window.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const { PNG } = createRequire("/Users/mkbabb/Programming/keyframes.js/package.json")("pngjs");
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const std = (buf) => { const p = PNG.sync.read(buf); let s = 0, s2 = 0; const n = p.width * p.height; for (let i = 0; i < p.data.length; i += 4) { const y = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; s += y; s2 += y * y; } const m = s / n; return Math.round(Math.sqrt(Math.max(0, s2 / n - m * m)) * 10) / 10; };
const server = await serveDist(process.env.KF_DIST);
const res = [];
try {
  await withBrowser(async (browser) => {
    for (const mode of ["null-vt-300", "home-pick"]) {
      for (let run = 0; run < 3; run++) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
        try {
          const page = await ctx.newPage();
          await page.goto(`${server.url}/#/sequence`, { waitUntil: "load" });
          await page.waitForTimeout(3000);
          const cdp = await ctx.newCDPSession(page);
          const frames = [];
          cdp.on("Page.screencastFrame", async (f) => { frames.push(std(Buffer.from(f.data, "base64"))); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
          if (mode === "home-pick") {
            const TOP = '[data-dock-tether="top"] .glass-dock';
            const dock = await page.locator(TOP).first().boundingBox();
            await page.mouse.move(dock.x + dock.width / 2, dock.y + 28); await page.waitForTimeout(700);
            await page.locator(`${TOP} [aria-label="Scene"]`).first().click(); await page.waitForTimeout(600);
          }
          await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
          await page.waitForTimeout(300);
          const n0 = frames.length;
          if (mode === "home-pick") await page.getByRole("option", { name: "Home" }).first().click();
          else await page.evaluate(() => { window.__vt = document.startViewTransition(async () => { await new Promise((r) => setTimeout(r, 300)); }); });
          await page.waitForTimeout(1500);
          await cdp.send("Page.stopScreencast");
          res.push({ mode, run, before: frames.slice(0, n0).length, after: frames.slice(n0), minAfter: Math.min(...frames.slice(n0)) });
        } finally { await ctx.close(); }
      }
    }
  }, { label: "vt-hold-screencast" });
} finally { await server.close(); }
fs.writeFileSync(path.join(OUT, "vt-screencast.json"), JSON.stringify(res));
for (const r of res) console.log(JSON.stringify({ mode: r.mode, run: r.run, frames: r.after.length, minStd: r.minAfter, first: r.after.slice(0, 6) }));

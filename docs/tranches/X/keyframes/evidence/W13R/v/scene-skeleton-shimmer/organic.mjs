// Organic reach (no module hold): fresh context, cache disabled, optional CDP throttle.
// Records the <Suspense> fallback's real lifetime + the sheen's transform while it lives.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const D = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const out = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain | wc -l"), runs: [] };
const browser = await chromium.launch({ headless: false });
for (const [label, thr] of [["unthrottled", null], ["fast3g", { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 }], ["slow3g", { offline: false, latency: 400, downloadThroughput: 500e3 / 8, uploadThroughput: 500e3 / 8 }]]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable"); await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (thr) await cdp.send("Network.emulateNetworkConditions", thr);
  const fails = []; page.on("response", (r) => { if (r.status() >= 400) fails.push(`${r.status()} ${r.url()}`); });
  await page.addInitScript(() => {
    window.__sk = { mount: null, unmount: null, samples: [] };
    new MutationObserver(() => { const el = document.querySelector(".scene-skeleton__sheen"); const now = performance.now();
      if (el && window.__sk.mount == null) { window.__sk.mount = now; const f = () => { const e = document.querySelector(".scene-skeleton__sheen"); if (!e) return;
          window.__sk.samples.push([Math.round(performance.now()), getComputedStyle(e, "::after").transform]); requestAnimationFrame(f); }; requestAnimationFrame(f); }
      if (!el && window.__sk.mount != null && window.__sk.unmount == null) window.__sk.unmount = now;
    }).observe(document, { childList: true, subtree: true });
  });
  const frames = []; cdp.on("Page.screencastFrame", async (f) => { frames.push(f); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
  await page.goto("http://localhost:5173/#/spring", { waitUntil: "commit", timeout: 120000 });
  await page.waitForFunction(() => window.__sk && window.__sk.unmount != null, null, { timeout: 120000 }).catch(() => {});
  await page.waitForTimeout(800); await cdp.send("Page.stopScreencast");
  const sk = await page.evaluate(() => window.__sk);
  const w = await page.evaluate(() => document.querySelector(".scene-host")?.getBoundingClientRect().width || 0);
  // band visible when translate lies in roughly (-0.76w, 0.76w) (measured from seek frames f14..f34)
  const vis = sk.samples.filter(([, t]) => { const m = /matrix\(1, 0, 0, 1, (-?[\d.]+)/.exec(t); return m && Math.abs(+m[1]) < 0.76 * 1255; });
  const run = { label, mountMs: sk.mount && Math.round(sk.mount), unmountMs: sk.unmount && Math.round(sk.unmount), lifeMs: sk.mount && sk.unmount && Math.round(sk.unmount - sk.mount), samples: sk.samples.length, bandVisibleSamples: vis.length, firstBandMs: vis[0] ? vis[0][0] - Math.round(sk.mount) : null, fails: fails.slice(0, 5), screencast: frames.length };
  const dir = `${D}organic/${label}`; fs.mkdirSync(dir, { recursive: true }); const T0 = frames[0]?.metadata.timestamp || 0;
  frames.forEach((f, k) => fs.writeFileSync(`${dir}/s${String(k).padStart(4, "0")}_${Math.round((f.metadata.timestamp - T0) * 1000)}ms.png`, Buffer.from(f.data, "base64")));
  out.runs.push(run); console.log(JSON.stringify(run)); await ctx.close();
}
out.khead2 = kf("rev-parse --short HEAD"); fs.writeFileSync(`${D}organic/meta.json`, JSON.stringify(out, null, 1)); await browser.close();

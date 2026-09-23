// Pass 1: cold-load #/cube in a fresh (empty-storage) headed context; log loader presence + screencast.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const dir = OUT + "pass1/"; fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.addInitScript(() => {
  const log = (window.__loaderLog = []);
  const t0 = performance.now();
  const check = (src) => {
    const el = document.querySelector("svg.animate-spin");
    const present = !!el;
    const last = log[log.length - 1];
    if (!last || last.present !== present) {
      let info = null;
      if (el) {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        info = { rect: [r.x, r.y, r.width, r.height].map(Math.round), transform: cs.transform, animation: cs.animationName + " " + cs.animationDuration + " " + cs.animationPlayState, opacity: cs.opacity, vis: cs.visibility, cls: el.getAttribute("class"), anims: el.getAnimations().map(a => [a.animationName, a.playState, a.currentTime]) };
      }
      log.push({ t: +(performance.now()).toFixed(1), src, present, info, selected: (() => { try { return JSON.parse(localStorage.getItem("animation-groups-control-options-store") || "{}")?.cube?.selectedAnimation; } catch { return "?"; } })() });
    }
  };
  new MutationObserver(() => check("mo")).observe(document, { subtree: true, childList: true, attributes: true });
  const raf = () => { check("raf"); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
});
const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(()=>{}); });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
const tNav = Date.now() / 1000;
await page.goto("http://localhost:5173/#/cube", { waitUntil: "commit" });
await page.waitForTimeout(6000);
await cdp.send("Page.stopScreencast");
const log = await page.evaluate(() => window.__loaderLog);
const ls = await page.evaluate(() => localStorage.getItem("animation-groups-control-options-store"));
const now = await page.evaluate(() => ({ loader: !!document.querySelector("svg.animate-spin"), cube: !!document.querySelector(".cube"), hash: location.hash }));
frames.forEach((f, i) => fs.writeFileSync(dir + `f${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
fs.writeFileSync(dir + "frames.json", JSON.stringify(frames.map((f, i) => ({ i, dt: +(f.ts - tNav).toFixed(3) })), null, 0));
fs.writeFileSync(dir + "log.json", JSON.stringify({ log, ls, now }, null, 1));
console.log(JSON.stringify({ nframes: frames.length, log, now, ls: ls && ls.slice(0, 300) }, null, 1));
await browser.close();

// E2/F2/G2 — transport wiring on a fresh load: Play (screencast + rAF), Reverse, scrub-while-paused (24 positions).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const CLIP = { x: 72, y: 130, width: 1300, height: 580 };
for (const d of ["E2_play", "G2_scrub"]) fs.mkdirSync(OUT + d, { recursive: true });
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
const meta = { khead0: khead() };
await p.evaluate(() => {
  window.__log = []; window.__on = false; window.__mut = 0;
  new MutationObserver(ms => { window.__mut += ms.length; }).observe(document.querySelector(".keyframes-editor-scroll"), { subtree: true, attributes: true, childList: true, characterData: true });
  const sl = () => document.querySelector('[role=slider][aria-label="Scrub animation timeline"]');
  const tick = (now) => { if (window.__on) window.__log.push({ t: +now.toFixed(1), scrub: +(+sl()?.getAttribute("aria-valuenow")).toFixed(1), sampler: +document.querySelector(".sampler-ball").getBoundingClientRect().x.toFixed(2), pb: +new DOMMatrix(getComputedStyle(document.querySelector(".preset-ball")).transform).e.toFixed(2), rev: window.__rev || 0 }); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
const cdp = await ctx.newCDPSession(p);
const frames = [];
cdp.on("Page.screencastFrame", async e => { frames.push({ ts: e.metadata.timestamp, data: e.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: e.sessionId }); } catch {} });
await p.evaluate(() => { window.__log = []; window.__on = true; });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await p.waitForTimeout(200);
await p.click('button[aria-label="Play animation"] >> visible=true');
await p.waitForTimeout(3200);
await cdp.send("Page.stopScreencast");
meta.editorMutationsDuringPlay = await p.evaluate(() => window.__mut);
meta.animsDuringPlay = await p.evaluate(() => document.getAnimations().map(a => (a.animationName || a.transitionProperty) + "@" + (a.effect?.target?.className?.toString() || "").slice(0, 24)));
// Reverse (ribbon button, JS click — no scroll), keep logging
await p.evaluate(() => { window.__rev = 1; [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Reverse" && b.getBoundingClientRect().width)?.click(); });
await p.waitForTimeout(1500);
meta.reversePressed = await p.evaluate(() => [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Reverse")?.getAttribute("aria-pressed"));
const log = await p.evaluate(() => { window.__on = false; return window.__log; });
fs.writeFileSync(OUT + "E2_play/rafLog.json", JSON.stringify(log));
const t0 = frames[0].ts; frames.forEach((f, i) => fs.writeFileSync(`${OUT}E2_play/f${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
fs.writeFileSync(OUT + "E2_play/frames.json", JSON.stringify(frames.map((f, i) => ({ i, ms: +((f.ts - t0) * 1000).toFixed(1) }))));
const play = log.filter(r => !r.rev); const d = play.slice(1).map((r, i) => r.t - play[i].t).filter(x => x > 0);
meta.raf = { n: d.length, over20: d.filter(x => x > 20).length, max: Math.max(...d) };
const pre = log.filter(r => !r.rev).slice(-20).map(r => r.scrub), post = log.filter(r => r.rev).slice(5, 40).map(r => r.scrub);
meta.scrubBeforeReverse = pre.slice(-6); meta.scrubAfterReverse = post.slice(0, 12);
meta.frames = frames.length; meta.khead1 = khead();
// pause via dock (now expanded)
await p.click('button[aria-label="Pause animation"] >> visible=true'); await p.waitForTimeout(400);
meta.pausedOk = await p.evaluate(() => !![...document.querySelectorAll('button[aria-label="Play animation"]')].find(b => b.getBoundingClientRect().width && getComputedStyle(b).visibility !== "hidden"));
// G2 — scrub while paused: 24 positions through the scrubber slider (the transport's scrubTo seam)
await p.evaluate(() => document.querySelector('[role=slider][aria-label="Scrub animation timeline"]').focus({ preventScroll: true }));
await p.keyboard.press("Home"); await p.waitForTimeout(100);
const g = [];
for (let i = 0; i < 24; i++) {
  const s = await p.evaluate(() => { const sl = document.querySelector('[role=slider][aria-label="Scrub animation timeline"]'); return { scrub: sl.getAttribute("aria-valuenow"), max: sl.getAttribute("aria-valuemax"), sampler: +document.querySelector(".sampler-ball").getBoundingClientRect().x.toFixed(1), readout: document.querySelector(".readout-accent")?.innerText, editorMut: window.__mut }; });
  await p.screenshot({ path: `${OUT}G2_scrub/f${String(i).padStart(3, "0")}.png`, clip: CLIP });
  g.push({ i, ...s });
  for (let k = 0; k < 6; k++) await p.keyboard.press("ArrowRight");
  await p.waitForTimeout(50);
}
fs.writeFileSync(OUT + "G2_scrub/frames.json", JSON.stringify({ frames: g.map(x => ({ ...x, t: x.scrub })) }, null, 1));
meta.scrub = g.map(x => x.scrub + ":" + (x.sampler | 0) + ":" + x.readout).join(" ");
meta.khead2 = khead();
fs.writeFileSync(OUT + "meta-transport.json", JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta, null, 1));
await b.close();

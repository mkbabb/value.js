// Transport wiring probes for the reel — each scenario on a FRESH page load, headed Chromium, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
const D = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/sequence-reel-egg";
const K = "/Users/mkbabb/Programming/keyframes.js";
const out = { khead: execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim(), runs: {} };
const b = await chromium.launch({ headless: false });
const snap = (p) => p.evaluate(() => { const t = document.body.innerText;
  const btn = document.querySelector('[aria-label^="Play the reel"]');
  const dock = [...document.querySelectorAll('button[aria-label="Play animation"],button[aria-label="Pause animation"]')].find(x => x.getBoundingClientRect().width === 40);
  return { t: Math.round(performance.now()), clock: t.match(/CLOCK\s*([\d.]+)/)?.[1], master: t.match(/MASTER CLOCK\s*([\d.]+)/)?.[1],
    status: t.match(/\b(READY|PLAYING|PAUSED|DONE|ENDED|IDLE|SETTLED)\b/)?.[1], dock: dock?.getAttribute("aria-label"),
    reelBusy: btn?.getAttribute("data-loading") ?? btn?.getAttribute("aria-busy"),
    p: [...document.querySelectorAll(".seq-ball")].map(e => +(+getComputedStyle(e).getPropertyValue("--ball-p")).toFixed(3)) }; });
const scen = async (name, steps) => {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" }); await p.waitForTimeout(2200);
  const log = []; const mark = async (label) => log.push({ label, ...(await snap(p)) });
  const reel = () => p.locator('[aria-label^="Play the reel"]').click();
  const play = async () => { const bs = await p.$$('button[aria-label="Play animation"], button[aria-label="Pause animation"]');
    for (const h of bs) { const r = await h.boundingBox(); if (r && r.width === 40 && r.y > 700) { await p.mouse.click(r.x + 20, r.y + 20); return; } } throw new Error("no dock play"); };
  const scrubTo = async (x) => { await p.mouse.move(386, 645); await p.mouse.down(); await p.mouse.move(x, 645, { steps: 8 }); await p.mouse.up(); };
  await mark("start");
  await steps({ p, mark, reel, play, scrubTo, w: (ms) => p.waitForTimeout(ms) });
  if (name === "T3-held-play") await p.screenshot({ path: `${D}/T3-end.png`, clip: { x: 370, y: 215, width: 710, height: 620 } });
  out.runs[name] = log; await p.close();
};
await scen("T1-play-baseline", async ({ mark, play, w }) => { await play(); await w(100); await mark("play+100"); await w(700); await mark("play+800"); await w(800); await mark("play+1600"); });
await scen("T2-reel-then-play", async ({ mark, reel, play, w }) => { await reel(); await w(1900); await mark("reel settled"); await play(); await w(100); await mark("play+100"); await w(700); await mark("play+800"); await w(800); await mark("play+1600"); });
await scen("T3-held-play", async ({ mark, reel, play, w }) => { await reel(); await w(200); await play(); await mark("play pressed mid-reel"); await w(600); await mark("mid-reel+800"); await w(1100); await mark("reel settled (+1900)"); await w(700); await mark("+2600"); await w(700); await mark("+3300"); });
await scen("T4-scrub-then-play", async ({ mark, play, scrubTo, w }) => { await scrubTo(720); await w(300); await mark("scrubbed"); await play(); await w(100); await mark("play+100"); await w(700); await mark("play+800"); });
await scen("T5-scrub-reel-play", async ({ mark, reel, play, scrubTo, w }) => { await scrubTo(720); await w(300); await mark("scrubbed"); await reel(); await w(1900); await mark("reel settled"); await play(); await w(100); await mark("play+100"); await w(700); await mark("play+800"); });
await scen("T6-reel-while-playing", async ({ mark, reel, play, scrubTo, w }) => { await play(); await w(400); await mark("playing"); await reel(); await w(100); await mark("reel+100"); await scrubTo(900); await mark("scrub attempt mid-reel"); await w(1900); await mark("reel settled"); await w(800); await mark("+800"); });
writeFileSync(`${D}/transport.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out.runs)) { console.log("== " + k); for (const r of v) console.log(`  ${r.label.padEnd(24)} clk=${r.clock} m=${r.master} st=${r.status} dock=${r.dock} busy=${r.reelBusy} p=${r.p.join(",")}`); }
console.log(out.khead, out.kdirty);
await b.close();

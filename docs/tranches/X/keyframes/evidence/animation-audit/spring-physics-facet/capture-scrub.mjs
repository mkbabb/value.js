// G2 — scrub while PAUSED (fresh load, never played): 24 positions via the transport scrubber (the scrubTo seam).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const CLIP = { x: 72, y: 130, width: 1300, height: 580 };
fs.rmSync(OUT + "G2_scrub", { recursive: true, force: true }); fs.mkdirSync(OUT + "G2_scrub", { recursive: true });
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
await p.evaluate(() => { window.__mut = 0; window.__mrec = []; new MutationObserver(ms => { window.__mut += ms.length; if (window.__mrec.length < 40) ms.forEach(m => window.__mrec.push(m.type + ":" + (m.attributeName || "") + ":" + (m.target.className?.toString?.() || m.target.nodeName).slice(0, 40) + ":" + (m.oldValue||""))); }).observe(document.querySelector(".keyframes-editor-scroll"), { subtree: true, attributes: true, childList: true, characterData: true }); document.querySelector('[role=slider][aria-label="Scrub animation timeline"]').focus({ preventScroll: true }); });
const st = () => p.evaluate(() => { const sl = document.querySelector('[role=slider][aria-label="Scrub animation timeline"]'); return { scrub: +(+sl.getAttribute("aria-valuenow")).toFixed(1), sampler: +document.querySelector(".sampler-ball").getBoundingClientRect().x.toFixed(1), readout: document.querySelector(".readout-accent")?.innerText, editorMut: window.__mut, playing: !!document.querySelector('button[aria-label="Pause animation"]'), active: document.activeElement?.getAttribute("aria-label") }; });
const probe = [await st()];
await p.keyboard.press("ArrowRight"); probe.push(await st());
await p.keyboard.press("PageUp"); probe.push(await st());
await p.keyboard.press("Home"); probe.push(await st());
const g = [];
for (let i = 0; i < 26; i++) {
  const s = await st();
  await p.screenshot({ path: `${OUT}G2_scrub/f${String(i).padStart(3, "0")}.png`, clip: CLIP });
  g.push({ i, t: s.scrub, ...s });
  await p.keyboard.press("ArrowRight"); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(60);
}
fs.writeFileSync(OUT + "G2_scrub/frames.json", JSON.stringify({ probe, frames: g }, null, 1));
console.log(khead(), JSON.stringify(probe)); console.log(g.map(x => x.scrub + ":" + (x.sampler | 0) + ":" + x.readout + ":" + x.editorMut + ":" + x.playing).join(" "));
console.log(JSON.stringify(await p.evaluate(() => [...new Set(window.__mrec)])));
await b.close();

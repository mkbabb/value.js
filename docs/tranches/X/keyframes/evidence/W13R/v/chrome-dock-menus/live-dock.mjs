// Real-time (method 3) — CDP Page.startScreencast everyNthFrame 1: what the dock does
// after a menu closes with the pointer resting on the dock, vs a pointer that never
// opened a menu, vs a plain pointer-leave collapse.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname + "live-dock/";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const k = () => ({ head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(), at: new Date().toISOString() });
const b = await chromium.launch({ headless: false });
const res = {};
async function run(name, script, ms = 4500) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const cdp = await p.context().newCDPSession(p);
  await p.mouse.move(720, 71); await p.waitForTimeout(1300);
  await script(p, "pre");
  const dir = OUT + name; fs.mkdirSync(dir, { recursive: true });
  const frames = [];
  cdp.on("Page.screencastFrame", async (f) => {
    frames.push({ ts: f.metadata.timestamp, data: f.data });
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await p.evaluate(() => { window.__log = []; const t0 = performance.now(); const d = document.querySelector('[data-dock-tether="top"] .glass-dock'); let last = performance.now(); const f = (t) => { const r = d.getBoundingClientRect(); const items = [...d.querySelectorAll('.dock-layer--full button, .dock-layer--full [role=combobox]')].map(e => e.getBoundingClientRect()); const maxY = Math.max(0, ...items.map(q => q.bottom)); window.__log.push({ t: +(t - t0).toFixed(1), dt: +(t - last).toFixed(1), c: d.className.includes("collapsed") ? "C" : "E", w: +r.width.toFixed(1), h: +r.height.toFixed(1), itemsMaxBottom: +maxY.toFixed(1) }); last = t; if (t - t0 < 5000) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, everyNthFrame: 1 });
  const t0 = Date.now();
  await script(p, "go");
  await p.waitForTimeout(Math.max(0, ms - (Date.now() - t0)));
  await cdp.send("Page.stopScreencast");
  const log = await p.evaluate(() => window.__log);
  const ts0 = frames[0]?.ts ?? 0;
  frames.forEach((f, i) => fs.writeFileSync(`${dir}/s${String(i).padStart(3, "0")}_${((f.ts - ts0) * 1000).toFixed(0)}ms.jpg`, Buffer.from(f.data, "base64")));
  // compress log: state transitions + spill
  const trans = log.filter((e, i) => i === 0 || e.c !== log[i - 1].c);
  const spill = log.filter((e) => e.itemsMaxBottom > 110);
  res[name] = { k: k(), frames: frames.length, transitions: trans, spillFrames: spill.length, spillFirst: spill[0], spillLast: spill.at(-1), spillMaxBottom: Math.max(0, ...spill.map((e) => e.itemsMaxBottom)), drops: log.filter((e) => e.dt > 20).map((e) => [e.t, e.dt]).slice(0, 20), n: log.length };
  await p.close();
}
// A: pointer rests on the Scene trigger; open the select, Escape, pointer never moves.
await run("A-escape-pointer-still", async (p, ph) => {
  if (ph === "pre") { await p.locator('[aria-label="Scene"][role=combobox]').click(); await p.waitForTimeout(700); }
  else { await p.keyboard.press("Escape"); }
});
// B: control — pointer rests on the same trigger, no menu ever opened.
await run("B-control-pointer-still", async (p, ph) => {
  if (ph === "pre") { const bb = await p.locator('[aria-label="Scene"][role=combobox]').boundingBox(); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(500); }
});
// C: plain pointer-leave collapse (the collapse the menu close hands off to).
await run("C-pointer-leave-collapse", async (p, ph) => { if (ph === "go") await p.mouse.move(720, 600, { steps: 4 }); });
await b.close();
fs.writeFileSync(OUT + "live-dock.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));

// spring-live-solver — frame-by-frame audit (method 3: CDP screencast every frame + per-rAF DOM probe).
// HEADED Chromium, real GPU, 1440x900 @1x. READ-ONLY on the served page.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = () => ({ head: execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim(),
  dirty: +execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain | wc -l").toString().trim() });
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

await page.evaluate(() => {
  window.__probe = { on: false, rows: [] };
  const q = (s) => document.querySelector(s);
  const tx = (el) => { if (!el) return null; const m = getComputedStyle(el).transform; if (m === "none") return 0; const p = m.match(/matrix\(([^)]+)\)/); return p ? +p[1].split(",")[4] : m; };
  const tick = (now) => {
    if (window.__probe.on) {
      const ball = q(".spring-ball"), mk = q(".spring-target-marker"), sb = q(".sampler-ball");
      const cs = getComputedStyle(ball);
      window.__probe.rows.push({ t: +now.toFixed(2),
        ballTf: ball.style.transform, ballTx: tx(ball), ballX: +ball.getBoundingClientRect().x.toFixed(3),
        mkTx: tx(mk), mkX: +mk.getBoundingClientRect().x.toFixed(3), mkAnim: mk.getAnimations().map((a) => a.animationName + ":" + a.playState).join(","),
        mkBorder: getComputedStyle(mk).borderTopColor, mkFilter: getComputedStyle(mk).filter,
        sampX: tx(sb), badge: q(".status-badge")?.textContent.trim(), x: q(".spring-readout-primary")?.textContent,
        live: q(".spring-target").classList.contains("spring-target--live"), wc: cs.willChange, op: cs.opacity, z: cs.zIndex,
        mkOp: getComputedStyle(mk).opacity, ballFilter: cs.filter, ballShadow: cs.boxShadow.slice(0, 60) });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

const rail = await page.locator(".spring-rail").boundingBox();
const railPt = (r) => ({ x: rail.x + r * rail.width, y: rail.y + rail.height / 2 });
const meta = { kf0: kf(), rail, scenarios: {} };

async function record(name, action, ms) {
  const dir = OUT + name + "/"; mkdirSync(dir, { recursive: true });
  const frames = [];
  const onFrame = async ({ data, metadata, sessionId }) => {
    frames.push({ ts: metadata.timestamp, data });
    try { await cdp.send("Page.screencastFrameAck", { sessionId }); } catch {}
  };
  cdp.on("Page.screencastFrame", onFrame);
  await page.evaluate(() => { window.__probe.rows = []; window.__probe.on = true; });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
  await page.waitForTimeout(150);
  const tAct = await page.evaluate(() => performance.now());
  await action();
  await page.waitForTimeout(ms);
  await cdp.send("Page.stopScreencast");
  cdp.off("Page.screencastFrame", onFrame);
  const rows = await page.evaluate(() => { window.__probe.on = false; return window.__probe.rows; });
  const t0 = frames[0]?.ts ?? 0;
  frames.forEach((f, i) => writeFileSync(dir + `f${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
  writeFileSync(dir + "frames.json", JSON.stringify(frames.map((f, i) => ({ i, dtMs: +((f.ts - t0) * 1000).toFixed(1) }))));
  writeFileSync(dir + "probe.json", JSON.stringify({ tAct, rows }));
  meta.scenarios[name] = { frames: frames.length, probeRows: rows.length, kf: kf() };
  console.log(name, "frames", frames.length, "rows", rows.length);
}

// A: rest — fresh load, nothing touched (is the "tracking" badge honest?)
await record("A-rest", async () => {}, 1500);
// B: tap at 30% of the rail (default smooth preset)
await record("B-tap-030", async () => { const p = railPt(0.30); await page.mouse.click(p.x, p.y); }, 2200);
// C: tap at 90%
await record("C-tap-090", async () => { const p = railPt(0.90); await page.mouse.click(p.x, p.y); }, 2200);
// D: bouncy preset, then tap at 15% (overshoot/ring)
await page.getByRole("button", { name: /bouncy/i }).first().click();
await page.waitForTimeout(400);
await record("D-bouncy-tap-015", async () => { const p = railPt(0.15); await page.mouse.click(p.x, p.y); }, 2800);
// E: drag along the rail 0.15 -> 0.85 over ~800ms, release
await record("E-drag", async () => {
  const a = railPt(0.15), b = railPt(0.85);
  await page.mouse.move(a.x, a.y); await page.mouse.down();
  for (let i = 1; i <= 40; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 40, a.y); await page.waitForTimeout(20); }
  await page.mouse.up();
}, 2500);
// F: transport Play — 3 s live playback (sampler sweep + rAF deltas)
await record("F-play", async () => { await page.getByRole("button", { name: /^play$/i }).first().click(); }, 3000);
// G: tap while playing
await record("G-tap-while-playing", async () => { const p = railPt(0.25); await page.mouse.click(p.x, p.y); }, 2200);
// H: pause, then tap while paused (chase-intent must still run)
await page.getByRole("button", { name: /^pause$/i }).first().click().catch((e) => console.log("pause btn", e.message.slice(0, 80)));
await page.waitForTimeout(300);
await record("H-tap-while-paused", async () => { const p = railPt(0.80); await page.mouse.click(p.x, p.y); }, 2200);
// I: reset button
await record("I-reset", async () => { await page.getByRole("button", { name: /^reset animation$|^reset$/i }).first().click().catch(() => {}); }, 1200);
meta.kf1 = kf();
writeFileSync(OUT + "meta.json", JSON.stringify(meta, null, 1));
await page.screenshot({ path: OUT + "99-end.png" });
await browser.close();

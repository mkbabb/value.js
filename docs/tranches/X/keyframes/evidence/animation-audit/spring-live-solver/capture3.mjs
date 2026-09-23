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
await page.addInitScript(() => { window.__loaf = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push({ start: +e.startTime.toFixed(0), dur: +e.duration.toFixed(0), block: +(e.blockingDuration||0).toFixed(0), render: e.renderStart ? +(e.startTime + e.duration - e.renderStart).toFixed(0) : null, styleLayout: e.styleAndLayoutStart ? +(e.startTime + e.duration - e.styleAndLayoutStart).toFixed(0) : null, scripts: (e.scripts||[]).map((s) => `${(s.sourceFunctionName||s.invoker||"").slice(0,50)}@${(s.sourceURL||"").split("/").slice(-2).join("/")}:${s.sourceCharPosition} ${s.duration.toFixed(0)}ms fsl=${(s.forcedStyleAndLayoutDuration||0).toFixed(0)}`) }); }).observe({ type: "long-animation-frame", buffered: true }); } catch (e) {} });
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


const pill = async (label) => { const b = page.locator(`button[aria-label="${label}"]`).filter({ visible: true }); const n = await b.count(); for (let i = 0; i < n; i++) { const bb = await b.nth(i).boundingBox(); if (bb && bb.width >= 40) { await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); return label + "@" + Math.round(bb.x); } } return "miss:" + label; };
const tapRail = async (r) => { await page.evaluate(() => scrollTo(0, 0)); const bb = await page.locator(".spring-rail").boundingBox(); await page.mouse.click(bb.x + r * bb.width, bb.y + bb.height / 2); return Math.round(bb.y); };
await page.waitForTimeout(3000); // pre-sample for LoAF at rest
await page.mouse.click(625, 793); await page.waitForTimeout(3000);
console.log("pill labels while playing", await page.evaluate(() => [...document.querySelectorAll("button")].filter((b) => { const r = b.getBoundingClientRect(); return r.y > 740 && r.y < 800 && r.x > 550 && r.x < 860; }).map((b) => b.getAttribute("aria-label"))));
await record("H3-pause-then-tap", async () => { await page.mouse.click(625, 793); await page.waitForTimeout(300); console.log("railY", await tapRail(0.80)); }, 2200);
await record("J-scrub-panel", async () => {
  await page.evaluate(() => document.querySelector('[aria-label="Scrub animation timeline"]').scrollIntoView({ block: "center" })); await page.waitForTimeout(200); const s = page.getByRole("slider", { name: "Scrub animation timeline" }); const bb = await s.boundingBox();
  const track = await page.evaluate(() => { const t = document.querySelector('[aria-label="Scrub animation timeline"]').closest("[data-orientation],span,div").parentElement.getBoundingClientRect(); return { x: t.x, w: t.width }; });
  await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down();
  for (let i = 1; i <= 30; i++) { await page.mouse.move(bb.x + bb.width / 2 + i * 10, bb.y + bb.height / 2); await page.waitForTimeout(25); }
  await page.mouse.up(); console.log("scrub track", JSON.stringify(track), "scrollY", await page.evaluate(() => scrollY));
}, 800);
await record("K-reseat-verb", async () => { await page.getByRole("button", { name: "Re-seat" }).click(); }, 2200);
await record("L-reset-pill", async () => { await page.evaluate(() => { scrollTo(0, 0); document.querySelectorAll("*").forEach((e) => { if (e.scrollTop) e.scrollTop = 0; }); }); console.log(await pill("Reset animation")); }, 1500);
meta.kf1 = kf();
meta.loaf = await page.evaluate(() => window.__loaf.filter((e) => e.dur > 50));
writeFileSync(OUT + "meta2.json", JSON.stringify(meta, null, 1));
await browser.close();

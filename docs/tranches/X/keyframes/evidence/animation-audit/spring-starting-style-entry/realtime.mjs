// Real-time pass: CDP screencast (everyNthFrame 1) over Reveal/Dismiss cycles + a mid-flight reversal,
// rAF-delta jank sampling, layout-shift/hit-test during the exit tail, and transport wiring (dock Play/Pause/Reset).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const D = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/spring-starting-style-entry";
const SC = `${D}/R-screencast`; fs.mkdirSync(SC, { recursive: true });
const out = {};
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const dockLabel = () => page.evaluate(() => [...document.querySelectorAll('[aria-label="Pause animation"],[aria-label="Play animation"]')].map(b => b.getAttribute("aria-label") + (b.offsetParent ? "" : "(hidden)")));
out.dockBeforeSelect = await dockLabel();
const sel = page.locator('[aria-label="Select animation"]');
const bb = await sel.boundingBox();
await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(800);
await sel.click(); await page.waitForTimeout(800);
await page.getByRole("option", { name: "Entry" }).click();
await page.waitForTimeout(1200);
out.dockAfterSelect = await dockLabel();
await page.mouse.move(700, 150); await page.waitForTimeout(600);
// geometry of stage + the in-card button, open state
const geo = () => page.evaluate(() => { const c = document.querySelector(".discrete-card"); const st = c.parentElement; const stage = c.closest('[data-slot="card"]'); const b = [...stage.querySelectorAll("button")].find(b => /Reveal|Dismiss/.test(b.textContent)); return { stageH: st.getBoundingClientRect().height, cardH: c.getBoundingClientRect().height, btnY: b.getBoundingClientRect().y, cardDisp: getComputedStyle(c).display }; });
out.geoOpen = await geo();
// screencast
const cdp = await page.context().newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
// in-page rAF delta + card-style sampler
await page.evaluate(() => { window.__s = []; window.__stop = false; const c0 = performance.now(); let last = c0; const loop = (now) => { const c = document.querySelector(".discrete-card"); const cs = getComputedStyle(c); window.__s.push({ t: now - c0, dt: now - last, op: +cs.opacity, tf: cs.transform, d: cs.display, open: c.classList.contains("is-open") }); last = now; if (!window.__stop) requestAnimationFrame(loop); }; requestAnimationFrame(loop);
  window.__flip = () => { const stage = document.querySelector(".discrete-card").closest('[data-slot="card"]'); const btn = [...document.querySelectorAll("button")].find(b => /Reveal|Dismiss/.test(b.textContent) && !stage.contains(b)); window.__s.push({ mark: btn.textContent.trim(), t: performance.now() }); btn.click(); };
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
await page.waitForTimeout(300);
const tl = [];
const flip = async (w) => { tl.push(Date.now()); await page.evaluate(() => window.__flip()); await page.waitForTimeout(w); };
await flip(800);   // Dismiss
// hit-test + geometry during exit tail is sampled separately below
await flip(800);   // Reveal
await flip(800);   // Dismiss
await flip(800);   // Reveal
await flip(60);    // Dismiss (interrupt)
await flip(800);   // Reveal mid-flight → reversal
await cdp.send("Page.stopScreencast");
const samples = await page.evaluate(() => { window.__stop = true; return window.__s; });
out.rAF = (() => { const d = samples.filter(s => s.dt !== undefined).map(s => s.dt).slice(1); const drops = d.filter(x => x > 20); return { n: d.length, mean: d.reduce((a, b) => a + b, 0) / d.length, max: Math.max(...d), over20: drops.length, over20vals: drops.map(x => Math.round(x)) }; })();
fs.writeFileSync(`${D}/R-samples.json`, JSON.stringify(samples));
// save screencast frames
const t0 = frames.length ? frames[0].ts : 0;
out.screencast = { n: frames.length, spanS: frames.length ? frames.at(-1).ts - t0 : 0 };
frames.forEach((f, i) => fs.writeFileSync(`${SC}/s${String(i).padStart(3, "0")}_${Math.round((f.ts - t0) * 1000)}ms.png`, Buffer.from(f.data, "base64")));
// exit tail: hit-test + layout at t≈300ms of a Dismiss
await page.waitForTimeout(400);
out.tail = await page.evaluate(async () => {
  const c = document.querySelector(".discrete-card"); const r = c.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
  window.__flip(); await new Promise(r => setTimeout(r, 300)); const cs = getComputedStyle(c);
  const hit = document.elementFromPoint(cx, cy); const at300 = { op: cs.opacity, d: cs.display, hitIsCard: c.contains(hit), pe: cs.pointerEvents };
  await new Promise(r => setTimeout(r, 400)); return { at300, after: { d: getComputedStyle(c).display } };
});
out.geoClosed = await geo();
// transport wiring: with Entry selected + card closed→ reveal it, then press dock Play and watch the card
await page.evaluate(() => window.__flip()); await page.waitForTimeout(700);
async function watchCard(ms) { return page.evaluate(async (ms) => { const c = document.querySelector(".discrete-card"); const seen = new Set(); const t0 = performance.now(); while (performance.now() - t0 < ms) { const cs = getComputedStyle(c); seen.add(cs.opacity + "|" + cs.transform + "|" + cs.display); await new Promise(r => requestAnimationFrame(r)); } return [...seen]; }, ms); }
out.transport = {};
out.transport.dockNow = await dockLabel();
const play = page.locator('[aria-label="Play animation"]:visible, [aria-label="Pause animation"]:visible').first();
await play.hover(); await page.waitForTimeout(300);
await play.click(); out.transport.afterClick1 = await dockLabel(); out.transport.cardWhile1 = await watchCard(1500);
await page.screenshot({ path: `${D}/R-transport-after-click1.png` });
await play.click(); out.transport.afterClick2 = await dockLabel(); out.transport.cardWhile2 = await watchCard(1500);
const reset = page.locator('[aria-label="Reset animation"]');
out.transport.resetCount = await reset.count();
if (out.transport.resetCount) { await reset.first().click(); out.transport.cardAfterReset = await watchCard(800); }
out.transport.scrubbers = await page.evaluate(() => [...document.querySelectorAll('[role="slider"]')].filter(s => s.offsetParent).map(s => (s.getAttribute("aria-label") || s.closest("[aria-label]")?.getAttribute("aria-label") || "?") + "@" + Math.round(s.getBoundingClientRect().y)));
await page.screenshot({ path: `${D}/R-final-page.png` });
fs.writeFileSync(`${D}/R-out.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();

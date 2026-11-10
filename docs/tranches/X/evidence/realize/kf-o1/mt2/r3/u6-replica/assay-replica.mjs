// U6 replica: the assay's own sequence (reduced motion, control swipe on the host then the subject swipe on the embed),
// timestamped + paced, recording per move the host's scrollY. One browser, a context per trial, closed in finally.
import { writeFileSync } from "node:fs";
const { chromium } = await import("/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs");
const N = +(process.argv[2] ?? 6), OUT = process.argv[3], PACE = process.argv[4] ?? "raf";
const embed = "https://keyframes.babb.dev/embed/#/cube", host = "https://daraksha.babb.dev/__kf-assay-host";
const body = `<!doctype html><meta name=viewport content="width=device-width"><body style="margin:0"><div style="height:300px"></div><iframe id=f src="${embed}" style="display:block;width:100%;aspect-ratio:1;border:0"></iframe><div style="height:3000px"></div></body>`;
const browser = await chromium.launch(process.env.NO_RESAMPLE ? { args: ["--disable-features=ResamplingScrollEvents"] } : {});
const trials = [];
try {
  for (let i = 0; i < N; i++) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, reducedMotion: "reduce", colorScheme: "dark" });
    try {
      await ctx.route(host, (r) => r.fulfill({ status: 200, contentType: "text/html", body }));
      const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
      await page.goto(host, { waitUntil: "domcontentloaded" });
      const fr = await (await page.waitForSelector("#f")).contentFrame();
      await fr.waitForSelector(".graph > div", { timeout: 20000 });
      await page.waitForTimeout(800); await page.evaluate(() => scrollTo(0, 200)); await page.waitForTimeout(200);
      const box = await page.evaluate(() => { const r = document.getElementById("f").getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
      const swipe = async (x, y, dy) => {
        let T = Date.now() / 1000; const ys = [], st = (t) => (PACE === "real" || PACE === "ack" ? {} : { timestamp: T + t });
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }], ...st(0) });
        if (PACE === "ack") { await page.evaluate(() => new Promise(requestAnimationFrame)); await fr.evaluate(() => new Promise(requestAnimationFrame)); T = Date.now() / 1000; }
        for (let k = 1; k <= 10; k++) {
          await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y + (dy * k) / 10 }], ...st(0.016 * k) });
          if (PACE === "raf") await page.evaluate(() => new Promise(requestAnimationFrame));
          if (PACE === "real" || PACE === "ack") { const due = T * 1000 + 16 * k; await page.waitForTimeout(Math.max(0, due - Date.now())); }
          ys.push(await page.evaluate(() => scrollY));
        }
        await page.waitForTimeout(PACE === "real" || PACE === "ack" ? 300 : 100);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [], ...st(0.46) });
        await page.waitForTimeout(400);
        ys.push(await page.evaluate(() => scrollY));
        return ys;
      };
      const a0 = await page.evaluate(() => scrollY);
      const c = await swipe(box.x, 700, -120);
      const control = c.at(-1) - a0;
      const s = await swipe(box.x, box.y - control, -120);
      trials.push({ control, subject: s.at(-1) - c.at(-1), cTrace: c.map((v) => v - a0), sTrace: s.map((v) => v - c.at(-1)) });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
if (OUT) writeFileSync(OUT, JSON.stringify(trials, null, 1));
for (const t of trials) console.log(t.control, t.subject, JSON.stringify(t.cTrace), JSON.stringify(t.sTrace));

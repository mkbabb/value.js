// SERVED MODEL: claude-opus-5-5
// KF.W13X RESUME 2 Repair 1 — C1r2-1 SEQUENCE-PLAY diagnosis. Opens #/sequence, presses the
// transport's Play, then samples every `.seq-track, .seq-track *` element for 2.5 s, counting
// distinct states BEYOND rest under two readings: (A) the live-session S5 oracle's tuple
// (transform | opacity) and (B) the properties the ball actually animates (translate | scale |
// opacity | transform | --ball-p). Headless real Chrome; browser closed in a finally.
// DRIVER=1 actuates with the roster's own `pressPlayToggle(page, {intent:'play'})` (scripts/lib/demo-driver.mjs) instead of a Playwright click.
// Usage: [NOPLAY=1|DRIVER=1] node seqplay.mjs <base>   (NOPLAY = the rest control: no press, both readings must be 0)
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const base = process.argv[2];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  await p.goto(base + "#/sequence", { waitUntil: "networkidle" });
  await p.waitForSelector(".seq-track", { timeout: 60000 });
  await p.waitForTimeout(2500);
  const play = p.locator('button[aria-label="Play animation"]').first();
  const had = await play.count();
  let driverSaid = null;
  if (process.env.DRIVER) {
    const { pressPlayToggle } = await import("/Users/mkbabb/Programming/keyframes-wt-W13X-close3/scripts/lib/demo-driver.mjs");
    driverSaid = await pressPlayToggle(p, { intent: "play" });
    await p.locator('button[aria-label^="Play the reel"]').first().click({ timeout: 2000 }).then(() => (driverSaid += " +reel"), () => (driverSaid += " (no reel)"));
  } else if (had && !process.env.NOPLAY) await play.click({ timeout: 5000 });
  const label = await p.locator('button[aria-label="Play animation"], button[aria-label="Pause animation"]').first().getAttribute("aria-label").catch(() => null);
  const r = await p.evaluate(async () => {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    const els = [...document.querySelectorAll(".seq-track, .seq-track *")].slice(0, 120);
    const A = new Set(), B = new Set();
    const t0 = performance.now();
    while (performance.now() - t0 < 2500) {
      els.forEach((el, i) => {
        const cs = getComputedStyle(el);
        A.add(i + "|" + cs.transform + "|" + cs.opacity);
        B.add(i + "|" + cs.translate + "|" + cs.scale + "|" + cs.opacity + "|" + cs.transform + "|" + cs.getPropertyValue("--ball-p"));
      });
      await sleep(50);
    }
    return { els: els.length, oracleA: A.size - els.length, actualB: B.size - els.length };
  });
  console.log(JSON.stringify({ driverSaid, playButton: had, labelAfter: label, ...r, pageerrors: errs }));
} finally {
  await b.close();
}

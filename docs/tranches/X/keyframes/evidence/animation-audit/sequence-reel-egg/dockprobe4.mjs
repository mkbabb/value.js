// After a reel the dock collapses to its summary layer; press the VISIBLE (hit-testable) Play and read the master.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const st = (p) => p.evaluate(() => { const t = document.body.innerText; return (t.match(/CLOCK\s*([\d.]+)/)?.[1]) + " " + (t.match(/\b(READY|PLAYING|PAUSED)\b/)?.[1]); });
const hitPlay = (p) => p.evaluate(() => { for (const x of document.querySelectorAll('button[aria-label="Play animation"],button[aria-label="Pause animation"]')) { const r = x.getBoundingClientRect(); if (r.width && x.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2))) return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width }; } return null; });
for (const mode of ["scrub-reel-held-play", "played-reel-then-play"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" }); await p.waitForTimeout(2200);
  const out = [mode];
  if (mode === "scrub-reel-held-play") { await p.mouse.move(386, 645); await p.mouse.down(); await p.mouse.move(720, 645, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(400); }
  else { const h0 = await hitPlay(p); await p.mouse.click(h0.x, h0.y); await p.waitForTimeout(500); out.push("playing " + await st(p)); }
  await p.locator('[aria-label^="Play the reel"]').click(); out.push("reel " + await st(p));
  await p.waitForTimeout(mode === "scrub-reel-held-play" ? 150 : 1900);
  const h = await hitPlay(p); out.push("btn " + JSON.stringify(h));
  await p.mouse.click(h.x, h.y); await p.waitForTimeout(450); out.push("click1 " + await st(p));
  const h2 = await hitPlay(p); out.push("btn2 " + JSON.stringify(h2)); if (h2) { await p.mouse.click(h2.x, h2.y); } await p.waitForTimeout(150); out.push("click2+150 " + await st(p));
  await p.waitForTimeout(mode === "scrub-reel-held-play" ? 1900 : 700); out.push("+later " + await st(p));
  await p.waitForTimeout(600); out.push("+600 " + await st(p));
  console.log(out.join(" | ")); await p.close();
}
await b.close();

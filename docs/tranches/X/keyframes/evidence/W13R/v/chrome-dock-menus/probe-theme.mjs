// SERVED MODEL: claude-opus-5-5 (KF.W13R.v copy, adapted below)
// Theme-swap probe: freeze timeline, click the dock DarkModeToggle, and read the
// computed ink/background of each dock control + the plate at seeked times.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
const cdp = await p.context().newCDPSession(p); await cdp.send("Animation.enable");
await p.mouse.move(720, 71); await p.waitForTimeout(1300);
// KF.W13R.v adaptation (recorded): at kf d54a6ab8 the DarkModeToggle lives in the @mbabb menu's "Dark mode" row (OA-33), not on the dock.
// The menu is opened live; the timeline is frozen only for the toggle click, then seeked as before.
await p.locator('[aria-label="@mbabb menu"]').click(); await p.waitForTimeout(700);
await cdp.send("Animation.setPlaybackRate", { playbackRate: 0 });
await p.locator('[role=menuitem]:has-text("Dark mode") button').first().click();
await p.waitForTimeout(300);
const out = [];
for (const t of [0, 28, 56, 84, 112, 150, 200]) {
  out.push(await p.evaluate(async (t) => {
    for (const a of document.getAnimations()) { const e = a.effect.getComputedTiming().endTime; if (Number.isFinite(e)) a.currentTime = Math.min(t, e - 0.01); }
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const d = document.querySelector('[data-dock-tether="top"] .glass-dock');
    const plate = d.querySelector(".dock-plate") || d;
    const q = (s) => { const e = d.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { color: c.color, bg: c.backgroundColor, op: c.opacity }; };
    return { t, html: document.documentElement.className.slice(0, 40), plate: getComputedStyle(plate).backgroundColor, scene: q('[aria-label="Scene"][role=combobox]'), mbabb: q('[aria-label="@mbabb menu"]'), kbd: q('[aria-label="Show keyboard shortcuts"]'), share: q('[aria-label="Share animation"]') };
  }, t));
}
await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
fs.writeFileSync(new URL("./probe-theme.json", import.meta.url).pathname, JSON.stringify(out, null, 1));
for (const o of out) console.log(JSON.stringify(o));
await b.close();

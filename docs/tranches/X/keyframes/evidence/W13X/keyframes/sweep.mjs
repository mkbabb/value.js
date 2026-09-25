// SERVED MODEL: claude-opus-5-5
// X.KF.W13X.keyframes (KFA-15, k2) — copied from W13V/k/kfa-15 unchanged but for the base URL argument (argv[3]) and the playwright require.
// KFA-15 — the edit-feedback sweep on the served page. Adapted from the audit's keyframes-editor-cards
// capture.mjs (same instrument: headed, 1440x900, the card-edit gesture `pre[contenteditable]` End + " ").
// The audit reached the editor through the Spring scene's inline section, which X.KF.W13V.s retired; the
// editor now opens from the dock's Keyframes item (the shared pane) — this probe opens it there.
// Per rAF for 1.4 s after the edit: the bar's painted width (getBoundingClientRect) — >0 iff the sweep shows.
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto((process.argv[3] || "http://localhost:5173/") + "#/" + (process.argv[2] || "cube"), { waitUntil: "load" });
await p.waitForTimeout(3500);
const opened = await p.evaluate(() => {
  const cand = [...document.querySelectorAll("button,[role=tab],[role=option]")].filter((e) => e.offsetParent && /keyframes/i.test((e.getAttribute("aria-label") || "") + " " + e.textContent));
  return cand.map((e) => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 40));
});
console.log("candidates", JSON.stringify(opened));
const btn = p.locator('button:visible', { hasText: /^Keyframes$/ }).first();
if (await btn.count()) { await btn.click(); await p.waitForTimeout(900); }
const pre = p.locator("pre[contenteditable]:visible").first();
const nCards = await p.locator("pre[contenteditable]:visible").count();
console.log("editable cards", nCards);
if (nCards === 0) { console.log(JSON.stringify({ frames: 0, framesPainted: 0, surface: "ABSENT" })); await b.close(); process.exit(0); }
await pre.click(); await p.keyboard.press("End");
await p.evaluate(() => { window.__w = []; const bar = [...document.querySelectorAll(".progress-bar")].find((e) => e.offsetParent); const t0 = performance.now(); const f = () => { const r = bar.getBoundingClientRect(); window.__w.push([+(performance.now() - t0).toFixed(0), +r.width.toFixed(1)]); if (performance.now() - t0 < 1400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
await p.keyboard.type(" ");
await p.waitForTimeout(1600);
const w = await p.evaluate(() => window.__w);
const widths = w.map((x) => x[1]);
console.log(JSON.stringify({ frames: w.length, framesPainted: widths.filter((x) => x > 0.5).length, maxWidth: Math.max(...widths), last: widths.at(-1) }));
await b.close();

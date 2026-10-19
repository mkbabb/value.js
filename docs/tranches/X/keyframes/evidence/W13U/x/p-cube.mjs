// SERVED MODEL: claude-opus-5-5
import { withPage, navToScene, pressPlayToggle } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const r = await withPage({ distDir: "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages", label: "probe", context: { viewport: { width: 1440, height: 900 } } }, async (page, { url }) => {
  await page.goto(`${url}/#/cube`, { waitUntil: "load" });
  await page.evaluate(() => localStorage.clear());
  await navToScene(page, "cube", "Controls");
  const st = () => page.evaluate(() => ({ pause: !!document.querySelector('button[aria-label="Pause animation"]'), play: !!document.querySelector('button[aria-label="Play animation"]'), reset: !!document.querySelector('button[aria-label="Reset animation"]'), sv: document.querySelector('[role="slider"]')?.getAttribute("aria-valuenow") }));
  const out = { t0: await st() };
  await page.waitForTimeout(1500); out.t1 = await st();
  const samp = () => page.evaluate(async () => { const s = { bob: new Set(), pose: new Set(), cube: new Set(), graph: new Set() }; for (let i = 0; i < 40; i++) { for (const [k, sel] of [["bob", ".cube-bob"], ["pose", ".cube-pose"], ["cube", ".cube"], ["graph", ".graph > div"]]) { const el = document.querySelector(sel); if (el) s[k].add(getComputedStyle(el).transform); } await new Promise(r => setTimeout(r, 30)); } return Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v.size])); });
  out.playingSamp = await samp();
  out.pauseLabel = await pressPlayToggle(page, { intent: "pause" }); await page.waitForTimeout(300); out.t2 = await st();
  await page.click('button[aria-label="Reset animation"]'); await page.waitForTimeout(500); out.t3 = await st();
  out.pausedSamp = await samp();
  await pressPlayToggle(page, { intent: "play" }); await page.waitForTimeout(800); out.t4 = await st(); out.replaySamp = await samp();
  return out;
});
console.log(JSON.stringify(r));

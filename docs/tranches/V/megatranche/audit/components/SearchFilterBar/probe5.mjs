// CHALLENGE-D probe 5 — the activeFilterCount badge: is it actually visible?
// hit-test the badge's own centre and its four cardinal edge points. Read-only.
import { webkit } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9100";

const browser = await webkit.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 3 });
const page = await context.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(2600);
await page.click('button[aria-label="Filters"]');
await page.waitForTimeout(700);
await page.evaluate(() => {
  const root = document.querySelector('[role="dialog"][data-state="open"]');
  [...root.querySelectorAll("label")].find((l) => l.textContent.trim() === "Featured")?.click();
});
await page.waitForTimeout(400);
await page.keyboard.press("Escape");
await page.waitForTimeout(600);

const out = await page.evaluate(() => {
  const trig = document.querySelector('button[aria-label="Filters"]');
  const badge = trig.querySelector("span");
  const b = badge.getBoundingClientRect();
  const pts = {
    centre: [b.x + b.width / 2, b.y + b.height / 2],
    top: [b.x + b.width / 2, b.y + 1],
    right: [b.right - 1, b.y + b.height / 2],
    bottom: [b.x + b.width / 2, b.bottom - 1],
    left: [b.x + 1, b.y + b.height / 2],
  };
  const hit = {};
  for (const [k, [x, y]] of Object.entries(pts)) {
    const el = document.elementFromPoint(x, y);
    hit[k] = el ? `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0, 3).join(".")}` : null;
  }
  const cs = getComputedStyle(badge);
  const trigCS = getComputedStyle(trig);
  return {
    badgeRect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
    badgeIsHitAt: hit,
    badgeSelfHitCount: Object.values(hit).filter((v) => v && v.startsWith("span")).length,
    badgeCS: { pos: cs.position, z: cs.zIndex, bg: cs.backgroundColor, color: cs.color, fs: cs.fontSize, fw: cs.fontWeight, overflow: cs.overflow, isolation: cs.isolation },
    triggerCS: { pos: trigCS.position, z: trigCS.zIndex, overflow: `${trigCS.overflowX}/${trigCS.overflowY}`, isolation: trigCS.isolation, transform: trigCS.transform, clipPath: trigCS.clipPath, contain: trigCS.contain },
    // any pseudo-element on the trigger that paints over its children?
    trigBefore: (() => { const c = getComputedStyle(trig, "::before"); return { content: c.content, z: c.zIndex, bg: c.backgroundColor, inset: `${c.top} ${c.right} ${c.bottom} ${c.left}`, pos: c.position }; })(),
    trigAfter: (() => { const c = getComputedStyle(trig, "::after"); return { content: c.content, z: c.zIndex, bg: c.backgroundColor, inset: `${c.top} ${c.right} ${c.bottom} ${c.left}`, pos: c.position }; })(),
    searchBarHost: (() => { const p = trig.parentElement; const c = getComputedStyle(p); const r = p.getBoundingClientRect(); return { cls: String(p.className).slice(0, 90), ov: `${c.overflowX}/${c.overflowY}`, rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } }; })(),
  };
});
await page.screenshot({ path: resolve(SHOTS, "probe5-badge-3x.png"), clip: { x: 620, y: 320, width: 80, height: 70 } });
console.log(JSON.stringify(out, null, 1));
await browser.close();

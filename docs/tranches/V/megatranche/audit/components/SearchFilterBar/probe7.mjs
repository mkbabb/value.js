// CHALLENGE-D pass-2 probe 7 — CROSS-ENGINE adjudication of the badge clip.
// Pass 1 (`challenge-D-design-pass1-c654824e.md` D-11) recorded a NEGATIVE: "the badge is not
// clipped by any ancestor". That test looked only at ANCESTOR overflow/clip-path. It missed the
// trigger's OWN `contain: paint`, which establishes a paint containment box on the button itself
// and clips the `-top-1 -right-1` overhang. This probe adjudicates by hit-testing the badge's own
// five cardinal points in BOTH engines. Read-only.
import { webkit, chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const out = {};
for (const [name, engine] of [["webkit", webkit], ["chromium", chromium]]) {
  const browser = await engine.launch();
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
  await page.waitForTimeout(800);

  out[name] = await page.evaluate(() => {
    const trig = document.querySelector('button[aria-label="Filters"]');
    const badge = trig.querySelector("span");
    const b = badge.getBoundingClientRect();
    const t = trig.getBoundingClientRect();
    const pts = {
      centre: [b.x + b.width / 2, b.y + b.height / 2],
      topEdge: [b.x + b.width / 2, b.y + 1.5],
      rightEdge: [b.right - 1.5, b.y + b.height / 2],
      topRightCorner: [b.right - 3, b.y + 3],
      bottomLeft: [b.x + 3, b.bottom - 3],
    };
    const hits = {};
    for (const [k, [x, y]] of Object.entries(pts)) {
      const el = document.elementFromPoint(x, y);
      hits[k] = { el: el ? `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0, 2).join(".")}` : null, isBadge: el === badge };
    }
    const tcs = getComputedStyle(trig);
    const bcs = getComputedStyle(badge);
    return {
      badgeRect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
      triggerRect: { x: +t.x.toFixed(1), y: +t.y.toFixed(1), w: +t.width.toFixed(1), h: +t.height.toFixed(1) },
      badgeOverhangTopPx: +(t.top - b.top).toFixed(1),
      badgeOverhangRightPx: +(b.right - t.right).toFixed(1),
      triggerContain: tcs.contain,
      triggerBorderRadius: tcs.borderRadius,
      triggerBeforeZ: getComputedStyle(trig, "::before").zIndex,
      badgeZ: bcs.zIndex,
      badgeText: badge.textContent.trim(),
      hits,
      badgePointsThatHitTheBadge: Object.values(hits).filter((h) => h.isBadge).length,
      badgePointCount: Object.keys(hits).length,
    };
  });
  await page.screenshot({ path: resolve(SHOTS, `probe7-${name}-badge-3x.png`), clip: { x: 634, y: 322, width: 52, height: 60 } });
  await browser.close();
}
console.log(JSON.stringify(out, null, 1));

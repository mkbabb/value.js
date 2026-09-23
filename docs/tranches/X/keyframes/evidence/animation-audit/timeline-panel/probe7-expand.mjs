// timeline-panel — probe7: after Expand, how many timelines land in #timeline-expanded-target, their stacking vs the ribbon.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
console.log("khead", kf("rev-parse --short HEAD"), "kdirty", kf("status --porcelain").split("\n").filter(Boolean).length);
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(1500);
await page.getByRole("button", { name: "Expand timeline" }).click(); await page.waitForTimeout(1500); await page.mouse.move(1300, 450); await page.waitForTimeout(500);
const r = await page.evaluate(() => {
  const T = document.querySelector("#timeline-expanded-target"); const c = getComputedStyle(T); const tb = T.getBoundingClientRect();
  const tracks = [...T.querySelectorAll(".timeline-track")].map((t) => { const b = t.getBoundingClientRect(); return [Math.round(b.y), Math.round(b.height), t.checkVisibility()]; });
  const ribbon = [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "Snapshot" && b.checkVisibility());
  let rc = ribbon; while (rc && !/card|ribbon/i.test(String(rc.className))) rc = rc.parentElement;
  const rcs = rc && getComputedStyle(rc); const rb = rc?.getBoundingClientRect();
  const hit = document.elementFromPoint(362, 345); // where the expanded timeline's Undo sits under the ribbon
  const zchain = (e) => { const o = []; while (e && e !== document.body) { const s = getComputedStyle(e); if (s.zIndex !== "auto" || s.position === "fixed") o.push(`${String(e.className).slice(0, 30)}:z=${s.zIndex}:${s.position}`); e = e.parentElement; } return o; };
  return { target: { rect: [tb.x, tb.y, tb.width, tb.height].map(Math.round), z: c.zIndex, pos: c.position, overflow: c.overflow, maxH: c.maxHeight, scrollH: T.scrollHeight, bg: c.backgroundColor, bf: c.backdropFilter, gridArea: c.gridArea },
    wrappers: T.children.length, tracks, ribbon: rc && { cls: String(rc.className).slice(0, 60), rect: [rb.x, rb.y, rb.width, rb.height].map(Math.round), z: rcs.zIndex }, hitAtUndo: `${hit?.tagName}.${String(hit?.className).slice(0, 50)} aria=${hit?.closest("button")?.getAttribute("aria-label")}`, zTarget: zchain(T), zRibbon: zchain(rc) };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();

// hit-test probe: what receives a tap on drawer controls under the transport dock; pane scroll reach.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.mouse.move(5, 200); await page.waitForTimeout(4200);
const hit = () => page.evaluate(() => {
  const d = document.querySelector(".glass-drawer");
  const ctl = [...d.querySelectorAll("button,[role=combobox],input")].filter(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
  return ctl.map(b => { const r = b.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2; const onscreen = cy < innerHeight && cy > 0; const t = onscreen ? document.elementFromPoint(cx, cy) : null; const ok = t && (t === b || b.contains(t)); return { c: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 18), cy: Math.round(cy), onscreen, reachable: !!ok, hitBy: t && !ok ? (t.closest(".glass-dock") ? "transport-dock:" + (t.getAttribute("aria-label") || t.tagName) : t.tagName + "." + (t.className?.baseVal ?? t.className).toString().slice(0, 30)) : null }; });
});
const out = {};
out.peek = await hit();
// expand via chrome dock toggle
const b = await page.evaluate(() => { const r = document.querySelector(".glass-dock").getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
await page.mouse.click(b[0], b[1]); await page.waitForTimeout(1100);
const t = await page.evaluate(() => { const e = [...document.querySelectorAll("[aria-label='Controls panel']")].find(x => x.getBoundingClientRect().width > 0); const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
await page.mouse.click(t[0], t[1]); await page.waitForTimeout(1400); await page.mouse.move(5, 420); await page.waitForTimeout(900);
out.expanded = await hit();
// wheel-scroll the pane
await page.mouse.move(195, 700); await page.mouse.wheel(0, 800); await page.waitForTimeout(700);
out.afterWheel = await page.evaluate(() => { const p = document.querySelector(".glass-drawer .controls-pane"); return { scrollTop: p.scrollTop, scrollH: p.scrollHeight, clientH: p.clientHeight, paneBottom: Math.round(p.getBoundingClientRect().bottom), vh: innerHeight }; });
writeFileSync(new URL("probe-hit.json", import.meta.url).pathname, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
await browser.close();

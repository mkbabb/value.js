// dock-scene-select probe — READ-ONLY: full shadow, chevron size, dock overlap, 404 url, keyboard warm.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false }); const res = {};
for (const [vp, w, h] of [["1440", 1440, 900], ["390", 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage(); const bad = []; const reqs = [];
  page.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
  page.on("request", (r) => { if (/scenes\//.test(r.url())) reqs.push(r.url().split("/scenes/")[1].slice(0, 60)); });
  await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1100);
  const trig = page.getByRole("combobox", { name: "Scene" }).first();
  await trig.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(900);
  const n0 = reqs.length;
  for (let i = 0; i < 6; i++) { await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250); }
  const kbdWarm = reqs.slice(n0);
  const m = await page.evaluate(() => {
    const lb = document.querySelector("[role=listbox]"); const c = lb.parentElement; const cs = getComputedStyle(c);
    const all = [c, ...c.querySelectorAll("*")].map(e => ({ tag: e.tagName, cls: String(e.className).slice(0, 60), sh: getComputedStyle(e).boxShadow })).filter(x => x.sh !== "none");
    const t = document.querySelector('[aria-label="Scene"][role=combobox]'); const chev = [...t.querySelectorAll("svg")].pop(); const cb = chev.getBoundingClientRect();
    const dock = document.querySelector(".glass-dock").getBoundingClientRect(); const lr = c.getBoundingClientRect();
    const glyphs = [...t.querySelectorAll("svg")].map(s => { const r = s.getBoundingClientRect(); return [s.getAttribute("class"), Math.round(r.width), Math.round(r.height)]; });
    const row = lb.querySelector("[role=option]"); const rcs = getComputedStyle(row);
    const hl = lb.querySelector("[data-highlighted]"); const hcs = hl && getComputedStyle(hl);
    const opt = lb.querySelector("[role=option][data-state=checked]"); const lab = [...opt.querySelectorAll("span")].find(s => s.textContent.trim() === opt.textContent.trim() && !s.querySelector("span"));
    return { contentShadow: cs.boxShadow, border: cs.border, shadows: all, triggerGlyphs: glyphs, chevron: [Math.round(cb.width), Math.round(cb.height)], overlapDockPx: Math.round(dock.bottom - lr.top), dock: [Math.round(dock.width), Math.round(dock.height)], rowRadius: rcs.borderRadius, hl: hcs && { text: hl.textContent.trim(), border: hcs.border, outline: hcs.outline, bg: hcs.backgroundColor, radius: hcs.borderRadius }, checkedLabelWeight: lab && getComputedStyle(lab).fontWeight, focus: document.activeElement.textContent.trim() };
  });
  // is @mbabb hidden under the listbox at 390?
  m.mbabbUnderListbox = await page.evaluate(() => { const mb = document.querySelector('[aria-label="@mbabb menu"]'); if (!mb) return null; const r = mb.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { mb: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], topmost: top && (top.closest("[role=listbox]") ? "LISTBOX" : top.tagName + "." + String(top.className).slice(0, 30)) }; });
  await page.screenshot({ path: OUT + `10-kbd-arrow-walk-${vp}-light.png` });
  res[vp] = { ...m, kbdWarm, bad };
  await ctx.close();
}
await b.close(); writeFileSync(OUT + "probe-log.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 1));

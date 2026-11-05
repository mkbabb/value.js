// §0hr.2 (2) OD-11 falsifier: after an invalid commit (with the extra click
// that opens the help preview), the badge must be the topmost paint at its own
// centre and corners. One browser per run, a context per cell, closed in finally.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:5341";
const TAG = process.argv[2] || "r";
const OUT = process.env.HOME + "/.dev-logs/x-0hr2/od11/" + TAG;
fs.mkdirSync(OUT, { recursive: true });
const rows = [];
const browser = await chromium.launch();
try {
  for (const vp of [[1800, 1000, 1, false], [390, 844, 2, true]]) for (const scheme of ["dark", "light"]) {
    const ctx = await browser.newContext({ viewport: { width: vp[0], height: vp[1] }, deviceScaleFactor: vp[2], isMobile: vp[3], hasTouch: vp[3], colorScheme: scheme });
    try {
      const page = await ctx.newPage();
      await page.goto(`${BASE}/#/?space=oklch&color=efflorescence`, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(3500);
      await page.getByRole("button", { name: "Toggle action bar" }).click().catch(() => {});
      await page.waitForTimeout(1200);
      await page.getByRole("button", { name: "Open color input" }).click();
      await page.waitForSelector(".color-input", { timeout: 15000 });
      await page.waitForTimeout(800);
      // the §0hr prod sequence (probe-od.mjs): a valid commit, the pointer
      // resting on the field (the hover preview's 300 ms), then the click
      // into the field and the invalid commit.
      await page.keyboard.press("ControlOrMeta+A");
      await page.keyboard.type("daraksha sage");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(2000);
      const input = page.locator(".color-input").first();
      await input.click();
      await page.keyboard.press("ControlOrMeta+A");
      await page.keyboard.type("notacolourzz");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(1200);
      const r = await page.evaluate(() => {
        const b = document.getElementById("color-input-error");
        if (!b) return { present: false };
        // the badge is pointer-events:none (hit-testing skips it): lift that for
        // the paint-order read only, then restore it.
        const pe = b.style.pointerEvents; b.style.pointerEvents = "auto";
        const q = b.getBoundingClientRect();
        const my = q.top + q.height / 2, inset = q.height / 2 + 1; // the stadium's straight run, end to end
        const pts = [[q.left + q.width / 2, my], [q.left + inset, my], [q.right - inset, my]];
        const hits = pts.map(([x, y]) => { const e = document.elementFromPoint(x, y); return !!e && (e === b || b.contains(e)); });
        b.style.pointerEvents = pe;
        const pop = [...document.querySelectorAll("p")].filter((e) => /^Enter a color$/.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0 && getComputedStyle(e).visibility !== "hidden");
        return { present: true, invalid: document.querySelector(".color-field")?.classList.contains("color-input-error"), visibleAll: hits.every(Boolean), hits, helpOpen: pop.length > 0 };
      });
      await page.screenshot({ path: `${OUT}/od11-${vp[0]}-${scheme}.png` });
      // edit back to valid: the help may return, the badge goes.
      await page.keyboard.press("ControlOrMeta+A");
      await page.keyboard.type("red");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(800);
      const after = await page.evaluate(() => ({ badge: !!document.getElementById("color-input-error") }));
      rows.push({ vp: `${vp[0]}x${vp[1]}`, scheme, ...r, validAfterEdit: !after.badge, ok: r.present && r.visibleAll && !after.badge });
    } catch (e) { rows.push({ vp: `${vp[0]}x${vp[1]}`, scheme, error: String(e).slice(0, 200), ok: false }); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(`${OUT}/od11.json`, JSON.stringify(rows, null, 1)); }
for (const r of rows) console.log(JSON.stringify(r));
console.log(rows.every((r) => r.ok) ? "OD11 GREEN" : "OD11 RED");

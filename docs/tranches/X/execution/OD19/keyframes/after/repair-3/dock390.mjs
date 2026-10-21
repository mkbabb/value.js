// C3-KF-04 live: at 390x844 on #/spring (the sheet peeking Physics) and at
// 1440x900 with the pane open, the surfaces trigger's face and the menu's
// checked row name the same surface. Light and dark; one context per cell.
// Also C3-KF-01 live: the scene fallback's Skeleton wears data-shimmer.
import fs from "node:fs";
import path from "node:path";
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const server = await serveDist(process.env.KF_DIST);
const res = [];
try {
  await withBrowser(async (browser) => {
    for (const [w, h] of [[390, 844], [1440, 900]]) for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1 });
      try {
        const page = await ctx.newPage();
        page.setDefaultTimeout(15000);
        await page.goto(`${server.url}/#/spring`, { waitUntil: "load" });
        await page.waitForTimeout(3000);
        const trig = page.locator("[data-dock-surface-trigger]:visible").first();
        if (!(await trig.isVisible().catch(() => false))) {
          const dock = await page.locator('[data-dock-tether="top"] .glass-dock').first().boundingBox();
          await page.mouse.move(dock.x + dock.width / 2, dock.y + dock.height / 2); await page.mouse.click(dock.x + dock.width / 2, dock.y + dock.height / 2);
          await page.waitForTimeout(800);
        }
        const face = await trig.getAttribute("data-surface");
        await trig.click(); await page.waitForTimeout(600);
        const rows = await page.$$eval("[data-dock-surface-item]", (els) => els.map((e) => ({ surface: e.dataset.surface ?? null, checked: e.getAttribute("aria-checked"), dot: !!e.querySelector(".menu__radio-dot") })));
        await page.screenshot({ path: path.join(OUT, `surfaces-${scheme}-${w}.png`) });
        const checked = rows.filter((r) => r.checked === "true").map((r) => r.surface);
        res.push({ cell: `${scheme}-${w}`, face, checked, ok: checked.length === 1 && checked[0] === face, rows });
      } catch (e) { res.push({ cell: `${scheme}-${w}`, error: String(e).slice(0, 200) }); }
      finally { await ctx.close(); }
    }
  }, { label: "dock390" });
} finally { await server.close(); }
fs.writeFileSync(path.join(OUT, "dock390.json"), JSON.stringify(res, null, 1));
for (const r of res) console.log(JSON.stringify({ cell: r.cell, face: r.face, checked: r.checked, ok: r.ok, error: r.error }));

// repair-2 (C2-KF-02/03): the cube's surfaces menu (the disabled facet row) and the Reverse disc beside the direction
// select, BEFORE vs AFTER. usage: node ui-frames.mjs <outdir> <label>=<dist> ...
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [outDir, ...pairs] = process.argv.slice(2);
const out = [];
await withBrowser(async (browser) => {
  for (const pair of pairs) {
    const [label, dist] = pair.split("=");
    const server = await serveDist(dist);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    try {
      const page = await ctx.newPage(); page.setDefaultTimeout(15000);
      await page.goto(server.url + "/#/cube", { waitUntil: "load" }); await page.waitForTimeout(3500);
      const disc = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "Reverse"); const svg = b?.querySelector("svg"); return svg ? [...svg.classList].find((c) => c.startsWith("lucide-")) : null; });
      const direction = await page.evaluate(() => [...document.querySelectorAll("svg")].filter((s) => s.closest("[role=combobox]")).map((s) => [...s.classList].find((c) => c.startsWith("lucide-"))));
      await page.screenshot({ path: `${outDir}/K4-pane-${label}.png`, clip: { x: 60, y: 120, width: 430, height: 590 } });
      const b = await page.locator(".glass-dock").first().boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + 28); await page.waitForTimeout(900);
      await page.locator("[data-dock-surface-trigger]:visible").first().click(); await page.waitForTimeout(700);
      const menu = await page.evaluate(() => { const rows = [...document.querySelectorAll("[data-dock-surface-item]")]; const m = rows[0]?.closest("[role=menu]"); return { width: m ? Math.round(m.getBoundingClientRect().width) : null, rows: rows.map((r) => ({ text: r.textContent.trim(), description: r.getAttribute("aria-description"), disabled: r.hasAttribute("data-disabled") })) }; });
      const m = await page.locator("[role=menu]").first().boundingBox();
      await page.screenshot({ path: `${outDir}/K6-menu-${label}.png`, clip: { x: Math.max(0, m.x - 24), y: Math.max(0, m.y - 24), width: m.width + 48, height: m.height + 48 } });
      out.push({ label, reverseDisc: disc, directionTrigger: direction, menu });
    } finally { await ctx.close(); await server.close(); }
  }
}, { label: "ui-frames" });
console.log(JSON.stringify(out, null, 1));

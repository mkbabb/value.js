// X-DS · value · pass 10 (critic V10C-02, 2026-10-17) — the About card's "Components" list on Home
// (lab, the default space), at 1440 and 390 in light and dark: per item the full text, KaTeX \text
// runs (0 = the prose is prose), the KaTeX tokens, the item's line boxes and whether a line ends
// on a bare "=" (the critic's orphan). Element clip of the list -> about-components-<w>-<theme>.png.
// Real Chrome, new headless (§0ei); one browser, a context per cell, closed in finally.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const BASE = process.argv[2] || "http://localhost:9291";
const OUT = import.meta.dirname;
const res = [];
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) {
    let page;
    try {
      page = await newPage(browser, width, theme);
      await bootRoute(page, BASE + "/#/");
      const h = page.locator("h3", { hasText: /^Components?$/ }).first();
      await h.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      const list = h.locator("xpath=following-sibling::*[self::ol or self::ul][1]");
      const items = await list.evaluate((ol) => [...ol.children].map((li) => {
        const lines = [];
        const walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
        // line boxes: group text-range rects by top
        const tops = new Map();
        for (let n; (n = walker.nextNode());) {
          if (!n.textContent.trim() || n.parentElement.closest(".katex-mathml")) continue;
          const r = document.createRange(); r.selectNodeContents(n);
          for (const rc of r.getClientRects()) { const t = Math.round(rc.top); tops.set(t, (tops.get(t) ?? "") + n.textContent); }
        }
        for (const [t, s] of [...tops].sort((a, b) => a[0] - b[0])) lines.push(s.trim());
        return {
          text: li.textContent.replace(/\s+/g, " ").trim().slice(0, 160),
          katexTextRuns: li.querySelectorAll(".katex-html .text").length,
          katexTokens: li.querySelectorAll(".katex").length,
          lineBoxes: lines.length,
          lineEndsOnEquals: lines.some((s) => /=\s*$/.test(s)),
          family: getComputedStyle(li).fontFamily.split(",")[0],
        };
      }));
      // the list sits in a scrolling card: centre it, then frame the viewport (an element clip
      // of a nested scroller re-scrolls the page and frames the wrong rows)
      await list.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, `about-components-${width}-${theme}.png`) });
      res.push({ width, theme, ok: true, items });
    } catch (e) { res.push({ width, theme, ok: false, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "probe-v10c02.json"), JSON.stringify({ base: BASE, res }, null, 1));
}

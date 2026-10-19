// X-DS · value · pass 11 (critic V11C-02, 2026-10-18) — the Gradient CSS well after "Longer" is
// authored, at 1440 and 390 in light and dark: the well's text lines (one top-level argument per
// line) against its rendered line boxes (equal = no stop breaks mid-literal). The viewport frame is
// taken with the well centred -> gradient-well-<w>-<theme>.png.
// Real Chrome, new headless (§0ei); one browser, a context per cell, closed in finally.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const BASE = process.argv[2] || "http://localhost:9321";
const OUT = import.meta.dirname;
const res = [];
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 390]) {
    let page;
    try {
      page = await newPage(browser, width, theme);
      await bootRoute(page, BASE + "/#/gradient");
      const ed = page.getByRole("textbox", { name: "Gradient CSS" }).last();
      await ed.scrollIntoViewIfNeeded();
      await ed.click();
      await page.keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
      await page.keyboard.type("linear-gradient(90deg in oklch longer hue, oklch(75% 0.15 145deg) 0%, oklch(65% 0.18 265deg) 100%)");
      await page.waitForTimeout(1200);
      await page.getByRole("heading", { name: "Gradient" }).last().click();
      await page.waitForTimeout(800);
      const m = await ed.evaluate((el) => {
        const text = el.textContent;
        const r = document.createRange(); r.selectNodeContents(el);
        const tops = new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top)));
        return { text, textLines: text.split("\n").length, lineBoxes: tops.size, width: Math.round(el.getBoundingClientRect().width) };
      });
      m.noMidLiteralBreak = m.textLines === m.lineBoxes;
      await ed.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `gradient-well-${width}-${theme}.png`) });
      res.push({ width, theme, ok: true, ...m });
    } catch (e) { res.push({ width, theme, ok: false, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally {
  await browser.close();
  fs.writeFileSync(path.join(OUT, "probe-v11c02.json"), JSON.stringify({ base: BASE, res }, null, 1));
}

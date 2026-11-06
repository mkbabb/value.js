import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const O = "https://color.babb.dev";
const out = { at: new Date().toISOString(), cells: [] };
const browser = await chromium.launch();
try {
  const cell = async (name, vp, opts, fn) => {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    try { const page = await ctx.newPage(); out.cells.push({ name, ...(await fn(page)) }); }
    catch (e) { out.cells.push({ name, error: String(e).slice(0, 200) }); }
    finally { await ctx.close(); }
  };
  for (const [w, h] of [[844, 390], [1280, 800], [1440, 900], [390, 844]]) {
    await cell(`V-D1 spectrum ${w}x${h}`, { width: w, height: h }, {}, async (page) => {
      await page.goto(O + "/#/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".spectrum-picker", { timeout: 60000 });
      await page.waitForTimeout(1500);
      return page.evaluate(() => {
        const b = document.querySelector(".spectrum-picker").getBoundingClientRect();
        return { aspect: +(b.width / b.height).toFixed(3), w: +b.width.toFixed(1), h: +b.height.toFixed(1), doc: document.documentElement.scrollHeight, inner: innerHeight };
      });
    });
  }
  await cell("V-D4 label 1800 dark", { width: 1800, height: 1000 }, { colorScheme: "dark" }, async (page) => {
    await page.goto(O + "/#/", { waitUntil: "domcontentloaded" });
    const label = page.locator(".pane-wrapper--inspector [data-space-facts]").first();
    await label.waitFor({ timeout: 60000 }); await page.waitForTimeout(800);
    return label.evaluate((root) => ({
      separators: root.querySelectorAll('[data-orientation][role="none"], [role="separator"], hr').length,
      dl: root.querySelectorAll("dl.nl-facts").length,
      bdi: root.querySelectorAll("bdi").length,
      hoverOnly: [...root.querySelectorAll("*")].filter((e) => [...e.classList].some((c) => c.startsWith("hover:"))).length,
    }));
  });
  await cell("V-D3 chip 1440", { width: 1440, height: 900 }, { forcedColors: "active" }, async (page) => {
    await page.goto(O + "/#/gradient", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".glass-dock", { timeout: 60000 });
    const t = page.getByRole("combobox", { name: "Color space", exact: true }).first();
    await t.click(); await page.waitForTimeout(700);
    return page.getByRole("listbox").locator(".preview-chip").first().evaluate((e) => {
      const cs = getComputedStyle(e);
      return { ratio: +(parseFloat(cs.width) / parseFloat(cs.height)).toFixed(3), surface: e.hasAttribute("data-color-surface"), adjust: cs.forcedColorAdjust, image: cs.backgroundImage !== "none" };
    });
  });
} finally { await browser.close(); }
const f = process.argv[2]; writeFileSync(f, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out.cells));

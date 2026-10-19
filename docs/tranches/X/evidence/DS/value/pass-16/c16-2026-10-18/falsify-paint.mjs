// X-DS · value · pass 16 (V16C-01) — falsifier for harness.paintGate: the gate must REFUSE a frame
// whose pane card is covered by a bare ground, and a bead whose canvas has not drawn. Real Chrome,
// new headless (§0ei); one browser, one context per case, closed in finally.
import { chromium } from "@playwright/test";
import { bootRoute, newPage, paintGate } from "./harness.mjs";
const BASE = process.argv[2] || "http://localhost:9391";
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
const out = [];
const run = async (label, width, theme, route, hero, sabotage) => {
  const page = await newPage(browser, width, theme);
  try {
    await bootRoute(page, BASE + route);
    if (sabotage) await page.evaluate(sabotage);
    await page.waitForTimeout(300);
    try { out.push({ label, refused: false, r: await paintGate(page, { hero, tries: 2 }) }); }
    catch (e) { out.push({ label, refused: true, r: String(e).slice(0, 200) }); }
  } finally { await page.context().close(); }
};
try {
  await run("control: atmosphere 1440 light", 1440, "light", "/#/atmosphere", false, null);
  await run("ground over page (atmosphere 1440 light)", 1440, "light", "/#/atmosphere", false, () => {
    const d = document.createElement("div");
    d.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;background:linear-gradient(135deg,#e9e4f5,#f6efe6)";
    document.body.appendChild(d);
  });
  await run("control: picker 390 dark", 390, "dark", "/#/", true, null);
  await run("bead undrawn (picker 390 dark)", 390, "dark", "/#/", true, () => {
    const c = document.querySelector(".hero-blob-anchor canvas"); if (c) c.style.opacity = "0";
  });
} finally { await browser.close(); console.log(JSON.stringify(out, null, 1)); }

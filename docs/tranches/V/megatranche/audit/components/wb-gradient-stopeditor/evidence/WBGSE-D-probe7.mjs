// CHALLENGE-D probe 7 — isolate the zero-stop state after an empty-argument colour function.
import { chromium } from "playwright";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const URL = "http://localhost:9000/#/gradient";
const browser = await chromium.launch();

async function run(text, tag) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push("PAGEERROR " + String(e).slice(0, 240)));
  page.on("console", m => { const t = m.text(); if (m.type() === "error" && !t.includes("MISCONFIGURED")) errs.push("CONSOLE " + t.slice(0, 240)); });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2200);
  const before = await page.evaluate(() => ({ stops: document.querySelectorAll("[data-stop-id]").length, bar: !!document.querySelector('[data-testid="gradient-stop-bar"]'), bodyLen: document.body.innerText.length }));
  const editor = page.locator('[contenteditable="true"]');
  await editor.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type(text, { delay: 12 });
  await page.waitForTimeout(1800);
  const after = await page.evaluate(() => {
    const v = document.querySelector('[data-testid="gradient-parse-verdict"]');
    return { stops: document.querySelectorAll("[data-stop-id]").length,
             bar: !!document.querySelector('[data-testid="gradient-stop-bar"]'),
             tile: !!document.querySelector('[data-testid="gradient-render-tile"]'),
             verdict: v ? v.textContent.trim() : null,
             editorText: (document.querySelector('[contenteditable="true"]')?.innerText || "").replace(/\s+/g, " ").slice(0, 120),
             bodyLen: document.body.innerText.length };
  });
  console.log(`\n== ${tag} ==\n  typed: ${text}\n  before: ${JSON.stringify(before)}\n  after:  ${JSON.stringify(after)}\n  errs:   ${JSON.stringify(errs, null, 1)}`);
  await page.screenshot({ path: resolve(HERE, `WBGSE-${tag}.png`), fullPage: false });
  await ctx.close();
}

await run("linear-gradient(90deg, oklch() 0%, red 100%)", "p7-oklch-empty");
await run("linear-gradient(90deg, rgb() 0%, red 100%)", "p7-rgb-empty");
await run("linear-gradient(90deg, notacolor 0%, red 100%)", "p7-bogus");
await browser.close();

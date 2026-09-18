// CHALLENGE-D pass-3 · probe 8 — CHROMIUM adjudication.
// The repo's own standing rule (audit/visual/states.mjs:6-9) is that macOS ships Full Keyboard
// Access OFF, so WebKit tab order is not authoritative. Two claims are re-decided here in Chromium:
//   (a) does click-outside close restore focus to the opener?
//   (b) does the radio species paint ANY focus register?
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";
const OUT = resolve(import.meta.dirname, "evidence-p3");

const out = {};
const browser = await chromium.launch();
for (const scheme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.click('button[aria-label="Filters"]');
  await page.waitForTimeout(700);

  // (b) focus register per species
  const walk = [];
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(80);
    walk.push(await page.evaluate(() => {
      const el = document.activeElement; if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(), role: el.getAttribute("role"),
        cls: String(el.className).split(/\s+/).slice(0, 2).join("."),
        name: (el.getAttribute("aria-label") || el.textContent.trim() || el.placeholder || "").slice(0, 26),
        outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor,
        boxShadow: cs.boxShadow.slice(0, 70),
        paintsAnyRing: cs.outlineStyle !== "none" || (cs.boxShadow !== "none" && cs.boxShadow.length > 0),
        insidePopover: !!el.closest('[role="dialog"]'),
      };
    }));
  }
  const stillOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"][data-state="open"]'));

  // (a) close contracts
  if (!stillOpen) { await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700); }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);
  const afterEscape = await page.evaluate(() => ({
    open: !!document.querySelector('[role="dialog"][data-state="open"]'),
    focusIsTrigger: document.activeElement === document.querySelector('button[aria-label="Filters"]'),
    focusTag: document.activeElement?.tagName.toLowerCase() ?? null,
  }));
  await page.click('button[aria-label="Filters"]');
  await page.waitForTimeout(700);
  await page.mouse.click(120, 120);
  await page.waitForTimeout(700);
  const afterOutside = await page.evaluate(() => ({
    open: !!document.querySelector('[role="dialog"][data-state="open"]'),
    focusIsTrigger: document.activeElement === document.querySelector('button[aria-label="Filters"]'),
    focusTag: document.activeElement?.tagName.toLowerCase() ?? null,
  }));
  out[scheme] = { walk, stillOpenAfter8Tabs: stillOpen, afterEscape, afterOutside };
  await context.close();
}
await browser.close();
writeFileSync(resolve(OUT, "P3-8-chromium.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));

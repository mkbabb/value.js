// SS-8 B22 recon: the served easing panel DOM at 1440x900 light.
import { launch, cell, BASE, EVID } from "./lib.mjs";
import { writeFileSync } from "node:fs";
const b = await launch();
try {
  const r = await cell(b, {}, async (page) => {
    await page.goto(`${BASE}/#/gradient`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".easing-panel", { timeout: 120000 });
    await page.waitForTimeout(2500);
    const pre = await page.evaluate(() => ({
      rows: document.querySelectorAll(".easing-row").length,
      strips: document.querySelectorAll(".specimen-strip").length,
      visibleStrips: [...document.querySelectorAll(".specimen-strip")].filter(e => e.getClientRects().length).length,
      heads: [...document.querySelectorAll(".interval-head")].map(h => ({ text: h.textContent.trim().replace(/\s+/g," "), exp: h.getAttribute("aria-expanded") })),
      tiles: document.querySelectorAll(".specimen-tile").length,
    }));
    await page.locator(".interval-head").first().click();
    await page.waitForTimeout(1200);
    const post = await page.evaluate(() => {
      const s = [...document.querySelectorAll(".specimen-strip")].find(e => e.getClientRects().length);
      if (!s) return { visible: false };
      const r = s.getBoundingClientRect();
      const row = s.closest(".easing-row");
      return { visible: true, portW: r.width, portH: r.height, scrollW: s.scrollWidth, clientW: s.clientWidth,
        stripRowDisplay: getComputedStyle(s.querySelector(".strip-row")).display,
        tiles: s.querySelectorAll(".specimen-tile").length,
        pressed: [...s.querySelectorAll('.specimen-tile[data-state="on"]')].map(t => t.dataset.specimen),
        motionAccent: getComputedStyle(row).getPropertyValue("--motion-accent"),
        tileClass: s.querySelector(".specimen-tile").className,
        families: [...s.querySelectorAll(".family-eyebrow")].map(e=>e.textContent),
        html0: s.querySelector(".specimen-cell").outerHTML.slice(0, 700) };
    });
    await page.screenshot({ path: `${EVID}/recon-1440-light.png` });
    return { pre, post };
  });
  writeFileSync(`${EVID}/recon.out.json`, JSON.stringify(r, null, 1));
  console.log(JSON.stringify(r, null, 1).slice(0, 4000));
} finally { await b.close(); }

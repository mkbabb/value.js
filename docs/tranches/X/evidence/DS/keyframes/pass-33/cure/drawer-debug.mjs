// KF-C8-05 debug: the drawer's rows after ease-in → steps at 1440. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto("http://localhost:5173/#/easing", { waitUntil: "load" }); await page.waitForTimeout(4000);
  for (const n of ["ease-in", "steps"]) { await page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${n}"]`).first().click(); await page.waitForTimeout(1500); }
  console.log(JSON.stringify(await page.evaluate(() => {
    const d = document.querySelector(".easing-target .specimen-drawer"); const top = d.getBoundingClientRect().top;
    return { port: d.clientHeight, max: d.scrollHeight - d.clientHeight, st: d.scrollTop, snap: getComputedStyle(d).scrollSnapType,
      rows: [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => [e.textContent.trim().split(/\s/)[0], Math.round(e.getBoundingClientRect().top - top + d.scrollTop), Math.round(e.getBoundingClientRect().height)]).slice(-14) };
  })));
} finally { await browser.close(); }

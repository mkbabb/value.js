// KF-C8-05 debug: 390, picks ease-in-bounce → ease → ease-in → steps → ease-in-out-back → steps. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  await page.goto("http://localhost:5173/#/easing", { waitUntil: "load" }); await page.waitForTimeout(4000);
  const st = () => page.evaluate(() => {
    const d = document.querySelector(".easing-target .specimen-drawer"); const top = d.getBoundingClientRect().top;
    const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => [e.textContent.trim().split(/\s/)[0], Math.round(e.getBoundingClientRect().top - top + d.scrollTop), Math.round(e.getBoundingClientRect().height)]);
    return { port: d.clientHeight, sh: d.scrollHeight, st: Math.round(d.scrollTop), room: d.style.getPropertyValue("--drawer-end-room"), tail: rows.slice(-9) };
  });
  for (const n of ["ease-in-bounce", "ease", "ease-in", "steps", "ease-in-out-back", "steps"]) {
    await page.locator(`.easing-target .specimen-tile[aria-describedby$="-desc-${n}"]`).first().click(); await page.waitForTimeout(1500);
    console.log(n, JSON.stringify(await st()));
  }
} finally { await browser.close(); }

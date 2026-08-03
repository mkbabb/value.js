// CHALLENGE-L pass 3 — the error-channel probe.
// Question: when a non-image enters through the PICKER path, does any of the
// feature's three error surfaces fire?  Read-only.  node L3-error-channel.mjs
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const TARGET = "http://localhost:9000/#/extract";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
const consoleErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 160)));
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });
await page.goto(TARGET, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const read = () => page.evaluate(() => {
  const main = document.querySelector("main");
  const txt = (main?.innerText || "").trim();
  const img = document.querySelector('img[alt="Uploaded image"]');
  const zone = document.querySelector('[role="button"][aria-label*="image"]');
  return {
    visibleText: txt,
    hasImg: !!img,
    imgSrcPrefix: img ? img.src.slice(0, 40) : null,
    imgNaturalWidth: img ? img.naturalWidth : null,
    zoneAria: zone?.getAttribute("aria-label") ?? null,
    zoneTabindex: zone?.getAttribute("tabindex") ?? null,
    // ExtractWorkbench renders the error line with `text-destructive`
    destructiveNodes: [...document.querySelectorAll("main .text-destructive, main [class*='destructive']")]
      .map((e) => e.textContent.trim()).filter(Boolean),
  };
});

const out = { before: await read() };

await page.setInputFiles('input[type="file"]', {
  name: "not-an-image.txt",
  mimeType: "text/plain",
  buffer: Buffer.from("definitely not a png"),
});
await page.waitForTimeout(3000);
out.afterTxt = await read();
out.pageErrors = pageErrors;
out.consoleErrors = consoleErrors;

writeFileSync("L3-error-channel.json", JSON.stringify(out, null, 2));
await page.screenshot({ path: "L3-after-txt.png" });
await browser.close();
console.log(JSON.stringify(out, null, 2));

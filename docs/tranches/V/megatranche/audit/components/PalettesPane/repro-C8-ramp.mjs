/** CHALLENGE-C live probe #8 — the ruled "Palettes = rainbow" title ramp, light vs dark. */
import { chromium } from "playwright";
const browser = await chromium.launch();
for (const scheme of ["light", "dark"]) {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: scheme })).newPage();
  await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".palettes-ramp-text", { timeout: 20000 });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const el = document.querySelector(".palettes-ramp-text");
    const cs = getComputedStyle(el);
    const root = getComputedStyle(document.documentElement);
    return {
      htmlClass: document.documentElement.className.slice(0, 60),
      inlineStyle: el.getAttribute("style"),
      backgroundImage: cs.backgroundImage.slice(0, 200),
      backgroundClip: cs.webkitBackgroundClip || cs.backgroundClip,
      color: cs.color,
      tokens: {
        "--palettes-ramp-title-0": root.getPropertyValue("--palettes-ramp-title-0").trim(),
        "--palettes-ramp-title-1": root.getPropertyValue("--palettes-ramp-title-1").trim(),
        "--palettes-ramp-title-2": root.getPropertyValue("--palettes-ramp-title-2").trim(),
      },
    };
  });
  console.log("===", scheme, "===");
  console.log(JSON.stringify(r, null, 2));
  await page.close();
}
await browser.close();

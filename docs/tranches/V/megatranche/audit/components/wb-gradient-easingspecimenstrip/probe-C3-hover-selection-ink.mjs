import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const read = async (tag) => {
  const s = await page.evaluate(() => {
    const t = document.querySelector("[data-specimen='linear']");
    const lab = t.querySelector(".tile-label");
    const path = t.querySelector(".tile-glyph path");
    return { state: t.getAttribute("data-state"), labelColor: getComputedStyle(lab).color, labelWeight: getComputedStyle(lab).fontWeight, stroke: getComputedStyle(path).stroke, strokeW: getComputedStyle(path).strokeWidth };
  });
  console.log(tag, JSON.stringify(s));
};
await read("pressed, no hover");
await page.hover("[data-specimen='linear']");
await page.waitForTimeout(400);
await read("pressed, HOVERED ");
await page.hover("[data-specimen='ease']");
await page.waitForTimeout(400);
await read("pressed, unhovered");
await b.close();

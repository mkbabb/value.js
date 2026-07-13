// BR-5 decomposition: what fills the title->readout gap at 390? blob reservation
// vs dead band. Enumerate the .picker-header flex children + their boxes.
import { chromium } from "@playwright/test";
const PORT = 8599;
const SEED = "oklch(0.62 0.17 28)";
const base = `http://127.0.0.1:${PORT}/#/?space=oklch&color=${encodeURIComponent(SEED)}`;
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle","--use-angle=swiftshader","--force-device-scale-factor=2"] });

for (const [name, vp] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector(".picker-header", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1400);
  const info = await page.evaluate(() => {
    const header = document.querySelector(".picker-header");
    const r = (el) => { const b = el.getBoundingClientRect(); return { top:+b.top.toFixed(1), bottom:+b.bottom.toFixed(1), h:+b.height.toFixed(1), w:+b.width.toFixed(1), left:+b.left.toFixed(1) }; };
    const children = Array.from(header.children).map((c) => ({
      cls: (c.className || c.tagName).toString().slice(0, 50),
      box: r(c),
      minH: getComputedStyle(c).minHeight,
    }));
    const title = header.querySelector(".space-trigger");
    const titleRow = title?.closest(".title-row") || title?.parentElement;
    const readout = header.querySelector(".readout");
    const blob = header.querySelector("canvas") || header.querySelector("[class*=blob]");
    return {
      headerBox: r(header),
      rowGap: getComputedStyle(header).rowGap,
      children,
      title: title ? { box: r(title), fs: getComputedStyle(title).fontSize } : null,
      titleRow: titleRow ? { cls: titleRow.className.slice(0,50), box: r(titleRow), minH: getComputedStyle(titleRow).minHeight } : null,
      readout: readout ? { box: r(readout) } : null,
      blob: blob ? { cls:(blob.className||blob.tagName).toString().slice(0,40), box: r(blob) } : null,
    };
  });
  console.log(`\n===== ${name} =====`);
  console.log(JSON.stringify(info, null, 2));
  await ctx.close();
}
await browser.close();

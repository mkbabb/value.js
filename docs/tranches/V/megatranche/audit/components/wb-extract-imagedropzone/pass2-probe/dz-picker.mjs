import { chromium } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone";
const browser = await chromium.launch();

async function run(label, file, shot) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  // REAL file selection through the hidden <input type=file> — the picker path
  await page.locator('[role="button"][aria-label^="Upload image"] input[type=file]').setInputFiles(file);
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const z = [...document.querySelectorAll('[role="button"]')].filter(e=>/image/i.test(e.getAttribute("aria-label")||""))[0];
    const img = z.querySelector("img");
    const zr = z.getBoundingClientRect();
    const ir = img ? img.getBoundingClientRect() : null;
    return {
      zoneLabel: z.getAttribute("aria-label"), zoneTabindex: z.getAttribute("tabindex"),
      natural: img ? [img.naturalWidth, img.naturalHeight] : null,
      zoneBox: [Math.round(zr.width), Math.round(zr.height)],
      imgBox: ir ? [Math.round(ir.width), Math.round(ir.height)] : null,
      imgComputedHeight: img ? getComputedStyle(img).height : null,
      objectFit: img ? getComputedStyle(img).objectFit : null,
      visibleFraction: ir ? +(zr.height/ir.height).toFixed(4) : null,
      dataUrlChars: img ? img.src.length : null,
      destructiveLines: [...document.querySelectorAll(".text-destructive")].map(e=>e.textContent.trim()),
      dominant: (document.body.innerText.match(/\d+% of the image/)||[null])[0],
    };
  });
  console.log(`=== ${label} (picker path, real file) ===`);
  console.log(JSON.stringify(r, null, 1));
  console.log("pageErrors:", JSON.stringify(errs));
  if (shot) await page.screenshot({ path: `${OUT}/${shot}`, clip: { x: 250, y: 230, width: 540, height: 540 } });
  await page.close();
}
await run("portrait 120x900", "portrait.png", "evidence-tall-image-crop.png");
await run("landscape 900x120 (control)", "landscape.png", null);
await run("broken.png (valid header, garbage bytes)", "broken.png", "evidence-broken-image-state.png");
await browser.close();

import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const r = await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pick = () => [...document.querySelectorAll('[role="button"]')].filter((e) => /image/i.test(e.getAttribute("aria-label") || ""))[0];
  let z = pick(); const out = {};
  const c = document.createElement("canvas"); c.width = 200; c.height = 120;
  const g = c.getContext("2d");
  for (let x = 0; x < 200; x++) { g.fillStyle = `hsl(${(x/200)*360} 70% 50%)`; g.fillRect(x,0,1,120); }
  const blob = await new Promise((res) => c.toBlob(res, "image/png"));
  const dt = new DataTransfer(); dt.items.add(new File([blob], "wide.png", { type: "image/png" }));
  z.dispatchEvent(new DragEvent("drop", { dataTransfer: dt, bubbles: true, cancelable: true }));
  await sleep(2500);
  z = pick();
  const OV = ".glass-floating";
  out.overlayBefore = document.querySelectorAll(OV).length;
  // KEYBOARD
  z.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
  z.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }));
  await sleep(600);
  out.overlayAfterKeyboard = document.querySelectorAll(OV).length;
  out.tapToSampleAfterKeyboard = /Tap to sample/.test(document.body.innerText);
  // MOUSE
  z.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  await sleep(900);
  out.overlayAfterClick = document.querySelectorAll(OV).length;
  out.tapToSampleAfterClick = /Tap to sample/.test(document.body.innerText);
  out.activeElementAfterOpen = document.activeElement && document.activeElement.tagName + "." + String(document.activeElement.className).slice(0,40);
  // preview img box vs zone box (landscape control case)
  const img = z.querySelector("img");
  if (img) { const zr = z.getBoundingClientRect(), ir = img.getBoundingClientRect();
    out.landscape = { zone: [Math.round(zr.width), Math.round(zr.height)], img: [Math.round(ir.width), Math.round(ir.height)] }; }
  return out;
});
console.log(JSON.stringify(r, null, 2));
await browser.close();

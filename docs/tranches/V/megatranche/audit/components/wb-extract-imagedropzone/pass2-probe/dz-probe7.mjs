import { chromium } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-imagedropzone";
const browser = await chromium.launch();

// ---------- A. corrupt-but-image/png file ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(async () => {
    const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
    window.__rej = [];
    window.addEventListener("unhandledrejection", (e) => window.__rej.push(String((e.reason&&e.reason.message)||e.reason)));
    const pick = () => [...document.querySelectorAll('[role="button"]')].filter((e)=>/image/i.test(e.getAttribute("aria-label")||""))[0];
    const z = pick();
    const bytes = new Uint8Array([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A,1,2,3,4,5,6,7,8]);
    const dt = new DataTransfer(); dt.items.add(new File([bytes], "broken.png", { type: "image/png" }));
    z.dispatchEvent(new DragEvent("drop", { dataTransfer: dt, bubbles: true, cancelable: true }));
    await sleep(2500);
    const z2 = pick(); const img = z2.querySelector("img");
    return { unhandledRejections: window.__rej,
      zoneLabel: z2.getAttribute("aria-label"), zoneTabindex: z2.getAttribute("tabindex"),
      imgNatural: img ? [img.naturalWidth, img.naturalHeight] : null, imgAlt: img && img.alt,
      destructiveLines: [...document.querySelectorAll(".text-destructive")].map(e=>e.textContent.trim()),
      liveRegionText: [...document.querySelectorAll("[aria-live],[role=status],[role=alert]")].map(e=>e.textContent.trim().slice(0,60)),
      dropZoneCount: [...document.querySelectorAll('[role="button"]')].filter((e)=>/image/i.test(e.getAttribute("aria-label")||"")).length };
  });
  console.log("=== A. corrupt image/png drop ===");
  console.log(JSON.stringify(r, null, 1));
  await page.screenshot({ path: `${OUT}/evidence-broken-image-state.png`, clip: { x: 240, y: 200, width: 560, height: 480 } });
  await page.close();
}

// ---------- B. tall image crop ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(async () => {
    const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
    const pick = () => [...document.querySelectorAll('[role="button"]')].filter((e)=>/image/i.test(e.getAttribute("aria-label")||""))[0];
    const z0 = pick();
    const c = document.createElement("canvas"); c.width = 120; c.height = 900;
    const g = c.getContext("2d");
    for (let y=0;y<900;y++){ g.fillStyle=`hsl(${(y/900)*360} 80% 50%)`; g.fillRect(0,y,120,1); }
    g.fillStyle="#000"; g.font="bold 22px sans-serif"; g.fillText("TOP",6,34); g.fillText("BOT",6,884);
    const b = await new Promise(res=>c.toBlob(res,"image/png"));
    const f = new File([b],"tall.png",{type:"image/png"});
    const dt = new DataTransfer(); dt.items.add(f);
    z0.dispatchEvent(new DragEvent("drop",{dataTransfer:dt,bubbles:true,cancelable:true}));
    await sleep(2500);
    const z = pick(); const img = z.querySelector("img");
    const zr = z.getBoundingClientRect(), ir = img.getBoundingClientRect();
    return { source:[img.naturalWidth,img.naturalHeight],
      zoneBox:[Math.round(zr.width),Math.round(zr.height)], imgBox:[Math.round(ir.width),Math.round(ir.height)],
      imgComputedHeight:getComputedStyle(img).height, imgObjectFit:getComputedStyle(img).objectFit,
      visibleFraction:+(zr.height/ir.height).toFixed(4),
      fileBytes:f.size, dataUrlChars: img.src.length, inflation:+(img.src.length/f.size).toFixed(4) };
  });
  console.log("=== B. tall (120x900) image ===");
  console.log(JSON.stringify(r, null, 1));
  await page.screenshot({ path: `${OUT}/evidence-tall-image-crop.png`, clip: { x: 240, y: 200, width: 560, height: 560 } });
  await page.close();
}
await browser.close();

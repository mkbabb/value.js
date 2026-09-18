import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
page.on("console", (m) => { if (m.type()==="error") errs.push("console.error: " + m.text().slice(0,140)); });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const r = await page.evaluate(async () => {
  const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
  window.__rej=[]; window.addEventListener("unhandledrejection",(e)=>window.__rej.push(String((e.reason&&e.reason.message)||e.reason)));
  const pick=()=>[...document.querySelectorAll('[role="button"]')].filter(e=>/image/i.test(e.getAttribute("aria-label")||""))[0];
  const z=pick();
  const dt=new DataTransfer();
  dt.items.add(new File([new Uint8Array([0x89,0x50,0x4E,0x47,13,10,26,10,1,2,3,4])],"broken.png",{type:"image/png"}));
  z.dispatchEvent(new DragEvent("drop",{dataTransfer:dt,bubbles:true,cancelable:true}));
  await sleep(2000);
  const z2=pick();
  z2.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true}));
  await sleep(1500);
  const ov=document.querySelector(".glass-floating");
  const canv=ov&&ov.querySelector("canvas");
  return { eyedropperOpened: !!ov,
    overlayText: ov ? ov.innerText.replace(/\s+/g," ").slice(0,120) : null,
    canvasSize: canv ? [canv.width, canv.height] : null,
    rejections: window.__rej };
});
console.log(JSON.stringify(r,null,1));
console.log("--- page/console errors ---"); console.log(JSON.stringify(errs.filter(e=>!/MISCONFIGURED|VITE_API_URL/.test(e)),null,1));
await browser.close();

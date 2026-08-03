import { webkit } from "playwright";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const V = '[data-testid="gradient-parse-verdict"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await webkit.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2000);
await page.locator(EDITOR).first().scrollIntoViewIfNeeded();
await page.locator(EDITOR).first().click();
await page.keyboard.press("Meta+a");
await page.keyboard.type("linear-gradient(90deg, red, notacolor)", { delay: 3 });
await sleep(1000);
const m = await page.evaluate(([es, vs]) => {
  const e = document.querySelector(es), v = document.querySelector(vs);
  const sc = document.querySelector(".pane-scroll-fade");
  const vr = v.getBoundingClientRect(), sr = sc.getBoundingClientRect();
  return {
    verdictRect: { top: Math.round(vr.top), bottom: Math.round(vr.bottom), h: Math.round(vr.height) },
    paneScrollportRect: { top: Math.round(sr.top), bottom: Math.round(sr.bottom) },
    fullyVisible: vr.top >= sr.top && vr.bottom <= sr.bottom,
    pixelsBelowFold: Math.round(Math.max(0, vr.bottom - sr.bottom)),
    scrollTop: Math.round(sc.scrollTop), scrollMax: Math.round(sc.scrollHeight - sc.clientHeight),
  };
}, [EDITOR, V]);
console.log(JSON.stringify(m));
await b.close();

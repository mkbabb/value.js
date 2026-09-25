// Does calc(var(--dock-control-size)/2 + var(--dock-padding-block)) equal the plate's half block size? (candidate cap-rest length)
import { chromium } from "playwright";
const b = await chromium.launch({ headless: false });
for (const [url, w, route] of [["http://localhost:9000/", 1440, "/atmosphere"], ["http://localhost:9000/", 390, "/"], ["http://localhost:5173/", 1440, null]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(url, { waitUntil: "networkidle" }).catch(() => {}); await p.waitForTimeout(3000);
  if (route) { await p.evaluate((r) => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push(r), route); await p.waitForTimeout(1800); }
  console.log(url, w, route, JSON.stringify(await p.evaluate(() => [...document.querySelectorAll(".dock-plate")].map((pl) => {
    const probe = document.createElement("div"); probe.style.cssText = "position:absolute;width:calc(var(--dock-control-size) / 2 + var(--dock-padding-block));height:0";
    pl.parentElement.appendChild(probe); const half = probe.getBoundingClientRect().width; probe.remove();
    return { plateH: pl.getBoundingClientRect().height, halfH: pl.getBoundingClientRect().height / 2, candidate: half, dockPadBlock: getComputedStyle(pl.parentElement).paddingBlockStart };
  }))));
}
await b.close();

import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil:"load" });
await page.waitForTimeout(3200);
const a = await page.evaluate(() => {
  const strip = document.querySelector(".fading-scroll");
  const card = document.querySelector(".readout-rail").closest(".rounded-card");
  return { routeElements: document.querySelectorAll("main *").length,
    docElements: document.querySelectorAll("*").length,
    stripElements: strip.querySelectorAll("*").length + 1,
    easingCardElements: card.querySelectorAll("*").length + 1,
    intervals: document.querySelectorAll(".interval-head").length,
    svgPaths: strip.querySelectorAll("path").length,
    pathPointsFirst: (strip.querySelector("path").getAttribute("d").match(/L/g)||[]).length + 1 };
});
// try to add a stop by double-clicking the editing rail
const railSel = ".rail-handle";
const before = a.intervals;
await page.evaluate(() => {
  const rail = document.querySelector(".rail-handle")?.parentElement;
  if (!rail) return;
  const r = rail.getBoundingClientRect();
  rail.dispatchEvent(new MouseEvent("dblclick", { bubbles:true, clientX: r.x + r.width*0.5, clientY: r.y + r.height*0.5 }));
});
await page.waitForTimeout(900);
const b = await page.evaluate(() => ({
  intervals: document.querySelectorAll(".interval-head").length,
  strips: document.querySelectorAll(".fading-scroll").length,
  tilesTotal: document.querySelectorAll(".specimen-tile").length,
  routeElements: document.querySelectorAll("main *").length,
}));
console.log(JSON.stringify({ oneInterval: a, afterAddAttempt: b }, null, 1));
await browser.close();

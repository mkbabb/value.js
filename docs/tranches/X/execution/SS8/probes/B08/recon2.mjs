// SS-8 B08 recon 2: what is the save-well add slot's accessible name at HEAD (offline API)?
import { chromium } from "playwright";
import { O, routeApi, newCell, settle } from "./lib.mjs";
const browser = await chromium.launch();
try {
  const ctx = await newCell(browser);
  try {
    await routeApi(ctx, () => "abort");
    const page = await ctx.newPage();
    await page.goto(O + "/#/palettes", { waitUntil: "load" }); await settle(page, 3000);
    console.log(JSON.stringify(await page.evaluate(() => {
      const w = document.querySelector(".current-palette-well");
      return { well: !!w, btns: w ? [...w.querySelectorAll("button,[role=button]")].map((b) => b.outerHTML.slice(0, 220)) : [], panes: [...document.querySelectorAll("h1,h2")].map((h) => h.textContent.trim()) };
    })));
  } finally { await ctx.close(); }
} finally { await browser.close(); }

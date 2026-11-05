import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "https://color.babb.dev";
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/#/browse", { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(5000);
  const out = await page.evaluate(() => [...document.querySelectorAll(".palette-card")].slice(0, 6).map((card) => {
    const name = card.querySelector("[data-palette-name]")?.textContent.trim();
    const top = card.firstElementChild;
    const leaves = [...card.querySelectorAll("*")].filter((e) => { const b = e.getBoundingClientRect(); const cb = card.getBoundingClientRect(); return b.top - cb.top < 45 && b.height > 20 && b.width > 20; });
    return { name, html: card.outerHTML.slice(0, 900), leaves: leaves.slice(0, 6).map((e) => [e.tagName, e.className.toString().slice(0, 60), getComputedStyle(e).backgroundColor, e.getAttribute("style")?.slice(0, 120), Math.round(e.getBoundingClientRect().width)]) };
  }));
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }

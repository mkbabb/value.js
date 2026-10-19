// SS8 B10-browse recon: what does #/browse request and render? one browser, one context.
import { chromium } from "playwright";
const OUT = process.argv[2];
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const reqs = [];
  page.on("request", (r) => { const u = r.url(); if (!/node_modules|@vite|\.css|\.svg|\.woff/.test(u)) reqs.push(r.method() + " " + u); });
  const cons = []; page.on("console", (m) => cons.push(m.type() + ": " + m.text().slice(0, 200)));
  await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const info = await page.evaluate(() => ({
    title: document.title,
    cards: document.querySelectorAll("[data-palette-slug], .palette-inspector, article").length,
    text: document.querySelector("main")?.innerText?.slice(0, 600) ?? document.body.innerText.slice(0, 600),
  }));
  console.log(JSON.stringify({ info, reqs: reqs.filter(r => /3000|api|palettes|\.vue/.test(r)).slice(0, 60), cons: cons.slice(0, 15) }, null, 1));
  await page.screenshot({ path: OUT + "/recon-1280-light.png" });
  await ctx.close();
} finally { await browser.close(); }

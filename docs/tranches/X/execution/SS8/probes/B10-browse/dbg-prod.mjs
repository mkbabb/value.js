// debug: why the prod-proxied wall stays empty
import { chromium } from "playwright";
import { APP, routeProd, sleep } from "./lib.mjs";
const b = await chromium.launch();
try {
  const ctx = await b.newContext();
  const log = []; await routeProd(ctx, log);
  const page = await ctx.newPage();
  const resp = [];
  page.on("response", (r) => { if (/3000/.test(r.url())) resp.push(r.status() + " " + r.url()); });
  page.on("console", (m) => { if (m.type() !== "debug") resp.push("console " + m.text().slice(0, 160)); });
  await page.goto(`${APP}/#/browse`); await sleep(8000);
  console.log(JSON.stringify({ log, resp: resp.slice(0, 20), text: (await page.innerText("body")).slice(0, 300) }, null, 1));
  await ctx.close();
} finally { await b.close(); }

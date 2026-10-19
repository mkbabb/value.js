import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try { const c = await b.newContext({ viewport: { width: 1440, height: 900 } }); try { const p = await c.newPage();
  await p.goto("http://localhost:3100/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
  await p.waitForSelector(".paper-description", { timeout: 90000 });
  console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll(".paper-description")].slice(0,3).map(d => ({ html: d.outerHTML.slice(0, 400), dts: [...d.querySelectorAll("dt")].map(t => [t.textContent, t.getBoundingClientRect().height]) })))));
} finally { await c.close(); } } finally { await b.close(); }

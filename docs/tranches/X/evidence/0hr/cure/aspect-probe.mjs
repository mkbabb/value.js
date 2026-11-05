// §0hr OD-19 spectrum-aspect falsifier. Gate: picker + mix spectrum aspect <= 2.5 at every
// desktop band (1440..3440, dark+light) on picker, mix and palettes; 390 reported. Console errors gate on prod only (no local API).
// One headless Chromium, one context per cell, closed in finally; local static server stopped in finally.
// Usage: node aspect-probe.mjs <distDir|https-origin> <port>   (under ~/.claude/guard/guarded)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const [target, port = "9431"] = process.argv.slice(2);
const remote = target.startsWith("http");
const types = { ".js":"text/javascript", ".css":"text/css", ".html":"text/html", ".woff2":"font/woff2", ".svg":"image/svg+xml", ".json":"application/json", ".png":"image/png" };
let srv = null;
if (!remote) {
  srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split("?")[0]); if (p === "/") p = "/index.html"; const f = path.join(target, p);
    fs.readFile(f, (e, d) => { if (e) { fs.readFile(path.join(target, "index.html"), (_, d2) => { r.writeHead(200, {"content-type":"text/html"}); r.end(d2); }); return; } r.writeHead(200, {"content-type": types[path.extname(f)] || "application/octet-stream"}); r.end(d); }); });
  await new Promise(res => srv.listen(+port, res));
}
const origin = remote ? target : `http://localhost:${port}`;
const browser = await chromium.launch({ headless: true });
const out = []; let fail = 0;
try {
  const cells = [];
  for (const [w, h] of [[1440, 900], [1512, 860], [1800, 1000], [2560, 1440], [3440, 1440]])
    for (const scheme of ["dark", "light"]) for (const route of ["/", "/mix", "/palettes"]) cells.push({ w, h, scheme, route });
  for (const scheme of ["dark", "light"]) cells.push({ w: 390, h: 844, scheme, route: "/" });
  for (const c of cells) {
    const ctx = await browser.newContext({ viewport: { width: c.w, height: c.h }, colorScheme: c.scheme, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage(); const errors = [];
      page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
      await page.goto(`${origin}/?p=${Date.now()}#${c.route}`);
      await page.waitForSelector(".spectrum-picker", { timeout: 30000 });
      await page.waitForTimeout(2500);
      const m = await page.evaluate(() => {
        const e = document.querySelector(".pane-wrapper--stage .spectrum-picker") ?? document.querySelector(".spectrum-picker");
        const b = e.getBoundingClientRect();
        const stage = document.querySelector(".pane-container > .pane-wrapper--stage");
        return { sp: [Math.round(b.width * 10) / 10, Math.round(b.height * 10) / 10], stage: stage?.offsetWidth ?? null,
          measure: getComputedStyle(document.documentElement).getPropertyValue("--picker-measure").trim() };
      });
      const aspect = Math.round((m.sp[0] / m.sp[1]) * 1000) / 1000;
      const gated = c.w >= 1024;
      const ok = !gated || aspect <= 2.5;
      if (!ok) fail++;
      if (errors.length && remote) fail++;
      out.push({ ...c, ...m, aspect, gated, ok, errors: errors.length, err0: errors[0] });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); if (srv) srv.close(); }
for (const r of out) console.log(JSON.stringify(r));
console.log(fail ? `ASPECT-GATE RED (${fail})` : "ASPECT-GATE GREEN");
process.exit(fail ? 1 : 0);

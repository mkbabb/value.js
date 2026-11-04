import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const [dir, port, tag, outDir] = process.argv.slice(2);
const types = { ".js":"text/javascript", ".css":"text/css", ".html":"text/html", ".woff2":"font/woff2", ".svg":"image/svg+xml", ".json":"application/json", ".png":"image/png" };
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split("?")[0]); if (p === "/") p = "/index.html"; const f = path.join(dir, p);
  fs.readFile(f, (e, d) => { if (e) { fs.readFile(path.join(dir, "index.html"), (_, d2) => { r.writeHead(200, {"content-type":"text/html"}); r.end(d2); }); return; } r.writeHead(200, {"content-type": types[path.extname(f)] || "application/octet-stream"}); r.end(d); }); });
await new Promise(res => srv.listen(+port, res));
const browser = await chromium.launch({ headless: true });
const out = [];
try {
  for (const [w, h] of [[1440, 900], [1512, 860], [1800, 1000]]) {
    for (const route of ["/", "/mix", "/palettes"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
      try {
        const page = await ctx.newPage();
        await page.goto(`http://localhost:${port}/#${route}`);
        await page.waitForSelector(".pane-container > .pane-wrapper--stage .spectrum-picker", { timeout: 30000 });
        await page.waitForTimeout(2500);
        const m = await page.evaluate(() => {
          const ow = s => document.querySelector(s)?.offsetWidth ?? null;
          const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.width*10)/10, Math.round(b.height*10)/10]; };
          const sp = r(".pane-wrapper--stage .spectrum-picker");
          const sliders = [...document.querySelectorAll(".pane-wrapper--stage .channel-slider")].map(e => Math.round(e.getBoundingClientRect().width));
          return { measure: getComputedStyle(document.documentElement).getPropertyValue("--picker-measure").trim(),
            stage: ow(".pane-container > .pane-wrapper--stage"), inspector: ow(".pane-container > .pane-wrapper--inspector"), row: ow(".pane-container"),
            spectrum: sp, aspect: sp ? Math.round(sp[0]/sp[1]*100)/100 : null, sliderW: sliders.length ? [Math.min(...sliders), Math.max(...sliders)] : null,
            readout: r(".pane-wrapper--stage .readout"), meterW: [...document.querySelectorAll(".pane-wrapper--stage .channel-meter")].map(e=>Math.round(e.getBoundingClientRect().width)), meterOverflow: [...document.querySelectorAll(".pane-wrapper--stage .channel-meter")].some(e=>e.scrollWidth>e.clientWidth+1) };
        });
        out.push({ w, h, route, ...m });
        if (route !== "/palettes") await page.screenshot({ path: `${outDir}/${tag}-${w}${route === "/" ? "-home" : route.replace("/", "-")}.png` });
      } finally { await ctx.close(); }
    }
  }
} finally { await browser.close(); srv.close(); }
console.log(JSON.stringify(out, null, 0).replace(/\},\{/g, "},\n{"));

// SERVED MODEL: claude-opus-5-5 — X.W11.p4f: long tasks at 4x CPU vs the overture marks (b1..b4) and the aurora/blob arrival; BLOCK=HeroBlob aborts that chunk; one browser, context per run, closed in finally
import { chromium } from "playwright";
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
const dist = path.resolve(process.argv[2]); const runs = Number(process.argv[3] ?? 2); const block = process.env.BLOCK;
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".json": "application/json", ".wasm": "application/wasm" };
const server = http.createServer(async (q, r) => { let p = decodeURIComponent(new URL(q.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
  if (block && p.includes(block)) { r.writeHead(404); r.end(); return; }
  try { const b = await readFile(path.join(dist, p)); r.writeHead(200, { "content-type": T[path.extname(p)] ?? "application/octet-stream" }); r.end(b); } catch { r.writeHead(404); r.end(); } });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
try {
  for (const vp of [{ width: 1350, height: 940 }, { width: 412, height: 823 }]) for (let i = 0; i < runs; i++) {
    const context = await browser.newContext({ viewport: vp, reducedMotion: process.env.PRM ? "reduce" : "no-preference" });
    try {
      await context.route(/^(?!http:\/\/127\.0\.0\.1)/, (r) => r.abort());
      await context.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); });
      const page = await context.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
      const cdp = await context.newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.goto(origin + "/", { waitUntil: "load" }); await page.waitForTimeout(6000);
      const r = await page.evaluate(() => ({ lt: window.__lt, marks: performance.getEntriesByType("mark").filter((m) => /overture|blob|aurora/i.test(m.name)).map((m) => `${m.name}@${Math.round(m.startTime)}`),
        blob: !!document.querySelector(".hero-blob-anchor canvas"), arrived: document.querySelector(".atmosphere-canvas")?.className ?? null }));
      const tbt = r.lt.reduce((a, [, d]) => a + Math.max(0, d - 50), 0);
      console.log(`${vp.width} r${i + 1} lt=${JSON.stringify(r.lt)} sum>50=${tbt} marks=${r.marks.join(",")} blobCanvas=${r.blob} canvas="${r.arrived}" errs=${errs.length}`);
    } finally { await context.close(); }
  }
} finally { await browser.close(); server.close(); }

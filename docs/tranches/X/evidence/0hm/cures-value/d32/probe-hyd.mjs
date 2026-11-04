// D-32: N cold home loads, one context each; collect hydration mismatch detail.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://127.0.0.1:4377";
const OUT = process.env.HOME + "/.dev-logs/x-0hm-cures/value/" + (process.argv[2] || "hyd");
fs.mkdirSync(OUT, { recursive: true });
const VP = [
  [{ width: 1800, height: 1000 }, "dark", 2, false], [{ width: 1440, height: 900 }, "light", 1, false],
  [{ width: 390, height: 844 }, "dark", 2, true], [{ width: 430, height: 932 }, "light", 2, true], [{ width: 844, height: 390 }, "dark", 2, true],
];
const N = +(process.env.N || 10);
const res = [];
const b = await chromium.launch();
try {
  for (let i = 0; i < N; i++) {
    const [viewport, colorScheme, dsf, mob] = VP[i % VP.length];
    const ctx = await b.newContext({ viewport, colorScheme, deviceScaleFactor: dsf, isMobile: mob, hasTouch: mob });
    try {
      if (process.env.DIST) {
        const path = require("node:path");
        const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".txt": "text/plain", ".wasm": "application/wasm" };
        await ctx.route(process.env.ROUTE_ORIGIN + "/**", async (route) => {
          let u = new URL(route.request().url()).pathname; if (u.endsWith("/")) u += "index.html";
          const f = path.join(process.env.DIST, decodeURIComponent(u));
          if (!fs.existsSync(f)) return route.fulfill({ status: 404, body: "" });
          return route.fulfill({ status: 200, body: fs.readFileSync(f), contentType: types[path.extname(f)] || "application/octet-stream" });
        });
      }
      const p = await ctx.newPage();
      if (process.env.THROTTLE) { const cdp = await ctx.newCDPSession(p); await cdp.send("Emulation.setCPUThrottlingRate", { rate: +process.env.THROTTLE }); }
      await p.addInitScript(() => { window.__w = []; const ow = console.warn; console.warn = (...a) => { try { window.__w.push(a.map((x) => x instanceof Node ? (x.nodeType === 1 ? x.outerHTML.slice(0, 300) : "#" + x.nodeType + ":" + String(x.textContent).slice(0, 120)) : String(x)).join(" | ").slice(0, 3000)); } catch {} ow.apply(console, a); }; });
      const msgs = [];
      p.on("console", (m) => { const t = m.text(); if (/[Hh]ydration/.test(t) || m.type() === "error") msgs.push(m.type() + " " + t.slice(0, 3000)); });
      p.on("pageerror", (e) => msgs.push("PE " + String(e).slice(0, 300)));
      await p.goto(BASE + (process.env.HASHPATH ?? "/"), { waitUntil: "load", timeout: 45000 });
      await p.waitForTimeout(3500);
      const fv = await p.evaluate(() => document.documentElement.dataset.firstView || null);
      const nameLine = await p.evaluate(() => document.querySelector('[data-testid="picker-color-name"]')?.textContent?.trim() ?? null);
      const warns = await p.evaluate(() => window.__w.filter((w) => /ydration/.test(w)));
      res.push({ i, vw: viewport.width, colorScheme, firstView: fv, mismatch: msgs.some((m) => /mismatch/i.test(m)), msgs: msgs.slice(0, 8), warns, nameLine });
    } finally { await ctx.close(); }
  }
} finally { await b.close(); fs.writeFileSync(OUT + "/res.json", JSON.stringify(res, null, 1)); }
console.log(res.filter((r) => r.mismatch).length + "/" + res.length + " mismatch");

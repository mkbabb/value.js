// §0hr.2 (7) prod re-read: typing "daraksha" commits Efflorescence (no invalid badge).
// One headless Chromium per run, a context per cell, closed in finally.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "https://color.babb.dev";
const TAG = process.argv[2] || "r";
const OUT = process.env.HOME + "/.dev-logs/x-0hr/ship/alias/" + TAG;
fs.mkdirSync(OUT, { recursive: true });
const rows = [];
const browser = await chromium.launch();
try {
  for (const vp of [[1800, 1000, 1, false], [390, 844, 2, true]]) for (const scheme of ["dark", "light"]) {
    const ctx = await browser.newContext({ viewport: { width: vp[0], height: vp[1] }, deviceScaleFactor: vp[2], isMobile: vp[3], hasTouch: vp[3], colorScheme: scheme });
    try {
      if (BASE.includes("vj.test")) {
        const LOCAL = process.env.LOCAL || "http://localhost:8190";
        await ctx.route(BASE + "/**", async (route) => {
          const res = await fetch(route.request().url().replace(BASE, LOCAL));
          const body = Buffer.from(await res.arrayBuffer());
          const headers = {}; res.headers.forEach((v, k) => { if (!/content-encoding|content-length|transfer-encoding/.test(k)) headers[k] = v; });
          return route.fulfill({ status: res.status, body, headers });
        });
        await ctx.route("https://api.color.babb.dev/**", async (route) => {
          const req = route.request();
          if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,OPTIONS" } });
          if (req.method() !== "GET") return route.fulfill({ status: 403, body: "{}", headers: { "access-control-allow-origin": "*", "content-type": "application/json" } });
          const res = await fetch(req.url(), { headers: { accept: "application/json" } });
          return route.fulfill({ status: res.status, body: Buffer.from(await res.arrayBuffer()), headers: { "content-type": res.headers.get("content-type") || "application/json", "access-control-allow-origin": "*" } });
        });
      }
      const page = await ctx.newPage();
      const bundles = new Set();
      page.on("response", (r) => { const m = r.url().match(/assets\/(index-[A-Za-z0-9_-]+\.js)/); if (m) bundles.add(m[1]); });
      await page.goto(`${BASE}/#/?space=oklch&color=red`, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(3500);
      await page.getByRole("button", { name: "Toggle action bar" }).click().catch(() => {});
      await page.waitForTimeout(1200);
      await page.getByRole("button", { name: "Open color input" }).click();
      await page.waitForSelector(".color-input", { timeout: 15000 });
      await page.waitForTimeout(800);
      await page.keyboard.press("ControlOrMeta+A");
      await page.keyboard.type("daraksha");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(2000);
      const r = await page.evaluate(() => ({
        badge: !!document.getElementById("color-input-error"),
        invalid: !!document.querySelector(".color-field.color-input-error"),
        hash: decodeURIComponent(location.hash),
        named: /Efflorescence/.test(document.body.innerText),
      }));
      await page.screenshot({ path: `${OUT}/alias-${vp[0]}-${scheme}.png` });
      const ok = !r.badge && !r.invalid && !/color=red(&|$)/.test(r.hash) && r.named;
      rows.push({ vp: `${vp[0]}x${vp[1]}`, scheme, ...r, bundles: [...bundles], ok });
    } catch (e) { rows.push({ vp: `${vp[0]}x${vp[1]}`, scheme, error: String(e).slice(0, 200), ok: false }); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(`${OUT}/alias.json`, JSON.stringify(rows, null, 1)); }
for (const r of rows) console.log(JSON.stringify(r));
console.log(rows.every((r) => r.ok) ? "ALIAS GREEN" : "ALIAS RED");

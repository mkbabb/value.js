// read-only: the EMPTY state via a stubbed empty list (live data stopped being empty mid-audit: 3 public rows appeared)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
for (const [vp, w, h] of [["d", 1440, 900], ["m", 390, 844]]) for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, isMobile: vp === "m", hasTouch: vp === "m" });
  const p = await ctx.newPage();
  await p.route("**/api/visualizations**", (r) => new URL(r.request().url()).pathname === "/api/visualizations" ? r.fulfill({ status: 200, contentType: "application/json", body: '{"items":[],"next_cursor":null,"has_more":false}' }) : r.continue());
  await p.goto("http://localhost:3100/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}${vp}-${theme}-0-empty-stubbed.png` });
  if (vp === "d") { await p.getByRole("button", { name: /Visualizer/ }).hover(); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}${vp}-${theme}-0b-empty-cta-hover.png` }); }
  console.log(vp, theme, JSON.stringify(await p.evaluate(() => { const bt = [...document.querySelectorAll("button")].find((x) => /Visualizer/.test(x.textContent)); const r = bt.getBoundingClientRect(); const e = bt.closest(".flex-1"); const er = e.getBoundingClientRect();
    return { cta: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], empty: [Math.round(er.y), Math.round(er.height)], txt: e.textContent.trim(), searchVisible: !!document.querySelector("#gallery-search-input") }; })));
  await ctx.close(); }
await b.close();

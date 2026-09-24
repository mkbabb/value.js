// SERVED MODEL: claude-opus-5-5
// UIA-KF-001/002 · where does a toast paint, and does one survive a scene switch?
// Leg A: #/cube, Mod+S (Copy CSS -> success toast) — the toast's box vs the viewport (1440x900 + 390x844).
// Leg B: toast raised, then a dock scene switch cube -> amiga within 300 ms — is it still on screen after?
// usage: node toast.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = { base: BASE };
const find = (p, re) => p.evaluate((src) => { const rx = new RegExp(src, "i"); const vw = innerWidth, vh = innerHeight;
  const els = [...document.querySelectorAll("li, [role=status], [role=alert], [data-state=open]")].filter((e) => rx.test(e.textContent || "") && e.children.length < 12);
  return els.slice(0, 3).map((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { tag: e.tagName, text: (e.textContent || "").trim().slice(0, 60), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), onScreen: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw, position: cs.position, opacity: cs.opacity }; }); }, re.source);
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); await ctx.grantPermissions(["clipboard-read", "clipboard-write"]); const p = await ctx.newPage();
  await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
  await p.keyboard.press("Meta+s"); await p.waitForTimeout(900);
  res[`copy-${w}`] = await find(p, /copied|clipboard/); await p.screenshot({ path: `${OUT}copy-${w}.png` });
  await ctx.close();
}
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); await ctx.grantPermissions(["clipboard-read", "clipboard-write"]); const p = await ctx.newPage();
  await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
  await p.keyboard.press("Meta+s"); await p.waitForTimeout(200);
  const before = await find(p, /copied|clipboard/);
  await p.evaluate(() => { location.hash = "#/amiga"; }); await p.waitForTimeout(1500);
  res.switch = { before, after: await find(p, /copied|clipboard/), hash: await p.evaluate(() => location.hash) }; await p.screenshot({ path: `${OUT}switch-1440.png` });
  await ctx.close(); }
fs.writeFileSync(OUT + "toast.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));
await b.close();

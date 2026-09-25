// SERVED MODEL: claude-opus-5-5 — KF.W13X.x · A2-KE-L2-15 BEFORE: safe-area under CDP Emulation.setSafeAreaInsetsOverride
// (technique: audit-2/fourier-L2/probe-safearea.mjs). Reads the viewport meta, the resolved env() insets, and every visible
// interactive control that paints inside an inset band. READ-ONLY. Usage: BASE=http://localhost:5194 RUN=1 node safearea.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; fs.mkdirSync(OUT + "frames", { recursive: true });
const BASE = process.env.BASE || "http://localhost:5194";
const ROUTES = (process.env.ROUTES || "home,cube,amiga,square,easing,spring,sequence").split(",");
const CONFIGS = [["p390", [390, 844], { top: 47, bottom: 34, left: 0, right: 0 }], ["p390-noinset", [390, 844], { top: 0, bottom: 0, left: 0, right: 0 }], ["l844", [844, 390], { top: 0, bottom: 21, left: 47, right: 47 }]];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const rows = [];
for (const [name, vp, ins] of CONFIGS) for (const route of ROUTES) {
  const ctx = await b.newContext({ viewport: { width: vp[0], height: vp[1] }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page); await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: ins });
  await page.goto(`${BASE}/#/${route === "home" ? "" : route}`, { waitUntil: "networkidle" }); await sleep(3000);
  const r = await page.evaluate((ins) => {
    const probe = document.createElement("div"); probe.style.cssText = "position:fixed;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)"; document.body.appendChild(probe);
    const cs = getComputedStyle(probe); const env = { t: cs.paddingTop, r: cs.paddingRight, b: cs.paddingBottom, l: cs.paddingLeft }; probe.remove();
    const vw = innerWidth, vh = innerHeight;
    const inBand = [...document.querySelectorAll("button,a[href],input,[role=combobox],[role=slider],[role=tab]")].filter((e) => !e.closest("[inert]")).map((e) => ({ e, q: e.getBoundingClientRect() })).filter(({ q }) => q.width > 0 && q.height > 0 && q.bottom > 0 && q.top < vh && q.right > 0 && q.left < vw)
      .filter(({ q }) => (ins.top && q.top < ins.top) || (ins.bottom && q.bottom > vh - ins.bottom) || (ins.left && q.left < ins.left) || (ins.right && q.right > vw - ins.right))
      .map(({ e, q }) => ({ n: (e.getAttribute("aria-label") || e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24), box: [Math.round(q.left), Math.round(q.top), Math.round(q.right), Math.round(q.bottom)] }));
    const dock = (t) => { const d = document.querySelector(`[data-dock-tether=${t}] .glass-dock`); if (!d) return null; const q = d.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.right), Math.round(q.bottom)]; };
    return { meta: document.querySelector("meta[name=viewport]")?.content, env, vw, vh, docSH: document.scrollingElement.scrollHeight, topDock: dock("top"), bottomDock: dock("bottom"), inBand: inBand.slice(0, 10), inBandCount: inBand.length };
  }, ins);
  rows.push({ config: name, insets: ins, route, ...r });
  await page.screenshot({ path: `${OUT}frames/sa-${name}-${route}.jpg`, type: "jpeg", quality: 65 });
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}safearea-run${process.env.RUN || 1}.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(r.config, r.route, `meta="${r.meta}" env=${JSON.stringify(r.env)} docSH ${r.docSH}/${r.vh} top ${JSON.stringify(r.topDock)} bottom ${JSON.stringify(r.bottomDock)} inBand ${r.inBandCount} ${JSON.stringify(r.inBand.slice(0, 4))}`);

// X-DS fourier pass 4 critic (redeploy 3) — headless real Chrome only (§0ei). Read-only capture.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n, full=false) => p.screenshot({ path: `${OUT}/${n}.png`, fullPage: full }).catch((e) => console.log("shot fail", n, e.message));
try {
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  try {
    await go("/gallery", 4000); await shot(p, `gallery-${k}`);
    await go("/equation", 6000); await shot(p, `equation-${k}`);
    await p.mouse.wheel(0, 900).catch(()=>{}); await p.evaluate(()=>window.scrollBy(0,900)); await p.waitForTimeout(1500); await shot(p, `equation-scroll-${k}`);
    await go("/morph", 5000); await shot(p, `morph-${k}`);
    await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v computing", k));
    if (w === 390) await p.getByRole("tab", { name: "Canvas" }).click({ timeout: 10000 }).catch((e) => console.log("canvas tab", k, e.message));
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, `v-${k}`);
    if (w === 1440) { await p.mouse.move(230, 640); await p.waitForTimeout(1200); await shot(p, `v-hover-${k}`); }
    await go("/visualize", 3000); await shot(p, `visualize-${k}`);
    o.boxShadows = await p.evaluate(() => [...document.querySelectorAll("*")].filter(e=>{const s=getComputedStyle(e);return s.boxShadow!=="none"&&e.getBoundingClientRect().width>0}).slice(0,40).map(e=>({c:(e.className?.baseVal??e.className)+"",s:getComputedStyle(e).boxShadow.slice(0,200)})));
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/p4-critic-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }

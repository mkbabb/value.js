// X-DS fourier pass 4 (cure seat for critic F4X) — AFTER frames for the critic's cells. Headless real Chrome only (§0ei).
// Cells: /v/<slug> light+dark at 1440 (rest + pointer at 230,640) and 390 (Canvas tab); /paper light+dark at 1440 and 390.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
const stageBefore = (p) => p.evaluate(() => {
  const e = document.querySelector(".configurator-stage"); if (!e) return null;
  const s = getComputedStyle(e, "::before"); const h = getComputedStyle(e);
  return { cls: e.className + "", beforeBg: s.backgroundImage.slice(0, 160), beforeOpacity: s.opacity, mixBlend: s.mixBlendMode,
    mouseX: h.getPropertyValue("--mouse-x"), mouseY: h.getPropertyValue("--mouse-y"), hoverIntensity: h.getPropertyValue("--glass-specular-intensity-hover") };
});
try {
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  try {
    await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v computing", k));
    if (w === 390) await p.getByRole("tab", { name: "Canvas" }).click({ timeout: 10000 }).catch((e) => console.log("canvas tab", k, e.message));
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, `v-${k}`); o.stageRest = await stageBefore(p);
    if (w === 1440) { await p.mouse.move(230, 640); await p.waitForTimeout(1200); await shot(p, `v-hover-${k}`); o.stageHover = await stageBefore(p); }
    await go("/paper", 4000); await shot(p, `paper-${k}`);
    o.rim = await p.evaluate(() => { const e = document.querySelector(".paper-progress-rim"); if (!e) return null; const r = e.getBoundingClientRect();
      return { h: r.height, bottomGap: innerHeight - r.bottom, w: r.width, kids: [...e.querySelectorAll("*")].slice(0, 6).map((c) => ({ c: c.className + "", bg: getComputedStyle(c).backgroundColor, h: c.getBoundingClientRect().height, w: c.getBoundingClientRect().width })) }; });
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/f4x-probe.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }

// X-DS fourier pass 3 (redeploy 2) — CURE AFTER frames + measures for critic F3C's
// consumer rows C1 (/paper description terms; walled on latex-paper 0.3.0) and
// C2 (the /v canvas legend title face). Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
try {
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => {
    try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {}
    const seen = (window.__fills = new Map());
    const orig = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function (s, ...r) { seen.set(String(s).trim(), this.font); return orig.call(this, s, ...r); };
  }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  try {
    // C1 — /paper top: the description list's terms
    await go("/paper", 3500); await shot(p, `paper-${k}`);
    o.c1 = await p.evaluate(() => [...document.querySelectorAll("dl.paper-description dt")].map((d) => ({ t: d.textContent.trim(), fw: getComputedStyle(d).fontWeight })));
    // C2 — /v canvas legend
    await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v still computing", k));
    // At 390 the stage sits behind the Canvas tab (Controls is the default).
    if (w === 390) await p.getByRole("tab", { name: "Canvas" }).click({ timeout: 10000 }).catch((e) => console.log("canvas tab", k, e.message));
    await p.waitForTimeout(4000); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, `v-${k}`);
    o.c2 = await p.evaluate(() => {
      const f = window.__fills; const pick = (re) => [...f.entries()].filter(([t]) => re.test(t)).slice(-1).map(([t, font]) => ({ t, font }))[0] ?? null;
      const chip = [...document.querySelectorAll(".configurator-aside button, .configurator-aside [role=radio]")].find((e) => /Epicycles/.test(e.textContent));
      return { title: pick(/^Epicycles$/), count: pick(/ of \d+ circles$|^N = /), chipFace: chip ? getComputedStyle(chip).fontFamily : null };
    });
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/f3c-cure-probe-after.json`, JSON.stringify(out, null, 1));
}
} finally { await b.close(); }

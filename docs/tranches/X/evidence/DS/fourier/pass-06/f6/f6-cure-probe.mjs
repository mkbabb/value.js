// X-DS fourier pass 6 (critic F6) — AFTER frames and the cure measurements. Headless real Chrome only (§0ei).
// Usage: node f6-cure-probe.mjs OUT [BASE]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`;
  // gallery (C1)
  {
    const p = await page(theme, w);
    await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0); await p.waitForTimeout(4000);
    await p.screenshot({ path: `${OUT}/gallery-${k}.png` });
    if (w === 1440) {
      const card = p.locator(".gallery-card").first();
      const htmlBgRest = await p.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
      const rest = await card.evaluate((e) => getComputedStyle(e).backgroundColor).catch(() => null);
      await card.hover().catch(() => {}); await p.waitForTimeout(600);
      const hover = await card.evaluate((e) => getComputedStyle(e).backgroundColor).catch(() => null);
      const rules = await p.evaluate(() => [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } }).flatMap((r) => (r.cssRules ? [...r.cssRules] : [r])).map((r) => r.cssText).filter((t) => /gallery-card[^{]*:hover/.test(t) || /^\.dark\s*\{\s*background-color/.test(t)).map((t) => t.slice(0, 160)));
      const bareDarkBg = rules.some((t) => /^\.dark\s*\{\s*background-color/.test(t));
      res[`gallery-hover-${k}`] = { rest, hover, htmlBgRest, rules, bareDarkBg };
      await p.screenshot({ path: `${OUT}/gallery-hover-${k}.png` });
    }
    await p.context().close();
  }
  // equation (C2, G1, G4)
  {
    const p = await page(theme, w);
    await p.goto(BASE + "/equation", { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0); await p.waitForTimeout(4500);
    await p.screenshot({ path: `${OUT}/equation-${k}.png` });
    res[`equation-${k}`] = await p.evaluate(() => {
      const d = document.querySelector(".legend-dot--dashed"); const c = document.querySelector("canvas.text-muted-foreground");
      const plate = document.querySelector(".app-dock .dock-plate");
      return { legendBorder: d && getComputedStyle(d).borderTopColor + " " + getComputedStyle(d).borderTopStyle, curveInk: c && getComputedStyle(c).color, dockRadius: plate && getComputedStyle(plate).borderRadius };
    });
    const leg = p.locator(".legend-overlay").first();
    await leg.screenshot({ path: `${OUT}/equation-legend-${k}.png` }).catch(() => {});
    await p.mouse.wheel(0, 700); await p.waitForTimeout(1500);
    await p.screenshot({ path: `${OUT}/equation-scroll-${k}.png` });
    await p.context().close();
  }
  // /v (G2, G3)
  if (w === 1440) {
    const p = await page(theme, w);
    await p.goto(BASE + `/v/${SLUG}`, { waitUntil: "networkidle" }).catch(() => {});
    await p.mouse.move(0, 0); await p.waitForTimeout(4500);
    await p.screenshot({ path: `${OUT}/v-${k}.png` });
    if (theme === "light") {
      const trig = p.locator(".app-dock button, .glass-dock button").nth(1);
      await trig.click().catch(() => {}); await p.waitForTimeout(800);
      await p.screenshot({ path: `${OUT}/dock-menu-${k}.png` });
      await p.keyboard.press("Escape");
      const pen = p.locator('button[aria-label*="dit" i]').first();
      await pen.click().catch(() => {}); await p.waitForTimeout(1500);
      await p.screenshot({ path: `${OUT}/v-edit-${k}.png` });
    }
    await p.context().close();
  }
}
console.log(JSON.stringify(res, null, 1));
await b.close();

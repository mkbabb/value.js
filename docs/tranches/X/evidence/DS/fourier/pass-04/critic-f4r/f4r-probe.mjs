// X-DS fourier pass 4 (redeploy) — critic F4R: missing routes/scenes + measures. Headless real Chrome only (§0ei). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const save = () => writeFileSync(`${OUT}/f4r-probe.json`, JSON.stringify(out, null, 1));
const census = () => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight; };
  const id = (e) => (e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 4).join("."));
  const loops = document.getAnimations().filter((a) => a.effect?.getTiming?.().iterations === Infinity && a.playState === "running").map((a) => ({ el: a.effect.target ? id(a.effect.target) : "?", name: a.animationName || a.id || "waapi" }));
  const drop = [], grad = [], tsh = [];
  for (const e of document.querySelectorAll("body *")) { if (!vis(e) || e.closest("svg") && e.tagName !== "svg") continue; const c = getComputedStyle(e);
    if (/drop-shadow/.test(c.filter)) drop.push(id(e) + " " + c.filter);
    if (c.textShadow !== "none") tsh.push(id(e));
    if (/gradient/.test(c.backgroundImage) && /^(button|input|a)$/i.test(e.tagName)) grad.push(id(e) + " " + c.backgroundImage.slice(0, 90)); }
  return { loops, drop: drop.slice(0, 10), grad: grad.slice(0, 10), tsh: tsh.slice(0, 10) };
};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const shot = (n) => p.screenshot({ path: `${OUT}/${n}-${k}.png` }).catch((e) => console.log("shot fail", n, e.message));
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  const step = async (n, f) => { try { await f(); } catch (e) { o[n + "_err"] = e.message.slice(0, 200); console.log(k, n, "ERR", e.message.slice(0, 120)); } save(); };
  await step("equation", async () => { await go("/equation", 5000); await shot("equation"); o.equation = await p.evaluate(census);
    await p.evaluate(() => { const s = document.querySelector(".configurator-aside, aside"); if (s) s.scrollTop = 99999; }); await p.waitForTimeout(600); await shot("equation-aside-bottom"); });
  await step("morph", async () => { await go("/morph", 5000); await shot("morph"); o.morph = await p.evaluate(census);
    await p.evaluate(() => { const sc = [...document.querySelectorAll("*")].filter((e) => e.scrollHeight > e.clientHeight + 40 && /auto|scroll/.test(getComputedStyle(e).overflowY)).sort((a, b) => b.clientHeight - a.clientHeight)[0]; if (sc) sc.scrollTop = 99999; else scrollTo(0, 99999); }); await p.waitForTimeout(800); await shot("morph-bottom"); });
  await step("paper", async () => { await go("/paper", 3500); await shot("paper"); o.paper = await p.evaluate(census); });
  await step("nf", async () => { await go("/no-such-route", 1500); await shot("not-found"); });
  await step("v", async () => { await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v still computing", k));
    await p.waitForTimeout(4000); o.v = await p.evaluate(census);
    if (w === 390) { const t = p.getByRole("tab", { name: /canvas/i }).first(); if (await t.count()) { await t.click(); await p.waitForTimeout(2500); await shot("v-canvas"); } }
    else {
      // open Contour + Coefficients sections
      for (const name of ["Contour", "Coefficients"]) { const h = p.locator(".configurator-aside").getByRole("button", { name: new RegExp("^" + name, "i") }).first(); if (await h.count()) { await h.click().catch(() => {}); await p.waitForTimeout(700); } }
      await p.mouse.move(0, 0); await shot("v-sections-open");
      await p.evaluate(() => { const s = document.querySelector(".configurator-aside"); const sc = s && [s, ...s.querySelectorAll("*")].find((e) => e.scrollHeight > e.clientHeight + 20 && /auto|scroll/.test(getComputedStyle(e).overflowY)); if (sc) sc.scrollTop = 99999; }); await p.waitForTimeout(600); await shot("v-sections-bottom");
      // stage tools: hover / click the "more" capsule
      const more = p.locator(".controls-dock-anchor button").first(); if (await more.count()) { await more.click().catch(() => {}); await p.waitForTimeout(900); await shot("v-more"); await p.keyboard.press("Escape"); await p.waitForTimeout(400); }
      // transport hover (expanded)
      const tr = p.locator(".canvas-stage").getByRole("button", { name: /pause|play/i }).first(); if (await tr.count()) { await tr.hover(); await p.waitForTimeout(900); await shot("v-transport-hover"); }
      // epicycle hover on canvas
      await p.mouse.move(240, 890 * 0.72); await p.waitForTimeout(900); await shot("v-epicycle-hover");
      // dock nav menu
      const nav = p.locator(".app-dock").getByRole("button", { name: /visualize/i }).first(); if (await nav.count()) { await nav.click().catch(() => {}); await p.waitForTimeout(900); await shot("dock-menu"); await p.keyboard.press("Escape"); await p.waitForTimeout(300); }
      const login = p.locator(".app-dock").getByRole("button", { name: /log in/i }).first(); if (await login.count()) { await login.click().catch(() => {}); await p.waitForTimeout(900); await shot("login"); await p.keyboard.press("Escape"); }
    } });
  if (w === 1440) await step("galleryhover", async () => { await go("/gallery", 2500); const c = p.locator(".gallery-card").first(); await c.hover(); await p.waitForTimeout(800); await shot("gallery-hover"); o.galleryHover = await p.evaluate(() => { const c = document.querySelector(".gallery-card"); const s = getComputedStyle(c); return { shadow: s.boxShadow, transform: s.transform, bg: s.backgroundColor, grid: getComputedStyle(c.parentElement).gridTemplateColumns, parentW: c.parentElement.getBoundingClientRect().width }; });
    const f = p.locator("button[aria-label*=ilter], .search-pill button").last(); if (await f.count()) { await f.click().catch(() => {}); await p.waitForTimeout(800); await shot("gallery-filter"); } });
  await ctx.close(); save();
}
await b.close();

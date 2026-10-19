import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const rd = (els) => els.map((el) => { if (!el) return null; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); const bf = getComputedStyle(el, "::before"), af = getComputedStyle(el, "::after"); return { t: el.textContent.replace(/\s+/g, " ").trim().slice(0, 40), tag: el.tagName, cls: (el.className?.baseVal ?? el.className).toString().slice(0, 200), attrs: [...el.attributes].filter(a => /^data-|^aria-/.test(a.name)).map(a => `${a.name}=${a.value}`).join(" ").slice(0,160), box: [r.x, r.y, r.width, r.height].map(Math.round), color: cs.color, bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 260), shadow: cs.boxShadow.slice(0, 420), fs: cs.fontSize, fw: cs.fontWeight, ff: cs.fontFamily.slice(0, 40), ls: cs.letterSpacing, bdf: cs.backdropFilter, anim: cs.animationName, before: { bgi: bf.backgroundImage.slice(0, 260), sh: bf.boxShadow.slice(0,200), op: bf.opacity, content: bf.content }, after: { bgi: af.backgroundImage.slice(0, 260), sh: af.boxShadow.slice(0,200), op: af.opacity, content: af.content } }; });
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); };
  try {
    await go("/equation");
    o.eq = await p.evaluate(`(${rd})([ [...document.querySelectorAll("button")].find(b=>/Compute/.test(b.textContent)), document.querySelector(".timeline-row button, .fourier-timeline button"), document.querySelector(".configurator-aside"), ...[...document.querySelectorAll(".configurator-aside label, .configurator-aside .text-label, .configurator-aside [class*=label]")].slice(0,8) ])`);
    o.eqAsideKids = await p.evaluate(() => { const a = document.querySelector(".configurator-aside"); const res = []; const walk = (el, d) => { if (d > 3) return; for (const c of el.children) { const cs = getComputedStyle(c); const bf = getComputedStyle(c, "::before"); const af = getComputedStyle(c, "::after"); for (const [n, s] of [["self", cs], ["before", bf], ["after", af]]) if (/gradient/.test(s.backgroundImage)) res.push({ n, cls: c.className.toString().slice(0, 120), bgi: s.backgroundImage.slice(0, 300), op: s.opacity, blend: s.mixBlendMode }); walk(c, d + 1); } }; walk(a.parentElement, 0); return res.slice(0, 12); });
    await go("/w", 2000);
    o.w = await p.evaluate(`(${rd})([ [...document.querySelectorAll("button")].find(b=>/Browse the gallery/.test(b.textContent)), [...document.querySelectorAll("button")].find(b=>/Choose an image/.test(b.textContent)) ])`);
    await go("/morph", 2500);
    o.morph = await p.evaluate(`(${rd})([ ...[...document.querySelectorAll("*")].filter(e=>e.children.length===0 && /^(PHASE|N|SHAPE|TOTAL|idle|Sun)$/i.test(e.textContent.trim())).slice(0,6), document.querySelector("h1"), [...document.querySelectorAll("*")].find(e=>e.children.length===0 && /^Tune the morph/.test(e.textContent.trim())), [...document.querySelectorAll("button")].find(b=>/Export/.test(b.textContent)), document.querySelector("[role=combobox]"), document.querySelector("input") ])`);
    await go("/gallery", 2500);
    o.gallery = await p.evaluate(`(${rd})([ document.querySelector("input[type=search], input[placeholder*=Search]"), document.querySelector("input[placeholder*=Search]")?.parentElement, ...[...document.querySelector("input[placeholder*=Search]")?.parentElement?.parentElement?.querySelectorAll("*") ?? []].filter(e=>{const r=e.getBoundingClientRect(); return r.width<=3 && r.height>6;}).slice(0,3), document.querySelector(".gallery-card"), document.querySelector(".morph-button") ])`);
    await go("/v/plush-evening-olive-squid", 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(2500);
    o.v = await p.evaluate(`(${rd})([ [...document.querySelectorAll("button")].find(b=>/Replace image/.test(b.textContent)), ...[...document.querySelectorAll(".configurator-aside *")].filter(e=>e.children.length===0 && /^(Fourier|Polynomial|Harmonics|Sample Points|N, the terms in each basis sum)$/.test(e.textContent.trim())), document.querySelector(".configurator-stage"), document.querySelector(".configurator-stage canvas"), document.querySelector(".animation-dock") ])`);
    o.vStageGrad = await p.evaluate(() => { const a = document.querySelector(".configurator-stage"); const res = []; for (const c of [a, ...a.querySelectorAll("*")]) { const cs = getComputedStyle(c); const bf = getComputedStyle(c, "::before"); const af = getComputedStyle(c, "::after"); for (const [n, s] of [["self", cs], ["before", bf], ["after", af]]) if (/gradient/.test(s.backgroundImage)) res.push({ n, cls: c.className.toString().slice(0, 120), bgi: s.backgroundImage.slice(0, 300), op: s.opacity }); } return res.slice(0, 12); });
  } catch (e) { o.err = e.message.slice(0, 300); }
  await ctx.close();
  writeFileSync(`${OUT}/f3r-critic-probe2.json`, JSON.stringify(out, null, 1));
}
await b.close();

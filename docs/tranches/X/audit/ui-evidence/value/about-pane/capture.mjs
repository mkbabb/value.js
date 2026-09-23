// About-pane UI audit capture (read-only). Headed Chromium, real GPU.
// Usage: node capture.mjs [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const BASE = process.argv[2] ?? "http://localhost:9000";
const repo = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const meta = { base: BASE, sha, dirty, at: new Date().toISOString(), runs: {} };

const VIEWPORTS = [ { tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 } ];
const THEMES = ["light", "dark"];

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const card = document.querySelector(".about-card");
    if (!card) return { card: null };
    const r = card.getBoundingClientRect();
    const rad = (sel) => [...card.querySelectorAll(sel)].slice(0, 3).map((e) => {
      const cs = getComputedStyle(e); return { sel, radius: cs.borderRadius, bg: cs.backgroundColor, h: Math.round(e.getBoundingClientRect().height), w: Math.round(e.getBoundingClientRect().width) };
    });
    const overflowers = [...card.querySelectorAll("*")].filter((e) => {
      const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > r.right + 1 || b.left < r.left - 1);
    }).slice(0, 12).map((e) => ({ tag: e.tagName, cls: String(e.className?.baseVal ?? e.className).slice(0, 80), right: Math.round(e.getBoundingClientRect().right), text: (e.textContent || "").trim().slice(0, 50) }));
    const hs = [...card.querySelectorAll("h1,h2,h3,[data-slot=card-title]")].slice(0, 12).map((e) => ({ tag: e.tagName, text: e.textContent.trim().slice(0, 40), fs: getComputedStyle(e).fontSize, fw: getComputedStyle(e).fontWeight, ff: getComputedStyle(e).fontFamily.slice(0, 30) }));
    return {
      card: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), scrollH: card.scrollHeight, clientH: card.clientHeight, scrollW: card.scrollWidth, clientW: card.clientWidth, radius: getComputedStyle(card).borderRadius, overflowY: getComputedStyle(card).overflowY },
      doc: { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, scrollH: document.documentElement.scrollHeight },
      space: card.querySelector("[data-space-facts]")?.getAttribute("data-space-facts"),
      guide: card.querySelector("[data-guide-section]")?.getAttribute("data-guide-state"),
      radii: [ ...rad("[data-slot=alert]"), ...rad("[data-fact=definition]"), ...rad(".bg-well.rounded-panel"), ...rad("[data-o18=graph-node]"), ...rad("pre"), ...rad(".toc"), ...rad("p > code"), ...rad("[aria-label='Select color space']"), ...rad("table") ],
      overflowers, headings: hs,
      katexDisplays: [...card.querySelectorAll(".katex-display")].map((e) => { const p = e.parentElement; return { sw: p.scrollWidth, cw: p.clientWidth }; }).filter((k) => k.sw > k.cw + 1).length,
    };
  });
}

async function shootCardSegments(page, prefix, maxSegs = 8) {
  const shots = [];
  // scroll the card itself if it scrolls; else scroll the window through the card
  const mode = await page.evaluate(() => { const c = document.querySelector(".about-card"); return c && c.scrollHeight > c.clientHeight + 4 ? "card" : "window"; });
  if (mode === "card") {
    const { sh, ch } = await page.evaluate(() => { const c = document.querySelector(".about-card"); c.scrollTop = 0; return { sh: c.scrollHeight, ch: c.clientHeight }; });
    for (let i = 0, top = 0; i < maxSegs && top < sh; i++, top += Math.round(ch * 0.9)) {
      await page.evaluate((t) => { document.querySelector(".about-card").scrollTop = t; }, top);
      await page.waitForTimeout(450);
      const f = `${prefix}-seg${i}.png`; await page.screenshot({ path: path.join(OUT, f) }); shots.push(f);
    }
    await page.evaluate(() => { document.querySelector(".about-card").scrollTop = 0; });
  } else {
    const { top0, h } = await page.evaluate(() => { const r = document.querySelector(".about-card").getBoundingClientRect(); return { top0: r.top + scrollY, h: r.height }; });
    const vh = page.viewportSize().height;
    for (let i = 0, y = top0 - 40; i < maxSegs && y < top0 + h; i++, y += Math.round(vh * 0.9)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(450);
      const f = `${prefix}-seg${i}.png`; await page.screenshot({ path: path.join(OUT, f) }); shots.push(f);
    }
  }
  return { mode, shots };
}

async function selectSpace(page, id, prefix) {
  const trig = page.locator(".about-card [aria-label='Select color space']");
  await trig.scrollIntoViewIfNeeded();
  await trig.click();
  await page.waitForTimeout(600);
  let openShot = null;
  if (prefix) { openShot = `${prefix}-selector-open.png`; await page.screenshot({ path: path.join(OUT, openShot) }); }
  const opt = page.locator(`[role=option][data-space='${id}']`);
  await opt.scrollIntoViewIfNeeded().catch(() => {});
  await opt.click();
  await page.waitForTimeout(900);
  return openShot;
}

for (const vp of VIEWPORTS) for (const theme of THEMES) {
  const key = `${vp.tag}-${theme}`; const run = (meta.runs[key] = { errors: [] });
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: vp.w < 500 ? 2 : 1 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => run.errors.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") run.errors.push("console: " + m.text().slice(0, 200)); });
  try {
    for (let attempt = 0; ; attempt++) {
      try {
        await page.goto(`${BASE}/#/`, { waitUntil: "load", timeout: 90000 });
        await page.waitForSelector(".about-card", { timeout: 60000 });
        break;
      } catch (e) { run.errors.push(`attempt ${attempt}: ` + String(e).slice(0, 120)); if (attempt >= 2) throw e; }
    }
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, `${key}-00-landing.png`) });
    // make sure we start at oklch
    await selectSpace(page, "oklch", `${key}-01`);
    await page.waitForSelector(".about-card .markdown-wrapper", { timeout: 30000 }).catch(() => run.errors.push("markdown not rendered in 30s"));
    await page.waitForTimeout(800);
    run.oklch = await measure(page);
    await page.locator(".about-card").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, `${key}-02-oklch-view.png`) });
    run.oklchSegs = await shootCardSegments(page, `${key}-03-oklch`);
    // tooltip hover on a conversion-graph path + the Definition alert
    const node = page.locator(".about-card .bg-well.rounded-panel").first();
    await node.scrollIntoViewIfNeeded(); await node.hover(); await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `${key}-04-graph-hover.png`) });
    run.tooltip = await page.evaluate(() => [...document.querySelectorAll("[role=tooltip],[data-slot=tooltip-content],[data-reka-popper-content-wrapper]")].map((e) => { const b = e.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), text: e.textContent.trim().slice(0, 60), cls: String(e.className).slice(0, 80) }; }));
    const def = page.locator(".about-card [data-fact=definition]").first();
    await def.scrollIntoViewIfNeeded(); await def.hover(); await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `${key}-05-definition-hover.png`) });
    run.defTooltip = await page.evaluate(() => document.querySelectorAll("[role=tooltip]").length);
    // focus ring via keyboard on the selector
    await page.keyboard.press("Tab"); await page.waitForTimeout(200);
    for (const id of ["rgb", "lab", "display-p3"]) {
      await selectSpace(page, id, id === "rgb" ? `${key}-06` : null);
      if (id !== "display-p3") await page.waitForSelector(".about-card .markdown-wrapper", { timeout: 30000 }).catch(() => run.errors.push(id + " markdown not rendered in 30s"));
      await page.waitForTimeout(600);
      run[id] = await measure(page);
      await page.locator(".about-card").scrollIntoViewIfNeeded();
      await page.evaluate(() => { const c = document.querySelector(".about-card"); c.scrollTop = 0; });
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, `${key}-07-${id}-top.png`) });
      if (id !== "display-p3") run[id + "Segs"] = await shootCardSegments(page, `${key}-08-${id}`, id === "lab" ? 10 : 4);
      else { await page.locator(".about-card [data-guide-section]").scrollIntoViewIfNeeded(); await page.waitForTimeout(400); await page.screenshot({ path: path.join(OUT, `${key}-09-p3-guide.png`) }); }
    }
  } catch (e) { run.errors.push("FATAL " + String(e).slice(0, 300)); await page.screenshot({ path: path.join(OUT, `${key}-ERR.png`) }).catch(() => {}); }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, "capture-meta.json"), JSON.stringify(meta, null, 1));
console.log(JSON.stringify({ sha, dirty, keys: Object.keys(meta.runs), errs: Object.fromEntries(Object.entries(meta.runs).map(([k, v]) => [k, v.errors])) }, null, 1));

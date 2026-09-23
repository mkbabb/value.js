// Not-found view UI audit capture (read-only). Headed Chromium, real GPU.
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

const VIEWPORTS = [{ tag: "1440", w: 1440, h: 900 }, { tag: "390", w: 390, h: 844 }];
const THEMES = ["light", "dark"];
const ONLY = process.argv[3] ? process.argv[3].split(",") : null;
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });

async function measure(page) {
  return page.evaluate(() => {
    const px = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), radius: cs.borderRadius, bg: cs.backgroundColor, color: cs.color, fs: cs.fontSize, fw: cs.fontWeight, ff: cs.fontFamily.slice(0, 40), cls: String(e.className).slice(0, 160) }; };
    const title = [...document.querySelectorAll(".pane-header-title")].find((e) => /Not Found/.test(e.textContent));
    const card = title?.closest("[data-slot=card], .pane-scroll-fade");
    const btn = card ? [...card.querySelectorAll("button")].find((b) => /picker/i.test(b.textContent)) : null;
    const body = card?.querySelector("p.text-body");
    const live = [...document.querySelectorAll("[aria-live]")].map((e) => ({ live: e.getAttribute("aria-live"), text: e.textContent.trim().slice(0, 160) })).filter((x) => x.text);
    const h1 = [...document.querySelectorAll("h1")].map((e) => ({ text: e.textContent.trim().slice(0, 80), vis: e.getBoundingClientRect().width > 2 }));
    const dockBtns = [...document.querySelectorAll("[data-slot=dock] button, .glass-dock button, nav button")].slice(0, 30).map((b) => ({ label: b.getAttribute("aria-label") || b.textContent.trim().slice(0, 30), pressed: b.getAttribute("aria-pressed") || b.getAttribute("aria-current") || b.getAttribute("data-state") }));
    return {
      url: location.href, title: document.title, h1, live,
      card: px(card), cardScrollH: card?.scrollHeight, cardClientH: card?.clientHeight,
      header: px(title), desc: px(card?.querySelector(".pane-header-desc")), body: px(body), btn: px(btn),
      contentBottom: btn ? Math.round(btn.getBoundingClientRect().bottom) : null,
      doc: { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, scrollH: document.documentElement.scrollHeight },
      dockBtns,
    };
  });
}

async function shot(page, file, run) {
  try { await page.screenshot({ path: path.join(OUT, file), timeout: 15000 }); }
  catch (e) {
    run.errors.push(`screenshot ${file} fell back to CDP: ` + String(e).split("\n")[0].slice(0, 100));
    const cdp = await page.context().newCDPSession(page);
    const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUT, file), Buffer.from(data, "base64"));
    run.fontsPending = await page.evaluate(() => ({ status: document.fonts.status, loading: [...document.fonts].filter((f) => f.status === "loading").map((f) => f.family + " " + f.weight + " " + f.style).slice(0, 10) }));
  }
}
async function open(page, hash, run) {
  for (let attempt = 0; ; attempt++) {
    try {
      await page.goto(`${BASE}/${hash}`, { waitUntil: "load", timeout: 90000 });
      await page.waitForFunction(() => [...document.querySelectorAll(".pane-header-title")].some((e) => /Not Found/.test(e.textContent)), null, { timeout: 60000 });
      break;
    } catch (e) { run.errors.push(`open ${hash} attempt ${attempt}: ` + String(e).slice(0, 140)); if (attempt >= 1) return false; }
  }
  await page.waitForTimeout(2500);
  return true;
}

for (const vp of VIEWPORTS) for (const theme of THEMES) {
  const key = `${vp.tag}-${theme}`; if (ONLY && !ONLY.includes(key)) continue; const run = (meta.runs[key] = { errors: [] });
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2, hasTouch: vp.w < 500 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.removeItem("palette-admin-token"); } catch {} }, theme);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => run.errors.push(String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") run.errors.push("console: " + m.text().slice(0, 200)); });
  try {
    // 1 — unknown address
    if (await open(page, "#/nope", run)) {
      await shot(page, `${key}-01-unknown.png`, run);
      run.unknown = await measure(page);
      // hover + keyboard focus on Home
      const btn = page.getByRole("button", { name: /Back to the picker/i });
      await btn.hover(); await page.waitForTimeout(400);
      run.hover = await btn.evaluate((b) => { const cs = getComputedStyle(b); return { bg: cs.backgroundColor, radius: cs.borderRadius, h: b.getBoundingClientRect().height }; });
      await shot(page, `${key}-02-home-hover.png`, run);
      await page.mouse.move(2, 2);
      await btn.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
      run.focus = await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { tag: a.tagName, text: a.textContent.trim().slice(0, 40), outline: cs.outline, boxShadow: cs.boxShadow.slice(0, 160) }; });
      await shot(page, `${key}-03-home-focus.png`, run);
      // 4 — Home button back to picker
      await btn.click(); await page.waitForTimeout(2500);
      run.afterHome = await page.evaluate(() => ({ url: location.href, title: document.title, h1: [...document.querySelectorAll("h1")].map((e) => e.textContent.trim().slice(0, 60)), notFoundLeft: [...document.querySelectorAll(".pane-header-title")].some((e) => /Not Found/.test(e.textContent)) }));
      await shot(page, `${key}-04-after-home.png`, run);
      // browser back returns to the unknown address?
      await page.goBack(); await page.waitForTimeout(2000);
      run.afterBack = await page.evaluate(() => ({ url: location.href, title: document.title }));
    }
    // 5 — deep unknown address with a query
    if (await open(page, "#/foo/bar/baz?color=oklch(0.7,0.15,180)", run)) {
      await shot(page, `${key}-05-deep-unknown.png`, run);
      run.deep = await measure(page);
    }
    // 6 — refused admin deep-link
    if (await open(page, "#/admin/users", run)) {
      await shot(page, `${key}-06-admin-refused.png`, run);
      run.admin = await measure(page);
    }
    // 7 — unknown admin sub-path (parity with refused real one)
    if (await open(page, "#/admin/nonsense", run)) {
      await shot(page, `${key}-07-admin-nonsense.png`, run);
      run.adminNonsense = await measure(page);
    }
  } catch (e) { run.errors.push("FATAL " + String(e).slice(0, 300)); await page.screenshot({ path: path.join(OUT, `${key}-ERR.png`) }).catch(() => {}); }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, process.argv[3] ? "capture-meta-rerun.json" : "capture-meta.json"), JSON.stringify(meta, null, 1));
console.log(JSON.stringify({ sha, dirty, errs: Object.fromEntries(Object.entries(meta.runs).map(([k, v]) => [k, v.errors])) }, null, 1));

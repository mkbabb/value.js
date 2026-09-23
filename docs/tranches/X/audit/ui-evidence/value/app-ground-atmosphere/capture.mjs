// Read-only UI audit capture — app-ground-atmosphere (App.vue atmosphereCanvas + body ground).
// Headed Chromium, real GPU. Writes only beside this file. Never mutates the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:9000/";
const VPS = [["1440", 1440, 900], ["390", 390, 844]];
const THEMES = ["light", "dark"];
const ROUTES = ["/", "/palettes", "/gradient", "/atmosphere"];
const VIEWS = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob"];
const sha = (d) => { try { return execSync(`git -C ${d} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${d} status --porcelain | wc -l`).toString().trim(); } catch { return "?"; } };
const report = { tree: { value: sha("/Users/mkbabb/Programming/value.js"), glass: sha("/Users/mkbabb/Programming/glass-ui") }, at: new Date().toISOString() };
mkdirSync(OUT + "video", { recursive: true });

// Decode a PNG buffer in-page and read luminance at sample points (no pngjs in tree).
async function samplePng(page, buf, pts) {
  return page.evaluate(async ({ b64, pts }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const sx = img.width / innerWidth;
    return pts.map(([px, py]) => { const d = x.getImageData(Math.round(px * sx), Math.round(py * sx), 1, 1).data; const lum = (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) / 255; return { p: [px, py], rgb: [d[0], d[1], d[2]], lum: +lum.toFixed(3) }; });
  }, { b64: buf.toString("base64"), pts });
}
const groundPts = (w, h) => [[8, h - 8], [w - 8, Math.round(h / 2)], [Math.round(w / 2), h - 6], [8, Math.round(h * 0.4)], [w - 8, h - 8]];
async function probe(page) {
  return page.evaluate(() => {
    const cv = document.querySelector('[data-testid="atmosphere-canvas"]');
    const cs = cv && getComputedStyle(cv); const r = cv?.getBoundingClientRect();
    const root = getComputedStyle(document.documentElement); const body = getComputedStyle(document.body);
    const lay = document.querySelector(".app-layout"); const lr = lay?.getBoundingClientRect();
    const v = (n) => root.getPropertyValue(n).trim();
    return {
      dark: document.documentElement.classList.contains("dark"), view: lay?.dataset.view,
      canvas: cv && { cls: cv.className, opacity: cs.opacity, bgImage: cs.backgroundImage.slice(0, 160), bufW: cv.width, bufH: cv.height, cssW: Math.round(r.width), cssH: Math.round(r.height), top: Math.round(r.top), attrs: [...cv.attributes].map((a) => a.name + "=" + a.value.slice(0, 40)).filter((s) => !s.startsWith("class") && !s.startsWith("style")) },
      layout: lr && { h: Math.round(lr.height), docScrollH: document.documentElement.scrollHeight, clientH: innerHeight },
      bodyBg: body.backgroundColor, bodyImg: body.backgroundImage.slice(0, 200),
      tokens: { savedBg: [0, 1, 2, 3].map((i) => v("--saved-bg-" + i)), accentView: v("--accent-view"), accentLive: v("--accent-live"), primary: v("--primary"), inkMuted: v("--ink-muted"), inkAmbientL: v("--ink-ambient-l"), background: v("--background") },
      title: document.querySelector(".route-title")?.textContent?.trim(),
      overflowX: document.documentElement.scrollWidth > innerWidth,
    };
  });
}
async function census(page) {
  return page.evaluate(() => {
    const rows = {};
    for (const a of document.getAnimations()) {
      const t = a.effect?.target; if (!t) continue;
      const id = (t.tagName || "").toLowerCase() + "." + String(t.className?.baseVal ?? t.className ?? "").split(/\s+/).filter(Boolean).slice(0, 3).join(".");
      const kind = a.constructor.name === "CSSTransition" ? "T:" + a.transitionProperty : a.constructor.name === "CSSAnimation" ? "A:" + a.animationName : "W:" + (a.id || "waapi");
      (rows[id] ??= []).push(kind + "@" + Math.round(a.effect.getTiming().duration || 0) + "ms");
    }
    return rows;
  });
}

const browser = await chromium.launch({ headless: false });
for (const [vn, w, h] of VPS) for (const theme of THEMES) {
  const key = `${vn}-${theme}`; const r = (report[key] = { console: [], routes: {}, views: {}, switches: [], idle: [], stress: {} });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 1, recordVideo: { dir: OUT + "video", size: { width: w, height: h } } });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) r.console.push(m.type() + ": " + m.text().slice(0, 220)); });
  page.on("pageerror", (e) => r.console.push("pageerror: " + e.message.slice(0, 220)));
  // 1. BOOT — the ground from t0 (black-ground docket OA-18)
  const t0 = Date.now(); r.boot = [];
  await page.goto(BASE + "#/", { waitUntil: "commit" });
  for (const at of [150, 400, 800, 1400, 2500, 4000]) {
    const wait = at - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
    const buf = await page.screenshot().catch(() => null); if (!buf) continue;
    const ms = Date.now() - t0;
    if ([400, 1400, 4000].includes(at)) writeFileSync(`${OUT}${key}-boot-${at}ms.png`, buf);
    r.boot.push({ ms, ground: await samplePng(page, buf, groundPts(w, h)).catch((e) => e.message.slice(0, 80)) });
  }
  await page.waitForLoadState("networkidle").catch(() => {});
  // 2. ROUTES at rest
  for (const rt of ROUTES) {
    await page.evaluate((rt) => (location.hash = "#" + rt), rt); await page.waitForTimeout(2200);
    const slug = rt === "/" ? "home" : rt.slice(1);
    const buf = await page.screenshot(); writeFileSync(`${OUT}${key}-rest-${slug}.png`, buf);
    r.routes[rt] = { ...(await probe(page)), ground: await samplePng(page, buf, groundPts(w, h)) };
    if (vn === "390") { // scroll-end: does the field cover the scrolled document?
      const sh = await page.evaluate(() => document.documentElement.scrollHeight);
      if (sh > h + 4) { await page.evaluate(() => scrollTo(0, 1e6)); await page.waitForTimeout(500); const b2 = await page.screenshot(); writeFileSync(`${OUT}${key}-rest-${slug}-scrollend.png`, b2); r.routes[rt].scrollEnd = { sh, ground: await samplePng(page, b2, groundPts(w, h)) }; await page.evaluate(() => scrollTo(0, 0)); }
    }
  }
  // 3. PER-VIEW ACCENT (40deg steps) — dock-band crop + tokens (1440 only full crop)
  for (const rt of VIEWS) {
    await page.evaluate((rt) => (location.hash = "#" + rt), rt); await page.waitForTimeout(1300);
    const p = await probe(page); r.views[rt] = { accentView: p.tokens.accentView, primary: p.tokens.primary, savedBg0: p.tokens.savedBg[0], title: p.title };
    const slug = rt === "/" ? "home" : rt.slice(1);
    await page.screenshot({ path: `${OUT}${key}-accent-${slug}.png`, clip: { x: 0, y: 0, width: w, height: vn === "1440" ? 140 : 180 } });
  }
  // 4. VIEW SWITCH TRANSITIONS — burst frames + animation census + ground samples
  const pairs = [["/", "/palettes"], ["/palettes", "/gradient"], ["/gradient", "/atmosphere"], ["/atmosphere", "/"]];
  for (const [a, b] of pairs) {
    await page.evaluate((rt) => (location.hash = "#" + rt), a); await page.waitForTimeout(1800);
    const s = { from: a, to: b, frames: [], census: [] }; const ts = Date.now();
    await page.evaluate((rt) => (location.hash = "#" + rt), b);
    for (let i = 0; i < 7; i++) {
      s.census.push({ ms: Date.now() - ts, rows: await census(page) });
      const buf = await page.screenshot(); const ms = Date.now() - ts;
      const tag = `${key}-switch-${(a === "/" ? "home" : a.slice(1))}-to-${(b === "/" ? "home" : b.slice(1))}-f${i}.png`;
      if (i === 0 || i === 2 || i === 5) writeFileSync(OUT + tag, buf);
      s.frames.push({ ms, file: (i === 0 || i === 2 || i === 5) ? tag : null, ground: (await samplePng(page, buf, groundPts(w, h))).map((g) => g.lum) });
    }
    r.switches.push(s);
  }
  // 5. BLACK-GROUND STRESS (OA-18): idle 20s sampling, tab hide/show, resize
  await page.evaluate(() => (location.hash = "#/")); await page.waitForTimeout(1500);
  for (let i = 0; i < 10; i++) { const buf = await page.screenshot(); r.idle.push((await samplePng(page, buf, groundPts(w, h))).map((g) => g.lum)); await page.waitForTimeout(1800); }
  const other = await ctx.newPage(); await other.goto("about:blank"); await other.bringToFront(); await page.waitForTimeout(2500);
  await page.bringToFront(); await other.close();
  const shots = [];
  for (const at of [50, 400, 1500]) { await page.waitForTimeout(at - (shots.at(-1)?.at ?? 0)); const buf = await page.screenshot(); shots.push({ at, lum: (await samplePng(page, buf, groundPts(w, h))).map((g) => g.lum) }); if (at === 50) writeFileSync(`${OUT}${key}-stress-tabshow-50ms.png`, buf); }
  r.stress.tabShow = shots;
  await page.setViewportSize({ width: Math.round(w * 0.8), height: Math.round(h * 0.85) }); await page.waitForTimeout(120);
  const rb = await page.screenshot(); writeFileSync(`${OUT}${key}-stress-resize-120ms.png`, rb);
  r.stress.resizeMid = (await samplePng(page, rb, groundPts(Math.round(w * 0.8), Math.round(h * 0.85)))).map((g) => g.lum);
  await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(1200);
  r.stress.resizeBack = (await samplePng(page, await page.screenshot(), groundPts(w, h))).map((g) => g.lum);
  r.stress.probeAfter = await probe(page);
  // hover/pointer over the field — does the field respond (aurora pointer field)?
  const b1 = await page.screenshot({ clip: { x: 0, y: h - 120, width: w, height: 120 } });
  await page.mouse.move(20, h - 60); for (let i = 0; i < 20; i++) await page.mouse.move(20 + i * (w / 25), h - 60, { steps: 2 });
  await page.waitForTimeout(400);
  const b2 = await page.screenshot({ clip: { x: 0, y: h - 120, width: w, height: 120 } });
  r.stress.pointerFieldChanged = !b1.equals(b2);
  r.videoPath = await page.video()?.path();
  await ctx.close();
}
await browser.close();
writeFileSync(OUT + "report.json", JSON.stringify(report, null, 1));
console.log("done", Object.keys(report));

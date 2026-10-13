// X-DS keyframes r5 pass 3 cure (critic C3R) — AFTER probe. Headless real Chrome only (§0ei).
// KF-C3R-01: where the rail scroller's fold lands on a row's foot (no row crosses the fold, end fade off),
// the foot and the ribbon's rule are two lines: the scroller ends `gap` px below the foot, where gap is
// its scroll-padding-block-end (8 px) or less when the next row or separator starts sooner, and no
// separator shows between the foot and the fold. A cell with a row crossing the fold is the cue and is
// left alone. Also asserts no two hairlines in the pane sit within 32 px with nothing painted between
// (pass 25's rule), and captures the AFTER frames for the critic's cells.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, process.env.OUT ?? "after");
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5173/";
const SCENES = ["cube", "amiga", "square", "easing", "spring", "sequence"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { fold: {}, misc: {} };
const shot = async (page, name, sel, pad = 8) => {
  const file = path.join(OUT, `${name}.png`);
  if (sel) { const b = await page.locator(sel).first().boundingBox().catch(() => null);
    if (b) { await page.screenshot({ path: file, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad } }); return; } }
  await page.screenshot({ path: file });
};
const measure = () => {
  const frame = document.querySelector(".pane-frame"); if (!frame) return { err: "no pane" };
  const sc = [...frame.querySelectorAll(".controls-surface")].find((s) => s.offsetParent);
  if (!sc) return { err: "no scroller" };
  const sr = sc.getBoundingClientRect();
  const FADE = (() => { const raw = getComputedStyle(sc).getPropertyValue("--fade-scroll-width").trim(); const n = parseFloat(raw); return !Number.isFinite(n) ? 16 : raw.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : n; })();
  const GAP = parseFloat(getComputedStyle(sc).scrollPaddingBlockEnd) || 0;
  const bottom = sr.top + sc.clientTop + sc.clientHeight;
  const tr = (c) => !c || c === "transparent" || /,\s*0\)$/.test(c);
  const SEP = "[data-slot=separator],[role=separator],hr";
  const isContent = (el) => {
    if (el.matches(SEP)) return false;
    if (el instanceof SVGElement && el.tagName !== "svg") return false;
    const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) return false;
    if (!el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) return false;
    const cs = getComputedStyle(el);
    if (["svg", "INPUT", "CANVAS", "IMG", "TEXTAREA"].includes(el.tagName)) return true;
    if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return true;
    if (!tr(cs.backgroundColor) || cs.backgroundImage !== "none") return true;
    return ["top", "bottom"].some((s) => parseFloat(cs.getPropertyValue(`border-${s}-width`)) > 0 && cs.getPropertyValue(`border-${s}-style`) !== "none" && !tr(cs.getPropertyValue(`border-${s}-color`)));
  };
  const spans = [...sc.querySelectorAll("*")].filter(isContent).map((e) => { const r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, t: (e.textContent || e.tagName).trim().slice(0, 24) }; }).filter((s) => s.bottom > sr.top);
  const seps = [...sc.querySelectorAll(SEP)].filter((e) => e.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })).map((e) => e.getBoundingClientRect().top);
  const overflow = sc.scrollHeight - sc.clientHeight;
  const fadeEndOff = !sc.hasAttribute("data-fade-end") && parseFloat(getComputedStyle(sc).getPropertyValue("--fade-end")) === 0;
  const crossing = spans.filter((s) => s.top <= bottom - FADE && s.bottom > bottom);
  const whole = spans.filter((s) => s.bottom <= bottom + 0.5);
  const lastFoot = whole.length ? Math.max(...whole.map((s) => s.bottom)) : null;
  const ribbon = frame.querySelector(".ribbon-bar")?.getBoundingClientRect().top ?? null;
  const air = lastFoot === null ? null : +(bottom - lastFoot).toFixed(2);
  // What paints next under the foot (a row or a separator): the air may not reach it.
  const nextTop = lastFoot === null ? null : Math.min(Infinity, ...spans.map((s) => s.top).filter((t) => t >= lastFoot - 0.5), ...seps.filter((t) => t >= lastFoot - 0.5));
  const want = lastFoot === null ? null : Math.min(GAP, Math.max(0, Math.floor(nextTop - lastFoot)));
  const sepShowing = lastFoot === null ? [] : seps.filter((t) => t >= lastFoot - 0.5 && t < bottom - 0.25).map(Math.round);
  const footed = overflow > 1 && crossing.length === 0;
  const foldOk = !footed || (lastFoot !== null && fadeEndOff && Math.abs(air - want) <= 1.5 && sepShowing.length === 0);
  const fr = frame.getBoundingClientRect();
  const lines = [...frame.querySelectorAll(SEP)].map((e) => ({ e, r: e.getBoundingClientRect() }))
    .filter(({ e, r }) => r.width > 40 && r.height <= 2 && (!sc.contains(e) || (r.top >= sr.top && r.bottom <= bottom)) && r.top >= fr.top && r.bottom <= fr.bottom)
    .map(({ r }) => r.top).sort((a, b) => a - b);
  const allContent = [...frame.querySelectorAll("*")].filter(isContent).map((e) => e.getBoundingClientRect()).filter((r) => r.bottom <= bottom || r.top >= bottom);
  const stacked = [];
  for (let i = 1; i < lines.length; i++) {
    const a = lines[i - 1], b = lines[i];
    if (b - a < 32 && !allContent.some((r) => r.top > a + 1 && r.bottom < b - 1 && r.height > 2)) stacked.push([Math.round(a), Math.round(b)]);
  }
  return { scrollerBottom: Math.round(bottom), ribbonTop: ribbon && Math.round(ribbon), clientHeight: sc.clientHeight, scrollHeight: sc.scrollHeight, cap: sc.style.maxBlockSize || null,
    fade: FADE, gap: GAP, footed, fadeEndOff, crossing: crossing.slice(0, 3).map((s) => `${s.t}@${Math.round(s.top)}-${Math.round(s.bottom)}`),
    lastFoot: lastFoot && Math.round(lastFoot), air, want, nextTop: Number.isFinite(nextTop) ? Math.round(nextTop) : null, sepShowing, foldOk, hairlines: lines.map(Math.round), stacked, pass: foldOk && stacked.length === 0 };
};
let failures = 0;
try {
  for (const [w, h] of [[1440, 900], [1280, 800], [1024, 768]]) {
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
      const page = await ctx.newPage();
      for (const scene of SCENES) {
        await page.goto(`${BASE}#/${scene}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        const m = await page.evaluate(measure).catch((e) => ({ err: e.message }));
        report.fold[`${scene}-${w}x${h}-${scheme}`] = m;
        if (!m.pass) failures++;
        if (scheme === "light" || w === 1440) await shot(page, `pane-${scene}-${w}x${h}-${scheme}`, ".pane-frame");
        if (scene === "spring" && w === 1440) {
          await shot(page, `spring-${w}x${h}-${scheme}`);
          // Scrolled off the top, the end fade is the cue again; back at the top, it lands again.
          await page.evaluate(() => { const s = [...document.querySelectorAll(".pane-frame .controls-surface")].find((e) => e.offsetParent); s.scrollTop = 30; });
          await page.waitForTimeout(500);
          report.misc[`spring-scrolled-${scheme}`] = await page.evaluate(() => { const s = [...document.querySelectorAll(".pane-frame .controls-surface")].find((e) => e.offsetParent); return { scrollTop: s.scrollTop, fadeEnd: s.hasAttribute("data-fade-end"), fadeStart: s.hasAttribute("data-fade-start") }; });
          await shot(page, `pane-spring-scrolled-${w}x${h}-${scheme}`, ".pane-frame");
          await page.evaluate(() => { const s = [...document.querySelectorAll(".pane-frame .controls-surface")].find((e) => e.offsetParent); s.scrollTop = 0; });
          await page.waitForTimeout(500);
          report.misc[`spring-returned-${scheme}`] = await page.evaluate(measure);
        }
      }
      await ctx.close();
    }
  }
  // KF-C3R-02 (kept): the cube Timeline toolbar row, as it stands.
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4000);
    await page.hover(".glass-dock >> nth=0"); await page.waitForTimeout(900);
    await page.locator('button[aria-label="Timeline"]').first().click({ force: true }); await page.waitForTimeout(2500);
    await page.mouse.move(1200, 600); await page.waitForTimeout(400);
    await shot(page, `cube-timeline-1440-${scheme}`);
    await ctx.close();
  }
} finally {
  await browser.close();
  report.failures = failures;
  fs.writeFileSync(path.join(HERE, process.env.JSON ?? "c3r-probe.json"), JSON.stringify(report, null, 1));
  console.log("fold failures:", failures);
  for (const [k, m] of Object.entries(report.fold)) if (m.footed || !m.pass) console.log(k, JSON.stringify({ lastFoot: m.lastFoot, bottom: m.scrollerBottom, ribbonTop: m.ribbonTop, air: m.air, want: m.want, nextTop: m.nextTop, fadeEndOff: m.fadeEndOff, sepShowing: m.sepShowing, stacked: m.stacked, pass: m.pass, err: m.err }));
}

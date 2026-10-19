// X-DS keyframes r4 pass 6 cure (critic C25) — AFTER probe. Headless real Chrome only (§0ei).
// C25-01: in a cell with no row crossing the fold, no end fade may paint over the last whole row:
// either the fade is off (glass FadingScroll fadeEnd=false: no data-fade-end, --fade-end 0px) with the
// fold on the row's foot, or the foot clears the fade (lastFoot <= scrollerBottom - fade).
// Asserts, for every scene at 1440x900 and 1280x800: the rail scroller's fold lands on content
// (a row starts above the end fade and runs under it, or the last whole row's foot is within the
// fade of the scroller's bottom), and no two hairlines in the pane sit within 32 px with nothing
// painted between. Captures the AFTER frames for the critic's cells.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "after");
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
  const bottom = sr.top + sc.clientTop + sc.clientHeight;
  const tr = (c) => !c || c === "transparent" || /,\s*0\)$/.test(c);
  const isContent = (el) => {
    if (el.matches("[data-slot=separator],[role=separator],hr")) return false;
    if (el instanceof SVGElement && el.tagName !== "svg") return false;
    const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) return false;
    if (!el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) return false;
    const cs = getComputedStyle(el);
    if (["svg", "INPUT", "CANVAS", "IMG", "TEXTAREA"].includes(el.tagName)) return true;
    if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return true;
    if (!tr(cs.backgroundColor) || cs.backgroundImage !== "none") return true;
    return ["top", "bottom"].some((s) => parseFloat(cs[`border-${s}-width`] ?? cs.getPropertyValue(`border-${s}-width`)) > 0 && cs.getPropertyValue(`border-${s}-style`) !== "none" && !tr(cs.getPropertyValue(`border-${s}-color`)));
  };
  const spans = [...sc.querySelectorAll("*")].filter(isContent).map((e) => { const r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, t: (e.textContent || e.tagName).trim().slice(0, 24) }; }).filter((s) => s.bottom > sr.top);
  const overflow = sc.scrollHeight - sc.clientHeight;
  const fadeEndOff = !sc.hasAttribute("data-fade-end") && parseFloat(getComputedStyle(sc).getPropertyValue("--fade-end")) === 0;
  const crossing = spans.filter((s) => s.top <= bottom - FADE && s.bottom > bottom);
  const whole = spans.filter((s) => s.bottom <= bottom + 0.5);
  const lastFoot = whole.length ? Math.max(...whole.map((s) => s.bottom)) : null;
  const foldOk = overflow <= 1 || crossing.length > 0 || (lastFoot !== null && (fadeEndOff ? bottom - lastFoot <= 1.5 : lastFoot <= bottom - FADE + 0.5 && bottom - lastFoot <= 2 * FADE));
  // Hairlines visible in the frame: separators not cut by the scroller, plus the ribbon's rule.
  const fr = frame.getBoundingClientRect();
  const lines = [...frame.querySelectorAll("[data-slot=separator],[role=separator],hr")].map((e) => ({ e, r: e.getBoundingClientRect() }))
    .filter(({ e, r }) => r.width > 40 && r.height <= 2 && (!sc.contains(e) || (r.top >= sr.top && r.bottom <= bottom)) && r.top >= fr.top && r.bottom <= fr.bottom)
    .map(({ r }) => r.top).sort((a, b) => a - b);
  const allContent = [...frame.querySelectorAll("*")].filter((e) => !sc.contains(e) || true).filter(isContent).map((e) => e.getBoundingClientRect()).filter((r) => r.bottom <= bottom || r.top >= bottom);
  const stacked = [];
  for (let i = 1; i < lines.length; i++) {
    const a = lines[i - 1], b = lines[i];
    if (b - a < 32 && !allContent.some((r) => r.top > a + 1 && r.bottom < b - 1 && r.height > 2)) stacked.push([Math.round(a), Math.round(b)]);
  }
  return { scrollerBottom: Math.round(bottom), clientHeight: sc.clientHeight, scrollHeight: sc.scrollHeight, cap: sc.style.maxBlockSize || null,
    fade: FADE, fadeEndOff, crossing: crossing.slice(0, 3).map((s) => `${s.t}@${Math.round(s.top)}-${Math.round(s.bottom)}`), lastFoot: lastFoot && Math.round(lastFoot), foldOk, hairlines: lines.map(Math.round), stacked, pass: foldOk && stacked.length === 0 };
};
let failures = 0;
try {
  for (const [w, h] of [[1440, 900], [1280, 800]]) {
    for (const scheme of ["light", "dark"]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
      const page = await ctx.newPage();
      for (const scene of SCENES) {
        await page.goto(`${BASE}#/${scene}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        const m = await page.evaluate(measure).catch((e) => ({ err: e.message }));
        report.fold[`${scene}-${w}x${h}-${scheme}`] = m;
        if (!m.pass && !m.err) failures++;
        if (scheme === "light" || w === 1440) await shot(page, `pane-${scene}-${w}x${h}-${scheme}`, ".pane-frame");
        if (scene === "spring" && scheme === "light") await shot(page, `spring-${w}x${h}-light`);
      }
      await ctx.close();
    }
  }
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4000);
    await page.hover(".glass-dock >> nth=0"); await page.waitForTimeout(900);
    await page.locator('button[aria-label="Timeline"]').first().click({ force: true }); await page.waitForTimeout(2500);
    await page.mouse.move(1200, 600); await page.waitForTimeout(400);
    await shot(page, `cube-timeline-1440-${scheme}`);
    report.misc[`timeline-row-${scheme}`] = await page.evaluate(() => {
      const row = (name) => [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === name);
      const d = (b) => b && { emphasis: b.getAttribute("data-emphasis") ?? b.className.match(/emphasis-\w+|secondary|quiet/g)?.join(" "), bg: getComputedStyle(b).backgroundColor, disabled: b.disabled };
      return { caption: [...document.querySelectorAll(".pane-frame p")].map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter((t) => /keyframe/i.test(t)), Snapshot: d(row("Snapshot")), Import: d(row("Import")), Export: d(row("Export")) };
    });
    await ctx.close();
  }
  for (const [vw, vh] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const scene of ["amiga", "square"]) {
      await page.goto(`${BASE}#/${scene}`, { waitUntil: "load" }); await page.waitForTimeout(4000);
      await shot(page, `${scene}-${vw}-${scheme}`);
      if (scene === "square") report.misc[`square-${vw}-${scheme}`] = await page.evaluate(() => {
        const box = document.querySelector(".demo-box"); const arena = document.querySelector(".square-arena"); const plate = document.querySelector(".square-stage");
        if (!box) return null; const r = (e) => { const b = e.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height) }; };
        const cs = getComputedStyle(box); return { size: cs.getPropertyValue("--square-size"), travel: cs.getPropertyValue("--square-travel"), box: r(box), arena: r(arena), plate: r(plate), fieldShare: +(2 * parseFloat(cs.getPropertyValue("--square-travel")) / plate.getBoundingClientRect().width).toFixed(3) };
      });
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  report.failures = failures;
  fs.writeFileSync(path.join(OUT, "..", "c25-probe.json"), JSON.stringify(report, null, 1));
  console.log("fold failures:", failures);
}

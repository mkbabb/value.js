// X-DS keyframes r4 pass 5 cure (critic C24) — AFTER probe. Headless real Chrome only (§0ei).
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
  const FADE = 16;
  const frame = document.querySelector(".pane-frame"); if (!frame) return { err: "no pane" };
  const sc = [...frame.querySelectorAll(".controls-surface")].find((s) => s.offsetParent);
  if (!sc) return { err: "no scroller" };
  const sr = sc.getBoundingClientRect();
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
  const crossing = spans.filter((s) => s.top <= bottom - FADE && s.bottom > bottom);
  const whole = spans.filter((s) => s.bottom <= bottom + 0.5);
  const lastFoot = whole.length ? Math.max(...whole.map((s) => s.bottom)) : null;
  const foldOk = overflow <= 1 || crossing.length > 0 || (lastFoot !== null && bottom - lastFoot <= FADE);
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
    crossing: crossing.slice(0, 3).map((s) => `${s.t}@${Math.round(s.top)}-${Math.round(s.bottom)}`), lastFoot: lastFoot && Math.round(lastFoot), foldOk, hairlines: lines.map(Math.round), stacked, pass: foldOk && stacked.length === 0 };
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
    await page.locator('button[aria-label="Keyframes"]').first().click({ force: true }); await page.waitForTimeout(3000);
    await page.mouse.move(1200, 600); await page.waitForTimeout(600);
    await shot(page, `cube-keyframes-1440-${scheme}`);
    await shot(page, `crop-code-well-1440-${scheme}`, ".monaco-editor", 8);
    report.misc[`editor-${scheme}`] = await page.evaluate(() => {
      const ed = document.querySelector(".monaco-editor"); if (!ed) return null;
      const colors = {}; for (const s of ed.querySelectorAll(".view-line span span")) { const c = getComputedStyle(s).color; colors[c] = (colors[c] ?? 0) + 1; }
      const bands = [...ed.querySelectorAll(".view-overlays .current-line, .margin-view-overlays .current-line")].map((b) => { const c = getComputedStyle(b); return { bg: c.backgroundColor, borderW: c.borderTopWidth, border: c.borderTopColor }; });
      return { editorFocused: ed.contains(document.activeElement), inkColours: colors, bracketPairClasses: ed.querySelectorAll("[class*=bracket-highlighting]").length, lineHighlightAtRest: bands.length ? bands : "absent" };
    });
    await page.hover(".glass-dock >> nth=0"); await page.waitForTimeout(900);
    await page.locator('button[aria-label="Timeline"]').first().click({ force: true }); await page.waitForTimeout(2500);
    await shot(page, `cube-timeline-1440-${scheme}`);
    report.misc[`timeline-empty-${scheme}`] = await page.evaluate(() => [...document.querySelectorAll(".pane-frame p")].map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter((t) => /keyframe/i.test(t)));
    await ctx.close();
  }
  for (const vw of [1280, 390]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vw === 390 ? 844 : 800 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
    report.misc[`preset-lines-${vw}`] = await page.evaluate(() => [...document.querySelectorAll(".preset-values")].map((e) => { const r = e.getBoundingClientRect(); const lh = parseFloat(getComputedStyle(e).lineHeight) || 1; return { t: e.textContent.trim(), lines: Math.round(r.height / lh), font: getComputedStyle(e).fontSize, w: Math.round(r.width), cell: Math.round(e.parentElement.getBoundingClientRect().width) }; }));
    await ctx.close();
  }
} finally {
  await browser.close();
  report.failures = failures;
  fs.writeFileSync(path.join(OUT, "..", "c24-probe.json"), JSON.stringify(report, null, 1));
  console.log("fold failures:", failures);
}

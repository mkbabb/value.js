// X-DS keyframes r8 pass 11 cure seat (critic C11): the KF-C11-01 falsifier and the KF-C11-02/-03 legend reading.
// Headless real Chrome (§0ei); one browser, closed in finally.
// KF-C11-01 at 390x844 #/cube, both schemes: Tab until 'ease-in-out' (the easing trigger) has focus; then either the
//   detent is OPEN, or the port's scrollTop is 0 with the title visible; after Escape(s) the peek shows 'Rotations'.
//   Also: script focus on the Preview control, and a click on a row below the peek's fold.
// KF-C11-02/-03 at 1280x800 #/spring 'Peak overshoot' open: the legend's lines = the union of every run's rounded tops.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.join(path.dirname(fileURLToPath(import.meta.url)), "after"); fs.mkdirSync(HERE, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5193/";
const rep = {};
const state = (page) => page.evaluate(() => {
  const sheet = document.querySelector(".controls-drawer-content"); const port = sheet?.querySelector(".controls-pane");
  const t = sheet ? getComputedStyle(sheet).getPropertyValue("--detent-t").trim() : null;
  const sr = sheet?.getBoundingClientRect(); const pr = port?.getBoundingClientRect();
  const title = [...(port?.querySelectorAll("*") ?? [])].find((e) => e.children.length === 0 && e.textContent.trim() === "Rotations");
  const tr = title?.getBoundingClientRect();
  const a = document.activeElement;
  return { detentT: t, sheetTop: sr && Math.round(sr.top), portTop: pr && Math.round(pr.top), portBottom: pr && Math.round(pr.bottom),
    scrollTop: port?.scrollTop, overflowY: port && getComputedStyle(port).overflowY,
    rotations: tr ? { top: Math.round(tr.top), visible: !!pr && tr.top >= pr.top && tr.bottom <= pr.bottom } : null,
    active: a ? (a.textContent || a.getAttribute("aria-label") || a.tagName).trim().slice(0, 30) : null };
});
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      const r = (rep[`focus-${scheme}`] = {});
      await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      r.rest = await state(page);
      let found = false;
      for (let i = 0; i < 80 && !found; i++) {
        await page.keyboard.press("Tab"); await page.waitForTimeout(40);
        found = await page.evaluate(() => { const a = document.activeElement; return !!a && !!a.closest(".controls-drawer-content .controls-pane") && (a.textContent ?? "").trim() === "ease-in-out"; });
      }
      r.tabbedToEase = found; await page.waitForTimeout(900);
      r.afterTab = await state(page);
      await page.screenshot({ path: path.join(HERE, `cube-focus-easing-390-${scheme}.png`) });
      for (let i = 0; i < 3 && (await state(page)).detentT !== "0.12"; i++) { await page.keyboard.press("Escape"); await page.waitForTimeout(700); }
      await page.waitForTimeout(600);
      r.afterEscape = await state(page);
      await page.screenshot({ path: path.join(HERE, `cube-after-escape-390-${scheme}.png`) });
      // script focus on a control far below the fold (the last focusable in the port)
      await page.evaluate(() => { const f = [...document.querySelectorAll(".controls-drawer-content .controls-pane button, .controls-drawer-content .controls-pane [tabindex='0']")]; f.at(-1)?.focus(); });
      await page.waitForTimeout(900);
      r.afterScriptFocus = await state(page);
      await page.screenshot({ path: path.join(HERE, `cube-script-focus-390-${scheme}.png`) });
      await page.keyboard.press("Escape"); await page.waitForTimeout(900);
      await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(300);
      r.afterBlur = await state(page);
      await page.screenshot({ path: path.join(HERE, `cube-peek-rest-390-${scheme}.png`) });
    } finally { await ctx.close(); }
  }
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      const trigger = page.locator(".spring-heatmap-section [data-figure-title]").first();
      if ((await trigger.getAttribute("aria-expanded")) !== "true") await trigger.click();
      await page.waitForTimeout(2500);
      rep[`legend-1280x800-${scheme}`] = await page.evaluate(() => {
        const l = document.querySelector("[data-figure-legend]:not(.code-token)"); if (!l) return null;
        const sw = l.querySelector(".spring-heatmap-swatch").getBoundingClientRect();
        const runs = [...l.querySelectorAll(":scope > span")].map((s) => { const rects = [...s.getClientRects()];
          return { text: s.textContent.trim(), tops: [...new Set(rects.map((r) => Math.round(r.top)))], lefts: rects.map((r) => Math.round(r.left)) }; });
        const tops = [...new Set(runs.flatMap((r) => r.tops))].sort((a, b) => a - b);
        return { swatchLeft: Math.round(sw.left), swatchRight: Math.round(sw.right), runs, lines: tops.length, tops };
      });
      await page.screenshot({ path: path.join(HERE, `spring-peak-open-1280x800-${scheme}.png`) });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c11-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep, null, 1));

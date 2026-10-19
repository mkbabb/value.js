// X-DS keyframes r8 pass 10 cure seat (critic C10x): AFTER frames. Headless real Chrome (§0ei); one browser, closed in finally.
// - routes at 1440 and 390, both schemes (the pass-53 set);
// pass 10 adds: KF-C10x-02 the easing drawer's fold (rows measured); KF-C10x-03 Monaco's box width and visual line count;
//   KF-C10x-04 the heatmap legend's lines at 1280x800 (swatch and first phrase on one line).
// - KF-C9x-02: the cube Keyframes surface at 1440 (rail) and 390 (the sheet's peek), with the header's anatomy measured;
// - KF-C9x-01: 'Peak overshoot' open on #/spring at 1440x900, 1280x800 and 1440x1080, shot only once the end-pinned
//   port is AT REST (scrollTop === scrollHeight - clientHeight, unchanged over 10 frames), not mid smooth-scroll.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.join(path.dirname(fileURLToPath(import.meta.url)), "after"); fs.mkdirSync(HERE, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5193/";
const KEY = "animation-groups-control-options-store";
const routes = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setSurface = (page, scene, patch) => page.evaluate(([k, scene, patch]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, patch]);
const header = (page) => page.evaluate(() => {
  const sec = document.querySelector('section[aria-label] [data-slot="configurator-layer"] .code-well')?.closest("section");
  if (!sec) return null;
  const t = sec.querySelector('[data-slot="configurator-layer-trigger"]');
  const tr = t?.getBoundingClientRect(); const st = sec.querySelector('[role="status"]')?.getBoundingClientRect();
  const chev = t?.querySelector("svg")?.getBoundingClientRect();
  return { region: sec.getAttribute("aria-label"), title: t?.querySelector(".configurator-section-label")?.textContent.trim(), expanded: t?.getAttribute("aria-expanded"),
    status: sec.querySelector('[role="status"]')?.textContent.trim(), statusRight: st && Math.round(st.right), chevronLeft: chev && Math.round(chev.left), headerRight: tr && Math.round(tr.right),
    expandersInPane: [...document.querySelectorAll("[aria-expanded]")].filter((e) => !e.closest("[data-slot*=dock], .dock, nav")).map((e) => (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 24)) };
});
const monaco = (page) => page.evaluate(() => {
  const ed = document.querySelector(".code-well .monaco-editor"); if (!ed) return null;
  const lines = [...ed.querySelectorAll(".view-line")]; const tops = new Set(lines.map((l) => Math.round(l.getBoundingClientRect().top)));
  const numbers = ed.querySelectorAll(".line-numbers").length;
  const l4 = lines.map((l) => l.textContent).filter((t) => t.includes("ease-in-out"));
  return { width: Math.round(ed.getBoundingClientRect().width * 10) / 10, visualLines: tops.size, logicalLines: numbers, easeInOutRows: l4 };
});
const drawer = (page) => page.evaluate(() => {
  const d = document.querySelector(".specimen-drawer"); if (!d) return null; const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; };
  const dr = d.getBoundingClientRect(); const plate = d.parentElement.getBoundingClientRect();
  const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => ({ k: e.classList.contains("catalogue-family") ? e.textContent.trim() : "tile", r: R(e) })).filter((x) => x.r[0] < dr.bottom && x.r[1] > dr.bottom - 60);
  return { drawer: R(d), plate: [Math.round(plate.top), Math.round(plate.bottom)], atFold: rows, belowFoldToPlateFoot: Math.round(plate.bottom - dr.bottom) };
});
const legend = (page) => page.evaluate(() => {
  const l = document.querySelector("[data-figure-legend]:not(.code-token)"); if (!l) return null;
  const sw = l.querySelector(".spring-heatmap-swatch").getBoundingClientRect(); const rects = [...l.getClientRects()];
  const runs = [...l.querySelectorAll(":scope > span")].map((s) => ({ text: s.textContent.trim(), tops: [...new Set([...s.getClientRects()].map((r) => Math.round(r.top)))] }));
  return { swatchTop: Math.round(sw.top), runs, lines: new Set(rects.map((r) => Math.round(r.top))).size };
});
const settle = (page) => page.evaluate(async () => {
  const s = document.querySelector(".spring-heatmap-section")?.closest("[data-fold-key]"); if (!s) return null;
  const frame = () => new Promise((r) => requestAnimationFrame(r));
  let last = -1, still = 0; const t0 = performance.now();
  while (performance.now() - t0 < 6000) { await frame(); const top = s.scrollTop; const max = s.scrollHeight - s.clientHeight;
    if (Math.abs(top - max) < 1 && Math.abs(top - last) < 0.5) { if (++still >= 10) break; } else still = 0; last = top; }
  const bouncy = [...s.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim() === "Bouncy");
  return { scrollTop: s.scrollTop, max: s.scrollHeight - s.clientHeight, settledMs: Math.round(performance.now() - t0), portTop: Math.round((s.getBoundingClientRect().top + s.clientTop) * 10) / 10, bouncyTop: bouncy ? Math.round(bouncy.getBoundingClientRect().top) : null };
});
try {
  for (const scheme of ["light", "dark"]) {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
      const page = await ctx.newPage();
      try {
        for (const r of routes) {
          await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
          await page.screenshot({ path: path.join(HERE, `${r || "home"}-${w}-${scheme}.png`) });
          if (r === "easing") rep[`easing-${w}-${scheme}`] = await drawer(page);
        }
        await setSurface(page, "cube", { selectedControl: "keyframes", isTimelineExpanded: false });
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
        await page.screenshot({ path: path.join(HERE, `cube-keyframes-${w}-${scheme}.png`) });
        rep[`cube-keyframes-${w}-${scheme}`] = { header: await header(page), monaco: await monaco(page) };
        await setSurface(page, "cube", { selectedControl: "controls" });
      } finally { await ctx.close(); }
    }
    for (const [w, h] of [[1440, 900], [1280, 800], [1440, 1080]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
      const page = await ctx.newPage();
      try {
        await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        const trigger = page.locator(".spring-heatmap-section [data-figure-title]").first();
        if ((await trigger.getAttribute("aria-expanded")) !== "true") await trigger.click();
        await page.waitForTimeout(600);
        rep[`spring-peak-open-${w}x${h}-${scheme}`] = { ...(await settle(page)), legend: await legend(page) };
        await page.screenshot({ path: path.join(HERE, `spring-peak-open-${w}x${h}-${scheme}.png`) });
      } finally { await ctx.close(); }
    }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "capture.json"), JSON.stringify(rep, null, 1)); }

// X-DS keyframes r8 pass 6 (critic C6c) — served falsifier for KF-C6c-01: the reader opens 'Peak overshoot'
// on #/spring and the rail's scroller must rest at its END with the response-axis row whole above the fold,
// after the rail's fold landing has re-capped it. Headless real Chrome (§0ei); one browser, closed in finally.
// Pass rule, at 600 ms and 2500 ms after the press: scrollTop === scrollHeight - clientHeight (±1), and the
// axis labels' bottom <= the fold (+0.5).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] ?? path.join(HERE, "c6-probe.json");
const SHOTS = process.argv[3];
const BASE = "http://localhost:5173/";
const rep = { fails: [], cells: {} };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [1280, 800], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      const trigger = page.locator(".spring-heatmap-section [data-figure-title]").first();
      const was = await trigger.getAttribute("aria-expanded");
      if (was !== "true") await trigger.click();
      const t0 = Date.now();
      for (const at of [600, 2500]) {
        await page.waitForTimeout(Math.max(0, at - (Date.now() - t0)));
        const m = await page.evaluate(() => {
          const sec = document.querySelector(".spring-heatmap-section");
          const s = sec.closest(".controls-surface");
          const r = s.getBoundingClientRect(); const fold = r.top + s.clientTop + s.clientHeight;
          const x = sec.querySelector(".spring-heatmap-x").getBoundingClientRect();
          return { scrollTop: Math.round(s.scrollTop * 10) / 10, maxScroll: s.scrollHeight - s.clientHeight, fold: Math.round(fold * 10) / 10,
            labels: [Math.round(x.top * 10) / 10, Math.round(x.bottom * 10) / 10], maxBlockSize: s.style.maxBlockSize };
        });
        m.initiallyOpen = was === "true";
        rep.cells[`spring-${w}x${h}-${scheme}-${at}ms`] = m;
        if (Math.abs(m.maxScroll - m.scrollTop) > 1) rep.fails.push(`${w}x${h} ${scheme} @${at}ms: scrollTop ${m.scrollTop} of max ${m.maxScroll}`);
        if (m.labels[1] > m.fold + 0.5) rep.fails.push(`${w}x${h} ${scheme} @${at}ms: axis labels ${m.labels[0]}-${m.labels[1]} against fold ${m.fold}`);
      }
      if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, `spring-peak-open-${w}x${h}-${scheme}.png`) }); }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(OUT, JSON.stringify(rep, null, 1)); console.log(JSON.stringify({ fails: rep.fails }, null, 1)); }

// X-DS keyframes r8 pass 7 (critic C7) — served falsifier for KF-C7-01: the reader opens 'Peak overshoot' on
// #/spring. The rail must keep the facet's NAME in view and place BOTH edges of its scroll port at rest:
//   • the 'Physics' title row is whole inside the card and not inside the scrolled port (it never scrolls away);
//   • the port rests at its end with the response-axis row whole above the fold (KF-C6c-01 kept);
//   • TOP EDGE: no line of text crosses the port's top edge or lies under its start fade (a boxed row's lower
//     edge under the fade is the cue, as at the fold, KF-C4-03).
// At 600 ms and 2500 ms after the press, 1440x900 / 1280x800 / 1440x1080, both schemes. Headless real Chrome
// (§0ei); one browser, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] ?? path.join(HERE, "c7-probe.json");
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
          const r1 = (v) => Math.round(v * 10) / 10;
          const sec = document.querySelector(".spring-heatmap-section");
          const s = sec.closest("[data-fold-key]");
          const card = s.closest(".pane-frame").getBoundingClientRect();
          const r = s.getBoundingClientRect(); const top = r.top + s.clientTop; const fold = top + s.clientHeight;
          const raw = getComputedStyle(s).getPropertyValue("--fade-scroll-width").trim(); const n = parseFloat(raw);
          const fade = Number.isFinite(n) ? (raw.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : n) : 16;
          const x = sec.querySelector(".spring-heatmap-x").getBoundingClientRect();
          const title = [...s.closest(".pane-frame").querySelectorAll(".configurator-section-label")].find((e) => e.textContent.trim() === "Physics");
          const tr = title.getBoundingClientRect();
          const ownText = (el) => [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim() !== "");
          const startCut = [...s.querySelectorAll("*")].filter((el) => {
            if (!ownText(el) || !el.checkVisibility({ visibilityProperty: true })) return false;
            const b = el.getBoundingClientRect(); return b.height > 1 && b.top < top + fade - 0.5 && b.bottom > top + 0.5;
          }).map((el) => { const b = el.getBoundingClientRect(); return `${el.textContent.trim().slice(0, 24)} ${r1(b.top)}-${r1(b.bottom)}`; });
          return { scrollTop: r1(s.scrollTop), maxScroll: s.scrollHeight - s.clientHeight, portTop: r1(top), fold: r1(fold), fade,
            labels: [r1(x.top), r1(x.bottom)], title: [r1(tr.top), r1(tr.bottom)], card: [r1(card.top), r1(card.bottom)],
            titleInPort: s.contains(title), startCut, maxBlockSize: s.style.maxBlockSize };
        });
        m.initiallyOpen = was === "true";
        const id = `${w}x${h} ${scheme} @${at}ms`;
        rep.cells[`spring-${w}x${h}-${scheme}-${at}ms`] = m;
        if (m.maxScroll > 1 && Math.abs(m.maxScroll - m.scrollTop) > 1) rep.fails.push(`${id}: scrollTop ${m.scrollTop} of max ${m.maxScroll}`);
        if (m.labels[1] > m.fold + 0.5) rep.fails.push(`${id}: axis labels ${m.labels[0]}-${m.labels[1]} against fold ${m.fold}`);
        if (m.titleInPort && m.scrollTop > 0) rep.fails.push(`${id}: the 'Physics' title row scrolls inside the port (scrollTop ${m.scrollTop}; title ${m.title[0]}-${m.title[1]}, port top ${m.portTop})`);
        if (m.title[0] < m.card[0] - 0.5 || m.title[1] > m.portTop + 0.5 && !m.titleInPort) rep.fails.push(`${id}: the title ${m.title[0]}-${m.title[1]} is not whole above the port (card ${m.card[0]}, port top ${m.portTop})`);
        if (m.startCut.length) rep.fails.push(`${id}: text across the port's top edge or start fade (top ${m.portTop}, fade ${m.fade}): ${m.startCut.join(" | ")}`);
      }
      if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, `spring-peak-open-${w}x${h}-${scheme}.png`) }); }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(OUT, JSON.stringify(rep, null, 1)); console.log(JSON.stringify({ fails: rep.fails }, null, 1)); }

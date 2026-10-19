// X-DS keyframes r8 pass 8 (critic C8) — served falsifier for KF-C8-01: the reader opens 'Peak overshoot' on
// #/spring. The C7 checks are kept (the port rests at its end, the response-axis caption whole above the fold,
// the 'Physics' title whole above the port), and the TOP EDGE test is widened from own-text elements to every
// element that PAINTS (a background or a border: a slider's fill, a tile's border) and to every ROW (a box at most
// a row tall, ROW_MAX_FADES x fade): none may cross the port's top edge, and none may lie under the start fade
// while that fade is on. The free plate under the ribbon (frame foot less the ribbon's last box) is recorded.
// 600 and 2500 ms after the press, 1440x900 / 1280x800 / 1440x1080, both schemes. Headless real Chrome (§0ei);
// one browser, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] ?? path.join(HERE, "c8-probe.json");
const SHOTS = process.argv[3];
const BASE = process.env.BASE ?? "http://localhost:5193/";
const rep = { fails: [], cells: {} };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [1280, 800], [1440, 1080]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      const trigger = page.locator(".spring-heatmap-section [data-figure-title]").first();
      if ((await trigger.getAttribute("aria-expanded")) !== "true") await trigger.click();
      const t0 = Date.now();
      for (const at of [600, 2500]) {
        await page.waitForTimeout(Math.max(0, at - (Date.now() - t0)));
        const m = await page.evaluate(() => {
          const r1 = (v) => Math.round(v * 10) / 10;
          const sec = document.querySelector(".spring-heatmap-section");
          const s = sec.closest("[data-fold-key]");
          const frameEl = s.closest(".pane-frame"); const card = frameEl.getBoundingClientRect();
          const r = s.getBoundingClientRect(); const top = r.top + s.clientTop; const fold = top + s.clientHeight;
          const raw = getComputedStyle(s).getPropertyValue("--fade-scroll-width").trim(); const n = parseFloat(raw);
          const fade = Number.isFinite(n) ? (raw.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : n) : 16;
          const x = sec.querySelector(".spring-heatmap-x").getBoundingClientRect();
          const title = [...frameEl.querySelectorAll(".configurator-section-label")].find((e) => e.textContent.trim() === "Physics");
          const tr = title.getBoundingClientRect();
          const clear = (c) => c === "transparent" || /rgba?\([^)]*,\s*0\)$/.test(c) || / \/ 0\)$/.test(c);
          const paints = (el) => { const cs = getComputedStyle(el); if (!clear(cs.backgroundColor) || cs.backgroundImage !== "none") return true;
            return ["top", "bottom", "left", "right"].some((d) => parseFloat(cs.getPropertyValue(`border-${d}-width`)) > 0 && cs.getPropertyValue(`border-${d}-style`) !== "none" && !clear(cs.getPropertyValue(`border-${d}-color`))); };
          const ownText = (el) => [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim() !== "");
          // The start fade is glass's `--fade-start` (FadingScroll's [data-fade-start] scroll-driven animation).
          const fadeStartPx = parseFloat(getComputedStyle(s).getPropertyValue("--fade-start")) || 0;
          const startFade = s.hasAttribute("data-fade-start") && s.scrollTop > 0 && fadeStartPx > 0.5;
          const cuts = [], faded = [];
          for (const el of s.querySelectorAll("*")) {
            if (el.matches("[data-slot=separator],[role=separator],hr")) continue;
            if (!el.checkVisibility({ visibilityProperty: true })) continue;
            const b = el.getBoundingClientRect(); if (b.height <= 1 || b.width <= 1) continue;
            const painted = ownText(el) || paints(el); const row = b.height <= 6 * fade;
            if (!painted && !row) continue;
            const tag = `${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className).split(" ")[0]}${ownText(el) ? ` '${el.textContent.trim().slice(0, 16)}'` : ""} ${r1(b.top)}-${r1(b.bottom)}`;
            if (b.top < top - 0.5 && b.bottom > top + 0.5) cuts.push(tag);
            else if (startFade && painted && b.top >= top - 0.5 && b.top < top + fade - 0.5) faded.push(tag);
          }
          const ribbonFoot = Math.max(...[...frameEl.querySelectorAll("*")].filter((e) => !s.contains(e) && e.checkVisibility() && (ownText(e) || paints(e))).map((e) => e.getBoundingClientRect().bottom));
          return { scrollTop: r1(s.scrollTop), maxScroll: s.scrollHeight - s.clientHeight, portTop: r1(top), fold: r1(fold), fade, startFade, fadeStartPx,
            labels: [r1(x.top), r1(x.bottom)], title: [r1(tr.top), r1(tr.bottom)], card: [r1(card.top), r1(card.bottom)], ribbonFoot: r1(ribbonFoot), freePlate: r1(card.bottom - ribbonFoot),
            titleInPort: s.contains(title), cuts, faded, maxBlockSize: s.style.maxBlockSize };
        });
        const id = `${w}x${h} ${scheme} @${at}ms`;
        rep.cells[`spring-${w}x${h}-${scheme}-${at}ms`] = m;
        if (m.maxScroll > 1 && Math.abs(m.maxScroll - m.scrollTop) > 1) rep.fails.push(`${id}: scrollTop ${m.scrollTop} of max ${m.maxScroll}`);
        if (m.labels[1] > m.fold + 0.5) rep.fails.push(`${id}: axis labels ${m.labels[0]}-${m.labels[1]} against fold ${m.fold}`);
        if (m.titleInPort) rep.fails.push(`${id}: the 'Physics' title is inside the port`);
        if (m.title[0] < m.card[0] - 0.5 || m.title[1] > m.portTop + 0.5) rep.fails.push(`${id}: the title ${m.title[0]}-${m.title[1]} is not whole above the port (port top ${m.portTop})`);
        if (m.cuts.length) rep.fails.push(`${id}: the port's top edge ${m.portTop} crosses ${m.cuts.join(" | ")}`);
        if (m.faded.length) rep.fails.push(`${id}: under the start fade (top ${m.portTop}, fade ${m.fade}): ${m.faded.join(" | ")}`);
      }
      // Scrolled up off the landed end, the start fade is the cue again (KF-C8-01 keeps glass's fade for the reader).
      const back = await page.evaluate(async () => {
        const s = document.querySelector(".spring-heatmap-section").closest("[data-fold-key]");
        s.scrollTop = Math.max(0, s.scrollTop - 30); await new Promise((r) => setTimeout(r, 400));
        const on = s.hasAttribute("data-fade-start") && (parseFloat(getComputedStyle(s).getPropertyValue("--fade-start")) || 0) > 0.5;
        s.scrollTop = s.scrollHeight; await new Promise((r) => setTimeout(r, 400));
        return { on };
      });
      rep.cells[`spring-${w}x${h}-${scheme}-scrolled-up`] = back;
      if (!back.on) rep.fails.push(`${w}x${h} ${scheme}: scrolled up 30 px, the start fade did not return`);
      if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, `spring-peak-open-${w}x${h}-${scheme}.png`) }); }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(OUT, JSON.stringify(rep, null, 1)); console.log(JSON.stringify({ fails: rep.fails }, null, 1)); }

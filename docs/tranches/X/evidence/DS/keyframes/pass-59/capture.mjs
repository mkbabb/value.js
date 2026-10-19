// X-DS keyframes r9 pass 7 (critic C7): AFTER frames for every route (1440/390, light/dark), cube-keyframes/-timeline/-dock-open at 1440, the parked-peek header press at 390 (KF-C7-01), the easing fold (KF-C7-02), the timeline's one lead (KF-C7-03) and the spring Peak-overshoot open (KF-C7-04). Headless real Chrome (§0ei); one browser, closed in finally.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.join(path.dirname(fileURLToPath(import.meta.url)), "after"); fs.mkdirSync(HERE, { recursive: true });
const BASE = process.env.BASE ?? "http://localhost:5197/";
const KEY = "animation-groups-control-options-store";
const routes = ["", "cube", "amiga", "square", "easing", "spring", "sequence"];
const rep = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setSurface = (page, scene, patch) => page.evaluate(([k, scene, patch]) => { const s = JSON.parse(localStorage.getItem(k) ?? "{}"); s[scene] = { ...(s[scene] ?? {}), ...patch }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, scene, patch]);
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    try {
      for (const r of routes) {
        await page.goto(`${BASE}#/${r}`, { waitUntil: "load" }); await page.waitForTimeout(3500);
        await page.screenshot({ path: path.join(HERE, `${r || "home"}-${w}-${scheme}.png`) });
        const k = `${r || "home"}-${w}-${scheme}`;
        if (r === "square") rep[k] = await page.evaluate(() => {
          const f = document.querySelector(".square-field")?.getBoundingClientRect(); const box = document.querySelector(".demo-box")?.getBoundingClientRect();
          const ar = document.querySelector(".square-arena"); if (!f || !box || !ar) return null; const a = ar.getBoundingClientRect();
          const pad = parseFloat(getComputedStyle(ar).getPropertyValue("--stage-plate-pad-inline")) * parseFloat(getComputedStyle(document.documentElement).fontSize);
          return { field: Math.round(f.width), box: Math.round(box.width), reach: Math.round(f.width + box.width), arena: Math.round(a.width), innerMeasure: Math.round(a.width - 2 * pad) };
        });
        if (r === "easing") rep[k] = await page.evaluate(() => {
          const d = document.querySelector(".easing-target .specimen-drawer"); if (!d) return null;
          const b = d.getBoundingClientRect(); const fold = b.top + d.clientTop + d.clientHeight;
          const fade = parseFloat(getComputedStyle(d).getPropertyValue("--fade-end")) || 0; const peek = parseFloat(getComputedStyle(d).scrollPaddingBlockEnd) || 0;
          const crossing = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => { const q = e.getBoundingClientRect(); return { k: (e.classList.contains("catalogue-family") ? "H:" : "T:") + e.textContent.trim().slice(0, 16), top: Math.round(q.top), h: Math.round(q.height), shown: Math.round((fold - q.top) * 10) / 10 }; }).filter((q) => q.top < fold - 0.5 && q.top + q.h > fold + 0.5);
          const heads = [...d.querySelectorAll(".catalogue-family")].map((e) => { const q = e.getBoundingClientRect(); return { k: e.textContent.trim().slice(0, 12), top: Math.round(q.top), bottom: Math.round(q.bottom) }; }).filter((q) => q.top < fold + 40 && q.bottom > fold - 80);
          return { fold: Math.round(fold), fade, peek, crossing, headsNearFold: heads };
        });
        if (r === "" && w === 1440) rep[k] = await page.evaluate(() => {
          const band = document.querySelector(".hero-band")?.getBoundingClientRect(); const h1 = document.querySelector(".hero-band h1, .hero-band [class*=headline], h1")?.getBoundingClientRect();
          return { band: band && { top: Math.round(band.top), bottom: Math.round(band.bottom), left: Math.round(band.left) }, headline: h1 && { top: Math.round(h1.top), bottom: Math.round(h1.bottom), left: Math.round(h1.left), right: Math.round(h1.right) } };
        });
        if (r === "cube" && w === 1440) rep[`labels-${scheme}`] = await page.evaluate(() => [...document.querySelectorAll(".labeled-field-grid label, .labeled-field-grid .label, .labeled-field-grid > *:nth-child(odd)")].slice(0, 6).map((e) => ({ t: e.textContent.trim().slice(0, 16), font: getComputedStyle(e).fontFamily.slice(0, 40) })));
      }
      if (w === 1440) {
        for (const surf of ["keyframes", "timeline"]) {
          await setSurface(page, "cube", { selectedControl: surf, isTimelineExpanded: surf === "timeline" });
          await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(4500);
          await page.screenshot({ path: path.join(HERE, `cube-${surf}-${w}-${scheme}.png`) });
          if (surf === "timeline") rep[`timeline-empty-${scheme}`] = await page.evaluate(() => {
            const r = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return { top: Math.round(q.top), bottom: Math.round(q.bottom), left: Math.round(q.left), right: Math.round(q.right) }; };
            const p = [...document.querySelectorAll("p")].find((e) => /to edit here/.test(e.textContent)); const grp = p?.parentElement;
            const inline = grp && [...grp.querySelectorAll("button")].find((b) => /Import/.test(b.textContent));
            const ribbon = [...document.querySelectorAll("button[aria-label^='Import CSS']")].pop();
            const emph = (b) => b && { cls: [...b.classList].filter((c) => /emphasis|secondary|quiet|capsule/.test(c)).join(" "), bg: getComputedStyle(b).backgroundColor };
            return { hint: r(p), inlineImport: r(inline), inlineText: inline?.textContent.trim(), ribbonImport: r(ribbon), inlineEmphasis: emph(inline), ribbonEmphasis: emph(ribbon), gapHintToInline: p && inline ? Math.round(inline.getBoundingClientRect().top - p.getBoundingClientRect().bottom) : null };
          });
        }
        await setSurface(page, "cube", { selectedControl: "controls", isTimelineExpanded: false });
        await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
        rep[`chevron-${scheme}`] = await page.evaluate(() => [...document.querySelectorAll("[role=combobox]")].map((b) => { const svg = b.querySelector("svg.lucide-chevron-down"); const anc = b.parentElement?.closest("[data-state=open]"); return { text: b.textContent.trim().slice(0, 24), state: b.getAttribute("data-state"), rot: svg ? getComputedStyle(svg).rotate + " | " + getComputedStyle(svg).transform : null, openAncestor: anc ? (anc.tagName + "." + String(anc.className).slice(0, 60)) : null }; }));
        await page.mouse.click(958, 70); await page.waitForTimeout(1200);
        await page.screenshot({ path: path.join(HERE, `cube-dock-open-${w}-${scheme}.png`) });
      }
      if (w === 1440) {
        await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
        await page.click("[data-figure-title]"); await page.waitForTimeout(1800);
        await page.screenshot({ path: path.join(HERE, `spring-peak-${w}-${scheme}.png`) });
        rep[`spring-peak-${scheme}`] = await page.evaluate(() => {
          const p = document.querySelector("[data-fold-key=spring-physics]"); const b = p.getBoundingClientRect(); const mask = getComputedStyle(p).maskImage;
          const rows = [...p.querySelectorAll(".param-row, [data-figure-title], button")].map((e) => { const q = e.getBoundingClientRect(); return [(e.textContent || "").trim().slice(0, 14), Math.round(q.top), Math.round(q.bottom)]; }).filter((q) => q[2] > b.top - 30 && q[1] < b.top + 120);
          return { port: [Math.round(b.top), Math.round(b.bottom)], scrollTop: Math.round(p.scrollTop), reach: p.scrollHeight - p.clientHeight, headed: p.hasAttribute("data-fold-headed"), startFadeOn: !/rgb\(0, 0, 0\) 0px/.test(mask), rowsNearTop: rows };
        });
      }
      if (w === 390) {
        await page.goto(`${BASE}#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
        const sheet = () => page.evaluate(() => { const s = document.querySelector("[data-slot=sheet-content]"); const t = s?.querySelector("[data-slot=configurator-layer-trigger]"); const l = t?.closest("[data-slot=configurator-layer]");
          return { detent: s?.style.getPropertyValue("--detent-t"), height: s && Math.round(s.getBoundingClientRect().height), top: s && Math.round(s.getBoundingClientRect().top), position: s && getComputedStyle(s).position, header: t?.textContent.trim(), expanded: t?.getAttribute("aria-expanded"), layerHeight: l && Math.round(l.getBoundingClientRect().height) }; });
        const k = `sheet-tap-${scheme}`; rep[k] = { peek: await sheet() };
        await page.click("[data-slot=sheet-content] [data-slot=configurator-layer-trigger]"); await page.waitForTimeout(1500);
        rep[k].afterPress = await sheet();
        await page.screenshot({ path: path.join(HERE, `cube-sheet-press-${w}-${scheme}.png`) });
        await page.screenshot({ path: path.join(HERE, `cube-sheet-press-${w}-${scheme}-fullpage.png`), fullPage: true });
        await page.click("[data-slot=sheet-content] [data-slot=configurator-layer-trigger]"); await page.waitForTimeout(1200);
        rep[k].secondPressAtOpen = await sheet();
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(path.join(HERE, "capture.json"), JSON.stringify(rep, null, 1)); }

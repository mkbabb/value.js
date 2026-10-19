// SS-8 B08 EmptyState witnesses: es-ink (U-1) · es-retry (U-3 + U-4/ES-10) · es-measure (U-6/ES-25) · es-dock (U-8/ES-15)
import { chromium } from "playwright";
import { O, EV, routeApi, newCell, settle } from "./lib.mjs";
const want = process.argv.slice(2);
const on = (c) => !want.length || want.includes(c);
const browser = await chromium.launch();
try {
  if (on("es-ink")) for (const scheme of ["light", "dark"]) {
    const ctx = await newCell(browser, { scheme });
    try {
      await routeApi(ctx, () => "pass");
      const page = await ctx.newPage();
      await page.goto(O + "/#/palettes", { waitUntil: "load" });
      await settle(page, 4000);
      const f = await page.evaluate(() => {
        const plate = [...document.querySelectorAll("[role=status]")].find((e) => /No saved palettes yet/.test(e.textContent));
        const ps = plate.querySelectorAll("p"); const stmt = ps[0], hint = ps[1];
        const root = getComputedStyle(document.documentElement);
        const tok = (n) => { const raw = root.getPropertyValue(n).trim(); return { raw: raw.slice(0, 80), oklch: raw ? __ss8.oklch(`var(${n})`) : null }; };
        const L = (s) => { const m = /oklch\(([\d.]+)%?\s+([\d.]+)/.exec(s || ""); if (!m) return null; let l = +m[1]; if (l > 1.5) l /= 100; return { L: +l.toFixed(4), C: +(+m[2]).toFixed(4) }; };
        const fg = tok("--foreground"), im = tok("--ink-muted"), mf = tok("--muted-foreground"), al = tok("--accent-live");
        const dots = [...plate.querySelectorAll('[data-slot="empty-state-trio"] > *')].map((d) => ({ bg: getComputedStyle(d).backgroundColor, w: d.getBoundingClientRect().width, op: getComputedStyle(d).opacity, cr: __ss8.ink(d, "backgroundColor").cr, borderColor: getComputedStyle(d).borderTopColor, borderCr: __ss8.ink(d, "borderTopColor").cr }));
        // L-N3 pair: the certified rung vs the masking fallback, each over the hint's composited ground
        const g = __ss8.ground(hint).g;
        const resolve = (n) => { const sp = document.createElement("span"); sp.style.color = `var(${n})`; hint.append(sp); const c = getComputedStyle(sp).color; sp.remove(); return c; };
        const crOf = (css) => __ss8.cr(__ss8.over(__ss8.rgba(css), g), g);
        return { dark: document.documentElement.classList.contains("dark"),
          stmt: __ss8.ink(stmt), hint: __ss8.ink(hint), hintColor: getComputedStyle(hint).color,
          tokens: { fg: [fg.raw, L(fg.oklch)], inkMuted: [im.raw, L(im.oklch)], mutedFg: [mf.raw, L(mf.oklch)], accentLive: [al.raw, L(al.oklch)] },
          LN3: { inkMuted: resolve("--ink-muted"), inkMutedCr: crOf(resolve("--ink-muted")), mutedFg: resolve("--muted-foreground"), mutedFgCr: crOf(resolve("--muted-foreground")) },
          dots };
      });
      await page.locator("[role=status]", { hasText: "No saved palettes yet" }).screenshot({ path: `${EV}es-u1-plate-${scheme}.png` });
      console.log("es-ink", scheme, JSON.stringify(f));
    } finally { await ctx.close(); }
  }
  if (on("es-retry")) {
    for (const arm of ["retry-keyboard", "spa-nav"]) {
      const ctx = await newCell(browser);
      let phase = "abort";
      const hits = await routeApi(ctx, () => phase);
      try {
        const page = await ctx.newPage();
        await page.goto(O + "/#/browse", { waitUntil: "load" });
        await page.waitForSelector("[role=alert] >> text=/reach the palette service/", { timeout: 20000 });
        await page.waitForTimeout(1500);
        phase = "mock";
        const state = () => page.evaluate(() => ({ errorPlate: !!document.querySelector('.pane-wrapper [role=alert] p')?.textContent.match(/reach the palette service/), cards: document.querySelectorAll('[role="article"]').length,
          browseText: (document.querySelector('[data-pane="browse"]')?.innerText || "").replace(/\s+/g, " ").slice(0, 140),
          active: (() => { const a = document.activeElement; return a ? `${a.tagName}${a.id ? "#" + a.id : ""}.${(a.className?.toString() || "").slice(0, 40)} "${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 40)}"` : null; })() }));
        let out;
        if (arm === "retry-keyboard") {
          const retry = page.getByRole("button", { name: "Retry" });
          await retry.focus(); const pre = await state();
          await page.keyboard.press("Enter");
          await page.waitForTimeout(300); const t300 = await state();
          await page.waitForTimeout(3700); const t4s = await state();
          await page.screenshot({ path: `${EV}es-u3-after-retry-4s.png` });
          out = { pre, t300, t4s };
        } else {
          await page.goto(O + "/#/palettes"); await page.waitForTimeout(1500);
          await page.goto(O + "/#/browse"); await page.waitForTimeout(4000);
          out = { afterSpaNav: await state() };
        }
        console.log("es-retry", arm, JSON.stringify({ ...out, apiHits: hits.map((h) => h.mode + " " + h.url.replace(/^.*3000/, "")).slice(-6) }));
      } finally { await ctx.close(); }
    }
  }
  if (on("es-measure")) for (const w of [1440, 390]) {
    const ctx = await newCell(browser, { w, h: 900 });
    try {
      await routeApi(ctx, () => "pass");
      const page = await ctx.newPage();
      await page.goto(O + "/#/palettes", { waitUntil: "load" });
      await settle(page, 3500);
      const f = await page.evaluate(() => {
        const plate = [...document.querySelectorAll("[role=status]")].find((e) => /No saved palettes yet/.test(e.textContent));
        const p = plate.querySelector("p"); const s = getComputedStyle(p);
        const r = document.createRange(); r.selectNodeContents(p); const tw = r.getBoundingClientRect().width; const txt = p.textContent.trim();
        const probe = document.createElement("span"); probe.textContent = "0"; probe.style.cssText = `font:${s.font};font-variation-settings:${s.fontVariationSettings};position:absolute;visibility:hidden`; p.append(probe); const chPx = probe.getBoundingClientRect().width; probe.remove();
        return { family: s.fontFamily.slice(0, 40), fontPx: s.fontSize, maxWidth: s.maxWidth, chPx, authoredCh: parseFloat(s.maxWidth) / chPx, text: txt, textPx: tw, avgAdvance: tw / txt.length, effectiveChars: parseFloat(s.maxWidth) / (tw / txt.length), looserPct: ((chPx / (tw / txt.length)) - 1) * 100, plateW: plate.getBoundingClientRect().width };
      });
      console.log("es-measure", w, JSON.stringify(f));
    } finally { await ctx.close(); }
  }
  if (on("es-dock")) {
    const ctx = await newCell(browser);
    try {
      await routeApi(ctx, () => "pass");
      const page = await ctx.newPage();
      await page.goto(O + "/#/palettes", { waitUntil: "load" });
      await page.waitForSelector(".glass-dock");
      await settle(page, 2500);
      await page.locator(".glass-dock").hover(); await page.mouse.move(700, 600);
      await page.waitForSelector(".dock-seal", { state: "visible", timeout: 15000 });
      await page.waitForTimeout(900);
      const f = await page.evaluate(() => {
        const seal = document.querySelector(".dock-seal"); const ink = seal.querySelector(".dock-seal-ink");
        const vis = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { tag: el.tagName, cls: el.getAttribute("class")?.slice(0, 60), w: r.width, h: r.height, op: s.opacity, vis: s.visibility, color: s.color, paths: el.querySelectorAll("path,line,circle,rect,polyline").length, hitAtCentre: (() => { const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return e === el || el.contains(e) ? "self" : (e?.getAttribute("class") || e?.tagName || "").toString().slice(0, 40); })() }; };
        const plus = [...document.querySelectorAll(".add-slot-ghost svg, [class*='add-slot'] svg")].map(vis);
        return { seal: vis(seal), ink: vis(ink), plus };
      });
      await page.locator(".dock-seal").screenshot({ path: `${EV}es-u8-seal-collapsed.png` });
      console.log("es-dock", JSON.stringify(f));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }

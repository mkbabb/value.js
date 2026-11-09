// X·§0ht — falsifiers for (a) D-24.r1 Browse names at 360/375/390/430 (badge rows,
// count-to-heart gap), (b) short-landscape /mix stage above the fold, (c) the colour
// field shows what the user typed at 390, (d) the mix ink-in under a slow main thread.
// One headless Chromium per run, a context per cell, closed in finally.
// usage: node probe.mjs <tag> [cells=browse,land,field,mix]
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const PORT = process.env.PORT || "5391";
const LOCAL = `http://localhost:${PORT}`;
const BASE = process.env.BASE || `http://vj.test:${PORT}`; // non-loopback origin → the availability gate stays off
const API = "https://api.color.babb.dev";
const TAG = process.argv[2] || "r";
const WANT = (process.argv[3] || "browse,land,field,mix").split(",");
const OUT = process.env.HOME + "/.dev-logs/x-0ht-a11y/" + TAG;
fs.mkdirSync(OUT, { recursive: true });
const mob = (w, h) => ({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const desk = (w, h) => ({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
const out = { browse: [], land: [], field: [], mix: [] };
const browser = await chromium.launch(process.env.SWS ? { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] } : {});
async function cell(opts, scheme, fn) {
  const ctx = await browser.newContext({ ...opts, colorScheme: scheme });
  try {
    if (BASE.includes("vj.test")) {
      await ctx.route(`${BASE}/**`, async (route) => {
        const res = await fetch(route.request().url().replace(BASE, LOCAL));
        const body = Buffer.from(await res.arrayBuffer());
        const headers = {}; res.headers.forEach((v, k) => { if (!/content-encoding|content-length|transfer-encoding/.test(k)) headers[k] = v; });
        return route.fulfill({ status: res.status, body, headers });
      });
    }
    if (!BASE.startsWith("https://color.babb.dev")) {
      await ctx.route(API + "/**", async (route) => {
        const req = route.request();
        const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS" };
        if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
        if (req.method() !== "GET") return route.fulfill({ status: 403, body: "{}", headers: { ...cors, "content-type": "application/json" } });
        const res = await fetch(req.url(), { headers: { accept: "application/json" } });
        return route.fulfill({ status: res.status, body: Buffer.from(await res.arrayBuffer()), headers: { ...cors, "content-type": res.headers.get("content-type") || "application/json" } });
      });
    }
    await ctx.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch {} }, scheme);
    const page = await ctx.newPage();
    return await fn(page);
  } catch (e) { return { error: String(e).slice(0, 300) }; }
  finally { await ctx.close(); }
}
try {
  if (WANT.includes("browse")) for (const [w, h] of [[360, 780], [375, 667], [390, 844], [430, 932]]) for (const scheme of ["dark", "light"]) {
    out.browse.push({ w, scheme, ...(await cell(mob(w, h), scheme, async (page) => {
      await page.goto(`${BASE}/#/browse`, { waitUntil: "load", timeout: 60000 });
      await page.waitForSelector(".palette-card [data-palette-name]", { timeout: 30000 });
      await page.waitForTimeout(2500);
      const cards = await page.evaluate(() => [...document.querySelectorAll(".palette-card")].map((card) => {
        const R = (e) => e?.getBoundingClientRect();
        const n = card.querySelector("[data-palette-name]");
        const v = card.querySelector('button[aria-label$="click to vote"]');
        const heart = v?.querySelector("svg");
        const count = card.querySelector('[data-count="colors"]');
        const badge = card.querySelector(".featured-badge");
        const menu = card.querySelector(".palette-card__menu");
        const cb = R(card), vr = R(v), mr = R(menu);
        const mid = (b) => (b.top + b.bottom) / 2;
        const sameRow = (a, b) => a && b && Math.abs(mid(R(a)) - mid(R(b))) < 12;
        // the last ink before the heart: the badge or the colour count, whichever ends later
        const before = [count, badge].filter(Boolean).map((e) => R(e).right);
        return {
          name: n?.textContent?.trim(), trunc: n ? n.scrollWidth > n.clientWidth + 0.5 : null, need: n?.scrollWidth, have: n?.clientWidth,
          featured: !!badge, badgeW: badge ? Math.round(R(badge).width) : null,
          heartGap: heart && before.length ? +(R(heart).left - Math.max(...before)).toFixed(1) : null,
          voteOnRow: !!sameRow(n, v), menuOnRow: !!sameRow(n, menu), h: Math.round(cb.height),
          inCard: !!(vr && mr && vr.right <= cb.right + 0.5 && mr.right <= cb.right + 0.5 && vr.left >= cb.left - 0.5),
          overlap: !!(vr && mr && vr.right > mr.left + 0.5),
          chevron: (() => { const b = card.querySelector('button[aria-label^="Colors of"]'); if (!b) return false; const r = b.getBoundingClientRect(); return r.width > 2 && r.height > 2 && getComputedStyle(b).clipPath === "none"; })(), chevInTree: !!card.querySelector('button[aria-label^="Colors of"]'),
          type: n ? getComputedStyle(n).fontSize : null,
        };
      }));
      const docW = await page.evaluate(() => document.documentElement.scrollWidth);
      await page.screenshot({ path: `${OUT}/browse-${w}-${scheme}.png` });
      const loc = page.locator(".palette-card");
      for (let i = 0; i < cards.length; i++) if (cards[i].featured || cards[i].trunc) { await loc.nth(i).scrollIntoViewIfNeeded(); await loc.nth(i).screenshot({ path: `${OUT}/card-${w}-${scheme}-${i}.png` }).catch(() => {}); }
      return { docW, cards };
    })) });
  }
  if (WANT.includes("land")) for (const [w, h] of [[667, 375], [740, 360], [844, 390], [932, 430]]) for (const route of ["/", "/mix"]) for (const scheme of ["dark", "light"]) {
    out.land.push({ w, h, route, scheme, ...(await cell(mob(w, h), scheme, async (page) => {
      await page.goto(`${BASE}/#${route}`, { waitUntil: "load", timeout: 60000 });
      await page.waitForSelector(".pane-wrapper--stage [role=slider]", { timeout: 30000 });
      await page.waitForTimeout(3000);
      const m = await page.evaluate(() => {
        const stage = document.querySelector(".pane-wrapper--stage");
        const insp = document.querySelector(".pane-wrapper--inspector");
        const sliders = [...document.querySelectorAll(".pane-wrapper--stage [role=slider]")];
        const o = { stageTop: Math.round(stage.getBoundingClientRect().top), stageBottom: Math.round(stage.getBoundingClientRect().bottom), inspTop: insp ? Math.round(insp.getBoundingClientRect().top) : null, docH: document.documentElement.scrollHeight, docW: document.documentElement.scrollWidth };
        const sp = document.querySelector(".pane-wrapper--stage .spectrum-picker");
        if (sp) { const b = sp.getBoundingClientRect(); o.spectrum = +(b.width / b.height).toFixed(3); }
        const host = document.querySelector(".pane-wrapper--stage .card-scroll-host");
        if (host) {
          host.scrollTop = host.scrollHeight;
          const hb = host.getBoundingClientRect();
          const t = Math.min(...sliders.map((s) => s.getBoundingClientRect().top)), b = Math.max(...sliders.map((s) => s.getBoundingClientRect().bottom));
          o.scrolled = [Math.round(t), Math.round(b)];
          o.seen = b <= Math.min(innerHeight, hb.bottom) + 0.5 && t >= Math.max(0, hb.top) - 0.5;
          host.scrollTop = 0;
        }
        return o;
      });
      await page.screenshot({ path: `${OUT}/land-${w}x${h}${route.replace(/\//g, "_")}-${scheme}.png` });
      return { ...m, ok: m.stageBottom <= h && m.seen === true };
    })) });
  }
  if (WANT.includes("field")) for (const [vp, scheme] of [[mob(390, 844), "dark"], [mob(390, 844), "light"], [mob(360, 780), "dark"], [desk(1440, 900), "dark"]]) {
    for (const typed of ["zzqq-not-a-colour", "oklch(70% 0.1 nonsense)"]) {
      out.field.push({ w: vp.viewport.width, scheme, typed, ...(await cell(vp, scheme, async (page) => {
        await page.goto(`${BASE}/#/?space=oklch&color=efflorescence`, { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(3000);
        await page.getByRole("button", { name: "Toggle action bar" }).click().catch(() => {});
        await page.waitForTimeout(800);
        await page.getByRole("button", { name: "Open color input" }).click();
        await page.waitForSelector(".color-input", { timeout: 15000 });
        await page.waitForTimeout(600);
        await page.locator(".color-input").first().click();
        await page.keyboard.press("ControlOrMeta+A");
        await page.keyboard.type(typed);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);
        const span = page.locator(".color-input").first();
        const m = await span.evaluate((el) => {
          const b = el.getBoundingClientRect();
          const text = el.textContent;
          const r = document.createRange();
          const node = el.firstChild;
          r.setStart(node, text.length - 1); r.setEnd(node, text.length);
          const lr = r.getBoundingClientRect();
          return { text, focused: document.activeElement === el, badge: !!document.getElementById("color-input-error"), sw: el.scrollWidth, cw: el.clientWidth, sl: el.scrollLeft, to: getComputedStyle(el).textOverflow,
            lastCharIn: lr.left >= b.left - 0.5 && lr.left + lr.width / 2 <= b.right, box: [Math.round(b.left), Math.round(b.width)] };
        });
        // ink extent: how wide is the painted text run inside the span (the "…"-only bug paints ~1 glyph)
        const png = await span.screenshot({ path: `${OUT}/field-${vp.viewport.width}-${scheme}-${typed.length}.png` });
        const ink = await page.evaluate(async (b64) => {
          const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
          const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
          const g = c.getContext("2d"); g.drawImage(img, 0, 0);
          const d = g.getImageData(0, 0, c.width, c.height).data;
          const px = (x, y) => { const i = (y * c.width + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
          const bg = px(2, Math.floor(c.height / 2));
          let first = -1, last = -1;
          for (let x = 0; x < c.width; x++) for (let y = 2; y < c.height - 2; y++) { const p = px(x, y); if (Math.abs(p[0] - bg[0]) + Math.abs(p[1] - bg[1]) + Math.abs(p[2] - bg[2]) > 120) { if (first < 0) first = x; last = x; break; } }
          return { inkW: first < 0 ? 0 : last - first + 1, spanW: c.width };
        }, png.toString("base64"));
        const inkFrac = +(ink.inkW / ink.spanW).toFixed(2);
        // after blur the field repaints the current colour from its start
        await page.mouse.click(5, vp.viewport.height - 5);
        await page.waitForTimeout(600);
        const after = await span.evaluate((el) => ({ text: el.textContent, sl: el.scrollLeft }));
        return { ...m, ...ink, inkFrac, after, ok: m.badge && m.focused && m.lastCharIn && inkFrac >= 0.5 && after.sl === 0 };
      })) });
    }
  }
  if (WANT.includes("mix")) for (const rate of (process.env.RATES || "1,6,12").split(",").map(Number)) for (const rep of [0, 1]) {
    out.mix.push({ rate, rep, ...(await cell(desk(1280, 720), "dark", async (page) => {
      await page.goto(`${BASE}/#/mix`, { waitUntil: "load", timeout: 60000 });
      const add = page.locator("main .add-slot-ghost").first();
      await add.waitFor({ timeout: 30000 });
      await page.waitForTimeout(2500);
      await add.click(); await add.click();
      await page.locator("main [data-mix-source]").nth(1).waitFor();
      const cdp = await page.context().newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate });
      const t = await page.evaluate(() => new Promise((resolve) => {
        const main = document.querySelector("main");
        const btn = [...main.querySelectorAll("button")].find((b) => b.textContent.trim() === "Mix");
        const t0 = performance.now(); const marks = {};
        const mo = new MutationObserver(() => {
          if (!marks.target && main.querySelector("[data-mix-target]")) marks.target = Math.round(performance.now() - t0);
          if (marks.target && marks.done == null && !main.querySelector(".mix-plate--ghost")) marks.done = Math.round(performance.now() - t0);
          if (!marks.ink && [...main.querySelectorAll("span")].some((s) => /^oklab\(/.test(s.textContent.trim()))) { marks.ink = Math.round(performance.now() - t0); mo.disconnect(); resolve(marks); }
        });
        mo.observe(main, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["class"] });
        btn.click();
        setTimeout(() => { mo.disconnect(); resolve({ ...marks, timeout: true }); }, 10000);
      }));
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
      return { ...t, ok: t.ink != null && t.ink <= 2500 };
    })) });
  }
  if (WANT.includes("mixflow")) for (let rep = 0; rep < Number(process.env.REPS || 4); rep++) {
    out.mix.push({ flow: true, rep, ...(await cell(desk(1280, 720), "dark", async (page) => {
      const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 200))); page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
      await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
      await page.getByRole("button", { name: "Expand dock" }).click({ timeout: 30000 }).catch(() => {});
      await page.getByRole("combobox", { name: "Select view" }).click({ timeout: 30000 });
      await page.getByRole("option", { name: "Mix", exact: true }).click();
      const main = page.locator('main[aria-labelledby="route-title"]:has(h1#route-title)');
      const add = main.locator(".add-slot-ghost").first();
      await add.click(); await add.click();
      await main.locator("[data-mix-source]").nth(1).waitFor();
      await page.evaluate((h) => { window.__hogMs = h; }, Number(process.env.HOG || 0));
      await page.evaluate(() => {
        const m = document.querySelector("main"); window.__mx = { t0: 0, marks: {}, raf: 0 };
        const tick = () => { window.__mx.raf++; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
        new MutationObserver(() => { const x = window.__mx; if (!x.t0) return; const t = Math.round(performance.now() - x.t0);
          if (x.marks.target == null && m.querySelector("[data-mix-target]")) x.marks.target = t;
          if (x.marks.target != null && x.marks.done == null && !m.querySelector(".mix-plate--ghost")) { x.marks.done = t; x.marks.rafAtDone = x.raf - x.raf0; }
          if (x.marks.ink == null && [...m.querySelectorAll("span")].some((s) => /^oklab\(/.test(s.textContent.trim()))) x.marks.ink = t;
        }).observe(m, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["class"] });
        const HOG = Number(window.__hogMs || 0);
        if (HOG) { const hog = () => { const t = performance.now(); while (performance.now() - t < HOG) {} requestAnimationFrame(hog); }; requestAnimationFrame(hog); }
        m.addEventListener("click", (e) => { if (e.target.closest("button")?.textContent.trim() === "Mix") { window.__mx.t0 = performance.now(); window.__mx.raf0 = window.__mx.raf; } }, true);
      });
      await main.getByRole("button", { name: "Mix", exact: true }).click();
      await page.waitForTimeout(6000);
      const r = await page.evaluate(() => ({ ...window.__mx.marks, rafIn3500: window.__mx.raf - window.__mx.raf0 }));
      return { ...r, errs: errs.slice(0, 4), ok: r.ink != null && r.ink <= 2500 };
    })) });
  }
} finally {
  await browser.close();
  fs.writeFileSync(`${OUT}/probe.json`, JSON.stringify(out, null, 1));
}
const v = {};
if (out.browse.length) v.d24 = out.browse.every((r) => r.cards?.length && r.cards.every((k) => !k.trunc && k.voteOnRow && k.menuOnRow && k.inCard && !k.overlap && (k.heartGap == null || k.heartGap >= 6)) && r.docW <= r.w);
if (out.land.length) v.mixLand = out.land.every((r) => r.ok);
if (out.field.length) v.field = out.field.every((r) => r.ok);
if (out.mix.length) v.mix = out.mix.every((r) => r.ok);
console.log(JSON.stringify({ tag: TAG, verdict: v }));
for (const r of out.browse) console.log("browse", r.w, r.scheme, r.docW, r.error || "", JSON.stringify(r.cards?.filter((k) => k.trunc || k.featured || (k.heartGap != null && k.heartGap < 6) || !k.voteOnRow || !k.menuOnRow || !k.inCard || k.overlap).map((k) => [k.name, k.need, k.have, k.featured ? `badge${k.badgeW}` : "", `gap${k.heartGap}`, k.chevron ? "chev" : "nochev", k.h, k.type])));
for (const r of out.land) console.log("land", r.w, r.h, r.route, r.scheme, JSON.stringify({ st: r.stageTop, sb: r.stageBottom, it: r.inspTop, sc: r.scrolled, seen: r.seen, sp: r.spectrum, docW: r.docW, ok: r.ok, err: r.error }));
for (const r of out.field) console.log("field", r.w, r.scheme, JSON.stringify({ typed: r.typed, focused: r.focused, badge: r.badge, sw: r.sw, cw: r.cw, sl: r.sl, to: r.to, last: r.lastCharIn, inkFrac: r.inkFrac, after: r.after, ok: r.ok, err: r.error }));
for (const r of out.mix) console.log("mix", JSON.stringify(r));

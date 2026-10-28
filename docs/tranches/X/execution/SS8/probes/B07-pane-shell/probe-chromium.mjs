// SS-8 · batch B07-pane-shell · Chromium headless witness (one browser, one context per cell).
// Served: value.js dev at http://localhost:9000 (HEAD working tree as served).
// Run: ~/.claude/guard/guarded --timeout 30 -- node <this> [cell,cell,...]
// Writes one JSON per cell to evidence/B07-pane-shell/chromium-<cell>.json (+ a few PNGs).
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "http://localhost:9000/#";
const EV = new URL("../../evidence/B07-pane-shell/", import.meta.url).pathname;
mkdirSync(EV, { recursive: true });
const only = process.argv[2] ? process.argv[2].split(",") : null;
const out = (name, data) => writeFileSync(`${EV}chromium-${name}.json`, JSON.stringify(data, null, 1));

// ---- in-page helpers (serialized) ----
const HEADER_READ = () => {
  const tok = (expr) => { const d = document.createElement("div"); d.style.background = expr; document.body.appendChild(d); const v = getComputedStyle(d).backgroundColor; d.remove(); return v; };
  const ports = [...document.querySelectorAll(".pane-scroll-fade")];
  const se = document.scrollingElement;
  return {
    hash: location.hash, vw: innerWidth, vh: innerHeight,
    doc: { scrollTop: se.scrollTop, maxScroll: se.scrollHeight - se.clientHeight },
    regions: [...document.querySelectorAll(".pane-wrapper")].map((w) => ({ pane: w.dataset.pane, w: Math.round(w.getBoundingClientRect().width), h: Math.round(w.getBoundingClientRect().height) })),
    tokens: { plateResting: tok("var(--glass-plate-resting)"), bgResting: tok("var(--glass-bg-resting)"), glassLevel: getComputedStyle(document.documentElement).getPropertyValue("--glass-level").trim() },
    headers: [...document.querySelectorAll(".pane-header")].map((h) => {
      const t = h.querySelector(".pane-header-title"), d = h.querySelector(".pane-header-desc");
      const cs = getComputedStyle(t), bs = getComputedStyle(h, "::before"), hr = h.getBoundingClientRect(), tr = t.getBoundingClientRect();
      const port = h.parentElement.querySelector(":scope > .pane-scroll-fade") || h.closest(".pane-scroll-fade");
      const pr = port?.getBoundingClientRect();
      return {
        title: t.textContent.trim().slice(0, 40), tag: t.tagName, visible: h.offsetParent !== null,
        rect: { top: +hr.top.toFixed(1), bottom: +hr.bottom.toFixed(1), h: +hr.height.toFixed(1) },
        titleBottom: +tr.bottom.toFixed(1), deadBandPx: +(hr.bottom - tr.bottom).toFixed(1),
        fs: cs.fontSize, transform: cs.transform, scale: cs.scale, condensed: h.dataset.condensed ?? null,
        desc: d ? { display: getComputedStyle(d).display, opacity: getComputedStyle(d).opacity } : null,
        veil: { display: bs.display, bg: bs.backgroundColor, opacity: bs.opacity, backdrop: bs.backdropFilter, animName: bs.animationName },
        port: port ? { seated: !h.closest(".pane-scroll-fade"), top: pr ? +pr.top.toFixed(1) : null, overlapPx: pr ? +(hr.bottom - pr.top).toFixed(1) : null, scrollTop: port.scrollTop, maxScroll: port.scrollHeight - port.clientHeight, scrollPaddingTop: getComputedStyle(port).scrollPaddingBlockStart } : null,
        headerPosition: getComputedStyle(h).position,
      };
    }),
  };
};

const settle = (p, ms = 3500) => p.waitForTimeout(ms);

const cells = {
  // A — census + scrub across viewports/schemes (PH-3, C-8(ii), L2-3, veil alphas, PH-13, C-4, D-3/C-11 presence)
  async census(b) {
    const res = [];
    const VPS = [[390, 844], [1024, 1366], [1280, 720], [1440, 900], [1512, 982]];
    const ROUTES = ["/", "/browse", "/generate", "/gradient", "/blob"];
    for (const [w, hgt] of VPS) for (const scheme of (w === 1440 ? ["light", "dark"] : ["light"])) for (const r of ROUTES) {
      const ctx = await b.newContext({ viewport: { width: w, height: hgt }, colorScheme: scheme });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + r, { waitUntil: "load", timeout: 45000 }); await settle(p);
        const rest = await p.evaluate(HEADER_READ);
        const scrub = [];
        for (const y of [64, 120, 300, 100000]) {
          await p.evaluate((y) => { document.scrollingElement.scrollTop = y; for (const port of document.querySelectorAll(".pane-scroll-fade")) port.scrollTop = y; }, y);
          await p.waitForTimeout(500);
          const m = await p.evaluate(HEADER_READ);
          scrub.push({ y, doc: m.doc, headers: m.headers.map((x) => ({ title: x.title, fs: x.fs, transform: x.transform, condensed: x.condensed, rect: x.rect, deadBandPx: x.deadBandPx, veil: x.veil, port: x.port, desc: x.desc })) });
        }
        res.push({ vp: `${w}x${hgt}`, scheme, route: r, rest, scrub });
      } finally { await ctx.close(); }
    }
    out("census", res);
  },

  // B — forced-colors computed values (D-14)
  async forced(b) {
    const res = [];
    for (const fc of ["none", "active"]) {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: fc });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + "/gradient", { waitUntil: "load", timeout: 45000 }); await settle(p);
        const m = await p.evaluate(() => {
          const h = document.querySelector(".pane-header"), t = h.querySelector(".pane-header-title"), bs = getComputedStyle(h, "::before"), hs = getComputedStyle(h);
          return { matchesForced: matchMedia("(forced-colors: active)").matches, header: { bg: hs.backgroundColor, color: hs.color, borderColor: hs.borderBottomColor, forcedColorAdjust: hs.forcedColorAdjust, backdrop: hs.backdropFilter },
            title: { color: getComputedStyle(t).color }, veil: { display: bs.display, bg: bs.backgroundColor, backdrop: bs.backdropFilter, opacity: bs.opacity },
            card: (() => { const c = h.closest(".card") || h.parentElement; const s = getComputedStyle(c); return { bg: s.backgroundColor, border: s.borderTopColor, borderW: s.borderTopWidth, backdrop: s.backdropFilter }; })() };
        });
        const hb = await p.locator(".pane-header").first().boundingBox();
        await p.screenshot({ path: `${EV}chromium-forced-${fc}-gradient-header.png`, clip: { x: Math.max(0, hb.x - 8), y: Math.max(0, hb.y - 8), width: Math.min(hb.width + 16, 1400), height: hb.height + 16 } });
        res.push({ forcedColors: fc, ...m });
      } finally { await ctx.close(); }
    }
    out("forced", res);
  },

  // C — zoom 200% rows (D-15): 200% zoom on a 1440 / 1536 screen ≡ 720 / 768 CSS px at DPR 2
  async zoom(b) {
    const res = [];
    for (const [w, hgt] of [[720, 450], [768, 491]]) for (const r of ["/", "/gradient"]) {
      const ctx = await b.newContext({ viewport: { width: w, height: hgt }, deviceScaleFactor: 2 });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + r, { waitUntil: "load", timeout: 45000 }); await settle(p);
        const m = await p.evaluate(() => [...document.querySelectorAll(".pane-header-title")].map((t) => { const cs = getComputedStyle(t), r = t.getBoundingClientRect();
          return { title: t.textContent.trim().slice(0, 30), fs: cs.fontSize, transform: cs.transform, scale: cs.scale, left: +r.left.toFixed(1), right: +r.right.toFixed(1), w: +r.width.toFixed(1), overflowX: t.scrollWidth > t.clientWidth + 1, inViewport: r.left >= 0 && r.right <= innerWidth }; }));
        await p.screenshot({ path: `${EV}chromium-zoom200-${w}-${r === "/" ? "home" : "gradient"}.png` });
        res.push({ vp: `${w}x${hgt}@2x`, route: r, titles: m });
      } finally { await ctx.close(); }
    }
    out("zoom", res);
  },

  // D — hops: out-in strand/co-mount, cold vs warm swap latency, announcement, keydown listener census (PS-1, D-6, D-2/3/4, PS-9, D-5)
  async hops(b) {
    const res = [];
    for (const [w, hgt, rm] of [[1440, 900, "no-preference"], [390, 844, "no-preference"], [1440, 900, "reduce"]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: hgt }, reducedMotion: rm });
      try {
        await ctx.addInitScript(() => {
          window.__kd = { add: 0, rem: 0 };
          const a = window.addEventListener.bind(window), r = window.removeEventListener.bind(window);
          window.addEventListener = (t, f, o) => { if (t === "keydown") window.__kd.add++; return a(t, f, o); };
          window.removeEventListener = (t, f, o) => { if (t === "keydown") window.__kd.rem++; return r(t, f, o); };
        });
        const p = await ctx.newPage();
        await p.goto(BASE + "/", { waitUntil: "load", timeout: 45000 }); await settle(p, 5000);
        const seq = ["/gradient", "/mix", "/extract", "/generate", "/", "/gradient", "/mix", "/extract", "/generate", "/"];
        const hops = [];
        for (const [i, to] of seq.entries()) {
          const r = await p.evaluate(async (to) => {
            const norm = (k) => k.replace(/-/g, "").toLowerCase();
            const paneOf = (el) => { let c = el.__vueParentComponent; if (c?.type?.__name === "PaneShell") c = c.parent; return c?.type?.__name ?? c?.type?.name ?? "?"; };
            const frames = []; let done = null, leaveSeen = 0, enterSeen = 0; const t0 = performance.now();
            const kd0 = { ...window.__kd };
            location.hash = "#" + to;
            await new Promise((res) => {
              const tick = () => {
                const ws = [...document.querySelectorAll(".pane-wrapper")];
                const f = { t: +(performance.now() - t0).toFixed(1), regions: ws.map((w) => ({ key: w.dataset.pane, kids: w.children.length, panes: [...w.children].map(paneOf), active: [...w.children].map((c) => [...c.classList].filter((k) => k.endsWith("-active")).join(" ")).join("|"), h: Math.round(w.getBoundingClientRect().height), wd: Math.round(w.getBoundingClientRect().width) })),
                  container: Math.round(document.querySelector(".pane-container")?.getBoundingClientRect().height ?? 0) };
                if (f.regions.some((r) => /leave-active/.test(r.active))) leaveSeen++;
                if (f.regions.some((r) => /enter-active/.test(r.active))) enterSeen++;
                frames.push(f);
                const ok = f.regions.every((r) => r.kids === 1 && !r.active && norm(r.panes[0]).replace(/pane$/, "") === norm(r.key));
                if (done === null && ok) done = f.t;
                if (performance.now() - t0 > 8000 || (done !== null && performance.now() - t0 > done + 250)) return res();
                requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });
            const last = frames.at(-1);
            const firstCorrect = frames.find((f) => f.regions.every((r) => r.kids >= 1 && r.panes.some((n) => norm(n).replace(/pane$/, "") === norm(r.key))));
            return { to, settledMs: done, firstIncomingPresentMs: firstCorrect ? firstCorrect.t : null, frames: frames.length, leaveFrames: leaveSeen, enterFrames: enterSeen,
              zeroChildFrames: frames.filter((f) => f.regions.some((r) => r.kids === 0)).length, maxKidsPerRegion: Math.max(...frames.map((f) => Math.max(...f.regions.map((r) => r.kids)))),
              minContainerH: Math.min(...frames.map((f) => f.container)), maxContainerH: Math.max(...frames.map((f) => f.container)),
              maxRegionH: Math.max(...frames.map((f) => Math.max(...f.regions.map((r) => r.h)))),
              end: last.regions.map((r) => ({ key: r.key, kids: r.kids, panes: r.panes, h: r.h, wd: r.wd })), stranded: done === null,
              h1: document.querySelector("h1")?.textContent.trim().slice(0, 30), announce: document.querySelector('p[role="status"][aria-live="polite"]')?.textContent.trim(),
              kdDelta: { add: window.__kd.add - kd0.add, rem: window.__kd.rem - kd0.rem } };
          }, to);
          r.round = i < 5 ? "cold" : "warm";
          hops.push(r);
          await p.waitForTimeout(1500);
        }
        res.push({ vp: `${w}x${hgt}`, reducedMotion: rm, kdTotal: await p.evaluate(() => window.__kd), hops });
      } finally { await ctx.close(); }
    }
    out("hops", res);
  },

  // F — keystroke swallow on a non-picker route (PaneSlot residue 5)
  async keys(b) {
    const res = [];
    for (const arm of (process.env.KEY_ARMS ? process.env.KEY_ARMS.split(",") : ["cmdk", "escape-editing", "enter-editing", "escape-idle", "cmdk-home", "ctrlk-home"])) {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + "/", { waitUntil: "load", timeout: 45000 }); await settle(p, 4000);
        const found = await p.evaluate(() => {
          let c = document.querySelector(".pane-shell")?.__vueParentComponent;
          while (c && !(c.exposed && c.exposed.onStartEdit)) c = c.parent;
          window.__picker = c ? c.exposed : null; return !!window.__picker;
        });
        if (arm.endsWith("-editing") && found) { await p.evaluate(() => window.__picker.onStartEdit({ paletteId: "ss8-probe", colorIndex: 0, originalCss: "rgb(200 40 40)" })); await p.waitForTimeout(400); }
        if (!arm.endsWith("-home")) { await p.evaluate(() => { location.hash = "#/gradient"; }); await settle(p, 3000); }
        await p.evaluate(() => { window.__dp = []; window.addEventListener("keydown", (e) => window.__dp.push({ key: e.key, meta: e.metaKey, prevented: e.defaultPrevented })); });
        const pre = await p.evaluate(() => ({ route: location.hash, pickerInDom: !!document.querySelector(".pane-shell")?.isConnected, isEditing: window.__picker ? window.__picker.isEditing.value : null }));
        await p.locator("body").click({ position: { x: 5, y: 5 } }).catch(() => {});
        if (arm === "ctrlk-home") { await p.keyboard.down("Control"); await p.keyboard.press("k"); await p.keyboard.up("Control"); }
        else if (arm.startsWith("cmdk")) { await p.keyboard.down("Meta"); await p.keyboard.press("k"); await p.keyboard.up("Meta"); }
        else if (arm.startsWith("escape")) await p.keyboard.press("Escape");
        else await p.keyboard.press("Enter");
        await p.waitForTimeout(300);
        const post = await p.evaluate(() => ({ selectOpen: !!document.querySelector('[role="listbox"]'), events: window.__dp, isEditing: window.__picker ? window.__picker.isEditing.value : null, editTarget: window.__picker ? JSON.stringify(window.__picker.editTarget.value) : null }));
        res.push({ arm, pickerFound: found, pre, post });
      } finally { await ctx.close(); }
    }
    out("keys", res);
  },

  // G — B3 strand: deep-link cold boot → return to /#/ ; control: cold boot at /#/
  async b3(b) {
    const res = [];
    for (const start of ["/", "/gradient", "/browse"]) {
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + start, { waitUntil: "load", timeout: 45000 }); await settle(p, 5000);
        if (start !== "/") { await p.evaluate(() => { location.hash = "#/"; }); await settle(p, 6000); }
        const m = await p.evaluate(() => { const a = document.querySelector(".hero-blob-anchor"); const r = a?.getBoundingClientRect();
          return { route: location.hash, heroAnchor: !!a, heroCanvas: a ? a.querySelectorAll("canvas").length : 0, rect: r ? { w: Math.round(r.width), h: Math.round(r.height) } : null, overtureStamp: document.documentElement.dataset.overture ?? document.body.dataset.overture ?? null }; });
        await p.screenshot({ path: `${EV}chromium-b3-start${start === "/" ? "home" : start.slice(1)}-at-home.png` });
        res.push({ start, ...m });
      } finally { await ctx.close(); }
    }
    out("b3", res);
  },

  // H — engine cells: contrast-color() support, calc(len/len), tan(atan2()) (Chromium arm)
  async engine(b) {
    const res = [];
    for (const w of [390, 1024, 1280, 1440]) {
      const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + "/", { waitUntil: "load", timeout: 45000 }); await settle(p, 2500);
        res.push({ vw: w, ...(await p.evaluate(() => {
          const d = document.createElement("div"); document.body.appendChild(d);
          d.style.setProperty("scale", "calc(tan(atan2(var(--type-heading), var(--type-display-1))))"); const atanScale = getComputedStyle(d).scale;
          d.style.setProperty("scale", "calc(var(--type-heading) / var(--type-display-1))"); const divScale = getComputedStyle(d).scale;
          d.style.setProperty("scale", "calc(24px / 48px)"); const divLit = getComputedStyle(d).scale;
          const r = { contrastColorSupported: CSS.supports("color", "contrast-color(red)"), atanScale, divScale, divLiteral: divLit,
            typeHeading: getComputedStyle(document.documentElement).getPropertyValue("--type-heading").trim(), typeDisplay1: getComputedStyle(document.documentElement).getPropertyValue("--type-display-1").trim(), ua: navigator.userAgent };
          d.remove(); return r;
        })) });
      } finally { await ctx.close(); }
    }
    out("engine", res);
  },

  // J — dock pane-switch residue (PSC subject census + 0207's atmosphere limb)
  async dock(b) {
    const res = [];
    for (const [w, hgt] of [[390, 844], [1024, 1366]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: hgt } });
      try {
        const p = await ctx.newPage();
        await p.goto(BASE + "/", { waitUntil: "load", timeout: 45000 }); await settle(p, 4000);
        const read = () => p.evaluate(() => ({ route: location.hash, dockMobilePanes: document.querySelectorAll(".dock-mobile-panes").length, segmented: document.querySelectorAll("[class*='segmented'], [data-slot='tabs-indicator']").length,
          dock: (() => { const d = document.querySelector("[class*='dock']"); const r = d?.getBoundingClientRect(); return r ? { cls: String(d.className).slice(0, 60), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x) } : null; })() }));
        const a = await read();
        await p.waitForTimeout(6000); const a6 = await read();
        await p.evaluate(() => { location.hash = "#/atmosphere"; }); await settle(p, 3000); const b2 = await read();
        res.push({ vp: `${w}x${hgt}`, atHome: a, atHomePlus6s: a6, atAtmosphere: b2 });
      } finally { await ctx.close(); }
    }
    out("dock", res);
  },
};

const b = await chromium.launch();
try {
  for (const [name, fn] of Object.entries(cells)) {
    if (only && !only.includes(name)) continue;
    const t0 = Date.now();
    try { await fn(b); console.log(`cell ${name} ok ${Date.now() - t0}ms`); }
    catch (e) { console.log(`cell ${name} FAILED ${e.message.slice(0, 300)}`); out(`${name}-error`, { error: String(e.stack).slice(0, 2000) }); }
  }
} finally { await b.close(); }

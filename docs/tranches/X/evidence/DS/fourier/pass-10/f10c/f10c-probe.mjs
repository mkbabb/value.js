// X-DS fourier pass 10 · F10C cure probe (DS-F10C-C1 gallery card insets, DS-F10C-T1 Basis notice gaps). Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3171"; const VIZ = process.argv[4] ?? "hazy-etching-cream-elk";
const cells = [["light",1440],["dark",1440],["light",390],["dark",390]];
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const route of ["gallery", "v"]) for (const [theme, w] of cells) {
    const k = `${route}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    // The Basis notice is the 429 "busy" state: the compute endpoints answer 429 so the state is deterministic.
    if (route === "v") await ctx.route(/\/api\/contours\/[^/]+\/compute\//, (r) => r.fulfill({ status: 429, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Too Many Requests", status: 429, detail: "busy" }) }));
    const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
    try {
      await p.goto(BASE + (route === "gallery" ? "/gallery" : `/v/${VIZ}`), { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.waitForSelector(route === "gallery" ? ".gallery-grid > *" : ".configurator-layer .compute-status", { timeout: 30000 }).catch(() => {});
      await p.waitForTimeout(2500);
      if (route === "v") await p.locator(".configurator-layer .compute-status").first().scrollIntoViewIfNeeded().catch(() => {});
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = await p.evaluate((route) => {
        const r1 = (n) => Math.round(n * 10) / 10;
        const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { top: r1(r.top), bottom: r1(r.bottom), h: r1(r.height) }; };
        if (route === "gallery") {
          return [...document.querySelectorAll(".gallery-card")].slice(0, 2).map((card) => {
            const c = card.getBoundingClientRect(); const media = card.querySelector(".card-media")?.getBoundingClientRect();
            const stats = card.querySelector(".card-stats"); const like = stats?.querySelector(".like-btn");
            const glyphs = [...(stats?.querySelectorAll("svg") ?? [])].map((s) => s.getBoundingClientRect());
            const inkBottom = Math.max(...glyphs.map((g) => g.bottom));
            return { card: box(card), cardPad: getComputedStyle(card).getPropertyValue("--card-pad").trim(),
              mediaTopInset: media ? r1(media.top - c.top) : null, statsRow: box(stats), likeBtn: box(like),
              likeHitArea: like ? `${r1(like.getBoundingClientRect().width)}x${r1(like.getBoundingClientRect().height)}` : null,
              glyphInkBottomInset: r1(c.bottom - inkBottom), scrollW: document.documentElement.scrollWidth };
          });
        }
        const note = document.querySelector(".configurator-layer .compute-status"); if (!note) return { note: null };
        const layer = note.closest(".configurator-layer"); const heading = layer.querySelector(".configurator-layer-heading"); const trigger = layer.querySelector(".configurator-layer-trigger");
        const label = layer.querySelector(".basis-group-label");
        const n = note.getBoundingClientRect(); const hb = heading.getBoundingClientRect(); const tb = trigger.getBoundingClientRect(); const lb = label.getBoundingClientRect();
        const retry = note.querySelector("button"); const msg = note.querySelector(".compute-status-msg");
        return { note: box(note), heading: box(heading), trigger: box(trigger), groupLabel: box(label),
          gapAboveFromHeadingBox: r1(n.top - hb.bottom), gapAboveFromTrigger: r1(n.top - tb.bottom), gapBelowToGroupLabel: r1(lb.top - n.bottom),
          noteMarginBottom: getComputedStyle(note).marginBottom, retryFont: retry ? getComputedStyle(retry).fontSize : null, msgFont: msg ? getComputedStyle(msg).fontSize : null, scrollW: document.documentElement.scrollWidth };
      }, route);
      out[k] = { m: out[k], pageErrors: errs };
    } catch (e) { out[k + "-err"] = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f10c-probe.json`, JSON.stringify(out, null, 1)); }

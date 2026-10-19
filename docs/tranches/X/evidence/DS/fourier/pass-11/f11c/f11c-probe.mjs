// X-DS fourier pass 11 · F11C cure probe (DS-F11C-C1: one recovery grammar for a failed compute on /equation and /v). Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3191"; const VIZ = process.argv[4] ?? "hazy-etching-cream-elk";
const cells = [["light",1440],["dark",1440],["light",390],["dark",390]];
const fail = (r) => r.fulfill({ status: 503, contentType: "application/problem+json", body: JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503, detail: "The compute service is unavailable" }) });
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const route of ["equation", "v"]) for (const [theme, w] of cells) {
    const k = `${route}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    if (route === "equation") await ctx.route("**/api/equations/compute", fail);
    else await ctx.route(/\/api\/contours\/[^/]+\/compute\//, fail);
    const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
    try {
      await p.goto(BASE + (route === "equation" ? "/equation" : `/v/${VIZ}`), { waitUntil: "domcontentloaded", timeout: 60000 });
      const sel = route === "equation" ? ".eq-panel-right .compute-status" : ".stage-state .compute-status, .configurator-layer .compute-status";
      await p.waitForSelector(sel, { timeout: 30000 }).catch(() => {});
      if (w < 500 && route === "equation") { await p.getByRole("tab", { name: /canvas|result|series/i }).first().click().catch(() => {}); }
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = await p.evaluate(() => {
        const r1 = (n) => Math.round(n * 10) / 10;
        return [...document.querySelectorAll(".compute-status")].map((el) => {
          const r = el.getBoundingClientRect(); const btn = el.querySelector("button"); const msg = el.querySelector(".compute-status-msg");
          const cs = btn ? getComputedStyle(btn) : null;
          return { where: el.closest(".eq-panel-right") ? "equation-stage" : el.closest(".stage-state") ? "v-stage" : "aside",
            role: el.getAttribute("role"), visible: r.width > 0 && r.height > 0, box: { x: r1(r.x), y: r1(r.y), w: r1(r.width), h: r1(r.height) },
            msg: msg?.textContent?.trim(), msgFont: msg ? getComputedStyle(msg).fontSize : null,
            button: btn?.textContent?.trim(), buttonEmphasis: btn?.getAttribute("data-emphasis") ?? btn?.className?.match(/emphasis-\w+/)?.[0] ?? null,
            buttonGlyphs: btn ? btn.querySelectorAll("svg").length : null, buttonShadow: cs?.boxShadow, buttonBg: cs?.backgroundColor };
        }).concat([{ tryAgainButtons: [...document.querySelectorAll("button")].filter((x) => /Try again/.test(x.textContent)).length, scrollW: document.documentElement.scrollWidth }]);
      });
      out[k] = { m: out[k], pageErrors: errs };
    } catch (e) { out[k + "-err"] = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f11c-probe.json`, JSON.stringify(out, null, 1)); }

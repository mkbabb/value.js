// X-DS fourier pass 4 (redeploy) — CURE AFTER frames + measures for critic F4R's
// consumer rows C1..C6. Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100"; const SLUG = "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
const shot = (p, n) => p.screenshot({ path: `${OUT}/${n}.png` }).catch((e) => console.log("shot fail", n, e.message));
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const k = `${theme}-${w}`; const o = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 2, ...(w === 390 ? { isMobile: true, hasTouch: true } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const go = async (path, ms = 3000) => { await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(ms); await p.mouse.move(0, 0).catch(() => {}); };
  const step = async (name, fn) => { try { await fn(); } catch (e) { o[name + "Err"] = e.message.slice(0, 300); } };
  // C5 — not-found title rung, against /morph's h1
  await step("c5", async () => {
    await go("/no-such-route", 2000); await shot(p, `not-found-${k}`);
    const h = (sel) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: e.textContent.trim(), px: +parseFloat(c.fontSize).toFixed(2), weight: c.fontWeight, lines: Math.round(r.height / parseFloat(c.lineHeight)), w: Math.round(r.width) }; }, sel);
    o.c5 = { notFound: await h("[data-testid=not-found] h1") };
    await go("/morph", 2500); o.c5.morph = await h("h1");
  });
  // C1 — the drag state: one signal
  await step("c1", async () => {
    await go("/w", 2000);
    if (w === 390) await p.getByRole("tab", { name: "Canvas" }).click().catch(() => {});
    await p.evaluate(() => { const dt = new DataTransfer(); dt.items.add(new File(["x"], "a.png", { type: "image/png" })); const t = document.querySelector(".drop-zone"); for (const type of ["dragenter", "dragover"]) t.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt })); });
    await p.waitForTimeout(600); await shot(p, `w-dragging-${k}`);
    o.c1 = await p.evaluate(() => { const z = document.querySelector(".drop-zone"), btn = document.querySelector(".drop-target-button"), st = document.querySelector(".canvas-stage"); const zc = getComputedStyle(z); return { dragging: !!document.querySelector(".drop-target[data-dragging]"), zoneBorder: `${zc.borderTopWidth} ${zc.borderTopStyle}`, buttonShadowHasRing: /0px 0px 0px 2px/.test(getComputedStyle(btn).boxShadow), stageRing: getComputedStyle(st, "::after").boxShadow }; });
  });
  // C2 + C4 — /equation: layer names; the stage tools' dock
  await step("c24", async () => {
    await go("/equation", 1000);
    await p.waitForSelector(".eq-result-root", { state: "attached", timeout: 90000 });
    await p.waitForTimeout(3500); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, `equation-${k}`);
    o.c2 = await p.evaluate(() => ({ layers: [...document.querySelectorAll(".configurator-layer .configurator-layer-trigger")].map((e) => e.textContent.trim().replace(/\s+/g, " ").slice(0, 60)), tabs: [...document.querySelectorAll("[role=tab]")].map((e) => e.textContent.trim()) }));
    if (w === 390) { await p.getByRole("tab", { name: "Canvas" }).click(); await p.waitForTimeout(1500); await p.mouse.move(0, 0).catch(() => {}); await shot(p, `equation-canvas-${k}`); }
    o.c4 = await p.evaluate(() => { const d = document.querySelector(".eq-result-header .glass-dock"); if (!d) return null; const r = d.getBoundingClientRect(); const card = document.querySelector(".eq-card").getBoundingClientRect(); const c = getComputedStyle(d); return { dock: [r.x, r.y, r.width, r.height].map((n) => +n.toFixed(1)), insetTop: +(r.top - card.top).toFixed(1), insetRight: +(card.right - r.right).toFixed(1), collapsed: d.getAttribute("data-collapsed") ?? d.getAttribute("data-state"), controls: [...d.querySelectorAll("button")].map((x) => { const q = x.getBoundingClientRect(); return { name: x.getAttribute("aria-label"), box: [q.width, q.height].map(Math.round), inDock: q.left >= r.left - 0.5 && q.right <= r.right + 0.5 }; }), bareButtons: document.querySelectorAll(".eq-result-header [data-emphasis=quiet]").length, bg: c.backgroundColor, radius: c.borderRadius }; });
    // the Info control still opens its hovercard from the dock
    if (w === 1440) { await p.getByRole("button", { name: "About this approximation" }).hover(); await p.waitForTimeout(900); o.c4.hovercard = await p.locator(".info-hovercard").isVisible().catch(() => false); await shot(p, `equation-info-${k}`); await p.mouse.move(0, 0); }
  });
  // C3 + C6 — /v: one count; the Basis rows' rhythm
  await step("c36", async () => {
    await go(`/v/${SLUG}`, 1000);
    await p.waitForFunction(() => !/Computing/.test(document.body.innerText), null, { timeout: 90000 }).catch(() => console.log("v still computing", k));
    await p.waitForTimeout(5000); await p.mouse.move(0, 0).catch(() => {});
    await shot(p, w === 390 ? `v-controls-${k}` : `v-loaded-${k}`);
    o.c3 = await p.evaluate(() => { const co = [...document.querySelectorAll(".configurator-layer-trigger")].find((e) => /Coefficients/.test(e.textContent)); const har = document.querySelector('input[aria-label="Harmonics"], [role=spinbutton]'); return { header: co?.textContent.trim().replace(/\s+/g, " "), subs: [...document.querySelectorAll("[data-row-sub]")].map((e) => e.textContent.trim()), dock: (() => { const d = document.querySelector(".controls-dock-anchor .glass-dock"); if (!d) return null; const r = d.getBoundingClientRect(), s = document.querySelector(".canvas-stage").getBoundingClientRect(); return { insetTop: +(r.top - s.top).toFixed(1), insetRight: +(s.right - r.right).toFixed(1), h: +r.height.toFixed(1) }; })() }; });
    o.c6 = await p.evaluate(() => { const rows = [...document.querySelectorAll("[data-row-sub]")].map((s) => { let e = s; while (e && !e.querySelector("[role=slider]")) e = e.parentElement; return e; }); const pick = (name) => { const sl = [...document.querySelectorAll("[role=slider]")].find((x) => x.getAttribute("aria-label") === name); let e = sl; while (e && !e.querySelector("[data-row-sub]") && e.parentElement && !e.parentElement.classList.contains("configurator-layer-content")) e = e.parentElement; let row = sl; for (let i = 0; i < 8 && row; i++) { if (row.querySelector("[role=spinbutton]")) break; row = row.parentElement; } return row ? +row.getBoundingClientRect().height.toFixed(1) : null; }; return { harmonicsRowH: pick("Harmonics"), samplePointsRowH: pick("Sample Points") }; });
  });
  await ctx.close();
  writeFileSync(`${OUT}/f4r-cure-probe-after.json`, JSON.stringify(out, null, 1));
}
await b.close();

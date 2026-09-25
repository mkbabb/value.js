// SERVED MODEL: claude-opus-5-5 — KF.W13X.timeline · A2-KE-X-5 probe: the CSS paste dialog at 844x390 (and 390x844), light/dark.
// Is the primary action in view without scrolling the dialog? TAG=<before|after> RUN=<n> node x5.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5251"; const TAG = process.env.TAG || "before"; const RUN = process.env.RUN || "1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
for (const [w, h] of [[844, 390], [390, 844]]) for (const scheme of ["light", "dark"]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, colorScheme: scheme, reducedMotion: "reduce" })).newPage();
  await p.goto(`${BASE}/#/cube`); await sleep(3500);
  const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
  await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first().click({ force: true }); await sleep(1200);
  await p.getByRole("button", { name: /^Import$/ }).filter({ visible: true }).first().click({ force: true }); await sleep(900);
  const m = await p.evaluate(() => { const d = document.querySelector("[role=dialog]:not([data-slot=sheet-content])"); if (!d) return null; const r = d.getBoundingClientRect();
    const btn = [...d.querySelectorAll("button")].find((x) => /^Import/.test(x.textContent.trim())); const br = btn.getBoundingClientRect();
    const sc = [d, ...d.querySelectorAll("*")].find((e) => e.scrollHeight > e.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(e).overflowY));
    const desc = d.querySelector("[id*=description], p"); const ta = d.querySelector("textarea");
    return { dlgH: Math.round(r.height), vh: innerHeight, dlgTop: Math.round(r.top), dlgBottom: Math.round(r.bottom), btnBottom: Math.round(br.bottom), btnInView: br.bottom <= Math.min(innerHeight, r.bottom) + 0.5, scrolls: !!sc, taH: Math.round(ta.getBoundingClientRect().height), descColor: desc ? getComputedStyle(desc).color : null }; });
  await p.screenshot({ path: new URL(`frames/x5-${TAG}-r${RUN}-${w}x${h}-${scheme}.jpg`, import.meta.url).pathname, type: "jpeg", quality: 70 });
  console.log(`${w}x${h} ${scheme} ${JSON.stringify(m)}`); await p.context().close();
}
await b.close();

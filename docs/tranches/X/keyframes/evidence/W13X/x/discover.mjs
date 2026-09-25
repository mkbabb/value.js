// SERVED MODEL: claude-opus-5-5 — KF.W13X.x discovery: list the dock surface items per scene and the controls each surface exposes (390x844, light). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5194";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const p = await ctx.newPage();
const labels = () => p.evaluate(() => [...document.querySelectorAll("button,[role=button],[role=combobox],[role=tab],[role=switch]")].filter((e) => { if (e.closest("[inert]")) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }).map((e) => (e.getAttribute("aria-label") || e.textContent.trim().replace(/\s+/g, " ").slice(0, 24))).filter(Boolean));
for (const route of (process.env.ROUTES || "cube,amiga,square,easing,spring,sequence").split(",")) {
  await p.goto(`${BASE}/#/${route}`); await sleep(3500);
  const expand = async () => { const btn = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await btn.count()) { await btn.click({ timeout: 3000 }).catch(() => {}); await sleep(800); } };
  await expand();
  const items = await p.locator("[data-dock-tether=top] [data-dock-surface-item]").evaluateAll((els) => els.map((e) => ({ l: e.getAttribute("aria-label"), s: e.getAttribute("data-surface"), d: !!(e.disabled || e.getAttribute("aria-disabled") === "true") })));
  console.log("ROUTE", route, JSON.stringify(items));
  for (const it of items.filter((i) => !i.d)) {
    await expand();
    await p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${it.l}"]`).first().click({ timeout: 3000, force: true }).catch(() => {});
    await sleep(1300);
    console.log("  SURFACE", it.l, JSON.stringify([...new Set(await labels())]).slice(0, 900));
    await expand();
    await p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${it.l}"]`).first().click({ timeout: 3000, force: true }).catch(() => {});
    await sleep(700);
  }
}
await b.close();

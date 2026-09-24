// SERVED MODEL: claude-opus-5-5
// KFA-136 · one dock-driven scene switch (cube -> amiga): the live view-transition's active types and its
// pseudo-element animations (names + durations), plus the scene host's box before/after (the geometry leg).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
await p.goto("http://localhost:5173/#/cube"); await p.waitForTimeout(4000);
await p.evaluate(() => { const orig = document.startViewTransition.bind(document); window.__vt = []; document.startViewTransition = (arg) => { const t = orig(arg); window.__vt.push({ types: t.types ? [...t.types] : null }); t.ready.then(() => { window.__vt.at(-1).anims = document.getAnimations().filter((a) => a.effect?.pseudoElement?.includes("view-transition")).map((a) => `${a.effect.pseudoElement}:${a.animationName || ""}:${a.effect.getTiming().duration}`); }); return t; }; });
const box = () => p.evaluate(() => { const r = document.querySelector(".scene-host")?.getBoundingClientRect(); return r ? { w: Math.round(r.width), h: Math.round(r.height) } : null; });
const before = await box();
// open the scene menu and pick Amiga (the dock's Scene combobox, as probe-switch10 does)
const trig = true; await p.hover("[data-dock-tether=top]"); await p.waitForTimeout(700); await p.locator("[data-dock-tether=top] [role=combobox][aria-label=Scene]").click(); await p.waitForTimeout(500);
const row = true; await p.getByRole("option", { name: /amiga/i }).first().click(); await p.waitForTimeout(2500);
const vt = await p.evaluate(() => window.__vt); const after = await box();
await p.screenshot({ path: OUT + "after-swap.png" });
const res = { hash: await p.evaluate(() => location.hash), trigger: !!trig, row: !!row, vt, hostBefore: before, hostAfter: after, pageerrors: errs };
fs.writeFileSync(OUT + "swap.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));
await b.close();

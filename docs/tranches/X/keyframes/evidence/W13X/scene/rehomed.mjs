// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.scene · re-homed rows, served (READ-ONLY): KFA-106/190 (the sequence card's arrival slide), UIA-KF-125 (the in-app arrival carries the resolved scene)
// Usage: BASE=http://localhost:5291 RUN=after-r1 node rehomed.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const INSTR = fs.readFileSync(`${OUT}instr.js`, "utf8");
const BASE = process.env.BASE || "http://localhost:5291";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const R = (id, bad, msg) => console.log(`${bad ? "RED  " : "GREEN"} ${id} ${msg}`);
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }); await ctx.addInitScript(INSTR);
const p = await ctx.newPage(); await p.goto(`${BASE}/#/cube`); await sleep(4500);
const card = () => p.evaluate(() => { const e = document.querySelector(".scene-host > *:not(.scene-skeleton)"); const r = e?.getBoundingClientRect(); return r ? Math.round(r.x) : null; });
const sP = p.evaluate(() => new Promise((res) => { const out = []; const t0 = performance.now(); const tick = (t) => { const e = document.querySelector(".scene-host .seq-target"); const r = e?.getBoundingClientRect(); out.push({ t: Math.round(t), x: r ? Math.round(r.x * 10) / 10 : null, sk: !!document.querySelector(".scene-skeleton"), vt: document.documentElement.matches(":active-view-transition") }); if (t - t0 < 2200) requestAnimationFrame(tick); else res(out); }; requestAnimationFrame(tick); }));
await p.evaluate(() => { location.hash = "#/sequence"; });
const s = await sP; const vt = await p.evaluate(() => window.__vt.calls.splice(0));
const xs = s.filter((f) => f.x !== null && !f.sk); const moving = xs.filter((f, i) => i > 0 && Math.abs(f.x - xs[i - 1].x) > 0.5);
const span = xs.length ? Math.max(...xs.map((f) => f.x)) - Math.min(...xs.map((f) => f.x)) : null;
R("KFA-106", moving.length > 0, `nav cube->sequence (hash): card x frames ${xs.length}, moving frames ${moving.length}, x span ${span} px (first ${xs[0]?.x} -> last ${xs.at(-1)?.x}) · VT calls ${vt.length}`);
R("KFA-190", s.some((f) => f.sk), `placeholder frames during the arrival ${s.filter((f) => f.sk).length}`);
R("UIA-KF-125", vt.length === 0 || s.some((f) => f.sk), `in-app arrival: VT calls ${vt.length} · skeleton frames ${s.filter((f) => f.sk).length} (the VT's new capture is the resolved scene only when none)`);
await b.close();
